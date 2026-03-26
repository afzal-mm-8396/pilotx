Lyte.Component.register("crux-create-subformsection", {
_template:"<template tag-name=\"crux-create-subformsection\" cx-error-focus-class=\"{{subSectionCurntInstObj.errorFocusClass}}\"> <crux-subform cx-prop-type=\"{{expHandlers(expHandlers(cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType,'===','quick_create'),'?:','create',cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType)}}\" cx-prop-section=\"{{cxPropSubformSection}}\" cx-prop-content=\"{{cxPropFormData}}\" cx-prop-limit-rows=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropLimitRows}}\" cx-prop-show-filter-icon=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropShowFilterIcon}}\" cx-prop-show-add-row-button=\"{{expHandlers(expHandlers(subSectionCurntInstObj.cruxSubformProperties.cxPropShowAddRowButton,'===',false),'?:',false,true)}}\" cx-prop-show-delete-row-button=\"{{expHandlers(expHandlers(subSectionCurntInstObj.cruxSubformProperties.cxPropShowDeleteRowButton,'===',false),'?:',false,true)}}\" cx-prop-show-scroll-to-top=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropShowScrollToTop}}\" on-value-change=\"{{method('subformValueChange')}}\" cx-prop-currency-data=\"{{cxPropLayoutComponentData.cxPropCurrencyData}}\" disable-error-callback=\"true\" fetch-records=\"{{method('cxSubformfetchLookupRecords')}}\" on-subform-error=\"{{method('onCxSubformError')}}\" cx-prop-phone-properties=\"{{subSectionCurntInstObj.subformPhoneProps}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" disable-criteria=\"true\" cx-prop-prevent-focus-on-error=\"{{subSectionCurntInstObj.preventFocusOnError}}\" cx-prop-lookup-properties=\"{{subSectionCurntInstObj.cruxSubformLookupProps}}\" cx-prop-disable-delete=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.deletable,'!'),false)}}\" cx-prop-disable-edit=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.editable,'!'),false)}}\" cx-prop-disable-create=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.creatable,'!'),false)}}\" cx-prop-module-sections=\"{{cxPropLayoutComponentData.cxPropLayoutSections}}\"> <template is=\"yield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{isQuickCreateSupported(cxPropLayoutComponentData,fieldObj,cxPropLayoutComponentData.subformConfigurations[subformApiname])}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" data-zcqa=\"btn_Lookup_CreateNewRecord\" lt-prop-class=\"outlineprimaryflat mR0\" class=\"pR\" onclick=\"{{action('openQuickCreateForm',true,true,fieldObj,cruxLookupElmId,subSectionCurntInstObj,recordObj)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[fieldObj.lookup.module.id].singular_label}} </template> </lyte-button> </template></template> </template> <template is=\"yield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{isQuickCreateSupported(cxPropLayoutComponentData,fieldObj,cxPropLayoutComponentData.subformConfigurations[subformApiname])}}\"><template case=\"true\"> <div class=\"dropFooterList\" data-zcqa=\"AddNewRecord\" onclick=\"{{action('openQuickCreateForm',false,true,fieldObj,cruxLookupElmId,subSectionCurntInstObj,recordObj)}}\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[fieldObj.lookup.module.id].singular_label}} </div> </template></template> </template> <template is=\"yield\" yield-name=\"body-customFieldYieldContent\"> <template is=\"if\" value=\"{{fieldObj[instanceObjKey].customFieldComponentData.isCruxComponent}}\"><template case=\"true\"> <template is=\"component\" class=\"cxSubformField\" cx-prop-field=\"{{fieldObj}}\" component-name=\"{{fieldObj[instanceObjKey].customFieldComponentData.componentName}}\" cx-prop=\"{{fieldObj[instanceObjKey].customFieldComponentData.cxPropData}}\"> </template> </template></template> </template> </crux-subform> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropModuleData","cxPropFormData","cxPropSubformSection","subSectionCurntInstObj","subformApiname","currentPage","subformLookupProps","currentInstObjKey"],
_observedAttributesType :["object","string","object","object","object","object","string","string","object","string"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropSubformSection: Lyte.attr('object', { 'default': {} }),//no i18n
			subSectionCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			subformApiname: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			currentPage: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			subformLookupProps: Lyte.attr("object", { "default": {} }), //no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true })//no i18n
		}
	},
	init: function () {
		let layoutComponentData = this.data.cxPropLayoutComponentData, cxPropSubFormSecData = this.data.cxPropSubformSection,
			currentInstObjKey = layoutComponentData.currentInstObjKey;
		this.setData({
			'currentInstObjKey': currentInstObjKey || "",
			'cxPropFormData': layoutComponentData.cxPropFormData,
			'currentPage': layoutComponentData.cxInternalUtilityObj.currentPage
		});
		if (currentInstObjKey && !Object.keys(this.data.subSectionCurntInstObj || {}).length) {
			if (!Object.keys(cxPropSubFormSecData[currentInstObjKey] || {}).length) {
				cxPropSubFormSecData[currentInstObjKey] = {};
			}
			this.setData('subSectionCurntInstObj', cxPropSubFormSecData[currentInstObjKey]);
		}
		var subSectionCurntInstObj = this.data.subSectionCurntInstObj, instanceObjKeys = ["display_label", "tab_traversal", "properties", "name", "column_count", "api_name"], instanceObjKeysLen = instanceObjKeys.length;
		subSectionCurntInstObj.cruxSubformProperties = (layoutComponentData.cxPropSubformProperties || {});
		subSectionCurntInstObj.preventFocusOnError = true;
		for (var n = 0; n < instanceObjKeysLen; n++) {
			var fieldProp = instanceObjKeys[n];
			if (!subSectionCurntInstObj.hasOwnProperty(fieldProp)) {
				subSectionCurntInstObj[fieldProp] = typeof subSectionCurntInstObj[fieldProp] === 'object' && subSectionCurntInstObj[fieldProp] ? Lyte.deepCopyObject(cxPropSubFormSecData[fieldProp]) : cxPropSubFormSecData[fieldProp];
			}
		}
		subSectionCurntInstObj.subformPhoneProps = {};
		if (subSectionCurntInstObj.cruxSubformProperties && subSectionCurntInstObj.cruxSubformProperties.hasOwnProperty('enableCountryCode')) {
			Lyte.Component.set(subSectionCurntInstObj.subformPhoneProps, 'enableCountryCode', subSectionCurntInstObj.cruxSubformProperties.enableCountryCode);
		} else {
			Lyte.Component.set(subSectionCurntInstObj.subformPhoneProps, 'enableCountryCode', false);
		}
		var cxPropFormData = this.data.cxPropFormData;
		this.setData('subformApiname', subSectionCurntInstObj.subform_apiname || "");//no i18n
		this.setData('id', `cxCreateSubform_${this.data.subformApiname}`);//no i18n
		if (subSectionCurntInstObj.subform_apiname && !subSectionCurntInstObj.cruxSubformProperties.isSubformRecordSupported) {
			var subformRecords = cxPropFormData[subSectionCurntInstObj.subform_apiname];
			if ((!subformRecords || !subformRecords.length)) {
				cxPropFormData[subSectionCurntInstObj.subform_apiname] = [];
				cxPropFormData[subSectionCurntInstObj.subform_apiname].push({});
			}
		}
		subSectionCurntInstObj.subformPermissions = layoutComponentData.subformPermissions && layoutComponentData.subformPermissions[this.data.subformApiname] || {};
		if (subSectionCurntInstObj.subformPermissions && subSectionCurntInstObj.subformPermissions.subformPermissionMessage) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.subformPermissionMessage = subSectionCurntInstObj.subformPermissions.subformPermissionMessage;
			existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
		}
		if (subSectionCurntInstObj.isMandatorySubform) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.isMandatorySubform = true;
			existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
			Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryStyle', 'red_accent_line');//no i18n
		}
		this.setLookupIconClass();
		let currentSubformDetails = layoutComponentData.cxInternalUtilityObj.subFormFieldApiVsMetaObject && layoutComponentData.cxInternalUtilityObj.subFormFieldApiVsMetaObject[this.data.subformApiname] || {};
		for (let fieldApiName in currentSubformDetails) {
			let customCompFields = layoutComponentData.customFieldComponents || {},
				isCustomComponentPresent, customFieldComponentData,
				supportedProperties = ['data_type', 'ui_type', 'column_name', 'api_name'],
				sLen = supportedProperties.length,
				fieldMetaProperty,
				fieldData = currentSubformDetails[fieldApiName],
				sfieldCurntInstObj = fieldData[currentInstObjKey] || {};
			if (customCompFields && !this.isEmptyObj(customCompFields)) {
				for (let s = 0; s < sLen; s++) {
					currentProperty = supportedProperties[s];
					if (customCompFields[currentProperty] && typeof customCompFields[currentProperty] === 'object' && customCompFields[currentProperty].hasOwnProperty(fieldData[currentProperty])) {
						isCustomComponentPresent = true;
						customFieldComponentData = customCompFields[currentProperty][fieldData[currentProperty]];
						fieldMetaProperty = currentProperty;
						break;
					}
				}
			}
			if (isCustomComponentPresent && customFieldComponentData && fieldMetaProperty) {
				sfieldCurntInstObj.isCustomComponentPresent = true;
				sfieldCurntInstObj.customFieldComponentData = customCompFields[fieldMetaProperty][fieldData[fieldMetaProperty]];
				fieldData.yieldName = 'customFieldYieldContent';//no i18n
			}
		}
	},
	setLookupIconClass: function () {
		let currentSubformDetails = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.subFormFieldDatatypeVsMetaObject[this.data.subformApiname];
		let existingProps = (this.data.subSectionCurntInstObj.cruxSubformLookupProps || {});
		if (currentSubformDetails) {
			if (currentSubformDetails.lookup && currentSubformDetails.lookup.length) {
				currentSubformDetails.lookup.forEach((lookupField) => {
					if (!existingProps[lookupField.api_name]) {
						existingProps[lookupField.api_name] = {};
					}
					existingProps[lookupField.api_name].iconClass = `${this.getLookupIconClass(lookupField)} cxSprite`;
					existingProps[lookupField.api_name].searchFormat = true;
				});
			}
		}
		Lyte.Component.set(this.data.subSectionCurntInstObj, 'cruxSubformLookupProps', existingProps);//no i18n
	},
	didConnect: function () {
		let subSectionCurntInstObj = this.data.subSectionCurntInstObj, cruxSubformNode = this.$node.querySelector('crux-subform');//no i18n
		if (cruxSubformNode && cruxSubformNode.evaluateModuleFormula) {
			subSectionCurntInstObj.evaluateModuleFormula = function (apiName) {
				cruxSubformNode.evaluateModuleFormula(apiName);
			}.bind(this);
		}
	},
	methods: {
		subformValueChange: function (apiName, rowId, componentName, value, element) {
			let cbObject = {
				apiName, rowId,
				componentName, value, element,
				cxPropFormData: this.data.cxPropFormData,
				subformApiname: this.data.subformApiname
			};
			var onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onSubformValueChange', onSubformValueChange: cbObject });//no i18n
			onValueChangeCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				}
			});
		},
		cxSubformfetchLookupRecords: function (moduleId, queryParams, fieldMeta) {
			return this.invokeCruxFormCallBacks({ callbackEventName: 'fetchLookupRecords', fetchLookupRecords: { moduleId, queryParams, fieldMeta } });//no i18n
		},
		onCxSubformError: function (errorObj) {
			errorObj = errorObj || {};
			let { cxMandatorySubformError, cxApiName, cxRowId, cxErrorNode } = errorObj,
				subSectionCurntInstObj = this.data.subSectionCurntInstObj;
			if (cxMandatorySubformError && subSectionCurntInstObj.isMandatorySubform) {
				this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
				let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
				existingYieldData.isMandatorySubform = true;
				existingYieldData.isSubformSection = true;
				Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
				Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryError', true);//no i18n
				Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryStyle', 'red_accent_line');//no i18n
			}
			if (cxApiName) {
				subSectionCurntInstObj.latestSubformError = { cxApiName, cxRowId, cxErrorNode };
			}
		}
	},
	clearMandatorySubformError: function () {
		let subSectionCurntInstObj = this.data.subSectionCurntInstObj;
		if (subSectionCurntInstObj.isMandatorySubform) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.isMandatorySubform = true; existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
			Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryError', false);//no i18n
		}
	},
	//subform Instance Object - Observers - Start
	observeTooltipValueChange: function () {
		this.clearMandatorySubformError();
	}.observes('subSectionCurntInstObj.toggleMandatorySubformError')//no i18n
	//subform Instance Object - Observers - End
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-create-formcallbacks-mixin"
	]
});