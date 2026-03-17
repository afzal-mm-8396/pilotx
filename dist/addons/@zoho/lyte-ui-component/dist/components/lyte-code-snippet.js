/**
 * A component to display code snippets with syntax highlighting, line numbers, and copy functionality.
 * @component lyte-code-snippet
 * @plugin builder
 * plugins/code-snippet/builder.js
 * @plugin registrationClient
 * plugins/code-snippet/registrationClient.js
 * @plugin css-tokenizer
 * plugins/tokenizer/lyte-css-tokenizer.js
 * @plugin html-tokenizer
 * plugins/tokenizer/lyte-html-tokenizer.js
 * @plugin java-tokenizer
 * plugins/tokenizer/lyte-java-tokenizer.js
 * @plugin js-tokenizer
 * plugins/tokenizer/lyte-js-tokenizer.js
 * @plugin json-tokenizer
 * plugins/tokenizer/lyte-json-tokenizer.js
 * @plugin lyte-tokenizer
 * plugins/tokenizer/lyte-lytejs-tokenizer.js
 * @plugin python-tokenizer
 * plugins/tokenizer/lyte-python-tokenizer.js
 * @plugin sql-tokenizer
 * plugins/tokenizer/lyte-sql-tokenizer.js
 * @plugin text-tokenizer
 * plugins/tokenizer/lyte-text-tokenizer.js
 * @plugin xml-tokenizer
 * plugins/tokenizer/lyte-xml-tokenizer.js
 * @plugin yaml-tokenizer
 * plugins/tokenizer/lyte-yaml-tokenizer.js
 */

