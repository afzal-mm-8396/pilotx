/**
 * @component crux-list-view
 * @author rafik.shaik
 * @version 1.0.0
 * @summary crux-list-view component
 */
Lyte.Component.register("crux-list-view", {
_template:"<template tag-name=\"crux-list-view\"> <template is=\"if\" value=\"{{ShowLvLoading}}\"><template case=\"true\"> <div class=\"cxLvLoadingDiv\"><div class=\"cxSpinloader cxLvLoader\"></div></div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(isLvWrapper,'&amp;&amp;',errorDetails.show_error)}}\"><template case=\"true\"> <div class=\"cxPropLayoutShowErrorDiv\"> {{errorDetails.message}} </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropShowLvHeader}}\"><template case=\"true\"><div class=\"cxLvHeader\"> <span class=\"cxLvHeadLeftCont\"> <template is=\"if\" value=\"{{cxPropLvSummaryYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"summary-yield\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{selectedRecords}}\"><template case=\"true\"> <div class=\" {{if(expHandlers(cxPropSelectedIds.length,'>',0),'cxdN','cxFlex cxAlignItemCenter')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSelectedIds.length,'==',0),'&amp;&amp;',cxPropShowTotalRecordCount)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropPerPage,'||',expHandlers(cxPropPerPage,'===',0)),'||',expHandlers(cxPropPage,'>',1)),'&amp;&amp;',expHandlers(cxPropSelectedIds.length,'==',0))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFetchCountValues,'!'),'&amp;&amp;',expHandlers(total_new_count,'==',&quot;###&quot;))}}\"><template case=\"true\"> <span onclick=\"{{action('fetchCountOnReq')}}\">{{cruxGetI18n(\"totalrecords\")}}<span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\"> {{total_new_count}}</span></span> </template><template case=\"false\"> {{cruxGetI18n(\"totalrecords\")}} <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropRecordCount,'!'),'&amp;&amp;',expHandlers(cxPropRecordCount,'!=',0)),'||',show_loading)}}\"><template case=\"true\"> <span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\"> <div class=\"cxLvRecordCountLoader\"></div> </span> </template><template case=\"false\"> <span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\">{{cxPropRecordCount}}</span> </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropSmartFilterYield}}\"><template case=\"true\"><lyte-yield yield-name=\"filter-yield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(sorted_column,'&amp;&amp;',expHandlers(cxPropSelectedIds.length,'==',0))}}\"><template case=\"true\"> <span class=\"cxLvSeparationCircle\"></span> {{cruxGetI18n(\"crm.api.apidashboard.SortBy\")}} <span class=\"cxLvHeaderTextSemiBold cxLvHeaderSortedColName\"> {{sorted_column}}</span> <span class=\"cxLvHeaderActionBtn\" onclick=\"{{action('onUnsortClick','unsort')}}\" data-zcqa=\"lv_unsortLink\">{{cruxGetI18n(\"crm.column.unsort\")}}</span> </template></template> </template></template> </div> <div class=\"{{if(expHandlers(cxPropSelectedIds.length,'>',0),'cxFlex cxAlignCenter','cxdN')}}\"> {{unescape(selectedCount)}} <span onclick=\"{{action('clearFields')}}\" id=\"selectAllEntity\" class=\"cxLvHeaderActionBtn\" data-zcqa=\"clearRecords\">{{cruxGetI18n('crm.title.clear.name')}}</span> <template is=\"if\" value=\"{{expHandlers(expHandlers(showSelectedDiv,'&amp;&amp;',expHandlers(expHandlers(cxPropSearchLetter,'!'),'||',expHandlers(cxPropSearchField,'!'))),'&amp;&amp;',cxPropShowSelectAll)}}\"><template case=\"true\"> <span id=\"selectAllRecords\" class=\"cxLvHeaderSelectAllBtn\" onclick=\"{{action('selectedAllEntity')}}\">{{cruxGetI18n('crm.module.selectall',cruxGetI18n('records'))}} </span> </template></template> </div> </template><template case=\"false\"> <div class=\"cxFlex cxAlignCenter\"> {{unescape(cruxGetI18n('crm.mass.actions.all.selected',selected_count,cruxGetI18n('records')))}} <span onclick=\"{{action('clearFields')}}\" class=\"cxLvHeaderActionBtn\">{{cruxGetI18n('crm.title.clear.name')}}</span> </div> </template></template> </template></template> </span> <template is=\"if\" value=\"{{expHandlers(cxPropRecordCount,'>',0)}}\"><template case=\"true\"> <span class=\"cxLvHeadRightCont\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSelectedIds.length,'==',0),'&amp;&amp;',cxPropShowPerPageDropdown)}}\"><template case=\"true\"> <crux-dropdown data-zcqa=\"dash_currentOption\" class=\"cxLvRecPerPageDd\" cx-prop-box-class=\"cxLvRecPerPageDropBox\" cx-prop-options=\"{{dropDownOptions}}\" cx-prop-selected=\"{{per_page_val}}\" cx-prop-user-value=\"user_value\" cx-prop-system-value=\"system_value\" on-option-select=\"{{method('openDropdown')}}\"> </crux-dropdown> <span class=\"cxLvSeparationCircle\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(selectAllEntity,'!')}}\"><template case=\"true\"> <span class=\"cxLvPageCountLabel\">{{start_record}} - {{end_record}}</span> <lyte-navigator on-next=\"{{method('viewNavigate','next')}}\" on-previous=\"{{method('viewNavigate','previous')}}\" lt-prop-value=\"{{lbind(startIndex)}}\" lt-prop-records=\"{{cxPropRecordCount}}\" lt-prop-perpage=\"{{per_page_val}}\" lt-prop-show-only-icon=\"true\" start-record=\"{{lbind(start_record)}}\" end-record=\"{{lbind(end_record)}}\"></lyte-navigator> </template></template> </span> </template></template> </div></template></template> <div class=\"cxLvLoaderWrap\"> <span class=\"cxLvTableLoader\"></span> </div> <div class=\"cxLvContWrapper\"> <template is=\"if\" value=\"{{cxPropSmartFilterYield}}\"><template case=\"true\"><lyte-yield yield-name=\"custom-filter\"></lyte-yield></template></template> <div class=\"cxLvViewContainer {{if(ifEquals(selectedRecords,false),'cxLvShowOverlay')}}\" id=\"cxLvViewContainer\"> <template is=\"if\" value=\"{{cxPropShowManageColumn}}\"><template case=\"true\"> <span class=\"cxLvTableManageMenuBtn {{if(isOptionOpened,'','')}}\" data-zcqa=\"listView_addColumn\" onclick=\"{{action('showOptionsPopup')}}\" id=\"cxLvTableManageSetting_{{cxPropId}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;Bottom-Left&quot;}\" aria-label=\"{{cruxGetI18n('crm.listview.options.manage')}}\" lt-prop-title=\"{{cruxGetI18n('crm.listview.options.manage')}}\"> <span type=\"button\" class=\"cxLvTableManageMenuBtnIcon\"></span> </span> </template></template> {{addMurhyInfo(\"crux-list-view.html\",\"Feb Default Changes\")}} <crux-table-component cx-prop-id=\"{{cxPropId}}\" cx-prop-cell-suffix-yield=\"{{cxPropCellSuffixYield}}\" cx-prop-row-zcqa=\"detailView\" cx-prop-label-selector=\"list_display_label\" cx-prop-prevent-width=\"{{cv_width_updated}}\" cx-prop-data-bind=\"lyteFastRender\" on-scroll=\"{{method('tableScroll')}}\" cx-prop-body-id=\"lvTred\" cx-prop-column-cell-class=\"{{cxPropColumnCellClass}}\" cx-prop-dual-resize=\"{{cxPropIsResizeEnabled}}\" cx-prop-module-display-field=\"{{cxPropDisplayField}}\" cx-prop-tooltip=\"true\" class=\"cxLvTableComp {{if(expHandlers(cv_width_updated,'!'),'cxLvAutoWidthTable')}} {{cxPropModule}} {{if(ifEquals(LvContent.length,0),'NoDataInRecord')}}\" data-zcqa=\"cxListViewTable\" id=\"listcrux\" cx-prop-sorted-order=\"{{custom_view.sort_order}}\" cx-prop-selected-rows=\"{{cxPropSelectedIds}}\" cx-prop-selected-row-class=\"cxLvTableRowSelected\" on-mouse-out=\"{{action('hideIcons')}}\" on-mouse-over=\"{{action('showIcons')}}\" cx-prop-header-yield=\"{{headerYields}}\" cx-prop-sticky-table=\"{{isStickyTable}}\" cx-prop-header-row-id=\"cxLvTableHeaderRow\" on-resize-end=\"{{method('resizeColumn')}}\" on-resize-select=\"{{method('onResizeSelect')}}\" cx-prop-clip-mode=\"{{clip_mode}}\" cx-prop-table-id=\"cxListViewTable\" cx-prop-enable-all-field-sort=\"{{cxPropEnableAllFieldSort}}\" cx-prop-enable-field-sort=\"{{cxPropEnableFieldSort}}\" cx-prop-sorted-column=\"{{if(ifEquals(from_page,'listview'),if(cxPropSortByComp.api_name,cxPropSortByComp.api_name,cxPropSortByComp.id))}}\" cx-prop-prefix-yields=\"{{cxPropPrefixYields}}\" cx-prop-suffix-yields=\"{{cxPropSuffixYields}}\" on-body-row-click=\"{{action('onRowClick')}}\" cx-prop-enable-body-scroll=\"true\" cx-prop-show-sort-icon=\"{{cxPropShowSortIcon}}\" cx-prop-enable-sort=\"false\" cx-prop-new-list-view=\"true\" cx-prop-is-alpha-search-shown=\"{{cxPropShowSearchLetter}}\" cx-prop-express=\"{{cxPropExpressTable}}\" cx-prop-header=\"{{LvHeader}}\" cx-prop-content=\"{{LvContent}}\" cx-prop-yield-for-suffix=\"{{if(list_cv_btn.length,true)}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-add-search=\"false\" cx-prop-field-type-mapping-selector=\"api_name\" on-sort=\"{{action('showSortDropdown')}}\" cx-prop-no-records-zcqa=\"lvNoRecordsFound\" cx-prop-no-records-message=\"{{cxPropNoRecordsMessage}}\" on-scroll-set-latest-entity-position=\"{{method('latestEntityIdFromTable')}}\" cx-prop-sort-columns=\"{{if(ifEquals(from_page,'listview'),true,if(ifNotEquals(cxPropSortColumns,undefined),cxPropSortColumns,false))}}\" new=\"true\" cx-prop-field-type-mapping=\"{{cxPropFieldMapping}}\" cx-prop-header-properties=\"{{cxPropHeaderProperties}}\" cx-prop-date-properties=\"{{cxPropDateProperties}}\" cx-prop-datetime-properties=\"{{cxPropDatetimeProperties}}\" cx-prop-table-class=\"{{if(clip_mode,'cxLvWrapTextIncluded','')}} {{if(expHandlers(isStickyTable,'!'),'lyteNoStickyTable','')}} {{if(doEnablePinnedColAnim,'cxTableLastPinnedColEnableUiAnim','')}} {{cxPropTableClass}}\" cx-prop-lookup-properties=\"{{lookupProperties}}\" cx-prop-header-tooltip-class=\"\" cx-prop-header-tooltip-config=\"{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot;}\" cx-prop-tooltip-props=\"{&quot;config&quot;:{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot;}, &quot;class&quot; : &quot;&quot;}\"> <template is=\"yield\" yield-name=\"header-prefix-1\" cx-prop-fixed=\"enable\" cx-prop-style=\"width:30px\" lt-prop-class=\"\" on-show-more-tags=\"{{method('showMoreTags')}}\" on-before-set-fix-table-column-width=\"{{method('beforeSetFixTableColumnWidth')}}\" on-after-set-fix-table-column-width=\"{{method('afterSetFixTableColumnWidth')}}\"> </template> <template is=\"registerYield\" yield-name=\"header-prefix-2\" cx-prop-style=\"width:18px\" data-zcqa=\"dummy\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(LvContent.length,'>',0),'&amp;&amp;',expHandlers(clientAccount,'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropHeaderPrefixYield}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropHeaderPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerprefix-yield\"></lyte-yield></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowSelectBox}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-list-view.html\",\"Feb Default Changes\")}} <lyte-checkbox class=\"cxLvUserSelNone {{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;IMAGEVALIDATION&quot;,&quot;>=&quot;,0)),&quot;cxLvDNImp&quot;,&quot;&quot;)}} {{if(diableHeaderCheckbox,&quot;cxLvShowOverlay&quot;,&quot;&quot;)}}\" lt-prop-title=\"{{if(cxPropShowMaxSelectTooltip,cruxGetI18n(&quot;crm.listview.maximum.records.alert&quot;,cxPropMaxSelectCount),&quot;&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\" id=\"selectCheckbox\" data-zcqa=\"listView_selectAllEntity\" lt-prop-id=\"selectAllEntity\" lt-prop-class=\"cxListVwCustomCheckBox\" on-changed=\"{{method(&quot;selectAllEntity&quot;)}}\"></lyte-checkbox> </template></template></template></template> </template></template> </template> <template is=\"yield\" yield-name=\"header-prefix-3\" cx-prop-fixed=\"enable\" cx-prop-style=\"min-width:0px;padding-left:0px !important; padding-right:0px;\"> </template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <div class=\"cxLvEditIconWrapCont\" id=\"icons{{recordObj.id}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowEditIcon,'&amp;&amp;',expHandlers(expHandlers(recordObj.cxPropShowEditIcon,'==',true),'||',expHandlers(recordObj.cxPropShowEditIcon,'==',undefined)))}}\"><template case=\"true\"> <div onclick=\"{{action('stopPropagation',event)}}\" class=\"cxLvActEditIconWrap\" id=\"cxLvIcons_{{record.id}}\"> <template is=\"if\" value=\"{{cxPropShowMoreOption}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" data-zcqa=\"appMoreOptionList\" id=\"cxLvAppMore_{{record.id}}\" href=\"javascript:;\"> <span class=\"cxLvMoreIcon\"></span> </a> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowEditIcon}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" data-cid=\"editbtn\" lt-prop-id=\"cxLvEdit_{{record.id}}\" data-zcqa=\"listViewEdit_{{record.id}}\" onclick=\"{{action('eventEditPopup',this)}}\" id=\"cxLvEdit_{{record.id}}\" href=\"{{if(clientPortalName,concat('/portal/',clientPortalName,getCrmBasePath(),'/EditEntity.do?module=',record.$activity_type,'&amp;id=',record.id,'&amp;cvid=',cvid,'&amp;recordNum=',record.recnum,'&amp;FROM_INDEX=',fromIndex,'&amp;TO_INDEX=',toIndex),concat(getCrmBasePath(),'/',crmPortal,'/EditEntity.do?module=',record.$activity_type,'&amp;id=',record.id,'&amp;cvid=',cvid,'&amp;recordNum=',record.recnum,'&amp;FROM_INDEX=',fromIndex,'&amp;TO_INDEX=',toIndex))}}\" data-params=\"{&quot;module&quot;:&quot;{{record.$activity_type}}&quot;,&quot;id&quot;:&quot;{{record.id}}&quot;,&quot;cvid&quot;:&quot;{{cvid}}&quot;,&quot;recordNum&quot;:&quot;{{record.recnum}}&quot;,&quot;from&quot;:&quot;listview&quot;}\"> <span class=\"cxLvEditIcon\"></span> </a> </template></template></template></template> <template is=\"if\" value=\"{{cxPropShowMoreOptionAfterEdit}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditSecondIcon\" data-zcqa=\"callMoreOption\" id=\"cxLvMore_{{record.id}}\" href=\"javascript:;\"> <span class=\"cxLvMoreIcon\"></span> </a> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowCloseIcon}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditSecondIcon\" href=\"javascript:void(0)\" close-task=\"{{concat('closeTask(&quot;',getCrmBasePath(),'/closeTask.do?action=CloseTask&amp;taskid=',record.id,'&amp;id=',record.id,'&amp;module=Tasks&quot;)')}}\" data-zcqa=\"listViewClose_{{record.id}}\" id=\"cxLvClose_{{record.id}}\" onclick=\"{{action('closeTask',record.id)}}\"> <span class=\"cxLvTickIcon\"></span> </a> </template></template></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropShowQuickActionsMenu,'&amp;&amp;',expHandlers(expHandlers(recordObj.cxPropShowQuickActionsMenu,'==',true),'||',expHandlers(recordObj.cxPropShowQuickActionsMenu,'==',undefined)))}}\"><template case=\"true\"> <span data-zcqa=\"quickActionsMenu\" id=\"quickActionsOptions_{{recordObj.id}}\" class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" lt-prop-title=\"{{cruxGetI18n('crm.dashboard.more.options')}}\" aria-label=\"{{cruxGetI18n('crm.dashboard.more.options')}}\"> <span class=\"cxLvMoreIcon\"></span> </span> </template></template></template></template> </div> </template> <template is=\"registerYield\" yield-name=\"body-prefix-2\"> <template is=\"if\" value=\"{{cxPropBodyPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"bodyprefix-yield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.cxPropPrefixClass}}\"><template case=\"true\"> <span class=\"{{recordObj.cxPropPrefixClass}}\" lt-prop-title=\"{{recordObj.cxPropPrefixTooltip}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_pending')}}\"><template case=\"true\"> <span class=\"cxLvVisionWaitingIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.record.failure.msg&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_rejected')}}\"><template case=\"true\"> <span class=\"cxLvStopProcessIcon cxLvVisionRejectIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.rejected.msg&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_validation')}}\"><template case=\"true\"> <span class=\"cxLvVisionProcessIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.processing&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(recordObj.$stop_processing,'&amp;&amp;',expHandlers(featureName,'!==',&quot;COMPLIANCE&quot;))}}\"><template case=\"true\"> <span class=\"cxLvStopProcessIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.privacy.listview.consent.locked&quot;)}}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.$in_merge}}\"><template case=\"true\"> <span class=\"cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.approvalProcess.label.waitingForFindAndMerge&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(ifEquals(recordObj.$approved,false),'&amp;&amp;',ifEquals(recordObj.$approval.resubmit,false)),'||',expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropAdmin,'&amp;&amp;',expHandlers(recordObj.$review,'==',&quot;Rejected&quot;)),'&amp;&amp;',cxPropShowCheckbox)}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity dd\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"></lyte-checkbox> </template><template case=\"false\"> <span class=\"{{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)),&quot;cxLvWaitingReviewIcon&quot;,&quot;cxLvWaitingApprovalIcon&quot;)}}\" lt-prop-title=\"{{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)),cruxGetI18n(&quot;crm.reviewprocess.record.review.pending&quot;),cruxGetI18n(&quot;crm.approvalProcess.label.waitingForApproval&quot;))}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.Locked__s}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(clientAccount,'!')}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"></lyte-checkbox> </template></template> <template is=\"if\" value=\"{{recordObj.$locked_for_me}}\"><template case=\"true\"> <span data-zcqa=\"lockedforMe_{{recordObj.id}}\" class=\"{{if(expHandlers(clientAccount,'!'),'cxLvLockIconWithCB','')}} cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.record.lock.record.locked&quot;)}}\"></span> </template><template case=\"false\"> <span data-zcqa=\"lockedforOthers_{{recordObj.id}}\" class=\"{{if(expHandlers(clientAccount,'!'),'cxLvLockIconWithCB','')}} cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.record.record.locked.other&quot;)}}\"></span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropShowCheckbox,'&amp;&amp;',expHandlers(clientAccount,'!'))}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"> </lyte-checkbox> </template></template></template></template></template></template></template></template></template></template></template></template></template></template></template></template> </template></template></template></template> </template> <template is=\"yield\" yield-name=\"body-prefix-3\"> <template is=\"if\" value=\"{{recordObj.$upcoming_activity}}\"><template case=\"true\"> <div class=\"cxLvActivityColDiv\"> <span class=\"cxLvActivityIcon {{cxGetActivityIcon(recordObj.$upcoming_activity.module.api_name)}}\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropIsLinkToNotSupported,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropIsActivitySplitDone,'!')}}\"><template case=\"true\"> <span> {{recordObj.$upcoming_activity.date}}</span> <link-to lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" lt-prop-class=\"cxLvActivityColLink {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;Activities&quot;,&quot;{{recordObj.$upcoming_activity.id}}&quot;]\" lt-prop-qp=\"{&quot;sub_module&quot; : &quot;{{recordObj.$upcoming_activity.module.api_name}}&quot; }\" lt-prop-rel=\"noopener noreferrer\"> {{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}} </link-to> </template><template case=\"false\"> <link-to lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" lt-prop-class=\"cxLvActivityColLink {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{recordObj.$upcoming_activity.module.api_name}}&quot;,&quot;{{recordObj.$upcoming_activity.id}}&quot;]\" lt-prop-rel=\"noopener noreferrer\"> <a> {{recordObj.$upcoming_activity.date}}</a> {{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}} </link-to> </template></template> </template><template case=\"false\"> <div data-zcqa=\"activityBadge_{{recordObj.id}}\" lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" class=\"cxLvActivityColLink cxCP {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" onclick=\"{{action('onLvActivityBadgeClick',recordObj,event)}}\">{{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}}</div> </template></template> </div> </template></template> </template> <template is=\"yield\" yield-name=\"header-suffix-1\"></template> <template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"header-suffix-2\"></template> </template></template> <template is=\"yield\" yield-name=\"body-suffix-1\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(recordObj.$stop_processing,'!'),'&amp;&amp;',list_cv_btn.length),'&amp;&amp;',expHandlers(recordObj.$review,'!=',&quot;Rejected&quot;)),'&amp;&amp;',expHandlers(expHandlers(cxPropSystemName,'!'),'||',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;==&quot;,expHandlers(1,'-'))))}}\"><template case=\"true\"> <span id=\"customButtonDetails_{{recordObj.id}}\" class=\"cxLvCustomButtonWrap\" onclick=\"{{action('stopEvent')}}\"> <div id=\"cxLvCustomBtn\" class=\"lyteClubbedButton\"> <lyte-button lt-prop-appearance=\"default\" class=\"cvButtonQuery{{list_cv_btn[0].id}}{{recordObj.id}}\" lt-prop-text=\"{{list_cv_btn[0].name}}\" lt-prop-value=\"{{list_cv_btn[0].name}}\" onmouseover=\"{{action('mouseOverCustomButton','cvButtonQuery',list_cv_btn[0].id,cxEncodeJS(list_cv_btn[0].name),cxEncodeJS(list_cv_btn[0].description),recordObj.id)}}\" onmouseout=\"{{action('mouseOutCustomButton')}}\" lt-prop-id=\"cxLv_custom_button\" lt-prop-size=\"small\" onclick=\"{{action(&quot;executeCustomButtonAction&quot;,list_cv_btn[0].id,this)}}\"> </lyte-button> <template is=\"if\" value=\"{{expHandlers(list_cv_btn.length,'>',1)}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" lt-prop-size=\"small\" id=\"customBtnList_{{cxPropId}}\" onclick=\"{{action('stopCvBtnPropagation',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"></template> </lyte-button> </template></template> </div> </span> </template></template> </template> <template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"body-suffix-2\"></template> </template></template> <template is=\"yield\" yield-name=\"body-eventtypecolour\"> <span class=\"cxLvEventTypeElemCont\"> <template is=\"if\" value=\"{{recordObj.$colour_code}}\"><template case=\"true\"> <span class=\"cxLvEventTypeColorIndicator\" data-zcqa=\"colorspanpl_{{recordObj[fieldObj.api_name]}}\" style=\"background: {{recordObj.$colour_code}}\"></span> </template></template> {{recordObj[fieldObj.api_name]}} </span> </template> <template is=\"yield\" yield-name=\"body-lookup\"> <lyte-yield yield-name=\"listview-{{fieldObj.yieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"body-campaign-type\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.ui_type,'==',2),'&amp;&amp;',expHandlers(fieldObj.enable_colour_code,'==',true))}}\"><template case=\"true\"> <span class=\"cxLvColorAppliedPicklist {{if(recordObj[fieldObj.api_name],'','cxLvColorAppliedPKNone')}}\" data-zcqa=\"colorspanpl_{{recordObj.id}}_{{fieldObj.id}}\" style=\"{{cxGetCVPicklistStyleObj(recordObj[fieldObj.api_name],fieldObj)}}\">{{recordObj[fieldObj.api_name]}}</span> </template><template case=\"false\"> <lyte-text class=\"cxLvCampignTypeText\" lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600 }\" lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{cxContains(&quot;[1,2,3]&quot;,recordObj.$campaign_type)}}\"><template case=\"true\"> <span class=\"cxLvCampignTypeIcon\" data-params=\"{&quot;campaignId&quot;:&quot;{{recordObj.id}}&quot;}\" onclick=\"{{action(&quot;viewCampSummaryOnClick&quot;,event,this)}}\"></span> </template></template> </template> <template is=\"yield\" yield-name=\"body-current_state\"> <template is=\"if\" value=\"{{expHandlers(recordObj[fieldObj.api_name],'==',cruxGetI18n('pf.deleted.state'))}}\"><template case=\"true\"> <lyte-text class=\"cxLvNotFoundColor\" lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template></template> </template> <template is=\"yield\" yield-name=\"body-best_time\"> <template is=\"for\" items=\"{{recordObj[fieldObj.api_name]}}\" item=\"value\" index=\"index\"> <span class=\"cxLvBestTimeTagList\">{{value}}</span> </template> </template> <template is=\"yield\" yield-name=\"body-pf_email_lookup\"> <lyte-text lt-prop-value=\"{{recordObj[fieldObj.api_name].name}}\"></lyte-text> </template> <template is=\"yield\" yield-name=\"body-activity_type\"> <div> <template is=\"if\" value=\"{{expHandlers(recordObj[fieldObj.api_name],'!=',cruxGetI18n(&quot;Events&quot;))}}\"><template case=\"true\"> <div> {{recordObj[fieldObj.api_name]}} </div> </template><template case=\"false\"> <div> {{cxGetModuleDisplayName(false,true,true,cxPropGetModuleDisplayNameInActivities)}}</div> </template></template> </div> </template> <template is=\"yield\" yield-name=\"body-territory\"> <lyte-text lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot; }\" lt-prop-value=\"{{cxGetTerritorityValue(recordObj[fieldObj.api_name])}}\"></lyte-text> </template> <template is=\"if\" value=\"{{cxPropShowSearchLetter}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"header-alpha-search\"> <span id=\"cxLvAlphaSortBtn_{{cxPropId}}\" class=\"cxLvAlphaSortBtn {{if(expHandlers(ifNotEquals(cxPropSearchLetter,'All'),'&amp;&amp;',ifEquals(cxPropSearchField,fieldName)),'cxLvAlphaSortBtnSel')}}\"> <span id=\"cxLvAlphaSearch\" class=\"cxLvAlphaSearch\" data-zcqa=\"alphaSearch\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSearchLetter,'!==',&quot;All&quot;),'&amp;&amp;',expHandlers(cxPropSearchField,'===',fieldName))}}\"><template case=\"true\"> {{cruxGetI18n(cxPropSearchLetter)}} </template><template case=\"false\"> All </template></template> </span> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSearchLetter,'!=',&quot;All&quot;),'&amp;&amp;',expHandlers(cxPropSearchField,'===',fieldName))}}\"><template case=\"true\"> <span onclick=\"{{action(&quot;alphaSearchHandling&quot;,event)}}\" class=\"cxLvAlphaSortEdit\"> <span class=\"cxLvAlphaSortEditIcon\"></span> </span> </template><template case=\"false\"> <span class=\"cxLvAlphaSortBtnDdIcon\"></span> </template></template> </span> </template> </template></template> <template is=\"yield\" yield-name=\"cellSuffixYield\" from-parent=\"\"></template> </crux-table-component> </div> </div> <template is=\"if\" value=\"{{cxPropShowSearchLetter}}\"><template case=\"true\"> <lyte-menu id=\"cxLvAlphaSortMenu_{{cxPropId}}\" lt-prop-freeze=\"false\" lt-prop-yield=\"true\" lt-prop-query=\"span#cxLvAlphaSortBtn_{{cxPropId}}\" lt-prop-tabindex=\"10\" lt-prop-event=\"click\" lt-prop-prevent-inside-click=\"true\" on-before-open=\"{{method('showDropbox')}}\" on-before-close=\"{{method('hideDropBox')}}\" on-menu-click=\"{{method('AlphasortRecord')}}\" lt-prop-wrapper-class=\"cxLvAlphaSortMenu\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvAlphaSortMenuBody\" class=\"cxLvAlphaSortMenuBody\"> <template is=\"if\" value=\"{{showAlphaDropBox}}\"><template case=\"true\"> <lyte-menu-item data-value=\"All\" class=\"{{if(expHandlers(expHandlers(cxPropSearchField,'&amp;&amp;',expHandlers(cxPropSearchField,'!==',alphaDropBoxField)),'||',expHandlers(cxPropSearchLetter,'==','All')),'cxLvAlphaSortMenuSel','')}}\"> {{cruxGetI18n(\"All\")}}</lyte-menu-item> <template is=\"for\" items=\"{{sortingOrder}}\" item=\"item\" index=\"indeval\"> <lyte-menu-item data-value=\"{{item}}\" data-zcqa=\"alphaSearch_{{item}}\" class=\"{{if(expHandlers(expHandlers(cxPropSearchField,'==',alphaDropBoxField),'&amp;&amp;',expHandlers(cxPropSearchLetter,'==',item)),'cxLvAlphaSortMenuSel','')}}\"> {{item}}</lyte-menu-item> </template></template></template> </lyte-menu-body> </template> </lyte-menu> </template></template> <lyte-menu lt-prop-yield=\"true\" id=\"cxLvSortUnsortMenu\" lt-prop-event=\"click\" lt-prop-query=\"#cxTableSortIcon_{{cxPropId}}\" on-menu-click=\"{{method('sortRecord')}}\" data-zcqa=\"sort_div\" lt-prop-freeze=\"false\" on-before-open=\"{{method('sortBtnDisplay')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvSortMenuBody\" class=\"cxLvSortMenuBody\"> <template is=\"for\" items=\"{{sortDetails}}\" item=\"order\" index=\"index\"> <lyte-menu-item data-value=\"{{order.data_value}}\" data-zcqa=\"sorting_{{order.data_value}}\" id=\"pinHidden\" class=\"cxSortItemMenu {{if(expHandlers(expHandlers(expHandlers(expHandlers(cxPropPinedFieldsLength,'>=',cxPropPinedFieldsLimit),'&amp;&amp;',expHandlers(order.data_value,'===','Pin Column')),'||',expHandlers(islockedListView,'&amp;&amp;',expHandlers(expHandlers(order.data_value,'===','Pin Column'),'||',expHandlers(order.data_value,'===','UnPin Column')))),'||',expHandlers(disableHideOpt,'&amp;&amp;',expHandlers(order.data_value,'===','Hide Column'))),'cxLvDisabled','')}}\"> {{order.label}} <span class=\"cxLvSortMenuIcon {{order.class}}\"></span> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-modal lt-prop-wrapper-class=\"cxColumnListNew cxColumnListOnPopup\" id=\"newPopup\" lt-prop-allow-multiple=\"true\" lt-prop-show-close-button=\"false\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-width=\"395px\" lt-prop-show=\"{{showModal}}\" on-before-show=\"{{method('beforePopoverShow')}}\" on-show=\"{{method('onPopoverShow')}}\" on-close=\"{{method('closePopover')}}\" on-before-close=\"{{method('beforePopoverClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-modal-header> <lyte-modal-content class=\"cxLvMangeColumnModalContent\"> <crux-column-list cx-prop-hide-search=\"false\" cx-prop-id=\"addColumnContainer\" id=\"columnListId\" cx-prop-max-select-column=\"{{cxPropMaxSelectColumn}}\" cx-prop-fields=\"{{ordered_fields1}}\" cx-prop-selected-fields=\"{{selected_fields1}}\" on-search=\"{{method(&quot;columnResize&quot;)}}\" on-drop-item=\"{{method(&quot;itemDrop&quot;)}}\" on-before-unchecked=\"{{method(&quot;beforeUnchecking&quot;)}}\" on-before-checked=\"{{method(&quot;beforeSelection&quot;)}}\" cx-prop-data-bind=\"{{cxPropColumnListDataBind}}\" cx-prop-disable-sort-for-unselected-fields=\"true\" cx-prop-pin-unpin-option=\"{{cxPropPinUnpinColumn}}\" cx-prop-property-fields=\"{{property_fields}}\" cx-prop-pin-field-limit=\"1\" on-pin-option-changed=\"{{method(&quot;PinOptionChanged&quot;)}}\"> </crux-column-list> </lyte-modal-content> <template is=\"if\" value=\"{{showPopoverfooter}}\"><template case=\"true\"> <lyte-modal-footer class=\"right\"> <lyte-button data-zcqa=\"listViewCancelbtn\" onclick=\"{{action('closePopover')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.cancel\")}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-disabled=\"{{isColumnListSaveDisabled}}\" id=\"columnlistPrimaryBtn\" lt-prop-class=\"primarybtn\" data-zcqa=\"listViewSubmitbtn\" onclick=\"{{action('saveCustomView')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{ifEquals(from,&quot;mBuilderBusinessCard&quot;)}}\"><template case=\"true\"> {{cruxGetI18n(\"crm.button.done\")}} </template><template case=\"false\"> {{cruxGetI18n(\"crm.button.save\")}} </template></template> </template> </lyte-button> </lyte-modal-footer> </template></template> </template> </lyte-modal> <lyte-menu lt-prop-yield=\"true\" id=\"cxLvTableManagePopup\" lt-prop-event=\"click\" lt-prop-query=\"#cxLvTableManageSetting_{{cxPropId}}\" lt-prop-freeze=\"false\" on-close=\"{{method('popoverClose')}}\" on-open=\"{{method(&quot;onManageColumnListOpen&quot;)}}\" lt-prop-position=\"downAlignLeft\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxLvTableManageMenuBody\"> <template is=\"if\" value=\"{{cxPropShowManageColumn}}\"><template case=\"true\"><template is=\"if\" value=\"{{isManageColumnsEnabled}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('showColumnList')}}\" id=\"addColumnOrginate\" data-zcqa=\"lv_manageColumn\">{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item lt-prop-title=\"{{cruxGetI18n(&quot;crm.listview.customview.locked&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;followcursor&quot;, &quot;appearance&quot; : &quot;box&quot;}\" class=\"cxLvTableManagePopLiDisabled\" data-zcqa=\"lv_manageColumn\">{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-menu-item> </template></template> </template></template><template is=\"if\" value=\"{{expHandlers(featureName,'!==','PORTALS')}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('resetColumnWidth')}}\" class=\"{{if(disableResetOption,'cxLvTableManagePopLiDisabled')}}\" data-zcqa=\"lv_resetWidth\">{{cruxGetI18n(\"crm.listview.options.reset.width\")}}</lyte-menu-item> </template></template><template is=\"if\" value=\"{{clip_mode}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('changeWrap','wrap')}}\" data-zcqa=\"lv_clipWrapSwitch\">{{cruxGetI18n(\"crm.listview.options.text.wrap\")}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item onclick=\"{{action('changeWrap','clip')}}\" data-zcqa=\"lv_clipWrapSwitch\">{{cruxGetI18n(\"crm.listview.options.text.clip\")}}</lyte-menu-item> </template></template></template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"quickActionsOptionsmenu_{{entityId}}\" on-before-open=\"{{method('onBeforeQuickActionsMenuOpen',event)}}\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu cxLvMoreOptionLongMenu\" lt-prop-event=\"click\" lt-prop-query=\"#quickActionsOptions_{{entityId}}\" lt-prop-freeze=\"true\" lt-prop-position=\"down\" on-close=\"{{method('onMenuClose','quickAction')}}\" on-before-close=\"{{method('onbeforeMenuClose')}}\" on-open=\"{{method('onQuickActionsMenuOpen')}}\" on-menu-click=\"{{method('onQuickActionsMenuClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvQuickActionsOptionsList\" data-zcqa=\"quickActionsOptionsList\"> <template is=\"for\" items=\"{{quickActionMenu}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;Edit&quot;)}}\"><template case=\"true\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}\" class=\"menuNoPadd\"> {{cruxGetI18n(\"crm.button.edit\")}} </lyte-menu-item> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;add_tag&quot;),'||',expHandlers(item.value,'==',&quot;edit_tag&quot;))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;add_tag&quot;)}}\"><template case=\"true\"> <lyte-menu-item data-value=\"add\" data-zcqa=\"tagOptions_Add\" id=\"tagOptions_{{entityId}}_add\">{{item.name}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item data-value=\"edit\" data-zcqa=\"tagOptions_edit\" id=\"tagOptions_{{entityId}}_edit\">{{item.name}}</lyte-menu-item> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;mass_convert&quot;),'&amp;&amp;',expHandlers(expHandlers(cxPropModule,'===',&quot;Quotes&quot;),'||',expHandlers(cxPropModule,'===',&quot;SalesOrders&quot;)))}}\"><template case=\"true\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}_{{cxPropModule}}\" class=\"cxLvCDefault\"> {{item.name}} <span class=\"cxLvMoreOptDropdownIcon\"></span> </lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}\" class=\"{{if(expHandlers(item.value,'==','more'),'cxLvCDefault','')}}\"> {{item.name}} <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;more&quot;)}}\"><template case=\"true\"> <span class=\"cxLvMoreOptDropdownIcon\"></span> </template></template> </lyte-menu-item> </template></template></template></template></template></template> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu on-open=\"{{method('addMoreOptions')}}\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsActivityMenu cxLvMoreOptionsMenu cxLvMoreOptionLongMenu\" lt-prop-event=\"hover\" lt-prop-query=\"#qAOptions_{{entityId}}_more\" lt-prop-freeze=\"false\" lt-prop-position=\"right\" on-close=\"{{method('clearSelected','more')}}\" on-before-close=\"{{method('onbeforeCallsMenuClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"moreOptions_{{entityId}}\" data-zcqa=\"moreOptions_{{entityId}}\"> <template is=\"for\" items=\"{{activitiesMenu}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"{{if(expHandlers(expHandlers(item.value,'==','create_call'),'&amp;&amp;',item.isNewCallView),'cxLvCDefault','')}}\" data-value=\"{{item.value}}\" data-zcqa=\"moreOptInQAOpt_{{item.value}}\" id=\"moreOptions_{{entityId}}_{{item.value}}\" onclick=\"{{action('moreActionsValue',item.value,this,event)}}\" onmouseenter=\"{{action('callsMenuOpen',item.value,this,event)}}\" onmouseleave=\"{{action('callsMenuClose',event)}}\"> {{item.name}} <template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;create_call&quot;),'&amp;&amp;',item.isNewCallView)}}\"><template case=\"true\"> <span class=\"cxLvMoreOptDropdownIcon\"></span> </template></template> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-query=\"#moreOptions_{{entityId}}_create_call\" lt-prop-event=\"hover\" lt-prop-position=\"right\" id=\"cxLvMoreOptionsCallMenu\" lt-prop-force-click=\"true\" lt-prop-yield=\"true\" lt-prop-show=\"{{lbind(showMenu)}}\" data-zcqa=\"manual_call_list_popover\" lt-prop-callout=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsCallMenu cxLvMoreOptionsMenu {{if(isFromQuickAction,'cxLvMoreOptionLongMenu','')}}\" lt-prop-height=\"auto\" lt-prop-duration=\"0\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method(&quot;onClose&quot;)}}\" on-before-open=\"{{method('onBeforeShow')}}\" on-menu-click=\"{{method('subMenuClick')}}\" on-before-close=\"{{method(&quot;onBeforeMenuClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvCallSubMenu\"> <lyte-menu-item data-zcqa=\"manual_schedule_call\" data-value=\"schedule\">{{cruxGetI18n('crm.label.schedule.call')}}</lyte-menu-item> <lyte-menu-item data-zcqa=\"manual_complete_call\" class=\"{{if(isLiteUser,'cxLvDisabled','')}}\" data-value=\"manual\">{{cruxGetI18n('crm.manualcalllist.complete.call')}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <lyte-menu on-before-open=\"{{method('onCallsMenuOpen')}}\" on-close=\"{{method('onMenuClose')}}\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\"#cxLvMore_{{entityId}}\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvCallMoreOption\" data-zcqa=\"callMoreOption\"> <template is=\"if\" value=\"{{hasCompleteAction}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvCompleteCallMoreOption\" onclick=\"{{action('showCallPopup','Completed')}}\" data-zcqa=\"completeCallMoreOption\">{{cruxGetI18n('crm.label.mark.completed')}} </lyte-menu-item> </template></template><template is=\"if\" value=\"{{cxPropHasEditPermissionForCalls}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvScheduleCallMoreOption\" onclick=\"{{action('showCallPopup','Scheduled')}}\" data-zcqa=\"scheduleCallMoreOption\">{{cruxGetI18n('crm.label.reschedule.call','call')}}</lyte-menu-item> <lyte-menu-item id=\"cxLvCancelCallMoreOption\" onclick=\"{{action('showCallPopup','Cancelled')}}\" data-zcqa=\"cancelCallMoreOption\">{{cruxGetI18n('crm.label.cancel.call','call')}}</lyte-menu-item> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"cxLvAppoinmentMoreOptionsMenu\" on-before-open=\"{{method('onCallsMenuOpen')}}\" on-close=\"{{method('onMenuClose')}}\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\"#cxLvAppMore_{{entityId}}\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"appMoreOptionList\" data-zcqa=\"appMoreOptionList\"> <template is=\"if\" value=\"{{expHandlers(isScheduled,'&amp;&amp;',cxPropHasEditPermissionForApp)}}\"><template case=\"true\"><template is=\"if\" value=\"{{hasCompleteAction}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvCompleteAppMoreOption\" onclick=\"{{action('showAppPopup','appointmentCompletePopup',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"completeAppMoreOption\"> {{cruxGetI18n('crm.appointments.status.markcompleted1')}}</lyte-menu-item> </template></template> <lyte-menu-item id=\"cxLvRescheduleAppMoreOption\" onclick=\"{{action('showAppPopup','Reschedule_Information',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"rescheduleMoreOption\"> {{cruxGetI18n('crm.appointments.status.markreschedule',cxGetSingularLabel('Appointments'))}}</lyte-menu-item> <lyte-menu-item id=\"cxLvCancelAppMoreOption\" onclick=\"{{action('showAppPopup','Cancellation_Information',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"cancelAppMoreOption\" class=\"cxLvAppointMenuItemSplit\"> {{cruxGetI18n('crm.appointments.status.markcancel',cxGetSingularLabel('Appointments'))}}</lyte-menu-item> </template></template> <template is=\"if\" value=\"{{cxPropHasEditPermissionForApp}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvEditAppRecordbtn\" onclick=\"{{action('eventEditPopup',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"editAppRecordbtn\">{{cruxGetI18n('Edit')}}</lyte-menu-item> </template></template><template is=\"if\" value=\"{{cxPropHasDeletePermissionForApp}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvDeleteAppRecordbtn\" onclick=\"{{action('deleteApp',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"deleteAppRecordbtn\"> {{cruxGetI18n('Delete')}}</lyte-menu-item> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-position=\"downAlignLeft\" id=\"cxLvCustomBtnMenu\" lt-prop-wrapper-class=\"cxLvCustBtnMenu cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-freeze=\"false\" lt-prop-event=\"click\" lt-prop-query=\"#customBtnList_{{cxPropId}}\" on-before-open=\"{{method('customBtnClick')}}\" on-menu-click=\"{{method('executeCustomButtonMethod')}}\" on-open=\"{{method('makeSortableBtn')}}\" on-close=\"{{method('hideMenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cvBtnContainer_{{cxPropId}}\"> <template is=\"if\" value=\"{{expHandlers(list_cv_btn.length,'>',5)}}\"><template case=\"true\"> <lyte-search id=\"cxLvBtnSearch_{{cxPropId}}\" lt-prop-placeholder=\"Search Button\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;#customButtonsList_{{cxPropId}}&quot;, &quot;search&quot; : &quot;lyte-menu-item&quot;}\" data-zcqa=\"CVBtnSearchBox\" on-search=\"{{method('setCss')}}\"> </lyte-search> </template></template> <div id=\"customButtonsList_{{cxPropId}}\" class=\"cxLvCustomButtonsMenuList\" onmouseleave=\"{{action('customBtnMouseOut',this)}}\"> <template is=\"for\" items=\"{{list_cv_btn}}\" item=\"action\" index=\"index\"> <lyte-menu-item data-value=\"{{action.id}}\" class=\"customButtonQuery{{action.id}}\" cscript-tag=\"customBtn_{{action.id}}\" onmouseover=\"{{action('mouseOverCustomButton','customButtonQuery',action.id,cxEncodeJS(action.name),cxEncodeJS(action.description))}}\" onmouseout=\"{{action('mouseOutCustomButton')}}\">{{action.name}}</lyte-menu-item> </template> </div> </lyte-menu-body> </template> </lyte-menu> <div id=\"cxLvCustomButtonPopover\"> <lyte-popover lt-prop-wrapper-class=\"cxLvCustomButtonPopover\" id=\"cxLvCustomButtonPopover\" lt-prop-max-width=\"400px\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <div class=\"cxLvCustPopFormElem\"> <div class=\"cxLvCustPopLabel\">{{cruxGetI18n('crm.custombutton.name')}}:</div> <div class=\"cxLvCustPopValue\">{{popoverName}}</div> </div> <template is=\"if\" value=\"{{popoverDescription}}\"><template case=\"true\"> <div class=\"cxLvCustPopFormElem cxLvCustPopFormDesc\"> <div class=\"cxLvCustPopLabel\">{{cruxGetI18n('crm.customize.custombutton.function.desc')}}:</div> <div class=\"cxLvCustPopValue\">{{popoverDescription}}</div> </div> </template></template> </lyte-popover-content> </template> </lyte-popover> </div> <lyte-menu lt-prop-query=\"span#showMoreDesc\" id=\"LvMoreDescMenu\" lt-prop-freeze=\"false\" lt-prop-wrapper-class=\"cxLvDescMenuPopup LvDescMenuPopup_{{cxPropId}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"10\" lt-prop-event=\"click\" lt-prop-prevent-inside-click=\"true\" lt-prop-type=\"box\" lt-prop-width=\"auto\" lt-prop-height=\"auto\" on-before-open=\"{{method('onBeforeDescMenuOpen')}}\" on-before-close=\"{{method('onHideDescMenu')}}\" on-open=\"{{method('onDescMenuOpen')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxLvDescMenuBody\"> <span class=\"cxLvDescCloseIcon\" onclick=\"{{action('onDescMenuClose')}}\"></span> <pre class=\"cxLvDescContDiv\">{{descDescription}}</pre> </lyte-menu-body> </template> </lyte-menu> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"text","position":[1,2,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3]},{"type":"text","position":[5,1]},{"type":"attr","position":[7]},{"type":"text","position":[7,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"text","position":[3,3,0]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"attr","position":[5,3,1]},{"type":"if","position":[5,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[5,3,3]},{"type":"attr","position":[5,3,5]},{"type":"attr","position":[5,3,5,1]},{"type":"registerYield","position":[5,3,5,1],"dynamicNodes":[]},{"type":"registerYield","position":[5,3,5,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,5],"dynamicNodes":[]},{"type":"registerYield","position":[5,3,5,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,13],"dynamicNodes":[]},{"type":"attr","position":[5,3,5,15]},{"type":"if","position":[5,3,5,15],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,17],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[5,3,5,19]},{"type":"if","position":[5,3,5,19],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,21],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background: '","recordObj.$colour_code"]}}}}]}},"default":{}},{"type":"text","position":[1,3]}]},{"type":"registerYield","position":[5,3,5,23],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[5,3,5,25],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxGetCVPicklistStyleObj","args":["recordObj[fieldObj.api_name]","fieldObj"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,27],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,29],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]},{"type":"registerYield","position":[5,3,5,31],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[5,3,5,33],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,35],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5,3,5,37]},{"type":"if","position":[5,3,5,37],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,39],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,3,5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"registerYield","position":[9,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[9]},{"type":"attr","position":[11]},{"type":"registerYield","position":[11,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[11]},{"type":"attr","position":[13]},{"type":"registerYield","position":[13,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[13]},{"type":"attr","position":[15]},{"type":"registerYield","position":[15,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[15]},{"type":"attr","position":[17]},{"type":"registerYield","position":[17,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[17]},{"type":"attr","position":[19]},{"type":"registerYield","position":[19,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[19]},{"type":"attr","position":[21]},{"type":"registerYield","position":[21,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[21]},{"type":"attr","position":[23]},{"type":"registerYield","position":[23,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"text","position":[2,1]},{"type":"componentDynamic","position":[2]},{"type":"attr","position":[4]},{"type":"text","position":[4,1]},{"type":"componentDynamic","position":[4]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[23]},{"type":"attr","position":[25]},{"type":"registerYield","position":[25,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[25]},{"type":"registerYield","position":[27,1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,3,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[27,1]},{"type":"attr","position":[29]},{"type":"registerYield","position":[29,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[29]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropNoRecordsMessage","cxPropPinedFieldsLimit","cxPropShowSelectBox","cxPropPinedFieldsLength","cxPropDisplayField","cxPropFieldMapping","cxPropSortByComp","cxPropModuleActionsMenu","cxPropCvid","cxPropShowManageColumn","cxPropPerPage","cxPropSearchLetter","cxPropPage","cxPropSearchField","cxPropModule","cxPropHasEditPermissionForCalls","cxPropHasDeletePermissionForApp","cxPropHasEditPermissionForApp","cxPropMaxColCnt","cxPropAdmin","cxPropSystemName","cxPropFetchCountValues","cxPropId","cxPropUserDetailsId","cxPropMassOperationTotalLimit","cxPropUserDetailsIsPaidUser","cxPropUserDetailsMaxRange","cxPropIsActivitySplitDone","cxPropUserDetailsProfileName","cxPropUserDetailsCrmImpliedCreateCalls","cxPropUserDetailsCrmImpliedCreateEvents","cxPropUserDetailsCrmImpliedCreateAppointments","cxPropCrmImpliedEditModule","cxPropIsInventoryModule","cxPropModuleApiName","cxPropIdModuleMapping","cxPropModuleInfo","cxPropDefaultUiTypeCruxMapping","cxPropGetModuleDisplayNameInActivities","cxPropMaxSelectCount","cxPropModuleId","cxPropModuleApiMapping","cxPropModuleRecordMapping","cxPropIsLinkToNotSupported","cxPropShowEditIcon","cxPropShowQuickActionsMenu","cxPropShowCheckbox","cxPropShowSearchLetter","cxPropShowMoreOption","cxPropShowMoreOptionAfterEdit","cxPropShowCloseIcon","cxPropSuffixYields","cxPropShowPerPageDropdown","cxPropShowMaxSelectTooltip","cxPropProfileId","cxPropColumnCellClass","cxPropDisabledList","cxPropSortColumns","cxPropDisableRowClass","diableHeaderCheckbox","cxPropExpressTable","cxPropAllowEncryptedFields","cxPropPerPageOptions","cxPropPrefixYields","cxPropCustomButton","cxPropCustomView","cxPropListViewContent","cxPropRelatedList","cxPropRecordCount","cxPropIsLookupYield","cxPropSmartFilterYield","cxPropShowSortIcon","cxPropBodyPrefixYield","cxPropHeaderPrefixYield","cxPropShowLvHeader","cxPropSelectedIds","cxPropShowCustomButton","cxPropShowActivityBadge","cxPropIsNewCallView","cxPropPinUnpinColumn","cxPropShowSelectAll","cxPropShowTotalRecordCount","cxPropFireBulkRequest","cxPropLvSummaryYield","cxPropActivityBadgeUpgradeEnabled","cxPropPermissions","cxPropMaxSelectColumn","cxPropEnableHideColumn","cxPropColumnListDataBind","cxPropEnableFieldSort","cxPropHeaderProperties","cxPropDateProperties","cxPropDatetimeProperties","cxPropEnableAllFieldSort","cxPropTableClass","LvHeader","LvContent","show_loading","total_new_count","doEnablePinnedColAnim","persistPinUpdate","persistWidthUpdate","persistWrapUpdate","selectedCount","actionsForStopProcessingRec","countFetched","manage_columns_visible","popoverName","popoverDescription","position","customButtonFocus","isOptionOpened","activity_badge","selected_count","cxPropLookupProperties","lookupProperties","updateWidthValue","width_prev_cvid","clip_mode","startRecord","dropDownOptions","isManageColumnsEnabled","list_cv_btn","selectedRecords","selectViewArray","showSelectedDiv","showAlphaDropBox","sortingOrder","startIndex","start_record","end_record","selected_fields","selected_fields1","ordered_fields","ordered_fields1","showPopoverfooter","showModal","appointmentHiddenFields","tasksHiddenFields","servicesHiddenFields","from","type","featureName","property_fields","columnListOpen","disableResetOption","showCont","cxPropIsResizeEnabled","selectAllEntity","islockedListView","recordObjForQuickAction","hasCompleteAction","quickActionMenu","headerYields","cv_width_updated","isStickyTable","sortDetails","clientAccount","from_page","activitiesMenu","custom_view","cv_mod_fields","cv_mod_pined_fields","showToolTip","sortIconFieldId","last_pop_entity","ShowLvLoading","errorDetails","descDescription","isLvWrapper","per_page_val","disableHideOpt","cxPropCellSuffixYield","isColumnListSaveDisabled"],
_observedAttributesType :["string","number","boolean","number","object","object","object","array","string","boolean","number","string","number","string","string","boolean","boolean","boolean","number","boolean","string","boolean","string","string","number","boolean","number","boolean","string","boolean","boolean","boolean","boolean","boolean","string","object","object","object","string","number","string","object","object","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","boolean","boolean","string","string","array","boolean","string","boolean","boolean","boolean","array","array","array","object","array","array","number","boolean","boolean","boolean","boolean","boolean","boolean","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","object","number","boolean","string","boolean","object","object","object","boolean","string","array","array","boolean","string","boolean","boolean","boolean","boolean","string","array","boolean","boolean","string","string","string","boolean","boolean","string","number","object","object","boolean","string","boolean","number","array","boolean","array","boolean","array","boolean","boolean","array","number","number","number","array","array","array","array","boolean","boolean","array","array","array","string","string","string","array","boolean","boolean","boolean","boolean","boolean","boolean","object","boolean","array","object","boolean","boolean","array","boolean","string","array","object","object","array","boolean","string","string","boolean","object","string","boolean","number","boolean","boolean","boolean"],

	data : function(){
		return {
			/**
			 * @componentProperty { string } cxPropNoRecordsMessage
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropNoRecordsMessage:Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropPinedFieldsLimit
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPinedFieldsLimit : Lyte.attr('number',{default : 1}), //No I18N
			/**
			 * @componentProperty { boolean } cxPropShowSelectBox=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowSelectBox:Lyte.attr('boolean',{default:true}),
			/**
			 * @componentProperty { number } cxPropPinedFieldsLength
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPinedFieldsLength : Lyte.attr("number"), //No I18N
			/**
			 * @componentProperty { object } cxPropDisplayField
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDisplayField : Lyte.attr("object",{default :typeof crmConstants !== "undefined" && crmConstants.moduleDisplayField ? crmConstants.moduleDisplayField : {}}),//No I18N
			/**
			 * @componentProperty { object } cxPropFieldMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFieldMapping:Lyte.attr('object'),
			/**
			 * @componentProperty { object } cxPropSortByComp
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSortByComp : Lyte.attr('object',{default : {}}),
			/**
			 * @componentProperty { array } cxPropModuleActionsMenu
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleActionsMenu : Lyte.attr('array',{default :  []}),//No I18n
			/**
			 * @componentProperty { string } cxPropCvid
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropCvid : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { boolean } cxPropShowManageColumn=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowManageColumn : Lyte.attr("boolean",{default : true}),//No I18N
            /**
             * @componentProperty { number } cxPropPerPage
             * @author rafik.shaik
             * @version 1.0.0
             */
            cxPropPerPage:Lyte.attr('number'),
			/**
			 * @componentProperty { string } cxPropSearchLetter
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSearchLetter : Lyte.attr('string',{default:"All"}),
			/**
			 * @componentProperty { number } cxPropPage
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPage:Lyte.attr('number',{default:1}),
			/**
			 * @componentProperty { string } cxPropSearchField
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSearchField : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropModule
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModule:Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropHasEditPermissionForCalls=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasEditPermissionForCalls : Lyte.attr("boolean", {"default" : typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Edit_Calls : false }), //No i18n
			/**
			 * @componentProperty { boolean } cxPropHasDeletePermissionForApp=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasDeletePermissionForApp : Lyte.attr('boolean', {"default" :typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Delete_Appointments : false}), 
			/**
			 * @componentProperty { boolean } cxPropHasEditPermissionForApp=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasEditPermissionForApp : Lyte.attr('boolean', {"default" :typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Edit_Appointments : false}), //No i18n
			/**
			 * @componentProperty { number } cxPropMaxColCnt
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMaxColCnt:Lyte.attr("number",{default:typeof Search !== 'undefined' ? Search.MAX_COL_CNT : 100}),
			/**
			 * @componentProperty { boolean } cxPropAdmin=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropAdmin : Lyte.attr("boolean", {"default":typeof Crm !== "undefined" ? Crm.userDetails.IS_ADMIN : false}),//No i18n
			/**
			 * @componentProperty { string } cxPropSystemName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSystemName:Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropFetchCountValues=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFetchCountValues : Lyte.attr("boolean", {default :typeof Crm !== "undefined" ? Crm.userDetails.fetchCountValues : false }), //No i18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropId:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropUserDetailsId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsId:Lyte.attr("string",{default:typeof Crm !== "undefined" ? Crm.userDetails.USER_ID : ""}),
			/**
			 * @componentProperty { number } cxPropMassOperationTotalLimit
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMassOperationTotalLimit:Lyte.attr("number",{default:typeof Crm !== "undefined" ? Crm.massOperationTotalLimit : 0}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsIsPaidUser=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsIsPaidUser:Lyte.attr("boolean",{default:typeof Crm !== "undefined" ? Crm.userDetails.ISPAID_USER : false}),
			/**
			 * @componentProperty { number } cxPropUserDetailsMaxRange
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsMaxRange:Lyte.attr("number",{default:typeof Crm !== 'undefined' ? Crm.userDetails.maxRange : 0}),
			/**
			 * @componentProperty { boolean } cxPropIsActivitySplitDone=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsActivitySplitDone:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.isActivitySplitDone : false}),
			/**
			 * @componentProperty { string } cxPropUserDetailsProfileName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsProfileName:Lyte.attr("string",{default:typeof Crm !== 'undefined' ? Crm.userDetails.PROFILE_NAME : ""}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateCalls=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateCalls:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Calls : false}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateEvents=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateEvents:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Events : false}),  
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateAppointments=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateAppointments:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Appointments : false}),
			/**
			 * @componentProperty { boolean } cxPropCrmImpliedEditModule=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropCrmImpliedEditModule:Lyte.attr("boolean",{default:false}),  
			/**
			 * @componentProperty { boolean } cxPropIsInventoryModule=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsInventoryModule:Lyte.attr("boolean",{default:false}),    
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleApiName:Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropIdModuleMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIdModuleMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropModuleInfo
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleInfo:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropDefaultUiTypeCruxMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDefaultUiTypeCruxMapping:Lyte.attr("object",{default:typeof crmConstants !== "undefined" && crmConstants.defaultUiTypeToCruxMapping ? crmConstants.defaultUiTypeToCruxMapping : {}}),
			/**
			 * @componentProperty { string } cxPropGetModuleDisplayNameInActivities
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropGetModuleDisplayNameInActivities:Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropMaxSelectCount
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMaxSelectCount:Lyte.attr("number",{default:typeof crmConstants !== "undefined" && crmConstants.maxSelectCount ? crmConstants.maxSelectCount : 500}),
			/**
			 * @componentProperty { string } cxPropModuleId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleId:Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropModuleApiMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleApiMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleRecordMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { boolean } cxPropIsLinkToNotSupported=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsLinkToNotSupported:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowEditIcon=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowEditIcon:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowQuickActionsMenu=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowQuickActionsMenu:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowCheckbox=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowCheckbox:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { boolean } cxPropShowSearchLetter=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowSearchLetter:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { boolean } cxPropShowMoreOption=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowMoreOption:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowMoreOptionAfterEdit=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowMoreOptionAfterEdit:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowCloseIcon:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { array } cxPropSuffixYields
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSuffixYields:Lyte.attr("array" , {default:[]}),
			/**
			 * @componentProperty { array } cxPropPrefixYields
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowPerPageDropdown:Lyte.attr("boolean",{default:true}),
			cxPropShowMaxSelectTooltip : Lyte.attr("boolean",{default:true}),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			cxPropColumnCellClass : Lyte.attr("string",{"input" : true}),
			cxPropDisabledList : Lyte.attr("array",{default:[]}),
			cxPropSortColumns : Lyte.attr("boolean"),
			cxPropDisableRowClass : Lyte.attr("string",{default:""}),
			diableHeaderCheckbox : Lyte.attr("boolean",{default:false}),
			cxPropExpressTable : Lyte.attr("boolean",{default:true}),
			cxPropAllowEncryptedFields : Lyte.attr("boolean",{default:true}),
			cxPropPerPageOptions : Lyte.attr("array"),
			cxPropPrefixYields:Lyte.attr("array"),
			cxPropCustomButton:Lyte.attr("array"),
			cxPropCustomView:Lyte.attr("object"),
			cxPropListViewContent:Lyte.attr("array",{default:[]}),
			cxPropRelatedList:Lyte.attr("array"),
			cxPropRecordCount:Lyte.attr("number"),
			cxPropIsLookupYield:Lyte.attr("boolean",{default:false}),
			cxPropSmartFilterYield:Lyte.attr("boolean",{default:false}),
			cxPropShowSortIcon:Lyte.attr("boolean",{default:true}),
			cxPropBodyPrefixYield:Lyte.attr("boolean",{default:false}),
			cxPropHeaderPrefixYield:Lyte.attr("boolean",{default:false}),
			cxPropShowLvHeader:Lyte.attr("boolean",{default:true}),
			cxPropSelectedIds:Lyte.attr('array',{default:[]}),
			cxPropShowCustomButton:Lyte.attr("boolean",{default:false}),
			cxPropShowActivityBadge:Lyte.attr("boolean",{default:false}),
			cxPropIsNewCallView : Lyte.attr("boolean",{default : typeof isNewCallView !== "undefined" ? isNewCallView : true}),
			cxPropPinUnpinColumn:Lyte.attr("boolean",{default:true}),
			cxPropShowSelectAll : Lyte.attr("boolean", {default : true}),
			cxPropShowTotalRecordCount : Lyte.attr("boolean", {default:true}),
			cxPropFireBulkRequest : Lyte.attr("boolean", {default :true}),
			cxPropLvSummaryYield : Lyte.attr("boolean",{default:false}),
			cxPropActivityBadgeUpgradeEnabled : Lyte.attr("boolean",{ default : typeof Crm !== 'undefined' ? Crm.userDetails.activityBadgeUpgradeEnabled : false}),
			cxPropPermissions : Lyte.attr("object",{ default : typeof Crm !== 'undefined' ? Crm.userDetails.permissions : {}}),
			cxPropMaxSelectColumn : Lyte.attr("number"),
			cxPropEnableHideColumn : Lyte.attr("boolean", {default :true}),
			cxPropColumnListDataBind : Lyte.attr("string", {default : "lyteFastRender"}),//No I18n
			cxPropEnableFieldSort : Lyte.attr("boolean"),
			cxPropHeaderProperties: Lyte.attr("object"),
			cxPropDateProperties: Lyte.attr('object'),
			cxPropDatetimeProperties: Lyte.attr('object'),
			cxPropEnableAllFieldSort : Lyte.attr("boolean", {default :true}),
			
			cxPropTableClass: Lyte.attr("string", {default : ""}),

			//local props
			LvHeader:Lyte.attr('array',{default:[]}),
			LvContent:Lyte.attr('array',{default:[]}),
			show_loading : Lyte.attr("boolean", {default : true}), 
			total_new_count : Lyte.attr("string",{default:"###"}),
			doEnablePinnedColAnim : Lyte.attr("boolean",{default : false}), 
			persistPinUpdate : Lyte.attr("boolean", {default : true}),
			persistWidthUpdate :  Lyte.attr("boolean",{default : true}),
			persistWrapUpdate :  Lyte.attr("boolean",{default : true}),
			selectedCount:Lyte.attr("string"),
			actionsForStopProcessingRec:Lyte.attr("array",{default:[]}),
			countFetched:Lyte.attr("boolean",{default:false}),
			manage_columns_visible: Lyte.attr('boolean',{default:true}), 
			popoverName : Lyte.attr('string'), 
			popoverDescription :Lyte.attr('string'),  
			position : Lyte.attr('string'), 
			customButtonFocus : Lyte.attr('boolean',{default :false}) ,
			isOptionOpened : Lyte.attr("boolean", {default : false}),
			activity_badge : Lyte.attr("string",{default : "enabled"}), 
			selected_count:Lyte.attr("number"),
			cxPropLookupProperties : Lyte.attr("object" , {default : {}}),
			lookupProperties : Lyte.attr("object", {default : {routeName : "crm.tab.module.entity.detail", target : "_self"}}),
			updateWidthValue : Lyte.attr("boolean",{default : false}),
			width_prev_cvid : Lyte.attr("string",{default : ""}),
			clip_mode : Lyte.attr("boolean",{default : false}),
			startRecord:Lyte.attr('number',{"default":0}),
			dropDownOptions:Lyte.attr('array'),
			isManageColumnsEnabled : Lyte.attr("boolean",{default : true}),
			list_cv_btn : Lyte.attr("array",{default:[]}),
			selectedRecords:Lyte.attr('boolean',{default:true}),
			selectViewArray:Lyte.attr('array',{default:[]}),
			showSelectedDiv:Lyte.attr('boolean',{default:false}),
			showAlphaDropBox:Lyte.attr('boolean',{default:false}),
			sortingOrder:Lyte.attr('array',{default:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']}),
			startIndex:Lyte.attr('number',{default:0}),
			start_record : Lyte.attr('number'), 
			end_record : Lyte.attr('number'),
			selected_fields : Lyte.attr("array", { default : [] }),
			selected_fields1 : Lyte.attr("array", { default : [] }),
			ordered_fields : Lyte.attr("array", { default : [] }),
			ordered_fields1 : Lyte.attr("array", { default : [] }),
			showPopoverfooter : Lyte.attr("boolean", {default : false}),
			showModal : Lyte.attr("boolean", {default : false}),
			appointmentHiddenFields:  Lyte.attr("array", { default : ["RESCHEDULEDFROM","REMINDER","ENDTIME","JOBSHEETSECTION","ISJOBSHEETCREATED"]}),
			tasksHiddenFields: Lyte.attr("array", { default : ["REMINDAT","SENDNOTIFICATION"]}),
			servicesHiddenFields : Lyte.attr("array", { default : ["AVAILABLE_DATES","AVAILABLE_DAYS","UNAVAILABLE_TILL","STARTING_DATE","CLOSING_DATE","JOBSHEETLAYOUT", "APPOINTMENTFOR","SEID", "APPOINTMENTLOCATION", "APPOINTMENTID", "APPOINTMENTADDRESS", "APPOINTMENTDATEANDTIME", "RESCHEDULEDFROM", "SERVICEID", "RESCHEDULEDTO", "RESCHEDULEDREASON", "RESCHEDULEDNOTE", "CANCELLATIONREASON", "CANCELLATIONNOTE", "SERVICEAVAILABILITY", "AVAILABLE_CUSTOM_TIMING","UNAVAILABLE_FROM"]}),
			from : Lyte.attr("string",{default:"list"}),
			type : Lyte.attr("string", { default : "popup" }),
			featureName : Lyte.attr("string"),
			property_fields : Lyte.attr("array", { default : [] }),
			columnListOpen : Lyte.attr("boolean",{default : false}),
			disableResetOption : Lyte.attr("boolean",{default : true}),
			showCont : Lyte.attr("boolean",{default:false}),
			cxPropIsResizeEnabled : Lyte.attr("boolean",{default : true}),
			selectAllEntity : Lyte.attr('boolean',{default :false}), 
			islockedListView : Lyte.attr("boolean", {default : false}),
			recordObjForQuickAction : Lyte.attr('object',{default : {}}), 
			hasCompleteAction : Lyte.attr('boolean', {"default" : true}),
			quickActionMenu : Lyte.attr('array',{default : []}),
			headerYields : Lyte.attr("object"),
			cv_width_updated : Lyte.attr("boolean", {default : false}),
			isStickyTable : Lyte.attr("boolean"),
			sortDetails:Lyte.attr('array',{default:[]}),
			// showActionBtn : Lyte.attr("boolean", { default: false }), 
			clientAccount:Lyte.attr('boolean',{default:typeof window.clientPortalName !== "undefined" && window.clientPortalName ? true : false}),
			from_page : Lyte.attr("string",{default : "listview"}), 
			activitiesMenu:Lyte.attr('array',{default:[]}),
			custom_view : Lyte.attr("object"),
			cv_mod_fields : Lyte.attr("object" , { default : {}}),
			cv_mod_pined_fields : Lyte.attr("array",{default : []}),
			showToolTip:Lyte.attr('boolean',{default:true}),
			sortIconFieldId : Lyte.attr("string"),
			last_pop_entity : Lyte.attr("string",{default : ""}),
			ShowLvLoading:Lyte.attr("boolean",{default:true}),
			errorDetails:Lyte.attr("object",{default:{"show_error":false}}),
			descDescription : Lyte.attr("string",{default : ""}),
			isLvWrapper : Lyte.attr("boolean",{default:false}),
			per_page_val : Lyte.attr("number"),
			disableHideOpt : Lyte.attr("boolean", {default : false}),
			cxPropCellSuffixYield: Lyte.attr("boolean", { default: true }),
			isColumnListSaveDisabled : Lyte.attr("boolean", {default : true})
		};
	},
	init: function(){
			var module_name = this.data.cxPropModule;
			if(this.data.cxPropPerPage == undefined){
				this.setData('cxPropPerPage',10);
			}
			if(module_name ){
				var mod_rec_map = this.data.cxPropModuleRecordMapping;
				if(mod_rec_map && Object.keys(mod_rec_map).length>0){
					if(!this.data.cxPropModuleId){
						this.setData("cxPropModuleId",mod_rec_map[module_name].id);
					}
					// if(!this.data.cxPropCvid && mod_rec_map[module_name] && mod_rec_map[module_name].custom_view){
					// 	this.setData("cxPropCvid",mod_rec_map[module_name].custom_view.id);
					// }
				} 
				if(!this.data.cxPropModuleApiName){
					this.setData("cxPropModuleApiName",this.data.cxPropModuleApiMapping[module_name]);
				}
				this.setData({'module':this.data.cxPropModule,"isStickyTable":this.checkForStickyTable()}); 
				var Lv_con=this.data.cxPropListViewContent;
				if( Lv_con && Lv_con.length > 0){
					this.setDataBeforeRender(this.data.cxPropListViewContent);
				}
				this.setData("dropDownOptions",this.constructRCOptions()); //No I18n
				this.records=[];
				this.onDataLoad=false;
				this.onBeforeLoad = true;
				this.makeApiRequests();
			}else if(this.data.isLvWrapper){
				this.setData("ShowLvLoading",false);
				if(this.getMethods("onBeforeLoadFailure")){
					/**
					* This method will be executed on failure resp at initial load;
					* @method onBeforeLoadFailure
					* @author rafik.shaik
					*/	
					this.executeMethod("onBeforeLoadFailure");//No I18n
				}
				var msg;
				if([10,20,30,40,50,100,500].indexOf(this.data.cxPropPerPage)===-1){
					msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
				}else{
					msg="Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect.";
				}
				this.setErrorMsg(msg);
			}
	},
	getFieldMeta : function(value , key='id'){
		return this.data.LvHeader.filter(fld=>fld[key] === value)[0];
	},
	didDestroy : function(){
		// window.removeEventListener('resize', this._resize, true);
		// clearTimeout(this.timerForRelatedFields);
		// this.checkForPropsUpdate();
		// window.removeEventListener('beforeunload',this._propsSave);
	},

	didConnect : function(){
		//some handling is pending
		// this._resize = true;
		if(this.data.cxPropSelectedIds && this.getData("cxPropSelectedIds").length){
			this.headerSelection();
		}
		// window.addEventListener('resize', this._resize, true);
		var getElement = $L('.lyteExpTableOrigTableInnerWrap')[0];
		var setElement = $L('#cxListViewTable');
		// this._propsSave =this.checkForPropsUpdate.bind(this);
		// window.addEventListener('beforeunload',this._propsSave);
		this.setWidthForTable();
		if(getElement && getElement.scrollWidth > getElement.clientWidth) {
			setElement.addClass('setMaxWidthForTable');
		}
		// var cxLvTableManagePopup = this.$node.querySelector('#cxLvTableManagePopup');
		// if(cxLvTableManagePopup){
		// 	cxLvTableManagePopup.ltProp({"headerPadding" : "0px 5px 0px 5px","contentPadding" : "0","footerPadding" : "8px 15px"});
		// }
		this.$node.clearSelectedRecords=()=>{
			this.clearSelectedRecords();
		}
		this.$node.getSelectedIds = ()=>{
			return this.data.cxPropSelectedIds;
		};
	},

	actions : {
		moreActionsValue:function(item){
			
		},
		showCallPopup : function(status){
			
		},
		fetchCountOnReq : function(){
			if(this.getMethods('onFetchRecordCount')){
					this.executeMethod("onFetchRecordCount",this.data.cxPropModule ,this.data.cxPropCvid);
			}else{
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== 'undefined'){
					commonUtils.showHideLoadingDiv(true);
				}
				var qp = {};
				var _this = this;
				store.triggerAction(this.data.cxPropModuleInfo.id,"count",qp).then(function(res){
					_this.setData({'total_new_count':res.count,'cxPropRecordCount':res.count,'show_loading':false});
					_this.getData('cxPropModuleInfo').total_count = res.count;//no i18n
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== 'undefined'){
						commonUtils.showHideLoadingDiv();
					}
				});
			}
			
		},
		stopEvent:function(){
			
		},
		customBtnMouseOut : function(_self){
			if(_self.parent){
				_self.parent.ltProp('show', false);
			}
		},
		executeCustomButtonAction : function(buttonId){
			var recordid  = this.getData("entityId"); //No i18n
			this.executeCustomButton(buttonId,recordid);
		},	
		stopCvBtnPropagation : function(event){
			event.stopPropagation();
		},
		mouseOverCustomButton : function(query,id,name,description,recordId){
			this.mouseOverCustomButton(query,id,name,description,recordId);
		},
		mouseOutCustomButton : function(){
			this.mouseOutCustomButton();
		},
		callsMenuOpen:function(value){
			var $manualCallListPopover = $L('#cxLvMoreOptionsCallMenu',this.$node);
			if($manualCallListPopover[0]){
				if(value === "create_call" && this.data.cxPropIsNewCallView) {
					$manualCallListPopover[0].ltProp({'show' : true});
				}else{
					$manualCallListPopover[0].ltProp({'show' : false});
				}
			}
		},
		callsMenuClose:function(event){
			var closePopOver =  ! ( event.relatedTarget._callee !== undefined && event.relatedTarget._callee.nodeName === 'CRUX-LIST-VIEW' || event.relatedTarget.className !== undefined && event.relatedTarget.className.indexOf('aOptMenuIcon') !== -1  || event.relatedTarget.id !== undefined && event.relatedTarget.id.indexOf('_create_call') !== -1 || event.fromElement !== undefined && event.fromElement.id.indexOf('_create_call') !== -1 || event.currentTarget.id !== undefined && event.currentTarget.id.indexOf('_create_call') !== -1 ) ;
			if (closePopOver){
				var $manualCallListPopover = $L('#cxLvMoreOptionsCallMenu',this.$node);
				if($manualCallListPopover[0]){
					$manualCallListPopover[0].ltProp({'show' : false});
				}
			}
		},
		selectedAllEntity:function(){
			var mod_info = this.data.cxPropModuleInfo;
			var _self = this;
			if(!_self.getData('countFetched')){
				var queryObj = {"cvid" : this.data.cxPropCvid, module: mod_info.module_name, "approved" : true };
				// searchLetter = Lyte.Router.getRouteInstance().getQueryParams().cxPropSearchLetter;
				var searchLetter = _self.data.cxPropSearchLetter;
				//added for ZOHO-CRM-I242930
				if(mod_info.territory && mod_info.territory.id){
					queryObj.territory_id = mod_info.territory.id;
					if(mod_info.territory.subordinates){
						queryObj.include_child =  mod_info.territory.subordinates;
					}
				}if(searchLetter && searchLetter !== "All"){
					queryObj.alphabet = searchLetter;
				}
				store.triggerAction(mod_info.id,"count",queryObj).then(function(res){ //No i18n
					var module_info  = _self.data.cxPropModuleInfo;
					// module_info.selected_count = res.count;
					_self.setData("selected_count",res.count);
					_self.selectAllDivAction(module_info, _self);
					if(!queryObj.alphabet){
						_self.setData('countFetched',true);//no i18n
					}
				},function(error) {
					var eResp = error.response ? JSON.parse(error.response) : undefined;
					if(error.status === 403 || eResp && eResp.code === "NO_PERMISSION"){
						if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
							renderingUtils.displayPermissionDenied();
						}else{
							Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
						}
			        }
				}.bind(this));
			}else{
				this.selectAllDivAction(mod_info,_self);
			}
		},
		stopPropagation:function(event){
			event.stopPropagation();
			event.cancelBubble = true;
		},
		onUnsortClick:function(value){
			// var sort_by=store.peekRecord('custom_view',this.data.cvid).sort_by
			if(!(this.getData("custom_view.sort_by") && this.getData("custom_view.sort_by.id"))){
				return;
			}
			this.sortRecord(value,undefined,undefined,undefined,this.getData("custom_view.sort_by"),this.getData("custom_view.sort_by").id);//No I18N
		},
		alphaSearchHandling: function() {
			this.setData({"cxPropSearchLetter":"All","cxPropSearchField":undefined});
			if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
				this.selectAllEntity(true);
			}
			this.getCount = true;
			this.setData("show_loading",true);
			// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// this.setData({"custom_view":resp,'listfields':resp.fields})
				this.fetchRelatedRecords();
			// }.bind(this))
        },
		showIcons:function(id,_self){
			var selfList = _self.classList;
				if(!selfList.contains('cxLvTableRowHover')){ //No I18N
					selfList.add( 'cxLvTableRowHover' );//No I18N
				}
				var relList = _self._relatedRow ? _self._relatedRow.classList : undefined;
				if( relList && !relList.contains('cxLvTableRowHover')){ //No I18N
					relList.add('cxLvTableRowHover');//No I18N
				}	
				var customBtnId = ".lyteExpTableOrigTableInnerWrap #customButtonDetails_" + id; //No I18N
				var customBtn = $L("#cxLvCustomBtn");
				this.setData('entityId',id)	;
			if(customBtn[0] && $L(customBtnId)[0] && $L(customBtnId)[0].childElementCount === 0){
				LyteComponent.appendChild($L(customBtnId)[0],customBtn[0]);
				// this.addsortable();
			}
			if(this.getData("clip_mode") && id !== this.getData('last_pop_entity')){
				this.setData('last_pop_entity',id);//No I18N
				var textFields = _self.getElementsByClassName('cxLvTextAreaElem'),//No I18N
				relRowFields = _self._relatedRow ? _self._relatedRow.getElementsByClassName('cxLvTextAreaElem') : [];//No I18N
				//For text fields popup
				var showDesc = function(field){
					var popElem = field.getElementsByClassName('showMoreAddedEvents')[0];
					if(popElem){
						var preElem = field.getElementsByTagName('pre')[0];
						if(preElem){
							if( preElem.scrollWidth > preElem.offsetWidth){
								popElem.classList.remove('cxLvDescBtnHide');//No I18N
							}else{
								popElem.classList.add('cxLvDescBtnHide');//No I18N
							}
						}
					}
				};
				if (textFields && Array.isArray(textFields) && textFields.forEach) {
					textFields.forEach(showDesc);
				}
				// if (relRowFields && Array.isArray(relRowFields)) {
					 relRowFields.forEach(showDesc);
				// }
		}
		if(_self){
			_self.classList.remove("trialyellowbox", "list-border-left");
			if(_self._relatedRow){
				_self._relatedRow.classList.remove("trialyellowbox", "list-border-left");
			}
		}
		// _self ? _self.classList.remove("trialyellowbox", "list-border-left") : "";//No I18n
		// _self && _self._relatedRow ? _self._relatedRow.classList.remove("trialyellowbox", "list-border-left") : "";//No I18n



		},
		hideIcons:function(id,_self){
			var selfList = _self.classList;
			var editIcon = $L('.moreOptionIcon'); //No I18N
			var moreIcon = $L(_self).find('crmutil-icon.moreOptionSvg'); //No I18N
			if(selfList.contains('cxLvTableRowHover') && !(editIcon.length > 0 && editIcon[0].classList.contains('lyteMenuSelected') || moreIcon.length > 0 && moreIcon[0].classList.contains('lyteMenuSelected'))){ //No I18N
				selfList.remove('cxLvTableRowHover');//No I18N
			}
			var relList = _self._relatedRow ? _self._relatedRow.classList : undefined;
			if( relList && !relList.contains('cxLvTableRowHover')){ //No I18N
				relList.remove('cxLvTableRowHover');//No I18N
			}

		},
		resetColumnWidth:function(){
			 var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
			 if(!custom_view){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			 }
			var cv_fields = [],
			updateNeeded = false,
			_expTable = $L('#cxListViewTable',this.$node) ,tmpObj;
			this.setData("showCont",false);
			if(this.getData("cv_width_updated")){
				this.loderStarts(true);
				setTimeout( function() {
					if(_expTable[0] && _expTable[0].getData('ltPropStickyTable')){
						_expTable.find('.lyteExpOriginalTable').css("width","");//No I18N	
					}
					custom_view.fields.forEach(function(field){
						tmpObj = Object.assign({},field);
						if(tmpObj._width){
							updateNeeded =  this.getData('persistWidthUpdate');
							tmpObj._width = undefined;
							delete tmpObj._width;
						}
						cv_fields.push(tmpObj);
					}.bind(this));
					var cfLen = this.getData("LvHeader").length,tagWidth;
					if(updateNeeded){
						custom_view.$ ? custom_view.$.set("fields", cv_fields) : custom_view.fields = cv_fields;//No I18N
						var LoadingDiv=typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined";
						if(LoadingDiv){
							commonUtils.showHideLoadingDiv(true);
						}
						// var cvObj = {id : module_info.custom_view.id};
						// var qp = {module : module_info.api_name};
						// if(this.data.isFromModal){
						// 	this.setFeatureSpecificParams(qp, this.data.featureName);
						// }
						//comment out
						// store.triggerAction("custom_view","reset_width",cvObj,qp).then(function(res){ //No I18N
							if(LoadingDiv){
								commonUtils.showHideLoadingDiv(false);
							}
							for(var i = 0 ; i < cfLen ; i++){
								//Added since crux-table is unbound
								if(this.data.LvHeader[i].api_name === "Tag"){
									tagWidth = this.getDefaultWidthForField(this.data.LvHeader[i].ui_type) + "px"; //No I18n
									this.reRenderTagComponent(this.data.clip_mode, tagWidth);
									Lyte.objectUtils(this.data.LvHeader[i],"add","tagWidth",tagWidth);//No I18N
								}
								Lyte.objectUtils(this.data.LvHeader[i],"delete","width");//No I18N
								Lyte.objectUtils(this.data.LvHeader[i],"add","style","");//No I18N
							}
							this.setData({"cv_width_updated":false,"width_prev_cvid":"","cv_mod_fields":new Map()});
							if(_expTable[0]){
								
								_expTable[0].setColumnWidth();
								_expTable[0].setVisibleFixedHeader();
							}
							setTimeout(function(){
								if(!this.getData('clip_mode')){
									// this.setHeight();
								}
								this.loderStarts(false);
							}.bind(this),0);
						// },function(res){
						// 	custom_view.$.rollBack();
						// 	if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
						// 		commonUtils.showHideLoadingDiv(false);
						// 	}
						// 	_self.loderStarts(false);
						// }.bind(this));
					}else{
						for( var j = 0 ; j < cfLen ; j++ ){
							if(this.data.LvHeader[j].api_name === "Tag"){
								tagWidth = this.getDefaultWidthForField(this.data.LvHeader[j].ui_type) + "px"; //No I18n
								this.reRenderTagComponent(this.data.clip_mode, tagWidth);
								Lyte.objectUtils(this.data.LvHeader[j],"add","tagWidth",tagWidth);//No I18N
							}
							Lyte.objectUtils(this.data.LvHeader[j] ,"add" ,"style","");//No I18
						}
						this.setData({"cv_mod_fields":new Map(),"cv_width_updated":false,"width_prev_cvid": ""});
						if( _expTable ){
							_expTable[0].setColumnWidth();
							_expTable[0].setVisibleFixedHeader();
						}
						setTimeout(function(){
							if(!this.getData('clip_mode')){
								// this.setHeight();
							}
							this.loderStarts(false);
						}.bind(this),0);
					}
				}.bind(this), 0);
				// event.stopPropagation();
				this.setData('isResetClick',true);
			}
		},
		changeWrap:function(view){
			this.loderStarts(true);
			 this.setData("showCont",false);//No I18N
			 setTimeout( function() {
					var clip_mode = view === 'clip',//No I18N
					_expTable = $L('#cxListViewTable',this.$node)[0];
					this.setData({'isOptionOpened':false,"clip_mode":clip_mode});
					// this.setData("isNeedWrapPersist", true);//No I18N
					//Added since crux-table is unbound
					var tagField = this.data.LvHeader.filter(function(field){ return field.api_name === 'Tag' ; });//No I18N
					if(tagField.length){
						this.reRenderTagComponent(clip_mode, tagField[0].tagWidth);
					}
					if(_expTable){
						_expTable.fixRowHeight();
						_expTable.fixColumn();
					}
					setTimeout(function(){	
						// _this.setHeight();
						this.loderStarts(false);
					}.bind(this),0);
			 }.bind(this), 0);
			// event.stopPropagation();
		},
		closePopover:function(){
			// this.setData('closePopover',true);
			this.hidePopover();
		},
		saveCustomView:function(){
			this.addCVFieldsInRecordFetch = true
			var columnList = $L("crux-column-list" , this.columnListModal)[0].component,
			ordered_fields = columnList.getSelectedFields(), property_fields =  columnList.getSelectedPropertyFields(),activity_badge_selected_Ui,pined_fields_Change = false,containsPinField = false;
			var arr = [];
			var lookarr = [];
			var lookText = "";
			var _self = this;
	
			var prev_cv_width_conf = new Map();
			var pined_fields = this.getData('cv_mod_pined_fields');
			var cv_width_map = this.getData("cv_mod_fields") ? this.data.cv_mod_fields : new Map();
			var widthChanged = cv_width_map.size > 0;
			var customview = this.data.custom_view ||  store.peekRecord('custom_view',this.getData('cxPropCvid')) ;
			var tmpMap = new Map();
			_self.pinUpdateFailed = false;
			var prevPinLength = pined_fields.length;
			if(_self.data.from === 'list'){
				customview.fields.forEach(function(field){
					if(field._width){
						prev_cv_width_conf.set(field.id , field._width);
			    	}
				});
			}
			pined_fields.forEach(function(pined_field) {
				var pined_field_present;
				ordered_fields.forEach(function(field) {
					if(pined_field_present === undefined && field.id === pined_field) {
						pined_field_present = true;
					}
				});
				if(!pined_field_present) {
					pined_fields.removeFirstOccurenceOfElement(pined_field);
				}
			});
			var _pinFieldWidth = 0, _pinFieldLen = 0;
			/* eslint-disable @zoho/webperf/no-multipleDOMLookup */
			ordered_fields.forEach(function(item){
				if(item && item.selected && (item.pinned || pined_fields.includes(item.id))){
					_pinFieldWidth += widthChanged  ? cv_width_map.has(item.id) ? cv_width_map.get(item.id) : item.width ? item.width : _self.getDefaultWidthForField(item.ui_type) : prev_cv_width_conf.has(item.id) ? prev_cv_width_conf.get(item.id) : _self.getDefaultWidthForField(item.ui_type);
					_pinFieldLen++;
				}
			});
			var presentPinFields = [];
			ordered_fields.forEach(function(item){
				if(item && item.selected){
					var obj = { api_name : item.api_name, id : item.id, _pin : item.pinned !== undefined ? item.pinned :  pined_fields.includes(item.id)};
				
				var index = pined_fields.indexOf(item.id);
				switch(obj._pin){
					case true:
						if(item._pin_order){
							obj._pin_order = item._pin_order;
						}
						// if(index===-1){
						// 	pined_fields.push(item.id)
						// 	presentPinFields.push(obj);
						// 	pined_fields_Change = true;
						// }
						if(index === -1 || item._pin_order && index + 1 !== item._pin_order){
							if(index !== -1){
								pined_fields.splice(index,1);
							}
							pined_fields.splice(item._pin_order - 1,0,item.id);
							presentPinFields.push(obj);
							pined_fields_Change = true;
						}
						containsPinField = true;
							break;
					case false:
						if(index !== -1){
							pined_fields.splice(index,1);
								pined_fields_Change = true;
						}
						break;
				}
				if(_self.data.from === 'list'){
					var pinedWidthChanged = false;
					if(obj._pin){
						var columnWidth = widthChanged  ? cv_width_map.has(item.id) ? cv_width_map.get(item.id) : item.width ? item.width : _self.getDefaultWidthForField(item.ui_type) : prev_cv_width_conf.has(item.id) ? prev_cv_width_conf.get(item.id) : _self.getDefaultWidthForField(item.ui_type);
						// var tableWidth = document.querySelector('.lyteExpTableOrigTableInnerWrap').clientWidth; //No I18n
						var tableWidth = $L(".lyteExpTableOrigTableInnerWrap",this.$node)[0].clientWidth;
						var fixedPrefixColumnsWidth = _self.calculatefixedColumnWidth();
						// if(columnWidth && tableWidth) {
							// 100 px - for ManageColumns and remaining pixel(10%)
							if(columnWidth && tableWidth && fixedPrefixColumnsWidth + _pinFieldWidth + 100 > tableWidth) {
								cv_width_map.set(item.id, Math.round((tableWidth - fixedPrefixColumnsWidth - 100) / _pinFieldLen));
								pinedWidthChanged = true;
							}
				
						// }
					}
					if(!pinedWidthChanged) {
						if( widthChanged ){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
							if(!cv_width_map.has(item.id)){
								var width = item.width ? item.width : _self.getDefaultWidthForField(item.ui_type);
								cv_width_map.set(item.id, width);
							}
						}else if(prev_cv_width_conf.has(item.id)){
							cv_width_map.set( item.id, prev_cv_width_conf.get(item.id) );
						}
						else{
							tmpMap.set(item.id, _self.getDefaultWidthForField(item.ui_type));
						}
					}
				}
				if(item.data_type === "lookup"){
					lookarr.push(item);
					lookText = lookText.concat(item.field_label + ', ');
				}
				arr.push(obj);
			}
			});
			/* eslint-enable @zoho/webperf/no-multipleDOMLookup */
			if(_self.data.from === 'list'){
				if(tmpMap.size > 0 && cv_width_map.size > 0){
					tmpMap.forEach(function(width, id){
						cv_width_map.set(id , width);
					});
				}
				if(cv_width_map.size > 0 ){
					_self.setData('cv_width_updated',true);//No I18n
					_self.setData("width_prev_cvid", customview.id);//No I18n
				}
			}
			var moduleInfo = this.data.cxPropModuleInfo ;
			var activity_badge_selected = property_fields.find(element => element.api_name === 'activity_badge');
			var activityBadge = this.getData('activity_badge').toLowerCase() , tempObj;
			let selFields1 = this.data.selected_fields1.map(function(x) {
				tempObj = {api_name: x.api_name, id: x.id , _pin: x.pinned !== undefined ? x.pinned : pined_fields.includes(x.id)};
				if(tempObj._pin && x._pin_order){
					tempObj._pin_order = x._pin_order;
				}
				return tempObj;
			});
			if(  activity_badge_selected === undefined && activityBadge && activityBadge === "enabled")
			{
				activity_badge_selected_Ui = "disabled"; //No I18n
			}
			else if( activity_badge_selected !== undefined && activityBadge && activityBadge === "disabled")
			{
				activity_badge_selected_Ui = "enabled"; //No I18n
			}
			if(this.data.selected_fields1.map(x => x.api_name).join() === arr.map(x => x.api_name).join() && JSON.stringify(selFields1) === JSON.stringify(arr) && activity_badge_selected_Ui === undefined) {
				this.fieldmodified = false;
				// if(this.data.ordered_fields.length === this.data.selected_fields1.length){
					this.hidePopover();
				// }
				return;
			}

			var isFieldUpdate = false;
			if(this.data.selected_fields1.length !== arr.length){
				isFieldUpdate = true;
			}
			if(!isFieldUpdate){
				var fieldsLength = arr.length;
				for(var i = 0;i < fieldsLength;i++){
					if(arr[i].id !== this.data.selected_fields1[i].id || arr[i].api_name !== this.data.selected_fields1[i].api_name){
						isFieldUpdate = true;
						break;
					}
				}
			}

			if(lookarr.length > 5){
				// getElemById('lookupCrt').style.display='none';
				// getElemById('lookupSelect').style.display='';
				// getElemById('lookupSelectCol').innerText = lookText;
				this.setData("closePopover",false); //No I18N
				// showAnimatePopup('lookupErrorMsg'); //No I18N
				$L('.cxColumnListNew').addClass('popupLookupEnable');
			}else if(this.getMethods("onSaveCustomView")){
					/**
					 * This method will be executed on save of custome view
					 * @method onSaveCustomView
					 * @author rafik.shaik
					 */
					this.executeMethod("onSaveCustomView",arr);//no i18n
				}else{
					var columPrimBtn = $L("#columnlistPrimaryBtn")[0];
					// columPrimBtn.setData("ltPropDisabled", true); //no i18n
					// if(this.getMethods("onSaveCustomView")){
					// 	this.executeMethod("onSaveCustomView",arr,this);//no i18n
					// }
		_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

					var paramObj = {"module":_self.data.cxPropModuleInfo.api_name};//No I18N
					// if(customview.$==undefined){
					// 	_self.hidePopover();
					// 	_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid meta Data/custom_view info has been provided'}});
					// 	return ;
					// }
					customview.$ ? customview.$.set("fields",arr) : ( customview.fields = arr ); //No I18n
					var noPrevPinField = !prevPinLength && pined_fields_Change;
					var cvObj = {fields : noPrevPinField ? presentPinFields : customview.fields, id : this.getData('cxPropCvid')}; //No I18N
					// var _self = this;
					if(!isFieldUpdate){
						if(activity_badge_selected_Ui){
							this.activityBadgeUpdate(moduleInfo,activity_badge_selected_Ui,columPrimBtn,isFieldUpdate);
						}
						if(pined_fields_Change){
							this.pinUnpinUpdate(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField);
						}
						this.fieldmodified = false;
						// if(this.data.ordered_fields.length === this.data.selected_fields1.length){
						// 	this.hidePopover();
						// }
						this.hidePopover();
						return;
					}
					// customview.$.set("fields",arr); //No I18n
					if(this.data.custom_view.sort_by && this.data.custom_view.sort_order){
						this.setData("show_loading",true);
						this.getCount = true;
					}
					customview.$ ? customview.$.set("sort_order",null) : (customview.sort_order=null);
					customview.$ ? customview.$.set("sort_by",null) : (customview.sort_by=null);
					columPrimBtn.setData("ltPropDisabled", true); 
					if(activity_badge_selected_Ui !== undefined){
							this.activityBadgeUpdate(moduleInfo,activity_badge_selected_Ui,columPrimBtn,true);
					}
					// customview.$.save({crux_feature_type:"listviewSave"},paramObj).then(function(){
						if(pined_fields_Change){
							_self.pinUnpinUpdate(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField);
						} else {
							_self.setData({cv_mod_pined_fields:pined_fields, cxPropPinedFieldsLength:pined_fields.length});
						}
						this.onDataLoad=false;
						this.setData('cxPropListViewContent',[]);
						this.onDataLoad=true;
						this.records=[];
						// store.unloadAll(_self.data.cxPropModuleInfo.id);
						var qp = {};
						var page = qp && qp.page || _self.data.startIndex > 1 ? Math.round(_self.data.startIndex / Number(_self.data.cxPropPerPage)) + 1 : 1;
						var queryObj = {"module" :_self.data.cxPropModule ,  "page" : page, "per_page" : _self.data.cxPropPerPage,approved: "both",cvid:_self.data.cxPropCvid }; //No I18n
						if(_self.data.cxPropSearchLetter && _self.data.cxPropSearchField){
							queryObj.alphabet = _self.data.cxPropSearchLetter;
							queryObj.alphabetical_index_field = _self.data.cxPropSearchField;
						}
						//  this.beforeRecordAPI(queryObj);
						if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
							commonUtils.showHideLoadingDiv(true);
						}
						var doesFieldModified = _self.fieldmodified;
						_self.setData("listfields",customview.fields); //No I18n
						//  columPrimBtn.setData("ltPropDisabled", false); 
						//  _self.flag=true;
						_self.fetchRelatedRecords().then(function(){
							columPrimBtn.setData("ltPropDisabled", false); 
							_self.hidePopover();
							customview.sort_by = null;
							customview.sort_order = null;
							if( containsPinField && doesFieldModified && _self.pinFieldModified && pined_fields_Change){
								_self.setData('doEnablePinnedColAnim',true); //No I18n
								setTimeout(function(){
									_self.setData('doEnablePinnedColAnim',false); //No I18n
								},2000);
							}
							if(_self.pinUpdateFailed){
								customview.fields.forEach((obj) => {
									obj._pin = false;
									});
							}
							if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
								commonUtils.showHideLoadingDiv();
							}
						});
						_self.fieldmodified = false;
						
					// },function(XHR){
					// 	if(XHR.status == 403 || XHR.status == 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
					// 		if(typeof renderingUtils!='undefined'  && renderingUtils.displayPermissionDenied!='undefined'){
					// 			renderingUtils.displayPermissionDenied(XHR);
					// 		}else{
					// 			Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body")
					// 		}
					// 	}else if(XHR.status == 400){
					// 		_cruxUtils.showCustomAlert({
					// 			params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
					// 			close : function(){
					// 				if(_self.getMethods('onCloseShowCustomAlert')){
					// 					_self.executeMethod('onCloseShowCustomAlert');
					// 				}	
					// 		   }
					// 		 });
					// 	}else{
					// 		_self.hidePopover();
					// 	store.findRecord('module',_self.data.cxPropModuleId).then(function(){
					// 		_self.callForArrangement()
					// 	});
					// 	}
					// customview.$.rollBack();
					// columPrimBtn.setData("ltPropDisabled", false); //no i18n
					// if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
					// 	commonUtils.showHideLoadingDiv();
					// }
					// })
		}
		},
		showOptionsPopup:function(){
			var chkManageColForLockedCV = this.chkManageColForLockedCVAvail(this.data.custom_view,this.data.cxPropAdmin) && this.data.manage_columns_visible;
			if(this.getData('isOptionOpened')){
				this.setData({'isOptionOpened':false,"showCont":false});
			}else{
				var showManageCol = this.data.cxPropShowManageColumn && !(this.data.cxPropSystemName && this.data.cxPropSystemName.indexOf("CONVERTEDVIEWS") !== -1 && !this.data.LvContent.length);
				this.setData({'isOptionOpened':true,'cxPropShowManageColumn':showManageCol,'isManageColumnsEnabled':chkManageColForLockedCV,
				'showCont':true,'disableResetOption':!this.getData("cv_width_updated")});
			}

		},
		showColumnList : function(){
			var custom_view= this.data.custom_view || store.peekRecord('custom_view',this.getData('cxPropCvid'));
			if(!custom_view){
				this.setData("showCont",false);
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var LoadingDiv=typeof commonUtils !== 'undefined' && typeof commonUtils.showHideLoadingDiv !== "undefined";
			if(LoadingDiv){
				commonUtils.showHideLoadingDiv(true);
			}
			this.setData("showCont",false);//No I18N
			
			// this.setData('freeze',true);
			if(! $L("#newPopup")[0]){
				// this.setData('columnListOpen',true); //no i18n
				this.setData({'columnListOpen':true,from:"list",type:"modal",showModal:true});
			}
			else if(this.getData('columnListOpen')){
					this.setData({'columnListOpen':false,"showModal":false});
				}else{
					this.setData({  "showModal" : true, "from" : "list" , "type" : "modal",'columnListOpen':true });  //No I18n
				}
			if(LoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
			// event.stopPropagation();
		},
		onRowClick:function(record,event){
			
			if(event.target.classList.contains('cxLvTableIconWrap') || event.target.classList.contains('cxLvMoreIcon') || event.target.tagName === 'CRUX-VIEW-EDIT-ICON' || event.target.classList.contains('iconlock_ap')  || event.target.classList.contains('rlc_lockIcon') ||  event.target.classList.contains('showMoreAddedEvents') || event.target.classList.contains('uline1') || event.target.tagName === 'LYTE-TEXT' && event.target.parentElement.tagName === 'A'){
				return;
			}
			if(this.getMethods("onListViewRowClick")){
				/**
				 * This method will be executed on RowClick
				 * @method onListViewRowClick
				 * @author rafik.shaik
				 */
				this.executeMethod('onListViewRowClick',record,event);
			}
		},
		showSortDropdown:function(field){
			
		},
		clearFields:function(){
			this.clearSelectedRecords();
		},
		viewCampSummaryOnClick:function(){
			if(crmListView !== undefined && crmListView.viewCampSummaryOnClick){
				crmListView.viewCampSummaryOnClick(event,element);
			}
			event.stopPropagation();
		},
		onLvActivityBadgeClick:function(recordObj,event){
			if(this.getMethods("onListViewActivityBadgeClick")){
				/**
				 * This method will be executed on ActivityBadgeClick
				 * @method onListViewActivityBadgeClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onListViewActivityBadgeClick",recordObj)
			}
			event.stopPropagation();
			event.preventDefault();
		},
		onDescMenuClose : function (){
			$L('#LvMoreDescMenu')[0].ltProp('show',false);//No I18N
			this.setData('descDescription' , "");//No I18N
		},
		
	},
	clearSelectedRecords:function(){
		if(!this.data.selectedRecords){
			this.setData('selectedRecords',true);
		}
		this.setData('selectViewArray',[]);
		this.selectAllEntity(true);
		this.setData({'showSelectedDiv':false,'selectAllEntity':false});
	},
	reRenderTagComponent : function(clip_mode, tagWidth){
		$L.fastdom.measure(function(){
			//Since crux-table is unbound tag component is re rendered
			var tags = document.querySelectorAll("crux-tag-component"),//No I18N
			tagLen = tags.length;
			$L.fastdom.mutate(function(){
				for(var i = 0; i < tagLen; i++){
					tags[i].resize({cxPropClipMode : clip_mode, cxPropWidth : tagWidth});
				}
			});
		});
	},
	findObjectFromArray : function(arr,val,param){
		return arr.filter(function(field){ return field[param] === val ; });
	},
	hidePopover:function(){
		this.setData({"showModal":false,"columnListOpen":false,"showCont":false});
	},
	checkForStickyTable : function(){
		if( !/firefox/ig.test( navigator.userAgent )){
            var span = document.createElement( 'th' ),
            isIntersection = "IntersectionObserver" in window;//No I18n
            span.style.position = "sticky";
            if( span.style.position === "sticky" && isIntersection ){ //No I18n
               return true;
            } 
            // else {
            span.style.position = "-webkit-sticky";
            if( span.style.position === "-webkit-sticky" && isIntersection ){
                return true;
            }
                // else{
            return false;
                // }
            // }
        }
		return false;
	},
	setYieldInfo:function(modName, cvbtn,resp){
		var cvrecord = resp ? resp : this.getData("LvContent"); //No i18n
		var cvrecordLen  = cvrecord ? cvrecord.length : 0; 
		var setwidth = false;
		var isLockIcon = false;
		var isLockIconWithCB = false;
		for(var i = 0; i < cvrecordLen; i++ ){
			if(setwidth && isLockIcon){
				break;
			}
			if(cvrecord[i].$upcoming_activity){
				setwidth = true;
			}
			if(cvrecord[i].Locked__s){
				isLockIcon = true;
				if(!this.data.clientAccount){
					isLockIconWithCB = true;
				}
			}
		}
		var prefixYields = [], suffixYields = [];
		var previousValue = this.getData("headerYields") ? this.getData("headerYields") : {prefix : [], suffix : []};//No I18n
		var changed = false;
		// if(! (modName.startsWith("Orchestration") || modName.startsWith("PathFinder")) ){
		if(this.data.cxPropShowEditIcon || this.data.cxPropShowQuickActionsMenu){  
			prefixYields = [{fixed: "enable", width:"10px", class : this.data.cxPropShowMoreOptionAfterEdit || this.data.cxPropShowCloseIcon ? "cxLvActEditIconCol" : "cxLvEditIconCol"}];//no i18n			
		}else{
			prefixYields.push({class : "cxdN", fixed : "enable"})
		}
				_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");
		if(this.data.cxPropHeaderPrefixYield || this.data.cxPropShowSelectBox){
			var iconClass = isLockIconWithCB && isLockIcon ? "cxLvCheckboxCol cxLvLockIconCol cxLvCheckboxWithLockCol" : isLockIcon ? "cxLvCheckboxCol cxLvLockIconCol" : "cxLvCheckboxCol";//NO I18N
			prefixYields.push( { fixed: "enable", width:"10px", class : iconClass});
		}

		if(setwidth && this.getData('activity_badge') === "enabled"){
			prefixYields.push({class  : "cxLvActivityCol", fixed : "enable"});
		}else{
			prefixYields.push({class : "cxLvActivityCol cxLvHideActivityCol", fixed : "enable"});
		}
		// }else{
		// 	prefixYields = [{width:"30px", class : "cxLvEditIconCol"}];//no i18n
		// }
		if(previousValue.prefix[0] && prefixYields[0] && previousValue.prefix[0].class !== prefixYields[0].class || previousValue.prefix[1] && prefixYields[1] && previousValue.prefix[1].class !== prefixYields[1].class || previousValue.prefix[2] && prefixYields[2] && previousValue.prefix[2].class !== prefixYields[2].class || previousValue.prefix.length !== prefixYields.length){
			changed = true;
		}
		if(cvbtn && cvbtn.length > 0){
			suffixYields = [{width:"100px", class : "cxLv_customBtnTd"}];//no i18n
		}else{
			suffixYields = [{width:"100px", class : "cxLv_noCustomBtn cxLv_customBtnTd"}];//no i18n
		}
		if(this.data.cxPropShowManageColumn){
			suffixYields.push({width:"53px", class : "cxLvFixedLastCol"});
		}else{
			suffixYields.push({width:"12px", class : "cxLvNoManageLastCol"});
		}
		if(previousValue.suffix[0] && suffixYields[0] && previousValue.suffix[0].class !== suffixYields[0].class){
			changed = true;
		}
		var yields = {prefix : prefixYields, suffix : suffixYields};
		if( this.getMethods('onConstructYield') ){
			let cus_yield = this.executeMethod('onConstructYield' , yields);
			if( cus_yield && typeof cus_yield === 'object'){
				yields = cus_yield;
			}
		}
		if(changed){
			this.setData("headerYields", yields);//no i18n		
		}		
	},
	headerSelection:function(){
		var headercheckbox = $L("#selectCheckbox",this.$node);
		if(headercheckbox.length){
			  var cv_records = this.data.LvContent;
			  var selectedIds = this.getData("cxPropSelectedIds");//No i18n
			  var className = "cxListVwCustomCheckBox";//No i18n
 			var count = 0;
 			var totalCount = cv_records.length;
			 this.lastRecNum = -1;
			 var len = cv_records.length;
			 for(var i = 0; i < len; i++){
				if(selectedIds.indexOf(cv_records[i].id) > -1){
					count++;
					this.lastRecNum = cv_records[i].recnum;
					className = "cxListVwPartialselect";//No i18n
				}
				else if(this.waitingForApproval(cv_records[i])){
					totalCount--;
					this.lastRecNum = cv_records[i].recnum;
				}
				else if(count > 0){
					className = "cxListVwPartialselect";//No i18n
					break;
				}
				
			}
			if(count === totalCount && count !== 0){
				className = "cxListVwCustomCheckBoxChecked";//No i18n
			}
			var headercheckboxes = this.$node.querySelectorAll("[id='selectCheckbox']"); //No I18n 
			headercheckboxes.forEach(function(headercheckbox){
				headercheckbox.ltProp("class", className); //No I18n
				var checkBoxSpan = headercheckbox.querySelector("span"); 
				checkBoxSpan.classList.remove(checkBoxSpan.classList.value); //No I18n
				checkBoxSpan.classList.add(className); //No I18n
			});
			}
	},
	selectAllDivAction:function(){
		if(this.data.cxPropMassOperationTotalLimit >= this.data.selected_count){
			this.setData('selectAllEntity',true); //no i18n
			var selectAllCheckbox = $L("#selectCheckbox",this.$node)[0];
			var selectAllCheckboxClass = selectAllCheckbox ? selectAllCheckbox.ltProp("class") : ""; //No i18n
			if(selectAllCheckbox && (selectAllCheckboxClass === "cxListVwCustomCheckBox" || selectAllCheckboxClass === "cxListVwPartialselect")){
				this.selectAllEntity(undefined, true);
			}
		}else{
			_cruxUtils.showCustomMessage({ params : { ltPropMessage : _cruxUtils.getI18n("crm.listview.maximum.records.alert",[this.data.cxPropMassOperationTotalLimit]) ,ltPropDuration:"4000"} } );
		}
		this.setData({'showSelectedDiv':false,'selectedRecords':false});

	},
	
	resize:function(){
		if(this.getMethods("onColumnListResize")){
			/**
			 * This method will be executed on onColumnListResize
			 * @method onColumnListResize
			 * @author rafik.shaik
			 */
			this.executeMethod("onColumnListResize");//no i18n
		}else{
			// var columnContainer = $L("#columnListId");
		var columnMenu = $L("#columnListId lyte-menu-item");//eslint-disable-line @zoho/webperf/no-complex-selector
		columnMenu && columnMenu.length ? this.setData('showPopoverfooter',true) : this.setData('showPopoverfooter',false);//no i18n
		}

	},
	sortRecord:function(value ,event ,element ,sortElem ,sortObj,sortId){
		sortId = sortId || (sortElem && sortElem.parentElement.id || "");
		var field = this.getFieldMeta( sortId );	//No I18n
		if(value=="Hide Column"){
			if(  this.getData("disableHideOpt") ){
				return;
			}
			if(!sortId){
				sortId=sortElem.closest("lyte-exptable-th").id
			}
			commonUtils.showHideLoadingDiv(true);
			var new_arr=this.data.listfields.filter((item)=>item.id!=sortId) ;
			this.setData("listfields",new_arr);
			this.constructCustomFields();
			var Lv_contect=this.data.LvContent ;
			this.setData("LvContent",[]);
			this.setDisableRows(Lv_contect);
			this.setData("LvContent",Lv_contect);
			commonUtils.showHideLoadingDiv(false);
			var fieldLabel = field.list_display_label ? field.list_display_label : field.field_label;
			_cruxUtils.showCustomMessage({ 
				params : { 
					ltPropType : "success",	//No I18n
					ltPropMessage : _cruxUtils.getI18n("crm.customview.hide.column.success", fieldLabel) //No I18n
				}
			});
			return ;
		}

		//masking/unmasking handling start
		if(value === 'mask' || value === 'unmask'){
			if(value === 'mask'){
				field.cxMasked = true;
			}else{
				field.cxMasked = false;
			}
			$L("crux-table-component" , this.$node)[0].maskUnmask(field.api_name , value === 'unmask');
			return;
		}
		//masking/unmasking handling end

		
		// var modInfo = this.data.cxPropModuleInfo,
		var cvid = this.data.cxPropCvid,
		// _self = this,
		customview = this.data.custom_view || store.peekRecord('custom_view',cvid); //No I18N
		sortElem = $L(".lyteMenuSelected")[0] || sortElem;
		var sort_id = sortElem ? sortElem.parentElement.id : value === "unsort" ? sortObj.id : this.getData('sortIconFieldId'); //No I18N
		if(!sort_id) {
			sort_id = sortId;
		}
		var api_name;
		var prev = customview.sort_by ? customview.sort_by.id : undefined;
		if(sort_id && customview.$!=undefined){
			api_name = field.api_name; //No i18n
			if(value === "unsort"){
				customview.$ ? customview.$.set('sort_by',{}) : customview.sort_by = {};//No I18N
			}else{
				customview.$ ? customview.$.set('sort_by', { "id": sort_id, "api_name": api_name }) : customview.sort_by = { id: sort_id, api_name: api_name };//No I18N
			}
			// sort_by = store.peekRecord("field",sort_id).id;//No I18N
		}else{
			api_name = field.api_name; //No i18n
			if(value === "unsort"){
				customview.sort_by={};//No I18N
			}else{
				customview.sort_by={"id" : sort_id, "api_name" : api_name};//No I18N
			}
		}
		if(api_name === "BEST_TIME" && prev === customview.sort_by.id && customview.sort_order === value){
			return;
		}
		if(customview.$!=undefined){
			if(value === "unsort"){
				customview.$.set('sort_order',undefined); 
				customview.$.set('sort_by',{});	 //No I18N
			}else{
				customview.$.set('sort_order',value); //No I18N
			}
		}else{
			if(value === "unsort"){
				customview.sort_order=undefined;
				 customview.sort_by={};	 //No I18N
			}else{
				customview.sort_order=value; //No I18N
			}
		}
		
		if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
			this.selectAllEntity(true);
		}
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		// var paramObj = {sort_by : customview.sort_by, sort_order: customview.sort_order, module : modInfo.api_name, id : cvid };
		// store.triggerAction("custom_view", "change_sort", paramObj).then(function(resp) { //NO i18n
		this.onDataLoad=false;
		this.setData("cxPropListViewContent",[]);
		this.onDataLoad=true;
		this.records=[];
				// store.unloadAll(this.data.cxPropModuleInfo.id);
				// this.setData("page",1);
				// this.setData('startIndex',0)
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// 	this.setData({"custom_view":resp,'listfields':resp.fields})
		if(this.getMethods('onSortUnsortClick')){
			this.setData("cxPropPage" , 1);
			var qp = {page:1, per_page:this.data.cxPropPerPage , cvid: this.data.cxPropCvid , module: this.data.cxPropModule , sort_by: customview.sort_by , sort_order : customview.sort_order};
			this.executeMethod('onSortUnsortClick',value,field, qp).then(function(){
				this.onBeforeLoad = true;
				this.fetchRelatedRecords(1,0,undefined,true);
			}.bind(this));
			// this.executeMethod('onSortUnsortClick',value,store.peekRecord("field",sort_id), qp);
		}else{
			this.fetchRelatedRecords(1,0,undefined,true);
		}
				// }.bind(this))
		// }.bind(this),function(XHR){
		// 	if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
		// 		if(typeof renderingUtils !='undefined' && renderingUtils.displayPermissionDenied!='undefined'){
		// 			renderingUtils.displayPermissionDenied(XHR);
		// 		}else{
		// 			Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body")
		// 		}
		// 	}else if(XHR.status === 400){
		// 		_cruxUtils.showCustomAlert({
		// 			 params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.sort.error')} //no i18n
		// 		});
		// 	}
		// 	customview.$.rollBack();
		// 	if(typeof commonUtils !='undefined' &&commonUtils.showHideLoadingDiv!='undefined'){
		// 		commonUtils.showHideLoadingDiv();
		// 	}
		// }.bind(this));

	},
	loderStarts : function(status){
		var contDiv = $L('.cxLvLoaderWrap');
		contDiv.css('display', status ? 'block' : 'none'); //No I18N
	},
	pinUnpinfield: function (value) {

		var modInfo = this.data.cxPropModuleInfo, //No I18N
			cvid = this.data.cxPropCvid,
			_self = this,
			customview = this.data.custom_view || store.peekRecord('custom_view', cvid) ,//No I18N
			// fields = customview.fields,
			// pinned_fields,
			isPinedFieldsWidthChanged = false;
		var id = _self.getData('sortIconFieldId');  //No I18N
		// if(id){
		// 	var api_name = store.peekRecord("field",id).api_name; //No i18n
		// 	pinned_fields = [{ 'api_name' : api_name, 'id' : id, '_pin' : value === 'UnPin Column' ? false : true, '_pin_order' : value === 'UnPin Column' ? null : _self.getData("cxPropPinedFieldsLength") + 1 }]; //No I18N
		// }
		// var cvObj = {fields : pinned_fields ? pinned_fields : fields, id : cvid};
		// var paramObj = {module : modInfo.api_name};
		if (typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined") {
			commonUtils.showHideLoadingDiv(true);
		}
		// if(persistPinUpdate){
		// store.triggerAction("custom_view", "pin_unpin_fields",cvObj,paramObj).then(function(){
		// _self.changePinUnpin(_self,value,modInfo,isPinedFieldsWidthChanged,customview,id,cvid);

		// },function(XHR){
		// 	if(XHR.status === 400){
		// 		var msgTxt = XHR.responseText.indexOf("Maximum Limit Reached to Pin the Field") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.maximum.limit.new',1) : XHR.responseText.indexOf("Given Field is not associated with the mentioned Custom View") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.column.error.msg') : _cruxUtils.getI18n('crm.customview.pin.unpin.issue'); //NO I18N
		// 		_cruxUtils.showCustomAlert({
		// 			params : {ltPropPrimaryMessage : msgTxt}
		// 		});
		// 	}
		// 	if(typeof commonUtils!='undefined' && commonUtils.showHideLoadingDiv!='undefined'){
		// 		commonUtils.showHideLoadingDiv();
		// 	}
		// });
		// }else{
		_self.changePinUnpin(_self, value, modInfo, isPinedFieldsWidthChanged, customview, id, cvid);
		// }
	},
	changePinUnpin:function(_self,value,modInfo,isPinedFieldsWidthChanged,customview,id,cvid){
		var fields = this.data.LvHeader;
		var lv_field = this.getFieldMeta( id );	//No I18n
		var pinedArr = _self.getData('cv_mod_pined_fields'),fieldsArr = []; //No I18N
		if(value === "Pin Column")
		{
			pinedArr.push(id);
		}
		else if (value === "UnPin Column")
		{
			pinedArr = pinedArr.filter(function(e) { return e !== id ; });
		}
		_self.setData('cv_mod_pined_fields',pinedArr); //No I18N
			_self.setData('cxPropPinedFieldsLength',pinedArr.length); //No I18N
			var prev_cv_width_conf = new Map(),
			
			cv_width_map = _self.data.cv_mod_fields ? _self.getData("cv_mod_fields") : new Map(), //No I18n
			widthChanged = cv_width_map.size > 0;

			if(_self.data.from === 'list' ){
				fields.forEach(function(field){
					if(field._width){
						prev_cv_width_conf.set(field.id , field._width);
			    	}
				});
			}
			var _pinFieldWidth = 0;
			fields.forEach(function(field){
				if(pinedArr && pinedArr.includes(field.id)){
					_pinFieldWidth += widthChanged  ? cv_width_map.has(field.id) ? cv_width_map.get(field.id) : field._width ? field._width : _self.getDefaultWidthForField(lv_field.ui_type) : prev_cv_width_conf.has(field.id) ? prev_cv_width_conf.get(field.id) : field._width ? field._width : _self.getDefaultWidthForField(lv_field.ui_type); //No I18n
				}
			});
			pinedArr.forEach(function(item){
				var _pinField = fields.filter(function(e) { return e.id === item ; } )[0];
				if(_pinField) {
					_pinField._pin = true;
					var hasItem = cv_width_map.has(item);
					//Calculating the width of the pinned column if its width exceeds the viewPort
					var columnWidth = widthChanged  ? hasItem ? cv_width_map.get(item) : _pinField._width ? _pinField._width : _self.getDefaultWidthForField(lv_field.ui_type) : prev_cv_width_conf.has(item) ? prev_cv_width_conf.get(item) : _pinField._width ? _pinField._width : _self.getDefaultWidthForField(lv_field.ui_type); //No I18n
					var tableWidth = _self.$node.querySelector('.lyteExpTableOrigTableInnerWrap').clientWidth; //No I18n					
					var fixedPrefixColumnsWidth = _self.calculatefixedColumnWidth();
					// if(columnWidth && tableWidth) {
						// 100 px - for ManageColumns and remaining pixel(10%)
						if(columnWidth && tableWidth && fixedPrefixColumnsWidth + _pinFieldWidth + 100 >= tableWidth) {
							if(hasItem) {
								cv_width_map.delete(item);
							}
							_pinField._width = tableWidth - fixedPrefixColumnsWidth - 100;
							cv_width_map.set(item, _pinField.width);
							isPinedFieldsWidthChanged = true;
						}
					// }
				}
				else 
				{
					_pinField = { 'api_name' : this.getFieldMeta( item ).api_name, 'id' : item, '_pin' : true }; //No I18n
				}
				_pinField._pin_order = pinedArr.indexOf(item) + 1;
				fieldsArr.push(_pinField);
			});
			fields.forEach(function(field){
				if(!pinedArr.includes(field.id))
				{
					if(id === field.id && value === "UnPin Column") {
						field._pin = false;
						delete field._pin_order;
					}
					fieldsArr.push(field);
				}
			});
			if(isPinedFieldsWidthChanged) {
				_self.setData({'cv_mod_fields': cv_width_map,"updateWidthValue":true,'width_prev_cvid':cvid});
				// _self.setData('cv_mod_fields', cv_width_map); //No I18n
				// _self.setData("updateWidthValue",true); //No I18n
				// _self.setData('width_prev_cvid', cvid); //No I18n
				_self.checkForWidthUpdate(true);
			}
			this.onDataLoad=false;
			this.setData("cxPropListViewContent",[]);
			this.onDataLoad=true;
			this.records=[];
			// store.unloadAll(modInfo.id);
			_self.setData({listfields : fieldsArr   }); //No I18n
			_self.fetchRelatedRecords(undefined,undefined,value);
	},
	getDefaultWidthForField : function(uiType){
		return uiType === 209 || uiType === 3 || uiType === 110 ? 400 : 200;
	},

	calculatefixedColumnWidth : function() {
		var fixedPrefixColumns = $L('crux-table-component',this.$node)[0].component.data.cxPropHeaderYield.prefix, fixedPrefixColumnsWidth = 0,fixedPrefixColumnsLength = fixedPrefixColumns.length;
		for(var i = 0; i < fixedPrefixColumnsLength; i++) {
			var fixedColumn = fixedPrefixColumns[i];
			if(fixedColumn.fixed === "enable") {
				var cssJson = getComputedStyle(this.$node.getElementsByClassName(fixedColumn.class.indexOf("cxLvActivityCol") !== -1 ? "cxLvActivityCol" : fixedColumn.class)[0]); //NO I18n
				if(cssJson) {
					var width = cssJson.width !== undefined && cssJson.width !== "0px" ? cssJson.width.substring(0, cssJson.width.indexOf('px')) : fixedColumn.class.indexOf("cxLvActivityCol") !== -1 ? 120 : 36; //NO I18n
					fixedPrefixColumnsWidth = fixedPrefixColumnsWidth + Math.round(width);
				}
			}
		}
		return fixedPrefixColumnsWidth;
	},

	checkforListViewLock : function(){
		var custom_view = this.data.custom_view; //No I18N
		var admin = this.data.cxPropAdmin;
		if (custom_view.locked) {
				if(custom_view.system_defined && admin)
				{
					return false;
				}
				else if(!custom_view.system_defined && (admin || custom_view.created_by.id === this.data.cxPropUserDetailsId))
				 {
					 return false;
				 }
				return true;
			}
			// else
			// 	{
			return false;
				// }
	},
	
	activityBadgeUpdate : function(moduleInfo,activity_badge_selected_Ui,columPrimBtn,isFieldUpdate){
		moduleInfo.$ ? moduleInfo.$.set({'activity_badge': activity_badge_selected_Ui}) : moduleInfo.activity_badge = activity_badge_selected_Ui; //No I18N
		// var removecv;
		var _self = this;
		// if(isFromModal) { // For Complience Page Activity_badge Update
		// 	removecv = moduleInfo.$.get("custom_view");
		// 	moduleInfo.$.rollBackAttributes("custom_view"); //No I18n
		// }
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		moduleInfo.$.triggerAction('view_preference_configurations',{module:this.data.cxPropModuleApiName},{},"PUT",{'activity_badge': activity_badge_selected_Ui}).then(function(){
			this.setData("activity_badge",activity_badge_selected_Ui); //No I18N
			if(!isFieldUpdate){
				  var records = Object.assign([],this.data.LvContent);
				  _self.setYieldInfo(_self.getData("cxPropModule"),_self.data.list_cv_btn,records);
				  this.setDisableRows(records);
				  this.setData({"LvContent": records }); //No I18n
				  _self.headerSelection();
				  if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
			}
	}.bind(this),
		function(){
			_cruxUtils.showCustomAlert({
				params : {ltPropPrimaryMessage : _cruxUtils.getI18n('crm.customview.activity.badge.update.failure')}
			});
			moduleInfo.$.rollBackAttributes("activity_badge"); //No I18n
			columPrimBtn.setData("ltPropDisabled", false); //no i18n
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
		});
		
		// if(isFromModal) {
		// 	moduleInfo.$.set({"custom_view" : removecv}); // For Complience Page Activity_badge Update //No I18n
		// }
	},

	pinUnpinUpdate:function(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField){
		var _self = this;
		var moduleInfo = this.data.cxPropModuleInfo; //No I18n
		// var persistPinUpdate = this.getData('persistPinUpdate');//No I18n
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		// if(persistPinUpdate){
			// store.triggerAction("custom_view", "pin_unpin_fields",cvObj,{module : paramObj.module}).then(function(){
				// _self.doPinUnpin(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField);
			// },function(XHR){
			// 	var msgTxt = XHR.responseText.indexOf("Maximum Limit Reached to Pin the Field") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.maximum.limit.new',1) : XHR.responseText.indexOf("Given Field is not associated with the mentioned Custom View") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.column.error.msg') : _cruxUtils.getI18n('crm.customview.pin.unpin.issue'); //NO I18N
			// 	if(pined_fields.length && containsPinField){
			// 		_self.pinUpdateFailed = true;
			// 	}
			// 	_cruxUtils.showCustomAlert({
			// 		params : {ltPropPrimaryMessage : msgTxt},
			// 		 close : function(){
			// 				 if(_self.getMethods('onCloseShowCustomAlert')){
			// 					_self.executeMethod('onCloseShowCustomAlert',msgTxt)
			// 				 }
			// 		}});
			// 		_self.hidePopover();
			// 		customview.$.rollBack();
			// 		columPrimBtn.setData("ltPropDisabled", false); //no i18n
			// 		if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
			// 			commonUtils.showHideLoadingDiv();
			// 		}
				
			// }.bind(this));
		// }else{
			_self.doPinUnpin(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField);
		// }
	},
	doPinUnpin:function(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField)
	{
		var _self = this;
		_self.setData({cv_mod_pined_fields:pined_fields, cxPropPinedFieldsLength:pined_fields.length});
			if(!isFieldUpdate){
				var records = Object.assign([],_self.data.LvContent);
				if(_self && containsPinField && _self.pinFieldModified){
			    	_self.setData('doEnablePinnedColAnim',true); //No I18n
			    	setTimeout(function(){
			    		_self.setData('doEnablePinnedColAnim',false); //No I18n
					},2000);
				}
				_self.setData({listfields:customview.fields }); //No I18n
				_self.constructCustomFields();
				// _self.setData("LvContent",[])
				_self.setDisableRows(records);
				_self.setData("LvContent",records);
					_self.setYieldInfo(_self.getData("cxPropModule"),_self.getData("list_cv_btn"));
				_self.headerSelection();
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}
	},
	mouseOutCustomButton : function(){
		var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
		var popover = popoverParent.querySelector('lyte-popover');  //no i18n
		// var cvBtnPopover = $L("#cxLvCustomButtonPopover");
		if(popover){
			popover.ltProp("show",false);
		}
		clearTimeout(this.disp_popover);
	},

	mouseOverCustomButton : function(query,id,name,description,recordId){
		var _self = this;
		clearTimeout( this.disp_popover );
		this.disp_popover =  setTimeout(function(){
			var rec = store.peekRecord("custom_button", id);//No I18n
		  if(recordId) {
		       _self.onMouseOver('.' + query + id + recordId,rec.name,rec.description,'left') ;
		     } else {
		      _self.onMouseOver('.' + query + id,rec.name,rec.description,'left') ;
		     }
		},3000);
	},
	onMouseOver : function(query,name,description,position){
		var _self = this;
		this.setData('customButtonFocus',true);  //no i18n
		if(_self.getData('customButtonFocus')){
			_self.setData({'popoverName':name,'popoverDescription':description !== null ? description : ''});
			var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
			var popover = popoverParent.querySelector('lyte-popover');  //no i18n
			if(position){
				_self.setData('position',position); //no i18n
			}
			popover.ltProp('placement',this.getData('position')); //no i18n
			popover.ltProp('originElem',query); //no i18n
			popover.ltProp('show',true); //no i18n
		}
	},
	onMouseOut : function(){
		var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
		var popover = popoverParent.querySelector('lyte-popover');  //no i18n
		popover.ltProp('show',false); //no i18n
		this.setData('customButtonFocus',false);  //no i18n
	},
	menumousemove : function( evt ){
		var openMenu = $L('lyte-menu-box:not(.lyteMenuHidden)' )[0], button = $L('.cxLvTableRowHover #cxLvCustomBtn')[0];
		if( openMenu && button && !(openMenu.contains(evt.target) || button.parentNode.contains(evt.target)) ){
			openMenu.parent.ltProp('show', false); //No i18n
		}
	},
	executeCustomButton:function(btnId,recId){
			//callback for clicking btn
			if(this.getMethods('onCustomButtonClick')){
				/**
				 * This method will be executed on custom button click
				 * @method onCustomButtonClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onCustomButtonClick",btnId,recId);
			}
	},
	constructCustomFields:function(){
		
		var fieldDetails = this.fieldYieldMapping(this.data.listfields, this.getData('cxPropIsResizeEnabled')); //No i18n
		var customfields = fieldDetails.customfields;
		var fieldMapping = fieldDetails.fieldMapping;
		this.setData({'cxPropFieldMapping':fieldMapping,'LvHeader':customfields});
		// // this.setExpTableScroll();
	},	
	chkManageColForLockedCVAvail:function(custom_view,admin){
		if( custom_view.locked ){
			if(custom_view.system_defined && admin){
				return true;
			}
			else if(!custom_view.system_defined && (admin || custom_view.created_by.id === this.data.cxPropUserDetailsId)){
	    	 	return true;
	    	 }
		}
		else{
				return true;
			}
	},
	setWidthForTable : function(){
		if(this.getData('cv_width_updated') && this.getData('isStickyTable')){
			var tableNode = this.$node.querySelector('.lyteExpOriginalTable');//No I18N
			if(tableNode){
				tableNode.style.width = this.getData('current_table_width') + 'px';
			}
		}
	},
	checkForPropsUpdate:function(){
		// if(this.getData('cxPropIsResizeEnabled')){
			this.checkForWidthUpdate.call(this);
		// }
		this.checkForWrapUpdate.call(this);
	},
	checkForWidthUpdate:function(fromPinUnPin){
		if(this.data.cv_mod_fields.size > 0 && this.data.persistWidthUpdate )
		{
			if(this.data.updateWidthValue || this.persistWidthToStore()){
				// var module_info = this.data.cxPropModuleInfo ,
				// var cvid = this.data.cv_width_updated ? this.getData("width_prev_cvid") : this.data.cxPropCvid,//No I18N
				// custom_view = store.peekRecord('custom_view',cvid) || this.data.custom_view;//No I18n
				
				// var cus_view_len = custom_view.fields.length;
				// for(var i = 0;i < cus_view_len;i++){
				// 	custom_view.fields[i]._width = this.data.cv_mod_fields.get(custom_view.fields[i].id);
				// }
				// this.setData("listfields",custom_view.fields);
				
				// store.triggerAction("custom_view","customize_width",cvObj,qp);//No I18N
				// this.setData("isResetClick",false);
				this.setData({"cv_width_updated":fromPinUnPin === true ? true : false,"updateWidthValue":false});
			}
			this.setData("width_prev_cvid","");//No I18N
			
		}
	},
	checkForWrapUpdate : function(){
		if(this.getData('persistWrapUpdate')){
			// var module_info = this.data.cxPropModuleInfo,
			var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid),//No I18N
			isWrap = !this.data.clip_mode;
			if(custom_view && custom_view.wrap_text !== isWrap){
				custom_view.$ ? custom_view.$.set("wrap_text",isWrap) : custom_view.wrap_text = isWrap ;//No I18N
				// var cvObj = {wrap_text : isWrap, id : this.data.cxPropCvid};
				// var qp = {module : module_info.api_name};
				// if(this.data.isFromModal){
				// 	this.setFeatureSpecificParams(qp, this.data.featureName);
				// }
				// store.triggerAction("custom_view", "customize_wrap_text", cvObj, qp);
			}
		}
	},
	persistWidthToStore : function(){
		if(this.data.cv_mod_fields.size > 0 )
		{
			// var module_info = this.data.cxPropModuleInfo ,
			var comp = this, updated = false ,
			cvid = comp.data.cv_width_updated ? comp.getData("width_prev_cvid") !== "" ? comp.getData("width_prev_cvid") : this.data.cxPropCvid : this.data.cxPropCvid ,//No I18N
			custom_view = this.data.custom_view || store.peekRecord('custom_view', cvid);
			if(!custom_view){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var cv_mod_fields = comp.getData("cv_mod_fields"),
			cv_fields = [],obj,tmp_width,
			fields = custom_view.fields ? custom_view.fields : comp.data.custom_view.fields;
			if(fields){
				fields.forEach(function(field){
					obj = Object.assign({},field);
					if(!obj.id){
						var fieldObj = comp.findObjectFromArray(this.data.LvHeader, obj.api_name , "api_name");
						if(fieldObj[0]){
							obj.id = fieldObj[0].id;
						}
					}
					tmp_width = cv_mod_fields.get(obj.id);//No I18N
					if(tmp_width)
					{
						if(!updated && obj._width !== tmp_width){
							updated = true ;
						}
						obj._width = Number(tmp_width) ;
					}
					cv_fields.push(obj);
				});
			}
			if(updated && custom_view.$)
			{
				custom_view.$ ? custom_view.$.set("fields", cv_fields) : custom_view.fields = cv_fields;//No I18n
				comp.setData("updateWidthValue",true);//No I18n
				return true;
			}
		}
		return false;
	},
	calculateWidthForTable: function(){
		var total_width = 0,tmp;
		var comp = this ;
		var is_width_updated= !this.data.isResetClick ;
		if(comp.getData("cv_mod_fields").size > 0){
			comp.getData("cv_mod_fields").forEach(function(width){
				total_width += width ;
			});
			if(total_width!==0){
				is_width_updated=true;
			}
		}
		else{
			comp.getData("LvHeader").forEach(function(cv_field){	//No I18N
				tmp = cv_field.style ? cv_field.style : "";
				if(tmp.indexOf("width") > -1){
					total_width += Number(tmp.replace("width: ","").replace("px;",""));
				}
			});
		}
		if(total_width !== 0 ){
			var cvrecord = comp.getData("LvContent"); //No i18n
			var cvrecordLen  = cvrecord ? cvrecord.length : 0;
			var isActPres = false;
			for(var i = 0; i < cvrecordLen; i++ ){
				if(cvrecord[i].$upcoming_activity){
					isActPres = true;
					break;
				}
			}
			var cvbtn = comp.getData("list_cv_btn");//No I18N
			var extra_elem_width = 89;
			extra_elem_width += comp.getData('cxPropModule') === "Activities" || comp.getData('cxPropModule') === "Tasks" || comp.getData('cxPropModule') === "Events" || comp.getData('cxPropModule') === "Calls" ? 70 : 35;//No I18N
			extra_elem_width += isActPres ? 120 : 0;
			if(cvbtn && cvbtn.length > 0 && comp.getData("cxPropSystemName").indexOf('REVIEWPROCESS LEADS') === -1){
				extra_elem_width += 225;
			}
			total_width += extra_elem_width;
			this.setData({"cv_width_updated": is_width_updated ,"current_table_width":total_width});
			this.setWidthForTable();
		}else{
			comp.setData("cv_width_updated",false);//No I18n
		}
	},
	setBodyLookUp:function(recordObj,fieldObj){
		var lookupProp = this.data.cxPropLookupProperties;
		var obj = {routeName : "crm.tab.module.entity.detail",target: lookupProp  && lookupProp.target ? lookupProp.target : "_self"}; //No I18N
		var module = this.data.cxPropModule,rec_len=recordObj.length,field_len=fieldObj.length;
		for(var i = 0;i < rec_len;i++){
			for(var j = 0;j < field_len;j++){
				if(Object.keys(this.data.cxPropDisplayField).length !== 0 &&  this.data.cxPropDisplayField[this.data.cxPropModule] &&  this.data.cxPropDisplayField[this.data.cxPropModule].indexOf(fieldObj[j].api_name) > -1){
						obj[fieldObj[j].api_name] = {dynamicParams :`["${module}","{{row.id}}"]`,showBc : false,cxPropShowImage:false};
				}
				if(recordObj[i][fieldObj[j].api_name] && recordObj[i][fieldObj[j].api_name].name){
					if(fieldObj[j].column_name === "SEID" && fieldObj[j].ui_type === 4){
						obj[fieldObj[j].api_name] = {dynamicParams :'["{{row.$se_module}}","{{row.[field.api_name].id}}"]',iconClass:'["{{row.$se_module}}"]',cxPropShowImage:false,cxPropShowLookupPopupFields:true,showBc:true };
					}else if(fieldObj[j].ui_type === 46){
						obj[fieldObj[j].api_name] = {dynamicParams :'["{{row.$se_module}}","{{row.[field.api_name].id}}"]',showBc : false,cxPropShowImage:false};
					}else if(fieldObj[j].column_name === "CONTACTID"){
							obj[fieldObj[j].api_name] = {dynamicParams :'["Contacts","{{row.[field.api_name].id}}"]',showBc : true,cxPropShowImage:false,cxPropShowLookupPopupFields:true };
					}else if(fieldObj[j].column_name === "SEID" &&  fieldObj[j].ui_type === 132){
						if(recordObj[i][fieldObj[j].api_name]){
							let moduleName = this.data.cxPropIdModuleMapping[recordObj[i][fieldObj[j].api_name].module.id];
							moduleName = moduleName || store.peekRecord("module",recordObj[i][fieldObj[j].api_name].module.id).module_name;
							obj[fieldObj[j].api_name] = {dynamicParams :'["' + moduleName +'","{{row.[field.api_name].id}}"]',showBc : false,cxPropShowImage:false};
						}
					}
					else if(recordObj[i][fieldObj[j].api_name] && recordObj[i][fieldObj[j].api_name].id  && fieldObj[j].lookup && fieldObj[j].lookup.module && fieldObj[j].lookup.module.id){
						// if(fieldObj[j].lookup.module && fieldObj[j].lookup.module.id){
							var sub_module = this.data.cxPropIdModuleMapping[fieldObj[j].lookup.module.id];
							sub_module=sub_module || store.peekRecord("module",fieldObj[j].lookup.module.id).module_name ;
							//{{field.cxModule}}
							obj[fieldObj[j].api_name] = {dynamicParams :`["${sub_module}","{{row.[field.api_name].id}}"]`,showBc : false,cxPropShowImage:false };
							if(fieldObj[j].api_name === "What_Id"){
								var iconClass = sub_module.slice(0,sub_module.lastIndexOf("s")) + "Small";
								obj[fieldObj[j].api_name].iconClass = `${iconClass}`;
							}
						// }
						
					}
				}
			}
		}
		this.setData('lookupProperties',obj);
		
	},
	constructRCOptions:function(){

		if( this.data.cxPropPerPageOptions && this.data.cxPropPerPageOptions.length ){
			return this.data.cxPropPerPageOptions;
		}
		var recordPerPage =  _cruxUtils.getI18n("crm.label.no.of.records");
		var options = [{"user_value" : "10 " + recordPerPage,"system_value" : 10 },{"user_value" : "20 " + recordPerPage,"system_value" : 20 },{"user_value" : "30 " + recordPerPage,"system_value" : 30 },{"user_value" : "40 " + recordPerPage,"system_value" : 40 },{"user_value" : "50 " + recordPerPage,"system_value" : 50 }]; //No i18n
		if(this.data.cxPropUserDetailsIsPaidUser){
			options.push({"user_value" : "100 " + recordPerPage,"system_value" : 100 });
		}
		if(this.data.cxPropUserDetailsMaxRange === 500)
		{
			options.push({"user_value" : "500 " + recordPerPage,"system_value" : 500 });
		}
		return options;
	},
	callForArrangement:function(){
		var module = this.data.cxPropModule;
		var moduleInfo = this.data.cxPropModuleInfo;
		var allfields = moduleInfo.fields.slice(0); //No I18n
		var displayFieldMap = this.getData('cxPropDisplayField'); //No I18n
		var allowEncrypt = this.data.cxPropAllowEncryptedFields;
		var newarr = [];
		var allFieldLen = allfields.length;
		var j = 0;
		var tagFlag = false;
		for(var i = 0; i < allFieldLen; i++){
			var field = allfields[i];
			if(field.show_type === 0 && !(field.column_name === "FULLNAME" || field.column_name === "PROCESSINGBASIS" || field.column_name === "SE_STATUS") || (field.column_name === "S_MODIFIEDTIME" && field.show_type === 17) || (field.crypt !== null && !allowEncrypt)){
				continue;
			}
			if(field.visible  && field.available_in_user_layout && !((module === "Cases" || module === "Solutions") && field.column_name === "ADDCOMMENT") && !(field.column_name === "TAGMODULEREFID" && tagFlag) && !( module === "Tasks" && this.data.tasksHiddenFields.indexOf(field.column_name) > -1) && !( module === "Appointments" && this.data.appointmentHiddenFields.indexOf(field.column_name) > -1) && !( module === "Services" && this.data.servicesHiddenFields.indexOf(field.column_name) > -1)  && !(module === 'DealHistory' && field.column_name === "LASTACTIVITYTIME") && !(this.data.cxPropIsInventoryModule && (field.column_name === "DISCOUNT_TYPE" || field.column_name === "DISCOUNT_PERCENTAGE"))) {
				var displayMap = displayFieldMap[module] ? displayFieldMap[module] : [] ;
				if(module.indexOf("CustomModule") < 0 && module.indexOf("LinkingModule") < 0 && displayMap.length === 1 && displayMap[0] === field.api_name) {
					field.mandatory = true;
				} else if(module.indexOf("CustomModule") < 0 &&  module.indexOf("LinkingModule") < 0 ) {
					for(var m = 0; m < 2; m ++) {
						if(displayMap[m] === field.api_name) {
							field.mandatory = true;
						}
					}
				} else if("Name" === field.api_name) {
						field.mandatory = true;
					}
				if(field.column_name === 'TAGMODULEREFID'){
					tagFlag = true;
				}
				// if((module.startsWith("Orchestration") || module.startsWith("PathFinder")) && field.api_name === "id"){
				// 	field.mandatory = true;
				// }
				if(module === "Activities" && field.column_name === "ACTIVITYTYPE") {
					field.mandatory = true;
				}	
				if(module === 'DealHistory' && (field.column_name === 'STAGE' || field.column_name === "STAGEDURATION")){
					field.mandatory = true;
				}
				if( (module === 'Tasks' || module === 'Calls' || module === 'Events') && (field.column_name === 'SMOWNERID' || field.column_name === 'CALLSTARTDATETIME' || field.column_name === 'ENDDATETIME' || field.column_name === 'ALLDAYEVENT' || field.column_name === 'DUEDATE' || field.column_name === 'STARTDATETIME')){
					field.mandatory = false ; //No i18n
				}
				if((field.column_name === 'APPOINTMENTDATEANDTIME' || field.column_name === 'SMOWNERID') && module === 'Appointments' && this.data.cxPropModule !== 'Services'){
					field.mandatory = false ; //No i18n
				}
				if(field.api_name === "Full_Name" && (moduleInfo.module_name === "Contacts" || moduleInfo.module_name === "Leads")){
					field.field_label = _cruxUtils.getI18n("custommodule.crmfield.fl.name",moduleInfo.singular_label);
		        }
				// if(!(module.startsWith("Orchestration") || module.startsWith("PathFinder")) && field.api_name === "id"){
				// 	continue;
				// }
				//rich text fields are not supported in manage columns as of now, so skipping those fields
				if(field.api_name === "id" || field.ui_type === 250){
					continue;
				}
				
				newarr[j] = field;
				j++;
			}
		}
		let fields =  (this.data.custom_view && this.data.custom_view.fields) || moduleInfo.custom_view.fields;
		this.setData({
			'ordered_fields' : newarr,//No I18n
			"selected_fields" : fields.slice(0),//No I18n
			"property_fields" : this.data.activity_badge === "Not_Supported" ? [] : [{'api_name':'activity_badge','selected': this.data.activity_badge === "enabled" ? true : false,'field_label' : _cruxUtils.getI18n('crm.customview.activty.badge')}] //No I18N
			});


	},
	setSortBySummary:function(){
		var sorted_column = "",
			custom_view = this.data.custom_view  || store.peekRecord('custom_view',this.data.cxPropCvid);
		if(custom_view && custom_view.sort_by && custom_view.sort_by.id && custom_view.sort_by.api_name)
		{
			var fieldlen = this.data.cxPropModuleInfo.fields.length;
			var fields = this.data.cxPropModuleInfo.fields, data_type = "",
			api_name = custom_view.sort_by.api_name ? custom_view.sort_by.api_name : fields.find( function(field){ if (field.id === custom_view.sort_by.id) { return field; } } ).api_name;
			for(var i = 0 ; i < fieldlen ; i++)
			{
				if(fields[i].api_name === api_name)
					{
					sorted_column = fields[i].field_label;
					data_type = fields[i].data_type;
						break;
					}
			}
			if(sorted_column.length){
				sorted_column += " (";
				if(["phone","currency","integer"].includes(data_type) && api_name !== "BEST_TIME"){
					sorted_column += custom_view.sort_order === 'asc' ? "0-9" : "9-0";
				}else{
					sorted_column += custom_view.sort_order === 'asc' ? _cruxUtils.getI18n('crm.column.sort.asc') : _cruxUtils.getI18n('crm.column.sort.desc');//No I18N
				}
				sorted_column += ")";
			}
		}
		this.setData('sorted_column',sorted_column);
	},
	getCVFieldsWOWidth : function(cv_fields){
		var cvLen = cv_fields.length,
		isWidthPresent = false;
		for (var i = 0; i < cvLen; i++){
			if(cv_fields[i]._width){
				isWidthPresent = true;
				break;
			}
		}
		if(isWidthPresent){
			var cvFields = [];
			cv_fields.forEach(function(field){
				var obj = Object.assign({},field);
				delete obj._width;
				cvFields.push(obj);
			});
			return cvFields;
		}
		return cv_fields;
		// }
	},
	actionsAvailForComplianceRec:function(){
		var actions = [];
		var notIncludedActions = ["Edit","tag_op","change_owner","sendmail","mass_convert","sendmail_potential"]; //No I18N
		this.data.cxPropModuleActionsMenu.forEach(function(obj){
			if(!notIncludedActions.includes(obj.value)){
				actions.push(obj);
			}
		});
		return actions;

	},
	fetchRecords:function(start_num,page,per_page){
		per_page = per_page ? per_page : this.data.cxPropPerPage;
		start_num = start_num ? start_num : (page - 1) * per_page + 1;
		// this.setData('startIndex',start_num-1);
		var sortedRecord = this.data.cxPropListViewContent;
		if(sortedRecord && sortedRecord.length > 0){
			sortedRecord = sortedRecord.sort((a, b) => a.recnum - b.recnum);
		}
		// var sortedRecord=store.peekAll(this.data.cxPropModuleInfo.id)?store.peekAll(this.data.cxPropModuleInfo.id).sortBy("recnum"):[]

		// var sortedRecord=store.model?store.model[this.data.cxPropModuleInfo.id].data.sortBy("recnum"):[]
			var startRecNum = (page - 1) * this.data.cxPropPerPage + 1;
			var endRecNum = startRecNum + this.data.cxPropPerPage - 2;
			if(endRecNum >= this.data.cxPropRecordCount){
				endRecNum = this.data.cxPropRecordCount - 1;
			}
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv(true);
			}
			if( sortedRecord.length > 0 && sortedRecord[startRecNum - 1] && sortedRecord[endRecNum] &&  sortedRecord[startRecNum - 1].recnum === startRecNum){
				var records = sortedRecord.slice(startRecNum - 1,this.data.cxPropPerPage + startRecNum - 1);
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
					this.setData({'startIndex':start_num - 1,"cxPropPage":page});
					this.setSortBySummary();
					// this.setData({"custom_view":resp,'listfields':resp.fields})
					this.constructCustomFields();
					this.setYieldInfo(this.getData("cxPropModule"),this.getData("list_cv_btn"),records);
					this.setData("lookupProperties",{});
					this.setBodyLookUp(records,this.data.LvHeader);
					this.setDisableRows(records);
					this.setData('LvContent',records);
					this.headerSelection();
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
				// }.bind(this))
			}else{
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// 	this.setData({"custom_view":resp,'listfields':resp.fields})
					this.fetchRelatedRecords(page,start_num - 1);
				// }.bind(this))
			}
	},	
	makeApiRequests:function(no_activith_badge_req){
		var module = this.data.cxPropModuleApiName;
		var custom_button;
		var view_preference;
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		if(!this.data.cxPropCustomButton &&  this.data.cxPropShowCustomButton){  //No I18n
			custom_button = new Promise((resolve)=>{
				store.findAll("custom_button",{module:module},true,undefined,{apiVersion:6}).then(resp=>resolve(resp)).catch(()=>resolve([]));
			});
		}
		let promiseArray = ()=>{
			return Lyte.resolvePromises([
				custom_button,
				(!this.data.cxPropCustomView  || Object.keys(this.data.cxPropCustomView).length === 0 )   && this.data.cxPropCvid ? store.findRecord("custom_view",this.data.cxPropCvid,{module:module}) : this.data.cxPropCustomView ,
				Object.keys(this.data.cxPropModuleInfo).length === 0 ||  !this.data.cxPropModuleInfo.fields || !this.data.cxPropModuleInfo.fields.length? store.findRecord("module",this.data.cxPropModuleId, undefined, undefined,true,  {allowMultiple : true} ) : [this.data.cxPropModuleInfo],
				view_preference
				// store.findAll("field", { module: "Tasks", type: "all" }, false, undefined, { apiVersion: '2.2' }),
				// !this.data.cxPropRelatedList ? store.findAll('related_list', { module:module }, false, undefined, { from: 'Chronological' }) : undefined
			]).then( function( res ){
				this.onDataLoad=true;
				//set custom_button data
				this.setCustom_buttonData(res[0]);
				//set custom_view data
				this.setData('custom_view',res[1] || (res[2] && res[2][0] && res[2][0].custom_view));
				this.setData("clip_mode",!this.data.custom_view.wrap_text)
				// set module data
				if(res[3] && res[3].modules && res[3].modules[0].activity_badge){
					this.setData("activity_badge",res[3].modules[0].activity_badge);
				}
				this.setModule_info(res[2]);
			
			}.bind(this),function( XHR ){
				this.setData("ShowLvLoading",false)
				if(this.getMethods("onBeforeLoadFailure")){
					/**
					 * This method will be executed on failute resp 
					 * @method onBeforeLoadFailure
					 * @author rafik.shaik
					 */
					this.executeMethod("onBeforeLoadFailure");//No I18n
				}
				if(this.data.isLvWrapper){
					var msg;
					if(XHR.status===404){
						msg='Mandatory module meta data / customviewId  for rendering listview component is missing/incorrect';
					}else{
						msg='Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect';
					}
					this.setErrorMsg(msg);
				}
				else if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
					if(typeof renderingUtils !== 'undefined' &&  renderingUtils.displayPermissionDenied !== 'undefined'){
						renderingUtils.displayPermissionDenied(XHR);
					}else{
						Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
					}
				}else if(XHR.status === 400){
					var _self = this;
					_cruxUtils.showCustomAlert({
						params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
						close : function(){
							if(_self.getMethods('onCloseShowCustomAlert')){
								_self.executeMethod('onCloseShowCustomAlert');
							}	
					   }
					 });
				}else{
					_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid Data has been provided'}})
				}
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}.bind(this));
		};
		if( module && (!this.data.cxPropCustomView  || Object.keys(this.data.cxPropCustomView).length === 0 ) && !this.data.cxPropCvid ){
			return store.triggerAction('module','view_preference_configurations',{module:module},{},"GET").then((resp)=>{
				let cvObj = resp.modules[0].last_accessed_views.filter(item=>item.type === 'custom_view')[0];
				this.setData('cxPropCvid' , cvObj.custom_view.id);
				return promiseArray();
			},()=>{
				return this.setErrorMsg("Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect.");
			});
		}
		if(!this.data.cxPropShowActivityBadge && this.data.activity_badge !== 'Not_Supported'){
			this.setData("activity_badge","disabled");
		}
		
		if( this.data.cxPropShowActivityBadge && !no_activith_badge_req && !view_preference){
			view_preference = new Promise((resolve)=>{
				store.triggerAction('module','view_preference_configurations',{module:module},{},"GET")
						 .then(resp=>resolve(resp))
						 .catch(()=>resolve({}));
			});
		}
		return promiseArray();
		
	},
	setCustom_buttonData:function(resp){
		if(resp && resp.length){
			var cvbtnlen = resp.length,
			listCvbtn = [],
			layerBtn = [];
			for (var i = 0; i < cvbtnlen; i++){
				if(resp[i].position === "list_view_each_record" || resp[i].position === "list_view_without_record"){
					var profileLen = resp[i].profiles.length;
					for (var j = 0; j < profileLen; j++){
						if(this.data.cxPropUserDetailsProfileName === resp[i].profiles[j].name){
							if(resp[i].position === "list_view_each_record"){
								listCvbtn.push(resp[i]);
							}else{
								layerBtn.push(resp[i]);
							}
						}
					}
				}
			}
			this.setData('list_cv_btn',JSON.stringify(listCvbtn));
		}
	},
	setModule_info:function(resp){ 
		this.setData("cxPropModuleInfo", resp[0]);
		this.data.cv_mod_fields = new Map();
		// var fields = this.data.custom_view.fields;
		//sort Icon
		if(!this.data.custom_view || !this.data.custom_view.fields){
			this.setData("ShowLvLoading",false)
			if(this.data.isLvWrapper){
				var msg='Mandatory module meta data / customviewId  for rendering listview component is missing/incorrect';
				this.setErrorMsg(msg);
			}
			// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Mandatory module meta data / moduleApiName / customviewId  for rendering listview component is missing/incorrect'}})
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
			return;
		}
		var fields = this.data.custom_view.fields,fieldsLen = fields.length,pinedArr = []; //No I18N
		this.setData('listfields',fields);
		var moduleFieldIds = this.data.cxPropModuleInfo.fields.map(function(field) { return field.id ; } ) ;
		for(var i = 0;i < fieldsLen;i++){
			if(fields[i]._pin && moduleFieldIds.includes(fields[i].id) && this.data.cxPropPinUnpinColumn){
				pinedArr.push(fields[i].id);
			}
		}
		this.setData('cv_mod_pined_fields',pinedArr);
		this.data.cxPropPinedFieldsLength = pinedArr.length;
		if(this.data.cxPropRecordCount === undefined){
			this.getCount = true;
		}else{
			this.setData({"show_loading":false});
			this.setData('total_new_count' , this.data.cxPropRecordCount);
			this.getData('cxPropModuleInfo').total_count = this.data.cxPropRecordCount;
			this.getCount = false;
		}
		this._menumove = this.menumousemove.bind(this);
		//column list
		this.callForArrangement();
		this.data.islockedListView = this.checkforListViewLock();
		this.setData({ "cxPropSystemName": this.data.custom_view.system_name ? this.data.custom_view.system_name : "", "actionsForStopProcessingRec": this.actionsAvailForComplianceRec() });
		this.setData("cxPropNoRecordsMessage", _cruxUtils.getI18n("crm.module.empty.message", this.data.cxPropModuleInfo.plural_label));
		this.fetchRelatedRecords();
	},
	fetchRelatedRecords:function(page,startIndex,value,delete_cvid){
		// _cruxUtils.removeCustomAlert();
		if(!this.isValidListViewData()){
			return ;
		}
		this.setData("errorDetails",{});
		var _self = this;
		var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
		var module_id = this.data.cxPropModuleId || this.data.cxPropModuleInfo.id,
		sort_by = custom_view.sort_by,
		 sort_order = custom_view.sort_order,
		 qp = {page:page ? page : this.data.cxPropPage,per_page:this.data.cxPropPerPage,approved: "both",cvid:this.data.cxPropCvid};
		 if(!qp.fields){
			qp.fields = this.data.cxPropModuleInfo.$properties;
			if(this.data.cxPropModuleInfo && this.data.cxPropModuleInfo.$on_demand_properties){
			qp.fields = qp.fields.concat(this.data.cxPropModuleInfo.$on_demand_properties);
			}
			function filterKey(key){
				return key === "$notes_view" ? false : true; //No i18n
			}
			qp.fields =  qp.fields ? qp.fields.filter(filterKey) : undefined;
		 }
		 if(qp.fields){
			if(typeof crmTab !== 'undefined' &&  crmTab.isZBCustomModule(this.data.cxPropModuleInfo.module_name)){
				qp.fields.push("ExchangeRate");
			}
			else{
				qp.fields.push("Exchange_Rate");
			}
			if(this.data.cxPropModuleInfo.module_name === "Activities"){
				qp.fields.push("$activity_type");
				this.data.cxPropIsNewCallView ? qp.fields.push("Outgoing_Call_Status") : qp.fields.push("Call_Status");
				qp.fields.push("Call_Type");
				qp.fields.push("Owner");
			}
			if(this.data.cxPropModuleInfo.module_name === "Calls"){
				this.data.cxPropIsNewCallView ? qp.fields.push("Outgoing_Call_Status") : qp.fields.push("Call_Status");
				qp.fields.push("Call_Type");
				qp.fields.push("Owner");
			}
			if(this.data.cxPropModuleInfo.module_name === "Events" || this.data.cxPropModuleInfo.module_name === "Tasks"){
				qp.fields.push("Owner");
			}
			qp.fields.push("Data_Processing_Basis_Details");
			if(this.data.cxPropModuleInfo.api_name === "Leads" || this.data.cxPropModuleInfo.api_name === "Contacts"){
				qp.fields.push("First_Name");
				qp.fields.push("Last_Name");
				qp.fields.push("Full_Name");
			}
			qp.fields.push("Currency");//No I18n
			qp.fields.push("Tag");//No I18N
			qp.fields.push("Owner");//No I18N
			qp.fields.push("Locked__s");//No I18n
		}
		else{
			delete qp.fields;
		}
		qp.home_converted_currency = true;
		qp.formatted_currency = true;
	
		if(sort_by && sort_order){
			qp.sort_by = sort_by.api_name;
			qp.sort_order = sort_order;
		}
		if(this.data.cxPropSearchLetter && this.data.cxPropSearchField){
			qp.alphabet = this.data.cxPropSearchLetter;
			if(this.data.cxPropDisplayField[this.data.cxPropModule].length > 1){
					qp.alphabetical_index_field = this.data.cxPropSearchField;
			}
		}
		var filetr_store = $L("crux-smart-filter");
		var smart_filter = filetr_store && filetr_store[0] ? filetr_store[0].component.getFilterCriteria() : undefined;
		if(smart_filter && smart_filter.queryParams){
			qp.filters = smart_filter.queryParams.filters;
			if(smart_filter.queryParams.cross_filters){
				qp.cross_filters = smart_filter.queryParams.cross_filters;
			}
			// smart_filter.queryParams.cross_filters ? qp.cross_filters = smart_filter.queryParams.cross_filters : "";
		}
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		if(qp.fields && (delete_cvid || this.data.cv_width_updated || this.addCVFieldsInRecordFetch)){
			// delete qp.cvid;
			var list_field_length = this.data.listfields.length;
			for(var i = 0;i < list_field_length;i++){
				if(qp.fields.indexOf(this.data.listfields[i].api_name) === -1){
					qp.fields.push(this.data.listfields[i].api_name);
				}
			}
			delete this.addCVFieldsInRecordFetch;
		}
		var recordData;
		var Lv_con=this.data.cxPropListViewContent;
		if(Lv_con &&  Lv_con.length && this.onBeforeLoad){
			var startRecNum = ((page ? page : this.data.cxPropPage) - 1) * this.data.cxPropPerPage + 1;
			recordData = this.data.cxPropListViewContent.slice(startRecNum - 1,this.data.cxPropPerPage + startRecNum - 1);
		}
		return Lyte.resolvePromises({
			count : _self.getCount ? store.triggerAction(module_id,"count",qp) : {count:undefined},
			records: recordData && recordData.length > 0 ? recordData : (this.data.cxPropFireBulkRequest ? store.findAll(module_id,qp) :[])
		}).then(function(res){
			this.setData("ShowLvLoading",false);
			this.onBeforeLoad = false;
			this.constructCustomFields();
			if(this.data.LvHeader.length==0 && this.data.isLvWrapper){
				var msg="Provided moduleData doesn't contains the customview field information. Please provide valid moduleData / moduleApiName for rendering lisview.";
				this.setErrorMsg(msg);
				return ;
			}
			//pin value handling
			if(value && value === 'Pin Column'){
				this.setData('doEnablePinnedColAnim',true); //No I18n
				setTimeout(function(){
					this.setData('doEnablePinnedColAnim',false); //No I18n
				}.bind(this),2000);
			}
			this.setData({"cxPropPage":page ? page : this.data.cxPropPage,"startIndex":startIndex !== undefined ? startIndex : (this.data.cxPropPage - 1) * this.data.cxPropPerPage});
			var resp = res.records;
			this.setDataBeforeRender(resp);
			if(!recordData || recordData.length === 0){
				var rec_len = resp.length;
				if(!this.data.cxPropListViewContent){
					this.setData("cxPropListViewContent",[]);
				}
				for(var i = 0;i < rec_len;i++){
					if(this.records.indexOf(resp[i].id) === -1){
						this.data.cxPropListViewContent.push(resp[i]);
						this.records.push(resp[i].id);
					}
				}
			}
			if(this.getMethods("onBeforeLoadSuccess")){
				/**
				 * This method will be executed on success resp at initial load ;
				 * @method onBeforeLoadSuccess
				 * @author rafik.shaik
				 */
				this.executeMethod("onBeforeLoadSuccess", this.data.cxPropCvid,res);//No I18n
			}
			if(res.count.count !== undefined){
				this.setData({'cxPropRecordCount':res.count.count,"show_loading":false});
			}
			this.getCount = false;
			// this.setData('LvContent',resp);
			
			this.setSortBySummary();
			this.setYieldInfo(this.getData("cxPropModule"),this.data.list_cv_btn,resp); //No I18N
			this.setBodyLookUp(resp,this.data.LvHeader);
			// this.flag=false
			if(this.getMethods('onGetRecordData')){
				/**
				 * This method will be executed on success resp of bulk request;
				 * @method onGetRecordData
				 * @author rafik.shaik
				 */
				this.executeMethod('onGetRecordData',this.data.cxPropCvid, resp , qp).then(function(res){
					this.setDisableRows(res);
					this.setData('LvContent',res);
					this.headerSelection();
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
				}.bind(this));
			}else{
				this.setDisableRows(resp);
				this.setData('LvContent',resp);
				this.headerSelection();
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}
		}.bind(this),function(XHR){
			this.setData("ShowLvLoading",false);
			if(this.getMethods("onBeforeLoadFailure")){
				/**
				* This method will be executed on failure resp at initial load;
				* @method onBeforeLoadFailure
				* @author rafik.shaik
				*/	
				this.executeMethod("onBeforeLoadFailure");//No I18n
			}
			if(this.data.isLvWrapper){
				var msg='Mandatory module meta data /customviewId info  for rendering listview component is missing/incorrect';
				this.setErrorMsg(msg);
			}
			else if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
				if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
					renderingUtils.displayPermissionDenied(XHR);
				}else{
					Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
				}
			}else if(XHR.status === 400){
				var _self = this;
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
					close : function(){
						if(_self.getMethods('onCloseShowCustomAlert')){
							_self.executeMethod('onCloseShowCustomAlert');
						}	
				   }
				 });
			}else{
				_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid Data has been provided'}})
			}
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
		}.bind(this));
	},
	isValidListViewData:function(){
		if(this.data.isLvWrapper){
			var error_msg;
			var {cxPropPerPage :per_page , cxPropPage: page}=this.data;
			if([10,20,30,40,50,100,500].indexOf(per_page)===-1){
				error_msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
			}else if((per_page===100 || per_page==500) && typeof Crm !== "undefined" && !this.data.cxPropUserDetailsIsPaidUser ){
				error_msg = 'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.';
			}
			else if(per_page==500 && typeof Crm !== 'undefined' && this.data.cxPropUserDetailsMaxRange <500 ){
				error_msg = 'Your maximum allowed range is less than 500. Please select a smaller per page size.';
			}else if(!page || page<0){
				error_msg='Mandatory module meta data / page  for rendering listview component is missing/incorrect.';
			}
			if(error_msg){
				this.setData("ShowLvLoading",false);
				this.setErrorMsg(error_msg);
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
				return false;
			}
		}
		return true;
	},
	setErrorMsg:function(msg){
		var obj=this.data.errorDetails;
		obj.show_error=true;
		obj.message=msg;
		this.setData("errorDetails",{});
		this.setData({"ShowLvLoading" : false,"errorDetails":obj });
	},
	addClassForSelectAll:function(){
		
		var tableBody = $L(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup",this.$node),
		uncheckedCheckBoxCount = tableBody.find(".cxListVwCustomCheckBox").length,
		checkedCheckboxCount = tableBody.find(".cxListVwCustomCheckBoxChecked").length,
		className = "cxListVwPartialselect"; //No i18n
		if(uncheckedCheckBoxCount === 0){
			className = "cxListVwCustomCheckBoxChecked"; //No i18n
		}else if(checkedCheckboxCount === 0){
			className = "cxListVwCustomCheckBox"; //No i18n
		}
		var tarElems =  this.$node.querySelectorAll("[id='selectCheckbox']"); //No i18n
		tarElems.forEach(function(tarElem){					
			if(tarElem){
				var targetSpan = tarElem.querySelector("span"); //No i18n
				targetSpan.classList = "";
				targetSpan.classList = className;
				tarElem.ltProp("class", className); //No i18n					
			}
		});

		if(this.data.from_page === 'listview'){
			if(className === "cxListVwCustomCheckBoxChecked" && this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1){
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1 ){
					Lyte.arrayUtils(this.getData('selectViewArray') , 'push', this.data.cxPropPage);
				// }
			}
			else if((className === "cxListVwCustomCheckBox" || className === "cxListVwPartialselect") && this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1){
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1){
					Lyte.arrayUtils(this.data.selectViewArray, "removeAt", this.data.selectViewArray.indexOf(this.data.cxPropPage), 1);
				// }
			}
			var smrt_flt=$L("crux-smart-filter")[0], filter;
			if(smrt_flt){
				filter=smrt_flt.component.getFilterCriteria() ;
			}
			// var filter = $L("crux-smart-filter")[0] ? $L("crux-smart-filter")[0].component.getCriteria() : undefined;
			if(this.data.selectViewArray.length > 0 && this.data.cxPropMassOperationTotalLimit >= this.data.cxPropRecordCount && this.data.cxPropRecordCount >= this.data.cxPropPerPage && (filter && filter.noFieldSelected || !filter )){
				this.setData("showSelectedDiv", true); 
			}else{
				this.setData("showSelectedDiv", false); 
			}
		}
	},
	setDataBeforeRender:function(res){
		if(res.length){
			var start = (this.data.cxPropPage - 1) * this.data.cxPropPerPage + 1;
			res.forEach(function(rec){ 
				rec.recnum = start++ ; 
			})	;	
		}
	},
	onPageNateCallback:function(page,per_page){
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		this.executeMethod("onListviewPaginate",page,per_page).then(function(resp){
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
			this.setData({"cxPropPage":page ,"startIndex":(page - 1) * this.data.cxPropPerPage});
			this.setDataBeforeRender(resp);
			var rec_len=resp.length;
			for(var i = 0;i < rec_len;i++){
				if(this.records.indexOf(resp[i].id) === -1){
					this.data.cxPropListViewContent.push(resp[i]);
					this.records.push(resp[i].id);
				}
			}
			this.setSortBySummary();
			// this.constructCustomFields();
			this.setYieldInfo(this.getData("cxPropModule"),this.data.list_cv_btn,resp); //No I18N
			this.setBodyLookUp(resp,this.data.LvHeader);
			this.setDisableRows(resp);
			this.setData('LvContent',resp);
			this.headerSelection();
		}.bind(this));
	},
	setRecordCount:function(arg){
		var seletedIdslen = this.data.cxPropSelectedIds ? this.data.cxPropSelectedIds.length : 0;
		if( !this.internalSelectionChange && arg && arg.item !== "cxPropModule" ){
			let oldValue = arg.oldValue ? arg.oldValue : [], newValue = arg.newValue ? arg.newValue : [];
			let addedIds = newValue.filter(x => !oldValue.includes(x)),
				removedIds = oldValue.filter(x => !newValue.includes(x));
				addedIds = addedIds.length > 0 ? addedIds : arg.insertedItems ? arg.insertedItems : [];
				removedIds = removedIds.length > 0 ? removedIds : arg.removedItems ? arg.removedItems : [];
			if( addedIds.length > 0){
				let container;
				addedIds.forEach(function(id){
					container = $L("#selectEntity_"+id)[0]; //No I18N
					if( container ){
						this.selectedEntity(container.querySelector('input'),this.data.LvContent); //No I18N
					}
				}.bind(this));
			}
			if( removedIds.length > 0){
				let container;
				removedIds.forEach(function(id){
					container = $L("#selectEntity_"+id)[0]; //No I18N
					if(container){
						this.selectedEntity(container.querySelector('input'),this.data.LvContent); //No I18N
					}
				}.bind(this));
			}
		}
		delete this.internalSelectionChange;
		if(seletedIdslen === 0){
			this.setData("selectedCount","");
		}else{
			var recordMsg =  seletedIdslen === 1  ? _cruxUtils.getI18n('crm.record.not.accessible') : _cruxUtils.getI18n('records');
			this.setData('selectedCount',_cruxUtils.getI18n('crm.listview.selected.records',seletedIdslen, recordMsg)); 
		}
	}.observes('cxPropSelectedIds.[]','cxPropModule'),
	observerField:function(){
		// if(this.getData('cxPropIsResizeEnabled') )
		// {
			this.checkForWidthUpdate();
			this.calculateWidthForTable();
		// }

	}.observes("LvHeader").on("init"),
	observeCustomview:function(){
		if(!this.data.isLvWrapper){ //this.onDataLoad &&    While set the customview using property it should allow to set the fields.
			this.setData({"listfields" : this.data.cxPropCustomView.fields , 'custom_view' : this.data.cxPropCustomView});
			this.constructCustomFields();
		}
	}.observes("cxPropCustomView","cxPropCustomView.{}"),
	observePerPage : function(arg){
		var arr=[10,20,30,40,50,100,500];
		var {cxPropPerPage : per_page , cxPropUserDetailsIsPaidUser : paid_user ,cxPropUserDetailsMaxRange : max_Range}=this.data;
		if(arr.indexOf(per_page)===-1 || (per_page === 100 && !paid_user) || (per_page === 500 && max_Range < 500)){
			if(arg && arg.oldValue){
				this.setData("per_page_val",arg.oldValue) ;
			}else{
				this.setData("per_page_val",10) ;
			}
		}else{
			this.setData("per_page_val", per_page) ;
		}
	}.observes("cxPropPerPage").on("init"),
	observeRecords : function(){
		if(this.onDataLoad && !this.data.isLvWrapper){
			var records=this.data.cxPropListViewContent;
			this.setData({"startIndex":0,"cxPropPage":1});
			this.setDataBeforeRender(records);
			this.setSortBySummary();
			this.constructCustomFields();
			this.setYieldInfo(this.getData("cxPropModule"),this.getData("list_cv_btn"),records);
			this.setData("lookupProperties",{});
			this.records=[];
			var rec_len=records.length;
			for(var i = 0;i < rec_len;i++){
					this.records.push(records[i].id);
			}
			this.setBodyLookUp(records,this.data.LvHeader);
			this.headerSelection();
			this.setDisableRows(records);
			this.setData("LvContent",records);
		}
	}.observes("cxPropListViewContent"),
	observeManageColumnsCscript: function  () {
			this.setData('isManageColumnsEnabled', this.chkManageColForLockedCVAvail(this.data.custom_view, this.data.cxPropAdmin) && this.data.manage_columns_visible);
	}.observes('manage_columns_visible'),
	setDisableRows : function(records) {
		var disableRows = this.data.cxPropDisabledList ? this.data.cxPropDisabledList : [] , dClass = this.data.cxPropDisableRowClass , disableCount = 0;
		if (disableRows.length > 0) {
			records.forEach(function(record) {
				if (disableRows.indexOf(record.id) > -1) {
					record.cxPropClass = record.cxPropClass ? record.cxPropClass + ' ' + dClass : dClass;
					disableCount++;
				}
			});
			if(disableCount === records.length){
				this.setData({'diableHeaderCheckbox' : true , "cxPropShowMaxSelectTooltip" : false});
			}else{
				this.setData({'diableHeaderCheckbox' : false , "cxPropShowMaxSelectTooltip" : true});
			}
		} else {
			this.setData({'diableHeaderCheckbox' : false , "cxPropShowMaxSelectTooltip" : true});
		}
	},
	getDefaultMenuValues : function(field){
		var isNumericField = ["phone","currency","integer","double"].includes(field.data_type) ;//No I18N
		return {
			asc  : {data_value : 'asc' , label : isNumericField ? '0-9' : _cruxUtils.getI18n('crm.column.sort.asc') , class : 'cxLvSortAscIcon'},
			desc : {data_value : 'desc' , label : isNumericField ? '9-0' : _cruxUtils.getI18n('crm.column.sort.desc') , class : 'cxLvSortAscIcon cxLvSortDesIcon'},
			unsort : {data_value : 'unsort' , label : _cruxUtils.getI18n('crm.column.unsort') , class : 'cxLvSortCloseIcon'},
			pin : {data_value : 'Pin Column' , label : _cruxUtils.getI18n('crm.customview.pin.column') , class : 'cxLvSortPinIcon'},
			unPin : {data_value : 'UnPin Column' , label : _cruxUtils.getI18n('crm.customview.unpin.column') , class : 'cxLvSortUnpinIcon'},
			hideCol : {data_value : 'Hide Column' , label : _cruxUtils.getI18n('crm.calendar.hide.events', _cruxUtils.getI18n('crm.report.column')) , class : 'zcicncss-eye-closed zcicn-cssIcons mR10'},
			mask : {data_value : 'mask' , label : _cruxUtils.getI18n('crm.masking.hide_masked_data') , class : 'cxMaskIcon cxSprite'},
			unmask : {data_value : 'unmask' , label : _cruxUtils.getI18n('crm.masking.view_masked_data') , class : 'cxUnmaskIcon cxSprite'}
		};
	},
	methods : {
		onClose : function(){
			if(this.getMethods('onCloseCallMenu')){
				/**
				 * This method will be executed on close of call menu
				 * @method onCloseCallMenu
				 * @author rafik.shaik
				 */
				this.executeMethod('onCloseCallMenu');
			}
		},
		onBeforeMenuClose:function(menu,event){
			if(event && event.target && event.target.closest( menu.ltProp( 'query' ) )){
				return false ;
			}
			// if(this.getMethods('onBeforeCallMenuClose')){
			// 	this.executeMethod('onBeforeCallMenuClose');
			// }
		},
		onBeforeShow:function(elem,event){
			if(event.type !== "click" && event.target){
				return false;
			}
			if(this.getMethods('onBeforeCallMenuShow')){
				/**
				 * This method will be executed on onBefore call menu show
				 * @method onBeforeCallMenuShow
				 * @author rafik.shaik
				 */
				this.executeMethod('onBeforeCallMenuShow',elem,event);
			}
		},
		subMenuClick:function(item,toMod){
			if(this.getMethods('onCallMenuClick')){
				/**
				 * This method on sub menu click
				 * @method onCallMenuClick
				 * @author rafik.shaik
				 */
				this.executeMethod('onCallMenuClick',item,"quickAction",this.getData("entityId"),toMod);
			}
		},
		setCss:function(result){
			var menu = $L('#cxLvCustomBtnMenu')[0].component;
			menu.setCss.call(menu);
			if(result.length === 0){ 
				if($L('.noresultstyle')[0]){
					return ;
				}
				var container = $L('#cvBtnContainer_' + this.data.cxPropId)[0];  // No I18N
				var div = document.createElement('div');
				div.setAttribute('class','noresultstyle');
				div.textContent = _cruxUtils.getI18n("crm.social.integ.no.result");
				container.appendChild(div) ;
			}else{
				var noresultdiv = $L('.noresultstyle')[0];
				if(noresultdiv){
					noresultdiv.remove();
				}
			}

		},
		customBtnClick : function(event){
			event.stopPropagation();
			event.preventDefault();
		},
		executeCustomButtonMethod : function(buttonId){
			this.executeCustomButton(buttonId,this.data.entityId);
		},
		makeSortableBtn : function(_menu,_event,menuOrigin){
			var cvSearchBtn = $L('#cxLvBtnSearch_' + this.data.cxPropId); //No i18n
			if(cvSearchBtn[0]){
				cvSearchBtn[0].setValue("");
			}
			$L(menuOrigin).closest('lyte-exptable-tr').addClass('cxLvTableRowHover'); //No i18n
			document.addEventListener( 'mouseover', this._menumove, true ); //eslint-disable-line @zoho/zstandard/no-body-events
		},
		hideMenu : function(){
			document.removeEventListener( 'mouseover', this._menumove, true );
			$L('.cxLvTableRowHover').removeClass('cxLvTableRowHover');
			var cvSearchBtn = $L('#cxLvBtnSearch_' + this.data.cxPropId); //No i18n
			if(cvSearchBtn[0]){
				cvSearchBtn[0].setValue("");
			}
		},
		onCallsMenuOpen : function(){
			var entityId = this.getData('entityId');//no i18n
			this.setData('callentityId',entityId);//no i18n
			var record = this.getData('LvContent').filter(function(record){
				return record.id === entityId ;
			});
			if( this.getData("cxPropModule") === "Appointments"){
				// var record = this.getData('LvContent').filter(function(record){
				//     return record.id === entityId ;
				// });
				this.setData({'serviceId': record[0].Service_Name.id,
				'isScheduled':record && record[0] && (record[0].Status === _cruxUtils.getI18n("Scheduled") || _cruxUtils.getI18n(record[0].Status) === _cruxUtils.getI18n("Overdue")) ? true : false,
				'appEndTime':record && record[0] ? record[0].Appointment_End_Time : undefined}) ;
				if(_cruxUtils.getI18n(record[0].Status) !== _cruxUtils.getI18n("Overdue")){
				store.findAll('servapp_preferences',{},false,true,{'module':"Appointments"}).then(function(res){
					if(res && res.length){
						this.setData('hasCompleteAction', res[0].appointments.when_duration_exceeds === "mark_as_complete" ? false : true);//no i18n
				$L('#appMoreOptionList').css("display","block");//No i18n
					}
				}.bind(this));
				}else{
					this.setData('hasCompleteAction', true);//no i18n
					$L('#appMoreOptionList').css("display","block");//No i18n
				}
			}
			else if(this.data.cxPropIsNewCallView){
				// var record = this.getData('LvContent').filter(function(record){//no i18n
				//     return record.id === entityId ;
				// });
				if(record && record[0] && record[0].Owner.id === this.data.cxPropUserDetailsId){
					this.setData('hasCompleteAction', true);//no i18n
				}else{
					this.setData('hasCompleteAction', false);//no i18n
				}
			}
		},
		onbeforeMenuClose:function(event){
			if(this.getData('cxPropModule') === 'Appointments'){
				Lyte.resolvePromises({
					'filesResolved' : Lyte.injectResources(networkUtils.returnDependencyFiles(["zohocrm_services.js"],ResourceConstants.CRM).concat(networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("businesshours")],ResourceConstants.CRM)).concat(networkUtils.returnDependencyFiles(["business_hours-model.js","crm-services-appointments.js","servapp_preferences_model.js"],ResourceConstants.CRMClient)))//no i18n
				}) ;
				}
			if(event && event.target && (event.target.id.indexOf('_more') !== -1 || event.target.id.indexOf('_mass_convert_Quotes') !== -1 || event.target.id.indexOf('_mass_convert_SalesOrders') !== -1)) {
				return false;
			}
		},
		addMoreOptions:function(){
			
			$L('#qAOptions_' + this.getData('entityId') + '_mass_convert_' + this.getData("cxPropModule")).removeClass('lvSelectItem');
			var activitiesMenu = [];
			var module = this.getData("cxPropModule");//No I18N
			var appointRL, activityRL, related_lists = this.relatedListForModule;
			if(related_lists === undefined) {
				if(this.data.cxPropModuleInfo.related_lists) {
					related_lists = this.data.cxPropModuleInfo.related_lists;
				}
				else {
					related_lists = this.data.cxPropRelatedList; //No I18N
				}
			}
			if(related_lists) {
				related_lists.filter(function(lists){
					appointRL = !appointRL ? lists.personality_name === "APPOINTMENTSPERSONALITY" : appointRL;  //No I18N
					activityRL = !activityRL ? lists.personality_name === "ACTIVITYPERSONALITY" : activityRL; //No I18N
				});
			}
			var mod_rec_map = this.data.cxPropModuleRecordMapping;
			if(activityRL && this.data.cxPropUserDetailsCrmImpliedCreateCalls && mod_rec_map.Calls && mod_rec_map.Calls.visible){
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.button.create.call"), value : "create_call", isNewCallView : this.data.cxPropIsNewCallView}); //No I18n
			}
			if(activityRL && this.data.cxPropUserDetailsCrmImpliedCreateEvents && mod_rec_map.Events && mod_rec_map.Events.visible){
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.module.create",_cruxUtils.getI18n("Meeting")), value : "create_meetings"}); //No I18n
			}
			if(appointRL && this.data.cxPropUserDetailsCrmImpliedCreateAppointments && mod_rec_map.Appointments && mod_rec_map.Appointments.visible) {
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.module.create",_cruxUtils.getI18n("Appointment")), value : "create_appointment"}); //No I18n
			}
			$L('#qAOptions_' + this.getData('entityId') + '_more').addClass('lvSelectItem');
			this.setData('activitiesMenu',activitiesMenu); //No I18N

		},
		beforeSetFixTableColumnWidth:function(table){
			
			if(!this.getData('cv_width_updated')){
				table.classList.add("setMinWidthList");//No I18N
			}
		},
		afterSetFixTableColumnWidth : function(table){
			if(!this.getData('cv_width_updated')){
				table.classList.remove("setMinWidthList");//No I18N
		}
		},
		showMoreTags:function(){
			// some handling is pending
		},
		latestEntityIdFromTable:function(){
			
			var p = this.origEntRow;//No i18n
			if(p){
				var fn = $L.fastdom.mutate(function(){
					setTimeout(function(){
						var ele = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap lyte-exptable-tr:nth-child(" + p + ")");//No i18n
						var height = ele.offsetTop - 45;
						$L(".lyteExpTableOrigTableInnerWrap",this.$node).scrollTop(height);	
					}, 60);	
					$L.fastdom.clear(fn);
				});
			}

		},
		itemDrop:function(){
			this.callcleasrselectedFields = true;
		},
		selectAllEntity:function(){
			this.selectAllEntity();
			this.addClassForSelectAll();
		},
		selectedEntity:function(element){
			
			this.selectedEntity(element,this.data.LvContent);
		// 	if(this.data.cxPropSelectedIds.length){
		// 		this.setData("showActionBtn",true); //No I18N
		// 	}else{
		// 	this.setData("showActionBtn",false); //No I18N
		// }
		this.addClassForSelectAll();
		},
		tableScroll:function(){
			var sortMenu = $L("#cxLvSortUnsortMenu",this.$node)[0];
			if(sortMenu){
				sortMenu.ltProp("show",false); //No i18n
			}

			// this.$node.querySelector('#sort_menu').ltProp('show',false);
			// this.setData('sortDetailshow',false);
			var $node = this.$node;
			var aplhaMenu = $L("#cxLvAlphaSortMenu_" + this.data.cxPropId,$node)[0];
			var descMenu = $L("#LvMoreDescMenu")[0];
			if(aplhaMenu){
				aplhaMenu.ltProp("show",false);
			}
			if(descMenu){
				descMenu.ltProp("show",false);
			}

			// this.setData('sortDetailshow',false)
		},
		clearSelected:function(option){
			var callList = $L('#cxLvMoreOptionsCallMenu')[0];
			if(callList){
				callList.ltProp("show", false); //No I18N
			}
			$L('#qAOptions_' + this.getData('entityId') + '_' + option).removeClass('lvSelectItem');

		},
		onbeforeCallsMenuClose:function(menu, event){
			if(event && event.target && (event.target.id.indexOf('_create_call') !== -1 && this.data.cxPropIsNewCallView || event.target.id.indexOf('_more') !== -1)) {
				return false;
			}

		},
		sortRecord:function(value ,event ,element ,sortElem, sortObj){
			var persistPinUpdate = this.getData('persistPinUpdate');//No I18n
			if(value === "Pin Column" || value === "UnPin Column")
			{
				if(this.getData("cxPropPinedFieldsLength") >= 1 && value === "Pin Column" || this.getData("islockedListView")) {
					return;
				}
				this.pinUnpinfield(value,persistPinUpdate);	
			}
			else
			{
				this.sortRecord(value, event, element, sortElem, sortObj);
				// this.setSortBySummary()
			}
		},
		sortBtnDisplay:function(ele,event,org_ele){	
			var field =  this.getFieldMeta( org_ele.parentElement.id );
			var custom_view= this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
			if( !field || !custom_view){
				_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid meta Data / custom_view info has been provided'}})
				var sortMenu = $L("#cxLvSortUnsortMenu",this.$node)[0];
				if(sortMenu){
					sortMenu.ltProp("show",false); //No i18n
				}
				return;
			}
			this.data.sortIconFieldId = field.id;
			let sortVal = this.getDefaultMenuValues(field);
			var sortObj = $L('#sorted_column_' + field.id,this.$node)[0];
			var sortDetails = [];
			// var sortDisplayDetails = {};
			var isNumericField = ["phone","currency","integer","double"].includes(field.data_type) ;//No I18N
			if(field.sortable){
				if(field.column_name === "BEST_TIME"){
					sortDetails = [sortVal.asc , sortVal.unsort]; //No I18N
					// sortDisplayDetails = {'asc' : _cruxUtils.getI18n('crm.column.sort.asc'), 'unsort' : 'unsort'}; //No I18N
				}
				else{
					if(sortObj && custom_view.sort_order === 'asc'){
						sortDetails = [sortVal.desc,sortVal.unsort]; //No I18N
					}
					else if(sortObj && custom_view.sort_order === 'desc'){
						sortDetails = [sortVal.asc,sortVal.unsort]; //No I18N
					}
					else{
						sortDetails = [sortVal.asc,sortVal.desc]; //No I18N
					}	
					// sortDisplayDetails = {'asc' : isNumericField ? '0-9' : _cruxUtils.getI18n('crm.column.sort.asc'), 'desc' : isNumericField ? '9-0' : _cruxUtils.getI18n('crm.column.sort.desc')}; //No I18N
			}
				
			}
			if(!window.clientPortalName && this.data.cxPropPinUnpinColumn) {
				var modInfo = this.data.cxPropModuleInfo ;
				var fieldsArr = custom_view.fields ;
				fieldsArr.forEach(function(item){
					if(field.id === item.id){
						switch(item._pin) {
							case true :
								sortDetails.push(sortVal.unPin); //No I18N
								// sortDisplayDetails['UnPin Column'] = "UnPin Column" ;
								break;
							case false :
								default :
								sortDetails.push(sortVal.pin); //No I18N
								// sortDisplayDetails['Pin Column'] = "Pin Column" ;
								break;
						}
					}
				});
			}; 
			if(this.data.cxPropActivityBadgeUpgradeEnabled){
				var {cxPropSystemName , cxPropModule , cxPropModuleRecordMapping , cxPropPermissions , LvContent , cxPropIsActivitySplitDone} = this.data;
				var isTeamModule= cxPropModuleRecordMapping[cxPropModule] ? cxPropModuleRecordMapping[cxPropModule].ccess_type === "team_based"  ? true : false : false ;
				var permission=isTeamModule ? cxPropPermissions["Crm_Implied_Manage_CustomViews_" + cxPropModule] : cxPropPermissions.Crm_Implied_Manage_CustomViews;	
				var showHideColumn =  ((cxPropSystemName && cxPropSystemName.indexOf("CONVERTEDVIEWS") !== -1 && !LvContent.length)  || !permission) ? false : (cxPropModule === "Activities" && cxPropIsActivitySplitDone) ? false : true;	//No I18N		
				if(this.data.cxPropEnableHideColumn && showHideColumn && this.data.cxPropShowManageColumn){
					sortDetails.push(sortVal.hideCol);
					// sortDisplayDetails['Hide Column'] = _cruxUtils.getI18n('crm.calendar.hide.events', _cruxUtils.getI18n('crm.report.column'));	//No I18N
				}	
			}
			var displayFields=this.data.cxPropDisplayField[this.data.cxPropModule] || [];
			var totDisplayFieldInView = 0;
			(this.getData("LvHeader")).forEach(function(item){	//No I18N
                if(displayFields.includes(item.api_name )){
                    totDisplayFieldInView+=1;
                }
            })
			var fieldColumn = this.getData("LvHeader").filter(obj=>obj.id ===  field.id)[0];
			var fieldPinned = fieldColumn.cxPropPinned || this.data.cv_mod_pined_fields.includes(field.id);
			if(fieldPinned || (displayFields.includes(field.api_name) && totDisplayFieldInView === 1) || this.getData("islockedListView")){
                this.setData("disableHideOpt",true);	
            }else{
                this.setData("disableHideOpt",false);	
            }
			var profileId = this.data.cxPropProfileId; //masking unmasking handling
			if(profileId && field.mask_details){
				var isMaskingNeeded = profileId && field.mask_details.profiles && field.mask_details.profiles.find((profile)=> profileId===profile.id);
				if(!isMaskingNeeded){
					return false;
				}else if(isMaskingNeeded){
					if(field.cxMasked || field.cxMasked === undefined){
						sortDetails.push(sortVal.unmask);
					}else{
						sortDetails.push(sortVal.mask);
					}
				}
			}
			this.setData({'sortDetails':sortDetails}) ; //'sortDisplayDetails':sortDisplayDetails
			return true;
		},
		//side Icon methods
		onMenuClose:function(fromAction){
			var recordId = fromAction === "quickAction" ? this.getData('recordObjForQuickAction') ? this.getData('recordObjForQuickAction').id : this.getData('entityId') : this.getData('callentityId'), //No I18N
			id = 'icons' + recordId,len = $L('.cxLvTableRowHover').length;//no i18n
			for(var i = 0;i < len;i++){
				// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
				if($L('#' + id,$L($L('.cxLvTableRowHover')[i])).length > 0){
					// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
					$L($L('.cxLvTableRowHover')[i]).removeClass('cxLvTableRowHover');
				}	
			}
		},
		onManageColumnListOpen:function(){
			this.$node.querySelector(".cxLvTableManageMenuBtn").classList.add("cxLvMenuOpen");
		},
		onQuickActionsMenuOpen:function(ele,event,orgin_ele){
			orgin_ele.closest('lyte-exptable-tr').classList.add('cxLvTableRowHover');
		},
		onQuickActionsMenuClick:function(item,toMod){
			if(this.getMethods('onCallMenuClick')){
				/**
				 * This method  will be executed on quick action menu click
				 * @method onCallMenuClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onCallMenuClick",item,"quickAction",this.getData("entityId"),toMod);
			}
		},
		onBeforeQuickActionsMenuOpen:function(){
					_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

			var actionsMenu = [];
			var moduleActions = this.data.cxPropModuleActionsMenu;
			var cxPropSystemName = this.data.cxPropSystemName;
			var entityId = this.getData('entityId');//no i18
			var module = this.getData('cxPropModule'); //No i18n
			var record = this.data.LvContent.filter(function(record){
				return record.id === entityId ;
			});
			record = record[0];
			this.setData("recordObjForQuickAction",record); //No I18N
			moduleActions.forEach(function(item){
				if(item.value === "Edit") { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					  if(!(record.$approved === false && record.$approval && record.$approval.resubmit === false || cxPropSystemName && cxPropSystemName.indexOf("REVIEWPROCESS") >= 0) && (record.$approval && record.$approval.resubmit || record.$approved   || record.$review || module === "Appointments") && !record.$stop_processing && !record.$in_merge && record.$review !== "Rejected" && this.data.cxPropCrmImpliedEditModule)
					  {
						  actionsMenu.push({name : "Edit", value : "Edit"}); //No I18N
					  } 
				} else if(item.value === "tag_op") {
					  if(record.Tag && record.Tag.length){
						  actionsMenu.push({name : _cruxUtils.getI18n("crm.label.edit.module",_cruxUtils.getI18n("crm.label.small.tags")), value : "edit_tag" }); //No I18N
					  } else  {
						  actionsMenu.push({name : _cruxUtils.getI18n("crm.label.add.tags"), value : "add_tag" }); //No I18N
					  }
				} else {
					  actionsMenu.push(item);
				}
	  }.bind(this));
	  this.setData('quickActionMenu', record.$stop_processing  ?  this.data.actionsForStopProcessingRec : actionsMenu); 
		},
		//crux-column-list methods
		columnResize:function(result){
			result && result.length ? this.setData('showPopoverfooter',true) : this.setData('showPopoverfooter',false);//no i18n
		},
		beforePopoverShow:function(modalComp){
			var customview = this.data.custom_view || store.peekRecord('custom_view',this.getData('cxPropCvid')); //No I18N
			this.columnListModal = modalComp.childComp;
			if(!customview){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var cvFields = [];
			this.data.listfields.forEach(function(field){
				var obj = Object.assign({},field);
				cvFields.push(obj);
			});
			this.setData({"ordered_fields1": this.data.ordered_fields, //No i18n
			"selected_fields1":  this.data.listfields ? this.getCVFieldsWOWidth(cvFields) : cvFields} ); //No i18n

			if(this.callcleasrselectedFields){
				$L("crux-column-list" , this.columnListModal)[0].component.clearSelectedFields();
				this.callcleasrselectedFields = false;
			}

			if(this.data.activity_badge !== "Not_Supported" && this.data.activity_badge){
				Lyte.objectUtils( this.data.property_fields[0] , "add" , 'selected', this.data.activity_badge === "enabled"); //No I18N
			}

			this.resize();
		},
		onPopoverShow : function(){
			this.setData('isColumnListSaveDisabled',true);
		},
		beforeUnchecking:function(item){
			this.fieldmodified = true;
			var module = this.getData("cxPropModule"); //No I18n
			if(item.api_name === 'Name' && item.mandatory){
				return false;
			}
			if(item.pinned) {
				return false;
			}
			if((module === "Leads" || module === "Contacts") && item.mandatory){
				var fields = this.data.cxPropModuleInfo.fields, //No I18n
				lastnameid = fields.cruxFilterBy({"api_name" : "Last_Name"})[0].id, //No I18n
				fullnameid = fields.cruxFilterBy({"api_name" : "Full_Name"})[0].id,  //No I18n
				lastnameapi = this.data.ordered_fields.filter(function(item){ return item.id === lastnameid ; } )[0].api_name,
				fullnameapi = this.data.ordered_fields.filter(function(item){ return item.id === fullnameid ; } )[0].api_name,
				// lastName = document.getElementById(lastnameid+"_"+lastnameapi).checked,
				// fullName = document.getElementById(fullnameid+"_"+fullnameapi);
				lastName = $L("#" + lastnameid + "_" + lastnameapi)[0].checked,
				fullName = $L("#" + fullnameid + "_" + fullnameapi)[0];
				fullName = fullName ? fullName.checked : false;//no i18n
				if(lastName && fullName) {
					return true;
				}
				return false;
			}
			else if(item.mandatory){
				return false;
			}
			this.setData('isColumnListSaveDisabled',false);
			return true;

		},
		beforeSelection:function(field, elem){
			this.fieldmodified = true;
			var selectedFieldLen = $L("crux-column-list" , this.columnListModal)[0].component.getSelectedFields().length;
			if(!elem.classList.contains('cxColPropField') && selectedFieldLen >= this.data.cxPropMaxColCnt)
			{
				_cruxUtils.showCustomMessage({params : {ltPropType : "error", ltPropMessage :  _cruxUtils.getI18n("crm.alert.max.cvcols.reached",this.data.cxPropMaxColCnt)}}); //No i18n
					return false;
			}
			this.setData('isColumnListSaveDisabled',false);

		},
		PinOptionChanged:function(){
				this.fieldmodified = true;
				this.pinFieldModified = true;
				this.setData('isColumnListSaveDisabled',false);
		},
		beforePopoverClose:function(){
			if(this.getMethods('onBeforeColumnListClose')){
				/**
				 * This method will be executed on onBeforeColumnListClose
				 * @method onBeforeColumnListClose
				 * @author rafik.shaik
				 */
				this.executeMethod('onBeforeColumnListClose');
			}
		},
		//lyte-modal methods
		closePopover:function(){
			if(this.fieldmodified){
				this.callcleasrselectedFields = true;
			}
			this.fieldmodified = false;
			if(this.data.type === "modal")
			{
				this.setData("showModal",false);//No I18n
				$L('.cxColumnListNew').find('.divTopBorder').scrollTop(0);
			}
			else{ 
				this.$node.querySelector('#newPopup').ltProp("show",false); //No I18n
				$L('.addColumnPopover').find('.divTopBorder').scrollTop(0);
				this.setData('showModal',false);
			}

			if(this.data.from === "list")
			{
				// var comp = document.querySelector('crm-listview-options');//No I18n
				// if(comp){
					this.setData('columnListOpen',false);//No I18n
				// }
			}
			$L("#cruxColumnSearch")[0].setValue("");

		},
		//side icon lyte-popover methods
		popoverClose : function(){
			this.setData({'isOptionOpened':false,"showCont":false}) ;
		},
		//crux-table methods
		onResizeSelect:function(source){
			 if(source !== undefined) {
			var resizedColumn ;
			var nodes = this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow").children , node_len=nodes.length;
			for(var i = 0;i < node_len;i++){
				if(nodes[i].id === source.id){
					resizedColumn = nodes[i];
					break;
				}
			}
			if(resizedColumn){
				resizedColumn.classList.add("resizeSelect");
			}
			// resizedColumn ? resizedColumn.classList.add("resizeSelect") : ""
		}
			// if(source !== undefined) {
			// 	var resizedColumn = this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow").children.filter(function(item) { //No I
			// 		return item.id === source.id;
			// 	});
			// 	resizedColumn[0].classList.add("resizeSelect");
			// }
			//Fix for intial resize issue
			$L.fastdom.measure(function(){
				$L.fastdom.mutate(function(){
					if(this.data.cv_mod_fields.size === 0)
					{
						this.setData("cv_width_updated",true);//No I18N
					}
				}.bind(this));
			}.bind(this));

		},
		resizeColumn:function(source){
		
			// this.setData('disableResetOption',false);
			// this.setData("cv_width_updated",true);//No I18N
			var width ,
			id = source.id,
			_self = this ;
			 var field = this.findObjectFromArray(this.data.LvHeader,id , "id");
			 var resizedColumn;
			var originalHeader =  this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow"); //No I18N
			var nodes =  originalHeader.children , node_length=nodes.length;
			for(var n = 0;n < node_length;n++){
				if(id === nodes[n].id){
					resizedColumn = nodes[n];
					break;
				}
			}
			// var resizedColumn = originalHeader.children.filter(function(item) {
			// 	return item.id === id;
			// });
			// resizedColumn[0].classList.remove("resizeSelect");
			if(resizedColumn){
				resizedColumn.classList.remove("resizeSelect");
			}
			// resizedColumn ? resizedColumn.classList.remove("resizeSelect") : "";
			if(_self.data.cv_mod_fields.size === 0)	
			{
				$L.fastdom.measure(function(){
					var mapObj = _self.data.cv_mod_fields,
					headObj = originalHeader.querySelectorAll("lyte-exptable-th"),//No I18N
					headlen = headObj.length ;
					for(var it = 0 ; it < headlen ; it++)
					{
						if(headObj[it].id.length !== 0){
							var tmp = headObj[it].offsetWidth;
							var fieldObj = _self.findObjectFromArray(this.data.LvHeader,headObj[it].id , "id");
							fieldObj[0].style = "width:" + tmp + "px";//No I18N
							if(typeof CrmField !== 'undefined' && fieldObj[0].ui_type === CrmField.UITYPES.TAGS)
							{
								width = tmp;
							}
							mapObj.set(headObj[it].id , tmp);
						}
					}//No I18n
					$L.fastdom.mutate(function(){
						_self.setData({"cv_width_updated":true,"width_prev_cvid":_self.data.cxPropCvid});
						// _self.setData("cv_width_updated",true);//No I18N
						// _self.setData("width_prev_cvid",_self.data.cxPropModuleInfo.cvid);//No I18n
					}.bind(this));
				}.bind(this));
			}
			else
			{
				$L.fastdom.measure(function(){
					width = source.offsetWidth;
					field[0].style = "width:" + width + "px";//No I18N
					// this.setData('cv_mod_fields',[id,width])
					_self.data.cv_mod_fields.set(id , width);
					_self.setData("width_prev_cvid",_self.data.cxPropCvid);//No I18n
				}.bind(this));
			}
			
			if(field[0].api_name === 'Tag'){
				$L.fastdom.measure(function(){
					var tagWidth = width + "px";//No I18N
					field[0].tagWidth = tagWidth;
					_self.reRenderTagComponent(_self.data.clip_mode, tagWidth);
					// _self.setHeight();
				});
			}
			_self.setData('last_pop_entity',"");//No I18N
			setTimeout(function(){
				if(!_self.data.clip_mode){
					// this.setHeight();
				}
			}.bind(this),0);
		},
		showDropbox:function(menu,event,originElem){
			if(event && event.target.classList.contains("cxLvAlphaSortEdit")){
				return false;
			}
			if(originElem){
				this.setData({'alphaDropBoxField': this.getFieldMeta( originElem.closest("lyte-exptable-th").id ).api_name,
				"showAlphaDropBox":true}) ;
			}

		},
		hideDropBox:function(){
			this.setData({'alphaDropBoxField':"",'showAlphaDropBox':false});
		},
		AlphasortRecord:function(value, event, element, menuOriginElem){
					_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

				// var module_id = this.data.cxPropModuleInfo.id;
				this.setData("cxPropSearchLetter",value);
				if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
					this.selectAllEntity(true);
				}
			var orgin_field = menuOriginElem ? this.getFieldMeta( menuOriginElem.closest("lyte-exptable-th").id ) : undefined;//No I18N
			value !== "All" ? this.setData("cxPropSearchField",orgin_field.api_name) : this.setData("cxPropSearchField",undefined);
			this.setData('fieldName',orgin_field.api_name);
			this.onDataLoad=false;
			this.setData("cxPropListViewContent",[]);
			this.onDataLoad=true;
			this.records=[];
			// store.unloadAll(this.data.cxPropModuleInfo.id);
			// this.setData('page',1);
			// this.setData('startIndex',0)
			this.getCount = true ;
			this.setData("show_loading",true) ;
			// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// this.setData({"custom_view":resp,'listfields':resp.fields})
				this.fetchRelatedRecords(1,0);
			// }.bind(this))
		},
		viewNavigate:function(from){
			var per_page = this.data.cxPropPerPage;
			var page = this.getData("cxPropPage");//no i18n
			page = from === "next" ? page + 1 : page - 1;//no i18n
			// this.setData("page", page);//no i18n
			
			if(this.getMethods("onListviewPaginate")){
				this.onPageNateCallback(page,per_page);
			}else{
				this.fetchRecords((page - 1) * per_page + 1,page,per_page) ;
			}
		},
		openDropdown:function(ev,value){
			if (Number(value) !== this.data.cxPropPerPage) {
				this.setData('cxPropPerPage', Number(value));
			}
			var page = this.data.startIndex > 1 ? Math.round(this.data.startIndex / Number(value) ) + 1 : 1;
			page = Number(value) * (page - 1) > this.data.startIndex ? page - 1 : page;
			var b = Number(value) * (page - 1) ;
			this.setData({'startIndex':b,'cxPropPage':page});
			if(this.getMethods("onListviewPaginate")){
				this.onPageNateCallback(page,this.data.cxPropPerPage);
			}else{
				this.fetchRecords(undefined,page,undefined) ;
			}
			
		},
		onBeforeDescMenuOpen : function(	menu ,event ,target_ele ){
			var parentWidthCheckList = 0;
			var lvFilterEle = $L('#lv_left_filter');
			var filterOuterWidth = lvFilterEle.outerWidth();
			var eventTar = $L(target_ele,this.$node);
			var {cxPropId,cxPropModuleInfo}=this.data;
			var menuElem = $L(`lyte-menu-box.LvDescMenuPopup_${cxPropId}`);
			var parentElementWidEle = eventTar.closest('.cxLvTextAreaElem');//No i18N
			var parentElemOffsetLeft = parentElementWidEle.offset().left;
			var parentWdithCheck = parentElementWidEle.outerWidth();
			this.setData("descDescription" , eventTar.closest('lyte-exptable-td')[0].innerText);//No I18N
			var elementTr = eventTar.closest('lyte-exptable-tr'); //No i18N
			var elementID = elementTr[0].id;
			var filterCheckWidth = cxPropModuleInfo.filter_status ? filterOuterWidth + 30 : 29;
			if(parentElemOffsetLeft < filterCheckWidth){
				parentWidthCheckList = parentWdithCheck - filterCheckWidth - Math.abs(parentElemOffsetLeft);
				if(parentWidthCheckList <= 400){
					parentWidthCheckList = 400;
				}
			}else {
				if(parentWdithCheck < 400) {
					parentWidthCheckList = 400;
				}else {
					parentWidthCheckList = parentWdithCheck;
				}
			}
			$L('#' + elementID).addClass('listTableHoverLabel');
			elementTr.addClass('listTableHoverLabel'); //No i18N
			menuElem.width(parentWidthCheckList);
			// $L('body').addClass('oH');
		},
		onHideDescMenu : function(ele,event){
			if(event.target.className === 'descCont' || event.target.className === 'descPre'){
				return false;
			}
			$L(`.LvDescMenuPopup_${this.data.cxPropId} .descCont`).scrollTo(0,0);
			$L('lyte-expresstable',this.$node).find('.listTableHoverLabel').removeClass('listTableHoverLabel'); //No i18N
			this.setData("descDescription" , "");//No I18N
			// $L('body').removeClass('oH');
		},	
		onDescMenuOpen : function (menu ,event ,target_ele){
			var {cxPropId,cxPropModuleInfo}=this.data;
			var lvFilterEle = $L('#lv_left_filter');
			var filterOuterWidth = lvFilterEle.outerWidth();
			var elemParent = $L(target_ele).closest('.cxLvTextAreaElem'),//No i18N
			winowWidth = $(document).outerWidth(),
			elemTargeOff = elemParent.offset(),
			menuElem = $L(`lyte-menu-box.LvDescMenuPopup_${cxPropId}`),
			offsetLef = elemTargeOff.left,
			menuTop = elemTargeOff.top,
			menuHeight = menuElem.outerHeight(),
			menuTopLayer = renderingUtils.windowOuterHeight - menuTop - 28;
			if(menuTopLayer < menuHeight){
				menuTop = menuTop + elemParent.outerHeight() - menuHeight;
			}
			var filterCheckWidth = cxPropModuleInfo.filter_status && filterOuterWidth && filterOuterWidth ? filterOuterWidth + 30 : 29;
			if(offsetLef < filterCheckWidth) {
				var remWid = offsetLef + elemParent.outerWidth();
				var forLeftVal = remWid - filterCheckWidth - 400;
				if(forLeftVal < 400 ){
					offsetLef = forLeftVal + filterCheckWidth;
				}else {
					offsetLef =  filterCheckWidth;
				}
			}
			var leftBal = winowWidth - offsetLef;
			if(leftBal < 400 ){
				offsetLef = offsetLef - (400 - leftBal);
			}
			menuElem.css({'top': menuTop - 1, 'left': offsetLef}); //No i18n
		}
	}
},{mixins : ["crux-mass-action-mixin"]});
// Lyte.Component.registerHelper('isActivitySplitNotDone', function(cxPropIsActivitySplitDone) {// no i18n
//     return !cxPropIsActivitySplitDone;
// });

