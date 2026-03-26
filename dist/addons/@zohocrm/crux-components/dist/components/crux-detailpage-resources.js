Lyte.Mixin.register("crm-crux-detailpage-mixin", { //No I18n
	view_unsupported_columns : ["UNSUBSCRIBEDMODE","UNSUBSCRIBEDTIME","CONSENTID","LASTENRICHEDTIME","ENRICHMENT_STATUS","QUALIFICATIONDURATION","LASTACTIVITYTIME",// NO I18N
	                            "MODIFIEDTIME","CREATEDTIME","SALESDURATION","SHAREDTO","DEALDURATION","S_MODIFIEDTIME","SENDNOTIFICATION","BEST_TIME","SE_STATUS","RESCHEDULEDTIME","CANCELLEDTIME"],// NO I18N
	detailview_unsupported_fields :{"Tasks":["SENDNOTIFICATION"],"Appointments":["ENDTIME","REMINDER","APPOINTMENTSTATUS","JOBSHEETSECTION","ISJOBSHEETCREATED"],"Services":["MXNDUMMYCOLUMN_SERVICE","JOBSHEETSECTION"],"Calls":["CALLDURATIONINSEC","SYSTEMCF2"], //NO I18N
	"Events":["PARTICIPANTID","RECURRING","CHECKINOWNERID","CHECKINCOMMENT","CHECKINSTREET","CHECKINCITY","CHECKINSTATE","CHECKINCOUNTRY","CHECKINLATITUDE","CHECKINLONGITUDE","CHECKINZIPCODE","CHECKINADDRESS","CHECKINSTATUS","MEETING_PROVIDER"]},//No I18N
	fieldColumnNameMap : {},
    findModuleid : function(modType){
		if(modType){
			switch(modType){
				case "moduleApiname":
					let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: this.getData('cxPropModuleApiName') });
                    if (moduleDetails && moduleDetails.moduleId) {
                        this.setData({cxPropModuleId : moduleDetails.moduleId ,cxPropModuleName : moduleDetails.moduleName}); 
                    }else{
						this.setData({cxPropModuleId : "" });
					}
					break;
				case "moduleData":
					this.setData({cxPropModuleId : this.getData('cxPropModuleData.id') , cxPropModuleApiName : this.getData('cxPropModuleData.api_name') , cxPropModuleName : this.getData('cxPropModuleData.module_name')});
					break;
				case "moduleId":
					var moduleRec = store.peekRecord('module',this.getData('cxPropModuleId'));
					this.setData({cxPropModuleApiName : moduleRec ? moduleRec.api_name : '' , cxPropModuleName : moduleRec ? moduleRec.module_name : ''});
					break;
			}
		}
	},
	checkIfRecordIsLocked : function(rec){
		if((((!rec.$review || rec.$review === "Approved") && ( rec.$approval_state ==='approved' || rec.$approval_state==='review_process_pending' || rec.$approval_state==='review_process_rejected' || rec.$approval_state==='merge_pending' || (rec.$approval && rec.$approval.resubmit)) && !rec.$stop_processing ) || !rec.$approval) && (!rec.$locked_for_me || rec.$editable)){
			return false;
		}
		return true;
	},
	processAjaxEditFields : function(sectionFields,isLocked,module,isBusinessCard,comp,layoutId,sectionId){
		var _self = this;
		if(isBusinessCard){
			sectionFields = Lyte.deepCopyObject(sectionFields);
		}
		sectionFields.forEach(function(field,index){
			_self.fieldColumnNameMap[field.column_name] = [field.id,field.api_name];
			if(module === "Leads" || module === "Contacts"){
				if(isBusinessCard && field.api_name==='Last_Name'){
					var fullNameField =store.peekAll('field').filterBy({api_name : 'Full_Name'});
					if(fullNameField && fullNameField.length){
						fullNameField = fullNameField.filter(function(f){
							return f.module && f.module[0] && f.module[0].api_name === 'Leads';
						});
						sectionFields[index] = fullNameField && fullNameField.length ? fullNameField[0] : field;
						field = sectionFields[index];
					}
				}
				if(field.api_name === 'Full_Name'){
					field.includeSalutation = true; 
				}
			}
			var layoutSectionField = field[layoutId+'_'+sectionId] , layoutField = field[layoutId];
			field.sequence = layoutSectionField && layoutSectionField.sequence_number !== undefined ? layoutSectionField.sequence_number : layoutField && layoutField.sequence_number !== undefined ? layoutField.sequence_number : field.sequence_number;
			field.view_type.client_edit = field.view_type.edit;
			field.view_type.client_view = field.view_type.view && field.visible;
			switch(field.ui_type){
				case 118 : 
					field.field_component_type = field.rollup_summary.return_type; 
					break;
				case 116:
					field.field_component_type = field.formula.return_type; 
					break;
				case 999:
					field.field_component_type = 'territory';
					break;
				case 208:
				case 207:
					field.field_component_type = 'layout';
					break;
				case 209:
					field.view_type.client_view = false;
					if(comp && comp.setData){
						comp.setData({cxPropIsTagFieldSupported : true});
					}
					break;
				case 99:
					field.field_component_type = 'comments';
					break;
				case 22:
					field.field_component_type = 'twitter';
					break;
				case 37:
					field.field_component_type = 'skype';
					break;
				case 250 : 
					field.field_component_type = 'rich_text';
					break;
				case 1234:
					field.field_component_type = 'reminder';
					break;
				default : 
					field.field_component_type = field.data_type;
					if( comp.getData('activityModules').includes(module) ){
						var isFromToField = field.column_name==="CONTACTID" && module==="Calls" ;
						if(( isFromToField || field.column_name==="SEID" )){
							field.field_component_display_label = isFromToField ? I18n.getMsg("crm.activities.call.label.fromto") : undefined;
							field.field_component_type="activity_mml"; //NO I18N
						}
						if(module==="Events"){
							field.field_component_type= (field.column_name==="STARTDATETIME" || field.column_name==="ENDDATETIME") && comp.getData('cxPropRecord.All_day')===true ? 'date' : field.api_name === 'Participants' ? 'participant' : field.field_component_type; //NO I18N
						}
					}
					break;
			}
			if(!_self.isViewableFieldInDetail(field,module,comp.getData('cxPropRecord'))){
				field.view_type.client_view = false;
			}
			if(isLocked || (field.ui_type === 208 || field.ui_type === 207 || field.api_name === 'Participants' || field.api_name === 'Forecast_Category__s' || field.api_name === "Handler")){
				field.preventEdit = true;
			}else{
				field.preventEdit = false;
			}
			
		});
		comp.setData('fieldColumnNameMap',_self.fieldColumnNameMap);
		if(isBusinessCard){
			if(module === "Calls" && Crm.userDetails.ACTIVITY_DETAIL_VIEW_LYTE){
				sectionFields = this.modifyBusinessCardFieldsForCalls(sectionFields,comp.getData('cxPropRecord'),layoutId,sectionId);
			}
			return sectionFields;
		}
	},
	isViewableFieldInDetail : function(field,module,record)
	{
		if(module === 'Leads' || module === 'Contacts')
		{
			if(field.column_name === 'LASTNAME')
			{
				return false;
			}
			else if (field.column_name === 'FULLNAME')
			{
				return true;
			}
		}
		if(this.view_unsupported_columns.indexOf(field.column_name) !== -1)
		{
			return false;
		}
		if(field.column_name.startsWith("SYSEXTERNAL") && field.virtual_field && !field.visible && (field.view_type && !field.view_type.view))
		{
			return false;
		}
		if(field.external)
		{
			return field.external.show && field.visible;
		}
		if((field.view_type && field.view_type.view === false) || !field.visible || this.detailview_unsupported_fields[module] && this.detailview_unsupported_fields[module].includes(field.column_name))
		{
			return false;
		}
		if(field.ui_type === 209)
		{
			return false;
		}
		if(module==="Calls" && ["CALLERIDOUTBOUND","CALLTHROUGHINBOUND"].includes(field.column_name) && !record[field.api_name]){
			return false;
		}
		return true;
	},
	isCallSectionVisible : function(section_name,record){
		var callType = this.getCallSectionType(record,this.getData('cxPropModuleData.fields'));
		if(callType==="Inbound" && section_name==="Outcome Of Outgoing Call" ){ //No I18N
			return false;
		}else if(callType==="Outbound" && section_name==="Reason For Incoming Call"){ //No I18N
			return false;
		}
		return true;
	},
	getCallSectionType: function(record,fields){
		var callType = record.Call_Type;
		var call_type;
		var fieldsArr=fields; //NO I18N
		if(fieldsArr){
			fieldsArr.forEach(function(value){
				if(value.api_name ==="Call_Type"){
					value.pick_list_values.forEach(function(val){
						if(val.display_value===callType){
							call_type = val.actual_value;
						}
					});
				}
			});
		}
		return call_type;
	},
	findParentStoreRecord : function(moduleId, recordId){
		if(this.getData('cxPropSkipModuleRefresh') && this.getData('cxPropModuleData.fields')){
			return;
		}
		var localStore = window.store , _self = this;
		if(!localStore.modelFor(moduleId)){
			localStore.findRecord('module',this.data.cxPropModuleId, undefined, false, true, {allowMultiple : true}).then(function(){
				_self.findParentStoreRecord(moduleId, recordId);
			});
			return;
		}
		if(!localStore.peekRecord(moduleId, recordId)){
			localStore.findRecord(moduleId , recordId,{"approved":"both","converted":"both","formatted_currency":true,"home_converted_currency":true,on_demand_properties : "$client_portal_permission"});
		}
	},
	populateDefaultValueForCalls : function(businessCardFields , record ){
		var defaultValue = {};
		businessCardFields= businessCardFields ? businessCardFields : [];
		var isOutbound=false;
		var calltype_actual = this.getCallSectionType(record , businessCardFields);
		if(calltype_actual==="Outbound"){
			isOutbound= true;
		}
		
		var isCallerInfoDisabled = typeof isCallerInfoDisabled === 'undefined' ? false : isCallerInfoDisabled; //eslint-disable-line no-use-before-define
		if(isOutbound && !isCallerInfoDisabled && record.To_Number__s){
			defaultValue = record.To_Number__s;
			record.$phone_number = record.To_Number__s;
		}else if(!isOutbound && !isCallerInfoDisabled &&  record.From_Number__s){
			defaultValue = record.From_Number__s;
			record.$phone_number = record.From_Number__s;
		}else if(!Crm.userDetails.CALLS_PREFERENCE && record.$phone_number){
			defaultValue = record.$phone_number;
		}
		else{
			defaultValue = I18n.getMsg("crm.activities.call.unknown.entityname"); 
		}
		return defaultValue;
	},
	modifyBusinessCardFieldsForCalls : function(sectionFields , record ,layoutId,sectionId ){
		var key = layoutId + '_' + sectionId , newBusiFieldsArray = [] , titleCardField = [];
		sectionFields.sort(function(a,b){
			return a[key].sequence_number - b[key].sequence_number;
		});
		for( var i = 0 ; i < 5 ; i++ ){
			var bField = objectUtils.cloneObject(sectionFields[i]);
			if(!bField.visible){
				continue;
			}
			if( bField[key].sequence_number === 1 && (record[bField.api_name] !== undefined || (record.$se_module === "Leads" && record.What_Id !== undefined) ) ){
				titleCardField.push(bField);
			}
			if(bField[key].sequence_number === 2 && titleCardField.length === 0 && record[bField.api_name] !== undefined ){
				titleCardField.push(bField);
			}
			newBusiFieldsArray.push(bField);
		}
		if(titleCardField.length === 0){
			Lyte.arrayUtils( newBusiFieldsArray , 'insertAt' , 0 , { showDefaultValue : true ,titleCardDefaultValue :  this.populateDefaultValueForCalls(sectionFields , record) } );
		}else { 
			Lyte.arrayUtils( newBusiFieldsArray , 'insertAt' , 0 , titleCardField[0] );
		}
		return newBusiFieldsArray;
	},
	cruxGetActivityMMLObj : function(module , record , field){
		var activity_mml_obj={} , value;

		if(module==="Calls"){ //No I18N
			value = this.getCallsWhoWhatValue(record , field.api_name);
		}else if(record[field.api_name]!==undefined){
			value=objectUtils.cloneObject(record[field.api_name]);
			if(record.$se_module){
				value.module={"api_name":record.$se_module,"id":moduleRecordMapping[moduleApiVsNameMapping[record.$se_module]].id}; //No I18N
			}
		}

		activity_mml_obj.value = value;
		var fieldCl = Object.assign({},field);
		fieldCl.data_type = 'multi_module_lookup'; //NO I18N
		if(value!==undefined){
			var modules={};
			modules.api_name=value.module.api_name;
			modules.module_name=moduleApiVsNameMapping[modules.api_name];
			modules.id=value.module.id;
			fieldCl.multi_module_lookup.modules=[modules];
			activity_mml_obj.module_name=modules.module_name;
		}
		activity_mml_obj.field=fieldCl;
		return activity_mml_obj;
	},
	getCallsWhoWhatValue : function(record , api_name){
		var seModule = record.$se_module;
		var apiName=api_name;
		if(api_name==="Who_Id" && record[api_name]) 
		{
			seModule="Contacts"; //No i18N
		}
		else if(api_name==="Who_Id" && record.What_Id && seModule==="Leads"){
			seModule="Leads"; //NO I18N
			apiName="What_Id"; //No I18N
		}
		else if(api_name==="What_Id" && seModule!=="Leads" && record[api_name]){
			seModule=record.$se_module;
		}
		if(!record[apiName] || (api_name==="What_Id" && seModule==="Leads")){
			return undefined;
		}
		
		var returnVal=objectUtils.cloneObject(record[apiName]);
		returnVal.module={"api_name":seModule,"id":moduleRecordMapping[moduleApiVsNameMapping[seModule]].id}; //No I18N
		return returnVal;	
	}
});
/**
 * @component crm-detailview
 * @author gayathiri.ks
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crm-detailview", {
_template:"<template tag-name=\"crm-detailview\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxDetailLoadingDiv\"> <div class=\"cxSpinloader cxLvLoader\"></div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"if\" value=\"{{showErrorMsg}}\"><template case=\"true\"> <template is=\"if\" value=\"{{isRecConverted}}\"><template case=\"true\"><div class=\"cxPropLayoutShowErrorDiv cxPropMessageTypeFailure\"> The record is either converted/not accessible. Please check the values provided. </div></template><template case=\"false\"><template is=\"if\" value=\"{{recordDeleteMessage}}\"><template case=\"true\"><div class=\"cxPropLayoutShowErrorDiv cxPropMessageTypeFailure\"> {{recordDeleteMessage}}</div></template><template case=\"false\"><div class=\"cxPropLayoutShowErrorDiv cxPropMessageTypeFailure\"> Record ID and Module API name are mismatched. Please check the values provided.</div></template></template></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(recordCompData,'&amp;&amp;',renderComponent),'&amp;&amp;',cxPropModuleApiName),'&amp;&amp;',cxPropSections),'&amp;&amp;',cxPropBusinessCardDetails)}}\"><template case=\"true\"><div class=\"oA\"> <input type=\"hidden\" id=\"module\" value=\"{{cxPropModuleApiName}}\"> <crux-detailpage-wrapper cx-prop-module=\"{{cxPropModuleApiName}}\" cx-prop-module-data=\"{{moduleCompData}}\" cx-prop-entity-id=\"{{cxPropRecordId}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-record=\"{{recordCompData}}\" cx-prop-sections=\"{{cxPropSections}}\" cx-prop-business-card-details=\"{{cxPropBusinessCardDetails}}\" cx-prop-existing-tags=\"{{recordCompData.Tag}}\" cx-prop-record-tags=\"{{cxPropRecordTags}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\" cx-prop-record-options=\"{{cxPropRecordOptions}}\" cx-prop-next-record=\"{{cxPropNextRecord}}\" cx-prop-previous-record=\"{{cxPropPreviousRecord}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" excute-record-actions=\"{{method('recordActionsHandling')}}\" user-change-owner=\"{{method('crmChangeOwner')}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-show-rec-image=\"{{cxPropShowRecordImage}}\" cx-prop-ajax-request-to=\"moduleid\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-no-of-fields-in-header=\"{{fieldsInHeader}}\" back-btn-user-method=\"{{method('navigateToListView')}}\" record-edit-callback=\"{{method('crmEditRecordFromDetail')}}\" on-save-ajax=\"{{method('crmAjaxEditSaveSuccessCallBack')}}\" on-error-ajax=\"{{method('crmAjaxEditSaveErrorCallBack')}}\" cx-prop-is-tag-field-supported=\"{{cxPropIsTagFieldSupported}}\" cx-prop-user-time-zone=\"{{user_timezone}}\" cx-prop-field-column-map=\"{{fieldColumnNameMap}}\" cx-prop-layout-rules=\"{{layout_rule_execute}}\" cx-prop-scroll-selector=\"crm-detailview\" cx-prop-show-edit-button=\"{{cxPropShowEditButton}}\" cx-prop-show-more-button=\"{{cxPropShowMoreButton}}\" cx-prop-show-related-lists=\"false\" cx-prop-show-back-button=\"{{cxPropShowBackButton}}\"></crux-detailpage-wrapper> <template is=\"if\" value=\"{{cxPropShowRelatedLists}}\"><template case=\"true\"><div id=\"crm-crux-related-list-wrapper\" class=\"cxDvWrapParent\"> <crm-relatedlist cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-skip-module-refresh=\"{{cxPropSkipModuleRefresh}}\" rl-rec-action=\"{{method('relatedListRecordActionCrmHandler')}}\" component-unique-id=\"{{componentUniqueId}}\" related-list-row-click=\"{{method('relatedListTableOnClick')}}\" cx-prop-module-information-type=\"{{cxPropModuleInformationType}}\" cx-prop-module-api-name=\"{{cxPropModuleApiName}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-record-information-type=\"{{cxPropRecordInformationType}}\" cx-prop-record-id=\"{{cxPropRecordId}}\" cx-prop-related-lists=\"{{cxPropRelatedLists}}\" cx-prop-rl-data=\"{{cxPropRlData}}\" cx-prop-record=\"{{recordCompData}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-bulk-request-to=\"moduleid\" rl-detail-row-click=\"{{method('relatedListTableOnClick')}}\" cx-prop-module-data=\"{{moduleCompData}}\" cx-prop-related-list-api-names=\"{{cxPropRelatedListApiNames}}\" on-related-list-action-click=\"{{method('relatedListActionCrmHandler')}}\"></crm-relatedlist> </div></template></template> </div></template><template case=\"false\"> <div class=\"cxDetailLoadingDiv\"> <div class=\"cxSpinloader cxLvLoader\"></div> </div> </template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropSections","cxPropRecordInformationType","cxPropRecord","cxPropRecordId","cxPropLayoutId","cxPropModuleInformationType","cxPropModuleApiName","cxPropModuleId","cxPropModuleData","cxPropShowBackButton","cxPropShowRelatedLists","cxPropRelatedListApiNames","cxPropContentOverflow","cxPropModuleName","cxPropBusinessCardDetails","cxPropExistingTags","cxPropRecordTags","cxPropMaxTagLimit","cxPropRecordOptions","cxPropNextRecord","cxPropPreviousRecord","cxPropDetailPageRoute","cxPropRelatedLists","cxPropRlData","cxPropSupportAjaxEdit","cxPropShowRecordImage","cxPropIsTagFieldSupported","cxPropSkipModuleRefresh","cxPropShowMoreButton","cxPropShowEditButton","changeOwnerDetails","fieldsInHeader","activityModules","twoFieldInHeaderModules","isRecConverted","renderComponent","recordDeleteMessage","layout_rule_execute","user_timezone","fieldColumnNameMap","lyteViewPort","recordCompData","moduleCompData","showErrorMsg","cloneAction","deleteAction","componentUniqueId"],
_observedAttributesType :["array","string","object","string","string","string","string","string","object","boolean","boolean","string","boolean","string","array","array","array","number","array","string","string","string","array","object","boolean","boolean","boolean","boolean","boolean","boolean","object","number","array","array","boolean","boolean","string","object","boolean","object","boolean","object","object","boolean","object","object","string"],
 
	data : function(){
		return {
			cxPropSections				: Lyte.attr('array',{default : []}),
			/**
             * @componentProperty { recordId | recordData } cxPropRecordInformationType=recordId
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropRecordInformationType: Lyte.attr("string", { default: "", hideAttr: true , input: true }),//no i18n
			/**
			 * @componentProperty { object } cxPropRecord
			 * @author gayathiri.ks
			 * @version 1.0.0
             * @condition cxPropRecordInformationType recordData
			 * @input
			 */
			cxPropRecord				: Lyte.attr('object', { hideAttr: true, input: true }),//no i18n
            /**
			 * @componentProperty { string } cxPropRecordId
			 * @author gayathiri.ks
			 * @version 1.0.0
             * @condition cxPropRecordInformationType recordId
			 * @input
			 */
			cxPropRecordId				: Lyte.attr('string', { default: "", hideAttr: true , input: true }),
			cxPropLayoutId				: Lyte.attr('string', { default: "", hideAttr: true }),
			/**
             * @componentProperty { moduleApiname | moduleData | moduleId } cxPropModuleInformationType=moduleApiname
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true , input: true }),//no i18n
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleApiname
			 * @input
			 */
			cxPropModuleApiName				: Lyte.attr('string', { default: "", hideAttr: true , input: true }),
			/**
			 * @componentProperty { string } cxPropModuleId
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleId
			 * @input
			 */
			cxPropModuleId				: Lyte.attr('string', { default: "", hideAttr: true , input: true }),
			/**
             * @componentProperty { object } cxPropModuleData
             * @author gayathiri.ks
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleData
			 * @input
             */
            cxPropModuleData: Lyte.attr('object', { hideAttr: true, input: true }),//no i18n
			/**
			 * @componentProperty { boolean } cxPropShowBackButton
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @input
			 */
			cxPropShowBackButton : Lyte.attr('boolean',{default : false, input: true }),//no i18n
			/**
			 * @componentProperty { boolean } cxPropShowRelatedLists
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @input
			 */
			cxPropShowRelatedLists  	: Lyte.attr('boolean',{default : true, input: true }),
			/**
			 * @componentProperty { string } cxPropRelatedListApiNames
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @input
			 */
			cxPropRelatedListApiNames 	 : Lyte.attr('string',{default : "", input: true }),//No I18N
			/**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false , input: true}), //no i18n
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropBusinessCardDetails	: Lyte.attr('array'),
			cxPropExistingTags			: Lyte.attr('array',{default : []}),
			cxPropRecordTags			: Lyte.attr('array',{default : []}),
			cxPropMaxTagLimit			: Lyte.attr('number'),
			cxPropRecordOptions			: Lyte.attr('array'),
			cxPropNextRecord			: Lyte.attr('string'),
			cxPropPreviousRecord		: Lyte.attr('string'),
			cxPropDetailPageRoute 		: Lyte.attr('string',{default : "crm.tab.module.entity.detail"}),
			cxPropRelatedLists	 		: Lyte.attr('array'),
			cxPropRlData 		 		: Lyte.attr('object'),
			cxPropSupportAjaxEdit 		: Lyte.attr('boolean',{default : false}),
			cxPropShowRecordImage		: Lyte.attr('boolean',{default : false}),
			cxPropIsTagFieldSupported	: Lyte.attr('boolean',{default : false}),
			cxPropSkipModuleRefresh 	: Lyte.attr('boolean',{default : false }),
			cxPropShowMoreButton 		: Lyte.attr('boolean',{default : true}),
			cxPropShowEditButton	 	: Lyte.attr('boolean',{default : true}),
			changeOwnerDetails 			: Lyte.attr('object'),
			fieldsInHeader				: Lyte.attr('number',{default : 2}),
			activityModules				: Lyte.attr('array',{default : ['Tasks','Calls','Events','Appointments__s']}),
			twoFieldInHeaderModules 	: Lyte.attr("array",{default : ["Leads","Contacts","Accounts","Potentials","Campaigns","Cases","Products","PurchaseOrders","PriceBooks"]}),
			isRecConverted				: Lyte.attr('boolean',{default : false}),
			renderComponent				: Lyte.attr('boolean',{default : false}),	
			recordDeleteMessage			: Lyte.attr('string'),
			layout_rule_execute			: Lyte.attr('object', { default: {} }),
			user_timezone				: Lyte.attr('boolean',{default : Crm.userDetails.USER_TIME_ZONE}),
			fieldColumnNameMap			: Lyte.attr('object', { default: {} }), // No I18N
			lyteViewPort				: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
			recordCompData 				: Lyte.attr('object',{default : {}}),
			moduleCompData 				: Lyte.attr('object',{default : {}}),
			showErrorMsg				: Lyte.attr('boolean',{default : false}),
			cloneAction					: Lyte.attr('object',{default : { "display_label": "Clone", "sub_actions": null, "clickId": "clone", "type": "list", "category": "1", "features_supported": ["cscript"],"dropItemDisabled": false,"zcqa" : "clone","disabled" : false}}),
			deleteAction				: Lyte.attr('object',{default : { "display_label": "Delete", "sub_actions": null, "clickId": "delete", "type": "list", "category": "1", "features_supported": [ "cscript" ], "dropItemDisabled": false, "zcqa" : "delete", "disabled" : false}}),
			componentUniqueId			: Lyte.attr('string',{default : Math.floor(Math.random() * Date.now()).toString()})
		};		
	},
	viewPortObs : function(){
		if(!this.getData('lyteViewPort')){
			this.initHandler();
		}
	}.observes('lyteViewPort').on('init'),
	initHandler : async function(){
		this.setData({'getRecordData' : true});
		if(!this.isEmptyObj(this.data.cxPropRecord)){
			this.data.recordCompData = this.data.cxPropRecord;
		}
		if(!this.isEmptyObj(this.data.cxPropModuleData)){
			this.data.moduleCompData = this.data.cxPropModuleData;
		}
		if(!this.data.cxPropModuleId){
			this.findModuleid(this.data.cxPropModuleInformationType);
		}else if(!(this.data.cxPropModuleData && this.data.cxPropModuleData.initialRender)){
			this.triggerModuleRequest();
		}
		var recDataType = this.data.cxPropRecordInformationType;
		if(recDataType === 'recordData'){
			if(this.getData('cxPropRecordId') !== this.getData('cxPropRecord.id')) {
				this.setData({fromComponent : true , cxPropRecordId : this.getData('cxPropRecord.id') });//No I18N
			}
			// this.getRecordData();
			var rec = this.getData('cxPropRecord');
			if(rec && !rec.$converted){
				this.setData({ 'showErrorMsg' : false , recordDeleteMessage : '' });
				this.setLayoutId(rec);
				if(this.data.refreshLayout){
					this.getLayoutDetails(this.getData('cxPropLayoutId'));
				}
			}else{
				this.setData({showErrorMsg : true , isRecConverted : rec && rec.$converted ? true : false});
			}
		}
		if(!this.data.cxPropRecordOptions){
			this.setData('cxPropRecordOptions',[	{ Basic : [this.getData('cloneAction') ,this.getData('deleteAction')] } ]);
		}
		this.setData('renderComponent',true);
		// if(!Lyte.Router){
		// 	this.removeRouter =true;
		// 	Lyte.Router = {getURL : window.Lyte.Router ? window.Lyte.Router.getURL : function(res){return res;}};
		// }
		this.listenerId = window.Lyte.addEventListener( "recordDelete" , function(){
								if(this.data){
									this.setData({recordDeleteMessage : 'Record deleted successfully' , showErrorMsg : true});
								}
							}.bind(this));
		window.Lyte.injectResources(networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("detailview"),"crm_related_list_old_flow.css"],ResourceConstants.CRM));
		await window.Lyte.injectResources([networkUtils.returnDependencyFiles(["crm-initial-load-utils.js"], ResourceConstants.CRMClient)]); //for crm helper functions in design mode
	},
	didDestroy : function(){
		// if(Lyte && Lyte.Router && this.removeRouter){
		// 	Lyte.Router = undefined;
		// }
		if(this.listenerId){
			window.Lyte.removeEventListener(this.listenerId);
		}
	},
	setLayoutId : function(record){
		var recLayout = record.Layout && record.Layout.id ? record.Layout.id : store.peekRecord('module',this.getData('cxPropModuleId')).layouts[0].id ;
		if(recLayout !== this.data.cxPropLayoutId){
			this.setData('refreshLayout',true);
		}
		this.setData({cxPropLayoutId : recLayout});
	},
	getRecordData : function(){
		var moduleid = this.data.cxPropModuleId , entityId = this.data.cxPropRecordId;
		if(!entityId || !moduleid || !store.modelFor(moduleid)){
			this.setData('showErrorMsg',!entityId || !moduleid);
			return;
		}
		var rec = store.peekRecord(moduleid, entityId) , _self = this;
		if(!rec || this.getData('getRecordData') ){
			store.findRecord(moduleid , entityId,{"approved":"both","converted":"both","formatted_currency":true,"home_converted_currency":true,on_demand_properties : "$client_portal_permission"}).then(function(res){
				if(res && res[0] && !res[0].$converted){
					_self.setData({showErrorMsg : false , recordDeleteMessage : ''});
					_self.data.cxPropRecord = res[0];
					_self.setData('recordCompData',res[0]);
					_self.setLayoutId(res[0]);
					if(_self.data.refreshLayout){
						_self.getLayoutDetails(_self.getData('cxPropLayoutId'));
					}
				}else{
					_self.setData({showErrorMsg : true , isRecConverted : res && res[0] && res[0].$converted ? true : false});
				}
				_self.setData('getRecordData',false);
			});
		}else {
			if(!rec.$converted){
				this.data.cxPropRecord = rec;
				this.setData({ 'showErrorMsg' : false , recordDeleteMessage : '' , 'recordCompData' : rec });
				_self.setLayoutId(rec);
				if(_self.data.refreshLayout){
					this.getLayoutDetails(_self.getData('cxPropLayoutId'));
				}
			}else{
				_self.setData({showErrorMsg : true , isRecConverted : true});
			}
		}
	},
	getLayoutDetails : function(layoutId){
		var sections = [] , _self = this;
		if( (!this.getData('twoFieldInHeaderModules').includes(this.data.cxPropModuleName)) || (this.getData('activityModules').includes(this.data.cxPropModuleApiName) && this.data.cxPropModuleApiName !== 'Calls') || (this.getData('cxPropModuleData.access_type') === 'team_based') ){
			this.setData('fieldsInHeader',1);
		}else{
			this.setData({'fieldsInHeader':2});
		}
		this.setData({cxPropShowEditButton : !( this.data.cxPropModuleApiName === 'Calls' || this.data.cxPropModuleApiName === 'Appointments__s' ) });
		this.setData('cxPropRecordOptions',['Events','Calls','Appointments__s'].includes(this.data.cxPropModuleApiName) ? [{ Basic : [this.getData('deleteAction')] }] : [{ Basic : [this.getData('cloneAction') ,this.getData('deleteAction')] }]);
		_self.sectionsData = undefined;
		_self.bcSectionsData = undefined;
		_self.findParentStoreRecord(_self.data.cxPropModuleId , _self.data.cxPropRecordId);
		store.findRecord('layout',layoutId,{module : this.data.cxPropModuleApiName , mode : "all"},false,true,{apiVersion : '2.2'}).then(async function(res){
			_self.setData({cxPropLayoutData : res[0],cxPropIsTagFieldSupported : false , cxPropShowRecordImage : false});
			var isLayoutRuleAvailable = await _self.fetchLayoutRule();
			var defaultSections = res[0].sections;
			var parentSections = defaultSections.filterBy({is_parent_section : true});
			defaultSections.forEach(function(section){
				if(section.type && section.type !== "used"){
					return;
				}

				if(section.api_name === "Business Card"){
					var bcFields = _self.processAjaxEditFields(section.fields,_self.data.cxPropRecordLocked,_self.data.cxPropModuleApiName,true,_self,layoutId,section.id);
					isLayoutRuleAvailable ? _self.bcSectionsData = bcFields : _self.setData({cxPropBusinessCardDetails : bcFields });
				}else if(section.api_name !== 'Quick Create' && section.api_name !== "Quick create" && section.api_name !== 'Pricing Details' && section.name !== "Record Image"){
					section.section_field = section.fields;
					section.section_name = section.display_label;
					_self.processAjaxEditFields(section.section_field,_self.data.cxPropRecordLocked,_self.data.cxPropModuleApiName,false,_self,layoutId,section.id);
					if(_self.data.cxPropModuleApiName === 'Events'){
						if(!(section.name === "Event Quick View" || section.name === "Description Information" || section.name==="Event Additional Information" || (section.name === "Event Information" && section.fields.filterBy({"column_name":"SMCREATORID"}).length))){
							sections.push(section);
						}
					}else if(_self.data.cxPropModuleApiName === 'Appointments__s'){
						if(section.api_name === "Appointment Information"){
							sections.push(section);
						}else if((section.api_name === "Reschedule Information" && _self.getData('cxPropRecord.Reschedule_Count')) || (section.api_name === "Cancellation Information" && _self.getData('cxPropRecord.Status') === 'Cancelled' )){
							sections.push(section);
						}
					}else if(_self.data.cxPropModuleApiName === 'Calls'){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
						if(_self.isCallSectionVisible(section.name , _self.getData('cxPropRecord'))){
							sections.push(section);
						}
					}
					else{
						sections.push(section);
					}
					
				}else if(section.name === "Record Image" && section.fields && section.fields[0] && section.fields[0].visible){
					_self.setData('cxPropShowRecordImage',true);
				}

				//orderInformation section handling
				if(section.parent_section){
					var parent_section = parentSections.filter((sec) => sec.api_name === section.parent_section.name);
					parent_section[0] && parent_section[0].child_sections ? parent_section[0].child_sections.pushUniqValues(section) : Lyte.objectUtils(parent_section[0] , 'add' , 'child_sections' , [section]);
				}
			});
			if(isLayoutRuleAvailable) {
				_self.sectionsData = sections;
				_self.setData({layoutSectionsProcessed : true});
			}else{
				_self.setData({cxPropSections : sections });
			}
			

		});
	},
	fetchLayoutRule : async function(){
		var _self = this, isLayoutRuleAvailable = false ,layoutCompData = {cxPropLayoutData : this.getData('cxPropLayoutData'),cxPropModuleData : this.getData('cxPropModuleData') };
		await this.fetchLayoutRuleData(layoutCompData,_self.data.cxPropLayoutId,true).then(function(res){
			if(res && res.success){
				isLayoutRuleAvailable = true;
				_self.setData('layoutRule',res.success);
				_self.processLayoutRulesForDetailView();
			}else{
				_self.setData('layout_rule_execute',{});
			}
		});
		return isLayoutRuleAvailable;
	},
	processLayoutRulesForDetailView:function(){
		var _self = this;
		window.Lyte.injectResources(networkUtils.returnDependencyFiles(["crm-detail-view-initial-files.js","crm-create-mixin.js","crm-formrules-execution-mixin.js"],ResourceConstants.CRMClient), undefined ,function(){
			Object.assign(_self, window.Lyte.registeredMixins["crm-detailview-common-utils"]);
			Object.assign(_self, window.Lyte.registeredMixins["crm-create-mixin"]);
			Object.assign(_self, window.Lyte.registeredMixins["crm-formrules-execution-mixin"]);
			var result = {rules_execution_result : {lr_exec_result : {}},layout : _self.data.cxPropLayoutData , layout_rule : _self.data.layoutRule , layoutId : _self.data.cxPropLayoutId} ;
			fiscalCustomPeriodsEnabled=window.fiscalCustomPeriodsEnabled; //eslint-disable-line @zoho/webperf/no-global-variables
			_self.execute_layoutRules(_self.getData('cxPropRecord'), result,_self);
			_self.setData({layout_rule_execute : result.rules_execution_result.lr_exec_result , layoutRuleProcessed : true});
		});
	},
	setSectionsData : function(){
		if(this.getData('layoutSectionsProcessed') && this.getData('layoutRuleProcessed')){
			this.setData({cxPropSections : this.sectionsData , cxPropBusinessCardDetails : this.bcSectionsData , layoutSectionsProcessed : false , layoutRuleProcessed : false});
		}
	}.observes('layoutSectionsProcessed','layoutRuleProcessed'),
	//Builder property observers
	recordIdObserver : function(){
		if(this.data.fromComponent){
			this.setData({fromComponent : false});
			return;
		}
		if (this.data.cxPropRecordInformationType === 'recordId' && this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record','cx-prop-is-tag-field-supported','cx-prop-show-record-image']);
		}
		this.setData('getRecordData',true);
		this.findModuleid(this.data.cxPropModuleInformationType);
		this.getRecordData();
	}.observes('cxPropRecordId'),
	recordDataObserver : function(){
		if(this.data.cxPropRecordInformationType === 'recordData'&& !this.getData('cxPropModuleData.initialRender') && this.getMethods('onBuilderPropertyRemove')){
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-id','cx-prop-is-tag-field-supported','cx-prop-show-record-image']);
		}
		this.setData({cxPropRecordId : this.getData('cxPropRecord.id') });//No I18N
		var recLocked = this.checkIfRecordIsLocked(this.getData('cxPropRecord'));
		this.setData('cxPropRecordLocked',recLocked);
	}.observes('recordCompData'),
	userRecordObserver : function(){
		this.setData({recordCompData : this.getData('cxPropRecord')});
	}.observes('cxPropRecord'),
	moduleIdObserver : function(){
		if(this.data.cxPropModuleInformationType === "moduleId"){
			if (this.getMethods('onBuilderPropertyRemove')) {
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name','cx-prop-module-data','cx-prop-business-card-details','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data','cx-prop-sections','cx-prop-is-tag-field-supported','cx-prop-show-record-image']);
			}
		}
		var _self =this;
		if(!this.getData('cxPropModuleId')){
			var modDetails = this.getModuleIdFromModuleApiname({ moduleApiname: this.getData('cxPropModuleApiName') });
			if(this.getData('cxPropModuleApiName') && (!modDetails || !modDetails.moduleName)){
					_self.setData('showErrorMsg',true);
					return;
			}
		}
		if(this.data.cxPropModuleId){
			this.triggerModuleRequest();
		}
	}.observes('cxPropModuleId'),
	triggerModuleRequest : function(){
		var _self =this;
		if(!idModuleMapping[this.data.cxPropModuleId]){
			this.setData('showErrorMsg',true);
			return;
		}
		if( this.getData('cxPropSkipModuleRefresh') && this.getData('cxPropModuleData.fields') ){
			var modData = this.getData('cxPropModuleData');
			_self.setData({'cxPropModuleApiName' : modData.api_name  , "moduleCompData" : modData , "cxPropModuleName" : modData.module_name});
			modData.api_name === "Services__s" || modData.api_name === "Appointments__s" ? 
								window.Lyte.injectResources(networkUtils.returnDependencyFiles(["crm-services-appointments.js"],ResourceConstants.CRMClient), undefined ,function(){ _self.getRecordData(); } ) : 
								_self.getRecordData();
			return;
		}
		store.findRecord('module',this.data.cxPropModuleId, undefined, false, true, {allowMultiple : true}).then(function(res){
			if(res && res[0]){
				_self.data.cxPropModuleData = res[0];
				_self.setData({'cxPropModuleApiName' : res[0].api_name  , "moduleCompData" : res[0] , "cxPropModuleName" : res[0].module_name});
				if(res[0].api_name === "Services__s" || res[0].api_name === "Appointments__s"){
					window.Lyte.injectResources(networkUtils.returnDependencyFiles(["crm-services-appointments.js"],ResourceConstants.CRMClient), undefined ,function(){
						_self.getRecordData();
					});
				}else{
					_self.getRecordData();
				}
			}
		});
	},
	moduleApinameObserver : function(){
		if(this.data.cxPropModuleInformationType === "moduleApiname"){
			if (this.getMethods('onBuilderPropertyRemove')) {
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-id','cx-prop-module-data','cx-prop-business-card-details','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data','cx-prop-sections','cx-prop-is-tag-field-supported','cx-prop-show-record-image']);
			}
		}
		var existingModId = this.getData('cxPropModuleId');
		this.findModuleid(this.data.cxPropModuleInformationType);
		if(this.getData('cxPropModuleId') && existingModId === this.getData('cxPropModuleId')){
			this.getRecordData();
		}else if(!this.getData('cxPropModuleApiName') || !this.getData('cxPropModuleId')){
			this.setData('showErrorMsg',true);
		}
	}.observes('cxPropModuleApiName'),
	moduleDataObserver : function(){
		var existingModId = this.getData('cxPropModuleId');
		if(this.data.cxPropModuleInformationType === "moduleData" && !this.getData('cxPropModuleData.initialRender') && this.getMethods('onBuilderPropertyRemove')){
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-id','cx-prop-module-api-name','cx-prop-business-card-details','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data','cx-prop-sections','cx-prop-is-tag-field-supported','cx-prop-show-record-image']);
		}
		this.setData({cxPropModuleId : this.getData('cxPropModuleData.id') , cxPropModuleApiName : this.getData('cxPropModuleData.api_name')});
		if(existingModId === this.getData('cxPropModuleId')){
			this.getRecordData();
		}else if(!this.getData('cxPropModuleId')){
			this.setData('showErrorMsg',true);
		}
	}.observes('moduleCompData'),
	userModuleDataObserver : function(){
		this.setData({moduleCompData : this.getData('cxPropModuleData')});
	}.observes('cxPropModuleData'),
	//End of builder property observers 
	methods : {
		crmAjaxEditSaveSuccessCallBack : function(response,fieldObj){
			if(this.getMethods('onAjaxEditSaveSuccess')){
				this.executeMethod('onAjaxEditSaveSuccess',response,fieldObj);
			}
			if(this.getData('cxPropModuleApiName') === 'Deals' && fieldObj && fieldObj.api_name === "Stage"){
				var moduleid = this.data.cxPropModuleId , entityId = this.data.cxPropRecordId ,_self = this;
				store.findRecord(moduleid , entityId,{"approved":"both","converted":"both","formatted_currency":true,"home_converted_currency":true,on_demand_properties : "$client_portal_permission"}).then(function(res){
					if(res && res[0]){
						_self.data.cxPropRecord = res[0];
						_self.setData('recordCompData',res[0]);
					}
				});
			}
		},
		crmAjaxEditSaveErrorCallBack : function(response){
			if(this.getMethods('onAjaxEditSaveError')){
				this.executeMethod('onAjaxEditSaveError',response);
			}
		},
		navigateToListView : function(){  
			var returnValue = true;
			if(this.getMethods('onBackButtonClick')){
				returnValue = this.executeMethod('onBackButtonClick');
			}
			if(typeof returnValue === 'object'){
				returnValue.then(function(execute){
					if(execute || execute === undefined){
						networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
							"route" : 'crm.tab.module.custom-view.list',//No I18N
							"dynamicParams" : [this.data.cxPropModuleApiName,store.peekRecord('module',this.data.cxPropModuleId).custom_view.id] //No I18N
						}), '_blank'); //No I18N
					}
				}.bind(this))
			}else if(returnValue){
				networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
					"route" : 'crm.tab.module.custom-view.list',//No I18N
					"dynamicParams" : [this.data.cxPropModuleApiName,store.peekRecord('module',this.data.cxPropModuleId).custom_view.id] //No I18N
				}), '_blank'); //No I18N
			}
			
		},
		crmEditRecordFromDetail : function(elem ,eventObj){
			var returnValue =true;
			if(this.getMethods('onEditButtonClick')){
				/**
				 * This method will be triggered When edit button is clicked in detailpage.
				 * @method onEditButtonClick
				 * @author gayathiri.ks
				 * @param {string} moduleAPIName 
				 * @param {string} recordId 
				 */
				returnValue = this.executeMethod('onEditButtonClick',this.getData('cxPropModuleApiName'),this.getData('cxPropRecordId'));
			}
			if(typeof returnValue === 'object'){
				returnValue.then(function(execute){
					if(execute || execute === undefined){
						this.detailViewEditRecord(elem ,eventObj);
					}
				}.bind(this));
			}else if(returnValue){
				this.detailViewEditRecord(elem ,eventObj);
			}
		},
		recordActionsHandling : async function(menuItem , rEvent , menuElem , origElem , selected ){
			var returnValue =true;
			if(this.getMethods('onMenuActionClick')){
				/**
				 * This method will be triggered when a menu item is clicked.
				 * @method onMenuActionClick
				 * @author gayathiri.ks
				 * @param {string} selectedMenuItem
				 * @param {string} moduleAPIName
				 * @param {string} recordId
				 */
				returnValue  = this.executeMethod('onMenuActionClick',menuItem.clickId ,this.getData('cxPropModuleApiName'),this.getData('cxPropRecordId'));
			}
			if(typeof returnValue === 'object'){
				await returnValue.then(function(execute){
					if(!(execute || execute === undefined)){
						returnValue = false;
					}
				});
			}
			if(!returnValue){
				return;
			} 
			//, eventObj , elem , origElem, selected
			var selectedAction = menuItem.clickId , _self = this;
			var Lyte = window.Lyte;
			switch(selectedAction){
				case "clone":
					if(_self.data.cxPropModuleName==="Appointments"){
						var params1 = {"from":"detailView","module":"Appointments","calleeObj":"Crm","clickId":"clonebtn"}; //No I18N
						params1.id = _self.data.cxPropRecordId;
						Crm.cloneEntity(rEvent,selected,params1);
						break;
					}
					if(_self.data.cxPropModuleName==="Events"){
						var params2 = {"from":"detailView","module":"Events","calleeObj":"Crm","clickId":"clonebtn","invitees":_self.data.cxPropRecord.Participants}; //No I18N
						params2.id = _self.data.cxPropRecordId;
						Crm.cloneEntity(rEvent,selected,params2);
						break;
					}
					networkUtils.openUrl(window.location.origin + Lyte.Router.getURL({
						"route" : "crm.tab.module.entity.clone",//No I18N
						"dynamicParams" : [_self.data.cxPropModuleName,_self.data.cxPropRecordId] //No I18N
					}), '_blank'); //No I18N
					// Crm.linkToClick("crm.tab.module.entity.clone",this.data.cxPropModuleApiName,this.data.cxPropRecordId);//No I18N 
					break;
				case "delete":
					Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-detailcanvas-utils.js','crm-detail-view-utils.js',"crm-initial-load-utils.js"], ResourceConstants.CRMClient)], undefined, function () {
						var modName = store.peekRecord('module',_self.data.cxPropModuleId).module_name;
						if (!Crm.userDetails.permissions['Crm_Implied_Delete_'+modName]) {
							Lyte.registeredMixins["crm-detailcanvas-utils"].showPermissionErrorMsgPopup();//No I18N
						}else{
							Lyte.registeredMixins["crm-detail-view-utils"].recordDeletePopup(_self.data.cxPropRecord, 2, modName, null, null, null, true,'detail_view',true);//No I18N
						}
					});
					break;
			}
		},
		crmChangeOwner : function(fieldObj){
			var Lyte = window.Lyte , _self = this;
			var successFn = function(){
				if(commonUtils && typeof commonUtils.showHideLoadingDiv === 'function'){
					commonUtils.showHideLoadingDiv(false);
				}
				store.findRecord(this.data.cxPropModuleId , this.data.cxPropRecordId,{"approved":"both","converted":"both","formatted_currency":true,"home_converted_currency":true,on_demand_properties : "$client_portal_permission"}).then(function(res){
					_self.data.cxPropRecord = res[0];
					_self.setData('recordCompData',res[0]);
				});
				// var ownerComp = window.document.getElementsByTagName('crm-change-owner')[0];
				// if(ownerComp){
				// 	ownerComp.remove();
				// }
			}
			var failureFn = function(failureRes){
				if(failureRes && failureRes.data && failureRes.data[0] && failureRes.data[0].message){
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : failureRes.data[0].message ,ltPropDuration:"3000"} } );
				}
			}
			Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-mass-actions.js','crm-mass-action-mixin.js'], ResourceConstants.CRMClient)], undefined, function () {
				customViewObject.selectedIds = [this.data.cxPropRecordId];
				Lyte.registeredMixins['crm-mass-action-mixin'].massAction("change_owner",this.getData('cxPropModuleName'),{'ids' : this.getData('cxPropRecordId'),'from':'detail_view','old_owner_id':this.getData('cxPropRecord').Owner.id,'owner_field_id':fieldObj.id},successFn.bind(this),failureFn.bind(this),"change_owner"); //no i18n
			}.bind(this));
		},
		//Related list specific methods starts here
		relatedListTableOnClick : function(rec, evnt,rl){
			if(this.getMethods('onRelatedListRowClick')){
				/**
				 * This method will be triggered on Rowclick of a related list
				 * @method onRelatedListRowClick
				 * @author gayathiri.ks
				 * @param {*} relatedRecordObject
				 * @param {*} relatedListObject
				 * @param {string} parentModuleAPIName
				 * @param {string} parentRecordId
				 */
				rec = rec && rec.$ && rec.$.toJSON ? rec.$.toJSON() : rec;
				rl = rl && rl.$ && rl.$.toJSON ? rl.$.toJSON() : rl;
				return this.executeMethod('onRelatedListRowClick',rec,rl,this.getData('cxPropModuleApiName'),this.getData('cxPropRecordId'));
			}
		},
		relatedListActionCrmHandler: async function (actionid, rlId) {
			var returnValue = true;
			if(this.getMethods('onRelatedListActionClick')){
				/**
				 * This method will be triggered when any actions for the entire related list is clicked.
				 * @method onRelatedListActionClick
				 * @author gayathiri.ks
				 * @param {string} clickedActionId
				 * @param {string} relatedListId
				 * @param {string} parentModuleName
				 * @param {string} parentRecordId
				 */
				returnValue = this.executeMethod('onRelatedListActionClick',actionid , rlId , this.getData('cxPropModuleApiName'), this.getData('cxPropRecordId'));
			}
			if(typeof returnValue === 'object'){
				await returnValue.then(function(execute){
					if(!(execute || execute === undefined)){
						returnValue = false;
					}
				});
			}
			return returnValue; 
		},
		relatedListRecordActionCrmHandler : function(actionId , recordId , rlId , element , evnt){
			if(this.getMethods('onRelatedListRecordActionIconClick')){
				return this.executeMethod('onRelatedListRecordActionIconClick',actionId , recordId , rlId , element , evnt);
			}
		}
		//Related list specific methods ends here
	},
	detailViewEditRecord : function(elem ,eventObj){
		var module = this.data.cxPropModuleName;
			var recordId = this.data.cxPropRecordId;
			var params={};
			if(module==="Calls"){
				params = {"from":"detailView","module":"Calls","calleeObj":"Crm","clickId":"editbtn"}; //No I18N
				params.id = recordId;
				Crm.editEntity(eventObj,elem,params);
			}
			else if(module==="Appointments"){
				params = {"from":"detailView","module":"Appointments","calleeObj":"Crm","clickId":"editbtn"}; //No I18N
				params.id = recordId;
				Crm.editEntity(eventObj,l,params);
			}
			else {
				var Lyte = window.Lyte;
				networkUtils.openUrl(window.location.origin + Lyte.Router.getURL({
					"route" : "crm.tab.module.entity.edit",//No I18N
					"dynamicParams" : [module,recordId] //No I18N
				}), '_blank'); //No I18N
			}
	}
}, {mixins: ["crm-crux-create-base-mixin","crm-crux-detailpage-mixin","crm-crux-create-requesthandler-mixin"]});//No I18n
Lyte.Component.registerHelper("getParticipantFieldValue",function(fieldValue){
	if(!fieldValue){
		return fieldValue;
	}else if(fieldValue && typeof fieldValue === "object"){
		var returnValue = '';
		fieldValue.forEach(function(val){
			if(val.type === "email"){
				returnValue = returnValue ? returnValue+', '+val.participant : val.participant;
			}else{
				returnValue = returnValue ? returnValue+', '+val.Email : val.Email;
			}
		});
		return returnValue;
	}
});
Lyte.Component.registerHelper("isInventoryModuleCrux",function(module){
	return "Quotes" === module || "Invoices" === module || "SalesOrders" === module || "PurchaseOrders" === module || 'Bundles__s' === module;
});
Lyte.Component.registerHelper("isLinkingModule",function(modId){ 
	var moduleName = store.peekRecord('module',modId);
	return moduleName && moduleName.module_name && moduleName.module_name.includes('LinkingModule');
});
/**
 * @syntax nonYielded
 <crm-detailview 
 cx-prop-business-card-details='[{"required":false,"field_label":"Last Name","display_label":"Last Name","api_name":"Last_Name","id":"1000000009183","data_type":"text","view_type":{"display_everywhere":true,"client_view":true},"length":255,"ui_type":1,"visible":true,"sequence":1},{"required":true,"field_label":"Email","display_label":"Email","api_name":"Email","id":"1000000009178","data_type":"email","view_type":{"display_everywhere":true,"client_view":true},"ui_type":1,"visible":true,"sequence":3},{"required":false,"field_label":"Company","display_label":"Company","api_name":"Company","id":"1000000009183","data_type":"text","view_type":{"display_everywhere":true,"client_view":true},"length":255,"ui_type":1,"sequence":4},{"required":true,"field_label":"Email","display_label":"Email","api_name":"Email","id":"1000000009178","data_type":"email","view_type":{"display_everywhere":true,"client_view":true},"ui_type":1,"sequence":5}]'
 cx-prop-content-overflow="true" 
 cx-prop-layout-id="1000000009127" 
 cx-prop-module-information-type="moduleData" 
 cx-prop-module-data='{"module_name":"DemoLead","initialRender" : true,"api_name":"Demo_Lead","id":"111113000000002405","profiles":[{"name":"Administrator","id":"111113000000000423"},{"name":"Standard","id":"111113000000000425"}],"layouts":[{"name":"Standard","display_label":"Standard","id":"111113000000003315","profiles":[{"default":true,"name":"Administrator","id":"111113000000000423","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}},{"default":true,"name":"Standard","id":"111113000000000425","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}}],"generated_type":"system","source":"crm","status":"active","visible":true}]}'
 cx-prop-module-api-name="Demo_Lead"  
 cx-prop-module-id="111113000000002405"  
 cx-prop-record='{"Company":"ZohoCrm","Layout":{"id":"1000000009127"},"No_of_Employees":10,"id":"111111000000075001","Created_Date":"2023-03-03","Last_Name":"Test Sample","Email":"test@workdrive.com"}'
 cx-prop-record-id="111111000000075001" 
 cx-prop-record-information-type="recordData" 
 cx-prop-show-record-image="true"
 cx-prop-is-tag-field-supported="true"
 cx-prop-sections='[{"id":"1000000009131","section_sequence":"1","presence":"present","section_name":"AdditionalInfo","api_name":"Additional_Info","column_count":"double_column_section","section_field":[{"required":false,"field_label":"Last Name","display_label":"Last Name","api_name":"Last_Name","id":"1000000009183","data_type":"text","view_type":{"display_everywhere":true,"client_view":true},"length":255,"ui_type":1,"sequence":1},{"required":false,"field_label":"Company","display_label":"Company","api_name":"Company","id":"1000000009183","data_type":"text","view_type":{"display_everywhere":true,"client_view":true},"length":255,"ui_type":1,"sequence":2},{"required":true,"field_label":"Email","display_label":"Email","api_name":"Email","id":"1000000009178","data_type":"email","view_type":{"display_everywhere":true,"client_view":true},"ui_type":1,"sequence":3},{"required":true,"field_label":"Created Date","display_label":"Created Date","api_name":"Created_Date","id":"1000000009178","data_type":"text","view_type":{"display_everywhere":true,"client_view":true},"ui_type":1,"sequence":4},{"required":true,"field_label":"No. of Employees","display_label":"No. of Employees","api_name":"No_of_Employees","id":"1000000009178","data_type":"integer","view_type":{"display_everywhere":true,"client_view":true},"ui_type":1,"sequence":5}]}]'></crm-detailview>
 */

