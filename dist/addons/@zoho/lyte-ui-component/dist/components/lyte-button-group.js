/**
 * Renders a button-group
 * @dependency lyte-grouper,lyte-button
 * @component lyte-button-group
 * @version 3.1.0
 * @import lyte-grouper
 * @ignoreProperties ltPropAlignment,ltPropAppearance,ltPropWidth,ltPropSelectedClass
 */
/**
 * @domEvents focusin, focusout
 */
Lyte.Component.register("lyte-button-group", {
_template:"<template tag-name=\"lyte-button-group\" style=\"width:{{ltPropWidth}}\" onclick=\"{{action('click',event)}}\" aria-labelledby=\"{{randomAriaId}}\" lyte-button-group=\"\"> <lyte-grouper lt-prop-alignment=\"{{ltPropAlignment}}\" lt-prop-appearance=\"{{ltPropAppearance}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" class=\"lyteBtnGroupWrap\"> </lyte-yield> </template> </lyte-grouper> <template is=\"if\" value=\"{{ltPropAria}}\"><template case=\"true\"><span id=\"{{randomAriaId}}\" style=\"display: none;\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'===','radiobutton')}}\"><template case=\"true\"> {{expHandlers(ltPropSelected,'?:',concat(lyteUiI18n('Selected'),\" : \",ltPropSelected),lyteUiI18n(\"lyte.listview.filter.not.selected\"))}} </template><template case=\"false\"> {{expHandlers(expHandlers(ltPropSelectedValues,'&amp;&amp;',ltPropSelectedValues.length),'?:',concat(lyteUiI18n('Selected'),\" : \",ltPropSelectedValues),lyteUiI18n(\"lyte.listview.filter.not.selected\"))}} </template></template> </span></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","ltPropWidth"]}}}},
_observedAttributes :["ltPropType","ltPropAlignment","ltPropAppearance","ltPropSelectedValues","ltPropSelected","ltPropSelectedClass","ltPropWidth","ltPropFireOnInit","ltPropAria","ltPropAriaAttributes","ltPropAllowUnselect","preventSelect","randomAriaId","commonAriaLabel"],
_observedAttributesType :["string","string","string","array","string","string","string","boolean","boolean","object","boolean","boolean","string","object"],

	data : function(){
		return {
			/** 
			 * @componentProperty {checkbox | radiobutton} ltPropType=checkbox
			 * @input
			 */
			ltPropType : Lyte.attr("string",{"default" : "checkbox", input : true}),
			/** 
			 * @componentProperty {Horizontal | Vertical} ltPropAlignment=Horizontal
			 * @input
			 */
			ltPropAlignment : Lyte.attr("string", {
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'alignment', "Horizontal" ),
				input : true
			}),
			/** 
			 * @componentProperty {fill | line | custom} ltPropAppearance=line
			 * @input
			 */
			ltPropAppearance : Lyte.attr("string",{
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'appearance', "line" ),
				input : true
			}),
			/** 
			 * @componentProperty {array} ltPropSelectedValues
			 * @default []
			 * @condition ltPropType checkbox
			 * @input
			 * @output
			 */
			ltPropSelectedValues : Lyte.attr("array",{"default" : [], input : true, output : true}),
			/** 
			 * @componentProperty {string} ltPropSelected=""
			 * @condition ltPropType radiobutton
			 * @input
			 * @output
			 */
			ltPropSelected : Lyte.attr("string",{"default" : "", input : true, output : true}),
			/** 
			 * @componentProperty {string} ltPropSelectedClass=lyteBtnGroupSelectedBtn
			 * @input
			 */
			ltPropSelectedClass : Lyte.attr("string",{
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'selectedClass', "lyteBtnGroupSelectedBtn" ),
				input : true
			}),
			/** 
			 * @componentProperty {string} ltPropWidth=auto
			 * @default auto
			 * @input
			 */
			ltPropWidth : Lyte.attr("string",{"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'width', "auto" ), input : true}),
			/** 
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 * @input
			 */
			ltPropFireOnInit : Lyte.attr("boolean",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'fireOnInit', false ),
				"input": true
			}),
			ltPropAria : Lyte.attr("boolean",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'aria', false ),
				"input": true
			}),
			ltPropAriaAttributes : Lyte.attr("object",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'ariaAttributes', {} ),
				"input": true
			}),
			ltPropAllowUnselect : Lyte.attr("boolean", {"default" : false}),
			preventSelect : Lyte.attr("boolean",{"default" : false}),
			randomAriaId : Lyte.attr("string",{"default" : ""}),
			commonAriaLabel : Lyte.attr("object",{"default": {}})
		}		
	},
	isRadioButton : function(){
		if(this.data.ltPropType === "radiobutton"){
			return true;
		}
	},
	isCheckbox : function(){
		if(this.data.ltPropType === "checkbox"){
			return true;
		}
	},
	didConnect : function(){
		if(this.data.ltPropFireOnInit){
			this.setupButtons(); //ForCallbacks
		}
		else{
			if(this.isRadioButton()){
				this.updateButtons([],[this.data.ltPropSelected]);
			}
			else if(this.isCheckbox()){
				this.updateButtons([],this.data.ltPropSelectedValues);
			}
		}
	},
	updateButtons: function(oldValue,newValue){
		var oldButton = this.getSelectedButtons(oldValue),
		newButton =  this.getSelectedButtons(newValue);
		if(oldButton.length > 0){
			this.removeClass(oldButton);
		}
		if(newButton.length > 0){
			this.addClass(newButton);
		}
	},
	setupButtons : function(){
		var type =  this.data.ltPropType;
		if(type === "radiobutton" && this.data.ltPropSelected){
			this.changeRadiobutton("",this.data.ltPropSelected);
		}
		else if(type === "checkbox" && this.data.ltPropSelectedValues.length > 0){
			this.selectCheckbox(this.data.ltPropSelectedValues, void 0);
		}
	},
	setSelectedValue : function(dataName,value){
		this.setData("preventSelect",true);
		this.setData(dataName,value);
		this.setData("preventSelect",false);
	},
	changeCheckbox : function(oldArray,newArray,oldValue,index,event){
		var	unselectedButtons = this.getSelectedButtons(oldArray),
		selectedButtons =  this.getSelectedButtons(newArray),
		oldButtons =  this.getSelectedButtons(oldValue),
		newButtons = oldButtons.slice();
		if(oldArray.length > 0){
			if(this.onBeforeUnselected(oldArray,unselectedButtons,event)){
				return;
			}
			this.removeClass(unselectedButtons);
			Lyte.arrayUtils(this.getData("ltPropSelectedValues"),"removeAt", index ,1);
			newButtons.splice(index,1);
			this.onUnselected(oldArray,unselectedButtons,event);
		}
		if(newArray.length > 0){
			if(this.onBeforeSelected(newArray,selectedButtons,event)){
				this.setSelectedValue("ltPropSelectedValues",oldValue);
				return;
			}
			this.addClass(selectedButtons);
			Lyte.arrayUtils(this.getData("ltPropSelectedValues"),"push",newArray[0]);
			newButtons.push(selectedButtons[0]);
			this.onSelected(newArray,selectedButtons,event);
		}
		this.onChanged(oldValue,this.data.ltPropSelectedValues, oldButtons,newButtons);
	},
	selectCheckbox : function(newValue, event){
		var newButtons = this.getSelectedButtons(newValue);
		if(newValue.length > 0){
			if(this.onBeforeSelected(newValue,newButtons,event)){
				this.setSelectedValue("ltPropSelectedValues",[]);
				return;
			}
			this.addClass(newButtons);
			this.onSelected(newValue,newButtons,event);
		}
		this.onChanged([], newValue,[],newButtons);
	},
	changeRadiobutton : function(oldValue,newValue,event){
		var oldButton = this.getSelectedButton( oldValue ),
		newButton = this.getSelectedButton( newValue );
		if(oldButton && this.onBeforeUnselected(oldValue,oldButton,event)){
			this.setSelectedValue("ltPropSelected",oldValue);
			return;
		}
		if(newButton && this.onBeforeSelected(newValue,newButton,event)){
			this.setSelectedValue("ltPropSelected",oldValue);
			return;
		}
		if(oldButton){
			this.removeClass([oldButton]);
			this.onUnselected(oldValue,oldButton,event);
		}
		if(newButton){
			this.addClass([newButton]);
			if(event){
				this.setSelectedValue("ltPropSelected",newValue);
			}
			this.onSelected(newValue,newButton,event);
		}
		this.onChanged( oldValue, newValue, oldButton, newButton);
	},
	onBeforeSelected: function( values, buttons, event ) {
		if( this.getMethods( 'onBeforeSelect' ) ) {
			/**
			 * This callback is fired  before button get selected.
			 * @method onBeforeSelect
			 * @author varun.a@zohocorp.com
			 * @param { string | array } lyteButtonValue
			 * @param { object | array } lyteButton
			 * @param { object } event
			 */
			if(this.executeMethod( 'onBeforeSelect', values, buttons,event ) === false){
				return true;
			}
		}
	},
	onSelected : function(values, buttons, event){
		if( this.getMethods( 'onSelect' ) ) {
			/**
			 * This callback is fired when the button get selected.
			 * @method onSelect
			 * @author varun.a@zohocorp.com
			 * @param { string | array } lyteButtonValue
			 * @param { object | array } lyteButton
			 * @param { object } event
			 */
			this.executeMethod( 'onSelect',values, buttons, event );
		}
	},
	onBeforeUnselected: function( values, buttons, event ) {
		if( this.getMethods( 'onBeforeUnselect' ) ) {
			/**
			 * This callback is fired  before button get unselected.
			 * @method onBeforeUnselect
			 * @author varun.a@zohocorp.com
			 * @param { string | array } lyteButtonValue
			 * @param { object | array } lyteButton
			 * @param { object } event
			 */
			if(this.executeMethod( 'onBeforeUnselect', values, buttons,event ) === false){
				return true;
			}
		}
	},
	onUnselected : function(values, buttons, event){
		if( this.getMethods( 'onUnselect' ) ) {
			/**
			 * This callback is fired when the button get unselected.
			 * @method onUnselect
			 * @author varun.a@zohocorp.com
			 * @param { string | array } lyteButtonValue
			 * @param { object | array } lyteButton
			 * @param { object } event
			 */
			this.executeMethod( 'onUnselect',values, buttons, event );
		}
	},
	onChanged: function(oldValue, newValue, prevLyteButtons,currentLyteButtons) {
		if( this.getMethods( 'onChanged' ) ) {
			/**
			 * This will be executed when the state(selected or unselected) of the lyte-button-group is changed.
			 * @method onChanged
			 * @author ananthapadmanaban.n@zohocorp.com
			 * @param { string | array } oldValue
			 * @param { string | array } newValue
			 * @param { object | array } previouslySelectedLyteButton
			 * @param { object | array } currentlySelectedLyteButton
			 */
			this.executeMethod( 'onChanged',oldValue, newValue, prevLyteButtons, currentLyteButtons);
		}
	},
	getSelectedButtons : function(arr){ // this for array
		var array = [];
		for(var index=0;index<arr.length;index++){
			if(arr[index]){
				var button = this.$node.querySelector("[lt-prop-value ='"+_lyteUiUtils.escape(arr[index])+"']");
				if(button){
					array.push(button);
				}
			}
		}
		return array;
	},
	getSelectedButton : function(value){
		if(value){
			var button = this.$node.querySelector("[lt-prop-value ='"+_lyteUiUtils.escape(value)+"']");
			return button;
		}
	},
	removeClass: function(nodes){
		var className =  this.data.ltPropSelectedClass;
		var aria = this.data.ltPropAria;
		if(className){
			nodes.forEach(function(node){
				var curClass = node.ltProp("class");
				var curPart = node.ltProp("part");
				curClass = curClass.replace(className, "");
				node.ltProp("class", curClass);
				curPart = curPart.replace("lyteBtnGroupSelectedBtn", "");
				node.ltProp("part", curPart);
				if(aria) {
					var curAria = node.ltProp("ariaButton") || {};
					curAria['aria-pressed'] = "false";
					node.ltProp("ariaButton", Object.assign({},curAria));
				}
			});
		}
	},
	addClass: function(nodes){
		var className =  this.data.ltPropSelectedClass;
		var aria = this.data.ltPropAria;
		if(className){
			nodes.forEach(function(node){
				var curClass = node.ltProp("class") || "";
				var curPart = node.ltProp("part") || "";
				if(curClass.split(" ").indexOf(className) === -1){
					curClass = curClass+ " "+className;
					node.ltProp("class", curClass);
					if(!curPart.includes("lyte-button")){
						curPart = curPart + " lyte-button";
					}
					curPart = curPart+" lyteBtnGroupSelectedBtn";
					node.ltProp("part", curPart);
					if(aria) {
						var curAria = node.ltProp("ariaButton") || {};
						curAria['aria-pressed'] = "true";
						node.ltProp("ariaButton", Object.assign({}, curAria));
					}
				}
			});
		}
	},
	handleBtnOldandNewValue : function(oldArr = [],newArr = []){
		var oldArray=[],newArray=[];
		if(oldArr.length){
			for(var index=0;index<oldArr.length;index++){
				var temp = oldArr[index];
				if(newArr.indexOf(temp)<0){
					oldArray.push(temp);
				}
			}
		}
		else{
			oldArray = oldArr;
		}
		if(newArr.length){
			for(var index=0;index<newArr.length;index++){
				var temp = newArr[index];
				if(oldArr.indexOf(temp)<0){
					newArray.push(temp);
				}
			}
		}
		else{
			newArray =  newArr;
		}
		return {newValue:newArray,oldValue:oldArray}
	},
	addAriaValues : function(newAria) {
		var oldAria = this.data.commonAriaLabel;
		var btnGrp = this.$node;
		var defaultAria = {};
		if(this.data.ltPropType === "radiobutton"){
			defaultAria.role = "radiogroup";
		}
		else if(this.data.ltPropType === "checkbox"){
			defaultAria.role = "group";
		}
		newAria =  Object.assign(defaultAria, newAria);
		_lyteUiUtils.setAttribute( btnGrp, newAria, oldAria );
		this.setData("commonAriaLabel",newAria);
	},
	selectedObserver : function(change){
		if(this.data.preventSelect){
			return;
		}
		if(this.isRadioButton()){
			this.updateButtons([change.oldValue],[change.newValue]);
		}
	}.observes('ltPropSelected'),
	selectedValuesObserver  : function(change){
		if(this.data.preventSelect){
			return;
		}
		if(this.isCheckbox()){
			var obj = this.handleBtnOldandNewValue(change.oldValue,change.newValue);
			this.updateButtons(obj.oldValue,obj.newValue);
		}
	}.observes('ltPropSelectedValues'),
	classChange : function(change){
		var oldClass = change.oldValue;
		if(oldClass){
			var nodes = this.isCheckbox() ? this.getSelectedButtons(this.data.ltPropSelectedValues) : 
			this.getSelectedButtons([this.data.ltPropSelected]);
			var newClass = change.newValue || "";
			nodes.forEach(function(node){
				var curClass = node.ltProp("class");
				curClass = curClass.replace(oldClass, newClass);			
				node.ltProp("class", curClass);
			});
		}
	}.observes("ltPropSelectedClass"),
	ariaObserver: function( change ) {
		if(this.data.ltPropAria) {
			var newAria = this.data.ltPropAriaAttributes;
			if(!change) {
				this.setData("randomAriaId", "lyteBtnGrp" + new Date().getTime() + parseInt( Math.random() * 10E10 ));
			}
			this.addAriaValues( newAria );
		}
	}.observes( 'ltPropAriaAttributes.*' ).on('didConnect'),
	actions : {
		click : function(event) {
			var target = event.target,lyteButton = $L(target).closest('lyte-button',this.$node)[0];
			if(lyteButton && lyteButton.contains(target)){
				var type = this.data.ltPropType,selected,
				value =  lyteButton.getAttribute("lt-prop-value");
				if(type == "checkbox"){
					selected = this.data.ltPropSelectedValues.slice();
					var index = selected.indexOf(value);
					if(index > -1){
						this.changeCheckbox([value],[],selected,index,event);
					}
					else{
						this.changeCheckbox([],[value],selected,undefined,event);
					}
				}
				else if(type == "radiobutton"){
					selected = this.data.ltPropSelected;
					if(selected != value){
						this.changeRadiobutton(selected,value,event);
					}
					else if(this.data.ltPropAllowUnselect) {
						this.changeRadiobutton(selected, "",event);
						this.setSelectedValue("ltPropSelected", "");
					}
				}
			}
		}
	}
}); 
/**
 * @syntax yielded 
 *	<lyte-button-group>
 * 		<template is='registerYield' yield-name='yield'> 
 *	  		<lyte-button lt-prop-value='button1'> 
 *	  	  		<template is='registerYield' yield-name='text'> 
 *	  	  	  		Button1 
 *	  	  	  	</template> 
 *	  	  	</lyte-button> 
 *	  	  	<lyte-button lt-prop-value='button2'> 
 *	  	  		<template is='registerYield' yield-name='text'> 
 *	  	  	  		Button2 
 *	  	  	  	</template> 
 *	  	  	</lyte-button> 
 *	  	</template> 
 *	</lyte-button-group>
 */