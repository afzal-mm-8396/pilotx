/**
 * @component crm-listview
 * @author rafik.shaik
 * @summary  CRM wrapper component  for crux-list-view component
 */
Lyte.Component.register("crm-listview", {
_template:"<template tag-name=\"crm-listview\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxLvLoadingDiv\"><div class=\"cxSpinloader cxLvLoader\"></div></div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> {{addMurhyInfo(\"crm-listview.html\",\"Feb Default Changes\")}} <crux-list-view cx-prop-selected-ids=\"{{cxPropSelectedIds}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-module-api-name=\"{{cxPropModuleApiName}}\" cx-prop-cvid=\"{{cxPropCvid}}\" cx-prop-is-link-to-not-supported=\"{{cxPropIsLinkToNotSupported}}\" cx-prop-module-record-mapping=\"{{cxPropModuleRecordMapping}}\" cx-prop-id-module-mapping=\"{{cxPropIdModuleMapping}}\" cx-prop-module-api-mapping=\"{{cxPropModuleApiMapping}}\" cx-prop-is-inventory-module=\"{{cxPropIsInventoryModule}}\" cx-prop-crm-implied-edit-module=\"{{cxPropCrmImpliedEditModule}}\" cx-prop-per-page=\"{{cxPropPerPage}}\" cx-prop-page=\"{{cxPropPage}}\" cx-prop-show-check-box=\"{{cxPropShowCheckBox}}\" cx-prop-show-edit-icon=\"{{cxPropShowEditIcon}}\" cx-prop-show-quick-actions-menu=\"{{cxPropShowQuickActionsMenu}}\" cx-prop-show-more-option=\"{{cxPropShowMoreOption}}\" cx-prop-show-more-option-after-edit=\"{{cxPropShowMoreOptionAfterEdit}}\" cx-prop-show-close-icon=\"{{cxPropShowCloseIcon}}\" cx-prop-show-search-letter=\"{{cxPropShowSearchLetter}}\" cx-prop-module-actions-menu=\"{{cxPropModuleActionsMenu}}\" cx-prop-search-letter=\"{{cxPropSearchLetter}}\" cx-prop-search-field=\"{{cxPropSearchField}}\" on-list-view-row-click=\"{{method('onWprListViewRowClick')}}\" on-custom-button-click=\"{{onWprCustomButtonClick}}\" on-before-load-failure=\"{{method('onWprBeforeLoadFailure')}}\" on-get-record-data=\"{{method('onWprGetRecordData')}}\" on-before-load-success=\"{{method('onWprBeforeLoadSuccess')}}\" on-call-menu-click=\"{{method('onWprCallMenuClick')}}\" cx-prop-fetch-count-values=\"{{cxPropFetchCountValues}}\" cx-prop-module-info=\"{{cxPropModuleData}}\" cx-prop-custom-button=\"{{cxPropCustomButton}}\" cx-prop-custom-view=\"{{cxPropCustomViewInfo}}\" cx-prop-list-view-content=\"{{cxPropListViewContent}}\" cx-prop-related-list=\"{{cxPropRelatedList}}\" cx-prop-record-count=\"{{cxPropRecordCount}}\" cx-prop-is-lookup-yield=\"{{cxPropIsLookupYield}}\" error-details=\"{{ErrorMsgData}}\" cx-prop-show-activity-badge=\"{{cxPropShowActivityBadge}}\" on-list-view-activity-badge-click=\"{{method('onWprActivityBadgeClick')}}\" is-lv-wrapper=\"true\" cx-prop-show-select-all=\"false\" cx-prop-show-manage-column=\"{{cxPropShowManageColumn}}\" cx-prop-show-sort-icon=\"{{cxPropShowSortIcon}}\" cx-prop-show-per-page-dropdown=\"{{cxPropShowPerPageDropdown}}\"> <template is=\"yield\" yield-name=\"listview-lookup\"> <lyte-yield yield-name=\"crmlist-{{fieldObj.yieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template> </crux-list-view> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}],
_observedAttributes :["lyteViewPort","cxPropShowManageColumn","cxPropModuleInformationType","cxPropModuleApiName","cxPropModuleData","cxPropCustomViewInformationType","cxPropCvid","cxPropCustomViewInfo","cxPropPerPage","cxPropPage","cxPropSelectedIds","cxPropModuleRecordMapping","cxPropListViewContent","cxPropShowPerPageDropdown","cxPropContentOverflow","cxPropShowSortIcon","cxPropRecordCount","cxPropRelatedList","cxPropModuleApiMapping","cxPropIdModuleMapping","cxPropSearchLetter","cxPropSearchField","cxPropIsLinkToNotSupported","cxPropIsLookupYield","cxPropModule","cxPropFetchCountValues","cxPropIsInventoryModule","cxPropCrmImpliedEditModule","cxPropShowActivityBadge","cxPropShowCheckbox","cxPropShowEditIcon","cxPropShowQuickActionsMenu","cxPropShowMoreOption","cxPropShowMoreOptionAfterEdit","cxPropShowCloseIcon","cxPropShowSearchLetter","cxPropModuleActionsMenu","cxPropCustomButton","ErrorMsgData","isFieldChanged"],
_observedAttributesType :["boolean","boolean","string","string","object","string","string","object","number","number","array","object","array","boolean","boolean","boolean","number","array","object","object","string","string","boolean","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","array","object","boolean"],

	_lyteUtilFunctions: ["refresh","getSelectedIds"],
	data : function(){
		return {
			lyteViewPort: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
			 /**
             * @componentProperty { moduleApiName | moduleData  } cxPropModuleInformationType=moduleApiName
             * @author kuralarasan.s
             * @version 1.0.0
			 * @input
             */
			/**
			 * @componentProperty { boolean } cxPropShowManageColumn=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowManageColumn : Lyte.attr("boolean",{default : true}),//No I18N
			 cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true ,  "input" : true }),//no i18n
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author authorName
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleApiName
			 * @input
			 */
			cxPropModuleApiName:Lyte.attr("string",{default:"" ,"input" : true}),
			/**
			 * @componentProperty { object } cxPropModuleData
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleData
			 * @input
			 */
			cxPropModuleData:Lyte.attr("object",{default:{} , "input" : true}),
			 /**
             * @componentProperty { customviewId | customviewInfo  } cxPropCustomViewInformationType=customviewId
             * @author kuralarasan.s
             * @version 1.0.0
			 * @input
             */
			 cxPropCustomViewInformationType: Lyte.attr("string", { default: "", hideAttr: true , "input" : true }),//no i18n
			/**
			 * @componentProperty { string } cxPropCvid
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @condition cxPropCustomViewInformationType customviewId
			 * @input
			 */
			cxPropCvid : Lyte.attr("string",{"input" : true}), 
			/**
			 * @componentProperty { object } cxPropCustomViewInfo
			 * @author authorName
			 * @version 1.0.0
			 * @condition cxPropCustomViewInformationType customviewInfo
			 * @input
			 */
			cxPropCustomViewInfo:Lyte.attr("object",{"input" : true}),
			/**
			 * @componentProperty { 10 | 20 | 30 | 40 | 50  } cxPropPerPage=10
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @input
			 */
			cxPropPerPage:Lyte.attr('number',{"input" : true}),
			/**
			 * @componentProperty { number } cxPropPage
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @input
			 */
			cxPropPage:Lyte.attr('number',{default:1 , "input" : true}),
			/**
			 * @componentProperty { array } cxPropSelectedIds
			 * @author siilambarasan.rt
			 * @version 1.0.0
			 * @input @output
			 */
			cxPropSelectedIds:Lyte.attr('array',{default:[] ,  "input" : true , "output" : true }),
			/**
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleRecordMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { array } cxPropListViewContent
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropListViewContent:Lyte.attr("array",{default:[]}),
			/**
			 * @componentProperty { number } cxPropRecordCount
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			/**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author rafik.shaik
             * @version 1.0.0
             */
			cxPropShowPerPageDropdown : Lyte.attr("boolean",{default:true}),
            cxPropContentOverflow: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropShowSortIcon:Lyte.attr("boolean",{default:true}),
			cxPropRecordCount:Lyte.attr("number"),
			cxPropRelatedList:Lyte.attr("array"),
			cxPropModuleApiMapping:Lyte.attr("object",{default:{}}),
			cxPropIdModuleMapping:Lyte.attr("object",{default:{}}),
			cxPropSearchLetter : Lyte.attr('string',{default:"All"}),
			cxPropSearchField : Lyte.attr('string'),
			cxPropIsLinkToNotSupported:Lyte.attr("boolean",{default:true}),
			cxPropIsLookupYield:Lyte.attr("boolean",{default:false}),
			cxPropModule:Lyte.attr('string'),
			cxPropFetchCountValues : Lyte.attr("boolean", {default :true}),
			cxPropIsInventoryModule:Lyte.attr("boolean",{default:false}),
			cxPropCrmImpliedEditModule:Lyte.attr("boolean",{default:false}),
			cxPropShowActivityBadge:Lyte.attr("boolean",{default:true}),
			cxPropShowCheckbox:Lyte.attr("boolean",{default:true}),
			cxPropShowEditIcon:Lyte.attr("boolean",{default:false}),
			cxPropShowQuickActionsMenu:Lyte.attr("boolean",{default:true}),
			cxPropShowMoreOption:Lyte.attr("boolean",{default:false}),
			cxPropShowMoreOptionAfterEdit:Lyte.attr("boolean",{default:false}),
			cxPropShowCloseIcon:Lyte.attr("boolean",{default:false}),
			cxPropShowSearchLetter:Lyte.attr("boolean",{default:true}),
			cxPropModuleActionsMenu : Lyte.attr('array',{default : [{"name":"Edit","value":"Edit"},{"name":"Change Owner","value":"change_owner"},{"name":"Delete","value":"mass_delete"}]}),
			cxPropCustomButton:Lyte.attr("array"),
			ErrorMsgData:Lyte.attr("object",{default:{"show_error":false}}),
			isFieldChanged : Lyte.attr("boolean",{default:false})
		};		
	},
	init:function(){
		if( typeof moduleRecordMapping !== "undefined" ){ 
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping);

		}
		if(Object.keys(this.data.cxPropIdModuleMapping).length === 0 && Object.keys(this.data.cxPropModuleApiMapping).length === 0){
			var idModuleMap = {}, moduleApiMap={} , moduleMap = this.data.cxPropModuleRecordMapping;
			for (var key in moduleMap) {
				idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
				moduleApiMap[key]= moduleMap[key].api_name;
			}
			this.setData({"cxPropIdModuleMapping":idModuleMap,"cxPropModuleApiMapping":moduleApiMap});
		}		
		if(!this.data.cxPropModule && !this.data.cxPropModuleApiName && this.data.cxPropModuleData){
			 this.setData("cxPropModule",this.data.cxPropModuleData.module_name);
			// this.setData("orginalModuleData",Lyte.deepCopyObject(this.data.cxPropModuleData));
		}else{
			this.setData({cxPropModuleData:  {} , cxPropCustomViewInfo: {}});	
		}
		if(!this.data.cxPropCvid && this.data.cxPropCustomViewInfo){
			// this.setData("cxPropCvid",this.data.cxPropCustomViewInfo.id);
			this.setData("orginalCustomViewInfo",Lyte.deepCopyObject(this.data.cxPropCustomViewInfo));
		}else{
			this.setData('cxPropCustomViewInfo',{});
		}
		if(!this.data.cxPropModule && this.data.cxPropModuleApiName){
			this.setModuleName() ;
		}
		this.setData("orginalModuleData",Lyte.deepCopyObject(this.data.cxPropModuleData));
		var crm_imp_edit_mod=(typeof Crm !== 'undefined')?Crm.userDetails.permissions["Crm_Implied_Edit_"+this.data.cxPropModule]:this.data.cxPropCrmImpliedEditModule;
		var is_inv_mod=(typeof Crm !== 'undefined') && Crm.isInventoryModule?Crm.isInventoryModule(this.data.cxPropModule):this.data.cxPropIsInventoryModule;
		this.setData({"cxPropCrmImpliedEditModule":crm_imp_edit_mod,"cxPropIsInventoryModule":is_inv_mod});
		this.moduleRecFlag=false;
		var {cxPropListViewContent : Lv_content}=this.data;
		if(Lv_content && Lv_content.length==0){
			this.setData("isFieldChanged",true) ;  
		}
		// else{
		// 	this.setData("cxPropModuleApiName",""); //  widget case observer issue fix when  module name entered for initial case .
		// }
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		onWprListViewRowClick:function(record,event){
			if(this.getMethods("onListViewRowClick")){
				/**
				 * This method will be triggered on Rowclick of list view
				 * @method onListViewRowClick
				 * @author rafik.shaik
				 */
				if( record && record.$ && record.$.toJSON ){
					record = record.$.toJSON();
				}
				this.executeMethod('onListViewRowClick',record,event);
			}
		},
		onWprCustomButtonClick:function(btnId,recId){
			if(this.getMethods('onCustomButtonClick')){
				this.executeMethod("onCustomButtonClick",btnId,recId);
			}
		},
		onWprBeforeLoadFailure:function(){
			if(this.getMethods("onBeforeLoadFailure")){
				/**
				 * This method will be triggered on failure  resp at initial load of component
				 * @method onBeforeLoadFailure
				 * @author rafik.shaik
				 */
				this.executeMethod("onBeforeLoadFailure");//No I18n
			}
		},
		onWprGetRecordData:function(cvid,resp){
			var _self=this;
			if(this.getMethods('onGetRecordData')){
				return new Promise((resolve) => {
					_self.executeMethod('onGetRecordData',cvid,resp)
					.then(resp=>resolve(resp))
					.catch(()=>resolve([]));
				});
			}
			return new Promise((resolve) => {
				resolve(resp);
			});
			
		},
		onWprBeforeLoadSuccess:function(cvid){
			if( this.getMethods("onBeforeLoadSuccess")){
				/**
				 * This method will be triggered on success resp at initial load of component
				 * @method onBeforeLoadSuccess
				 * @author rafik.shaik
				 */
				// resp = {};// temporary fix for builder issue.records are synched with iframe causing issue in builder
				this.executeMethod("onBeforeLoadSuccess", cvid);//No I18n
			}
		},
		onWprCallMenuClick:function(item,action_type,id,t_mod){
			var Lyte = window.Lyte;
			var action = item === "mass_delete" ? "delete" : item;
			if(this.getMethods("onBeforeQuickActionMenuClick")){
				/**
				* This method will be triggered on before Call menu  option click.
				* @method onBeforeQuickActionMenuClick
				* @author rafik.shaik
				*/
				this.executeMethod("onBeforeQuickActionMenuClick",action,id);
			}
			switch(item){
				case "Edit":
						var editUrl=window.location.origin + Lyte.Router.getURL({
							"route" : "crm.tab.module.entity.edit",//No I18N
							"dynamicParams" : [this.data.cxPropModule,id] //No I18N
						});
						if(this.getMethods("onEditQuickActionMenuClick")){
							/**
				 			* This method will be triggered on Call menu edit option click.
				 			* @method onEditQuickActionMenuClick
				 			* @author rafik.shaik
				 			*/
							this.LvExecuteHandler("onEditQuickActionMenuClick",{editUrl,item,action_type,id});
						}else{
							networkUtils.openUrl(editUrl, '_blank'); //No I18N
						}
					break;
				case "mass_delete":
				case "change_owner": 
						var comp=this.$node.querySelector("crux-list-view").component;
						Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-mass-action-mixin.js'], ResourceConstants.CRMClient) , networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("MassTools")],ResourceConstants.CRM)], undefined, function () {
							if(item==='mass_delete'){
								action_type=undefined;
								customViewObject.selectedIds=[id];
							}else{
								customViewObject.selectedIdForQuickAction = [id];
							}
							this.updateAction(item, action_type, id, t_mod,comp);
						}.bind(this));
					break;
				default:
					if(this.getMethods('onQuickActionMenuClick')){
						this.executeMethod('onQuickActionMenuClick',action);
					}
					break;
			}
		},
		onWprActivityBadgeClick:function(recordObj){
			if(this.getMethods("onListViewActivityBadgeClick")){
			/**
			 * This method will be executed on activityBadgeClick
			 * @method onListViewActivityBadgeClick
			 * @author rafik.shaik
			 */
			if( recordObj && recordObj.$ && recordObj.$.toJSON ){
				recordObj = recordObj.$.toJSON();
			}
			this.executeMethod("onListViewActivityBadgeClick",recordObj);
			}
		}
	},
	LvExecuteHandler:async function(methodName,callBackObj){ 
		if(methodName=="onEditQuickActionMenuClick"){
			var {editUrl,item,action_type,id}=callBackObj;
			var resp=await Promise.resolve(this.executeMethod("onEditQuickActionMenuClick",item,action_type,id));
			if(resp){
				networkUtils.openUrl(editUrl, '_blank');
			}
		}
	},
	onComplete:function(){
		this.updateLvComponent();
	},
	onFailure:function(XHR){
		var check=this.onRecordDeleteFailure(XHR);
		if(check){
			this.updateLvComponent();
		}
	},
	updateLvComponent:function(){
		var _self=this.$node.querySelector("crux-list-view").component;
		_self.setData({'selectedRecords':true,'selectViewArray':[],'showSelectedDiv':false,'selectAllEntity':false});
		_self.getCount=true;
		_self.selectAllEntity(true);
		_self.fetchRelatedRecords();
	},
	updateAction:function(name,fromPlace,entityId,toMod,_self){
		var Lyte = window.Lyte;
		var module=this.data.cxPropModule;
			customViewObject.fromQuickActionsMenu = fromPlace === "quickAction" ? true : false;
		 var obj = {'ids':customViewObject.fromQuickActionsMenu ? entityId:{}};//no i18n
		 if(customViewObject.fromQuickActionsMenu){
			obj.from = "quickAction";//no i18n
			obj.old_owner_id = _self.data.recordObjForQuickAction.Owner ? _self.data.recordObjForQuickAction.Owner.id : "";
		} 
		var mixin=Lyte.registeredMixins['crm-mass-action-mixin']
		if(mixin){
			mixin.massAction(name,module,obj,this.onComplete.bind(this),this.onFailure.bind(this),fromPlace === "quickAction" ?"change_owner" : "mass_transfer"); //no i18n
		}
		
	},
	setModuleName:function(){
		var mod_name=Object.keys(this.data.cxPropModuleApiMapping).find(key => this.data.cxPropModuleApiMapping[key] === this.data.cxPropModuleApiName);
		if(this.data.cxPropModuleRecordMapping[mod_name] !==undefined && this.data.cxPropModuleRecordMapping[mod_name].show_as_tab){
			this.setData("cxPropModule",mod_name);
			return true;
		}
		return false;
	},
	didConnect:function(){
		/**
         * This function will render the listview component with given data. All mandatory properties required for rendering should be passed.
         * @utility refresh
        */
		this.$node.refresh=( cxPropModuleApiName , cxPropCvid , cxPropPage , cxPropPerPage ) => {
			this.setData("cxPropListViewContent",[]);
			this.reRenderListview(cxPropModuleApiName,cxPropCvid,cxPropPage,cxPropPerPage);
		};
		 /**
         * This utility function can be used to get the selected ids 
         * @utility getSelectedIds
         * @author siilambarasan.rt
         * @version 1.0.0
         */
		this.$node.getSelectedIds = ()=>{
			return $L('crux-list-view ' ,this.$node)[0].getSelectedIds();//no i18n
		};
	},
	reRenderListview:function(cxPropModuleApiName,cxPropCvid,cxPropPage,cxPropPerPage,cxPropModuleData,cxPropRecordCount,cxPropCustomViewInfo){
			if(this.setModuleName()){
				var list_view=this.$node.querySelector("crux-list-view");
				if( !list_view ){ return; }
				list_view = list_view.component;
				cxPropPage    	   = 	cxPropPage 	       || this.getData("cxPropPage");
				cxPropPerPage	   = 	cxPropPerPage      || this.getData("cxPropPerPage");
				cxPropSearchLetter =     this.getData("cxPropSearchLetter");
				cxPropSearchField  =     this.getData("cxPropSearchField");
				cxPropModuleData   =    cxPropModuleData   || {};
				list_view.onDataLoad=false;
				list_view.setData({ "cxPropModuleId":"" , cxPropCvid : cxPropCvid ,cxPropRecordCount : cxPropRecordCount , ShowLvLoading : true , show_loading : true });
				this.setData({ cxPropPage:cxPropPage , cxPropPerPage:cxPropPerPage , cxPropSearchLetter:cxPropSearchLetter , cxPropSearchField:cxPropSearchField, 
					cxPropModuleData:cxPropModuleData,
					cxPropCustomViewInfo:cxPropCustomViewInfo,
					cxPropRecordCount :cxPropRecordCount
				});
				if(typeof this.data.cxPropCvid !== 'undefined'){
					this.setData("cxPropCvid",cxPropCvid);
				}
				this.setData("ErrorMsgData",{});
				if(list_view){     
					list_view.init(true);
				}
			}
	},
	ConstructNewMapping:function(){
		if( typeof moduleRecordMapping !== "undefined" ){ 
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping);
			var idModuleMap = {}, moduleApiMap={} , moduleMap = this.data.cxPropModuleRecordMapping;
			for (var key in moduleMap) {
				idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
				moduleApiMap[key]= moduleMap[key].api_name;
			}
			this.setData({"cxPropIdModuleMapping":idModuleMap,"cxPropModuleApiMapping":moduleApiMap});
		}
	},
	ErrorMsgFn:function(msg){
		var obj=this.data.ErrorMsgData;
		obj.show_error=true;
		obj.message=msg;
		this.setData("ErrorMsgData",{});
		this.setData("ErrorMsgData",obj);
	},
	triggerCallbackFn : function(callBackName="",args=""){
		if( callBackName && this.getMethods(callBackName) ){
			this.executeMethod(callBackName, args);//No I18n
		}
	},
	observeModule:function(args){
		let calledFromObs = args && args.hasOwnProperty('newValue') && args.type === 'change' ;
		if(this.data.cxPropModuleApiName){
			this.setData("isFieldChanged",true);
			if(!this.moduleRecFlag){
				this.ConstructNewMapping();
				this.moduleRecFlag=true;
			}
			if(this.setModuleName()){
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data','cx-prop-list-view-content','cx-prop-module-record-mapping','cx-prop-record-count' , 'cx-prop-selected-ids']);
				}
				this.setData("cxPropListViewContent",[]);
				var cvid=this.data.oldModule===this.data.cxPropModule ? this.data.cxPropCvid : undefined ;
				if(calledFromObs && !cvid && this.getMethods('onBuilderPropertyRemove')){
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-cvid','cx-prop-custom-view-info']);
				}
				this.setData("oldModule",this.data.cxPropModule);
				this.reRenderListview(this.data.cxPropModuleApiName,cvid);
			}else{
				this.triggerCallbackFn('onBeforeLoadFailure' );//No I18n
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data']);
				}
				var msg="Mandatory module meta data / moduleApiName   for rendering listview component is missing/incorrect";
				this.ErrorMsgFn(msg);
			}
		}else{
			this.triggerCallbackFn('onBeforeLoadFailure');//No I18n
			var msg="Mandatory module meta data / moduleApiName   for rendering listview component is missing/incorrect."
			this.ErrorMsgFn(msg);
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropModuleApiName").on('init'),
	observeCvid:function(){
		if (this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', ['cx-prop-custom-view-info','cx-prop-list-view-content','cx-prop-module-record-mapping','cx-prop-record-count','cx-prop-selected-ids']);
		}
			this.setData("isFieldChanged",true);
			if(!this.moduleRecFlag){
				this.ConstructNewMapping();
				this.moduleRecFlag=true;
			}
			if(this.setModuleName()){
				this.setData("oldModule",this.data.cxPropModule);
			}
			this.setData("cxPropListViewContent",[]);
			this.reRenderListview(this.data.cxPropModuleApiName,this.data.cxPropCvid , undefined , undefined , this.data.cxPropModuleData );
			_cruxUtils.removeCustomAlert();
	}.observes("cxPropCvid"),
	observePerPage:function(){
		if(this.data.cxPropModule){
			if(this.data.cxPropPerPage == undefined ){
				this.setData("cxPropPerPage",10);
			}
			if(typeof this.data.cxPropPerPage !== 'undefined' && [10,20,30,40,50,100,500].indexOf(this.data.cxPropPerPage)===-1){
				var msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
				this.ErrorMsgFn(msg);
				return ;
			}
			if((this.data.cxPropPerPage===100 || this.data.cxPropPerPage==500) && typeof Crm !== "undefined" && !Crm.userDetails.ISPAID_USER ){
				var msg = 'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.';
				this.ErrorMsgFn(msg);
				// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.'}})
				return ;
			}
			if(this.data.cxPropPerPage==500 && typeof Crm !== 'undefined' && Crm.userDetails.maxRange <500 ){
				var msg = 'Your maximum allowed range is less than 500. Please select a smaller per page size.';
				this.ErrorMsgFn(msg);
				// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Your maximum allowed range is less than 500. Please select a smaller per page size.'}})
				return ;
			}
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			if(Lv_comp && Lv_comp.onDataLoad){
				_cruxUtils.removeCustomAlert();
				if(!this.data.isFieldChanged){
					Lv_comp.onBeforeLoad=true;
				}
				Lv_comp.fetchRelatedRecords();
			}
		}
	}.observes("cxPropPerPage"),
	observePage:function(){
		if(this.data.cxPropModule){
			if(this.data.cxPropPage && this.data.cxPropPage>0){
				var Lv_comp=this.$node.querySelector("crux-list-view").component;
				if(Lv_comp && Lv_comp.onDataLoad){
					_cruxUtils.removeCustomAlert();
					if(!this.data.isFieldChanged){
						Lv_comp.onBeforeLoad=true;
					}
					Lv_comp.fetchRelatedRecords();
				}
			}else{
				var msg='Mandatory module meta data / page  for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
			}
		}
	}.observes("cxPropPage"),
	observeModuleData:function(){
		var {cxPropModuleData, orginalModuleData}=this.data;
		if(!$u.isEqual( cxPropModuleData , orginalModuleData ,false) && cxPropModuleData){
			this.setData("orginalModuleData",cxPropModuleData);
			this.setData("isFieldChanged",true);
			var {api_name,module_name,fields,custom_view}=cxPropModuleData;
			if(!api_name || !module_name || !Array.isArray(fields) || fields.length === 0 || typeof custom_view !== 'object' || custom_view === null || Object.keys(custom_view).length === 0 ){
				var msg= 'Mandatory module meta data (moduleData) for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
				return ;
			}
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			if(cxPropModuleData && Lv_comp.onDataLoad){
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name']);
				}
				if(Object.keys(cxPropModuleData).length>0){
					this.setData("cxPropModuleApiName",cxPropModuleData.api_name);
					Lv_comp.setData("cxPropModuleId",cxPropModuleData.id);
					var {cxPropModuleApiName , cxPropCvid , cxPropRecordCount , cxPropCustomViewInfo}=this.data;
					Lv_comp.makeApiRequests(true);
				}
			}else if(Lv_comp.onDataLoad){
				var msg='Mandatory module meta data  / ModuleData  for rendering listview component is missing/incorrect';
				this.ErrorMsgFn(msg);
			}
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropModuleData","cxPropModuleData.{}"),
	observeCustomViewInfo:function(){
		var {cxPropCustomViewInfo,orginalCustomViewInfo}=this.data;
		if(!$u.isEqual( cxPropCustomViewInfo , orginalCustomViewInfo ,false) && cxPropCustomViewInfo && Object.keys(cxPropCustomViewInfo).length !== 0){
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			this.setData("orginalCustomViewInfo",cxPropCustomViewInfo);
			this.setData("isFieldChanged",true);
			var {id,fields}=cxPropCustomViewInfo;
			if(!id || !Array.isArray(fields) || fields.length === 0 ){
				var msg= 'Mandatory module meta data (customViewInfo) for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
				return ;
			}else{
				if(this.getMethods('onBuilderPropertyRemove')){
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-cvid']);
				}
				if(Object.keys(cxPropCustomViewInfo).length>0){
					this.setData("cxPropCvid",this.data.cxPropCustomViewInfo.id);
					var {cxPropModuleApiName,cxPropCvid,cxPropModuleData,cxPropRecordCount}=this.data;
					Lv_comp.makeApiRequests(true);
				}else if(Lv_comp.onDataLoad){
					var msg= 'Mandatory module meta data  / customviewId  for rendering listview component is missing/incorrect.';
					this.ErrorMsgFn(msg);
				}
			}
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropCustomViewInfo","cxPropCustomViewInfo.{}")
},{mixins : ["crux-mass-action-mixin"]});
/**
* @syntax nonYielded
<crm-listview
cx-prop-content-overflow="true"
cx-prop-module-information-type="moduleData"
cx-prop-custom-view-information-type="customviewInfo"
cx-prop-record-count="5"
cx-prop-page="1"
cx-prop-per-page="10"
cx-prop-module-record-mapping='{"Leads":{"api_name":"Leads","module_name":"Leads","id":"1837270000000000125","singular_label":"Lead","display_field":{"api_name":"Last_Name"},"plural_label":"Naveens","generated_type":"custom","show_as_tab":true},"Contacts":{"api_name":"Contacts","singular_label":"Contact","show_as_tab":true}}'
cx-prop-custom-view-info='{"module":{"api_name":"Leads","id":"1837270000000000125"},"id":"1837270000000091501","fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner"},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company"},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862"}]}' 
cx-prop-list-view-content='[{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170150","Company":"Company_0","First_Name":"First Name_0","Last_Name":"Last Name_0","Full_Name":"Full Name_0","Email":"Email_0","Phone":"Phone_0","Mobile":"Mobile_0","Lead_Status":"Lead Status_0"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170151","Company":"Company_1","First_Name":"First Name_1","Last_Name":"Last Name_1","Full_Name":"Full Name_1","Email":"Email_1","Phone":"Phone_1","Mobile":"Mobile_1","Lead_Status":"Lead Status_1"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170152","Company":"Company_2","First_Name":"First Name_2","Last_Name":"Last Name_2","Full_Name":"Full Name_2","Email":"Email_2","Phone":"Phone_2","Mobile":"Mobile_2","Lead_Status":"Lead Status_2"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170153","Company":"Company_3","First_Name":"First Name_3","Last_Name":"Last Name_3","Full_Name":"Full Name_3","Email":"Email_3","Phone":"Phone_3","Mobile":"Mobile_3","Lead_Status":"Lead Status_3"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170154","Company":"Company_4","First_Name":"First Name_4","Last_Name":"Last Name_4","Full_Name":"Full Name_4","Email":"Email_4","Phone":"Phone_4","Mobile":"Mobile_4","Lead_Status":"Lead Status_4"}]'
cx-prop-module-data='{"custom_view":{"display_value":"All Leads","created_time":null,"access_type":"public","wrap_text":true,"criteria":{"comparator":"equal","field":{"api_name":"$converted"},"value":false},"system_name":"ALLVIEWS","module":{"api_name":"Leads","id":"1837270000000000125"},"sort_by":null,"created_by":null,"shared_to":null,"default":true,"modified_time":"2024-03-11T15:35:32+05:30","name":"All Open Leads","system_defined":true,"modified_by":{"name":"Shaik Rafik","id":"1837270000000438001"},"id":"1837270000000091501","fields":[{"webhook":true,"field_label":"Company","tooltip":null,"type":"used","field_read_only":false,"display_label":"Company","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002860","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Company","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":1,"quick_sequence_number":"1","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":null,"Deals":null,"Accounts":"Account_Name"},"length":100,"column_name":"COMPANY","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":true,"multiselectlookup":{},"auto_number":{},"list_display_label":"Company","cxPropResize":"enable","style":"","cxPropPinned":false,"cxTypeMapping":"text"},
{"webhook":true,"field_label":"First Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"First Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002862","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"First_Name","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":27,"quick_sequence_number":"2","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"First_Name","Deals":null,"Accounts":null},"length":40,"column_name":"FIRSTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{}},{"webhook":true,"field_label":"Last Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"Last Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002864","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Last_Name","unique":{},"pick_list_values":[],"system_mandatory":true,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":127,"quick_sequence_number":"3","currency":{},"custom_field":false,"lookup":{},"convert_mapping":
{"Contacts":"Last_Name","Deals":null,"Accounts":null},"length":80,"column_name":"LASTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":1,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{},"mandatory":true,"cxTypeMapping":"text","list_display_label":"Last Name","cxPropClass":"undefined cxLvAlphaSearchIncl","cxPropResize":"enable","style":"","cxPropPinned":false}],"category":"public_views","last_accessed_time":"2024-03-20T18:42:55+05:30","locked":false,"sort_order":null,"favorite":null,"module_default":{"api_name":"Leads","id":"1837270000000000125"}},"fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner","lookup":{}},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company","lookup":{}},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862","lookup":{}}],"display_field":{"id":"","api_name":"Owner"},"module_name":"Leads","api_name":"Leads","lookup_field_properties":{"fields":[{"api_name":"Owner","id":"111111000000002858"},{"api_name":"Mobile","id":"111111000000002876"}]}}'>
</crm-listview>
*/