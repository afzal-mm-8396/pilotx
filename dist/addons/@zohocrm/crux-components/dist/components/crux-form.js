Lyte.Component.register("crux-form", {
_template:"<template tag-name=\"crux-form\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowButtons,'&amp;&amp;',expHandlers(expHandlers(cxPropButtonPosition,'==','topLeft'),'||',expHandlers(cxPropButtonPosition,'==','topRight')))}}\"><template case=\"true\"> <div class=\"{{if(ifEquals(cxPropButtonPosition,'topRight'),'fR','')}}\"> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"button\" index=\"index\"> <lyte-button lt-prop-class=\"{{button.class}}\" lt-prop-appearance=\"{{button.appearance}}\" onclick=\"{{action('buttonClick',button)}}\" lt-prop-disabled=\"{{button.disable}}\" data-zcqa=\"{{button.cxPropZcqa}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{button.text}} </template> </lyte-button> </template> </div> </template></template> <template is=\"if\" value=\"{{cxPropSections}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropSections}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{item.yieldName}}\"><template case=\"true\"> <lyte-yield tab-index=\"{{lbind(tabIndex)}}\" yield-name=\"body-{{item.yieldName}}\" record-obj=\"{{cxPropRecord}}\" section=\"{{item}}\" class=\"cxForm\"></lyte-yield> </template><template case=\"false\"> <div>{{cxPropSections[cxPropSectionDisplayValue]}}</div> <template is=\"for\" items=\"{{item.fields}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{field.yieldName}}\"><template case=\"true\"> <lyte-yield tab-index=\"{{cruxIncrement('tabIndex')}}\" yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{cxPropRecord}}\" field=\"{{field}}\" class=\"cxForm\"></lyte-yield> </template><template case=\"false\"> <template cx-prop-appearance=\"box\" cx-prop-tab-index=\"{{cruxIncrement('tabIndex')}}\" is=\"component\" cx-prop-module=\"{{module}}\" cx-prop-disable-extra-value=\"{{field.cxPropDisableExtraValue}}\" cx-prop-do-not-skip-first-value=\"{{field.cxPropDoNotSkipFirstValue}}\" on-value-change=\"{{method('valueChange',field.api_name)}}\" cx-prop-field=\"{{field}}\" cx-prop-login-user=\"{{field.cxPropShowLoggedInUser}}\" on-error=\"{{method('onError')}}\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-from=\"create\" cx-prop-value=\"{{cruxFormGetValue(cxPropRecord,field[cxPropFieldSystemValue])}}\" data-zcqa=\"{{field.cxPropZcqa}}\" class=\"cxForm\"></template> </template></template> </template> </template></template> </template> </template></template> <template is=\"if\" value=\"{{cxPropFields}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropFields}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{field.yieldName}}\"><template case=\"true\"> <lyte-yield tab-index=\"{{cruxIncrement('tabIndex')}}\" yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{cxPropRecord}}\" field-obj=\"{{field}}\" class=\"cxForm\"></lyte-yield> </template><template case=\"false\"> <template id=\"cxForm_{{field.api_name}}\" cx-prop-appearance=\"box\" cx-prop-field-key=\"{{cxPropFieldDisplayValue}}\" cx-prop-tab-index=\"{{cruxIncrement('tabIndex')}}\" is=\"component\" cx-prop-module=\"{{module}}\" cx-prop-disable-extra-value=\"{{field.cxPropDisableExtraValue}}\" cx-prop-do-not-skip-first-value=\"{{field.cxPropDoNotSkipFirstValue}}\" on-value-change=\"{{method('valueChange',this,field.api_name)}}\" cx-prop-field=\"{{field}}\" cx-prop-login-user=\"{{field.cxPropShowLoggedInUser}}\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-from=\"create\" cx-prop-value=\"{{cruxFormGetValue(cxPropRecord,field[cxPropFieldSystemValue])}}\" data-zcqa=\"{{field.cxPropZcqa}}\" cx-prop-disabled=\"{{field[cxPropFieldReadonlyProperty]}}\" class=\"cxForm\"></template> </template></template> </template> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropShowButtons,'&amp;&amp;',expHandlers(expHandlers(cxPropButtonPosition,'==','bottomLeft'),'||',expHandlers(cxPropButtonPosition,'==','bottomRight')))}}\"><template case=\"true\"> <div class=\"{{if(ifEquals(cxPropButtonPosition,'bottomRight'),'fR','')}}\"> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"button\" index=\"index\"> <lyte-button lt-prop-class=\"{{button.class}}\" lt-prop-appearance=\"{{button.appearance}}\" onclick=\"{{action('buttonClick',button)}}\" lt-prop-disabled=\"{{button.disable}}\" data-zcqa=\"{{button.cxPropZcqa}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{button.text}} </template> </lyte-button> </template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}],
_observedAttributes :["cxPropFields","cxPropSections","cxPropColumnCount","cxPropShowButtons","cxPropButtonPosition","cxPropButtons","cxPropRecord","cxPropSectionDisplayValue","cxPropSectionSystemValue","cxPropFieldSystemValue","cxPropFieldDisplayValue","cxPropModule","tabIndex","cxPropFieldTypeMapping","cxPropFieldReadonlyProperty"],
_observedAttributesType :["array","array","number","boolean","string","array","object","string","string","string","string","string","number","object","string"],
 //no i18n
	data : function(){
		return {
			cxPropFields : Lyte.attr('array'), //no i18n
			cxPropSections : Lyte.attr('array'), //no i18n
			cxPropColumnCount : Lyte.attr('number'), //no i18n
			cxPropShowButtons : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropButtonPosition : Lyte.attr('string',{default : 'bottomLeft'}), //no i18n
			cxPropButtons : Lyte.attr('array',{default : [{text : _cruxUtils.getI18n('crm.button.cancel'), class : '',cxPropZcqa : 'cruxFormCancelBtn',type : 'reject'},{text : _cruxUtils.getI18n('crm.button.save'), class : '',appearance : 'primary',cxPropZcqa : 'cruxFormSaveBtn',type : 'submit'}]}), //no i18n
			cxPropRecord : Lyte.attr('object'), //no i18n
			cxPropSectionDisplayValue : Lyte.attr('string',{default : 'display_label'}), //no i18n
			cxPropSectionSystemValue : Lyte.attr('string',{default : 'api_name'}), //no i18n
			cxPropFieldSystemValue : Lyte.attr('string',{default : 'api_name'}), //no i18n
			cxPropFieldDisplayValue : Lyte.attr('string',{default : 'field_label'}), //no i18n
			cxPropModule : Lyte.attr('string'),//no i18n
			tabIndex : Lyte.attr('number',{default : 0}), //no i18n
			cxPropFieldTypeMapping : Lyte.attr("object"),//no i18n
			cxPropFieldReadonlyProperty : Lyte.attr("string", {default : "read_only"})//No I18n
		}		
	},
	init : function(){
		this.$node.getValue = function(){
			return this.component.getValue();
		}
		this.$node.validate = function(){
			return this.component.validate();
		}
		this.$node.showCustomFieldError = function(){
			this.component.showCustomFieldError();
		}
		this._sectionYeilds={};
		if(this.getMethods("addCustomButtons")){
			this.setData("cxPropButtons", this.executeMethod("addCustomButtons", this.data.cxPropButtons.slice(0)));//no i18n
		}
	},
	modelRegister : function(fields){
		var data={"id" : Lyte.attr('string')}; //no i18n
		for(var i=0;i<fields.length;i++){
			var field = fields[i]
			var type = "string", crux = "text";//no i18n
			if(this.data.cxPropFieldTypeMapping && this.data.cxPropFieldTypeMapping[field.ui_type]){
				crux = this.data.cxPropFieldTypeMapping[field.ui_type];
			}
			switch(crux){
				case 'boolean':
					type = "boolean"; //no i18n
					break;
				case "layout": case "picklist": case "user" : case "role" : case "tag" : 
					type = "array"; //no i18n
					break;
				case "lookup" : 
					type = "object"; //no i18n
					break;
				case "number" : 
					type = "number"; //no i18n
					break;
			}
			field.cxTypeMapping = crux;
			data[field[this.data.cxPropFieldSystemValue]] = Lyte.attr(type,{mandatory : field.required});
		}
		store.registerModel("cruxForm",data); //no i18n
		this.modelCreation();
	},
	modelCreation : function(){
		if(store.modelFor("cruxForm")){
			this._record = store.createRecord('cruxForm',this.data.cxPropRecord,true); //no i18n
		}
	},
	methods : {
		valueChange : function(node,field,value){
			if(this.getMethods('onValueChange')){
				this.executeMethod('onValueChange',value,field); //no i18n
			}
			this._fieldVsNode[field] = node;
		}
	},
	actions : {
		buttonClick : function(button){
			if(button.type == 'submit'){
				if(this.getMethods('onSubmit')){
					this.executeMethod('onSubmit'); //no i18n
				}
				var check = true;
				check = this.validate();
				if(check){
					console.log(this.getValue())
					if(this.getMethods('onSucess')){
						this.executeMethod('onSucess',this.getValue()).then(function(data){ //no i18n
							for(var i in data){
								this.showCustomFieldError(i,data[i]);
							}
						}.bind(this));
					}
				}
			}else if(button.type == "reject"){
				if(this.getMethods('onFailure')){
					this.executeMethod('onFailure'); //no i18n
				}
			}
			else{
				this.executeMethod("onCustomButtonClick", button);//no i18n
			}
		}
	},
	getValue : function(){
		return this._record.$.toJSON();
	},
	validate : function(){
		var nodes = Object.keys(this._fieldVsNode);
		var nodeL = nodes.length;
		for(var i=0;i<nodeL;i++){
			var check = true;
			check = this._fieldVsNode[nodes[i]].component.validate()
			if(!check){
				this._fieldVsNode[nodes[i]].scrollIntoView();
			}
			this._record.$.set(nodes[i],this._fieldVsNode[nodes[i]].component.getValue())
		}
		var sectioKeys = Object.keys(this._sectionYeilds);
		if(sectioKeys.length){
			sectioKeys.forEach(function(item){
				var a = this.executeMethod('getSectionValue',item); //no i18n
				if(!a){
					return false;
				}
				this._record = Object.assign(this._record,a);
			}.bind(this));
			
		}
		this._record.$.validate();
		var recordError = Object.keys(this._record.$.error);
		if(recordError.length){
			for(var i=0;i<recordError.length;i++){
				var node  = this.$node.querySelector('#cxForm_'+recordError[i]);
				node.component.validate();
				if(i == 0){
					node.scrollIntoView();
				}
			}
			return false;
		}
		return true;
	},
	showCustomFieldError : function(api_name,errorMsg){
		var node  = this.$node.querySelector('#cxForm_'+api_name); //no i18n
		node.setData('cxPropErrorMessage',errorMsg); //no i18n
	},
	fieldChangeCallback : function(node,field){
		this._fieldVsNode[field] = node;
	},
	observeFields : function(){
		if(this.data.cxPropFields){
			this.modelRegister(this.data.cxPropFields);
			// this.modelCreation();
		}
		this._fieldVsNode={};
	}.observes('cxPropFields.[]').on('init'), //no i18n
	observeSections : function(){
		if(this.data.cxPropSections){
			var fields=[],count=0;
			this.data.cxPropSections.forEach(function(item){
				if(item.yieldName){
					this._sectionYeilds[item.api_name]={}
					count++;
				}else{
					fields = fields.concat(item.fields);
				}
			}.bind(this));
			this.modelRegister(fields);
			this.modelCreation();
		}else{
			this._sectionYeilds = {};
		}
		this._fieldVsNode={};
	}.observes('cxPropSections.[]').on('init'), //no i18n
	observeRecord : function(){
		this.modelCreation();
	}.observes('cxPropRecord') //no i18n
});

Lyte.Component.registerHelper("cruxFormGetValue", function(record, value){//no i18n
	return record[value];
})
