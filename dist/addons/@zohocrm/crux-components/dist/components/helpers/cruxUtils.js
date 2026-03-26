var CRUX_COMP_VERSION = "3.229.13"; //eslint-disable-line @zoho/webperf/no-global-variables

if (document !== window.document) {
	var _cruxUtils = _cruxUtils || { isLyteWidgetBuild: Lyte && Lyte.isWidgetBuild };//eslint-disable-line no-use-before-define
} else {
	var _cruxUtils = window._cruxUtils = window._cruxUtils || {};//eslint-disable-line no-redeclare
}

_cruxUtils.version = CRUX_COMP_VERSION;

if (_cruxUtils.isLyteWidgetBuild && Lyte && Lyte.Security) {
	Lyte.Security.ignoreSanitizer = true; // added this for component not rendered from unescape helper in crux table component in SlyteUI
}
_cruxUtils.showCustomAlert = function(opt){

	if(opt.params && opt.params.ltPropWrapperClass){
		opt.params.ltPropWrapperClass = opt.params.ltPropWrapperClass+" "+'cxAlertWrapper';
	}else{
		opt.params.ltPropWrapperClass = 'cxAlertWrapper' //no i18n
	}
	if(!opt.params.ltPropSecondaryMessage) {
        opt.params.ltPropWrapperClass = `${opt.params.ltPropWrapperClass} cxAlertOnlyHeading` //no i18n
    }
	var alert=$L('#cruxUtilAlert');
	_cruxUtils.addMurhyInfo("cruxUtils.js", "Feb Default Changes");
	var data={cxPropShow: true};
    for (key in opt.params)
    {
        if(opt.params.hasOwnProperty(key)){
        _key="cx"+key.substring(2);
        data[_key]=opt.params[key];
    }}
	data.cxPropUtilAlert=true;
	if(alert.length>0)
	{
		data = Object.assign({cxPropCloseOnEscape : true,cxPropSlideDown : "slideDown",cxPropContentAlign : "left",cxPropType : "", cxPropPrimaryMessage : "", cxPropSecondaryMessage : "",cxPropAllowMultiple : false,cxPropHeading : "",cxPropButtonPosition : 'center',cxPropTop : '0',cxPropShowCloseButton : false, cxPropYield: false,cxPropFooterYield: false, cxPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}] },data);//no i18n
		alert[0].setData(data);
	}
	else
	{
		alert.push(Lyte.Component.render("crux-alert",data,opt.params.ltPropOutputNode ? opt.params.ltPropOutputNode : 'body'));
		alert[0].id="cruxUtilAlert";
	}
    alert[0].setMethods({
        onShow : function(node){
            if(opt.show){
                return opt.show(node);
            }
        }, 
        onAccept  : function (node,buttonText){ 
            if(opt.accept){
                return opt.accept(node,buttonText); 
            }
        },
        onReject  : function (node,buttonText){ 
            if(opt.reject){
                return opt.reject(node,buttonText)
            }
        },
		onClose  : function (node){ 
            if(opt.close){
                return opt.close(node)
            }
        }
	});
}
_cruxUtils.removeCustomAlert = function(){
	if($L('crux-alert').length > 0){
		$L('crux-alert')[0].remove(); //no i18n
	}
}

_cruxUtils.showCustomMessage = function(opt){
	var data={cxPropShow: true};
	for (key in opt.params)
    {
        if(opt.params.hasOwnProperty(key)){
         _key="cx"+key.substring(2);
        data[_key]=opt.params[key];
    }}
	var checkMessageBox= document.getElementById("cruxCustomMessage");   //check for existing messagebox
	checkMessageBox && checkMessageBox.remove()
    var messageBox=Lyte.Component.render("crux-messagebox",data,'body');
	messageBox.id='cruxCustomMessage';
	messageBox.setMethods({ 
		onShow : function(node){
			if(opt.show){
				opt.show(node);
			}
		},
		onClose  : function (){ 
			if(opt.close){
				opt.close()
			}
			this.$node && this.$node.remove();
		} 
	
	});
}
_cruxUtils.removeCustomMessage = function(){
	if($L('crux-messagebox').length > 0){
		$L('crux-messagebox')[0].remove(); //no i18n
	}
}
_cruxUtils.showProfilePermissionModal =  function(opt){
	if(!opt){
		return
	}
	opt.params = opt.params ? opt.params :{} 
	var modalNode = $L('#cruxPermissionPopup')[0]; //no i18n
	if(modalNode){
		opt.params.cxPropSelectedIds = opt.params.cxPropSelectedIds ? opt.params.cxPropSelectedIds :[];
		modalNode.setData(opt.params);
	}else{
		opt.params.id = 'cruxPermissionPopup';
		modalNode=Lyte.Component.render('crux-profile-permission-modal',opt.params,"body");
	}
	modalNode.setMethods({
		onShow : function(){
			if(opt.onShow){
				opt.onShow(arguments[0]);
			}
		},onAddProfile : function (){ 
			if(opt.onAddProfile){
				opt.onAddProfile(arguments[0]); 
			}
		},onBeforeRemoveProfile : function (){ 
			if(opt.onBeforeRemoveProfile){
				opt.onBeforeRemoveProfile(arguments[0]); 
			}
		},onRemoveProfile :  function (){ 
			if(opt.onRemoveProfile){
				return opt.onRemoveProfile(arguments[0]); 
			}
		},onClose  : function (){ 
			if(opt.onClose){
				opt.onClose(arguments[0]);
			}
	 	},onBeforeSave  : function (){ 
			if(opt.onBeforeSave){
				return opt.onBeforeSave(arguments[0]);
			}
	 	}
	})
	modalNode.setData("cxPropShow",true)//no i18n
	
}

