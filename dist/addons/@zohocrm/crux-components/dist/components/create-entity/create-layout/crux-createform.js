Lyte.Component.register("crux-createform", {
_template:"<template tag-name=\"crux-createform\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.showCommonMessage}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.isSuccessMessage}}\"><template case=\"true\"> <div class=\"cxSuccessMessageWrapper\"> <span class=\"cxSuccessTickIcon\"></span> <div class=\"cxSuccessMsgTextWrap\"> <span class=\"cxSuccessHeaderMsg\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.successMessageInfo.headerMessage}}</span> <span class=\"cxSuccessRecordName\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.successMessageInfo.recordName}}</span> </div> <lyte-button lt-prop-appearance=\"primary\" class=\"cxSuccessViewRecordBtn\" data-zcqa=\"btn_viewRecord\" onclick=\"{{action('viewRecord',cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData)}}\"> <template is=\"registerYield\" yield-name=\"text\">View Record <span class=\"cxSuccessViewRecordArwIcon\"></span></template> </lyte-button> </div> </template><template case=\"false\"> <div class=\"cxErrorMessageWrapper\"> <span class=\"cxErrorAlertIcon\"></span> <span class=\"cxErrorMsgText\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.message}}</span> </div> </template></template> </template><template case=\"false\"> <div class=\"{{parentDivClass}}\"> <template value=\"{{cxPropRenderMode}}\" is=\"switch\">    <template case=\"outlet\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-header cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> <crux-create-layout-content cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> <crux-create-layout-footer cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </form> </div> </template><template case=\"modal\"> <lyte-modal id=\"cruxCreateFormModal{{cxPropLayoutComponentData.currentInstObjKey}}\" lt-prop=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.cxPropModalProperties}}\" on-before-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnBeforeShow&quot;,true)}}\" on-resize=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnResize&quot;,true)}}\" on-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnClose&quot;,true)}}\" on-before-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnBeforeClose&quot;,true)}}\" on-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnShow&quot;,true)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <crux-create-layout-header instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> </lyte-modal-header> <lyte-modal-content class=\"cxCreateFormModalContent\"> <crux-form-component id=\"cxQuickCreateFormComp\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-content instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> </form> </div> </crux-form-component> </lyte-modal-content> <lyte-modal-footer class=\"cxCreateFormModalFooter\"> <crux-create-layout-footer instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </lyte-modal-footer> </template> </lyte-modal> </template><template case=\"popover\"> <lyte-popover id=\"cruxCreateFormPopover{{cxPropLayoutComponentData.currentInstObjKey}}\" lt-prop=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.cxPropPopoverProperties}}\" on-position-change=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnPositionChange&quot;,false)}}\" on-scroll=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnScroll&quot;,false)}}\" on-resize=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnResize&quot;,false)}}\" on-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnClose&quot;,false)}}\" on-before-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnBeforeClose&quot;,false)}}\" on-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnShow&quot;,false)}}\" on-before-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnBeforeShow&quot;,false)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-header> <crux-create-layout-header instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> </lyte-popover-header> <lyte-popover-content class=\"cxCreateFormPopoverContent\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-content instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> </form> </div> </lyte-popover-content> <lyte-popover-footer> <crux-create-layout-footer instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </lyte-popover-footer> </template> </lyte-popover> </template></template> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"outlet":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,3]},{"type":"registerYield","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"registerYield","position":[1,1,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,5]},{"type":"attr","position":[1,1,7]},{"type":"registerYield","position":[1,1,7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,7]}]},"modal":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,1,3]},{"type":"registerYield","position":[3,1,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]},"popover":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"registerYield","position":[3,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropRenderMode","cxPropModuleId","cxPropRecordId","cxPropRecordData","cxPropCurrentPage","cxPropLayoutId","cxPropOutletValue","cxPropLayoutData","cxPropModuleData","cxPropLayoutSections","moduleCurntInstObj","cxPropFormData","cxPropOtherData","yieldLayoutGlobalData","showLoading","cxPropLayoutRulesRequired","cxPropValidationRulesRequired","cxPropEntityRecord"],
_observedAttributesType :["object","string","string","string","string","object","string","string","string","object","object","array","object","object","object","object","boolean","boolean","boolean","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropModuleId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropRecordId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropRecordData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropCurrentPage: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropLayoutId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropOutletValue: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropLayoutData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropLayoutSections: Lyte.attr('array', { 'default': [] }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropOtherData: Lyte.attr('object', { 'default': {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} }), //no i18n
			showLoading: Lyte.attr("boolean", { "default": true }), //no i18n
			cxPropLayoutRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropValidationRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropEntityRecord: Lyte.attr('object')//no i18n
		}
	},
	emptyLayoutDetails: function (validLayoutProperty) {
		let toEmptyProperties = '';
		if (validLayoutProperty) {
			switch (validLayoutProperty) {
				case 'cxPropLayoutId':
					this.data.cxPropLayoutName = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutData = {};
					toEmptyProperties = "cx-prop-layout-name,cx-prop-layout-sections,cx-prop-layout-data";
					break;
				case 'cxPropLayoutName':
					this.data.cxPropLayoutId = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutData = {};
					toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-data";
					break;
				case 'cxPropLayoutData':
					this.data.cxPropLayoutId = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutName = "";
					toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name";
					break;
			}
		} else {
			this.data.cxPropLayoutId = "";
			this.data.cxPropLayoutName = "";
			this.data.cxPropLayoutSections = [];
			this.data.cxPropLayoutData = {};
			toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name,cx-prop-layout-data";
		}
		this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
		if (this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', toEmptyProperties.split(','));
		}
	},
	observeLayoutDataAndRefresh: function () {
		this.emptyLayoutDetails('cxPropLayoutData');
		this.reRenderComponent({ cxPropLayoutData: this.data.cxPropLayoutData || {} });
	}.observes('cxPropLayoutData', 'cxPropLayoutData.{}'),
	reRenderComponent: function (customData, isRefresh) {
		this.setData('showLoading', true);
		this.data.cxPropLayoutComponentData = {};
		if (customData.cxPropModuleApiName && !customData.cxPropModuleId) {
			let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: customData.cxPropModuleApiName });
			if (moduleDetails && moduleDetails.moduleId) {
				customData.cxPropModuleId = moduleDetails.moduleId;
			}
		}
		for (var eachDataProp in customData) {
			if (eachDataProp === "cxPropModuleId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				if (!customData.hasOwnProperty('cxPropModuleData')) {
					this.data.cxPropModuleData = {};
					if (this.getMethods('onBuilderPropertyRemove')) {
						this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data']);
					}
				}
				if (!customData.hasOwnProperty('cxPropLayoutId')) {
					this.emptyLayoutDetails();
				}
				this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
			}
			if (eachDataProp === "cxPropLayoutId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				let layoutPropsToEmpty = [];
				if (!customData.hasOwnProperty('cxPropLayoutSections')) {
					this.data.cxPropLayoutSections = [];
					layoutPropsToEmpty.push('cx-prop-layout-sections');
				}
				if (!customData.hasOwnProperty('cxPropLayoutData')) {
					this.data.cxPropLayoutData = {};
					layoutPropsToEmpty.push('cx-prop-layout-data');
				}
				if (!customData.hasOwnProperty('cxPropLayoutName')) {
					this.data.cxPropLayoutName = "";
					layoutPropsToEmpty.push('cx-prop-layout-name');
				}
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', layoutPropsToEmpty);
				}
			}
			if (eachDataProp === "cxPropRecordId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				if (!customData.hasOwnProperty('cxPropRecordData')) {
					this.data.cxPropRecordData = {};
				}
				if (!customData.hasOwnProperty('cxPropLayoutId')) {
					this.emptyLayoutDetails();
				}
			}
			if (eachDataProp === 'cxPropMode' && customData[eachDataProp] === 'create') {
				if (!customData.hasOwnProperty('cxPropRecordData')) {
					this.data.cxPropRecordData = {};
				}
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-information-type']);
				}
			}
			this.data[eachDataProp] = customData[eachDataProp];
		}
		if (!customData.hasOwnProperty('cxPropFormData')) {
			this.data.cxPropFormData = {};
		}
		this.initHandler();
	},

	getExposedCXPropertiesList: function () {
		return ['cxPropCurrentPage', 'cxPropModuleData', 'cxPropLayoutRulesRequired', 'cxPropValidationRulesRequired',
			'cxPropRecordData', 'cxPropRecordId', 'cxPropOutletValue',
			'cxPropModuleId', 'cxPropLayoutSections', 'cxPropLayoutData',
			'cxPropLayoutId', 'cxPropFormData'];
	},
	initHandler: function () {
		var layoutCompData = this.data.cxPropLayoutComponentData || {};
		let dataProps = this.getExposedCXPropertiesList();
		dataProps.forEach((dataProps) => {
			if (this.data.hasOwnProperty(dataProps) && !layoutCompData.hasOwnProperty(dataProps)) {
				layoutCompData[dataProps] = this.data[dataProps];
			}
		});
		let otherUserData = this.data.cxPropOtherData || {};
		for (var otherDataProps in otherUserData) {
			layoutCompData[otherDataProps] = otherUserData[otherDataProps];
		}
		if (layoutCompData && !layoutCompData.cxPropRecordId && layoutCompData.cxPropRecordData && layoutCompData.cxPropRecordData.id) {
			layoutCompData.cxPropRecordId = layoutCompData.cxPropRecordData.id;
			if (!this.data.cxPropRecordId) { this.data.cxPropRecordId = layoutCompData.cxPropRecordId; }
		}
		if (!this.isEmptyObj(layoutCompData)) {
			this.data.originalLayoutComponentData = $L.extend(true, {}, layoutCompData);
			layoutCompData.cxInternalUtilityObj = { formFieldList: {}, subformFieldList: {} };
			if (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id && (!layoutCompData.cxPropLayoutId || layoutCompData.cxPropLayoutId !== layoutCompData.cxPropLayoutData.id)) {
				layoutCompData.cxPropLayoutId = layoutCompData.cxPropLayoutData.id;
			}
			if (layoutCompData.cxPropLayoutData && (!layoutCompData.cxPropLayoutSections || !layoutCompData.cxPropLayoutSections.length)) {
				this.data.cxPropLayoutSections = layoutCompData.cxPropLayoutSections = layoutCompData.cxPropLayoutData.sections || [];
			}
			if (!layoutCompData.instanceObjKey && !layoutCompData.cxInternalUtilityObj.instanceObjKey && !this.data.instanceObjKey) {
				let currentInstObjKey = this.getDynamicCurrentInstanceObjKey();
				layoutCompData.instanceObjKey = layoutCompData.cxInternalUtilityObj.currentInstObjKey = currentInstObjKey;
			}
			if (!layoutCompData.hasOwnProperty('cxPropSubformProperties')) {
				layoutCompData.cxPropSubformProperties = {
					isSubformRecordSupported: true,
					cxPropLimitRows: true,
					enableCountryCode: typeof Crm !== "undefined" && Crm.userDetails ? Crm.userDetails.isPhoneNoNewView : false
				};
			}
			if (!layoutCompData.cxPropContentWrapperClass) {
				layoutCompData.cxPropContentWrapperClass = "";
			}
			this.checkAndFetchMetaData(layoutCompData);
			if (this.data.haveAllDefaultMetaData) {
				if (layoutCompData.cxPropModuleData) {
					this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
					layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
					layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
					let layoutDetails = (this.getDefaultLayoutDetails(layoutCompData.cxPropModuleData, layoutCompData.cxPropProfileName, layoutCompData.cxPropLayoutId)) || {};
					if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
						layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
					}
					if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
						layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
					}
				}
				if (layoutCompData.cxPropLayoutSections && layoutCompData.cxPropLayoutSections.length) {
					this.setData('cxPropLayoutSections', layoutCompData.cxPropLayoutSections);
				}
				this.actual_init();
			}
		} else {
			this.setDefautMessageDetails();
			let cxInternalObj = this.data.cxPropLayoutComponentData.cxInternalUtilityObj;
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", "cxPropLayoutComponentData is empty. It's a mandatory data property to render create form.");//no i18n
		}
	},
	init: function () {
		this.initHandler();
	},
	actual_init: function (moduleResponseData, layoutSectionsData) {
		var layoutCompData = this.data.cxPropLayoutComponentData;
		if (!this.data.cxPropRenderMode) {
			if (this.data.cxPropOtherData && this.data.cxPropOtherData.cxPropRenderMode) {
				this.setData('cxPropRenderMode', this.data.cxPropOtherData.cxPropRenderMode);//no i18n
			} else {
				let cxPropRenderMode = layoutCompData.isQuickCreate ? "modal" : "outlet";//no i18n
				this.setData('cxPropRenderMode', cxPropRenderMode);//no i18n
			}
		}
		var layoutSections = this.data.cxPropLayoutSections || [];
		if (!layoutSections.length) {
			layoutSections = (layoutSectionsData || []);
		}
		var cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		if (layoutCompData.cxPropLayoutSections) {
			let validSections = [];
			if (layoutCompData.isQuickCreate) {
				let qcSec = layoutCompData.cxPropLayoutSections.filter((sec) => {
					return (sec.name === "Quick create" ||
						sec.name === "Quick Create") && sec.generated_type === "default";//no i18n
				})[0];
				if (qcSec) {
					var firstNameField, salututationField;
					qcSec.fields.filter(field => {
						if (field.column_name === "FIRSTNAME") {
							firstNameField = field;
						} else if (field.column_name === "SALUTATION") {
							salututationField = field;
						}
					});
					if (firstNameField && !salututationField) {
						let currentModuleFields = [];
						if (layoutCompData.cxPropModuleData && layoutCompData.cxPropModuleData.fields && layoutCompData.cxPropModuleData.fields.length) {
							currentModuleFields = layoutCompData.cxPropModuleData.fields;
						}
						let fLen = currentModuleFields.length;
						for (let k1 = 0; k1 < fLen; k1++) {
							let currentField = currentModuleFields[k1];
							if (currentField && currentField.column_name === "SALUTATION" && Array.isArray(qcSec.fields)) {
								qcSec.fields.push(currentField);
							}
						}
					}
					validSections.push(qcSec);
					layoutCompData.cxInternalUtilityObj.layoutColumnCount = qcSec.column_count;
				};
			} else {
				let nonQCSections = layoutCompData.cxPropLayoutSections.filter((sec) => {
					return !(sec.generated_type === "default" && (["Quick create", "Quick Create", "Business Card"].includes(sec.name)));//no i18n
				});
				if (nonQCSections) {
					validSections = validSections.concat(nonQCSections);
				};
			}
			if (!layoutCompData.cxInternalUtilityObj.layoutColumnCount && layoutCompData.layoutColumnCount) {
				layoutCompData.cxInternalUtilityObj.layoutColumnCount = layoutCompData.layoutColumnCount;
			}
			layoutCompData.allLayoutSections = layoutCompData.cxPropLayoutSections.slice(0);
			layoutCompData.cxPropLayoutSections = validSections;
			this.setData('cxPropLayoutSections', layoutCompData.cxPropLayoutSections);
			layoutSections = layoutCompData.cxPropLayoutSections;
		}
		if (!cxUtilityObj.hasOwnProperty('defaultUiTypeToCruxMapping')) {
			if (layoutCompData.hasOwnProperty('defaultUiTypeToCruxMapping')) {
				cxUtilityObj.defaultUiTypeToCruxMapping = layoutCompData.defaultUiTypeToCruxMapping;
			} else if (!layoutCompData.hasOwnProperty('defaultUiTypeToCruxMapping') && typeof crmConstants !== "undefined") {
				cxUtilityObj.defaultUiTypeToCruxMapping = crmConstants.defaultUiTypeToCruxMapping;
			}
		}
		layoutCompData.cxPropRenderMode = this.data.cxPropRenderMode;
		var currentInstObjKey = this.generateCurrentInstanceObject({ instanceObjKey: layoutCompData.instanceObjKey, moduleData: layoutCompData.cxPropModuleData, moduleSections: layoutCompData.cxPropLayoutSections, moduleFields: layoutCompData.cxPropModuleData.fields });
		cxUtilityObj.currentInstObjKey = currentInstObjKey;
		this.setData('instanceObjKey', currentInstObjKey);//no i18n
		layoutCompData.layoutComponentDomNode = this.$node;
		layoutCompData.currentInstObjKey = currentInstObjKey;
		layoutCompData.cxFormYieldNames = {
			cxFormCompleteFieldYield: 'cxFormCompleteFieldYield',
			cxFormFieldHeaderYield: 'cxFormFieldHeaderYield',
			cxFormFieldFooterYield: 'cxFormFieldFooterYield',
			cxFormCompleteSectionYield: 'cxFormCompleteSectionYield',
			cxFormSectionHeaderYield: 'cxFormSectionHeaderYield',
			cxFormSectionFooterYield: 'cxFormSectionFooterYield',
			cxFormHeaderYield: 'cxFormHeaderYield',
			cxFormFooterYield: 'cxFormFooterYield',
			cxFormHeaderPrefixYield: 'cxFormHeaderPrefixYield',
			cxFormHeaderSuffixYield: 'cxFormHeaderSuffixYield',
			cxFormFieldErrorYield: 'cxFormFieldErrorYield',
			cxFormSectionLabelYield: 'cxFormSectionLabelYield'
		};
		let class_list = this.getData('class');//no i18n
		if (currentInstObjKey) {
			class_list = class_list || "";//No i18N
			cxUtilityObj.layoutCompSelectorValue = `.cxLayComp${currentInstObjKey}`;
			cxUtilityObj.cxCreateFormContentWrapperClass = `cxCreateLayout_cw_${currentInstObjKey}`;
			class_list += (' cxLayComp' + currentInstObjKey);//No i18N
			this.setData('class', class_list);//No i18N
		}
		this.data.parentDivClass = `${cxUtilityObj.cxCreateFormContentWrapperClass} ${layoutCompData.cxPropContentWrapperClass || ''} ${layoutCompData.cxPropRenderMode === "modal" && layoutCompData.isQuickCreate ? 'cxQuickCreateModal' : ''}`;
		this.constructLyteUiComponentProperties({ cxPropRenderMode: this.data.cxPropRenderMode, layoutCompData });
		var cxPropModuleData = this.isEmptyObj(this.data.cxPropModuleData) ? moduleResponseData : this.data.cxPropModuleData;
		var moduleCurntInstObj = cxPropModuleData[currentInstObjKey], pageMode = "Create", currentViewType = "create";
		if (!cxUtilityObj.currentPage) {
			cxUtilityObj.currentPage = this.data.cxPropCurrentPage || layoutCompData.cxPropCurrentPage || "create";
		}
		switch (cxUtilityObj.currentPage) {
			case 'create':
				currentViewType = "create"; pageMode = "Create";
				if (layoutCompData.isQuickCreate) {
					pageMode = "Quick Create :"; currentViewType = "quick_create";
				}
				break;
			case 'edit':
				currentViewType = "edit"; pageMode = "Edit"; break;
			case 'clone':
				currentViewType = "create"; pageMode = "Clone"; break;
		}
		moduleCurntInstObj.currentPageTitle = layoutCompData.cxPropPageTitle ? layoutCompData.cxPropPageTitle : (`${pageMode} ${cxPropModuleData.singular_label || cxPropModuleData.module_name || ""}`);
		cxUtilityObj.currentViewType = currentViewType;
		this.setData('moduleCurntInstObj', moduleCurntInstObj);
		cxUtilityObj.mapDependencyFields = []; cxUtilityObj.subformMapDependencyFields = {};
		cxUtilityObj.layoutCurrencyFields = []; cxUtilityObj.subformLayoutCurrencyFields = {};
		cxUtilityObj.fieldOfLookupDetails = {}; cxUtilityObj.subformFieldOfLookupDetails = {};
		cxUtilityObj.jsonTypeConversionFields = []; cxUtilityObj.subformJsonTypeConversionFields = {};
		cxUtilityObj.layoutFieldIdVsMetaObject = {}; cxUtilityObj.layoutFieldApiVsMetaObject = {};
		cxUtilityObj.subFormFieldIdVsMetaObject = {}; cxUtilityObj.subFormFieldApiVsMetaObject = {};
		cxUtilityObj.layoutFieldDatatypeVsMetaObject = {}; cxUtilityObj.subFormFieldDatatypeVsMetaObject = {};
		cxUtilityObj.layoutFieldUitypeVsMetaObject = {};
		cxUtilityObj.layoutFieldColumnNameVsMetaObject = {};
		layoutSections.forEach(function (eachSection) {
			var secFieldsArray = [], aggFields = [], subformFields = [], subFormApiname = "";
			secFieldsArray = eachSection.fields && eachSection.fields.length ? eachSection.fields : secFieldsArray;
			if (eachSection.isSubformSection) {
				var subformFieldList = {};
				secFieldsArray.forEach(function (sFields) {
					if (sFields.data_type === "subform" || sFields.data_type === "static_subform") {
						subFormApiname = sFields.api_name;
						cxUtilityObj.subformMapDependencyFields[subFormApiname] = [];
						cxUtilityObj.subformLayoutCurrencyFields[subFormApiname] = [];
						cxUtilityObj.subformJsonTypeConversionFields[subFormApiname] = [];
						cxUtilityObj.subformFieldOfLookupDetails[subFormApiname] = {};
						cxUtilityObj.subFormFieldDatatypeVsMetaObject[subFormApiname] = {};
					}
					if (this.isEmptyObj(sFields.subform)) {
						subformFields.push(sFields);
						this.appendInsObjectProperties({ fieldMeta: sFields, currentInstObjKey, subformFieldList, isSubform: true });
					} else {
						aggFields.push(sFields);
					}
				}.bind(this));
				if (subFormApiname) {
					cxUtilityObj.subformFieldList[subFormApiname] = subformFieldList;
					var sidvsMetaObj = this.getIdVsFieldMetaMappingObject({ fieldsArray: subformFields });
					cxUtilityObj.subFormFieldIdVsMetaObject[subFormApiname] = sidvsMetaObj;
					let newMapObj = {
						fieldOfLookupDetails: cxUtilityObj.subformFieldOfLookupDetails[subFormApiname],
						jsonTypeConversionFields: cxUtilityObj.subformJsonTypeConversionFields[subFormApiname],
						currencyFieldsArray: cxUtilityObj.subformLayoutCurrencyFields[subFormApiname],
						fieldDatatypeVsMetaObject: cxUtilityObj.subFormFieldDatatypeVsMetaObject[subFormApiname],
						fieldsArray: subformFields
					};
					var sapivsMetaObj = this.getApiVsFieldMetaMappingObject(newMapObj);
					cxUtilityObj.subFormFieldApiVsMetaObject[subFormApiname] = sapivsMetaObj;
				} else {
					aggFields = [];
				}
			}
			if (aggFields && aggFields.length) {
				secFieldsArray = aggFields;
			}
			this.appendInsObjectProperties({ fieldsArray: secFieldsArray, currentInstObjKey });
			var idvsMetaObj = this.getIdVsFieldMetaMappingObject({ fieldsArray: secFieldsArray });
			$L.extend(cxUtilityObj.layoutFieldIdVsMetaObject, idvsMetaObj);
			let mapObj = {
				jsonTypeConversionFields: cxUtilityObj.jsonTypeConversionFields,
				fieldOfLookupDetails: cxUtilityObj.fieldOfLookupDetails,
				currencyFieldsArray: cxUtilityObj.layoutCurrencyFields,
				fieldDatatypeVsMetaObject: cxUtilityObj.layoutFieldDatatypeVsMetaObject,
				fieldUitypeVsMetaObject: cxUtilityObj.layoutFieldUitypeVsMetaObject,
				fieldColumnNameVsMetaObject: cxUtilityObj.layoutFieldColumnNameVsMetaObject,
				fieldsArray: secFieldsArray
			};
			var apivsMetaObj = this.getApiVsFieldMetaMappingObject(mapObj);
			$L.extend(cxUtilityObj.layoutFieldApiVsMetaObject, apivsMetaObj);
		}.bind(this));
		var originalData = layoutCompData.cxPropFormData;
		var cxPropFormData = this.getCruxFormData(originalData);
		if (cxUtilityObj.currentPage === 'clone' && layoutCompData.isFromCrmWrapperComponent) {
			cxPropFormData = this.getInitialFormDataForClone(cxPropFormData);
		} else if (cxUtilityObj.currentPage === 'edit' && this.isEmptyObj(cxPropFormData) && !this.isEmptyObj(layoutCompData.cxPropRecordData)) {
			cxPropFormData = layoutCompData.cxPropRecordData;
		}
		layoutCompData.cxPropFormData = cxPropFormData;
		this.setData('cxPropFormData', cxPropFormData);
		this.invokeCruxFormCallBacks({ callbackEventName: 'onInstanceObjKeyCreation', onInstanceObjKeyCreation: { currentInstObjKey } });//no i18n
		if (layoutCompData.cxPropModuleData) {
			this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
			layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
			layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
		}
		if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
			let layoutDetails = (this.getDefaultLayoutDetails(this.data.cxPropModuleData, layoutCompData.cxPropProfileName, layoutCompData.cxPropLayoutId)) || {};
			if (layoutDetails.layoutddValues && layoutDetails.layoutddValues.length) {
				layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
			}
			if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
				layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
			}
			if (!layoutCompData.cxPropLayoutId && layoutDetails.currentLayoutId) {
				layoutCompData.cxPropLayoutId = layoutDetails.currentLayoutId;
			}
		}
		this.setLookupModuleMetaInfo(layoutCompData);
		if (!layoutCompData.hasOwnProperty('cxPropDatePattern') || !layoutCompData.cxPropDatePattern) {
			layoutCompData.cxPropDatePattern = typeof Crm !== "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy";//No I18n
		}
		if (!layoutCompData.hasOwnProperty('cxPropTimeZone') || !layoutCompData.cxPropTimeZone) {
			layoutCompData.cxPropTimeZone = typeof Crm !== "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30";//No I18n
		}
		if (!layoutCompData.hasOwnProperty('cxPropTimeFormat') || !layoutCompData.cxPropTimeFormat) {
			layoutCompData.cxPropTimeFormat = typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : "hh:mm a";//No I18n
		}
		try {
			if (this.isEmptyObj(layoutCompData.originalEntityRecordData) && cxUtilityObj.currentPage !== 'create') {
				let fullFormData = (!this.isEmptyObj(this.data.cxPropRecordData) ? this.data.cxPropRecordData : this.data.cxPropFormData) || {};
				if (!this.isEmptyObj(fullFormData)) {
					layoutCompData.originalEntityRecordData = Lyte.deepCopyObject(fullFormData);
				} else {
					layoutCompData.originalEntityRecordData = {};
				}
			}
		} catch (e) {
			layoutCompData.originalEntityRecordData = {};
		}
		var oncxFormBeforeRenderCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormBeforeRender', onFormBeforeRender: { currentInstObjKey: cxUtilityObj.currentInstObjKey } });//no i18n
		oncxFormBeforeRenderCBResponse.then(() => {
			this.setData('showLoading', false);
			setTimeout(() => {
				this.actual_didConnect();
			}, 0);
		});
	},
	didConnect: function () {
		if (this.data.haveAllDefaultMetaData && !this.data.showLoading) {
			this.actual_didConnect();
		}
	},
	actual_didConnect: function () {
		this.registerUtilityMethods();
		if (!['modal', 'popover'].includes(this.data.cxPropRenderMode)) {
			this.postNodeInsertionHandler();
		}
		var oncxFormAfterRenderCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormAfterRender', onFormAfterRender: { currentInstObjKey: this.data.cxPropLayoutComponentData.cxInternalUtilityObj.currentInstObjKey } });//no i18n
		oncxFormAfterRenderCBResponse.then(function (promiseResponse) {
			var layoutCompData = this.data.cxPropLayoutComponentData, cxPropFormData = layoutCompData.cxPropFormData, layoutFieldApiVsMetaObject = layoutCompData.cxInternalUtilityObj.layoutFieldApiVsMetaObject;
			var currentInstObjKey = layoutCompData.currentInstObjKey,
				mapDependencyFields = layoutCompData.cxInternalUtilityObj.mapDependencyFields || [];
			mapDependencyFields.forEach(function (mapParentField) {
				var fieldApiName = mapParentField, fieldValue = cxPropFormData[mapParentField], fieldMeta = layoutFieldApiVsMetaObject[mapParentField];
				this.setMapDependencyOption({ isInitialRender: true, cxPropFormData, layoutCompData, fieldApiName, fieldValue, fieldMeta, currentInstObjKey });
			}.bind(this));
		}.bind(this));
	},
	postNodeInsertionHandler: function () {
		// this.calculateFieldLabelWidth();
		this.executeLayoutRules();
		let cxFormComp = $L('#cxQuickCreateFormComp')[0];
		if (cxFormComp && cxFormComp.component) {
			cxFormComp.component.updateFormLabelWidth();
		}
	},
	executeLayoutRules: function () {
		let layoutFields = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject,
			currentInstObjKey = this.data.cxPropLayoutComponentData.currentInstObjKey,
			layoutFieldsArr = Object.entries(layoutFields),
			lfLength = layoutFieldsArr.length,
			cruxField;
		for (let k1 = 0; k1 < lfLength; k1++) {
			let currentField = layoutFieldsArr[k1][1];
			if (currentField && currentField[currentInstObjKey] && currentField[currentInstObjKey].isCruxCreateField) {
				cruxField = currentField; break;
			}
		}
		if (cruxField && cruxField[currentInstObjKey]) {
			Lyte.objectUtils(cruxField[currentInstObjKey], "add", 'triggerLayoutRules', !cruxField[currentInstObjKey].triggerLayoutRules);
		}
	},
	didDestroy: function () {
		let layoutCompData = this.data.cxPropLayoutComponentData,
			instDestroyObj = { instanceObjKey: layoutCompData.cxInternalUtilityObj.currentInstObjKey, moduleData: this.data.cxPropModuleData };
		instDestroyObj.moduleSections = this.data.cxPropLayoutSections;
		instDestroyObj.moduleFields = this.data.cxPropModuleData && this.data.cxPropModuleData.fields;
		this.deleteCurrentInstanceObject(instDestroyObj);
	},
	cruxFormOnSubmitWrapper: function (ev) {
		var onBeforeSaveClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormSaveClick', onFormSaveClick: { isEnterKeyPressed: true } });//no i18n
		onBeforeSaveClickCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return;
			} else {
				this.validateAndSaveForm({ callBackDataObject: promiseResponse, event: ev });
			}
		}.bind(this));
	},
	actions: {
		cruxFormOnClick: function (ev, customData) {
			if (customData) {
				customData.setDummyValue = true;
			}
		},
		viewRecord: function (successData) {
			let info = successData && successData.successMessageInfo;
			if (info && info.moduleName && info.recordId) {
				let _parentLyte = window.Lyte,
					detailViewUrl = _parentLyte.Router.getURL({
						route: "crm.tab.module.entity.detail",
						dynamicParams: [
							info.moduleName,
							info.recordId
						]
					});
				networkUtils.openUrl(window.location.origin + detailViewUrl, '_blank'); //No I18N
			}
		},
		cruxFormOnSubmit: function (ev) {
			if (ev) {
				ev.preventDefault();
			}
			setTimeout(() => {
				this.cruxFormOnSubmitWrapper(ev);
			}, 0);
		}
	},
	methods: {
		ltPopoverModalCallBack: function (cbName, isModal) {
			let args = arguments, aLen = args && args.length, newArgsArr = [];
			for (let k = 2; k < aLen; k++) {
				newArgsArr.push(args[k]);
			}
			return this.popoverModalCBWrapper({ cbName, newArgsArr, isModal });
		}
	},
	popoverModalCBWrapper: function (customData) {
		customData = customData || {};
		let cbObject = {
			isPopover: !customData.isModal,
			isModal: customData.isModal,
			callbackEventName: customData.cbName,
			lyteUiCompArgs: customData.newArgsArr
		};
		if (['popoverOnShow', 'modalOnShow'].includes(cbObject.callbackEventName)) {
			this.postNodeInsertionHandler();
		}
		let popoverCBResponse = this.invokeCruxModalPopverCallBacks(cbObject);
		return popoverCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return false;
			}
		}.bind(this));
	},
	calculateFieldLabelWidth: function () {
		let containerValues = ['cxCreateSingleContainer', 'cxCreateContainer1', 'cxCreateContainer2'];
		containerValues.forEach(function (selectors) {
			let actualContentWrapperClass = this.$node.getContentWrapperClass(),
				elementLabelSelectorBase = `.${actualContentWrapperClass}  .${selectors}`,
				elementLabelSelector = `${elementLabelSelectorBase} .cxElementLabel`, elementLabelNode = $L(elementLabelSelector)[0];
			if (!elementLabelNode) {
				elementLabelSelector = `${elementLabelSelectorBase} .cxFieldLabel`;
				elementLabelNode = $L(elementLabelSelector)[0];
			}
			if (elementLabelNode) {
				Lyte.objectUtils(this.data.yieldLayoutGlobalData, "add", `${selectors}fieldLabelWidth`, elementLabelNode.offsetWidth);
				this.data.cxPropLayoutComponentData.yieldLayoutGlobalData = this.data.yieldLayoutGlobalData;
				//Lyte.objectUtils(this.data.cxPropLayoutComponentData.yieldLayoutGlobalData ,"add",`${selectors}fieldLabelWidth`,elementLabelNode.offsetWidth);
			}
		}.bind(this));
	},
	checkAndFetchMetaData: async function (layoutCompData) {
		try {
			let defaultKeysObject = {
				isModuleMetaDataEmpty: 'cxPropModuleData',
				isSectionsMetaDataEmpty: 'cxPropLayoutSections'
			};
			if (layoutCompData.cxPropLayoutRulesRequired || this.data.cxPropLayoutRulesRequired) {
				defaultKeysObject.isLayoutRulesMetaDataEmpty = 'cxPropLayoutRules';
			}
			if (layoutCompData.cxPropValidationRulesRequired || this.data.cxPropValidationRulesRequired) {
				defaultKeysObject.isValidationRulesMetaDataEmpty = 'cxPropValidationRules';
			}
			for (var emptyKey in defaultKeysObject) {
				if (this.isEmptyObj(layoutCompData[defaultKeysObject[emptyKey]])) {
					this.data[emptyKey] = true;
				}
			}
			if (this.data.cxPropRecordId && ['edit', 'clone'].includes(this.data.cxPropCurrentPage) && this.isEmptyObj(layoutCompData.cxPropRecordData)) {
				this.data.isRecordDataEmpty = true;
			}
			let haveAllDefaultMetaData = !this.data.isModuleMetaDataEmpty && !this.data.isSectionsMetaDataEmpty &&
				!this.data.isLayoutRulesMetaDataEmpty && !this.data.isValidationRulesMetaDataEmpty && !this.data.isRecordDataEmpty;
			this.setData('haveAllDefaultMetaData', haveAllDefaultMetaData);//no i18n
			if (haveAllDefaultMetaData) {
				return;
			} else {
				if (this.data.isModuleMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: "Mandatory moduleData / moduleId / moduleApiName for rendering create form is missing/incorrect. If newly created module given, refresh and check once." });//no i18n
				} else if (this.data.isSectionsMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: "Mandatory layoutData / layoutName / layoutId for rendering create form is missing/incorrect" });//no i18n
				} else if (this.data.isRecordDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Mandatory entity record data / entity record id is missing. unable to render the create form.' });//no i18n
				} else if (this.data.isLayoutRulesMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Layout rules is made as mandatory, but mandatory layoutrules meta data is missing. unable to render the create form.' });//no i18n
				} else if (this.data.isValidationRulesMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Validation rules is made as mandatory, but mandatory validationrules meta data is missing. unable to render the create form.' });//no i18n
				}
				return;
			}
			let promiseObj = {};
			if (this.data.isModuleMetaDataEmpty && layoutCompData.cxPropModuleId) {
				promiseObj.moduleDetail = await this.fetchModuleMetaData(layoutCompData.cxPropModuleId);
				if (!promiseObj.moduleDetail) {
					promiseObj.moduleDetail = {};
				}
				if (promiseObj.moduleDetail.success && promiseObj.moduleDetail.success[0]) {
					layoutCompData.cxPropModuleData = promiseObj.moduleDetail.success[0];
					this.data.refetchLayoutMetaData = true;
				} else if (promiseObj.moduleDetail.isExceptionOccured) {
					this.setLayoutComponentError({ isExceptionOccured: true, errorDetails: promiseObj.moduleDetail.moduleFetchException, primaryErrorMessage: 'Exception occured while trying to fetch Module meta data' });//no i18n
				} else if (promiseObj.moduleDetail.failure) {
					this.setLayoutComponentError({ errorDetails: promiseObj.moduleDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Module meta data request' });//no i18n
				}
			}
			if ((this.data.isSectionsMetaDataEmpty || this.data.refetchLayoutMetaData) && !this.isEmptyObj(layoutCompData.cxPropModuleData)) {
				promiseObj.layoutDetail = await this.fetchLayoutMetaData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (!promiseObj.layoutDetail) {
					promiseObj.layoutDetail = {};
				}
				if (promiseObj.layoutDetail && promiseObj.layoutDetail.success && promiseObj.layoutDetail.success[0]) {
					let layoutCacheResponse = promiseObj.layoutDetail.success[0] || {},
						layoutResponse = layoutCacheResponse.layouts && layoutCacheResponse.layouts.filter((f) => { return f.id === promiseObj.layoutDetail.layoutId })[0] || {},
						currentLayoutSections = layoutResponse && layoutResponse.sections || [];
					layoutCompData.cxPropLayoutSections = currentLayoutSections;
					layoutCompData.cxPropLayoutData = layoutResponse;
					layoutCompData.cxPropLayoutId = layoutResponse.id;
				} else if (promiseObj.layoutDetail.isExceptionOccured) {
					this.setLayoutComponentError({ isExceptionOccured: true, errorDetails: promiseObj.layoutDetail.layoutFetchException, primaryErrorMessage: 'Exception occured while trying to fetch Layout meta data' });//no i18n
				} else if (promiseObj.layoutDetail.failure) {
					this.setLayoutComponentError({ errorDetails: promiseObj.layoutDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Layout meta data request' });//no i18n
				}
			}
			if (this.data.isLayoutRulesMetaDataEmpty) {
				promiseObj.layoutRulesDetails = await this.fetchLayoutRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (promiseObj.layoutRulesDetails && promiseObj.layoutRulesDetails.success && promiseObj.layoutRulesDetails.success.layout_rule) {
					layoutCompData.cxPropLayoutRules = promiseObj.layoutRulesDetails.success.layout_rule;
				}
			}
			if (this.data.isValidationRulesMetaDataEmpty) {
				promiseObj.validationRulesDetails = await this.fetchValidationRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (promiseObj.validationRulesDetails && promiseObj.validationRulesDetails.success && promiseObj.validationRulesDetails.success.length) {
					layoutCompData.cxPropValidationRules = promiseObj.validationRulesDetails.success;
				}
			}
			if (this.data.isRecordDataEmpty) {
				promiseObj.recordDataDetails = await this.fetchEntityRecordData(layoutCompData);
				if (promiseObj.recordDataDetails && promiseObj.recordDataDetails.success) {
					let successValue = promiseObj.recordDataDetails.success[0] || promiseObj.recordDataDetails.success;
					layoutCompData.cxPropFormData = successValue;
					if (this.isEmptyObj(successValue)) {
						this.setLayoutComponentError({ primaryErrorMessage: 'Empty response received for GET Entity record request' });//no i18n
					}
				}
			}
			await this.actual_init(layoutCompData.cxPropModuleData, layoutCompData.cxPropLayoutSections);
			await this.actual_didConnect();
		} catch (error) {
			this.setLayoutComponentError({ errorDetails: error, isExceptionOccured: true });
		}
	},
	setLayoutComponentError: function (customData) {
		let layoutCompData = this.data.cxPropLayoutComponentData;
		if (layoutCompData.__isRequestInProgress) {
			return; // to avoid issue when already request in progress(means current error is invalid) -- #Typing fast error with network delay
		}
		customData = customData || {};
		this.setDefautMessageDetails();
		let cxInternalObj = layoutCompData.cxInternalUtilityObj;
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
		let errDetails = (customData.errorDetails || {}), errMessageSecondary;
		if (customData.isExceptionOccured) {
			errMessageSecondary = errDetails.message;
		} else {
			errMessageSecondary = this.isEmptyObj(errDetails) ? '' : (errDetails.message || errDetails.statusText || '');
		}
		finalError = `${customData.primaryErrorMessage || ''}
		
		${errMessageSecondary || ''}`;
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", finalError);//no i18n
		this.setData('showLoading', false);
	},
	getContWrapperClass: function (layoutComponentData) {
		let contentWrapperClass = layoutComponentData.cxInternalUtilityObj.cxCreateFormContentWrapperClass,
			actualContentWrapperClass = contentWrapperClass;
		if (["popover", "modal"].includes(this.data.cxPropRenderMode)) {
			actualContentWrapperClass = `${contentWrapperClass}${this.data.cxPropRenderMode === 'modal' ? '_modal_wc' : '_popover_wc'}`;
		}
		return actualContentWrapperClass;
	},
	setLookupModuleMetaInfo: function (layoutComponentData) {
		let cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			currentViewType = cxUtilityObj.currentViewType;
		cxUtilityObj.lookupModuleMetaInfo = {};
		let requiredModuleIds = [],
			layoutFlds = cxUtilityObj.layoutFieldDatatypeVsMetaObject || {},
			subformFlds = cxUtilityObj.subFormFieldDatatypeVsMetaObject || {};

		function addRequiredLookupModuleIds(lFlds) {
			if (lFlds.lookup && lFlds.lookup.length) {
				lFlds.lookup.forEach((lookupField) => {
					if (lookupField.visible && lookupField.view_type[currentViewType] && lookupField.lookup && lookupField.lookup.module && !requiredModuleIds.includes(lookupField.lookup.module.id)) {
						requiredModuleIds.push(lookupField.lookup.module.id);
					}
				});
			}
		};

		addRequiredLookupModuleIds(layoutFlds);
		for (var subformName in subformFlds) {
			addRequiredLookupModuleIds(subformFlds[subformName]);
		}
		if (typeof store.peekRecord !== 'undefined') {
			requiredModuleIds.forEach((modId) => {
				let modRecord = store.peekRecord('module', modId);
				if (modRecord) {
					cxUtilityObj.lookupModuleMetaInfo[modId] = modRecord;
				} else {
					this.fetchAndSetLookupModuleMeta(cxUtilityObj, modId);
				}
			});
		} else {
			requiredModuleIds.forEach((modId) => {
				if (!cxUtilityObj.lookupModuleMetaInfo[modId]) {
					this.fetchAndSetLookupModuleMeta(cxUtilityObj, modId);
				}
			});
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-entity-date-time-mixin",
		"crux-formula-utils",
		"crux-element-validation",
		"crux-create-validators-mixin",
		"crux-create-requesthandler-mixin",
		"crux-create-ui-handler-utils"
	]
});