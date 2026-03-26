Lyte.Component.register("crux-grouper-checkbox-component", {
_template:"<template tag-name=\"crux-grouper-checkbox-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\"></div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\">{{cxPropValue}}</template><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropFieldLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"{{createClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> {{addMurhyInfo(\"crux-grouper-checkbox-component.html\",\"Feb Default Changes\")}} <template is=\"for\" items=\"{{cxPropOptions}}\" item=\"item\" index=\"index\"> <lyte-checkbox lt-prop-type=\"{{cxPropType}}\" id=\"{{cxPropId}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-readonly=\"{{cxPropReadOnly}}\" class=\"checkbox_input\" lt-prop-class=\"{{cxPropClass}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;followcursor&quot;, &quot;appearance&quot;: &quot;box&quot;}\" lt-prop-tooltip-class=\"cxElementsTooltip\" lt-prop-name=\"{{cxPropName}}\" lt-prop-value=\"{{item[cxPropDisplayValue]}}\" lt-prop-label=\"{{item[cxPropDisplayValue]}}\" lt-prop-label-class=\"{{cxPropLabelClass}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" data-zcqa=\"{{cxPropZcqa}}_{{item[cxPropDisplayValue]}}\" on-changed=\"{{method('onCheckboxValueChanged',item[cxPropDisplayValue])}}\" on-before-checked=\"{{method('beforeCheckedCheckbox',item[cxPropDisplayValue])}}\" on-checked=\"{{method('onCheckedCheckbox',item[cxPropDisplayValue])}}\" on-before-unchecked=\"{{method('beforeUnchecked',item[cxPropDisplayValue])}}\" on-unchecked=\"{{method('onUncheckedCheckbox',item[cxPropDisplayValue])}}\" lt-prop-aria-checkbox=\"{{cxPropAriaCheckbox}}\" lt-prop-aria=\"{{cxPropAria}}\"></lyte-checkbox> </template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" class=\"{{cxPropErrorClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\"></lyte-yield></template> </crux-error-message> </template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"text","position":[0]}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"text","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"for","position":[3,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,9]},{"type":"if","position":[3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","lyteViewPort","cxPropValue","cxPropFrom","cxPropField","cxPropOptions","cxPropDisabled","cxPropFieldKey","cxPropZcqa","cxPropId","cxPropName","cxPropType","cxPropErrorMessage","cxPropClass","cxPropLabelClass","cxPropFieldLabelClass","cxPropDisplayValue","selectedValue","isError","cxPropClearErrorMessage","cxPropErrorYield","cxPropEmptyValue","cxPropDirection","cxPropInfoTooltip","cxPropTooltip","cxPropReadOnly","selected","cxPropErrorClass","cxPropAria","cxPropAriaCheckbox","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropAriaErrorProperties","cxPropPrefixYield","cxPropDivWrapperClass","cxPropSuffixYield","cxPropButtonYield","createClass"],
_observedAttributesType :["object","object","boolean","string","string","object","array","boolean","string","string","string","string","string","string","string","string","string","string","string","boolean","boolean","boolean","string","string","string","string","boolean","string","string","boolean","object","string","object","string","string","object","boolean","string","boolean","boolean","string"],
 //No I18n
	data : function(){
		_cruxUtils.addMurhyInfo("crux-grouper-checkbox-component.js", "Feb Default Changes");
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
			cxPropOptions : Lyte.attr("array"),//No I18n
			cxPropDisabled : Lyte.attr("boolean", {"default": false}),//No I18n
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			cxPropZcqa : Lyte.attr("string",{"default": ""}),//No I18n
			cxPropId : Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropName : Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropType : Lyte.attr("string", {"default": "default"}), //NO I18n
			cxPropErrorMessage : Lyte.attr("string"),//No I18n
			cxPropClass : Lyte.attr("string"),//No I18n
			cxPropLabelClass : Lyte.attr("string"),//No I18n
			cxPropFieldLabelClass : Lyte.attr("string",{"default" : ""}),//No I18n
			cxPropDisplayValue : Lyte.attr("string",{"default":"display_label"}),//NO I18n
			// cxPropActualValue : Lyte.attr("string",{"default":"id"}),//NO I18n
			selectedValue :  Lyte.attr("string"),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			cxPropEmptyValue : Lyte.attr("string", {default : ""}), //No I18n
			cxPropDirection : Lyte.attr("string", {"default": "horizontal"}), //NO i18n
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropTooltip : Lyte.attr("string"), //NO I18n
			cxPropReadOnly : Lyte.attr("boolean", {default : false}), //No I18n
			selected :  Lyte.attr("string"), //NO I18n
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			cxPropAria : Lyte.attr('boolean', {default : false}),
			cxPropAriaCheckbox : Lyte.attr("object"),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropPrefixYield: Lyte.attr("boolean", { default: false }),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropButtonYield: Lyte.attr("boolean", { default: false }),
			createClass : Lyte.attr("string")
		}
	},
	init : function(){
		var _this = this,cxPropFrom = this.getData("cxPropFrom"); //No I18n
		var _this = this,cxPropFrom = this.getData("cxPropFrom"); //No I18n
		if(cxPropFrom == "view" && !this.getData("cxPropValue") && this.getData("cxPropEmptyValue")){
			this.setData("cxPropValue", this.getData("cxPropEmptyValue"));//No I18n
		}else if(cxPropFrom === 'create'){ //No I18n
		_cruxUtils.addMurhyInfo("crux-grouper-checkbox-component.js", "Feb Default Changes");
			if(typeof this.data.cxPropTooltip == 'undefined' && (this.getData('cxPropDisabled') || this.getData('cxPropReadOnly'))){ //No I18n
				this.setData('cxPropTooltip',_cruxUtils.getI18n("crm.lable.read.only")); //No I18n
			}
		}
		this.convertLtPropJson();
	},
	getValue : function(){
		return this.getData("selected");//No I18n
	},
	validate : function(){
		if(!this.getData("selected") && this.getData("cxPropField").required){//No I18n
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR01, this);//No I18n
			}else{
				if(!this.getData("cxPropErrorMessage")){//No I18n
					this.setData("cxPropErrorMessage",_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(_this.getData("cxPropField").field_label))); //No I18n
				}
				this.setData("isError",true);//No I18n
			}
			return false;
		}
		return true;
	},
	obsValue : function(){
		var cxPropValue = this.getData('cxPropValue');
		if(cxPropValue && this.getData('cxPropFrom') === "create"){
			var elements = this.$node.getElementsByClassName("checkbox_input");
			if(elements[0]){
				for(var i=0 ; i < elements.length ; i++){
					var value = elements[i].getAttribute('lt-prop-value'); //No I18n
					if(value === cxPropValue){
						elements[i].setAttribute('lt-prop-checked', true);//No I18n
					}
				}
			}
		}
	}.observes('cxPropValue',"lyteViewPort").on('didConnect'), //No I18n
	actions: {
    showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    }
  },
	methods : {
		onCheckboxValueChanged : function(unCheckedValue,input,component){
			if(this.getMethods('onValueChange')){
				this.executeMethod('onValueChange',unCheckedValue,input,component);//No I18n
			}
		},
		beforeCheckedCheckbox : function(selectedValue,input,component){
			if(this.getMethods('onBeforeChecked')){
				this.executeMethod('onBeforeChecked',selectedValue,input,component);//No I18n
			}
		},
		onCheckedCheckbox : function(checkedValue,input,component){
			this.setData("selected",checkedValue);//No I18n
			if(this.getData('cxPropClearErrorMessage')){//No I18n
				this.setData("isError",false);//No I18n
			}
			if(this.getMethods('onChecked')){
				this.executeMethod('onChecked',checkedValue,input,component);//No I18n
			}
		},
		beforeUnchecked : function(unCheckedValue,input,component){
			if(this.getMethods('onBeforeUnchecked')){
				this.executeMethod('onBeforeUnchecked',unCheckedValue,input,component);//No I18n
			}
		},
		onUncheckedCheckbox : function(unCheckedValue,input,component){
			if(this.getMethods('onUnchecked')){
				this.executeMethod('onUnchecked',unCheckedValue,input,component);//No I18n
			}
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    }


	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	mandatoryType : function(){
		if(this.data.cxPropMandatoryType != 'red_accent_line'){
			if(this.$node.querySelector('.cxMandatoryType')){
				this.$node.querySelector('.cxMandatoryType').style.color = 'red';
			}
			if(!this.$node.querySelector('.cxMandatoryOptEnabled')){
				$L(this.$node.querySelector('.mandatoryField')).addClass('cxMandatoryOptEnabled');
			}
		}else if(this.$node.querySelector('.cxMandatoryOptEnabled')){
			$L(this.$node.querySelector('.mandatoryField')).removeClass('cxMandatoryOptEnabled');
		}
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	setCreateClass : function(){
		if(this.data.cxPropFrom === "create"){
			this.setData({createClass : "cxElementValue "+(this.data.cxPropDirection === "vertical" ? "cxGrouperVertical" : "cxGrouperHorizontal")});
		}
	}.observes("cxPropFrom", "cxPropDirection").on("init")
},{mixins : ["crux-element-validation"]}); //NO I18N
