Lyte.Mixin.register("crux-aria-column-list-mixin", {
    /* for read empty result on search */
    addLiveForEmpty : function(){
        var currComp = this;
        setTimeout(() => {
            var noResComp;
            if(currComp.cxProp('noContentClass')){
                noResComp = currComp.querySelector('.'+currComp.cxProp('noContentClass'));
            }
            if(noResComp){
                if($L(noResComp).css('display') !== 'none'){
                    noResComp.ariaLive = 'polite';
                }else if(noResComp.ariaLive){
                    noResComp.removeAttribute('aria-live');
                }
            }
        }, 500);
    },
    keyEvent: function(){
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-column-list-mixin'];
        var activeOptionClass = this.data.cxPropAccessibilityClass;
        var focusableElements = this.$node.querySelectorAll('lyte-menu-item:not(.lyteSearchHidden)');
        var keyEve = event.key;
        var ariaActiveElem = this.$node.querySelector('.'+activeOptionClass);
        var focusableElementsLength = focusableElements.length;
        for(var index=0;index<focusableElementsLength;index++){
            this.addLabel.call(this, focusableElements[index]);
        }
        if(!ariaActiveElem){
            if(event.key === 'ArrowUp'){
                $L(focusableElements[0]).addClass(activeOptionClass);
                ariaActiveElem = focusableElements[0];
            }else if(event.key === 'ArrowDown'){
                $L(focusableElements[focusableElements.length-1]).addClass(activeOptionClass);
                ariaActiveElem = focusableElements[focusableElements.length-1];
            }
        }
        
        if(ariaActiveElem){
            if(document.querySelector('#crurr_act_item')){
                $L('#crurr_act_item').removeAttr('id');
            }
            focusableElements = this.$node.querySelectorAll('lyte-menu-item:not(.lyteSearchHidden)');

            if(event.key.includes('Arrow') || event.key.includes('Page')){
                if(ariaActiveElem){
                    $L(ariaActiveElem).removeClass(activeOptionClass);
                }
                event.preventDefault();
                var i;
                var t;
                /* for drag and drop (changing the order) */
                if(event.metaKey && ariaActiveElem.className.includes('sortable-element')){
                    var menuItems = this.$node.querySelectorAll('lyte-menu-item[class *= sortable-element]');
                    var menuItem = menuItems;
                    var menuItemLength = menuItem.length;
                    for(i=0;i<menuItemLength;i++){
                        if(menuItem[i] === ariaActiveElem){
                            t = i;
                            var l = Lyte.arrayUtils(this.getData("items"), "removeAt", i, 1)[0];
                            if(event.key === 'ArrowUp'){
                                t = (t===0)?menuItem.length-1:t-1;
                            }else if(event.key === 'ArrowDown'){
                                t = (t===menuItem.length-1)?0:t+1;
                            }
                            Lyte.arrayUtils(this.getData('items'), "insertAt", t, l);
                            this.sortableMenu.call(this);
                            menuItem = this.$node.querySelectorAll('lyte-menu-item[class *= sortable-element]')[t];
                            // menuItem = menuItems[t];
                            // menuItem.tabIndex = 0;
                            $L(menuItem).addClass(activeOptionClass);
                        }
                    }
                }else if(event.key.includes('Page')){
                    if(event.key === 'PageUp'){
                        $L(focusableElements[0]).addClass(activeOptionClass);
                    }else if(event.key === 'PageDown'){
                        $L(focusableElements[focusableElements.length-1]).addClass(activeOptionClass);
                    }
                }else{
                    var focusableElementsLen = focusableElements.length;
                    for(i=0;i<focusableElementsLen;i++){
                        if(focusableElements[i] === ariaActiveElem){
                            t = i;
                            if(event.key === 'ArrowUp'){
                                t = (t===0)?focusableElements.length-1:t-1;
                                while(focusableElements[t].className.includes('lyteSearchHidden')){
                                    t = (t===0)?focusableElements.length-1:t-1;
                                }
                            }else if(event.key === 'ArrowDown'){
                                t = (t===focusableElements.length-1)?0:t+1;
                                while(focusableElements[t].className.includes('lyteSearchHidden')){
                                    t = (t===focusableElements.length-1)?0:t+1;
                                }
                            }
                            $L(focusableElements[t]).addClass(activeOptionClass);
                        }
                    }
                }

                var compData = this;
				mixinFuncCall.scrollToActiveElem.call(this, compData, activeOptionClass, keyEve);
            }else if(event.key === 'Enter'){
                event.preventDefault();
                if(ariaActiveElem){
                    var isCheckboxPresent = ariaActiveElem.querySelector('lyte-checkbox');
                    if(isCheckboxPresent){
                        isCheckboxPresent.click();
                    }
                }
                var actMenu = ariaActiveElem;
                while(actMenu.tagName!=='LYTE-MENU-ITEM'){
                    actMenu = actMenu.parentElement;
                }
                if(ariaActiveElem){
                    $L(ariaActiveElem).removeClass(activeOptionClass);
                }
                setTimeout(() => {
                    $L(actMenu).addClass(activeOptionClass);
                }, 100);
            }else if(event.key!=='Meta'){
                if(ariaActiveElem){
                    $L(ariaActiveElem).removeClass(activeOptionClass);
                }
                $L(focusableElements[0]).addClass(activeOptionClass);
            }
            ariaActiveElem.id = 'crurr_act_item';
            document.activeElement.setAttribute('aria-activedescendant', 'crurr_act_item');
        }
    },
    scrollToActiveElem : function(compData, activeOptionClass, keyEve){
        /* For scroll calculation */
        /* active menu item */
        var mixinFuncCall = Lyte.registeredMixins['crux-aria-column-list-mixin'];
        var activeComp = compData.$node.querySelector('.'+activeOptionClass);

        /* div contains all visible menu items */
        if(!compData.scrollableParent || compData.scrollableParent === undefined){
            compData.scrollableParent = $L(activeComp).cxGetScrollParent();
        }
        var scrollComp = compData.scrollableParent;

        var limit = activeComp.offsetHeight+activeComp.offsetTop;
        var dwnLimit = scrollComp.offsetHeight+scrollComp.offsetTop+scrollComp.scrollTop;
        if(activeComp !== document.activeElement){
            if((keyEve === 'ArrowUp' || keyEve === 'PageUp') && (limit>dwnLimit || activeComp.offsetTop<scrollComp.scrollTop || Math.abs(scrollComp.scrollTop-activeComp.offsetTop)<scrollComp.offsetTop)){
                $L(scrollComp).css('overflow', 'hidden');
                if(activeComp.offsetTop>scrollComp.scrollTop && limit>dwnLimit){
                    $L(scrollComp , compData.$node).scrollTo({top : scrollComp.scrollTop+(limit-dwnLimit)}, {onAfter : function() {
                        mixinFuncCall.onAfterScroll.call(this, scrollComp);
                    }});
                }else{
                    $L(scrollComp , compData.$node).scrollTo($L('.'+activeOptionClass), {onAfter : function() {
                        mixinFuncCall.onAfterScroll.call(this, scrollComp);
                    }});
                }
            }else if((keyEve === 'ArrowDown' || keyEve === 'PageDown') && (limit>dwnLimit || activeComp.offsetTop<scrollComp.scrollTop || Math.abs(scrollComp.scrollTop-activeComp.offsetTop)<scrollComp.offsetTop)){
                $L(scrollComp).css('overflow', 'hidden');
                if(limit<dwnLimit && activeComp.offsetTop<scrollComp.scrollTop){
                    var itemIndex;
                    if($L('.cxAriaActive')[0] && $L('.cxAriaActive')[0]._cx && $L('.cxAriaActive')[0]._cx.itemIndex){
                        itemIndex = $L('.cxAriaActive')[0]._cx.itemIndex;
                    }else{
                        itemIndex = $L('lyte-menu-item', compData.$node).indexOf(compData.$node.querySelector('.cxAriaActive'));
                    }
                    $L(scrollComp , compData.$node).scrollTo({top : (itemIndex) * activeComp.offsetHeight}, {onAfter : function() {
                        mixinFuncCall.onAfterScroll.call(this, scrollComp);
                    }});
                }else{
                    $L(scrollComp , compData.$node).scrollTo({top : scrollComp.scrollTop+(limit-dwnLimit)}, {onAfter : function() {
                        mixinFuncCall.onAfterScroll.call(this, scrollComp);
                    }});
                }
            }
        }
    },
	onAfterScroll : function(scrollComp){
		$L(scrollComp).css('overflow', 'auto');
	},
	bindEventForAriaColumnList: function(){
        console.log('column-list-mixin...');
        if(this.$node.cxProp('aria')){
            var mixinFuncCall = Lyte.registeredMixins['crux-aria-column-list-mixin'];
            var activeOptionClass = this.data.cxPropAccessibilityClass;
            var focusableElements = this.$node.querySelectorAll('lyte-menu-item, #inputId');
            for(var i=0;i<focusableElements.length;i++){
                var inputComp = focusableElements[i];
                this.addLabel.call(this, focusableElements[i]);
                if(focusableElements[i].id === 'inputId'){
                    /* addLiveForEmpty event listener for read no result found while no data for a search */
                    if(!$L(focusableElements[i]).attr('cxAriaColListInputFocus')){
                        var currComp = this;
                        if(this.$node){
                            currComp = this.$node;
                        }
                        var searchLis = mixinFuncCall.addLiveForEmpty.bind(currComp);
                        focusableElements[i].addEventListener('input', searchLis);
                        $L(focusableElements[i]).attr('cxAriaColListInputFocus', true);
                    }
                    focusableElements[i].addEventListener('focusout', () => {
                        $L('.'+activeOptionClass, this.$node).removeClass(activeOptionClass);
                    });
                }
            }

            /* keyEvent listener for keyboard support */
            if(!$L(this.$node).attr('cxAriaColListKeydown')){
                this.listener = this.keyEvent.bind(this);
                this.$node.addEventListener('keydown', this.listener);
                $L(this.$node).attr('cxAriaColListKeydown', true);
            }
        }
    },
    /* Add Label for Elements */
    addLabel: function(labelElem){
        var textContent;
        var eleCgn = labelElem;
        if(!eleCgn.ariaLabel){
            if(eleCgn.className.includes('cxColListMandatoryItem')){
                eleCgn.ariaRequired = true;
            }
            if(eleCgn.tagName === 'LYTE-MENU-ITEM'){
                /* get label from lyte-label */
                var lyteLabel = eleCgn.querySelector('lyte-label');
                if(lyteLabel){
                    textContent = lyteLabel.textContent.trim();
                }
                var checkbox = eleCgn.querySelector('[type = checkbox]');
                if(checkbox){
                    eleCgn = checkbox;
                }
            }
            /* set aria-label for checkbox in aria-checkbox */
            if(eleCgn.type === 'checkbox'){
                eleCgn = eleCgn.closest('[lyte-rendered]');
            }
            if(eleCgn.tagName === 'LYTE-CHECKBOX' && textContent){
                eleCgn.ltProp('ariaCheckbox', {'aria-label' : textContent});
            }
            /* placeholder and max length for search box */
            if(eleCgn.tagName.includes('INPUT')){
                if(eleCgn.placeholder){
                    eleCgn.ariaPlaceholder = eleCgn.placeholder;
                }
                if(eleCgn.maxLength){
                    eleCgn.ariaValueMax = eleCgn.maxLength;
                }
            }
        }
    }
});
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
Lyte.Mixin.register("crux-aria-mixin", {
		/* set aria attributes for view case */
	ariaSetForView : function(){
		if(this.data.cxPropFrom === 'view'){
			var focusableElement = this.$node.firstElementChild;
			this.observeTabindexMixin();
			if(focusableElement && focusableElement.firstElementChild){
				focusableElement = focusableElement.firstElementChild;
			}
			if(focusableElement && focusableElement.tabIndex !== this.data.cxPropTabindex){
				focusableElement.tabIndex = this.data.cxPropTabindex;
			}
			_lyteUiUtils.setAttribute(focusableElement, this.data.cxPropAriaAttributes || {}, {});
		}
	},
	/* set aria attributes for components */
	ariaGetMergedAttributes: function() {
		/* contains all aria props */
		var ariaAttributes = {
			cxAriaAttributes: {},
			cxAriaCheckbox: {},
			cxAriaRadio: {},
			cxTimeAriaAttributes: {},
			cxAriaDropdownAttributes: {},
			cxAriaButton: {},
			cxAriaBody: {},
			cxAriaBox: {},
			cxAriaErrorProperties: {},
			cxAriaFilterDropdownAttributes: {},
			cxAriaMenu: {},
			cxAriaModal: {},
			cxAriaSlider: {},
			cxAriaSearch: {},
			cxAriaPopover: {},
			cxAriaNoteHeading: {},
			cxAriaImageDiv: {},
			cxAriaImagePreview: {},
			cxAriaImageUpload: {},
			cxAriaUploadButton: {},
			cxAriaMessageBox: {},
			cxAriaDownloadIcon: {},
			cxAriaRemoveIcon: {},
			cxAriaUploadIcon: {},
			cxAriaRightIcon: {},
			cxAriaCallIcon: {},
			cxAriaEditIcon: {},
			cxAriaCloseIcon: {}
		};

		/* contains exposed aria props */
		var constAriaKeys = [
			'cxPropAriaCheckbox',
			'cxPropAriaRadio',
			'cxPropTimeAriaAttributes',
			'cxPropAriaButton',
			'cxPropAriaBox',
			'cxPropAriaBody',
			'cxPropAriaErrorProperties'
		];

		/* merge values in exposed Props(constAriaKeys) to all Props(ariaAttributes) */
		constAriaKeys.forEach(attrKey => {
			const value = this.data[attrKey];
			if (value && Object.keys(value).length > 0) {
				const targetKey = attrKey.replace('cxProp', 'cx'); // converts cxPropAriaCheckbox -> cxAriaCheckbox
				ariaAttributes[targetKey] = value;
			}
		});

		/* sets ariaAttribute to all props(ariaAttributes) */
		var tempAriaAttr = this.data.cxPropAriaAttributes;
		if (tempAriaAttr && Object.keys(tempAriaAttr).length !== 0) {
			var hasMatchingKeys = Object.keys(tempAriaAttr).some(key => key in ariaAttributes);
			if (hasMatchingKeys) {
				Object.assign(ariaAttributes, tempAriaAttr);
			} else {
				ariaAttributes.cxAriaAttributes = tempAriaAttr;
			}
		}
	
		var mergedAttrs = this.checkDuplicate(ariaAttributes, this.data.ariaAttributes);
		return this.ariaSetLabelForIcon(mergedAttrs);
	},
	/* check if the aria attributes already having value */
	checkDuplicate : function (ariaAttr, defaultAriaAttr) {
		for (const key in defaultAriaAttr) {
			// Check if the key exists in ariaAttr
			if (ariaAttr.hasOwnProperty(key)) {
				// If both values are objects, do a recursive check
				if (typeof ariaAttr[key] === 'object' && typeof defaultAriaAttr[key] === 'object' && !Array.isArray(ariaAttr[key]) && !Array.isArray(defaultAriaAttr[key])) {
					// Recursively check nested objects
					this.checkDuplicate(ariaAttr[key], defaultAriaAttr[key]);
				} else if (ariaAttr[key] === defaultAriaAttr[key]) {
					// If the value matches, update ariaAttr with defaultAriaAttr's value
					ariaAttr[key] = defaultAriaAttr[key];
				}
			}else{
				ariaAttr[key] = defaultAriaAttr[key];
			}
		}
		return ariaAttr;
	},
	/* sets default label for icons */
	ariaSetLabelForIcon : function(ariaAttributes){
		var defaultIconLabel = {
			cxAriaRemoveIcon : _cruxUtils.getI18n("crm.fileuploader.removefile"),
			cxAriaDownloadIcon : _cruxUtils.getI18n("crm.view.attachment.download"),
			cxAriaUploadIcon :  _cruxUtils.getI18n("crm.button.upload"),
			cxAriaRightIcon : 'Field Icon',
			cxAriaCallIcon : 'Call Icon',
			cxAriaEditIcon : 'Edit Icon',
			cxAriaCloseIcon : 'Close Icon',
			cxAriaLookupIcon : 'Lookup Icon'
		};
		for (const key in defaultIconLabel) {
			if (!ariaAttributes[key]) {
				ariaAttributes[key] = { 'aria-label' : defaultIconLabel[key] };
			}else if(ariaAttributes[key] && !(ariaAttributes[key]['aria-label'])){
				ariaAttributes[key]['aria-label'] = defaultIconLabel[key];
			}
		}
		return ariaAttributes;
	}
});


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

//# sourceMappingURL=crux-accessibility-mixin.js.map