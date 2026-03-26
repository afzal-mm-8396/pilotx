/**
 * @component crux-boolean-component
 * @author rafik.shaik
 * @version 1.0.0
 * supports create,criteria and view cases
 */
Lyte.Component.register("crux-boolean-component", {
_template:"<template tag-name=\"crux-boolean-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropDisplayText}}\"><template case=\"true\">{{cxPropValue}}</template><template case=\"false\"><template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <span id=\"{{cxPropId}}\" class=\"criteria-yes cxElemCompViewValue\"></span></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template></template></template><template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompSuffixVwDiv\" yield-name=\"suffixYield\"></lyte-yield></template></template> </template><template case=\"criteria\"></template><template case=\"filter\"> <lyte-dropdown lt-prop-disabled=\"{{cxPropDisabled}}\" on-option-selected=\"{{method('onOptionSelected')}}\" lt-prop-yield=\"true\" lt-prop-selected=\"{{value}}\" class=\"{{dropdownClass}}\" lt-prop-placeholder=\"{{selectedLabel}}\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownClose')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-button=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaButton}}\" lt-prop-aria-body=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaBody}}\" lt-prop-aria-box=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaBox}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-focus-name=\"{{cxPropFocusName}}\" lt-prop-bfocus-name=\"{{cxPropBfocusName}}\" lt-prop-nfocus-name=\"{{cxPropNfocusName}}\"> <template is=\"yield\" yield-name=\"yield\"> <lyte-drop-button data-zcqa=\"{{cxPropZcqa}}\"> <span class=\"lyteMarginRight\">{{selectedLabel}}</span><lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"{{dropboxClass}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropConditions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.value}}\" class=\"{{cruxSetClass('criteria-option','ifEquals',value,item.value,'criteria-option-selected','','ifEquals',cxPropFrom,'criteria','criteria-option-from','')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',item.label)}}\">{{item.label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template><template case=\"create\"><template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template><template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showHideInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('showHideInfoTooltip')}}\"> <template is=\"yield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\">{{cxPropInfoTooltip}}</lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"{{parentClass}}\"> <div @class=\"cxYieldObserverElemComp\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-checkbox @class=\"cxBooleanCompCheckbox cxYieldObserverBooleanLyteCheckBox {{if(cxPropLabel,'cxBooleanCompWithLabel','')}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-checked=\"{{lbind(cxPropValue)}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" on-changed=\"{{method('onChange')}}\" onclick=\"{{action('onClicked')}}\" class=\"{{cxPropClass}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-tooltip-class=\"{{tooltipClass}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" on-before-checked=\"{{method('beforeChecked')}}\" on-before-unchecked=\"{{method('beforeUnchecked')}}\" lt-prop-label=\"{{cxPropLabel}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-checkbox=\"{{ariaAttributes.cxAriaCheckbox}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompSuffixVwDiv\" yield-name=\"suffixYield\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <span class=\"{{cruxSetClass('cxFieldWarningMsg',cxPropWarningIconClass)}}\">{{unescape(cxPropWarningMessage)}}</span> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"yield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield> </template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[6]},{"type":"if","position":[6],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"criteria":{"dynamicNodes":[],"additional":{"next":"filter"}},"filter":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,2]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[2]},{"type":"attr","position":[2,1],"trans":true},{"type":"attr","position":[2,1,1]},{"type":"if","position":[2,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[2,1,3],"trans":true},{"type":"componentDynamic","position":[2,1,3]},{"type":"attr","position":[2,1,5]},{"type":"if","position":[2,1,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[2,3]},{"type":"if","position":[2,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[2,5]},{"type":"if","position":[2,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropValue","cxPropFrom","cxPropZcqa","cxPropField","cxPropEmptyValue","cxPropDisabled","cxPropTabIndex","cxPropTabindex","cxPropInputClass","cxPropLayout","cxPropButtonYield","cxPropElementProps","cxPropClass","cxPropReadonly","cxPropAppearance","cxPropId","cxPropName","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropErrorSpanClass","cxPropErrorIconClass","cxPropClearErrorMessage","cxPropPreventFocusOnError","cxPropErrorOnHovercard","cxPropFieldKey","cxPropInfoTooltip","cxPropViewInfoTooltip","cxPropTooltip","cxPropTooltipConfig","cxPropTooltipClass","cxPropMandatory","cxPropMandatoryOption","cxPropMandatoryType","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","childCompProps","cxPropType","lyteUnbound","lyteViewPort","cxPropConditions","cxPropNoneSelected","cxPropButtonTextInsideElement","cxPropLabelClass","isError","selectedLabel","tooltip","cxPropDisplayText","cxPropSuffixYield","cxPropPrefixYield","cxPropBoxClass","cxPropBoundary","cxPropDivWrapperClass","hasSelected","cxPropDataTabindex","cxPropAria","cxPropAriaAttributes","cxPropAriaButton","cxPropAriaBox","cxPropAriaBody","cxPropAriaCheckbox","cxPropAriaErrorProperties","cxPropFocusName","cxPropBfocusName","cxPropNfocusName","ariaAttributes","cxPropLabel","dropdownClass","dropboxClass","parentClass","tooltipClass"],
_observedAttributesType :["boolean","string","string","object","string","boolean","string","string","string","string","boolean","object","string","boolean","string","string","string","string","boolean","string","string","string","string","string","boolean","boolean","boolean","string","string","boolean","string","string","string","boolean","object","string","string","boolean","string","object","string","boolean","boolean","array","boolean","string","string","boolean","string","string","boolean","boolean","boolean","string","object","string","string","string","boolean","object","object","object","object","object","object","string","string","string","object","string","string","string","string","string"],
//No I18n
	data : function(){
		return {
			/*generic properties start*/
			/**
			 * Sets value to crux component.
			 * @componentProperty { boolean } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("boolean"),//No I18n
			/**
			 * To determine what the element has to be displayed or where it is to be used.
			 * @componentProperty { view|create|criteria } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default view
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * The value to be set as ZCQA
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * It being a mandatory property, helps to provide the attributes such as data type, UI, type.
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/*generic properties end*/

			/*view specific properties start*/
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value.
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/*view specific properties end*/

			/*create specific properties start*/
			/**
			 * This property disables input. lyteInputDisabled class will be added to lyte-input.
			 * @componentProperty { boolean } cxPropDisabled
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It sets tab index for input.
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string"), //No I18n
			
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * class set to the input
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default : ''}),//No I18n
			/**
			 * Layout id to be passed to the input, properties like required are read from this layout information
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Set as true to render custom button next to input
			 * @componentProperty { boolean } cxPropButtonYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * The object is passed to the corresponding lyte input by replacing cx-prop with lt-prop
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the input.
			 * @componentProperty { flat|box } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default flat
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * Sets id to the element.
			 * @componentProperty { cxPropId } src
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default cruxTextArea
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name set to the input
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/*create specific properties end*/

			/*error message specific properties start*/
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Set as true to render custom error message as yield
			 * @componentProperty { boolean } cxPropErrorYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 * @yieldName errorYield
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
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
			 * @default Error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * This class is set to the crux-error-message element.
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * class set to the span that contains the error
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Class set to icon next to error message
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set as false to prevent clearing of error message on change of input value
			 * @componentProperty { boolean } cxPropClearErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Set to true to prevent focus on error.
			 * @componentProperty { boolean } cxPropPreventFocusOnError
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Set as true to render error message on a hovercard
			 * @componentProperty { boolean } cxPropErrorOnHovercard
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * @default false
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/*error message specific properties end*/

			/*field label specific properties start*/
			/**
			 * The selector that determines which key holds the field label to be displayed next to the input
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Text is set to tooltip displayed next to field label as an icon
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to true to display info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/*field label specific properties end*/

			/*tooltip specific properties start*/
			/**
			 * Value set as tooltip
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * The properties passed to the tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default {position : "followcursor", appearance : "box"}
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * Class set to tooltip
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/*tooltip specific properties end*/

			/*mandatory specific properties start*/
			/**
			 * It overwrites layout specific required property.
			 * @componentProperty { boolean } cxPropMandatory
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
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
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			/*mandatory specific properties end*/

			/*warning specific properties start*/
			/**
			 * When warning is displayed, this is the message that is rendered.
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * When set to true, it displays a warning message similar to an error message.
			 * @componentProperty { boolean } cxPropShowWarning
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * Class set to warning message icon.
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/*warning specific properties end*/
			/*generic crux element properties*/
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropType
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropType : Lyte.attr("string", {default : "default"}),//No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n			
			/*component specific properties*/
			/**
			 * @componentProperty { array } cxPropConditions
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropConditions : Lyte.attr("array", {default : [{value : "1", label : _cruxUtils.getI18n("crm.label.selected")}, {value : "0", label : _cruxUtils.getI18n("crm.label.notSelected")}]}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropNoneSelected=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropNoneSelected : Lyte.attr("boolean", {default : false}),
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropLabelClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			
			
			/*internal properties*/
			/**
			 * @componentProperty { boolean } isError=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } selectedLabel
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			selectedLabel : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.select")}),//No I18n
			/**
			 * @componentProperty { string } tooltip
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			tooltip : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropDisplayText=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDisplayText : Lyte.attr("boolean", {default : false}),
			cxPropSuffixYield : Lyte.attr("boolean", {default : false}),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This is used to set the class of the dropbox that is opened. This property is only applicable when the drop-box is not yielded
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),//No I18n
			cxPropBoundary : Lyte.attr('object'),
			cxPropDivWrapperClass : Lyte.attr('string', {default : ''}),
			hasSelected: Lyte.attr("string", { default: _cruxUtils.getI18n("crm.label.selected") }),//No I18n

			/*aria specific properties start*/
			/**
			 * To set data-tabindex attribute to input
			 * @componentProperty { string } cxPropDataTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			*/
			cxPropDataTabindex : Lyte.attr("string"),
			/**
			 * To set custom attributes to input/textarea.
			 * @componentProperty { boolean } cxPropAria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaCheckbox
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes for create case
			 */
			cxPropAriaAttributes : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaButton
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to dropdown button for criteria or filter
			 */
			cxPropAriaButton : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaBox
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to dropdown box for criteria or filter
			 */
			cxPropAriaBox : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaBody
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to dropdown body for criteria or filter
			 */
			cxPropAriaBody : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaCheckbox
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to checkbox for create case
			 */
			cxPropAriaCheckbox : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			/**
			 * @componentProperty { string } cxPropFocusName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set focus name for the component in criteria case
			 */
			cxPropFocusName : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropBfocusName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set before focus name for the component in criteria case
			 */
			cxPropBfocusName : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropNfocusName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set next focus name for the component in criteria case
			 */
			cxPropNfocusName : Lyte.attr('string'),
			ariaAttributes : Lyte.attr('object', {default : {}}),
			/*aria specific properties end*/
			/**
			 * @componentProperty { string } cxPropLabel
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropLabel: Lyte.attr("string", {"default": ""}),
			dropdownClass : Lyte.attr("string"),
			dropboxClass : Lyte.attr("string"),
			parentClass : Lyte.attr("string"),
			tooltipClass : Lyte.attr("string")
		}
	},
	actions : {
		onClicked : function(){
			this.getMethods("onClicked") ? 
			/**
			 * @method onClicked
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			this.executeMethod("onClicked") : "";
		}
	},
	methods : {
		onOptionSelected : function(ev, value){
			this.setData("value", value);//No I18
			this.prevent = true;
			this.setData("cxPropValue", value == "1" ? true : false);//No I18n
			this.setSelectedLabel();
			// this.getMethods("onValueChange") ?  this.executeMethod("onValueChange", this.getValue()) : "";
			if(this.getMethods("onValueChange")){
				/**
				 *  Called on select of the option
				 * @method onOptionSelected
				 * @author rafik.shaik
				 * @version 1.0.0
				 */
				this.executeMethod("onValueChange", this.getValue());
			}
		},
		onChange : function(){
			this.data.cxPropClearErrorMessage ? this.setData("cxPropErrorMessage", "") : "";
			if(this.getMethods("onValueChange")){
				this.setData("cxPropValue", this.$node.querySelector("lyte-checkbox").ltProp("checked"));//No I18n
				/**
				 *  Called on change of checkbox
				 * @method onChange
				 * @author rafik.shaik
				 * @version 1.0.0
				 */
				this.executeMethod("onValueChange", this.data.cxPropValue);
			}
		},
		beforeChecked : function(input, comp, event, userAction){
			if(this.getMethods("onBeforeChecked")){
				return this.executeMethod("onBeforeChecked", this.data.cxPropValue, event, userAction);
			}
	    },
	    beforeUnchecked : function(input, comp, event, userAction){
			if(this.getMethods("onBeforeUnchecked")){
				return	this.executeMethod("onBeforeUnchecked", this.data.cxPropValue, event, userAction);
			} 	
	    },
	    onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		onDropdownClose : function(event, comp){
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		}
	},
	init : function(){
		var from = this.data.cxPropFrom;//No I18n
		if((from == "criteria" || from == "filter") && !this.data.cxPropNoneSelected){
			if(!(this.data.cxPropTabIndex || this.data.cxPropTabindex)){
				this.setData("cxPropTabindex", "1");
			}
			if(this.data.cxPropValue === undefined){
				this.data.value =  "1";//No I18n
				this.data.cxPropValue = true;//No I18n
			}
			if(!this.data.cxPropNoneSelected){
				if(this.data.cxPropValue == undefined){
					this.data.value =  "1";//No I18n
					this.data.cxPropValue = true;//No I18n
				}
				else{
					this.data.value =  this.data.cxPropValue ? "1" : "0";//No I18n
				}
				this.setSelectedLabel();
			}
		}
		else if(from == "create"){
			Lyte.arrayUtils(this.data.cxPropConditions, "unshift", [{value : "-1", label : _cruxUtils.getI18n("crm.select")}])//No I18n
			this.data.value=  "-1";//No I18n
			this.observeAndSetTooltip();			
		}
		if(["primary", "switch", "slider"].indexOf(this.data.cxPropType) == -1){
			this.setData("cxPropType", "default")//No I18n
		}
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
	},
	didConnect : function(){
		this.setData("hasSelected", "Not Selected");
	},
	getValue : function(){
		/**
		 * This util will be called to get the value of boolean comp.
    	* @utility getValue
    	* @version 1.0.0
   		*/    
		if(this.data.value == "-1" && this.data.cxPropFrom != "create"){
			return -1;
		}
		return this.data.cxPropValue ? this.data.cxPropValue : false;//No I18n
	},
	validate : function(){
		/**
		 * this util will be called for validation of boolean comp
    	* @utility validate
    	* @version 1.0.0
   		*/    
		if(this.data.cxPropFrom == "create"){
			var res = this.validateMandatory(!this.data.cxPropValue);
			res ? this.setData("cxPropErrorMessage", "") : "";
			return res;
		}
		return true;
	},
	resetData:function(){
		/**
		 * This util called to reset the boolean compoent state
    	* @utility resetData
    	* @version 1.0.0
   		*/    
		this.setData('cxPropValue',false);
	},
	setSelectedLabelObs : function(){
		if(!this.prevent){
			this.setData("value", this.data.cxPropValue == true ? "1" : "0");//No I18n
			delete this.prevent;		
			this.setSelectedLabel();	
		}
	}.observes("cxPropValue"),//No I18n
	setSelectedLabel : function(){
		var value = this.data.value;//No I18n
		var cond = this.data.cxPropConditions;//No I18n
		for(var i=0; i<cond.length; i++){
			if(cond[i].value == value){
				this.setData("selectedLabel", cond[i].label);
				this.setData("hasSelected", cond[i].label);
				break;
			}
		}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-boolean-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.data.cxPropErrorMessage == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-checkbox");//No I18n
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
	}.observes("cxPropField.required", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	observeIsError : function(){

		// if (this.data.cxPropPrefixYield) {
        //     var boxWithRightIcon = this.$node.querySelector(".cxBoxWithRightIcon");
        //     if (boxWithRightIcon) {
        //         boxWithRightIcon.classList.toggle("cxErrorBoxWithRightIcon", this.data.isError);
        //     }
        // } else if (this.getData("cxPropFrom") === "create" && this.$node.querySelector("lyte-checkbox")) {
        //     this.$node.querySelector("lyte-checkbox").classList.toggle("cxErrorBox", this.data.isError);
        // }



		// if (this.data.cxPropPrefixYield) {
		// 	if (this.$node.querySelector(".cxBoxWithRightIcon")) {
		// 		if (this.data.isError) {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxErrorBoxWithRightIcon");
		// 		} else {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxErrorBoxWithRightIcon");
		// 		}
		// 	}
		// } 
		// else {
		// 	if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-checkbox")){
		// 		if(this.getData("isError")){
		// 			this.$node.querySelector("lyte-checkbox").classList.add("cxErrorBox");//No I18n
		// 		}
		// 		else{
		// 			this.$node.querySelector("lyte-checkbox").classList.remove("cxErrorBox");//No I18n
		// 		}
		// 	}
		// }
		var lytecheckbox = this.$node.querySelector("lyte-checkbox");
		if(this.getData("cxPropFrom") === "create" && lytecheckbox){
			if(this.getData("isError")){
				lytecheckbox.classList.add("cxErrorCheckbox");//No I18n
			}
			else{
				lytecheckbox.classList.remove("cxErrorCheckbox");//No I18n
			}
		}

	}.observes("isError", "lyteViewPort").on("didConnect"),//No I18n
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author rafik.shaik
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled: function () {
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip", "cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-checkbox");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
			if(this.data.cxPropFrom === 'view'){
				this.ariaSetForView();
			}else{
				var ariaAttr = this.ariaGetMergedAttributes("dropdown");

				if(ariaAttr && this.data.cxPropFrom === 'create' && this.data.cxPropField && this.data.cxPropFieldKey && this.data.cxPropField[this.data.cxPropFieldKey] && !((ariaAttr.cxAriaCheckbox && (ariaAttr.cxAriaCheckbox['aria-label'] || ariaAttr.cxAriaCheckbox['aria-labelledby'])) || (ariaAttr.cxAriaButton && (ariaAttr.cxAriaButton['aria-label'] || ariaAttr.cxAriaButton['aria-labelledby'])) || (ariaAttr.cxAriaDropdownAttributes && ariaAttr.cxAriaDropdownAttributes.cxAriaButton && (ariaAttr.cxAriaDropdownAttributes.cxAriaButton['aria-label'] || ariaAttr.cxAriaDropdownAttributes.cxAriaButton['aria-labelledby'])) || (ariaAttr.cxAriaAttributes && (ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby'])))){
					if (!ariaAttr.cxAriaCheckbox) {
						ariaAttr.cxAriaCheckbox = {};
					}
					ariaAttr.cxAriaCheckbox['aria-label'] = this.data.cxPropField[this.data.cxPropFieldKey];
				}

				this.setData('ariaAttributes', ariaAttr);
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropAriaErrorProperties', 'cxPropAriaCheckbox', 'cxPropAriaButton', 'cxPropAriaBox', 'cxPropAriaBody').on('didConnect'),
	observeDropdownClass : function(){
		var _class;
		if(this.data.cxPropFrom === "criteria" || this.data.cxPropFrom === "filter"){
			_class = this.data.cxPropAppearance === "flat" ? "cxFlatDropdown" : "cxBoxDropdown";
			if(this.data.cxPropClass){
				_class = _class + " "+this.data.cxPropClass;
			}
			this.setData({"dropdownClass": _class, dropboxClass : "cxDropbox "+this.data.cxPropBoxClass});
			//cxDropbox {{cxPropBoxClass}}
		}
		else if(this.data.cxPropFrom === "create"){
			_class = "cxElementValue";
			if(this.data.cxPropDisabled){
				_class = _class + " cxElementDisabled";
			}
			if(this.data.cxPropReadonly){
				_class = _class + " cxElementReadOnly";
			}
			this.setData({parentClass : _class, tooltipClass : "cxElementsTooltip "+this.data.cxPropTooltipClass});
		}
	}.observes("cxPropFrom", "cxPropAppearance", "cxPropClass", "cxPropBoxClass", "cxPropDisabled", "cxPropReadonly", "cxPropTooltipClass").on("init")
}, {mixins : ["crux-element-validation"]}); //NO I18n

/**
 * @syntax nonYielded
 * <crux-boolean-component cx-prop-from="create"></crux-boolean-component>
 */

 /**
 * @typedef {object} SystemAttributes
 * @property {string} crux-boolean-component
 * @property {Attributes} cx-prop-from
 * @property {boolean} removeChild=false
 */

/**
 * @componentProperty {SystemAttributes} systemAttributes
 */