_cruxUtils.showSchedularNotification = function( opt ){
	// opt = {params : { cxPropHeader : "lead status" , cxPropMessage : "Lead conversion is progress ...." , cxPropStatus : "progress" } }
	// opt.params.cxPropLink = [{route : "crm.settings.index" , message : "settings" , class : "testClass"}]
	if(!opt){
		return
	}
	opt.params = opt.params ? opt.params :{} 
	opt.params.cxPropShow = opt.params.cxPropShow == undefined ? true : opt.params.cxPropShow;
	let cls = opt.params.cxPropClass ?  "_"+opt.params.cxPropClass : "_";
	var schedularNode = $L('.cruxSchedularPopup'+cls)[0]; //no i18n
	if(schedularNode){
		if(opt.cxAddMessage && opt.params.cxPropMessage){
			Lyte.arrayUtils(schedularNode.getData('cxPropMessage'), 'insertAt', 0 ,opt.params.cxPropMessage ); //no i18n
			delete opt.params.cxPropMessage;
		}
		schedularNode.setData(opt.params);
	}else{
		// opt.params.id = 'cruxSchedularPopup';
		// opt.params.class = 'cruxSchedularPopup'+cls;
		schedularNode=Lyte.Component.render('crux-schedular-notification-popup',opt.params,"body");
	}
	schedularNode.setMethods({
		onShow : function(){
			
			if(opt.onShow){
				opt.onShow(arguments[0]);
			}
		},onClose  : function (comp , calledFrom){ 
			if(opt.onClose){
				opt.onClose(comp,calledFrom);
			}
			if( calledFrom == 'close'){
				this.$node && this.$node.remove();
			}
	 	}
	})
	return schedularNode;
	// schedularNode.setData("cxPropShow",true)//no i18n
}
_cruxUtils.getSchedularNotificationData = function(){
	var schedularNodes = $L('crux-schedular-notification-popup');
	var ind = 0 , len = schedularNodes.length , res = [] , item;
	for(ind = 0 ; ind < len ; ind++){
		item = schedularNodes[ ind ];
		var data = item.getData();
		res.push( { class : data.cxPropClass,header : data.cxPropHeader , messages : data.cxPropMessage , link : data.cxPropLink ,status :data.cxPropStatus } )
	}
	return res;
}
_cruxUtils.removeSchedularNotification = function(){
	var node = $L('crux-schedular-notification-popup')[0]
	if(node){
		node.remove();
	}
}
/**
 * Use this util to render lookup modal directly instead of using the crux lookup component.
 */
