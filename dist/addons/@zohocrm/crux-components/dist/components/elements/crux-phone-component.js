/**
 * @component crux-phone-component
 * @author gowtham.mp
 * @version 1.0.0
 * Used to render phone component
 */
Lyte.Component.register("crux-phone-component", {
_template:"<template tag-name=\"crux-phone-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{cxPropTabIndex}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAnd(cxPropMaskingProperties,expHandlers(cxPropMaskingProperties.profiles,'!'))}}\"><template case=\"true\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropCallAllowed,'==',false),'||',cxPropField.private.restricted)}}\"><template case=\"true\"> <div class=\"phoneRtl cxElemCompViewValue\"> <span class=\"cxPhoneViewValue lvPhFld\">{{expHandlers(cxPropToggleMasking,'?:',maskedVal,cxPropDisplayValue)}}</span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{outbound}}\"><template case=\"true\"> <div class=\"phoneRtl cxPhoneViewOutbound cxElemCompViewValue\"> <span class=\"cxPhoneViewValue lvPhFld\">{{expHandlers(cxPropToggleMasking,'?:',maskedVal,cxPropDisplayValue)}}</span> <span class=\"cxCalliconOuter\" onclick=\"{{action('onClick')}}\" onmouseenter=\"{{action('callHover',true)}}\" onmouseleave=\"{{action('callHover',false)}}\"> <span class=\"cxCallIcon\"></span> <span id=\"calllabel1\" class=\"cxPhoneViewCallLabel\">{{cruxGetI18n('Call')}}</span> </span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{zpbEnabled}}\"><template case=\"true\"> <div class=\"phoneRtl cxPhoneViewZPBEnabled cxElemCompViewValue\"> <span class=\"cxPhoneViewValue lvPhFld\">{{expHandlers(cxPropToggleMasking,'?:',maskedVal,cxPropDisplayValue)}}</span> <span class=\"cxPhoneViewZPBEnabledIconWrap phoneRtlA\"> <zpb-phone zpb-ctd-on-mouse-over=\"{{method('callHover',true)}}\" zpb-cdt-on-mouse-out=\"{{method('callHover',false)}}\" number=\"{{cxPropDisplayValue}}\" module=\"{{cxPropModule}}\" recordid=\"{{cxPropEntityId}}\" callbackparamfn=\"asyncFn(crmCallsNew.getClick2CallPromise, '{{cxPropEntityId}}', '{{cxPropModule}}', '{{cxPropEntityName}}', '', '{{cxPropValue}}', '{{cxPropField.column_name}}' , '{{cxPropField.id}}')\"></zpb-phone> </span> </div> </template><template case=\"false\"> <div onmouseover=\"{{action('onMouseOver')}}\" onmouseout=\"{{action('onMouseOut')}}\" class=\"phoneRtl cxPhoneViewZPBNotEnabled cxElemCompViewValue\"> <zpb-phone zpb-ctd-on-mouse-over=\"{{method('callHover',true)}}\" zpb-cdt-on-mouse-out=\"{{method('callHover',false)}}\" phoneno=\"{{cxPropValue}}\" callbackparam=\"{&quot;module&quot;:&quot;{{module}}&quot;, &quot;searchid&quot;:&quot;{{entityId}}&quot;}\"><span class=\"cxPhoneViewValue lvPhFld\">{{expHandlers(cxPropToggleMasking,'?:',maskedVal,cxPropDisplayValue)}}</span></zpb-phone> <a class=\"pH2 phoneRtl vH cxPhoneSkypeCall\" title=\"{{cxPropPhoneIconTooltip}}\" href=\"skype:{{cxPropValue}}?call\" onclick=\"sE();\"></a> </div> </template></template></template></template></template></template> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick',event)}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocusout=\"{{action('setFocusClass',false)}}\" onfocus=\"{{action('setFocusClass',true)}}\"> <div @class=\"cxYieldObserver {{if(cxPropEnableCountryCode,concat('cxDropdownInputGroup ',cxPropWrapperClass),'')}} {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropEnableCountryCode}}\"><template case=\"true\"> <crux-dropdown cx-prop-disabled=\"{{cruxOr(cxPropDisabled,disableDropdown)}}\" on-option-select=\"{{method('onCCSelectChange')}}\" cx-prop-options=\"{{countryList}}\" cx-prop-system-value=\"actual_value\" cx-prop-user-value=\"display_value\" cx-prop-display-value=\"{{selectedCode}}\" on-show=\"{{method('onBeforeOpen')}}\" cx-prop-selected=\"{{selectedValue}}\" on-hide=\"{{method('setFocusClass',false)}}\" cx-prop-icon-class=\"{{cxPropDropdownIconClass}}\" on-before-show=\"{{method('beforeShow')}}\" cx-prop-class=\"{{cxPropDropdownClass}}\" cx-prop-is-dropdown-icon-node=\"{{cxPropIsDropdownIconNode}}\" cx-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" on-before-hide=\"{{method('beforeHide')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" cx-prop-box-class=\"{{cxPropBoxClass}}\" cx-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-boundary=\"{{cxPropBoundary}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div> </template></template> <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-class=\"cxBorderBottom {{cxPropInputClass}}\" lt-prop-type=\"text\" lt-prop-value=\"{{inputValue}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" onkeypress=\"{{action('onKeyPress',event)}}\" onkeyup=\"{{action('onKeyUp',event)}}\" onpaste=\"{{action('onInputValuePaste',event)}}\" on-focus=\"{{method('setFocusClass',true)}}\" on-blur=\"{{method('setFocusClass',false)}}\" lt-prop-wrapper-class=\"{{if(cxPropEnableCountryCode,'',cxPropWrapperClass)}}\" onkeydown=\"{{action('onKeyDownInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonTextInsideElement}}\"><template case=\"true\"><lyte-button onclick=\"{{action('buttonClick')}}\"><template is=\"yield\" yield-name=\"text\">{{cxPropButtonTextInsideElement}}</template></lyte-button></template></template> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-phone-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"componentDynamic","position":[3,1,5]},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,9]},{"type":"if","position":[3,1,9],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,0],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropAutofocus","lyteViewPort","cxPropValue","cxPropFrom","cxPropDisplayValue","outbound","cxPropField","cxPropCallAllowed","cxPropEmptyValue","cxPropPlaceholder","cxPropMaxlength","cxPropDisabled","cxPropReadonly","zpbEnabled","cxPropEntityId","cxPropEntityName","cxPropModule","isError","cxPropAppearance","cxPropErrorMessage","cxPropFieldKey","cxPropId","cxPropName","cxPropClearErrorMessage","cxPropDirection","cxPropLabelClass","cxPropTabIndex","cxPropTabindex","cxPropZcqa","lyteUnbound","cxPropClass","cxPropTooltip","cxPropErrorYield","cxPropInfoTooltip","cxPropAutocomplete","cxPropEnableLbind","cxPropAria","cxPropAriaAttributes","cxPropMaskingProperties","cxPropTooltipConfig","cxPropTooltipClass","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropEnableCountryCode","cxPropUserLocale","countryISOCodeVsName","countryList","selectedCode","cxPropErrorClass","cxPropWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropDropdownIconClass","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropPhoneIconTooltip","cxPropPhoneInUserFormat","cxPropButtonTextInsideElement","cxPropMandatory","cxPropShowWarning","cxPropWarningMessage","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropDropdownClass","cxPropIsDropdownIconNode","cxPropPreventFocusOnError","tooltip","selectedValue","cxPropPreventParentScroll","cxPropBoxClass","inputValue","cxPropButtonYield","cxPropUpdateDelay","cxPropCallbackDelay","cxPropAriaErrorProperties","cxPropPrefixYield","cxPropBoundary","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","maskedVal","disableDropdown","cxPropDivWrapperClass","cxPropSuffixYield"],
_observedAttributesType :["object","object","boolean","boolean","boolean","string","string","string","boolean","object","boolean","string","string","number","boolean","boolean","boolean","string","string","string","boolean","string","string","string","string","string","boolean","string","string","string","string","string","boolean","string","string","boolean","string","string","boolean","boolean","object","object","string","string","string","string","boolean","string","object","array","string","string","string","string","string","string","string","boolean","boolean","string","string","boolean","string","boolean","boolean","string","string","string","object","string","string","string","boolean","boolean","string","string","boolean","string","string","boolean","number","number","object","boolean","object","string","boolean","boolean","boolean","string","boolean","string","boolean"],
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
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * Used to render component only when it comes to viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
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
			 * @defaultValue view
			 * @allowed ["view", "create"]
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { string } cxPropDisplayValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropDisplayValue : Lyte.attr("string"),//No I18n
			outbound : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropField: Lyte.attr("object", {"default": {}, hideAttr : true}), //NO I18n
			cxPropCallAllowed : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Displayed when cxPropValue is empty
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Sets placeholder for input field.
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * Sets maximum length for input field
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxlength : Lyte.attr("number"),//No I18n
			/**
			 * This property disables the input.
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			zpbEnabled : Lyte.attr("boolean", {default : (typeof Crm != "undefined" ? Crm.userDetails.ZPBENABLED : false)}),//No I18n
			/**
			 * @componentProperty { string } cxPropEntityId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropEntityId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropEntityName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropEntityName : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropModule : Lyte.attr("string"),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue flat
			 * @allowedValues ["flat", "box"]
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * The message displayed when there is an error
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * The key from the field object used to display the label
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Id set to the input
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name set to the input
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * By default, error message will be cleared when user types something. Pass as false to prevent this
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * It defines how label and input field placed
			 * @componentProperty { string } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue vertical
			 * @allowedValues ["vertical", "horizontal"]
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * Class set to label
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 0
			 */
			cxPropTabIndex : Lyte.attr("string",{default:'0'}),//No I18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * Set for ZCQA purposes
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * If set to true, yield will be rendered instead of error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * Value will be displayed on hover of info icon next to field label
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
			 * @defaultValue on
			 * @allowedValues ["on", "off"]
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//NO I18n
			/**
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
			/**
			 * To set custom attributes to input/textarea.
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom attributes to input/textarea. 
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * Object to be passed if part of the value needs to be hidden
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/**
			 * tooltip configurations. refer lyte-tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default {'position' : 'followcursor', 'appearance' : 'box'}
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * Prefix set to data-zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to data-zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue Error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * Set to true to display country code dropdown before input box
			 * @componentProperty { boolean } cxPropEnableCountryCode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropEnableCountryCode : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The user locale determines the default country code
			 * @componentProperty { string } cxPropUserLocale
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserLocale : Lyte.attr("string", {default : (typeof Crm != "undefined" ? Crm.userDetails.COUNTRY_LOCALE : "")}),//No I18n
			countryISOCodeVsName : Lyte.attr("object", {default : (typeof Crm != "undefined" ? Crm.userDetails.countryISOCodeVsName : {})}),//No I18n
			countryList : Lyte.attr("array", {default : []}),//No I18n
			selectedCode : Lyte.attr("string"),//No I18n
			/**
			 * Class set to error span
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
			 * Set class to error span
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets class to dropdown's icon node
			 * @componentProperty { string } cxPropDropdownIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default dropdown
			 */
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * If set to true, info tooltip is displayed next to label
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * If set to true, custom disable icon can be displayed
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The class for custom disable icon
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Overwrite to display title on phone icon
			 * @componentProperty { string } cxPropPhoneIconTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 'Call using skype'
			 */
			cxPropPhoneIconTooltip : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.phoneNo.Link.Title")}),
			/**
			 * Formatting will be done if set to false
			 * @componentProperty { boolean } cxPropPhoneInUserFormat=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropPhoneInUserFormat : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * Used to mark the input as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * Used to display a warning icon and message
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * The warning message to be displayed
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * The class set to the warning icon
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * The class set to the country code dropdown
			 * @componentProperty { string } cxPropDropdownClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			cxPropDropdownClass : Lyte.attr("string"),
			/**
			 * If set to true, custom dropdown icon node will be rendered
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
			/**
			 * By default, input will be focused on error. Pass false to prevent it
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			tooltip : Lyte.attr("string"),
			selectedValue : Lyte.attr("string"),
			cxPropPreventParentScroll : Lyte.attr('boolean'),
			cxPropBoxClass : Lyte.attr("string", {default : ""}),
			inputValue : Lyte.attr("string"),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue 250
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue 0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			/**
			 * property to set error icon and error color
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropBoundary: Lyte.attr("object", { default: {} }),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			maskUnmaskPermission:Lyte.attr("boolean",{default:false}),
			cxPropToggleMasking:Lyte.attr("boolean",{default:false}),
			cxPropShowMaskUnmaskIcon:Lyte.attr("boolean",{default:true}),
			maskedVal:Lyte.attr("string"),
			disableDropdown: Lyte.attr("boolean", {default : false}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false })
		}
	},
	init : function(){
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
	},

	actions : {
		callHover: function(hover){
			this.callIconHover(hover);
			
			// if (this.data.cxPropPrefixYield) {
			// 	if(!isFocus){
			// 		this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxBoxInputFocused");//No I18n
			// 	}
			// 	else{
			// 		this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");//No I18n
			// 	}
			// }
		},
		setFocusClass: function(bool){
			this.setFocusClass(bool);
		},
		onMouseOver : function(){
			var ele = this.$node;
			if(ele.querySelector("a")){
				ele.querySelector("a").style.visibility = "visible";
			}
		},
		onMouseOut : function(){
			var ele = this.$node;
			if(ele.querySelector("a")){
				ele.querySelector("a").style.visibility = "hidden";
			}
		},
		onClick : function(){
			this.phoneClick(this.getData("cxPropValue"), this.getData("cxPropEntityId"), this.getData("cxPropModule"), this.getData("cxPropEntityName"));//No I18n
			// event.preventDefault();
			// if(typeof ctiApiNotifier != "undefined"){
			// 	ctiApiNotifier.click2Call(this.getData("cxPropValue"), Crm.userDetails.ZGID, Crm.userDetails.USER_ID, this.getData("cxPropEntityId"),'', this.getData("cxPropModule"));//No I18n
			// }
			// event.stopPropagation();
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    onKeyPress : function(event){
    	if(this.data.cxPropEnableCountryCode && this.isBlockedChar(event)){
			event.preventDefault();
			return false;
    	}
    },
    onKeyUp : function(event){
    	if(this.data.cxPropEnableCountryCode){
			var inp =  $L(event.target);
			this.setData('inputValue',inp.val());
	    	this.autoPopCountryCode(this.$node,inp);    		
    	}
		this.onKeyUpMaskField(event);
    },
    onInputValuePaste : function(event){
    	
	    	setTimeout(function(){
				var inp =  $L(event.target);
				if(this.data.cxPropEnableCountryCode){
					this.setData('inputValue',inp.val());
					this.removeBlockedChars(inp);
	    			this.autoPopCountryCode(this.$node, inp);
				}else if(inp.val()){
					let val = inp.val();
					val = val.replace(/\u202F/g, " ");
					inp.val(val);
				}
	    	}.bind(this));    		
    },
	onMaskUnMaskIconClick:function(event){
		this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
		if(this.getData('cxPropToggleMasking') && this.getMethods('onMask')){
			this.executeMethod('onMask');
		}else if(!this.getData('cxPropToggleMasking') && this.getMethods('onUnmask')){
			this.executeMethod('onUnmask');
		}
		event.stopPropagation();
	},
	onKeyDownInputField:function(event){
		this.onKeyDownMaskField(event);
	},
	onMouseDownInputFiled:function(event){
		this.onMouseDownMaskField(event);
	}
	},
	callIconHover: function(hover){
		if(hover){
			if(this.getMethods('onCallHover')){
				this.executeMethod('onCallHover');
			}
		}else{
			if(this.getMethods('onCallLeave')){
				this.executeMethod('onCallLeave');
			}
		}
	},
	setFocusClass: function(bool,event){
		if(bool && event){ //setFocusClass will be called even for component focus, no need to handle masking in that case
			this.onFocusMaskField(event);
		}
		if(!this.data.cxPropEnableCountryCode){
			return;
		}
		if(bool){
			if(this.data.cxPropDisabled){
				this.$node.querySelector(".cxDropdownInputGroup").classList.add("cxDropdownInputGroupDisabled");	//No I18n
			}
			else{
				this.$node.querySelector(".cxDropdownInputGroup").classList.add("cxDropdownInputGroupFocused");    			//No I18n
			}
		}
		else{
			if(this.data.cxPropDisabled){
				this.$node.querySelector(".cxDropdownInputGroup").classList.remove("cxDropdownInputGroupDisabled");	//No I18n
			}
			else{
				this.$node.querySelector(".cxDropdownInputGroup").classList.remove("cxDropdownInputGroupFocused");   		//No I18n	
			}    		
		}	
	},
	getValue : function(){
		if( this.$node.querySelector("#cruxLoadingElem") ){
            return this.data.cxPropValue;
	    }
		var value = this.$node.querySelector('lyte-input').ltProp('value');
		value = value ? value.trim() : value;
		if(this.data.cxPropFrom == "create" && this.data.cxPropEnableCountryCode && value){
			var phCCInput = this.$node.querySelector("crux-dropdown").getData("cxPropDisplayValue");//No I18n
			if(phCCInput && phCCInput !== "-None-"&& phCCInput !== _cruxUtils.getI18n("None") && phCCInput !== "--"){
				phCCInput = phCCInput.includes("(")?phCCInput.split("(")[1].split(")")[0]:phCCInput;
				value = phCCInput.trim()+value;
			}			
		}
		return value?value:null;
	},
	validate : function(){
		return this.validatePhoneNumber(this.getData("cxPropField"), this.getValue());//No I18n
	},
	resetData:function(){
		this.$node.querySelector('lyte-input').ltProp('value','')
	},
	methods : {
		callHover: function(hover){
			this.callIconHover(hover);
		},
		onChange : function(change){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			var value = this.getValue();
			this.preventObserver = true;
			// if(!this.data.cxPropEnableCountryCode){
				this.setData("cxPropValue", value);
				this.preventObserver = false;
			// }
			if(!this.data.cxPropEnableCountryCode && change){
				this.setData('inputValue',change.newValue)
			}
			//this.setData("isError", false);//No I18n
			if(this.getMethods("onValueChange")){

				this.executeMethod("onValueChange",  value);//No I18n
			}
		},
		zpbCallBackFn : function(){
			return 'asyncFn(crmCallsNew.getClick2CallPromise,"' + this.getData("cxPropEntityId") + '","' + this.getData("cxPropModule") + '","' + this.getData("cxPropEntityName") + '","","'+this.data.cxPropValue+'","'+this.data.cxPropField.column_name+'")';	//No I18n
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    },
    onCCSelectChange : function(event, selected, x, item){
    	var s = item.getAttribute("data-value");
		this.setData('selectedValue',selected);
		this.setData("selectedCode", "");
    	if(s == "-None-"){
    		this.setData("selectedCode", _cruxUtils.getI18n("None"));
    	}
    	else{
    		this.setData("selectedCode", s+"(+"+item.innerText.split(" +")[1]+")"); 
    	}
    	setTimeout(function(){
    		this.$node.querySelector("input").focus();//No I18n
    	}.bind(this), 0);
		this.preventObserver = true;
		this.setData("cxPropValue", this.getValue());
		this.preventObserver = false;
		if(this.getMethods("onValueChange")){
			this.executeMethod("onValueChange", this.data.cxPropValue);
		}
    },
    onBeforeOpen : function(event, comp){
    	this.$node.querySelector(".cxDropdownInputGroup").classList.add("cxDropdownInputGroupFocused");//No I18n
    	// if(!this.selectOnce){
	    	var dropdown = this.$node.querySelector("crux-dropdown");//No I18n
	    	var data = this.data.selectedCode;
	    	setTimeout(function(){
	    		dropdown.cxProp("displayValue", data);//No I18n
	    	})
	    	// dropdown.setData("preventSelectedObs", true);
	    	// dropdown.cxProp("selected", data.split("(")[1].split(")")[0]);//No I18n	   
	    	// dropdown.setData("preventSelectedObs", false); 	
	    	// this.selectOnce = true;  		
    	// }
    	this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("input").focus()//No I18n	
    	if(this.getMethods("onSearch")){
    		var self = this;
    		this.$node.querySelector("crux-dropdown").setMethods({
    			onSearch : function(val){
    				return self.executeMethod("onSearch", val, countryList);
    			}
    		})
    	}
		if(this.getMethods('onElementDropdownOpen')){
			this.executeMethod('onElementDropdownOpen', this, event, comp);
		}
	},
    setFocusClass : function(bool,event){
    	this.setFocusClass(bool,event);
    },
    beforeShow : function(ev, comp){
    	if(this.data.cxPropReadonly){
    		return false;
    	}
		if(this.getMethods("onBeforeShow")){
			this.executeMethod("onBeforeShow", ev, comp, this);
		}
    },
	beforeHide : function(ev, comp){
		if(this.getMethods("onBeforeHide")){
			this.executeMethod("onBeforeHide", ev, comp, this);
		}
		}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-phone-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeIsError : function(){

		// if (this.data.cxPropPrefixYield) {
		// 	if (this.$node.querySelector(".cxBoxWithRightIcon")) {
		// 		if (this.data.isError) {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxErrorBoxWithRightIcon");
		// 		} else {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxErrorBoxWithRightIcon");
		// 		}
		// 	}
		// } else {
		// }

		if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-input")){
			if(this.getData("isError")){
				if(this.data.cxPropEnableCountryCode){
					this.$node.querySelector(".cxDropdownInputGroup").classList.add("cxGroupErrorBox");//No I18n
				}
				else{
					this.$node.querySelector("lyte-input").classList.add("cxErrorBox");//No I18n					
				}
			}
			else{
				if(this.data.cxPropEnableCountryCode){
					this.$node.querySelector(".cxDropdownInputGroup").classList.remove("cxGroupErrorBox");//No I18n
				}
				else{
					this.$node.querySelector("lyte-input").classList.remove("cxErrorBox");//No I18n
				}
			}
		}

	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
	this.observeMandatoryMixin( this.data.cxPropPrefixYield ? ".cxElemCompWithPrefixYield" : this.data.cxPropEnableCountryCode ? ".cxDropdownInputGroup" : "lyte-input", this.data.cxPropEnableCountryCode ? "cxGroupMandatoryField" : undefined);//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	observeMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
		if(this.data.cxPropEnableCountryCode && change && change.item==="cxPropFrom" && change.newValue==="create" && this.data.cxPropMaskingProperties && Object.keys(this.data.cxPropMaskingProperties).length>0 && !this.data.cxPropMaskingProperties.profiles.some(profile => profile.id === this.getData('cxPropProfileId')) && this.data.cxPropValue){
			this.setData("disableDropdown", true);
		}
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeValue : function(op){
		var val = this.getData("cxPropValue");//No I18n
		if(this.getData("cxPropFrom") === "view"){
			if(val){
				if(this.data.cxPropPhoneInUserFormat === false && Crm.userDetails.COUNTRY_LOCALE === "en_US" && val.match(/^[0-9]+$/)){
					var newVal = "(";
					if(val.length == 10){
						newVal+=val.substring(0,3)+") "+val.substring(3,6)+"-"+val.substring(6,10);
					}
					else if(val.length == 9){
						newVal+=val.substring(0,5)+")-"+val.substring(5,9);
					}
					else{
						newVal = val;
					}
					val = newVal;
				}
				this.setData("cxPropDisplayValue", val);//No I18n				
				this.setData("outbound", (typeof Crm != "undefined" ? Crm.userDetails.TELEPHONY_ENABLED : false));//No I18n
				if(this.data.cxPropToggleMasking){
					var masked_val=Lyte.Component.registeredHelpers.cruxMaskValue(this.data.cxPropDisplayValue,this.data.cxPropMaskingProperties,true,true);
					this.setData("maskedVal",masked_val);
				}
			}else{
				this.setData('inputValue',undefined);
			}
		}
		this.observeAndSetTooltip();
		if(this.data.cxPropFrom == "create"){
			if(this.data.cxPropEnableCountryCode && !this.preventObserver){
				var toSet;
				if(!this.data.cxPropValue && !this.data.cxPropDisabled){
					if(op && op.type === "change" && op.item === "cxPropValue"){
						this.setData("inputValue", "");
					}
					else if(this.data.cxPropUserLocale){
						toSet = this.data.cxPropUserLocale.split("_")[1];						
					}
				}
				this.appendPhoneNoCountryCodeOptions(toSet);
				this.autoPopCountryCode(this.$node, $L(this.$node.querySelector("input")), this.data.cxPropValue);
			}		
			else if(!this.preventObserver){
				this.setData("inputValue", this.data.cxPropValue);
			}
			if(this.getData('disableDropdown') && this.data.cxPropEnableCountryCode && op && op.type === "change" && op.item === "cxPropValue"){
				this.setData("disableDropdown", false);
			}
			this.setFocusUtil();
		}
	}.observes("cxPropValue", "cxPropFrom", "cxPropDisabled").on("init"),//No I18n
	autoPopCountryCode : function($node, $phInput, cxValue){
		var phInput = cxValue ? cxValue : $phInput.val().trim();
		if(phInput.startsWith("+")){
			var phLength = phInput.length;
			var newPhInput = phInput;
			var ccStatus = false;
			var possibleISOCode = this.getRegionCodeForNumber(phInput);
			if(possibleISOCode){
				ccStatus = this.selectCountryByPCC($node, possibleISOCode);
				if(ccStatus){
					newPhInput = phInput.substring(("+"+ZlibPhoneNumber.getCountryCodeForRegion(possibleISOCode)).length, phLength);
				}
			}
			var len = 2;
			while(phLength >=len && !ccStatus){
				newPhInput = phInput.substring(len, phLength);
				ccStatus = this.selectCountryByPCC($node, phInput.substring(0, len), phInput);
				if(len == 4 && !ccStatus){
					newPhInput = phInput.substring(1, phLength);
					ccStatus = true;
				}
				len++;
			}
			if(ccStatus){
				this.setData("inputValue", newPhInput);
			}
		}
		else{
			if(cxValue){
				this.setData("selectedValue", '-None-');
				this.setData("selectedCode", _cruxUtils.getI18n("None"));
			}
			this.setData("inputValue", phInput);
		}
	},
	isBlockedChar : function(event){
		var chr = String.fromCharCode(event.which);
		var $phInput = $L(event.target);
		var phInput = $phInput.val();
		if((chr === "+" && validationUtils.isEmpty(phInput)) || event.metaKey || event.ctrlKey)
		{
			return false;
		}
		if((event.which >= 65 && event.which <= 90) || (event.which >= 97 && event.which <= 122))	//Allow Alphabets
		{
			return false;
		}
	    return "0123456789().,-;".indexOf(chr) === -1 && event.which !== 32 && event.which !== 13;//No I18n
	},
	removeBlockedChars : function($phInput){
		var phInput = $phInput.val();
		var newPhInput = phInput.replace(/[^0-9A-Za-z().,-;]/g,'');
		if(phInput.startsWith("+")){
			newPhInput = "+"+newPhInput;//No I18n
		}
		$phInput.val(newPhInput);
	},
	getRegionCodeForNumber : function(phoneNumber){
		try
		{
			return ZlibPhoneNumber.getRegionCodeForNumber(phoneNumber);
		}
		catch(e)
		{
			murphy.error(e);
		}
		return null;
	},
	selectCountryByPCC : function($node, phoneCC, phoneNumber){
		phoneCC = phoneCC || "";
		var selectEl = $node.querySelector("crux-dropdown");
		if(selectEl && selectEl.getData("cxPropSelected") == phoneCC){
			return true;
		}
		var index = this.opList.indexOf(phoneCC);
		if(index > -1 && this.opList[index] == phoneCC){
			var possibleISOCode = this.getRegionCodeForNumber(phoneNumber);
			if(!possibleISOCode){
				possibleISOCode = this.data.countryList[index+1].display_value.split(" +")[0];
				for(var key in this.data.countryISOCodeVsName){
					if(this.data.countryISOCodeVsName[key] == possibleISOCode){
						this.setData("selectedValue", key);
						this.setData("selectedCode", key+"("+phoneCC+")");
						break;
					}
				}
			}
			else{
				this.setData("selectedValue", possibleISOCode);
				this.setData("selectedCode", possibleISOCode+"("+phoneCC+")");	
			}
			return true;
		}
		return false;
	},
	isValidPNumber : function(phoneNumber){
		try
		{
			return ZlibPhoneNumber.isValidNumber(phoneNumber);
		}
		catch(e)
		{
			murphy.error(e);
		}
		return false;
	},
	getCCSortedByName : function(){
            var d = this.data.countryISOCodeVsName
              , $ = []
              , e = ZlibPhoneNumber.getSupportedCountries();
            for (var t in d)
                d.hasOwnProperty(t) && -1 !== e.indexOf(t) && $.push(d[t]);
            $ = $.sort();
            var n = [];
            Object.keys(d).forEach((function(t) {
                var r = $.indexOf(d[t]);
                r >= 0 && -1 !== e.indexOf(t) && (n[r] = t)
            }
            ))
            return n;
	},
	appendPhoneNoCountryCodeOptions : function(toSet){
		var suppCountryList = this.getCCSortedByName();
		var options = [{actual_value : "-None-", display_value : _cruxUtils.getI18n("None")}];//No I18n
		var suppCountryLength = suppCountryList.length;
		var opList = [], selectedCode, selectedValue;
		for(var i = 0; i < suppCountryLength; i++)
		{
			var countryISOCode = suppCountryList[i];
			var opValue = "+" + ZlibPhoneNumber.getCountryCodeForRegion(countryISOCode);
			var opText = this.data.countryISOCodeVsName[countryISOCode] + " " + opValue;
			opList.push(opValue);
			options.push({actual_value : countryISOCode, display_value : opText});
			if(countryISOCode && countryISOCode === toSet){
				selectedCode = toSet+"("+opValue+")";
				selectedValue = countryISOCode;
			}
		}
		this.setData("countryList", options);//No I18n
		if(selectedCode){
			this.setData("selectedValue", selectedValue);	
			this.setData("selectedCode", selectedCode);//No I18n					
		}
		this.opList = opList;
	},
	getPlainPhoneNo : function(trimmed){
		// var trimmed = trimmed.trim();
		var phLen = trimmed.length;
		var actVal = "";
		if(phLen < 0){
			return actVal;
		}
		var re = /^\d+(,(\d)+)*(\.\d{1,2})*$/;
		if(!re.test(trimmed)){
			if(phLen === 14){
				// check whether it is in (123) 456-7890 format 1-(, 5-), 6- , 10--
				if(trimmed.startsWith('(') && trimmed.indexOf('-') && trimmed.indexOf(')') && trimmed.indexOf(" ") ){
					actVal = trimmed;
					// Check for 4th, 5th & 9th char
					var fourth = trimmed.indexOf(')');
					var fifth = trimmed.indexOf(" ");
					var ninth = trimmed.indexOf('-');
					if(fourth === 4 && fifth === 5 && ninth === 9){
						trimmed = trimmed.replace(' ','')
						trimmed = trimmed.replace('(','');
						trimmed = trimmed.replace(')','');
						trimmed = trimmed.replace('-','');
						if(trimmed.length === 10){
							var chkIt = trimmed.replace(' ','').replace('(','').replace(')','').replace('-','');
							if(chkIt.length < 10){
								return actVal;
							}
							return trimmed;
						}
					}
					return actVal;
				}
			}
			else if(phLen === 12){
				var chkSpace = trimmed.indexOf(" ");
				if(chkSpace !== -1){
					return trimmed;
				}
				// check whether it is in (12345)-6789 format
				if(trimmed.startsWith('(') && trimmed.indexOf(')') && trimmed.indexOf('-') ){
					actVal = trimmed;
					// Check for 6th & 7th char
					var sixth = trimmed.indexOf(')');
					var seventh = trimmed.indexOf('-');
					if(sixth === 6 && seventh === 7){
						trimmed = trimmed.replace('-','');
						trimmed = trimmed.replace('(','');
						trimmed = trimmed.replace(')','');
						if(trimmed.length === 9){
							var chkIt = trimmed.replace('-','').replace('(','').replace(')','');
							if(chkIt.length < 9){
								return actVal;
							}
							return trimmed;
						}
					}
					return actVal;
				}
			}
		}
		return trimmed;
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 *  Called after element has rendered in viewport
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } component
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
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
	mandatoryType : function(){
		this.observeMandatoryTypeMixin(this.data.cxPropEnableCountryCode ? ".cxDropdownInputGroup" : "lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeTabindex : function(changes){
		this.observeTabindexMixin(changes);
	}.observes("cxPropTabindex", "cxPropTabIndex").on("init"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
		if(this.data.cxPropToggleMasking){
			var masked_val=Lyte.Component.registeredHelpers.cruxMaskValue(this.data.cxPropDisplayValue,this.data.cxPropMaskingProperties,true,true);
			this.setData("maskedVal",masked_val);
		}
	}.observes('cxPropMaskingProperties').on('init')
}, {mixins : ["crux-element-validation"]});//No I18n
/**
 * @syntax nonYielded
 * <crux-phone-component  cx-prop-from="create" cx-prop-field='{"id":"1234567890","field_label":"Phone Num 1"}' cx-prop-field-key='field_label'></crux-phone-component>
 */
