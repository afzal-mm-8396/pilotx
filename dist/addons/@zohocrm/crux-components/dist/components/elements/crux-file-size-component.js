Lyte.Component.register("crux-file-size-component", {
_template:"<template tag-name=\"crux-file-size-component\"> <div class=\"cxBoxWithRightIcon cxFileSizeCompContainer {{cxPropDivWrapperClass}}\"> <lyte-number class=\"cxBoxInput cxBoxLeftContent\" lt-prop-value=\"{{cxPropInputValue}}\" on-value-change=\"{{method('onInputValueChange')}}\" on-focus=\"{{method('onFocusInput')}}\" on-blur=\"{{method('onBlurInput')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"></lyte-number> <lyte-dropdown class=\"cxBoxDropdown cxFileSizeDropdown\" lt-prop-user-value=\"name\" lt-prop-system-value=\"value\" lt-prop-options=\"{{cxPropOptions}}\" lt-prop-selected=\"{{cxPropSelectedOption}}\" on-option-selected=\"{{method('onOptionSelected')}}\" on-show=\"{{method('onShow')}}\" on-hide=\"{{method('onHide')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-button=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaButton}}\" lt-prop-aria-body=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaBody}}\" lt-prop-aria-box=\"{{ariaAttributes.cxAriaDropdownAttributes.cxAriaBox}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-focus-name=\"{{cxPropFocusName}}\" lt-prop-bfocus-name=\"{{cxPropBfocusName}}\" lt-prop-nfocus-name=\"{{cxPropNfocusName}}\"></lyte-dropdown> </div> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropValue","cxPropInputValue","cxPropOptions","cxPropField","cxPropSelectedOption","cxPropErrorMessage","cxPropDecimalAllowed","cxPropTabIndex","cxPropTabindex","cxPropBoundary","cxPropDivWrapperClass","cxPropDataTabindex","cxPropAria","cxPropAriaAttributes","cxPropAriaButton","cxPropAriaBox","cxPropAriaBody","cxPropAriaErrorProperties","cxPropFocusName","cxPropBfocusName","cxPropNfocusName","ariaAttributes"],
_observedAttributesType :["object","object","number","string","array","object","string","string","boolean","string","string","object","string","string","boolean","object","object","object","object","object","string","string","string","object"],

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
			cxPropValue : Lyte.attr('number', {default : 100000000000}),
			// cxPropOrigValue : Lyte.attr('number'),
			cxPropInputValue : Lyte.attr('string'),
			cxPropOptions : Lyte.attr('array', {default : [
				{
					name : _cruxUtils.getI18n('Bytes'),
					value : '0'
				},{
					name : _cruxUtils.getI18n('KB'),
					value : '1'
				},{
					name : _cruxUtils.getI18n('MB'),
					value : '2'
				}
			]}),
			cxPropField : Lyte.attr('object', {default : {}}),
			cxPropSelectedOption : Lyte.attr('string'),
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			cxPropDecimalAllowed : Lyte.attr('boolean', {default : true}),
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author mariswaran.sv
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
			cxPropBoundary: Lyte.attr('object'),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),

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
			ariaAttributes : Lyte.attr('object', {default : {}})
			/*aria specific properties end*/
		};
	},
	init : function(){
		this.convertLtPropJson();
	},
	getValue : function(){
		return this.$node.cxProp('value');
	},
	validate : function(){
		var val = this.getData('cxPropInputValue');
		var field = this.getData("cxPropField");//No I18n
		var check;
		this.setData("cxPropErrorMessage", "");//No I18n
		if(!val || val === ''){
		_cruxUtils.addMurhyInfo("crux-file-size-component.js", "Feb Default Changes");
			this.setData('isError', true);
			this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.custombutton.valid.weburl.check"));//No I18n
			return false;
		}else if(this.getData("cxPropFrom") === "create"){
			var res = this.validateNumberField(val, field, this.data.maxlength, this.data.cxPropMaxvalue, this.data.cxPropMinvalue);
			var lyteNumberComp = this.$node.querySelector("lyte-number");
			var lyteInputComp = this.$node.querySelector("lyte-input");
			if(res === false && !this.data.cxPropPreventFocusOnError){
				if(lyteInputComp){
					lyteInputComp.focus();
				}else if(lyteNumberComp){
					lyteNumberComp.focus();
				}
				// lyteInputComp ? lyteInputComp.focus() : (lyteNumberComp ? lyteNumberComp.focus() : "");
				// this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
			}
			return res;
		}
		else if((!val || isNaN(parseInt(val))) && !this.data.cxPropIgnoreEmptyValue){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			this.$node.querySelector("input").focus();//No I18n
			return false;
		}else if( (!this.getData("cxPropAllowNegativeValue") && ( val.indexOf("-") !== -1 || val.indexOf("+") !== -1 ) ) || (!this.data.cxPropDecimalAllowed && val.indexOf(".") !== -1) ){ //no i18n
				this.showAlert(_cruxUtils.getI18n("crm.mb.field.common.splc"));//No I18n
				this.$node.querySelector("input").focus();//No I18n
				return false;

		}else if(field.data_type === "autonumber" || field.data_type === "bigint"){ //No I18n
			check =  field.data_type === "bigint" ? this.isValidInteger(val) : true;
			if(val.indexOf(".") > -1 || !check){
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				this.$node.querySelector("input").focus();//No I18n
				return false;
			}
		}
		else if(field.data_type !== "integer"){ //no i18n
			check = this.isValidDecimal(val);
			if(check){
				check = this.decimalLengthCheck(val);
				if(!check){
					this.showAlert(_cruxUtils.getI18n("crm.field.valid.decimal.check2", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label), field.decimal_place));//No I18n
					this.$node.querySelector("input").focus();//No I18n
				}
			}
			else{
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			return check;
		}else if(this.data.cxPropFrom === 'criteria' || this.data.cxPropFrom === 'filter'){ //no i18n
			check = this.isValidDecimal(val);
			if(check){
				check = this.decimalLengthCheck(val,{decimal_place : typeof this.data.cxPropField.decimal_place === 'undefined' || this.data.cxPropField.decimal_place === 'null' ? 2 :  this.data.cxPropField.decimal_place});
			}
			if(!check){
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			return check;
		}
		return true;
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
		onInputValueChange : function(val){
			var newVal = val.newValue;
			this.setData('cxPropInputValue', newVal);
			this.byteConversion();
			this.validate();
		},
		onOptionSelected : function(event, sel){
			this.setData('cxPropSelectedOption', sel);
			this.byteConversion();
		},
		onShow : function(event, comp){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.$node.querySelector('.cxFileSizeCompContainer').classList.add("cxBoxInputFocused");
			if(rightBoxIcon){
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		onFocusInput : function(){
			this.$node.querySelector('.cxFileSizeCompContainer').classList.add("cxBoxInputFocused");
		},
		onHide : function(event, comp){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.$node.querySelector('.cxFileSizeCompContainer').classList.remove("cxBoxInputFocused");
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		},
		onBlurInput : function(){
			this.$node.querySelector('.cxFileSizeCompContainer').classList.remove("cxBoxInputFocused");
		}
	},
	observeErrorMessage : function(){
		this.setData("isError", this.data.cxPropErrorMessage === "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-number");//No I18n
	}.observes("cxPropField.required", "cxPropMandatory", "cxPropFrom",).on("didConnect"),//No I18n
	observeIsError : function(){
		// if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-checkbox")){
			if(this.getData("isError")){
				this.$node.querySelector(".cxFileSizeCompContainer").classList.add("cxErrorBoxWithRightIcon");//No I18n
			}
			else{
				this.$node.querySelector(".cxFileSizeCompContainer").classList.remove("cxErrorBoxWithRightIcon");//No I18n
			}
		// }
	}.observes("isError", "lyteViewPort").on("didConnect"),//No I18n
	didConnect : function(){
		// this.byteConversion('byte');
		this.setData('cxPropInputValue', this.getData('cxPropValue'));
	},
	byteConversion : function(){
		var inputVal;
		var tempVal;
		var i;
		var conversionValue;
		var compVal = this.$node.cxProp('inputValue');
		if(compVal && compVal.includes('.')){
			inputVal = parseFloat(compVal);
		}else if(compVal){
			inputVal = parseInt(compVal);
		}
		tempVal = inputVal;
		i = parseInt(this.$node.cxProp('selectedOption'));
		while(i>0){
			tempVal = tempVal*1024;
			i--;
		}
		conversionValue = tempVal;
		this.setData('cxPropValue', conversionValue);
	},
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
			if(this.data.cxPropFrom === 'view'){
				this.ariaSetForView();
			}else{
				/* set focus stack attributes to number component */
				// var ariaAttrNumber = this.data.cxPropAriaAttributes ? this.data.cxPropAriaAttributes : {};
				// if(this.data.cxPropFocusName){
				// 	ariaAttrNumber['lyte-focus-name'] = this.data.cxPropFocusName;
				// }
				// if(this.data.cxPropBfocusName){
				// 	ariaAttrNumber['lyte-bfocus-name'] = this.data.cxPropBfocusName;
				// }
				// if(this.data.cxPropNfocusName){
				// 	ariaAttrNumber['lyte-nfocus-name'] = this.data.cxPropFocusName;
				// }
				// this.setData('cxPropAriaAttributes', ariaAttrNumber);

				var ariaAttr = this.ariaGetMergedAttributes("dropdown");

				// if(ariaAttr && this.data.cxPropFrom === 'create' && this.data.cxPropField && this.data.cxPropFieldKey && this.data.cxPropField[this.data.cxPropFieldKey] && !(ariaAttr.cxAriaAttributes && (ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby']))){
				// 	if (ariaAttr && !ariaAttr.cxAriaAttributes) {
				// 		ariaAttr.cxAriaAttributes = {};
				// 	}
				// 	ariaAttr.cxAriaAttributes['aria-label'] = this.data.cxPropField[this.data.cxPropFieldKey];
				// }

				this.setData('ariaAttributes', ariaAttr);
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropAriaErrorProperties', 'cxPropAriaButton', 'cxPropAriaBox', 'cxPropAriaBody').on('didConnect')
}, {mixins : ["crux-element-validation"]});
