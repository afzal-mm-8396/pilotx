/**
 * @component crux-lookup-component
 * @author anuja.manoharan
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-lookup-component", {
_template:"<template tag-name=\"crux-lookup-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{showEmptyValue}}\"><template case=\"true\"> {{cxPropEmptyValue}} </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> {{cruxMaskValue(concat(lookupValue,' - ',modulePluralLabel),cxPropMaskingProperties)}} </template><template case=\"false\"> {{cruxMaskValue(lookupValue,cxPropMaskingProperties)}} </template></template> </template><template case=\"false\"> <div class=\"cxLookupCompViewWrap\"> <link-to data-zcqa=\"{{cxPropZcqa}}\" lt-prop-route=\"{{cxPropRouteName}}\" lt-prop-dp=\"{{cxPropDynamicParams}}\" lt-prop-qp=\"{{cxPropQueryParams}}\" lt-prop-id=\"{{cxPropId}}\" lt-prop-td=\"{{cxPropTransitionData}}\" lt-prop-class=\"cxLink cxLookupViewWrapper\" class=\"cxLookupCompLink\" lt-prop-target=\"{{cxPropTarget}}\" onmousemove=\"{{action('showLookupBC',this,true)}}\" onmouseleave=\"{{action('showLookupBC',this)}}\" onclick=\"{{action('onLinkClick',event)}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIconClass,'&amp;&amp;',lookupValue),'&amp;&amp;',expHandlers(cxPropHideIconForView,'!'))}}\"><template case=\"true\"> <div class=\"cxLookupViewIcon {{cxPropIconClass}}\"></div> </template></template> <lyte-text lt-prop-value=\"{{lookupValue}}\" lt-prop-show=\"{{cxPropTooltipShow}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" class=\"cruxPreventClick {{if(cxPropViewClipLabel,'','cxLookupCompWsNormal')}}\"></lyte-text> </link-to> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;),'&amp;&amp;',modulePluralLabel)}}\"><template case=\"true\"><span class=\"cxLookupCompSeparator\">-</span><lyte-text class=\"cxLookupCompMulModValue\" lt-prop-value=\"{{modulePluralLabel}}\"></lyte-text></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </div> </template></template> </template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB vam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"{{elementClass}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxLookupComponent cxBoxWithRightIcon cxYieldObserverElemComp {{cxPropDivWrapperClass}} {{cxPropWrapperClass}} {{if(cxPropDisplayIconOnLeft,'cxBoxWithLeftIcon','')}}\"> <div class=\"cxBoxLeftContent\"> <template is=\"if\" value=\"{{expHandlers(cxPropPrefixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> <crux-dropdown data-zcqa=\"{{cxPropZcqa}}_module_dropdown\" cx-prop-icon-class=\"{{cxPropDropdownIconClass}}\" cx-prop-is-dropdown-icon-node=\"true\" class=\"cxMultiModuleDropdown {{if(ifEquals(modId,moduleDisabledList[0]),'cxDropdownLabelDisabled','')}}\" cx-prop-options=\"{{multiModuleModules}}\" cx-prop-user-value=\"plural_label\" cx-prop-system-value=\"id\" cx-prop-type=\"single\" on-option-select=\"{{method('multiModuleSelect')}}\" cx-prop-disabled-list=\"{{moduleDisabledList}}\" on-before-show=\"{{method('moduleDropdownBeforeShow')}}\" cx-prop-selected=\"{{modId}}\" cx-prop-disabled=\"{{cxPropReadonly}}\" on-show=\"{{moduleDropdownOnShow}}\" on-hide=\"{{moduleDropdownOnHide}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{cxPropAutocomplete}}\"><template case=\"true\"> <lyte-autocomplete lt-prop-dropdown-class=\"cxLookupDropbox cxDropbox\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-input=\"{&quot;prefixYield&quot;:{{cxPropPrefixYield}}, &quot;suffixYield&quot;:{{cxPropSuffixYield}}, &quot;class&quot;:&quot;cxLookupCompInputElem&quot;}\" lt-prop-trim=\"true\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-prevent-inside-click=\"true\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" on-select=\"{{method('autoComp')}}\" lt-prop-dropdown-height=\"250px\" lt-prop-yield=\"true\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-highlight=\"false\" lt-prop-min-length=\"{{cxPropMinLength}}\" lt-prop-value-set=\"true\" on-scroll=\"{{method('scrollRecord')}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" on-before-show=\"{{method('beforeShow')}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" class=\"{{cxPropClass}} {{if(isError,'cxErrorBox')}} {{if(negate(lookupSingle),'cxLookupNoValueSel','')}} {{if(showLoading,'cxLookupInputLoading')}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-error-class=\"noErrClass\" on-focus=\"{{method('autoFocus')}}\" lt-prop-external-search=\"true\" on-ext-search=\"{{method('beforeSearch')}}\" on-blur=\"{{method('onBlurInput')}}\" after-render=\"{{method('afterRenderAutocomplete')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" on-hide=\"{{method('onHideDropdown')}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-dropdown=\"{{dropdownProp}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" onfocusout=\"{{action('onFocusInput',true)}}\" onkeydown=\"{{action('onkeydownFn')}}\" lt-prop-open-on-focus=\"{{cxPropOpenOnFocus}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\" on-show=\"{{method('onShowDropdown')}}\"> <template is=\"registerYield\" yield-name=\"lyte-input-prefix\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> </template> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"{{cxPropBoxClass}}\"> <lyte-drop-body class=\"{{if(visible,'cxVisibleLookup')}}\"> <template is=\"if\" value=\"{{expHandlers(minimumSearchCharacter,'>',0)}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\"> {{cruxGetI18n('crm.chosen.minimum.input.text',minimumSearchCharacter)}} </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(initComp,'&amp;&amp;',expHandlers(ften.length,'>',0))}}\"><template case=\"true\"><template is=\"for\" items=\"{{ften}}\" item=\"val\" index=\"index\"> <lyte-drop-item data-value=\"{{val.id}}\" class=\"lookupSearchLi\" data-zcqa=\"{{val[displayField]}}\" onmouseenter=\"{{action('showHideIcon1',true,val)}}\" onmouseleave=\"{{action('showHideIcon1',false,val)}}\"> <lyte-autocomplete-label> <lyte-text class=\"cxLookupDropboxLabel\" lt-prop-value=\"{{val[displayField]}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropShowHideTooltip}}\"><template case=\"true\"> <span class=\"cxLookupInfoIcon {{if(val.cxPropShowIcon,'cruxLookupPopover')}}\" onmouseenter=\"{{action('infoPop',this,val,event)}}\" onmouseleave=\"{{action('infoPop',this,val,event)}}\" style=\"{{if(val.cxPropShowIcon,'visibility: visible;','visibility: hidden')}}\"></span> </template></template> </lyte-autocomplete-label> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(initComp,'&amp;&amp;',expHandlers(expHandlers(ften,'!'),'||',expHandlers(ften.length,'===',0)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{searchPerformed}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\">{{cruxGetI18n('crm.template.listview.search.no.results')}}</div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(minimumSearchCharacter,'>',0)}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\"> {{cruxGetI18n('crm.chosen.minimum.input.text',minimumSearchCharacter)}} </div> </template><template case=\"false\"> <div class=\"cxDropdownNoResult\">{{if(module.singular_label,cruxGetI18n('crm.krp.no.records.found',module.singular_label),cruxGetI18n('crm.template.listview.search.no.results'))}}</div> </template></template> </template></template> </template></template></template></template> </template></template> <template is=\"if\" value=\"{{showDropdownLoading}}\"><template case=\"true\"><div class=\"cxloaderWrapper\"> <span class=\"cxSpinloader\"></span> </div></template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-drop-footer><lyte-yield yield-name=\"footer\"></lyte-yield></lyte-drop-footer></template></template> </lyte-drop-box> </template> <template is=\"registerYield\" yield-name=\"lyte-input-suffix\"> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </template> </lyte-autocomplete> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'===',&quot;multi_module_multi_select&quot;)}}\"><template case=\"true\"> <div> <lyte-button lt-prop-class=\"cxMsmmLookupBtn\" data-zcqa=\"\" lt-prop-id=\"\" lt-prop-appearance=\"default\" onclick=\"{{action('showLookup')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{if(selectedRecsCount,selectedRecsCount,'Add')}} {{cxPropHeaderSuffix}}</template> </lyte-button> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropDisabled}}\"><template case=\"true\"> <lyte-input class=\"cxLookupCompDisabledInput\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" lt-prop-disabled=\"true\"></lyte-input> </template><template case=\"false\"> <lyte-input class=\"cxLookupCompReadonlyInput\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" lt-prop-readonly=\"true\" onclick=\"{{action('showLookup',event)}}\" lt-prop-id=\"{{cxPropInputId}}\" on-blur=\"{{method('onBlurCallback')}}\"></lyte-input> </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxBoxSpinWrapper cxFlexCenter\"> <span class=\"cxElementsLoaderBg\" id=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}_loadimg\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropAutocomplete,'&amp;&amp;',expHandlers(cxPropDisabled,'!')),'&amp;&amp;',expHandlers(cxPropReadonly,'!')),'&amp;&amp;',expHandlers(cxPropShowCloseIcon,'||',expHandlers(expHandlers(cxPropShowCloseIcon,'!'),'&amp;&amp;',lookupSingle)))}}\"><template case=\"true\"> <div class=\"cxBoxCloseIconWrap cxFlexCenter\"> <div id=\"Crm_lookup_img_Crm_{{cxPropModule}}_{{cxPropField.column_name}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" class=\"cxBoxCloseIcon cP {{cxPropClearIconClass}}\" onclick=\"{{action('clearlookupField')}}\" data-zcqa=\"lookup_Crm_{{cxPropModule}}_{{cxPropField.column_name}}_close\"></div> </div> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSuffixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropShowDisabledIcon,'!'),'&amp;&amp;',expHandlers(cxPropType,'!==',&quot;multi_module_multi_select&quot;))}}\"><template case=\"true\"> <div tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" class=\"cxLookupIcon cxBoxRightIcon cxFlexCenter cP {{cxPropRightIconClass}}\" onclick=\"{{action('showLookup',event)}}\" data-zcqa=\"{{if(cxPropImgZcqa,cxPropImgZcqa,concat('lookup_',cxPropZcqa))}}\" onkeydown=\"{{action('showLookupOnKeyEvent',event,this)}}\"> <div class=\"{{cxPropIconClass}}\" data-label=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}\" id=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}_img\" tabindex=\"{{cxPropField.tab_index}}\" lt-prop-title=\"{{cxPropIconTooltip}}\"></div> </div> </template></template> <template is=\"if\" value=\"{{renderLookup}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropAdvanceSearchEnabled}}\"><template case=\"true\"> <crux-lookup-filter-modal cx-prop-field-of-lookup-val=\"{{cxPropFieldOfLookupVal}}\" cx-prop-search-placeholder=\"{{cxPropSearchPlaceholder}}\" cx-prop-modal-wrapper-class=\"{{cxPropModalWrapperClass}}\" cx-prop-disable-search=\"{{cxPropDisableSearch}}\" cx-prop-parent-module=\"{{cxPropParentModule}}\" cx-prop-default-criteria=\"{{cxPropDefaultCriteria}}\" cx-prop-default-criteria-str=\"{{cxPropDefaultCriteriaStr}}\" module=\"{{lbind(module)}}\" show=\"{{cxPropShow}}\" disp-init=\"{{dispInit}}\" fetch-module-data=\"{{method('fetchModule')}}\" fetch-records=\"{{method('fetchRecordsData')}}\" mod-id=\"{{modId}}\" display-field=\"{{lbind(displayField)}}\" is-single=\"{{isSingle}}\" record=\"{{lbind(record)}}\" selected-single=\"{{selectedSingle.id}}\" selected-single-record=\"{{lbind(selectedSingle)}}\" lookup-single=\"{{lbind(lookupSingle)}}\" module-name=\"{{lbind(moduleName)}}\" on-value-change=\"{{method('triggerOnValueChange')}}\" cx-prop-value=\"{{cxPropValue}}\" render-lookup=\"{{lbind(renderLookup)}}\" fields-obj=\"{{moduledataUicomp}}\" cx-prop-create-yield=\"{{cxPropCreateYield}}\" temp-close=\"{{lbind(tempClose)}}\" id-index=\"{{idIndex}}\" cx-prop-related-id=\"{{cxPropRelatedId}}\" cx-prop-related-module-id=\"{{cxPropRelatedModuleId}}\" cx-prop-related-name=\"{{cxPropRelatedName}}\" cx-prop-dont-show-related-dropdown=\"{{cxPropDontShowRelatedDropdown}}\" cx-prop-field=\"{{moduledataUicomp}}\" cx-prop-return-full-object-on-get=\"{{cxPropReturnFullObjectOnGet}}\" cx-prop-default-fields=\"{{cxPropDefaultFields}}\" related-record-data=\"{{cxPropRelatedRecordData}}\" cx-prop-additional-params=\"{{cxPropAdditionalParams}}\" on-close=\"{{method('modalClosed')}}\" cx-prop-query-param=\"{{cxPropQueryParam}}\" is-related-record-passed=\"{{if(cxPropRelatedRecordData.length,true,false)}}\" before-request-change-data=\"{{method('changeDataMethod')}}\" cx-prop-all-fields-needed=\"{{cxPropAllFieldsNeeded}}\" cx-prop-profile-id=\"{{cxPropProfileId}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" on-module-get-success=\"{{method('moduleSuccess')}}\" cx-prop-show-all-fields=\"{{cxPropShowAllFields}}\"> <template is=\"yield\" yield-name=\"createYield\"><lyte-yield yield-name=\"createYield\"></lyte-yield></template> </crux-lookup-filter-modal> </template><template case=\"false\"> <crux-lookup-modal cx-prop-fetch-records-on-enter=\"{{cxPropFetchRecordsOnEnter}}\" cx-prop-search-format=\"{{cxPropSearchFormat}}\" module-data=\"{{moduleData}}\" cx-prop-disable-search=\"{{cxPropDisableSearch}}\" moduledata-uicomp=\"{{moduledataUicomp}}\" api-name=\"{{apiName}}\" query-param-object=\"{{lbind(queryParamObject)}}\" related-field-comp=\"{{lbind(relatedFieldComp)}}\" advanced-search=\"{{Crm.userDetails.isLookupAdvancedSearchEnabled}}\" column-list=\"{{Crm.userDetails.isLookupAdvancedSearchEnabled}}\" related-to=\"{{lbind(relatedTo)}}\" record=\"{{lbind(record)}}\" cx-prop-mod-id=\"{{modId}}\" disp-init=\"{{dispInit}}\" rendered-page=\"{{lbind(renderedPage)}}\" selected-single=\"{{selectedSingle.id}}\" selected-single-record=\"{{lbind(selectedSingle)}}\" display-field=\"{{lbind(displayField)}}\" is-single=\"{{isSingle}}\" cx-prop-field-type-mapping=\"{{uiTypeMapping}}\" cx-prop-related-record-data=\"{{cxPropRelatedRecordData}}\" lookup-single=\"{{lbind(lookupSingle)}}\" module-name=\"{{lbind(moduleName)}}\" module=\"{{lbind(module)}}\" cx-prop-per-page=\"10\" cx-prop-show=\"{{lbind(cxPropShow)}}\" rep-record=\"{{lbind(repRecord)}}\" fld-id=\"{{fldId}}\" relations=\"{{lbind(relations)}}\" fetch-module-data=\"{{method('fetchModule')}}\" cx-prop-value=\"{{modalCxValue}}\" fetch-records=\"{{method('fetchRecordsData')}}\" cx-prop-field=\"{{moduledataUicomp}}\" on-create-new=\"{{method('createNew')}}\" cx-prop-related-to=\"{{cxPropRelatedTo}}\" on-value-change=\"{{method('triggerOnValueChange')}}\" cx-prop-create-yield=\"{{cxPropCreateYield}}\" cx-prop-header=\"{{cxPropHeader}}\" meta-more-records=\"{{cxPropMetaMoreRecords}}\" cx-prop-fields=\"{{cxPropFields}}\" cx-prop-related-id=\"{{cxPropRelatedId}}\" cx-prop-related-module-id=\"{{cxPropRelatedModuleId}}\" cx-prop-related-name=\"{{cxPropRelatedName}}\" cx-prop-meta-more-records=\"{{cxPropMetaMoreRecords}}\" cx-prop-dont-show-related-dropdown=\"{{cxPropDontShowRelatedDropdown}}\" on-close=\"{{method('modalClosed')}}\" cx-prop-return-full-object-on-get=\"{{cxPropReturnFullObjectOnGet}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" cx-prop-query-param=\"{{cxPropQueryParam}}\" cx-prop-search-fields=\"{{cxPropSearchFields}}\" cx-prop-module-options=\"{{cxPropModuleOptions}}\" cx-prop-enable-customview=\"{{cxPropEnableCustomview}}\" cx-prop-header-suffix=\"{{cxPropHeaderSuffix}}\" cx-prop-additional-participants=\"{{cxPropAdditionalParticipants}}\" cx-prop-type=\"{{cxPropType}}\" cx-prop-enable-column-sort=\"{{cxPropEnableColumnSort}}\" cx-prop-assignee-module-name=\"{{cxPropAssigneeModuleName}}\" cx-prop-modal-property=\"{{stringify(cxPropModalProperty)}}\" on-assign=\"{{method('selectedConfirm')}}\" on-unassign-all=\"{{method('onUnassignAll')}}\" on-unassign=\"{{method('unassignRecords')}}\" before-request-change-data=\"{{method('changeDataMethod')}}\" fetch-total-count=\"{{method('fetchTotalCountFn')}}\" on-save-columns=\"{{method('onSaveColumnsFn')}}\" on-apply-filter=\"{{method('onApplyFilterFn')}}\" on-clear-filter=\"{{method('onClearFilterFn')}}\"> <template is=\"yield\" yield-name=\"createYield\"><lyte-yield yield-name=\"createYield\"></lyte-yield></template> </crux-lookup-modal> </template></template></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-lookup-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-error-unescape-arguments=\"{{cxPropErrorUnescapeArguments}}\" cx-prop-id=\"{{cxPropId}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template><template case=\"filter\"></template><template case=\"criteria\"> <div class=\"cxLookupMultiModuleWrap\"> <template is=\"if\" value=\"{{expHandlers(cxPropHideTextComponent,'!')}}\"><template case=\"true\"> <crux-text-component id=\"lookupTextComponent\" cx-prop-from=\"criteria\" on-value-change=\"{{method('changeValue')}}\" cx-prop-login-user=\"{{cxPropShowLoggedInUser}}\" on-error=\"{{method('textError')}}\" cx-prop-value=\"{{lookupValue}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-field=\"{{cxPropField}}\"></crux-text-component> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-lookup-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{negate(cxPropHideTextComponent)}}\"><template case=\"true\"><span class=\"cxMMLSeperator\">{{cruxGetI18n('crm.label.simply.in')}}</span></template></template> <crux-dropdown class=\"cxMultiModuleCriteriaDropdown\" cx-prop-options=\"{{multiModuleModules}}\" cx-prop-user-value=\"plural_label\" cx-prop-system-value=\"id\" cx-prop-type=\"single\" on-option-select=\"{{method('multiModuleSelect')}}\" cx-prop-disabled-list=\"{{moduleDisabledList}}\" cx-prop-selected=\"{{modId}}\" on-show=\"{{moduleDropdownOnShow}}\" on-hide=\"{{moduleDropdownOnHide}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-error-unescape-arguments=\"{{cxPropErrorUnescapeArguments}}\" cx-prop-id=\"{{cxPropId}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1,1]},{"type":"if","position":[3,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,1,3]},{"type":"if","position":[3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,1,5]},{"type":"if","position":[3,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["val.cxPropShowIcon","'visibility: visible;'","'visibility: hidden'"]}}}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,1,7]},{"type":"if","position":[3,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,1,9]},{"type":"if","position":[3,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,1,11]},{"type":"if","position":[3,1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","lyteViewPort","cxPropDefaultCriteria","cxPropFieldOfLookupVal","cxPropParentModule","cxPropModule","cxPropValue","cxPropRouteName","cxPropZcqa","cxPropDynamicParams","cxPropQueryParams","cxPropTransitionData","cxPropModalWrapperClass","cxPropIconClass","cxPropId","cxPropFrom","cxPropEmptyValue","lookupSingle","cxPropAutofocus","cxPropTabindex","cxPropTabIndex","cxPropDisabled","cxPropPlaceholder","cxPropReadonly","cxPropToggle","cxPropField","cxPropFieldKey","cxPropLabelClass","cxPropAdvanceSearchEnabled","lookupCreateRecord","initComp","ften","records","apiName","cxPropClass","cxPropMaxlength","displayField","modulenameUicomp","columnName","renderLookup","moduleData","moduledataUicomp","queryParamObject","relatedFieldComp","relatedTo","record","modId","dispInit","renderedPage","selectedSingle","isSingle","uiTypeMapping","moduleName","show","repRecord","fldId","relations","module","value","cxPropTarget","cxPropCreateYield","cxPropRelatedTo","lyteUnbound","cxPropAutocomplete","cxPropFetchRecordsOnEnter","cxPropAppearance","isError","cxPropErrorMessage","cxPropShowHideTooltip","cxPropClearErrorMessage","cxPropTooltip","cxPropImagePath","cxPropMetaMoreRecords","cxPropIconTooltip","showEmptyValue","cxPropErrorYield","cxPropHeader","cxPropFields","visible","cxPropInfoTooltip","cxPropImgZcqa","lookupValue","cxPropShowBc","lookupId","cxPropFooterYield","cxPropRecordImageSrc","cxPropAria","cxPropAriaButton","cxPropAriaBody","cxPropAriaBox","cxPropPopoverWrapperClass","cxPropMaskingProperties","tooltip","cxPropRelatedId","cxPropRelatedModuleId","cxPropRelatedName","cxPropRelatedRecordData","cxPropShowCloseIcon","cxPropTooltipConfig","cxPropTooltipClass","cxPropHideIconForView","cxPropDontShowRelatedDropdown","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","searchPerformed","cxPropErrorClass","cxPropInputId","showLoading","cxPropErrorSpanClass","cxPropClearIconClass","cxPropPreventParentScroll","cxPropRightIconClass","cxPropWrapperClass","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropReturnFullObjectOnGet","cxPropDefaultFields","cxPropDisplayIconOnLeft","cxPropMandatory","cxPropType","modulePluralLabel","multiModuleModules","moduleDisabledList","cxPropDisabledList","cxPropAllFieldsNeeded","cxPropTooltipShow","cxPropQueryParam","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropPreventFocusOnError","cxPropSearchFormat","cxPropSearchFields","cxPropCallAllowed","cxPropShowImageInBc","cxPropBcZcqa","cxPropMinLength","cxPropOpenOnFocus","cxPropBoxClass","cxPropTransition","cxPropOffset","cxPropCurrentModuleSingularLabel","cxPropInputValue","cxPropDetailRoute","cxPropFieldTypeMappingSelector","cxPropModalProperty","cxPropLookupProperties","cxPropModuleNameSelector","cxPropLookupUitypeComparator","cxPropFetchModuleData","cxPropFetchRecords","cxPropHoverCallback","cxPropPrefixYield","cxPropDropdown","cxPropShowAllFields","cxPropNoResultMessage","cxPropForcedFetchBc","cxPropPerpage","cxPropButtonYield","cxPropNoResultMessage","cxPropUpdateDelay","cxPropCallbackDelay","cxPropShowLookupPopupFields","cxPropRenderAutoCompleteInCriteria","cxPropMinimumCharactersForSearch","minimumSearchCharacter","selectedIds","cxPropAriaErrorProperties","cxPropModuleOptions","cxPropBoundary","cxPropDropdownIconClass","cxPropMultiModuleSelectId","cxPropSearchPlaceholder","cxPropDisableSearch","dropdownProp","cxPropSearchValue","cxPropHeaderSuffix","selectedRecsCount","cxPropEnableCustomview","cxPropAdditionalParticipants","cxPropTotalCount","modalCxValue","cxPropShow","cxPropProfileId","cxPropViewClipLabel","cxPropDivWrapperClass","cxPropSuffixYield","cxPropHideTextComponent","cxPropDefaultCriteriaStr","elementClass"],
_observedAttributesType :["object","object","boolean","boolean","array","array","string","string","string","string","string","string","string","string","string","string","string","string","string","string","boolean","string","string","boolean","string","boolean","boolean","object","string","string","boolean","object","boolean","array","array","string","string","number","string","string","string","boolean","object","object","object","array","object","array","string","boolean","number","object","boolean","object","string","boolean","array","string","array","object","object","string","boolean","object","boolean","boolean","boolean","string","boolean","string","boolean","boolean","string","string","string","string","boolean","boolean","string","array","boolean","string","string","string","boolean","string","boolean","string","boolean","object","object","object","string","object","string","string","string","string","array","boolean","string","string","boolean","boolean","string","string","boolean","string","string","boolean","string","string","boolean","string","string","string","boolean","boolean","string","boolean","object","boolean","boolean","string","string","array","array","array","boolean","boolean","object","string","boolean","string","string","object","string","string","boolean","boolean","array","boolean","boolean","string","number","boolean","string","object","object","string","string","string","string","object","object","string","object","boolean","boolean","boolean","boolean","object","boolean","string","boolean","number","boolean","string","number","number","boolean","boolean","number","number","string","object","array","object","string","string","string","boolean","string","string","string","number","boolean","boolean","number","string","boolean","string","boolean","string","boolean","boolean","string","string"],
//No I18n
	data : function(){
		return {
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property used to send multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * If its true, Hover card will be show instead of tooltip.
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author anuja.manoharan
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * Set to true to render component on viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			cxPropDefaultCriteria : Lyte.attr('array',{'default': []}),//NO I18N
			cxPropFieldOfLookupVal : Lyte.attr('array',{'default': []}),//NO I18N
			cxPropParentModule : Lyte.attr("string", {'default': ''}),//no i18n
			/**
			 * Lookup field module name
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 */
			cxPropModule : Lyte.attr('string'), //no i18n
			/**
			 * The value to be preset to the lookup field
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * When using type view, this will define the route to be triggered on click
			 * @componentProperty { string } cxPropRouteName
			 * @author anuja.manoharan
			 */
			cxPropRouteName : Lyte.attr("string"),//No I18n
			/**
			 * zcqa added for lookup component.
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this determines the dynamic params to be passed to the transition triggered on click
			 * @componentProperty { string } cxPropDynamicParams
			 * @author anuja.manoharan
			 */
			cxPropDynamicParams : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this determines the query params to be passed to the transition on click
			 * @componentProperty { string } cxPropQueryParams
			 * @author anuja.manoharan
			 */
			cxPropQueryParams : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this data determines the transition data to be passed to the transition on click
			 * @componentProperty { string } cxPropTransitionData
			 * @author anuja.manoharan
			 */
			cxPropTransitionData : Lyte.attr("string"),//No I18n
			/**
			 * To display an icon in view and create type, pass the class that contains the icon background url and position.
			 * @componentProperty { string } cxPropIconClass
			 * @author anuja.manoharan
			 */
			cxPropModalWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * wrapper for lookup filter
			 * @componentProperty { string } cxPropModalWrapperClass
			 * @author mahalakshmi.m
			 */
			cxPropIconClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets id to the child element
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * To determine what the element has to be displayed or where it is to be used
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			lookupSingle :  Lyte.attr("string",{default:'', hideAttr:true}),// No I18n
			/**
			 * Autofocus applied for lyte-autocomplete
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 */
			cxPropAutofocus : Lyte.attr("boolean"),//no i18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 */
			cxPropTabindex : Lyte.attr("string"),//no i18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 */
			cxPropTabIndex : Lyte.attr("string" , {default : '0'}),//no i18n
			/**
			 * his property disables input. lyteInputDisabled class will be added to lyte-input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The text thats needs to be displayed as placeholder if value is not present
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * When this is to true, the autocomplete will be opened on render
			 * @componentProperty { boolean } cxPropToggle=false
			 * @author anuja.manoharan
			 */
			cxPropToggle : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The field details that would contain info like field label, mandatory etc.
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 */
			cxPropField: Lyte.attr("object", {"default": {}, hideAttr : true}), //NO I18n
			/**
			 * If you want to display the input box along with a label, you need to pass the property in cxPropField that will be the label.
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * If you are displaying the field label you can pass a class to it as well
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * If it's true, We'll enable the filters.
			 * @componentProperty { boolean } cxPropAdvanceSearchEnabled=false
			 * @author anuja.manoharan
			 */
			cxPropAdvanceSearchEnabled : Lyte.attr("boolean",{default : typeof Crm !== 'undefined' ? Crm.userDetails.isLookupAdvancedSearchEnabled : false}),//No I18n
		    lookupCreateRecord : Lyte.attr("object", {default : {}}),//No I18n
		    initComp : Lyte.attr("boolean", {default : false}),//No i18n
		    ften : Lyte.attr("array", []),//No i18n
		    records : Lyte.attr("array", {default : []}),//No I18n
		    apiName : Lyte.attr('string'),//no i18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//no i18n
			/**
			 * Sets maximum length for the element
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 */
			cxPropMaxlength : Lyte.attr("number" , {default : 120}),//no i18n
			displayField : Lyte.attr("string",{default:'', hideAttr:true}), //no i18n
			modulenameUicomp : Lyte.attr("string"),//no i18n
			columnName : Lyte.attr("string"),//no i18n
			renderLookup : Lyte.attr("boolean",{"default":false}),//no i18n
			moduleData : Lyte.attr("object"),//no i18n
			moduledataUicomp : Lyte.attr("object"),//no i18n
			queryParamObject : Lyte.attr("object",{default:{}}),// No I18n
			relatedFieldComp : Lyte.attr("array",{default:[]}),// No I18n
			relatedTo : Lyte.attr("object",{default:{}}),// No I18n
			record : Lyte.attr("array",{default:[]}),// No I18n
			modId : Lyte.attr("string",{default:""}),// No I18n
			dispInit : Lyte.attr("boolean",{"default":false}),//no i18n
			renderedPage : Lyte.attr("number",{default:1}),//No I18n
			selectedSingle :  Lyte.attr("object",{default:{}}),// No I18n
			isSingle : Lyte.attr("boolean"),//no i18n
			uiTypeMapping : Lyte.attr('object', {default : (typeof crmConstants != "undefined" && crmConstants.defaultUiTypeToCruxMapping) ? crmConstants.defaultUiTypeToCruxMapping : {}}),//no i18n //do not change its name as it is being used in crm
			moduleName : Lyte.attr("string",{default:""}) ,// No I18n
			show : Lyte.attr('boolean',{default:false}), //no i18n
			repRecord : Lyte.attr("array",{default:[]}),// No I18n
			fldId : Lyte.attr("string"),//no i18n
			relations : Lyte.attr("array",{default : []}), //No I18n
			module : Lyte.attr("object", {default : {}}),//no i18n
			value : Lyte.attr("object", {default : {}}),// No I18n
			/**
			 * When type is view, this will be set to the target attribute mentioning where you want to open the new url
			 * @componentProperty { string } cxPropTarget
			 * @author anuja.manoharan
			 */
			cxPropTarget : Lyte.attr("string", {default : "_self"}),//no i18n
			/**
			 * Set this property to true if you want to display and handle a create button in your lookup modal
			 * @componentProperty { boolean } cxPropCreateYield=false
			 * @author anuja.manoharan
			 */
			cxPropCreateYield : Lyte.attr("boolean"),//no i18n
			/**
			 * @componentProperty { object } cxPropRelatedTo
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRelatedTo : Lyte.attr("object"),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * Enables native autocomplete property for input
			 * @componentProperty { boolean } cxPropAutocomplete=false
			 * @author anuja.manoharan
			 */
			cxPropAutocomplete : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * By default a search request will be made whenever user types a value in the modal, but when this property is set to true, request will be made only when they press enter.
			 * @componentProperty { boolean } cxPropFetchRecordsOnEnter=false
			 * @author anuja.manoharan
			 */
			cxPropFetchRecordsOnEnter : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the element
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 */
			cxPropAppearance : Lyte.attr("string", {default : "box"}),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * In the autocomplete, a tooltip is shown for all options on hover of which its corresponding business card is displayed. You can hide this icon by setting this property to false
			 * @componentProperty { boolean } cxPropShowHideTooltip=false
			 * @author anuja.manoharan
			 */
			cxPropShowHideTooltip : Lyte.attr("boolean", {default : true}),//No i18n
			/**
			 * This property determines if the error message should be cleared on change.
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}), //No i18n
			/**
			 * To display a tooltip in the input
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			cxPropImagePath : Lyte.attr("string", {default : "/crm/CRMClient/images"}),//No I18n
			/**
			 * This property is used to dertemine whether there are more records after the last search result. Fetch on scroll and display of navigation icons is done based on this.
			 * @componentProperty { string } cxPropMetaMoreRecords
			 * @author anuja.manoharan
			 */
			cxPropMetaMoreRecords : Lyte.attr("string", {default : "more_records"}),//No I18n
			/**
			 * This Tooltip will to set the lookup icon.
			 * @componentProperty { string } cxPropIconTooltip
			 * @author anuja.manoharan
			 */
			cxPropIconTooltip : Lyte.attr("string"),//NO i18n
			showEmptyValue : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * You can choose to display your own error message using yield
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * The header message to be displayed in the modal
			 * @componentProperty { string } cxPropHeader
			 * @author anuja.manoharan
			 */
			cxPropHeader : Lyte.attr("string"),//No I18n
			/**
			 * The set of fields to be displayed in the modal table headers.
			 * @componentProperty { array } cxPropFields
			 * @author anuja.manoharan
			 */
			cxPropFields : Lyte.attr("array"),//No I18n
			visible : Lyte.attr("boolean", {default : false}), //No I18N
			/**
			 * You can set an info icon with a tooltip next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * The zcqa to be set to the image icon
			 * @componentProperty { string } cxPropImgZcqa
			 * @author anuja.manoharan
			 */
			cxPropImgZcqa : Lyte.attr("string"), //no i18n
			lookupValue : Lyte.attr("string"),//no i18n
			/**
			 * If it's true, We'll show the business card of the record.
			 * @componentProperty { boolean } cxPropShowBc=false
			 * @author anuja.manoharan
			 */
			cxPropShowBc : Lyte.attr("boolean", {default : false}),//no i18n
			lookupId : Lyte.attr("string"),//no i18n
			/**
			 * Set this to true if you want to display a footer message to your autocomplete dropdown
			 * @componentProperty { boolean } cxPropShowBc=false
			 * @author anuja.manoharan
			 */
			cxPropFooterYield : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropRecordImageSrc : Lyte.attr("string"),//No I18n
			/**
			 * To set custom attributes to input
			 * @componentProperty { boolean } cxPropAria=false
			 * @author mariswaran.sv
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaButton
			 * @author mariswaran.sv
			 */
			cxPropAriaButton : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaBody
			 * @author mariswaran.sv
			 */
			cxPropAriaBody : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaBox
			 * @author mariswaran.sv
			 */
			cxPropAriaBox : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * This Wrapper class applied for the business card popover.
			 * @componentProperty { string } cxPropPopoverWrapperClass
			 * @author anuja.manoharan
			 */
			cxPropPopoverWrapperClass: Lyte.attr("string", {default: ""}),   //NO I18N
			/**
			 * You can choose to mask the value of the element by passing this property
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			tooltip : Lyte.attr("string"),//No I18n
			/**
			 * Let's say Accounts and Contacts are related, i.e. in a form when I have selected a Contact I wish to see only its related Accounts in my lookup modal, I will pass the id of the selected Contact
			 * @componentProperty { string } cxPropRelatedId
			 * @author anuja.manoharan
			 */
			cxPropRelatedId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedModuleId
			 * @author anuja.manoharan
			 */
			cxPropRelatedModuleId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedName
			 * @author anuja.manoharan
			 */
			cxPropRelatedName : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropRelatedRecordData
			 * @author anuja.manoharan
			 */
			cxPropRelatedRecordData : Lyte.attr('array',{'default': []}),//NO I18N
			/**
			 * The clear icon will be displayed when this property is set to true
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author anuja.manoharan
			 */
			cxPropShowCloseIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Configurations for tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "bottom"}'}),//No I18n
			/**
			 * Same class will be added for tooltip created
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 */
			cxPropTooltipClass : Lyte.attr("string", {default : "cxTooltip"}),//No I18n
			/**
			 * When set to true, icon will be hidden for view only
			 * @componentProperty { boolean } cxPropHideIconForView=false
			 * @author anuja.manoharan
			 */
			cxPropHideIconForView : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * If it's true, We'll hide the related module dropdown
			 * @componentProperty { boolean } cxPropDontShowRelatedDropdown=false
			 * @author anuja.manoharan
			 */
			cxPropDontShowRelatedDropdown : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * You can set a prefix to the zcqa
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * You can set a suffix to the zcqa
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			searchPerformed : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This class will be added while show the error message.
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets the ID for the input.
			 * @componentProperty { string } cxPropInputId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputId : Lyte.attr("string", {default : "inputId"}),//No I18n
			showLoading : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This class will be added for the span while show the error message.
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Clear icon class for the input
			 * @componentProperty { string } cxPropClearIconClass
			 * @author anuja.manoharan
			 */
			cxPropClearIconClass : Lyte.attr("string"),//No i18n
			/**
			 * Disables scroll of all scrollable parents of the dropdown(only parents).
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author anuja.manoharan
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRightIconClass : Lyte.attr("string"),//No I18n
			/**
			 * It will be added for parent div of the inputs.
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Info tooltip show/hide property.
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * disabled icon in right side of the input
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * disable icon class
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * If its true, The component will return the full object in the onValue change callback.
			 * @componentProperty { boolean } cxPropReturnFullObjectOnGet=false
			 * @author anuja.manoharan
			 */
			cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropDefaultFields
			 * @author anuja.manoharan
			 */
			cxPropDefaultFields : Lyte.attr("object", {default : {}}),//NO I18N
			/**
			 * @componentProperty { boolean } cxPropDisplayIconOnLeft=false
			 * @author anuja.manoharan
			 */
			cxPropDisplayIconOnLeft : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * There is three types of lookup component single, multiple and multi_module_lookup.
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 */
			cxPropType : Lyte.attr("string"), //no i18n
			modulePluralLabel : Lyte.attr("string"), //no i18n
			multiModuleModules : Lyte.attr('array',{default : []}), //no i18n
			moduleDisabledList : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * We can't select the given lists. Those records will disabled.
			 * @componentProperty { array } cxPropDisabledList
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledList : Lyte.attr("array",{default : []}),
			/**
			 * @componentProperty { boolean } cxPropAllFieldsNeeded=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAllFieldsNeeded : Lyte.attr("boolean", {default : false}),
			/**
			 * Tooltip show hide property in view type.
			 * @componentProperty { boolean } cxPropTooltipShow=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipShow : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * This queryparam used for fetching the records.
			 * @componentProperty { object } cxPropQueryParam
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropQueryParam : Lyte.attr("object"),
			/**
			 * Warning message displayed below element.
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * Set to true to display warning message below element
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce( In this case you can take current value from inner 'input' tag ) or else it will get updated in blur event
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropDataTabindex
			 * @author mariswaran.sv
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropMandatoryOption
			 * @author mariswaran.sv
			 */
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			/**
			 * @componentProperty { string } cxPropMandatoryType
			 * @author mariswaran.sv
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			/**
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author cxPropErrorIconClass
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set to true to prevent focus on error
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Using this property to set a filter format of search criteria. If its true, the criteria will be "starts_with" or else it will be "contains"
			 * @componentProperty { boolean } cxPropSearchFormat=false
			 * @author anuja.manoharan
			 */
			cxPropSearchFormat : Lyte.attr('boolean',{default : false}),
			/**
			 * We have search the records based on this fields.
			 * @componentProperty { array } cxPropSearchFields
			 * @author anuja.manoharan
			 */
			cxPropSearchFields : Lyte.attr("array", {default : []}),
			/**
			 * This property is used to enable call icon
			 * @componentProperty { boolean } cxPropShowImageInBc=false
			 * @author anuja.manoharan
			 */
			cxPropCallAllowed: Lyte.attr("boolean", {default : true}),
			/**
			 * Showing the record image in business card.
			 * @componentProperty { boolean } cxPropShowImageInBc=false
			 * @author anuja.manoharan
			 */
			cxPropShowImageInBc : Lyte.attr("boolean", {default : true}),
			/**
			 * This zcqa added for business card popover.
			 * @componentProperty { string } cxPropBcZcqa
			 * @author anuja.manoharan
			 */
			cxPropBcZcqa: Lyte.attr("string",{default:"cxBcPopup"}),
			/**
			 * Minimum value of the input length
			 * @componentProperty { number } cxPropMinLength
			 * @author anuja.manoharan
			 */
			cxPropMinLength : Lyte.attr("number", {default : 0}),
			/**
			 * Focus the input on opening the dropdown.
			 * @componentProperty { boolean } cxPropOpenOnFocus=false
			 * @author anuja.manoharan
			 */
			cxPropOpenOnFocus : Lyte.attr("boolean", {default : false}),
			/**
			 * This class will be added for lyte-dropdown in dropbox.
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 */
			cxPropBoxClass : Lyte.attr("string"),
			cxPropTransition : Lyte.attr('object',{"default":{"animation":"slideFromTop","duration":"0.5"}}), //NO I18n
			// /**
			//  * You can set the all lookup modal properties using this property.
			//  * @componentProperty { object } cxPropLookupModalProperties
			//  * @author anuja.manoharan
			//  */
			// cxPropLookupModalProperties : Lyte.attr("object",{"default" : {}}), //NO I18N
			cxPropOffset :  Lyte.attr('object',{"default":{"top" : "0", "left" : "center"}}), //NO I18n
			cxPropCurrentModuleSingularLabel : Lyte.attr("string"), //no i18n
			cxPropInputValue			:	Lyte.attr("string"), //no i18n
			cxPropDetailRoute			:	Lyte.attr("string" , {default : "crm.tab.module.entity.detail"}),//No I18n
			/**
			 * field type mapping selector
			 * @componentProperty { string } cxPropFieldTypeMappingSelector='ui_type'
			 * @author anuja.manoharan
			 */
			cxPropFieldTypeMappingSelector : Lyte.attr("string",{"default" : 'ui_type'}), //no i18n
			/**
			 * You can set the all lookup modal properties using this property.
			 * @componentProperty { object } cxPropModalProperty
			 * @author anuja.manoharan
			 */
			cxPropModalProperty : Lyte.attr("object"),//NO I18N
			cxPropLookupProperties : Lyte.attr("object"),//NO I18N
			cxPropModuleNameSelector : Lyte.attr("string", {default : "module_name"}),//NO I18N
			cxPropLookupUitypeComparator : Lyte.attr("object"),
			cxPropFetchModuleData : Lyte.attr("boolean", {default : false}),
			cxPropFetchRecords : Lyte.attr("boolean", {default : false}),
			/**
			 * If its true, We'll give the callback for on hover of business card popover.
			 * @componentProperty { object } cxPropModalProperty
			 * @author anuja.manoharan
			 */
			cxPropHoverCallback : Lyte.attr("boolean"),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropDropdown : Lyte.attr("object" , {default : {}}),
			
			cxPropShowAllFields: Lyte.attr("boolean", {default : false}),
			cxPropNoResultMessage : Lyte.attr("string"),
			cxPropForcedFetchBc: Lyte.attr("boolean", {default : false}),
			cxPropPerpage : Lyte.attr("number", {default : 10}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * This message will be shown while no values present in the dropdown/modal.
			 * @componentProperty { string } cxPropNoResultMessage
			 * @author anuja.manoharan
			 */
			cxPropNoResultMessage : Lyte.attr("string"),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			cxPropShowLookupPopupFields:Lyte.attr("boolean",{default:false}),
			cxPropRenderAutoCompleteInCriteria : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropMinimumCharactersForSearch : Lyte.attr('number'),
			minimumSearchCharacter : Lyte.attr('number',{default : 0}), //no i18n
			selectedIds : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropModuleOptions : Lyte.attr("array"),
			cxPropBoundary: Lyte.attr('object'),
			/**
			 * It will be added for dropdown icon class.
			 * @componentProperty { string } cxPropDropdownIconClass
			 * @author manikaraja.p
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropDropdownIconClass : Lyte.attr("string" , {default : 'dropdown'}),
			/**
			 * This module id shown for default selected module in the multi module case, If the cxPropValue not passed.
			 * @componentProperty { string } cxPropMultiModuleSelectId
			 * @author manikaraja.p
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropMultiModuleSelectId : Lyte.attr("string"),
			cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
			cxPropDisableSearch : Lyte.attr("boolean",{default:false}),
			dropdownProp :  Lyte.attr("string"),
			cxPropSearchValue : Lyte.attr("string"),
			cxPropHeaderSuffix :  Lyte.attr("string" ,  {default : 'Participants'}),
			selectedRecsCount : Lyte.attr("number"),
			cxPropEnableCustomview : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropAdditionalParticipants : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropTotalCount :  Lyte.attr("number"),
			modalCxValue :  Lyte.attr("string"),
			cxPropShow : Lyte.attr('boolean',{default : false}), //no iI8n
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			cxPropViewClipLabel : Lyte.attr("boolean",{default:true}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropHideTextComponent : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropDefaultCriteriaStr : Lyte.attr('string'), //no i18n
			elementClass : Lyte.attr("string") 
		}
	},
	init : function()
	{
		// this.data.cxPropDropdown.preventParentScroll = this.data.cxPropPreventParentScroll; //lt-prop-dropdown='{"preventParentScroll" : "{{cxPropPreventParentScroll}}"}' in lyte-autocomplete
		this.lookupModalName = this.getData('cxPropAdvanceSearchEnabled') ? "crux-lookup-filter-modal" : "crux-lookup-modal";//No I18n
		this._modalOpened = false;
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		if(this.data.cxPropField && this.data.cxPropField.module){
			var modSingLabel = this.data.cxPropField.module[0].singular_label;
			this.setData('cxPropAssigneeModuleName' , modSingLabel);
		}
		var field = this.data.cxPropField;
		if(field && field.data_type){
			let data_type = field.data_type , type;
			switch (data_type) {
				case "multiselectlookup":
					type = "multiple";
					this.setData({"cxPropAutocomplete" : false , "cxPropAdvanceSearchEnabled" : false}); //No I18n
					break;
				case "multiselect_multimodule_lookup":
					type = "multi_module_multi_select";
					this.setData({"cxPropAutocomplete" : false , "cxPropAdvanceSearchEnabled" : false}); //No I18n
					break;
				case "multi_module_lookup":
					type = "multi_module_lookup";
					break;
				default:
					type = "single";
					break;
			}
			if(!this.data.cxPropType){
				this.setData('cxPropType' , type);
			}
		}
		if(this.data.cxPropDefaultCriteriaStr){
			this.data.cxPropSearchFormat = true;
		}
		// if(this.data.cxPropRelatedId){
		// 	let criteria = {'field' : {api_name : this.getRelatedFieldApiName()} , 'comparator' : 'equals' , 'value' : this.data.cxPropRelatedId};
		// 	this.relatedRecCriteria = this.data.cxPropSearchFormat ? this.formatCriteriaForSearchAPI(criteria) : criteria;
		// }
		if(this.data.cxPropDefaultCriteria && this.data.cxPropSearchFormat){
			this.defaultCriteria = this.formatCriteriaForSearchAPI(this.data.cxPropDefaultCriteria[0]);
		}
		let defCri = this.joinSearchApiCriteria(this.relatedRecCriteria, this.defaultCriteria);
		if(defCri){ //if no default criteria, There is empty string set in the filters key, same value returning while fetching records.
			this.data.queryParamObject.filters = this.initialCriteria = defCri; 
		}
		this.lookupModalName = this.data.cxPropAdvanceSearchEnabled ? "crux-lookup-filter-modal" : "crux-lookup-modal";//No I18n
		if(this.data.cxPropViewClipLabel === false){
			this.setData('cxPropTooltipShow' , false);
		}
	},
	lookupModalName : "",
	methods : {
		autoComp : function(value){
			this.selection = true;
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			var ften = this.getData('ften'),disp=this.getData('displayField') //no i18n
			var l = ften.length,val
			for(var i=0;i<l;i++){
				if(ften[i].id=== value){
					this.setData('selectedSingle',ften[i]) ;  //no i18n
					this.setData('ften',ften[i]) ;  //no i18n
					if(disp==='Full_Name'){
						val = (ften[i].First_Name)?ften[i].First_Name+' '+ften[i].Last_Name:ften[i].Last_Name
					}else{
						val = ften[i][disp]
					}
					this.setData('lookupSingle',val)//no i18n
					this.setData("cxPropValue", {id : ften[i].id, name : val});
					// this.setData("cxPropValue", ften[i]);
					if(this.data.cxPropClearErrorMessage){
						this.setData("cxPropErrorMessage", "");//No I18n
					}
					if(this.getMethods("onValueChange")){
						if(this.data.cxPropReturnFullObjectOnGet){
							var rec = ften[i];
							rec.name = rec.name ? rec.name : val;
							/**
							 * Triggered when value is changed via autocomplete dropdown or lookup modal
							 * @method onValueChange
							 * @author anuja.manoharan
							 * @version 1.0.0
							 * @param { * } rec
							 */
							this.executeMethod("onValueChange", rec);
						}else{
							this.executeMethod("onValueChange", this.data.cxPropValue);
						}
						// this.executeMethod("onValueChange", this.data.cxPropReturnFullObjectOnGet ? ften[i] : this.getData("cxPropValue"));
					}
					// this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
					this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxInputFocused");//No I18n
					break;
				}
			}
		},
		beforeSearch : function(val, elem, event){
			if(event.type && !this.data.cxPropDisableSearch){
				var val=val.trim();//No I18n
				if(this.data.cxPropMinimumCharactersForSearch && val.length < this.data.cxPropMinimumCharactersForSearch){
					this.setData('minimumSearchCharacter',this.data.cxPropMinimumCharactersForSearch - val.length);
					return;
				}
				this.setData('minimumSearchCharacter',0);
				
				this.setData("showLoading", true);//No I18n
				if(["Backspace","Meta"].indexOf(event.key) > -1 && this.search){
					this.search=false
				}
				var initRecs = this.getData('record');//no i18n
				if(val === ''){
					this.setData('selectedSingle',{})//no i18n
					this.setData('lookupSingle','')//no i18n
					this.setData('selectedSingleId','')//no i18n
					this.setData("cxPropValue", undefined)//No i18n
					this.$node.querySelector('lyte-autocomplete').ltProp('selected','')//no i18n
					this.setData("cxPropShowCloseIcon", false);//No I18n
				}
				else{
				    this.setData("cxPropShowCloseIcon", true);//No I18n
				}
				if(!this.search){
					var _this = this;
					// clearTimeout(this.typeTimeout)
					// this.typeTimeout = setTimeout(function(){
						if( val === "" || val !== this.data.cxPropSearchValue){
							_this.setData("showLoading", true);//No I18n
							_this.onSearchFun(val, undefined, elem.getData("ltPropSelected"));//No I18n
						}
					// }, 200);
				}else{
					this.setData("showLoading", false);//No I18n
				}
				this.setData("cxPropSearchValue" , val);
			}
		},
		scrollRecord : function(event){
			if(!this.noMoreScroll ){
				var recs= this.getData('ften'),  Obj = this.getData('queryParamObject'); //No I18n
				var scrollElem = (event.target && event.target.tagName === 'LYTE-DROP-BODY')? event.target : null; //No I18n
				Obj.page=Math.ceil(recs.length/10)
				Obj.per_page = this.data.cxPropPerpage;
				this.scrollRequest(this,Obj,scrollElem,recs,false)
			}
		},
		beforeShow : function(event,ddelem){
			var ret;
			if(this.getMethods('onBeforeDropdownOpen')){
				/**
				 * It will trigger,  Before open the dropdown.
				 * @method onBeforeDropdownOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 */
				ret = this.executeMethod('onBeforeDropdownOpen',event);
			}
			if(this.data.cxPropReadonly || ret === false || this.manualFocus){
				this.manualFocus = false;
				return false;
			}
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.setData("visible", true);//No I18n
			this.setData("showLoading", true);//No I18n
			this.initFromField=true;
			this.setData('minimumSearchCharacter',this.data.cxPropMinimumCharactersForSearch);
			if (rightBoxIcon) {
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
			return new Promise( function (res,rej){
				this._initRes = res;
				this._initRej = rej;
				this.lookupInit(this,this.getData('modId'),false,event,ddelem)//No I18n
			}.bind(this))
		},
		autoFocus : function(ev, autocomp){
            // var autocompDropbox = $L(autocomp).find('lyte-dropdown')[0].component.getDropBox();    // ltPropBoxButtonWidth(min-button) Will handle the width.
            // var lookupWidth = $L('lyte-dropdown',this.$node).width()
            // autocompDropbox.style.width = lookupWidth + 'px';
			this.inputFocused = true;
			if(this.manualFocus){
				return;
			}
            this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
            this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");		//No I18n
		},
		fetchModule : function(modId){
			/**
			 * module data fetch callback
			 * @method fetchModuleData
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @param { * } modId
			 */
			return this.executeMethod("fetchModuleData", modId);//no i18n
		},
	    fetchRecordsData : function(modId, obj){
			var _this = this;
			/**
			 * records fetching callback
			 * @method fetchRecords
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @param { * } modId
			 * @param { * } obj
			 */
			return this.executeMethod("fetchRecords", modId, obj).then(function(res){//no i18n
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				return res;
			}, function(rej){
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				_this.setData("renderLookup", false)//no i18n
				return rej;
			});
		},
		createNew : function(){
			/**
			 * It will trigger, while clicking the create new button.
			 * @method onCreateNew
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			this.executeMethod("onCreateNew");//no i18n
		},
		triggerOnValueChange : function(value){
			value.name = value.name ? value.name : value.displayName;
			this.setData("cxPropValue", value);// No I18n
			if(this.data.cxPropReturnFullObjectOnGet){
				this.setData('selectedSingle' , value);
			}
			this._modalOpened = false;
			if($.prototype.effect){
				$(this.$node.querySelector("input")).effect("highlight",{},1000);//no i18n
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				/**
				 * riggered when value is changed via autocomplete dropdown or lookup modal
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } value
				 */
				this.executeMethod("onValueChange", value);// No I18n
			}
			// this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
			setTimeout(function(){
				if(this.data.cxPropOpenOnFocus){
					this.manualFocus = true;
				}
				this.$node.querySelector(".cxLookupComponent lyte-autocomplete").focus();
			}.bind(this), 20)
		},
		onBlurInput : function(ev, auto){
			this.$node.querySelector(".cxLookupComponent").classList.remove("cxBoxDropdownOpened");//No I18n
			setTimeout(function(){
				if(this.selection && this.getData("cxPropClearErrorMessage")){
					this.setData("cxPropErrorMessage", "");//No I18n
				}
				var autoComp = this.$node.querySelector("lyte-autocomplete");
				if(autoComp && autoComp.querySelector("input").value === ""){
					this.setData("cxPropValue", undefined);//No I18n
					this.setData({selectedSingle : {}, lookupSingle : undefined});
				// 	if(this.getMethods("onValueChange")){
				// 		this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
				// 	}
				}
				this.selection = false;
			}.bind(this), 100);
			this.inputFocused = false;
			if(this.getMethods("onBlur")){
				/**
				 * It will trigger for input on blur
				 * @method onBlur
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onBlur", ev, this.$node); //No I18n
			}
			return true;
		},
		afterRenderAutocomplete : function(){
			if(  !this.$node.querySelector("lyte-input") ){
				return;
			}
			if(this.getData("cxPropAppearance") == "box"){
				this.$node.querySelector("lyte-input").classList.add("cxBoxInput");//No I18n
			}
		},
	    hideInfoTooltip: function() {
				this.showHideInfoTooltip();
	    },
	    onHideDropdown : function(ev, drop){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.setData("visible", false);//No I18n
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
			if(this.getMethods("onHide")){
				/**
				 * This callback is fired when the dropdown is hidden
				 * @method onHide
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } ev
				 * @param { * } drop
				 */
				this.executeMethod("onHide", ev, drop);
			}
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, ev, drop);
			}
	    },
	    modalClosed : function(){
	    	this._modalOpened = false;var lookupIcon;
			if(this.data.cxPropType === "multi_module_multi_select"){
				lookupIcon = this.$node.querySelector('.cxMsmmLookupBtn');
			}else{
				lookupIcon = this.$node.querySelector('.cxLookupIcon');
			}
			// lookupIcon.contentEditable = true;
			lookupIcon.focus();
			// lookupIcon.contentEditable = false;
	    },
	    multiModuleSelect : function(event,id){
			if(this.data.modId == id){
				return;
			}
	    	this.setData('module',moduleRecordMapping[idModuleMapping[id]]);
	    	this.setData({'modId' : id , 'cxPropMultiModuleSelectId' : id});
	    	this.setData('cxPropModule',this.data.module.module_name);
	    	if(this.data.cxPropFrom == 'criteria'){
	    		if(this.getMethods("onValueChange")){
					/**
					 * Triggered when value is changed via autocomplete dropdown or lookup modal
					 * @method onValueChange
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
					this.executeMethod("onValueChange", this.getValue());// No I18n
				}
	    	}else{
	    		if(this.getMethods('onModuleSelect')){
					/**
					 * Triggered while select the module in multi module lookup
					 * @method onModuleSelect
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
		    		this.executeMethod('onModuleSelect',this.data.module)
		    	}
		    	this.clear(true);
	    	}

	    },
	    moduleDropdownBeforeShow : function(){
	    	return !this.data.showLoading;
	    },
		moduleDropdownOnShow: function(){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
		},
		moduleDropdownOnHide: function(){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
		},
	    textError : function(error,component){
	    	if(this.getMethods("onError")){
				/**
				 * Triggered when there is an error on validation
				 * @method onError
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } error
				 * @param { * } component
				 */
				this.executeMethod("onError", error, component);//No I18n
			}
	    },
	    changeValue : function(){
	    	if(this.getMethods("onValueChange")){
				/**
				 * Triggered when value is changed via autocomplete dropdown or lookup modal
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onValueChange", this.getValue());// No I18n
			}
	    },
	    changeDataMethod : function(query, customData){
	    	if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", query, customData, this.data.cxPropField)
	    	}
	    },
		selectedConfirm : function(selected){
			// var cxValue = this.data.cxPropValue ? JSON.parse(this.data.cxPropValue) : [];
			this.setValueForMultiSelect(selected);
			// this.unassignRecs = unassignRecs;
			if(this.getMethods("onAssign")){
				this.executeMethod("onAssign" , selected , this.$node); // No I18n
			}
		},
		// unassignRecords : function(unassignRecordIds){
		// 	var cxValue = JSON.parse(this.data.cxPropValue) , len = cxValue.length , ind , _self = this , api_name = this.data.cxPropField.api_name;
		// 	var resetValues =  function(){
		// 		unassignRecordIds.forEach(function(id){
		// 			ind = cxValue.findIndex(x => x[api_name].id === id);
		// 			if(ind !== -1){
		// 				cxValue.splice(ind , 1);
		// 			}
		// 		})
		// 		var stringified = JSON.stringify(cxValue);
		// 		_self.setData("cxPropValue" , stringified);
		// 		if(_self.getMethods("onValueChange")){
		// 			_self.executeMethod("onValueChange", stringified);// No I18n
		// 		}
		// 	}
		// 	if(this.getMethods("onUnassign")){
		// 		var ret = this.executeMethod("onUnassign" , unassignRecordIds , this.$node);
		// 		if(ret && ret.then){
		// 			return ret.then(function(){
		// 				resetValues();
		// 			})
		// 		}else{
		// 			resetValues();
		// 		}
		// 	}else{
		// 		resetValues();
		// 	}

		// },
		onUnassignAll : function(unassignRecs){
			this.unassignRecs = unassignRecs;
			// this.setData("cxPropValue" , "");
		},
		 onShowDropdown : function(ev, drop){
	    	if(this.getMethods('onShow')){
				this.executeMethod('onShow',ev, drop);
			}
	    },
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		moduleSuccess : function(res){
			if(this.getMethods("onModuleGetSuccess")){
				this.executeMethod("onModuleGetSuccess" , res);
			}
		},
		fetchTotalCountFn : function(modId, cvid){
			if(this.getMethods('fetchTotalCount')){
				return this.executeMethod('fetchTotalCount', modId, cvid , this.$node);
			}
		},
		onSaveColumnsFn : function(fields, cvid , modId){
			if(this.getMethods('onSaveColumns')){
				return this.executeMethod('onSaveColumns',fields, cvid , modId);
			}
		},
		onApplyFilterFn : function(){
			if(this.getMethods('onApplyFilter')){
				this.executeMethod('onApplyFilter' , this.$node);
			}
		},
		onClearFilterFn : function(){
			if(this.getMethods('onClearFilter')){
				this.executeMethod('onClearFilter' , this.$node);
			}
		}

	},
	actions : {
		onLinkClick : function(event){
			if(this.getMethods('onLookupLinkClicked')){
				var ret = this.executeMethod('onLookupLinkClicked',event, this, this.data.cxPropField);
				if(ret == false){
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
			}
			if(typeof cruxAssets != "undefined" && cruxAssets.cxLookupElementLinkClicked){
				cruxAssets.cxLookupElementLinkClicked(event)
			}
		},
		onkeydownFn : function(){
			if(this.data.cxPropDisableSearch){
				event.preventDefault();
			}
		},
		infoPop : function(elem,val,event){
			var ele = document.getElementById("cruxLookupPopover");
			if(event.type == "mouseenter"){
				this.entered = true;
				// elem.classList.add("cruxLookupPopover");//no i18n
				if(!ele){
					ele = Lyte.Component.render("crux-lookup-popup", {id : "cruxLookupPopover", fieldMapping : this.getData("uiTypeMapping"), cxPropPopoverWrapperClass : this.data.cxPropPopoverWrapperClass,cxPropCallAllowed:this.data.cxPropCallAllowed}, "body");
				}
				ele.setData({module : this.getData("module"), data : val,show : true})				//no i18n
			}
			else{
				this.entered = false;
				// elem.classList.remove("cruxLookupPopover");//no i18n
				ele.setData("show", false);//no i18n
			}
		},
		clearlookupField:function(){
			this.setData("searchPerformed", false);
			this.clear(true);
		},
		showLookup : function(event){
			this._modalOpened = true;
			if(!this.getData("cxPropDisabled") && !this.data.cxPropReadonly){
				if(this.getMethods("onShowLookup")){
					/**
					 * Triggered on click of lookup icon. Used for rendering own logic instead of default lookup modal
					 * @method onShowLookup
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } event
					 */
					this.executeMethod("onShowLookup",event)//No I18n
				}
				else{
					this.showLookupFunc(this)
				}
		// 		if(event){
		// _cruxUtils.addMurhyInfo("crux-lookup-component.js", "Feb Default Changes");
		// 			event.stopPropagation()
		// 		}
			}
		},
		showLookupOnKeyEvent : function(event, comp){
			if(event.key === ' '){
				event.preventDefault();
				comp.click();
			}
		},
		showHideIcon1 : function(show, record){
			if(!this.entered){
				Lyte.objectUtils(record, "add", "cxPropShowIcon", show);	//No I18n
			}
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    	showLookupBC : function(elem,show){
    		var check = true;
				if(this.getMethods('onBeforeShowBusinessCard')){
					/**
					 * Triggered before show the business card
					 * @method onBeforeShowBusinessCard
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
					check = this.executeMethod('onBeforeShowBusinessCard',this.data.lookupId,this.data.cxPropModule);
				}
				if(!this.data.cxPropShowBc || !check){
					return;
				}
				var popover = document.querySelector("crux-lookup-view-popup");//no i18n
				if(show){
					elem.classList.add("cxLookupBc");//no i18n
					if(popover){
						popover.setData({field : this.data.cxPropField, entityId : this.data.lookupId, cxPropTypeMapping : this.data.uiTypeMapping,
							module : this.data.cxPropModule, cxPropShowImage : this.data.cxPropShowImageInBc,cxPropCallAllowed:this.data.cxPropCallAllowed,cxPropBcZcqa:this.data.cxPropBcZcqa,cxPropHoverCallback : this.data.cxPropHoverCallback==undefined?true:this.data.cxPropHoverCallback,lookupComp:elem,cxPropForcedFetch:this.data.cxPropForcedFetchBc,cxPropRouteName:this.data.cxPropRouteName,cxPropDynamicParams:this.data.cxPropDynamicParams,cxPropQueryParams:this.data.cxPropQueryParams,cxPropTransitionData:this.data.cxPropTransitionData,cxPropTarget:this.data.cxPropTarget});
					}
					else{
						popover = Lyte.Component.render("crux-lookup-view-popup", {field : this.data.cxPropField, entityId : this.data.lookupId, cxPropTypeMapping : this.data.uiTypeMapping,
						module : this.data.cxPropModule, cxPropShowImage : this.data.cxPropShowImageInBc,cxPropCallAllowed:this.data.cxPropCallAllowed,cxPropBcZcqa:this.data.cxPropBcZcqa,cxPropHoverCallback : this.data.cxPropHoverCallback==undefined?true:this.data.cxPropHoverCallback,lookupComp:elem,cxPropForcedFetch:this.data.cxPropForcedFetchBc,cxPropRouteName:this.data.cxPropRouteName,cxPropDynamicParams:this.data.cxPropDynamicParams,cxPropQueryParams:this.data.cxPropQueryParams,cxPropTransitionData:this.data.cxPropTransitionData,cxPropTarget:this.data.cxPropTarget}, ".cxLookupBc"); //no i18n
					}
					var _self = this;
					if(this.getMethods("onLookupHoverFetchBcData")){
						popover.setMethods({
							onLookupHoverFetchBcDataPopup : function(modId, recId){
								return _self.executeMethod("onLookupHoverFetchBcData", modId, recId);
							}
						})
					}
					if(this.getMethods("onLookupLinkClicked")){
						popover.setMethods({
							onLookupLinkClickedPopup : function(event,comp,field){
								return _self.executeMethod("onLookupLinkClicked", event,comp,field);
							}
						});
					}
					if(this.data.cxPropRecordImageSrc){
						popover.setData("cxPropRecordImageSrc", this.data.cxPropRecordImageSrc);
					}
					popover.setData("show", true);
				}
				else{
					if(popover){
						popover.setData("show", false);//no i18n
					}
				}
    	},
    	stopPropagation : function(){
    		this.stopPropagation();
    	},
    	onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if(onfocus){
				this.setData("showLoading" , false);
				rightIconBox.classList.remove("cxBoxInputFocused");//No I18n
			} else if (this.data.cxPropPrefixYield){
				rightIconBox.classList.add("cxBoxInputFocused"); //No I18n
			}
		},
	},
	setValueForMultiSelect : function(records){
		var field = this.data.cxPropField , i , api_name = this.data.cxPropType === "multi_module_multi_select" ? field.multiselect_multimodule_lookup.connectedMML_apiname : field.api_name;
		var cxValue = this.data.cxPropValue , len = records.length , assigned = [] , unassigned = [];
		var selectedArr = cxValue ? JSON.parse(cxValue) : [];
		for(i = 0 ; i < len ; i++){
			if(records[i]._delete === null){
				unassigned.push(records[i]);
			}else{
				assigned.push(records[i]);
			}
		}
		var assignLen = assigned.length , unassignLen = unassigned.length , newAssigned = [] , newUnassigned = [] , ind;
		for(i = 0 ; i < assignLen ; i++){
			ind = selectedArr.findIndex(x => x[api_name].id === assigned[i].id);
			if(ind === -1){
				if(this.data.cxPropType === "multiple"){
					newAssigned.push({[api_name] : assigned[i]});
				}else{
					newAssigned.push({[api_name] : assigned[i] , 'id' : field.id });
				}
			}
		}
		for(i = 0 ; i < unassignLen ; i++){
			ind = selectedArr.findIndex(x => x[api_name].id === unassigned[i].id);
			if(ind !== -1){
				newUnassigned.push(unassigned[i]);
			}
		}
		var result = newAssigned.concat(newUnassigned);
		var stringified = result.length ? JSON.stringify(result) : "";
		this.cxValue = stringified;
		this.modalCxValue = assigned;
		this.setData("selectedRecsCount",assigned.length);
		this.setData("cxPropValue" , stringified);
		if(this.getMethods("onValueChange")){
			this.executeMethod("onValueChange", stringified);// No I18n
		}
	},
	observeDropdownProp : function(){
		var obj = {preventParentScroll : this.data.cxPropPreventParentScroll , boxButtonWidth : "min-button" , disabledList : this.data.cxPropDisabledList , placeholder : "For autocomplete selection remove"};
		this.setData('dropdownProp' , JSON.stringify(obj));
	}.observes('cxPropDisabledList.[]' , 'cxPropPreventParentScroll').on('init'),
	ftenToRecord : function(){
		if( !this.initial ){
			this.setData('ften',this.getData('record'));//no i18n
			this.initial=true;
		}
		if(this.getData("cxPropMetaMoreRecords") && this.getData("record").$ && (this.getData("record").$[this.getData("cxPropMetaMoreRecords")] == false || (this.getData("record").$.meta && this.getData("record").$.meta[this.getData("cxPropMetaMoreRecords")] == false))){
			this.noMoreScroll = true;
		}
		else{
			this.noMoreScroll = false
		}
	}.observes('record'),// No I18n
	ftenTorepRecord : function(){
		this.noMoreScroll = false
	}.observes('repRecord'),// No I18n
	saveAndAssocRec : function(){
		this.$node.classList.remove('currentLookupModal') //no i18n
		this.saveNewRecord(this)
	}.observes('save','newCreatedid'),// No I18n
	observeSelectedId : function(){
		var moduleData = this.getData('moduledataUicomp') //no i18n
		var _this=this,id=this.getData('selectedSingleId'),module=this.getData('module'),newLookupcreated=this.getData('newLookupcreated'); //no i18n
		moduleData.selectedId = id
		moduleData.lookupSingle = this.getData('lookupSingle')//no i18n
		this.setData('moduledataUicomp',moduleData)//no i18n
		if(newLookupcreated){//no i18n
			var modName = moduleData.lookup.module.id;
			if(modName){
				if(!module.id && moduleData.module.id !== modName){
					store.findRecord('module',modName).then(function(res){//no i18n
						_this.setData({'module':res[0],'moduleName':res[0].module_name,'displayField':res[0].display_field.api_name})//no i18n
						_this.setSelectedId(modName,id)
					})
				}else if(module.id || moduleData.module.id === modName){
					_this.setData({'module':moduleData.module[0],'moduleName':moduleData.module[0].module_name,'displayField':moduleData.module[0].display_field.api_name}) //no i18n
					_this.setSelectedId(modName,id)
				}
			}
		}
	}.observes('selectedSingleId'), // no i18n
	singleValueSet : function(){
		var moduledataUicomp=this.getData('moduledataUicomp'),comp=this.getData('relatedFieldComp');//no i18n
		moduledataUicomp.selectedId = this.getData('selectedSingle').id//No I18n
		moduledataUicomp.lookupSingle = this.getData('lookupSingle')//no i18n
		this.setData('moduledataUicomp',moduledataUicomp)//no i18n
	}.observes('selectedSingle'),//no i18n
	beforeShowFunc : function(event,ddelem,bool,resolveBefore){
		var _this=this, prom , val = this.$node.querySelector("lyte-autocomplete").ltProp('value');  //no i18n
		val = val === undefined ? val : val.trim();
		if(!val){
			var Obj = this.data.queryParamObject || {};
			Obj.page = 1;
			Obj.per_page = this.data.cxPropPerpage;
			if(this.data.cxPropQueryParam){
				for(var key in this.data.cxPropQueryParam){
					Obj[key] = this.data.cxPropQueryParam[key];
				}
			}
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			let qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", this.data.module.id, qp);
			}else{
				prom = this.fetchRecords(this.data.module.id , qp);
			}
			return Lyte.resolvePromises(prom).then(function(recs){ //no i18n
				recs = (recs && recs.length)?recs:[];
				// _this.noMoreScroll = false;
				_this.setData({'record':recs,'ften':recs,'queryParamObject':Obj})// No I18n
				_this.setData("showLoading", false);//No I18n
				if(!_this._modalOpened && _this.inputFocused){
					_this.setData('initComp',true)//no i18n
					_this.$node.querySelector(":not(crux-dropdown) > lyte-dropdown").open();//No I18n
					if(_this._initRes){
						_this._initRes()
					}
					if(resolveBefore){
						resolveBefore()
					}
				}else if(_this._initRej){
				    _this._initRej();
				}
			}, function(errRes){
				//rejected
				_this.initFromField=false;
				_this.setData("showLoading", false);//No I18n
				if(_this._initRej){
				    _this._initRej();
				}
				if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		}else{
			this.setData('initComp',true)//no i18n
		this.onSearchFun(val,resolveBefore, ddelem.data.ltPropSelected || this.data.value ? this.data.value.id : "");
		}
	},
	showLookupFunc : function(elem,lookup){
		if(this.getMethods("onBeforeShowLookup")){
			/**
			 * It will trigger before show the lookup dropdown.
			 * @method onBeforeShowLookup
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			var res = this.executeMethod("onBeforeShowLookup");
			if(res == false){
				return false;
			}
		}
	    if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(true);
		}
		if(this.selectedIds){
			this.setData('selectedIds', this.selectedIds); // Prevent the binding call to lookup modal using cxProValue observes
		}
		if(!lookup &&!this.getData('renderLookup')){ //no i18n
			if(elem.getData('moduledataUicomp').data_type==='lookup'){//no i18n
				elem.setData('isSingle',true)//no i18n
			}else{
				elem.setData('isSingle',false)//no i18n
			}
			elem.setData('renderLookup',true)//no i18n
			elem.setData('dispInit',true); //no i18n
			elem.setData('cxPropShow',true); //no i18n
		}
		else{
			elem.setData({ 'modalCxValue' : this.modalCxValue && this.modalCxValue.length ? JSON.stringify(this.modalCxValue) : "" , 'cxPropShow' : true }); //no i18n
			var elem=(lookup)?elem:this.$node.querySelector(this.lookupModalName).component,isSingle=elem.data.isSingle;//module=elem.data.module,api=module.module_name,id = module.id ;
				if(isSingle){
					elem.records = [];
					// elem.getRecs();
					elem.lookupInit(elem, elem.getData("modId"), true);//No I18n
					// var Obj={page:1,per_page:10} //no i18n
				}
		}
	},
	onSearchFun : function(val,resolveBefore, id){
		var disp = this.getData('displayField') , prom ,Obj = this.data.queryParamObject || {}, _this = this;//no i18n
		/*
		var lookupSingle=this.getData('lookupSingle'),sel = this.getData('selectedSingle'); //no i18n
		if(disp==='Full_Name' && lookupSingle === sel[disp]){
			val = (sel.First_Name)?sel.First_Name+' '+sel.Last_Name:sel.Last_Name
		}*/
		let searchFormat = this.data.cxPropSearchFormat;
		if(val){
			let searchCri = this.constructSearchFilter(disp, val,(this.data.module && this.data.module.display_field) ? store.peekRecord('field',this.data.module.display_field.id) : disp ? store.peekAll("field").filterBy({api_name : disp})[0] : undefined,searchFormat);
			if(this.initialCriteria){
				if(searchFormat){
					Obj.filters = this.joinSearchApiCriteria(this.initialCriteria, searchCri); // No I18n
				}else{
					Obj.filters = {group : [this.initialCriteria , searchCri] , group_operator : "AND"};
				}
			}else{
				Obj.filters = searchCri;
			}
		}else if(this.initialCriteria){
			Obj.filters = this.initialCriteria;
		}else{
			delete Obj.filters;
		}
		Obj.page = 1;
		Obj.per_page = this.data.cxPropPerpage;
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				Obj[key] = this.data.cxPropQueryParam[key];
			}
		}
		if(!disp){
			this.lookupInit(this,this.data.cxPropType=="multi_module_lookup" ? this.data.modId : this.getData('moduledataUicomp').lookup.module.id,false,undefined,this)//No I18n
		}
		else{
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			let qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", this.getData("modId"), qp);
			}else{
				prom = this.fetchRecords(this.getData("modId"), qp);
			}
			Lyte.resolvePromises(prom).then(function(recs){ //No I18n
				_this.setData("searchPerformed", true);//no i18n
				var _val = _this.$node.querySelector("input").value , dropdownComp = _this.$node.querySelector("lyte-dropdown").component , dList = _this.data.cxPropDisabledList;//No I18n
				var dropChildComp = dropdownComp.childComp;
				if(val === "" || val &&  _val !== ""){
					_this.setData({'ften':recs,'queryParamObject':Obj}) //no i18n
					if(_this.getData("cxPropMetaMoreRecords") && _this.getData("record").$ && (_this.getData("record").$[_this.getData("cxPropMetaMoreRecords")] == false || (_this.getData("record").$.meta && _this.getData("record").$.meta[_this.getData("cxPropMetaMoreRecords")] == false))){
						_this.noMoreScroll = true;
					}
					else{
						_this.noMoreScroll = false;
					}
					if(dropdownComp && dList && dList.length){
						dropdownComp.setData('ltPropDisabledList' , []);
						dropdownComp.setData('ltPropDisabledList' , dList);
					}
					recs=(recs)?recs:[]
					// if(!recs.length){
					// 	_this.search=true
					// }
					if(resolveBefore){
						resolveBefore()
					}
					if(_this._initRes && _this.inputFocused){
						_this._initRes()
					}else if(_this._initRej){
				   	 	_this._initRej();
					}
					_this.setData("showLoading", false);//No I18n
					if(!_this._modalOpened && _this.inputFocused){
						_this.$node.querySelector(":not(crux-dropdown) > lyte-dropdown").open();//No I18n
					}
					if(_val != val){
						_this.$node.querySelector("lyte-autocomplete").setValue(_val);//No I18n
					}
					if(val == ""){
						_this.setData("searchPerformed", false);
					}
					if(dropChildComp){
						let elem = dropChildComp.querySelector("[data-value='"+id+"']");
						if(elem){
							elem.setAttribute("selected", true);//No I18n
						}
					}
				}
			}, function(errRes){
			   _this.setData("showLoading", false);//No I18n
			   if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			    if(_this._initRej){
					_this._initRej()
				}
			})
		}
	},
	scrollRequest : function(_this,Obj,scrollElem,record,lookup){
		if((!_this.scrl) &&(scrollElem.scrollTop + scrollElem.offsetHeight >= scrollElem.scrollHeight-10)){
			Obj.page += 1;
			Obj.per_page = this.data.cxPropPerpage;
			if(this.data.cxPropQueryParam){
				for(var key in this.data.cxPropQueryParam){
					Obj[key] = this.data.cxPropQueryParam[key];
				}
			}
			_this.scrl = true
			if(lookup){
				var loader=_this.$node.querySelector('#modalElem').component.childComp.querySelector('.lookupFetchLoad')//no i18n
				if(loader){
					loader.style.display='block'//no i18n
				}
			}
			var modId=_this.data.module.id , prom;
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			this.setData('showDropdownLoading' , true);
			var qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", modId, qp );
			}else{
				prom = this.fetchRecords(modId , qp);
			}
			Lyte.resolvePromises(prom).then(function(recs){ //No I18n
				_this.setData('showDropdownLoading' , false);
				if(recs){
					record=record.concat(recs)
					_this.setData( 'record', record ) // No I18n
					if(lookup){
						Lyte.arrayUtils( _this.data.displayArray, 'push', recs ) // No I18n
					}else{
						Lyte.arrayUtils( _this.data.ften, 'push', recs ) // No I18n
					}
					_this.setData('queryParamObject',Obj)  //no i18n
					recs = {};
					var id = _this.data.value ? _this.data.value.id : "" , dropdownComp = _this.$node.querySelector("lyte-dropdown").component , dList = _this.data.cxPropDisabledList;//No I18n
					var dropChildComp = dropdownComp.childComp;
					if(dropChildComp){
						let dElem = dropChildComp.querySelector("[data-value='"+id+"']");
						if(dElem){
							dElem.setAttribute("selected", true);//No I18n
						}
					}
					if(dropdownComp && dList && dList.length){
						dropdownComp.setData('ltPropDisabledList' , []);
						dropdownComp.setData('ltPropDisabledList' , dList);
					}
				}else{
					_this.noMoreScroll=true;
				}
				setTimeout( function(){
					_this.scrl=false;
				}, 20 )
				if(lookup&& loader){
					loader.style.display='none'//no i18n
				}
			}, function(errRes){
				if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					this.setData('showDropdownLoading' , false);
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		}
	},
	didDestroy : function(){
		var ele = document.getElementById("cruxLookupPopover");
		if(ele){
			ele.remove();
		}
	},
	getValue : function(){
		if (this.$node.querySelector("#cruxLoadingElem")) {
			return this.data.cxPropValue;
		}
		if(this.data.cxPropFrom == 'criteria'){
			if(this.data.cxPropRenderAutoCompleteInCriteria){
				return this.data.cxPropValue;
			}
			var textVal = this.data.cxPropHideTextComponent ? "" : this.$node.querySelector('#lookupTextComponent').component.getValue();
			if(this.data.cxPropType == 'multi_module_lookup'){
				textVal = Object.assign({module : {api_name : this.data.module.api_name,id : this.data.modId}},{name : textVal});
			}
			return textVal;
		}
		var selectedVal = this.getData("cxPropValue"), parsedVal = this.getData("value");//No i18n
		if(this.data.cxPropType == 'multi_module_lookup' && selectedVal){
			selectedVal = Object.assign({module : {api_name : this.data.module.api_name,id : this.data.modId}},JSON.parse(selectedVal));
			selectedVal = JSON.stringify(selectedVal)
		}else if(this.data.cxPropType === 'multi_module_multi_select' || this.data.cxPropType === 'multiple'){
			selectedVal = this.cxValue;
		}
		if(parsedVal && parsedVal.id){
			var currentInpVal = this.$node.querySelector('lyte-input #'+this.data.cxPropInputId);//No i18n
			if(currentInpVal && currentInpVal.value && currentInpVal.value.trim() == parsedVal.name.trim()){
				if(this.data.cxPropReturnFullObjectOnGet){
					return this.data.selectedSingle;
				}
				return selectedVal;
			}
			return undefined; //fix for ZCRM-91703
		}
		return selectedVal;
	},
	validate : function(){
		if(this.data.cxPropFrom == 'criteria'){
			if(this.data.cxPropRenderAutoCompleteInCriteria){

				if(!this.getValue()){

					this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));//No I18n

					this.$node.querySelector("input").focus();//No I18n

					return false;

				}

				return true;

			}
			return this.data.cxPropHideTextComponent ? true : this.$node.querySelector('#lookupTextComponent').component.validate()
		}else{
			let input = this.$node.querySelector("input");
			let isEmptyVal = input === null || this.$node.querySelectorAll("input").length === 0 || input.value === "" || input.value.trim() === "";
			if( this.$node.querySelector("#cruxLoadingElem") ){
				isEmptyVal = !this.getValue();
			}
			var val = this.validateMandatory( isEmptyVal );//No I18n
			if(val){
				val = this.validateMandatory(!this.getValue(), function(){
					if(this.getMethods("onError")){
						/**
						 * Triggered when there is an error on validation
						 * @method onError
						 * @author anuja.manoharan
						 * @version 1.0.0
						 */
						this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
					}
					else{
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData("cxPropField").field_label)));//No I18n
					}
				}.bind(this));
			}
			if(!val){
				this.setData("cxPropValue",this.getValue());//No i18n
				if(!this.data.cxPropPreventFocusOnError){
					this.$node.querySelector("lyte-autocomplete") ? this.$node.querySelector("lyte-autocomplete").focus() : "";//No I18n
				}
			}
			return val;
		}
	},
	resetData:function(){
		var input = this.$node.querySelector('lyte-input');
		if(input){
			input.ltProp('value','');
		}
		this.setData({cxPropValue : {}, lookupSingle : ""})
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-lookup-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeValue : function(){
		if(this.getData("cxPropFrom") == "view"){
			var value = this.data.cxPropValue , field = this.data.cxPropField;
			if(value){
				if(this.data.cxPropType === "multiple" && !this.data.cxPropEmptyValue){
					this.setMultiSelectValues();
					this.setData({"cxPropEmptyValue" : this.data.lookupSingle , "showEmptyValue" : true});
				}else{
					try{
						if(value == "null" || typeof JSON.parse(value) != 'object'){
							throw 'number'
						}
						value = JSON.parse(value);
						this.setData({lookupValue : value.name, lookupId : value.id});
						if(this.data.cxPropType === "multi_module_lookup"){
							this.setData("modulePluralLabel", moduleRecordMapping[idModuleMapping[value.module.id]].plural_label);
						}
	//					this.data.lookupValue = value.name;
	//					this.data.lookupId = value.id;
						this.setData("showEmptyValue", false)//No I18n
					}
					catch(err){
					// 	this.data.lookupValue = value;
						this.setData("lookupValue", value);//No I18n
					}
					if(typeof value != "string" && typeof value != "object"){
						value = value.toString();
						// this.data.lookupValue = value;
						this.setData("lookupValue", value);//No I18n
					}
				}
			}
			else{
				this.setData({value : {}, lookupSingle : "" , lookupValue : "" , lookupId : ""});
				if(this.getData("cxPropEmptyValue")){
					this.setData("showEmptyValue", true);//No i18n
				}
			}
		}else if((this.getData("cxPropFrom") === "create" || this.data.cxPropRenderAutoCompleteInCriteria ) && this.getData("cxPropValue") && ['single' , 'multi_module_lookup'].includes(this.data.cxPropType)){
			if(!this.data.moduledataUicomp){
				this.setData('moduledataUicomp' , this.data.cxPropField);
			}
			if(this.data.cxPropValue){
				try{
					var value = JSON.parse(this.data.cxPropValue);
					this.setData('selectedSingle',value);
					if(value.name){
						this.setData("value", value);
						this.setData("lookupSingle", value.name);
					}
				}
				catch(err){
					if(this.data.cxPropValue.name){
						this.setData("value", this.data.cxPropValue);// No I18n
						this.setData("lookupSingle", this.data.value.name);// No I18n
					}
				}
				var inputElem = $L("lyte-autocomplete" , this.$node).find('input')[0];// No I18n
				if(inputElem){
					inputElem.selectionStart = inputElem.selectionEnd = this.data.lookupSingle.length;
				}
			}else{
				this.setData({value : "", lookupSingle : ""});
			}
		}else if(this.data.cxPropFrom === 'criteria' && this.data.cxPropType === 'multi_module_lookup'){
			var value = this.data.cxPropValue;
			if(value){
				value = JSON.parse(value);
				this.setData({lookupValue : value.name, lookupId : value.id});
				if(this.data.cxPropType == "multi_module_lookup"){
					this.setData("modulePluralLabel", moduleRecordMapping[idModuleMapping[value.module.id]].plural_label);
				}

			}
		}else if(this.data.cxPropType === 'multiple' || this.data.cxPropType === 'multi_module_multi_select'){
			this.setMultiSelectValues(this.data.cxPropValue);
		}else{
			this.setData('lookupValue',this.data.cxPropValue);
		}
		// if(this.data.cxPropValue && (!val || ( val && val.item === 'cxPropFrom'))){  //Catch the initial value
		// 	this.initCxValue = Lyte.deepCopyObject(JSON.parse(this.data.cxPropValue));
		// }
	}.observes("cxPropValue", "cxPropFrom").on("init"),//No I18n
	setMultiSelectValues : function(value){
		var name , field = this.data.cxPropField , ids = "";
			if(value){
				value = JSON.parse(value);
				var len = value.length , recObj = [];
				if(this.data.cxPropType === 'multiple'){
					if(len === 1){
						name = value[0][field.api_name].name;
					}else if(len >= 2){
						name = value[0][field.api_name].name + ', ' + value[1][field.api_name].name;
						if(len > 2){
							name = name + ".. & More";
						}
					}
					this.setData("lookupSingle" , name);
					ids = value.map(x => x[field.api_name].id);
					this.selectedIds = JSON.stringify(ids);
					recObj = value.map(function(x){ return  {"id" : x[field.api_name].id , "name" : x[field.api_name].name};});
					// this.setData("selectedIds", JSON.stringify(ids));
				}else{
					var mmlApiName = field.multiselect_multimodule_lookup.connectedMML_apiname;
					for(var i = 0; i < len ; i++){
						recObj.push(value[i][mmlApiName]);
					}
					this.setData("selectedRecsCount",len);
				}
				this.modalCxValue = recObj;
				this.setData("modalCxValue" , recObj && recObj.length ? JSON.stringify(recObj) : "");
			}
	},
	refresh : function(opt){
		if(this.lookupModalName === "crux-lookup-filter-modal"){
			this.setData("renderLookup",true); //No I18N
			return;
		}
		var elem = this.$node.querySelector(this.lookupModalName);
		if(!elem){
			return;
		}
		elem = elem.component;
		var Obj = this.data.queryParamObject || {}; //No I18n
		Obj.page = 1;
		Obj.per_page = this.data.cxPropPerpage;
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				Obj[key] = this.data.cxPropQueryParam[key];
			}
		}
		if(this.getMethods("beforeRequestChangeData")){
			this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
		}
		var qp = Object.assign({}, Obj) , prom;
		if(this.getMethods("fetchRecords")){
			prom = this.executeMethod("fetchRecords", this.getData("module").id, qp );
		}else{
			prom = this.fetchRecords(this.getData("module").id, qp);
		}
		Lyte.resolvePromises(prom).then(function(recs){ //No I18n
			recs = (recs && recs.length) ? recs : [];
			if(opt && opt.cxPropValue){
				this.setData({cxPropValue : opt.cxPropValue, value : JSON.parse(opt.cxPropValue), lookupSingle : JSON.parse(opt.cxPropValue).name});
				elem.setData({lookupSingle : JSON.parse(opt.cxPropValue).name, selectedSingle : JSON.parse(opt.cxPropValue).id})
			}
			elem.setData({record : recs, queryParamObject : Obj});
			if(recs.length < 10){
				elem.setNavigator(recs.length);
			}
			else{
				elem.setNavigator(recs.length, true);
			}
			elem.rendHome();
		}.bind(this), function(errRes){
			if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
			{
				_cruxUtils.showPermissionDeniedModal();
			}
		}.bind(this));
	},
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : ".cxLookupComponent");//No I18n

	}.observes("cxPropField.required", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield"),//No I18n
	observesdidConnect : function(){
		if(this.getData("cxPropFrom") == "create"){
			this.$node.classList.add("cxFlex");//No I18n
		}
		this.observeMandatoryMixin(".cxLookupComponent");//No I18n
		if(this.getData("cxPropToggle")){
			var autoCompleteNode = this.$node.querySelector("lyte-autocomplete");//no i18n
			if(autoCompleteNode){
				autoCompleteNode.toggle();
			}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	close : function(){
		this.$node.querySelector(this.lookupModalName).component.close();
	},
	observeIsError : function(){

		// if (this.data.cxPropPrefixYield) {
					// Yield Support Not Provided (Remember)
		// } else {
			
		// }


		if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-input")){
            var compNodeObj = $L(this.$node);
            var lyteInput = compNodeObj.find("lyte-input");
            var boxRightIcon = compNodeObj.find('.cxBoxWithRightIcon');
            var errorMsg = compNodeObj.find('crux-error-message');
			if(this.getData("isError")){
                boxRightIcon.addClass('cxErrorBoxWithRightIcon');
                if(errorMsg.hasClass('cxErrorMsgMultiLines')) {
                    boxRightIcon.addClass('cxErrorMsgMultiLinesBoxInside');
                }
			}
			else{
                boxRightIcon.removeClass('cxErrorBoxWithRightIcon');
                boxRightIcon.removeClass('cxErrorMsgMultiLinesBoxInside');
			}
		}
	}.observes("isError").on("didConnect"),//No I18n

	observeMultiModules : function(){
		if(this.data.cxPropType === "multi_module_lookup" && this.data.cxPropFrom !== 'view'){
			var a=[];
			if(this.data.cxPropField.multi_module_lookup.modules && this.data.cxPropField.multi_module_lookup.modules.length){
				this.data.cxPropField.multi_module_lookup.modules.map(function(item){return item.id}).forEach(function(item){a.push(moduleRecordMapping[idModuleMapping[item]])});
			}
			if(this.data.cxPropValue){
				var valueMod = JSON.parse(this.data.cxPropValue).module;
				if(valueMod){
					var selectedModule = moduleRecordMapping[idModuleMapping[valueMod.id]];
					this.setData('module',selectedModule);
					this.setData({'modId' : selectedModule.id , 'cxPropMultiModuleSelectId' : selectedModule.id});
					this.setData('cxPropModule',selectedModule.module_name);
					if(a.cruxFindIndexOfObject('id',valueMod.id) == -1){
						a.unshift(selectedModule);
						this.setData('moduleDisabledList',[valueMod.id]);
					}
				}
			}else if(a[0]){ // In some cases the module options is not available in the field info. Added the check here to prevent the console error.
				var sIndex = 0;
				if(this.data.cxPropMultiModuleSelectId){
					var index = a.findIndex( x => x.id === this.data.cxPropMultiModuleSelectId);
					if(index !== -1){
						sIndex = index;
					}
				}
				this.setData('module',a[sIndex]);
		    	this.setData('modId',a[sIndex].id);
		    	this.setData('cxPropModule',a[sIndex].module_name);
			}
			this.setData('multiModuleModules',a);
		}
	}.observes("cxPropField.multi_module_lookup" , "cxPropValue" , 'cxPropFrom').on('init'),//No I18n
	observeFrom : function(){
		if(this.getData("cxPropFrom") === "create" || this.data.cxPropRenderAutoCompleteInCriteria){
			this.setData("modulenameUicomp", this.data.cxPropModule);//No I18n
			var field = this.getData("cxPropField");//no i18n
			this.setData({columnName : field.column_name, apiName : field.api_name});
			if(!this.data.moduledataUicomp){
				this.setData('moduledataUicomp' , this.data.cxPropField);
			}
			if(field.data_type === "lookup"){
				if(field.lookup && this.getData("cxPropModule") === field.lookup.module.api_name && typeof moduleRecordMapping !== "undefined"){
					this.setData("module", moduleRecordMapping[this.data.cxPropModule]);
				}
				this.setData({modId : field.lookup.module.id, isSingle : true});
			}else if(field.data_type === "multiselectlookup" && field.multiselectlookup && field.multiselectlookup.connected_module){
				this.setData("modId" , field.multiselectlookup.connected_module.id);
			}else if(this.data.cxPropType === "multi_module_lookup" && this.data.cxPropField.multi_module_lookup.modules && this.data.cxPropField.multi_module_lookup.modules.length){
				var mml , sIndex = 0 , cxValue = this.data.cxPropValue;
				if(!this.data.multiModuleModules.length){
					this.setData("multiModuleModules",this.data.cxPropField.multi_module_lookup.modules.map(function(item){return item.id}).forEach(function(item){a.push(moduleRecordMapping[idModuleMapping[item]])}));
				}
				var modules = this.data.multiModuleModules , moduleSelectId = this.data.cxPropMultiModuleSelectId || cxValue && JSON.parse(cxValue).module.id;
				if(moduleSelectId){
					var index = modules.findIndex( x => x.id === moduleSelectId);
					if(index !== -1){
						sIndex = index;
					}
				}
				this.setData({modId : modules[sIndex].id, isSingle : true,module : modules[sIndex]});
			}
			this.$node.refresh = function(opt){
				return this.component.refresh(opt);
			}
			this.$node.close = function(){
				return this.component.close();
			}
			this.$node.clear = function(){
				this.component.clear();
			}
			this.$node.showLookup = function(){
				this.component.showLookupFunc(this.component);
			}
			this.setFocusUtil();
		}
	}.observes("cxPropFrom", "cxPropDisabled").on("init"),//No I18n
	observeName : function(){
		var input = this.$node.querySelector("input");
	    if(this.data.cxPropFrom === "create" && input){
			$L.fastdom.measure(()=>{
				var isTitleNeeded = (input.scrollWidth-1) > input.offsetWidth;
				$L.fastdom.mutate(()=>{
					if(isTitleNeeded){
						input.setAttribute("title", this.data.lookupSingle);
					}else{
						input.setAttribute("title", "");

					}
				});
			});
		}
	}.observes("lookupSingle").on("didConnect"),//no i18n
	observeTooltip : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip" , "cxPropDisabled").on("init"),//No I18n
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * It will trigger after rendering the component.
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	ele : ".cxLookupComponent",//No I18n
	clear : function(focusElem){
		if(this.getMethods("onClear")){ 
			/**
			 * It will trigger while clear the search value.
			 * @method onClear
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			var res = this.executeMethod("onClear");//No I18n
			if(res == false){
				return false;
			}
		}
		if(this.getData("cxPropClearErrorMessage")){
			this.setData("cxPropErrorMessage", "");//No I18n
		}
		this.setData('selectedSingle',{});//no i18n
		this.setData('lookupSingle','');//no i18n
		// this.$node.querySelector("lyte-autocomplete").ltProp("value", "")//No I18n
		this.setData('selectedSingleId','');//no i18n
		this.setData("cxPropValue", undefined);//No i18n
		// this.$node.querySelector('lyte-autocomplete').ltProp('selected','')//no i18n
		var lookupCreateRecord = this.getData('lookupCreateRecord');// no i18n
		this.setData('ften',this.getData('record')) // no i18n
		if(lookupCreateRecord && lookupCreateRecord.module){

			lookupCreateRecord.createNew=false;
			this.setData('lookupCreateRecord',lookupCreateRecord);	//No I18n
		}
		var lyteAutoComp = this.$node.querySelector('lyte-autocomplete');
		if(lyteAutoComp){
			lyteAutoComp.ltProp("value", "");//No I18n
			lyteAutoComp.ltProp('selected','');//no i18n
			if(focusElem){
				$L("lyte-input" , lyteAutoComp)[0].focus();//eslint-disable-line @zoho/webperf/no-complex-selector
			}
		}
		if(this.initialCriteria){
			this.data.queryParamObject.filters = this.initialCriteria;
		}else{
			delete this.data.queryParamObject.filters;
		}
		//fix for ZCRM-91152
		// this.$node.querySelector("lyte-autocomplete lyte-input").focus();//No I18n
		this.setData("cxPropShowCloseIcon", false);//No I18n
		this.data.value = undefined;
	},
	mandatoryType : function(){
		this.observeMandatoryTypeMixin(".cxLookupComponent");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	keyEvent : function(){
		var thisComp = this;
		if(this.$node){
			thisComp = this.$node;
		}
		if(thisComp.querySelector('.cxLookupIcon')){
			var focusableIcon = thisComp.querySelector('.cxLookupIcon');
			if(this.data.cxPropTabIndex === undefined && this.data.cxPropTabindex === undefined && (focusableIcon.tabIndex === -1 || focusableIcon.tabIndex === '-1')){
				focusableIcon.tabIndex = 0;
			}
			function iconRefocus(event){
				if(event.type == 'mousedown' || (event.type == 'keydown' && (event.key == ' ' || event.key == 'Enter'))){
					setTimeout(() => {
						var lyteModal = focusableIcon;
						if(lyteModal.parentElement){
							lyteModal = lyteModal.parentElement.querySelector('crux-lookup-modal lyte-modal'); // eslint-disable-line @zoho/webperf/no-complex-selector
						}
						if(lyteModal){
							lyteModal.component.childComp.addEventListener('keydown', function(){
								var currThis = this;
								var currTableComp = currThis;
								if(!this.$node){
									currThis = this.component;
									currTableComp = currTableComp.querySelector('crux-table-component');
								}else{
									currTableComp = currTableComp.$node.querySelector('crux-table-component');
								}
								if((event.key === ' ' && currThis.parent && currThis.parent.tagName.includes('MODAL') && (currThis.parent.attributes.ltPropCloseOnEscape === true || currThis.parent.attributes.ltPropCloseOnEscape === 'true' || currThis.parent.component.data.ltPropCloseOnEscape === true)) && (currTableComp && (currTableComp.attributes.listener || currTableComp.querySelector('[listener]')))){
									currThis.parent.ltProp('closeOnEscape', false);
								}else if(event.key == 'Escape'){
									setTimeout(() => {
										if(currThis.parent.ltProp('closeOnEscape')){
											focusableIcon.focus();
										}
										if(currThis.parent && currThis.parent.tagName.includes('MODAL') && (currThis.parent.attributes.ltPropCloseOnEscape === false || currThis.parent.attributes.ltPropCloseOnEscape === 'false' || currThis.parent.component.data.ltPropCloseOnEscape === false) && !(currTableComp && (currTableComp.attributes.listener || currTableComp.querySelector('[listener]')))){
											currThis.parent.ltProp('closeOnEscape', true);
										}
									}, 50);
								}
								focusableIcon.removeEventListener('mousedown', iconRefocus);
								focusableIcon.removeEventListener('keydown', iconRefocus);
							})
						}
					}, 50);
				}
			}
			focusableIcon.addEventListener('mousedown', iconRefocus);
			focusableIcon.addEventListener('keydown', iconRefocus);
		}
	}.on('didConnect'),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	setElementClass : function(){
		if(this.data.cxPropFrom === "create"){
			this.setData({elementClass : "cxElementValue "+(this.data.cxPropReadonly ? "cxElementReadOnly ":"")+((this.data.cxPropDisabled && !this.data.cxPropReadonly)? "cxElementDisabled " : "")+(this.data.cxPropType === "multiple" ? "cP " : "")});
		}
	}.observes("cxPropFrom", "cxPropReadonly", "cxPropDisabled", "cxPropType").on("init")
}, {mixins : ["crux-lookup-mixin", "crux-element-validation"]}); //No I18N
Lyte.Component.registerHelper('isDisabledRecord',function(id , disabledList){
	if(disabledList && disabledList.length){
		return disabledList.includes(id);
	}
	return false;
});
// var a = $0;
// store.findRecord('module',moduleRecordMapping.Appointments.id).then(()=>{
//   var comp = Lyte.Component.render('crux-lookup-component',{cxPropFrom : 'create',cxPropField : store.peekRecord('field','832108000000948251'),cxPropType : 'multi_module_lookup'},a)
//     comp.setMethods({fetchModuleData : function (id) { // NO I18N
// 			return store.findRecord("module",id,undefined,undefined,undefined).then(function (e) {// NO I18N
// 				return e[0];
// 			});
// 		},
//         fetchRecords : function(id,params){
//                 return store.findAll(id, params)
//             }
//         })
// })