/**
 * @component crm-relatedlist
 * @author gayathiri.ks
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crm-relatedlist", {
_template:"<template tag-name=\"crm-relatedlist\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxDetailLoadingDiv\"> <div class=\"cxSpinloader cxLvLoader\"></div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"if\" value=\"{{showErrorMsg}}\"><template case=\"true\"> <template is=\"if\" value=\"{{isRecConverted}}\"><template case=\"true\"><div class=\"cxPropLayoutShowErrorDiv cxPropMessageTypeFailure\"> The record is either converted/not accessible. Please check the values provided. </div></template><template case=\"false\"><div class=\"cxPropLayoutShowErrorDiv cxPropMessageTypeFailure\"> Record ID and Module API name are mismatched. Please check the values provided.</div></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(renderComponent,'&amp;&amp;',cxPropRelatedLists)}}\"><template case=\"true\"><crux-related-list-wrapper component-unique-id=\"{{componentUniqueId}}\" cx-prop-rl-action-hide=\"{{rlActionsToBeHidden}}\" cx-prop-related-lists=\"{{cxPropRelatedLists}}\" cx-prop-module=\"{{cxPropModuleApiName}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropRecordId}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-record=\"{{recordCompData}}\" cx-prop-bulk-request-to=\"{{cxPropBulkRequestTo}}\" rl-row-click=\"{{method('rlDetailRowClick')}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-show-attachment-actions=\"{{showAttachmentActions}}\" cx-prop-show-edit-delete-icons=\"false\" cx-prop-show-rl-actions=\"{{cxPropShowRlActions}}\" cx-prop-show-all-actions=\"false\" cx-prop-available-rl-actions=\"{{availableRlActions}}\" cx-prop-notes-rich-text=\"{{isNotesRichTextAvailable}}\" cx-prop-role-values=\"{{roleValues}}\" cx-prop-lyte-view-port=\"{{lyteViewPort}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\" related-list-action=\"{{method('relatedListActionCrmHandler')}}\" cx-prop-rl-data=\"{{cxPropRlData}}\" rl-rec-action=\"{{method('relatedRecordAction')}}\"></crux-related-list-wrapper></template><template case=\"false\"> <div class=\"cxDetailLoadingDiv\"> <div class=\"cxSpinloader cxLvLoader\"></div> </div> </template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropRelatedListApiNames","cxPropRelatedLists","cxPropModuleInformationType","cxPropModuleApiName","cxPropModuleId","cxPropModuleData","cxPropLayoutId","cxPropRecordInformationType","cxPropRecord","cxPropRecordId","cxPropContentOverflow","cxPropRlData","cxPropRetainInput","cxPropModuleName","cxPropRelatedListYield","cxPropBulkRequestTo","cxPropSkipModuleRefresh","showAttachmentActions","cxPropShowRlActions","isRecConverted","componentUniqueId","availableRlActions","isNotesRichTextAvailable","roleValues","renderComponent","lyteViewPort","recordCompData","showErrorMsg","rlActionsToBeHidden","unusedRelatedLists"],
_observedAttributesType :["string","array","string","string","string","object","string","string","object","string","boolean","object","boolean","string","boolean","string","boolean","boolean","boolean","boolean","string","array","boolean","array","boolean","boolean","object","boolean","array","array"],
 
	data : function(){
		return {
			/**
			 * @componentProperty { string } cxPropRelatedListApiNames
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @input
			 */
			cxPropRelatedListApiNames 	 : Lyte.attr('string',{default : "", input: true}),//No I18N
			cxPropRelatedLists	 : Lyte.attr('array'),
			/**
             * @componentProperty { moduleApiname | moduleData | moduleId } cxPropModuleInformationType=moduleApiname
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleApiname
			 * @input
			 */
			cxPropModuleApiName				: Lyte.attr('string', { default: "", hideAttr: true, input: true }),
			/**
			 * @componentProperty { string } cxPropModuleId
			 * @author gayathiri.ks
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleId
			 * @input
			 */
			cxPropModuleId				: Lyte.attr('string', { default: "", hideAttr: true, input: true }),
			/**
             * @componentProperty { object } cxPropModuleData
             * @author gayathiri.ks
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleData
			 * @input
             */
            cxPropModuleData: Lyte.attr('object', { hideAttr: true, input : true}),//no i18n
			cxPropLayoutId		 : Lyte.attr('string', { default: "", hideAttr: true }),
			/**
             * @componentProperty { recordId | recordData } cxPropRecordInformationType=recordId
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropRecordInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
			/**
			 * @componentProperty { object } cxPropRecord
			 * @author gayathiri.ks
			 * @version 1.0.0
             * @condition cxPropRecordInformationType recordData
			 * @input
			 */
			cxPropRecord				: Lyte.attr('object', {hideAttr: true, input: true}),
            /**
			 * @componentProperty { string } cxPropRecordId
			 * @author gayathiri.ks
			 * @version 1.0.0
             * @condition cxPropRecordInformationType recordId
			 * @input
			 */
			cxPropRecordId				: Lyte.attr('string', { default: "", hideAttr: true, input: true }),
			/**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author gayathiri.ks
             * @version 1.0.0
			 * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false, input: true }), //no i18n

			cxPropRlData 		 : Lyte.attr('object'),
			cxPropRetainInput : Lyte.attr("boolean",{default : false}),
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropRelatedListYield : Lyte.attr('boolean'),
			cxPropBulkRequestTo		: Lyte.attr('string',{default : 'moduleid'}),
			cxPropSkipModuleRefresh 	: Lyte.attr('boolean',{default : false }),
			showAttachmentActions 	: Lyte.attr('boolean',{default : false}),
			cxPropShowRlActions		: Lyte.attr('boolean',{default : Crm.userDetails.isRelatedListLyteEnabled}),
			isRecConverted				: Lyte.attr('boolean',{default : false}),
			componentUniqueId			: Lyte.attr('string',{default : Math.floor(Math.random() * Date.now()).toString()}),
			availableRlActions			: Lyte.attr('array',{default : ['addNew',
																		'importListPrice',
																		'newPotential',
																		'newPotentialForContacts',
																		'addContactRoles',
																		'editContactRoles',
																		'associateMxN',
																		'dissociateMxN',
																		'associateLookupRel',
																		'editLookupRel',
																		"addCampaigns",
																		'importAction']}),
			isNotesRichTextAvailable 	: Lyte.attr('boolean',{default : Crm && Crm.userDetails ? Crm.userDetails.NOTES_RICH_TEXT_SUPPORT : false}),
			roleValues 					: Lyte.attr('array'),	
			renderComponent 			: Lyte.attr('boolean',{default : false}),
			lyteViewPort				: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
			recordCompData 				: Lyte.attr('object',{default : {}}),
			showErrorMsg				: Lyte.attr('boolean',{default : false}),
			rlActionsToBeHidden  		: Lyte.attr('array',{default : ['un-EnrollSeries',"updateCampaignStatus","sendMailToMembers","newCampaignWithMembers","addToCampaigns"]}),
			unusedRelatedLists 			:	Lyte.attr('array',{default : ["CHECKLISTSPERSONALITY", "ABMACCOUNTPERSONALITY" , "WEBFORMUSAGEPERSONALITY","REVIEWPROCESSLOGPERSONALITY","CASESMAILPERSONALITY","EXPEDIAPERSONALITY","INVITEESPERSONALITY",												 
																	  "SCOREPERSONALITY","EMAILSENTIMENTPERSONALITY","JOBSHEETSPERSONALITY","Appointments_Rescheduled_History__s","SURVEYPERSONALITY","SUPPORTPERSONALITY"
																	 ,"WEBINAR_POLLS_PERSONALITY","WEBINAR_QUESTION_PERSONALITY","CHILDCAMPAIGNSPERSONALITY","CIRCUITSPERSONALITY","VOCPERSONALITY","SOCIALPERSONALITY","ZINVOICEPERSONALITY"
																	,"ZEXPENSEPERSONALITY","ZSUBSCRIPTIONSPERSONALITY","PROJECTSPERSONALITY","MESSAGESPERSONALITY","EMAILSPERSONALITY","RELATEDLISTPERSONALITY","CHECKLISTSPERSONALITY",
																	"LINKEDIN_SALES_NAVIGATOR_PERSONALITY","TASKSPERSONALITY","CALLSPERSONALITY","EVENTSPERSONALITY","APPOINTMENTSPERSONALITY","TASKSHISTORYPERSONALITY","CALLSHISTORYPERSONALITY",
																	"VISITSPERSONALITY","COMPETITORMENTIONPERSONALITY", "CONNECTEDRECORDSPERSONALITY",
																	"ABMFBTPERSONALITY","ABMCWBABPERSONALITY","ABMREBUYPERSONALITY","ABMNEXTBUYPERSONALITY","ABMFIRSTBUYPERSONALITY","CHRONOLOGICALVIEWHISTORYPERSONALITY","CHRONOLOGICALVIEWPERSONALITY",
																	"EVENTSHISTORYPERSONALITY","APPOINTMENTSHISTORYPERSONALITY","INVITEDEVENTSPERSONALITY","LOCKINGINFORMATIONPERSONALITY","ACTIVITYHISTORYPERSONALITY","ACTIVITYPERSONALITY"]})
		};		
	},
	viewPortObs : function(){
		if(!this.getData('lyteViewPort')){
			this.initHandler();
		}
	}.observes('lyteViewPort').on('init'),
	initHandler : function(){
		this.listenerId = window.Lyte.addEventListener( "relatedList" , function(data){
				this.refreshRL(data); 
		}.bind(this));
		if(!this.isEmptyObj(this.data.cxPropRecord)){
			this.data.recordCompData = this.data.cxPropRecord;
		}
		if(!this.data.cxPropModuleId){
			this.findModuleid(this.data.cxPropModuleInformationType);
		}else if(!(this.data.cxPropModuleData && this.data.cxPropModuleData.initialRender)){
			this.triggerModuleRequest();
		}
		
		var Lyte= window.Lyte ; 
		if(this.getData('cxPropModuleApiName') !== 'Price_Books'){
			Lyte.arrayUtils(this.getData('availableRlActions'),'push',"addProducts");
		}
		if(this.data.cxPropRecordInformationType === "recordId"){
			var rec = store.peekRecord(this.data.cxPropModuleId , this.data.cxPropRecordId);
			if(rec){
				this.data.cxPropRecord = rec;
				this.setData('recordCompData',rec);
				this.setLayoutId(rec);
				this.setRLData();
			}else{
				this.findRecordData();
			}
		}else if(this.data.cxPropRecordInformationType === "recordData" && this.getData('cxPropRecord')){
			this.setData('cxPropRecordId', this.getData('cxPropRecord.id'));
			this.setLayoutId(this.getData('cxPropRecord'));
			this.setRLData();
		}
		
		if(!Lyte.Globals.get('relatedList')){
			Lyte.Globals.set('relatedList' , {module : '' ,entityId : ''});
		}
		
		if(Crm.userDetails && Crm.userDetails.NOTES_RICH_TEXT_SUPPORT){
			var modelComponentResource = networkUtils.returnDependencyFiles(["crm-richtext-mixin.js","crm-notes-util.js","crm-richtext-resources.js","crm-lyte-editor-pannel.js"], ResourceConstants.CRMClient);
			modelComponentResource = modelComponentResource.concat(networkUtils.returnDependencyFiles(["crm-richtext-resources-less.css"], ResourceConstants.CRMClient, ResourceConstants.LESSDEFAULT));
			Lyte.injectResources(modelComponentResource,undefined,function(){
				this.setData('isNotesRichTextAvailable',true);
			}.bind(this));
		}
		if( this.getData('cxPropModuleData.initialRender') ){
			this.setData({cxPropRelatedLists : [{"visible":true,"module":{"api_name":"Cases","id":"961991000000000159"},"personality_name":"CASESPERSONALITY","record_operations":{"edit":true,"create":true,"bulk_edit":true,"delete":true,"disassociate":true,"assign":true},"type":"custom_lookup","sequence_number":1,"display_label":"Cases","api_name":"cases","fields":[{"lookup":{},"ui_type":1,"api_name":"Subject","enable_colour_code":false,"rollup_summary":{},"field_label":"Subject","formula":{},"id":"961991000000000663","separator":false,"decimal_place":null,"pick_list_values":[]},{"lookup":{},"ui_type":2,"api_name":"Case_Reason","enable_colour_code":false,"rollup_summary":{},"field_label":"Case Reason","formula":{},"id":"961991000000173111","separator":false,"decimal_place":null,"pick_list_values":[]},{"lookup":{},"ui_type":25,"api_name":"Email","enable_colour_code":false,"rollup_summary":{},"field_label":"Email","formula":{},"id":"961991000000000675","separator":false,"decimal_place":null,"pick_list_values":[]}],"id":"961991000002824039"}],//No I18N
						  cxPropRlData : {"961991000002824039":[{"Email":"testcase1@mail.com","Case_Reason":"test","Subject":"Case1"},{"Email":"testcase2@mail.com","Case_Reason":"fix","Subject":"Case2"}]},//No I18N
				          renderComponent:true,
						  showErrorMsg : false});
		}
		// window.Crm.userDetails.isRelatedListLyteEnabled = true;
	},
	didConnect : function(){
		if(Crm.userDetails.isMultiSelectionPopupSupported){
			var Lyte = window.Lyte , allFiles;
			var jsCssFiles = networkUtils.returnDependencyFiles(["crm-ui-loaders.js","crux-criteria-conditions.js","crm-custom-view.js","crm-custom-filter.js","crux-smart-filter.js","crux-smart-filter-input.js","crm-list-helpers.js","crux-column-list.js","crm-multi-selection-popup.js","crm-ui-loaders.css","custom-view-layer-new.css","crm-inner-list-new.css","crm-list-view-new.css","crm-list-view-crux.css"], ResourceConstants.CRMClient); 
			if(Crm.userDetails.RTL_ENABLED === true){
				jsCssFiles = jsCssFiles.concat(networkUtils.returnDependencyFiles(["crm-list-view-new-rtl.css","crm-list-view-rtl.css"],ResourceConstants.CRMClient)); //NO I18N
			}
			var I18nFiles = networkUtils.returnDependencyFiles(networkUtils.getI18nJSUrl("MultiSelectPopup"), ResourceConstants.CRM);
			var lessFiles = networkUtils.returnDependencyFiles(["crm-multi-selection-popup.css","crux-smart-filter.css"], ResourceConstants.CRMClient, ResourceConstants.LESSDEFAULT) ;
			allFiles = jsCssFiles.concat(I18nFiles).concat(lessFiles);
			Lyte.injectResources(allFiles);
		}
	},
	didDestroy : function(){
		// window.Crm.userDetails.isRelatedListLyteEnabled = false;
		if(this.listenerId){
			window.Lyte.removeEventListener(this.listenerId);
		}
	},
	findRecordData : function(refresh){
		if(!store.modelFor(this.data.cxPropModuleId) || !this.data.cxPropRecordId || !this.data.cxPropModuleId){
			this.setData('showErrorMsg', !this.data.cxPropRecordId || !this.data.cxPropModuleId);
			return;
		}
		var _self=this;
		store.findRecord(this.data.cxPropModuleId , this.data.cxPropRecordId,{"approved":"both","converted":"both","formatted_currency":true,"home_converted_currency":true,on_demand_properties : "$client_portal_permission"}).then(function(res){ 
			if(res && res[0] && !res[0].$converted){
				_self.setData('showErrorMsg',false);
				_self.data.cxPropRecord = res[0];
				_self.setData('recordCompData',res[0]); 
				_self.setLayoutId(res[0]);
				_self.setRLData(refresh);
			}else{
				_self.setData({showErrorMsg : true , cxPropRelatedLists : []});
				if(res && res[0]){
					_self.setData({isRecConverted : res[0].$converted ? true : false});
				}
			}
		});
	},
	setLayoutId : function(record){
		var recLayout = record.Layout && record.Layout.id ? record.Layout.id : store.peekRecord('module',this.getData('cxPropModuleId')).layouts[0].id ;
		this.setData({cxPropLayoutId : recLayout});
	},
	setRLData :async function(refresh){
		if(this.data.cxPropRelatedLists && !refresh){
			this.setData('renderComponent',true);
			return;
		}
		var visibleRLs = [],_self = this , rlNames=[];
		_self.findParentStoreRecord(_self.data.cxPropModuleId , _self.data.cxPropRecordId);
		if(this.data.cxPropRelatedListApiNames && this.data.cxPropRelatedListApiNames.length){
			rlNames = this.data.cxPropRelatedListApiNames.split(',');
		}
		var rlRes = [networkUtils.returnDependencyFiles(['crm-detail-view-utils.js',"crm-initial-load-utils.js"], ResourceConstants.CRMClient) , networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("Customization")],ResourceConstants.CRM)];
		if(!Crm.userDetails.isMultiSelectionPopupSupported){
			rlRes.push(networkUtils.returnDependencyFiles(["zohocrm_module_common.js"],ResourceConstants.CRM));
		}
		await window.Lyte.injectResources(rlRes,undefined,function(){
			this.setData('renderComponent',true);
		}.bind(this));
		store.findAll('related_list',{module : this.data.cxPropModuleApiName , layout_id : this.data.cxPropLayoutId} , false,true,{getActions : true}).then(function(res){
			res.forEach(function(rl){
				if(rl.visible && !_self.data.unusedRelatedLists.includes(rl.personality_name) && ((rlNames.length && rlNames.includes(rl.api_name)) || !rlNames.length)){
					if(rl.personality_name === "NOTESPERSONALITY"){
						Lyte.arrayUtils(visibleRLs,'insertAt',0,rl);
					}else if(rl.api_name !== 'Appointments_Rescheduled_History__s' && !rl.parent_related_lists){
						visibleRLs.push(rl);
					}
					if(rl.api_name === 'Contact_Roles'){
						_self.findRoleValues();
					}
				}
			});
			_self.setData('cxPropRelatedLists',visibleRLs);
		});
	},
	findRoleValues : function(){
		var selfVal = this;
		store.findAll('field',{module : 'DealContactRole'}).then(function(data){ //no i18n
			if(!selfVal.data){
				return;
			}
			selfVal.setData('roleValues',data.filter(function(item){ return item.api_name === 'Role'; })[0].pick_list_values); //no i18n
		});
	},
	//Builder property observers
	moduleIdObserver : function(){
		var _self =this;
		if(this.data.cxPropModuleInformationType === "moduleId" && this.getMethods('onBuilderPropertyRemove')){
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name','cx-prop-module-data','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data']);
		}
		if(!this.getData('cxPropModuleId')){
			var modDetails = this.getModuleIdFromModuleApiname({ moduleApiname: this.getData('cxPropModuleApiName') });
			if(this.getData('cxPropModuleApiName') && !this.getData('cxPropModuleId')){
				if(!modDetails || !modDetails.moduleName){
					return;
				}
			}
		}
		this.triggerModuleRequest();
	}.observes('cxPropModuleId'),
	triggerModuleRequest : function(){
		var _self = this;
		if( this.getData('cxPropSkipModuleRefresh') && this.getData('cxPropModuleData.fields') ){
			var modData = this.getData('cxPropModuleData');
			_self.setData({'cxPropModuleApiName' : modData.api_name , "cxPropModuleName" : modData.module_name});
			_self.findRecordData(true);
			return;
		}
		if(this.data.cxPropModuleId && idModuleMapping[this.data.cxPropModuleId]){
			store.findRecord('module',this.data.cxPropModuleId, undefined, false, true, {allowMultiple : true}).then(function(res){
				if(res && res[0]){
					_self.setData({'cxPropModuleApiName' : res[0].api_name , cxPropModuleName : res[0].module_name});
					_self.data.cxPropModuleData = res[0];
					_self.findRecordData(true);
				}
			});
		}else{
			this.setData('showErrorMsg',true);
		}
	},
	rlApiNamesObserver : function(){
		this.setRLData(true);
	}.observes('cxPropRelatedListApiNames'),
	recordIdObserver : function(){
		if (this.data.cxPropRecordInformationType === 'recordId' && this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record']);
		}
		this.findModuleid(this.data.cxPropModuleInformationType);
		this.findRecordData(true);
	}.observes('cxPropRecordId'),
	moduleApinameObserver : function(){
		if(this.data.cxPropModuleInformationType === "moduleApiname"){
			if (this.getMethods('onBuilderPropertyRemove')) {
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-id','cx-prop-module-data','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data']);
			}
		}
		var existingModId = this.getData('cxPropModuleId');
		this.findModuleid(this.data.cxPropModuleInformationType);
		if(this.getData('cxPropModuleId') && existingModId === this.getData('cxPropModuleId')){
			this.findRecordData(true);
		}else if(!this.getData('cxPropModuleApiName') || !this.getData('cxPropModuleId')){
			this.setData('showErrorMsg',true);
		}
	}.observes('cxPropModuleApiName'),
	moduleDataObserver : function(){
		if(this.data.cxPropModuleInformationType === "moduleData" && !this.getData('cxPropModuleData.initialRender') && this.getMethods('onBuilderPropertyRemove')){
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-id','cx-prop-module-api-name','cx-prop-layout-id','cx-prop-related-lists','cx-prop-rl-data']);
		}
		var existingModId = this.getData('cxPropModuleId');
		this.setData({cxPropModuleId : this.getData('cxPropModuleData.id') , cxPropModuleApiName : this.getData('cxPropModuleData.api_name')});
		if(existingModId === this.getData('cxPropModuleId')){
			this.findRecordData(true);
		}else if(!this.getData('cxPropModuleId')){
			this.setData('showErrorMsg',true);
		}
	}.observes('cxPropModuleData'),
	recordDataObserver : function(){
		if(this.data.cxPropRecordInformationType === 'recordData' && !this.getData('cxPropModuleData.initialRender') && this.getMethods('onBuilderPropertyRemove')){
				this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-id']);
		}
		this.setData({cxPropRecordId : this.getData('cxPropRecord.id') });//No I18N
	}.observes('recordCompData'),
	userRecordObserver : function(){
		this.setData({recordCompData : this.getData('cxPropRecord')});
	}.observes('cxPropRecord'),
	//Builder property observers end
	actions : {
		
	},
	refreshRL : function(data){
		var rlId;
		if(!this.data){
			return;
		}
		if(data && data.res){
			var a = typeof data.res == 'object' ? data.res : JSON.parse(data.res); //no i18n
			if(a && a[this.data.cxPropModuleApiName]){
				rlId = Object.keys(a[this.data.cxPropModuleApiName]);
				rlId = rlId.length === 1 ? rlId[0] : '';
			}
		}else if(data && data.id ){
			rlId = data.id;
		}else if(data && data.module){
			var rlsAvailable = this.getData('cxPropRelatedLists');
			rlId = rlsAvailable && rlsAvailable.length ? rlsAvailable.filter(function(item){
				var flag =false;
				if(item.module){
					if((item.module.api_name === data.module || (item.module.api_name === "Entity_Cadences__s" && data.module === "Entity_Cadences") ) && item.visible){
						flag = true;
					}
				}
				return flag;
			}) : [];
			rlId = rlId && rlId.length ? rlId[0].id : '';
		}
		var rlMeta = store.peekRecord('related_list',rlId) , param={};
		if(rlMeta && rlMeta.type === 'multiselectlookup'){
			param.fields = rlMeta.fields.map((item)=>item.api_name).join(',');//no i18n
			param.fields += ',id'; //no i18n
			var mxnFieldIdFetch = store.peekRecord('field',rlMeta.mxnfield); //no i18n
			var mxnName = mxnFieldIdFetch && mxnFieldIdFetch.multiselectlookup && mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname ? mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname : '';
			if(mxnName){
				param.fields += ','+mxnName;
				param.fields += ','+mxnName+'.$approval,'+mxnName+'.$approval_state,'+mxnName+'.$approved,'+mxnName+'.$review_process,'+mxnName+'.$review,'+mxnName+'.$stop_processing,'+mxnName+'.$locked_for_me,'+mxnName+'.$editable';
			}
		}
		Lyte.triggerEvent('refreshRlWithId',{id : rlId , fields : param.fields , refreshTemplate : data.refreshTemplate});
		if(!data.refreshTemplate){
			hideAnimatePopup('topBandPopup', true);
		}
	},
	methods : {
		rlDetailRowClick : function(rec,evnt,rl){
			if(this.getMethods('onRelatedListRowClick')){
				/**
				 * This method will be triggered on Rowclick of a related list
				 * @method onRelatedListRowClick
				 * @author gayathiri.ks
				 * @param {*} relatedRecordObject
				 * @param {*} relatedListObject
				 * @param {string} parentModuleAPIName
				 * @param {string} parentRecordId
				 */
				rec = rec && rec.$ && rec.$.toJSON ? rec.$.toJSON() : rec;
				rl = rl && rl.$ && rl.$.toJSON ? rl.$.toJSON() : rl;
				return this.executeMethod('onRelatedListRowClick',rec,rl,this.getData('cxPropModuleApiName'),this.getData('cxPropRecordId'));
			}
		},
		relatedRecordAction : function(actionId , recordId , relatedListId , element ,eventObj,relatedRecord){
			if(this.getMethods('onRelatedListRecordActionIconClick')){
				return this.executeMethod('onRelatedListRecordActionIconClick',actionId , recordId , relatedListId , element ,eventObj,relatedRecord);
			}
			var rlRec = store.peekRecord('related_list',relatedListId);
			var relatedModule = rlRec.module && rlRec.module.api_name? rlRec.module.api_name : rlRec.module;
			var Lyte = window.Lyte;
			if(actionId === "edit"){
				if(rlRec.type === "multiselectlookup"){
					relatedModule = store.peekRecord('module',rlRec.module.id).module_name;
				}
				networkUtils.openUrl(window.location.origin + Lyte.Router.getURL({
					"route" : "crm.tab.module.entity.edit",//No I18N
					"dynamicParams" : [relatedModule,recordId] //No I18N
				}), '_blank'); //No I18N
			}else if(actionId === 'unassign'){
				var md = relatedModule;
				var fm = this.getData('cxPropModuleApiName'); //no i18n
				var type;
				if(rlRec.record_operations.delete && rlRec.record_operations.disassociate){
					type = 3;
				}else if(rlRec.record_operations.delete){
					type = 2;
				}else{
					type = 1;
				}
				
				if(md === 'Activities' || md === 'Tasks' ||  md === 'Calls' || md === 'Events' || md === 'Appointments'){ //no i18n
					type = 2;
				}
				if(md === 'Campaigns' && (fm === 'Leads' || fm === 'Contacts') && [1,2,3,4,5,7].indexOf(this.data.cxPropRecord.$campaign_type) !== -1){ //no i18n
					var jsArray = networkUtils.returnDependencyFiles(["crm-campaign-disassociate-popup.js","crm-campaign-detail-utils.js"],ResourceConstants.CRMClient);
					var cssArray = networkUtils.returnDependencyFiles(["crm-campaign-disassociate-popup.css"],ResourceConstants.CRMClient);
					var totalArray = jsArray.concat(cssArray);
					var successFunc = function()
					{
						Lyte.Component.render("crm-campaign-disassociate-popup",{'pModule' : fm, 'campaignType': this.data.cxPropRecord.$campaign_type} ,"#show");
					};
					Lyte.injectResources(totalArray, undefined, successFunc.bind(this));
				}else{
					if(type === 2 && rlRec.api_name !== 'Competitors'){
						var m = relatedModule;
						if(m === "Activities"){
							m = this.data.cxPropRecord.$activity_type;
						}
						if(!Crm.userDetails.permissions.hasOwnProperty("Crm_Implied_Delete_" + m)){
							_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : I18n.getMsg("crm.delete.error"), ltPropSecondaryMessage : I18n.getMsg("crm.security.error"), ltPropButtons : [{"type":"accept","text":I18n.getMsg('crm.button.ok'),"appearance":"primary"}], ltPropButtonPosition : 'right'}, show : function(node){ node.childComp.querySelector('.alertPrimaryMsg').style = "color:#E20000"; } });
							return ;
						}
					}
					if(type === 1 && rlRec.type === "multiselectlookup" && !Crm.userDetails.permissions.hasOwnProperty("Crm_Implied_Delete_" + rlRec.linkingmodule)){
							_cruxUtils.showCustomAlert({ 
								params : { 
									ltPropPrimaryMessage : I18n.getMsg("crm.delete.error"), ltPropSecondaryMessage : I18n.getMsg("crm.security.error"), ltPropButtons : [{"type":"accept","text":I18n.getMsg('crm.button.ok'),"appearance":"primary"}], ltPropButtonPosition : 'right'
								}, show : function(node){ node.childComp.querySelector('.alertPrimaryMsg').style = "color:#E20000"; } });
							return;
					}
					// Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-detail-view-utils.js'], ResourceConstants.CRMClient)], undefined, function () {
						Lyte.registeredMixins["crm-detail-view-utils"].recordDeletePopup(relatedRecord,type,rlRec.type === "multiselectlookup" ? rlRec.connectedmodule : md,fm,this.getData('cxPropRecord'),rlRec); //no i18n
					// }.bind(this));
				}
			}
		},
		relatedListActionCrmHandler : async function(actionid , relatedlistId , element , xevent){
			window.Lyte.injectResources(networkUtils.returnDependencyFiles(["crm-radio-field-component.css"], ResourceConstants.CRMClient, ResourceConstants.LESSDEFAULT));
			var returnValue = true;
			if(this.getMethods('onRelatedListActionClick')){
				/**
				 * This method will be triggered when any actions for the entire related list is clicked.
				 * @method onRelatedListActionClick
				 * @author gayathiri.ks
				 * @param {string} clickedActionId
				 * @param {string} relatedListId
				 * @param {string} parentModuleAPIName
				 * @param {string} parentRecordId
				 */
				returnValue = this.executeMethod('onRelatedListActionClick',actionid , relatedlistId , this.getData('cxPropModuleApiName'), this.getData('cxPropRecordId'));
			}
			if(typeof returnValue === 'object'){
				await returnValue.then(function(execute){
					if(!(execute || execute === undefined)){
						returnValue = false;
					}
				});
			}
			if(!returnValue){
				return;
			}
			if(actionid === "attachDesktop" && !document.viewentityform){
				document.viewentityform = {module : {value : this.data.cxPropModuleApiName} , id : {value : this.data.cxPropRecordId}} ; 
			}
			var _self = this;
			var relatedList = store.peekRecord('related_list',relatedlistId);
			if(relatedList && relatedList.module){
				var toModule = Object.keys(moduleApiMapping).filter(function(item){return moduleApiMapping[item] == relatedList.module.api_name});
				if(toModule.length){
					toModule = relatedList.module.api_name == 'Deals' ? toModule[1] : toModule[0];
				}
			  }
			  toModule = toModule ? toModule : relatedList.module.api_name;
			switch(actionid){
				case 'associateMxN' : 
					var res = JSON.parse('{"fldName":""}');//no i18n
					res.fldName = relatedList.mxnfield;
					res.relatedlist = true;
					multiLookupsView.frameMLJSON(res);
					var param = multiLookupsView.getParamJson(res.fldName);
					param.entityId = _self.data.cxPropRecord.id;
					param.relatedlist = true;
					param.searchmodule = relatedList.connectedmodule;
					Crm.trackSpotLightAction("Multi Select Lookup - Add Click",{'Module':param.searchmodule});
					param.select = false;
					param.fldName = relatedList.mxnfield;
					param.linkingmodule = relatedList.linkingmodule;
					param.relid = relatedList.id;
					param.parentModule=_self.data.cxPropModuleName;
					multiLookupsView.submitMultiLookupForm( "addmore", Crm.getCrmBasePath() + "/Search.do", "topBandPopup", param);//no i18n
					break;
				case 'dissociateMxN' : 
					var res = {};//eslint-disable-line no-redeclare
					res.fldName = relatedList.mxnfield;
					multiLookupsView.frameMLJSON(res);
					var param = multiLookupsView.getParamJson(res.fldName);//eslint-disable-line no-redeclare
					param.entityId = _self.data.cxPropRecord.id;
					param.link = "edit";//no i18n
					param.relatedlist = true;
					param.searchmodule = relatedList.connectedmodule;
					Crm.trackSpotLightAction("Multi Select Lookup - Edit Click",{'Module':param.searchmodule});
					param.select = true;
					param.fldName = relatedList.mxnfield;
					param.linkingmodule = relatedList.linkingmodule;
					param.relid = relatedList.id;
					param.parentModule=_self.data.cxPropModuleName;
					multiLookupsView.submitMultiLookupForm( "addmore", Crm.getCrmBasePath() + "/Search.do", "topBandPopup", param);//no i18n
				break;
				case 'addNew':
					var module = _self.data.cxPropModuleApiName;
					var record = _self.data.cxPropRecord;
					if(relatedList.personality_name === "REPORTINGCONTACTSPERSONALITY") {
						if(!record.Account_Name || Object.keys(record.Account_Name).length === 0) {
							var singContact = Crm.moduleInfo.Contacts.translatedSingularLabel;
							var singAccount = Crm.moduleInfo.Accounts.translatedSingularLabel;
							_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getMsg("crm.contact.hierarchy.new_reporting_contact_error", [singContact, singAccount]) , ltPropType : "error" ,ltPropDuration : "7000" } } );
							return;
						}
					}
					var route = "crm.tab.module.create"; //No I18N
					if((moduleRecordMapping[toModule] && moduleRecordMapping[toModule].access_type === 'team_based') && (moduleRecordMapping[toModule].private_profile && moduleRecordMapping[toModule].private_profile.name === 'Requesters')){
						route = "crm.tab.requesters.module.create"; //No I18N
					}
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route" : route,//No I18N
						"dynamicParams" : [toModule] //No I18N
					}), '_blank'); //No I18N
					break;
				case 'newPotential':
				case 'newPotentialForContacts':
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route": "crm.tab.module.create",
						"dynamicParams" : [toModule === "Deals" ? "Potentials" : toModule]}
					), '_blank'); //No I18N
					break;
				case 'addContactRoles':
					var record = _self.data.cxPropRecord;
					var dataParams = {
						returnAnchor : relatedList.personality_name.toLowerCase() + '_' + relatedList.id, //no i18n
						accId : record.Account_Name ? record.Account_Name.id : ""
					};
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route": "crm.tab.module.entity.add-contact-role",
						"dynamicParams" : ["Potentials", record.id],
						"queryParams" : dataParams
					}), '_blank'); //No I18N
					break;
				case "editContactRoles":
					var record = _self.data.cxPropRecord;
					var dataParams = {
						returnAnchor : relatedList.personality_name.toLowerCase() + '_' + relatedList.id, //no i18n
						accId : record.Account_Name ? record.Account_Name.id : ""
					};
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route": "crm.tab.module.entity.edit-contact-role",
						"dynamicParams" : ["Potentials", record.id],
						"queryParams" : dataParams
					}), '_blank'); //No I18N
					break;
				case 'importAction':
					var dataParams = {
						module :relatedList.module.api_name,
						"campaignId" : _self.data.cxPropRecord.id, //No I18N
						"step" : "1"//No I18N
					};
					$L(xevent.target).attr("data-params",JSON.stringify(dataParams));//No I18N
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route": "crm.settings.import","queryParams": dataParams
					}), '_blank'); //No I18N
					break;
				case 'importListPrice':
					var dataParams = {
							module : relatedList && relatedList.module ? relatedList.module.api_name : '', //no i18n
							priceBookId : _self.data.cxPropRecord.id, //no i18n
							"step" : "1"//No I18N
					};
					networkUtils.openUrl(window.location.origin + window.Lyte.Router.getURL({
						"route" : "crm.settings.import",//No I18N
						"queryParams" : dataParams //No I18N
					}), '_blank'); //No I18N
					break;
				default : 
				var Lyte = window.Lyte;
				if(actionid === 'addSeries'){
					Lyte.registeredMixins["crm-related-list-utils"].addSeries(_self.data.cxPropModuleApiName);
				}else{
					Lyte.registeredMixins["crm-detail-view-utils"].executeRelatedListActions(actionid,relatedList,_self.data.cxPropModuleName,_self.data.cxPropRecord,xevent); //no i18n
				}
			}
		}
	}
}, {mixins: ["crm-crux-create-base-mixin","crm-crux-detailpage-mixin"]});//No I18n


