/**
 * @component crux-time-component
 * @author rafik.shaik
 * @version 1.0.0
 * Provided support for criteria 
 */
Lyte.Component.register("crux-time-component", {
_template:"<template tag-name=\"crux-time-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <span id=\"{{cxPropId}}\" class=\"cxElementViewValue\"> <template is=\"if\" value=\"{{displayTime}}\"><template case=\"true\"> {{displayTime}} <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template></template> </span> </template><template case=\"criteria\"> <lyte-input lt-prop-end-time=\"{{cxPropEndTime}}\" lt-prop-start-time=\"{{calendarStartTime}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" class=\"{{cxPropClass}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-type=\"time\" lt-prop-default-time=\"{{cxPropValue}}\" lt-prop-autofocus=\"true\" lt-prop-focus=\"true\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-time-format=\"{{timeFormat}}\" data-zcqa=\"{{cxPropzcqa}}\" cx-prop-time-format=\"{{cxPropTimeFormat}}\" on-time-change=\"{{method('onTimeChange')}}\" lt-prop-dropdown=\"{{cxPropDropdown}}\" lt-prop-hour-interval=\"{{cxPropHourInterval}}\" lt-prop-minute-interval=\"{{cxPropMinuteInterval}}\" lt-prop-wheel=\"{{cxPropWheel}}\" lt-prop-dropdown-disabled=\"{{cxPropDropdowndisabled}}\" lt-prop-dropdown-show=\"{{cxPropDropdownShow}}\" lt-prop-dropdown-callout=\"{{cxPropDropdownCallout}}\" lt-prop-dropdown-freeze=\"{{cxPropDropdownFreeze}}\" lt-prop-dropdown-id=\"{{cxPropDropdownId}}\" lt-prop-dropdown-class=\"{{cxPropDropdownClass}}\" lt-prop-validate-on-blur=\"{{cxPropValidateOnBlur}}\" lt-prop-convert-to-nearest=\"{{cxPropConvertToNearest}}\" lt-prop-dropdown-properties=\"{{cxPropDropdownProperties}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-input-wrapper-class=\"{{cxPropInputWrapperClass}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"></lyte-input> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template><template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropDisabled,'cxElementDisabled','')}}\"> <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-end-time=\"{{cxPropEndTime}}\" lt-prop-start-time=\"{{calendarStartTime}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" class=\"{{cxPropClass}} cxFlex {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-type=\"time\" lt-prop-default-time=\"{{cxPropValue}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-focus=\"{{cxPropFocus}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-time-format=\"{{timeFormat}}\" data-zcqa=\"{{cxPropzcqa}}\" on-time-change=\"{{method('onTimeChange')}}\" lt-prop-dropdown=\"{{cxPropDropdown}}\" lt-prop-hour-interval=\"{{cxPropHourInterval}}\" lt-prop-minute-interval=\"{{cxPropMinuteInterval}}\" lt-prop-wheel=\"{{cxPropWheel}}\" lt-prop-dropdown-disabled=\"{{cxPropDropdowndisabled}}\" lt-prop-dropdown-show=\"{{cxPropDropdownShow}}\" lt-prop-dropdown-callout=\"{{cxPropDropdownCallout}}\" lt-prop-dropdown-freeze=\"{{cxPropDropdownFreeze}}\" lt-prop-dropdown-id=\"{{cxPropDropdownId}}\" lt-prop-dropdown-class=\"{{cxPropDropdownClass}}\" lt-prop-validate-on-blur=\"{{cxPropValidateOnBlur}}\" lt-prop-convert-to-nearest=\"{{cxPropConvertToNearest}}\" lt-prop-dropdown-properties=\"{{cxPropDropdownProperties}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-input-wrapper-class=\"{{cxPropInputWrapperClass}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"></lyte-input> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"criteria":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropFrom","cxPropValue","cxPropDisabled","cxPropReadonly","cxPropFocus","cxPropAppearance","cxPropTabIndex","cxPropTabindex","cxPropBoundary","cxPropTimeFormat","cxPropZcqa","timeFormat","cxPropHourInterval","cxPropMinuteInterval","cxPropDropdown","cxPropDropdowndisabled","cxPropDropdownShow","cxPropDropdownCallout","cxPropDropdownFreeze","cxPropClass","cxPropField","cxPropWheel","cxPropDropdownId","cxPropDropdownClass","cxPropValidateOnBlur","cxPropConvertToNearest","cxPropDropdownProperties","cxPropWrapperClass","cxPropInputClass","cxPropInputWrapperClass","cxPropId","convertedTimeFormat","cxPropEndTime","cxPropStartTime","calendarStartTime","cxPropUpdateDelay","cxPropCallbackDelay","cxPropDataTabindex","cxPropAria","cxPropAriaAttributes","cxPropAriaErrorProperties","ariaAttributes","cxPropEmptyValue","cxPropErrorMessage","cxPropMandatory","cxPropInfoTooltip","cxPropFieldKey","lyteViewPort","cxPropMandatoryOption","cxPropMandatoryType","cxPropPreventFocusOnError","cxPropShowDefaultValue","cxPropAutofocus","cxPropFocus","isError","displayTime"],
_observedAttributesType :["object","object","string","string","boolean","boolean","boolean","string","string","string","object","string","string","number","number","number","boolean","boolean","boolean","boolean","boolean","string","object","boolean","string","string","boolean","boolean","object","string","string","string","string","string","string","string","string","number","number","string","boolean","object","object","object","string","string","boolean","string","string","boolean","object","string","boolean","boolean","boolean","boolean","boolean","string"],

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
			 * @componentProperty { string } cxPropFrom
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFrom:Lyte.attr("string",{default:"criteria"}),
			/**
			 * @componentProperty { string } cxPropValue
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropValue:Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDisabled:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropReadonly:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropFocus=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFocus:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { string } cxPropAppearance
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropAppearance:Lyte.attr("string",{default:"box"}),
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropTabIndex:Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropTabindex:Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropBoundary
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropBoundary:Lyte.attr("object",),
			/**
			 * @componentProperty { string } cxPropTimeFormat
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropTimeFormat:Lyte.attr("string",{default:(typeof Crm != "undefined"?Crm.userDetails.TIME_FORMAT:"hh:mm a")}),
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropZcqa:Lyte.attr("string"),
			/**
			 * @componentProperty { number } timeFormat
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			timeFormat:Lyte.attr("number"),
			/**
			 * @componentProperty { number } cxPropHourInterval
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropHourInterval:Lyte.attr("number",{default:1}),
			/**
			 * @componentProperty { number } cxPropMinuteInterval
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMinuteInterval:Lyte.attr("number",{default:30}),
			/**
			 * @componentProperty { boolean } cxPropDropdown=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdown:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { boolean } cxPropDropdowndisabled=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdowndisabled:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropDropdownShow=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownShow:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropDropdownCallout=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownCallout:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropDropdownFreeze=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownFreeze:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { string } cxPropClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropField:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { boolean } cxPropWheel=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropWheel:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { string } cxPropDropdownId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownId:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropDropdownClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownClass:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { boolean } cxPropValidateOnBlur=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropValidateOnBlur:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropConvertToNearest=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropConvertToNearest:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { object } cxPropDropdownProperties
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDropdownProperties:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { string } cxPropWrapperClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropWrapperClass:Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropInputClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default : ""}),
			/**
			 * @componentProperty { string } cxPropInputWrapperClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropInputWrapperClass:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropId:Lyte.attr("string",{defult:""}),
			/**
			 * @componentProperty { string } convertedTimeFormat
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			convertedTimeFormat:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropEndTime
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropEndTime:Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropStartTime
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropStartTime : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } calendarStartTime
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			calendarStartTime : Lyte.attr("string"),//No I18n
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
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @default false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to input
			 */
			cxPropAriaAttributes : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			ariaAttributes : Lyte.attr('object', {default : {}}),
			/*aria specific properties end*/
			cxPropEmptyValue : Lyte.attr("string"),
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),
			cxPropMandatory : Lyte.attr("boolean"),
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			cxPropShowDefaultValue:Lyte.attr("boolean",{default:true}),
			cxPropAutofocus : Lyte.attr("boolean", {default : false} ),
			cxPropFocus : Lyte.attr("boolean", {default : false}),
			isError : Lyte.attr("boolean", {default : false}),
			displayTime : Lyte.attr("string")
		}		
	},
	init :function(){
		if(this.data.cxPropTimeFormat==="hh:mm a"){
			this.setData('timeFormat',12);
		}else{
			this.setData('timeFormat',24);
		}
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		this.convertLtPropJson();
	},
	actions : {
		showInfoTooltip: function(origElem) {
			this.showHideInfoTooltip(origElem);
		},
	},
	methods : {
		onTimeChange:function(value){
			this.setData("displayTime",value.newValue);
			if(value.type === 'change'){
				this.previousValue=value.newValue;
			}
			if(this.getMethods("onValueChange")){
				/**
				 *  Called on timce change
				 * @method onTimeChange
				 * @author rafik.shaik
				 * @version 1.0.0
				 */
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
		},
		hideInfoTooltip: function() {
			this.showHideInfoTooltip();
   		},
	},
	getValue:function(){
		/**
		* This util will be called to get the value of time comp.
    	* @utility getValue
    	* @version 1.0.0
   		*/    
		var input=this.$node.querySelector("input").value;
		if(this.data.convertedTimeFormat === "hh:mm A" && this.data.cxPropFrom === 'criteria'){
			input=$L.moment(input, "hh:mm A").format("HH:mm");
		}
		// else if(this.data.cxPropTimeFormat=="HH:mm"){
		// 	input=$L.moment(input, "HH:mm").format("hh:mm A");
		// }
			return input;
	},
	validate:function(){
		/**
		* this util will be called for validation of time comp
    	* @utility validate
    	* @version 1.0.0
   		*/   
		var input =this.$node.querySelector('input');
		var field = this.data.cxPropField;//No I18n
		if(this.data.cxPropFrom === 'create'){
			var inputNode = this.$node.querySelector("lyte-input");//No I18n
			if(input === undefined || !input.value || !input.value.trim()){
				if(!this.validateMandatory(true)){
					if(!this.data.cxPropPreventFocusOnError){
						this.focusFromHere = true;
						if(inputNode){
							inputNode.focus();
						}
					}
					return false;
				}
				this.setData("cxPropErrorMessage", "");//No I18n
				return true;
			}
			var timeCheck = $L.moment(input.value,this.data.convertedTimeFormat, {i18n : true}).validate();
			if(!timeCheck){
				if(this.getMethods("onError")){
					this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
				}
				else{
					this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				}
				if(!this.data.cxPropPreventFocusOnError){
					this.focusFromHere = true;
					if(inputNode){
						inputNode.focus();
					}
				}
				timeCheck = false;
			}
			else{
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			return timeCheck;
		}
		return this.timeValidate(input);//No I18
	},
	resetData:function(){
		this.$node.querySelectorAll("input")[0].value='';
	},
	observeValue:function(){
		var format = this.getData("cxPropTimeFormat");//No I18n
		if(format.indexOf("a") > -1){
			this.setData("calendarStartTime","12:00 AM");
			this.setData('convertedTimeFormat',"hh:mm A");
		}
		else{
			this.setData( "calendarStartTime","00:00");
			this.setData('convertedTimeFormat',this.data.cxPropTimeFormat);
		}
		var { timeFormat , cxPropValue , cxPropFrom }=this.data;
		var defalut_value;
		if(cxPropFrom !== 'view'){
			if(this.getData("cxPropStartTime")){
				this.setData("calendarStartTime", this.getData("cxPropStartTime"));//No I18n
			}
			if(!cxPropValue){
				if(cxPropFrom==="criteria"){
					defalut_value= "01:00"+(timeFormat === "12" ? " "+_cruxUtils.getI18n("AM") : "");
					// this.setData("displayTime", "01:00"+(timeFormat == "12" ? " "+_cruxUtils.getI18n("AM") : ""));//No I18n
				}else if(cxPropFrom==="create" && this.data.cxPropShowDefaultValue){
					var curr_time = new Date(), hr = curr_time.getHours(), minute = curr_time.getMinutes().toString(), mer = hr > 11 ? _cruxUtils.getI18n("PM") : _cruxUtils.getI18n("AM"), result;//No I18n
					if(minute.length === 1){
						minute = '0' + minute;
					}
					if(timeFormat === "hh:mm a"){
						if( hr !== 12 ) {
							hr = (hr%12).toString();
							if(hr.length === 1){
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
					defalut_value=result;
					// this.setData('displayTime',result);
				}
			}
			var cx_value=  this.data.cxPropValue || defalut_value ;
			var formatValidate=$L.moment(cx_value,this.data.convertedTimeFormat, {i18n : true}).validate();
			if(!formatValidate){
				var convertedValue;
				if( this.data.convertedTimeFormat==="hh:mm A"){
					convertedValue=$L.moment( cx_value, "HH:mm").format("hh:mm A");
				}else{
					convertedValue=$L.moment(cx_value, "hh:mm A").format("HH:mm");
				}
				if(convertedValue!=undefined){
					this.setData('displayTime',convertedValue);
					this.previousValue=convertedValue;
				}else{
					this.setData('displayTime',this.previousValue );
				}
			}else{
				this.setData('displayTime',cx_value);
				this.previousValue=cx_value;
			}
		}else{
			this.setData('displayTime',cxPropValue || this.data.cxPropEmptyValue || "");
		}
		
		
	}.observes("cxPropValue","cxPropTimeFormat","cxPropFrom").on("init"),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") === "" ? false : true);
	}.observes("cxPropErrorMessage").on("init"),
	observeIsError : function(){
		var input = this.$node.querySelector("lyte-input");
		if(this.getData("cxPropFrom") === "create" && input){
			if(this.getData("isError")){
				input.classList.add("cxErrorBox");
			}
			else{
				input.classList.remove("cxErrorBox");
			}
		}
	}.observes("isError","lyteViewPort").on("didConnect"),	
	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-input");
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom").on("didConnect"),
	observeStartTime : function(){
		this.setData("calendarStartTime", this.getData("cxPropStartTime"));//No I18n
	}.observes("cxPropStartTime"),//No I18n
	observeClass : function(op){
		if(this.data.cxPropFrom === "create"){
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
	}.observes("cxPropClass", "lyteViewPort").on("didConnect"),
	observeRender : function(){
		if(!this.data.lyteViewPort && this.getMethods('onElementRendered')){
			// if(this.getMethods('onElementRendered')){
				/**
				 * Called when element is rendered in viewport
				 * @method onElementRendered
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } this
				 */
				this.executeMethod('onElementRendered',this);
			// }
		}
	}.observes("lyteViewPort").on("didConnect"),
	observeDisabled : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes('cxPropMandatoryType').on('didConnect'),
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
	observeDefaultValue:function(){
		if(!this.data.cxPropShowDefaultValue && !this.data.cxPropValue){
			this.resetData();
		}
	}.observes('cxPropShowDefaultValue').on('didConnect')
},{mixins : ["crux-element-validation"]});

/**
 * @syntax nonYielded
 <crux-time-component  cx-prop-from="create" cx-prop-field='{"id":"1234567890","field_label":"Created Time"}' cx-prop-field-key='field_label'></crux-time-component>
 */
