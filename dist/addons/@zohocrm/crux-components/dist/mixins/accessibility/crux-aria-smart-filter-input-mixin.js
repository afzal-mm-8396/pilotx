Lyte.Mixin.register("crux-aria-smart-filter-input-mixin", {
    /* ----- Focus in and Focus out ----- */
    onFocus: function(){
        var actEle = document.activeElement;
        if(actEle.id != 'lv_filter_scroll'){
            if(document.querySelector('.cxAriaActive')){
                $L(document.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
            }else{
                $L(actEle).addClass('cxAriaActive');
            }
        }
    },
    onFocusOut: function(){
        if(document.querySelector('.cxAriaActive')){
            $L(document.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
        }
    },
    /* ---------------------------------- */
    filterInputKeyEvent: function(){
        if(!document.querySelector('.lyteBodyWrapper')){
            var focusableElements = this.$node.querySelectorAll('[tabIndex]:not([tabIndex][aria-label]), [type = radio]:not([tabIndex][aria-label]), [tabIndex]:not([aria-label = ""]), [tabIndex]:not(.cxMXNFld [tabIndex])');
            if(focusableElements.length>0){
                for(var i=0;i<focusableElements.length;i++){
                    var tempFocusElem = focusableElements[i];
                    if(tempFocusElem.type == 'radio'){
                        var tempDiv = tempFocusElem;
                        while(tempDiv.tagName != 'DIV'){
                            tempDiv = tempDiv.parentElement;
                        }
                        $L(tempDiv).attr('role', 'radiogroup');
                        $L(tempFocusElem).attr('role', 'radio');
                        $L(tempFocusElem).attr('aria-labelledby', tempFocusElem.parentElement.querySelector('.lyteRadioLabel').id);
                        if(tempFocusElem.checked){
                            tempFocusElem.ariaChecked = true;
                        }else{
                            tempFocusElem.ariaChecked = false;
                        }
                    }
                    if(tempFocusElem.tagName == 'INPUT' || tempFocusElem.tagName == 'LI'){
                        while(tempFocusElem.tagName != 'CRUX-SMART-FILTER-INPUT' && tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                            tempFocusElem = tempFocusElem.parentElement;
                        }
                        if(tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                            tempFocusElem = focusableElements[i];
                        }
                    }
                    this.addLabel.call(this, tempFocusElem);

                    if(!$L(tempFocusElem).attr('cxAriaSmartFilterInputFocus')){
                        tempFocusElem.addEventListener('focusin', this.onFocus);
                        tempFocusElem.addEventListener('focusout', this.onFocusOut);
                        $L(tempFocusElem).attr('cxAriaSmartFilterInputFocus', true);
                    }
                }
            }

            var activeElem = document.activeElement;
            var tempCon = true;
            
            if((activeElem.id == 'inputId' || activeElem.tagName == 'LI' || activeElem == this.$node.querySelector('.cxMXNFld input'))){
                if(!(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft'))){
                    var dropdown = activeElem;
                    while(dropdown.tagName != 'LYTE-DROPDOWN'){
                        dropdown = dropdown.parentElement;
                    }
                    if(dropdown.component.data.ltPropType == 'multiple'){
                        dropdown = dropdown.querySelector('.lyteDummyEventContainer');
                    }
                    activeElem = dropdown;
                    dropdown.focus();
                }
            }
            
            var focusableElements = this.$node.querySelectorAll('[tabIndex][aria-label]:not(.cvSubOption [tabIndex][aria-label], #inputId, li, .cxMXNFld input), [type = radio][aria-label]');    //  eslint-disable-line no-redeclare
            if(this.$node.className.includes('cvSubOption')){
                focusableElements = this.$node.querySelectorAll('[tabIndex][aria-label]:not(#inputId, li, .cxMXNFld input), [type = radio][aria-label]');
            }
    
            if((activeElem.tagName == 'INPUT' && activeElem.type == 'text') && (event.key == 'ArrowLeft' || event.key == 'ArrowRight')){
                tempCon = false
                var eleLength = activeElem.value.length;
                var curPos = event.target.selectionStart;
                if((eleLength==curPos && event.key == 'ArrowRight') || (curPos==0 && event.key == 'ArrowLeft')){
                    tempCon = true;
                }
            }
    
            if(activeElem.type == 'radio'){
                var tempDiv = activeElem;    //  eslint-disable-line no-redeclare
                while(tempDiv.tagName != 'DIV'){
                    tempDiv = tempDiv.parentElement;
                }
                $L(tempDiv).attr('role', 'radiogroup');
                $L(activeElem).attr('role', 'radio');
                $L(activeElem).attr('aria-labelledby', activeElem.parentElement.querySelector('.lyteRadioLabel').id);
                if(activeElem.checked){
                    activeElem.ariaChecked = true;
                }else{
                    activeElem.ariaChecked = false;
                }
            }

            if(event.key == ' ' && activeElem.type == 'radio'){
                var tempActEle = activeElem;
                while(tempActEle.tagName != 'LYTE-RADIOBUTTON'){
                    tempActEle = tempActEle.parentElement;
                }
                tempActEle = tempActEle.nextElementSibling;
                if(tempActEle.querySelector('[tabIndex][aria-label]')){
                    tempActEle.querySelector('[tabIndex][aria-label]').focus();
                }
            }else if(tempCon && (event.key.includes('Arrow'))){
                if(!(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft'))){
                    event.preventDefault();
                    // if(activeElem.tagName == 'LYTE-DROPDOWN' || activeElem.parentElement.tagName == 'LYTE-DROPDOWN'){
                    //     event.stopImmediatePropagation();
                    // }
                    for(var i=0;i<focusableElements.length;i++){    //  eslint-disable-line no-redeclare
                        if((activeElem == focusableElements[i] || activeElem == focusableElements[i].parentElement) && (!focusableElements[i].querySelector('.lyteDropButtonDown, .lyteDropButtonUp, .lyteDropButtonLeft, .lyteDropButtonRight'))){
                            if((focusableElements[i].id && focusableElements[i].id == 'inputId') || focusableElements[i] == this.$node.querySelector('.cxMXNFld input')){
                                var dropdown = document.activeElement;    //  eslint-disable-line no-redeclare
                                while(dropdown.tagName != 'LYTE-DROPDOWN'){
                                    dropdown = dropdown.parentElement;
                                }
                                if(document.querySelector('.lyteDropButtonDown, .lyteDropButtonUp, .lyteDropButtonLeft, .lyteDropButtonRight')){
                                    dropdown.close();
                                }
                            }
                            var t = i;
                            if(event.key == 'ArrowUp' || event.key == 'ArrowDown'){
                                var focusableElements = this.$node;    //  eslint-disable-line no-redeclare
                                while(!focusableElements.className.includes('leftElements')){
                                    focusableElements = focusableElements.parentElement;
                                }
                                var leftElems = focusableElements;
                                while(leftElems.tagName != 'CRUX-SMART-FILTER'){
                                    leftElems = leftElems.parentElement;
                                }
                                leftElems = leftElems.querySelectorAll('.leftElements, lyte-accordion-header');
                                for(var i=0;i<leftElems.length;i++){    //  eslint-disable-line no-redeclare
                                    if(leftElems[i].querySelector('.cxAriaActive')){
                                        var t = i;    //  eslint-disable-line no-redeclare
                                        // if(event.key == 'ArrowUp'){
                                        // }else 
                                        if(event.key == 'ArrowDown'){
                                            t = (t == leftElems.length-1)?0:t+1;
                                        }
                                        if(leftElems[t].tagName == 'LYTE-ACCORDION-HEADER'){
                                            leftElems[t].focus();
                                        }else{
                                            leftElems[t].querySelector('[type = checkbox]').focus();
                                        }
                                        break;
                                    }
                                }
                                event.stopImmediatePropagation();
                                break;
                            }else if(event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
                                if(event.key == 'ArrowLeft'){
                                    t = (t==0)?focusableElements.length-1:t-1;
                                }else if(event.key == 'ArrowRight'){
                                    t = (t==focusableElements.length-1)?0:t+1;
                                }
                                focusableElements[t].focus();
                                if(focusableElements[t].tagName=='LYTE-DROPDOWN'){
                                    focusableElements[t].querySelector('.lyteDummyEventContainer').click();
                                }else{
                                    focusableElements[t].click();
                                }
                                break;
                            }
                            if(document.activeElement.id && document.activeElement.id == 'inputId' || document.activeElement.tagName == 'LI' || document.activeElement == this.$node.querySelector('.cxMXNFld input')){
                                var eleToFocus = document.activeElement;
                                while(eleToFocus.tagName != 'LYTE-DROPDOWN' && eleToFocus.tagName != 'CRUX-SMART-FILTER' && eleToFocus.tagName != 'CRUX-SMART-FILTER-INPUT'){
                                    eleToFocus = eleToFocus.parentElement;
                                }
                                eleToFocus.focus();
                                break;
                            }
                        }
                    }
                    event.stopPropagation();
                }
            }else if(event.key == 'Escape'){
                if(document.activeElement.tagName == 'LI' || document.activeElement.id == 'inputId' || this.$node.querySelector('.cxMXNFld input')){
                    var tempActEle = document.activeElement;    //  eslint-disable-line no-redeclare
                    while(tempActEle.tagName != 'LYTE-DROPDOWN' && tempActEle.tagName != 'CRUX-SMART-FILTER' && tempActEle.tagName != 'CRUX-SMART-FILTER-INPUT'){
                        tempActEle = tempActEle.parentElement;
                    }
                    if(tempActEle.component.data.ltPropType == 'multiple'){
                        tempActEle = tempActEle.querySelector('.lyteDummyEventContainer');
                    }
                    if(document.querySelector('.lyteDropdownDown, .lyteDropdownUp, .lyteDropdownRight, .lyteDropdownLeft')){
                        tempActEle.close();
                    }else{
                        event.preventDefault();
                        if(tempActEle.tagName == 'LYTE-DROPDOWN' || tempActEle.parentElement.tagName == 'LYTE-DROPDOWN'){
                            event.stopImmediatePropagation();
                            tempActEle.focus();
                        }
                    }
                }else if(this.$node.className.includes('cvSubOption')){
                    this.$node.previousElementSibling.focus();
                }
            }else if(event.key == 'Enter'){
                if(document.activeElement.type == 'checkbox'){
                    // this.taggleFocus = this.toggleFocusFilterInput.bind(this);
                    // document.activeElement.addEventListener('click', this.taggleFocus)
                    document.activeElement.click();
                }else{
                    setTimeout(() => {
                        var focusableElements = this.$node.querySelectorAll('[tabIndex]:not([tabIndex][aria-label])');
                        for(var i=0;i<focusableElements.length;i++){
                            this.addFocus.call(this, focusableElements[i]);
                        }
                        if(!document.activeElement.className.includes('cxAriaActive')){
                            $L(document.activeElement).addClass('cxAriaActive');
                        }
                    }, 50);
                }
            }else if(!event.key.includes('Page') && event.key != ' ' && document.activeElement.tagName != 'INPUT' && document.activeElement.querySelector('input[tabIndex]')){
                document.activeElement.querySelector('input[tabIndex]').focus();
            }
        }else if(event.key == 'Enter'){
            setTimeout(() => {
                var focusableElements = this.$node.querySelectorAll('[tabIndex]:not([tabIndex][aria-label]), [type = radio]:not([tabIndex][aria-label]), [tabIndex]:not([aria-label = ""])');
                if(focusableElements.length>0){
                    for(var i=0;i<focusableElements.length;i++){
                        var tempFocusElem = focusableElements[i];
                        if(tempFocusElem.tagName == 'INPUT' || tempFocusElem.tagName == 'LI'){
                            while(tempFocusElem.tagName != 'CRUX-SMART-FILTER-INPUT' && tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                                tempFocusElem = tempFocusElem.parentElement;
                            }
                            if(tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                                tempFocusElem = focusableElements[i];
                            }
                        }
                        this.addLabel.call(this, tempFocusElem);

                        if(!$L(tempFocusElem).attr('cxAriaSmartFilterInputFocus')){
                            tempFocusElem.addEventListener('focusin', this.onFocus);
                            tempFocusElem.addEventListener('focusout', this.onFocusOut);
                            $L(tempFocusElem).attr('cxAriaSmartFilterInputFocus', true);
                        }
                    }
                }
            }, 100);
        }
        if(this.$node.querySelector('.cxAriaActive')){
            this.addLabel.call(this, this.$node.querySelector('.cxAriaActive'));
        }
    },
    bindEventForAriaFilterInput: function(){
        var actElem = document.activeElement;
        var focusableElements = this.$node.querySelectorAll('[tabIndex], [type = radio]');
        
        if(focusableElements.length>0 && this.$node.cxProp('aria')){
            for(var i=0;i<focusableElements.length;i++){
                var tempFocusElem = focusableElements[i];
                if(tempFocusElem.type == 'radio'){
                    var tempDiv = tempFocusElem;
                    while(tempDiv.tagName != 'DIV'){
                        tempDiv = tempDiv.parentElement;
                    }
                    $L(tempDiv).attr('role', 'radiogroup');
                    $L(tempFocusElem).attr('role', 'radio');
                    $L(tempFocusElem).attr('aria-labelledby', tempFocusElem.parentElement.querySelector('.lyteRadioLabel').id);
                    if(tempFocusElem.checked){
                        tempFocusElem.ariaChecked = true;
                    }else{
                        tempFocusElem.ariaChecked = false;
                    }
                    tempFocusElem.parentElement.onmouseup = this.radioCheck;
                    tempFocusElem.parentElement.onkeydown = this.radioCheck;
                }
                if(tempFocusElem.tagName == 'INPUT'){
                    while(tempFocusElem.tagName != 'CRUX-SMART-FILTER-INPUT' && tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                        tempFocusElem = tempFocusElem.parentElement;
                    }
                    if(tempFocusElem.tagName != 'LYTE-DROPDOWN'){
                        tempFocusElem = focusableElements[i];
                    }
                }
                this.addLabel.call(this, tempFocusElem);

                if(!$L(tempFocusElem).attr('cxAriaSmartFilterInputFocus')){
                    tempFocusElem.addEventListener('focusin', this.onFocus);
                    tempFocusElem.addEventListener('focusout', this.onFocusOut);
                    $L(tempFocusElem).attr('cxAriaSmartFilterInputFocus', true);
                }
            }
        }

        if(!$L(this.$node).attr('cxAriaSmartFilterInputKeydown')){
            this.listener = this.filterInputKeyEvent.bind(this);
            this.$node.addEventListener('keydown', this.listener);
            $L(this.$node).attr('cxAriaSmartFilterInputKeydown', true);
        }

        setTimeout(() => {
            actElem.focus();
        }, 250);
    },
    radioCheck: function(){
        var prevActBtn = document.activeElement;
        setTimeout(() => {
            var tempFocusElem = document.activeElement;
            if(tempFocusElem.checked){
                prevActBtn.ariaChecked = false;
                tempFocusElem.ariaChecked = true;
            }else{
                tempFocusElem.ariaChecked = false;
            }
        }, 100);
    },
    addLabel: function(labelElem){
        var textContent;
        var eleCgn = labelElem;
        if(!labelElem.ariaLabel && labelElem.tabIndex != -1){
            var compContainer = eleCgn;
            var index = -1;
            var labelIndex = -1;
            if(compContainer.closest('.paddingElm')){
                compContainer = compContainer.closest('.paddingElm');
                var compContainerChild = compContainer.children;
                if(compContainer.querySelector('.cxAriaPrefixLabel')){
                    compContainerChild = compContainer.querySelectorAll('.cxAriaPrefixLabel, [tabIndex], [type=radio]');
                }
                for(var i=0;i<compContainerChild.length;i++){
                    if(compContainerChild[i].className.includes('cxAriaPrefixLabel')){
                        if((i<compContainerChild.length-1 && (compContainerChild[i+1] == labelElem)) || (i>1 && (compContainerChild[i-1] == labelElem))){
                            index = i;
                            if(i>1 && (compContainerChild[i-1] == labelElem)){
                                labelIndex = i-1;
                            }else if(i<compContainerChild.length-1 && (compContainerChild[i+1] == labelElem)){
                                labelIndex = i+1;
                            }
                            compContainer = compContainer.querySelector('.cxAriaPrefixLabel').textContent;
                            break;
                        }
                    }
                }
            }
            if(eleCgn.type == 'checkbox'){
                eleCgn = eleCgn.parentElement;
            }
            if(document.querySelector('.cxMXNFld .cxAriaActive') || eleCgn.className.includes('cxMXNFld')){
                if(document.querySelector('.cxMXNFld .cxAriaActive')){
                    var actElem = document.querySelector('.cxMXNFld .cxAriaActive');
                    while(!actElem.className.includes('cxMXNFld')){
                        actElem = actElem.parentElement;
                    }
                    eleCgn = actElem
                }
                eleCgn.ariaDescription = _cruxUtils.getI18n("crm.chosen.minimum.input.text", '2');
                textContent = _cruxUtils.getI18n("crm.chosen.minimum.input.text", '2');
                eleCgn.querySelector('input').ariaLabel = _cruxUtils.getI18n("crm.chosen.minimum.input.text", '2');
            }else if(eleCgn.tagName == 'INPUT'){
                if(eleCgn.value){
                    textContent = eleCgn.value;
                }else if(eleCgn.placeholder){
                    textContent = eleCgn.placeholder;
                }else{
                    textContent = '-';
                }
            }else if(eleCgn.childNodes.length>0){
                if(eleCgn.querySelector('span')){
                    textContent = eleCgn.querySelector('span').textContent;
                }else if(eleCgn.querySelector('#inputId') || eleCgn.querySelector('.cxMXNFld input')){
                    var tempElem;
                    if(eleCgn.querySelector('#inputId')){
                        tempElem = eleCgn.querySelector('#inputId');
                    }else if(eleCgn.querySelector('.cxMXNFld input')){
                        tempElem = eleCgn.querySelector('.cxMXNFld input');
                    }
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
                if(index != -1 && labelIndex != -1){
                    if(index>labelIndex && index-labelIndex==1){
                        textContent = textContent+' '+compContainer;
                    }else if(index<labelIndex && labelIndex-index==1){
                        textContent = compContainer+' '+textContent;
                    }
                }
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
cxAriaSmartFilterInputFocus - focusin and focusout eventlistener added for all focusable elements 
cxAriaSmartFilterInputKeydown - keyEvent eventlistener added for smart filter input
*/