/**
 * @component crux-dropdown
 * @author gowtham
 * @version 1.0.0
 * @summary This component provides additional functionality on top of lyte dropdown and developed focusing on performance.
 */
Lyte.Component.register("crux-dropdown", {
_template:"<template tag-name=\"crux-dropdown\" onclick=\"{{action('renderDropDown',event)}}\"> <template is=\"if\" value=\"{{showFieldsDropdown}}\"><template case=\"true\"> <lyte-dropdown id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" class=\"cxBoxDropdown {{cxPropClass}} {{if(cxPropIsDropdownIconNode,'cxDropdownIconNodePresent','')}}\" lt-prop-disable-item-tooltip=\"{{cxPropDisableItemTooltip}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{cxPropTitle}}\" lt-prop-focus=\"{{dropdownFocus}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-max-count=\"{{cxPropMaxCount}}\" lt-prop-tooltip=\"{{cxPropTooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-remove-multiple=\"{{cxPropRemoveMultiple}}\" lt-prop-tabindex=\"{{cxPropTabindex}}\" lt-prop-icon-class=\"{{cxPropIconClass}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-disabled-list=\"{{cxPropDisabledList}}\" lt-prop-selected=\"{{cxPropSelected}}\" lt-prop-display-value=\"{{cxPropDisplayValue}}\" lt-prop-options=\"{{cxPropOptions}}\" lt-prop-user-value=\"{{cxPropUserValue}}\" lt-prop-system-value=\"{{cxPropSystemValue}}\" on-option-selected=\"{{method('optionSelect')}}\" on-show=\"{{method('dropBoxOpen')}}\" on-before-add=\"{{method('beforeAddDropItem')}}\" on-add=\"{{method('addDropItem')}}\" on-hide=\"{{method('hideDropbox')}}\" on-before-hide=\"{{method('beforeHideDropbox')}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-remove=\"{{method('beforeRemoveDropItem')}}\" on-change=\"{{method('onOptionChange')}}\" on-remove=\"{{method('removeDropItem')}}\" on-scroll=\"{{method('scrollDropBox')}}\" lt-prop-box-button-width=\"{{cxPropBoxButtonWidth}}\" lt-prop-position=\"{{cxPropPosition}}\" before-select=\"{{method('onBeforeSelect')}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" on-key-navigation=\"{{method('keyNavigation')}}\" lt-prop-no-result-yield=\"true\" lt-prop-non-removable-items=\"{{cxPropNonRemovableItems}}\" lt-prop-active-element=\".cxDropdownSearch\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"DropButtons {{if(cxPropIsDropdownIconNode,'ltDropdownIconNodePresent, ')}} {{if(expHandlers(cxPropButtonPrefixYield,'||',cxPropButtonSuffixYield),'cxDropButtonHasYeild')}} {{if(cxPropButtonSuffixYield,'cxDropButtonHasSuffixYeild','')}} {{cxPropButtonClass}}\" data-zcqa=\"{{cxPropZcqa}}\"> {{addMurhyInfo(\"crux-dropdown.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','single'),'||',expHandlers(cxPropType,'==','multi'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropButtonPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonPrefixYield\" class=\"cxPropDropButtonPrefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSelected,'||',cxPropDisplayValue)}}\"><template case=\"true\"> <span class=\"cxSelectWrapper\"> <template is=\"if\" value=\"{{cruxAnd(cxPropShowIconInButton,cxPropPlaceIconOnStart,selectedOption,selectedOption[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBPreYeildClass cxDBPreYeildShowIcon {{selectedOption[cxPropIconValue]}}\"></span></template></template> <lyte-text lt-prop-yield=\"true\" class=\"lyteDropdownLabel lyteMarginRight\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-value=\"{{getCruxDropButtonText(cxPropShowGroupLabelInButton,selectedOption._cxLabel,cxPropShowGroupLabelAsPrimary,selectedOption[cxPropGroupValue],selectValue,true)}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{unescape(getCruxDropButtonText(cxPropShowGroupLabelInButton,selectedOption._cxLabel,cxPropShowGroupLabelAsPrimary,selectedOption[cxPropGroupValue],selectValue))}} </template> </lyte-text> <template is=\"if\" value=\"{{cruxAnd(cxPropShowIconInButton,expHandlers(cxPropPlaceIconOnStart,'!'),selectedOption,selectedOption[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBYeildClass {{if(expHandlers(selectValue,'!'),cxDBYeildNoText)}} {{selectedOption[cxPropIconValue]}}\"></span></template></template> </span> </template><template case=\"false\"> <span class=\"lyteDropPlaceholderNormal\"><lyte-text lt-prop-value=\"{{cxPropPlaceholder}}\"></lyte-text></span> </template></template> <template is=\"if\" value=\"{{cxPropButtonSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonSuffixYield\" class=\"cxPropDropButtonSuffixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropShowRemoveIcon,cxPropSelected,expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"><div class=\"cxBoxCloseIcon\" onclick=\"{{action('clearSelection')}}\" data-zcqa=\"cxClearSelectionZcqa\"></div></template></template> <lyte-icon class=\"{{if(cxPropIsDropdownIconNode,cxPropIconClass,'dropdown')}}\"></lyte-icon> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropButtonPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonPrefixYield\" class=\"cxPropDropButtonPrefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','multisearch'),'||',expHandlers(cxPropSelected,'&amp;&amp;',expHandlers(cxPropSelected,'!==','[]')))}}\"><template case=\"true\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{displayValue}}\" item=\"item\" index=\"index\"> <li data-value=\"{{item[cxPropSystemValue]}}\" class=\"{{item.class}}\"> <lyte-text class=\"lyteDropdownVisible\" lt-prop-value=\"{{item[cxPropUserValue]}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\"> </lyte-text> <template is=\"if\" value=\"{{item[cxPropIconValue]}}\"><template case=\"true\"><span class=\"{{item[cxPropIconValue]}}\"></span></template></template> <template is=\"if\" value=\"{{expHandlers(checkMandatory(mandatorySelected,item[cxPropSystemValue]),'!')}}\"><template case=\"true\"><lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove></template></template> </li> </template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','multisearch')}}\"><template case=\"true\"> <li class=\"lyteMultiselectInput cxlyteMultiselectInput\"> {{addMurhyInfo(\"crux-dropdown.html\",\"Feb Default Changes\")}} <lyte-input class=\" \" lt-prop-class=\"lyteInput\" lt-prop-placeholder=\"{{cxPropSearchplaceholder}}\" lt-prop-maxlength=\"{{cxPropSearchMaxLength}}\" on-value-change=\"{{method('onOptionSearch')}}\"></lyte-input> </li> </template></template> <lyte-icon class=\"dropdown cxdN\"></lyte-icon> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','multiple'),'&amp;&amp;',expHandlers(expHandlers(cxPropForcePlaceholder,'||',expHandlers(cxPropSelected,'!')),'||',expHandlers(cxPropSelected,'==','[]')))}}\"><template case=\"true\"> <span class=\"lyteDropPlaceholderNormal\"> <lyte-text lt-prop-value=\"{{cxPropPlaceholder}}\"></lyte-text> <lyte-icon class=\"dropdown cxdN\"></lyte-icon> </span> </template></template> <template is=\"if\" value=\"{{cxPropButtonSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonSuffixYield\" class=\"cxPropDropButtonSuffixYield\"></lyte-yield></template></template> </template></template> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox {{cxPropBoxClass}} {{if(expHandlers(cxPropShowInfoIconOnHover,'!'),'cxShowDropdownInfoIcon')}}\" data-zcqa=\"dropbox_{{cxPropZcqa}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'!=','multisearch'),'&amp;&amp;',expHandlers(expHandlers(expHandlers(optGroup,'===',true),'&amp;&amp;',expHandlers(optArr.length,'>',cxPropMaxsearch)),'||',expHandlers(expHandlers(cxPropOptions.length,'>=',cxPropMaxsearch),'&amp;&amp;',expHandlers(optGroup,'!==',true))))}}\"><template case=\"true\"> <lyte-input class=\"cxDropdownSearch\" data-zcqa=\"search_{{cxPropZcqa}}\" lt-prop-focus=\"true\" lt-prop-type=\"search\" lt-prop-placeholder=\"{{cxPropSearchplaceholder}}\" on-value-change=\"{{method('onOptionSearch')}}\" lt-prop-close-icon=\"true\" on-clear=\"{{method('setScroll')}}\" lt-prop-maxlength=\"{{cxPropSearchMaxLength}}\"></lyte-input> </template></template> <template is=\"if\" value=\"{{cxPropShowRefreshButton}}\"><template case=\"true\"><div class=\"cxDDRefreshBtnWrap cxFlex\"> <lyte-button lt-prop-size=\"small\" lt-prop-disabled=\"{{processRefresh}}\" lt-prop-class=\"cxDDRefreshBtn\" lt-prop-appearance=\"primary\" onclick=\"{{action('refreshClicked')}}\" class=\"{{if(processRefresh,'cxDDOnRefresh')}} cxDDRefreshLyteBtn\" data-zcqa=\"cxRefreshButton\"> <template is=\"registerYield\" yield-name=\"text\"> <div class=\"cxFlexCenter cxDDRefreshBtnTextWrap\"> <span class=\"cxRefreshIcon cxDDRefreshIcon\"></span> <div class=\"cxCircleLoader cxDDRefreshBtnLoader\"> <div class=\"cxCircleLoader1\"></div> <div class=\"cxCircleLoader2\"></div> </div> <span class=\"cxDDRefreshBtnText\">{{cruxGetI18n('crm.button.refresh')}}</span> </div> </template> </lyte-button> </div></template></template> <template is=\"if\" value=\"{{cxPropShowRefreshButton}}\"><template case=\"true\"><div class=\"cxDDRefreshBtnDummyDiv\"></div></template></template> <lyte-drop-body class=\"dropBody {{if(maxLimitReached,'cxDisableDropBody')}}\"> <template is=\"for\" items=\"{{localData}}\" item=\"value\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(cxPropCheckKey(value),'&amp;&amp;',expHandlers(expHandlers(optGroup,'!'),'||',expHandlers(optGroup,'&amp;&amp;',value.render)))}}\"><template case=\"true\"> <lyte-drop-item class=\"{{value.cxPropClass}} {{if(expHandlers(cxPropIsDisabledValue(value[cxPropSystemValue]),'===',true),'lyteDropdown-disabled','')}} {{if(expHandlers(value[cxPropSystemValue],'==',selectionValue),'lyteDropdownSelection','')}} {{if(value.cxNewOption,'cxDDNewItem')}}\" data-index=\"{{index}}\" data-zcqa=\"{{if(value[cxPropOptionZcqa],value[cxPropOptionZcqa],value[cxPropSystemValue])}}\" data-value=\"{{value[cxPropSystemValue]}}\" lt-prop-title=\"{{if(cxPropDisableItemTooltip,value[cxPropTooltipValue],value[cxPropUserValue])}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" onmouseenter=\"{{action('dropItemHover',true,this,value)}}\" onmouseleave=\"{{action('dropItemHover',false,this,value)}}\"> <div class=\"cxDropItemWrapper\"> <div class=\"cxDropItemYield\"> <template is=\"if\" value=\"{{cruxAnd(cxPropPlaceIconOnStart,cxPropIconValue,value[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBPreYeildClass cxDBPreYeildShowIcon {{value[cxPropIconValue]}}\" onclick=\"{{action('iconClick',this,value[cxPropSystemValue])}}\"></span></template></template> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{getCruxDropItemValue(value,value[cxPropSystemValue],value.cxPropDisableTooltip,cxPropDisabledList,cxPropDisabledList.length,value[cxPropDisabledTooltipValue],value[cxPropTooltipValue],value[cxPropGroupValue],value[cxPropUserValue])}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{value[cxPropUserValue]}}<template is=\"if\" value=\"{{cruxAnd(cxPropGroupValue,value[cxPropGroupValue])}}\"><template case=\"true\"> - <span class=\"cxDropdownGroupElemValue\">({{value[cxPropGroupValue]}})</span></template></template> </template> </lyte-text> <template is=\"if\" value=\"{{cruxAnd(expHandlers(cxPropPlaceIconOnStart,'!'),cxPropIconValue,value[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBYeildClass {{value[cxPropIconValue]}}\" onclick=\"{{action('iconClick',this,value[cxPropSystemValue])}}\"></span></template></template> </div> <template is=\"if\" value=\"{{cruxOr(value[cxPropInfoValue],value.cxPropInfoTooltip)}}\"><template case=\"true\"><span id=\"{{if(cxPropId,concat(cxPropId,'_',value[cxPropSystemValue]),value[cxPropSystemValue])}}\" class=\"cxSprite cxInfoIcon\" lt-prop-title=\"{{if(value[cxPropInfoValue],value[cxPropInfoValue],'')}}\" lt-prop-tooltip-class=\"{{cxPropInfoTooltipClass}}\" onmouseenter=\"{{action('infoShow',this,value[cxPropSystemValue],true,this,value[cxPropSystemValue])}}\" onmouseleave=\"{{action('infoShow',this,value[cxPropSystemValue],false,this,value[cxPropSystemValue])}}\" onclick=\"{{action('infoClick',this,value[cxPropSystemValue])}}\"></span></template></template> </div> </lyte-drop-item> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(optGroup,'&amp;&amp;',expHandlers(cxPropCheckKey(value),'!'))}}\"><template case=\"true\"> <template is=\"forIn\" object=\"{{value}}\" value=\"optArray\" key=\"key\"> <lyte-drop-group label=\"{{key}}\"> <lyte-drop-label>{{key}}</lyte-drop-label> <template is=\"for\" items=\"{{optArray}}\" item=\"optValue\" index=\"index\"> <lyte-drop-item class=\"{{optValue.cxPropClass}} {{if(expHandlers(cxPropIsDisabledValue(optValue[cxPropSystemValue]),'===',true),'lyteDropdown-disabled','')}} {{if(expHandlers(optValue[cxPropSystemValue],'==',selectionValue),'lyteDropdownSelection','')}}\" data-key=\"{{key}}\" data-index=\"{{index}}\" data-zcqa=\"{{if(optValue[cxPropOptionZcqa],optValue[cxPropOptionZcqa],optValue[cxPropSystemValue])}}\" data-value=\"{{optValue[cxPropSystemValue]}}\" lt-prop-title=\"{{if(cxPropDisableItemTooltip,optValue[cxPropTooltipValue],optValue[cxPropUserValue])}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" onmouseenter=\"{{action('dropItemHover',true,this,optValue)}}\" onmouseleave=\"{{action('dropItemHover',false,this,optValue)}}\"> <div class=\"cxDropItemWrapper\"> <div class=\"cxDropItemYield\"> <template is=\"if\" value=\"{{cruxAnd(cxPropPlaceIconOnStart,cxPropIconValue,value[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBPreYeildClass cxDBPreYeildShowIcon {{value[cxPropIconValue]}}\" onclick=\"{{action('iconClick',this,value[cxPropSystemValue])}}\"></span></template></template> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{getCruxDropItemValue(optValue,optValue[cxPropSystemValue],optValue.cxPropDisableTooltip,cxPropDisabledList,cxPropDisabledList.length,optValue[cxPropDisabledTooltipValue],optValue[cxPropTooltipValue],optValue[cxPropGroupValue],optValue[cxPropUserValue])}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{optValue[cxPropUserValue]}}<template is=\"if\" value=\"{{cruxAnd(cxPropGroupValue,optValue[cxPropGroupValue])}}\"><template case=\"true\"> - <span class=\"cxDropdownGroupElemValue\">({{optValue[cxPropGroupValue]}})</span></template></template> </template> </lyte-text> <template is=\"if\" value=\"{{cruxAnd(expHandlers(cxPropPlaceIconOnStart,'!'),cxPropIconValue,value[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBYeildClass cxDBPreYeildShowIcon {{value[cxPropIconValue]}}\" onclick=\"{{action('iconClick',this,value[cxPropSystemValue])}}\"></span></template></template> </div> <template is=\"if\" value=\"{{cruxOr(optValue[cxPropInfoValue],optValue.cxPropInfoTooltip)}}\"><template case=\"true\"><span id=\"{{if(cxPropId,concat(cxPropId,'_',optValue[cxPropSystemValue]),optValue[cxPropSystemValue])}}\" class=\"cxSprite cxInfoIcon\" lt-prop-title=\"{{if(optValue[cxPropInfoValue],optValue[cxPropInfoValue],'')}}\" lt-prop-tooltip-class=\"{{cxPropInfoTooltipClass}}\" onmouseenter=\"{{action('infoShow',this,optValue[cxPropSystemValue],true)}}\" onmouseleave=\"{{action('infoShow',this,optValue[cxPropSystemValue],false)}}\" onclick=\"{{action('infoClick',this,optValue[cxPropSystemValue])}}\"></span></template></template> </div> </lyte-drop-item> </template> </lyte-drop-group> </template> </template></template></template></template> </template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxFlexCenter\"> <span class=\"cxElementsLoaderBg\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{noResult}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\"> <template is=\"if\" value=\"{{searchPerformed}}\"><template case=\"true\"> {{cxPropSearchNoResultMessage}} </template><template case=\"false\"> {{cxPropNoResultMessage}} </template></template> </div> </template></template></template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-drop-footer> {{addMurhyInfo(\"crux-dropdown.html\",\"Feb Default Changes\")}} <lyte-yield yield-name=\"footer\"></lyte-yield> </lyte-drop-footer></template></template> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"> <div class=\"cxFakeDummyEventContainer {{if(expHandlers(cxPropButtonPrefixYield,'||',cxPropButtonSuffixYield),'cxDropButtonHasYeild')}} {{if(cxPropButtonSuffixYield,'cxDropButtonHasSuffixYeild','')}}\" tabindex=\"{{if(expHandlers(cxPropDisabled,'!'),cxPropTabindex,expHandlers(1,'-'))}}\" onclick=\"{{action('renderDropDown',event)}}\" onkeydown=\"{{action('renderDropDown',event)}}\" onfocus=\"{{action('renderDropDown',event)}}\" onmouseover=\"{{action('renderDropDown',event)}}\" lt-prop-title=\"{{cxPropTitle}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" data-tabindex=\"{{cxPropDataTabindex}}\"> <div id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" class=\"cxFakeDropButton {{cxPropButtonClass}}\" data-zcqa=\"{{cxPropZcqa}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','single'),'||',expHandlers(cxPropType,'==','multi'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropButtonPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonPrefixYield\" class=\"cxPropDropButtonPrefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSelected,'||',cxPropDisplayValue)}}\"><template case=\"true\"> <span class=\"cxSelectWrapper\"> <template is=\"if\" value=\"{{cruxAnd(cxPropShowIconInButton,cxPropPlaceIconOnStart,selectedOption,selectedOption[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBPreYeildClass {{selectedOption[cxPropIconValue]}}\"></span></template></template> <lyte-text lt-prop-yield=\"true\" class=\"cxFakeDropdownLabel\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-value=\"{{getCruxDropButtonText(cxPropShowGroupLabelInButton,selectedOption._cxLabel,cxPropShowGroupLabelAsPrimary,selectedOption[cxPropGroupValue],selectValue,true)}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{unescape(getCruxDropButtonText(cxPropShowGroupLabelInButton,selectedOption._cxLabel,cxPropShowGroupLabelAsPrimary,selectedOption[cxPropGroupValue],selectValue))}} </template> </lyte-text> <template is=\"if\" value=\"{{cruxAnd(cxPropShowIconInButton,expHandlers(cxPropPlaceIconOnStart,'!'),selectedOption,selectedOption[cxPropIconValue])}}\"><template case=\"true\"><span class=\"cxDBYeildClass {{if(expHandlers(selectValue,'!'),cxDBYeildNoText)}} {{selectedOption[cxPropIconValue]}}\"></span></template></template> </span> </template><template case=\"false\"> <div class=\"cxFakeDropPlaceholderNormal\"><lyte-text class=\"cxVat\" lt-prop-value=\"{{cxPropPlaceholder}}\"></lyte-text></div> </template></template> <template is=\"if\" value=\"{{cxPropButtonSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonSuffixYield\" class=\"cxPropDropButtonSuffixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropShowRemoveIcon,cxPropSelected,expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"><div class=\"cxBoxCloseIcon\" onclick=\"{{action('clearSelection')}}\" data-zcqa=\"cxClearSelectionZcqa\"></div></template></template> <lyte-icon class=\"{{if(cxPropIsDropdownIconNode,cxPropIconClass,'dropdown')}}\"></lyte-icon> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropButtonPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonPrefixYield\" class=\"cxPropDropButtonPrefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','multisearch'),'||',expHandlers(cxPropSelected,'&amp;&amp;',expHandlers(cxPropSelected,'!==','[]')))}}\"><template case=\"true\"> <ul class=\"cxFakeMultipleSelect\"> <template is=\"for\" items=\"{{displayValue}}\" item=\"item\" index=\"index\"> <li class=\"cxFakeMultipleSelectLi {{item.class}}\"> <lyte-text class=\"cxFakeDropdownVisible\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-value=\"{{item[cxPropUserValue]}}\"> </lyte-text> <template is=\"if\" value=\"{{item[cxPropIconValue]}}\"><template case=\"true\"><span class=\"{{item[cxPropIconValue]}}\"></span></template></template> <template is=\"if\" value=\"{{expHandlers(checkMandatory(mandatorySelected,item[cxPropSystemValue]),'!')}}\"><template case=\"true\"><lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove></template></template> </li> </template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','multisearch')}}\"><template case=\"true\"> <li class=\"cxFakeMultipleSelectLi cxFakeMultipleSelectInput\"> <input placeholder=\"{{cxPropSearchplaceholder}}\" disabled=\"{{cxPropDisabled}}\"> </li> </template></template> <lyte-icon class=\"dropdown cxdN\"></lyte-icon> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','multiple'),'&amp;&amp;',expHandlers(expHandlers(cxPropForcePlaceholder,'||',expHandlers(cxPropSelected,'!')),'||',expHandlers(cxPropSelected,'==','[]')))}}\"><template case=\"true\"> <div class=\"cxFakeDropPlaceholderNormal\"> {{cxPropPlaceholder}} <lyte-icon class=\"dropdown cxdN\"></lyte-icon> </div> </template></template> <template is=\"if\" value=\"{{cxPropButtonSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"buttonSuffixYield\" class=\"cxPropDropButtonSuffixYield\"></lyte-yield></template></template> </template></template> </div> </div> </template></template> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" data-zcqa=\"{{cruxConcat(cxPropErrorZcqaPrefix,cxPropErrorZcqa,cxPropErrorZcqaSuffix)}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"componentDynamic","position":[9]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[1,5,0]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"attr","position":[3,7,1]},{"type":"for","position":[3,7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"registerYield","position":[1,1,1,3,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"attr","position":[1,1,1,5]},{"type":"if","position":[1,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"registerYield","position":[1,1,1,3,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"attr","position":[1,1,1,5]},{"type":"if","position":[1,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3,7,3]},{"type":"if","position":[3,7,3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,7]},{"type":"attr","position":[3,9]},{"type":"if","position":[3,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]},{"type":"insertYield","position":[0,3]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"componentDynamic","position":[9]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropId","cxPropOptions","localData","cxPropLimit","cxPropSearchplaceholder","cxPropPlaceholder","noResult","cxPropType","cxPropMaxsearch","cxPropTrimSearch","cxPropUserValue","cxPropSystemValue","cxPropTooltipValue","cxPropRemoveMultiple","cxPropTabindex","cxPropIconClass","cxPropDisabled","cxPropSelected","cxPropDisabledList","cxPropDisplayValue","cxPropClass","displayValue","selectValue","initialValue","cxPropZcqa","showFieldsDropdown","cxPropMandatory","optArr","optGroup","cxPropBoxButtonWidth","cxPropNoResultMessage","cxPropErrorMessage","cxPropSearchNoResultMessage","searchPerformed","isError","isNoOptSelected","cxPropErrorZcqaPrefix","cxPropPosition","cxPropErrorZcqa","cxPropErrorZcqaSuffix","cxPropOptionZcqa","cxPropFreeze","cxPropPreventParentScroll","preventSelectedObs","cxPropTooltip","cxPropTitle","cxPropTooltipConfig","cxPropTooltipClass","cxPropSearchMaxLength","dropClassList","cxPropBoxClass","cxPropMaxCount","showLoading","selectionValue","cxPropErrorYield","cxPropErrorClass","cxPropErrorSpanClass","cxPropScope","cxPropClearErrorMessage","dropdownFocus","cxPropSelectedList","cxPropHasMoreOptions","cxPropDisableItemTooltip","cxPropIsDropdownIconNode","cxPropFooterYield","cxPropId","cxPropAria","cxPropAriaButton","cxPropAriaBox","cxPropAriaBody","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropExternalSearch","cxPropInfoValue","cxPropShowInfoIconOnHover","cxPropInfoTooltipClass","cxPropForcePlaceholder","cxPropIconValue","cxPropShowIconInButton","cxPropPlaceIconOnStart","selectedOption","cxPropAriaErrorProperties","cxPropShowRemoveIcon","cxPropButtonClass","cxPropDisabledTooltipValue","cxPropShowGroupLabelInButton","cxPropShowGroupLabelAsPrimary","cxPropButtonSuffixYield","cxPropButtonPrefixYield","cxPropBoundary","cxPropGroupValue","cxPropShowMaxLimitMessage","cxPropFocus","cxPropShowRefreshButton","cxPropShowIconOnHover","cxPropNonRemovableItems","mandatorySelected"],
_observedAttributesType :["object","object","boolean","string","array","array","number","string","string","boolean","string","number","boolean","string","string","string","boolean","number","string","boolean","string","array","string","string","array","string","string","string","boolean","boolean","array","boolean","string","string","string","string","boolean","boolean","boolean","string","string","string","string","string","boolean","boolean","boolean","object","string","string","string","number","string","string","number","boolean","string","boolean","string","string","string","boolean","boolean","array","boolean","boolean","boolean","boolean","string","boolean","object","object","object","string","object","string","string","boolean","string","boolean","string","boolean","string","boolean","boolean","object","object","boolean","string","string","boolean","boolean","boolean","boolean","object","string","boolean","boolean","boolean","boolean","array","object"],
 //NO I18n
	data : function(){
		return {
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property used to send multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropOptions:Lyte.attr("array",{"default" : []}), //NO I18n

			localData:Lyte.attr("array",{"default":[]}), //NO I18N
			/**
			 * This property is used to limit the number of options what will be rendered when dropbox is opened initally.
			 * @componentProperty { number } cxPropLimit
			 * @default 50
			 * @version 1.0.0
			 */
			cxPropLimit:Lyte.attr("number",{"default":50}),//NO I18n
			/**
			 * This property is used set placeholder for search field.
			 * @componentProperty { string } cxPropSearchplaceholder
			 * @default Search
			 * @version 1.0.0
			 */
			cxPropSearchplaceholder: Lyte.attr("string", {"default" :_cruxUtils.getI18n('crm.globalsearch.search.title')}), //NO I18n
			/**
			 * This property is to set placeholder value.
			 * @componentProperty { string } cxPropPlaceholder
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n

			noResult:Lyte.attr("boolean",{"default":false}), //NO I18n
			/**
			 * This property is used to set the type of dropdown.
			 * @componentProperty {single | multiple | multisearch | multi} cxPropType
			 * @default single
			 * @version 1.0.0
			 */
			cxPropType:Lyte.attr("string",{"default":"single"}), //NO I18n
			/**
			 * Search input will be rendered when the number of options exceed the given value.
			 * @componentProperty { number } cxPropMaxsearch
			 * @default 10
			 * @version 1.0.0
			 */
			cxPropMaxsearch:Lyte.attr('number',{"default":10}), //NO I18n
			/**
			 * This property is used to decide whether or not the search value needs to be trimmed.
			 * @componentProperty { boolean } cxPropTrimSearch=false
			 * @default true
			 * @version 1.0.0
			 */
			cxPropTrimSearch: Lyte.attr('boolean',{"default":true}),
			/**
			 *This property represents the key which contains the value to be displayed to user.
			 * @componentProperty { string } cxPropUserValue
			 * @default name
			 * @version 1.0.0
			 */
			cxPropUserValue:Lyte.attr('string',{"default":"name"}),//NO I18n
			/**
			 * This property represents the key which contains the unique value of each option.
			 * @componentProperty { string } cxPropSystemValue
			 * @default value
			 * @version 1.0.0
			 */
			cxPropSystemValue:Lyte.attr('string',{"default":"value"}),//NO I18n
			/**
			 * This property represents the key which contains the toolip value of each option.
			 * @componentProperty { string } cxPropTooltipValue
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropTooltipValue: Lyte.attr('string'),//NO I18n
			/**
			 * This property is to used to enable removing multiple options at same time;
			 * @componentProperty { boolean } cxPropRemoveMultiple=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropRemoveMultiple:Lyte.attr('boolean',{"default":false}),//NO I18n
			/**
			 * This property is used to set tab index for the dropdown.
			 * @componentProperty { number } cxPropTabindex
			 * @default 0
			 * @version 1.0.0 
			 */
			cxPropTabindex:Lyte.attr('number',{"default":0}),//NO I18n
			/**
			 * Set a class for the down arrow rendered inside the lyte-drop-button.
			 * @componentProperty { string } cxPropIconClass
			 * @version 1.0.0
			 */
			cxPropIconClass:Lyte.attr("string",{"default":""}),//NO I18n
			/**
			 * This property is used to disable the dropdown.
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropDisabled:Lyte.attr("boolean",{"default":false}),//NO I18n
			/**
			 * This property is used to set the selected option, for single select pass the system value and for multiselect pass array of system value.
			 * @componentProperty { string } cxPropSelected
			 * @version 1.0.0
			 */
			cxPropSelected:Lyte.attr("string"),//NO I18n
			/**
			 * This property is used to disable options in the dropdown.
			 * @componentProperty { array } cxPropDisabledList
			 * @version 1.0.0
			 */
			cxPropDisabledList:Lyte.attr("array",{"default" : []}),//NO I18n
			/**
			 * This property is used to display the value passed as selected for single select dropdown.
			 * @componentProperty { string } cxPropDisplayValue
			 * @version 1.0.0
			 */
			cxPropDisplayValue:Lyte.attr("string"),//NO I18n
			/**
			 * Value passed to this property will be set as class for dropdown.
			 * @componentProperty { string } cxPropClass
			 * @version 1.0.0
			 */
			cxPropClass:Lyte.attr("string",{"default":""}), //NO I18n

			displayValue:Lyte.attr("array", {"default": []}), //NO I18n

			selectValue:Lyte.attr("string"), //NO I18n

			initialValue:Lyte.attr("string"), //NO I18n
			/**
			 * This property is used to set data-zcqa for drop button, drop box, search input.
			 * @componentProperty { string } cxPropZcqa
			 * @version 1.0.0
			 */
			cxPropZcqa:Lyte.attr('string'), //NO I18n

			showFieldsDropdown:Lyte.attr('boolean',{"default":false}), //NO I18n
			/**
			 * This property is used to mark the dropdown as mandatory.
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropMandatory :Lyte.attr("boolean",{"default" : false}), //NO I18N

			optArr : Lyte.attr("array",{"default" : []}), //NO I18N

			optGroup : Lyte.attr("boolean",{"default" : false}), //NO I18N
			/**
			 * This property is used to control the width of the lyte-drop-box with respect to the button.
			 * @componentProperty { min-button | same | auto } cxPropNoResultMessage
			 * @default same
			 * @version 1.0.0
			 */
			cxPropBoxButtonWidth : Lyte.attr("string",{"default" : "min-button"}), //NO I18N
			/**
			 * This property is used to display the message when no option is available.
			 * @componentProperty { string } cxPropNoResultMessage
			 * @default No results match
			 * @version 1.0.0
			 */
			cxPropNoResultMessage : Lyte.attr("string",{"default" : _cruxUtils.getI18n('crm.label.no.results.match')}), //NO I18N
			cxPropErrorMessage : Lyte.attr("string"), //NO I18N
			cxPropSearchNoResultMessage: Lyte.attr("string"), //NO I18N
			searchPerformed:  Lyte.attr("boolean",{default:false}), 
			isError : Lyte.attr("boolean",{"default" : false}), //NO I18N

			isNoOptSelected: Lyte.attr("boolean",{"default" : false}), //NO I18N
			/**
			 * This property is used to set prefix for zcqa set in the error message.
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string"), //NO I18N
			/**
			 * This property specifies the position of dropdown.
			 * @componentProperty { up | down | left | right } cxPropPosition
			 * @version 1.0.0
			 */
			cxPropPosition : Lyte.attr("string",{"default" : "down"}), //NO I18N
			/**
			 * This property is used to set zcqa in the error message.
			 * @componentProperty { string } cxPropErrorZcqa
			 * @version 1.0.0
			 */
			cxPropErrorZcqa : Lyte.attr("string"), //NO I18N
			/**
			 * This property is used to set suffix for zcqa set in the error message.
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @version 1.0.0
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string"), //NO I18N
			/**
			 * This property represents the key which contains the zcqa value of each option.
			 * @componentProperty { string } cxPropOptionZcqa
			 * @version 1.0.0
			 */
			cxPropOptionZcqa : Lyte.attr("string"), //NO I18N
			/**
			 * This property is used to freeze the page when the dropdown is opened.
			 * @componentProperty { boolean } cxPropFreeze=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropFreeze : Lyte.attr("boolean",{default : false}),//NO I18N
			/**
			 * This propery is used to prevent scroll when dropdown is opened.
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean",{default : false}), //NO I18N

			preventSelectedObs : Lyte.attr("boolean",{"default" : false}), //NO I18N
			/**
			 * This property is used to set configuration of tooltip when width of selected text exceeds the width of drop button.
			 * @componentProperty { object } cxPropTooltip
			 * @default { "position": "bottom", "appearance": "box","margin": 5,"keeptooltip": true }
			 * @version 1.0.0
			 */
			cxPropTooltip : Lyte.attr("object",{"default" : { "position": "bottom", "appearance": "box","margin": 5,"keeptooltip": true }}), //NO I18N
			/**
			 * This property is used to set tooltip title for dropdown.
			 * @componentProperty { string } cxPropTitle
			 * @version 1.0.0
			 */
			cxPropTitle: Lyte.attr("string"),
			/**
			 * This property is used to set tooltip configuration.
			 * @componentProperty { string } cxPropTooltipConfig
			 * @default {"position": "followcursor", "appearance": "box"}
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			cxPropTooltipClass: Lyte.attr("string"),
			cxPropSearchMaxLength : Lyte.attr("number",{"default" : 50}), //NO I18N

			dropClassList : Lyte.attr("string",{"default" : ""}), //NO I18N
			/**
			 * This property is used to class for dropbox.
			 * @componentProperty { string } cxPropBoxClass
			 * @version 1.0.0
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * This property is used to set maximum number of options that can be selected.
			 * @componentProperty { number } cxPropMaxCount
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropMaxCount: Lyte.attr("number"),

			showLoading: Lyte.attr('boolean',{default:false}),

			selectionValue: Lyte.attr('string'),
			/**
			 * This property is used to display to yield instead of crux error message.
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropErrorYield: Lyte.attr('boolean'),
			/**
			 * This property is used to set class for crux error message.
			 * @componentProperty { string } cxPropErrorClass
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * This property is used to set class for span tag inside crux error message.
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * This represents the dom element within which the lyte-drop-box must be contained. The lyte-drop-box never leaves the boundary of its scope element. Used in dropdowns inside modals.
			 * @componentProperty { string } cxPropScope
			 * @version 1.0.0
			 */
			cxPropScope:  Lyte.attr("string"),
			/**
			 * This property is used to clear error message when option is selected or removed
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropClearErrorMessage: Lyte.attr('boolean',{default:false}),

			dropdownFocus: Lyte.attr('boolean',{default:false}),
			cxPropSelectedList: Lyte.attr('array',{default:[]}),
			cxPropHasMoreOptions:  Lyte.attr('boolean',{default:false}),
			cxPropDisableItemTooltip: Lyte.attr('boolean',{default:false}),
			/**
			 * When set to true, value passed to cx-prop-icon-class is as class to lyte-icon
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @default false
			 * @version 1.0.0
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
			cxPropFooterYield: Lyte.attr('boolean',{default:false}),
			cxPropId : Lyte.attr("string"),
			cxPropAria : Lyte.attr('boolean', {default : false}),
			cxPropAriaButton : Lyte.attr('object', {default : {}}),
			cxPropAriaBox : Lyte.attr('object', {default : {}}),
			cxPropAriaBody : Lyte.attr('object', {default : {}}),
			cxPropDataTabindex : Lyte.attr('string'),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			cxPropExternalSearch: Lyte.attr('boolean',{default:false}),
			cxPropInfoValue: Lyte.attr('string'),
			cxPropShowInfoIconOnHover: Lyte.attr('boolean',{default:true}),
			cxPropInfoTooltipClass: Lyte.attr('string'),
			cxPropForcePlaceholder: Lyte.attr('boolean',{default:false}),
			cxPropIconValue: Lyte.attr('string'),
			cxPropShowIconInButton: Lyte.attr('boolean',{default:true}),
			cxPropPlaceIconOnStart: Lyte.attr('boolean'),
			selectedOption: Lyte.attr('object'),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropShowRemoveIcon: Lyte.attr('boolean'),
			cxPropButtonClass: Lyte.attr('string'),
			cxPropDisabledTooltipValue: Lyte.attr('string'),
			cxPropShowGroupLabelInButton: Lyte.attr('boolean'),
			cxPropShowGroupLabelAsPrimary: Lyte.attr('boolean'),
			cxPropButtonSuffixYield: Lyte.attr('boolean'),
			cxPropButtonPrefixYield: Lyte.attr('boolean'),
			cxPropBoundary: Lyte.attr("object", { default: {} }),
			cxPropGroupValue: Lyte.attr('string'),
			cxPropShowMaxLimitMessage: Lyte.attr('boolean', { default: false }),
			cxPropFocus: Lyte.attr("boolean", { default: false }),
			cxPropShowRefreshButton: Lyte.attr('boolean'),
			cxPropShowIconOnHover: Lyte.attr("boolean", { default: false }),
			cxPropNonRemovableItems: Lyte.attr("array"),
			mandatorySelected: Lyte.attr("object")
		}
	},
	focus : function(){
		if(this.$node.querySelector('lyte-dropdown')){
			this.$node.querySelector('lyte-dropdown').querySelector('.lyteDummyEventContainer').focus(); //NO I18N
		}else{
			this.$node.querySelector('.cxFakeDummyEventContainer').focus(); //NO I18N
		}
	},
	formatOptionsForOpt: function(options,callback){
		var name = this.getData("cxPropUserValue"); //NO I18N
		var arr = [];
		let clone;
			for(var i=0;i<options.length;i++){
				if(!this.checkOptOption(options[i])){
					clone = $L.extend(true, {},options[i]);
					clone.render = true;
					arr.push(clone);
				}else{
					var key = Object.keys(options[i])[0];
					if(callback && !this.labelSet.has(key)){
						arr.push(options[i]);
					}else if(!callback){
						arr.push(options[i]);
					}
				    for(var j =0;j<options[i][key].length;j++){
						clone =$L.extend(true, {},options[i][key][j]);
						clone._cxLabel = key;
						arr.push(clone);
				    }
				}
			}
		return arr;
	},
	optTotalCount : function(options,type){
		var arr =  this.formatOptionsForOpt(options);;
		this.setData("optGroup",true);//NO I18N
		this.labelSet = new Set();
		if(type != 'search'){

			var limit = this.getData("cxPropLimit"); //NO I18N
			var type = this.getData("cxPropType"); //NO I18N
			this.setData("optArr",arr); //NO I18N
			// to calculate dropitems....
			if(arr.length < limit){
				this.calculateDropItems(0,arr.length);//NO I18N
			}else{
				if(this.data.cxPropSelected && type == 'single'){
					var i = arr.cruxFindIndexOfObject(this.data.cxPropSystemValue,this.data.cxPropSelected);
					if(i > limit){
						let start = this.getStartIndexForRendering(i,limit,arr.length);
						this.calculateDropItems(start,limit,true);//NO I18N
					}else{
						this.calculateDropItems(0,limit);//NO I18N
					}
				}else{
					this.calculateDropItems(0,limit);//NO I18N
				}

			}
		}else{
			this.setData("localData",arr);	//NO I18N
			this.setData("currentPos",this.getData("localData").length); //NO I18N
		}

	},
	scrollBox : function(event,component){
		var body = event.target;
			var optGroup = this.getData("optGroup"); //NO I18N
			clearTimeout(this.timeout1);

			this.timeout1 = setTimeout(function() {
				var searchElem;
				var type = this.getData("cxPropType"); //NO I18N

				if(type != 'multisearch'){
					searchElem = component.childComp.querySelector("lyte-input");//NO I18N
				}else{
					searchElem = component.$node.querySelector("lyte-input");//NO I18N
				}
				let scrollUp,scrollDown;
				if(body.scrollHeight-10 <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop))){
					scrollDown = true;
				}else if(body.scrollTop <= 10){
					scrollUp = true;
				}
				var isSearch = searchElem && searchElem.getData("ltPropValue") ? true: false;
				if((scrollDown || scrollUp) && (!isSearch || (this.getData('cxPropHasMoreOptions') && !this.getData('showLoading')))){
					if(optGroup == true){
						this.renderScroll('opt',isSearch,scrollUp);//NO I18N
					}else{
						this.renderScroll('single',isSearch,scrollUp);//NO I18N
					}
				}				
			}.bind(this), 10);
	},
	// to render datas while scrolling according to type and search availabbility
	renderScroll : function(type,isSearch,scrollUp){
		if(!this.getData('cxPropOptions') || this.getData('cxPropOptions').length===0){
			return;
		}
		var totalLength;
		var renderedLength = this.getData("localData").length; //NO I18N

		if(type != 'opt'){
			totalLength = this.getData("cxPropOptions").length; //NO I18N
		}else{
			 totalLength = this.getData("optArr").length; //NO I18N
		}
		//during search we cannot compare length between options and localdata
		if(!isSearch && renderedLength !== totalLength){
			var limit = this.getData("cxPropLimit"); //NO I18N
			var diff = limit;
			let start;
			if(scrollUp && this.getData('topPosition')>0){
				start = this.getData('topPosition')-limit; 
				if(start < 0){
					start = 0;
					diff = this.getData('topPosition');
				}
				let prev = this.lyteDropBody.scrollHeight;
				this.calculateDropItems(start,diff,false,scrollUp); //NO I18N
				//after inserting elements in the top, scrolltop will be zero, need to change the scroll top so there is no UX issue
				this.lyteDropBody.scrollTop = this.lyteDropBody.scrollHeight - prev; //NO I18N
			}else if(!scrollUp && this.getData('currentPos') < totalLength){
				if((totalLength - renderedLength) < limit){
					diff = totalLength - renderedLength; //NO I18N
				}
				start = this.data.currentPos;
				this.calculateDropItems(start,diff,false); //NO I18N
			}
		}
		else if(this.getData('cxPropHasMoreOptions') && this.callbackResolved){
				if(this.getMethods('onScrollFetchMoreOptions')){
					if(this.data.searchPerformed){
						++this.searchParam.page;
					}else{
						++this.scrollParam.page;
					}
					var param =Object.assign({},this.data.searchPerformed ? this.searchParam:this.scrollParam);
					var callbackResp = this.executeMethod('onScrollFetchMoreOptions',param);
					this.callbackResolved = false;
					this.setData('showLoading',true);
					var _this = this;
					var diff;
					var limit = this.getData("cxPropLimit"); //NO I18N
					if(callbackResp instanceof Promise){
						callbackResp.then(function(resp){
							if(resp && resp.length>0){
								_this.preventOptionsObs = true;
								if(isSearch){
									Lyte.arrayUtils(_this.getData('localData'),'push',resp);
								}
								else{
									if(type != 'opt'){
											Lyte.arrayUtils(_this.getData('cxPropOptions'),'push',resp);
											len = _this.getData("cxPropOptions").length; //NO I18N
									}else{
											Lyte.arrayUtils(_this.getData("optArr"),'push',_this.formatOptionsForOpt(resp,true));
											len = _this.getData("optArr").length; //NO I18N
									}
									_this.preventOptionsObs = false;
									if((len - currentPos) < limit){
										diff = len - currentPos; //NO I18N
									}else{
										diff = limit; //NO I18N
									}
									_this.calculateDropItems(currentPos,diff); //NO I18N
								}
							}
						}).catch(function(){
							_this.previousHasMoreOptions = _this.getData('cxPropHasMoreOptions');
							_this.getData('cxPropHasMoreOptions',false);
						}).finally(function(){
							_this.setData('showLoading',false);
							_this.callbackResolved = true;
						})
					}
				}
			
		}

	},

	// RESETTING VALUES...
	resetValues : function(){	
		var selected = this.getData("cxPropSelected"); //NO I18N
		var displayValue = this.getData("cxPropDisplayValue"); //NO I18N
		var disableList = this.getData("cxPropDisabledList"); //NO I18N
		var type = this.getData('cxPropType');
		var selectedList;
		this.setData('preventSelectedObs',true); //NO I18N

		if(selected){
			// clonning selected value doesn't shows tick mark in dropdown
			this.setData('preventSelectedObs',true); //NO I18N
			if((type==="multiple" || type==="multisearch") && this.getData('cxPropSelectedList') && this.getData('cxPropSelectedList').length>0){
				selectedList =  Array.from(this.getData('cxPropSelectedList'));
				this.setData('cxPropSelectedList',selectedList);

			}
			this.setData("cxPropSelected","");//NO I18N
			this.setData("cxPropSelected",selected); //NO I18N			
			this.setData('preventSelectedObs',false); //NO I18N
			this.preventDisplayObs = true;
			this.setData("cxPropDisplayValue",""); //NO I18N
			this.setData("cxPropDisplayValue",displayValue); //NO I18N
			this.preventDisplayObs = false;
			//this.setData("selectValue",this.getData("selectValue")); //NO I18N
		}
		if(this.$node.querySelector( 'lyte-dropdown' )){
			this.$node.querySelector( 'lyte-dropdown' ).component.setData("ltPropDisabledList",[]); //NO I18N
			this.$node.querySelector( 'lyte-dropdown' ).component.setData("ltPropDisabledList",disableList); //NO I18N
		}
		this.setData("preventSelectedObs", false);
	},
	mergeOptions: function(groupMap,unshift){
		let keys = Object.keys(groupMap);
		let localData = this.getData('localData');
		keys.forEach((key)=>{
			localData.filter((opt)=>opt[key]).forEach((opt)=>{
				Lyte.arrayUtils(opt[key],unshift?'unshift':'push',groupMap[key]);
			})
		})
	},
	// to calculate the drop items by given limit...
	calculateDropItems:function(start,end,initRender,scrollUp){
		var selected = this.getData('cxPropSelected'); //NO I18n
		var optGroup = this.getData('optGroup');  //NO I18n
		var limit = this.getData("cxPropLimit"); //NO I18N
		var value = this.getData('cxPropSystemValue'); //NO I18N
		var type = this.getData('cxPropType'); //NO I18N
		var arr = [];
		var count = 0;
		let groupMap = {};
		end = start + end;
			if(selected != undefined && selected.match(/]/)){
				selected = JSON.parse(selected);
				if(selected.constructor == Object){
					selected = selected[0];
				}
			}else{
				selected = [];
			}
			var allowSelected = false;
			if(optGroup !== true){
				var optionArray=this.getData("cxPropOptions"); //NO I18n
				if(type === "single" || type === "multi"){
					allowSelected = true;
					for(var i=start;i<end;i++){
						if(typeof optionArray[i] == 'undefined'){
							break;
						}
						if(count < limit){
							arr.push(optionArray[i])
						}
						count++
					}
				}else{
					allowSelected = false;
					//if all inital array value is selected, no other option is rendered
					//loading 7 dropitems is enough to show the scrollbar, just to safer rendering 10 values
					if(start==0 && !this.checkIfSelectedEmpty()){
						var actualCount = 0,i=0;
						var systemValue = this.getData('cxPropSystemValue');
						var selected = Array.isArray(JSON.parse(this.getData('cxPropSelected')))?JSON.parse(this.getData('cxPropSelected')):[];
						while(!(actualCount >= 10 && count==limit) && i<optionArray.length){
							if(typeof optionArray[i] == 'undefined'){
								break;
							}
							arr.push(optionArray[i]) //NO I18N
							if(!selected.includes(optionArray[i][systemValue])){
								++actualCount;
							}
							count++
							++i;
						}
						end = count;
					}else
					{
						for(var i=start;i<end;i++){
							if(typeof optionArray[i] == 'undefined'){
								break;
							}
							arr.push(optionArray[i]) //NO I18N
							count++
						}
	
					}
				}

			}else{
				var optArr = this.getData("optArr"); //NO I18N
				//due to closure, all the values used in the function will be available
				let pushOption = (opt)=>{
					if(opt._cxLabel){
						let groupLabel = opt._cxLabel;
						if(!groupMap[groupLabel]){
							groupMap[groupLabel] = [];
						}
						//creating a empty group and pushing the option in mergeoption function to achieve lazy loading
						if(!this.labelSet.has(groupLabel)){
							let newObj = {};
							newObj[groupLabel] = [];
							this.labelSet.add(groupLabel);
							if(scrollUp){
								arr.unshift(newObj);
							}else{
								arr.push(newObj);
							}
						}
						if(scrollUp){
							groupMap[groupLabel].unshift(opt);
						}else{
							groupMap[groupLabel].push(opt);
						}
					}
					if(scrollUp){
						arr.unshift(opt);
					}else{
						arr.push(opt);
					}
				};
				if(scrollUp){
					for(var j=end-1;j>=start;j--){
						if(optArr[j] !== undefined && count < limit){
								if(!this.checkOptOption(optArr[j])){
									pushOption(optArr[j]);
									count++;
								}else{
									//opt arr contains optgroup options and original option
									start--;
								}
						}
					}
				}else{
					for(var k=start;k<end;k++){
						if(optArr[k] !== undefined && count < limit){
								if(!this.checkOptOption(optArr[k])){
									pushOption(optArr[k]);
									count++;
								}else{
									//opt arr contains optgroup options and original option
									end++;
								}
						}
					}
				}
			}

			if((start === 0 || initRender) && !scrollUp){
				this.setData('topPosition',start);
				this.setData("localData",arr); //NO I18N
				this.setData("currentPos",end); //NO I18N
			}else{
				if(scrollUp){
					this.setData('topPosition',start);
					Lyte.arrayUtils(this.data.localData,'unshift',arr)
				}else{
					Lyte.arrayUtils(this.getData('localData'),'push',arr)
					// this.setData("localData",this.getData("localData").concat(arr)); //NO I18N
					this.setData("currentPos",end); //NO I18N
				}
			}
			if(this.getData('optGroup')){
				this.mergeOptions(groupMap,scrollUp);
			}

			this.resetValues();

	},

	checkSelectedValue : function(option,name,value,display_value,selectedValue,placeHolder,type,optGroup){
			this.setData('preventSelectedObs',true); //NO I18N

			 if( type != 'single' && type !== "multi" && !this.getData('optGroup')){//NO I18N
					var dummy = [];
					var display = [];
					var hasMore = this.getData('cxPropHasMoreOptions');
					var selectedList = this.getData('cxPropSelectedList');
					if(selectedList){
						selectedList.forEach(function(selected){
							display.push(selected);
							dummy.push(selected[value]);
						})
					}
					if(selectedValue){
						var selectedArr = JSON.parse(selectedValue);//NO I18N
						for(var i = 0;i<selectedArr.length;i++){
							for(var j=0;j<option.length;j++){
								if(selectedArr[i] == option[j][value] && !dummy.includes(option[j][value])){
									display.push(option[j]);
									dummy.push(option[j][value]);
									break;
								}
							}
						}
					}
					this.setData('cxPropSelectedList',display)
					this.setData('cxPropSelected',"");
					this.setData('cxPropSelected',dummy); //NO I18N
					this.setData('preventSelectedObs',false); //NO I18N
					this.setData('displayValue',Array.from(display)); //NO I18N
			}else{
				if(optGroup){
					if(type!=='single' && type!=='multi'){
						var selectedArr = JSON.parse(selectedValue);//NO I18N
						var dummy = [];
						var display = [];
						for(var i = 0;i<selectedArr.length;i++){
							for(var j=0;j<option.length;j++){
								var innerOptions = option[j][Object.keys(option[j])[0]];
								var idx = innerOptions.cruxFindIndexOfObject(value,selectedArr[i]);
								if(idx!==-1){
									display.push(innerOptions[idx]);
									dummy.push(innerOptions[idx][value]);
									break;
								}
							}
						}
						this.setData('cxPropSelected',"");
						this.setData('cxPropSelected',dummy); //NO I18N
						this.setData('cxPropSelectedList',display)
						this.setData('preventSelectedObs',false); //NO I18N
						this.setData('displayValue',display); //NO I18N
					}else{
						var key ;
						for(var i = 0;i<option.length;i++){
								key = Object.keys(option[i])[0];
								for(var j =0;j<option[i][key].length;j++){
									if(option[i][key][j][value]!==undefined){
										if(option[i][key][j][value] == selectedValue){
											this.setData('cxPropSelected',"");
											this.setData('cxPropSelected',option[i][key][j][value]);
											this.setData('preventSelectedObs',false); //NO I18N
											this.setData('selectValue',option[i][key][j][name]);//NO I18n
											this.setData('selectedOption',{...option[i][key][j],...{_cxLabel:key}});
											break;
										}
									}else{
										var key1 = option[i][value]
										if(key1 === selectedValue){
											this.setData('cxPropSelected',"");
											this.setData('cxPropSelected',option[i][value]);
											this.setData('preventSelectedObs',false); //NO I18N
											this.setData('selectValue',option[i][name]);//NO I18n
											this.setData('selectedOption',option[i])
											break;
										}
									}

								}
							}
						}
				}else if(type === "single"){ //NO I18N
					for(var i = 0;i<option.length;i++){
						if(option[i][value] == selectedValue){
							this.setData('cxPropSelected',"");
							this.setData('selectValue',option[i][name]);//NO I18n
							this.setData('selectedOption',option[i]);
							this.setData('cxPropSelected',option[i][value]); //NO I18N
							this.setData('preventSelectedObs',false); //NO I18N
							break;
						}
					}
				}else{
					for(var i=0;i<option.length;i++){
						if(option[i][value] !== undefined && option[i][value] == selectedValue){
							this.setData('cxPropSelected',"");
							this.setData('selectValue',option[i][name]);//NO I18n
							this.setData('selectedOption',option[i]);
							this.setData('cxPropSelected',option[i][value]); //NO I18N
							this.setData('preventSelectedObs',false); //NO I18N
							break;
						}else if(option[i][value] === undefined){
							var key = Object.keys(option[i])[0];
							for(var j=0;j<option[i][key].length;j++){
								if(option[i][key][j][value] == selectedValue){
									this.setData('cxPropSelected',"");
									this.setData('selectValue',option[i][key][j][name]);//NO I18n
									this.setData('selectedOption',{...option[i][key][j],...{_cxLabel:key}});
									this.setData('cxPropSelected',option[i][key][j][value]); //NO I18N
									this.setData('preventSelectedObs',false); //NO I18N
									break;
								}
							}
						}
					}
				}

			}
	},
	// to set selected value ...
	setSelectedData : function(){
		var option = this.getData("cxPropOptions"); //NO I18n
		var name = this.getData('cxPropUserValue'); //NO I18n
		var value = this.getData('cxPropSystemValue'); //NO I18n
		var display_value = this.getData('cxPropDisplayValue'); //NO I18N
		var selectedValue = this.getData("cxPropSelected"); ///NO I18N
		var selectedList = this.getData("cxPropSelectedList"); ///NO I18N
		var placeHolder = this.getData("cxPropPlaceholder"); //NO I18N
		var type = this.getData("cxPropType"); //NO I18N
		var optGroup = this.getData("optGroup"); //NO I18N
		this.setData('preventSelectedObs',true); //NO I18N
		if(((selectedValue != undefined && selectedValue != "" && selectedValue != "{}") || (selectedList && selectedList.length>0))&& !display_value){
			try {
			 	var selectedJson = JSON.parse(selectedValue);
			 	if(selectedJson.constructor == Object ){
					let selectedOption = option.flatMap((opt)=>{
						if(this.getData('optGroup') && this.checkOptOption(opt)){
							let groupLabel = Object.keys(opt)[0];
							return opt[groupLabel].map((item)=>{
								return {...item,...{_cxLabel:groupLabel}};
							});
						}
						return opt;
						
					}).find((opt)=>opt[value] === selectedJson[value]);
			 		this.setData('selectValue',selectedJson[name]);//NO I18n
					this.setData('selectedOption',selectedOption);
					this.setData('cxPropSelected',selectedJson[value]); //NO I18N
					this.setData('preventSelectedObs',false); //NO I18N
			 	}else{
			 		this.checkSelectedValue(option,name,value,display_value,selectedValue,placeHolder,type,optGroup);
			 	}
			}
			catch(err) {
				this.checkSelectedValue(option,name,value,display_value,selectedValue,placeHolder,type,optGroup);
			}

		}else if( (placeHolder == undefined || placeHolder == "" ) && (display_value == undefined || display_value == "")  && (type=='single' || type=='multi')){
			if(option != undefined && option != "undefined" && option.length !== 0){
						//first can be either normal option or optgroup
						var firstOpt;
						if((optGroup && type==='multi' && option[0][name]) || (!optGroup)){
							firstOpt = option[0];
						}else{
							firstOpt = option[0][Object.keys(option[0])[0]][0];
							firstOpt = {...firstOpt,...{_cxLabel:Object.keys(option[0])}};
						}
						this.setData("selectValue",firstOpt[name]);//NO I18N
						this.setData('selectedOption',firstOpt);
						this.setData("cxPropSelected",firstOpt[value]);
						this.setData('preventSelectedObs',false); //NO I18N

			}
		}else if(display_value !== "undefined" && display_value!== "" && display_value !== undefined){ //NO I18N
			this.setData("selectValue",display_value); //NO I18N
			this.setData('selectedOption',undefined);
		}
		this.setData('preventSelectedObs',false); //NO I18N
	},
	/**
	 * This will align the dropbox position according to dropbutton.
	 * @utility resetPosition
	 */
	resetPosition: function(){
		if(this.getData('showFieldsDropdown')){
		this.$node.querySelector("lyte-dropdown").resetPosition();
		}
	},
	/**
	 * This is used to open the dropdown.
	 * @utility open
	 */
	open: function(){
		if(!this.getData('cxPropDisabled') && !this.getData('showFieldsDropdown')){
			this.populateDropItems();
			this.setData('showFieldsDropdown',true)
			this.addClassForDropdown();
		}
		this.$node.querySelector("lyte-dropdown").open();
	},
	/**
	 * This is used to open/close the dropdown.
	 * @utility toggle
	 */
	toggle: function(){
		if(!this.getData('cxPropDisabled') && !this.getData('showFieldsDropdown')){
			this.populateDropItems();
			this.setData('showFieldsDropdown',true)
			this.addClassForDropdown();
		}
		this.$node.querySelector("lyte-dropdown").toggle();
	},
	/**
	 * This is used to close the dropdown.
	 * @utility close
	 */
	close:  function(){
		if(this.getData('showFieldsDropdown')){
		this.$node.querySelector("lyte-dropdown").close();
		}
	},
	didDestroy: function(){
		this.lyteDropBody = null;
	},
	init:function(){
		this.previousHasMoreOptions = this.getData('cxPropHasMoreOptions');
		this.searchParam = {page:1};
		this.scrollParam= {page:1};
		this.preventOptionsObs = false;
		this.callbackResolved = true;
		if(!this.getData('cxPropSearchNoResultMessage')){
			this.setData('cxPropSearchNoResultMessage',this.getData('cxPropNoResultMessage'));
		}
		this.$node.focus = function() {
			return this.component.focus();
		}
		// checks for opt group..setSelectedData();
		var option = this.getData('cxPropOptions');
		var type = this.getData("cxPropType"); //NO I18N
		if(option && option.length > 0 && (this.checkIfOptGroup(option))){
			this.setData("optGroup",true);//NO I18N
		}
		this.setSelectedData();
		if(this.getData('cxPropNonRemovableItems')){
			let mandatorySelected = new Set();
			this.getData('cxPropNonRemovableItems').forEach((opt)=>{
				mandatorySelected.add(opt);
			});
			this.setData('mandatorySelected',mandatorySelected);
		}
		// this.populateDropItems();
		// if(this.getData("cxPropDisabled")){
		// 	this.setData("cxPropTabindex",-1); //NO I18N
		// }
		// this.addKeyDownListener(); //FIXME: not needed
		if(this.getData("cxPropMandatory")){
			this.setData("dropClassList" , "mandatoryField");
		}
		this.convertLtPropJson();

	},
	checkIfOptGroup: function(option){
		if(this.getData('cxPropType')==='multi'){
			return true;
		}
		if(option[0]){
			return this.checkOptOption(option[0]);
		}
	},
	checkOptOption: function(option){
		if(option){
			let keys = Object.keys(option);
			return keys.length===1 && Array.isArray(option[keys[0]]);
		}
	},
	populateDropItems: function(){
		var option = this.getData("cxPropOptions");//NO I18n
		var limit = this.getData("cxPropLimit"); //NO I18N
		if(option && option.length > 0){
			if(this.getData('optGroup')){
				this.optTotalCount(option,'init');//NO I18N
			}else{
				// setting limit for rendering
				if(option.length > limit ){ //NO I18N
					if(this.data.cxPropSelected && this.data.cxPropType == 'single'){
						var i = option.cruxFindIndexOfObject(this.data.cxPropSystemValue,this.data.cxPropSelected);
						if(i > limit){
							let start = this.getStartIndexForRendering(i,limit,option.length);
							this.calculateDropItems(start,limit,true);//NO I18N
						}else{
							this.calculateDropItems(0,limit);//NO I18N
						}
					}else{
						this.calculateDropItems(0,limit);
					}
				}else {//NO I18N
					this.calculateDropItems(0,option.length);
				}
			}
			// this.setSelectedData();
		}
		else{
			this.setData("noResult", true);
		}
	},
	// addKeyDownListener: function(){
	// 	var _this = this;
	// 	$L(this.$node).keydown(function(event){ //NO I18N
	// 		if(event.originalEvent.keyCode === 	32 && !_this.getData("showFieldsDropdown")){
	// 			_this.setData("showFieldsDropdown",true); //NO I18N
	// 			if(event.target._callee.nodeName === "CRUX-DROPDOWN"){
	// 				event.target._callee.querySelector("lyte-dropdown").open(); //NO I18N
	// 			}else{
	// 				event.target._callee.open();
	// 			}
				
	// 		}else if(event.originalEvent.keyCode === 32 && _this.getData("showFieldsDropdown") ){ //NO I18N
	// 			event.target._callee.open();
	// 		}else if(event.originalEvent.keyCode === 40){
	// 			_this.scrollBox(event,_this.$node.querySelector('lyte-dropdown'));
	// 		}
			
	// 	})
	// },
	modifyDropboxClass:function(addClass,dropboxClass){
		if(!dropboxClass || !this.getData('showFieldsDropdown')){ return; }
		let dropbox = $L(this.$node.querySelector('lyte-dropdown').component.childComp);
		let node = dropbox[0] ? dropbox:
						$L('lyte-drop-box',this.$node);
		if(node){
			if(addClass){
				node.addClass(dropboxClass);
			}else{
				node.removeClass(dropboxClass);
			}
		}
	},
	modifyDropdownClass: function(addClass,dropdownClass){
		if(!dropdownClass){return }
		var node = this.getData('showFieldsDropdown') ? $L('lyte-dropdown',this.$node) : $L('.cxFakeDummyEventContainer',this.$node);
		if(addClass){
			node.addClass(dropdownClass)
		}else{
			node.removeClass(dropdownClass)
		}
	},
	errorObserver: function(change){
		this.modifyDropdownClass(change.newValue,'cxErrorBox')
	}.observes('isError'),
	disabledObserver: function(change){
		if(change){
			this.modifyDropdownClass(change.newValue,'cxDropdownDisabled');
		}else if(this.getData('cxPropDisabled')){
			this.modifyDropdownClass(true,'cxDropdownDisabled');
		}
	}.observes('cxPropDisabled').on('didConnect'),
	didConnect: function(){
		this.addClassForDropdown();
		if(this.getData('cxPropFocus')){
			this.focus();
		}
	},
	dropboxClassObserver: function(change){
		let dropboxClass = '';
		switch(change.item){
			case 'processCompleted':
				dropboxClass = 'cxDDRefreshCompleted';
			break;
			case 'applyTransition':
				dropboxClass = 'cxDDRefreshTransition';
			break;
			// case 'cxPropBoxClass':
			// 	if(change.oldValue){
			// 		this.modifyDropboxClass(false,(change.oldValue));
			// 	}
			// 	dropboxClass = change.newValue;
			// break;
			case 'optArr':
			case 'cxPropOptions':
				if(this.getData('cxPropType')!=='multisearch' &&
					((this.getData('optGroup') && this.getData('optArr') && this.getData('optArr').length>this.getData('cxPropMaxsearch'))||
					(!this.getData('optGroup') && this.getData('cxPropOptions') && this.getData('cxPropOptions').length>this.getData('cxPropMaxsearch')))){
						this.modifyDropboxClass(true,'cxDropboxWithSearch');

				}else{
					this.modifyDropboxClass(false,'cxDropboxWithSearch');

				}
				return;
		}
		this.modifyDropboxClass(change.newValue,dropboxClass);

	}.observes('processCompleted','applyTransition','optArr','cxPropOptions'),
	classObserver: function(change){
		var dropdownClass = '';
		let addClass = change.newValue ? true : false;
		switch(change.item){
			case 'cxPropClass':
				if(change.oldValue){
					this.modifyDropdownClass(false,(change.oldValue));
				}
				dropdownClass = change.newValue;
				addClass = true;
			break;
			case 'cxPropMandatory':
				dropdownClass = 'mandatoryField';
			break;
			case 'cxPropDisabled':
				dropdownClass = 'cxDropdownDisabled';
			break;
			case 'isError':
				dropdownClass = 'cxErrorBox';
			break;
			case 'cxPropMandatoryType':
				dropdownClass = 'cxMandatoryOptEnabled';
				addClass = this.getData('cxPropMandatoryType') !== 'red_accent_line' ? true: false;
			break;
		}
		this.modifyDropdownClass(addClass,dropdownClass);

	}.observes('cxPropClass','cxPropMandatory','cxPropDisabled','isError','cxPropMandatoryType'),
	errorMessageObserver:function(){
		if(this.ignoreErrorObs){
			return;
		}
		if(this.getData('cxPropErrorMessage')){
			this.setData("isError",true); //NO I18N
		}else{
			this.setData("isError",false); //NO I18N
		}	
	}.observes('cxPropErrorMessage').on('init'), //NO I18n
	validate : function(){
		if(this.getData("cxPropMandatory") && this.checkIfSelectedEmpty()){ //NO I18N
			if(this.getMethods('onError')){
				this.getMethods('onError',this);
			}else if(!this.getData('cxPropErrorMessage')){
					this.ignoreErrorObs = true;
					this.setData('cxPropErrorMessage',_cruxUtils.getI18n('crm.orchestration.error.selectvalue'));
					this.ignoreErrorObs = false;
			}
			this.setData("isError",true); //NO I18N
			return false;
		}
		this.getData('cxPropErrorMessage','');
		this.setData("isError",false); //NO I18N
		return true;
	},
	arrObserver:function(){
		if(this.preventOptionsObs){
			return;
		}
		this.setData('preventSelectedObs',true); //NO I18N
		var type = this.getData("cxPropType"); //NO I18N
		var option = this.getData("cxPropOptions");//NO I18N
		var value = this.getData("cxPropSystemValue"); //NO I18N
		var selectedOption = [];
		var selectValue = this.getData("cxPropSelected"); //NO I18N
		var limit = this.getData('cxPropLimit');
		if(option == undefined){
			this.setData("localData",[]);
			this.setData("noResult",true); //NO I18N
			return;
		}
		this.labelSet = new Set();
		//only if dropdown is rendered calculate drop items
	if(this.getData('showFieldsDropdown')){
		if(this.getData("cxPropOptions").length > 0){
			this.setData("noResult",false); //NO I18N
			option = this.getData("cxPropOptions");//NO I18N
			if(this.checkIfOptGroup(option)){
				this.setData("optGroup",true);//NO I18N
				this.optTotalCount(option,'init');//NO I18N

					if(selectValue){
						for(var i = 0; i < option.length; i++){
							if(option[i][value] != undefined ){
								if(selectedOption.length === 0){
									selectedOption = $L.search(option[i],value,selectValue);
								}
							}else{
								for (let key in option[i]) {
									if(selectedOption.length === 0){
								   		 selectedOption = $L.search(option[i][key], value, selectValue);
									}
								}
							}
						}
					}
			}else{ 
				if(type === "single"){
					selectedOption =  $L.search(option,value,selectValue,'equals');
					limit = this.getData("cxPropLimit"); //NO I18N
					if(selectedOption.length > 0 && !this.getData('cxPropDisplayValue')){
						this.setData('selectValue',selectedOption[0][this.getData('cxPropUserValue')]); //NO I18N
						this.setData('selectedOption',selectedOption[0]);
					}
				}
				let index;
				if(type === "single" 
					&& option.length > limit 
						&& this.data.cxPropSelected
							&& (index = option.cruxFindIndexOfObject(this.data.cxPropSystemValue,this.data.cxPropSelected))>limit){
							let start = this.getStartIndexForRendering(index,limit,option.length);
							this.calculateDropItems(start,limit,true);//NO I18N
				}else{
					if(option.length < limit){
						this.calculateDropItems(0,option.length);//NO I18N
					}else{
						this.calculateDropItems(0,limit);//NO I18N
					}
				}
					
			}
				if(selectedOption.length < 1 && !this.getData("cxPropPlaceholder") && !this.getData('cxPropDisplayValue') && type === "single"){
						if(option[0][value]!==undefined){
							this.setData("cxPropSelected",option[0][value]);
							this.setData('preventSelectedObs',false); //NO I18N
							this.setData("selectValue",option[0][this.getData('cxPropUserValue')]); //NO I18N
							this.setData('selectedOption',option[0]);
						}else{
						var key = Object.keys(option[0]);
						this.setData("cxPropSelected",option[0][key][0][value]);
						this.setData('preventSelectedObs',false); //NO I18N
						this.setData("selectValue",option[0][key][0][this.getData('cxPropUserValue')]); //NO I18N
						this.setData('selectedOption',option[0][key][0]);
						}
				}else if(selectedOption.length > 0 && !this.getData("cxPropPlaceholder") && !this.getData('cxPropDisplayValue')){
					this.setData("cxPropSelected",selectedOption[0][value]);
					this.setData('preventSelectedObs',false); //NO I18N
					this.setData("selectValue",selectedOption[0][this.getData('cxPropUserValue')]); //NO I18N
					this.setData('selectedOption',selectedOption[0]);
				}
			this.checkNoResult();
		}else{
			this.setData("localData",[]);
			this.setData("noResult",true); //NO I18N
		}
	}else{
		if(this.getData("cxPropOptions").length > 0){
			this.setData("noResult",false); //NO I18N
			option = this.getData("cxPropOptions");//NO I18N
			if(this.checkIfOptGroup(option)){
				this.setData("optGroup",true);//NO I18N
					if(selectValue){
						let optLength = option.length;
						for(let i = 0; i < optLength; i++){
							if(option[i][value] != undefined ){
								if(selectedOption.length === 0){
									selectedOption = $L.search(option[i],value,selectValue);
								}
							}else{
								for (let key in option[i]) {
									if(selectedOption.length === 0){
										 var obj = {};
								   		 selectedOption = $L.search(option[i][key], value, selectValue);
									}
								}
							}

						}
					}
			}else if(type === "single"){ //NO I18N
					selectedOption =  $L.search(option,value,selectValue,'equals');
					var limit = this.getData("cxPropLimit"); //NO I18N
					if(selectedOption.length > 0 && !this.getData('cxPropDisplayValue')){
						this.setData('selectValue',selectedOption[0][this.getData('cxPropUserValue')]); //NO I18N	
						this.setData('selectedOption',selectedOption[0]);
					}
				}
				if(selectedOption.length < 1 && !this.getData("cxPropPlaceholder") && !this.getData('cxPropDisplayValue') && type === "single"){
						if(option[0][value]){
							this.setData("cxPropSelected",option[0][value]);
							this.setData('preventSelectedObs',false); //NO I18N
							this.setData("selectValue",option[0][this.getData('cxPropUserValue')]); //NO I18N
							this.setData('selectedOption',option[0]);
						}else{
						var key = Object.keys(option[0]);
						this.setData("cxPropSelected",option[0][key][0][value]);
						this.setData('preventSelectedObs',false); //NO I18N
						this.setData("selectValue",option[0][key][0][this.getData('cxPropUserValue')]); //NO I18N
						this.setData('selectedOption',option[0][key][0]);
						}
				}else if(selectedOption.length > 0 && !this.getData("cxPropPlaceholder") && !this.getData('cxPropDisplayValue')){
					this.setData("cxPropSelected",selectedOption[0][value]);
					this.setData('preventSelectedObs',false); //NO I18N
					this.setData("selectValue",selectedOption[0][this.getData('cxPropUserValue')]); //NO I18N
					this.setData('selectedOption',selectedOption[0]);
				}
		}
	}	
	this.setData('preventSelectedObs',false); //NO I18N

	}.observes('cxPropOptions.[]'), //NO I18n

	displayObserver:function(){
		if(!this.preventDisplayObs){
			var type = this.getData('cxPropType');
			if(type=="single" || type=="multi"){
				this.setData('selectValue',this.getData("cxPropDisplayValue"))
				this.setData('selectedOption',undefined);
			}
		}	
	}.observes('cxPropDisplayValue'), //NO I18n
	checkNoResult: function(){
		var type = this.getData('cxPropType');
		if(type==='multiple' || type==='multisearch'){
			let dropComp = this.$node.querySelector("lyte-dropdown");
			if(dropComp && dropComp.component.childComp && !dropComp.component.childComp.querySelector("lyte-drop-item:not(.lyteDropdownActive)")){
				this.setData("noResult", true);
			}
			else{
				this.setData("noResult", false);
			}
		}
	},
	selectedListObserver: function(){
		if((this.getData('cxPropType')==='multiple' || this.getData('cxPropType')==='multisearch') &&!this.getData('preventSelectedObs')){
			var selectedList = this.getData('cxPropSelectedList');
			var dummy = [];
			var display = [];
			if(selectedList){
				var value = this.getData('cxPropSystemValue'); //NO I18n
				selectedList.forEach(function(selected){
					display.push(selected);
					dummy.push(selected[value]);
				})
			}
			this.setData('preventSelectedObs',true); //NO I18N
			this.setData('cxPropSelected',dummy); //NO I18N
			this.setData('preventSelectedObs',false); //NO I18N
			this.setData('displayValue',display); //NO I18N

			if(!this.getData('showFieldsDropdown')){
				this.modifyDropdownClass(this.checkIfSelectedEmpty(),'cxFakeDropNoOptSelected')
			}else{
				this.checkNoResult();
			}
		}
	}.observes('cxPropSelectedList.[]'),
	selectObserver:function(change){
		if(this.getData('cxPropShowMaxLimitMessage') && this.getData('cxPropMaxCount') && (this.getData('cxPropType') === 'multiple' || this.getData('cxPropType') === 'multisearch')){
			let selectList = this.getData('cxPropSelected') ? JSON.parse(this.getData('cxPropSelected')) : '';
			this.setData('maxLimitReached',selectList && selectList.length >= this.getData('cxPropMaxCount') ? true : false );
		}
		if(this.getData('preventSelectedObs') || !change){
			if(!change){
				this.checkIfSelectedEmpty();
			}
			return;
		}
		if(change.newValue != "" && change.newValue != undefined){
			this.setData('preventSelectedObs',true); //NO I18N
			var option = this.getData("cxPropOptions"); //NO I18N
			var value = this.getData("cxPropSystemValue"); //NO I18N
			var name = this.getData("cxPropUserValue");//NO I18N
			if(this.getData("cxPropOptions").length > 0 && this.getData("cxPropType") !== "multiple"){
				if(this.getData("cxPropType") !== "single"){
					//resetting selected list
					this.setData('cxPropSelectedList',[])
					this.setSelectedData();
				}else if(!this.getData("optGroup")){ //NO I18N
					// if(!this.getData("cxPropDisplayValue")){
						if(change.newValue !== "" ){
						for(var i=0;i<option.length;i++){
							if(option[i][value] == change.newValue){
								this.setData("selectValue",option[i][name]);
								this.setData("selectedValueIndex",i); //NO I18N
								this.setData('selectedOption',option[i]);
								this.setData('preventSelectedObs',false); //NO I18N
							}
						}
					}else{
						if(this.getData("cxPropPlaceholder")){
							this.setData("selectValue","");
							this.setData('selectedOption',undefined);
						}else{
							this.setData("selectValue",option[0][name]);
							this.setData('selectedOption',option[0]);
							this.setData("selectedValueIndex",0); //NO I18N
						}
					}
					// }
				}else{
					var key ;
					let optLength = option.length;
						for(let i = 0;i<optLength;i++){
							key = Object.keys(option[i])[0];
							for(var j =0;j<option[i][key].length;j++){
								if(option[i][key][j][value]){
									if(option[i][key][j][value] == change.newValue){
							        	this.setData('cxPropSelected',option[i][key][j][value]);
							        	this.setData('preventSelectedObs',false); //NO I18N
										this.setData('selectValue',option[i][key][j][name]);//NO I18n
										this.setData('selectedOption',{...option[i][key][j],...{_cxLabel:key}});
										break;
								     }
								 }else{
								 	var key1 = option[i][value]
								 	if(key1 === change.newValue){
								 		this.setData('cxPropSelected',option[i][value]);
								 		this.setData('preventSelectedObs',false); //NO I18N
										this.setData('selectValue',option[i][name]);//NO I18n
										this.setData('selectedOption',option[i]);
										break;
								 	}
								 }

							 }
						}
				}
			}else{
				this.setData('cxPropSelectedList',[])
				this.checkSelectedValue(option,name,value,this.getData("display_value"),this.getData("cxPropSelected"),this.getData("cxPropPlaceHolder"),this.getData('cxPropType'),this.getData('optGroup'))
			}
			this.setData('preventSelectedObs',false); //NO I18N
		}else{
			if(this.getData("cxPropType") === "multiple" || this.getData("cxPropType") === "multisearch"){
				this.setData('displayValue',[]); //NO I18N
				this.setData('preventSelectedObs',true); //NO I18N
				this.setData('cxPropSelectedList',[]); //NO I18N
				this.setData('preventSelectedObs',false); //NO I18N
			}else{
				this.setData('selectValue',"");
				this.setData('selectedOption',undefined);
			}
		}
		if(!this.getData('showFieldsDropdown')){
			this.modifyDropdownClass(this.checkIfSelectedEmpty(),'cxFakeDropNoOptSelected')
		}else{
			this.checkNoResult();
		}
		if(this.getData("cxPropType") === "multiple" || this.getData("cxPropType") === "multisearch"){
			this.checkDropItemsCount();
		}

	}.observes('cxPropSelected').on('didConnect'), //NO I18n
	checkDropItemsCount: function(){
		if(this.lyteDropBody && this.lyteDropBody.scrollHeight == this.lyteDropBody.clientHeight){
			this.renderScroll(this.getData('optGroup')?'opt':'single');
		}
	},
	checkIfSelectedEmpty: function(){
		var selected = this.getData('cxPropSelected');
		try{
			selected = (this.getData('cxPropType')!=="single")?JSON.parse(selected):selected;
		}catch(exception){
			selected = '';
		}
		if(selected && selected!=='--None--' && selected.length!==0){
			return false;
		}else
		{
			return true;	
		}
	},
	addClassForDropdown: function(){
		var dropdownClass = (this.getData('cxPropClass') ? this.getData('cxPropClass') : '')
							+(this.getData('cxPropMandatory') ? ' '+'mandatoryField': '')
							+(this.getData('cxPropMandatoryType') !== 'red_accent_line' ? ' '+'cxMandatoryOptEnabled':'')
	   						+(this.getData('isError') ? ' '+'cxErrorBox': '')
							+(this.getData('cxPropType')==='multiple' || this.getData('cxPropType')==='multisearch' ? ' '+' cxDropdownMultiSelect':'');
		//disabled and noopt will be handled by lyte dropdown
		if(!this.getData('showFieldsDropdown')){
			dropdownClass += (this.getData('cxPropDisabled') ? ' '+'cxDropdownDisabled': '')
							+ (this.checkIfSelectedEmpty() ? ' '+'cxFakeDropNoOptSelected': '')
		}
				
		this.modifyDropdownClass(true,dropdownClass);
		var lyteDropdown = this.$node.querySelector("lyte-dropdown");
		if(lyteDropdown){
			$L(lyteDropdown).addClass(this.getData("cxPropClass")+' '+this.getData("dropClassList"));
			// $L(this.$node.querySelector("lyte-dropdown")).addClass(this.getData("dropClassList"));
		}
		//adding class for dropbox
			if(this.getData('showFieldsDropdown') && this.getData('cxPropType')!=='multisearch' &&
					((this.getData('optGroup') && this.getData('optArr') && this.getData('optArr').length>this.getData('cxPropMaxsearch'))||
					(!this.getData('optGroup') && this.getData('cxPropOptions') && this.getData('cxPropOptions').length>this.getData('cxPropMaxsearch')))){
						this.modifyDropboxClass(true,'cxDropboxWithSearch');
			}
	},
	//get the option which will be highlighted after search
	getSelectionOption: function(options){
		if(options && options.length>0){
			var selectOpt;
			if(this.getData('cxPropType')==='single' || this.getData('cxPropType')==='multi'){
				selectOpt = options.find((opt)=>{return !this.getData('optGroup') || (this.getData('optGroup') && !this.checkOptOption(opt))});
			}else{
				var parseSelected = this.getData('cxPropSelected') ? JSON.parse(this.getData('cxPropSelected')): [];
				selectOpt = options.filter((opt)=>{return !this.getData('optGroup') || (this.getData('optGroup') && !this.checkOptOption(opt))}).find(function(opt){
					return !parseSelected.includes(opt[this.getData('cxPropSystemValue')])
				}.bind(this))
			}
			return selectOpt;
		}
		//do not know use of below code
		// if(this.getData("localData")[0].id == -1 && this.getData("localData")[1]){
		// 	this.setData('selectionValue',this.getData("localData")[1][this.getData('cxPropSystemValue')]);
		// 	// this.getData("localData")[1].isFirst = true; 
		// }else if(this.getData("localData")[0].id !== -1){
		// 	this.setData('selectionValue',this.getData("localData")[0][this.getData('cxPropSystemValue')]);
		// 	// this.getData("localData")[0].isFirst = true; 
		// }
	},
	keyDownEvent : function(){
		if(this.getData('showFieldsDropdown') && this.$node.cxProp('aria')){
			this.bindEventForAria();
		}
	}.observes('showFieldsDropdown', 'cxPropAria'),
	scrollItemIntoView: function(body,center,itemNode){
		var type = this.getData('cxPropType');
		if(type==='single' || type==='multi'){
			var selected = this.getData('cxPropSelected');
			var node = itemNode ? itemNode : body.querySelector(`[data-zcqa="${selected}"]`);
			if(node){
				if(center){
					let containerScrollTop = body.scrollTop;
					let elementTop = node.offsetTop;
					let containerHeight = body.offsetHeight;
					let elementHeight = node.offsetHeight;
					if(elementTop <= containerScrollTop || (elementTop>containerScrollTop && elementTop + elementHeight <= containerScrollTop + containerHeight)){
						body.scrollTop = elementTop - (containerHeight/2);
					}else if(elementTop >=  (containerScrollTop+containerHeight-elementHeight)){
						body.scrollTop = elementTop + elementHeight - (containerHeight/2);
					}
				}else if(node && node!==body.querySelector('lyte-drop-item')){//no need to scroll first option
					node = node.previousElementSibling ? node.previousElementSibling : node;
					body.scrollTop = node.offsetTop + node.offsetHeight;
				}
			}
		}
	},
	// renderOptionsOnInterval: function(search,complete){
	// 	if(this.data.topPosition){
	// 		if(search){
	// 			this.scrollItemIntoView(this.lyteDropBody)
	// 		}
	// 		this.renderUp = setInterval(function(){
	// 				var start = (this.data.topPosition>50)?(this.data.topPosition - 50):0;
	// 				var count = (this.data.topPosition>50)?50:this.data.topPosition;
	// 				this.calculateDropItems(start ,count,undefined,true)
	// 				if(start===0){
	// 					this.setData('topPosition',undefined)
	// 					clearInterval(this.renderUp)
	// 					if(complete){
	// 						complete();
	// 					}
	// 					// if( (this.getData('cxPropType')=='single' && this.getData('optGroup')) || this.getData('cxPropType')=='multi'){
	// 					// 	let item = this.lyteDropBody.querySelector('.lyteDropdownSelection');
	// 					// 	if(item){
	// 					// 		this.moveIntoView(item,this.lyteDropBody);
	// 					// 	}
	// 					// }
	// 				}
	// 		}.bind(this),10)
	// 	}else if(complete){
	// 		complete();
	// 	}
	// },
	actions:{
		refreshClicked: function(){
			this.setData('processRefresh',true);
			let dropdown = this.$node.querySelector("lyte-dropdown");
			if(this.getData('searchPerformed')){
				let searchElem;
				if(this.getData('cxPropType')==='multisearch'){
					searchElem = this.$node.querySelector('lyte-input');
				}else{
					searchElem = dropdown.component.childComp.querySelector('lyte-input');
				}
				searchElem.ltProp('value','');
			}
			if(this.getMethods('onRefresh')){
				let resp = this.executeMethod('onRefresh');
				if(resp instanceof Promise){
					resp.then((newOptions)=>{
						this.setData('processCompleted',true);
						setTimeout(() => {
							this.setData('applyTransition',true);							
						}, 10);
						//find new options and highlight
						if(newOptions && newOptions.length){
							let optionSet = new Set();
							let insertedOptions;
							this.data.cxPropOptions.forEach((opt)=>{ optionSet.add(opt[this.getData('cxPropSystemValue')]); });
							insertedOptions = newOptions.filter(opt=>!optionSet.has(opt[this.getData('cxPropSystemValue')]));
							this.setData('cxPropOptions',newOptions);
							if(dropdown.resetSelected){
								dropdown.resetSelected();
							}
							if(insertedOptions && insertedOptions.length){
								let firstInsteredOption = dropdown.component.childComp.querySelector(`[data-zcqa="${insertedOptions[0][this.getData('cxPropSystemValue')]}"]`);
								this.scrollItemIntoView(this.lyteDropBody,false,firstInsteredOption);
								insertedOptions.forEach((opt)=>{
									Lyte.objectUtils(opt,'add','cxNewOption',true);
								});
							}
						}
					}).finally(()=>{
						setTimeout(() => {
							this.setData('processCompleted',false);
							this.setData('processRefresh',false);
							this.setData('cxPropShowRefreshButton',false);
						}, 300);
						setTimeout(() => {
							this.setData('applyTransition',false);							
						}, 1100);
					});
				}
			}
		},
		dropItemHover: function(over,elem,option){
			if(over){
				if(this.getData('cxPropShowInfoIconOnHover') && option[this.getData('cxPropInfoValue')] || option.cxPropInfoTooltip){
					elem.classList.add('cxDItemShowInfoIcon')
				}
				if(this.getData('maxLimitReached')){
					let textNode = elem.querySelector('lyte-text');
					let hasTooltip = textNode.scrollWidth >textNode.offsetWidth;
					_cruxUtils._showDisabledTooltip(true,`#${elem.id} lyte-text`,_cruxUtils.getI18n('crm.massmail.limit.title'),hasTooltip?option[this.getData('cxPropUserValue')]:undefined);
					this.tooltipShown = true;
				}else if(option[this.getData('cxPropDisabledTooltipValue')] && elem.classList.contains('lyteDropdown-disabled')){
					let textNode = elem.querySelector('lyte-text');
					let hasTooltip = textNode.scrollWidth > textNode.offsetWidth;
					_cruxUtils._showDisabledTooltip(true,`#${elem.id} lyte-text`,option[this.getData('cxPropDisabledTooltipValue')],hasTooltip?option[this.getData('cxPropUserValue')]:undefined);
					this.tooltipShown = true;
				}
				if(this.getMethods('onDropItemHover')){
					this.executeMethod('onDropItemHover',elem,option);
				}
			}else{
				if(elem.classList.contains('cxDItemShowInfoIcon')){
					elem.classList.remove('cxDItemShowInfoIcon')
				}
				if(this.tooltipShown){
					_cruxUtils._showDisabledTooltip(false);
				}
				if(this.getMethods('onDropItemLeave')){
					this.executeMethod('onDropItemLeave',elem,option);
				}
			}
		},
		infoShow: function(elem,value,show){
			if(show && this.getMethods('onShowInfo')){
					this.executeMethod('onShowInfo',elem,value);
			}else if(this.getMethods('onHideInfo')){
					this.executeMethod('onHideInfo',elem,value);
			}
		},
		infoClick: function(elem,value){
			if(this.getMethods('onClickInfo')){
				/**
				 * @method onClickInfo
				 * @author gowtham.mp
				 * @version 1.0.0
				 * Called when user clicks on the info icon
				 */
				this.executeMethod('onClickInfo',elem,value);
			}
		},
		iconClick: function(elem,value){
			if(this.getMethods('onIconClick')){
				/**
				 * @method onIconClick
				 * @author gowtham.mp
				 * @version 1.0.0
				 * Called when user clicks on the info icon
				 */
				this.executeMethod('onIconClick',elem,value);
			}
		},
		clearSelection: function(){
			this.setData('cxPropSelected','')
			event.stopPropagation();
			if(this.getMethods("onClear")){
				/**
				 * @method onClear
				 * @author gowtham.mp
				 * @version 1.0.0
				 * Called when user clicks on the clear icon
				 */
				this.executeMethod("onClear");//No I18n
			}
		},
		renderDropDown: function(event){
			if(!this.getData('cxPropDisabled') && !this.getData('showFieldsDropdown')){
				var type=this.getData('cxPropType')
				//during focus and mouseover only multiple and multisearch dropdown should be rendered
				if((event.type==='focus' || event.type==='mouseover') && (type==='multiple' || type==='multisearch')){
					this.populateDropItems();
					this.setData('showFieldsDropdown',true);//NO I18n
					this.addClassForDropdown();
					if(event.type==='focus'){
						this.setData('dropdownFocus',true)
		_cruxUtils.addMurhyInfo("crux-dropdown.js", "Feb Default Changes");
						if(type==='multisearch'){
							this.open();
						}
					}
				}else if(event.type==='click' || event.type==='keydown'){
					if(event.type==="keydown" && (event.keyCode===32 || event.keyCode===40)){
						this.populateDropItems();
						this.setData('dropdownFocus',true)
						this.setData('showFieldsDropdown',true);//NO I18n
						this.addClassForDropdown();
						this.open();
						event.preventDefault();
					}else if(event.type==='click'){
						this.populateDropItems();
						this.setData('dropdownFocus',true)
						this.setData('showFieldsDropdown',true);//NO I18n
						this.addClassForDropdown();
						this.open();
					}
				}
			}

			
		}
	},
	methods:{
		keyNavigation: function(drop,item){
			if(this.getMethods('onKeyNavigation')){	 
				return this.executeMethod('onKeyNavigation',drop,item);
			}
		},
		setScroll : function(event,element){
			$L(element.parentElement.querySelector('lyte-drop-body')).scrollTop(0); //NO I18N
		},
		dropBoxOpen:function(event,component){
			// var options = this.getData("cxPropOptions"); //NO I18N
			// this.setData("cxPropOptions",[]); //NO I18N
			// this.setData("cxPropOptions",options); //NO I18N
			var _this = this;
					_cruxUtils.addMurhyInfo("crux-dropdown.js", "Feb Default Changes");

			if(!this.lyteDropBody){
				this.lyteDropBody  = component.childComp.querySelector('lyte-drop-body');
			}
			setTimeout(function () {
				if(_this.getData('cxPropType')=='multiple' || _this.getData('cxPropType')=='multisearch'){
					_this.checkDropItemsCount();
				}
			}, 100);
			var searchEle = component.childComp.querySelector("lyte-input")?component.childComp.querySelector("lyte-input"):component.$node.querySelector("lyte-input"); //NO I18N
			if(searchEle){
				searchEle.focus();
			}
			//check if there is option available for user to select, in case of multisearch only if there is no search
			if(_this.getData('cxPropType')=='multiple' || (_this.getData('cxPropType')=='multisearch' && !this.$node.querySelector('lyte-input').ltProp('value'))){
					_this.checkDropItemsCount();
			} 
				if(this.data.cxPropType == 'single'){
				var body = this.lyteDropBody;
				this.scrollItemIntoView(body,true);
				}


			// $L(component.childComp.lastElementChild).scrollTop(0);
			if(component.childComp.querySelectorAll('lyte-drop-item').length === 0 || (component.childComp.querySelectorAll('lyte-drop-item:not(.lyteDropdownActive)').length === 0 && component.childComp.querySelectorAll('lyte-drop-item:not(.lyteSearchHidden)').length)){
                this.setData('noResult',true); //NO I18N
            }else{
                 this.setData('noResult',false); //NO I18N
            }
			if(this.getMethods('onShow')){//NO I18n
				/**
				 * This callback is fired when the dropdown is opened.
				 * @method onShow
				 * @param { event } event - The event that triggered the dropdown open
				 * @param { * } component - The instance of lyte dropdown
				 */
				this.executeMethod('onShow',event,component);//NO I18n
			};

		},
		optionSelect : function(event,selectedValue,component,dropItem) {
			let option,
			index = dropItem.getAttribute('data-index'),
			key = dropItem.getAttribute('data-key'),
			localData = this.data.localData;
			if(index){
				if(key){
					let group  = localData.find((innerGrp)=>{
						return innerGrp[key];
					});
					if(group && group[key]){
						option = group[key][parseInt(index)];
					}
				}else{
					option = localData[parseInt(index)];
				}
			}
			this.setData('selectValue',option[this.getData('cxPropUserValue')]);//NO I18n
			this.setData('selectedOption',option);
			this.setData('preventSelectedObs',true); //NO I18N
			this.setData('cxPropSelected',selectedValue);//NO I18n
			this.setData('preventSelectedObs',false); //NO I18N
			if(this.getMethods('onOptionSelect')){//NO I18n
				/**
				 * This callback will only be fired for single select dropdown.
				 * @method onOptionSelect
				 * @param { event } event - The event that triggered the option selection
				 * @param { string } selectedValue - The value that was selected
				 * @param { component } component - The instance of lyte dropdown
				 * @param { node } dropItem - The selected drop item node
				 */
				this.executeMethod('onOptionSelect',event,selectedValue,component,dropItem);//NO I18n
			};
		},
		onOptionChange : function(event,selectedValue,component,dropItem) {
			if(this.getData('cxPropClearErrorMessage') && this.getData('isError')){
				this.setData('isError',false);
			}
			// this.setData('selectValue',dropItem.innerText);//NO I18n		
			this.setData('preventSelectedObs',true); //NO I18N
			this.setData('cxPropSelected',selectedValue);//NO I18n
			this.setData('preventSelectedObs',false); //NO I18N
			if(this.getMethods('onChange')){//NO I18n 
				/**
				 * This callback is fired only when the selected value changes, works for both single and multiple select dropdown.
				 * @method onChange
				 * @param { event } event - The event that triggered the selection change.
				 * @param { string } selectedValue - The value that was selected
				 * @param { component } component - The instance of lyte dropdown
				 * @param { node } dropItem - The selected drop item node
				 */
				return this.executeMethod('onChange',event,selectedValue,component,dropItem);//NO I18n
			};
		},
		onBeforeSelect : function (event,selectedValue,component,dropItem,value) {
			if(this.getMethods('beforeSelect')){//NO I18n	 
				/**
				 * This callback is fired before the on-option-selected or the on-change callback. It is only applicable for single select dropdowns
				 * @method beforeSelect
				 * @param { event } event - The event that triggered the option selection
				 * @param { string } selectedValue - Previous selected value
				 * @param { component } component - The instance of lyte dropdown
				 * @param { node } dropItem - The selected drop item node
				 * @param { string } value - current selected value
				 */
				return this.executeMethod('beforeSelect',event,selectedValue,component,dropItem,value);//NO I18n
			};
		},
		hideDropbox:function(event,component){
			this.setData('preventSelectedObs',false); //NO I18N

			var searchEle = component.$node.querySelector('lyte-input');
			searchEle = searchEle?searchEle:component.childComp ? component.childComp.querySelector("lyte-input") : undefined; //NO I18N
			if(searchEle){
				searchEle.ltProp('value',''); //NO I18n
			}
			if(this.getMethods('onHide')){//NO I18n
				/**
				 * This callback is fired when the dropdown is closed.
				 * @method onHide
				 * @param { event } event - The event that triggered the dropdown close
				 * @param { component } component - The instance of lyte dropdown
				 */
				this.executeMethod('onHide',event,component);//NO I18n
			};
			if(this.getData('noResult')){
				this.setData("noResult",false); //NO I18N
			}

		},
		beforeHideDropbox:function(event,component){
			if(this.getMethods('onBeforeHide')){//NO I18n	
				/**
				 * This callback is fired before the dropdown is closed.
				 * @method onBeforeHide
				 * @param { event } event - The event that triggered the dropdown close
				 * @param { component } component - The instance of lyte dropdown
				 */
				return this.executeMethod('onBeforeHide',event,component)//NO I18n
			};
			clearInterval(this.renderUp)
		},
		addDropItem:function(event,selectItem,selected,component,dropItem){
			_cruxUtils.addMurhyInfo("crux-dropdown.js", "Feb Default Changes");
			var searchElem ;
			var searchValue;
			var type = this.getData('cxPropType'); //NO I18N
			var option = this.getData('optGroup') ? this.getData('optArr') : this.getData("localData");

			// var option = this.getData("cxPropOptions"); //NO I18N
			var value = this.getData('cxPropSystemValue'); //NO I18N
			var selectedList =  this.getData('cxPropSelectedList'); //NO I18N
			if(type =='multisearch'){ //NO I18n
				searchElem = this.$node.querySelector('.lyteInput'); //NO I18n
			}else if(type =='multiple'){ //NO I18n
				searchElem = component.childComp.querySelector("lyte-input"); //NO I18n
			}
			if(searchElem){
				searchValue = searchElem.ltProp('value');
				searchElem.focus();
				searchElem.ltProp('value',''); //NO I18n
			}
			if(this.getData("cxPropSelected") && this.getData("cxPropSelected").length > 0){
				var dummy = JSON.parse(this.getData("cxPropSelected")); //NO I18N
			}else{
				var dummy = [];
			}
			var display = this.getData("displayValue"); //NO I18N
			for(var j=0;j<option.length;j++){
				if(selectItem == option[j][value]){
					display.push(option[j]);
					if(!dummy.includes(selectItem)){
						dummy.push(option[j][value]);
					}
					break;
				}
			}
			var parent = dropItem.closest('lyte-drop-body');
			if(parent.querySelectorAll('lyte-drop-item:not(.lyteSearchHidden)').length === 0 || parent.querySelectorAll('lyte-drop-item:not(.lyteDropdownActive)').length === 0){
                this.setData('noResult',true); //NO I18N
            }else{
                 this.setData('noResult',false); //NO I18N
            }
            this.setData('preventSelectedObs',true); //NO I18N
			if(selectedList){
				var there = selectedList.find(function(opt){return opt[value]===selectItem;})
				if(!there){
					Lyte.arrayUtils(selectedList,'push',display[display.length-1])
				}
			}
			// this.setData('cxPropSelected',"");
			this.setData('cxPropSelected',JSON.stringify(dummy)); //NO I18N
			//when option is selected after search, onSearch callback is invoked when ltPropValue is set to empty
			if(!searchValue){
					this.checkDropItemsCount();
			}

			this.setData('preventSelectedObs',false); //NO I18N
			this.setData('displayValue',[]); //NO I18N
			this.setData('displayValue',display); //NO I18N
			// this.setData('cxPropDisplayValue',selected);//NO I18n
			if(this.getMethods('onAdd')){//NO I18n
				/**
				 * This callback is fired when an option is selected in multiple select dropdown.
				 * @method onAdd
				 * @param { event } event - The event that triggered the option selection.
				 * @param { string } selectItem - current selected value.
				 * @param { string } selected - all the selected value.
				 * @param { component } component - The instance of lyte dropdown.
				 * @param { node } dropItem - current selected drop item node.
				 */
				this.executeMethod('onAdd',event,selectItem,selected,component,dropItem);//NO I18n
			};

		},
		beforeAddDropItem : function(event,selectItem,selected,component,dropItem){
			if(this.getMethods('onBeforeAdd')){//NO I18n
				/**
				 * This callback is fired before on-add callback.
				 * @method onBeforeAdd
				 * @param { event } event - The event that triggered the option selection.
				 * @param { string } selectItem - current selected value.
				 * @param { string } selected - all the selected value.
				 * @param { component } component - The instance of lyte dropdown.
				 * @param { node } dropItem - current selected drop item node.
				 */
				return this.executeMethod('onBeforeAdd',event,selectItem,selected,component,dropItem);//NO I18n
			};
		},
		removeDropItem:function(event,removeObj,selected,dropObjComponent,method,elem){
			var dummyDisplay = [];
			var dummySelected = [];
			var options = this.getData('optGroup') ? this.getData('optArr') : this.getData('cxPropOptions');
			if(this.getData('cxPropSelected') && this.getData('cxPropSelected').length > 0){
				var selectedList = this.getData("cxPropSelectedList"); //NO I18N
				if(!this.getData("cxPropRemoveMultiple")){
					var displayArr = this.getData('displayValue');
					for(var i = 0;i < displayArr.length; ++i){
						if(removeObj === displayArr[i][this.getData('cxPropSystemValue')]){
							Lyte.arrayUtils(displayArr,'removeAt',i)
							selectedList.splice(i,1);
						}
					}
				}else{
					var displayArr = this.getData('displayValue');
					let disLen = displayArr.length;
					for(var j=0;j< removeObj.length; ++j){
						for(let i = 0;i < disLen; ++i){
							if(removeObj[j] === displayArr[i][this.getData('cxPropSystemValue')]){
								Lyte.arrayUtils(displayArr,'removeAt',i);
								selectedList.splice(i,1);
							}
						}
					}
				}

				this.setData('preventSelectedObs',true); //NO I18N
				this.setData('cxPropSelected',selected); //NO I18N
				this.setData('cxPropSelectedList',selectedList); //NO I18N
				this.setData('preventSelectedObs',false); //NO I18N
			}else{
				this.setData('displayValue',dummyDisplay); //NO I18N
				this.setData('preventSelectedObs',true); //NO I18N
				this.setData('cxPropSelected',""); //NO I18N
				this.setData('cxPropSelectedList',[]); //NO I18N
				this.setData('preventSelectedObs',false); //NO I18N
			}
			this.$node.querySelector("lyte-dropdown") && this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-input") ? this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-input").ltProp("value", ""): "";
		   _cruxUtils.addMurhyInfo("crux-dropdown.js", "Feb Default Changes");
			if(this.getData('cxPropType')==='multisearch'){
				var searchElem = this.$node.querySelector("lyte-input");//NO I18N
				if(!searchElem.ltProp('value')){
					this.checkNoResult();
				}
			}else{
			this.checkNoResult();
			}
			this.$node.querySelector("lyte-dropdown") ? this.$node.querySelector("lyte-dropdown").open() : "";
			this.$node.querySelector("lyte-dropdown") && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-input") ? this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-input").ltProp("value", "") : "";
			// this.$node.querySelector("lyte-input").setValue(this.$node.querySelector("input").value)
			// this.executeMethod("onSearch", {newValue : this.$node.querySelector("input").value})
			if(this.getMethods('onRemove')){//NO I18n
				/**
				 * This callback is fired when a selected option is removed.
				 * @method onRemove
				 * @param { event } event - The event that triggered the selection remove.
				 * @param { string | array } removeObj - currently removed item(s)
				 * @param { string } selected - all selected option
				 * @param { compoent } dropObjComponent - The instance of lyte dropdown
				 * @param { string } method - Whether it was removed by a click or a keydown(delete key) event
				 * @param { node } elem - removed drop item node
				 */
				this.executeMethod('onRemove',event,removeObj,selected,dropObjComponent,method,elem);//NO I18n
			};
			dropObjComponent.$node.resetPosition()
		},
		beforeRemoveDropItem : function(event,removeObj,selected,dropObjComponent,method,elem){
			if(this.getMethods('onBeforeRemove')){//NO I18n
				/**
				 * This callback is fired before on-remove callback
				 * @method onBeforeRemove
				 * @param { event } event - The event that triggered the selection remove.
				 * @param { string | array } removeObj - currently removed item(s)
				 * @param { string } selected - all selected option
				 * @param { compoent } dropObjComponent - The instance of lyte dropdown
				 * @param { string } method - Whether it was removed by a click or a keydown(delete key) event
				 * @param { node } elem - removed drop item node
				 */
				return this.executeMethod('onBeforeRemove',event,removeObj,selected,dropObjComponent,method,elem);//NO I18n
			};
		},
		scrollDropBox: function(event, component){

			this.scrollBox(event,component);


		},

		beforeShow:function(event,component){
			var type = this.getData("cxPropType"); //NO I18N
			var options = this.getData("cxPropOptions");
			if((type === 'single' || type === 'multi') && options && options.length  < 1){
				this.setData("noResult",true); //NO I18N
			}
			if(this.getMethods('onBeforeShow')){//NO I18n
				/**
				 * This callback is fired before on-show callback, promise can be returned to show loading icon.
				 * @method onBeforeShow
				 * @param { event } event - The event that triggered the dropdown open
				 * @param { component } component - The instance of lyte dropdown
				 */
				var beforeShow = this.executeMethod('onBeforeShow',event,component)//NO I18n
				if(beforeShow && beforeShow.then){
					var _this  = this;
					this.setData('showLoading',true);
					beforeShow.then(()=>{
						this.setData('showLoading',false);
						this.scrollItemIntoView(this.lyteDropBody,true);
						component.$node.resetPosition();
						if(component.$node.resetSelected){
							component.$node.resetSelected();
						}
						// this.renderOptionsOnInterval(false,()=>{
						// 	if(component.$node.resetSelected){
						// 		component.$node.resetSelected();
						// 	}
						// });
					})
				}
				else{
					return beforeShow;
				}
			};
		},
		onOptionSearch:function(value,ele){
			var val = value.newValue;
			var arr = this.getData('cxPropOptions'); //NO I18n
			var name = this.getData('cxPropUserValue'); //NO I18n
			var type = this.getData("cxPropType"); //NO I18N
			var limit = this.getData("cxPropLimit"); //NO I18N
			var dummyArr = [];
			var actualArr = [];
			this.lyteDropBody.scrollTop = 0;
			// opt group calculations...
			if(val.length > 0){
				this.setData('searchPerformed',true);
				let afterSearchCallback = ()=>{
					if(this.getMethods("onAfterSearch")){
					/**
					 * @method onAfterSearch
					 * @author gowtham.mp
					 * @version 1.0.0
					 */
					this.executeMethod("onAfterSearch");//No I18n
				}
				}
				if(this.getData('cxPropHasMoreOptions') || this.getData('cxPropExternalSearch')){
					if(this.getData('cxPropHasMoreOptions')){
						this.searchParam.searchValue =val;
					}
					this.setData("localData",[]);
					if(this.getMethods('onSearch')){
						var callbackResp = this.executeMethod('onSearch',val);
						if(callbackResp instanceof Promise){
							var _this = this;
							this.setData('showLoading',true);
							callbackResp.then(function(resp){
								if(resp && resp.length>0){
									if(_this.getData('optGroup')){
										resp = _this.formatOptionsForOpt(resp);
									}
									_this.setData("noResult", false);
									_this.setData("localData",resp);
									if(_this.getData("localData").length > 0){
										var selectOpt = _this.getSelectionOption(_this.getData("localData"));
										if(selectOpt){
										_this.setData('selectionValue',selectOpt[_this.getData('cxPropSystemValue')]);
										}else{
											_this.setData("noResult", true);
										}
										_this.resetValues();
									}
								}else{
									_this.setData("noResult", true);
								}
							}).catch(function(){
								_this.setData("noResult", true);
							}).finally(function(){
								_this.setData('showLoading',false);
								afterSearchCallback();
							})
						}
						else{
							if(callbackResp && callbackResp.length>0){
								this.setData("noResult", false);
								this.setData("localData",callbackResp);//NO I18N
								if(this.getData("localData").length > 0){
									var selectOpt = this.getSelectionOption(this.getData("localData"));
									if(selectOpt){
									this.setData('selectionValue',selectOpt[this.getData('cxPropSystemValue')]);
									}else{
										this.setData("noResult", true);
									}
									this.resetValues();
								}
							}
							else{
								this.setData("noResult", true);
							}
							afterSearchCallback();
						}
					}else{
						this.setData("noResult", true);
					}
				}else{
					if(arr[0][name] !== undefined && val.length > 0 &&  type != 'multi'){
						actualArr = $L.search(arr,name,val,"includes",{caseSensitive : false,trim:this.getData('cxPropTrimSearch'),allowEmptyValue:true});//NO I18N
						this.setData("localData",actualArr);//NO I18N
					}else if(val.length > 0){
						arr.forEach(function(item) {
							if(item[name] != undefined){
								var res = $L.search(item,name,val,"includes",{caseSensitive : false,trim:this.getData('cxPropTrimSearch'),allowEmptyValue:true})
								if(res.length > 0){
									dummyArr.push(res[0]);//NO I18N
								}

							}else{
								for (var key in item) {
									var obj = {};
									obj[key] = $L.search(item[key], name, val,"includes",{caseSensitive : false,trim:this.getData('cxPropTrimSearch'),allowEmptyValue:true});//NO I18N
									if(obj[key].length > 0){
										dummyArr.push(obj);
									}
								}
							}

						}.bind(this));

						this.optTotalCount(dummyArr,'search');//NO I18N

					}else if(val.length == 0 ){
						var optGroup = this.getData("optGroup"); //NO I18N
						limit = this.getData("cxPropLimit"); //NO I18N
						if(optGroup != true){
							if(arr.length > limit){
								this.calculateDropItems(0,limit);
							}else{
								this.calculateDropItems(0,arr.length);
							}
						}else{
							this.optTotalCount(arr,'empty');//NO I18N
						}
					}
					if(val.length != 0 && dummyArr.length ==0 && actualArr.length === 0){
						this.setData("noResult",true);//NO I18N
					}else{
						this.setData("noResult",false);//NO I18N
					}
					if(this.getData("localData").length > 0){
						let selectValue = this.getSelectionOption(this.getData("localData"));
						if(selectValue){
							this.setData('selectionValue',selectValue[this.getData('cxPropSystemValue')]);
						}
						// if(this.getData("localData")[0].id == -1 && this.getData("localData")[1]){
						// 	this.setData('selectionValue',this.getData("localData")[1][this.getData('cxPropSystemValue')]);
						// 	// this.getData("localData")[1].isFirst = true; 
						// }else if(this.getData("localData")[0].id !== -1){
						// 	this.setData('selectionValue',this.getData("localData")[0][this.getData('cxPropSystemValue')]);
						// 	// this.getData("localData")[0].isFirst = true; 
						// }
					}
					var dummyLocal = this.getData('localData'); //NO I18N
					this.setData('localData',[]); //NO I18N
					this.setData('localData',dummyLocal); //NO I18N
					this.resetValues(); // to show disable and selected value  after search...
					if(type=='multiple' || type=='multisearch'){
						if(!this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-drop-item:not([selected=true])")){
							this.setData("noResult", true);
						}
						else{
							this.setData("noResult", false);
						}
					}
					afterSearchCallback();
				}
			}else{
				if(this.getData('cxPropHasMoreOptions')){
					this.searchParam = {page:1};
				}
				this.setData('cxPropHasMoreOptions',this.previousHasMoreOptions);
				this.setData('searchPerformed',false);
				if(this.data.localData.length){
					this.setData('selectionValue','');
					// if(this.getData("localData")[0].id == -1 && this.getData("localData")[1]){
					// 	this.getData("localData")[1].isFirst = false; 
					// }else if(this.getData("localData")[0].id !== -1){
					// 	this.getData("localData")[0].isFirst = false; 
					// }
				}
				if(this.getData("optGroup")){
					this.optTotalCount(arr,'search');//NO I18N
					this.setSelectedData();
				}else{
					if(arr.length > limit){
						if(this.data.cxPropSelected && this.data.cxPropType == 'single'){
							var i = arr.cruxFindIndexOfObject(this.data.cxPropSystemValue,this.data.cxPropSelected);
							if(i >= limit){
								let start = this.getStartIndexForRendering(i,limit,arr.length);
								this.calculateDropItems(start,limit,true);//NO I18N
								this.scrollItemIntoView(this.lyteDropBody,true);
							}else{
								this.calculateDropItems(0,limit);//NO I18N
							}
						}else{
							this.calculateDropItems(0,limit);
						}
						// this.renderOptionsOnInterval(true);
					}else{
						this.calculateDropItems(0,this.getData('currentPos'));
						if(type=='multiple' || type=='multisearch'){
							this.checkDropItemsCount();
						}
					}
				}
				if(this.getData("localData").length > 0){
					if(this.getData("localData")[0].id == -1 && this.getData("localData")[1]){
						this.setData('selectionValue',this.getData("localData")[1][this.getData('cxPropSystemValue')]);
						// this.getData("localData")[1].isFirst = true; 
					}else if(this.getData("localData")[0].id !== -1){
						this.setData('selectionValue',this.getData("localData")[0][this.getData('cxPropSystemValue')]);
						// this.getData("localData")[0].isFirst = true; 
					}
				}
				this.resetValues();
				if(this.$node.querySelector("lyte-dropdown") && this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelectorAll("lyte-drop-item:not(.lyteDropdownActive)").length == 0){
					this.setData("noResult", true);
				}
				else{
					this.setData("noResult",false);//NO I18N
				}
				// this.setData('currentPos',this.getData('cxPropLimit')); //NO I18N
				if(this.getMethods("onClearSearch")){
					/**
					 * @method onClearSearch
					 * @author gowtham.mp
					 * @version 1.0.0
					 * Called when user clicks on the clear icon
					 */
					this.executeMethod("onClearSearch");//No I18n
				}
			}

		}
	},
	getStartIndexForRendering: function(selIdx,limit,length){
		//optgroup handling to be added
		let floor = Math.floor(limit/2);
		let start = (selIdx - floor)+1;
		if(selIdx+Math.ceil(limit/2) >= length){
			//how many elements can be rendered after selected index
			let remaining = (length - selIdx)-1;
			start = selIdx - (limit - remaining)+1;
		}
		return Math.max(0,start);
	},
	setAriaForFakeDummy: function () {
		if(!this.data.showFieldsDropdown){
			_lyteUiUtils.setAttribute(this.$node.querySelector('.cxFakeDummyEventContainer'), this.getData('cxPropAriaButton') || {}, {});
		}
	}.observes('cxPropAriaButton').on('didConnect')
 }, {mixins : ["crux-aria-dropdown-mixin","crux-element-validation"]});


