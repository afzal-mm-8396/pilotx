// $Id$
/**
 * @component crux-criteria-editor
 * @author authorName
 * @version 1.0.0
 * @alias crm-criteria-editor 1
 * @summary summary about the component if any
 * @utility  getCriteria
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-criteria-editor", {
_template:"<template tag-name=\"crux-criteria-editor\"> <template is=\"if\" value=\"{{dxHubCheck}}\"><template case=\"true\"> <template is=\"if\" value=\"{{dxHubLoading}}\"><template case=\"true\"><div>Fetching Module fields Data...</div></template></template> <template is=\"if\" value=\"{{dxHubError}}\"><template case=\"true\"><div>Module Name given is not proper</div></template></template> <template is=\"if\" value=\"{{dxHubFieldError}}\"><template case=\"true\"><div>Fields are empty</div></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{dxHubLimitCheck}}\"><template case=\"true\"> <div>Given Criteria Contains more than the maximum count allowed</div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','create')}}\"><template case=\"true\"> <div class=\"cxCriteriaWrapper {{if(cxPropShowChildCriteria,'cxCriteriaChildWrapper','')}} {{if(cxPropContentOverflow,'cxCriteriaAutoHeight','')}}\"> <div id=\"criteriaDiv\" class=\"cxCriteriaTable {{if(cxPropSpecifiedCondition,'cxSpecified')}} {{if(cxPropHideFieldComparatorValue,'cxCriteriaAutoWidth','')}}\" total=\"{{totalCriteria}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropColumnLabel,'&amp;&amp;',cxPropColumnLabel.length)}}\"><template case=\"true\"> <div class=\"criteriaRow criteriaCreateRow\"> <div class=\"criteriaTd criteriaNumber\"></div> <template is=\"for\" items=\"{{cxPropColumnLabel}}\" item=\"item\" index=\"index\"> <div class=\"criteriaTd cxCriteriaColumnLabel {{if(ifEquals(index,cruxArithResult(cxPropColumnLabel.length,'-',1)),'cxElementDiv','')}}\"> <lyte-text lt-prop-value=\"{{item}}\"></lyte-text> </div> </template> <div class=\"criteriaTd cxAddRemoveTd\"></div> </div> </template></template> <template is=\"for\" items=\"{{arr}}\" item=\"val\" index=\"index\"> <crux-criteria-editor-header class=\"criteriaRow criteriaCreateRow {{if(cxPropShowChildCriteria,'cxCriteriaParentRow','')}} {{if(ifEquals(arr.length,cruxArithResult(index,'+',1)),'cxCriteriaLastRowButton','')}} {{if(expHandlers(cruxArithResult(index,'+',1),'<=',cxPropDisabledRows),'cxCriteriaHeaderDisabled','')}}\" id=\"criteriaEditorHeader{{cruxArithResult(index,'+',1)}}\" prefix-array=\"{{cruxClone(cxPropPrefixArray)}}\" module=\"{{cxPropModule}}\" on-operator-change-call=\"{{method('onOperatorChangeCall')}}\" set-conditions=\"{{method('setConditions')}}\" get-fields-for-header=\"{{method('getFieldsForHeader')}}\" cx-prop-show-logged-in-user=\"{{cxPropShowLoggedInUser}}\" criteria-array-object-update=\"{{method('criteriaArrayObjectUpdate')}}\" on-value-change-call=\"{{method('onValueChangeCall')}}\" on-field-change-call=\"{{method('onFieldChangeCall')}}\" criteria-number=\"{{rowNumberArray[index]}}\" and-or-condition=\"{{patternArrDis[index]}}\" criteria-index=\"{{cruxArithResult(index,'+',1)}}\" show-add=\"{{if(ifEquals(arr.length,cruxArithResult(index,'+',1)),true,false)}}\" show-remove=\"{{if(ifEquals(arr.length,1),false,true)}}\" set-criteria-obj=\"{{unbound(if(setCriteriaObj[index],setCriteriaObj[index]))}}\" set-field-for-criteria=\"{{method('setCriteriaObjectField')}}\" cx-prop-none-field=\"{{cxPropShowNoneCondition}}\" module-list=\"{{moduleList}}\" multiple-module=\"{{multipleModule}}\" remove-pattern=\"{{cxPropRemovePattern}}\" on-value-error=\"{{method('valueErrorCall')}}\" get-prefix-values=\"{{method('sendPrefixValues')}}\" get-prefix-array=\"{{method('sendPrefixArray')}}\" module-mapping=\"{{cxPropModuleMapping}}\" module-record-mapping=\"{{cxPropModuleRecordMapping}}\" dynamic-column=\"{{cxPropDynamicColumns}}\" date-pattern=\"{{cxPropDatePattern}}\" time-format=\"{{cxPropTimeFormat}}\" criteria-format=\"{{cxPropCriteriaFormat}}\" total-criteria=\"{{totalCriteria}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" display-field=\"{{cxPropModuleDisplayFieldMapping}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" text-max-length=\"{{cxPropTextMaxLimit}}\" onfield-dropdown-open=\"{{method('onFieldDropdownOpenCall')}}\" oncondition-dropdown-open=\"{{method('onConditionDropdownOpenCall')}}\" oncondition-dropdown-hide=\"{{method('onConditionDropdownHideCall')}}\" onfield-dropdown-hide=\"{{method('onFieldDropdownHideCall')}}\" on-age-in-condition-change-call=\"{{method('onAgeInConditionChangeCall')}}\" currency-properties=\"{{cxPropCurrencyProperties}}\" tab-index=\"{{cxPropTabIndex}}\" cx-prop-show-all-fields=\"{{cxPropShowAllFields}}\" time-zone=\"{{cxPropTimeZone}}\" cx-prop-id=\"{{cxPropId}}\" api-version=\"{{cxPropCriteriaVersion}}\" secondary-module=\"{{cxPropSecondaryModule}}\" criteria-meta-method=\"{{method('pushingCriteriaMeta')}}\" on-sec-field-change-call=\"{{method('onSecFieldChangeCall')}}\" onsecfield-dropdown-open=\"{{method('onSecFieldDropdownOpenCall')}}\" onsecfield-dropdown-hide=\"{{method('onSecFieldDropdownHideCall')}}\" get-related-fields=\"{{method('getRelatedFields')}}\" dynamic-type-change-call=\"{{method('dynamicTypeChangeCall')}}\" dynamic-type-value=\"{{cxPropDynamicValueType}}\" on-before-dynamic-type-change-call=\"{{method('beforeDynamicTypeChangeCall')}}\" cx-prop-layout=\"{{cxPropLayout}}\" secondary-module-display-name=\"{{cxPropSecondaryModuleDisplayName}}\" on-field-set-call=\"{{method(&quot;onFieldSetCall&quot;)}}\" hide-seconday-module=\"{{cxPropHideSecondayModuleName}}\" show-secondary-module-dropdown=\"{{cxPropShowSecondaryFields}}\" on-condition-set-call=\"{{method('onConditionSetCall')}}\" user-component-properties=\"{{cxPropUserProperties}}\" role-component-properties=\"{{cxPropRoleProperties}}\" profile-component-properties=\"{{cxPropProfileProperties}}\" user-component-custom-request-call=\"{{method('userComponentCustomRequestFn')}}\" click-dynamic-field-value=\"{{method('clickDynamicFieldValueFn')}}\" dynamic-type-value-options=\"{{cruxClone(cxPropDynamicValueTypeOptions)}}\" hide-primary-selected-field=\"{{cxPropHidePrimaryFieldInSecondary}}\" show-error-for-empty-criteria=\"{{cxPropShowErrorForEmptyCriteria}}\" cx-prop-force-set-condition=\"{{cxPropForceSetCondition}}\" tooltip-config=\"{{cxPropTooltipConfig}}\" field-to-crux-comp-mapping=\"{{method('fieldToCruxCompMappingMt')}}\" text-area-max-length=\"{{cxPropTextAreaMaxLimit}}\" selected-field=\"{{lbind(selectedFieldArray[index])}}\" cx-dynamic-criteria-component-call=\"{{method('dynamicCriteriaComponentCall')}}\" show-fields-criteria=\"{{negate(cxPropHideFieldComparatorValue)}}\" child-criteria=\"{{cxPropShowChildCriteria}}\" set-methods-and-data-for-child-criteria-call=\"{{method('setMethodsAndDataForChildCriteriaCall')}}\" allow-empty-child-criteria=\"{{cxPropAllowEmptyChildCriteria}}\" always-show-child-criteria=\"{{cxPropAlwaysShowChildCriteria}}\" lookup-component-data-fetch-fn=\"{{method('lookupComponentDataFetchMt')}}\" hide-criteria-add-remove=\"{{cxPropHideCriteriaAddRemove}}\" on-element-dropdown-open=\"{{method('elementDropdownOpen')}}\" on-element-dropdown-close=\"{{method('elementDropdownClose')}}\" selected-sec-field=\"{{lbind(selectedSecFieldArray[index])}}\" get-custom-picklist-value=\"{{method('getCustomPicklistValueCriteria')}}\" disabled-record-state-config=\"{{cxPropDisableRecordCategoryConfiguration}}\" on-change-previous-next-condition-call=\"{{method('onChangePreviousNextConditionCall')}}\" prefix-changed=\"{{method('prefixChangedFn')}}\" cx-prop-disabled=\"{{expHandlers(cruxArithResult(index,'+',1),'<=',cxPropDisabledRows)}}\" cx-prop-disabled-group-operator=\"{{expHandlers(index,'<=',cxPropDisabledRows)}}\" masking-properties=\"{{cxPropMaskingProperties}}\"></crux-criteria-editor-header> </template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(arr.length,'>',1),'&amp;&amp;',expHandlers(cxPropRemovePattern,'!'))}}\"><template case=\"true\"> <div class=\"criteria_new_pat_edtr cxCriteriaPtrnContEditMode\" id=\"changePattern\"> <div class=\"criteriaTd {{if(showEdit,'editmodeLabel','')}}\"> <span class=\"cxCriteriaPtrnLabel cxCriteriaPatternText\">{{cruxGetI18n(\"crm.label.criteria.pattern\")}}</span> <template is=\"if\" value=\"{{expHandlers(cxPropShowHelp,'&amp;&amp;',expHandlers(cxPropAppearance,'==','box'))}}\"><template case=\"true\"> <span class=\"cxHelpIcon\" data-zcqa=\"criteria_patternhelp\" lt-prop-title=\"{{cruxGetI18n('crm.label.context.help')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;}\" onclick=\"{{action('openHelp')}}\"></span> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(showEdit,'!')}}\"><template case=\"true\"> <div class=\"cxCriteriaEditorPatternValue criteriaTd editPatternLabel\"> <span class=\"cxCriteriaPatternValue\" data-zcqa=\"criteria_pattern\">{{patternCriteria}}</span> <span class=\"cxCriteriaEditLink\" data-zcqa=\"criteria_patternedit\" onclick=\"{{action('openEditCriteria',this)}}\">{{cruxGetI18n(\"crm.label.edit.criteria.pattern\")}}</span> <template is=\"if\" value=\"{{expHandlers(cxPropShowHelp,'&amp;&amp;',expHandlers(cxPropAppearance,'==','flat'))}}\"><template case=\"true\"> <span class=\"cxHelpIcon\" data-zcqa=\"criteria_patternhelp\" lt-prop-title=\"{{cruxGetI18n('crm.label.context.help')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;}\" onclick=\"{{action('openHelp')}}\"></span> </template></template> </div> </template><template case=\"false\"> <div class=\"cxCriteriaEditorPatternInput criteriaTd editPatternInput {{if(showPatternError,'cxCriteriaErrorPattern','')}}\"> <template is=\"if\" value=\"{{cxPropDraggablePattern}}\"><template case=\"true\"> <crux-pattern-editor cx-prop-pattern-array=\"{{rowNumberArray}}\" cx-prop-pattern=\"{{criteria}}\"></crux-pattern-editor> {{addMurhyInfo(\"crux-criteria-editor.html\",\"Feb Default Changes\")}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropDisabledRows}}\"><template case=\"true\"> <div class=\"cxCriteriaContainer\"> <div contenteditable=\"\" class=\"cxCriterEditorWrapper\" onkeydown=\"{{action('patternKeyDown',event)}}\" onpaste=\"{{action('patternPaste')}}\" onfocus=\"{{action('patternFocused',this)}}\"> <span contenteditable=\"false\" class=\"cxCriterEditorUnEditiableContent\">{{disabledPatternInternational}} <span class=\"cxCriterEditorEditiableContent\" contenteditable=\"true\"> {{subCriteriaEditPatternInternational}} </span> {{endDisabledPatternInternational}}</span> </div> </div> </template><template case=\"false\"> <lyte-input data-zcqa=\"criteria_pattern\" lt-prop-text-area-resize=\"{}\" lt-prop-type=\"textarea\" class=\"criteriaPatternText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput cxTextarea')}}\" lt-prop-value=\"{{lbind(patternCriteria)}}\" lt-prop-id=\"lyteInputCriteria\" lt-prop-rows=\"5\" lt-prop-cols=\"60\" lt-prop-appearance=\"{{cxPropAppearance}}\"></lyte-input> </template></template> </template></template> <template is=\"if\" value=\"{{showPatternError}}\"><template case=\"true\"> <span class=\"cxCriteriaPatternError cxCriteriaInlineError\">{{showPatternError}}</span> </template></template> <div class=\"patternButtons {{if(cxPropShowPatternActionsAsText,'cxPatternOnlyText')}} {{if(cxPropDraggablePattern,'cxCriteriaDraggablePatten','')}}\"> <span class=\"cxCriteriaSaveLink\" data-zcqa=\"criteria_patternsave\" onclick=\"{{action('saveCriteriaPattern')}}\"> <span class=\"cxCriteriaFlatLink\">{{cruxGetI18n(\"crm.button.save\")}}</span> </span> <span class=\"cxCriteriaCancelLink\" data-zcqa=\"criteria_patterncancel\" onclick=\"{{action('closeEditCriteria')}}\"> <span class=\"cxCriteriaFlatLink\">{{cruxGetI18n(\"crm.button.cancel\")}}</span> </span> </div> </div> </template></template> </div> </template></template> </div> </template></template><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','view')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropEmptyShowYield}}\"><template case=\"true\"> <template is=\"if\" value=\"{{dxHubViewError}}\"><template case=\"true\"><div>cxPropSetCriteria is empty</div></template></template> <lyte-yield yield-name=\"emptyCriteriaYield\"></lyte-yield> </template><template case=\"false\"> <div class=\"pwie\"> <div id=\"criteriaDiv\" class=\"cxCriteriaTable cxViewMode\"> <template is=\"for\" items=\"{{arr}}\" item=\"val\" index=\"index\"> <crux-criteria-editor-view-header secondary-module=\"{{cxPropSecondaryModule}}\" class=\"criteriaRow criteriaViewRow\" id=\"criteriaEditorHeader{{cruxArithResult(index,'+',1)}}\" prefix-array=\"{{cxPropPrefixArray}}\" module=\"{{cxPropModule}}\" set-field-for-criteria=\"{{method('setCriteriaObjectField')}}\" get-related-fields=\"{{method('getRelatedFields')}}\" set-conditions=\"{{method('setConditions')}}\" criteria-index=\"{{cruxArithResult(index,'+',1)}}\" and-or-condition=\"{{patternArrDis[index]}}\" fields=\"{{cxPropFields}}\" criteria=\"{{unbound(if(setCriteriaObj[index],setCriteriaObj[index]))}}\" total-criteria=\"{{totalCriteria}}\" module-mapping=\"{{cxPropModuleMapping}}\" date-pattern=\"{{cxPropDatePattern}}\" time-format=\"{{cxPropTimeFormat}}\" currency-properties=\"{{cxPropCurrencyProperties}}\" show-comparator=\"{{cxPropShowComparatorInView}}\" secondary-module-display-name=\"{{cxPropSecondaryModuleDisplayName}}\" dynamic-type-value=\"{{cxPropDynamicValueType}}\" hide-seconday-module=\"{{cxPropHideSecondayModuleName}}\" cx-prop-secondary-fields=\"{{cxPropSecondaryFields}}\" module-record-mapping=\"{{cxPropModuleRecordMapping}}\" value-criteria-view-change=\"{{method('valueCriteriaViewChangeFn')}}\" cx-dynamic-criteria-component-call=\"{{method('dynamicCriteriaComponentCall')}}\" show-fields-criteria=\"{{negate(cxPropHideFieldComparatorValue)}}\" criteria-format=\"{{cxPropCriteriaFormat}}\" set-methods-and-data-for-child-criteria-call=\"{{method('setMethodsAndDataForChildCriteriaCallForView')}}\" get-custom-picklist-value=\"{{method('getCustomPicklistValueCriteria')}}\" disabled-record-state-config=\"{{cxPropDisableRecordCategoryConfiguration}}\"></crux-criteria-editor-view-header> </template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(arr.length,'>',1),'&amp;&amp;',expHandlers(cxPropRemovePattern,'!'))}}\"><template case=\"true\"> <div class=\"criteria_new_pat_edtr cxCriteriaPtrnContViewMode viewmode\" id=\"changePattern\"> <div class=\"criteriaTd\"> <span class=\"cxCriteriaPtrnLabel cxCriteriaPatternText\">{{cruxGetI18n(\"crm.label.criteria.pattern\")}}</span> </div> <div class=\"criteriaTd editPatternInput\"> <span data-zcqa=\"criteria_pattern\">{{patternCriteria}}</span> </div> </div> </template></template> </div> </template></template> </template></template> </template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"for","position":[1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,1,2,1]},{"type":"text","position":[1,1,1,4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"text","position":[1,5,1,1,0]},{"type":"attr","position":[1,5,3]},{"type":"text","position":[1,5,3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"insertYield","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropFields","totalCriteria","cxPropModule","cxPropModuleApiName","arr","patternArr","pattern","showEdit","criteria","patternArrDis","bufferCriteria","shownAlert","criteriaArrayObject","cxPropSetCriteria","setCriteriaObj","moduleId","cxPropType","setCriteriaViewObj","getFields","cxPropMaxCount","cxPropRemovePattern","cxPropSpecifiedCondition","defaultCond","defaultCondition","defaultLabelCondition","internalFieldCall","cxPropShowLoggedInUser","cxPropEmptyShowYield","cxPropShowNoneCondition","patternCriteria","cxPropModuleDisplayFieldMapping","preventUIType","preventColumnName","numberFieldException","cxPropShowAllFields","cxPropShowHelp","cxPropHelpUrl","cxPropBoundary","cxPropAppearance","cxPropPrefixArray","cxPropDropArray","criteriaEditPattern","editPatternNode","cxPropDatePattern","cxPropModuleRecordMapping","cxPropDynamicColumns","cxPropTimeFormat","cxPropTimeZone","cxPropCriteriaFormat","rowNumberArray","cxPropTextMaxLimit","cxPropTextAreaMaxLimit","cxPropDropBoxWidth","cxPropCurrencyProperties","cxPropTabIndex","cxPropShowComparatorInView","cxPropSecondaryFields","cxPropSecondaryModule","cxPropSecondaryModuleDisplayName","cxPropCriteriaMeta","cxPropId","cxPropCriteriaVersion","cxPropLayout","cxPropUserProperties","cxPropColumnLabel","cxPropDataTypeMapping","cxPropDynamicValueType","cxPropDynamicValueTypeOptions","cxPropHideSecondayModuleName","cxPropShowSecondaryFields","cxPropCriteriaForValue","cxPropDraggablePattern","cxPropRoleSupport","cxPropGroupSupport","cxPropSortedFields","cxPropHidePrimaryFieldInSecondary","cxPropFilterSecondaryFields","cxPropShowInlineErrorMessage","cxPropShowPatternActionsAsText","cxPropTooltipConfig","cxPropShowErrorForEmptyCriteria","cxPropForceSetCondition","cxPropDisabledRows","cxPropRoleProperties","cxPropProfileProperties","cxPropDisableRecordCategoryConfiguration","selectedFieldArray","cxPropHideFieldComparatorValue","cxPropShowChildCriteria","cxPropAllowEmptyChildCriteria","cxPropAlwaysShowChildCriteria","cxPropHideCriteriaAddRemove","selectedSecFieldArray","dxHubCheck","dxHubError","cxPropMaskingProperties","dxHubLoading","cxPropContentOverflow"],
_observedAttributesType :["array","number","string","string","array","array","array","boolean","string","array","string","boolean","array","object","array","string","string","array","boolean","number","boolean","string","string","string","string","boolean","boolean","boolean","boolean","string","object","array","array","array","boolean","boolean","string","object","string","array","array","array","object","string","object","boolean","string","string","string","array","number","number","string","object","number","boolean","array","string","string","array","string","string","string","object","array","object","boolean","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","string","boolean","boolean","number","object","object","boolean","array","boolean","boolean","boolean","boolean","object","array","boolean","boolean","object","boolean","boolean"],
//No I18N
	_lyteUtilFunctions: ["getCriteria"],
	data : function(){
		return{
			/**
			 * This property specifies the fields that are needed to be shown in the criteria editor.
			 * @componentProperty { array } cxPropFields
			 * @version 1.0.0
			 * @input
			 */
			cxPropFields: Lyte.attr('array',{"input" : true}),//No I18N
			totalCriteria : Lyte.attr('number', {default : 1}),//No I18N
			/**
			 * This specifies the module of the Criteria editor
			 * @componentProperty { string } cxPropModule
			 * @input
			 */
			cxPropModule : Lyte.attr('string',{"input" : true}),//No I18N
			/**
			 * This specifies the module api name for the Criteria editor
			 * @componentProperty { string } cxPropModuleApiName
			 * @input
			 */
			cxPropModuleApiName : Lyte.attr('string'),//No I18N
			arr  : Lyte.attr("array", {default : []}),//No I18N
			patternArr : Lyte.attr("array",{default : [' ']}),//No I18N
			pattern : Lyte.attr("array",{default : [' ']}),//No I18N
			showEdit : Lyte.attr('boolean',{default : false}),//No I18N
			criteria : Lyte.attr('string',{default : "1"}),//No I18N
			patternArrDis : Lyte.attr('array',{default :[' ']}),//No I18N
			bufferCriteria : Lyte.attr('string'),//No I18N
			shownAlert : Lyte.attr('boolean',{default : false}),//No I18N
			criteriaArrayObject : Lyte.attr('array',{default : []}),//No I18N
			/**
			 * This property sets the criteria for the data to be given in the creteria editor. 
			 * @componentProperty { object } cxPropSetCriteria
			 * @input @output
			 */
			cxPropSetCriteria : Lyte.attr('object',{"input" : true,"output" : true}), //no i18n
			setCriteriaObj : Lyte.attr('array'), //No I18N
			moduleId : Lyte.attr('string'), //No I18n
			/**
			 * This property specifies the type of the criteria editor
			 * @componentProperty { create|view } cxPropType = create
			 * @input
			 */
			cxPropType : Lyte.attr('string',{"input" : true,default :'create'}), //no i18n
			setCriteriaViewObj : Lyte.attr('array'), //no i18n
			getFields : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * This property specifies the maximum number of criteria rows that can be added after showing an alert. 
			 * @componentProperty { number } cxPropMaxCount
			 * @input
			 */
			cxPropMaxCount : Lyte.attr('number',{"input" : true,default : 25}), //no i18n
			/**
			 * With this property, you can specify if the pattern has to be removed.
			 * @componentProperty { boolean } cxPropRemovePattern=false
			 * @input
			 */
			cxPropRemovePattern : Lyte.attr('boolean',{"input" : true,default : false}), // no i18n
			/**
			 * With this property, you can specify the mandatory condition to be provided. On setting this property, the user cannot edit the conditions.
			 * @componentProperty { and|or } cxPropSpecifiedCondition
			 * @input
			 */
			cxPropSpecifiedCondition : Lyte.attr('string'), //no i18n
			defaultCond : Lyte.attr('string',{default : 'and'}),//No I18N
			defaultCondition : Lyte.attr('string',{default : _cruxUtils.getI18n('and')}), //no i18n
			defaultLabelCondition : Lyte.attr('string',{default :_cruxUtils.getI18n('crm.label.and') }), //no i18n
			internalFieldCall : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * With this property you can specify if the 'logged in user' field should be shown or not in the user dropdown.
			 * @componentProperty { boolean } cxPropShowLoggedInUser=true
			 * @input
			 */
			cxPropShowLoggedInUser : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property specifes if the yield has to be provided if the empty criteria is given in the view format.
			 * @componentProperty { boolean } cxPropEmptyShowYield=false
			 * @input
			 */
			cxPropEmptyShowYield : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property specifies if the None Field should be shown in the field dropdown.
			 * @componentProperty { boolean } cxPropShowNoneCondition=false
			 * @input
			 */
			cxPropShowNoneCondition : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			patternCriteria : Lyte.attr('string',{default : "1"}),
			/**
			 * This property is the map between the module and its respective display fields.
			 * @componentProperty { object } cxPropModuleDisplayFieldMapping
			 * @input
			 */
			cxPropModuleDisplayFieldMapping : Lyte.attr('object',{"input" : true}), //no i18n
			//alertButton : Lyte.attr('array',{default : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}]}), //no i18n
			preventUIType : Lyte.attr('array'),//no i18n
			preventColumnName : Lyte.attr('array'),//no i18n
			numberFieldException : Lyte.attr('array',{default : ["SOLUTIONNUMBER","INVOICENUMBER","SONUMBER","QUOTENUMBER","CASENUMBER"]}), //no i18n
			/**
			 * This property when given true will show all the field that are provided to the criteria editor without any filteration. Normally criteria editor will filter the unsupported fields, hidden fields and unused fields.
			 * @componentProperty { boolean } cxPropShowAllFields=false
			 * @input
			 */
			cxPropShowAllFields : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * With this property, you can choose to shown or hide the help icon. 
			 * @componentProperty { boolean } cxPropShowHelp=false
			 * @input
			 */
			cxPropShowHelp : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property specifies the url to which the user should be redirected if the help icon is clicked.
			 * @componentProperty { string } cxPropHelpUrl
			 * @input
			 */
			cxPropHelpUrl : Lyte.attr('string',{"input" : true,}), //no i18n
			/**
			 * This property specifies the boundary of the criteria editor dropdown.
			 * @componentProperty { object } cxPropBoundary
			 * @input
			 */
			cxPropBoundary : Lyte.attr("object",{"input" : true,default : {}}),//no i18n
            /**
			 * With this property, you can set the appearance of the criteria editor in the create type. It can be either box or flat.
             * @componentProperty { box|flat } cxPropAppearance
             * @input
             */
            cxPropAppearance: Lyte.attr('string', {"input" : true,default: 'box'}),    //NO I18N
            /**
			 * This property is used to display more dropdown for filtering before a user can select the field. Dropdown like base module, child module can be used here, this property can also be used to show the criteria editor without the field comparator value section.
			 * @componentProperty { array } cxPropPrefixArray
			 * @input
			 */
			cxPropPrefixArray : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			/**
			 * This property is used to populate the dropdown when the cxPropPrefixArray is given.
			 * @componentProperty { array } cxPropDropArray
			 * @input
			 */
			cxPropDropArray : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			criteriaEditPattern : Lyte.attr('array',{default : []}), //no i18n
			editPatternNode : Lyte.attr('object'), //no i18n
			/**
			 * With this property, you can define the date pattern for the dates to be used in the criteria editor.
			 * @componentProperty { string } cxPropDatePattern
			 * @input
			 */
			cxPropDatePattern : Lyte.attr('string',{"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy"}), //no i18n
			/**
			 * This is the moduleRecordMapping data used in CRM. With this you provide the Consent Module fields when GDPR is enabled. This moduleRecordMapping data is also used for lookup fields in some scenarios.
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @input
			 */
			cxPropModuleRecordMapping : Lyte.attr('object',{"input" : true}), //no i18n
			/**
			 * This property when given true allows the developer to construct the prefix dropdown based on the input given in the previous dropdown. So the field comparator value section will also be displayed based on the input from the previous dropdowns.
			 * @componentProperty { boolean } cxPropDynamicColumns
			 * @input
			 */
			cxPropDynamicColumns : Lyte.attr('boolean',{"input" : true}), //no i18n
			/**
			 * This property defines the time format which can be used in the criteria editor.
			 * @componentProperty { string } cxPropTimeFormat
			 * @input
			 */
			cxPropTimeFormat : Lyte.attr('string',{"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : 'hh:mm'}), //no i18n
			/** 
			 * This property defines the time zone which can be used in the criteria editor.
			 * @componentProperty { string } cxPropTimeZone
			 * @input
			 */
			cxPropTimeZone : Lyte.attr("string", {"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30"}),//No I18n
			cxPropCriteriaFormat : Lyte.attr('string'), //no i18n
			rowNumberArray : Lyte.attr('array',[1]), // no i18n
			/**
			 * This property is used to provide the text value limit to the criteria editor. By default, the criteria editor does not have a limit, but if needed it can be provided with this property.
			 * @componentProperty { number } cxPropTextMaxLimit
			 * @input
			 */
			cxPropTextMaxLimit : Lyte.attr('number'), //no i18n
			/**
			 * This property is used to provide the text area value limit to the criteria editor. By default, the criteria editor does not have a limit, but if needed it can be provided with this property.
			 * @componentProperty { number } cxPropTextMaxLimit
			 * @input
			 */
			cxPropTextAreaMaxLimit : Lyte.attr('number',{"input" : true}), //no i18n
			cxPropDropBoxWidth : Lyte.attr('string', {default: 'min-button'}), //no i18n
			/**
			 * With this property you can define the currency details which can be used in the criteria editor.
			 * @componentProperty { object } cxPropCurrencyProperties
			 * @input
			 */
			cxPropCurrencyProperties : Lyte.attr('object',{"input" : true,default : typeof Crm !== "undefined" ? {baseCurrency : Crm.userDetails.BASE_CURRENCY, currencyDetails : Crm.userDetails.CURRENCY_DETAILS,defaultRoundOff: Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2,defaultOrgCurrency : Crm.userDetails.defaultOrgCurrency} : {baseCurrency : "",currencyDetails : {},defaultRoundOff : 2,defaultOrgCurrency : ""}}), //no i18n
			/**
			 * This property sets the tabindex to all the actionable elements inside the criteria editor.
			 * @componentProperty { number } cxPropTabIndex
			 * @input
			 */
			cxPropTabIndex : Lyte.attr('number',{"input" : true,default : 0}), //no i18n
			/**
			 * This property is used to show the group operator of the condition between the criteria rows in the Criteria Summary or in the View.
			 * @componentProperty { boolean } cxPropShowComparatorInView=false
			 * @input
			 */
			cxPropShowComparatorInView : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property is used to populate the secondary field of the criteria editor when field to field matching is expected.
			 * @componentProperty { array } cxPropSecondaryFields
			 * @input
			 */
			cxPropSecondaryFields : Lyte.attr('array',{"input" : true}), //no i18n
			/**
			 * This specifies the module of the secondary fields which is similar to the cxPropModule for the primary fields.
			 * @componentProperty { string } cxPropSecondaryModule
			 * @input
			 */
			cxPropSecondaryModule : Lyte.attr('string',{"input" : true}), //no i18n
			/**
			 * This property will display the secondary module when the secondary field is selected.
			 * @componentProperty { string } cxPropSecondaryModuleDisplayName
			 * @input
			 */
			cxPropSecondaryModuleDisplayName : Lyte.attr('string',{"input" : true}), //no i18n
			cxPropCriteriaMeta : Lyte.attr('array',{default : []}), //no i18n //not used
			/**
			 * With this, you can pass an unique ID to the criteria editor, which is used for querySelection.
			 * @componentProperty { string } cxPropId
			 * @input
			 */
			cxPropId : Lyte.attr('string',{"input" : true,default : 'criteria'}), //no i18n
			cxPropCriteriaVersion : Lyte.attr('string',{default : 'query'}), //no i18n
			/**
			 * This property should be given if the value part is dependent  on a particular layout. Based on the given layout, you will be able to choose from the picklist values. This property is advised to use only for picklist values.
			 * @componentProperty { string } cxPropLayout
			 * @input
			 */
			cxPropLayout : Lyte.attr('string',{"input" : true}), //no i18n
			/**
			 * This property can be used to modify the properties of the user lookup value part.
			 * @componentProperty { object } cxPropUserProperties
			 * @input
			 */
			cxPropUserProperties : Lyte.attr('object',{"input" : true,default : {}}), //no i18n
			/**
			 * This property is used to show the label for each column of the criteria editor. The default column structure would be Field, Comparator and Value. The label would be added on the top of the column.
			 * @componentProperty { array } cxPropColumnLabel
			 * @input
			 */
			cxPropColumnLabel : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			/**
			 * On selecting a field, This property is used to group the data type of the field and show them together in the secondary fields. Normally criteria editor will match the data type when showing the secondary fields, if you want to match the data type with one or more data type you can use this property.
			 * @componentProperty { object } cxPropDataTypeMapping
			 * @input
			 */
			cxPropDataTypeMapping : Lyte.attr('object',{"input" : true}), //no i18n
			/**
			 * When this is given true, the user can choose from the options. With this property, you get to compare the primary field with the options given such as field or value.
			 * @componentProperty { boolean } cxPropDynamicValueType
			 * @input
			 */
			cxPropDynamicValueType : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * With this property, you can set the options for the property 'DynamicValueType'. 
			 * @componentProperty { array } cxPropDynamicValueTypeOptions
			 * @input
			 */
			cxPropDynamicValueTypeOptions :  Lyte.attr('array',{"input" : true,default : [{display : _cruxUtils.getI18n('crm.label.value'),system : 'value'},{display : _cruxUtils.getI18n('crm.label.field'),system : 'field'}]}), //no i18n
			/**
			 * On setting true, the secondary module name gets hidden in the selected seondary field display.
			 * @componentProperty { boolean } cxPropHideSecondayModuleName
			 * @input
			 */
			cxPropHideSecondayModuleName : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * When setting true, the criteria editor works as Field to Field Comparator.
			 * @componentProperty { boolean } cxPropShowSecondaryFields
			 * @input
			 */
			cxPropShowSecondaryFields : Lyte.attr('boolean',{"input" : true}), //no i18n
			/**
			 * On setting this property as true, the criteria editor works to  perform its function only when the valid value in criteria is given by the user.
			 * @componentProperty { boolean } cxPropCriteriaForValue
			 * @input
			 */
			cxPropCriteriaForValue : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * Usually in criteria editor, the user types the pattern.  On setting this property as true, the user gets the flexibility to drag the rows in the pattern editor rather than tying it.   
			 * @componentProperty { boolean } cxPropDraggablePattern
			 * @input
			 */
			cxPropDraggablePattern : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * On setting this property, the user can add the condition  'belong to' and 'does not belongs to' role conditon for the user lookup fields.
			 * @componentProperty { boolean } cxPropRoleSupport
			 * @input
			 */
			cxPropRoleSupport : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			cxPropGroupSupport : Lyte.attr('boolean',{default : false}), //no i18n //shoud not be used
			/**
			 * With this property, you can choose to sort the provided fields alphabetically. 
			 * 
			 
			 * @componentProperty { boolean } cxPropSortedFields
			 * @input
			 */
			cxPropSortedFields : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property is used to hide the primary field in the secondary field list when the similar two module fields are compared together.
			 * @componentProperty { boolean } cxPropHidePrimaryFieldInSecondary
			 * @input
			 */
			cxPropHidePrimaryFieldInSecondary : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This proeprty is used to filter out the unsupported field from the secondary field given to the criteria editor.
			 * @componentProperty { boolean } cxPropFilterSecondaryFields
			 * @input
			 */
			cxPropFilterSecondaryFields : Lyte.attr('boolean',{"input" : true,default : false}),//no i18n
			/**
			 * This property is used to display the error message as inline message below the corresponding input.
			 * @componentProperty { boolean } cxPropShowInlineErrorMessage
			 * @input
			 */
			cxPropShowInlineErrorMessage : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property is used to show the save and cancel in the edit pattern as text or as icons.
			 * @componentProperty { boolean } cxPropShowPatternActionsAsText
			 * @input
			 */
			cxPropShowPatternActionsAsText : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This is used to provide the configuration to the tooltips shown in the criteria editor.
			 * @componentProperty { string } cxPropTooltipConfig
			 * @input
			 */
			cxPropTooltipConfig : Lyte.attr('string',{"input" : true,default :  '{}'}), //no i18n
			/**
			 * When this is given as true, we will throw the error for the empty criteria as well.
			 * @componentProperty { boolean } cxPropShowErrorForEmptyCriteria
			 * @input
			 */
			cxPropShowErrorForEmptyCriteria : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * When this data is given as true the conditions will be fetched everytime the field is selected via the callbacks.
			 * @componentProperty { boolean } cxPropForceSetCondition
			 * @input
			 */
			cxPropForceSetCondition : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			cxPropDisabledRows : Lyte.attr('number',{default : 0}), //no i18n
			/**
			 * This property is used to provide the configuration to the role value section when the role field is selected.
			 * @componentProperty { object } cxPropRoleProperties
			 * @input
			 */
			cxPropRoleProperties : Lyte.attr('object',{"input" : true,default : {}}),
			/**
			* This property is used to provide the configuration to the profile value section when the profile field is selected.
			 * @componentProperty { object } cxPropProfileProperties
			 * @input
			 */
			cxPropProfileProperties : Lyte.attr('object',{default : {}}),
			cxPropDisableRecordCategoryConfiguration : Lyte.attr('boolean',{default : false}), //no i18n
			selectedFieldArray : Lyte.attr('array',{default : []}), //no i18n
			cxPropHideFieldComparatorValue : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropShowChildCriteria : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropAllowEmptyChildCriteria : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropAlwaysShowChildCriteria : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropHideCriteriaAddRemove : Lyte.attr('object',{default : {}}),
			selectedSecFieldArray : Lyte.attr('array',{default : []}),
			dxHubCheck : Lyte.attr('boolean',{default : false}), //no i18n
			dxHubError : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropMaskingProperties : Lyte.attr('object'), //no i18n
			dxHubLoading : Lyte.attr('boolean',{default : false}), //no i18n
			/**
             * @componentProperty { boolean } cxPropContentOverflow
			 * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false, input: true }), //no i18n
 		}
	},
	didConnect : function(){
		window.addEventListener('keydown',this.keydownFn , true);
		if(this.getMethods('onRender')){
			/**
			 * @method onRender
			 * @author authorName
			 * @version 1.0.0
			 */
			this.executeMethod('onRender')//no i18n
		}
	},
	didDestroy : function(){
		window.removeEventListener('keydown' , this.keydownFn , true)
	},
	keydownFn : function(event){
		var classes = event.target.classList
		if(event.keyCode == 32 && ( classes.contains('cx_prefixDropdownLabel') || classes.contains('cx_fieldDropdownLabel') || classes.contains('cx_compDropdownLabel') )) {
			event.preventDefault()
		}
	},
    onGetFieldsSucess :function(){
    	this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    },
    filterAndSetFields : function(fields){
    	function compare(a, b) {
			if(!a.field_label || !b.field_label){
				return 0;
			}
			var genreA = a.field_label;
			var genreB = b.field_label;
			return genreA.toLowerCase().localeCompare(genreB.toLowerCase());
		}
    	var fieldLen = fields.length;
		for(var k=0;k<fieldLen;k++){
			if(fields[k].cxPropType == 'group'){
				fields[k].cxPropFields = this.filterAndSetFields(fields[k].cxPropFields);
			}else{
				if(fields[k].api_name == "Data_Processing_Basis" && this.data.cxPropModuleRecordMapping.Consents && this.data.cxPropModuleRecordMapping.Consents.fields){
					var dPFieldForConsent = store.peekRecord("module",this.data.cxPropModuleRecordMapping.Consents.id).fields.filterBy({api_name : "Data_Processing_Basis"})[0]; //no i18n
					if(dPFieldForConsent){
						Lyte.Component.set(fields[k], {pick_list_values : dPFieldForConsent.pick_list_values} );
					}
				}
				if(this.data.cxPropModule == 'Activities' && fields[k].api_name == 'Tag' && fields[k].sub_module){
					fields[k].field_label = fields[k].field_label + ' (' + this.data.cxPropModuleRecordMapping[fields[k].sub_module.api_name].plural_label +')';
					fields[k].api_name = fields[k].sub_module.api_name+'.'+fields[k].api_name;
				}
				var alloweField = false;
				for(var allowedKey in this.allowedFieldsCriteria ){
					if(this.allowedFieldsCriteria[allowedKey].indexOf(fields[k][allowedKey]) > -1){
						alloweField = true;
					}
				}
				if(!this.data.cxPropShowAllFields && !alloweField){
					for(var key in this.preventField){
						if(this.preventField[key].indexOf(fields[k][key]) > -1){
							fields.splice(k,1);
							k--;
							fieldLen--;
							break;
						}
					}
					for(var i=0;i<this.restrictedFieldTypes.length;i++){
					    var match = true
					    for(var keyN in this.restrictedFieldTypes[i]){
					        if(fields[k][keyN] != this.restrictedFieldTypes[i][keyN]){
					            match = false;
					            break
					        }
					    }
					    if(match){
					        fields.splice(k,1);
							k--;
							fieldLen--;
							break;
					    }
					}
				}
			}
		}
		return this.data.cxPropSortedFields ? fields.sort(compare) : fields
    },
    setDatas : function(){
    	this.showObject={};
    	if(this.data.cxPropPrefixArray && this.data.cxPropPrefixArray.length > 0){
    		if(this.data.cxPropDropArray && this.data.cxPropDropArray.length > 0){
    			this.showObject[this.data.cxPropPrefixArray[0].apiValue]=this.getData('cxPropDropArray');
    			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    		}
    	}else{
    		if(this.data.cxPropFields){
    			this.setData('internalFieldCall',true); //No I18N
				this.setData('cxPropFields',this.filterAndSetFields(this.data.cxPropFields)) //no i18n
				this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
				this.setData('internalFieldCall',false); //No I18N
    		}else if(this.data.cxPropType == 'view'){ //no i18n
    			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    		}
    	}
    	if(this.data.cxPropSecondaryFields && this.data.cxPropSecondaryFields.length){
    		// this.segregateSecondaryFields();
    		if(this.data.cxPropFilterSecondaryFields){
    			this.setData('cxPropSecondaryFields',this.filterAndSetFields(this.data.cxPropSecondaryFields)) //no i18n
    		}
    		this._relatedField = {}
    	}
    },
	init : function(){
		this.$node.getCriteria = function(opt){
			return this.component.getCriteria(opt);
		}
		this.$node.resetCriteria =function(){
			return this.component.resetCriteria();
		}
		this.$node.setCriteria = function(value){
			this.component.setCriteria(value);
		}
		this.$node.setCriteriaConditions = function(arg){
			for(var i in arg){
				this.component[i+'Conditions']=arg[i];
			}
		}
		this.$node.setPreventFieldsObject = function(arg){
			for(var i in arg){
				this.component.preventField[i]=arg[i];
			}
		}
		this.$node.setWidth = function(){
            // var t = this.getBoundingClientRect().width;
            // $L(this).find(".cxElementDiv").width(t - 475);
            console.warn('This function is deprecated. This function is no longer required to set the width for criteria editor in the modal'); //no i18n
		}
		this.$node.focusPattern = function(){
			this.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus()
		}
		this.$node.isCriteriaPatternOpen = function(){
			return this.getData('showEdit')
		}
		this.$node.getTotalCriteria = function(){
			return this.getData('totalCriteria');
		}
		this.$node.addCriteriaRow = function(){
			this.component.createNewCriteriaFn();
		}
		this.$node.deleteCriteriaRow = function(ind){
			this.component.removeCriteriaFn(ind);
		}
		this.$node.showCriteriaAlert = function(msg){
			this.component.showAlert(msg);
		};
		this.$node.showInlineError = function(row,error){
			if(row == 'pattern'){
				this.component.showErrorInPattern(error);
			}else{
				this.querySelector('#criteriaDiv').querySelectorAll(':scope > crux-criteria-editor-header')[row-1].component.setError(error)
			}
		}
		if(this.data.cxPropDisabledRows > 0){
			var pattern,endPattern;
			switch(this.data.cxPropDisabledRows){
			case 1:
				pattern = '( 1 and';
				endPattern = ')';
			}
			this.setData('disabledPattern',pattern);
			this.setData('endDisabledPattern',endPattern);
		}
		if(typeof crmConstants != "undefined" && !this.data.cxPropModuleDisplayFieldMapping){
			this.setData('cxPropModuleDisplayFieldMapping',crmConstants.moduleDisplayField); //no i18n
		}
		if(!this.data.cxPropModuleRecordMapping){
			this.setData('cxPropModuleRecordMapping',typeof moduleRecordMapping != 'undefined' ? moduleRecordMapping : {}); //no i18n
		}
		if(this.getMethods('cxSetDataAndMethods')){
			this.executeMethod('cxSetDataAndMethods',this);
		}
		this.setCriteriaFromComp = false;
		this.newCriteria = false;
		this.showValueError = false;
		var a;
		this.initCruxConditions('criteria');//No I18N
		if(typeof cruxAssets != "undefined" && cruxAssets.getCruxFilterCriteriaConditions){
			a = cruxAssets.getCruxFilterCriteriaConditions();
		}
		for(var i in a){
			this[i+'Conditions']=a[i];
		}
		if(this.getMethods('setCriteriaConditions')){
			a=this.executeMethod('setCriteriaConditions'); //No I18N
		}
		for(var i in a){
			this[i+'Conditions']=a[i];
		}
		if(typeof cruxAssets != "undefined" && cruxAssets.setCriteriaConditions){
			var condit={}
			for(var i in this){
			    if(i.endsWith('Conditions') && Array.isArray(this[i])){
			        condit[i.replace('Conditions','')] = this[i]
			    }
			}
			a = cruxAssets.setCriteriaConditions(condit);
			for(var i in a){
				this[i+'Conditions']=a[i];
			}
		}

		const cruxAssetService = Lyte.Service.getInjected('cruxAssests');
		if (typeof  cruxAssetService !== 'undefined' && cruxAssetService.getPropertiesForCruxComponents) {
			var node = this.$node;
			var props = cruxAssetService.getPropertiesForCruxComponents(node.cxProp(), node.tagName, this);
			this.setData(props);
		}
		
		this.restrictedFieldTypes = []
		if(typeof cruxAssets != "undefined" && cruxAssets.restrictedCriteriaFieldTypes){
			this.restrictedFieldTypes = cruxAssets.restrictedCriteriaFieldTypes;
		}
		this.setData('preventColumnName',this.restrictedColumnNames()); //no i18n
		this.setData('preventUIType',this.restrictedUITypes());//no i18n
		this.preventField = {ui_type : this.data.preventUIType, column_name : this.data.preventColumnName, show_type : [17]}
		if(this.getMethods('preventFieldsObject')){
			this.preventField = this.executeMethod('preventFieldsObject',this.preventField); //no i18n
		}
		this.allowedFieldsCriteria = typeof cruxAssets != "undefined" && cruxAssets.allowedFieldInCriteria ? cruxAssets.allowedFieldInCriteria : {};
		if(this.getMethods('allowedFieldsObject')){
			this.allowedFieldsCriteria = this.executeMethod('allowedFieldsObject',this.allowedFieldsCriteria); //no i18n
		}
        var criteriaClass = 'cxCriteriaFlatStyle';  //NO I18N
        if(this.getData('cxPropAppearance') === 'box') {
            criteriaClass = 'cxCriteriaBoxStyle';   //NO I18N
        }
        if(typeof this.data.cxPropShowSecondaryFields == 'undefined' && this.data.cxPropSecondaryFields && this.data.cxPropSecondaryFields.length){
        	this.setData('cxPropShowSecondaryFields',true);
        }
        $L(this.$node).addClass(`${criteriaClass} cxCriteriaEditorWrapper`);
		this.showObject={};
		this.setDatas();
		this.internalRowObj = 1;
	},
	resetCriteria: function(){
		this.setDatas();
		if(this.getData('cxPropSetCriteria')){
			this.setData('arr',[]); //no i18n
			this.setData('pattern',[' ']);//No I18N
			this.setData('patternArrDis',[' ']); //no i18n
			this.setData('patternArr',[' ']); //no i18n
			this.setData('rowNumberArray',[1]); //no i18n
			this.internalRowObj = 1;

			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
		}else{
			this.setCriteria({});
		}
		this.setData('showEdit',false); //no i18n
		this.setData('showPatternError',undefined);
	},
	savePattern : function(string){
		if(this.data.cxPropDraggablePattern){
			this.setData('criteria',string); //no i18n
			this.setData('patternCriteria',this.changeToInternational(string));//No I18N
			if(this.getData('cxPropSpecifiedCondition')){
				this.criteriaOption('specified');
			}
			this.updateCriteriaRowsConditionBasedOnChangedPattern(this.getData('criteria')); //no i18n
			this.updateCriteriaRowsBasedOnChangedPattern(this.getData('criteria')); //no i18n
			return string;
		}else{
			var valstr = string.split(' ').join('');
			valstr = this.validatePattern(valstr,this.data.totalCriteria,this.data.cxPropShowInlineErrorMessage);
			if(!valstr)
			{
				return false;
			}
			this.setData('showPatternError',undefined);
			this.setData('criteria',valstr); //no i18n
			//subCriteriaEditPattern should be updated when disabled rows are present and pattern is changed from the pattern editor
			this.processDisabledCriteria(this.data.criteria);
			this.setData('patternCriteria',this.changeToInternational(valstr));//No I18N
			if(this.getData('cxPropSpecifiedCondition')){
				this.criteriaOption('specified');
			}
			this.updateCriteriaRowsConditionBasedOnChangedPattern(this.getData('criteria')); //no i18n
			return valstr;
		}
	},
	updateCriteriaRowsBasedOnChangedPattern : function(str){
		var criteriaObj = {}
		for(var i=0;i<this.getData('totalCriteria');i++){
			var checkObj = this.$node.getElementsByTagName('crux-criteria-editor-header')[i].component.getValue(true);
			criteriaObj[this.data.rowNumberArray[i]] = checkObj;
		}
		var row = str.match(/[0-9]+/g)
		row.forEach(function(item,index){row[index] = parseInt(item)})
		this.setData('rowNumberArray',row); //no i18n
		var criteriaArray = [];
		for(var i =0;i<row.length;i++){
			criteriaArray[i] = criteriaObj[row[i]-1];
			this.$node.getElementsByTagName('crux-criteria-editor-header')[i].component.setCriteria(criteriaObj[row[i]]);
		}
	},
	updateCriteriaRowsConditionBasedOnChangedPattern : function(str){
		var c=[" "];
		var n = str.match(/(and|or)/gi);
		var d=[" "];
		var s=[" "];
		var nLength= n.length;
		for(var i=0;i<nLength;i++){
			if(n[i]=="or"){
				s.push('or')
				c.push(_cruxUtils.getI18n("or"))
				d.push(_cruxUtils.getI18n("crm.label.or"));
			}else if(n[i]=="and"){
				s.push('and')
				c.push(_cruxUtils.getI18n("and"))
				d.push(_cruxUtils.getI18n("crm.label.and"));
			}
		}
		this.setData('pattern',s);//No I18N
		this.setData('patternArr',c) //No I18N
		this.setData('patternArrDis',d); //No I18N
	},
	processDisabledCriteria : function(criteria,opt,operator,index){
		if(criteria.indexOf(this.data.disabledPattern) > -1){
			criteria = criteria.replace(this.data.disabledPattern,'');
			criteria = criteria.cruxReplaceIndex(criteria.lastIndexOf(this.data.endDisabledPattern),'');
			if(opt === 'add'){
				criteria = '('+criteria+operator+index+')';
			}
			this.setData('subCriteriaEditPattern',criteria);
			return this.data.disabledPattern + this.data.subCriteriaEditPattern + this.data.endDisabledPattern;
		}
		if(opt === 'add'){
			criteria = '('+criteria+operator+index+')';
		}
		return criteria;
	},
	criteriaOption : function(func,index){
		var pattern = this.getData("pattern");//No I18N
		var criteria = this.getData('criteria');//No I18N
		if(func=='add'){
			if(this.data.cxPropDisabledRows){
				criteria = this.processDisabledCriteria(criteria,'add',pattern[index-1],index);
			}else{
				criteria='('+criteria+pattern[index-1]+index+')';
			}
		}else if(func == 'remove'){//No I18N
			// var t=0;
			// var criteria=' '+criteria+' ';
			// var removed = Lyte.arrayUtils(this.getData('rowNumberArray'),"removeAt",index-1)[0]//No I18N
			// this.data.rowNumberArray.forEach(function(item,index){
			// 	if(item > removed){
			// 		Lyte.arrayUtils(this.data.rowNumberArray,'replaceAt',index,item-1);//No I18N
			// 	}
			// }.bind(this))
			// var replacei=removed+' ';
			// criteria=criteria.replace(/(and|or)/g, "#");
			// criteria = criteria.replace(/#/g, function (match) {
			// t++;
			// return (t === (index!=1?(index-1):index)) ? "" : match;
			// });

			// var re = new RegExp(replacei,"g");
			// criteria=criteria.replace(re, "");

			// var t=0;
			// criteria = criteria.replace(/#/g, function (match) {
			// t++;
			// return (t <= pattern.length) ? pattern[t] : match;
			// });

			// var t=0;
			// criteria = criteria.replace(/[0-9]/g, "#");
			// criteria = criteria.replace(/##/g,'#');
			// criteria = criteria.replace(/ /g,"");
			// while(criteria.match(/#\(/)){
			// 	criteria = criteria.replaceAll(/#\(/g,function(str){
			// 	    str = str.replace('(',"");
			// 	    str = '('+str
			// 	    return str
			// 	});
			// }
			// criteria = criteria.replace(/#/g, function (match) {
			// 	return (t <= criteria.match(/#/g).length) ? this.data.rowNumberArray[t++] : match;
			// }.bind(this));
			var criTree = this.formCriteriaTree(criteria,this.data.rowNumberArray)
			var removed = Lyte.arrayUtils(this.getData("rowNumberArray"), "removeAt", index - 1)[0];
			criTree = this.removeCriteriaFromTree(criTree,removed)
			this.data.rowNumberArray.forEach(function(item,index){
				if(item > removed){
					Lyte.arrayUtils(this.data.rowNumberArray,'replaceAt',index,item-1);//No I18N
				}
			}.bind(this))
			criteria = this.convertGroupToString(criTree);
			var t=0;
			criteria = criteria.replace(/[0-9]/g, "#");
			criteria = criteria.replace(/##/g,'#');
			criteria = criteria.replace(/ /g,"");
			criteria = criteria.replace(/#/g, function (match) {
				return (t <= criteria.match(/#/g).length) ? this.data.rowNumberArray[t++] : match;
			}.bind(this));

		}else if(func =='mod'){//No I18N
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}else if(func == 'specified'){ //no i18n
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}
		criteria=criteria.replace(/ /g,"");
		while(criteria.match(/\(\)/g,"")){
		    criteria=criteria.replace(/\(\)/g,"")
		}
		criteria=this.addSpaceBetweenParanthesis(criteria);
		if(func !== 'add' && this.data.cxPropDisabledRows){
			criteria = this.processDisabledCriteria(criteria);
		}
		this.setData('criteria',criteria);//No I18N
		this.setData('patternCriteria',this.changeToInternational(criteria));//No I18N
	},
	showAlert : async function(msg){
		var check=true;
		if(this.getMethods('onBeforeErrorAlert')){
			/**
			 * @method onBeforeErrorAlert
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } errorMessage
			 */
			check= await this.executeMethod('onBeforeErrorAlert',msg);//No I18N
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		}
		if(check){
				_cruxUtils.showCustomAlert(
				{ 
				params : { 
					cxPropYield : true,
					cxPropHeading : msg, 
					cxPropButtonPosition : 'center',
					id : "patternWarning",
					ltPropOutputNode : this.$node.querySelector('.cxCriteriaWrapper'), //eslint-disable-line @zoho/webperf/no-global-variables
					cxPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary", "cxPropZcqa": "button_primary"}]
				},
				accept : function(){
					if(this.showValueError){
						var inputElem = this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input');  //eslint-disable-line @zoho/webperf/no-complex-selector 
						var dropdownElem = this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown'); //eslint-disable-line @zoho/webperf/no-complex-selector 
						if(inputElem){
							inputElem.focus(); 
						}
						else if(dropdownElem){
							dropdownElem.focus(); //no i18n
						}
						this.showValueError = false;
					}else if(this.data.showEdit){
						if(this.data.cxPropDisabledRows){
							this.$node.querySelector('.cxCriteriaEditorPatternInput .cxCriterEditorWrapper').focus(); //eslint-disable-line @zoho/webperf/no-complex-selector
						}else{
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
							this.$node.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus(); //eslint-disable-line @zoho/webperf/no-complex-selector
						}
						
					}
				}.bind(this)});	
			// var alert=this.$node.querySelector('#patternWarning'); //No I18N
			// this.setData('alertMsg',msg); //No I18N
			// alert.ltProp('show',true); //No I18N
			if(this.getMethods('onErrorAlert')){
				/**
				 * @method onErrorAlert
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } errorMessage
				 */
				this.executeMethod('onErrorAlert',msg);//No I18N
			}
		}
	},
	showErrorInPattern : function(error){
		this.setData('showPatternError',error);
	},
	getCriteria : function(opt){
		if(this.getData('showEdit')){
			return false;
		}
		this.setData('bufferCriteriaMeta',[]); //no i18n
		var criteria=[],setCriteriaObj=[],patterSet=[],headerNodes = this.$node.querySelector('#criteriaDiv').querySelectorAll(':scope > crux-criteria-editor-header'),removedCriteriaRows = [],criteriaFlag = true;;
		var skiVal = opt && opt.skipValidation;
		for(var i=0,j=1;i<this.getData('totalCriteria');i++,j++){

			var checkObj = headerNodes[i].component.getValue(skiVal,!skiVal && this.data.cxPropCriteriaForValue,this.data.cxPropShowInlineErrorMessage)
			if(checkObj == false || typeof checkObj == 'undefined'){
				if(this.data.cxPropCriteriaForValue){
					_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
					if(checkObj == false){
						return false;
					}
					removedCriteriaRows.push(i+1);
					continue;
				}else{
					if(!this.data.cxPropShowInlineErrorMessage){
						return checkObj;
					}else if(typeof checkObj == 'undefined'){
						return undefined
					}
					if(criteriaFlag){
						headerNodes[i].scrollIntoView()
					}
					criteriaFlag = checkObj;
				}
			}else{			
				var selectedField = checkObj.fieldRecord;
				var selectedSecField =  null;
				if(checkObj.value && checkObj.value.fieldRecord){
					selectedSecField = checkObj.value.fieldRecord
					delete checkObj.value.fieldRecord;
				}
				delete checkObj.fieldRecord;
				if(this.getMethods('changeCriteriaObject') && checkObj){
					checkObj = this.executeMethod('changeCriteriaObject',checkObj,i,selectedField,selectedSecField); //no i18n  
				}
				if(checkObj.group_operator){
					patterSet.push({condition1 : j,condition2 : j+1})
					j++;
				}
				checkObj && criteria.push(checkObj);
			}
		}
		if(criteria.length == 0){
			return false;
		}
		if(!criteriaFlag){
			return criteriaFlag;
		}
		if(this.getMethods('serializeCriteriaObject')){
			criteria = this.executeMethod('serializeCriteriaObject',criteria);
		}
		var a=this.getData('criteria');//No I18N
		if(opt && opt.coql){
			a = a.replace(new RegExp(/\d+/g),(item)=>{
				return this.convertCriteriaToCoql(criteria[item-1]);
			});
			return {columns : '',condition : a};
		}
		if(removedCriteriaRows.length){
			var tempCriteria = this.formCriteriaTree(a);
			removedCriteriaRows.forEach(function(item){
				tempCriteria = this.removeCriteriaFromTree(tempCriteria,item)
			}.bind(this))
			a = this.convertGroupToString(tempCriteria);
			var i=1;
			a = a.replaceAll(new RegExp(/\d+/g),function(){
			    return i++
			})
		}
		if(this.data.cxPropCriteriaFormat == 'relatedModuleChildCriteria'){
			node={}
			node.cxCriteria = criteria;
		}else{
			node = this.formCriteriaTree(a,criteria)
		}
		this.setCriteriaFromComp = true;
		this.setData('cxPropSetCriteria',node); //no i18n
		this.setData('cxPropCriteriaMeta',this.data.bufferCriteriaMeta); //no i18n
		this.setData('setCriteriaObj',criteria); //No I18N
		if(patterSet.length && this.data.cxPropCriteriaFormat){
			return {pattern : patterSet,criteria : node}
		}
		return node;
	},
	setCriteria : function(criteria){
		this.setData('arr',[]); //no i18n
		this.setData('rowNumberArray',[]); //no i18n
		this.internalRowObj = undefined;
		var andOr;
		var fields = this.getData("cxPropFields");//No I18n
		var _this = this
		if(criteria && Object.keys(criteria).length > 0){
			var specialPattern = criteria.pattern ? criteria.pattern : undefined;
			var specialCriteria = this.data.cxPropCriteriaFormat;
			var flagIndex = 0;
			this.setData('cxPropEmptyShowYield',false); //no i18n
			this.setData('dxHubViewError',false);
			try{
				criteria = JSON.parse(JSON.stringify(criteria.criteria ? criteria.criteria : criteria));
			}catch(e){
				criteria = criteria.criteria ? criteria.criteria : criteria;
			}
			function BinaryTree(val,andOr,criteria){
				this.checkForSpecialCriteria = function(val){
					if(specialCriteria && specialCriteria == 'quoteLineItem'){
						if(criteria && criteria.length+1 == specialPattern[flagIndex].condition1-flagIndex && !val.group[0].group_operator && !val.group[1].group_operator){
							flagIndex++;
							return false;
						}
					}
					if(val.group[0].field && val.group[1].field && val.group[0].field.api_name.match(/Tag/) && val.group[1].field.api_name == 'Activity_Type'){
						return false;
					}
					if(val.group[0] && val.group[0].api_name && _this.data.cxPropPrefixArray.cruxFindIndexOfObject('apiValue',val.group[0].api_name) > -1){
						return false
					}
					return true;
				}
				if(val.group_operator && this.checkForSpecialCriteria(val)){
					this.left= new BinaryTree(val.group[0],andOr,criteria);
					this.right=new BinaryTree(val.group[1],andOr,criteria);
					this.value=val.group_operator.trim().toLowerCase();
					andOr.push(val.group_operator)
				}else{
					criteria.push(val);
					this.value=criteria.length;
					this.left = null
					this.right = null
				}
			    this.andOr=andOr;
				this.criteria = criteria;
			}
			var setCriteriaObj;
			if(this.data.cxPropCriteriaFormat == 'relatedModuleChildCriteria'){
				setCriteriaObj = criteria.cxCriteria;
				andOr = [];
				criteria.cxCriteria.forEach(()=>{
					andOr.push('and');
				});
				andOr.pop();
			}else{
				var tree = new BinaryTree(criteria,[],[]);
				s=this.inorder(tree,'');
				andOr = s.match(/and|or/g) ? s.match(/and|or/g) : s.match(/AND|OR/g);
				setCriteriaObj = tree.criteria;
			}
			if(this.getMethods('normalizeCriteriaObject')){
				setCriteriaObj = this.executeMethod('normalizeCriteriaObject',setCriteriaObj);
			}
			this.setData('setCriteriaObj',setCriteriaObj); //No I18N
			if(this.data.cxPropCriteriaFormat != 'relatedModuleChildCriteria'){
				this.setData('criteria',this.addSpaceBetweenParanthesis(s)); //No I18N
				if(this.data.cxPropDisabledRows){
					this.processDisabledCriteria(this.data.criteria);
				}
				this.setData('patternCriteria',this.changeToInternational(s)); //no getI18n
			}
			this.setData('totalCriteria',setCriteriaObj.length); //No I18N
		}else{
			if(this.getData('cxPropType') == 'view'){
				this.setData('cxPropEmptyShowYield',true); //no i18n
				if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
					this.setData('dxHubViewError',true);
				}
			}
			patternCriteria = ["1", undefined, 1];
			this.setData('criteria',patternCriteria[0]); //No I18N
			this.setData('setCriteriaObj',patternCriteria[1]); //No I18N
			this.setData("totalCriteria", patternCriteria[2]);//No I18N
		}
		if(this.data.totalCriteria > this.data.cxPropMaxCount && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
			this.setData('dxHubLimitCheck',true);
		}else{
			this.setData('dxHubLimitCheck',false)
		}
		if(andOr != null){
			var andOrLength = andOr.length;
			for(var i=0;i<andOrLength;i++){
				andOr[i]=andOr[i].replace(/"/g,'');
				if(andOr[i].trim().toLowerCase() == "and"){
					Lyte.arrayUtils(this.getData("pattern"),"push",'and');//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",_cruxUtils.getI18n("crm.label.and"));//No I18N
					Lyte.arrayUtils(this.getData("patternArr"),"push",_cruxUtils.getI18n("and"));//No I18N

				}else if(andOr[i].trim().toLowerCase() == "or"){
					Lyte.arrayUtils(this.getData("pattern"),"push",'or');//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",_cruxUtils.getI18n("crm.label.or"));//No I18N
					Lyte.arrayUtils(this.getData("patternArr"),"push",_cruxUtils.getI18n("or"));//No I18N
				}
			}
		}
		if(this.getData("totalCriteria") == 0){
			this.setData({criteria : "1", setCriteriaObj : undefined, totalCriteria : 1});
		}

		for(var i=0;i<this.getData('totalCriteria');i++){
			Lyte.arrayUtils(this.getData("arr"), "push", i+1);//No I18N
			Lyte.arrayUtils(this.getData("rowNumberArray"), "push", i+1);//No I18N
		}
		this.internalRowObj = this.data.totalCriteria;
	},
	createNewCriteriaFn : async function(){
		var check=true;
		var count=this.getData('totalCriteria');//No I18N
		if(this.getMethods('onBeforeAddCriteria')){
			/**
			 * @method onBeforeAddCriteria
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } count
			 */
			check= await this.executeMethod('onBeforeAddCriteria',count+1);//No I18N
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		}
		if(check){
			if(this.getData('showEdit')){
				var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
				this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			}else{
				if(count>=this.getData('cxPropMaxCount')){
					this.showAlert(_cruxUtils.getI18n('crm.criteria.max.rowcnt.exceeds')); //No I18N
				}else{
					Lyte.arrayUtils(this.getData('pattern'),'push',this.getData('defaultCond'));//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",this.getData('defaultLabelCondition'));//No I18N
					count+=1;
					this.internalRowObj+=1
					Lyte.arrayUtils(this.getData("patternArr"),"push",this.getData('defaultCondition'));//No I18N
					Lyte.arrayUtils(this.getData("arr"), "push", count);//No I18N
					Lyte.arrayUtils(this.getData("rowNumberArray"), "push", count);//No I18N
					this.setData("totalCriteria", count);//No I18N
					this.criteriaOption("add",count);
					if(this.getMethods('onAddCriteria')){
						/**
						 * @method onAddCriteria
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } count
						 */
						this.executeMethod('onAddCriteria',count);//No I18N
					}
					if(this.getMethods('onChange')){
						/**
						 * @method onChange
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } typeOfChange, arguments
						 */
						this.executeMethod('onChange','New Criteria Added',count); //no i18n
					}
				}
			}
			return false;
		}
	},
	removeCriteriaFn : async function(a){
		var check=true;
			var count=this.getData('totalCriteria');//No I18N
			if(this.getMethods('onBeforeDeleteCriteria')){
				/**
				 * @method onBeforeDeleteCriteria
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } count
				 * @param { * } criteriaRow
				 * @param { * } selectedFieldsArray
				 */
				check= await this.executeMethod('onBeforeDeleteCriteria',count,a,this.data.selectedFieldArray[a-1]);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				if(this.getData('showEdit')){
					var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
					this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
				}else{
					count-=1;
					this.setData("totalCriteria", count);//No I18N
					Lyte.arrayUtils(this.getData('patternArrDis'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData('patternArr'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData('pattern'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData("arr"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("selectedFieldArray"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("selectedSecFieldArray"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("criteriaArrayObject"),"removeAt",a);//No I18N
					if(this.getData('setCriteriaObj') && this.getData('setCriteriaObj')[(a!=1)?a-1:a]){
						Lyte.arrayUtils(this.getData("setCriteriaObj"),"removeAt",(a!=1)?a-1:a);//No I18N
					}
					this.criteriaOption("remove",a);//No I18N
					if(this.getMethods('onDeleteCriteria')){
						/**
						 * @method onDeleteCriteria
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } count, indexToBeRemoved
						 */
						this.executeMethod('onDeleteCriteria',count+1,a);//No I18N
					}
					if(this.getMethods('onChange')){
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
						this.executeMethod('onChange','Criteria Deleted',count+1); //no i18n
					}
				}
			}
			return false;
	},
	actions : {
		createNewCriteria : function(){
			this.createNewCriteriaFn();
			return false;
		},
		removeCriteria : function(a){
			this.removeCriteriaFn(a);
			return false;
		},
		openEditCriteria : async function(thisObj){
			var check=true;
			if(this.getMethods('onBeforeEditPattern')){
				/**
				 * @method onBeforeEditPattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern
				 */
				check= await this.executeMethod('onBeforeEditPattern',this.getData('criteria'));//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				// this.setData('editPatternNode',this.formCriteriaTree());//No I18N
				this.setData('bufferCriteria',this.getData('criteria'));//No I18N
				var patternTextHeight;
                if(this.getData('cxPropAppearance') == 'box') {
                    patternTextHeight = $L(thisObj).prev().height();
                }
				this.setData('showEdit',true);//No I18N
				if(this.data.cxPropDisabledRows){
					this.setData({
						disabledPatternInternational : this.changeToInternational(this.data.disabledPattern),
						subCriteriaEditPatternInternational : this.changeToInternational(this.data.subCriteriaEditPattern),
						endDisabledPatternInternational : this.changeToInternational(this.data.endDisabledPattern)
					});
				}
				if(this.getData('cxPropAppearance') === 'box' && !this.data.cxPropDraggablePattern && this.data.cxPropDisabledRows === 0) {
                    var criteriaPatternTextarea = $L(this.$node).find('.criteriaPatternText')[0];
                    criteriaPatternTextarea.setData('ltPropHeight', (patternTextHeight+15)+'px');    //No I18N
                    criteriaPatternTextarea.focus();
                }
				// this.setData('criteriaEditPattern',this.getData('patternCriteria').split(' ')); //NO I18N
				// this.setData('editPatternCriteriaArray',[].concat(this.getData('pattern'))); //NO I18N
				// this.sortableEditPattern();
				if(this.getMethods('onEditPattern')){
					/**
					 * @method onEditPattern
					 * @author authorName
					 * @version 1.0.0
					 * @param { * } newCriteriaPattern
					 */
					this.executeMethod('onEditPattern',this.getData('criteria'));//No I18N
				}
			}
		},
		// editPatternConditionChange : function(item,index){
		// 	if(item == _cruxUtils.getI18n('and')){
		// 		Lyte.arrayUtils(this.data.criteriaEditPattern,'replaceAt',index,_cruxUtils.getI18n('or')); //NO I18N
		// 	}else if(item == _cruxUtils.getI18n('or')){ //NO I18N
		// 		Lyte.arrayUtils(this.data.criteriaEditPattern,'replaceAt',index,_cruxUtils.getI18n('and')) //NO I18N
		// 	}
		// },
		closeEditCriteria : function(){
			var txt=this.getData('criteria'); //no i18n
			this.setData('criteria',this.getData('bufferCriteria')); //NO I18N
			this.setData('patternCriteria',this.changeToInternational(this.getData('criteria'))); //no i18n
			this.setData('showEdit',false);//No I18N
			this.setData('showPatternError',undefined);
			if(this.getMethods('onCancelPattern')){
				/**
				 * @method onCancelPattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern
				 */
				this.executeMethod('onCancelPattern',txt);//No I18N
			}
		},
		saveCriteriaPattern : async function(){
			var check=true;
			if(this.data.cxPropDisabledRows){
				this.setData('patternCriteria',this.$node.querySelector('.cxCriteriaEditorPatternInput .cxCriterEditorWrapper').innerText.replaceAll('\n',''));
			}
			if(this.getMethods('onBeforeSavePattern')){
				/**
				 * @method onBeforeSavePattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern, editedCriteriaPattern
				 */
				check=await this.executeMethod('onBeforeSavePattern',this.getData('criteria'),this.data.patternCriteria);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				// var criteria = JSON.parse(JSON.stringify(this.data.editPatternNode));
				// function BinaryTree(val,criteria){
				// 	if(val.group_operator){
				// 			this.left= new BinaryTree(val.group[0],criteria);
				// 			this.right=new BinaryTree(val.group[1],criteria);
				// 			this.value=val.group_operator.trim().toLowerCase();
				// 	}else{
				// 		criteria.push(parseInt(val));
				// 		this.value=parseInt(val);
				// 		this.left = null
				// 		this.right = null
				// 	}
				// 	this.criteria = criteria;
				// }
				// var tree = new BinaryTree(criteria,[]);
				

				if(this.data.cxPropDraggablePattern){
					var s = $L('crux-pattern-editor',this.$node)[0].getPattern()
					s=this.changeToInternational(s);
					this.setData('patternCriteria',s);//No I18N
				}
				if(this.getMethods('onSavePatternChanges')){
					this.setData('patternCriteria',this.executeMethod('onSavePatternChanges',this.data.criteria,this.data.patternCriteria));
				}
				var txt = this.changeToDeveloper(this.getData('patternCriteria'));//No I18N
				var t=this.savePattern(txt);

				if(this.getData('shownAlert')){
					this.setData('shownAlert',false);//No I18N
				}else{
					this.setData('showEdit',false);//No I18N
					if(this.getMethods('onSavePattern')){
						/**
						 * @method onSavePattern
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } criteriaPattern
						 */
						this.executeMethod('onSavePattern',this.getData('criteria'));//No I18N
					}
					if(this.getMethods('onChange')){
						this.executeMethod('onChange','Pattern Edited',this.getData('criteria')); //no i18n
					}
				}
			}
		},
		openHelp : function(){
			if(this.data.cxPropHelpUrl){
				open(this.data.cxPropHelpUrl)
			}else{
				if(Lyte.Component.registeredHelpers.getHelpUrl){
					open(Lyte.Component.registeredHelpers.getHelpUrl('help.change.criteria.pattern')); //no i18n
				}
			}
		},
		changeAndOr : async function(cond,i){
			var check=true;
			if(this.getMethods('onBeforeConditionChange')){
				/**
				 * @method onBeforeConditionChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } condition
				 */
				check= await this.executeMethod('onBeforeConditionChange',i,cond);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check && !this.getData('cxPropSpecifiedCondition') && !this.getData('showEdit')){
				var push,disPush;
				if(cond==_cruxUtils.getI18n("crm.label.or")){
					pu = 'and';//No I18N
					disPush = _cruxUtils.getI18n("crm.label.and")//No I18N
					push=_cruxUtils.getI18n("and")//No I18N
				}
				else if(cond==_cruxUtils.getI18n("crm.label.and")){
					pu = 'or';//No I18N
					push=_cruxUtils.getI18n("or");//No I18N
					disPush=_cruxUtils.getI18n("crm.label.or");//No I18N
				}
				Lyte.arrayUtils(this.getData('pattern'),'replaceAt',i-1,pu);//No I18N
				Lyte.arrayUtils(this.getData('patternArr'),'replaceAt',i-1,push);//No I18N
				Lyte.arrayUtils(this.getData('patternArrDis'),'replaceAt',i-1,disPush);//No I18N
				this.criteriaOption("mod",i);
				if(this.getMethods('onConditionChange')){
					/**
					 * @method onConditionChange
					 * @author authorName
					 * @version 1.0.0
					 * @param { * } criteriaRow
					 * @param { * } condition
					 */
					this.executeMethod('onConditionChange',i,cond);//No I18N
				}
				if(this.getMethods('onChange')){
					this.executeMethod('onChange','Group Operator Edited',i,cond); //no i18n
				}
			}
			if(this.getData('showEdit')){
				var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
				this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			}
			return false;
		},
		alertEvent : function(msg,prefix,index){
			if(prefix && index && this.getMethods('setPrefixError')){
				this.showAlert(this.executeMethod('setPrefixError',prefix,index)); //no i18n
			}else{
				this.showAlert(msg);
			}
			return false;
		},
		patternKeyDown : function(event){
			if(event.key === 'Backspace' || [37,38,39,40].indexOf(event.keyCode) > -1){
				return;
			}
			var mat = event.key.match(new RegExp(/[^(andor0-9\s)]/g));
			if(mat && mat.length > 0){
				event.preventDefault();
			}
		},
		patternPaste : function(event){
			if(event.clipboardData.getData('text').match(new RegExp(/[^(andor0-9\s)]/g)).length > 0){
				event.preventDefault();
			}
		},
		patternFocused : function(node){
			node.querySelector('.cxCriterEditorEditiableContent').focus();
		}
	},
	methods : {
		onFieldChangeCall :function(a,b,c){
			if(this.getMethods('onFieldChange')){
				/**
				 * @method onFieldChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } field_label
				 * @param { * } fieldObject
				 */
				return this.executeMethod('onFieldChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Field Edited',a,b,c); //no i18n
			}
		},
		onFieldSetCall : function(index,field_label,field){
			if(this.getMethods('onFieldSet')){
				return this.executeMethod('onFieldSet',index,field_label,field); //no i18n
			}
		},
		onConditionSetCall : function(index,condition,field){
			if(this.getMethods('onConditionSet')){
				return this.executeMethod('onConditionSet',index,condition,field); //no i18n
			}
		},
		onOperatorChangeCall :function(a,b,c,field){
			if(this.getMethods('onOperatorChange')){
				/**
				 * @method onOperatorChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } comparatorName
				 * @param { * } comparatorObject
				 * @param { * } field
				 */
				return this.executeMethod('onOperatorChange',a,b,c,field);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Comparator Edited',a,b,c); //no i18n
			}
		},
		onValueChangeCall : function(){
			if(this.getMethods('onValueChange')){
				/**
				 * @method onValueChange
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } value
				 */
				this.executeMethod('onValueChange',arguments[0],arguments[1]);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Value Edited',arguments[0],arguments[1]); //no i18n
			}
		},
		onSecFieldChangeCall : function(index,field_label,field){
			if(this.getMethods('onSecondaryFieldChange')){
				/**
				 * @method onSecondaryFieldChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } field_label
				 * @param { * } fieldObject
				 */
				this.executeMethod('onSecondaryFieldChange',index,field_label,field);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Secondary Field Edited',index,field_label,field); //no i18n
			}
		},
		onFieldDropdownOpenCall : function(a,b){
			if(this.getMethods('onFieldDropdownOpen')){
				/**
				 * @method onFieldDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onFieldDropdownOpen',a,b);//No I18N
			}
		},
		onConditionDropdownOpenCall : function(a,b){
			if(this.getMethods('onConditionDropdownOpen')){
				/**
				 * @method onConditionDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode	
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onConditionDropdownOpen',a,b);//No I18N
			}
		},
		onSecFieldDropdownOpenCall : function(a,b){
			if(this.getMethods('onRelatedFieldDropdownOpen')){
				/**
				 * @method onRelatedFieldDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onRelatedFieldDropdownOpen',a,b);//No I18N
			}
		},
		onFieldDropdownHideCall : function(a,b){
			if(this.getMethods('onFieldDropdownHide')){
				/**
				 * @method onFieldDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onFieldDropdownHide',a,b);//No I18N
			}
		},
		onConditionDropdownHideCall : function(a,b){
			if(this.getMethods('onConditionDropdownHide')){
				/**
				 * @method onConditionDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onConditionDropdownHide',a,b);//No I18N
			}
		},
		onAgeInConditionChangeCall : function(a,b,c){
			if(this.getMethods('onAgeInConditionChange')){
				/**
				 * @method onAgeInConditionChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } condition
				 * @param { * } conditionObject
				 */
				this.executeMethod('onAgeInConditionChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Age In Condition Changed',a,b,c); //no i18n
			}
		},
		onChangePreviousNextConditionCall : function(a, b, c){
			if(this.getMethods('onChangePreviousNextConditionChange')){
				this.executeMethod('onChangePreviousNextConditionChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Previous Next Condition Changed',a,b,c); //no i18n
			}
		},
		onSecFieldDropdownHideCall : function(a,b){
			if(this.getMethods('onRelatedFieldDropdownHide')){
				/**
				 * @method onRelatedFieldDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onRelatedFieldDropdownHide',a,b);//No I18N
			}
		},
		criteriaArrayObjectUpdate:function(criteriaArray,criteriaIndex){
			var criteriaArrayObject=this.getData('criteriaArrayObject');//No I18N
			criteriaArrayObject[criteriaIndex]=criteriaArray;
			this.setData('criteriaArrayObject',criteriaArrayObject);//No I18N
		},
		setConditions: function (type, comp, field, dynamicValue, index) {
			if((type == 'picklist' || type == "multiselectpicklist" || type == 'user') && (this[type+'Conditions']==undefined || this[type+'Conditions'].length == 0)){
				type = type == 'user' ? 'defWithEmptyUser' : 'text'; //no i18n
			}
			type = type+'Conditions'; //No I18N
			var conditions = type != 'noneConditions' ? Array.from(this[type]) : [{system : "None", display : _cruxUtils.getI18n("None")}]//No I18N
			if(typeof cruxAssets != "undefined"){
				if(field && field.cxDynamicFilterCriteriaComponent && cruxAssets.getDynamicFilterCriteriaCondtions){
					conditions = cruxAssets.getDynamicFilterCriteriaCondtions(field,conditions,dynamicValue,comp,this.$node.cxProp());
				}else if(cruxAssets.setFieldBasedComparator){
					conditions = cruxAssets.setFieldBasedComparator(field,conditions,dynamicValue,index,comp,this.$node.cxProp());
				}
			}
			if(this.getMethods('setFieldBasedComparator') && field){
				conditions = this.executeMethod('setFieldBasedComparator',field,conditions,dynamicValue,index); //no i18n
			}
			if(comp){
				for(var i=0;i<conditions.length;i++){
					if(conditions[i].system == comp){
						var cond=[];
						cond.push(conditions[i])
						return cond
					}
				}
			}
			return conditions;
		},
		getFieldsForHeader : function(arg,rowNum,selectedArray,developerArgs){
			if(selectedArray){
				return this.getDropdownData(-1,selectedArray,developerArgs,undefined,rowNum)
			}else{
				if(arg){
					if(this.getData('cxPropFields')[0].cxPropType === 'group'){
						return this.getData('cxPropFields')[0].cxPropFields[0]
					}
					return this.getData('cxPropFields')[0]; //no i18n
				}else{
					var fields = this.getData('cxPropFields')
					if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
						fields = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(fields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
					}
					if(this.getMethods('onBeforeFieldDropdown')){
						/**
						 * @method onBeforeFieldDropdown
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } fields
						 * @param { * } criteriaRow
						 * @param { * } selectedFieldArray
						 * @param { * } selectedRelatedFieldArray
						 */
						return this.executeMethod('onBeforeFieldDropdown',fields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
					}
					return fields;//No I18N
				}
			}

		},
		getRelatedFields : function(arg,rowNum,field,comp){
			if(!field){
				// return this.data.cxPropSecondaryFields.filter(function(item){return item.id == arg.id})[0];
				try{
					return this.getSelectedField(arg,this.data.cxPropSecondaryFields);
				}catch(e){
					console.warn('cxPropSecondaryFields does not contain the selected secondary field'); //no i18n
					return;
				}
			}
			if(arg != "none"){
				if(arg == 'formula'){
					arg = field.formula.return_type;//no i18n
				}
				if(arg == 'rollup_summary'){
					arg = field.rollup_summary.return_type;//no i18n
				}
				var secondaryFields=[];
				if(this.data.cxPropDataTypeMapping && this.data.cxPropDataTypeMapping[arg]){
					this.data.cxPropDataTypeMapping[arg].forEach(function(item){
						if(!this._relatedField[item]){
							this._relatedField[item] = this.splitRelatedFields(item,this.data.cxPropSecondaryFields)	
						}
						// secondaryFields = secondaryFields.concat(this._relatedField[item])
						secondaryFields = this.mergeRelatedFields(secondaryFields,this._relatedField[item])
					}.bind(this));
				}else{
					if(!this._relatedField[arg]){
						this._relatedField[arg] = this.splitRelatedFields(arg,this.data.cxPropSecondaryFields)	
					}
					secondaryFields = this._relatedField[arg]
				}
				if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
					secondaryFields = cruxAssets.onBeforeCruxCriteriaSecondaryFieldDropdownOpen(secondaryFields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
				}
				if(this.getMethods('onBeforeSecondaryFieldDropdown')){
					return this.executeMethod('onBeforeSecondaryFieldDropdown',secondaryFields,rowNum,arg,field,comp); //no i18n
				}
				return secondaryFields;
			}
			return [{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}]; //no i18n
		},
		valueErrorCall : function(index,msg,prefix){
			if(prefix){
				if(this.getMethods('setPrefixError')){
					msg = this.executeMethod('setPrefixError',prefix,index); //no i18n
				}
				if(this.data.cxPropShowInlineErrorMessage){
					return msg;
				}else{
					this.showAlert(msg);
				}
			}else{
				this.showValueError = true;
				this.setData('rowValueError',index); //no i18n
				this.showAlert(msg);
			}
		},
		// alertClosed : function(){
		// 	if(this.showValueError){
		// 		if(this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input')){
		// 			this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input').focus(); //no i18n
		// 		}
		// 		else if(this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown')){
		// 			this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown').focus(); //no i18n
		// 		}
		// 		this.showValueError = false;
		// 	}else if(this.data.showEdit){
		// 		this.$node.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus()
		// 	}
		// },
		sendPrefixValues : function(index,selectedArray,developerArgs,change,forceFetch,criteriaRow){
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
			if(this.getMethods('onChange') && change){
				this.executeMethod('onChange','Prefix Dropdown Selected'); //no i18n
			}
			return this.getDropdownData(index,selectedArray,developerArgs,forceFetch,criteriaRow);
		},
		prefixChangedFn : function(){
		    _cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Prefix Dropdown Selected'); //no i18n
			}
		},
		sendPrefixArray : function(index,selectedArray,developerArgs,criteriaIndex){
			return this.executeMethod('getNextPrefixDrop',developerArgs[0],criteriaIndex);
		},
		setCriteriaObjectField : function(criteria){
			try{
				if(criteria.field instanceof Record){
					return;
				}
			}catch(e){}
			if(this.data.cxPropFields && this.data.cxPropFields.length){
				try{
					if(criteria.field.api_name == 'None' || criteria.field.id == '-1'){
						criteria.field = {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"};
					}else{
						// criteria.field = this.data.cxPropFields.filter(this.filterFunction.bind(this,criteria.field))[0]
						var selField = this.getSelectedField(criteria.field,this.data.cxPropFields);
						if(!selField){
							console.error('cxPropFields does not contain the selected criteria field'); //no i18n
						}else{
							criteria.field = selField;
						}
					}
				}catch(e){
					console.warn('cxPropFields does not contain the selected criteria field'); //no i18n
				}
			}else{
				if(criteria.field.data_type && criteria.field.data_type == 'lookup'){
					criteria.field.api_name = criteria.field.api_name.substr(0,criteria.field.api_name.lastIndexOf('.'))
				}
			}
		},
		userComponentCustomRequestFn : function(a,b,c,d,e){
			if(this.getMethods('onCustomUserRequest')){
				return this.executeMethod('onCustomUserRequest', a,b,c,d,e);
			}
		return new Promise(function(res){
			res([]);	
		});
		},
		pushingCriteriaMeta : function(meta){
			Lyte.arrayUtils(this.data.bufferCriteriaMeta,'push',meta); //no i18n
		},
		dynamicTypeChangeCall : function(selectedField,selectedValue,selectedDynamivValue,index,dontTriggerOnChange){
			if(!dontTriggerOnChange){
				if(this.getMethods('onChange')){
					this.executeMethod('onChange','Dynamic Value Changed',selectedField,selectedValue,selectedDynamivValue,index); //no i18n
				}
			}
			if(this.getMethods('onDynamicValueTypeChanged')){
				/**
				 * @method onDynamicValueTypeChanged
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } selectedField
				 * @param { * } selectedValue
				 * @param { * } selectedDynamivValue
				 * @param { * } criteriaRow
				 */
				return this.executeMethod('onDynamicValueTypeChanged',selectedField,selectedValue,selectedDynamivValue,index,dontTriggerOnChange);
			}
		},
		beforeDynamicTypeChangeCall : function(selectedDynamivValue,selectedField,selectedComparator,criteriaIndex){
			if(this.getMethods('onBeforeDynamicValueTypeChanged')){
				return this.executeMethod('onBeforeDynamicValueTypeChanged',selectedDynamivValue,selectedField,selectedComparator,criteriaIndex);
			}
			return true;
		},
		dynamicCriteriaComponentCall : function(field,comp_name){
			if(this.getMethods('cxDynamicCriteriaComponent')){
				return this.executeMethod('cxDynamicCriteriaComponent',field,comp_name)
			}
			return comp_name;
		},
		valueCriteriaViewChangeFn : function(value,field,condition){
			if(this.getMethods('changeCriteriaValueInView')){
				return this.executeMethod('changeCriteriaValueInView',value,field,condition);
			}else{
				return value
			}
		},
		clickDynamicFieldValueFn : function(a,b,c){
			if(this.getMethods('onClickDynamicFieldValue')){
				return this.executeMethod('onClickDynamicFieldValue',a,b,c);
			}
		},
		setMethodsAndDataForChildCriteriaCall : function(node,selectedArray,arg,compValue,index){
			if(this.getMethods('setMethodsAndDataForChildCriteria')){
				this.executeMethod('setMethodsAndDataForChildCriteria',node,selectedArray,arg,compValue,index);
			}
		},
		setMethodsAndDataForChildCriteriaCallForView : function(node,selectedArray,criteria,index){
			if(this.getMethods('setMethodsAndDataForChildCriteriaForView')){
				this.executeMethod('setMethodsAndDataForChildCriteriaForView',node,selectedArray,criteria,index);
			}
		},
		lookupComponentDataFetchMt : function(a,b,c){
			if(a === 'module'){
				return this.executeMethod('fetchModuleData',b);
			}
			return this.executeMethod('fetchRecords',...arguments);
		},
		fieldToCruxCompMappingMt : function(field,element){
			if(this.getMethods('criteriaFieldCruxMapping')){
				return this.executeMethod('criteriaFieldCruxMapping',field,element);
			}
			return element;
		},
		elementDropdownOpen : function(event, element, comp){
			if(this.getMethods('onElementDropdownOpen')){
				/**
				 * @method onElementDropdownOpen
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } componentNode
				 * @param { * } event
				 * @param { * } element
				 * @param { * } component
				 */
				this.executeMethod('onElementDropdownOpen', this, event, element, comp);
			}
		},
		elementDropdownClose : function(event, element, comp){
			if(this.getMethods('onElementDropdownClose')){
				/**
				 * @method onElementDropdownClose
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } componentNode
				 * @param { * } event
				 * @param { * } element
				 * @param { * } component
				 */
				this.executeMethod('onElementDropdownClose', this, event, element, comp);
			}
		},
		getCustomPicklistValueCriteria : function(field){
			if(this.getMethods('getCustomPicklistValuesForCriteria')){
				return this.executeMethod('getCustomPicklistValuesForCriteria',field);
			}
			if(typeof cruxAssets !== "undefined" && cruxAssets.getCruxCriteriaCustomPicklist){
				return cruxAssets.getCruxCriteriaCustomPicklist(field);
			}
		}
	},
	filterFunction : function(criteriaField,field){
		if(field.api_name == 'Data_Processing_Basis'){
			if(criteriaField.api_name == 'Data_Processing_Basis_Details.Data_Processing_Basis'){
				return true;
			}
		}
		if(field.data_type == 'multi_module_lookup'){
			if(field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('->'))){
				return true;
			}
		}
		if(field.data_type == 'lookup' && !criteriaField.multiFields && (!criteriaField.data_type || criteriaField.data_type == 'lookup')){
			if(criteriaField.data_type && criteriaField.data_type == 'lookup'){
				if(field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('.'))){
					return true;
				}
				if((field.api_name.match(/role/) || field.api_name.match(/profile/)) && field.api_name == criteriaField.api_name){
					return true;
				}
				if(field.api_name == criteriaField.api_name && (field.api_name == 'What_Id' || field.api_name == 'What_Id.name')){
					return true;
				}
				if(this.data.cxPropCriteriaVersion && field.api_name == criteriaField.api_name && (field.api_name.endsWith('Who_Id') || field.api_name.endsWith('Who_Id.name'))){
					return true;
				}
			}else{
				if(field.api_name == criteriaField.api_name && (field.api_name == 'What_Id' || field.api_name == 'What_Id.name')){
					return true;
				}
				if(field.api_name == criteriaField.api_name.split('.')[0] || field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('.'))){
					return true;
				}
			}
			return false;
		}
		if((field.data_type == 'ownerlookup' || field.data_type == 'userlookup') && (this.data.cxPropRoleSupport || this.data.cxPropGroupSupport) && (!criteriaField.data_type || criteriaField.data_type == 'ownerlookup' || criteriaField.data_type == 'userlookup')){
			var role = criteriaField.api_name.indexOf('.role')
			role = role > -1 ? role : criteriaField.api_name.indexOf('.group')
			role = role > -1 ? role : criteriaField.api_name.indexOf('.type__s')
			if(role > -1 && field.api_name == criteriaField.api_name.substr(0,role)){
				return true;
			}
		}
		if(field.api_name == criteriaField.api_name){
			return true;
		}
		if(field.id == criteriaField.id && criteriaField.api_name == 'Tag'){
			return true;
		}
		return false
	},
	getSelectedField : function(criteriaField,fields){
		for(var i=0;i< fields.length;i++){
			if(fields[i].cxPropType == 'group'){
				var ch = this.getSelectedField(criteriaField,fields[i].cxPropFields);
				if(ch){
					return Object.assign({parentCriteriaFieldGroup : fields[i]},ch);
				}
			}else if(this.filterFunction(criteriaField,fields[i])){
				return fields[i];
			}
		}
	},
	getDropdownData : function(index,selectedArray,developerArgs,forceFetch,rowNum){
		if(index === 0 && !forceFetch){
			return this.showObject[this.data.cxPropPrefixArray[0].apiValue];
		}else{
			var s=developerArgs[1],arg = developerArgs[0];
			if(this.showObject[s] == undefined || !this.showObject[s] instanceof Promise || forceFetch){
				var a = this.executeMethod('getDropData',arg,this.showObject[s] ? this.showObject[s] : null,rowNum);
				if(a instanceof Promise){
					this.showObject[s] = a;
					return a.then(function(data){
						if(index == -1){
							data = this.filterAndSetFields(data);
							if(this.getMethods('onBeforeFieldDropdown')){
								return this.executeMethod('onBeforeFieldDropdown',data,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
							}
							if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
								data = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(data,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
							}
						}
						this.showObject[s]=data;
						return this.showObject[s]
					}.bind(this),function(){
						if(this.getMethods('onError')){
							this.executeMethod('onError') //no i18n
						}
						return 'Error'; //no i18n
					}.bind(this));
				}else if(a == true) {
					return this.showObject[s]
				}else{
					if(index == -1 && Array.isArray(a)){
						a = this.filterAndSetFields(a);
						if(this.getMethods('onBeforeFieldDropdown')){
							return this.executeMethod('onBeforeFieldDropdown',a,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
						}
						if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
							a = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(a,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
						}
					}
					this.showObject[s]=a;
					return this.showObject[s];
				}
			}
			if(index == -1){
				if(this.getMethods('onBeforeFieldDropdown')){
					return this.executeMethod('onBeforeFieldDropdown',this.showObject[s],rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
				}
				if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
					var a = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(this.showObject[s],rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray);
					this.showObject[s]=a;
				}
			}
			return this.showObject[s];
		}
	},
	splitRelatedFields : function(data,fields){
		var array = [];
		fields.forEach(function(item){
			item = Object.assign({},item);
			var data_type = item.data_type
			if(data_type == 'formula'){
				data_type = item.formula.return_type;
			}
			if(data_type == 'rollup_summary'){
				data_type = item.rollup_summary.return_type;//no i18n
			}
			if(data_type == data){
				array.push(item);
			}else if(data == 'number' && this.getData('numberFieldException').indexOf(item.column_name) > -1){
				array.push(item);
			}

			if(item.cxPropType == 'group'){
				var newA = this.splitRelatedFields(data,item.cxPropFields);
				if(newA.length > 0){
					array.push(Object.assign(item,{cxPropFields : newA}));
				}
			}
		}.bind(this));
		return array;
	},
	mergeRelatedFields:function(newArr,toBePushed){
		var returnNewArr = Lyte.deepCopyObject(newArr)
		toBePushed.forEach(function(item){
		    if(item.cxPropType == 'group'){
		    	var ind = returnNewArr.cruxFindIndexOfObject('cxPropLabel',item.cxPropLabel)
		    	if(ind == -1){
		    		returnNewArr.push(item)
		    	}else{
		    		returnNewArr[ind].cxPropFields = this.mergeRelatedFields(returnNewArr[ind].cxPropFields,item.cxPropFields);
		    	}
		    }else{
		    	returnNewArr.push(item)
		    }
		}.bind(this));
		return returnNewArr;
	},
	segregateSecondaryFields : function(){
		this._relatedField={}
		var arr=[],secField=this.data.cxPropSecondaryFields,secFieldLength = secField.length;
		for(var i=0;i<secFieldLength;i++){
			var selectId=secField[i].data_type; //No I18N
			if(selectId == 'formula'){
				selectId = secField[i].formula.return_type;//no i18n
			}
			if(this.getData('numberFieldException').indexOf(secField[i].column_name) > -1){
				if(!this._relatedField.number){
					this._relatedField.number = [];
				}
				this._relatedField.number.push(secField[i]);
			}else{
				if(!this._relatedField[selectId]){
					this._relatedField[selectId] = [];
				}
				this._relatedField[selectId].push(secField[i])
			}
		}
	},
	fieldObserver : function(){
		if(!this.getData('internalFieldCall') ){
			this.setData('getFields',false);//No I18N
			this.setData('criteriaArrayObject',[]);//No I18N
			if(!this.newCriteria){
				this.setData('cxPropSetCriteria',{});//No I18N
				this.setData('showEdit',false); //no i18n
				if (this.getMethods('onBuilderPropertyRemove')) {
				    this.executeMethod('onBuilderPropertyRemove', ['cx-prop-set-criteria']);
		        }
				this.setData('cxPropCriteriaMeta',[]); //no i18n
			}
			this.newCriteria = false;
			this.setDatas();
		}else{
			this.setData('internalFieldCall',false); //no i18n
		}
	}.observes('cxPropFields.[]'),//No I18N
	setCriteriaObserver : function(){
		if(!this.setCriteriaFromComp){
			this.newCriteria = true;
			this.setData('arr',[]); //no i18n
			this.setData('pattern',[' ']);//No I18N
			this.setData('patternArrDis',[' ']); //no i18n
			this.setData('patternArr',[' ']); //no i18n
			this.setData('rowNumberArray',[1]); //no i18n
			this.internalRowObj = 1
			this.setDatas();
		}
		this.setCriteriaFromComp = false;
	}.observes('cxPropSetCriteria'), //No I18N
	moduleObserver : function(){
		this.setData('cxPropFields',[]);//No I18N
		if (this.getMethods('onBuilderPropertyRemove')) {
		    this.executeMethod('onBuilderPropertyRemove', ['cx-prop-fields']);
        }
	}.observes('cxPropModule'), //no i18n
	moduleObserverDx : function(obj){
		this.setData('dxHubError',false);
		if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
			if(obj && obj.item === 'cxPropModuleApiName'){
				this.setData('cxPropFields',[]);//No I18N
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-fields']);
				}
			}
			if(this.data.cxPropModuleApiName){
				this.setData('dxHubCheck',true);
				try{
					var moduleKey = Object.keys(this.data.cxPropModuleRecordMapping).filter((item)=>{return this.data.cxPropModuleRecordMapping[item].api_name === this.data.cxPropModuleApiName})[0];
					this.setData('cxPropModule',moduleKey);
				}catch(e){
					this.setData('dxHubFieldError',true);
					return ;
				}
				this.setData('dxHubLoading',true);
				store.findAll('field',{module : this.data.cxPropModuleApiName,type : 'all'},undefined,false).then((res)=>{
					this.setData('dxHubLoading',false);
					if(res && res.field && res.field.length > 0){
						this.preventField.filterable = [false];
						this.setData('internalFieldCall',true); //No I18N
						this.setData('cxPropFields',res.field);
						this.setData('internalFieldCall',false); //No I18N
						this.setData('dxHubCheck',false);
						this.setDatas();
					}else{
						this.setData('dxHubFieldError',true);
					}
				},()=>{
					this.setData('dxHubLoading',false);
					this.setData('dxHubError',true);
				})
			}else if((!this.data.cxPropFields || this.data.cxPropFields.length == 0)){
				this.setData('dxHubFieldError',true);
				this.setData('dxHubLoading',false);
				this.setData('dxHubCheck',true);
			}
		}else{
			this.setData('dxHubCheck',false);
		}
	}.observes('cxPropModuleApiName').on('init'), //no i18n
	typeObserver : function(){
		if(this.getData('cxPropSetCriteria') == undefined || (this.getData('cxPropSetCriteria') && Object.keys(this.getData('cxPropSetCriteria')).length == 0)){
			if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
				this.setData('dxHubViewError',true);
			}
			this.setData('cxPropEmptyShowYield',true); //no i18n
		}else{
			this.setData('cxPropEmptyShowYield',false); //no i18n
			this.setData('dxHubViewError',false);
		}
	}.observes('cxPropType'), //no i18n
	prefixArrayObserver : function(){
		if(!this.data.cxPropDynamicColumns){
			this.setDatas();
		}
	}.observes('cxPropPrefixArray.[]'), //no i18n
	dropArrayObserver : function(){
		this.setDatas();
	}.observes('cxPropDropArray.[]','cxPropSecondaryFields.[]'), //no i18n
	observeAppearance : function(){
		$L(this.$node).removeClass('cxCriteriaFlatStyle')
		$L(this.$node).removeClass('cxCriteriaBoxStyle')

		var criteriaClass = 'cxCriteriaFlatStyle';  //NO I18N
        if(this.getData('cxPropAppearance') === 'box') {
            criteriaClass = 'cxCriteriaBoxStyle';   //NO I18N
        }
        $L(this.$node).addClass(`${criteriaClass} cxCriteriaEditorWrapper`);
	}.observes('cxPropAppearance'), //no i18n
	observeSpecified : function(){
		if(this.getData('cxPropSpecifiedCondition')){
			if(this.getData('cxPropSpecifiedCondition') == 'and'){
				this.setData('defaultCond','and');//No I18N
				this.setData('defaultCondition',_cruxUtils.getI18n('and')); //No I18N
				this.setData('defaultLabelCondition',_cruxUtils.getI18n('crm.label.and')) //No I18N
			}else if(this.getData('cxPropSpecifiedCondition') == 'or'){ //No I18N
				this.setData('defaultCond','or');//No I18N
				this.setData('defaultCondition',_cruxUtils.getI18n('or')); //No I18N
				this.setData('defaultLabelCondition',_cruxUtils.getI18n('crm.label.or')) //No I18N
			}
			
			for (var i = 1; i <this.data.pattern.length ; i++) {
				Lyte.arrayUtils(this.getData('pattern'),'replaceAt',i,this.data.defaultCond);//No I18N
				Lyte.arrayUtils(this.getData('patternArr'),'replaceAt',i,this.data.defaultCondition);//No I18N
				Lyte.arrayUtils(this.getData('patternArrDis'),'replaceAt',i,this.data.defaultLabelCondition);//No I18N
			}
			this.criteriaOption('specified');
		}
	}.observes('cxPropSpecifiedCondition').on('init') //no i18n
},{mixins:["crux-criteria-conditions","crux-criteria-util"],
	'alias':'crm-criteria-editor'
}); //No I18N

Lyte.Component.registerHelper('getClassForEditPattern',function(item){ //NO I18N
 	if(item == '(' || item == ')'){
 		return 'prevent'; //NO I18N
 	}else if(isNaN(parseInt(item))){
 		return 'blue prevent'; //NO I18N
 	}else{
 		return 'cxCritPtnNum'; //NO I18N
 	}
});

Lyte.Component.registerHelper('isSearchNeeded',function(fields,prefix){
	if(!fields){
		return false;
	}
	if(fields.length > 9){
		return true;
	}else{
		var len = 0
		fields.forEach(function(item){
			if(item.cxPropType == 'group'){
				if(prefix){
					len += item.cxPropOptions.length;
				}else{
					len += item.cxPropFields.length;
				}
			}else{
				len++
			}
			if(len > 10){
				return;
			}
		});
		if(len > 10){
				return true; 
		}
	}

	return false
})

/**
 * @syntax nonYielded
 * <crux-criteria-editor cx-prop-fields='[{"id":"1","api_name":"text_field","field_label":"Text Field","data_type" : "text","visible" : "true"},{"id":"2","api_name":"Label 2","field_label":"Label 2","data_type" : "double","visible" : "true"}]'></crux-criteria-editor>
 */
