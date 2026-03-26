/**
 * @component crux-picklist-component
 * @author mahalakshmi.meenachisundaram
 * @version 1.0.0
 * Supports view, create and criteria/filter
 */
Lyte.Component.register("crux-picklist-component", {
_template:"<template tag-name=\"crux-picklist-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"filter\"></template><template case=\"criteria\"></template><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div @class=\"cxElementValue cxYieldObserverElemComp {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} {{pkColorEnabledClass}}\" onfocusout=\"{{action('setFocusClass',this,false)}}\" onfocusin=\"{{action('setFocusClass',this,true)}}\"> <lyte-dropdown id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;followcursor&quot;, &quot;appearance&quot;: &quot;box&quot;}\" lt-prop-tooltip-class=\"cxElementsTooltip\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-disabled-list=\"[&quot;cruxDisabled&quot;]\" lt-prop-yield=\"true\" lt-prop-type=\"{{if(expHandlers(cxPropShowRemoveIcon,'&amp;&amp;',ifEquals(cxPropType,'single')),'default',cxPropType)}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" on-add=\"{{method('addToList',cxPropField)}}\" on-remove=\"{{method('removeFromList',cxPropField)}}\" lt-prop-selected=\"{{cxPropValue}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-display-value=\"{{cxPropDisplayValue}}\" on-option-selected=\"{{method('selectOption')}}\" lt-prop-placeholder=\"{{placeholder}}\" lt-prop-search-delay=\"{{cxPropSearchDelay}}\" on-before-show=\"{{method('openDropdown')}}\" on-hide=\"{{method('closeDropdown')}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}} {{if(cxPropIsDropdownIconNode,'cxDropdownIconNodePresent','')}}\" lt-prop-no-result=\"{{cxPropNoResult}}\" on-show=\"{{method('onDropdownOpen')}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" on-before-hide=\"{{method('beforeHide')}}\" data-zcqa=\"{{cxPropDropdownZcqa}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-button=\"{{ariaAttributes.cxAriaButton}}\" lt-prop-aria-box=\"{{ariaAttributes.cxAriaBox}}\" lt-prop-aria-body=\"{{ariaAttributes.cxAriaBody}}\" lt-prop-icon-class=\"{{if(cxPropShowDisabledIcon,cxPropDisabledIconClass,cxPropDropdownIconClass)}}\" lt-prop-button-class=\"{{cxPropButtonClass}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-active-element=\"{{if(ifNotEquals(cxPropType,'single'),concat('#search_',cxPropId,'_',cruxConvertStringToValidSelector(cxPropField.api_name)),concat('#searchsingle_',cxPropId,'_',cxPropField.api_name))}}\" lt-prop-show-remove-icon=\"{{cxPropShowRemoveIcon}}\" lt-prop-focus-on-close=\"{{cxPropFocusOnClose}}\" lt-prop-focus-on-remove=\"{{cxPropFocusOnRemove}}\" on-remove-icon-clicked=\"{{method('removeIconClicked')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!=',&quot;single&quot;)}}\"><template case=\"true\"> <lyte-drop-button data-zcqa=\"{{if(cxPropDropdownZcqa,'',cxPropZcqa)}}\" class=\"{{if(cruxOr(cxPropDropdownIconNodeClass,cxPropShowDisabledIcon),'ltDropdownIconNodePresent','')}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{displayValue}}\" item=\"item\" index=\"index\"> <li data-value=\"{{item}}\"> <span class=\"lyteDropdownVisible\" onmouseenter=\"{{action('setToolTip',this)}}\">{{unescape(cruxReplaceSpace(cruxEncodeHTML(item)))}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <template is=\"if\" value=\"{{cxPropLazyLoad}}\"><template case=\"true\"> <lyte-input lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" id=\"{{concat('searchsingle_',cxPropId,'_',cxPropField.api_name)}}\" lt-prop-value=\"{{lbind(searchValue)}}\" data-zcqa=\"search_{{cxPropZcqa}}\" lt-prop-focus=\"true\" lt-prop-type=\"search\" class=\"cxW100Per\" lt-prop-placeholder=\"{{cxPropSearchplaceholder}}\" on-value-change=\"{{method('onOptionSearch')}}\" lt-prop-close-icon=\"true\" on-clear=\"{{method('setScroll')}}\" lt-prop-maxlength=\"{{cxPropSearchMaxLength}}\"></lyte-input> </template><template case=\"false\"> <lyte-search class=\"cxW100Per\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-search-delay=\"{{cxPropSearchDelay}}\" lt-prop-type=\"text\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;{{concat(&quot;.parentscope_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name),&quot;_&quot;,uniqueId)}}&quot;, &quot;target&quot;:&quot;.picklist_values:not(.lyteDropdownActive)&quot;, &quot;search&quot;:&quot;lyte-drop-item.picklist_values:not(.lyteDropdownActive)&quot;}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-search=\"{{method('showNoResult',cxPropField)}}\" id=\"{{concat(&quot;search_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name))}}\" lt-prop-placeholder=\"{{if(displayValue.length,'',placeholder)}}\" onclick=\"{{action('searchBoxClicked')}}\" on-focus=\"{{method('onSearchBoxFocused')}}\" onkeydown=\"{{action('preventDefault',this,event)}}\" lt-prop-trim=\"true\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-readonly=\"{{cxPropReadonly}}\"></lyte-search> </template></template> </li> </ul> <template is=\"if\" value=\"{{expHandlers(cxPropIsDropdownIconNode,'&amp;&amp;',expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDropdownIconNodeClass}}\"></lyte-icon> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><lyte-icon class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></lyte-icon></template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </lyte-drop-button> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropPicklistButtonYield}}\"><template case=\"true\"> <lyte-drop-button> <lyte-yield yield-name=\"picklistButtonYield\"></lyte-yield> </lyte-drop-button> </template><template case=\"false\"> <lyte-drop-button class=\"DropButtons {{if(cxPropIsDropdownIconNode,'ltDropdownIconNodePresent, ')}}\" data-zcqa=\"{{cxPropZcqa}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"dIB activitesColor\" id=\"selectColorComponent_{{cxPropField.id}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_selectedColor')}}\" style=\"background:{{propDefaultColorCode}}\"></span> </template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <span lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-title=\"{{tooltip}}\" class=\"lyteMarginRight lyteDropdownLabel {{cxPropButtonClass}}\">{{cxPropValue}}</span> </template><template case=\"false\"> <span class=\"lyteDropPlaceholderNormal\"><lyte-text lt-prop-value=\"{{placeholder}}\"></lyte-text></span> </template></template> <template is=\"if\" value=\"{{negate(cxPropShowDisabledIcon)}}\"><template case=\"true\"><lyte-icon class=\"{{if(cxPropIsDropdownIconNode,cxPropIconClass,'dropdown')}} {{cxPropDropdownIconClass}}\"></lyte-icon></template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </lyte-drop-button> </template></template></template></template> <lyte-drop-box class=\"cxDropbox {{if(cxPropIsColorCodeEnabled,'colorEnabledPKDropBox','')}} {{cxPropBoxClass}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==',&quot;single&quot;),'&amp;&amp;',showSearchBox)}}\"><template case=\"true\"> <lyte-drop-header> <template is=\"if\" value=\"{{cxPropLazyLoad}}\"><template case=\"true\"> <lyte-input id=\"{{concat('searchsingle_',cxPropId,'_',cxPropField.api_name)}}\" data-zcqa=\"search_{{cxPropZcqa}}\" lt-prop-value=\"{{lbind(searchValue)}}\" lt-prop-focus=\"true\" lt-prop-type=\"search\" class=\"cxW100Per\" lt-prop-placeholder=\"{{cxPropSearchplaceholder}}\" on-value-change=\"{{method('onOptionSearch')}}\" lt-prop-close-icon=\"true\" on-clear=\"{{method('setScroll')}}\" lt-prop-maxlength=\"{{cxPropSearchMaxLength}}\"></lyte-input> </template><template case=\"false\"> <lyte-search class=\"cxW100Per\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;{{concat(&quot;.parentscope_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name),&quot;_&quot;,uniqueId)}}&quot;, &quot;target&quot;:&quot;.picklist_values&quot;, &quot;search&quot;:&quot;lyte-drop-item.picklist_values&quot;}\" lt-prop-maxlength=\"120\" id=\"{{concat('searchsingle_',cxPropId,'_',cxPropField.api_name)}}\" on-search=\"{{method('singleSearch')}}\" lt-prop-trim=\"true\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-readonly=\"{{cxPropReadonly}}\"></lyte-search> </template></template> </lyte-drop-header> </template></template> <lyte-drop-body id=\"{{cxPropField.api_name}}\" onscroll=\"{{action('onScroll',event)}}\" class=\"{{concat(&quot;parentscope_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name),&quot;_&quot;,uniqueId)}}\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"><div class=\"cxAlignCenter\"><span class=\"cxElementsLoaderBg\"></span></div> </template><template case=\"false\"> <template is=\"for\" items=\"{{pickListValues}}\" item=\"item\" index=\"indeval\"> <lyte-drop-item class=\"picklist_values {{if(item.extra,'lyteDropdownSelection','')}} {{if(cruxAnd(ifEquals(cxPropIsColorCodeEnabled,'true'),ifEquals(item.actual_value,'-None-')),'colorEnabledSelect2None','')}} {{if(item.cxDisableSelect,'cxDropboxNoneItem','')}}\" data-value=\"{{item[cxPropUserValue]}}\" data-extra=\"{{item.extra}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',item[cxPropZcqaSelector])}}\" selected=\"{{if(cruxAnd(ifEquals(cxPropType,'single'),item.cxPropSelected),'true','')}}\"> <template is=\"if\" value=\"{{cxPropPicklistYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"picklistYield\" item-obj=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"dIB activitesColor\" style=\"background:{{item.colour_code}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_option_',item[cxPropZcqaSelector])}}\"> </span> </template></template> {{item[cxPropUserValue]}} </template></template> <template is=\"if\" value=\"{{cxPropShowOptionIcon}}\"><template case=\"true\"> <span class=\"{{item.cxPropOptionIconClass}}\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropOptionInfoTooltip,'&amp;&amp;',item.cxPropOptionInfoTooltipMsg)}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" lt-prop-title=\"{{item.cxPropOptionInfoTooltipMsg}}\"></span> </template></template> </lyte-drop-item> </template> <template is=\"if\" value=\"{{showNoOption}}\"><template case=\"true\"><div class=\"cxDropdownNoResult\" data-value=\"cruxDisabled\">{{cxPropNoResultMessage}}</div></template></template> </template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-drop-footer><lyte-yield yield-name=\"footer\"></lyte-yield></lyte-drop-footer></template></template> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-picklist-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"{{pkColorEnabledClass}}\" data-zcqa=\"{{concat('colorcodespan_',cxPropField.field_label,'_',viewValue)}}\" style=\"{{propColorStyleObj}}\"><lyte-text lt-prop-value=\"{{viewValue}}\" lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600 }\" lt-prop-tooltip-class=\"lvTooltipClass\" lt-prop-show=\"{{cxPropShowTooltip}}\"></lyte-text></span> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{viewValue}}\" class=\"cxElemCompViewValue\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"lvTooltipClass\" lt-prop-show=\"{{cxPropShowTooltip}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[],"additional":{"next":"create"}},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3],"trans":true},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,3,3,1]},{"type":"if","position":[1,3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","propDefaultColorCode"]}}}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"if","position":[1,11],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","item.colour_code"]}}}}]}},"default":{}},{"type":"text","position":[3]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"propColorStyleObj"}}},{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","lyteViewPort","cxPropFrom","cxPropField","cxPropValue","displayValue","pickListValues","origLen","showNoOption","disabledList","cxPropEmptyValue","placeholder","cxPropDisabled","cxPropOpenDropdown","cxPropDisplayValue","cxPropType","cxPropZcqa","cxPropErrorMessage","cxPropDisableExtraValue","cxPropFieldKey","cxPropId","cxPropClearErrorMessage","cxPropAppearance","cxPropBoundary","cxPropLabelClass","showSearchBox","cxPropSearchMaxLength","cxPropIsColorCodeEnabled","propDefaultColorCode","propColorStyleObj","pkColorEnabledClass","cxPropId","cxPropPlaceholder","cxPropLazyLoad","cxPropTabIndex","cxPropTabindex","cxPropOptionInfoTooltip","cxPropClass","cxPropLayout","cxPropTooltip","cxPropPicklistYield","cxPropPicklistButtonYield","isError","cxPropErrorYield","cxPropUserValue","cxPropSystemValue","cxPropPicklistValues","cxPropInfoTooltip","cxPropZcqaSelector","cxPropFreeze","cxPropDropdownZcqa","cxPropScope","cxPropSearchDelay","cxPropAria","cxPropAriaButton","cxPropAriaBody","cxPropAriaBox","cxPropModule","cxPropMaskingProperties","cxPropTooltipConfig","cxPropTooltipClass","viewValue","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","lyteUnbound","cxPropMaxlength","cxPropUpdateDelay","cxPropErrorClass","tooltip","cxPropErrorSpanClass","cxPropDropdownIconClass","cxPropMaxCount","cxPropReadonly","cxPropPreventParentScroll","cxPropBoxClass","cxPropShowUnused","cxPropLayout","cxPropFooterYield","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropNoneKeyword","cxPropIncludeNoneOption","cxPropButtonTextInsideElement","cxPropMandatory","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropShowSearch","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropIsDropdownIconNode","cxPropDropdownIconNodeClass","cxPropPreventFocusOnError","cxPropNoResultMessage","cxPropPrefixYield","cxPropIgnoreEmptyValue","cxPropShowTooltip","cxPropButtonYield","cxPropAriaErrorProperties","cxPropBoundary","cxPropShowRemoveIcon","cxPropCloseDropDownOnRemove","cxPropShowOptionIcon","cxPropOptionIconClass","cxPropAriaAttributes","ariaAttributes","cxPropNoResult","searchValue","cxPropSuffixYield","cxPropFocusOnClose","cxPropFocusOnRemove"],
_observedAttributesType :["object","object","boolean","boolean","string","object","string","array","array","number","boolean","array","string","string","boolean","boolean","string","string","string","string","boolean","string","string","boolean","string","object","string","boolean","number","boolean","string","string","string","string","string","boolean","string","string","boolean","string","string","string","boolean","boolean","boolean","boolean","string","string","array","string","string","boolean","string","string","number","boolean","object","object","object","string","object","string","string","string","string","string","boolean","number","number","string","string","string","string","number","boolean","boolean","string","boolean","string","boolean","boolean","boolean","string","string","boolean","string","boolean","string","boolean","string","boolean","string","object","string","string","boolean","string","boolean","string","boolean","boolean","boolean","boolean","object","object","boolean","boolean","boolean","string","object","object","string","string","boolean","boolean","boolean"],
//No I18n
	data : function(){
		return {
			/**
  			 * This property used to send multiple properties to child compoent.
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * Set as true to render error message on a hovercard
			 * @componentProperty { boolean } cxPropErrorOnHovercard
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * To determine what the element has to be displayed or where it is to be used.
			 * @componentProperty { view|create|criteria } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue view
			 * @allowedValues ["view", "create", "criteria"]
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * It being a mandatory property, helps to provide the attributes such as data type, UI, type.
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * Sets value to crux component.
			 * @componentProperty { boolean } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			displayValue : Lyte.attr("array", {default : []}),//No I18n
			pickListValues : Lyte.attr("array", {default : []}),//No I18n
			origLen : Lyte.attr("number"),//No I18n
			showNoOption : Lyte.attr("boolean", {default : false}),//No I18n
			disabledList : Lyte.attr("array", {default : ["cruxDisabled"]}),//No I18n
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value.
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			placeholder : Lyte.attr("string", {default : _cruxUtils.getI18n("None")}),//No I18n
			/**
			 * This property disables input. lyteInputDisabled class will be added to lyte-input.
			 * @componentProperty { boolean } cxPropDisabled
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true, to open dropdown on render
			 * @componentProperty { boolean } cxPropOpenDropdown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropOpenDropdown : Lyte.attr("boolean", {cxPropPrefixYielddefault : false}),//No I18n
			/**
			 * Set a display-value or the content to be displayed as selected.
			 * @componentProperty { string } cxPropDisplayValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisplayValue : Lyte.attr("string"),//No I18n
			/**
			 * This is used to set the type of the dropdown.
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropType : Lyte.attr("string"),//No I18n
			/**
			 * The value to be set as ZCQA
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * If set to true, values apart from those in picklist options will not be allowed
			 * @componentProperty { boolean } cxPropDisableExtraValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDisableExtraValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The selector that determines which key holds the field label to be displayed next to the input
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Sets id to the element.
			 * @componentProperty { cxPropId } src
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default cruxTextArea
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set as false to prevent clearing of error message on change of input value
			 * @componentProperty { boolean } cxPropClearErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
      /**
			 * It defines the appearance of the input.
			 * @componentProperty { flat|box } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue flat
			 * @allowedValues ["flat", "box"]
			 */
      cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
      /**
	   * It represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the lyte-drop-button crosses this boundary(by scrolling), it automatically closes the dropdown.
       * @componentProperty { object } cxPropBoundary
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
    //   /**
    //    * @componentProperty { string } cxPropDirection
    //    * @author anuja.manoharan
    //    * @version 1.0.0
    //    */
    //   cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * Class set to field label
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
      showSearchBox : Lyte.attr("boolean", {default : false}),//No I18n
	  /**
	   * The maximum number of characters allowed in search
       * @componentProperty { number } cxPropSearchMaxLength
       * @author anuja.manoharan
       * @version 1.0.0
	   * @defaultValue 120
       */
	  cxPropSearchMaxLength : Lyte.attr("number",{"default" : 120}), //NO I18N
	  /**
	   * Set to true, if color code is to be displayed
       * @componentProperty { boolean } cxPropIsColorCodeEnabled=false
       * @author anuja.manoharan
       * @version 1.0.0
	   * @defaultValue false
       */
      cxPropIsColorCodeEnabled : Lyte.attr("boolean", {default : false}),//No I18n
      propDefaultColorCode : Lyte.attr("string", {"default": ""}),//No i18n
      propColorStyleObj : Lyte.attr("string", {"default": ""}),//No i18n
      pkColorEnabledClass : Lyte.attr("string", {"default": ""}),//No i18n
     /**
			 * Sets id to the element.
			 * @componentProperty { cxPropId } src
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
      cxPropId : Lyte.attr("string", {"default": ""}),//No i18n
      /**
	   * Set a placeholder for your dropdown when nothing is selected. When cx-prop-placeholder is set to the dropdown on render, then the first item is not chosen as the selected value
       * @componentProperty { string } cxPropPlaceholder
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropPlaceholder : Lyte.attr("string", {"default": ""}),//No i18n
	   /**
		* Set to true to enable lazy loading of picklist dropdown
       * @componentProperty { boolean } cxPropLazyLoad
       * @author mahalakshmi.m
       * @version 1.0.0
	   * @defaultValue false
       */
	  cxPropLazyLoad : Lyte.attr("boolean", {"default": false}),//No i18n
     /**
			 * It sets tab index for input.
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 0
			 */
      cxPropTabIndex : Lyte.attr("string",{default : "0"}), //No i18n
	 /**
			 * It sets tab index for input.
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
	  cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * Set to true to render info tooltip next to each option
			 * @componentProperty { boolean } cxPropOptionInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropOptionInfoTooltip :  Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Layout id to be passed to the input, properties like required are read from this layout information
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"), //No I18n
			/**
			 * Value set as tooltip
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * Set to true to render your own content inside lyte-drop-item
			 * @componentProperty { boolean } cxPropPicklistYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPicklistYield : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set to true to render your own button
			 * @componentProperty { boolean } cxPropPicklistButtonYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPicklistButtonYield : Lyte.attr("boolean", {default : false}),//No i18n
			isError : Lyte.attr("boolean", {default : false}),//NO i18n
			/**
			 * Set as true to render custom error message as yield
			 * @componentProperty { boolean } cxPropErrorYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 * @yieldName errorYield
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * represents the key which contains the display value/text content of each lyte-drop-item in the array of objects passed to the dropdown
			 * @componentProperty { string } cxPropUserValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue display_value
			 */
			cxPropUserValue : Lyte.attr("string", {default : "display_value"}),//No i18n
			/**
			 * represents the key which contains the value of the data-value attribute of each lyte-drop-item in the array of objects passed to the dropdown
			 * @componentProperty { string } cxPropSystemValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue actual_value
			 */
			cxPropSystemValue : Lyte.attr("string", {default : "actual_value"}),//No i18n
			/**
			 *  Will be set as dropdown options
			 * @componentProperty { array } cxPropPicklistValues
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPicklistValues : Lyte.attr("array", {hideAttr : true}), //No i18n
			/**
			 * Text is set to tooltip displayed next to field label as an icon
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * The selector to fetch zcqa from cxPropField
			 * @componentProperty { string } cxPropZcqaSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqaSelector : Lyte.attr("string"),//no i18n
			/**
			 * This is used to decide whether to apply or not apply the freeze layer.
			 * @componentProperty { boolean } cxPropFreeze=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFreeze : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * data-zcqa to be set to lyte-dropdown
			 * @componentProperty { string } cxPropDropdownZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDropdownZcqa : Lyte.attr("string"),// No I18n
			/**
			 * This represents the dom element within which the lyte-drop-box must be contained. The lyte-drop-box never leaves the boundary of its scope element. Used in dropdowns inside modals
			 * @componentProperty { string } cxPropScope
			 * @author anuja.manoharan
			 * @version 1.0.0T
			 */
			cxPropScope : Lyte.attr("string"),//No I18n
			/**
			 * Search will be processed after the given time delay. If its set to undefined search will be processed immediately
			 * @componentProperty { number } cxPropSearchDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSearchDelay : Lyte.attr('number'), //no i18n
			/**
			 * To set custom attributes to input/textarea.
			 * @componentProperty { boolean } cxPropAria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * property to set aria attributes to dropdown button for criteria or filter
			 * @componentProperty { object } cxPropAriaButton
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaButton : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * This adds ARIA attributes to the lyte-drop-body of the dropdown which has the role listbox
			 * @componentProperty { object } cxPropAriaBody
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaBody : Lyte.attr("object", {default : {}}),//No I18n
			cxPropAriaBox : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * The module for which the picklist field is associated
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModule : Lyte.attr('string'), //no i18n
			/**
			 * The property that determines how the field has to be displayed when masked
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/**
			 * The properties passed to the tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default {position : "followcursor", appearance : "box"}
			 */
			cxPropTooltipConfig : Lyte.attr("string"),//No I18n
			/**
			 * Class set to tooltip
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			viewValue : Lyte.attr("string"),//No I18n
			/**
			 * Prefix set to zcqa of error
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to zcqa of error
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue Error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}),// No I18n
			/**
			 * Maximum number of letters can be typed in input. You can set it to undefined for typing without maxlength
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 120
			 */
			cxPropMaxlength : Lyte.attr('number',{default : 120 }), //no i18n
			/**
			 * The delay after which update callbacks are triggered
			 * @componentProperty { number } cxPropUpdateDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr('number'), //no i18n
			/**
			 * This class is set to the crux-error-message element.
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			tooltip : Lyte.attr("string"),//No I18n
			/**
			 * class set to the span that contains the error
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Set a class for the down arrow rendered inside the lyte-drop-button.
			 * @componentProperty { string } cxPropDropdownIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue dropdown
			 */
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),//No i18n
			/**
			 * The maximum number of elements that can be selected in a multiselect dropdown.
			 * @componentProperty { number } cxPropMaxCount
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaxCount : Lyte.attr('number'),//no i18n
			/**
			 * This makes the dropdown readonly when set to true
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropReadonly :Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Disables scroll of all scrollable parents of the dropdown(only parents). This is generally used for multiselects since they don't support lt-prop-freeze.
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This is used to set the class of the dropbox that is opened. This property is only applicable when the drop-box is not yielded
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 *  Set to true to display unused picklist values
			 * @componentProperty { boolean } cxPropShowUnused=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowUnused : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The layout in which the field is defined.
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to render your own footer
			 * @componentProperty { boolean } cxPropFooterYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFooterYield : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to render info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/**
			 * Set to true to display custom disable icon
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class set to custom disable icon
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * The keyword that denotes None case
			 * @componentProperty { string } cxPropNoneKeyword
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue -None-
			 */
			cxPropNoneKeyword : Lyte.attr("string", {default : "-None-"}),
			/**
			 * Set to true to include none option in multiselect
			 * @componentProperty { boolean } cxPropIncludeNoneOption
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIncludeNoneOption :  Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The text to be displayed inside the button
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 *  Warning message to be displayed below dropdown
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * Set to true to display warning message
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * Class to be set to icon of warning
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * Set to true to display search box even if number of options is less than 7
			 * @componentProperty { boolean } cxPropShowSearch=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSearch : Lyte.attr("boolean"),
			/**
			 * Set to true to render custom dropdown icon node
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			/**
			 * The object that contains the mandatory display details of the application.
			 * @componentProperty { object } cxPropMandatoryOption
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			/**
			 * This determines what type of mandatory styling should be applied to the input.
			 * @componentProperty { red_accent_line|asterisk|required } cxPropMandatoryType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue red_accent_line
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			/**
			 * Class set to icon next to error message
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set to true to display custom dropdown icon node
			 * @componentProperty { boolean } cxPropIsDropdownIconNode
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
			/**
			 * Class to set to custom dropdown icon node
			 * @componentProperty { string } cxPropDropdownIconNodeClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDropdownIconNodeClass : Lyte.attr("string", {default : ""}),
			/**
			 * Set to true to prevent focus on error
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * The custom message to be displayed when no results are found on search
			 * @componentProperty { string } cxPropNoResultMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNoResultMessage : Lyte.attr("string", {default : _cruxUtils.getI18n('crm.label.no.options.found')}),
			/**
			 * Set to true to render custom prefix yield content in dropdown button
			 * @componentProperty { boolean } cxPropPrefixYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to ignore an empty value on validation
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to false to prevent opening of tooltip on hover of long texts
			 * @componentProperty { boolean } cxPropShowTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropShowTooltip:Lyte.attr("boolean",{default:true}),
			/**
			 * Set as true to render custom button next to input
			 * @componentProperty { boolean } cxPropButtonYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * property to set error icon and error color
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			/**
			 * It represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the lyte-drop-button crosses this boundary(by scrolling), it automatically closes the dropdown.
			 * @componentProperty { object } cxPropBoundary
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropBoundary: Lyte.attr('object'),
			/**
			 * Set to true to render remove icon
			 * @componentProperty { object } cxPropShowRemoveIcon
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowRemoveIcon : Lyte.attr("boolean",{default:false}),
			/**
			 * Set to true to prevent DropDown open on remove icon click of multisearch / multiple type picklist
			 * @componentProperty { boolean } cxPropCloseDropDownOnRemove=false
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * @defaultValue false
			 */ 
			cxPropCloseDropDownOnRemove : Lyte.attr("boolean",{default:false}),
			/**
			 * Set to true to display custom option icon
			 * @componentProperty { boolean } cxPropShowOptionIcon=false
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * @defaultValue false
			 */ 
			cxPropShowOptionIcon:Lyte.attr("boolean",{default:false}),
			/**
			 * Class set to custom option icon
			 * @componentProperty { string } cxPropOptionIconClass
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 */ 
			cxPropOptionIconClass:Lyte.attr("string",{default:""}),
						/**
						 * property to set aria attributes for create case
			 * @componentProperty { object } cxPropAriaCheckbox
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			ariaAttributes : Lyte.attr('object', { default : {} }),
			/**
						 * This is used to set the text which gets displayed when there are no results to be shown. Make sure to internationalize it when you have provided your own value.

			 * @componentProperty { string } cxPropNoResult
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropNoResult:Lyte.attr("string"),
			searchValue:Lyte.attr("string"),
			/**
						 * Set to true to render custom suffix yield content in dropdown button
			 * @componentProperty { boolean } cxPropSuffixYield
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			/**
						 * Set this property to false if you want to prevent the dropdown from focusing itself when it is closed.

			 * @componentProperty { boolean } cxPropFocusOnClose
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropFocusOnClose: Lyte.attr("boolean", { default: true }),
			/**
						 * Set to true to set focus on remove of option
			 * @componentProperty { boolean } cxPropFocusOnRemove
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropFocusOnRemove : Lyte.attr("boolean", { default: true })
		}
	},
	// didConnect : function(){
	// 	this.$node.getModifiedOptions = function() {
	// 		/*This util added for patch support of dropdown and picklist. It will return added and removed items*/
	// 		this.getModifiedValues();
	// 	}.bind(this);
	// },
	methods : {
		onOptionSearch : function(value){
			this.instances.standard.properties.searchValue = value.newValue;
			if(value && value.oldValue !== "" && value.newValue === ""){
				this.initialSearchRequest = true; //to reset search data
				this.instances.standard.resetSearch();
			}else{
				this.instances.standard.performSearch($L("#"+this.data.cxPropField.api_name));
			}
			
		},
		onDropdownOpen : function(event, comp){
			const lyteDropdown = this.$node.querySelector("lyte-dropdown");
			if(this.getMethods('onShow')){
				/**
				 * @method onShow
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } component
				 * 	This callback is fired when the dropdown is opened
				 */
				this.executeMethod('onShow',arguments[0],arguments[1]);
			}
			if (lyteDropdown.component.childComp) {
				const inputElem = lyteDropdown.component.childComp.querySelector("input");
				if (inputElem) {
					inputElem.focus(); // No I18n
				}
			}
			if(this.getMethods('onElementDropdownOpen')){
				/**
				 * @method onElementDropdownOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } component
				 * 	This callback is fired when the element dropdown is opened
				 */
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		showNoResult : function(field, result, event, value){
			var closing = this.closing;
			const lyteDropdown = this.$node.querySelector("lyte-dropdown");
			let emptySearchValue = false;
			if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
				emptySearchValue = true;
			}
			if(this.closing){
				this.closing = false;
			}
			else if(lyteDropdown.component.childComp && lyteDropdown.component.childComp.classList.contains("lyteDropdownHidden") && !(this.data.cxPropCloseDropDownOnRemove && emptySearchValue)){
				if(arguments[3].type == "input"){
					return;
				}
				lyteDropdown.toggle();//No I18n
			}
			// if(lyteDropdown.component.childComp.querySelector("[data-extra='true']") && !(event && event.target && event.target.tagName == "LYTE-DROP-ITEM")){
			// 	Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
			// }
			// if(result.length == 0){
				var value = arguments[2].querySelector("input").value;
				if(value.trim() == ""){
					if(!this.adding && this.getData("pickListValues") &&this.getData("pickListValues")[0] && this.getData("pickListValues")[0].extra){
						 Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
					}
					this.adding = false;
					this.setData("showNoOption", this.origLen == 0);//No I18n
					if(value.length > 0){
						return ;
					}
				}
				if(value != ""){
					if(this.getData("cxPropDisableExtraValue") == false){
						var originalVal = value;
						var val = value.toLowerCase().trim();
						val = val.replace(/\s+/g, " ");
						if(this.extraVals[val] != true){
							if(this.getData("pickListValues") && this.getData("pickListValues")[0] && this.getData("pickListValues")[0].extra){
								 Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
							}
							if (lyteDropdown.component.childComp) {
								const selectionElem = lyteDropdown.component.childComp.querySelector(".lyteDropdownSelection");
								if (selectionElem) {
									selectionElem.classList.remove("lyteDropdownSelection"); // No I18n
								}
							}
							var opt = {extra : "true"};
							opt[this.getData("cxPropUserValue")] = originalVal.replace(/\s+/g, " "); //no i18n
							opt[this.getData("cxPropSystemValue")] = originalVal.replace(/\s+/g, " "); //no i18n
							Lyte.arrayUtils(this.getData("pickListValues"), "unshift", [opt]);//No I18n
							this.setData("showNoOption", false);//No i18n
						}
						else{
							if(this.getData("pickListValues") && this.getData("pickListValues")[0] && this.getData("pickListValues")[0].extra){
								 Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
							}
							var res = result.some(function(ele){
								return ele.getAttribute("selected") != "true" && ele.getAttribute('data-extra') != "true";
							})
							if(!res){
								this.setData("showNoOption", true);//No I18n
							}else if(result.length != 0){
								this.setData("showNoOption", false);//No I18n
							}
						}
					}
					else if(result.length == 0){
						this.setData("showNoOption", true);//No i18n
					}
					else{
						this.setData("showNoOption", false);//No i18n
					}
				}
			// }
		},
		addToList : function(field, event, sel){
			var pickListValues = this.getData("pickListValues");//No I18n
			const lyteDropdown = this.$node.querySelector("lyte-dropdown");
			// this.setData("showNoOption", true);//No i18n
			if( this.isEmoji(sel) ){
				lyteDropdown.toggle(); //no i18n
				this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				return false;
			}
			if(  this.data.cxPropMaxCount != undefined && this.getData("displayValue").length >= this.data.cxPropMaxCount ){
				var dropDownNode = lyteDropdown;//No I18n
				var selected = JSON.parse(dropDownNode.ltProp("selected"));//No I18n
				selected.pop();
				dropDownNode.ltProp("selected", JSON.stringify(selected));//No I18n
				dropDownNode.toggle();
				this.showAlert(_cruxUtils.getI18n("crm.alert.maximum.text.values.contains", this.data.cxPropMaxCount));//No I18n
				return false;
			}
			
			if(this.getMethods("onBeforeAdd")){
				var extra = event.srcElement ? event.srcElement.getAttribute("data-extra") == "true" ? true : false : event.target ? event.target.getAttribute("data-extra") == "true" ? true : false : false;
				/**
				 * @method onBeforeAdd
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } current selected element
				 * @param {*} value 
				 * @param {*} if the entered value is a new value or existing from list of options
				 * 	Fired just before an item is added into the list of selected values in a multiselect.
				 */
				var ret = this.executeMethod("onBeforeAdd", sel, this.getValue(), extra);//No I18n
				if(ret == false){
					if(!extra){
						var selectedItems = JSON.parse(lyteDropdown.ltProp("selected"));//No I18n
						selectedItems.pop();
						var dropdown = lyteDropdown;//No I18n
						dropdown.ltProp("selected", JSON.stringify(selectedItems));//No I18n
						dropdown.component.childComp.querySelector(".lyteDropdownSelection").classList.remove("lyteDropdownSelection");//No I18n
						event.target.classList.add("lyteDropdownSelection");//No I18n
						// dropdown.component.childComp.querySelector(".picklist_values:not(.lyteDropdownActive)").classList.add("lyteDropdownSelection");//No I18n
					}
					return false;
				}
			}

			var found = false, prevFound = -1;
			for(var i=0; i<pickListValues.length; i++){
				if(pickListValues[i][this.getData("cxPropUserValue")] == sel){
					if(prevFound > -1){
						Lyte.arrayUtils(this.getData("displayValue"), "insertAt", prevFound+1, pickListValues[i][this.getData("cxPropUserValue")]);//No I18n
					}
					else{
						Lyte.arrayUtils(this.getData("displayValue"), "unshift", pickListValues[i][this.getData("cxPropUserValue")]);//No I18n
					}
					// let add_data = this.removeModifiedValue(pickListValues[i].id);
					// add_data ? this.dataModified.added_ids.push(pickListValues[i].id) : "";
					this.extraVals[sel.toLowerCase()] = true;
					if(pickListValues[i].extra == "true"){
						Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
					}
					else{
						this.origLen = this.origLen-1;
						if(document.querySelector("[data-extra='true']")){
							Lyte.arrayUtils(this.getData("pickListValues"), "shift");//No I18n
						}
					}
					this.setData("showNoOption", this.origLen == 0);//No I18n
					// this.setData("showNoOption", lyteDropdown.component.childComp.querySelector("lyte-drop-item:not([selected=true])") ? false : true);
					found = true;
					break;
				}
				else{ 
					if(this.data.displayValue.length && this.data.displayValue.indexOf(pickListValues[i][this.getData("cxPropUserValue")]) > -1){
						prevFound = this.data.displayValue.indexOf(pickListValues[i][this.getData("cxPropUserValue")]);
					}
				}
			}
			if(!found){
				// Lyte.arrayUtils(this.getData("pickListValues"), "insertAt", 0, {display_value : sel, actual_value : sel, extra : true});//No I18n
				Lyte.arrayUtils(this.getData("displayValue"), "push", sel);//No I18n
				this.extraVals[sel.toLowerCase()] = true;
				this.setData("showNoOption", this.origLen == 0);//No I18n
			}
			this.setData("placeholder", (this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : (this.data.cxPropFrom == "filter" ? _cruxUtils.getI18n("crm.label.filter.typehere") : "")));//No I18n
//			this.setData("placeholder",( ( this.getData("cxPropFrom") == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : "") );//No I18n
			var id = "#search_";//No I18n
			if(this.getData("cxPropId")){
				id+=this.getData("cxPropId");//No I18n
			}
			id+="_"+Lyte.Component.registeredHelpers.cruxConvertStringToValidSelector(field.api_name);
			this.adding = true;
			this.$node.querySelector(id).setValue("");//no i18n
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				/**
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param {*} value 
				 * 	Fired when value is changed.
				 */
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			if(this.getData("displayValue").length !== 0){
				lyteDropdown.classList.remove('lyteDropNoOptSelected'); //no i18n
			}
			this.preventClose = true;
		},
		removeFromList : function(field, event, sel){
			var value = this.getData("displayValue");//No I18n
			var found = false;
			if(this.getMethods("onBeforeRemove")){
				/**
				 * @method onBeforeRemove
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param {*} selected value
				 * @param {*} value
				 * Fired just before an item is removed from a list of selected values in a multiselect.
				 */
				let onremove =  this.executeMethod("onBeforeRemove", sel, this.getValue());//No I18n
				if(onremove === false){
					return false;
				}
			}
			const lyteDropdown = this.$node.querySelector("lyte-dropdown");
			for(var i=0; i<value.length; i++){
				if(value[i] == sel){
					var rem = Lyte.arrayUtils(this.getData("displayValue"), "removeAt", i);//No I18n
					var id = "#search_";//No I18n
					// let add_data = this.removeModifiedValue(value[i].id);
					// add_data ? this.dataModified.removed_ids.push(value[i].id) : "";
					if(this.getData("cxPropId")){
						id+=this.getData("cxPropId");//No I18n
					}
					id+="_"+Lyte.Component.registeredHelpers.cruxConvertStringToValidSelector(field.api_name);
					this.$node.querySelector(id).setValue("");//no i18n
					for(var j=0; this.getData("pickListValues") != undefined && j<this.getData("pickListValues").length; j++){
						if(this.getData("pickListValues")[j][this.getData("cxPropUserValue")] == rem[0]){
							if(this.getData("pickListValues")[j].extra != "true"){
								this.origLen = this.origLen+1;
								// this.setData("origLen", this.getData("origLen")+1);//No I18n
								found = true;
							}
							break;
						}
					}
					break;
				}
			}
			if(!found){
				if(this.data.cxPropFrom === "create"){
					this.extraVals[sel] = false;
					if(this.data.pickListValues.length !== 0){
						var {cxPropSystemValue , cxPropUserValue}=this.data;
						Lyte.arrayUtils(this.data.pickListValues , "push", {[cxPropUserValue] : sel, [cxPropSystemValue] : sel});
					}
				}
				else{
					this.extraVals[sel] = false;					
				}
			}
			if(value.length == 0){
				this.setData("placeholder", (this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : (this.data.cxPropFrom == "filter" ? _cruxUtils.getI18n("crm.label.filter.typehere") : "")));//No I18n
				//this.setData("placeholder",( ( this.getData("cxPropFrom") == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : _cruxUtils.getI18n("None")) );//No I18n
			}
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			if(this.getData("displayValue").length == 0){
				lyteDropdown.classList.add('lyteDropNoOptSelected'); //no i18n
			}
			if(lyteDropdown.component.childComp === undefined && !this.data.cxPropCloseDropDownOnRemove){
				this.$node.querySelector("lyte-dropdown lyte-drop-button").click();//No I18n
			}
			this.setData("showNoOption", this.origLen == 0);//No I18n
		},
		selectOption : function(event, selected,dropNode,item){
			// if(this.data.cxPropFrom == "create" && this.data.cxPropType == "single" && selected == this.data.cxPropNoneKeyword){
			// 	this.$node.querySelector("lyte-dropdown").classList.add("cxNoneSelected"); //no i18n
			// }else{
			// 	this.$node.querySelector("lyte-dropdown").classList.remove("cxNoneSelected"); //no i18n
			// }
			const records = this.data.cxPropLazyLoad ? this.availableRecords : this.data.pickListValues;
			const key = this.data.cxPropUserValue;
			let rec_len = records.length;
			for (let i = 0; i < rec_len; i++) {
				const record = records[i];
				if (record[key] === selected) {
					record.cxPropSelected = true;
				} else if (record.cxPropSelected) {
					delete record.cxPropSelected;
				}
			}

			
			this.setData("cxPropValue", selected);//No I18n
			// if(this.getData("cxPropIsColorCodeEnabled")){
			// 	this.setColorCodeDatas();
			// }
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
			}
			if(this.getMethods("onOptionSelected")){
				/**
				 * @method onOptionSelected
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } selected
				 * @param {*} dropdown node
				 * @param {*} selected item
				 * 	This is fired when one of the options of the dropdown is selected. This is not fired for a multiselect
				 */
				return this.executeMethod("onOptionSelected", event, selected,dropNode,item);//No I18n
			}
			// this.setData("isError", false);//No I18n

		},
		openDropdown: function (ev, component) {
			if (this.data.cxPropReadonly) {
				return false;
			}
			return new Promise((resolve,reject) => {
				
		
				let beforeShowResult, picklistValues;
				let beforeShowPromise;

				if (this.getMethods("onBeforeShow")) {
					/**
					 * @method onBeforeShow
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } ev
					 * @param { * } component
					 * @param { * } this
					 * This is fired just before the dropdown is opened. You can decide whether to show or to not show the dropdown in this callback by returning (true or false) and you can make the request and return picklistvalues in this).
					 */
					 this.setData("showLoading", true);
					let result = this.executeMethod("onBeforeShow", ev, component, this);
					beforeShowPromise = Promise.resolve(result);	
				} else {
					beforeShowPromise = Promise.resolve(true);
				}

		
				beforeShowPromise.then((result) => {
					this.setData("showLoading", false);
					this.$node.querySelector("lyte-dropdown").resetSelected();
					beforeShowResult = result;
	
					if (beforeShowResult === false) {
						return reject("error");
					} else if (Array.isArray(beforeShowResult)) {
						this.setData("cxPropPicklistValues", beforeShowResult);
						if(!beforeShowResult || beforeShowResult.length === 0){
							this.setData("showNoOption", true);
						}
						picklistValues = this.getData("cxPropPicklistValues");
					} else {
						if (this.getData("cxPropPicklistValues")) {
							picklistValues = this.getData("cxPropPicklistValues");
						} else if (this.data.cxPropField.ui_type === 137) {
							picklistValues = this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].allowed_modules : this.data.cxPropField.allowed_modules;
						} else if (this.data.cxPropField.options) {
							picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].options : this.getData("cxPropField").options;
						} else {
							picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;
						}
					}
	
					if (this.data.cxPropFrom === "create" && Object.keys(this.extraVals).length > 0) {
						for (var key in this.extraVals) {
							if (this.extraVals[key] === false) {
								var { cxPropSystemValue, cxPropUserValue } = this.data;
								picklistValues.push({ [cxPropSystemValue]: key, [cxPropUserValue]: key });
							}
						}
					}
	
					if ((!picklistValues || picklistValues.length === 0) && this.data.cxPropModule) {
						if (this.data.cxPropField.id) {
							this.setData("showLoading", true);
	
							var module_name = typeof moduleRecordMapping !== "undefined" ? moduleRecordMapping[this.data.cxPropModule].api_name : this.data.cxPropModule;
	
							return store.findRecord("field", this.data.cxPropField.id, { module: module_name }, true).then((data) => {
									this.setData("cxPropField", data[0]);
									this.openDropdownFn();
									this.setData("showLoading", false);
									resolve(true);
								});
						} else {
							this.setData("showNoOption", true);
							return resolve(true);
						}
					} else {
						this.openDropdownFn();
						resolve(true);
					}
				});
			});
		},
		
		closeDropdown : function(Eve,dropDownComp){
			var search = this.$node.querySelector("lyte-search");//No I18n
			this.closing = true;
			search = search ? search : this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-search");//No I18n
			if(search){
				search.setValue("");//No i18n
			}
			this.setData("searchValue", "");//No i18n
			if(this.getMethods("onHide")){
				/**
				 * @method onHide
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } Eve
				 * @param { * } dropDownComp
				 * This callback is fired when the dropdown is hidden
				 */
				this.executeMethod("onHide", Eve, dropDownComp);//No I18n
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, Eve, dropDownComp);
			}
		},
		singleSearch : function(res){
			this.setData("showNoOption", res.length == 0);//No i18n
		},
		beforeHide : function(ev){
			if(this.preventClose){
				this.preventClose = false;
				if(ev && ev.type == "scroll"){
					return false;
				}
			}
		},
	    hideInfoTooltip: function() {
				var infoIcon = this.$node.querySelector(".cxCurrentHovercard"); //NO I18n
	      $L(infoIcon).removeClass('cxCurrentHovercard'); //No I18n
	    },
	    onSearchBoxFocused : function(event,node){
	    	var dropdown = this.$node.querySelector('lyte-dropdown'); //no i18n
	    	if(this.data.cxPropFrom == 'criteria' && !dropdown.ltProp('isOpen')){
	    		dropdown.open();
	    	}
	    },
		removeIconClicked : function(event,value){
			if(this.getMethods('onRemoveIconClicked')){
				/**
				 * @method onRemoveIconClicked
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param {*} event
				 * @param {*} value
				 * Fired when the remove icon is clicked
				 */
				this.executeMethod('onRemoveIconClicked',event,value);
			}
		}
	},
	openDropdownFn : function(){
		if(this.getData("pickListValues") == undefined || this.getData("pickListValues").length == 0){
				var picklistValues;
				if(this.getData("cxPropPicklistValues")){
					picklistValues = this.getData("cxPropPicklistValues");//No i18n
				}
				else if(this.data.cxPropField.ui_type == 137){
					picklistValues = this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].allowed_modules : this.data.cxPropField.allowed_modules;
					this.setData("cxPropUserValue", "plural_label");//NO I18n
					//this.setData("cxPropDisableExtraValue", true);//NO I18n
				}else{
					picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values ? this.getData("cxPropField").pick_list_values : this.getData("cxPropField").options ;//No I18n
				}
				if(this.data.cxPropShowSearch == true){
					this.setData("showSearchBox", true);
				}
				else if(this.data.cxPropShowSearch == false){
					this.setData("showSearchBox", false);
				}
				else if(picklistValues.length >= 10){
					this.setData("showSearchBox", true);//No I18n
				}
				if(!this.data.cxPropShowUnused){
					picklistValues = picklistValues.filter(function(item){return item.type != "unused"});//no i18n
				}
				var keys = picklistValues.map(function(val){
					return val[this.getData("cxPropUserValue")];
				}.bind(this));
				var orig = keys.slice(0);
				var newArr = [];
				var i=0,selectedCnt = 0;

				// if((this.getData("cxPropFrom") == "filter" || this.getData("cxPropFrom") == "criteria" ) && ["Stage","Currency","Priority","Call_Type","Activity_Type","Usage_Unit","Data_Source","Data_Processing_Basis","Carrier","Status","Quote_Stage","Data_Processing_Basis_Details","Campaigns","GL_Account","Pipeline","Segment_Label","Record_status"].indexOf(this.getData("cxPropField").api_name) == -1 && this.getData("cxPropDoNotSkipFirstValue") == false){
				// 	i = 1;
				// }
				var chArray = [];
				var value = this.getData("displayValue");//No I18n
				value = value.length ? value : !this.data.cxPropIncludeNoneOption ? [this.data.cxPropNoneKeyword] : [];
				for(; i<keys.length; i++){
					if(keys[i].indexOf(this.data.cxPropNoneKeyword) === -1 || this.getData("cxPropFrom") == "create"){
						var pick = picklistValues[orig.indexOf(keys[i])];
						if(chArray.indexOf(pick[this.data.cxPropUserValue]) < 0){
							if(value && value.indexOf(pick[this.getData("cxPropUserValue")]) > -1){
								//selected.push(pick.actual_value);
								selectedCnt = selectedCnt + 1;
								pick.cxPropSelected = true;
							}
							else{
								delete pick.cxPropSelected;
							}
							this.extraVals[pick[this.getData("cxPropUserValue")].toLowerCase()] = true;
							newArr.push(pick);
							chArray.push(pick[this.data.cxPropUserValue]);
						}
					}
				}
				if(this.data.cxPropLazyLoad && !this.instanceInitiated)
				{
					this.availableRecords = newArr;
					this.instances.standard.constructNextBatch();
					this.instanceInitiated = true;
				}else{
					this.setData("pickListValues", newArr);//No I18n
				}	
				this.$node.querySelector("lyte-dropdown").resetSelected();
				this.origLen = newArr.length-selectedCnt;
				if(selectedCnt == newArr.length && this.getData("cxPropType") != "single"){
					this.setData("showNoOption",true);//no i18n
				}
			}
			else if(this.data.cxPropLazyLoad && this.getData("cxPropType") === "single"){
				const records = this.availableRecords;
				const key = this.data.cxPropUserValue;
				const rec_len = records.length;

				for (let i = 0; i <rec_len;  i++) {
					const record = records[i];
					if (record[key] === this.data.cxPropValue) {
						record.cxPropSelected = true;
					} else if (record.cxPropSelected) {
						delete record.cxPropSelected;
					}
				}
			}
	},
	validate : function(){
		var field = this.getData("cxPropField");//No I18n
		var val = this.getValue();//No I18n
		if(this.getData("cxPropFrom") == "create"){
			if(!this.validateMandatory(!val || val.length === 0 || val === this.data.cxPropNoneKeyword) && !this.data.cxPropIgnoreEmptyValue){
				return false;
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
		var i;//No I18n
		if(!this.data.cxPropIgnoreEmptyValue && (!val ||  val.length == 0)){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			return false;
		}
		var len = val.length
		for(i=0;i<len;i++){
			if(val[i].replace(/^\s+/g, '').replace(/\s+$/g, '').indexOf("*")>-1){
			this.showAlert(_cruxUtils.getI18n("crm.alert.character.not.allowed", "*"));//No I18n
			return false;
			}
		}

		return true;
	},
	getValue : function(value){
		var displayValue = this.getData("displayValue") , pickListValues;//No I18n
		if(this.getData("cxPropType") == "single"){
			if(value == this.getData("cxPropSystemValue")){
				var pickListValues;
				if(this.data.cxPropField.options){
					pickListValues = this.data.cxPropPicklistValues ? this.data.cxPropPicklistValues : this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].options : this.getData("cxPropField").options;//No I18n
				}else{
					pickListValues = this.data.cxPropPicklistValues ? this.data.cxPropPicklistValues : this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n
				}
				var picklistDisplayValues = pickListValues.map(function(val){
					return val[this.getData("cxPropUserValue")];
				}.bind(this))
				var index = picklistDisplayValues.indexOf(this.getData("cxPropValue"));
				if(index > -1){
					return pickListValues[index][this.getData("cxPropSystemValue")];
				}
			}
			return this.getData("cxPropValue");//No I18n
		}
		if(value == this.getData("cxPropSystemValue")){
			var arr = [];
			if(this.data.cxPropField.options){
				pickListValues = this.data.cxPropPicklistValues ? this.data.cxPropPicklistValues : this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].options : this.getData("cxPropField").options;
			}else{
				pickListValues = this.data.cxPropPicklistValues ? this.data.cxPropPicklistValues : this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n
			}
			var picklistDisplayValues = pickListValues.map(function(val){
				return val[this.getData("cxPropUserValue")];
			}.bind(this))
			for(var i=0; i<displayValue.length; i++){
				var index = picklistDisplayValues.indexOf(displayValue[i]);
				if(index > -1){
					arr.push(pickListValues[index][this.getData("cxPropSystemValue")]);
				}
			}
			return arr;
		}
		return displayValue;//No I18n
	},
	resetData:function(){	
	 if(this.getData('cxPropType')=='multiple' || this.getData('cxPropType')=='multisearch'){
			this.setData("displayValue", [])
			this.$node.querySelector("lyte-dropdown").ltProp("selected", [])
		}	
		else{
			this.setData('cxPropValue','');
		}
	},
	setColorCodeDatas : function(){
		var from = this.getData("cxPropFrom");//No I18n
		var picklistValues;
		if(this.getData("cxPropPicklistValues")){ //NO I18N
			picklistValues =  this.getData("cxPropPicklistValues");//No i18n
		}else if(this.getData("cxPropLayout")){ //NO I18N
			if(this.data.cxPropField.options){
				picklistValues = this.getData("cxPropField")[this.getData("cxPropLayout")].options; //No I18N
			}else{
				picklistValues = this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values ; //No I18N
			}
		}else if(this.data.cxPropField.options){
			picklistValues = this.getData("cxPropField").options;//No I18n
		}else if(this.getData("cxPropField").pick_list_values){ // No I18N
			picklistValues = this.getData("cxPropField").pick_list_values;//No I18n
		}
		var defaultValue=this.getData("cxPropValue");//no i18n
		var colorCode = null;
		var selectedPicklistValue = null;
		if(defaultValue){
			var {cxPropUserValue}=this.data;
			var selectedPicklistValue = picklistValues.filter(function(item){return item[cxPropUserValue] == defaultValue || item.display_label == defaultValue});
			var pick_list_options;
			if(this.data.cxPropField.options){
				pick_list_options=this.data.cxPropField.options;
			}else{
				pick_list_options=this.data.cxPropField.pick_list_values;
			}
			if(selectedPicklistValue.length < 1 && pick_list_options){ 
				selectedPicklistValue = pick_list_options.filter(function(item){ return item[cxPropUserValue] === defaultValue || item.display_label === defaultValue; }); 
			}
			colorCode	= selectedPicklistValue.length >= 1 ? selectedPicklistValue[0].colour_code : "#ffffff";
			this.setData("propDefaultColorCode",colorCode); //NO I18N
		}

		if(from == "view"){
			if(defaultValue && defaultValue !== this.data.cxPropNoneKeyword){
				var styleObj="";
				if(colorCode && colorCode !== "" && colorCode.indexOf("#") === 0){
					var fontColor = "black"; //NO i18n
					var colourCode = colorCode.substring(1);
					var c_r = parseInt(colourCode.substr(0, 2), 16);
					var c_g = parseInt(colourCode.substr(2, 2), 16);
					var c_b = parseInt(colourCode.substr(4, 2), 16);
					var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
					if(brightness < 175){
						fontColor = "white"; //NO I18N
					}
					styleObj = "color:" + fontColor+";";
				}
				styleObj = styleObj+ "background-color:" + colorCode + ";"; //No i18N
				if(colorCode === "#ffffff"){
					styleObj = styleObj + ";border: 1px solid #C9C9C9";  //No i18N
				}

				this.setData("propColorStyleObj",styleObj);//no i18n
				this.setData("pkColorEnabledClass","colorAppliedPicklist");//no i18n
			}else{
				this.setData("propColorStyleObj","");//no i18n
				this.setData("pkColorEnabledClass","colorAppliedPicklist colorAppliedPKNone");//no i18n
			}
		}else if(from == "create"){ //NO i18N
			if(this.getData("cxPropValue") == null || this.getData("cxPropValue") == "" || (selectedPicklistValue && selectedPicklistValue.length >= 1 && selectedPicklistValue[0][this.data.cxPropSystemValue] == this.data.cxPropNoneKeyword)){
				this.setData("pkColorEnabledClass","colorEnabledPicklist colorEnabledPKNone");//no i18n
			}else{
				this.setData("pkColorEnabledClass","colorEnabledPicklist");//no i18n
			}

		}

	},
	// observeLen : function(){
	// 	if(this.getData("origLen") == 0){
	// 		this.setData("showNoOption", true);//No I18n
	// 	}
	// 	else{
	// 		this.setData("showNoOption", false);//No I18n
	// 	}
	// }.observes("origLen"),//No I18n
	observeField : function(op){
		if(this.getData("cxPropFrom") != "view" && this.getData("cxPropValue")){
			var value = this.getData("cxPropValue");//No I18n
			if(this.getData("cxPropType") == "single"){
				this.setData("cxPropDisplayValue", value);//No I18n
				this.setData("displayValue", [value]);
			}
			else{
				if(value.indexOf("[") == -1){
					if(value.indexOf(";") != -1){
						value = value.split("; ");
						this.setData("cxPropValue", JSON.stringify(value))
					}
					else{
					    this.setData("cxPropValue", '["'+value+'"]')//No i18n
						value = [value];						
					}
				}
				else{
					value = JSON.parse(value);
				}
				var ret = value.length ?[value[0]] : [];
				var trimmed = value.length ? [value[0].toLowerCase().trim()] : [];
				var origLen = 0;
				var keys = [] , picklistValues = []
				if(this.data.pickListValues.length >0 ){
					picklistValues = this.data.pickListValues;
					// keys = picklistValues.map(function(p){
					// 	return p.display_value;
					// })
				}else{
					if(this.data.cxPropField.options){
						picklistValues= this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].options : this.getData("cxPropField").options;//No I18n
					}else{
						picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n
					}
				}
				if(picklistValues && picklistValues.length ){
					keys = picklistValues.map(function(p){
						return p[this.data.cxPropUserValue].toLowerCase().trim();
					}.bind(this))
				}
				for(var i=0; i<value.length; i++){
					var ind = keys.indexOf(value[i].toLowerCase().trim());
					if( ind > -1){
						origLen++;
						value[i] = picklistValues[ind][this.data.cxPropUserValue];
						if(i == 0){
							ret[i] = value[i];
						}
					}
					if(i>0 && trimmed.indexOf(value[i].toLowerCase().trim()) == -1){
						ret.push(value[i]);
						trimmed.push(value[i].toLowerCase().trim());
					}
				}
				this.setData("displayValue", ret);//No I18n
				if(keys.length){
					this.origLen = keys.length-origLen;
				}
				this.setData("showNoOption", this.origLen == 0);//No I18n
				if(this.getData("cxPropFrom") != "create" && !this.getData("cxPropPlaceholder")){
					this.setData("placeholder", _cruxUtils.getI18n("crm.label.filter.typehere"));//No I18n
				}
				else if(ret.length == 0){
					this.setData("placeholder", this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : _cruxUtils.getI18n("None"));//No I18n
				}
				else{
					this.setData("placeholder", "");//No i18n
				}
			}
		}
		if((this.getData("cxPropValue") == undefined	|| this.getData("cxPropValue") == "") && (op && op.type == "change" && op.item == "cxPropValue")){
			if(this.data.cxPropType!=='single'){
				this.setData("placeholder", this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : _cruxUtils.getI18n("None"));//No I18n
			}
			this.setData("cxPropDisplayValue", "");//No I18n
			this.setData('displayValue',[]); //no i18n
			this.setData("showNoOption", false);
		}
		if(this.data.cxPropFrom == "view"){
			if(!this.data.cxPropValue ||(this.data.cxPropType !== "single" && this.data.cxPropValue === '[]')){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(this.data.cxPropEmptyValue || this.data.cxPropType==='single'){
					this.setData("viewValue", this.data.cxPropEmptyValue);//NO I18n
				}else{
					this.setData("viewValue", this.data.cxPropValue);//No I18n
				}
			}
			else if(this.data.cxPropMaskingProperties){
				if(this.data.cxPropType != "single" && this.data.cxPropValue.indexOf("[") != -1 && this.testParse(this.data.cxPropValue)){
					this.setData("viewValue", Lyte.Component.registeredHelpers.cruxMaskValue(JSON.parse(this.data.cxPropValue).join("; "), this.data.cxPropMaskingProperties));//NO I18n
				} else{
					this.setData("viewValue", Lyte.Component.registeredHelpers.cruxMaskValue(this.data.cxPropValue, this.data.cxPropMaskingProperties));//No I18n
				}
			}
			else if(this.data.cxPropType != "single" && this.data.cxPropValue.indexOf("[") != -1){
				if(this.testParse(this.data.cxPropValue)){
					this.setData("viewValue", JSON.parse(this.data.cxPropValue).join("; "));//No I18n
				} else{
					this.setData("viewValue", this.data.cxPropValue);//No I18n
				}

			}
			else{
				this.setData("viewValue", this.data.cxPropValue);//No I18n
			}

			if(!this.data.cxPropTooltipConfig){
				this.setData("cxPropTooltipConfig", JSON.stringify({showdelay : 600}));
			}
		}
		else if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
			var drop = this.$node.querySelector("lyte-dropdown");
			if(drop){
				if(this.data.cxPropType === "single" ){
					if(!this.data.cxPropValue && this.data.pickListValues.length >0 && !this.data.cxPropPlaceholder){
						drop.ltProp("selected",this.data.pickListValues[0][this.data.cxPropUserValue]);
					}else{
						drop.ltProp("selected", this.data.cxPropValue);
					}				
				}
				else if(!this.data.cxPropValue){
					this.setData("displayValue", []);
					this.origLen = this.data.pickListValues ? this.data.pickListValues.length : 0;
				}
			}
			this.setData("cxPropDisableExtraValue", true);//no i18n
		}
		if(this.getData("cxPropIsColorCodeEnabled") && (this.data.cxPropFrom === "create" || this.data.cxPropFrom === "view" )){
			this.setColorCodeDatas();
		}
		if(this.data.cxPropShowOptionIcon && this.data.cxPropType==='single' && this.$node.querySelector('lyte-dropdown') && this.data.cxPropValue){
			var opt=this.data.pickListValues.filter((item)=>item[this.data.cxPropUserValue]===this.data.cxPropValue)[0];
			if(opt){
				this.setData("cxPropOptionIconClass",opt.cxPropOptionIconClass);
			}
		}
	}.observes("cxPropValue", "cxPropMaskingProperties", "cxPropFrom").on("init"),//No I18n
	testParse:function(obj){
		try{
			JSON.parse( obj );
			return true;
		} catch( e ){
			return false;
		}
	},
	init : function(){
		var from = this.getData("cxPropFrom");//No I18n
		// this.dataModified = {"added_ids" : [], "removed_ids" : []};
		if(from == "filter" && this.getData("cxPropMaxCount") == undefined){
			this.setData("cxPropMaxCount",50);//no i18n
		}
		if(from == "view"){
			if(this.getData("cxPropField").ui_type == 999){
				var value = JSON.parse(this.getData("cxPropValue")); //No I18n
				this.data.cxPropValue = value.join(", ");//No I18n
			}
		}
		if(this.data.cxPropFrom == "create" && !this.getData("cxPropType")){
			this.setData('cxPropType',"single");//No I18n
		}
		else if(!this.getData("cxPropType") || this.getData("cxPropType") == "multiple"){
			this.setData('cxPropType',"multisearch");//No I18n
		}
		if(this.getData("cxPropPlaceholder")){
			this.data.placeholder = this.getData("cxPropPlaceholder");//No I18n
		}
		if(from == "create"){
			this.setData("cxPropDisableExtraValue", true);//no i18n
			var field_picklist_options;
			// eslint-disable-next-line block-spacing
			if(this.data.cxPropField.options){ // eslint-disable-next-line block-spacing, eqeqeq, semi
				field_picklist_options=this.data.cxPropField.options;
			}else{
				field_picklist_options=this.data.cxPropField.pick_list_values;
			}
			if(this.data.cxPropType === 'single' && !this.data.cxPropPlaceholder && field_picklist_options && field_picklist_options[0] && field_picklist_options[0].actual_value === this.data.cxPropNoneKeyword){
				this.data.placeholder = field_picklist_options[0][this.data.cxPropUserValue];
			}
		}
		if(!this.getData("cxPropZcqaSelector")){
			this.setData("cxPropZcqaSelector", this.getData("cxPropUserValue"));//no i18n
		}
		this.extraVals = {};
		this.initialSearchRequest = false;
		if(this.data.cxPropLazyLoad){
			this.instanceInitiated = false;
			this.instances = {
				standard : undefined,
			};
			this.instances.standard = $L.cruxLazyLoad({ 
				lzCustomData : {
					type : "Standard"
				},
				lzProperties : {
					batchSize : 50,
					customRequest : true,
					isNonPagination : true,
					allAvailableRecords : [],
					triggerSearchLength : 1
				},
				lzMethods : {
					onNewBatch : this.nextBatchFunction.bind(this),
					onCustomRequest : this.customRequest.bind(this),
					beforeSearchRequestTriggered : this.onBeforeSearchRequestTriggered.bind(this),
					onInvalidResponse : this.invalidResponse.bind(this)
				}
			});

		}	

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		let uniqueKey = ()=>{
			let finalString = '' , len = 5;
			for(var k = 0; k < len; k++){
				finalString += Math.floor(Math.random() * 100).toString(36);
			}
			return finalString;
		};
		this.setData("uniqueId", uniqueKey());
		this.convertLtPropJson();
		
	},
	nextBatchFunction : function(instance, batch){
		this.setData("showNoOption", false);//No I18n
		if(this.initialSearchRequest){
				this.setData("pickListValues", batch); //No I18N
				this.initialSearchRequest = false;	
		}else{
			Lyte.arrayUtils(this.data.pickListValues, 'push', batch); //No I18N
		}
		
	},
	onBeforeSearchRequestTriggered : function(){
		this.initialSearchRequest = true;
	},
	invalidResponse : function(instance, response){
		this.setData("pickListValues", response); //No I18N
		this.setData("showNoOption", true);//No I18n
	},
	customRequest : function(){
		this.instances.standard.properties.allRecordsFetched = true;
		if(this.instances.standard.properties.isSearchReq){
			let dispValue = this.data.cxPropUserValue;
			let searchedRecords =  this.availableRecords.filter(item =>
				item[dispValue].toLowerCase().includes(this.instances.standard.properties.searchValue.toLowerCase())
			  );
			  return Promise.resolve(searchedRecords);
		}
		return Promise.resolve(this.availableRecords);
		
		
		
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-picklist-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){

		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
		//this.data.isError ? this.$node.querySelector("lyte-dropdown").classList.add("cxErrorBox") : this.$node.querySelector("lyte-dropdown").classList.remove("cxErrorBox");//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	actions : {
		setFocusClass: function(elem,isFocus){
			// debugger
			if(isFocus){
				elem.classList.add('cxInputFocused');
			}else{
				elem.classList.remove('cxInputFocused');
			}
		},
		onScroll : function(event){
			if(this.data.cxPropLazyLoad){
				this.instances.standard.performScroll(event);
			}	
		},
		searchBoxClicked : function(){
			if(this.getMethods("onSearchBoxClick")){
				/**
				 * @method onSearchBoxClick
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param {*} lyte-input element
				 * Fired when the search box is clicked
				 */
				var ret = this.executeMethod("onSearchBoxClick", this.$node.querySelector("lyte-input"));//No I18n
				if(ret == false){
					return false;
				}
			}
			if(this.$node.querySelector("lyte-dropdown").ltProp("isOpen") == true){
				if(this.$node.querySelector("lyte-search").querySelector("input").value){
					this.$node.querySelector("lyte-search").setValue("");//No I18n
				}
				// if(this.data.cxPropFrom == 'criteria' && !this.$node.querySelector('lyte-dropdown').ltProp('isOpen')){
		  //   		node.click();
		  //   	}
				return false;
			}
		},
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		setToolTip : function(Obj){
			if(Obj.offsetWidth < Obj.scrollWidth){
				Obj.setAttribute('lt-prop-title', Obj.textContent); //no i18n
		    }else{
		    	Obj.setAttribute('lt-prop-title', ""); //no i18n
		    }
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    }
	},
	extraVals : {},
	observesdidConnect : function(){
		if(this.getData("cxPropFrom") != "view"){
			this.$node.toggle = function(){
				this.querySelector("lyte-dropdown").toggle();//No i18n
			}
		}
		// if(this.data.cxPropFrom == "create" && this.data.cxPropType == "single" && this.$node.querySelector("lyte-dropdown")){
		// 	if(this.getData("cxPropValue") == "-None-"){
		// 		this.$node.querySelector("lyte-dropdown").classList.add("cxNoneSelected"); //no i18n
		// 	}else{
		// 		this.$node.querySelector("lyte-dropdown").classList.remove("cxNoneSelected"); //no i18n
		// 	}
		// }
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-dropdown");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropPrefixYield").on("didConnect"),//No I18n
	observePicklistValues : function(args){
		if(args.insertedItems && !args.insertedItems[0].extra){
			this.origLen++;
		}
	}.observes("pickListValues.[]"),// No I18n
	observeZcqa : function(){
		if(this.getData("cxPropFrom") == "create" && this.getData("cxPropType") == "single" && this.$node.querySelector("lyte-drop-button") && !this.getData("cxPropDropdownZcqa")){
			this.$node.querySelector("lyte-drop-button").setAttribute("data-zcqa", this.getData("cxPropZcqa"));//No I18n
		}
	}.observes("cxPropZcqa","lyteViewPort").on("didConnect"),//no i18n
	observePicklistValues_1 : function(){
		this.setData("pickListValues", []);//No I18n
		this.setData("showNoOption", false);
	}.observes("cxPropPicklistValues","cxPropPicklistValues.[]", "cxPropField.pick_list_values","cxPropField.options"),//No I18n
	openDropdownObserver : function(){
		if(this.getData('cxPropOpenDropdown')){
			setTimeout(function(){
				this.$node.querySelector("lyte-dropdown").open();//No I18n
			}.bind(this), 100);
		}
	}.observes("cxPropOpenDropdown"),//No I18n
	observeField_new : function(){
		if(this.$node.querySelector(".cxDropbox")){
			this.$node.querySelector(".cxDropbox").classList.add("search"+this.getData("cxPropField").column_name);//No I18n
		}
		if(this.data.cxPropFrom == "create" && this.data.cxPropType == "single" && !this.getData("cxPropValue") && !this.getData("cxPropPlaceholder")){
			var field_list_options;
			// eslint-disable-next-line block-spacing
			if(this.data.cxPropField.options){ // eslint-disable-next-line block-spacing, eqeqeq, semi
				field_list_options=this.data.cxPropField.options;
			}else{
				field_list_options=this.data.cxPropField.pick_list_values;
			}
			if(field_list_options && field_list_options[0] && field_list_options[0].actual_value !== this.data.cxPropNoneKeyword){
				this.setData("cxPropDisplayValue", field_list_options[0][this.data.cxPropUserValue]);
				this.setData("cxPropValue", field_list_options[0][this.data.cxPropUserValue]);
			}
		}
	}.observes("cxPropField","lyteViewPort").on("didConnect"),//No I18n



	observeField_new: function() {
		const lyteDropdown = this.$node.querySelector("lyte-dropdown");
		if (lyteDropdown) {
			if (this.data.isError) {
				lyteDropdown.classList.add("cxErrorBox");
			} else {
				lyteDropdown.classList.remove("cxErrorBox");
			}
		}
		
	}.observes("isError", "lyteViewPort").on("didConnect"),
	
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Called after element has entered viewport
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observePlaceholder : function(){
		this.setData("placeholder", this.getData("cxPropPlaceholder"));//No I18n
	}.observes("cxPropPlaceholder"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropDisabled").on("init"),//No I18n
	keyDownEvent : function(){
		if(this.$node.querySelector('lyte-dropdown') && this.$node.cxProp('aria')){
		  this.bindEventForAria();
		}
	}.observes('cxPropAria').on('didConnect'),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-dropdown");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeColorCode:function(){
		if(this.getData("cxPropIsColorCodeEnabled") && (this.data.cxPropFrom === "create" || this.data.cxPropFrom === "view" )){
			this.setColorCodeDatas();
		}
	}.observes("cxPropIsColorCodeEnabled"),
	observeTabindex : function(changes){
		this.observeTabindexMixin(changes);
	}.observes("cxPropTabindex", "cxPropTabIndex").on("init"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
		this.$node.closeDropDown = function(){
			this.querySelector("lyte-dropdown").close();//No i18n
		};
	}.observes('cxPropAria').on('didConnect'),
	observeType : function(){
		if(this.data.cxPropFrom == "create" && !this.getData("cxPropType")){
			this.setData('cxPropType',"single");//No I18n
		}
		else if(!this.getData("cxPropType") || this.getData("cxPropType") == "multiple"){
			this.setData('cxPropType',"multisearch");//No I18n
		}
	}.observes('cxPropType').on('init'),
	observeAndSetAriaAttributes : function(){
		if(this.data.cxPropAria){
			var cxField = this.data.cxPropField;
			var cxFieldKey = this.data.cxPropFieldKey;
			var ariaAttr = this.ariaGetMergedAttributes();
			if (!(ariaAttr && ariaAttr.cxAriaButton && ariaAttr.cxAriaButton['aria-label']) && (cxField && cxFieldKey && cxField[cxFieldKey])) {
				if (ariaAttr && !ariaAttr.cxAriaButton) {
					ariaAttr.cxAriaButton = {};
				}
				ariaAttr.cxAriaButton['aria-label'] = cxField[cxFieldKey];
			}
			this.setData('ariaAttributes', ariaAttr);
		}
	}.observes('cxPropAria', 'cxPropAriaButton', 'cxPropAriaBox', 'cxPropAriaBody', 'cxPropAriaAttributes').on('didConnect')
}, {mixins : ["crux-element-validation","crux-aria-dropdown-mixin"]});//No I18n


Lyte.Component.registerHelper('cruxConvertStringToValidSelector', function(string){
	if(!string){
		return "";
	}
	var dollarIndex = string.cruxFindAllIndexOf('$');
	dollarIndex.forEach(function(item){
		string = string.cruxReplaceIndex(item,"_");
	})
	return string.replace(new RegExp('->',"g"),'_').replace(new RegExp('[/.]','g'),'_')
});
/**
 * @syntax nonYielded
 * <crux-picklist-component cx-prop-from="create" cx-prop-field='{"api_name" : "picklistcreate", "pick_list_values" : [{"actual_value" : "Option 1", "display_value" : "Option 1"}, {"actual_value" : "Option 2", "display_value" : "Option 2"}]}'></crux-picklist-component>
 */
