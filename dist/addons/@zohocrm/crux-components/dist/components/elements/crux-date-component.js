/**
 * @component crux-date-component
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-date-component", {
_template:"<template tag-name=\"crux-date-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"prefixYield\" class=\"cxElemCompPrefixVwDiv\"></lyte-yield></template></template> <span id=\"{{cxPropId}}\" class=\"cxElementViewValue\"> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropToggleMasking}}\"><template case=\"true\">{{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}}</template><template case=\"false\"><span class=\"cxElementViewValue cxElemCompViewValue\">{{cxPropValue}}</span></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick')}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> </span> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"criteria\"> <lyte-input lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" class=\"{{cxPropClass}} cxFlex {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-type=\"date\" lt-prop-id=\"searchValue\" lt-prop-calendar-class=\"cxCriteriaCalendar {{cxPropCalendarClass}}\" lt-prop-placeholder=\"{{cxPropDatePattern}}\" lt-prop-format=\"{{format}}\" on-navigate=\"{{method('navigation')}}\" lt-prop-bind-to-body=\"false\" lt-prop-start-week-day=\"{{cxPropStartWeekDay}}\" lt-prop-current-date=\"{{cxPropValue}}\" lt-prop-iso=\"{{lbind(cxPropIso)}}\" on-date-change=\"{{method('onDateChange1')}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-min-date=\"{{cxPropMinDate}}\" on-calendar-open=\"{{method('onCalendarOpenComp')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" on-before-calendar-close=\"{{method('cruxOnBeforeCalendarClose')}}\" on-calendar-close=\"{{method('cruxOnCalendarClose')}}\" lt-prop-header-type=\"{{cxPropHeaderType}}\" lt-prop-auto-update=\"false\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-prevent-keys=\"{{cxPropPreventKeys}}\" lt-prop-yield=\"{{cxPropYield}}\" lt-prop-calendar-properties=\"{{cxPropCalendarProperties}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-render-calendar-icon=\"{{cxPropRenderCalendarIcon}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\" lt-prop-validate-on-input=\"{{cxPropValidateOnInput}}\"> <template is=\"if\" value=\"{{cxPropYield}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"footer\"><lyte-yield yield-name=\"footer\"></lyte-yield></template> </template></template> </lyte-input> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template><template case=\"filter\"> <lyte-input class=\"lyteInputBox cxBoxInput {{cxPropClass}}\" lt-prop-appearance=\"box\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-calendar-class=\"smartFilterCal {{cxPropCalendarClass}}\" lt-prop-bind-to-body=\"false\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-type=\"date\" lt-prop-id=\"searchValue\" on-navigate=\"{{method('navigation')}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-format=\"{{format}}\" lt-prop-class=\"cxFilterDateClass {{cxPropInputClass}}\" lt-prop-start-week-day=\"{{cxPropStartWeekDay}}\" lt-prop-current-date=\"{{value}}\" lt-prop-iso=\"{{lbind(cxPropIso)}}\" data-zcqa=\"{{cxPropZcqa}}\" on-date-change=\"{{method('onDateChange1')}}\" cx-prop-login-user-required=\"true\" on-calendar-open=\"{{method('onCalendarOpenComp')}}\" on-before-calendar-close=\"{{method('cruxOnBeforeCalendarClose')}}\" on-calendar-close=\"{{method('cruxOnCalendarClose')}}\" lt-prop-header-type=\"{{cxPropHeaderType}}\" lt-prop-auto-update=\"true\" onkeyup=\"{{action('onKeyUpCloseCalendar')}}\" lt-prop-prevent-keys=\"{{cxPropPreventKeys}}\" lt-prop-calendar-properties=\"{{cxPropCalendarProperties}}\" lt-prop-callback-delay=\"{{defaultUndefined}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-render-calendar-icon=\"{{cxPropRenderCalendarIcon}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\" lt-prop-validate-on-input=\"{{cxPropValidateOnInput}}\"></lyte-input> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template><template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div> </template></template> {{addMurhyInfo(\"crux-date-component.html\",\"Feb Default Changes\")}} <lyte-input lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-type=\"date\" on-navigate=\"{{method('navigation')}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-format=\"{{format}}\" lt-prop-start-week-day=\"{{cxPropStartWeekDay}}\" lt-prop-current-date=\"{{cxPropValue}}\" lt-prop-iso=\"{{lbind(cxPropIso)}}\" data-zcqa=\"{{cxPropZcqa}}\" on-date-change=\"{{method('onDateChange1')}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-min-date=\"{{cxPropMinDate}}\" lt-prop-calendar-class=\"{{cxPropCalendarClass}}\" on-calendar-open=\"{{method('onCalendarOpenComp')}}\" lt-prop-dropdown-freeze=\"{{cxPropFreeze}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-dropdown-properties=\"{{cxPropDropdownProperties}}\" lt-prop-max-date=\"{{cxPropMaxDate}}\" on-before-calendar-close=\"{{method('cruxOnBeforeCalendarClose')}}\" on-calendar-close=\"{{method('cruxOnCalendarClose')}}\" on-before-open=\"{{method('beforeOpen')}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-header-type=\"{{cxPropHeaderType}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-bind-to-body=\"false\" lt-prop-calendar-properties=\"{{cxPropCalendarProperties}}\" onkeyup=\"{{action('removeErrorMessage',event)}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-prevent-keys=\"{{cxPropPreventKeys}}\" lt-prop-yield=\"{{cxPropYield}}\" lt-prop-prevent-selection=\"{{cxPropPreventSelection}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" lt-prop-render-calendar-icon=\"{{cxPropRenderCalendarIcon}}\" onkeydown=\"{{action('onKeydownevent',event)}}\" onmousedown=\"{{action('onMouseDownClick',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\" lt-prop-validate-on-input=\"{{cxPropValidateOnInput}}\"> <template is=\"if\" value=\"{{cxPropYield}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"footer\"><lyte-yield yield-name=\"footer\"></lyte-yield></template> </template></template> </lyte-input> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-date-component.html\",\"Feb Default Changes\")}} <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"criteria":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[0]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"filter":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"text","position":[3,1,3]},{"type":"attr","position":[3,1,5]},{"type":"attr","position":[3,1,5,1]},{"type":"if","position":[3,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[0]}]}]}},"default":{}},{"type":"componentDynamic","position":[3,1,5]},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,9]},{"type":"if","position":[3,1,9],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,0]},{"type":"text","position":[3,2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropAutofocus","lyteViewPort","cxPropValue","cxPropFrom","cxPropDatePattern","cxPropStartWeekDay","format","cxPropField","cxPropFieldKey","cxPropEmptyValue","cxPropZcqa","cxPropYield","cxPropDisabled","cxPropReadonly","cxPropClass","cxPropPlaceholder","isError","cxPropAppearance","cxPropErrorMessage","cxPropIgnoreEmptyValue","cxPropId","cxPropName","cxPropClearErrorMessage","cxPropBoundary","cxPropErrorYield","cxPropMinDate","lyteUnbound","cxPropTabIndex","cxPropTabindex","cxPropDirection","cxPropLabelClass","cxPropTooltip","value","cxPropCalendarClass","cxPropInfoTooltip","cxPropAutocomplete","cxPropDateInUserPattern","cxPropFreeze","cxPropScope","cxPropMaxDate","cxPropDropdownProperties","cxPropAria","cxPropAriaAttributes","cxPropTooltipConfig","cxPropTooltipClass","cxPropHeaderType","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropCalendarProperties","cxPropErrorClass","cxPropWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropPreventKeys","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropDisableInvalidDate","cxPropButtonTextInsideElement","cxPropMandatory","defaultUndefined","cxPropCallbackDelay","cxPropUpdateDelay","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropEnableLbind","cxPropPreventFocusOnError","cxPropPreventSelection","tooltip","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropButtonYield","cxPropIso","cxPropAriaErrorProperties","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropPrefixYield","cxPropDivWrapperClass","cxPropSuffixYield","cxPropMaskingProperties","cxPropPreventParentScroll","cxPropRenderCalendarIcon","cxPropValidateOnInput"],
_observedAttributesType :["object","object","boolean","boolean","boolean","string","string","string","number","string","object","string","string","string","boolean","boolean","boolean","string","string","boolean","string","string","boolean","string","string","boolean","object","boolean","string","boolean","string","string","string","string","string","string","string","string","string","boolean","boolean","string","string","object","boolean","object","string","string","string","string","string","object","string","string","string","string","boolean","string","boolean","boolean","string","boolean","string","boolean","string","number","number","string","boolean","string","boolean","boolean","boolean","string","string","object","string","string","boolean","string","object","string","boolean","boolean","boolean","boolean","string","boolean","object","boolean","boolean","boolean"],
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
			/**
			 * Set to true to render error message on hover card
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * Sets autofocus value for input. Browser will focus input when entire page got loaded.
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
		    /**
			 * Set to true to render component on viewport
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
			 * The pattern in which the date will be rendered
			 * @componentProperty { string } cxPropDatePattern
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDatePattern : Lyte.attr("string", {default : (typeof Crm != "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy")}),//No I18n
			/**
			 * @componentProperty { number } cxPropStartWeekDay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStartWeekDay : Lyte.attr("number", {default : ((typeof Crm != "undefined" && Crm.calPreferences && Crm.calPreferences.WEEKSTARTSON != undefined) ? Crm.calPreferences.WEEKSTARTSON : 1)}),//No I18n
			format : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * The selector which determines which key holds the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * This value is rendered when cxPropValue is empty
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Zcqa set to lyte-input
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * for calendar footer yield
			 * @componentProperty { boolean } cxPropYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYield : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This property disables the input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It makes the input field as readonly
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class set to lyte-input
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * Sets placeholder for input field
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @internal
			 * @componentProperty { boolean } isError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * Message displayed below input on error
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Set to true to ignore empty value on validate
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Id set to lyte-input
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name set to lyte-input
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to false to prevent clearing of error message on change of value
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Whenever calendar exceeds given boundary value it will be closed
			 * @componentProperty { object } cxPropBoundary
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * Set to true to render custom error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropMinDate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMinDate : Lyte.attr("string", {default : ""}),//No i18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string"), //No I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string"), //No I18n
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
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * @internal
			 * @componentProperty { string } value
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			value : Lyte.attr("string"),//No I18n
			/**
			 * Same class will be added for calendar div
			 * @componentProperty { string } cxPropCalendarClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCalendarClass : Lyte.attr("string"), //No I18n
			/**
			 * The info message displayed on hover of the info icon next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Enables native autocomplete property for input
			 * @componentProperty { string } cxPropAutocomplete
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//No I18n
			/**
			 * Set to true if date value passed is in user pattern instead of ISO format
			 * @componentProperty { boolean } cxPropDateInUserPattern=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDateInUserPattern : Lyte.attr("boolean"),//NO I18n
			/**
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
			 * To set custom attributes to input
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom attributes to input
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderType : Lyte.attr("string", {default: 'dropdown'}),//No I18n
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
			 * You can give any basic lyte-calendar properties in this as a single object
			 * @componentProperty { object } cxPropCalendarProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCalendarProperties : Lyte.attr("object", {default : {}}),//No I18n
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
			 * Sets class for input
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default : ""}),//No I18n
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
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to display info icon next to field label
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
			 * Class set to custom disable icon
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Set to false to prevent user from typing invalid dates
			 * @componentProperty { boolean } cxPropDisableInvalidDate=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisableInvalidDate : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string")	,//No I18n
			/**
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),//No I18n
			defaultUndefined : Lyte.attr("string"),//no i18n
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
			 * Class set to warning message icon
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
			cxPropEnableLbind : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to prevent focus on error
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to prevent selection on click/ calendar open
			 * @componentProperty { boolean } cxPropPreventSelection=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropPreventSelection : Lyte.attr("boolean", {default : false}),
			tooltip : Lyte.attr("string"),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
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
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),
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
	getValue : function(options){
	    if( this.$node.querySelector("#cruxLoadingElem") ){
            return this.data.cxPropValue;
	    }
		var input = this.$node.querySelector("input").value;//No I18n
		if(this.data.cxPropFrom==='create' && this.data.cxPropMaskingProperties && this.noMaskPermissionKeyDown){
			input=this.data.cxPropValue ;
		}
		if(this.getData("cxPropFrom") == "criteria"){
			// var date = new Date(input);
			if(input.trim() == "" || !input.trim()){
				return '';
			}
			var date = this.getDateObject(input.trim());
			if(date){
				var res = date.getFullYear()+"-";
				while (res.length < 5){res = "0" + res};
				res+=((date.getMonth()+1)<10? "0" : "")+(date.getMonth()+1)+"-";
				res+=((date.getDate())<10? "0" : "")+date.getDate();
				return res;
			}
			return "";
		}
		if(options && options.iso){
			return this.getData('cxPropIso');
		}else if(this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n && input !== ''){
			return !this.data.cxPropDateInUserPattern ? $L.moment(input, this.data.cxPropDatePattern.toUpperCase(), {i18n : true}).format(this.data.cxPropDatePattern.toUpperCase()) : $L.moment(input, this.data.cxPropDatePattern.toUpperCase(), {i18n : true}).i18N(this.data.cxPropDatePattern.toUpperCase());
		}else{
			return input;
		}
	},
	validate : function(){
		var node = this.$node.querySelector("input");//No I18n
    	var value = node ? node.value : this.getValue();
		if(this.data.cxPropFrom==='create' && this.noMaskPermissionKeyDown){
			value=this.data.cxPropValue ;
		}
		this.setData("cxPropErrorMessage", "");//No I18n
    	if(value && value.trim() == ""){
			value = "";
		}
		var field = this.getData("cxPropField");//No I18n
		if(this.getData("cxPropFrom") == "create"){
			var validate = true;
			if(!value){
				validate = this.validateMandatory(true);
			}
			else{
				validate = this.isValidDate(value);
				if(!this.validateMaskField()){
					return true;
				}
				if(!validate){
					if(this.getMethods("onError")){
						this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
					}
					else{
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
					}
				}
			}
			if(validate == true){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			else{
				this.focusFromHere = true;
				!this.data.cxPropPreventFocusOnError ? this.$node.focus() : "";
				delete this.focusFromHere;
				// this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
			}
			return validate;
		}
		if(value == "" && this.getData("cxPropIgnoreEmptyValue")){
			return true;
		}
		return this.dateValidate(node, value);//No I18n
	},
	resetData:function(){
		this.$node.querySelector("lyte-input").ltProp('currentDate','');	
	},
	actions: {

		onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if (this.data.cxPropPrefixYield && rightIconBox) {
				if(onfocus){
					rightIconBox.classList.remove("cxBoxInputFocused");//No I18n
				} else{
					rightIconBox.classList.add("cxBoxInputFocused");		//No I18n
				}
			}
		},

    showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    onKeyUpCloseCalendar : function(){
    	if(event && event.keyCode == 13){
    		this.input.blur();//No i18n
    	}
		_cruxUtils.addMurhyInfo("crux-date-component.js", "Feb Default Changes");
    },
    removeErrorMessage : function(event){
    	if(this.data.cxPropClearErrorMessage && event.keyCode !== 13){
    		this.setData("cxPropErrorMessage", "");//No i18n
    	}
		//deleting the saved keDown keys on keyup
		_cruxUtils.addMurhyInfo("crux-date-component.js", "Feb Default Changes");
		this.onKeyUpMaskField(event);
    },
	onMaskUnMaskIconClick:function(){
		this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
		event.stopPropagation();
	},
	onKeydownevent:function(event){
		this.onKeyDownMaskField(event);
	},
	onMouseDownClick:function(event){
		this.onMouseDownMaskField(event);
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
		this.data.format = this.getData("cxPropDatePattern").toUpperCase();//No I18n
		if(!this.getData("cxPropPlaceholder")){
			this.setData("cxPropPlaceholder", this.getData("format"));//No I18n
		}
		if(this.data.cxPropFrom == "view"){
			var value = this.data.cxPropValue;//No I18n
			if(value){
				if(value.indexOf(":") != -1){
					this.data.cxPropValue = value.substring(0, value.split(":")[0].lastIndexOf(" "));//No I18n
				}
			}
		}else if(this.data.cxPropFrom === "criteria"){
			var calProp = this.data.cxPropCalendarProperties;
			if(calProp){
				if(!calProp.i18n){
					Lyte.objectUtils(this.data.cxPropCalendarProperties, 'add', 'i18n', true);
				}
				if(!calProp.disabledNavigation){
					Lyte.objectUtils(this.data.cxPropCalendarProperties, 'add', 'disableNavigation', true);
				}
			}
			if(!this.data.cxPropMinDate){
				this.setData('cxPropMinDate', $L.moment('01/01/1000', 'DD/MM/YYYY').format(this.data.cxPropDatePattern.toUpperCase()));
			}
			// this.data.cxPropCalendarProperties = Object.assign(this.data.cxPropCalendarProperties, {"i18n" : true,"disableNavigation" : true});
		}else if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		// this.$node.focus = this.focus.bind(this);

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
	},
	observeValue : function(){
		// this.setData("isError", false);//No I18n
		if(this._prevent){//when data is set via component instead of data
			delete this._prevent
			return
		}
		if(this.data.cxPropFrom != "view" ){
			if(this.data.cxPropValue && this.data.cxPropValue.trim()){
				this._prevent = true
				var value = this.data.cxPropValue;//No I18n
				value = value.replace(/[+-]\d{2}:\d{2}/,'');//No I18n
				var res = /^(.*)T/.exec(value);
				if(res){
					value = res[1];
				}
				if(!this.data.cxPropToggleMasking){
					if(!this.data.cxPropDateInUserPattern){
						this.setData("cxPropValue", this.getDateInUserDatePattern(this.getDateObjectFromString(value, "YYYY-MM-DD", undefined, this.data.cxPropDisableInvalidDate), undefined, this.data.cxPropDisableInvalidDate ? true : "YYYY-MM-DD", this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n));//No I18n
					}
					else{
						this.setData("cxPropValue", this.getDateInUserDatePattern(this.getDateObjectFromString(value, this.data.cxPropDatePattern, undefined, this.data.cxPropDisableInvalidDate, {i18n : true}), undefined, this.data.cxPropDisableInvalidDate ? true : this.data.cxPropDatePattern, this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n));//No I18n
					}
				}
				this._prevent = false;
			}
			if(this.getData("cxPropFrom") == "filter"){
				this.setData("value", this.getData("cxPropValue"));//check locally//No I18n
			}
		}
		else if(this.data.cxPropFrom === "view" && this.data.cxPropValue){
			if(this.data.cxPropDateInUserPattern === false){
				this.setData("cxPropValue", this.getDateInUserDatePattern(this.getDateObjectFromString(this.data.cxPropValue, "YYYY-MM-DD"), undefined, undefined, this.data.cxPropCalendarProperties && this.data.cxPropCalendarProperties.i18n));//No I18n
				this.data.cxPropDateInUserPattern = true;				
			}
			else if(this.data.cxPropValue.indexOf(":") !== -1){
				this.data.cxPropValue = this.data.cxPropValue.substring(0, this.data.cxPropValue.split(":")[0].lastIndexOf(" "));//No I18n
			}
		}
	}.observes("cxPropValue", "cxPropFrom").on("init"),//No I18n
	methods : {
		onDateChange1 : function(op){
		    var oldValue = this.$node.querySelector("input").value;//No I18n
			if(oldValue.indexOf("'") > -1){
				this.$node.querySelector("input").value = oldValue.replace(/'/g, '')//No I18n
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onDateChange")){
				this.executeMethod("onDateChange", arguments[0], arguments[1], arguments[2]);
			}
			if ( !this.reset_value && this.data.cxPropFrom==='create' &&  this.data.cxPropMaskingProperties && !this.data.maskUnmaskPermission && (!event || event.type !== 'blur') ) {
				delete this.noMaskPermissionKeyDown ;
			}
			if(this.reset_value){
				this.reset_value=false;
			}
			// this.setData("isError", false);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
		    if(this.data.cxPropFrom != "criteria" && (this.isValidDate(this.$node.querySelector("input").value, this.data.cxPropDatePattern) && this.data.cxPropValue != this.getValue() || !this.data.cxPropDisableInvalidDate)){
		        this._prevent = true;
				this.setData("cxPropValue", op.newValue);//No I18n
			}
		},
		navigation : function(){
			if(arguments[0] && arguments[0].target && arguments[0].target.parentElement.classList.contains('lyteCalCurrentDate')){
				this.setData("selectedDate", this.getDateInUserDatePattern(new Date()));//No I18n
				this.input.blur();//No I18n
				arguments[3].$node.querySelector('.lyteCalToday').click()
			}
		},
		onCalendarOpenComp : function(){
			if(this.getMethods("onCalendarOpen")){
				/**
				 * @method onCalendarOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * This method is invoked after opening the calendar
				 */
				this.executeMethod("onCalendarOpen");//No I18n
			}
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    },
    cruxOnBeforeCalendarClose : function(calendar , input, direct){
    	if(this.getMethods("onBeforeCalendarClose")){
			/**
			 * This method is called before closing a calendar. It will accept promise
    		 * @method onBeforeCalendarClose
    		 * @author anuja.manoharan
    		 * @version 1.0.0
    		 * @param { * } calendar
    		 * @param { * } input
    		 * @param { * } direct
    		 */
    		var ret = this.executeMethod("onBeforeCalendarClose", calendar , input, direct)
    		if(ret == false){
    			return false;
    		}
    	}
    },
    cruxOnCalendarClose : function(calendar , input){
    	this.patternValidate(this.$node.querySelector("input"));
    	if(this.input.calendarDiv){
	    	this.input.calendarDiv.querySelector("lyte-calendar").revertToSelected();  //No I18n  		
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
    beforeOpen : function(){
    	if(this.focusFromHere){
    		delete this.focusFromHere;
    		return false;
    	}
    	if(this.getMethods("onBeforeCalendarOpen")){
				/**
				 * @method onBeforeCalendarOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onBeforeCalendarOpen");//NO I18n
			}
    },
	onFieldFocus:function(event){
		this.onFocusMaskField(event);
	}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-date-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
		// this.setData("isError", true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n

	setInput : function(){
		this.input = this.$node.querySelector("lyte-input");
	}.observes("lyteViewPort", "cxPropFrom").on("didConnect"),

	didDestroy : function(){
		delete this.input;
  	},

	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : "lyte-input");//No I18ns
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
	}.observes("cxPropField.required" , "lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	observeIsError : function(){
		if(  !this.input || (this.getData("cxPropFrom") != "create" && this.getData("cxPropFrom") != "criteria")){
			return;
		}

		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else {
			if (this.data.isError === true) {
				this.input.classList.add("cruxErrorField", "cxErrorBox"); // No I18n
			} else {
				this.input.classList.remove("cruxErrorField", "cxErrorBox"); // No I18n
			}
		}


	}.observes("isError", "lyteViewPort").on("didConnect"),//No I18n
	focus : function(){
		// if(this.input){
		// 	// this.focusFromHere = true;
		// 	this.input.ltProp('focusAtEnd', true);
		// 	this.input.ltProp('focus', true);
		// 	// this.input.focus();//No I18n
		// 	delete this.focusFromHere;
		// }
		if(this.$node.focus){
			this.$node.focus();
		}
	},
	observeValue2 : function(){
		if(this.data.cxPropClearErrorMessage){			
				this.setData("cxPropErrorMessage", "");//No I18n
			}
		}.observes("cxPropValue"),//No I18n
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


	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * Called when element is rendered in viewport
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
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip","cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	oobserveMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init'),
	observeNoMaskPermission: function(){
		if (this.data.cxPropFrom === "create" && this.data.lyteViewPort !== true && this.data.cxPropMaskingProperties && this.data.cxPropValue && this.noMaskPermissionKeyDown) {
			// this.$node.querySelector('input').value="********" 
			this.reset_value=true;
			this.$node.querySelector('lyte-input').ltProp('iso',"");
			this.$node.querySelector('lyte-input').ltProp('currentDate',"********"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
			// this.$node.querySelector('lyte-input').ltProp('iso',"********");
			// this.reset_value=false;
		}
	}.observes('cxPropFrom', 'lyteViewPort').on('didConnect'),
	observeCalendarProperties : function(){
		/* added extra row in calendar while some months contains 6 rows. so, calendar getting resized issue */
		var calProp = this.data.cxPropCalendarProperties;
		if(!calProp.preventAddingRows){
			Lyte.objectUtils(this.data.cxPropCalendarProperties, 'add', 'preventAddingRows', true);
		}
	}.observes('cxPropCalendarProperties').on('init'),
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
			if(this.data.cxPropFrom === 'view'){
				this.ariaSetForView();
			}else{
				var ariaAttr = this.ariaGetMergedAttributes("dropdown");

				if(ariaAttr && this.data.cxPropFrom === 'create' && this.data.cxPropField && this.data.cxPropFieldKey && this.data.cxPropField[this.data.cxPropFieldKey] && !(ariaAttr.cxAriaAttributes && (ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby']))){
					if (ariaAttr && !ariaAttr.cxAriaAttributes) {
						ariaAttr.cxAriaAttributes = {};
					}
					ariaAttr.cxAriaAttributes['aria-label'] = this.data.cxPropField[this.data.cxPropFieldKey];
				}

				this.setData('ariaAttributes', ariaAttr);
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropAriaErrorProperties').on('didConnect')
}, {mixins : ["crux-element-validation"]});//No I18n

/**
 * @syntax nonYielded
 * <crux-date-component cx-prop-from="create"></crux-date-component>
 */

 /**
 * @syntax staticBuilder
 * <crux-date-component cx-prop-from="builder"></crux-date-component>
 */

 /**
 * @typedef {object} SystemAttributes
 * @property {string} crux-date-component
 * @property {Attributes} cx-prop-from
 * @property {boolean} removeChild=false
 */

/**
 * @componentProperty {SystemAttributes} systemAttributes
 */
