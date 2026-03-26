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
