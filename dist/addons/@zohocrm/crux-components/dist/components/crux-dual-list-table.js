Lyte.Component.register("crux-dual-list-table", {
_template:"<template tag-name=\"crux-dual-list-table\"> <div class=\"cxDualListContainer\"> <div class=\"cxDualListLeftContainer\"> <crux-table-component class=\"cxDualListLeftTable\" cx-prop-header=\"{{cxPropHeader.cxHeader}}\" cx-prop-content=\"{{cxPropContent}}\" cx-prop-express=\"true\" on-body-row-click=\"{{action('rowClick')}}\" cx-prop-suffix-header=\"true\" cx-prop-sticky-table=\"true\" cx-prop-hide-template=\"{{cxPropHideTemplate}}\"> <template is=\"registerYield\" yield-name=\"header-suffix\"> <lyte-exptable-tr colspan=\"3\" class=\"cxSearchContainer\"> <lyte-search lt-prop-placeholder=\"Search Modules\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.lyteExpTableRowGroup&quot;,&quot;search&quot;:&quot;lyte-exptable-tr&quot;,&quot;target&quot;:&quot;lyte-exptable-tr&quot;}\" on-search=\"{{method('moduleSearch')}}\" on-focus=\"{{method('moduleSearchFocus')}}\" on-blur=\"{{method('moduleSearchBlur')}}\" on-clear=\"{{method('moduleSearchClear')}}\" on-after-search=\"{{method('moduleAfterSearch')}}\"></lyte-search> </lyte-exptable-tr> </template> </crux-table-component> </div> <div class=\"cxDualListRightContainer\"> <crux-table-component class=\"cxDualListRightTable\" cx-prop-header=\"{{cxPropHeader.cxSubHeader}}\" cx-prop-content=\"{{cxPropSelected.cxContent}}\" cx-prop-express=\"true\" cx-prop-suffix-header=\"true\" cx-prop-sticky-table=\"true\" cx-prop-full-yield=\"true\" cx-prop-content-search=\"true\" cx-prop-hide-template=\"{{cxPropHideTemplate}}\" cx-prop-search-placeholder=\"Search Fields\" on-before-open=\"{{method('beforeAccordionOpen')}}\" on-before-close=\"{{method('beforeAccordionClose')}}\" on-open=\"{{method('accordionOpen')}}\" on-close=\"{{method('accordionClose')}}\"> <template is=\"registerYield\" yield-name=\"header-checkBoxYield\"> <lyte-checkbox class=\"cxHeaderCheckbox\" on-before-unchecked=\"{{method('beforeHeaderUnchecked')}}\" on-before-checked=\"{{method('beforeHeaderChecked')}}\" on-changed=\"{{method('onHeadChanged')}}\" lt-prop-checked=\"{{ifEquals(selectedCurrentModule.length,fieldsRightPanel.length)}}\"></lyte-checkbox> </template> <template is=\"registerYield\" yield-name=\"body-checkBoxYield\"> <lyte-checkbox class=\"cxBodyCheckbox\" on-before-unchecked=\"{{method('beforeContentUnchecked')}}\" on-before-checked=\"{{method('beforeContentChecked')}}\" on-value-change=\"{{method('onChange')}}\" recordobj=\"{{recordObj}}\" on-changed=\"{{method('onContentChanged')}}\" lt-prop-checked=\"{{checkIncludes(selectedCurrentModule,recordObj)}}\"></lyte-checkbox> </template> </crux-table-component> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,1]}],
_observedAttributes :["cxPropContent","cxPropHeader","cxPropSelected","cxPropSelectedFields","cxPropHideTemplate","cxPropSelectAllFields","selectedRightPanel","selectedCurrentModule","fieldsRightPanel","isHeaderSelected","cxPropMaxHeight","cxPropMinHeight"],
_observedAttributesType :["array","object","object","object","boolean","object","object","array","array","boolean","string","string"],

	data : function(){
		return {
			cxPropContent : Lyte.attr('array',{default : []}),
			cxPropHeader : Lyte.attr("object",{default : {}}),
			// selectedLeftPanel : Lyte.attr('object'),
			cxPropSelected : Lyte.attr('object',{default : {}}),
			cxPropSelectedFields : Lyte.attr('object',{default : {}}),

			/* hide template tags */
			cxPropHideTemplate : Lyte.attr('boolean', {default : true}),
			/* to check and uncheck header checkbox in right panel */
			cxPropSelectAllFields : Lyte.attr('object', {default : {}}),
			/* all selected fields in right panel */
			selectedRightPanel : Lyte.attr('object', {default : {}}),
			/* selected fields for current module in right panel */
			selectedCurrentModule : Lyte.attr('array', {default : []}),
			/* all fields in right panel */
			fieldsRightPanel : Lyte.attr('array', {default : []}),
			/* check is header checkbox selected */
			isHeaderSelected : Lyte.attr('boolean', {default : true}),
			/* to get max height */
			cxPropMaxHeight : Lyte.attr('string', {default : '700px'}),
			/* to get max height */
			cxPropMinHeight : Lyte.attr('string', {default : '300px'})
		};
	}, 
	// observeSelectedData : function(){
		
	// }.observes('selectedLeftPanel'),
	// setSelectedValue : function(){

	// }.observes('cxPropSelected'),
	init : function(){

		// var header = [{api_name : 'module' , id : "moduleHeader" , field_label : "Modules"}],
		// 	subHeader = [{cxCheckbox : false,yield : true , yieldName:"checkBoxYield"},{api_name : "name" , field_label : "fields" , id : "1",data_type : "text"},{api_name : "id" , field_label : "Id" , id : "2",data_type : "text"}];
		// this.setData('cxPropHeader', {cxHeader : header , cxSubHeader : subHeader});

		// var group = {"cxGroupName" : "Company" , cxPropContent : [{name : "field1" , id : "1"},{name : "field2",id : "2"}],total_count : 2};
		// var group1 = {"cxGroupName" : "Record" , cxPropContent : [{name : "field4",id : "4"}],total_count : 1};
		// var group2 = {"cxGroupName" : "test header" , cxPropContent : [{name : "field3",id : "3"}],total_count : 1};
		// var contactContent = {"cxGroupName" : "contact name" , cxPropContent : [{name : "ms",id : "11"}],total_count : 1};
		// var contactContent2 = {"cxGroupName" : "account name" , cxPropContent : [{name : "dk",id : "12"}],total_count : 1};
		// var dataJson = [{module : 'Leads' , id : '123', cxContent :[] , cxShowCheckbox : true , cxHeader : [], cxPropClass : ""},
		// 				{module : 'Contacts' , id : '2', cxContent :[] , cxShowCheckbox : true , cxHeader : [], cxPropClass : ""},
		// 				{module : 'Deals' , id : '3', cxContent :[]},
		// 				{module : 'Accounts' , id : '4'},
		// 				{module : 'customModule1' , id : '5'},
		// 				{module : 'customModule12' , id : '16'}];
		// dataJson[0].cxContent = [{name : "field3",id : "3"},group,group1,group2];
		// dataJson[1].cxContent = [{name : "name",id : "13"},contactContent,contactContent2];

		// this.setData('cxPropContent' , dataJson);//no i18n
		// this.setData('cxPropSelected' ,dataJson[0]);

		/* to set all right panel fields in fieldsRightPanel for selected module */
		if(this.data.cxPropSelected && this.data.cxPropSelected.cxContent){
			this.setData('fieldsRightPanel', this.getContentData(this.data.cxPropSelected.cxContent));
		}
		if(this.data.selectRightPanel){
			this.setData('cxPropSelectedFields', this.data.selectRightPanel);
		}

		// this.setData('rightPanelFields', this.getData('selectedLeftPanel').cxContent);
	},
	didConnect : function(){
		if(this.data.cxPropContent && this.data.cxPropSelected && this.data.cxPropSelected.module){
			var content = this.data.cxPropContent;
			var selModule = this.data.cxPropSelected.module;
			var content_len = content.length;
			for(var i=0; i<content_len; i++){
				if(content[i].module === selModule){
					var moduleComp = this.$node.querySelector('[id = '+JSON.stringify(content[i].id)+']').querySelector('lyte-exptable-td');
					if(moduleComp && !moduleComp.className.includes('.cxDualListSelectedItem')){
						$L(moduleComp).addClass('cxDualListSelectedItem');
					}
					break;
				}
			}
		}
	},
	actions : { 
		// Functions for event handling
		rowClick : function(leftItem, event){
			this.setData('cxPropSelected', leftItem);//no i18n

			var moduleComp = this.$node.querySelector('.cxDualListSelectedItem');
			if(moduleComp){
				$L(moduleComp).removeClass('cxDualListSelectedItem');
			}
			$L(event.target).addClass('cxDualListSelectedItem');

			/* to set all right panel fields in fieldsRightPanel for selected module */
			this.setData('fieldsRightPanel', this.getContentData(this.data.cxPropSelected.cxContent));

			/* selected fields for current module */
			this.setData('selectedCurrentModule', this.data.selectedRightPanel[leftItem.module].selectedContent);

			/* set true/false/partial to check/uncheck checkbox in header */
			var selectedHeader = this.headerChecked();
			if(selectedHeader === true){
				this.setData('cxPropSelectAllFields', selectedHeader);
			}
			// this.setData('rightPanelFields', this.getData('selectedLeftPanel').cxContent);
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	onHeadChanged : function (input, comp, event, userAction) {
			var selectedModule = this.data.cxPropSelected.module;

			if(userAction !== 'script'){
				if(comp.data.ltPropChecked){
					/* to set all right panel fields in fieldsRightPanel for selected module */
					this.setData('selectedCurrentModule', this.getContentData(this.data.fieldsRightPanel));

					/* set all selected data to selectedRightPanel */
					// this.setData(this.getData('selectedRightPanel')[selectedModule].selectedContent, this.getData('selectedCurrentModule'));
				}else{
					/* to set all right panel fields in fieldsRightPanel for selected module */
					this.setData('selectedCurrentModule', []);

					/* set all selected data to selectedRightPanel */
				}
				Lyte.objectUtils( this.data.selectedRightPanel[selectedModule] , "add" , 'selectedContent' , this.data.selectedCurrentModule );
			}

			this.setData('cxPropSelectedFields', this.data.selectedRightPanel);

			if(this.getMethods("onHeaderValueChange")){
				/**
				 *  Called on change of checkbox
				 * @method onChange
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onHeaderValueChange", this.data.cxPropValue);
			}
		},
	onContentChanged : function(input, comp, event, userAction){
			var selectedField = comp.data.recordobj;
			var selectedModule = this.data.cxPropSelected.module;
			var selectedCurrentModule = this.data.selectedCurrentModule;
			if(userAction !== 'script'){
				if(comp.data.ltPropChecked && selectedCurrentModule && !selectedCurrentModule.includes(selectedField)){
					Lyte.arrayUtils(selectedCurrentModule, 'push', selectedField);
				}else if(selectedCurrentModule && selectedCurrentModule.includes(selectedField)){
					Lyte.arrayUtils(selectedCurrentModule, 'removeAt', selectedCurrentModule.indexOf(selectedField), 1);
				}
				this.setData(this.data.selectedRightPanel[selectedModule].selectedContent, selectedCurrentModule);
			}

			this.setData('cxPropSelectedFields', this.data.selectedRightPanel);

			if(this.getMethods("onContentValueChange")){
				/**
				 *  Called on change of checkbox
				 * @method onChange
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onContentValueChange", this.data.cxPropValue);
			}
		},
		beforeHeaderChecked : function(item, ele){
			if(this.getMethods("onHeaderBeforeChecked")){
				/**
				 *  Called on change of checkbox
				 * @method onHeaderBeforeChecked
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onHeaderBeforeChecked", item, ele);
			}
	    },
	    beforeHeaderUnchecked : function(item, ele){
			if(this.getMethods("onHeaderBeforeUnchecked")){
				/**
				 *  Called on change of checkbox
				 * @method onHeaderBeforeUnchecked
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onHeaderBeforeUnchecked", item, ele);
			}
	    },
		beforeContentChecked : function(item, ele){
			if(this.getMethods("onContentBeforeChecked")){
				/**
				 *  Called on change of checkbox
				 * @method onContentBeforeChecked
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onContentBeforeChecked", item, ele);
			}
	    },
	    beforeContentUnchecked : function(item, ele){
			if(this.getMethods("onContentBeforeUnchecked")){
				/**
				 *  Called on change of checkbox
				 * @method onContentBeforeUnchecked
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onContentBeforeUnchecked", item, ele);
			}
	    },
		beforeAccordionOpen : function(){
			if(this.getMethods("onBeforeTableAccordionOpen")){
				/**
				 * @method onBeforeTableAccordionOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				return this.executeMethod("onBeforeTableAccordionOpen");
			}
			return true;
		},
		beforeAccordionClose : function(){
			if(this.getMethods("onBeforeTableAccordionClose")){
				/**
				 * @method onBeforeTableAccordionClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				return this.executeMethod("onBeforeTableAccordionClose");
			}
			return true;
		},
		accordionOpen : function(){
			if(this.getMethods("onTableAccordionOpen")){
				/**
				 * @method onTableAccordionOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				return this.executeMethod("onTableAccordionOpen");
			}
			return true;
		},
		accordionClose : function(){
			if(this.getMethods("onTableAccordionClose")){
				/**
				 * @method onTableAccordionClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				return this.executeMethod("onTableAccordionClose");
			}
			return true;
		},
	moduleSearch : function(){
		if(this.getMethods("onModuleSearch")){
				/**
				 * @method onModuleSearch
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onModuleSearch");
			}
		},
	moduleSearchFocus : function(){
		if(this.getMethods("onModuleSearchFocus")){
				/**
				 * @method onModuleSearchFocus
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onModuleSearchFocus");
			}
		},
	moduleSearchBlur : function(){
		if(this.getMethods("onModuleSearchBlur")){
				/**
				 * @method onModuleSearchBlur
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onModuleSearchBlur");
			}
		},
	moduleAfterSearch : function(){
		if(this.getMethods("onModuleAfterSearch")){
				/**
				 * @method onModuleAfterSearch
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				this.executeMethod("onModuleAfterSearch");
			}
		}
	},
	/* observer to set module name keys in selectedRightPanel */
	setModulesSelectedRight : function(){
		if(this.data.cxPropContent){
			var content = this.data.cxPropContent;
			var selectedRightPanel = this.data.selectedRightPanel;
			var content_len = content.length;
			for(var i=0;i<content_len;i++){
				if(!selectedRightPanel[content[i].module]){
					selectedRightPanel[content[i].module] = {
						isHeaderSelected : false,
						selectedContent : []
					};
				}
			}
			this.setData('selectedRightPanel', selectedRightPanel);
			this.setData('cxPropSelectedFields', selectedRightPanel);
		}
	}.observes('cxPropContent').on('init'),
	/* get all fields in right panel for selected module */
	getContentData : function(data){
		var res = [];
		if(data){
			var data_len = data.length;
			for (var i=0; i<data_len; i++) {
				var contentObj = data[i];
				var content = contentObj;
				if(contentObj.cxPropContent){
					content = contentObj.cxPropContent;
					var content_len = content.length;
					for(var j=0; j<content_len; j++){
						var tempContent = content[j];
						if(!res.includes(tempContent)){
							res.push(tempContent);
						}
					}
				}else if(!res.includes(content)){
					res.push(content);
				}
			}
		}
		return res;
	},
	/* check/uncheck header checkbox on module change */
	headerChecked : function(){
		var selectedModule = this.data.cxPropSelected.module;
		var selectRightPanel = this.data.selectedRightPanel;
		var isHeaderChecked = selectRightPanel[selectedModule].isHeaderSelect;
		if(isHeaderChecked){
			return true;
		}
		var selectedCurrentModule = this.data.selectedCurrentModule;
		var allFields = this.data.fieldsRightPanel;
		var allFields_len = allFields.length;
		for(var i=0; i<allFields_len;i++){
			if(selectedCurrentModule && !selectedCurrentModule.includes(allFields[i])){
				return false;
			}
		}
		this.setData(isHeaderChecked, true);
		return true;
	},
	getSelectedFields : function(){
		return this.data.selectedRightPanel;
	}
});


/*
 * selectedRightPanel = {
		<module name> : {
			isHeaderSelect : true/false
			selectedContent : []
		}
	}
 */

/*
	cxPropContent = [
		{
			module : <module name>,
			id : <id>,
			cxContent : [
				{
					cxGroupName : "",
					cxPropContent : [
						{
							name : <fields name (field1)>
							id : <id>
						}
					]
				}
			]
		}
	]
*/
