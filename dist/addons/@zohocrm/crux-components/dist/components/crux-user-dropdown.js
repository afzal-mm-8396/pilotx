//$Id$
Lyte.Component.register("crux-user-dropdown", {
_template:"<template tag-name=\"crux-user-dropdown\"> <lyte-dropdown data-zcqa=\"{{cxPropZcqa}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-disabled-list=\"{{cxPropDisabledList}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" class=\"cxFocusableElememnt outerDropdown {{if(cxPropMandatory,'mandatoryField','')}} {{noUserSelected}} {{cxPropClass}} {{if(ifEquals(cxPropAppearance,'box'),'cxBoxDropdown','')}} {{if(cruxOr(cxPropPrefixYield,cxPropSuffixYield),'cxBoxDropdown','')}}\" lt-prop-disable-item-tooltip=\"true\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-tooltip=\"{&quot;appearance&quot;: &quot;callout&quot;, &quot;keeptooltip&quot;:true}\" lt-prop-box-button-width=\"{{cxPropBoxButtonWidth}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-position=\"{{cxPropPosition}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-display-value=\"{{if(cxPropSelectedUser[cxPropUserValue],cxPropSelectedUser[cxPropUserValue],cxPropNoUserLabel)}}\" lt-prop-tabindex=\"{{cxPropTabindex}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-selected=\"{{lbind(cxPropSelected)}}\" lt-prop-callout=\"{{cxPropCallout}}\" lt-prop-yield=\"true\" before-select=\"{{method('onBeforeUserSelect')}}\" on-option-selected=\"{{method('userSelected')}}\" on-show=\"{{method('userShow')}}\" on-before-show=\"{{method('userBeforeShow')}}\" on-hide=\"{{method('userHide')}}\" on-before-hide=\"{{method('userBeforeHide')}}\" on-add=\"{{method('userAdd')}}\" on-remove=\"{{method('userRemove')}}\" on-position-change=\"{{method('userPositionChange')}}\" on-scroll=\"{{method('userScroll')}}\" lt-prop-icon-class=\"{{cxPropDropdownIconClass}}\" lt-prop-button-class=\"{{cxPropButtonClass}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropUserButtonYield}}\"><template case=\"true\"> <lyte-drop-button class=\"cxUserDropButton {{if(cxPropDropdownIconNodeClass,'ltDropdownIconNodePresent','')}}\"> <lyte-yield yield-name=\"userButtonYield\"></lyte-yield> </lyte-drop-button> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','multiple')}}\"><template case=\"true\"> <lyte-drop-button style=\"min-height: 0px;\" class=\"cxUserDropButton {{if(cxPropDropdownIconNodeClass,'ltDropdownIconNodePresent','')}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"dropdownPrefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{expHandlers(addedItems.length,'==',0)}}\"><template case=\"true\"> <span class=\"lyteDropPlaceholderMultiple crux_userdrop_multi_placeholder\">{{cxPropNoUserLabel}}</span> </template><template case=\"false\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{addedItems}}\" item=\"item\" index=\"index\"> <li data-value=\"{{item[cxPropSystemValue]}}\"> <div class=\"cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropSelectedUsrImg}}\"><template case=\"true\"> <template is=\"if\" value=\"{{item.image_link}}\"><template case=\"true\"> <div class=\"cruxSelUserImgWrap\"> <img src=\"{{item.image_link}}\" class=\"cruxSelUserImg\"> </div> </template><template case=\"false\"> <div class=\"cruxSelUserImgWrap noUserPhoto cxUserDropboxNoUserPhoto\"> <span class=\"cruxSelUserImg\"></span> </div> </template></template> </template></template> <span class=\"lyteDropdownVisible\">{{item[cxPropUserValue]}}</span> </div> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> </ul> <lyte-yield yield-name=\"dropdownMiddleYield\"></lyte-yield> </template></template> <template is=\"if\" value=\"{{cxPropIsDropdownIconNode}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDropdownIconNodeClass}}\"></lyte-icon></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"dropdownSuffixYield\"></lyte-yield> </div></template></template> </lyte-drop-button> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <lyte-drop-button class=\"{{if(cxPropMiddleYield,'cxFlex','')}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"dropdownPrefixYield\"></lyte-yield> </div></template></template> <span class=\"lyteMarginRight {{if(cxPropSelectedUser.full_name,'lyteDropdownLabel','lyteDropPlaceholderNormal')}} \"> <lyte-text lt-prop-value=\"{{if(cxPropSelectedUser.full_name,cxPropSelectedUser.full_name,if(cxPropNoUserLabel,cxPropNoUserLabel,cxPropPlaceholder))}}\"> </lyte-text> </span> <template is=\"if\" value=\"{{cxPropMiddleYield}}\"><template case=\"true\"><lyte-yield class=\"{{cxPropMiddleYieldClass}}\" yield-name=\"dropdownMiddleYield\"></lyte-yield></template></template> <lyte-icon class=\"{{cxPropDropdownIconClass}}\"></lyte-icon> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"dropdownSuffixYield\"></lyte-yield> </div></template></template> </lyte-drop-button> </template></template></template></template></template></template> <lyte-drop-box class=\"cxUserDropbox userDropbox {{classForDropBox(cxPropBoxClass)}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropFilterable,'||',cxPropSearchable)}}\"><template case=\"true\"> <div class=\"wrapperdiv cxUserDropFilterWrapperCont cxDropdownInputGroupFocused\"> <template is=\"if\" value=\"{{cxPropShowUserGroup}}\"><template case=\"true\"> <lyte-dropdown data-zcqa=\"user_group\" class=\"cxUserDropdownInnerFilter filterDropDown\" lt-prop-user-value=\"name\" lt-prop-system-value=\"name\" lt-prop-selected=\"{{cxPropUserGroupSelected}}\" on-option-selected=\"{{method('groupSelection')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"crux_dropbox_filter\"> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropUserGroups}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_dd_type_{{item.name}}\" data-value=\"{{item.model_name}}\" class=\"{{if(ifEquals(item.name,cxPropFilterSelected),'result-selected','')}}\">{{item.name}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropUserGroupSelected,'!=',&quot;user&quot;),'&amp;&amp;',cxPropUserGroupsFilter.length)}}\"><template case=\"true\"> <lyte-dropdown data-zcqa=\"user_group_filter\" class=\"{{if(ifEquals(cxPropUserGroupSelected,'user'),'dN','cxUserDropdownInnerFilter filterDropDown')}}\" lt-prop-display-value=\"{{cxPropUserFilterSelected}}\" lt-prop-user-value=\"{{cxPropFilterUserValue}}\" lt-prop-selected=\"{{cxPropUserGroupFilterSelected}}\" on-option-selected=\"{{method('groupFilterSelection')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"crux_dropbox_filter\"> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropUserGroupsFilter}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_dd_type_{{item.name}}\" data-value=\"{{item[cxPropFilterSystemValue]}}\" class=\"{{if(ifEquals(item[cxPropFilterSystemValue],cxPropFilterSelected),'result-selected','')}}\">{{item[cxPropFilterUserValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropDisabled,'!'),'&amp;&amp;',cxPropFilterable)}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropFilterYield}}\"><template case=\"true\"> <lyte-dropdown data-zcqa=\"user_dd_type\" class=\"innerUserDropdown cxBoxDropdown\" lt-prop-yield=\"true\" lt-prop-selected=\"{{lbind(cxPropFilterSelected)}}\" lt-prop-tabindex=\"{{cxPropFilterTabindex}}\" on-option-selected=\"{{method('filterSelected')}}\" on-show=\"{{method('filterShow')}}\" on-before-show=\"{{method('filterBeforeShow')}}\" on-hide=\"{{method('filterHide')}}\" on-before-hide=\"{{method('filterBeforeHide')}}\" on-position-change=\"{{method('filterPositionChange')}}\" on-scroll=\"{{method('filterScroll')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"filterYield\"></lyte-yield> </template> </lyte-dropdown> </template><template case=\"false\"> <lyte-dropdown data-zcqa=\"user_dd_type\" class=\"cxUserDropdownInnerFilter filterDropDown cxBoxDropdown\" lt-prop-selected=\"{{cxPropFilterSelected}}\" on-option-selected=\"{{method('filterSelected')}}\" on-show=\"{{method('filterShow')}}\" on-before-show=\"{{method('filterBeforeShow')}}\" on-hide=\"{{method('filterHide')}}\" on-before-hide=\"{{method('filterBeforeHide')}}\" on-position-change=\"{{method('filterPositionChange')}}\" on-scroll=\"{{method('filterScroll')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"crux_dropbox_filter\"> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropFilterOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_dd_type_{{item[cxPropFilterSystemValue]}}\" data-value=\"{{item[cxPropFilterSystemValue]}}\" class=\"{{if(ifEquals(item[cxPropFilterSystemValue],cxPropFilterSelected),'result-selected','')}}\">{{item[cxPropFilterUserValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template></template></template></template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropDisabled,'!'),'&amp;&amp;',cxPropSearchable)}}\"><template case=\"true\"> <span data-zcqa=\"user_dd_search_clear\" class=\"{{if(cxPropInputValue,'clearField','')}}\" onclick=\"{{action('clearInputField',event)}}\" style=\"{{if(showSearchLoading,'display:none','display:inline-block')}}\"></span> <lyte-input data-zcqa=\"user_dd_search\" class=\"userSearchBox\" lt-prop-autocomplete=\"{{cxPropInputAutocomplete}}\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" lt-prop-autofocus=\"{{cxPropInputAutofocus}}\" lt-prop-maxlength=\"150\" lt-prop-disabled=\"{{cxPropInputDisabled}}\" lt-prop-style=\"{{cxPropInputStyle}}\" lt-prop-readonly=\"{{cxPropInputReadonly}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-type=\"text\" lt-prop-name=\"{{cxPropInputName}}\" lt-prop-width=\"{{cxPropInputWidth}}\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" lt-prop-update-delay=\"{{updateDelay}}\" lt-prop-appearance=\"{{cxPropInputAppearance}}\" lt-prop-direction=\"{{cxPropInputDirection}}\" lt-prop-wrapper-style=\"{{cxPropInputWrapperStyle}}\" lt-prop-tab-index=\"{{cxPropInputTabindex}}\" onkeydown=\"{{action('closeDropdown',event)}}\" oninput=\"{{action('findUsers',event)}}\" onfocus=\"{{action('closeInnerDropdown',event)}}\"></lyte-input> <span style=\"{{if(showSearchLoading,'display:inline-block','display:none')}};\" class=\"searchLoadingIcon cxUserDropboxSearchLoadingIcon\"></span> </template></template> </div> </template></template> <lyte-drop-body class=\"bodyDropBody {{if(ifEquals(cxPropType,'multiple'),'multiSelectDd')}}\" onmouseover=\"{{action('showUserInfoTooltip',event)}}\" onmouseout=\"{{action('hideUserInfoTooltip',event)}}\"> <template is=\"if\" value=\"{{expHandlers(showLoading,'&amp;&amp;',expHandlers(cxPropShowSuggestion,'!'))}}\"><template case=\"true\"> <div class=\"loadingGifDiv cxUserDropboxInitialLoaderWrap cxAlignCenter\"> <span class=\"cxUserDropboxItemsLoader loadingGif\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowSuggestion}}\"><template case=\"true\"> <lyte-drop-label>{{cxPropSuggestion.label}}</lyte-drop-label> <template is=\"if\" value=\"{{cxPropShowSuggestionLoading}}\"><template case=\"true\"> <div class=\"cxFlexCenter cxUserDropdownLoadingWithZia\"> <span class=\"cxUserDropboxItemsLoader\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(suggestedUsers.length,'>',0)}}\"><template case=\"true\"><template is=\"for\" items=\"{{suggestedUsers}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_dd_list_{{item[cxPropUserValue]}}\" class=\"{{if(cxPropUserYield,'',if(ifEquals(cxPropType,'single'),if(ifEquals(cxPropSelectedUser.id,item.id),'result-selected',''),''))}} suggestedUser\" data-value=\"{{item[cxPropSystemValue]}}\" data-order=\"{{index}}\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <div class=\"cruxUserImgWrap noUserPhoto cxUserDropboxNoUserPhoto\"> <span class=\"cruxUserImg\"></span> </div> </template><template case=\"false\"> <div class=\"cruxUserImgWrap\"> <img src=\"{{item.image_link}}\" class=\"cruxUserImg\"> </div> </template></template> <div class=\"userDetail cxUserDetail {{if(item.allUsers,'cruxDropAlluser','')}}\"> <div class=\"userPrimaryDetail\">{{item[cxPropUserValue]}}</div> <div class=\"userSecondaryDetail\"> <span class=\"cxUserDdSecondaryMsg\">{{item.email}}</span> <span class=\"cxUserDdSuggestUserPercentage\">{{item.confidence_percentage}}%</span> </div> </div> </lyte-drop-item> </template></template><template case=\"false\"> <div class=\"noUsersDiv\">{{cxPropNoSuggestionValue}}</div> </template></template></template></template> <lyte-drop-label>Users</lyte-drop-label> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxFlexCenter cxUserDropdownLoadingWithZia\"> <span class=\"cxUserDropboxItemsLoader\"></span> </div> </template></template> </template></template><template is=\"for\" items=\"{{systemData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_dd_list_{{item[cxPropUserValue]}}\" class=\"{{if(cxPropUserYield,'',if(ifEquals(cxPropType,'single'),if(ifEquals(cxPropSelectedUser.id,item.id),'result-selected',''),''))}}\" data-value=\"{{item[cxPropSystemValue]}}\" data-order=\"{{index}}\" onmouseenter=\"{{action('showDisableUserTooltip',event)}}\" onmouseleave=\"{{action('hideDisableUserTooltip',event)}}\"> <template is=\"if\" value=\"{{cxPropUserYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"userYield\" item-value=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.loggedinuser,'||',item.unassigneduser)}}\"><template case=\"true\"> <div class=\"cruxUserImgWrap\"> <span class=\"cruxUserImg {{item.icon_class}}\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{item.allUsers}}\"><template case=\"true\"> <div class=\"cruxUserImgWrap allUsers\"> <span class=\"allUsersImg\"></span> </div> </template><template case=\"false\"> <div class=\"cruxUserImgWrap noUserPhoto cxUserDropboxNoUserPhoto\"> <span class=\"cruxUserImg\"></span> </div> </template></template></template></template> </template><template case=\"false\"> <div class=\"cruxUserImgWrap\"> <img src=\"{{item.image_link}}\" class=\"cruxUserImg\"> </div> </template></template> <div class=\"userDetail cxUserDetail {{if(item.allUsers,'cruxDropAlluser','')}}\"> <div class=\"userPrimaryDetail\">{{item[cxPropUserValue]}}</div> <div class=\"userSecondaryDetail\"> <span class=\"cxUserDdSecondaryMsg\">{{item.email}}</span> </div> </div> </template></template> </lyte-drop-item> </template> <template is=\"if\" value=\"{{expHandlers(systemData.length,'==',0)}}\"><template case=\"true\"> <li class=\"cxComboBoxEmptyMessage\">{{currentFilterValue.cxPropEmptyDataMsg}}</li> </template></template> <template is=\"if\" value=\"{{cxPropShowSuggestion}}\"><template case=\"true\"> <div class=\"noUsersFoundDiv noUsersDiv\" style=\"display: none\">{{cruxGetI18n(\"crm.security.group.users.empty\")}}</div> </template></template> <template is=\"if\" value=\"{{showScrollLoading}}\"><template case=\"true\"> <div class=\"loadingGifDiv cxAlignCenter\"> <span class=\"cxUserDropboxScrollLoaderIcon scrollLoadingGif\"></span> </div> </template></template> </template></template> </lyte-drop-body> <template is=\"if\" value=\"{{expHandlers(cxPropShowSuggestion,'!')}}\"><template case=\"true\"> <div class=\"noUsersFoundDiv noUsersDiv\" style=\"display: none\" onclick=\"{{action('closeInnerDropdown',event)}}\">{{emptyDataMessage}}</div> </template></template> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-drop-footer> <lyte-yield yield-name=\"userFooterYield\"></lyte-yield> </lyte-drop-footer> </template></template> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"insertYield","position":[3]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"componentDynamic","position":[1,7]},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["showSearchLoading","'display:none'","'display:inline-block'"]}}}},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["showSearchLoading","'display:inline-block'","'display:none'"]}},"';'"]}}}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,1,0]},{"type":"text","position":[1,3,3,3,0]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropFilterYield","cxPropFilterSystemValue","cxPropFilterUserValue","cxPropFilterTabindex","cxPropFilterOptions","cxPropFilterSelected","cxPropAppearance","cxPropCallout","cxPropBoxButtonWidth","cxPropUserFieldProperties","cxPropMandatory","cxPropTabindex","cxPropUserYield","cxPropUserButtonYield","cxPropType","cxPropSelected","cxPropUserValue","cxPropSystemValue","cxPropBoundary","cxPropInputAutocomplete","cxPropInputPlaceholder","cxPropInputAutofocus","cxPropInputDisabled","cxPropInputStyle","cxPropInputReadonly","cxPropInputId","cxPropInputClass","cxPropInputName","cxPropInputWidth","cxPropInputValue","cxPropInputAppearance","cxPropInputDirection","cxPropInputWrapperStyle","cxPropInputTabindex","cxPropPlaceholder","cxPropRecords","cxPropSearchable","cxPropMinLength","cxPropFilterable","cxPropForcedFetch","systemData","addedItems","cxProoPerPage","cxPropSearchPerPage","cxPropSelectedUser","cxPropSelectedUsers","cxPropExclude","cxPropNoUserLabel","cxPropZcqa","cxPropCriteria","cxPropSearchCriteria","cxPropLoginUserRequired","cxPropShowUnassignedUser","cxPropDisabled","cxPropQueryParam","cxPropAllUserNeeded","cxPropPosition","cxPropClass","cxPropScope","updateDelay","noUserSelected","cxPropMaxLimit","cxPropFreeze","showSearchLoading","cxPropDropdownIconClass","cxPropSuggestion","suggestedUsers","cxPropShowSuggestion","cxPropShowSuggestionLoading","cxPropNoSuggestionValue","cxPropIsSubordinate","cxPropHierarchyFilter","cxPropEmptyDataMessage","cxPropFooterYield","cxPropSelectedUsrImg","cxPropBoxClass","cxPropPreventParentScroll","cxPropIsDropdownIconNode","cxPropDropdownIconNodeClass","cxPropSkipUserFieldRequest","cxPropAria","cxpropAriaAttributes","cxpropAriaButton","cxpropAriaBox","cxpropAriaBody","cxPropDataTabindex","cxPropErrorIconClass","cxPropShowUserGroup","cxPropUserGroups","cxPropRemoveDisableSelected","cxPropDisabledList","cxPropDisableMessage","currentFilterValue","cxPropUserGroupsFilter","cxPropUserFilterSelected","cxPropUserFilterObj","cxPropUserGroupSelected","cxPropShowAllSelectedMessage","cxPropAllSelectedMessage","emptyDataMessage","cxPropPrefixYield","cxPropSuffixYield","cxPropMiddleYieldClass","cxPropMiddleYield"],
_observedAttributesType :["boolean","string","string","string","array","string","string","boolean","string","object","boolean","string","boolean","boolean","string","string","string","string","object","string","string","boolean","boolean","string","boolean","string","string","string","string","string","string","string","string","string","string","number","boolean","number","boolean","boolean","array","array","number","number","object","array","array","string","string","string","string","boolean","boolean","boolean","object","boolean","string","string","string","number","string","number","boolean","boolean","string","object","array","boolean","boolean","string","boolean","object","string","boolean","boolean","string","boolean","boolean","string","boolean","boolean","object","object","object","object","string","string","boolean","array","boolean","array","string","object","array","string","object","string","boolean","string","string","boolean","boolean","string","boolean"],
 //NO I18n
	init : function(){
		//-------------------------------------------
		// if(this.getData("cxPropForcedFetch")==false){
		// 	this.setData('cacheQuery',true); //NO I18n
		// }
		// else{
		// 	this.setData('cacheQuery',false); //NO I18n
		// }
		this.cacheQuery = !this.getData("cxPropForcedFetch"); //NO I18N
		this.dataCache = false;
		this.dataModified = {"added_ids" : [], "removed_ids" : []};
		this.currentPos = 0;
		this.localData = [];
		this.pageNo = 1;
		this.isSearch = false;
		this.areRecordsAvailable = true;
		this.activeUsersData = [];
		this.activeUsersPageNo = 1;
		this.allActiveUsersFetched = false;
		this.prevSearchChars = "";
		this.doesUserHasFirstName = this.data.cxPropSkipUserFieldRequest ? false : true;
		this.doesUserHasLastName = this.data.cxPropSkipUserFieldRequest ? false : true;

		//-------------------------------------------

		if(this.getData("cxPropSearchable") && this.getData("cxPropMinLength") < 1) { //NO i18n
			this.setData("cxPropMinLength", 1); //NO i18n
		}
		if(this.getData("cxPropFilterable")) {
			//if yield is required for inner dropdown and cxPropFilterSelected is not provided or empty value passed, then sets it to ActiveUsers by default
			//Warning: For empty string passed from the dev, default value is not set to cxPropFilterSelected, it selects the first from drop items provides as yield.
			if(this.getData("cxPropFilterYield") && !this.getData("cxPropFilterSelected")) {
				this.setData("cxPropFilterSelected", "ActiveUsers"); //NO I18n
			}
			//if yield is not required for inner dropdown, selects the first filter for inner dropdown to show on the button.
			if(!this.getData("cxPropFilterYield")) {
				var cxPropFilterOptions = this.getData("cxPropFilterOptions"); //NO I18n
				//if filters are not passed, below listed default filters will be populated
				if(cxPropFilterOptions.length === 0) {
					var filters = this.getDefaultFilters();
					this.setData("cxPropFilterOptions", filters); //NO I18n
					if(!this.getData("cxPropFilterSelected")) { //NO i18n
						this.setData("cxPropFilterSelected", filters[0].id); //NO I18n
					}
				} else {
					var cxPropFilterOptions = this.getData("cxPropFilterOptions"); //NO I18n
					var cxPropFilterSystemValue = this.getData("cxPropFilterSystemValue"); //NO I18n
					if(!this.getData("cxPropFilterSelected")) { //NO i18n
						this.setData("cxPropFilterSelected", cxPropFilterOptions[0][cxPropFilterSystemValue]); //NO I18n
					}
				}
			}
		} else {
			//if filterable is false, ActiveUsers are fetched by default
			if(!this.getData("cxPropFilterSelected")) { //NO i18n
				this.setData('cxPropFilterSelected', "ActiveUsers"); //NO I18n
			}
		}
		var cxPropType = this.getData('cxPropType'); //NO I18n

		//sets the lt-prop-selected to selected id passed from dev, display value is set in didconnect.
		if(cxPropType === "single") {
			if(!this.getData("cxPropNoUserLabel") && !this.getData("cxPropPlaceholder")) { //NO I18n
				this.setData("cxPropNoUserLabel", _cruxUtils.getI18n("crm.label.picklist.none")); //NO I18n
			}

			var cxPropSelectedUser = this.getData("cxPropSelectedUser"); //NO I18n
			if(!cxPropSelectedUser) {
				this.setData("cxPropSelectedUser", {}); //NO I18n
			} else {
					this.setData("cxPropSelected", cxPropSelectedUser.id ? cxPropSelectedUser.id : ""); //NO I18n
			}
		} else if(cxPropType === "multiple") {
			if(!this.getData("cxPropNoUserLabel")) { //NO I18n
				this.setData("cxPropNoUserLabel", _cruxUtils.getI18n("crm.label.picklist.none")); //NO I18n
			}
			//for multi select, outer dropdown will have default layout even if crm-prop-body-drop-button-yield is true
			var cxPropSelectedUsers = this.getData("cxPropSelectedUsers"); //NO I18n
			if(!cxPropSelectedUsers) {
				cxPropSelectedUsers = [];
				this.setData("cxPropSelectedUsers", cxPropSelectedUsers); //NO I18n
			}
			var cxPropSelectedUsersLength = cxPropSelectedUsers ? cxPropSelectedUsers.length : 0;

			if(cxPropSelectedUsersLength) {
				var selectedIds = [];

				for(var i = 0; i < cxPropSelectedUsersLength; i++) {
					selectedIds[i] = cxPropSelectedUsers[i].id;
				}

				//sets the lt-prop-selected to selected ids passed from the dev and also displays the selected users' full_names on the button.
				this.setData("cxPropSelected", JSON.stringify(selectedIds)); //NO I18n
				this.setData("addedItems", cxPropSelectedUsers); //NO I18n
			} else {
				this.setData("noUserSelected", "cxNoUserSelected lyteDropNoOptSelected"); //NO I18N
			}
		}
	},
	data : function(){
		return {
			// user dropdown
			cxPropFilterYield : Lyte.attr('boolean', {"default" : false}), //NO I18n
			cxPropFilterSystemValue : Lyte.attr('string', { "default" : 'id'}), //NO I18n
			cxPropFilterUserValue : Lyte.attr('string', {"default" : 'category'}), //NO I18n
			cxPropFilterTabindex : Lyte.attr('string',{"default" : '0'}), //NO I18n
			cxPropFilterOptions : Lyte.attr('array', { "default" : []}), //NO I18n
			cxPropFilterSelected : Lyte.attr('string', { "default" : ''}), //NO I18n
			cxPropAppearance: Lyte.attr("string", {"default": ""}), //NO I18N
			cxPropCallout: Lyte.attr("boolean", {"default": false}), //NO I18N
			cxPropBoxButtonWidth: Lyte.attr("string", {"default": "min-button"}), //NO I18N
			cxPropUserFieldProperties: Lyte.attr("object", {"default": {}}), //NO I18N
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to mark the field as mandatory
			 */
			cxPropMandatory : Lyte.attr("boolean"), //NO I18n

			// body dropdown
			cxPropTabindex : Lyte.attr('string',{"default" : '0'}), //NO I18n
			cxPropUserYield : Lyte.attr('boolean', {"default" : false}), //NO I18n
			cxPropUserButtonYield : Lyte.attr('boolean', { "default" : false}), //NO I18n
			cxPropType : Lyte.attr('string', {"default" : "single"}), //NO I18n
			cxPropSelected : Lyte.attr("string", {"default" : ''}), //NO I18n
			cxPropUserValue : Lyte.attr('string', {"default" : "full_name"}), //NO I18n
			cxPropSystemValue : Lyte.attr('string', {"default" : "id"}), //NO I18n
			cxPropBoundary: Lyte.attr("object", {"default": {}}), //NO I18n

			// input
			cxPropInputAutocomplete : Lyte.attr("string",{"default" : 'off'}), //NO I18n
			cxPropInputPlaceholder : Lyte.attr("string",{"default" : _cruxUtils.getI18n("crm.label.search.for.users")}), //NO I18n
			cxPropInputAutofocus : Lyte.attr("boolean",{"default" : true}), //NO I18n
			cxPropInputDisabled : Lyte.attr("boolean",{"default" : false}), //NO I18n
			cxPropInputStyle : Lyte.attr("string",{"default" : ''}), //NO I18n
			// cxPropInputMaxlength : Lyte.attr("number",{"default" : 25}), //NO I18n
			cxPropInputReadonly : Lyte.attr("boolean",{"default" : false}), //NO I18n
			cxPropInputId : Lyte.attr("string",{"default" : 'inputId'}), //NO I18n
			cxPropInputClass : Lyte.attr("string",{"default" : ''}), //NO I18n
			cxPropInputName : Lyte.attr("string",{"default" : ''}), //NO I18n
			cxPropInputWidth : Lyte.attr("string",{"default" : ''}), //NO I18n
			cxPropInputValue : Lyte.attr("string",{"default" : ''}), //NO I18n
			cxPropInputAppearance : Lyte.attr("string",{"default" : 'flat'}), //NO I18n
			cxPropInputDirection : Lyte.attr("string",{"default" : 'vertical'}), //NO I18n
			cxPropInputWrapperStyle : Lyte.attr('string', {'default' : ''}), //NO I18n
			cxPropInputTabindex : Lyte.attr('string',{"default" : '0'}), //NO I18n
			cxPropPlaceholder : Lyte.attr('string',{"default" : ''}), //NO I18n

			// component data
			cxPropRecords : Lyte.attr('number', { "default" : 50}), //NO I18n
			cxPropSearchable : Lyte.attr('boolean', {"default" :  true}), //NO I18n
			cxPropMinLength : Lyte.attr('number', { "default" : 1}), //NO I18n
			cxPropFilterable : Lyte.attr('boolean', { "default" : true}), //NO I18n

			// system data
			cxPropForcedFetch : Lyte.attr('boolean', {"default" :  false}), //NO I18n
			systemData : Lyte.attr('array', {"default" : []}), //NO I18n
			addedItems : Lyte.attr("array", {"default" : []}), //NO I18n
			cxProoPerPage: Lyte.attr("number", {"default": 200}), //NO I18n
			cxPropSearchPerPage: Lyte.attr("number", {"default": 200}), //NO I18n
			cxPropSelectedUser: Lyte.attr("object", {"default": {}, hideAttr: true}), //NO I18n
			cxPropSelectedUsers: Lyte.attr("array", {"default": []}), //NO I18n
			cxPropExclude: Lyte.attr("array", {"default": []}), //NO I18n
			cxPropNoUserLabel: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropZcqa: Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropCriteria: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropSearchCriteria: Lyte.attr("string", {"default": ""}), //NO i18n
			cxPropLoginUserRequired: Lyte.attr("boolean", {"default": false}), //NO I18n
			cxPropShowUnassignedUser:  Lyte.attr("boolean", {"default": false}), //NO I18n
			cxPropDisabled: Lyte.attr("boolean", {"default": false}), //NO i18n
			cxPropQueryParam: Lyte.attr("object", {"default": {}}), //NO i18n
			cxPropAllUserNeeded: Lyte.attr("boolean", {"default": false}), //NO I18N
			cxPropPosition: Lyte.attr("string", {"default": "down"}), //NO I18n
			cxPropClass: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropScope: Lyte.attr("string", {"default": ""}), //NO I18N
			updateDelay: Lyte.attr("number", {"default": undefined}), //NO I18n
			noUserSelected: Lyte.attr("string", {"default": ""}), //NO I18N
			cxPropMaxLimit: Lyte.attr("number", {"default": 500}), //NO I18N
			cxPropFreeze: Lyte.attr("boolean", {'default': false}), //NO i18N
			showSearchLoading: Lyte.attr("boolean", {"default": false}), //NO I18N
			cxPropDropdownIconClass : Lyte.attr("string", {default : "dropdown"}),//No I18n
			cxPropSuggestion : Lyte.attr("object", {"default": {'label' : "Zia Suggestion" , 'users' : []}}), //NO I18n
			suggestedUsers : Lyte.attr("array", {"default": []}), //NO I18n
			cxPropShowSuggestion : Lyte.attr("boolean", {'default': false}), //NO i18N
			cxPropShowSuggestionLoading : Lyte.attr("boolean", {'default': false}), //NO i18N
			cxPropNoSuggestionValue : Lyte.attr("string", {"default": "No Suggestions Found"}), //NO I18N
			cxPropIsSubordinate :  Lyte.attr('boolean' , {"default" : false}), //NO I18n
			/** 
				 * This property is used to set hierarchy filter. This value will be considered as queryParam during cxPropIsSubordinate is true.
				 * @componentProperty { object } cxPropHierarchyFilter
			 */
   			cxPropHierarchyFilter :  Lyte.attr("object", {"default": {'feature' : "subordinates" , 'related_entity_id' : Crm.userDetails.USER_ID}}), //NO I18n
			cxPropEmptyDataMessage : Lyte.attr("string" , {"default" : _cruxUtils.getI18n("crm.security.group.users.empty") }),
			cxPropFooterYield: Lyte.attr("boolean", {default : false}),//No I18n
			cxPropSelectedUsrImg: Lyte.attr("boolean", {default : false}),//No I18n
			cxPropBoxClass : Lyte.attr("string"),
			cxPropPreventParentScroll : Lyte.attr('boolean'), //NO I18n
			cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
	  	    cxPropDropdownIconNodeClass : Lyte.attr("string"),
			cxPropSkipUserFieldRequest : Lyte.attr("boolean", {default : false}),
			cxPropAria : Lyte.attr('boolean', {default: false}),
			cxpropAriaAttributes : Lyte.attr('object', {default : {}}),
			cxpropAriaButton : Lyte.attr('object', {default : {}}),
			cxpropAriaBox : Lyte.attr('object', {default : {}}),
			cxpropAriaBody : Lyte.attr('object', {default : {}}),
			cxPropDataTabindex : Lyte.attr('string'),
			cxPropErrorIconClass : Lyte.attr('string'),
			cxPropShowUserGroup : Lyte.attr("boolean", {default : false}),
			cxPropUserGroups :  Lyte.attr('array', {default : [{"model_name":"user","name":_cruxUtils.getI18n("crm.profile.users"),"cxPropEmptyDataMsg": _cruxUtils.getI18n("crm.security.group.users.empty")},{"model_name":"role","name":_cruxUtils.getI18n("crm.profile.roles"),"nameSelector" : "display_label", "cxPropEmptyDataMsg":_cruxUtils.getI18n("crm.security.group.users.empty")},{"model_name":"user_group","name":_cruxUtils.getI18n("crm.profile.groups"),"nameSelector" : "name","cxPropEmptyDataMsg":_cruxUtils.getI18n("crm.security.group.users.empty")}]}),
			cxPropRemoveDisableSelected :  Lyte.attr('boolean', {default : false}),	
			cxPropDisabledList :  Lyte.attr("array", {default : []}),
			cxPropDisableMessage :  Lyte.attr('string'),
			currentFilterValue : Lyte.attr('object',{default : {"model_name":"user","name":"Users","cxPropEmptyDataMsg": _cruxUtils.getI18n("crm.security.group.users.empty")}}), //No I18n
			cxPropUserGroupsFilter : Lyte.attr("array", {default : []}),
			cxPropUserFilterSelected : Lyte.attr('string'),
			cxPropUserFilterObj :  Lyte.attr('object',{default : {}}),
			cxPropUserGroupSelected : Lyte.attr('string'), //NO I18n
			cxPropShowAllSelectedMessage : Lyte.attr('boolean', {default : true}),
			cxPropAllSelectedMessage :  Lyte.attr('string', {default : _cruxUtils.getI18n("crm.usrpop.all.selected")}),
			emptyDataMessage : Lyte.attr('string', {default : ""}),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropMiddleYieldClass: Lyte.attr('string', { default: '' }),
			cxPropMiddleYield: Lyte.attr("boolean", { default: false })
		}
	},

	didConnect : function(){
		this.outerDropdown = this.$node.querySelector('lyte-dropdown'); //NO I18n
		this.outerDropdownBody = this.outerDropdown.querySelector('lyte-drop-body.bodyDropBody'); //NO I18n
		this.outerDropdownBox = this.outerDropdown.querySelector('lyte-drop-box'); //NO I18n
		this.innerDropdown = this.outerDropdown.querySelector('lyte-dropdown'); //NO I18n
		//sets the display value to owner name passed from the dev.
		var cxPropType = this.getData("cxPropType"); //NO I18N
		var addedItems = this.getData("addedItems"); //NO i18n

		if(cxPropType === "single" && !this.getData("cxPropUserButtonYield")) { //NO I18n
			var outerDropdown = this.outerDropdown;
			var cxPropSelectedUser = this.getData("cxPropSelectedUser");//NO I18n
			if(!(cxPropSelectedUser.hasOwnProperty(this.data.cxPropSystemValue) && cxPropSelectedUser.hasOwnProperty(this.data.cxPropUserValue))) { //NO I18n
				// outerDropdown.ltProp("displayValue", cxPropSelectedUser.full_name); //NO I18n
				var dropButton = outerDropdown.querySelector("lyte-drop-button"); //NO I18n
				dropButton.classList.add("grayColor");
			}
		}
		this.addTitle();
		
		this.$node.open = function() {
			this.outerDropdown.open();
		}.bind(this);
		this.$node.close = function() {
			this.outerDropdown.close();
		}.bind(this);
		// this.$node.resetUserCache = function() {
		// 	this.resetUserCache();
		// }.bind(this);
		this.$node.toggle = function() {
			this.outerDropdown.toggle();
		}.bind(this);
		this.$node.resetPosition = function() {
			this.outerDropdown.resetPosition();
		}.bind(this);
		this.$node.getModifiedOptions = function() {
			/*This util added for client script usage*/
			return this.getModifiedValues();
		}.bind(this);

	},
	resetUserCache : function(obj){
		
		if(obj.newValue !== obj.oldValue){
			this.pageNo = 1;
			store.clearCachedQuery("user", this.getQueryParams()); //NO I18n
			this.setData("dataFetched",false); //No i18N
		}
		
	}.observes("cxPropCriteria"),
	scrollToEnd: function(){
		var dropDownsButtonElement = $L(".cxUserDropButton",this.outerDropdown ); //No I18N
		if(dropDownsButtonElement){
			dropDownsButtonElement.scrollTop(dropDownsButtonElement[0].scrollHeight); //No I18N
		}
	},
  	getSubordinateQp: function(){
		/*If it subordinate user is true and its is crm then set these queryParams*/
		if(this.getData("cxPropIsSubordinate")){
						// var newQueryParams = {};
						// newQueryParams.feature = "subordinates";//No I18N
						// newQueryParams.related_entity_id = Crm.userDetails.USER_ID;
						// return newQueryParams;
						return this.data.cxPropHierarchyFilter;
		} else {
			return undefined;
		}
	},
	didDestroy: function() {
		var cxPropFilterOptions = this.getData("cxPropFilterOptions"); //NO I18n
		var filterSysValue = this.getData("cxPropFilterSystemValue"); //NO I18n
		this.pageNo = 1;
		cxPropFilterOptions.forEach(function(filter) {
			if(filter[filterSysValue] !== "ActiveUsers") { //NO i18n
				this.setData('cxPropFilterSelected', filter[filterSysValue]); //NO I18n
				store.clearCachedQuery("user", this.getQueryParams()); //NO I18n
			}
		}.bind(this));
		// clearing timeout to not to process the node if the component is destroyed.
		clearTimeout(this._timeout)
	},
	addTitle: function() {
		$L.fastdom.measure(function() {
			//for multi select dropdown, if more than one user is selected and more than one user has ellipsis, then need to provide title for all the users with ellipsis
			var cxPropSelectedUser = this.getData("cxPropSelectedUser"); //NO I18N
			var addedItems = this.getData("addedItems"); //NO I18N

			if(addedItems.length > 0) {
				var allSpanElems = this.outerDropdown.querySelectorAll(".lyteMultipleSelect .lyteDropdownVisible"); //NO I18N
				var len = allSpanElems.length;

				for(var i = 0; i < len; i++) {
					if(allSpanElems[i].scrollWidth > allSpanElems[i].offsetWidth) {
						allSpanElems[i].setAttribute("lt-prop-tooltip-config", JSON.stringify({"keeptooltip":true})); //NO I18N
						allSpanElems[i].setAttribute("lt-prop-title", addedItems[i][this.data.cxPropUserValue]); //NO I18N
					}
				}
      }
		}.bind(this));
	},

	selectedUsersObserver: function() {
		var cxPropSelectedUsers = this.getData("cxPropSelectedUsers"); //NO I18n
		this.setData("addedItems", cxPropSelectedUsers); //NO i18n

		if(cxPropSelectedUsers.length === 0) {
			this.setData("noUserSelected", "cxNoUserSelected lyteDropNoOptSelected"); //NO I18N
		} else {
			this.setData("noUserSelected", ""); //NO I18N
		}
		this.outerDropdown.ltProp("selected",cxPropSelectedUsers.map(function(user){return user.id})); //NO I18n
		this.createRemoveErrorDiv();
	}.observes("cxPropSelectedUsers.[]"), //NO i18n

	filterableObserver: function() {
		var cxPropFilterOptions = this.getData("cxPropFilterOptions"); //NO I18N
		if(cxPropFilterOptions.length === 0) {
			var filters = this.getDefaultFilters();
			this.setData("cxPropFilterOptions", filters); //NO I18N
			var cxPropFilterSelected = this.getData("cxPropFilterSelected"); //NO I18n

			var selectedFilter = filters.filter(function(filter) {
				return filter.id === cxPropFilterSelected;
			});

			var outerDropdownChildComp = this.outerDropdown.component.childComp;
			this.innerDropdown = outerDropdownChildComp ? outerDropdownChildComp.querySelector("lyte-dropdown") : null; //NO I18n
			if(this.innerDropdown) {
				this.innerDropdown.ltProp("displayValue", selectedFilter[0].category); //NO I18N
			}
		}
	}.observes("cxPropFilterable"), //NO i18n
	setSuggestedUsers : function(){
		if(this.data.cxPropShowSuggestion){
			if(this.data.cxPropInputValue.length > 1){
				this.setSearchDataForSuggestion(this.data.cxPropInputValue);
			}else{
				this.setData("suggestedUsers" , this.data.cxPropSuggestion.users); //no i18n
			}
				if(this.data.suggestedUsers.length > 0){
					this.setData('cxPropShowSuggestionLoading' , false); //NO i18n
				}
		}
	}.observes('cxPropSuggestion.users').on('didConnect'),//NO i18n
	getEmptyMessage : function(){
		var returnVal;
		if( this.getData("cxPropShowAllSelectedMessage") ){
			var systemDataLen = this.getData("systemData").length, //NO I18n
			emptyMessage = this.getData("cxPropEmptyDataMessage"), //NO I18n
			isEqualLength = systemDataLen === this.getData("cxPropSelectedUsers").length, //NO I18n
			isEmpty = systemDataLen === 0;
			returnVal = !isEqualLength ? emptyMessage : isEmpty ? emptyMessage : this.getData("cxPropAllSelectedMessage"); //NO I18n
		} else {
			returnVal = emptyMessage;
		}
		return returnVal;
	},
	createRemoveErrorDiv: function() {
		if(this.$node.querySelector("lyte-dropdown").ltProp("show")) { //NO i18n
			//creates and removes no users found div
			var cxPropType = this.getData("cxPropType"); //NO I18n
			var dropItems = this.$node.querySelector("lyte-dropdown").component.childComp.querySelectorAll("lyte-drop-body.bodyDropBody lyte-drop-item:not(.lyteDropdownActive)"); //NO I18n
			var visibleDropItems = [];
			var dropItemsLen = dropItems.length;

			for(var i = 0; i < dropItemsLen; i++) {
				var isVisible = dropItems[i].style ? dropItems[i].style.display : "";
				if(isVisible !== "none") {
					visibleDropItems.push(dropItems[i]);
				}
			}
			var visibleDropItemsLen = visibleDropItems.length;
      var dropBodyDiv=this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-drop-body.bodyDropBody");//NO I18n
			if((cxPropType === "multiple" && visibleDropItemsLen > 0) || (cxPropType === "single" && visibleDropItemsLen > 0)) {
				var userDropbox = this.outerDropdownBox;
				var noUsersFoundDiv = this.outerDropdownBox.querySelector(".noUsersFoundDiv"); //NO I18n

				if(noUsersFoundDiv) {
	//				userDropbox.removeChild(noUsersFoundDiv);
					this.setData("emptyDataMessage", ""); //NO I18n
					noUsersFoundDiv.style.display = "none"; //NO I18n
					dropBodyDiv.style.display = "block"; //NO I18n
				}
			} else if((cxPropType === "multiple" && visibleDropItemsLen == 0) || (cxPropType === "single" && visibleDropItemsLen == 0)) {
				var userDropbox = this.outerDropdownBox;
				var noUsersFoundDiv = this.outerDropdownBox.querySelector(".noUsersFoundDiv"); //NO I18n

				this.setData("emptyDataMessage", this.getEmptyMessage()); //NO I18n
				if(noUsersFoundDiv && noUsersFoundDiv.style.display === "none") {
					noUsersFoundDiv.style.display = "block"; //NO I18n
					if(!this.data.cxPropShowSuggestion){
							dropBodyDiv.style.display = "none"; //NO I18n
					}
				}
			}
		}
	},

	getQueryParams: function(operation){
		 var queryParamsJson = {};

		 queryParamsJson.type = this.getData('cxPropFilterSelected'); //NO I18n
		 var searchBoxChars = this.getData('cxPropInputValue'); //NO I18n
		 if(this.data.cxPropUserGroupSelected === "user_group"){
				searchBoxChars=searchBoxChars.replace(/\(/g,'\\(').replace(/\)/g,'\\)');//NO I18n
				searchBoxChars=searchBoxChars.trim();
				queryParamsJson.feature = "group_users";
				// queryParamsJson.include_lite_users = true;
				queryParamsJson.related_entity_id = this.data.cxPropUserGroupFilterSelected;
				queryParamsJson.fields = ["id", "full_name", "email", "image_link", "status"];
				if(searchBoxChars){
					queryParamsJson.filters = [{"field": "last_name","value": searchBoxChars + "*","comparator": "like"},"or",{"field": "first_name","value": searchBoxChars + "*","comparator": "like"},"or",{"field": "email","value": searchBoxChars + "*","comparator": "like"}]; // No I18n
				}
			
		  }
		 //if operation is search
		  if(operation === "search" && this.data.cxPropUserGroupSelected != "user_group") { //NO i18n
				var searchBoxChars=searchBoxChars.replace(/\(/g,'\\(').replace(/\)/g,'\\)');//NO I18n
				searchBoxChars=searchBoxChars.trim();
				if(searchBoxChars) {
					if(this.getMethods('setSearchCriteria')){ //NO I18n
		        var searchObject=this.executeMethod('setSearchCriteria',searchBoxChars); //NO I18n
		        for(var key in searchObject) {
		        	queryParamsJson[key] = searchObject[key];
		        }
		      } else {
						var cxPropSearchCriteria = this.getData("cxPropSearchCriteria"); //NO i18n
						var constructedSearchCriteria;
						//filter for search criteria.
						if(this.doesUserHasFirstName && this.doesUserHasLastName) { 
							if(cxPropSearchCriteria) {
								constructedSearchCriteria = "(((first_name:starts_with:"+searchBoxChars+")or(last_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))and"+cxPropSearchCriteria+")"; //NO I18n
							} else {
								constructedSearchCriteria = "((first_name:starts_with:"+searchBoxChars+")or(last_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))"; //NO I18n
							}
						} else if(this.doesUserHasLastName) {
							if(cxPropSearchCriteria) {
								constructedSearchCriteria = "(((last_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))and"+cxPropSearchCriteria+")"; //NO I18n
							} else {
								constructedSearchCriteria = "((last_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))"; //NO I18n
							}
						} else if(this.doesUserHasFirstName) {
							if(cxPropSearchCriteria) {
								constructedSearchCriteria = "(((first_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))and"+cxPropSearchCriteria+")"; //NO I18n
							} else {
								constructedSearchCriteria = "((first_name:starts_with:"+searchBoxChars+")or(full_name:starts_with:"+searchBoxChars+")or(email:starts_with:"+searchBoxChars+"))"; //NO I18n
							}
						}		
						if(this.data.currentFilterValue && this.data.currentFilterValue.model_name && this.data.currentFilterValue.model_name == "role"){
							let roleCriteria = "(" + this.data.cxPropUserFilterObj.model_name + ":equals:" + this.data.cxPropUserFilterObj.selectedRec.id + ")" ;
							constructedSearchCriteria = `${roleCriteria}and(${constructedSearchCriteria})`;
						}
						if(!this.getData("cxPropIsSubordinate") || ( this.getData("cxPropIsSubordinate") && this.data.cxPropUserFilterObj.model_name == "role") ){
							queryParamsJson.criteria = constructedSearchCriteria;
						} else {
							queryParamsJson.search = {};
							queryParamsJson.search.criteria = constructedSearchCriteria;
						}
					}
        }

			  if(searchBoxChars.length >= this.getData("cxPropMinLength")) { //NO I18n
			 	 queryParamsJson.per_page = this.getData("cxPropSearchPerPage"); //NO I18n
			  } else {
			 	 queryParamsJson.per_page = this.getData("cxProoPerPage"); //NO I18n
			  }

			  queryParamsJson.page = this.pageNo;
		  } else {
			 queryParamsJson.per_page = this.getData("cxProoPerPage"); //NO I18n
			 if(this.getData('cxPropFilterSelected') === "ActiveUsers" && !this.data.cxPropUserGroupSelected) { //NO I18n
				 queryParamsJson.page = this.activeUsersPageNo;
			 } else {
				 queryParamsJson.page = this.pageNo;
			 }
			 if(this.data.cxPropUserGroupSelected === "role"){
				queryParamsJson.filters = [{"field":"role","comparator":"equal","value":this.data.cxPropUserGroupFilterSelected}]
			}
			 //filters for findAll call.
			 var cxPropCriteria = this.getData("cxPropCriteria"); //NO i18n
 			if(cxPropCriteria) {
 				queryParamsJson.filters = cxPropCriteria;
 			}
		  }

			//provides user to add their own queryParam for user api.
			var cxPropQueryParam = this.getData("cxPropQueryParam"); //NO i18n
			for(var key in cxPropQueryParam) {
				queryParamsJson[key] = cxPropQueryParam[key];
			}

			if((this.data.cxPropUserFilterObj && this.data.cxPropUserFilterObj.model_name != "role") || !this.data.cxPropUserFilterObj){
				var subQp = this.getSubordinateQp();
				if(subQp){
					for(var key in subQp) {
						queryParamsJson[key] = subQp[key];
					}
				}
			}
			if(this.data.cxPropUserGroupSelected === "user_group"){
				queryParamsJson = {"get_assigned" : queryParamsJson};
			}
		 return queryParamsJson;
	},

	errorHandling: function() {
		console.error("Error: user data could not be fetched."); //NO i18n
		this.setData("showSearchLoading", false); //NO i18n
		this.setData("showLoading", false); //NO I18n
		this.setData("showScrollLoading", false); //NO I18n
		// this.setData("localData", []); //NO I18n
		this.localData = [];
		this.setData("systemData", []); //NO I18n
		this.createRemoveErrorDiv.call(this);
	},

	usersUtil: function(data, evt) {
		this.setData("filterChanged", false); //NO i18n
		this.setData("showSearchLoading", false); //NO i18n
		this.setData("showLoading", false); //NO I18n

		var searchBox = this.$node.querySelector(".outerDropdown").component.childComp.querySelector(".userDropbox lyte-input"); //NO i18n

		var filter = this.getData("cxPropFilterSelected"); //NO I18n

		var cxPropAllUserNeeded = this.getData("cxPropAllUserNeeded"); //NO I18N
		var additionalUsers = [];

		if(!this.isSearch && cxPropAllUserNeeded) {
			additionalUsers.push({"full_name": _cruxUtils.getI18n("AllUsers"), "id": "All", "email": "", allUsers: true});
			//will set localData down at check for login user required
			// this.setData("localData", additionalUsers); //NO I18n
		}
		if(data) {
			var meta;
			if(data.meta) {
				meta = data.meta;
			} else if(data.$) {
				meta = data.$.meta;
			}
			// this.setData('areRecordsAvailable', meta ? meta.more_records : false); //NO I18n
			this.areRecordsAvailable = meta ? meta.more_records : false;
		} else {
			// this.setData('areRecordsAvailable', false); //NO I18n
			this.areRecordsAvailable = false;
		}
		if(data && data.constructor == Object){
			
			if(this.data.cxPropUserGroupSelected == "user_group"){
				data = data.get_assigned;
			}else{
				data = data.user ? data.user : data.users;
			}

		}
		if(data === "INVALID_DATA" || (data && data.$ && data.$.isError === true)) { //NO I18n
			console.error("Error: format of query params for cxPropCriteria is incorrect."); //NO I18n
		}
		if(data && data.constructor === Array && data.length > 0){
			//do not increment the page no if req is made for searching users
			// if(!this.getData("isSearch")) { //NO i18n
				// this.setData('pageNo', this.getData('pageNo') + 1) //NO I18n
				this.pageNo += 1;
			// }

			//prepends loggedInUser to localData
			var cxPropFilterSelected = this.getData("cxPropFilterSelected"); //NO i18n
			var cxPropAllUserNeeded = this.getData("cxPropAllUserNeeded"); //NO I18N
			var cxPropLoginUserRequired = this.getData("cxPropLoginUserRequired"); //NO I18N
			let cxPropShowUnassignedUser =  this.getData("cxPropShowUnassignedUser"); //NO I18N

			if(!this.isSearch && (cxPropLoginUserRequired || cxPropAllUserNeeded || cxPropShowUnassignedUser)) {

				const isUserFilterActive = cxPropFilterSelected === "AllUsers" || cxPropFilterSelected === "ActiveUsers";
				const addUsers = (cxPropShowUnassignedUser || cxPropLoginUserRequired) && isUserFilterActive;

				if (addUsers) {
					if (cxPropShowUnassignedUser) {
						additionalUsers.push({
							full_name: "Unassigned",
							id: Crm.userDetails.UNASSIGNED_USER,
							email: "Records without ownership",
							unassigneduser: true,
							icon_class: "cxSprite cxUserUnAssignedIcon"
						});
					}
					if (cxPropLoginUserRequired) {
						additionalUsers.push({
							full_name: _cruxUtils.getI18n("current.logged.in.user"),
							id: "${CURRENTUSER}",
							email: _cruxUtils.getI18n("current.logged.in.user.definition"),
							loggedinuser: true,
							icon_class: "loggedInUser cxSprite cxLoggedInUserIcon"
						});
					}

					
				}
				// var loggedInUser = [{'full_name': _cruxUtils.getI18n("current.logged.in.user"), 'id': "${CURRENTUSER}", 'email': _cruxUtils.getI18n("current.logged.in.user.definition"), 'loggedinuser': true}]; //NO I18n
				// this.setData("localData", additionalUsers); //NO I18n
				this.localData = additionalUsers;
			} else {
				// this.setData("localData", []); //NO I18n
				this.localData = [];
			}
			Lyte.arrayUtils(this.localData, 'push', data); //NO I18n

			//cache ActiveUsers response
			if(filter === "ActiveUsers") {
				// this.setData("activeUsersData", this.localData); //NO I18n
				this.activeUsersData = this.localData;
				// this.setData("activeUsersPageNo", this.getData("activeUsersPageNo") + 1); //NO I18n
				this.activeUsersPageNo += 1;
			}

			if(!data || data.length < this.getData('cxProoPerPage') ){ //NO I18n
//				this.setData('areRecordsAvailable', data.meta.more_records); //NO I18n
				if(filter === "ActiveUsers") {
					// this.setData("allActiveUsersFetched", true); //NO i18n
					this.allActiveUsersFetched = true;
				}
			}

			// this.setData('currentPos', 0); //NO I18n
			this.currentPos = 0;
			this.paintUsers.call(this);
			if(this.outerDropdown.component.childComp){
				this.outerDropdown.component.childComp.querySelector('lyte-drop-body').scrollTop = 0; //NO I18n
			}
			// this.createRemoveErrorDiv.call(this);
		} else {
//			this.setData('areRecordsAvailable', data.meta.more_records); //NO I18n
			if(filter === "ActiveUsers") {
				// this.setData("allActiveUsersFetched", true); //NO i18n
				this.allActiveUsersFetched = true;
			}
			this.setData("systemData", additionalUsers); //NO I18n
			// this.setData("localData", additionalUsers); //NO I18n
			this.localData = additionalUsers;
			this.createRemoveErrorDiv.call(this);
		}
	},

	fetchUsers : function(operation, evt, clearField){
		var filter = this.getData('cxPropFilterSelected'); //NO I18n
		// this.setData('areRecordsAvailable', true); //NO I18n
		var cxPropInputValue = this.getData('cxPropInputValue'); //NO i18n
		if(cxPropInputValue.length !== 0 && cxPropInputValue.trim().length === 0){
			return;
		}
		this.areRecordsAvailable = true;

		var prevSearchChars = this.prevSearchChars;
		var searchForNewUser = false;

		if(!cxPropInputValue.startsWith(prevSearchChars)) {
			searchForNewUser = true;
		}
		// this.setData("prevSearchChars", cxPropInputValue); //NO I18n
		this.prevSearchChars = cxPropInputValue;
		var usersAvailable = (operation === "search" && this.localData.length > 0); //NO I18n
		// && this.getData("localData").length > 0) is removed from above expression as it is disallowing the request to go even for valid user search query.
		// var usersAvailable = (operation === "search" && evt && evt.keyCode !== 8); //NO I18n
		// var backspacePressed = (operation === "search" && evt && evt.keyCode === 8); //NO I18n
		//hides the loading icon if more chars are typed in the textbox even after there is no data received with the previous typed char.
		// and backspace is not pressed.
		if(operation === "search" && !usersAvailable) { //NO i18n
			this.setData("showSearchLoading", false); //NO i18n
			this.setData("showLoading", false); //NO I18n
		}
		//if operation is not search and if ActiveUsers are already cached and available in activeUsersData, then don't allow n/w call.
		//
		//if backspace character is pressed, then straight away make network call
		//if operation is search and backspace character is not pressed then stop making n/w request if no response is received in last char entered in the search box
		if((operation !== "search" && filter !== "ActiveUsers") || (operation !== "search" && filter === "ActiveUsers" && !this.activeUsersData.length > 0) || ((operation === "search" ) && (usersAvailable || clearField || searchForNewUser))) { //NO I18n
//			if(!this.getData("reqPending1")) {  //NO I18n
//				this.setData("reqPending1", true); //NO I18n
				if(this.isSearch && cxPropInputValue.length >= this.getData("cxPropMinLength")) { //NO i18n
					if(!cxPropInputValue.trim()) {
						return;
					}
					// this.setData("currentReqNo", currentReqNo + 1); //NO I18n

					// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
					if(this.getMethods("onCustomUserRequest")) {
						var promise = this.executeMethod("onCustomUserRequest", 'user', "search", this.getQueryParams(operation), this.getData('cxPropInputValue')); //NO i18n
						if(promise.constructor === Promise) {
							Promise.resolve(promise).then(function(resData) {
								if(this.getData("cxPropInputValue")) { //NO i18n
  								this.usersUtil(resData, evt);
  							}
							}.bind(this),
	 					 function() {
	 						 this.errorHandling.call(this);
	 					 }.bind(this));
						}
					} else {
						if((!this.getData('cxPropIsSubordinate') || (this.getData('cxPropIsSubordinate') && this.data.currentFilterValue && this.data.currentFilterValue.model_name == "role")) && (this.data.currentFilterValue && this.data.currentFilterValue.model_name != "user_group")){
							store.triggerAction("user", "search", this.getQueryParams(operation)).then(function(resData) { //NO i18n
								//in slow n/w bandwidth (slow 3G) n/w response for search with chars is received later in compare to search with no chars in the searchbox.
								//which in turn overwrites the response of search with no chars in the searchbox. so search with chars will only be painted
								//if there are chars in the searchbox
								if(this.getData("cxPropInputValue")) { //NO i18n
									if(this.data.cxPropShowSuggestion && this.data.cxPropSuggestion.users.length){
										this.setSearchDataForSuggestion(this.data.cxPropInputValue);
									}
									this.usersUtil(resData, evt);
								}
							}.bind(this),
							function() {
								this.errorHandling.call(this);
							}.bind(this));
						} else {
							store.triggerAction("user", "get_assigned", this.getQueryParams(operation)).then(function(resData) { //NO i18n
								//in slow n/w bandwidth (slow 3G) n/w response for search with chars is received later in compare to search with no chars in the searchbox.
								//which in turn overwrites the response of search with no chars in the searchbox. so search with chars will only be painted
								//if there are chars in the searchbox
								if(this.getData("cxPropInputValue")) { //NO i18n
									if(this.data.cxPropShowSuggestion && this.data.cxPropSuggestion.users.length){
										this.setSearchDataForSuggestion(this.data.cxPropInputValue);
									}
									this.usersUtil(resData, evt);
								}
							}.bind(this),
							function() {
								this.errorHandling.call(this);
							}.bind(this));
						}

					}
				} else if((operation === "search" && this.isSearch) || operation !== "search"){
          //-------------------------------------------
					//set this as this was causing network of wrong page it should have be one
					if(operation === "search" && this.isSearch){
						// this.setData("activeUsersPageNo",1);//NO I18n
						this.activeUsersPageNo = 1
					}

						// store.findAll('user', this.getQueryParams(), true, filter == 'ActiveUsers' ? true : false).then(function(resData){ //NO I18n
						// if(filter=='ActiveUsers' && this.getData("cxPropForcedFetch")==false){
						// 	this.setData("dataCache",true); //NO I18n
						// }else{
						// 	this.setData("dataCache",false); //NO I18n
						// }

						this.dataCache = filter === 'ActiveUsers' && this.getData("cxPropForcedFetch") === false; //NO I18N

						// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
						if(this.getMethods("onCustomUserRequest")) {
							var promise = this.executeMethod("onCustomUserRequest", 'user', this.getQueryParams(), this.cacheQuery, this.dataCache); //NO i18n
							if(promise.constructor === Promise) {
								Promise.resolve(promise).then(function(resData) {
								 this.usersUtil(resData, evt);
							  }.bind(this),
		 					 function() {
		 						 this.errorHandling.call(this);
		 					 }.bind(this));
							}
						} else {
							if((!this.getData("cxPropIsSubordinate") || (this.getData("cxPropIsSubordinate") && this.data.currentFilterValue.model_name == "role"))&& (this.data.currentFilterValue && this.data.currentFilterValue.model_name != "user_group") ){
								store.findAll('user', this.getQueryParams(), this.cacheQuery, this.dataCache).then(function(resData){ //NO I18n
		            //-------------------------------------------
									this.usersUtil(resData, evt);
								}.bind(this),
								function() {
			//						this.setData("reqPending1", false); //NO I18n
									this.errorHandling.call(this);
								}.bind(this));
							} else {
								store.triggerAction('user', "get_assigned" ,this.getQueryParams()).then(function(resData){ //NO I18n
		            //-------------------------------------------
									this.usersUtil(resData, evt);
								}.bind(this),
								function() {
			//						this.setData("reqPending1", false); //NO I18n
									this.errorHandling.call(this);
								}.bind(this));
							}

						}
				}
		} else if(operation !== "search" && filter === "ActiveUsers" && this.activeUsersData.length > 0) {
      //-------------------------------------------
			//set the filter change to false as scroll was getting prevented when returned to the filter
			this.setData('filterChanged',false);  //NO i18n

			if(this.getData("cxPropForcedFetch")){
				this.dataCache = false;
				// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
				if(this.getMethods("onCustomUserRequest")) {
					var promise = this.executeMethod("onCustomUserRequest", 'user', this.getQueryParams(), this.cacheQuery, this.dataCache); //NO i18n
					if(promise.constructor === Promise) {
						Promise.resolve(promise).then(function(resData) {
						 this.usersUtil(resData, evt);
						}.bind(this),
 					 function() {
 						 this.errorHandling.call(this);
 					 }.bind(this));
					}
				} else {
					if(!this.getData('cxPropIsSubordinate')){
						store.findAll('user', this.getQueryParams(), this.cacheQuery, this.dataCache).then(function(resData){ //NO I18n
							this.usersUtil(resData, evt);
						}.bind(this),
						function() {
		//						this.setData("reqPending1", false); //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					} else {
						store.triggerAction('user', "get_assigned" ,this.getQueryParams()).then(function(resData){ //NO I18n
						//-------------------------------------------
							this.usersUtil(resData, evt);
						}.bind(this),
						function() {
	//						this.setData("reqPending1", false); //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					}
				}
			}
      else{
				this.setData("showSearchLoading", false); //NO i18n
				this.setData("showLoading", false); //NO I18n
				// this.setData("localData", this.getData("activeUsersData")); //NO i18n
				// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
				if(this.getMethods("onCustomUserRequest")) {
					var promise = this.executeMethod("onCustomUserRequest", 'user', this.getQueryParams()); //NO i18n
					if(promise.constructor === Promise) {
						Promise.resolve(promise).then(function(resData) {
						 this.usersUtil(resData, evt);
						}.bind(this),
 					 function() {
 						 this.errorHandling.call(this);
 					 }.bind(this));
					}
				} else {
					if(!this.getData("cxPropIsSubordinate") && (this.data.currentFilterValue && this.data.currentFilterValue.model_name != "user_group")){
						store.findAll('user', this.getQueryParams()).then(function(resData){ //NO I18n
							this.usersUtil(resData, evt);
						}.bind(this),
						function() {
		//						this.setData("reqPending1", false); //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					} else {
						store.triggerAction('user', "get_assigned" ,this.getQueryParams()).then(function(resData){ //NO I18n
						//-------------------------------------------
							this.usersUtil(resData, evt);
						}.bind(this),
						function() {
	//						this.setData("reqPending1", false); //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					}
				}
			}
			//-------------------------------------------
			//below lines are not required as painting of users is done after the response is received
			// this.setData('currentPos', 0); //NO I18n
			// this.paintUsers.call(this);
			if(this.outerDropdown.component.childComp){
				this.outerDropdown.component.childComp.querySelector('lyte-drop-body').scrollTop = 0; //NO I18n
			}
			this.createRemoveErrorDiv.call(this);
		}
	},
	filterObs : function(){
		var errorDiv = this.$node.querySelector("lyte-dropdown.outerDropdown").component.childComp.querySelector(".noUsersFoundDiv"); //NO i18n
		if(errorDiv) {
			errorDiv.setAttribute("style","display:none"); //no i18n
		}
		//-------------------------------------------
		if(this.getData("cxPropForcedFetch")){
			// this.setData("activeUsersPageNo",1); //NO I18n
			this.activeUsersPageNo = 1;
			// this.setData("allActiveUsersFetched",false); //NO I18n
			this.allActiveUsersFetched = false;
		}
		//-------------------------------------------
		this.setData("filterChanged", true); //NO i18n
		this.setData("showLoading", true); //NO I18n
		// this.setData("activeUsersPageNo", 1); //NO i18n
		this.activeUsersPageNo = 1;
		// this.setData("pageNo", 1); //NO I18n
		this.pageNo = 1
		this.setData('cxPropInputValue',"");//NO i18n
		// this.setData("isSearch", false); //NO i18n
		this.isSearch = false;
		this.fetchUsers.call(this);
	}.observes('cxPropFilterSelected'), //NO I18n

	fetchUsersByBatch: function(records, currentPos, recordsCount) {
		var tempArr = [];
		var length = records.length
		for(var i = currentPos; i < length; i++) {
			if(tempArr.length ==  recordsCount) {
				break;
			} else {
				tempArr.push(records[i]);
			}
		}

		// this.setData('currentPos', i); //NO I18n
		this.currentPos = i;
		return tempArr;
	},

	paintNextUsers: function(data) {
		this.setData("showScrollLoading", false); //NO I18n
		var filter = this.getData('cxPropFilterSelected'); //NO I18n
		this.setData("reqPending", false); //NO I18n
		if(data) {
			var meta;
			if(data.meta) {
				meta = data.meta;
			} else if(data.$) {
				meta = data.$.meta;
			}

			// this.setData('areRecordsAvailable', meta ? meta.more_records : false); //NO I18n
			this.areRecordsAvailable = meta ? meta.more_records : false;
		} else {
			// this.setData('areRecordsAvailable', false); //NO I18n
			this.areRecordsAvailable = false;
		}

		if(data && data.constructor == Object){
			data = data.user ? data.user : data.users;
		}

		if(data && data.constructor === Array){
			// this.setData('pageNo', this.getData('pageNo') + 1) //NO I18n
			this.pageNo += 1;
			if(data) {
				Lyte.arrayUtils(this.localData, 'concat', data); //NO I18n
				if(filter === "ActiveUsers") {
					// this.setData("activeUsersData", this.localData); //NO I18n
					this.activeUsersData = this.localData;
					// this.setData("activeUsersPageNo", this.getData("activeUsersPageNo") + 1); //NO I18n
					this.activeUsersPageNo += 1;
				}
			}
			if(!data || data.length < this.getData('cxProoPerPage') ){ //NO I18n
				//more records available handled above through data.meta.more_records
				if(filter === "ActiveUsers") {
					// this.setData("allActiveUsersFetched", true); //NO i18n
					this.allActiveUsersFetched = true;
				}
			}
			this.paintUsers.call(this);
		} else {
			if(filter === "ActiveUsers") {
				// this.setData("allActiveUsersFetched", true); //NO i18n
				this.allActiveUsersFetched = true;
			}
			this.createRemoveErrorDiv.call(this);
		}
	},
	getType : function(value) {
		if (Array.isArray(value)) {
		  return 'array';
		} else if (typeof value === 'object' && value !== null) {
		  return 'object';
		} 
	  },
	  excludeDisableHandling : function(){
		var cxPropExclude = this.getData("cxPropExclude"); //NO I18n
			var systemData = this.getData("systemData"); //NO I18N
			var dropdown = this.$node.querySelector("lyte-dropdown"); //NO I18N
			var dropbox = dropdown.component.childComp;
			var selectedUsers = this.getData("cxPropType") == "single"? this.getData("cxPropSelectedUser") : this.getData("cxPropSelectedUsers"); //NO I18N
			var selectedVal = this.getType(selectedUsers); 
			  
			if(dropbox) {
				systemData.forEach(function(user) {
					if( cxPropExclude && cxPropExclude.indexOf(user.id) !== -1 ) {
						if( (selectedVal == "array" && selectedUsers.indexOf(user.id) == -1) || (selectedVal == "object" && selectedUsers.id != user.id)){
							var ldi = dropbox.querySelector("lyte-drop-item[data-value='"+user.id+"']"); //NO I18N
							if(ldi) {
								ldi.style.display = "none"; //NO I18n
							}
						}
						
					}
				});
				let disabledList = this.data.cxPropDisabledList;
				if(this.data.cxPropRemoveDisableSelected == true){
					
					let selecteduser = this.data.cxPropSelected;
					if(disabledList && disabledList.includes(selecteduser)){
						const index = disabledList.indexOf(selecteduser);
						if (index > -1) {
							Lyte.arrayUtils( disabledList , 'removeAt' , index , 1 );
							// this.setData("cxPropDisabledList", disabledList);
						}
					}
				}
				this.setData("cxPropDisabledList", [])
				this.setData("cxPropDisabledList", disabledList)
				this.createRemoveErrorDiv.call(this);
			}
	},
	paintUsers : function(operation){
		var filter = this.getData('cxPropFilterSelected'); //NO I18n
		var hidden =  this.outerDropdownBox.classList.contains('lyteDropdownHidden') //NO I18n
		var records = this.localData;
		var recordsCount = this.getData('cxPropRecords'); //NO I18n
		var currentPos = this.currentPos;
		var systemdata = this.getData('systemData'); //NO I18n
		var addedItems = this.getData('addedItems'); //NO I18n

		if(currentPos < records.length){
			recordsCount = (records.length - currentPos) > recordsCount ? recordsCount : (records.length - currentPos);
			var nextToPaintUsers = this.fetchUsersByBatch.call(this, records, currentPos, recordsCount);
			if(currentPos === 0) {
				this.setData("systemData", nextToPaintUsers); //NO I18n
			} else {
				Lyte.arrayUtils(systemdata, 'push', nextToPaintUsers); //NO I18n
			}
			
			//prevents the cxPropExclude users to be removed from systemData as it cannot be accessed again from systemData if needed later...
			//Instead it hides cxPropExclude users.
			
			this.excludeDisableHandling();
			if(this.getData('cxPropType') == 'multiple') { //NO I18n
				this.outerDropdown.component.hideNodes.call(this.outerDropdown.component);
				//fix for when more than cxPropRecords are set as selectedUsers on the dropdown.
				if(this.getData("cxPropLoginUserRequired") || this.getData("cxPropShowUnassignedUser")) {
					let num = this.getData("cxPropLoginUserRequired") && this.getData("cxPropShowUnassignedUser") ? 2 : 1 ;
					if(this.currentPos - num <= this.getData("cxPropSelectedUsers").length) { //NO I18n
						this.paintUsers();
					}
				} else if(this.currentPos <= this.getData("cxPropSelectedUsers").length) { //NO I18n
					this.paintUsers();
				}
			}
			if(!this.getData("showScrollLoading")) {
				this.createRemoveErrorDiv();
			}
		} else if(!hidden) {
			// handles the case for exclude observer.
			if(this.getData('cxPropType') == 'multiple') { //NO I18n
				this.outerDropdown.component.hideNodes.call(this.outerDropdown.component);
			}
			//this.getData("areRecordsAvailable") is set false if no.of users returned as a response is less than per_page no. of users
			//on search for users, on scrolling, further users should not be fetched i.e. only one n/w call should be made
			//as per new spec. the search should be made if all the users available in the dropdown is scrolled, so removed !this.getData("isSearch") from below if check
			if(this.areRecordsAvailable) {
				if(filter !== "ActiveUsers" || filter === "ActiveUsers" && !this.allActiveUsersFetched) {
					if(!this.getData("reqPending")) {
						this.setData("reqPending", true); //NO I18n
						if(this.isSearch && this.getData('cxPropInputValue').length >= this.getData("cxPropMinLength")) { //NO I18n
							this.setData("showScrollLoading", true); //NO I18n
							// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
							if(this.getMethods("onCustomUserRequest")) {
								var promise = this.executeMethod("onCustomUserRequest", 'user', "search", this.getQueryParams(operation)); //NO i18n
								if(promise.constructor === Promise) {
									Promise.resolve(promise).then(function(resData) {
										this.paintNextUsers(resData);
									}.bind(this),
			 					 function() {
									 this.setData("reqPending", false); //NO I18n
			 						 this.errorHandling.call(this);
			 					 }.bind(this));
								}
							} else {
								if(!this.getData('cxPropIsSubordinate')){
									store.triggerAction("user", "search", this.getQueryParams(operation)).then(function(resData) {
										this.paintNextUsers(resData);
									}.bind(this),
									function() {
										this.setData("reqPending", false); //NO I18n
										this.errorHandling.call(this);
									}.bind(this));
								} else {
									store.triggerAction("user", "get_assigned", this.getQueryParams(operation)).then(function(resData) {
										this.paintNextUsers(resData);
									}.bind(this),
									function() {
										this.setData("reqPending", false); //NO I18n
										this.errorHandling.call(this);
									}.bind(this));
								}
							}
						} else {
							this.setData("showScrollLoading", true); //NO I18n
							if(this.getMethods("onCustomUserRequest")) {
								var promise = this.executeMethod("onCustomUserRequest", 'user', this.getQueryParams(), false, false); //NO i18n
								if(promise.constructor === Promise) {
									Promise.resolve(promise).then(function(resData) {
									 this.paintNextUsers(resData);
									}.bind(this),
			 					 function() {
			 						 this.setData("reqPending", false); //NO I18n
			 						 this.errorHandling.call(this);
			 					 }.bind(this));
								}
							} else {
								//for scroll, query parameters and response data should not be cached, so cacheQuery and dataCache params are set to false.
								if(!this.getData("cxPropIsSubordinate")){
									store.findAll('user', this.getQueryParams(), false, false).then(function(resData) { //NO I18n
										this.paintNextUsers(resData);
									}.bind(this),
									function() {
										this.setData("reqPending", false); //NO I18n
										this.errorHandling.call(this);
									}.bind(this));
								} else {
									store.triggerAction('user', "get_assigned" ,this.getQueryParams()).then(function(resData){ //NO I18n
										this.paintNextUsers(resData);
									}.bind(this),
									function() {
										this.setData("reqPending", false); //NO I18n
										this.errorHandling.call(this);
									}.bind(this));
								}

							}
						}
					}
				}
			}
		}
	},

	excludeObserver : function() {
		var cxPropType = this.getData("cxPropType"); //NO I18n
		let excludedIds = this.data.cxPropExclude ? this.data.cxPropExclude : []; //NO i18n
		var updatedSystemData = [];
		var systemData = this.getData("systemData"); //NO I18N
		var outerDropdown = this.$node.querySelector("lyte-dropdown"); //NO I18N
		var dropbox = outerDropdown.component.childComp;
		var selectedUsers = this.getData("cxPropType") == "single"? this.getData("cxPropSelectedUser") : this.getData("cxPropSelectedUsers"); //NO I18N
		var selectedVal = this.getType(selectedUsers); 
			
		
		if(dropbox) {
			for(var i = 0; i < excludedIds.length; i++) {
			if( (selectedVal == "array" && selectedUsers.indexOf(excludedIds[i]) == -1) || (selectedVal == "object" && selectedUsers.id != excludedIds[i])){	
				var ldi = dropbox.querySelector("lyte-drop-item[data-value='"+excludedIds[i]+"']"); //NO I18N
				if(ldi) {
					ldi.style.display = "none"; //NO I18n
				}
			}
			}

			systemData.forEach(function(user) {
				if(excludedIds.indexOf(user.id) === -1) {
					var ldi = dropbox.querySelector("lyte-drop-item[data-value='"+user.id+"']"); //NO I18N
					if(ldi) {
						ldi.style.display = ""; //NO I18n
					}
				}
			})
		}

		this.createRemoveErrorDiv();
	}.observes('cxPropExclude.[]'), //NO I18n

	searchUsers: function(evt, clearField) {
		// this.setData("pageNo", 1); //NO I18n

		clearTimeout(this._timeout);
		this._timeout = setTimeout(function(){
     //-------------------------------------------
			// this.setData("allActiveUsersFetched",false); //NO I18n
			this.allActiveUsersFetched = false;
     //-------------------------------------------
		 var cxPropInputValue = this.getData('cxPropInputValue'); //NO I18N
		 /*if(cxPropInputValue.length === 1) {
			 return;
		 }*/
			var inputVal = cxPropInputValue.trim(), minLength = this.getData('cxPropMinLength'); //NO I18n
			var searchBox = this.$node.querySelector(".outerDropdown").component.childComp.querySelector(".userDropbox lyte-input"); //NO i18n

			// if(inputVal && !searchBox.classList.contains("clearField")) { //NO i18n
			// 	searchBox.classList.add("userSearchBox"); //NO i18n
			// 	searchBox.classList.add("clearField"); //NO i18n
			// }
			// this.setData("pageNo", 1); //NO I18n
			this.pageNo = 1;
			if(this.isSearch || inputVal.length >= minLength){
				// this.setData("isSearch", true); //NO I18n
				this.isSearch = true;
				if(inputVal.length >= minLength) {
					this.setData("showSearchLoading", true); //NO i18n
					this.fetchUsers.call(this, 'search', evt); //NO I18n
				}
			}
			if(inputVal.length == 0) {
				//fixes users selection when enter key is pressed twice
				// this.setData("isSearch", true); //NO I18n
				this.isSearch = true;
				this.setData("showSearchLoading", false); //NO i18n
				this.fetchUsers.call(this, 'search', evt, clearField); //NO I18n
				if(this.data.cxPropShowSuggestion && this.data.cxPropSuggestion.users.length){
					this.setData("suggestedUsers" , this.data.cxPropSuggestion.users); //NO I18n
				}
				// this.setData("isSearch", false); //NO I18n
				this.isSearch = false;
			}
		}.bind(this), 300);
	},

	openDropdown: function(resData, event, dropdownComp) {
		//-------------------------------------------
		//checks if first_name field of user names exists; if so first_name will be used in criteria queryParam on search else not.
		var filter = this.getData("cxPropFilterSelected"); //NO I18n
		var makeFieldReq = true;
		var userFieldProperties = this.getData("cxPropUserFieldProperties"); //NO I18n
		if(userFieldProperties && Object.keys(userFieldProperties).length){
			if(!userFieldProperties.firstName && userFieldProperties.firstName !== false && !userFieldProperties.lastName && userFieldProperties.lastName !== false){
				makeFieldReq = true;
			} else {
				makeFieldReq = false;
				this.doesUserHasFirstName = userFieldProperties.firstName;
				this.doesUserHasLastName = userFieldProperties.lastName;
			}
		}
		if(makeFieldReq && !this.data.cxPropSkipUserFieldRequest){
			store.findAll("field", {module: "users"}, false, false).then(function(resData) { //NO I18n
				var fields = [];
				if(resData.constructor === Object) {
					fields = resData.field ? resData.field : resData.fields;
				} else if(resData.constructor === Array) {
					fields = resData;
				}

				var fieldsLen = fields ? fields.length : 0;
				if(fieldsLen) {
					var firstNameFound = false;
					var lastNameFound = false;

					for(var i = 0; i < fieldsLen; i++) {
						if(fields[i].api_name === "first_name") { //NO I18n
							firstNameFound = true;
						} else if(fields[i].api_name === "last_name") { //NO I18n
							lastNameFound = true;
						}

						if(firstNameFound && lastNameFound) {
							break;
						}
					}

					// this.setData("doesUserHasFirstName", firstNameFound); //NO I18n
					this.doesUserHasFirstName = firstNameFound;
					// this.setData("doesUserHasLastName", lastNameFound); //NO I18n
					this.doesUserHasLastName = lastNameFound;
				}
			}.bind(this),
			function(errorData) {
				// this.setData("doesUserHasFirstName", false); //NO I18n
				this.doesUserHasFirstName = false;
				// this.setData("doesUserHasLastName", false); //NO I18n
				this.doesUserHasLastName = false;
			}.bind(this)
		);
		}

		//hides waiting spinning gif
		this.setData("dataFetched", true); //NO I18n
		this.setData("showLoading", false); //NO I18n
		this.setData("dataPending", false);  //NO I18n
		this.localData = [];
		this.currentPos = 0;
		this.systemData = [];

		var cxPropAllUserNeeded = this.getData("cxPropAllUserNeeded"); //NO I18N
		var cxPropLoginUserRequired = this.getData("cxPropLoginUserRequired"); //NO i18n
		var cxPropFilterSelected = this.getData("cxPropFilterSelected"); //NO i18n
		var additionalUsers = [];

		if(cxPropAllUserNeeded) {
			additionalUsers.push({"full_name": _cruxUtils.getI18n("AllUsers"), "id": "All", "email": "", allUsers: true});
			// this.setData("localData", additionalUsers); //NO I18n
			this.localData = additionalUsers;
		}
		// if((cxPropLoginUserRequired)) {
		// 	if(cxPropLoginUserRequired && (cxPropFilterSelected === "AllUsers" || cxPropFilterSelected === "ActiveUsers")) {
		// 		additionalUsers.push({'full_name': _cruxUtils.getI18n("current.logged.in.user"), 'id': "${CURRENTUSER}", 'email': _cruxUtils.getI18n("current.logged.in.user.definition"), 'loggedinuser': true});
		// 	}
		// 	this.localData = additionalUsers;
		// }
		if(resData) {
			var meta;
			if(resData.meta) {
				meta = resData.meta;
			} else if(resData.$) {
				meta = resData.$.meta;
			}
			// this.setData('areRecordsAvailable', meta ? meta.more_records : false); //NO I18n
			this.areRecordsAvailable = meta ? meta.more_records : false;
		} else {
			// this.setData('areRecordsAvailable', false); //NO I18n
			this.areRecordsAvailable = false;
		}
		if(resData && resData.constructor == Object){
			resData = resData.user ? resData.user : resData.users;
		}
		if(resData === "INVALID_DATA") { //NO I18n
			console.error("Error: format of query params for cxPropCriteria is incorrect."); //NO I18n
		}
		if((resData && resData.constructor === Array && resData.length > 0)|| this.localData.length) {
			// this.setData('pageNo', this.getData('pageNo') + 1); //NO I18n
			this.pageNo += 1;
			//prepends loggedInUser to localData
			let cxPropShowUnassignedUser =  this.getData("cxPropShowUnassignedUser"); //NO i18n

			if((cxPropLoginUserRequired || cxPropShowUnassignedUser)) {
				const isUserFilterActive = cxPropFilterSelected === "AllUsers" || cxPropFilterSelected === "ActiveUsers";
				const addUsers = (cxPropShowUnassignedUser || cxPropLoginUserRequired) && isUserFilterActive;

				if (addUsers) {
					if (cxPropShowUnassignedUser) {
						additionalUsers.push({
							full_name: "Unassigned",
							id: Crm.userDetails.UNASSIGNED_USER,
							email: "Records without ownership",
							unassigneduser: true,
							icon_class: "cxSprite cxUserUnAssignedIcon"
						});
					}
					if (cxPropLoginUserRequired) {
						additionalUsers.push({
							full_name: _cruxUtils.getI18n("current.logged.in.user"),
							id: "${CURRENTUSER}",
							email: _cruxUtils.getI18n("current.logged.in.user.definition"),
							loggedinuser: true,
							icon_class: "loggedInUser cxSprite cxLoggedInUserIcon"
						});
					}

					
				}
				this.localData = additionalUsers;
			}
			Lyte.arrayUtils(this.localData, 'push', resData); //NO I18n

			//cache activeUsers
			if(cxPropFilterSelected === "ActiveUsers") {
				// this.setData("activeUsersData", this.localData); //NO I18n
				this.activeUsersData = this.localData;
				// this.setData("activeUsersPageNo", this.getData("activeUsersPageNo") + 1); //NO I18n
				this.activeUsersPageNo += 1;
			}

			if(resData.length < this.getData('cxProoPerPage') ){ //NO I18n
//						this.setData('areRecordsAvailable', resData.meta.more_records); //NO I18n
				if(cxPropFilterSelected === "ActiveUsers") {
					// this.setData("allActiveUsersFetched", true); //NO i18n
					this.allActiveUsersFetched = true;
				}
			}
			this.paintUsers.call(this);


			// Fixes the height issue of the dropdown
			// TODO: Ask anantha to remove this piece of code later after V2_1_x
			var body = dropdownComp.getDropBody( dropdownComp.childComp );
			body.classList.add( '_lyteDummyClass' ); //NO I18n

			// this.createRemoveErrorDiv.call(this);

		} else {
			if(filter === "ActiveUsers") {
				// this.setData("allActiveUsersFetched", true); //NO i18n
				this.allActiveUsersFetched = true;
			}
			this.createRemoveErrorDiv.call(this);
		}

		//onUserShow method does not get called first time dropdown is opened as it checks if users are fetched or not by !this.getData("showLoading")
		if(this.getMethods('onUserShow')){ //NO I18n
			this.executeMethod('onUserShow', event, dropdownComp); //NO I18n
		}
	},

	actions : {
		findUsers : function(evt){
			this.searchUsers(evt);
		},

		showUserInfoTooltip: function(event) {
			if(this.getData("cxPropUserYield")) {
				return;
			}
			let dropitem =  event.target.closest('lyte-drop-item')
			let dropitemId =  dropitem ? dropitem.dataset.value : "";
			let disabledList = this.data.cxPropDisabledList;
			if(disabledList && disabledList.includes(dropitemId)){
				return;
			}

			event.stopPropagation();
			var srcElem = event.target;
			if(srcElem && (srcElem.classList.contains("userPrimaryDetail") || srcElem.classList.contains("cxUserDdSecondaryMsg")) && srcElem.scrollWidth > srcElem.offsetWidth) {
				srcElem.setAttribute("lt-prop-tooltip-config", JSON.stringify({"keeptooltip":true, "position":"bottom"})); //NO I18N
				srcElem.setAttribute("lt-prop-title", srcElem.innerText); //NO I18N
				srcElem.setAttribute("lt-prop-tooltip-class", "cxUserDropboxTooltip"); //NO I18N
			}
		},

		hideUserInfoTooltip : function(event){
			if(this.getData("cxPropUserYield")) {
				return;
			}
			var srcElem = event.target;
			if(srcElem && (srcElem.classList.contains("userPrimaryDetail") || srcElem.classList.contains("cxUserDdSecondaryMsg")) && srcElem.scrollWidth > srcElem.offsetWidth) {
				srcElem.removeAttribute("lt-prop-tooltip-config", JSON.stringify({"keeptooltip":true, "position":"bottom"})); //NO I18N
				srcElem.removeAttribute("lt-prop-title", srcElem.innerText); //NO I18N
				srcElem.removeAttribute("lt-prop-tooltip-class", "cxUserDropboxTooltip"); //NO I18N
			}
		},

		showDisableUserTooltip : function(event){
			event.stopPropagation();
			var srcElem = event.target;
			let dropitem =  event.target.closest('lyte-drop-item')
			let dropitemId =  dropitem ? dropitem.dataset.value : "";
			let disabledList = this.data.cxPropDisabledList;
			if(disabledList && disabledList.includes(dropitemId)){
				_cruxUtils._showDisabledTooltip(true,'#'+dropitem.id,this.data.cxPropDisableMessage);
			}
			
		},

		hideDisableUserTooltip : function(event){
			_cruxUtils._showDisabledTooltip(false);
		},

		closeDropdown: function(event) {
			var key = event.key ? event.key.toLowerCase() : "";

			if(key === "esc" || key === "escape") {
				this.$node.querySelector(".outerDropdown").close(); //NO I18n
			}
		},

		clearInputField: function(evt) {
			this.actions.closeInnerDropdown.call(this);
				this.setData("cxPropInputValue", ""); //NO I18n
				//second param is to mark clear field close icon is clicked.
				this.outerDropdownBox.querySelector(".userSearchBox").focus(); //NO I18n
				this.searchUsers(evt, true);
			// }
		},

		closeInnerDropdown: function() {
			var outerDropbox = this.$node.querySelector(".outerDropdown").component.childComp; //NO I18N
			var filterDropDown = outerDropbox.querySelectorAll("lyte-dropdown"); //NO I18N
			
			if(filterDropDown && filterDropDown.length >0){
				let filterLen = filterDropDown.length
				for(var i=0; i< filterLen; i++){
					filterDropDown[i].close()
				}
			}
			// else if(filterDropDown){
			// 	filterDropDown.close();
			// }
		}
	},

	methods : {

		// body drop callbacks

		userSelected :  function(event, userId, dropdownComp, userItem){
			if(event) {
				event.stopPropagation();
			}
			if(this.getData("cxPropType") === "single") { //NO I18n
				var outerDropdown = this.outerDropdown;
				var filter = this.getData('cxPropFilterSelected'); //NO I18n
				var systemData = userItem.classList.contains("suggestedUser") ? this.getData("suggestedUsers") : this.getData("systemData"); //NO I18n
				var cxPropSelectedUser;
				var length = systemData.length;
				for(var i = 0; i < length; i++) {
					if(systemData[i].id === userId) {
						cxPropSelectedUser = systemData[i];
						break;
					}
				}
				this.setData("cxPropSelectedUser", cxPropSelectedUser); //NO I18n
				// outerDropdown.ltProp("displayValue", userFullName); //NO I18n
				var dropButton = outerDropdown.querySelector("lyte-drop-button"); //NO I18n
				dropButton.classList.remove("grayColor");

				if(!this.getData("cxPropUserButtonYield")) {
					var spanElem = dropButton.querySelector(".lyteDropdownLabel"); //NO I18N
					this.addTitle();
				}

				// clears the textbox if any user is selected from the dropdown and shows all users if dropdown is opened again.
				this.setData("cxPropInputValue", ""); //NO I18n
				//second param is to mark clear field close icon is clicked.
				// this.setData("isSearch", true); //NO i18n
				this.isSearch = true;
				this.searchUsers(undefined, true);
				//dev needs to place the selected item on the button if lyte-drop-button has some tags inside it instead of selected item name
//				if(this.getData("cxPropUserButtonYield")) { //NO I18n
//					var contentSpan = outerDropdown.querySelector("lyte-drop-button").querySelector("span"); //NO I18n
//					contentSpan.innerHTML = userFullName;
//				}
			}
			if(this.getMethods('onUserSelected')){ //NO I18n
				this.executeMethod('onUserSelected', event, cxPropSelectedUser, dropdownComp, userItem);  //NO I18n
			}
		},

		userBeforeShow : function(event, dropdownComp){
			// if(event) {
			// 	event.stopPropagation();
			// }
			if(this.getMethods('onUserBeforeShow')){ //NO I18n
				var returnVal = this.executeMethod('onUserBeforeShow', event, dropdownComp); //NO I18n
				if(returnVal === false) {
					return returnVal;
				}
			}
			if(this.data.cxPropRemoveDisableSelected == true){
				let disabledList = this.data.cxPropDisabledList;
				let selecteduser = this.data.cxPropSelected;
				if(disabledList && disabledList.includes(selecteduser)){
					const index = disabledList.indexOf(selecteduser);  
					if (index > -1) {
						Lyte.arrayUtils( disabledList , 'removeAt' , index , 1 );
						// this.setData("cxPropDisabledList", disabledList);
					}
				}
			}
			this.setData("cxPropUserGroupSelected", this.data.cxPropUserGroupSelected ? this.data.cxPropUserGroupSelected : this.data.cxPropUserGroups[0].model_name)
			if(this.data.cxPropUserGroupsFilter && this.data.cxPropUserGroupsFilter.length >0){
				this.setData({"cxPropUserFilterSelected" :(this.data.cxPropUserFilterSelected ? this.data.cxPropUserFilterSelected :  this.data.cxPropUserGroupsFilter[0][this.data.cxPropFilterUserValue]) ,  "cxPropUserGroupFilterSelected" : (this.data.cxPropUserGroupFilterSelected ? this.data.cxPropUserGroupFilterSelected : this.data.cxPropUserGroupsFilter[0].id)} )
				let selectedGroupId = this.data.cxPropUserGroupFilterSelected;
				this.setData("cxPropUserFilterObj", { "selectedRec" : this.data.cxPropUserGroupsFilter.filter(obj => obj.id == selectedGroupId)[0] , "model_name" : this.data.currentFilterValue.model_name} );
			}
			var filter = this.getData('cxPropFilterSelected'); //NO I18n
			if(this.getData("cxPropForcedFetch") === true || (!this.getData("dataFetched") && !this.getData("dataPending"))) { //NO I18n
				//-------------------------------------------
				// store.findAll('user', this.getQueryParams(), true, filter == 'ActiveUsers' ? true : false).then(function(resData){ //NO I18n
				this.setData("dataPending", true); //NO I18n
				// if(filter=='ActiveUsers' && this.getData("cxPropForcedFetch")==false){
				// 	this.setData("dataCache",true); //NO I18n
				// }else{
				// 	this.setData("dataCache",false); //NO I18n
				// }
				this.dataCache = filter === 'ActiveUsers' && this.getData("cxPropForcedFetch") === false; //NO I18N
				//resets data if forced fetch is true so that it doesn't accumulate and create duplicates
				if(this.getData("cxPropForcedFetch") === true) {
					// this.setData("localData", []); //NO I18N
					this.localData = [];
					this.setData("systemData", []); //NO I18N
					// this.setData("currentPos", 0); //NO I18N
					this.currentPos = 0;
					// this.setData("pageNo", 1); //NO I18N
					this.pageNo = 1;
					// this.setData("activeUsersPageNo", 1); //NO I18N
					this.activeUsersPageNo = 1;
				}

				// allows dev to make n/w req to user api and do desired operation on them then return the desired user data
				if(this.getMethods("onCustomUserRequest")) {
					var promise = this.executeMethod("onCustomUserRequest", 'user', this.getQueryParams(), this.cacheQuery, this.dataCache); //NO i18n
					if(promise.constructor === Promise) {
						Promise.resolve(promise).then(function(resData) {
						 this.openDropdown(resData, event, dropdownComp);
						 dropdownComp.$node.resetPosition();
					 }.bind(this),
					 function() {
						 this.setData("dataPending", true);  //NO I18n
						 this.errorHandling.call(this);
					 }.bind(this));
					}
				} else {
					if(!this.getData("cxPropIsSubordinate")){
						store.findAll('user', this.getQueryParams(), this.cacheQuery, this.dataCache).then(function(resData){ //NO I18n
		          this.openDropdown(resData, event, dropdownComp);
		          dropdownComp.$node.resetPosition();
						}.bind(this),
						function() {
							this.setData("dataPending", true);  //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					} else {
						store.triggerAction('user', "get_assigned" ,this.getQueryParams()).then(function(resData){ //NO I18n
		          this.openDropdown(resData, event, dropdownComp);
		          dropdownComp.$node.resetPosition();
						}.bind(this),
						function() {
							this.setData("dataPending", true);  //NO I18n
							this.errorHandling.call(this);
						}.bind(this));
					}
				}

				//shows waiting spinning gif
				this.setData("showLoading", true); //NO I18n
			}

			// var userSearchBox = this.outerDropdown.querySelector(".userSearchBox"); //NO I18n
			// if(userSearchBox) {
			// 	var wrapperDiv = userSearchBox.querySelector("div[class='lyteField']"); //NO I18n
			// 	wrapperDiv.setAttribute("style", "border: none; padding: 0px;");
			// }
		},

		userShow : function(event, dropdownComp){

			if(!this.getData("showLoading") && this.getMethods('onUserShow')){ //NO I18n
				this.executeMethod('onUserShow', event, dropdownComp); //NO I18n
			}
			if(!this.getData("cxPropDisabled") && this.getData("cxPropSearchable")) { //NO I18n
				var userDD = this.$node.querySelector("lyte-dropdown"); //NO I18n
				if(userDD.ltProp("show")) { //NO I18n
					userDD.component.childComp.querySelector(".userSearchBox").focus(); //NO I18n
				}
			}
			var ddChildComp = this.outerDropdown.component.childComp;
			var innerdd = ddChildComp ? ddChildComp.querySelector("lyte-dropdown") : null; //NO I18N

			if(this.getData("cxPropFilterable") && innerdd && !innerdd.ltProp("displayValue")) {
				var cxPropFilterSelected = this.getData("cxPropFilterSelected"); //NO I18N

				var selectedFilter = this.getData("cxPropFilterOptions").filter(function(filter) { //NO I18N
					return filter.id === cxPropFilterSelected;
				});

				innerdd.ltProp("displayValue", selectedFilter[0].category); //NO I18N
			}

			/* set keydown event listener for dropbox while opening for accessability */
			if(this.$node.cxProp('aria')){
				var mixinFuncCall = Lyte.registeredMixins['crux-aria-dropdown-mixin'];
				var lyteDropdown = this;
				if(this.$node){
					lyteDropdown = this.$node;
				}
				if(lyteDropdown.querySelector('lyte-dropdown')){
					lyteDropdown = lyteDropdown.querySelector('lyte-dropdown');
				}
				var lyteDropbox = lyteDropdown;
				if(lyteDropbox.component.childComp){
					lyteDropbox = lyteDropbox.component.childComp;
				}
				if(lyteDropbox && lyteDropbox.tagName == 'LYTE-DROP-BOX' && !$L(lyteDropbox).attr('keyListen')){
					lyteDropbox.listener = mixinFuncCall.keyEvent.bind(lyteDropbox);
					lyteDropbox.addEventListener('keydown', lyteDropbox.listener);
					$L(lyteDropbox).attr('keyListen', true);
				}
			}
		},

		userBeforeHide : function(event, dropdownComp){
			var div = dropdownComp.childComp.querySelector('div.wrapperdiv'); //NO I18n
			if(div){
				var inputElem = div.querySelector('#inputId');
				var innerDropdown = div.querySelector('lyte-dropdown');
				//event is undefined when invoked by toggle of outer dropdown
				if(event && div.contains(event.target) && ((innerDropdown && event.shiftKey && !innerDropdown.contains(event.target)) || (inputElem && !event.shiftKey && event.target != inputElem))){
				// if(event && div.contains(event.target)){
					return false;
				}
			}
			if(this.getMethods('onUserBeforeHide')){ //NO I18n
				return this.executeMethod('onUserBeforeHide', event, dropdownComp); //NO I18n
			}
		},

		userHide : function(event, dropdownComp){
			var innerDropdown = dropdownComp.childComp.querySelectorAll('lyte-dropdown'); //NO I18n
			if(innerDropdown && innerDropdown.length >0){
				let filterLen = innerDropdown.length
				for(var i=0; i< filterLen; i++){
					innerDropdown[i].close()
				}
			}
			else if(innerDropdown && innerDropdown.component && innerDropdown.component.childComp && !innerDropdown.component.childComp.classList.contains('lyteDropdownHidden')){
				innerDropdown.toggle();
			}

			// clears the textbox if any user is selected from the dropdown and shows all users if dropdown is opened again.
			this.setData("cxPropInputValue", ""); //NO I18n
			//second param is to mark clear field close icon is clicked.
			if(this.isSearch) {
				this.searchUsers(undefined, true);
			}

			if(this.getMethods('onUserHide')){ //NO I18n
				this.executeMethod('onUserHide', event, dropdownComp); //NO I18n
			}
		},
		userAdd : function(event, selectedId, allSelectedIds, dropdownComp, dropItemElem){
			var shouldAddUser = true;
			var allSelectedUserIds = JSON.parse(allSelectedIds);

			if(allSelectedUserIds.length > this.getData("cxPropMaxLimit")) {
				if(this.getMethods('onUserDropLimitErr')){
					this.executeMethod('onUserDropLimitErr'); //NO I18n
				} else {
					this.cxPropMaxLimitMessageBox();
				}
				shouldAddUser = false;
			}
			var innerDropdown = this.$node.querySelector("lyte-dropdown").component.childComp.querySelector(".wrapperdiv lyte-dropdown"); //NO I18N
			//if inner dropdown is not hidden, i.e it is open, hide the inner dropdown.
			if(innerDropdown && innerDropdown.component.childComp && !innerDropdown.component.childComp.classList.contains("lyteDropdownHidden")) {
				innerDropdown.toggle();
			}

			if(shouldAddUser) {
				var systemdata = this.getData('systemData'), addedItems = this.getData('addedItems'), systemValue = this.getData('cxPropSystemValue'); //NO I18n
				var selectedUser;
				var systemdataLength = systemdata.length;
				for(var i = 0; i < systemdataLength; i++){
					if(systemdata[i][systemValue] == selectedId){
						selectedUser = systemdata[i];
						break;
					}
				}

				if(this.getMethods('onUserAdd')){ //NO I18n
					var allSelectedUsers = addedItems.slice();
					allSelectedUsers.push(selectedUser);
					shouldAddUser = this.executeMethod('onUserAdd', event, selectedUser, allSelectedUsers, dropdownComp); //NO I18n
				}
			}

			if(shouldAddUser === false) {
				var updatedSelectedIds = allSelectedUserIds.filter(function(userId) {
					return userId !== selectedId;
				});
				dropdownComp.$node.ltProp("selected",JSON.stringify(updatedSelectedIds)); //NO i18n
			} else {
				Lyte.arrayUtils(addedItems, 'push', selectedUser); //NO I18n
				var body = this.outerDropdownBody;
				if(body && parseInt(body.scrollHeight) == parseInt(body.offsetHeight)){
					this.paintUsers.call(this);
				}

				var spanElem = this.$node.querySelector(".lyteMultipleSelect li[data-value='" + selectedUser.id +"'] .lyteDropdownVisible"); //NO I18N
				this.addTitle();

				this.createRemoveErrorDiv.call(this);
				this.setData("cxPropSelected", allSelectedIds); //NO I18n
				this.setData("cxPropSelectedUsers", addedItems); //NO I18n

				//fixes dropbox misposition
				dropdownComp.$node.resetPosition();

				this.scrollToEnd();
				let add_data = this.removeModifiedValue(selectedUser);
				if(add_data) {
					this.dataModified.added_ids.push(selectedUser) ;
				}
			}
		},

		userRemove : function(event, removedId, allSelectedIds, dropdownComp, eventType, dropItemElem){
			var shouldRemoveUser = true;
			var addedItems = this.getData('addedItems'), systemValue = this.getData('cxPropSystemValue'); //NO I18n
			var removedUser;
			var length = addedItems.length;
			for(var i = 0; i < length; i++){
				if(addedItems[i][systemValue] == removedId){
					removedUser = addedItems[i];
					break;
				}
			}
			if(this.getMethods('onUserRemove')){ //NO I18n
				var allSelectedUsers = addedItems.filter(function(item) {
					return item.id !== removedId;
				});
				shouldRemoveUser = this.executeMethod('onUserRemove', event, removedUser, allSelectedUsers, dropdownComp); //NO I18n
			}
			if(shouldRemoveUser === false) {
				dropdownComp.$node.ltProp("selected",JSON.stringify(addedItems.map(function(item) {return item.id}))); //NO I18n
			} else {
				Lyte.arrayUtils(addedItems, 'removeAt', i); //NO I18n
				this.setData("cxPropSelected", allSelectedIds); //NO I18n
				if(this.getMethods('onError') && this.getData('cxPropSearchable')) //NO I18n
				{
					var div = this.outerDropdownBody.querySelector('div.userComponent'); //NO I18n
					if(div){
						div.parentElement.removeChild(div);
					}
				}
				this.createRemoveErrorDiv.call(this);
				this.setData("cxPropSelectedUsers", addedItems); //NO I18n
				let add_data = this.removeModifiedValue(removedUser);
				if(add_data){ 
					this.dataModified.removed_ids.push(removedUser);
				}

				//fixes dropbox misposition
				dropdownComp.$node.resetPosition();
			}
		},

		userPositionChange : function(event, dropdownComp){
			if(this.getMethods('onUserPositionChange')){ //NO I18n
				this.executeMethod('onUserPositionChange', event, dropdownComp); //NO I18n
			}
		},

		userScroll : function(event, dropdownComp){
			if(!this.data.dataPending){
				var body = event.target;
				clearTimeout(this.timeout1);
				this.timeout1 = setTimeout(function() {
					if(body.scrollHeight <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop)))
					{
						//fix for scroll event is triggered when filter is changed in the inner dropdown. so when filter is changed, filterChanged is set tot true in filterObs
						if(!this.getData("filterChanged")) { //NO i18n
							if(this.isSearch) {
								this.paintUsers.call(this, "search"); //NO I18n
							} else {
								this.paintUsers.call(this);
							}

							if(this.getMethods('onUserScroll')){ //NO I18n
								this.executeMethod('onUserScroll', event, dropdownComp); //NO I18n
							}
						}
					}
				}.bind(this), 100);
			}
		},

		// user drop call backs

		filterSelected :  function(event, filterName, filterDropdownComp, filterDropItem){
			//dev needs to manually set the value to lyte-drop-button if exlipcitly passing lyte-drop-button as yield content
//			if(this.getData("cxPropFilterYield")) { //NO I18n
//				var selectedValue = filterDropdownComp.childComp.querySelector('[data-value="' + filterName +'"]').textContent; //NO I18n
//				var innerUserDropdown = document.querySelector("#innerUserDropdown"); //NO I18n
//				var innerUserDropdownButton = innerUserDropdown.querySelector("lyte-drop-button"); //NO I18n
//				innerUserDropdownButton.innerHTML = selectedValue;
//			}
//
			this.setData('cxPropFilterSelected', filterName); //NO I18n
			if(this.getMethods('onFilterSelected')){ //NO I18n
				this.executeMethod('onFilterSelected', event, filterName, filterDropdownComp, filterDropItem) //NO I18n
			}
		},

		filterBeforeShow : function(event, filterDropdownComp){
			if(this.getMethods('onFilterBeforeShow')){ //NO I18n
				return this.executeMethod('onFilterBeforeShow', event, filterDropdownComp); //NO I18n
			}
		},

		filterShow : function(event, filterDropdownComp){
			if(this.getMethods('onFilterShow')){ //NO I18n
				this.executeMethod('onFilterShow', event, filterDropdownComp); //NO I18n
			}
			this.outerDropdown.ltProp('preventNavigation', true);
			if(filterDropdownComp && filterDropdownComp.childComp && !filterDropdownComp.$node.className.includes('cxKeyboardNavClass')){
				var navScope = '#'+filterDropdownComp.childComp.querySelector('lyte-drop-body').id;

				if(!this.innerDropdown.ltProp('preventNavigation')){
					// event.preventDefault();
					this.innerDropdown.ltProp('preventNavigation', true);
					let obj={
						child: "lyte-drop-item",
						selectedClass: "lyteDropdownSelection",
						skipElements: ".disabled",
						scope: navScope,
						dropdown: this.innerDropdown,
						triggerClick: true
					};
					$L(filterDropdownComp.$node.querySelector('.lyteDummyEventContainer')).keyboardNavigator(obj);
					$L(filterDropdownComp.$node).addClass('cxKeyboardNavClass');
				}
			}
		},

		filterBeforeHide : function(event, filterDropdownComp){
			if(this.getMethods('onFilterBeforeHide')){ //NO I18n
				return this.executeMethod('onFilterBeforeHide', event, filterDropdownComp); //NO I18n
			}
		},

		filterHide : function(event, filterDropdownComp){
			if(filterDropdownComp && filterDropdownComp.$node.className.includes('cxKeyboardNavClass')){
				$L(filterDropdownComp.$node.querySelector('.lyteDummyEventContainer')).keyboardNavigator('destroy');
				$L(filterDropdownComp.$node).removeClass('cxKeyboardNavClass');
				this.innerDropdown.ltProp('preventNavigation', false);
			}
			if(this.getMethods('onFilterHide')){ //NO I18n
				this.executeMethod('onFilterHide', event, filterDropdownComp); //NO I18n
			}
			this.outerDropdown.ltProp('preventNavigation', false);
		},

		filterPositionChange : function(event, filterDropdownComp){
			if(this.getMethods('onFilterPositionChange')){ //NO I18n
				this.executeMethod('onFilterPositionChange', event, filterDropdownComp); //NO I18n
			}
		},

		filterScroll : function(event, filterDropdownComp){
			if(this.getMethods('onFilterScroll')){ //NO I18n
				this.executeMethod('onFilterScroll', event, filterDropdownComp); //NO I18n
			}
		},

		onBeforeUserSelect : function(event, selected_value,component, lyte_drop_item,value ){
			if(this.getMethods('onBeforeSelect')){ //NO I18n
				return this.executeMethod('onBeforeSelect', event, selected_value,component, lyte_drop_item,value); //NO I18n
			}
		},

		groupSelection: async function(event, selected_value) {
				let queryObj = {};
				this.setData("cxPropInputValue", "");
				this.setData("cxPropUserGroupSelected", selected_value);
				const selectObj = this.data.cxPropUserGroups.find(item => item.model_name === selected_value);
				this.setData("cxPropFilterUserValue", selectObj.nameSelector);
				this.setData("showLoading", true); //NO I18n
				if(selectObj.model_name == "user"){
					queryObj = this.getQueryParams();
					queryObj.page = 1;
				}
				const resultObj = await this.triggerFilteredUserGroup(selectObj.model_name, queryObj);
				this.usersUtil(resultObj.systemData,event);
				this.setData("showLoading", false); //NO I18n
				this.setData({"cxPropUserGroupsFilter" : resultObj[selectObj.model_name] })
				if (resultObj[selectObj.model_name] && resultObj[selectObj.model_name].length > 0) {
					this.setData({"cxPropUserFilterSelected" : resultObj[selectObj.model_name][0][selectObj.nameSelector], "cxPropUserGroupFilterSelected" : resultObj[selectObj.model_name][0].id});
					this.setData("cxPropUserFilterObj", { "selectedRec" : resultObj[selectObj.model_name][0] , "model_name" : selectObj.model_name} );
				}
				this.setData("currentFilterValue", selectObj);
				// this.excludeDisableHandling();
				

		},
		
		groupFilterSelection : async function(event, selected_value){
			this.setData("cxPropInputValue", "");
			const selected_group_id = this.data.cxPropUserGroupsFilter.filter(obj => obj.id === selected_value);
			this.setData({"cxPropUserFilterSelected": selected_group_id[0][this.data.cxPropFilterUserValue], "cxPropUserGroupFilterSelected" : selected_value });
			const model_name = this.data.cxPropUserGroups.filter(group => group.model_name === this.data.cxPropUserGroupSelected)[0].model_name;
			this.setData("cxPropUserFilterObj", { "selectedRec" : selected_group_id[0] , "model_name" : model_name} );
			this.setData("showLoading", true); //NO I18n
			const resultObj = await this.triggerFilterGroups("user", {id : selected_value, model_name : model_name});
			this.setData("showLoading", false); //NO I18n
			this.usersUtil(resultObj.systemData,event);
			// this.setData("systemData", resultObj.systemData ?  resultObj.systemData : [])
			// this.excludeDisableHandling();
			
			
		}
	},
	triggerFilteredUserGroup: async function(model_name, queryObj) {
		// try {
			var subQp = this.getSubordinateQp();
			let res;
			if(subQp && model_name == "user"){
				for(var key in subQp) {
					queryObj[key] = subQp[key];
				}
				 res = await this.cruxAssests.cxMakeRequest("triggerAction", "user", "get_assigned", queryObj , this.cacheQuery, this.dataCache);
			}else{
				res = await this.cruxAssests.cxMakeRequest("findAll", model_name, queryObj, this.cacheQuery, this.dataCache);
			}
			
			let resultObj = {};
			if(model_name == "user"){
				return {
					systemData : res ?  res : []
				}
			}else{
				if(res && res.constructor === Object &&  res[model_name].length){
					resultObj = await this.triggerFilterGroups("user", {id : res[model_name][0].id, model_name : model_name});
					return {
						[model_name]: res[model_name],
						systemData: resultObj.systemData ?  resultObj.systemData : []
					};
				}else{
					if(res.length >0 ){
						resultObj = await this.triggerFilterGroups("user", {id : res[0].id, model_name : model_name});
					}
					return {
						[model_name]: res,
						systemData : resultObj.systemData ?  resultObj.systemData : []
					}
				}
			}
			
			
			
		// } catch (error) {
		// 	console.error("An error occurred while triggering filtered user group:", error);
		// 	throw error; 
		// }
	},
	triggerFilterGroups : async function(model_name,queryObj){
		let usersList;
		let data;
		var obj = {type : this.data.cxPropFilterSelected }
		if (queryObj.model_name === "user_group") {
			obj.feature = "group_users";
			obj.related_entity_id = queryObj.id;
			obj.fields = ["id", "full_name", "email", "image_link", "status"];
			obj.page = 1;
			obj.per_page=200;
			usersList = await this.cruxAssests.cxMakeRequest("triggerAction", "user", "get_assigned", {"get_assigned" :obj} , this.cacheQuery, this.dataCache);
			data = usersList.constructor === Object  ? usersList.get_assigned : usersList;
		} else {
			if(queryObj.model_name == "role"){
				obj.filters = [{"field":"role","comparator":"equal","value":queryObj.id}]
				usersList = await this.cruxAssests.cxMakeRequest("findAll", "user", obj, this.cacheQuery, this.dataCache);
			}else{
				const queryParams = this.getQueryParams();
				Object.keys(queryParams).forEach((key) => {
					obj[key] = queryParams[key];
				});
				usersList = await this.cruxAssests.cxMakeRequest("triggerAction", "user", "get_assigned",obj , this.cacheQuery, this.dataCache);
			}

			
			data = usersList.constructor === Object  ? usersList.user : usersList;
		}
		
		return {
			systemData: data
		};
	},
	observeSelectedUser : function(){
		if(this.data.cxPropShowSuggestion){
			var selElements = $L( 'lyte-drop-item[selected=true]' , this.outerDropdownBody);
			var len = selElements ? selElements.length : 0 ;
			for(var i = 0 ; i < len ; i++){
				selElements[0].removeAttribute("selected");
			}
		}
		this.getData('cxPropShowSuggestion')
	}.observes('cxPropSelectedUser'),
    keyDownEvent : function(){
		if(this.$node.querySelector('lyte-dropdown') && this.$node.cxProp('aria')){
		  this.bindEventForAria();
		}
		this.getCruxAssetsPropertiesFn(); /* This is called for set hierarchy related filter Obj */
	}.observes('cxPropAria').on('didConnect')
},{"mixins":["crux-user-utils", "crux-aria-dropdown-mixin", "crux-element-validation"], "services": ["cruxAssests", {service:"cruxAssests", as:"request", scope : "static"}]}
); //NO I18n

Lyte.Component.registerHelper("classForDropBox", function (baseClass) { //NO I18n
	var outerDBox = this.component.outerDropdownBox;
	if (outerDBox && outerDBox.classList.contains("lyteDropdownHidden")) {
		return baseClass + " " + "lyteDropdownHidden";
	}

	return baseClass;
});

