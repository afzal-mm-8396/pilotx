/**
 * Renders a radiobutton group
 * @component lyte-radiobutton-group
 * @version 3.22.0
 */
/**
 * @domEvents keydown, keyup, focusin, focusout
 */
Lyte.Component.register("lyte-radiobutton-group", {
_template:"<template tag-name=\"lyte-radiobutton-group\" role=\"radiogroup\" tabindex=\"0\" lyte-radiobutton-group=\"\"> <template is=\"if\" value=\"{{ltPropLegend}}\"><template case=\"true\"> <fieldset class=\"lyteRadioGroupFieldSet\"> <legend class=\"lyteRadioGroupLegend {{ltPropLegendClass}}\">{{ltPropLegend}}</legend> <div class=\"{{concat('lyteRadioBtnGroup',lyteUiCapitalizeName(ltPropAlignment))}}\"> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"> <lyte-radiobutton lt-prop-aria-radio=\"{{ltPropAriaAttributes[index]}}\" lt-prop-tabindex=\"{{expHandlers(expHandlers(index,'==',0),'?:',ltPropTabindex,undefined)}}\" lt-prop-data-tabindex=\"{{lyteUiAddDataTabIndexBasedOnSelectedAndIndex(index,item,ltPropSystemValue,ltPropSelected,ltPropDataTabindex)}}\" lt-prop-prevent-focus=\"{{ltPropPreventFocus}}\" lt-prop-label=\"{{item[ltPropUserValue]}}\" lt-prop-value=\"{{item[ltPropSystemValue]}}\" lt-prop-id=\"{{expHandlers(ltPropId,'?:',item[ltPropId],&quot;&quot;)}}\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-fire-on-init=\"{{ltPropFireOnInit}}\" lt-prop-label-class=\"{{ltPropLabelClass}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-checked=\"{{unbound(if(ifEquals(item[ltPropSystemValue],ltPropSelected[ltPropSystemValue]),true))}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-read-only=\"{{ltPropReadOnly}}\" lt-prop-keyboard-navigation=\"{{ltPropKeyboardNavigation}}\" on-before-unchecked=\"{{method('rdbBeforeUnchecked')}}\" on-unchecked=\"{{method('rdbUnchecked')}}\" on-changed=\"{{method('rdbChanged')}}\" on-before-checked=\"{{method('rdbBeforeChecked')}}\" on-checked=\"{{method('rdbChecked')}}\" index=\"{{concat('',index)}}\" data-value=\"{{concat('',item[ltPropSystemValue])}}\" class=\"{{ltPropRadioBtnClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" lt-item=\"{{item}}\"></lyte-yield> </template> </template></template> </lyte-radiobutton> </template> </div> </fieldset> </template><template case=\"false\"> <div class=\"{{concat('lyteRadioBtnGroup',lyteUiCapitalizeName(ltPropAlignment))}}\"> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"> <lyte-radiobutton lt-prop-aria-radio=\"{{ltPropAriaAttributes[index]}}\" lt-prop-tabindex=\"{{expHandlers(expHandlers(index,'==',0),'?:',ltPropTabindex,undefined)}}\" lt-prop-data-tabindex=\"{{lyteUiAddDataTabIndexBasedOnSelectedAndIndex(index,item,ltPropSystemValue,ltPropSelected,ltPropDataTabindex)}}\" lt-prop-prevent-focus=\"{{ltPropPreventFocus}}\" lt-prop-label=\"{{item[ltPropUserValue]}}\" lt-prop-value=\"{{item[ltPropSystemValue]}}\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-fire-on-init=\"{{ltPropFireOnInit}}\" lt-prop-label-class=\"{{ltPropLabelClass}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-checked=\"{{unbound(if(ifEquals(item[ltPropSystemValue],ltPropSelected[ltPropSystemValue]),true))}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-read-only=\"{{ltPropReadOnly}}\" lt-prop-keyboard-navigation=\"{{ltPropKeyboardNavigation}}\" lt-prop-id=\"{{expHandlers(ltPropId,'?:',item[ltPropId],&quot;&quot;)}}\" on-before-unchecked=\"{{method('rdbBeforeUnchecked')}}\" on-unchecked=\"{{method('rdbUnchecked')}}\" on-changed=\"{{method('rdbChanged')}}\" on-before-checked=\"{{method('rdbBeforeChecked')}}\" on-checked=\"{{method('rdbChecked')}}\" index=\"{{concat('',index)}}\" data-value=\"{{concat('',item[ltPropSystemValue])}}\" class=\"{{ltPropRadioBtnClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" lt-item=\"{{item}}\"></lyte-yield> </template> </template></template> </lyte-radiobutton> </template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropName","ltPropAlignment","ltPropOptions","ltPropSelected","ltPropLabelClass","ltPropClass","ltPropFireOnInit","ltPropUserValue","ltPropSystemValue","ltPropDisabledList","ltPropFocus","ltPropAriaAttributes","ltPropYield","ltPropPreventFocus","ltPropReadOnly","ltPropRadioBtnClass","ltPropSelectedValue","ltPropSelectedClass","ltPropKeyboardNavigation","ltPropId","prevSelectedValue","preventFocusSet","selThroScript","ltPropLegend","ltPropLegendClass","ltPropTabindex","ltPropAriaAttributes","ltPropDataTabindex"],
_observedAttributesType :["string","string","string","array","object","string","string","boolean","string","string","array","boolean","array","boolean","boolean","boolean","string","string","string","boolean","string","object","boolean","boolean","string","string","string","array","string"],

	data : function(){
		return {
			/**
			 * @componentProperty {default|primary|secondary|switch|slider} ltPropType
			 * @default default
			 * @input
			 */
			ltPropType : Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'type', 'default' ),
				'input': true
			}),
			/**
			 * @componentProperty {string} ltPropName
			 * @input
			 */
			ltPropName : Lyte.attr("string",{"default":undefined, "input": true}),
			/** 
			 * @componentProperty {horizontal | vertical} ltPropAlignment=vertical
			 * @input
			 */
			ltPropAlignment : Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'alignment', "Vertical" ),
				'input': true
			}),
			/**
			 * @componentProperty {array} ltPropOptions
			 * @default []
			 * @input
			 */

			ltPropOptions : Lyte.attr("array",{"default":[], "input": true}),
			/** 
			 * @componentProperty {object} ltPropSelected={}
			 * @input
			 * @output
			 */
			ltPropSelected : Lyte.attr("object",{"default":{}, "input": true, "output": true}),
			/** 
			 * @componentProperty {string} ltPropLabelClass=""
			 * @input
			 */
			ltPropLabelClass : Lyte.attr("string",{
				"default":  _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'labelClass', "" ),
				"input": true
			}),
			/** 
			 * @componentProperty {string} ltPropClass=""
			 * @input
			 */
			ltPropClass: Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'class', "" ),
				'input': true
			}),
			/** 
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 * @input
			 */
			ltPropFireOnInit : Lyte.attr("boolean",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'fireOnInit', false ),
				'input': true
			}),
			/**
			 * @componentProperty {string} ltPropUserValue=name
			 * @input
			 */
			ltPropUserValue : Lyte.attr("string",{"default":"name", "input": true}),
			/**
			 * @componentProperty {string} ltPropSystemValue=value
			 * @input
			 */
			ltPropSystemValue : Lyte.attr("string",{"default":"value", "input": true}),
			/**
			 * @componentProperty {array} ltPropDisabledList
			 * @default []
			 * @input
			 */
			ltPropDisabledList : Lyte.attr("array",{"default":[], "input": true}),
			/** 
			 * @componentProperty {boolean} ltPropFocus=false
			 * @input
			 */
			ltPropFocus : Lyte.attr("boolean",{"default":false, "input": true}),
			/** 
			 * @componentProperty {array} ltPropAriaAttributes
			 * @default []
			 * @input
			 */
			ltPropAriaAttributes : Lyte.attr("array",{"default":_lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'ariaAttributes', [] ), "input": true}),
			/** 
			 * @componentProperty {boolean} ltPropYield=false
			 * @input
			 */
			ltPropYield : Lyte.attr("boolean",{"default":false, "input": true}),
			/** 
			 * @componentProperty {boolean} ltPropPreventFocus=false
			 * @input
			 */
			ltPropPreventFocus : Lyte.attr("boolean",{"default":false, "input": true}),
			/** 
			 * @componentProperty {boolean} ltPropReadOnly=false
			 * @input
			 */
			ltPropReadOnly : Lyte.attr("boolean",{"default":false, "input": true}),
			/** 
			 * @componentProperty {string} ltPropRadioBtnClass=''
			 * @input
			 */
			ltPropRadioBtnClass : Lyte.attr("string",{"default":_lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'radioBtnClass', '' ), "input": true}),
			/** 
			 * @componentProperty {string} ltPropSelectedValue=""
			 * @input
			 * @output
			 */
			ltPropSelectedValue : Lyte.attr("string",{"default":"", "input": true, "output": true}),
			/** 
			 * @componentProperty {string} ltPropSelectedValue=""
			 * @input
			 */
			ltPropSelectedClass : Lyte.attr("string",{"default":"", "input": true}),

			ltPropKeyboardNavigation : Lyte.attr("boolean",{"default":true}),
			ltPropId : Lyte.attr("string",{ "input": true}),
			prevSelectedValue : Lyte.attr("object",{"default":{}}),//used to store previous selected value
			preventFocusSet : Lyte.attr("boolean",{"default":false}),
			selThroScript: Lyte.attr("boolean", { "default": false }),
			/**
			 * @componentProperty {string} ltPropLegend=""
			 * @input
			 */
			ltPropLegend: Lyte.attr('string', { 'default': '', 'input': true }),
			/**
			 * @componentProperty {string} ltPropLegendClass=""
			 * @input
			 */
			ltPropLegendClass: Lyte.attr('string', { 'default': '', 'input': true }),
			//selThroScript is used to prevent the recursive while setting the ltPropSelected through script.

			ltPropTabindex: Lyte.attr( 'string', { 'default': undefined } ),

			ltPropAriaAttributes: Lyte.attr( 'array', { 'default': [] } ),

			ltPropDataTabindex: Lyte.attr( 'string', { 'default': '' } )

		}		
	},
	getAllRadiobuttons : function(){
		//return this.$node.querySelectorAll("lyte-radiobutton");
		return $L("lyte-radiobutton",this.$node);
	},
	getFirstBtn : function(){//need to be tested
		var radiobuttons = this.getAllRadiobuttons();
		for(var iterator=0;iterator<radiobuttons.length;iterator++){
			var radiobutton = radiobuttons[iterator];
			if(!radiobutton.ltProp("disabled")){
				return radiobutton;
			}
		}
	},
	updateDisabledValue :  function(array,value){
		if(array){
			var comp = this;
			array.forEach(function(item){
				var radiobutton = comp.getRadiobuttonFromSystemValue(item);
				if(radiobutton){
					radiobutton.ltProp("disabled",value);
				}
			});
		}
	},
	radiobuttonStateChange : function(radiobutton,value){
		this.setData("selThroScript",true);
		radiobutton.ltProp("checked",value);
		if(this.data.ltPropSelectedClass) {
			var func = value ? "add" : "remove";
			radiobutton.classList[func](this.data.ltPropSelectedClass);
		}
		this.setData("selThroScript",false);
	},
	findSelectedObjectFromOptions : function(selectedValue) {
		var options = this.data.ltPropOptions;
		var systemValue = this.data.ltPropSystemValue;
		for(var index = 0; index < options.length ; index++) {
			var item = options[index];
			if(item[systemValue] === selectedValue) {
				return item;
			}
		}
	},
	getSelectedValueAsString : function(selectedObject) {
		var systemValue = this.data.ltPropSystemValue;
		return  selectedObject ? selectedObject[systemValue] : "";
	},
	init : function() {
		var selectedValue = this.data.ltPropSelectedValue;
		var selected = this.data.ltPropSelected;
		if(selectedValue) {
			var selectedObject = this.findSelectedObjectFromOptions(selectedValue);
			if(selectedObject) {
				this.setData("ltPropSelected", selectedObject);
			}
		}
		else if(selected) {
			this.setData("ltPropSelectedValue", this.getSelectedValueAsString(selected));
		}
	},
	didConnect : function(){
		this.updateDisabledValue(this.getData("ltPropDisabledList"),true);
		this.preventPointerEvent();
		this.$node.updateAriaArray = function(index, value) {
			var ltPropAriaAttributes = this.component.data.ltPropAriaAttributes;
			Lyte.arrayUtils(ltPropAriaAttributes, "replaceAt", index, value)
		};
		if(this.data.ltPropSelectedValue && this.data.ltPropSelectedClass) {
			var selectedRadioButton =  this.getRadiobuttonFromSystemValue(this.data.ltPropSelectedValue);
			selectedRadioButton && selectedRadioButton.classList.add(this.data.ltPropSelectedClass);
		}
	},
	didDestroy : function() {
		delete this.$node.updateAriaArray;
	},
	isNotEmpty : function(object){
		var systemValue = this.getData("ltPropSystemValue");
		if(object && object[systemValue] !=  undefined){
			return true;
		}
		return false;
	},
	getRadiobutton : function(radioButtonvalue){
		var systemValue = this.getData("ltPropSystemValue");
		if(this.isNotEmpty(radioButtonvalue)){
			return $L('[data-value="'+radioButtonvalue[systemValue]+'"]',this.$node)[0];
		} 
	},
	getRadiobuttonFromSystemValue : function(systemValue){
		return $L('[data-value="'+systemValue+'"]',this.$node)[0];
	},
	selectedChanges : function(oldValue,newValue){
		var radiobutton =  this.getRadiobutton(newValue);
		this.setPreviousValue(oldValue);
		if(radiobutton){
			this.radiobuttonStateChange(radiobutton,true);
		}
		else if(!this.isNotEmpty(newValue)){
			var oldRadiobutton = this.getRadiobutton(oldValue);
			if(oldRadiobutton){
				this.radiobuttonStateChange(oldRadiobutton,false);
			}
			this.setPreviousValue(newValue);
			/* if the newValue is empty then we also making prevSelectedValue as empty 
			because if they again select radiobutton by click, there prevSelectedValue will be different.
			basically we are reseting the prevSelectedValue.
			*/
		}
	},
	preventPointerEvent : function() {
		var radioBtnGrp = this.$node;
		if(this.data.ltPropReadOnly) {
			radioBtnGrp.classList.add('lyteRadioBtnGroupReadOnly');
		}
		else {
			radioBtnGrp.classList.remove('lyteRadioBtnGroupReadOnly');
		}
	},
	getCurrentBtn : function() {
		var selectedValue = this.data.ltPropSelectedValue;
		if(selectedValue) {
			var radioBtn = this.getRadiobuttonFromSystemValue(selectedValue);
			if(radioBtn) {
				return radioBtn;
			}
		}
		return this.getFirstBtn();
	},
	selectedObserver : function(changes){
		if(this.getData("selThroScript")){
			return;
		}
		var newValue = changes.newValue;
		this.selectedChanges(changes.oldValue, newValue);
		this.fromObserver = true;
		this.setData("ltPropSelectedValue", this.getSelectedValueAsString(newValue));
		this.fromObserver = false;
	}.observes("ltPropSelected"),
	selectedValueObserver : function(changes){
		if(this.getData("selThroScript") || this.fromObserver){
			return;
		}
		var selectedObject = this.findSelectedObjectFromOptions(changes.newValue);
		this.setData("ltPropSelected", selectedObject);
	}.observes("ltPropSelectedValue"),
	disabledValueObserver : function(changes){// need to be tested
		this.updateDisabledValue(changes.oldValue,false);
		this.updateDisabledValue(changes.newValue,true);
	}.observes('ltPropDisabledList'),
	focusObserver : function(){
		var focus = this.getData("ltPropFocus");
		if(focus){
			this.getFirstBtn().focus();
		}
		this.setData("ltPropFocus",false);
	}.observes("ltPropFocus").on('didConnect'),
	readOnlyObserver : function() {
		this.preventPointerEvent();
	}.observes('ltPropReadOnly'),
	getPreviousValue : function(bypass){
		if(this.getData("selThroScript") || !bypass){
			/* Here if the selThroScript is true then the prevSelectedValue is setted 
			through selectedObserver so we can use current prevSelectedValue
			if bypass is true, the prevSelectedValue is not yet set and 
			considering the ltPropSelcted as previous value.
			In all cases,if the selThroScript is true then the value is setted and
			we can get the currentValues of prevSelectedValue and ltPropSelected respectively.
			*/
			return this.getData("prevSelectedValue");
		}
		return this.getSelectedValue();
	},
	setPreviousValue : function(value){
		if(value){
			this.setData("prevSelectedValue",value);
		}
		else if(!this.getData("selThroScript")){
			//Here if selThroScript is false, we setting current ltPropSelected as prevSelectedValue.
			//This will be done before updating the current selected value.
			this.setData("prevSelectedValue",this.getSelectedValue());
		}
	},
	getSelectedValue : function(radiobutton){
		if(this.getData("selThroScript") || !radiobutton){
			return this.getData("ltPropSelected");
		}
		return this.getCurrentSelectedValue(radiobutton);
	},
	setSelectedValue : function(radiobutton){
		if(!this.getData("selThroScript")){
			var oldValue = this.getData("ltPropSelected");
			var newValue = this.getCurrentSelectedValue(radiobutton);
			var systemValue = this.data.ltPropSystemValue;
			if(!oldValue || oldValue[systemValue] != newValue[systemValue]){
				//Above check is used to prevent the from setting the value in ltPropOnInit
				this.setData("selThroScript",true);
				this.setData("ltPropSelected",this.getCurrentSelectedValue(radiobutton));
				this.setData("ltPropSelectedValue", newValue[systemValue]);
				this.setData("selThroScript",false);
			}
		}
	},
	getCurrentSelectedValue : function(radiobutton){
		var options = this.getData("ltPropOptions");
		var index  = radiobutton.getAttribute("index");
		return options[index];
	},
	rollbackSelectedValue : function(){
		if(this.getData("selThroScript")){
			this.setData("ltPropSelected",this.getPreviousValue());
		}
	},
	methods : {
		rdbBeforeUnchecked : function( input, component, userAction){
			var previousValue = this.getPreviousValue(true);
			var prevRadiobutton = this.getRadiobutton(previousValue);
			if(this.getMethods('onBeforeUnchecked')){
				/**
				 * This method will be executed before the lyte-radiobutton is being unchecked.
				 * @method onBeforeUnchecked
				 * @author varun.a@zohocorp.com
				 * @param { object } component
				 * @param { object } uncheckedValue
				 * @param { object } uncheckedRadiobutton
				 * @param { string } userAction
				 */
				if(this.executeMethod('onBeforeUnchecked', this, previousValue, prevRadiobutton, userAction) === false){
					this.rollbackSelectedValue();
					return false;
				}
			}
		},
		rdbUnchecked : function( input, component, userAction){
			this.setPreviousValue();
			var previousValue = this.getPreviousValue();
			var prevRadiobutton = this.getRadiobutton(previousValue);
			if(this.getMethods('onUnchecked')){
				/**
				 * This method will be executed when the lyte-radiobutton is unchecked.
				 * @method onUnchecked
				 * @author varun.a@zohocorp.com
				 * @param { object } component
				 * @param { object } uncheckedValue
				 * @param { object } uncheckedRadiobutton	
				 * @param { string } userAction
				 */
				this.executeMethod('onUnchecked', this, previousValue, prevRadiobutton, userAction);
			}
		},
		rdbBeforeChecked : function( input, component, userAction){
			if(this.getMethods('onBeforeChecked')){
				/**
				 * This method will be executed before the lyte-radiobutton is being checked.
				 * @method onBeforeChecked
				 * @author varun.a@zohocorp.com
				 * @param { object } component
				 * @param { object } checkedValue
				 * @param { object } checkedRadiobutton
				 * @param { string } userAction
				 */
			 	if(this.executeMethod('onBeforeChecked', this, this.getSelectedValue(component.$node), component.$node, userAction) === false){
					this.rollbackSelectedValue();
					return false;
				}
			}
		},
		rdbChecked : function( input, component, userAction){
			var radiobutton = component.$node;
			this.setSelectedValue(radiobutton);
			if(this.getMethods('onChecked')){
				/**
				 * This method will be executed when the lyte-radiobutton is checked.
				 * @method onChecked
				 * @author varun.a@zohocorp.com
				 * @param { object } component
				 * @param { object } checkedValue
				 * @param { object } checkedRadiobutton
				 * @param { string } userAction
				 */
				this.executeMethod('onChecked', this, this.getSelectedValue(), radiobutton, userAction);
			}
		},
		rdbChanged : function( input, component, userAction){
			var prevSelectedValue = this.getPreviousValue(),
			curSelectedValue =  this.getSelectedValue(),
			prevRadiobutton = this.getRadiobutton(prevSelectedValue),
			curRadioButton =  this.getRadiobutton(curSelectedValue);
			if(this.data.ltPropSelectedClass) {
				prevRadiobutton && prevRadiobutton.classList.remove(this.data.ltPropSelectedClass);
				curRadioButton && curRadioButton.classList.add(this.data.ltPropSelectedClass);
			}
			if(this.getMethods('onChanged')){
				/**
				 * This method will be executed when the lyte-radiobutton is checked.
				 * @method onChanged
				 * @author varun.a@zohocorp.com
				 * @param { object } component
				 * @param { object } uncheckedValue
				 * @param { object } checkedValue
				 * @param { object } uncheckedRadiobutton
				 * @param { object } checkedRadiobutton
				 * @param { string } userAction
				 */
				this.executeMethod('onChanged', this, prevSelectedValue, curSelectedValue, prevRadiobutton, curRadioButton, userAction);
			}
		}
	}
});
//TODO: window._lyteUiUtils.escape() check.
/**
 * @syntax nonYielded
 * <lyte-radiobutton-group lt-prop-user-value="name" lt-prop-system-value="value"  
 * lt-prop-name="group-1" lt-prop-options='[{"name": "IOS","value": "apple"},{"name": "Android","value": "google"},{"name": "Window","value": "mircosoft"}]'>
 * </lyte-radiobutton-group>
 */

/**
 * @syntax yielded
 * <lyte-radiobutton-group  lt-prop-user-value="name" lt-prop-system-value="value"
 * lt-prop-name="group-1" lt-prop-options='[{"name": "IOS","value": "apple"},{"name": "Android","value": "google"},{"name": "Window","value": "mircosoft"}]'>
 *     <template is="registerYield" yield-name="yield">
 *        <span>{{ltItem.name}}</span>
 *     </template>
 * </lyte-radiobutto-group>
 */