/**
 * @syntax nonYielded
<crm-relatedlist cx-prop-content-overflow="true" 
cx-prop-module-information-type="moduleData" 
cx-prop-module-data='{"module_name":"DemoLead","initialRender" : true,"api_name":"Demo_Lead","id":"111113000000002405","profiles":[{"name":"Administrator","id":"111113000000000423"},{"name":"Standard","id":"111113000000000425"}],"layouts":[{"name":"Standard","display_label":"Standard","id":"111113000000003315","profiles":[{"default":true,"name":"Administrator","id":"111113000000000423","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}},{"default":true,"name":"Standard","id":"111113000000000425","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}}],"generated_type":"system","source":"crm","status":"active","visible":true}]}'
cx-prop-module-id="111113000000002405"
cx-prop-module-api-name="Demo_Lead" 
cx-prop-layout-id="1000000009127" 
cx-prop-record-information-type="recordData" 
cx-prop-record='{"Company":"ZohoCrm","Layout":{"id":"1000000009127"},"No_of_Employees":10,"id":"111111000000075001","Created_Date":"2023-03-03","Last_Name":"Test Sample","Email":"test@workdrive.com"}'
cx-prop-record-id="111111000000075001"></crm-relatedlist>
*/
Lyte.Component.register("crux-detailpage-header", {
_template:"<template tag-name=\"crux-detailpage-header\"> <div class=\"cxDvHeaderParent cxFlex cxAlignItemCenter\"> <div class=\"cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropShowBackButton}}\"><template case=\"true\"><span data-zcqa=\"backOneLevel\" class=\"zcicn-cssIcons zcicncss-arrow-back cxCP\" id=\"backbutton\" onclick=\"{{action('backButtonClickAction')}}\"></span></template></template> <div id=\"recordDetails\" class=\"cxFlex\"> <template is=\"if\" value=\"{{cxPropShowRecImage}}\"><template case=\"true\"><span data-zcqa=\"detailViewLyteimgContainer\" class=\"cxDvRecordUserImage\"> <template is=\"if\" value=\"{{headerField1[0]}}\"><template case=\"true\"> {{headerField1[0]}} </template><template case=\"false\"><template is=\"if\" value=\"{{headerField2[0]}}\"><template case=\"true\"> {{headerField2[0]}} </template></template></template></template> </span></template></template> <div class=\"cxDvRecordRight\"> <div class=\"cxDvRecordName cxFlex cxAlignItemCenter\"> <span id=\"recHeader1\" class=\"cxDvRecordHeader1\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(headerField1,'===','Unknown'),'||',cxPropBusinessCardDetails[0].showDefaultValue)}}\"><template case=\"true\"> {{headerField1}} </template><template case=\"false\"><crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{cxPropBusinessCardDetails[0]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" field-id-val=\"title_fieldElem\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;column_name&quot;,&quot;value_input_zcqa&quot;:&quot;column_name&quot;}\"></crux-detailpage-field-details></template></template> </span> <template is=\"if\" value=\"{{expHandlers(headerField1,'&amp;&amp;',headerField2)}}\"><template case=\"true\"><span id=\"headerHypen\" class=\"cxDvRecordHeaderhypen\">-</span></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropNoOfFieldsInHeader,'===',2)}}\"><template case=\"true\"><span id=\"recHeader2\" class=\"cxDvRecordHeader2\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{cxPropBusinessCardDetails[1]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" field-id-val=\"title_fieldElem\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;column_name&quot;,&quot;value_input_zcqa&quot;:&quot;column_name&quot;}\"></crux-detailpage-field-details> </span></template></template> </div> <div class=\"cxDvRecordEmail\">{{cxPropRecord['Email']}}</div> <template is=\"if\" value=\"{{cxPropIsTagFieldSupported}}\"><template case=\"true\"><div class=\"cx_detail_record_tags\" id=\"cx_detail_record_tags\"> <crux-detailpage-tags data-zcqa=\"detailViewLyteTag\" component-unique-id=\"{{componentUniqueId}}\" class=\"cxDvTagIconPosition\" cx-prop-existing-tags=\"{{cxPropExistingTags}}\" cx-prop-record-tags=\"{{cxPropRecordTags}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" on-tag-save=\"{{method('onTagSave')}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"></crux-detailpage-tags> </div></template></template> </div> </div> </div> <div class=\"cxAlignItemCenter cxFlex recBtnSection\"> <template is=\"if\" value=\"{{cxPropShowEditButton}}\"><template case=\"true\"><lyte-button data-zcqa=\"edit\" onclick=\"{{action('editRecord',this)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n(\"Edit\")}}</template> </lyte-button></template></template> <template is=\"if\" value=\"{{cxPropShowMoreButton}}\"><template case=\"true\"><lyte-button data-zcqa=\"CustomizeTools\" class=\"cxDvApprovalMoreOptionsBtn\" id=\"record_options\"> <template is=\"registerYield\" yield-name=\"text\"> <span class=\"cxDetailHeader cruxSprite cxMoreIconHor\"></span> </template> </lyte-button></template></template> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"lyte-button#record_options\" on-menu-click=\"{{method('menuOptionSelected')}}\" on-before-close=\"{{method('checkForSubmenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template items=\"{{cxPropRecordOptions}}\" item=\"value\" index=\"index\" is=\"for\"> <template object=\"{{value}}\" value=\"group\" key=\"key\" is=\"forIn\"> <lyte-menu-group> <template items=\"{{group}}\" item=\"item\" index=\"index\" is=\"for\"> <lyte-menu-item id=\"parentMenu_{{item.clickId}}\" data-value=\"{{item}}\" data-zcqa=\"{{item.zcqa}}\" lt-prop-disabled=\"{{item.disabled}}\"> <lyte-menu-label>{{item.display_label}}</lyte-menu-label> <lyte-menu-description>{{item.description}} </lyte-menu-description> </lyte-menu-item> </template> </lyte-menu-group> </template> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"submenu\" lt-prop-position=\"right\" lt-prop-show=\"{{showSubmenu}}\" lt-prop-yield=\"true\" lt-prop-event=\"click/mouseenter\" lt-prop-query=\"lyte-menu-item#parentMenu_{{currentSubmenuId}}\" on-menu-click=\"{{method('menuOptionSelected')}}\" on-before-close=\"{{method('checkForSubmenu')}}\" on-close=\"{{method('closeSubmenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template items=\"{{submenuOptions}}\" item=\"submenu\" index=\"index\" is=\"for\"> <lyte-menu-item lt-prop-disabled=\"{{item.disabled}}\" id=\"subMenu_{{submenu.clickId}}\" data-value=\"{{submenu}}\"> <lyte-menu-label>{{submenu.display_label}}</lyte-menu-label> <lyte-menu-description>{{submenu.description}} </lyte-menu-description> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <template is=\"if\" value=\"{{expHandlers(cxPropPreviousRecord,'||',cxPropNextRecord)}}\"><template case=\"true\"><lyte-navigator on-next=\"{{method('navigateToNextRecord')}}\" on-previous=\"{{method('navigateToPreviousRecord')}}\" lt-prop-show-only-icon=\"true\" style=\"margin-left: 20px;\"></lyte-navigator></template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,1,1]},{"type":"if","position":[1,1,3,3,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,3]},{"type":"if","position":[1,1,3,3,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,5]},{"type":"if","position":[1,1,3,3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"text","position":[1,1,3,3,3,0]},{"type":"attr","position":[1,1,3,3,5]},{"type":"if","position":[1,1,3,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"registerYield","position":[1,3,5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,5]},{"type":"attr","position":[1,3,7]},{"type":"registerYield","position":[1,3,7,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,7]},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["cxPropBusinessCardDetails","cxPropRecord","headerField1","headerField2","cxPropRecordOptions","currentSubmenuId","submenuOptions","showSubmenu","cxPropNextRecord","cxPropPreviousRecord","cxPropDetailPageRoute","cxPropExistingTags","cxPropModule","cxPropRecordTags","cxPropMaxTagLimit","cxPropShowMoreButton","cxPropShowEditButton","cxPropNoOfFieldsInHeader","cxPropSupportAjaxEdit","cxPropShowRecImage","cxPropLayoutId","cxPropIsTagFieldSupported","cxPropModuleName","componentUniqueId"],
_observedAttributesType :["array","object","string","string","array","string","array","boolean","string","string","string","array","string","array","number","boolean","boolean","number","boolean","boolean","string","boolean","string","string"],

	data : function(){
		return {
			cxPropBusinessCardDetails : Lyte.attr('array'),
			cxPropRecord : Lyte.attr('object'),
			headerField1 : Lyte.attr('string'),
			headerField2 : Lyte.attr('string'),
			cxPropRecordOptions : Lyte.attr('array'),
			currentSubmenuId : Lyte.attr('string'),
			submenuOptions : Lyte.attr('array'),
			showSubmenu : Lyte.attr('boolean',{default : false}),
			cxPropNextRecord : Lyte.attr('string'),
			cxPropPreviousRecord : Lyte.attr('string'),
			cxPropDetailPageRoute : Lyte.attr('string'),
			cxPropExistingTags : Lyte.attr('array'),
			cxPropModule : Lyte.attr("string"),
			cxPropRecordTags : Lyte.attr('array'),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropShowMoreButton : Lyte.attr('boolean'),
			cxPropShowEditButton : Lyte.attr('boolean'),
			cxPropNoOfFieldsInHeader : Lyte.attr('number'),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropShowRecImage : Lyte.attr('boolean',{default : true}),
			cxPropLayoutId : Lyte.attr("string"),
			cxPropIsTagFieldSupported : Lyte.attr('boolean',{default : true}),
			cxPropModuleName 	 : Lyte.attr('string'),
			componentUniqueId	: Lyte.attr('string')
		}	;	
	},
	init : function(){
		this.setHeaderFields();
	},
	recordObserver:function(){
		this.setHeaderFields();
	}.observes('cxPropBusinessCardDetails','cxPropRecord'),
	setHeaderFields : function(){
		var card1,card2;
		var field1,field2;
		field1 = this.data.cxPropBusinessCardDetails[0]; 

		if(field1.showDefaultValue){
			this.setData({headerField1 : field1.titleCardDefaultValue});
			return;
		}
		
		card1 =(field1.data_type === 'lookup' || field1.data_type === 'ownerlookup') ? this.data.cxPropRecord[field1.api_name] ? this.data.cxPropRecord[field1.api_name].name : "" : this.data.cxPropRecord[field1.api_name];
		card1 = field1.includeSalutation && this.data.cxPropRecord['Salutation'] ? this.data.cxPropRecord['Salutation'] + ' ' + card1 : card1;
		if(this.getData('cxPropNoOfFieldsInHeader') === 2){
			field2 = this.data.cxPropBusinessCardDetails[1];
			card2 =(field2.data_type === 'lookup' || field2.data_type === 'ownerlookup') ? this.data.cxPropRecord[field2.api_name] ? this.data.cxPropRecord[field2.api_name].name : "" : this.data.cxPropRecord[field2.api_name];
			card2 = field2.includeSalutation && this.data.cxPropRecord['Salutation'] ? this.data.cxPropRecord['Salutation'] + ' ' + card2 : card2;
		}
		if(field1 && field1.field_component_type === "activity_mml" && this.cruxGetActivityMMLObj){
			this.setData({activity_mml_obj : this.cruxGetActivityMMLObj( this.getData('cxPropModule') , this.getData('cxPropRecord') , field1 ) });
		}
		if(!card1 && !card2 && !this.data.activity_mml_obj){
			card1 = 'Unknown';
		}
		this.setData({headerField1 : card1, headerField2 : card2});
	},
	actions : {
		backButtonClickAction : function(){
			if(this.getMethods('backBtnMethod')){
				this.executeMethod('backBtnMethod');
			}
		},
		editRecord : function(elem){
			if(this.getMethods('recordHeaderEditCallback')){
				this.executeMethod('recordHeaderEditCallback',elem,event);
			}
		}
	},
	methods : {
		menuOptionSelected : function(value,event,element, menuoriginElem , clickedItemDetail){
			var menuItem = JSON.parse(value);
			if(menuItem.submenu){
				this.setData({currentSubmenuId : menuItem.clickId , submenuOptions : menuItem.submenu ,showSubmenu : true});
			}else{
				this.setData({currentSubmenuId : '' , submenuOptions : [] ,showSubmenu : false});
				if(this.getMethods("excuteRecordActions")){
					this.executeMethod("excuteRecordActions",menuItem,event,element, menuoriginElem , clickedItemDetail);
				}
			}
		},
		checkForSubmenu : function(ele , event){
			if(this.getData('currentSubmenuId') && !(event.target && event.target.className && event.target.className.includes('lytemenufreezelayer'))){
				return false;
			}
			return true;
		},
		closeSubmenu : function(){
			this.setData({currentSubmenuId : '' , submenuOptions : [] ,showSubmenu : false});
		},
		navigateToNextRecord : function(){
			Lyte.Router.transitionTo(this.getData('cxPropDetailPageRoute'),this.getData('cxPropModule'),this.getData('cxPropNextRecord'));
		},
		navigateToPreviousRecord : function(){
			Lyte.Router.transitionTo(this.getData('cxPropDetailPageRoute'),this.getData('cxPropModule'),this.getData('cxPropPreviousRecord'));
		}
	}
},{mixins : ["crm-crux-detailpage-mixin"]});

