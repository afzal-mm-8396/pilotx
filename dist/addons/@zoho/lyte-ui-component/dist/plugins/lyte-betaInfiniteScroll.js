// IIFE (Immediately Invoked Function Expression) to avoid polluting global scope
(function () {
  // Check if lyteDomObj exists before proceeding
  if (!lyteDomObj) {
    return;
  }

  // No-operation function used as default for optional callbacks
  function noop() {}

  // Utility function to extract keys from an object as an array
  function toArrayKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }

  // Modulo function that handles negative numbers correctly
  // Used for wrapping/looping in infinite scroll scenarios
  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  // Main plugin method attached to lyteDomObj prototype
  // Implements a 2D infinite scroll with virtual scrolling for large datasets
  lyteDomObj.prototype.betaInfiniteScroll = function (param) {
    // Get the container element (first element in the collection)
    var container = this[0];
    if (!container) {
      return;
    }

    // Handle destroy command to clean up all event listeners and DOM modifications
    if (param === "destroy" || param === "Destroy") {
      // Retrieve the state object stored on the container
      var prev = container._lyteTestInfinite2D;
      if (prev) {
        // Remove scroll event listener
        if (prev.onScroll) {
          container.removeEventListener("scroll", prev.onScroll);
        }
        // Cancel any pending animation frame
        if (prev.rafId) {
          cancelAnimationFrame(prev.rafId);
        }
        // Clear scroll stop detection timer
        if (prev.scrollTimer) {
          clearTimeout(prev.scrollTimer);
        }
        // Remove window resize handler
        if (prev.resizeHandler) {
          window.removeEventListener("resize", prev.resizeHandler);
        }
        // Remove the spacer element from DOM
        if (prev.spacer && prev.spacer.parentNode) {
          prev.spacer.parentNode.removeChild(prev.spacer);
        }
        // Delete the state object
        delete container._lyteTestInfinite2D;
      }
      // Remove public API methods from container
      if (container.scrollToCell) {
        delete container.scrollToCell;
      }
      if (container.rePopulate) {
        delete container.rePopulate;
      }
      return;
    }

    // Initialize params object if not provided
    param = param || {};

    // Extract data structure: dataMap is expected to be a 2D object {rowKey: {colKey: value}}
    var dataMap = param.dataMap || {};
    var rowKeys = toArrayKeys(dataMap);
    var firstRowKey = rowKeys[0];
    var colKeys = firstRowKey ? toArrayKeys(dataMap[firstRowKey]) : [];

    // Buffer settings: extra rows/columns rendered outside viewport for smooth scrolling
    var bufferRows = typeof param.bufferRows === "number" ? param.bufferRows : 2;
    var bufferCols = typeof param.bufferCols === "number" ? param.bufferCols : 2;
    var startAtZero = param.startAtZero !== false;

    // CSS selectors for row and cell elements
    var rowSelector = param.rowSelector || ".lyteTestISRow";
    var cellSelector = param.cellSelector || ".lyteTestISCell";

    // Object to populate with current visible data (for data binding)
    var populateObject = param.populateObject;
    // Flag to skip initial rendering callbacks
    var disableInitialRendering = !!param.disableInitialRendering;
    // Enable looping/wrapping behavior (circular scrolling)
    // Default is non-looping so scrolling stops at data boundaries.
    var loop = param.loop === true;

    // Event callbacks - using noop as default to avoid null checks
    var onScrollStart = param.onScrollStart || noop;  // Called when scrolling starts
    var onScrolling = param.onScrolling || noop;      // Called during scrolling
    var onScrollStop = param.onScrollStop || noop;    // Called when scrolling stops
    var onBeforeUpdate = param.onBeforeUpdate || noop;  // Called before DOM update
    var onBeforeObjectUpdate = param.onBeforeObjectUpdate || noop;  // Called before data object update
    var onObjectUpdate = param.onObjectUpdate || noop;  // Called after data object update
    var onTransform = param.onTransform || noop;      // Called when applying transforms
    var onLastSet = param.onLastSet || noop;          // Called when reaching end of data
    var onScrollReset = param.onScrollReset || noop;  // Called when scroll resets to top/left

    // State object to track all runtime data
    var state = {
      rowKeys: rowKeys,                                          // Array of row keys from dataMap
      colKeys: colKeys,                                          // Array of column keys from dataMap
      rowCount: rowKeys.length,                                  // Total number of rows
      colCount: colKeys.length,                                  // Total number of columns
      rowHeight: null,                                           // Height of a single row (measured from DOM)
      colWidth: null,                                            // Width of a single cell (measured from DOM)
      // provisional pool; recalculated from viewport after first DOM measure
      poolRows: Math.max(1, Math.min(rowKeys.length || 1, bufferRows * 2 + 3)),
      poolCols: Math.max(1, Math.min(colKeys.length || 1, bufferCols * 2 + 3)),
      rowStart: 0,                                               // Current row start index
      colStart: 0,                                               // Current column start index
      rowOffset: 0,                                              // Ring buffer offset for rows
      colOffset: 0,                                              // Ring buffer offset for columns
      onScroll: null,                                            // Scroll event handler reference
      rafId: null,                                               // RequestAnimationFrame ID for render scheduling
      scrollTimer: null,                                         // Timer for detecting scroll stop
      scrolling: false,                                          // Current scrolling state flag
      spacer: null,                                              // DOM element used to create scrollable area
      lastRowStart: null,                                        // Last rendered row start index (for change detection)
      lastColStart: null,                                        // Last rendered column start index (for change detection)
      lastSetKey: null                                           // Key to track if we've reached the last set of data
    };

    // Helper function to get all row elements in the container
    function getRows() {
      return $L(rowSelector, container);
    }

    // Helper function to get all cell elements within a row
    function getCells(rowEl) {
      return $L(cellSelector, rowEl);
    }

    // Create and insert a spacer element to establish the scrollable area
    function ensureSpacer() {
      if (!state.spacer) {
        var spacer = document.createElement("div");
        spacer.className = "lyteTestInfiniteSpacer";
        // Start with minimal size (will be updated by setSpacerSize)
        spacer.style.width = "1px";
        spacer.style.height = "1px";
        spacer.style.pointerEvents = "none";  // Don't interfere with mouse events
        container.appendChild(spacer);
        state.spacer = spacer;
      }
    }

    // Set the spacer size to create virtual scrollable area
    function setSpacerSize() {
      if (!state.rowHeight || !state.colWidth) {
        return;
      }
      // For non-loop mode, virtual size is the real data size to stop at boundaries.
      // For loop mode, allow a larger virtual area for wrap-like scrolling.
      var virtualRows = loop
        ? (typeof param.virtualRows === "number" ? param.virtualRows : Math.max(state.rowCount, 2000))
        : Math.max(state.rowCount, 1);
      var virtualCols = loop
        ? (typeof param.virtualCols === "number" ? param.virtualCols : Math.max(state.colCount, 2000))
        : Math.max(state.colCount, 1);
      state.virtualRows = virtualRows;
      state.virtualCols = virtualCols;
      // Rows/cells in the pool are still part of normal layout flow.
      // Spacer should represent only the remaining virtual area.
      var spacerRows = Math.max(virtualRows - state.poolRows, 0);
      var spacerCols = Math.max(virtualCols - state.poolCols, 0);
      state.spacer.style.height = (spacerRows * state.rowHeight) + "px";
      state.spacer.style.width = (spacerCols * state.colWidth) + "px";

      // Optionally center the scroll position on initialization
      if (loop && param.centerOnInit === true) {
        var centerRow = Math.floor(virtualRows / 2);
        var centerCol = Math.floor(virtualCols / 2);
        container.scrollTop = centerRow * state.rowHeight;
        container.scrollLeft = centerCol * state.colWidth;
      }
    }

    // Update the populateObject with current cell data
    // rowDomIndex/colDomIndex: indices in the DOM pool (0 to poolRows/poolCols)
    // rowIndex/colIndex: virtual data indices (can be any number in infinite scroll)
    function updatePopulateObject(rowKey, colKey, rowIndex, colIndex, value, suppressCallbacks) {
      if (!populateObject) {
        return;
      }

      // Create unique key for this DOM row
      var rowKey = "lyteTestInfiniteRow-" + rowKey;

      // Initialize row object if it doesn't exist
      if (!param.populateObject[rowKey]) {
        Lyte.objectUtils(param.populateObject, "add", rowKey, {
          rowIndex: rowIndex,
          rowKey: rowKey,
          cells: []
        });
      }

      var rowObj = param.populateObject[rowKey];
      rowObj.rowIndex = rowIndex;
      // Map virtual row index to actual data row key using modulo for looping
      rowObj.rowKey = state.rowKeys[state.rowCount ? mod(rowIndex, state.rowCount) : 0] || null;

      // Ensure cells array is properly initialized
      if (!rowObj.cells || rowObj.cells.length !== state.poolCols) {
        let cells = [];
        for (var i = 0; i < state.poolCols; i++) {
            cells.push({ colIndex: i, colKey: "lyteTestInfiniteCol-" + i, value: value});
        }
        Lyte.objectUtils(populateObject[rowKey], "add", "cells", cells);
      }

      // Call before-update callback unless suppressed (e.g., during initialization)
      if (!suppressCallbacks) {
        onBeforeObjectUpdate({
          rowIndex: rowIndex,
          colIndex: colIndex,
          rowKey: rowObj.rowKey,
          colKey: state.colKeys[state.colCount ? mod(colIndex, state.colCount) : 0] || null,
          value: value
        });
      }

      // Update the cell data at the DOM index position
      // rowObj.cells[colKey] = {
      //   colIndex: colIndex,
      //   colKey: state.colKeys[state.colCount ? mod(colIndex, state.colCount) : 0] || null,
      //   value: value
      // };

      Lyte.objectUtils(param.populateObject[rowKey].cells[colKey], "add", {
        colIndex: colIndex,
        colKey: state.colKeys[state.colCount ? mod(colIndex, state.colCount) : 0] || null,
        value: value
      })

      // Call after-update callback unless suppressed
      if (!suppressCallbacks) {
        onObjectUpdate({
          rowIndex: rowIndex,
          colIndex: colIndex,
          rowKey: rowObj.rowKey,
          colKey: rowObj.cells[colKey].colKey,
          value: value
        });
      }
    }

    // Initialize the populateObject with initial data for all pool rows/cols
    function fillInitialPopulateObject() {
      if (!param.populateObject) {
        console.error("testInfiniteScroll: populateObject is required.");
        return false;
      }

      // Loop through all rows and columns in the rendering pool
      for (var r = 0; r < state.poolRows; r++) {
        for (var c = 0; c < state.poolCols; c++) {
          var dataRowIndex = r;
          var dataColIndex = c;
          // Get the data keys for this position (with wrapping if needed)
          var rKey = state.rowKeys[state.rowCount ? mod(dataRowIndex, state.rowCount) : 0];
          var cKey = state.colKeys[state.colCount ? mod(dataColIndex, state.colCount) : 0];
          // Extract value from dataMap or use empty string as default
          var value = (rKey && cKey && dataMap[rKey]) ? dataMap[rKey][cKey] : "";
          // Update populate object (callbacks may be suppressed for initial render)
          updatePopulateObject(dataRowIndex, dataColIndex, rKey, cKey, value, disableInitialRendering);
        }
      }

      return true;
    }

    // Wait for DOM elements to be rendered before proceeding
    // Uses requestAnimationFrame to retry until elements are found or max attempts reached
    function waitForDom(cb, minRows, minCols) {
      minRows = minRows || 1;
      minCols = minCols || 1;
      var attempts = 0;
      (function retry() {
        attempts++;
        var rows = getRows();
        // Check if both rows and cells exist in the DOM
        if (rows && rows.length >= minRows) {
          var cells = getCells(rows[0]);
          if (cells && cells.length >= minCols) {
            cb();  // Elements found, proceed with callback
            return;
          }
        }
        // Retry up to 30 times (roughly 0.5 seconds assuming 60fps)
        if (attempts < 30) {
          requestAnimationFrame(retry);
        }
      })();
    }

    function recomputePoolFromViewport() {
      if (!state.rowHeight || !state.colWidth) {
        return false;
      }
      var visibleRows = Math.max(1, Math.ceil(container.clientHeight / state.rowHeight));
      var visibleCols = Math.max(1, Math.ceil(container.clientWidth / state.colWidth));
      var nextPoolRows = Math.max(1, Math.min(state.rowCount || 1, visibleRows + bufferRows * 2));
      var nextPoolCols = Math.max(1, Math.min(state.colCount || 1, visibleCols + bufferCols * 2));
      if (nextPoolRows === state.poolRows && nextPoolCols === state.poolCols) {
        return false;
      }
      state.poolRows = nextPoolRows;
      state.poolCols = nextPoolCols;
      return true;
    }

    // Measure row height and column width from DOM or use provided values
    function measureSizes() {
      // Use provided row height if available
      if (param.rowHeight && typeof param.rowHeight === "number") {
        state.rowHeight = param.rowHeight;
      }
      // Use provided column width if available
      if (param.colWidth && typeof param.colWidth === "number") {
        state.colWidth = param.colWidth;
      }
      // Measure row height from first row element if not provided
      var rows = getRows();
      if (!state.rowHeight && rows.length) {
        state.rowHeight = rows[0].getBoundingClientRect().height;
      }
      // Measure column width from first cell element if not provided
      var cells = rows.length ? getCells(rows[0]) : null;
      if (!state.colWidth && cells && cells.length) {
        state.colWidth = cells[0].getBoundingClientRect().width;
      }
    }

    function logicalRowToDom(logicalRow) {
      return (state.rowOffset + logicalRow) % state.poolRows;
    }

    function logicalColToDom(logicalCol) {
      return (state.colOffset + logicalCol) % state.poolCols;
    }

    function updateRowAtLogical(logicalRow, dataRowIndex, rows) {
      var domRowIndex = logicalRowToDom(logicalRow);
      var rowEl = rows[domRowIndex];
      if (!rowEl) {
        return;
      }

      var rowTranslate = (dataRowIndex - domRowIndex) * state.rowHeight;
      onBeforeUpdate({ node: rowEl, rowIndex: dataRowIndex });
      onTransform(rowEl);
      $L(rowEl).css("transform", "translateY(" + rowTranslate + "px)");

      var cells = getCells(rowEl);
      for (var c = 0; c < state.poolCols; c++) {
        var domColIndex = logicalColToDom(c);
        var dataColIndex = state.colStart + c;
        var cellEl = cells[domColIndex];
        if (!cellEl) {
          continue;
        }
        var colTranslate = (dataColIndex - domColIndex) * state.colWidth;
        $L(cellEl).css("transform", "translateX(" + colTranslate + "px)");

        var rKey = state.rowKeys[state.rowCount ? mod(dataRowIndex, state.rowCount) : 0];
        var cKey = state.colKeys[state.colCount ? mod(dataColIndex, state.colCount) : 0];
        var value = (rKey && cKey && dataMap[rKey]) ? dataMap[rKey][cKey] : "";
        updatePopulateObject(domRowIndex, domColIndex, dataRowIndex, dataColIndex, value, false);
      }
    }

    function updateColumnAtLogical(logicalCol, dataColIndex, rows) {
      var domColIndex = logicalColToDom(logicalCol);
      for (var r = 0; r < state.poolRows; r++) {
        var domRowIndex = logicalRowToDom(r);
        var rowEl = rows[domRowIndex];
        if (!rowEl) {
          continue;
        }
        var cells = getCells(rowEl);
        var cellEl = cells[domColIndex];
        if (!cellEl) {
          continue;
        }
        var dataRowIndex = state.rowStart + r;
        var colTranslate = (dataColIndex - domColIndex) * state.colWidth;
        $L(cellEl).css("transform", "translateX(" + colTranslate + "px)");

        var rKey = state.rowKeys[state.rowCount ? mod(dataRowIndex, state.rowCount) : 0];
        var cKey = state.colKeys[state.colCount ? mod(dataColIndex, state.colCount) : 0];
        var value = (rKey && cKey && dataMap[rKey]) ? dataMap[rKey][cKey] : "";
        updatePopulateObject(domRowIndex, domColIndex, dataRowIndex, dataColIndex, value, false);
      }
    }

    function fullRender(rowStart, colStart, rows) {
      state.rowOffset = 0;
      state.colOffset = 0;
      state.rowStart = rowStart;
      state.colStart = colStart;

      for (var r = 0; r < state.poolRows; r++) {
        updateRowAtLogical(r, rowStart + r, rows);
      }
    }

    // Main render function: updates visible data and repositions elements based on scroll position
    function render() {
      // Don't render if sizes haven't been measured yet
      if (!state.rowHeight || !state.colWidth) {
        return;
      }
      // Don't render if there's no data
      if (state.rowCount === 0 || state.colCount === 0) {
        return;
      }

      var scrollTop = container.scrollTop;
      var scrollLeft = container.scrollLeft;

      // Calculate which row/col should be at the top-left, accounting for buffer
      var rowStart = Math.floor(scrollTop / state.rowHeight) - bufferRows;
      var colStart = Math.floor(scrollLeft / state.colWidth) - bufferCols;

      if (startAtZero && scrollTop <= 0) {
        rowStart = 0;
      }
      if (startAtZero && scrollLeft <= 0) {
        colStart = 0;
      }

      var maxRowStart = Math.max(0, state.rowCount - state.poolRows);
      var maxColStart = Math.max(0, state.colCount - state.poolCols);

      // If looping is disabled, clamp to valid ranges
      if (!loop) {
        rowStart = Math.max(0, Math.min(rowStart, maxRowStart));
        colStart = Math.max(0, Math.min(colStart, maxColStart));
      }

      var rows = getRows();
      if (!rows || !rows.length) {
        return;
      }

      if (state.lastRowStart === null || state.lastColStart === null) {
        fullRender(rowStart, colStart, rows);
      } else {
        var deltaRow = rowStart - state.rowStart;
        var deltaCol = colStart - state.colStart;

        if (deltaRow === 0 && deltaCol === 0) {
          return;
        }

        if (Math.abs(deltaRow) >= state.poolRows || Math.abs(deltaCol) >= state.poolCols) {
          fullRender(rowStart, colStart, rows);
        } else {
          if (deltaRow > 0) {
            for (var dr = 0; dr < deltaRow; dr++) {
              state.rowStart += 1;
              state.rowOffset = (state.rowOffset + 1) % state.poolRows;
              updateRowAtLogical(state.poolRows - 1, state.rowStart + state.poolRows - 1, rows);
            }
          } else if (deltaRow < 0) {
            for (var dr2 = 0; dr2 < Math.abs(deltaRow); dr2++) {
              state.rowStart -= 1;
              state.rowOffset = (state.rowOffset - 1 + state.poolRows) % state.poolRows;
              updateRowAtLogical(0, state.rowStart, rows);
            }
          }

          if (deltaCol > 0) {
            state.colStart += deltaCol;
            state.colOffset = mod(state.colOffset + deltaCol, state.poolCols);
            // After column ring-buffer offset changes, refresh all visible columns once.
            for (var rr = 0; rr < state.poolRows; rr++) {
              updateRowAtLogical(rr, state.rowStart + rr, rows);
            }
          } else if (deltaCol < 0) {
            state.colStart += deltaCol;
            state.colOffset = mod(state.colOffset + deltaCol, state.poolCols);
            // After column ring-buffer offset changes, refresh all visible columns once.
            for (var rr2 = 0; rr2 < state.poolRows; rr2++) {
              updateRowAtLogical(rr2, state.rowStart + rr2, rows);
            }
          }
        }
      }

      state.lastRowStart = state.rowStart;
      state.lastColStart = state.colStart;

      // Check if we've scrolled to the end of the data
      var endReached = (rowStart + state.poolRows >= state.rowCount) || (colStart + state.poolCols >= state.colCount);
      // Fire onLastSet callback once per data set (using key to prevent repeated calls)
      if (endReached && state.lastSetKey !== (state.rowCount + ":" + state.colCount)) {
        state.lastSetKey = state.rowCount + ":" + state.colCount;
        onLastSet();
      }
    }

    // Schedule a render on the next animation frame (prevents multiple renders per frame)
    function scheduleRender() {
      if (state.rafId) {
        return;  // Already scheduled
      }
      state.rafId = requestAnimationFrame(function () {
        state.rafId = null;
        render();
      });
    }

    // Attach scroll event listener with debouncing for scroll stop detection
    function attachScroll() {
      state.onScroll = function () {
        // Detect scroll start
        if (!state.scrolling) {
          onScrollStart();
          state.scrolling = true;
        }
        onScrolling();  // Fire on every scroll event
        // Clear existing timer and set new one to detect scroll stop
        if (state.scrollTimer) {
          clearTimeout(state.scrollTimer);
        }
        state.scrollTimer = window.setTimeout(function () {
          state.scrolling = false;
          onScrollStop();
        }, 100);  // 100ms debounce for scroll stop
        // Detect if scrolled to top-left corner
        if (container.scrollTop <= 0 || container.scrollLeft <= 0) {
          onScrollReset();
        }
        // Schedule a render for this scroll event
        scheduleRender();
      };
      container.addEventListener("scroll", state.onScroll);
    }

    // Setup window resize handler to recalculate sizes and re-render
    function setupResize() {
      state.resizeHandler = function () {
        // Reset sizes to force re-measurement
        state.rowHeight = null;
        state.colWidth = null;
        measureSizes();
        if (recomputePoolFromViewport()) {
          fillInitialPopulateObject();
          waitForDom(function () {
            measureSizes();
            setSpacerSize();
            state.lastRowStart = null;
            state.lastColStart = null;
            render();
          }, state.poolRows, state.poolCols);
          return;
        }
        setSpacerSize();
        render();
      };
      window.addEventListener("resize", state.resizeHandler);
    }

    // Initialize populate object with data - abort if this fails
    if (!fillInitialPopulateObject()) {
      return;
    }

    function finalizeInit() {
      ensureSpacer();      // Create spacer element
      setSpacerSize();     // Size it appropriately
      if (startAtZero) {
        container.scrollTop = 0;
        container.scrollLeft = 0;
      }
      attachScroll();      // Attach scroll listener
      setupResize();       // Attach resize listener
      render();            // Do initial render

      // Public API: Programmatically scroll to a specific cell
      container.scrollToCell = function (rowIndex, colIndex) {
        if (typeof rowIndex !== "number" || rowIndex < 0) {
          console.error("Invalid rowIndex");
          return;
        }
        if (typeof colIndex !== "number" || colIndex < 0) {
          console.error("Invalid colIndex");
          return;
        }
        // Set scroll position to show the specified cell
        container.scrollTop = rowIndex * state.rowHeight;
        container.scrollLeft = colIndex * state.colWidth;
        render();  // Force immediate render
      };

      // Public API: Refresh data from dataMap and re-render
      // Useful when the dataMap has been updated externally
      container.rePopulate = function () {
        dataMap = param.dataMap || {};
        state.rowKeys = toArrayKeys(dataMap);
        state.rowCount = state.rowKeys.length;
        state.colKeys = state.rowCount ? toArrayKeys(dataMap[state.rowKeys[0]]) : [];
        state.colCount = state.colKeys.length;
        if (recomputePoolFromViewport()) {
          fillInitialPopulateObject();
          waitForDom(function () {
            measureSizes();
            setSpacerSize();
            state.lastRowStart = null;
            state.lastColStart = null;
            render();
          }, state.poolRows, state.poolCols);
          return;
        }
        // Reset last rendered positions to force full re-render
        state.lastRowStart = null;
        state.lastColStart = null;
        setSpacerSize();
        render();
      };

      // Store state object on container for potential access/cleanup
      container._lyteTestInfinite2D = state;
    }

    // Wait for DOM elements to be rendered before setting up the scroll behavior
    waitForDom(function () {
      measureSizes();
      // Ensure we have valid dimensions
      if (!state.rowHeight || !state.colWidth) {
        console.error("testInfiniteScroll: rowHeight/colWidth could not be determined.");
        return;
      }
      if (recomputePoolFromViewport()) {
        fillInitialPopulateObject();
        waitForDom(function () {
          measureSizes();
          finalizeInit();
        }, state.poolRows, state.poolCols);
        return;
      }
      finalizeInit();
    }, state.poolRows, state.poolCols);
  };
})();
