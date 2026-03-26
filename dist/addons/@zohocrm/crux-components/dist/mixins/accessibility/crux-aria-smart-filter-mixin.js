Lyte.Mixin.register("crux-aria-smart-filter-mixin", {
    /* ----- Focus in and Focus out ----- */
    onFocus: function(){
        var actEle = document.activeElement;
        if(actEle.id != 'lv_filter_scroll'){
            var ariaActiveElement = document.querySelector('.cxAriaActive');
            if(ariaActiveElement){
                $L(ariaActiveElement).removeClass('cxAriaActive');
            }else{
                $L(actEle).addClass('cxAriaActive');
            }
        }
        if(actEle.tagName.includes('ACCORDION-HEADER')){
            var targetElem = (actEle.parentElement.querySelector('#'+actEle.attributes['aria-controls'].nodeValue))?actEle.parentElement.querySelector('#'+actEle.attributes['aria-controls'].nodeValue):actEle.parentElement.querySelector('#'+actEle.id.replace('header', 'body'));
            if(actEle.tagName.includes('ACCORDION-HEADER') && targetElem.tagName.includes('ACCORDION-BODY') && targetElem.querySelector('.noresultstyle')){
                targetElem.querySelector('.noresultstyle').id = 'noResultOpt';
                $L(actEle).removeAttr('ariaLabel');
                $L(actEle).attr('aria-labelledby', actEle.id+' noResultOpt');
            }
        }
    },
    onFocusOut: function(){
        var ariaActiveElement = document.querySelector('.cxAriaActive');
        if(ariaActiveElement){
            $L(ariaActiveElement).removeClass('cxAriaActive');
        }
    },
    /* ---------------------------------- */
    filterKeyEvent: function(){

        if(!this.$node.querySelector('crux-smart-filter-input .cxAriaActive') || event.key.includes('Page')){
            var actElem = document.activeElement;
            var container = actElem.nextElementSibling.querySelectorAll('[tabIndex]:not(crux-smart-filter-input [tabIndex])');
            if(actElem.tagName === 'LYTE-ACCORDION-HEADER'){
                for(var j=0;j<container.length;j++){
                    if(actElem.ariaExpanded === 'false'){
                        $L(container[j]).removeAttr('aria-label');
                    }else if(actElem.ariaExpanded === 'true'){
                        this.addLabel.call(this, container[j]);
                    }
                }
            }

            var focusableElements = this.$node.querySelectorAll('.lyteAccordionActive [tabIndex][click]:not(crux-smart-filter-input [tabIndex][click]), [tabIndex][aria-label]:not(crux-smart-filter-input [tabIndex][aria-label]), .lyteAccordionActive crux-smart-filter-input:not(crux-smart-filter-input crux-smart-filter-input), #searchId #inputId');
            if(document.activeElement.className.includes('alertPopup') && event.key == ' '){
                var alertPopup = document.querySelector('.alertPopup button'); // eslint-disable-line @zoho/webperf/no-complex-selector
                alertPopup.focus();
            }else if((!document.querySelector('.lyteBodyWrapper'))){
                var t;
                if(event.key.includes('Page')){
                    if(event.key == 'PageUp'){
                        event.preventDefault();
                        t = 0;
                        if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                            focusableElements[t].previousElementSibling.focus();
                        }else{
                            focusableElements[t].focus();
                        }
                        if(document.activeElement!=focusableElements[0]){
                            while(document.activeElement == actElem){
                                t = (t==focusableElements.length-1)?-1:t;
                                t++;
                                if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                                    focusableElements[t].previousElementSibling.focus();
                                }else{
                                    focusableElements[t].focus();
                                }
                            }
                        }
                    }else if(event.key == 'PageDown'){
                        event.preventDefault();
                        t = focusableElements.length-1;
                        if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                            focusableElements[t].previousElementSibling.focus();
                        }else{
                            focusableElements[t].focus();
                        }
                        if(document.activeElement!=focusableElements[focusableElements.length-1]){
                            while(document.activeElement == actElem){
                                t = (t==0)?focusableElements.length:t;
                                t--;
                                if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                                    focusableElements[t].previousElementSibling.focus();
                                }else{
                                    focusableElements[t].focus();
                                }
                            }
                        }
                    }
                }else{
                    for(var i=0;i<focusableElements.length;i++){
                        if(actElem == focusableElements[i]){
                            if(event.key === 'ArrowUp' || event.key === 'ArrowDown' || (event.key === 'Tab' && actElem.ariaExpanded === 'false')){
                                event.preventDefault();
                                t = i;
                                if(event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)){
                                    t = (t == 0)?focusableElements.length-1:t-1;

                                    do{
                                        if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                                            focusableElements[t].querySelector('[tabIndex]').focus();
                                        }else{
                                            focusableElements[t].focus();
                                        }
                                        if(document.activeElement === actElem){
                                            t = (t==0)?focusableElements.length:t;
                                            t--;
                                        }
                                    }while(document.activeElement === actElem);
                                }else if(event.key === 'ArrowDown' || event.key === 'Tab'){
                                    t = (t == focusableElements.length-1)?0:t+1;

                                    do{
                                        if(focusableElements[t].tagName == 'CRUX-SMART-FILTER-INPUT'){
                                            focusableElements[t].querySelector('[tabIndex]').focus();
                                        }else{
                                            focusableElements[t].focus();
                                        }
                                        if(document.activeElement === actElem){
                                            t = (t==focusableElements.length-1)?-1:t;
                                            t++;
                                        }
                                    }while(document.activeElement === actElem);
                                    event.stopImmediatePropagation();
                                }
                            }else if(event.key == ' '){
                                this.checkbox.call(this);
                            }
                            break;
                        }
                    }
                    if(document.activeElement.type == 'radio'){
                        var actEle = document.activeElement;
                        while(actEle.tagName!='CRUX-SMART-FILTER-INPUT'){
                            actEle = actEle.parentElement;
                        }
                        actEle.querySelector('[class *= selectedRadioBtn]').focus();
                        event.stopImmediatePropagation();
                    }
                }
            }
        }
    },
    bindEventForAriaFilter: function(){
        console.log('Filter Bind...');
        if(this.$node.cxProp('aria')){
            /* get active element on document to refocus on the element */
            var actElem = document.activeElement;
            var bindedComp = this.$node;

            /* set aria properties for search box */
            if(bindedComp.cxProp('search')){
                var search = bindedComp.querySelector('#searchId').querySelector('[tabIndex]');
                if(search.value){
                    search.ariaLabel = search.value;
                }
                if(search.placeholder){
                    search.ariaPlaceholder = search.placeholder;
                }
                if(search.maxLength){
                    search.ariaValueMax = search.maxLength;
                }
                search.role = 'search';
            }

            var container;
            if(bindedComp.querySelector('lyte-accordion')){
                var header = bindedComp.querySelectorAll('lyte-accordion-header');
                var content = bindedComp.querySelectorAll('lyte-accordion-body');
                for(var i=0;i<header.length;i++){
                    header[i].ariaLabel = header[i].textContent;
                    container = content[i].querySelectorAll('[tabIndex]:not(crux-smart-filter-input [tabIndex])');
                    for(var j=0;j<container.length;j++){
                        this.addLabel.call(this, container[j]);
                    }
                }
            }else{
                container = bindedComp.querySelectorAll('[tabIndex]:not(crux-smart-filter-input [tabIndex])');
                var containerLength = container.length;
                for(var k=0;j<containerLength;k++){
                    this.addLabel.call(this, container[k]);
                }
            }

            /* Add focus event listener */
            var focusElements = bindedComp.querySelectorAll('[tabIndex][aria-label]:not(crux-smart-filter-input [tabIndex][aria-label])');
            var focusElementsLength = focusElements.length;
            for(var index=0;index<focusElementsLength;index++){
                if(focusElements[index].type === 'checkbox'){
                    this.checkboxLis = this.checkbox.bind(this);
                    focusElements[index].addEventListener('click', this.checkboxLis);
                }
                focusElements[index].addEventListener('focusin', this.onFocus);
                focusElements[index].addEventListener('focusout', this.onFocusOut);
            }

            this.listener = this.filterKeyEvent.bind(this);
            bindedComp.addEventListener('keydown', this.listener);

            var alertPopup = document.querySelector('.alertPopup');
            if(alertPopup){
                alertPopup.addEventListener('keydown', this.alertKeyDownEvent);
            }

            setTimeout(() => {
                actElem.focus();
            }, 100);
        }
    },
    alertKeyDownEvent : function(){
        if(document.activeElement.className.includes('alertPopup') && event.key == ' '){
            var alertPopup = document.querySelector('.alertPopup button'); // eslint-disable-line @zoho/webperf/no-complex-selector
            alertPopup.focus();
        }
    },
    checkbox: function(){
        setTimeout(() => {
            var alertPopup = document.querySelector('.alertPopup');
            if(alertPopup){
                alertPopup.addEventListener('keydown', this.alertKeyDownEvent);
                alertPopup.tabIndex = 0;
                alertPopup.ariaLabel = document.querySelector('.alertPopup .alertSecondaryMsg').textContent;
                alertPopup.focus();
            }
        }, 550);
    },
    /* Add Label for Elements */
    addLabel: function(labelElem){
        var textContent; 
        var eleCgn = labelElem;
        if(!labelElem.ariaLabel && labelElem.tabIndex != -1){
            if(eleCgn.type == 'checkbox'){
                eleCgn = eleCgn.parentElement;
            }
            if(eleCgn.tagName == 'INPUT'){
                if(eleCgn.value){
                    textContent = eleCgn.value;
                }
                if(eleCgn.placeholder){
                    labelElem.ariaPlaceholder = eleCgn.placeholder;
                }
            }else if(eleCgn.childNodes.length>0){
                var spanSelect = eleCgn.querySelector('span');
                var inputSelect = eleCgn.querySelector('#inputId');
                var mxnfldInputSelect = eleCgn.querySelector('.cxMXNFld input'); // eslint-disable-line @zoho/webperf/no-complex-selector
                if(spanSelect){
                    textContent = spanSelect.textContent;
                }else if(inputSelect || mxnfldInputSelect){
                    var tempElem = inputSelect ? inputSelect : mxnfldInputSelect;
                    if(tempElem.value){
                        textContent = tempElem.value;
                    }
                    if(tempElem.parentElement.className.includes('search')){
                        if(tempElem.placeholder){
                            labelElem.ariaPlaceholder = tempElem.placeholder;
                        }
                        if(tempElem.maxLength){
                            labelElem.ariaValuemax = tempElem.maxLength;
                        }
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
