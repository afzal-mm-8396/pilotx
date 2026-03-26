/**
 * @component crux-website-component
 * @author anuja.manoharan
 * @version 1.0.0
 * Supports view and create mode
 */
Lyte.Component.register("crux-website-component", {
_template:"<template tag-name=\"crux-website-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-website-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{cxPropToggleMasking}}\"><template case=\"true\"> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <a class=\"cxLink cxElemCompViewValue\" href=\"{{href}}\" target=\"_blank\" rel=\"noopener noreferrer\" onclick=\"{{action('stopPropagation')}}\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}}</a> </template><template case=\"false\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}} </template></template> </template><template case=\"false\"> <a class=\"cxLink cxElemCompViewValue\" href=\"{{href}}\" target=\"_blank\" rel=\"noopener noreferrer\" onclick=\"{{action('stopPropagation')}}\"> <template is=\"if\" value=\"{{cxPropViewClipLabel}}\"><template case=\"true\"><lyte-text lt-prop-value=\"{{cxPropValue}}\"></lyte-text></template><template case=\"false\">{{cxPropValue}}</template></template> </a> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template></template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick')}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-class=\"cxBorderBottom {{cxPropInputClass}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-type=\"text\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" onkeydown=\"{{action('onKeyDownInputField',event)}}\" onkeyup=\"{{action('onKeyUpInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-website-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropAutofocus","lyteViewPort","cxPropValue","cxPropEmptyValue","cxPropFrom","cxPropLabel","cxPropPlaceholder","cxPropDisabled","cxPropReadonly","isError","cxPropAppearance","cxPropErrorMessage","cxPropField","cxPropFieldKey","cxPropId","cxPropName","cxPropClearErrorMessage","cxPropDirection","cxPropTabIndex","cxPropTabindex","cxPropZcqa","cxPropClass","lyteUnbound","cxPropLabelClass","href","cxPropTooltip","cxPropMaxlength","cxPropErrorYield","cxPropInfoTooltip","cxPropAutocomplete","cxPropEnableLbind","cxPropAria","cxPropAriaAttributes","cxPropMaskingProperties","cxPropTooltipConfig","cxPropTooltipClass","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropButtonTextInsideElement","cxPropMandatory","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropPrefixYield","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropPreventFocusOnError","cxPropButtonYield","cxPropUpdateDelay","cxPropCallbackDelay","cxPropAriaErrorProperties","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropViewClipLabel","cxPropDivWrapperClass","cxPropSuffixYield"],
_observedAttributesType :["object","object","boolean","boolean","boolean","string","string","string","string","string","boolean","boolean","boolean","string","string","object","string","string","string","boolean","string","string","string","string","string","boolean","string","string","string","number","boolean","string","string","boolean","boolean","object","object","string","string","string","string","string","string","string","string","string","boolean","boolean","string","string","boolean","string","boolean","string","boolean","string","object","string","string","boolean","boolean","number","number","object","string","boolean","boolean","boolean","boolean","string","boolean"],
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
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to enable view port based rendering
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Value displayed when cxPropValue is empty
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { string } cxPropLabel
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets label for input
			 */
			cxPropLabel : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets placeholder for input field
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property disables the input
			 */
			cxPropDisabled : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It makes the input field as readonly
			 */
			cxPropReadonly : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { boolean } isError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It defines the appearance of the lyte-input
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Message displayed below input on error
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The selector chosen from cxPropField to be displayed as field label
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to display clearing on error message on change of value
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It defines how label and input field placed
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabIndex : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabindex : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to lyte-input
			 */
			cxPropClass : Lyte.attr("string", {"default": ""}), //No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to field label
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } href
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			href :  Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Tooltip to be displayed on hover
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets maximum length for input field
			 */
			cxPropMaxlength : Lyte.attr("number"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render your own error message
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The tooltip content to be displayed on hover of info icon next to field label
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropAutocomplete
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Enables native autocomplete property for input
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//NO I18n
			/**
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce( In this case you can take current value from inner 'input' tag ) or else it will get updated in blur event
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * To set custom attributes to input/textarea
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * custom attributes to input
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
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
			 * class set to tooltip
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Prefix set to zcqa
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Suffix set to zcqa
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to error
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to lyte-input
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to input
			 */
			cxPropInputClass : Lyte.attr("string", {default :""}),//no i18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to error span
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display info icon next to field label
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/**
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to display to render custom disable icon
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class to be set to custom disable icon
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to mark a field as mandatory
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Message to be displayed as warning below input
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display warning message below input
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class for warning message below input
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to prevent focus on error
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
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
			cxPropViewClipLabel: Lyte.attr("boolean", { default: false }),//No I18n
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false })
		}
	},
	init : function(){
	if(this.data.cxPropFrom === "create"){
		this.setFocusUtil();
	}
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
	},
	// init : function(){
	// 	// if(this.data.cxPropFrom == "create"){
	// 	// 	this.setFocusUtil();
	// 	// }
	// 	this.convertLtPropJson();
	// },
	getValue : function(){
		return typeof(this.data.cxPropValue) == 'string' ? this.getData("cxPropValue").trim() : this.getData("cxPropValue");//No I18n
	},
	validate : function(){
		var field = this.getData("cxPropField");//No I18n
		var value = typeof(this.data.cxPropValue) == 'string' ? this.getData("cxPropValue").trim() : this.getData("cxPropValue");
		if(!value || !value.trim()){
			if(!this.validateMandatory(true)){
				if(!this.data.cxPropPreventFocusOnError){
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
		if(value && !this.validateLength(value)){
			return false;
		}
		var check = this.isValidWebUrl(value);//No I18n
		if(!check){
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			!this.data.cxPropPreventFocusOnError && this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
		}
		else{
			this.setData("cxPropErrorMessage", "");//No I18n
		}
		return check;
	},
	resetData:function(){
		this.setData('cxPropValue','')
	},
	methods : {
		onChange : function(){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			//this.setData("isError", false);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
			}
		},
		onFieldFocus:function(event){
			this.onFocusMaskField(event);
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    }
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-website-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	actions : {

		onFocusInput : function(onfocus){
			if (this.data.cxPropPrefixYield) {
				if(onfocus){
					this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxBoxInputFocused");//No I18n
				}
				else{
					this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");		//No I18n
				}
			}
		},
		
		stopPropagation : function(){
			event.stopPropagation();
		},
		showInfoTooltip: function(origElem) {
      		this.showHideInfoTooltip(origElem);
    	},
		onMaskUnMaskIconClick:function(){
			this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
			event.stopPropagation();
		},
		onKeyDownInputField:function(event){
			this.onKeyDownMaskField(event);
		},
		onKeyUpInputField:function(event){
			this.onKeyUpMaskField(event);
		},
		onMouseDownInputFiled:function(event){
			this.onMouseDownMaskField(event);	
		}
	},
	observeIsError : function(){
		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		const lyteInput = this.$node.querySelector("lyte-input");

		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else if (this.getData("cxPropFrom") === "create" && lyteInput) {
			if (this.getData("isError")) {
				lyteInput.classList.add("cxErrorBox"); // No I18n
			} else {
				lyteInput.classList.remove("cxErrorBox"); // No I18n
			}
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin( this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : "lyte-input");//No I18n
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
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
	observeValue : function(){
		var http="http"; //No i18N
		var https="https"; //No i18N
		var value = this.getData("cxPropValue");//No I18n
		if(value && value!=="" && !(value.indexOf(http)==0 || value.indexOf(https)==0)){
			this.setData("href", http+"://"+value);
		}
		else if(value){
			this.setData("href", value);
		}
	}.observes("cxPropValue").on("init"),
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Called after element is rendered in viewport
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init')
}, {mixins : ["crux-element-validation"]});//No I18n
/**
 * @syntax nonYielded
 * <crux-website-component cx-prop-from="create" cx-prop-field='{"id":"1234567890","field_label":"Website URL"}' cx-prop-field-key='field_label'></crux-website-component>
 */
