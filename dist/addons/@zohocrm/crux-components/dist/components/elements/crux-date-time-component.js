//$Id$
/**
 * @component crux-date-time-component
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-date-time-component", {
_template:"<template tag-name=\"crux-date-time-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> {{addMurhyInfo(\"crux-date-time-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropToggleMasking,'&amp;&amp;',displayValue)}}\"><template case=\"true\">{{cruxMaskValue(displayValue,cxPropMaskingProperties,cxPropToggleMasking)}}</template><template case=\"false\"> <span id=\"{{cxPropId}}\" class=\"cxElementViewValue\">{{displayValue}}</span> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick')}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"filter\"></template><template case=\"criteria\"> <div class=\"cxDateTimeWrapper\"> <lyte-input lt-prop-type=\"datetime\" lt-prop-appearance=\"{{cxPropAppearance}}\" class=\"cxBoxInput w100per\" lt-prop-bind-to-body=\"false\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-id=\"searchValue\" lt-prop-placeholder=\"{{cxPropDatePattern}}\" lt-prop-current-date=\"{{selectedDate}}\" lt-prop-iso=\"{{lbind(cxPropIso)}}\" lt-prop-start-week-day=\"{{cxPropStartWeekDay}}\" on-navigate=\"{{method('navigation')}}\" lt-prop-yield=\"{{cxPropYield}}\" on-date-change=\"{{method('onDateChange1')}}\" lt-prop-format=\"{{format}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-min-date=\"{{cxPropMinDate}}\" lt-prop-minute-interval=\"{{cxPropMinuteInterval}}\" lt-prop-dropdown=\"true\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-time-format=\"{{cxPropTimeFormatInput}}\" lt-prop-default-time=\"{{startTime}}\" lt-prop-start-time=\"{{calendarStartTime}}\" on-time-change=\"{{method('onTimeChange1')}}\" ondragstart=\"return false;\" ondrop=\"return false;\" lt-prop-show-interval=\"{{cxPropShowInterval}}\" on-calendar-open=\"{{method('onCalendarOpenComp')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" on-before-calendar-close=\"{{method('cruxOnBeforeCalendarClose')}}\" on-calendar-close=\"{{method('cruxOnCalendarClose')}}\" lt-prop-header-type=\"{{cxPropHeaderType}}\" lt-prop-calendar-properties=\"{&quot;i18n&quot; : true,&quot;disableNavigation&quot; : true,&quot;preventAddingRows&quot; : true}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-prevent-keys=\"{{cxPropPreventKeys}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-render-calendar-icon=\"{{cxPropRenderCalendarIcon}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\" lt-prop-time-aria-attributes=\"{{ariaAttributes.cxTimeAriaAttributes}}\" lt-prop-validate-on-input=\"{{cxPropValidateOnInput}}\"> <template is=\"if\" value=\"{{cxPropYield}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"footer\"><lyte-yield yield-name=\"footer\"></lyte-yield></template> </template></template> </lyte-input> </div> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div> </template></template> {{addMurhyInfo(\"crux-date-time-component.html\",\"Feb Default Changes\")}} <lyte-input lt-prop-name=\"{{cxPropDateFieldName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-type=\"datetime\" lt-prop-appearance=\"{{cxPropAppearance}}\" class=\"cxBoxInput cxW100Per\" on-navigate=\"{{method('navigation')}}\" lt-prop-current-date=\"{{selectedDate}}\" lt-prop-iso=\"{{lbind(cxPropIso)}}\" lt-prop-start-week-day=\"{{cxPropStartWeekDay}}\" lt-prop-yield=\"{{cxPropYield}}\" on-date-change=\"{{method('onDateChange1')}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-calendar-class=\"{{cxPropCalendarClass}}\" lt-prop-min-date=\"{{cxPropMinDate}}\" lt-prop-minute-interval=\"{{cxPropMinuteInterval}}\" lt-prop-dropdown=\"true\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-time-format=\"{{cxPropTimeFormatInput}}\" lt-prop-default-time=\"{{startTime}}\" lt-prop-start-time=\"{{calendarStartTime}}\" on-time-change=\"{{method('onTimeChange1')}}\" ondragstart=\"return false;\" ondrop=\"return false;\" lt-prop-end-time=\"{{cxPropEndTime}}\" lt-prop-format=\"{{format}}\" lt-prop-show-interval=\"{{cxPropShowInterval}}\" on-before-open=\"{{method('onBeforeOpen')}}\" lt-prop-dropdown-disabled=\"{{cxPropDisabled}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" on-calendar-open=\"{{method('onCalendarOpenComp')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" lt-prop-dropdown-freeze=\"{{cxPropFreeze}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-max-date=\"{{cxPropMaxDate}}\" lt-prop-dropdown-properties=\"{{cxPropDropdownProperties}}\" on-before-calendar-close=\"{{method('cruxOnBeforeCalendarClose')}}\" on-calendar-close=\"{{method('cruxOnCalendarClose')}}\" lt-prop-common-placeholder=\"{{cxPropCommonPlaceholder}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-header-type=\"{{cxPropHeaderType}}\" lt-prop-bind-to-body=\"false\" lt-prop-show-today=\"{{cxPropShowToday}}\" onkeyup=\"{{action('removeErrorMessage',event)}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-class=\"{{cxPropInputClass}} cxFocusableElememnt\" lt-prop-time-class=\"{{cxPropInputTimeClass}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-prevent-keys=\"{{cxPropPreventKeys}}\" lt-prop-time-placeholder=\"{{cxPropTimePlaceholder}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-calendar-properties=\"{{cxPropCalendarProperties}}\" on-before-hide=\"{{method('beforeTimeClose')}}\" on-before-show=\"{{method('beforeTimeOpen')}}\" lt-prop-dropdown-class=\"{{cxPropBoxClass}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-prevent-selection=\"{{cxPropPreventSelection}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-render-calendar-icon=\"{{cxPropRenderCalendarIcon}}\" onkeydown=\"{{action('onKeydownevent',event)}}\" onmousedown=\"{{action('onMouseDownClick',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\" lt-prop-time-aria-attributes=\"{{ariaAttributes.cxTimeAriaAttributes}}\" lt-prop-validate-on-input=\"{{cxPropValidateOnInput}}\"> <template is=\"if\" value=\"{{cxPropYield}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"footer\"><lyte-yield yield-name=\"footer\"></lyte-yield></template> <template is=\"registerYield\" yield-name=\"yield\"> <span>{{itemValue.time}}</span> <template is=\"if\" value=\"{{cxPropShowInterval}}\"><template case=\"true\"><span style=\"opacity: 0.5;float: right;margin-left: 5px;\">{{itemValue.interval}}</span></template></template> </template> </template></template> </lyte-input> <template is=\"if\" value=\"{{expHandlers(cxPropIsDropdownIconNode,'&amp;&amp;',expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDropdownIconNodeClass}}\"></lyte-icon></template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-date-time-component.html\",\"Feb Default Changes\")}} <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[0]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"text","position":[3,1,3]},{"type":"attr","position":[3,1,5]},{"type":"attr","position":[3,1,5,1]},{"type":"if","position":[3,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}]}},"default":{}},{"type":"componentDynamic","position":[3,1,5]},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,9]},{"type":"if","position":[3,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,11]},{"type":"if","position":[3,1,11],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,0]},{"type":"text","position":[3,2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropAutofocus","lyteViewPort","cxPropValue","cxPropFrom","cxPropField","cxPropFieldKey","cxPropDatePattern","cxPropTimeFormat","cxPropStartWeekDay","format","cxPropEmptyValue","selectedDate","startTime","cxPropYield","isError","cxPropTimeZone","cxPropAppearance","cxPropErrorMessage","calendarStartTime","cxPropDateFieldId","cxPropDateFieldName","cxPropTimeFieldId","cxPropTimeFieldName","cxPropClearErrorMessage","cxPropTimeFormatInput","cxPropId","cxPropName","cxPropDirection","cxPropLabelClass","cxPropEndTime","cxPropCalendarClass","cxPropMinDate","cxPropReadonly","cxPropStartTime","cxPropDefaultTime","cxPropDisabled","cxPropTabIndex","cxPropTabindex","cxPropZcqa","cxPropClass","cxPropShowInterval","lyteUnbound","cxPropWrapperClass","cxPropTooltip","cxPropPlaceholder","cxPropErrorYield","cxPropInfoTooltip","cxPropFreeze","cxPropScope","cxPropMaxDate","cxPropDropdownProperties","cxPropDatetimeInUserPattern","cxPropBoundary","cxPropAria","cxPropAriaAttributes","cxPropTimeAriaAttributes","cxPropCommonPlaceholder","cxPropTooltipConfig","cxPropTooltipClass","cxPropAutocomplete","cxPropHeaderType","displayValue","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropShowToday","cxPropErrorClass","cxPropWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropPreventKeys","cxPropTimePlaceholder","cxPropReturnTimezone","cxPropLayout","cxPropInputTimeClass","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropButtonTextInsideElement","cxPropMandatory","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropEnableLbind","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropPreventFocusOnError","cxPropIsDropdownIconNode","cxPropDropdownIconNodeClass","cxPropCalendarProperties","tooltip","cxPropBoxClass","cxPropPrefixYield","cxPropCallbackDelay","cxPropUpdateDelay","cxPropMinuteInterval","cxPropPreventSelection","cxPropButtonYield","cxPropIso","cxPropAriaErrorProperties","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropMaskingProperties","cxPropDisableTime","cxPropDivWrapperClass","cxPropSuffixYield","cxPropMaskingProperties","cxPropPreventParentScroll","ariaAttributes","cxPropRenderCalendarIcon","cxPropValidateOnInput"],
_observedAttributesType :["object","object","boolean","boolean","boolean","string","string","object","string","string","string","number","string","string","string","string","boolean","boolean","string","string","string","string","string","string","string","string","boolean","string","string","string","string","string","string","string","string","boolean","string","string","boolean","string","string","string","string","boolean","boolean","string","string","string","boolean","string","boolean","string","string","object","boolean","object","boolean","object","object","string","string","string","string","string","string","string","string","boolean","string","string","string","string","boolean","string","boolean","string","string","boolean","boolean","string","string","boolean","string","boolean","string","boolean","string","object","string","string","boolean","boolean","string","object","string","string","boolean","number","number","number","boolean","boolean","string","object","string","boolean","boolean","boolean","object","boolean","string","boolean","object","boolean","object","boolean","boolean"],
//No I18n
	data : function(){
		return {
			/*generic crux element properties*/
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property send to pass multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * Set to true to render error message in hover card
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * Sets autofocus value for input. Browser will focus input when entire page got loaded
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
		    /**
			 * Set to true to render element on viewport
		     * @componentProperty { boolean } lyteViewPort=false
		     * @author anuja.manoharan
		     * @version 1.0.0
		     */
		    lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * The selector which determines which key is the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * The pattern in which the date is to presented
			 * @componentProperty { string } cxPropDatePattern
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDatePattern : Lyte.attr("string", {default : (typeof Crm != "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy")}),//No I18n
			/**
			 * @componentProperty { string } cxPropTimeFormat
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeFormat : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { number } cxPropStartWeekDay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStartWeekDay : Lyte.attr("number", {default : ((typeof Crm != "undefined" && Crm.calPreferences && Crm.calPreferences.WEEKSTARTSON != undefined) ? Crm.calPreferences.WEEKSTARTSON : 1)}),//No I18n
			format : Lyte.attr("string"),//No I18n
			/**
			 * Value displayed when cxPropValue is empty
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			selectedDate : Lyte.attr("string"),//No I18n
			startTime : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to render custom footer for calendar
			 * @componentProperty { boolean } cxPropYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYield : Lyte.attr("boolean", {default : false}),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTimeZone
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeZone : Lyte.attr("string", {default : (typeof Crm != "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30")}),//No I18n
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAppearance : Lyte.attr("string", {default : "box"}),//No I18n
			/**
			 * Error message displayed below element
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } calendarStartTime  
			 */
			calendarStartTime : Lyte.attr("string"),//No I18n
			/**
			 * Id set to date input
			 * @componentProperty { string } cxPropDateFieldId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDateFieldId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name set to date input
			 * @componentProperty { string } cxPropDateFieldName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDateFieldName: Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Id set to time input
			 * @componentProperty { string } cxPropTimeFieldId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeFieldId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name set to time input
			 * @componentProperty { string } cxPropTimeFieldName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeFieldName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to false to prevent clear of error message on change of value
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropTimeFormatInput
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeFormatInput : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * It defines how label and input field placed
			 * @componentProperty { string } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * Class set to field label
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Its the upper limit of time
			 * @componentProperty { string } cxPropEndTime
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEndTime : Lyte.attr("string"),//No I18n
			/**
			 * Same class will be added for calendar div
			 * @componentProperty { string } cxPropCalendarClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCalendarClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropMinDate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMinDate : Lyte.attr("string", {default : ""}),//No i18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Its the lower limit of time
			 * @componentProperty { string } cxPropStartTime
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStartTime : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropDefaultTime
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultTime : Lyte.attr("string"),//No I18n
			/**
			 * This property disables the input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string"),//No I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * Sets zcqa to the lyte-input
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * Class set to lyte-input
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * To show time interval in time dropdown
			 * @componentProperty { boolean } cxPropShowInterval=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowInterval : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * It will be added to the wrapper div element over the input
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * Sets placeholder for input field.
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to render custom error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * Info message displayed on hover of info icon next to field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * If it sets true dropdown will be opened with freeze layer
			 * @componentProperty { boolean } cxPropFreeze=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFreeze : Lyte.attr("boolean", {default : false}),//NO I18n
			/**
			 * Selector of the closest element of input. Calendar will be positioned within scope element
			 * @componentProperty { string } cxPropScope
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropScope : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropMaxDate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaxDate : Lyte.attr("string"),//No I18n
			/**
			 * You can give any basic lyte-dropdown properties in this
			 * @componentProperty { object } cxPropDropdownProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDropdownProperties : Lyte.attr("object", {default : {"preventScroll":"body"}}),//No I18n
			/**
			 * By default, cxPropValue is expected in ISO format
			 * @componentProperty { boolean } cxPropDatetimeInUserPattern=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDatetimeInUserPattern : Lyte.attr("boolean"),//No I18n
			/**
			 * Whenever calendar exceeds given boundary value it will be closed
			 * @componentProperty { object } cxPropBoundary
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoundary : Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * To set custom attributes to input
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom aria attributes to date input
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * custom aria attributes to time input
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimeAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * To set common placeholder for datetime input. Both input values should be empty for showing placeholder
			 * @componentProperty { string } cxPropCommonPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCommonPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default :'{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * Enables native autocomplete property for input
			 * @componentProperty { string } cxPropAutocomplete
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderType : Lyte.attr("string", {default: 'dropdown'}),//No I18n
			displayValue : Lyte.attr("string"),//No I18n
			/**
			 * Prefix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowToday=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowToday : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Class set to error message
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * It will be added to the wrapper div element over the input
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * Class set to input
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string"),//No I18n
			/**
			 * Class set to span of error message
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * It won't allow to type letters.
			 * @componentProperty { boolean } cxPropPreventKeys=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventKeys : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTimePlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTimePlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * If set to true, timezone is passed on getValue
			 * @componentProperty { boolean } cxPropReturnTimezone=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropReturnTimezone : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropInputTimeClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputTimeClass : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to view info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to render custom disable icon
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class for custom disable icon
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * Set to true to mark element as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * Warning message displayed below element
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * Set to true to display warning message below element
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * Class set to warning icon
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce( In this case you can take current value from inner 'input' tag ) or else it will get updated in blur event
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : false}),//no i18n
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set to true to prevent focus on error of validate
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to render custom dropdown icon
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
			/**
			 * Class set to custom dropdown icon
			 * @componentProperty { string } cxPropDropdownIconNodeClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDropdownIconNodeClass : Lyte.attr("string", {default : ""}),
			/**
			 * You can give any basic lyte-calendar properties in this as a single object
			 * @componentProperty { object } cxPropCalendarProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCalendarProperties : Lyte.attr("object", {default : {}}),//No I18n
			tooltip : Lyte.attr("string"),
			/**
			 * Same class will be set for dropdown box associated with lyte-input
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCallbackDelay: Lyte.attr("number"),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * To show time interval in time dropdown
			 * @componentProperty { boolean } cxPropMinuteInterval=30
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMinuteInterval : Lyte.attr("number", {default : 30}),
			 /*
			 * Set to true to prevent selection on click/ calendar open
			 * @componentProperty { boolean } cxPropPreventSelection=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropPreventSelection : Lyte.attr("boolean", {default : false}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			cxPropIso : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			maskUnmaskPermission:Lyte.attr("boolean",{default:false}),
			cxPropToggleMasking:Lyte.attr("boolean",{default:false}),
			cxPropShowMaskUnmaskIcon:Lyte.attr("boolean",{default:true}),
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			cxPropDisableTime:Lyte.attr("boolean", {default:false}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),
			ariaAttributes : Lyte.attr('object', {default : {}}),
			/**
			 * @componentProperty {boolean} cxPropRenderCalendarIcon
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropRenderCalendarIcon : Lyte.attr("boolean", {default : true}),
			/**
			 * Validate min and max date on input
			 * @componentProperty { boolean } cxPropValidateOnInput=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropValidateOnInput : Lyte.attr("boolean", {default : false})
		}
	},
	init : function(){
		if(_lyteUiUtils.updateI18n && !_cruxUtils.isI18nUpdated && typeof I18n != "undefined"){
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","June","July","August","September","October","November","December"]
			months.forEach(function(m){
				_lyteUiUtils.updateI18n(m, _cruxUtils.getI18n(m));
			});
			_cruxUtils.isI18nUpdated = true;
		}
		this.setData("cxPropDatePattern", this.getData("cxPropDatePattern").replace(/'/g, ''));//No I18n
		this.setData("format", this.getData("cxPropDatePattern").toUpperCase());//No I18n
		if(!this.getData("cxPropPlaceholder")){
			this.setData("cxPropPlaceholder", this.getData("format"));//No I18n
		}
		this.convertLtPropJson();
		this.preventDateSet = false;
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		if(this.data.cxPropFrom === "criteria" && !this.data.cxPropMinDate){
			this.setData('cxPropMinDate', $L.moment('01/01/1000', 'DD/MM/YYYY').format(this.data.cxPropDatePattern.toUpperCase()));
		}
	},
	getValue : function(options){
	    if( this.$node.querySelector("#cruxLoadingElem") ){
        	return this.data.cxPropValue;
	    }
		var input = this.$node.querySelectorAll("input");//No I18n
		var date_value=input[0].value ;
		if(this.data.cxPropFrom==='create' && this.data.cxPropMaskingProperties && this.noMaskPermissionKeyDown){
			date_value=this.data.selectedDate ;
		}
		if(date_value.trim() !== ""){
			if(options && options.userFormat){
				return date_value+" "+input[1].value;		
			}
			var dateObj, ret;
			if(this.getData("cxPropIso") && options && options.iso){
				dateObj = this.getData("cxPropIso").split('+')[0];
				ret = dateObj;
			}else{
				dateObj = this.getDateObject(date_value.trim(), input[1].value);
				if(!dateObj || dateObj == 'Invalid Date'){
					return "";
				}
				function trailingZero(num){
					return num < 10 ? '0'+num : num;
				}
				var year = dateObj.getFullYear().toString();
				while (year.length < 4){year = "0" + year};
				ret = (year +
					'-' + trailingZero(dateObj.getMonth() + 1) +
					'-' + trailingZero(dateObj.getDate()) +
					'T' + trailingZero(dateObj.getHours()) + //no i18n
					':' + trailingZero(dateObj.getMinutes()) +
					':' + trailingZero(dateObj.getSeconds()));
			}
			if(!dateObj){
				return "";
			}
			var userZone = this.getData("cxPropTimeZone");//No I18n
			if(this.data.cxPropFrom != "create" || this.data.cxPropReturnTimezone){
				ret+=userZone.replace('.',':');
			}
			return ret;
		}
		return "";
	},
	validate : function(){
		var date = "", time = "";
		var input = this.$node.querySelectorAll("input");//No I18n
		if( !this.$node.querySelector("#cruxLoadingElem") ){
			date = input[0].value;
			time = input[1].value;
		} else if (this.data.cxPropValue){
			date = this.data.selectedDate;
			time = this.data.startTime;
		}
		var field = this.data.cxPropField;//No I18n
		if(this.data.cxPropFrom == "create"){
			if ((input === undefined || input.length === 0 || !date || !date.trim()) && !this.getValue()){
				if(!this.validateMandatory(true)){
					if(!this.data.cxPropPreventFocusOnError){
						this.focusFromHere = true;
						this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
					}
					return false;
				}
				this.setData("cxPropErrorMessage", "");//No I18n
				return true;
			}
			if(!this.validateMaskField()){
				this.setData("cxPropErrorMessage", "");
				return true;
			}
			var check = this.isValidDate(date, undefined);
			var timeCheck = $L.moment(time, this.data.cxPropTimeFormat.replace("a", "A"), {i18n : true}).validate();
			if(!check || !timeCheck){
				if(this.getMethods("onError")){
					this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
				}
				else{
					this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				}
				if(!this.data.cxPropPreventFocusOnError){
					this.focusFromHere = true;
					this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
				}
				check = false;
			}
			else{
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			return check;
		}
		return this.dateValidate(input && input[0] , date);//No I18n
	},
	resetData:function(){
		 	this.$node.querySelectorAll("input")[0].value='';
			this.$node.querySelectorAll("input")[1].value=this.data.startTime;
			},
	methods : {
		show: function(arg1,arg2,arg3){
			if(this.getMethods('onShow')){
				/**
				 * @method onShow
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } arg1
				 * @param { * } arg2
				 * @param { * } arg3
				 */
				this.executeMethod('onShow',arg1,arg2,arg3);
			}
		},
		hide: function(arg1,arg2,arg3){
			if(this.getMethods('onHide')){
				/**
				 * @method onHide
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } arg1
				 * @param { * } arg2
				 * @param { * } arg3
				 */
				this.executeMethod('onHide',arg1,arg2,arg3)
			}
		},
		onDateChange1 : function(){
			this.$node.querySelector("input").value = this.$node.querySelector("input").value.replace(/'/g, '')//No I18n
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if ( !this.reset_value && this.data.cxPropFrom==='create'  &&  this.data.cxPropMaskingProperties && !this.data.maskUnmaskPermission && (!event || event.type !== 'blur')) {
				delete this.noMaskPermissionKeyDown ;
				this.setData('cxPropDisableTime', false);
			}
			if(this.reset_value){
				this.reset_value=false;
			}
			// this.setData("isError", false);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(), "date");//No I18n
			}
		},
		onTimeChange1 : function(){
			if(!this.$node.querySelector("input").value && !this.preventDateSet){
				this.setData("selectedDate", this.getDateInUserDatePattern(new Date()));//No I18n
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			// this.setData("isError", false);//No I18n
			if(this.getMethods("onValueChange") && this.pauseValueChange !== true){
				this.executeMethod("onValueChange", this.getValue(), "time");//No I18n
			}
		},
		navigation : function(event){
			if(event && event.target && event.target.parentElement && event.target.parentElement.classList.contains('lyteCalCurrentDate')){
				this.setData("selectedDate", this.getDateInUserDatePattern(new Date()));//No I18n
				this.$node.querySelector("lyte-input").blur();//No I18n
				arguments[3].$node.querySelector('.lyteCalToday').click()
			}
		},
		onBeforeOpen : function(){
			if(this.focusFromHere){
				delete this.focusFromHere;
				return false;
			}
			if(this.getMethods("onBeforeCalendarOpen")){
				/**
				 * This method is invoked before opening calendar
				 * @method onBeforeCalendarOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onBeforeCalendarOpen");//NO I18n
			}
		},
		onCalendarOpenComp : function(){
			if(this.getMethods("onCalendarOpen")){
				/**
				 * This method is invoked after opening the calendar
				 * @method onCalendarOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onCalendarOpen");//No I18n
			}
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    },
     cruxOnBeforeCalendarClose : function(calendar , input){
    	if(this.getMethods("onBeforeCalendarClose")){
    		/**
			 * This method is called before closing a calendar. It will accept promise
    		 * @method onBeforeCalendarClose
    		 * @author anuja.manoharan
    		 * @version 1.0.0
    		 * @param { * } calendar
    		 * @param { * } input
    		 */
    		this.executeMethod("onBeforeCalendarClose", calendar , input)//No I18n
    	}
    },
    cruxOnCalendarClose : function(calendar , input){
    	this.patternValidate(this.$node.querySelector("input"));
    	if(this.$node.querySelector("lyte-input").calendarDiv){
	    	this.$node.querySelector("lyte-input").calendarDiv.querySelector("lyte-calendar").revertToSelected();  //No I18n  		
    	}
    	if(this.getMethods("onCalendarClose")){
    		/**
			 * This method is invoked after closing the calendar
    		 * @method onCalendarClose
    		 * @author anuja.manoharan
    		 * @version 1.0.0
    		 * @param { * } calendar
    		 * @param { * } input
    		 */
    		this.executeMethod("onCalendarClose", calendar , input)//No I18n
    	}
    },
	beforeTimeClose : function(){
		if(this.getMethods("onBeforeHide")){
			/**
			 * @method onBeforeHide
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			this.executeMethod("onBeforeHide");
		}
	},
	beforeTimeOpen : function(){
		if(this.getMethods("onBeforeShow")){
			/**
			 * @method onBeforeShow
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			this.executeMethod("onBeforeShow");
		}
	},
	onFieldFocus:function(event){
		this.onFocusMaskField(event);
	}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-date-time-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
		// this.setData("isError", true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	obeserveCxPropValue : function(op){
		var format = this.getData("cxPropTimeFormat");//No I18n
		if(!format){
			format = (typeof Crm != "undefined") ? Crm.userDetails.TIME_FORMAT : "HH:mm";//no i18n
			this.setData("cxPropTimeFormat", format);//No I18n
		}
		var timeFormat = "24";
		if(format.indexOf("a") > -1){
			timeFormat = "12";
			this.setData({cxPropTimeFormatInput : "12", calendarStartTime : "12:00 "+_cruxUtils.getI18n("AM")});
		}
		else{
			this.setData({cxPropTimeFormatInput : "24", calendarStartTime : "00:00"});
		}
		this.timeFormat = timeFormat;
		if(this.getData("cxPropFrom") != "view"){
			if(this.getData("cxPropStartTime")){
				this.setData("calendarStartTime", this.getData("cxPropStartTime"));//No I18n
			}
			if(this.getData("cxPropValue")){
				var value = this.getData("cxPropValue");//No I18n
				value = value.replace(/[+-]\d{2}:\d{2}/,'');//No I18n
				if(this.data.cxPropDatetimeInUserPattern){
					var datePattern = this.data.cxPropDatePattern.toUpperCase();
					var length = 6;
					if(format == "hh:mm a"){
						length+=3;
						format = 'hh:mm A';
					}
					var date = $L.moment(value,datePattern.toUpperCase()+" "+format,{i18n : true});
					if(date.validate()){
						var calendarProp = this.getData('cxPropCalendarProperties');
						if(calendarProp && calendarProp.i18n){
							this.setData("selectedDate", date.i18N(datePattern.toUpperCase()));//No I18n
						}else{
							this.setData("selectedDate", date.format(datePattern.toUpperCase()));//No I18n
						}
						/* pauseValueChange to stop trigger onValueChange callback to prevent infinite loop while using datetime component from subform */
						this.pauseValueChange = true;
						this.setData("startTime", "");
						this.pauseValueChange = false;
						this.setData("startTime", date.i18N(format));//No I18n
					}
					else{
						var date = value.substring(0, value.length-length);
						this.setData("selectedDate", date);//No I18n
						this.setData("startTime", value.substring(value.length-length+1));//No I18n
					}
				}
				else{
						var dateValue = value.split("-");
		                var date = new Date(dateValue[0], dateValue[1]-1, dateValue[2].split("T")[0]);
		                value = value.split("T");
						var time = value[1] ? value[1].split(":") : '';
						if(time){
							if(op && op.item && op.item == "cxPropTimeZone"){
								var mom = $L.moment(value[1], "HH:mm:ss");
								mom.timezone(this.data.cxPropTimeZone);
								time = mom.format("HH:mm").split(":");
							}
			                date.setHours(time[0]);
			                date.setMinutes(time[1]);
						}
						// var date = new Date(value);
						this.setData("selectedDate", this.getDateInUserDatePattern(date, undefined, undefined, this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n));//No I18n
						this.setData("startTime", this.getTimeInUserFormat(date));//No I18n
				}
			}
			else{
				this.setData("selectedDate", "");//No I18n
				if(this.getData("cxPropDefaultTime")){//No I18n
					this.preventDateSet = true;
					this.setData("startTime", this.getData("cxPropDefaultTime"));//No I18n
					this.preventDateSet = false;
				}else if(!this.getData("cxPropStartTime")){//No I18n
					if(this.data.cxPropFrom != "create"){
						//this.setData("selectedDate", this.getDateInUserDatePattern(new Date()));//No I18n
						this.setData("startTime", "01:00"+(timeFormat == "12" ? " "+_cruxUtils.getI18n("AM") : ""));//No I18n						
					}
					else{
						if(this.data.cxPropCommonPlaceholder || this.data.cxPropTimePlaceholder){
							this.setData("startTime",'')//No I18n
						}else{
							var time = new Date(), hr = time.getHours(), min = time.getMinutes().toString(), mer = hr > 11 ? _cruxUtils.getI18n("PM") : _cruxUtils.getI18n("AM"), result;//No I18n
					        if(min.length == 1){
					            min = '0' + min;
					        }
					        if(timeFormat == "12"){
					            if( hr != 12 ) {
					                hr = (hr%12).toString();
					                if(hr.length == 1){
					                    hr = '0' + hr;
					                }
					            }
					            result =  hr + ':00 ' + mer;
					        }else{
					            if(hr < 10){
					                hr = '0' + hr;
					            }
					            result =  hr + ":00";
					        }
							this.preventDateSet = true;
					        this.setData("startTime",result)//No I18n
							this.preventDateSet = false;
						}
					}
				}				
			}
		}
		else{
		   _cruxUtils.addMurhyInfo("crux-date-time-component.js", "Feb Default Changes");
			if(this.data.cxPropValue){
				if(this.data.cxPropDatetimeInUserPattern == false){
					var dateValue = this.data.cxPropValue.split("-");
	                var date = new Date(dateValue[0], dateValue[1]-1, dateValue[2].split("T")[0]);
	                var value = this.data.cxPropValue.split("T");
					var time = value[1] ? value[1].split(":") : '';
					if(time){
		                date.setHours(time[0]);
		                date.setMinutes(time[1]);
					}
					this.setData("displayValue", this.getDateInUserDatePattern(date, undefined, undefined, this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n)+" "+this.getTimeInUserFormat(date, this.data.timeFormat))//No I18n
				}
				else{
					this.setData("displayValue", this.data.cxPropValue)//No I18n
				}
			}
			else{
				this.setData("displayValue", "");
			}
		}
	}.observes("cxPropValue", "cxPropFrom", "cxPropTimeFormat", "cxPropTimeZone").on("init"),//No I18n
	observeIsError : function(){
		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else {
			const lyteInput = this.$node.querySelector("lyte-input");
			if((this.getData("cxPropFrom") === "create" || this.getData("cxPropFrom") === "criteria") && lyteInput){
				if(this.getData("isError")){
					lyteInput.classList.add("cxErrorBox");//No I18n
				}
				else{
					lyteInput.classList.remove("cxErrorBox");//No I18n
				}
				this.lyteInput = lyteInput;
			}
		}
		
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : "lyte-input");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	actions : {
		
		onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if (this.data.cxPropPrefixYield && rightIconBox) {
				if(onfocus){
					rightIconBox.classList.remove("cxBoxInputFocused"); //No I18n
				} else{
					rightIconBox.classList.add("cxBoxInputFocused"); //No I18n
				}
			}
		},

		preventInvalidTime : function(){
			this.paste();
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    removeErrorMessage : function(event){
    	if(this.data.cxPropClearErrorMessage && event.keyCode !== 13){
    		this.setData("cxPropErrorMessage", "");//No i18n
    	}
		if(event.target.id!=='time'){
			this.onKeyUpMaskField(event);
			
		}
    },
	onMaskUnMaskIconClick:function(){
		this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
		event.stopPropagation();
	},
	onKeydownevent:function(event){
		_cruxUtils.addMurhyInfo("crux-date-time-component.js", "Feb Default Changes");
		if(event.target.id!=='time' ){
			this.onKeyDownMaskField(event);
		}
	
	},
	onMouseDownClick:function(event){
		if (event.target.id!=='time') {
			this.onMouseDownMaskField(event);
		}
	}
	},
	observesdidConnect : function(){
        if(this.getData("cxPropFrom") == "create" && this.$node.querySelectorAll("input")[1]){
			var _this = this;
			this.$node.querySelectorAll("input")[1].onpaste = function(){
				_this.paste();
			}
		}
		// this.$node.focus = this.focus.bind(this);
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	paste : function(){
		var value = event.clipboardData.getData("text");//no i18n
		value = value.split(":");
		var hr = value[0], min = value[1];
		var reg = /^\d{1,2}$/;
		var ampm = "AM";//no i18n
		if(!reg.test(hr) || !reg.test(min) || hr == "" || hr > 23 || min == "" || min > 59 || hr == undefined || min == undefined){
			event.preventDefault();
		}
		else{
			var changed = false;
			if(this.timeFormat == 12){
				if(hr > 12){
					hr = hr-12;
					changed = true;
					ampm = "PM";//no i18n
				}
			}
			if(hr.length == 1){
				hr = "0"+hr;
				changed = true;
			}
			if(min.length == 1){
				min = "0"+min;
				changed = true;
			}
			if(changed){
				this.setData("startTime", this.timeFormat == 24 ? hr+":"+min : hr+":"+min+" "+ampm);//no i18n
				event.preventDefault();
			}
		}
	},
	observeStartTime : function(){
		this.setData("calendarStartTime", this.getData("cxPropStartTime"));//No I18n
	}.observes("cxPropStartTime"),//No I18n
	focus : function(){
		// var lyteInput = this.$node.querySelector("lyte-input");
		// if(lyteInput){
		// 	// this.focusFromHere = true;
		// 	lyteInput.ltProp('focusAtEnd', true);
		// 	lyteInput.ltProp('focus', true);
		// 	// this.$node.querySelector("lyte-input").focus();//No I18n
		// }
		if(this.$node.focus){
			this.$node.focus();
		}
	},
	observeClass : function(op){
		if(this.data.cxPropFrom == "create"){
			var ele = $L("lyte-input", this.$node);//No I18n
			if(!ele.length){
				return;
			}
			if(op && op.oldValue){
				ele.removeClass(op.oldValue);
			}
			if(this.data.cxPropClass){
				ele.addClass(this.data.cxPropClass);
			}
		}
	}.observes("cxPropClass", "lyteViewPort").on("didConnect"),//No I18n
	didDestroy : function(){
		delete this.lyteInput;
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * Called when element has been rendered in viewport
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip()
	}.observes("cxPropTooltip","cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init'),
	observeNoMaskPermission: function(){
		if (this.data.cxPropFrom === "create" && this.data.lyteViewPort !== true && this.data.cxPropMaskingProperties && this.data.cxPropValue && this.noMaskPermissionKeyDown) {
				this.reset_value=true;
				this.$node.querySelector('lyte-input').ltProp('iso',"");
				this.$node.querySelector('lyte-input').ltProp('currentDate',"********"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
				// this.$node.querySelector('input').value="********" ;
				this.setData('cxPropDisableTime', true);
				// this.$node.querySelector('lyte-input').ltProp('iso',"********");
				// this.reset_value=false;
		}
	}.observes('cxPropFrom', 'lyteViewPort').on('didConnect'),
	observeDisableTime: function(){
		if(this.data.cxPropFrom === 'create'){
			var timeInp = this.$node.querySelectorAll('input')[1];
			if(this.data.cxPropDisableTime){
				timeInp.setAttribute('disabled', true);
			}else if(timeInp && timeInp.attributes.disabled){
				timeInp.removeAttribute('disabled');
			}
			this.setFocusUtil();
		}
	}.observes('cxPropDisableTime', 'cxPropFrom').on('init'),
	observeCalendarProperties : function(){
		/* added extra row in calendar while some months contains 6 rows. so, calendar getting resized issue */
		var calProp = this.data.cxPropCalendarProperties;
		if(!calProp.preventAddingRows){
			Lyte.objectUtils(this.data.cxPropCalendarProperties, 'add', 'preventAddingRows', true);
		}
	}.observes('cxPropCalendarProperties').on('init'),
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
		_cruxUtils.addMurhyInfo("crux-date-time-component.js", "Feb Default Changes");
			if(this.data.cxPropFrom === 'view'){
				this.ariaSetForView();
			}else{
				var ariaAttr = this.ariaGetMergedAttributes();

				if(ariaAttr && this.data.cxPropFrom === 'create' && this.data.cxPropField && this.data.cxPropFieldKey && this.data.cxPropField[this.data.cxPropFieldKey] && !(ariaAttr.cxAriaAttributes && (ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby']))){
					if (ariaAttr && !ariaAttr.cxAriaAttributes) {
						ariaAttr.cxAriaAttributes = {};
					}
					ariaAttr.cxAriaAttributes['aria-label'] = this.data.cxPropField[this.data.cxPropFieldKey];
				}

				this.setData('ariaAttributes', ariaAttr);
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropTimeAriaAttributes', 'cxPropAriaErrorProperties').on('didConnect')
}, {mixins : ["crux-element-validation"]});//No I18n

/**
 * @syntax nonYielded
 * <crux-date-time-component cx-prop-from="create"></crux-date-time-component>
 */

 /**
 * @syntax staticBuilder
 * <crux-date-time-component cx-prop-from="create"></crux-date-time-component>
 */