Lyte.Component.register("crux-detailpage-wrapper", {
_template:"<template tag-name=\"crux-detailpage-wrapper\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropModule,'&amp;&amp;',cxPropSections),'&amp;&amp;',cxPropBusinessCardDetails),'&amp;&amp;',cxPropRecord)}}\"><template case=\"true\"> <crux-detailpage-header cx-prop-business-card-details=\"{{cxPropBusinessCardDetails}}\" cx-prop-record=\"{{cxPropRecord}}\" back-btn-method=\"{{method('executeBackBtn')}}\" record-header-edit-callback=\"{{method('recordWrapperEditCallback')}}\" cx-prop-record-options=\"{{cxPropRecordOptions}}\" excute-record-actions=\"{{method('excuteRecordActions')}}\" cx-prop-next-record=\"{{cxPropNextRecord}}\" cx-prop-previous-record=\"{{cxPropPreviousRecord}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-existing-tags=\"{{cxPropExistingTags}}\" cx-prop-record-tags=\"{{cxPropRecordTags}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-show-rec-image=\"{{cxPropShowRecImage}}\" on-tag-save=\"{{method('onRecordTagsSave')}}\" cx-prop-is-tag-field-supported=\"{{cxPropIsTagFieldSupported}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-show-more-button=\"{{cxPropShowMoreButton}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-show-edit-button=\"{{cxPropShowEditButton}}\" cx-prop-no-of-fields-in-header=\"{{cxPropNoOfFieldsInHeader}}\" cx-prop-show-back-button=\"{{cxPropShowBackButton}}\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"></crux-detailpage-header> <div class=\"cxDvWrapParent\"> <template is=\"if\" value=\"{{expHandlers(cxPropBusinessCardDetails.length,'>',cxPropNoOfFieldsInHeader)}}\"><template case=\"true\"><div class=\"dv_details_bc_section cxDvBcSection cxDvTabContent\"> <crux-detailpage-sections id=\"businesscard_section\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-ajax-request-to=\"{{cxPropAjaxRequestTo}}\" change-owner-section-callback=\"{{method('changeOwner')}}\" on-save=\"{{method('onSave')}}\" on-error=\"{{method('onError')}}\" ajax-save-handler=\"{{method('saveDetailAjax')}}\" self-execution=\"{{selfExecution}}\" record-is-in-ajax-edit=\"{{recordIsInAjaxEdit}}\" field-id-val=\"business_fieldElem\" cx-prop-business-card-details=\"{{cxPropBusinessCardDetails}}\" is-business-card-section=\"true\" cx-prop-no-of-fields-in-header=\"{{cxPropNoOfFieldsInHeader}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-self-execution=\"{{cxPropSelfExecution}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-layout-rules=\"{{cxPropLayoutRules}}\"> <template is=\"registerYield\" yield-name=\"detailSectionField\"> <lyte-yield yield-name=\"field-{{fieldObj.yieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-sections> </div></template></template> <div class=\"dv_details_section\"> <div id=\"detailview_tabheader\"> <lyte-nav class=\"lyteOuterNav cxDvLyteNav\" lt-prop-type=\"collapse\" lt-prop-user-value=\"label\" lt-prop-system-value=\"id\" lt-prop-nav-yield=\"true\" lt-prop-menu-yield=\"true\" lt-prop-items=\"{{cxPropDetailTabs}}\" lt-prop-max-width=\"70%\"> <template is=\"registerYield\" yield-name=\"nav\"> <template is=\"for\" items=\"{{items}}\" item=\"tab\" index=\"index\"> <lyte-nav-item id=\"header_{{tab.id}}\" class=\"cxDvNavItem cxDvShowHideArrowWrap\" data-value=\"{{tab.id}}\" onclick=\"{{action('scrollToContent',tab)}}\"><span class=\"cxDvShowHideArrowAnim\"></span> {{tab.label}}</lyte-nav-item> </template> </template> <template is=\"registerYield\" yield-name=\"menu\"> <lyte-menu-body> <template is=\"for\" items=\"{{items}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.id}}\" onclick=\"{{action('scrollToContent',item)}}\">{{item.label}}</lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-nav> </div> <div id=\"detailview_bodyContent\" class=\"cxDvBodyContent\"> <div id=\"detail_tab_content\" class=\"rl_scroll_header cxDvTabContent\"> <template items=\"{{cxPropSections}}\" item=\"section\" index=\"index\" is=\"for\"><div class=\"dvSectionContainer\"> <crux-detailpage-sections class=\"{{cruxGetShowHideClassForLR(section,cxPropLayoutRules,cxPropLayoutId,if(section.isSubformSection,'subform','section'))}}\" cx-prop-all-sections=\"{{cxPropSections}}\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-ajax-request-to=\"{{cxPropAjaxRequestTo}}\" change-owner-section-callback=\"{{method('changeOwner')}}\" on-save=\"{{method('onSave')}}\" on-error=\"{{method('onError')}}\" ajax-save-handler=\"{{method('saveDetailAjax')}}\" self-execution=\"{{selfExecution}}\" record-is-in-ajax-edit=\"{{recordIsInAjaxEdit}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-scroll-selector=\"{{cxPropScrollSelector}}\" cx-prop-section-data=\"{{section}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-self-execution=\"{{cxPropSelfExecution}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-layout-rules=\"{{cxPropLayoutRules}}\"> <template is=\"registerYield\" yield-name=\"detailSectionField\"> <lyte-yield yield-name=\"field-{{fieldObj.yieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-sections> </div></template> </div> <template is=\"if\" value=\"{{cxPropShowRelatedLists}}\"><template case=\"true\"> <crux-related-list-wrapper cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" cx-prop-related-list-yield=\"{{cxPropRelatedListYield}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-related-lists=\"{{cxPropRelatedLists}}\" cx-prop-rl-data=\"{{cxPropRlData}}\" related-list-action=\"{{method('relatedListAction')}}\" rl-rec-action=\"{{method('rlRecAction')}}\" cx-prop-record=\"{{cxPropRecord}}\" rl-row-click=\"{{method('rlDetailRowClick')}}\"> </crux-related-list-wrapper> </template></template> </div> </div> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,3,1,1]},{"type":"registerYield","position":[3,3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,2]},{"type":"componentDynamic","position":[1]}]}]},{"type":"registerYield","position":[3,3,1,1,3],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3,1,1]},{"type":"attr","position":[3,3,3,1,1]},{"type":"for","position":[3,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]},{"type":"attr","position":[3,3,3,3]},{"type":"if","position":[3,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropModule","cxPropLayoutId","recordIsInAjaxEdit","cxPropRecord","cxPropSections","cxPropEntityId","cxPropBusinessCardDetails","cxPropModuleId","cxPropModuleData","cxPropModuleName","cxPropDetailTabs","selfExecution","cxPropRelatedLists","cxPropRlData","cxPropRecordOptions","cxPropRelatedListYield","cxPropNextRecord","cxPropPreviousRecord","cxPropDetailPageRoute","cxPropExistingTags","cxPropRecordTags","cxPropMaxTagLimit","cxPropShowRelatedLists","cxPropAjaxRequestTo","cxPropShowMoreButton","cxPropShowEditButton","cxPropShowBackButton","cxPropNoOfFieldsInHeader","cxPropSupportAjaxEdit","cxPropShowRecImage","cxPropIsTagFieldSupported","componentUniqueId","cxPropSelfExecution","cxPropUserTimeZone","cxPropFieldColumnMap","cxPropLayoutRules","cxPropScrollSelector","cxPropRlActionHide"],
_observedAttributesType :["string","string","boolean","object","array","string","array","string","object","string","array","boolean","array","object","array","boolean","string","string","string","array","array","number","boolean","string","boolean","boolean","boolean","number","boolean","boolean","boolean","string","boolean","string","object","object","string","array"],
 
	data : function(){
		return {
			cxPropModule : Lyte.attr("string"),
			cxPropLayoutId : Lyte.attr("string"),
			recordIsInAjaxEdit : Lyte.attr("boolean",{default : false}),
			cxPropRecord : Lyte.attr("object"),
			cxPropSections : Lyte.attr('array'),
			cxPropEntityId : Lyte.attr("string"),
			cxPropBusinessCardDetails : Lyte.attr("array"),
			cxPropModuleId : Lyte.attr("string"),
			cxPropModuleData : Lyte.attr('object'),
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropDetailTabs : Lyte.attr('array',{default : [{id : "overview_tab" , label : "Overview"},{id : "timeline_tab" , label : "Timeline"},{id : "dataprivacy_tab" , label : "Data Privacy"}]}),
			selfExecution : Lyte.attr('boolean',{default : false}),
			cxPropRelatedLists : Lyte.attr('array',{default : []}),
			cxPropRlData : Lyte.attr('object'),
			cxPropRecordOptions : Lyte.attr('array'),
			cxPropRelatedListYield : Lyte.attr('boolean',{default : false}),
			cxPropNextRecord : Lyte.attr('string'),
			cxPropPreviousRecord : Lyte.attr('string'),
			cxPropDetailPageRoute : Lyte.attr('string',{default : "crm.tab.module.entity.detail"}),
			cxPropExistingTags : Lyte.attr('array'),
			cxPropRecordTags : Lyte.attr('array'),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropShowRelatedLists : Lyte.attr('boolean',{default : true}),
			cxPropAjaxRequestTo : Lyte.attr('string',{default : "moduleapiname"}),
			cxPropShowMoreButton : Lyte.attr('boolean',{default : true}),
			cxPropShowEditButton : Lyte.attr('boolean',{default : true}),
			cxPropShowBackButton : Lyte.attr('boolean',{default : true}),
			cxPropNoOfFieldsInHeader : Lyte.attr('number',{default : 2}),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropShowRecImage : Lyte.attr('boolean',{default : true}),
			cxPropIsTagFieldSupported : Lyte.attr('boolean',{default : true}),
			componentUniqueId	: Lyte.attr('string',{default : '1234'}) ,
			cxPropSelfExecution	: Lyte.attr('boolean',{default : true}),
			cxPropUserTimeZone : Lyte.attr('string',{default : ''}),
			cxPropFieldColumnMap : Lyte.attr('object',{default : {}}),
			cxPropLayoutRules : Lyte.attr('object',{default : {}}),
			cxPropScrollSelector : Lyte.attr('string',{default : 'crux-detailpage-wrapper'}),
			cxPropRlActionHide : Lyte.attr('array',{default : []})
		};		
	},
	init : function(){ 
		var _self = this;
		//For Crm
		// if(!this.getData('cxPropModule') && this.getData('cxPropModuleId')){
		// 	store.findRecord('module',_self.data.cxPropModuleId).then(function(res){
		// 		_self.setData({cxPropModule : res[0].api_name , cxPropModuleData : res[0]});
		// 	})
		// }
		// if(!this.getData('cxPropRecord') && this.getData('cxPropModuleId') && this.getData('cxPropEntityId')){
		// 	this.setData('selfExecution',true);
		// 	store.findRecord(_self.data.cxPropModuleId , _self.data.cxPropEntityId).then(function(res){
		// 		_self.setData('cxPropRecord' , res[0]);
		// 	})
		// }
		
		//Based On core structure
        if( !this.getData('cxPropModuleId') && this.getData('cxPropModule')){
            store.findRecord('module',_self.data.cxPropModule).then(function(res){
                _self.setData({cxPropModuleId : res[0].id , cxPropModuleData : res[0]});
            });
        }
        if(!this.getData('cxPropRecord') && this.getData('cxPropModule') && this.getData('cxPropEntityId')){
            this.setData('selfExecution',true);
            store.findRecord(_self.data.cxPropModule , _self.data.cxPropEntityId).then(function(res){
                _self.setData('cxPropRecord' , res[0]);
            });
        }

		this.getPageTabValues();
		  
	},
	getLayoutDetails : function(){
		var _self = this;
		//For Crm
		// if(!this.getData('cxPropSections') && this.getData('cxPropLayoutId')){
		// 	store.findRecord('layout', _self.data.cxPropLayoutId ,{module : _self.data.cxPropModule}).then(function(res){
		// 		_self.setData('cxPropSections', res[0].sections );
		// 	})
		// }
		// //change following request to core business card request pattern
		// if(!this.getData('cxPropBusinessCardDetails') && this.getData('cxPropLayoutId')){
		// 	store.findRecord('layout', _self.data.cxPropLayoutId ,{module : _self.data.cxPropModule , mode : "business_card"}).then(function(res){
		// 		_self.setData('cxPropBusinessCardDetails', res[0].sections[0].fields );
		// 	})
		// }

		//Based On core structure
		if(!this.getData('cxPropSections') && this.getData('cxPropLayoutId')){
            store.findAll('section',{module : _self.data.cxPropModule , layoutId : this.data.layoutId}).then(function(res){
                var bCard,otherSections = [];
				res[0].sections.filter(function(section){
                    if( !_self.getData("cxPropBusinessCardDetails") && section.api_name === "Business_Card"){
                        bCard = section;
                    }else if(section.api_name !== "Quick_Create"){
						otherSections.push(section);
					}
                });
                _self.setData({'cxPropBusinessCardDetails': bCard[0].section_field , cxPropSections : otherSections});
            });
        }
	}.observes('cxPropModule'),
	actions : {
		// Functions for event handling
		scrollToContent : function(tab){
			if(tab.id === "details_tab"){
				$L('#detailview_bodyContent').scrollTo($L('#detail_tab_content'),{ duration: 400,offset: { top: 0 } });
			}else{
				$L('#detailview_bodyContent').scrollTo($L('#'+tab.api_name+"__"+tab.id),{ duration: 400,offset: { top: - 20 } });
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		executeBackBtn : function(){
			if(this.getMethods('backBtnUserMethod')){
				return this.executeMethod('backBtnUserMethod');
			}
		},
		recordWrapperEditCallback : function(elem, eventObj){
			if(this.getMethods('recordEditCallback')){ 
				return this.executeMethod('recordEditCallback',elem, eventObj);  
			}
		},
		excuteRecordActions : function(value,event,element, menuoriginElem , clickedItemDetail){
			if(this.getMethods('excuteRecordActions')){
				return this.executeMethod('excuteRecordActions',value,event,element, menuoriginElem , clickedItemDetail);
			}
		},
		saveDetailAjax : function(changedData , fieldObj){
			if(this.getMethods('ajaxEditSave')){
				return this.executeMethod('ajaxEditSave',changedData,fieldObj);
			}
		},
		onSave : function(successRes,fieldObj){ 
			if(this.getMethods('onSaveAjax')){
				return this.executeMethod('onSaveAjax',successRes,fieldObj);
			}
		},
		onError : function(errorRes){
			if(this.getMethods('onErrorAjax')){
				return this.executeMethod('onErrorAjax',errorRes);
			}
		},
		relatedListAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListAction')){
				return this.executeMethod('relatedListAction',actionId, rlId , elem , eventObj);
			}
		},
		rlRecAction : function(actionId,recId,rlId,elem,eventObj,record){
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',actionId ,recId , rlId , elem , eventObj,record);
			}
		},
		rlDetailRowClick : function(rec,evnt,rl){
			if(this.getMethods('relatedListRowClick')){
				return this.executeMethod('relatedListRowClick',rec,evnt,rl);
			}
		},
		onRecordTagsSave : function(allTags,newlyCreatedTags){
			if(this.getMethods('onTagsSave')){
				return this.executeMethod('onTagsSave',allTags,newlyCreatedTags);
			}
		},
		changeOwner : function(fieldObject , userId ,fieldElem){
			if(this.getMethods('userChangeOwner')){
				return this.executeMethod('userChangeOwner',fieldObject , userId ,fieldElem);
			}
		}
	},
	didConnect : function(){
		// this.setDVBodyHeight();
		// window.addEventListener('resize',this.setDVBodyHeight);
        // $L('#detailview_bodyContent').scroll().scrollspy({query:".rl_scroll_header",activeClass : 'headerActive', onChange : function(current, changed, scrollDiv){
		// 	if(changed){
		// 		$L('.lyteNavActive').removeClass('lyteNavActive');
		// 	}
		// 	if(current){
		// 			if(current.id === "detail_tab_content"){
		// 				$L('#header_details_tab').addClass('lyteNavActive')
		// 			}else{
		// 			var correspondingHeader = current.id.split('__');
		// 			if(correspondingHeader && correspondingHeader[1]){
		// 				$L('#header_'+correspondingHeader[1]).addClass('lyteNavActive');
		// 			}
		// 		}
		// 	}
		// }})
	},
	didDestroy : function(){
		window.removeEventListener('resize',this.setDVBodyHeight);
	},
	setDVBodyHeight : function(){
		var detailviewbodycontent = $L('#detailview_bodyContent');
        var detailviewbodyheight = window.innerHeight - detailviewbodycontent.offset().top;
        var wmsbarheight = $L('.wms-chatwindowcontainer').height();
        detailviewbodycontent.height(detailviewbodyheight - (wmsbarheight ? wmsbarheight + 40 : 60)); //40px is the top and bottom padding value
	},
	getPageTabValues : function(){
		var pageTabDetails = [];
		var rlMetaData = this.getData('cxPropRelatedLists');
		pageTabDetails[0] = {id : "details_tab" , label : "Details"};
		if(rlMetaData.length){
			rlMetaData.forEach(function(item){
				var dummy = {};
				dummy.id = item.id;
				dummy.label = item.display_label;
				dummy.api_name = item.api_name;
				pageTabDetails.push(dummy);
			});
		}
		this.setData('cxPropDetailTabs' , pageTabDetails);
	}
});

