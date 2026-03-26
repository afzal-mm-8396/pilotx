Lyte.Mixin.register("crux-aria-lookup-filter-mixin", {
    /* ----- Focus in and Focus out ----- */
    onFocus: function(){
        var actEle = document.activeElement;
        if(actEle.id != 'lv_filter_scroll'){
            if(document.querySelector('.cxAriaActive')){
                $L(document.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
            }else{
                $L(actEle).addClass('cxAriaActive');
                event.stopImmediatePropagation();
            }
        }
    },
    onFocusOut: function(){
        if(document.querySelector('.cxAriaActive')){
            $L(document.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
        }
    },
    /* ---------------------------------- */
    lookUpKeyEvent: function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-lookup-filter-mixin'];
        var curr_comp = event.currentTarget;
        if(curr_comp.$node){
            curr_comp = curr_comp.$node;
        }
        var modalContainer = curr_comp.modalContainer;
        var table = curr_comp.table;
        var actElement = curr_comp.querySelector('.cxAriaActive');
        this.bindLabelAndIndex.call(this);
        var activeFocusableElem = document.activeElement;
        if(actElement){
            activeFocusableElem = actElement;
        }
        if(event.target == activeFocusableElem){
            var tableMixinFuncCall = Lyte.registeredMixins['crux-aria-table-mixin'];
            if($L(table).attr('listener')){
                table.removeEventListener('keydown', tableMixinFuncCall.actionCompEvent);
                $L(table).removeAttr('listener');
            }
        }

        if(actElement && !(actElement.tagName.includes('TD') || actElement.tagName.includes('TH')) && !$L(curr_comp).attr('subKeyListen')){
            curr_comp.addEventListener('keydown', mixinFuncCall.lookUpSubKeyEvent);
            $L(curr_comp).attr('subKeyListen', true);
            if(!table.attributes.listener && modalContainer.component && modalContainer.component.parent && modalContainer.component.parent.tagName == 'LYTE-MODAL'){
                modalContainer.component.parent.ltProp('closeOnEscape', 'false');
            }
            event.stopImmediatePropagation();
            var evt = new KeyboardEvent('keydown', {'key':event.key});
            curr_comp.dispatchEvent(evt);
        }else if(!$L(curr_comp).attr('subKeyListen')){
            curr_comp.removeEventListener('keydown', mixinFuncCall.lookUpSubKeyEvent);
        }
        if(event.key == ' ' && (!$L(curr_comp).attr('subKeyListen') && $L(curr_comp).attr('subKeyListen') != 'true')){
            event.preventDefault();
            if((actElement.tagName.includes('TH') || actElement.tagName.includes('TD')) && actElement.querySelector('[tabIndex]')){
                actElement.querySelector('[tabIndex]').focus();
            }
            if(!$L(curr_comp).attr('subKeyListen')){
                curr_comp.addEventListener('keydown', mixinFuncCall.lookUpSubKeyEvent);
                $L(curr_comp).attr('subKeyListen', true);
            }
            if(!table.attributes.listener && modalContainer.component && modalContainer.component.parent && modalContainer.component.parent.tagName == 'LYTE-MODAL'){
                modalContainer.component.parent.ltProp('closeOnEscape', 'false');
            }
            event.stopImmediatePropagation();
        }
    },
    lookUpSubKeyEvent : function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-lookup-filter-mixin'];
        var curr_comp = event.currentTarget;
        if(curr_comp.$node){
            curr_comp = curr_comp.$node;
        }
        var modalContainer = curr_comp.modalContainer;
        var table = curr_comp.table;
        var targetComp = event.currentTarget;

        function lookupFocusOut(){
            var actElement = curr_comp.querySelector('.cxAriaActive');
            if(actElement && (actElement.tagName.includes('TD') || actElement.tagName.includes('TH')) && $L(actElement).attr('focusable') && $L(curr_comp).attr('subKeyListen')){
                curr_comp.removeEventListener('keydown', mixinFuncCall.lookUpSubKeyEvent);
                $L(curr_comp).removeAttr('subKeyListen');
            }
            if($L(curr_comp).attr('cxLookupFilterFocusout')){
                document.removeEventListener('click', lookupFocusOut);  // eslint-disable-line @zoho/zstandard/no-body-events
                $L(targetComp).removeAttr('cxLookupFilterFocusout');
            }
        }

        if(!$L(targetComp).attr('cxLookupFilterFocusout')){
            document.addEventListener('click', lookupFocusOut); // eslint-disable-line @zoho/zstandard/no-body-events
            $L(targetComp).attr('cxLookupFilterFocusout', true);
        }

        var focusableCells = curr_comp.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td');
        var activeElement = curr_comp.querySelector('.cxAriaActive');
        var tempCon = true;
        if((activeElement && activeElement.tagName == 'INPUT' && activeElement.id != 'inputId') && (event.key == 'ArrowLeft' || event.key == 'ArrowRight')){
            tempCon = false
            var eleLength = activeElement.value.length;
            var target = (event.target.ariaLabel)?event.target:event.target.querySelector('.cxAriaActive');
            var curPos = target.selectionStart;
            if((eleLength==curPos && event.key == 'ArrowRight') || (curPos==0 && event.key == 'ArrowLeft')){
                tempCon = true;
            }
        }
        if(tempCon && (event.key.includes('Arrow') || event.key == 'Escape')){
            for(var i=0;i<focusableCells.length;i++){
                var flag = 0;
                var focusableElements = focusableCells[i].querySelectorAll('[tabIndex]:not(#inputId, li)');
                if(focusableElements.length<=0){
                    focusableElements = [];
                    focusableElements.push(focusableCells[i]);
                }
                if(focusableCells[i] == activeElement || focusableCells[i].querySelector('.cxAriaActive')){
                    for(var j=0;j<focusableElements.length;j++){
                        if(focusableElements[j] == activeElement || focusableElements[j].querySelector('.cxAriaActive') || focusableCells[i] == activeElement){
                            if(!focusableElements[j].querySelector('.cxAriaActive')){
                                event.preventDefault();
                            }
                            var t;
                            if(event.key.includes('Arrow') && !document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                                if(event.key == 'ArrowUp' || event.key == 'ArrowDown'){
                                    t = j;
                                    if(event.key == 'ArrowUp'){
                                        t = (t==0)?focusableElements.length-1:t-1;
                                    }else if(event.key == 'ArrowDown'){
                                        t = (t==focusableElements.length-1)?0:t+1;
                                    }
                                    focusableElements[t].focus();
                                }else if(event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
                                    t = i;
                                    if(event.key == 'ArrowLeft'){
                                        t = (t==0)?focusableCells.length-1:t-1;
                                    }else if(event.key == 'ArrowRight'){
                                        t = (t==focusableCells.length-1)?0:t+1;
                                    }
                                    if(focusableCells[t].querySelectorAll('[tabIndex]:not(#inputId, li)').length>j){
                                        focusableCells[t].querySelectorAll('[tabIndex]:not(#inputId, li)')[j].focus();
                                    }else if(focusableCells[t].querySelectorAll('[tabIndex]:not(#inputId, li)').length<=0){
                                        focusableCells[t].focus();
                                    }else{
                                        while(focusableCells[t].querySelectorAll('[tabIndex]:not(#inputId, li)').length<=j && j>0){
                                            j--;
                                        }
                                        focusableCells[t].querySelectorAll('[tabIndex]:not(#inputId, li)')[j].focus();
                                    }
                                }
                                flag = 1;
                                event.stopImmediatePropagation();
                                break;
                            }else if(event.key == 'Escape'){
                                var actElem = curr_comp.querySelector('.cxAriaActive');
                                if(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                                    while(actElem.tagName!='LYTE-DROPDOWN'){
                                        actElem = actElem.parentElement;
                                    }
                                }
                                if(focusableElements[j] == activeElement){
                                    if(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                                        actElem.close();
                                        event.stopImmediatePropagation();
                                    }else{
                                        focusableCells[i].focus();
                                        if($L(curr_comp).attr('subKeyListen')){
                                            curr_comp.removeEventListener('keydown', mixinFuncCall.lookUpSubKeyEvent);
                                            $L(curr_comp).removeAttr('subKeyListen');
                                        }
                                    }
                                    flag = 1;
                                }else if(focusableElements[j].querySelector('.cxAriaActive')){
                                    if(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                                        actElem.close();
                                    }
                                    focusableElements[j].focus();
                                    event.stopImmediatePropagation();
                                    flag = 1;
                                }

                                var activeFocusableElem = document.activeElement;
                                if(actElem){
                                    activeFocusableElem = actElem;
                                }
                                var activeRow = activeFocusableElem;
            
                                while(!(activeRow.tagName.includes('TR') || activeRow.tagName == 'CRUX-LOOKUPFILTER-COMPONENT' || activeRow.tagName == 'BODY')){
                                    activeRow = activeRow.parentElement;
                                }
                                if(event.target == activeFocusableElem || (activeRow == event.target && actElem == activeFocusableElem)){
                                    var tableMixinFuncCall = Lyte.registeredMixins['crux-aria-table-mixin'];
                                    if($L(table).attr('listener')){
                                        table.removeEventListener('keydown', tableMixinFuncCall.actionCompEvent);
                                        $L(table).removeAttr('listener');
                                    }
                                    if(!(table.attributes.listener || curr_comp.attributes.subKeyListen) && modalContainer.component && modalContainer.component.parent && modalContainer.component.parent.tagName == 'LYTE-MODAL'){
                                        modalContainer.component.parent.ltProp('closeOnEscape', 'true');
                                    }
                                    event.stopImmediatePropagation();
                                }

                                if(flag == 1){
                                    break;
                                }
                            }
                        }
                    }
                    if(flag == 1){
                        break;
                    }
                }
            }
        }else if(event.key == 'Enter'){
            if(!document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                var focusAfterClick = document.activeElement;
                document.activeElement.click();
                $L(focusAfterClick).addClass('cxAriaActive');
                focusAfterClick.focus();
            }else if(curr_comp.component){
                curr_comp.component.bindLabelAndIndex.call(curr_comp.component);
            }
        }
    },
    bindLabelAndIndex: function(){
        var focusableElements = this.$node.querySelectorAll('[tabIndex]');
        for(var i=0;i<focusableElements.length;i++){
            var focusElement = focusableElements[i];
            if(focusElement.id == 'inputId'){
                var tempFocusElem = focusElement;
                while(tempFocusElem.tagName != 'LYTE-DROPDOWN' && tempFocusElem.tagName != 'CRUX-LOOKUPFILTER-COMPONENT'){
                    tempFocusElem = tempFocusElem.parentElement;
                }
                if(tempFocusElem.tagName == 'LYTE-DROPDOWN'){
                    focusElement = tempFocusElem.querySelector('.lyteDummyEventContainer');
                }
            }
            if(!(focusElement.tabIndex && focusElement.ariaLabel)){
                this.addLabel.call(this, focusElement);
            }
        }
    },
    bindEventForAriaLookUpFilter: function(){
        if(this.$node.cxProp('aria')){
            var focusableElements = this.$node.querySelectorAll('lyte-th, lyte-td, lyte-exptable-th, lyte-exptable-td, [tabIndex], [click], [onclick]');
            for(var i=0;i<focusableElements.length;i++){
                var focusElement = focusableElements[i];
                if(focusElement.id == 'inputId'){
                    var tempFocusElem = focusElement;
                    while(tempFocusElem.tagName != 'LYTE-DROPDOWN' && tempFocusElem.tagName != 'CRUX-LOOKUPFILTER-COMPONENT'){
                        tempFocusElem = tempFocusElem.parentElement;
                    }
                    if(tempFocusElem.tagName == 'LYTE-DROPDOWN'){
                        focusElement = tempFocusElem.querySelector('.lyteDummyEventContainer');
                    }
                }
                this.addLabel.call(this, focusElement);

                if(!$L(focusElement).attr('cxAriaLookupFilterFocus')){
                    focusElement.addEventListener('focusin', this.onFocus);
                    focusElement.addEventListener('focusout', this.onFocusOut);
                    $L(focusElement).attr('cxAriaLookupFilterFocus', true);
                }
            }

            if(!$L(this.$node).attr('cxAriaLookupFilterKeydown')){
                this.listener = this.lookUpKeyEvent.bind(this);
                this.$node.addEventListener('keydown', this.listener);
                $L(this.$node).attr('cxAriaLookupFilterKeydown', true);
            }

            var table = this.$node;
            if(this.$node._callee){
                table = this.$node._callee;
                if(table.tagName == 'CRUX-TABLE-COMPONENT' || table.tagName == 'LYTE-TABLE' || table.tagName == 'LYTE-EXPRESSTABLE' || table.tagName == 'TABLE'){
                    if(table.tagName.includes('CRUX') && table.querySelector('lyte-table, lyte-expresstable, table')){
                        table = table.querySelector('lyte-table, lyte-expresstable, table');
                    }
                    this.$node.table = table;
                }
            }
            if(document.querySelector('[cxAriaTableFocusableParent]')){
                var _this = document.querySelector('[cxAriaTableFocusableParent]');
                if(_this.component){
                    _this = _this.component;
                    var modalContainer = _this;
                    if(modalContainer.$node){
                        modalContainer = modalContainer.$node;
                    }
                    while(!(modalContainer.component && modalContainer.component.parent) && modalContainer.tagName != 'LYTE-WORMHOLE' && modalContainer.tagName != 'BODY'){
                        modalContainer = modalContainer.parentElement;
                    }
                    this.$node.modalContainer = modalContainer;
                }
            }

            setTimeout(() => {
                var comp = this;
                if(this.$node){
                    comp = this.$node;
                }
                if(comp.querySelector('lyte-dropdown')){
                    var filterDropdown =  comp.querySelectorAll('lyte-dropdown');
                    for(var i=0;i<filterDropdown.length;i++){
                        if(filterDropdown[i].component && filterDropdown[i].component.childComp && filterDropdown[i].component.childComp.className && !filterDropdown[i].component.childComp.className.includes('Hidden')){
                            filterDropdown[i].close();
                        }
                    }
                }
                if(comp.firstElementChild){
                    comp.firstElementChild.focus();
                }
            }, 100);
        }
    },
    /* Add Label for Elements */
    addLabel: function(labelElem){
        var textContent;
        var eleCgn = labelElem;
        if((eleCgn.tagName.includes('TD') || eleCgn.tagName.includes('TH')) && ((!eleCgn.tabIndex) || eleCgn.tabIndex == -1)){
            eleCgn.tabIndex = 0;
        }
        if(!labelElem.ariaLabel && eleCgn.tabIndex != -1){
            if(eleCgn.tagName == 'LYTE-MENU-ITEM'){
                eleCgn = eleCgn.querySelector('[type = checkbox]');
            }
            if(eleCgn.type == 'checkbox'){
                eleCgn = eleCgn.parentElement;
            }
            if(eleCgn.tagName == 'INPUT'){
                if(eleCgn.value){
                    textContent = eleCgn.value;
                }else{
                    textContent = 'none';
                }
                if(eleCgn.placeholder){
                    eleCgn.ariaPlaceholder = eleCgn.placeholder;
                }
                if(eleCgn.maxLength){
                    eleCgn.ariaValueMax = eleCgn.maxLength;
                }
            }else if(eleCgn.childNodes.length>0){
                if(eleCgn.querySelector('span')){
                    textContent = eleCgn.querySelector('span').textContent;
                }else if(eleCgn.querySelector('#inputId')){
                    var tempElem = eleCgn.querySelector('#inputId');
                    if(tempElem.value){
                        textContent = tempElem.value;
                    }else if(tempElem.placeholder){
                        textContent = tempElem.placeholder;
                    }
                }
            }
            if(!textContent && labelElem.textContent && labelElem.textContent.trim() != ''){
                textContent = labelElem.textContent.trim();
            }
            if(textContent){
                var closeestLyteElem = labelElem.closest('[lyte-rendered]');
                if(closeestLyteElem.tagName.includes('LYTE')){
                    closeestLyteElem.ltProp('aria', true);
                    var lyteElem = closeestLyteElem.tagName;
                    switch (lyteElem) {
                        case 'LYTE-DROPDOWN':
                            closeestLyteElem.ltProp('ariaButton', {'aria-label':textContent});
                            break;
                        case 'LYTE-CHECKBOX':
                            closeestLyteElem.ltProp('ariaCheckbox', {'aria-label':textContent});
                            break;
                        case 'LYTE-RADIOBUTTON':
                            closeestLyteElem.ltProp('ariaRadio', {'aria-label':textContent});
                            break;
                        default:
                            closeestLyteElem.ltProp('ariaAttributes', {'aria-label':textContent});
                            break;
                    }
                }else{
                    labelElem.ariaLabel = textContent;
                }
            }
        }
    }
});

/*
cxLookupFilterFocusout - focus out on click (function - lookupFocusOut())
cxAriaLookupFilterFocus - focusin and focusout eventlistener added for all focusable elements
cxAriaLookupFilterKeydown - keyEvent eventlistener added for lookup filter
*/