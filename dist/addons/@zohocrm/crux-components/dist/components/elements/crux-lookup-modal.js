//$Id$
/**
 * @component crux-lookup-modal
 * @author anuja.manoharan
 * @version 1.0.0
 * Rendered internally from crux-lookup-component if advance search is not enabled.
 */
Lyte.Component.register("crux-lookup-modal", {
_template:"<template tag-name=\"crux-lookup-modal\"> <template is=\"if\" value=\"{{cxPropOldFlow}}\"><template case=\"true\"> <lyte-modal id=\"modalElem\" lt-prop-wrapper-class=\"cxLookupModal cxLookupModalOld cxBoxModal {{cxPropWrapperClass}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-offset=\"{&quot;top&quot; : &quot;0&quot;, &quot;left&quot; : &quot;center&quot;}\" lt-prop=\"{&quot;allowMultiple&quot; : &quot;true&quot;, &quot;width&quot; : &quot;80%&quot;, &quot;left&quot; : &quot;5%&quot;}\" on-before-close=\"{{method('closeModal')}}\" on-before-show=\"{{method('beforeOpenModal')}}\" on-show=\"{{method('onShowFn')}}\" on-close=\"{{method('onModalCloseFn')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"cxLookupModalHeader\"> <template is=\"if\" value=\"{{expHandlers(cxPropHeader,'!')}}\"><template case=\"true\">{{cruxGetI18n('crm.lookup.chooserecord',module.singular_label)}}</template><template case=\"false\">{{cxPropHeader}}</template></template> </lyte-modal-header> <lyte-modal-content class=\"cxLookupModalContent\"> <div class=\"cxLookupModalbuttonLayer cxLookupModalContBtnLayer\"> <template is=\"if\" value=\"{{cxPropRelatedId}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropDontShowRelatedDropdown}}\"><template case=\"true\"> <div class=\"cxLookupModalRelIdName\"><span>{{headerOptions[0].name}}</span></div> </template><template case=\"false\"> <div class=\"cxLookupModalRelatedDDWrap\"> <span>{{cruxGetI18n(\"crm.button.mass.show\")}}</span> <crux-dropdown cx-prop-options=\"{{headerOptions}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"id\" cx-prop-selected=\"{{lbind(selectedHeaderValue)}}\" on-option-select=\"{{method('setHeaderOption')}}\" class=\"cxLookupModalRelIdDropdown\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownClose')}}\"></crux-dropdown></div> </template></template> </template></template> <template is=\"if\" value=\"{{negate(cxPropDisableSearch)}}\"><template case=\"true\"><lyte-input class=\"cxBoxInput cxLookupSearch cxBoxLeftPosSearch\" lt-prop-id=\"filterbox\" data-zcqa=\"lookupSearch\" lt-prop-appearance=\"box\" lt-prop-type=\"search\" lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" onkeyup=\"{{action('removableSearchSetValue', event,, this)}}\" after-render=\"{{method('associateSearchClickFn')}}\"></lyte-input></template></template> <lyte-yield yield-name=\"contentHeaderYield\" class=\"cxMlAuto\"></lyte-yield> <template is=\"if\" value=\"{{cxPropCreateYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"createYield\" class=\"cxMlAuto\"></lyte-yield> </template></template> </div> <template is=\"if\" value=\"{{cxPropFilterComponent}}\"><template case=\"true\"><span class=\"cxFlexCenter advanceFilter cxLookupFilterViewAdvanceFilterIcon\" data-zcqa=\"lookupAdvanceFilterIcon\" lt-prop-title=\"{{if(cxPropShowFilter,cruxGetI18n('crm.button.clear.filter'),cruxGetI18n('crm.button.show.filter'))}}\" onclick=\"{{action('filterAction',this)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"></span></template></template> <crux-table-component cx-prop-hide-header-on-no-content=\"{{cxPropHideHeaderOnNoContent}}\" class=\"modalCruxtable cxTable lyteOuterTable entityLookupTable\" cx-prop-column-cell-class=\"lookupCriteriaLabelWrap1\" cx-prop-header=\"{{header}}\" cx-prop-row-zcqa=\"detailView\" cx-prop-content=\"{{record}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-sort-columns=\"{{cxPropSortColumns}}\" cx-prop-no-records-message=\"{{if(cxPropNoRecordsMessage,cxPropNoRecordsMessage,cruxGetI18n('crm.module.empty.message',module.plural_label))}}\" on-sort=\"{{action('sort')}}\" cx-prop-sorted-column=\"{{sortedColumn}}\" cx-prop-sorted-order=\"{{queryParamObject.sort_order}}\" cx-prop-enable-body-scroll=\"false\" cx-prop-field-type-mapping=\"{{fieldMapping}}\" cx-prop-header-yield=\"{{headerYields}}\" cx-prop-show-tooltip=\"false\" cx-prop-no-content-class=\"noresultstyle\" cx-prop-module=\"{{moduleName}}\" cx-prop-selected-rows=\"{{cxPropDisabledList}}\" cx-prop-filter-component=\"{{cxPropFilterComponent}}\" cx-prop-show-filter=\"{{cxPropShowFilter}}\" cx-prop-filter-button=\"{{cxPropFilterButton}}\" cx-prop-comparator=\"{{cxPropComparator}}\" cx-prop-selected-row-class=\"cxLookupDisableRow\" cx-prop-enable-field-sort=\"{{cxPropEnableFieldSort}}\" cx-prop-header-properties=\"{{cxPropHeaderProperties}}\" cx-prop-date-properties=\"{{cxPropDateProperties}}\" cx-prop-datetime-properties=\"{{cxPropDatetimeProperties}}\" cx-prop-number-properties=\"{{cxPropNumberProperties}}\"> <template is=\"yield\" yield-name=\"header-prefix-1\"></template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <lyte-radiobutton lt-prop-type=\"primary\" lt-prop-name=\"record\" lt-prop-value=\"{{recordObj.id}}\" lt-prop-checked=\"{{ifEquals(recordObj.id,selectedSingle)}}\" on-checked=\"{{method('selectSingle',recordObj.id)}}\" onclick=\"{{action('radioButtonClicked',recordObj.id)}}\"></lyte-radiobutton> </template> <template is=\"yield\" yield-name=\"body-aTag\"> <template is=\"if\" value=\"{{recordObj[fieldObj.api_name]}}\"><template case=\"true\"> <link-to data-zcqa=\"{{recordObj[fieldObj.api_name]}}\" lt-prop-class=\"link\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{moduleName}}&quot;, &quot;{{recordObj.id}}&quot;]\" onclick=\"{{action(&quot;selectSingle&quot;,recordObj.id,this,event)}}\"><template is=\"if\" value=\"{{recordObj[fieldObj.api_name].name}}\"><template case=\"true\">{{recordObj[fieldObj.api_name].name}}</template><template case=\"false\">{{recordObj[fieldObj.api_name]}}</template></template></link-to> </template></template> </template> <template is=\"yield\" yield-name=\"body-phone\"> {{if(maskToggle,cruxMaskValue(recordObj[fieldObj.api_name],fieldObj.mask_details,'',true),recordObj[fieldObj.api_name])}} </template> <template is=\"yield\" yield-name=\"body-lookup\">{{recordObj[fieldObj.api_name].name}}</template> </crux-table-component> </lyte-modal-content> <lyte-modal-footer class=\"cxLookupModalFooter\" data-zcqa=\"mxnfooter\"> <div class=\"cxLookupModalbuttonLayer\"> <template is=\"if\" value=\"{{expHandlers(lookupSingle,'&amp;&amp;',expHandlers(cxPropFooterYield,'!'))}}\"><template case=\"true\"> <div class=\"cxSelectedSingle\"> {{cruxGetI18n(\"crm.record.selected\",module.singular_label)}}: {{lookupSingle}} </div> </template></template> <template is=\"if\" value=\"{{expHandlers(record.length,'||',cxPropShowNavigator)}}\"><template case=\"true\"> <div class=\"cxMlAuto\" data-zcqa=\"mxnnavigationlookup\"> <lyte-navigator id=\"navigator\" lt-prop-more-records=\"true\" lt-prop-show-only-icon=\"{{cxPropShowOnlyIcon}}\" lt-prop-value=\"0\" lt-prop-perpage=\"{{cxPropPerPage}}\" on-next=\"{{method('renderNext')}}\" on-previous=\"{{method('renderPrev')}}\" lt-prop-middle-text=\"{{cxPropModalMiddleText}}\"></lyte-navigator> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropFooterButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"footerButtonYield\"></lyte-yield> </template></template> </lyte-modal-footer> </template> </lyte-modal> </template><template case=\"false\"> <lyte-modal id=\"modalElem\" lt-prop-wrapper-class=\"cxLookupModalNew {{cxPropWrapperClass}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-show-close-button=\"{{if(cruxAnd(cxPropShowCloseButton,ifEquals(cxPropType,'single')),true,false)}}\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromRight&quot; , &quot;duration&quot; : &quot;0.5&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;}\" lt-prop-allow-multiple=\"true\" lt-prop-height=\"100%\" lt-prop-width=\"calc(100% - 200px)\" on-before-close=\"{{method('beforeCloseModal')}}\" on-before-show=\"{{method('beforeOpenModal')}}\" lt-prop=\"{{stringify(cxPropModalProperty)}}\" on-close=\"{{method('onModalCloseFn')}}\" on-show=\"{{method('onShowFn')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"cxLookupModalHeader {{if(ifEquals(currentModalPage,'selected'),'cxSelTableLookupModalHeader','')}}\"> <div class=\"cxLookupModalTopWrapper\"> <div class=\"cxLookupModalTopLeft\"> <template is=\"if\" value=\"{{cruxAnd(ifEquals(currentModalPage,'selected'),negate(showEmptySelectPage))}}\"><template case=\"true\"><span class=\"cxMMLModalSelTableBackIcon\" onclick=\"{{action('backToList')}}\"></span></template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropEnableFilter,negate(showMultiModuleTable),negate(showEmptySelectPage))}}\"><template case=\"true\"><span data-zcqa=\"lv_filterStatus\" class=\"cxFilterIconWrap {{if(disableFieldsEdit,'disabledEdit','')}} {{if(isFilterActive,'cxLookupModFilterActiveIcon','')}}\" onclick=\"{{action('showHideFilter')}}\"> <i class=\"cxFilterIcon cxSprite\"></i> </span></template></template> <div class=\"cxHeaderLabel\" data-zcqa=\"assignPageTitle\"> <template is=\"if\" value=\"{{cxPropHeader}}\"><template case=\"true\"><div id=\"\">{{unescape(cxPropHeader)}}</div></template><template id=\"\" case=\"false\"> <template is=\"if\" value=\"{{ifNotEquals(cxPropType,'multi_module_multi_select')}}\"><template case=\"true\"><template id=\"\" value=\"{{currentModalPage}}\" is=\"switch\">     <template id=\"\" case=\"singleList\">{{cruxGetI18n('crm.lookup.chooserecord',module.singular_label)}}</template><template id=\"\" case=\"multiList\">{{cruxGetI18n('crm.mxnlookup.select',module.plural_label)}}</template><template id=\"\" case=\"selected\">{{cruxGetI18n('crm.mxnLookup.confirmHeader',module.plural_label,cxPropAssigneeModuleName)}}</template><template page=\"unassign\" id=\"\" default=\"\">{{cruxGetI18n('crm.mxnlookup.selected',module.plural_label)}}</template></template></template><template case=\"false\"><template value=\"{{currentModalPage}}\" is=\"switch\">   <template id=\"\" case=\"multiList\">{{cruxGetI18n('crm.button.add.module',cxPropHeaderSuffix)}}</template><template id=\"\" default=\"\">{{cruxGetI18n('crm.record.selected',cxPropHeaderSuffix)}}</template></template></template></template> </template></template> </div> <template is=\"if\" value=\"{{cruxAnd(ifEquals(cxPropType,'multi_module_multi_select'),negate(showEmptySelectPage))}}\"><template case=\"true\"> <crux-dropdown cx-prop-options=\"{{cxPropModuleOptions}}\" cx-prop-selected=\"{{lbind(selectedModuleValue)}}\" cx-prop-user-value=\"plural_label\" cx-prop-system-value=\"id\" on-option-select=\"{{method('onModuleSelect')}}\" class=\"cxLookupModalModuleDD\"></crux-dropdown> <template is=\"if\" value=\"{{cruxAnd(cxPropEnableCustomview,negate(disableFieldsEdit),ifEquals(currentModalPage,'multiList'),cruxAnd(module,module.id))}}\"><template case=\"true\"> <crux-customview-dropdown cx-prop-customview-category=\"{{cxPropCustomViewCategory}}\" cx-prop-selected=\"{{currentcv.id}}\" cx-prop-module=\"{{module.api_name}}\" cx-prop-button-class=\"{{buttonClass}}\" cx-prop-class=\"cxLookupModalCustomView {{class}}\" on-customview-select=\"{{method('onSelectCV')}}\" cx-prop-no-result=\"{{cruxGetI18n('crm.label.nomatching.views')}}\" cx-prop-callback-delay=\"3000\" cx-prop-zcqa=\"lookupModalSelectedOption\" cx-prop-tabindex=\"{{tabIndex}}\" on-before-show=\"{{method('onBeforeShowCVDropdown')}}\"> </crux-customview-dropdown> </template></template> </template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropRelatedId,cruxOr(ifEquals(currentModalPage,'singleList'),ifEquals(currentModalPage,'multiList')))}}\"><template id=\"\" case=\"true\"> {{addMurhyInfo(\"crux-lookup-modal.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{cxPropDontShowRelatedDropdown}}\"><template case=\"true\"><div class=\"cxLookupModalRelIdView\">{{selectedRelatedRecName}}</div></template><template case=\"false\"> <crux-dropdown cx-prop-options=\"{{cxPropRelatedRecordData}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"id\" cx-prop-selected=\"{{lbind(selectedHeaderValue)}}\" on-option-select=\"{{method('setHeaderOption')}}\" class=\"cxLookupModalRelIdDropdown\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownClose')}}\"></crux-dropdown> </template></template> </template></template> <template is=\"if\" value=\"{{cruxAnd(negate(showEmptySelectPage),negate(cxPropDisableSearch))}}\"><template case=\"true\"> <lyte-input class=\"cxLookupSearch\" lt-prop-close-icon=\"true\" lt-prop-id=\"filterbox\" data-zcqa=\"lookupSearch\" lt-prop-appearance=\"box\" lt-prop-type=\"search\" lt-prop-placeholder=\"{{if(cxPropSearchPlaceholder,cxPropSearchPlaceholder,if(displayFieldLabel,cruxGetI18n('crm.lookup.searchby.placeholder',displayFieldLabel),cruxGetI18n('crm.globalsearch.search.title')))}}\" onkeyup=\"{{action('searchSetValue',event,this)}}\" on-clear=\"{{method('searchBarClear')}}\" after-render=\"{{method('associateSearchClick')}}\"></lyte-input> </template></template> <template is=\"if\" value=\"{{selectedRecsLength}}\"><template case=\"true\"><div class=\"cxLookupSelParticpantCount\"> <template is=\"if\" value=\"{{ifEquals(cxPropType,'multi_module_multi_select')}}\"><template case=\"true\"> <div class=\"cxLookupSelParticpantLabel {{if(ifNotEquals(currentModalPage,'selected'),'cxcP','')}}\" data-zcqa=\"clearRecords\" onclick=\"{{action('moveToMultiModuleSelectView')}}\"><span class=\"cxLookupModalBoldText\">{{selectedRecsLength}}</span>&nbsp;-&nbsp;Participants Selected</div> <template is=\"if\" value=\"{{ifEquals(currentModalPage,'multiList')}}\"><template case=\"true\"><div class=\"cxLookupModalHeadClearBtn\" data-zcqa=\"clearRecords\" onclick=\"{{action('clearSelectedRecordsFn')}}\">Clear All</div></template></template> </template></template> </div></template></template> </div> <div class=\"cxLookupModalTopRight\"> <template is=\"if\" value=\"{{cruxAnd(cxPropCreateYield,ifEquals(selectedRecsLength,0),cruxOr(ifEquals(currentModalPage,'multiList'),ifEquals(currentModalPage,'singleList')))}}\"><template case=\"true\"><div class=\"cxPropCreateYield\"> <lyte-yield yield-name=\"createYield\" class=\"cxMlAuto\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{cruxAnd(ifNotEquals(currentModalPage,'multiList'),negate(showEmptySelectPage),ifNotEquals(currentModalPage,'singleList'))}}\"><template class=\"\" case=\"true\"> <template is=\"if\" value=\"{{cruxAnd(ifNotEquals(currentModalPage,'selected'),ifEquals(selectedModuleValue,'all_participants'))}}\"><template case=\"true\"><lyte-button data-zcqa=\"mxnremoveBtn\" lt-prop-id=\"\" lt-prop-appearance=\"default\" onclick=\"{{action('unassignAllRecords')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.removeall')}}</template> </lyte-button></template></template> <lyte-button data-zcqa=\"mxnAddMore\" lt-prop-id=\"\" lt-prop-appearance=\"default\" onclick=\"{{action('addMoreRecords')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.module.addmore')}}</template> </lyte-button> </template></template> </div> </div> </lyte-modal-header> <lyte-modal-content class=\"cxLookupModalContent {{if(showMultiModuleTable,'cxLookupModalResultContent','')}}\"> <div class=\"cxLookupModalContentWrapper\"> <div class=\"cxLookupModalListView\"> <template is=\"if\" value=\"{{cruxAnd(negate(showMultiModuleTable),currentcv,currentcv.id)}}\"><template case=\"true\"> <crux-list-view cx-prop-list-view-content=\"{{record}}\" cx-prop-smart-filter-yield=\"true\" cx-prop-is-link-to-not-supported=\"{{cxPropIsLinkToNotSupported}}\" cx-prop-column-list-data-bind=\"false\" cx-prop-show-search-letter=\"{{cxPropShowSearchLetter}}\" cx-prop-max-select-column=\"{{cxPropMaxSelectColumn}}\" cx-prop-pin-unpin-column=\"{{cxPropPinUnpinColumn}}\" cx-prop-lv-summary-yield=\"true\" cx-prop-show-manage-column=\"{{cruxOr(negate(disableFieldsEdit,cxPropEnableManageColumn))}}\" cx-prop-show-sort-icon=\"{{cruxAnd(negate(disableFieldsEdit),cxPropShowSortIcon)}}\" cx-prop-enable-hide-column=\"false\" cx-prop-selected-ids=\"{{module.selectedIds}}\" cx-prop-module-info=\"{{module}}\" cx-prop-header-prefix-yield=\"{{prefixYield}}\" cx-prop-page=\"{{lbind(cxPropPage)}}\" cx-prop-prefix-yields=\"{{prefixYieldArr}}\" cx-prop-body-prefix-yield=\"{{prefixYield}}\" cx-prop-allow-encrypted-fields=\"{{cxPropAllowEncryptedFields}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-no-records-message=\"{{if(cxPropNoRecordsMessage,cxPropNoRecordsMessage,cruxGetI18n('crm.module.empty.message',module.plural_label))}}\" on-sort-unsort-click=\"{{method('onSortUnsortClickFn')}}\" cx-prop-record-count=\"{{totalCountForLV}}\" cx-prop-profile-id=\"{{cxPropProfileId}}\" cx-prop-fire-bulk-request=\"false\" cx-prop-max-select-count=\"{{cxPropMaxSelectCount}}\" cx-prop-show-max-select-tooltip=\"{{cxPropShowMaxSelectTooltip}}\" cx-prop-sorted-column=\"{{sortedColumn}}\" cx-prop-sorted-order=\"{{queryParamObject.sort_order}}\" cx-prop-per-page-options=\"{{cxPropPerPageOptions}}\" cx-prop-sort-columns=\"{{cxPropSortColumns}}\" cx-prop-enable-field-sort=\"{{cxPropEnableFieldSort}}\" cx-prop-header-properties=\"{{cxPropHeaderProperties}}\" cx-prop-date-properties=\"{{cxPropDateProperties}}\" cx-prop-datetime-properties=\"{{cxPropDatetimeProperties}}\" cx-prop-enable-all-field-sort=\"false\" cx-prop-column-cell-class=\"{{cxPropColumnCellClass}}\" cx-prop-enable-body-scroll=\"false\" cx-prop-field-mapping=\"{{cxPropFieldTypeMapping}}\" cx-prop-module-id=\"{{cxPropModId}}\" cx-prop-module=\"{{module.module_name}}\" cx-prop-module-api-name=\"{{module.api_name}}\" activity_badge=\"Not_Supported\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" cx-prop-disable-row-class=\"cxLookupDisableRow\" cx-prop-per-page=\"{{lbind(perPage)}}\" cx-prop-custom-view=\"{{currentcv}}\" cx-prop-cvid=\"{{currentcv.id}}\" cx-prop-lookup-properties=\"{{cxPropLookupProperties}}\" on-construct-yield=\"{{method('onYieldConstruction')}}\" on-before-show-error-alert=\"{{method('onBeforeShowErrorAlertFn')}}\" on-checkbox-before-checked=\"{{method('onCheckboxBeforeCheckedFn')}}\" on-check-box-changed=\"{{method('onCheckboxChange')}}\" on-listview-paginate=\"{{method('onListviewPaginateFn')}}\" on-save-custom-view=\"{{method('onSaveCustomViewFn')}}\"> <template is=\"yield\" yield-name=\"summary-yield\"> <div class=\"cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropTableSummaryYield}}\"><template case=\"true\"><lyte-yield yield-name=\"tableSummaryYield\"></lyte-yield></template><template case=\"false\"> <template is=\"if\" value=\"{{cruxOr(ifEquals(currentModalPage,'multiList'),ifEquals(currentModalPage,'singleList'))}}\"><template case=\"true\"><span class=\"\" onclick=\"{{action('fetchTotalCount')}}\">Total Records <span class=\"cxLookupModalBoldText\">{{totalRecordsCount}}</span></span></template></template> <template is=\"if\" value=\"{{filterInfo.filter}}\"><template case=\"true\"> <span class=\"cxLookupModalSeparator\"></span> <div>Filter By <span class=\"cxLookupModalBoldText\">{{filterInfo.filter}}</span></div> </template></template> <template is=\"if\" value=\"{{cruxAnd(negate(showApplyFilter),negate(showMultiModuleTable),filterApplied)}}\"><template case=\"true\"><div> <lyte-button lt-prop-size=\"small\" class=\"cxLookupModalFltrClrBtn\" data-zcqa=\"\" lt-prop-id=\"\" onclick=\"{{action('clearFilter')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.report.clear.filter')}}</template> </lyte-button> </div></template></template> <template is=\"if\" value=\"{{filterInfo.sort}}\"><template case=\"true\"> <span class=\"cxLookupModalSeparator\"></span> <div>Sort By {{filterInfo.sort}} <div data-zcqa=\"lv_unsortLink\" onclick=\"{{action('unsortFn')}}\"></div></div> </template></template> <template is=\"if\" value=\"{{expHandlers(lookupSingle,'&amp;&amp;',module)}}\"><template class=\"cxSelectedSingle\" case=\"true\"> <span class=\"cxLookupModalSeparator\"></span> <div>{{cruxGetI18n(\"crm.record.selected\",module.singular_label)}} : <span class=\"cxLookupModalBoldText\">{{lookupSingle}}</span></div> </template><template case=\"false\"><template is=\"if\" value=\"{{cruxAnd(ifNotEquals(cxPropType,'multi_module_multi_select'),selectedRecsLength)}}\"><template case=\"true\"> <span class=\"cxLookupModalSeparator\"></span> <div class=\"cxDIB cxLookupSelParticpantLabel cxcP\" onclick=\"{{action('moveToSelectedPage')}}\"> <template is=\"if\" value=\"{{ifEquals(selectedRecsLength,1)}}\"><template id=\"\" case=\"true\"><span class=\"cxLookupModalBoldText\">1</span>{{cruxGetI18n(\"crm.merge.records.selected\",\"\",module.singular_label)}}</template><template id=\"\" case=\"false\"><span class=\"cxLookupModalBoldText\">{{selectedRecsLength}}</span>{{cruxGetI18n(\"crm.merge.records.selected\",\"\",module.plural_label)}}</template></template> </div> <template is=\"if\" value=\"{{ifEquals(currentModalPage,'multiList')}}\"><template case=\"true\"><div class=\"cxLookupModalHeadClearBtn\" data-zcqa=\"clearRecords\" onclick=\"{{action('clearSelectedRecords')}}\">{{cruxGetI18n(\"crm.title.clear.name\")}}</div></template></template> </template></template></template></template> </template></template> </div> </template> <template is=\"yield\" yield-name=\"headerprefix-yield\"> <span class=\"dummySpan\"></span> </template> <template is=\"yield\" yield-name=\"custom-filter\"> <template is=\"if\" value=\"{{cruxAnd(cxPropEnableFilter,negate(showMultiModuleTable))}}\"><template case=\"true\"><div class=\"cxLookupModalSmartFilterContainer {{if(isFilterActive,'','cxdN')}}\"> <crux-smart-filter cx-prop-is-special-fields=\"{{cxPropSystemFilterNeeded}}\" cx-prop-fields=\"{{fieldsInfo.filter}}\" cx-prop-module-display-field=\"{{cxPropModuleDisplayField}}\" cx-prop-search-label=\"{{cruxGetI18n('crm.label.filter.module',module.plural_label)}}\" cx-prop-search=\"true\" cx-prop-enable-scroll-loading=\"true\" cx-prop-module=\"{{moduleName}}\" class=\"smartFilter_{{module.module_name}} {{if(preventUserAction,'eventNone','')}}\" cx-prop-prevent-ui-type=\"{{cxPropFilterPreventUiType}}\" cx-prop-field-select-limit=\"{{cxPropFilterFieldSelectLimit}}\" cx-prop-prevent-column-name=\"{{cxPropFilterPreventColumnName}}\" on-field-change=\"{{method('onFilterChange')}}\" on-value-change=\"{{method('onFilterChange')}}\" cx-prop-boundary=\"{{setboundary}}\" cx-prop-display-as-accord=\"true\" cx-prop-new-list-key=\"{{cxPropNewListKey}}\" cx-prop-group-support=\"{{isGroupCriteriaNeeded}}\" cx-prop-role-support=\"{{isRolesGroupCriteriaEnabled}}\" cx-prop-child-modules=\"{{supportedRelatedModules}}\" cx-prop-child-field-limit=\"5\" cx-prop-aria=\"{{cxPropIsAccessibilityConfigSupported}}\"> </crux-smart-filter> <template is=\"if\" value=\"{{showApplyFilter}}\"><template case=\"true\"><div class=\"cxLookupModalFilterFooterBtn\"> <lyte-button data-zcqa=\"dash_listView_submit\" lt-prop-id=\"\" lt-prop-appearance=\"primary\" onclick=\"{{action('applyFilter')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.apply.filter')}}</template> </lyte-button> <lyte-button data-zcqa=\"dash_listView_clear\" lt-prop-id=\"\" onclick=\"{{action('clearFilter')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.title.clear.name')}}</template> </lyte-button> </div></template></template> </div></template></template> </template> <template is=\"yield\" yield-name=\"bodyprefix-yield\"> <template is=\"if\" value=\"{{ifEquals(cxPropType,'single')}}\"><template case=\"true\"> <lyte-radiobutton lt-prop-type=\"primary\" lt-prop-name=\"record\" lt-prop-value=\"{{recordObj.id}}\" data-zcqa=\"radioButon_{{recordObj.id}}\" lt-prop-checked=\"{{ifEquals(recordObj.id,selectedSingle)}}\" on-checked=\"{{method('selectSingle',recordObj.id)}}\" onclick=\"{{action('radioButtonClicked',recordObj.id)}}\"></lyte-radiobutton> </template><template id=\"\" case=\"false\"> <span class=\"cxRemoveIconWithCircle\" onclick=\"{{action('removeRecFromSelected',recordObj,module,indexVal)}}\"></span> </template></template> </template> <template is=\"if\" value=\"{{fieldObj.yieldName}}\"><template case=\"true\"><template is=\"yield\" yield-name=\"listview-{{fieldObj.yieldName}}\"> <div><img class=\"userImage\" src=\"{{recordObj.image_link}}\"><div>{{recordObj.last_name}}</div></div> </template></template></template> </crux-list-view> </template><template case=\"false\"><template is=\"if\" value=\"{{ifNotEquals(currentModalPage,'multiList')}}\"><template case=\"true\"> <div class=\"cxMMLModalSelectedPanel\"> <template items=\"{{selectedModules}}\" item=\"item\" index=\"index\" is=\"for\"> <div style=\"{{if(item.hideModule,'display:none','')}}\" class=\"cxMMLModalSelectedTableWrap\"> <div class=\"cxMMLModalSelectedTableHead cxFlex cxAlignItemCenter\"> <div class=\"cxMMLModalSelTableHeadLeft\"><span class=\"cxLookupModalBoldText\">{{item.name}}</span><span class=\"cxMMLModalSelTableCount\">{{item.records.length}}</span></div> <div class=\"cxFlex cxAlignItemCenter cxMMLModalSelTableHeadRight\" data-zcqa=\"mxnnavigationlookup\"> <div class=\"cxMMLModalSelTableRemoveBtn\" onclick=\"{{action('removeSelectedModule',item,index)}}\">Remove all {{item.name}}</div> <lyte-navigator id=\"navigator\" lt-prop-records=\"{{item.records.length}}\" lt-prop-value=\"0\" lt-prop-show-only-icon=\"{{cxPropShowOnlyIcon}}\" lt-prop-perpage=\"10\" on-next=\"{{method('rendNext',index)}}\" on-previous=\"{{method('rendPrev',index)}}\" lt-prop-middle-text=\"-\"></lyte-navigator> </div> </div> <crux-table-component cx-prop-table-class=\"cxMMLModalSelectedTable\" cx-prop-column-cell-class=\"cxMMLModalSelectedTableCell\" cx-prop-header=\"{{item.header}}\" cx-prop-row-zcqa=\"\" cx-prop-content=\"{{item.records}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-enable-body-scroll=\"false\" cx-prop-field-type-mapping=\"{{item.fieldTypeMapping}}\" cx-prop-header-yield=\"{{headerYields}}\" cx-prop-show-tooltip=\"false\" cx-prop-module=\"{{moduleName}}\" cx-prop-show-sort-icon=\"false\" cx-prop-field-type-mapping-selector=\"{{cxPropFieldTypeMappingSelector}}\"> <template is=\"yield\" yield-name=\"header-prefix-1\"> <template> <div class=\"dummyDiv\"></div> </template> </template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <template is=\"if\" value=\"{{ifNotEquals(currentModalPage,'multiList')}}\"><template id=\"\" case=\"true\"> <span class=\"cxMMLSelTableRemoveIconWrap\" onclick=\"{{action('removeRecFromSelected',recordObj,item,index)}}\"> <span class=\"cxMMLSelTableRemoveIcon\"></span> </span> </template></template> </template> <template is=\"yield\" yield-name=\"body-lookup\">{{recordObj[fieldObj.api_name].name}}</template> <template is=\"yield\" yield-name=\"body-phone\"> {{recordObj[fieldObj.api_name]}} </template> <template is=\"yield\" yield-name=\"body-\"> <div><img class=\"userImage\" src=\"{{recordObj.image_link}}\"><div>{{recordObj.last_name}}</div></div> </template> </crux-table-component> </div> </template> <template is=\"if\" value=\"{{showEmptySelectPage}}\"><template case=\"true\"> <div class=\"cxEmptyTable\"> <div>No Records Found</div> <lyte-button data-zcqa=\"\" lt-prop-id=\"\" onclick=\"{{action('backToList','home')}}\"> <template is=\"registerYield\" yield-name=\"text\">Add {{cxPropHeaderSuffix}}</template> </lyte-button> </div> </template></template> </div> </template></template></template></template> </div> <template is=\"if\" value=\"{{cruxAnd(cxPropAdditionalParticipants,ifEquals(currentModalPage,'multiList'))}}\"><template case=\"true\"><div> <template is=\"if\" value=\"{{cruxAnd(cxPropAdditionalParticipants,ifEquals(currentModalPage,'multiList'))}}\"><template case=\"true\"><div class=\"cxFlex cxAlignItemCenter cxLookupModalParticipentWrap\"> <div class=\"cxLookupModalParticipantHead\">Invite Additional Recipient via Email <template is=\"if\" value=\"{{negate(isAddPartOpen)}}\"><template case=\"true\"><span>:</span></template></template></div> <template is=\"if\" value=\"{{negate(isAddPartOpen)}}\"><template case=\"true\"><div class=\"cxLookupModalParticptAddBtn\" onclick=\"{{action('additionalPartiesToggle','open')}}\">Add Email_ID</div></template></template> <template is=\"if\" value=\"{{isAddPartOpen}}\"><template case=\"true\"><span class=\"cxLookupModalParticptSep\"></span></template></template> <template is=\"if\" value=\"{{isAddPartOpen}}\"><template case=\"true\"><div class=\"cxLookupModalParticptTagBtn\" onclick=\"{{action('additionalPartiesToggle','close')}}\"> <template is=\"if\" value=\"{{negate(mailParticipants.length)}}\"><template case=\"true\">Close</template><template case=\"false\">Remove and Close</template></template> </div></template></template> </div></template></template> <template is=\"if\" value=\"{{isAddPartOpen}}\"><template case=\"true\"> <crux-tag class=\"cxLookupModalParticipantTag\" cx-prop-tags=\"{{lbind(mailParticipants)}}\" cx-prop-allow-dropdown=\"false\" cx-prop-comma-seperation=\"true\" cx-prop-input-placeholder=\"Enter Email-Id\" cx-prop-max-tag-limit=\"{{cxPropMaxAddPartLimit}}\" cx-prop-color-tags=\"false\" on-before-add-tag=\"{{method('onBeforeAddEmailParticipants')}}\" on-add-tag=\"{{method('onAddEmailParticipant')}}\" on-remove-tag=\"{{method('onRemoveMailPart')}}\"></crux-tag> </template></template> </div></template></template> </div> </lyte-modal-content> <lyte-modal-footer class=\"right cxMLookupModalFooter\" data-zcqa=\"mxnfooter\"> <template is=\"if\" value=\"{{cxPropFooterButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"footerButtonYield\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{cruxAnd(cruxOr(expHandlers(cruxAnd(negate(isRecordsEdited),ifEquals(currentModalPage,'unassign')),'||',ifEquals(currentModalPage,'selected'))),showEmptySelectPage)}}\"><template case=\"true\"> <lyte-button data-zcqa=\"lookupCloseBtn\" lt-prop-id=\"cruxComboBoxCloseButton\" lt-prop-appearance=\"default\" onclick=\"{{action('cancelFn')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('Close')}}</template> </lyte-button> </template><template case=\"false\"><template is=\"if\" value=\"{{ifNotEquals(currentModalPage,'singleList')}}\"><template id=\"\" case=\"true\"> <lyte-button data-zcqa=\"lookupCancelBtn\" lt-prop-id=\"cruxComboBoxSaveButton\" lt-prop-appearance=\"default\" onclick=\"{{action('cancelFn')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.cancel')}}</template> </lyte-button> <lyte-button data-zcqa=\"lookupAssignBtn\" lt-prop-disabled=\"{{negate(isRecordsEdited)}}\" lt-prop-id=\"cruxComboBoxSaveButton\" lt-prop-appearance=\"primary\" onclick=\"{{action('selectionConfirm')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('Confirm')}}</template> </lyte-button> </template></template></template></template> </template></template> </lyte-modal-footer> </template> </lyte-modal> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"insertYield","position":[3,1,5]},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"registerYield","position":[3,5,1],"dynamicNodes":[]},{"type":"registerYield","position":[3,5,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[3,5,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]},{"type":"if","position":[1,0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[3,5,7],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"registerYield","position":[3,5,9],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3,5]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1,1]},{"type":"if","position":[5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}},{"type":"attr","position":[5,1,3]},{"type":"if","position":[5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,5,1]},{"type":"if","position":[1,1,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"switch","position":[0],"cases":{"singleList":{"dynamicNodes":[{"type":"text","position":[0]}]},"multiList":{"dynamicNodes":[{"type":"text","position":[0]}]},"selected":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{"dynamicNodes":[{"type":"text","position":[0]}]}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"switch","position":[0],"cases":{"multiList":{"dynamicNodes":[{"type":"text","position":[0]}],"additional":{"default":true}}},"default":{"dynamicNodes":[{"type":"text","position":[0]}]}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,7]},{"type":"if","position":[1,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,9]},{"type":"if","position":[1,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,11]},{"type":"if","position":[1,1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,1,13]},{"type":"if","position":[1,1,1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1,1]},{"type":"if","position":[3,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,1]},{"type":"attr","position":[3,3]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,0]},{"type":"text","position":[3,2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]},{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0],"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,1,0]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["item.hideModule","'display:none'","''"]}}}},{"type":"text","position":[1,1,1,0,0]},{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,3,1]},{"type":"text","position":[1,1,3,1,1]},{"type":"attr","position":[1,1,3,3]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[1,3,5],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"registerYield","position":[1,3,7],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"registerYield","position":[1,3,9],"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,1,0]}]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["module","header","sortedColumn","queryParamObject","selectedSingle","lookupSingle","cxPropModId","relations","moduleName","displayField","record","cxPropShow","next","currentPage","cxPropPerPage","perPage","value","cxPropHideHeaderOnNoContent","cxPropCreateYield","cxPropFetchRecordsOnEnter","cxPropHeader","metaMoreRecords","cxPropFields","headerYields","cxPropRelatedId","cxPropRelatedRecordData","selectedHeaderValue","cxPropRelatedModuleId","cxPropRelatedName","cxPropMetaMoreRecords","cxPropDontShowRelatedDropdown","fieldMapping","cxPropFieldTypeMapping","cxPropShowNavigator","cxPropReturnFullObjectOnGet","cxPropShowOnlyIcon","cxPropDisabledList","cxPropQueryParam","cxPropWrapperClass","cxPropMaxSelectCount","cxPropCvid","show","cxPropColumnCellClass","cxPropProfileId","cxPropSearchPlaceholder","cxPropModuleApiName","cxPropShowMaxSelectTooltip","cxPropPerPageOptions","cxPropFilterFieldSelectLimit","cxPropAllowEncryptedFields","cxPropDefaultCriteria","cxPropDefaultFilterCriteria","cxPropMaxSelectColumn","cxPropSearchFormat","cxPropPinUnpinColumn","cxPropNoRecordsMessage","cxPropStayOnSelectPage","cxPropTableSummaryYield","cxPropShowCloseButton","cxPropShowAllFields","cxPropShowSortIcon","cxPropValue","cxPropEnableFieldSort","cxPropSortColumns","cxPropSearchFields","cxPropFooterButtonYield","cxPropDisableSearch","cxPropFilterComponent","cxPropEnableFilter","cxPropShowFilter","cxPropComparator","cxPropFilterButton","cxPropType","cxPropModuleOptions","cxPropEnableCustomview","cxPropSystemFilterNeeded","cxPropFilterPreventUiType","cxPropFilterPreventColumnName","cxPropCustomViewCategory","cxPropLookupProperties","moduleInfo","fieldsInfo","cxPropIsAccessibilityConfigSupported","cxPropModuleDisplayField","cxPropHeaderSuffix","cxPropTotalCount","showApplyFilter","currentcv","prefixYield","cxPropPage","currentSelectedIds","selectedRecsLength","currentModalPage","showMultiModuleTable","cxPropAdditionalParticipants","cxPropMaxAddPartLimit","mailParticipants","showFilter","disableFieldsEdit","filterApplied","cxPropField","totalRecordsCount","filterInfo","cxPropEnableManageColumn","cxPropModalProperty","displayFieldLabel","cxPropIsLinkToNotSupported","isFilterActive","isRecordsEdited","selectedModuleValue","isAddPartOpen","showEmptySelectPage","totalCountForLV","selectedRelatedRecName","prefixYieldArr","cxPropHeaderProperties","cxPropDateProperties","cxPropDatetimeProperties","cxPropNumberProperties","cxPropOldFlow","next"],
_observedAttributesType :["object","array","string","object","string","string","string","array","string","string","array","boolean","array","number","number","number","object","boolean","boolean","boolean","string","string","array","object","string","array","string","string","string","string","boolean","object","object","boolean","boolean","boolean","array","object","string","number","string","boolean","string","string","string","string","boolean","array","number","boolean","array","object","number","boolean","boolean","string","boolean","boolean","boolean","boolean","boolean","string","boolean","boolean","array","boolean","boolean","string","boolean","boolean","boolean","boolean","string","array","boolean","boolean","array","array","array","object","array","object","boolean","object","string","number","boolean","object","boolean","number","array","number","string","boolean","boolean","number","array","boolean","boolean","boolean","object","string","object","boolean","object","string","boolean","boolean","boolean","string","boolean","boolean","number","string","array","object","object","object","object","boolean","array"],
//no i18n
	data : function(){
		return {
			/**
			 * @componentProperty { object } module
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Used for module information
			 */
			module : Lyte.attr("object", {default : {}}),// No I18n
			/**
			 * @componentProperty { array } header
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The fields that are rendered as table header
			 */
			header : Lyte.attr("array", {default : []}),// No I18n
			/**
			 * @componentProperty { string } sortedColumn
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The api name of the sorted column
			 */
			sortedColumn : Lyte.attr("string"),// No I18n
			/**
			 * @componentProperty { object } queryParamObject
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The query params to be sent to the server
			 */
			queryParamObject : Lyte.attr("object",{default:{}}),// No I18n
			/**
			 * @componentProperty { string } selectedSingle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * Contains the id of the selected record
			 */
			selectedSingle : Lyte.attr("string",{default:''}),// No I18n
			/**
			 * @componentProperty { string } lookupSingle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * Contains the display value of the selected record
			 */
			lookupSingle : Lyte.attr("string",{default:''}),// No I18n
			cxPropModId : Lyte.attr("string", {default : ""}),// No I18n
			/**
			 * @componentProperty { array } relations
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			relations : Lyte.attr("array",{default : []}),// No I18n
			/**
			 * @componentProperty { string } moduleName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The name of the module
			 */
			moduleName : Lyte.attr("string", {default : ""}),// No I18n
			/**
			 * @componentProperty { string } displayField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The api name of the display field
			 */
			displayField : Lyte.attr("string",{default: ''}),// No I18n
			/**
			 * @componentProperty { array } record
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * The array of records rendered in the modal
			 */
			record : Lyte.attr("array", {default : []}),// No I18n
			/**
			 *  Set to true to display the model
			 * @componentProperty { boolean } cxPropShow=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropShow : Lyte.attr("boolean", {default : false}),// No I18n
			next : Lyte.attr("array"),// No I18n
			currentPage : Lyte.attr("number",{default:0}),// No I18n
			cxPropPerPage : Lyte.attr("number",{default:10}),// No I18n
			perPage : Lyte.attr("number"),// No I18n
			value : Lyte.attr("object"),// No I18n
			/**
			 * By default header will be hidden if no content, set to false to display it
			 * @componentProperty { boolean } cxPropHideHeaderOnNoContent=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropHideHeaderOnNoContent : Lyte.attr("boolean", {default : true}),// No I18n
			/**
			 * User can render their own button like elements for quick create purposes
			 * @componentProperty { boolean } cxPropCreateYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 * @yieldName createYield
			 */
			cxPropCreateYield : Lyte.attr("boolean", {default : false}),// No I18n
			/**
			 * @componentProperty { boolean } cxPropFetchRecordsOnEnter=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * @default false
			 */
			cxPropFetchRecordsOnEnter : Lyte.attr("boolean", {default : false}),// No I18n
			/**
			 * @componentProperty { string } cxPropHeader
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The text to be rendered as header of the modal
			 */
			cxPropHeader : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } metaMoreRecords
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			metaMoreRecords : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropFields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The fields to be rendered in the modal header
			 */
			cxPropFields : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { object } headerYields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Pass an object for yield of header
			 */
			headerYields : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Id of the related record whose dropdown is to be displayed in the header
			 */
			cxPropRelatedId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropRelatedRecordData
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			cxPropRelatedRecordData : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { string } selectedHeaderValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedHeaderValue : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedModuleId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The id of the module of the related record whose dropdown is to be displayed in the header
			 */
			cxPropRelatedModuleId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Display value of the related record whose dropdown is to be displayed in the header
			 */
			cxPropRelatedName : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropMetaMoreRecords
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The key which contains the meta information of the records
			 */
			cxPropMetaMoreRecords : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to display the related to dropdown in the header
			 * @componentProperty { boolean } cxPropDontShowRelatedDropdown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropDontShowRelatedDropdown : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * @componentProperty { object } fieldMapping
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			fieldMapping : Lyte.attr("object", {default : {}}),
			cxPropFieldTypeMapping : Lyte.attr('object', {default : (typeof crmConstants !== "undefined" && crmConstants.defaultUiTypeToCruxMapping) ? crmConstants.defaultUiTypeToCruxMapping : {}}),
			/**
			 * @componentProperty { boolean } cxPropShowNavigator=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropShowNavigator : Lyte.attr("boolean", {default : true}),
			/**
			 * Set to true to return full record object on getValue
			 * @componentProperty { boolean } cxPropReturnFullObjectOnGet=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * By default only navigator icons are displayed, set to false to display text as well
			 * @componentProperty { boolean } cxPropShowOnlyIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropShowOnlyIcon : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { array } cxPropDisabledList
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Ids of records that are to be disabled
			 */
			cxPropDisabledList : Lyte.attr("array", {default : []}),
			// /**
			//  * @componentProperty { string } cxPropModalMiddleText
			//  * @author anuja.manoharan
			//  * @version 1.0.0
			//  * The text to be rendered in the middle of navigator
			//  */
			// cxPropModalMiddleText : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropQueryParam
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The query params that need to be sent to server
			 */
			cxPropQueryParam : Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropWrapperClass
			 * @author manikaraja.p
			 * @version 1.0.0
			 * This property sets given class to wrapper div of modal
			 */
			cxPropWrapperClass : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropNoRecordsMessage
			 * @author manikaraja.p
			 * @version 1.0.0
			 * It will show while no records in the table
			 */
			cxPropMaxSelectCount:Lyte.attr("number",{default:typeof crmConstants !== "undefined" && crmConstants.maxSelectCount ? crmConstants.maxSelectCount : 500}),
			cxPropCvid : Lyte.attr("string"),
			show : Lyte.attr("boolean"),
			cxPropColumnCellClass : Lyte.attr("string",{"input" : true}),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			cxPropSearchPlaceholder : Lyte.attr("string"),
			cxPropModuleApiName : Lyte.attr("string"),
			cxPropShowMaxSelectTooltip : Lyte.attr("boolean",{default:true}),
			cxPropPerPageOptions : Lyte.attr('array'),//NO I18N
			cxPropFilterFieldSelectLimit : Lyte.attr("number", { default : 15 }),//no i18n
			cxPropAllowEncryptedFields : Lyte.attr("boolean"),
      		cxPropDefaultCriteria : Lyte.attr('array'),//NO I18N
			cxPropDefaultFilterCriteria : Lyte.attr('object'),//NO I18N
			cxPropMaxSelectColumn : Lyte.attr("number"),
			cxPropSearchFormat : Lyte.attr("boolean",{default:false}),
			cxPropPinUnpinColumn:Lyte.attr("boolean",{default:false}),
			cxPropNoRecordsMessage : Lyte.attr("string"),
			cxPropStayOnSelectPage : Lyte.attr("boolean", {default : false}),
			cxPropTableSummaryYield : Lyte.attr("boolean", {default : false}), // If we give the table summary yield, we doesn't have a chance to move the selected page. So, It only have the list page.
			cxPropShowCloseButton : Lyte.attr("boolean", {default : true}),
			cxPropShowAllFields : Lyte.attr("boolean", {default : false}),
			cxPropShowSortIcon : Lyte.attr("boolean", {default : true}),
			cxPropValue : Lyte.attr("string" , {default : ''}),
			cxPropEnableFieldSort : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropSortColumns : Lyte.attr("boolean", {default : true}),
			cxPropSearchFields : Lyte.attr("array", {default : []}),
			cxPropFooterButtonYield : Lyte.attr("boolean", {default : false}),
			cxPropDisableSearch : Lyte.attr("boolean", {default : false}),
			cxPropFilterComponent : Lyte.attr("string"),
			cxPropEnableFilter : Lyte.attr("boolean", {default : false}),
			cxPropShowFilter	  : Lyte.attr("boolean", {default : false}),
			cxPropComparator : Lyte.attr("boolean", {default : true}),
			cxPropFilterButton : Lyte.attr("boolean", {default : false}),
			cxPropType	: Lyte.attr("string", {default : 'single'}),
			cxPropModuleOptions : Lyte.attr("array", {default : []}),
			cxPropEnableCustomview : Lyte.attr("boolean", {default : false}),
			cxPropSystemFilterNeeded : Lyte.attr("boolean", {default : false}),
			cxPropFilterPreventUiType	 : Lyte.attr("array", {default : [104, 66, 999, 3, 123, 1234, 134, 500, 555, 556, 51]}),
			cxPropFilterPreventColumnName : Lyte.attr("array", {default : ["KEYWORDID","ADID","GADCONFIGID","ADGROUPID","VERSION","TOTALTIME","COMMENTCONTENTS","PARTICIPANTID","ISCALLBILLABLE","CHECKINLONGITUDE","CHECKINLATITUDE","PUBLISHED","PRODUCTDETAILS","PREDICTIONSCORE","ACCOUNTCF501","ZCAMPAIGNID","ISCTICALL","BEST_TIME","ISDUPLICATE","ISAPPROVED","CONVERTEDDATE" ,"CONVERTED"]}),
			cxPropCustomViewCategory : Lyte.attr("array"),
			cxPropLookupProperties : Lyte.attr("object" , {default : {routeName : "crm.tab.module.entity.detail", target : "_blank"}}),
			moduleInfo :  Lyte.attr("array"),
			fieldsInfo : Lyte.attr("object" , {default : {}}),
			cxPropIsAccessibilityConfigSupported : Lyte.attr("boolean",{"default" : Crm ? Crm.userDetails.isAccessibilityConfigSupported && !featuresAvailable.NEXTGENUI_ENABLED : false}), //NO I18N
			cxPropModuleDisplayField : Lyte.attr("object" , {default : crmConstants ? crmConstants.moduleDisplayField : {}}),
			cxPropHeaderSuffix : Lyte.attr("string", {default :  _cruxUtils.getI18n('crm.label.event.summary') }),
			cxPropTotalCount : Lyte.attr("number"),
			showApplyFilter : Lyte.attr("boolean", {default : false}),
			currentcv : Lyte.attr("object" , {default : {}}),
			prefixYield : Lyte.attr("boolean", {default : true}),
			cxPropPage : Lyte.attr("number"),
			currentSelectedIds : Lyte.attr("array"),
			selectedRecsLength : Lyte.attr("number" , {default : 0}),
			currentModalPage : Lyte.attr("string", {default : 'multiList'}),
			showMultiModuleTable : Lyte.attr("boolean", {default : false}),
			cxPropAdditionalParticipants : Lyte.attr("boolean", {default : false}),
			cxPropMaxAddPartLimit : Lyte.attr("number" , {default : 10}),
			mailParticipants : Lyte.attr("array" ,  {default : []}),
			showFilter : Lyte.attr("boolean", {default : true}),
			disableFieldsEdit : Lyte.attr("boolean", {default : false}),
			filterApplied : Lyte.attr("boolean", {default : false}),
			cxPropField : Lyte.attr("object" , {default : {}}),
			totalRecordsCount : Lyte.attr("string", {default : '###'}),
			filterInfo : Lyte.attr("object" , {default : {}}),
			cxPropEnableManageColumn : Lyte.attr("boolean", {default : true}),
			cxPropModalProperty : Lyte.attr("object" , {default : {}}),
			displayFieldLabel : Lyte.attr("string", {default : ''}),
			cxPropIsLinkToNotSupported : Lyte.attr("boolean" , {default : true}),
			isFilterActive : Lyte.attr("boolean", {default : true}),
			isRecordsEdited : Lyte.attr("boolean", {default : false}),
			selectedModuleValue :  Lyte.attr("string"),
			isAddPartOpen : Lyte.attr("boolean", {default : false}),
			showEmptySelectPage :  Lyte.attr("boolean", {default : false}),
			totalCountForLV : Lyte.attr("number" , {default : 0}),
			selectedRelatedRecName : Lyte.attr("string"),
			prefixYieldArr : Lyte.attr("array" ,  {default : []}),
			cxPropHeaderProperties: Lyte.attr("object"),
			cxPropDateProperties: Lyte.attr('object'),
			cxPropDatetimeProperties: Lyte.attr('object'),
			cxPropNumberProperties: Lyte.attr('object'),
			cxPropOldFlow	: Lyte.attr("boolean", {default : false}),
			next : Lyte.attr("array" ,  {default : []})
		}
	},
	init : function(){
		this.records = [];// fix for --> if multiple lookup is present in CAE, other module lookup records are maintained
		var type = this.data.cxPropType;
		this.modulesIdMap = {};
		this.assignedIds = {};
		this.unassignIds = {};
		// this.moduleTempSelIds = {};
		var fieldMapping = this.data.fieldMapping;
		if(fieldMapping && Object.keys(fieldMapping).length && !this.data.cxPropFieldTypeMapping){
			this.setData("cxPropFieldTypeMapping" , fieldMapping); // NO I18N
		}
		if(!this.data.cxPropCustomViewCategory && this.data.cxPropEnableCustomview){
			this.setData('cxPropCustomViewCategory',this.getDefaultCustomCategory());
		}
		if(this.data.cxPropAdditionalParticipants){
			this.mailModule = {module : {api_name : "Additional_participants" , id : "additional_participant" , plural_label : "Additional Participants" , "display_field" : {api_name : 'Email' , id : "Email"}}, records : [] , qp : {page : 1 , per_page : 10} , header : [{api_name : "Email" , data_type : "email" , ui_type : 25 , field_label : "Email_ID" , id : "dummy_field_ID" , column_name : "EMAIL"}]}
			this.modulesIdMap = {};
			this.modulesIdMap['additional_participant'] = {'module' : this.mailModule.module ,selectedIds : []  , selectedRecs : []};
			// this.mailParticipants = [];
		}
		var field = this.data.cxPropField;
		if(field && field.data_type === "multiselectlookup"){
			this.defaultRecGetFieldsForMultiSelect = ["$currency_symbol","$assignable","$editable","$approval_state","$review","$locked_for_me","Locked__s","Layout","$stop_processing"];
		}
		if(field && field.data_type){
			if(field.data_type === "lookup"){
				this.data.cxPropIsLinkToNotSupported = true;
			}else{
				this.data.cxPropIsLinkToNotSupported = false;
			}
		}
		// if(field && field.data_type === "multiselectlookup"){
		// 	this.setData("cxPropType" , "multiple");
		// }else if(field && field.data_type === "multiselect_multimodule_lookup"){
		// 	this.setData("cxPropType" , "multi_module_multi_select");
		// }
		if(!this.data.cxPropAssigneeModuleName && field && field.module){
			this.setData('cxPropAssigneeModuleName' , field.module[0].singular_label);
		}
		if(type === "multi_module_multi_select"){
			this.allParticipantObj = {plural_label : "All Participants" , id :  "all_participants"};
			this.defaultModuleOptions = $L.extend(true , [] , this.data.cxPropModuleOptions);
		}
		// this.setData("totalCountForLV" , this.data.cxPropPerPage + 1);
		this.$node.getValue = function(type){
			return this.component.getAssignedValues(type);
		};
		this.$node.clearSelectedRecords = function(){
			return this.component.clearRecords();
		};
		// if(type === "multi_module_multi_select" && this.data.currentModalPage === "unassign"){
		// 	this.setMultiModuleSelectViewData();
		// }else{
		// 	this.lookupInit(this, this.data.cxPropModId, true);// No I18n
		// }
		if(this.data.cxPropOldFlow){
			this.setData('next' , [0,this.data.cxPropPerPage]);
		}
		if(this.data.cxPropDefaultCriteriaStr){
			this.data.cxPropSearchFormat = true;
		}
		if(this.data.cxPropType === "single"){
			this.setData("prefixYieldArr", [{fixed : "enable", class : "cxLookupWidthOnePerc"}])//No I18n
			if(!this.data.cxPropMaxSelectColumn){
				this.data.cxPropMaxSelectColumn = 10;  //default limit for columns in the single lookup
			}
			if(this.data.cxPropAllowEncryptedFields === undefined){
				var allowEncrypt = (typeof featuresAvailable === 'object' && featuresAvailable.ENCRYPT_SYSTEMDEFINED_FIELDS) ? true  : false;
				this.setData('cxPropAllowEncryptedFields' , allowEncrypt);
			}
		}
		if(this.data.cxPropRelatedRecordData && this.data.cxPropRelatedRecordData.length){
			this.relatedRecPassed = true;
		}
		// this.setData("headerYields", {prefix : [{fixed : "enable", class : "cxLookupWidthOnePerc"}]})//No I18n
		// this.nextProp = $L.extend(true , [] ,this.data.next);
		// this.lookupViewRestrictedColumns = ["CURRENCYISOCODE","SCORE","POSITIVE_SCORE","NEGATIVE_SCORE","TP_SCORE","TP_POSITIVE_SCORE","TP_NEGATIVE_SCORE","LEADSCORE"];// NO I18N
		// this.lookupViewRestrictedModuleVsColumn = { Leads : ["QUALIFICATIONDURATION"] , Products : ["ACTIVE"]}; //NO I18N
		// this.appointmentHiddenFields =   ["RESCHEDULEDFROM","REMINDER","ENDTIME"]; //No i18n
		// this.tasksHiddenFields = ["REMINDAT","SENDNOTIFICATION"];
		// this.servicesHiddenFields = ["AVAILABLE_DATES","AVAILABLE_DAYS","UNAVAILABLE_TILL","STARTING_DATE","CLOSING_DATE","JOBSHEETLAYOUT", "APPOINTMENTFOR","SEID", "APPOINTMENTLOCATION", "APPOINTMENTID", "APPOINTMENTADDRESS", "APPOINTMENTDATEANDTIME", "RESCHEDULEDFROM", "SERVICEID", "RESCHEDULEDTO", "RESCHEDULEDREASON", "RESCHEDULEDNOTE", "CANCELLATIONREASON", "CANCELLATIONNOTE", "SERVICEAVAILABILITY", "AVAILABLE_CUSTOM_TIMING","UNAVAILABLE_FROM", "JOBSHEETSECTION"];
		
	},
	observeShow : function(){
		if(this.data.show !== undefined){
			this.setData('cxPropShow' , this.data.show);
		}
	}.observes('show').on('didConnect'),
	didConnect : function(){
		this.modalComp = this.$node.querySelector("lyte-modal").component;
	},
	moduleInit : function(selMod){
		var promise = {} , _self = this , modId = this.data.cxPropModId, field = this.data.cxPropField;
		this.criteriaObj = {};
		this.clearSearchAndFilter();
		this.data.queryParamObject.page = 1;
		if(selMod){
			modId = selMod;
		}else if(field && field.data_type){
			if(field && field.data_type === "lookup"){
				modId = field.lookup.module.id;
			}else if(field && field.data_type === "multiselectlookup"){
				modId = field.multiselectlookup.connected_module.id;
			}else if(field && field.data_type ==="multi_module_multi_select"){
				modId = this.defaultModuleOptions[0].id;
			}
		}

		// var modId = selMod ? selMod : this.data.cxPropType === "multi_module_multi_select" ? this.defaultModuleOptions[0].id : this.data.cxPropModId ;
		this.setData("cxPropModId" , modId);
		promise.module = this.fetchModule(modId);
		return Lyte.resolvePromises(promise).then(function(){
			_self.initReqResolved = true;
			if(_self.data.cxPropOldFlow){
				_self.getRecs();
			}else{
				_self.getRecords().then(function(){
					_self.setData("cxPropShow", true);// No I18n
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar(false);
					}
				}, function(){
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar(false);
					}
				});
			}
		})

	},
	fetchModule : function(moduleId){
		var _self = this , prom = {};
		if(moduleId === 'dummyModule'){
			if(this.data.cxPropFields && this.data.cxPropFields){
				this.data.cxPropFields.map(function(fi , ind){
					if(fi.visible === undefined){
						fi.visible = true;
					}
					if(fi.id === undefined){
						fi.id = ind;
					}
					fi.available_in_user_layout = true;
				})
			}
			var dummyModuleInfo = {api_name : "dummyModule" ,module_name : "dummyModule" , id : "dummyModule" , fields : this.data.cxPropFields , 'display_field' : {api_name : "Full_Name"} };
			this.data.cxPropModId = 'dummyModule';
			prom.module = new Promise(function(resolve){
				resolve(dummyModuleInfo);
			})
		}else{
			if(this.getMethods('fetchModuleData')){
				prom.module = this.executeMethod("fetchModuleData", moduleId) ;
			}else{
				prom.module = this.fetchModuleData(moduleId);
			}
		}
		if(this.data.cxPropRelatedId && !this.data.cxPropRelatedRecordData && !this.relatedRecPassed){
			if(this.getMethods('fetchModuleData')){
				prom.related_module = this.executeMethod("fetchModuleData", this.data.cxPropRelatedModuleId);
			}else{
				prom.related_module = this.fetchModuleData(this.data.cxPropRelatedModuleId);
			}
		}
		if(this.data.cxPropCvid){
			let modApiName = this.data.cxPropModuleApiName || "";
			if(!modApiName && moduleRecordMapping !== undefined){
				for(var key in moduleRecordMapping){
					if(moduleRecordMapping[key].id === moduleId){
						modApiName = moduleRecordMapping[key].api_name;
						break;
					}
				}
			}
			prom.custom_view = store.findRecord("custom_view" , this.data.cxPropCvid , {module : modApiName});
		}
		return Lyte.resolvePromises(prom).then(function(resp){
			var mod = Lyte.deepCopyObject(resp.module) , disp = {api_name : ""};
			if(!mod.custom_view || mod.module_name === 'Users'){
				mod.custom_view = {id : mod.api_name , fields : mod.module_name === 'Users' ? _self.setUserImageField(mod.fields) : mod.fields};
				_self.setData('disableFieldsEdit' , true);
			}else{
				_self.setData('disableFieldsEdit' , false);
			}
			if(resp.custom_view){
				mod.custom_view = Lyte.deepCopyObject(resp.custom_view);
			}
			if(!_self.modulesIdMap[mod.id]){
				_self.modulesIdMap[mod.id] = {};
				_self.modulesIdMap[mod.id].selectedIds = [];
				_self.modulesIdMap[mod.id].selectedRecs = [];
			}
			_self.modulesIdMap[mod.id].module = $L.extend(true , {} , mod);
			_self.modulesIdMap[mod.id].currentCV = mod.custom_view.id;
			_self.modulesIdMap[mod.id].cvDetails = {[mod.custom_view.id] : mod.custom_view};
			mod.selectedIds = $L.extend(true , [] , _self.modulesIdMap[mod.id].selectedIds);
			if(mod.display_field){
				disp = mod.fields.find(x => x.api_name === mod.display_field.api_name) || {api_name : ""};
			}
			_self.modulesIdMap[mod.id].displayField = disp;
			// var modMap = _self.modulesIdMap[mod.id];
			_self.setFieldsForTableAndColumns(mod);
			_self.setData({"module" : mod , 'cxPropModId' : mod.id , 'moduleName' : mod.module_name , 'totalRecordsCount' :  _self.data.cxPropTotalCount ? _self.data.cxPropTotalCount.toString() : '###'  , 'displayField' : disp.api_name , 'displayFieldLabel' : disp.field_label});
			if(["Products" , "Bundles__s"].includes(mod.api_name) && !_self.data.cxPropSearchPlaceholder){
				let field =  mod.fields.find(x => ["Product_Code" , "Bundle_Code" ].includes(x.api_name));
				if(field && field.visible){
					_self.setData('displayFieldLabel' , _self.data.displayFieldLabel + ' / ' + field.field_label);
				}
			}
			_self.setData({"currentcv" : _self.data.module.custom_view , 'filterInfo' : {}});
			if(resp.related_module){
				_self.setData("cxPropRelatedRecordData", [{id : _self.data.cxPropRelatedId, api_name : _self.getRelatedFieldApiName(res[1].api_name) , name : _cruxUtils.getI18n("crm.related.contact.account", mod.plural_label, _self.data.cxPropRelatedName)},
					{id : "cxAll", name : _cruxUtils.getI18n("crm.allcontact.show", mod.plural_label)}]);
					_self.setData("selectedHeaderValue", _self.data.cxPropRelatedId);
			}
			if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
				cruxAssets.showHideLoadingBar(false);
			}
			return mod;
		},function(res){
			if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
				cruxAssets.showHideLoadingBar(false);
			}
			var resp =  res ? JSON.parse(res.response) : {};
			if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
			{
				_cruxUtils.showPermissionDeniedModal();
			}
			return false;
		})
	},
	fetchModuleData : function(moduleId){
		var field = this.data.cxPropField , _self = this;
		if(field && field.data_type === "multiselectlookup"){
			return new Promise(function(resolve , reject){
				var prom = {} , relatedListParam = {module : field.module[0].module_name , status : "user_hidden,visible",include_inner_details : "fields.ui_type,fields.lookup,fields.formula,fields.rollup_summary,fields.field_label,fields.pick_list_values,fields.separator,fields.decimal_place"};
				if(_self.data.cxPropLayout){
					relatedListParam.layout_id = _self.data.cxPropLayout;
				}
				prom.relatedList = store.findRecord("related_list" , field.multiselectlookup.id , relatedListParam , {"Multi_select_lookup": "true"} , false ,{ version : 9 } );
				prom.connectedModule = store.findRecord("module", field.multiselectlookup.connected_module.id);
				prom.linkingModule = store.findRecord("module", field.multiselectlookup.linking_module.id);

				Lyte.resolvePromises(prom).then(function(res){
					_self.mxnRelatedList = res.relatedList.related_list[0];
					let linkingModFields = Lyte.deepCopyObject(res.linkingModule[0].fields) , connectedModule = Lyte.deepCopyObject(res.connectedModule[0]);
					linkingModFields.map(function(fi){
                        fi.field_label = fi.field_label + " (" + res.linkingModule[0].plural_label + ")";
						fi.api_name =  field.multiselectlookup.connectedlookup_apiname + "." + fi.api_name;
						fi.cxLinking = true;
					});
                    connectedModule.fields =  connectedModule.fields.concat(linkingModFields);
					let selFields = _self.mxnRelatedList.fields , selFieldsLen = selFields.length , columnFields = [];
					for(var i = 0 ; i < selFieldsLen ; i++){
                        columnFields.push(connectedModule.fields.find( x => x.id === selFields[i].id));
					}
					_self.mxnRelatedList.cxSelectedFields = columnFields;
					//sorting cases
					if(_self.mxnRelatedList.sort_by !== null){
                         _self.data.queryParamObject.sort_by = _self.mxnRelatedList.sort_by.api_name.split(".").length > 1 ? _self.mxnRelatedList.sort_by.api_name.split(".")[1] : _self.mxnRelatedList.sort_by.api_name;
						 _self.data.queryParamObject.sort_order = _self.mxnRelatedList.sort_order;
						 let sOrder = _self.mxnRelatedList.sort_order === 'asc' ? _cruxUtils.getI18n('crm.column.sort.asc') : _cruxUtils.getI18n('crm.column.sort.desc');
			             let fLabel = _self.mxnRelatedList.fields.find(x => x.api_name === _self.mxnRelatedList.sort_by.api_name).field_label;
						 Lyte.objectUtils(_self.data.filterInfo , 'add' , 'sort' , fLabel + " (" + sOrder + ")");
					}else{
						 _self.data.queryParamObject.sort_by = "id";
						 _self.data.queryParamObject.sort_order = "desc";
					}
                    //default queryParams for multiselect
					_self.data.queryParamObject.related_entity_id = _self.data.cxPropEntityId ? _self.data.cxPropEntityId : null;
					_self.data.queryParamObject.related_list = {id : field.multiselectlookup.id};
					_self.data.queryParamObject.related_module = {api_name : field.module[0].module_name};
					resolve(connectedModule);
				},function(res){
					reject(res); 
				});
			});
		}
		return new Promise(function(resolve , reject){
			store.findRecord("module", moduleId,{include : "custom_view,business_card_fields,lookup_field_properties"}).then(function(res){
				resolve(res[0]);
			},function(res){
				reject(res);
			});
		});
	},
	getRecords : function(from , value , element , callback , isParamUpdated){
		var customData = {} , _self = this , disp = [], i = 0 , j = 0 , pp = this.getData("perPage") , prom , modId = this.data.cxPropModId;
		var queryParam = isParamUpdated ? this.data.queryParamObject : this.constructQueryParams().qp;
		var qp = Object.assign( {}, queryParam);
		if(this.getMethods("beforeRequestChangeData")){
			this.executeMethod("beforeRequestChangeData", queryParam, undefined, this.data.cxPropField , customData);
		}
		if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
			cruxAssets.showHideLoadingBar(true);
		}
		if(this.getMethods("fetchRecords")){
			prom = this.executeMethod("fetchRecords", modId , qp );
		}else{
			prom = this.fetchRecords(modId , qp , customData);
		}
		return new Promise(function(resolve, reject){
			Lyte.resolvePromises(prom).then(function(res) { // No I18n
				var recs = res && res.length ? res : [] , len = recs.length;
				if(len){
					_self.setData("queryParamObject", queryParam);// No I18n
					for(; i<len && j<pp; i++, j++){
						disp[j] = recs[i];
					}
					// if(_self.data.cxPropDisabledList && _self.data.cxPropDisabledList.length){
					// 	_self.setDisableClass(recs);
					// }
					_self.setSelected(disp);
				}
				if(_self.data.totalRecordsCount === "###" && res){
					if(res.$ && res.$.meta && res.$.meta.more_records){ // Count resetting for listview component pagination handling. Because, the count api will trigger only click the ### key.
						_self.setData("totalCountForLV" , (pp * queryParam.page ) + 1);
					}else if(res.$ && res.$.meta && res.$.meta.more_records === false){
						_self.setData("totalCountForLV" , (pp * queryParam.page ) - (pp - recs.length));
					}
				}
				// else if(from != "change"){
				// 	_cruxUtils.showCustomAlert({params : {ltPropContentAlign : "center", ltPropSecondaryMessage : _cruxUtils.getI18n("crm.label.no.more.records"), ltPropButtons : [{"type":"accept","text": _cruxUtils.getI18n("crm.mb.newversion.msg4"),"appearance":"primary"}]}})//No I18n
				// 	return false;
				// }
				if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
					cruxAssets.showHideLoadingBar();
				}
				if(from !== "listview"){
					if(callback){
						callback();
					}
					_self.setData("cxPropPage" , 1);
					_self.setData("record", recs);// No I18n
				}
				resolve(recs);
				// return recs;
			}, function(res){
				if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
					cruxAssets.showHideLoadingBar();
				}
				var bool = true;
				if(_self.getMethods("onFetchRecordsFailure")){
					bool = _self.executeMethod("onFetchRecordsFailure", res);
				}
				if(bool !== false){
					_cruxUtils.showPermissionDeniedModal();
				}
				reject();
			});
		});
	},
	observeCount : function(){
		if(this.data.cxPropTotalCount){
			this.setData({'totalRecordsCount' : this.data.cxPropTotalCount.toString() , 'totalCountForLV' : this.data.cxPropTotalCount});
		}else{
			this.setData({'totalRecordsCount' : '###'});
		}
	}.observes('cxPropTotalCount').on('init'),
	constructQueryParams : function(){
		var Obj = this.getData("queryParamObject") , modId = this.data.cxPropModId , field = this.data.cxPropField , currentModalPage = this.data.currentModalPage;// No I18n
		Obj.page = (Obj.page) ? Obj.page : 1;
		Obj.per_page = Obj.per_page ? Obj.per_page : this.data.perPage;
		if(this.data.selectedHeaderValue && this.getMethods("fetchRecords")){
			if(this.data.selectedHeaderValue != "2"){
				Obj.relatedId = this.data.selectedHeaderValue;
				Obj.relationId = this.getRelationId();
			}
			else{
				delete Obj.relatedId;
				delete Obj.relationId;
			}
		}
		delete Obj.ids;
		// if(this.addMore && this.data.currentModalPage !== "selected"){
		// 	Obj.ids = this.assignedIds[modId];
		// 	Obj.comparator = "not_equal";
		// }else if(this.data.currentModalPage === "selected"){
		// 	Obj.ids = this.modulesIdMap[modId].selectedIds;
		// 	Obj.comparator = "equals";
		// }else if( this.data.currentModalPage === "unassign" ){
		// 	Obj.ids = this.assignedIds[modId];
		// 	Obj.comparator = "equals";
		// }
		var ids = this.modulesIdMap[modId].selectedIds;
		if( currentModalPage !== "multiList" && this.getMethods('fetchRecords')){      // || this.data.currentModalPage === "unassign"    selected and unassign page only have the specific ids to fetch,
			if(ids && ids.length){
				Obj.ids = ids;
				Obj.comparator = "equals";
			}else{
				delete Obj.comparator;
			}
		}
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				Obj[key] = this.data.cxPropQueryParam[key];
			}
		}
		if(this.data.cxPropEnableCustomview){
			Obj.cvid = this.modulesIdMap[this.data.module.id].currentCV;
			//Obj.cvid = this.data.currentcv.id;
		}else if(this.data.cxPropCvid){
			Obj.cvid = this.data.cxPropCvid;
		}else{
			Obj.fields = this.data.currentcv.fields.map(x => x.api_name).join();
		}
		this.setCriteriaObj(Obj , ids);
		if(field && field.data_type === "multiselectlookup"){  // special handling for multiselect lookup, Because there are different apis for assigned and unassigned records
			let ids = this.modulesIdMap[modId].selectedIds;
			if(currentModalPage === 'selected' && this.addMore && this.tempSelRecs && this.tempSelRecs.length){
				ids = this.tempSelRecs.map(x => x.id);
			}
			if(ids && ids.length){
				var comparator = currentModalPage === 'multiList' && this.addMore ? "not_in" : currentModalPage === 'selected' ? "in" : null;
				if(comparator){
					var cri = {'comparator' : comparator , field : {api_name : "id"} , value : ids};
                    if(!Obj.filters){
						Obj.filters = cri;
					}else{
						Obj.filters = {group : [cri , Obj.filters] , group_operator : "AND"};
					}
				}
				if(currentModalPage === 'selected' || currentModalPage === 'unassign'){
					Obj.temp_ids = ids;
				}
			}else{
				delete Obj.temp_ids;
			}
			if(this.data.currentModalPage === 'multiList'){
				Obj.feature = "mxn";
                Obj.fields = this.mxnRelatedList.cxSelectedFields.map( x => x.api_name);
			}else{
				Obj.feature = "data";
				Obj.fields = this.mxnRelatedList.cxSelectedFields.filter( x => !x.cxLinking).map( x => x.api_name);
			}
			Obj.fields = Obj.fields.concat(this.defaultRecGetFieldsForMultiSelect);
		}
		return {qp : Obj};
	},
	setCriteriaObj : function(obj , ids){
		//setting the criteria object for filter and search
		//search criteria should be merged with filter criteria and default criteria 
		var cri , searchFormat = this.data.cxPropSearchFormat , defaultCri = this.defaultCriteria;
		if(this.criteriaObj.filter){
			cri = this.criteriaObj.filter;
		}
		if(this.criteriaObj.search){
			if(searchFormat){
				cri = cri ? this.joinSearchApiCriteria(cri , this.criteriaObj.search) : this.criteriaObj.search;
			}else{
				cri =  cri && Object.keys(cri).length ? {group : [cri , this.criteriaObj.search] , group_operator : "AND"} : this.criteriaObj.search;
			}
		}
		if(this.relatedRecCriteria){ //criteria for related record
			if(searchFormat){
				cri = cri ? this.joinSearchApiCriteria(cri , this.relatedRecCriteria) : this.relatedRecCriteria;
			}else{
				cri =  cri && Object.keys(cri).length ? {group : [cri , this.relatedRecCriteria] , group_operator : "AND"} : this.relatedRecCriteria;
			}
			// cri = !Object.keys(cri).length ? this.relatedRecCriteria : {group : [cri , this.relatedRecCriteria] , group_operator : "AND"};
		}
		if(!this.getMethods('fetchRecords') && ids && ids.length){  //Selected Ids criteria handling for selected page
			var idCri = {'comparator' : 'equals' , field : {api_name : "id"} , value : ids};
			if(searchFormat){
				idCri = this.formatCriteriaForSearchAPI(idCri);
				cri = cri ? this.joinSearchApiCriteria(cri , idCri) : idCri;
			}else{
				cri =  cri && Object.keys(cri).length ? {group : [cri , idCri] , group_operator : "AND"} : idCri;
			}
			// cri = !Object.keys(cri).length ? idCri : {group : [cri , idCri] , group_operator : "AND"};
		}
		if(defaultCri){
			if(searchFormat){
				cri = cri ? this.joinSearchApiCriteria(cri , defaultCri) : defaultCri;
			}else{
				cri =  cri && Object.keys(cri).length ? {group : [cri , defaultCri] , group_operator : "AND"} : defaultCri;
			}
		}

		if(cri){
			obj.filters = cri;
		}else{
			delete obj.filters;
		}
		// if(this.criteriaObj.cross_filters){
		// 	obj.cross_filters = this.criteriaObj.cross_filters;
		// }else{
		// 	delete obj.cross_filters;
		// }
	},
	setUserImageField : function(fields){
		fields.forEach(function(item){
			if(item.api_name === 'last_name'){
				item.yieldName = "last_name";
			}
		})
	},
	setFieldsForTableAndColumns : function(mod , reset){
		var cxType = this.data.cxPropType , tableFields = this.getData("cxPropFields") || [] , field = this.data.cxPropField , showAllFields = this.data.cxPropShowAllFields;
		if(!tableFields.length){
			if(field && field.data_type){
				if(field.data_type === "lookup"){
					tableFields = mod.lookup_field_properties.fields;
				}else if(field.data_type === "multiselectlookup"){
					tableFields = this.mxnRelatedList.cxSelectedFields;
				}else{
					tableFields = mod.custom_view.fields;
				}
			}else{
				if((cxType === "single" || cxType === "multiple") && !this.data.cxPropCvid){
					let lProp = mod.lookup_field_properties;
					tableFields = lProp && lProp.fields.length && lProp.fields || mod.fields;
				}else{
					tableFields = mod.custom_view.fields;
				}
			}
		}
		var moduleFields = mod.fields;
		if(this.getMethods("onBeforeSetFields")){
			moduleFields = this.executeMethod("onBeforeSetFields" , moduleFields);
		}else if(cxType === "single" && !showAllFields && mod.id !== "dummyModule"){     //For multi-lookup they are showing the all fields in this table.
			var fieldsLen = moduleFields.length , preventColumns = this.getPreventColumns(mod.module_name);
			for(var i = 0 ; i < fieldsLen ; i++){
				// allowEncFld = false;
				// if (moduleFields[i].crypt !== null && this.data.cxPropAllowEncryptedFields && moduleFields[i].data_type !== 'datetime') { //No I18N
				// 	allowEncFld = true;
				// }
				var hideTheField = moduleFields[i].show_type === 17 || (moduleFields[i].show_type === 0 && moduleFields[i].column_name !== 'FULLNAME') ||
				(moduleFields[i].filterable === false  && (moduleFields[i].column_name !== 'DESCRIPTION' && moduleFields[i].column_name !== 'SHAREDTO' && moduleFields[i].api_name !=='zohoshowtime__Total_Revenue') && (moduleFields[i].address && (moduleFields[i].address.type !== 'latitude' && moduleFields[i].address.type !== 'longitude'))) ||
				moduleFields[i].searchable === false  || moduleFields[i].virtual_field || (moduleFields[i].crypt !== null && moduleFields[i].crypt !== undefined && !this.data.cxPropAllowEncryptedFields && moduleFields[i].data_type !== 'datetime');
				if((hideTheField || moduleFields[i].visible === false || (preventColumns.indexOf(moduleFields[i].column_name) > -1)) && [777, 776].indexOf(moduleFields[i].ui_type) === -1 ){
					moduleFields.splice(i, 1);
					i--;fieldsLen--;
					continue;
				}
				if(!moduleFields[i].sortable){
					moduleFields[i].cxPropClass = "cursorDefault";
				}
			}
		}else if(field && field.data_type === "multiselectlookup"){
            if(this.data.currentModalPage === 'unassign'){
                moduleFields.forEach(function(fi){
					if(fi.cxLinking){
						fi.cxPropDisabled = false;
						fi.visible = true;
					}
				});
			}else{
				 moduleFields.forEach(function(fi){
					if(fi.cxLinking){
						fi.cxPropDisabled = true;
						fi.visible = false;
					}
				});
			}
		}
		mod.fields = moduleFields;
		var newTableFields = [];
		if(tableFields.length){
			tableFields.map(function(fi){
				if(moduleFields.find( x => x.id === fi.id)){
					newTableFields.push(fi);
				}
			});
		}
		Lyte.objectUtils(mod.custom_view , "add" , "fields" , newTableFields);
		this.setData("fieldsInfo.filter" , $L.extend(true , [] , moduleFields.filter(x => !x.cxLinking))); //this.getDefaultFilterFields()
		if(reset){ //Add More case, we need to reset the table fields
			this.setData("module" , mod);
		}
	},
	getPreventColumns : function(moduleName){
		var prevColumns = ["CURRENCYISOCODE","SCORE","POSITIVE_SCORE","NEGATIVE_SCORE","TP_SCORE","TP_POSITIVE_SCORE","TP_NEGATIVE_SCORE","LEADSCORE"];
		switch (moduleName) {
			case "Leads" :
				prevColumns.push("QUALIFICATIONDURATION");
				break;
			case "Products" :
				prevColumns.push("ACTIVE");
				break;
			case "Cases" :
			case "Solutions":
				prevColumns.push("ADDCOMMENT");
				break;
			case "Tasks" :
				prevColumns.push("REMINDAT","SENDNOTIFICATION");
				break;
			case "Appointments" :
				prevColumns.push("RESCHEDULEDFROM","REMINDER","ENDTIME");
				break;
			case "Services" :
				prevColumns.push("AVAILABLE_DATES","AVAILABLE_DAYS","UNAVAILABLE_TILL","STARTING_DATE","CLOSING_DATE","JOBSHEETLAYOUT", "APPOINTMENTFOR","SEID", "APPOINTMENTLOCATION", "APPOINTMENTID", "APPOINTMENTADDRESS", "APPOINTMENTDATEANDTIME", "RESCHEDULEDFROM", "SERVICEID", "RESCHEDULEDTO", "RESCHEDULEDREASON", "RESCHEDULEDNOTE", "CANCELLATIONREASON", "CANCELLATIONNOTE", "SERVICEAVAILABILITY", "AVAILABLE_CUSTOM_TIMING","UNAVAILABLE_FROM", "JOBSHEETSECTION");
				break;
			case "DealHistory" :
				prevColumns.push("LASTACTIVITYTIME");
				break;
			default:
				if(moduleName.startsWith("Orchestration")){
					prevColumns.push("SMOWNERID");
				}
				break;
		}
		return prevColumns;
	},
	// setHeader : function(){
	// 	var mod = this.getData("module") , moduleInfo = this.data.moduleInfo;// No I18n
	// 	var fields = mod.fields, customView = false;
	// 	if(this.getData("cxPropFields")){
	// 		customView = true;
	// 		fields = this.getData("cxPropFields");//No I18n
	// 	}
	// 	else if(mod.custom_view && mod.custom_view.fields){
	// 		customView = true;
	// 		fields = mod.custom_view.fields;
	// 	}
	// 	var filterField = function(fields, id){
	// 		return fields.filter(function(f){
	// 			return f.id == id;
	// 		})[0];
	// 	}
	// 	for(var i=0; i<fields.length; i++){
	// 		if(customView){
	// 			fields[i] = filterField(mod.fields, fields[i].id);
	// 		}
	// 		if(!fields[i]){
	// 		    fields.splice(i, 1);
	// 		    i--;
	// 			continue;
	// 		}
	// 		if(fields[i].id == mod.display_field.id || (mod.display_field.api_name == "Full_Name" && fields[i].column_name == "LASTNAME") || fields[i].column_name == "POTENTIAL_NAME" || fields[i].column_name == "POTENTIALID"){
	// 			if(fields[i].cxDisplayLinkTo != false){
	// 				fields[i].yieldName = "aTag";
	// 			}
	// 			if(!customView){
	// 				break;
	// 			}
	// 		}
	// 		else if(fields[i].data_type == "lookup"){
	// 			if(!fields[i].cxLookupModuleName && typeof moduleRecordMapping != undefined){
	// 				var lMod = moduleRecordMapping[fields[i].lookup.module.api_name] , name = lMod.module_name ? lMod.module_name : lMod.name;
	// 				fields[i].cxLookupModuleName = name;
	// 			}
	// 			if(fields[i].cxLookupModuleName){
	// 				fields[i].yieldName = "lookup";
	// 			}
	// 		}else if(fields[i].data_type == "phone" && customView){
	// 			fields[i].yieldName = "phone";
	// 		}
	// 		if(!fields[i].sortable){
	// 			fields[i].cxPropClass = "cursorDefault";
	// 		}
	// 	}
	// 	this.setData("header", fields);// No I18n
	// 	this.setData("fieldsInfo.header" , fields);
	// 	this.setData("fieldsInfo.filter" , this.getDefaultFilterFields());
	// },
	// getDefaultFilterFields : function(){
	// 	var arr = [{
	// 		"cxAccordion" : true ,
	// 		"cxAccordionLabel" : _cruxUtils.getI18n("crm.filter.header.secton.fields"),
	// 		"cxAccordionName" : "moduleFields" ,
	// 		"cxOpenState" : true ,
	// 		"cxSort" : true ,
	// 		"cxFields" : $L.extend(true , [] , this.data.module.fields)
	// 	}];
	// 	return arr;
	// },
	getDefaultCustomCategory : function(){
		return [
			{
				"cxAccordion": true,
				"cxAccordionLabel": "Favorites",
				"cxAccordionName": "cxFavorites",
				"cxViews": [],
				"cxParams": {
					"favourite": true
				},
				"cxSortable": true,
				"cxPreventClosing": true
			},
			{
				"cxAccordion": true,
				"cxAccordionLabel": "Created By Me",
				"cxAccordionName": "Created_By_Me",
				"cxViews": [],
				"cxParams": {
					"scope": "created_by_me"
				}
			},
			{
				"cxAccordion": true,
				"cxAccordionLabel": "Shared With Me",
				"cxAccordionName": "Shared_With_Me",
				"cxViews": [],
				"cxParams": {
					"scope": "shared_with_me"
				}
			},
			{
				"cxAccordion": true,
				"cxAccordionLabel": "Public Views",
				"cxAccordionName": "Public_Views",
				"cxViews": [],
				"cxParams": {
					"scope": "public_views"
				}
			},
			{
				"cxAccordion": true,
				"cxAccordionLabel": "Other User's Views",
				"cxAccordionName": "Other_Users_Views",
				"cxViews": [],
				"cxParams": {
					"scope": "other_users_views"
				}
			}
		];
	},

	methods : {
		beforeOpenModal : function(){
			if(this.initReqResolved){
				return true;
			}
			var x = this.$node.querySelector("#modalElem").component.childComp ;// No I18n
			if(x){
				var closeBtn = x.querySelector(".lyteModalClose");// No I18n
				if(closeBtn){
					closeBtn.dataZcqa = "lookup_closeIcon";// No I18n
				}
			}
			this.setData('prefixYield' , this.data.cxPropType === 'single');
			this.setData("perPage" , this.data.cxPropPerPage);
			if(this.data.cxPropField && this.data.cxPropField.data_type === "multiselectlookup"){
				this.setData("selectedRecsLength" , 0);
			}
			// var qp = this.data.cxPropQueryParam;
			// if(qp && qp.filters){
			// 	this.defaultCriteria = qp.filters;
			// 	delete qp.filters;
			// }else 
			var defaultCri = this.data.cxPropDefaultCriteria && this.data.cxPropDefaultCriteria[0] ? this.data.cxPropDefaultCriteria[0] : this.data.cxPropDefaultFilterCriteria ? this.data.cxPropDefaultFilterCriteria : null;
			if(defaultCri){
				if(this.data.cxPropSearchFormat){
					this.defaultCriteria = this.formatCriteriaForSearchAPI(defaultCri);
				}else{
					this.defaultCriteria = defaultCri;
				}
			}else if(this.data.cxPropDefaultCriteriaStr){
				this.defaultCriteria = this.data.cxPropDefaultCriteriaStr;
			}
			this.tempSelRecs = [];
			if(this.data.currentModalPage === 'multiList' || this.data.currentModalPage === "singleList" || this.data.cxPropType === "multiple"){
				this.moduleInit();
			}
			this.setData('isRecordsEdited' , false);
			return false;
			// this.setData("sortedColumn", "");// No I18n    Used for crux-list-view. If we set the moduleInfo They can handle this property.

		},
		onModuleSelect : function(event, id){
			if(this.data.currentModalPage === "multiList"){
				this.setData("cxPropModId" , id);
				this.clearSearchAndFilter();
				this.data.queryParamObject.page = 1;
				this.moduleInit(id);
			}else{
				this.showSelectedModule(id);
			}
		},
		onFilterChange : function(){
			this.setData("showApplyFilter" , true);
		},
		onBeforeShowCVDropdown : function(categoryList){
			var fetchData = false;
			if(categoryList.customview.filter(cvData => !cvData.dataFetched).length > 0){
				fetchData = true;
			}
			if(this.getMethods('beforeShowCvDropdown')){
				fetchData = this.exexuteMethod('beforeShowCvDropdown' , categoryList);
			}
			return { fetchCustomViewData : fetchData }
		},
		onSelectCV : function(rec){
			var module = this.data.module, modMap = this.modulesIdMap[module.id] , prom = {} , _self = this , selectedCv = rec.selected;
			modMap.currentCV = selectedCv.id;
			this.data.queryParamObject.page = 1;
			this.clearSearchAndFilter();
			if(modMap.cvDetails[selectedCv.id]){
				prom.cv = new Promise(function(resolve){
					resolve(modMap.cvDetails[selectedCv.id]);
				})
			}
			if(this.getMethods('fetchCustomView')){
				prom.cv = this.executeMethod('fetchCustomView' , selectedCv , module);
			}else{
				prom.cv = store.findRecord("custom_view", selectedCv.id , {'module' : module.api_name});
			}
			prom.rec = this.getRecords();
			Lyte.resolvePromises(prom).then(function(res){
				var cv = res.cv;
				modMap.cvDetails[selectedCv.id] = cv;
				_self.setData('currentcv' , cv);
			})
		},
		onCheckboxChange : function(record , type){
			var modMap = this.modulesIdMap[this.data.module.id], modId = this.data.module.id , field = this.data.cxPropField , ind;
			// if(this.data.currentModalPage === 'selected'){ var index
			// 	if(type === 'selected'){
			// 		if(!this.moduleTempSelIds[modId]){
			// 			this.moduleTempSelIds[modId] = [];
			// 		}
			// 		this.moduleTempSelIds[modId].push(record.id);
			// 	}else{
			// 		index = this.moduleTempSelIds[modId].findIndex(x => x === record.id);
			// 		if(index !== -1){
			// 			this.moduleTempSelIds[modId].splice(index , 1);
			// 		}
			// 	}
			// }else{
				if(field && field.data_type === "multiselectlookup" && this.addMore){  //For now. because no api.
					if(type === 'selected'){
                        this.tempSelRecs.push(record.id);
						this.setData("selectedRecsLength" , this.data.selectedRecsLength + 1);
					}else{
                        ind = this.tempSelRecs.findIndex(x => x.id === record.id);
						this.tempSelRecs.splice(ind , 1);
						this.setData("selectedRecsLength" , this.data.selectedRecsLength - 1);
					}
				}else{
            	   if(type === 'selected'){
					    modMap.selectedIds.push(record.id);
					    modMap.selectedRecs.push(record);
					    this.setData("selectedRecsLength" , this.data.selectedRecsLength + 1);
					    this.unassignRecordsEdit('add', modId, record.id);
				    }else{
					    ind = modMap.selectedIds.findIndex(x => x === record.id);
					    modMap.selectedIds.splice(ind , 1);
					    modMap.selectedRecs.splice(ind , 1);
					    this.setData("selectedRecsLength" , this.data.selectedRecsLength - 1);
					    this.unassignRecordsEdit('remove', modId, record.id);
				    }
				}
				if(this.data.selectedRecsLength){
					this.setData('isRecordsEdited' , true);
				}

				if(this.getMethods('onCheckboxChanged')){
					this.executeMethod('onCheckboxChanged' , record , type);
				}
			// }
		},
		onListviewPaginateFn : function(page,pp){
			this.data.queryParamObject.page = page;
			this.data.queryParamObject.per_page = pp;
			return this.getRecords('listview' , undefined , undefined , undefined , true);
		},
		onSortUnsortClickFn : function(type , field){
			var cxField = this.data.cxPropField;
			this.data.queryParamObject.sort_by = field.api_name;
			this.data.queryParamObject.sort_order = type;
			this.data.queryParamObject.page = 1;
			var sOrder = type === 'asc' ? _cruxUtils.getI18n('crm.column.sort.asc') : _cruxUtils.getI18n('crm.column.sort.desc');
			Lyte.objectUtils(this.data.filterInfo , 'add' , 'sort' , field.field_label + " (" + sOrder + ")");
			if(cxField && cxField.data_type === "multiselectlookup"){
				this.updateSortForMxN(type , field);
			}
			return this.getRecords(undefined , undefined , undefined , undefined , true);
		},
		// checkUnCheck : function(type , modIndex , record){
		// 	var mod = this.data.selectedModules[modIndex] , modId = mod.id , currentPage = this.data.currentModalPage , recLen , i;
		// 	if(currentPage === 'selected' && !this.moduleTempSelIds[modId]){
		// 		this.moduleTempSelIds[modId] = [];
		// 	}
		// 	var selectedIds = currentPage === 'selected' ? this.moduleTempSelIds[modId] : mod.selectedIds;
		// 	switch (type) {
		// 		case 'check':
		// 			selectedIds.push(record.id);
		// 			break;
		// 		case 'unCheck':
		// 			selectedIds.splice(selectedIds.findIndex(x => x === record.id) , 1);
		// 			break;
		// 		case 'selectAll':
		// 			selectedIds = mod.records.map( x => x.id);
		// 			recLen = mod.records.length;
		// 			for(i = 0 ; i <= recLen ; i++){
		// 				if(!mod.records[i].cx_checked){
		// 					Lyte.objectUtils(mod.records[i], 'add' , 'cx_checked' , true);
		// 				}
		// 			}
		// 			break;
		// 		default:
		// 			selectedIds = [];
		// 			recLen = mod.records.length;
		// 			for(i = 0 ; i <= recLen ; i++){
		// 				if(mod.records[i].cx_checked){
		// 					Lyte.objectUtils(mod.records[i], 'add' , 'cx_checked' , false);
		// 				}
		// 			}
		// 			break;
		// 	}
		// 	if(currentPage === 'selected'){
		// 		this.moduleTempSelIds[modId] = selectedIds;
		// 	}else{
		// 		mod.selectedIds = selectedIds;
		// 	}
		// },
		onBeforeAddEmailParticipants : function(value){
			var exp = /^[A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF_]([A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF!#$%&'*+-/=?^_`{|}~.]*)@(?=.{4,256}$)(([A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)(([-_]*[A-Za-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)[.])+[A-Za-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,22}$/;
			return exp.test(value); //test the mail id
		},
		onAddEmailParticipant : function(mail){
			var rec = {'Email' : mail , 'name' : mail , 'id' : mail};
			var modMap = this.modulesIdMap['additional_participant'];
			modMap.selectedIds.push(rec.id);
			modMap.selectedRecs.push(rec);
			// this.mailParticipants.push(rec);
			this.unassignRecordsEdit('add' , 'additional_participant' , rec.id);
			this.setData("selectedRecsLength" , this.data.selectedRecsLength + 1);
		},
		onRemoveMailPart : function(mail){
			// var ind = this.mailParticipants.findIndex(x => x.id === mail.id);
			// this.mailParticipants.splice(ind , 1);
			var modMap = this.modulesIdMap['additional_participant'];
			var ind = modMap.selectedIds.findIndex(x => x === mail.id);
			modMap.selectedIds.splice(ind , 1);
			modMap.selectedRecs.splice(ind , 1);
			this.unassignRecordsEdit('add' , 'additional_participant' , rec.id);
			this.setData("selectedRecsLength" , this.data.selectedRecsLength - 1);
		},
		onSaveCustomViewFn : function(fields){
			var promise , _self = this;
			if(this.getMethods("onSaveColumns")){
				 /**
				 * @method onSaveColumns
				 * @author manikaraja.p
				 * @version 1.0.0
				 * Called on saving the columns
				 */
				promise = this.executeMethod("onSaveColumns" , fields , this.data.currentcv , this.data.module.id);
			}else{
				promise = this.updateColumnFields(fields);
			}
			var listElem = $L("crux-list-view" , _self.modalComp.childComp)[0];
			promise.then(function(){
				var module = $L.extend(true , {} , _self.data.module);
				var cview = $L.extend(true , {} , _self.data.currentcv);
				cview.fields = fields;
				if(listElem){ //Its need to be set before set the currentcv
					var comp = listElem.component;
					comp.setData("cv_mod_fields" ,new Map() );    // Currently we does not have support for field column width save case. So, We cleared this value. If not, It cause the issue. Because this component does not only dependent to store.
				}
				Lyte.objectUtils(_self.data.module, "add" , "custom_view.fields" , fields);
				// Lyte.objectUtils(_self.data.currentcv, "add" , "fields" , fields);
				_self.modulesIdMap[module.id].module.custom_view.fields = fields;
				if(comp){
					comp.hidePopover();
				}
				var cFun = function(){
					_self.setData("currentcv" ,cview );
				};
				_self.getRecords(undefined , undefined , undefined , cFun);
			},function(){
				//debugger
			});
		},
		renderNext : function(value , element){
			this.rendPage('next',value,element)//no i18n
		},
		renderPrev : function(value , element){
			this.rendPage('prev',value,element)//no i18n
		},
		rendNext : function(index ){
			var sModule = this.data.selectedModules[index];
			sModule.qp.page += 1;
			this.fetchMultiModuleRecords(index);//no i18n
		},
		rendPrev : function(index ){
			var sModule = this.data.selectedModules[index];
			sModule.qp.page -= 1;
			this.fetchMultiModuleRecords(index);//no i18n
		},
		onShowFn : function(){
			if(this.getMethods("onShow")){
				/**
				 * @method onShow
				 * @author manikaraja.p
				 * @version 1.0.0
				 * Called on show of modal
				 */
				this.executeMethod("onShow");//No I18n
			}
		},
		//below code needs to verify
		beforeCloseModal : function(event){
			this.setData("queryParamObject", {});// No I18n
			if(this.getMethods("onBeforeClose")){
				/**
				 * @method onBeforeClose
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called on before close of modal
				 */
				return this.executeMethod("onBeforeClose");//No I18n
			}
			var parentElement = event.target.parentNode;   //If overlayClose is true, While clicking the manage columns menu, The modal gets closed. So, preventing that case.
			if(parentElement && parentElement.classList.contains('cxLvTableManageMenuBody')){
				return false;
			}
		},
		closeModal : function(){
			this.setData("queryParamObject", {});// No I18n
			if(this.getMethods("onClose")){
				/**
				 * @method onClose
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called on close of modal
				 */
				this.executeMethod("onClose");//No I18n
			}
		},
		selectSingle : function(id, a,b, invoker){
			if(invoker != "script"){
				this.selectTheSingle(id);
			}
		},
		associateSearchClick : function(inp){
			var icon = inp.querySelector(".searchIcon");//no i18n
			var _this = this;
			icon.onclick = function(){
				_this.searchSetValueFn.call(undefined, inp , true);
			}
		},
		associateSearchClickFn : function(inp){
			var icon = inp.querySelector(".searchIcon");//no i18n
			var _this = this;
			icon.onclick = function(){
				var value = inp.querySelector("input");//no i18n
				_this.removablesearchSetValueFn.call(_this, undefined, undefined, undefined, value.value, true);
			}
		},
		setHeaderOption : function(event , id){
			this.records = [];
			if(id !== "cxAll"){
				let cri = {'field' : {api_name : this.data.cxPropRelatedRecordData.find(x => x.id === id).api_name } , 'comparator' : 'equals' , 'value' : id};
				this.relatedRecCriteria = this.data.cxPropSearchFormat ? this.formatCriteriaForSearchAPI(cri) : cri;
			}else{
				delete this.relatedRecCriteria;
			}
			this.getRecords();
			// this.rendPage("change")		//No I18n
		},
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		onDropdownClose : function(event, comp){
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		},
		onModalCloseFn : function(){
			this.clearSearchAndFilter();
			this.clearRecords();
			this.setData({"module" : {}, "currentcv" : {}});
			this.setData("isRecordsEdited" , false);
			var listview = $L("crux-list-view" , this.modalComp.childComp)[0];
			if(listview){
				listview.component.setData("cv_mod_fields" ,new Map() );    // Currently we does not have support for field column width save case. So, We cleared this value. If not, It cause the issue. Because this component does not only dependent to store.
			}
			// this.setData("currentcv" , {});
			this.assignedIds = {};
			this.unassignIds = {};
			this.initReqResolved = false;
			this.addMore = false;
			if(this.getMethods('onClose')){
				this.executeMethod('onClose', this.$node);
			}
		},
		onYieldConstruction : function(yields){
			if(yields && yields.prefix){
				yields.prefix[0] = {fixed : 'enable' , class : "cxLvEditIconCol"};
				return yields;
			}
		},
		onBeforeShowErrorAlertFn : function(type){
			if(this.getMethods('onBeforeShowErrorAlert')){
				return this.executeMethod('onBeforeShowErrorAlert' , type);
			}
		},
		searchBarClear : function(){
			if(!this.data.cxPropFetchRecordsOnEnter || (this.data.cxPropFetchRecordsOnEnter && this.criteriaObj.search)){
				delete this.criteriaObj.search;
				this.data.queryParamObject.page = 1;
				this.getRecords();
			}
		},
		onCheckboxBeforeCheckedFn : function(record){
			var dList = this.data.cxPropDisabledList || [];
			if(dList.includes(record.id)){
				return false;
			}
			return true;
		}
	},
	actions : {
		applyFilter : function(){
			var filterComp = $L("crux-smart-filter" , this.modalComp.childComp)[0];
			var filters = filterComp.getFilterCriteria();
			if(Object.keys(filters.queryParams).length){
				this.data.queryParamObject.page = 1;
				this.criteriaObj.filter = this.data.cxPropSearchFormat ? this.formatCriteriaForSearchAPI(filters.queryParams.filters) : filters.queryParams.filters;
				// this.criteriaObj.cross_filters = filters.queryParams.cross_filters;

				var selFields = filterComp.getSelectedFields();
				Lyte.objectUtils(this.data.filterInfo , 'add' , 'filter' , selFields.map(x => x.field_label).join());
			}else{
				delete this.criteriaObj.filter;
				// delete this.criteriaObj.cross_filters;
				return;
			}
			if(this.getMethods("onApplyFilter")){
				this.executeMethod("onApplyFilter", filters, this.$node);//No I18n
			}
			this.data.queryParamObject.page = 1;
			this.setData({"showApplyFilter" : false , 'filterApplied' : true});
			this.getRecords();
		},
		clearFilter : function(){
			if(this.criteriaObj.filter){
				var filterElem = $L("crux-smart-filter" , this.modalComp.childComp)[0];
				filterElem.component.clearFields();
			}
			if(this.data.filterApplied){
				delete this.criteriaObj.filter;
				this.data.queryParamObject.page = 1;
				this.getRecords();
			}
			Lyte.objectUtils(this.data.filterInfo , 'delete' , 'filter');
			this.setData({"showApplyFilter" : false , 'filterApplied' : false});
			if(this.getMethods("onClearFilter")){
				this.executeMethod("onClearFilter");//No I18n
			}
		},
		unsortFn : function(){
			delete this.data.queryParamObject.sort_by;
			delete this.data.queryParamObject.sort_order;
			this.data.queryParamObject.page = 1;
			Lyte.objectUtils(this.data.filterInfo , 'delete' , 'sort' );
			if(this.data.cxPropField && this.data.cxPropField.data_type === "multiselectlookup"){
				this.updateSortForMxN(undefined , "unsort");
			}
			return this.getRecords('listview' , undefined , undefined , undefined , true);
		},
		moveToSelectedPage : function(){
			if(this.data.currentModalPage === "multiList" && !this.data.cxPropPreventSelectionPage && !this.data.cxPropStayOnSelectPage){
				this.data.queryParamObject.page = 1;
				this.setData({"currentModalPage" : "selected"}); //NO I18n
				this.clearSearchAndFilter();
				this.getRecords();
				// this.moduleTempSelIds = {};
			}
		},
		removeRecFromSelected : function(recordObj ,mod , index){
			// var removeRecs = this.moduleTempSelIds , selMap ,modMap;
			// for(var modId in removeRecs){
			// 	var len = removeRecs[modId].length , modMap = this.modulesIdMap[modId] , selMap = this.data.selectedModules;
			// 	var selModIndex = selMap.findIndex(x => x.id === modId);
			// 	selMap = this.data.selectedModules[selModIndex];
			// 	if(removeRecs[modId].length){
			// 		for(var i = 0 ; i < len ; i++){
			// 			var sInd = modMap.selectedIds.findIndex(function(x){ return x === removeRecs[modId][i]; });
			// 			modMap.selectedIds.splice(sInd , 1);
			// 			modMap.selectedRecs.splice(sInd , 1);
			// 			if(this.data.cxPropType === "multi_module_multi_select"){
			// 				Lyte.arrayUtils(selMap.records, "removeAt" ,sInd , 1 );
			// 				if(!modMap.selectedIds.length){
			// 					Lyte.arrayUtils(this.data.selectedModules, "removeAt" ,selModIndex , 1 );
			// 				}
			// 				selMap.page = 1;
			// 			}
			// 			this.setData('selectedRecsLength' , this.data.selectedRecsLength - 1);
			// 		}
			// 	}
			// }
			// if(this.data.cxPropType === "multiple"){
			// 	this.data.queryParamObject.page = 1;
			// 	this.getRecords();
			// }
			var field = this.data.cxPropField;
			this.setData('isRecordsEdited' , true);
			if(field && field.data_type === "multiselectlookup" && this.addMore){  //For now. because no api.
                var ind = this.tempSelRecs.findIndex(x => x.id === recordObj.id);
				this.tempSelRecs.splice(ind , 1);
			}else{
                var modMap = this.modulesIdMap[mod.id];
			    var sInd = modMap.selectedIds.findIndex(function(x){ return x === recordObj.id; });
			    modMap.selectedIds.splice(sInd , 1);
			    modMap.selectedRecs.splice(sInd , 1);
				this.unassignRecordsEdit('remove' ,mod.id , recordObj.id );
			}
			if(this.data.cxPropType === "multi_module_multi_select"){
				var sModule = this.data.selectedModules[index];
				Lyte.arrayUtils(sModule.records, "removeAt" ,sInd , 1 );
				// var recIndex = sModule.selectedIds.findIndex(x => recordObj.id === x);
				// if(recIndex !== -1){
				// 	sModule.selectedIds.splice(recIndex , 1);
				// }
				sModule.selectedIds = modMap.selectedIds;
				if(sModule.selectedIds.length){
					sModule.qp.ids = sModule.selectedIds.join();
					this.fetchMultiModuleRecords(index);
				}else{
					this.setModuleDropdownOptions();
					Lyte.arrayUtils(this.data.selectedModules , "removeAt" , index , 1);
				}
			}else{
				var currentRecs = $L("crux-list-view" , this.modalComp.childComp)[0].component.data.LvContent;
				if(currentRecs.length - 1 === 0 && this.data.cxPropPage !== 1){
					this.setData('cxPropPage' , this.data.cxPropPage - 1);
					this.data.queryParamObject.page = this.data.cxPropPage;
				}
				this.getRecords();
			}
			this.setData('selectedRecsLength' , this.data.selectedRecsLength - 1);
			if(this.getMethods("onRemoveSelected")){
				this.executeMethod("onRemoveSelected" , recordObj , mod.id);//No I18n
			}
			// this.moduleTempSelIds = {};
		},
		unassignAllRecords : function(){
			var _self = this;
			function acceptFn(){
				var modMap = _self.modulesIdMap , copyModMap = $L.extend(true , {} , _self.modulesIdMap) , len , i;
				for(var key in modMap){
					modMap[key].selectedIds = [];
					modMap[key].selectedRecs = [];
				}
				_self.setData({'selectedModules' : [] , 'selectedRecsLength' : 0});
				for(var tkey in copyModMap){
					len = copyModMap[tkey].selectedIds.length;
					for(i = 0 ; i < len ; i++){
						_self.unassignRecordsEdit("remove" , tkey , copyModMap[tkey].selectedIds[i]);
					}
				}
				if(_self.getMethods("onUnassignAll")){
					_self.executeMethod("onUnassignAll" , this.unassignIds);//No I18n
				}
				_self.setData('isRecordsEdited' , true);
			}
			_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : "Are you sure want to remove the all Participants" , ltPropSecondaryMessage : "All selected Participants will be removed from the participant list. This cannot be undone." , ltPropButtons :        //no i18n
			[{"type":"reject","text":_cruxUtils.getI18n("crm.button.cancel"),"appearance":"default"},{"type":"accept","text": "Yes, Confirm" ,"appearance":"failure" }]} ,accept : acceptFn }); //no i18n
		},
		// unassignRecords : function(type){
		// 	var _this = this ,records = this.data.record , ind , modId = this.data.cxPropModId , cxType = this.data.cxPropType , sModules = this.data.selectedModules;
		// 	function acceptFn(){
		// 		if(_this.getMethods("onUnassign")){
		// 			var uRecs = {};
		// 			if(type === 'all'){
		// 				uRecs = _this.assignedIds;
		// 			}else{
		// 				if(cxType === "multi_module_multi_select"){
		// 					var len = sModules.length , elem;
		// 					for (let i = 0; i < len; i++) {
		// 						elem = sModules[i];
		// 						if(elem.selectedIds.length){
		// 							uRecs[sModules.id] = sModules.selectedIds;
		// 						}
		// 					}
		// 				}else{
		// 					uRecs = _this.modulesIdMap[modId].selectedIds;
		// 				}
		// 			}
		// 			_this.executeMethod("onUnassign" , uRecs).then(function(){
		// 				if(type === 'all'){
		// 					if(cxType ===  "multi_module_multi_select"){
		// 						this.setData('selectedModules' , []);
		// 					}
		// 					_this.assignedIds = {};
		// 					_this.setData('show' , false); //NO I18n
		// 				}else{
		// 					if(_this.data.cxPropType === "multi_module_multi_select"){
		// 						var slen = sModules.length , sIds , sILen , sInd;
		// 						for (let j = 0; j < slen; j++) {
		// 							sIds = sModules[j].selectedIds, sILen = sIds.length;
		// 							if(sILen){
		// 								for(var  k = 0 ; k < sILen ; k++){
		// 									sInd = sModules[j].records.findIndex( x => x.id === sIds[k]);
		// 									_this.assignedIds[sModules[j].id].splice(sInd , 1);
		// 									Lyte.arrayUtils(sModules[j].records , "removeAt" , sInd , 1);
		// 								}
		// 								sModules[j].selectedIds = [];
		// 							}
		// 						}
		// 					}else{
		// 						uRecs[modId].forEach(function(id){
		// 							ind = _this.assignedIds[modId].findIndex(id);
		// 							if(ind !== -1){
		// 								_this.assignedIds[modId].splice(ind , 1);
		// 							}
		// 						});
		// 						_this.modulesIdMap[modId].selectedIds = [];
		// 						_this.data.queryParamObject.page = 1;
		// 						_this.getRecords();
		// 					}
		// 				}
		// 			},function(){
		// 				// debugger
		// 			});
		// 		}
		// 	};
		// 	if(this.data.cxPropType === "multi_module_multi_select"){
		// 		var literal = "The selected participants will be unassigned when you save this module. This action cannot be undone";
		// 		var primaryMessage = 'Unassign Selected "participants"';
		// 	}else{
		// 		var litLabel = this.data.module.singular_label , cLabel = this.data.cxPropCurrentModuleSingularLabel;
		// 		var literal = _cruxUtils.getI18n('crm.mxnLookup.dissociatemessage' , [litLabel , cLabel]);
		// 		//var literal = type === 'all' ? _cruxUtils.getI18n('crm.mxnLookup.dissociatemessage' , [litLabel , cLabel]) : _cruxUtils.getI18n('crm.mxnLookup.dissociateselectedmessage' , [recordObj.Full_Name ,litLabel, '' , cLabel]);
		// 	}
		// 	_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : primaryMessage , ltPropSecondaryMessage : literal , ltPropButtons :        //no i18n
		// 	[{"type":"reject","text":_cruxUtils.getI18n("crm.button.cancel"),"appearance":"default"},{"type":"accept","text":_cruxUtils.getI18n("crm.mxnlookup.dissociate"),"appearance":"failure" }]} ,accept : acceptFn }); //no i18n
		// },
		addMoreRecords : function(){
			this.addMore = true; var _self = this;
			this.data.queryParamObject.page = 1;
			delete this.data.queryParamObject.filters;
			this.clearSearchAndFilter();
			_self.setData({"currentModalPage" : "multiList" }); //NO I18n
			// this.clearRecords();
			this.moduleInit().then(function(){
				if(_self.data.cxPropType === 'multi_module_multi_select'){
					_self.setModuleDropdownOptions();
					if(_self.modulesIdMap['additional_participant'].selectedRecs.length){
						_self.setData('isAddPartOpen' , true);
					}
				}
			})
		},
		removableSearchSetValue : function(event, elem, something, value, click){
			this.removablesearchSetValueFn(event, elem, something, value, click);
		},
		searchSetValue : function(event, elem, click){
			this.searchSetValueFn(event, elem, click);
		},
		moveToMultiModuleSelectView : function(){
			if(this.data.currentModalPage !== "multiList"){
				return;
			}
			var modulesIdMap = this.modulesIdMap , mod , modId , selected = [] , obj , moduleOpt = this.data.cxPropModuleOptions , len = moduleOpt.length , promise = {} , tempQp = {} , tempHeader = {} , _self = this;
			for (var i = 0 ; i < len ; i++) {
				mod = modulesIdMap[moduleOpt[i].id];
				modId = moduleOpt[i].id;
				if(mod && mod.selectedIds && mod.selectedIds.length){
					tempHeader[modId] = this.getSelectedHeader(mod.module);
					tempQp[modId] = {'ids' : mod.selectedIds.join() , 'page' : 1 , 'per_page' : 10 , comparator : 'equals' , fields : tempHeader[modId].customfields.map(x => x.api_name).join()};
					promise[modId] = this.executeMethod("fetchRecords",modId , tempQp[modId]);
				}
			}
			Lyte.resolvePromises(promise).then(function(res){
				for(var key in res){
					var modMap = modulesIdMap[key];
					obj = { 'id' : key , 'name' : modMap.module.plural_label , fieldTypeMapping : tempHeader[key].fieldMapping , 'header' : tempHeader[key].customfields , hideModule : false , 'selectedRecords' : modMap.selectedRecs , 'records' : res[key] , selectedIds : modMap.selectedIds , 'qp' : tempQp[key]};
					selected.push(obj);
				}
				if(modulesIdMap['additional_participant'] && modulesIdMap['additional_participant'].selectedIds.length){
					_self.mailModule.records = _self.getCurrentPageRecords(modulesIdMap['additional_participant'].selectedRecs, 1 , 10);
					selected.push(_self.mailModule);
				}
				_self.setData({'selectedModules' : selected , "showMultiModuleTable" : true , "currentModalPage" : "selected" , 'isAddPartOpen' : false});
				_self.setModuleDropdownOptions();
			})

		},
		backToList : function(to){
			var _this = this;
			this.setData({"currentModalPage" : "multiList" , 'showEmptySelectPage' : false } );
			this.setModuleDropdownOptions( to !== 'home' ? this.data.cxPropModId : undefined);
			this.moduleInit(this.data.cxPropModId).then(function(){
				_this.setData({'showMultiModuleTable' : false});
				if(_this.data.cxPropAdditionalParticipants){
					_this.setData("mailParticipants" , this.modulesIdMap['additional_participant'].selectedRecs);
					if(this.modulesIdMap['additional_participant'].selectedRecs.length){
						this.setData('isAddPartOpen' , true);
					}
				}
			});
		},
		selectionConfirm : function(){
			this.selectionConfirmFn();
		},
		clearSelectedRecordsFn : function(){
			this.clearRecords();
			if(this.getMethods('onClearAllRecords')){
				this.executeMethod('onClearAllRecords', this.$node);
			}
		},
		showHideFilter : function(){
			var filterAct = this.data.isFilterActive;
			var smartFilter = $L('.cxLookupModalSmartFilterContainer' , this.modalComp.childComp)[0];
			if(smartFilter){
				if(filterAct){
					this.setData('isFilterActive' , false);
				}else{
					this.setData('isFilterActive' , true);
				}
			}

		},
		fetchTotalCount : function(){
			if(this.data.totalRecordsCount === "###"){
				var param = this.constructQueryParams() , count , _self = this;
				if(this.getMethods("fetchTotalCount")){
					count = this.executeMethod("fetchTotalCount" , this.data.cxPropModId, param.qp);
				}else{
					count = store.triggerAction(this.data.cxPropModId,"count",param.qp);
				}
				Lyte.resolvePromises(count).then(function(res){
					if(res.count !== undefined){
						let tc = res.count;
						_self.setData({"totalRecordsCount" :  String(tc) , 'totalCountForLV' : tc});
					}
				})
				// if(this.getMethods("fetchTotalCount")){
				// 	var _self = this;
				// 	this.executeMethod("fetchTotalCount" , this.data.cxPropModId, param.qp).then(function(res){
				// 		_self.setData({"totalRecordsCount" :  String(res.count) , 'totalCountForLV' : res.count});
				// 	})
				// }
			}
		},
		sort : function(field){
		    if(!field.sortable){
				return;
			}
			var dispArr = this.getData("record");// No I18n
			if(!(field.ui_type == 3 || field.ui_type == 999 || field.ui_type == 208 || field.ui_type == 110 || field.ui_type == 1000 || field.ui_type == 209) || (this.getData("module").module_name == "Visits" && field.column_name == "SEID") && dispArr.length){
				var Obj = JSON.parse(JSON.stringify(this.getData("queryParamObject")));// No I18n
				field.curSort = (field.curSort == undefined || field.curSort == "desc") ? "asc" : "desc";// No I18n
				Obj.sort_order = field.curSort;
				Obj.sort_by = field.api_name;
				Obj.page = 1;
				Obj.per_page = this.data.cxPropPerPage;
				this.setData("queryParamObject", Obj);// No I18n
				if(this.data.cxPropQueryParam){
					for(var key in this.data.cxPropQueryParam){
						Obj[key] = this.data.cxPropQueryParam[key];
					}
				}
				var _this = this;
				this.records = []
				if(this.data.selectedHeaderValue){
					if(this.data.selectedHeaderValue != "2"){
						Obj.relatedId = this.data.selectedHeaderValue;
						Obj.relationId = this.getRelationId();
					}
					else{
						delete Obj.relatedId;
						delete Obj.relationId;
					}
				}
				this.executeMethod("fetchRecords", this.getData("cxPropModId"), Object.assign({}, Obj)).then(function(res){// No I18n
					res = (res && res.length) ? res : [];
					_this.setData("record", res);// No I18n
					_this.noMoreScroll = false;
					_this.setSelected(res);
					var more = res.length < _this.data.cxPropPerPage ? false : true;
					if(_this.data.cxPropMetaMoreRecords && res.$){
						if(res.$[_this.data.cxPropMetaMoreRecords] == false || (res.$.meta && res.$.meta[_this.data.cxPropMetaMoreRecords] == false)){
							more = false;
						}
						else{
							more = true;
						}
					}
					_this.setNavigator(res.length, more, true);
					_this.setData("sortedColumn", field.api_name);// No I18n
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar();
					}
				}, function(){
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar();
					}
						_cruxUtils.showPermissionDeniedModal();
					})
			}
		},
		selectSingle : function(id, elem, ev){
			this.selectTheSingle(id);
			if(ev){
				ev.preventDefault();
			}
		},
		radioButtonClicked : function(id){
			if(this.getData("selectedSingle") === id && !this.data.cxPropFooterButtonYield){
				this.close();
			}
		},
		filterAction : function(elem){
	    	if(this.getData("cxPropShowFilter")){
	    		this.rendPage('home');
	    		this.setData("cxPropShowFilter",false);//NO I18N
	    		$L(elem).removeClass('lookupFilterOpen');//No I18N
	    	} else{
	    		this.setData("cxPropShowFilter",true); //NO I18N
	    		$L('lyte-table' , this.$node.querySelector('lyte-modal').component.childComp)[0].scrollTable();//NO I18N /*To fix filter Open issues and scroll issues*/
	    		$L(elem).addClass('lookupFilterOpen');//No I18N
	    	}
	    },
		cancelFn : function(){
			this.setData("cxPropShow", false);// No I18n
		},
		removeSelectedModule : function(mod , ind){
			var sModules = this.data.selectedModules , modMap = this.modulesIdMap[mod.id] , sLen = modMap.selectedIds.length;
			Lyte.arrayUtils(sModules , 'removeAt' , ind , 1);
			for(var i = 0 ; i < sLen ; i++ ){
				this.unassignRecordsEdit('remove', mod.id, modMap.selectedIds[i]);
			}
			this.setData('isRecordsEdited' , true);
			this.setData("selectedRecsLength" , this.data.selectedRecsLength - modMap.selectedIds.length);
			modMap.selectedIds = [];
			modMap.selectedRecs = [];
			this.setModuleDropdownOptions();
		},
		additionalPartiesToggle : function(type){
			if(type === 'open'){
				this.setData('isAddPartOpen' , true);
			}else{
				var parts = this.data.mailParticipants;
				if(parts && parts.length){
					var modMap = this.modulesIdMap['additional_participant'] , pLen = modMap.selectedIds.length;
					for(var i = 0 ; i < pLen ; i++){
						this.unassignRecordsEdit('add' , 'additional_participant' , modMap.selectedIds[i]);
					}
					modMap.selectedIds = [];
					modMap.selectedRecs = [];
					this.setData("selectedRecsLength" , this.data.selectedRecsLength - pLen);
					this.setData('mailParticipants' , []);
				}
				this.setData('isAddPartOpen' , false);
			}
		}
	},
	showSelectedModule : function(id){
		var selectedModules = this.data.selectedModules , len = selectedModules.length;
		for(var i = 0 ; i < len ; i++){
			if(selectedModules[i].id === id || id === "all_participants"){
				Lyte.objectUtils(selectedModules[i] , 'add' , 'hideModule' , false);
			}else{
				Lyte.objectUtils(selectedModules[i] , 'add' , 'hideModule' , true);
			}
		}
	},
	observeSelLength : function(){
		var len = this.data.selectedRecsLength;
		if(this.data.currentModalPage !== 'multiList' && len === 0){
			this.setData('showEmptySelectPage' , true);
		}else{
			this.setData('showEmptySelectPage' , false);
		}
	}.observes('selectedRecsLength'),
	selectionConfirmFn : function(){
		if(this.addMore && this.tempSelRecs && this.tempSelRecs.length){
            var modId = this.data.module.id;
		    this.modulesIdMap[modId].selectedRecs.concat(this.tempSelRecs);
		}
		var result = this.getAssignedValues() , _self = this;
		function acceptFn(){
			if(_self.getMethods("onAssign")){
				_self.executeMethod("onAssign" , result , _self.$node); //NO I18n
			}
			_self.unassignIds = {};
			_self.setData("cxPropShow" , false); //NO I18n
		}
		if(this.unassignRecs && this.unassignRecs.length){
			_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : "Are you sure want to proceed with the changes?" , ltPropSecondaryMessage : "This action cannot be undone." , ltPropButtons :        //no i18n
				[{"type":"reject","text":_cruxUtils.getI18n("crm.button.cancel"),"appearance":"default"},{"type":"accept","text": "Yes Proceed","appearance":"failure" }]} ,accept : acceptFn }); //no i18n
		}else{
			acceptFn();
		}
	},
	getAssignedValues : function(type){
		var selected = [];
		// if(this.data.cxPropType === "multi_module_multi_select"){
		// 	selected = [];
		// 	var sModules = this.data.selectedModules;
		// 	sModules.array.forEach(function(item){
		// 		selected.push({[item.id] : item.records});
		// 	})
		// }else{
		// 	var modId = this.data.module.id;
		// 	selected = {[modId] : this.modulesIdMap[modId].selectedRecs};
		// }
		var modMap = this.modulesIdMap , _self = this , unassignIds =  _self.unassignIds , unassignRecs = [] , temp;
		if(this.data.cxPropType === "single"){
			return {id : this.data.selectedSingle, name : this.data.lookupSingle};
		}else if(this.data.cxPropType === "multi_module_multi_select"){
			for(var key in modMap){
				var modDet = modMap[key] , len = modDet.selectedIds.length;
				if(len){
					for(var i = 0 ; i < len ; i++){
						selected.push({'module' : {'id' : modDet.module.id , 'api_name' : modDet.module.api_name} , 'id' : modDet.selectedRecs[i].id , 'name'  : modDet.selectedRecs[i][modDet.displayField]});
					}
				}
			}
			for(var tkey in unassignIds){
				temp = unassignIds[tkey].forEach(function(id){
					return { 'id' : id , _delete : null};
				});
				unassignRecs.push(...temp);
			}
		}else{
			var modId = this.data.module.id;
			// selected = {[modId] : this.modulesIdMap[modId].selectedRecs};
			this.modulesIdMap[modId].selectedRecs.forEach(function(rec){
				selected.push({'name' : rec[_self.data.displayField]  , 'id' : rec.id});
			});
			if(this.unassignIds[this.data.cxPropModId] && type !== 'selected'){
				unassignRecs = []
				 _self.unassignIds[this.data.cxPropModId].forEach(function(id){
					unassignRecs.push({ 'id' : id , _delete : null});
				});
			}
		}
		this.unassignRecs = unassignRecs;
		let result = selected.concat(...unassignRecs);
		return result;
	},
	unassignRecordsEdit : function(type , modId , recId){
		if(type === 'remove' && this.assignedIds && this.assignedIds[modId] && this.assignedIds[modId].length){
			var bool = this.assignedIds[modId].includes(recId);
			if(bool){
				if(!this.unassignIds[modId]){
					this.unassignIds[modId] = []
				}
				this.unassignIds[modId].push(recId);
			}
		}else if(this.unassignIds && this.unassignIds[modId] && this.unassignIds[modId].length){
			var ind = this.unassignIds[modId].findIndex(x => x === recId);
			if(ind !== -1){
				this.unassignIds[modId].splice(ind , 1);
			}
		}
	},
	clearRecords : function(){
		var modulesMap = this.modulesIdMap;
		for(var id in modulesMap){
			if(modulesMap[id].selectedIds){
				var len = modulesMap[id].selectedIds.length;
				for(var i = 0 ; i < len ; i++){
					this.unassignRecordsEdit('remove' , id , modulesMap[id].selectedIds[i]);
				}
				modulesMap[id].selectedIds = [];
				modulesMap[id].selectedRecs = [];
			}
		}
		var listComp = $L("crux-list-view", this.modalComp.childComp)[0];
		if(this.data.currentModalPage === "multiList" && listComp){
			listComp.clearSelectedRecords();
		}
		this.setData({'selectedRecsLength' : 0 , 'selectedModules' : []});
		// Lyte.objectUtils(this.data.module , "add" , "selectedIds" , []);
	},
	clearSearchAndFilter : function(){
		var modalElem=this.$node.querySelector("#modalElem");
		if(modalElem){
			modalElem = modalElem.component.childComp;
			var searchEle = $L(".cxLookupSearch" , modalElem)[0] , filterElem = $L("crux-smart-filter" , modalElem)[0];
			if(searchEle){
				searchEle.component.setData("ltPropValue" , ""); // No I18n
				delete this.criteriaObj.search;
			}
			if(filterElem){
				filterElem.component.clearFields();
				delete this.criteriaObj.filter;
				this.setData("showApplyFilter" , false);
			}
		}
		Lyte.objectUtils(this.data.filterInfo , 'delete' , 'sort' );
		Lyte.objectUtils(this.data.filterInfo , 'delete' , 'filter' );
	},
	getSelectedHeader : function(mod){
		var fields = $L.extend(true , [] , mod.custom_view.fields);
		var fieldsInfo = this.fieldYieldMapping(fields ,undefined , mod  , undefined , this.data.cxPropFieldTypeMapping);
		fields = fieldsInfo.customfields ; let len = fields.length;
		for (let i = 0; i < len; i++) {
			if( mod.module_name === 'Users' && fields[i].api_name === "full_name"){
				fields[i].yieldName = "full_name";
			}
		}
		return fieldsInfo;
	},
	getCurrentPageRecords : function(records, qp){
		var page = qp.page , pp = qp.per_page;
		var recLen = records.length , pagesLen = Math.ceil(recLen / pp) , pageRecs;
		if(pagesLen <= page){
			var totalRecLen = page*pp;
			pageRecs = records.slice((totalRecLen - pp) - 1 , totalRecLen);
		}
		return pageRecs;
	},
	fetchMultiModuleRecords : function(index , qp){
		var sModule = this.data.selectedModules[index] , ind , promise;
		// if(this.data.currentModalPage === 'selected'){
		// 	var records = this.getCurrentPageRecords(sModule.selectedRecords, sModule.qp.page , sModule.qp.per_page);
		// 	promise = new Promise(function(resolve){
		// 		resolve(records);
		// 	})
		// }else{
		// 	promise = this.executeMethod("fetchRecords", sModule.id ,qp );
		// }
		if(sModule.id === 'additional_participant'){
			var partModMap = this.modulesIdMap['additional_participant'] , sRecs = partModMap.selectedRecs , records;
			if(qp.filters){
				records = sRecs.filter(x => x[partModMap.display_field.api_name].includes(qp.filters.value));
			}
			records = this.getCurrentPageRecords(records, qp);
			Lyte.objectUtils(sModule , 'add' , 'records' , records);
			return new Promise(function(resolve){
				resolve({'additional_participant' : records});
			})
		}
		promise = this.executeMethod("fetchRecords", sModule.id , sModule.qp );
		return promise.then(function(res){
			res = $L.extend(true , [] , res);
			res.forEach(function(rec){
				ind = sModule.selectedIds.findIndex( x => x === rec.id);
				if(ind !== -1){
					rec.cx_checked = true;
				}
			})
			// Lyte.objectUtils(sModule , 'add' , 'qp' , qp);
			Lyte.objectUtils(sModule , 'add' , 'records' , res);
			return {[sModule.id] : res};
		})
	},
	searchMultiModuleRecords : function(value){
		var selModules = this.data.selectedModules , sLen = selModules.length , modId , modMap = this.modulesIdMap , cModId , cMod;
		for(var i = 0 ; i < sLen ; i++){
			modId = selModules[i].id;
			if(value){
				selModules[i].qp.filters = _this.constructSearchFilter(modMap[modId].module.display_field.api_name, value, undefined , true);
			}else{
				delete selModules[i].qp.filters;
			}
			this.fetchMultiModuleRecords(i ,  selModules[i].qp).then(function(res){ // eslint-disable-line @zoho/zstandard/no-loop-function
				cModId = Object.keys(res)[0];
				cMod = selModules.find(x => x.id === cModId);
				if(res[modId].length){
					Lyte.objectUtils(cMod , 'add' , 'hideModule' , false);
				}else{
					Lyte.objectUtils(cMod , 'add' , 'hideModule' , true);
				}
			})
		}
	},
	setMultiModuleSelectViewData : function(){
		var cxValue = JSON.parse(this.data.cxPropValue) , len = cxValue.length , obj = {} , modId , recsObj = {};
		// for(var key in cxValue){
		// 	obj[module.id] = cxValue[key].map(x => x.id);
		// 	recsObj[module.id] = cxValue[i];
		// }
		for(var i = 0 ; i < len ; i++){
			modId = cxValue[i].module.id;
			if(!obj[modId]){
				obj[modId] = [];
				recsObj[modId] = [];
			}
			obj[modId].push(cxValue[i].id);
			recsObj[modId].push({ "id" : cxValue[i].id , 'name' : cxValue[i].name } );
		}
		this.assignedIds = obj;
		var cxModules = this.data.cxPropModuleOptions , mLen = cxModules.length , selectedMods = [] , promise = {} , _self = this , mod , fieldsInfo , selRecLen = 0;
		_self.setData('selectedModuleValue' , cxModules[0].id);
		for(var j = 0 ; j < mLen ; j++){
			modId = cxModules[j].id;
			if(obj[cxModules[j].id]){
				this.initReqResolved = false;
				if(!_self.modulesIdMap){
					_self.modulesIdMap = {};
				}
				_self.modulesIdMap[modId] = {selectedIds : obj[cxModules[j].id] , selectedRecs : recsObj[cxModules[j].id]};
				selRecLen += obj[cxModules[j].id].length;
				promise[modId] = this.fetchModule(modId);
				// promise[modId] = this.fetchModule(modId).then(function(resp){
				// 	mod = Lyte.deepCopyObject(resp);
				// 	fieldsInfo = _self.getSelectedHeader(mod);
				// 	mObj = {'id' : mod.id , 'name' : mod.plural_label , hideModule : false , fieldTypeMapping : fieldsInfo.fieldMapping , 'header' : fieldsInfo.customfields , 'qp' : {'ids' : obj[mod.id].join() , 'page' : 1 , 'per_page' : 10 , comparator : 'equals' } }
				// 	return _self.executeMethod("fetchRecords",mod.id , mObj.qp).then(function(resp){
				// 		mObj.records = resp;
				// 		selectedMods[j] = mObj;
				// 	});
				// });
			}
		}
		this.setData("selectedRecsLength" , selRecLen);
		var recProm = {} , mObj = {} , rec ;
		Lyte.resolvePromises(promise).then(function(res){
			for(var key in res){
				mod = Lyte.deepCopyObject(res[key]);
				fieldsInfo = _self.getSelectedHeader(mod);
				mObj[mod.id] = {'id' : mod.id , 'name' : mod.plural_label , hideModule : false , fieldTypeMapping : fieldsInfo.fieldMapping , 'header' : fieldsInfo.customfields , 'qp' : {'ids' : obj[mod.id].join() , 'page' : 1 , 'per_page' : 10 , comparator : 'equals' } };
				recProm[mod.id] = _self.executeMethod("fetchRecords",mod.id , mObj[mod.id].qp);
			}
			Lyte.resolvePromises(recProm).then(function(resp){
				for(var key in resp){
					rec = Lyte.deepCopyObject(resp[key]);
					mObj[key].records = rec;
				}
				for(var j = 0 ; j < mLen ; j++){
					modId = cxModules[j].id;
					if(obj[cxModules[j].id]){
						selectedMods.push(mObj[modId]);
					}
				}
				if(_self.data.cxPropAdditionalParticipants){
					_self.modulesIdMap['additional_participant'] = {selectedIds : obj['additional_participant'] , selectedRecs : recsObj['additional_participant']}; // Need to construct the add participants records after got the correct structure
					_self.mailModule.records = _self.getCurrentPageRecords(recsObj['additional_participant'], 1 , 10);
					selected.push(_self.mailModule);
				}
				_self.setData({'selectedModules' : selectedMods , 'cxPropShow' : true});
				_self.initReqResolved = true;
				_self.setModuleDropdownOptions();

			});
		});
		// Lyte.resolvePromises(promise).then(function(){
		// 	var selectedMods = selectedMods.filter( x => x);
		// 	if(_self.data.cxPropAdditionalParticipants){
		// 		_self.modulesIdMap['additional_participant'] = {selectedIds : obj['additional_participant'] , selectedRecs : recsObj['additional_participant']}; // Need to construct the add participants records after got the correct structure
		// 		_self.mailModule.records = _self.getCurrentPageRecords(recsObj['additional_participant'], 1 , 10);
		// 		selected.push(_self.mailModule);
		// 	}
		// 	_self.setData({'selectedModules' : selectedMods , 'cxPropShow' : true});
		// 	_self.initReqResolved = true;
		// 	_self.setModuleDropdownOptions();
		// })


		// for(i = 0 ; i < len ; i++){
		// 	if(cxValue[i].module === "Additional_participants"){
		// 		cxValue[i].records.forEach(function(mail){
		// 			tempArr.push({"Email" : mail , "id" : Email});
		// 		});
		// 		cxValue[i] = this.mailModule;
		// 		cxValue[i].records = tempArr;
		// 	}
		// 	obj = {module : {id : cxValue[i].id , plural_label : cxValue[i].plural_label } ,header : this.getSelectedHeader(cxValue[i].fields) , records : cxValue[i].records};
		// 	this.assignedIds[cxValue[i].id] =  cxValue[i].records.map(x => x.id);
		// 	sMod.push(obj);
		// }
		// this.setData("selectedModules" , sMod);
	},
	updateColumnFields : function(fields){
		var len = fields.length , fieldsToBeUpdated = [] , tempObj;
		var cxType = this.data.cxPropType , field = this.data.cxPropField , previousFields = this.data.module.custom_view.fields , index;
		for(var i = 0 ; i < len ; i++){
			tempObj = {id : fields[i].id , api_name : fields[i].api_name , sequence_number : i + 1 };
			fieldsToBeUpdated.push(tempObj);
		}
		previousFields.forEach(function(f){
			index = fieldsToBeUpdated.findIndex(x => x.id === f.id);
			if(index === -1){
				fieldsToBeUpdated.push({id : f.id , api_name : f.api_name , _delete : null});
			}
		});
		let preFields;
		return new Promise(function(resolve , reject){
			if(this.data.cxPropCvid){
				var customView = store.peekRecord('custom_view', this.data.cxPropCvid);
				preFields = customView.fields;
				customView.$.set('fields' , fieldsToBeUpdated);
				customView.$.save({module : this.data.module.api_name}).then(function(){
					customView.fields = fields;
					resolve(fields);
				}, function(err){
					customView.fields = preFields;
					reject(err);
				});
			}else if(field && field.data_type === "multiselectlookup"){
				var relatedList = store.peekRecord("related_list", field.multiselectlookup.id);
				preFields = relatedList.fields;
				let layoutId = this.data.cxPropLayout;
				if(layoutId){
					// for wizard have layoutId value have multiple values like layoutId and wizard layoutId. For our case we need the module's layoutId
					layoutId = layoutId.split(';')[0];
				}
				relatedList.$.set('fields' , fieldsToBeUpdated);
				relatedList.$.save(undefined , {module : this.data.module.api_name , layout_id:layoutId}).then(function(){
					relatedList.fields = fields;
					resolve(fields);
				}, function(err){
					relatedList.fields = preFields;
					reject(err);
				});
			}else if(cxType === "single" || cxType === "multiple"){
				var modId = this.data.cxPropModId;
				var module = store.peekRecord('module', modId);
				module.$.set('lookup_field_properties' , {fields : fieldsToBeUpdated});
				module.$.save().then(function(){
					module.lookup_field_properties.fields = fields;
					resolve(fields);
				}, function(err){
					module.lookup_field_properties.fields = previousFields;
					reject(err);
				});
			}
		}.bind(this));
	},
	updateSortForMxN : function(field , order){
		var cxField = this.data.cxPropField;
		var relatedList = store.peekRecord("related_list",cxField.multiselectlookup.id);//no i18n
		var action = order === "unsort" ? 'unsort' : 'customize_sort'; //no i18n
		relatedList.$.triggerAction(action,{type : 'PUT'},{module : this.data.cxPropModId},undefined,{related_list : {sort_order : order,sort_by : field ? {id : field.id,api_name : field.api_name} : {api_name : "id"}}});
	},
	setModuleDropdownOptions : function(modId){
		if(this.data.currentModalPage === "multiList"){
			this.setData('cxPropModuleOptions' , this.defaultModuleOptions);
		}else{
			var modMap = this.modulesIdMap , len =  this.defaultModuleOptions.length , curMod , tempArr = [this.allParticipantObj];
			for(var i = 0 ; i < len ; i++){
				curMod = modMap[this.defaultModuleOptions[i].id];
				if(curMod && curMod.selectedIds && curMod.selectedIds.length){
					tempArr.push(this.defaultModuleOptions[i]);
				}
			}
			if(modMap['additional_participant'] && modMap['additional_participant'].selectedIds.length){
				tempArr.push(this.mailModule);
			}
			this.setData('cxPropModuleOptions' , tempArr);
		}
		if(!modId){
			modId = this.data.cxPropModuleOptions[0].id;
		}
		this.setData('selectedModuleValue' , modId);
	},
	setNavigator : function(l, bool, resetPrevious){
		var modalElem=this.$node.querySelector("#modalElem").component.childComp,navElem = (modalElem)?modalElem.querySelector('#navigator'):''//no i18n
		if(navElem){
			navElem.ltProp("moreRecords", !bool ? false : true);// No I18n
			//fix for ZCRM-91324
			if(this.records && this.records.length){
				var totalRecords = 0;
				this.records.forEach(function(f){ return totalRecords += f && f.length ? f.length : 0 });
				l = totalRecords ? totalRecords : l;
			}
			navElem.ltProp("records", !bool ? l : '');// No I18n
			if(resetPrevious){
			    navElem.ltProp("value", 0);//No I18n
			}
		}
	},
	searchSetValueFn : function(event , elem , click){
		if(((this.getData("cxPropFetchRecordsOnEnter") && !(event && event.keyCode === 13)) || (event && event.keyCode === 27)) && !click){
			return;
		}
		clearTimeout(this.searchTimeout);
		var _this = this
		this.searchTimeout = setTimeout(function(){
			var value = elem.querySelector("input").value;   //no i18n;
			value = value ? value.trim() : "";
			if(_this.data.cxPropType === "multi_module_multi_select" && _this.data.currentModalPage !== 'multiList'){
				_this.searchMultiModuleRecords(value);
			}else{
				var filters = (value) ? {comparator : "contains", field : {api_name : _this.getData("displayField")}, value : value} : {};// No I18n
				var mod = _this.data.module;// No I18n
				if(filters.comparator){
					var field = mod && Object.keys(mod).length && mod.display_field ? store.peekRecord('field',mod.display_field.id) : undefined;
					var searchFormat = _this.data.cxPropFilterComponent ? false : _this.data.cxPropSearchFormat;
					_this.criteriaObj.search = _this.constructSearchFilter(_this.getData("displayField"), value, field , searchFormat);// No I18n
				}else{
					delete _this.criteriaObj.search;
				}
				_this.data.queryParamObject.page = 1;
				_this.getRecords();
			}
		}, 100);
	},
	removablesearchSetValueFn : function(event, elem, something, value, click){
		if(((this.getData("cxPropFetchRecordsOnEnter") && !(event && event.keyCode === 13)) || (event && event.keyCode === 27)) && !click){
			return;
		}
		clearTimeout(this.searchTimeout);
		var _this = this
		this.searchTimeout = setTimeout(function(){
			value = value ? value :  (event) ? event.target.value : "";
			value = value ? value.trim() : value;
			var filters = (value) ? {comparator : "contains", field : {api_name : _this.getData("displayField")}, value : value} : {};// No I18n
			var Obj = _this.getData("queryParamObject");// No I18n
			if(filters.comparator){
				Obj.filters = _this.constructSearchFilter(_this.getData("displayField"), value);// No I18n
			}
			Obj.page = 1;
			Obj.per_page = _this.data.perPage;
			if(!Obj.sort_order){
				delete Obj.sort_order;
				delete Obj.sort_by;
			}
			if(_this.data.cxPropQueryParam){
				for(var key in _this.data.cxPropQueryParam){
					Obj[key] = _this.data.cxPropQueryParam[key];
				}
			}
			_this.setData("queryParamObject", Obj);// No I18n
			if(_this.data.selectedHeaderValue){
				if(_this.data.selectedHeaderValue != "2"){
					Obj.relatedId = _this.data.selectedHeaderValue;
					Obj.relationId = _this.getRelationId();
				}
				else{
					delete Obj.relatedId;
					delete Obj.relationId;
				}
			}
			var modId = _this.getData("modId");// No I18n
			if(value){
				_this.executeMethod("fetchRecords", modId, Object.assign({}, Obj)).then(function(recs){// No I18n
					recs = recs ? recs : [];
					_this.noMoreScroll = false;
					_this.setData("record", recs);// No I18n
					var more = true;
					if(_this.data.cxPropMetaMoreRecords && recs.$){
						if(recs.$[_this.data.cxPropMetaMoreRecords] == false || (recs.$.meta && recs.$.meta[_this.data.cxPropMetaMoreRecords] == false)){
							more = false;
						}
						else{
							more = true;
						}
					}
					_this.setSelected(recs);
					_this.setNavigator(recs.length, more, true);
					if(_this.$node.querySelector("lyte-modal").component.actualModalDiv.querySelector("lyte-input").ltProp("value").trim() != value){
						_this.$node.querySelector("lyte-modal").component.actualModalDiv.querySelector("lyte-input").ltProp("value", value)//No I18n
					}
				},function(){
					_cruxUtils.showPermissionDeniedModal();
				});
			}
			else{
				delete Obj.filters;
				_this.executeMethod("fetchRecords", modId, Object.assign({}, Obj)).then(function(recs){// No I18n
					recs = (recs) ? recs : [];
					_this.setData("record", recs);// No I18n
					var more = true;
					if(_this.data.cxPropMetaMoreRecords && recs.$){
						if(recs.$[_this.data.cxPropMetaMoreRecords] == false || (recs.$.meta && recs.$.meta[_this.data.cxPropMetaMoreRecords] == false)){
							more = false;
						}
						else{
							more = true;
						}
					}
					_this.setSelected(recs);
					_this.setNavigator(recs.length, more, true);
					_this.$node.querySelector("lyte-modal").component.actualModalDiv.querySelector("lyte-input").ltProp("value", "")//No I18n
				},  function(){
					_cruxUtils.showPermissionDeniedModal();
				});
			}
		}, 300);
	},
	rendHome : function(value){
		this.rendPage("home", value);// No I18n
		this.next = false;
		var x = this.$node.querySelector("#modalElem").component.childComp;// No I18n
		if(x){
			x = x.querySelectorAll("#navigator")[0];
			if(x){
				x.ltProp("value", 0);// No I18n
			}
		}
	},
	// setDisableClass : function(records){
	// 	var disableList = this.data.cxPropDisabledList;
	// 	records.forEach(function(rec){
	// 		if(disableList && disableList.includes(rec.id)){
	// 			rec.cxPropClass = "cxLookupDisableRow";
	// 		}
	// 	});
	// },
	setSelected : function(res){
		var single = this.getData('selectedSingle') // No I18n
		if(single){
			this.bool = true;
			var x = this.$node.querySelector("#modalElem").component.childComp;// No I18n
			var radioButton = x ? x.querySelectorAll("lyte-radiobutton") : [];// No I18n
			for(var i=0; i<radioButton.length; i++){
				if(radioButton[i].ltProp("value") == single){
					//fix for ZCRM-91324
					res = this.getData('record').filter(function(f){ return f.id == single })[0];//eslint-disable-line no-loop-func
					radioButton[i].ltProp("checked", true);
					var val, disp = this.getData("displayField");// No I18n
					if(!res){
						return;
					}
					if(disp == "Full_Name"){
						val = (res.First_Name) ? res.First_Name + " " + res.Last_Name : res.Last_Name;
					}else{
						val = res[disp];
					}
					this.setData("lookupSingle", val);// No I18n
					break;
				}
				else if(radioButton[i].ltProp("checked") == true){
					radioButton[i].ltProp("checked", false);
				}
			}
			this.bool = false;
			// if(!this.data.showLookupValue){
			// 	this.setData("showLookupValue", found);//No I18n
			// }
		}
	},
	selectTheSingle : function(id){
		var rec = this.getData("record");// No I18n
		var disp = this.getData("displayField");// No I18n
		var val, selected;
		for(var i=0; i<rec.length; i++){
			if(id == rec[i].id){
				if(disp === "Full_Name"){
					val = (rec[i].First_Name) ? rec[i].First_Name+" "+rec[i].Last_Name :  rec[i].Full_Name ? rec[i].Full_Name : rec[i].Last_Name;
				}
				else{
					val = rec[i][disp];
				}
				this.setData({lookupSingle : val, selectedSingle : id})
				selected = rec[i];
				break;
			}
		}
		if(!this.bool){
			if(!this.data.cxPropFooterButtonYield){
				this.close();
			}
			if(this.getMethods("onSelect")){
				/**
				 * @method onSelect
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called on select of a record
				 */
				this.executeMethod("onSelect");// No I18n
			}
			var cxValue = JSON.stringify({id : this.getData("selectedSingle"), name : this.getData("lookupSingle")});
			if(this.getMethods("onValueChange")){
				this.setData("cxPropValue", cxValue);// No I18n
				selected.name = this.getData("lookupSingle");
				/**
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called on change of value
				 */
				this.executeMethod("onValueChange", this.data.cxPropReturnFullObjectOnGet ? selected : cxValue);// No I18n
			}
			if(this.getMethods("onAssign")){
				this.executeMethod("onAssign" , this.data.cxPropReturnFullObjectOnGet ? selected : cxValue , this.$node);// No I18n
			}
		}
	},
	close : function(){
		this.setData("cxPropShow", false);// No I18n
	},
	setNext : function(from, next, page, i, value, element){
		if(from === "next"){
			next[page+2] = i;
			page+=1;
		}
		else if(from === "prev"){
			page-=1;
		}
		else{
			next = [0, i];
			page = 0;
		}
		this.setData({next : next, currentPage : page, currPage : page});
		value = value ? value : 0;
		if(element){
			element.ltProp("value", value);// No I18n
		}
	},
	rendPage : function(from,value,element){
		var i;
		var next = this.getData("next");// No I18n
		var page = this.getData("currentPage");// No I18n
		var Obj = this.getData("queryParamObject");// No I18n
		var rp = (Obj.page) ? Obj.page : 0;
		if(from === "home" || from === "change"){
			i = 0;
		}
		else if(from == "prev"){
			i=next[page-1]
			Obj.page = rp-1;
		}
		else{
			i = next[page+1];
			Obj.page = rp+1;
		}
		var y = i;
		var recs = this.getData("record");// No I18n
		var pp = this.getData("cxPropPerPage");// No I18n
		var disp = [];
		for(var j=0; i<recs.length && j<pp && recs[i]; i++, j++){
			disp[j] = recs[i];
		}
		if(from !== "home"){
			Obj.per_page = this.data.cxPropPerPage;
			if(!this.next){
				this.next = true;
				var _this = this;
				var recs = [];
				if(this.data.selectedHeaderValue){
					if(this.data.selectedHeaderValue !== "2"){
						Obj.relatedId = this.data.selectedHeaderValue;
						Obj.relationId = this.getRelationId();
					}
					else{
						delete Obj.relatedId;
						delete Obj.relationId;
					}
				}
				if(this.data.cxPropQueryParam){
					for(var key in this.data.cxPropQueryParam){
						Obj[key] = this.data.cxPropQueryParam[key];
					}
				}
				this.executeMethod("fetchRecords", this.getData("cxPropModId"), Object.assign({}, Obj)).then(function(res){// No I18n
					if(res){
						recs = recs.concat(res);
					}
					if(recs.length){
						_this.setData("queryParamObject", Obj);// No I18n
						_this.setData("record", recs);// No I18n
						_this.setData("cxPropShow", true);// No I18n
						for(; i<recs.length && j<pp; i++, j++){
							disp[j] = recs[i];
						}
						_this.setSelected(disp);
						var more = recs.length < _this.data.cxPropPerPage ? false : true;
						if(_this.data.cxPropMetaMoreRecords && res.$){
							if(res.$[_this.data.cxPropMetaMoreRecords] === false || (res.$.meta && res.$.meta[_this.data.cxPropMetaMoreRecords] === false)){
								more = false;
							}
							else{
								more = true;
							}
						}
						_this.setNavigator(recs.length, more)
						_this.setNext(from, next, page, i, value, element);
					}
					else if(from !== "change"){
						_cruxUtils.showCustomAlert({params : {ltPropContentAlign : "center", ltPropSecondaryMessage : I18n.getMsg("crm.label.no.more.records"), ltPropButtons : [{"type":"accept","text": _cruxUtils.getI18n("crm.mb.newversion.msg4"),"appearance":"primary"}]}})//No I18n
					}
					_this.next = false;
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar();
					}
				}, function(){
					if(typeof cruxAssets !== "undefined" && cruxAssets.showHideLoadingBar){
						cruxAssets.showHideLoadingBar();
					}
						_cruxUtils.showPermissionDeniedModal();
					});
			}
		}
		else if(disp.length || (!disp.length && from != 'next')){
			this.setNext(from, next, page, i, value, element);
			this.setData("cxPropShow", true);// No I18n
			this.setSelected(disp);
		}
	},
	// observeShow : function(){
	// 	if(this.getData("cxPropShow") == true){
	// 		this.$node.querySelector("lyte-modal").component.actualModalDiv.querySelector("lyte-input").ltProp("value", "");// No I18n
	// 	}
	// }.observes("cxPropShow"),// No I18n
	observeRecords : function(){
		// if(this.getData("queryParamObject").filters){
		// 	this.records = [];
		// }
		// else{
			var page = this.getData("queryParamObject").page ? this.getData("queryParamObject").page: 1;// No I18n
			this.records[page] = this.getData("record");
		// }
	}.observes("record"),// No I18n
	records : [],
	observeValue : function(){
		var cxValue = this.data.cxPropValue , field = this.data.cxPropField , cxType = this.data.cxPropType;
		cxValue = cxValue ? JSON.parse(cxValue) : '';
		if(!this.initReqResolved){      //It should only execute before call the fetchModule, Because fetchModule success set some data's of moduleIdMap. If its called after that success. Here reset the data so existing values removed.
			if(cxType === "multiple" || cxType === "multi_module_multi_select"){
				if(cxValue){
					if(cxType === "multiple" && (!field || field && field.data_type !== "multiselectlookup")){ //since the mxn does to fetch the all fields into the single fetch
						var ids = cxValue.map(x => x.id) , modId = this.data.cxPropModId;
						this.assignedIds[modId] = $L.extend(true , [] , ids);
						this.modulesIdMap = {};
						this.modulesIdMap[modId] = {selectedIds : ids , selectedRecs : cxValue};
						this.setData("selectedRecsLength" , ids.length );
					}else if(cxType === "multi_module_multi_select"){
						this.setMultiModuleSelectViewData();
						this.setData("showMultiModuleTable" , true); // NO I18
					}
					if(!this.data.cxPropStayOnSelectPage){
						this.setData("currentModalPage" , "unassign"); // NO I18
					}
				}else{
					this.setData({"currentModalPage" : "multiList" , 'prefixYield' : false , 'showMultiModuleTable' : false}); // NO I18N
				}
			}else{
				if(cxValue){
					try{
						this.setData("value", cxValue);// No I18n
						this.setData("selectedSingle", this.data.value.id);// No I18n
						this.setData("lookupSingle", this.data.value.name);
					}
					catch(err){
						this.setData("value", cxValue);// No I18n
						this.setData("selectedSingle", this.data.value.id);// No I18n
						this.setData("lookupSingle", this.data.value.name);
					}
				}
				else{
					this.setData("value", {});
					this.setData("selectedSingle", "");
					this.setData("lookupSingle", "");
				}
				this.setData("currentModalPage" , "singleList"); // NO I18N
			}
		}
	}.observes("cxPropValue" , "cxPropShow").on("init"),//no i18n
	observeAccountId : function(){
		if(this.data.cxPropRelatedId){
			let relFieldApiName;
			if(!this.relatedRecPassed){
				relFieldApiName = this.getRelatedFieldApiName();
				var arr = [{id : this.data.cxPropRelatedId, api_name : relFieldApiName, name : _cruxUtils.getI18n("crm.related.contact.account", this.data.module.plural_label, this.data.cxPropRelatedName)}, {id : "cxAll", name : _cruxUtils.getI18n("crm.allcontact.show", this.data.module.plural_label)}];//no i18n
				this.setData("cxPropRelatedRecordData", arr);//no i18n
				if(this.data.cxPropRelatedModuleId && !store.peekRecord("module", this.data.cxPropRelatedModuleId)){
					store.findRecord("module", this.data.cxPropRelatedModuleId);//no i18n
				}
				this.setData("selectedRelatedRecName", arr[0].name);//no i18n
			}else{
				let relRec = this.data.cxPropRelatedRecordData.find(x => x.id === this.data.cxPropRelatedId);
				relFieldApiName = relRec.api_name;//no i18n
				this.setData("selectedRelatedRecName", relRec.name);//no i18n
			}
			var rCriteria = {'field' : {api_name : relFieldApiName} , 'comparator' : 'equals' , 'value' : this.data.cxPropRelatedId};
			this.relatedRecCriteria = this.data.cxPropSearchFormat ? this.formatCriteriaForSearchAPI(rCriteria) : rCriteria;
			this.setData("selectedHeaderValue", this.data.cxPropRelatedId);//no i18n
		}else if(this.relatedRecPassed){
			this.setData("selectedRelatedRecName", this.data.cxPropRelatedRecordData[0].name);//no i18n
		}
	}.observes("cxPropRelatedId").on("init"),//no i18n
	getRelationId : function(){
		var id="";
		var related_lists = store.peekRecord("module", this.data.cxPropRelatedModuleId).related_lists;//no i18n
		for(var i=0; i<related_lists.length; i++){
			if(related_lists[i].api_name == this.data.module.api_name){
				id = related_lists[i].id
				break;
			}
		}
		return id;
	},
	getRecs : function(){
		var mod = this.getData("module");// No I18n
		var fields = mod.fields, customView = false;
		if(mod && Object.keys(mod).length){
			if(this.data.cxPropFields && this.data.cxPropFields.length){
				customView = true;
				fields = this.data.cxPropFields;//No I18n
			}else if(mod.custom_view && mod.custom_view.fields && mod.custom_view.fields.length){
				customView = true;
				fields = mod.custom_view.fields;
			}
			var filterField = function(fields, id){
				return fields.filter(function(f){
					return f.id === id;
				})[0];
			}
			let fLen = fields.length;
			for(var i=0; i<fLen; i++){
				if(customView){
					fields[i] = filterField(mod.fields, fields[i].id);
				}
				if(!fields[i]){
					fields.splice(i, 1);
					i--;fLen--;
					continue;
				}
				if(fields[i].id === mod.display_field.id || (mod.display_field.api_name === "Full_Name" && fields[i].column_name === "LASTNAME") || fields[i].column_name === "POTENTIAL_NAME" || fields[i].column_name === "POTENTIALID"){
					fields[i].yieldName = "aTag";
					if(!customView){
						break;
					}
				}
				else if(fields[i].data_type === "lookup"){
					fields[i].yieldName = "lookup";
				}
				else if(fields[i].data_type === "phone"){
					fields[i].yieldName = "phone";
				}
				if(!fields[i].sortable){
					fields[i].cxPropClass = "cursorDefault";
				}
			}
		}else{
			fields = this.getData("cxPropFields");//No I18n
		}
		this.setData("header", fields);// No I18n
		var _this = this;
		var params = {page : 1, per_page : this.data.cxPropPerPage};
		if(this.data.selectedHeaderValue){
			if(this.data.selectedHeaderValue !== "2"){
				params.relatedId = this.data.selectedHeaderValue;
				params.relationId = this.getRelationId();						
			}
			else{
				delete params.relatedId;
				delete params.relationId;
			}
		}
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				params[key] = this.data.cxPropQueryParam[key];
			}
		}
		/**
		 * @method fetchRecords
		 * @author anuja.manoharan
		 * @version 1.0.0
		 * Called to fetch records from application. Should return a Promise
		 * @params module id
		 * @params query params
		 */
		this.executeMethod("fetchRecords", this.getData("modId"), params).then(function(recs){// No I18n
			_this.initReqResolved = true;
			recs = (recs && recs.length) ? recs : [];
			_this.setData("record", recs);// No I18n
			_this.setData("queryParamObject", Object.assign({}, params));// No I18n
			// if(_this.$node && _this.$node._callee && _this.$node._callee.querySelector("lyte-dropdown")){
			// 	_this.$node._callee.querySelector("lyte-dropdown").close();//No I18n				
			// }
			_this.setData("cxPropShow", true);// No I18n
			// _this.setNext(undefined, undefined, undefined, _this.getData("next")[1], undefined, document.getElementById("navigator"));
			var more = recs.length < _this.data.cxPropPerPage ? false : true;
			if(_this.data.cxPropMetaMoreRecords && recs.$){
				if(recs.$[_this.data.cxPropMetaMoreRecords] === false || (recs.$.meta && recs.$.meta[_this.data.cxPropMetaMoreRecords] === false)){
					more = false;
				}
				else{
					more = true;
				}
			}
			_this.setSelected(recs);
			_this.setNavigator(recs.length, more, true);
		}, function(){
			_cruxUtils.showPermissionDeniedModal();
			//rejected
		});
	}
}, {mixins : ["crux-lookup-mixin", "crux-aria-lookup-mixin" , "crux-mass-action-mixin"]});//no i18n
/**
 * @syntax nonYielded
 * <crux-lookup-modal></crux-lookup-modal>
 */
