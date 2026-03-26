/**
 * @component crux-user-component
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-user-component", {
_template:"<template tag-name=\"crux-user-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\"> {{cruxMaskValue(name,cxPropMaskingProperties)}} </template><template case=\"false\"> <div class=\"cxElemCompViewValue cxViewUserValueWrap\"> <span class=\"lv_data_user cxViewUserValue vam dIB\" onmouseover=\"{{action('showBCard')}}\" onmouseout=\"{{action('hideBCard')}}\"><lyte-text lt-prop-value=\"{{name}}\" lt-prop-show=\"false\"></lyte-text></span> <span class=\"cxViewUserTimestamp\">{{formattedDateValue}}</span> </div> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template></template> </template><template case=\"false\">{{cxPropEmptyValue}}</template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"criteria\"></template><template case=\"filter\"> <crux-user-dropdown id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" cx-prop-disabled=\"{{cxPropDisabled}}\" cx-prop-class=\"{{cxPropClass}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" cx-prop-disableessage=\"{{cxPropDisableMessage}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-type=\"{{cxPropType}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" cx-prop-searchable=\"true\" cx-prop-selected-users=\"{{selectedUsers}}\" cx-prop-no-user-label=\"{{if(ifEquals(cxPropType,'multiple'),if(cxPropPlaceholder,cxPropPlaceholder,cruxGetI18n('crm.label.select.user')),'')}}\" cx-prop-placeholder=\"{{if(ifEquals(cxPropType,'single'),if(cxPropPlaceholder,cxPropPlaceholder,cruxGetI18n('crm.label.select.user')),'')}}\" cx-prop-selected=\"{{selectedIds}}\" cx-prop-zcqa=\"{{cxPropZcqa}}\" on-user-hide=\"{{method('userHide')}}\" on-user-add=\"{{method('onChange','add')}}\" on-user-remove=\"{{method('onChange','remove')}}\" cx-prop-login-user-required=\"{{cxPropLoginUser}}\" cx-prop-show-unassigned-user=\"{{cxPropUnassignedUser}}\" cx-prop-filter-options=\"{{userFilter}}\" cx-prop-selected-user=\"{{selectedUser}}\" on-user-selected=\"{{method('onChange','select')}}\" cx-prop-filter-selected=\"{{cxPropFilterSelected}}\" cx-prop-filterable=\"{{cxPropFilterable}}\" cx-prop-filter-user-value=\"category\" cx-prop-filter-system-value=\"id\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-query-param=\"{{criteria}}\" cx-prop-max-limit=\"{{cxPropMaxLimit}}\" cx-prop-freeze=\"{{cxPropFreeze}}\" on-user-before-show=\"{{method('beforeShowHandling')}}\" on-user-drop-limit-err=\"{{method('onUserDropLimitErr')}}\" cx-prop-dropdown-icon-class=\"{{cxPropDropdownIconClass}}\" cx-prop-is-subordinate=\"{{cxPropIsSubordinate}}\" cx-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" cx-prop-skip-user-field-request=\"{{cxPropSkipUserFieldRequest}}\" on-user-show=\"{{method('filterUserDropdownShow')}}\"></crux-user-dropdown> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel cxFieldLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropDisabled,'cxElementDisabled','')}} {{if(cxPropReadonly,'cxElementReadOnly','')}}\" style=\"{{if(cxPropWidth,concat('width: ',cxPropWidth),'')}}\"> <div @class=\"cxUserComponent cxYieldObserverElemComp {{if(cxPropHideLookupIcon,'cxUserCompHiddenLookupIcon','cxBoxWithRightIcon')}} {{cxPropDivWrapperClass}} cxBoxContainsDropdown {{if(cxPropShowCloseIcon,'cxUserCompWithClearIcon')}} {{cxPropWrapperClass}}\"> <div class=\"cxBoxLeftContent\"> <crux-user-dropdown id=\"{{cxPropId}}\" cx-prop-prefix-yield=\"{{cxPropPrefixYield}}\" cx-prop-middle-yield=\"{{cxPropMiddleYield}}\" cx-prop-suffix-yield=\"{{cxPropSuffixYield}}\" need-yield-name=\"{{needToAddSuffixYield}}\" cx-prop-class=\"{{cxPropSubClass}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" cx-prop-type=\"{{cxPropType}}\" cx-prop-searchable=\"true\" cx-prop-selected-users=\"{{selectedUsers}}\" cx-prop-no-user-label=\"{{cxPropNoUserLabel}}\" cx-prop-placeholder=\"{{cxPropPlaceholder}}\" cx-prop-selected=\"{{selectedIds}}\" cx-prop-zcqa=\"{{cxPropZcqa}}\" cx-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" cx-prop-show-user-group=\"{{cxPropShowUserGroup}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-user-group-selected=\"{{cxPropUserGroupSelected}}\" on-user-add=\"{{method('addcruxuserMultiple')}}\" on-user-remove=\"{{method('removecruxuserMultiple')}}\" cx-prop-login-user-required=\"{{cxPropLoginUser}}\" cx-prop-show-unassigned-user=\"{{cxPropUnassignedUser}}\" cx-prop-selected-user=\"{{selectedUser}}\" on-user-selected=\"{{method('onChange','select')}}\" on-before-select=\"{{method('onBeforeUserSelect')}}\" cx-prop-disabled=\"{{cxPropDisabled}}\" cx-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-criteria=\"{{userCriteria}}\" cx-prop-search-criteria=\"{{cxPropUserSearchCriteria}}\" cx-prop-filter-options=\"{{cxPropFilterOptions}}\" cx-prop-filter-user-value=\"category\" cx-prop-filter-system-value=\"id\" cx-prop-filterable=\"{{cxPropFilterable}}\" on-user-show=\"{{method('createUserDropdownShow')}}\" cx-prop-filter-selected=\"{{cxPropFilterSelected}}\" class=\"{{cxPropClass}} {{if(isError,'cxErrorBox')}} {{if(expHandlers(cxPropValue,'&amp;&amp;',cxPropValue.name),'cxUserCompValueSelected')}}\" cx-prop-exclude=\"{{cxPropExclude}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" cx-prop-disable-message=\"{{cxPropDisableMessage}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" cx-prop-max-limit=\"{{cxPropMaxLimit}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" cx-prop-query-param=\"{{criteria}}\" cx-prop-freeze=\"{{cxPropFreeze}}\" cx-prop-dropdown-icon-class=\"{{if(cxPropShowDisabledIcon,cxPropDisabledIconClass,cxPropDropdownIconClass)}}\" on-user-before-show=\"{{method('beforeShow')}}\" cx-prop-is-subordinate=\"{{cxPropIsSubordinate}}\" onfocus=\"{{action('setFocusClass')}}\" onfocusout=\"{{action('setFocusClass','hide')}}\" cx-prop-scope=\"{{cxPropScope}}\" on-user-hide=\"{{method('userHide')}}\" cx-prop-forced-fetch=\"{{cxPropForcedFetch}}\" cx-prop-is-dropdown-icon-node=\"{{if(cxPropShowDisabledIcon,true,cxPropIsDropdownIconNode)}}\" cx-prop-dropdown-icon-node-class=\"{{if(cxPropShowDisabledIcon,concat('cxElementsDisabledIcon ',cxPropDisabledIconClass),cxPropDropdownIconNodeClass)}}\" cx-prop-box-class=\"{{cxPropBoxClass}}\" cx-prop-skip-user-field-request=\"{{cxPropSkipUserFieldRequest}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-middle-yield-class=\"{{cxPropMiddleYieldClass}}\"> <template is=\"registerYield\" yield-name=\"dropdownPrefixYield\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"prefixYield\"></lyte-yield></template></template> </template> <template is=\"registerYield\" yield-name=\"dropdownMiddleYield\"> <template is=\"if\" value=\"{{cxPropMiddleYield}}\"><template case=\"true\"><lyte-yield yield-name=\"middleYield\"></lyte-yield></template></template> </template> <template is=\"registerYield\" yield-name=\"dropdownSuffixYield\"> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\"></lyte-yield></template></template> </template> </crux-user-dropdown> <template is=\"if\" value=\"{{expHandlers(cxPropHideLookupIcon,'!')}}\"><template case=\"true\"> <crux-user-lookup cx-prop-wrapper-class=\"{{cxPropLookupWrapperClass}}\" class=\"{{cxPropClass}}\" style=\"display: none;\" cx-prop-criteria=\"{{userCriteria}}\" cx-prop-search-criteria=\"{{cxPropUserSearchCriteria}}\" cx-prop-filterable=\"{{cxPropFilterable}}\" cx-prop-filter-options=\"{{cxPropFilterOptions}}\" on-assign=\"{{method('onLookupSelected')}}\" cx-prop-selected-id=\"{{selectedUserString}}\" cx-prop-type=\"{{cxPropType}}\" cx-prop-selected-ids=\"{{selectedUsersString}}\" cx-prop-exclude=\"{{cxPropExclude}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" cx-prop-max-limit=\"{{cxPropMaxLimit}}\" cx-prop-filter-system-value=\"{{cxPropFilterSystemValue}}\" cx-prop-filter-user-value=\"{{cxPropFilterUserValue}}\" cx-prop-query-params=\"{{criteria}}\" on-custom-request=\"{{method('customRequest')}}\" cx-prop-custom-request=\"{{cxPropCustomRequest}}\" on-body-before-show=\"{{method('beforeShow')}}\" cx-prop-is-subordinate=\"{{cxPropIsSubordinate}}\" cx-prop-transition=\"{{cxPropTransition}}\" cx-prop-offset=\"{{cxPropOffset}}\" cx-prop-forced-fetch=\"{{cxPropForcedFetch}}\" cx-prop-title=\"{{cxPropTitle}}\" on-lookup-close=\"{{method('userLookupClose')}}\" cx-prop-selected-filter-option=\"{{cxPropFilterSelected}}\"></crux-user-lookup> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropValue,'&amp;&amp;',cxPropValue.name),'&amp;&amp;',cxPropShowCloseIcon)}}\"><template case=\"true\"> <div class=\"cxBoxCloseIconWrap cxFlexCenter\"> <div class=\"cxBoxCloseIcon cP {{cxPropClearIconClass}}\" onclick=\"{{action('clearSelection')}}\" data-zcqa=\"cxClearSelectionZcqa\"></div> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropShowLookupIcon,'||',expHandlers(cxPropHideLookupIcon,'!'))}}\"><template case=\"true\"> <div tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" class=\"cxBoxRightIcon cxFlexCenter {{cxPropRightIconClass}}\" data-zcqa=\"{{if(cxPropImgZcqa,cxPropImgZcqa,concat('img_lookup_',cxPropZcqa))}}\" onclick=\"{{action('showcruxuserLookup')}}\" onkeydown=\"{{action('showLookupOnKeyEvent',event,this)}}\"> <div class=\"cxUserCompIcon {{if(cxPropDisabled,'','cP')}} {{cxPropIconClass}}\"></div> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-user-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"> <lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"criteria":{"dynamicNodes":[],"additional":{"next":"filter"}},"filter":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropWidth",{"type":"helper","value":{"name":"concat","args":["'width: '","cxPropWidth"]}},"''"]}}}},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1,1]},{"type":"registerYield","position":[3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"registerYield","position":[3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"registerYield","position":[3,1,1,1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"if","position":[3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,1,5]},{"type":"if","position":[3,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropIgnoreEmptyValue","cxPropErrorOnHovercard","lyteViewPort","cxPropValue","cxPropIdSelector","cxPropNameSelector","cxPropFrom","cxPropEmptyValue","selectedUsers","selectedIds","cxPropZcqa","cxPropLoginUser","cxPropUnassignedUser","cxPropType","cxPropContactServerUrl","cxPropErrorMessage","filterOptions","cxPropIsBusinessCard","userFilter","cxPropField","cxPropFieldKey","selectedUser","cxPropId","userCriteria","cxPropUserSearchCriteria","cxPropFilterOptions","cxPropClearErrorMessage","cxPropFilterable","cxPropLabelClass","cxPropBoundary","userCriteria","cxPropDisableOnHoverForView","selectedUserString","selectedUsersString","cxPropTabIndex","cxPropTabindex","lyteUnbound","cxPropClass","cxPropTooltip","isError","cxPropAppearance","cxPropErrorYield","cxPropInfoTooltip","cxPropPlaceholder","cxPropExclude","cxPropDisabledList","cxPropDisableMessage","cxPropShowCloseIcon","cxPropImgZcqa","criteria","cxPropAria","cxPropAriaAttributes","cxPropMaxLimit","cxPropFilterable","cxPropFilterSystemValue","cxPropFilterUserValue","cxPropShowBusCard","cxPropNoUserLabel","cxPropMaskingProperties","cxPropOpenDropdown","cxPropTooltipConfig","cxPropTooltipClass","cxPropDisabled","cxPropShowTooltip","cxPropShowBusinessCard","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropQueryParam","cxPropFilterSelected","cxPropReturnFullObjectOnGet","cxPropCustomRequest","cxPropErrorClass","cxPropFreeze","cxPropErrorSpanClass","cxPropClearIconClass","cxPropIconClass","cxPropDropdownIconClass","cxPropReadonly","cxPropRightIconClass","cxPropWrapperClass","cxPropLookupWrapperClass","cxPropLayout","cxPropWidth","cxPropTooltipWrapperClass","cxPropIsSubordinate","cxPropAutocomplete","cxPropViewInfoTooltip","cxPropScope","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropTransition","cxPropOffset","cxPropDateValue","formattedDateValue","cxPropTitle","cxPropMandatory","cxPropUserDetailViewPath","cxPropForcedFetch","cxPropUserRecord","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropIsDropdownIconNode","cxPropDropdownIconNodeClass","cxPropPreventFocusOnError","cxPropHideLookupIcon","tooltip","cxPropUserCriteria","cxPropPreventParentScroll","cxPropPrefixYield","cxPropBoxClass","cxPropSkipUserFieldRequest","cxPropShowUserGroup","cxPropUserGroupSelected","cxPropUserTimeZone","cxPropButtonYield","cxPropTimeFormat","cxPropAriaErrorProperties","cxPropSubClass","cxPropDivWrapperClass","cxPropSuffixYield","cxPropMiddleYieldClass","cxPropMiddleYield"],
_observedAttributesType :["object","object","boolean","boolean","boolean","object","string","string","string","string","array","string","string","boolean","boolean","string","string","string","array","boolean","array","object","string","object","string","string","string","array","boolean","boolean","string","object","string","boolean","string","array","string","string","boolean","string","string","boolean","string","boolean","string","string","array","array","string","boolean","string","object","boolean","object","number","boolean","string","string","boolean","string","object","boolean","string","string","boolean","boolean","boolean","string","string","object","string","boolean","boolean","string","boolean","string","string","string","string","boolean","string","string","string","string","string","string","boolean","boolean","boolean","string","boolean","string","object","object","string","string","string","boolean","string","boolean","object","string","boolean","string","string","object","string","string","boolean","string","boolean","boolean","string","string","boolean","boolean","string","boolean","boolean","string","string","boolean","string","object","string","string","boolean","string","boolean"],
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
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If set to true, mandatory validation will be ignored for empty value
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render error message on hovercard
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render element when it comes to viewport
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } cxPropIdSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The key that determines the id value from cxPropValue
			 */
			cxPropIdSelector : Lyte.attr("string", {default : "id"}),//No I18n
			/**
			 * @componentProperty { string } cxPropNameSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The key that determines the name value from cxPropValue
			 */
			cxPropNameSelector : Lyte.attr("string", {default : "name"}),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This value is displayed when cxPropValue is empty
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { array } selectedUsers
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedUsers : Lyte.attr('array', {default: []}), //no i18n
			/**
			 * @componentProperty { string } selectedIds
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedIds : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The data-zcqa set to the element
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropLoginUser=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display 'Logged In User' as an option
			 */
			cxPropLoginUser : Lyte.attr("boolean",{default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropUnassignedUser=false
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * Set to true to display 'usassigned user' as an option
			 */
			cxPropUnassignedUser : Lyte.attr("boolean",{default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * 
			 */
			cxPropType : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropContactServerUrl
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropContactServerUrl : Lyte.attr("string", {default : (typeof crmConstants != "undefined" ? crmConstants.contactsPhotoURL : "")}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The error message displayed below the input
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { array } filterOptions
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			filterOptions : Lyte.attr('array',{default : [{"id": "ActiveUsers", "category": "Active"}]}),//No I18N
			/**
			 * @componentProperty { boolean } cxPropIsBusinessCard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display business card on hover of element
			 */
			cxPropIsBusinessCard : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { array } userFilter
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			userFilter : Lyte.attr('array',{default :[{"id": "AllUsers", "category": _cruxUtils.getI18n('crm.globalsearch.option.all')},{"id": "ActiveUsers", "category": _cruxUtils.getI18n('webform.status.Active')},{"id": "DeactiveUsers", "category": _cruxUtils.getI18n('Inactive')},{"id": "NotConfirmedUsers", "category": _cruxUtils.getI18n('crm.user.component.unconfirmed')}]}), //no i18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The selector that tells us which key has the field label
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * @componentProperty { object } selectedUser
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedUser : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The id set to the crux-user-dropdown
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } userCriteria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			userCriteria : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropUserSearchCriteria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property appends its value to the default query param 'criteria' of search api with 'and' condition. If special characters are used in this query param, then consider passing it by encoding it first.
			 */
			cxPropUserSearchCriteria : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropFilterOptions
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property sets the user filters to the filters passed to the component. It also requires cx-prop-filter-user-value and cx-prop-filter-system-value to be set to object's key and value respectively.
			 */
			cxPropFilterOptions : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to prevent clearing of error message on change
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFilterable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This provides inner dropdown to filter users.
			 */
			cxPropFilterable : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to field label
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { object } cxPropBoundary
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the dropdown button crosses this boundary(by scrolling), it automatically closes the dropdown.
			 */
			cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * @componentProperty { string } userCriteria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			userCriteria : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDisableOnHoverForView=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * 
			 */
			cxPropDisableOnHoverForView : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } selectedUserString
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedUserString : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { array } selectedUsersString
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedUsersString : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string", {default : "0"}),//No I18n
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string", {default : "0"}),//No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to crux-user-dropdown and crux-user-lookup
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * @componentProperty { boolean } isError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			isError : Lyte.attr("boolean", {default : false}),//NO i18n
			/**
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render custom error message
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The message displayed on hover of info icon next to field label
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set a placeholder for your dropdown when nothing is selected
			 */
			cxPropPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.label.select.user')}), //no i18n
			/**
			 * @componentProperty { array } cxPropExclude
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This excludes the users whose Ids are passed through this property
			 */
			cxPropExclude : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display a clear icon
			 */
			cxPropDisabledList : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * to disable the options
			 */
			cxPropDisableMessage :  Lyte.attr('string'), //no i18n
			cxPropShowCloseIcon : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * @componentProperty { string } cxPropImgZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Zcqa set to lookup icon
			 */
			cxPropImgZcqa : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty { object } criteria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			criteria : Lyte.attr('object',{default : {}}), //no i18n
			/**
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18N
			/**
			 * @componentProperty { number } cxPropMaxLimit
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property sets max limit on no. of users that can be selected on multi select user dropdown. When user tries to select more users than max limit set, it will show warning popup stating you cannot select more users than max limit.
			 */
			cxPropMaxLimit : Lyte.attr("number", {default : 500}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFilterable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This provides inner dropdown to filter users.
			 */
			cxPropFilterable: Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropFilterSystemValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property should be set to key of the filter object whose value should be used internally as data-value in the dropdown.
			 */
			cxPropFilterSystemValue : Lyte.attr('string', { "default" : 'id'}), //NO I18n
			/**
			 * @componentProperty { string } cxPropFilterUserValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property should be set to key of the filter object whose value should be displayed in the dropdown
			 */
			cxPropFilterUserValue : Lyte.attr('string', {"default" : 'category'}), //NO I18n
			cxPropShowBusCard : Lyte.attr('boolean'), //no i18n
			/**
			 * @componentProperty { string } cxPropNoUserLabel
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property sets the label on dropdown button if no user is passed for single or multiselect dropdown
			 */
			cxPropNoUserLabel : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"), //no i18n
			/**
			 * @componentProperty { boolean } cxPropOpenDropdown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to open dropdown on render
			 */
			cxPropOpenDropdown : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set this to true, to disable the dropdown
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowTooltip : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowBusinessCard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to hide business card on hover of element
			 */
			cxPropShowBusinessCard : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Prefix set to zcqa of error message
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Suffix set to zcqa of error message
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { object } cxPropQueryParam
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property allows to add query params to user as well as search api. It expects an object of key value pair where keys are query parameter name and value is value for respective query param.
			 */
			cxPropQueryParam : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropFilterSelected
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This sets the filter type of the users and shows the users of that specific type
			 */
			cxPropFilterSelected : Lyte.attr("string", {default : "ActiveUsers"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReturnFullObjectOnGet=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to recieve full user object on getValue, else only id and name will be recieved
			 */
			cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropCustomRequest=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to trigger custom request
			 */
			cxPropCustomRequest : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to error message
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFreeze=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This is used to decide whether to apply or not apply the freeze layer.
			 */
			cxPropFreeze : Lyte.attr("boolean" , { default : false }),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to span of error message
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropClearIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to clear icon
			 */
			cxPropClearIconClass : Lyte.attr("string"),//No i18n
			/**
			 * @componentProperty { string } cxPropIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to icon of lookup
			 */
			cxPropIconClass : Lyte.attr("string", {default : "dropdown"}),//No I18n
			/**
			 * @componentProperty { string } cxPropDropdownIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to dropdown icon
			 */
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This makes the dropdown readonly when set to true
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRightIconClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLookupWrapperClass :  Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropLookupWrapperClass
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropWidth
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWidth : Lyte.attr("string"),//No I18n
			/*Only for crm requirement, We can use custom request by default*/
			/**
			 * @componentProperty { boolean } cxPropIsSubordinate=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipWrapperClass :  Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropAutocomplete=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * used for user tooltip
			 */
			cxPropIsSubordinate :  Lyte.attr('boolean' , { default : false }), //NO I18n
			/**
			 * @componentProperty { boolean } cxPropAutocomplete=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to prevent dropdown
			 */
			cxPropAutocomplete : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render info icon next to field label
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropScope
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property sets scope to lyte dropdown. it expects a id or class in which dropdown needs to contained in.
			 */
			cxPropScope : Lyte.attr("string", {"default": ""}) ,//NO I18N
			/**
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render custom disable icon
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to custom disable icon
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { object } cxPropTransition
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTransition : Lyte.attr('object',{"default":{"animation":"slideFromTop","duration":"0.5"}}), //NO I18n
			/**
			 * @componentProperty { object } cxPropOffset
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropOffset : Lyte.attr("object",{"default" : {"top":"0px","left":"center"}}), //NO I18n
			/**
			 * @componentProperty { string } cxPropDateValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Value displayed below user name
			 */
			cxPropDateValue : Lyte.attr("string"),
			/**
			 * @componentProperty { string } formattedDateValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			formattedDateValue : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropTitle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTitle : Lyte.attr("string",{"default":""}),
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to mark the field as mandatory
			 */
			cxPropMandatory : Lyte.attr("boolean"), //NO I18n
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The path to be redirected to when clicked from business card
			 */
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			/**
			 * @componentProperty { boolean } cxPropForcedFetch=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property should be set to true prevent storage in to cache
			 */
			cxPropForcedFetch : Lyte.attr('boolean', {"default" :  false}),
			/**
			 * @componentProperty { object } cxPropUserRecord
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserRecord : Lyte.attr("object"),
			/**
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Warning message displayed below input
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display warning message below input
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * CLass set to warning message
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropIsDropdownIconNode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render custom dropdown icon
			 */
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
	  	    /**
	  	     * @componentProperty { string } cxPropDropdownIconNodeClass
	  	     * @author anuja.manoharan
	  	     * @version 1.0.0
			   * Class set to custom dropdown icon
	  	     */
	  	    cxPropDropdownIconNodeClass : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to prevent focus on error of element
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropHideLookupIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to hide lookup icon
			 */
			cxPropHideLookupIcon : Lyte.attr("boolean", {default  : false}),
			/**
			 * @componentProperty { string } tooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tooltip : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropUserCriteria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property sets the 'filters' query param for user api. If special characters are used in this query param, then consider passing it by encoding it first.
			 */
			cxPropUserCriteria : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventParentScroll : Lyte.attr('boolean'),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),
			/**
			 * @componentProperty { bool } cxPropSkipUserFieldRequest=false
			 * @author silambarasan.r
			 * @version 1.0.0
			 */
			cxPropSkipUserFieldRequest : Lyte.attr("boolean", {default : false}),//No I18n

			cxPropShowUserGroup: Lyte.attr("boolean", {default : false}),

			cxPropUserGroupSelected: Lyte.attr("string"),
			cxPropUserTimeZone : Lyte.attr('string'),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			cxPropTimeFormat : Lyte.attr('string',{default : (typeof Crm != "undefined" ? Crm.userDetails.TIME_FORMAT : 'hh:mm a')}), //no i18n
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropSubClass : Lyte.attr('string',{default : ""}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropMiddleYieldClass: Lyte.attr('string', { default: '' }),
			cxPropMiddleYield: Lyte.attr("boolean", { default: false }),
		}
	},
	init : function(){
		// var criteria = this.data.cxPropQueryParam || {};
		if(this.getData("cxPropFrom") != "create" && this.data.cxPropFrom != "view"){
			if(!this.data.cxPropType){
				this.data.cxPropType = "multiple";//No I18n
			}
			// if(this.getData("cxPropField") && this.getData("cxPropField").ui_type == 20)
			// {
			// 	criteria.include_lite_users = true;
			// }
			// else if(  ["filter","criteria"].indexOf( this.getData("cxPropFrom") ) != -1 && typeof Crm != "undefined" && Crm.userDetails && Crm.userDetails.LITE && Crm.userDetails.LITE.IS_LITE_USER && !this.data.cxPropLoginUser){ //No I18N
			// 	this.setData("cxPropLoginUser",false);//No I18N
  			// }
			if(this.getData("cxPropFrom") === "filter"){
				Lyte.arrayUtils( this.getData("userFilter") , 'push' , { //NO I18N
		        "id": "DeletedUsers", //NO I18N
		        "category": _cruxUtils.getI18n('DeletedUser') //NO I18N
		      });

			}
		}
		// this.setData("criteria",criteria);	//No I18N
		if(this.data.cxPropFrom == "create"){
			this.setFocusUtil();
		}

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
		this.dataModified = {"added_ids" : [], "removed_ids" : []};
	},
	observeQueryParam : function(){
		var criteria = this.data.cxPropQueryParam || {};
		if(this.getData("cxPropFrom") != "create" && this.data.cxPropFrom != "view"){
			if(this.getData("cxPropField") && this.getData("cxPropField").ui_type == 20)
				{
					criteria.include_lite_users = true;
				}
		}
		this.setData("criteria",criteria);	//No I18N
	}.observes('cxPropQueryParam').on('init'),
	actions : {
		showBCard : function(){
			if(this.multiUsers && !this.data.cxPropShowBusCard){
				return;
			}
			var value = this.getData("cxPropValue");//No I18n
			if(!value || !this.data.cxPropShowBusinessCard){
			_cruxUtils.addMurhyInfo("crux-user-component.js", "Feb Default Changes");
				return;
			}

			var id = value[this.getData("cxPropIdSelector")];//NO I18n
			var comp = document.getElementById('popoverTooltip');
			if(!comp){
				comp = Lyte.Component.render("crux-user-tooltip",{}, this.$node);
				comp.setAttribute('id', 'popoverTooltip');
				//this.$node.append(comp);
			}
			comp.setData({
				userId: id,
				usermetaInfo: value,
				cxPropUserDetailViewPath : this.data.cxPropUserDetailViewPath,
				cxPropWrapperClass : this.data.cxPropTooltipWrapperClass
			});

			comp.component.show(this.$node.querySelector('span'), !this.getData('cxPropIsBusinessCard'));  //NO I18N
		},
		hideBCard : function(){
			if(this.multiUsers){
				return;
			}
			var comp = document.getElementById('popoverTooltip');
			if(comp){
				comp.component.hide();
			}
		},
		showcruxuserLookup : function(){
		    if(this.data.cxPropDisabled){
		        return false;
		    }
			var _cxN = this.$node.querySelector('crux-user-lookup');//no i18n
			if(_cxN){
				var _compData = _cxN.component;
				_compData.setData('cxPropShow',true);//no i18n
			}
		},
		clearSelection : function(){
			this.setData("cxPropUserRecord", {});//No I18n
			this.setData("cxPropValue", {});//No I18n
			// this.setData("selectedIds", "");//No I18n
			var cruxDrp = this.$node.querySelector("crux-user-dropdown");
			cruxDrp.setData("cxPropSelected", "");//No I18n
			this.$node.querySelector("lyte-dropdown").setData("ltPropDisplayValue", cruxDrp.component.data.cxPropNoUserLabel);//No I18n
			if(this.getMethods("onClear")){
				/**
				 * @method onClear
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called when user clicks on the clear icon
				 */
				this.executeMethod("onClear");//No I18n
			}
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    setFocusClass : function(hide){
    	if(hide == "hide"){
	    	// this.$node.querySelector('.cxUserComponent').classList.remove('cxBoxDropdownOpened')
	    	this.removeFocus();
	    	this.$node.querySelector(".cxBoxContainsDropdown").classList.remove("cxBoxDropdownFocused");//No I18n
			this.$node.querySelector(".cxBoxContainsDropdown").classList.remove("cxBoxInputFocused");		//No I18n

    	}
    	else{
    		this.$node.querySelector(".cxUserComponent").classList.add("cxBoxDropdownFocused");
    		this.$node.querySelector(".cxBoxContainsDropdown").classList.add("cxBoxInputFocused");		//No I18n
    	}
    },
	showLookupOnKeyEvent : function(event, comp){
		if(event.key === ' '){
			event.preventDefault();
			comp.click();
		}
	},
	},
	getValue : function(){
		if( this.$node.querySelector("#cruxLoadingElem") ){
			if( this.data.cxPropValue && this.data.cxPropValue.users ){
				return this.data.cxPropValue.users
			}
			else if(this.data.cxPropValue && this.data.cxPropField && this.data.cxPropValue[this.data.cxPropField.api_name]){
				return this.data.cxPropValue[this.data.cxPropField.api_name]
			}
			return this.data.cxPropValue;

		}
		var selArray = this.$node.querySelector('crux-user-dropdown').cxProp('selectedUsers');  //No I18N
		if((selArray && selArray.length) || (this.data.cxPropFrom == "create" && this.data.cxPropType == "multiple")){
			return this.getValueToRet(selArray, true);
		}
		return this.getValueToRet(this.$node.querySelector('crux-user-dropdown').cxProp('selectedUser'), true);//No I18n
	},
	resetData:function(){
		if(this.getData('cxPropType')=='multiple' || this.getData('cxPropType')=='multisearch' ){
			this.$node.querySelector('crux-user-dropdown').cxProp('selectedUsers',[])
		}
		else{
			this.$node.querySelector('lyte-dropdown').ltProp('selected','')
			this.setData('cxPropValue',{})
		 }
	},
	valueObserver : function(){
		if(this.getData("cxPropFrom") != "view"){
			if(this.getData("cxPropValue")){
				if(this.getData("cxPropValue").hasOwnProperty("name")){
					if(this.getData("cxPropValue").name == '${CURRENTUSER}'){
						this.setData('selectedUser',{id : '${CURRENTUSER}', full_name : _cruxUtils.getI18n('current.logged.in.user')}) //no i18n
					}else if(this.getData("cxPropValue").id==="${UNASSIGNEDUSER}" || this.getData("cxPropValue").name==="${UNASSIGNEDUSER}"){
						this.setData("selectedUser",{full_name: "Unassigned",id: "${UNASSIGNEDUSER}"});
					}else{
						this.setData("selectedUser", Object.assign({full_name : this.data.cxPropValue.name}, this.getValueToRet(this.data.cxPropValue)))//No I18n
					}
				}
				else if(this.getData("cxPropValue").users && this.getData("cxPropValue").users.hasOwnProperty('name')){
					if(this.getData("cxPropValue").users.name == '${CURRENTUSER}'){
						this.setData('selectedUsers',[{id : '${CURRENTUSER}', full_name : _cruxUtils.getI18n('current.logged.in.user')}]) //no i18n
					}else if(this.getData("cxPropValue").users.id === '${UNASSIGNEDUSER}' || this.getData("cxPropValue").users.name === '${UNASSIGNEDUSER}'){
						this.setData('selectedUsers',[{full_name: "Unassigned",id: "${UNASSIGNEDUSER}"}]); //no i18n
					}else{
						this.setData('selectedUsers',[{id : this.getData("cxPropValue").users.id, full_name : this.getData("cxPropValue").users.name}]) //no i18n
					}
				}else if(this.getData("cxPropValue").users || (this.data.cxPropField && this.data.cxPropValue[this.data.cxPropField.api_name])){//no i18n
					var value=[],isDataAvailable = true , ids = [];
					var field = store.peekRecord("field", this.data.cxPropField.id);//No I18n
					field = field ? field : this.data.cxPropField;
					var users = this.data.cxPropValue.users ? this.data.cxPropValue.users : this.data.cxPropValue[this.data.cxPropField.api_name];
					for(var i=0;i<users.length;i++){
						if(field && users[i][field.multiuserlookup ? field.multiuserlookup.connectedlookup_apiname : field.api_name]){
							value.push({id : users[i][field.multiuserlookup ? field.multiuserlookup.connectedlookup_apiname : field.api_name].id, full_name : users[i][field.multiuserlookup ? field.multiuserlookup.connectedlookup_apiname : field.api_name].name});
						}
						else if( !users[i].name && users[i].id != '${CURRENTUSER}'){
							isDataAvailable = false;
							ids.push(users[i].id);//no i18n
						}
						if(users[i].name == '${CURRENTUSER}' || users[i].id == '${CURRENTUSER}'){
							value.push({id : '${CURRENTUSER}',full_name : _cruxUtils.getI18n('current.logged.in.user')})
						}else if(users[i].id === "${UNASSIGNEDUSER}" || users[i].name === "${UNASSIGNEDUSER}"){
							value.push({full_name: "Unassigned",id: "${UNASSIGNEDUSER}"});
						}
						else if(users[i].name){
							value.push({id : users[i].id,full_name : users[i].name})
						}
					}
					if( !isDataAvailable ){
						var _self = this;
						store.findAll("user",{ids : ids.join(",")}).then(function(){//no i18n
							for(var i=0; i<_users.length; i++){
								if( users[i].id  != '${CURRENTUSER}'){
									var t = store.peekRecord("user",users[i].id);//no i18n
									value.push({id : t.id,full_name :t.full_name});//no i18n
								}

							}
							_self.setData("selectedUsers", value);//No I18n
						},
						function(){
							_self.setData("selectedUsers", value);//No I18n
						})
					}else{
						this.setData("selectedUsers", value);//No I18n
					}

				}
				else if(this.data.cxPropValue.hasOwnProperty("id")){
					var _self = this;
					store.findRecord("user", this.data.cxPropValue.id).then(function(res){
						_self.setData("selectedUser", res[0]);
					})
				}
				else{
					this.setData("selectedUser", {})//no i18n
				}
			}
			else{
				this.setData("selectedUser", {})//no i18n
			}
					if(this.data.cxPropFrom == "create"){
    					if(this.getData("cxPropType") == undefined){
    						this.data.cxPropType = "single";//No I18n
    					}
					if(this.getData("cxPropField") && (this.getData("cxPropField").ui_type == 8 || this.data.cxPropField.data_type == "ownerlookup")){
						var profiles = this.getData("cxPropField").module ? //No I18n
							(this.getData("cxPropField").module[0] ? this.getData("cxPropField").module[0].profiles : this.getData("cxPropField").module.profiles) : undefined;//No I18n
						if(profiles){
							var profileIds = [], profileNames = [];
							for(var i=0; i<profiles.length; i++){
								profileIds.push(profiles[i].id);
								profileNames.push(profiles[i].name);
							}
							var cr = {comparator : "in", field : "profile.id", value : profileIds};
							if(this.data.cxPropUserCriteria){
								this.setData("userCriteria", JSON.stringify([cr, JSON.parse(this.data.cxPropUserCriteria)]));
								// this.setData("userCriteria", JSON.stringify([{comparator : "in", field : "profile.id", value : profileIds}]));//No I18n								
							}
							else{
								this.setData("userCriteria", JSON.stringify([cr]));//No I18n		
							}
							if(!this.data.cxPropUserSearchCriteria){
								this.setData("cxPropUserSearchCriteria", "(profile:in:"+profileNames.join()+")");					//No I18n
							}
							else{
								this.setData("cxPropUserSearchCriteria", "("+this.data.cxPropUserSearchCriteria+"and(profile:in:"+profileNames.join()+"))")	;//no i18n
							}
						}
					}
					if(this.data.cxPropUserCriteria && !this.data.userCriteria){
						this.setData("userCriteria", this.data.cxPropUserCriteria);
					}
					this.observeAndSetTooltip();
					if(this.data.cxPropFrom == "create"){
						this.setFocusUtil();
					}
				}
		}
		else{
			if(this.getData("cxPropValue")){
				var value = this.getData("cxPropValue");//No I18n
				if(!value.hasOwnProperty("id") && !(value.name && value.name == '${CURRENTUSER}')){
					this.multiUsers = true;
					value = value.users || (this.data.cxPropField && value[this.data.cxPropField.api_name]) || [];
					var name = [];
					var field = store.peekRecord("field", this.data.cxPropField.id);//No I18n
					field = field ? field : this.data.cxPropField;
					for(var i=0; i<value.length; i++){
						name.push(value[i][field.multiuserlookup ? field.multiuserlookup.connectedlookup_apiname : field.api_name][this.getData("cxPropNameSelector")]);
					}
					this.setData("name", name.join(","));//No I18n
				}
				else if(value.name == "${CURRENTUSER}"){
					this.multiUsers = true;//to avoid popover
					this.setData("name", _cruxUtils.getI18n('current.logged.in.user'));//No I18n
				}
				else{
					this.setData({name : value[this.getData("cxPropNameSelector")]});
					if(this.data.cxPropDateValue){
						var f = "ddd, D MMM YYYY "
						f += this.data.cxPropTimeFormat.replace("a", "A");
						this.setData("formattedDateValue", this.data.cxPropUserTimeZone ? $L.moment(this.data.cxPropDateValue).timezone(this.data.cxPropUserTimeZone ).i18N(f) : $L.moment(this.data.cxPropDateValue).i18N(f));
					}
				}
			}
		}
		// var self=this;
		// if((this.getData('cxPropFrom')=='criteria' || this.getData('cxPropFrom') == 'filter') && this.getData("cxPropValue")){
		// 	var ids = this.getData("cxPropValue").ids.split(","),iscurrentUser = false,selectedUsers = [] //no i18n
		// 	self.setData("selectedIds", ids);//No I18n
		// 	if(ids.includes("${CURRENTUSER}")){
		// 		iscurrentUser = true
		// 		ids.splice(ids.indexOf("${CURRENTUSER}"),1)
		// 	}
		// 	if(ids.length){
		// 			ids = {ids : ids.toString()}
		// 		store.findAll('user',ids).then(function(data){ //No I18N
		// 			selectedUsers = data;
		// 			if(iscurrentUser){
		// 				 selectedUsers.unshift( {full_name : _cruxUtils.getI18n("current.logged.in.user"),id : "${CURRENTUSER}"} ) //no i18n
		// 			}
		// 			self.setData('selectedUsers',selectedUsers); //No I18N
		// 		})
		// 	}else{
		// 		if(iscurrentUser){
		// 			this.setData('selectedUsers',[{full_name : _cruxUtils.getI18n("current.logged.in.user") , id : "${CURRENTUSER}"}]); //No I18N
		// 		}

		// 	}
		// }
	}.observes('cxPropValue', "cxPropFrom", "cPropDisabled").on("init"), //No I18N
	validate : function(){
		var field = this.getData("cxPropField");//No I18n
		if(this.getData("cxPropFrom") == "create"){
			if(this.$node.querySelector("crux-user-dropdown") == undefined){
				if(!this.validateMandatory(this.data.cxPropValue == undefined)){
					return false;
				}
				this.setData("cxPropErrorMessage", "");//No I18n
				return true;
			}
			if(this.data.cxPropType == "single" && !this.validateMandatory(this.$node.querySelector("crux-user-dropdown").length == 0 ||Object.keys(this.$node.querySelector("crux-user-dropdown").cxProp("selectedUser")).length == 0)){
				if(!this.getData('cxPropPreventFocusOnError')){
					this.$node.scrollIntoView();
					this.$node.querySelector("lyte-dropdown").open();
				}
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.empty.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				return false;
			}
			else if(this.data.cxPropType == "multiple" && !this.validateMandatory(this.$node.querySelector("crux-user-dropdown").length == 0 ||Object.keys(this.$node.querySelector("crux-user-dropdown").cxProp("selectedUsers")).length == 0)){
				if(!this.getData('cxPropPreventFocusOnError')){
					this.$node.scrollIntoView();
					this.$node.querySelector("lyte-dropdown").open();
				}
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.empty.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				return false;
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
		else if(this.$node.querySelector('crux-user-dropdown').cxProp('selectedUsers') && this.$node.querySelector('crux-user-dropdown').cxProp('selectedUsers').length == 0 && this.data.cxPropType != "single" && !this.getData("cxPropIgnoreEmptyValue")){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			return false;
		}
		return true;
	},
	methods : {
		onChange : function(type, event, sel, all){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			//this.setData("isError", false);//No I18n
			var val;
			if(this.getData("cxPropType") == "single"){
				val = this.getValueToRet(sel);
				this.setData("cxPropUserRecord", sel);
			}
			else{
				// if( this.data.cxPropFrom == "filter" && all.length > 50 ){
				// 	var dropDownNode = this.$node.querySelector("crux-user-dropdown");//No I18n
				// 	var selected = JSON.parse(dropDownNode.cxProp("selected"));//No I18n
				// 	selected.pop();
				// 	dropDownNode.cxProp("selected", JSON.stringify(selected));//No I18n
				// 	this.showAlert(_cruxUtils.getI18n("crm.alert.maximum.text.values.contains", 50));//No I18n
				// 	return false;
				// }
				val = this.getValueToRet(all);
			}
			this.setData("cxPropValue", val);//No i18n
			if(this.getMethods("onValueChange")){
				if(this.getData("cxPropFrom") == "create"){
					/**
					 * @method onValueChange
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } val
					 * @param { * } type
					 * Called when a new value is selected
					 */
					this.executeMethod("onValueChange", val, type);//No I18n
				}
				else{
					/**
					 * @method onValueChange
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } val
					 * Called when a new value is selected
					 */
					this.executeMethod("onValueChange", val);//No I18n
				}
			}
			this.$node.querySelector(".cxUserComponent")? this.$node.querySelector(".cxUserComponent").classList.add("cxBoxDropdownFocused"):"";
		},
		filterUserDropdownShow : function(ev, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, ev, comp);
			}
		},
        createUserDropdownShow: function(ev, comp) {
            $L(comp.$node).closest('.cxUserComponent').addClass('cxBoxDropdownOpened');//No I18n
            $L(comp.$node).closest('.cxUserComponent').addClass("cxBoxDropdownFocused");
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, ev, comp);
			}
        },
        onLookupSelected : function(selectedRecords){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			var field = this.getData("cxPropField");//No I18n
			if((field == undefined || field.ui_type != 445) && this.getData("cxPropType") == "single"){
				var _cxN = this.$node.querySelector("crux-user-lookup");//No I18n
				if(_cxN){
					_cxN.setData("cxPropSelectedId", selectedRecords.id);//No I18n
				}
				var _cxddN = this.$node.querySelector("crux-user-dropdown");//No I18n
				if(_cxddN){
					_cxddN.setData("cxPropSelectedUser", selectedRecords);//No I18n
				}
				this.setData("cxPropUserRecord", selectedRecords);//No I18n
			}
			else{
				this.setData("selectedUsers", selectedRecords);//No I18n
			}
			this.setData("cxPropValue",this.getValue());//no i18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(), "add");//No I18n
			}
			// this.$node.querySelector(".cxUserComponent").classList.add("cxBoxDropdownOpened");
			this.$node.querySelector(".cxUserComponent").classList.add("cxBoxDropdownFocused");
		},
		addcruxuserMultiple : function(undefined,selected, all){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			this.setData("selectedUsers", all);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(), "add");//No I18n
			}
		},
		removecruxuserMultiple : function(ev, removed, all){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			this.setData("selectedUsers", all);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(), "remove");//No I18n
			}
		},
	    hideInfoTooltip: function() {
				this.showHideInfoTooltip();
	    },
	    customRequest : function(a,b,c,d,e){
			if(this.getMethods("onCustomRequest")){
				return this.executeMethod("onCustomRequest", a,b,c,d,e,this.data.cxPropField)//No I18n
			}
	    },
		beforeShowHandling : function(){
			if(this.getMethods("onBeforeShow")){
				this.executeMethod("onBeforeShow", arguments[0], arguments[1], this);
			}
		},
		onUserDropLimitErr: function(){
			if(this.getMethods('maxUserDropLimitErr')){
				/**
				 * @method maxUserDropLimitErr
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("maxUserDropLimitErr");//No I18n
			}
		},
		beforeShow : function(){
			if(this.data.cxPropReadonly){
				return false;
			}
			if(!this.data.cxPropAutocomplete){
				var _cxN = this.$node.querySelector('crux-user-lookup');//no i18n
				if(_cxN){
					var _compData = _cxN.component;
					_compData.setData('cxPropShow',true);//no i18n
				}
				return false;
			}
			if(this.getMethods("onBeforeShow")){
				return this.executeMethod("onBeforeShow",arguments[0], arguments[1], this);//No I18n
			}
		},
		hideUserDropdown : function(ev, comp){
			if(ev && ev.key == "Tab"){
				$L(comp.$node).closest('.cxUserComponent').removeClass('cxBoxDropdownOpened');//No I18n
				$L(comp.$node).closest('.cxUserComponent').removeClass('cxBoxDropdownFocused');//No I18n
			}
		},
		userLookupClose : function(){
			var lookupIcon = this.$node.querySelector('.cxBoxRightIcon');

			// lookupIcon.contentEditable = true;
			lookupIcon.focus();
			// lookupIcon.contentEditable = false;

			if(this.getMethods('onUserLookupModalClose')){
				/**
				 * @method onUserLookupModalClose
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called when user closes lookup modal
				 */
				this.executeMethod('onUserLookupModalClose')
			}
		},
		userHide : function(ev, comp){
			if(this.$node.querySelector(".cxUserComponent")){
				this.$node.querySelector(".cxUserComponent").classList.remove("cxBoxDropdownOpened")
				this.$node.querySelector(".cxUserComponent").classList.remove("cxBoxDropdownFocused")
			}
			if(this.getMethods('onHide')){
				/**
				 * @method onHide
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Called when dropdown is closed
				 */
				this.executeMethod('onHide');
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, ev, comp);
			}
		},
		onBeforeUserSelect :  function(event, selected_value,component, lyte_drop_item,value ){
			if(this.getMethods('onBeforeSelect')){ //NO I18n
				return this.executeMethod('onBeforeSelect', event, selected_value,component, lyte_drop_item,value); //NO I18n
			}
		}
	},
	observeQueryParam : function(){
		var criteria = this.data.cxPropQueryParam || {};
		if(this.getData("cxPropFrom") != "create" && this.data.cxPropFrom != "view"){
			if(!this.data.cxPropType){
				this.data.cxPropType = "multiple";//No I18n
			}
			if(this.getData("cxPropField") && this.getData("cxPropField").ui_type == 20)
			{
				criteria.include_lite_users = true;
			}
			// else if(  ["filter","criteria"].indexOf( this.getData("cxPropFrom") ) != -1 && typeof Crm != "undefined" && Crm.userDetails && Crm.userDetails.LITE && Crm.userDetails.LITE.IS_LITE_USER && !this.data.cxPropLoginUser){ //No I18N
			// 	this.setData("cxPropLoginUser",false);//No I18N
  			// }
			if(this.getData("cxPropFrom") === "filter"){
				if(this.data.userFilter.cruxFindIndexOfObject('id','DeletedUsers') == -1 ){
					Lyte.arrayUtils( this.getData("userFilter") , 'push' , { //NO I18N
				        "id": "DeletedUsers", //NO I18N
				        "category": _cruxUtils.getI18n('DeletedUser') //NO I18N
				    });
				}
			}
		}
		this.setData("criteria",criteria);	//No I18N
	}.observes('cxPropQueryParam','cxPropType').on('init'),
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-user-component", null, this.data.cxPropHideLookupIcon);
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeUserCriteria : function(){
		this.setData("userCriteria", this.data.cxPropUserCriteria);
	}.observes("cxPropUserCriteria"),
	observeErrorMessage : function(){


		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
        var compNodeObj = $L(this.$node);
        var boxWithRightIcon = compNodeObj.find('.cxBoxContainsDropdown');
        if(this.getData('isError') && !this.getData("cxPropHideLookupIcon")) {
            boxWithRightIcon.addClass('cxErrorBoxWithRightIcon');
        }
        else {
            boxWithRightIcon.removeClass('cxErrorBoxWithRightIcon');
        }
	}.observes("cxPropErrorMessage").on("didConnect"),//No I18n
	getValueToRet : function(value, fromGet){
			if(Array.isArray(value)){
				var returnArray=[];
				for(var i=0;i<value.length;i++){
					if(value[i].id == '${CURRENTUSER}'){
						returnArray.push({name: value[i].id});
					}else{
						returnArray.push({id : value[i].id, name : value[i].full_name});
					}
				}
				return returnArray;
			}
			if(value.id == "${CURRENTUSER}"){
				return {name : value.id};
			}else if(value.id){
				if(this.data.cxPropReturnFullObjectOnGet){
					return Object.assign(value, {name : value.full_name?value.full_name:value.name});
				}
				return {id : value.id, name : value.full_name};
			}
	},
	binduserLookup_multiple : function(selected,type){
		var _cxddN = this.$node.querySelector('crux-user-dropdown');//no i18n
		if(_cxddN){
			var _compData_cxddN = _cxddN.component;
			var selectedArr = _compData_cxddN.getData('cxPropSelectedUsers');//no i18n
			var selectedIds=[];
			selectedArr.forEach(function(sel){
				selectedIds.push(sel.id);
			});

			if(type == 'add'){
				selectedIds.push(selected.id);
			}else{
				var _ind = selectedIds.indexOf(selected.id);
				Lyte.arrayUtils(selectedIds,'removeAt',_ind,1);//no i18n
			}

			if(selectedIds){
				this.setData('userRecordids',selectedIds);//no i18n
			}
		}
	},
	observeSelectedUser : function(){
		var value = this.getData("selectedUser");//No I18n
		if(Object.keys(value).length == 0){
			if(this.getData("selectedUsers") && this.getData("selectedUsers").length > 0){
				var users = this.getData("selectedUsers").map(function(u){//No I18n
					return u.id;
				});
				this.setData("selectedUsersString", users);//No I18n
			}
			else{
				this.setData("selectedUserString", "");//No I18n
				this.setData("selectedUsersString", []);//No I18n
			}
		}
		else{
			this.setData("selectedUserString", value.id);//No I18n
		}
	}.observes("selectedUser", "selectedUsers").on("init"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin(!this.data.cxPropHideLookupIcon ? ".cxBoxWithRightIcon" : "lyte-dropdown");//No I18n
	}.observes("cxPropField.required", "lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropHideLookupIcon").on("didConnect"),//No I18n
	// didDestroy : function(){
	// 	var dom = document.getElementById("popoverTooltip");
	// 	if(dom){
	// 		dom.remove();
	// 	}
	// }
	openDropdownObserver : function(){
		if(this.getData('cxPropOpenDropdown')){
			setTimeout(function(){
				this.$node.querySelector("lyte-dropdown").open();//No I18n
			}.bind(this), 100);
		}
	}.observes("cxPropOpenDropdown").on("didConnect"),//No I18n
	didConnect : function(){
		this.removeFocusBind = this.removeFocus.bind(this)
		if(this.data.cxPropFrom == "create"){
			window.addEventListener("click", this.removeFocusBind,true);
		}
		if(this.$node.querySelector("crux-user-dropdown") && this.data.cxPropCustomRequest){
			var self = this;
			this.$node.querySelector("crux-user-dropdown").setMethods({//No I18n
				onCustomUserRequest : function(a,b,c,d,e){
					return self.executeMethod("onCustomRequest", a,b,c,d,e,self.data.cxPropField);//No I18n
				}
			})
		}
		if(this.$node.querySelector("crux-user-dropdown") && this.data.cxPropCustomRequest){
			var self = this;
			this.$node.querySelector("crux-user-dropdown").setMethods({//No I18n
				onCustomUserRequest : function(a,b,c,d,e){
					return self.executeMethod("onCustomRequest", a,b,c,d,e,self.data.cxPropField);//No I18n
				}
			})
		}
		this.$node.getModifiedOptions = function() {
			/*This util added for client script usage*/
			// Get modified options from both dropdown and lookup components
			const dropdownValues = this.$node.querySelector("crux-user-dropdown").getModifiedOptions();
			const lookupValues = this.$node.querySelector("crux-user-lookup").getModifiedOptions();

			const mergedValues = {};

			const modified_keys = new Set([
				...(dropdownValues && Object.keys(dropdownValues).length ? Object.keys(dropdownValues) : []),
				...(lookupValues && Object.keys(lookupValues).length ? Object.keys(lookupValues) : []),
			]);
			  
			for (const key of modified_keys) {	
				mergedValues[key] =  [
					...(dropdownValues[key] || []),
					...(lookupValues[key] || [])
				];	
			}
			const added = mergedValues.added_ids;
			const removed = mergedValues.removed_ids;

			const removedIds = new Set(removed.map(item => item.id));

			const filteredAdded = added.filter(item => !removedIds.has(item.id));

			const addedIds = new Set(added.map(item => item.id));
			const filteredRemoved = removed.filter(item => !addedIds.has(item.id));

			const finalModifiedObj = {
				added_ids: filteredAdded,
				removed_ids: filteredRemoved
			};

			return finalModifiedObj;

            
			
		}.bind(this);

		// this.$node.resetUserCache = function(obj) {
		// 	if(obj.newValue !== obj.oldValue){
		// 		this.$node.querySelector("crux-user-dropdown").resetUserCache();
		// 		this.$node.querySelector("crux-user-lookup").resetUserCache();
		// 	}
		// }.bind(this);
	},
	removeFocus : function(){
		var userComp = this.$node ? this.$node.querySelector('.cxUserComponent') : null; //No I18n
		if(userComp && userComp.querySelector('lyte-dropdown') &&  !userComp.querySelector('lyte-dropdown').getData("ltPropIsOpen")){
			userComp.classList.remove('cxBoxDropdownFocused'); //No I18n
		}
		// this.$node && this.$node.querySelector('.cxUserComponent') ? this.$node.querySelector('.cxUserComponent').classList.remove('cxBoxDropdownOpened') : "";//No I18n
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Called when element is rendered in viewport
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	didDestroy : function(){
		if(this.data.cxPropFrom == "create"){
			window.removeEventListener("click", this.removeFocusBind,true);
		}
	},
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-dropdown");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeTabindex : function(changes){
		this.observeTabindexMixin(changes);
	}.observes("cxPropTabindex", "cxPropTabIndex").on("init"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeMaskPermissionField : function(){
		this.getCruxAssetsPropertiesFn();
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("didConnect")
}, {mixins : ["crux-element-validation"]});//No I18n

/**
 * @syntax nonYielded
 * <crux-user-component cx-prop-from="create"></crux-user-component>
 */
