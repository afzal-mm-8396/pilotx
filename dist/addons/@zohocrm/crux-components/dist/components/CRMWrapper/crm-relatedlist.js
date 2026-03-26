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