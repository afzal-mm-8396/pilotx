Lyte.Component.register("crux-create-custom-buttons", {
_template:"<template tag-name=\"crux-create-custom-buttons\"> <template is=\"if\" value=\"{{cxPropCustomButtons.length}}\"><template case=\"true\"> <div class=\"pxClubbedButton\"> <lyte-button id=\"{{cbCommonData.selectedCBId}}\" onclick=\"{{action('executeCustomButton',cxPropCustomButtons[0].id)}}\" onmouseover=\"{{action('mouseOverCustomButton',cxPropCustomButtons[0].id,cxPropCustomButtons[0].name,cxPropCustomButtons[0].description,this)}}\" onmouseout=\"{{action('mouseOutCustomButton',this)}}\" data-zcqa=\"{{cxPropCustomButtons[0].name}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cxPropCustomButtons[0].name}}</template> </lyte-button> <lyte-button id=\"{{cbCommonData.CBDropDownArrowId}}\" class=\"cxcreateCBDropDownIcon\" data-zcqa=\"downArrow\"> <template is=\"registerYield\" yield-name=\"text\">...</template> </lyte-button> </div> <lyte-menu on-before-open=\"{{method('onCustomButtonBeforeShow')}}\" on-close=\"{{method('onCustombuttonHide')}}\" lt-prop-yield=\"true\" lt-prop-query=\"#{{cbCommonData.CBDropDownArrowId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"if\" value=\"{{expHandlers(cxPropCustomButtons.length,'>',1)}}\"><template case=\"true\"> <lyte-search lt-prop-placeholder=\"Search Button\" on-search=\"{{method('searchCustomButtons')}}\" id=\"{{cbCommonData.cbSearchID}}\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;#{{cbCommonData.cbSortableID}}&quot;, &quot;search&quot; : &quot;lyte-menu-item&quot;}\" data-zcqa=\"LCCustmBtnSearchBox\"> </lyte-search> </template></template> <div id=\"{{cbCommonData.cbSortableID}}\"> <template is=\"for\" items=\"{{cxPropCustomButtons}}\" item=\"currentCB\" index=\"index\"> <lyte-menu-item data-value=\"{{currentCB.id}}\" class=\"customButtonQuery{{currentCB.id}}\" data-zcqa=\"{{currentCB.name}}\" onclick=\"{{action('executeCustomButton',currentCB.id)}}\" onmouseover=\"{{action('mouseOverCustomButton',currentCB.id,currentCB.name,currentCB.description,this)}}\" onmouseout=\"{{action('mouseOutCustomButton',this)}}\"> <lyte-menu-label>{{currentCB.name}}</lyte-menu-label> </lyte-menu-item> </template> </div> <template is=\"if\" value=\"{{cbCommonData.showNoResultsMessage}}\"><template case=\"true\"> <span>{{cruxGetI18n('crm.custombutton.nobuttons.found')}}</span> </template></template> <div class=\"footerCBMenus\"> <template is=\"if\" value=\"{{isPremiumUser()}}\"><template case=\"true\"> <lyte-menu-item id=\"createCustomButtons\" onclick=\"{{action('cbFooterMenuAction','createCustomBtn',module,buttonPosition)}}\" data-zcqa=\"create_buttons\">{{cruxGetI18n('crm.custombutton.create.newbutton')}} </lyte-menu-item> </template></template> <lyte-menu-item id=\"manageCustomButtons\" onclick=\"{{action('cbFooterMenuAction','manageCustomBtn',module,buttonPosition)}}\" data-zcqa=\"manage_buttons\">{{cruxGetI18n('crm.custombutton.manage.button')}} </lyte-menu-item> </div> </lyte-menu-body> </template> </lyte-menu> </template></template> <lyte-popover lt-prop-content-padding=\"15px\" id=\"{{cbtooltipPopoverId}}\" lt-prop-width=\"250px\" lt-prop-wrapper-class=\"cxcreateCBpopoverWrapper\" lt-prop-show-close-button=\"false\" lt-prop-allow-multiple=\"false\" lt-prop-type=\"callout\" lt-prop-freeze=\"false\" lt-prop-origin-elem=\".{{cbtooltipPopoverOriginClass}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <div class=\"cxcreateCBpopoverBtnLabel\">{{cruxGetI18n(\"crm.custombutton.name\")}}:</div> <div class=\"cbTooltipNameLC\">{{custombuttonTooltip.name}}</div> <template is=\"if\" value=\"{{custombuttonTooltip.description}}\"><template case=\"true\"> <div class=\"cxcreateCBpopoverBtnLabel cxcreateCBpopoverBtnDesc\">{{cruxGetI18n(\"crm.customize.custombutton.function.desc\")}}:</div> <div class=\"cbTooltipDescLC\">{{custombuttonTooltip.description}}</div> </template></template> </lyte-popover-content> </template> </lyte-popover> <lyte-modal id=\"cbEmptyfieldsmodal\" class=\"crmBoxModal\" lt-prop-wrapper-class=\"modalCoverCB crmBoxModal\"> <template is=\"registerYield\" yield-name=\"modal\"> <div class=\"w550\"> <div class=\"formBldPopHd\">{{cruxGetI18n('crm.custombutton.action')}}</div> <div class=\"p30\"> <div class=\"crm-font-regular f13 \">{{cruxGetI18n('crm.custombutton.empty.field.values')}}</div> <div class=\"pT10 pB10 pL15 pR15 mT10 bg_fdfddc\"> <template is=\"for\" items=\"{{custombuttonEmptymodal.modulesArr}}\" item=\"mod\" index=\"index\"> <div class=\"crm-font-bold f12 mT10\">{{mod.module}}:</div> <ul class=\"bullet oA mT10 mB10 mH100\"> <template is=\"for\" items=\"{{mod.fields}}\" item=\"field\" index=\"index\"> <li style=\"margin-bottom:5px\">{{field}}</li> </template> </ul> </template> </div> <div class=\"mT10 f13\">{{cruxGetI18n('crm.custombutton.proceed.action')}}</div> </div> <div class=\"popup-model-footer pTop0\"> <lyte-button onclick=\"{{action('closeEmptyfieldsModal')}}\" data-zcqa=\"cancel_custom_buttons_action\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('zb.common.Cancel')}}</template> </lyte-button> <lyte-button lt-prop-type=\"default\" lt-prop-class=\"redbtn\" onclick=\"{{action('invokeEmptyfieldsurl',currntButtonid)}}\" data-zcqa=\"proceed_custom_buttons_action\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.yes.proceed')}}</template> </lyte-button> </div> </div> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7,1]},{"type":"if","position":[1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7,3]},{"type":"text","position":[1,7,3,0]},{"type":"componentDynamic","position":[1,7,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3,1]},{"type":"for","position":[1,3,3,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]},{"type":"text","position":[1,3,5,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,5,1]},{"type":"attr","position":[1,5,3]},{"type":"registerYield","position":[1,5,3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,5,3]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropLayoutComponentData","cxPropModuleData","instanceObjKey","cxPropFormData","cbCommonData","currentInstObjKey","cbtooltipPopoverId","cbtooltipPopoverOriginClass","cbinFocus","isPremiumUser","cbinFocusName","custombuttonTooltip","cxPropCustomButtons","cxPropCompleteCBData"],
_observedAttributesType :["object","object","string","object","object","string","string","string","boolean","boolean","string","object","array","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cbCommonData: Lyte.attr('object', { 'default': {} }),//no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbtooltipPopoverId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbtooltipPopoverOriginClass: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbinFocus: Lyte.attr('boolean', { default: false }),//no i18n
			isPremiumUser: Lyte.attr('boolean', { default: false }),//no i18n
			cbinFocusName: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			custombuttonTooltip: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropCustomButtons: Lyte.attr('array', { 'default': [] }),//no i18n
			cxPropCompleteCBData: Lyte.attr('object', { 'default': {} })//no i18n
		}
	},
	init: function () {
		var cxPropCustomButtons = this.data.cxPropLayoutComponentData.cxPropCustomButtons || [], currentInstObjKey = this.data.cxPropLayoutComponentData.currentInstObjKey;
		this.setData('cxPropCustomButtons', cxPropCustomButtons);
		var cbtooltipPopoverId = 'cxCBTooltipPopover' + currentInstObjKey;
		this.setData('cbtooltipPopoverId', cbtooltipPopoverId);
		var cbtooltipPopoverOriginClass = 'cxCBTooltipPopoverOriginSel' + currentInstObjKey;
		this.setData('cbtooltipPopoverOriginClass', cbtooltipPopoverOriginClass);
		var cbCommonDataObj = this.data.cbCommonData || {};
		cbCommonDataObj.selectedCBId = 'CBSelectedButnID' + currentInstObjKey; cbCommonDataObj.cbSortableID = 'CBSortableID' + currentInstObjKey;
		cbCommonDataObj.CBDropDownArrowId = 'CBDropDownArrowId' + currentInstObjKey; cbCommonDataObj.cbSearchID = 'cbSearchID' + currentInstObjKey;
		this.setData('cbCommonData', cbCommonDataObj);
	},
	actions: {
		// Functions for event handling
		mouseOverCustomButton: function (id, name, description, sourceElem) {
			var custombuttonTooltip = {};
			custombuttonTooltip.name = name; custombuttonTooltip.description = description;
			var cbtooltipPopoverId = this.data.cbtooltipPopoverId, cbtooltipPopoverOriginClass = this.data.cbtooltipPopoverOriginClass;
			if (sourceElem) {
				sourceElem.classList.add(cbtooltipPopoverOriginClass);
			}
			this.setData({ 'cbinFocus': true, 'cbinFocusName': name });//no i18n
			setTimeout(function () {
				var _popNode = document.querySelector('#' + cbtooltipPopoverId);// no i18n
				if (_popNode) {
					_popNode.ltProp('placement', 'left'); //no i18n
					if (this.data.cbinFocus && this.data.cbinFocusName === name) {
						this.setData('custombuttonTooltip', custombuttonTooltip);//no i18n
						_popNode.ltProp('show', true); //no i18n
					}
				}
			}.bind(this), 2000);
		},
		mouseOutCustomButton: function (sourceElem) {
			var cbtooltipPopoverId = this.data.cbtooltipPopoverId, cbtooltipPopoverOriginClass = this.data.cbtooltipPopoverOriginClass;
			var _popNode = document.querySelector('#' + cbtooltipPopoverId);// no i18n
			if (sourceElem) {
				sourceElem.classList.remove(cbtooltipPopoverOriginClass);
			}
			if (_popNode) {
				this.setData('cbinFocus', false);//no i18n
				_popNode.ltProp('show', false); //no i18n
			}
		},
		executeCustomButton: function (buttonID) {
			var cbClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonClick', onCustomButtonClick: { buttonID } });//no i18n
			cbClickCBResponse.then(function (promiseResponse) {
				// var obj = {};
				// obj['111111000000069585'] = '{"sequence_number":2,"name":"David","profiles":[{"name":"Administrator","id":"111111000000000403"}],"description":"Ornstien","id":"111111000000069585","position":"create_clone","widget":null,"display":"new_tab","device_permissions":{"location":false},"url_encoding":"UTF-8","url":"http://www.google.com/search?q=Ornstien${Leads.Aggregate_Field_4}${users.fax}${users.zip}&&r=${Leads.Zip_Code}","custom_function":null,"modified_time":"2023-08-10T15:52:15+05:30","modified_by":{"name":"Kural S","id":"111111000000050755"},"action":"url","web_tab":null,"arguments":["Leads.Aggregate_Field_4","users.fax","users.zip","Leads.Zip_Code"]}';//no i18n
				// obj['111111000000069597'] = '{"sequence_number":2,"name":"TestFunction","profiles":[{"name":"Administrator","id":"111111000000000403"}],"description":null,"id":"111111000000069597","position":"create_clone","widget":null,"display":"new_tab","device_permissions":{"location":false},"url_encoding":null,"url":null,"custom_function":{"name":"F1 Name","description":null,"arguments":[],"id":"41430000000004019"},"modified_time":"2023-08-09T11:17:19+05:30","modified_by":{"name":"Kural S","id":"111111000000050755"},"action":"custom_function","web_tab":null}';//no i18n
				// promiseResponse = {}; promiseResponse.customButtonSuccessDetails = JSON.parse(obj[buttonID]);
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('customButtonSuccessDetails')) {
					this.executeCustomButtonflow(promiseResponse);
				}// else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('customButtonFailureDetails')) {}
			}.bind(this));
		},
		cbFooterMenuAction: function (butnType, module, buttonPosition) {
			return { butnType, module, buttonPosition, isAction: true };
		}
	},
	executeCBFunctionAction: function () {
		if (wizButtonId) {
			custombuttonEmptymodal.skip = false;
		}
		var _arg = res.custom_function.arguments;
		var cxFormData = this.data.cxPropFormData;
		var info = {}, layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
		var lookup_values = {};
		if (!wizButtonId) {
			if (_arg && _arg.length) {
				_arg.forEach(function (arg) {
					if (!["variables"].includes(arg.type)) {
						var mergeFields = this.getAPINameFromMergeField(arg.api_name);
						var apiN = mergeFields[0].module_field, paramModule = mergeFields[0].module;
						var data, formFieldList = cxUtilityObj.formFieldList, errObject = cxFormData.$RECORD__Error__Object || {};;
						if (formFieldList[apiN] || apiN === "id" || apiN === "ownerId") {
							var fldValue, isLookupField = false;
							if (formFieldList[apiN].fieldUiType && formFieldList[apiN].fieldUiType === 133) {
								isLookupField = true;
							}
							if (!(apiN === "id" || apiN === "ownerId") && paramModule === self.data.module) {
								fldValue = cxFormData[apiN];
								if (errObject[apiN]) {
									fldValue = errObject[apiN].value;
								}
							}
							if (paramModule === self.data.module && !mergeFields[0].hasOwnProperty("lookup_field")) {
								if (apiN === "id") {
									fldValue = entityId;
								} else if (apiN === "ownerId") { //no i18n
									fldValue = ownerID;
								}
							}
							if (fldValue) {
								if (mergeFields[0].hasOwnProperty("lookup_field") && typeof fldValue === "object" && fldValue.hasOwnProperty('id')) { //no i18n
									lookup_values[apiN] = fldValue.id;
								} else if (isLookupField && fldValue.id && Crm.userDetails.CUSTOM_BUTTON_CUSTOM_FUNCTION_LOOKUP_ID_SUPPORT) {
									data = fldValue.id;
								} else if (typeof fldValue === "object") { //no i18n
									data = fldValue.full_name ? fldValue.full_name : (fldValue.name ? fldValue.name : "");//no i18n
								} else {
									if (fldValue && typeof fldValue === "string" && fldValue.indexOf('TV') !== -1) {
										var curntFld = self.data.moduleData.fields.filter(function (f) { return f.api_name === apiN })[0];
										if (curntFld && curntFld.data_type === "datetime") {
											fldValue = fldValue.split('TV')[0];
										}
									}
									data = fldValue;
								}
							}
							if (data) {
								info[arg.name] = data;
							}
						}
						if ((apiN === "parameters" || apiN === "all_fields") && paramModule === "request") {
							var argRecords = self.filterValidUITypes(cxFormData, self.getData('initRoute'), self.getData('moduleData.fields'), "customButtons");//no i18n
							argRecords = argRecords || {};
							for (var keys in argRecords) {
								if (argRecords[keys] === undefined || (argRecords[keys] === "" || (typeof argRecords[keys] === "string" && argRecords[keys].trim() === ""))) {
									delete argRecords[keys];
								}
							}
							info[arg.name] = argRecords;
						}
					}

				});
			}
			else {
				var argRecords = self.filterValidUITypes(cxFormData, self.getData('initRoute'), self.getData('moduleData.fields'), "customButtons");//no i18n
				argRecords = argRecords || {};
				for (var keys in argRecords) {
					if (argRecords[keys] === undefined || (argRecords[keys] === "" || (typeof argRecords[keys] === "string" && argRecords[keys].trim() === ""))) {
						delete argRecords[keys];
					}
				}
				Object.assign(info, argRecords);
			}
		}
		custombuttonEmptymodal.arginfo = info;
		custombuttonEmptymodal.lookup_values = lookup_values;
		this.callCustomFunctionAction(buttonId, info, custombuttonEmptymodal);
	},
	executeCBWidgetsAction: function () {
		var position = "createclone";//No I18n
		var widgetData = {
			Entity: self.getData("module")//No I18n
		}
		if (entityId && entityId !== 1) {
			widgetData.EntityId = entityId;
			position = "cbedit";//No I18n
		}
		var widget = typeof WidgetHandler != "undefined" ? WidgetHandler.getWidget("CustomButtons", buttonId) : undefined; //no i18n
		if (widget) {
			var formData = WidgetHandler.Utils.readForm();
			widgetData = jQuery.extend(widgetData, formData);
			WidgetHandler.CustomButtons.render(widget, widgetData, position);
		}
		self.removeLoading();
	},
	executeCBUrlAction: function (cbCustomData) {
		var { customButtonDetails, custombuttonEmptymodal, entityId, moduleName, ownerID } = cbCustomData;
		var mergeFields = this.getAPINameFromMergeField(customButtonDetails.url);
		mergeFields = mergeFields || [];
		var cxFormData = this.data.cxPropFormData, layoutComponentData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			info = {};
		mergeFields.forEach(function (arrItem) {
			var apiN, data, formFieldList = cxUtilityObj.formFieldList, errObject = cxFormData.$RECORD__Error__Object || {};
			if (arrItem && arrItem.module === moduleName && arrItem.module_field) {
				apiN = arrItem.module_field;
			}
			if (formFieldList[apiN] || apiN === "id" || apiN === "ownerId") {
				var fldValue = cxFormData[apiN], isLookupField = false;
				if (formFieldList[apiN].fieldUiType && formFieldList[apiN].fieldUiType === 133) {
					isLookupField = true;
				}
				if (errObject[apiN]) {
					fldValue = errObject[apiN].value;
				}
				if (apiN === "id") {
					fldValue = entityId;
				} else if (apiN === "ownerId") { //no i18n
					fldValue = ownerID;
				}
				if (fldValue) {
					if (typeof fldValue === "string") {
						data = encodeURIComponent(fldValue);
					} else if (Array.isArray(fldValue)) {
						data = encodeURIComponent("[" + fldValue + "]");
					} else if (typeof fldValue === "object") { //no i18n
						if (isLookupField && fldValue.id && (Crm && Crm.userDetails && Crm.userDetails.CUSTOM_BUTTON_INVOKE_URL_LOOKUP_ID_SUPPORT)) {
							data = encodeURIComponent(fldValue.id);
						} else if (fldValue.full_name) {
							data = encodeURIComponent(fldValue.full_name);
						} else if (fldValue.name) {
							data = encodeURIComponent(fldValue.name);
						}
					} else {
						data = fldValue;
					}
				}
				if (data) {
					info[apiN] = data;
				}
			}
		}.bind(this));
		custombuttonEmptymodal.arginfo = info;
		this.callCustomFunctionAction({ customButtonDetails, info, custombuttonEmptymodal });
	},
	executeCBCircuitsAction: function () {
		var info = {}; info.id = entityId; custombuttonEmptymodal.arginfo = info;
		this.callCustomFunctionAction(buttonId, info, custombuttonEmptymodal);
	},
	executeCustomButtonflow: function (cbResponse) {
		var customButtonDetails = cbResponse.customButtonDetails || {}, custombuttonEmptymodal = {};
		if (customButtonDetails && customButtonDetails.id) {
			Lyte.objectUtils(this.data.cxPropCompleteCBData, "add", customButtonDetails.id, customButtonDetails);
			var currentPage = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.currentPage, cxPropFormData = this.data.cxPropFormData || {}, moduleName = this.data.cxPropLayoutComponentData.cxPropModuleName;
			var entityId = currentPage === "edit" ? cxPropFormData.id : 1, ownerID = cxPropFormData.Owner && cxPropFormData.Owner.id ? cxPropFormData.Owner.id : (Crm && Crm.userDetails && Crm.userDetails.USER_ID);//no i18n
			var actionParamsObj = { customButtonDetails, custombuttonEmptymodal, entityId, moduleName, ownerID };
			switch (customButtonDetails.action) {
				case 'circuits':
					this.executeCBCircuitsAction(actionParamsObj);
					break;
				case 'url':
				case 'web_tab':
					this.executeCBUrlAction(actionParamsObj);
					break;
				case 'widget':
					this.executeCBWidgetsAction(actionParamsObj);
					break;
				case 'custom_function':
					this.executeCBFunctionAction(actionParamsObj);
					break;
			}
		}
	},
	callCustomFunctionAction: function (cbCustomData) {
		var { customButtonDetails, info, custombuttonEmptymodal } = cbCustomData;
		var queryparm = {}, layoutComponentData = this.data.cxPropLayoutComponentData;
		if (layoutComponentData.cxInternalUtilityObj.currentPage === 'edit') { //no i18n
			queryparm.ids = nself.getData('dataBind.id'); //no i18n
		}
		if (custombuttonEmptymodal.recordId) {
			queryparm.ids = custombuttonEmptymodal.recordId;
		}
		if (custombuttonEmptymodal.proceed_empty) {
			queryparm.proceed_empty = true;
		}
		var custom_buttons = { arguments: info ? info : {} };
		if (custombuttonEmptymodal.lookup_values) {
			custom_buttons.lookup_values = custombuttonEmptymodal.lookup_values;
		}
		var cbActionTriggerCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonActionTrigger', onCustomButtonActionTrigger: { customButtonDetails, queryparm, custom_buttons } });//no i18n
		return cbActionTriggerCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return false;
			} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('cbActionSuccessDetails')) {
				//this.executeCustomButtonActionsflow(promiseResponse);
				return { promiseResponse, onSuccess: true };
			} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('cbActionFailureDetails')) {
				//this.executeCBActionsFailureflow(promiseResponse);
				return { promiseResponse, onFailure: false };
			}
		}.bind(this));
	},
	/*
	executeCBActionsFailureflow: function (cbActionFailureResp) {
		var errResp = cbActionFailureResp && cbActionFailureResp.responseText ? JSON.parse(cbActionFailureResp.responseText) : {};
		if (errResp) {
			if (errResp.code === "UNABLE_EXECUTE_THE_SCRIPT") {
				if (errResp.details && errResp.details.creator_error) {

					switch (errResp.details.creator_error) {
						case 'SOCKET_CLOSED':
							crmui.showMsgBand('warning', I18n.getMsg('crm.custombutton.function.time.exceed'), 7000);  //No I18N
							break;
						case 'TOO_MANY_REQUESTS':
							crmui.showMsgBand('error', I18n.getMsg('crm.custombutton.function.limit.exceed'), 5000);  //No I18N
							break;
						case 'CIRCUITS_EXECUTION_LIMIT_REACHED':
							crmui.showMsgBand('error', I18n.getMsg('crm.circuits.limit.exceeded'), 5000);  //No I18N
							break;
						case 'CIRCUITS_FEATURE_NOT_AVAILABLE':
							crmui.showMsgBand('error', I18n.getMsg('crm.circuits.button.feature.not.available', Crm.brandName), 5000);  //No I18N
							break;
						case 'CIRCUITS_ACCOUNT_FREEZED':
							crmui.showMsgBand('error', I18n.getMsg(Crm.userDetails.IS_ADMIN_ROLE ? 'crm.circuits.accfreeze.button.admin' : 'crm.circuits.accfreeze.button.nonadmin', Crm.brandName), 5000);  //No I18N
							break;
						case 'CIRCUITS_TYPE_NOT_ALLOWED':
							if (Crm.userDetails.IS_ADMIN_ROLE) {
								crmui.showMsgBand('error', I18n.getMsg("crm.circuits.associate.non.payment", Crm.brandName), 5000);  //No I18N
							} else {
								crmui.showMsgBand('error', I18n.getMsg("crm.circuits.associate.non.payment", Crm.brandName) + ". " + I18n.getMsg("crm.circuits.contact.admin"), 5000);  //No I18N
							}
							break;
						default:
							crmui.showMsgBand('warning', I18n.getMsg('crm.label.button.function.execute.error'), 1500);  //No I18N
							break;
					}
				} else {
					crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				}
				return;
			} else if (errResp.code === "INVALID_DATA" && errResp.message === "invalid custom button id") {//no i18n
				crmui.showMsgBand('error', I18n.getMsg('crm.label.insufficient.privileges'), 5000);//No I18N
				return;
			} else if (errResp.code === "INTERNAL_ERROR") {//No I18N
				crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				return;
			} else if (errResp.message) {
				crmui.showMsgBand('error', errResp.message, 5000);//No I18N
				return;
			}
			return
		}
		var response;
		try {
			response = cbActionFailureResp.response ? JSON.parse(error.response) : response;
		} catch (ignored) {
			response = cbActionFailureResp;
		}
		var errCode = response && response.details && response.details.creator_error;
		if (errCode) {
			if (errCode === 'TOO_MANY_REQUESTS') {
				crmui.showMsgBand('error', I18n.getMsg('crm.custombutton.function.limit.exceed'), 5000);  //No I18N
				return;
			} else if (errCode === 'SOCKET_CLOSED') {//No I18N
				crmui.showMsgBand('warning', I18n.getMsg('crm.custombutton.function.time.exceed'), 7000);  //No I18N
				return;
			} else {
				crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				return;
			}
		}
	},
	executeCustomButtonActionsflow: function (cbActionSuccResp) {
		nself.custombuttonWizardDetails = undefined;
		var serverDetails = res.actionResolved.details;
		var creator_response = serverDetails.custom_function ? serverDetails.custom_function.creator_response : undefined;
		if (creator_response instanceof Object) {
			creator_response = JSON.stringify(creator_response);
		}
		var execution_status = serverDetails.custom_function ? serverDetails.custom_function.status : undefined;
		var reloadRecord = true;
		var isCascadeEnabled = false;
		var responseObj = creator_response;


		nself.removeLoading();
		if (validationUtils.isNotEmpty(serverDetails.empty_fields)) {
			var compData = nself.data;
			var api_name = compData.moduleData.api_name, plural_label = compData.moduleData.plural_label, modFlds = compData.moduleData.fields, currMode = nself.data.initRoute === "edit" ? "edit" : "create";//no i18n 
			var validErrorArr = [];
			$L.each(serverDetails.empty_fields, function (key, val) {
				if (key === api_name || key === plural_label) {
					var validFLdsarr = [];
					if (val && val.length) {
						var errFlds = modFlds.filter(function (fld) { return val.includes(fld.api_name) || val.includes(fld.display_label); });
						var apiNames = errFlds.mapByKey("api_name");//no i18n
						var dispLabel = errFlds.mapByKey("display_label");//no i18n
						val.forEach(function (sfld) {
							var indVal = apiNames.indexOf(sfld) !== -1 ? apiNames.indexOf(sfld) : dispLabel.indexOf(sfld);
							if (indVal > -1) {
								var curerrFlds = errFlds[indVal];
								if (curerrFlds.view_type[currMode] && !["207", "208"].includes(curerrFlds.ui_type)) {
									validFLdsarr.push(curerrFlds.field_label);
								}
							}
						});
						if (validFLdsarr.length) {
							var newObj = { module: key, fields: validFLdsarr };
							validErrorArr.push(newObj);
						}
					}

				} else {
					var otherObj = { module: key, fields: val };
					validErrorArr.push(otherObj);
				}
			});
			if (validErrorArr.length) {
				custombuttonEmptymodal.proceed_empty = true;
				custombuttonEmptymodal.modulesArr = validErrorArr;
				custombuttonEmptymodal.response = serverDetails;
				return nself.displayEmptyModal(custombuttonEmptymodal, buttonId);
			} else if (serverDetails.action === "custom_function") {
				custombuttonEmptymodal.proceed_empty = true;
				custombuttonEmptymodal.response = serverDetails;
				return nself.callCustomFunction(buttonId, custombuttonEmptymodal.arginfo, custombuttonEmptymodal, nself.data.isWizard ? true : false);
			}
		}

		if (serverDetails.action === "invoke_url" || serverDetails.action === "web_tab") {
			return nself.invokeURL(serverDetails, custombuttonEmptymodal.wizButtonId);
		}
		else if (serverDetails.action === "custom_function" && serverDetails.custom_function.url && Object.keys(serverDetails.custom_function.url).length !== 0 && serverDetails.custom_function.url.constructor === Object) {
			nself.invokeURL(serverDetails.custom_function, custombuttonEmptymodal.wizButtonId);
		}
		else if (serverDetails.action === "circuits") {
			var isCircuitsPermissionAvailable = Crm.userDetails.permissions.hasOwnProperty("Crm_Implied_Advanced_Dev_Access") && Crm.userDetails.permissions.Crm_Implied_Advanced_Dev_Access;//NO I18N
			if (serverDetails.hasOwnProperty('circuits') && serverDetails.circuits.hasOwnProperty('circuitId') && !serverDetails.circuits.hasOwnProperty('scheduled') && isCircuitsPermissionAvailable && serverDetails.circuits.status === "success") {
				if (!serverDetails.circuits.hasOwnProperty('executionUrl')) {
					var executionLogsUrl = Crm.getCrmBasePath() + '/settings/circuits/executionLogs?circuit_id=' + serverDetails.circuits.circuitId;//NO I18N
					crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success') + ". " + "<span class='link1' onClick='networkUtils.openUrl(\"" + executionLogsUrl + "\", \"_blank\", \"\");'>" + I18n.getMsg('crm.circuits.rl.view.execution') + "</span>", 5000);  //No I18N
				} else {
					var executionLogsUrl = serverDetails.circuits.executionUrl, circuitName = serverDetails.circuits.name;
					crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success') + ". " + '<span class="link1" onClick="crmRelatedList.showCircuitPreview(\'' + executionLogsUrl + '\',\'' + circuitName + '\')">' + I18n.getMsg('crm.circuits.rl.view.execution') + "</span>", 5000);  //No I18N
				}
			} else if (serverDetails.hasOwnProperty('circuits') && serverDetails.circuits.hasOwnProperty('scheduled') && isCircuitsPermissionAvailable) {//no i18n
				crmui.showMsgBand("success", I18n.getMsg("crm.circuits.schedule.success"), 4000);//no i18n
			} else {
				crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success'), 4000);  //No I18N
			}
			return;
		}
		if (serverDetails.custom_function && execution_status === "success" && creator_response) {
			Handlebars.registerPartial('cbSuccessPopup', Handlebars.templates.cbSuccessPopup);//No I18N
			$("body").append(Handlebars.templates.cbSuccessPopup());//eslint-disable-line @zoho/zstandard/no-body-events
			$("#cbSuccessPopup").addClass('zcrm-show');
			setTimeout(function () { $("#cbSuccessPopup").show(); }, 150)
			$("#cbSuccessPopupRespContent").text(creator_response);
			$("#cbExecutedPage").val("create");
		}
	},
	*/
	methods: {
		onCustomButtonBeforeShow: function (evt) {
			var cbBeforeShowCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonBeforeShow', onCustomButtonBeforeShow: { evt } });//no i18n
			return cbBeforeShowCBResponse.then(function (promiseResponse) {
				if (promiseResponse === false) {
					return false;
				}
				return true;
			}.bind(this));
		},
		onCustombuttonHide: function () {
			var cbSearchID = this.data.cbCommonData.cbSearchID, searchNode = $L('#' + cbSearchID)[0];//No i18n
			if (searchNode) {
				searchNode.setValue("");//No i18n
			}
		},
		searchCustomButtons: function (result) {
			Lyte.objectUtils(this.data.cbCommonData, "add", "showNoResultsMessage", result && result.length ? false : true);//No I18n
		}
	},
	getAPINameFromMergeField: function (mergeField) {
		var fieldsused = [], matcher, pattern = new RegExp(/\$\{([^\}].*?)\}/g);
		while (matcher = pattern.exec(mergeField)) {
			var moduleFields = matcher[1].split('.');
			var fieldData = {};
			fieldData.module = moduleFields[0];
			fieldData.module_field = moduleFields[1];
			if (moduleFields.length > 2) {
				fieldData.lookup_field = moduleFields[2];
			}
			fieldsused.push(fieldData);
		}
		return fieldsused;
	}
}, {
	mixins: [
		"crux-create-base-mixin",//No I18n
		"crux-entity-common-utils",//No I18n
		"crux-create-requesthandler-mixin"//No I18n
	]
});