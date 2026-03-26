Lyte.Mixin.register("crux-aria-dropdown-mixin", {
    /* for read empty result on search */
    addLiveForEmpty : function(){
        var dropdown = this;
        if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
            dropdown = dropdown.querySelector("lyte-dropdown");
        }
        setTimeout(() => {
            if(dropdown.component && dropdown.component.childComp && dropdown.component.childComp.querySelector('.noUsersFoundDiv, .cxDropdownNoResult')){
                var noResComp = dropdown.component.childComp.querySelector('.noUsersFoundDiv, .cxDropdownNoResult');
                if($L(noResComp).css('display') != 'none'){
                    noResComp.ariaLive = 'polite';
                }else if(noResComp.ariaLive){
                    noResComp.removeAttribute('aria-live');
                }
            }
        }, 500);
    },
    inputFocus: function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-dropdown-mixin'];
        var dropdown = this;
        /* get lyte-dropdown */
        while(!dropdown.tagName.includes('LYTE-DROPDOWN')){
            if(dropdown._callee){
                dropdown = dropdown._callee;
            }
            if(dropdown.tagName == 'BODY'){
                break;
            }
        }
        if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
            dropdown = this;
        }

        /* for aria live to read no result found */
        var searchInput = document.activeElement;
        if(!$L(searchInput).attr('cxAriaDropdownInputFocus')){
            var searchLis = mixinFuncCall.addLiveForEmpty.bind(dropdown);
            searchInput.addEventListener('input', searchLis);
            $L(searchInput).attr('cxAriaDropdownInputFocus', true)
        }
        if(document.querySelector('.cxAriaActive')){
            $L('.cxAriaActive').removeClass('cxAriaActive');
        }
        $L(document.activeElement).addClass('cxAriaActive');
        var searchContainer = '';
        if(dropdown.querySelector('lyte-search') || dropdown.querySelector('.userSearchBox')){
            searchContainer = dropdown.querySelector('lyte-search')?dropdown.querySelector('lyte-search'):dropdown.querySelector('.userSearchBox');
        }else if(dropdown.component.childComp && (dropdown.component.childComp.querySelector('lyte-search') || dropdown.component.childComp.querySelector('.userSearchBox'))){
            searchContainer = dropdown.component.childComp.querySelector('lyte-search')?dropdown.component.childComp.querySelector('lyte-search'):dropdown.component.childComp.querySelector('.userSearchBox');
        }
        var result = searchInput.value;
        if(searchContainer && result!=''){
            if(searchContainer.tagName == 'LYTE-SEARCH'){
                searchContainer.setValue(result.trim());//No I18n
            }else if(searchContainer.className.includes('userSearchBox')){
                searchContainer.ltProp('value', result.trim());
            }
        }

        /* for keyboard navigation for aria descendant */
        if(dropdown.tagName == 'LYTE-DROPDOWN'){
            var actElem = document.activeElement;
            var ariaActiveElem = '';
            if(dropdown.querySelector('.cxAriaActive')){
                ariaActiveElem = dropdown.querySelector('.cxAriaActive');
            }else if(dropdown.component.childComp && dropdown.component.childComp.querySelector('.cxAriaActive')){
                ariaActiveElem = dropdown.component.childComp.querySelector('.cxAriaActive');
            }
            if(ariaActiveElem != ''){
                actElem = '.cxAriaActive';
                dropdown.ltProp('activeElement', actElem);
            }
        }
    },
    onFocus : function(){
        var dropdown = this;
        if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
            dropdown = dropdown.querySelector("lyte-dropdown");
        }
        var actEle = document.activeElement;
        if(dropdown.querySelector('.cxAriaActive')){
            $L(dropdown.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
        }else if(dropdown.component.childComp && dropdown.component.childComp.querySelector('.cxAriaActive')){
            $L(dropdown.component.childComp.querySelector('.cxAriaActive')).removeClass('cxAriaActive');
        }
        if(actEle && !($L(actEle).hasClass('cxAriaActive'))){
            $L(actEle).addClass('cxAriaActive');
        }
        /* for keyboard navigation for aria descendant */
        if(dropdown.tagName == 'LYTE-DROPDOWN'){
            var actEle = document.activeElement;    //  eslint-disable-line no-redeclare
            var ariaActiveElem = '';
            if(dropdown.querySelector('.cxAriaActive')){
                ariaActiveElem = dropdown.querySelector('.cxAriaActive');
            }else if(dropdown.component.childComp && dropdown.component.childComp.querySelector('.cxAriaActive')){
                ariaActiveElem = dropdown.component.childComp.querySelector('.cxAriaActive');
            }
            if(ariaActiveElem != ''){
                actElem = '.cxAriaActive';
                dropdown.ltProp('activeElement', actElem);
            }
        }
    },
    onFocusOut : function(){
        var dropdown = this;
        if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
            dropdown = dropdown.querySelector("lyte-dropdown");
        }
        var actEle = document.querySelector('.cxAriaActive');
        if(actEle){
            if(dropdown.querySelector('.cxPrevAriaActive')){
                $L(dropdown.querySelector('.cxPrevAriaActive')).removeClass('cxPrevAriaActive');
            }else if(dropdown.component.childComp && dropdown.component.childComp.querySelector('.cxPrevAriaActive')){
                $L(dropdown.component.childComp.querySelector('.cxPrevAriaActive')).removeClass('cxPrevAriaActive');
            }
            $L(actEle).addClass('cxPrevAriaActive');
            $L(actEle).removeClass('cxAriaActive');
        }
    },
    keyEvent: function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-dropdown-mixin'];
        var dropdown = this;
        if(dropdown.tagName == 'LYTE-DROP-BOX'){
            dropdown = dropdown._callee;
            if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
                dropdown = dropdown.querySelector('lyte-dropdown');
            }
        }else{
            if(dropdown.$node){
                dropdown = dropdown.$node;
            }
            if(dropdown.tagName != 'LYTE-DROPDOWN' && dropdown.querySelector('lyte-dropdown')){
                dropdown = dropdown.querySelector("lyte-dropdown");
            }
        }

        var data = dropdown.querySelectorAll('li:not(.lyteMultiselectInput), input, lyte-dropdown lyte-dropdown .lyteDummyEventContainer');
        data = Array.from(data);
        if(dropdown.component && dropdown.component.childComp && dropdown.component.childComp.querySelector('li:not(.lyteMultiselectInput), lyte-input, input:not(lyte-input input)')){
            var lyteDropbox = dropdown.component.childComp;
            var dataChildComp = Array.from(lyteDropbox.querySelectorAll('li:not(.lyteMultiselectInput), input, lyte-dropdown .lyteDummyEventContainer'));
            data = data.concat(dataChildComp);
            /* add keydown event listener for dropbox */
            if(lyteDropbox.querySelector('lyte-input, lyte-dropdown') && !$L(lyteDropbox).attr('cxAriaDropdownKeydown')){
                lyteDropbox.listener = mixinFuncCall.keyEvent.bind(dropdown);
                lyteDropbox.addEventListener('keydown', lyteDropbox.listener);
                $L(lyteDropbox).attr('cxAriaDropdownKeydown', true);
            }
            if(lyteDropbox.querySelector('lyte-input')){
                var currComp = lyteDropbox.querySelector('lyte-input');
                if(currComp.tagName == 'LYTE-INPUT' && !$L(currComp).attr('cxAriaDropdownInputFocus')){
                    currComp.addEventListener('focusin', mixinFuncCall.inputFocus.bind(dropdown));
                    $L(currComp).attr('cxAriaDropdownInputFocus', true);
                }
            }
        }else{
            /* add keydown event listener for dropbox */
            setTimeout(() => {
                if(dropdown.component && dropdown.component.childComp && dropdown.component.childComp.querySelector('li:not(.lyteMultiselectInput), lyte-input, input:not(lyte-input input)')){
                    var lyteDropbox = dropdown.component.childComp;
                    if(lyteDropbox.querySelector('lyte-input, lyte-dropdown') && !$L(lyteDropbox).attr('cxAriaDropdownKeydown')){
                        lyteDropbox.listener = mixinFuncCall.keyEvent.bind(lyteDropbox);
                        lyteDropbox.addEventListener('keydown', lyteDropbox.listener);
                        $L(lyteDropbox).attr('cxAriaDropdownKeydown', true);
                    }
                    if(lyteDropbox.querySelector('lyte-input')){
                        var currComp = lyteDropbox.querySelector('lyte-input');
                        if(currComp.tagName == 'LYTE-INPUT' && !$L(currComp).attr('cxAriaDropdownInputFocus')){
                            currComp.addEventListener('focusin', mixinFuncCall.inputFocus.bind(dropdown));
                            $L(currComp).attr('cxAriaDropdownInputFocus', true);
                        }
                    }
                }
            }, 100);
        }

        if(dropdown.querySelector('lyte-input') && !(dropdown.component.childComp && dropdown.component.childComp.querySelector('lyte-input'))){
            var currComp = dropdown.querySelector('lyte-input');    //  eslint-disable-line no-redeclare
            if(currComp.tagName == 'LYTE-INPUT' && !$L(currComp).attr('cxAriaDropdownInputFocus')){
                currComp.addEventListener('focusin', mixinFuncCall.inputFocus.bind(dropdown));
                $L(currComp).attr('cxAriaDropdownInputFocus', true);
            }
        }

        var ariaActiveElemIndex = -1;
        var ariaActiveElem = '';
        for(var i=0;i<data.length;i++){
            var currComp = data[i];    //  eslint-disable-line no-redeclare
            if((currComp.tabIndex != 0 || !currComp.ariaLabel)){
                mixinFuncCall.addLabel.call(dropdown, currComp);
            }
            if(!$L(currComp).attr('cxAriaDropdownFocus')){
                currComp.addEventListener('focusin', mixinFuncCall.onFocus.bind(dropdown));
                currComp.addEventListener('focusout', mixinFuncCall.onFocusOut.bind(dropdown));
                $L(currComp).attr('cxAriaDropdownFocus', true);
            }
            if(currComp.className.includes('cxAriaActive') && data.includes(currComp)){
                ariaActiveElemIndex = i;
                ariaActiveElem = currComp;
            }
        }

        var activeEle = document.activeElement;
        var temp = true;

        if((activeEle.tagName == 'INPUT') && (event.key == 'ArrowLeft' || event.key == 'ArrowRight')){
            temp = false
            var eleLength = activeEle.value.length;
            var curPos = event.target.selectionStart;
            if((eleLength==curPos && event.key == 'ArrowRight') || (curPos==0 && event.key == 'ArrowLeft')){
                temp = true;
            }
        }

        if(temp && ariaActiveElem!='' && ariaActiveElemIndex!=-1){
            if(event.key.includes('Arrow')){
                var t = ariaActiveElemIndex;
                var len = data.length;
                if(event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
                    if(data[t].classList.contains('lyteDummyEventContainer') && data[t].parentElement.ltProp('isOpen')){
                        data[t].parentElement.close();
                    }
                    do{
                        if(event.key == 'ArrowLeft'){
                            t = (t == 0)?len-1:t-1;
                        }else if(event.key == 'ArrowRight'){
                            t = (t == len-1)?0:t+1;
                        }
                    }while($L(data[t]).css('display') == 'none')
                    if(data[t].classList.contains('lyteDummyEventContainer') && data[t].parentElement.ltProp('isOpen')){
                        data[t].parentElement.close();
                    }
                    data[t].focus();
                }
            }else if(event.key == 'Backspace' || event.key == 'Delete'){
                if(document.activeElement == ariaActiveElem){
                    if(document.activeElement.tagName == 'INPUT' && document.activeElement.value.length==0){
                        var actElem = document.activeElement;
                        while(actElem.tagName != 'LYTE-DROP-BUTTON'){
                            if(actElem.previousElementSibling){
                                if(actElem.previousElementSibling.tagName == 'LI'){
                                    break;
                                }
                            }
                            actElem = actElem.parentElement;
                        }
                        if(actElem.tagName != 'LYTE-DROP-BUTTON' && (!actElem.previousElementSibling.querySelector('input'))){
                            actElem.previousElementSibling.focus();
                        }
                        if(!document.activeElement.className.includes('cxAriaActive')){
                            $L(document.activeElement).addClass('cxAriaActive');
                        }
                    }
                    if(dropdown.querySelector('.cxAriaActive') && dropdown.querySelector('.cxAriaActive').children.length>0){
                        dropdown.querySelector('.cxAriaActive').children[1].focus();
                        dropdown.querySelector('.cxAriaActive').children[1].click();
                    }
                }
                if(ariaActiveElem.tagName != 'INPUT' && ariaActiveElem.tagName != 'LYTE-INPUT'){
                    if(dropdown.component.childComp && dropdown.component.childComp.querySelector('lyte-input')){
                        var dropBox = dropdown.component.childComp;
                        dropBox.querySelector('lyte-input').focus();
                    }else if(dropdown.querySelector('lyte-input')){
                        dropdown.querySelector('lyte-input').focus();
                    }
                    event.preventDefault();
                }
                event.stopImmediatePropagation();
            }else if(event.key == 'Escape'){
                var activeDropdown = dropdown;
                if(dropdown.component && dropdown.component.childComp && dropdown.component.childComp.querySelector('lyte-dropdown .cxAriaActive') && dropdown.component.childComp.querySelector('lyte-dropdown').ltProp('isOpen')){
                    activeDropdown = dropdown.component.childComp.querySelector('lyte-dropdown');
                }
                if(data.includes(document.activeElement) && (activeDropdown.querySelector('.cxAriaActive') || (activeDropdown.component && activeDropdown.component.childComp && activeDropdown.component.childComp.querySelector('.cxAriaActive'))) && activeDropdown.ltProp('isOpen')){
                    activeDropdown.close();
                    event.stopImmediatePropagation();
                }
                if(activeDropdown && activeDropdown.querySelector('[tabindex]') && !activeDropdown.querySelector('[tabindex]').className.includes('cxAriaActive')){
                    $L('.cxAriaActive').removeClass('cxAriaActive');
                    dropdown.querySelector('[tabindex]').focus();
                }
            }else if((event.key === ' ' || event.key === 'Enter') && (activeEle.className.includes('cxAriaActive') && ($L(activeEle).attr('click') || $L(activeEle).attr('onClick')))){
                activeEle.click();
            }
        }
    },
    bindEventForAria : function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-dropdown-mixin'];
        var bindedComp = this;
        if(bindedComp.$node){
            bindedComp = bindedComp.$node;
        }
        setTimeout(() => {
            var allDropdown = bindedComp.querySelectorAll('lyte-dropdown:not(lyte-dropdown lyte-dropdown)');
            if(bindedComp && bindedComp.cxProp('aria')){
                for(var i=0;i<allDropdown.length;i++){
                    var dropdown = allDropdown[i];
                    if(dropdown.ltProp('type') == 'multiple' || dropdown.ltProp('type')== 'multisearch'){
                        var lyteDropdown = dropdown;
                        var focusableComp = lyteDropdown.querySelectorAll('li:not(.lyteMultiselectInput), lyte-input, input, lyte-dropdown, lyte-dropdown lyte-dropdown .lyteDummyEventContainer');
                        focusableComp = Array.from(focusableComp);
                        if(lyteDropdown.component && lyteDropdown.component.childComp && lyteDropdown.component.childComp.querySelector('li:not(.lyteMultiselectInput), lyte-input, input, lyte-dropdown, lyte-dropdown lyte-dropdown .lyteDummyEventContainer')){
                            var lyteDropbox = lyteDropdown.component.childComp;
                            var focusableElementsChildComp = Array.from(lyteDropbox.querySelectorAll('li:not(.lyteMultiselectInput), lyte-input, input, lyte-dropdown, lyte-dropdown lyte-dropdown .lyteDummyEventContainer'));
                            focusableComp = focusableComp.concat(focusableElementsChildComp);
                            if(lyteDropbox.tagName == 'LYTE-DROPDOWN' && !$L(lyteDropbox).attr('cxAriaDropdownKeydown')){
                                lyteDropbox.listener = mixinFuncCall.keyEvent.bind(lyteDropdown);
                                lyteDropbox.addEventListener('keydown', lyteDropbox.listener);
                                $L(lyteDropbox).attr('cxAriaDropdownKeydown', true);
                            }
                        }
                        for(var i=0;i<focusableComp.length;i++){    //  eslint-disable-line no-redeclare
                            var currComp = focusableComp[i];
                            if((currComp.tabIndex != 0 || !currComp.ariaLabel) && (currComp.tagName != 'LYTE-DROPDOWN' && currComp.tagName != 'LYTE-INPUT')){
                                mixinFuncCall.addLabel.call(lyteDropdown, currComp);
                            }
                            if(currComp.tagName == 'LYTE-INPUT' && !$L(currComp).attr('cxAriaDropdownInputFocus')){
                                currComp.addEventListener('focusin', mixinFuncCall.inputFocus.bind(dropdown));
                                $L(currComp).attr('cxAriaDropdownInputFocus', true);
                            }
                            if(!$L(currComp).attr('cxAriaDropdownFocus') && (currComp.tagName != 'LYTE-DROPDOWN' && currComp.tagName != 'LYTE-INPUT')){
                                currComp.addEventListener('focusin', mixinFuncCall.onFocus.bind(dropdown));
                                currComp.addEventListener('focusout', mixinFuncCall.onFocusOut.bind(dropdown));
                                $L(currComp).attr('cxAriaDropdownFocus', true);
                            }
                        }
                        if(lyteDropdown.tagName == 'LYTE-DROPDOWN' && !$L(lyteDropdown).attr('cxAriaDropdownKeydown')){
                            lyteDropdown.listener = mixinFuncCall.keyEvent.bind(lyteDropdown);
                            lyteDropdown.addEventListener('keydown', lyteDropdown.listener);
                            // lyteDropdown.addEventListener('keyup', mixinFuncCall.keyUpEvent);
                            $L(lyteDropdown).attr('cxAriaDropdownKeydown', true);
                        }
                    }
                }
                if(bindedComp.tagName == 'CRUX-TAG-COMPONENT' && bindedComp.cxProp('from') == 'view'){
                    var focusableComp = bindedComp.querySelectorAll('li');    //  eslint-disable-line no-redeclare
                    for(var i=0;i<focusableComp.length;i++){    //  eslint-disable-line no-redeclare
                        var currComp = focusableComp[i];    //  eslint-disable-line no-redeclare
                        if(currComp.tabIndex != 0 || !currComp.ariaLabel){
                            mixinFuncCall.addLabel.call(bindedComp, currComp);
                        }
                        if(!$L(currComp).attr('cxAriaDropdownFocus')){
                            currComp.addEventListener('focusin', mixinFuncCall.onFocus.bind(bindedComp));
                            currComp.addEventListener('focusout', mixinFuncCall.onFocusOut.bind(bindedComp));
                            $L(currComp).attr('cxAriaDropdownFocus', true);
                        }
                    }
                    if(!$L(bindedComp).attr('cxAriaDropdownKeydown')){
                        bindedComp.listener = mixinFuncCall.keyEvent.bind(bindedComp);
                        bindedComp.addEventListener('keydown', bindedComp.listener);
                        // lyteDropdown.addEventListener('keyup', mixinFuncCall.keyUpEvent);
                        $L(bindedComp).attr('cxAriaDropdownKeydown', true);
                    }
                }
            }
        }, 100);
    },
    addLabel : function(labelElem){
        if(labelElem.tagName == 'LI'){
            labelElem.tabIndex = 0;
        }
        // var mixinFuncCall = Lyte.registeredMixins['crux-aria-table-mixin'];
        // var dropdown = this;
        if(!labelElem.ariaLabel && labelElem.tabIndex != -1){
            var textContent = '';
            var lyteSubComp = '';
            if(labelElem.tagName == 'INPUT' || labelElem.className.includes('lyteDummyEventContainer')){
                lyteSubComp = labelElem;
                while(!lyteSubComp.tagName.includes('LYTE')){
                    lyteSubComp = lyteSubComp.parentElement;
                    if(lyteSubComp.tagName == 'BODY'){
                        break;
                    }
                }
                if(!lyteSubComp.tagName.includes('LYTE')){
                    lyteSubComp = '';
                }
            }
            if(labelElem.tagName == 'INPUT'){
                if(labelElem.value){
                    textContent = labelElem.value.trim();
                }else{
                    textContent = 'none';
                }
                if(labelElem.placeholder){
                    labelElem.ariaPlaceholder = labelElem.placeholder;
                }
                if(labelElem.maxLength){
                    labelElem.ariaValueMax = labelElem.maxLength;
                }
            }else if(labelElem.textContent){
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
cxAriaDropdownInputFocus - search box focus event listener
cxAriaDropdownKeydown - keydown event listener added for dropdown
cxAriaDropboxKeydown - keydown event listener added for dropbox
cxAriaDropdownInputFocus - focusin event listener for input box in dropdown (function - inputFocus())
cxAriaDropboxInputFocus - focusin event listener for input box in dropbox (function - inputFocus())
cxAriaDropdownFocus - attribute - if focusin and focusout eventlistener added for all focusable elements
*/