Lyte.Component.register( 'lyte-code-snippet', {
_template:"<template tag-name=\"lyte-code-snippet\" lyte-code-snippet=\"\"> <div class=\"lyteCodeSnippetWrapper\"> <div class=\"lyteCSHeader\"> <template is=\"if\" value=\"{{ltPropTitle}}\"><template case=\"true\"> <div class=\"lyteCSTitle\"> {{ltPropTitle}} </div> </template></template> <template is=\"if\" value=\"{{ltPropShowCopyButton}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropCopyButtonAppearance,'===',&quot;text&quot;)}}\"><template case=\"true\"> <lyte-button class=\"lyteCSCopyButton\" onclick=\"{{action('copyCode')}}\"> <template is=\"registerYield\" yield-name=\"text\"> copy </template> </lyte-button> </template><template case=\"false\"> <span class=\"lyteCSCopyIcon\" onclick=\"{{action('copyCode')}}\" lt-prop-title=\"{{ltPropCopyTooltipText}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></span> </template></template> </template></template> </div> <div class=\"lyteCSContainer\" onscroll=\"{{action('alignCodeAndLineContainer',event)}}\" style=\"height: 100%;\"> <template is=\"if\" value=\"{{ltPropShowLineNumber}}\"><template case=\"true\"> <div class=\"lyteCSLineNumberContainer\"> </div> </template></template> <template is=\"if\" value=\"{{ltPropWrapCode}}\"><template case=\"true\"> <div class=\"lyteCSCodeContainer lyteCSCodeClassForWrapping\"></div> </template><template case=\"false\"> <div class=\"lyteCSCodeContainer\"></div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}}],
_observedAttributes :["ltPropCode","ltPropType","ltPropLazyLoading","ltPropShowCopyButton","ltPropShowLineNumber","ltPropEnableIndentation","ltPropTitle","ltPropCopyMessagePreview","ltPropCopyMessageOnSuccess","ltPropCopyMessageOnFailure","ltPropCopyButtonAppearance","ltPropCopyTooltipText","ltPropHeight","ltPropEnableTypeWriting","ltPropWrapCode","ltPropTooltipConfig","ltPropTypeWriterController","isLoadingLazily"],
_observedAttributesType :["string","string","boolean","boolean","boolean","boolean","string","boolean","string","string","string","string","string","boolean","boolean","object","object","boolean"],

	data: function() {
		return {
			/**
			 * @componentProperty {string} ltPropCode Defines the code snippet to be displayed.
			 * @default ''
			* @input
			 */
			'ltPropCode': Lyte.attr('string', { 'default': '', 'in': true }),

			/**
			 * @componentProperty {css | html | java | js | json | lyte | python | sql | text | xml | yaml} ltPropType Defines the type of code snippet (e.g., 'js', 'html', 'css').
			 * @default 'js'
			 * @input
			 */
			'ltPropType': Lyte.attr('string', { 'default': 'js', 'in': true }),
			// 'ltPropInitialLineCount': Lyte.attr( 'number', { 'default': 100 } ),
			// 'ltPropLinesPerScroll': Lyte.attr( 'number', { 'default': 100 } ),
			/**
			 * @componentProperty {boolean} ltPropLazyLoading Enables lazy loading of code snippets, loading them in batches for performance.
			 * @default false
			 * @input
			 */
			'ltPropLazyLoading': Lyte.attr('boolean', { 'default': false, 'in': true }),

			/**
			 * @componentProperty {boolean} ltPropShowCopyButton Controls the visibility of the copy button for the code snippet.
			 * @default true
			 * @input
			 */
			'ltPropShowCopyButton': Lyte.attr('boolean', { 'default': true, 'in': true }),

			/**
			 * @componentProperty {boolean} ltPropShowLineNumber Controls the visibility of line numbers in the code snippet.
			 * @default true
			 * @input
			 */
			'ltPropShowLineNumber': Lyte.attr('boolean', { 'default': true, 'in': true }),

			/**
			 * @componentProperty {boolean} ltPropEnableIndentation Controls whether indentation is applied to the code snippet.
			 * @default true
			 * @input
			 */
			'ltPropEnableIndentation': Lyte.attr('boolean', { 'default': true, 'in': true }),

			/**
			 * @componentProperty {string} ltPropTitle Defines the title of the code snippet, displayed above the code.
			 * @default ''
			 * @input
			 */
			'ltPropTitle': Lyte.attr('string', { 'default': '', 'in': true }),

			/**
			 * @componentProperty {boolean} ltPropCopyMessagePreview Controls whether a message preview is shown when the code is copied.
			 * @default true
			 * @input
			 */
			'ltPropCopyMessagePreview': Lyte.attr('boolean', { 'default': true, 'in': true }),

			/**
			 * @componentProperty {string} ltPropCopyMessageOnSuccess The message displayed when the code is successfully copied to the clipboard.
			 * @default Copied
			 * @input
			 */
			'ltPropCopyMessageOnSuccess': Lyte.attr('string', { 'default': _lyteUiUtils.i18n('lyte.codesnippet.success.message'), 'in': true }),

			/**
			 * @componentProperty {string} ltPropCopyMessageOnFailure The message displayed when the code copy operation fails.
			 * @default Unable to copy
			 * @input
			 */
			'ltPropCopyMessageOnFailure': Lyte.attr('string', { 'default': _lyteUiUtils.i18n('lyte.codesnippet.failure.message'), 'in': true }),

			/**
			 * @componentProperty {text | icon} ltPropCopyButtonAppearance Defines the appearance of the copy button, such as 'text' or 'icon'.
			 * @default 'text'
			 * @input
			 */
			'ltPropCopyButtonAppearance': Lyte.attr('string', { 'default': _lyteUiUtils.resolveDefaultValue('lyte-code-snippet', 'copyButtonAppearance', 'text'), 'in': true }),
			/**
			 * @componentProperty {string} ltPropCopyTooltipText The tooltip text displayed when hovering over the copy button.
			 * @default Copy
			 * @input
			 */
			'ltPropCopyTooltipText': Lyte.attr('string', { 'default': _lyteUiUtils.resolveDefaultValue('lyte-code-snippet', 'copyTooltipText', _lyteUiUtils.i18n("lyte.codesnippet.copy")), 'in': true }),
			/**
			 * @componentProperty {string} ltPropHeight The height of the code snippet container, will be used as pixel.
			 * @default 400px
			 * @input
			 * @suffix px,pt,cm,mm,vh,vm,em
			 */
			'ltPropHeight': Lyte.attr('string', { 'default': '400vm', 'in': true }),
			/**
			 * @componentProperty {boolean} ltPropEnableTypeWriting Controls whether typewriting effect is enabled for the code snippet.
			 * @default false
			 * @condition ltPropLazyLoading false
			 * @input
			 */
			'ltPropEnableTypeWriting': Lyte.attr('boolean', { 'default': false, 'in': true }),
			/**
			 * @componentProperty {boolean} ltPropWrapCode Controls whether the code snippet should wrap lines that exceed the container width.
			 * @default false
			 * @input
			 */
			'ltPropWrapCode': Lyte.attr('boolean', { 'default': false, 'in': true }),
			/**
			 * @componentProperty {object} ltPropTooltipConfig Configuration object for the tooltip displayed on the copy button
			 * @default { "position": "bottom" }
			 * @input
			 * @condition ltPropCopyButtonAppearance icon
			 */
			'ltPropTooltipConfig': Lyte.attr('object', { 'default': { "position": "bottom" }, 'in': true }),
			/**
			 * @componentProperty {object} ltPropTypeWriterController Instance of the typewriter controller for managing typewriting effect.
			 * @default {}
			 * @output
			 * @condition ltPropEnableTypeWriting true
			 */
			'ltPropTypeWriterController': Lyte.attr('object', { 'default': {} }),

			'isLoadingLazily': Lyte.attr('boolean', { 'default': false })
		};
	},

	didConnect: function() {
		this.createMessageBox();
		// Add resize event listener for wrapped code synchronization
		this._boundHandleResize = this.handleResize.bind(this);
		window.addEventListener('resize', this._boundHandleResize);
	},

	didDestroy: function () {
		// Clean up resize event listener
		if (this._boundHandleResize) {
			window.removeEventListener('resize', this._boundHandleResize);
		}

		// Clear any pending resize timeout
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
	},

	/**
	 * Locally control whether indentation has to be added or not
	 * @functionType function indentCode
	 */
	indentCode: function () {
		var indentCode = this.getData('ltPropEnableIndentation');
		if (indentCode) {
			$L.snippets.specificIndent = true;
		} else {
			$L.snippets.specificIndent = false;
		}
	}.observes('ltPropEnableIndentation').on('didConnect'),

	/**
	 * Create the message box element if it doesn't already exist.
	 * @functionType function createMessageBox
	 */
	createMessageBox: function() {
		if( this.getMessageBox() ) {
			return ;
		}

		var messageBox = document.createElement( 'lyte-messagebox' );

		messageBox.setAttribute( 'id', 'lyteCSMessageBox' );

		if( _lyteUiUtils.appendLocation === 'first' ) {
			document.body.insertBefore( messageBox, document.body.children[ 0 ] );
		}
		else {
			document.body.appendChild( messageBox );
		}
	},

	/**
	 * Synchronizes line numbers with wrapped code lines when ltPropWrapCode is enabled.
	 * 
	 * When code wrapping is enabled, long lines can span multiple visual lines, but the
	 * line numbers should only appear on the first visual line of each actual code line.
	 * 
	 * This function:
	 * 1. Calculates how many visual lines each code line will occupy when wrapped
	 * 2. Creates line number elements that match the visual layout
	 * 3. Shows the line number only on the first visual line of each code line
	 * 4. Adds empty spacer elements for continuation lines to maintain alignment
	 * 
	 * The function handles:
	 * - Dynamic container width changes
	 * - Different font sizes and line heights
	 * - Empty lines and varying line lengths
	 * - Performance optimization through DOM fragment usage
	 * 
	 * @functionType function syncLineNumbers
	 */
	syncLineNumbers: function () {
		var showLineNumber = this.getData('ltPropShowLineNumber');
		var wrapCode = this.getData('ltPropWrapCode');

		if (!showLineNumber || !wrapCode) {
			return;
		}

		var codeContainer = this.getSnippetContainer();
		var lineNumberContainer = this.getLineNumberContainer();

		if (!codeContainer || !lineNumberContainer) {
			return;
		}

		// Wait for the DOM to be fully rendered
		setTimeout(() => {
			this.performLineNumberSync();
		}, 0);
	},

	performLineNumberSync: function () {
		return new Promise((resolve) => {
			var codeContainer = this.getSnippetContainer();
			var lineNumberContainer = this.getLineNumberContainer();
			if (!codeContainer || !lineNumberContainer) {
				return resolve()
			};

			if (this.getData('ltPropLazyLoading')) {
				codeContainer = codeContainer.querySelector('div');
			}

			var computedStyle = window.getComputedStyle(codeContainer);
			var lineHeight = parseFloat(computedStyle.lineHeight);
			var allNodes = Array.from(codeContainer.childNodes);

			// Step 1: Group nodes by logical line
			var lines = [];
			var currentLine = [];

			allNodes.forEach(node => {
				var isLineBreak =
					node.nodeType === 1 &&
					node.classList.contains('lyteCSWhiteSpace') &&
					node.textContent === '\n';

				if (isLineBreak) {
					lines.push(currentLine);
					currentLine = [];
				} else {
					currentLine.push(node);
				}
			});

			if (currentLine.length > 0) {
				lines.push(currentLine);
			}
			var fragment = document.createDocumentFragment();

			lines.forEach((lineNodes, index) => {
				var tempLine = document.createElement('div');
				tempLine.style.whiteSpace = computedStyle.whiteSpace;

				lineNodes.forEach(node => {
					tempLine.appendChild(node.cloneNode(true));
				});

				codeContainer.appendChild(tempLine);

				var elementHeight = tempLine.offsetHeight;
				var wrappedLines = Math.max(1, Math.round(elementHeight / lineHeight));
				codeContainer.removeChild(tempLine);
				for (var j = 0; j < wrappedLines; j++) {
					var lineNumberSpan = document.createElement('span');
					lineNumberSpan.className = 'lyteCSLineNumber';
					lineNumberSpan.style.height = lineHeight + 'px';
					lineNumberSpan.style.lineHeight = lineHeight + 'px';
					lineNumberSpan.style.display = 'block';

					if (j === 0) {
						lineNumberSpan.textContent = index + 1;
					} else {
						lineNumberSpan.innerHTML = '&nbsp;';
						lineNumberSpan.style.color = 'transparent';
					}

					fragment.appendChild(lineNumberSpan);
				}
			});

			lineNumberContainer.innerHTML = '';
			lineNumberContainer.appendChild(fragment);

			resolve(); // ✅ Promise resolved after DOM update
		});
	},

	/**
	 * Controls whether lazy loading is enabled for code snippets.
	 * @functionType function lazyLoader
	 */
	lazyLoader: function () {
		var lazyLoading = this.getData('ltPropLazyLoading');
		$L.snippets.lazyLoading = lazyLoading;
	}.observes('ltPropLazyLoading').on('didConnect'),

	/**
	 * Tokenizes the code snippet based on its type and builds the snippet for display.
	 * @functionType function tokenizeAndBuild
	 */
	tokenizeAndBuild: function() {
		var type = this.getData( 'ltPropType' ) || 'js',
		code = this.getData( 'ltPropCode' );

		if( !this.isContainerEmpty() ) {
			this.removeBuiltCode();
		}

		if( code ) {
			var builder = $L.snippets.getBuilder( type, code ),
				result = builder.build();
			if (result.lazy) {
				this.setData('isLoadingLazily', true);
				this.fixDimensionsAndAppend(result.snippet);
				let currentLine = 1;
				const process = () => {
					const batch = result.processNext();

					if (batch.lineCountInBatch > 0) {
						this.buildLineNumbers(currentLine, batch.lineCountInBatch);
						currentLine += batch.lineCountInBatch;
					}

					if (!batch.done) {
						requestAnimationFrame(process);
					} else {
						this.setData('isLoadingLazily', false);
						// Check if wrapping is enabled and sync line numbers after lazy loading is complete
						var wraptext = this.getData('ltPropWrapCode');
						if (wraptext) {
							this.syncLineNumbers();
						}
					}
				};
				process();
			} else {
				this.buildLineNumbers(1, result.lineCount);
				this.fixDimensionsAndAppend(result.snippet);
			}
		}
	}.observes('ltPropCode').on('didConnect'),

	/**
	 * Creates line numbers for the code snippet based on the total number of lines or a specified range.
	 * @functionType function buildLineNumbers
	 * @param {number} startOrTotal 
	 * @param {number} countIfLazy 
	 */
	buildLineNumbers: function (startOrTotal, countIfLazy) {
		var docFrag = document.createDocumentFragment(),
		showLineNumber = this.getData( 'ltPropShowLineNumber' );

		if( !showLineNumber ) {
			return ;
		}

		// Determine if it's lazy (range-based) or full build
		var start = countIfLazy !== undefined ? startOrTotal : 1;
		var end = countIfLazy !== undefined ? (start + countIfLazy - 1) : startOrTotal;

		for (var i = start; i <= end; i++) {
			var line = document.createElement('span');
			line.setAttribute( 'class', 'lyteCSLineNumber' );
			line.textContent = i;
			docFrag.appendChild( line );
		}

		this.getLineNumberContainer().appendChild( docFrag );
	},

	/**
	 * Checks if the code snippet container is empty.
	 * @returns {boolean} true if the code snippet container is empty, false otherwise.
	 */
	isContainerEmpty: function() {
		var children = this.getChildren();

		return children.length === 0;
	},

	/**
	 * Retrieves the children of the code snippet container.
	 * @returns {HTMLCollection} The children of the code snippet container.
	 */
	getChildren: function() {
		var container = this.getSnippetContainer();

		return container.children;
	},

	/**
	 * Removes the built code snippet from the container.
	 * @functionType function removeBuiltCode
	 */
	removeBuiltCode: function() {
		var container = this.getSnippetContainer(),
			lineNumberContainer = this.getLineNumberContainer();

		container.innerHTML = '';

		if( lineNumberContainer ) {
			lineNumberContainer.innerHTML = '';
		}
	},

	/**
	 * Fixes the dimensions of the snippet container and appends the snippet.
	 * @param {HTMLElement} snippet 
	 * @param {object} highlighterObj 
	 */
	fixDimensionsAndAppend: function( snippet, highlighterObj ) {
		var container = this.getSnippetContainer(),
		lineCount = ( highlighterObj || {} ).lineCount;
		var enableTypeWriting = this.getData('ltPropEnableTypeWriting');
		var wrapCode = this.getData('ltPropWrapCode');
		var lazyLoading = this.getData('ltPropLazyLoading');
		var height = '2px';
		var totalHeight = height * lineCount;
		container.style.height = totalHeight + 'px';
		if (!enableTypeWriting) {
			container.appendChild(snippet);
		}
		var childNodes = container.childNodes;

		// First, adjust size and calculate line numbers if wrapping is enabled
		this.adjustSize();

		if (wrapCode) {
			var lineNumberPromise = this.performLineNumberSync();
		} else {
			this.syncLineNumbers();

			// If wrapping is disabled, resolve immediately to keep flow consistent
			var lineNumberPromise = Promise.resolve();
		}

		lineNumberPromise.then(() => {
			// Typewriter starts *only after* line number sync finishes
			if (enableTypeWriting && !lazyLoading) {
				var div = document.createElement("div");
				div.appendChild(snippet.cloneNode(true));
				var htmlSnippet = div.innerHTML;
				var typeWriter = $L.typeWriter.enable({
					container: container,
					type: 'html',
					htmlSnippet: htmlSnippet,
					rate: 8
				});
				this.setData("ltPropTypeWriterController", typeWriter);
			}
		});

	},
	/**
	 * Adjusts the size of the code snippet container based on the height property.
	 * @functionType function adjustSize
	 */
	adjustSize: function () {
		var container = this.$node.querySelector('.lyteCodeSnippetWrapper');
		var height = this.getData('ltPropHeight');

		if (height) {
			container.style.height = height;
		}
	},

	/**
	 * Observes changes to the height property and adjusts the size of the code snippet container accordingly.
	 * @functionType function heightObserver
	 */
	heightObserver: function () {
		var height = this.getData('ltPropHeight');
		if (height) {
			this.adjustSize();
		}
	}.observes('ltPropHeight'),

	/**
	 * Retrieves the snippet container element.	
	 * @returns {HTMLElement} The code snippet container element.
	 */
	getSnippetContainer: function() {
		return this.$node.querySelector( '.lyteCSCodeContainer' );
	},

	/**
	 * Retrieves the line number container element.
	 * @returns {HTMLElement} The line number container element.
	 */
	getLineNumberContainer: function() {
		return this.$node.querySelector( '.lyteCSLineNumberContainer' );
	},

	/**
	 * Checks if the given element is empty (i.e., has no child elements).
	 * @param {HTMLElement} element 
	 * @returns {boolean} true if the element is empty, false otherwise.
	 */
	isEmpty: function( element ) {
		return !element.querySelector( '*' );
	},

	/**
	 * Displays a success message in the message box when the code is copied successfully.
	 * @functionType function displaySuccessMessage
	 */
	displaySuccessMessage: function() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', this.getData( 'ltPropCopyMessageOnSuccess' ) );
		messageBox.ltProp( 'type', 'success' );
		messageBox.ltProp( 'show', true );
	},

	/**
	 * Retrieves the message box element.
	 * @returns {HTMLElement} The message box element.
	 */
	getMessageBox: function() {
		return document.getElementById( 'lyteCSMessageBox' );
	},

	/**
	 * Displays a failure message in the message box when the code copy operation fails.
	 * @functionType function displayFailureMessage
	 */
	displayFailureMessage: function() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', this.getData( 'ltPropCopyMessageOnFailure' ) );
		messageBox.ltProp( 'type', 'error' );
		messageBox.ltProp( 'show', true );
	},

	actions: {
		/**
		* This action will be called when the code snippet container is scrolled.
		* @functionType action alignCodeAndLineContainer
		* @param {Event} event The scroll event triggered by the code snippet container.
		*/
		alignCodeAndLineContainer: function( event ) {
			var codeContainer = event.target,
				scrollPosition = codeContainer.scrollTop,
			showLineNumber = this.getData( 'ltPropShowLineNumber' );

			if( !showLineNumber ) {
				return ;
			}

			this.getLineNumberContainer().scrollTop = scrollPosition;
		},

		/**
		 * This action is triggered when the copy button is clicked.
		 * @functionType action copyCode
		 */
		copyCode: function () {
			/**
			 * This callback is fired before the code is copied.
			 * @method onBeforeCopy
			* @author anjima.santhosh @zohocorp.com
			 * @version 3.101.0
			*/
			if (this.getMethods('onBeforeCopy')) {
				this.executeMethod('onBeforeCopy', this);
			}
			var messagePreview = this.getData('ltPropCopyMessagePreview');
			// var text = this.getData('ltPropCode') || '';
			var text = this.$node.querySelector('.lyteCSCodeContainer').innerText || '';
			var that = this;
			var isLoadingLazily = this.getData('isLoadingLazily');
			if (isLoadingLazily) {
				var text = this.getData('ltPropCode') || '';
			}
			if (_lyteUiUtils.copy2clip) {
				_lyteUiUtils.copy2clip(text.replace(/&/g, '&amp;').replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/</g, '&lt;').replace(/>/g, '&gt;'),
					function () {
						if (messagePreview) {
							var messageBox = document.getElementById('lyteCSMessageBox');
							messageBox.ltProp('message', that.getData('ltPropCopyMessageOnSuccess'));
							messageBox.ltProp('type', 'success');
							messageBox.ltProp('show', true);
						}
					},
					function () {
						if (messagePreview) {
							var messageBox = document.getElementById('lyteCSMessageBox');
							messageBox.ltProp('message', that.getData('ltPropCopyMessageOnFailure'));
							messageBox.ltProp('type', 'error');
							messageBox.ltProp('show', true);
						}
				} )
			}
			else {
				navigator.clipboard.writeText(text).then(function () {
					if (messagePreview) {
						that.displaySuccessMessage();
					}
					}, function (err) {
					if (messagePreview) {
						that.displayFailureMessage();
					}
				});
			}
			/**
			 * This callback is fired after the code is copied.
			 * @method onAfterCopy
			 * @author anjima.santhosh@zohocorp.com
			 * @version 3.117.0
			*/
			if (this.getMethods('onAfterCopy')) {
				this.executeMethod('onAfterCopy', this);
			}
		}
	},

	/**
	 * Handles window resize events to re-synchronize line numbers when wrapping is enabled.
	 * This is important because window resizing can change how lines wrap.
	 * @functionType function handleResize
	 */
	handleResize: function () {
		var wrapCode = this.getData('ltPropWrapCode');
		if (wrapCode) {
			// Debounce the resize event to avoid too many calculations
			clearTimeout(this._resizeTimeout);
			this._resizeTimeout = setTimeout(() => {
				this.syncLineNumbers();
			}, 150);
		}
	},

	/**
	 * Observes changes to the wrap code property and re-synchronizes line numbers accordingly.
	 * @functionType function wrapCodeObserver
	 */
	wrapCodeObserver: function () {
		var wrapCode = this.getData('ltPropWrapCode');
		var codeContainer = this.getSnippetContainer();

		if (codeContainer) {
			if (wrapCode) {
				// Apply wrap styling
				this.syncLineNumbers();
			}
		}
	}.observes('ltPropWrapCode')
});

/**
 * @syntax ltPropType=js
 * <lyte-code-snippet lt-prop-code={{jsCode}} lt-prop-type="js"></lyte-code-snippet>
 */