Lyte.Component.registerHelper("cxPropArrayValue",function(obj) { //NO I18N
   return obj[Object.keys(obj)[0]] ;
});


Lyte.Component.registerHelper("cxPropCheckKey",function(obj) { //NO I18N
    return obj.hasOwnProperty(this.getData("cxPropUserValue"));//NO I18N
});


Lyte.Component.registerHelper("cxPropKeyValue",function(val) { //NO I18N
    if(typeof val != 'object'){
    	return true;
    }
});

Lyte.Component.registerHelper("cxPropIsDisabledValue",function(val,disableList) { //NO I18N
    return disableList && disableList.includes(val);//NO I18n
});
Lyte.Component.registerHelper("getCruxDropItemValue",function(option,value,disableTooltip,disabledList,disabedListLength,disabledValue,tooltipValue,groupValue,userValue) {
   if( disableTooltip || ( disabledList && disabledList.includes(value) && disabledValue )){
	return '';
   }
   return tooltipValue ?  tooltipValue : groupValue ? `${userValue} - (${groupValue})` : userValue; 
});
Lyte.Component.registerHelper("getCruxDropButtonText",function(showLabel,optGroupLabel,groupLabelAsPrimary,groupValue,selectValue,tooltip) {
	if(!selectValue){
		return '';
	}
	let groupLabel = showLabel ? optGroupLabel : groupValue;
	if(!groupLabel){
		return tooltip ? selectValue : typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(selectValue) : selectValue;
	}
	let firstVal = groupLabelAsPrimary ? groupLabel : selectValue,secondVal = `(${groupLabelAsPrimary ? selectValue : groupLabel})`;
	return tooltip ? `${firstVal} - ${secondVal}`
		:`${typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(firstVal) : firstVal} - <span class="cxDropdownGroupElemValue">${typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(secondVal) : secondVal}</span>`;
 });

Lyte.Component.registerHelper("checkMandatory",function(mandatoryList,systemValue) { //NO I18N
	return mandatoryList && mandatoryList.has(systemValue);//NO I18N
});
/**
 * @syntax nonYielded
 * <crux-dropdown></crux-dropdown>
 */
