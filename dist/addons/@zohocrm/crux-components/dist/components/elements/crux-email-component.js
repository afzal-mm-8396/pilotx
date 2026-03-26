
Lyte.Component.register("crux-email-component", {
_template:"<template tag-name=\"crux-email-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> <div>{{cxPropValue}}</div> <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropToggleMasking}}\"><template case=\"true\"> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <a class=\"cxEmailViewLink cxElementViewValue {{if(cxPropViewClipLabel,'cxElementViewClipLabel','cxElementViewWrapLabel')}}\" href=\"mailto:{{cxPropValue}}\" id=\"{{cxPropId}}\" onclick=\"{{action('stopP')}}\"> <template is=\"if\" value=\"{{cxPropViewClipLabel}}\"><template case=\"true\"><lyte-text lt-prop-value=\"{{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}}\"></lyte-text></template><template case=\"false\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}} </template></template> </a> </template><template case=\"false\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking)}} </template></template> </template><template case=\"false\"> <a class=\"cxEmailViewLink cxElementViewValue {{if(cxPropViewClipLabel,'cxElementViewClipLabel','cxElementViewWrapLabel')}} cxElemCompViewValue\" href=\"mailto:{{cxPropValue}}\" id=\"{{cxPropId}}\" onclick=\"{{action('stopP')}}\"> <template is=\"if\" value=\"{{cxPropViewClipLabel}}\"><template case=\"true\"><lyte-text lt-prop-value=\"{{cxPropValue}}\"></lyte-text></template><template case=\"false\"> {{cxPropValue}} </template></template> </a> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template></template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick')}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showHideInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('showHideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{unescape(cruxEncodeHTML(cxPropInfoTooltip))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-class=\"cxBorderBottom {{cxPropInputClass}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-type=\"text\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" onkeydown=\"{{action('onKeyDownInputField',event)}}\" onkeyup=\"{{action('onKeyUpInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg {{cxPropShowWarningClass}}\"> <span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <template is=\"if\" value=\"{{cxPropInfoMessage}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{cxPropInfoMessage}}\"></lyte-text> </template><template case=\"false\"> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span> {{addMurhyInfo(\"crux-email-component.html\",\"Feb Default Changes\")}} </template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"yield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield> </template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1,0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropAppearance","cxPropAutofocus","cxPropClass","cxPropDirection","cxPropDisabled","cxPropEmptyValue","cxPropEnableLbind","cxPropFrom","cxPropIconClass","cxPropId","cxPropInputClass","cxPropLayout","cxPropMandatory","cxPropMaskingProperties","cxPropMaxlength","cxPropName","cxPropPlaceholder","cxPropReadonly","cxPropTabIndex","cxPropTabindex","cxPropViewInfoTooltip","cxPropWrapperClass","cxPropZcqa","lyteUnbound","lyteViewPort","cxPropValue","cxPropAria","cxPropAriaAttributes","cxPropClearErrorMessage","cxPropErrorClass","cxPropErrorMessage","cxPropErrorSpanClass","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropPreventFocusOnError","cxPropField","cxPropFieldKey","cxPropInfoTooltip","cxPropLabelClass","cxPropShowWarning","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropWarningMessage","cxPropTooltip","cxPropTooltipClass","cxPropTooltipConfig","isError","selectedLabel","tooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropButtonYield","cxPropUpdateDelay","cxPropCallbackDelay","cxPropAriaErrorProperties","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropPrefixYield","cxPropDivWrapperClass","cxPropShowWarningClass","cxPropInfoMessage","cxPropSuffixYield","ariaAttributes"],
_observedAttributesType :["object","object","boolean","string","boolean","string","string","boolean","string","boolean","string","string","string","string","string","boolean","object","number","string","string","boolean","string","string","boolean","string","string","boolean","boolean","string","boolean","object","boolean","string","string","string","boolean","string","string","boolean","object","string","string","string","boolean","string","string","object","string","string","string","string","string","string","boolean","string","string","boolean","string","boolean","number","number","object","string","boolean","boolean","boolean","boolean","string","string","string","boolean","object"],
//No I18n
	data : function(){
		return {
			/*generic crux element properties*/
			/*generic crux element properties*/
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property send to pass multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			cxPropDirection: Lyte.attr("string", {default: 'vertical'}), //No I18n
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropEmptyValue : Lyte.attr("string", {default : ""}), //No I18n
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			cxPropIconClass: Lyte.attr("string", {'default': 'cxEditIcon'}), //No I18n
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropInputClass : Lyte.attr("string",{"default" : ''}), //NO I18n
			cxPropLayout : Lyte.attr("string"),//No I18n
			cxPropMandatory : Lyte.attr("boolean"),
			cxPropMaskingProperties : Lyte.attr("object"),   //No I18n
			cxPropMaxlength : Lyte.attr("number"), //No I18n
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropTabIndex : Lyte.attr("string"),//No I18n
			cxPropTabindex : Lyte.attr("string"), //No I18n
			// cxPropViewClipLabel: Lyte.attr("boolean", {default: false}), //No I18n
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			cxPropZcqa : Lyte.attr("string"),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n

			/*generic crux element property but type varies*/
			cxPropValue : Lyte.attr("string"),//No I18n
			
			/*generic crux element aria properties*/
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			
			/*generic crux element error properties*/
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}), //No I18n
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			
			/*generic crux element field label properties for*/
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			
			/*generic crux element warning properties*/
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			cxPropWarningIconClass : Lyte.attr("string"),

			/* Mandatory Style Properties */
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			
			cxPropWarningMessage : Lyte.attr("string"),
			
			/*generic crux element tooltip properties*/
			cxPropTooltip: Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			
			/*internal properties*/
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			selectedLabel : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.select")}),//No I18n
			tooltip : Lyte.attr("string"),

			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
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
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropShowWarningClass: Lyte.attr('string', { default: '' }),
			cxPropInfoMessage: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			ariaAttributes : Lyte.attr('object', {default : {}})
		}
	},
	getValue : function(){
		return typeof(this.data.cxPropValue) == 'string' ? this.getData("cxPropValue").trim() : this.getData("cxPropValue");//No I18n
	},
	validate : function(){
		var value = this.getValue();
		if(!value){
			if(!this.validateMandatory(true)){
				if(!this.data.cxPropPreventFocusOnError){
					this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";
				}
				return false;
			}
			this.setData("cxPropErrorMessage", "");
			return true;
		}
		if(!this.validateMaskField()){
			this.setData("cxPropErrorMessage", "");
			return true;
		}
		if(!this.validateLength(value)){
			return false;
		}
		var check = false;
		var exp;
		if(typeof XRegExp == "undefined"){
			exp = /^[A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF_]([A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF!#$%&'*+-/=?^_`{|}~.]*)@(?=.{4,256}$)(([A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)(([-_]*[A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)[.])+[A-Za-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,22}$/;
			check = exp.test(value);
		}
		else{
			exp = /^[\p{L}\p{M}\p{N}\-_]([\p{L}\p{M}\p{N}!#$%&'*+-/=?^_`{|}~.]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([-_]*[\p{L}\p{M}\p{N}])*)[.])+[\p{L}\p{M}]{2,22}$/;
			var objRegExp = new XRegExp(exp.source, "i");
			check = XRegExp.test(value.trim(), objRegExp);
		}
		if(!check){
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR02, this);
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));
			}
		}
		else{
			this.setData("cxPropErrorMessage", "");
		}
		return check;
	},
	resetData:function(){
		this.$node.querySelector('lyte-input').ltProp('value','');
	},
	methods : {
		onChange : function(){
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
			}
		},
		onFieldFocus:function(event){
			this.onFocusMaskField(event);
		}
	},
	actions:{
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
		},
		onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if (this.data.cxPropPrefixYield && rightIconBox) {
				if(onfocus){
					rightIconBox.classList.remove("cxBoxInputFocused");//No I18n
				} else{
					rightIconBox.classList.add("cxBoxInputFocused"); //No I18n
				}
			}
		}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-email-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.data.cxPropErrorMessage == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeIsError : function(){
		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else {
			this.observeError("lyte-input", "cxErrorBox")
		}

	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : "lyte-input");//No I18n
		if(this.data.cxPropFrom == "create"){
			this.setFocusUtil();
		}
	}.observes("cxPropField.required", "lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	init : function(){
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
	},
	observeClassFn : function(op){
		this.observeClass("lyte-input", op);
	}.observes("cxPropClass", "lyteViewPort").on("didConnect"),//No I18n
	observeRenderFn : function(a){
		this.observeRender();
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip()
	}.observes("cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
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
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropAriaErrorProperties').on('didConnect'),
	observerMaskPermisionField:function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init')
}, {mixins : ["crux-element-validation"]});//no i18n
