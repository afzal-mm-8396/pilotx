; (function () {
    if ($L) {
        $L.cardify = {};
        var isCardifyForm = false;
        var lyteCardifyFormButton = {};
        /**
         * Util to generate a card element based on the schema and payload
         * @param {*} schema The content for the card
         * @param {*} payload The data to be rendered in the card
         * @returns the card element
         */
        $L.cardify.generate = function (schema, payloadData) {
            var content = schema.body;
            var card = generateCard(content, payloadData);
            card = addStyling(card, schema.cssConfig || {});
            return card;
        }

        /**
         * Add styling to the card
         * @param {HTMLElement} card 
         * @param {*} cssConfig 
         * @returns the card element with the applied css
         */
        function addStyling(card, cssConfig) {
            for (var key in cssConfig) {
                card.style[key] = cssConfig[key];
            }
            return card;
        }

        /**
         * Add the css styling to the card
         * @param {htmlElement} element 
         * @param {object} styleProperties 
         * @param {object} elementData 
         * @param {object} payloadData
         * @returns the element with the applied css
         */
        function applyStyleProperties(element, styleProperties, elementData, payloadData) {
            var len = styleProperties.length;
            for (var i = 0; i < len; i++) {
                var property = styleProperties[i];
                if (elementData[property]) {
                    var value = resolveText(elementData[property], payloadData, '');
                    if (value) {
                        element.style[property] = value;
                    }
                }
            }
            return element;
        }

        /**
         * Resolve the text with the user data
         * @param {string} text 
         * @param {object} userData 
         * @param {any} defaultValue The default value to return if the resolved value is null or undefined
         * @returns the resolved text or the default value
         */
        function resolveText(text, userData, defaultValue) {
            if (text === undefined || text === null) {
                return defaultValue;
            }
            if (typeof text !== 'string') {
                return text; // If already not a string, return as is
            }

            let match = text.match(/^\$\{([^}]+)\}$/); // Check if it's a single placeholder
            if (match) {
                var resolvedValue = match[1].split('.').reduce(function (obj, prop) {
                    return obj && obj[prop];
                }, userData);
                return resolvedValue != null ? resolvedValue : defaultValue;
            }

            // Cache for resolved keys
            var cache = {};
            return text.replace(/\$\{([^}]+)\}/g, function (_, key) {
                if (cache.hasOwnProperty(key)) {
                    return cache[key];
                }
                var resolvedValue = key.split('.').reduce(function (obj, prop) {
                    return obj && obj[prop];
                }, userData);
                cache[key] = resolvedValue != null ? String(resolvedValue) : String(defaultValue);
                return cache[key];
            });
        }

        /**
         * Generate the card based on the content and payload
         * @param {array} contentArray 
         * @param {object} payload
         * @returns the card element
         */
        function generateCard(contentArray, payloadData) {
            var outerDiv = document.createElement("div");
            var fragment = document.createDocumentFragment();

            for (var i = 0; i < contentArray.length; i++) {
                var elementData = contentArray[i];
                var newElement = generateElement(elementData, payloadData);
                if (newElement) {
                    fragment.appendChild(newElement);
                    fragment.appendChild(document.createElement("br"));
                }
            }

            // Apply styles to the outer div
            outerDiv.style.fontFamily = "'Segoe UI', sans-serif";
            outerDiv.style.fontSize = "14px";
            outerDiv.style.backgroundColor = "#eceff1";
            outerDiv.style.border = "1px solid #e6e6e6";
            outerDiv.style.padding = '8px';
            outerDiv.style.width = '416px';
            outerDiv.style.borderRadius = '4px';
            outerDiv.style.boxSizing = 'border-box';
            outerDiv.appendChild(fragment);
            return outerDiv;
        }

        /**
         * Generate the element based on the element data
         * @param {object} elementData 
         * @param {object} payloadData
         * @returns the created element
         */
        function generateElement(elementData, payloadData) {
            var componentMap = {
                textBlock: createTextBlock,
                button: createButton,
                image: createImage,
                video: createVideo,
                table: createTable,
                flexBox: createFlexBox,
                formComponent: createForm,
                dropdown: createDropdown,
                checkbox: createCheckbox,
                textInput: createTextInput,
                dateInput: createDateInput,
                timeInput: createTimeInput,
                numInput: createNumInput,
                passwordInput: createPasswordInput
            };

            var createComponent = componentMap[elementData.component];
            return createComponent ? createComponent(elementData, payloadData) : null;
        }

        //Components
        /**
         * Create a text block element
         * Paragraph or lyte-text based on the allowMultiLine property
         * If allowMultiLine is true, then a paragraph element is created
         * If allowMultiLine is false, then a lyte-text element is created
         * @param {object} elementData 
         * @returns the created text block element
         */
        function createTextBlock(elementData, payloadData) {
            var newText = document.createElement("p");
            newText.textContent = resolveText(elementData.text, payloadData, '');
            var properties = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'lineHeight'];
            newText = applyStyleProperties(newText, properties, elementData, payloadData);
            newText.style.display = resolveText(elementData.isVisible, payloadData, 'block');
            newText.id = resolveText(elementData.id, payloadData, '');
            return newText;
        }

        /**
         * The button element is created with the title, type, appearance and action properties
         * The action property is used to determine the action to be performed when the button is clicked
         * The button can have the following actions:
         * 1. openUrl - Opens the url in a new tab
         * 2. submit - The callback will be called with the names and values of connected inputs
         * 3. showCard - Shows the card element
         * 4. toggleVisibility - Toggles the visibility of the target elements
         * 5. execute - Executes the callback function
         * @param {object} elementData 
         * @returns the created button element
         */
        function createButton(elementData, payloadData) {
            var newInnerDiv = document.createElement("div");
            var newBtn = document.createElement("lyte-button");
            newBtn.setData({
                'ltPropText': resolveText(elementData.title, payloadData, ''),
                'ltPropType': resolveText(elementData.type, payloadData, 'button'),
                'ltPropAppearance': resolveText(elementData.appearance, payloadData, 'primary'),
                'ltPropStyle': resolveText(elementData.style, payloadData, ''),
                'ltPropClass': resolveText(elementData.class, payloadData, ''),
                'ltPropDisabled': resolveText(elementData.disabled, payloadData, false),
                'ltPropId': resolveText(elementData.id, payloadData, '')
            });
            newInnerDiv.appendChild(newBtn);
            if (resolveText(elementData.isVisible, payloadData, true) === false) {
                newBtn.style.display = 'none';
            }
            var action = resolveText(elementData.action, payloadData, '');
            if (action === 'openUrl') {
                var openInCurrentTab = resolveText(elementData.openInCurrentTab, payloadData, false);
                var url = resolveText(elementData.url, payloadData, '');
                newBtn.addEventListener('click', function () { openUrlAction(url, openInCurrentTab) })
            }

            else if (action === 'submit') {
                var inputs = resolveText(elementData.connectedInputs, payloadData, []);
                var callbackFn = resolveText(elementData.callback, payloadData, function () {});
                newBtn.setData({
                    'ltPropType': 'submit'
                });
                if (isCardifyForm) {
                    lyteCardifyFormButton = { "data": elementData, "node": newBtn };
                } else {
                    newBtn.addEventListener('click', function () {
                        submitAction(inputs, callbackFn);
                    })
                }
            }

            else if (action === 'showCard') {
                if (typeof (elementData.card) === 'string') {
                    var newCardData = resolveText(elementData.card, payloadData, {});
                    var newCardSchema = newCardData.body;
                    var newCard = generateCard(newCardSchema, payloadData, {});
                    var cssConfig = newCardData.cssConfig;
                }
                else {
                    var newCard = generateCard(elementData.card.body, payloadData);
                    var cssConfig = elementData.card.cssConfig;
                }
                addStyling(newCard, cssConfig, payloadData || {});

                newCard.style.display = 'none'
                newInnerDiv.appendChild(newCard);

                newBtn.addEventListener('click', function () {
                    showCardAction(newCard)
                });
            }

            else if (action === 'toggleVisibility') {
                var targetElements = resolveText(elementData.targetElements, payloadData, []);
                newBtn.addEventListener('click', function () {
                    toggleVisibilityAction(targetElements);
                })
            }

            else if (action === 'execute') {
                var inputs = resolveText(elementData.connectedInputs, payloadData, []);
                var callbackFn = resolveText(elementData.callback, payloadData, function () {});
                newBtn.addEventListener('click', function (event) {
                    executeAction(callbackFn, newBtn, event, inputs)
                });
            }
            return newInnerDiv;
        }

        /**
         * Create an image element based on the image data
         * the img tag is enclosed in a div tag
         * @param {object} elementData 
         * @returns the created image element
         */
        function createImage(elementData, payloadData) {
            var newDiv = document.createElement("div");
            var newImg = document.createElement("img");
            // Set attributes and styles based on elementData properties
            var attributes = ['src', 'alt', 'id'];
            var styles = ['background', 'height', 'width', 'textAlign'];

            // Set attributes
            for (var i = 0; i < attributes.length; i++) {
                var attr = attributes[i];
                var resolvedAttrValue = resolveText(elementData[attr], payloadData, '');
                if (resolvedAttrValue) {
                    newImg[attr] = resolvedAttrValue;
                }
            }

            // Set styles
            for (var j = 0; j < styles.length; j++) {
                var style = styles[j];
                var resolvedStyleValue = resolveText(elementData[style], payloadData, '');
                if (resolvedStyleValue) {
                    newImg.style[style] = resolvedStyleValue;
                }
            }
            //isVisible
            if (resolveText(elementData.isVisible, payloadData, true)) {
                newImg.style.display = 'none';
            }
            newDiv.appendChild(newImg);
            return newDiv;
        }

        /**
         * Create a media element based on the media data
         * The media element is a lyte-video element
         * The properties will directly refer to the lyte-video properties
         * @param {object} mediaData 
         * @returns 
         */
        function createVideo(mediaData, payloadData) {
            var newDiv = document.createElement("div");

            var mediaElement;
            mediaElement = document.createElement("lyte-video");

            mediaElement.setData('ltPropSource', resolveText(mediaData.source, payloadData, []));
            if (mediaData.poster) {
                mediaElement.setData('ltPropPoster', resolveText(mediaData.poster, payloadData, ''));
            }
            if (mediaData.tracks) {
                mediaElement.setData('ltPropTracks', resolveText(mediaData.tracks, payloadData, []));
            }
            if (mediaData.options) {
                mediaElement.setData('ltPropOptions', resolveText(mediaData.options, payloadData, {}));
            }
            if (mediaData.height) {
                mediaElement.setData('ltPropHeight', resolveText(mediaData.height, payloadData, ''));
            }
            if (mediaData.width) {
                mediaElement.setData('ltPropWidth', resolveText(mediaData.width, payloadData, ''));
            }

            newDiv.appendChild(mediaElement);
            if (mediaData.id) {
                newDiv.id = resolveText(mediaData.id, payloadData, '');
            }

            if (resolveText(mediaData.isVisible, payloadData, true) === false) {
                newDiv.style.display = 'none';
            }
            return newDiv;
        }

        //Containers
        /**
         * Create a row element based on the row data
         * @param {object} row 
         * @param {object} tableData 
         * @param {boolean} isHeader 
         * @returns the created row element
         */
        function createRow(row, tableData, payloadData, isHeader) {
            var tr = document.createElement('tr');
            for (var i = 0; i < row.cells.length; i++) {
                var cell = row.cells[i];
                var cellElement = isHeader ? document.createElement('th') : document.createElement('td');

                if (isHeader && resolveText(tableData.headerStyle, payloadData, {})) {
                    for (var property in tableData.headerStyle) {
                        if (tableData.headerStyle.hasOwnProperty(property)) {
                            cellElement.style[property] = tableData.headerStyle[property];
                        }
                    }
                } else if (!isHeader && resolveText(tableData.rowStyle, payloadData, {})) {
                    for (var property in tableData.rowStyle) {
                        if (tableData.rowStyle.hasOwnProperty(property)) {
                            cellElement.style[property] = tableData.rowStyle[property];
                        }
                    }
                }

                var newElement = generateElement(cell);
                cellElement.appendChild(newElement);
                tr.appendChild(cellElement);
            }
            return tr;
        }

        /**
         * Create the table element based on the table data
         * The table can have the following properties:
         * 1. id - The id of the table
         * 2. tableStyle - The style properties of the table
         * 3. headerStyle - The style properties of the table header
         * 4. rowStyle - The style properties of the table row
         * 5. rows - The rows of the table
         * The rows can be of two types:
         * 1. tableHeader - The header row of the table
         * 2. tableRow - The body row of the table
         * @param {object} tableData 
         * @param {object} payloadData
         * @returns the created table element
         */
        function createTable(tableData, payloadData) {
            var newTable = document.createElement("table");
            if (tableData.tableStyle) {
                for (var property in tableData.tableStyle) {
                    if (tableData.tableStyle.hasOwnProperty(property)) {
                        newTable.style[property] = tableData.tableStyle[property];
                    }
                }
            }
            newTable.id = resolveText(tableData.id, payloadData, '');

            var rows = resolveText(tableData.rows, payloadData, []);
            var hasTableHeader = false;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].type === 'tableHeader') {
                    hasTableHeader = true;
                    break;
                }
            }

            if (hasTableHeader) {
                var thead = document.createElement('thead');
                var headerRow;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].type === 'tableHeader') {
                        headerRow = rows[i];
                        break;
                    }
                }
                thead.appendChild(createRow(headerRow, tableData, payloadData, true));
                newTable.appendChild(thead);
            }

            var tbody = document.createElement('tbody');
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].type === 'tableRow') {
                    fragment.appendChild(createRow(rows[i], tableData, payloadData, false));
                }
            }
            tbody.appendChild(fragment);

            if (resolveText(tableData.isVisible, payloadData, true) === false) {
                newTable.style.display = 'none';
            }
            newTable.appendChild(tbody);
            return newTable;
        }

        /**
         * Create the flex box element based on the flex data
         * @param {object} flexItemData 
         * @returns the created flex box element
         */
        function generateFlexBoxChild(flexItemData, payloadData) {
            var node = flexItemData.node;
            var newElement = generateElement(node);
            var newFlexItem = document.createElement("div");
            var properties = ['order', 'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'background', 'border', 'margin', 'padding'];
            newFlexItem = applyStyleProperties(newFlexItem, properties, flexItemData, payloadData);
            newFlexItem.appendChild(newElement);
            return newFlexItem;
        }

        /**
         * Create the flex box with the flex items based on the flex data
         * @param {object} flexData 
         * @returns the created flex box element
         */
        function createFlexBox(flexData, payloadData) {
            var newFlex = document.createElement("div");
            newFlex.style.display = 'flex';
            var properties = ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'alignItems', 'alignContent', 'gap', 'rowGap', 'columnGap', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'background', 'border', 'margin', 'padding'];
            newFlex = applyStyleProperties(newFlex, properties, flexData, payloadData);

            newFlex.id = resolveText(flexData.id, payloadData, '');
            var children = resolveText(flexData.children, payloadData, []);
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < children.length; i++) {
                var childData = children[i];
                var newElement = generateFlexBoxChild(childData, payloadData);
                fragment.appendChild(newElement);
            }
            newFlex.appendChild(fragment);
            if (resolveText(flexData.isVisible, payloadData, true) === false) {
                newFlex.style.display = 'none';
            }
            return newFlex;
        }


        function createForm(formData, payloadData) {
            if (isCardifyForm) {
                return;
            }
            var newForm = document.createElement("form");
            isCardifyForm = true;
            var properties = ['style', 'class'];
            newForm = applyStyleProperties(newForm, properties, formData, payloadData);

            newForm.id = resolveText(formData.id, payloadData, '');
            var children = resolveText(formData.children, payloadData, []);
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < children.length; i++) {
                var childData = children[i];
                var newElement = generateElement(childData, payloadData);
                fragment.appendChild(newElement);
            }
            newForm.appendChild(fragment);

            if (resolveText(formData.isVisible, payloadData, true) === false) {
                newForm.style.display = 'none';
            }
            var buttonData = lyteCardifyFormButton ? lyteCardifyFormButton.data : undefined;
            var inputs = [];
            var callbackFn;
            if (buttonData) {
                inputs = resolveText(buttonData.connectedInputs, payloadData, []);
                callbackFn = resolveText(buttonData.callback, payloadData, function () {});
            }
            //Submit Action
            newForm.addEventListener("submit", function (event) {
                event.preventDefault();
                submitAction(inputs, callbackFn);
            });
            isCardifyForm = false;
            return newForm;
        }
        //Actions
        /**
         * The openUrl action opens the url in a new tab
         * Callback function for the openUrl action from the button
         * @param {string} url 
         */
        function openUrlAction(url, sameTab) {
            if (sameTab) {
                window.open(url, "_self");
            } else {
                window.open(url, "_blank");
            }
        }

        /**
         * The showCard action shows the card element 
         * by setting the display property to block
         * @param {htmlElement} newCard 
         */
        function showCardAction(newCard) {
            newCard.style.display = 'block';
        }

        /**
         * The toggleVisibility action toggles the visibility of the target elements
         * @param {array} targetElements 
         */
        function toggleVisibilityAction(targetElements) {
            for (var i = 0; i < targetElements.length; i++) {
                var elementQuery = targetElements[i];
                var element = $L(elementQuery)[0];
                if (element.style.display === 'none') {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            }
        }

        /**
         * Will call the callback function with the event and button element
         * @param {function} callbackFn 
         * @param {htmlElement} btn 
         * @param {event} event 
         */
        function executeAction(callbackFn, btn, event, inputs) {
            var data = [];
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                var inputItem = document.querySelector(input);
                var name = inputItem.getAttribute('name');
                var value = inputItem.getAttribute('value');
                if (inputItem.tagName === 'LYTE-DROPDOWN') {
                    name = input;
                    value = $L(inputItem)[0].getData('ltPropSelected');
                }
                else if (inputItem.tagName === 'LYTE-CHECKBOX') {
                    name = $L(inputItem)[0].getData('ltPropName');
                    value = $L(inputItem)[0].getData('ltPropChecked');
                }
                var newDataItem = {
                    'name': name,
                    'value': value
                }
                data.push(newDataItem);
            }
            callbackFn(event, btn, data);
        }

        /**
         * The submit action will call the callback function with the names and values of the connected inputs
         * @param {array} inputs 
         * @param {function} callbackFn 
         * @returns the data associated with the inputs
         */
        function submitAction(inputs, callbackFn) {
            var data = [];
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                var inputItem = document.querySelector(input);
                var name, value;
                if (inputItem.tagName === 'LYTE-DROPDOWN') {
                    name = input;
                    value = $L(inputItem)[0].getData('ltPropSelected');
                }
                else if (inputItem.tagName === 'LYTE-CHECKBOX') {
                    name = $L(inputItem)[0].getData('ltPropName');
                    value = $L(inputItem)[0].getData('ltPropChecked');
                }
                else {
                    name = $L(inputItem)[0].getData('ltPropName');
                    value = $L(inputItem)[0].getData('ltPropValue');
                }
                var newDataItem = {
                    'name': name,
                    'value': value
                }
                data.push(newDataItem);
            }
            if (typeof callbackFn === "function") {
                callbackFn(data); // Call the callback function and pass data
            }
            return data;
        }

        //Inputs
        /**
         * Create a dropdown element based on the dropdown data using lyte-dropdown
         * The options provided will directly refer to the lyte-dropdown properties
         * @param {object} dropdownData 
         * @returns the created dropdown element
         */
        function createDropdown(dropdownData, payloadData) {
            var newDropdown = document.createElement("lyte-dropdown");
            newDropdown.setData({
                'ltPropLabel': resolveText(dropdownData.label, payloadData, "Select An Option"),
                'ltPropLabelClass': resolveText(dropdownData.labelClass, payloadData, ""),
                'ltPropDirection': resolveText(dropdownData.direction, payloadData, "vertical"),
                'ltPropSystemValue': resolveText(dropdownData.systemValue, payloadData, ''),
                'ltPropUserValue': resolveText(dropdownData.userValue, payloadData, ''),
                'ltPropOptions': resolveText(dropdownData.options, payloadData, []),
                'ltPropSelected': resolveText(dropdownData.selected, payloadData, ''),
                'ltPropButtonClass': resolveText(dropdownData.buttonClass, payloadData, ''),
                'ltPropBoxClass': resolveText(dropdownData.boxClass, payloadData, '')
            });
            var type = resolveText(dropdownData.type, payloadData, '');
            if (type) {
                newDropdown.setData('ltPropType', type);
            }
            newDropdown.id = resolveText(dropdownData.id, payloadData, '');
            if (resolveText(dropdownData.isVisible, payloadData, true) === false) {
                newDropdown.style.display = 'none';
            }
            return newDropdown;
        }

        /**
         * Create a checkbox element based on the checkbox data given
         * The options provided will directly refer to the lyte-checkbox properties
         * @param {object} checkboxData 
         * @returns the created checkbox element
         * The checkbox is generate using the lyte-checkbox component
         */
        function createCheckbox(checkboxData, payloadData) {
            var newCheckbox = document.createElement("lyte-checkbox");
            newCheckbox.setData({
                'ltPropName': resolveText(checkboxData.name, payloadData, ''),
                'ltPropChecked': resolveText(checkboxData.checked, payloadData, false),
                'ltPropValue': resolveText(checkboxData.value, payloadData, ''),
                'ltPropLabel': resolveText(checkboxData.label, payloadData, "Checkbox"),
                'ltPropLabelClass': resolveText(checkboxData.labelClass, payloadData, ""),
                'ltPropClass': resolveText(checkboxData.class, payloadData, ''),
                'ltPropType': resolveText(checkboxData.type, payloadData, 'default')
            });
            newCheckbox.id = resolveText(checkboxData.id, payloadData, '');
            if (resolveText(checkboxData.isVisible, payloadData, true) === false) {
                newCheckbox.style.display = 'none';
            }
            return newCheckbox;
        }

        /**
         * Create a text input element based on the text input data
         * Uses the lyte-input component with type as text
         * Properties will refer to lyte-input properties
         * @param {object} inputData 
         * @returns the created text input element
         */
        function createTextInput(inputData, payloadData) {
            var newInput = document.createElement("lyte-input");
            var id = resolveText(inputData.id, payloadData, '');
            id = 'lyte' + id;
            newInput.setData({
                'ltPropType': 'text',
                'ltPropStyle': resolveText(inputData.style, payloadData, ''),
                'ltPropLabel': resolveText(inputData.label, payloadData, ''),
                'ltPropDirection': resolveText(inputData.direction, payloadData, 'vertical'),
                'ltPropHeight': resolveText(inputData.height, payloadData, ''),
                'ltPropWidth': resolveText(inputData.width, payloadData, ''),
                'ltPropName': resolveText(inputData.name, payloadData, ''),
                'ltPropAppearance': resolveText(inputData.appearance, payloadData, 'flat'),
                'ltPropWrapperStyle': resolveText(inputData.wrapperStyle, payloadData, ''),
                'ltPropClass': resolveText(inputData.class, payloadData, ''),
                'ltPropLabelClass': resolveText(inputData.labelClass, payloadData, ''),

                'ltPropPlaceholder': resolveText(inputData.placeholder, payloadData, ''),
                'ltPropMaxlength': resolveText(inputData.maxLength, payloadData, 100),
                'ltPropPattern': resolveText(inputData.pattern, payloadData, '.+'),
                'ltPropValue': resolveText(inputData.value, payloadData, ''),
                'ltPropId': id || ''
            });
            newInput.id = resolveText(inputData.id, payloadData, '');
            if (resolveText(inputData.isVisible, payloadData, true) === false) {
                newInput.style.display = 'none';
            }
            return newInput;
        }

        /**
         * Create a date input element based on the date input data
         * Uses the lyte-input component with type as date
         * Properties will refer to lyte-input properties
         * @param {object} inputData 
         * @returns the created date input element
         */
        function createDateInput(inputData, payloadData) {
            var newInput = document.createElement("lyte-input");
            var id = resolveText(inputData.id, payloadData, '');
            id = 'lyte' + id;
            newInput.setData({
                'ltPropType': 'date',
                'ltPropStyle': resolveText(inputData.style, payloadData, ''),
                'ltPropLabel': resolveText(inputData.label, payloadData, ''),
                'ltPropDirection': resolveText(inputData.direction, payloadData, 'vertical'),
                'ltPropHeight': resolveText(inputData.height, payloadData, ''),
                'ltPropWidth': resolveText(inputData.width, payloadData, ''),
                'ltPropName': resolveText(inputData.name, payloadData, ''),
                'ltPropAppearance': resolveText(inputData.appearance, payloadData, 'flat'),
                'ltPropWrapperStyle': resolveText(inputData.wrapperStyle, payloadData, ''),
                'ltPropClass': resolveText(inputData.class, payloadData, ''),
                'ltPropLabelClass': resolveText(inputData.labelClass, payloadData, ''),

                'ltPropBoundary': resolveText(inputData.boundary, payloadData, {}),
                'ltPropWheel': resolveText(inputData.wheel, payloadData, false),
                'ltPropPosition': resolveText(inputData.position, payloadData, 'down'),
                'ltPropCurrentDate': resolveText(inputData.currentDate, payloadData, new Date()),
                'ltPropCalendarProperties': resolveText(inputData.calendarProperties, payloadData, {}),
                'ltPropId': id || ''
            });
            newInput.id = resolveText(inputData.id, payloadData, '');
            if (resolveText(inputData.isVisible, payloadData, true) === false) {
                newInput.style.display = 'none';
            }
            return newInput;
        }

        /**
         * Create a time input element based on the time input data
         * Uses the lyte-input component with type as time
         * Properties will refer to lyte-input properties
         * @param {object} inputData 
         * @returns 
         */
        function createTimeInput(inputData, payloadData) {
            var newInput = document.createElement("lyte-input");
            var id = resolveText(inputData.id, payloadData, '');
            id = 'lyte' + id;
            newInput.setData({
                'ltPropType': 'time',
                'ltPropStyle': resolveText(inputData.style, payloadData, ''),
                'ltPropLabel': resolveText(inputData.label, payloadData, ''),
                'ltPropDirection': resolveText(inputData.direction, payloadData, 'vertical'),
                'ltPropHeight': resolveText(inputData.height, payloadData, ''),
                'ltPropWidth': resolveText(inputData.width, payloadData, ''),
                'ltPropName': resolveText(inputData.name, payloadData, ''),
                'ltPropAppearance': resolveText(inputData.appearance, payloadData, 'flat'),
                'ltPropWrapperStyle': resolveText(inputData.wrapperStyle, payloadData, ''),
                'ltPropClass': resolveText(inputData.class, payloadData, ''),
                'ltPropLabelClass': resolveText(inputData.labelClass, payloadData, ''),

                'ltPropHourInterval': resolveText(inputData.hourInterval, payloadData, 1),
                'ltPropMinuteInterval': resolveText(inputData.minuteInterval, payloadData, 1),
                'ltPropDefaultTime': resolveText(inputData.defaultTime, payloadData, ''),
                'ltPropTimeFormat': resolveText(inputData.timeFormat, payloadData, 'HH:mm'),
                'ltPropStartTime': resolveText(inputData.startTime, payloadData, ''),
                'ltPropEndTime': resolveText(inputData.endTime, payloadData, ''),
                'ltPropDropdown': resolveText(inputData.dropdown, payloadData, false),
                'ltPropId': id || ''
            });
            newInput.id = resolveText(inputData.id, payloadData, '');
            if (resolveText(inputData.isVisible, payloadData, true) === false) {
                newInput.style.display = 'none';
            }
            return newInput;
        }

        /**
         * Create a number input element based on the number input data
         * Uses the lyte-number component 
         * Properties will refer to lyte-number properties
         * @param {object} inputData 
         * @returns the created number input element
         */
        function createNumInput(inputData, payloadData) {
            var newInput = document.createElement("lyte-number");
            var id = resolveText(inputData.id, payloadData, '');
            id = 'lyte' + id;
            newInput.setData({
                'ltPropStyle': resolveText(inputData.style, payloadData, ''),
                'ltPropLabel': resolveText(inputData.label, payloadData, ''),
                'ltPropDirection': resolveText(inputData.direction, payloadData, 'vertical'),
                'ltPropName': resolveText(inputData.name, payloadData, ''),
                'ltPropPlaceholder': resolveText(inputData.placeholder, payloadData, ''),
                'ltPropMaxlength': resolveText(inputData.maxLength, payloadData, 100),
                'ltPropPattern': resolveText(inputData.pattern, payloadData, '.+'),
                'ltPropValue': resolveText(inputData.value, payloadData, ''),
                'ltPropWrapperClass': resolveText(inputData.wrapperClass, payloadData, ''),

                'ltPropIgnoreSymbols': resolveText(inputData.ignoreSymbols, payloadData, false),
                'ltPropWheel': resolveText(inputData.wheel, payloadData, false),
                'ltPropMin': resolveText(inputData.min, payloadData, ''),
                'ltPropMax': resolveText(inputData.max, payloadData, ''),
                'ltPropApperance': resolveText(inputData.appearance, payloadData, 'default'),
                'ltPropRestrcit': resolveText(inputData.restrict, payloadData, ''),
                'ltPropId': id || ''
            });
            newInput.id = resolveText(inputData.id, payloadData, '');
            if (resolveText(inputData.isVisible, payloadData, true) === false) {
                newInput.style.display = 'none';
            }
            return newInput;
        }

        /**
         * Create a passowrd input element based on the text input data
         * Uses the lyte-input component with type as password
         * Properties will refer to lyte-input properties
         * @param {object} inputData 
         * @returns the created text input element
         */
        function createPasswordInput(inputData, payloadData) {
            var newInput = document.createElement("lyte-input");
            var id = resolveText(inputData.id, payloadData, '');
            id = 'lyte' + id;
            newInput.setData({
                'ltPropType': 'password',
                'ltPropStyle': resolveText(inputData.style, payloadData, ''),
                'ltPropLabel': resolveText(inputData.label, payloadData, ''),
                'ltPropDirection': resolveText(inputData.direction, payloadData, 'vertical'),
                'ltPropHeight': resolveText(inputData.height, payloadData, ''),
                'ltPropWidth': resolveText(inputData.width, payloadData, ''),
                'ltPropName': resolveText(inputData.name, payloadData, ''),
                'ltPropMaxlength': resolveText(inputData.maxLength, payloadData, 100),
                'ltPropPlaceholder': resolveText(inputData.placeholder, payloadData, ''),
                'ltPropPattern': resolveText(inputData.pattern, payloadData, '.+'),
                'ltPropValue': resolveText(inputData.value, payloadData, ''),
                'ltPropAppearance': resolveText(inputData.appearance, payloadData, 'flat'),
                'ltPropWrapperStyle': resolveText(inputData.wrapperStyle, payloadData, ''),
                'ltPropClass': resolveText(inputData.class, payloadData, ''),
                'ltPropLabelClass': resolveText(inputData.labelClass, payloadData, ''),
                'ltPropPasswordIcon': resolveText(inputData.passwordIcon, payloadData, false),
                'ltPropPasswordVisibility': resolveText(inputData.passwordVisibility, payloadData, false),
                'ltPropPasswordTooltip': resolveText(inputData.passwordTooltip, payloadData, {}),
                'ltPropTooltipConfig': resolveText(inputData.tooltipConfig, payloadData, {}),
                'ltPropId': id || ''
            });

            newInput.id = resolveText(inputData.id, payloadData, '');
            if (resolveText(inputData.isVisible, payloadData, true) === false) {
                newInput.style.display = 'none';
            }
            return newInput;
        }
    }
})();
