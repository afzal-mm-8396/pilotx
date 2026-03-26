Lyte.Mixin.register("crux-aria-lookup-mixin", {//No I18n
    onFocus : function(){
        var documentActiveElement = document.activeElement;
        var thisNode = this;
        if(thisNode.$node){
            thisNode = thisNode.$node;
        }
        var ariaActiveElem = thisNode.querySelector('.cxAriaActive');

        /* remove cxAriaActive class from old aria active element */
        if(ariaActiveElem){
            $L('.cxAriaActive', thisNode).removeClass('cxAriaActive');
        }

        /* add cxAriaActive class for new aria active element */
        if(documentActiveElement && !($L(documentActiveElement).hasClass('cxAriaActive'))){
            $L(documentActiveElement).addClass('cxAriaActive');
        }
    },
    onFocusOut : function(){
        var thisNode = this;
        if(thisNode.$node){
            thisNode = thisNode.$node;
        }
        var ariaActiveElem = $L(thisNode.querySelector('.cxAriaActive'));
        if(ariaActiveElem[0]){
            /* remove cxPrevAriaActive class from old previous aria active element */
            if(thisNode.querySelector('.cxPrevAriaActive')){
                $L('.cxPrevAriaActive', thisNode).removeClass('cxPrevAriaActive');
            }
            if(!(ariaActiveElem.hasClass('cxPrevAriaActive'))){
                ariaActiveElem.addClass('cxPrevAriaActive');
            }
            ariaActiveElem.removeClass('cxAriaActive');
        }
    },
    keyEventOnShow : function(event){
        console.log('my snippet registered and runnning...');
        var activeComponent = this.$node;
        var isAria = activeComponent.cxProp('aria');
        if(isAria){
            var showComp = false;
            if(this.data.show){
                showComp = this.data.show;
            }else if(this.data.cxPropShow){
                showComp = this.data.cxPropShow;
            }
            if(showComp){
                var activeElement = document.activeElement;
                if(event && event.target && (event.type === 'click' || event.type === 'keydown')){
                    activeElement = event.target;
                }
                if(!(activeElement.tagName === 'BODY' || activeElement.querySelector('.cxSetRefocus')) && !activeElement.classList.contains('cxSetRefocus') && activeElement.attributes){
                    var isRefocusElem = true;
                    while(!(activeElement.attributes.click || activeElement.attributes.onclick)){
                        activeElement = activeElement.parentElement;
                        if(activeElement.tagName === 'BODY'){
                            isRefocusElem = false;
                            break;
                        }
                    }
                    if(isRefocusElem){
                        $L(activeElement).addClass('cxSetRefocus');
                        if(activeElement.tabIndex === -1){
                            activeElement.tabIndex = 0;
                        }
                    }
                }
                setTimeout(() => {
                    var tempCompModal = activeComponent;
                    if(tempCompModal.querySelector('lyte-modal')){
                        tempCompModal = tempCompModal.querySelector('lyte-modal');
                    }
                    while(tempCompModal.tagName !== 'CRUX-LOOKUP-FILTER-VIEW' && tempCompModal.tagName !== 'LYTE-MODAL'){
                        tempCompModal = tempCompModal._callee;
                    }
                    if(tempCompModal && tempCompModal.component && (tempCompModal.component.childComp || tempCompModal.tagName === 'CRUX-LOOKUP-FILTER-VIEW')){
                        var activeCompModal = tempCompModal.component.childComp?tempCompModal.component.childComp:tempCompModal;
                        if(activeCompModal.querySelector('lyte-table, lyte-expresstable, table') && Lyte.registeredMixins['crux-aria-table-mixin'] && Lyte.registeredMixins['crux-aria-table-mixin'].bindEventForAria && activeCompModal.cxProp('aria')){
                            activeCompModal.bindAria = Lyte.registeredMixins['crux-aria-table-mixin'].bindEventForAria.bind(activeCompModal);
                            activeCompModal.bindAria();
                        }
                        // if(activeCompModal.querySelector('crux-table-component') && !activeCompModal.querySelector('crux-table-component').attributes.selectable){
                        // 	$L(activeCompModal.querySelector('crux-table-component')).attr('selectable', true);
                        // }
                        var focusableElements = activeCompModal.querySelectorAll('[tabindex]:not(crux-table-component [tabindex]), [click]');
                        var mixinFuncCall = Lyte.registeredMixins['crux-aria-lookup-mixin'];
                        focusableElements.forEach(element => {
                            if(element.attributes.tabindex!==''){
                                if((element.attributes.click || element.attributes.onclick) && element.className.includes('advanceFilter')){
                                    element.setAttribute('lt-prop-aria-keydown', true);
                                    element.setAttribute('role', 'button');
                                    mixinFuncCall.addLabel.call(activeCompModal, element);
                                }else if(!(element.attributes.click || element.attributes.onclick)){
                                    mixinFuncCall.addLabel.call(activeCompModal, element);
                                }
                            }
                        });
                    }
                }, 100);
            }else{
                setTimeout(() => {
                    if(document.querySelector('.cxSetRefocus')){
                        var refocusComp = document.querySelector('.cxSetRefocus');
                        if(refocusComp.tabIndex === -1){
                            refocusComp.tabIndex = 0;
                        }
                        refocusComp.focus();
                        $L('.cxSetRefocus').removeClass('cxSetRefocus');
                    }
                }, 150);
            }
        }
    }.observes('cxPropShow','show', 'cxPropAria'),
    setLabelForModal : function(){
        var compNode = this.$node;
        if(compNode.cxProp('aria') && (compNode.tagName === 'CRUX-LOOKUP-FILTER-VIEW' || compNode.tagName === 'CRUX-LOOKUP-MODAL')){
            setTimeout(() => {
                var comp = this.$node;
                var tempComp = comp;
                while(comp.parentElement.tagName !== 'BODY'){
                    comp = comp.parentElement;
                    if(comp.component && comp.component.parent){
                        break;
                    }else if(comp.parentElement.tagName === 'BODY'){
                        comp = tempComp;
                        break;
                    }
                }
                var focusableElements = comp.querySelectorAll('[tabindex]:not(crux-table-component [tabindex]), [click]');
                var mixinFuncCall = Lyte.registeredMixins['crux-aria-lookup-mixin'];
                focusableElements.forEach(element => {
                    if(element.attributes.tabindex!=''){
                        if((element.attributes.click || element.attributes.onclick) && element.className.includes('advanceFilter')){
                            element.setAttribute('lt-prop-aria-keydown', true);
                            element.setAttribute('role', 'button');
                            element.setAttribute('label', 'Filter');
                            mixinFuncCall.addLabel.call(comp, element);
                        }else if(!(element.attributes.click || element.attributes.onclick)){
                            mixinFuncCall.addLabel.call(comp, element);
                        }
                    }
                });
            }, 500);
        }
    }.on('didConnect'),
    addLabel : function(labelElem){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-lookup-mixin'];
        // labelElem.tabIndex = 0;
        if(!labelElem.ariaLabel && labelElem.tabIndex !== -1){
            var elemLabel = '';
            var lyteLabelText = labelElem.querySelector('#labelText');
            if(labelElem.attributes.label){
                elemLabel = labelElem.attributes.label.nodeValue;
                labelElem.ariaLabel = elemLabel;
                $L(labelElem).removeAttr('label');
            }else if(lyteLabelText && lyteLabelText.textContent && lyteLabelText.textContent.trim() !== ''){
                elemLabel += lyteLabelText.textContent.trim();
            }else if(labelElem.textContent && labelElem.textContent.trim() !== ''){
                elemLabel += labelElem.textContent.trim();
            }else{
                elemLabel += 'icon';
            }
            if(labelElem._callee && labelElem._callee.tagName === 'LYTE-INPUT' && labelElem._callee.ltProp('type') === 'search'){
                labelElem.ariaPlaceholder = labelElem.placeholder;
                labelElem.ariaValueMax = labelElem.maxLength;
            }
            if((!labelElem.querySelector('[tabIndex = "0"]')) && labelElem.textContent.trim().length>0){
                // labelElem.tabIndex = 0;
                var closeestLyteElem = labelElem.closest('[lyte-rendered]');
                if(closeestLyteElem.tagName.includes('LYTE')){
                    closeestLyteElem.ltProp('aria', true);
                    var lyteElem = closeestLyteElem.tagName;
                    switch (lyteElem) {
                        case 'LYTE-DROPDOWN':
                            closeestLyteElem.ltProp('ariaButton', {'aria-label':elemLabel});
                            break;
                        case 'LYTE-CHECKBOX':
                            closeestLyteElem.ltProp('ariaCheckbox', {'aria-label':elemLabel});
                            break;
                        case 'LYTE-RADIOBUTTON':
                            closeestLyteElem.ltProp('ariaRadio', {'aria-label':elemLabel});
                            break;
                        default:
                            closeestLyteElem.ltProp('ariaAttributes', {'aria-label':elemLabel});
                            break;
                    }
                }else{
                    labelElem.ariaLabel = elemLabel;
                }
            }
            if(labelElem.querySelectorAll('[focusable]').length<1){
                $L(labelElem).attr('focusable', 'true');
            }
            if(mixinFuncCall.onFocus){
                labelElem.addEventListener('focusin', mixinFuncCall.onFocus.bind(this));
                labelElem.addEventListener('focusout', mixinFuncCall.onFocusOut.bind(this));
            }
        }
    }
});