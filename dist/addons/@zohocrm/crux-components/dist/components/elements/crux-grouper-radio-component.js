Lyte.Component.register("crux-grouper-radio-component", {
_template:"<template tag-name=\"crux-grouper-radio-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\"></div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <span class=\"cxElemCompViewWrap\" onclick=\"{{action('viewClicked',event)}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"cxGroupRadioBtnViewTag\" data-zcqa=\"{{concat(cxPropField.field_label,'_selectedColorCode')}}\" style=\"{{propDefaultColorCode}}\"> <lyte-text lt-prop-value=\"{{cxPropValue}}\" lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600 }\" lt-prop-tooltip-class=\"lvTooltipClass\" lt-prop-show=\"{{cxPropShowTooltip}}\"></lyte-text> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropTooltip}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-value=\"{{cxPropValue}}\"></lyte-text> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropUnescape}}\"><template case=\"true\"> {{unescape(cxPropValue)}} </template><template case=\"false\"> {{cxPropValue}} </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template></template></template></template> </span> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropIsDisplayFormatEnabled}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropField.display_format,'==','group_button')}}\"><template case=\"true\"> <div @class=\"groupbutton cxGrouperRadioCont cxYieldObserverElemComp {{if(cxPropIsColorCodeEnabled,'cxColorEnabledField','')}} {{if(expHandlers(ifEquals(cxPropDisabled,true),'||',ifEquals(cxPropReadonly,true)),'cxGrouperWrapDisabled')}}\" lt-prop-title=\"{{tooltip}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{cxPropNoneOption}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropFrom,'==','create')}}\"><template case=\"true\"> <div tabindex=\"{{cxPropTabIndex}}\" class=\"cxBtnGrouperFoucs {{cxPropWrapperClass}}\"> <span class=\"cxGrouperBtnNoneOption {{if(ifEquals(cxPropDisabled,true),'cxGrouperGroupBtnDisabled')}}\"></span> </div> </template><template case=\"false\">{{cxPropEmptyValue}}</template></template> </template><template case=\"false\"> <div class=\"cxFlex cxGrouperGroupBtn cxBtnGrouperFoucs {{if(ifEquals(cxPropDisabled,true),'cxGrouperGroupBtnDisabled')}} {{if(ifEquals(cxPropReadonly,true),'cxGrouperViewMode')}} {{cxPropWrapperClass}} {{if(expHandlers(ifEquals(cxPropErrorType,'mandatory'),'||',expHandlers(cxPropErrorMessage,'&amp;&amp;',ifNotEquals(cxPropErrorType,'selection'))),'cxGrouperRadioMandatoryError')}} {{if(ifEquals(cxPropErrorType,'selection'),'cxSelectionError')}} {{cxPropDivSelectionClass}}\" onfocusin=\"{{action('onGrouperFocusBlur',event)}}\" onfocusout=\"{{action('onGrouperFocusBlur',event)}}\"> <template is=\"for\" items=\"{{pickListValues}}\" item=\"item\" index=\"index\"> <div onclick=\"{{action('clickAction',item,event)}}\" style=\"{{if(cxPropIsColorCodeEnabled,concat('background-color:',if(ifEquals(item[cxPropUserValue],cxPropValue),item.colour_code,'transparent'),';'))}}\" onmouseover=\"{{action('onGrouperBtnElemHover',event,item)}}\" onmouseout=\"{{action('onGrouperBtnElemBlur',event,item)}}\" class=\"cxAriaGrouperBtnElem cxGrouperGroupBtnElem {{if(expHandlers(pickListValues.length,'===',1),'cxGrouperGroupBtnSingleElem','')}} {{if(expHandlers(cxPropIsColorCodeEnabled,'!'),'cxGrouperGroupBtnDefault','')}} {{if(ifEquals(item[cxPropUserValue],cxPropValue),concat('cxGrouperGroupBtnSelected ',if(expHandlers(cxPropIsColorCodeEnabled,'&amp;&amp;',expHandlers(cruxGetPicklistFontColor(item.colour_code),'===','white')),'cxGrouperColorFFF')))}} {{cxPropGrouperBtnClass}}\" onfocus=\"{{action('onGrouperDivFocus',event)}}\" onblur=\"{{action('onGrouperDivBlur',event)}}\" onmousedown=\"{{action('gpMouseDown')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',item[cxPropZcqaSelector])}}\" role=\"option\" tabindex=\"{{if(cxPropTabindex,cxPropTabindex,cxPropTabIndex)}}\" data-tabindex=\"{{cxPropDataTabindex}}\"> <template is=\"if\" value=\"{{expHandlers(item[cxPropUserValue],'==',cxPropValue)}}\"><template case=\"true\"> <span class=\"{{if(ifEquals(cxPropTickIconClass,''),'cxGrouperTickIcon',cxPropTickIconClass)}} {{if(expHandlers(cxPropIsColorCodeEnabled,'&amp;&amp;',expHandlers(cruxGetPicklistFontColor(item.colour_code),'===','white')),'cxGrouperWhiteTickIcon')}}\"></span> </template></template> <template is=\"if\" value=\"{{cxPropShowOptionIcon}}\"><template case=\"true\"> <span class=\"{{item.cxPropOptionIconClass}}\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropTextOptionHide,'!')}}\"><template case=\"true\"> <lyte-text id=\"cx-radiobtn-label-{{index}}\" lt-prop-value=\"{{item[cxPropUserValue]}}\" class=\"{{cxPropOptionLableClass}}\" lt-prop-show=\"{{cxPropShowTooltip}}\"></lyte-text> </template></template> </div> </template> </div> </template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDisabledIconClass}}\"></lyte-icon></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropField.display_format,'==','radio_button')}}\"><template case=\"true\"> <div @class=\"singlechoice cxGrouperRadioCont cxYieldObserverElemComp {{if(cxPropIsColorCodeEnabled,'cxColorEnabledField','')}}\" lt-prop-title=\"{{tooltip}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{cxPropNoneOption}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropFrom,'==','create')}}\"><template case=\"true\"> <div tabindex=\"{{cxPropTabIndex}}\" class=\"cxBtnGrouperFoucs {{cxPropWrapperClass}}\"> <span class=\"cxGrouperBtnNoneOption {{if(ifEquals(cxPropDisabled,true),'cxGrouperGroupBtnDisabled')}}\"></span> </div> </template><template case=\"false\">{{cxPropEmptyValue}}</template></template> </template><template case=\"false\"> <div class=\"cxGrouperRadioBtn cxBtnGrouperFoucs {{if(expHandlers(ifEquals(cxPropErrorType,'mandatory'),'||',expHandlers(cxPropErrorMessage,'&amp;&amp;',ifNotEquals(cxPropErrorType,'selection'))),'cxGrouperRadioMandatoryError')}} {{if(ifEquals(cxPropDisabled,true),'cxGrouperRadioBtnDisabled')}} {{if(ifEquals(cxPropReadonly,true),'cxGrouperViewMode')}} {{cxPropClass}} {{if(ifEquals(cxPropErrorType,'selection'),'cxSelectionError')}} {{cxPropWrapperClass}} {{cxPropDivSelectionClass}}\" onfocusin=\"{{action('onFocus',event)}}\" onfocusout=\"{{action('onBlur',event)}}\"> <lyte-radiobutton-group lt-prop-read-only=\"{{cxPropReadonly}}\" lt-prop-prevent-focus=\"{{cxPropPreventFocus}}\" lt-prop-disabled-list=\"{{if(ifEquals(cxPropDisabled,true),disableValues)}}\" lt-prop-type=\"primary\" on-changed=\"{{method('radiobuttonchanged')}}\" lt-prop-selected=\"{{lbind(selectedValue)}}\" lt-prop-yield=\"true\" lt-prop-name=\"{{cxPropId}}_group_{{cxPropField.api_name}}\" lt-prop-user-value=\"{{cxPropUserValue}}\" lt-prop-system-value=\"{{cxPropSystemValue}}\" lt-prop-options=\"{{pickListValues}}\" lt-prop-radio-btn-class=\"lyteRadioLabelBiggerCase\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-selected-class=\"cxRadioSelected\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes.cxAriaGrouperRadio}}\" lt-prop-keyboard-navigation=\"{{cxPropAllowKeyNavigation}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tabindex=\"{{if(cxPropTabindex,cxPropTabindex,cxPropTabIndex)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropShowOptionIcon}}\"><template case=\"true\"> <span class=\"{{ltItem.cxPropOptionIconClass}}\"></span> </template></template> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"cxGrouperRadioBtnDummyLabel\" onmouseover=\"{{action('onRadionbtnHover',event,ltItem)}}\" onmouseout=\"{{action('onRadiobtnblur',event,ltItem)}}\"></span> <span onmouseover=\"{{action('onRadionbtnHover',event,ltItem)}}\" onmouseout=\"{{action('onRadiobtnblur',event,ltItem)}}\" class=\"cxGrouperRadioBtnBgTag {{if(ifEquals(ltItem[cxPropUserValue],cxPropValue),concat('cxGrouperRadioBtnSelected ',if(expHandlers(cruxGetPicklistFontColor(ltItem.colour_code),'===','white'),'cxGrouperColorFFF')),'')}} {{cxPropOptionLableClass}}\" style=\"{{if(cxPropIsColorCodeEnabled,concat('background-color:',if(ifEquals(ltItem[cxPropUserValue],cxPropValue),ltItem.colour_code,'transparent'),';'))}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropTextOptionHide,'!')}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{ltItem[cxPropUserValue]}}\" lt-prop-show=\"{{cxPropShowTooltip}}\"> </lyte-text> </template></template> </span> </template><template case=\"false\"> <span class=\"cxGrouperRadioBtnBgTag cxGrouperRadioBtnDefaultTag {{if(ifEquals(ltItem[cxPropUserValue],cxPropValue),'cxGrouperRadioBtnSelected ','')}} {{cxPropOptionLableClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropTextOptionHide,'!')}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{ltItem[cxPropUserValue]}}\" lt-prop-show=\"{{cxPropShowTooltip}}\"> </lyte-text> </template></template> </span> </template></template> </template> </lyte-radiobutton-group> <template is=\"if\" value=\"{{expHandlers(expHandlers(mandatoryResetFlag,'!'),'&amp;&amp;',showResetOption)}}\"><template case=\"true\"> <div onclick=\"{{action('clearRadioSelection',event)}}\" onkeyup=\"{{action('handleResetOnEnterKey',event)}}\" class=\"cxGrouperRadioBtnReset {{if(cruxOr(ifEquals(cxPropValue,''),cxPropReadonly,cxPropDisabled),'cxGrouperRadioBtnDisableReset','')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_','clearFiled')}}\" data-tabindex=\"{{cxPropDataTabindex}}\" tabindex=\"{{cxPropTabIndex}}\">{{cruxGetI18n('crm.title.clear.name')}}</div> </template></template> </div> </template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDisabledIconClass}}\"></lyte-icon></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> </template></template></template></template> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template></template> </template><template case=\"criteria\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropField.display_format,'==','dropdown'),'||',expHandlers(cxPropField.display_format,'==',undefined)),'||',expHandlers(cxPropIsDisplayFormatEnabled,'==',false)),'||',expHandlers(expHandlers(cxPropFrom,'!==','create'),'&amp;&amp;',expHandlers(cxPropFrom,'!==','view')))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"dIB activitesColor\" id=\"selectColorComponent_{{cxPropField.id}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_selectedColor')}}\" style=\"background:{{propDefaultColorCode}}\"></span> </template></template> <lyte-dropdown id=\"{{cxPropId}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;followcursor&quot;, &quot;appearance&quot;: &quot;box&quot;}\" lt-prop-tooltip-class=\"cxElementsTooltip\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-disabled-list=\"[&quot;cruxDisabled&quot;]\" lt-prop-yield=\"true\" lt-prop-type=\"{{cxPropType}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" on-add=\"{{method('addToList',cxPropField)}}\" on-remove=\"{{method('removeFromList',cxPropField)}}\" lt-prop-selected=\"{{cxPropValue}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-display-value=\"{{cxPropDisplayValue}}\" on-option-selected=\"{{method('selectOption')}}\" lt-prop-placeholder=\"{{placeholder}}\" lt-prop-search-delay=\"{{cxPropSearchDelay}}\" on-before-show=\"{{method('openDropdown')}}\" on-hide=\"{{method('closeDropdown')}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" lt-prop-no-result-yield=\"true\" on-show=\"{{method('onDropdownOpen')}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" on-before-hide=\"{{method('beforeHide')}}\" data-zcqa=\"{{cxPropDropdownZcqa}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" lt-prop-icon-class=\"{{cxPropDropdownIconClass}}\" lt-prop-button-class=\"{{cxPropButtonClass}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!=',&quot;single&quot;)}}\"><template case=\"true\"> <lyte-drop-button data-zcqa=\"{{if(cxPropDropdownZcqa,'',cxPropZcqa)}}\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{displayValue}}\" item=\"item\" index=\"index\"> <li data-value=\"{{item}}\"> <span class=\"lyteDropdownVisible\" onmouseenter=\"{{action('setToolTip',this)}}\">{{unescape(cruxReplaceSpace(cruxEncodeHTML(item)))}}</span> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-search class=\"w100per\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-search-delay=\"{{cxPropSearchDelay}}\" lt-prop-type=\"text\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;{{concat(&quot;.parentscope_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name))}}&quot;, &quot;target&quot;:&quot;.picklist_values:not(.lyteDropdownActive)&quot;, &quot;search&quot;:&quot;lyte-drop-item.picklist_values:not(.lyteDropdownActive)&quot;}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-search=\"{{method('showNoResult',cxPropField)}}\" id=\"{{concat(&quot;search_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name))}}\" lt-prop-placeholder=\"{{if(displayValue.length,'',placeholder)}}\" onclick=\"{{action('searchBoxClicked')}}\" on-focus=\"{{method('onSearchBoxFocused')}}\" onkeydown=\"{{action('preventDefault',this,event)}}\" lt-prop-trim=\"true\" lt-prop-readonly=\"{{cxPropReadonly}}\"></lyte-search> </li> </ul> </lyte-drop-button> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropPicklistButtonYield}}\"><template case=\"true\"> <lyte-drop-button> <lyte-yield yield-name=\"picklistButtonYield\"></lyte-yield> </lyte-drop-button> </template></template></template></template> <lyte-drop-box class=\"cxDropbox {{if(cxPropIsColorCodeEnabled,'colorEnabledPKDropBox','')}} {{cxPropBoxClass}}\"> <lyte-drop-body id=\"{{cxPropField.api_name}}\" class=\"{{concat(&quot;parentscope_&quot;,cxPropId,&quot;_&quot;,cruxConvertStringToValidSelector(cxPropField.api_name))}}\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"><div class=\"aligncenter\"><span class=\"cxElementsLoaderBg\"></span></div> </template><template case=\"false\"> <template is=\"for\" items=\"{{pickListValues}}\" item=\"item\" index=\"indeval\"> <template is=\"if\" value=\"{{item.cxPropSelected}}\"><template case=\"true\"> <lyte-drop-item class=\"picklist_values {{if(item.extra,'lyteDropdownSelection','')}} {{if(cruxAnd(ifEquals(cxPropIsColorCodeEnabled,'true'),ifEquals(item.actual_value,'-None-')),'colorEnabledSelect2None','')}} {{if(item.cxDisableSelect,'cxDropboxNoneItem','')}}\" data-value=\"{{item[cxPropUserValue]}}\" data-extra=\"{{item.extra}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',item[cxPropZcqaSelector])}}\" selected=\"true\"> <template is=\"if\" value=\"{{cxPropPicklistYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"picklistYield\" item-obj=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"dIB activitesColor\" style=\"background:{{item.colour_code}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_option_',item[cxPropZcqaSelector])}}\"> </span> </template></template> {{item[cxPropUserValue]}} </template></template> </lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item class=\"picklist_values {{if(item.extra,'lyteDropdownSelection','')}} {{if(cruxAnd(ifEquals(cxPropIsColorCodeEnabled,'true'),ifEquals(item.actual_value,'-None-')),'colorEnabledSelect2None','')}} {{if(item.cxDisableSelect,'cxDropboxNoneItem','')}}\" data-value=\"{{item[cxPropUserValue]}}\" data-extra=\"{{item.extra}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',item[cxPropZcqaSelector])}}\"> <template is=\"if\" value=\"{{cxPropPicklistYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"picklistYield\" item-obj=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropIsColorCodeEnabled}}\"><template case=\"true\"> <span class=\"dIB activitesColor\" style=\"background:{{item.colour_code}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_option_',item[cxPropZcqaSelector])}}\"> </span> </template></template> {{item[cxPropUserValue]}} </template></template> </lyte-drop-item> </template></template> </template> <template is=\"if\" value=\"{{showNoOption}}\"><template case=\"true\"><div class=\"cxDropdownNoResult\" data-value=\"cruxDisabled\">{{cruxGetI18n('crm.label.no.options.found')}}</div></template></template> </template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-drop-footer><lyte-yield yield-name=\"footer\"></lyte-yield></lyte-drop-footer></template></template> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"propDefaultColorCode"}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropIsColorCodeEnabled",{"type":"helper","value":{"name":"concat","args":["'background-color:'",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["item[cxPropUserValue]","cxPropValue"]}},"item.colour_code","'transparent'"]}},"';'"]}}]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropIsColorCodeEnabled",{"type":"helper","value":{"name":"concat","args":["'background-color:'",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["ltItem[cxPropUserValue]","cxPropValue"]}},"ltItem.colour_code","'transparent'"]}},"';'"]}}]}}}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"criteria":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","propDefaultColorCode"]}}}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]}]},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","item.colour_code"]}}}}]}},"default":{}},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","item.colour_code"]}}}}]}},"default":{}},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","lyteViewPort","cxPropValue","cxPropFrom","cxPropField","cxPropFieldKey","cxPropDisabled","cxPropZcqa","cxPropId","cxPropName","cxPropType","cxPropErrorMessage","cxPropDisplayValue","selectedValue","isError","cxPropClearErrorMessage","cxPropErrorYield","cxPropEmptyValue","cxPropTooltip","selected","cxPropErrorClass","pickListValues","cxPropUserValue","cxPropSystemValue","cxPropIsDisplayFormatEnabled","cxPropNoneKeyword","cxPropIsColorCodeEnabled","displayValue","cxPropBoundary","disabledList","cxPropTabIndex","cxPropTabindex","cxPropPlaceholder","cxPropZcqaSelector","placeholder","cxPropSearchDelay","cxPropReadonly","cxPropAppearance","cxPropClass","cxPropFreeze","cxPropDropdownZcqa","cxPropScope","cxPropAria","cxPropAriaAttributes","cxPropRadioAriaAttributes","cxPropDropdownIconClass","cxPropPreventParentScroll","cxPropUpdateDelay","cxPropSearchDelay","cxPropMaxlength","cxPropPicklistButtonYield","cxPropPicklistYield","showNoOption","isError","tooltip","cxPropOpenDropdown","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropErrorSpanClass","cxPropPreventFocus","cxPropNoneOption","cxPropPicklistValues","showResetOption","cxPropMandatory","cxPropShowUnused","cxPropLayout","cxPropSelectionError","cxPropWrapperClass","cxPropErrorType","cxPropSelectOptionByDefault","mandatoryResetFlag","cxPropInputClass","cxPropRadioBtnClass","cxPropGrouperBtnClass","cxPropDivSelectionClass","cxPropOptionLableClass","cxPropTickIconClass","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropShowOptionIcon","cxPropMandatoryOption","cxPropMandatoryType","cxPropTextOptionHide","cxPropAllowKeyNavigation","cxPropShowTooltip","cxPropMaskingProperties","cxPropViewInfoTooltip","cxPropTooltipClass","cxPropUnescape","ariaAttributes","cxPropDataTabindex","cxPropPrefixYield","cxPropDivWrapperClass","cxPropSuffixYield","cxPropButtonYield","cxPropLabelClass","cxPropInfoTooltip","cxPropMandatoryOption","cxPropMandatoryType","propDefaultColorCode"],
_observedAttributesType :["object","object","boolean","string","string","object","string","boolean","string","string","string","string","string","string","object","boolean","boolean","boolean","string","string","string","string","array","string","string","boolean","string","boolean","array","object","array","string","string","string","string","string","number","boolean","string","string","boolean","string","string","boolean","object","array","string","boolean","number","number","number","boolean","boolean","boolean","boolean","string","boolean","string","string","string","string","boolean","boolean","array","boolean","boolean","boolean","string","boolean","string","string","boolean","boolean","string","string","string","string","string","string","boolean","string","boolean","object","string","boolean","boolean","boolean","object","boolean","string","boolean","object","string","boolean","string","boolean","boolean","string","string","object","string","string"],
 //No I18n
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
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			cxPropValue : Lyte.attr("string"),//No I18n
			cxPropFrom : Lyte.attr("string",{"default" : "view"}),//No I18n
			cxPropField : Lyte.attr("object", {"default": {}}),//No I18n
			cxPropFieldKey: Lyte.attr("string", { "default": "" }),//No I18n
			cxPropDisabled : Lyte.attr("boolean", {"default": false}),//No I18n
			cxPropZcqa : Lyte.attr("string",{"default": ""}),//No I18n
			cxPropId : Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropName : Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropType : Lyte.attr("string"), //NO I18n
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			cxPropDisplayValue : Lyte.attr("string",{"default":"display_label"}),//NO I18n
			//cxPropActualValue : Lyte.attr("string",{"default":"id"}),//NO I18n
			selectedValue :  Lyte.attr("object"),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			cxPropEmptyValue : Lyte.attr("string"), //No I18n
			cxPropTooltip : Lyte.attr("string"), //NO I18n
			selected :  Lyte.attr("string"), //NO I18n
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			pickListValues : Lyte.attr("array",{default:[]}),//No I18n
			cxPropUserValue : Lyte.attr("string", {default : "display_value"}),//No i18n
			cxPropSystemValue : Lyte.attr("string", {default : "actual_value"}),//No i18n
			cxPropIsDisplayFormatEnabled:Lyte.attr('boolean',{default:false}),
			cxPropNoneKeyword : Lyte.attr("string", {default : "-None-"}),

			cxPropIsColorCodeEnabled : Lyte.attr("boolean", {default : false}),//No I18n
			displayValue : Lyte.attr("array", {default : []}),//No I18n
			cxPropBoundary : Lyte.attr("object",{default : {}}),
			disabledList : Lyte.attr("array", {default : ["cruxDisabled"]}),//No I18n
			cxPropTabIndex : Lyte.attr("string",{default : "0"}),
			cxPropTabindex : Lyte.attr("string",{default : "0"}),
			cxPropPlaceholder : Lyte.attr("string", {"default": ""}),
			cxPropZcqaSelector : Lyte.attr("string"),
			placeholder : Lyte.attr("string", {default : _cruxUtils.getI18n("None")}),//No I18n
			cxPropSearchDelay : Lyte.attr('number'), //no i18n
			cxPropReadonly :Lyte.attr("boolean", {default : false}),
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			cxPropClass : Lyte.attr("string", {"default": ""}),
			cxPropFreeze : Lyte.attr("boolean", {default : false}),
			cxPropDropdownZcqa : Lyte.attr("string"),
			cxPropScope : Lyte.attr("string"),
			cxPropAria : Lyte.attr("boolean", {default : false}),
			cxPropAriaAttributes : Lyte.attr("object", { default: {} }),
			cxPropRadioAriaAttributes : Lyte.attr("array", { default: [] }),//No I18n
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),
			cxPropUpdateDelay : Lyte.attr('number'),
			cxPropSearchDelay : Lyte.attr('number'),
			cxPropMaxlength : Lyte.attr('number',{default : 120 }),
			cxPropPicklistButtonYield : Lyte.attr("boolean", {default : false}),//No i18n
			cxPropPicklistYield : Lyte.attr("boolean", {default : false}),//No I18n
			showNoOption : Lyte.attr("boolean", {default : false}),
			isError : Lyte.attr("boolean", {default : false}),
			tooltip : Lyte.attr("string"),
			cxPropOpenDropdown : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			cxPropPreventFocus:Lyte.attr("boolean",{default:false}),
			cxPropNoneOption:Lyte.attr("boolean",{default:false}),
			cxPropPicklistValues : Lyte.attr("array"), //No i18n
			showResetOption:Lyte.attr("boolean",{default:false}),
			cxPropMandatory : Lyte.attr("boolean"),
			cxPropShowUnused:Lyte.attr("boolean",{default:false}),
			cxPropLayout : Lyte.attr("string"),
			cxPropSelectionError:Lyte.attr("boolean",{default:false}),
			cxPropWrapperClass:Lyte.attr("string"),
			cxPropErrorType:Lyte.attr("string",{default:""}),
			cxPropSelectOptionByDefault:Lyte.attr("boolean",{default:false}),
			mandatoryResetFlag:Lyte.attr("boolean",{default:false}),
			cxPropInputClass:Lyte.attr("string",{default:""}),
			cxPropRadioBtnClass:Lyte.attr("string",{default:""}),
			cxPropGrouperBtnClass:Lyte.attr("string",{default:""}),
			cxPropDivSelectionClass:Lyte.attr("string",{default:""}),
			cxPropOptionLableClass:Lyte.attr("string",{default:""}),
			cxPropTickIconClass:Lyte.attr("string",{default:""}),
			cxPropShowDisabledIcon   :  Lyte.attr("boolean",{default:false}),
			cxPropDisabledIconClass  :  Lyte.attr("string",{default:""}),
			cxPropShowOptionIcon:Lyte.attr("boolean",{default:false}),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropTextOptionHide:Lyte.attr("boolean",{default:false}),
			cxPropAllowKeyNavigation:Lyte.attr("boolean",{default:true}),
			cxPropShowTooltip:Lyte.attr("boolean",{default:true}),
			cxPropMaskingProperties: Lyte.attr("object"),//No I18n
			cxPropViewInfoTooltip: Lyte.attr("boolean", { default: false }),
			cxPropTooltipClass: Lyte.attr("string"),//No I18n
			cxPropUnescape: Lyte.attr("boolean", { default: false }),
			ariaAttributes: Lyte.attr("object", { default: {}}),
			cxPropDataTabindex: Lyte.attr("string",{default : ""}),
			cxPropPrefixYield: Lyte.attr("boolean", { default: false }),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropButtonYield: Lyte.attr("boolean", { default: false }),
			cxPropLabelClass: Lyte.attr("string", { "default": "" }), //NO I18n
			cxPropInfoTooltip: Lyte.attr("string", { "default": "" }),
			cxPropMandatoryOption: Lyte.attr('object', { default: { 'red_accent_line': '', 'asterisk': '*', 'required': '(' + _cruxUtils.getI18n("crm.label.required") + ')' } }),
			cxPropMandatoryType: Lyte.attr("string", { default: 'red_accent_line' }),
			propDefaultColorCode: Lyte.attr("string", { "default": "" })
		}
	},
	init : function(){
		if(this.data.cxPropFrom=="criteria" && (!this.getData("cxPropType") || this.getData("cxPropType") == "multiple")){
			this.setData('cxPropType',"multisearch");
		}
		if(!this.getData("cxPropZcqaSelector")){
			this.setData("cxPropZcqaSelector", this.getData("cxPropUserValue"));//no i18n
		}
		if(this.getData("cxPropPlaceholder") && this.data.cxPropFrom=='criteria'){
			this.data.placeholder = this.getData("cxPropPlaceholder");//No I18n
		}
		this.extraVals = {};
		
		 if(this.getData('cxPropField').display_format=='group_button' || this.getData('cxPropField').display_format=='radio_button'){
			this.getRadioFieldFn();
		}
		if(this.data.cxPropFrom!="criteria" &&this.data.cxPropField && this.data.cxPropField.read_only){
			this.setData('cxPropReadonly',true);
		}
		if(this.data.cxPropMandatory || this.data.cxPropField.required){
			this.setData("mandatoryResetFlag",true);
		}
		this.convertLtPropJson();
	},
	setOptionTabIndex:function(flag){
		if(this.data.cxPropReadonly || this.data.cxPropDisabled){
			return;
		}
		if(this.data.cxPropField.display_format==="group_button" && !this.data.cxPropReadonly ){
			var eles = this.$node.querySelectorAll(".cxGrouperGroupBtnElem");
			eles.forEach(function(item) {
				item.removeAttribute("tabindex");
			});
			var scl_ele;
			if(this.data.cxPropValue && eles.length > 0){
				scl_ele = Array.from(eles).find(ele => ele.classList.contains("cxGrouperGroupBtnSelected"));
			}else{
				scl_ele = eles[0];
			}
			if(!this.data.cxPropAllowKeyNavigation && scl_ele){
				scl_ele.setAttribute("tabindex", -1);
			}else if(scl_ele){
				scl_ele.setAttribute("tabindex", this.data.cxPropTabIndex);
				if(flag){
					scl_ele.focus();
				}
			}
		}else{
			var nodes=this.$node.querySelectorAll("input");
			nodes.forEach(function(item){
				item.removeAttribute("tabindex");
			}.bind(this));
			/* eslint-disable @zoho/webperf/no-attribute-selectors */
			var checkedOption = $L(this.$node).find(".cxBtnGrouperFoucs input.lyteHide[checked]");
			/* eslint-enable @zoho/webperf/no-attribute-selectors */
			if(!checkedOption.length){
				var _self=this.$node;
				var node=$L(_self);
				/* @zoho/webperf-disable no-multipleDOMLookup */
				checkedOption = node.find(".cxBtnGrouperFoucs input.lyteHide").eq(0);
			}
			if(!this.data.cxPropAllowKeyNavigation && checkedOption.length>0){
				checkedOption[0].setAttribute("tabindex", -1);
				if (nodes && nodes.length > 0) {
					nodes.forEach((item) => item.tabIndex = -1);
				}
			}else {
				if(checkedOption.length>0){
					checkedOption[0].setAttribute("tabindex", this.data.cxPropTabIndex);
				}
				if(flag && checkedOption.length>0){
					checkedOption[0].focus();
					this.setTabFocus=false;
				}
			}
				
		}
	},
	didConnect:function(){
		var rootElement=this.$node;
		this.handleKeyUp=this.handleKeyUp.bind(this);
		rootElement.addEventListener('keydown', this.handleKeyUp);
		this.setOptionTabIndex();
		if(this.data.cxPropField.display_format==="radio_button"){
			this.setDataZcqa();
		}
	},
	didDestroy : function(){
		var rootElement=this.$node;
		rootElement.removeEventListener("keydown",this.handleKeyUp);
  	},
	 handleKeyUp:function(event) {
		if (!event.target.classList.contains("cxGrouperGroupBtnElem") || event.keyCode==="9") {
			return;
		}
		this.MouseFocusDown=false;
		var isArrowKey = event.key.startsWith('Arrow');
		if (isArrowKey && !event.shiftKey) {
			event.preventDefault();
		}
		var comp = this;
		var filed = comp.getData("pickListValues");
		var optionsArr=this.$node.querySelectorAll(".cxGrouperGroupBtnElem");
		var optionsArr_leng=optionsArr.length;
		for(var i=0;i<optionsArr_leng;i++){
			if(optionsArr[i].classList.contains('cxGroupBtnFocused')){
				optionsArr[i].classList.remove('cxGroupBtnFocused');
			}
		}
		var cxPropUserValue = comp.getData("cxPropUserValue");
		var selectedIndex = Array.from(optionsArr).findIndex(optn => optn.classList.contains('cxGrouperGroupBtnSelected'));
		if(selectedIndex===-1){
			selectedIndex=0;
		}
		var newIndex;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			newIndex = (selectedIndex - 1 + optionsArr.length) % optionsArr.length;
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			newIndex = (selectedIndex + 1) % optionsArr.length;
		} else {
			// Ignore other keys
			return;
		}
		this.setTabFocus=true;	
		comp.setData("cxPropValue", filed[newIndex][cxPropUserValue]);
		if(this.getMethods("onValueChange")){
			this.executeMethod("onValueChange", this.getValue(),event.type);//No I18n
		}
		optionsArr[newIndex].classList.add('cxGroupBtnFocused');

		// comp.$node.querySelector(".cxGrouperGroupBtnSelected").focus();
	},
	getValue : function(value){
		var displayValue = this.getData("displayValue");//No I18n
		if(this.data.cxPropFrom=="create" || this.data.cxPropFrom=="view"){
			return this.data.cxPropValue;
		}
		if(value == this.getData("cxPropSystemValue")){
			var arr = [];
			var pickListValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n
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
		return displayValue
	},
	validate : function(){
		var field = this.getData("cxPropField");//No I18n
		var val = this.getValue();//No I18n
		if(this.getData("cxPropFrom") == "create" || this.data.cxPropFrom=="view"){
			if(!this.validateMandatory(!val || val.length == 0 || val == this.data.cxPropNoneKeyword)){
				return false;
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
		var i;//No I18n
		if(!val ||  val.length == 0){
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
	onGrouperRadioFocus:function(){
		this.MouseFocusDown=true;
		this.setOptionTabIndex(true);
			// if(this.data.cxPropField.display_format === "radio_button"){
			// 	var _self=this.$node;
			// 	/* eslint-disable @zoho/webperf/no-attribute-selectors */
			// 	var checkedOption = $L(_self).find(".cxBtnGrouperFoucs input.lyteHide[checked]");
			// 	/* eslint-disable @zoho/webperf/no-attribute-selectors */
			// 	if(!checkedOption.length){
			// 		checkedOption = $L(_self).find(".cxBtnGrouperFoucs input.lyteHide").eq(0);
			// 	}
			// 	checkedOption.focus();
			// }else{
			// 	// $(currElem).find(".cxBtnGrouperFoucs").focus();
			// }
			
		
	},
	getRadioFieldFn : function(){
		if(this.getData("pickListValues") == undefined || this.getData("pickListValues").length == 0){
				var picklistValues;
				if(this.getData("cxPropPicklistValues")){
					picklistValues = this.getData("cxPropPicklistValues");//No i18n
				}
				else if(this.data.cxPropField.ui_type == 137){
					picklistValues = this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].allowed_modules : this.data.cxPropField.allowed_modules;
					this.setData("cxPropUserValue", "plural_label");//NO I18n
					//this.setData("cxPropDisableExtraValue", true);//NO I18n
				}else if(this.data.cxPropField.options){
					picklistValues=this.getData('cxPropField').options;
				}
				else{
					picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n

				}
				if(this.data.cxPropFrom=='criteria' && picklistValues.length >= 10){
					this.setData("showSearchBox", true);//No I18n
				}
				picklistValues= picklistValues || [] ;
				if(!this.data.cxPropShowUnused){
					picklistValues = picklistValues.filter(function(item){return item.type != "unused"});//no i18n
				}
				var keys = picklistValues.map(function(val){
					return val[this.getData("cxPropUserValue")];
				}.bind(this));
				if(picklistValues.length==1 && picklistValues[0][this.getData("cxPropUserValue")]==this.data.cxPropNoneKeyword){
					this.setData("cxPropNoneOption",true);
					this.setData("pickListValues",picklistValues);
				}else{
				var orig = keys.slice(0);
				var newArr = [];
				var i=0,selectedCnt = 0;

				// if((this.getData("cxPropFrom") == "filter" || this.getData("cxPropFrom") == "criteria" ) && ["Stage","Currency","Priority","Call_Type","Activity_Type","Usage_Unit","Data_Source","Data_Processing_Basis","Carrier","Status","Quote_Stage","Data_Processing_Basis_Details","Campaigns","GL_Account","Pipeline","Segment_Label","Record_status"].indexOf(this.getData("cxPropField").api_name) == -1 && this.getData("cxPropDoNotSkipFirstValue") == false){
				// 	i = 1;
				// }
				var chArray = [];
				var value = this.getData("displayValue");//No I18n
				for(; i<keys.length; i++){
					if(keys[i].indexOf(this.data.cxPropNoneKeyword) === -1 ){
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
							if(this.data.cxPropFrom=='criteria'){
								this.extraVals[pick[this.getData("cxPropUserValue")].toLowerCase()] = true;
							}
							newArr.push(pick);
							chArray.push(pick[this.data.cxPropUserValue]);
						}
					}else{
						this.setData("showResetOption",true)
					}
				}
			
				this.setData("pickListValues", newArr);//No I18n
				if(this.data.cxPropFrom=='criteria'){
					this.origLen = newArr.length-selectedCnt;
				}
				// this.setData("origLen" ,newArr.length);//No I18n
				if(selectedCnt == newArr.length && this.getData("cxPropType") != "single" && this.data.cxPropFrom=='criteria'){
					this.setData("showNoOption",true);//no i18n
				}
			}
			}
			if(this.data.cxPropSelectOptionByDefault && !this.data.cxPropValue && this.data.cxPropField.display_format=="radio_button"){
					this.setData("cxPropValue",this.data.pickListValues[0][this.data.cxPropUserValue])
					if(this.getMethods("onValueChange")){
						this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
					}
			}
	},
	setDataZcqa:function(){
		var nodes=this.$node.querySelectorAll('lyte-radiobutton');
		if(nodes){
			var nodes_length=nodes.length;
			for(var i=0;i<nodes_length;i++){
				nodes[i].setAttribute("data-zcqa",this.data.cxPropField.field_label +'_'+ this.data.pickListValues[i][this.data.cxPropZcqaSelector]);
			}
		}
		var radio_node=this.$node.querySelector("lyte-radiobutton-group");
		if(radio_node){
			radio_node.removeAttribute("tabindex");
		}
		
	},
	resetRadioField: function () {
		this.setTabFocus = true;
		this.setData('cxPropValue', '');
		this.setData('selectedValue', {});
		this.setData("cxPropErrorType", "");
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
			selectedPicklistValue = picklistValues.filter(function(item){ return item[cxPropUserValue] === defaultValue || item.display_label === defaultValue; });
			var pick_list_options;
			if(this.data.cxPropField.options){
				pick_list_options=this.data.cxPropField.options;
			}else{
				pick_list_options=this.data.cxPropField.pick_list_values;
			}
			if(selectedPicklistValue.length < 1 && pick_list_options){ 
				selectedPicklistValue = pick_list_options.filter(function(item){ return item[cxPropUserValue] === defaultValue || item.display_label === defaultValue; }); 
			}
			colorCode	= selectedPicklistValue.length >= 1 ? selectedPicklistValue[0].colour_code : "transparent";
			this.setData("propDefaultColorCode",colorCode); //NO I18N
		}

		if(from === "view"){
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
				// if(colorCode === "#ffffff"){
				// 	styleObj = styleObj + ";border: 1px solid #C9C9C9";  //No i18N
				// }

				this.setData("propDefaultColorCode",styleObj);//no i18n
			}else{
				this.setData("propDefaultColorCode","");//no i18n
			}
		}
	},
	actions: {
		viewClicked: function (event) {
			if (this.getMethods('onValueClicked')) {
				this.executeMethod('onValueClicked', event);
			}
		},
		onGrouperFocusBlur:function(event){
			if(event.type==='focusin'){
				this.setTabFocus=true
			}else{
				this.setTabFocus=false
			}
		},
		onGrouperDivFocus:function(event){
			var _self=this;
			if(this.data.cxPropReadonly || this.data.cxPropDisabled){
				return;
			}
			if (this.getMethods("onFocusIn")) {
				this.executeMethod("onFocusIn", event);
			}
		// 	clearTimeout(this.data.setTimeOut);
		// var setTimeOut=	setTimeout(() => {
				if(!_self.MouseFocusDown && !event.target.classList.contains('cxGroupBtnFocused')){
					event.target.classList.add('cxGroupBtnFocused');
				}
			// }, 100);
			// this.setData("setTimeOut",setTimeOut);
		},
		gpMouseDown:function(){
			if(this.data.cxPropReadonly || this.data.cxPropDisabled){
				return;
			}
			this.MouseFocusDown=true;
		},
		onGrouperDivBlur:function(event){
			if (this.getMethods("onFocusOut")) {
				this.executeMethod("onFocusOut", event);
			}
			if(event.target.classList.contains('cxGroupBtnFocused')){
				event.target.classList.remove('cxGroupBtnFocused');
			}
		},
		setToolTip : function(Obj){
			if(Obj.offsetWidth < Obj.scrollWidth){
				Obj.setAttribute('lt-prop-title', Obj.textContent); //no i18n
		    }else{
		    	Obj.setAttribute('lt-prop-title', ""); //no i18n
		    }
		},
		clearRadioSelection:function(event){
			this.resetRadioField();
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"),event.type);//No I18n
			}			
		},
		handleResetOnEnterKey: function (event) {
			if (event.key === 'Enter' && event.keyCode === 13 && this.getData("cxPropValue")) {
				this.resetRadioField();
			}
		},
		onFocus:function(event){
			this.$node.querySelector('.cxGrouperRadioCont').children[0].classList.add('cxDropdownFocus');
			if (this.getMethods("onFocus")) {
				this.executeMethod("onFocus", event);
			}
		},
		onBlur:function(event){
			this.$node.querySelector('.cxGrouperRadioCont').children[0].classList.remove('cxDropdownFocus');
			if (this.getMethods("onBlur")) {
				this.executeMethod("onBlur", event);
			}
		},
		clickAction:function(item,e){
			this.setTabFocus=true;	
			if(!this.data.cxPropReadonly){
				var newVal = item[this.getData('cxPropUserValue')];
				var oldVal = this.getData('cxPropValue');
				if (this.getMethods("onBeforeValueChange") && newVal !== oldVal) {
					var allow = this.executeMethod("onBeforeValueChange", newVal, oldVal, e);
					if (allow === false) {
						return;
					}
				}
				if(newVal === this.getData('cxPropValue') && ( !this.data.mandatoryResetFlag) && this.data.showResetOption){
					this.setData({'cxPropValue':'',"cxPropDisplayValue":''});
					var isColorEnabled = this.getData('cxPropIsColorCodeEnabled')
					if(isColorEnabled){
						var btnElement = $L(e.target).hasClass('cxGrouperGroupBtnElem') ? e.target : $L(e.target).closest('.cxGrouperGroupBtnElem')[0]
						setTimeout(function(){
							$L(btnElement).css({
								'background-color': item.colour_code
							})
							var colorCode=	Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(item.colour_code);
							if(colorCode=="white"){
								$L(btnElement).addClass('cxGrouperColorFFF')
							}
						},100)
					}
				}else{
					if(this.data.cxPropValue===newVal){
						var closet=e.target.closest('.cxGrouperGroupBtnElem');
						if(e.target.classList.contains('cxGroupBtnFocused')){
							e.target.classList.remove('cxGroupBtnFocused');
						}else if(closet.classList.contains('cxGroupBtnFocused')){
							closet.classList.remove('cxGroupBtnFocused');
						}
						return ;
					}
					this.setData('cxPropValue',newVal);
				}
			}	
			if(this.data.cxPropReadonly || this.data.cxPropDisabled){
				return;
			}		
			this.setData("cxPropErrorType","");
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(),e.type);//No I18n
			}
		},
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		searchBoxClicked : function(){
			if(this.getMethods("onSearchBoxClick")){
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
		onGrouperBtnElemHover:function(e,item){
			if(!this.data.cxPropReadonly){
			var isColorEnabled = this.getData('cxPropIsColorCodeEnabled')
			if(isColorEnabled === true && item.colour_code ){
				var btnElement = $L(e.target).hasClass('cxGrouperGroupBtnElem') ? e.target : $L(e.target).closest('.cxGrouperGroupBtnElem')[0]
				$L(btnElement).css({
					'background-color':item.colour_code,
				})
				var colorCode=	Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(item.colour_code);
				if(colorCode=="white"){
					$L(btnElement).addClass('cxGrouperColorFFF')
				}
			}
		}
		},
		onGrouperBtnElemBlur:function(e,item){
			var componentData = this.getData()
			var isColorEnabled = this.getData('cxPropIsColorCodeEnabled')
			if(isColorEnabled && item[componentData.cxPropUserValue] !== componentData.cxPropValue){
				var btnElement = $L(e.target).hasClass('cxGrouperGroupBtnElem') ? e.target : $L(e.target).closest('.cxGrouperGroupBtnElem')[0]
				$L(btnElement).css({
					'background-color': 'transparent'
				})
				$L(btnElement).removeClass('cxGrouperColorFFF')
			}	
			this.MouseFocusDown=false;
		},
		onRadionbtnHover:function(e,item){
			if(!this.data.cxPropReadonly){
			if(item.colour_code && this.getData('cxPropIsColorCodeEnabled')){
				let radioBtnElem =  $L($L(e.target).closest('lyte-radiobutton')[0].querySelector('.cxGrouperRadioBtnBgTag'))
				radioBtnElem.css({
					'background-color': item.colour_code,
					'color':colorCode
				})
				var colorCode=	Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(item.colour_code);
				if(colorCode==="white"){
					radioBtnElem.addClass('cxGrouperColorFFF')
				}
			}
		}
		},
		onRadiobtnblur:function(e,item){
			var isColorEnabled = this.getData('cxPropIsColorCodeEnabled')
			var cxPropUserValue=this.data.cxPropUserValue;
			if(isColorEnabled && item[cxPropUserValue]!=this.data.cxPropValue ){
				let radioBtnElem = $L($L(e.target).closest('lyte-radiobutton')[0].querySelector('.cxGrouperRadioBtnBgTag'))
				radioBtnElem.css({
					'background-color': 'transparent'
				})
				radioBtnElem.removeClass('cxGrouperColorFFF')
			}
		},
		showInfoTooltip: function (origElem) {
			this.showHideInfoTooltip(origElem);
		},
		// onTabIndexFocus:function(){
		// 	var nodes=this.$node.querySelectorAll("input");
		// 	nodes.forEach(function(item){
		// 		item.setAttribute("tabindex",this.data.cxPropTabIndex);
		// 	}.bind(this));
		// },
		// onTabIndexBlur:function(){
		// 	var nodes=this.$node.querySelectorAll("input");
		// 	nodes.forEach(function(item){
		// 		item.removeAttribute("tabindex");
		// 	}.bind(this));
		// }
  },
  extraVals : {},
  observeRadioField:function(){
	if(this.getData("cxPropFrom") != "view" &&  this.data.cxPropFrom!="create" && this.getData("cxPropValue")){
		var value = this.getData("cxPropValue");//No I18n
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
			var keys = [];
			if(this.data.pickListValues){
				keys = this.data.pickListValues.map(function(p){
					return p[this.data.cxPropUserValue];
				}.bind(this))
			}
			for(var i=0; i<value.length; i++){
				if(i>0 && trimmed.indexOf(value[i].toLowerCase().trim()) == -1){
					ret.push(value[i]);
					trimmed.push(value[i].toLowerCase().trim());
				}
				if(keys.indexOf(value[i]) > -1){
					origLen++;
				}
			}
			
			this.setData("displayValue", ret);//No I18n
			if(keys.length){
				this.origLen = keys.length-origLen;
			}
			this.setData("showNoOption", this.origLen == 0);//No I18n
			if(this.getData("cxPropFrom") != "create" && this.data.cxPropFrom!="view" && !this.getData("cxPropPlaceholder")){
				this.setData("placeholder", _cruxUtils.getI18n("crm.label.filter.typehere"));//No I18n
			}
			else if(ret.length == 0){
				this.setData("placeholder", this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : _cruxUtils.getI18n("None"));//No I18n
			}
			else{
				this.setData("placeholder", "");//No i18n
			}
	}
	if((this.getData("cxPropValue") == undefined	|| this.getData("cxPropValue") == "" ) && this.getData("cxPropFrom")=='criteria' ){
		this.setData('displayValue',[]); //no i18n
	}
	if(((this.data.cxPropValue=='-None-' || this.data.cxPropValue=="" || !this.data.cxPropValue) &&  this.data.cxPropField.display_format=="radio_button") ){
		this.setData('selectedValue',{});
		this.setData('cxPropValue',"");
	}
	if((this.data.cxPropValue=='-None-' || this.data.cxPropValue=="" || !this.data.cxPropValue) && this.data.cxPropField.display_format=="group_button"){
		this.setData("cxPropValue","")
	}
	if(this.data.cxPropField.display_format == "radio_button" && this.data.cxPropValue){
			this.data.pickListValues.filter(function(item){
				if(item[this.data.cxPropUserValue] == this.data.cxPropValue){
					this.setData("selectedValue", item);
				}
			}.bind(this))
	}
	this.setOptionTabIndex(this.setTabFocus);
  }.observes('cxPropValue').on("init"),
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-grouper-radio-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
  observeErrorMessage : function(){
	this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	//this.data.isError ? this.$node.querySelector("lyte-dropdown").classList.add("cxErrorBox") : this.$node.querySelector("lyte-dropdown").classList.remove("cxErrorBox");//No I18n
}.observes("cxPropErrorMessage").on("init"),//No I18n
observesdidConnect : function(){
	if(this.getData("cxPropFrom") != "view" && this.data.cxPropFrom!="create"){
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
observePicklistValues : function(args){
	if(args.insertedItems && !args.insertedItems[0].extra){
		this.origLen++;
	}
}.observes("pickListValues.[]"),// No I18n
openDropdownObserver : function(){
	if(this.getData('cxPropOpenDropdown')){
		setTimeout(function(){
			this.$node.querySelector("lyte-dropdown")?this.$node.querySelector("lyte-dropdown").open():'';//No I18n
		}.bind(this), 100);
	}
}.observes("cxPropOpenDropdown"),//No I18n
observeField_new : function(){
	if(this.$node.querySelector(".cxDropbox")){
		this.$node.querySelector(".cxDropbox").classList.add("search"+this.getData("cxPropField").column_name);//No I18n
	}
	// if(this.data.cxPropFrom == "create" && this.data.cxPropType == "single" && !this.getData("cxPropValue") && !this.getData("cxPropPlaceholder")){
	// 	if(this.data.cxPropField.pick_list_values && this.data.cxPropField.pick_list_values[0] && this.data.cxPropField.pick_list_values[0].actual_value != this.data.cxPropNoneKeyword){
	// 		this.setData("cxPropDisplayValue", this.data.cxPropField.pick_list_values[0].display_value);
	// 		this.setData("cxPropValue", this.data.cxPropField.pick_list_values[0].display_value)
	// 	}
	// }
}.observes("cxPropField","lyteViewPort").on("didConnect"),//No I18n
observeField_new : function(){
	// var picklistGroupCont = this.$node.querySelector('.cxPicklistGroupCont');
	// if(picklistGroupCont){
	// 	if(this.data.isError) {
	// 		picklistGroupCont.classList.add("cxErrorBox");//No I18n
	// 	} else {
	// 		picklistGroupCont.classList.remove("cxErrorBox");//No I18n
	// 	}
	// }
	if(this.$node.querySelector("lyte-dropdown")){
		if(this.data.isError){
			this.$node.querySelector("lyte-dropdown").classList.add("cxErrorBox");//No I18n
		}
		else{
			this.$node.querySelector("lyte-dropdown").classList.remove("cxErrorBox");//No I18n
		}
	}
}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
observeMandatory : function(){
	var field_mandatory = (this.data.cxPropMandatory == true || this.data.cxPropMandatory == false) ? this.data.cxPropMandatory : this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].required : this.data.cxPropField.required;
	if(field_mandatory){
		this.setData('mandatoryResetFlag',true);
	}else{
		this.setData('mandatoryResetFlag',false);
	}
	if(this.getData('cxPropField').display_format=='group_button' ){
		this.observeMandatoryMixin(".groupbutton")
	}
	else if(this.getData('cxPropField').display_format=='radio_button'){
		this.observeMandatoryMixin(".singlechoice")
	}
	else{
		this.observeMandatoryMixin("lyte-dropdown");
	}
	//No I18n
}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropReadonly").on("didConnect"),//No I18n
mandatoryType : function(){
	this.observeMandatoryTypeMixin(this.$node.querySelector('.groupbutton') ? ".groupbutton" : ".singlechoice");//No I18n
}.observes('cxPropMandatoryType').on('didConnect'),
observePicklistValues_1 : function(){
	// if(this.data.cxPropField.display_format ==undefined || this.data.cxPropField.display_format=="dropdown" ){
		this.setData("pickListValues", undefined);
	// }
	if(this.getData('cxPropField').display_format=='group_button' || this.getData('cxPropField').display_format=='radio_button' ){
		this.setData("cxPropNoneOption",false);
		this.setData("showResetOption",false);
		this.getRadioFieldFn();
		if(this.data.cxPropField.display_format==="radio_button"){
			this.setDataZcqa();
		}
	}
	
}.observes("cxPropPicklistValues.[]", "cxPropField.pick_list_values","cxPropField.options", "cxPropFrom"),//No I18n\
obserViewPort:function(){
	this.setOptionTabIndex();
	if(this.data.cxPropField.display_format==="radio_button"){
		this.setDataZcqa();
	}
}.observes("lyteViewPort","cxPropAllowKeyNavigation"),
observePlaceholder : function(){
	this.setData("placeholder", this.getData("cxPropPlaceholder"));//No I18n
}.observes("cxPropPlaceholder"),//No I18n
observeDisabled : function(){
	if(this.data.cxPropField.display_format=='radio_button' && this.data.cxPropDisabled){
		var arr=[];
		for(let i=0;i<this.data.pickListValues.length;i++){
			arr.push(this.data.pickListValues[i][this.getData("cxPropSystemValue")]);
		}
		this.setData('disableValues',arr);
	}
	if(this.getData('cxPropField').display_format=='group_button' || this.getData('cxPropField').display_format=='radio_button'  || this.data.cxPropFrom == "create" || this.data.cxPropFrom=="view" ){
		this.setData("tooltip", this.data.cxPropTooltip ? this.data.cxPropTooltip : this.data.cxPropDisabled ? _cruxUtils.getI18n("crm.lable.read.only") : "");//No I18n
	}
}.observes("cxPropDisabled").on("init"),//No I18n
	methods : {
		radiobuttonchanged:function(comp,val,ched,d,e,user_action){
			if(ched && ched[this.data.cxPropUserValue] && !this.data.cxPropReadonly && user_action!='script'){
				var newVal = ched[this.data.cxPropUserValue];
				var oldVal = this.getData("cxPropValue");

				if (this.getMethods("onBeforeValueChange") && newVal !== oldVal) {
					var allow = this.executeMethod("onBeforeValueChange", newVal, oldVal, e);
					if (allow === false) {
						return;
					}
				}
				this.setData('cxPropValue',ched[this.data.cxPropUserValue]);
				this.setData("cxPropErrorType","");
				if(this.getMethods("onValueChange")){
					this.executeMethod("onValueChange", this.getData("cxPropValue"),user_action);//No I18n
				}
			}
		},
		addToList : function(field, event, sel){
			var pickListValues = this.getData("pickListValues");//No I18n
			// this.setData("showNoOption", true);//No i18n
			if( this.isEmoji(sel) ){
				this.$node.querySelector("lyte-dropdown").toggle()//no i18n
				this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				return false;
			}
			if(  this.data.cxPropMaxCount != undefined && this.getData("displayValue").length >= this.data.cxPropMaxCount ){
				var dropDownNode = this.$node.querySelector("lyte-dropdown");//No I18n
				var selected = JSON.parse(dropDownNode.ltProp("selected"));//No I18n
				selected.pop();
				dropDownNode.ltProp("selected", JSON.stringify(selected));//No I18n
				dropDownNode.toggle();
				this.showAlert(_cruxUtils.getI18n("crm.alert.maximum.text.values.contains", this.data.cxPropMaxCount));//No I18n
				return false;
			}
			if(this.getMethods("onBeforeAdd")){
				var extra = event.srcElement ? event.srcElement.getAttribute("data-extra") == "true" ? true : false : event.target ? event.target.getAttribute("data-extra") == "true" ? true : false : false;
				var ret = this.executeMethod("onBeforeAdd", sel, this.getValue(), extra);//No I18n
				if(ret == false){
					if(!extra){
						var selected = JSON.parse(this.$node.querySelector("lyte-dropdown").ltProp("selected"));//No I18n
						selected.pop();
						var dropdown = this.$node.querySelector("lyte-dropdown");//No I18n
						dropdown.ltProp("selected", JSON.stringify(selected));//No I18n
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
					// this.setData("showNoOption", this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-drop-item:not([selected=true])") ? false : true);
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
			this.setData("placeholder", (this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder :""));//No I18n
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
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			this.$node.querySelector("lyte-dropdown").classList.remove('lyteDropNoOptSelected'); //no i18n
			this.preventClose = true;
		},
		removeFromList : function(field, event, sel){
			var value = this.getData("displayValue");//No I18n
			var found = false;
			for(var i=0; i<value.length; i++){
				if(value[i] == sel){
					var rem = Lyte.arrayUtils(this.getData("displayValue"), "removeAt", i);//No I18n
					var id = "#search_";//No I18n
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
				this.extraVals[sel.toLowerCase()] = false;
			}
			if(value.length == 0){
				this.setData("placeholder", (this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ""));//No I18n
				//this.setData("placeholder",( ( this.getData("cxPropFrom") == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : this.getData("cxPropPlaceholder") ? this.getData("cxPropPlaceholder") : _cruxUtils.getI18n("None")) );//No I18n
			}
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			if(this.getData("displayValue").length == 0){
				this.$node.querySelector("lyte-dropdown").classList.add('lyteDropNoOptSelected')//no i18n
			}
			this.setData("showNoOption", this.origLen == 0);//No I18n
			if(this.$node.querySelector("lyte-dropdown").component.childComp == undefined){
				this.$node.querySelector("lyte-dropdown lyte-drop-button").click();//No I18n
			}
		},
		openDropdown : function(ev, component){
			if(this.data.cxPropReadonly){
				return false;
			}
			if(this.getMethods("onBeforeShow")){
				this.executeMethod("onBeforeShow", ev, component, this);
			}
			var picklistValues;
			if(this.getData("cxPropPicklistValues")){
				picklistValues = this.getData("cxPropPicklistValues");//No i18n
			}
			else if(this.data.cxPropField.ui_type == 137){
				picklistValues = this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].allowed_modules : this.data.cxPropField.allowed_modules;
			}else{
				picklistValues = this.getData("cxPropLayout") ? this.getData("cxPropField")[this.getData("cxPropLayout")].pick_list_values : this.getData("cxPropField").pick_list_values;//No I18n
			}
			if((picklistValues == undefined || picklistValues.length == 0) && this.data.cxPropModule){
				this.setData('showLoading',true);//No I18n
				var module_name = typeof moduleRecordMapping != "undefined" ? moduleRecordMapping[this.data.cxPropModule].api_name : this.data.cxPropModule;
				store.findRecord('field',this.data.cxPropField.id,{module : module_name},true).then(function(data){ //no i18n
					this.setData('cxPropField',data[0]);
					this.getRadioFieldFn();
					this.setData('showLoading',false);//No I18n
				}.bind(this))
			}else{
				this.getRadioFieldFn();
			}

		},
		closeDropdown : function(Eve,dropDownComp){
			var search = this.$node.querySelector("lyte-search");//No I18n
			this.closing = true;
			search = search ? search : this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-search");//No I18n
			if(search){
				search.setValue("");//No i18n
			}
			if(this.getMethods("onHide")){
				this.executeMethod("onHide", Eve, dropDownComp);//No I18n
			}
		},
		onDropdownOpen : function(){
			if(this.getMethods('onShow')){
				this.executeMethod('onShow',arguments[0],arguments[1]);
			}
			if(this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("input")){
				this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("input").focus()//No I18n
			}
		},
		beforeHide : function(ev){
			if(this.preventClose){
				this.preventClose = false;
				if(ev && ev.type == "scroll"){
					return false;
				}
			}
		},
		showNoResult : function(field, result){
			var closing = this.closing;
			if(this.closing){
				this.closing = false;
			}
			else if(this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.classList.contains("lyteDropdownHidden")){
				if(arguments[3].type == "input"){
					return;
				}
				this.$node.querySelector("lyte-dropdown").toggle();//No I18n
			}
			// if(this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("[data-extra='true']") && !(event && event.target && event.target.tagName == "LYTE-DROP-ITEM")){
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
							if(this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector(".lyteDropdownSelection")){
								this.$node.querySelector("lyte-dropdown").component.childComp.querySelector(".lyteDropdownSelection").classList.remove("lyteDropdownSelection");//No I18n
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
		
		onSearchBoxFocused : function(event,node){
	    	var dropdown = this.$node.querySelector('lyte-dropdown'); //no i18n
	    	if(this.data.cxPropFrom == 'criteria' && !dropdown.ltProp('isOpen')){
	    		dropdown.open();
	    }
	    },
		hideInfoTooltip: function () {
			this.showHideInfoTooltip();
		},
	},
	setAriaGrouperButton : function () {
		var ariaAttr = this.ariaGetMergedAttributes();
		var grouperRadio = this.$node.querySelectorAll('.cxAriaGrouperBtnElem');
		if(grouperRadio && grouperRadio.length > 0){
			const len = grouperRadio.length;
			for( let i = 0 ; i < len ; i++ ){
				var radioBtn = grouperRadio[i];
				if(ariaAttr.cxAriaGrouperRadio){
					if(!ariaAttr.cxAriaGrouperRadio[i]){
						ariaAttr.cxAriaGrouperRadio[i] = {};
					}
					ariaAttr.cxAriaGrouperRadio[i] = this.setCommonAttr(ariaAttr.cxAriaAttributes, ariaAttr.cxAriaGrouperRadio[i]);
					if(!ariaAttr.cxAriaGrouperRadio[i]['aria-labelledby']){
						ariaAttr.cxAriaGrouperRadio[i]['aria-labelledby'] = 'cx-radiobtn-label-'+i;
					}
				}
				_lyteUiUtils.setAttribute(radioBtn, ariaAttr.cxAriaGrouperRadio[i] || {}, {});
			}
		}
		this.setData('ariaAttributes', ariaAttr);
	}.observes("cxPropAria", "cxPropAriaAttributes", "cxPropRadioAriaAttributes").on("didConnect"),
	setCommonAttr : function(radio_group, radio_button){
		for (var key in radio_group) {
			radio_button[key] = radio_group[key];
		}
		return radio_button;
	},
	observeTabindex : function(changes){
		this.observeTabindexMixin(changes);
	}.observes("cxPropTabindex", "cxPropTabIndex").on("init"),
	observeColorCode: function () {
		if (this.getData("cxPropIsColorCodeEnabled") && (this.data.cxPropFrom === "create" || this.data.cxPropFrom === "view")) {
			this.setColorCodeDatas();
		}
	}.observes("cxPropIsColorCodeEnabled", "cxPropFrom", "cxPropValue").on("init"),
},{mixins : ["crux-element-validation"]}); //NO I18N