Lyte.Component.registerHelper("cxGetActivityIcon", function(activityType){
	return activityType === "Events" ? "cxLvActEventIcon" : activityType === "Tasks" ? "cxLvActTaskIcon" : "cxLvActCallIcon";//No I18N
});
Lyte.Component.registerHelper("cxGetTagColor", function(date){
	//	var format = "MMM D, YYYY"; //NO I18N
	//	var formattedDate = Lyte.Transform.date.deserialize(date, format);
	//	return Utils.isToday(new Date(formattedDate)) ? "h_todaytask" : Utils.compareDates(new Date(), new Date(formattedDate)) ? "h_latertask" : "h_overdue"; //No I18n
		var month = date.split("-")[1];
		var year = new Date(date).getFullYear();
		var today = new Date();
		var day = date.split("-")[2];
		if(year > new Date().getFullYear()){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(year < new Date().getFullYear()){
			return "cxLvActOverdue"; //NO I18N
		}
		if(month > today.getMonth() + 1){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(month < today.getMonth() + 1){
			return "cxLvActOverdue"; //NO I18N
		}
		if(day > today.getDate()){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(day < today.getDate()){
			return "cxLvActOverdue"; //NO I18N
		}
		return "cxLvActTodayTask"; //NO I18N
	
	
});
Lyte.Component.registerHelper("cxGetDateInUsrLocaleFormat", function(date, isNew){
		if(isNew || !date){
			return date;
		}
		var mixin = Lyte.registeredMixins["crux-element-validation"];//No I18n
		var format = "MMM D, YYYY"; //NO I18N
		function deserialize(value, pattern){
			if(value && mixin.isValidDate.call(this,value,"yyyy-mm-dd")){
				value = value.replace(/[+-]\d{2}:\d{2}/,'');
				var res = /^(.*)T/.exec(value);
				if(res){
					value = res[1];
				}
				var formattedDate = mixin.getDateInUserDatePattern(mixin.getDateObjectFromString(value, "YYYY-MM-DD"), pattern ? pattern : Crm.userDetails.DATE_PATTERN);//No I18n
				if(formattedDate){
					var month = formattedDate.slice(0,3);
					return formattedDate.replace(month,_cruxUtils.getI18n(month));
				}
			}
			return value;
		};
		var formattedDate = deserialize.call(this.component,date, format);
		var sameYear = false;
		var year;
		if(date &&  mixin.isValidDate.call(this.component,date,"YYYY-MM-DD", undefined, true)){
			year = mixin.getDateObjectFromString(date, "YYYY-MM-DD").getFullYear();//No I18n
		}
		else{
			year = $L.moment(date).toDate().getFullYear();
		}
		if( year === $L.moment().toDate().getFullYear()) {
			 format = format.split(",")[0];
			 sameYear = true;
		 }
		 formattedDate = deserialize.call(this.component,date, format).toUpperCase();
		var month = date.split("-")[1];
		var today = new Date();
		if(formattedDate.split(" ")[1] == today.getDate() && sameYear && month == today.getMonth() + 1){ //eslint-disable-line eqeqeq
			return _cruxUtils.getI18n("crm.livedesk.pot.today");
		}
		return formattedDate;
});
Lyte.Component.registerHelper("cxIndexOf", function(str, sub, opr, value){ //No I18N
	if(str && sub){
		return Lyte.Component.registeredHelpers.cxCheckComparison(str.indexOf(sub), value, opr);
	}
	return false;
});
Lyte.Component.registerHelper("cxContains",function(str1, str2) {
	if (str1 && typeof str1 === "string") {
		str1 = str1.replace(/'/g, '"');
		str1 = JSON.parse(str1);
	}
	if (str1 && str1.includes(str2)) {
		return true;
	}
	return false;
});
// Lyte.Component.registerHelper("isVisitorOnline", function(module, record_id){//No I18n
// 	if(typeof CrmTracking === 'object'){
// 		return CrmTracking.isEntityOnline(module,record_id);
// 	}
// 	return false;
// });
// Lyte.Component.registerHelper("getDynamicArray", function() {//No I18n
// 	return Array.from(arguments); //eslint-disable-line @zoho/zstandard/no-reserved-words
// });
// Lyte.Component.registerHelper('getModuleNameByApiName', function(apiname) //NO I18N
// {
// 	var moduleInfo = Crm.moduleInfo;
// 	for(var key in moduleInfo){
// 		var moduleObj = moduleInfo[key];
// 		if(moduleObj.apiname === apiname){
// 			return key;
// 		}
// 	}
// 	return undefined;
// });
// Lyte.Component.registerHelper("getLink",function(route, dynamicParam, queryParam){//NO I18N
// 	return Lyte.Router.getURL({"route" : route, "dynamicParams" : dynamicParam, "queryParams" : queryParam });  //NO I18N
// });
Lyte.Component.registerHelper("cxGetCVPicklistStyleObj", function(fieldVal,fieldObj) { //NO i18n
	return getPicklistStyleObj(fieldVal,fieldObj.pick_list_values);
});
Lyte.Component.registerHelper('cxCheckComparison', function (param1, param2, operator) {
	switch (operator) {
		case ">=": if (param1 >= param2) { return true; } break;
		case "<=": if (param1 <= param2) { return true; } break;
		case ">": if (param1 > param2) { return true; } break;
		case "<": if (param1 < param2) { return true; } break;
		case "=": if (param1 === param2) { return true; } break;
		case "==": if (param1 == param2) { return true; } break; //eslint-disable-line eqeqeq
		case "!=": if (param1 != param2) { return true; } break; //eslint-disable-line eqeqeq
	}
	return false;
});
// Lyte.Component.registerHelper('isEngLocale', function() {//No I18N
// 	var userInfo = Crm.userDetails;
// 	if(Crm.userDetails.CLIENT_ACCOUNT)
// 	{
// 		return false;
// 	}
// 	else if(userInfo && (userInfo.LOCALE === 'en_US' || userInfo.LOCALE === 'en_GB'))
// 	{
// 		return true;
// 	}
// });
Lyte.Component.registerHelper("cxGetModuleDisplayName", function(isSingular, isFirstLetterCaps, i18nNeeded,cxPropGetModuleDisplayNameInActivities) { // NO I18N
	if(typeof crm !== undefined){
		return Crm.getModuleDisplayName(isSingular, isFirstLetterCaps, i18nNeeded);
	}
	return cxPropGetModuleDisplayNameInActivities;
});
Lyte.Component.registerHelper("cxGetTerritorityValue",function(value){ //no i18n
	var s = [];
	if(value){
		value.forEach(function(item){
			s.push(item.Name);
		});
		return s.join(', ');
	}
	return '';
});
Lyte.Component.registerHelper('cxGetSingularLabel', function(moduleSysName, moduleId) {
	if(!moduleSysName && moduleId) {
		moduleSysName = idModuleMapping[moduleId];
	}
	return  moduleRecordMapping && moduleRecordMapping[moduleSysName] ? moduleRecordMapping[moduleSysName].singular_label : "";
});
Lyte.Component.registerHelper("cxEncodeJS", (function(e) {
    return $ESAPI.encoder().encodeForJavaScript(e)
}))
/**
* @syntax nonYielded
<crux-list-view
cx-prop-cvid="" 
cx-prop-module="Leads"
cx-prop-module-record-mapping="{{recordMapping}}" 
cx-prop-record-count="5"   
cx-prop-is-link-to-not-supported="true"
cx-prop-module-record-mapping='{"Leads":{"api_name":"Leads","module_name":"Leads","id":"1837270000000000125","singular_label":"Lead","display_field":{"api_name":"Last_Name"},"plural_label":"Naveens","generated_type":"custom"},"Contacts":{"api_name":"Contacts","singular_label":"Contact"}}'
cx-prop-custom-view='{"module":{"api_name":"Leads","id":"1837270000000000125"},"id":"1837270000000091501","fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner"},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company"},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862"}]}' 
cx-prop-list-view-content='[{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170150","Company":"Company_0","First_Name":"First Name_0","Last_Name":"Last Name_0","Full_Name":"Full Name_0","Email":"Email_0","Phone":"Phone_0","Mobile":"Mobile_0","Lead_Status":"Lead Status_0"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170151","Company":"Company_1","First_Name":"First Name_1","Last_Name":"Last Name_1","Full_Name":"Full Name_1","Email":"Email_1","Phone":"Phone_1","Mobile":"Mobile_1","Lead_Status":"Lead Status_1"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170152","Company":"Company_2","First_Name":"First Name_2","Last_Name":"Last Name_2","Full_Name":"Full Name_2","Email":"Email_2","Phone":"Phone_2","Mobile":"Mobile_2","Lead_Status":"Lead Status_2"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170153","Company":"Company_3","First_Name":"First Name_3","Last_Name":"Last Name_3","Full_Name":"Full Name_3","Email":"Email_3","Phone":"Phone_3","Mobile":"Mobile_3","Lead_Status":"Lead Status_3"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170154","Company":"Company_4","First_Name":"First Name_4","Last_Name":"Last Name_4","Full_Name":"Full Name_4","Email":"Email_4","Phone":"Phone_4","Mobile":"Mobile_4","Lead_Status":"Lead Status_4"}]'
cx-prop-module-info='{"custom_view":{"display_value":"All Leads","created_time":null,"access_type":"public","wrap_text":true,"criteria":{"comparator":"equal","field":{"api_name":"$converted"},"value":false},"system_name":"ALLVIEWS","module":{"api_name":"Leads","id":"1837270000000000125"},"sort_by":null,"created_by":null,"shared_to":null,"default":true,"modified_time":"2024-03-11T15:35:32+05:30","name":"All Open Leads","system_defined":true,"modified_by":{"name":"Shaik Rafik","id":"1837270000000438001"},"id":"1837270000000091501","fields":[
{"webhook":true,"field_label":"Company","tooltip":null,"type":"used","field_read_only":false,"display_label":"Company","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002860","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Company","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":1,"quick_sequence_number":"1","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":null,"Deals":null,"Accounts":"Account_Name"},"length":100,"column_name":"COMPANY","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":true,"multiselectlookup":{},"auto_number":{},"list_display_label":"Company","cxPropResize":"enable","style":"","cxPropPinned":false,"cxTypeMapping":"text"},
{"webhook":true,"field_label":"First Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"First Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002862","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"First_Name","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":27,"quick_sequence_number":"2","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"First_Name","Deals":null,"Accounts":null},"length":40,"column_name":"FIRSTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{}},
{"webhook":true,"field_label":"Last Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"Last Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002864","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Last_Name","unique":{},"pick_list_values":[],"system_mandatory":true,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":127,"quick_sequence_number":"3","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"Last_Name","Deals":null,"Accounts":null},"length":80,"column_name":"LASTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":1,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{},"mandatory":true,"cxTypeMapping":"text","list_display_label":"Last Name","cxPropClass":"undefined cxLvAlphaSearchIncl","cxPropResize":"enable","style":"","cxPropPinned":false}],"category":"public_views","last_accessed_time":"2024-03-20T18:42:55+05:30","locked":false,"sort_order":null,"favorite":null,"module_default":{"api_name":"Leads","id":"1837270000000000125"}},"fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner","lookup":{}},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company","lookup":{}},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862","lookup":{}}],"display_field":{"id":"","api_name":"Owner"},"module_name":"Leads","lookup_field_properties":{"fields":[{"api_name":"Owner","id":"111111000000002858"},{"api_name":"Mobile","id":"111111000000002876"}]}}'  >
</crux-list-view>
 */
