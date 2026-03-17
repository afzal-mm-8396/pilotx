
; (function () {
  if ($L) {
    function sanitizeArrayPrototypeEnumerables() {
      //Just loop through all enumerable properties and make them non-enumerable
      var arrayProto = Array.prototype;
      for (var prop in arrayProto) {
        if (arrayProto.hasOwnProperty(prop)) {
          try {
            var desc = Object.getOwnPropertyDescriptor(arrayProto, prop);
            if (desc && desc.enumerable) {
              Object.defineProperty(arrayProto, prop, {
                value: desc.value,
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: false
              });
            }
          } catch (e) {
            console.error(e.message);
          }
        }
      }
    }

    sanitizeArrayPrototypeEnumerables();

    function lytePDFConverter(pdfInput, options = {}) {
      return new Promise((resolve, reject) => {
        try {
          var {
            pageNumber,
            pagesToRender = 'all',
            zoom = 1.2,
            container,
            format = 'jpeg'
          } = options;

          var pdfSource = validateAndGetPdfSource(pdfInput);
          let target = getTargetElement(container);

          pdfjsLib.getDocument({ url: pdfSource, useWorkerFetch: true }).promise.then(pdfDoc => {
            var totalPages = pdfDoc.numPages;
            var start = pageNumber || 1;
            var end = (pagesToRender === 'all')
              ? totalPages
              : (typeof pagesToRender === 'number' ? pagesToRender : totalPages);

            var dpi = window.devicePixelRatio || 1;
            var outputImages = [];
            var renderPromises = [];

            for (let pageNum = start; pageNum <= end; pageNum++) {
              var renderPromise = renderPage(pdfDoc, pageNum, target, zoom, dpi, format);
              renderPromises.push(renderPromise);
            }

            Promise.all(renderPromises)
              .then((results) => {
                // Collect all image data from rendered pages
                outputImages.push(...results);
                cleanupResources(pdfSource);
                cleanupDOM(target);
                resolve(outputImages);
              })
              .catch(error => {
                cleanupResources(pdfSource);
                cleanupDOM(target); 
                reject(error);
              });
          }).catch(error => {
            cleanupResources(pdfSource);
            cleanupDOM(target); 
            reject(error);
          });
        } catch (error) {
          reject(error);
        }
      });
    }


    $L.lytePDFConverter = lytePDFConverter;
    $L.lytePDFConverter.convert = lytePDFConverter;
    $L.lytePDFConverter.getInfo = getInfo;

    /**
     * Get PDF document info
     * @param {string|File} pdfInput - PDF file path or File object
     * @returns {Promise} Promise that resolves with PDF document info
     */
    function getInfo(pdfInput) {
      return new Promise((resolve, reject) => {
        try {
          var pdfSource = validateAndGetPdfSource(pdfInput);

          pdfjsLib.getDocument({ url: pdfSource, useWorkerFetch: true }).promise.then(pdfDoc => {
            var info = {
              numPages: pdfDoc.numPages,
              fingerprint: pdfDoc.fingerprints[0],
              isEncrypted: pdfDoc.isEncrypted
            };
            cleanupResources(pdfSource);
            resolve(info);
          }).catch(error => {
            cleanupResources(pdfSource);
            reject(error);
          });
        } catch (error) {
          reject(error);
        }
      });
    }

    /**
     * Get the target container element
     * @param {string|HTMLElement} container - Container selector or element
     * @returns {HTMLElement|null} Target element or null
     */
    function getTargetElement(container) {
      if (typeof container === "string") {
        return document.querySelector(container);
      } else if (container instanceof HTMLElement) {
        return container;
      }
      return null;
    }

    /**
     * Render a single PDF page
     * @param {object} pdfDoc - PDF document object
     * @param {number} pageNum - Page number to render
     * @param {HTMLElement} target - Target container
     * @param {number} zoom - Zoom level
     * @param {number} dpi - Device pixel ratio
     * @param {string} format - Output image format
     * @returns {Promise} Promise that resolves with image data
     */
    function renderPage(pdfDoc, pageNum, target, zoom, dpi, format) {
      return pdfDoc.getPage(pageNum).then(page => {
        var pageWrapper = createPageWrapper();
        if (target) { target.appendChild(pageWrapper); }

        var viewport = page.getViewport({ scale: zoom });
        var canvas = createCanvas(viewport, dpi);
        pageWrapper.appendChild(canvas);

        var renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };

        // Add text layer
        var textLayerDiv = createTextLayer(viewport);
        pageWrapper.appendChild(textLayerDiv);

        return page.render(renderContext).promise.then(() => {
          return page.getTextContent();
        }).then(textContent => {
          renderTextLayer(textContent, textLayerDiv, viewport);
          
          // Generate image from canvas
          var imageData = canvas.toDataURL(
            `image/${format}`,
            format === 'jpeg' ? 0.92 : 1.0
          );
          return imageData;
        });
      });
    }

    /**
     * Create page wrapper element
     * @returns {HTMLElement} Page wrapper div
     */
    function createPageWrapper() {
      var pageWrapper = document.createElement('div');
      pageWrapper.className = 'lytePdfWrapper';
      Object.assign(pageWrapper.style, {
        position: 'relative'
      });
      return pageWrapper;
    }

    /**
     * Create canvas element for PDF rendering
     * @param {object} viewport - PDF viewport
     * @param {number} dpi - Device pixel ratio
     * @returns {HTMLCanvasElement} Canvas element
     */
    function createCanvas(viewport, dpi) {
      var canvas = document.createElement('canvas');
      canvas.width = viewport.width * dpi;
      canvas.height = viewport.height * dpi;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      return canvas;
    }

    /**
     * Create text layer div
     * @param {object} viewport - PDF viewport
     * @returns {HTMLElement} Text layer div
     */
    function createTextLayer(viewport) {
      var textLayerDiv = document.createElement('div');
      textLayerDiv.className = 'lyte-pdf-text-layer';
      Object.assign(textLayerDiv.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        height: `${viewport.height}px`,
        width: `${viewport.width}px`,
        pointerEvents: 'auto',
        userSelect: 'text'
      });
      return textLayerDiv;
    }

    /**
     * Render text content on the text layer
     * @param {object} textContent - PDF text content
     * @param {HTMLElement} textLayerDiv - Text layer container
     * @param {object} viewport - PDF viewport
     */
    function renderTextLayer(textContent, textLayerDiv, viewport) {
      var items = Array.from(textContent.items);
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var span = document.createElement('span');
        span.textContent = item.str;

        var transform = pdfjsLib.Util.transform(
          viewport.transform,
          item.transform
        );
        var fontHeight = Math.sqrt(transform[2] ** 2 + transform[3] ** 2);

        Object.assign(span.style, {
          position: 'absolute',
          left: `${transform[4]}px`,
          top: `${transform[5] - fontHeight}px`,
          fontSize: `${fontHeight}px`,
          transform: `rotate(${Math.atan2(transform[1], transform[0])}rad)`,
          whiteSpace: 'pre',
          userSelect: 'text',
          color: 'transparent'
        });

        textLayerDiv.appendChild(span);
      }
    }

    /**
     * Validate PDF input and return appropriate source
     * @param {string|File} pdfInput - PDF file path or File object
     * @returns {string} PDF source URL
     */
    function validateAndGetPdfSource(pdfInput) {
      if (typeof pdfInput === 'string') {
        return pdfInput;
      } else if (pdfInput instanceof File) {
        return URL.createObjectURL(pdfInput);
      } else {
        throw new Error('Invalid PDF input. Expected string (URL) or File object.');
      }
    }

    /**
     * Clean up resources and revoke object URLs
     * @param {string} pdfSource - PDF source URL
     */
    function cleanupResources(pdfSource) {
      if (pdfSource && pdfSource.startsWith('blob:')) {
        URL.revokeObjectURL(pdfSource);
      }
    }

    /**
     * Clean up DOM elements and canvas 
     * @param {HTMLElement} target - Target container
     */
    function cleanupDOM(target) {
      if (target) {
        // Remove all PDF wrapper elements
        var wrappers = target.querySelectorAll('.lytePdfWrapper');
        wrappers.forEach(function(wrapper) {
          wrapper.remove();
        });
      }
    }
  }
})();