_cruxUtils.showLookupModal = function(op){
	// var ele = document.querySelector("crux-lookup-modal");
	// if(!ele){
	// 	ele = Lyte.Component.render("crux-lookup-modal", {}, op.body ? op.body : "body");		
	// }
	if(!op.data){
		op.data = {};
	}
	/**
	 * properties to set to the modal
	 */
	var toSet = ["cxPropFields", "cxPropMetaMoreRecords", "fieldMapping", "cxPropValue", "cxPropShowNavigator", "cxPropReturnFullObjectOnGet", "cxPropShowOnlyIcon", "cxPropDisableSearch", "cxPropField",
				"cxPropHideHeaderOnNoContent", "cxPropModalMiddleText" , "cxPropPerPage" , "cxPropHeader" , "cxPropFieldTypeMapping" , "cxPropQueryParam" , "cxPropType" , "cxPropTotalCount" , "cxPropCvid" ,
		 		"cxPropEnableManageColumn" , "cxPropEnableFilter" , "cxPropModId" , "cxPropModalProperty" , "cxPropFilterFieldSelectLimit" , "cxPropPerPageOptions" , "cxPropDefaultFilterCriteria" , "cxPropDefaultCriteria",
			    "cxPropHeaderProperties" , "cxPropShowSortIcon" , "cxPropSortColumns" , "cxPropEnableFieldSort", "cxPropDateProperties","cxPropDatetimeProperties","cxPropNumberProperties" , 'cxPropProfileId' ,  'cxPropOldFlow' ];
	var data = {};
	toSet.forEach(function(key){
		if(typeof op.data[key] !== "undefined"){
			data[key] = op.data[key];
		}
	})
	var ele = document.querySelector("crux-lookup-modal");
	if(!ele){
		ele = Lyte.Component.render("crux-lookup-modal", data, op.body ? op.body : "body");
	}else{
		ele.setData(data);
	}
	if(!op.methods){
		op.methods = {};
	}
	ele.setMethods({
		fetchModuleData : op.methods.fetchModuleData,
		fetchRecords : op.methods.fetchRecords,
		onValueChange : op.methods.onValueChange,
		beforeRequestChangeData : op.methods.beforeRequestChangeData,
		onSaveColumns : op.methods.onSaveColumns,
		onApplyFilter : op.methods.onApplyFilter,
		onClearFilter : op.methods.onClearFilter,
		onRemoveSelected : op.methods.onRemoveSelected,
		onUnassignAll : op.methods.onUnassignAll,
		fetchTotalCount : op.methods.fetchTotalCount,
		onAssign : op.methods.onAssign,
		onBeforeClose : op.methods.onBeforeClose,
		onShow : op.methods.onShow,
		onClose : op.methods.onClose,
		onFetchRecordsFailure : op.methods.onFetchRecordsFailure
	});
	ele.component.setData('cxPropShow' , true);
	// ele.component.lookupInit(ele.component,op.data.cxPropField.lookup.module.id,true);
	/*
	isSingle : true, renderLookup : true, dispInit : true
	if(this.getMethods("onBeforeShowLookup")){
			var res = this.executeMethod("onBeforeShowLookup");
			if(res == false){
				return false;
			}
		}
	    if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(true);
		}
		*/
}
_cruxUtils.showPermissionDeniedModal = function(opt){
	var comp = $L("crux-permission-denied-alert")[0];
	if(comp){
		comp.remove();
	}
	var component = Lyte.Component.render("crux-permission-denied-alert",opt?opt.params:opt,"body");
	if(component){
		component.cxProp('show',true);
		if(opt){
			component.setMethods({
				onShow : function(){
					if(opt.show){
						opt.show();
					}
				}, 
				onAccept  : function (){ 
					if(opt.accept){
						opt.accept(); 
					}
				},
				onReject  : function (){ 
					if(opt.reject){
						opt.reject()
					}
				},
				onClose  : function (){ 
					if(opt.close){
						opt.close()
					}
				}
			});
		}
	}
}
//internal util
_cruxUtils._showDisabledTooltip = function(show,originElem,reason,option){
	let tootlipNode = $L('#cxDisabledTooltip');
	if(tootlipNode.length){
		tootlipNode[0].setData({cxPropOriginElem:originElem,cxPropDisabledReason:reason,cxPropOption:option,cxPropShow:show});
	}else if(show){
		tootlipNode = Lyte.Component.render('crux-disabled-tooltip',{cxPropShow:show,cxPropOriginElem:originElem,cxPropDisabledReason:reason,cxPropOption:option},'body');
		tootlipNode.id = 'cxDisabledTooltip';
	}
}

// Utility function to get or create the crux-notification-center component
_cruxUtils._getCruxNotificationCenter = function () {
	var cruxNotificationCenter = $L('crux-notification-center')[0];

	if (!cruxNotificationCenter) {
		cruxNotificationCenter = Lyte.Component.render('crux-notification-center', {}, 'body');
		cruxNotificationCenter.id = "cxNotifyCenter";
	}
	return cruxNotificationCenter;
};

// Add Notification - crux-notification-center
_cruxUtils.addNotification = function (newNotifications) {
	var cruxNotificationCenter = _cruxUtils._getCruxNotificationCenter();
	if (!Array.isArray(newNotifications)) {
		newNotifications = [newNotifications];
	}
	cruxNotificationCenter.addNotification(newNotifications);
};

// Remove Notification - crux-notification-center
_cruxUtils.removeNotification = function (notificationId) {
	if (Array.isArray(notificationId)) {
		notificationId = notificationId[0] || {};
	}
	var cruxNotificationCenter = _cruxUtils._getCruxNotificationCenter();
	cruxNotificationCenter.removeNotification(notificationId);
};

