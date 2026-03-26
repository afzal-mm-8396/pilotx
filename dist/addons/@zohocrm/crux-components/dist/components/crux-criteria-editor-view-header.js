// $Id$
Lyte.Component.register("crux-criteria-editor-view-header", {
_template:"<template tag-name=\"crux-criteria-editor-view-header\"> <div class=\"criteriaTd\"> <span class=\"cxCriteriaViewIndexSpan\" data-zcqa=\"criteria_view_patternnum_{{criteriaIndex}}\">{{criteriaIndex}}</span> </div> <template is=\"if\" value=\"{{showComparator}}\"><template case=\"true\"> <div class=\"criteriaTd\"> <template is=\"if\" value=\"{{expHandlers(totalCriteria,'>',1)}}\"><template case=\"true\"> <span class=\" andOrConditionView dIB\" data-zcqa=\"criteria_view_cond_{{criteriaIndex}}\">{{andOrCondition}}</span> </template></template> </div> </template></template> <div class=\"criteriaTd cxCriteriaViewDataColumn\"> <template is=\"for\" items=\"{{prefixArray}}\" item=\"item\" index=\"index\"> <span class=\"{{item.cxViewClass}}\" data-zcqa=\"criteria_view_{{item.apiValue}}_{{criteriaIndex}}\">{{selectedArray[index].value[item.displayValue]}}</span> <template is=\"if\" value=\"{{expHandlers(expHandlers(index,'<',expHandlers(prefixArray.length,'-',1)),'||',showFieldsCriteria)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(item.cxHideBullet)}}\"><template case=\"true\"><span class=\"cxCriteriaBulletSep\">.</span></template></template> </template></template> </template> <template is=\"if\" value=\"{{showFieldsCriteria}}\"><template case=\"true\"> <span class=\"colorSpan cxCriteriaViewFieldSpan\" data-zcqa=\"criteria_view_field_{{criteriaIndex}}\">{{field}}</span> <span class=\"mLR5 cxCriteriaViewComparatorLabel\" data-zcqa=\"criteria_view_comp_{{criteriaIndex}}\">{{captialize(condition)}}</span> <template is=\"if\" value=\"{{dynamicElementComponentRender}}\"><template case=\"true\"> <template is=\"component\" class=\"cxCriteriaDynamicElement\" component-name=\"{{dynamicCond}}\" selected-value=\"{{value}}\" field=\"{{selectedField}}\" comparator=\"{{selectedComparator}}\" on-value-change=\"{{method('changeValue')}}\" from=\"criteria_editor_view\"></template> </template><template case=\"false\"> <span class=\"{{if(dynamicTypeValue,'cxCriteriaViewModuleBadgeWrap','colorSpan')}} {{if(currencyClass,'cxCriteriaViewCurrencyValue')}} {{if(setClassForValue,'cxCriteriaViewNumberField')}} valueSpan cxCriteriaViewValueSpan\" data-zcqa=\"criteria_view_value_{{criteriaIndex}}\"> <template is=\"if\" value=\"{{secondayModuleDataDisplayed}}\"><template case=\"true\"> <span class=\"cxCriteriaViewBadgeLabel\"> <lyte-text class=\"cxCriteriaViewBadgeLabelText\" lt-prop-value=\"{{value}}\"></lyte-text> </span> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'&amp;&amp;',expHandlers(hideSecondayModule,'!'))}}\"><template case=\"true\"> <span class=\"cxCriteriaViewModuleBadge\">({{secondaryModuleDisplayName}})</span> </template></template> </template><template case=\"false\"> {{value}} <template is=\"if\" value=\"{{previousNextComp}}\"><template case=\"true\"><span>{{changePreviousNextSelected}}</span></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValueSelected,'==','record_category')}}\"><template case=\"true\"> <span class=\"cxCriteriaViewModuleBadge\">({{cruxGetI18n('crm.record.category')}})</span> </template></template> </span> <template is=\"if\" value=\"{{showMore}}\"><template case=\"true\"> <a onclick=\"{{action('toggleShow')}}\" class=\"cxTextareaShowMore\">{{textAreaShowText}}</a> </template></template> </template></template> </template></template> </div> <template is=\"if\" value=\"{{childCriteria}}\"><template case=\"true\"> <div class=\"cxChildCriteria\"> <crux-criteria-editor id=\"childCriteriaView_{{criteriaIndex}}\" cx-prop-fields=\"{{emptyArray}}\" cx-set-data-and-methods=\"{{method('setMethodsAndDataForChildCriteriaCaller')}}\" cx-prop-set-criteria=\"{{childSetCriteria}}\" cx-prop-type=\"view\"></crux-criteria-editor> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"for","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["criteria","field","condition","value","andOrCondition","module","criteriaIndex","fields","selectedField","selectedCondition","pickList","selectUser","lookup","callModule","lookupField","tagComponent","layoutComponent","totalCriteria","numberFieldException","moduleMapping","currencyProperties","currencyClass","showComparator","secondaryModule","secondayModuleDataDisplayed","dynamicTypeValue","secondaryModuleDisplayName","hideSecondayModule","cxPropSecondaryFields","textAreaShowText","dynamicCond","showFieldsCriteria","childCriteria","criteriaFormat"],
_observedAttributesType :["object","string","string","string","string","string","string","array","object","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","number","object","array","object","boolean","boolean","string","boolean","boolean","string","boolean","array","string","string","boolean","boolean","string"],
 //No I18N
	data : function(){
		return {
			criteria : Lyte.attr('object'), //no i18n
			field : Lyte.attr('string'), //no i18n
			condition : Lyte.attr('string'), //no i18n
			value : Lyte.attr('string'),  //no i18n
			andOrCondition : Lyte.attr('string'), //no i18n
			module : Lyte.attr('string'), //no i18n
			criteriaIndex : Lyte.attr('string'), //no i18n 
			fields : Lyte.attr('array'), //no i18n
			selectedField : Lyte.attr('object'), //no i18n
			selectedCondition : Lyte.attr('array'), //no i18n
			pickList : Lyte.attr('boolean',{default : false}), //no i18n
			selectUser : Lyte.attr('boolean',{default : false}), //no i18n
			lookup : Lyte.attr('boolean',{default : false}), //no i18n
			callModule : Lyte.attr('boolean',{default : false}), //no i18n
			lookupField : Lyte.attr('boolean',{default : false}), //no i18n
			tagComponent : Lyte.attr('boolean',{default : false}), //no i18n
			layoutComponent : Lyte.attr('boolean',{default : false}), //no i18n
			totalCriteria : Lyte.attr('number'), //no i18n
			numberFieldException : Lyte.attr('object',{default : { 'Solutions':"Solution_Number",'Invoices':"Invoice_Number",'SalesOrders':"SO_Number",'Quotes':"Quote_Number",'Cases':"Case_Number"}}), //no i18n
			moduleMapping : Lyte.attr('array'), //no i18n
			currencyProperties : Lyte.attr('object'), //no i18n
			currencyClass : Lyte.attr('boolean',{default : false}), //no i18n
			showComparator : Lyte.attr('boolean'), //no i18n
			secondaryModule : Lyte.attr('string'), //no i18n
			secondayModuleDataDisplayed : Lyte.attr('boolean',{default : false}), //no i18n
			dynamicTypeValue : Lyte.attr('boolean'), //no i18n
			secondaryModuleDisplayName : Lyte.attr('string'), //no i18n
			hideSecondayModule : Lyte.attr('boolean'), //no i18n
			cxPropSecondaryFields : Lyte.attr("array"),//No I18n
			textAreaShowText : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions')}),
			dynamicCond : Lyte.attr('string',{default : ""}), //no i18n
			showFieldsCriteria : Lyte.attr('boolean'),
			childCriteria : Lyte.attr('boolean'),
			criteriaFormat : Lyte.attr('string')
		}		
	},
	init : function(){
		this.moduleApiMapping = {};
		this.moduleIdMapping = {};
		this.onGetCriteria();
	},
	onGetCriteria : function(){
		if(this.getData('criteria') && Object.keys(this.getData("criteria")).length > 0){
			this.setViewCriteriaObj(this.getData('criteria'));//no i18n
		}
	},
	setViewCriteriaObj : function(criteriaObj){
		var criteriaArray=[]
		if(criteriaObj.field == undefined){
			criteriaArray = this.getCriteriaArray(criteriaObj,[]);
		}
		else{
			criteriaArray.push(criteriaObj);
		}
		if(this.data.prefixArray.length > 0 && this.data.prefixArray.cruxFindIndexOfObject('apiValue','module') > -1){
			var array=this.getModuleFromCriteria(criteriaArray[criteriaArray.length-1]);
			criteriaArray.splice(criteriaArray.length-1,1);
			criteriaArray = criteriaArray.concat(array);
		}
		if(this.data.criteriaFormat === 'relatedModuleChildCriteria'){
			var criteriNewArray = []
			this.data.prefixArray.forEach(function(item,index){
			    criteriNewArray.push({api_name : item.apiValue,comparator : 'equal',value : criteriaObj[item.apiValue]})
			}.bind(this));
			if(criteriaObj.criteria){
				this.setData('childSetCriteria',criteriaObj.criteria)
				this.setData('childCriteria',true);
			}
			this.setData('selectedArray',criteriNewArray)
		}else{
			this.setData('selectedArray',criteriaArray); //NO I18N
		}
		if(this.data.showFieldsCriteria){
			var criteria= Object.assign({},criteriaArray.pop());	
			var unformattedFieldApi = criteria.field.api_name; //no i18n
			this.executeMethod('setFieldForCriteria',criteria); //no i18n
			var api_name,dataType,ageCond;
			var condition=criteria.comparator;
			var value=criteria.value;
			this.setData('selectUser',false);//No I18N
			this.setData('pickList',false); //No I18N
			this.setData('tagComponent',false); //No I18N
			this.setData('layoutComponent',false); //No I18N
			this.setData('selectedField',criteria.field); //No I18N
			if(this.data.selectedField && this.data.selectedField.module && this.data.selectedField.module.length > 0){
				this.setData('module',this.data.selectedField.module[0].module_name == 'Activities' && this.data.selectedField.api_name.match(/Tag/) ? this.data.selectedField.sub_module.api_name : this.data.selectedField.module[0].module_name);
			}
			api_name = criteria.field.api_name;
			dataType = criteria.field.data_type;
			if(dataType == 'formula'){
				dataType = this.getData('selectedField').formula.return_type;//no i18n
			}
			if(dataType == 'rollup_summary'){
				dataType = this.getData('selectedField').rollup_summary.return_type;//no i18n
			}
			var select ="default"; //No I18N
			switch(dataType){
			case "none":
				select="none";//No I18N
				break;
			case "text": case "email": case "phone": case "website": case "textarea": case "autonumber": case "string":
				select="text";//No I18N
				break;
			case "multiselectpicklist":
				select = "multiselectpicklist"; //no i18n
				break;
			case "currency": case "double": case "integer": case "bigint": case "number": case "decimal" : case "longinteger": case "percent" : 
				select="number";//No I18N
				break;
			case "datetime": 
				select="date-time";//No I18N
				break;
			case "date":
				select = 'date'; //No I18N
				break;
			case "boolean":
				select="boolean";//No I18N
				break;
			case "ownerlookup":
			case "userlookup":
				select = "user";//No I18N
				this.setData('selectUser',true);//No I18N
				if(unformattedFieldApi.indexOf('.role') > -1){
					condition = condition+'_role'
				}else if(unformattedFieldApi.indexOf('.group') > -1){
					condition = condition+'_group'
				}else if(unformattedFieldApi.indexOf('.type__s') > -1){
					condition = condition+'_type'
				}
				break;
			case "picklist":
				this.setData('pickList',true); //No I18N
				select = "picklist";//No I18N
				this.setData('selectedFieldPicklist',this.getData('selectedField').pick_list_values)//no i18n
				break;
			case "lookup":
				select = "text"; //No I18N
				break;
			case "multi_module_lookup":
				select = "multimodulelookup"; //No I18N
				this.setData('multiModule',true) //no i18n
				break;
			case "fileupload": 
			case "imageupload":
			case "multiselectlookup":
			case "multiuserlookup":
				select = "defEmpty";
				break;
			}
			if(this.getData('numberFieldException')[this.data.module] == this.getData('selectedField').api_name){
				select="number";//No I18N
				elementsCond = "number"; //no i18n
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Tag')){//No I18N
				this.setData('tagComponent',true); //No I18N
				select="defWithEmpty"; //No I18N
				this.setData('showEmpty',true); //No I18N
			}
			if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Layout')){
				this.setData('layoutComponent',true); //No I18N
				select ="default"; //No I18N
				this.setData('showEmpty',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Wizard')){//No I18N
				select = "default"; //no i18n
				this.setData('layoutComponent',true); //No I18N
				this.setData('showEmpty',true); //No I18N
			}else if(this.criteriaApiNameCheck(api_name,'role',this.data.selectedField)){//No I18N
				select ="default"; //No I18N
				this.setData('layoutComponent',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'profile')){//No I18N
				select ="default"; //No I18N 
				this.setData('pickList',false); //No I18N
				this.setData('layoutComponent',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Call_Status') && (this.data.selectedField.module[0].module_name == 'Activities' || this.data.selectedField.module[0].module_name =='Calls')){ //no i18n
				select = "cs"; //No I18N 
			}else if(api_name.match(/Activity_Type/) && this.data.module == 'Activities'){ //no i18n
				select = "default"; //No I18N
				this.setData('pickList',true); //No I18N
			}else if(this.getData('selectedField').column_name == 'APPOINTMENTSTATUS' || this.getData('selectedField').column_name == 'SERVICESTATUS'){ //no i18n
				select = "default"; //no i18n
			}else if(this.criteriaApiNameCheck(api_name,'Stage')&& (this.data.module == 'Potentials' || this.data.module =='Deals')){
				select = "stage"; //No I18N 
			}else if(this.getData('selectedField').ui_type === 137){ //no i18n
				this.setData('pickList',true); //No I18N
			}
			if(this.getData('selectedField').cxPropDynamicFieldValue){
				this.setData('dynamicallyFedField',true);
			}
			this.setData('selectedCondition',this.executeMethod('setConditions',select == 'date-time' ? 'date' : select,undefined,criteria.field)); //no i18n
			if(criteria.type != 'dynamic_component' && ((Array.isArray(value) && typeof value[0] == 'string' && value[0].match('NOC')) || typeof value == 'string' && (value.match(/AGEIN/g) ||value.match(/DUEIN/g) || value.match('NOC') || value.match('LAST_N') || value.match('NEXT_N')))){
				ageCond=condition;
				var ageindays=this.executeMethod('setConditions','ageInDays'); //No I18N
				for(var i=0;i<ageindays.length;i++){
					if(ageindays[i].system == ageCond){
						ageCond=ageindays[i].display;
						break;
					}
				}
				if(Array.isArray(value) && value[0].match('NOC')){
					condition='Number of Characters';//No I18N
					value=value[0].replace(/\D/g, '')+ ' - ' + value[1].replace(/\D/g, '')
					value=ageCond + ' ' + value;
					select="";
				}else{
					if(value.match(/DUEIN/g)){
						condition="Due in Days"; //no i18n
					}else if(value.match(/AGEIN/g)){
						condition="Age in Days"; //no i18n
					}else if(value.match('NOC')){
						condition='Number of Characters';//No I18N
					}else if(value.match('LAST_N')){
						condition = 'previous'

						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						this.setData('previousNextComp',true);
					}else if(value.match('NEXT_N')){
						condition = 'next'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						this.setData('previousNextComp',true);
					}
					value=value.replace(/\D/g, '');
					value=ageCond + ' ' + value;
					select="";
				}
				
			}
			
			var sysCondition=condition;
			if(criteria.type != 'dynamic_component' && (typeof value =="string" && (value == '${EMPTY}' || value == '${NOTEMPTY}' || value == '${OPEN}' || value == '${CLOSEDWON}' || value == '${CLOSEDLOST}' || value == '${C_OPEN}' || value == '${C_COMPLETED}' || value == '${C_FAILED}'))){
				if(condition == 'equal' && value == '${EMPTY}'){
					condition = '${EMPTY}'//No I18N
				}else if(value == '${EMPTY}' || value == '${NOTEMPTY}'){//No I18N
					condition = '${NOTEMPTY}'//No I18N
				}else{
					condition = value;
				}
				value='';
				select="";
				dataType = "";
				this.setData('selectUser',false);//No I18N
				this.setData('pickList',false); //No I18N
				this.setData('lookup',false); //No I18N
				this.setData('tagComponent',false); //No I18N
				this.setData('layoutComponent',false); //No I18N
				this.setData('multiModule',false) //no i18n
			}
			for(var i=0;i<this.getData('selectedCondition').length;i++){
				if(condition == this.getData('selectedCondition')[i].system){
					condition = this.getData('selectedCondition')[i].display;
					this.setData('selectedComparator',this.getData('selectedCondition')[i]);
					break;
				}
			}
			if(this.data.changePreviousNextSelected){
				try{
					this.setData('changePreviousNextSelected',this.data.selectedComparator.cxDateOptions.cruxFilterBy({system : this.data.changePreviousNextSelected})[0].display)
				}catch(e){}
			}
			if(typeof value =="string" && value.match(/{/) && criteriaObj.type !== 'dynamic_component'){
				if(select == "cs"){
					condition = _cruxUtils.getI18n("is"); //no i18n
				}
				for(var i=0;i<this.getData('selectedCondition').length;i++){
					if(value == this.getData('selectedCondition')[i].system){
						value = this.getData('selectedCondition')[i].display;
						break;
					}
				}
				select="";
			}
			if(criteria.type === 'dynamic_component' || (this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField))){
				this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField));
				this.setData('dynamicElementComponentRender',true);
			}else if(criteria.type === 'field'){
				if(this.data.dynamicallyFedField){
					value = value.display
				}else{
					var secField = this.executeMethod('getRelatedFields',value);
					this.setData('secondayModuleDataDisplayed',true);
					if(secField && secField.parentCriteriaFieldGroup){
						this.setData('secondaryModuleDisplayName',secField.parentCriteriaFieldGroup.cxPropLabel)
					}
					value = secField.field_label; 
				}
			}else{
				if(sysCondition.match(/between/)){
					if(select == 'date-time'){
						try{
							value=this.getDateTime(value[0])+' - '+this.getDateTime(value[1]);	
						}catch(e){
							value = value[0]+' - '+value[1]
						}
						
					}else if(select == 'date'){ //No I18N\
						try{
							value=this.getDate(value[0])+' - '+this.getDate(value[1]);
						}catch(e){
							value = value[0]+' - '+value[1]
						}
					}else{
						if(criteria.field.separator && typeof Search != "undefined"){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-view-header.js", "Feb Default Changes");
					    	this.setData('setClassForValue',true);//no i18n
					        value[0] = Search.formatNumber(value[0]);
					        value[1] = Search.formatNumber(value[1]);
					    } 
					    if(dataType == 'currency' && this.data.currencyProperties.baseCurrency && this.data.currencyProperties.baseCurrency.length > 0){
						    _cruxUtils.addMurhyInfo("crux-criteria-editor-view-header.js", "Feb Default Changes");
					    	this.setData('currencyClass',true); //no i18n
					    	value = this.data.currencyProperties.baseCurrency+'  '+value[0]+' - '+this.data.currencyProperties.baseCurrency+'  '+value[1];   
					    	dataType = "";
					    }else{
					        value = value[0]+' - '+value[1];   
					    }

					}
					select=""

				}
				if(select == 'date-time'){
					if(typeof value =='string' && value.match(/{/)){
						for(var i=0;i<this.getData('selectedCondition').length;i++){
							if(value == this.getData('selectedCondition')[i].system){
								value = this.getData('selectedCondition')[i].display;
								break;
							}
						}
					}else{
						try{
							value=this.getDateTime(value);
						}catch(e){}
					}
				}else if(select == 'date'){
					if(typeof value =='string' && value.match(/{/)){
						for(var i=0;i<this.getData('selectedCondition').length;i++){
							if(value == this.getData('selectedCondition')[i].system){
								value = this.getData('selectedCondition')[i].display;
								break;
							}
						}
					}else{
						try{
							value=this.getDate(value);
						}catch(e){}
					}
				}else if(select == 'boolean'){
					if(typeof value == 'boolean'){
						if(value==false){
							value=_cruxUtils.getI18n('crm.label.notSelected') //No I18N
						}else{
							value=_cruxUtils.getI18n('crm.label.selected') //No I18N
						}
					}
				}else if(this.getData('pickList')  || select == "multiselectpicklist"){
					if(typeof value === 'string' && this.data.selectedField.cxPropType !== "single"){
						value=[].concat(value);
					}
					if(this.data.selectedField.ui_type==137){
	                    var temp=[];
	                    if(Array.isArray(value)){
	                        for(var i=0;i<value.length;i++){
	                            if(value[i].api_name){
	                               temp[i]=value[i].api_name;
	                            }else{
	                          	  temp[i]=value[i];
	                            }
	                        }
	                    }else{
	                        if(value.api_name){
	                         	temp[0]=value.api_name;
	                        }else{
	                         	temp[0] = value;
	                        }   
	                    }
		                value=temp; 
		                temp = [];
	                    if(Array.isArray(value)){
	                        for(var i=0;i<value.length;i++){
						        var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value[i]}  );//eslint-disable-line no-loop-func
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].plural_label);
						    	}else{
	                                temp.push(value[i]);
						    	}
						    }
					    }else{
					    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value}  );
					    	if(recordObj[0]){
						    	temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
						    }else{
	                            temp.push(value);
							}
					    }
					    value = temp;
	                }else if(value[0].indexOf('${CATEGORY') > -1 && !this.data.disabledRecordStateConfig){
						this.setData('dynamicTypeValueSelected','record_category');
						if(!this.data.selectedField.enable_record_category){
							Lyte.objectUtils(this.data.selectedField,'add','enable_record_category',true);
						}
						var cpV = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
						this.setData('customPicklistValues',cpV);
						var tempp = [];
						value.forEach((item)=>{
							var t = cpV.cruxFindIndexOfObject('actual_value',item);
							tempp.push(cpV[t] ? cpV[t].display_value : item);
						});
						value = tempp;
					}
					if(api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
						if(Array.isArray(value)){
							var temp=[]
							for(var i=0;i<value.length;i++){
								temp.push(moduleRecordMapping[value[i]].plural_label)
							}
							value = temp
						}else{
							value=_cruxUtils.getI18n('crm.label.selected') //No I18N
						}
					}   
					if(typeof value != 'string'){
						value = value.join(', ');
					}
				}else if(this.getData('selectUser')){
					if(typeof value !== 'string'){
						var tempValue = [];
						if(value.hasOwnProperty('name')){
							if(value.name =='${CURRENTUSER}'){
								tempValue[0] = _cruxUtils.getI18n('current.logged.in.user');
							}else{
								tempValue[0] = value.name;
							}
						}else if(Array.isArray(value)){
							for(var i=0;i<value.length;i++){
								if(value[i].name =='${CURRENTUSER}'){
									tempValue.push(_cruxUtils.getI18n('current.logged.in.user'));
								}else{
									tempValue.push(value[i].name ? value[i].name : value[i]);
								}
							}
						}else{
							tempValue[0] = value
						}
						value = tempValue.join(', ');	
					}
				}else if(this.getData('tagComponent')){
					var tempValue = [];
					if(value.hasOwnProperty('id')){
						tempValue[0] = value.name;
					}else{
						for(var i=0;i<value.length;i++){
							tempValue.push(value[i].name);
						}
					}
					if(tempValue.length == 0){
						value = value
					}else{
						value = tempValue.join(', ');	
					}
				}else if(this.getData('layoutComponent')){
					var tempValue = [];
					if(value.hasOwnProperty('id')){
						tempValue[0] = value.display_label ? value.display_label : value.name;
					}else{
						for(var i=0;i<value.length;i++){
							tempValue.push(value[i].display_label ? value[i].display_label : value[i].name);
						}
					}
					if(tempValue.length == 0){
						value = value
					}else{
						value = tempValue.join(', ');	
					}
				}
				if(this.data.multiModule){
					var moduleExtracted = unformattedFieldApi.substr(unformattedFieldApi.indexOf('->')+2,unformattedFieldApi.length)
					moduleExtracted = moduleExtracted.substr(0,moduleExtracted.indexOf('.'))
					multiModule = this.data.moduleRecordMapping[this.getModuleFromApiName(moduleExtracted,this.data.moduleRecordMapping)]
					value = value ? value+" "+_cruxUtils.getI18n('crm.label.simply.in')+' '+multiModule.plural_label : multiModule.plural_label;
				}
				if(select == 'text' && typeof value == 'object'){
					value = value.join(', ')
				}
				if(select == 'number' && criteria.field.separator  && typeof Search != "undefined"){
					this.setData('setClassForValue',true);//no i18n
				    if(dataType == 'currency' && ['INR','BDT','MMK','PKR'].indexOf(this.data.currencyProperties.baseCurrency) > -1 && typeof Crm != 'undefined' && Crm.userDetails.isIndianCurrencyFormatSupported){
						value=currencyUtils.formatCurrencyValue(value,'en-IN');
					}else{
						value = Search.formatNumber(value);
					}
				}
				if(dataType == 'currency'  && this.data.currencyProperties.baseCurrency && this.data.currencyProperties.baseCurrency.length > 0){
					this.setData('currencyClass',true); //no i18n
					if(typeof currencyUtils !== 'undefined' && currencyUtils.returnValueInDefaultCurrency){
						value = currencyUtils.returnValueInDefaultCurrency(this.data.currencyProperties.baseCurrency, value);
					}else{
						value = this.data.currencyProperties.baseCurrency+'  '+value;	
					}
					
				}
			}
			value = this.executeMethod('valueCriteriaViewChange',value,criteria.field,condition);
			this.setData('field',criteria.field.field_label); //no i18n
			this.setData('condition',condition); //no i18n}
			this.setData('value',value); //no i18n
			this.dataType = dataType
		}
	},
	didConnect : function(){
		if(this.dataType == 'textarea'){
			var vS = this.$node.querySelector('.valueSpan')
			vS.classList.add('cxCriteriaTextareaClamp');
			$L.fastdom.measure(function(){
				if(vS.scrollHeight > vS.clientHeight){
					this.setData("showMore", true);//No I18n
				}else{
					vS.classList.remove('cxCriteriaTextareaClamp');
				}
			}.bind(this))

		}
	},
	actions : {
		toggleShow : function(){
			var vS = this.$node.querySelector('.valueSpan')
			if(this.data.textAreaShowText == _cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions')){
				this.setData('textAreaShowText',_cruxUtils.getI18n('crm.wf.summary.label.HideInstantActions'));
				vS.classList.remove('cxCriteriaTextareaClamp');
			}else{
				this.setData('textAreaShowText',_cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions'));
				vS.classList.add('cxCriteriaTextareaClamp');
			}
		}
	},
	methods : {
		setMethodsAndDataForChildCriteriaCaller : function(component){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',component,this.data.selectedArray,this.data.criteria,this.data.criteriaIndex);
		},
	},
	observeCriteria : function(){
		this.onGetCriteria();
	}.observes('criteria'), //No I18N
	getDateTime : function(value){
		value = value.replace(/[+-]\d{2}:\d{2}/,'');
		var dateValue = value.split("-");
        var date = new Date(dateValue[0], dateValue[1]-1, dateValue[2].split("T")[0]);
		value = value.split("T");
		var time = value[1].split(":");
		date.setHours(time[0]);
		date.setMinutes(time[1]);
		this.setData('cxPropDatePattern',this.data.datePattern);//no i18n
		this.setData('cxPropTimeFormatInput',this.data.timeFormat.indexOf('a') > 0 ? '12' : '24');//no i18n
		var formattedDate = this.getDateTimeInUserFormat(date)
		var month = formattedDate.slice(0,3);
 		return formattedDate.replace(month,_cruxUtils.getI18n(month));
	},
	getDate : function(value){
		value = value.replace(/[+-]\d{2}:\d{2}/,'');
		this.setData('cxPropDatePattern',this.data.datePattern);//no i18n
		var formattedDate = this.getDateInUserDatePattern(value,this.data.datePattern,'YYYY-MM-DD',true);
		var month = formattedDate.slice(0,3);
 		return formattedDate.replace(month,_cruxUtils.getI18n(month));	
	}
},{mixins : ["crux-criteria-util","crux-element-validation"]}); //No I18N