Lyte.Component.registerHelper("cruxGetShowHideClassForLR", function(config,lR_exec_result,layoutId,type){
	if(!lR_exec_result || !config || !type)
	{
		return '';
	}
	
	if(type === 'field') //eslint-disable-line @zoho/zstandard/no-ifel
	{
		
		if(lR_exec_result && lR_exec_result.LRfieldvsMandate && lR_exec_result.LRfieldvsMandate[config.api_name] && config[layoutId] && !config[layoutId].isLayoutConfigLevelMandatory)
		{
			config[layoutId].required = lR_exec_result.LRfieldvsMandate[config.api_name] === 'true';			
		}
		
		if(lR_exec_result && lR_exec_result.LRfieldvsShowType && lR_exec_result.LRfieldvsShowType[config.api_name] === 'hide')
		{
			return 'cxHide';//No I18N
		}
	}
	else if (type === 'section')
	{
		var secname = config.api_name ? config.api_name.replace(/ |'/g,"_") :'';//No I18N
		if(lR_exec_result && lR_exec_result.LRsectionvsShowType && lR_exec_result.LRsectionvsShowType[secname] === 'hide')
		{
			return 'cxHide';//No I18N
		}
		if(lR_exec_result && lR_exec_result.LRfieldvsShowType && config.fields)
		{
			var allFieldsHidden = true;
			config.fields.forEach( function( field){
				if(!allFieldsHidden)
				{
					return;
				}
				// column.forEach(function(field){
					if(!lR_exec_result.LRfieldvsShowType[field.api_name] || lR_exec_result.LRfieldvsShowType[field.api_name]!=='hide')
					{
						allFieldsHidden = false;
					}
				// });
			});
			if(allFieldsHidden)
			{
				return 'cxHide';//No I18N
			}
		}
	}
	else if (type === 'subform')
	{
		var subname = config.subform_apiname ? config.subform_apiname : config.fields ? config.fields.filterBy({ui_type:500})[0].api_name : '';//No I18N
		if(lR_exec_result && lR_exec_result.LRsubformvsShowType && lR_exec_result.LRsubformvsShowType[subname] === 'hide')
		{
			return 'cxHide';//No I18N
		}
	}
	return '';
});
Lyte.Component.register("crux-detailpage-sections", {
_template:"<template tag-name=\"crux-detailpage-sections\"> <template is=\"if\" value=\"{{expHandlers(cxPropSectionData.section_field.length,'||',isBusinessCardSection)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(negate(isBusinessCardSection),'&amp;&amp;',expHandlers(cxPropSectionData.parent_section,'!'))}}\"><template case=\"true\"><div id=\"section_name_{{cxPropSectionData.id}}\" class=\"cxDvSectionName\"> {{cxPropSectionData.section_name}} </div></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(isBusinessCardSection,'!'),'&amp;&amp;',expHandlers(cxPropSectionData.isSubformSection,'!')),'&amp;&amp;',expHandlers(cxPropSectionData.is_parent_section,'!'))}}\"><template case=\"true\"><div class=\"cxDvInfoCont cxFlex\"> <template items=\"{{cxPropSectionColumns}}\" item=\"item\" index=\"index\" is=\"for\"><div data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" class=\"cxDvFieldSectionContainer cxFlex\"> <div class=\"section_column_{{index}} cxDvFchildContainer\"> <template items=\"{{item}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div class=\"cxDvBcInfoFormRow {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}}\"> <div class=\"cxDvInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"field_label_{{field.id}}\" data-zcqa=\"dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxDvFieldWrap \"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropSupportAjaxEdit,'||',expHandlers(field.data_type,'===','ownerlookup')),'&amp;&amp;',negate(recordIsInAjaxEdit)),'&amp;&amp;',expHandlers(field.read_only,'!')),'&amp;&amp;',expHandlers(field.view_type.client_edit,'||',field.view_type.edit)),'&amp;&amp;',expHandlers(field.preventEdit,'!'))}}\"><template case=\"true\"> <span class=\"edit_icon_{{field.id}} cxDvFieldEditIcon cxCP cxEditIcon\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{field.read_only}}\"><template case=\"true\"> <span class=\"cxDvReadOnlyWrap cxCP\"> <span class=\"cxReadOnlyIcon\"></span> </span> </template></template></template></template> </div> <span id=\"section_save_cancel_span_{{field.id}}\" class=\"cxDvSaveCancelSection\"> <span id=\"saveAjaxEdit_{{field.id}}\" onclick=\"{{action('saveAjaxEdit',field)}}\" class=\"zcicncss-tick-filled-rounded zcicn-cssIcons zcicn_green_mask cxCP\"></span> <span id=\"cancelAjaxEdit_{{field.id}}\" onclick=\"{{action('cancelAjaxEdit',field)}}\" class=\"zcicncss-close-rounded zcicn-cssIcons cxDvRecordEdit cxCP\"></span> </span> </div> </div> </div></template> </div> </div></template> </div></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSectionData.is_parent_section}}\"><template case=\"true\"><div class=\"cxGroupedSubformWrap\"> <template items=\"{{cxPropSectionData.child_sections}}\" item=\"childSec\" index=\"childIndex\" is=\"for\"><div class=\"cxGroupedSubformBlock\"> <div id=\"section_name_{{childSec.id}}\" class=\"cxDvSectionName\"> {{childSec.section_name}} </div> <crux-subform data-zcqa=\"secDiv_{{cruxReplace(childSec.api_name,' ','_')}}\" cx-prop-type=\"view\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-section=\"{{childSec}}\" cx-prop-module-sections=\"{{cxPropAllSections}}\" cx-prop-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-class=\"cxDvSubform\" cx-prop-content=\"{{cxPropRecord}}\" cx-prop-show-scroll-to-top=\"true\" cx-prop-lookup-properties=\"{{childSec.cxPropLookupProperties}}\"> <template is=\"yield\" yield-name=\"body-fileupload\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field=\"{{fieldObj}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{recordObj}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\"></crux-detailpage-field-details> </template> <template is=\"yield\" yield-name=\"cellSuffixYield\"> {{getFieldSuffixValue(recordObj[fieldObj.api_name].name)}} </template> </crux-subform> </div></template> <div class=\"cxDvInfoCont cxFlex cxGroupedSubformFooter\"> <template items=\"{{cxPropSectionColumns}}\" item=\"item\" index=\"index\" is=\"for\"><div data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" class=\"cxDvFieldSectionContainer cxFlex\"> <div class=\"section_column_{{index}} cxDvFchildContainer\"> <template items=\"{{item}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div class=\"cxDvBcInfoFormRow {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}}\"> <div class=\"cxDvInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"field_label_{{field.id}}\" data-zcqa=\"dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}:</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxDvFieldWrap \"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> </div> </div> </div> </div></template> </div> </div></template> </div> </div></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropSectionData.isSubformSection,'&amp;&amp;',expHandlers(cxPropSectionData.parent_section,'!'))}}\"><template case=\"true\"><div class=\"{{cruxGetShowHideClassForLR(cxPropSectionData,cxPropLayoutRules,cxPropLayoutId,'subform')}}\"> <crux-subform data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" cx-prop-type=\"view\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-section=\"{{cxPropSectionData}}\" cx-prop-module-sections=\"{{cxPropAllSections}}\" cx-prop-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-class=\"cxDvSubform\" cx-prop-content=\"{{cxPropRecord}}\" cx-prop-show-scroll-to-top=\"true\" cx-prop-lookup-properties=\"{{cxPropSectionData.cxPropLookupProperties}}\"> <template is=\"yield\" yield-name=\"body-fileupload\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field=\"{{fieldObj}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{recordObj}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\"></crux-detailpage-field-details> </template> </crux-subform> </div></template><template case=\"false\"><div> <template items=\"{{cxPropBusinessCardDetails}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div data-zcqa=\"secDiv_Business_Card\" class=\"cxFlex cxAlignItemCenter {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}} \"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(fldIndex,'!==',0),'&amp;&amp;',expHandlers(expHandlers(fldIndex,'!==',1),'||',expHandlers(cxPropNoOfFieldsInHeader,'===',1))),'&amp;&amp;',field.view_type.client_view)}}\"><template case=\"true\"> <div class=\"cxDvBcInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"bc_field_label_{{field.id}}\" data-zcqa=\"bc_dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"bc_field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxFlex cxAlignItemCenter\"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" field-id-val=\"business_fieldElem\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;bc_value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropSupportAjaxEdit,'||',expHandlers(field.data_type,'===','ownerlookup')),'&amp;&amp;',negate(recordIsInAjaxEdit)),'&amp;&amp;',expHandlers(field.read_only,'!')),'&amp;&amp;',expHandlers(field.view_type.client_edit,'||',field.view_type.edit)),'&amp;&amp;',expHandlers(field.preventEdit,'!'))}}\"><template case=\"true\"> <span class=\"edit_icon_{{field.id}} cxDvFieldEditIcon cxCP cxEditIcon\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span> </template></template> </div> <span id=\"bc_section_save_cancel_span_{{field.id}}\" class=\"cxDvSaveCancelSection\"> <span id=\"bc_saveAjaxEdit_{{field.id}}\" onclick=\"{{action('saveAjaxEdit',field)}}\" class=\"zcicncss-tick-filled-rounded zcicn-cssIcons zcicn_green_mask cxCP\"></span> <span id=\"bc_cancelAjaxEdit_{{field.id}}\" onclick=\"{{action('cancelAjaxEdit',field)}}\" class=\"zcicncss-close-rounded zcicn-cssIcons cxCP cxDvRecordEdit\"></span> </span> </div> </div> </template></template> </div></template> </div></template></template></template></template></template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1,1]},{"type":"attr","position":[0,3,1,1,1]},{"type":"registerYield","position":[0,3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,3,1,1,1]},{"type":"attr","position":[0,3,1,1,3]},{"type":"if","position":[0,3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3,1,3]},{"type":"attr","position":[0,3,1,3,1]},{"type":"attr","position":[0,3,1,3,3]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,3]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[0,3,3],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,3]}]},{"type":"attr","position":[0,3,1]},{"type":"for","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1,1]},{"type":"attr","position":[0,3,1,1,1]},{"type":"registerYield","position":[0,3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,3,1,1,1]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,1]},{"type":"registerYield","position":[3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"if","position":[3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[3,1,3,1]},{"type":"attr","position":[3,1,3,3]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropSectionData","cxPropSectionColumns","cxPropModule","cxPropRecord","cxPropLayoutId","isBusinessCardSection","cxPropBusinessCardDetails","cxPropModuleData","cxPropModuleId","cxPropSelfExecution","cxPropAjaxRequestTo","cxPropDetailPageRoute","cxPropRenderedFromSection","cxPropAllSections","cxPropSupportAjaxEdit","cxPropNoOfFieldsInHeader","cxPropUserTimeZone","cxPropFieldColumnMap","cxPropLayoutRules","cxPropScrollSelector","cxPropLookupProperties","componentUniqueId"],
_observedAttributesType :["object","array","string","object","string","boolean","array","object","string","boolean","string","string","boolean","array","boolean","number","string","object","object","string","object","string"],

	data : function(){
		return {
			cxPropSectionData : Lyte.attr('object'),
			cxPropSectionColumns : Lyte.attr('array',{default : []}),
			cxPropModule : Lyte.attr('string'),
			cxPropRecord : Lyte.attr('object'),
			cxPropLayoutId : Lyte.attr("string"),
			isBusinessCardSection : Lyte.attr('boolean',{default : false}),
			cxPropBusinessCardDetails : Lyte.attr('array'),
			cxPropModuleData : Lyte.attr('object'),
			cxPropModuleId : Lyte.attr("string"),
			cxPropSelfExecution : Lyte.attr('boolean',{default : true}),
			cxPropAjaxRequestTo : Lyte.attr('string',{default : "moduleapiname"}),
			cxPropDetailPageRoute : Lyte.attr('string'),
			cxPropRenderedFromSection : Lyte.attr('boolean',{default : false}),
			cxPropAllSections : Lyte.attr('array',{default : []}),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropNoOfFieldsInHeader : Lyte.attr('number',{default : 2}),
			cxPropUserTimeZone : Lyte.attr('string',{default : ''}),
			cxPropFieldColumnMap : Lyte.attr('object',{default : {}}),
			cxPropLayoutRules : Lyte.attr('object',{default : {}}),
			cxPropScrollSelector : Lyte.attr('string'),
			cxPropLookupProperties: Lyte.attr('object',{default:{"routeName":"crm.tab.module.entity","target":"_blank","showBc" : true,"hideIconForView":true,"hoverCallback":false}}),//NO I18N
			componentUniqueId	: Lyte.attr('string') 
		}		
	},
	init : function(){
		// if(this.data.isBusinessCardSection && !this.data.cxPropBusinessCardDetails){
		// 	store.findAll('businesscard',{module : this.data.cxPropModule}).then(function(res){
		// 		this.setData('cxPropBusinessCardDetails',res[0].fields);
		// 	}.bind(this))
		// }
		// if(this.data.cxPropModule && this.data.cxPropModuleId && !this.data.cxPropModuleData){
		// 	store.findRecord('module',this.data.cxPropModuleId).then(function(res){
		// 		this.setData({'cxPropModuleData' : res[0] , "cxPropModuleId" : res[0].id});
		// 	}.bind(this))
		// }
	},
	actions : {
		ajaxEdit : function(fieldObj){
			if(!((this.data.cxPropSupportAjaxEdit || fieldObj.data_type === 'ownerlookup') && !this.data.recordIsInAjaxEdit && !fieldObj.read_only && (fieldObj.view_type.client_edit || fieldObj.view_type.edit) && !fieldObj.preventEdit)){
				return;
			}
			var cruxFieldElem;
			if(fieldObj.data_type === "ownerlookup"){
				cruxFieldElem = $L('#'+this.data.cxPropRecord[fieldObj.api_name].id)[0];
				if(this.getMethods('changeOwnerSectionCallback')){
					this.executeMethod("changeOwnerSectionCallback",fieldObj,this.data.cxPropRecord[fieldObj.api_name].id,cruxFieldElem);
				}
			}else{
			var uniqId = this.getData('componentUniqueId'); 
			cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			var ajaxEditInprogress = wrapperComp.getData('recordIsInAjaxEdit');
				if (cruxFieldElem && !ajaxEditInprogress && (fieldObj.view_type.client_edit || (this.data.cxPropAjaxRequestTo === "moduleid" && fieldObj.view_type.edit))) { //key change
				cruxFieldElem.setData('cxPropFrom','create');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display' , 'flex');//eslint-disable-line @zoho/webperf/no-show
				wrapperComp.setData('recordIsInAjaxEdit',true);
			}
			}
		},
		cancelAjaxEdit : function(fieldObj){
			var uniqId = this.getData('componentUniqueId'); 
			var cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			if(cruxFieldElem){
				cruxFieldElem.cxProp('value',this.data.cxPropRecord[fieldObj.api_name]);
				cruxFieldElem.setData('cxPropFrom','view');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display','none');
				wrapperComp.setData('recordIsInAjaxEdit',false);
			}
			event.stopPropagation();
		},
		saveAjaxEdit : function(fieldObj){
			var cruxFieldElem;
			if(fieldObj.data_type === "ownerlookup"){
				cruxFieldElem = $L('#'+this.data.cxPropRecord[fieldObj.api_name].id)[0];
			}else{
			var _self = this;
			var uniqId = this.getData('componentUniqueId'); 
			cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			if(cruxFieldElem && cruxFieldElem.component && cruxFieldElem.component.validate()){
				var changedData = cruxFieldElem.component.getValue();
				changedData = this.processFieldValuesForAjaxEdit(changedData,fieldObj,cruxFieldElem);
				if(this.data.cxPropSelfExecution){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					//handle according to record api format and params
					var reqModel = this.data.cxPropModule;
					if(this.data.cxPropAjaxRequestTo === "moduleid"){
						reqModel = this.data.cxPropModuleId;
					}
					var record = store.peekRecord(reqModel , this.data.cxPropRecord.id);
					record.$.set(fieldObj.api_name , changedData);
					record.$.save().then(function(res){
						//success handling
						cruxFieldElem.setData('cxPropFrom','view');
						$L('#section_save_cancel_span_'+fieldObj.id).css('display','none');
						wrapperComp.setData('recordIsInAjaxEdit',false);
						if(_self.getMethods('onSave')){
							_self.executeMethod('onSave',res,fieldObj);
						}
					},function(err){
						//error handling
						record.$.rollBack();
						cruxFieldElem.setData('cxPropValue',record[fieldObj.api_name]);
						if(_self.getMethods('onError')){
							_self.executeMethod('onError',err);
						}
					})
				}else{
					if(_self.getMethods('ajaxSaveHandler')){
						_self.executeMethod('ajaxSaveHandler');
					}
				}
				
				
				
				//handling endz
				cruxFieldElem.setData('cxPropFrom','view');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display','none');
				wrapperComp.setData('recordIsInAjaxEdit',false);
			}
			event.stopPropagation();
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	},
	findFieldColumns : function(){
		if(!this.data.isBusinessCardSection  && !this.data.cxPropSectionData.isSubformSection){
			var section = this.getData("cxPropSectionData"), layoutId = this.getData("cxPropLayoutId");
			var leftColumnFields = [] , rightColumnFields = [] , dvColumns = [];
			var sortedSectionFields = section.section_field.sort(function(a,b){ // key change
				return a.sequence - b.sequence;// key change
			}.bind(this));
			var secFldLen = sortedSectionFields.length;
			for(var i=0 ; i < secFldLen ; i++){
				var field = sortedSectionFields[i];
				if(field.view_type.client_view){
					if((section.column_count === "double_column_section" || section.column_count === 2) && (field.sequence+1)%2 === 1){	
						rightColumnFields.push(field);
					}else{
						leftColumnFields.push(field);
					}
				}
			}
			dvColumns.push(leftColumnFields);
			if(section.column_count === "double_column_section" || section.column_count === 2){
				dvColumns.push(rightColumnFields);
			}
			if(leftColumnFields.length || rightColumnFields.length){
				this.setData("cxPropSectionColumns",dvColumns);
			}

			//Parent child section handling
			if(section.is_parent_section && section.child_sections){
				section.child_sections.forEach(function(child){
					if(child.isSubformSection){
						this.parseSubformSectionData(child);
					}
				}.bind(this));	
			}
		}else if(this.data.cxPropSectionData && this.data.cxPropSectionData.isSubformSection){
				this.parseSubformSectionData(this.data.cxPropSectionData);
		}
	}.observes('cxPropSectionData').on('init'),
	parseSubformSectionData : function(section){
		var lookupProperties = Lyte.deepCopyObject(this.getData('cxPropLookupProperties'));//NO I18N
		if(section.section_field){
			section.section_field.forEach(function(field){
				if(field.data_type === "fileupload"){
					field.yieldName = 'fileupload';//NO I18N
				}
				if(field.data_type === "lookup"){
						var lkpMod = store.peekRecord('module',field.lookup.module.id);
						var lookupModName = lkpMod ? lkpMod.module_name : field.lookup.module.api_name;
						lookupProperties[field.api_name] ={
							"dynamicParams":'["' + lookupModName + '","{{row.' + field.api_name + '.id}}"]',/*for lookup record redirect while click the lookup value*///NO I18N
							"module":lookupModName,/*for lookup hover card*///NO I18N
						};
				}
				if(field.column_name === "APPOINTMENTID"){
					field.cxPropCellSuffixYield = true;
				}
			});
			this.setData('cxPropSectionData.fields',this.getData('cxPropSectionData.section_field'));
			this.setData('cxPropSectionData.cxPropLookupProperties' , lookupProperties);
			if(section.parent_field){
				Lyte.arrayUtils( this.getData('cxPropSectionData.fields') , 'push' , section.parent_field);
			}
		}
	},
	processFieldValuesForAjaxEdit : function(changedData,fieldObj,cruxFieldElem){
		switch(fieldObj.data_type){
			case 'lookup' : 
				if(changedData){
					changedData = JSON.parse(changedData);
				}
				break;
			case 'currency':
			case 'double' :
			case "integer" :
			case "bigint" : 
			case "long" : 
				changedData = parseFloat(parseFloat(changedData).toFixed(fieldObj.decimal_place));
				if(fieldObj.data_type === 'currency'){
					cruxFieldElem.setData("cxPropFormattedCurrency",changedData);
				}
				break;
			case 'multiselectpicklist':
				changedData = changedData.join('; ');
				break;
			case "multiuserlookup" : 
				var existingValue = this.data.cxPropRecord[fieldObj.api_name];
				var processedValue = {users : []} , obj = {};
				// var removedData;
				if( changedData && changedData.length > 0 ){
					changedData.filter(function(item){
						obj[fieldObj.api_name] = item;
						processedValue.users.push(obj);
					})
					changedData = processedValue;
				}else if(existingValue && existingValue.users && existingValue.users.length){
					// existingValue.users.filter(function(item){
					// 	item[fieldObj.api_name]._delete = null;
					// });
					// return existingValue;
					changedData = undefined;
				}
				break;
		}
		return changedData;
	}
});
Lyte.Component.registerHelper('getFieldSuffixValue',function(value){
	return value ? I18n.getMsg('crm.service.subform.scheduled.service') : I18n.getMsg("crm.label.subform.add.unscheduled.service");
});

Lyte.Component.register("crux-detailpage-field-details", {
_template:"<template tag-name=\"crux-detailpage-field-details\"> <div id=\"field_comp_{{cxPropField.id}}\" class=\"cxDvFieldDetailComp\"> <template is=\"if\" value=\"{{cxPropField.isYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"detailField\" field-obj=\"{{cxPropField}}\" record-obj=\"{{cxPropRecord}}\"></lyte-yield> </template><template case=\"false\"> <span><template value=\"{{fieldComponentData}}\" is=\"switch\"><template case=\"text\"> <template is=\"if\" value=\"{{expHandlers(cxPropField.includeSalutation,'&amp;&amp;',cxPropRecord['Salutation'])}}\"><template case=\"true\"><crux-text-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{expHandlers(expHandlers(cxPropRecord['Salutation'],'+',''),'+',cxPropRecord[cxPropField.api_name])}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-from=\"view\"></crux-text-component></template><template case=\"false\"><crux-text-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cruxGetFieldValue(cxPropModule,cxPropRecord,cxPropField,cxPropField.isEntityName)}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-from=\"view\"></crux-text-component></template></template> </template><template case=\"textarea\"> <crux-text-area-component cx-prop-highlight-url=\"true\" cx-prop-line-clamp=\"7\" cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-text-area-component> </template><template case=\"email\"> <crux-email-component cx-prop-readonly=\"{{cxPropField.read_only}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-email-component> </template><template case=\"phone\"> <crux-phone-component zpb-enabled=\"false\" cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity-id=\"{{cxPropRecord.id}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-phone-in-user-format=\"false\"></crux-phone-component> </template><template case=\"picklist\"> <crux-picklist-component cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-is-color-code-enabled=\"{{cxPropField.enable_colour_code}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-from=\"view\" cx-prop-type=\"single\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-picklist-values=\"{{cxPropField.pick_list_values}}\"></crux-picklist-component> </template><template case=\"multiselectpicklist\"> <crux-picklist-component cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{getPicklistFieldValues(cxPropRecord[cxPropField.api_name])}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-is-color-code-enabled=\"{{cxPropField.enable_colour_code}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-from=\"view\" cx-prop-type=\"multisearch\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-picklist-values=\"{{cxPropField.pick_list_values}}\"></crux-picklist-component> </template><template case=\"date\"> <crux-date-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-date-component> </template><template case=\"datetime\"> <crux-date-time-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-datetime-in-user-pattern=\"true\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-date-time-component> </template><template case=\"double\"></template><template case=\"integer\"></template><template case=\"long\"></template><template case=\"bigint\"> <crux-number-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-number-component> </template><template case=\"autonumber\"> <crux-text-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-text-component> </template><template case=\"currency\"> <crux-number-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-formatted-currency=\"{{cxPropRecord.$formatted_currency[cxPropField.api_name]}}\" cx-prop-iso-code=\"{{cxPropRecord.Currency}}\" cx-prop-exchange-rate=\"{{cxPropRecord.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{cxPropRecord.ExchangeRate}}\" cx-prop-home-currency=\"{{cxPropRecord.$home_converted_currency[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-number-component> </template><template case=\"boolean\"> <crux-boolean-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-boolean-component> </template><template case=\"website\"> <crux-website-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-website-component> </template><template case=\"lookup\"> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-route-name=\"{{cxPropDetailPageRoute}}\" cx-prop-dynamic-params=\"[&quot;{{cxPropField.lookup.module.api_name}}&quot;, &quot;{{cxPropRecord[cxPropField.api_name].id}}&quot;]\" cx-prop-show-bc=\"true\" cx-prop-module=\"{{cxPropField.lookup.module.api_name}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-layout=\"{{cxPropLayoutId}}\" fetch-module-data=\"{{method('fetchLkpModuleData',cxPropField)}}\" fetch-records=\"{{method('fetchLkpRecords',cxPropField)}}\" cx-prop-related-id=\"{{cxPropField.lookup.module.id}}\" cx-prop-target=\"{{if(ifEquals(cxPropField.field_component_type,'lookup'),'_blank','_self')}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"></crux-lookup-component> </template><template case=\"userlookup\"> <crux-user-component cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-filterable=\"false\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-searchable=\"true\" cx-prop-filter-selected=\"ActiveUsers\" cx-prop-type=\"single\" cx-prop-query-param=\"{{queryStringify(cxPropField.lookup.query_details.query_id)}}\" cx-prop-class=\"cxDvUserComponent\"></crux-user-component> </template><template case=\"ownerlookup\"> <crux-user-component cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-filterable=\"false\" cx-prop-searchable=\"true\" cx-prop-filter-selected=\"ActiveUsers\" cx-prop-type=\"single\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-date-value=\"{{getAffectedTimeValue(cxPropField,cxPropRecord,cxPropFieldColumnMap)}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-is-business-card=\"true\" cx-prop-show-business-card=\"true\"></crux-user-component> </template><template case=\"multiuserlookup\"> <crux-user-component cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-filterable=\"false\" cx-prop-max-limit=\"10\" cx-prop-type=\"multiple\"></crux-user-component> </template><template case=\"fileupload\"> <crux-file-upload-component cx-prop-readonly=\"{{cxPropField.read_only}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-id=\"{{fieldIdVal}}\" cx-prop-from=\"view\" cx-prop-file-unique-selector=\"file_Id\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{getFileUploadFieldValue(cxPropRecord[cxPropField.api_name])}}\" cx-prop-files=\"{{getFileUploadFieldValue(cxPropRecord[cxPropField.api_name])}}\" cx-prop-type=\"menu\" cx-prop-read-only=\"true\" cx-prop-file-limit=\"{{field.length}}\" cx-prop-size-conversion=\"false\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"> </crux-file-upload-component> </template><template case=\"territory\"> <crux-text-component cx-prop-readonly=\"true\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{getCruxTerritoryFieldValue(cxPropModule,cxPropRecord,cxPropField,cxPropField.isEntityName)}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-from=\"view\"></crux-text-component> </template><template case=\"layout\"> <crux-layout-component id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"> </crux-layout-component> </template><template case=\"participant\"> <crux-text-component cx-prop-readonly=\"true\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-value=\"{{getParticipantFieldValue(cxPropRecord[cxPropField.api_name])}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" cx-prop-from=\"view\"></crux-text-component> </template><template case=\"comments\"> <template is=\"if\" value=\"{{expHandlers(cxPropRecord[cxPropField.api_name],'&amp;&amp;',expHandlers(cxPropRecord[cxPropField.api_name].length,'>',0))}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropRecord[cxPropField.api_name]}}\" item=\"item\" index=\"index\"> <div data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"> <pre wrap=\"soft\">{{item.comment_content}}</pre> </div> </template> </template><template case=\"false\"> <div data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"></div> </template></template> </template><template case=\"twitter\"> <crux-twitter-component id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-maxlength=\"{{cxPropField.length}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"> </crux-twitter-component> </template><template case=\"skype\"> <crux-text-component id=\"{{fieldIdVal}}_{{cxPropField.id}}\" class=\"cxLink\" cx-prop-appearance=\"box\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-maxlength=\"{{cxPropField.length}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\" on-value-clicked=\"{{method('skypeValueClickHandler')}}\" cx-prop-view-yield-suffix=\"{{if(cxPropRecord[cxPropField.api_name],true,false)}}\"> <template is=\"yield\" yield-name=\"viewYieldSuffix\"> <span onclick=\"{{action(&quot;openskype&quot;,event)}}\"><a id=\"skypeIconAnchor_{{cxPropField.id}}\" href=\"skype:{{cxPropRecord[cxPropField.api_name]}}?call\" class=\"zcicn-bgicons-sprite zcicn-logo-skype zcicncss16\"></a> </span> </template> </crux-text-component> </template><template case=\"reminder\"> <crux-date-time-component cx-prop-readonly=\"{{cxPropField.read_only}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropRecord[cxPropField.api_name]}}\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-datetime-in-user-pattern=\"false\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"></crux-date-time-component> </template><template case=\"activity_mml\"> <crux-lookup-component id=\"{{fieldIdVal}}_{{cxPropField.id}}\" cx-prop-appearance=\"box\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\" cx-prop-field=\"{{activity_mml_obj.field}}\" cx-prop-value=\"{{activity_mml_obj.value}}\" cx-prop-layout=\"{{cxPropLayoutId}}\" cx-prop-route-name=\"{{cxPropDetailPageRoute}}\" cx-prop-dynamic-params=\"[&quot;{{activity_mml_obj.module_name}}&quot;,&quot;{{activity_mml_obj.value.id}}&quot;]\" cx-prop-module=\"{{activity_mml_obj.module_name}}\" cx-prop-show-bc=\"true\" cx-prop-call-allowed=\"false\" cx-prop-type=\"multi_module_lookup\" cx-prop-placeholder=\"{{cxPropField.tooltip.value}}\"> </crux-lookup-component> </template><template case=\"imageupload\"></template><template case=\"multiselectlookup\"></template><template case=\"formula\"></template><template case=\"rich_text\"></template><template case=\"multi_module_lookup\"> <span class=\"cxUnsupportedField\" lt-prop-title=\"unsupported field\" data-zcqa=\"{{cxPropFieldZcqaPrefix.value_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_zcqa]}}\" cx-prop-zcqa=\"{{cxPropFieldZcqaPrefix.value_input_zcqa}}{{cxPropField[cxPropFieldZcqaValue.value_input_zcqa]}}\"></span> </template></template></span> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"switch","position":[1,0],"cases":{"text":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},"textarea":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"email":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"phone":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"picklist":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"multiselectpicklist":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"date":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"datetime":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"double":{"dynamicNodes":[],"additional":{"next":"integer"}},"integer":{"dynamicNodes":[],"additional":{"next":"long"}},"long":{"dynamicNodes":[],"additional":{"next":"bigint"}},"bigint":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"autonumber":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"currency":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"boolean":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"website":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"lookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"userlookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"ownerlookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"multiuserlookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"fileupload":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"territory":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"layout":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"participant":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"comments":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"twitter":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"skype":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]}]},{"type":"componentDynamic","position":[1]}]},"reminder":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"activity_mml":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"imageupload":{"dynamicNodes":[],"additional":{"next":"multiselectlookup"}},"multiselectlookup":{"dynamicNodes":[],"additional":{"next":"formula"}},"formula":{"dynamicNodes":[],"additional":{"next":"rich_text"}},"rich_text":{"dynamicNodes":[],"additional":{"next":"multi_module_lookup"}},"multi_module_lookup":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropField","cxPropModule","cxPropRecord","cxPropLayoutId","cxPropFieldZcqaPrefix","cxPropFieldZcqaValue","cxPropUserTimeZone","cxPropFieldColumnMap","ajaxEditMode","fieldIdVal","cxPropDetailPageRoute","activity_mml_obj","fieldComponentData","componentUniqueId"],
_observedAttributesType :["object","string","object","string","object","object","string","object","boolean","string","string","object","string","string"],

	data : function(){
		return {
			cxPropField : Lyte.attr('object'),
			cxPropModule : Lyte.attr('string'),
			cxPropRecord : Lyte.attr('object'),
			cxPropLayoutId : Lyte.attr("string"),
			cxPropFieldZcqaPrefix : Lyte.attr('object',{default : {value_zcqa : "value_" , value_input_zcqa : ""}}),
			cxPropFieldZcqaValue : Lyte.attr('object',{default : {value_zcqa : "display_label" , value_input_zcqa : "display_label"}}), 
			cxPropUserTimeZone : Lyte.attr('string',{default : ''}),
			cxPropFieldColumnMap : Lyte.attr('object',{default : {}}),
			ajaxEditMode : Lyte.attr('boolean'),
			fieldIdVal : Lyte.attr('string',{default : "fieldElem"}),
			cxPropDetailPageRoute : Lyte.attr('string',{default : "crm.tab.module.entity.detail"}),
			activity_mml_obj : Lyte.attr('object',{default : {}}),
			fieldComponentData  : Lyte.attr('string'),
			componentUniqueId	: Lyte.attr('string') 
		}		
	},
	observeFieldComponentData : function(){
		if(this.getData('cxPropField.field_component_type')){
			this.setData('fieldComponentData' , this.getData('cxPropField.field_component_type')); 
		}else{
			this.setData('fieldComponentData' , this.getData('cxPropField.data_type'));
		}
		this.setData('fieldIdVal',this.getData('fieldIdVal') +'_' + this.getData('componentUniqueId'));

		if(this.getData('fieldComponentData') === "activity_mml" && this.cruxGetActivityMMLObj){
			this.setData({activity_mml_obj : this.cruxGetActivityMMLObj( this.getData('cxPropModule') , this.getData('cxPropRecord') , this.getData('cxPropField') ) });
		}
	}.observes('cxPropField').on('init'),
	actions : {
		// Functions for event handling
		openskype : function(xEvent){
			if(xEvent){
				xEvent.cancelBubble = true;
				if(xEvent.stopPropagation){ xEvent.stopPropagation(); }
			}
		},
	},
	methods : {
		fetchLkpModuleData : function(fieldData){
			var moduleData  = fieldData.lookup.module;
			// return store.findRecord('module',moduleData.id, undefined, false, true, {allowMultiple : true}).then(function(res){
			return store.findRecord('module',moduleData.api_name).then(function(res){
				return res[0];
			});
		},
		fetchLkpRecords : function(fieldData,tabid,query){
			return new Promise(function(resolve, reject){
				// store.findAll(fieldData.lookup.module.id,query).then( function(res){
					store.findAll(fieldData.lookup.module.api_name,query).then( function(res){
							resolve(res);
						},function(res){
								reject();
						}); 
			});
		},
		skypeValueClickHandler : function(xEvent){
			this.$node.querySelector('#skypeIconAnchor_'+this.getData('cxPropField.id')).click();//NO I18N
			xEvent.stopPropagation();
			return false;
		}
	}
},{mixins : ["crm-crux-detailpage-mixin"]});
Lyte.Component.registerHelper("queryStringify",function(queryId){
	return JSON.stringify(queryId);
})
Lyte.Component.registerHelper("getFileUploadFieldValue",function(files){
	if(files && typeof files === "object" && files.length){
		files.forEach(function(file){
			if(file && file.file_Name && !file.fileName){
				file.fileName = file.file_Name;
			}
		});
	}
	return files;
})
Lyte.Component.registerHelper("getPicklistFieldValues",function(fieldValue){
	if(!fieldValue){
		return fieldValue;
	}else if(fieldValue && typeof fieldValue === "string"){
		return fieldValue.split('; ');
	}
})
Lyte.Component.registerHelper('getCruxTerritoryFieldValue',function(module , record ,field ,isEntityName ){
	if(record && field){
		var territoryFieldValue = record[field.api_name];
		if(territoryFieldValue && territoryFieldValue.length){
			var values = territoryFieldValue.map(function(val){return val.Name;})
			return values && values.length ? values.join() : "" ;
		}else{
			return "";
		}
	}
	
})
Lyte.Component.registerHelper("getAffectedTimeValue",function(field,record,fieldColumnNameMap){ //No I18N
	var chldColName;
	switch(field.column_name){
		case 'MODIFIEDBY':
			chldColName = 'MODIFIEDTIME';//No I18N
			break;
		case 'SMCREATORID':
			chldColName = 'CREATEDTIME';//No I18N
			break;
		case 'RESCHEDULEDBY':
			chldColName = 'RESCHEDULEDTIME';//No I18N
			break;
		case 'CANCELLEDBY':
			chldColName = 'CANCELLEDTIME';//No I18N
			break;
		default:
			chldColName = undefined;
			break;
	}
	if(chldColName && record[field.api_name] && record[fieldColumnNameMap[chldColName][1]] )
	{
		return record._$ && record._$.original ? record._$.original[fieldColumnNameMap[chldColName][1]] : record[fieldColumnNameMap[chldColName][1]] ;
	}
});
Lyte.Component.register("crux-related-list-wrapper", {
_template:"<template tag-name=\"crux-related-list-wrapper\"> <lyte-event-listener event-name=\"relatedListRefresh\" on-fire=\"{{action('refreshRL')}}\"></lyte-event-listener> <template is=\"if\" value=\"{{cxPropRelatedListYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxPropRelatedListYield\"></lyte-yield> </template><template case=\"false\"> <template items=\"{{cxPropRelatedLists}}\" item=\"relatedList\" index=\"index\" is=\"for\"><div class=\"cx_detail_rl_container\"> <template is=\"if\" value=\"{{expHandlers(relatedList.api_name,'===','Notes')}}\"><template case=\"true\"><div id=\"{{relatedList.api_name}}__{{relatedList.id}}\" class=\"rl_scroll_header\"> <crux-note cx-prop-forced-fetch=\"true\" cx-prop-query-param=\"{{cxPropQueryParam}}\" cx-prop-rich-text-format=\"{{cxPropNotesRichText}}\" cx-prop-entity=\"{{cxPropRecord}}\" cx-prop-module=\"{{cxPropModuleName}}\" relid=\"{{relatedList.id}}\" cx-prop-selected-filter=\"All\" cx-prop-note-count=\"true\" cx-prop-related-list=\"{{relatedList}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\"></crux-note> </div></template><template case=\"false\"> <crux-related-list-table data-zcqa=\"Related_list_Div_{{relatedList.display_label}}\" lyte-view-port=\"{{cxPropLyteViewPort}}\" cx-prop-show-rl-actions=\"{{cxPropShowRlActions}}\" cx-prop-show-all-actions=\"{{cxPropShowAllActions}}\" cx-prop-available-rl-actions=\"{{cxPropAvailableRlActions}}\" cx-prop-role-values=\"{{cxPropRoleValues}}\" cx-prop-show-edit-delete-icons=\"{{cxPropShowEditDeleteIcons}}\" cx-prop-show-attachment-actions=\"{{cxPropShowAttachmentActions}}\" cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" cx-prop-bulk-request-to=\"{{cxPropBulkRequestTo}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" id=\"rl_{{relatedList.id}}\" cx-prop-rl=\"{{relatedList}}\" cx-prop-rl-data=\"{{cxPropRlData[relatedList.id]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" related-list-table-action=\"{{method('relatedListWrapperAction')}}\" rl-table-row-click=\"{{method('rlWrapperTableRowClick')}}\" rl-rec-action=\"{{method('rlRecAction')}}\"></crux-related-list-table> </template></template> </div></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}}],
_observedAttributes :["cxPropRelatedLists","cxPropModule","cxPropModuleId","cxPropModuleName","cxPropLayoutId","cxPropEntityId","cxPropRlData","cxPropRecord","cxPropRelatedListYield","cxPropBulkRequestTo","componentUniqueId","cxPropQueryParam","cxPropRlActionHide","cxPropShowEditDeleteIcons","cxPropShowRlActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropNotesRichText","cxPropRoleValues","cxPropLyteViewPort","cxPropShowAttachmentActions"],
_observedAttributesType :["array","string","string","string","string","string","object","object","boolean","string","string","object","array","boolean","boolean","boolean","array","boolean","array","boolean","boolean"],

	data : function(){
		return {
			cxPropRelatedLists	 : Lyte.attr('array'),
			cxPropModule 	  	 : Lyte.attr('string'),
			cxPropModuleId: Lyte.attr('string'),
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropLayoutId		 : Lyte.attr('string'),
			cxPropEntityId		 : Lyte.attr('string'), 
			cxPropRlData 		 : Lyte.attr('object'),
			cxPropRecord 		 : Lyte.attr('object'),
			cxPropRelatedListYield : Lyte.attr('boolean'),
			cxPropBulkRequestTo : Lyte.attr('string'),
			componentUniqueId	: Lyte.attr('string',{default : '1234'}) ,
			cxPropQueryParam	: Lyte.attr('object',{default : {}}),
			cxPropRlActionHide : Lyte.attr('array',{default : []}),
			cxPropShowEditDeleteIcons : Lyte.attr('boolean',{default : true}), 
			cxPropShowRlActions	:	Lyte.attr('boolean',{default : true}),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropNotesRichText : Lyte.attr('boolean',{default : false}), 
			cxPropRoleValues : Lyte.attr('array'),
			cxPropLyteViewPort : Lyte.attr('boolean',{default : false}),
			cxPropShowAttachmentActions : Lyte.attr('boolean',{default : true})
		}		
	},
	init : function(){
		if(this.getData('componentUniqueId') !== '1234'){
			this.setData('cxPropQueryParam',{'sort_by':'Created_Time' , 'sort_order':'desc' , 'uniqueId' : this.getData('componentUniqueId')});
		}
	},
	observeLayoutId : function(){
		var _self = this;
		var rlList = this.getData('cxPropRelatedLists');
		if(!rlList){
			store.findAll('related_list',{module : this.getData('cxPropModule'), layout_id : this.getData('cxPropLayoutId')}).then(function(res){
				var list = res.filter(function (item) { return item.visible; });
				_self.setData('cxPropRelatedLists',list);
			})
		}
	}.observes('cxPropLayoutId').on('init'),
	actions : {
		// Functions for event handling
		refreshRL : function(data){
			var rlNode = this.$node.querySelector('#rl_'+data.id);
			rlNode.component.setData('cxPropRlData',data.rlData);
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		relatedListWrapperAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListAction')){
				return this.executeMethod('relatedListAction',actionId, rlId , elem , eventObj);
			}
		},
		rlRecAction : function(actionId,recId,rlId,elem,eventObj,record){
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',actionId ,recId , rlId , elem , eventObj,record);
			}
		} ,
		rlWrapperTableRowClick : function(rec,evnt,rl){
			if(this.getMethods('rlRowClick')){
				return this.executeMethod('rlRowClick',rec,evnt,rl);
			}
		}
	}
});

