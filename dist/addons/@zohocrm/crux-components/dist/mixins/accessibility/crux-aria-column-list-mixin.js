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