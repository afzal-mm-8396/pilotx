Lyte.Component.register("crux-create-field", {
_template:"<template tag-name=\"crux-create-field\" data-cy=\"{{cxPropFieldData.api_name}}\" cx-error-focus-class=\"{{fieldCurntInstObj.errorFocusClass}}\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropFieldData.field_label}} <div class=\"cxLoadOnViewLoader\"></div> </div> <div class=\"cxLoadOnViewValue\"> {{cxPropFormData[cxPropFieldData.api_name]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div style=\"{{cxHelperGetNodeDisplayValue(fieldCurntInstObj.view_type[cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType],'field',fieldCurntInstObj.isHiddenInLayoutRules,fieldCurntInstObj.isCustomHidden)}}\" class=\"cruxFormFieldParentContainer\"> <template is=\"if\" value=\"{{isCustomComponentPresent}}\"><template case=\"true\"> <div class=\"{{expHandlers(isFirstNameField,'?:','cxFormFirstNameDiv cxcreateFormComponentRow','')}}\" lt-prop-tooltip-class=\"lcreateTooltip\" lt-prop-appearance=\"box\" lt-prop-title=\"{{fieldCurntInstObj.staticTooltipValue}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;,&quot;hidedelay&quot; : &quot;50&quot;}\" id=\"{{concat(fldId,'_FValue')}}\"> <template is=\"if\" value=\"{{customFieldComponentData.skipFieldLabel}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" component-data=\"{{customFieldComponentData.componentData}}\" form-data=\"{{cxPropFormData}}\" field-instance-details=\"{{fieldCurntInstObj}}\" field-meta=\"{{cxPropFieldData}}\" on-value-change=\"{{method('customCompValueChange',cxPropFieldData.api_name)}}\" get-init-component-data=\"{{method('getCustomComponentInitData',customFieldComponentData)}}\"> </template> </template><template case=\"false\"> <div class=\"cxcreateFormComponentRow cruxFormComponentRow\"> <div class=\"cxElementLabel\">{{cxPropFieldData.field_label}}</div> <div class=\"cxElementValue\"> <template is=\"if\" value=\"{{customFieldComponentData.isCruxComponent}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" cx-prop-field=\"{{cxPropFieldData}}\" cx-prop=\"{{customFieldComponentData.cxPropData}}\"> </template> </template><template case=\"false\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" component-data=\"{{customFieldComponentData.componentData}}\" form-data=\"{{cxPropFormData}}\" field-meta=\"{{cxPropFieldData}}\" on-value-change=\"{{method('customCompValueChange',cxPropFieldData.api_name)}}\" get-init-component-data=\"{{method('getCustomComponentInitData',customFieldComponentData)}}\"> </template> </template></template> </div> </div> </template></template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{fieldCurntInstObj.fieldHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldHeaderYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> <div class=\"{{expHandlers(isFirstNameField,'?:','cxFormFirstNameDiv cxcreateFormComponentRow cruxFormComponentRow','')}}\" lt-prop-tooltip-class=\"lcreateTooltip\" lt-prop-appearance=\"box\" lt-prop-title=\"{{fieldCurntInstObj.staticTooltipValue}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;,&quot;hidedelay&quot; : &quot;50&quot;}\" id=\"{{concat(fldId,'_FValue')}}\"> <template is=\"if\" value=\"{{isFirstNameField}}\"><template case=\"true\"> <div class=\"cxElementLabel\">{{cxPropFieldData.field_label}}</div> <div class=\"{{cxSalutationFieldClasss}} cxElementValue\"> <crux-picklist-component on-value-change=\"{{method('salutationValueChange',fieldCurntInstObj.salutationFieldData.fieldMeta.api_name)}}\" cx-prop-from=\"{{fieldCurntInstObj.cxPropFrom}}\" cx-prop-id=\"{{salutationFldCurntInstObj.cxPropId}}\" cx-prop-zcqa=\"{{unbound(salutationFldCurntInstObj.fieldZcqaValue)}}\" cx-prop-option-info-tooltip=\"{{salutationFldCurntInstObj.optionInfoTooltip}}\" cx-prop-dropdown-zcqa=\"{{unbound(salutationFldCurntInstObj.fieldZcqaValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxSalutationFldDisplayValue}}\" cx-prop-field=\"{{fieldCurntInstObj.salutationFieldData.fieldMeta}}\"> </crux-picklist-component> <template is=\"component\" component-name=\"crux-{{fieldCurntInstObj.cruxType}}-component\" cx-prop-tooltip-class=\"lcreateTooltip\" cx-prop-id=\"{{fieldCurntInstObj.cxPropId}}\" cx-prop-dropdown-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tooltip=\"{{fieldCurntInstObj.staticTooltipValue}}\" cx-prop-info-tooltip=\"{{fieldCurntInstObj.infoTooltipValue}}\" cx-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;}\" cx-prop-freeze=\"false\" cx-prop-clear-error-message=\"false\" cx-prop-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tab-index=\"{{fieldCurntInstObj.tab_index}}\" cx-prop-autofocus=\"{{isAutofocusfield}}\" cx-prop-placeholder=\"{{if(shownonePlaceholder,cruxGetI18n('crm.label.picklist.none'),fieldCurntInstObj.placeholderValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxFieldDisplayValue}}\" id=\"{{unbound(fldId)}}\" cx-prop-disabled=\"{{fieldCurntInstObj.disabled}}\" cx-prop-readonly=\"{{fieldCurntInstObj.read_only}}\" class=\"{{cxHelpgetCruxComponentTemplateClass(cxPropFieldData,cxPropFormData[cxPropFieldData.api_name])}}\" cx-prop-maxlength=\"{{fieldCurntInstObj.length}}\" cx-prop-from=\"{{fieldCurntInstObj.cxPropFrom}}\" cx-prop-field=\"{{cxPropFieldData}}\" on-value-change=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" cx-prop-type=\"{{fieldCurntInstObj.cxPropType}}\" cx-prop-error-message=\"{{fieldCurntInstObj.errorMesage}}\" cx-prop-mandatory=\"{{fieldCurntInstObj.required}}\" cx-prop-disable-extra-value=\"true\" cx-prop-appearance=\"box\" cx-prop-error-yield=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\" on-error=\"{{method('onCruxElementValueError')}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-enable-lbind=\"false\"> </template> </div> </template><template case=\"false\"> <template is=\"component\" component-name=\"crux-{{fieldCurntInstObj.cruxType}}-component\" cx-prop-module=\"{{expHandlers(cxPropFieldData.lookup.module.api_name,'||',cxPropModuleData.module_name)}}\" cx-prop-icon-class=\"{{fieldCurntInstObj.lookupIconClass}} cxSprite\" fetch-module-data=\"{{method('fetchModuleData',cxPropFieldData)}}\" fetch-records=\"{{method('cxfetchLookupRecords',cxPropFieldData)}}\" cx-prop-currency-code=\"{{cxPropLayoutComponentData.cxPropCurrencyKey}}\" cx-prop-currency-details=\"{{cxPropLayoutComponentData.cxPropUserCurrencyData}}\" cx-prop-show-calculator=\"{{fieldCurntInstObj.showCalculator}}\" cx-prop-date-pattern=\"{{cxPropLayoutComponentData.cxPropDatePattern}}\" cx-prop-time-zone=\"{{cxPropLayoutComponentData.cxPropTimeZone}}\" cx-prop-time-format=\"{{cxPropLayoutComponentData.cxPropTimeFormat}}\" cx-prop-is-color-code-enabled=\"{{fieldCurntInstObj.enable_colour_code}}\" cx-prop-tooltip-class=\"lcreateTooltip\" cx-prop-tooltip=\"{{fieldCurntInstObj.staticTooltipValue}}\" cx-prop-info-tooltip=\"{{fieldCurntInstObj.infoTooltipValue}}\" cx-prop-id=\"{{fieldCurntInstObj.cxPropId}}\" cx-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;}\" cx-prop-freeze=\"false\" cx-prop-clear-error-message=\"false\" cx-prop-dropdown-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-picklist-values=\"{{fieldCurntInstObj.pick_list_values}}\" on-before-show=\"{{method(&quot;dropdownBeforeShow&quot;)}}\" cx-prop-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tab-index=\"{{fieldCurntInstObj.tab_index}}\" cx-prop-autofocus=\"{{isAutofocusfield}}\" cx-prop-placeholder=\"{{if(shownonePlaceholder,cruxGetI18n('crm.label.picklist.none'),fieldCurntInstObj.placeholderValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxFieldDisplayValue}}\" id=\"{{unbound(fldId)}}\" cx-prop-disabled=\"{{fieldCurntInstObj.disabled}}\" cx-prop-readonly=\"{{fieldCurntInstObj.read_only}}\" class=\"{{cxHelpgetCruxComponentTemplateClass(cxPropFieldData,cxPropFormData[cxPropFieldData.api_name])}}\" cx-prop-maxlength=\"{{fieldCurntInstObj.length}}\" cx-prop-from=\"{{unbound(fieldCurntInstObj.cxPropFrom)}}\" cx-prop-field=\"{{cxPropFieldData}}\" cx-prop-max-limit=\"{{fieldCurntInstObj.maxLimit}}\" on-value-change=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" before-request-change-data=\"{{method('onLookupBeforeRequestChangeData')}}\" on-clear=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" max-user-drop-limit-err=\"{{method('onUserMaxLimiError')}}\" cx-prop-type=\"{{fieldCurntInstObj.cxPropType}}\" cx-prop-return-full-object-on-get=\"true\" cx-prop-create-yield=\"{{showQuickCreateButton}}\" cx-prop-footer-yield=\"{{showQuickCreateButton}}\" cx-prop-default-fields=\"{{fieldCurntInstObj.fieldOfLookupFields}}\" cx-prop-error-message=\"{{fieldCurntInstObj.errorMesage}}\" cx-prop-mandatory=\"{{fieldCurntInstObj.required}}\" cx-prop-disable-extra-value=\"true\" on-show=\"{{method('cruxOpenDropdown')}}\" on-hide=\"{{method(&quot;commonDropDownOnHide&quot;)}}\" cx-prop-appearance=\"box\" cx-prop-input-appearance=\"box\" cx-prop-field-key=\"{{unbound(fieldCurntInstObj.cruxFieldKey)}}\" cx-prop-filterable=\"false\" cx-prop-date-in-user-pattern=\"true\" cx-prop-datetime-in-user-pattern=\"true\" cx-prop-min-date=\"{{expHandlers(fieldCurntInstObj.min_date,'||','')}}\" cx-prop-max-date=\"{{expHandlers(fieldCurntInstObj.max_date,'||','')}}\" cx-prop-start-time=\"{{expHandlers(fieldCurntInstObj.start_time,'||','')}}\" cx-prop-end-time=\"{{expHandlers(fieldCurntInstObj.end_time,'||','')}}\" cx-prop-option-info-tooltip=\"{{fieldCurntInstObj.optionInfoTooltip}}\" on-error=\"{{method('onCruxElementValueError')}}\" cx-prop-related-name=\"{{fieldCurntInstObj.relatedRecordName}}\" cx-prop-related-module-id=\"{{fieldCurntInstObj.relatedRecordModuleId}}\" cx-prop-related-id=\"{{fieldCurntInstObj.relatedRecordId}}\" cx-prop-dont-show-related-dropdown=\"{{fieldCurntInstObj.dontShowRelatedDropdown}}\" cx-prop-search-format=\"true\" cx-prop-is-display-format-enabled=\"{{fieldCurntInstObj.isDisplayFormatEnabled}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-enable-country-code=\"{{fieldCurntInstObj.isPhoneNoNewView}}\" cx-prop-error-yield=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\" cx-prop-enable-lbind=\"false\" cx-prop-text-area-resize=\"{&quot;horizontal&quot; : false, &quot;vertical&quot; : true }\"> <template is=\"registerYield\" yield-name=\"errorYield\"> <template is=\"if\" value=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldErrorYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yield-data-object=\"{{fieldCurntInstObj.yieldDataObject}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> </template> <template is=\"registerYield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{showQuickCreateButton}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" data-zcqa=\"btn_Lookup_CreateNewRecord\" lt-prop-class=\"outlineprimaryflat mR0\" class=\"pR\" onclick=\"{{action('openQuickCreateForm',true)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[cxPropFieldData.lookup.module.id].singular_label}} </template> </lyte-button> </template></template> </template> <template is=\"registerYield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{showQuickCreateButton}}\"><template case=\"true\"> <div class=\"dropFooterList\" data-zcqa=\"AddNewRecord\" onclick=\"{{action('openQuickCreateForm',false)}}\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[cxPropFieldData.lookup.module.id].singular_label}} </div> </template></template> </template> </template> </template></template> </div> <template is=\"if\" value=\"{{fieldCurntInstObj.fieldFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldFooterYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> </template></template> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"text","position":[2,1,1]},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxHelperGetNodeDisplayValue","args":["fieldCurntInstObj.view_type[cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType]","'field'","fieldCurntInstObj.isHiddenInLayoutRules","fieldCurntInstObj.isCustomHidden"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"component","position":[3,3],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]}]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropLayoutComponentData","cxPropModuleData","instanceObjKey","cxPropFieldSection","cxPropFieldData","cxPropFormData","fieldCurntInstObj","salutationFldCurntInstObj","yieldGlobalData","isCustomComponentPresent","isFirstNameField","showQuickCreateButton","customFieldComponentData","currentInstObjKey","containerName","cxSalutationFieldClasss","lyteViewPort"],
_observedAttributesType :["object","object","string","object","object","object","object","object","object","boolean","boolean","boolean","object","string","string","string","boolean"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropFieldSection: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFieldData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			fieldCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			salutationFldCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			yieldGlobalData: Lyte.attr("object", { "default": {} }), //no i18n
			isCustomComponentPresent: Lyte.attr("boolean", { "default": false }),//no i18n
			isFirstNameField: Lyte.attr("boolean", { "default": false }),//no i18n
			showQuickCreateButton: Lyte.attr("boolean", { "default": false }),//no i18n
			customFieldComponentData: Lyte.attr("object", { "default": {} }), //no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			containerName: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxSalutationFieldClasss: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			lyteViewPort: Lyte.attr("boolean", { "default": false })//no i18n
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropFieldData = this.data.cxPropFieldData, fieldUiType = cxPropFieldData.ui_type;
		var cxInternalUtilityObject = layoutComponentData.cxInternalUtilityObj || {};
		var currentInstObjKey = cxInternalUtilityObject && cxInternalUtilityObject.currentInstObjKey;
		this.setData('currentInstObjKey', currentInstObjKey || "");
		this.setData('cxPropFormData', layoutComponentData.cxPropFormData);
		if (cxInternalUtilityObject) {
			if (!cxInternalUtilityObject.layoutFieldApiVsSectionMeta) {
				cxInternalUtilityObject.layoutFieldApiVsSectionMeta = {};
			}
			cxInternalUtilityObject.layoutFieldApiVsSectionMeta[cxPropFieldData.api_name] = this.data.cxPropFieldSection;
		}
		if (currentInstObjKey && !Object.keys(this.data.fieldCurntInstObj || {}).length) {
			if (!Object.keys(cxPropFieldData[currentInstObjKey] || {}).length) {
				cxPropFieldData[currentInstObjKey] = {};
			}
			this.setData('fieldCurntInstObj', cxPropFieldData[currentInstObjKey]);
		}
		var fieldCurntInstObj = this.data.fieldCurntInstObj, selectedLayoutid = layoutComponentData.cxPropLayoutId;
		fieldCurntInstObj.cxPropFrom = 'create';
		fieldCurntInstObj.isCruxCreateField = true;
		if (['edit', 'clone'].includes(cxInternalUtilityObject.currentPage) && cxPropFieldData.columnName === "LAYOUTID") {
			fieldCurntInstObj.cxPropFrom = 'view';
		}
		if (cxPropFieldData[selectedLayoutid]) {
			var layoutSpecificProp = cxPropFieldData[selectedLayoutid];
			layoutSpecificProp = layoutSpecificProp || {};
			for (var prop in layoutSpecificProp) {
				if (!fieldCurntInstObj.hasOwnProperty(prop)) {
					fieldCurntInstObj[prop] = layoutSpecificProp[prop];
					if (prop === 'pick_list_values') {
						fieldCurntInstObj.originalPickListValues = Lyte.deepCopyObject(fieldCurntInstObj[prop]);
					} else if (prop === 'required' && layoutSpecificProp[prop]) {
						fieldCurntInstObj.isMandatoryByDefault = true;
					}
				}
			}
		}
		if (cxPropFieldData.read_only) {
			fieldCurntInstObj.isReadonlyByDefault = true;
		}
		if (!cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name]) {
			cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name] = {};
		}
		var class_list = this.getData('class');//no i18n
		class_list = class_list ? class_list : "";//No i18N
		let idclassObject = this.getFieldIdClassValues();
		let className = idclassObject.class, idName = idclassObject.id;
		fieldCurntInstObj.cxPropId = idName;
		class_list += (' ' + className);
		fieldCurntInstObj.fieldCompSelectorValue = '.' + className;
		this.setData('class', class_list);//No i18N
		var fieldListRequiredProperty = {
			mandatory: 'required', fieldLength: 'length', fieldId: 'id', fieldDataType: 'data_type',
			fieldUiType: 'ui_type', displayLabel: 'display_label', fieldLabel: 'field_label', isCustomField: 'custom_field',
			columnName: 'column_name', decimalPlace: 'decimal_place', json_type: 'json_type', lyteAtrrType: 'json_type'
		}
		for (var key in fieldListRequiredProperty) {
			cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = cxPropFieldData[fieldListRequiredProperty[key]];
			if (key === "lyteAtrrType") {
				switch (cxPropFieldData[fieldListRequiredProperty[key]]) {
					case 'double':
					case 'integer':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "string";//no i18n
						break;
					case 'jsonobject':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "object";//no i18n
						break;
					case 'jsonarray':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "array";//no i18n
						break;
				}
				if (cxPropFieldData.ui_type === 208 && key === 'lyteAtrrType') {
					cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "object";//no i18n
				}
			}
		}
		this.addCustomValidationsforField({ formFieldList: cxInternalUtilityObject.formFieldList, cxPropFieldData });
		var instanceObjKeys = ["required", "read_only", "view_type", "tab_index", "length", "visible", "decimal_place", "tooltip"], instanceObjKeysLen = instanceObjKeys.length;
		for (var n = 0; n < instanceObjKeysLen; n++) {
			var fieldProp = instanceObjKeys[n];
			if (!fieldCurntInstObj.hasOwnProperty(fieldProp)) {
				let _value = cxPropFieldData[fieldProp];
				if (cxPropFieldData.ui_type === 208 && fieldProp === 'read_only' && ['clone', 'edit'].includes(cxInternalUtilityObject.currentPage)) {
					_value = true;
				}
				fieldCurntInstObj[fieldProp] = typeof _value === 'object' && _value ? Lyte.deepCopyObject(_value) : _value;
			}
		}
		/**
		 *  --> commented to fix the lock-icon not showing for read-only fields
			if (!fieldCurntInstObj.hasOwnProperty('disabled')) {
				fieldCurntInstObj.disabled = fieldCurntInstObj.read_only;
			}
		*/
		var cxPropFormData = layoutComponentData.cxPropFormData;
		//setting Default value in record - for picklist,multi-select picklist
		if (cxPropFieldData.data_type === "picklist" || cxPropFieldData.data_type === "multiselectpicklist") {
			var finalPicklistObj = this.getMapDependencyOptions({ layoutComponentData, cxPropFieldData });
			fieldCurntInstObj.mapDependencyDetails = finalPicklistObj.mapDependencyDetails;
			fieldCurntInstObj.enable_colour_code = cxPropFieldData.enable_colour_code;
			if (!layoutComponentData.cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
				if (cxPropFieldData.data_type === "picklist") {
					var otherValue = (fieldCurntInstObj.pick_list_values && fieldCurntInstObj.pick_list_values[0] && fieldCurntInstObj.pick_list_values[0].display_value) || '-None-';
					if (cxPropFieldData.column_name === 'CURRENCYISOCODE' && layoutComponentData.cxPropCurrencyKey) {
						let currencyValues = fieldCurntInstObj.pick_list_values || [],
							keyMap = currencyValues.map(pl => { return pl.display_value; });
						if (keyMap.indexOf(layoutComponentData.cxPropCurrencyKey) !== -1) {
							otherValue = layoutComponentData.cxPropCurrencyKey;
						}
					}
					cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value ? fieldCurntInstObj.default_value : otherValue;
				} else {
					cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value ? [fieldCurntInstObj.default_value] : [];
				}
			}
		}
		if (cxPropFieldData.data_type === "lookup") {
			let fieldOfLookupDetails = cxInternalUtilityObject.fieldOfLookupDetails || {};
			if (fieldOfLookupDetails.hasOwnProperty(cxPropFieldData.api_name)) {
				let detailsArray = fieldOfLookupDetails[cxPropFieldData.api_name] || [],
					apiArray = detailsArray.map((flds) => {
						return flds.lookupModuleMapField.api_name;
					});
				fieldCurntInstObj.fieldOfLookupFields = { api_names: apiArray };
			}
		}
		fieldCurntInstObj.lookupIconClass = this.getLookupIconClass(cxPropFieldData);
		let customCompFields = layoutComponentData.customFieldComponents || {},
			isCustomComponentPresent, customFieldComponentData,
			supportedProperties = ['data_type', 'ui_type', 'column_name', 'api_name'],
			sLen = supportedProperties.length,
			fieldMetaProperty;
		if (customCompFields && !this.isEmptyObj(customCompFields)) {
			for (let s = 0; s < sLen; s++) {
				let currentProperty = supportedProperties[s];
				if (customCompFields[currentProperty] && typeof customCompFields[currentProperty] === 'object' && customCompFields[currentProperty].hasOwnProperty(cxPropFieldData[currentProperty])) {
					isCustomComponentPresent = true;
					customFieldComponentData = customCompFields[currentProperty][cxPropFieldData[currentProperty]];
					fieldMetaProperty = currentProperty;
					break;
				}
			}
		}
		if (isCustomComponentPresent && customFieldComponentData && fieldMetaProperty) {
			this.setData('isCustomComponentPresent', true);
			this.setData('customFieldComponentData', customCompFields[fieldMetaProperty][cxPropFieldData[fieldMetaProperty]]);
		}
		if (this.data.containerName) {
			this.data.yieldGlobalData.containerName = this.data.containerName;
		}
		//set default value for owner field
		if (cxInternalUtilityObject.currentPage === 'create' && cxPropFieldData.ui_type === 8 && !cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			var userDetails = layoutComponentData.userDetails || {};
			if (!this.isEmptyObj(userDetails)) {
				var userObj = { id: userDetails.USER_ID, name: userDetails.DISPLAY_NAME };
				cxPropFormData[cxPropFieldData.api_name] = userObj;
			}
		}
		//set default value for checkbox field
		if (!cxPropFormData.hasOwnProperty(cxPropFieldData.api_name) && cxInternalUtilityObject.currentPage !== 'edit' && cxPropFieldData.data_type === "boolean" && fieldCurntInstObj.default_value) {
			cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value;
		}
		if (['phone'].includes(cxPropFieldData.data_type)) {
			let isPhoneNoNewView = typeof Crm !== "undefined" && Crm.userDetails ? Crm.userDetails.isPhoneNoNewView : false;
			fieldCurntInstObj.isPhoneNoNewView = isPhoneNoNewView;
		}
		this.setExchangeRateValue({ cxPropFormData, currencyDetail: layoutComponentData.cxPropCurrencyData, cxPropFieldData });
		this.setErrorDetailsInDom();
		this.setFieldValueInDom();
		this.setSalutationFieldData();
		this.setFieldTooltipValues();
		//better to call it at the end of the init
		this.setFieldSpecificConfigs();
	},
	methods: {
		// Functions which can be used as callback in the component.
		cruxValueChange: function (fieldApiName, fieldValue) {
			this.cxValueChange(fieldApiName, fieldValue);
		},
		salutationValueChange: function (fieldApiName, fieldValue) {
			var cxPropFormData = this.data.cxPropFormData;
			Lyte.Component.set(cxPropFormData, fieldApiName, fieldValue);
			//callback to the user on field value change
			let cbObject = {
				fieldApiName,
				fieldValue,
				cxPropFormData,
				fieldMeta: this.data.cxPropFieldData
			},
				onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormValueChange', onFormValueChange: cbObject });//no i18n
			onValueChangeCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				}
			});
		},
		customCompValueChange: function (fieldApiName, fieldValue) {
			this.cxValueChange(fieldApiName, fieldValue);
		},
		onCruxElementValueError: function (errors) {
			this.setFieldErrorDetailsInRecord(errors);
		},
		dropdownBeforeShow: function () {
			//dropdownBeforeShow - crux
		},
		cruxOpenDropdown: function () {
			//cruxOpenDropdown - crux
		},
		commonDropDownOnHide: function () {
			//commonDropDownOnHide - crux
		},
		setdropdownData: function () {
			//setdropdownData - crux
		},
		getCustomComponentInitData: function (customFieldComponentData, requiredCompDataProperties) {
			return this.getComponentInitData({ customFieldComponentData, requiredCompDataProperties });
		},
		onUserMaxLimiError: function () {
			_cruxUtils.showCustomMessage({
				params: {
					ltPropMessage: _cruxUtils.getI18n("crm.field.maxlimit.mxnuser.warning", this.data.fieldCurntInstObj.maxLimit), //no i18n
					ltPropType: "warning",
					ltPropDuration: 4000
				}
			});
		}
	},
	setFieldValueInRecord: function (fieldApiName, fieldValue) {
		let cxPropFormData = this.data.cxPropFormData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			fieldMeta = this.data.cxPropFieldData,
			currentInstObjKey = this.data.currentInstObjKey,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			formModelFieldObj = layoutCompData.cxInternalUtilityObj.formFieldList;

		fieldApiName = fieldApiName || fieldMeta.api_name;

		var finalValue = this.getTypeConvertedFieldValue(formModelFieldObj, fieldApiName, fieldValue), basicLookupFieldValue = {};
		if (fieldMeta.data_type === "lookup") {
			finalValue = finalValue || {};
			let value = {}; value.id = finalValue.id; value.name = finalValue.name
			basicLookupFieldValue = this.isEmptyObj(finalValue) ? undefined : value;
			var lookupNode = this.$node.querySelector('crux-lookup-component');//no i18n
			if (lookupNode && lookupNode.component) {
				fieldMeta[currentInstObjKey].selectedLookupRecFullData = fieldValue;
			}
			finalValue = basicLookupFieldValue;
		}
		if (fieldMeta.data_type === "datetime" && finalValue) {
			let dateTimeNode = this.$node.querySelector('crux-date-time-component');//no i18n
			finalValue = dateTimeNode && dateTimeNode.component.getValue({ userFormat: true }) || finalValue;
		}
		if (["ownerlookup", "userlookup"].indexOf(fieldMeta.data_type) !== -1) {
			var userLookupNode = this.$node.querySelector('crux-user-component');//no i18n
			if (userLookupNode && userLookupNode.component) {
				fieldMeta[currentInstObjKey].selectedLookupRecFullData = userLookupNode.component.data.cxPropUserRecord;
			}
			finalValue = finalValue || {};
			let value = {}; value.id = finalValue.id; value.full_name = finalValue.full_name;
			basicLookupFieldValue = this.isEmptyObj(finalValue) ? undefined : value;
			finalValue = basicLookupFieldValue;
		}
		if ("multiuserlookup" === fieldMeta.data_type) {
			finalValue = this.getMultiUserLookupDataForRecord({
				selectedIds: finalValue,
				currentPage: layoutCompData.cxInternalUtilityObj.currentPage,
				fieldMeta,
				originalFieldValue: layoutCompData.originalEntityRecordData && layoutCompData.originalEntityRecordData[fieldMeta.api_name]
			});
		}
		Lyte.Component.set(cxPropFormData, fieldApiName, finalValue);
		fieldCurntInstObj.cxFieldDisplayValue = finalValue;
		return finalValue;
	},
	cxValueChange: function (fieldApiName, fieldValue) {
		let cxPropFormData = this.data.cxPropFormData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			fieldMeta = this.data.cxPropFieldData,
			currentInstObjKey = this.data.currentInstObjKey;
		let finalValue = this.setFieldValueInRecord(fieldApiName, fieldValue);
		//Map Dependency flow
		if (layoutCompData.cxInternalUtilityObj.mapDependencyFields.indexOf(fieldApiName) !== -1) {
			this.setMapDependencyOption({ cxPropFormData, layoutCompData, fieldApiName, fieldValue: finalValue, fieldMeta, currentInstObjKey });
		}
		//Currency Conversion
		if (fieldMeta.column_name === "CURRENCYISOCODE") {
			this.handleCurrencyConversion({ layoutCompData, cxPropFormData, selectedCurrency: finalValue });
		}
		//Field of Lookup Execution
		this.processFieldsOfLookup({ selectedLookupRecord: fieldMeta[currentInstObjKey].selectedLookupRecFullData, layoutCompData, cxPropFormData, currentInstObjKey, fieldMeta });
		//Parent Form - Formula execution
		this.processModuleFormulaFields(fieldApiName);
		//LayoutRule Execution - need to executed at the end only
		this.processLayoutRules();
		//callback to the user on field value change
		var cbObject = { fieldApiName, fieldValue, cxPropFormData, fieldMeta };
		var onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormValueChange', onFormValueChange: cbObject });//no i18n
		onValueChangeCBResponse.then(function (promiseResponse) {
			let skippedExecution = true;
			if (promiseResponse === false) {
				return { skippedExecution };
			}
		});
	},
	getFieldIdClassValues: function () {
		let moduleName = this.data.cxPropModuleData.module_name,
			columnName = this.data.cxPropFieldData.column_name,
			currentInstObjKey = this.data.currentInstObjKey;
		let finalClass = (currentInstObjKey || "") + 'Cx' + moduleName + columnName,
			finalId = `idProp_${currentInstObjKey || ""}_${moduleName}_${columnName}`;
		return { class: finalClass, id: finalId };
	},
	setErrorDetailsInDom: function () {
		var fieldCurntInstObj = this.data.fieldCurntInstObj, currentError = fieldCurntInstObj.fieldErrorDetails;
		Lyte.Component.set(fieldCurntInstObj, 'isErrorYieldNeeded', false);//no i18n
		if (currentError && currentError.message) {
			var finalErrorMessage = currentError.message;
			if (!currentError.ignoreActualErrorMessage) {
				finalErrorMessage = this.getActualErrorMessage({ errorData: currentError, fieldMeta: this.data.cxPropFieldData });
			}
			Lyte.Component.set(fieldCurntInstObj, 'errorMesage', finalErrorMessage);//no i18n
		} else {
			Lyte.Component.set(fieldCurntInstObj, 'errorMesage', "");//no i18n
		}
	},
	setFieldValueInDom: function (fieldMeta) {
		var fieldCurntInstObj = this.data.fieldCurntInstObj,
			cxPropFormData = this.data.cxPropFormData,
			cxPropFieldData = fieldMeta || this.data.cxPropFieldData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		if (cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			let fieldValue = cxPropFormData[cxPropFieldData.api_name];
			if (cxPropFieldData.ui_type === 208 && ['clone', 'edit'].includes(cxUtilityObj.currentPage)) {
				fieldValue = fieldValue.name || fieldValue;
			}
			if (cxPropFieldData.column_name === "SALUTATION") {
				Lyte.Component.set(fieldCurntInstObj, 'cxSalutationFldDisplayValue', fieldValue);//no i18n
			} else {
				Lyte.Component.set(fieldCurntInstObj, 'cxFieldDisplayValue', fieldValue);//no i18n
			}
		}
	},
	setSalutationFieldData: function () {
		let fieldData = this.data.cxPropFieldData,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			currentInstObjKey = this.data.currentInstObjKey,
			layoutCompData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		let formConfigurations = layoutCompData.formConfigurations || {};
		if (fieldData.column_name === "FIRSTNAME") {
			let sal_class = 'cxSalutationElemWrapper cxFormFirstNameDiv';
			if (fieldCurntInstObj.required) {
				sal_class += ' cxSalutationMandatory';
			}
			this.data.cxSalutationFieldClasss = sal_class;
			this.data.isFirstNameField = true;
			fieldCurntInstObj.salutationFieldData = {};
			let sal_Obj = {};
			sal_Obj.fieldMeta = cxUtilityObj.layoutFieldApiVsMetaObject.Salutation;
			let salFldCurntInstObj = sal_Obj.fieldMeta[currentInstObjKey];
			let finalId = `idProp_${currentInstObjKey || ""}_${sal_Obj.fieldMeta.column_name}`;
			salFldCurntInstObj.cxPropId = finalId;
			this.setFormConfigurations({
				cxPropFieldData: sal_Obj.fieldMeta,
				fieldCurntInstObj: salFldCurntInstObj,
				formConfigurations
			}, layoutCompData);
			if (!salFldCurntInstObj.hasOwnProperty('fieldZcqaValue') || !salFldCurntInstObj.fieldZcqaValue) {
				salFldCurntInstObj.fieldZcqaValue = sal_Obj.fieldMeta.field_label;
			}
			this.setData('salutationFldCurntInstObj', salFldCurntInstObj || {});
			fieldCurntInstObj.salutationFieldData = sal_Obj;
			this.setFieldValueInDom(sal_Obj.fieldMeta);
		}
	},
	setFieldTooltipValues: function () {
		let fieldMeta = this.data.cxPropFieldData,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			infoTooltipValue = '', staticTooltipValue = '';

		let tooltipDetails = (!this.isEmptyObj(fieldCurntInstObj.tooltip) && fieldCurntInstObj.tooltip) ||
			(!this.isEmptyObj(fieldMeta.tooltip) && fieldMeta.tooltip);
		if (tooltipDetails) {
			if (tooltipDetails.name === 'Info Icon') {
				infoTooltipValue = tooltipDetails.value;
				Lyte.Component.set(fieldCurntInstObj, 'placeholderValue', '');
			} else if (tooltipDetails.name === 'Static Text') {
				staticTooltipValue = tooltipDetails.value;
				if (!fieldCurntInstObj.ignorePlaceholderValue) {
					Lyte.Component.set(fieldCurntInstObj, 'placeholderValue', staticTooltipValue);
				}
			}
		}
		if (fieldCurntInstObj.read_only) {
			staticTooltipValue = _cruxUtils.getI18n('crm.lable.read.only'); //no i18n
		}
		Lyte.Component.set(fieldCurntInstObj, 'staticTooltipValue', staticTooltipValue);
		Lyte.Component.set(fieldCurntInstObj, 'infoTooltipValue', infoTooltipValue);
	},
	setFieldSpecificConfigs: function () {
		let layoutComponentData = this.data.cxPropLayoutComponentData,
			formConfigurations = layoutComponentData.formConfigurations || {},
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			currentModuleData = this.data.cxPropModuleData,
			cxPropFormData = this.data.cxPropFormData,
			cxPropFieldData = this.data.cxPropFieldData;

		this.setFormConfigurations({
			cxPropFieldData,
			fieldCurntInstObj,
			formConfigurations
		}, layoutComponentData);
		if ([36, 143, 144, 145].includes(cxPropFieldData.ui_type)) {
			fieldCurntInstObj.showCalculator = true;
		}
		if (cxPropFieldData.data_type === 'multiuserlookup') {
			fieldCurntInstObj.maxLimit = 10;
		}
		if (!this.isEmptyObj(layoutComponentData.originalEntityRecordData) &&
			!fieldCurntInstObj.hasOwnProperty('originalFieldValue')) {
			fieldCurntInstObj.originalFieldValue = layoutComponentData.originalEntityRecordData[cxPropFieldData.api_name];
		}
		if ([301, 300].includes(cxPropFieldData.ui_type) && !cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			cxPropFormData[cxPropFieldData.api_name] = [true, false].includes(cxPropFieldData.default_value) ? cxPropFieldData.default_value : false;
		}
		if (['multiselectlookup', 'lookup'].includes(cxPropFieldData.data_type)) {
			let showQCButton = this.isQuickCreateButtonNeeded(layoutComponentData, cxPropFieldData);
			this.setData('showQuickCreateButton', showQCButton);//no i18n
		}
		if (!fieldCurntInstObj.hasOwnProperty('fieldZcqaValue') || !fieldCurntInstObj.fieldZcqaValue) {
			fieldCurntInstObj.fieldZcqaValue = cxPropFieldData.field_label;
		}
		let cruxElementContainerClass = '';
		if (this.data.isFirstNameField) {
			cruxElementContainerClass += ' cxFormFirstNameDiv cxcreateFormComponentRow cruxFormComponentRow';//no i18n
		}
		fieldCurntInstObj.cruxElementContainerClass = cruxElementContainerClass;
		fieldCurntInstObj.cruxComponentName = `crux-${fieldCurntInstObj.cruxType}-component`;//no i18n
		fieldCurntInstObj.cxPropFieldModule = (cxPropFieldData.lookup && cxPropFieldData.lookup.module && cxPropFieldData.lookup.module.api_name) || (currentModuleData && currentModuleData.module_name) || "";//no i18n
		fieldCurntInstObj.cruxFieldKey = this.data.isFirstNameField ? '' : 'field_label';//no i18n
	},
	setFieldErrorDetailsInRecord: function (errors) {
		let errorMap = {
			"value_empty": "ERR01",
			"value_invalid": "ERR02",
			"decimal_check": "ERR03",
			"maxlength_check": "ERR04",
			"maxdate_check": "ERR05",
			"mindate_check": "ERR06"
		};
		let cxPropFormData = this.data.cxPropFormData,
			fieldMeta = this.data.cxPropFieldData,
			errorObject = cxPropFormData.$RECORD__Error__Object || {},
			currentErrorCode = errorMap[errors],
			existingError = errorObject[fieldMeta.api_name];
		let updateError = !errorObject.hasOwnProperty(fieldMeta.api_name) ||
			(existingError && existingError.code !== currentErrorCode);
		if (updateError) {
			switch (errors) {
				case 'value_empty':
					errorObject[fieldMeta.api_name] = { "code": "ERR02", "message": "Mandatory field cannot be empty" };//no i18n
					break;
				case 'value_invalid':
					errorObject[fieldMeta.api_name] = { "code": "ERR03", "message": "Type of value does not match the specified data type" };//no i18n
					break;
			}
		}
	},
	getMultiUserLookupDataForRecord: function (dataObject) {
		let { selectedIds, currentPage, fieldMeta, originalFieldValue } = dataObject,
			connectAPiname = fieldMeta && fieldMeta.multiuserlookup.connectedlookup_apiname,
			finArr = [];
		let existingData = originalFieldValue && originalFieldValue.users || [],
			existingDataLength = existingData && existingData.length;
		let newSelectedIds = selectedIds;
		if (selectedIds && Array.isArray(selectedIds) && selectedIds.length) {
			newSelectedIds = selectedIds.map(function (idDetails) {
				let actualId = idDetails;
				if (idDetails && idDetails.id) {
					actualId = idDetails.id;
				}
				return actualId;
			});
		}
		switch (currentPage) {
			case 'create':
			case 'clone':
				newSelectedIds.forEach(function (id) {
					let singleObj = {};
					singleObj[connectAPiname] = { 'id': id };
					let usrRecord = store.peekRecord('user', id);//no i18n
					if (usrRecord && usrRecord.full_name) {
						singleObj[connectAPiname].name = usrRecord.full_name;
					}
					finArr.push(singleObj);
				});
				break;
			case 'edit':
				let existingRec = [], newRec = [], removeRec = [];
				for (var l = 0; l < existingDataLength; l++) {
					if (newSelectedIds.includes(existingData[l][connectAPiname].id)) {
						existingRec.push(existingData[l][connectAPiname].id);
					} else {
						removeRec.push(existingData[l][connectAPiname].id);
					}
				}
				let currL = newSelectedIds.length;
				for (var lm = 0; lm < currL; lm++) {
					if (!(existingRec.includes(newSelectedIds[lm]) || removeRec.includes(newSelectedIds[lm]))) {
						newRec.push(newSelectedIds[lm]);
					}
				}
				removeRec.forEach(function (rA) {
					var a = Lyte.deepCopyObject(existingData.filter(function (usr) { return usr[connectAPiname].id === rA })[0]);
					a._delete = null;
					finArr.push(a);
				});
				newRec.forEach(function (nA) {
					var b = {};
					b[connectAPiname] = { id: nA };
					let usrRecord = store.peekRecord('user', nA);//no i18n
					if (usrRecord && usrRecord.full_name) {
						b[connectAPiname].name = usrRecord.full_name;
					}
					finArr.push(b);
				});
				break;
		}
		return finArr.length ? { users: finArr } : {};
	},
	//Field Instance Object - Observers - Start
	observeTooltipValueChange: function () {
		this.setFieldTooltipValues();
	}.observes('fieldCurntInstObj.setTooltipValue'),//no i18n
	observeFieldValueChange: function () {
		this.setFieldValueInDom();
	}.observes('fieldCurntInstObj.setValueIntoDom'),//no i18n
	observeValidation: function () {
		let cruxNode = this.$node.querySelector('.cxCreateElementCommonClass');//no i18n
		if (cruxNode && cruxNode.component && cruxNode.component.validate) {
			cruxNode.component.validate();
		}
	}.observes('fieldCurntInstObj.triggerCruxValidation'),//no i18n
	observeSalutationFieldValueChange: function () {
		let salutationMeta = this.data.fieldCurntInstObj.salutationFieldData && this.data.fieldCurntInstObj.salutationFieldData.fieldMeta;
		this.setFieldValueInDom(salutationMeta);
	}.observes('salutationFldCurntInstObj.setValueIntoDom'),//no i18n
	observeErrorDetails: function () {
		this.setErrorDetailsInDom();
	}.observes('fieldCurntInstObj.observeErrorDetails'),//no i18n
	triggerValueChangeCallback: function () {
		var cxPropFormData = this.data.cxPropFormData, cxPropFieldData = this.data.cxPropFieldData;
		this.cxValueChange(cxPropFieldData.api_name, cxPropFormData[cxPropFieldData.api_name]);
	}.observes('fieldCurntInstObj.triggerValueChangeCallback'),//no i18n
	observeLayoutRuleTrigger: function () {
		this.processLayoutRules();
	}.observes('fieldCurntInstObj.triggerLayoutRules')//no i18n
	//End
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-formula-utils",
		"crux-entity-date-time-mixin",
		"crux-create-requesthandler-mixin",
		"crux-create-formcallbacks-mixin"
	]
});//No I18n