Lyte.Component.register("crux-related-list-table", {
_template:"<template tag-name=\"crux-related-list-table\"> <lyte-event-listener event-name=\"refreshRlWithId\" on-fire=\"{{action('refreshRLwithId')}}\"></lyte-event-listener> <div id=\"rl_header\" class=\"cx_rl_header cxFlex cxAlignItemCenter\"> <span id=\"{{cxPropRl.api_name}}__{{cxPropRl.id}}\" class=\"rl_scroll_header cx_rl_scroll_header\" data-zcqa=\"Related_List_Name_{{cxPropRl.display_label}}\">{{cxPropRl.display_label}}</span> <template is=\"if\" value=\"{{cxPropShowRlActions}}\"><template case=\"true\"><crux-related-list-actions cx-prop-show-all-actions=\"{{cxPropShowAllActions}}\" cx-prop-available-rl-actions=\"{{cxPropAvailableRlActions}}\" cx-prop-show-attachment-actions=\"{{cxPropShowAttachmentActions}}\" cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" related-list-records=\"{{tableData}}\" cx-prop-rl-actions=\"{{cxPropRl.actions}}\" cx-prop-related-list=\"{{cxPropRl}}\" related-list-action=\"{{method('relatedListTableAction')}}\"></crux-related-list-actions></template></template> </div> <div id=\"{{cxPropRl.id}}\"> <crux-table-component cx-prop-textarea-properties=\"{{cxPropTextAreaProperties}}\" cx-prop-header=\"{{rlFields}}\" cx-prop-label-selector=\"field_label\" cx-prop-content=\"{{tableData}}\" cx-prop-sort-columns=\"true\" cx-prop-body-id=\"rlTableBody\" on-body-row-click=\"{{action('relatedListTableRowClick')}}\" cx-prop-row-zcqa=\"detailView\" cx-prop-date-properties=\"{{cxPropDateUserProperties}}\" data-zcqa=\"relatedListTable\" cx-prop-datetime-properties=\"{{cxPropDateTimeUserProperties}}\" cx-prop-lookup-properties=\"{{cxPropLookupProperties}}\" cx-prop-field-type-mapping=\"{{fieldMapping}}\" cx-prop-field-type-mapping-selector=\"api_name\" cx-prop-no-records-message=\"No records found\" cx-prop-table-id=\"listviewtable\" cx-prop-table-class=\"related_listview_tale\" cx-prop-module=\"{{cxPropRl.module.api_name}}\" cx-prop-add-search=\"false\" cx-prop-enable-body-scroll=\"false\" cx-prop-yield-for-prefix=\"{{if(expHandlers(prefixYields.length,'>',0),true,false)}}\" cx-prop-prefix-yields=\"{{prefixYields}}\" class=\"lyteOuterTable cx_rl_table_component\"> <template is=\"yield\" yield-name=\"body-lookup\"> <template is=\"if\" value=\"{{fieldObj.isDisplayField}}\"><template case=\"true\"> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{recordObj[fieldObj.api_name]}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{cxPropRl.transition.module}}&quot;, &quot;{{recordObj.id}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropRl.type,'===','multiselectlookup')}}\"><template case=\"true\"> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{getNestedObjValue(recordObj,fieldObj.api_name)}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{fieldObj.lookup.module.api_name}}&quot;, &quot;{{getNestedObjValue(recordObj,fieldObj.api_name,true)}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template></template></template></template> <template> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{recordObj[fieldObj.api_name]}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{fieldObj.lookup.module.api_name}}&quot;, &quot;{{recordObj[fieldObj.api_name].id}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template> </template> <template is=\"yield\" yield-name=\"body-contact-role\"> {{getContactRole(recordObj.Contact_Role,cxPropRoleValues)}} </template> <template is=\"yield\" yield-name=\"body-custom-yield\"> <lyte-yield yield-name=\"rl-body-{{fieldObj.customYieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <template is=\"if\" value=\"{{expHandlers(cxPropRl.record_operations,'&amp;&amp;',cxPropRl.record_operations.edit)}}\"><template case=\"true\"> <span onclick=\"{{action('handleRlrecordAction',recordObj,'edit',this)}}\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropRl.record_operations,'&amp;&amp;',expHandlers(cxPropRl.record_operations.delete,'||',cxPropRl.record_operations.disassociate))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(cxPropRl.record_operations.disassociate)}}\"><template case=\"true\"><span onclick=\"{{action('handleRlrecordAction',recordObj,'unassign',this)}}\"></span></template><template case=\"false\"><span onclick=\"{{action('handleRlrecordAction',recordObj,'unassign',this)}}\"></span></template></template> </template></template> </template> </crux-table-component> </div> <template is=\"if\" value=\"{{expHandlers(cxPropRlData.length,'>',expHandlers(cxPropRlInfo.per_page,'-',1))}}\"><template case=\"true\"><lyte-navigator lt-prop-yield=\"true\" on-next=\"{{method('navigNext')}}\" on-previous=\"{{method('navigPrevious')}}\" lt-prop-value=\"{{startIndex}}\" lt-prop-records=\"{{cxPropRlData.length}}\" lt-prop-perpage=\"{{expHandlers(cxPropRlInfo.per_page,'-',1)}}\"> <template is=\"registerYield\" yield-name=\"navigatorYield\"> <div class=\"lyteSingleBack lyteIconSingleBack\"></div> <div class=\"lyteNavigatorMidPoint\"> {{startRecord}} <span class=\"lyteNavigatorText\">-</span> {{endRecord}} </div> <div class=\"lyteSingleFront lyteIconSingleFront\"></div> </template> </lyte-navigator></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,1,3],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"registerYield","position":[5,1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[5,1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[3,1]},{"type":"text","position":[3,5]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["cxPropRl","cxPropModule","cxPropModuleId","cxPropEntityId","cxPropLayoutId","cxPropRlData","cxPropDateTimeUserProperties","cxPropDateUserProperties","cxPropShowEditDeleteIcons","cxPropLookupProperties","defaultUiTypeToCruxMapping","fieldMapping","rlFields","tableData","prefixYields","cxPropRlInfo","startIndex","cxPropFromYield","cxPropBulkRequestTo","relatedModule","makeRequestOnNavig","cxPropTextAreaProperties","cxPropShowAttachmentActions","cxPropShowRlActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropRoleValues","lyteViewPort","cxPropRetainInput","cxPropRlActionHide"],
_observedAttributesType :["object","string","string","string","string","array","object","object","boolean","object","object","object","array","array","array","object","number","boolean","string","string","boolean","object","boolean","boolean","boolean","array","array","boolean","boolean","array"],

	data : function(){
		return {
			cxPropRl : Lyte.attr('object'),
			cxPropModule : Lyte.attr('string'),
			cxPropModuleId: Lyte.attr('string'),
			cxPropEntityId : Lyte.attr('string'),
			cxPropLayoutId : Lyte.attr('string'),
			cxPropRlData : Lyte.attr('array'),
			cxPropDateTimeUserProperties : Lyte.attr('object'),
			cxPropDateUserProperties : Lyte.attr('object'),
			cxPropShowEditDeleteIcons : Lyte.attr('boolean',{default : true}),
			cxPropLookupProperties: Lyte.attr('object',{default:{"routeName":"crm.tab.module.entity","target":"_blank","showBc" : false,"hideIconForView":true,"hoverCallback":false}}),//NO I18N
			defaultUiTypeToCruxMapping : Lyte.attr('object',{default : {"1": "text","2": "picklist","3": "text-area","4": "lookup","5": "lookup","8": "user","14": "date-time","20": "user",//No I18N
																		"21": "website","22": "twitter","24": "date","25": "email","26": "picklist","32": "number","33": "phone","34": "number","36": "number","38": "number","39": "picklist","40": "number","52": "number",//No I18N
																		"55": "user","77": "number","100": "picklist","110": "text-area","111": "text","133": "lookup","143": "number","144": "number",//No I18N
																		"145": "number","200": "date-time","202": "date","207": "layout","208": "layout","209": "tag","221": "user","300": "boolean","301": "boolean","333": "date-time","786": "date-time","999": "layout"//No I18N
									}}),
			fieldMapping : Lyte.attr('object'),
			rlFields : Lyte.attr('array'),
			tableData : Lyte.attr('array'),
			prefixYields : Lyte.attr('array', {default : []}),
			cxPropRlInfo : Lyte.attr('object' , {default : {per_page : 11 , page : 1 ,more_records : false}}),
			startIndex : Lyte.attr('number'),
			cxPropFromYield : Lyte.attr('boolean',{default : false}),
			cxPropBulkRequestTo : Lyte.attr('string',{default  : 'moduleapiname'}),
			relatedModule : Lyte.attr('string'),
			makeRequestOnNavig : Lyte.attr('boolean',{default : false}),
			cxPropTextAreaProperties : Lyte.attr('object',{default : {lineClamp : 3}}),
			cxPropShowAttachmentActions : Lyte.attr('boolean',{default : true}),
			cxPropShowRlActions : Lyte.attr('boolean',{default : true}),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropRoleValues : Lyte.attr('array'),
			lyteViewPort	: Lyte.attr("boolean", { "default": false }),
			cxPropRetainInput : Lyte.attr("boolean",{default : true}),
			cxPropRlActionHide : Lyte.attr('array')
			
		}		
	},
	viewPortObs : function(){
		if(!this.getData('lyteViewPort')){
			this.initHandler();
		}
	}.observes('lyteViewPort').on('init'),
	initHandler : function(){
		var rlMeta = this.getData('cxPropRl');
		if(!rlMeta.fields){
			store.findRecord('related_list',rlMeta.id,{module : this.data.cxPropModule , layout_id : this.data.cxPropLayoutId,include_inner_details : "fields.ui_type,fields.lookup,fields.formula,fields.rollup_summary,fields.field_label,fields.pick_list_values,fields.separator,fields.decimal_place,fields.data_type,fields.refer_from_field"}).then(function(res){
				if(res && res.length){
					this.setData({
						cxPropRl : res[0] , 
						cxPropRlData : [] , 
						makeRequestOnNavig : true
					});
					this.relatedListObserver();
				}
			}.bind(this));
		}else if(this.data.cxPropRlData){
			if(!this.data.cxPropDateTimeUserProperties){
				this.setData('cxPropDateTimeUserProperties', {datetimeInUserPattern : true});
			}
			if(!this.data.cxPropDateUserProperties){
				this.setData('cxPropDateUserProperties', {dateInsUserPattern : true});
			}
			this.setData({
				makeRequestOnNavig : false
			});
			this.setRelatedListData();
		}else{
			this.setData({
				cxPropRlData : [] , 
				makeRequestOnNavig : true
			});
            this.relatedListObserver();
        }
		if(this.data.cxPropBulkRequestTo === "moduleid" && this.getData('cxPropRl').module){
				if(this.getData('cxPropRl').type === 'multiselectlookup' && this.getData('cxPropRl').connectedmodule){
					this.setData('relatedModule',this.getData('cxPropRl').connectedmodule); //no i18n
				}else{
					this.setData('relatedModule',this.getData('cxPropRl').module.api_name); //no i18n
				}
		}
	},
	relatedListObserver : function(){
		//Triggering self rl data request
		var rlMeta = this.getData('cxPropRl');
		var params = {relatedId : this.getData("cxPropEntityId") , relationId : rlMeta.id , per_page : this.data.cxPropRlInfo.per_page , page : this.data.cxPropRlInfo.page };
		var bulkReqModel = this.getData('cxPropModule');
		if(this.data.cxPropBulkRequestTo === "moduleid"){
			bulkReqModel = this.data.cxPropModuleId;
			if(rlMeta.type === 'multiselectlookup'){
				params.fields = rlMeta.fields.map((item)=>item.api_name).join(',');//no i18n
				params.fields += ',id'; //no i18n
				var mxnFieldIdFetch = store.peekRecord('field',rlMeta.mxnfield); //no i18n
				var mxnName = mxnFieldIdFetch && mxnFieldIdFetch.multiselectlookup && mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname ? mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname : '';
				if(mxnName){
					params.fields += ','+mxnName;
					params.fields += ','+mxnName+'.$approval,'+mxnName+'.$approval_state,'+mxnName+'.$approved,'+mxnName+'.$review_process,'+mxnName+'.$review,'+mxnName+'.$stop_processing,'+mxnName+'.$locked_for_me,'+mxnName+'.$editable';
				}
			}
		}
		var customData = {};
		if(this.getData('cxPropRl.action') === 'picklist_tracker'){
			customData.type = 'GET';
		}
		store.findAll(bulkReqModel,params,false,false,customData).then(function(resp){
			var res = resp;
			if(res && res[bulkReqModel] ){
				res = store.modelFor(this.getData('cxPropRl.module.id')) ? store.pushPayload(this.getData('cxPropRl.module.id'),res[bulkReqModel]) : res[bulkReqModel];
			}
			if(res && res.length && this.getData('cxPropRl.api_name') === 'Attachments'){
				res.forEach(function(file){
					this.fileSizeFormat(file);
				}.bind(this))
			}
			Lyte.arrayUtils(this.getData('cxPropRlData'),'push',res);
			if(resp.meta){
				this.setData({cxPropRlInfo : resp.meta ,makeRequestOnNavig : resp.meta.more_records})
			}
			this.setRelatedListData();
		}.bind(this));
	}, 
	fileSizeFormat : function(file){			
		if(file.$type == "Document" && file.$docs_file_size){
			file.Size = file.$docs_file_size
		}
		var size = file.Size / 1024;
		if(size > 1000){
			size = size / 1024;
			size = parseFloat(size).toFixed(2) + ' ' + I18n.getMsg('MB')
		}else if(size != 0){
			size = parseFloat(size).toFixed(2) + ' ' + I18n.getMsg('KB')
		}else{
			size = '-';
		}
		file.Size = size;
		if(file.$type == "Link URL"){
			file.extn = 'link'
		}		
	},
	findRLColumnsOnRefresh : function(rlId){
		store.findRecord('related_list',rlId,{module : this.data.cxPropModule , layout_id : this.data.cxPropLayoutId,include_inner_details : "fields.ui_type,fields.lookup,fields.formula,fields.rollup_summary,fields.field_label,fields.pick_list_values,fields.separator,fields.decimal_place,fields.data_type,fields.refer_from_field"}).then(function(res){
			if(res && res.length){
				this.setData({
					cxPropRl : res[0] 
				});
			}
		}.bind(this))
	},
	actions : {
		handleRlrecordAction : function(record,value,elem){
			//call user method
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',value ,record.id , this.getData('cxPropRl.id') , elem , event,record);
			}
		},
		refreshRLwithId : function(data){
			if(this.data && data.id === this.getData('cxPropRl.id')){
				var bulkReqModel = this.getData('cxPropModule');
				var rlMeta = this.getData('cxPropRl');
				var params = {relatedId : this.getData("cxPropEntityId") , relationId : rlMeta.id , per_page : 11 , page : 1 };
				if(this.data.cxPropBulkRequestTo === "moduleid"){
					bulkReqModel = this.data.cxPropModuleId;
				}
				if(data.fields){
					params.fields = data.fields;
				}
				var customData = {};
				if(this.getData('cxPropRl.action') === 'picklist_tracker'){
					customData.type = 'GET';
				}
				if(data.refreshTemplate){
					this.findRLColumnsOnRefresh(this.getData('cxPropRl.id'));
				}
				store.findAll(bulkReqModel,params,false,false,customData).then(function(resp){
					var res = resp;
					if(res && res[bulkReqModel] ){
						res = store.modelFor(this.getData('cxPropRl.module.id')) ? store.pushPayload(this.getData('cxPropRl.module.id'),res[bulkReqModel]) : res[bulkReqModel];
					}
					if(res && res.length && this.getData('cxPropRl.api_name') === 'Attachments'){
						res.forEach(function(file){
							this.fileSizeFormat(file);
						}.bind(this))
					}
					this.setData('cxPropRlData',[]);
					Lyte.arrayUtils(this.getData('cxPropRlData'),'push',res);
					if(resp.meta){
						this.setData({cxPropRlInfo : resp.meta ,makeRequestOnNavig : resp.meta.more_records})
					}
					this.setRelatedListData();
				}.bind(this));
				Lyte.triggerEvent('rlRefreshed',{id : data.id});
			}
		},
		relatedListTableRowClick : function(record,evnt){
			if(this.getMethods('rlTableRowClick')){
				return this.executeMethod('rlTableRowClick',record,evnt,this.data.cxPropRl);
			}
		}
		
	}, 
	methods : {
		// Functions which can be used as callback in the component.
		relatedListTableAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListWrapperAction')){
				return this.executeMethod('relatedListWrapperAction',actionId, rlId , elem , eventObj);
			}
		},
		navigNext : function(){
			this.setData('cxPropRlInfo.page',this.getData('cxPropRlInfo.page')+1);
			if(this.data.makeRequestOnNavig){
				this.relatedListObserver();
			}else{
				if(this.data.cxPropFromYield && this.getMethods('fetchRlRecords')){
					return this.executeMethod('fetchRlRecords',this.getData('cxPropRlInfo.page'), this.getData('cxPropRl.id') );
				}	
				this.setRelatedListData();
			}
		},
		navigPrevious : function(){
			this.setData('cxPropRlInfo.page',this.getData('cxPropRlInfo.page')-1);
			if(this.data.cxPropFromYield && this.getMethods('fetchRlRecords')){
				return this.executeMethod('fetchRlRecords',this.getData('cxPropRlInfo.page') , this.getData('cxPropRl.id') );
			}
			this.setRelatedListData();
		}
	},
	constructFieldMapping : function(){
		var _self = this;
		var lookupProperties = Lyte.deepCopyObject(_self.getData('cxPropLookupProperties'));//NO I18N
		if(_self.getData('cxPropRl.fields')){
			var allFields = _self.getData('cxPropRl.fields') , fieldMap = {} ,rlFields = [];
			var rlApiName = _self.getData('cxPropRl.api_name');
			if(rlApiName !== "Attachments" && this.getData('cxPropShowEditDeleteIcons')){ 
				Lyte.arrayUtils( _self.getData('prefixYields'), 'push' , {fixed  :"enable" , class : "editDeleteIcons"} )
			}
			if(allFields){
				allFields.forEach(function(field,index){
					if(field.ui_type && _self.data.defaultUiTypeToCruxMapping[field.ui_type]){
						fieldMap[field.api_name] = _self.data.defaultUiTypeToCruxMapping[field.ui_type];
					}else if(field.data_type && field.data_type !== "ownerlookup" && field.data_type !== "userlookup" && field.data_type !== "textarea"){
						fieldMap[field.api_name] = field.data_type;
					} 
					if(rlApiName === 'Contact_Roles' && field.api_name === 'Role' ){
						field.yieldName = "contact-role";
					}
					if(fieldMap[field.api_name] === "lookup" || field.isDisplayField){
						if(_self.getData('cxPropRl.type') === 'multiselectlookup' || field.isDisplayField){
							field.yieldName = "lookup";
						}else{
							var lkpMod = store.peekRecord('module',field.lookup.module.id);
							var lookupModName = lkpMod ? lkpMod.module_name : field.lookup.module.api_name;
							lookupProperties[field.api_name] ={
								"dynamicParams":'["' + lookupModName + '","{{row.' + field.api_name + '.id}}"]',/*for lookup record redirect while click the lookup value*///NO I18N
								"module":lookupModName,/*for lookup hover card*///NO I18N
							}
						}
					}
					if(field.isYield){
						field.yieldName = "custom-yield";
					}
					rlFields.push(field);
				})
				_self.setData({ fieldMapping : fieldMap , rlFields : rlFields , cxPropLookupProperties : lookupProperties});
			}
		}
		if(!this.getData('cxPropRl.transition')){
			this.setData('cxPropRl.transition',{route :'crm.tab.module.entity.detail' , module : this.getData('relatedModule')});
		}
	}.observes('cxPropRl.fields').on('init'),
	setRelatedListData : function(){
		if(this.getData('cxPropRl.fields') && this.getData('cxPropRl.fields').length && this.getData('cxPropRl.action') === 'picklist_tracker'){
				this.processRlFieldsForPickLisTracking();
		}
		if(this.data.cxPropRlData){
			if(this.data.cxPropRlData.length <= this.getData('cxPropRlInfo.per_page')-1){
				this.setData('tableData',[]);
				Lyte.arrayUtils(this.getData('tableData'),'push',this.getData('cxPropRlData'));
			}else{
				this.setData('startIndex',((this.getData('cxPropRlInfo.page') - 1) * (this.getData('cxPropRlInfo.per_page')-1)));
				this.setData('tableData',this.getData('cxPropRlData').slice(this.getData('startIndex'), this.getData('startIndex')+(this.getData('cxPropRlInfo.per_page')-1)));
			}
		}
	},
	processRlFieldsForPickLisTracking : function(){
		var data = this.getData('cxPropRlData');
		var refer_from_field = this.data.cxPropRl.fields.filter(function(x){if(x.refer_from_field){ 
			return x.refer_from_field.refer_from_field ;
		}
		return false;})
		if(moduleRecordMapping && moduleRecordMapping[this.getData('cxPropModule')] && data && data.length && refer_from_field && refer_from_field.length){			
			var modFields = store.peekRecord('module',moduleRecordMapping[this.getData('cxPropModule')].id);
			var picklistTracker = modFields && modFields.fields ? modFields.fields.filter(function(field){return field.history_tracking && field.data_type === "picklist"}) : [];
			picklistTracker = picklistTracker && picklistTracker.length ?  picklistTracker[0] : undefined;
			
			data.forEach(function(record){
				refer_from_field.forEach(function(field,index){
					if(field.refer_from_field && field.refer_from_field.refer_from_field && field.refer_from_field.refer_from_field.api_name === picklistTracker.api_name && 
						( record[field.api_name] === undefined || record[field.api_name] === null) && (index !== 0 || field.api_name !== 'Moved_To__s')){
							record[field.api_name] = 'No Value';
					}
				})
			})																	
		}
	},
	handleRlRefresh : function(){
		this.setRelatedListData();
	}.observes('cxPropRlData').on('init')
});
Lyte.Component.registerHelper('getNestedObjValue',function(recObj , apiName ,needIdOnly){//No I18N
	var keyValues = apiName.split('.');
	var recordValue = recObj;
	keyValues.forEach(function(item){
		if(recordValue){
			recordValue = recordValue[item];
		}
	});
	return needIdOnly && recordValue ? recordValue.id : recordValue;
});
Lyte.Component.registerHelper('getContactRole',function(id,values){ //no i18n
	if(id && values && values.length){
		var a = values.filter(function(item){ return item.id === id; });
		if(a.length){
			return a[0].display_value;
		}
	}
	return "";
});

