/**
 * @component crux-subform
 * @author gowtham
 * @summary this component is used to render subform which can be used in view or edit mode.
 * 
 * 1.Before adding any component check if it has any dropdown or modal, callback needs to thrown to prevent
 * 	 scroll and prevent enter keydown listener when opened
 */
Lyte.Component.register("crux-subform", {
_template:"<template tag-name=\"crux-subform\"> <div class=\"cxSubform cxSubformWrapMode {{if(cruxAnd(cxPropPreviewMode,expHandlers(cxPropAllowActionOnPreview,'!')),'cxSubformPreviewMode')}} {{if(expHandlers(cxPropType,'!=','view'),'cxSubformEditMode')}} {{if(expHandlers(expHandlers(cxPropType,'==','view'),'&amp;&amp;',expHandlers(cxPropAjaxEdit,'!')),'cxSubformViewMode','')}} {{if(cruxOr(expHandlers(cruxTableContent,'!'),expHandlers(cruxTableContent.length,'==',0),showNoRecord),'cxTableNoResultsWrapper','')}} {{if(hasMoreRecords,'has-showall','')}}\"> <crux-table-component id=\"subform_{{subformUniqueId}}_{{subformId}}\" cx-prop-custom-copy=\"true\" header-tab-index=\"{{if(cxPropPreviewMode,expHandlers(1,'-'),0)}}\" cx-prop-show-mandatory-on-header=\"{{if(expHandlers(cxPropType,'==','view'),false,true)}}\" cx-prop-header-cell-prefix-yield=\"{{if(expHandlers(cxPropType,'==','view'),mandatoryAsterixSymbol)}}\" cx-prop-textarea-properties=\"{{textAreaProps}}\" cx-prop-cell-zcqa-with-row-no=\"true\" cx-prop-sort-zcqa-prefix=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}\" show-no-record=\"{{showNoRecord}}\" cx-prop-date-properties=\"{{cxPropDateProperties}}\" cx-prop-image-properties=\"{{cxPropImageProperties}}\" cx-prop-datetime-properties=\"{{cxPropDatetimeProperties}}\" cx-prop-show-sort-icon=\"{{cxPropTableProperties.enableSort}}\" cx-prop-filter-properties=\"{{filterProperties}}\" cx-prop-freeze-row=\"{{freezeRow}}\" cx-prop-number-properties=\"{{cxPropNumberProperties}}\" cx-prop-table-class=\"cxSubformTable {{cxPropClass}}\" cx-prop-header-id-selector=\"id\" cx-prop-view-port-loading=\"{{ifEquals(cxPropType,'view')}}\" cx-prop-sort-columns=\"true\" cx-prop-height=\"{{cxPropHeight}}\" cx-prop-module=\"{{cxPropModuleData.module_name}}\" cx-prop-record-id=\"{{cxPropContent.id}}\" cx-prop-header-properties=\"{{headerProperties}}\" cx-prop-layout=\"{{cxPropLayout}}\" cx-prop-formula-mapping=\"{{formulaMapping}}\" cx-prop-header-yield=\"{{cxPropTableProperties.headerYield}}\" cx-prop-enable-field-sort=\"{{cruxAnd(cxPropTableProperties.enableSort,cruxTableEnableFieldSort)}}\" cx-prop-cell-suffix-yield=\"{{if(cxPropTableProperties,cxPropTableProperties.cellSuffixYield)}}\" cx-prop-cell-properties=\"{{cxPropCellProperties}}\" cx-prop-table-width=\"auto\" cx-prop-lookup-properties=\"{{cxPropLookupProperties}}\" cx-prop-all-rows-editable=\"{{cruxOr(expHandlers(cxPropType,'==','create'),expHandlers(cxPropType,'==','edit'))}}\" cx-prop-filter-button=\"true\" cx-prop-selected-rows=\"{{selectedRows}}\" cx-prop-selected-row-class=\"cxSubformHighlightRow\" cx-prop-prevent-scrollbar=\"true\" cx-prop-show-filter-icon=\"{{cxPropShowFilterIcon}}\" cx-prop-table-id=\"{{cxPropSection.display_label}}\" cx-prop-header-row-id=\"headerRow\" cx-prop-enable-body-scroll=\"false\" cx-prop-filter-component=\"{{if(cxPropShowFilterIcon,'crux-lookupfilter-component')}}\" cx-prop-sorted-column=\"{{sortedColumn}}\" cx-prop-sorted-order=\"{{sortedOrder}}\" cx-prop-ajax-edit-id=\"{{cruxTableAjaxEditId}}\" cx-prop-show-filter=\"{{cruxTableShowFilter}}\" cx-prop-filter-show-clear=\"true\" cx-prop-header=\"{{cruxTableHeaderFields}}\" cx-prop-content=\"{{cruxTableContent}}\" cx-prop-field-type-mapping=\"{{cxPropFieldTypeMapping}}\" cx-prop-show-loading=\"{{cxPropShowLoading}}\" on-scroll=\"{{method('handleTableScroll')}}\" on-lookup-hover-fetch-bc-data=\"{{method('lookupHoverFetchBcData')}}\" toggle-filter=\"{{action('toggleFilter')}}\" fetch-module-data=\"{{method('fetchmodule')}}\" fetch-records=\"{{method('fetchrecord')}}\" apply-filter=\"{{method('applyRecordFilter')}}\" clear-filter=\"{{method('clearRecordFilter')}}\" set-lookup-filter-conditions=\"{{method('lookupFilterCondition')}}\" on-mouse-over=\"{{action('showActions')}}\" on-mouse-out=\"{{action('hideActions')}}\" on-body-row-click=\"{{action('bodyRowClick')}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" on-show-less=\"{{method('showLess')}}\"> <template is=\"yield\" yield-name=\"headerLabelSuffixYield\"> ({{currencySymbol}}) </template> <template is=\"yield\" yield-name=\"headerCellPrefixYield\"> <template is=\"if\" value=\"{{fieldObj.required}}\"><template case=\"true\"> <span class=\"cxSfMandatory\">*</span> </template></template> </template> <template is=\"yield\" yield-name=\"edit-yield\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(fieldObj.yield,'||',fieldObj.yieldName),'&amp;&amp;',expHandlers(fieldObj.yieldName,'!==','lookup')),'&amp;&amp;',expHandlers(fieldObj.yieldName,'!==','invlookup')),'&amp;&amp;',expHandlers(fieldObj.yieldName,'!==','serialNumber')),'&amp;&amp;',expHandlers(fieldObj.yieldName,'!==','discount'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(fieldObj.yieldName,'===','user')}}\"><template case=\"true\"> <crux-user-component cx-prop-from=\"view\" cx-prop-data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-value=\"{{if(recordObj[fieldObj.api_name],recordObj[fieldObj.api_name],fieldObj.default_value)}}\"> </crux-user-component> <div>{{recordObj.Created_Time}}</div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(fieldObj.yieldName,'===','ajaxActions')}}\"><template case=\"true\"> <div class=\"cxSubformSaveCancelWrap cxFlex ajaxActions {{if(disableSaveCancel,'cxPeNone','')}}\"> <div class=\"cxSubformSave cxFlexCenter\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_save_{{expHandlers(indexVal,'+',1)}}\" onclick=\"{{action('triggerSave',undefined,undefined,indexVal)}}\"></div> <div class=\"cxSubformCancel cxFlexCenter\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_cancel_{{expHandlers(indexVal,'+',1)}}\" onclick=\"{{action('triggerRollback',recordObj.id)}}\"></div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(fieldObj.yieldName,'===','actions')}}\"><template case=\"true\"> <div class=\"cxSubformTableRowActions {{if(ifEquals(recordObj.id,subformHoverRowId),'','cxSubformTableRowActionsHidden')}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!==','view')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowDeleteRowButton,'&amp;&amp;',expHandlers(expHandlers(isStaticSubform,'!'),'||',expHandlers(isStaticSubform,'&amp;&amp;',expHandlers(recordObj.isStaticRow,'!'))))}}\"><template case=\"true\"> <div class=\"cxSubformRemoveIcon {{if(cruxOr(disableDelete,cxPropDisableDelete,cxPropDisableEdit,cruxAnd(cxPropDisableCreate,expHandlers(cxPropType,'===','create'))),'cxSubformIconDisabled')}}\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_remove_{{expHandlers(indexVal,'+',1)}}\" lt-prop-title=\"{{if(cruxOr(cxPropDisableDelete,cxPropDisableEdit),cruxGetI18n('crm.sf.permission.no.delete'),deleteBtnTitle)}}\" onclick=\"{{action('removeRow',indexVal,dataObj.id)}}\"> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropSection,'&amp;&amp;',cxPropSection.properties),'&amp;&amp;',cxPropSection.properties.reorder_rows),'&amp;&amp;',expHandlers(cxPropDisableEdit,'!')),'&amp;&amp;',expHandlers(expHandlers(cxPropDisableCreate,'&amp;&amp;',expHandlers(cxPropType,'===','create')),'!'))}}\"><template case=\"true\"> <div class=\"cxSubformDragIcon\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_reorder_{{expHandlers(indexVal,'+',1)}}\"> </div> </template></template> </template></template> <lyte-yield yield-name=\"actionsMenu\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"> </lyte-yield> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"body-{{fieldObj.subformYieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\" ajax-edit=\"{{if(true,true)}}\" onfocus=\"{{action('subformFieldFocus',this)}}\"></lyte-yield> </template></template></template></template></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(fieldObj.yieldName,'===','serialNumber')}}\"><template case=\"true\"> <lyte-number class=\"cxSubformSerialNoInput\" lt-prop-readonly=\"true\" lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\" columnname=\"{{fieldObj.column_name}}\" data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\"> </lyte-number> </template><template case=\"false\"> <template is=\"if\" value=\"{{cruxAnd(ifEquals(fieldObj.cxTypeMapping,'number'),expHandlers(disableErrorCallback,'!'))}}\"><template case=\"true\"> <div class=\"cxFlexVCenter cxSubformValidateField\"> <template class=\"cxSubformField\" is=\"component\" cx-prop=\"{{fieldObj.cxProp}}\" lyte-view-port=\"{{cruxOr(ifEquals(cxPropType,'edit'),ifEquals(cxPropType,'create'))}}\" cx-prop-custom-request=\"{{cxPropUserProperties.customRequest}}\" cx-prop-forced-fetch=\"{{cxPropUserProperties.forcedFetch}}\" cx-prop-prevent-parent-scroll=\"true\" cx-prop-freeze=\"true\" cx-prop-is-display-format-enabled=\"true\" cx-prop-display-currency=\"false\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-boundary=\"{{cxPropNumberProperties.boundary}}\" cx-prop-calendar-properties=\"{{calendarProperties}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-filterable=\"false\" cx-prop-is-subordinate=\"{{cxPropUserProperties.isSubordinate}}\" component-name=\"crux-{{if(fieldObj.subformMapping,fieldObj.subformMapping,fieldObj.cxTypeMapping)}}-component\" cx-prop-appearance=\"box\" cx-prop-layout=\"{{cxPropLayout}}\" cx-prop-enable-country-code=\"{{cxPropPhoneProperties.enableCountryCode}}\" cx-prop-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-maxcharacter=\"250\" cx-prop-picklist-values=\"{{cxPropCustomProperties.subformRow[recordObj.id][fieldObj.api_name].pickListValues}}\" cx-prop-disabled=\"{{getSubformFieldData('disabled',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-module=\"{{fieldObj.lookup.module.api_name}}\" cx-prop-from=\"create\" cx-prop-field=\"{{fieldObj}}\" cx-prop-maxlength=\"{{fieldObj.length}}\" cx-prop-icon-class=\"{{fieldObj.iconClass}}\" cx-prop-show-close-icon=\"{{if(expHandlers(fieldObj.cxTypeMapping,'==','user'),true,false)}}\" cx-prop-value=\"{{parseValueForSubform(recordObj[fieldObj.api_name],fieldObj)}}\" cx-prop-is-color-code-enabled=\"{{fieldObj.enable_colour_code}}\" cx-prop-type=\"{{fieldObj.cxType}}\" cx-prop-right-icon-class=\"{{if(expHandlers(fieldObj.cxTypeMapping,'==','number'),'cxSubformHideCalculatorIcon','')}}\" cx-prop-date-in-user-pattern=\"true\" cx-prop-datetime-in-user-pattern=\"true\" cx-prop-show-calculator=\"{{fieldObj.showCalculator}}\" cx-prop-enable-lbind=\"{{fieldObj.autoUpdate}}\" cx-prop-query-param=\"{{fieldObj.queryParam}}\" on-custom-request=\"{{method('customRequest')}}\" on-custom-user-request=\"{{method('customUserRequest')}}\" fetch-module-data=\"{{method('fetchmodule')}}\" fetch-records=\"{{method('fetchrecord')}}\" cx-prop-return-full-object-on-get=\"true\" cx-prop-footer-yield=\"{{cxPropQuickCreateYield}}\" cx-prop-create-yield=\"{{cxPropQuickCreateYield}}\" cx-prop-default-fields=\"{{defaultFields[fieldObj.api_name]}}\" cx-prop-tooltip=\"{{getSubformFieldData('tooltip',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" cx-prop-error-message=\"{{if(cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].error,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].error,'')}}\" onfocus=\"{{action('subformFieldFocus',this)}}\" on-before-show=\"{{method('beforeShow',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-before-hide=\"{{method('beforeHide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-dropdown-hide=\"{{method('hide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-before-dropdown-open=\"{{method('beforeShow',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-show=\"{{method('show',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-hide=\"{{method('hide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-calendar-open=\"{{method('show')}}\" on-calendar-close=\"{{method('hide')}}\" on-value-change=\"{{method('fieldValueChange',fieldObj,recordObj,expHandlers(indexVal,'+',1),fieldObj.cxTypeMapping,this)}}\" on-clear=\"{{method('fieldValueChange',fieldObj,recordObj,expHandlers(indexVal,'+',1),fieldObj.cxTypeMapping,this)}}\" onmouseenter=\"{{action('setInvTooltipValue',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" onmouseleave=\"{{action('hideInvTootlipValue',fieldObj)}}\" before-request-change-data=\"{{method('lookupRequestData')}}\" on-crop-success=\"{{method('cropSuccess')}}\" on-preview-close=\"{{method('previewClose')}}\" on-expand-image-view=\"{{method('expandImageView')}}\" on-error=\"{{method('errorCallback')}}\"> <template is=\"yield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.cxTypeMapping,'==',&quot;lookup&quot;),'&amp;&amp;',cxPropQuickCreateYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"footer\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" crux-lookup-elm-id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\"></lyte-yield> </template></template> </template> <template is=\"yield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.cxTypeMapping,'==',&quot;lookup&quot;),'&amp;&amp;',cxPropQuickCreateYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"createYield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" crux-lookup-elm-id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\"></lyte-yield> </template></template> </template> <template is=\"registerYield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" cx-prop-error-message=\"{{errorMessage}}\" cx-prop-field=\"{{cxField}}\"></lyte-yield> </template> </template> <template is=\"if\" value=\"{{expHandlers(expHandlers(isDefaultInvSubform,'&amp;&amp;',expHandlers(getSubformFieldData('disabled',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType,true),'!')),'&amp;&amp;',expHandlers(expHandlers(expHandlers(expHandlers(fieldObj.ui_type,'===',36),'||',expHandlers(fieldObj.ui_type,'===',143)),'||',expHandlers(fieldObj.ui_type,'===',144)),'||',expHandlers(fieldObj.ui_type,'===',145)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.column_name,'===','TAX'),'||',expHandlers(fieldObj.column_name,'===','DISCOUNT'))}}\"><template case=\"true\"> <span id=\"{{subformApiName}}_inveditIcon_{{fieldObj.api_name}}_{{indexVal}}\" onclick=\"{{action('renderInvSubformPopover',fieldObj,recordObj,this)}}\" class=\"cxSubformEditIcon\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{showListPriceIcon(fieldObj.column_name,recordObj.Product_Name,recordObj.$.error.Product_Name,isValidBookidField)}}\"><template case=\"true\"> <span class=\"zcicncss-pricebooks zcicn-cssIcons cP mL5 mR5\" onclick=\"{{action('showPriceBookLookup',recordObj,fieldObj)}}\"></span> </template></template></template></template> </template></template> </div> </template><template case=\"false\"> <div class=\"cxSfCPQYeildWrapper\"> <div class=\"cxSfCPQYeildContent\"> <div class=\"cxFlexVCenter cxSubformValidateField\"> <template class=\"cxSubformField\" is=\"component\" cx-prop=\"{{fieldObj.cxProp}}\" lyte-view-port=\"{{cruxOr(ifEquals(cxPropType,'edit'),ifEquals(cxPropType,'create'))}}\" cx-prop-disabled-list=\"{{cxPropLookupProperties[fieldObj.api_name].disabledList}}\" cx-prop-custom-request=\"{{cxPropUserProperties.customRequest}}\" cx-prop-forced-fetch=\"{{cxPropUserProperties.forcedFetch}}\" cx-prop-prevent-parent-scroll=\"true\" cx-prop-freeze=\"true\" cx-prop-is-display-format-enabled=\"true\" cx-prop-display-currency=\"false\" cx-prop-search-format=\"true\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-boundary=\"{{cxPropNumberProperties.boundary}}\" cx-prop-calendar-properties=\"{{calendarProperties}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-filterable=\"false\" cx-prop-is-subordinate=\"{{cxPropUserProperties.isSubordinate}}\" component-name=\"crux-{{if(fieldObj.subformMapping,fieldObj.subformMapping,fieldObj.cxTypeMapping)}}-component\" cx-prop-appearance=\"box\" cx-prop-layout=\"{{cxPropLayout}}\" cx-prop-enable-country-code=\"{{cxPropPhoneProperties.enableCountryCode}}\" cx-prop-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-maxcharacter=\"250\" cx-prop-picklist-values=\"{{cxPropCustomProperties.subformRow[recordObj.id][fieldObj.api_name].pickListValues}}\" cx-prop-disabled=\"{{getSubformFieldData('disabled',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-id=\"{{subformUniqueId}}_{{subformId}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-module=\"{{fieldObj.lookup.module.api_name}}\" cx-prop-from=\"create\" cx-prop-field=\"{{fieldObj}}\" cx-prop-maxlength=\"{{fieldObj.length}}\" cx-prop-icon-class=\"{{fieldObj.iconClass}}\" cx-prop-show-close-icon=\"{{if(expHandlers(fieldObj.cxTypeMapping,'==','user'),true,false)}}\" cx-prop-value=\"{{parseValueForSubform(recordObj[fieldObj.api_name],fieldObj)}}\" cx-prop-is-color-code-enabled=\"{{fieldObj.enable_colour_code}}\" cx-prop-type=\"{{fieldObj.cxType}}\" cx-prop-right-icon-class=\"{{if(expHandlers(fieldObj.cxTypeMapping,'==','number'),'cxSubformHideCalculatorIcon')}}\" cx-prop-date-in-user-pattern=\"{{if(cxPropDateProperties,cxPropDateProperties.dateInUserPattern,true)}}\" cx-prop-datetime-in-user-pattern=\"{{if(cxPropDatetimeProperties,cxPropDatetimeProperties.datetimeInUserPattern,true)}}\" cx-prop-show-calculator=\"{{fieldObj.showCalculator}}\" cx-prop-enable-lbind=\"{{fieldObj.autoUpdate}}\" cx-prop-query-param=\"{{fieldObj.queryParam}}\" cx-prop-default-criteria=\"{{if(expHandlers(cxPropCustomProperties.subformField[fieldObj.api_name].criteria,'&amp;&amp;',cxPropCustomProperties.subformField[fieldObj.api_name].criteria.criteriaObj),cxPropCustomProperties.subformField[fieldObj.api_name].criteria.criteriaObj,'[]')}}\" cx-prop-default-criteria-str=\"{{if(expHandlers(cxPropCustomProperties.subformField[fieldObj.api_name].criteria,'&amp;&amp;',cxPropCustomProperties.subformField[fieldObj.api_name].criteria.criteria),cxPropCustomProperties.subformField[fieldObj.api_name].criteria.criteria,'')}}\" on-custom-request=\"{{method('customRequest')}}\" on-custom-user-request=\"{{method('customUserRequest')}}\" fetch-module-data=\"{{method('fetchmodule')}}\" fetch-records=\"{{method('fetchrecord',fieldObj)}}\" cx-prop-return-full-object-on-get=\"true\" cx-prop-footer-yield=\"{{if(expHandlers(fieldObj.cxTypeMapping,'==','lookup'),cxPropQuickCreateYield)}}\" cx-prop-create-yield=\"{{cxPropQuickCreateYield}}\" cx-prop-default-fields=\"{{defaultFields[fieldObj.api_name]}}\" cx-prop-tooltip=\"{{getSubformFieldData('tooltip',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" cx-prop-error-message=\"{{if(cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].error,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].error,'')}}\" onfocus=\"{{action('subformFieldFocus',this)}}\" on-before-show=\"{{method('beforeShow',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-before-hide=\"{{method('beforeHide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-dropdown-hide=\"{{method('hide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-before-dropdown-open=\"{{method('beforeShow',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-show=\"{{method('show',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-hide=\"{{method('hide',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" on-calendar-open=\"{{method('show')}}\" on-calendar-close=\"{{method('hide')}}\" on-value-change=\"{{method('fieldValueChange',fieldObj,recordObj,expHandlers(indexVal,'+',1),fieldObj.cxTypeMapping,this)}}\" on-clear=\"{{method('fieldValueChange',fieldObj,recordObj,expHandlers(indexVal,'+',1),fieldObj.cxTypeMapping,this)}}\" onmouseenter=\"{{action('setInvTooltipValue',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\" onmouseleave=\"{{action('hideInvTootlipValue',fieldObj)}}\" before-request-change-data=\"{{method('lookupRequestData')}}\" on-crop-success=\"{{method('cropSuccess')}}\" on-preview-close=\"{{method('previewClose')}}\" on-expand-image-view=\"{{method('expandImageView')}}\"> <template is=\"yield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.cxTypeMapping,'==',&quot;lookup&quot;),'&amp;&amp;',cxPropQuickCreateYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"footer\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" crux-lookup-elm-id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\"></lyte-yield> </template></template> </template> <template is=\"yield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.cxTypeMapping,'==',&quot;lookup&quot;),'&amp;&amp;',cxPropQuickCreateYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"createYield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" crux-lookup-elm-id=\"{{subformApiName}}_{{fieldObj.api_name}}_{{expHandlers(indexVal,'+',1)}}\"></lyte-yield> </template></template> </template> <template is=\"registerYield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" cx-prop-error-message=\"{{errorMessage}}\" cx-prop-field=\"{{cxField}}\"></lyte-yield> </template> </template> <template is=\"if\" value=\"{{expHandlers(expHandlers(isDefaultInvSubform,'&amp;&amp;',expHandlers(getSubformFieldData('disabled',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType,true),'!')),'&amp;&amp;',expHandlers(expHandlers(expHandlers(expHandlers(fieldObj.ui_type,'===',36),'||',expHandlers(fieldObj.ui_type,'===',143)),'||',expHandlers(fieldObj.ui_type,'===',144)),'||',expHandlers(fieldObj.ui_type,'===',145)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.column_name,'===','TAX'),'||',expHandlers(fieldObj.column_name,'===','DISCOUNT'))}}\"><template case=\"true\"> <span id=\"{{subformApiName}}_inveditIcon_{{fieldObj.api_name}}_{{indexVal}}\" onclick=\"{{action('renderInvSubformPopover',fieldObj,recordObj,this)}}\" class=\"cxSubformEditIcon\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{showListPriceIcon(fieldObj.column_name,recordObj.Product_Name,recordObj.$.error.Product_Name,isValidBookidField)}}\"><template case=\"true\"> <span class=\"zcicncss-pricebooks zcicn-cssIcons cP mL5 mR5\" onclick=\"{{action('showPriceBookLookup',recordObj,fieldObj)}}\"></span> </template></template></template></template> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(isDefaultInvSubform,'&amp;&amp;',expHandlers(fieldObj.ui_type,'===',133)),'&amp;&amp;',inventorySubform('LOOKUP','compare',fieldObj)),'&amp;&amp;',invDescSubfield)}}\"><template case=\"true\"> <div class=\"cxSubformValidateField\"> <crux-text-area-component class=\"cxSubformProdTxtarea cxSubformField\" cx-prop-from=\"create\" cx-prop-appearance=\"box\" cx-prop-field=\"{{invDescSubfield}}\" cx-prop-disabled=\"{{getSubformFieldData('disabled',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" cx-prop-tooltip=\"{{getSubformFieldData('tooltip',fieldObj,recordObj,cxPropCustomProperties,cxPropDisableEdit,cxPropCustomProperties.subformRow[recordObj.id].readOnly,cxPropCustomProperties.subformField[fieldObj.api_name].readOnly,cxPropCustomProperties.subformCell[recordObj.id][fieldObj.api_name].readOnly,cxPropDisableCreate,cxPropType)}}\" cx-prop-value=\"{{recordObj[invDescSubfield.api_name]}}\" cx-prop-placeholder=\"{{cruxGetI18n('Description')}}\" cx-prop-maxlength=\"{{invDescSubfield.length}}\" onfocus=\"{{action('subformFieldFocus',this)}}\" on-value-change=\"{{method('fieldValueChange',invDescSubfield,recordObj,expHandlers(indexVal,'+',1),'text-area',this)}}\"> </crux-text-area-component> </div> </template></template> </div> <template is=\"if\" value=\"{{fieldObj.cxPropCellSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\" ajax-edit=\"{{if(true,true)}}\"> </lyte-yield></template></template> </div> </template></template> </template></template></template></template> </template> <template is=\"yield\" yield-name=\"body-subform\"> <lyte-yield yield-name=\"body-{{fieldObj.subformYieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"> </lyte-yield> </template> <template is=\"yield\" yield-name=\"cellSuffixYield\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"> </lyte-yield> </template> <template is=\"yield\" yield-name=\"body-actions\"> <div class=\"cxSubformTableRowActions {{if(cruxAnd(ifEquals(recordObj.id,subformHoverRowId)),'','cxSubformTableRowActionsHidden')}}\"> <template is=\"if\" value=\"{{cxPropShowActionButton}}\"><template case=\"true\"> <div class=\"cxSubformMoreActionIcon moreAction_{{subformUniqueId}}_{{subformId}}\" data-id=\"{{recordObj.id}}\" data-index=\"{{indexVal}}\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_more_{{expHandlers(indexVal,'+',1)}}\"></div> </template></template> </div> </template> <template is=\"yield\" yield-name=\"body-discount\"> <div class=\"cxFlexVCenter cxSFDiscountWrap\" lt-prop-title=\"{{if(discountTaxTooltipValue,discountTaxTooltipValue,'')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;followcursor&quot;}\" onmouseenter=\"{{action('setInvTooltipValue',recordObj,fieldObj,expHandlers(indexVal,'+',1))}}\"> <crux-number-component cx-prop-show-mask-unmask-icon=\"false\" cx-prop-toggle-masking=\"{{expHandlers(fieldObj.mask_details,'&amp;&amp;',expHandlers(unmaskedApiname[fieldObj.api_name],'!'))}}\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-currency-code=\"{{cxPropNumberProperties.currencyCode}}\" cx-prop-default-org-currency=\"{{cxPropNumberProperties.defaultOrgCurrency}}\" cx-prop-default-round-off=\"{{cxPropNumberProperties.defaultRoundOff}}\" cx-prop-exchange-rate=\"{{cxPropNumberProperties.exchangeRate}}\" cx-prop-display-currency=\"false\" cx-prop-data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-value=\"{{recordObj[fieldObj.api_name]}}\" cx-prop-field=\"{{fieldObj}}\" cx-prop-view-info-tooltip=\"false\"> </crux-number-component> <template is=\"if\" value=\"{{showDiscountPerTooltip}}\"><template case=\"true\"><span class=\"cxSubformInfoIcon\" id=\"pricingInfo_{{subformUniqueId}}_{{expHandlers(indexVal,'+',1)}}\" onclick=\"{{action('showPriceBookTooltip',recordObj,expHandlers(indexVal,'+',1))}}\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_pricebookinfo_{{expHandlers(indexVal,'+',1)}}\"></span></template></template> </div> </template> <template is=\"yield\" class=\"cxSubformYeildReset\" yield-name=\"body-serialNumber\"> <span class=\"cxSubformSerialNoInput\" data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\">{{recordObj[fieldObj.api_name]}}</span> </template> <template is=\"yield\" yield-name=\"body-invlookup\"> <template is=\"if\" value=\"{{recordObj[fieldObj.api_name]}}\"><template case=\"true\"><crux-lookup-component cx-prop-field=\"{{fieldObj}}\" cx-prop-route-name=\"{{cxPropLookupProperties.routeName}}\" cx-prop-value=\"{{getProductValue(recordObj,fieldObj)}}\" lookup-id=\"{{recordObj[fieldObj.api_name].id}}\" cx-prop-zcqa=\"{{cxPropLookupProperties.zcqa}}\" cx-prop-module=\"{{if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',cxPropLookupProperties[fieldObj.api_name].module),cxPropLookupProperties[fieldObj.api_name].module,cxPropLookupProperties.module)}}\" cx-prop-dynamic-params=\"{{getTableLookupProperty(cxPropLookupProperties,recordObj,fieldObj,'dynamicParams')}}\" cx-prop-query-params=\"{{getTableLookupProperty(cxPropLookupProperties,recordObj,fieldObj,'queryParams')}}\" cx-prop-id=\"{{cxPropLookupProperties.id}}\" cx-prop-transition-data=\"{{if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',cxPropLookupProperties[fieldObj.api_name].transitionData),cxPropLookupProperties[fieldObj.api_name].transitionData,cxPropLookupProperties.transitionData)}}\" cx-prop-target=\"{{if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',cxPropLookupProperties[fieldObj.api_name].target),cxPropLookupProperties[fieldObj.api_name].target,cxPropLookupProperties.target)}}\" cx-prop-icon-class=\"{{if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',cxPropLookupProperties[fieldObj.api_name].iconClass),cxPropLookupProperties[fieldObj.api_name].iconClass,cxPropLookupProperties.iconClass)}}\" cx-prop-show-bc=\"{{if(cxPropLookupProperties,if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',expHandlers(cxPropLookupProperties[fieldObj.api_name].showBc,'!=',undefined)),cxPropLookupProperties[fieldObj.api_name].showBc,if(expHandlers(cxPropLookupProperties.showBc,'!=',undefined),cxPropLookupProperties.showBc,true)),true)}}\" cx-prop-hide-icon-for-view=\"{{if(expHandlers(cxPropLookupProperties[fieldObj.api_name],'&amp;&amp;',cxPropLookupProperties[fieldObj.api_name].hideIconForView),cxPropLookupProperties[fieldObj.api_name].hideIconForView,cxPropLookupProperties.hideIconForView)}}\" on-lookup-hover-fetch-bc-data=\"{{method('lookupHoverFetchBcData')}}\" cx-prop-hover-callback=\"{{cxPropLookupProperties.hoverCallback}}\"></crux-lookup-component></template></template> {{addMurhyInfo(\"crux-subform.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{invDescSubfield}}\"><template case=\"true\"> <crux-text-area-component on-show-less=\"{{method('showLess')}}\" cx-prop-data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-line-clamp=\"7\" class=\"cxSubformField\" style=\"display: block;\" cx-prop-from=\"view\" cx-prop-highlight-url=\"true\" cx-prop-value=\"{{recordObj[invDescSubfield.api_name]}}\" cx-prop-appearance=\"box\"></crux-text-area-component> </template></template> </template> <template is=\"yield\" yield-name=\"body-user\"> <crux-user-component cx-prop-from=\"view\" cx-prop-data-zcqa=\"value_{{cxPropSection.display_label}}_{{fieldObj.fieldLabel}}_{{expHandlers(indexVal,'+',1)}}\" cx-prop-value=\"{{if(recordObj[fieldObj.api_name],recordObj[fieldObj.api_name],fieldObj.default_value)}}\"> </crux-user-component> <div class=\"cxSubFormCreateTime\">{{recordObj.Created_Time}}</div> </template> </crux-table-component> <template is=\"if\" value=\"{{expHandlers(cxPropLimitRows,'&amp;&amp;',hasMoreRecords)}}\"><template case=\"true\"> <div class=\"dB cxSubformShowAllActionLabel {{if(showAllLoading,'cxPeNone')}}\" onclick=\"{{action('showAll')}}\"> <template is=\"if\" value=\"{{expHandlers(showAllLoading,'!')}}\"><template case=\"true\"> {{cruxGetI18n('crm.label.subform.row.show.all',if(subformRowCount,subformRowCount,cxPropContent[subformApiName].length))}} </template><template case=\"false\"> <div class=\"cxDotLoaderWrap\"> <div class=\"cxDotBullet cxDotLoader1\"></div> <div class=\"cxDotBullet cxDotLoader2\"></div> <div class=\"cxDotBullet cxDotLoader3\"></div> <div class=\"cxDotBullet cxDotLoader4\"></div> </div> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropType,'===','create'),'||',expHandlers(cxPropType,'===',&quot;edit&quot;)),'||',cxPropAjaxEdit)}}\"><template case=\"true\"> <div class=\"cxSubformFooterActionSection\"> <div class=\"cxSubformFooterSectionLeft\"> <template is=\"if\" value=\"{{cxPropShowAddRowButton}}\"><template case=\"true\"> <lyte-button id=\"addbtn\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_addrow\" onclick=\"{{action('addRow')}}\" lt-prop-class=\"outlineprimary newbutton\" lt-prop-title=\"{{if(cxPropDisableCreate,cruxGetI18n('crm.sf.permission.no.create'),addBtnTitle)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;right&quot;}\" lt-prop-disabled=\"{{cruxOr(cxPropDisableCreate,disableAddRow,cxPropDisableAjaxEdit,disableAjaxEdit)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.label.subform.addrows')}} </template> </lyte-button> </template></template> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-yield yield-name=\"footerYield\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropShowScrollToTop}}\"><template case=\"true\"> <div data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_gototop\" class=\"cxSubformScrollTopActionLabel {{if(showScrollToTop,'cxFlexCenter','dN')}}\" onclick=\"{{action('scrollToTop')}}\"> <span class=\"cxSubformTopArrowIcon\"></span> {{cruxGetI18n(\"crm.label.subform.goto.top\")}} </div> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(aggregateFields,'&amp;&amp;',aggregateFields.length)}}\"><template case=\"true\"> <div class=\"cxSubformAggDiv\"> <lyte-table lt-prop-yield=\"true\" class=\"cxSubformAggTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"for\" items=\"{{aggregateFields}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.data_type,'&amp;&amp;',expHandlers(field.data_type,'!=','subform')),'&amp;&amp;',field.subform),'&amp;&amp;',field.visible)}}\"><template case=\"true\"> <lyte-tr id=\"{{subformUniqueId}}_{{field.id}}\" class=\"{{field.class}} {{if(expHandlers(cruxAnd(field.view_type,field.view_type[cxPropType]),'!'),'dN')}}\" onmouseover=\"{{action('showActions',field.id,this,true)}}\" onmouseleave=\"{{action('hideActions',field.id,this,true)}}\"> <lyte-td class=\"cxSubformAggTDLabel\"> <div class=\"cxSubformAggTDLabelWrap\"> <template is=\"if\" value=\"{{expHandlers(mandatoryAsterixSymbol,'&amp;&amp;',field.required)}}\"><template case=\"true\"> <span class=\"cxSfMandatory\">*</span> </template></template> <span>{{field.fieldLabel}}<template is=\"if\" value=\"{{isCurrencySymbolNeeded(cxPropModuleData,field,cxPropType)}}\"><template case=\"true\"><span class=\"cxSfCurrencySymbol\"> ({{currencySymbol}})</span></template></template></span> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'==','Info Icon')),'&amp;&amp;',field.tooltip.value)}}\"><template case=\"true\"> <div class=\"cxSubformInfoIcon\" lt-prop-title=\"{{field.tooltip.value}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;top&quot; } \"></div> </template></template> </div> </lyte-td> <lyte-td class=\"cxSubformField\" style=\"{{field.style}}\"> <div class=\"cxSubformValidateField\"> <template is=\"if\" value=\"{{expHandlers(cruxOr(expHandlers(cxPropType,'==','create'),expHandlers(cxPropType,'==','edit')),'||',expHandlers(aggrTableAjaxEditId,'===',field.id))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAnd(ifEquals(fieldObj.cxTypeMapping,'number'),expHandlers(disableErrorCallback,'!'))}}\"><template case=\"true\"> <template is=\"component\" cx-prop=\"{{cruxStringify(cxPropFieldProperties)}}\" cx-prop-focus=\"{{if(cruxOr(expHandlers(cxPropType,'===','create'),expHandlers(cxPropType,'===','edit')),false,true)}}\" cx-prop-from=\"create\" cx-prop-boundary=\"{{cxPropNumberProperties.boundary}}\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-error-yield=\"{{errorYield}}\" cx-prop-focus-at-end=\"true\" cx-prop-display-currency=\"false\" cx-prop-right-icon-class=\"{{if(cruxAnd(cruxOr(expHandlers(cxPropType,'==','create'),expHandlers(cxPropType,'==','edit')),expHandlers(field.cxTypeMapping,'==','number')),'cxSubformHideCalculatorIcon','')}}\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-appearance=\"box\" cx-prop-decimal-places-for-view=\"2\" cx-prop-disabled=\"{{getAggrFieldData('disabled',field,cxPropCustomProperties.field[field.api_name].readOnly)}}\" cx-prop-tooltip=\"{{getAggrFieldData('tooltip',field,cxPropCustomProperties.field[field.api_name].readOnly)}}\" id=\"{{field.api_name}}\" cx-prop-field=\"{{field}}\" cx-prop-maxlength=\"{{field.length}}\" cx-prop-value=\"{{cxPropContent[field.api_name]}}\" cx-prop-show-calculator=\"{{field.showCalculator}}\" cx-prop-enable-lbind=\"{{field.autoUpdate}}\" on-value-change=\"{{method('fieldValueChange',field,cxPropContent,expHandlers(1,'-'),field.cxTypeMapping,this)}}\" on-error=\"{{method('errorCallback')}}\" cx-prop-zcqa=\"value_{{field.fieldLabel}}\" columnname=\"{{field.column_name}}\" data-type=\"{{field.data_type}}\"> <template is=\"yield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-response=\"{{errorResp}}\" error-message=\"{{errorMessage}}\" cx-field=\"{{cxField}}\"> </lyte-yield> </template> </template> </template><template case=\"false\"> <template is=\"component\" cx-prop=\"{{cruxStringify(cxPropFieldProperties)}}\" cx-prop-focus=\"{{if(cruxOr(expHandlers(cxPropType,'===','create'),expHandlers(cxPropType,'===','edit')),false,true)}}\" cx-prop-from=\"create\" cx-prop-boundary=\"{{cxPropNumberProperties.boundary}}\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-error-yield=\"{{errorYield}}\" cx-prop-focus-at-end=\"true\" cx-prop-display-currency=\"false\" cx-prop-right-icon-class=\"{{if(cruxAnd(cruxOr(expHandlers(cxPropType,'==','create'),expHandlers(cxPropType,'==','edit')),expHandlers(field.cxTypeMapping,'==','number')),'cxSubformHideCalculatorIcon','')}}\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-appearance=\"box\" cx-prop-decimal-places-for-view=\"2\" cx-prop-disabled=\"{{getAggrFieldData('disabled',field,cxPropCustomProperties.field[field.api_name].readOnly)}}\" cx-prop-tooltip=\"{{getAggrFieldData('tooltip',field,cxPropCustomProperties.field[field.api_name].readOnly)}}\" id=\"{{field.api_name}}\" cx-prop-field=\"{{field}}\" cx-prop-maxlength=\"{{field.length}}\" cx-prop-value=\"{{cxPropContent[field.api_name]}}\" cx-prop-show-calculator=\"{{field.showCalculator}}\" cx-prop-enable-lbind=\"{{field.autoUpdate}}\" on-value-change=\"{{method('fieldValueChange',field,cxPropContent,expHandlers(1,'-'),field.cxTypeMapping,this)}}\" cx-prop-zcqa=\"value_{{field.fieldLabel}}\" columnname=\"{{field.column_name}}\" data-type=\"{{field.data_type}}\"> <template is=\"yield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-response=\"{{errorResp}}\" error-message=\"{{errorMessage}}\" cx-field=\"{{cxField}}\"> </lyte-yield> </template> </template> </template></template> </template><template case=\"false\"> <template is=\"component\" cx-prop-line-clamp=\"7\" cx-prop-hightlight-url=\"true\" cx-prop-tooltip=\"true\" cx-prop-home-currency=\"{{if(isDefaultInvSubform,cxPropContent.$home_converted_currency[field.api_name])}}\" cx-prop-formatted-currency=\"{{if(isDefaultInvSubform,cxPropContent.$formatted_currency[field.api_name])}}\" cx-prop-iso-code=\"{{cxPropNumberProperties.isoCode}}\" cx-prop-datetime-in-user-pattern=\"{{cxPropDatetimeProperties.datetimeInUserPattern}}\" cx-prop-date-in-user-pattern=\"{{cxPropDateProperties.dateInUserPattern}}\" cx-prop-currency-code=\"{{cxPropNumberProperties.currencyCode}}\" cx-prop-default-org-currency=\"{{cxPropNumberProperties.defaultOrgCurrency}}\" cx-prop-default-round-off=\"{{cxPropNumberProperties.defaultRoundOff}}\" cx-prop-exchange-rate=\"{{cxPropNumberProperties.exchangeRate}}\" cx-prop-masking-properties=\"{{cxPropCustomProperties.field[field.api_name].mask}}\" cx-prop-appearance=\"box\" cx-prop-display-text=\"{{field.displayText}}\" component-name=\"crux-{{if(field.subformMapping,field.subformMapping,field.cxTypeMapping)}}-component\" cx-prop-disabled=\"true\" id=\"{{field.api_name}}\" cx-prop-from=\"{{field.from}}\" cx-prop-field=\"{{field}}\" cx-prop-value=\"{{getUnboundValue(cxPropContent[field.api_name],unboundObj,field.api_name,cxPropUnbound)}}\" on-value-change=\"{{method('fieldValueChange',field,cxPropContent,expHandlers(1,'-'),field.cxTypeMapping,this)}}\" data-zcqa=\"{{if(cruxOr(expHandlers(field.cxTypeMapping,'===','text'),expHandlers(field.subformMapping,'===','text')),concat('value_',field.fieldLabel),'')}}\" cx-prop-zcqa=\"value_{{field.fieldLabel}}\"></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropTableProperties,'&amp;&amp;',cxPropTableProperties.cellSuffixYield),'||',field.cxPropCellSuffixYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{cxPropContent}}\" field-obj=\"{{field}}\"></lyte-yield> </template></template> </template></template> </div> </lyte-td> <template is=\"if\" value=\"{{cxPropAjaxEdit}}\"><template case=\"true\"> <lyte-td class=\"cxAggFieldOptionsTd\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(getAggrFieldData('disabled',field,cxPropCustomProperties.field[field.api_name].readOnly,cxPropCustomProperties.field[field.api_name].mask,cxPropType,cxPropAjaxEdit),'!'),'&amp;&amp;',expHandlers(expHandlers(expHandlers(field.data_type,'!=',&quot;formula&quot;),'&amp;&amp;',expHandlers(aggrTableAjaxEditId,'!==',field.id)),'||',inventorySubform('TAXDISCOUNT','compare',field)))}}\"><template case=\"true\"> <div class=\"options {{if(cruxAnd(expHandlers(cxPropDisableAjaxEdit,'!'),expHandlers(disableAjaxEdit,'!'),ifEquals(field.id,aggrHoverRowId)),'','cxSubformTableRowActionsHidden')}}\"> <template is=\"if\" value=\"{{inventorySubform('TAXDISCOUNT','compare',field)}}\"><template case=\"true\"> <span data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_{{field.fieldLabel}}_edit\" class=\"cxSubformEditIcon\" id=\"{{subformUniqueId}}_{{subformApiName}}_inveditIcon_{{field.api_name}}\" onclick=\"{{action('renderInvSubformPopover',field,cxPropContent,this,true)}}\"></span> </template><template case=\"false\"> <span data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_{{field.fieldLabel}}_edit\" class=\"cxSubformEditIcon\" onclick=\"{{action('editRow',true,field)}}\"></span> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(aggrTableAjaxEditId,'===',field.id)}}\"><template case=\"true\"> <div class=\"cxSubformSaveCancelWrap cxFlex {{if(disableSaveCancel,'cxPeNone','')}}\"> <div data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_save\" class=\"cxSubformSave cxFlexCenter\" onclick=\"{{action('triggerSave',field,true)}}\"></div> <div data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_cancel\" class=\"cxSubformCancel cxFlexCenter\" onclick=\"{{action('triggerRollback',field.id)}}\"></div> </div> </template></template> </lyte-td> </template></template> </lyte-tr> </template></template> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropAjaxEdit}}\"><template case=\"true\"> <lyte-menu id=\"cxAjaxEditMenu\" lt-prop-yield=\"true\" lt-prop-query=\".moreAction_{{subformUniqueId}}_{{subformId}}\" on-open=\"{{method('menuOpened')}}\" on-menu-click=\"{{method('onMoreOptionClick')}}\" on-close=\"{{method('menuClosed')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxMoreActionHasIcon\"> <template is=\"if\" value=\"{{showEditButton}}\"><template case=\"true\"> <lyte-menu-item data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_edit\" data-value=\"edit\" lt-prop-title=\"{{if(cxPropDisableEdit,cruxGetI18n('crm.sf.permission.no.edit'))}}\" lt-prop-disabled=\"{{cxPropDisableEdit}}\"> <lyte-menu-label>{{cruxGetI18n('crm.button.edit')}}</lyte-menu-label> </lyte-menu-item> </template></template> <template is=\"if\" value=\"{{cxPropShowCloneRowButton}}\"><template case=\"true\"> <lyte-menu-item data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_clone\" data-value=\"clone\" lt-prop-title=\"{{if(cxPropDisableCreate,cruxGetI18n('crm.sf.permission.no.create'),addBtnTitle)}}\" lt-prop-disabled=\"{{if(cruxOr(disableClone,cxPropDisableCreate),'true','false')}}\"> <lyte-menu-label>{{cruxGetI18n('crm.button.clone')}}</lyte-menu-label> </lyte-menu-item> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropShowDeleteRowButton,'&amp;&amp;',showDeleteRowButton)}}\"><template case=\"true\"> <lyte-menu-item data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_delete\" data-value=\"delete\" lt-prop-title=\"{{if(cruxOr(cxPropDisableDelete,cxPropDisableEdit),cruxGetI18n('crm.sf.permission.no.delete'),deleteBtnTitle)}}\" lt-prop-disabled=\"{{if(cruxOr(disableDelete,cxPropDisableDelete,cxPropDisableEdit),'true','false')}}\"> <lyte-menu-label>{{cruxGetI18n('crm.button.mass.delete')}} </lyte-menu-label> </lyte-menu-item> </template></template> </lyte-menu-body> </template> </lyte-menu> </template></template> <template is=\"if\" value=\"{{isDefaultInvSubform}}\"><template case=\"true\"> <lyte-popover id=\"priceBookPopoverhoverCard\" lt-prop-origin-elem=\"dummyPriceBookPopoverhoverCard\" lt-prop-freeze=\"false\" lt-prop-scrollable=\"true\" lt-prop-show-close-button=\"false\" lt-prop-wrapper-class=\"cxSubformInfoPopover\" lt-prop-duration=\"{{undefined}}\" on-close=\"{{method('popupClose')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <template is=\"if\" value=\"{{expHandlers(priceBookTootlipValue.Pricing_Details,'!')}}\"><template case=\"true\"> <div class=\"pL15 pR15\"> {{priceBookTootlipValue.tooltipMsg}}</div> </template><template case=\"false\"> <lyte-table lt-prop-yield=\"true\" lt-prop-width=\"100%\" lt-prop-container-class=\"sf-salesorder-hcard\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-th>{{cruxGetI18n('crm.inventory.discount.scheme.range')}}</lyte-th> <lyte-th>{{cruxGetI18n('crm.gallery.inventory.template.discount')}}</lyte-th> </lyte-thead> <lyte-tbody> <template is=\"for\" items=\"{{priceBookTootlipValue.Pricing_Details}}\" item=\"pricing\" index=\"index\"> <lyte-tr> <lyte-td>{{formatNumberForPriceBookPopover(pricing.from_range)}} - {{formatNumberForPriceBookPopover(pricing.to_range)}}</lyte-td> <lyte-td>{{concat(formatNumberForPriceBookPopover(pricing.discount),'%')}}</lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </template></template> </lyte-popover-content> </template> </lyte-popover> <lyte-hovercard lt-prop-follow-cursor=\"true\" id=\"invPopoverhoverCard\" lt-prop-popover-wrapper-class=\"sf-hovercard-popover\" on-hovercard-hide=\"{{method('popupClose')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <template is=\"if\" value=\"{{expHandlers(cxPropSection.selectedTaxArrForHoverCard,'!')}}\"><template case=\"true\"> <div class=\"pL15 pR15\">{{if(inventorySubform('SUBFORM','BUNDLE'),cruxGetI18n('crm.tax.association',cruxGetI18n('bundle')),cruxGetI18n(\"crm.tax.association.check\"))}}</div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropSection.selectedTaxArrForHoverCard.length,'==',0)}}\"><template case=\"true\"> <div class=\"pL15 pR15\">{{cruxGetI18n(\"crm.tax.selected.check\")}}</div> </template><template case=\"false\"> <lyte-table lt-prop-yield=\"true\" lt-prop-width=\"100%\" lt-prop-container-class=\"sf-salesorder-hcard\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"for\" items=\"{{cxPropSection.selectedTaxArrForHoverCard}}\" item=\"taxObj\" index=\"index\"> <lyte-tr> <lyte-td class=\"sf-hcard-td sf-hcard-label\">{{taxObj.name}}</lyte-td> <lyte-td class=\"sf-hcard-td sf-hcard-sep\"> : </lyte-td> <lyte-td class=\"sf-hcard-td bold\"> {{taxObj.percentValue}}% </lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </template></template></template></template> </lyte-hovercard-content> </template> </lyte-hovercard> <lyte-hovercard lt-prop-follow-cursor=\"true\" id=\"invPopoverLookuphoverCard\" lt-prop-popover-wrapper-class=\"sf-hovercard-popover\" on-hovercard-hide=\"{{method('popupClose')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <lyte-table lt-prop-yield=\"true\" lt-prop-width=\"100%\" lt-prop-container-class=\"sf-salesorder-hcard\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"for\" items=\"{{invLookupHoverCardArr}}\" item=\"invObj\" index=\"index\"> <lyte-tr> <lyte-td class=\"sf-hcard-td sf-hcard-label\">{{invObj.label}}</lyte-td> <lyte-td class=\"sf-hcard-td sf-hcard-sep\"> : </lyte-td> <lyte-td class=\"sf-hcard-td bold\" id=\"{{invObj.id}}\"> {{invObj.value}} </lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> <lyte-menu id=\"menu\" lt-prop-position=\"down\" lt-prop-yield=\"true\" lt-prop-query=\"#subform_{{subformUniqueId}}_{{subformId}} #headerRow .cxTableSortIcon\" on-menu-click=\"{{method('menuSelected')}}\" on-before-open=\"{{method('setMenuOptions')}}\" on-close=\"{{method('popupClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{menuItems}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"{{item.class}}\" data-value=\"{{item.value}}\" data-zcqa=\"{{cxPropZcqaPrefix}}_{{cxPropSection.display_label}}_{{item.value}}\"> <lyte-menu-label> <span class=\"{{item.iconClass}}\"></span> <span class=\"dIB cxVam\">{{item.label}}</span> </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"registerYield","position":[1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},{"type":"registerYield","position":[1,1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"insertYield","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"component","position":[1,1,1,1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,1,9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,1,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[1,1,13],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},{"type":"registerYield","position":[1,1,15],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},{"type":"registerYield","position":[1,1,17],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"text","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[1,1,19],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,1,1,3,0]},{"type":"attr","position":[1,1,1,3,2]},{"type":"if","position":[1,1,1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,1,5]},{"type":"if","position":[1,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,1,2]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,1]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,1]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"registerYield","position":[7,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[7]}],
_observedAttributes :["unboundObj","cxPropPreviewMode","cxPropAllowActionOnPreview","cxPropType","cxPropSection","cxPropContent","cxPropAjaxEdit","cxPropDisableCreate","cxPropDisableDelete","cxPropDisableEdit","cxPropDisableAjaxEdit","cxPropShowFilterIcon","cxPropTableProperties","cxPropShowAddRowButton","cxPropShowDeleteRowButton","cxPropShowCloneRowButton","cxPropShowScrollToTop","cxPropLookupProperties","cxPropDateProperties","cxPropDatetimeProperties","cxPropLookupModalProperties","cxPropNumberProperties","cxPropUserProperties","cxPropPhoneProperties","cxPropFieldProperties","cxPropFieldTypeMapping","cxPropModuleData","cxPropModuleSections","cxPropScrollQuery","cxPropHeaderQuery","cxPropCurrencyData","cxPropHeight","cxPropQuickCreateYield","cxPropViewYieldSuffix","cxPropLimitRows","cxPropQueryParams","cxPropLayout","cxPropZcqaPrefix","cxPropSaveCustomRequest","cxPropUnbound","cxPropIsRtlEnabled","cxPropScrollFieldIntoView","cxPropCustomProperties","headerProperties","cxPropCustomWidth","cxPropFixedWidth","cxPropImageProperties","cxPropValidateEmptyRow","cxPropCellProperties","cxPropFooterYield","cxPropPreventFocusOnError","cxPropProfileName","cxPropShowRecentTransactions","cxPropProfileId","cxPropMaskingEnabled","mandatoryAsterixSymbol","calendarProperties","filterProperties","cruxTableShowFilter","cruxTableContent","cruxTableEnableFieldSort","freezeRow","selectedRows","subformFormulaMapping","formulaMapping","subformId","subformApiName","subformModuleName","defaultFields","dataBind","moduleData","showNoRecord","aggrHoverRowId","subformHoverRowId","disableAddRow","disableClone","disableDelete","disableAjaxEdit","disableSaveCancel","hasMoreRecords","showScrollToTop","showEditButton","showDeleteRowButton","sortMenuItems","menuItems","aggregateFields","invLookupHoverCardArr","isStaticSubform","isDefaultInvSubform","discountTaxTooltipValue","sortMenuProperty","showAllLoading","errorYield","errorResp","cxPropClass","subformRowCount","subformUniqueId","unmaskedApiname","textAreaProps","disableCriteria","staticSubformFields","disableErrorCallback","currencySymbol","showDiscountPerTooltip","cxPropShowActionButton"],
_observedAttributesType :["object","boolean","boolean","string","object","object","boolean","boolean","boolean","boolean","boolean","boolean","object","boolean","boolean","boolean","boolean","object","object","object","object","object","object","object","object","object","object","array","string","string","object","string","boolean","boolean","boolean","object","string","string","boolean","boolean","boolean","boolean","object","object","boolean","boolean","object","boolean","object","boolean","boolean","string","boolean","string","boolean","boolean","object","object","boolean","array","boolean","boolean","array","object","object","string","string","string","object","object","object","boolean","string","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","array","array","array","boolean","boolean","string","object","boolean","boolean","object","string","number","string","object","object","boolean","array","boolean","string","boolean","boolean"],

	data : function(){
		return {
			unboundObj : Lyte.attr("object", {"default" : {}}),
			cxPropPreviewMode: Lyte.attr("boolean"),
			cxPropAllowActionOnPreview: Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to render subform in view or edit or create mode.
			 * @componentProperty { view | create |  edit } cxPropType
			 * @author gowtham
			 * @default view
			 */
			cxPropType: Lyte.attr("string",{default:"view"}),
			/**
			 * This property contains field and property details required to render subform.
			 * @componentProperty { object } cxPropSection
			 * @author gowtham
			 */
			cxPropSection: Lyte.attr("object"),
			/**
			 * This property contains module record data.
			 * @componentProperty { object } cxPropContent
			 * @author gowtham
			 */
			cxPropContent: Lyte.attr("object"),
			/**
			 * This property is used to enable ajax edit in subform
			 * @componentProperty { boolean } cxPropAjaxEdit=false
			 * @author gowtham
			 * @default false
			 */
			cxPropAjaxEdit: Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to disable create operation including clone row.
			 * @componentProperty { boolean } cxPropDisableCreate=false
			 * @author gowtham
			 * @default false
			 */
			cxPropDisableCreate: Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to disable delete row in subform.
			 * @componentProperty { boolean } cxPropDisableDelete=false
			 * @author gowtham
			 * @default false
			 */
			cxPropDisableDelete: Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to disable edit including delete row.
			 * @componentProperty { boolean } cxPropDisableEdit=false
			 * @author gowtham
			 * @default false
			 */
			cxPropDisableEdit: Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to disable all the ajax actions
			 * @componentProperty { boolean } cxPropDisableAjaxEdit=false
			 * @author gowtham
			 * @default false
			 */
			cxPropDisableAjaxEdit:  Lyte.attr("boolean",{default:false}),
			/**
			 * This property is used to enable lookup filter in subform.
			 * @componentProperty { boolean } cxPropShowFilterIcon=false
			 * @author gowtham
			 * @default false
			 */
			cxPropShowFilterIcon: Lyte.attr("boolean",{default:false}),
			/**
			 * This property contains properties that needs to be passed to crux table component
			 * @componentProperty { object } cxPropTableProperties
			 * @author gowtham
			 * @default {}
			 */
			cxPropTableProperties: Lyte.attr('object',{default:{}}),
			/**
			 * This property is used to show add row button.
			 * @componentProperty { boolean } cxPropShowAddRowButton=false
			 * @author gowtham
			 * @default true
			 */
			cxPropShowAddRowButton: Lyte.attr('boolean',{default:true}),
			/**
			 * This property is used to show delete row button
			 * @componentProperty { boolean } cxPropShowDeleteRowButton=false
			 * @author gowtham
			 * @default true
			 */
			cxPropShowDeleteRowButton:  Lyte.attr('boolean',{default:true}),
			//to show clone row button
			cxPropShowCloneRowButton:  Lyte.attr('boolean',{default:true}),
			//to show scroll to top link
			/**
			 * This property is used to scroll to top link.
			 * @componentProperty { boolean } cxPropShowScrollToTop=false
			 * @author gowtham
			 * @default false
			 */
			cxPropShowScrollToTop: Lyte.attr('boolean',{default:false}),
			/**
			 * This property contains data for lookup component inside subform
			 * @componentProperty { object } cxPropLookupProperties
			 * @author gowtham
			 */
			cxPropLookupProperties : Lyte.attr("object"),
			cxPropDateProperties:  Lyte.attr("object"),
			cxPropDatetimeProperties:  Lyte.attr("object"),
			//properties passed to lookup modal component
			cxPropLookupModalProperties: Lyte.attr('object',{default:{}}),
			
			cxPropNumberProperties: Lyte.attr("object",{default:{}}),

			cxPropUserProperties: Lyte.attr("object",{default:{}}),

			cxPropPhoneProperties: Lyte.attr("object",{default:{enableCountryCode:typeof Crm!=="undefined"?Crm.userDetails.isPhoneNoNewView:false}}),

			cxPropFieldProperties: Lyte.attr("object"),
			//ui type to crux comp map passed to crux table comp
			cxPropFieldTypeMapping: Lyte.attr('object', {
				default:
				{
					2: "picklist", 25: "email", 33: "phone", 8: "user", 21: "website", 301: "boolean", 100: "picklist", 22: "twitter", 200: "date-time",
					786: "date-time", 24: "date", 202: "date", 333: "date-time", 209: "tag", 3: "text-area", 110: "text-area", 300: "boolean", 14: "date-time", 1: "text", 133: "lookup", 4: "lookup", 111: "text", 32: "number",
					36: "number",52: "number", 77: "number", 208: "layout", 143: "number", 144: "number", 145: "number", 40: "number", 34: "number", 221: "user", 55: "user", 20: "user", 117: 'number', 116: 'text', 38: 'number',
					556:'image',132:'multi_module_lookup',555:'file-upload'
				}
			}),
			/**
			 * This property contains module data
			 * @componentProperty { object } cxPropModuleData
			 * @author gowtham
			 */
			cxPropModuleData: Lyte.attr('object'),
			/**
			 * This property contains all the sections in the module.
			 * @componentProperty { array } cxPropModuleSections
			 * @author gowtham
			 */
			cxPropModuleSections: Lyte.attr('array'),
			/**
			 * This property is used to enable fixed header in subform, pass the selector for scrollable container
			 * @componentProperty { string } cxPropScrollQuery
			 * @author gowtham
			 * @default window
			 */
			cxPropScrollQuery: Lyte.attr('string', { default: 'window' }),
			/**
			 * This property is used to identify at which position the header should be fixed, pass the selecor.
			 * @componentProperty { string } cxPropHeaderQuery
			 * @author gowtham
			 * @default body
			 */
			cxPropHeaderQuery: Lyte.attr('string', { default: 'body' }),
			/**
			 * This property contains currency data of user.
			 * @componentProperty { object } cxPropCurrencyData
			 * @author gowtham
			 */
			cxPropCurrencyData: Lyte.attr('object'),
			/**
			 * This property is used to set height for table component
			 * @componentProperty { string } cxPropHeight
			 * @author gowtham 
			 */
			cxPropHeight: Lyte.attr('string'),
			/**
			 * This property is used to enable quick create in lookup component
			 * @componentProperty { boolean } cxPropQuickCreateYield=false
			 * @author gowtham
			 * @default true
			 */
			cxPropQuickCreateYield: Lyte.attr('boolean', { default: true }),
			/**
			 * This property is used to enable view yield in each cell
			 * @componentProperty { boolean } cxPropViewYieldSuffix=false
			 * @author gowtham
			 * @default false
			 */
			cxPropViewYieldSuffix:  Lyte.attr('boolean'),
			/**
			 * This property is used to limit the number of rows rendered initially.
			 * @componentProperty { boolean } cxPropLimitRows=false
			 * @author gowtham
			 * @deault true
			 */
			cxPropLimitRows: Lyte.attr('boolean',{default:true}),
			/**
			 * This property contains query params for request made by subform component
			 * @componentProperty { object } cxPropQueryParams
			 * @author gowtham
			 * @default {'affected_data':true}
			 */
			cxPropQueryParams: Lyte.attr("object",{default:{'affected_data':true}}),
			/**
			 * This propert contains the layout id
			 * @componentProperty { string } cxPropLayout
			 * @author gowtham
			 */
			cxPropLayout: Lyte.attr("string"), 
			/**
			 * This property contains prefix for zcqa in subform
			 * @componentProperty { string } cxPropZcqaPrefix
			 * @author gowtham
			 * @default Crm
			 */
			cxPropZcqaPrefix: Lyte.attr("string",{default:'Crm'}), 
			/**
			 * This property disables the save request from the component if onAjaxSave callback is also passed
			 * @componentProperty { boolean } cxPropSaveCustomRequest
			 * @author gowtham
			 * @default true
			 */
			cxPropSaveCustomRequest: Lyte.attr("boolean",{default:true}), 
			/**
			 * This property enables RTL
			 * This property removed data bind
			 * @componentProperty { string } cxPropIsRtlEnabled
			 * @author gowtham
			 * @default Crm
			 */
			cxPropUnbound: Lyte.attr("boolean",{default:false}),
			/**
			 * This property enables RTL
			 * @componentProperty { string } cxPropIsRtlEnabled
			 * @author gowtham
			 * @default false
			 */
			cxPropIsRtlEnabled: Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.RTL_ENABLED:false}),
			/**
			 * This property is used to scroll the focused field into view if any part of it is getting hidden
			 * @componentProperty { string } cxPropIsRtlEnabled
			 * @author gowtham
			 * @default false
			 */
			cxPropScrollFieldIntoView:  Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.isPinnedColumnEnabled:false}),  
			
			cxPropCustomProperties: Lyte.attr('object',{default:{}}),

			headerProperties: Lyte.attr('object',{default:{}}),
			/**
			 * This property is used to check if adjust field width property enabled
			 * @componentProperty { string } cxPropIsRtlEnabled
			 * @author gowtham
			 * @default false
			 */
			cxPropCustomWidth:  Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.isAdjustFieldWidthEnabled:false}), 
			
			cxPropFixedWidth:  Lyte.attr('boolean',{default:true}),
			
			cxPropImageProperties: Lyte.attr('object',{default:{minified:true,type:'multiple'}}),
			
			cxPropValidateEmptyRow: Lyte.attr('boolean',{default:false}),

			cxPropCellProperties: Lyte.attr('object'),
			cxPropFooterYield: Lyte.attr('boolean'),
			cxPropPreventFocusOnError: Lyte.attr('boolean'),

			cxPropProfileName: Lyte.attr('string',{default:typeof Crm!=="undefined"?Crm.userDetails.PROFILE_NAME:''}), 
			
			cxPropShowRecentTransactions:  Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.isRecentTransactionsEnabled:false}),

			cxPropProfileId: Lyte.attr('string',{default:typeof Crm!=="undefined"? Crm.userDetails.PROFILE_ID:''}),

			cxPropMaskingEnabled: Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.isMaskingFeatureEnabled:false}),
			//data passed for crux table
			mandatoryAsterixSymbol:Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.DV_MANDATORY_FIELD_ASTERIX_SYMBOL:false}),
			calendarProperties: Lyte.attr('object',{default:{i18n:true}}),

			filterProperties: Lyte.attr('object',{default:{}}),

			cruxTableShowFilter: Lyte.attr('boolean', { default: false }),

			cruxTableContent: Lyte.attr('array'),

			cruxTableEnableFieldSort: Lyte.attr('boolean', { default: false }),

			freezeRow: Lyte.attr('boolean', { default: false }),

			selectedRows:  Lyte.attr('array', { default: [] }),

			subformFormulaMapping:  Lyte.attr('object',{default:{boolean : "text","datetime" : "text", date : "text"}}),

			formulaMapping: Lyte.attr('object',{default:{currency : "number", text : "text", boolean : "boolean", "datetime" : "date-time", date : "date", 				double : "number" , decimal : "number" , integer : "number" }}),

			subformId:  Lyte.attr("string"),

			subformApiName:  Lyte.attr("string"),

			subformModuleName: Lyte.attr("string"),

			defaultFields: Lyte.attr('object', { default: {} }),

			dataBind: Lyte.attr('object'),

			moduleData:  Lyte.attr('object'),

			showNoRecord: Lyte.attr("boolean",{default:false}),

			aggrHoverRowId: Lyte.attr("string"),

			subformHoverRowId : Lyte.attr("string"),

			disableAddRow: Lyte.attr("boolean",{default:false}),

			disableClone: Lyte.attr("boolean",{default:false}),

			disableDelete: Lyte.attr("boolean",{default:false}),

			disableAjaxEdit: Lyte.attr("boolean",{default:false}),

			disableSaveCancel: Lyte.attr("boolean",{default:false}),

			hasMoreRecords: Lyte.attr("boolean",{default:false}),

			showScrollToTop: Lyte.attr('boolean', { default: false }),

			showEditButton: Lyte.attr('boolean', { default: true }),

			showDeleteRowButton: Lyte.attr('boolean', { default: true }),
			
			sortMenuItems: Lyte.attr('array'),

			menuItems: Lyte.attr('array'),

			aggregateFields: Lyte.attr('array'),

			invLookupHoverCardArr: Lyte.attr('array'),
			isStaticSubform: Lyte.attr("boolean",{default:false}),
			isDefaultInvSubform: Lyte.attr("boolean",{default:false}),

			discountTaxTooltipValue: Lyte.attr("string"),

			sortMenuProperty: Lyte.attr("object",{default:{}}),

			showAllLoading:  Lyte.attr('boolean', { default: false }),

			errorYield:  Lyte.attr('boolean', { default: false }),

			errorResp: Lyte.attr("object"),
			cxPropClass : Lyte.attr('string'),
			subformRowCount:  Lyte.attr('number'),

			subformUniqueId:  Lyte.attr("string",{default:'cxSubform'+ Math.floor(Math.random() * 100).toString(36)}),
			unmaskedApiname: Lyte.attr("object",{default:{}}),

			textAreaProps: Lyte.attr('object',{default:{"lineClamp":7,"highlightUrl":true}}),
			disableCriteria: Lyte.attr('boolean',{default:false}),
			staticSubformFields: Lyte.attr('array', { default: [] }),
			disableErrorCallback: Lyte.attr('boolean'),
			currencySymbol: Lyte.attr('string'),
			showDiscountPerTooltip: Lyte.attr('boolean', { default: true }),
			cxPropShowActionButton: Lyte.attr('boolean',{default:true})

		}		
	},
	init: function(){

		//utility functions
		this.$node.createRow = function(row){
			this.component.createRow(row);
		}
		this.$node.deleteRow = function(index){
			this.component.deleteRow(index);
		}
		this.$node.evaluateModuleFormula = function(apiName){
			this.component.evaluateModuleFormula(apiName);
		}
		this.$node.evaluateFormula = function(formulaField,data=this.getData('cxPropContent'),rowId=-1){
			if(formulaField){
				return this.component.evaluateFormulaExpression(formulaField.formula.expression,rowId,data,formulaField,undefined,true);
			}
		};
		this.$node.highlightAggregateField = function(apiNames){
			this.component.highlightAggregateField(apiNames);
		}
		this.$node.rollback = function(id){
			this.component.rollbackChange(id);
		};
		this.$node.evaluateAggregateFormula = function(apiName,isAggr=false){
			this.component.evaluateAggregateFormula(apiName,isAggr);
		};

		this.$node.save = function(){
			if(this.getData('cruxTableAjaxEditId') || this.getData('aggrTableAjaxEditId')){
				var isAggr  = this.getData('aggrTableAjaxEditId') ? true : false;
				var index,field;
				if(!isAggr){
					index = this.getData('cruxTableContent').findIndex((rec)=>{ return rec.id===this.getData('cruxTableAjaxEditId'); });
				}else{
					field = store.peekRecord('field',this.getData('aggrTableAjaxEditId'));
				}
				this.component.saveChanges(field,isAggr,index);
			}	
		};
		this.$node.updateValue = function(recordId,apiName,value){
			this.component.updateRecordValue(recordId,apiName,value);
		};
		this.unmaskedApiname = new Set();
		this.$node.validate = function(){
			return this.component.validate();
		};
		this.$node.focus = (apiName,rowId,scrollIntoView=true)=>{
			let id,rowIdx,coldIx;
			if(rowId){
				coldIx = this.getData('cruxTableHeaderFields').findIndex((rec)=>{ return rec.api_name===apiName; });
				rowIdx = this.getData('cruxTableContent').findIndex((rec)=>{ return rec.id===rowId; });
				id = `${this.getData('subformApiName')}_${apiName}_${rowIdx+1}`;
				if(scrollIntoView){
					this.cruxTable[0].scrollElemIntoView(rowIdx,coldIx);
				}
			}else{
				id=apiName;
			}
			let node = this.$node.querySelector('#'+id);
			if(node){
				node.focus();
			}
		};
		this.isHeaderFixed = false; //flag used to check if the table header position is changed to fix
		this.fieldObject = {}; //storing all the fields in the form of key value pair [apiname will be key]
		this.aggFieldObject = {};
		this.formulaFields = []; //storing information regarding formula fields
		this.associatedFields = {}; //storing information regarding associated fields
		this.picklistFields = [];
		this.parentPicklist = []
		this.detailsForKeyDown = {};
		var type = this.getData('cxPropType');
		var content = this.getData('cxPropContent');
		var section = this.getData('cxPropSection');
		var userDetailsObj = typeof Crm!=="undefined"?Crm.userDetails: typeof Prm !=="undefined"?Prm.userDetails:null;
		this.userDetails = {}
		this.userDetails.isAdjustFieldWidthEnabled = userDetailsObj?userDetailsObj.isAdjustFieldWidthEnabled:false;
		this.userDetails.isMapDepencySubFormSupported = userDetailsObj?userDetailsObj.isMapDepencySubFormSupported:false;
		this.userDetails.TIME_FORMAT = userDetailsObj?userDetailsObj.TIME_FORMAT:"hh:mm a";
		this.userDetails.DATE_PATTERN =  userDetailsObj?userDetailsObj.DATE_PATTERN:"YYYY-MM-DD";
		this.userDetails.TIME_ZONE = userDetailsObj?userDetailsObj.TIME_ZONE:"+05.30";
		this.userDetails.USER_TIME_ZONE = userDetailsObj?userDetailsObj.USER_TIME_ZONE:"Asia/Kolkata";
		this.userDetails.FORMULA_NULL_HANDLING_ENABLED = userDetailsObj?userDetailsObj.FORMULA_NULL_HANDLING_ENABLED:false;
		this.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM = userDetailsObj?userDetailsObj.FIELD_OF_LOOKUP_IN_SUBFORM:false;
		this.userDetails.DYNAMIC_FORMULA_ENABLED = userDetailsObj?userDetailsObj.DYNAMIC_FORMULA_ENABLED:false;
		if(this.getData("cxPropLimitRows")){
			this.subformMaxRows =(typeof crmConstants!=="undefined" && crmConstants.subformDefMaxRowsPerParent)?crmConstants.subformDefMaxRowsPerParent:-1;
		}
		this.setSubformDetails(section);

		//static subform check
		if(this.getData('isStaticSubform')){
			this.setData('cxPropShowCloneRowButton',false);
			this.setData('cxPropShowAddRowButton',false);
		}

		this.checkIfDefaultInvSubform(section);

		if(this.isBundleSubform){
			this.setData('cxPropShowCloneRowButton',false);
		}
		var formulaMapping = this.getData('formulaMapping');
		formulaMapping.date = (this.getData('cxPropDateProperties') && !this.getData('cxPropDateProperties').dateInUserPattern) ? 'date' : formulaMapping.date;
		formulaMapping.datetime = (this.getData('cxPropDatetimeProperties') && !this.getData('cxPropDatetimeProperties').datetimeInUserPattern) ? 'date-time' : formulaMapping.datetime;

		this.setData('currencySymbol',this.getCurrencySymbol());
		if(type==="create" || type==="edit"){
			let defaultProp = this.getData('cxPropPreviewMode') ? {tabIndex:"-1"} :{clearErrorMessage:false};
			let fieldProp = this.getData('cxPropFieldProperties') ? {...this.getData('cxPropFieldProperties'),...defaultProp} : {...defaultProp};
			this.setData('cxPropFieldProperties',fieldProp);
		}
		var headerFields = this.addDetailsToField();
		

		if(!this.getData('cxPropPreviewMode') && Crm.userDetails.isConditionalAggregateEnabled){
			var _this = this;
			this.formulaFields.filter((Ffield)=>Ffield.aggregateFormula).forEach(function(formulaField){
				var field = _this.getFieldObject(formulaField.apiName,true);
				if(field.query_details && field.query_details.criteria){
					formulaField.criteriaDetails = _this.getAggCrtDetails(field.query_details.criteria,_this.fieldObject)
					formulaField.criteriaDetails.crtExp=formulaField.criteriaDetails.crtExp.replaceAll('\,','#&');
				}
			})
		}

		if(type==="create" || type==="edit" || (this.getData('cxPropAjaxEdit') && type==='view')){
			this.defaultRecord = {};//this object will contain default values that needs to set in the subform
			//when add row button is clicked, this record will be deep cloned to create new entry
			this.createDefaultRecord();
			//for create and edit, this yield will have delete and drag action for ajax edit it will have edit and more action

		_cruxUtils.addMurhyInfo("crux-subform.js", "Feb Default Changes");
			this.checkAndDisableInsertRow();

			if((this.getData('cxPropAjaxEdit') && type==='view') || ((type==="create" || type==="edit" ) && (this.getData('cxPropShowDeleteRowButton') || (section && section.properties && section.properties.reorder_rows)))){
				headerFields.unshift({ yield: true, skipYield: true, yieldName: 'actions', fixed: 'enable', cxPropClass:'cxSubformFirstColTd' });
			}

		}
		if((this.getData('cxPropAjaxEdit') || this.getData('cxPropShowFilterIcon')) && type==='view') {
			// let cxPropAjaxEditEnabled = this.getData('cxPropAjaxEdit');
			// headerFields.push({ yield: true,cxPropClass:'cxSfSaveCancelTd',skipYield: true, yieldName: 'ajaxActions', style: 'width:81px;min-width:81px' });
			headerFields.push({ yield: true,cxPropClass:this.getData('cxPropAjaxEdit') ? 'cxSfSaveCancelTd': 'cxSfFilterDummyTd',skipYield: true, yieldName: 'ajaxActions', style: this.getData('cxPropAjaxEdit') ? 'width:81px;min-width:81px': '' });
		}

		//replace prefix and suffix yield in field array, bcoz we won't be able to pass the yield in table component to user
		var tableProps = this.getData('cxPropTableProperties');
		if( tableProps && (tableProps.yieldForSuffix || tableProps.yieldForPrefix)){

			if(tableProps.yieldForSuffix){
				tableProps.headerYield.suffix.forEach(function(suffix,index){
					var yeildObj = Object.assign({},suffix);
					yeildObj.subformYieldName = 'suffix-'+(index+1);
					yeildObj.yield = true;
					yeildObj.yieldName = 'subform';
					headerFields.push(yeildObj);
				})
			}
			if(tableProps.yieldForPrefix){
				tableProps.headerYield.prefix.forEach(function(prefix,index){
					var yeildObj = Object.assign({},prefix);
					yeildObj.subformYieldName ='prefix-'+(index+1);
					yeildObj.yield = true;
					yeildObj.yieldName = 'subform';
					headerFields.unshift(yeildObj);
				})
			}
			
		}
		this.setData('cruxTableHeaderFields', headerFields);
		if(!this.getData('cxPropPreviewMode')){
			if(content[this.getData('subformApiName')] && content[this.getData('subformApiName')].length>0){
				if(this.subformMaxRows!==-1){
					this.limitSubformRows();
				}
				else{
					this.setData('cruxTableContent',content[this.getData('subformApiName')].slice(0));
				}
				//find static rows
				if(type==="edit" && this.getData('isStaticSubform')){
					let staticRow = {};
					let subformRow = {};
					let staticRowSet = new Set();
					for(let i=0;i<this.getData('cxPropSection').properties.maximum_rows;i++){
						this.getData('staticSubformFields').forEach((field)=>{
							staticRow[field.api_name] = field.static_values[i].value;
						});
						staticRowSet.add(JSON.stringify(staticRow));
					} 
					this.getData('cxPropContent')[this.getData('subformApiName')].forEach((rec)=>{
						this.getData('cruxTableHeaderFields').filter(field=> field.static_field && field.static_values).forEach((field)=>{
							subformRow[field.api_name] = rec[field.api_name];
						});
						if(staticRowSet.has(JSON.stringify(subformRow))){
							rec.isStaticRow = true;
						}
					});
				}
			}else{
				this.setData('cruxTableContent',[]);
				//for create and edit, if there is no record, a record is created
				if(type==="create" || type==="edit"){
					if(content && content[this.getData('subformApiName')] && content[this.getData('subformApiName')].length===0){
						if(this.getData('isStaticSubform')){
							let rowCount = section.properties && section.properties.maximum_rows ? section.properties.maximum_rows : 1;
							let staticRow = {};
							for(let idx = 0;idx<rowCount;idx++){
								this.getData('cruxTableHeaderFields').forEach((field)=>{
									if(field.static_field && field.static_values){
										staticRow[field.api_name] = field.static_values[idx].value;
									}
								});
								if(Object.keys(staticRow).length!==0){
									staticRow.isStaticRow = true;
								}
								this.createRecord({...staticRow,...this.defaultRecord});
								this.evaluateFormulaFields(idx+1);
							}
						}else{
							this.createRecord();
							this.evaluateFormulaFields(1);
						}
					}
				}
			}
			
		}else{
			this.setData('cruxTableContent',[]);
			this.setData('cxPropContent',{});
			this.data.cxPropContent[this.getData('subformApiName')] = this.getData('cruxTableContent');
			this.createRecord();
			// if(this.serialNumberField){
			// 	this.setSerailNumber(0);
			// }
		}

		if(type==="view"){
			if(this.getData('cruxTableContent').length>0){
				this.setData('cruxTableEnableFieldSort',true)
			}else{
				this.setData('showNoRecord',true);
			}
			var numProps = this.getData('cxPropNumberProperties');
			numProps.displayCurrency = numProps.hasOwnProperty('displayCurrency') ? numProps.displayCurrency : false;
			numProps.defaultOrgCurrency = numProps.defaultOrgCurrency ? numProps.defaultOrgCurrency : userDetailsObj.defaultOrgCurrency;
			numProps.defaultRoundOff = numProps.defaultRoundOff? numProps.defaultRoundOff:userDetailsObj.defaultRoundOff;
			numProps.currencyDetails = numProps.currencyDetails ?numProps.currencyDetails :userDetailsObj.CURRENCY_DETAILS;
			numProps.exchangeRate = numProps.exchangeRate?numProps.exchangeRate:this.getData('cxPropContent').Exchange_Rate;
			numProps.currencyCode = numProps.currencyCode?numProps.currencyCode:userDetailsObj.BASE_CURRENCY?userDetailsObj.BASE_CURRENCY:userDetailsObj.defaultCurrencyISOCode;
			numProps.isoCode = numProps.isoCode?numProps.isoCode:this.getData('cxPropContent').Currency;

			if(this.getData('isDefaultInvSubform') && this.getData('cxPropMaskingEnabled')){
				let disField = this.getFieldObject('Discount');
				if(disField){
					if(this.unMaskCheckNeeded(disField) && !this.checkUnMaskPermission(disField)){
						this.setData('showDiscountPerTooltip',false);
					}else{
						let formulaExp = this.getFieldObject('Total_After_Discount').formula.expression;
						if(formulaExp){
							let apiNames = this.getApiNameFromFormula(formulaExp);
							if(apiNames && apiNames.length &&
								apiNames.map(apiName=>this.getFieldObject(apiName)).some(field=>this.unMaskCheckNeeded(field) && !this.checkUnMaskPermission(field)) ){
									this.setData('showDiscountPerTooltip',false);
							}
						}
					}
				}
			}
		_cruxUtils.addMurhyInfo("crux-subform.js", "Feb Default Changes");
		}

		this.processClientScriptOnInit();

		//INV-CHANGES
		if(!this.getData('cxPropPreviewMode') && (type==="create" || type==="edit" || (this.getData('cxPropAjaxEdit') && type==='view')) && this.getData('isDefaultInvSubform')){
			this.data.moduleData = this.data.cxPropModuleData;
			this.updateAdditionalInvData(this.getData('cxPropContent'));
			
		}
		
		//generating random number to identify the subform

		


	},
	didConnect: function () {
		var type = this.getData("cxPropType");
		if (type === "create" || type==="edit") {
			this.addSortable();
			if(!this.getData('cxPropPreviewMode')){
				this.evaluateFormulaFields(-1,true);
			}
		}
		//perf fix
		// this.didInterval = setInterval(()=>{
		// 	this.getData('cruxTableContent').slice(startPoint,startPoint+10).forEach((rec)=>{Lyte.objectUtils(rec,'add','disableViewPort',true);})
		// 	startPoint = startPoint+10
		// 	if(startPoint>=this.getData('cruxTableContent').length || (startPoint>=60)){
		// 		clearInterval(this.didInterval);
		// 	}
		// },50)
		if(this.getData('cxPropShowFilterIcon')){
			this.setData('filterProperties',{zcqa:this.getData('cxPropZcqaPrefix')+'_'+this.getData('cxPropSection').display_label+'_filter',
			title:this.getData('cruxTableContent').length>0?_cruxUtils.getI18n('crm.button.show.filter'):_cruxUtils.getI18n('crm.subform.filter.disabled')});
			if(!this.getData('cxPropCustomWidth') && this.getData('cxPropFixedWidth')){
				this.setWidthForFilter();
			}
		}
		if(!this.getData('cxPropFixedWidth')){
			let allTh = $L('lyte-th',this.$node);
			allTh.each((idx,th)=>{
				if(th.id){
					let field = this.getData('cruxTableHeaderFields')[idx];
					$L.fastdom.measure(function(){
						var width = th.offsetWidth+'px';
						if(field.width && th.offsetWidth<field.width.substring(0,field.width.length-2)){
							width = field.width;
						}
						var style = `min-width:${width};width:${width};max-width:${width}`;
						field.width = width;
						Lyte.objectUtils(field,'add','style',style);
					}.bind(this));
				}
			});
		}
		if(this.getData('cxPropScrollFieldIntoView')){
			//scrollleft set
			$L.fastdom.measure(function(){
				var fixedWidth = $L("#headerRow lyte-th",this.$node)[0].offsetWidth;//eslint-disable-line @zoho/webperf/no-complex-selector
				this.getData('cruxTableHeaderFields').filter(function(field){ return field.fixed==='enable' && field.width}).forEach(function(field){
					fixedWidth+= parseInt(field.width.substring(0,field.width.length-2));
				})
				this.fixedWidth = fixedWidth;
			}.bind(this))
		}
		var node = this.$node;
		this.cruxTable = $L('crux-table-component',this.$node);
		this.lyteTable = $L('#subform_'+this.getData('subformUniqueId')+'_'+this.getData('subformId')+' lyte-table', node);//eslint-disable-line @zoho/webperf/no-complex-selector
		this.lyteTableHead = $L('lyte-thead', node);
		this.lyteTableBody = $L('lyte-tbody', node);
		this.tableScroll = this.$node.querySelector('.lyteTableScroll');
		this.lyteTableStructure = $L('.cruxTableStructure',node);
		this.lyteTableScrollContainer = $L('.lyteScrollContainerX',node);
		this.handleSubformScroll();
		this.setWidthForHeader(100);
		this.addKeyDownListener(); //dropdown enter and multiline enter to be handled

		this.$node.scrollElemIntoView  = (rowIdx,coldIx,scrollIfNeeded)=>{
			this.cruxTable[0].scrollElemIntoView(rowIdx,coldIx,scrollIfNeeded);
		}

		setTimeout(function(){this.setViewPortDebounceTime();}.bind(this),0)
		this.resizeListener = Lyte.addEventListener('cxSubformResized',()=>{
			this.setWidthForHeader(0);
			if(this.isHeaderFixed && this.getData('cxPropShowFilterIcon')){
					var cxTableFilterIcons = $L('.cxTableFilterIcons', this.$node);
					if(cxTableFilterIcons[0]){
						let right = this.subFormDiv.getBoundingClientRect().right;
						cxTableFilterIcons.css({
							left: (right-cxTableFilterIcons[0].offsetWidth) + 'px'
						})
					}
			}
		})
		this.clientListener = Lyte.addEventListener('cxSubformClientScript',(details)=>{
			if(details && details.cxSubformId===this.data.subformId && details.cxAction){
				var action = details.cxAction;
				switch(action){
					case 'setReadOnly':
						var rowId = this.getData('cruxTableContent')[details.cxRowIndex]?this.getData('cruxTableContent')[details.cxRowIndex].id:'';
						if(rowId){
							if(details.cxColumnApiName){
								this.clientScriptFunction('setValue',`subformCell.${rowId}.${details.cxColumnApiName}.readOnly`,details.cxValue);
							}else{
								this.clientScriptFunction('setValue',`subformRow.${rowId}.readOnly`,details.cxValue);
								if(this.getData('cruxTableAjaxEditId') == rowId){
									var rec = store.peekRecord(this.data.subformId,this.getData('cruxTableAjaxEditId'));
									var exClass = rec.cxPropClass?rec.cxPropClass:'';
									if(details.cxValue){
										Lyte.objectUtils(rec,'add','cxPropClass',exClass+' cxSubformTdFreeze');
									}else{
										exClass = exClass.replace('cxSubformTdFreeze','');
										Lyte.objectUtils(rec,'delete','cxPropClass',exClass);
									}
								}	
							}
						}else if(details.cxColumnApiName){
							this.clientScriptFunction('setValue',`subformField.${details.cxColumnApiName}.readOnly`,details.cxValue);
						}
						else if(details.cxAggrApiName){
							this.clientScriptFunction('setValue',`field.${details.cxAggrApiName}.readOnly`,details.cxValue);
						}
					break;
					case 'setCriteria':
						if(details.cxColumnApiName){
							var field = this.fieldObject[details.cxColumnApiName];
							if(field){
								var criteriaVal = details.cxValue;
								if(criteriaVal){
									Lyte.objectUtils(field,'add','criteria',criteriaVal);
									if(field.lookup && field.lookup.module){
										let api_name = field.lookup.module.api_name==='Products' ? 'Product_Active' :
														field.lookup.module.api_name === 'Bundles__s'? 'Active' : ''; 
										criteriaVal.originalCriteria = criteriaVal.criteria;
										if(api_name){
											criteriaVal.criteriaObj.push([
												{
													"api_name":api_name,//NO I18N
													"comparator" : "equals",//NO I18N
													"value":true, //No I18N
												}
											])
											criteriaVal.criteria = `(${criteriaVal.criteria}and(${api_name}:equals:true))`;
										}
										this.clientScriptFunction('setValue',`subformField.${details.cxColumnApiName}.criteria`,criteriaVal);
									}else if(field.cxTypeMapping === 'picklist'){
										this.clientScriptFunction('setValue',`subformField.${details.cxColumnApiName}.criteria`,criteriaVal);
										if(this.getData('cruxTableAjaxEditId')){
											this.clientScriptFunction('removeValue',`subformRow.${this.getData('cruxTableAjaxEditId')}.${details.cxColumnApiName}.pickListValues`);
											this.checkForDependancyFields(undefined,store.peekRecord(this.getData('subformId'),this.getData('cruxTableAjaxEditId')),details.cxColumnApiName);
										}
									}
								}else{
									if(field.lookup && field.lookup.module){
										let api_name = field.lookup.module.api_name==='Products' ? 'Product_Active' :
															field.lookup.module.api_name === 'Bundles__s'? 'Active' : ''; 
											if(api_name){
												let prodCriteriaVal = [
													{
														"api_name":api_name,//NO I18N
														"comparator" : "equals",//NO I18N
														"value":true, //No I18N
													}
												]
												let criteriaObj = {criteriaObj:prodCriteriaVal,criteria: `(${api_name}:equals:true)`};
												this.clientScriptFunction('setValue',`subformField.${details.cxColumnApiName}.criteria`,criteriaObj);
											}else{
												this.clientScriptFunction('removeValue',`subformField.${details.cxColumnApiName}.criteria`);
											}	
									}else if(field.cxTypeMapping === 'picklist'){
										this.clientScriptFunction('removeValue',`subformField.${details.cxColumnApiName}.criteria`);
										if(this.getData('cruxTableAjaxEditId')){
											this.clientScriptFunction('removeValue',`subformRow.${this.getData('cruxTableAjaxEditId')}.${details.cxColumnApiName}.pickListValues`);
											this.checkForDependancyFields(undefined,store.peekRecord(this.getData('subformId'),this.getData('cruxTableAjaxEditId')),details.cxColumnApiName);
										}
									}
								}
							
							}
						}
					break;
					case 'setVisibility':
						if(details.cxColumnApiName){
							//only visible fields will be available in fieldObject
							this.clientScriptVisbility(this.fieldObject[details.cxColumnApiName],details.cxValue);
						}
					break;
					case 'addInfo':
						if(details.cxColumnApiName){
							this.clientScriptInfo(this.fieldObject[details.cxColumnApiName],details.cxValue);
						}
					case 'mask':
						if(details.cxAggrApiName){
							this.clientScriptFunction('setValue',`field.${details.cxAggrApiName}.mask`,details.cxValue);
						}
				}
			}
		})
		if(type === 'view' && this.getData('cxPropAjaxEdit')){
			this.beforeChangeListener =  Lyte.addEventListener('cxSubformBeforeUpdated',(details)=>{
				if(details && details.cxSubformId===this.data.subformId){
					this.oldContent = Lyte.deepCopyObject(this.data.cxPropContent);
					if(this.getData('cruxTableAjaxEditId')){
						let editrec = store.peekRecord(this.getData('subformId'),this.getData('cruxTableAjaxEditId'));
						if(editrec && !editrec.$.isNew && document.activeElement && document.activeElement.closest('crux-subform')===this.$node){
							// let cruxComp = $L('.tablecomponent2 .cxSubformValidateField',this.$node),editData = {};
							// cruxComp.each((idx,node)=>{
							// 	if(node.firstElementChild 
							// 		&& node.firstElementChild.component 
							// 			&& node.firstElementChild.component.getValue){
							// 				let cruxNode = node.firstElementChild;
							// 				editData[cruxNode.cxProp('field').api_name] = cruxNode.component.getValue();
							// 			}
							// })
							// this.editData = editData;
								document.activeElement.blur();
						}
					}
				}
			});
			this.changeListener = Lyte.addEventListener('cxSubformUpdated',(details)=>{
				/*
				cxSubformId - subform id
				Action - ajax action
				Data - record id/api name
				isAggr
				*/
				if(details && details.cxSubformId===this.data.subformId && details.subformUniqueId !== this.data.subformUniqueId){
					let isSubform = details.isSubform;
					var data = details.data;
					var content = this.data.cxPropContent;
					var tableContent = this.data.cruxTableContent;
					if(isSubform && data.recordId){
							var recId =data.recordId;
							var idx;
							if(details.action==='create' && tableContent.findIndex((rec)=>rec.id===recId)===-1){
								idx =  content[this.data.subformApiName].findIndex((rec)=>rec.id===recId);
							}else if(details.action!=='create'){
								idx = tableContent.findIndex((rec)=>rec.id===recId)
							}
							if(idx){
								switch(details.action){
									case "delete":Lyte.arrayUtils(tableContent,'removeAt',idx);
									break;
									case "create":
									case "edit":
										let rec ;
										if(details.action==='edit'){
											rec = tableContent[idx];
											Lyte.arrayUtils(tableContent,'removeAt',idx);
										}else{
											rec =  content[this.data.subformApiName][idx];
										}
										Lyte.arrayUtils(tableContent,'insertAt',idx,rec);
										var transform = this.readTableColumns($L('#headerRow',this.$node));
										this.fixTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${idx+1})`,this.$node),transform)
									break;
								}
							}
					}else if(!isSubform && details.data){ //data will be passed only for aggreagte
							this.updateAggregateValue(data);
					}else{
						this.closeLastPopup();
						let newContent = this.getData('cxPropContent')[this.getData('subformApiName')];
						let oldContent = this.oldContent ? this.oldContent[this.getData('subformApiName')]:undefined;
						let maintainSubformState = (sortFilterData)=>{
							let cruxTableContent = this.getData('cruxTableContent');
							let idx = cruxTableContent.findIndex((rec)=>rec.id===this.getData('cruxTableAjaxEditId'));
							if(idx!==-1){
								let record = cruxTableContent[idx];
								if(record.$.isNew){
									let destIdx = newContent.length;
									newContent.add(record);
									if(idx<cruxTableContent.length-1 && idx<newContent.length){ //clone
										destIdx = idx;
										Lyte.arrayUtils(newContent, 'pop');
										Lyte.arrayUtils(newContent, 'insertAt', destIdx, record);
									}
									if(sortFilterData){
										destIdx = sortFilterData.length;
										if(idx<cruxTableContent.length-1 && idx<sortFilterData.length){ //clone
											destIdx = idx;
										}
										Lyte.arrayUtils(sortFilterData, 'insertAt', destIdx, record);
									}
									this.evaluateFormulaFields(-1,true);
								}else{
									let editIdx = newContent.findIndex((rec)=>rec.id===this.getData('cruxTableAjaxEditId'));
									let oldRec = oldContent?oldContent.find((rec)=>rec.id===this.getData('cruxTableAjaxEditId')):undefined;
									// let oldRec = this.editData && Object.keys(this.editData).length>0 ? this.editData :undefined;
									//if currently edited row is not present in refresh or modified , then rollback the ajax actions and show an message
									if(editIdx===-1){
										this.showSubformMessage(_cruxUtils.getI18n('crm.subform.revert.delete',this.getData('cxPropSection').display_label),'info');
										this.rollbackAjaxActions();
									}else if(oldRec && !this.compareRecords(oldRec,newContent[editIdx])){
										//if the record is modified in the backend, then rollback the ajax actions and show an message
										this.showSubformMessage(_cruxUtils.getI18n('crm.subform.revert.edit',this.getData('cxPropSection').display_label),'info');
										this.rollbackAjaxActions();
									}
								}
							}
						};
						if(this.filterApplied || (this.sortData && this.sortData.sort_order)){
								if(this.getMethods('refreshSubformData')){
									this.handleCallback(this.executeMethod('refreshSubformData'),(data)=>{
										setTimeout(()=>{
											maintainSubformState(data);
											this.handleCallbackResponse.call(this,data);
											this.highlightUpdatedRows(oldContent,this.getData('cruxTableContent'));
										},0);
									});
								}
						}else{
							if(this.getData('cruxTableAjaxEditId')){
								setTimeout(()=>{
									maintainSubformState(data);
									this.setData('cruxTableContent',newContent.slice(0));
									this.highlightUpdatedRows(oldContent,this.getData('cruxTableContent'));
								},0);
							}else{
								this.setData('cruxTableContent',newContent.slice(0));
								this.highlightUpdatedRows(oldContent,this.getData('cruxTableContent'));
							}
						}
					}
				}
			})
		}
		
	},
	compareRecords: function(currentRec,newRec){
		if(currentRec && newRec){
			let currJSON = currentRec, newJSON = newRec;
			let newCurr = {},newNew = {};
			Object.keys(this.fieldObject).forEach((key)=>{
				// if(this.serialNumberField && key===this.serialNumberField.api_name){
				// 	return;
				// }
				newCurr[key] = currJSON[key];
				newNew[key] = newJSON[key];
			});
			return $u.isEqual(newCurr,newNew);
		}
	},
	highlightUpdatedRows: function(currentRecords, newRecords){
		if(!currentRecords || !newRecords){
			return;	
		}
		let newRows = newRecords.filter((rec)=>{ return !currentRecords.find((curr)=>curr.id===rec.id); }).map((rec)=>rec.id);
		let modifiedRows = currentRecords.filter((rec)=>{ 
				return !this.compareRecords(rec,newRecords.find((newRec)=>newRec.id===rec.id));
		}).map((rec)=>rec.id);
		this.setData('selectedRows',newRows.concat(modifiedRows));
	},
	processClientScriptOnInit: function(){
		let clientScript = this.getData('cxPropCustomProperties');
		if(clientScript && Object.keys(clientScript).length && clientScript.subformField){
			//iterating field and setting the visibility, info icon values
				for(let fieldApi in clientScript.subformField){
					let csField = clientScript.subformField[fieldApi];
					if(csField.hasOwnProperty('setVisibility')){
						let value  = csField.setVisibility;
						this.clientScriptVisbility(this.fieldObject[fieldApi],value);
					}
					if(csField.hasOwnProperty('info')){
						let value  = csField.info;
						this.clientScriptInfo(this.fieldObject[fieldApi],value);
					}
				}
		}
	},
	clientScriptInfo: function(field,value){
		if(field){
			let fId = field.id,headerProp = this.getData('headerProperties');
			let prop ;
			if(headerProp[fId]){
				prop = headerProp[fId];
				if(!value){
					Lyte.objectUtils(prop,'delete','tooltip');
				}else{
					Lyte.objectUtils(prop,'add','tooltip',{'name':'Info Icon','value':value});
				}
			}else if(value){
				let tempObj =  {'tooltip':{'name':'Info Icon','value':value}};
				Lyte.objectUtils(headerProp,'add',fId,tempObj);
			}
		}
	},
	clientScriptVisbility: function(field,value){
		if(field){
			let fId = field.id,headerProp = this.getData('headerProperties');
			let prop ;
			if(headerProp[fId]){
				prop = headerProp[fId];
				Lyte.objectUtils(prop,'add','cxPropClass',value?'':'dN');
			}else{
				let tempObj =  {'cxPropClass':value?'':'dN'};
				Lyte.objectUtils(headerProp,'add',fId,tempObj);
			}
		}
	},
	clientScriptSetValue: function(obj,key,value){
		if(!obj){
			return;
		}
		if(!obj.hasOwnProperty(key)){
			Lyte.objectUtils(obj,'add',key, value!==undefined ? value : {});
		}else if(value!==undefined){
			//for criteriabj, we need to push the value to the array coz before component is rendered
			//there can be values in criteriaObj (canvas case)
			if(key === 'criteriaObj' && obj.criteriaObj){
				let criteriaObj = obj.criteriaObj;
				criteriaObj.push(value);
				Lyte.objectUtils(obj,'add','criteriaObj', Array.from(criteriaObj));
			}else{
				Lyte.objectUtils(obj,'add',key, value);
			}
		}
		return obj[key];
	},
	clientScriptRemoveValue: function(obj,key,remove){
		if(!obj){
			return;
		}
		if(remove){
			Lyte.objectUtils(obj,'delete',key);
		}else{
			return obj[key];
		}
	},
	clientScriptFunction: function(action,path,value){
		let pathArr,prevValue;
		if(!this.getData('cxPropCustomProperties')){
			this.setData('cxPropCustomProperties',{});
		}
		switch(action){
			case 'setValue': 
			pathArr = path.split('.');
			pathArr.forEach((temPath,index)=>{
				let arg = index === 0? this.data.cxPropCustomProperties : prevValue;
				prevValue = this.clientScriptSetValue(arg,temPath,index === pathArr.length-1?value:undefined);
			});
			break;
			case 'removeValue':
			pathArr = path.split('.');
			pathArr.forEach((temPath,index)=>{
				let arg = index === 0? this.data.cxPropCustomProperties : prevValue;
				prevValue = this.clientScriptRemoveValue(arg,temPath,index === pathArr.length-1?true:false);
			});
			break;
			case 'getValue':
			pathArr = path.split('.');
			let tempValue,finalValue;
			pathArr.some((temPath,index)=>{
				if(index===0 && this.data.cxPropCustomProperties){
					tempValue = this.data.cxPropCustomProperties[temPath];
				}else if(tempValue){
					tempValue = tempValue[temPath];
				}
				if(index === pathArr.length-1){ 
					finalValue = tempValue;
				}
				return !tempValue;
			});
			return finalValue;
		}
	},
	getFieldObject: function(apiName,isAggr){
		return isAggr ?  this.aggFieldObject[apiName] : this.fieldObject[apiName]?this.fieldObject[apiName]:this.aggFieldObject[apiName];
	},
	closeLastPopup: function(){
		if(this.lastPopup){
			let node = this.lastPopup.popupNode ? this.lastPopup.popupNode : $L(this.lastPopup.popupSelector,this.$node)[0];
			if(node){
				if(this.lastPopup.isCrux && node.cxProp('show')){
					node.cxProp('show',false);
				}else if(node.ltProp('show')){
					node.ltProp('show',false);
				}
			}
			delete this.lastPopup;
		}
		if(this.getData('isDefaultInvSubform')){
			let disTaxPopup = $L('crm-create-inventory-popup',this.$node);
			if(disTaxPopup[0] && !this.isInvAggr){
				disTaxPopup[0].remove();
			}
			let pbPopup =  $L('crux-lookup-modal',this.$node);
			if(pbPopup[0] && pbPopup[0].getData('show')){
				pbPopup[0].setData('show',false);
			}
		}
	},
	updateAggregateValue: function(apiNames){
		var content = this.data.cxPropContent;
		if(apiNames){
			apiNames.filter((apiName)=>this.getFieldObject(apiName,true)).forEach((apiName)=>{
				this.data.unboundObj[apiName] = content[apiName];
				this.$node.querySelector('#'+apiName).cxProp('value',content[apiName]);
			})
		}
	},
	//all the references to be set to null
	didDestroy: function () {
		this.lyteTable = null;
		this.lyteTableHead = null;
		this.subFormDiv = null;
		this.tableHead = null;
		this.tableScroll = null;
		this.lyteTableBody = null;
		this.lyteTableStructure = null;
		this.lyteTableScrollContainer = null;
		this.lastPopup = null;
		this.cruxTable = null;
		if (this.data.cxPropScrollQuery) {
			$L(this.data.cxPropScrollQuery === 'window' ? window : this.data.cxPropScrollQuery).off('scroll', this.handleScrollBind)
		}
		if(this.getData('cxPropAjaxEdit') && this.getData('cxPropType')==='view'){
			$L(this.$node).off('keydown',this.keyDownListener);
		}
		//if the row is made editable and without save if moved to some other page, the row stays editable
		if(this.getData('cxPropAjaxEdit')){
			if(this.getData('cruxTableAjaxEditId')){
				var record = store.peekRecord(this.getData('subformId'),this.getData('cruxTableAjaxEditId'));
				if(record.$.get('isAjaxEditable')){
					record.$.set('isAjaxEditable',false);
				}
			}
		}
		//deleting style from field object
		this.getData('cruxTableHeaderFields').forEach((field)=>{
			delete field.style;
			delete field.width;
		});

		if(this.changeListener){
			Lyte.removeEventListener( this.changeListener );
		}
		if(this.beforeChangeListener){
			Lyte.removeEventListener( this.beforeChangeListener );
		}
		Lyte.removeEventListener( this.clientListener );
		Lyte.removeEventListener(this.resizeListener);
		clearInterval(this.renderInterval);
	},
	getTextWidthUsingCanvas: function(text,propObj){
		var canvasElemCxt;
		var canvasElem = document.createElement("canvas");
		canvasElemCxt = canvasElem.getContext("2d");//no i18n
		canvasElemCxt.font = propObj.font;
	   // returns the width of param text with Specified propObj or with default values
	   return canvasElemCxt.measureText(text).width;
	},
	setViewPortDebounceTime : function(isInitialRendering){
		if(Lyte.Component.viewPortSettings){
			var pendingElementslen = 0, debounceTimer;
			pendingElementslen = LyteComponent.pendingViewPortElements && LyteComponent.pendingViewPortElements.length ? LyteComponent.pendingViewPortElements.length : 0;
			if(pendingElementslen < 100){
				debounceTimer = 0;
			}else if(pendingElementslen >= 100 && pendingElementslen < 200){
				debounceTimer = 25;
			}else if(pendingElementslen >= 200 && pendingElementslen < 300){
				debounceTimer = 50;
			}else if(pendingElementslen >= 300){
				debounceTimer = 100;
			}
			if(isInitialRendering || Lyte.Component.viewPortSettings.debounce !== debounceTimer){
				Lyte.Component.viewPortSettings.debounce = debounceTimer;
			}
		}
	},	
	readTableColumns: function(rowElem){
		var transform = []
		var children = rowElem[0].children;
		for(var i=0;i<children.length;i++){
			if(!children[i].style.transform || !children[i].classList.contains('lyteTableFixed')){
				break;
			}
			transform.push(children[i].style.transform);
		}
		return transform;
	},
	fixTableColumns: function(rowElem,transform){
		var children = rowElem[0].children;
		for(var i=0;i<transform.length;i++){
			children[i].style.transform = transform[i];
			children[i].classList.add('lyteTableFixed')
		}
	},
	conditionalAggr: function(criteria,record){
		if(criteria.group_operator){
			var opr = criteria.group_operator;
			var grp = criteria.group;
			var final;
			for(var i=0;i<grp.length;i++){
				var res = conditionalAggr(grp[i]);
				console.log(grp[i])
				if(opr=="AND"){
					if(!res){
						return res;
					}else{
						final = final ?  final && res :  res;
					}
				}else{
					if(res){
						return res;
					}else{
						final = final ?  final || res :  res;
					}
				}
			}
			return final;
		}else{
			//evaluate criteria func
			var comp = criteria.comparator;
			var apiname = criteria.field.api_name;
			var trgVal = criteria.value;

			return true;
		}
	},
	isProductActivePresent: function(){
		if(moduleRecordMapping &&  moduleRecordMapping.Products && moduleRecordMapping.Products.fields){
			let fields = moduleRecordMapping.Products.fields;	
			let codeField =  fields.filter(function(rec){return rec.api_name === 'Product_Active'})[0]
			let profile = codeField && codeField.profiles ? codeField.profiles.some((profile)=>{return this.getData('cxPropProfileName') === profile.name})[0] : undefined
			if(codeField && ((profile && profile.permission_type !== "hidden") || codeField.visible)){
				return true;
			}
		}
	},
	updateRecordValue: function(recordId,apiName,value){
		var record = store.peekRecord(this.getData('subformId'),recordId);
		if(record && apiName){
			let field = this.getFieldObject(apiName);
			record.$.set(apiName,value);
			this.executeOnChange(field,
					record,value,
					this.getData('cxPropContent')[this.getData('subformApiName')].findIndex(e=>e.id===recordId),field.cxTypeMapping,undefined,true);
		}
	},
	fetchModuleData: function(id){
		if (this.getMethods("fetchModuleData")) {
			/**
			 * This callback is fired to fetch the lookup module data.
			 * @method fetchModuleData
			 * @author gowtham
			 
			 * @param { string } id - module id
			 */
			return this.executeMethod("fetchModuleData", id);
		}
		return store.findRecord("module", id).then(function (data) {
			return data[0];
		});
	},
	fetchRecord: function(modId,recordId){
		return  store.findRecord(modId,recordId);
	},
	fetchRecords: function(field,modId, params){
		if (this.getMethods("fetchRecords")) {
				/**
				 * This callback is fired to fetch the lookup record data.
				 * @method fetchRecords
				 * @author gowtham
				 
				 * @param { string } modId
				 * @param { object } params
				 */
				return this.executeMethod("fetchRecords", modId, params,field);
			}
			

				let criteria,customData,csData= this.getData('cxPropCustomProperties');
				if(!(field.lookup && field.lookup.query_details && field.lookup.query_details.query_id) ){
					delete params.child_data;
				}
				/*{
					"criteria": "((Product_Name:equals:All tax product))",
					"criteriaObj": [
						{
							"api_name": "Product_Name",
							"comparator": "equals",
							"value": "All tax product"
						}
					]
				} */
				let csCriteria = csData && csData.subformField && csData.subformField[field.api_name] && csData.subformField[field.api_name].criteria;;
				let activeProducts = field.lookup.module.api_name==='Products' ? true : false;
				let activeBundels =  field.lookup.module.api_name==='Bundles__s' ? true : false;
				let isSearch = csCriteria || params.filters || activeProducts || activeBundels?true:false;
				if(isSearch){
					let concatQuery = (cr1,cr2)=>{
						return cr1 ? cr2 ? `(${cr1}and${cr2})` : cr1 : cr2;
					}
					if(params.filters){
						criteria = params.filters;
						delete params.filters;
					}
					if(csCriteria && (csCriteria.originalCriteria || csCriteria.criteria)){
						criteria = concatQuery(criteria,csCriteria.originalCriteria || csCriteria.criteria);
					}
					if(activeProducts && this.isProductActivePresent()){
							criteria = concatQuery(criteria,'(Product_Active:equals:true)');
					}else if(activeBundels && this.isBundleActivePresent()){
							criteria = concatQuery(criteria,'(Active:equals:true)');
					}
					if(criteria){
						customData = {type : "Search" , from : "Lookup",criteria:criteria};
					}
				}
				params.approved = "both";
                params.approval_state = "approved,approval_process_pending,approval_process_rejected";
				return store.findAll(modId,params,undefined,undefined,customData);
			
	},
	isBundleActivePresent: function(){
		if(moduleRecordMapping &&  moduleRecordMapping.Bundles && moduleRecordMapping.Bundles.fields){
			let fields = moduleRecordMapping.Bundles.fields;	
			let codeField =  fields.filter(function(rec){ return rec.api_name === 'Active'; })[0];
			let profile = codeField && codeField.profiles ? codeField.profiles.some((profile)=>{ return this.getData('cxPropProfileName') === profile.name; })[0] : undefined;
			if(codeField && ((profile && profile.permission_type !== "hidden") || codeField.visible)){
				return true;
			}
		}
	},
	executeOnChange: function(field,record,value,rowNo,componentName,component,isUtil){
		var apiName = field.api_name;
		//only for create or edit, below code needs to be executed because during view the parent picklist will be disabled
		if(componentName==="picklist" && field.cxType==='single'){
			this.checkForDependancyFields(rowNo,record,apiName,value);
		}
		//if value is selected in lookup, FOL has to be populated, when value removed, FOL shouldn't be removed
		if(value){
			this.checkForAssociatedFields(field,apiName,value,record,componentName,isUtil);
		}else{
			this.executeInventoryFOL(field,record,value,apiName);
		}
		this.valueChangeHandler(field, record, rowNo, componentName, component, record[field.api_name],isUtil);
	},
	executeInventoryFOL: function(field,record,value,apiName){
		var fieldObj = record.$.model.fieldList[apiName];
		var type = (fieldObj.fieldType==="formula")?fieldObj.type: fieldObj.fieldType;
		if(this.getData('isDefaultInvSubform') && type==="lookup" && this.handleInventoryCheck('LOOKUP','compare',field)){
				this.getData('cxPropSection').fields.filter(function(field){ return (["TAX", "DISCOUNT"].includes(field.column_name)) || (field.column_name === 'QUANTITY' && field.visible); })
				.forEach(function(field){
					var newValue = field.column_name==="QUANTITY" ? 1:0;
					record.$.set(field.api_name,newValue);
				});

				record._LC_additional_INV_subform_INFO = {};
				record.$.set("Price_Book_Name",undefined);
				this.fetchAndUpdateTaxDetails(apiName, value, record);
		}
	},
	valueChangeHandler: function(field, record, rowNo, componentName, component, value,isUtil){
		var apiName = field.api_name;
		if (this.getData('isDefaultInvSubform')) {
			if(field.column_name==="TOTAL"|| this.handleInventoryCheck("SUBTOTAL",'compare',field))
			{
				this.updateInvDiscountAndTaxValues(field,record,rowNo===-1)
			}
		}
		this.evaluateFormulaFields(rowNo,undefined,apiName,field);

		if (this.getMethods("onValueChange") && !isUtil) {
			/**
			 * This callback is fired when value of a field is changed
			 * @method onValueChange
			 * @author gowtham
			 
			 * @param { string } apiName - apiname of the field for which the value changed
			 * @param { number } rowNo - row number of the field
			 * @param { string } componentName - name of the crux component
			 * @param { string } value - changed value
			 * @param { component } component - instance of the field component
			 */
			this.executeMethod("onValueChange", apiName, rowNo, componentName, value, component,field);
		}

	},
	rollbackAjaxActions: function(){
		if(this.getData('cruxTableAjaxEditId')){
				this.rollbackChange(this.getData('cruxTableAjaxEditId'));
		}
	},
	disableTableScroll: function(){
		this.dropdownOpened = true
		if(this.lyteTableStructure){
			this.lyteTableStructure.addClass('preventWheel');
		}
		if(this.lyteTableScrollContainer){
			this.lyteTableScrollContainer.addClass('cxHide');	
		}
	},
	enableTableScroll: function(){
		this.dropdownOpened = false
		if(this.lyteTableStructure){
			this.lyteTableStructure.removeClass('preventWheel');
		}
		if(this.lyteTableScrollContainer){
			this.lyteTableScrollContainer.removeClass('cxHide');	
		}
	},
	handleProductHovercard: function(record,field,rowNo,show){
		if(field && this.handleInventoryCheck('LOOKUP','compare',field)){
			var hoverCard = $L('#invPopoverLookuphoverCard',this.$node)[0];
			this.isInvLookupDropdownOpened = !show;
			if(!show){
				hoverCard.ltProp('show',false);
			}
			// if(show){
			// 	// this.setProductTootlipValue(record,field,this.getFieldId(field.api_name,rowNo));
			// }else{
			// 	hoverCard.ltProp('show',false);
			// }
		}
	},
	rollbackChange: function(id){
		var record = store.peekRecord(this.getData('subformId'),id),field= store.peekRecord('field',id);
		var content = this.data.cxPropContent;
		this.enableTableScroll();
		if(this.getMethods('onAjaxCancel')){
			this.executeMethod('onAjaxCancel',id);
		}
		if(record){
			this.setData('disableAjaxEdit',false);

			var index = this.getData('cruxTableContent').findIndex(function(rec){ return rec.id===id; });
			var type = this.getData('cxPropType');
			var tableContent = this.getData('cruxTableContent');
			var apiname = this.getData('subformApiName');
			var ajaxEditId = this.getData('cruxTableAjaxEditId');
			//actual index is needed to insert into the
			var actualSrcRowIndex = content[apiname].findIndex(function(recordObj){
				return recordObj.id===ajaxEditId;
			});
			var transform;
			var isNew = record.$.isNew;
			if (isNew) {
				Lyte.arrayUtils(tableContent, 'removeAt', index);
			}
			else{
				var exClass = record.cxPropClass ? record.cxPropClass.replace('cxSubformTdFreeze',''):'';
				Lyte.objectUtils(record,'add','cxPropClass',exClass);
				transform = this.readTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${index+1})`,this.$node));
				delete record._LC_additional_INV_subform_INFO;
			}
			record.$.rollBack();
			content.$.rollBack();//rollbacking parent because line_tax is getting set as dirty when new row is added in inv modules
			record.$.set('isAjaxEditable',false);
			this.setData('cruxTableAjaxEditId', null);
			if(!isNew){
				this.fixTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${index+1})`,this.$node),transform)
			}
			if (isNew && this.serialNumberField && actualSrcRowIndex!==-1) {
				this.setSerailNumber(actualSrcRowIndex);
			}
			if((type==="create" || type==="edit") && tableContent && tableContent.length===0){
				this.createRecord();
			}
			// var tableScroll = this.lyteTable[0];
			// tableScroll.scrollTable();
			this.evaluateFormulaFields(-1,true);
			this.checkAndDisableInsertRow();
		
		}else if(field){
			content = this.data.cxPropContent;
			this.setData('disableAjaxEdit',false);
			// Lyte.objectUtils(field,"add",'hideCurrency',false)
			// Lyte.objectUtils(field, "add", "from", "view");
			this.setData('aggrTableAjaxEditId', null);
			var dirtyArr = content.$.getDirtyAttributes();
			if(this.isDefaultInvSubform && field.subform && this.handleInventoryCheck('TAXDISCOUNT','compare',field)){
				delete content.invPopoverdata;
				this.handleInventoryCheck('discount','setValue',undefined,content,this.prevDiscountDetails);
				this.handleInventoryCheck('currentTax','setValue',undefined,content,this.prevTaxDetails);
			}
			//else{
			// 	content.$.rollBack();
			// 	// content.$.rollBackAttributes(field.api_name);
			// 	// //TODO:
			// 	// content.$.set(field.api_name,content[field.api_name]);

			// }
			content.$.rollBack();

			if(this.getData('cxPropUnbound')){
				dirtyArr.forEach((apiName)=>{
					this.$node.querySelector('#'+apiName).cxProp('value',this.data.cxPropContent[apiName]);
				})			
			}
			this.checkAndDisableInsertRow();
		}
		if(this.getMethods('onAfterAjaxCancel')){
			this.executeMethod('onAfterAjaxCancel',id);
		}
	},
	setWidthForFilter: function(show){
		var filterBtnIdx = this.$node.querySelector('crux-lookupfilter-component').component.data.firstIndex;
		var filterButtonField = this.getData('cruxTableHeaderFields')[filterBtnIdx];
		if(filterButtonField && filterButtonField.width){
			var width = this.getData('cxPropCustomWidth') && filterButtonField.subform_properties && filterButtonField.subform_properties.custom_width? filterButtonField.subform_properties.custom_width:parseInt(filterButtonField.width.substring(0,filterButtonField.width.length-2));
			if(((this.getData('cxPropCustomWidth') && show) || (!this.getData('cxPropCustomWidth'))) && width<120){
				var style = `min-width:120px;width:120px;max-width:120px`;
				filterButtonField.width='120px';
				Lyte.objectUtils(filterButtonField,'add','style',style);
			}else if((this.getData('cxPropCustomWidth') && !show)){
				var style = `min-width:${width}px;width:${width}px;max-width:${width}px`;
				filterButtonField.width=width+'px';
				Lyte.objectUtils(filterButtonField,'add','style',style);
			}
		}
	},
	openEdit: function(isAggr,fieldOrRecord,rowNo){
		if(!isAggr && this.getData('cxPropDisableEdit')){
			return;
		}
		this.setData('disableAjaxEdit',true);
		this.customData = {cxSubformEdit:true}
		// this.detailsForKeyDown = {
		// 	'isAggr': isAggr,
		// 	'rowIndex': rowNo-1,
		// 	'fieldOrRecord': fieldOrRecord
		// };
		if(this.getMethods('onAjaxEdit')){
			this.executeMethod('onAjaxEdit',fieldOrRecord.id,isAggr)
		}
		if (isAggr) {
			// Lyte.objectUtils(fieldOrRecord,"add",'hideCurrency',true)
			// Lyte.objectUtils(fieldOrRecord, "add", "from", "create");
			this.setData('aggrTableAjaxEditId', fieldOrRecord.id);
		}
		else {
			
			//helper is used to set -None- for picklist
			if(this.getData('isDefaultInvSubform')){
				delete fieldOrRecord._LC_additional_INV_subform_INFO;
				this.fetchInventoryProductDetails(fieldOrRecord);
			}
			var transform = this.readTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${rowNo})`,this.$node));
			var record = store.peekRecord(this.data.subformId,fieldOrRecord.id);
			record.$.set('isAjaxEditable',true);
			this.setData('cruxTableAjaxEditId', fieldOrRecord.id);
			var csData = this.getData('cxPropCustomProperties');
			if(csData && csData.subformRow && csData.subformRow[fieldOrRecord.id] && csData.subformRow[fieldOrRecord.id].hasOwnProperty('readOnly')){
				var rec = store.peekRecord(this.data.subformId,this.getData('cruxTableAjaxEditId'));
				var exClass = rec.cxPropClass;
				if(csData.subformRow[fieldOrRecord.id].readOnly){
					Lyte.objectUtils(rec,'add','cxPropClass',exClass+' cxSubformTdFreeze');
				}else{
					exClass = exClass.replace('cxSubformTdFreeze','');
					Lyte.objectUtils(rec,'delete','cxPropClass',exClass);
				}
			}
			//disable parent picklist
			// this.parentPicklist.forEach(function(field){
			// 	var elem = $L(this.getFieldId(field.api_name,rowNo));
			// 	if(elem[0]){
			// 		elem[0].cxProp('disabled',true);
			// 	}
			// }.bind(this))

			this.checkForDependancyFields(rowNo,record);
			
			// this.enableOrDisbleApplyFilter(false);
			//CRMCODE: INV-CHANGES

			this.evaluateFormulaFields(rowNo);
			this.fixTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${rowNo})`,this.$node),transform);
			// this.lyteTable[0].scrollTable();				
		}

	},
	actions : {
		bodyRowClick: function(){
			return false;
		},
		subformFieldFocus: function(elem){
			if(!this.getData('cxPropScrollFieldIntoView')){
				return
			}	
			var fixedColumns  = $L("#headerRow lyte-th[fixed='enable']",this.$node);//eslint-disable-line @zoho/webperf/no-attribute-selectors
			var len = fixedColumns.length;
			var headerFields = this.getData('cruxTableHeaderFields');
			var fixedWidth = fixedColumns[0].offsetWidth;
			for(var col=1;col<len;col++){
				let width = headerFields[col].width;
				fixedWidth+= parseInt(width.substring(0,width.length-2));
			}
			var tableScrollDiv =this.tableScroll;
			var td = elem.closest('lyte-td')
			//browser scrolls the hidden element due to which the scroll left changes, to overcome this taking the scroll left before scroll
			var scrollLeft = this.tableScrollLeft ? this.tableScrollLeft : tableScrollDiv.scrollLeft
			var offLeft = td.offsetLeft;
			var elemWidth = td.offsetWidth;
			var isRTL = this.getData('cxPropIsRtlEnabled');
			//81 because of ajax edit buttons
			var tableWidth = tableScrollDiv.offsetWidth-81;
			if(isRTL){
				offLeft = tableScrollDiv.scrollWidth - (offLeft+elemWidth);
				scrollLeft *= -1;
				if((scrollLeft > (offLeft - fixedWidth)) || (offLeft+elemWidth>tableWidth && scrollLeft<(offLeft+elemWidth-tableWidth))){	
					setTimeout(()=>{
						tableScrollDiv.scrollLeft = -1*(offLeft - fixedWidth);
					},150)
				}
			}else{
				if((scrollLeft > (offLeft - fixedWidth)) || (offLeft+elemWidth>tableWidth && scrollLeft<(offLeft+elemWidth-tableWidth))){
					setTimeout(()=>{
						tableScrollDiv.scrollLeft = offLeft - fixedWidth;
					},150)
				}
			}

			
		},
		//show pricebook range and discount
		showPriceBookTooltip: function(record,rowIndex){
				var priceBookHoverCard = $L('#priceBookPopoverhoverCard',this.$node)[0];
				var moduleName = this.getData('cxPropModuleData')?this.getData('cxPropModuleData').api_name:'';
				var tooltipVal = (record.Price_Book_Name)?store.peekRecord(moduleRecordMapping.PriceBooks.id,record.Price_Book_Name.id):'';
				if(!tooltipVal){
					var totAftrDisc = record.Total_After_Discount ? record.Total_After_Discount : 0;
					var discount = record.Discount ? record.Discount : 0;
					var total = totAftrDisc + discount;
					if( total === 0 || discount === 0){
						tooltipVal = {tooltipMsg:_cruxUtils.getI18n("crm.inventory.lineitem.no.pricebook.new",[moduleRecordMapping.PriceBooks.plural_label])}
						//is CPQ
						if(moduleName===moduleRecordMapping.Quotes.api_name && Crm.isCpqActivated()){
							tooltipVal = {tooltipMsg:_cruxUtils.getI18n("cpq.pr.nodiscount")}
						}
					}else{
						if(Crm.userDetails.isDiscountFieldEnhancementMigrationCompleted){
							//discount type check
							if(disType==='Direct Price'){
								tooltipVal = {tooltipMsg:record.Discount}
							}else{
								var percent = total === 0 ? 0 : record.Discount * 100 / total;
								tooltipVal = {tooltipMsg:percent+'%'}
							}
						}else{
							var percent = total === 0 ? 0 : record.Discount * 100 / total;
							percent = this.getRoundOffValue(percent,true);
							tooltipVal = {tooltipMsg:_cruxUtils.getI18n("Discount Percentage")+' '+percent+'%'}
						}
					}
				}
				this.setData('priceBookTootlipValue',tooltipVal);
				priceBookHoverCard.ltProp({'originElem':`#pricingInfo_${this.getData('subformUniqueId')}_${rowIndex}`,'show':true});
				this.lastPopup = {popupNode:priceBookHoverCard,isCrux:false};
				event.stopPropagation();//TODO: added to crm detail view
		},
		setInvTooltipValue: function(dBind,curntFld,rowIndex){
			if(this.getData('isDefaultInvSubform')){
				if(this.handleInventoryCheck('LOOKUP','compare',curntFld)){
					this.setInvLookupTootlipValue(dBind,curntFld,this.getFieldId(curntFld.api_name,rowIndex));
				}
				else if(curntFld.column_name === "TAX" && (!this.getData('cxPropMaskingEnabled') || (this.unMaskCheckNeeded(curntFld) && this.checkUnMaskPermission(curntFld)) )
					|| (curntFld.column_name === "DISCOUNT" && this.getData('showDiscountPerTooltip')))
				{
					this.setDiscountTaxTootlipValue(dBind,curntFld,this.getFieldId(curntFld.api_name,rowIndex));
				}
			}
		},
		hideInvTootlipValue : function(curntFld){
			if(this.getData('isDefaultInvSubform')){
				if(curntFld.column_name	=== "TAX" || curntFld.column_name	=== "PRODUCTID"){
						var selector = curntFld.column_name	=== "TAX" ? "#invPopoverhoverCard" : "#invPopoverLookuphoverCard";//No I18n
						var hoverCard = $L(selector,this.$node)[0];
						if(hoverCard){
							hoverCard.ltProp('show', false);//No I18n
							this.lastPopup = {popupSelector:selector,isCrux:false};
						}
				}
			}
		},
		showPriceBookLookup: function(record,field){
			var _this = this;
			var section = this.getData('cxPropSection');
			var priceBookField = section.fields.filter(function(field){ return field.column_name==="BOOKID"})[0];
			var listPriceField = {field_label : _cruxUtils.getI18n('List Price'), api_name : 'list_price',ui_type : 36};
			//creating fields for lookup
			var fields = [];
			_cruxUtils.showLookupModal({
				body:this.$node,
				data : {
				cxPropValue: record.$.get(priceBookField.api_name)?record.$.get(priceBookField.api_name):'',
				cxPropFields: fields,
				cxPropOldFlow : true,
				cxPropReturnFullObjectOnGet: true,
				cxPropField : {data_type : "lookup" , lookup : {module : {id : priceBookField.lookup.module.id}}},
				cxPropNumberProperties:{isoCode:this.getData('cxPropContent').Currency,exchangeRate:this.getData('cxPropContent').Exchange_Rate},
				fieldMapping : {36:'number'}
				},
				methods : {
				onValueChange : function(selectedPb){
					record.$.set(priceBookField.api_name,selectedPb);
					//ROUND OFF
					var listPrice = _this.getRoundOff(field,selectedPb.list_price);
					record.$.set(field.api_name,listPrice)

					if(!record._LC_additional_INV_subform_INFO){
						record._LC_additional_INV_subform_INFO = {};
					}
					var finalDiscount = _this.getPriceBookDiscount({ pbRecord : selectedPb },record);
					var discountField = section.fields.find(function(field){ return field.column_name==="DISCOUNT"});

					var discount = _this.getRoundOff(discountField,finalDiscount); 
					record.$.set(discountField.api_name,discount)
					record._LC_additional_INV_subform_INFO.priceBookRecord = selectedPb;
					if(typeof record._LC_additional_INV_subform_INFO === "object"){
						var existingObj = Lyte.deepCopyObject(record._LC_additional_INV_subform_INFO);
						existingObj.discountValueSource = "priceBook";//no i18n
						Lyte.objectUtils(record ,"add", "_LC_additional_INV_subform_INFO", existingObj);//no i18n
					}

					//update discount
					// _this.fetchInventoryProductDetails(record);
				},
				fetchRecords : function(modId, queryParams){
					_this.showHideLoadingDiv(true);
					var productDetails = record.Product_Name;
					var productModuleData = moduleRecordMapping.Products;
					queryParams.relatedId = productDetails.id;
					return store.findAll("related_list",{module : productModuleData.api_name}).then(function(response){
						var priceBook = response.filter(function(obj){if(obj.api_name==="Price_Books"){return true}})[0];
						queryParams.relationId = priceBook.id;
						queryParams.approved = "both";
						queryParams.approval_state = "approved,approval_process_pending,approval_process_rejected";
						return store.findAll(moduleRecordMapping.Products.id,queryParams,undefined,false).then(function(resp){
							let respArr = resp[moduleRecordMapping.Products.id];
							if(_cruxUtils._getProperty('isMultiCurrencyEnabled')){
								let er = _this.getData('cxPropContent').Exchange_Rate;
								respArr.forEach((record)=>{
									if(record.hasOwnProperty('list_price')){
										record.list_price = isNaN(record.list_price * er) ? record.list_price : record.list_price * er;
									}	
								})
							}
							return respArr;
						});
					}).finally(()=>{
							_this.showHideLoadingDiv(false);
					});
				},
				fetchModuleData : function(modId){
				_this.showHideLoadingDiv(true);
				var record = store.peekRecord("module", modId);
				if(record && record.fields){
					var listPriceIndex = record.fields.findIndex(function(field){ return field.api_name==='list_price'});
					record.fields.splice(listPriceIndex,1);

				}
				return store.findRecord("module", modId).then(function (resp) {
									var data = resp;
									data[0].fields.push(listPriceField);
									var tempFields = data[0].fields.filter(function(field){if(["Price_Book_Name","Active","Pricing_Model","list_price"].includes(field.api_name)){return true}});
									Lyte.arrayUtils(fields,'push',tempFields)
									return data[0];
							},function(resp){
								_this.handleServerErrorResponse(resp);
							}).finally(()=>{
							_this.showHideLoadingDiv(false);
						});
						}
					}
				})
		},
		renderInvSubformPopover: function (field, record, originElem, isAggr) {
			this.setData('aggrTableAjaxEditId',record.id);
			
			var _invPopNode = $L('crm-create-inventory-popup')[0];//No I18n
			if (_invPopNode) {
				_invPopNode.remove();
			}
			if(this.getMethods('onAjaxEdit') && isAggr){
				this.executeMethod('onAjaxEdit',field.id,isAggr)
			}
			var popoverCompData = {};
			popoverCompData.isProductSubform = !isAggr && this.isProductSubform;
			popoverCompData.isBundleSubform = !isAggr && this.isBundleSubform;
			popoverCompData.isGrandPopOver = isAggr && this.isProductSubform;
			popoverCompData.isGrandBundlesPopOver = isAggr && this.isBundleSubform;
			popoverCompData.moduleData = this.data.cxPropModuleData;
			if(isAggr){
				this.customData = {cxSubformEdit:true}
				popoverCompData.isTaxable = true;
			}
			//how to get the route
			popoverCompData.freeze = true;
			popoverCompData.initRoute = 'view';
			popoverCompData.invPopoverOriginElem = originElem.id;
			if(this.handleInventoryCheck('TAX','compare',field)){
				popoverCompData.showTaxpopup = true;
			}else if(this.handleInventoryCheck('DISCOUNT','compare',field)){
				popoverCompData.showDiscountpopup = true;
			}
			let invPopoverdata;
			let tempInvData;
			if(popoverCompData.showDiscountpopup){
				if(!record.invPopoverdata){
					invPopoverdata = this.isBundleSubform && isAggr ?  { bundleDiscountObj: { chkdinvDisPercent: true } } :  { discountObj: { chkdinvDisPercent: true } };
					tempInvData = invPopoverdata;
				}else{
					if(this.isBundleSubform && isAggr){
						if(!record.invPopoverdata.bundleDiscountObj){
							tempInvData = {bundleDiscountObj: { chkdinvDisPercent: true }};
						}else{
							tempInvData = {bundleDiscountObj:record.invPopoverdata.bundleDiscountObj};
						}
						invPopoverdata = Object.assign({},tempInvData);
					}else{
						if(!record.invPopoverdata.discountObj){
							tempInvData = {discountObj: { chkdinvDisPercent: true }};
						}else{
							tempInvData = {discountObj:record.invPopoverdata.discountObj};
						}
						invPopoverdata = Object.assign({},tempInvData);
					}
				}

				popoverCompData.invPopoverdata = tempInvData;

			}
			
			record.invPopoverdata = invPopoverdata;
			popoverCompData.currentFieldMeta = field;
			var _finalNode = Lyte.Component.render('crm-create-inventory-popup', popoverCompData, this.$node);//No I18
		
			popoverCompData.currentSubformRecord = record;
			//CRMCODE:
			this.invDataBind = record;
			this.isInvAggr = isAggr;
			if (isAggr && !record._LC_additional_INV_subform_INFO) {
				record._LC_additional_INV_subform_INFO = {};
			}
			this.prevDiscountDetails = record._LC_additional_INV_subform_INFO ? Object.assign({}, this.handleInventoryCheck('discount','getValue',undefined,record)): undefined;
			this.prevTaxDetails = record._LC_additional_INV_subform_INFO ? Object.assign({},this.handleInventoryCheck('currentTax','getValue',undefined,record)): undefined;
			_finalNode.component.showInvPopover(popoverCompData, this.onInventoryPopoverSelect.bind(this,field, record));

		},
		removeRow: function(index){
			if(this.getData('cxPropDisableDelete') 
				|| this.getData('disableDelete') 
				|| this.getData('cxPropDisableEdit')
				||	(this.getData('cxPropType')==='create' && this.getData('cxPropDisableCreate'))){
				return;
			}
			this.deleteRow(index);
		},
		//below action gets called when show all button is clicked
		showAll: function () {
			this.showAllRecords();
		},
		showActions: function (rowId, rowElem, isAggr) {
			if (isAggr) {
				this.setData('aggrHoverRowId', rowId);
			} else {

				if (this.getData('cxPropType') === 'view' && ((this.getData('cruxTableAjaxEditId') && this.getData('cruxTableAjaxEditId') !== rowId)
					|| (!this.getData('cruxTableAjaxEditId') && (!this.getData('cxPropAjaxEdit')
						|| this.getData('cxPropDisableAjaxEdit') || this.getData('disableAjaxEdit'))))) {
					return;
				}
				if (this.getData('cxPropType' === 'view')) {
					var csData = this.getData('cxPropCustomProperties');
					if (csData && csData.subformRow && csData.subformRow[rowId] && csData.subformRow[rowId].readOnly) {
						this.setData('showEditButton', false)
					} else {
						this.setData('showEditButton', true)
					}
					// if (this.getData('isStaticSubform') && store.peekRecord(this.getData('subformId'), rowId).isStaticRow) {
					// 	this.setData('cxPropShowActionButton', false)
					// } else {
					// 	this.setData('cxPropShowActionButton', true)
					// }
					if (this.getData('selectedRows').includes(rowId)) {
						//this is passed to crux table to highlight the rows
						this.setData('selectedRows', [])
						// Lyte.arrayUtils(this.getData('selectedRows'), 'pop');
					}
				}
				this.setData('subformHoverRowId', rowId);
			}

		},
		hideActions: function (rowId, rowElem, isAggr) {
			if (isAggr) {
				this.setData('aggrHoverRowId', null);
			} else {
				// if (!this.menuOpened) {
					this.setData('subformHoverRowId', null);
				// }
			}
		},
		//below function is invoked for both subform and aggregate table
		triggerSave: function (field,isAggr,indexVal) {
			setTimeout(this.saveChanges.bind(this,field,isAggr,indexVal),10);
		},
		triggerRollback: function (id) {
			this.rollbackChange(id);
		},
		scrollToTop: function () {
		event.stopPropagation();//TODO: added to crm detail view
		this.scrollToTop(200);
		},
		addRow: function(){
			this.customData = {cxSubformCreate:true}
			this.createRow();
		},
		editRow: function (isAggr,fieldOrRecord,rowNo) {
			this.openEdit(isAggr,fieldOrRecord,rowNo);
		},
		toggleFilter: function (event) {
			var tableContent = this.getData('cruxTableContent');
			if (tableContent.length===0 && !this.filterApplied || (tableContent.length===1 && tableContent[0].$.isNew)) {
				return;
			}
			this.setData('cruxTableShowFilter', !this.data.cruxTableShowFilter);
			//if filter comp gets removed, rows not in viewport won't get rendered
			if(this.getData('cruxTableShowFilter')){
				Lyte.Component.viewPortSettings.executePendingViewPortElements();
			}
			Lyte.objectUtils(this.getData('filterProperties'),'add','title',!this.data.cruxTableShowFilter?_cruxUtils.getI18n('crm.button.show.filter'):_cruxUtils.getI18n('crm.report.clear.filter'));
			//when the filter is closed, the filter has to cleared
			if(!this.data.cruxTableShowFilter && this.filterApplied){
				this.clearFilter($L('crux-lookupfilter-component',this.$node)[0],event);
			}
			//if there is any fixed columns, scrolling to right and opening the filter component breaks the table
			if (this.data.cruxTableShowFilter) {
				var transform = this.readTableColumns($L('#headerRow',this.$node));
				this.fixTableColumns($L('crux-lookupfilter-component',this.$node),transform);
				
				// this.lyteTable[0].scrollTable();
			}
			if (this.isHeaderFixed) {
				var scrollQuery = $L(this.data.cxPropScrollQuery)[0];
				var scrollTop = scrollQuery.scrollTop;
				if (this.data.cruxTableShowFilter) {
					scrollQuery.scrollTop = scrollTop + 1;
					scrollQuery.scrollTop = scrollTop - 1;
				} else {
					scrollQuery.scrollTop = scrollTop + 1;
					scrollQuery.scrollTop = scrollTop - 1;
				}
			}
			if(this.getData('cxPropCustomWidth')){
				this.setWidthForFilter(this.getData('cruxTableShowFilter'));
			}
		}
	},
	methods : { 
		errorCallback: function(code,ele){
			if(this.getMethods('onError')){
				this.executeMethod("onError",code,ele)
			}
		},
		previewClose: function(comp){
			if(this.getMethods('onPreviewClose')){
				return this.executeMethod("onPreviewClose",comp)
			}
		},
		cropSuccess: function(res,value){
			if(this.getMethods("onCropSuccess")){
	    		return this.executeMethod("onCropSuccess",res,value)
			}
		},
		expandImageView: function(comp){
			if(this.getMethods("onExpandImageView")){
	    		return this.executeMethod("onExpandImageView",comp)
	    	}
	    },
		customUserRequest: function(a,b,c,d,e){
			if(this.getMethods("onCustomUserRequest")){
	    		this.executeMethod("onCustomUserRequest", a,b,c,d,e)
	    	}
		},
		customRequest: function( a,b,c,d,e){
			if(this.getMethods("onCustomRequest")){
	    		this.executeMethod("onCustomRequest", a,b,c,d,e)
			}
		},
		lookupHoverFetchBcData: function(modId, recId){
			if(this.getMethods("onLookupHoverFetchBcData")){
	    		return this.executeMethod("onLookupHoverFetchBcData",modId, recId);
			}
		},
		customRequest: function( a,b,c,d,e,field){
			if(this.getMethods("onCustomRequest")){
	    		return this.executeMethod("onCustomRequest", a,b,c,d,e,field);
	    	}
		},
		showLess: function(comp){
			//the row will be scrolled to top
			if(this.isHeaderFixed){
				var row = comp.$node.closest('lyte-tr');
				var headerBottom = this.lyteTableHead[0].getBoundingClientRect().bottom;
				var rowTop = row.getBoundingClientRect().top;
				if(rowTop<headerBottom){
					var container = $L(this.data.cxPropScrollQuery);
					this.setData('subformHoverRowId', null);
					container[0].scrollTop = container[0].scrollTop - (headerBottom-rowTop);
				}
			}
		},
		beforeShow: function(record,field,rowNo,arg1,arg2){
			this.data.isDefaultInvSubform ? this.handleProductHovercard(record,field,rowNo,false) : "";
			this.disableTableScroll();
			if(this.getMethods("onBeforeShow")){
	    		return this.executeMethod("onBeforeShow",record,field,rowNo,arg1,arg2);
	    	}
		},
		beforeHide: function(record,field,rowNo,arg1,arg2){
			this.enableTableScroll();
			if(this.getMethods("onBeforeHide")){
	    		return this.executeMethod("onBeforeHide",record,field,rowNo,arg1,arg2);
	    	}
		},
		show: function(record,field,rowNo,arg1,arg2){
			this.disableTableScroll();
			if(this.getMethods("onShow")){
	    		this.executeMethod("onShow",record,field,rowNo,arg1,arg2);
	    	}
		},
		hide: function(record,field,rowNo,arg1,arg2){
			this.data.isDefaultInvSubform ? this.handleProductHovercard(record,field,rowNo,true) : "";//eslint-disable-line no-unused-expressions
			this.enableTableScroll();
			if(this.getMethods("onHide")){
	    		this.executeMethod("onHide",record,field,rowNo,arg1,arg2);
	    	}
		},
		lookupRequestData: function(query, customData, field){
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", query, customData, field)
	    	}
		},
		lookupFilterCondition: function (element) {
			element.setData('cxPropDisableFilter', true);
			element.setData('applyZcqa',this.getData('cxPropZcqaPrefix')+'_'+this.getData('cxPropSection').display_label+'_applyfilter');
			element.setData('clearZcqa',this.getData('cxPropZcqaPrefix')+'_'+this.getData('cxPropSection').display_label+'_clearfilter')
			if(this.getMethods('setLookupFilterConditions')){
				/**
				 * This callback is fired when the lookup filter is rendered.				
				 * @method setLookupFilterConditions
				 * @author gowtham 
				 * @param { component } element - instance of lookup filter component
				 */
				return this.executeMethod('setLookupFilterConditions',element);
			}
		},
		fetchmodule: function (id) {
			return this.fetchModuleData(id);
		},
		fetchrecord: function (field,modId, params) {
			return this.fetchRecords(field,modId, params);
		},
		menuClosed: function () {
			$L('#'+this.rowSelectedId).removeClass('row-selected');
			delete this.lastPopup;
		},
		popupClose: function(){
			delete this.lastPopup;
		},
		menuOpened: function (menu,event,originElem) {
			var rowId = originElem.dataset.id;
			this.rowSelectedId = rowId;

			if(this.getData('isStaticSubform') && store.peekRecord(this.getData('subformId'),rowId).isStaticRow){
				this.setData('cxPropShowDeleteRowButton',false)
			}else{
				this.setData('cxPropShowDeleteRowButton',true)
			}
			var csData = this.getData('cxPropCustomProperties');
			if(csData && csData.subformRow && csData.subformRow[rowId] && csData.subformRow[rowId].readOnly){
				this.setData('showDeleteRowButton',false)
			}else{
				this.setData('showDeleteRowButton',true)
			}
			//to highlight the row even after menu is opened
			$L('#'+rowId).addClass('row-selected');

			this.lastPopup = {popupNode:menu,isCrux:false};
		},
		handleTableScroll: function () {
			this.tableScrollLeft = this.tableScroll.scrollLeft;
			this.handleTableXScroll();
		},
		/*below method gets invoked when there is value change, it does not get invoked on every key stroke,
		only when the focus moves out of the element (except dropdown and date elements)*/
		fieldValueChange: function (field, record, rowNo, componentName, component, value) {
			if(this.getData('cxPropPreviewMode')){
				if(this.getData('cxPropAllowActionOnPreview')){
					record[field.api_name] = value;
				}
				return;
			}
			var originalVal = value;
			var apiName = field.api_name;
			var fieldObj = record.$.model.fieldList[apiName];
			var type = (fieldObj.fieldType=="formula")?fieldObj.type: fieldObj.fieldType;
			value = this.formatValueForRecord(field, record, component, value,type);
	
			record.$.set(apiName, value);

			this.executeOnChange(field, record, originalVal, rowNo,componentName, component,false);
		},
			/*
		below method gets invoked when delete or clone option is selected
		*/
		onMoreOptionClick: function (value, event, menu, element) {

			event.stopPropagation();
			var srcRowIndex = parseInt(element.dataset.index);
			var recordId = element.dataset.id;
			var _this = this, record;
			_this.setData('rowId', '');
			if(value === 'edit')
			{
				record = store.peekRecord(this.data.subformId, recordId);
				this.openEdit(false,record,srcRowIndex+1);
			}else if(value === "recent_transactions"){
				if(this.getMethods('onMenuClick')){
					this.executeMethod('onMenuClick',value,recordId);
				}
			}else if (value === "delete") {
				this.showSubformAlert(_cruxUtils.getI18n('crm.subform.delete.confirm.header'),_cruxUtils.getI18n('crm.subform.delete.confirm.msg',this.getData('cxPropSection').display_label),[{ "type": "reject", "text": _cruxUtils.getI18n('crm.button.cancel') },{ "type": "accept", "text": _cruxUtils.getI18n('crm.button.mass.delete') , "appearance": "failure"}
				],{},_this.deleteRow.bind(this,srcRowIndex)
				);
			}
			else {
				this.customData = {cxSubformCreate:true};
				var tableContent = this.getData('cruxTableContent');
				var content = this.getData('cxPropContent');
				var apiname = this.getData('subformApiName');
				var destRowIndex = srcRowIndex + 1;
				//actual index is needed to insert into the
				var actualSrcRowIndex = content[apiname].findIndex(function(record){
					return record.id==recordId;
				});
				var actualDestRowIndex = actualSrcRowIndex+1;
				var actualDestRowNo  = actualDestRowIndex+1;			
				record = store.peekRecord(this.data.subformId, recordId);
				var addInfo = record._LC_additional_INV_subform_INFO;
				var json = record.$.toJSON();
				delete json.__parent_module__;
				delete json.Created_By;
				delete json.Created_Time;
				delete json.id;
				this.hasFieldWithoutMaskPermission = false;
				//removing read only field values and file upload values 
				Object.keys(this.fieldObject).forEach((key)=>{
					let field = this.fieldObject[key];
					if(field && field.api_name && json[key]){
						if(field.data_type==="fileupload" || field.data_type==='formula' ||
							(field.read_only && 
								(!field.association_details || 
									(field.association_details && 
										(!_this.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM ||  _this.fieldObject[field.association_details.lookup_field.api_name].read_only))))){
											delete json[key];				
											return;
						}
						if(!this.checkIfFieldIsEmpty(field,record[field.api_name]) && _this.getData('cxPropMaskingEnabled') && _this.unMaskCheckNeeded(field) && !_this.checkUnMaskPermission(field)){
							delete json[key];
							this.hasFieldWithoutMaskPermission = true;
						}
					}
				})
				//copying addition inv data
				if(this.getData('isDefaultInvSubform') && addInfo){
					json._LC_additional_INV_subform_INFO = addInfo;
				}
				var cloneRecord = store.createRecord(this.data.subformId, json, true);
				content[apiname].add(cloneRecord);
				cloneRecord.disableViewPort  = true;
				cloneRecord.isAjaxEditable = true;
				this.setData('cruxTableAjaxEditId', cloneRecord.id);
				Lyte.arrayUtils(tableContent, 'insertAt', destRowIndex, cloneRecord);
				Lyte.arrayUtils(content[apiname], 'pop');
				Lyte.arrayUtils(content[apiname], 'insertAt', actualDestRowIndex, cloneRecord);
				if(this.hasFieldWithoutMaskPermission){
					_cruxUtils.showCustomMessage({
						params:
						{
							"ltPropType": "info",
							"ltPropMessage": _cruxUtils.getI18n('crm.clone.with.masking.noperm.alert'),
							"ltPropDuration": 5000
						}
					});
				}
				if(this.getMethods("onCloneRow")){
					this.executeMethod('onCloneRow',cloneRecord.id)
				}
				var processCloneRecord = function(){
					if (this.serialNumberField) {
						cloneRecord.$.set(this.serialNumberField.api_name, (actualDestRowNo).toString());
							this.setSerailNumber(actualDestRowNo);
					}
					//tax changed for product, tax details to be updated
					if(this.getData('isDefaultInvSubform')){
						this.fetchInventoryProductDetails(cloneRecord);
						if(cloneRecord._LC_additional_INV_subform_INFO && cloneRecord._LC_additional_INV_subform_INFO.selProdDetails ){
							let prodDetails = cloneRecord._LC_additional_INV_subform_INFO.selProdDetails;
							var prodTax = prodDetails.__original ? prodDetails.__original.Tax : (prodDetails._$ && prodDetails._$.original ? prodDetails._$.original.Tax : []) ;
							var recordTax = cloneRecord.Line_Tax ? cloneRecord.Line_Tax : [];
							var isTaxChanged = false;
							var compare = function(proTax){ return proTax.id===this.id}
							if(prodTax.length!==recordTax.length){
								isTaxChanged = true;
							}else{
								isTaxChanged = recordTax.some(function(recTax){
									return !prodTax.includes(compare,recTax)
								})
							}
							if(isTaxChanged){
								this.fetchAndUpdateTaxDetails("Product_Name",prodDetails,cloneRecord);
							}
						}
					}
					var transform = this.readTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${actualDestRowNo})`,this.$node));
					this.checkForDependancyFields(destRowIndex+1,cloneRecord);
					// var tableScroll = this.lyteTable[0];
					// tableScroll.scrollTable();
					this.fixTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${actualDestRowNo})`,this.$node),transform)
					this.resetHorizontalScrollBar();
					this.evaluateFormulaFields(destRowIndex+1);
					this.checkAndDisableInsertRow();
					if(this.getData('cxPropAjaxEdit')){
						this.setData('disableAjaxEdit',true);
					}
				}.bind(this)
				if(this.getData('hasMoreRecords')){
					this.showAllRecords().then(processCloneRecord);
				}else{
					processCloneRecord();
				}
			
			}

		},
		//reason for setting options in on before open is to avoid sudden menu option changes
		setMenuOptions: function(menu,event,source){
			var field = store.peekRecord("field", source.parentElement.id);
			let unmaskedApiname = this.unmaskedApiname;
			var tableContent = this.getData('cruxTableContent');
			let isSortEnabled  = this.getData('cxPropTableProperties') ? this.getData('cxPropTableProperties').enableSort && field.sortable : field.sortable;
			if((this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(field) ? !this.checkUnMaskPermission(field) : !isSortEnabled)
					|| !tableContent || tableContent.length===0){
				return false;
			}
			let isUnMaskingNeeded = this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(field) && this.checkUnMaskPermission(field);
			var menuItems = [];
			if(isSortEnabled){
				var isNumericField = false
				var data_type = field.data_type === "formula" ? field.formula.return_type : field.data_type;
				if (data_type === 'phone' || data_type === 'currency' || data_type === 'integer' || data_type === 'double' || data_type === 'bigint') {
					isNumericField = true;
				}				
				var order = 'unsort';
				var sortOptions = ['asc','desc','unsort']
				var numberKeyMap = { 'asc': '0-9', 'desc': '9-0' };
				var alphabetKeyMap = { 'asc': 'crm.column.sort.asc', 'desc': 'crm.column.sort.desc', 'unsort': 'crm.column.unsort' };
				if (this.selectedMenu) {
					if (field.id === this.selectedMenu.id) {
						order = this.selectedMenu.value;
					}
				}
				sortOptions.splice(sortOptions.indexOf(order),1);
				sortOptions.forEach(function(option){
					var item = {}
						item.class = 'cxSubform' + option[0].toUpperCase() + option.substring(1) + 'Elem';;
						item.value = option;
						item.iconClass = 'cxSubformSortMenuIcon';
						item.label = (!isNumericField || option==='unsort')?_cruxUtils.getI18n(alphabetKeyMap[option]):numberKeyMap[option];
						menuItems.push(item);
				})
			}
			if(isUnMaskingNeeded){
				let item = {};
				item.class = 'cxSubformMaskElem';
				if(unmaskedApiname.has(field.api_name)){
					item.iconClass = 'cxMaskIcon cxSprite';
					item.label = _cruxUtils.getI18n('crm.masking.hide_masked_data');
					item.value = 'mask';
				}else{
					item.iconClass = 'cxUnmaskIcon cxSprite';
					item.label = _cruxUtils.getI18n('crm.masking.view_masked_data');
					item.value = 'unmask';
				};
				menuItems.push(item);
			}
			this.setData('menuItems', menuItems);
			this.lastPopup = {popupNode:menu,isCrux:false};

		},
		/*
		below method get called when menu option is selected
		*/
		menuSelected: function (value, event, menu, element) {
			var data = {}
			switch(value){
				case 'unsort':
				case 'asc':
				case 'desc':
					if (value === "unsort" && this.selectedMenu) {
						this.setData('sortedColumn', null);
						this.setData('sortedOrder', null);
						this.selectedMenu = null;
						data.sort_order = null;
						data.sort_by = {};
						this.sortData = data;
					}
					else {
						//getting apiname for id and setting data
					let fieldId = element.parentElement.id;
					let selectedField = this.data.cruxTableHeaderFields.filter(function (obj) { return obj.id === fieldId; });
					if (selectedField && selectedField.length > 0) {
						this.setData('sortedColumn', selectedField[0].api_name);
						this.setData('sortedOrder', value);
					};
						var selectedMenu = {}
						selectedMenu.id = element.parentElement.id;
						selectedMenu.value = value;
						this.selectedMenu = selectedMenu;
						data.sort_order = value;
						data.sort_by = {id:selectedMenu.id,api_name:selectedField[0].api_name};
						this.sortData = data;
		
					}
					//if the header is fixed, reset the table scroll and set the sort data such that table will not scroll up
					if (this.isHeaderFixed) {
						var lyteTableBodyRect = $L('.tablecomponent2')[0].getBoundingClientRect();
						var lyteTableHeadRect = this.lyteTableHead[0].getBoundingClientRect();
						$L('.content')[0].scrollTop = $L('.content')[0].scrollTop - (lyteTableHeadRect.bottom - lyteTableBodyRect.top);
					}
					
					this.sortRecord();
				break;
				case 'mask':
				case 'unmask':
					let fieldId = element.parentElement.id;
					let selectedField = this.data.cruxTableHeaderFields.find((obj)=> obj.id === fieldId );
					if(value==='mask'){
						Lyte.objectUtils(this.data.unmaskedApiname,'delete',selectedField.api_name);
						this.unmaskedApiname.delete(selectedField.api_name);
					}else{
						Lyte.objectUtils(this.data.unmaskedApiname,'add',selectedField.api_name,true);
						this.unmaskedApiname.add(selectedField.api_name);
					}
					this.cruxTable[0].maskUnmask(selectedField.api_name,value==='unmask');
				break;

			}


		},
		// /*
		// below method get called before menu is opened to highlight the selected menu
		// */
		// changeMenu: function (menu, event, element) {
			
		// },
		applyRecordFilter: function (element, event, validation) {	
			if(!validation){
				return;
			}
			this.filterApplied = true;
			this.rollbackAjaxActions();
			if (this.getMethods('applyFilter')) {
				/**
				 * This callback is fired when apply filter button is clicked in lookup filter.
				 * @method applyFilter
				 * @author gowtham
				 * 
				 * @param { component } element - the instance of lookup filter
				 * @param { event } event - event that triggered the apply filter
				 * @param { boolean } validation - validation result
				 */
				this.handleCallback(this.executeMethod('applyFilter', element, event, validation),function(data){
					this.handleCallbackResponse.call(this,data);
				}.bind(this));
			}
		},
		clearRecordFilter: function (element, event) {
			this.clearFilter(element,event);
		}
	},
	handleCallback:function(resp,successFn){
		if (resp) {
			this.showHideLoadingDiv(true);
			// this.resetHorizontalScrollBar();
			if(resp instanceof Promise){
				var _this = this;
				resp.then(function (data) {
					successFn(data);
				},function(){
					_this.showHideLoadingDiv();
				})
			}
			else
			{
				successFn(resp);
			}

		}
	},
	addCurrencySymbolInHeader: function(field){
		var modData = this.getData('cxPropModuleData');
		let headerProp = this.getData('headerProperties');
		var bool = modData && modData.module_name!=='Products' && modData.module_name!=='Bundles'&& !field.subform && !field.associated_module;
		if (bool && (field.data_type === "currency" || ((field.ui_type === 117 || field.ui_type === 116) && field.formula.return_type === "currency"))) {
			if(headerProp && headerProp[field.id]){
				Lyte.objectUtils(headerProp[field.id],'add','cxHeaderLabelSuffixYield',true);
			}else{
				Lyte.objectUtils(headerProp,'add',field.id,{cxHeaderLabelSuffixYield:true});
			}
			// Lyte.objectUtils(field, "add", "fieldLabel", field.field_label + ' (' + this.getData('currencySymbol') + ')');
		}
	},
	//observers
	observeCurrencyData: function(){
		if(this.getData('cruxTableHeaderFields') && this.getData('cruxTableHeaderFields').length>0){
			this.getData('cruxTableHeaderFields').forEach((field)=>{
				this.addCurrencySymbolInHeader(field);
			});
		}
	}.observes('cxPropCurrencyData'),
	ajaxEditObserver: function(changes){
		if(this.getMethods("onAjaxEditOpened")){
			this.executeMethod("onAjaxEditOpened",changes.newValue)
		}
	}.observes('disableAjaxEdit'),
	cruxTableContentObserver: function(){
		if(!this.getData('cxPropPreviewMode')){
			var hasData = this.getData('cruxTableContent').some(function(rec){ return (!rec.$.get('cxPropClass') || !rec.$.get('cxPropClass').includes('dNimp') )});
			if(hasData){
				this.setData('showNoRecord',false)
			}else{
				this.setData('showNoRecord',true)
			}
		}
	}.observes('cruxTableContent.[]'),
	noRecordObserver: function(change){
		var tableContent = this.getData('cruxTableContent');
			//if subform has only one new record, no need to enable sort
			if(tableContent.length===1 && tableContent[0].$.isNew){
				return;
			}
			this.setData('cruxTableEnableFieldSort',!change.newValue);
	}.observes('showNoRecord'),
	//api names
	formatValueForRecord: function(field, record, component, value,fieldType){
		var apiName = field.api_name;
		var fieldObj = record.$.model.fieldList[apiName];
		var type = fieldType ? fieldType : (fieldObj.fieldType=="formula")?fieldObj.type: fieldObj.fieldType;
		switch (type) {
			case 'userlookup':
				value  = (value)?{id:value.id,name:value.name,full_name:value.full_name}:value;
				break;
			case 'lookup':
				try {
					if(!value || value===''){
						value = null;
					}
					else{
						value = typeof value ==='string'? JSON.parse(value) : value;
						value = {id:value.id,name:(this.showLookupCode && this.handleInventoryCheck('CODE','getValue',undefined,value)) ? value.name + ' ('+this.handleInventoryCheck('CODE','getValue',undefined,value)+')' :  value.name};
					}
				} catch (exception) {//eslint-disable-next-line no-empty

				}
				break;
			case 'number':
			case 'currency':
			case 'double':
			case 'integer':
			//case 'bigint': for bigint string needs to set
				value = value===""?null:value;
				if (value!==null && !isNaN(value)) {
					value = parseFloat(value);
				}
				break;
			case 'picklist':
				//empty white circle (color code enabled) is shown if empty is set
				value = value=='-None-'?'':value;
				break	
			/*below case is needed because picklist custom datatype is string*/
			case 'multiselectpicklist':
				//for multipicklist, the value passed will be an array
				if (this.getData('cxPropAjaxEdit') && value instanceof Array) {
					value = Lyte.Transform['multi-picklist'].deserialize(value);
				}else if(value && value instanceof Array){
					value = JSON.stringify(value);
				}
				break;
			case 'datetime':
				//by default, date-time component doesn't return value in user format
				value = component.component.getValue({ userFormat: true });
				break;
			case 'image':
				value = component.component.getValue();
				break;
		}
		return value;
	},
	/**
	* This function will highlight the aggregate field.
	* @utility evaluateModuleFormula
	* @param {string | array} apiName - apiname(s) which needs to be highlighted.
	*/
	highlightAggregateField: function(apiNames){
		//if there is no aggregate field
		var aggregateFields = this.getData('aggregateFields')
		if(!apiNames || !aggregateFields || aggregateFields.length==0){return}
		var hightlightField = function(apiName){
			var field = aggregateFields.find(function(field){
				return field.api_name===apiName;
			});
			if(field){
				$L('#'+this.data.subformUniqueId+'_'+field.id).removeClass('cxSubformHighlightRow');
				setTimeout(() => {
					$L('#'+this.data.subformUniqueId+'_'+field.id).addClass('cxSubformHighlightRow');
				}, 10);

			}
		}.bind(this)
		if(Array.isArray(apiNames)){
			apiNames.forEach(function(apiName){
				hightlightField(apiName);
			})
		}else{
			hightlightField(apiNames);
		}
			
	},
	saveChanges: function(field,isAggr,indexVal){
		var _this = this;
		if (isAggr) {
			if (this.validate()) {
				var content = this.getData('cxPropContent');
				var executeAggrSave = function(){
					Lyte.objectUtils(field, "add", "class", (field.class)?field.class.replace('cxSubformHighlightRow','')+' cxSubformRowFreeze':'cxSubformRowFreeze');
					this.setData('disableSaveCancel',true);
					var tableScroll = this.lyteTable[0];
					tableScroll.scrollTable();
					var saveFunc,customData=Object.assign({}, this.customData);
					var dirtyAttr = this.data.cxPropContent.$.getDirtyAttributes();
					if(this.getData('cxPropSaveCustomRequest') && this.getMethods('onAjaxSave')){
						saveFunc = this.executeMethod('onAjaxSave',this.getData('aggrTableAjaxEditId'),customData);
					}else{
						this.showHideLoadingDiv(true);
						saveFunc = content.$.save(this.createCustomData(customData,isAggr),this.getData('cxPropQueryParams'));
					}
					saveFunc.then(function (resp) {
						if(_this.getData('cxPropUnbound')){
							_this.data.unboundObj[field.api_name] = content[field.api_name];
							Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:'edit',data:[field.api_name,...dirtyAttr]});
						}
						// Lyte.objectUtils(field,"add",'hideCurrency',false)
						Lyte.objectUtils(field, "add", "class", ((field.class)?field.class.replace('cxSubformRowFreeze',''):'')+' cxSubformHighlightRow	');
						// Lyte.objectUtils(field	, "add", "from", "view");
						_this.setData('aggrTableAjaxEditId', null);
						_this.setData('disableAjaxEdit',false);
						_this.setData('disableSaveCancel',false);
						_this.checkAndDisableInsertRow();
						_this.showHideLoadingDiv(false);
						if(_this.getMethods('onAfterAjaxSave')){
							/**
							 * This callback is fired is when the ajax save is completed
							 * @method onAfterAjaxSave
							 * @author gowtham
							 
							 * @param { object } resp - response returned from server
							 */
							_this.executeMethod('onAfterAjaxSave',resp)
						}
					},function (resp) {
						Lyte.objectUtils(field, "add", "disabled", false);
						_this.handleServerErrorResponse(resp);
						Lyte.objectUtils(field, "add", "class", ((field.class)?field.class.replace('cxSubformRowFreeze',''):''));
						_this.setData('disableSaveCancel',false);
						_this.showHideLoadingDiv(false);
					});
				}.bind(this);
				if(_this.getMethods('onBeforeAjaxSave')){
					/**
							 * This callback is fired is before ajax save request.
							 * @method onBeforeAjaxSave
							 * @author gowtham
							 
							 * @param { object } content - module record data
							 * @param { node } element - field node
							 */
					var resp = _this.executeMethod('onBeforeAjaxSave',content,$L('#'+field.api_name,this.$node)[0],field);
					if(resp instanceof Promise){
						resp.then(function(){
							executeAggrSave();
						},function(){ //eslint-disable-line no-empty-function
							
						})
					}
					else if(resp!=false){
						executeAggrSave();
					}
				}
				else{
					executeAggrSave();
				}
			}
		}
		else {
			if (this.validate()) {
				if(this.checkIfRecordIsEmpty(this.data.cruxTableAjaxEditId)){
					this.showSubformAlert(_cruxUtils.getI18n('crm.subform.empty.alert.header'),_cruxUtils.getI18n('crm.custombutton.valid.weburl.check'),[{"type":"accept","text": _cruxUtils.getI18n('Okay'),appearance:"primary" }],{ltPropType:'info'});
					return;
				}
				var moduleData = this.getData('cxPropModuleData');
				if(moduleData && moduleData.module_name === "Invoices"){
					if(this.getData('cxPropContent').hasOwnProperty('Invoiced_Items')){
						//CRMCODE:
						var confirmInvoiceCrtn = this.confirmInvoiceCreationWithLowStock([store.peekRecord(this.data.subformId,this.data.cruxTableAjaxEditId)],true);
						if(!confirmInvoiceCrtn){
							return;
						}
					}
				}
				
				var cruxTableContent = this.getData('cruxTableContent');
				var executeSave = function(){
					this.setData('disableSaveCancel',true);
					this.setData('freezeRow', true);
					var dirtyAttr = this.data.cxPropContent.$.getDirtyAttributes();
					var saveFunc,customData=Object.assign({}, this.customData);
					if(this.getData('cxPropSaveCustomRequest') && this.getMethods('onAjaxSave')){
						saveFunc = this.executeMethod('onAjaxSave',this.getData('cruxTableAjaxEditId'),customData);
					}else{
						this.showHideLoadingDiv(true);
						this.setLookupFilterData(customData);
						saveFunc = this.data.cxPropContent.$.save(this.createCustomData(customData),this.getData('cxPropQueryParams'))
					}
					var action = this.customData.cxSubformEdit ? 'edit' : 'create';
					saveFunc.then(function (resp) {
						var afterSaveFunc = function(){
							if(_this.getData('cxPropUnbound')){
								Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:action,isSubform:true,data:{recordId:cruxTableContent[indexVal].id}});
								if(dirtyAttr && dirtyAttr.length>0){
									Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:'edit',data:dirtyAttr});
								}
							}
							_this.setData('freezeRow', false);
							_this.setData('disableSaveCancel',false);
							var transform = _this.readTableColumns($L('#headerRow',_this.$node));
							let rec = store.peekRecord(_this.getData('subformId'),cruxTableContent[indexVal].id)
							rec.$.set('isAjaxEditable',false)
							//copying cscript data
							let csData = _this.getData('cxPropCustomProperties');
							let copyCSdata = (key)=>{
								if(csData && csData[key] && csData[key][_this.getData('cruxTableAjaxEditId')]){
									let temp = csData[key][_this.getData('cruxTableAjaxEditId')];
									delete csData[key][_this.getData('cruxTableAjaxEditId')];
									csData[key][cruxTableContent[indexVal].id] = temp;
								}
							};
							copyCSdata('subformRow');
							copyCSdata('subformCell');
							var exClass = rec.cxPropClass ? rec.cxPropClass.replace('cxSubformTdFreeze',''):'';
							Lyte.objectUtils(rec,'add','cxPropClass',exClass);
							if(rec && rec.invPopoverdata && rec.invPopoverdata.discountObj){
							delete rec.invPopoverdata.discountObj.directPriceReductionVal;
							delete rec.invPopoverdata.discountObj.disPercentValue;
						}
							_this.setData('cruxTableAjaxEditId', null);	
							_this.setData('disableAjaxEdit',false);
							_this.setData('selectedRows',[cruxTableContent[indexVal].id])
							Lyte.objectUtils(_this.getData('filterProperties'),'add','title',_this.getData('cruxTableContent').length>0?(_this.data.cruxTableShowFilter?_cruxUtils.getI18n('crm.report.clear.filter'):_cruxUtils.getI18n('crm.button.show.filter')):_cruxUtils.getI18n('crm.subform.filter.disabled'));
							var hasData = _this.getData('cruxTableContent').some(function(rec){ return (!rec.$.get('cxPropClass') || !rec.$.get('cxPropClass').includes('dNimp') ); });
							_this.setData('cruxTableEnableFieldSort',hasData);


							//if the table is scrolled to the right and rollback icon is clicked, that row will be replaced
							//with new one so, to maintain the fixed column the below function is being called
							// _this.lyteTable[0].scrollTable();
							_this.fixTableColumns($L(`.tablecomponent2 lyte-tr:nth-of-type(${indexVal+1})`,_this.$node),transform);
							_this.checkAndDisableInsertRow();
							_this.enableOrDisbleApplyFilter(true);
							_this.showHideLoadingDiv(false);
							_this.highlightAggregateField(dirtyAttr);
						};
						if(_this.getMethods('onAfterAjaxSave')){
							//if onafter callback is used but nothing is returned then after save should be
							var _resp = _this.executeMethod('onAfterAjaxSave',resp);
							if(!_resp){
								afterSaveFunc();
							}else{
								_this.handleCallback(_resp,function(data){
										_this.handleCallbackResponse.call(_this,data,cruxTableContent[indexVal] ? cruxTableContent[indexVal].id : undefined);
										afterSaveFunc();
								});
							}
							
						}else{
							afterSaveFunc();
						}
					},
						//failure
						function (resp) {
							_this.handleServerErrorResponse(resp,indexVal);
							_this.setData('freezeRow', false);
							_this.setData('disableSaveCancel',false);
							_this.showHideLoadingDiv(false);
						});
					}.bind(this);
				if(_this.getMethods('onBeforeAjaxSave')){
					var resp = _this.executeMethod('onBeforeAjaxSave',cruxTableContent[indexVal],$L('#'+this.data.cruxTableAjaxEditId)[0]);
					if(resp instanceof Promise){
						resp.then(function(){
							executeSave();
						},function(){//eslint-disable-line no-empty-function

						})
					}
					else if(resp!=false){
						executeSave();
					}
				}
				else{
					executeSave();
				}

			}
		}

	},
	addKeyDownListener: function(){
		if(this.getData('cxPropAjaxEdit') && this.getData('cxPropType')==='view'){
			this.keyDownListener = function(event){
				//event listener is added to whole component, added tbody to check to handle only event from table body
				//if(this.getData('aggrTableAjaxEditId') || (this.getData('cruxTableAjaxEditId') && !this.component.dropdownOpened && document.activeElement.closest('lyte-tbody'))){
				if(this.getData('aggrTableAjaxEditId')){
					var isAggr = this.getData('aggrTableAjaxEditId') ? true:false;
					if(event.originalEvent.keyCode===13){
						event.target.blur(); //only on blur, the entered values will be updated in the record
						setTimeout(function(self){
							if(isAggr){
								self.component.saveChanges(store.peekRecord('field',self.getData('aggrTableAjaxEditId')),true,-1);
							}else{
								self.component.saveChanges(store.peekRecord(self.getData('subformId'),self.getData('cruxTableAjaxEditId')),false,self.getData('cruxTableContent').findIndex((rec)=>{return rec.id==self.getData('cruxTableAjaxEditId')}));
							}
						},0,this)
					}else if(event.originalEvent.keyCode===27){
						event.target.blur(); //only on blur, the entered values will be updated in the record
						setTimeout(function(self){
							if(isAggr){
								self.component.rollbackChange(self.getData('aggrTableAjaxEditId'));
							}else{
								self.component.rollbackChange(self.getData('cruxTableAjaxEditId'));
							}
						},0,this)
					}
				}
			};
			$L(this.$node).keydown(this.keyDownListener);
		}
	},
	showSubformMessage: function(message,type){
		_cruxUtils.showCustomMessage({"params" : {"ltPropMessage" : message,"ltPropType" : type,"ltPropDuration": "3000",cxPropYield:true}});
	},
	showSubformAlert: function(primaryMsg,secondaryMsg,buttons,addParams,acceptFn,rejectFn,closeFn){
		var parameters = Object.assign({
				ltPropOutputNode: this.$node,
				ltPropPrimaryMessage:primaryMsg,
				ltPropSecondaryMessage: secondaryMsg,
				ltPropButtons:buttons
		}, addParams)
		let closeWrapper = ()=>{
			delete this.lastPopup;
			if(closeFn){
				closeFn();
			}
		};
		let showWrapper = ()=>{
			this.lastPopup = {popupSelector:'#cruxUtilAlert',isCrux:true};
		};
		_cruxUtils.showCustomAlert({
			params: parameters,
			accept:acceptFn,
			reject: rejectFn,
			close: closeWrapper,
			show: showWrapper
		})
	},
	setSubformDetails: function(section){
		if(section && section.fields){
			var _this  =this;
			section.fields.filter(function(field){ return field.data_type==='subform' || field.data_type==='static_subform'}).forEach(function(field){
				_this.setData('subformApiName',field.api_name)
				var subformData = field.subform ? field.subform : field.associated_module;
				let module = store.peekRecord('module', subformData.id);
				_this.setData('subformModuleName',module ? module.module_name : undefined);
				_this.setData('isStaticSubform',field.data_type==='static_subform') 
				_this.setData('subformId', subformData.id)
				_this.isSubformMandatory = field.required;
			})	
		}
	},
	checkIfDefaultInvSubform: function(section){
		if(section){
			if(section.generated_type === "default"){
				this.isProductSubform  = ["Quoted_Items","Invoiced_Items","Ordered_Items","Purchase_Items","CPQ_Custom_Quoted_Items"].includes(this.getData('subformApiName'));
				this.isBundleSubform = ["Quoted_Bundles__s","Invoiced_Bundles__s","Ordered_Bundles__s","Purchase_Bundles__s"].includes(this.getData('subformApiName'));
				this.isServiceSubform = ["Quoted_Services__s", "Ordered_Services__s", "Invoiced_Services__s"].includes(this.getData('subformApiName'));
				this.setData('isDefaultInvSubform',this.isProductSubform || this.isBundleSubform || this.isServiceSubform);
			}
		}		
	},
	enableOrDisbleApplyFilter: function(enable){
		//only for enabling we will check if filter is applied
		if(this.getData('cxPropShowFilterIcon') && this.getData('cruxTableShowFilter') && ((enable && this.filterApplied) || !enable)){
			var filterComp = $L('crux-lookupfilter-component',this.$node);
			if(filterComp){
				//TODO: directly setting data of lookupfilter comp
				filterComp[0].setData('enableFilter',enable)
			}
		}
	},
	checkIfRecordIsEmpty: function(rowId){
		var record = store.peekRecord(this.getData('subformId'),rowId);
		if(record){
			var fields = this.fieldObject;
			for(var k in fields){
				let res = this.checkIfFieldIsEmpty(fields[k],record[k],record);
				if(!res){
					return false;
				}
			}
			return true;
		}
		return true;
	},
	checkIfFieldIsEmpty: function(field,recordVal,record){
	function isFileUploadFieldEmpty(uploadedFiles){ 
		if(this.getMethods('validateFileUpload')){
			return this.executeMethod('validateFileUpload',record,field);	
		}
		return uploadedFiles ? (uploadedFiles.filter(function(f){ return !f.hasOwnProperty('_delete'); }).length === 0) : true; 
	}//no i18n
	if(field.id && ['SERIAL_NUMBER' , 'SMCREATORID' , 'CREATEDTIME'].indexOf(field.column_name) === -1 && field.data_type !== "formula"){
		var val = typeof recordVal === "string" ? (recordVal && recordVal === "[]" ? "" : recordVal.trim()) : recordVal;
		if(((val || val === 0) && field.data_type !== "picklist" && field.data_type !== "fileupload") ||
				(val && field.data_type === "picklist" && val !== '-None-')  || (field.data_type === "fileupload" && !isFileUploadFieldEmpty.call(this,val))){
					return false;
			}
		}
		return true;
	},
	handleCallbackResponse: function(response,currentEditId){
		this.showHideLoadingDiv();
		if(this.isHeaderFixed){
			this.scrollToTop(0);
		}
		if(currentEditId){
			let isLastEditeRecordPresent = false; 
			if(response){
				isLastEditeRecordPresent = response.some((rec)=>rec.id === currentEditId);
			}
			if(!isLastEditeRecordPresent){
				this.showSubformMessage(_cruxUtils.getI18n('crm.subform.visible.filter'),'info');
			}
		}
		setTimeout(function(){
			//if undefined is returned, assuming api call has failed
			if(response){	
				var cruxTableContent = this.getData('cruxTableContent');
				var meta = response.$ && response.$.meta ? response.$.meta : {};
				var hasMore = meta.more_records?meta.more_records: false;
				//cross tab case to be handled
					var prevLen = cruxTableContent.length;
					response.forEach((rec)=>{
						rec.$.set('cxPropClass','')
						rec.disableViewPort = false;
					})
					var con = $L('#subform_'+this.getData('subformUniqueId')+'_'+this.getData('subformId')+' .lyteTableScroll', this.$node)[0];
					var left = con?con.scrollLeft:0;
					var child = $L('.tablecomponent2 lyte-tr',this.$node);
					for(var i=0;i<child.length;i++){
						child[i].classList.add('dNimp');
					}
					setTimeout(function(){
						Lyte.arrayUtils( cruxTableContent , 'splice' , 0,prevLen);
					}.bind(this),300)
					Lyte.arrayUtils(cruxTableContent,'push',response)
					var tableScroll = this.lyteTable[0];
					tableScroll.scrollTable(left);
					$L.debounce(function(){
						var tableScroll = this.lyteTable[0];
						tableScroll.scrollTable(left);
					}.bind(this),Lyte.Component.viewPortSettings.debounce+20)();

					
					if(response.length==0){
						this.setData('showNoRecord',true)
					}
					else{
						this.setData('showNoRecord',false)
					}
					this.setData('subformRowCount',hasMore ? meta.__Subform_Row_Count__: 0)
					this.setData('hasMoreRecords',hasMore);
			}else{
					this.setData('hasMoreRecords',false);
					this.setData('cruxTableContent',[]);
					this.sortData = {}
					this.setData('sortedColumn', '');
					this.setData('sortedOrder', '');
			}	
		}.bind(this),10)
		
	},
	limitSubformRows: function () {
		var moduleSections = this.getData('cxPropModuleSections')
		if (moduleSections) {

			var subforms = moduleSections.filter(function (sec) { return sec.isSubformSection && (sec.type === "used"|| sec.screen) });
			var subformMaxRows = this.subformMaxRows;
			if(typeof Crm !=='undefined' && (Crm.userDetails.isServiceSubformEnabled || Crm.userDetails.isBundleSubformEnabled)){
				var parentSection=moduleSections.filter(function (sec) { return sec.is_parent_section && (sec.type === "used"|| sec.screen); });

				if(parentSection && parentSection[0] && parentSection[0].childSections){
					subforms = !subforms ? parentSection[0].childSections : subforms.concat(parentSection[0].childSections);
				}
			}
			var subformsLength = subforms.length;
			var rowsPerSubform = Math.floor(subformMaxRows / subformsLength);
			//if this is the last subform, all the remaining row is allocated to it
			if (this.getData('subformApiName') === subforms[subformsLength - 1].subform_apiname) {
				if (subformMaxRows%subformsLength==0) {
					rowsPerSubform = subformMaxRows - (rowsPerSubform * (subformsLength - 1));
				}
			}
			this.rowsPerSubform = rowsPerSubform;
			var subformData = this.getData('cxPropContent')[this.getData('subformApiName')];

			//based on the records left count, the show all button is shown
			if (subformData.length > rowsPerSubform) {
				this.setData('hasMoreRecords',true);
			}
			this.setData('cruxTableContent', subformData.slice(0, rowsPerSubform));
		}
	},
	showAllRecords: function () {
		this.setData('showAllLoading',true);
		var cruxTableContent = this.getData('cruxTableContent');
		if(!(this.sortData && this.sortData.sort_order) && !this.filterApplied && this.getData('hasMoreRecords')){
			var content = this.getData('cxPropContent')[this.data.subformApiName];
			return new Promise(function(resolve){	
				setTimeout(function(){
					Lyte.arrayUtils(cruxTableContent, 'push', content.slice(cruxTableContent.length));
					this.setData('hasMoreRecords',false);
					var tableScroll = this.lyteTable[0];
					tableScroll.scrollTable();
					this.setData('showAllLoading',false);
					resolve();
				}.bind(this),10)
			}.bind(this));
		}else if(this.getMethods('onShowAll')){
			/**
			 * This callback is fired when show all button is clicked.
			 * @method onShowAll
			 * @author gowtham
			 */
			var resp = this.executeMethod('onShowAll')
			return new Promise(function(resolve){
				resp.then(function(response){
					setTimeout(function(){
						Lyte.arrayUtils(cruxTableContent, 'push', response);
						this.setData('hasMoreRecords',false);
						var tableScroll = this.lyteTable[0];
						tableScroll.scrollTable();
						this.setData('showAllLoading',false);
						resolve();
					}.bind(this),10)
				}.bind(this))
			}.bind(this))
		}

	},
	sortRecord: function () {
		this.rollbackAjaxActions();
		if (this.getMethods('sortRecord')) {
			// this.setData('cxPropShowLoading', true);
			this.showHideLoadingDiv(true);
			/**
			 * This callback is fired when sort option is selected.
			 * @method sortRecord
			 * @author gowtham
			 * 
			 * @param {object} sortData - column and sort order details
			 */
			this.handleCallback(this.executeMethod('sortRecord', this.sortData),function(data){
				this.handleCallbackResponse.call(this,data);
			}.bind(this));
		}
	},
	addSortable: function(){
		var section = this.getData('cxPropSection');
		if(section && section.properties && section.properties.reorder_rows){
			var _this = this;
			$L('.tablecomponent2',this.$node).sortable({
				items: ".cxSubformDragIcon",
				onDragStart: function (draggableElement) {
					document.body.style.cursor = 'move';
				},
				onSelect: function () {
					if (_this.getData('cxPropContent')[_this.getData('subformApiName')].length == 1) { //for table with one row there is no need for sortable
						return false;
					}
					return true;
				},
				onDrop: function (dragElem,body,dropElem,startIndex,endIndex) {
					_this.lyteTable[0].scrollTable();
					document.body.style.cursor = '';
					if(startIndex!==endIndex)
					{
						let record;
						if (!_this.getData('cxPropPreviewMode')) {
							record = Lyte.arrayUtils( _this.getData('cxPropContent')[_this.getData('subformApiName')] , 'removeAt' , startIndex , 1 );
							Lyte.arrayUtils( _this.getData('cxPropContent')[_this.getData('subformApiName')] , 'insertAt' , endIndex , record );
							if(_this.getData('cxPropLimitRows')){
								Lyte.arrayUtils( _this.getData('cruxTableContent') , 'removeAt' , startIndex , 1 );
								Lyte.arrayUtils( _this.getData('cruxTableContent') , 'insertAt' , endIndex , record );
							}
						}else{
							record = Lyte.arrayUtils( _this.getData('cruxTableContent') , 'removeAt' , startIndex , 1 );
							Lyte.arrayUtils( _this.getData('cruxTableContent') , 'insertAt' , endIndex , record );
						}
						let rowElem = _this.lyteTableBody[0].querySelector(`lyte-tr:nth-child(${endIndex+1})`);
						if(rowElem){
							_this.lyteTableBody[0].addToSortable(rowElem);
						}
					if(_this.serialNumberField){
						_this.setSerailNumber(startIndex,endIndex);
					}	
					}	
				}
			})

		}
	},
	filterFields: function(field){
		return field.data_type !== 'subform' && field.data_type !== 'static_subform' && field.visible && ((field.view_type)? field.view_type[this.getData('cxPropType')] : true) && field.column_name !== "CREATEDTIME" && field.column_name !== "MODIFIEDTIME";
	},
	setSerailNumber: function(start,end,pushPayload){
		var records = !this.getData('cxPropPreviewMode') ?  this.getData('cxPropContent')[this.getData('subformApiName')]
		 												: this.getData('cruxTableContent');
		if(start == records.length){
			return
		}
		end = (end!==undefined) ? end : records.length-1;
		var actualStart = (start<end)?start:end;
		var actualEnd = (start>end)?start:end;

		for(var i=actualStart;i<=actualEnd;i++){
			if(pushPayload){
				var obj = {}
				obj[this.serialNumberField.api_name] = (i + 1).toString();
				obj.id = records[i].id;
				store.pushPayload(this.data.subformId,obj);
			}
			else{
				if(!this.getData('cxPropPreviewMode')){
					records[i].$.set(this.serialNumberField.api_name, (i + 1).toString());
				}else{
					Lyte.objectUtils(this.getData('cruxTableContent')[i],'add',this.serialNumberField.api_name,(i + 1).toString());
				}
			}
		}

	},
	createDefaultRecord: function () {
		var section = this.getData('cxPropSection');
		if(section && section.fields){
			var defaultRecord = {};
			var fields = this.data.cxPropSection.fields;
			var checkDefaultValues = function(field){
				return field.default_value;
			}
			var hasDefaultValues = fields.some(checkDefaultValues);
			if (hasDefaultValues){
				this.data.cxPropSection.fields.
					filter(checkDefaultValues).
					forEach(function(obj){
						defaultRecord[obj.api_name] = obj.default_value
					});
			}
			fields.forEach(function(field){
    			if(field.data_type === "boolean" && !defaultRecord[field.api_name]){
       				defaultRecord[field.api_name] = false;
    			}
			})
			this.defaultRecord = defaultRecord;
		}
	},
	createRecord: function (row) {
		if(!this.getData('cxPropPreviewMode')){
			var content = this.getData('cxPropContent');
			if (content && content[this.getData('subformApiName')]) {
				var records = content[this.getData('subformApiName')]; 
				var cloneRecord = store.createRecord(this.data.subformId,row?row:{...this.defaultRecord}, true);
				cloneRecord.disableViewPort = true;
				if (this.serialNumberField) {
					cloneRecord.$.set(this.serialNumberField.api_name, (records.length+1).toString()); //empty row record is created when there is no record in subform
				}
				if(this.getData('cxPropAjaxEdit')){
					this.setData('cruxTableAjaxEditId',cloneRecord.id)
					cloneRecord.$.set('isAjaxEditable',true)
				}
				Lyte.arrayUtils(this.getData('cruxTableContent'), 'push', cloneRecord);
				records.add(cloneRecord);
				return cloneRecord;
			
			}
		}else{
			let newRow = {id:Math.floor(Math.random() * 100000)};
			if (this.serialNumberField) {
				newRow[this.serialNumberField.api_name]= (this.getData('cruxTableContent').length+1).toString();
			}
			Lyte.arrayUtils(this.getData('cruxTableContent'), 'push', newRow);
			
			return newRow;
		}

	},	
	/**
	 * This function will create a new row in subform.
	 * @utility createRow
	 */
	createRow: function (row) {
		if(this.getData('cxPropType')==='view' && this.getData('cruxTableAjaxEditId')){
			return;
		}
		this.customData = {cxSubformCreate:true}
		var cruxTableContent = this.getData('cruxTableContent');
		var ajaxEdit = this.getData('cxPropAjaxEdit');
		if(cruxTableContent){
			var processCreateRecord = function(){
				var record = this.createRecord(row);
				if(record){
						if(this.getMethods("onAddRow")){
							this.executeMethod('onAddRow',record.id)
						}
						this.checkAndDisableInsertRow();
						if(ajaxEdit){
						// this.detailsForKeyDown = {
						// 	'isAggr': false,
						// 	'rowIndex': cruxTableContent.length-1,
						// 	'fieldOrRecord': false
						// };
						this.setData('disableAjaxEdit',true);
						this.setData('cruxTableAjaxEditId', record.id);
						}
						this.resetHorizontalScrollBar();
						this.handleButtonVisibility();
						if(!this.getData('cruxTableContent').length){
							var tableScroll = this.lyteTable[0];
							tableScroll.scrollTable();
						}
						var section = this.getData('cxPropSection');
						if(section && section.properties){
							var properties = section.properties;
							if(properties.reorder_rows && this.getData('cxPropType')!=='view'){
								var sortableParent = $L(".tablecomponent2", this.$node)[0];
								sortableParent.addToSortable(sortableParent.lastElementChild);
							}
						}
						if(!this.getData('cxPropPreviewMode')){
						this.checkForDependancyFields(cruxTableContent.length,record);
						this.evaluateFormulaFields(cruxTableContent.length);
						if(row && Object.keys(row).length){
							let field;
							Object.keys(row).forEach((key)=>{
								field = this.fieldObject[key];
								if(field){
									this.executeOnChange(field,
										record,record[field.api_name],
										cruxTableContent.length-1,field.cxTypeMapping,undefined,true);
								}
							});
						}
				}
			}
		}.bind(this);
			if(this.getData('hasMoreRecords')){
				this.showAllRecords().then(processCreateRecord);
			}else{
				processCreateRecord();
			}

	}
		
	},
	checkAndDisableInsertRow: function(){
		var section = this.getData('cxPropSection')
		var content = this.getData('cxPropContent');
		var apiName = this.getData('subformApiName');
		if(section && section.properties && section.properties.maximum_rows){
			var maxRows = section.properties.maximum_rows;
			if(content && content[apiName]){
				if(content[apiName].length>=maxRows){
					this.setData('disableAddRow', true);
					this.setData('disableClone',true);
					this.setData('addBtnTitle', _cruxUtils.getI18n('crm.label.subform.allowedlimit', maxRows));
				}
				else{
					this.setData('disableAddRow', false);
					this.setData('disableClone',false);
					this.setData('addBtnTitle', '');
				}
				
			}
		}
		if(this.isSubformMandatory){
			if(content[apiName].length==1){
				this.setData('disableDelete',true);
				this.setData('deleteBtnTitle',_cruxUtils.getI18n("crm.subform.delete.tooltip.msg",this.getData('cxPropSection').display_label));
			}else
			{
				this.setData('disableDelete',false);
				this.setData('deleteBtnTitle','');
			}
		}
	},
	isInventoryModule : function(module){
		return module === "Quotes" || module === "Invoices" || module === "SalesOrders" || module === "PurchaseOrders" ;//NO I18N
	},
	handleServerErrorResponse: function(resp,index){
		this.setData('errorYield',false);
		if(this.getMethods('onBeforeShowError')){
			var res = this.executeMethod('onBeforeShowError',resp,this.data.cxPropContent,index);
			if(!res){
				return;
			}
		}
		var response;
		try{
			let field;
			response = JSON.parse(resp.response);
			if(response.code === "NO_PERMISSION" || (response.data && response.data[0].code === "NO_PERMISSION") || (response.data && response.data[0].code === "RECORD_IN_BLUEPRINT") || (response.data && response.data[0].code === "CANNOT_PERFORM_ACTION") || (response.data && response.data[0].code === "MAPPING_MISMATCH")){
				renderingUtils.displayPermissionDenied();
				return;
			}
			if(response.data && response.data[0].code === "LIMIT_EXCEEDED")
			{
				_cruxUtils.showCustomMessage({"params" : {"ltPropMessage" : _cruxUtils.getI18n("crm.subform.record.create.maxrow.limit",response.data[0].details.limit,this.getData('cxPropSection').display_label),"ltPropType" : "error","ltPropDuration": "3000"}});//no i18n
				return;
			}
			if(response.code === "NOT_APPROVED" && response.message === "Cannot update record that is not approved yet")
			{
				window.alert(response.message)
				return;
			}
			if(response.data && response.data[0].code === "RECORD_LOCKED" &&  response.data[0].message==="Sorry, you cannot perform this operation as the record is locked.")
			{
				renderingUtils.displayPermissionDenied(null, null, _cruxUtils.getI18n("crm.record.locking.permission.denied"));//no i18n
			}
			if(response.data && response.data[0].code === "INVALID_DATA" && response.data[0].message === "invalid data"){//no i18n
				var eObject = this.getFinalErrorObjectDetails(response.data[0], this.data.cxPropContent);
				var apiName = eObject.details.api_name;
				var comp =  $L(this.getFieldId(apiName,index+1))[0];
				field = this.getFieldObject(apiName);
				var message;
				if(field.data_type === 'lookup'){
					message = _cruxUtils.getI18n("crm.crud.lookup.inaccessible.record");
					var moduleData = this.getData('cxPropModuleData');
					if(this.isInventoryModule(moduleData.module_name) && ["Invoiced_Items","Purchase_Items","Ordered_Items","Quoted_Items"].includes(eObject.details.parent_api_name) && eObject.details.api_name === "Price_Book_Name"){ //no i18n
						message = _cruxUtils.getI18n("crm.crud.lookup.module.inaccessible");//no i18n
					}
				}else{
					var fldType =field.cxTypeMapping;
					var dataType = field.type;
					var fLabel = field.field_label;
					if(eObject.details.maximum_length){
						if(fldType === "text" || dataType === "string"){
							message = _cruxUtils.getI18n("crm.iamexception.maxlen",[eObject.details.maximum_length,$ESAPI.encoder().encodeForHTML(fLabel)]);
						}else if(dataType === "number" || fldType === "phone"){//no i18n
							message = _cruxUtils.getI18n("crm.field.length.check",$ESAPI.encoder().encodeForHTML(fLabel));
						}
					}else{
						message = _cruxUtils.getI18n("crm.field.valid.check",$ESAPI.encoder().encodeForHTML(fLabel));
					}
				}
				comp.cxProp('errorMessage',message);
				return;
			}
			if(response.data && response.data[0].code === "INVALID_DATA" && response.data[0].message === "the subform id given seems to be invalid"){
				_cruxUtils.showCustomMessage({"params" : {"ltPropMessage" : _cruxUtils.getI18n("crm.crud.subform.deleted.record",this.getData('cxPropSection').display_label),"ltPropType" : "error","ltPropDuration": "3000"}});//no i18n
				return;
			}
			if(response.data && response.data[0].code === "INVALID_DATA"){
				var details = response.data[0].details;
				var apiName = details.api_name;
				if(apiName==='id'){
					var path = details.json_path;
					var pathArr = path.split('.');
					apiName = pathArr[pathArr.length-2];
					field = this.getFieldObject(apiName);
				}else{
					field =  this.getFieldObject(details.api_name);
				}
				var fldType =field.cxTypeMapping;
				var dataType = field.type;
				var fLabel = field.field_label;
				if(details.maximum_length){
					var comp =  $L(this.getFieldId(apiName,index+1))[0];
					if(fldType === "text" || dataType === "string"){
						comp.cxProp('errorMessage',_cruxUtils.getI18n("crm.iamexception.maxlen",[details.maximum_length,$ESAPI.encoder().encodeForHTML(fLabel)]));
					}else if(dataType === "number" || fldType === "phone"){//no i18n
						comp.cxProp('errorMessage', _cruxUtils.getI18n("crm.field.length.check",$ESAPI.encoder().encodeForHTML(fLabel)));
					}
				}else{
					var comp = $L('#'+this.getData('cruxTableAjaxEditId'))[0].querySelector('#'+apiName);
					comp.cxProp('errorMessage',_cruxUtils.getI18n("crm.field.valid.check",$ESAPI.encoder().encodeForHTML(fLabel)));
				}
				return;
			}else if(response.data && response.data[0].code === "FILTER_CRITERIA_NOT_SATISFIED"){
				var eObject = this.getFinalErrorObjectDetails(response.data[0], this.data.cxPropContent);
				var apiName = eObject.details.api_name;
				var comp =  $L(this.getFieldId(apiName,index+1))[0];
				field = this.getFieldObject(apiName);
				var errorLabel = '';
				if(field.cxTypeMapping === 'user'){
					errorLabel = _cruxUtils.getI18n("crm.field.label.user.lookup");
				}else if(moduleRecordMapping[field.lookup.module.api_name]){
	                errorLabel = moduleRecordMapping[field.lookup.module.api_name].singular_label;
				}else if(moduleDetailedInfo.modules){
                    let moduleInfo = moduleDetailedInfo.modules.filter(function(x){return x.api_name === field.lookup.module.api_name})[0];
                    if(moduleInfo && moduleInfo.singular_label){
                    	errorLabel = moduleInfo.singular_label;
                    }
                }
				comp.cxProp('errorMessage',_cruxUtils.getI18n("crm.lookupfilter.entity.errormsg",errorLabel));
				comp.scrollIntoView({block: "center",behavior : 'smooth',inline: "center" })
				return;
			}else if(response.data && response.data[0].code === "DUPLICATE_DATA"){
				var eObject = this.getFinalErrorObjectDetails(response.data[0], this.data.cxPropContent);  //eslint-disable-line no-redeclare
				var apiName = eObject.details.api_name;//eslint-disable-line no-redeclare
				var comp =  $L('#'+apiName)[0];//eslint-disable-line no-redeclare
				field = this.getFieldObject(apiName);//eslint-disable-line no-redeclare
				var fLabel = field.field_label;//eslint-disable-line no-redeclare
				var message;//eslint-disable-line no-redeclare
				if(eObject.details && eObject.details.more_records && self.getData('moduleData.generated_type') == "default"){
					message = I18n.getMsg("crm.duplicate.value.not.allowed") + ' ' + I18n.getMsg('crm.duplicate.value.available.multiple',[moduleRecordMapping[eObject.details.duplicate_record.module.api_name] != undefined ? $ESAPI.encoder().encodeForHTML(moduleRecordMapping[eObject.details.duplicate_record.module.api_name].singular_label.toLowerCase()) : $ESAPI.encoder().encodeForHTML(this.getData('cxPropModuleData').singular_label.toLowerCase()),$ESAPI.encoder().encodeForHTML(fLabel)]);//no i18n
					//dummyO.more_records = true;
				}else{
					message = I18n.getMsg("crm.duplicate.value.not.allowed") + ' ' + I18n.getMsg("crm.duplicate.value.available",[moduleRecordMapping[eObject.details.duplicate_record.module.api_name] !== undefined ? $ESAPI.encoder().encodeForHTML(moduleRecordMapping[eObject.details.duplicate_record.module.api_name].singular_label.toLowerCase()) : $ESAPI.encoder().encodeForHTML(this.getData('cxPropModuleData').singular_label.toLowerCase()),$ESAPI.encoder().encodeForHTML(fLabel)]);//no i18n
				}
				this.setData('errorYield',true);
				this.setData('errorResp',response);
				comp.cxProp('errorMessage',message);
				return;
			}else if(response.data && response.data[0].code === "NOT_ALLOWED"){
				var eObject = this.getFinalErrorObjectDetails(response.data[0], this.data.cxPropContent);
				var apiName = eObject.details.api_name;
				var comp =  $L(this.getFieldId(apiName,index+1))[0];
				let message =  eObject.message === "can't add inactive bundle in the inventory" ? _cruxUtils.getI18n("crm.lineitem.inactive.alert",moduleRecordMapping.Bundles ? moduleRecordMapping.Bundles.singular_label : '') //no i18n
				: eObject.message === "can't add deleted bundle in the inventory" ? _cruxUtils.getI18n("crm.select.record.deleted",moduleRecordMapping.Bundles ? moduleRecordMapping.Bundles.singular_label: '') : 
				eObject.message === "can't add inactive product in the inventory" ? _cruxUtils.getI18n('crm.select.product.deleted') : eObject.message;
				comp.cxProp('errorMessage',message);
			}
		}catch(exception){
			//do nothing
		}
	},
	/*
	reset the horizontal scroll
	*/
	resetHorizontalScrollBar: function () {
		$L('#subform_'+this.getData('subformUniqueId')+'_'+this.getData('subformId')+' .lyteTableScroll', this.$node).animate({ //eslint-disable-line @zoho/webperf/no-animate
			scrollLeft: 0
		}, 100, null);
	},
	/*
	when a new row is added if the add button goes below the visible area, the div is scrolled to make the 
	button visible again
	*/
	handleButtonVisibility: function () {
		var addBtn = $L('#addbtn',this.$node)[0]
		if(addBtn){
			var _this  = this;
			$L.fastdom.measure(function(){
				var btnBottom = addBtn.getBoundingClientRect().bottom;
				var scrollQuery = _this.getData('cxPropScrollQuery');
				if(btnBottom>window.innerHeight){
					var scrollContainer = $L(scrollQuery === 'window' ? window : _this.data.cxPropScrollQuery);
					var newScroll = scrollContainer.scrollTop() + (btnBottom-window.innerHeight)+40;//added 40 for button visibility
					scrollContainer.animate({
						scrollTop: newScroll
					}, 500, null);
				}
			
		})
	}
	},
	handleTableXScroll: function(){
		if(this.isHeaderFixed){
			var left = this.$node.querySelector('.lyteTableScroll').scrollLeft;
			this.$node.querySelector('#headerRow').style.transform = "translateX(" + left*-1 + "px)";
			if(this.getData("cruxTableShowFilter")){
				this.$node.querySelector('crux-lookupfilter-component').style.transform = "translateX(" + left*-1 + "px)";
			}
		}
	},
	/*once the table is rendered, the max width for table head has to be set because the position of head will be changed
	to fixed on scrolling*/
	setWidthForHeader: function (timeout) {
		//beacuse the container width changes after subform is rendered
		setTimeout(function(){
			if(this.lyteTable && this.lyteTableHead){
				var tableWidth = this.lyteTable[0].offsetWidth;
				this.lyteTableHead[0].style.maxWidth = tableWidth-2 + 'px';
			}
		}.bind(this),timeout)
	},
	addDefaultFieldsForLookup: function(lookupApiName,relatedApiName){
		var defaultFields = this.getData('defaultFields');
		if(defaultFields[lookupApiName]){
			Lyte.arrayUtils(defaultFields[lookupApiName].api_names,'push',relatedApiName);
		}else{
			var defaultField = {}
			defaultField[lookupApiName] = {api_names:[relatedApiName]};

			Lyte.objectUtils(defaultFields,'add',defaultField);//used by lookup component to fetch the values
		}
	},
	addDetailsToField: function(){
		var section = this.getData("cxPropSection");
		var aggregateFields;
		if(section && section.fields){
			var subTypeMapping = {'text':{medium:'text-area',large:'text-area'}};
			var fieldObject = this.fieldObject; //object containig all the fields
			var aggApiNames = [];
			var headerFields = [];
			var aggregateFields = [];
			var fields = section.fields;
			var fieldsLength = fields.length;
			var skipField = false;
			var invSubform = this.getData('isDefaultInvSubform');
			var lookupProperties = this.getData('cxPropLookupProperties');
			var fieldTypeMapping = this.getData('cxPropFieldTypeMapping');
			var currentLayout  = this.getData('cxPropLayout');
			var fieldMapping = this.getData('cxPropFieldTypeMapping');
			let headerProp = this.getData('headerProperties');
			var type=this.getData('cxPropType');
			var subformFormulaMapping = this.getData('subformFormulaMapping');
			var dependancyPickist = function(obj){ return  obj.maps && obj.maps.length>0}
			for (var i = 0; i < fieldsLength; i++) {
				skipField = false;
				var field = fields[i];
				field.fieldLabel = field.field_label;
				//for aggregate fields, filter done in html
				if ((field.subform && field.data_type !== 'subform' && field.data_type !== 'static_subform') || this.filterFields(field)) {
					field.showCalculator = false;
					field.from = this.getData('cxPropType')==='edit'?'create':this.getData('cxPropType');
					field.autoUpdate = false;
					field.disabled = false;
					field.cxPropFilterZcqa = 'filter_'+this.getData('cxPropSection').display_label+'_'+field.field_label
					if(this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(field) && !this.checkUnMaskPermission(field)){
						if(headerProp && headerProp[field.id]){
							Lyte.objectUtils(headerProp[field.id],'add','cxPropShowMenuIcon',false);
						}else{
							Lyte.objectUtils(headerProp,'add',field.id,{cxPropShowMenuIcon:false});
						}
					}
					//add module name in lookup props
					if(fieldMapping[field.ui_type]=="lookup" && !(field.yield || field.yieldName)){
						if(!lookupProperties){
						this.setData('cxPropLookupProperties',{});
						lookupProperties = this.getData('cxPropLookupProperties');
						}
						field.iconClass = lookupProperties[field.api_name] ? lookupProperties[field.api_name].iconClass : lookupProperties.iconClass;
						var props = lookupProperties[field.api_name]?lookupProperties[field.api_name]:{};
						Lyte.objectUtils(this.getData('cxPropLookupProperties'),'add',field.api_name,Object.assign(props,{}));
						if(field.lookup && field.lookup.module){
							let api_name = field.lookup.module.api_name==='Products' ? 'Product_Active' :
												field.lookup.module.api_name === 'Bundles__s'? 'Active' : ''; 
							if(api_name){
								let criteriaObj =
								[
									{
										"api_name":api_name,//NO I18N
										"comparator" : "equals",//NO I18N
										"value":true, //No I18N
									}
								];
								let criteria = {
									criteria: `(${api_name}:equals:true)`,
									criteriaObj: criteriaObj
								};
								this.clientScriptFunction('setValue',`subformField.${field.api_name}.criteria`,criteria);
							}	
						}
					}
					if(!this.getData('disableCriteria') && (fieldMapping[field.ui_type]==="lookup" || fieldMapping[field.ui_type]==="user") && field.lookup.query_details && field.lookup.query_details.query_id){
						field.queryParam = {query_id:field.lookup.query_details.query_id};
					}
					//disabling parent picklist in map dependancy
					if(fieldTypeMapping[field.ui_type]=='picklist'){
						var values = (currentLayout ? field[currentLayout] :field).pick_list_values;;
						var values_len = values.length;
						for (let v = 0; v < values_len; v++) {
							let pick_option = values[v];
							if(pick_option && pick_option.maps){
								var option_maps_len = pick_option.maps.length;
								for (let p = 0; p < option_maps_len; p++) {
									let optionMap = pick_option.maps[p];
									let fieldData = store.peekRecord('field',optionMap.id);
									if(fieldData && fieldData[currentLayout] && fieldData[currentLayout].pick_list_values && optionMap.pick_list_values){
										let picklistOptions = fieldData[currentLayout].pick_list_values;
										let positionMap = new Map(picklistOptions.map((item, index) => [item.id, index]));
										optionMap.pick_list_values = optionMap.pick_list_values.sort((a, b) => positionMap.get(a.id) - positionMap.get(b.id));
									}
							    }
							}
					    }
						if(values.find(dependancyPickist)){
							this.parentPicklist.push(field)
							// field.disabled = true;
						}
					}
					if(invSubform){
						if(field.ui_type===133 && this.handleInventoryCheck('LOOKUP','compare',field)){
							if(!(field.yield || field.yieldName)){
								field.skipYield = true;
								field.yieldName='invlookup';
							}
							//check if product code has to be shown
							this.showLookupCode = field.lookup && field.lookup.show_fields && this.handleInventoryCheck('CODE','compare',field.lookup.show_fields[0].field) && field.lookup.show_fields[0].show_data;
							this.addDefaultFieldsForLookup(field.api_name,'Taxable');
						}
						switch(field.column_name){
							case "BOOKID":
								this.setData('isValidBookidField', true);
								skipField = true;
								break;
							case "ITEMDESCRIPTION":
							case "BUNDLEDESCRIPTION": 
								this.setData('invDescSubfield', field);
								skipField = true;
								break;
							case "LINETAX":
							case "TOTALAFTERDISCOUNT":
								skipField = true;
								break;
							case "DISCOUNT":
								if(!field.subform && !field.associated_module){
									field.yieldName = 'discount';
									field.skipYield = true;
									field.disabled = true;
								}
								break;
							case "TAX":
								field.disabled = true;
						}
					}
					if(type==="create" || type==="edit" || (this.getData('cxPropAjaxEdit') && type==='view')){
						if(this.getData('isStaticSubform') && field.static_field){
							this.getData('staticSubformFields').push(field);
						}
						if (field.association_details) {
							var associationDetails = field.association_details;
							var associatedField = {};
							var lookupApiName = associationDetails.lookup_field.api_name;
							associatedField.relatedApiName = associationDetails.related_field.api_name;
							associatedField.relatedField = associationDetails.related_field;
							associatedField.fieldDetails = field;
							if(this.associatedFields[lookupApiName]){
								this.associatedFields[lookupApiName].push(associatedField);
							}else{
								this.associatedFields[lookupApiName] = [associatedField];
							}
							this.addDefaultFieldsForLookup(lookupApiName,associatedField.relatedApiName);
						}
						if (field.data_type === "formula") {
								field.disabled = true;
								var formulaField = {};
								formulaField.apiName = field.api_name;
								formulaField.formula = field.formula;
								if(formulaField.formula.expression){
									var expression = formulaField.formula.expression;
									let apiNames = this.getApiNameFromFormula(expression);
									if(apiNames && apiNames.length>0 && apiNames.join().includes('.')){
										apiNames.forEach((apiName)=>{
											expression = expression.replace(apiName,apiName.split('.')[1])
										})
									}
									formulaField.formula.expression = expression;
								}
								if(subformFormulaMapping[field.formula.return_type]){
									field.subformMapping = subformFormulaMapping[field.formula.return_type];
								}
								field.cxDisplayText = (field.formula.return_type==='boolean')?true:false;
								formulaField.decimalLength = field.decimal_place;
								formulaField.aggregateFormula = false;
								formulaField.moduleFormula = false;
								field.autoUpdate = true;
								//aggregate formula fields
								if (field.subform) {
									if (field.ui_type === 117) { 
										formulaField.aggregateFormula = true;
										aggApiNames.push(field.api_name);
		
									}
									else { //module formula
										formulaField.moduleFormula = true;
										var expression = formulaField.formula.expression;
										formulaField.skip = false;
										var apiNames = this.getApiNameFromFormula(expression, ',');
										var reg = new RegExp(aggApiNames.join('|'), 'g');
										//check if the module is dependant on aggregate formula, then it needs to be skipped on init
										if (reg.test(apiNames)) {
											formulaField.skip = true;
										}
									}
								}
								this.formulaFields.push(formulaField);
						}
					}
					if (!field.subform && (!field.associated_module || field.ui_type===555 || field.ui_type===556)) {
						fieldObject[field.api_name] = field;
					}
						if(!skipField){
							if(field.subform || (field.associated_module && field.ui_type!==555 && field.ui_type!==556)){
								var mapping = this.getData('cxPropFieldTypeMapping');
									var formulaMapping = this.getData('formulaMapping');
									//cxTypeMapping
									if(field.ui_type === 116 || field.ui_type === 117){
										if(field.ui_type === 116 && subTypeMapping[formulaMapping[field.formula.return_type]] && subTypeMapping[formulaMapping[field.formula.return_type]][field.formula.sub_return_type]){
											field.cxTypeMapping = subTypeMapping[formulaMapping[field.formula.return_type]][field.formula.sub_return_type];
										}else{
											field.cxTypeMapping = formulaMapping[field.formula.return_type];
										}
									}else{
										field.cxTypeMapping = mapping[field.ui_type];
									}
							}

						this.addCurrencySymbolInHeader(field);
						this.addWidthDataToField(field);
						if (!field.subform && (!field.associated_module || field.ui_type===555 || field.ui_type===556)) { //no need to pass aggregate fields to crux table component
							if(field.yieldName && !field.skipYield){ //for passing yield from table component to user
								// field = Object.assign({},field);
								field.subformYieldName = field.yieldName;
								field.yieldName = 'subform';
							}
							let type = this.getData('cxPropFieldTypeMapping')[field.ui_type];
							delete field.cxProp;
							if(type==='date' || type==='date-time'){
								if(type==='date'){
									this.copyProperties(field,this.getData('cxPropDateProperties'));
								}else{
									this.copyProperties(field,this.getData('cxPropDatetimeProperties'));
								}
							}else{
								//eslint-disable-next-line @zoho/zstandard/no-commoncode-in-ifelse
								this.copyProperties(field); //copying fieldProperties
							}
							headerFields.push(field);
							fieldObject[field.api_name] = field;
						}
						else{
							this.aggFieldObject[field.api_name] = field;
							aggregateFields.push(field);
						}
						}
					}
			}
			if(aggregateFields.length>0){
				this.setData('aggregateFields',aggregateFields);
			}
			return headerFields;
		}
	},
	copyProperties: function(header,properties){
		if(properties){
			let cxProp = this.getData('cxPropFieldProperties') ? 
			this.getData('cxPropFieldProperties') : {};
			let apiSet = new Set();
			if(this.getData('cruxTableHeader') && this.getData('cruxTableHeader').length){
				this.getData('cruxTableHeader').forEach((head)=>{ apiSet.add(head.api_name); });
			}
			Object.keys(properties).filter((prop)=> !apiSet.has(prop.api_name)).forEach((prop)=>{
				cxProp[prop] = properties[prop];
			});
			if(properties[header.api_name]){
				let fieldProp = properties[header.api_name];
				Object.keys(fieldProp).forEach((prop)=>{
					cxProp[prop] = fieldProp[prop];
				});
			}
			header.cxProp = JSON.stringify(cxProp);
		}else if(this.getData('cxPropFieldProperties')){
			header.cxProp = JSON.stringify(this.getData('cxPropFieldProperties'));
		}
	},
	getCurrencyCode: function(){
		let currencyCode;
		if(this.getData('cxPropCurrencyData') && this.getData('cxPropCurrencyData').key){
			currencyCode = this.getData('cxPropCurrencyData').key;
		}else if(this.getData('cxPropContent').Currency){
			currencyCode = this.getData('cxPropContent').Currency;
		}else{
			currencyCode = this.getData('cxPropNumberProperties') 
			&& this.getData('cxPropNumberProperties').currencyDetails 
				&& this.getData('cxPropNumberProperties').currencyCode ? 
				this.getData('cxPropNumberProperties').currencyCode : '';
		}
		return currencyCode;
	},
	getCurrencySymbol: function(){
		let currencySymbol;
		if(this.getData('cxPropCurrencyData') && this.getData('cxPropCurrencyData').symbol){
			currencySymbol = this.getData('cxPropCurrencyData').symbol;
		}else if(this.getData('cxPropContent').$currency_symbol){
			currencySymbol = this.getData('cxPropContent').$currency_symbol;
		}else{
			if(this.getData('cxPropNumberProperties') 
			&& this.getData('cxPropNumberProperties').currencyDetails 
				&& this.getData('cxPropNumberProperties').currencyCode){
			let currencyDetails = this.getData('cxPropNumberProperties').currencyDetails;
			currencySymbol = currencyDetails && [this.getData('cxPropNumberProperties').currencyCode]?
			currencyDetails[this.getData('cxPropNumberProperties').currencyCode].symbol:'';
		}else if(typeof Crm !== "undefined"){
			currencySymbol = Crm.userDetails.DEFAULT_ORG_CURRENCY ? Crm.userDetails.DEFAULT_ORG_CURRENCY.symbol : 
				Crm.userDetails.defaultOrgCurrency ? Crm.userDetails.defaultOrgCurrency.symbol : '';
			}
		}
		return currencySymbol;
	},
	addWidthDataToField: function(field){
			field.customWidth = true;
			if (field.api_name==="Serial_Number__s" || field.column_name === "SERIAL_NUMBER") {
				this.serialNumberField = field;
				field.yieldName = 'serialNumber';
				field.cxPropAllowNegativeValue=false;
				field.skipYield = true;
				field.fixed = 'enable'
				field.width = "60";
			}else{
				switch (field.ui_type) {
					case 1 :
					case 11 : 
					case 25 :
					case 37 :
					case 35 :
					case 33 :
					case 19 :
					case 127 :
					case 21 :
						field.width = "265";
					break;
					case 2:
						if(field.display_format){
							field.subformMapping = 'grouper-radio';
						}	
						field.filterProperties = {type:'multisearch'}
						this.picklistFields.push(field.api_name);
						field.cxType = "single";
						field.width = "265";
						field.autoUpdate = true;
						break;
					case 133:
						field.width = "265";
						field.autoUpdate = true;
						break;
					case 221:
						field.width = "265";
						break;
					case 20: //view only type fields
						field.skipYield = true;
						field.yieldName = 'user';
						field.width = "265";
						field.from = "view";
						break;
					case 116:
						if(["NETTOTAL","TOTAL"].includes(field.column_name)){
							field.width = '160';
							//no need to set width for aggreagate text area formula
						}else if(field.cxTypeMapping==="text-area" && !field.subform && !field.associated_module){
							field.width = '365';
						}else{
							field.width = '195';
						}
						break;
					case 110:
					case 3:
						field.width = "365";
						break;
					case 100:
						field.cxType = "multisearch";
						field.width = "365";
						field.autoUpdate = true;
						break;
					case 555:
						field.cxType='multiple';
						field.width = "365";
						break;
					case 24:
						field.width = "145";
						// field.autoUpdate = true;
						break;
					case 202:
						field.width = "145";
						break;
					case 301:
						field.width = "90";
						break;
					case 36:
					case 143:
					case 144:
					case 145:
						//TODO: check if calculator will be shown in subform fields
						field.showCalculator = true;
						field.width = "160";
						break;
					case 32:
					case 52:
					case 38:
					case 34:
					case 117:
						switch(field.column_name){
							case 'QUANTITY':
							field.width = "110"; break;
							case 'TAX':
							field.width = "158"; break;
							case 'DISCOUNT':
							field.width = "170"; break;
							default:
							field.width = "160";
							
						}
						break;
					case 333:
						field.width = "265";
						// field.autoUpdate = true;
						break;
					case 556:
						field.width = "365";
						field.cxType = "multiple";
						break;
					default:
						field.width = "195";
				}

			}
			if(this.getData('cxPropCustomWidth') && this.getData('cxPropFixedWidth') && field.subform_properties && field.subform_properties.custom_width){
				field.width = field.subform_properties.custom_width;
			}else{
				//converting field label to camel case
				var capitalizeText = ''
				field.field_label.split(/\s+/).forEach(function (el,idx) {
					var add = el[0].toUpperCase() + el.slice(1);
					capitalizeText += (idx>0)? " "+add:add;
				});
				//check if static width fits the label (width + padding + sorticon)
				var calculatedwidth = this.getTextWidthUsingCanvas(capitalizeText,{font:'14px Zoho_Puvi_Medium'})+50;
				if(field.sortable && this.getData('cxPropTableProperties') && this.getData('cxPropTableProperties').enableSort){
					calculatedwidth += 30;
				}
				if(field.tooltip){
					calculatedwidth += 21;
				}
				field.width =  Math.ceil(calculatedwidth && calculatedwidth > field.width ? calculatedwidth : field.width);
			}
			field.width +=  'px';
			//max-width is for fields whose length goes beyond the given length
			
			if(this.getData('cxPropFixedWidth') || (field.api_name==="Serial_Number__s" || field.column_name === "SERIAL_NUMBER")){
				field.style = "width:" + field.width + ";min-width:" + field.width + ";max-width:"+field.width+";";
			}else{
				field.style = "width:" + "auto" + ";min-width:" + field.width + ";";
			}
	},
	checkDepandantFormula: function(exp, api){
		return exp && exp.includes('${'+api+'}')
	},
	/*
	using regex to get the api names inside the formula
	*/
	getApiNameFromFormula: function (formula, join) {
		var regex = /\${([^{}]*)\}/g;
		var apiNames = Array.from(formula.matchAll(regex)).map((arr)=>{return arr[1]});
		if (join && apiNames) {
			return apiNames.join(join);
		}
		return apiNames

	},
	getValueForFormula: function(apiName,data,formulaField,rowId,field){
		var parsefloat = function(obj){return parseFloat(obj[this.apiName]);}
		var checkFloat = function(obj){return !isNaN(parseFloat(obj[this.apiName]))}
		var concatValues = function(prev, curr){return prev + ";" + curr;}
		var content = this.getData('cruxTableContent');
		var copyField= field;
		var val;
		if (formulaField.aggregateFormula) {
			val = (content.length==0) ? 0: val = content.filter(checkFloat, { apiName: apiName }).map(parsefloat, { apiName: apiName }).join('#&');
			val = (!formulaField.formula.assume_default && val===0) ? undefined : val;
		}
		else if (formulaField.moduleFormula) {
			val = data[apiName];
		}
		else {
			val = content[rowId - 1][apiName];
			if(val){
				let field = content[rowId - 1].$.model.fieldList[apiName];
				var type = field.fieldType === 'formula' ? field.type: field.fieldType;
				switch(type){
					case 'picklist':
						if(copyField.pick_list_values && copyField.pick_list_values.length>0){
							val = copyField.pick_list_values.find(ele => ele.display_value === val);
							val = val.reference_value;
							val = (val === '-None-') ? '' : val;
						}else{
							val = (val === '-None-') ? '' : val;
						}
						break;
					case 'multiselectpicklist':
							if(val instanceof Array){
								val = val.join(';');
							}else{
								try{
									val = JSON.parse(val);
									val = val.join(';');
								}catch(e){
									if(val.includes('; ')){
										val = val.replaceAll('; ',';');
									}
								}
							}
						break; 
					case 'date':
						var date = this.getDateObjectFromStringForSubform(val,true);
						val = $L.moment(date).format("MMM D,YYYY");
						break;
					case 'datetime':
						var date = this.getDateObjectFromStringForSubform(val,true);//eslint-disable-line no-redeclare
						val = $L.moment(date).format("MMM D,YYYY" + " " + this.userDetails.TIME_FORMAT.replace('a', 'A'));
						break;
					case 'lookup':
						if (this.isProductSubform && apiName === "Product_Name") {
							var rec = content[rowId - 1];
							var selProduct = rec._LC_additional_INV_subform_INFO ? rec._LC_additional_INV_subform_INFO.selProdDetails : null;
							val = selProduct ? { "name": selProduct.Product_Name, "id": val.id } : val; 
						}
						val = val ? val.name : '';
						break;
					default:
						if(typeof val == 'object'){
							val = val.name ? val.name : (val.full_name ? val.full_name : '');
						}
				}

			}
			if(field.cxTypeMapping==='number' && isNaN(val)){
				val = '';
			}
			//brackets in the value needs to be skipped during evaluation
			if (typeof val == 'string') {
				val = val.replace(/'/g,"\\'").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/,/g,"\\,");
			}
			
		}
		return val;

	},
	//for hamburger icon case, only if the field is masked and has unmasking permission icon will be shown
	unMaskCheckNeeded: function(field){
		return field && field.mask_details && this.getData('cxPropProfileId');
	},
	checkUnMaskPermission: function(field){
		let profileId = this.getData('cxPropProfileId');
		return field.mask_details.profiles &&field.mask_details.profiles.find((profile)=> profileId===profile.id);
	},
	replaceValuesInFormula: function (expression, fieldObject, data, formulaField, rowId,isUtil){
		var isValidExp = false;
		var decimalFldUITypeArr = [32, 34, 36, 38, 39, 40, 52, 77, 143, 144, 145, 117];
		expression = this.removeWhiteSpaces(expression);
		var apiNames = this.getApiNameFromFormula(expression);
		if (apiNames && apiNames.length>0) {
			var apiName, val, field;
			for (var j = 0; j < apiNames.length; j++) {
				//removing ${ and } from the apiname
				apiName = apiNames[j];
				field = this.getFieldObject(apiName,formulaField.moduleFormula);
				if(!isUtil && (!field || !field.visible || (this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(field) && !this.checkUnMaskPermission(field)))){ //if the field is not in subform, no need to caculate formula
					isValidExp = false;
					break;
				}
				val = this.getValueForFormula(apiName, data, formulaField, rowId, field);
				//replace the api name with its value

				if(!formulaField.formula.assume_default ){
					var operators = ['*', '/', '%', '^'];
					if (val) {
						expression = expression.replace('${' + apiName + '}', val);
						isValidExp = true;
					}else if(field || isUtil){
						val = val==undefined?'':val;
						if (val === "" && (expression.charAt(expression.indexOf('${' + apiName + '}') - 1) === '-' || expression.charAt(expression.indexOf('${' + apiName + '}') - 1) === '+')) {
							if (expression.charAt(expression.indexOf('${' + apiName + '}') + ('${' + apiName + '}').length) === '/' || expression.charAt(expression.indexOf('${' + apiName + '}') + ('${' + apiName + '}').length) === '*' || expression.charAt(expression.indexOf('${' + apiName + '}') + ('${' + apiName + '}').length) === '%' || expression.charAt(expression.indexOf('${' + apiName + '}') + ('${' + apiName + '}').length) === '^') {
								expression = expression.replace('${' + apiName + '}', null);
							}
							else {
								expression = expression.replace(expression.charAt(expression.indexOf('${' + apiName + '}') - 1) + '${' + apiName + '}', val);
							}
						}
						else if (val === "" && (operators.includes(expression.charAt(expression.indexOf('${' + apiName + '}') - 1)) || (expression.indexOf('${' + apiName + '}') === 0 && operators.includes(expression.charAt(('${' + apiName + '}').length))))) {
							expression = expression.replace('${' + apiName + '}', null);
						}
						else {
							expression = expression.replace('${' + apiName + '}', val);
						}
						isValidExp = true;
					}
				}else{
					if (val || (field.cxTypeMapping === 'boolean' && val === false) ) { 
						expression = expression.replace('${' + apiName + '}', val);
						isValidExp = true;
					}
					else if(Crm.userDetails.FORMULA_INSIDE_FORMULA_SUPPORT && (field && field.ui_type === 116) && formulaField.formula && formulaField.formula.evaluation_order > 1){
						expression = expression.replace('${' + apiName + '}', val);
						isValidExp = true;
					} 
					else if (!val && field.cxTypeMapping != 'date-time' && field.cxTypeMapping != 'date') {
						expression = expression.replace('${' + apiName + '}', decimalFldUITypeArr.includes(field.ui_type) ? 0 : '');
						isValidExp = true;

					}
				}
			}
		}
		else { //if the formula doesn't contain any api, no need for validation
			isValidExp = true;
		}
		return { isValidExp: isValidExp, expression: expression };
		
	},
	parseFormulaResponse: function(resp){
		var response = resp;
		var rowId = response.rowId;
		var value = response.value;
		var formulaField = response.formulaField;
		var returnType = formulaField.formula.return_type;
		if(typeof value == 'string'){
			value = value=='undefined'?'':value;
			value = value.trim();
		}
		if (returnType == 'number' || returnType == 'currency' || returnType == 'double') {
			if (isNaN(parseFloat(value))) {
				//during edit 0 is shown by default for formula field
				// value = 0;
				value = null;
			}
			else {
				value = parseFloat(parseFloat(value).toFixed(formulaField.decimalLength));
			}
		}
		else if(returnType=="date" || returnType=="datetime"){
			var pattern = this.userDetails.DATE_PATTERN.toUpperCase();
			pattern = (returnType==="datetime") ? pattern + ' '+ this.userDetails.TIME_FORMAT.replace('a','A'): pattern;
			if(!$L.moment(value,pattern).validate()){
				value = $L.moment(new Date(value)).i18N(pattern);
			}
		}else if(returnType=="boolean"){
			if(!formulaField.formula.assume_default )
			{
				if(value === "")
				{
					value = false;
				}else{
					value = (value === 'true');
				}
			}else {
				value = (value === 'true');
			}
		}
		return value;
	},

	/*
	* Below function compute the data for the given formula expression by replacing the api name with its value.
	*/
	evaluateFormulaExpression: function (formula, rowId, data, formulaField,fieldApiName,isUtil) {
		var fieldObject = this.fieldObject;
		if (formula && formula.length > 0) {
			var response = this.replaceValuesInFormula(formula, fieldObject, data, formulaField, rowId,isUtil);
			if (response.isValidExp) {
				var validCondition = true,conditionExp="";
				if (this.userDetails.DYNAMIC_FORMULA_ENABLED && formulaField.formula.stop_compute_conditionally){
					var stopComputeExpResponce = this.replaceValuesInFormula(formulaField.formula.stop_compute_expression, fieldObject, data, formulaField, rowId,isUtil);
					validCondition = stopComputeExpResponce.isValidExp;
					conditionExp = stopComputeExpResponce.expression;
				}
				if (validCondition){
					var addData = this.generateDataForFormulaExec(response.expression, conditionExp,formulaField,fieldApiName,data);
					return this.handleWebWorker(response.expression, formulaField, rowId, this,addData,isUtil);
				}
			}
		}
	},
	handleWebWorker: function (formula, formulaField, rowId, node,addData,isUtil) {
		var formulaResponse = this.asyncEvaluateFormula({ formula: formula, formulaField: formulaField, rowId: rowId, userDetails: this.userDetails,data:addData},isUtil);
		if(isUtil){
			return node.parseFormulaResponse(formulaResponse);
		}else{ //eslint-disable-line no-else-return
			formulaResponse.then(function (resp) {
				var value = node.parseFormulaResponse(resp);
				if (formulaField.aggregateFormula || formulaField.moduleFormula) {
					node.data.cxPropContent.$.set(formulaField.apiName, value);
					if(node.data.cxPropUnbound && node.data.cxPropType === 'view'){
						node.$node.querySelector('#'+formulaField.apiName).cxProp('value',value);
					}
					node.valueChangeHandler(node.getFieldObject(formulaField.apiName,true),node.data.cxPropContent,-1,undefined,undefined,value);
				}
				else {
					node.data.cruxTableContent[rowId-1].$.set(formulaField.apiName, value);
				}
			});
		}

	},
	getDateObjectFromStringForSubform: function (date, isI18N) {
		if (!date) {
			return new Date();
		}
		else {
			var userPattern = this.userDetails.DATE_PATTERN.toUpperCase();
			if (date.includes(':')) {
				userPattern = userPattern.concat(" " + this.userDetails.TIME_FORMAT.replaceAll('a', 'A'));
			}
			return $L.moment(date, userPattern, { i18n: isI18N });
		}
	},
	createCustomData: function(customData,isAggr){
			var subformApiName  = this.getData('subformApiName');
			customData = isAggr ?customData : {[subformApiName] : customData};
						/**
			 * This callback is fired before ajax save, return the custom data for the request.
			 * @method setCustomData
			 * @author gowtham
			 
			 * @param { object } customData - custom data object
			 */
			return this.getMethods('setCustomData') ? this.executeMethod('setCustomData',customData) : customData;
	},
	setLookupFilterData: function(customData){
		if(Crm.userDetails.isLookupFilterEnabled){
			var fields = this.getData('cruxTableHeaderFields');
			var filterData;
			fields
				.filter(function(field){ return (field.data_type==='lookup' || field.data_type==='userlookup')&&field.lookup.revalidate_filter_during_edit})
				.forEach(function(field){
					var rec = store.peekRecord(this.data.subformId,this.data.cruxTableAjaxEditId);
					if(rec.$.get(field.api_name) && !rec.$.getDirtyAttributes().includes(field.api_name)){
						filterData = filterData ? filterData : {};
						filterData[this.data.cruxTableAjaxEditId] = filterData[this.data.cruxTableAjaxEditId] ? filterData[this.data.cruxTableAjaxEditId] : {};
						// var subformData = filterData[this.data.subformApiName];
						// subformData[this.data.cruxTableAjaxEditId] = subformData[this.data.cruxTableAjaxEditId] ?  subformData[this.data.cruxTableAjaxEditId] : {};
						var recordData = filterData[this.data.cruxTableAjaxEditId];
						var lookupData =  Object.assign({}, rec.$.get(field.api_name));
						lookupData.$populate_fields_of_lookup = false;
						recordData[field.api_name] = lookupData;
					}
				}.bind(this))
				if(filterData){
					customData.cxFilterData = filterData;
				}
		}
	},
	/**
	* This function will delete a row in subform.
	* @utility deleteRow
	* @param {number} index - the row that needs to be deleted
	*/
	deleteRow: function (index) {
		var _this = this;
		var type = this.getData('cxPropType');
		var subformApiName  = this.getData('subformApiName');
		var content = this.getData('cxPropContent');
		var tableContent = this.getData('cruxTableContent');
		var recordId = tableContent[index].id;
		var record = store.peekRecord(this.data.subformId, recordId);
		if(this.getData('cxPropAjaxEdit') && type==="view"){
			var executeDelete = function(){
				content[subformApiName].remove(record);
				record.$.deleteRecord();
				if (this.getData('hasMoreRecords') && this.getData('cruxTableContent').length === 0) {
					this.showAllRecords();
				}		
				this.showHideLoadingDiv(true);
				this.setData('disableAjaxEdit',true);
				var dirtyArr = content.$.getDirtyAttributes();
				this.customData = {cxSubformDelete:true}
				var delFunc,customData=Object.assign({}, this.customData);
				if(this.getMethods('onAjaxDelete')){
					delFunc = this.executeMethod('onAjaxDelete',recordId,customData);
				}else{
					delFunc = this.data.cxPropContent.$.save(this.createCustomData(customData),this.getData('cxPropQueryParams'))
				}
				delFunc.then(function(){
					_this.setData('selectedRows',[])
					Lyte.arrayUtils(tableContent, 'removeAt', index, 1);
					_this.evaluateFormulaFields(-1,true);
					if(_this.getData('cxPropUnbound')){
						Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:'delete',isSubform:true,data:{recordId:record.id}})
						Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:'delete',data:dirtyArr})

					}
					if (_this.serialNumberField) {
						_this.setSerailNumber(index,undefined,true);
					}
					Lyte.objectUtils(_this.getData('filterProperties'),'add','title',_this.getData('cruxTableContent').length>0?(_this.data.cruxTableShowFilter?_cruxUtils.getI18n('crm.report.clear.filter'):_cruxUtils.getI18n('crm.button.show.filter')):_cruxUtils.getI18n('crm.subform.filter.disabled'));
					_this.setData('disableAjaxEdit',false)
					_this.enableOrDisbleApplyFilter(true);
					_this.checkAndDisableInsertRow();
					_this.showHideLoadingDiv(false);
					if(_this.getMethods('onAfterAjaxDelete')){
						
						/**
						 * This callback is fired after ajax delete is completed
						 * @method onAfterAjaxDelete
						 * @author gowtham
						 
						 * @param { record } record - record that is deleted
						 */
						_this.executeMethod('onAfterAjaxDelete',record);
					}
				},function(resp){
					_this.handleServerErrorResponse(resp,index);
					_this.setData('disableAjaxEdit',false)
					record.$.rollBack();
					content.$.rollBack();
					_this.showHideLoadingDiv(false);
				})
			}.bind(this);
			if(_this.getMethods('onBeforeAjaxDelete')){
					/**
						 * This callback is fired before ajax delete
						 * @method onBeforeAjaxDelete
						 * @author gowtham
						 
						 * @param { record } record - record what will be deleted
						* @param { node } element - deleted row node
						 */
				var resp = _this.executeMethod('onBeforeAjaxDelete',record,$L('#'+recordId)[0]);
				if(resp instanceof Promise){
					resp.then(function(){
						executeDelete();
					})
				}
				else if(resp!=false){
					executeDelete();
				}
			}
			else{
				executeDelete();
			}


			
		}else if(type=="create" || type=="edit"){
			if(!this.getData('cxPropPreviewMode')){
				content[subformApiName].remove(record);
				record.$.deleteRecord();
				if(this.getData('cxPropLimitRows')){
					Lyte.arrayUtils(tableContent, 'removeAt', index, 1);
				}
				if(tableContent && tableContent.length==0){
					this.createRecord();
				} 
				this.evaluateFormulaFields(-1,true);
				if (this.serialNumberField) {
					this.setSerailNumber(index);
				}
				this.checkAndDisableInsertRow();
			}else{
				Lyte.arrayUtils(tableContent, 'removeAt', index, 1);
				if(tableContent && tableContent.length===0){
					this.createRecord();
				} 
				if (this.getData('cxPropAllowActionOnPreview') && this.serialNumberField) {
					this.setSerailNumber(index);
				}
			}
		}	
	},
	checkDirtyRecord: function(record,apiName){
		if(!record || !apiName){ return false; }
		return apiName ? (record.$.getDirtyAttributes().includes(apiName) || record.$.error[apiName]):record.$.isDirty() || Object.keys(record.$.error).length;
	},
	validateElements: function(children,record,isAggr,firstErrorField,rowId){
		let fstErrField;
		if (children && children.length > 0) {
			for (let i = 0; i < children.length; i++) {
				let child = children[i].firstElementChild;
				let field = child.cxProp('field');
				if (child.component && child.component.data.cxPropFrom !== 'view' && child.component.validate && !child.cxProp('disabled')
					&& (this.getData('cxPropMaskingEnabled') ? 
						(this.checkDirtyRecord(record,field.api_name) || !this.unMaskCheckNeeded(field) || this.checkUnMaskPermission(field)) : true)) {
					// if(this.isSubformMandatory && !isAggr){
					// 	firstErrorField.focusableField = {
					// 		child:child,
					// 		colIdx:i
					// 	};
					// }
					let valid = child.component.validate();
					if(!valid && !fstErrField){
						if(firstErrorField && !isAggr){
							firstErrorField.child = child;
							firstErrorField.colIdx = i;
						}
						fstErrField = child;
						if(!isAggr){
							this.clientScriptFunction('setValue',`subformCell.${rowId}.${child.cxProp('field').api_name}.error`,child.cxProp('errorMessage'));
						}
					}else if(!isAggr && valid && this.clientScriptFunction('getValue',`subformCell.${rowId}.${child.cxProp('field').api_name}.error`)){
						this.clientScriptFunction('setValue',`subformCell.${rowId}.${child.cxProp('field').api_name}.error`,'');
					}
				}
				if(this.getMethods("validateField")) {
					/**
					 * This callback is used to validate elements
					 * @method validateField
					 * @author gowtham
					 
					 * @param { number } rowNo - row number that needs to be validated
					* @param { node } element - field node
					 */
					let isValid = this.executeMethod("validateField", i + 1, child);
					//to be checked
					if(!isValid && firstErrorField && !firstErrorField.child){
							firstErrorField.child = child;
							firstErrorField.colIdx = i;
					}
				}
			}
		}
		return fstErrField;
	},
	validateAggregate: function(firstErrorField){
		let aggElem = $L('.cxSubformAggDiv .cxSubformValidateField',this.$node);
		return this.validateElements(aggElem,this.getData('cxPropContent'),true,firstErrorField);
	},
	/* 
	below function is used to validate all the components except sequence, formula and yield 
	*/
	validate: function () {
			this.setData('errorYield',false);
			let errorField;
			let hasNonEmptyRow;
			let firstErrorField = {};
			let validSubformRow = true;
			if(this.getData('cxPropType')==='view'){
				if(this.getData('cruxTableAjaxEditId')){
					errorField = this.validateElements($L(`#subform_${this.getData('subformUniqueId')}_${this.getData('subformId')} .cxSubformValidateField`),store.peekRecord(this.getData('subformId'),this.getData('cruxTableAjaxEditId')),false,firstErrorField,this.getData('cruxTableAjaxEditId'));
					if(this.getMethods("validateSubformRow")) {
						/**
						 * This callback is used to validate elements
						 * @method validateSubformRow
						 * @author gowtham
						 
						 * @param { rowId } rowId - row id that needs to be validated
						 */
						validSubformRow = this.executeMethod("validateSubformRow",this.getData('cruxTableAjaxEditId'));
					}
				}else if(this.getData('aggrTableAjaxEditId')){
					errorField = this.validateAggregate();
					if(errorField){
						firstErrorField.child = errorField;
						firstErrorField.apiName =  errorField.cxProp('field').api_name;
					}
				}
			}else{
				if(this.getData('cxPropValidateEmptyRow')){
					errorField = this.validateElememts($L(`#subform_${this.getData('subformUniqueId')}_${this.getData('subformId')}`)[0].querySelectorAll('.cxSubformValidateField'),undefined,false,firstErrorField);
				}else{
					let content = this.getData('cxPropContent')[this.getData('subformApiName')];
					let allRowElem = $L(`#subform_${this.getData('subformUniqueId')}_${this.getData('subformId')} lyte-tbody lyte-tr`);
					//iterating from reverse since we are removing the elements from array
					for(let idx=allRowElem.length-1;idx>=0;idx--){
						let rowElem = allRowElem[idx];
						if(!this.checkIfRecordIsEmpty(rowElem.id)){
							hasNonEmptyRow = true;
							errorField = this.validateElements(rowElem.querySelectorAll('.cxSubformValidateField'),store.peekRecord(this.getData('subformId'),rowElem.id),false,firstErrorField,rowElem.id);
							if(errorField){
								firstErrorField.rowId = rowElem.id;
								firstErrorField.rowIdx = idx;
								firstErrorField.apiName = errorField.cxProp('field').api_name;
							}
							if(this.getMethods("validateSubformRow")) {
								/**
								 * This callback is used to validate elements
								 * @method validateSubformRow
								 * @author gowtham
								 
								 * @param { rowId } rowId - row id that needs to be validated
								 */
								validSubformRow = this.executeMethod("validateSubformRow",rowElem.id);
							}
						}else{ //no need to remove last empty row
							if(content.length>1){
								let rec = content[idx];
								content.remove(rec);
								rec.$.deleteRecord();
								if(this.getData('cxPropLimitRows')){
									Lyte.arrayUtils(this.data.cruxTableContent, 'removeAt', idx, 1);
								}
							}else if(this.isSubformMandatory){
								let cellElem = rowElem.querySelectorAll('.cxSubformValidateField');
								let cellLen = cellElem.length;
								for(let colIdx=0;colIdx<cellLen;colIdx++){
									let child = cellElem[colIdx].firstElementChild;
									if (child.component && child.component.data.cxPropFrom !== 'view' && child.component.validate && !child.cxProp('disabled')) {
											firstErrorField.focusableField =  {rowIdx:idx,
											rowId: rowElem.id,
											apiName : child.cxProp('field').api_name,
											child : child,
											colIdx : colIdx};
											break;
									}
								}
							}	
						}
					}
	
				}
				if((this.isSubformMandatory && hasNonEmptyRow) || !this.isSubformMandatory){
					let aggrErrorField = this.validateAggregate();
					if(!firstErrorField.rowId && validSubformRow!==false && aggrErrorField){
						errorField = aggrErrorField;
						firstErrorField.child = errorField;
						firstErrorField.apiName =  errorField.cxProp('field').api_name;
					}
				}
			}
			if(!errorField ){
				window.requestAnimationFrame( function(){
					$L( "lyte-table", this.$node ).get( 0 ).scrollTable();
				}.bind( this ) );
			}
			
			if(this.getData('cxPropType')!=='view' && ((this.isSubformMandatory && !hasNonEmptyRow )|| firstErrorField.child)){
				let args;
				if(firstErrorField.child){
					args = {
						cxApiName:firstErrorField.apiName,
						cxErrorNode: firstErrorField.child
					};
					if(firstErrorField.rowId){
						args.cxRowId = firstErrorField.rowId;
					}
				}else if((this.isSubformMandatory && !hasNonEmptyRow )){
					args = {
						cxMandatorySubformError:true,
						cxRowId:firstErrorField.focusableField.rowId,
						cxApiName:firstErrorField.focusableField.apiName,
						cxErrorNode: firstErrorField.focusableField.child
					};
					firstErrorField = firstErrorField.focusableField;
				}
				if(args.cxErrorNode
					&& args.cxErrorNode 
						&& args.cxErrorNode.component
							&& args.cxErrorNode.component.data
							&& args.cxErrorNode.component.data.lyteViewPort){
								args.cxErrorNode.component.setData('lyteViewPort',false);
				}
				if(this.getMethods('onSubformError')){
					this.executeMethod('onSubformError',args);
				}
			}
			if(!this.getData('cxPropPreventFocusOnError') && firstErrorField.child){
					if(firstErrorField.hasOwnProperty('rowIdx') && firstErrorField.hasOwnProperty('colIdx')){
						this.$node.querySelector('crux-table-component').scrollElemIntoView(firstErrorField.rowIdx,firstErrorField.colIdx);
					}
					firstErrorField.child.focus();
			}
			return firstErrorField.child || validSubformRow===false ? false: true;
	},
	/**
	* This function will evaluate aggregate formula fields
	* @utility evaluateAggregateFormula
	* @param {string} apiName - the field for which the value has been changed
	*/
	evaluateAggregateFormula: function(apiName,isAggr){
		this.evaluateFormulaFields(-1,isAggr,apiName);
	},
	/**
	* This function will evaluate module formula.
	* @utility evaluateModuleFormula
	* @param {string} apiName - the field for which the value has been changed
	*/
	evaluateModuleFormula: function (apiName) {	
			var node = this;
			var formulaFields = this.formulaFields;
			var formula;
			var data = this.getData("cxPropContent");
			formulaFields.filter(function (field) {
				return field.moduleFormula;
			}).forEach(function (field) {
				formula = field.formula.expression;
				var apiNames = node.getApiNameFromFormula(formula, ',');
				var regex = new RegExp(apiName, 'g');
				if (regex.test(apiNames)) {
					node.evaluateFormulaExpression(formula, -1, data, field,apiName);
				}
			}) 
	},
	generateDataForFormulaExec: function(formula,conditionExpression,formulaField,apiName,data,isAggr){
		var formulaData = {};
		if(isAggr){
			formulaData.sublbindData = this.getData('cxPropContent')[this.getData('subformApiName')];
			formulaData.apiName = apiName;
			formulaData.userDetails = Crm.userDetails;
			formulaData.fldList = store.modelFor(this.getData('subformId')).fieldList;
			formulaData.aggFld = formulaField;
			formulaData.aggFld.operation = formulaField.formula.expression.substring(0,formulaField.formula.expression.indexOf('('));
			formulaData.componentData = {isdefaultInvSubform:this.getData('isDefaultInvSubform')};
			this.formulaObj = formulaField.formula;
		}else{
			formulaData.fromLyteC = {}
			formulaData.fromLyteC.fldData = {
				decimalPlace:formulaField.decimalLength,
				fieldsInvolved:this.getApiNameFromFormula(formulaField.formula.expression),
				formulaApiname:formulaField.apiName,
				formulaObj:formulaField.formula
			}
			if (this.userDetails.DYNAMIC_FORMULA_ENABLED && formulaField.formula.stop_compute_conditionally){
				formulaData.fromLyteC.fldData["fieldsInvolvedInSCE"] = this.getApiNameFromFormula(formulaField.formula.stop_compute_expression);
				formulaData.stopComputeExpression = conditionExpression;
			}
			this.formulaObj = formulaField.formula;
			formulaData.fromLyteC.sourceRecord = data
			formulaData.fromLyteC.sourcefieldData = apiName?this.getFieldObject(apiName):this.getFieldObject(formulaField.apiName) ? this.getFieldObject(formulaField.apiName) : formulaField;
			// formulaData.from.sourceRecordKeys = {}
			formulaData.toConvert = formula
			formulaData.userDetails = Crm.userDetails;
		}
		return formulaData;
	},
	asyncEvaluateFormula: function (formulaObj,isUtil) {
		var executeFormula = (resolve,reject)=>{
			var formula = formulaObj.formula;
			var response = {};
			this.returnType = formulaObj.formulaField.formula.return_type;
			response.formulaField = formulaObj.formulaField;
			response.rowId = formulaObj.rowId;
			var computeFormulaExpression=true;
			if(isUtil){
				response.value = this.unescapedContent(this.extractContent(this.evaluateFormula(formula, formulaObj.data)));
				return response;
			}
			if (this.userDetails.DYNAMIC_FORMULA_ENABLED && formulaObj.formulaField.formula.stop_compute_conditionally){
				var value = this.unescapedContent(this.extractContent(this.evaluateFormula(formulaObj.data.stopComputeExpression, formulaObj.data)));
				computeFormulaExpression = (value === "false" || value === false);
			}
			if (computeFormulaExpression) {
				response.value = this.unescapedContent(this.extractContent(this.evaluateFormula(formula, formulaObj.data)));
				resolve(response);
			}
			else{
				reject();
			}	
		};
		return isUtil ? executeFormula():
		new Promise(function(resolve,reject){
			executeFormula(resolve,reject);
		}.bind(this));
	
	},
	evaluateFormulaFields: function(rowNo,isAggr,apiName,field){
		var formulaFields = this.formulaFields;
		var content = this.getData("cxPropContent");
		var firstEvaCount = 0,canExeSecEve = false;
		var forExe = false;
		//no need to filter aggregate fields coz formula inside formula field was not getting executed
		// if(field && field.ui_type === 116){
		// 	formulaFields = formulaFields.filter((a)=>!a.aggregateFormula && !a.moduleFormula);
		// }
		var forFields = [],aggFields = [];
		var formulaFld_len = formulaFields.length;
		for(let i=0;i<formulaFld_len;i++){
			if(formulaFields[i].aggregateFormula){
				aggFields.push(formulaFields[i]);
			}
			else {
				if(formulaFields[i].formula.evaluation_order === 1){
					firstEvaCount++;
				}
				forFields.push(formulaFields[i]);
			}
		}
		formulaFields = forFields;
		formulaFields.sort((a,b)=>a.formula.evaluation_order - b.formula.evaluation_order);
		formulaFields.push(...aggFields);
		formulaFld_len = formulaFields.length;
		for (var i = 0; i < formulaFld_len; i++) {
			var formulaField = formulaFields[i];
			var formulaExp = formulaField.formula.expression;
			var formulaStopCompustionExp = "";
			if (this.userDetails.DYNAMIC_FORMULA_ENABLED && formulaField.formula.stop_compute_conditionally){
				formulaStopCompustionExp = formulaField.formula.stop_compute_expression;
			}

			if(apiName && formulaField.operation!=='COUNT'){
				if (rowNo===-1 && !formulaField.moduleFormula) {
					continue;
				}
				var apiNames = this.getApiNameFromFormula(formulaExp + " || " + formulaStopCompustionExp, ',');
				var regex = new RegExp(apiName, 'g');
			var formulaField = formulaFields[i];
			this.isAgg = false; //formula util handling
			if(firstEvaCount-1 === i){
				canExeSecEve = true;
			}
			if (this.checkDepandantFormula(formulaExp,apiName) || (formulaField.criteriaDetails && formulaField.criteriaDetails.fldsUsed.includes(apiName)) || (forExe && canExeSecEve && formulaField.formula.evaluation_order > 1)) {
					if(formulaField.aggregateFormula){
						let fieldRec = this.getFieldObject(apiName);
						if((this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(fieldRec) && !this.checkUnMaskPermission(fieldRec))){
							continue;
						}
						var data = this.generateDataForFormulaExec(undefined,undefined,formulaField,apiNames,undefined,true)
						this.isAgg = true;
						var res = this.evaluateAggregate(data);
						if(res!==this.getData('cxPropContent').$.get(formulaField.apiName)){
							this.getData('cxPropContent').$.set(formulaField.apiName,res);
							if(this.getData('cxPropUnbound')){
								this.$node.querySelector('#'+formulaField.apiName).cxProp('value',res);
							}
							this.valueChangeHandler(this.getFieldObject(formulaField.apiName,true),this.data.cxPropContent,-1,undefined,undefined,res);
						}
					}else{
						forExe = true;
						this.evaluateFormulaExpression(formulaExp, rowNo, content, formulaField,apiName);
					}
				}
			}else{
				if (!isAggr && !(formulaField.aggregateFormula || formulaField.moduleFormula)) { //there is no need for executing aggregate or module formula coz it will triggered on valuechange callback
					var apiNames = this.getApiNameFromFormula(formulaExp);
					if (rowNo) {
						this.evaluateFormulaExpression(formulaExp, rowNo, content, formulaField,apiNames[0]);
					} else {
						for (var k = 0; k < content[this.getData('subformApiName')].length; k++) {//formula fields has to be executed for each row
							forExe = true;
							this.evaluateFormulaExpression(formulaExp, k + 1, content, formulaField,apiNames[0]);
						}
					}
				}
				else {
					if (!formulaField.skip && (formulaField.aggregateFormula || formulaField.moduleFormula)) {  //skip the module formula coz this will be executed during on value change call back
						if(formulaField.aggregateFormula){
							var tempAPIname = this.getApiNameFromFormula(formulaExp)[0];
							let fieldRec = this.getFieldObject(tempAPIname);
							if((this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(fieldRec) && !this.checkUnMaskPermission(fieldRec))){
								continue;
							}
							var data = this.generateDataForFormulaExec(formulaExp,undefined,formulaField,tempAPIname,undefined,true)
							this.isAgg = true; 
							var res = this.evaluateAggregate(data);
							if(res!==this.getData('cxPropContent').$.get(formulaField.apiName)){
								this.getData('cxPropContent').$.set(formulaField.apiName,res);
								if(this.getData('cxPropUnbound')){
									this.$node.querySelector('#'+formulaField.apiName).cxProp('value',res);
								}
								this.valueChangeHandler(this.getFieldObject(formulaField.apiName,true),this.data.cxPropContent,-1,undefined,undefined,res);
							}
							this.getData('cxPropContent').$.set(formulaField.apiName,res);
						}else{
							forExe = true;
							this.evaluateFormulaExpression(formulaExp, -1, content, formulaField);

						}		
					}
				}
			}
		}
	},
	/*
	*/
	checkForAssociatedFields: async function(field,apiName, value,record,componentName,isUtil){
		var associatedFields = this.associatedFields;
		var fieldObj = record.$.model.fieldList[apiName];
		var type = (fieldObj.fieldType==="formula")?fieldObj.type: fieldObj.fieldType;
		let isInvField = this.getData('isDefaultInvSubform') && type==='lookup' && this.handleInventoryCheck('LOOKUP','compare',field);
		if(componentName==='user' && associatedFields[apiName]){
			var filter = associatedFields[apiName].filter(function(obj){ return !value.hasOwnProperty(obj.relatedApiName); }).map(function(obj){ return obj.relatedApiName; });
			if(filter && filter.length>0){
				await store.findRecord('user',value.id,{fields:filter.reduce(function(final,curr){ return final+','+curr; })});
			}
		}else if(isUtil && (associatedFields[apiName] || (isInvField))){
			let field  = this.fieldObject[apiName];
			let filter = associatedFields[apiName].filter(function(obj){ return !value.hasOwnProperty(obj.relatedApiName); }).map(function(obj){ return obj.relatedApiName; });
			if((isInvField || (filter && filter.length>0)) && field && field.lookup && field.lookup.module && field.lookup.module.id){
				if(!store.modelFor(field.lookup.module.id)){
					await this.fetchModuleData(field.lookup.module.id);
				}
				await this.fetchRecord(field.lookup.module.id,value.id).then((data)=>{
							if(data && data.length){
								value = data[0]
							}
						});
			}	
		}
		if(associatedFields[apiName]){
			this.populateFieldOfLookup(apiName,associatedFields,value,record);
		}
		this.executeInventoryFOL(field,record,value,apiName);
	},
	populateFieldOfLookup: function(apiName,associatedFields,value,record){
		var isDefaultInvSubform = this.getData('isDefaultInvSubform');
		let hasFieldWithoutMaskPermission = false;
			var associatedField =associatedFields[apiName];
			for (var i = 0; i < associatedField.length; i++) {
				var field = this.fieldObject[associatedField[i].fieldDetails.api_name];

					if(isDefaultInvSubform && associatedField[i].fieldDetails.column_name==="LINETAX" || (field.read_only && !this.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM)){
						continue;
					}
					var val = (value) ? value[associatedField[i].relatedApiName] : null;
					let relatedField = store.peekRecord('field',associatedField[i].relatedField.id);
					if(val){
						switch(field.data_type){
							case 'textarea':
								val = val.length > field.length ? val.slice(0,field.length) : val;
								break;
								//check if below cases are needed and remove
								case 'date':
									val = Lyte.Transform.date.deserialize(val);
								break;
								case 'datetime':
									val = Lyte.Transform.datetime.deserialize(val);
								break;
								case 'currency':
									var conv=val, content = this.getData('cxPropContent'), recordCurrency ;
									if(value.Currency && content.Currency && value.Currency!==content.Currency){
										recordCurrency =  Crm.userDetails.CURRENCY_DETAILS[content.Currency ];
										conv = isNaN(val / value.Exchange_Rate * recordCurrency.er) ? val : val / value.Exchange_Rate * recordCurrency.er;
									}else if(!value.Currency && content.Currency && Crm.userDetails.BASE_CURRENCY && Crm.userDetails.BASE_CURRENCY!==content.Currency){
										var details = Crm.userDetails.CURRENCY_DETAILS[Crm.userDetails.BASE_CURRENCY ];
										recordCurrency =  Crm.userDetails.CURRENCY_DETAILS[content.Currency ];
										conv = isNaN(val / details.er *  recordCurrency.er) ? val : val / details.er *  recordCurrency.er;
									}
									val = parseFloat(parseFloat(conv).toFixed(field.decimal_place));
								break;
						}
					} 
					if(this.getData('cxPropMaskingEnabled') ? (!this.unMaskCheckNeeded(field) || (this.unMaskCheckNeeded(field) && this.checkUnMaskPermission(field))) && 
						!relatedField || (relatedField && (!this.unMaskCheckNeeded(relatedField) || (this.unMaskCheckNeeded(relatedField) && this.checkUnMaskPermission(relatedField)))) : true){
						record.$.set(associatedField[i].fieldDetails.api_name,val);
					}else{
						if(!this.checkIfFieldIsEmpty(associatedField[i].fieldDetails),val){
							hasFieldWithoutMaskPermission = true;
						}
						record.$.set(associatedField[i].fieldDetails.api_name,undefined);
					}
			}
			if(hasFieldWithoutMaskPermission){
				_cruxUtils.showCustomMessage({
					params:
					{
						"ltPropType": "info",
						"ltPropMessage": _cruxUtils.getI18n('crm.clone.with.masking.noperm.alert'),
						"ltPropDuration": 5000
					}
				});
			}
		
	},
	checkForDependancyFields: function(rowIndex,record,apiName,value){
		if(this.userDetails.isMapDepencySubFormSupported)
		{
			var _this = this;
			if(apiName){
				_this.setPicklistValue(apiName,value,rowIndex,record);
			}
			else
			{
			_this.picklistFields.forEach(function(field){
				_this.setPicklistValue(field,record[field],rowIndex,record);
			})
			}
			
		}
	},
	handleInventoryCheck: function(caseName,caseType,field,record,value,isAggr){
		switch(caseName){
			case 'model':{
				switch(caseType){
					case 'getValue':
						return this.isProductSubform ? moduleRecordMapping.Products.id : 
							moduleRecordMapping.Bundles.id;
				}
			}
			case 'SUBFORM':
				switch(caseType){
					case 'BUNDLE': return this.isBundleSubform;
					case 'PRODUCT': return this.isProductSubform;
				}
			case 'PRICE':
				switch(caseType){
					case 'getValue':
						return this.isProductSubform ? record.Unit_Price : record.Bundle_Price;
				}
			case 'selLookupDetails':
				switch(caseType){
					case 'getValue':
						if(this.isProductSubform){
							return record._LC_additional_INV_subform_INFO && record._LC_additional_INV_subform_INFO.selProdDetails;
						}
						return record._LC_additional_INV_subform_INFO && record._LC_additional_INV_subform_INFO.selbundleDetails;
						
				}
			case 'discount':
				switch(caseType){
					case 'setValue':
						if(this.isProductSubform){
							record._LC_additional_INV_subform_INFO.discountObj = value;
						}else{
							record._LC_additional_INV_subform_INFO.bundleDiscountObj = value;
						}
						break;
					case 'getValue':
							if(this.isProductSubform || !isAggr){
								return record._LC_additional_INV_subform_INFO ? record._LC_additional_INV_subform_INFO.discountObj : undefined;
							}
								return record._LC_additional_INV_subform_INFO.bundleDiscountObj;
				}
				break;
			case 'currentTax':
				switch(caseType){
					case 'setValue':
						if(this.isProductSubform){
							record._LC_additional_INV_subform_INFO.currentTaxDetails = value;
						}else{
							record._LC_additional_INV_subform_INFO.currentBundleTaxDetails = value;
						}
						break;
					case 'getValue':
						if(this.isProductSubform){
							return record._LC_additional_INV_subform_INFO?record._LC_additional_INV_subform_INFO.currentTaxDetails:undefined;
						}
							return record._LC_additional_INV_subform_INFO?record._LC_additional_INV_subform_INFO.currentBundleTaxDetails:undefined;
						
				}
				break;
			case 'CODE':
				switch(caseType){
					case 'compare':
						return field.api_name === 'Product_Code' || field.api_name === 'Bundle_Code';
					case 'getValue':
						return this.isBundleSubform ?record.Bundle_Code : record.Product_Code;
				}
			case 'TAXDISCOUNT':
				return field.column_name==='TAX' || field.column_name==='DISCOUNT' || field.column_name==="BUNDLEDISCOUNT" || field.column_name==="BUNDLETAX";
			case 'TAX':
					switch(caseType){
						case 'compare':
							return field.column_name==='TAX' || field.column_name==="BUNDLETAX" || field.columnName==='TAX' || field.columnName==="BUNDLETAX";
						case 'getValue':
							return (!isAggr || this.isProductSubform) ? record.Tax : record.Bundles_Tax;
						case 'getAPIName':
							return (!isAggr || this.isProductSubform) ? 'Tax' : "Bundles_Tax";
						case 'getField':
							let fieldList = record.$.model.fieldList;
							return (this.isProductSubform || !isAggr) ? fieldList.Tax : fieldList.Bundles_Tax;
					}
			case 'line_tax':
					switch(caseType){
						case 'getValue':
							return isAggr ? this.isProductSubform ? record.$line_tax : record.$bundle_line_tax : record.Line_Tax;
						case 'getAPIName':
							return isAggr ? this.isProductSubform ? '$line_tax' : '$bundle_line_tax' : 'Line_Tax';
					}
			case 'DISCOUNT':
				switch(caseType){
					case 'setValue':
						this.isProductSubform || !isAggr ? record.$.set('Discount',value) :record.$.set('Bundles_Discount',value);
						return;
					case 'compare':
						return field.column_name==='DISCOUNT' || field.column_name==="BUNDLEDISCOUNT" || field.columnName==='DISCOUNT' || field.columnName==="BUNDLEDISCOUNT";
					case 'getField':
						let fieldList = record.$.model.fieldList;
						return (this.isProductSubform || !isAggr) ? fieldList.Discount : fieldList.Bundles_Discount;
					case 'getValue':
						return this.isProductSubform?record.Discount:record.Bundles_Discount;
				}
			case 'LOOKUP':
				switch(caseType){
					case 'getValue':
						return record ? this.isProductSubform ? record.Product_Name : record.Bundle_Name : undefined;
					case 'compare':
						return field.column_name==='PRODUCTID' || field.column_name==="BUNDLEID";
				}
			case 'GRANDTOTAL':
				return field.column_name==="GRANDTOTAL" || field.column_name==="BUNDLEGRANDTOTAL";
			case 'SUBTOTAL':
				switch(caseType){
					case 'getValue':
					return this.isBundleSubform ? record.Bundles_Sub_Total : record.Sub_Total;
					case 'compare':
					return field.column_name==="SUBTOTAL" || field.column_name==="BUNDLESUBTOTAL";
				}
		}
	},
	getFieldId: function(fieldApiName,rowNo){
		var subformApiName = this.getData('subformApiName');
		return `#${subformApiName}_${fieldApiName}_${rowNo}`;
	},
	setPicklistValue: function(apiName,value,rowIndex,record){
		var _this = this;
		var currentLayout  = this.getData('cxPropLayout');
		var picklistvaluesWithMaps = (currentLayout ? _this.fieldObject[apiName][currentLayout] : _this.fieldObject[apiName]).pick_list_values;
		value = !value ? '-None-':value;
		var pickListMaps =  picklistvaluesWithMaps.find(function(mapValue){return mapValue.display_value===value});
		if(pickListMaps && pickListMaps.maps){
			var dependancyMaps = pickListMaps.maps ;
			dependancyMaps.filter(function(map){
				return _this.fieldObject[map.api_name] && !_this.fieldObject[map.api_name].read_only;
			}).forEach(function(map){
				var field = _this.fieldObject[map.api_name];
				var newPicklistValues = map.pick_list_values;
				if(!newPicklistValues || newPicklistValues.length==0){
					newPicklistValues =field.pick_list_values;
				}
				_this.clientScriptFunction('setValue',`subformRow.${record.id}.${map.api_name}.pickListValues`,newPicklistValues);
				// $L(_this.getFieldId(map.api_name,rowIndex))[0].cxProp('picklistValues',newPicklistValues)
				if(field.cxType==='single'){
					if(!newPicklistValues.find(function(newValue){return newValue.display_value===record[map.api_name]})){
						let newValue = _this.formatValueForRecord(field,record,undefined,newPicklistValues[0].display_value);
						record.$.set(map.api_name,newValue);
						//triggering map dependancy coz there can be depedancy based on the field updated(for record update on value change won't be triggered)
						_this.checkForDependancyFields(rowIndex,record,map.api_name,record[map.api_name],newValue);
					}
				}else if(record[map.api_name]){
					var val = record[map.api_name].split('; ');
					var newVal = [];	
					val.filter(function(option){ return newPicklistValues.find(function(newValue){return newValue.display_value===option})}).forEach(function(option){
						newVal.push(option)
					})
					record.$.set(map.api_name, _this.formatValueForRecord(field,record,undefined,newVal))
				}				
			})
		}

	},
	showHideLoadingDiv: function(show){
		if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(show);
		}
	},
	// setPicklistValue: function(apiName,componentName,type,row){
	// 	if(componentName==="picklist" && type==="single" && row && !row.$.get(apiName)){
	// 		row.$.set(apiName,"-None-");
	// 	}
	// },
	scrollToTop: function(speed){
		var container = $L(this.data.cxPropScrollQuery);
		var containerTop = container[0].getBoundingClientRect().top;
		var subformTop = this.lyteTable[0].getBoundingClientRect().top;
		var newScrollTop = (container[0].scrollTop + 2) - ((containerTop - subformTop));
		container.animate({
			scrollTop: newScrollTop
		}, speed);
	},
	setValueForPicklist: function (recordId) {
		var record = store.peekRecord(this.getData('subformId'),recordId);
		this.picklistFields.forEach(function (field) {
			if (record[field]=="-None-") {
				var obj = {id:recordId};
				obj[field]='';
				store.pushPayload(this.data.subformId,obj);
			}
		},this)
	},
	clearFilter: function(element,event){
		this.filterApplied = false;
		this.rollbackAjaxActions();
		if (this.getMethods('clearFilter')) {
			/**
			 * This callback is fired when clear button is clicked in lookup filter
			 * @method clearFilter
			 * @author gowtham
			 
			 * @param { component } element - lookup filter instance
			 * @param { event } event - the event that triggered clear
			 */
			this.handleCallback(this.executeMethod('clearFilter', element, event),function(data){
				this.handleCallbackResponse.call(this,data);
			}.bind(this));
		}
	},
	handleSubformScroll: function () {
		var headerQuery = this.getData("cxPropHeaderQuery");
		var subFormDiv = this.$node.querySelector('lyte-table');
		var tableHead = this.lyteTableHead[0];
		this.subFormDiv = subFormDiv;
		this.tableHead = tableHead;
		// this.headerQueryBottom = headerQueryBottom;
		this.headerQuery = headerQuery;
		this.handleScrollBind = this.handleScroll.bind(this);
		if (this.data.cxPropScrollQuery) {
			$L(this.data.cxPropScrollQuery === 'window' ? window : this.data.cxPropScrollQuery).on('scroll', this.handleScrollBind)
		}
	},
	handleScroll: function (event) {

		var subFormDiv = this.subFormDiv;
		var tableHead = this.tableHead;
		var headerQueryHeight = this.headerQuery === 'body' ? 0 : $L(this.headerQuery).outerHeight();
		var headerQueryOffset = this.headerQuery === 'body' ? 0 : $L(this.headerQuery).offset().top;
		var headerQueryBottom = headerQueryHeight + headerQueryOffset;
		// var headerQueryBottom = this.headerQueryBottom;
		var subformRect = subFormDiv.getBoundingClientRect();
		var subformTop = subformRect.top;
		var headHeight = tableHead.offsetHeight;
		var subformHeight = $L(this.subFormDiv.querySelector('lyte-tbody'))[0].offsetHeight + headHeight;//subFormDiv.offsetHeight;
		var threshold = headerQueryBottom - (subformHeight - headHeight); //used to change the head position to relative
		//when whole table to scrolled above the head
		if (subformTop < headerQueryBottom && subformTop > threshold) {
			subFormDiv.style.paddingTop = headHeight + 'px';
			tableHead.style.top = headerQueryBottom + 'px';
			if(this.getData('cxPropShowFilterIcon')){
				var cxTableFilterIcons = $L('.cxTableFilterIcons', this.$node);
				if(cxTableFilterIcons[0]){
					var filterIconLeft = cxTableFilterIcons[0].getBoundingClientRect().left;
					// var filterIconsOffsetWidth = cxTableFilterIcons[0].offsetWidth;
					cxTableFilterIcons.removeClass('cxTableHeaderIcons').addClass('cxTableHeaderIconsFixed');
						cxTableFilterIcons.css({
							top: headerQueryBottom + 'px',
							left: filterIconLeft + 'px'
						})
				}
			}
			tableHead.classList.add("cxSubformTheadFixed");
			this.isHeaderFixed = true;
			var rowHeight = $L('.tablecomponent2 lyte-tr',this.$node).height()
			if (subformTop + rowHeight < headerQueryBottom) {
				this.setData('showScrollToTop', true)
			}
			else {
				this.setData('showScrollToTop', false)
			}
		}
		else if (this.isHeaderFixed) {

			tableHead.classList.remove("cxSubformTheadFixed");
			this.resetTransform();
			var filterIcon = $L('.cxTableFilterIcons', this.$node);
			if(filterIcon[0]){
				filterIcon.removeClass('cxTableHeaderIconsFixed');
				filterIcon.addClass('cxTableHeaderIcons');
				filterIcon.css({ 'left': '', 'top': '' });
			}
			
			subFormDiv.style.paddingTop = '0px'
			this.isHeaderFixed = false;

			this.setData('showScrollToTop', false);

		}
		this.handleTableXScroll();
		$L.debounce(function(){
		var tableScroll = this.lyteTable[0];
		tableScroll.scrollTable();
		}.bind(this),Lyte.Component.viewPortSettings.debounce+10)();
	},
	resetTransform: function () {
		if(this.getData('cxPropShowFilterIcon') && this.getData('cruxTableShowFilter')){
			this.$node.querySelector('crux-lookupfilter-component').style.transform = "none";
		}
		this.$node.querySelector('#headerRow').style.transform = "none";
	},
	//functions for inventory module
	setDiscountTaxTootlipValue: function(dBind,curntFld,originElem){
		var tooltipVal = '';
		// if(this.data.parentSubformdata.isdefaultInvSubform && !this.data.isInvSysReadOnly){
		if(this.getData('isDefaultInvSubform')){
			var curnt_sub_apiName = this.getData('subformApiName');
			if(this.data.iscpqVerifyDetailsSubform){ //CRMCODE:
				curnt_sub_apiName = this.data.parentSubformdata.cpq_subform_apiname;
			}
			var lookupVal = this.handleInventoryCheck('LOOKUP','getValue',undefined,dBind), errObj = dBind.$?dBind.$.error:null, isValidInvLookupAvailable = false;
			if(errObj && this.handleInventoryCheck('LOOKUP','getValue',undefined,errObj) && this.handleInventoryCheck('LOOKUP','getValue',undefined,errObj).code==='ERR02'){				
				isValidInvLookupAvailable = false;
			}else if(lookupVal && lookupVal.name && lookupVal.id){
				isValidInvLookupAvailable = true;
			}
			if(curntFld.column_name	=== "TAX"){
					if(!isValidInvLookupAvailable){
						return;
					}
					var hoverCard = $L('#invPopoverhoverCard',this.$node)[0];//No I18n
					if(hoverCard){
						hoverCard.ltProp( { 'originElem' : originElem, 'show' : true });//No I18n
						var hovercardtaxArr;
						if(dBind && dBind._LC_additional_INV_subform_INFO && dBind._LC_additional_INV_subform_INFO.currentTaxDetails){
							var arr = dBind._LC_additional_INV_subform_INFO.currentTaxDetails.selectedTaxArr;
							if(arr && arr.length){
								let taxArr = [];
								arr.forEach(function(taxObj){
									if(taxObj.isTaxConsidered){
										var _taxObj = {};
										_taxObj.name = taxObj.taxLabel; _taxObj.percentValue = taxObj.taxPercent;
										taxArr.push(_taxObj);
									}
								});
								hovercardtaxArr = taxArr;
							}
						}
						Lyte.objectUtils( this.getData('cxPropSection') , "add" , "selectedTaxArrForHoverCard" , hovercardtaxArr );//No I18n
					}
				
				return;
			}else if(curntFld.column_name	=== "DISCOUNT"){
				if(isValidInvLookupAvailable){
					var totAftrDisc =  dBind.Total_After_Discount
					totAftrDisc = totAftrDisc ? totAftrDisc : 0;
					totAftrDisc = isNaN(totAftrDisc) ? 0 : totAftrDisc;
					
					tooltipVal += _cruxUtils.getI18n("TotalAfterDiscount") + " : ";
					// var currencyData = moduleData && moduleData.currencyData; 
					// if(currencyData && currencyData.symbol){
					// 	tooltipVal += currencyData.symbol;
					// }
					var numProps = this.getData('cxPropNumberProperties');
					totAftrDisc = this.getNumberValueForView(totAftrDisc, "currency", numProps && numProps.isoCode ? numProps.isoCode : dBind.Currency, curntFld.ui_type, numProps && numProps.currencyDetails ? numProps.currencyDetails :this.userDetails.CURRENCY_DETAILS,curntFld.hasOwnProperty('decimal_place')?curntFld.decimal_place:numProps && numProps.defaultRoundOff ? numProps.defaultRoundOff: this.userDetails.defaultRoundOff ? this.userDetails.defaultRoundOff : 2, numProps && numProps.currencyCode ?numProps.currencyCode : this.userDetails.BASE_CURRENCY,numProps && numProps.exchangeRate ?numProps.exchangeRate:undefined,numProps && numProps.exchangeRateFinance ?numProps.exchangeRateFinance:undefined,numProps && numProps.homeCurrency ?numProps.homeCurrency:undefined,true,numProps && numProps.formattedCurrency ?numProps.formattedCurrency:undefined,curntFld.separator,numProps && numProps.defaultOrgCurrency? numProps.defaultOrgCurrency: this.userDetails.defaultOrgCurrency);//No I18n
					tooltipVal += " " + totAftrDisc;
				}
			}
		}
			this.setData('discountTaxTooltipValue',tooltipVal);
			
	},
	setInvLookupTootlipValue: function(dBind,curntFld,originElem){
		// var moduleData = this.data.cxPropModuleData; //CRMCODE:
		if(this.getData('isDefaultInvSubform') && !this.isInvLookupDropdownOpened && this.handleInventoryCheck('LOOKUP','compare',curntFld)){
					var lookupVal = this.handleInventoryCheck('LOOKUP','getValue',undefined,dBind), errObj = dBind.$?dBind.$.error:null, isValidInvLookupAvailable = false;
					if(errObj && this.handleInventoryCheck('LOOKUP','getValue',undefined,errObj) && this.handleInventoryCheck('LOOKUP','getValue',undefined,errObj).code==='ERR02'){				
						isValidInvLookupAvailable = false;
					}else if(lookupVal && lookupVal.name && lookupVal.id){
						isValidInvLookupAvailable = true;
					}
						var curnt_sub_apiName = this.getData('subformApiName');
						if(this.data.iscpqVerifyDetailsSubform){//CRMCODE:
							curnt_sub_apiName = this.data.parentSubformdata.cpq_subform_apiname;
						}
						var hoverCard = $L('#invPopoverLookuphoverCard',this.$node)[0];
						if(hoverCard){
							var hovercardProdArr = [];
							var productCode, qtyInStock, _unitPrice,noOfUniqueProd,bundleCode;
							if(this.handleInventoryCheck('selLookupDetails','getValue',curntFld,dBind)){
								var curntLookupDetails =this.handleInventoryCheck('selLookupDetails','getValue',curntFld,dBind);
								curntLookupDetails = curntLookupDetails || {};
								_unitPrice = this.handleInventoryCheck('PRICE','getValue',curntFld,curntLookupDetails);
								var exRate = 1, recordCurISOCode, currencySymbol;
								//CRMCODE:
								//var currencyData = moduleData && moduleData.currencyData;
								
								recordCurISOCode = this.getCurrencyCode();
								currencySymbol = this.getCurrencySymbol();
								
								if(!isNaN(_unitPrice) && _unitPrice !== null && String(curntLookupDetails.Unit_Price).length > 0){
									var _baseCurIsoCode = Crm.userDetails.BASE_CURRENCY;
									if(recordCurISOCode && _baseCurIsoCode && recordCurISOCode !== _baseCurIsoCode){
										exRate = ( Crm.userDetails.CURRENCY_DETAILS[recordCurISOCode]) ? Crm.userDetails.CURRENCY_DETAILS[recordCurISOCode].er : Crm.userDetails.CURRENCY_DETAILS[_baseCurIsoCode].er;
									}
									_unitPrice = _unitPrice * exRate;
									_unitPrice = isNaN(_unitPrice) ? 0 : _unitPrice;
									_unitPrice = this.getRoundOffValue(_unitPrice,true);
								}else{
									_unitPrice = 0;
								}
								_unitPrice = (currencySymbol || "") + ' ' + _unitPrice;
								if(this.isProductSubform){
									qtyInStock = isNaN(curntLookupDetails.Qty_in_Stock) || curntLookupDetails.Qty_in_Stock.length === 0 ? '-' : curntLookupDetails.Qty_in_Stock;
									productCode = curntLookupDetails.Product_Code === null ? '-' : curntLookupDetails.Product_Code;
								}else{
									bundleCode = curntLookupDetails.Bundle_Code === null ? '-' : curntLookupDetails.Bundle_Code;
									noOfUniqueProd = isNaN(curntLookupDetails.Unique_Item_Count) || curntLookupDetails.Unique_Item_Count.length === 0 ? '-' : curntLookupDetails.Unique_Item_Count;
								}
							
							}
							if(this.isProductSubform){
								productCode = productCode || '-';
								var productCodeLabel = _cruxUtils.getI18n('crm.label.Product Code'),
								quantityInStockLabel = _cruxUtils.getI18n('Qty in Stock'),
								unitPriceLabel = _cruxUtils.getI18n('Unit Price');
								if(moduleRecordMapping.Products){
									var productModel = store.modelFor(moduleRecordMapping.Products.id);
									if(productModel && productModel.fieldList){
										if(productModel.fieldList.Product_Code){
											var prCode = productModel.fieldList.Product_Code;
											if(prCode.columnName === "PRODUCTCODE" && prCode.fieldID){//No I18n
												var prdCodeFld = store.peekRecord('field', prCode.fieldID);//No I18n
												if(prdCodeFld && prdCodeFld.field_label){
													productCodeLabel = prdCodeFld.field_label;
												}
											}
										}
										if(productModel.fieldList.Qty_in_Stock){
											let fieldId = productModel.fieldList.Qty_in_Stock.fieldID;
											if(fieldId){
												let qtyField = store.peekRecord('field', fieldId);
												if(qtyField && qtyField.field_label){
													quantityInStockLabel = qtyField.field_label;
												}
												if(this.unMaskCheckNeeded(qtyField) && !this.checkUnMaskPermission(qtyField)){
													qtyInStock = this.getCruxMaskValue(qtyInStock,qtyField.mask_details,true);
												}
											}
										}
										if(productModel.fieldList.Unit_Price){
											let fieldId = productModel.fieldList.Unit_Price.fieldID;
											if(fieldId){
												let unitField = store.peekRecord('field', fieldId);
												if(unitField && unitField.field_label){
													unitPriceLabel = unitField.field_label;
												} 
												if(this.unMaskCheckNeeded(unitField) && !this.checkUnMaskPermission(unitField)){
													_unitPrice = this.getCruxMaskValue(_unitPrice,unitField.mask_details,true);
												}
											}
										}
									}
								}
								hovercardProdArr.push( { label : productCodeLabel, id : "prdCode", value : productCode } );//No I18n
								hovercardProdArr.push( { label : quantityInStockLabel, id : "qtyInStk", value : qtyInStock } );//No I18n
								hovercardProdArr.push( { label : unitPriceLabel, id : "unitPrice", value : _unitPrice } );//No I18n
							}else{
								hovercardProdArr.push( { label : _cruxUtils.getI18n('Bundle Code',_cruxUtils.getI18n('Bundle')), id : "bundleCode", value : bundleCode } );//No I18n
								hovercardProdArr.push( { label : _cruxUtils.getI18n('Total Number Of Unique Products',_cruxUtils.getI18n('Products')), id : "noOfUniqueProd", value : noOfUniqueProd } );//No I18n
								hovercardProdArr.push( { label : _cruxUtils.getI18n('Bundle Price',_cruxUtils.getI18n('Bundle')), id : "bundlePrice", value : _unitPrice } );//No I18n
							}
							this.setData('invLookupHoverCardArr',hovercardProdArr);
							hoverCard.ltProp( { 'originElem' :originElem, 'show' : isValidInvLookupAvailable});//No I18n
						}
		}
	},
	setTaxValueForCrux: function(taxobj,field,dBind,isAggr){

		if(!taxobj){
			return;
		}
		var aggr = isAggr || this.isInvAggr;
		var selectedTaxArr = taxobj.selectedTaxArr;
		var slLen = selectedTaxArr.length || 0, isTaxErr, totalTaxAmount  = 0;
		var _taxFldMeta = taxobj.taxFieldMeta || field, line_TaxArr = [];
		let discountPerm = true,disFieldId = this.handleInventoryCheck('DISCOUNT','getField',field,dBind,undefined,isAggr).fieldID;
		let disField = store.peekRecord('field',disFieldId);
		if(this.getData('cxPropMaskingEnabled') && this.unMaskCheckNeeded(disField) && !this.checkUnMaskPermission(disField)){
			discountPerm = false;
		}
		// if(slLen){
			for(var i=0; i < slLen; i++){
				var taxObj = selectedTaxArr[i], taxamnt = 0;
				if(taxObj.isTaxConsidered && (isNaN(taxObj.taxPercent) || taxObj.taxPercent > 100 || isNaN(parseFloat(taxObj.taxPercent)))){
					isTaxErr = true;
					Lyte.objectUtils( taxObj, "add", "displayTaxError", true);//NO I18N
				}else if(taxObj.isTaxConsidered){
					Lyte.objectUtils( taxObj, "add", "displayTaxError", false);//NO I18N
//					var subTot = dBind.List_Price * dBind.Quantity;
					var subTot = aggr?this.handleInventoryCheck('SUBTOTAL','getValue',undefined,dBind):dBind.Total;
					subTot = isNaN(subTot) ? 0 : subTot;
					if(discountPerm){
						var newDiscAmt = aggr?this.handleInventoryCheck('DISCOUNT','getValue',undefined,dBind):dBind.Discount;
						if(dBind.$ && dBind.$.error && dBind.$.error.Discount){
							if(dBind.$.error.Discount.value || dBind.$.error.Discount.value === 0 && !isNaN(dBind.$.error.Discount.value)){
								newDiscAmt = dBind.$.error.Discount.value;
							}
						}
						var discVal = newDiscAmt;discVal = isNaN(discVal) ? 0 : discVal;
						var totAftDisc = parseFloat(subTot) - parseFloat(discVal);
						var taxamnt = totAftDisc * taxObj.taxPercent / 100;
						taxamnt = isNaN(taxamnt) ? 0 : taxamnt;
					}
//					taxamnt = this.getRoundOff(_taxFldMeta, taxamnt);// commented for ZCRM-192474
					var newObj = { name : taxObj.taxLabel, percentage : Number(taxObj.taxPercent), value : taxObj.taxAmt };
					if(taxObj.taxId){
						newObj.id = taxObj.taxId;
					}
					line_TaxArr.push(newObj);
				}
				totalTaxAmount += isNaN(taxamnt) ? 0 : taxamnt;
			}
			if(isTaxErr){
				return true;
			}
			var custom_roundOffData = {};
			totalTaxAmount = this.getRoundOff(_taxFldMeta, totalTaxAmount, custom_roundOffData);
			totalTaxAmount = !isNaN(totalTaxAmount) ? Number(totalTaxAmount) : totalTaxAmount;
			// var componenData = this.data;
			// var curnt_sub_apiName = componenData.parentSubformdata.subform_apiname;
			// if(componenData.iscpqVerifyDetailsSubform){
			// 	curnt_sub_apiName = componenData.parentSubformdata.cpq_subform_apiname;
			// }
			// var _tem = 'crm-create-subformfields#' + componenData.moduleName + '_' + curnt_sub_apiName + '_' + 'R' + (componenData.indexVal + 1) + '_Tax';//no i18n
			// var _temInp = _tem + ' lyte-input';//no i18n
			// var taxNode = $L(_temInp)[0];
			// if(taxNode){
			// 	taxNode.ltProp('value', totalTaxAmount);//no i18n	
			// }

			if(aggr){
				if(this.isProductSubform){
					if(discountPerm){
						dBind.$.set('Tax', totalTaxAmount);//no i18n
					}
					dBind.$.set('$line_tax', line_TaxArr);//no i18n
				}else{
					if(discountPerm){
						dBind.$.set('Bundles_Tax', totalTaxAmount);//no i18n
					}
					dBind.$.set('$bundle_line_tax', line_TaxArr);//no i18n
				}
			}else{
				if(discountPerm){
					dBind.$.set('Tax', totalTaxAmount);//no i18n
				}
				dBind.$.set('Line_Tax', line_TaxArr);
			}//no i18n
			// if(taxobj && taxobj.skipFormulaUpdate){
			// 	return;
			// }
			// var taxSubNode = $L(_tem)[0];
			// if(taxSubNode){
			// 	taxSubNode.component.triggerFormulaCalcWrapper();
			// }
		// }
	
	},
	setDiscountValue: function(disObj,discFldMeta,dBind){
		if(!disObj){
			return;
		}
		var disDetails = disObj.discountObj;
		if(disDetails){
			var curnt_sub_apiName = this.getData('subformApiName');
			if(this.data.iscpqVerifyDetailsSubform){ //CRMCODE:
				curnt_sub_apiName = this.data.parentSubformdata.cpq_subform_apiname;
			}
			var finalDisAmount = 0, showDirectPriceError = false, showPerError = false;
			var custom_roundOffData = {};
			if(disDetails.chkdinvDisPercent){
				var selDisPercent = disDetails.disPercentValue;
//				var selDisPercent = disDetails.fullDisPercentValue || disDetails.disPercentValue;
				selDisPercent = isNaN(selDisPercent) || !selDisPercent ? 0 : selDisPercent;
				selDisPercent = parseFloat(selDisPercent);
				var total = this.isInvAggr?this.handleInventoryCheck('SUBTOTAL','getValue',undefined,dBind):dBind.Total; //TODO
				var amnt = isNaN(total) ? 0 : total;
				finalDisAmount = amnt * selDisPercent / 100;
				finalDisAmount = this.getRoundOff(discFldMeta, finalDisAmount, custom_roundOffData);
			}else if(disDetails.chkdinvDirectPrice){
				var selDirectPrice = disDetails.directPriceReductionVal;
//				selDirectPrice = isNaN(selDirectPrice) ? 0 : selDirectPrice;//ZCRM-191487
				selDirectPrice = parseFloat(selDirectPrice);
				if(isNaN(selDirectPrice)){
					showDirectPriceError = true;
				}
				selDirectPrice = this.getRoundOff(discFldMeta, selDirectPrice, custom_roundOffData);
				finalDisAmount = selDirectPrice;
			}
			Lyte.objectUtils( disDetails, "add", "showPerError", showPerError);//NO I18N
			Lyte.objectUtils( disDetails, "add", "showDirectPriceError", showDirectPriceError);//NO I18N
			if(showPerError || showDirectPriceError){
				return true;
			}
			finalDisAmount = !isNaN(finalDisAmount) ? Number(finalDisAmount) : finalDisAmount;
			dBind.$.set(discFldMeta.api_name,finalDisAmount);
			// dBind.$.set('Discount', finalDisAmount);//no i18n
						//CRMCODE:
			// var _disSubFld = $L(_tem)[0];
			// if(_disSubFld){
			// 	_disSubFld.component.triggerFormulaCalcWrapper();
			// }
		}
	
	},
	updateAdditionalInvData: function(dat){
			//set data required for grandTaxDiscount popup in edit/clone model
			var addInfo = dat._LC_additional_INV_subform_INFO || {}, discountObj = {};
			var discAmt = dat.Discount;
			discAmt = parseFloat( !discAmt || isNaN(discAmt) ? 0 : discAmt );
			var amt = dat.Sub_Total;
			amt = parseFloat(!amt || isNaN(amt) ? 0 : amt);
			var discPc = 0;
			if(amt !== 0){
				var fullDis_percent_val = discAmt / amt * 100;
				discountObj.fullDis_percent_val = fullDis_percent_val;
				discPc = this.getRoundOffValue(fullDis_percent_val, true);
				/*
				var ncustom_roundOffData = {};
				var nsubformModelflds = dat.$ && dat.$.model.fieldList;
				if(nsubformModelflds && nsubformModelflds.Discount && nsubformModelflds.Discount.columnName === "DISCOUNT" && nsubformModelflds.Discount.fieldID){
					var grandDisFldMeta = store.peekRecord('field', nsubformModelflds.Discount.fieldID);//NO I18N
					if(grandDisFldMeta){
						ncustom_roundOffData.isGrandField = true;
						discPc = this.getRoundOff(grandDisFldMeta, fullDis_percent_val, ncustom_roundOffData);
					}
				}
				*/
			}else{
				discPc = isNaN(discPc) ? 0 : discPc;
			}
			discountObj.disPercentValue = discPc;discountObj.chkdinvDisPercent = true;
			if(!this.data.iscpqVerifyDetailsSubform){
				if(!this.isBundleSubform){
					addInfo.discountObj = discountObj;
				}else{
					addInfo.bundleDiscountObj = discountObj;
				}
			}
			var taxArr = { selectedTaxArr : this.getGrandTaxArrayDetails({ entityRecord : dat, taxDetails : this.data.cxPropModuleData.orgTaxDetails }) };
			var _prevSelectedTax = this.isProductSubform ? dat.$line_tax : this.isBundleSubform ? dat.$bundle_line_tax : [];
			taxArr.selectedTaxArr.forEach(function(eachTaxObj){
				var currentTaxPerc = eachTaxObj.taxPercent;
				currentTaxPerc = typeof currentTaxPerc === "string" ? currentTaxPerc.trim() : currentTaxPerc;//NO I18N
				currentTaxPerc = !isNaN(currentTaxPerc) ? Number(currentTaxPerc) : currentTaxPerc;
				var exactTaxObj = _prevSelectedTax.filter(function(eTax){
					var _compareTax = eTax.percentage;
					_compareTax = typeof _compareTax === "string" ? _compareTax.trim() : _compareTax;//NO I18N
					_compareTax = !isNaN(_compareTax) ? Number(_compareTax) : _compareTax;
					return eTax.name === eachTaxObj.taxLabel && _compareTax ===  currentTaxPerc  || (eachTaxObj.taxId && eTax.id && eachTaxObj.taxId === eTax.id);
				})[0];
				if(exactTaxObj){
					eachTaxObj.isTaxConsidered = true;
				}
			});
			if(!this.isBundleSubform){
				addInfo.currentTaxDetails = taxArr;
			}else{
				addInfo.currentBundleTaxDetails = taxArr;
			}
			Lyte.objectUtils(dat, "add", "_LC_additional_INV_subform_INFO", addInfo);//no i18n
			//CRMCODE:
			// this.setData('invPopoverhoverCard', this.data.apiName + 'invPopoverhoverCard');//no i18n
			// this.setData('invPopoverProducthoverCard', this.data.apiName + 'invPopoverProducthoverCard');//no i18n
			if(!dat.hasOwnProperty('Tax')){
				dat.$.set('Tax', 0);//no i18n
			}
			if(!dat.hasOwnProperty('Discount')){
				dat.$.set('Discount', 0);//no i18n
			}
	},
	fetchAndUpdateTaxDetails: function (apiName, productRecord, record) {
		var fieldObject = this.fieldObject;
		var field = fieldObject[apiName];
		var _this = this;
				if(record.invPopoverdata){
					var discountObj = {};
					discountObj.chkdinvDisPercent = true;
					Lyte.objectUtils(record.invPopoverdata, "add", "discountObj", discountObj);//no i18n
				}
				delete record.Line_Tax;
				var nobj = record._LC_additional_INV_subform_INFO;
				if(productRecord && productRecord.hasOwnProperty('Tax') && !Array.isArray(productRecord.Tax)){
					productRecord.Tax =productRecord.__original ? productRecord.__original.Tax : (productRecord._$ && productRecord._$.original ? productRecord._$.original.Tax : []) ;;
				}
				if(this.isBundleSubform){
					nobj.selbundleDetails = productRecord;
				}else{
					nobj.selProdDetails = productRecord;
				}
				var taxArr = { selectedTaxArr : (this.isBundleSubform? this.getUpdatedTaxValueForBundles(nobj, record) : this.getUpdatedTaxValue(nobj, record))};

				var isTaxAvailable=productRecord ? (productRecord.$taxable!=undefined ? productRecord.$taxable : (productRecord.Taxable !=undefined ? productRecord.Taxable : false )) : false;
				if(isTaxAvailable && Crm.userDetails.autoPopulateTax){
					taxArr.selectedTaxArr.forEach(function(eachTaxObj){
						eachTaxObj.isTaxConsidered = true;
					});
				}
				nobj.currentTaxDetails = taxArr;
				var invFlds = record.$.model.fieldList;
					if (invFlds && invFlds.Tax) {
						var taxFld = invFlds.Tax;
						if (taxFld.columnName === "TAX") {
							var taxField = store.peekRecord('field', taxFld.fieldID);//no i18n
							if (taxField && taxArr && taxArr.selectedTaxArr) {
								_this.setTaxValueForCrux({ 'selectedTaxArr': taxArr.selectedTaxArr, 'skipFormulaUpdate': true, 'taxFieldMeta': taxField },field,record);//No I18n
							} else if (taxField) {
								record.$.set('Line_Tax', []);//no i18n
							}
						}
					}
					Lyte.objectUtils(record, "add", "_LC_additional_INV_subform_INFO", nobj);//no i18n
				
		
		
	},
	isInvisibileFldinModule : function(dataObj){
		if(dataObj.fldMeta && (!dataObj.fldMeta.visible || !dataObj.fldMeta.view_type[dataObj.curntView])){
			return true;
		}
		return false;
	},
	updateInvDiscountAndTaxValues: function(field,dBind,isAggr){
		var componenData = this.data;
		var invFlds = dBind.$.model.fieldList;
		var addInfo = dBind._LC_additional_INV_subform_INFO || {};
		var finalDiscount, skipDiscountSet;
		let discountPerm = true,taxPerm = true;
		if(isAggr && this.getData('cxPropMaskingEnabled')){
			let disFieldId = this.handleInventoryCheck('DISCOUNT','getField',field,dBind,undefined,isAggr).fieldID;
			let disField = store.peekRecord('field',disFieldId);
			if(this.unMaskCheckNeeded(disField) && !this.checkUnMaskPermission(disField)){
				discountPerm = false;
			}
			let taxFieldId = this.handleInventoryCheck('TAX','getField',field,dBind,undefined,isAggr).fieldID;
			let taxField = store.peekRecord('field',taxFieldId);
			if(this.unMaskCheckNeeded(taxField) && !this.checkUnMaskPermission(taxField)){
				taxPerm = false;
			}
		}
		if(!isAggr || (isAggr && discountPerm)){
			if(!isAggr && addInfo.discountValueSource === "priceBook"){
				if(!addInfo.priceBookRecord){
					addInfo.priceBookRecord = store.peekRecord(moduleRecordMapping.PriceBooks.id,dBind.$.get('Price_Book_Name').id);
				}
				finalDiscount = this.getPriceBookDiscount({ pbRecord : addInfo.priceBookRecord, discountObj : addInfo.discountObj },dBind);
			}else if(this.handleInventoryCheck('discount','getValue',field,dBind,undefined,isAggr)){
				var dObj = this.handleInventoryCheck('discount','getValue',field,dBind,undefined,isAggr);
				if(dObj.chkdinvDisPercent){
					finalDiscount = dObj.disPercentValue;
	//				finalDiscount = dObj.fullDisPercentValue || dObj.disPercentValue;
	//				var subTot = dBind.List_Price * dBind.Quantity;
					var subTot = (isAggr)? this.handleInventoryCheck('SUBTOTAL','getValue',field,dBind):dBind.Total;
					subTot = isNaN(subTot) ? 0 : subTot;
					subTot = parseFloat(subTot);
					finalDiscount = isNaN(finalDiscount) ? 0 : finalDiscount;
					finalDiscount = parseFloat(finalDiscount);
					finalDiscount = subTot * finalDiscount / 100;
				}else if(dObj.chkdinvDirectPrice){
					skipDiscountSet  = true;
				}
			}
			finalDiscount = parseFloat(!finalDiscount || isNaN(finalDiscount) ? 0 : finalDiscount);
			if(!skipDiscountSet && invFlds && this.handleInventoryCheck('DISCOUNT','getField',undefined,dBind,undefined,isAggr)){
				var disFlds = this.handleInventoryCheck('DISCOUNT','getField',undefined,dBind);
				if(this.handleInventoryCheck('DISCOUNT','compare',disFlds)){
					var discountField = store.peekRecord('field', disFlds.fieldID);//no i18n
					if(discountField){
						var domDis = this.getRoundOff(discountField, finalDiscount);
						domDis = !isNaN(domDis) ? Number(domDis) : domDis;
						this.handleInventoryCheck('DISCOUNT','setValue',undefined,dBind,domDis,isAggr);
						var curnt_sub_apiName = componenData.subformApiName;
						if(componenData.iscpqVerifyDetailsSubform){
							curnt_sub_apiName = componenData.parentSubformdata.cpq_subform_apiname;
						}
						if(this.getData('cxPropUnbound')){
							this.updateAggregateValue([discountField.api_name]);
						}
						// var _tem = 'crm-create-subformfields#' + componenData.moduleName + '_' + curnt_sub_apiName + '_' + 'R' + (componenData.indexVal + 1) + '_Discount'; //no i18n
						// var _temInp = _tem + ' lyte-input';//no i18n
						// var discNode = $L(_temInp)[0];
						// if(discNode){
						// 	discNode.ltProp('value', domDis);//no i18n
						// }
						// var _disSubFld = $L(_tem)[0];
						// if(_disSubFld){
						// 	_disSubFld.component.triggerFormulaCalcWrapper();
						// }
					}
				}
			}
		}
		if(!isAggr || (isAggr && discountPerm && taxPerm)){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
			let skipTaxSet = (isAggr ? dBind.$status && dBind.$status.includes("_10") 
						: dBind.__parent_module__ && dBind.__parent_module__.$status && dBind.__parent_module__.$status.includes("_10"))
							&& dBind.hasOwnProperty(this.handleInventoryCheck('TAX','getAPIName',undefined,undefined,undefined,isAggr)) 
								&& dBind.hasOwnProperty(this.handleInventoryCheck('line_tax','getAPIName',undefined,undefined,undefined,isAggr)) 
									&& this.handleInventoryCheck('TAX','getValue',undefined,dBind,undefined,isAggr)!==0;
			let lineTax = this.handleInventoryCheck('line_tax','getValue',undefined,dBind,undefined,isAggr);
			skipTaxSet = skipTaxSet && lineTax && lineTax.length===0;
			if(!skipTaxSet && invFlds && this.handleInventoryCheck('TAX','getField',undefined,dBind,undefined,isAggr)){
				var _taxFld = this.handleInventoryCheck('TAX','getField',undefined,dBind,undefined,isAggr);
				if(this.handleInventoryCheck('TAX','compare',_taxFld)){
					var _taxField = store.peekRecord('field', _taxFld.fieldID);//no i18n
					if(_taxField){
						var taxArr = isAggr ? this.handleInventoryCheck('currentTax','getValue',field,dBind) : (this.isProductSubform ? this.getUpdatedTaxValue(addInfo,dBind): this.getUpdatedTaxValueForBundles(addInfo, dBind));
						if(taxArr && isAggr?taxArr.selectedTaxArr.length : taxArr.length){
							var newTaxArr = isAggr ?  taxArr.selectedTaxArr :  taxArr;
							this.setTaxValueForCrux({ 'selectedTaxArr' : newTaxArr, 'taxFieldMeta' : _taxField },field,dBind,isAggr);//No I18n
						}else if(!dBind.hasOwnProperty('Tax')){//No I18n
							//ZCRM-204534 - Tax value not set during initial render issue
							dBind.$.set('Tax', 0);
							// var _tem = 'crm-create-subformfields#' + componenData.moduleName + '_' + componenData.parentSubformdata.subform_apiname + '_' + 'R' + (componenData.indexVal + 1) + '_Tax';//no i18n
							// var _temInp = _tem + ' lyte-input';//no i18n
							// var taxNode = $L(_temInp)[0];
							// if(taxNode){
							// 	taxNode.ltProp('value', 0);//no i18n
							// }
						}
						if(this.getData('cxPropUnbound')){
							this.updateAggregateValue([_taxField.api_name]);
						}
					}
				}
			}
		}
	},
	checkSysInvFldVisiblity : function(invFlds, curntView){
		var skipValueSetIfHidden;
		if(!invFlds.List_Price || !invFlds.Quantity){
			skipValueSetIfHidden = true;
		}
		if(!skipValueSetIfHidden){
			["Quantity","List_Price"].forEach(function(fld){//no i18n
				var inv_fld = store.peekRecord('field', invFlds[fld].fieldID);//no i18n
				if(inv_fld){
					var inv_flag = this.isInvisibileFldinModule({ fldMeta : inv_fld, curntView : curntView === "edit" ? "edit" : "create" });//No I18n
					if(inv_flag){
						skipValueSetIfHidden = true;
					}
				}else{
					skipValueSetIfHidden = true;
				}
			}.bind(this));
		}
		return skipValueSetIfHidden;
	},
	onInventoryPopoverSelect: function (field,record,callbackObj) {
		var triggerRequest = false;
		var previousTaxDetails;
		if (!callbackObj) {
			return;
		}
		this.isInvAggr = field.subform;
		var discountDetails = callbackObj.discountObj, isErrorPresent, taxDetails = callbackObj.currentTaxDetails;
		if (discountDetails) {
			isErrorPresent = this.setDiscountValue({ discountObj: discountDetails },field,record);
			if (isErrorPresent === true) {
				return true;
			}
			if (!taxDetails || !taxDetails.selectedTaxArr) {
				this.setData('dataBind',this.getData('cxPropContent'))
				
				//CRMCODE: check if updateInvTaxBasedOnDiscount can be moved to mixin
				// Lyte.registeredMixins['crm-create-mixin'].updateGrandInvTaxBasedOnGrandDiscount.call(this);
				if(this.isInvAggr){
					previousTaxDetails = this.handleInventoryCheck('line_tax','getValue',undefined,record,undefined,this.isInvAggr);
				}
				this.updateInvTaxBasedOnDiscount(field,record,this.isInvAggr);
				if(this.isInvAggr){
					var taxChanged = !$u.isEqual(previousTaxDetails,this.handleInventoryCheck('line_tax','getValue',undefined,record,undefined,this.isInvAggr),false);
					if(taxChanged || record.$.getDirtyAttributes().includes(this.handleInventoryCheck('TAX','getAPIName',undefined,undefined,undefined,this.isInvAggr))){
						triggerRequest = true;
					}
				}
			}
		}
		if (taxDetails && taxDetails.selectedTaxArr) {
			//CRMCODE: check if updateInvTaxBasedOnDiscount can be moved to mixin
			// this.setGrandTaxValue = Lyte.registeredMixins['crm-create-mixin'].setGrandTaxValue.bind(this);
			if(this.isInvAggr){
				previousTaxDetails = this.handleInventoryCheck('line_tax','getValue',undefined,record,undefined,this.isInvAggr);
			}
			isErrorPresent = this.setTaxValueForCrux({ 'selectedTaxArr': taxDetails.selectedTaxArr },field,record);//No I18n
			if(this.isInvAggr){
				taxChanged = !$u.isEqual(previousTaxDetails,this.handleInventoryCheck('line_tax','getValue',undefined,record,undefined,this.isInvAggr),false);
				if(taxChanged){
					triggerRequest = true;
				}
			}
			
		}
		if (isErrorPresent === true) {
			return true;
		}
		if(this.isInvAggr){
				//need to get the
				this.valueChangeHandler(field, record, -1, undefined, undefined, record[field.api_name]);
				this.aggrEditedField = field;
				this.setData('disableAjaxEdit',false);
				setTimeout(()=>{ this.saveAggrTaxAndDiscount(field); },10);
				// if(triggerRequest){
				// 	setTimeout(()=>{this.saveAggrTaxAndDiscount(field);},10);
				// }else{
				// 	let node = this.$node.querySelector('crm-create-inventory-popup');
				// 	if(node){
				// 		node.setData(field.column_name === "TAX"?'showTaxpopup':'showDiscountpopup',false);
				// 	}
				// }
		}	
		
		//CRMCODE:
		// //evaluateFormulaExpression exec
		// var moduleFormulafields = this.getData('moduleFormulafields');//no i18n
		// var len = moduleFormulafields && moduleFormulafields.length ? moduleFormulafields.length : 0;
		// if(len){
		// 	var createObj = this.getData('dataBind');//no i18n
		// 	this.evaluateFormulaExpressionExecution(moduleFormulafields,{},createObj,undefined,true);
		// }
	},
	updateInvTaxBasedOnDiscount: function(field,dBind,isAggr){

		var componenData = this.data;
		var addInfo = dBind._LC_additional_INV_subform_INFO || {};
		var invFlds = dBind.$.model.fieldList;
		let skipTaxSet = (isAggr ? dBind.$status && dBind.$status.includes("_10") 
						: dBind.__parent_module__ && dBind.__parent_module__.$status && dBind.__parent_module__.$status.includes("_10"))
							&& dBind.hasOwnProperty(this.handleInventoryCheck('TAX','getAPIName',undefined,undefined,undefined,isAggr)) 
								&& dBind.hasOwnProperty(this.handleInventoryCheck('line_tax','getAPIName',undefined,undefined,undefined,isAggr)) 
									&& this.handleInventoryCheck('TAX','getValue',undefined,dBind,undefined,isAggr)!==0;
		let lineTax = this.handleInventoryCheck('line_tax','getValue',undefined,dBind,undefined,isAggr);
		skipTaxSet = skipTaxSet && lineTax && lineTax.length===0;
		if(!skipTaxSet && invFlds && this.handleInventoryCheck('TAX','getField',undefined,dBind,undefined,isAggr)){
			var taxFld = invFlds.Tax;
			if(taxFld.columnName === "TAX"){
				var taxField = store.peekRecord('field', taxFld.fieldID);//no i18n
				if(taxField){
					if(this.isInvAggr){
						var taxDetails = addInfo.currentTaxDetails;
						if(taxDetails && taxDetails.selectedTaxArr){
							this.setTaxValueForCrux({ 'selectedTaxArr' : taxDetails.selectedTaxArr , 'taxFieldMeta' : taxField},field,dBind);//No I18n
						}else{
							dBind.$.set('Tax', 0);//no i18n
						}
					}
					else
					{
					//CRMCODE:
					var taxArr =this.isBundleSubform? this.getUpdatedTaxValueForBundles(addInfo,dBind) : this.getUpdatedTaxValue(addInfo,dBind);
					if(taxArr && taxArr.length){
						this.setTaxValueForCrux({ 'selectedTaxArr' : taxArr, 'skipFormulaUpdate' : true, 'taxFieldMeta' : taxField },field,dBind);//No I18n
					}

					}
				}
			}
		}
	
	},
	getPriceBookDiscount : function(pbObj,_subDataBind){
		var rec = pbObj.pbRecord;
		if(!rec && ['clone','edit'].includes(this.data.initRoute) && moduleRecordMapping.PriceBooks && _subDataBind.Price_Book_Name){ //ZCRM-192305 - Case in bug Comment
			var peekedPBRecord = store.peekRecord(moduleRecordMapping.PriceBooks.id, _subDataBind.Price_Book_Name.id);
			if(peekedPBRecord){
				rec = pbObj.pbRecord = peekedPBRecord;
			}
		}
		if(!rec){
			if(pbObj.discountObj && pbObj.discountObj.disPercentValue){//ZCRM-192305
				var _discount = isNaN(pbObj.discountObj.disPercentValue) ? 0 : Number(pbObj.discountObj.disPercentValue);
//				var _recordTotal = _subDataBind.List_Price * _subDataBind.Quantity;
				var _recordTotal = _subDataBind.Total;
				var discountPrice =  _recordTotal * (_discount / 100);
				return isNaN(discountPrice) ? 0 : discountPrice;
			}
			return;
		}
		var pricingRange = rec.Pricing_Details, pricingModel = rec.Pricing_Model, listPrice = _subDataBind.List_Price,quantity = _subDataBind.Quantity;
		if(moduleRecordMapping.PriceBooks && moduleRecordMapping.PriceBooks.fields){
			var pbFields = moduleRecordMapping.PriceBooks.fields || [];
			var prcmodelFld = pbFields.filter(function(f){ return f.column_name === "PRICINGMODEL" })[0];//NO I18N
			if(prcmodelFld && prcmodelFld.pick_list_values){
				var model_plVals = prcmodelFld.pick_list_values || [];
				var plOption = model_plVals.filter(function(f){ return f.display_value === pricingModel })[0];
				if(plOption && plOption.actual_value){
					pricingModel = plOption.actual_value;
				}
			}
		}
		var leastFromRange = 1.7976931348623157e+308;
		var prevToRange = 0, prevFlatDiscountPrice = 0, prevDiffDiscountPrice = 0;
		var lastDiscount = 0, tempPrice = 0, tempQty = quantity, lastDiffDiscount = 0, lastFlatDiscount = 0;
		var amount = 0, size = pricingRange.length;
//		var recordTotal = _subDataBind.List_Price * _subDataBind.Quantity;
		var recordTotal = _subDataBind.Total;
		pricingRange.forEach(function(pricing,index){
			var currPos = index+1 ;
			var fromRange = Number(pricing.from_range);
			var toRange = Number(pricing.to_range);
			var discount = Number(pricing.discount);
			var diff = ((toRange - fromRange) + 1);
			var discountPrice =  recordTotal * (discount / 100);
			if(fromRange < leastFromRange){
				leastFromRange = fromRange;
				tempQty = tempQty - (fromRange - 1);
			}
			if(pricingModel === 'Flat'){//NO I18N
				if(quantity >= fromRange && quantity <= toRange){
					tempPrice = discountPrice;
					lastFlatDiscount = discount;
				}else if(quantity > prevToRange && quantity < fromRange){
					tempPrice = prevFlatDiscountPrice;
					lastFlatDiscount = discount;
				}else if(size === currPos && quantity > toRange){
					tempPrice = discountPrice;
					lastFlatDiscount = discount;
				}
			}else if(pricingModel === 'Differential'){//NO I18N
				if(quantity >= fromRange && quantity <= toRange){
					var btwnDiff = fromRange - prevToRange - 1;
					if(btwnDiff > 0){
						amount = _subDataBind.List_Price * btwnDiff;
						tempPrice = prevDiffDiscountPrice + (amount * (lastDiscount/100));
						diff = quantity - fromRange + 1;
						amount = _subDataBind.List_Price * diff;
						tempPrice = tempPrice + (listPrice * diff * (discount/100));
					}else{
						amount = _subDataBind.List_Price * tempQty;
						tempPrice = prevDiffDiscountPrice + (amount * (discount/100));
					}
					lastDiscount = discount;
				}else if(quantity > prevToRange && quantity < fromRange){
					amount = _subDataBind.List_Price * tempQty;
					tempPrice = prevDiffDiscountPrice + (amount * (lastDiscount/100));
				}else if(quantity > toRange){
					tempQty = tempQty - diff;
					amount = _subDataBind.List_Price * diff;
					tempPrice = prevDiffDiscountPrice + (amount * (discount/100));
					if(size === currPos){
						var btwnDiff = fromRange-prevToRange-1;
						if(btwnDiff > 0){
							amount = _subDataBind.List_Price * btwnDiff;
							tempPrice = tempPrice + (amount * (lastDiscount/100));
							diff = tempQty - btwnDiff;
							amount = _subDataBind.List_Price * diff;
							tempPrice = tempPrice + (amount * (discount/100));
						}else{
							amount = _subDataBind.List_Price * tempQty;
							tempPrice = tempPrice + (amount * (discount/100));
						}
					}
					lastDiscount = discount;
				}
			}
			prevToRange = toRange;
			prevFlatDiscountPrice = discountPrice;
			prevDiffDiscountPrice = tempPrice;
		});
		lastDiffDiscount = lastDiscount;
		if(!_subDataBind._LC_additional_INV_subform_INFO){
			_subDataBind._LC_additional_INV_subform_INFO = {};
		}
		if(typeof _subDataBind._LC_additional_INV_subform_INFO === "object"){
			var existingObj = _subDataBind._LC_additional_INV_subform_INFO;
			if(pricingModel === "Flat"){
				existingObj.lastFlatDiscount = lastFlatDiscount;
				delete existingObj.lastDiffDiscount;
			}else if(pricingModel === "Differential"){//no i18n
				existingObj.lastDiffDiscount = lastDiffDiscount;
				delete existingObj.lastFlatDiscount;
			}
			Lyte.objectUtils(_subDataBind ,"add", "_LC_additional_INV_subform_INFO", existingObj);//no i18n
		}
		return tempPrice;
	},
	saveAggrTaxAndDiscount: function(field){
		field = !field?this.aggrEditedField:field;
		if(this.isInvAggr){
			var content = this.getData('cxPropContent');
			var _this = this;
			this.isInvAggr = false;
			var executeAggrSave = function(){
				this.setData('disableAjaxEdit',true)
				var saveFunc,customData=Object.assign({}, this.customData);
					var dirtyAttr = content.$.getDirtyAttributes();
					if(this.getData('cxPropSaveCustomRequest') && this.getMethods('onAjaxSave')){
						saveFunc = this.executeMethod('onAjaxSave',field.id,customData);
					}else{
						this.showHideLoadingDiv(true);
						saveFunc = content.$.save(this.createCustomData(customData,true),this.getData('cxPropQueryParams'))
					}	
					if(content && content.invPopoverdata && content.invPopoverdata.discountObj){
						delete content.invPopoverdata.discountObj.directPriceReductionVal;
						delete content.invPopoverdata.discountObj.disPercentValue;
					}
					saveFunc.then(function(resp){
					if(_this.getData('cxPropUnbound')){
						_this.updateAggregateValue(dirtyAttr);
						Lyte.triggerEvent('cxSubformUpdated',{cxSubformId:_this.data.subformId,subformUniqueId:_this.data.subformUniqueId,action:'edit',data:dirtyAttr});
					}
					_this.showHideLoadingDiv();
					_this.setData('disableAjaxEdit',false);
					if(_this.getMethods('onAfterAjaxSave')){
						
						/**
						 * @method onAfterAjaxSave
						 * @author gowtham
						 
						 * @param { * } resp
						 */
						_this.executeMethod('onAfterAjaxSave',resp);
					}
				},function(resp){
					_this.setData('disableAjaxEdit',false);
					_this.handleServerErrorResponse(resp);
					content.$.rollBack();
					_this.handleInventoryCheck('currentTax','setValue',undefined,content,_this.prevTaxDetails);
					_this.showHideLoadingDiv();
				});
			}.bind(this)
			if(_this.getMethods('onBeforeAjaxSave')){
				var resp = _this.executeMethod('onBeforeAjaxSave',content,$L('#'+field.api_name,this.$node)[0]);
				if(resp instanceof Promise){
					resp.then(function(){
						executeAggrSave();
					},function(){//eslint-disable-line no-empty-function
							
						})
				}
				else if(resp!=false){
					executeAggrSave();
				}
			}
			else{
				executeAggrSave();
			}			
		}
	}

},{mixins:["crux-formula-utils","crux-element-validation","crm-create-mixin"]});
Lyte.Component.registerHelper("getProductValue", function(record,field){//No I18n
	var value = record[field.api_name];
	if(value && this.component.showLookupCode){
		value =  {id:value.id,name: this.component.handleInventoryCheck('CODE','getValue',undefined,value) ? value.name + ' ('+this.component.handleInventoryCheck('CODE','getValue',undefined,value)+')' :  value.name};
	}
	return value;
});
Lyte.Component.registerHelper("unboundForSubform", function(content,apiName){//No I18n
	return content[apiName];
});
Lyte.Component.registerHelper("parseValueForSubform", function(value,field){//No I18n
	var ajaxEdit = this.getData('cxPropAjaxEdit');
	if(this.component.handleInventoryCheck('LOOKUP','compare',field) && !field.custom_field && this.getData('isDefaultInvSubform') && value && this.component.showLookupCode){
		let code = this.component.handleInventoryCheck('CODE','getValue',field,value);
		return {id:value.id,name: code ? value.name + ' ('+code+')' :  value.name};
	}
	if(ajaxEdit && value && field.cxTypeMapping==="picklist" && field.cxType==="multisearch"){
		value = value.split('; ');
	}
	if(!value && field.cxTypeMapping==="picklist" && field.cxType==="single")
	{
		value = '-None-';
	}
	return value;
});

Lyte.Component.registerHelper("formatNumberForPriceBookPopover", function(value){//No I18n
	//range and discout can have only two decimal places
	return value.toFixed(2);
});
Lyte.Component.registerHelper("getUnboundValue", function(val, obj, apiName, isUnbound) {
	if(isUnbound) {
		if(!obj.hasOwnProperty(apiName)) {
			obj[apiName] = val;
		}
		val = obj[apiName];
	}
	return val;
});
Lyte.Component.registerHelper("inventorySubform", function(caseName,caseType,field) {
	return this.component.handleInventoryCheck(caseName,caseType,field);
});
Lyte.Component.registerHelper("getSubformFieldData", function (prop, field, recordObj, clientData, cxPropDisableEdit, rowDisabled, fieldDisabled, cellDisabled, disableCreate, type,taxDisIcon) {
	switch (prop) {
		case 'disabled':
		case 'tooltip':
			let isParentPicklist = (recordObj.$ && !recordObj.$.isNew && field.cxTypeMapping==='picklist' && this.component.parentPicklist && this.component.parentPicklist.find(e=>e.api_name === field.api_name));
			let disabledField = rowDisabled || fieldDisabled || cellDisabled
				|| ((!taxDisIcon && field.disabled) || field.read_only);
			var propDisabled = (recordObj.$ && !recordObj.$.isNew && cxPropDisableEdit)
				|| (type === 'create' && disableCreate && recordObj.$ && recordObj.$.isNew)
				|| isParentPicklist;
			return prop === 'disabled' ? (disabledField || propDisabled) : field.column_name === "DISCOUNT" ? 
										this.component.data.discountTaxTooltipValue : 
										(disabledField) && !(field.data_type === 'formula')
										? _cruxUtils.getI18n('crm.lable.read.only') : '';
	}
});
Lyte.Component.registerHelper("getAggrFieldData", function (prop, field, fieldDisabled,masked,type,ajaxedit) {
	switch (prop) {
		case 'disabled':
		case 'tooltip':
			var isDisabled = fieldDisabled
				|| (field.read_only);
			let isMasked = (type==="view" && ajaxedit && masked);
			return prop === 'disabled' ? (isDisabled || isMasked) : ( isDisabled && field.data_type !== 'formula' ? _cruxUtils.getI18n('crm.lable.read.only') : '');
	}
});

Lyte.Component.registerHelper("cruxStringify", function(json) {
	return JSON.stringify(json);
});
Lyte.Component.registerHelper("isCurrencySymbolNeeded", function(modData,field,type) {
		var bool = modData && modData.module_name!=='Products' && modData.module_name!=='Bundles'
			&& (type!=='view' || (!field.subform && !field.associated_module));
		if (bool && (field.data_type === "currency" || ((field.ui_type === 117 || field.ui_type === 116) && field.formula.return_type === "currency"))) {
			return true;
		}
});


/**
 * @syntax nonYielded
<crux-subform></crux-subform>
 */
