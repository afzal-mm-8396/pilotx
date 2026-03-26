Lyte.Component.register("crux-smart-filter-crossfields", {
_template:"<template tag-name=\"crux-smart-filter-crossfields\"> <template is=\"if\" value=\"{{expHandlers(cxPropChildFields.length,'>',0)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-smart-filter-crossfields.html\",\"Feb Default Changes\")}} <crux-smart-filter cx-prop-user-field-properties=\"{{cxPropUserFieldProperties}}\" cx-prop-fields=\"{{lbind(cxPropChildFields)}}\" cx-prop-class=\"cxSmFrCrossFldFilterList\" id=\"customFilter_{{cxPropModuleField.api_name}}\" cx-prop-child-module-fields=\"true\" cx-prop-child-module-relation=\"{{cxPropModuleField.api_name}}\" cx-prop-child-module-display-label=\"{{cxPropModuleField.field_label}}\" on-value-change=\"{{method('onChildValueChange')}}\" on-field-change=\"{{method('onChildFieldChanged')}}\" cx-prop-module-display-field=\"{{cxPropModuleDisplayField}}\" cx-prop-child-selected-field-count=\"{{selectedFieldCount}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-child-module-name=\"{{cxPropModuleField.moduleName}}\" class=\"childCruxFilter\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\" cx-prop-is-special-fields=\"false\"> </crux-smart-filter> </template></template> <div lt-prop-title=\"{{if(disableFieldAddition,cxPropChildFieldLimitTooltip,'')}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;bottom&quot; , &quot;appearance&quot; : &quot;box&quot; , &quot;showdelay&quot; : 1000 , &quot;maxdisplaytime&quot; : 5000 } \"> <div data-zcqa=\"addField_{{cxPropModuleField.field_label}}\" onclick=\"{{action('onAddField')}}\" class=\"cxSmFrCrossFldDropdownWrap cxSmFilterCrossFieldDropBtn {{if(disableFieldAddition,'eventNone disable',)}}\"> <span class=\"cxSmFrCrFieldBtnText mL25\"> <lyte-text lt-prop-value=\"{{cruxGetI18n('crm.button.add')}} {{cruxGetI18n('crm.label.field')}}\"> </lyte-text> </span> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]}],
_observedAttributes :["cxPropModuleField","cxPropChildFields","selectedFieldCount","showLoader","disableFieldAddition","cxPropChildFieldLimit","cxPropBoundary","cxPropChildFieldLimitTooltip","cxPropModuleDisplayField","cxPropUserFieldProperties"],
_observedAttributesType :["object","array","number","boolean","boolean","number","object","string","object","object"],
//no i18n
	data : function(){
	    return {
	      cxPropModuleField :  Lyte.attr("object" , { default : {} }),//No I18n
	      cxPropChildFields : Lyte.attr("array", {default : []}),//no i18n
		  selectedFieldCount : Lyte.attr("number", {default : 0}), // NO I18N
		  showLoader:Lyte.attr("boolean",{default : false}),//No I18n
	      disableFieldAddition : Lyte.attr("boolean",{default : false}),//No I18n
	      cxPropChildFieldLimit : Lyte.attr("number"), // NO I18N
		  cxPropBoundary : Lyte.attr("object", { default : {} }),//no i18n
	      cxPropChildFieldLimitTooltip : Lyte.attr("string",{default : ""}),//no i18n
		  cxPropModuleDisplayField: Lyte.attr("object", {default : {}}),//no i18n
		  cxPropUserFieldProperties : Lyte.attr("object", {default : {}}) //no i18n
		}
	  },
	  
	  init : function(){
			if(this.data.cxPropChildFields.length === 0){
				this.setData("showLoader",true);
			} else {
				this.setDropDownFields(); 
			}
	  },
	  showDropDownFields : function(){
			if(this.data.showLoader) {
				this.setData("showLoader",false);
				this.setDropDownFields();
			}
	  }.observes('cxPropChildFields'),//No I18n

	  
	  setDropDownFields: function(){
			var childFields = Lyte.deepCopyObject(this.getData("cxPropChildFields"));
			for(var i=0;i<childFields.length;i++){
				childFields[i].cxHide = true;
				childFields[i].showDummyInput = false;
			}
			this.setData("cxPropChildFields",childFields); //NO I18n  
			if( this.data.cxPropChildFields.length < this.data.cxPropChildFieldLimit){
				this.setData("cxPropChildFieldLimitTooltip",I18n.getMsg('crm.smart.filter.child.fields.limit2'));
			}
	  },

		updateFieldsOnRemove : function(){
			this.setData("selectedFieldCount", this.data.selectedFieldCount - 1 );
			if(this.data.selectedFieldCount < this.data.cxPropChildFieldLimit){
				this.setData("disableFieldAddition",false);
			}
		},
		
        incrementSelectedFieldCount :function(){
        	this.setData("selectedFieldCount", this.data.selectedFieldCount + 1 );
			if((this.data.selectedFieldCount >= this.data.cxPropChildFieldLimit) || (this.data.selectedFieldCount >= this.data.cxPropChildFields.length)){
				this.setData("disableFieldAddition",true);
			}
        },
		onAddingFields : function(){
            if(this.data.disableFieldAddition){
				return;
			 }
			 var api_name = this.getData("cxPropModuleField").api_name;
			 var id = "#customFilter_"+api_name;
			 var cruxSmartFilComp = this.$node.querySelector(id);
			 var allFields = cruxSmartFilComp.getData("allFields"); //No I18n
			 var appliedFields = cruxSmartFilComp.getData("appliedFields"); //No I18n
			 var totalFields = appliedFields.concat(allFields);
			 var lastEmptyIndex = -1;
			 for(var i=totalFields.length -1;i>=0;i--) {
				 
				 if(totalFields[i].cxHide === false){
					 lastEmptyIndex = i;
					 break;
				 }
			 }
			 //handling for corner cases where arrayoutofbound index occurs
			 if(lastEmptyIndex+1 === totalFields.length){
				var fieldsMovedLast = [];
				for( i=0;i<appliedFields.length;i++){
				   if(appliedFields[i].cxHide === true){
					   fieldsMovedLast.push(appliedFields[i]);
					   Lyte.arrayUtils( appliedFields , 'removeAt' , i , 1 );
				   }
				}
				for( i=0;i<allFields.length;i++){
				   if(allFields[i].cxHide === true){
					   fieldsMovedLast.push(allFields[i]);
					   Lyte.arrayUtils( allFields , 'removeAt' , i , 1 );
				   }
				}
				if(fieldsMovedLast.length === 0){
					return;
				}
				Lyte.arrayUtils( allFields , 'push' , fieldsMovedLast);
				this.onAddingFields();
			 }
			 Lyte.Component.set(totalFields[lastEmptyIndex+1], {"cxHide" : false});//no i18n
			 Lyte.Component.set(totalFields[lastEmptyIndex+1], {"showDummyInput" : true});//no i18n
			 this.setData("selectedFieldCount", this.data.selectedFieldCount + 1 );
			 if((this.data.selectedFieldCount >= this.data.cxPropChildFieldLimit) || (this.data.selectedFieldCount >= this.data.cxPropChildFields.length)){
				 this.setData("disableFieldAddition",true);
			 }
			 var dropDownid = "#customFilter_DropDown_customFilter_"+api_name+"_"+totalFields[lastEmptyIndex+1].id; //no i18n
			 this.$node.querySelector(dropDownid).open();
			 if( this.getMethods("onFieldChange")){
				var checkedFields = [totalFields[lastEmptyIndex+1]];
                var field = {},_event= {};
				field.checked = true;
				_event.type = 'click';
				this.executeMethod("onFieldChange", checkedFields,field,_event,totalFields[lastEmptyIndex+1]);//No I18n
			}
		},
	 
		actions :{
			onAddField : function(){
				this.onAddingFields();
			}
	    },

	  methods : {
	     
		  onChildValueChange : function(arg){
				if( this.getMethods("onValueChange")){
					this.executeMethod("onValueChange", arg);//No I18n
				}
			},
			
			onChildFieldChanged : function(checkedFields,field,event,currentFieldData){
				if( this.getMethods("onFieldChange")){
					this.executeMethod("onFieldChange", checkedFields,field,event,currentFieldData);//No I18n
				}
			},
			setConditionsCallback : function(args)
			{
				if( this.getMethods("setConditions")){
					return this.executeMethod("setConditions", args);//No I18n
				}
				// if(args.field && args.field.data_type && ["text","website"].includes(args.field.field_data_type))
				// {
				// 	var _length = args.condition.length;
				// 	for(var i=0;i<_length;i++){
				// 		if(args.condition[i].system && args.condition[i].system === 'contains'){
				// 			return {conditions : args.condition , selected :'contains'}; //No I18N
				// 		}
				// 	}
				// }
				// else if(args.field && args.field.data_type && ["datetime" , "date" , "date_time"].includes(args.field.field_data_type))
				// {
				// 	var notBtwnObj = {display : I18n.getMsg("not between"), system : "not_between"}, //No I18N
				// 	tillYesObj = {system : "${YESTERDAYMINUS}", display : I18n.getMsg("Till Yesterday")}; //No I18N
				// 	args.condition.splice(6,0,notBtwnObj);
				// 	args.condition.splice(11,0,tillYesObj);
				// 	return args.conditions;
				// }
				// return args.conditions;
			}
	  }
	
});

