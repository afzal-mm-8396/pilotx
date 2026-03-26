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