// Modify Notification - crux-notification-center
_cruxUtils.modifyNotification = function (updatedNotification) {
	if (Array.isArray(updatedNotification)) {
		updatedNotification = updatedNotification[0] || {};
	}
	var cruxNotificationCenter = _cruxUtils._getCruxNotificationCenter();
	cruxNotificationCenter.modifyNotification(updatedNotification);
};

// Show Notification - crux-notification-center
_cruxUtils.showNotification = function () {
	var cruxNotificationCenter = _cruxUtils._getCruxNotificationCenter();
	cruxNotificationCenter.setData({ cxPropShow: true });
};

_cruxUtils.addLogs = true;
_cruxUtils.addMurhyInfo = function(componentName , useCase){
	_cruxUtils.routeLogs = _cruxUtils.routeLogs || [];
	_cruxUtils.routeLogs.push(useCase);
	if(_cruxUtils.addLogs && ((_cruxUtils.isAutomationRun) || (typeof cookieUtils !== "undefined" && cookieUtils.getCookie('CaseInfo') && 
	cookieUtils.getCookie('CaseInfo').includes('_Latest_Default_') &&  cookieUtils.getCookie('CaseInfo').includes('RERUN_NEW_FLOW_AUTORESTART') && typeof murphy !== 'undefined'))){
		_cruxUtils.isAutomationRun = true;
		murphy.appLog("info","Crux Component Case Detected", {_c_component_name : componentName , _c_useCase : useCase, _c_case_info : cookieUtils.getCookie('CaseInfo'), _c_automation_caseid : cookieUtils.getCookie("ZCRM_QA_AUTOMATION_CASE_ID")} );
	}
};

_cruxUtils.setLyteWidgetMethodHandler = function () {
	if (Lyte.Widget && Lyte.Widget.setMethodHandler) {
		Lyte.Widget.setMethodHandler({
			"crm-create-form": [
				"onFormSaveClick",
				"onFormCancel",
				"onFormBeforeRender",
				"onFormAfterRender",
				"onFormBeforeSave",
				"onFormSave",
				"onFormAfterSave",
				"onFormValueChange",
				"onSubformValueChange",
				"onQuickCreateClick",
				"onFormLayoutSwitch",
				"onFormBeforeDestroy"
			],
			"crm-detailview" : [
				"onEditButtonClick","onMenuActionClick","onRelatedListActionClick"
			],
			"crm-relatedlist" : [
				"onRelatedListActionClick"
			],
			"crm-criteria-editor" : [
				"onBeforeAddCriteria","onBeforeDeleteCriteria","onBeforeEditPattern","onBeforeSavePattern","onBeforeConditionChange","onBeforeFieldDropdown","onBeforeErrorAlert"
			]
		});
	}
};
_cruxUtils._getProperty = function(key,defaultValue){
	if(!_cruxUtils._cxGlobalProperties){
		let cruxAssetService = Lyte.Service.getInjected('cruxAssests');
		if(!cruxAssetService || !cruxAssetService.cxGlobalProperties && typeof Crm !== 'undefined'){
			_cruxUtils._cxGlobalProperties = {
				get baseCurrency() {
					return Crm.userDetails.BASE_CURRENCY;
				},
				get currencyDetails() {
					return Crm.userDetails.CURRENCY_DETAILS;
				},
				get defaultOrgCurrency() {
					return Crm.userDetails.defaultOrgCurrency;
				},
				get defaultOrgCurrencyDetails() {
					return Crm.userDetails.DEFAULT_ORG_CURRENCY;
				},
				get isMultiCurrencyEnabled() {
					return Crm.userDetails.IS_MULTI_CURRENCY_ENABLED;
				},
				get defaultCurrencyISOCode() {
					return Crm.userDetails.defaultCurrencyISOCode;
				},
				get decimalSeparator() {
					return Crm.userDetails.DECIMAL_SEPARATOR;
				},
				get defaultRoundOff() {
					return Crm.userDetails.defaultRoundOff;
				},
				get preferredCurrency(){
					return Crm.userDetails.PREFERRED_CURRENCY;
				}
			};
		}
		else if(cruxAssetService.cxGlobalProperties){
			_cruxUtils._cxGlobalProperties = cruxAssetService.cxGlobalProperties;
		}
	}
	let props = _cruxUtils._cxGlobalProperties ? _cruxUtils._cxGlobalProperties : {};
	return key ? props.hasOwnProperty(key) ? props[key] : defaultValue : props;
};


Lyte.addEventListener("beforeRouteTransition", function(){
	_cruxUtils.routeLogs = [];
});
_cruxUtils.version = "3.229.13";
