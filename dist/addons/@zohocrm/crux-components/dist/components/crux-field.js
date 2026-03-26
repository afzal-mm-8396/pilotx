/**
 * @component crux-field
 * @author mariswaran.sv
 * @alias crm-field 1
 * @summary wrapper component for crux elements
 */
Lyte.Component.register("crux-field", {
_template:"<template tag-name=\"crux-field\"> <template is=\"if\" value=\"{{dxHubCheck}}\"><template case=\"true\"> <template is=\"if\" value=\"dxHubError\"><template case=\"true\"><div class=\"cxPropMessageTypeFailure\">{{dxHubErrorMessage}}</div></template></template> </template><template case=\"false\"> <template is=\"component\" id=\"{{cxPropComponentId}}\" class=\"{{if(cxPropAutoWidthRow,'cxAutoWidthRow','')}} cxComponentClass {{if(ifEquals(cxPropAlignLabel,'horizontal'),'dF cxcreateFormComponentRow ','dB ')}} {{if(ifEquals(cxPropComponentTypeName,'boolean'),'cxcreateFormBooleanRow','')}} {{cxPropComponentClass}}\" cx-prop-min-date=\"{{getDefaultData(cxPropField,'cxPropMinDate',elementsCond,cxPropMinDate)}}\" cx-prop-calendar-class=\"{{getDefaultData(cxPropField,'cxPropCalendarClass',elementsCond,cxPropCalendarClass)}}\" cx-prop-date-in-user-pattern=\"{{getDefaultData(cxPropField,'cxPropDateInUserPattern',elementsCond,cxPropDateInUserPattern)}}\" cx-prop-freeze=\"{{if(ifEquals(elementsCond,'date-time'),getDefaultData(cxPropField,'cxPropFreeze',elementsCond,cxPropTimeDropdownFreeze),getDefaultData(cxPropField,'cxPropFreeze',elementsCond,cxPropFreeze))}}\" cx-prop-scope=\"{{getDefaultData(cxPropField,'cxPropScope',elementsCond,cxPropScope)}}\" cx-prop-max-date=\"{{getDefaultData(cxPropField,'cxPropMaxDate',elementsCond,cxPropMaxDate)}}\" cx-prop-dropdown-properties=\"{{getDefaultData(cxPropField,'cxPropDropdownProperties',elementsCond,cxPropDropdownProperties)}}\" cx-prop-header-type=\"{{getDefaultData(cxPropField,'cxPropHeaderType',elementsCond,cxPropHeaderType)}}\" cx-prop-calendar-properties=\"{{getDefaultData(cxPropField,'cxPropCalendarProperties',elementsCond,cxPropCalendarProperties)}}\" cx-prop-prevent-keys=\"{{getDefaultData(cxPropField,'cxPropPreventKeys',elementsCond,cxPropPreventKeys)}}\" cx-prop-disable-invalid-date=\"{{getDefaultData(cxPropField,'cxPropDisableInvalidDate',elementsCond,cxPropDisableInvalidDate)}}\" cx-prop-callback-delay=\"{{getDefaultData(cxPropField,'cxPropCallbackDelay',elementsCond,cxPropCallbackDelay)}}\" cx-prop-appearance=\"{{getDefaultData(cxPropField,'cxPropAppearance',elementsCond,cxPropAppearance)}}\" cx-prop-autocomplete=\"{{if(cxPropInputAutocomplete,getDefaultData(cxPropField,'cxPropAutocomplete',elementsCond,cxPropInputAutocomplete),getDefaultData(cxPropField,'cxPropAutocomplete',elementsCond,cxPropAutocomplete))}}\" cx-prop-autofocus=\"{{getDefaultData(cxPropField,'cxPropAutofocus',elementsCond,cxPropAutofocus)}}\" cx-prop-boundary=\"{{getDefaultData(cxPropField,'cxPropBoundary',elementsCond,cxPropBoundary)}}\" cx-prop-class=\"{{getDefaultData(cxPropField,'cxPropClass',elementsCond,cxPropClass)}}\" cx-prop-date-pattern=\"{{getDefaultData(cxPropField,'cxPropDatePattern',elementsCond,cxPropDatePattern)}}\" cx-prop-direction=\"{{getDefaultData(cxPropField,'cxPropDirection',elementsCond,cxPropDirection)}}\" cx-prop-disabled=\"{{getDefaultData(cxPropField,'cxPropDisabled',elementsCond,cxPropDisabled)}}\" cx-prop-disabled-icon-class=\"{{getDefaultData(cxPropField,'cxPropDisabledIconClass',elementsCond,cxPropDisabledIconClass)}}\" cx-prop-enable-lbind=\"{{getDefaultData(cxPropField,'cxPropEnableLbind',elementsCond,cxPropEnableLbind)}}\" cx-prop-empty-value=\"{{getDefaultData(cxPropField,'cxPropEmptyValue',elementsCond,cxPropEmptyValue)}}\" cx-prop-from=\"{{getDefaultData(cxPropField,'cxPropFrom',elementsCond,cxPropMode)}}\" cx-prop-id=\"{{getDefaultData(cxPropField,'cxPropId',elementsCond,cxPropId)}}\" cx-prop-ignore-empty-value=\"{{getDefaultData(cxPropField,'cxPropIgnoreEmptyValue',elementsCond,cxPropIgnoreEmptyValue)}}\" cx-prop-input-class=\"{{getDefaultData(cxPropField,'cxPropInputClass',elementsCond,cxPropInputClass)}}\" cx-prop-layout=\"{{getDefaultData(cxPropField,'cxPropLayout',elementsCond,cxPropLayout)}}\" cx-prop-mandatory=\"{{getDefaultData(cxPropField,'cxPropMandatory',elementsCond,cxPropMandatory)}}\" cx-prop-maxlength=\"{{getDefaultData(cxPropField,'cxPropMaxlength',elementsCond,cxPropMaxlength)}}\" cx-prop-module=\"{{getDefaultData(cxPropField,'cxPropModule',elementsCond,cxPropModule)}}\" cx-prop-name=\"{{getDefaultData(cxPropField,'cxPropName',elementsCond,cxPropName)}}\" cx-prop-placeholder=\"{{getDefaultData(cxPropField,'cxPropPlaceholder',elementsCond,cxPropPlaceholder)}}\" cx-prop-readonly=\"{{getDefaultData(cxPropField,'cxPropReadonly',elementsCond,cxPropReadonly)}}\" cx-prop-show-disabled-icon=\"{{getDefaultData(cxPropField,'cxPropShowDisabledIcon',elementsCond,cxPropShowDisabledIcon)}}\" cx-prop-start-week-day=\"{{getDefaultData(cxPropField,'cxPropStartWeekDay',elementsCond,cxPropStartWeekDay)}}\" cx-prop-tabindex=\"{{getDefaultData(cxPropField,'cxPropTabindex',elementsCond,cxPropTabindex)}}\" cx-prop-type=\"{{getDefaultData(cxPropField,'cxPropType',elementsCond,cxPropType)}}\" cx-prop-view-info-tooltip=\"{{getDefaultData(cxPropField,'cxPropViewInfoTooltip',elementsCond,cxPropViewInfoTooltip)}}\" cx-prop-wrapper-class=\"{{getDefaultData(cxPropField,'cxPropWrapperClass',elementsCond,cxPropWrapperClass)}}\" cx-prop-zcqa=\"{{getDefaultData(cxPropField,'cxPropZcqa',elementsCond,cxPropZcqa)}}\" lyte-unbound=\"{{getDefaultData(cxPropField,'lyteUnbound',elementsCond,lyteUnbound)}}\" lyte-view-port=\"{{getDefaultData(cxPropField,'lyteViewPort',elementsCond,lyteViewPort)}}\" cx-prop-value=\"{{parseValue(getDefaultData(cxPropField,'cxPropValue',elementsCond,cxFieldCompValue),elementsCond)}}\" cx-prop-time-format=\"{{getDefaultData(cxPropField,'cxPropTimeFormat',elementsCond,cxTimeFormat)}}\" cx-prop-time-zone=\"{{getDefaultData(cxPropField,'cxPropTimeZone',elementsCond,cxPropTimeZone)}}\" cx-prop-aria=\"{{getDefaultData(cxPropField,'cxPropAria',elementsCond,cxPropAria)}}\" cx-prop-aria-attributes=\"{{getDefaultData(cxPropField,'cxPropAriaAttributes',elementsCond,cxPropAriaAttributes)}}\" cx-prop-clear-error-message=\"{{getDefaultData(cxPropField,'cxPropClearErrorMessage',elementsCond,cxPropClearErrorMessage)}}\" cx-prop-error-class=\"{{getDefaultData(cxPropField,'cxPropErrorClass',elementsCond,cxPropErrorClass)}}\" cx-prop-error-message=\"{{getDefaultData(cxPropField,'cxPropErrorMessage',elementsCond,cxPropErrorMessage)}}\" cx-prop-error-span-class=\"{{getDefaultData(cxPropField,'cxPropErrorSpanClass',elementsCond,cxPropErrorSpanClass)}}\" cx-prop-error-yield=\"{{getDefaultData(cxPropField,'cxPropErrorYield',elementsCond,cxPropErrorYield)}}\" cx-prop-error-zcqa-prefix=\"{{getDefaultData(cxPropField,'cxPropErrorZcqaPrefix',elementsCond,cxPropErrorZcqaPrefix)}}\" cx-prop-error-zcqa-suffix=\"{{getDefaultData(cxPropField,'cxPropErrorZcqaSuffix',elementsCond,cxPropErrorZcqaSuffix)}}\" cx-prop-prevent-focus-on-error=\"{{getDefaultData(cxPropField,'cxPropPreventFocusOnError',elementsCond,cxPropPreventFocusOnError)}}\" cx-prop-ui-type-to-crux-mapping=\"{{getDefaultData(cxPropField,'cxPropUiTypeToCruxMapping',elementsCond,cxPropUiTypeToCruxMapping)}}\" cx-prop-data-type-to-crux-mapping=\"{{getDefaultData(cxPropField,'cxPropDataTypeToCruxMapping',elementsCond,cxPropDataTypeToCruxMapping)}}\" cx-prop-field-key=\"{{getDefaultData(cxPropField,'cxPropFieldKey',elementsCond,cxPropFieldKey)}}\" cx-prop-info-tooltip=\"{{getDefaultData(cxPropField,'cxPropInfoTooltip',elementsCond,cxPropInfoTooltip)}}\" cx-prop-label-class=\"{{getDefaultData(cxPropField,'cxPropLabelClass',elementsCond,cxPropLabelClass)}}\" cx-prop-show-warning=\"{{getDefaultData(cxPropField,'cxPropShowWarning',elementsCond,cxPropShowWarning)}}\" cx-prop-warning-icon-class=\"{{getDefaultData(cxPropField,'cxPropWarningIconClass',elementsCond,cxPropWarningIconClass)}}\" cx-prop-warning-message=\"{{getDefaultData(cxPropField,'cxPropWarningMessage',elementsCond,cxPropWarningMessage)}}\" cx-prop-tooltip=\"{{getDefaultData(cxPropField,'cxPropTooltip',elementsCond,cxPropTooltip)}}\" cx-prop-tooltip-class=\"{{getDefaultData(cxPropField,'cxPropTooltipClass',elementsCond,cxPropTooltipClass)}}\" cx-prop-tooltip-config=\"{{getDefaultData(cxPropField,'cxPropTooltipConfig',elementsCond,cxPropTooltipConfig)}}\" cx-prop-meta-more-records=\"{{getDefaultData(cxPropField,'cxPropMetaMoreRecords',elementsCond,cxPropMetaMoreRecords)}}\" cx-prop-img-zcqa=\"{{getDefaultData(cxPropField,'cxPropImgZcqa',elementsCond,cxPropImgZcqa)}}\" cx-prop-update-delay=\"{{getDefaultData(cxPropField,'cxPropUpdateDelay',elementsCond,cxPropUpdateDelay)}}\" cx-prop-autocomplete-options=\"{{getDefaultData(cxPropField,'cxPropAutocompleteOptions',elementsCond,cxPropAutocompleteOptions)}}\" cx-prop-yield=\"{{getDefaultData(cxPropField,'cxPropYield',elementsCond,cxPropYield)}}\" cx-prop-view-yield-suffix=\"{{getDefaultData(cxPropField,'cxPropViewYieldSuffix',elementsCond,cxPropViewYieldSuffix)}}\" cx-prop-date-field-id=\"{{getDefaultData(cxPropField,'cxPropDateFieldId',elementsCond,cxPropDateFieldId)}}\" cx-prop-date-field-name=\"{{getDefaultData(cxPropField,'cxPropDateFieldName',elementsCond,cxPropDateFieldName)}}\" cx-prop-time-field-id=\"{{getDefaultData(cxPropField,'cxPropTimeFieldId',elementsCond,cxPropTimeFieldId)}}\" cx-prop-time-field-name=\"{{getDefaultData(cxPropField,'cxPropTimeFieldName',elementsCond,cxPropTimeFieldName)}}\" cx-prop-time-format-input=\"{{getDefaultData(cxPropField,'cxPropTimeFormatInput',elementsCond,cxTimeFormatInput)}}\" cx-prop-end-time=\"{{getDefaultData(cxPropField,'cxPropEndTime',elementsCond,cxPropEndTime)}}\" cx-prop-start-time=\"{{getDefaultData(cxPropField,'cxPropStartTime',elementsCond,cxPropStartTime)}}\" cx-prop-default-time=\"{{getDefaultData(cxPropField,'cxPropDefaultTime',elementsCond,cxPropDefaultTime)}}\" cx-prop-show-interval=\"{{getDefaultData(cxPropField,'cxPropShowInterval',elementsCond,cxPropShowInterval)}}\" cx-prop-datetime-in-user-pattern=\"{{getDefaultData(cxPropField,'cxPropDatetimeInUserPattern',elementsCond,cxPropDatetimeInUserPattern)}}\" cx-prop-common-placeholder=\"{{getDefaultData(cxPropField,'cxPropCommonPlaceholder',elementsCond,cxPropCommonPlaceholder)}}\" cx-prop-show-today=\"{{getDefaultData(cxPropField,'cxPropShowToday',elementsCond,cxPropShowToday)}}\" cx-prop-time-placeholder=\"{{getDefaultData(cxPropField,'cxPropTimePlaceholder',elementsCond,cxPropTimePlaceholder)}}\" cx-prop-return-timezone=\"{{getDefaultData(cxPropField,'cxPropReturnTimezone',elementsCond,cxPropReturnTimezone)}}\" cx-prop-input-time-class=\"{{getDefaultData(cxPropField,'cxPropInputTimeClass',elementsCond,cxPropInputTimeClass)}}\" cx-prop-is-dropdown-icon-node=\"{{getDefaultData(cxPropField,'cxPropIsDropdownIconNode',elementsCond,cxPropIsDropdownIconNode)}}\" cx-prop-box-class=\"{{getDefaultData(cxPropField,'cxPropBoxClass',elementsCond,cxPropBoxClass)}}\" cx-prop-icon-class=\"{{getDefaultData(cxPropField,'cxPropIconClass',elementsCond,cxPropIconClass)}}\" cx-prop-footer-yield=\"{{getDefaultData(cxPropField,'cxPropFooterYield',elementsCond,cxPropFooterYield)}}\" cx-prop-toggle=\"{{getDefaultData(cxPropField,'cxPropToggle',elementsCond,cxPropToggle)}}\" cx-prop-advance-search-enabled=\"{{getDefaultData(cxPropField,'cxPropAdvanceSearchEnabled',elementsCond,cxPropAdvanceSearchEnabled)}}\" cx-prop-create-yield=\"{{getDefaultData(cxPropField,'cxPropCreateYield',elementsCond,cxPropCreateYield)}}\" cx-prop-popover-wrapper-class=\"{{getDefaultData(cxPropField,'cxPropPopoverWrapperClass',elementsCond,cxPropPopoverWrapperClass)}}\" cx-prop-related-id=\"{{getDefaultData(cxPropField,'cxPropRelatedId',elementsCond,cxPropRelatedId)}}\" cx-prop-related-name=\"{{getDefaultData(cxPropField,'cxPropRelatedName',elementsCond,cxPropRelatedName)}}\" cx-prop-related-module-id=\"{{getDefaultData(cxPropField,'cxPropRelatedModuleId',elementsCond,cxPropRelatedModuleId)}}\" cx-prop-related-record-data=\"{{getDefaultData(cxPropField,'cxPropRelatedRecordData',elementsCond,cxPropRelatedRecordData)}}\" cx-prop-show-close-icon=\"{{getDefaultData(cxPropField,'cxPropShowCloseIcon',elementsCond,cxPropShowCloseIcon)}}\" cx-prop-dont-show-related-dropdown=\"{{getDefaultData(cxPropField,'cxPropDontShowRelatedDropdown',elementsCond,cxPropDontShowRelatedDropdown)}}\" cx-prop-input-id=\"{{getDefaultData(cxPropField,'cxPropInputId',elementsCond,cxPropInputId)}}\" cx-prop-prevent-parent-scroll=\"{{getDefaultData(cxPropField,'cxPropPreventParentScroll',elementsCond,cxPropPreventParentScroll)}}\" cx-prop-right-icon-class=\"{{getDefaultData(cxPropField,'cxPropRightIconClass',elementsCond,cxPropRightIconClass)}}\" cx-prop-return-full-object-on-get=\"{{getDefaultData(cxPropField,'cxPropReturnFullObjectOnGet',elementsCond,cxPropReturnFullObjectOnGet)}}\" cx-prop-default-fields=\"{{getDefaultData(cxPropField,'cxPropDefaultFields',elementsCond,cxPropDefaultFields)}}\" cx-prop-display-icon-on-left=\"{{getDefaultData(cxPropField,'cxPropDisplayIconOnLeft',elementsCond,cxPropDisplayIconOnLeft)}}\" cx-prop-query-param=\"{{getDefaultData(cxPropField,'cxPropQueryParam',elementsCond,cxPropQueryParam)}}\" cx-prop-is-subordinate=\"{{getDefaultData(cxPropField,'cxPropIsSubordinate',elementsCond,cxPropIsSubordinate)}}\" cx-prop-custom-request=\"{{getDefaultData(cxPropField,'cxPropCustomRequest',elementsCond,cxPropCustomRequest)}}\" cx-prop-custom-data=\"{{getDefaultData(cxPropField,'cxPropCustomData',elementsCond,cxPropCustomData)}}\" cx-prop-all-fields-needed=\"{{getDefaultData(cxPropField,'cxPropAllFieldsNeeded',elementsCond,cxPropAllFieldsNeeded)}}\" cx-prop-default-criteria=\"{{getDefaultData(cxPropField,'cxPropDefaultCriteria',elementsCond,cxPropDefaultCriteria)}}\" cx-prop-field-of-lookup-val=\"{{getDefaultData(cxPropField,'cxPropFieldOfLookupVal',elementsCond,cxPropFieldOfLookupVal)}}\" cx-prop-parent-module=\"{{getDefaultData(cxPropField,'cxPropParentModule',elementsCond,cxPropParentModule)}}\" cx-prop-transition=\"{{getDefaultData(cxPropField,'cxPropTransition',elementsCond,cxPropTransition)}}\" cx-prop-offset=\"{{getDefaultData(cxPropField,'cxPropOffset',elementsCond,cxPropOffset)}}\" cx-prop-date-value=\"{{getDefaultData(cxPropField,'cxPropDateValue',elementsCond,cxPropDateValue)}}\" cx-prop-slider-yield=\"{{getDefaultData(cxPropField,'cxPropSliderYield',elementsCond,cxPropSliderYield)}}\" cx-prop-options=\"{{getDefaultData(cxPropField,'cxPropOptions',elementsCond,cxPropOptions)}}\" cx-prop-currency-code=\"{{getDefaultData(cxPropField,'cxPropCurrencyCode',elementsCond,cxPropCurrencyCode)}}\" cx-prop-currency-details=\"{{getDefaultData(cxPropField,'cxPropCurrencyDetails',elementsCond,cxPropCurrencyDetails)}}\" cx-prop-default-round-off=\"{{getDefaultData(cxPropField,'cxPropDefaultRoundOff',elementsCond,cxPropDefaultRoundOff)}}\" cx-prop-default-org-currency=\"{{getDefaultData(cxPropField,'cxPropDefaultOrgCurrency',elementsCond,cxPropDefaultOrgCurrency)}}\" cx-prop-maxvalue=\"{{getDefaultData(cxPropField,'cxPropMaxvalue',elementsCond,cxPropMaxvalue)}}\" cx-prop-minvalue=\"{{getDefaultData(cxPropField,'cxPropMinvalue',elementsCond,cxPropMinvalue)}}\" cx-prop-iso-code=\"{{getDefaultData(cxPropField,'cxPropIsoCode',elementsCond,cxPropIsoCode)}}\" cx-prop-decimal-allowed=\"{{getDefaultData(cxPropField,'cxPropDecimalAllowed',elementsCond,cxPropDecimalAllowed)}}\" cx-prop-allow-negative-value=\"{{getDefaultData(cxPropField,'cxPropAllowNegativeValue',elementsCond,cxPropAllowNegativeValue)}}\" cx-prop-show-calculator=\"{{getDefaultData(cxPropField,'cxPropShowCalculator',elementsCond,cxPropShowCalculator)}}\" cx-prop-restrict=\"{{getDefaultData(cxPropField,'cxPropRestrict',elementsCond,cxPropRestrict)}}\" cx-prop-handler=\"{{getDefaultData(cxPropField,'cxPropHandler',elementsCond,cxPropHandler)}}\" cx-prop-is-display-format-enabled=\"{{getDefaultData(cxPropField,'cxPropIsDisplayFormatEnabled',elementsCond,cxPropIsDisplayFormatEnabled)}}\" cx-prop-slider-width=\"{{getDefaultData(cxPropField,'cxPropSliderWidth',elementsCond,cxPropSliderWidth)}}\" cx-prop-slider-class=\"{{getDefaultData(cxPropField,'cxPropSliderClass',elementsCond,cxPropSliderClass)}}\" cx-prop-digits=\"{{getDefaultData(cxPropField,'cxPropDigits',elementsCond,cxPropDigits)}}\" cx-prop-increment=\"{{getDefaultData(cxPropField,'cxPropIncrement',elementsCond,cxPropIncrement)}}\" cx-prop-wheel=\"{{getDefaultData(cxPropField,'cxPropWheel',elementsCond,cxPropWheel)}}\" cx-prop-ignore-symbols=\"{{getDefaultData(cxPropField,'cxPropIgnoreSymbols',elementsCond,cxPropIgnoreSymbols)}}\" cx-prop-enable-country-code=\"{{getDefaultData(cxPropField,'cxPropEnableCountryCode',elementsCond,cxPropEnableCountryCode)}}\" cx-prop-user-locale=\"{{getDefaultData(cxPropField,'cxPropUserLocale',elementsCond,cxPropUserLocale)}}\" cx-prop-dropdown-icon-class=\"{{getDefaultData(cxPropField,'cxPropDropdownIconClass',elementsCond,cxPropDropdownIconClass)}}\" cx-prop-picklist-button-yield=\"{{getDefaultData(cxPropField,'cxPropPicklistButtonYield',elementsCond,cxPropPicklistButtonYield)}}\" cx-prop-picklist-yield=\"{{getDefaultData(cxPropField,'cxPropPicklistYield',elementsCond,cxPropPicklistYield)}}\" cx-prop-disable-extra-value=\"{{getDefaultData(cxPropField,'cxPropDisableExtraValue',elementsCond,cxPropDisableExtraValue)}}\" cx-prop-do-not-skip-first-value=\"{{getDefaultData(cxPropField,'cxPropDoNotSkipFirstValue',elementsCond,cxPropDoNotSkipFirstValue)}}\" cx-prop-show-unused=\"{{getDefaultData(cxPropField,'cxPropShowUnused',elementsCond,cxPropShowUnused)}}\" cx-prop-open-dropdown=\"{{getDefaultData(cxPropField,'cxPropOpenDropdown',elementsCond,cxPropOpenDropdown)}}\" cx-prop-display-value=\"{{getDefaultData(cxPropField,'cxPropDisplayValue',elementsCond,cxPropDisplayValue)}}\" cx-prop-is-color-code-enabled=\"{{getDefaultData(cxPropField,'cxPropIsColorCodeEnabled',elementsCond,cxPropIsColorCodeEnabled)}}\" cx-prop-user-value=\"{{getDefaultData(cxPropField,'cxPropUserValue',elementsCond,cxPropUserValue)}}\" cx-prop-system-value=\"{{getDefaultData(cxPropField,'cxPropSystemValue',elementsCond,cxPropSystemValue)}}\" cx-prop-picklist-values=\"{{getDefaultData(cxPropField,'cxPropPicklistValues',elementsCond,cxPropPicklistValues)}}\" cx-prop-dropdown-zcqa=\"{{getDefaultData(cxPropField,'cxPropDropdownZcqa',elementsCond,cxPropDropdownZcqa)}}\" cx-prop-search-delay=\"{{getDefaultData(cxPropField,'cxPropSearchDelay',elementsCond,cxPropSearchDelay)}}\" cx-prop-none-keyword=\"{{getDefaultData(cxPropField,'cxPropNoneKeyword',elementsCond,cxPropNoneKeyword)}}\" cx-prop-show-search=\"{{getDefaultData(cxPropField,'cxPropShowSearch',elementsCond,cxPropShowSearch)}}\" cx-prop-no-result-message=\"{{getDefaultData(cxPropField,'cxPropNoResultMessage',elementsCond,cxPropNoResultMessage)}}\" cx-prop-max-height=\"{{getDefaultData(cxPropField,'cxPropMaxHeight',elementsCond,cxPropMaxHeight)}}\" cx-prop-show-tooltip=\"{{getDefaultData(cxPropField,'cxPropShowTooltip',elementsCond,cxPropShowTooltip)}}\" cx-prop-max-count=\"{{getDefaultData(cxPropField,'cxPropMaxCount',elementsCond,cxPropMaxCount)}}\" cx-prop-forced-fetch=\"{{getDefaultData(cxPropField,'cxPropForcedFetch',elementsCond,cxPropForcedFetch)}}\" cx-prop-user-record=\"{{getDefaultData(cxPropField,'cxPropUserRecord',elementsCond,cxPropUserRecord)}}\" cx-prop-text-area-resize=\"{{getDefaultData(cxPropField,'cxPropTextAreaResize',elementsCond,cxPropTextAreaResize)}}\" cx-prop-expand-text-area=\"{{getDefaultData(cxPropField,'cxPropExpandTextArea',elementsCond,cxPropExpandTextArea)}}\" cx-prop-prevent-collapse=\"{{getDefaultData(cxPropField,'cxPropPreventCollapse',elementsCond,cxPropPreventCollapse)}}\" cx-prop-highlight-url=\"{{getDefaultData(cxPropField,'cxPropHighlightUrl',elementsCond,cxPropHighlightUrl)}}\" cx-prop-resize-max-height=\"{{getDefaultData(cxPropField,'cxPropResizeMaxHeight',elementsCond,cxPropResizeMaxHeight)}}\" cx-prop-contact-server-url=\"{{getDefaultData(cxPropField,'cxPropContactServerUrl',elementsCond,cxPropContactServerUrl)}}\" cx-prop-is-business-card=\"{{getDefaultData(cxPropField,'cxPropIsBusinessCard',elementsCond,cxPropIsBusinessCard)}}\" cx-prop-user-search-criteria=\"{{getDefaultData(cxPropField,'cxPropUserSearchCriteria',elementsCond,cxPropUserSearchCriteria)}}\" cx-prop-filter-options=\"{{getDefaultData(cxPropField,'cxPropFilterOptions',elementsCond,cxPropFilterOptions)}}\" cx-prop-filterable=\"{{getDefaultData(cxPropField,'cxPropFilterable',elementsCond,cxPropFilterable)}}\" cx-prop-disable-on-hover-for-view=\"{{getDefaultData(cxPropField,'cxPropDisableOnHoverForView',elementsCond,cxPropDisableOnHoverForView)}}\" cx-prop-exclude=\"{{getDefaultData(cxPropField,'cxPropExclude',elementsCond,cxPropExclude)}}\" cx-prop-filter-system-value=\"{{getDefaultData(cxPropField,'cxPropFilterSystemValue',elementsCond,cxPropFilterSystemValue)}}\" cx-prop-filter-user-value=\"{{getDefaultData(cxPropField,'cxPropFilterUserValue',elementsCond,cxPropFilterUserValue)}}\" cx-prop-show-bus-card=\"{{getDefaultData(cxPropField,'cxPropShowBusCard',elementsCond,cxPropShowBusCard)}}\" cx-prop-no-user-label=\"{{getDefaultData(cxPropField,'cxPropNoUserLabel',elementsCond,cxPropNoUserLabel)}}\" cx-prop-show-business-card=\"{{getDefaultData(cxPropField,'cxPropShowBusinessCard',elementsCond,cxPropShowBusinessCard)}}\" cx-prop-filter-selected=\"{{getDefaultData(cxPropField,'cxPropFilterSelected',elementsCond,cxPropFilterSelected)}}\" cx-prop-clear-icon-class=\"{{getDefaultData(cxPropField,'cxPropClearIconClass',elementsCond,cxPropClearIconClass)}}\" cx-prop-width=\"{{getDefaultData(cxPropField,'cxPropWidth',elementsCond,cxPropWidth)}}\" cx-prop-user-detail-view-path=\"{{getDefaultData(cxPropField,'cxPropUserDetailViewPath',elementsCond,cxPropUserDetailViewPath)}}\" cx-prop-hide-lookup-icon=\"{{getDefaultData(cxPropField,'cxPropHideLookupIcon',elementsCond,cxPropHideLookupIcon)}}\" cx-prop-user-criteria=\"{{getDefaultData(cxPropField,'cxPropUserCriteria',elementsCond,cxPropUserCriteria)}}\" on-value-change=\"{{method('changeValue')}}\" on-error=\"{{method('valueError')}}\" on-custom-request=\"{{method('userComponentCustomRequest')}}\" on-element-rendered=\"{{method('renderElement')}}\" on-clicked=\"{{method('clickElement')}}\" on-date-change=\"{{method('changeDate')}}\" on-calendar-open=\"{{method('openCalendar')}}\" on-before-calendar-close=\"{{method('beforeCalendarClose')}}\" on-calendar-close=\"{{method('calendarClose')}}\" on-before-calendar-open=\"{{method('beforeCalendarOpen')}}\" on-right-icon-click=\"{{method('clickOnRightIcon')}}\" fetch-module-data=\"{{method('moduleData')}}\" fetch-records=\"{{method('getRecords')}}\" on-blur=\"{{method('elementOnBlur')}}\" on-clear=\"{{method('clickOnClear')}}\" on-before-add=\"{{method('beforeAdd')}}\" on-option-selected=\"{{method('optionSelected')}}\" on-before-show=\"{{method('beforeShow')}}\" on-hide=\"{{method('elementOnHide')}}\" on-focus=\"{{method('elementOnFocus')}}\" on-focus-out=\"{{method('elementOnFocusOut')}}\" max-user-drop-limit-err=\"{{method('userLimitErr')}}\" on-user-lookup-modal-close=\"{{method('userLookupModalClose')}}\" cx-prop-focus=\"{{cxPropFocus}}\" cx-prop-ajax=\"{{cxPropAjax}}\" cx-prop-tag-style=\"{{getDefaultData(cxPropField,'cxPropTagStyle',elementsCond,cxPropTagStyle)}}\" cx-prop-allow-new-tag-creations=\"{{getDefaultData(cxPropField,'cxPropAllowNewTagCreations',elementsCond,cxPropAllowNewTagCreations)}}\" cx-prop-search-format=\"{{getDefaultData(cxPropField,'cxPropSearchFormat',elementsCond,cxPropSearchFormat)}}\" component-name=\"crux-{{elementsCond}}-component\" cx-prop-field=\"{{cxPropField}}\" cx-prop-auto-resize=\"{{cxPropAutoResize}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> <template is=\"registerYield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"createYield\"> <lyte-yield yield-name=\"createYield\"></lyte-yield> </template> <template is=\"registerYield\" yield-name=\"sliderYield\"> <lyte-yield yield-name=\"lyteSliderYield \" slider-values=\"{{nonCurrencySliderValues}}\"></lyte-yield> </template> <template is=\"registerYield\" yield-name=\"picklistButtonYield\"> <lyte-yield yield-name=\"picklistButtonYield\"></lyte-yield> </template> <template is=\"registerYield\" yield-name=\"picklistYield\"> <lyte-yield yield-name=\"picklistYield\" item-obj=\"{{item}}\"></lyte-yield> </template> <template is=\"registerYield\" yield-name=\"viewYieldSuffix\"> <lyte-yield yield-name=\"viewYieldSuffix\" prop-field=\"{{cxPropField}}\" prop-value=\"{{cxPropValue}}\"></lyte-yield> </template> </template> <template is=\"if\" value=\"{{fieldErrorMessage}}\"><template case=\"true\"> <span class=\"cruxErrMsg\">{{fieldErrorMessage}}</span> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[7],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[11],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[13],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[15],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropComponentTypeName","cxPropComponentClass","cxPropComponentId","cxPropAlignLabel","cxPropMinDate","cxPropCalendarClass","cxPropDateInUserPattern","cxPropFreeze","cxPropScope","cxPropMaxDate","cxPropDropdownProperties","cxPropHeaderType","cxPropCalendarProperties","cxPropPreventKeys","cxPropDisableInvalidDate","cxPropCallbackDelay","cxPropAppearance","cxPropInputAutocomplete","cxPropAutocomplete","cxPropAutofocus","cxPropBoundary","cxPropClass","cxPropDatePattern","cxPropDirection","cxPropDisabled","cxPropDisabledIconClass","cxPropEnableLbind","cxPropEmptyValue","cxPropMode","cxPropId","cxPropIgnoreEmptyValue","cxPropInputClass","cxPropLayout","cxPropMandatory","cxPropMaxlength","cxPropModule","cxPropName","cxPropPlaceholder","cxPropReadonly","cxPropShowDisabledIcon","cxPropStartWeekDay","cxPropTabindex","cxPropType","cxPropViewInfoTooltip","cxPropWrapperClass","cxPropZcqa","lyteUnbound","lyteViewPort","cxPropValue","cxPropTimeFormat","cxPropTimeZone","cxPropAria","cxPropAriaAttributes","cxPropClearErrorMessage","cxPropErrorClass","cxPropErrorMessage","cxPropErrorSpanClass","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropPreventFocusOnError","cxPropField","cxPropUiTypeToCruxMapping","cxPropDataTypeToCruxMapping","multiUiTypeCompMapping","elementsCond","cxPropFieldKey","cxPropInfoTooltip","cxPropLabelClass","cxPropShowWarning","cxPropWarningIconClass","cxPropWarningMessage","cxPropTooltip","cxPropTooltipClass","cxPropTooltipConfig","cxPropMetaMoreRecords","cxPropImgZcqa","cxPropUpdateDelay","cxPropAutocompleteOptions","cxPropYield","cxPropViewYieldSuffix","cxPropDateFieldId","cxPropDateFieldName","cxPropTimeFieldId","cxPropTimeFieldName","cxPropHoursFormat","cxPropEndTime","cxPropStartTime","cxPropDefaultTime","cxPropShowInterval","cxPropDatetimeInUserPattern","cxPropCommonPlaceholder","cxPropShowToday","cxPropTimePlaceholder","cxPropReturnTimezone","cxPropInputTimeClass","cxPropIsDropdownIconNode","cxPropBoxClass","cxPropIconClass","cxPropFooterYield","cxPropToggle","cxPropAdvanceSearchEnabled","cxPropCreateYield","cxPropPopoverWrapperClass","cxPropRelatedId","cxPropRelatedName","cxPropRelatedModuleId","cxPropRelatedRecordData","cxPropShowCloseIcon","cxPropDontShowRelatedDropdown","cxPropInputId","cxPropPreventParentScroll","cxPropRightIconClass","cxPropReturnFullObjectOnGet","cxPropDefaultFields","cxPropDisplayIconOnLeft","cxPropQueryParam","cxPropIsSubordinate","cxPropCustomRequest","cxPropCustomData","cxPropAllFieldsNeeded","cxPropDefaultCriteria","cxPropFieldOfLookupVal","cxPropParentModule","cxPropTransition","cxPropOffset","cxPropDateValue","cxPropSliderYield","cxPropOptions","cxPropCurrencyCode","cxPropCurrencyDetails","cxPropDefaultRoundOff","cxPropDefaultOrgCurrency","cxPropMaxvalue","cxPropMinvalue","cxPropIsoCode","cxPropDecimalAllowed","cxPropAllowNegativeValue","cxPropShowCalculator","cxPropRestrict","cxPropHandler","cxPropIsDisplayFormatEnabled","cxPropSliderWidth","cxPropSliderClass","cxPropDigits","cxPropIncrement","cxPropWheel","cxPropIgnoreSymbols","cxPropEnableCountryCode","cxPropUserLocale","cxPropDropdownIconClass","cxPropPicklistButtonYield","cxPropPicklistYield","cxPropDisableExtraValue","cxPropDoNotSkipFirstValue","cxPropShowUnused","cxPropOpenDropdown","cxPropDisplayValue","cxPropIsColorCodeEnabled","cxPropUserValue","cxPropSystemValue","cxPropPicklistValues","cxPropDropdownZcqa","cxPropSearchDelay","cxPropNoneKeyword","cxPropShowSearch","cxPropNoResultMessage","cxPropMaxHeight","cxPropShowTooltip","cxPropMaxCount","cxPropForcedFetch","cxPropUserRecord","cxPropTextAreaResize","cxPropExpandTextArea","cxPropPreventCollapse","cxPropHighlightUrl","cxPropResizeMaxHeight","cxPropContactServerUrl","cxPropIsBusinessCard","cxPropUserSearchCriteria","cxPropFilterOptions","cxPropFilterable","cxPropDisableOnHoverForView","cxPropExclude","cxPropFilterSystemValue","cxPropFilterUserValue","cxPropShowBusCard","cxPropNoUserLabel","cxPropShowBusinessCard","cxPropFilterSelected","cxPropClearIconClass","cxPropWidth","cxPropUserDetailViewPath","cxPropHideLookupIcon","cxPropUserCriteria","dxHubCheck","dxHubError","dxHubErrorMessage","cxPropAjax","cxPropFocus","cxPropTimeDropdownFreeze","cxPropExpandWidthOnChange","fieldErrorMessage","cxPropTagStyle","cxPropSearchFormat","cxPropAllowNewTagCreations","updateByCode","cxTimeFormat","cxTimeFormatInput","cxPropFieldLabel","cxPropModuleApiName","cxPropFieldApiName","cxFieldCompValue","cxPropAutoWidthRow"],
_observedAttributesType :["string","string","string","string","string","string","boolean","boolean","string","string","object","string","object","boolean","boolean","number","string","string","boolean","boolean","object","string","string","string","boolean","string","boolean","string","string","string","boolean","string","string","boolean","number","string","string","string","boolean","boolean","number","string","string","boolean","string","string","boolean","boolean","any","string","string","boolean","object","boolean","string","string","string","boolean","string","string","boolean","object","object","object","object","string","string","string","string","boolean","string","string","string","string","string","string","string","number","object","boolean","boolean","string","string","string","string","string","string","string","string","boolean","boolean","string","boolean","string","boolean","string","boolean","string","string","boolean","boolean","boolean","boolean","string","string","string","string","array","boolean","boolean","string","boolean","string","boolean","object","boolean","object","boolean","boolean","object","boolean","array","array","string","object","object","string","boolean","array","string","object","number","string","number","number","string","boolean","boolean","boolean","string","string","boolean","string","string","number","boolean","boolean","boolean","boolean","string","string","boolean","boolean","boolean","boolean","boolean","boolean","string","boolean","string","string","array","string","number","string","boolean","string","string","boolean","number","boolean","object","object","boolean","boolean","boolean","string","string","boolean","string","array","boolean","boolean","array","string","string","boolean","string","boolean","string","string","string","string","boolean","string","boolean","boolean","string","object","boolean","boolean","boolean","string","boolean","boolean","boolean","boolean","string","string","string","string","string","string","boolean"],

	_lyteUtilFunctions: ["getValue", "validate", "focus"],
	data : function(){
		return {
			/* crux field property default */
			/**
			 * @componentProperty { text | date | datetime | email | image | layout | lookup | number | phone | picklist | tag | boolean | textarea | twitter | user | website } cxPropComponentTypeName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @autoUpdate
			 * @input
			 */
			cxPropComponentTypeName : Lyte.attr("string", {default : "text", "input" : true}),//No I18n
		    /**
			 * Class set to crux component
		     * @componentProperty { string } cxPropComponentClass
		     * @author mariswaran.sv
		     * @version 1.0.0
			 * @input
		     */
			cxPropComponentClass : Lyte.attr('string', {default : "", "input" : true}),
		    /**
			 * Id set to crux component
		     * @componentProperty { string } cxPropComponentId
		     * @author mariswaran.sv
		     * @version 1.0.0
			 * @input
		     */
			cxPropComponentId: Lyte.attr("string", {default: "", "input" : true}), //NO i18n
		    /**
			 * With this property, you can align the label and the component either horizontally or vertically.
		     * @componentProperty { horizontal | vertical } cxPropAlignLabel=horizontal
		     * @author mariswaran.sv
		     * @version 1.0.0
			 * @condition cxPropMode create
			 * @input
		     */
			cxPropAlignLabel : Lyte.attr("string", {default : "horizontal", "input" : true}),
			/* date properties default */
			/**
			 * The minimum boundary or date beyond which it is selectable. All dates behind this date are greyed out and are not selectabled. This should adhere to lt-prop-format. It can also be combined with lt-prop-max-date.
			 * @componentProperty { string } cxPropMinDate
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @depends cxPropDatePattern
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropMinDate : Lyte.attr("string", {default : "", "input" : true}),//No i18n
			/**
			 * Same class will be added for calendar div.
			 * @componentProperty { string } cxPropCalendarClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 */
			cxPropCalendarClass : Lyte.attr("string"), //No I18n
			/**
			 * Set to true if date value passed is in user pattern instead of ISO format.
			 * @componentProperty { boolean } cxPropDateInUserPattern=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date
			 * @condition cxPropMode create
			 */
			cxPropDateInUserPattern : Lyte.attr("boolean", {default : true}),//NO I18n
			/**
			 * Same will be applied for dropdown associated with lyte-input. On setting true, a dropdown will open with a freeze layer.
			 * @componentProperty { boolean } cxPropFreeze=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist, user
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropFreeze : Lyte.attr("boolean", {default : false, "input" : true}),//NO I18n
			/**
			 * Selector of the closest element of input. Calendar will be positioned within scope element.
			 * @componentProperty { string } cxPropScope
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, picklist, user
			 */
			cxPropScope : Lyte.attr("string"),//No I18n
			/**
			 * The maximum boundary or date beyond it, becomes unselectable. All dates beyond this date are greyed out and are not selectabled. It should adhere to lt-prop-format. It can also be combined with lt-prop-min-date.
			 * @componentProperty { string } cxPropMaxDate
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @depends cxPropDatePattern
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropMaxDate : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * The required properties for a dropdown to render in a component must be given with this property.
			 * @componentProperty { object } cxPropDropdownProperties={"preventScroll":"all"}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @condition cxPropHeaderType dropdown
			 * @input
			 */
			cxPropDropdownProperties : Lyte.attr("object", {default : {"preventScroll":"all"}, "input" : true}),//No I18n
			/**
			 * This is used to set the header type of the navigation bar. It can either be a set of normal nav buttons or a dropdown.
			 * @componentProperty { default | dropdown | drilldown } cxPropHeaderType=dropdown
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropHeaderType : Lyte.attr("string", {default: 'dropdown', "input" : true}),//No I18n
			/**
			 * You can give any basic lyte-calendar properties in this as a single object.
			 * @componentProperty { object } cxPropCalendarProperties
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropCalendarProperties : Lyte.attr("object", {default : {}, "input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventKeys=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 */
			cxPropPreventKeys : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Setting this property will not allow invalid dates.
			 * @componentProperty { boolean } cxPropDisableInvalidDate=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropDisableInvalidDate : Lyte.attr("boolean", {default : true, "input" : true}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback.
			 * @componentProperty { number } cxPropCallbackDelay
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @maxValue maximum
			 * @allowEmpty
			 * @step 1
			 * @condition cxPropComponentTypeName date, datetime, email, number, phone, textarea, text, twitter, website
			 * @input
			 */
			cxPropCallbackDelay : Lyte.attr("number", {"input" : true}),

			/*generic crux element properties*/
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { box | flat } cxPropAppearance
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 */
			cxPropAppearance : Lyte.attr("string"),//No I18n
			/**
			 * Enables native autocomplete property for input Field.
			 * @componentProperty { on | off } cxPropInputAutocomplete=on
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, phone, text, twitter, website
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropInputAutocomplete : Lyte.attr("string", {default : "on", "input" : true}),//No I18n
			/**
			 * Enables native autocomplete property for dropdown field.
			 * @componentProperty { string } cxPropAutocomplete=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropAutocomplete : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Sets autofocus value for input. Browser will focus input when entire page got loaded.
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, lookup, number, phone, textarea, text, website
			 */
			cxPropAutofocus : Lyte.attr('boolean', {default : false}),
			/**
			 * Whenever calendar exceeds given boundary value it will be closed.
			 * @componentProperty { object } cxPropBoundary
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, layout, number, picklist, tag, user
			 */
			cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropClass : Lyte.attr("string", {default: '', "input" : true}),//No I18n
			/**
			 * The pattern in which the date will be rendered.
			 * @componentProperty { 'dd-MM-yyyy' | 'dd/MM/yyyy' | 'dd.MM.yyyy' | 'dd MM yyyy' | 'dd-MM-yy' | 'dd/MM/yy' | 'dd.MM.yy' | 'd.MM.yy' | 'd-M-yy' | 'd/M/yy' | 'd.M.yy' | 'd.M.yy.' | 'd-M-yyyy' | 'd/M/yyyy' | 'd.M.yyyy' | 'd. M. yyyy.' | 'd. M. yyyy' | 'd MMM, yyyy' | 'dd MMM, yyyy' | 'd. MMMM yyyy' | 'dd.MM.yyyy.' | 'dd.MM.yy.' | 'yyyy-MM-dd' | 'yyyy/MM/dd' | 'yyyy.MM.dd' | 'yyyy MM dd' | 'yy/MM/dd' | 'yy-MM-dd' | 'yy.M.d' | 'yy-M-d' | 'yy. M. d' | 'yyyy/M/d' | 'yyyy年MM月dd日' | 'yy年M月d日' | 'yyyy.MM.dd.' | 'yyyy. MM. dd' | 'MM-dd-yyyy' | 'MM/dd/yyyy' | 'MM.dd.yyyy' | 'MM dd yyyy' | 'MM-dd-yy' | 'MM/dd/yy' | 'M/dd/yy' | 'MMM-dd-yyyy' | 'MMM dd, yyyy' | 'MMM d, yyyy' | 'MMMM d, yyyy' | 'yyyy.dd.MM' | 'yy.d.M' } cxPropDatePattern
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @format date
			 * @condition cxPropComponentTypeName date, datetime
			 */
			cxPropDatePattern : Lyte.attr('string',{default : (typeof Crm !== "undefined" && Crm.userDetails  ? Crm.userDetails.DATE_PATTERN : "DD/MM/YYYY")}), //no i18n
			/**
			 * It defines how label and input field placed.
			 * @componentProperty { horizontal | vertical } cxPropDirection
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, number, phone, picklist, textarea, text, twitter, website
			 */
			cxPropDirection : Lyte.attr("string"), //No I18n
			/**
			 * This property disables input. lyteInputDisabled class will be added to lyte-input.
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false, "input" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, image, layout, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 * @condition cxPropShowDisabledIcon true
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableLbind
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, number, phone, textarea, text, twitter, website
			 */
			cxPropEnableLbind : Lyte.attr("boolean"),
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value.
			 * @componentProperty { string } cxPropEmptyValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropMode view
			 * @input
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : "-", "input" : true}), //No I18n
			/**
			 * To determine what the element has to be displayed or where it is to be used.
			 * @componentProperty { view | create } cxPropMode=create
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @allowedValuesDepends cxPropComponentTypeName
			 * @map text view, create
			 * @map date view, create
			 * @map datetime view, create
			 * @map email view, create
			 * @map image create
			 * @map layout view
			 * @map lookup view, create
			 * @map number view, create
			 * @map phone view, create
			 * @map picklist view, create
			 * @map tag view, create
			 * @map boolean view, create
			 * @map textarea view, create
			 * @map twitter view, create
			 * @map user view, create
			 * @map website view, create
			 * @input
			 */
			cxPropMode : Lyte.attr("string", {default : "create", "input" : true}),//No I18n
			/**
			 * Sets id to the child element.
			 * @componentProperty { string } cxPropId
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @input
			 */
			cxPropId : Lyte.attr("string", {"input" : true}), //NO i18n
			/**
			 * Set to true to ignore empty value on validate.
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, layout, number, picklist, text, tag
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Sets class for input.
			 * @componentProperty { string } cxPropInputClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, number, phone, textarea, text, twitter, website
			 */
			cxPropInputClass : Lyte.attr("string",{"default" : ''}), //NO I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * It overwrites layout specific required property.
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, image, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropMandatory : Lyte.attr("boolean", {"input" : true}),
			/**
			 * Sets maximum length for the element.
			 * @componentProperty { number } cxPropMaxlength
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 1
			 * @maxValue 255
			 * @allowEmpty
			 * @condition cxPropComponentTypeName email, lookup, number, phone, picklist, textarea, text, twitter, website
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropMaxlength : Lyte.attr("number", {"input" : true}), //NO i18n
			/**
			 * With this property, you can provide the module for for which the tag field is belonging to. It is also used to make the tags request.
			 * @componentProperty { string } cxPropModule
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @internal
			 * @condition cxPropComponentTypeName layout, lookup, phone, tag, image
			 * @condition cxPropMode create
			 * @autoUpdate
			 * @input
			 */
			cxPropModule : Lyte.attr("string", {"input" : true}), //NO i18n
			/**
			 * Name set to lyte-input.
			 * @componentProperty { string } cxPropName
			 * @author mariswaran.sv
			 * @version 1.0.0
         	 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, number, phone, textarea, text, twitter, website
			 * @input
			 */
			cxPropName : Lyte.attr("string", {"default": "", "input" : true}), //NO I18n
			/**
			 * The text thats needs to be displayed as placeholder if value is not present.
			 * @componentProperty { string } cxPropPlaceholder
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @input
			 * @condition cxPropComponentTypeName date, datetime, email, image, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, website
			 * @condition cxPropMode create
			 * @or
			 * @condition cxPropComponentTypeName user
			 * @condition cxPropType single
			 * @or
			 */
			cxPropPlaceholder : Lyte.attr("string", {default : "", "input" : true}), //NO i18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, image, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false, "input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, image, layout, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 * @condition cxPropDisabled true
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This is used to specify the first day of each row(start day of the week). Meaning whether the calendar should render from sunday, monday, etc.
			 * @componentProperty { number } cxPropStartWeekDay
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @maxValue 6
			 * @decimalNotAllowed
			 * @condition cxPropComponentTypeName date, datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropStartWeekDay : Lyte.attr("number", {default : ((typeof Crm !== "undefined" && Crm.calPreferences && Crm.calPreferences.WEEKSTARTSON !== undefined) ? Crm.calPreferences.WEEKSTARTSON : 1), "input" : true}),//No I18n
			/**
			 * It sets tab index for input.
			 * @componentProperty { '-1' | '0' } cxPropTabindex=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @input
			 */
			cxPropTabindex : Lyte.attr("string", {default : 0, "input" : true}), //No I18n
			/**
			 * With this, you can set the type.
			 * @componentProperty { text | alphanumeric | password } cxPropType
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, number, picklist, text, user
			 * @condition cxPropMode create
			 * @allowedValuesDepends cxPropComponentTypeName
			 * @map boolean default, primary, switch, slider
			 * @map number text, number
			 * @map picklist single, multiple
			 * @map text text, alphanumeric, password
			 * @map user single, multiple
			 * @input
			 */
			cxPropType : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * It will be added to the wrapper div element over the input.
			 * @componentProperty { string } cxPropWrapperClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, image, lookup, number, phone, textarea, text, twitter, user, website
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * Zcqa set to lyte-input.
			 * @componentProperty { string } cxPropZcqa
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
		    /**
			 * Set to true to render component on viewport
		     * @componentProperty { boolean } lyteViewPort=false
		     * @author mariswaran.sv
		     * @version 1.0.0
		     */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n

			/*generic crux element property but type varies*/
			/**
			 * Sets value to crux component.
			 * @componentProperty { any } cxPropValue
			 * @propertyType {boolean} [cxPropComponentTypeName=["boolean"]]
			 * @propertyType {array} [cxPropComponentTypeName=["tag"]]
			 * @propertyType {object} [cxPropComponentTypeName=["layout", "user", "lookup"]]
			 * @propertyType {date} [cxPropComponentTypeName=["date"]]
			 * @propertyType {datetime} [cxPropComponentTypeName=["datetime"]]
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @autoUpdate
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @input @output
			 */
			cxPropValue : Lyte.attr("any", {"input" : true, "output" : true}), //No I18n

			/* generic crux element property for date and datetime elements */
			/**
			 * @componentProperty { 'hh:mm A' | 'HH:mm' } cxPropTimeFormat
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @format time
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropTimeFormat : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropTimeZone
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropTimeZone : Lyte.attr('string'),
			
			/*generic crux element aria properties*/
			/**
			 * To enable aria properties.
			 * @componentProperty { boolean } cxPropAria=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, layout, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @input
			 */
			cxPropAria : Lyte.attr("boolean", {default : false, "input" : true}),//No I18n
			/**
			 * To determine aria attributes.
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime, email, number, phone, textarea, text, tag, twitter, user, website
			 * @condition cxPropAria true
			 * @input
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}, "input" : true}),//No I18n

			/*generic crux element error properties*/
			/**
			 * Set to false to prevent clearing of error message on change of value.
			 * @componentProperty { boolean } cxPropClearErrorMessage=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}), //No I18n
			/**
			 * This class is set to the crux-error-message element.
			 * @componentProperty { string } cxPropErrorClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropShowWarning false
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropErrorClass : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropShowWarning false
			 * @condition cxPropMode create
			 * @input @output
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : "", "input" : true, "output" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropShowWarning false
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to render custom error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * Prefix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 */
			cxPropPreventFocusOnError : Lyte.attr('boolean', {default : false}),
			
			/* component specific properties */
			/**
			 * It being a mandatory property, helps to provide the attributes such as data type, UI, type.
			 * @componentProperty { object } cxPropField
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @input
			 */
			cxPropField : Lyte.attr('object', {default : {}, "input" : true}),
			/**
			 * Mapping ui type to crux component.
			 * @componentProperty { object } cxPropUiTypeToCruxMapping
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUiTypeToCruxMapping : Lyte.attr('object', {default: 
				{
					"1": "text",
					"2": "picklist",
					"3": "text-area",
					"4": "lookup",
					"5": "lookup",
					"8": "user",
					"14": "date-time",
					"20": "user",
					"21": "website",
					"22": "twitter",
					"24": "date",
					"25": "email",
					"26": "picklist",
					"32": "number",
					"33": "phone",
					"34": "number",
					"36": "number",
					"38": "number",
					"39": "picklist",
					"40": "number",
					"52": "number",
					"55": "user",
					"77": "number",
					"100": "picklist",
					"110": "text-area",
					"111": "text",
					"133": "lookup",
					"143": "number",
					"144": "number",
					"145": "number",
					"200": "date-time",
					"202": "date",
					"207": "layout",
					"208": "layout",
					"209": "tag",
					"221": "user",
					"300": "boolean",
					"301": "boolean",
					"333": "date-time",
					"445": "user",
					"556": "image",
					"786": "date-time",
					"999": "layout"
				}
			}),
			/**
			 * Mapping data type to crux component.
			 * @componentProperty { object } cxPropDataTypeToCruxMapping
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropDataTypeToCruxMapping : Lyte.attr('object', {default:
				{
					"boolean": "boolean",
					"date": "date",
					"datetime": "date-time",
					"email": "email",
					"image": "image",
					"layout": "layout",
					"lookup": "lookup",
					"number": "number",
					"phone": "phone",
					"picklist": "picklist",
					"multiselectpicklist": "picklist",
					"tag": "tag",
					"text": "text",
					"textarea": "text-area",
					"twitter": "twitter",
					"user": "user",
					"multiuserlookup": "user",
					"website": "website"
				}
			}),

			multiUiTypeCompMapping : Lyte.attr('object', {default:
				{
					"100" : "multiselectpicklist",
					"445" : "multiuserlookup"
				}
			}),

			/* Internal use */
			elementsCond : Lyte.attr('string'),  //no i18n
			
			/*generic crux element field label properties for*/
			/**
			 * The selector which determines which key holds the field label.
			 * @componentProperty { string } cxPropFieldKey="field_label"
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": "field_label"}),//No I18n
			/**
			 * The info message displayed on hover of the info icon next to the field label.
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Class set to field label.
			 * @componentProperty { string } cxPropLabelClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			
			/*generic crux element warning properties*/
			/**
			 * When set to true, it displays a warning message similar to an error message.
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false, "input" : true}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropShowWarning true
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * When warning is displayed, this is the message that is rendered.
			 * @componentProperty { string } cxPropWarningMessage
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 * @condition cxPropShowWarning true
			 * @condition cxPropMode create
			 * @input @output
			 */
			cxPropWarningMessage : Lyte.attr("string", {default : "", "input" : true, "output" : true}),
			
			/*generic crux element tooltip properties*/
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, tag, twitter, user, website
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, lookup, number, phone, picklist, textarea, text, twitter, user, website
			 */
			cxPropTooltipConfig : Lyte.attr("string"),//No I18n


			/* Properties in field data */
			/**
			 * @componentProperty { string } cxPropMetaMoreRecords
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName text, lookup
			 */
			cxPropMetaMoreRecords : Lyte.attr("string"),
			/**
			 * The zcqa to be set to the image icon.
			 * @componentProperty { string } cxPropImgZcqa
			 * @author mariswaran.sv
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropImgZcqa : Lyte.attr("string"), //no i18n
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change.
			 * @componentProperty { number } cxPropUpdateDelay
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @condition cxPropComponentTypeName date, datetime, email, number, phone, picklist, textarea, text, twitter, website
			 * @input
			 */
			cxPropUpdateDelay : Lyte.attr("number", {"input" : true}),
			/**
			 * @componentProperty { object } cxPropAutocompleteOptions
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName text
			 */
			cxPropAutocompleteOptions : Lyte.attr("object"),
			/**
			 * for calendar footer yield.
			 * @componentProperty { boolean } cxPropYield
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName date, datetime
			 */
			cxPropYield : Lyte.attr("boolean"),//No I18n
			/**
			 * This property is used to enable view yield in each cell.
			 * @componentProperty { boolean } cxPropViewYieldSuffix=false
			 * @author mariswaran.sv
			 * @default false
			 */
			cxPropViewYieldSuffix:  Lyte.attr('boolean'),
			/**
			 * Id set to date input.
			 * @componentProperty { string } cxPropDateFieldId
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			*/
			cxPropDateFieldId: Lyte.attr("string"),
			/**
			 * Name set to date input.
			 * @componentProperty { string } cxPropDateFieldName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			*/
			cxPropDateFieldName: Lyte.attr("string"),
			/**
			 * Id set to time input.
			 * @componentProperty { string } cxPropTimeFieldId
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			*/
			cxPropTimeFieldId: Lyte.attr("string"),
			/**
			 * Name set to time input.
			 * @componentProperty { string } cxPropTimeFieldName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			*/
			cxPropTimeFieldName: Lyte.attr("string"),
			/**
			 * @componentProperty { '12' | '24' } cxPropHoursFormat
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 */
			cxPropHoursFormat : Lyte.attr('string'), //no i18n
			/**
			 * Its the upper limit of time.
			 * @componentProperty { string } cxPropEndTime
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @depends cxPropTimeFormat
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropEndTime : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * Its the lower limit of time.
			 * @componentProperty { string } cxPropStartTime
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @depends cxPropTimeFormat
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropStartTime : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * Selected time in input // use this property instead of lt-prop-value in input type time.
			 * @componentProperty { string } cxPropDefaultTime
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @depends cxPropTimeFormat
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropValue
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropDefaultTime : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * With this property you can either show or hide the time interval in the date time component while clicking the time.
			 * @componentProperty { boolean } cxPropShowInterval=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 * @input
			*/
			cxPropShowInterval : Lyte.attr("boolean", {"input" : true}),
			/**
			 * By default, cxPropValue is expected in ISO format.
			 * @componentProperty { boolean } cxPropDatetimeInUserPattern=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 */
			cxPropDatetimeInUserPattern : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * To set common placeholder for datetime input. Both input values should be empty for showing placeholder.
			 * @componentProperty { string } cxPropCommonPlaceholder
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropCommonPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowToday=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropShowToday : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropTimePlaceholder
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropTimePlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * If set to true, timezone is passed on getValue.
			 * @componentProperty { boolean } cxPropReturnTimezone=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropReturnTimezone : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropInputTimeClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 */
			cxPropInputTimeClass : Lyte.attr("string"),//No I18n
			/**
			 * Set to true to render custom dropdown icon.
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime, layout, phone, picklist, user
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean"),
			/**
			 * Same class will be set for dropdown box associated with lyte-input.
			 * @componentProperty { string } cxPropBoxClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime, layout, lookup, phone, picklist, user
			 */
			cxPropBoxClass : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropIconClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName email, lookup, number, text, user
			 */
			cxPropIconClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFooterYield=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, picklist
			 */
			cxPropFooterYield : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropToggle=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropToggle : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropAdvanceSearchEnabled=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropAdvanceSearchEnabled : Lyte.attr("boolean"),
			/**
			 * Set this property to true if you want to display and handle a create button in your lookup modal.
			 * @componentProperty { boolean } cxPropCreateYield=false
			 * @author mariswaran.sv
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropCreateYield : Lyte.attr("boolean"),//no i18n
			/**
			 * @componentProperty { string } cxPropPopoverWrapperClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropPopoverWrapperClass: Lyte.attr("string"),
			/**
			 * Let's say Accounts and Contacts are related, i.e. in a form when I have selected a Contact I wish to see only its related Accounts in my lookup modal, I will pass the id of the selected Contact.
			 * @componentProperty { string } cxPropRelatedId
			 * @author mariswaran.sv
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropRelatedId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedName
			 * @author mariswaran.sv
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropRelatedName : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedModuleId
			 * @author mariswaran.sv
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropRelatedModuleId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropRelatedRecordData
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName looukp
			 */
			cxPropRelatedRecordData : Lyte.attr('array'),
			/**
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropShowCloseIcon : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropDontShowRelatedDropdown=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropDontShowRelatedDropdown : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropInputId
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropInputId : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName layout, lookup, phone, picklist, user
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, number, text, user
			 */
			cxPropRightIconClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReturnFullObjectOnGet=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropReturnFullObjectOnGet : Lyte.attr("boolean"),
			/**
			 * @componentProperty { object } cxPropDefaultFields
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropDefaultFields : Lyte.attr("object"),
			/**
			 * @componentProperty { boolean } cxPropDisplayIconOnLeft=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropDisplayIconOnLeft : Lyte.attr("boolean"),
			/**
			 * @componentProperty { object } cxPropQueryParam
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropQueryParam : Lyte.attr("object"),
			/*Only for crm requirement, We can use custom request by default*/
			/**
			 * @componentProperty { boolean } cxPropIsSubordinate=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropIsSubordinate :  Lyte.attr('boolean' , { default : false }), //NO I18n
			/**
			 * Set to true to trigger custom request.
			 * @componentProperty { boolean } cxPropCustomRequest=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName tag, user
			 */
			cxPropCustomRequest : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropCustomData
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName layout
			 */
			cxPropCustomData : Lyte.attr('object'),
			/**
			 * @componentProperty { boolean } cxPropAllFieldsNeeded=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropAllFieldsNeeded : Lyte.attr("boolean"),
			/**
			 * @componentProperty { array } cxPropDefaultCriteria
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropDefaultCriteria : Lyte.attr('array'),
			/**
			 * @componentProperty { array } cxPropFieldOfLookupVal
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropFieldOfLookupVal : Lyte.attr('array'),
			/**
			 * @componentProperty { string } cxPropParentModule
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropParentModule : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropTransition
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropTransition : Lyte.attr('object'),
			/**
			 * @componentProperty { object } cxPropOffset
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropOffset : Lyte.attr('object'),
			/**
			 * With this property you can display the date time of the user while creating and modifying the entity.
			 * @componentProperty { string } cxPropDateValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 * @condition cxPropMode view
			 * @input
			 */
			cxPropDateValue : Lyte.attr("string", {"input" : true}),
			/**
			 * @componentProperty { boolean } cxPropSliderYield=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropSliderYield : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropOptions
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropOptions : Lyte.attr('array'),//no i18n
			/**
			 * @componentProperty { string } cxPropCurrencyCode
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropCurrencyCode : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropCurrencyDetails
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropCurrencyDetails : Lyte.attr("object"),
			/**
			 * @componentProperty { number } cxPropDefaultRoundOff
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @maxValue maximum
			 * @allowEmpty
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @condition cxPropComponentTypeName number
			 */
			cxPropDefaultRoundOff : Lyte.attr("number"),
			/**
			 * @componentProperty { string } cxPropDefaultOrgCurrency
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropDefaultOrgCurrency : Lyte.attr("string"),
			/**
			 * A number greater than this number will not be accepted.
			 * @componentProperty { number } cxPropMaxvalue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @condition cxPropComponentTypeName number
			 * @condition cxPropMode create
			 * @condition cxPropType number
			 * @input
			 */
			cxPropMaxvalue : Lyte.attr("number", {"input" : true}),
			/**
			 * A number less than this value will not be accepted.
			 * @componentProperty { number } cxPropMinvalue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 * @condition cxPropMode create
			 * @condition cxPropType number
			 * @input
			 */
			cxPropMinvalue : Lyte.attr("number", {"input" : true}),//No I18n
			/**
			 * The currency code of the record.
			 * @componentProperty { string } cxPropIsoCode
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropIsoCode : Lyte.attr("string"),//No I18n
			/**
			 * Set this to false to restrict decimal places.
			 * @componentProperty { boolean } cxPropDecimalAllowed=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropDecimalAllowed : Lyte.attr("boolean", {"input" : true}),
			/**
			 * Set this to false to restrict negative values.
			 * @componentProperty { boolean } cxPropAllowNegativeValue=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropAllowNegativeValue : Lyte.attr("boolean", {"input" : true}),
			/**
			 * Used to display calculator icon and perform calculator operations on input box.
			 * @componentProperty { boolean } cxPropShowCalculator=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropShowCalculator : Lyte.attr("boolean", {"input" : true}),
			/**
			 * Given value will be constructed as a regex. Matched values will not be allowed in inputs.
			 * @componentProperty { string } cxPropRestrict
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			*/
		   	cxPropRestrict : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropHandler
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropHandler : Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropIsDisplayFormatEnabled=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropIsDisplayFormatEnabled : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropSliderWidth
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropSliderWidth : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropSliderClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropSliderClass : Lyte.attr('string'),
			/**
			 * @componentProperty { number } cxPropDigits
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @maxValue maximum
			 * @allowEmpty
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @condition cxPropComponentTypeName number
			 */
			cxPropDigits : Lyte.attr('number'),
			/**
			 * @componentProperty { boolean } cxPropIncrement=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropIncrement : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropWheel=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropWheel : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropIgnoreSymbols=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number
			 */
			cxPropIgnoreSymbols : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropEnableCountryCode=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName phone
			 */
			cxPropEnableCountryCode : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropUserLocale
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName phone
			 */
			cxPropUserLocale : Lyte.attr("string"),
			/**
			 * Sets class to dropdown's icon node.
			 * @componentProperty { string } cxPropDropdownIconClass="dropdown"
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @default dropdown
			 * @condition cxPropComponentTypeName phone, picklist, user
			 */
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPicklistButtonYield=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropPicklistButtonYield : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropPicklistYield=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropPicklistYield : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropDisableExtraValue=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropDisableExtraValue : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropDoNotSkipFirstValue=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropDoNotSkipFirstValue : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropShowUnused=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropShowUnused : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropOpenDropdown=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist, user
			 */
			cxPropOpenDropdown : Lyte.attr("boolean"),
			/**
			 * Set a display-value or the content to be displayed as selected.
			 * @componentProperty { string } cxPropDisplayValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName layout, phone, picklist
			 */
			cxPropDisplayValue : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropIsColorCodeEnabled=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropIsColorCodeEnabled : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropUserValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropUserValue : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropSystemValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropSystemValue : Lyte.attr("string"),
			/**
			 * You can pass the options to be displayed in the dropdown instead of using the pick_list_values from cxPropField.
			 * @componentProperty { array } cxPropPicklistValues
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropPicklistValues : Lyte.attr("array", {"input" : true}),
			/**
			 * @componentProperty { string } cxPropDropdownZcqa
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropDropdownZcqa : Lyte.attr("string"),// No I18n
			/**
			 * Search will be processed after the given time delay. If its set to undefined search will be processed immediately.
			 * @componentProperty { number } cxPropSearchDelay
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropSearchDelay : Lyte.attr('number'), //no i18n
			/**
			 * @componentProperty { string } cxPropNoneKeyword
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 */
			cxPropNoneKeyword : Lyte.attr("string"),
			/**
			 * Set to true to display search box even if number of options is less than 7.
			 * @componentProperty { boolean } cxPropShowSearch=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist
			 * @condition cxPropMode create
			 * @condition cxPropType single
			 * @input
			 */
			cxPropShowSearch : Lyte.attr("boolean", {"input" : true}),
			/**
			 * @componentProperty { string } cxPropNoResultMessage
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, picklist
			 */
			cxPropNoResultMessage : Lyte.attr("string"),
			/**
			 * If height exceeds this value, showMore will be displayed.
			 * @componentProperty { string } cxPropMaxHeight
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @suffix px,pt,cm,mm,vh,vm,em
			 * @condition cxPropComponentTypeName textarea
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropMaxHeight : Lyte.attr("string", {"input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowTooltip=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName picklist, user
			 */
			cxPropShowTooltip : Lyte.attr("boolean"),
			/**
			 * Maximum no of options that can be selected.
			 * @componentProperty { number } cxPropMaxCount
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @maxValue maximum
			 * @allowEmpty
			 * @step 1
			 * @input
			 * @condition cxPropComponentTypeName picklist
			 * @condition cxPropMode create
			 * @condition cxPropType multiple
			 * @or
			 * @condition cxPropComponentTypeName tag
			 * @condition cxPropMode create
			 * @or
			 */
			cxPropMaxCount : Lyte.attr('number', {"input" : true}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropForcedFetch=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName tag, user
			 */
			cxPropForcedFetch : Lyte.attr("boolean"),
			/**
			 * @componentProperty { object } cxPropUserRecord
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropUserRecord : Lyte.attr("object"),
			/**
			 * It defines the textarea resize directions.
			 * @componentProperty { object } cxPropTextAreaResize
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName textarea
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropTextAreaResize : Lyte.attr("object", {"input" : true}),
			/**
			 * @componentProperty { boolean } cxPropExpandTextArea=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName textarea
			 */
			cxPropExpandTextArea : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropPreventCollapse=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName textarea
			 */
			cxPropPreventCollapse : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropHighlightUrl=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName textarea
			 */
			cxPropHighlightUrl : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropResizeMaxHeight
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @condition cxPropComponentTypeName textarea
			 */
			cxPropResizeMaxHeight : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropContactServerUrl
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropContactServerUrl : Lyte.attr("string"),
			/**
			 * Set to true to display business card on hover of element.
			 * @componentProperty { boolean } cxPropIsBusinessCard=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropIsBusinessCard : Lyte.attr("boolean"),//No I18n
			/**
			 * This property appends its value to the default query param 'criteria' of search api with 'and' condition. If special characters are used in this query param, then consider passing it by encoding it first.
			 * @componentProperty { string } cxPropUserSearchCriteria
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropUserSearchCriteria : Lyte.attr("string"),//No I18n
			/**
			 * This property sets the user filters to the filters passed to the component. It also requires cx-prop-filter-user-value and cx-prop-filter-system-value to be set to object's key and value respectively.
			 * @componentProperty { array } cxPropFilterOptions
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 * @input
			 */
			cxPropFilterOptions : Lyte.attr("array", {default : [], "input" : true}),
			/**
			 * This provides inner dropdown to filter users.
			 * @componentProperty { boolean } cxPropFilterable=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 * @input
			 */
			cxPropFilterable : Lyte.attr("boolean", {default : false, "input" : true}),
			/**
			 * @componentProperty { boolean } cxPropDisableOnHoverForView=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropDisableOnHoverForView : Lyte.attr("boolean"),
			/**
			 * @componentProperty { array } cxPropExclude
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropExclude : Lyte.attr('array'),
			/**
			 * @componentProperty { string } cxPropFilterSystemValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropFilterSystemValue : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropFilterUserValue
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropFilterUserValue : Lyte.attr('string'),
			/**
			 * Set to true to display business card on hover of value.
			 * @componentProperty { boolean } cxPropShowBusCard=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropShowBusCard : Lyte.attr('boolean'), //no i18n
			/**
			 * This property sets the label on dropdown button if no user is passed for single or multiselect dropdown.
			 * @componentProperty { string } cxPropNoUserLabel
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropNoUserLabel : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty { boolean } cxPropShowBusinessCard=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropShowBusinessCard : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } cxPropFilterSelected=ActiveUsers
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropFilterSelected : Lyte.attr("string", {default : "ActiveUsers"}),
			/**
			 * Class set to clear icon.
			 * @componentProperty { string } cxPropClearIconClass
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup, user
			 */
			cxPropClearIconClass : Lyte.attr("string"),//No i18n
			/**
			 * @componentProperty { string } cxPropWidth
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @minValue 0
			 * @condition cxPropComponentTypeName text
			 * @condition cxPropExpandWidthOnChange true
			 * @or
			 * @condition cxPropComponentTypeName textarea
			 * @condition cxPropMode view
			 * @or
			 * @condition cxPropComponentTypeName tag, user
			 * @or
			 */
			cxPropWidth : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropUserDetailViewPath : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropHideLookupIcon=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropHideLookupIcon : Lyte.attr("boolean"),
			/**
			 * This property sets the 'filters' query param for user api. If special characters are used in this query param, then consider passing it by encoding it first.
			 * @componentProperty { string } cxPropUserCriteria
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName user
			 */
			cxPropUserCriteria : Lyte.attr("string"),
			dxHubCheck : Lyte.attr('boolean',{default : false}), //no i18n
			dxHubError : Lyte.attr('boolean',{default : false}), //no i18n
			dxHubErrorMessage : Lyte.attr('string'),
			/**
			 * cx-prop-ajax is an object, which is similar to $L.ajax first argument.
			 * @componentProperty { string } cxPropAjax
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName image
			 */
			cxPropAjax : Lyte.attr('object',{default : {"url":""}}),
			/**
			 * It will make input focus on its didConnect. Use this instead of cx-prop-autofocus property.
			 * @componentProperty { boolean } cxPropFocus=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName number, text
			 */
			cxPropFocus : Lyte.attr('boolean', {default : false}),
			/**
			 * With this property the time interval dropdown gets rendered with the freeze layer while clicking the time in date time component.
			 * @componentProperty { boolean } cxPropTimeDropdownFreeze=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName datetime
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropTimeDropdownFreeze : Lyte.attr("boolean", {default : false, "input" : true}),//NO I18n
			/**
			 * Set to true to expand width whenever value is added or collapse when value is removed.
			 * @componentProperty { boolean } cxPropExpandWidthOnChange=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName text
			 */
			cxPropExpandWidthOnChange : Lyte.attr("boolean", {default : false}),
			fieldErrorMessage : Lyte.attr("string"),
			/**
			 * To set crux-tag styles.
			 * @componentProperty { boolean } cxPropTagStyle=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName tag
			 */
			cxPropTagStyle : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropSearchFormat=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 */
			cxPropSearchFormat : Lyte.attr("boolean", {default : true}),
			/**
			 * This is used to display some of the items in the dropdown. You have to pass an array of system values of items that you want to disable.
			 * @componentProperty { boolean } cxPropAllowNewTagCreations=true
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName tag
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropAllowNewTagCreations : Lyte.attr("boolean", {default : true, "input" : true}),
			updateByCode : Lyte.attr('boolean', {default : false}),
			/* child element observer calling first causing issue fix */
			cxTimeFormat : Lyte.attr('string'),
			cxTimeFormatInput : Lyte.attr('string'),

			/* properties to provide field meta data's */
			/**
			 * To provide label for the field.
			 * @componentProperty { string } cxPropFieldLabel
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropFieldLabel : Lyte.attr('string', {"input" : true}),
			/**
			 * To provide module data for the field.
			 * @componentProperty { string } cxPropModuleApiName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName lookup
			 * @condition cxPropMode create
			 * @autoUpdate
			 * @input
			 */
			cxPropModuleApiName : Lyte.attr('string', {"input" : true}),
			/**
			 * To provide field id for the field.
			 * @componentProperty { string } cxPropFieldApiName
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropComponentTypeName image
			 * @condition cxPropMode create
			 * @autoUpdate
			 * @input
			 */
			cxPropFieldApiName : Lyte.attr('string', {"input" : true}),
			cxFieldCompValue : Lyte.attr('string'),
			/**
			 * Set to true to auto resize the textarea based on the content.
			 * @componentProperty { boolean } cxPropAutoResize=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @condition cxPropMode create
			 * @input
			 */
			cxPropAutoWidthRow : Lyte.attr('boolean', {default : (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard) ? true : false, "input" : true})

			// /**
			//  * @componentProperty { boolean } cxPropCloseIcon=false
			//  * @author mariswaran.sv
			//  * @version 1.0.0
			//  * @condition cxPropComponentTypeName text
			//  * @condition cxPropMode create
			//  */
			// cxPropCloseIcon : Lyte.attr("boolean", {default : false})	
		};
	},
	init : function(){
		/**
		 * @utility getValue
		 * @author mariswaran.sv
		 * @version 1.0.0
		 * @return { anyDataType }
		 */
		this.$node.getValue = function(options){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			var res;
			if(this.component.elementNode && this.component.elementNode.component && this.component.elementNode.component.getValue && this.component.data.cxPropMode !== 'view'){
				// for date and date-time components
					if(options){
						res = this.component.elementNode.component.getValue(options);
					}
				res = this.component.elementNode.component.getValue();
			}else if(this.component.data.cxPropMode === 'view'){
				res = this.component.data.cxPropValue;
			}

			if(this.component.data.elementsCond === 'lookup'){
				res = JSON.parse(res);
			}
			/* Updating cxPropValue as value of getValue() - value getting trimmed on getValue() for text issue fix */
			if(this.component.data.elementsCond === 'text'){
				this.setData('cxPropValue', res);
			}
			return res;
		};
		/**
		 * @utility validate
		 * @author mariswaran.sv
		 * @version 1.0.0
		 * @return { boolean }
		 */
		this.$node.validate = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.component && this.component.elementNode.component.validate){
				return this.component.elementNode.component.validate();
			}
		};
		/**
		 * @utility focus
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.focus = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.focus){
				return this.component.elementNode.focus();
			}
		};
		/**
		 * @utility resize
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.resize = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.resize){
				return this.component.elementNode.resize();
			}
		};
		/**
		 * @utility reset
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.reset = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.reset){
				return this.component.elementNode.reset();
			}
		};
		/**
		 * @utility resetData
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.resetData = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.resetData){
				return this.component.elementNode.resetData();
			}
		};
		/**
		 * @utility refresh
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.refresh = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.refresh){
				return this.component.elementNode.refresh();
			}
		};
		/**
		 * @utility close
		 * @author mariswaran.sv
		 * @version 1.0.0
		 */
		this.$node.close = function(){
			if(!this.component.elementNode){
				this.component.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
			}
			if(this.component.elementNode && this.component.elementNode.close){
				return this.component.elementNode.close();
			}
		};

		/* initially cxFieldCompValue not getting updated so setData on init  */
			this.setData('cxFieldCompValue', this.getData('cxPropValue'));
	},
	didConnect : function(){
		/* set crux component node hold in this.elementNode  */
			this.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
		changeValue : function(value){
			/* Updating the cxPropValue to set value dynamically in widgets */
				if(this.data.cxPropComponentTypeName !== 'image'){	/* value of image component is path of stored files */
					var val = value;
					var innerComp = this.elementNode.component;
					if(value !== ""){
						/* in widgets cxPropDateInUserPattern and cxPropDatetimeInUserPattern both are true so gets the value in user pattern and set in cxPropValue */
							if(this.data.cxPropComponentTypeName === 'datetime'){
								val = innerComp.getValue({'userFormat' : true});
							}else{
								val = innerComp.getValue();
							}
					}

					this.setFromComp = true;
					if(this.data.cxPropValue !== val && this.data.cxPropComponentTypeName === 'datetime'){
						/* update value in property panel in widgets */
							if (this.getMethods('onBuilderPropertyUpdate')) {
								this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-value' : val});
							}else{
								this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-value' : val});
							}
					}
					/* Updating cxPropValue as value of cxPropValue of inner component(text) - value getting trimmed on getValue() for text issue fix */
					if(this.data.cxPropComponentTypeName === 'text' && val && innerComp.data.cxPropValue && val !== innerComp.data.cxPropValue && val === innerComp.data.cxPropValue.trim()){
						// this.setData('cxFieldCompValue', innerComp.data.cxPropValue);
						val =  innerComp.data.cxPropValue;
					}
					this.setData('cxPropValue', val);
					this.setFromComp = false;
				}
			if(this.getMethods('onValueChange')){
				/**
				 * This callback is fired when the value is changed from the input.
				 * @method onValueChange
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } value
				 * @condition cxPropComponentTypeName boolean, date, datetime, email, image, layout, lookup, number, phone, picklist, tag, textarea, text, twitter, user, website
				 */
				this.executeMethod('onValueChange', value); //no i18n
			}
		},
		valueError : function(errorRes){
			if(this.getMethods('onError')){
				/**
				 * This callback is fired when the error occurs.
				 * @method onError
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } errorRes
				 * @condition cxPropComponentTypeName date, datetime, email, lookup, twitter, website
				 */
				this.executeMethod('onError',errorRes); //no i18n
			}
		},
		/* not needed for widget */
		userComponentCustomRequest : function(instance, queryParam, arg){
			if(this.getMethods('onCustomRequest')){
				this.executeMethod('onCustomRequest',instance, queryParam, arg);
			}
		},
		renderElement : function(comp){
			if(this.getMethods('onElementRendered')){
				/**
				 * Called when element is rendered in viewport.
				 * @method onElementRendered
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName boolean, date, datetime, image, layout, lookup, number, phone, picklist, tag, textarea, text, user, website
				 */
				this.executeMethod('onElementRendered');
			}
		},
		clickElement : function(){
			if(this.getMethods('onClicked')){
				/**
				 * This callback is fired when the click is triggered.
				 * @method onClicked
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName boolean
				 */
				this.executeMethod('onClicked');
			}
		},
		changeDate : function(changeDetails){
			if(this.getMethods('onDateChange')){
				/**
				 * This method is invoked when the date is changed"
				 * @method onDateChange
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } changeDetails
				 * @condition cxPropComponentTypeName date
				 */
				this.executeMethod('onDateChange',changeDetails);
			}
		},
		openCalendar : function(){
			if(this.getMethods('onCalendarOpen')){
				/**
				 * This method is invoked after opening the calendar.
				 * @method onCalendarOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName date datetime
				 */
				this.executeMethod('onCalendarOpen');
			}
		},
		beforeCalendarClose : function(calendar, input, direct){
			if(this.getMethods('onBeforeCalendarClose')){
				/**
				 * This method is called before closing a calendar. It accepts promise.
				 * @method onBeforeCalendarClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName date datetime
				 */
				this.executeMethod('onBeforeCalendarClose');
			}
		},
		calendarClose : function(calendar, input){
			if(this.getMethods('onCalendarClose')){
				/**
				 * This method is invoked after closing the calendar.
				 * @method onCalendarClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName date
				 */
				this.executeMethod('onCalendarClose');
			}
		},
		beforeCalendarOpen : function(){
			if(this.getMethods('onBeforeCalendarOpen')){
				/**
				 * This method is invoked before opening calendar.
				 * @method onBeforeCalendarOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName date datetime
				 */
				this.executeMethod('onBeforeCalendarOpen');
			}
		},
		/* cxPropDisplayIcon is not exposed so onRightIconClick is not needed for widget */
		clickOnRightIcon : function(){
			if(this.getMethods('onRightIconClick')){
				this.executeMethod('onRightIconClick'); //no i18n
			}
		},
		moduleData : function(modId){
			if(_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard){
				return store.findRecord("module", modId).then(function (res) {
					return res[0];
				});
			}else if(this.getMethods('fetchModuleData')){
				/**
				 * This method is used to get the module data.
				 * @method fetchModuleData
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } modId
				 * @condition cxPropComponentTypeName lookup
				 */
				return this.executeMethod('fetchModuleData',modId); //no i18n
			}
		},
		getRecords : function(modId, params){
			if(_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard){
				var fieldMetaData = this.data.cxPropField;
				var customData = {
					fieldMeta : fieldMetaData,
					moduleId : modId,
					queryParams : params
				};
				let { moduleId, queryParams } = customData,
					lookupQpAndCustomData = {},
					lookupQueryParams = {},
					lookupCustomData = {};
				customData.parentModuleId = modId;
				// customData.currentPage = layoutComponentData && layoutComponentData.cxPropCurrentPage;
				try {
					lookupQpAndCustomData = this.lookupRecordsFetch(customData) || {};
					if (lookupQpAndCustomData.queryParams) {
						lookupQueryParams = lookupQpAndCustomData.queryParams;
					}
					if (lookupQpAndCustomData.customData) {
						lookupCustomData = lookupQpAndCustomData.customData;
					}
				} catch (e) {
					lookupQueryParams = queryParams || {};
					lookupCustomData = {};
				}
				return new Promise((resolve) => {
					store.findAll(moduleId, lookupQueryParams, undefined, undefined, lookupCustomData).then(
						(entityRecords) => {
							resolve(entityRecords);
						},
						(failureResponse) => {
							resolve(failureResponse);
						});
				});
				// return store.findAll(modId, undefined, undefined, undefined, params);
			}else if(this.getMethods('fetchRecords')){
				/**
				 * This method is used to get the records for the selected module.
				 * @method fetchRecords
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } modId
				 * @param { * } params
				 * @condition cxPropComponentTypeName lookup
				 */
				return this.executeMethod('fetchRecords', modId, params);
			}
		},
		elementOnBlur : function(event){
			// if(this.data.cxPropComponentTypeName === 'text'){
			// 	this.setData('cxPropValue', this.$node.getValue());
			// }
			if(this.getMethods('onBlur')){
				/**
				 * This method is called whenever the input is blured.
				 * @method onBlur
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName lookup, textarea, text
				 */
				this.executeMethod('onBlur', event);
			}
		},
		clickOnClear : function(event){
			if(this.getMethods('onClear')){
				/**
				 * This method is called whenever the input is cleared via close icon.
				 * @method onClear
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName lookup, user
				 */
				this.executeMethod('onClear', event);
			}
		},
		beforeAdd : function(selectItem, value, extra){
			if(this.getMethods('onBeforeAdd')){
				/**
				 * This callback is fired before the on-add callback.
				 * @method onBeforeAdd
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } selectItem
				 * @param { * } value
				 * @condition cxPropComponentTypeName picklist
				 */
				this.executeMethod('onBeforeAdd', selectItem, value);
			}
		},
		optionSelected : function(event, selected){
			if(this.getMethods('onOptionSelected')){
				/**
				 * This is fired when one of the options of the dropdown is selected. This is not fired for a multiselect dropdown.
				 * @method onOptionSelected
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } selected
				 * @condition cxPropComponentTypeName boolean, picklist
				 */
				this.executeMethod('onOptionSelected', event, selected);
			}
		},
		beforeShow : function(event){
			if(this.getMethods('onBeforeShow')){
				/**
				 * This is fired just before the dropdown is opened. You can decide whether to show or not to show the dropdown in this callback by returning the values.
				 * @method onBeforeShow
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName datetime, layout, phone, picklist, tag, user
				 */
				this.executeMethod('onBeforeShow', event);
			}
		},
		elementOnHide : function(event, component, arg3){
			if(this.getMethods('onHide')){
				/**
				 * This callback is fired when the dropdown is hidden.
				 * @method onHide
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName datetime, lookup, picklist, user
				 */
				this.executeMethod('onHide', event);
			}
		},
		elementOnFocus : function(event, component){
			if(this.getMethods('onFocus')){
				/**
				 * Called when the input is focused.
				 * @method onFocus
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName date, datetime, email, layout, lookup, number, tag, textarea, text, twitter, website
				 */
				this.executeMethod('onFocus', event);
			}
		},
		elementOnFocusOut : function(event, component){
			if(this.getMethods('onFocusOut')){
				/**
				 * Called when the input is focused out.
				 * @method onFocusOut
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @param { * } event
				 * @condition cxPropComponentTypeName textarea
				 */
				this.executeMethod('onFocusOut', event);
			}
		},
		userLimitErr : function(){
			if(this.getMethods('maxUserDropLimitErr')){
				/**
				 * This method is used to customise the error and it gets triggered only on reaching the max-limit.
				 * @method maxUserDropLimitErr
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName user
				 */
				this.executeMethod('maxUserDropLimitErr');
			}
		},
		userLookupModalClose : function(){
			if(this.getMethods('onUserLookupModalClose')){
				/**
				 * Called when user closes lookup modal.
				 * @method onUserLookupModalClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 * @condition cxPropComponentTypeName user
				 */
				this.executeMethod('onUserLookupModalClose');
			}
		}
	},
	/* map and find component to render */
	fieldMapping : async function(){
		var fieldValue = this.data.cxPropField;
		var elementsCond;

		/* gets the component name from ui_type/date_type in cxPropField data */
			if(fieldValue && fieldValue.ui_type){
				elementsCond = this.data.cxPropUiTypeToCruxMapping[fieldValue.ui_type];
			}else if(fieldValue && fieldValue.data_type){
				elementsCond = this.data.cxPropDataTypeToCruxMapping[fieldValue.data_type];
			}
		
		/* if the field is not available gets the component name from cxPropComponentTypeName or sets text as default */
			if(!elementsCond){
				if(this.data.cxPropComponentTypeName){
					elementsCond = this.data.cxPropDataTypeToCruxMapping[this.data.cxPropComponentTypeName];
				}else{
					elementsCond = 'text';
				}
			}

		/* callback after gets component name */
			if(this.getMethods("cxChangeElementsCondition")){
				elementsCond =  this.executeMethod('cxChangeElementsCondition', this.data.cxPropField, elementsCond);
			}

		this.setData('elementsCond', elementsCond);
		
		var setComponentTypeName = elementsCond;
		if(setComponentTypeName.includes('-')){
			setComponentTypeName = setComponentTypeName.replace('-','');
		}

		/* updating updateByCode to set default cxPropField data */
			if(setComponentTypeName !== this.data.cxPropComponentTypeName){
				this.setData('updateByCode', true);
			}

			/* _cruxUtils.isLyteWidgetBuild is true in run mode also. Lyte.PageBuilderWhiteboard is to check design lab or run mode */
			if(Lyte.PageBuilderWhiteboard){  
				var nodeId = this.$node.getAttribute('node-id');
				if(!nodeId){
					nodeId = this.$node.getAttribute('pb-css-id');
				}
				if(nodeId && !Lyte.PageBuilder.isDynamicValue(nodeId, "cx-prop-component-type-name")){
					/* update the cxPropComponentTypeName in properties panel in widgets (onBuilderPropertyUpdate is not available on init) */
						this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-component-type-name' : setComponentTypeName});
				}
			}
			
			
			this.setData('cxPropComponentTypeName', setComponentTypeName);

			if(fieldValue && (this.data.cxPropComponentTypeName === "picklist" || this.data.cxPropComponentTypeName === "user")){
				var typeValue = "single";
				var fieldUiType = fieldValue.ui_type;
				var fieldDataType = fieldValue.data_type;

				if( (fieldUiType && this.data.multiUiTypeCompMapping[fieldUiType] && this.data.multiUiTypeCompMapping[fieldUiType].includes('multi')) || (!fieldUiType && fieldDataType && this.data.cxPropDataTypeToCruxMapping[fieldDataType] && fieldDataType.includes('multi')) ){
					typeValue = "multiple";
				}
				this.setData('cxPropType', typeValue);
				/* update value in property panel in widgets */
					if (this.getMethods('onBuilderPropertyUpdate')) {
						this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-type' : typeValue});
					}else{
						this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-type' : typeValue});
					}
			}
			
			this.setData('updateByCode', false);
		// if (this.getMethods('onBuilderPropertyUpdate')) {
		// 	this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-component-type-name' : setComponentTypeName});
		// }

		/* get and set module api name (cxPropModuleApiName) */
			this.pauseObserver = true;
			
			if(fieldValue && fieldValue.field_label && fieldValue.field_label !== ''){
				this.setData('cxPropFieldLabel', ((fieldValue.field_label)?fieldValue.field_label:''));
				/* update the cxPropFieldLabel in properties panel in widgets (onBuilderPropertyUpdate is not available on init) */
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field-label' : this.data.cxPropFieldLabel});
			}else if(!fieldValue || (fieldValue && !fieldValue.field_label)){
				this.setData('cxPropFieldLabel', '');
				/* update the cxPropFieldLabel in properties panel in widgets (onBuilderPropertyUpdate is not available on init) */
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field-label' : this.data.cxPropFieldLabel});
			}

			/* update Module Api Name by module id given in field meta data */
				if(!this.callFromObs){
					if(elementsCond === 'lookup' && fieldValue && fieldValue.lookup && fieldValue.lookup.module && fieldValue.lookup.module.id){
						var modId = fieldValue.lookup.module.id;
						if(idModuleMapping[modId]){
							this.setData('cxPropModuleApiName', idModuleMapping[modId]);
						}else{
							this.setData('cxPropModuleApiName', '');
						}
					}else{
						this.setData('cxPropModuleApiName', '');
					}
				}

			/* update the cxPropFieldLabel in properties panel in widgets (onBuilderPropertyUpdate is not available on init) */
				this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-module-api-name' : this.data.cxPropModuleApiName});

			/* update Field Api Name by module id given in field meta data */
				if(this.data.cxPropModule && moduleRecordMapping[this.data.cxPropModule] && fieldValue && fieldValue.id){
					var _self = this;
					await store.findAll('field', {module : _self.data.cxPropModule}, undefined, undefined, {apiVersion : '6'}).then(function(resp){
						var flag = false;
						var curr_field = resp.filter(function(field){
							if(field.id === fieldValue.id){
								flag = true;
								return field;
							}
						});
						if(flag){
							fieldValue.api_name = curr_field[0].api_name;
							_self.setData('cxPropFieldApiName', fieldValue.api_name);
						}else{
							fieldValue.api_name = '';
							_self.setData('cxPropFieldApiName', '');
						}
						/* update the cxPropFieldLabel in properties panel in widgets (onBuilderPropertyUpdate is not available on init) */
							_self.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field-api-name' : _self.data.cxPropFieldApiName});
					});
				}

			delete this.pauseObserver;

		/* get and set lookup icon from cxPropField (meta-data) */
			this.getAndSetLookupIcon();

	}.observes('cxPropField').on('init'),
	/* set error message if the expected(mandatory) data's are not available */
	fieldErrorCheck : async function(){
		var fieldValue = this.data.cxPropField;
		var elementsCond = this.data.elementsCond;
		var errorMsg = "";
		var _self = this;
		if(this.data.cxPropMode === "create"){	/* view case not have any required data */
			/* check required data's for expected components */
				if(elementsCond === 'image'){	/* check required data's for image component and set error message */
					if(!this.data.cxPropModule && !((fieldValue && fieldValue.id) || this.data.cxPropFieldApiName)){
						errorMsg += "Required: Mandatory module property is empty and either Field Api Name (cxPropFieldApiName) or Field property and Field Id (field.id) in Field property must be provided.";
					}else if(!this.data.cxPropModule){
						errorMsg = "Required: Mandatory module property is empty.";
					}else if(!((fieldValue && fieldValue.id) || this.data.cxPropFieldApiName) && this.data.cxPropModule){
						if(!moduleRecordMapping[this.data.cxPropModule]){
							errorMsg = "Required: Mandatory Module (cxPropModule) is invalid";
							if(!((fieldValue && fieldValue.id) || this.data.cxPropFieldApiName)){
								errorMsg += " and Either Field Api Name (cxPropFieldApiName) or Field property and Field Id (field.id) in Field property must be provided.";
							}else{
								errorMsg += ".";
							}
						}else{
							errorMsg = "Required: Either Field Api Name (cxPropFieldApiName) or Field property and Field Id in Field property (field.id) must be provided.";
						}
					}else if((fieldValue && fieldValue.id || this.data.cxPropFieldApiName) && this.data.cxPropModule){
						if(!moduleRecordMapping[this.data.cxPropModule]){
							errorMsg = "Required: Mandatory Module (cxPropModule) is invalid";
						}else{
							if(fieldValue && fieldValue.id){
								/* find record with given field id to show error if the field id is invalid */
									await store.findAll('field', {module : _self.data.cxPropModule}, undefined, undefined, {apiVersion : '6'}).then(function(resp){
										var flag = false;
										var curr_field = resp.filter(function(field){
											if(field.id === fieldValue.id){
												flag = true;
												return field;
											}
										});
										if(flag){
											fieldValue.api_name = curr_field[0].api_name;
											_self.setData('cxPropFieldApiName', fieldValue.api_name);
										}else{
											errorMsg += "Required: Field Id in Field property (field.id) is invalid.";
											// 	if(errorMsg !== "" && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
											// 		_self.setData('dxHubCheck', true);
											// 		_self.setData('dxHubError', true);
											// 		_self.setData('dxHubErrorMessage', errorMsg);
											// 	}
										}
									});
							}else{
								/* find record with given field api name to show error if the field api name is invalid */
									await store.findAll('field', {module : _self.data.cxPropModule},undefined,undefined,{apiVersion : '6'}).then(function(resp){
										var flag = false;
										var curr_field = resp.filter(function(field){
											if(field.api_name === _self.data.cxPropFieldApiName){
												flag = true;
												return field;
											}
										});
										if(flag){
											fieldValue.id = curr_field[0].id;
										}else{
											errorMsg += "Required: Field Api Name (cxPropFieldApiName) is invalid.";
										// 	if(errorMsg !== "" && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
										// 		_self.setData('dxHubCheck', true);
										// 		_self.setData('dxHubError', true);
										// 		_self.setData('dxHubErrorMessage', errorMsg);
										// 	}
										}
									}); 
							}
						}
					}
				}else if(elementsCond === 'lookup' || elementsCond === 'layout' || elementsCond === 'tag'){
					if(elementsCond === 'lookup'){		/* check required data's for lookup component and set error message */
						if(!(fieldValue && fieldValue.lookup && fieldValue.lookup.module && fieldValue.lookup.module.id) && !this.data.cxPropModuleApiName){
							errorMsg = "Required: Field property and Lookup module id in Field property (field.lookup.module.id) or Module Api Name (cxPropModuleApiName) must be provided.";
						}else if(fieldValue && fieldValue.lookup && fieldValue.lookup.module && fieldValue.lookup.module.id && !idModuleMapping[fieldValue.lookup.module.id]){
							errorMsg = "Required: Mandatory Lookup module id in Field property (field.lookup.module.id) is invalid.";
						}else if(this.data.cxPropModuleApiName && !moduleRecordMapping[this.data.cxPropModuleApiName]){
							errorMsg = "Required: Mandatory Module Api Name (cxPropModuleApiName) is invalid.";
						}
					}else if(elementsCond !== 'lookup'){		/* check required data's for tag and layout component and set error message */
						if(!this.data.cxPropModule){
							errorMsg = "Required: Mandatory module property is empty.";
						}else if(!moduleRecordMapping[this.data.cxPropModule]){
							errorMsg = "Required: Mandatory Module (cxPropModule) is invalid.";
						}
					}
				}else if(elementsCond === 'picklist' && !(this.data.cxPropPicklistValues || (fieldValue && fieldValue.pick_list_values))){		/* check required data's for picklist component and set error message */
					errorMsg = "Required: Either a PicklistValues or a pick_list_values in Field property (field.pick_list_values) must be provided.";
				}else if((elementsCond === 'date' || elementsCond === 'date-time')){	/* check required data's for date and date-time component and set error message */
					var dateFormat = this.data.cxPropDatePattern.toUpperCase();
					var validateProp;
					var is_valid = true;
					var minDate = this.data.cxPropMinDate;
					var maxDate = this.data.cxPropMaxDate;
					if(minDate !== '' && maxDate !== '' && !$L.moment(minDate, dateFormat)._isValid && !$L.moment(maxDate, dateFormat)._isValid){
						validateProp = 'cxPropMinDate and cxPropMaxDate';
						is_valid = false;
					}else if(minDate !== '' && !$L.moment(minDate, dateFormat)._isValid){
						validateProp = 'cxPropMinDate';
						is_valid = false;
					}else if(maxDate !== '' && !$L.moment(maxDate, dateFormat)._isValid){
						validateProp = 'cxPropMaxDate';
						is_valid = false;
					}
					if(!is_valid){
						errorMsg = "Invalid Date: "+validateProp+" value should be provided in "+dateFormat+" pattern.";
					}
				}
		}

		/* check to set error message for widgets feature */
			if(errorMsg !== "" && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
				this.setData('dxHubCheck', true);
				this.setData('dxHubError', true);
				this.setData('dxHubErrorMessage', errorMsg);
			}else{
				this.setData('dxHubCheck', false);
				this.setData('dxHubError', false);
			}
	}.observes('cxPropField','cxPropModule','cxPropPicklistValues', 'cxPropMode', 'cxPropMinDate', 'cxPropMaxDate').on('init'),
	/* get and set default field data's */
	observeComponentType : function(change){
		setTimeout(() => {
			if((this.data.cxPropValue || (this.data.cxPropValue === false && change.oldValue === 'boolean')) && change && change.item){
				var val = '';
				if(change.newValue === 'boolean'){
					val = false;		/* set default value for boolean component */
				}
				/* update value in property panel in widgets */
					if (this.getMethods('onBuilderPropertyUpdate')) {
						this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-value' : val});
					}else{
						this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-value' : val});
					}
				this.setData('cxPropValue', val);
			}
		}, 0);
		if(!this.data.updateByCode){
			/* get default field data's */
				var defField = (!(change && change.item) && this.data.cxPropField) ? this.data.cxPropField : this.getDefaultField();
			/* set default field data's if the ui_type is different */
				if(defField && this.data.cxPropField && ((defField['ui_type'] && this.data.cxPropField['ui_type'] && this.data.cxPropUiTypeToCruxMapping[defField['ui_type']] !== this.data.cxPropUiTypeToCruxMapping[this.data.cxPropField['ui_type']]) || (defField['data_type'] && this.data.cxPropField['data_type'] && this.data.cxPropDataTypeToCruxMapping[defField['data_type']] !== this.data.cxPropDataTypeToCruxMapping[this.data.cxPropField['data_type']]))){
					this.setData('cxPropField', defField);		/* set default field data's */

					/* update default field data's in property panel in widgets */
						if (this.getMethods('onBuilderPropertyUpdate')) {
							this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(this.data.cxPropField)});
						}
				}
				if(this.data.cxPropModule && change && change.item){
					this.setData('cxPropModule', "");		/* set default field data's */

					/* update default field data's in property panel in widgets */
						if (this.getMethods('onBuilderPropertyUpdate')) {
							this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-module' : this.data.cxPropModule});
						}
				}
		}else{
			this.setData('updateByCode', false);
		}

		/* set date pattern as placeholder */
			if((this.data.cxPropComponentTypeName === 'date' || this.data.cxPropComponentTypeName === 'datetime') && !this.data.cxPropPlaceholder){
				var datePattern = this.data.cxPropDatePattern.toUpperCase();
				this.setData('cxPropPlaceholder', datePattern);
			}else if(change && change.oldValue && change.newValue && ((change.oldValue === 'date' || change.oldValue === 'datetime') && (change.newValue !== 'date' && change.newValue !== 'datetime'))){
				this.setData('cxPropPlaceholder', "");
			}
				
			/* update value in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-placeholder' : this.data.cxPropPlaceholder});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-placeholder' : this.data.cxPropPlaceholder});
				}

		/* set crux component node hold in this.elementNode  */
			this.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
	}.observes('cxPropComponentTypeName').on('init'),
	/* create an url to store image */
	observeToCreateUrl : function(){
		if( (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard) && this.data.elementsCond === 'image' && this.data.cxPropModule && this.data.cxPropField && this.data.cxPropField.id ){
			var url_img = Crm.getCrmBasePath()+"/fileattach.do?action=imageUFBlobAttach&fieldId="+this.data.cxPropField.id+"&module="+this.data.cxPropModule+"&type=image";
			var image_url = {
				url : url_img,
				headers : store.adapter.application.headersForRequest()
			};
			this.setData('cxPropAjax', image_url);
		}
	}.observes('cxPropComponentTypeName', 'cxPropModule', 'cxPropField').on('didConnect'),
	getDefaultField : function(){
		/* create default field value */
		var elementName = this.data.cxPropComponentTypeName;
		var fieldValue = this.data.cxPropField;
		if(fieldValue){
			var fieldUiType = fieldValue.ui_type;
			var fieldDataType = fieldValue.data_type;
			if((fieldUiType && this.data.multiUiTypeCompMapping[fieldUiType] && this.data.cxPropDataTypeToCruxMapping[this.data.multiUiTypeCompMapping[fieldUiType]] === elementName) || (fieldDataType && this.data.cxPropDataTypeToCruxMapping[fieldDataType] === elementName)){
				elementName = fieldDataType ? fieldDataType : this.data.multiUiTypeCompMapping[fieldUiType];
			}
		}
		var defaultFieldVal = {
			"boolean": {
				"field_label": "Checkbox",
				"api_name": "Checkbox_2",
				"ui_type": 301,
				"data_type": "boolean"
			},
			"date": {
				"field_label": "Date",
				"api_name": "Date_1",
				"ui_type": 202,
				"data_type": "date"
			},
			"datetime": {
				"field_label": "Date/Time",
				"api_name": "Date_Time_1",
				"ui_type": 333,
				"data_type": "datetime"
			},
			"email": {
				"field_label": "Email",
				"api_name": "Email_1",
				"ui_type": 25,
				"data_type": "email"
			},
			"image": {
				"field_label": "Image Upload",
				"id": "",
				"api_name": "Image_Upload_1",
				"ui_type": 556,
				"data_type": "imageupload"
			},
			"layout": {
				"field_label": "Layout",
				"api_name": "Layout",
				"ui_type": 208,
				"data_type": "bigint"
			},
			"lookup": {
				"field_label": "Lookup",
				"api_name": "Leads_CF_Lookup",
				"ui_type": 133,
				"lookup": {
					"module": {
						"id": ""
					},
					"id": ""
				},
				"data_type": "lookup"
			},
			"number": {
				"field_label": "Number",
				"api_name": "Number_1",
				"ui_type": 32,
				"currency": {},
				"data_type": "integer",
				"formula": {},
				"decimal_place": null
			},
			"phone": {
				"field_label": "Phone",
				"api_name": "Phone",
				"ui_type": 33,
				"length": 30,
				"data_type": "phone"
			},
			"picklist": {
				"field_label": "Pick List",
				"api_name": "Pick_List_1",
				"pick_list_values": [
					{
						"display_value": "-None-",
						"actual_value": "-None-"
					},
					{
						"display_value": "Option 1",
						"actual_value": "Option 1"
					},
					{
						"display_value": "Option 2",
						"actual_value": "Option 2"
					}
				],
				"ui_type": 2,
				"data_type": "picklist"
			},
			"multiselectpicklist": {
				"field_label": "Multi Select Picklist",
				"api_name": "Multi_Select_Picklist_1",
				"pick_list_values": [
					{
						"display_value": "Option 1",
						"actual_value": "Option 1"
					},
					{
						"display_value": "Option 2",
						"actual_value": "Option 2"
					},
					{
						"display_value": "Option 3",
						"actual_value": "Option 3"
					}
				],
				"ui_type": 100,
				"data_type": "multiselectpicklist"
			},
			"tag": {
				"field_label":"Tag",
				"api_name":"Tag",
				"ui_type":209,
				"data_type":"text"
			},
			"text": {
				"field_label":"Contact Name",
				"api_name":"Contact_Name",
				"ui_type":1,
				"data_type":"text"
			},
			"textarea": {
				"field_label": "Plain Multi-Line",
				"textarea": {
					"type": "small"
				},
				"api_name": "Plain_Multi_Line",
				"ui_type": 110,
				"data_type": "textarea"
			},
			"twitter": {
				"field_label": "Twitter",
				"api_name": "Twitter",
				"ui_type": 22,
				"data_type": "text"
			},
			"user": {
				"field_label": "User",
				"api_name": "User_1",
				"ui_type": 221,
				"data_type": "userlookup"
			},
			"multiuserlookup": {
				"field_label": "Multi User Lookup",
				"api_name": "Multi_User_Lookup_1",
				"ui_type": 445,
				"data_type": "multiuserlookup"
			},
			"website": {
				"field_label": "Website",
				"api_name": "Website",
				"ui_type": 21,
				"data_type": "website"
			}
		};
		var fieldVal = {};
		if(elementName && defaultFieldVal[elementName]){
			fieldVal = defaultFieldVal[elementName];
		}
		return fieldVal;
	},
	getLookupIconClass: function (lookupFieldData) {
		/* find lookup icon class */
		if (["multiselectlookup", "lookup"].indexOf(lookupFieldData.data_type) === -1) {
			return "";
		}
		var corres_moduleName, isCustommodule = false, returnValue = "cxModulecustomModule", havemoduleId = true;
		if (lookupFieldData.data_type === 'multiselectlookup') {
			corres_moduleName = lookupFieldData.multiselectlookup.connected_module.api_name;
			if (!lookupFieldData.multiselectlookup.connected_module.id) {
				havemoduleId = false;
			}
			if (lookupFieldData.multiselectlookup.connected_module && lookupFieldData.multiselectlookup.connected_module.hasOwnProperty("generated_type")) {
				isCustommodule = lookupFieldData.multiselectlookup.connected_module.generated_type === 'default' ? false : true;//no i18n
			}
		} else if (lookupFieldData.data_type === 'lookup') {
			corres_moduleName = (lookupFieldData.lookup.module.id && idModuleMapping[lookupFieldData.lookup.module.id]) ? idModuleMapping[lookupFieldData.lookup.module.id] : this.data.cxPropModuleApiName ? moduleRecordMapping[this.data.cxPropModuleApiName] : lookupFieldData.lookup.module.api_name;
			if (!lookupFieldData.lookup.module.id) {
				havemoduleId = false;
			}
			if (lookupFieldData.lookup.module && lookupFieldData.lookup.module.hasOwnProperty("generated_type")) {
				isCustommodule = lookupFieldData.lookup.module.generated_type === 'default' ? false : true;//no i18n
			} else if (havemoduleId) {
				let lookupModuleRecord = store.peekRecord('module', lookupFieldData.lookup.module.id);
				corres_moduleName = (lookupModuleRecord && lookupModuleRecord.api_name) ? lookupModuleRecord.api_name : corres_moduleName;
				if (lookupModuleRecord && lookupModuleRecord.hasOwnProperty("generated_type")) {
					isCustommodule = lookupModuleRecord.generated_type === 'default' ? false : true;//no i18n
				}
			}
		}
		if (isCustommodule === false) {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : 'cxModule' + corres_moduleName;//no i18n
		} else {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : "cxModulecustomModule";	//no i18n
		}
		return returnValue;
	},
	/* get records for lookup */
	lookupRecordsFetch: function (customData) {
		let returnCustomData = {}, returnQueryParams = {},
			{ queryParams, fieldMeta, parentModuleId, currentPage, formData } = customData;
		returnQueryParams = $L.extend(true, {}, queryParams || {});
		fieldMeta = fieldMeta || {};
		let isSearchQuery = returnQueryParams.filters ? true : false,
			lookupModuleId = fieldMeta.lookup && fieldMeta.lookup.module ? fieldMeta.lookup.module.id : undefined,
			isCustomField = fieldMeta.custom_field;
		if (!(fieldMeta.lookup && fieldMeta.lookup.query_details && fieldMeta.lookup.query_details.query_id)) {
			delete returnQueryParams.child_data;
		}
		if (isSearchQuery) {
			returnCustomData.from = "Lookup";//NO I18N
			returnCustomData.type = "Search";//NO I18N
			returnCustomData.criteria = returnQueryParams.criteria = returnQueryParams.filters;
			delete returnQueryParams.filters;
		}
		let fieldmeta_criteria = fieldMeta.criteria;
		if (fieldmeta_criteria && fieldmeta_criteria.criteria) {
			if (!returnCustomData.hasOwnProperty('type')) {
				returnCustomData.type = "Search";//NO I18N
			}
			if (!returnCustomData.hasOwnProperty('from')) {
				returnCustomData.from = "Lookup";//NO I18N
			}
			returnCustomData.criteria = returnQueryParams.criteria = returnCustomData.criteria ? fieldmeta_criteria ? `(${returnCustomData.criteria} and ${fieldmeta_criteria.criteria})` : returnCustomData.criteria : fieldmeta_criteria.criteria;
			delete returnQueryParams.filters;
			if (fieldMeta.lookup && fieldMeta.lookup.query_details && fieldMeta.lookup.query_details.query_id) {
				returnQueryParams.query_id = fieldMeta.lookup.query_details.query_id;
			}
		}
		returnQueryParams.approved = "both";//NO I18N
		returnQueryParams.approval_state = "approved,approval_process_pending,approval_process_rejected";//NO I18N
		let lookupModuleRecord = store.peekRecord('module', lookupModuleId);
		if (lookupModuleRecord && lookupModuleRecord.module_name === 'Products') { //no i18n
			let productModuleFields = lookupModuleRecord.fields || [],
				productActiveField = productModuleFields.filter(function (mFields) { return mFields.api_name === 'Product_Active'; })[0],//no i18n
				profile = productActiveField && productActiveField.profiles ? productActiveField.profiles.some(function (profile) { return typeof Crm !== 'undefined' && Crm.userDetails.PROFILE_NAME === profile && profile.name; })[0] : undefined;
			if (productActiveField && ((profile && profile.permission_type !== "hidden") || productActiveField.visible)) {
				returnQueryParams = this.queryParamsConstructor(Lyte.deepCopyObject(returnQueryParams), "(Product_Active:equals:true)"); //no i18n
			}
		}
		if (lookupModuleId === parentModuleId && !isCustomField && currentPage === 'edit') { //no i18n
			let recordId = formData.id;
			returnQueryParams = this.queryParamsConstructor(Lyte.deepCopyObject(returnQueryParams), "(id:not_equal:" + recordId + ")");//no i18n
		}
		if (returnQueryParams.criteria) {
			if (!returnCustomData.hasOwnProperty('type')) {
				returnCustomData.type = "Search";//NO I18N
			}
			if (!returnCustomData.hasOwnProperty('from')) {
				returnCustomData.from = "Lookup";//NO I18N
			}
			returnCustomData.criteria = returnQueryParams.criteria;
		}
		return {
			queryParams: returnQueryParams,
			customData: returnCustomData
		};
	},
	getAndSetLookupIcon : function(){
		if(this.data.elementsCond === 'lookup'){
			var iconClass;
			/* get lookup icon class */
				if((this.data.cxPropField && this.data.cxPropField.lookup && this.data.cxPropField.lookup.module) || (this.data.cxPropModuleApiName && this.data.cxPropModuleApiName !== '')){
					iconClass = this.getLookupIconClass(this.data.cxPropField);
				}
			/* set lookup icon class */
				if(iconClass && iconClass !== 'cxModule'){
					this.setData('cxPropIconClass', iconClass);
				}else{
					this.setData('cxPropIconClass', 'cxModulecustomModule');		/* if the icon class get from getLookupIconClass is not valid sets custom icon class */
				}
		}
	},
	observeCxPropValue : function(change){
		if(!this.setFromComp){
			/* to remove error message on value change */
			if(this.data.cxPropErrorMessage && this.data.cxPropErrorMessage !== ''){
				this.setData('cxPropErrorMessage', '');
				/* update field in property panel in widgets */
					if (this.getMethods('onBuilderPropertyUpdate')) {
						this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-error-message' : this.data.cxPropErrorMessage});
					}else{
						this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-error-message' : this.data.cxPropErrorMessage});
					}
			}
			/* To check if the given value is in Api Format or user format to set cxPropDateInUserPattern/cxPropDatetimeInUserPattern */
			if(this.data.cxPropComponentTypeName === 'date' || this.data.cxPropComponentTypeName === 'datetime'){
				var compValue = (change && change.newValue) ? change.newValue : this.data.cxPropValue;
				var propName = (this.data.cxPropComponentTypeName === 'date') ? 'cxPropDateInUserPattern' : 'cxPropDatetimeInUserPattern';
				var valueInApiFormat = (this.data.cxPropComponentTypeName === 'date') ? ($L.moment(compValue, 'YYYY-MM-DD')._isValid) : compValue.includes('T') && ($L.moment(compValue, 'YYYY-MM-DDTHH:mm:ss')._isValid);
				valueInApiFormat = (valueInApiFormat) ? false : true;
				this.setData(propName, valueInApiFormat);
			}
			/* to check if the date is valid or not */
			if(this.data.cxPropComponentTypeName === 'datetime'){
				var timeFormat = this.data.cxPropTimeFormat;
				if(!timeFormat){
					timeFormat = (typeof Crm !== "undefined") ? Crm.userDetails.TIME_FORMAT : "HH:mm";
				}

				if(this.data.cxPropValue && !$L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue, this.data.cxPropDatePattern.toUpperCase()+" "+timeFormat, {i18n : true})._isValid){
					/* if the value is not valid then set error message */
					var dateFormat = this.data.cxPropDatePattern.toUpperCase();
					var msg = "Invalid Date: The date and time value must be provided in the following format. ("+dateFormat+" "+timeFormat+")";
					if(!this.data.dxHubCheck){
						this.setData('dxHubCheck', true);
						this.setData('dxHubError', true);
					}
					this.setData('dxHubErrorMessage', msg);
					this.showDateTimeWarning = false;		/* to prevent showing warning message on every value change */
				}else if(this.data.dxHubCheck && this.data.dxHubErrorMessage !== 'loading'){
					this.setData('dxHubCheck', false);
					this.setData('dxHubError', false);
					this.setData('dxHubErrorMessage', '');
					if(!this.showDateTimeWarning){
						this.showDateTimeWarning = true;		/* to prevent showing warning message on every value change */
					}
					// this.setData('cxFieldCompValue', this.data.cxPropValue);
				}

			}
			setTimeout(() => {
				if(this.data.cxPropComponentTypeName === 'datetime' && this.showDateTimeWarning){
					var dateFormat = this.data.cxPropDatePattern.toUpperCase();
					var timeFormat = this.data.cxPropTimeFormat || (typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : "HH:mm");
					var msg = "The date and time value must be provided in the value attribute in the following format. ("+dateFormat+" "+timeFormat+")";
					_cruxUtils.showCustomMessage({params : {ltPropType : 'warning',ltPropMessage : msg}});
				}else if(!this.showDateTimeWarning){
					this.showDateTimeWarning = true;		/* to prevent showing warning message on every value change */
				}
			}, 100);
			// if(this.data.cxPropComponentTypeName !== 'datetime'){
				// }
		}
		// var fieldCompValue = this.data.cxPropValue;
		// var innerCompValue = this.elementNode ? (this.elementNode.component.data.cxPropValue ? this.elementNode.component.data.cxPropValue : undefined) : undefined;
		/* set value to component in field component except text component - cxPropValue got trimmed from crux-text-component getValue() - so prevent updating cxPropValue of field to text */
			// if(this.data.cxPropComponentTypeName !== 'text' || (!innerCompValue || !fieldCompValue || !(innerCompValue !== fieldCompValue && innerCompValue.trim() === fieldCompValue))){
				this.setData('cxFieldCompValue', this.data.cxPropValue);		/* to set value to component in field component */
			// }

		/* get and set lookup icon from cxPropField (meta-data) */
			this.getAndSetLookupIcon();
	}.observes('cxPropValue'),
	observeErrorMessage : function(){
		if(typeof this.data.cxPropErrorMessage === "undefined"){
			this.setData("cxPropErrorMessage", "");
		}
	}.observes("cxPropErrorMessage").on("init"),
	/* while type changes need to rerender component to prevent arrow ui issues */
	observeTypeForDropdown : function(change){
		if(this.data.cxPropComponentTypeName === 'picklist' || this.data.cxPropComponentTypeName === 'user'){
			this.setData('dxHubCheck', true);
			this.setData('dxHubErrorMessage', 'loading');

			/* if type is multiple set data_type and ui_type for multiselectpicklist or multiuserlookup */
			var fieldVal = this.data.cxPropField;
			if(!fieldVal){
				fieldVal = this.getDefaultField();
			}
			if((this.data.cxPropType === "multiple" || (change && change.newValue === "multiple")) && fieldVal){
				if(this.data.cxPropComponentTypeName === "picklist"){
					fieldVal.data_type = "multiselectpicklist";
					fieldVal.ui_type = 100;
				}else if(this.data.cxPropComponentTypeName === "user"){
					fieldVal.data_type = "multiuserlookup";
					fieldVal.ui_type = 445;
				}
			}else if((this.data.cxPropType === "single" || (change && change.newValue === "single")) && fieldVal){
				if(this.data.cxPropComponentTypeName === "picklist"){
					fieldVal.data_type = "picklist";
					fieldVal.ui_type = 2;
				}else if(this.data.cxPropComponentTypeName === "user"){
					fieldVal.data_type = "user";
					fieldVal.ui_type = 8;
				}
			}

			this.setData('cxPropField', fieldVal);
			/* update field in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldVal)});
				}

			this.setData('dxHubErrorMessage', '');
			this.setData('dxHubCheck', false);
			
			/* set crux component node hold in this.elementNode  */
				this.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
		}
	}.observes("cxPropType"),
	/* update date and time value related to the format (value is not getting update on date pattern change and on time format change) */
	updateDateTimeFormat : function(opt) {
		if(this.data.cxPropComponentTypeName === 'datetime'){
			/* rerendering datetime component using widgets error check to prevent format and value mismatch in component */
				if(!this.data.dxHubCheck){
					this.setData('dxHubCheck', true);
					this.setData('dxHubErrorMessage', 'loading');
				}

			var newVal;
			var oldDateObj;
			var timeFormat = this.data.cxPropTimeFormat;
			if(opt.item === 'cxPropDatePattern'){
				var oldDatePattern = opt.oldValue.toUpperCase();
				if(oldDatePattern === this.data.cxPropPlaceholder){
					/* update value in property panel in widgets */
						if (this.getMethods('onBuilderPropertyUpdate')) {
							this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-placeholder' : opt.newValue.toUpperCase()});
						}else{
							this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-placeholder' : opt.newValue.toUpperCase()});
						}
					this.setData('cxPropPlaceholder', opt.newValue.toUpperCase());
				}
				if(!timeFormat){
					timeFormat = (typeof Crm !== "undefined") ? Crm.userDetails.TIME_FORMAT : "HH:mm";
				}
				oldDateObj = $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,oldDatePattern.toUpperCase()+" "+timeFormat,{i18n : true});
				if(oldDateObj && !oldDateObj._isValid && $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,opt.newValue.toUpperCase()+" "+timeFormat,{i18n : true})._isValid){
					oldDateObj = $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,opt.newValue.toUpperCase()+" "+timeFormat,{i18n : true});
				}
				newVal = oldDateObj.format(opt.newValue.toUpperCase()+" "+timeFormat);
			}else if(opt.item === 'cxPropTimeFormat'){
				var oldTimeFormat = opt.oldValue;
				oldDateObj = $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,this.data.cxPropDatePattern.toUpperCase()+" "+oldTimeFormat,{i18n : true});
				if(!oldDateObj._isValid && $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,this.data.cxPropDatePattern.toUpperCase()+" "+opt.newValue,{i18n : true})._isValid){
					oldDateObj = $L.moment(this.data.cxPropValue ? this.data.cxPropValue.trim() : this.data.cxPropValue,this.data.cxPropDatePattern.toUpperCase()+" "+opt.newValue,{i18n : true});
				}
				newVal = oldDateObj.format(this.data.cxPropDatePattern.toUpperCase()+" "+opt.newValue);
			}

			var timeFlag = false;
			this.showDateTimeWarning = false;
			if(opt.item === 'cxPropTimeFormat'){
				if(this.data.cxPropTimeFormat && this.data.cxPropTimeFormat === "hh:mm A"){
					this.setData('cxTimeFormat', "hh:mm a");
				}else{
					this.setData('cxTimeFormat', this.data.cxPropTimeFormat);
				}
				if(!this.data.cxPropValue && opt.oldValue){
					timeFlag = true;
					oldDateObj._dateObj.setMinutes(0);
					oldDateObj._dateObj.setSeconds(0);
					var val = $L.moment(oldDateObj._dateObj).format(this.data.cxPropDatePattern.toUpperCase()+" "+opt.newValue);
					/* update value in property panel in widgets */
						if (this.getMethods('onBuilderPropertyUpdate')) {
							this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-value' : val});
						}else{
							this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-value' : val});
						}
					this.setData('cxPropValue', val);
				}
			}
			if(newVal && this.data.cxPropValue && this.data.cxPropValue !== '' && !timeFlag){		// to prevent setting today date as dafault
				/* update value in property panel in widgets */
					if (this.getMethods('onBuilderPropertyUpdate')) {
						this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-value' : newVal});
					}else{
						this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-value' : newVal});
					}
				this.setData('cxPropValue', newVal);
				if(this.data.dxHubCheck && this.data.dxHubErrorMessage !== 'loading'){
					this.setData('dxHubCheck', false);
					this.setData('dxHubError', false);
					this.setData('dxHubErrorMessage', '');
				}
			}

			/* rerendering datetime component using widgets error check to prevent format and value mismatch in component */
				if(this.data.dxHubCheck && this.data.dxHubErrorMessage === 'loading'){
					this.setData('dxHubErrorMessage', '');
					this.setData('dxHubCheck', false);
				}

			/* set crux component node hold in this.elementNode  */
				this.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
		}else if(this.data.cxPropComponentTypeName === 'date' && opt.item === 'cxPropDatePattern' && opt.oldValue.toUpperCase() === this.data.cxPropPlaceholder){
			/* update value in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-placeholder' : opt.newValue.toUpperCase()});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-placeholder' : opt.newValue.toUpperCase()});
				}
			this.setData('cxPropPlaceholder', opt.newValue.toUpperCase());
		}
	}.observes("cxPropDatePattern", "cxPropTimeFormat"),
	obsCxTimeFormatInput : function() {
		if(!this.setTimeFormatInput){
			var timeFormatInput = this.data.cxPropHoursFormat;
			if(!timeFormatInput){
				timeFormatInput = ((typeof Crm !== "undefined") && Crm.userDetails.TIME_FORMAT === "HH:mm") ? "24" : "12";
			}
			if(this.data.cxPropHoursFormat !== timeFormatInput){
				this.setTimeFormatInput = true;		// to prevent infinite loop
				this.setData('cxPropHoursFormat', timeFormatInput);
			}
			/* set time format based on cxPropHoursFormat */
				var timeFormat = this.data.cxPropHoursFormat === "12" ? "hh:mm A" : "HH:mm";
				this.setData('cxPropTimeFormat', timeFormat);
				this.setData('cxTimeFormatInput', this.data.cxPropHoursFormat);		// to prevent child observe call

			if(this.setTimeFormatInput){
				delete this.setTimeFormatInput;		// to prevent infinite loop
			}
		}
	}.observes("cxPropHoursFormat").on("didConnect"),
	obsModuleApiName : function(change){
		var fieldData = this.data.cxPropField;
		if(this.data.cxPropModuleApiName && this.data.cxPropModuleApiName !== '' && !this.pauseObserver && change && change.item && this.data.elementsCond === 'lookup'){
			if(moduleRecordMapping[this.data.cxPropModuleApiName]){
				if(fieldData && fieldData.lookup && fieldData.lookup.module){
					fieldData.lookup.module.id = moduleRecordMapping[this.data.cxPropModuleApiName].id;
				}else if(fieldData && fieldData.lookup){
					fieldData.lookup.module = {'id' : moduleRecordMapping[this.data.cxPropModuleApiName].id};
				}else if(fieldData){
					fieldData.lookup = {'module' : {'id' : moduleRecordMapping[this.data.cxPropModuleApiName].id}};
				}else{
					fieldData = {'lookup' : {'module' : {'id' : moduleRecordMapping[this.data.cxPropModuleApiName].id}}};
				}

				// this.setData('cxPropField', {});
				// this.setData('cxPropField', fieldData);

				// /* update field in property panel in widgets */
				// 	if (this.getMethods('onBuilderPropertyUpdate')) {
				// 		this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : fieldData});
				// 	}else{
				// 		this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field' : fieldData});
				// 	}
				
				// this.setData('cxPropField', fieldData);

			}else{
				fieldData.lookup.module.id = '';

				if(!(this.data.dxHubCheck && this.data.dxHubError)){
					this.setData('dxHubCheck', true);
					this.setData('dxHubError', true);
				}

				var msg = "Required: Mandatory Module Api Name (cxPropModuleApiName) is invalid.";
				this.setData('dxHubErrorMessage', msg);
			}
		}

		/* to prevent infinite loop while setting field as empty makes module api name as empty */
		this.callFromObs = true;
		this.setData('cxPropField', {});
		this.setData('cxPropField', fieldData);
		this.callFromObs = false;

		// if(!this.data.cxPropModuleApiName || moduleRecordMapping[this.data.cxPropModuleApiName]){
		if(change && change.item){							/* Check to prevent onBuilderPropertyUpdate on init (while set a dynamic value for field component got rerendered and actual value for field fot updated by onBuilderPropertyUpdate issue fix) */
			/* update field in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
				}
		}
		// }
	}.observes('cxPropModuleApiName').on('init'),
	obsFieldLabel : function(change){
		// if(!this.pauseObserver && this.data.cxPropFieldLabel && change && change.item && this.data.cxPropFieldLabel !== '' && !(this.data.cxPropField && this.data.cxPropField.field_label)){
		if(!this.pauseObserver && this.data.cxPropFieldLabel && change && change.item && this.data.cxPropFieldLabel !== ''){
			var fieldData = this.data.cxPropField;
			if(fieldData){
				fieldData.field_label = this.data.cxPropFieldLabel;
			}else{
				fieldData = {"field_label" : this.data.cxPropFieldLabel};
			}

			this.setData('cxPropField', {});
			this.setData('cxPropField', fieldData);

			/* update field in property panel in widgets */
			if(change && change.item){						/* Check to prevent onBuilderPropertyUpdate on init (while set a dynamic value for field component got rerendered and actual value for field fot updated by onBuilderPropertyUpdate issue fix) */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
				}
			}

			// this.setData('cxPropField', fieldData);
		}
	}.observes('cxPropFieldLabel').on('init'),
	obsFieldApiName : async function(change){
		var fieldData = this.data.cxPropField;
		if(!this.pauseObserver && this.data.cxPropFieldApiName && change && change.item && this.data.cxPropFieldApiName !== '' && this.data.cxPropModule && moduleRecordMapping[this.data.cxPropModule] && this.data.cxPropComponentTypeName.toLowerCase() === 'image'){
			if(fieldData){
				fieldData.api_name = this.data.cxPropFieldApiName;
			}else{
				fieldData = {"api_name" : this.data.cxPropFieldApiName};
			}
			var _self = this;

			await store.findAll('field', {module : _self.data.cxPropModule},undefined,undefined,{apiVersion : '6'}).then(function(resp){
				var flag = false;
				var curr_field = resp.filter(function(field){
					if(field.api_name === _self.data.cxPropFieldApiName){
						flag = true;
						return field;
					}
				});
				if(flag){
					fieldData.id = curr_field[0].id;
				}else{
					fieldData.id = '';
				}
			},function(){
				fieldData.id = '';
			});
		}else if(!this.data.cxPropFieldApiName && fieldData && fieldData.api_name){
			fieldData.api_name = '';
		}
		
		this.setData('cxPropField', {});
		this.setData('cxPropField', fieldData);

		/* update field in property panel in widgets */
		if(change && change.item){					/* Check to prevent onBuilderPropertyUpdate on init (while set a dynamic value for field component got rerendered and actual value for field fot updated by onBuilderPropertyUpdate issue fix) */
			if (this.getMethods('onBuilderPropertyUpdate')) {
				this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
			}else{
				this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-field' : JSON.stringify(fieldData)});
			}
		}
		
	}.observes('cxPropFieldApiName', 'cxPropModule').on('init'),
	obsShowWarning : function(){
		if(this.data.cxPropShowWarning && this.data.cxPropErrorMessage && this.data.cxPropErrorMessage !== ''){
			this.setData('cxPropErrorMessage', '');
			/* update field in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-error-message' : this.data.cxPropErrorMessage});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-error-message' : this.data.cxPropErrorMessage});
				}
		}else if(!this.data.cxPropShowWarning && this.data.cxPropWarningMessage && this.data.cxPropWarningMessage !== ''){
			this.setData('cxPropWarningMessage', '');
			/* update field in property panel in widgets */
				if (this.getMethods('onBuilderPropertyUpdate')) {
					this.executeMethod('onBuilderPropertyUpdate', {'cx-prop-warning-message' : this.data.cxPropWarningMessage});
				}else{
					this.throwEvent('onBuilderPropertyUpdate', {'cx-prop-warning-message' : this.data.cxPropWarningMessage});
				}
		}
	}.observes('cxPropShowWarning').on('init'),
	obsDxHubError : function(){
		if(!this.data.dxHubError){
			/* set crux component node hold in this.elementNode  */
				this.elementNode = this.$node.querySelector('crux-'+this.data.elementsCond+'-component');
		}
	}.observes('dxHubError')
},{
	mixins: ["crux-element-validation"],
	'alias' : 'crm-field'
});
/**
 * @syntax nonYielded
<crux-field cx-prop-mode="create" cx-prop-appearance="box" cx-prop-component-type-name="text" cx-prop-field='{"field_label":"Contact Name","api_name":"Contact_Name","ui_type":1,"data_type":"text"}' cx-prop-field-key='field_label'></crux-field>
 */
