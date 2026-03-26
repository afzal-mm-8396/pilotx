Lyte.Mixin.register("crux-aria-table-mixin", {
	phoneMouseOut : function(ele){
		if(ele.querySelector("a")){
			ele.querySelector("a").style.visibility = "hidden";
		}
     },
	 phoneMouseOver : function(ele){
		if(ele.querySelector("a")){
			ele.querySelector("a").style.visibility = "visible";
		}
	 },
    
    /* bind aria events for table */
        bindEventForAria : function(){
            var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
            /* gets node of binded element */
                var bindedScope = (this.$node) ? this.$node : this;
            setTimeout(() => {
                if(bindedScope){
                    var allTable;
                    /* gets all lyte-table and table (html table) not having class cxAriaSkip (class to skip accessibility for table) */
                        if(!bindedScope.classList.contains('cxAriaSkip') && bindedScope.tagName === 'LYTE-TABLE' || bindedScope.tagName === 'LYTE-EXPRESSTABLE' || bindedScope.tagName === 'TABLE'){
                            allTable = [];
                            allTable[0] = bindedScope;
                        }else{
                            allTable = bindedScope.querySelectorAll('lyte-table:not(.cxAriaSkip), lyte-expresstable:not(.cxAriaSkip), table:not(.cxAriaSkip)');
                        }

                    var allTableLen = allTable.length;
                    for(var index = 0; index < allTableLen; index++){
                        var table = allTable[index];
                                    
                        /* gets aria value */
                            var aria = false;
                            if((table.attributes['cx-prop-aria'] && table.attributes['cx-prop-aria'].value === 'true') || (table.attributes['lt-prop-aria'] && table.attributes['lt-prop-aria'].value === 'true')){
                                aria = true;
                            }else if(table.tagName === 'CRUX-TABLE-COMPONENT'){
                                aria = table.component.data.cxPropAria;
                            }else if(table.tagName === 'LYTE-TABLE' || table.tagName === 'LYTE-EXPRESSTABLE'){
                                aria = table.component.data.ltPropAria;
                            }

                        var cruxTable = table;
                        var lyteTable = table;
                        if(aria){
                            /* Check and sets crux and lyte nodes */
                                var parentCruxComp = table;
                                var parentWormHole = table;
                                var traverseVar = table;
                                while(traverseVar.tagName !== 'BODY' && table.tagName !== 'TABLE' && table !== bindedScope){
                                    if(traverseVar.tagName.includes('CRUX') && traverseVar.tagName !== 'CRUX-TABLE-COMPONENT'){
                                        parentCruxComp = traverseVar;
                                    }
                                    if(traverseVar.tagName === 'LYTE-TABLE' || traverseVar.tagName === 'LYTE-EXPRESSTABLE'){
                                        lyteTable = traverseVar;
                                    }else if(traverseVar.tagName === 'CRUX-TABLE-COMPONENT'){
                                        cruxTable = traverseVar;
                                    }else if(traverseVar._callee && traverseVar._callee.component && traverseVar._callee.component.childComp && traverseVar._callee.component.childComp === parentCruxComp){
                                        parentWormHole = traverseVar;
                                    }else if(traverseVar.tagName === 'BODY'){
                                        break;
                                    }
                                    if(traverseVar._callee){
                                        traverseVar = traverseVar._callee;
                                    }else{
                                        break;
                                    }
                                }
                                if(parentCruxComp.tagName === 'CRUX-TABLE-COMPONENT'){
                                    cruxTable = parentCruxComp;
                                }
                                cruxTable.cruxTable = cruxTable; // sets crux table node hold in crux table
                                cruxTable.lyteTable = lyteTable; // sets lyte table node hold in crux table
                                cruxTable.parentCruxComp = parentCruxComp; // sets parent crux node hold of crux/lyte table node in crux table
                                cruxTable.parentWormHole = parentWormHole; // sets parent wormhole node hold of crux/lyte table node in crux table
                                lyteTable.cruxTable = cruxTable; // sets crux table node hold in lyte table
                                lyteTable.lyteTable = lyteTable; // sets lyte table node hold in lyte table
                                lyteTable.parentCruxComp = parentCruxComp; // sets parent crux node hold of crux/lyte table node in lyte table
                                lyteTable.parentWormHole = parentWormHole; // sets parent wormhole node hold of crux/lyte table node in lyte table

                            /* adding focusin and focusout event listeners for table */
                                table.addEventListener('focusin', mixinScope.onFocus);
                                table.addEventListener('focusout', mixinScope.onFocusOut);

                            /* sets tabindex as -1 to skip focus for whole table */
                                if(table.lyteTable && table.lyteTable.tagName.includes('LYTE')){
                                    table.lyteTable.setData('tabIndex', '-1');
                                }

                            var tableRows = table.querySelectorAll('lyte-tr, lyte-exptable-tr, tr');
                            var tableRowsLen = tableRows.length;

                            /* sets default atrributes for each cell */
                                for(var index1=0;index1<tableRowsLen;index1++){
                                    tableRows[index1].setAttribute('cxCellRow', index1);
                                    var tableCells = tableRows[index1].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                                    var tableCellsLen = tableCells.length;
                                    for(var i=0;i<tableCellsLen;i++){
                                        tableCells[i].setAttribute('cxCellCol', i);
                                        var tableCell = tableCells[i];
                                        mixinScope.setDefaultAttr(tableCell);
                                    }
                                }

                            /* default attributes for no result row  */
                                if(parentCruxComp.tagName.includes('CRUX') && parentCruxComp.cxProp('noContentClass') && parentCruxComp.querySelector('.'+parentCruxComp.cxProp('noContentClass'))){
                                    var noResult = cruxTable.querySelector('.'+cruxTable.cxProp('noContentClass'));
                                    mixinScope.setDefaultAttr(noResult);
                                }

                            /* set keydown event listener for table */
                                if(!table.getAttribute('cxAriaTableKeydown')){
                                    table.addEventListener('keydown', mixinScope.cellKeyboardNav);
                                    table.bindedScope = this;
                                    table.getAttribute('cxAriaTableKeydown', true);
                                }

                            /* set click event listener for table */
                                if(!table.getAttribute('cxAriaTableClick')){
                                    table.addEventListener('click', mixinScope.clickOnTable);
                                    table.getAttribute('cxAriaTableClick', true);
                                }
                            
                            /* check and remove keydown event listener for interactive element navigation */
                                var ariaActElem = table.querySelector('.cxAriaActive');
                                if(table._interactiveElementNav && (!ariaActElem|| !ariaActElem.getAttribute('focusable'))){
                                    delete table._interactiveElementNav;
                                    table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                                }

                            /* gets the modal container */
                                // if(document.querySelector('[cxAriaTableFocusableParent]')){
                                //     var cxAriaTableFocusableParent = document.querySelector('[cxAriaTableFocusableParent]');
                                //     if(cxAriaTableFocusableParent && cxAriaTableFocusableParent.component){
                                //         cxAriaTableFocusableParent = cxAriaTableFocusableParent.component;
                                //         var modalContainer = cxAriaTableFocusableParent;
                                //         if(modalContainer && modalContainer.$node){
                                //             modalContainer = modalContainer.$node;
                                //         }
                                //         while(modalContainer && !(modalContainer.component && modalContainer.component.parent) && modalContainer.tagName !== 'LYTE-WORMHOLE' && modalContainer.tagName !== 'BODY'){
                                //             modalContainer = modalContainer.parentElement;
                                //         }
                                //         cruxTable.modalContainer = modalContainer;
                                //         lyteTable.modalContainer = modalContainer;
                                //     }
                                // }
                        }else{
                            /* Check and sets crux and lyte nodes */
                            if(cruxTable.cruxTable){
                                delete cruxTable.cruxTable; // removes crux table node hold in crux table
                            }else if(cruxTable.lyteTable){
                                delete cruxTable.lyteTable; // sets lyte table node hold in crux table
                            }else if(cruxTable.parentCruxComp){
                                delete cruxTable.parentCruxComp; // sets parent crux node hold of crux/lyte table node in crux table
                            }else if(cruxTable.parentWormHole){
                                delete cruxTable.parentWormHole; // sets parent wormhole node hold of crux/lyte table node in crux table
                            }else if(lyteTable.cruxTable){
                                delete lyteTable.cruxTable; // sets crux table node hold in lyte table
                            }else if(lyteTable.lyteTable){
                                delete lyteTable.lyteTable; // sets lyte table node hold in lyte table
                            }else if(lyteTable.parentCruxComp){
                                delete lyteTable.parentCruxComp; // sets parent crux node hold of crux/lyte table node in lyte table
                            }else if(lyteTable.parentWormHole){
                                delete lyteTable.parentWormHole; // sets parent wormhole node hold of crux/lyte table node in lyte table
                            }
                        }
                    }
                }
            }, 100);
        },

    /* set default attributes */
        setDefaultAttr : function(focusElem){
            /* sets tabindex and tabIndex 0 */
                if(!focusElem.tabIndex || focusElem.tabIndex === -1){
                    focusElem.tabIndex = 0;
                }
                if(!focusElem.tabindex || focusElem.tabindex === -1){
                    focusElem.setAttribute('tabindex', 0);
                }

            /* sets focusable for all cells */
                if((!focusElem.attributes || !focusElem.attributes.focusable) && !focusElem.querySelector('[focusable]:not(.cxSkipFocusable)')){
                    focusElem.setAttribute('focusable', true);
                }

            /* attribute to check if the default attributes are set or not */
                if(!focusElem.attributes || !focusElem.attributes.cxDefaultAriaSet){
                    focusElem.setAttribute('cxDefaultAriaSet', '');
                }
        },

    /* To set aria label check if the element is readable and get type of element */
        setAriaLabel : function(elem, elemTable, actRow){
            var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
            var table = elemTable ? elemTable : elem.closest('lyte-table, lyte-expresstable, table');
            var elemRow = actRow ? actRow : elem.closest('lyte-tr, lyte-exptable-tr, tr');
            if(!elem.component && (!elem.ariaLabel || elem.ariaLabel.trim() === '')){

                /* getting element type label */
                    var elementType = mixinScope.getElementType(elem);

                /* get text content if text content is unreadable by screen reader */
                    var contentLabel = mixinScope.isReadable(elem)?'':elem.textContent.trim().replace(/\s+/g, ' ');

                /* get header column content */
                    var headerLabel = '';

                /* getting header label */
                    var elemLabel = '';
                    if(elem.tagName.includes('TD')){
                        /* get index of current cell in current row */
                            var index = 0;
                            var elemCell;
                            var elemRowLen = elemRow.children.length;
                            for (var i = 0; i < elemRowLen; i++) {
                                elemCell = elemRow.children[i];
                                /* skipping the unrelated childrens */
                                    if (!elemCell.tagName.includes('TD') && !elemCell.tagName.includes('TH')){
                                        continue;
                                    }
                                /* breaks if current cell and iterated cell is same */
                                    if (elemCell === elem){
                                        break;
                                    }
                                index++;
                            }

                        /* getting header row from table */
                            var headerRow;
                            var tableChild = table.querySelector('lyte-thead, thead, lyte-tbody, tbody, .lyteExpTableHeaderGroup');

                            /* check and get header row from thead/tbody/.lyteExpTableHeaderGroup */
                                var tableChildLen;
                                if(tableChild){
                                    var childInd = -1;
                                    tableChildLen = tableChild.children.length;
                                    while(childInd < tableChildLen){
                                        childInd++;
                                        /* skipping the unrelated childrens */
                                            if(!tableChild.children[childInd].tagName.includes('TR')){
                                                continue;
                                            }else{
                                                /* check tableChild is a valid header row */
                                                    var row = tableChild.children[childInd].children;
                                                    var flag = false;
                                                    var rowLen = row.length;
                                                    for (var j = 0; j < rowLen; j++) {
                                                        if(row[j].tagName.includes('TH') || row[j].tagName.includes('TD')){
                                                            flag = true;    /* set true if row had a related children cell (TH/TD) */
                                                            break;
                                                        }
                                                    }
                                                    if(flag){
                                                        break;
                                                    }
                                            }
                                    }
                                    if(childInd < tableChild.children.length){
                                        headerRow = tableChild.children[childInd];
                                    }
                                }else{
                                    /* check tr is a valid header row */
                                        tableChild = table.querySelector('lyte-tr, lyte-exptable-tr, tr');
                                        if(tableChild.tagName.includes('TR')){
                                            tableChildLen = tableChild.children.length;
                                            for (let j = 0; j < tableChildLen; j++) {
                                                if(tableChild.children[j].tagName.includes('TH')){
                                                    headerRow = tableChild;
                                                    break;
                                                }
                                            }
                                        }
                                }

                        /* getting header cell related to current cell */
                            var count = -1;
                            if(headerRow){
                                count = 0;
                                var headerRowLen = headerRow.children.length;
                                for (var ind = 0; ind < headerRowLen; ind++) {
                                    elemCell = headerRow.children[ind];
                                    if (!elemCell.tagName.includes('TD') && !elemCell.tagName.includes('TH')){
                                        continue;
                                    }
                                    if(count === index){
                                        break;
                                    }
                                    count++;
                                }
                            }

                        /* get label from header row */
                            if(headerRow && count !== -1 && count < headerRow.children.length){
                                headerLabel = headerRow.children[count].innerText;
                            }
                        
                        /* set aria label */
                            if(headerLabel !== ''){
                                elemLabel += headerLabel;
                                if(elementType !== ''){
                                    elemLabel += ', '+elementType;
                                    if(contentLabel !== ''){
                                        elemLabel += ': '+contentLabel;
                                    }
                                }else if(contentLabel !== ''){
                                    elemLabel += ' '+contentLabel;
                                }
                            }else if(elementType !== ''){
                                elemLabel += elementType;
                                if(contentLabel !== ''){
                                    elemLabel += ': '+contentLabel;
                                }
                            }else if(contentLabel !== ''){
                                elemLabel += contentLabel;
                            }

                            elem.ariaLabel = elemLabel;
                    }else{
                        if(elementType !== ''){
                            elemLabel += elementType;
                            if(contentLabel !== ''){
                                elemLabel += ': '+contentLabel;
                            }
                        }else if(contentLabel !== ''){
                            elemLabel += contentLabel;
                        }

                        elem.ariaLabel = elemLabel;
                    }
            }

            /* callback after added aria */
                if(table.tagName.includes('CRUX') && table.getMethods('afterAriaAdd')){
                    table.component.executeMethod('afterAriaAdd');
                }
        },
        isReadable : function(cell) {

            // Only proceed if it's a table cell
            const tag = cell.tagName.toLowerCase();

            // Check visibility styles
            const style = window.getComputedStyle(cell);

            // Check if likely dynamically injected
            const hasNoChildrenButHasText = cell.childNodes.length === 1 && cell.firstChild.nodeType === Node.TEXT_NODE;
            const isEmptyTagButHasText = cell.innerHTML.trim().length > 0 && cell.innerHTML.indexOf('>') === -1;
            const likelyDynamicallyInjected = !cell.hasChildNodes() || hasNoChildrenButHasText || isEmptyTagButHasText;

            if (!cell || (tag !== 'td' && tag !== 'th') || cell.closest('[aria-hidden="true"]') || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || likelyDynamicallyInjected){  // eslint-disable-line @zoho/webperf/no-attribute-selectors
                return false;
            }


            return true;

        },
        getElementType : function(element) {
            if(!element){
                return 'text';
            }else if(element.getAttribute('role')){
                return element.getAttribute('role');
            }else if((element.tagName === 'A' && element.href) || element.onclick || element.getAttribute('onclick') || window.getComputedStyle(element).cursor === 'pointer'){
                return 'link';
            }
            return 'text';
        },

    /* get interactive element and set default and needed attributes */
        getInteractiveElements : function(curr_cell) {
            var interactiveTags = ['a', 'button', 'input', 'select', 'textarea', 'label', 'summary'];

            /* get all interactive element as array */
                var allInteractiveElem = Array.from(curr_cell.querySelectorAll('*')).filter(elem => {
                    var tag = elem.tagName.toLowerCase();
                    var role = elem.getAttribute('role');
                    var tabindex = elem.getAttribute('tabindex');
                    var style = window.getComputedStyle(elem);
                    var focusElem = elem.getAttribute('cxFocusableSelector');

                    if((elem.attributes['lyte-rendered'] && (tag.includes('lyte') || tag.includes('crux'))) || interactiveTags.includes(tag) || typeof elem.onclick === 'function' || elem.getAttribute('onclick') !== null || (tabindex !== null && tabindex !== '-1') || (role && ['button', 'link', 'checkbox', 'menuitem'].includes(role)) || style.cursor === 'pointer' || focusElem && elem.offsetParent !== null && !elem.disabled){
                        return elem;
                    }
                });

            // Filter to only include outerMost (top-level) interactive elements
            return allInteractiveElem.filter(elem =>
                !allInteractiveElem.some(other => other !== elem && other.contains(elem))
            );
        },
        setAttrForInteractiveElements : function(curr_cell){
            if(curr_cell){
                var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
                var interactiveElems = Array.from((curr_cell.tagName.includes('TH') || curr_cell.tagName.includes('TD')) ? mixinScope.getInteractiveElements(curr_cell) : curr_cell);
                var interactiveElemsLen = interactiveElems.length;
                for (let i = 0; i < interactiveElemsLen; i++) {
                    var focusableElem = interactiveElems[i];
                    if(!focusableElem.classList.contains('.cxSkipFocusable') && !focusableElem.attributes.cxDefaultAriaSet){
                        /* set default attributes (tabindex, focusable) for interactive elements */
                            mixinScope.setDefaultAttr(focusableElem);
                            if(curr_cell.attributes.focusable){
                                curr_cell.removeAttribute('focusable');
                            }
                            mixinScope.setAriaLabel(focusableElem);
                    }
                }
            }
        },

    /* get and set default and needed attributes for sibiling rows */
        attrForSibilingRows : function(currRow, currTable){
            var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
            if(!currRow){
                currRow = currCell.closest('lyte-tr, lyte-exptable-tr, tr');
            }
            if(!currTable){
                currTable = currRow.closest('lyte-table, lyte-expresstable, table');
            }
    
            /* sets default attributes for all cells in current row */
                var currRowCells = currRow.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                if(currRowCells){
                    var currRowCellsLen = currRowCells.length;
                    for (let i = 0; i < currRowCellsLen; i++) {
                        mixinScope.setDefaultAttr(currRowCells[i]);
                    }
                }
                
            var nextRow = currRow;
            var prevRow = currRow;
            var curr_scope, childRows, childRowsLen, i;

            /* gets visible next row */
                do {
                    if(nextRow.nextElementSibling){
                        nextRow = nextRow.nextElementSibling;
                    }else{
                        /* check if the nextRow is in tbody */
                            curr_scope = currRow.closest('lyte-tbody, tbody, .lyteExpTableRowGroup');   // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                            if(!nextRow.closest('lyte-thead, .lyteExpTableHeaderGroup, thead') || !curr_scope){ // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                /* changes scope from tbody to current table */
                                    curr_scope = currTable;
                            }
                            /* gets first row in curr scope */
                                childRows = curr_scope.children;
                                childRowsLen = childRows.length;
                                for (i = 0; i < childRowsLen; i++) {
                                    if(childRows[i].tagName.includes('TR')){
                                        nextRow = childRows[i];
                                        break;
                                    }
                                }
                    }
                    if(!nextRow || nextRow === currRow){
                        break;
                    }
                } while ( nextRow && (nextRow.style.display === 'none' || nextRow.style.visibility === 'hidden') && nextRow.nextElementSibling !== nextRow );

            /* sets default attributes for all cells in next row */
                var nextRowCells = nextRow.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                if(nextRowCells){
                    var nextRowCellsLen = nextRowCells.length;
                    for (let i = 0; i < nextRowCellsLen; i++) {
                        mixinScope.setDefaultAttr(nextRowCells[i]);
                    }
                }

            /* gets visible prev row */
                do {
                    if(prevRow.previousElementSibling){
                        prevRow = prevRow.previousElementSibling;
                    }else{
                        /* check if the nextRow is in thead */
                            curr_scope = currRow.closest('lyte-thead, .lyteExpTableHeaderGroup, thead');    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                            if(!prevRow.closest('lyte-tbody, tbody, .lyteExpTableRowGroup') || !curr_scope){    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                /* changes scope from thead to current table */
                                    curr_scope = currTable;
                            }
                            /* gets first row in curr scope */
                                // prevRow = curr_scope.querySelector('lyte-tr, lyte-exptable-tr, tr');
                                childRows = curr_scope.children;
                                childRowsLen = childRows.length;
                                for (i = 0; i < childRowsLen; i++) {
                                    if(childRows[i].tagName.includes('TR')){
                                        prevRow = childRows[i];
                                        break;
                                    }
                                }
                    }
                    if(!prevRow || prevRow === currRow){
                        break;
                    }
                } while ( prevRow && (prevRow.style.display === 'none' || prevRow.style.visibility === 'hidden') && prevRow.previousElementSibling !== prevRow );

            /* sets default attributes for all cells in prev row */
                var prevRowCells = prevRow.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                if(prevRowCells){
                    var prevRowCellsLen = prevRowCells.length;
                    for (let i = 0; i < prevRowCellsLen; i++) {
                        mixinScope.setDefaultAttr(prevRowCells[i]);
                    }
                }
        },

    /* focus in and focus out event listeners for table */
        onFocus : function(){
            var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
            var documentActiveElement = event.target ? event.target : document.activeElement;
            var compThis = this;
            var table = compThis.lyteTable;
            var ariaActiveElem = compThis.querySelector('.cxAriaActive');
            ariaActiveElem = ariaActiveElem ? ariaActiveElem : table.querySelector('.cxPrevAriaActive');

            /* delete table._pauseKeyboardNavigation */
                if(table._pauseKeyboardNavigation && table.contains(event.relatedTarget)){
                    delete table._pauseKeyboardNavigation;
                }

            /* delete table._interactiveElementNav if the event.relatedTarget is not in table */
                if(!table.contains(event.relatedTarget) && table._interactiveElementNav){
                    delete table._interactiveElementNav;
                }

            /* check if the active elem is cell and has focusable attribute */
                var hasFocusable = false;
                if(documentActiveElement && table._interactiveElementNav && (documentActiveElement.tagName.includes('TH') || documentActiveElement.tagName.includes('TD')) && documentActiveElement.attributes.focusable){
                    var curr_cell = (documentActiveElement.tagName.includes('TH') || documentActiveElement.tagName.includes('TD')) ? documentActiveElement : documentActiveElement.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                    mixinScope.setAttrForInteractiveElements(curr_cell);
                    if(!documentActiveElement.attributes.focusable){
                        documentActiveElement.querySelector('[focusable]:not(.cxSkipFocusable)').focus();
                        hasFocusable = true;
                    }
                }
            
            /* remove cxAriaActive class from old aria active element */
                if(ariaActiveElem){
                    ariaActiveElem.classList.remove('cxAriaActive');
                }

            /* if not focus the focusable element inside the cell */
                if(!hasFocusable){
                    /* add cxAriaActive class for new aria active element */
                        if(documentActiveElement && !documentActiveElement.classList.contains('cxAriaActive')){
                            documentActiveElement.classList.add('cxAriaActive');
                        }

                    /* adding default aria attributes for cell */
                        if(documentActiveElement.tagName.includes('TH') || documentActiveElement.tagName.includes('TD')){
                            mixinScope.setAriaLabel(documentActiveElement, table);
                            mixinScope.setDefaultAttr(documentActiveElement);
                        }
                    
                    /* refocus to the given focusable cell or displayColumn or first cell and scroll into 0,0 if active cell has class lyteTableFixed */
                        var focusableCellsToTraverse = table.querySelectorAll('lyte-tr, lyte-exptable-tr, tr');
                        focusableCellsToTraverse = focusableCellsToTraverse[focusableCellsToTraverse.length-1].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, .noResultAriaComp');
                        var focusableCellsToTraverseLen = focusableCellsToTraverse.length;
                        if((!table.contains(event.relatedTarget)) && focusableCellsToTraverse && (event.target === focusableCellsToTraverse[focusableCellsToTraverseLen-1])){
                            var cxInitialFocusOnTable = table.querySelector('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, .noResultAriaComp');
                            if($L(cxInitialFocusOnTable).hasClass('lyteFixedColumn')){
                                var scrollDiv = $L(cxInitialFocusOnTable).cxGetScrollParent();
                                if(scrollDiv){
                                    scrollDiv.scrollLeft = 0;
                                    scrollDiv.scrollTop = 0;
                                }
                            }
                            cxInitialFocusOnTable.focus();
                        }

                    /* update _interactiveElementNav if focusable element is focused inside cell */
                        if(ariaActiveElem && $L(ariaActiveElem).attr('focusable') && !(ariaActiveElem.tagName.includes('TH') || ariaActiveElem.tagName.includes('TD')) && !table._interactiveElementNav){
                            compThis.addEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                            table._interactiveElementNav = true;
                        }else if(ariaActiveElem && (ariaActiveElem.tagName.includes('TH') || ariaActiveElem.tagName.includes('TD')) && compThis.querySelector('.cxAriaActive [focusable]') && table._interactiveElementNav){
                            compThis.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                            table._interactiveElementNav = false;
                        }
                }
        },
        onFocusOut : function(){
            var compThis = this;
            var ariaActiveElem = compThis.querySelector('.cxAriaActive');
            if(ariaActiveElem){
                /* remove cxPrevAriaActive class from old/previous aria active element */
                    if(compThis.querySelector('.cxPrevAriaActive')){
                        $L('.cxPrevAriaActive', compThis).removeClass('cxPrevAriaActive');
                    }
                    
                /* add cxPrevAriaActive class from current aria active element */
                    if(!(ariaActiveElem.classList.contains('cxPrevAriaActive'))){
                        ariaActiveElem.classList.add('cxPrevAriaActive');
                    }
            }
        },

    /* arrow key support for cells */
        cellKeyboardNav : function(){
            /* getting datas for keyboard navigation */
                var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
                var targetTable = event.currentTarget;
                var targetCell = event.target;
                
            /* getting target table */
                if(!targetTable.tagName.includes('TABLE') && this.tagName.includes('TABLE')){
                    targetTable = this;
                }

            /* get unskipable tables */
                var table = targetTable.querySelector('lyte-table:not(.cxAriaSkip), lyte-expresstable:not(.cxAriaSkip), table:not(.cxAriaSkip)');
            
            /* set target table as table */
                if(!table){
                    table = targetTable;
                }

            /* tables and parent components */
                var cruxTable = table.cruxTable;
                var lyteTable = table.lyteTable;
                // var modalContainer = table.modalContainer;

            /* set default data for "no result found" */
                var noResClass;
                if(cruxTable && cruxTable.tagName === 'CRUX-TABLE-COMPONENT'){
                    noResClass = (cruxTable.component.data.cxPropNoContentClass) ? cruxTable.component.data.cxPropNoContentClass : 'cxTableCompNoResults';
                }

                if(noResClass){
                    /* gets no result div */
                        var noResElem = table.querySelector('.'+noResClass);
                    /* set default attributes for no result div */
                        if(noResElem){
                            mixinScope.setDefaultAttr(noResElem);
                        }
                }

            /* set default data's for current and sibiling rows */
                var curr_row = targetCell.closest('lyte-tr, lyte-exptable-tr, tr');
                mixinScope.attrForSibilingRows(curr_row, table);

            /* call setAriaLabel to set aria for current cell */
                var tableCurrCell = targetCell.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, .noResultAriaComp');
                tableCurrCell = tableCurrCell?tableCurrCell:(targetCell.tagName.includes('TH') || targetCell.tagName.includes('TD') || targetCell.classList.contains('noResultAriaComp'))?targetCell:undefined;
                if(curr_row && tableCurrCell){
                    mixinScope.setAriaLabel(tableCurrCell, table, curr_row);
                }

            /* check for table have cxIsEditOpen add listener true while ajax edit opens */
            /* document.querySelector('.lyteBodyWrapper') added for issue if user click on menu icon and menu opens while focus is in the cell layer(listener is not true) - menu's keydown event and this mixin keydown event for cell layer both are worked same time */
                if((!table._interactiveElementNav && table.attributes.cxIsEditOpen) || document.querySelector('.lyteBodyWrapper')){
                    table._interactiveElementNav = true;
                }

            /* check if the menu of interactive element is opened/closed */
                if(!table._pauseKeyboardNavigation && table.querySelector('.lyteMenuSelected')){    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                    table._pauseKeyboardNavigation = true;
                }

            /* checking if listener attr is true to navigate through sub focusable components in table */
                var ariaActiveElement = targetCell.classList.contains('cxAriaActive') ? targetCell : table.querySelector('.cxAriaActive');
                if(!table._interactiveElementNav){
                    if(ariaActiveElement && (ariaActiveElement.tagName.includes('TH') || ariaActiveElement.tagName.includes('TD'))){        /* on dropdown open search in dropbox gets focused and listener attr is removed so added check if the ariaActiveElement is TH || TD */
                        table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                    }else{
                        table.addEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                        table._interactiveElementNav = true;
                        mixinScope.interactiveElementKeyboardNav(event);              /* listener attr removed coz of search in dropdbox focused so set listener attr as true and calls interactiveElementKeyboardNav to navigate through focusable elements */
                    }
                }else if(table._interactiveElementNav){
                    if(ariaActiveElement){
                        var focusableElem = ariaActiveElement.querySelector('[focusable]:not(.cxSkipFocusable)');
                        if(ariaActiveElement.attributes && !ariaActiveElement.attributes.focusable && focusableElem){
                            focusableElem.focus();
                        }
                        table.addEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                    }else{
                        table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                        table._interactiveElementNav = false;
                    }
                }

            /* select all rows in table includes "no result found" context row if available */
            if(ariaActiveElement && (table.tagName === 'CRUX-TABLE-COMPONENT' || !table.querySelector('lyte-table, lyte-expresstable, table'))){
                var tableRow = table.querySelectorAll('lyte-tr, lyte-exptable-tr, tr, crux-lookupfilter-component');
                /* key navigation */
                var mev = new Event("mouseover");
                var mout = new Event("mouseout");
                var mleave = new Event("mouseleave");
                var preventTab = false;
                if(table._pauseKeyboardNavigation && (event.key.includes('Arrow') || event.key.includes('Tab') || event.key === ' ' || event.key === 'Enter')){
                    if(event.key.includes('Arrow') || event.key.includes('Tab') || event.key === ' '){
                        event.preventDefault();
                    }
                    if(event.key.includes('Tab') || event.key === ' ' || event.key === 'Enter'){
                        setTimeout(() => {
                            if(!table.querySelector('.lyteMenuSelected') && table._pauseKeyboardNavigation){    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                delete table._pauseKeyboardNavigation;
                            }
                        }, 0);
                    }
                }else if(!table._interactiveElementNav && !table._pauseKeyboardNavigation){ // && !tableComp.attr('cxIsEditOpen')
                    if(event.key.includes('Arrow') && !document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                        var tableRowLen = tableRow.length;
                        for(var i=0;i<tableRowLen;i++){
                            var focusableCells = tableRow[i].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                            var temp = 0;
                            var t;

                            var focusableCellsLen = focusableCells.length;
                            for(var j=0;j<focusableCellsLen;j++){
                                if(ariaActiveElement !== focusableCells[j] && focusableCells[j].querySelector('.cxAriaActive')){
                                    focusableCells[j].focus();
                                }
                                if(ariaActiveElement === focusableCells[j]){
                                    var prevActElem = document.activeElement;
                                    t = (event.key === 'ArrowUp' || event.key === 'ArrowDown')?i:j;
                                    if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                                        event.preventDefault();
                                        var rowCells;
                                        do{
                                            rowCells = tableRow[t].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                            if(tableRow[t] && rowCells[j]){
                                                rowCells[j].dispatchEvent(mout);
                                                rowCells[j].dispatchEvent(mleave);
                                            }
                                            tableRow[t].dispatchEvent(mout);
                                            tableRow[t].dispatchEvent(mleave);
                                            if(event.key === 'ArrowUp'){
                                                t = (t === 0)?tableRowLen-1:t-1;
                                            }else if(event.key === 'ArrowDown'){
                                                t = (t === tableRowLen-1)?0:t+1;
                                            }
                                            tableRow[t].dispatchEvent(mev);
                                            rowCells = tableRow[t].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                            if(tableRow[t] && rowCells[j]){
                                                rowCells[j].dispatchEvent(mev);

                                                /* sets aria label for cell and focusable elements inside the cell */
                                                    mixinScope.setAriaLabel(rowCells[j], table, tableRow[t]);
                                                
                                                rowCells[j].focus();
                                            }
                                        }while(document.activeElement === prevActElem && (i !== t));
                                        temp = 1;
                                        break;
                                    }else if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
                                        event.preventDefault();
                                        do{
                                            rowCells = tableRow[i].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                            if(tableRow[i] && rowCells[t]){
                                                rowCells[t].dispatchEvent(mout);
                                                rowCells[t].dispatchEvent(mleave);
                                            }
                                            if(event.key === 'ArrowLeft'){
                                                t = (t === 0)?focusableCellsLen-1:t-1;
                                            }else if(event.key === 'ArrowRight'){
                                                t = (t === focusableCellsLen-1)?0:t+1;
                                            }
                                            tableRow[i].dispatchEvent(mev);
                                            rowCells = tableRow[i].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');    // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                            if(tableRow[i] && rowCells[t]){
                                                rowCells[t].dispatchEvent(mev);

                                                /* sets aria label for cell and focusable elements inside the cell */
                                                    mixinScope.setAriaLabel(rowCells[t], table, tableRow[i]);

                                                rowCells[t].focus();
                                            }
                                        }while(document.activeElement === prevActElem && (j !== t));
                                        temp = 1;
                                        break;
                                    }
                                }
                            }

                            if(temp === 1){
                                break;
                            }
                        }
                        event.stopImmediatePropagation();
                    }else if((event.key === ' ' || event.key === 'Enter')){
                        var activeCell = document.activeElement;
                        var activeRow = activeCell.closest('lyte-tr, lyte-exptable-tr, tr, crux-lookupfilter-component');
                        activeRow.dispatchEvent(mev);
                        if(event.target === activeCell){
                            event.preventDefault();
                            mixinScope.setAttrForInteractiveElements(activeCell);
                            var actCellFocusable;
                            if(activeCell){
                                actCellFocusable = activeCell.querySelector('[focusable]:not(.cxSkipFocusable)');
                            }
                            if(actCellFocusable){
                                if(actCellFocusable.type === 'checkbox'){
                                    var comp = actCellFocusable;
                                    $L(activeRow).on('click', (event) => {
                                        if(document.activeElement.type === 'checkbox'){
                                            event.stopImmediatePropagation();
                                        }
                                    })
                                    setTimeout(() => {
                                        comp.focus();
                                    }, 100);
                                }else if((!($L(actCellFocusable).attr('click'))) && activeCell.querySelector('[focusable]').tabIndex){
                                    activeCell.dispatchEvent(mev);
                                    actCellFocusable.focus();
                                }else{
                                    actCellFocusable.focus();
                                }
                            }else{
                                activeCell.click();
                            }
                            if(!table._interactiveElementNav){
                                table.addEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                                table._interactiveElementNav = true;
                            }
                            // if(modalContainer && modalContainer.component && modalContainer.component.parent && modalContainer.component.parent.tagName === 'LYTE-MODAL'){
                            //     modalContainer.component.parent.ltProp('closeOnEscape', 'false');
                            // }
                        }
                    }else if(event.key === 'Tab'){
                        preventTab = true;
                        
                        const selectors = `lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, .noResultAriaComp, [focusable], a[href], area[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]),
 select:not([disabled]), textarea:not([disabled]),
 [tabindex]:not([tabindex="-1"]), [contenteditable="true"], iframe, summary, audio[controls], video[controls]`;


                        var tableCellsWithFocusables = table.querySelectorAll(selectors);
                        if(table.querySelector('.cxPrevAriaActive')){
                            $L('.cxPrevAriaActive', table).removeClass('cxPrevAriaActive');
                        }
                        if(event.shiftKey){
                            tableCellsWithFocusables[0].focus({preventScroll : true});
                        }else{
                            var tableCellLen = tableCellsWithFocusables.length;
                            tableCellsWithFocusables[tableCellLen-1].focus({preventScroll : true}); 
                        }
                    }
                }
                var currAct = $L('.cxAriaActive', lyteTable);
                if(currAct && !preventTab){
                    var currActLeft = currAct[0].offsetLeft; //eslint-disable-line @zoho/webperf/layout-thrashing
                    var currActWidth = currAct[0].offsetWidth; //eslint-disable-line @zoho/webperf/layout-thrashing
                    if(currAct.cxGetScrollParent){
                        var scrollDiv = currAct.cxGetScrollParent();
                        if(scrollDiv){
                            if(scrollDiv.scrollLeft > currActLeft){ //eslint-disable-line @zoho/webperf/layout-thrashing
                                scrollDiv.scrollLeft =  currActLeft;
                            }else if(currActLeft+currActWidth > scrollDiv.scrollLeft+scrollDiv.offsetWidth){ //eslint-disable-line @zoho/webperf/layout-thrashing
                                scrollDiv.scrollLeft += (currActLeft+currActWidth)-(scrollDiv.scrollLeft+scrollDiv.offsetWidth); //eslint-disable-line @zoho/webperf/layout-thrashing
                            }
                        }
                    }
                }
                if(table.querySelector('.lyteTableFixed')){
                    var activeElement = document.activeElement;
                    var curr_cell = (activeElement.tagName.includes('TH') || activeElement.tagName.includes('TD')) ? activeElement : activeElement.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                    var curr_rows = curr_cell.closest('lyte-tr, lyte-exptable-tr, tr');
                    var curr_row_cells = Array.from(curr_rows.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, [focusable]'));
                    var curr_cell_index = curr_row_cells.indexOf(activeElement);
                    var next_cell = curr_row_cells[curr_cell_index+1];
                    if(event.shiftKey){
                        next_cell = curr_row_cells[curr_cell_index-1];
                    }
                    if(next_cell){
                        while(!(next_cell.tagName.includes('TD') || next_cell.tagName.includes('TH'))){
                            next_cell = next_cell.parentElement;
                        }
                    }
                    if((activeElement.className && !activeElement.className.includes('lyteTableFixed')) || (event.key === 'Tab' && next_cell && next_cell.className && !next_cell.className.includes('lyteTableFixed'))){
                        if(event.key === 'Tab'){
                            curr_cell = next_cell;
                        }
                        var scrollElement = activeElement;
                        var tempScrollElement = activeElement;
                        if(scrollElement.parentElement){
                            tempScrollElement = scrollElement.parentElement.querySelector('[scroll]');
                        }
                        while((!tempScrollElement) && scrollElement !== table){
                            scrollElement = scrollElement.parentElement;
                            if(scrollElement){
                                tempScrollElement = scrollElement.parentElement;
                                tempScrollElement = tempScrollElement.querySelector('[scroll]'); // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                            }
                        }
                        var fixedElement = curr_rows.querySelectorAll('.lyteTableFixed');
                        var fixedElemIndex = fixedElement.length-1;
                        var fixedElementSel = $L(fixedElement[fixedElemIndex]);
                        while(fixedElementSel.css('display') === 'none' && fixedElemIndex!==0){ // eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                            fixedElemIndex--;
                        }
                        var width = fixedElement[fixedElemIndex].clientWidth; // eslint-disable-line @zoho/webperf/layout-thrashing
                        var fixedElementOffset = fixedElementSel.offset(); // eslint-disable-line @zoho/webperf/layout-thrashing
                        var activeElementOffset = $L(curr_cell).offset();// eslint-disable-line @zoho/webperf/layout-thrashing
                        if(curr_cell && !curr_cell.className.includes('lyteFixedColumn') && fixedElementOffset && fixedElementOffset.left && activeElementOffset && activeElementOffset.left && activeElementOffset.left<fixedElementOffset.left+width){
                            var leftVal = $L(scrollElement).scrollLeft() - ((fixedElementOffset.left - activeElementOffset.left)+width);// eslint-disable-line @zoho/webperf/layout-thrashing
                            $L(scrollElement).scrollLeft(leftVal);
                        }
                    }
                }
            }
        },

    /* arrow key support for interactive elements */
        interactiveElementKeyboardNav : function(){
            var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
            var table = event.currentTarget;
            // var modalContainer = table.modalContainer;
            var tableRow = table.querySelectorAll('lyte-tr, lyte-exptable-tr, tr');

            if(!table._interactiveElementNav){
                table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
            }else{
                var actElem = document.activeElement;
                while(!(actElem.tagName === 'CRUX-LOOKUPFILTER-COMPONENT' || actElem.tagName.includes('TR') || actElem.tagName === 'BODY')){
                    actElem = actElem.parentElement;
                }
                if((!document.querySelector('.lyteBodyWrapper')) && (actElem.tagName !== 'CRUX-LOOKUPFILTER-COMPONENT' || event.key === 'ArrowUp' || event.key === 'ArrowDown')){
                    var mev = new Event("mouseover");
                    var mout = new Event("mouseout");
                    var mleave = new Event("mouseleave");
                    var prevActElem = document.activeElement;
                    var changeFocus = true;
                    if((prevActElem.tagName === 'INPUT' || prevActElem.tagName === 'TEXTAREA') && (prevActElem.type !== 'checkbox' && prevActElem.type !== 'radio')){
                        changeFocus = false
                        var eleLength = prevActElem.value.length;
                        var curPos = event.target.selectionStart;
                        if((eleLength === curPos && event.key === 'ArrowRight') || (curPos === 0 && event.key === 'ArrowLeft') || event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                            changeFocus = true;
                        }
                    }
                    if(!table._pauseKeyboardNavigation && changeFocus && event.key.includes('Arrow') && !document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                        event.preventDefault();
                        var i;
                        var t;
                        var cell;
                        var prevElem;
                        var nextElem;
                        if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
                            cell = document.activeElement.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                            var row = cell.closest('lyte-tr, lyte-exptable-tr, tr');
                            var focusableElements = Array.from(row.querySelectorAll('[focusable]:not(.cxSkipFocusable)'));
                            if(cell.attributes && cell.attributes.cxFocusableSelector && cell.attributes.cxFocusableSelector.value){
                                var focusableSelector = cell.getAttribute('cxFocusableSelector');
                                if(focusableSelector){
                                    var focusableSelectorElem = document.querySelector(focusableSelector);
                                    if(focusableSelectorElem){
                                        focusableElements.push(focusableSelectorElem);
                                        if(cell){
                                            mixinScope.setAriaLabel(cell, table, row);
                                            mixinScope.setAttrForInteractiveElements(cell);
                                        }
                                    }
                                }
                            }
                            var focusableElementsLen = focusableElements.length;
                            for(i=0;i<focusableElementsLen;i++){
                                if(document.activeElement === focusableElements[i] && (!focusableElements[i].querySelector('[focusable]:not(.cxSkipFocusable)'))){
                                    prevElem = focusableElements[i];
                                    t = i;
                                    do{
                                        if(event.key === 'ArrowLeft'){
                                            t = (t === 0)?focusableElementsLen-1:t-1;
                                        }else if(event.key === 'ArrowRight'){
                                            t = (t === focusableElementsLen-1)?0:t+1;
                                        }
                                        if(!($L(focusableElements[t]).attr('click'))){
                                            row.dispatchEvent(mev);
                                        }
                                        //For new rendering elements on click
                                        nextElem = focusableElements[t];
                                        while(!((prevElem.tagName.includes('TD') || prevElem.tagName.includes('TH')) && (nextElem.tagName.includes('TD') || nextElem.tagName.includes('TH')))){
                                            if(!(prevElem.tagName.includes('TD') || prevElem.tagName.includes('TH'))){
                                                prevElem = prevElem.parentElement;
                                            }
                                            if(!(nextElem.tagName.includes('TD') || nextElem.tagName.includes('TH'))){
                                                nextElem = nextElem.parentElement;
                                            }
                                        }

                                        /* sets aria label for cell and focusable elements inside the cell */
                                            if(focusableElements[t]){
                                                mixinScope.setAriaLabel(focusableElements[t], table, row);
                                                mixinScope.setAttrForInteractiveElements(focusableElements[t]);
                                            }

                                        var focusableInCell = focusableElements[t].querySelector('[focusable]:not(.cxSkipFocusable)');
                                        if(focusableInCell){
                                            focusableInCell.focus();
                                        }else{
                                            //for table in detail view page
                                            focusableElements[t].focus();
                                        }
                                    }while(prevActElem === document.activeElement && i !== t);

                                    /* remove focusable for focusable element in cell if the active elment is not current focusable element and add focusable for current active element (while give focus to lyte-checkbox - input inside lyte-checkbox get focused) */
                                        if(document.activeElement !== focusableElements[t]){
                                            document.activeElement.setAttribute('focusable', true);
                                            focusableElements[t].removeAttribute('focusable', false);
                                        }
                                    
                                    break;
                                }
                            }
                        }else{
                            var tableRowLen = tableRow.length;
                            for(i=0;i<tableRowLen;i++){
                                if(tableRow[i].querySelector('.cxAriaActive')){
                                    var br = false;
                                    cell = tableRow[i].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                                    var cellLen = cell.length;
                                    for(var j=0;j<cellLen;j++){
                                        if(cell[j] && cell[j].className && cell[j].className.includes('cxAriaActive') || cell[j].querySelector('.cxAriaActive')){
                                            prevElem = document.activeElement;
                                            t = i;
                                            tableRow[t].dispatchEvent(mout);
                                            tableRow[t].dispatchEvent(mleave);
                                            if(event.key === 'ArrowUp'){
                                                t = (t === 0)?tableRowLen-1:t-1;
                                            }else if(event.key === 'ArrowDown'){
                                                t = (t === tableRowLen-1)?0:t+1;
                                            }
                                            var focusElem = tableRow[t].querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td')[j];
                                            tableRow[t].dispatchEvent(mev);
                                            //For new rendering elements on click
                                            nextElem = focusElem;
                                            while(!((prevElem.tagName.includes('TD') || prevElem.tagName.includes('TH')) && (nextElem.tagName.includes('TD') || nextElem.tagName.includes('TH')))){
                                                if(!(prevElem.tagName.includes('TD') || prevElem.tagName.includes('TH'))){
                                                    prevElem = prevElem.parentElement;
                                                }
                                                if(!(nextElem.tagName.includes('TD') || nextElem.tagName.includes('TH'))){
                                                    nextElem = nextElem.parentElement;
                                                }
                                            }
                                            
                                            /* sets aria label for cell and focusable elements inside the cell */
                                                if(focusElem){
                                                    mixinScope.setAriaLabel(focusElem, table, tableRow[i]);
                                                    mixinScope.setAttrForInteractiveElements(focusElem);
                                                }

                                            //for table in detail view page
                                            var focElem = focusElem.querySelector('[focusable]:not(.cxSkipFocusable)');
                                            if(focElem && (!focusElem.className.includes('cxLookupFieldList')) && (!nextElem.querySelector('.cxSetFocus'))){
                                            // if(focElem && (!focusElem.className.includes('cxLookupFieldList'))){

                                                /* focusable element visible after focusElem (table cell) got focused */
                                                    if(!mixinScope.isVisible(focElem)){
                                                        focusElem.focus();
                                                    }
                                                    if(mixinScope.isVisible(focElem)){
                                                        focElem.focus();
                                                    }
                                            }else if(focusElem.attributes.focusable){
                                                focusElem.focus();
                                            }

                                            /* remove focusable for focusable element in cell if the active elment is not current focusable element and add focusable for current active element (while give focus to lyte-checkbox - input inside lyte-checkbox get focused) */
                                                if(document.activeElement !== focusElem){
                                                    document.activeElement.setAttribute('focusable', true);
                                                    focusElem.removeAttribute('focusable', false);
                                                }

                                            br = true;
                                            break;
                                        }
                                    }
                                    if(br){
                                        break;
                                    }
                                }
                            }
                        }
                        event.stopPropagation();
                    }else if(!table._pauseKeyboardNavigation && changeFocus && (event.key === ' ' || event.key === 'Enter')){
                        event.preventDefault();
                        var activeFocusableElem = document.activeElement;
                        var actElement = activeFocusableElem.closest('lyte-tr, lyte-exptable-tr, tr');
                        if(activeFocusableElem.type === 'checkbox'){
                            var comp = activeFocusableElem;
                            $L(actElement).on('click', (event) => {
                                if(document.activeElement.type === 'checkbox'){
                                    event.stopImmediatePropagation();
                                }
                            })
                            setTimeout(() => {
                                comp.focus();
                            }, 100);
                        }else{
                            activeFocusableElem.dispatchEvent(mev);
                            activeFocusableElem.click();
                            table._pauseKeyboardNavigation = true;
                        }
                        event.stopImmediatePropagation();
                    }else if(event.key === 'Escape'){
                        var activeFocusableElement = document.activeElement;
                        var activeFocusableCell = activeFocusableElement.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                        var activeRow = activeFocusableCell.closest('lyte-tr, lyte-exptable-tr, tr');
                        if(table._pauseKeyboardNavigation && !table.querySelector('.lyteMenuSelected')){
                            activeFocusableCell.dispatchEvent(mev);
                            activeFocusableElement.focus();
                            delete table._pauseKeyboardNavigation;
                        }else{
                            var _close = activeFocusableCell.querySelector('.cxCloseEdit')
                            if(activeFocusableCell.querySelector('.cxSetFocus') && _close){
                                _close.click();
                            }
                            if(event.target === activeFocusableElement){
                                activeRow.dispatchEvent(mout);
                                activeRow.dispatchEvent(mleave);
                                activeFocusableCell.dispatchEvent(mev);
                                activeFocusableCell.focus();
                                
                                if(table._interactiveElementNav){
                                    table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                                    delete table._interactiveElementNav;
                                }
                                // if(!(table._interactiveElementNav || table.querySelector('[subKeyListen]')) && modalContainer && modalContainer.component && modalContainer.component.parent && modalContainer.component.parent.tagName === 'LYTE-MODAL'){
                                //     modalContainer.component.parent.ltProp('closeOnEscape', 'true');
                                // }
                            }
                        }
                    }else if(!table._pauseKeyboardNavigation && event.key === 'Tab'){
                        var tableCellsWithFocusables = table.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td, .noResultAriaComp, [focusable]');
                        if(event.shiftKey){
                            tableCellsWithFocusables[0].focus({preventScroll : true});
                        }else{
                            var tableCellsFocusableLen = tableCellsWithFocusables.length;
                            tableCellsWithFocusables[tableCellsFocusableLen-1].focus({preventScroll : true}); 
                            if(table._interactiveElementNav){
                                table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                                delete table._interactiveElementNav;
                            }
                        }
                    }
                }
            }
        },

    /* isVisible is added to check visibility of focusable element (visible onhover) */
        isVisible : function(element) {
            const style = window.getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden';
        },

    /* adding click event listener to reset table._interactiveElementNav (to remove interactive element navigation ) */
        clickOnTable : function(){
            if(event.isTrusted){
                var mixinScope = Lyte.registeredMixins['crux-aria-table-mixin'];
                var table = event.currentTarget ? event.currentTarget : (this.$node ? this.$node : this);
                setTimeout(() => {
                    if(table._pauseKeyboardNavigation && !table.querySelector('.lyteMenuSelected')){
                        delete table._pauseKeyboardNavigation;
                    }else if(!table._pauseKeyboardNavigation && table.querySelector('.lyteMenuSelected')){
                        table._pauseKeyboardNavigation = true;
                    }
                }, 0);
                if(table._interactiveElementNav){
                    table.removeEventListener('keydown', mixinScope.interactiveElementKeyboardNav);
                    delete table._interactiveElementNav;
                }
                var curr_cell = (event.target.tagName.includes('TH') || event.target.tagName.includes('TD')) ? event.target : event.target.closest('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, th, td');
                mixinScope.setAttrForInteractiveElements(curr_cell);
            }
        }
});


/*
cxAriaTableKeyEvent - attribute - if keyEvent eventlistener added for "No Result Found" Div
cxAriaTableFocus - attribute - if focusin and focusout eventlistener added for all focusable elements 
cxAriaTableKeydown - attribute - if keyEvent eventlistener added for table
cxAriaTableFocusableParent - attribute - if table mixin binded for parent component
*/