Lyte.Component.register("crux-related-list-actions", {
_template:"<template tag-name=\"crux-related-list-actions\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropRelatedList.module.api_name,'===','Attachments'),'&amp;&amp;',cxPropShowAttachmentActions)}}\"><template case=\"true\"> <lyte-button id=\"attach_drop\" data-zcqa=\"Detail_Add_Attachemnt\" lt-prop-appearance=\"primary\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.attach.option.label')}} </template> </lyte-button> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"#attach_drop\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropRlActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item onclick=\"{{action('relatedListActionClicked',this,item['data-cid'],event)}}\"> <lyte-menu-label>{{item.label}}</lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropRelatedList.module.api_name,'!==','Attachments')}}\"><template case=\"true\"><template items=\"{{cxPropRlActions}}\" item=\"action\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowAllActions,'||',expHandlers(isIncludes(cxPropAvailableRlActions,action['data-cid']),'&amp;&amp;',if(checkAction('Edit',action),if(relatedListRecords.length,true,false),true)))}}\"><template case=\"true\"><lyte-button id=\"{{if(checkAction('Edit',action),expHandlers('relList_Edit_','+',cxPropRelatedList.id),expHandlers(expHandlers(expHandlers('relList_','+',action.label),'+','_'),'+',cxPropRelatedList.id))}}\" onclick=\"{{action('relatedListActionClicked',this,action['data-cid'],event)}}\" data-zcqa=\"{{if(action.data_zcqa,action.data_zcqa,action.zcqa)}}\" class=\"{{if(isIncludes(cxPropRlActionHide,action['data-cid']),'showOnCheckActions','hideOnCheckActions')}}\" lt-prop-appearance=\"primary\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\"> {{action.label}} </template> </lyte-button></template></template> </template></template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropRelatedList","cxPropRlActions","relatedListRecords","cxPropShowAttachmentActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropRlActionHide"],
_observedAttributesType :["object","array","array","boolean","boolean","array","array"],

	data : function(){
		return {
			cxPropRelatedList : Lyte.attr('object'), 
			cxPropRlActions : Lyte.attr('array'),
			relatedListRecords : Lyte.attr('array',{default : []}),
			cxPropShowAttachmentActions : Lyte.attr('boolean'),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropRlActionHide : Lyte.attr('array')
		}		
	},
	observeCount : function(){
		if(!this.getData('relatedListRecords.length')){
			$L(this.$node.querySelector("#relList_Edit_" + this.getData('cxPropRelatedList.id'))).hide();
		}
	}.observes('relatedListRecords.[]').on('init'),
	actions : {
		// Functions for event handling
		relatedListActionClicked : function(elem,action,eventObj){
			if(this.getMethods('relatedListAction')){
				this.executeMethod('relatedListAction',action,this.getData('cxPropRelatedList.id'),elem,eventObj);
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	},
	didConnect : function(){
		var campActions = this.$node.querySelectorAll('.showOnCheckActions');//No I18N
		if(campActions.length){
			campActions.forEach(function(elem){$L(elem).hide();})
		}
	}
});
Lyte.Component.registerHelper("checkAction",function(type,action){//No I18N 
	var actionName = action.data_zcqa ? action.data_zcqa.toLowerCase() : action.zcqa ? action.zcqa.toLowerCase() : "";
	var result = false; 
	if(type === 'Edit'){//No I18N
		result = actionName.includes('edit') || action['data-cid'] === 'dissociateMxN';//No I18N
	}
	return result;
});
Lyte.Component.registerHelper("isIncludes",function(array,value){//No I18N 
	if(array && array.length && value){
		return array.includes(value);
	}
	return false;
});

Lyte.Component.register("crux-detailpage-tags", {
_template:"<template tag-name=\"crux-detailpage-tags\"> <span class=\"{{if(expHandlers(inEditMode,'!'),'zcicncss-tag zcicn-cssIcons zcicn_grey_mask mR7 vam left0 top2 dvTagIcon','')}} cruxDetailTag_{{componentUniqueId}} tagsIconHolder\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropExistingTags.length,'&amp;&amp;',expHandlers(inEditMode,'!'))}}\"><template case=\"true\"><div class=\"cxDvCompParent cxDvTagsParent\"> <crux-tag-component cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-trigger-tag-click=\"true\" cx-prop-clip-mode=\"true\" cx-prop-value=\"{{cxPropExistingTags}}\" cx-prop-is-color-code-enabled=\"true\" cx-prop-from=\"view\"></crux-tag-component> <template is=\"if\" value=\"{{cxPropSupportAjaxEdit}}\"><template case=\"true\"><span class=\"cxDvTagFieldEditIcon cxCP\" data-zcqa=\"detailViewLyteAddTag\" id=\"tags_edit_icon\" onclick=\"{{action('openEditPopup')}}\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span></template></template> </div></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSupportAjaxEdit}}\"><template case=\"true\"><div onclick=\"{{action('openEditPopup')}}\"> {{cruxGetI18n(\"crm.label.add.tags\")}} </div></template></template></template></template> <lyte-popover id=\"crux-detailview_addtag\" lt-prop-width=\"570px\" lt-prop-origin-elem=\".cruxDetailTag_{{componentUniqueId}}\" lt-prop-placement=\"bottomLeft\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{lbind(inEditMode)}}\" lt-prop-wrapper-class=\"crux_detailview_addtag\" lt-prop-type=\"box\" lt-prop-boundary=\"{&quot;left&quot;:&quot;100&quot;,&quot;top&quot;:&quot;0&quot;}\" lt-prop-content-padding=\"13px 35px\" lt-prop-footer-padding=\"5px 35px 25px\" lt-prop-close-on-body-click=\"true\" lt-prop-allow-multiple=\"true\" on-before-close=\"{{method('open_pop')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <span class=\"zcicncss-tag zcicn-cssIcons zcicn_grey_mask pA mR7 lft10 top20\"></span> <crux-tag id=\"defaulttagedit\" cx-prop-id=\"view\" cx-prop-tag-options=\"{{lbind(cxPropRecordTags)}}\" cx-prop-tags=\"{{cxPropExistingTags}}\" cx-prop-allow-dropdown=\"true\" cx-prop-comma-seperation=\"true\" cx-prop-prevent-key-list=\"[&quot;<&quot;,&quot;>&quot;,&quot;,&quot;]\" on-before-add-tag=\"{{method('validate_tags')}}\" on-remove-tag=\"{{method('addToRecordTags')}}\" on-add-tag=\"{{method('addToallTags')}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"> </crux-tag> </lyte-popover-content> <lyte-popover-footer class=\"alignright\"> <lyte-button lt-prop-size=\"small\" lt-prop-appearance=\"default\" onclick=\"{{action('hideAddTagPopup')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.cancel\")}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-size=\"small\" data-zcqa=\"crux_savetag_btn\" onclick=\"{{action('saveTags')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.save\")}} </template> </lyte-button> </lyte-popover-footer> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropExistingTags","cxPropRecordTags","cxPropModule","inEditMode","addedCount","newlyCreatedTags","cxPropMaxTagLimit","cxPropSupportAjaxEdit","cxPropModuleName","componentUniqueId"],
_observedAttributesType :["array","array","string","boolean","number","array","number","boolean","string","string"],

	data : function(){
		return {
			cxPropExistingTags : Lyte.attr('array',{default : []}),
			cxPropRecordTags : Lyte.attr('array',{default : []}),
			cxPropModule : Lyte.attr('string'),
			inEditMode : Lyte.attr('boolean',{default:false}),
			addedCount : Lyte.attr('number',{default : 0}),
			newlyCreatedTags : Lyte.attr('array',{default : []}),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropModuleName 	 : Lyte.attr('string'),
			componentUniqueId : Lyte.attr('string',{default : Math.floor(Math.random() * Date.now()).toString()})
		}		
	},
	init : function(){
		if(this.data.cxPropExistingTags){
			this.allAvailableTags = this.data.cxPropExistingTags.slice();
		}
		this.allAvailableTags = this.allAvailableTags ? this.allAvailableTags : [];
		if(this.data.cxPropRecordTags){
			Lyte.arrayUtils(this.allAvailableTags , 'push' , this.data.cxPropRecordTags.slice());
		}
	},
	actions : {
		openEditPopup : function(){	
			if(this.data.cxPropExistingTags){
				this.beforeEditExisting = this.getData('cxPropExistingTags').slice();
			}
			if(this.data.cxPropRecordTags){
				this.beforeEditRecordsTag = this.getData('cxPropRecordTags').slice();
			}
			this.setData('inEditMode',true);
		},
		hideAddTagPopup : function(){
			this.setData('inEditMode',false);
			this.setData({cxPropExistingTags : this.beforeEditExisting, newlyCreatedTags : [] , cxPropRecordTags : this.beforeEditRecordsTag});
		},
		saveTags : function(){
			if(this.getMethods('onTagSave')){
				var finalTags = this.executeMethod('onTagSave',this.data.cxPropExistingTags,this.data.newlyCreatedTags);
				this.setData({cxPropExistingTags : finalTags});
			}
			this.setData('inEditMode',false);
		}
	},
	methods : {
		validate_tags : function(tagName){
			var hasSplChar = this.validate_spl_char(tagName);
			if(!hasSplChar){
				this.setData('addedCount',this.data.addedCount+1);
			}
			return !hasSplChar;
		},
		addToRecordTags : function(tagName){
			var removedTag = this.allAvailableTags.filter(function (x) { return x.name === tagName });
			if(removedTag.length ){
				if(!this.getData('newlyCreatedTags').includes(removedTag[0])){
					Lyte.arrayUtils(this.getData('cxPropRecordTags'), 'push' , removedTag);
				}else{
					Lyte.arrayUtils(this.getData('newlyCreatedTags'), 'removeObjects' , removedTag);
				}
			}
			
		},
		open_pop :function(){
        	var alert_msg = document.querySelector('.alertPopup');//no i18n
        	if(alert_msg!=null){
        	    return false;
        	}
       	},
		addToallTags  : function(createdTag){
			var createdTagObj = this.data.cxPropExistingTags.filter(function (item) { return item.name === createdTag });
			Lyte.arrayUtils(this.getData('newlyCreatedTags') , 'push' , createdTagObj);
			Lyte.arrayUtils(this.allAvailableTags , 'push' , createdTagObj);
		}
	},
	validate_spl_char : function(tagname)
    {
    	var _splchar = false;
        if(tagname.match(/[/\\!@#$%^&*()[\].?":{}~`;'|]/) || tagname.indexOf("+")>-1 ||tagname.indexOf("-")>-1){
        	var taglen = tagname.length;
        	for(var i=0;i<taglen;i++){
				if(tagname[i].match(/[/\\!@#$%^&*()[\].?":{}~`;'|]/) || tagname[i] === "+" ||tagname[i] === "-"){
					_splchar = true;
				}else{
					_splchar = false;
				}
				if(!_splchar){
					break;
				}
			}           
            if(_splchar){
				document.querySelector("crux-tag").toggle("close")//no i18n
                _cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : 'Tag name should contain Alphanumeric characters.',ltPropContentAlign : "center"}});//no i18n
               return true;
            }
        }
        return false;
    }

});

Lyte.Component.register("crux-color-palette", {
_template:"<template tag-name=\"crux-color-palette\"> <span class=\"cxColorDropperOuter\" data-zcqa=\"colorPaletteOpen\" onclick=\"{{action('openPalette',this)}}\"> <span class=\"cxColorDropperCircle cxVam {{concat('cx',cruxReplace(cxPropSelectedColor,'#',''))}}\" id=\"cxPaletteOpener_{{cxPropId}}\" style=\"{{if(ifEquals(cxPropSelectedColor,'noFill'),'',concat('background-color : ',cxPropSelectedColor))}};\"></span> <span class=\"cxPaletteDropArrow\"></span> </span> <lyte-popover lt-prop-placement=\"bottom top\" lt-prop-freeze=\"false\" lt-prop-scrollable=\"true\" lt-prop-content-padding=\"0px\" lt-prop-auto-align=\"{{cxPropAutoAlignPopover}}\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-wrapper-class=\"cxPaletteWrapper {{cxPropWrapperClass}}\" on-before-close=\"{{method('popoverBeforeClose')}}\" on-close=\"{{method('popoverClose')}}\" lt-prop-origin-elem=\"#cxPaletteOpener_{{cxPropId}}\" lt-prop-width=\"{{cxPropPopoverWidth}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxPalettePopoverContent\"> <div id=\"predefinedColorContainer\"> <template is=\"if\" value=\"{{cxPropShowText}}\"><template case=\"true\"> <div class=\" cxAlignCenter cxPaletteSampleTextContainerParent\"> <span class=\"cxPaletteSampleTextContainer cxPaletteSampleTextContainerContent {{if(ifEquals(cxPropSelectedColor,'noFill'),'cxPaletteSampleNofill','')}}\" style=\"background-color: {{bgColor}}; color : {{clr}}\">{{cruxGetI18n('crm.picklist.sample.text')}}</span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(showColorPicker,'!'),'&amp;&amp;',expHandlers(cxPropAlwaysShowColorPicker,'!'))}}\"><template case=\"true\"> <div class=\"cxColorPalette\"> <template is=\"if\" value=\"{{cxPropNoFill}}\"><template case=\"true\"> <span class=\"cxPaletteCircle cxnoFill {{if(expHandlers('noFill','==',cxPropSelectedColor),'cxPaletteSelected','')}}\" data-zcqa=\"noFillColor\" onclick=\"{{action('selectedColor','noFill')}}\"></span> </template></template> <template is=\"for\" items=\"{{defaultColors}}\" item=\"item\" index=\"index\"> <span class=\"cxPaletteCircle {{if(expHandlers(item,'==',cxPropSelectedColor),'cxPaletteSelected selectedColor_picklist','')}} {{concat('cx',cruxReplace(item,'#',''))}}\" data-zcqa=\"color{{cruxReplace(item,'#','')}}\" onclick=\"{{action('selectedColor',item)}}\" style=\"background-color : {{item}};\"></span> </template> </div> <template is=\"if\" value=\"{{cxPropMoreColorButton}}\"><template case=\"true\"> <div class=\"cxPaletteMoreColorsBtn cxAlignCenter\" data-zcqa=\"cp_addNewColor\" id=\"addNewColor\" onclick=\"{{action('showColorpicker')}}\"> <span class=\"cxVam cxPaletteColorPickerIcon\"></span> <span class=\" cxPaletteColorPickerIconColor cxVam\">{{cruxGetI18n('crm.more.colors')}}</span> </div> </template></template> </template><template case=\"false\"> <div id=\"cxLytePickerWrapper\"> <lyte-colorpicker lt-prop-show=\"true\" lt-prop-basic-color-picker=\"false\" lt-prop-selected-color=\"{{cxPropSelectedColor}}\" lt-prop=\"{&quot;boardColor&quot;:&quot;{{boardColor}}&quot;, &quot;inline&quot; : true}\" on-open=\"{{method('addQA')}}\" on-change=\"{{method('colorChanged')}}\" lt-prop-freeze=\"true\" id=\"colorpicker_dropper\" class=\"cxPaletteColorPicker\"></lyte-colorpicker> </div> <div class=\" cxPaletteProceedBtns\"> <lyte-button lt-prop-appearance=\"default\" lt-prop-size=\"small\" onclick=\"{{action('showPredefinedColors')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.back.alone')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-size=\"small\" onclick=\"{{action('setCustomcolor')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('Done')}} </template> </lyte-button> </div> </template></template> </div> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["cxPropSelectedColor","'noFill'"]}},"''",{"type":"helper","value":{"name":"concat","args":["'background-color : '","cxPropSelectedColor"]}}]}},"';'"]}}}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color: '","bgColor","'; color : '","clr"]}}}},{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color : '","item","';'"]}}}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropNoFill","cxPropDefaultColors","cxPropMoreColorButton","cxPropSelectedColor","cxPaletteOpen","cxPropAutoAlignPopover","showColorPicker","boardColor","cxPropShowText","bgColor","cxPropAddCustomColorsToPalette","cxPropShow","cxPropWrapperClass","defaultColors","cxPropPopoverWidth","cxPropId","cxPropAlwaysShowColorPicker"],
_observedAttributesType :["boolean","array","boolean","string","boolean","boolean","boolean","string","boolean","string","boolean","boolean","string","array","string","string","boolean"],
//no i18n
	data : function(){
		return {
			cxPropNoFill : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropDefaultColors : Lyte.attr('array',{default : ['#F17574','#F48435','#E7A826','#A8C026','#63C57E','#1DB9B4','#57B1FD','#879BFC','#D297EE','#FD87BD',"#969696",'#658BA8','#B88562']}), //no i18n
			cxPropMoreColorButton : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropSelectedColor : Lyte.attr('string',{default : 'noFill'}), //no i18n
			cxPaletteOpen : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropAutoAlignPopover : Lyte.attr('boolean',{default : true}), //no i18n
			showColorPicker : Lyte.attr("boolean", {default : false}), //no i18n
			boardColor : Lyte.attr("string", {default : 'ff0000'}),//NO I18n
			cxPropShowText : Lyte.attr("boolean", {default : true}),//NO I18n
			bgColor : Lyte.attr("string"),//NO I18n
			cxPropAddCustomColorsToPalette : Lyte.attr("boolean", {default : false}),//NO I18n
			cxPropShow : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropWrapperClass : Lyte.attr("string", {default :''}),//No I18n
			defaultColors : Lyte.attr("array"),//No I18n
			cxPropPopoverWidth : Lyte.attr('string',{default : '240px'}), //no i18n
			cxPropId : Lyte.attr("string"),
			cxPropAlwaysShowColorPicker : Lyte.attr('boolean',{default : false}) //no i18n
		}		
	},
	init : function(){
		this.$node.closePalette = function(){
			this.component.setData('cxPaletteOpen',false);//no i18n
			var popover = this.querySelector('lyte-popover'); //no i18n
			popover.ltProp('duration',undefined); //no i18n
			popover.ltProp('show',false);//no i18n
			popover.ltProp('duration',400); //no i18n
		}
		this.$node.alignColorPalette = function(){
			this.querySelector('lyte-popover').alignPopover(); //no i18n
		}
		this.$node.resetColorPalette = function(){
			this.setData("defaultColors", this.component.data.cxPropDefaultColors.slice(0));//No I18n
		}
		this.customColorLen = 0;
		this.$node.resetColorPalette();
	},
	actions : {
		selectedColor : function(color){
			if(this.getMethods('onSelectColor')){
				this.executeMethod('onSelectColor',color);//no i18n
			}
			this.setData('cxPropSelectedColor',color);//no i18n
			this.highlightSelectedColor();
			var check = true;
			if(this.getMethods('onBeforeColorPaletteHide')){
				check = this.executeMethod('onBeforeColorPaletteHide',this.data.cxPropId);//no i18n
				check = check == false ? false : true;
			}
			if(check){
				this.$node.querySelector('lyte-popover').ltProp('show',false);//no i18n
			}
		},
		openPalette : function(node){
			if(this.data.cxPaletteOpen){
				setTimeout(function(){
					this.$node.querySelector('lyte-popover').ltProp('show',false);//no i18n
				}.bind(this),10);
			}
			var check = true;
			if(this.getMethods('onBeforeColorPalleteOpen')){
				check = this.executeMethod('onBeforeColorPalleteOpen',this.data.cxPropId);//no i18n
			}
			if(check){
				if(this.data.cxPropShowText){
					if(this.data.cxPropSelectedColor != "noFill"){
						this.setData({"bgColor" : this.getRgbFromHex(this.data.cxPropSelectedColor), clr : this.getPicklistFontColor(this.data.cxPropSelectedColor)})//NO I18n
					}
					else{
						this.setData({bgColor : "transparent", clr : "black"})//no i18n
					}
				}
				this.$node.querySelector('lyte-popover').ltProp('show',true);//no i18n
				node.classList.add('cxPalleteOpened'); //no i18n
				this.setData('cxPaletteOpen',true);//no i18n
				this.setData("showColorPicker", false);//no i18n
				if(this.getMethods('onColorPaletteOpen')){
					this.executeMethod('onColorPaletteOpen',this.data.cxPropId);//no i18n
				}
				this.highlightSelectedColor();
				this.setData("cxPropShow", true)//No I18n
			}
		},
		showColorpicker : function(){
			var selectedColor;
			if(this.data.cxPropSelected == "noFill" || !this.data.cxPropSelectedColor){
				selectedColor = "#ffffff"; //no i18n
			}
			else{
				selectedColor = this.data.cxPropSelectedColor;
			}
			this.setData("boardColor", this.getHexFromRgb(selectedColor)); //no i18n
			this.setData("showColorPicker", true) //no i18n
			this.tempColor = this.data.cxPropSelectedColor;
		},
		setCustomcolor : function(){
			if(this.getMethods('onSelectColor')){
				this.executeMethod('onSelectColor',this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
			}
			this.setData("cxPropSelectedColor", this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
			if(this.tempColor != "noFill" && this.data.cxPropAddCustomColorsToPalette && this.customColorLen < 10 && this.data.defaultColors.indexOf(this.tempColor.hex ? this.tempColor.hex : this.tempColor) == -1){
				Lyte.arrayUtils(this.data.defaultColors, "push", this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
				this.customColorLen++;
			}
			this.setData('cxPaletteOpen', false);//no i18n
			this.setData("cxPropShow", false);//NO I18n
			setTimeout(function(){
				this.setData("showColorPicker", false);//no i18n
			}.bind(this),10)
		},
		showPredefinedColors : function(){
			this.setData("showColorPicker", false);//NO I18n
			this.executeMethod("colorChanged", undefined, this.data.cxPropSelectedColor);//NO I18n
			this.highlightSelectedColor();
			// this.setData('cxPaletteOpen',false);//no i18n
		}
	},
	methods : {
		popoverClose : function(event,popoverElement){
			var node = this.$node.querySelector('.cxPalleteOpened'); //no i18n
			node && node.classList.remove('cxPalleteOpened'); //no i18n
			popoverElement.setData('ltPropBindToBody',false)
			this.setData('cxPaletteOpen',false);//no i18n
			if(this.getMethods('onColorPaletteHide')){
				this.executeMethod('onColorPaletteHide',this.data.cxPropId,event);//no i18n
			}
		},
		popoverBeforeClose : function(event){
			if(this.getMethods('onBeforeColorPaletteHide')){
				return this.executeMethod('onBeforeColorPaletteHide',this.data.cxPropId,event);//no i18n
			}
		},
		addQA: function () {
			const popover = this.$node.querySelector("lyte-popover");
			if (popover && popover.component && popover.component.childComp) {
				const child = popover.component.childComp;
				const inputShowValue = child.querySelector("#lyteCPShowValue input"); //eslint-disable-line @zoho/webperf/no-complex-selector
				const inputAlpha = child.querySelector("#lyteCP__A input"); //eslint-disable-line @zoho/webperf/no-complex-selector
				const previewDiv = child.querySelector(".previewDiv");

				if (inputShowValue) {
					inputShowValue.setAttribute('data-zcqa', 'cp_hashcode');
				}
				if (inputAlpha) {
					inputAlpha.setAttribute('data-zcqa', 'cp_alpha');
				}
				if (previewDiv) {
					previewDiv.setAttribute('data-zcqa', 'cp_preview');
				}
			}
		},
		colorChanged : function(ev, color){
			this.setData({"bgColor" : this.getRgbFromHex(color.hex ? color.hex : color), clr : this.getPicklistFontColor(color.hex ? color.hex : color)})//NO I18n
			this.tempColor = color;
		}
	},
	getPicklistFontColor : function(colourCode){
		return Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(colourCode);
		// if(colourCode && colourCode !== "" && colourCode.indexOf("#") === 0){
		// 	colourCode = colourCode.substring(1);
		// 	var c_r = parseInt(colourCode.substr(0, 2), 16);
		// 	var c_g = parseInt(colourCode.substr(2, 2), 16);
		// 	var c_b = parseInt(colourCode.substr(4, 2), 16);
		// 	var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
		// 	if(brightness < 175){
		// 		return "white"; //NO I18N
		// 	}
		// }
		// return "black"; //NO I18N
	},
	highlightSelectedColor : function(){
		var fontColor = this.getPicklistFontColor(this.data.cxPropSelectedColor);
		if(fontColor === "var(--crux-tag-dark-color)"){
			$L(".cxPaletteWrapper .cxPaletteSelected").addClass("cxColorPaletteSelDarkIcon");//NO I18N
		}
		else{
			$L(".cxPaletteWrapper .cxPaletteSelected").removeClass("cxColorPaletteSelDarkIcon");	//NO I18N
		}
	},
	getRgbFromHex : function(e){
		if(e == "noFill"){
			return "transparent";//No I18n
		}
		null == e && (e = "ffffff");//no i18n
	    var t = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
	    return t && 4 === t.length ? ("0" + parseInt(t[1], 10).toString(16)).slice(-2) + ("0" + parseInt(t[2], 10).toString(16)).slice(-2) + ("0" + parseInt(t[3], 10).toString(16)).slice(-2) : e
	},
	getHexFromRgb : function(rgb)
	{
		if(rgb == "noFill"){
			return "#ffffff";
		}
		if (rgb === undefined) {
		    return undefined;
		}
		if (rgb.startsWith("rgba")) {
		    return Events.rgbatohexa(rgb);
		} else {
		    if (rgb.search("rgb") === -1) {
		        return rgb;
		    } else {
		        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		        function hex(x) {
		            return ("0" + parseInt(x).toString(16)).slice(-2);
		        }
		        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		    }
		}
	}
});

//# sourceMappingURL=crux-detailpage-resources.js.map