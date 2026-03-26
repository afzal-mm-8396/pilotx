/**
 * @component crux-user-lookup
 * @author shashank.s
 * @version 1.0.0
 * @alias crm-user-lookup 1
 * @summary Crm User lookup is used to list the users within an org
 * @notes notes about the component if any
 * @methods beforeRadiobuttonClicked, onRadiobuttonClicked, beforeCheckboxChecked, beforeAllCheckboxChecked, beforeCheckboxUnChecked, beforeAllCheckboxUnChecked, onCheckboxChecked, onCheckboxUnChecked, onAllCheckboxChecked, onAllCheckboxUnChecked, onBodyShow,  onLookupClose, onAssign
*/

Lyte.Component.register("crux-user-lookup", {
_template:"<template tag-name=\"crux-user-lookup\"> <lyte-modal lt-prop-allow-multiple=\"{{cxPropAllowMultiple}}\" lt-prop-close-on-escape=\"{{cxPropCloseOnEscape}}\" class=\"lookupModal\" lt-prop-height=\"{{cxPropHeight}}\" lt-prop-max-height=\"{{cxPropMaxHeight}}\" lt-prop-show-close-button=\"false\" lt-prop-max-width=\"{{cxPropMaxWidth}}\" lt-prop-width=\"{{cxPropModalWidth}}\" lt-prop-transition=\"{{cxPropTransition}}\" lt-prop-wrapper-class=\"popUpWrapper userLookupModal {{if(ifEquals(cxPropType,'view'),'cruxUserView','')}} {{cxPropWrapperClass}}\" lt-prop-offset=\"{{cxPropOffset}}\" on-before-show=\"{{method('bodyBeforeShow')}}\" on-show=\"{{method('bodyShow')}}\" on-before-close=\"{{method('bodyBeforeClose')}}\" on-close=\"{{method('bodyClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <template is=\"if\" value=\"{{cxPropTitle}}\"><template case=\"true\"> <div class=\"cxUserLookupHeader\">{{cxPropTitle}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropHeaderYield,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;view&quot;)}}\"><template case=\"true\"> <div class=\"cxUserLookupHeader lookupHeaderStyle\"> <span class=\"cxUserLookupHeaderText lookupHeaderText\" data-zcqa=\"user_view_header_msg\">{{cxPropHeaderName}}</span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(DselectedList,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropReqForSelected,'&amp;&amp;',cxPropHeaderName)}}\"><template case=\"true\"> <div class=\"cxUserLookupHeader lookupHeaderStyle\"> <span class=\"cxUserLookupHeaderText lookupHeaderText\" data-zcqa=\"user_view_header_msg\">{{cxPropHeaderName}}</span> </div> </template></template> <div class=\"cxFlex user-lookup-section {{if(cxPropSearchable,'','cxUserLookupNoSearchCont')}}\"> <template is=\"if\" value=\"{{cxPropFilterable}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropFilterYield,'!')}}\"><template case=\"true\"> <lyte-dropdown data-zcqa=\"user_lookup_type\" class=\"cxUserLookupDropdown innerDrop pR\" lt-prop-callout=\"{{cxPropUserDropCallout}}\" lt-prop-selected=\"{{cxPropSelectedFilterOption}}\" lt-prop-show=\"{{cxPropUserDropShow}}\" lt-prop-freeze=\"{{cxPropUserDropFreeze}}\" lt-prop-disabled=\"{{cxPropUserDropDisabled}}\" lt-prop-boundary=\"{{cxPropUserDropBoundary}}\" on-show=\"{{method('showFilterDropdown')}}\" on-hide=\"{{method('hideFilterDropdown')}}\" on-option-selected=\"{{method('userSelected')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropFilterOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"user_lookup_type_{{item[cxPropFilterSystemValue]}}\" data-value=\"{{item[cxPropFilterSystemValue]}}\">{{item[cxPropFilterUserValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"> <lyte-dropdown data-zcqa=\"user_lookup_type\" class=\"innerDrop\" lt-prop-yield=\"true\" lt-prop-selected=\"{{cxPropSelectedFilterOption}}\" lt-prop-callout=\"{{cxPropUserDropCallout}}\" lt-prop-show=\"{{cxPropUserDropShow}}\" lt-prop-freeze=\"{{cxPropUserDropFreeze}}\" lt-prop-tabindex=\"{{cxPropUserDropTabindex}}\" lt-prop-disabled=\"{{cxPropUserDropDisabled}}\" lt-prop-boundary=\"{{cxPropUserDropBoundary}}\" on-option-selected=\"{{method('userSelected')}}\" on-show=\"{{method('showFilterDropdown')}}\" on-hide=\"{{method('hideFilterDropdown')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"userDropdownInner\"></lyte-yield> </template> </lyte-dropdown> </template></template></template></template><template is=\"if\" value=\"{{cxPropSearchable}}\"><template case=\"true\"> <div class=\"cxUserLookupSearch lookupSearch cxVam {{if(cxPropFilterable,'cxLookupFilterpresent','')}}\"> <lyte-input data-zcqa=\"user_lookup_search\" lt-prop-autocomplete=\"{{cxPropInputAutocomplete}}\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" lt-prop-autofocus=\"{{cxPropInputAutofocus}}\" lt-prop-disabled=\"{{cxPropInputDisabled}}\" lt-prop-style=\"{{cxPropInputStyle}}\" lt-prop-readonly=\"{{cxPropInputReadonly}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-type=\"{{cxPropInputType}}\" lt-prop-name=\"{{cxPropInputName}}\" lt-prop-width=\"{{cxPropInputWidth}}\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" lt-prop-appearance=\"{{cxPropInputAppearance}}\" lt-prop-direction=\"{{cxPropInputDirection}}\" lt-prop-tab-index=\"{{cxPropInputTabindex}}\" oninput=\"{{action('searchKeyup',event)}}\" style=\"width: 100%;\" on-focus=\"{{method('onInputFocus')}}\" on-blur=\"{{method('onInputBlur')}}\"> </lyte-input> <template is=\"if\" value=\"{{cxPropInputValue.length}}\"><template case=\"true\"> <span data-zcqa=\"user_lookup_search_clear\" class=\"{{if(cxPropInputValue,'lookupSearchCloseIcon cxCP','')}}\" onclick=\"{{action('clearInput',if(cxPropInputValue,true,false))}}\" style=\"{{if(searchingSearch,'display:none','display:inline-block')}};\"></span> </template></template> <span class=\"cxUserLookupSearchLoader\" style=\"{{if(searchingSearch,'','display:none')}};\"></span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','multiple'),'&amp;&amp;',expHandlers(cxPropSelectedCount,'>',0))}}\"><template case=\"true\"> <span data-zcqa=\"user_lookup_selected\" class=\"userSelection cxCP\" onclick=\"{{action('SelectedUserModal')}}\">{{cxPropSelectedLinkMessage}} </span> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowCloseIcon}}\"><template case=\"true\"> <span data-zcqa=\"user_lookup_close\" class=\"userLookupCloseButton lyteModalClose\" onclick=\"{{action('closeUserLookup')}}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==','single'),'&amp;&amp;',expHandlers(cxPropFooterYield,'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{showSelectedFooter}}\"><template case=\"true\"> <div class=\"cxFlex user-lookup-right\"> <span data-zcqa=\"user_lookup_selected\" class=\"singleUserSelected alignSelectedFooter\">{{cruxGetI18n('crm.label.selected')}} {{cruxGetI18n('crm.auditlog.user')}}: </span> <template is=\"if\" value=\"{{showPlaceholderForSelected}}\"><template case=\"true\"> <div class=\"cxUserLookupImgDummy\"></div> <div class=\"cxUserLookupSelNameDummy\"></div> </template><template case=\"false\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(displaySingleUser.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg alignSelectedFooter pA\"></span> </template><template case=\"false\"> <img src=\"{{displaySingleUser.image_link}}\" class=\"cxUserLookupUserImg alignSelectedFooter pA\"> </template></template> <span class=\"cxUserLookupProfileName alignSelectedFooter\">{{userFieldValues(displaySingleUser,\"full_name\")}}</span> </div> </template></template> </div> </template></template> </template></template> </template></template></template></template></template></template> </div> </template><template case=\"false\"> <span data-zcqa=\"user_lookup_back\" class=\"userLookupBackIcon\" onclick=\"{{action('bactToLookup')}}\"></span> <div data-zcqa=\"user_lookup_selected\" class=\"selectedUsersHd\">{{cxPropSelectedHeaderMsg}}</div> <template is=\"if\" value=\"{{cxPropReqForSelected}}\"><template case=\"true\"> <div class=\"cxFlex\"> <template is=\"if\" value=\"{{cxPropSearchable}}\"><template case=\"true\"> <div class=\"cxUserLookupSearch lookupSearch {{if(cxPropFilterable,'cxLookupFilterpresent','')}}\"> <lyte-input data-zcqa=\"user_lookup_search\" lt-prop-autocomplete=\"{{cxPropInputAutocomplete}}\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" lt-prop-autofocus=\"{{cxPropInputAutofocus}}\" lt-prop-disabled=\"{{cxPropInputDisabled}}\" lt-prop-style=\"{{cxPropInputStyle}}\" lt-prop-readonly=\"{{cxPropInputReadonly}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-type=\"{{cxPropInputType}}\" lt-prop-name=\"{{cxPropInputName}}\" lt-prop-width=\"{{cxPropInputWidth}}\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" lt-prop-appearance=\"{{cxPropInputAppearance}}\" lt-prop-direction=\"{{cxPropInputDirection}}\" lt-prop-tab-index=\"{{cxPropInputTabindex}}\" oninput=\"{{action('searchKeyup',event)}}\" style=\"width: 100%;\" on-focus=\"{{method('onInputFocus')}}\" on-blur=\"{{method('onInputBlur')}}\"> </lyte-input> <template is=\"if\" value=\"{{cxPropInputValue.length}}\"><template case=\"true\"> <span data-zcqa=\"user_lookup_search_clear\" class=\"{{if(cxPropInputValue,'lookupSearchCloseIcon cxCP','')}}\" onclick=\"{{action('clearInput',if(cxPropInputValue,true,false))}}\" style=\"{{if(searchingSearch,'display:none','display:inline-block')}};\"> </span> </template></template> <span class=\"cxUserLookupSearchLoader\" style=\"{{if(searchingSearch,'','display:none')}};\"></span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSelectedCount,'>',0)}}\"><template case=\"true\"> <span data-zcqa=\"user_lookup_selected\" class=\"cxUserLookupSelCountLabel\"> {{cxPropSelectedLinkMessage}} </span> </template></template> </div> </template></template> </template></template> </template><template case=\"false\"> <div class=\"cxHeaderMinHeight\"> <lyte-yield yield-name=\"userHeaderYield\"></lyte-yield> </div> </template></template> </lyte-modal-header> <lyte-modal-content class=\"lookupModalContent {{if(cxLookupCheckForFooterAvailability(cxPropFooterYield,cxPropType),'','cxLookupModalNoFooter')}}\" onmouseenter=\"{{action('mouse',event)}}\"> <div class=\"cxUserLookupTableWrap\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <template is=\"if\" value=\"{{expHandlers(cxPropShowSuggestion,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupListLoader\" style=\"{{if(searchingUser,'','display:none')}};\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(DselectedList,'!')}}\"><template case=\"true\"> <lyte-table lt-prop-yield=\"true\" id=\"cruxUserLookupTable\" onscroll=\"{{action('tableScroll',event)}}\" class=\"cxCommonTable {{cruxUserLookupContentStatus(systemData.length,cxPropReqForSelected,showNoDataMsg)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <lyte-th class=\"lookupTableHeaderWidth lookupFirstMinWidth\" fixed=\"enable\"></lyte-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multiple&quot;)}}\"><template case=\"true\"> <lyte-th class=\"lookupTableHeaderWidth lookupFirstMinWidth\" fixed=\"enable\"> <template is=\"if\" value=\"{{cxPropShowAllselectCheckbox}}\"><template case=\"true\"> <lyte-checkbox data-zcqa=\"user_lookup_select_all_checkbox\" class=\"{{if(ifEquals(systemData.length,0),'vh','')}}\" lt-prop-checked=\"{{lbind(allCheckboxState)}}\" lt-prop-name=\"allSelectCheckbox\" on-changed=\"{{method('allCheckboxOnChanged')}}\" on-before-checked=\"{{method('allCheckboxOnBeforeChecked')}}\" on-checked=\"{{method('allCheckboxChecked')}}\" on-unchecked=\"{{method('allCheckboxUnchecked')}}\" on-before-unchecked=\"{{method('allCheckboxbeforeUnchecked')}}\"> </lyte-checkbox> </template></template> </lyte-th> </template></template></template></template> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-th class=\"lookupTableHeaderColor {{if(ifEquals(cxPropType,'view'),'viewHeaderPadding','')}}\" fixed=\"{{if(feildName.isSticky,'enable','')}}\">{{feildName.displayValue}}</lyte-th> </template> </lyte-tr> </lyte-thead> <lyte-tbody id=\"userLookupTableBody\" style=\"{{if(searchingUser,'visibility:hidden','')}};\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowSuggestion,'&amp;&amp;',expHandlers(expHandlers(cxPropFilter,'==',&quot;AllUsers&quot;),'||',expHandlers(cxPropFilter,'==',&quot;ActiveUsers&quot;)))}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupSubHeadingRow\"> <lyte-td class=\"cxUserLookupSubHeadingCell\"> <span class=\"cxUserLookupRowHeading\">{{cxPropSuggestion.label}}</span> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> <template is=\"if\" value=\"{{cxPropShowSuggestionLoading}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupListLoaderTr\"> <lyte-td class=\"cxUserLookupListLoaderTd\"> <span class=\"cxUserLookupListLoader ziaLookupLoader\"></span> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(suggestedUsers.length,'>',0)}}\"><template case=\"true\"><template is=\"for\" items=\"{{suggestedUsers}}\" item=\"item\" index=\"index\"> <lyte-tr class=\"cxUserLookupZiaSuggestedRow\" onclick=\"{{action('rowClick',event,this,index,item)}}\" data-zcqa=\"user_lookup_list_{{item.full_name}}\"> <lyte-td><lyte-radiobutton lt-prop-prevent-focus=\"{{preventFocus}}\" data-zcqa=\"user_lookup_list_radiobutton_{{item.full_name}}\" lt-prop-type=\"primary\" class=\"radioLookupTableBodypadding suggestionRadioButton\" on-changed=\"{{method('radiobuttonOnChanged')}}\" lt-prop-checked=\"{{lbind(item.lookup_selected_val)}}\" on-before-checked=\"{{method('radiobuttonOnBeforeChecked')}}\" on-checked=\"{{method('radiobuttonChecked',item)}}\" lt-prop-name=\"sRadioButton\" lt-prop-value=\"{{index}}\"></lyte-radiobutton></lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td class=\"lookupTableBodyColor\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(feildName.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg\"></span> </template><template case=\"false\"> <img src=\"{{item.image_link}}\" class=\"cxUserLookupUserImg\"> </template></template> </template></template> </div> <div class=\"cxUserLookupTextWrap\"> <span class=\"cruxUserLookupText {{if(ifEquals(feildName.systemValue,'full_name'),'cruxUserLookupImage','')}}\" onmouseover=\"{{action('checkForToolTip',this,userFieldValues(item,feildName.systemValue))}}\">{{userDispVal(feildName.systemValue,userFieldValues(item,feildName.systemValue))}}</span> <template is=\"if\" value=\"{{expHandlers(feildName.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <span class=\"cxUserLookupZiaPercent\">{{item.confidence_percentage}}%</span> </template></template> </div> </lyte-td> </template> </lyte-tr> </template></template><template case=\"false\"> <lyte-tr class=\"cxUserLookupListLoaderTr\"> <lyte-td class=\"cxUserLookupListLoaderTd\"> <div class=\"ziaNoUsersLookup cxUserLookupNoSuggestion\">{{cxPropNoSuggestionValue}}</div> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template></template></template></template> <lyte-tr class=\"cxUserLookupSubHeadingRow\"> <lyte-td class=\"cxUserLookupSubHeadingCell cxUserLookupSubHeadingSecondCell\"> <span class=\"cxUserLookupRowHeading\">Users</span> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> <template is=\"if\" value=\"{{searchingUser}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupListLoaderTr\"> <lyte-td class=\"cxUserLookupListLoaderTd\"> <span class=\"cxUserLookupListLoader ziaLookupLoader\"></span> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template></template> </template></template> <template is=\"for\" items=\"{{systemData}}\" item=\"item\" index=\"index\"> <lyte-tr onclick=\"{{action('rowClick',event,this,index)}}\" data-zcqa=\"user_lookup_list_{{item.full_name}}\" class=\"{{if(ifEquals(item.id,displaySingleUser.id),'cxUserLookupRowActive')}}\"> <lyte-td><lyte-radiobutton data-zcqa=\"user_lookup_list_radiobutton_{{item.full_name}}\" lt-prop-prevent-focus=\"{{preventFocus}}\" lt-prop-type=\"primary\" class=\"radioLookupTableBodypadding\" on-changed=\"{{method('radiobuttonOnChanged')}}\" lt-prop-checked=\"{{lbind(item.lookup_selected_val)}}\" on-before-checked=\"{{method('radiobuttonOnBeforeChecked')}}\" on-checked=\"{{method('radiobuttonChecked',item)}}\" lt-prop-name=\"radioButton\" lt-prop-value=\"{{index}}\"></lyte-radiobutton></lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"><template is=\"if\" value=\"{{expHandlers(feildName.yield,'!')}}\"><template case=\"true\"> <lyte-td class=\"lookupTableBodyColor\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(feildName.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg\"></span> </template><template case=\"false\"> <img src=\"{{item.image_link}}\" class=\"cxUserLookupUserImg\"> </template></template> </template></template> <span class=\"cruxUserLookupText {{if(ifEquals(feildName.systemValue,'full_name'),'cruxUserLookupImage','')}}\" onmouseover=\"{{action('checkForToolTip',this,userFieldValues(item,feildName.systemValue))}}\">{{userDispVal(feildName.systemValue,userFieldValues(item,feildName.systemValue))}}</span> </div> </lyte-td> </template><template case=\"false\"> <lyte-td class=\"cxHeaderMinHeight\"> <lyte-yield yield-name=\"{{feildName.systemValue}}\" cell-index=\"{{index}}\" cell-value=\"{{item}}\"></lyte-yield> </lyte-td> </template></template></template> </lyte-tr> </template><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropShowSuggestion,'&amp;&amp;',expHandlers(systemData.length,'==',0)),'&amp;&amp;',expHandlers(firstOpen,'!'))}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupListLoaderTr\"> <lyte-td class=\"cxUserLookupListLoaderTd\"> <div class=\"cxUserLookupNoSuggestion\">{{cxPropNoUserAvilableMsg}}</div> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','multiple')}}\"><template case=\"true\"><template is=\"for\" items=\"{{systemData}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropReqForSelected,'!'),'||',expHandlers(cxPropReqForSelected,'&amp;&amp;',expHandlers(item.lookup_newely_selected_val,'!==','selected')))}}\"><template case=\"true\"> <lyte-tr onclick=\"{{action('rowClick',event,this,index)}}\" data-zcqa=\"user_lookup_list_{{item.full_name}}\" class=\"{{if(cruxAnd(item.lookup_selected_val,expHandlers(DselectedList,'!')),'cxUserLookupSelectedRow','')}}\"> <lyte-td class=\"lookupTableBodypadding\"> <lyte-checkbox id=\"cxUserLookupUserCheckbox\" data-zcqa=\"user_lookup_list_checkbox_{{item.full_name}}\" lt-prop-checked=\"{{lbind(item.lookup_selected_val)}}\" lt-prop-value=\"{{index}}\" lt-prop-name=\"checkbox\" on-checked=\"{{method('checkboxChecked')}}\" on-unchecked=\"{{method('checkboxUnchecked')}}\" on-before-checked=\"{{method('checkboxOnBeforeChecked')}}\" on-changed=\"{{method('checkboxOnChanged')}}\" on-before-unchecked=\"{{method('checkboxOnBeforeUnChecked')}}\"></lyte-checkbox> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"value\" index=\"position\"><template is=\"if\" value=\"{{expHandlers(value.yield,'!')}}\"><template case=\"true\"> <lyte-td class=\"lookupTableBodyColor\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(value.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg\"></span> </template><template case=\"false\"> <img src=\"{{item.image_link}}\" class=\"cxUserLookupUserImg\"> </template></template> </template></template> <span class=\"cruxUserLookupText {{if(ifEquals(value.systemValue,'full_name'),'cruxUserLookupImage','')}}\" onmouseover=\"{{action('checkForToolTip',this,userFieldValues(item,value.systemValue))}}\">{{userDispVal(value.systemValue,userFieldValues(item,value.systemValue))}}</span> </div> </lyte-td> </template><template case=\"false\"> <lyte-td class=\"cxHeaderMinHeight\"> <lyte-yield yield-name=\"{{value.systemValue}}\" cell-index=\"{{index}}\" cell-value=\"{{item}}\"></lyte-yield> </lyte-td> </template></template></template> </lyte-tr> </template></template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;view&quot;)}}\"><template case=\"true\"><template is=\"for\" items=\"{{systemData}}\" item=\"item\" index=\"index\"> <lyte-tr class=\"viewLookupTr\" data-zcqa=\"user_view_list_{{item.full_name}}\"> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"value\" index=\"position\"><template is=\"if\" value=\"{{expHandlers(value.yield,'!')}}\"><template case=\"true\"> <lyte-td class=\"lookupTableBodyColor\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(value.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg\"></span> </template><template case=\"false\"> <img src=\"{{item.image_link}}\" class=\"cxUserLookupUserImg\"> </template></template> </template></template> <span class=\"cruxUserLookupText {{if(ifEquals(value.systemValue,'full_name'),'cruxUserLookupImage','')}}\" onmouseover=\"{{action('checkForToolTip',this,userFieldValues(item,value.systemValue))}}\">{{userDispVal(value.systemValue,userFieldValues(item,value.systemValue))}}</span> </div> </lyte-td> </template><template case=\"false\"> <lyte-td class=\"cxHeaderMinHeight\"> <lyte-yield something=\"\" yield-name=\"headerDetail\" cell-index=\"{{index}}\" cell-value=\"{{item}}\" current-header=\"{{value}}\"></lyte-yield> </lyte-td> </template></template></template> </lyte-tr> </template></template></template></template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropReqForSelected,'!'),'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',expHandlers(systemData.length,'==',0)),'||',expHandlers(expHandlers(cxPropReqForSelected,'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',showNoDataMsg))}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupEmptyRow\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!==',&quot;view&quot;)}}\"><template case=\"true\"> <lyte-td></lyte-td> </template></template> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"value\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template></template> </lyte-tbody> </lyte-table-structure> <div class=\"scrollSearchDiv\" style=\"{{if(searchingScroll,'display:block','display:none')}};\"> <span class=\"cxUserLookupLazyLoader\"></span> </div> </template> </lyte-table> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropShowSuggestion,'!'),'&amp;&amp;',expHandlers(cxPropReqForSelected,'!')),'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',expHandlers(systemData.length,'==',0)),'||',expHandlers(expHandlers(cxPropReqForSelected,'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',showNoDataMsg))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <div class=\"NoUsersLookup NoUsersLookupInTable {{cxPropNoContentClass}}\">{{cxPropNoUserAvilableMsg}}</div> </template></template> </template><template case=\"false\"> <lyte-table lt-prop-yield=\"true\" id=\"cruxUserLookupTable\" onscroll=\"{{action('tableScroll',event)}}\" class=\"cxCommonTable {{cruxUserLookupContentStatus(addedItems.length,cxPropReqForSelected,showNoDataMsg)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th class=\"lookupTableHeaderWidth lookupFirstMinWidth\" fixed=\"enable\"> <template is=\"if\" value=\"{{cxPropShowAllselectCheckbox}}\"><template case=\"true\"> <lyte-checkbox id=\"cxUserLookupUserCheckbox\" data-zcqa=\"user_lookup_select_all_checkbox\" class=\"{{if(ifEquals(addedItems.length,0),'vh','')}}\" lt-prop-checked=\"{{lbind(selectedCheckBoxValue)}}\" lt-prop-name=\"selectedAllSelectCheckbox\" on-changed=\"{{method('allCheckboxOnChanged')}}\" on-before-checked=\"{{method('allCheckboxOnBeforeChecked')}}\" on-checked=\"{{method('allCheckboxChecked')}}\" on-unchecked=\"{{method('allCheckboxUnchecked')}}\" on-before-unchecked=\"{{method('allCheckboxbeforeUnchecked')}}\"> </lyte-checkbox> </template></template> </lyte-th> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"> <lyte-th class=\"lookupTableHeaderColor\" fixed=\"{{if(feildName.isSticky,'enable','')}}\">{{feildName.displayValue}}</lyte-th> </template> </lyte-tr> </lyte-thead> <lyte-tbody id=\"selectedUserLookupTableBody\" style=\"{{if(searchingUser,'visibility:hidden','')}};\"> <template is=\"for\" items=\"{{addedItems}}\" item=\"item\" index=\"index\"> <lyte-tr onclick=\"{{action('rowClick',event,this,index)}}\" data-zcqa=\"user_lookup_list_{{item.full_name}}\" style=\"{{if(ifEquals(item.lookup_newely_selected_val,'unSelected'),'display:none','')}};\" class=\"{{if(cruxAnd(item.lookup_selected_val,expHandlers(DselectedList,'!')),'cxUserLookupSelectedRow','')}}\" onmouseover=\"{{action('rowMouseOver',this)}}\" onmouseout=\"{{action('rowMouseOut',this)}}\"> <lyte-td class=\"lookupTableBodypadding\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"body-prefix-yield\" record-obj=\"{{item}}\" index-val=\"{{index}}\"></lyte-yield> </template><template case=\"false\"> <lyte-checkbox data-zcqa=\"user_lookup_list_checkbox_{{item.full_name}}\" on-changed=\"{{method('checkboxOnChanged')}}\" lt-prop-checked=\"{{lbind(item.lookup_selected_val)}}\" lt-prop-value=\"{{index}}\" lt-prop-name=\"checkbox\" on-checked=\"{{method('checkboxChecked')}}\" on-unchecked=\"{{method('checkboxUnchecked')}}\" on-before-checked=\"{{method('checkboxOnBeforeChecked')}}\" on-before-unchecked=\"{{method('checkboxOnBeforeUnChecked')}}\"></lyte-checkbox> </template></template> </lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"feildName\" index=\"position\"><template is=\"if\" value=\"{{expHandlers(feildName.yield,'!')}}\"><template case=\"true\"> <lyte-td class=\"lookupTableBodyColor\"> <div class=\"cxUserLookupProfileSection \"> <template is=\"if\" value=\"{{expHandlers(feildName.systemValue,'==',&quot;full_name&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.image_link,'!')}}\"><template case=\"true\"> <span class=\"cxUserLookupNoPhoto cxUserLookupUserImg\"></span> </template><template case=\"false\"> <img src=\"{{item.image_link}}\" class=\"cxUserLookupUserImg\"> </template></template> </template></template> <span class=\"cruxUserLookupText {{if(ifEquals(feildName.systemValue,'full_name'),'cruxUserLookupImage','')}}\" onmouseover=\"{{action('checkForToolTip',this,userFieldValues(item,feildName.systemValue))}}\">{{userDispVal(feildName.systemValue,userFieldValues(item,feildName.systemValue))}}</span> </div> </lyte-td> </template><template case=\"false\"> <lyte-td class=\"cxHeaderMinHeight\"> <lyte-yield yield-name=\"{{feildName.systemValue}}\" cell-index=\"{{index}}\" cell-value=\"{{item}}\"></lyte-yield> </lyte-td> </template></template></template> </lyte-tr> </template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropReqForSelected,'!'),'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',expHandlers(addedItems.length,'==',0)),'||',expHandlers(expHandlers(cxPropReqForSelected,'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',showNoDataMsg))}}\"><template case=\"true\"> <lyte-tr class=\"cxUserLookupEmptyRow\"> <lyte-td></lyte-td> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"value\" index=\"position\"> <lyte-td></lyte-td> </template> </lyte-tr> </template></template> </lyte-tbody> </lyte-table-structure> <div class=\"scrollSearchDiv\" style=\"{{if(searchingSelectedScroll,'display:block','display:none')}};\"> <span class=\"cxUserLookupLazyLoader\"></span> </div> </template> </lyte-table> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropReqForSelected,'!'),'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',expHandlers(addedItems.length,'==',0)),'||',expHandlers(expHandlers(cxPropReqForSelected,'&amp;&amp;',expHandlers(searchingUser,'!')),'&amp;&amp;',showNoDataMsg))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <div class=\"NoUsersLookup {{cxPropNoContentClass}}\">{{cxPropNoUserAvilableMsg}}</div> </template></template> </template></template> </div> </lyte-modal-content> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFooterYield,'!'),'&amp;&amp;',expHandlers(cxPropType,'!=',&quot;view&quot;))}}\"><template case=\"true\"> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closeUserLookup')}}\" data-zcqa=\"user_lookup_cancel\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropFooterButtonsLiterals.cancel}} </template> </lyte-button> <lyte-button lt-prop-id=\"LookupAssignButton\" lt-prop-disabled=\"{{lbind(buttonAccessibility)}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('assignSelectedUsers')}}\" data-zcqa=\"user_lookup_assign\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> {{cruxGetI18n('Done')}} </template><template case=\"false\"> {{cxPropFooterButtonsLiterals.save}} </template></template> </template> </lyte-button> </lyte-modal-footer> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropType,'==','single'),'||',expHandlers(cxPropType,'==','view')),'||',expHandlers(cxPropType,'==','multiple')),'&amp;&amp;',cxPropFooterYield)}}\"><template case=\"true\"> <lyte-modal-footer> <lyte-yield yield-name=\"userFooterYield\"></lyte-yield> </lyte-modal-footer> </template></template></template></template> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,2]},{"type":"if","position":[3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingSearch","'display:none'","'display:inline-block'"]}},"';'"]}}}}]}},"default":{}},{"type":"attr","position":[1,5],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingSearch","''","'display:none'"]}},"';'"]}}}}]}},"default":{}},{"type":"attr","position":[3,4]},{"type":"if","position":[3,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,1,2]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[1,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingSearch","'display:none'","'display:inline-block'"]}},"';'"]}}}}]}},"default":{}},{"type":"attr","position":[1,5],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingSearch","''","'display:none'"]}},"';'"]}}}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,1,1]},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingUser","''","'display:none'"]}},"';'"]}}}}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"for","position":[1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingUser","'visibility:hidden'","''"]}},"';'"]}}}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"for","position":[5,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingScroll","'display:block'","'display:none'"]}},"';'"]}}}}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"attr","position":[1,1,1,3]},{"type":"for","position":[1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingUser","'visibility:hidden'","''"]}},"';'"]}}}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["item.lookup_newely_selected_val","'unSelected'"]}},"'display:none'","''"]}},"';'"]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["searchingSelectedScroll","'display:block'","'display:none'"]}},"';'"]}}}}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropPluralModuleName","cxPropSingularModuleName","cxPropMaxLimitMsg","cxPropAllowMultiple","cxPropCustomRequest","cxPropNoUserAvilableMsg","currentlyExcludedArray","cxPropLookupWidth","cxPropViewWidth","allCheckboxbeforeUnchecked","allCheckboxState","buttonAccessibility","cxPropWrapperClass","stopScrolling","cxPropQueryParams","selectedCheckBoxValue","cxPropPrimaryKey","cxPropHeader","cxPropHeaderYield","cxPropFooterYield","cxPropNetworkData","displaySingleUser","cxPropSelectedPerPage","searchingScroll","noUsersAvilabel","firstOpen","cxPropModalWidth","cxPropShow","DselectedList","selectedList","cxPropType","cxPropForcedFetch","systemData","localData","pageNo","noMoreRecords","addedItems","totalAddedObjects","currentPos","isSearch","multiScroll","searchingSearch","searchingUser","cxPropCacheQuery","cxPropDataCache","cxPropPerPage","cxPropSelectedIds","cxPropSelectedId","cxPropExclude","cxPropModuleName","cxPropMaxLimit","cxPropHeaderName","cxPropUserDropShow","cxPropUserDropFreeze","cxPropUserDropDisabled","cxPropUserDropBoundary","cxPropUserDropCallout","cxPropUserDropTabindex","cxPropFilter","cxPropFilterYield","cxPropFilterOptions","cxPropSelectedFilterOption","cxPropFilterUserValue","cxPropFilterSystemValue","cxPropSearchable","cxPropFilterable","cxPropRecords","cxPropMinLength","cxPropInputAutocomplete","cxPropInputPlaceholder","cxPropInputAutofocus","cxPropInputDisabled","cxPropInputStyle","cxPropInputReadonly","cxPropInputId","cxPropInputClass","cxPropInputType","cxPropInputName","cxPropInputWidth","cxPropInputValue","cxPropInputAppearance","cxPropInputDirection","cxPropInputWrapperStyle","cxPropInputTabindex","cxPropCriteria","cxPropSearchCriteria","cxPropPreventKeyDown","cxPropReqForSelected","cxPropSelectedCount","cxPropSelectedList","cxPropSetEmptyFilter","cxPropSelectedLinkMessage","cxPropPreventRowClick","showPlaceholderForSelected","showSelectedFooter","cxPropMaxLimitDuration","cxPropSelectedQueryParams","messageBoxType","cxPropUserFieldProperties","cxPropShowSuggestion","cxPropShowSuggestionLoading","cxPropSuggestion","suggestedUsers","cxPropNoSuggestionValue","cxPropIsSubordinate","cxPropHierarchyFilter","cxPropSelectedView","cxPropPrefixYield","cxPropTransition","cxPropOffset","cxPropTitle","cxPropShowCloseIcon","cxPropCloseOnEscape","preventFocus","openRequest","cxPropReqForSelectedValue","cxPropShowAllselectCheckbox","cxPropFooterButtonsLiterals","showNoDataMsg","cxPropSelectedHeaderMsg","cxPropModalWidth","cxPropMaxWidth","cxPropMaxHeight","cxPropHeight","cxPropNoContentClass"],
_observedAttributesType :["string","string","string","boolean","boolean","string","array","string","string","boolean","boolean","boolean","string","boolean","object","boolean","string","array","boolean","boolean","object","object","number","boolean","boolean","boolean","string","boolean","boolean","boolean","string","boolean","array","array","number","boolean","array","array","number","boolean","boolean","boolean","boolean","boolean","boolean","number","array","string","array","string","number","string","boolean","boolean","boolean","object","boolean","string","string","boolean","array","string","string","string","boolean","boolean","number","number","string","string","boolean","boolean","string","boolean","string","string","string","string","string","string","string","string","string","string","string","string","boolean","boolean","number","boolean","boolean","string","boolean","boolean","boolean","string","object","string","object","boolean","boolean","object","array","string","boolean","object","boolean","boolean","object","object","string","boolean","boolean","boolean","boolean","object","boolean","object","boolean","string","string","string","string","string","string"],
 //NO I18n
  search_rejected: function(){
    if(this.data.cxPropReqForSelected && this.data.noUsersAvilabel){
      if(this.data.selectedList){
        this.setData("addedItems", []); //NO I18N
      } else {
        this.setData("systemData", []); //NO I18N
      }
      this.setData({
        "localData" : [],
        "searchingUser" : true
      });
      this.addNewelySelectedToTop();
      this.setData("searchingUser", false); //NO I18N
      this.checkIfNoResultStatus();
    }
  },
  beforeNewRequest: function(){
    if(this.data.cxPropReqForSelected){
      this.isNewRequest = true;
      this.batchDispCount = 0;
      if(!this.preventLoadMoreData){
        this.preventLoadMoreData = false;
      }
      if(this.data.pageNo === 1){
        this.initialRequest = true;
        if(this.data.cxPropReqForSelected ){
         if(this.data.selectedList){
            this.setData("addedItems", []); //NO I18n
          } else {
            this.setData("systemData", []); //NO I18n
          }
          this.setData("searchingUser", true); //NO I18n
        }
      } 
    }
    
    if(this.data.pageNo === 1 || this.data.pageNo === 0){
      var tableEle = this.bodydrop.querySelector('#cruxUserLookupTable'); //No I18N
      if(tableEle){
        tableEle.scrollTable(0,0); //NO I18n
      }
    }
  },
  addNewelySelectedToTop : function(){
    if ( this.getData("cxPropReqForSelected") && !this.getData("isSearch") &&  /*this.getData("pageNo") === 2*/ this.initialRequest ){
      if(this.getData("selectedList")){
        var newLen = this.newelySelected.length;
        if(newLen){
          for(var i = 0; i < newLen; i++){
            Lyte.arrayUtils(this.getData('localData'),'unshift',this.newelySelected[i]); //NO I18n
            Lyte.arrayUtils(this.getData('addedItems'),'unshift',this.newelySelected[i]); //NO I18n
          }
        }
        this.valueAddedToCurrentList = this.newelySelected;
        _cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
      } else {
        var newLen = this.newelyUnSelected.length;
        if(newLen){
          for(var i = 0; i < newLen; i++){
            Lyte.arrayUtils(this.getData('localData'),'unshift',this.newelyUnSelected[i]); //NO I18n
            Lyte.arrayUtils(this.getData('systemData'),'unshift',this.newelyUnSelected[i]); //NO I18n
          }
        }
        this.valueAddedToCurrentList = this.newelyUnSelected;
      }
      _cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
      this.setData("currentPos" , this.data.currentPos + newLen); //NO I18n
    }
    if(this.getData("isSearch") && this.data.cxPropReqForSelected && /*this.getData("pageNo") === 2*/ this.initialRequest){
    var localSearchResp;
    if(this.data.cxPropReqForSelected){
      localSearchResp = this.performLocalSearch(this.data.cxPropInputValue);
     }
    var newLen = localSearchResp.length;
    Lyte.arrayUtils(this.getData('localData'),'unshift',localSearchResp); //NO I18n
      if(this.getData("selectedList")){
        Lyte.arrayUtils(this.getData('addedItems'),'unshift',localSearchResp); //NO I18n
      } else {
        Lyte.arrayUtils(this.getData('systemData'),'unshift',localSearchResp); //NO I18n
      }
      this.valueAddedToCurrentList = localSearchResp;
    this.setData("currentPos" , this.data.currentPos + newLen); //NO I18n
    }
    },
    checkIfNoResultStatus : function(){
      if(this.data.cxPropReqForSelected){
        var case1 , case2;
      if(!this.getData('selectedList') ){
      
        //Both Empty
        case1 = !this.data.systemData.length && !this.valueAddedToCurrentList.length; 
        //Data from network is got but data displayed is all currently hidden with no newely interacted values.
        case2 = this.data.systemData.length && (this.data.systemData.length === this.currentlyHiddenList.length) && !this.valueAddedToCurrentList.length;
      
      } else {
        //Both Empty
        case1 = !this.data.addedItems.length && !this.valueAddedToCurrentList.length; 
        //Data from network is got but data displayed is all currently hidden with no newely interacted values.
        case2 = this.data.addedItems.length && (this.data.addedItems.length === this.currentlyHiddenList.length) && !this.valueAddedToCurrentList.length;
      
      }
      if(case1 || case2){
        this.setData("showNoDataMsg" , true); //No I18N
      } else {
        this.setData("showNoDataMsg" , false); //No I18N
      }
      }
      },
      performLocalSearch : function(value){
        var arrayToSearch, outputArr = [];
        if(!this.data.selectedList){
        arrayToSearch = this.newelyUnSelectedTempList;
        } else {
        arrayToSearch = this.newelySelectedTempList;
        }
        var arrLen = arrayToSearch.length;
        var firstNameAvail = this.firstNameAvailability,
          lastNameAvail = this.lastNameAvailability;
        for(var i = 0; i < arrLen; i++){
        var found = false;
        if(firstNameAvail && arrayToSearch[i].first_name){
          var searchResp = arrayToSearch[i].first_name.toLowerCase().indexOf(value.toLowerCase());
          if(searchResp !== -1 && searchResp === 0){
            found = true;
          }
        }
        if(!found && lastNameAvail && arrayToSearch[i].last_name){
          var searchResp = arrayToSearch[i].last_name.toLowerCase().indexOf(value.toLowerCase());
          if(searchResp !== -1 && searchResp === 0){
            found = true;
          }
        }
        if(!found && arrayToSearch[i].email){
          var searchResp = arrayToSearch[i].email.toLowerCase().indexOf(value.toLowerCase());
          if(searchResp !== -1 && searchResp === 0){
            found = true;
          }
        }
        if(!found && arrayToSearch[i].full_name){
          var searchResp = arrayToSearch[i].full_name.toLowerCase().indexOf(value.toLowerCase());
          if(searchResp !== -1 && searchResp === 0){
            found = true;
          }
        }
        
        if(found){
          outputArr.push(arrayToSearch[i]);
        }
        }
        return outputArr;
        },
        setSelectionStateOfRecords: function(list, state){
          var listLen = list.length;
          this.setData("preventCall", true); //No I18N
          for(var i = 0; i < listLen; i++){
          switch(state){
            case "clear": 
              Lyte.objectUtils( list[i] , "delete" , "lookup_selected_val" ); //No I18N
              Lyte.objectUtils( list[i] , "delete" , "lookup_newely_selected_val" ); //No I18N
              break;
            case "selected": 
              Lyte.Component.set(list[i], 'lookup_selected_val', true); //No I18N
              break;
            case "unSelected": 
              Lyte.Component.set(list[i], 'lookup_selected_val', false); //No I18N
              break;
            case "selectedAndHidden":
              Lyte.Component.set(list[i], 'lookup_selected_val', true); //No I18N
              Lyte.Component.set(list[i], 'lookup_newely_selected_val', "selected"); //No I18N
              break;
            case "unSelectedAndHidden":
              Lyte.Component.set(list[i], 'lookup_selected_val', false); //No I18N
              Lyte.Component.set(list[i], 'lookup_newely_selected_val', "unSelected"); //No I18N
              break;
          }
          
          }
          this.setData("preventCall", false); //No I18N
          return list;
          },
          updateSelectedCountMsg: function(){
            if(!this.isCustomLinkMessage){
              if(!this.data.cxPropReqForSelected){
                if(this.data.totalAddedObjects.length === 1){
                  this.setData("cxPropSelectedLinkMessage" , _cruxUtils.getI18n('crux.user.selected.singular', this.data.totalAddedObjects.length)); //No I18N
                } else {
                  this.setData("cxPropSelectedLinkMessage" , _cruxUtils.getI18n('crux.users.selected.plural', this.data.totalAddedObjects.length)); //No I18N
                }
              } else {
                if(this.data.cxPropSelectedCount === 1){
                  this.setData('cxPropSelectedLinkMessage' , _cruxUtils.getI18n('crux.user.selected.singular', this.data.cxPropSelectedCount)); //NO I18N
                } else {
                  this.setData('cxPropSelectedLinkMessage' , _cruxUtils.getI18n('crux.users.selected.plural', this.data.cxPropSelectedCount)); //NO I18N
                }
              }
            }
          },
            handleSelection: function (from, pos, removeRec) {
            var addListTemp, addList, removeListTemp, removeList;
            var primaryKey = this.getData("cxPropPrimaryKey"); //NO I18n
            var currRec;
            if (this.data.cxPropFilter !== "SelectedUsers") {
            currRec = this.data.systemData[pos];
            } else {
            currRec = this.data.addedItems[pos];
            }
            
            if (from === "checked" && !this.data.selectedList || from === "unChecked" && this.data.selectedList) {
            if (from === "checked") {
            removeListTemp = this.newelyUnSelectedTempList;
            removeList = this.newelyUnSelected;
            addListTemp = this.newelySelectedTempList;
            addList = this.newelySelected;
            } else {
            removeListTemp = this.newelySelectedTempList;
            removeList = this.newelySelected;
            addListTemp = this.newelyUnSelectedTempList;
            addList = this.newelyUnSelected;
            }
            if(removeRec){
              Lyte.arrayUtils(this.data.addedItems, 'removeAt', pos, 1); //NO I18N
            }
            
            var listLen = removeList.length;
            var found = false;
            for (var w = 0; w < listLen; w++) {
            if (removeList[w][primaryKey] === currRec[primaryKey]) {
              found = true;
              Lyte.objectUtils( currRec , "delete" , "lookup_newely_selected_val" );
              Lyte.arrayUtils(removeList, 'removeAt', w, 1); //NO I18N
              break;
            }
            }
            if (!found) {
            addList.unshift(currRec);
            }
            } else if (from === "checked" && this.data.selectedList || from === "unChecked" && !this.data.selectedList) {
            if (from === "unChecked") {
            removeListTemp = this.newelySelectedTempList;
            removeList = this.newelySelected;
            addListTemp = this.newelyUnSelectedTempList;
            addList = this.newelyUnSelected;
            } else {
            removeListTemp = this.newelyUnSelectedTempList;
            removeList = this.newelyUnSelected;
            addListTemp = this.newelySelectedTempList;
            addList = this.newelySelected;
            }
            var found = false;
            var newLen = addListTemp.length;
            for (var i = 0; i < newLen; i++) {
            if (currRec[primaryKey] === addListTemp[i][primaryKey]) {
              found = true;
              Lyte.arrayUtils(addList, 'insertAt', w, currRec); //NO I18N
              break;
            }
            }
            if (!found) {
            newLen = removeList.length;
            for (var i = 0; i < newLen; i++) {
              if (currRec[primaryKey] === removeList[i][primaryKey]) {
                Lyte.objectUtils( currRec , "delete" , "lookup_newely_selected_val" );
                Lyte.arrayUtils(removeList, 'removeAt', i, 1); //NO I18n
                break;
              }
            }
            }
            }
            },
            checkVisibleData: function(){
            var list, listLen, count;
            if(!this.data.selectedList){
            list = this.data.systemData;
            } else {
            list = this.data.addedItems;
            }
            listLen = list.length, count = listLen;
            for(var i = 0; i < listLen; i++){
            if(!this.data.selectedList && list[i].lookup_newely_selected_val === "selected" || this.data.selectedList && list[i].lookup_newely_selected_val === "unSelected"){
              count--;
            } 
            }
            if(count < 20){
            this.constructArray.call(this,"userLookup",false); //NO I18n
            }
            },
            resetNewelyAdjustedValues : function(){
            if(!this.data.selectedList){
            var lenToRemove = this.newelyUnSelectedTempList.length;
            if(lenToRemove){
            Lyte.arrayUtils( this.getData("systemData") , 'removeAt' , 0 , lenToRemove );
            }
            } else {
            var lenToRemove = this.newelySelectedTempList.length;
            if(lenToRemove){
            Lyte.arrayUtils( this.getData("addedItems") , 'removeAt' , 0 , lenToRemove );
            }
            }
            },
      init: function() {
        		_cruxUtils.addMurhyInfo("crux-user-lookup.js", "Feb Default Changes");
        this.isDefaultCustomReq = this.getData("cxPropCustomRequest");//NO I18N

        if(this.getData("cxPropIsSubordinate") && !this.isDefaultCustomReq){
            this.setData("cxPropCustomRequest" , true);//NO I18N
        }

        this.onInDirectChange = false;
        if(_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard){
          this.fixedCacheQuery = false;
          this.getData("cxPropNetworkData").cxPropCacheQuery = false;
        }else{
          this.fixedCacheQuery = this.getData("cxPropNetworkData").cxPropCacheQuery; //NO I18N
        }
       
        this.fixedDataCache = this.getData("cxPropNetworkData").cxPropDataCache; //NO I18N
        this.firstNameAvailability = true;
        this.lastNameAvailability = true;
        this.onFilterChange = false;
        this.preventAllSelection = false;
        this.preventCallBacks = false;
        this.assignClose = false;
        this.bindResize = true;
        this.preventShowCalling = false;
        this.preventWrongClose = false;
        this.defaultSelectedIds = [];
        this.preventAction = false;
        this.selectedModalSelectedIds = 0;
        this.selectingFlag = true;
        this.filterChange = false;
        this.responseData = [];
        this.onModalClose = false;
        this.splitAddedItems = 0;
        this.splitPreAddedItems = 0;
        this.usersAvailable = undefined;
        this.savedFilter = undefined;
        this.backButton = false;
        this.multipleClicks = false;
        this.makeRequest = false;
        this.beforeAssign = false;
        this.localClose = false;
        this.selectedUser = false;
        this.headerHeight = undefined;
        this.modalHeigth = undefined;
        this.tempLocalData = [];
        this.tempCurrentPos = undefined;
        this.tempnoMoreRecords = undefined;
        this.tempAllselectedCheckbox = undefined;
        this.tempUserAvilable = undefined;
        this.temppageNo = undefined;
        this.tempcxPropPerPage = undefined;
        this.fixedcxPropPerPage = undefined;
        this.tempCacheQuery = undefined;
        this.tempDataCache = undefined;
        this.inputFocus = false;
        this.selectedTotalAddedObjects = [];
        this.newelySelected = [];
        this.newelySelectedTempList = [];
        this.preventCheckAllSelection = false;
        this.mirrorTotalAddedObjects = [];
        this.perform_input_Trim = true;
        this.internalSelection = false;
        
        if(this.getData("cxPropSelectedIds") == undefined) {
          this.internalSelection = true;
          this.setData("cxPropSelectedIds", []); //NO I18n
          this.internalSelection = false;
        }
        if(this.getData("cxPropSelectedId") == undefined) {
          this.setData("cxPropSelectedId", ''); //NO I18n
        }
        if(this.getData("cxPropHeaderYield")) {
          this.setData({'cxPropFilterable': false, 'cxPropSearchable' : false}); //NO I18n
        }
        this.fixedcxPropPerPage = this.getData('cxPropPerPage'); //NO I18n
        if(this.getData("cxPropType") != "view") {
          this.setData("cxPropModalWidth", this.getData("cxPropLookupWidth")); //NO I18n
        } else {
          this.setData("cxPropModalWidth", this.getData("cxPropViewWidth")); //NO I18n
        }
        if(!this.getData("cxPropHeaderYield")) {
          if(!this.getData("cxPropFilterYield")) {
            if(this.getData("cxPropFilterOptions").length == 0 && this.getData("cxPropFilterable")) {
              var filters = this.getDefaultFilters();
              this.setData({"cxPropFilterOptions" : filters, "cxPropFilterUserValue": "category", "cxPropFilterSystemValue": "id"}); //NO I18n
            }
            if(this.getData("cxPropSelectedFilterOption") == undefined || this.getData("cxPropSelectedFilterOption") == null) {
              this.setData({"cxPropSelectedFilterOption": "ActiveUsers", "cxPropFilter": "ActiveUsers"}); //NO I18n
            } else {
              this.setData("cxPropFilter", this.getData("cxPropSelectedFilterOption")); //NO I18n
            }
          } else {
            this.setData("cxPropFilter", this.getData("cxPropSelectedFilterOption")); //NO I18n
          }
        } else {
          if(this.getData("cxPropSelectedFilterOption") == undefined || this.getData("cxPropSelectedFilterOption") == null) {
              this.setData("cxPropSelectedFilterOption", ""); //NO I18n
          }
          this.setData("cxPropFilter", this.data.cxPropSelectedFilterOption); //NO I18n
        }

        /*If the filter is disabled then the filter will be set with the default value of active users ,
        which for a case if not required if this variable is set then the filter value will be "" so nothing will be set in the queryParams*/
        if(this.getData("cxPropSetEmptyFilter")) {
          this.setData("cxPropFilter", ""); //NO I18n
        }

        this.setData("value", this.data.cxPropSelectedId);
        if(this.data.cxPropType=="view"){
          this.setData("cxPropCloseOnEscape",true);
        }

        if(this.data.cxPropMaxLimitMsg){	
          this.isCustomMaxLimitMessage = true;	
        } else {	
           if( this.data.cxPropMaxLimit !== 0){
              this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n	
           }
        }	

        if(this.data.cxPropSelectedLinkMessage){
          this.isCustomLinkMessage = true;	
        } else {	
           this.isCustomLinkMessage = false;
           this.updateSelectedCountMsg()
        }	
        this.dataModified = {"added_ids" : [], "removed_ids" : []};

        if(this.data.cxPropReqForSelected){
          this.initialOpen = true;
          this.originalSelectedCount = 0;
          this.newelyUnSelected = [];
          this.newelyUnSelectedTempList = [];
          this.initialRequest = false;
          this.originalCount = 0;
          this.emptyFirstReq = false;
          this.preventLoadMoreData = false;
          this.isNewRequest = false;
          this.addedUsersToTop = false;
          this.newelyUnSelected = [];	
          this.newelyUnSelectedTempList = [];	
          this.selectedHideList = [];	
          this.unSelectedHideList = [];	
          this.currentlyHiddenList = [];	
          this.valueAddedToCurrentList = [];	
          this.initialRequest = false;	
          this.originalCount = 0;	
          this.emptyFirstReq = false;	
          this.preventLoadMoreData = false;	
          this.isRowClicking = false;	
          this.isNewRequest = false;	
          this.addedUsersToTop = false;	
          this.isCustomMaxLimitMessage = false;	
          this.cachedDataOfPreviousScreen = [];	
          this.setData("selectedCheckBoxValue" , false);//NO I18n
          this.sideChange = false;
          this.isOpenRequest = false;
        }
        
      },
      getModalMaxLimitMsgValue : function(){
        var maxMsg = this.getData("cxPropMaxLimitMsg"); //NO I18n	
        if(!this.isCustomMaxLimitMessage) {	
          var maxLimitValue = this.getData("cxPropMaxLimit"); //NO I18n	
          var moduleNameValue;	
          if(maxLimitValue === 1) {	
            moduleNameValue = this.getData("cxPropSingularModuleName"); //NO I18n	
          } else {	
            moduleNameValue = this.getData("cxPropPluralModuleName"); //NO I18n	
          }	
          if(this.data.cxPropReqForSelected){	
            if(!this.data.selectedList){	
              maxMsg = _cruxUtils.getI18n("crux.comboBox.max.limit", this.getData("cxPropMaxLimit"), moduleNameValue); //NO I18n	
            } else {	
              maxMsg = _cruxUtils.getI18n("crux.max.limit.unselect", this.getData("cxPropMaxLimit"), moduleNameValue); //NO I18n	
            }	
          } else {	
            maxMsg = _cruxUtils.getI18n("crux.comboBox.max.limit", this.getData("cxPropMaxLimit"), moduleNameValue); //NO I18n	
          }	
          return maxMsg;	
        }	
      },
      didDestroy: function() {
        if(!this.getData("cxPropHeaderYield") && !this.getData("cxPropCustomRequest")) {
          var primaryKey = this.getData("cxPropPrimaryKey"); //NO I18n
          this.setData('cxPropPerPage', this.fixedcxPropPerPage); //NO I18n
          this.setData('pageNo', 1); //NO I18n
          var filters = this.getData("cxPropFilterOptions"); //NO I18n
          for(var i = 0; i < filters.length; i++) {
            this.setData("cxPropFilter", filters[i][primaryKey]);
            if(filters[i][primaryKey] != "ActiveUsers") {
              store.clearCachedQuery(this.getData('cxPropNetworkData').cxPropModuleName, this.queryParams.call(this)); //NO I18n
            }
          }
          if(this.getData("cxPropFilterable") == false && !this.data.cxPropHeaderYield) {
            store.clearCachedQuery(this.getData('cxPropNetworkData').cxPropModuleName, this.queryParams.call(this)); //NO I18n
          }
        }
        if(this.getMethods('onLookupDestroyed')) { //NO I18n
         /**
		     * This method will be invoked during the destruction of the component.
         * @functionType methodCall onLookupDestroyed
         */
        //   /**
				//  * This callback is fired  during the destruction of the component.
				//  * @method onLookupDestroyed
				//  * @author mahalakshmi.m
				//  * @version 1.0.0
				//  */
          this.executeMethod('onLookupDestroyed'); //NO I18n
        }
        delete this.bodydrop
        delete this.bodybody
        delete this.userdrop
        delete this.bodybox
        delete this.userbody
        delete this.userbox
      },
      didConnect: function() {
          this._keydown = this.getKeyDown.bind(this);
          this.modalEle = this.$node.querySelector('lyte-modal'); //No i18N
          

          this.$node.changeFilter = function( filterName ){
            this.setData( {
                'cxPropSelectedFilterOption' : filterName, //No i18N
                "cxPropFilter" : filterName //No i18N
            }); 
          }.bind(this);

          this.$node.performSearch = function( inputValue ){
            this.setData("cxPropInputValue", inputValue); //NO I18N
            this.performSearchOperation(  );
          }.bind(this);

          this.$node.clearSearch = function(  ){
            this.clearSearchAction(  );
          }.bind(this);

          this.$node.switchToSelected = function(){
            this.switchToSelected();
          }.bind(this);

          this.$node.switchFromSelected = function(){
            this.switchFromSelectedFunc();
          }.bind(this);

          this.$node.performSave = function(){
            this.performSaveAction();
          }.bind(this);

          this.$node.performCancel = function(){
            this.performCancelAction();
          }.bind(this);

          this.$node.unSelectRecord = function(record,index){
            record.lookup_selected_val = false;
            this.unSelectRecordFunc(undefined,index, true);
          }.bind(this);

          this.$node.getModifiedOptions = function() {
            /*This util added for client script usage*/
            return this.getModifiedValues();
          }.bind(this);

          // this.$node.resetUserCache = function() {
          //   this.resetUserCache();
          // }.bind(this);
          this.getCruxAssetsPropertiesFn(); /* This is called for set hierarchy related filter Obj */        
      },
      switchFromSelectedFunc : function(){
        /**
        * Before the view switches from ordinary to selected or vise versa this method will be invoked. 
        * @functionType methodCall onViewChange
        * @param {atring} view - A string mentioning the view type. 
        */
        if(this.getMethods("onViewChange")){
          this.executeMethod("onViewChange" , "ordinary"); //NO I18n
        }
        if(!this.data.cxPropReqForSelected){
          var networkObject=this.getData("cxPropNetworkData"); //NO I18n
          // this.setData("selectedModalSelectedIds",0); //NO I18n
          this.selectedModalSelectedIds = 0;
          if(this.getData("cxPropForcedFetch")==false){
            networkObject.cxPropCacheQuery=this.tempCacheQuery;
            networkObject.cxPropDataCache=this.tempDataCache;
            this.setData("cxPropNetworkData",networkObject); //NO I18n
          }
          this.setData('cxPropPerPage',this.tempcxPropPerPage); //NO I18n
          this.setData('pageNo',this.temppageNo); //NO I18n
          this.setData('selectedList',false); //NO I18n
          this.setData("cxPropSelectedList" , false); //NO I18n
          this.setData('DselectedList',false); //NO I18n
          this.bodydrop = this.$node.querySelector('lyte-modal').component.childComp; //NO I18n
          this.bodybody = this.bodydrop.querySelector('div.lyteTableScroll'); //NO I18n
          this.userdrop = this.bodydrop.querySelector('lyte-dropdown'); //NO I18n
          this.bodybox = this.bodydrop.querySelector('lyte-drop-box'); //NO I18n
          if(this.userdrop) {
            this.userbody = this.userdrop.querySelector('lyte-drop-body'); //NO I18n
            this.userbox = this.userdrop.querySelector('lyte-drop-box'); //NO I18n
          }
          this.usersAvailable = this.tempUserAvilable;
          this.setData("QueryParam",null); //NO I18n
          if(this.tempAllselectedCheckbox==true){
            this.selectingFlag = false;
          }
          if(this.getData("totalAddedObjects").length==0){
            this.selectingFlag = true;
            this.setData("allCheckboxState",false);//NO I18n
          }
          else{
            this.setData("allCheckboxState",this.tempAllselectedCheckbox);//NO I18n
          }
          this.setData("noMoreRecords",this.tempnoMoreRecords); //NO I18n
          this.setData("localData",this.tempLocalData); //NO I18n
          this.setData("currentPos",this.tempCurrentPos); //NO I18n
          this.splitAddedItems = 0;
          this.backButton = true;
          this.setData('cxPropFilter',this.savedFilter); //NO I18n
          if(this.getData("cxPropFilterable") && !this.getData("cxPropHeaderYield")){ //NO I18n
              var dropEle = this.bodydrop.querySelector('lyte-dropdown'); //NO I18n
              if(dropEle){
                ltProp('selected',this.savedFilter); //NO I18n
              }
          }
          this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
          this.setData("totalAddedObjects",this.getData("cxPropSelectedIds").slice());//NO I18n
          if(this.makeRequest){
            // this.setData("makeRequest",false); //NO I18n
            this.makeRequest = false;
            // this.setData("selectedUser",false); //NO I18n
            this.selectedUser = false;
            if(this.bodydrop.querySelector('.lyteTableScroll')!=null){ //NO I18n
            this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
            }
            this.filterObserver.call(this,"removeAll"); //NO I18n
          } else {
            // this.setData("selectedUser",false); //NO I18n
            this.selectedUser = false;
            var primaryKey=this.getData("cxPropPrimaryKey"); //NO I18n
            var dummyCheckbox=this.bodydrop.querySelector('lyte-table-structure').querySelectorAll('input[name=checkbox]'); //NO I18n
            var dummy=this.getData("systemData"); //NO I18n
            var selectedDummy;
            if(!this.getData("cxPropReqForSelected")){
              selectedDummy=this.getData("cxPropSelectedIds"); //NO I18n
            } else{
              if(this.getData("cxPropFilterable")){
                selectedDummy=this.newelySelectedObject[this.getData("cxPropFilter")]; //NO I18n
              }else{
                selectedDummy=this.newelySelected;
              }
            }
            for(var i=0;i<dummy.length;i++){
              var found = false;
              if(!this.getData("cxPropReqForSelected")){
                if(selectedDummy.includes(dummy[i][primaryKey])){
                  found = true;
                }
              } else{
                var selectedDummyLength = selectedDummy.length;
                for(var u=0;u<selectedDummyLength;u++){
                  if(selectedDummy[u][primaryKey] == dummy[i][primaryKey]){
                    found = true;
                    break;
                  }
                }
              }
              if(found){
                Lyte.Component.set(dummy[i],'lookup_selected_val',true); //No I18N
              } else {
                if(dummy[i].lookup_selected_val){
                  // dummyCheckbox[i].parentElement.parentElement.ltProp("checked",false);
                  Lyte.Component.set(dummyCheckbox[i],'lookup_selected_val',false); //No I18N
                }
                //%%
                if(!dummy[i].lookup_selected_val && this.getData('allCheckboxState')){
                  this.setData("preventAllCheckboxUnchecked" , false); //No I18N
                  this.preventAllSelection = true;
                  this.setData('allCheckboxState' , false); //No I18N
                  this.preventAllSelection = false;
                }
                //&&
                Lyte.Component.set(dummy[i],'lookup_selected_val',false); //No I18N
              }
            }
            setTimeout(function() {
              if(!this.bodydrop.querySelector('input[name=allSelectCheckbox]').parentElement.parentElement.ltProp('checked')){
                // this.setData("selectingFlag",true);//No I18N
                this.selectingFlag = true;
              }
            }.bind(this), 0);
          }
        } else {
          this.sideChange = true;
          this.emptyFirstReq = false;
          this.newelyUnSelectedTempList = this.newelyUnSelected.slice();
          var lenToRemove = this.newelySelectedTempList.length;
          if(lenToRemove){
            Lyte.arrayUtils( this.getData("addedItems") , 'removeAt' , 0 , lenToRemove );
          }
          this.selectedHideList = this.newelySelected;
          this.unSelectedHideList = this.newelyUnSelected;
          this.currentlyHiddenList = [];
          if(this.getData("isSearch")){
            this.setData("cxPropInputValue",""); //NO I18n
            this.setData("isSearch",false); //NO I18n
          }
          this.setData('cxPropPerPage',this.tempcxPropPerPage); //NO I18n
          this.setData('pageNo',this.temppageNo); //NO I18n
          this.setData('selectedList',false); //NO I18n
          this.setData("cxPropSelectedList" , false); //NO I18n
          this.usersAvailable = this.tempUserAvilable;
          if(this.tempAllselectedCheckbox === true){
            this.selectingFlag = false;
          }
          this.setData("noMoreRecords",this.tempnoMoreRecords); //NO I18n
          this.setData("localData",this.tempLocalData); //NO I18n
          this.setData("currentPos",this.tempCurrentPos); //NO I18N
          this.splitAddedItems = 0;
          this.setData("addedItems" , []); //NO I18n
          if(this.makeRequest){
            this.makeRequest = false;
            this.selectedUser = false;
            this.filterObserver.call(this,"removeAll"); //NO I18n
            this.cachedDataOfPreviousScreen = [];
            this.setData('DselectedList',false); //NO I18n
            if(this.bodydrop.querySelector('.lyteTableScroll')!=null){ //NO I18n
              this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
            }
            this.continueBackToLookup();
          }
        }
      },
      clearSearchAction : function(){
        if(this.data.cxPropInputValue){
          this.setData('cxPropInputValue',""); //NO I18n
          this.setData("isSearch", false); //NO I18n
          if(this.bodydrop.querySelector('.lyteTableScroll')!=null){ //NO I18n
            this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
          }
          this.filterObserver.call(this,"removeAll"); //NO I18n
          this.bodydrop.querySelector("lyte-input input").focus(); //NO I18n
          if(this.data.cxPropShowSuggestion){
            this.setSearchDataForSuggestion(this.data.cxPropInputValue);
          }
        }
      },
      performCancelAction : function(){
          if(this.data.cxPropType=='single'){
            for(var i=0;i<this.data.systemData.length;i++){
              if(this.data.value==this.data.systemData[i].id){
                Lyte.objectUtils(this.getData('systemData')[i], "add", "lookup_selected_val", true)
              }
            }
            this.$node.cxProp('show',false);
          }else{
            this.localClose = true;
            this.$node.cxProp('show',false); //NO I18n
          }
      },
      performSaveAction : function(){
          if(this.data.cxPropType=='single'){
            this.$node.cxProp('show',false);
            // /**
            //  * This callback is fired after the lookup is closed.
            //  * @method onAssign
            //  * @author mahalakshmi.m
            //  * @version 1.0.0
            //  * @param { * } newelySelected, newelySelectedObject, newelyUnselected
            //  */
            if(this.getMethods('onAssign')){ //NO I18n
              return this.executeMethod('onAssign', this.getData('displaySingleUser')); //NO I18n
            }
          } else{
            if(!this.getData("cxPropReqForSelected")){
              var reqData=[],resData=[],sendData=[],j=0,flg=0,finalReqData=[];
              // if(this.getData("selectedList") && this.bodydrop.querySelector('input[name=selectedAllSelectCheckbox]').parentElement.parentElement.ltProp('checked')==false){
              //   this.setData("totalAddedObjects",[]); //NO I18n
              // }
              var selectedObjects;
              if(this.getData("selectedList")){
                selectedObjects=this.selectedTotalAddedObjects;
              }else{
                selectedObjects=this.getData("totalAddedObjects"); //NO I18n
              }
              for(var i=selectedObjects.length-1;i>=0;i--){
                if(typeof selectedObjects[i]!="object"){
                  reqData.push(selectedObjects[i]);
                }
                else{
                  sendData.push(selectedObjects[i]);
                  this.responseData = sendData;
                }
              }
              for(var q=0;q<reqData.length;q++){
                var data=store.peekRecord(this.getData("cxPropNetworkData").cxPropModuleName,reqData[q]);
                if(data){
                  sendData.push(data);
                }
                else{
                  finalReqData.push(reqData[q]);
                }
              }
              var count;
              if(finalReqData.length==0 && sendData.length!=0){
                // this.setData("responseData",sendData); //NO I18n
                this.responseData = sendData;
                this.setAssign.call(this);
              }
              else if(finalReqData.length==0 && sendData.length==0){
                // this.setData("responseData",[]); //NO I18n
                this.responseData = []
                this.setAssign.call(this);
              }
              else{
                if(finalReqData.length<this.getData('cxPropSelectedPerPage')){
                  count=1;
                }
                else{
                  count=Math.ceil(finalReqData.length/this.getData('cxPropSelectedPerPage')); //NO I18n
                }
                for(j=0;j<count;j++){
                  flg=this.fetchUsers.call(this,count,finalReqData,sendData,flg,resData);
                }
              }
            } else{
              this.setAssign.call(this);
            }
          }
      },
      switchToSelected : function(){
        if(this.getMethods("onViewChange")){
          this.executeMethod("onViewChange" , "selected"); //NO I18n
        }
        if(this.getData("cxPropReqForSelected")){
          this.sideChange = true;
          this.setData("addedItems" , []); //NO I18n
          this.makeRequest = true;
          this.newelySelectedTempList = this.newelySelected.slice();
          var lenToRemove = this.newelyUnSelectedTempList.length;
          if(lenToRemove){
            Lyte.arrayUtils( this.getData("systemData") , 'removeAt' , 0 , lenToRemove );
          }
          this.selectedHideList = this.newelySelected;
          this.unSelectedHideList = this.newelyUnSelected;
          this.currentlyHiddenList = [];
        } else {
          // this.setData("mirrorTotalAddedObjects" , this.getData("totalAddedObjects").slice()); //NO I18n
          this.mirrorTotalAddedObjects = this.getData("totalAddedObjects").slice(); //NO I18n
          var networkObject=this.getData("cxPropNetworkData"); //NO I18n
          // this.setData("selectedTotalAddedObjects",this.getData("totalAddedObjects").slice()); //NO I18n
          this.selectedTotalAddedObjects = this.getData("totalAddedObjects").slice(); //NO I18n
          // this.setData("selectedModalSelectedIds",this.getData("addedItems").length); //NO I18n
          this.selectedModalSelectedIds = this.getData("addedItems").length; //NO I18N
          if(this.getData("cxPropForcedFetch")==false){
            // this.setData("tempCacheQuery",this.getData("cxPropNetworkData").cxPropCacheQuery); //NO I18n
            this.tempCacheQuery = this.getData("cxPropNetworkData").cxPropCacheQuery; //NO I18n
            // this.setData("tempDataCache",this.getData("cxPropNetworkData").cxPropDataCache); //NO I18n
            this.tempDataCache = this.getData("cxPropNetworkData").cxPropDataCache; //NO I18n
          }
          networkObject.cxPropCacheQuery=false;
          networkObject.cxPropDataCache=false;
          this.setData("cxPropNetworkData",networkObject); //NO I18n
        }
        if(this.getData("isSearch")){
          this.setData({"cxPropInputValue":"" , "isSearch":false}); //NO I18n
          this.makeRequest = true;
        }
        this.tempcxPropPerPage = this.getData('cxPropPerPage'); //NO I18n
        if(!this.getData("cxPropReqForSelected")){
          this.setData("cxPropPerPage",0); //NO I18n
        }
        // this.setData('temppageNo',this.getData('pageNo')); //NO I18n
        this.temppageNo = this.getData('pageNo'); //NO I18n
        if(!this.getData("cxPropReqForSelected")){
          this.setData("pageNo",0); //NO I18n
        }else{
          this.setData("pageNo",1); //NO I18n
        }
        // this.setData("tempAllselectedCheckbox",this.bodydrop.querySelector('input[name=allSelectCheckbox]').parentElement.parentElement.ltProp('checked')); //NO I18n
        this.tempAllselectedCheckbox = this.getData("allCheckboxState"); //NO I18n
        // this.setData("tempLocalData",this.getData("localData")); //NO I18n
        this.tempLocalData = this.getData("localData"); //NO I18N
        // this.setData("tempCurrentPos",this.getData("currentPos")); //NO I18n
        this.tempCurrentPos = this.getData("currentPos"); //NO I18N
        // this.setData("tempnoMoreRecords",this.getData("noMoreRecords")); //NO I18n
        this.tempnoMoreRecords = this.getData("noMoreRecords"); //NO I18N
        this.setData("noMoreRecords",true); //NO I18n
        // this.setData("tempUserAvilable",this.usersAvailable); //NO I18n
        this.tempUserAvilable = this.usersAvailable;
        // this.setData("selectedUser",true); //NO I18n
        this.selectedUser = true;
        // this.setData('savedFilter',this.getData('cxPropFilter')); //NO I18n
        this.savedFilter = this.getData('cxPropFilter'); //NO I18N
        this.setData({'selectedList' : true, "cxPropSelectedList" : true, 'cxPropFilter' : "SelectedUsers"}); //NO I18n
        if(this.getData("cxPropReqForSelected")){
          this.checkIfNoResultStatus();
        }
      },
      performSearchOperation : function(  ){
          var setScroll=this.bodydrop.querySelector('.lyteTableScroll'); //NO I18n
          this.keyup.call(this,"userLookup",setScroll); //NO I18n
          if(this.data.cxPropShowSuggestion){
            clearTimeout(this._timeout2);
            this._timeout2 = setTimeout(function(){
            if(this.data.cxPropInputValue.length >= 2){
              this.setSearchDataForSuggestion(this.data.cxPropInputValue);
            }else if(this.data.cxPropInputValue.length == 0){
              this.setData("suggestedUsers" , this.data.cxPropSuggestion.users); //NO I18n
            }
            }.bind(this), 300)
          }
      },
      unSelectRecordFunc : function(input, index, removeRecord){
      var primaryKey=this.getData("cxPropPrimaryKey"); //NO I18n
      var temp;
      if(!this.getData("cxPropReqForSelected")){
        if(this.getData('cxPropFilter')==="SelectedUsers"){
         temp=this.getData('addedItems')[input.value];
         if(this.selectedModalSelectedIds>0){
           this.selectedModalSelectedIds -= 1;
         }
        }
        else{
         temp=this.getData('systemData')[input.value];
        }
        var tempData=this.getData("cxPropSelectedIds"); //NO I18n
        var len=tempData.length;
        for(var i=0;i<len;i++){
         if(temp[primaryKey]===tempData[i]){
           this.internalSelection = true;
          Lyte.arrayUtils(this.getData("cxPropSelectedIds"), 'removeAt', i, 1);//NO I18n
          let add_data = this.removeModifiedValue(temp);
				  if(add_data){
            this.dataModified.removed_ids.push(temp);
          }
          this.internalSelection = false;
          break;
         }
        }
        this.setData("cxPropSelectedIdsLength",this.getData("cxPropSelectedIds").length); //NO I18n
        var id=temp[primaryKey];
        var addedObjects= this.getData("totalAddedObjects"); //NO I18n
        var added_length=addedObjects.length;
        for(var j=0;j<added_length;j++){
         if(addedObjects[j][primaryKey]!==undefined && addedObjects[j][primaryKey]===id){
          break;
         }
         else if(addedObjects[j]===id){
           break;
         }
        }
        Lyte.arrayUtils(addedObjects, 'removeAt', j); //NO I18n
        this.setData({"totalAddedObjects" : addedObjects, "cxPropSelectedCount" : addedObjects.length}); //NO I18n
        // this.updateSelectedCountMsg();
        if(this.getData("selectedList")){
          id=temp[primaryKey];
          addedObjects= this.selectedTotalAddedObjects;
          var obj_length=addedObjects.length;
          for(var k=0;k<obj_length;k++){
           if(addedObjects[k][primaryKey]!==undefined && addedObjects[k][primaryKey]===id){
             break;
           }
           else if(addedObjects[k]===id){
             break;
           }
          }
          Lyte.arrayUtils(addedObjects, 'removeAt', k); //NO I18n
          this.selectedTotalAddedObjects = addedObjects;
        }
      }
      else{
        this.setData("cxPropSelectedCount" , this.getData("cxPropSelectedCount") - 1); //NO I18n
        // this.updateSelectedCountMsg();
        const position = (index !== undefined && index !== null) ? index : input.value;
        this.handleSelection("unChecked", position, removeRecord); //NO I18N
      }
      this.updateSelectedCountMsg();
      if(index !== undefined && index !== null && !this.filterChange){
        this.setData("buttonAccessibility",false);//NO I18n
      }
      },
      customReqFunc: function(networkData, params, isSearch) {
         if(this.getData("cxPropIsSubordinate") && !this.isDefaultCustomReq){
           return new Promise(function(resolve, reject) {
              store.triggerAction("user", "get_assigned", params).then(function(arg) {
                resolve(arg);
              }.bind(this), function(err) {
                if(isSearch){
                  if (this.errorOnSearch) {
                    if (type != "userLookup") {
                      this.setData({"searchLoading": false, "scrollLoading": false,"systemData" : []}); //NO I18n
                    }
                    this.errorOnSearch();
                  }
                  var s = console.error;
                  s(err);
                  this.setData("multiScroll", false); //NO I18n
                }
              }.bind(this));
             }.bind(this));
         } else{
           if (this.getMethods('onCustomRequest')) { //NO I18n
            var retVal;
            if(this.data.cxPropReqForSelected){
                retVal = this.executeMethod('onCustomRequest', params, this.getData("isSearch"), this.getData("cxPropInputValue"), this.getData("cxPropSelectedList"), { //NO I18n
                  "newelySelected" : this.newelySelected, //NO I18n
                  "newelyUnSelected" : this.newelyUnSelected //NO I18n
                });
            } else {
               /**
                 * When property cxPropCustomRequest is true then this method will be invoked during every request process in the component. This method can be used to trigger the custom requests to replace the default request from the component.
                 * @functionType methodCall onCustomRequest
                 * @param {object} networkData- The data property cxPropNetworkRequest.
                 * @param {object} params - The queryParams object constructed in the component
                 * @param {boolean} isSearch - A boolean to know if the currently ordinary/search request is to be triggered
                 * @param {string} inputValue - The value held by the search box
                 * @param {boolean} isSelected - A boolean to identify if currently selected/non-seleted side of the popup is open. 
                 * @return The return value received as a promise or directly should be a array of records.  
                 */
                retVal = this.executeMethod('onCustomRequest', networkData, params, this.getData("isSearch"), this.getData("cxPropInputValue"), this.getData("cxPropSelectedList")); //NO I18n
            }      
             return retVal;
           }
         }
      },
      handleErrorOnRequest: function(){
        this.setData({
          searchLoading : false,
          systemData : [],
          searchingSearch : false,
          searchingUser : false
        })
        if(this.data.cxPropReqForSelected){	
          this.emptyFirstReq = true;
          this.valueAddedToCurrentList = [];	
          this.currentlyHiddenList = [];	
          this.checkIfNoResultStatus()	
        }
      },
      errorOnRequest: function(){
        this.handleErrorOnRequest()
      },
      errorOnSearch: function() {
        this.handleErrorOnRequest()
      },
      setCriteriaFunc: function(){
        var primaryKey = this.getData("cxPropPrimaryKey"); //NO I18n
        var ret = {};
        var queryParams = this.getData("cxPropQueryParams"); //NO I18n
        for(var key in queryParams) {
          ret[key] = queryParams[key];
        }

        if(!this.data.cxPropReqForSelected){
          var subQp = this.setSubordinateQp();
          if(subQp){
            for(var key in subQp) {
              ret[key] = subQp[key];
            }
          }

          var filterValue = this.getData('cxPropFilter'); //NO I18n
          if(!this.getData("cxPropSetEmptyFilter") && filterValue ) {
            ret.type = filterValue;
          }
        }
          
        if(!this.getData("isSearch")) {
          if(!this.getData("cxPropReqForSelected")){
            if(!this.getData("selectedList")) {
              var filterOption = this.getData("cxPropCriteria"); //NO I18n
              if(filterOption.length > 1) {
                ret.filters = filterOption;
              }
            } 
            else  {
              var item = this.mirrorTotalAddedObjects;
              var items = [], itemLen = item.length;
              for(var i = 0; i < itemLen; i++) {
                if(item[i][primaryKey] === undefined) {
                  items.push(item[i]);
                } else {
                  items.push(item[i][primaryKey]);
                }
              }
              var array = items.slice(this.splitAddedItems, this.splitAddedItems + this.getData('cxPropSelectedPerPage')); //NO I18n
              this.splitAddedItems += this.getData('cxPropSelectedPerPage'); //NO i18n
              var checkBox = this.bodydrop.querySelector('lyte-table-structure').querySelector('input[name=selectedAllSelectCheckbox]'); //NO I18n
              if(checkBox !== null) {
                if(checkBox.parentElement.parentElement.ltProp("checked")) {
                  this.selectedModalSelectedIds = array.length;
                }
              }
              if(this.getData("localData").length + array.length === items.length) {
                this.setData("noMoreRecords", false); //NO I18n
              }
              ret = {
                ids: array.join(',') //NO I18N
              };
              var selectedQueryParams = this.getData("cxPropSelectedQueryParams"); //NO I18n
              for(var key in selectedQueryParams) {
                ret[key] = selectedQueryParams[key];
              }
            }
          }
        } else /*if (this.getData('cxPropSearchable'))*/ {
          var resultString = this.getData("cxPropInputValue").slice().replace(/\(/g, '\\(').replace(/\)/g, '\\)'); //NO I18n
          resultString = resultString.trim();
          var firstNameAvail = this.firstNameAvailability,
          lastNameAvail = this.lastNameAvailability;
          if(this.getMethods('setSearchCriteria')) { //NO I18n

            /**
             * Data received from the methods will be appended into the search requests queryparams.
             * @functionType methodCall setSearchCriteria
             * @param {string} inputValue - The string currently held in the search box
             * @param {boolean} firstNameAvailability - Boolean which informes if first name is currently available for the module
             * @param {boolean} lastNameAvailability - Boolean which informes if last name is currently available for the module
             * @param {object} queryParams - The current queryParams object
             * @return The object returned will be appended to the queryParams.
             */
            var searchObject = this.executeMethod('setSearchCriteria', resultString, firstNameAvail, lastNameAvail, ret); //NO I18n
            for(var key in searchObject) {
              ret[key] = searchObject[key];
            }
          } else {
            if(this.getData("cxPropNetworkData").cxPropModuleName == "user") {
              var criterias;
              if(firstNameAvail && lastNameAvail) {
                criterias = '((first_name:starts_with:' + resultString + ')or(last_name:starts_with:' + resultString + ')or(email:starts_with:' + resultString + ')or(full_name:starts_with:' + resultString + '))'; //NO I18n
              } else if(firstNameAvail && !lastNameAvail) {
                criterias = '((first_name:starts_with:' + resultString + ')or(email:starts_with:' + resultString + ')or(full_name:starts_with:' + resultString + '))'; //NO I18n
              } else if(!firstNameAvail && lastNameAvail) {
                criterias = '((last_name:starts_with:' + resultString + ')or(email:starts_with:' + resultString + ')or(full_name:starts_with:' + resultString + '))'; //NO I18n
              }
              if(this.getData('cxPropSearchCriteria') != undefined && this.getData('cxPropSearchCriteria') != "") {
                var criterias = '(' + criterias + 'and' + this.getData('cxPropSearchCriteria') + ')'; //NO I18n
              }
              if(!this.getData("cxPropIsSubordinate")){
                ret.criteria = criterias;
              } else {
                ret.search = {};
                ret.search.criteria = criterias;
              }
              if(!this.data.cxPropReqForSelected){
                ret.type = filterValue;
              }
            }
          }
        }
        if(this.getMethods('getCustomQueryParams')) { //NO I18n
          /**
           * This method will be invoked when ever queryparams for the current request is to be constructed
           * @functionType methodCall getCustomQueryParams
           * @param {object} queryParams - The current queryParams object
           * @param {boolean} isSearch - A boolean to determine if the current request is a ordinary/search request
           * @param {string} inputValue - The string currently held in the search box
           * @param {string} isSelected - A boolean to know if we are in the selected view or ordinary view in the component.
           * @return The new queryParams object
           */
          ret = this.executeMethod('getCustomQueryParams' , ret, this.data.isSearch, this.data.cxPropInputValue, this.data.selectedList); //NO I18n
        }
        return ret
      },
        setCriteria: function() {
          var ret = {};
          if(!this.getData("cxPropHeaderYield")) {
            ret = this.setCriteriaFunc()
          } else {
            /**
             * When the header is yielded then this method will be invokded dureing queryParams construction
             * @functionType methodCall getCriteria
             * @return The new queryParams object
             */
            if(this.getMethods('getCriteria')) { //NO I18n
              ret = this.executeMethod('getCriteria'); //NO I18n
            } else {
              ret = this.setCriteriaFunc();
            }
          }
          return ret;
        },
        userLookupClose: function() {
          // this.setData("mirrorTotalAddedObjects" , []); //NO I18n
          this.mirrorTotalAddedObjects = [];
          this.setData("showPlaceholderForSelected", false); //NO I18n
          this.setData("showSelectedFooter", false); //NO I18n
          this.bodydrop.querySelector('.lyteTableScroll').scrollTop = 0; //NO I18n
          // this.setData("onInDirectChange", false); //NO I18n
          this.onInDirectChange = false;
          // this.setData("selectedModalSelectedIds", 0); //NO I18n
          this.selectedModalSelectedIds = 0;
          this.setData("currentlyExcludedArray", []); //NO I18n
          // this.setData("preventWrongClose", false); //No I18n
          this.preventWrongClose = false;
          this.setData("stopScrolling", false); //No I18n
          // this.setData("preventShowCalling", false); //No I18n
          this.preventShowCalling = false;
          // this.setData("defaultSelectedIds", []); //No I18n
          this.defaultSelectedIds = [];
          // this.setData("preventAction", false); //No I18n
          this.preventAction = false;
          // this.setData("selectedModalSelectedIds", 0); //No I18n
          this.selectedModalSelectedIds = 0;
          var networkObject = this.getData("cxPropNetworkData"); //NO I18n
          if(this.getData("cxPropForcedFetch") == false) {
            // networkObject.cxPropCacheQuery=true;
            networkObject.cxPropCacheQuery = this.fixedCacheQuery;
            this.setData("cxPropNetworkData", networkObject); //NO I18n
          }
          this.setData("displaySingleUser", {}); //NO I18n
          this.setData("searchingSearch", false); //NO I18n
          this.setData("isSearch", false); //NO I18n
          this.setData("cxPropInputValue", ""); //NO I18n
          this.setData("isSearch", false); //NO I18n
          this.setData('noMoreRecords', true); //NO I18n
          if(this.getData("cxPropType")=="single"){
            this.setData("buttonAccessibility", true); //NO I18n
          }
          if(this.getData("cxPropType") == "multiple") {
            // this.setData("selectingFlag", true); //NO I18n
            this.selectingFlag = true;
            this.setData('cxPropPerPage', this.fixedcxPropPerPage); //NO I18n
            // this.setData('splitAddedItems', 0); //NO I18n
            this.splitAddedItems = 0;
            // this.setData('splitPreAddedItems', 0); //NO I18n
            this.splitPreAddedItems = 0;
            if(!this.getData("cxPropFooterYield")) {

              // this.bodydrop.querySelector("#LookupAssignButton").parentElement.ltProp("Disabled",true); //NO I18n
              this.setData("buttonAccessibility", true); //NO I18n
            }
          }
          this.setData("dataFetched", false); //NO I18n
          // this.setData("multipleClicks", false); //NO I18n
          this.multipleClicks = false;
          this.setData("systemData", []); //NO I18n

          if(this.bodydrop.querySelector(".NoUsersLookup") != null) {
            // this.bodydrop.querySelector(".NoUsersLookup").style.display="none";
            this.bodydrop.querySelector(".NoUsersLookup").style.visibility = "hidden";
          }
          this.setData("localData", []); //NO I18n
          if(this.bodydrop.querySelector('input[name=allSelectCheckbox]') != null) { //NO I18n
            // this.setData("preventAllSelection", true); //NO I18n
            this.preventAllSelection = true;
            // this.bodydrop.querySelector('input[name=allSelectCheckbox]').parentElement.parentElement.ltProp('checked',false); //NO I18n
            this.setData("allCheckboxState", false); //NO I18n
            // this.setData("preventAllSelection", false); //NO I18n
            this.preventAllSelection = false;
          }
          this.setData("pageNo", 1); //NO I18n
          this.setData("currentPos", 0); //NO I18n
          if(this.getData('selectedList')) {
            this.setData('selectedList', false); //NO I18n
            this.setData("cxPropSelectedList", false); //NO I18n
            this.setData('DselectedList', false); //NO I18n
          }
          // this.setData('onModalClose', false); //NO I18n
          this.onModalClose = false;
          // this.setData("selectedUser", false); //NO I18n
          this.selectedUser = false;
          // this.setData("localClose", false); //NO I18n
          this.localClose = false;
          this.setData("addedItems", []); //NO I18n

          if(this.getData("cxPropReqForSelected")) {
            // this.setData("newelySelectedTempList", []); //NO I18n
            this.newelySelectedTempList = [];
            if(this.getData("cxPropFilterable")) {
              var reqObj = this.newelySelectedTempObject;
              for(var key in reqObj) {
                reqObj[key] = [];
              }
              // this.setData("newelySelectedTempObject", reqObj); //NO I18n
              this.newelySelectedTempObject = reqObj;
            }
            if(this.getData("cxPropFilterable")) {
              reqObj = this.newelySelectedObject;
              for(var key in reqObj) {
                reqObj[key] = [];
              }
              // this.setData("newelySelectedObject", reqObj); //NO I18n
              this.newelySelectedObject = reqObj;
            }

            this.newelyUnSelected = [];	
            this.newelySelected = [];	
            this.selectedHideList = [];	
            this.unSelectedHideList = [];	
            var finalSelectedList = this.data.cxPropReqForSelectedValue;	
            var finalSelectedList = {	
              "selected" : finalSelectedList ? finalSelectedList.selected ? finalSelectedList.selected.length ? this.setSelectionStateOfRecords(finalSelectedList.selected,"clear") : [] : []: [], //NO I18n	
              "unSelected" : finalSelectedList ? finalSelectedList.unSelected ? finalSelectedList.unSelected.length ? this.setSelectionStateOfRecords(finalSelectedList.unSelected,"clear") : [] : []: [] //NO I18n
            }

          }
          if(this.data.type === 'single' && this.data.cxPropShowSuggestion){
            this.setData("suggestedUsers" , this.data.cxPropSuggestion.users); //no i18n
            this.setData('cxPropShowSuggestionLoading' , false); //NO i18n
            if(this.data.suggestedUsers.length){
              var sUser = this.data.suggestedUsers.find( function(x){ return x.lookup_selected_val === true});
              if(sUser){
                this.suggestionCheck = true;
                Lyta.objectUtils(sUser , "add" , 'lookup_selected_val' , false); //no i18n
                // this.suggestionCheck = false;
              }
            }
          }
        },
 setSelectedFilterValue : function(){
  if(!this.getData("cxPropHeaderYield")){
   if(this.getData("cxPropFilterable")){ //NO I18n
    var dropYield=this.getData("cxPropFilterYield"); //NO I18n
    if(dropYield) {
     this.setData("cxPropFilter", this.getData("cxPropSelectedFilterOption")); //NO I18n
     if(!this.getData('selectedList')){ //NO I18n
      this.userdrop.ltProp('selected',this.getData("cxPropSelectedFilterOption")); //NO I18n
     }
     /**
     * When ever the filter is changes in the component this method will be invoked
     * @functionType methodCall onFilterOptionSelected
     * @param {object} event - The change event
     * @param {string} filter - The current selected filter name
     * @param {object} component - The crux components node
     */
     if(this.getMethods('onFilterOptionSelected')){ //NO I18n
      this.executeMethod('onFilterOptionSelected', {}, this.getData("cxPropSelectedFilterOption"), this.userdrop.component); //NO I18n
     }
    }
    else if(!dropYield && this.getData("cxPropSelectedFilterOption")!=undefined){
     this.setData("cxPropFilter", this.getData("cxPropSelectedFilterOption")); //NO I18n
     if(!this.getData('selectedList')){ //NO I18n
      this.userdrop.ltProp('selected',this.getData("cxPropSelectedFilterOption")); //NO I18n
     }
    }
   }
   else{
    if(this.getData("cxPropSelectedFilterOption")==undefined || this.getData("cxPropSelectedFilterOption")==null){
     this.setData("cxPropSelectedFilterOption","ActiveUsers"); //NO I18n
     this.setData("cxPropFilter", "ActiveUsers"); //NO I18n
    }
    else{
     this.setData("cxPropFilter", this.getData("cxPropSelectedFilterOption")); //NO I18n
    }
   }
  } else {
    if(this.data.cxPropSelectedFilterOption) {
        this.setData("cxPropFilter", this.data.cxPropSelectedFilterOption); //NO I18n
    } else {
      this.setData("cxPropFilter", ""); //NO I18n
    }
  }
 },
 setSuggestedUsers : function(){
   if(this.data.cxPropShowSuggestion && this.data.cxPropShow){
     if(this.data.cxPropInputValue.length > 1){
       this.setSearchDataForSuggestion(this.data.cxPropInputValue);
     }else{
       this.setData("suggestedUsers" , this.data.cxPropSuggestion.users); //no i18n
     }
     var selectedId = this.data.cxPropSelectedId;
     if(selectedId && this.data.suggestedUsers.length){
       var sUser = this.data.suggestedUsers.find( function(x){ return x.id === selectedId} );
       if(sUser){
         this.suggestionCheck = true;
         Lyte.objectUtils(sUser , "add" , "lookup_selected_val" , true); //NO i18n
       }
     };
     if(this.data.suggestedUsers.length > 0){
       this.setData('cxPropShowSuggestionLoading' , false); //NO i18n
     }
   }
 }.observes("cxPropSuggestion.users").on("didConnect"), //no i18n

 setZiaLoaderPos : function(){
   if(this.data.cxPropShowSuggestion){
     if(this.data.cxPropShowSuggestionLoading || this.data.searchingUser){
       var tableWidth = $L("#cruxUserLookupTable",this.bodydrop)[0].offsetWidth / 2 , ziaLoader = $L(".ziaLookupLoader",this.bodybody) , loaderWidth = ziaLoader[0].offsetWidth / 2 ;
       var len = ziaLoader.length , left = tableWidth - loaderWidth;
       if(len){
         for(var i = 0 ; i < len ; i++){
           ziaLoader[i].left = left;
         }
       }
     }
   }
 }.observes('cxPropShowSuggestionLoading' , 'searchingUser'), //NO i18n
 setPostionForNoValueTxt : function(){
   if(this.data.cxPropType === "single" && this.data.cxPropShowSuggestion){ //ziaNoUsersLookup
     var tableWidth = $L("#cruxUserLookupTable",this.bodydrop)[0].offsetWidth / 2 ;
     if(this.data.systemData.length === 0){
        var noValueTxt = $L(".NoUsersLookup",this.bodybody)[0];
        if(noValueTxt){
          noValueTxt.left = tableWidth - noValueTxt.width / 2;
        }
     }
     if(this.data.suggestedUsers.length === 0){
        let noValue_txt = $L(".ziaNoUsersLookup",this.bodybody)[0];
        if(noValue_txt){
          noValue_txt.left = tableWidth - noValue_txt.width / 2;
        }
     }
   }
 }.observes('suggestedUsers' , 'systemData'),//NO i18n
 newConstructedBatch: function(records, preventSettingToFalse) {
   var count = 0;
   var primaryKey=this.getData("cxPropPrimaryKey"); //NO I18n
   var listLength = records.length;
   var selectedUserslength , selectedUsers;
   for (var i = 0; i < listLength; i++) {
     this.setData("preventCall",true);//NO I18n
     if(!this.getData("cxPropReqForSelected")){
       selectedUserslength = 1;
       selectedUsers = this.getData('totalAddedObjects'); //NO I18n
       if (this.getData('cxPropType') == "multiple") { //NO I18n
         selectedUserslength = selectedUsers.length; //NO I18n
       }
       if (this.getData('selectedList') == false && this.getData('cxPropType') != "view") { //NO I18n
         if( !preventSettingToFalse ){
           Lyte.Component.set(records[i], 'lookup_selected_val', false); //No I18N
         }
         for (var k = 0; k < selectedUserslength; k++) {
           if (selectedUsers[k][primaryKey] != undefined) {
             if (selectedUsers[k][primaryKey] == records[i][primaryKey]) {
               Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
             }
           } else if (selectedUsers[k] != undefined) {
             if (selectedUsers[k] == records[i][primaryKey]) {
               Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
             }
           } else {
             if (selectedUsers == records[i][primaryKey]) {
               Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
             }
           }
         }
       } else {
         Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
       }
     }
     else{
          if(!this.getData('selectedList')){
            selectedUsers = this.newelySelected;
            selectedUserslength = selectedUsers.length;
            Lyte.Component.set(records[i], 'lookup_selected_val', false); //No I18N
            Lyte.objectUtils( records[i] , "delete" , 'lookup_newely_selected_val' ); //No I18N
            for (var k = 0; k < selectedUserslength; k++) {
              if (selectedUsers[k][primaryKey] === records[i][primaryKey]) {
                Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
              }
            }
            if(this.sideChange || this.isOpenRequest){
              var list = this.selectedHideList;
              var len = list.length;
              for(var k = 0; k < len; k++){
                if(records[i][primaryKey] === list[k][primaryKey]){
                  Lyte.Component.set(records[i],'lookup_newely_selected_val', "selected"); //No I18N
                  this.currentlyHiddenList.push(records[i]);
                  count++;
                  break;
                }
              }
            }
          } else {
            selectedUsers = this.newelyUnSelected;
            selectedUserslength = selectedUsers.length;
            Lyte.Component.set(records[i], 'lookup_selected_val', true); //No I18N
            Lyte.objectUtils( records[i] , "delete" , 'lookup_newely_selected_val' ); //No I18N
            for (var k = 0; k < selectedUserslength; k++) {
              if (selectedUsers[k][primaryKey] === records[i][primaryKey]) {
                Lyte.Component.set(records[i], 'lookup_selected_val', false); //No I18N
              }
            }
            if(this.sideChange || this.isOpenRequest){
               var list = this.unSelectedHideList;
              var len = list.length;
              for(var k = 0; k < len; k++){
                if(records[i][primaryKey] === list[k][primaryKey]){
                  Lyte.Component.set(records[i],'lookup_newely_selected_val', "unSelected"); //No I18N
                  this.currentlyHiddenList.push(records[i]);
                  count++;
                  break;
                }
              }
            }
           
          }
        }
     this.setData("preventCall",false);//NO I18n
   }
   if(this.isNewRequest && this.data.cxPropReqForSelected) {
    this.batchDispCount = this.batchDispCount + this.data.cxPropRecords - count;
    var getNextBatchCond = this.data.currentPos === this.data.localData.length && !this.data.noMoreRecords;
    if(!getNextBatchCond && this.batchDispCount < 10 && this.data.cxPropReqForSelected){
      this.preventLoadMoreData = true;
      setTimeout(function() {
        this.constructArray.call(this,"userLookup",false); //NO I18n
      }.bind(this), 0);
    } else {
      setTimeout(function() {
        this.checkIfNoResultStatus();
      }.bind(this), 0);
      if(this.preventLoadMoreData){
        this.preventLoadMoreData = false;
        this.loadMoreData();
      }
    }
  }  
    /**
     * When ever a batch has been constructed and before its rendered this method will be invoked
     * @functionType methodCall updateList
     * @param {array} items - The batch with the list of items
     */
    if(this.getMethods('updateList')){ //NO I18n
      this.executeMethod('updateList',records);//NO I18n
    }
 },
 updatedList: async function() {
		_cruxUtils.addMurhyInfo("crux-user-lookup.js", "Feb Default Changes");
  if(this.data.cxPropShowAllselectCheckbox){
  var recordsCount = this.getData('cxPropRecords'); //NO I18n
  var currentPos = this.getData('currentPos'); //NO I18n
  if( /*type=="userLookup" && */ currentPos != 0) {
    if(this.bodydrop.querySelector('input[name=allSelectCheckbox]') != null && this.bodydrop.querySelector('input[name=allSelectCheckbox]').checked == true && this.getData('selectedList') == false) {

      // var checkBoxes=this.bodydrop.querySelectorAll('input[name=checkbox]'); //NO I18n
      var checkBoxes = this.getData("systemData"); //NO I18n
      var checkBoxesLength = checkBoxes.length;
      this.setData("preventAllCallBacks", true); //NO I18n
      for( let i = checkBoxesLength - 1 - recordsCount ; i <= checkBoxesLength - 1 ; i++) {
      //for(var i = checkBoxesLength - 1; i > checkBoxesLength - 1 - recordsCount; i--) {
        var preventCheckboxChecked = true;
        if(this.getMethods('beforeCheckboxChecked')) { //NO I18n

          /**
          * Before a checkbox for a item in the list if checked this method will be called.
          * @functionType methodCall beforeCheckboxChecked
          * @param {object} item - The details object of the current itemin the list being chcked.
          * @return The Return value should be a boolean to inform weather or not the checkbox is to be checked
          */
          preventCheckboxChecked = await this.executeMethod('beforeCheckboxChecked', this.getData('systemData')[i]); //NO I18n
        }
        if(preventCheckboxChecked || preventCheckboxChecked == undefined || preventCheckboxChecked == null) {
          if( this.data.cxPropMaxLimit != 0 && (this.getData("totalAddedObjects").length === this.getData("cxPropMaxLimit")) ){
            //this.$node.querySelector('lyte-messagebox').ltProp('show',true); //NO I18n
            this.cxPropMaxLimitMessageBox();
            if(checkBoxesLength > this.getData("cxPropMaxLimit")){
              // this.setData("preventAction",true);//NO I18n
              this.preventAction = true;
              this.setData("allCheckboxState",false);//NO I18n
              // this.setData("preventAction",false);//NO I18n
              this.preventAction = false;
            }
            break;
          }
          // this.setData("preventCallBacks", true); //NO I18n
          this.preventCallBacks = true;
          // this.setData("preventCheckAllSelectiofn" , true); //NO I18n
          this.preventCheckAllSelection = true;
          // checkBoxes[i].parentElement.parentElement.ltProp('checked',true);
          Lyte.Component.set(this.getData('systemData')[i], 'lookup_selected_val', true); //No I18N
        }
      }
      // this.setData("preventCheckAllSelection" , false); //NO I18n
      this.preventCheckAllSelection = false;
      var self = this;
      setTimeout(function() {
         self.checkAllSelection();
      }, 0)

      // this.setData("preventCallBacks", false); //NO I18n
      this.preventCallBacks = false;
      this.setData("preventAllCallBacks", false); //NO I18n
    }
    if(this.bodydrop.querySelector('input[name=selectedAllSelectCheckbox]') != null && this.bodydrop.querySelector('input[name=selectedAllSelectCheckbox]').checked == false && this.getData('selectedList')) {

      // var checkBoxes=this.bodydrop.querySelectorAll('input[name=checkbox]'); //NO I18n
      if(!this.onInDirectChange) {
        var checkBoxes = this.getData("addedItems"); //NO I18n
        var checkBoxesLength = checkBoxes.length;
        this.setData("preventAllCallBacks", true); //NO I18n
        for(var i = checkBoxesLength - 1; i > checkBoxesLength - 1 - recordsCount; i--) {
          var preventCheckboxUnSelection = true;
          if(this.getMethods('beforeCheckboxUnChecked')) { //NO I18n
            /**
            * Before a checkbox for a item in the list if unchecked this method will be called.
            * @functionType methodCall beforeCheckboxUnChecked
            * @param {object} item - The details object of the current itemin the list being unchecked.
            * @return The Return value should be a boolean to inform weather or not the checkbox is to be unchecked
            */
            preventCheckboxUnSelection = await this.executeMethod('beforeCheckboxUnChecked', this.getData('systemData')[i]); //NO I18n
          }
          if(preventCheckboxUnSelection || preventCheckboxUnSelection == undefined || preventCheckboxUnSelection == null) {
            // this.setData("preventCallBacks", true); //NO I18n
            this.preventCallBacks = true;
            // this.setData("preventCheckAllSelection" , true); //NO I18n
            this.preventCheckAllSelection = true;
            // checkBoxes[i].parentElement.parentElement.ltProp('checked',false);
            Lyte.Component.set(this.getData('addedItems')[i], 'lookup_selected_val', false); //No I18N
          }
        }
        // this.setData("preventCheckAllSelection" , false); //NO I18n
        this.preventCheckAllSelection = false;
        var self = this;
        setTimeout(function() {
           self.checkAllSelection();
        }, 0)
        // this.setData("preventCallBacks", false); //NO I18n
        this.preventCallBacks = false;
        this.setData("preventAllCallBacks", false); //NO I18n
      }
      var addIt = this.getData("addedItems"), //No I18n
        count = 0; //NO I18n
      var addLen = addIt.length; //NO I18n
      for(var t = 0; t < addLen; t++) {
        if(addIt[t].lookup_selected_val) {
          count = count + 1;
        }
      }
      // this.setData("selectedModalSelectedIds", count); //NO I18n
      this.selectedModalSelectedIds = count;
    } else {
      // this.setData("selectedModalSelectedIds", this.getData("addedItems").length); //NO I18n
      this.selectedModalSelectedIds = this.getData("addedItems").length; //NO I18N
    }
    // if(this.bodydrop.querySelector('input[name=allSelectCheckbox]')!=null&&this.bodydrop.querySelector('input[name=allSelectCheckbox]').checked==false&&this.getData('selectedList')==false){
    //   this.checkAllSelection();
    // }

  }
}
},
 loadMoreData :  function(){
    if(this.data.cxPropReqForSelected){
      if(!this.preventLoadMoreData){
        this.isNewRequest = false;
        this.setData('openRequest',false); //NO I18n
      } else {
        return;
      }
      if(this.data.pageNo === 1 && this.data.localData && this.data.localData.length === 0){
        this.emptyFirstReq = true;
      }
      this.addNewelySelectedToTop();
      this.sideChange = false;
       this.isOpenRequest = false;
    } 

   //the below class is toggled to make sure that in i.e the table prints all the value [prints only on hover fix during searhing]
   if(this.bodybody.classList.contains("crux_transform_0deg")){
    this.bodybody.classList.remove("crux_transform_0deg");//NO I18n
   }else{
    this.bodybody.classList.add("crux_transform_0deg");//NO I18n
   }
   // if(this.getData("onFilterChange")){
    if(!this.data.cxPropReqForSelected){
     if(!this.getData("selectedList")){
       var count=0;
       for(var y=0;y<this.getData("systemData").length;y++){
        if(this.getData("systemData")[y].lookup_selected_val){
          count++;
        }
       }
       if(count==this.getData("systemData").length && count!=0){
         // this.setData("preventAction",true);//NO I18n
         this.preventAction = true;
         // checkBox.parentElement.parentElement.ltProp("checked",false);//NO I18n
         this.setData('allCheckboxState',true);//NO I18n
         // this.setData("preventAction",false);//NO I18n
         this.preventAction = false;
       }
      // this.setData("onFilterChange",false); //NO I18n
      this.onFilterChange = false;
     }
    }
     // }
  this.setData('firstOpen',false); //NO I18n
  this.setData('searchingScroll',false); //NO I18n
  this.setData('searchingSelectedScroll',false); //NO I18n
  this.setData('searchingSearch',false);  //NO I18n
  if(!this.data.cxPropReqForSelected){
    if(this.getData("noMoreRecords") && ((this.getData("localData").length-this.getData("currentlyExcludedArray").length)<this.getData("cxPropRecords"))){
      this.constructArray.call(this,"userLookup",false) //NO I18n
    }else{
      this.setData('searchingUser',false); //NO I18n
    }
  }
  this.setData('searchingUser',false); //NO I18n
  if(this.selectedUser){
   this.setData('DselectedList',true); //NO I18n
   this.modalEle.alignLyteModal();
  }

  if(this.data.cxPropReqForSelected){
    this.checkIfNoResultStatus();
  }
  
  //Setting this to prevent scroll errors
  $L(this.bodydrop.querySelector('.lyteTableScroll')).resetScrollbar();//NO I18n
  if (this.bindResize && this.data.cxPropSelectedView && !this.data.showNoDataMsg) {
    const modal = document.getElementById('selectedUserLookupTableBody');
  
    const resizeObserver = new ResizeObserver(function() { //eslint-disable-line @zoho/zohocrm/browser-support
      if (this.data.showNoDataMsg) {
        return;
      }
  
      const rows = modal.querySelectorAll('lyte-tr');
  
      if (rows.length < this.data.cxPropSelectedCount) {
  
        resizeObserver.unobserve(modal);
  
        this.bodyScroll("userLookup", undefined, undefined,true);
  
        requestAnimationFrame(() => {
          resizeObserver.observe(modal);
        });
      }
    });
  
    resizeObserver.observe(modal);
    this.bindResize = false;
  }
 },
 storeCurrentSelection : function(){
  if(this.bodydrop.querySelector('input[name=allSelectCheckbox]')!=null){
   var checkBox=this.bodydrop.querySelector('lyte-table-structure').querySelector('input[name=allSelectCheckbox]'); //NO I18n
   // this.setData("preventAction",true);//NO I18n
   this.preventAction = true;
   // checkBox.parentElement.parentElement.ltProp("checked",false);//NO I18n
   this.setData('allCheckboxState',false);//NO I18n
   // this.setData("preventAction",false);//NO I18n
   this.preventAction = false;
  }
 },
 filterObserver : function(arg, evt){
   if(arg=='search' && this.getMethods('onSearch')){ //NO I18n
    /**
    * Before search is being performed this method will be invoked 
    * @functionType methodCall onSearch
    * @param {string} inputValue - The value held by the search box in the component
    */
    this.executeMethod('onSearch', this.getData("cxPropInputValue")); //NO I18n
   }
   if(arg=='removeAll'){
    if(this.data.cxPropReqForSelected){
      this.resetNewelyAdjustedValues();
    }
    if(this.getMethods('onCancelSearch')){ //NO I18n
      /**
      * When search request gets canceled this will be invoked
      * @functionType methodCall onCancelSearch
      * @param {string} filter - The current filter selected.
      */
      this.executeMethod('onCancelSearch', this.getData("cxPropFilter")); //NO I18n
    }
  }
  var networkObject=this.getData("cxPropNetworkData"); //NO I18n
  this.setData("currentlyExcludedArray",[]); //NO I18n
  // this.setData("filterChange",true); //NO I18n
  this.filterChange = true;
  // this.setData("onFilterChange",true); //NO I18n
  this.onFilterChange = false;
  if(!this.getData("isSearch")){
   this.setData('searchingUser',true); //NO I18n
  }
  if(this.getData("cxPropType")=="multiple"){
   this.storeCurrentSelection();
  }
  var filter = this.getData('cxPropFilter'); //NO I18n
  if(!this.getData("isSearch")){
   if(filter!='SelectedUsers' && this.getData('cxPropForcedFetch')==false){
    // networkObject.cxPropCacheQuery=true;
    networkObject.cxPropCacheQuery=this.fixedCacheQuery;
    this.setData("cxPropNetworkData",networkObject); //NO I18n
   }
   if(filter == 'ActiveUsers' && this.getData("pageNo")==1 && this.getData("cxPropForcedFetch")==false){
    // networkObject.cxPropDataCache=true;
    networkObject.cxPropDataCache=this.fixedDataCache;
    this.setData("cxPropNetworkData",networkObject); //NO I18n
   }
   else {
     networkObject.cxPropDataCache=false;
     this.setData("cxPropNetworkData",networkObject); //NO I18n
   }
  }
  if( (filter=='SelectedUsers' && this.getData("cxPropReqForSelected")) || (filter=='SelectedUsers' && this.getData("totalAddedObjects").length!=0) || (filter!='SelectedUsers')){ //NO I18n
   if(filter!="SelectedUsers" || (filter=='SelectedUsers' && this.getData("cxPropReqForSelected"))){ //NO I18n
    if(this.getData("pageNo")!=0){//NO I18n
     this.setData("pageNo",1); //NO I18n
    }
   }
   if(filter=="SelectedUsers"){
    if(!this.getData("cxPropReqForSelected")){
      this.setData("selectedCheckBoxValue",true) //NO I18n
    }
   }
   if(arg !== "search" /*|| (evt && evt.keyCode === 8)*/ || (arg=="removeAll") || (arg === "search" /*&& evt && evt.keyCode !== 8*/ /*&& !this.getData("noUsersAvilabel")*/)) { //NO I18n
    this.setData("localData", []); //NO I18n
    this.setData('currentPos', 0); //NO I18n
    if(this.data.cxPropReqForSelected){
      this.currentlyHiddenList = [];
    }
    if(arg=='search'){
     this.setData('searchingSearch',true);  //NO I18n
    }
    this.constructArray("userLookup", false); //NO I18n
    // this.setData("filterChange",false); //NO I18n
    this.filterChange = false;
   
   }
  }
  else{
   this.setData("selectedCheckBoxValue",false) //NO I18n
   // this.setData("filterChange",false); //NO I18n
   this.filterChange = false;
   this.setData('addedItems',this.getData('totalAddedObjects')); //NO I18n
   this.setData('searchingUser',false); //NO I18n
   this.setData("DselectedList",true); //NO I18n
  }

 },
 setAssign : async function(){
  var beforeFunction=true,selectedUsersId;
  if(this.getMethods('onBeforeAssign')){ //NO I18n
    if(!this.getData("cxPropReqForSelected")){
      /**
      * When Assign button is clicked and before its processed this will be invoked with the total selected list.
      * @functionType methodCall onBeforeAssign
      * @param {array|object} selectedList - The current selected list.
      * @return The boolean returned will be used to allow/prevent the assign process from procedding
      */
      beforeFunction=this.executeMethod('onBeforeAssign',this.responseData); //NO I18n
    }
   else{
     beforeFunction=this.executeMethod('onBeforeAssign',{ "selected":this.newelySelected , "unSelected" : this.newelyUnSelected}); //NO I18n
   }
  }
  if(beforeFunction!= false){
    this.localClose = true;
    this.beforeAssign = true;
    this.onModalClose = true;
   this.setSelectedFilterValue.call(this);
   this.assignClose = true;
   this.$node.cxProp('show',false); //NO I18n
   if(this.data.cxPropReqForSelected){
      var finalSelectedList = {
        "selected" : this.setSelectionStateOfRecords(this.newelySelected,"clear"), //NO I18n
        "unSelected" : this.setSelectionStateOfRecords(this.newelyUnSelected,"clear") //NO I18n
      }
      this.setData("cxPropReqForSelectedValue" , finalSelectedList); //NO I18n
   }
   if(this.getMethods('onAssign')){ //NO I18n
     if(!this.getData("cxPropReqForSelected")){
        /**
        * When Assign button is clicked this will be invoked with the total selected list.
        * @functionType methodCall onAssign
        * @param {array|object} selectedList - The current selected list.
        */
       beforeFunction=await this.executeMethod('onAssign',this.responseData); //NO I18n
    }
    else{
      beforeFunction=await this.executeMethod('onAssign', finalSelectedList); //NO I18n
    }
   }
  }
 },
 fetchUsers : function(count,reqData,sendData,flg,resData){
     var items=reqData;
     var array=items.slice(this.splitPreAddedItems,this.splitPreAddedItems+this.getData('cxPropSelectedPerPage'));//NO I18n
     this.splitPreAddedItems += this.getData('cxPropSelectedPerPage'); //NO I18N
     flg++;
     store.findAll(this.getData("cxPropNetworkData").cxPropModuleName,{ids:array.join(',')}, this.getData("cxPropNetworkData").cxPropCacheQuery, this.getData("cxPropNetworkData").cxPropDataCache,this.getData("cxPropNetworkData").cxPropCustomData).then(function(arg){ //NO I18n
      if(arg && arg.constructor == Object){
       arg = arg[this.getData("cxPropNetworkData").cxPropModuleName];
      }
      resData.push(arg);
      for(var k=0;k<arg.length;k++){
        sendData.push(arg[k]);
      }
      this.responseData = sendData;
      if(flg==count){
         this.setAssign.call(this);
      }
    }.bind(this),function(err){
      var s = console.error;
     s(err);
    }.bind(this));
    return flg;
 },
 filterObs : function(){
  if(!this.onModalClose){
   if(!this.backButton){
    if(this.getData("cxPropInputValue").length>1 && this.getData("isSearch")){
     this.setData({"cxPropInputValue" : "", "isSearch":false}); //NO I18n
    }
    if(this.getData('pageNo')!=0){
     this.setData("pageNo", 1); //NO I18n
    }
    if(this.bodydrop.querySelector('.lyteTableScroll')!=null){ //NO I18n
     this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
    }
    this.filterObserver.call(this);
   }
   else{
    // this.setData('backButton',false); //NO I18n
    this.backButton = false;
   }
  }
  else{
   // this.setData('onModalClose',false); //NO I18n
   this.onModalClose = false;
  }
 }.observes('cxPropFilter'), //NO I18n
 changeCacheOption : function(){
   var obj=this.getData("cxPropNetworkData"); //NO I18n
   if(this.getData("cxPropForcedFetch")==false){
    // obj.cxPropCacheQuery=true; //NO I18n
    obj.cxPropCacheQuery=this.fixedCacheQuery;
   }
   else{
    obj.cxPropCacheQuery=false; //NO I18n
   }
  this.setData("cxPropNetworkData",obj); //NO I18n
}.observes('cxPropForcedFetch'), //NO I18n
setSubordinateQp : function(){
  /*If it subordinate user is true and its is crm then set these queryParams*/
    if(this.getData("cxPropIsSubordinate")){
				// var newQueryParams = {};
				// newQueryParams.feature = "subordinates";//No I18N
				// newQueryParams.related_entity_id = Crm.userDetails.USER_ID;
				return this.data.cxPropHierarchyFilter;
    } else {
      return undefined;
    }
},
 showToggle : function(){
   if(!this.preventShowCalling){
  if(this.getData('cxPropShow')){
    if(this.data.cxPropReqForSelected){
      this.currentlyHiddenList = [];
      if(this.data.cxPropSelectedCount || this.data.cxPropSelectedCount === 0){
        this.originalSelectedCount = this.data.cxPropSelectedCount;
      }
      this.initialOpen = false;
      this.newelySelected = this.data.cxPropReqForSelectedValue ? this.data.cxPropReqForSelectedValue.selected ? this.data.cxPropReqForSelectedValue.selected.slice() : [] : [];
      this.newelySelectedTempList = this.newelySelected.slice();
      this.selectedHideList = this.newelySelected;
      this.newelyUnSelected = this.data.cxPropReqForSelectedValue ? this.data.cxPropReqForSelectedValue.unSelected ? this.data.cxPropReqForSelectedValue.unSelected.slice() : [] : [];
      this.newelyUnSelectedTempList = this.newelyUnSelected.slice();
      this.unSelectedHideList = this.newelyUnSelected;
    }

    var obj=this.getData("cxPropNetworkData"); //NO I18n
    if(this.getData("cxPropForcedFetch")==false){
        // obj.cxPropCacheQuery=true; //NO I18n
        obj.cxPropCacheQuery=this.fixedCacheQuery;
    }
    else {
     obj.cxPropCacheQuery=false; //NO I18n
    }
    this.setData("cxPropNetworkData",obj); //NO I18n
   this.setData("cxPropNetworkData",obj); //NO I18n
   this.setData("cxPropPrimaryKey",store.getPrimaryKey(this.getData('cxPropNetworkData').cxPropModuleName)); //NO I18n
   this.setData("searchingUser",true); //NO I18n
   this.setData('firstOpen',true); //NO I18n
   if(this.getData("cxPropType")=="single" && !this.getData("cxPropFooterYield")){
    var displayId=this.getData("cxPropSelectedId"); //NO I18n
    if(displayId.length!=0){
      this.setData("showSelectedFooter",true); //NO I18n
      this.setData("showPlaceholderForSelected",true); //NO I18n
     store.findRecord(this.getData("cxPropNetworkData").cxPropModuleName,displayId).then(function(arg){ //NO I18n
      this.setData("showPlaceholderForSelected",false); //NO I18n
      this.setData('displaySingleUser',arg[0]); //NO I18n
      //this.$node.querySelector('lyte-modal').ltProp('show',true); //NO I18n
     }.bind(this));
    }
    //else{
      this.modalEle.ltProp('show', true); //NO I18n
    //}
   }
   else{
    this.modalEle.ltProp('show', true); //NO I18n
   }
   
  }
  else
  {
   if(!this.preventWrongClose){
    this.modalEle.ltProp('show', false); //NO I18n
   }
   else{
    // this.setData("preventWrongClose",false); //NO I18n
    this.preventWrongClose = false;
   }
  }
 }
 else{
  // this.setData("preventShowCalling",false); //NO I18n
  this.preventShowCalling = false;
 }

}.observes('cxPropShow').on("didConnect"), //NO I18n
  selectionObserver: function(){
   if( !this.internalSelection && !this.data.cxPropReqForSelected){
      var selectedIdsSliced = this.data.cxPropSelectedIds.slice(),
      selectedDataLen = selectedIdsSliced.length;

      this.defaultSelectedIds = selectedIdsSliced;
      this.setData("totalAddedObjects", selectedIdsSliced.slice()); //NO I18n
      this.setData("cxPropSelectedCount" ,selectedDataLen); //NO I18n
      this.updateSelectedCountMsg();
      if( !this.data.selectedList ){
        this.newConstructedBatch( this.data.systemData, true);
      }

      if(this.data.cxPropShowAllselectCheckbox){
        if(!this.preventCheckAllSelection){
            var self = this;
            setTimeout(function() {
              self.checkAllSelection();
            }, 0)
        }
      }


   } 
 }.observes('cxPropSelectedIds.[]'), //NO I18n,
 lookupOpen : function(){
   if(this.bodydrop.querySelector('input[name=allSelectCheckbox]') && this.bodydrop.querySelector('input[name=allSelectCheckbox]').parentElement.parentElement.ltProp('checked')){
     this.setData('preventAllCheckboxUnchecked',false);//NO I18n
     this.setData('allCheckboxState',false);//NO I18n
   }
  var networkObject=this.getData("cxPropNetworkData"); //NO I18n
  if(!this.multipleClicks){
   // this.setData("multipleClicks",true); //NO I18n
   this.multipleClicks = true;
   if(!this.getData("dataFetched")){ //NO I18n
    if(this.getData("cxPropType")=="single"){
     var elements=[];
     elements[0]=this.getData("cxPropSelectedId").slice(); //NO I18n
     this.setData("totalAddedObjects",elements); //NO I18n
    }
    else{
     // this.setData("defaultSelectedIds",this.getData("cxPropSelectedIds").slice()); //NO I18n
     var selectedIdsSliced = this.data.cxPropSelectedIds.slice();
     this.defaultSelectedIds = selectedIdsSliced;
     this.setData("totalAddedObjects", selectedIdsSliced.slice()); //NO I18n
     if(!this.data.cxPropReqForSelected){
        this.setData("cxPropSelectedCount" , selectedIdsSliced.length ? selectedIdsSliced.length : 0); //NO I18N
     }
    }
    //if(this.data.cxPropReqForSelected){
      this.updateSelectedCountMsg();
    //}
    if(!this.getData("cxPropHeaderYield")){
     var filter = this.getData('cxPropFilter'); //NO I18n
     if(filter == 'ActiveUsers' && this.getData("cxPropForcedFetch")==false){
      // networkObject.cxPropDataCache=true;
      networkObject.cxPropDataCache=this.fixedDataCache;
     }
     else{
      networkObject.cxPropDataCache=false;
     }
     this.setData("cxPropNetworkData",networkObject); //NO I18n
    }
    if(this.getData("cxPropNetworkData").cxPropModuleName=="user"){


      var makeFieldReq = true;
  		var userFieldProperties = this.getData("cxPropUserFieldProperties"); //NO I18n
  		if(userFieldProperties && Object.keys(userFieldProperties).length){
  			if(!userFieldProperties.firstName && userFieldProperties.firstName !== false && !userFieldProperties.lastName && userFieldProperties.lastName !== false){
  				makeFieldReq = true;
  			} else {
  				makeFieldReq = false;
  				this.firstNameAvailability = userFieldProperties.firstName;
  				this.lastNameAvailability = userFieldProperties.lastName;
  			}
  		}
      if(makeFieldReq){
        store.findAll('field',{module:"users"}).then(function(data){//NO I18n
          var fields;
          if(data && data.constructor == Object){
            if(data.field!=undefined){
                fields = data.field;
            }
            else if (data.fields!=undefined){
                fields = data.fields;
            }
          }
          else if(data && data.constructor == Array){
          fields=data;
          }
            this.lastNameAvailability = false;
            this.firstNameAvailability = false;

            var status = 0;
            for(var u=0;u<fields.length;u++){
              if(fields[u].api_name=="first_name"){
                this.firstNameAvailability = true;
                status++;
              }
              if(fields[u].api_name=="last_name"){
                this.lastNameAvailability = true;
                status++;
              }
              if(status === 2){
                break;
              }
            }

        }.bind(this),function(err){
          var s = console.error;
         s(err);
        }.bind(this));
      }

    }
    if(this.data.cxPropSelectedView){
      this.switchToSelected();   

    }else{
      this.isOpenRequest = true;
      this.constructArray.call(this,"userLookup",false) //NO I18n
    }
   
    // this.setData("multipleClicks",false); //NO I18n
    this.multipleClicks = false;
    this.setData("dataFetched", true); //NO I18n
    // this.setData("usersAvailable",true); //NO I18n
    this.usersAvailable = true;
   }
  }
 },
 checkAllSelection : function(){
   if(this.getData("cxPropFilter")!="SelectedUsers"){
        var total = this.getData("systemData");//NO I18n
        var totalLen = total.length;
        var count=0;
        for(var y=0;y<totalLen;y++){
         if(total[y].lookup_selected_val){
           count++;
         }else{
             // this.setData("preventAction",true);//NO I18n
             this.preventAction = true;
             this.setData("allCheckboxState",false);//NO I18n
             // this.setData("preventAction",false);//NO I18n
             this.preventAction = false;
             break;
         }
         if( this.data.cxPropMaxLimit !== 0 && count == this.getData("cxPropMaxLimit") || count === totalLen){
           // this.setData("preventAction",true);//NO I18n
           this.preventAction = true;
           this.setData("allCheckboxState",true);//NO I18n
           // this.setData("preventAction",false);//NO I18n
           this.preventAction = false;
           break;
         }
        }
   }
   else{
     var checkBox=this.bodydrop.querySelector('lyte-table-structure').querySelector('input[name=selectedAllSelectCheckbox]');//NO I18n
     if(!this.getData("cxPropReqForSelected")){
       if(this.selectedModalSelectedIds==this.getData("addedItems").length){

        // var checkBox=this.bodydrop.querySelector('lyte-table-structure').querySelector('input[name=selectedAllSelectCheckbox]'); //NO I18n
        // this.setData("preventAction",true);//NO I18n
        this.preventAction = true;
        //checkBox.parentElement.parentElement.ltProp("checked",true);//NO I18n
        this.setData("selectedCheckBoxValue",true) //NO I18n
        // this.setData("preventAction",false);//NO I18n
        this.preventAction = false;
       }
       else{
        // var checkBox=this.bodydrop.querySelector('lyte-table-structure').querySelector('input[name=selectedAllSelectCheckbox]'); //NO I18n
        // this.setData("preventAction",true);//NO I18n
        this.preventAction = true;
        //checkBox.parentElement.parentElement.ltProp("checked",false);//NO I18n
        this.setData("selectedCheckBoxValue",false) //NO I18n
        // this.setData("preventAction",false);//NO I18n
        this.preventAction = false;
       }
     }
     else{
       var total = this.getData("addedItems").length;//NO I18n
       var totalLen = total.length;
       var count=0;
       for(var y=0;y<totalLen;y++){
        if(!total.lookup_selected_val){
          count++;
        }else{
          // this.setData("preventAction",true);//NO I18n
          this.preventAction = true;
          this.setData("allCheckboxState",false);//NO I18n
          // this.setData("preventAction",false);//NO I18n
          this.preventAction = false;
          break;
        }
        if(this.data.cxPropMaxLimit !== 0 && count == this.getData("cxPropMaxLimit")){
          // this.setData("preventAction",true);//NO I18n
          this.preventAction = true;
          this.setData("allCheckboxState",true);//NO I18n
          // this.setData("preventAction",false);//NO I18n
          this.preventAction = false;
        }
       }
     }
   }
 },
 getKeyDown : function(eve){
   if(!this.getData("cxPropPreventKeyDown")){
   if(!this.inputFocus){
     var up=false,down=false,selectItem=false;
     if(eve.keyCode==38){
       up=true;
     }else if(eve.keyCode==40){
       down=true;
     }else if (eve.keyCode==32){
      selectItem=true;
     }
     var currentModal=document.querySelector(".currentOpenedModal").component.childComp;//NO I18n
     var table=currentModal.querySelector("lyte-table");//NO I18n
     var selected=table.querySelector('.currentSelected');//NO I18n
     if(selectItem && selected){
       selected.click();
     }else{
     if(table){
       if(!selected && (up || down)){
         var tablebody=table.querySelector("lyte-tbody");//NO I18n
         tablebody.querySelector("lyte-tr").classList.add("currentSelected");//NO I18n
       }else{
         var nextElement;
         if(up){
           if(selected.previousElementSibling!==null){
             selected.classList.remove("currentSelected");//NO I18n
             selected.previousElementSibling.classList.add("currentSelected");//NO I18n
             selected=selected.previousElementSibling;
           }
           var tableHeader=table.querySelector("lyte-thead").querySelector("lyte-th");//NO I18n
           var headerBottom=tableHeader.getBoundingClientRect().bottom;
           var selectedTop=selected.getBoundingClientRect().top;
           if(selectedTop-headerBottom<0){
             table.querySelector(".lyteTableScroll").scrollTop=table.querySelector(".lyteTableScroll").scrollTop+(selectedTop-headerBottom);//NO I18n
           }
         }
         else if(down){
           if(selected.nextElementSibling.tagName!="TEMPLATE"){
             selected.classList.remove("currentSelected");//NO I18n
             selected.nextElementSibling.classList.add("currentSelected");//NO I18n
             selected=selected.nextElementSibling;
           }
           var tableHeader=table.querySelector("lyte-thead").querySelector("lyte-th");//NO I18n
           // var headerBottom=tableHeader.getBoundingClientRect().bottom;
           var tableBottom=table.querySelector(".lyteTableScroll").getBoundingClientRect().bottom;//NO I18n
           var selectedBottom=selected.getBoundingClientRect().bottom;
           if(tableBottom-selectedBottom<0){
             table.querySelector(".lyteTableScroll").scrollTop=table.querySelector(".lyteTableScroll").scrollTop+((tableBottom-selectedBottom)*(-1));//NO I18n
           }
         }
       }
     }
   }
 }
}
 },
 data : function(){
  return {
   // onInDirectChange : Lyte.attr('boolean', { "default" : false}), //NO I18n

   /**
	 * This data property represents the plural label of the module the lookup is currently representing [ EG - Users for user module ]
	 * @componentProperty { string } cxPropPluralModuleName=Users
	 */
   cxPropPluralModuleName : Lyte.attr('string', { "default" : _cruxUtils.getI18n("crm.label.users")}), //NO I18n

   /**
	 * This data property represents the singular label of the module the lookup is currently representing [ EG - User for user module ]
	 * @componentProperty { string } cxPropSingularModuleName=User
	 */
   cxPropSingularModuleName : Lyte.attr('string', { "default" : _cruxUtils.getI18n("User")}), //NO I18n

   /**
	 * Data passed to this property will be set as the max limit message for the component
	 * @componentProperty { string } cxPropMaxLimitMsg=""
	 */
   cxPropMaxLimitMsg : Lyte.attr('string', { "default" : ""}), //NO I18n


   // setSelectedSideVariables : Lyte.attr('boolean', { "default" : false}), //NO I18n

   /**
	 * To allow other lyte popup component to be loaded on top of this components popup this boolean must be set to true. 
	 * @componentProperty { boolean } cxPropAllowMultiple=false
	 */
   cxPropAllowMultiple : Lyte.attr('boolean', { "default" : false}), //NO I18n

   /**
	 * To overwrite the request layer with a custom request layer set this boolean as true. 
	 * @componentProperty { boolean } cxPropCustomRequest=false
	 */
   cxPropCustomRequest : Lyte.attr('boolean', { "default" : false}), //NO I18n

   /**
	 * Data passed to this property will be set as the no user message in the component. 
	 * @componentProperty { string } cxPropNoUserAvilableMsg
   * @default No users found
	 */
   cxPropNoUserAvilableMsg : Lyte.attr("string", { "default" :_cruxUtils.getI18n('crm.security.group.users.empty') }), //NO I18n

   currentlyExcludedArray : Lyte.attr('array', {"default" : []}), //No I18n
   /**
	 * Data passed to this property will be passed to the width property of lyte-modal. 
	 * @componentProperty { string } cxPropLookupWidth=60%
	 */
   cxPropLookupWidth : Lyte.attr("string", { "default" : "60%"}), //NO I18n

   
   cxPropViewWidth : Lyte.attr("string", { "default" : "40%"}), //NO I18n
   allCheckboxbeforeUnchecked : Lyte.attr('boolean', { "default" : true}), //NO I18n
   allCheckboxState : Lyte.attr('boolean', { "default" : false}), //NO I18n
   buttonAccessibility : Lyte.attr('boolean', { "default" : true}), //NO I18n
   
   /**
	 * Data passed to this property will be passed to the wrapper-class property of lyte-modal. 
	 * @componentProperty { string } cxPropWrapperClass=""
   * @author Mahalakshmi M
   * @version 1.0.0
   * @input
	 */
   cxPropWrapperClass : Lyte.attr("string", { "default" : "", input: true}), //NO I18n


   stopScrolling : Lyte.attr('boolean', { "default" : false}), //NO I18n
   // preventShowCalling : Lyte.attr('boolean', {"default" : false}), //NO I18n

   /**
	 * Data passed to this property will be passed to the queryParams to the requests being made in the component. 
	 * @componentProperty { object } cxPropQueryParams={}
   * @default {}
	 */
   cxPropQueryParams : Lyte.attr('object', {"default" : {}}), //NO I18n
   selectedCheckBoxValue : Lyte.attr('boolean', {"default" : true}), //NO I18n
   

   /**
	 * The key to be considered as the primary key for each display items data object should be passed to this property. 
	 * @componentProperty { string } cxPropPrimaryKey
	 */
   cxPropPrimaryKey : Lyte.attr("string"), //NO I18n

   /**
	 * This array of objects contains info about the headers for the table such as like header display name , the key to refer for the current coloum, weather its a yielded coloum or not and weather if the coloum is to be sticky or not. 
	 * @componentProperty { array } cxPropHeader
   */

   //* @default [{"systemValue":"full_name","displayValue":"User&nbspName","yield":false,isSticky:true},{"systemValue":"role","displayValue":"Role","yield":false,isSticky:false},{"systemValue":"email","displayValue":"Email","yield":false,isSticky:false},{"systemValue":"profile","displayValue":Profile,"yield":false,isSticky:false}]
    /**
             * @componentProperty { array } cxPropHeader
             * @author Mahalakshmi M
             * @version 1.0.0
             * @input
             */
   cxPropHeader : Lyte.attr('array', {"default" : [{"systemValue":"full_name" , "displayValue":_cruxUtils.getI18n('crm.zti.label.user') , "yield":false, isSticky : true, fixed : 'enable'} , {"systemValue":"role" , "displayValue":_cruxUtils.getI18n('cob.role') , "yield":false, isSticky : false, fixed : 'enable'} , {"systemValue":"email" , "displayValue":_cruxUtils.getI18n('zoho.email') , "yield":false, isSticky : false, fixed : 'enable'}, {"systemValue":"profile" , "displayValue":_cruxUtils.getI18n('Profile') , "yield":false, isSticky : false, fixed : 'enable'}], input: true}), //NO I18n

   /**
	 * Data passed to this property will determine is the header is to be yielded or not. 
	 * @componentProperty { boolean } cxPropHeaderYield=false
	 */
   cxPropHeaderYield : Lyte.attr('boolean',{"default": false}), //NO I18n

   /**
	 * Data passed to this property will determine is the footer is to be yielded or not. 
	 * @componentProperty { boolean } cxPropFooterYield=false
	 */
   cxPropFooterYield : Lyte.attr('boolean',{"default": false}), //NO I18n

   /**
	 * This object contains info about the request to be made by the component like module name , weather cache query for store request is required , weather cache data is required for the store request and weather if custom data is to be passed to the store request. 
	 * @componentProperty { object } cxPropNetworkData
   * @default {"cxPropModuleName": "user", "cxPropCacheQuery":true , "cxPropDataCache":false}
	 */
   cxPropNetworkData : Lyte.attr('object', {"default" : {"cxPropModuleName": "user", "cxPropCacheQuery":true , "cxPropDataCache":false}}), //NO I18n

   displaySingleUser : Lyte.attr('object', {"default" : {}}), //NO I18n

   /**
	 * The number passed to this property will represent the number of records to be requested for per page in the selected side [ applies only for type multiple]. 
	 * @componentProperty { number } cxPropSelectedPerPage=100
	 */
   cxPropSelectedPerPage : Lyte.attr("number", {"default": 100}), //NO I18n
   searchingScroll : Lyte.attr('boolean',{"default": false}), //NO I18n
   noUsersAvilabel : Lyte.attr('boolean',{"default": false}), //NO I18n
   firstOpen : Lyte.attr('boolean'), //NO I18n


   cxPropModalWidth : Lyte.attr("string"), //NO I18n

   /**
	 * This property is used to show and hide the popup. 
	 * @componentProperty { boolean } cxPropShow=false
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
	 */
   cxPropShow : Lyte.attr("boolean",{"default": false , input : true}), //NO I18n
   DselectedList : Lyte.attr('boolean', { "default" : false}), //NO I18n
   selectedList : Lyte.attr('boolean', { "default" : false}), //NO I18n

   /**
	 * This property is used to set the type required currently
	 * @componentProperty { multiple|single } cxPropType=single
   * @author Mahalakshmi M
  * @version 1.0.0
  * @input
	 */
   cxPropType : Lyte.attr('string', {"default" : "single", input : true}), //NO I18n
   /**
	 * When the property is true then request will be never be cached. Hence requests will always be triggered
	 * @componentProperty { boolean } cxPropForcedFetch=false
	 */
   cxPropForcedFetch : Lyte.attr('boolean', { "default" : false}), //NO I18n
   systemData : Lyte.attr('array', {"default" : []}), //NO I18n
   localData : Lyte.attr('array', { "default" : []}), //NO I18n
   pageNo: Lyte.attr("number", {"default": 1}), //NO I18n
   noMoreRecords : Lyte.attr('boolean', { "default" : true}), //NO I18n
   addedItems : Lyte.attr("array", {"default" : []}), //NO I18n
   totalAddedObjects : Lyte.attr("array", {"default" : []}), //NO I18n
   currentPos : Lyte.attr('number', { "default" : 0}), //NO I18n
   isSearch : Lyte.attr("boolean", {"default": false}), //NO I18n
   multiScroll : Lyte.attr('boolean', { "default" : false}), //NO I18n
   searchingSearch : Lyte.attr('boolean', { "default" : false}), //NO I18n
   searchingUser : Lyte.attr('boolean', { "default" : true}), //NO I18n
  
   cxPropCacheQuery : Lyte.attr("boolean"), //NO I18n
   cxPropDataCache : Lyte.attr("boolean", {"default":false}), //NO I18n

   /**
	 * This property is used to set the size of the page for the request being triggered to fetch data in the component.
	 * @componentProperty { number } cxPropPerPage=200
	 */
   cxPropPerPage : Lyte.attr("number", {"default": 200}), //NO I18n

   /**
	 * This property should contain the list of Ids [ i.e primary keys ] that are to be selected in the component.
	 * @componentProperty { array } cxPropSelectedIds
   * @default []
	 */
   cxPropSelectedIds : Lyte.attr("array", {"default": []}), //NO I18n

   /**
	 * This property should contain the Id [ i.e primary keys ] that is to be selected in the component.
	 * @componentProperty { string } cxPropSelectedId
   * @default ""
	 */
   cxPropSelectedId : Lyte.attr("string", {"default": ""}), //NO I18n

   /**
	 * The list of Ids [ i.e primary key ] passed to this property will be excluded from being added to the display batch when found in the response.
	 * @componentProperty { array } cxPropExclude
   * @default []
	 */
   cxPropExclude : Lyte.attr("array", {"default": []}), //NO I18n

   cxPropModuleName : Lyte.attr("string", {"default":"user"}), //NO I18n

   /**
	 * This property will determine the maximum selection count in the component.
	 * @componentProperty { number } cxPropMaxLimit=500
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
	 */
   cxPropMaxLimit : Lyte.attr("number", {"default":500, input : true}), //NO I18n
   /**
	 * This property will be used to set the header name in the component.
	 * @componentProperty { string } cxPropHeaderName
	 */
   cxPropHeaderName : Lyte.attr("string"), //NO I18n
   cxPropUserDropShow : Lyte.attr('boolean', {"default" : false}), //NO I18n
   cxPropUserDropFreeze : Lyte.attr('boolean', {"default" : false}), //NO I18n
   cxPropUserDropDisabled :  Lyte.attr('boolean', {"default" : false}), //NO I18n
   cxPropUserDropBoundary : Lyte.attr('object', {"default" : {}}), //NO I18n
   cxPropUserDropCallout : Lyte.attr('boolean', { "default" : false}), //NO I18n
   cxPropUserDropTabindex : Lyte.attr('string',{"default" : '0'}), //NO I18n


   /**
	 * This value contains the current selected filter option in the component.
	 * @componentProperty { string } cxPropFilter=AllUsers
	 */
   cxPropFilter : Lyte.attr("string", {"default" : "AllUsers"}), //NO I18n

   /**
	 * This property is used to determine if the the filter is to be yielded or not. Yield name is userDropdownInner.
	 * @componentProperty { string } cxPropFilter=AllUsers
	 */
   cxPropFilterYield : Lyte.attr('boolean', {"default" : false}), //NO I18n

   /**
	 * This property is used to filtr options in the component. Default filters are `AllUsers, ActiveUsers, DeactiveUsers, ConfirmedUsers, NotConfirmedUsers, DeletedUsers, ActiveConfirmedUsers, AdminUsers, ActiveConfirmedAdmins, CurrentUser`.
	 * @componentProperty { string } cxPropFilterOptions
   * @default [{"id":"AllUsers","category":"All"},{"id":"ActiveUsers","category":"Active"},{"id":"DeactiveUsers","category":"Inactive"},{"id":"ConfirmedUsers","category":Confirmed},{"id":"NotConfirmedUsers","category":"Unconfirmed"},{"id":"DeletedUsers","category":"Deleted"},{"id":"ActiveConfirmedUsers","category":"Active&nbspConfirmed"},{"id":"AdminUsers","category":"Admin"},{"id":"ActiveConfirmedAdmins","category":"Active&nbspConfirmed&nbspAdmins"},{"id":"CurrentUser","category":"Current"}]
	 */
   cxPropFilterOptions : Lyte.attr('array', { "default" : []}), //NO I18n

   /**
	 * This should be the flter to be selected during open. [ i.e the filters system value]
	 * @componentProperty { string } cxPropSelectedFilterOption=ActiveUsers
	 */
   cxPropSelectedFilterOption : Lyte.attr('string'), //NO I18n

  /**
	 * This property contains the name of the key holding the display value in property cxPropFilterOptions
	 * @componentProperty { string } cxPropFilterUserValue=category
	 */
   cxPropFilterUserValue : Lyte.attr('string', {"default" : ''}), //NO I18n

   /**
	 * This property contains the name of the key holding the system value in property cxPropFilterOptions
	 * @componentProperty { string } cxPropFilterSystemValue=id
	 */
   cxPropFilterSystemValue : Lyte.attr('string', { "default" : ''}), //NO I18n

   /**
	 * This property is used determine if search box is required or not
	 * @componentProperty { boolean } cxPropSearchable=true
	 */
   cxPropSearchable : Lyte.attr('boolean', {"default" :  true}), //NO I18n

   /**
	 * This property is used determine if filter dropdown is required or not
	 * @componentProperty { boolean } cxPropFilterable=true
   * @author Mahalakshmi M
   * @version 1.0.0
   * @input
	 */
   cxPropFilterable : Lyte.attr('boolean', { "default" : true, input : true}), //NO I18n

   /**
	 * This property is used determine display batch size in the component
	 * @componentProperty { number } cxPropRecords=20
	 */
   cxPropRecords : Lyte.attr('number', { "default" : 20}), //NO I18n

   /**
	 * This property is used determine minimum length required for search to be triggered
	 * @componentProperty { number } cxPropMinLength=1
	 */
   cxPropMinLength : Lyte.attr('number', { "default" : 1}), //NO I18n
   // pendingSearchVariable : Lyte.attr("object",{"default" : {isPending:false}}), //NO I18n
   // SearchNetworkCount : Lyte.attr("number",{"default" : 0}), //NO I18n
   cxPropInputAutocomplete : Lyte.attr("string",{"default" : 'off'}), //NO I18n

   /**
	 * This property is used set the input box placeholder
	 * @componentProperty { number } cxPropInputPlaceholder
   * @default "Search Users"
	 */
   cxPropInputPlaceholder : Lyte.attr("string",{"default" :_cruxUtils.getI18n('crm.label.search.for.users')}), //NO I18n
   cxPropInputAutofocus : Lyte.attr("boolean",{"default" : false}), //NO I18n

   /**
	 * This property is used determine if the input box is to be disabled or not
	 * @componentProperty { boolean } cxPropInputDisabled=false
	 */
   cxPropInputDisabled : Lyte.attr("boolean",{"default" : false}), //NO I18n


   cxPropInputStyle : Lyte.attr("string",{"default" : ''}), //NO I18n
   // cxPropInputMaxlength : Lyte.attr("number",{"default" : 25}), //NO I18n
   cxPropInputReadonly : Lyte.attr("boolean",{"default" : false}), //NO I18n
   cxPropInputId : Lyte.attr("string",{"default" : 'inputId'}), //NO I18n
   cxPropInputClass : Lyte.attr("string",{"default" : ''}), //NO I18n
   cxPropInputType : Lyte.attr("string",{"default" : 'search'}), //NO I18n
   cxPropInputName : Lyte.attr("string",{"default" : ''}), //NO I18n
   cxPropInputWidth : Lyte.attr("string",{"default" : 'auto'}), //NO I18n
   cxPropInputValue : Lyte.attr("string",{"default" : ''}), //NO I18n
   cxPropInputAppearance : Lyte.attr("string",{"default" : 'box'}), //NO I18n
   cxPropInputDirection : Lyte.attr("string",{"default" : 'vertical'}), //NO I18n
   cxPropInputWrapperStyle : Lyte.attr('string', {'default' : 'border: 1px solid #ddd; padding: 5px;height: 32px; top: unset;'}), //NO I18n
   cxPropInputTabindex : Lyte.attr('string',{"default" : '0'}), //NO I18n


   /**
	 * This property value will be appended the queryparams with the keyvalue 'filters' for the standared requests.
	 * @componentProperty { string } cxPropCriteria=''
	 */
   cxPropCriteria : Lyte.attr("string",{"default" : ''}), //NO I18n

   /**
	 * This property value will be appended the search requests queryparams with the key `criteria`.
	 * @componentProperty { string } cxPropCriteria=''
	 */
   cxPropSearchCriteria : Lyte.attr("string",{"default" : ''}), //NO I18n
   // inputFocus : Lyte.attr("boolean",{"default" : false}), //NO I18n


   cxPropPreventKeyDown : Lyte.attr("boolean",{"default" : false}), //NO I18n
   // selectedTotalAddedObjects : Lyte.attr('array', { "default" : []}), //NO I18n

   //testing
   cxPropReqForSelected : Lyte.attr("boolean",{"default" : false}), //NO I18n
   cxPropSelectedCount : Lyte.attr('number', {"default" : 0}), //NO I18n
   cxPropSelectedList : Lyte.attr("boolean",{"default" : false}), //NO I18n

   /**
	 * For cases where the key 'filter' is to not be set in the standared requests query params then set this to true.
	 * @componentProperty { boolean } cxPropSetEmptyFilter=false
	 */
   cxPropSetEmptyFilter : Lyte.attr("boolean",{"default" : false}), //NO I18n
   cxPropSelectedLinkMessage : Lyte.attr("string"), //NO I18n
   cxPropPreventRowClick : Lyte.attr("boolean",{"default" : true}), //NO I18n
   showPlaceholderForSelected : Lyte.attr("boolean",{"default" : false}), //NO I18n
   showSelectedFooter : Lyte.attr("boolean",{"default" : false}), //NO I18n
   
   /**
	 * This property is used to determine the time the max limit message box is to be shown to the user
	 * @componentProperty { string } cxPropSetEmptyFilter=2000
	 */
   cxPropMaxLimitDuration : Lyte.attr("string",{"default" : "2000"}), //NO I18n

   /**
	 * The vaues passed to this property will be set into the search request query params alone.
	 * @componentProperty { string } cxPropSelectedQueryParams
   * @default {}
	 */
   cxPropSelectedQueryParams : Lyte.attr('object', { "default" : {}}), //NO I18n
   messageBoxType : Lyte.attr('string', { "default" : "error"}), //NO I18n

   /**
	 * To prevent the field request in the component this property is to be set with data. There are two keys firstname, lastname. These are booleans specifing weather if those keys are available or not. If available it will be passed to search request otherwise skipped.
	 * @componentProperty { object } cxPropUserFieldProperties
   * @default {}
	 */
  cxPropUserFieldProperties: Lyte.attr("object", {"default": {}}), //NO I18N

   /**
	 * This property is used to determine if suggested users are to be shown or not.
	 * @componentProperty { boolean } cxPropShowSuggestion=false
	 */
   cxPropShowSuggestion : Lyte.attr("boolean",{"default" : false}), //NO I18n

   /** 
	 * This boolean is used to determine is loading it to be shown or not for the suggested users during data fetch.
	 * @componentProperty { boolean } cxPropShowSuggestionLoading=false
	 */
   cxPropShowSuggestionLoading : Lyte.attr("boolean",{"default" : false}), //NO I18n

   /** 
	 * This property contains the suggested users and it header information.
	 * @componentProperty { object } cxPropSuggestion
   * @default {'label':"Zia&nbspSuggestion",'users':[]}
	 */
   cxPropSuggestion : Lyte.attr("object", {"default": {'label' : "Zia Suggestion" , 'users' : []}}), //NO I18n
   suggestedUsers : Lyte.attr("array",{"default" : []}), //NO I18n

   /** 
	 * This property is used to set the empty suggested user message in the component.
	 * @componentProperty { string } cxPropNoSuggestionValue
   * @default "No Suggestions Found"
	 */
   cxPropNoSuggestionValue : Lyte.attr("string",{"default" : "No Suggestions Found"}), //NO I18n


   cxPropIsSubordinate :  Lyte.attr('boolean' , {"default" : false}), //NO I18n
   /** 
	 * This property is used to set hierarchy filter. This value will be considered as queryParam during cxPropIsSubordinate is true.
	 * @componentProperty { object } cxPropHierarchyFilter
   */
   cxPropHierarchyFilter :  Lyte.attr("object", {"default": {'feature' : "subordinates" , 'related_entity_id' : Crm.userDetails.USER_ID}}), //NO I18n
  /** 
	 * This property is used to display selected records first.
	 * @componentProperty { boolean } cxPropSelectedView
   * @default false
	 */
   
   cxPropSelectedView : Lyte.attr('boolean' , {"default" : false}), //NO I18n
   /** 
	 * This property is yield support for the selected records view checkbox.
	 * @componentProperty { boolean } cxPropPrefixYield
   * @default false
	 */
   cxPropPrefixYield : Lyte.attr('boolean' , {"default" : false}), //NO I18n
   

    /** 
    * This property is used to set ltPropTransition property of lyte-modal.
    * @componentProperty { object } cxPropTransition
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
    */
    // * @default {"animation":"slideFromTop","duration":"0.4"}
    cxPropTransition : Lyte.attr('object' , {"default" : {"animation":"slideFromTop","duration":"0.4"}, input : true}), //NO I18n

    /** 
    * This property is used to set ltPropOffset property of lyte-modal.
    * @componentProperty { object } cxPropOffset
    * @default {"top":"0px","left":"center"}
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
    */
    cxPropOffset : Lyte.attr('object' , {"default" : {"top":"0px","left":"center"}, input : true}), //NO I18n
    /**
     * This property will be used to set the header name in the component.
     * @componentProperty { string } cxPropTitle
     * @author Mahalakshmi M
     * @version 1.0.0
     * @input
     */
    cxPropTitle:Lyte.attr('string', {input : true}),

    cxPropShowCloseIcon:Lyte.attr('boolean'),

    /** 
    * This property is used to set ltPropCloseOnEscape property of lyte-modal.
    * @componentProperty { boolean } cxPropCloseOnEscape=false
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
    */
    cxPropCloseOnEscape:Lyte.attr('boolean',{"default":false, input : true}), //NO I18n
    preventFocus  : Lyte.attr('boolean',{"default":false}), //NO I18n
    openRequest : Lyte.attr('boolean'), //NO I18n
    cxPropReqForSelectedValue : Lyte.attr('object' , {"default" : {
      "selected" : [], //No I18n
      "unSelected" : [] //No I18N
    }}),
    cxPropShowAllselectCheckbox : Lyte.attr('boolean' , {"default" : true}), //NO I18n

    /** 
    * This property can set the footer buttons literals.
    * @componentProperty { object } cxPropFooterButtonsLiterals
    * @condition cxPropType multiple
    * @author Mahalakshmi M
    * @version 1.0.0
    * @input
    */

    //* @default {"cancel":"Cancel","save":"Assign"}
    cxPropFooterButtonsLiterals : Lyte.attr('object' , {"default" : {
      "cancel" : _cruxUtils.getI18n("crm.button.cancel"), //No I18n
      "save" : _cruxUtils.getI18n("crm.label.assign.manually") //No I18N
    }, input : true}),
    showNoDataMsg: Lyte.attr('boolean' , {"default" : false}), //NO I18n
    /** 
    * This property should contain the selected side header text. [ applicable only for type multiple ]
    * @componentProperty { object } cxPropSelectedHeaderMsg
    * @default "Selected Users"
    */
    cxPropSelectedHeaderMsg : Lyte.attr('string', {"default" : _cruxUtils.getI18n('crm.usrpop.non.selected')}), //NO I18N

    cxPropModalWidth : Lyte.attr("string"), //NO I18n
    /**
     * Data passed to this property will be passed to the max width property of lyte-modal. 
     * @componentProperty { string } cxPropMaxWidth
      * @author Mahalakshmi M
      * @version 1.0.0
      * @input
      */
    cxPropMaxWidth : Lyte.attr("string", { "default" : "", input : true}), //NO I18n
    /**
     * Data passed to this property will be passed to the height property of lyte-modal. 
     * @componentProperty { string } cxPropMaxHeight
     * @author Mahalakshmi M
      * @version 1.0.0
      * @input
     */
    cxPropMaxHeight : Lyte.attr("string", { "default" : "", input : true}), //NO I18n
    cxPropHeight : Lyte.attr("string", { "default" : "auto"}), //NO I18N
    cxPropNoContentClass : Lyte.attr("string", {"default" : "noResultAriaComp"}) //No I18n
  }
 },
 continueBackToLookup : function(){
  this.modalEle.alignLyteModal();
  this.bodydrop = this.modalEle.component.childComp; //NO I18n
  this.bodybody = this.bodydrop.querySelector('div.lyteTableScroll'); //NO I18n
  this.userdrop = this.bodydrop.querySelector('lyte-dropdown'); //NO I18n
  this.bodybox = this.bodydrop.querySelector('lyte-drop-box'); //NO I18n
  if(this.userdrop) {
  this.userbody = this.userdrop.querySelector('lyte-drop-body'); //NO I18n
  this.userbox = this.userdrop.querySelector('lyte-drop-box'); //NO I18n
  }
  this.backButton = true;
  this.setData('cxPropFilter',this.savedFilter); //NO I18n
  if(this.getData("cxPropFilterable") && !this.getData("cxPropHeaderYield")){ //NO I18n
    var dropEle = this.bodydrop.querySelector('lyte-dropdown'); //NO I18n
    if(dropEle){
      dropEle.ltProp('selected',this.savedFilter); //NO I18n
    }
  }
  this.bodydrop.querySelector('.lyteTableScroll').scrollTop=0; //NO I18n
  this.setData("totalAddedObjects",this.getData("cxPropSelectedIds").slice());//NO I18n
  this.updateSelectedCountMsg();
  this.checkIfNoResultStatus();
  },
 actions : {
  rowClick : async function(evt,currentRow,index){
    if(this.isRowClicking){
      return;
    }
    if(this.getData("cxPropPreventRowClick")){
      if(this.getData("cxPropType")=="single"){
       if( evt.target._callee && evt.target._callee.tagName == "LYTE-RADIOBUTTON"){
         _cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
        return;
       }
       if(!currentRow.querySelector('lyte-radiobutton').ltProp('checked')!=false){
         var preventradiobuttonClick=true;
         var isSugClick = currentRow.classList.contains("cxUserLookupZiaSuggestedRow");
         var selData = isSugClick ? this.data.suggestedUsers[index] : this.data.systemData[index];
         if(this.getMethods('beforeRadiobuttonClicked')){ //NO I18n
          /**
          * Before the radiobutton is selected this method will be invoked
          * @functionType methodCall beforeRadiobuttonClicked
          * @param {object} selectedItem - The current selected item.
          * @return The return value is a boolean which will be used to prevent / allow the radiobutton from being selected.
          */
          preventradiobuttonClick=await this.executeMethod('beforeRadiobuttonClicked',selData); //NO I18n
         }
         if(preventradiobuttonClick || preventradiobuttonClick==undefined || preventradiobuttonClick==null){
           this.preventCallBacks = true;
        if(!this.getData('selectedList')){
          Lyte.Component.set(selData,'lookup_selected_val',true); //No I18N
        }else{
          Lyte.Component.set(this.getData('addedItems')[index],'lookup_selected_val',true); //No I18N
        }
      }
       }
      }
      else if(this.getData("cxPropType")=="multiple"){
         var target = evt.target.closest("lyte-yield");
      if( (evt.target._callee && evt.target._callee.tagName === "LYTE-CHECKBOX") || (target && target.getAttribute("yield-name") === "body-prefix-yield")){
        _cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
        return;
       }
       var checkboxEle = currentRow.querySelector('lyte-checkbox'); //NO I18n
       if(!checkboxEle.ltProp('checked')){
         var preventCheckboxChecked=true;
         if(this.getMethods('beforeCheckboxChecked')){ //NO I18n
           preventCheckboxChecked=await this.executeMethod('beforeCheckboxChecked',this.getData('systemData')[index]); //NO I18n
         }
         if(preventCheckboxChecked || preventCheckboxChecked==undefined || preventCheckboxChecked==null){
           this.preventCallBacks = true;
           this.isRowClicking = true;
           checkboxEle.click();
           this.isRowClicking = false;
         }
       }
       else if(checkboxEle.ltProp('checked')){
         var preventCheckboxUnSelection=true;
         if(this.getMethods('beforeCheckboxUnChecked')){ //NO I18n
           preventCheckboxUnSelection=await this.executeMethod('beforeCheckboxUnChecked',this.getData('systemData')[index]); //NO I18n
         }
         if(preventCheckboxUnSelection || preventCheckboxUnSelection==undefined || preventCheckboxUnSelection==null){
           this.preventCallBacks = true;
           this.isRowClicking = true;
           checkboxEle.click();
           this.isRowClicking = false;
         }
       }
      }
      this.preventCallBacks = false;
    }
  },
  clearInput : function(val){
    this.clearSearchAction()
  },
  searchKeyup : function(){
      this.performSearchOperation();
  },
  bactToLookup : function(){
    this.switchFromSelectedFunc();
  },
  SelectedUserModal : function(){
    this.switchToSelected();
  },
  assignSelectedUsers : function(){
    this.performSaveAction();
    },

  tableScroll : function(event){
   if(this.getData("cxPropShow")){
    clearTimeout(this._timeout1);
    let event_target = event.target;
    this._timeout1=setTimeout(function(){
      if(!this.data.cxPropReqForSelected || this.data.cxPropReqForSelected && !this.emptyFirstReq){
        this.bodyScroll.call(this,"userLookup",event,event_target); //NO I18n
      }
    }.bind(this), 100);
   }
  },
  mouse : function( evt ){
   if( evt._fakeEvent )
   {
    setTimeout( function(){
     evt.preventDefault();
     evt.stopPropagation();
    }, 0 )
   }
  },
  closeUserLookup : function(){
    this.performCancelAction();
 },
 checkForToolTip : function(element,value){
  var offsetWidth = element.offsetWidth;
  if(element.scrollWidth > offsetWidth || offsetWidth === parseInt(getComputedStyle(element).maxWidth)){
    element.setAttribute("lt-prop-title", value);//no i18n
  }
  else {
    if(element.getAttribute('lt-prop-title')!=null){
      element.removeAttribute("lt-prop-title");//no i18n
    }
  }
},
  rowMouseOver : function(self){
    /* This method will be executed during selected records row mouse hover */
    if(this.getMethods('onRowMouseOver')){
      this.executeMethod('onRowMouseOver', self); //NO I18n
    }
  },
  rowMouseOut : function(self){
    /* This method will be executed during selected records row mouse out */
    if(this.getMethods('onRowMouseOut')){
      this.executeMethod('onRowMouseOut', self); //NO I18n
    }
  }
 },
 methods : {
   onInputFocus : function(){
     this.inputFocus = true;
   },
   onInputBlur : function(){
     this.inputFocus = false;
   },
  showFilterDropdown : function(eve,comp){
    this.setData("cxPropPreventKeyDown",true);//no i18n
    comp.childComp.classList.add("userLookupFilterDropDown");//no i18n
  },
  hideFilterDropdown : function(){
    this.setData("cxPropPreventKeyDown",false);//no i18n
  },
  bodyShow : function(){
    var $lyteModalContent;
   document.addEventListener("keydown", this._keydown);
   this.$node.querySelector("lyte-modal").classList.add("currentOpenedModal");//NO I18n
   $lyteModalContent = this.bodydrop.querySelector('lyte-modal-content');
  //  this.bodydrop.querySelector('lyte-modal-content').style.height="";
   $lyteModalContent.style.height="";
   if(this.bodydrop.querySelector("lyte-input input")!=null){
    setTimeout(function(){this.bodydrop.querySelector("lyte-input").focus();}.bind(this), 500); //NO I18n
   }
   this.lookupOpen.call(this);
   /**
   * When the component is shown in the view this method will be called. 
   * @functionType methodCall onBodyShow
   */
   if(this.getMethods('onBodyShow')){ //NO I18n
    this.executeMethod('onBodyShow'); //NO I18n
   }
   if(this.data.cxPropShowSuggestion && this.getData("cxPropType")=="single"){
     if(this.data.cxPropSuggestion.users.length){
       this.setData('suggestedUsers' , this.data.cxPropSuggestion.users );  //NO I18n
       var selectedId = this.data.cxPropSelectedId
       if(selectedId){
         var sUser = this.data.suggestedUsers.find(function(x){ return x.id === selectedId});
         if(sUser){
           this.onOpenSuggestionCheck = true;
           Lyte.objectUtils(sUser , "add" , "lookup_selected_val" , true); //NO i18n
           this.onOpenSuggestionCheck = false;
         }else{
           var preSel = this.data.suggestedUsers.find(function(user){
             return user.lookup_selected_val;
           });
           if(preSel){
             Lyte.objectUtils(preSel , "add" , "lookup_selected_val" , false); //NO i18n
           }
        }
        var systemUser = this.data.systemData.find(function(user){
          return user.id === selectedId;
        });
        if(!systemUser){
          var sysPreSel = this.data.systemData.find(function(user){
            return user.lookup_selected_val;
          });
          if(sysPreSel){
            Lyte.objectUtils(sysPreSel , "add" , "lookup_selected_val" , false); //NO i18n
          }
        }
       }
     }
   }
   _cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
   $lyteModalContent.style.width = $lyteModalContent.clientWidth;
  },
  bodyBeforeClose : function(){
    var closeLookup;
    /**
     * Before component is closed from the view this method will be called. 
     * @functionType methodCall onBeforeLookupClose
     */
    // /**
		// 		 * This callback is fired before component is closed from the view .
		// 		 * @method onBeforeLookupClose
		// 		 * @author mahalakshmi.m
		// 		 * @version 1.0.0
		// 		 */
    if(this.getMethods('onBeforeLookupClose')){ //NO I18n
     closeLookup=this.executeMethod('onBeforeLookupClose',this.assignClose); //NO I18n
    }
    if(closeLookup!=false){
      this.bodydrop.querySelector('#cruxUserLookupTable').scrollTable(0,0); //NO I18n
      if(!this.assignClose){
        if(this.data.cxPropReqForSelected){
          this.setData("cxPropSelectedCount", this.originalSelectedCount);
        }
        this.internalSelection = true;
        this.setData("cxPropSelectedIds",this.defaultSelectedIds); //NO I18n
        this.internalSelection = false;
      }
      else{
        if(this.data.cxPropReqForSelected){
          this.originalSelectedCount = this.data.cxPropSelectedCount;
        }
        this.assignClose = false;
      }
     this.onModalClose = true;
     this.setSelectedFilterValue.call(this);
     if(!this.localClose){
    this.preventWrongClose = true;
     }
     if(this.getData("cxPropShow")){
       this.$node.cxProp('show',false); //NO I18n
     }
    }
    else{
       if(!this.getData("cxPropShow")){
         this.preventShowCalling = true;
         this.setData("cxPropShow",true); //NO I18n
       }
       this.localClose = false;
       this.assignClose = false;
      this.onModalClose = false;
     return false;
    }
   // }
  },
  bodyClose : function(){
   this.$node.querySelector("lyte-modal").classList.remove("currentOpenedModal");//NO I18n
   document.removeEventListener("keydown", this._keydown);
   this.userLookupClose();
   /**
   * When the component is closed from the view this method will be called. 
   * @functionType methodCall onLookupClose
   */
    // /**
    //  * This callback is fired when the component is closed.
    //  * @method onLookupClose
    //  * @author mahalakshmi.m
    //  * @version 1.0.0
    //  */
   if(this.getMethods('onLookupClose')){ //NO I18n
    this.executeMethod('onLookupClose'); //NO I18n
   }
  },
  bodyBeforeShow : function(){
   this.bodydrop = this.modalEle.component.childComp; //NO I18n
   this.bodydrop = this.$node.querySelector('lyte-modal').component.childComp; //NO I18n
   this.bodybody = this.bodydrop.querySelector('div.lyteTableScroll'); //NO I18n
   this.userdrop = this.bodydrop.querySelector('lyte-dropdown'); //NO I18n
   this.bodybox = this.bodydrop.querySelector('lyte-drop-box'); //NO I18n
   if(this.userdrop) {
    this.userbody = this.userdrop.querySelector('lyte-drop-body'); //NO I18n
    this.userbox = this.userdrop.querySelector('lyte-drop-box'); //NO I18n
   }
  /**
   * Before component is shown in the view this method will be called. 
   * @functionType methodCall onBodyBeforeShow
   */
   if(this.getMethods('onBodyBeforeShow')){ //NO I18n
    return this.executeMethod('onBodyBeforeShow'); //NO I18n
   }
  },
  radiobuttonChecked : function(item,input){
    if(this.data.cxPropType=='single'){
      this.setData('displaySingleUser',item); //NO I18n
      this.setData("showSelectedFooter",true);
    }
    this.setData("buttonAccessibility",false);
    if(this.onOpenSuggestionCheck){
      this.onOpenSuggestionCheck = false;
      return;
   }
   var bool = input._callee.classList.contains("suggestionRadioButton"); //NO I18n
   this.localClose = true;
   var object=[] , ind = input.value;
   object.push(bool ? this.getData('suggestedUsers')[ind] : this.getData('systemData')[ind]);
   this.setData("totalAddedObjects",object);//NO I18n
   this.setAlternateRadioVal(bool ,object[0]);
   this.assignClose = true;
  
  /**
   * When ever the radio button is clicked this will be called. 
   * @functionType methodCall onRadiobuttonClicked
   * @param {object} item - The current interacted item
   */
   if(this.getMethods('onRadiobuttonClicked')){ //NO I18n
    this.executeMethod('onRadiobuttonClicked',this.getData('systemData')[input.value]); //NO I18n
   }

  },
  radiobuttonOnBeforeChecked : async function(input){
    // this.data.systemData.filter(function(item){
    //   if(item.lookup_selected_val==true){
    //     console.log(item)
    //   this.setData('value',item.id)
    //   }
    // })
    // if(this.getData("preventCall")!=true){
    var preventradiobuttonClick=true;
    var bool = input._callee.classList.contains("suggestionRadioButton"); //NO I18n
    if(!this.preventCallBacks){
      if(this.getMethods('beforeRadiobuttonClicked')){ //NO I18n
        preventradiobuttonClick=await this.executeMethod('beforeRadiobuttonClicked',bool ? this.getData('suggestedUsers')[input.value] : this.getData('systemData')[input.value]); //NO I18n
      }
    }
    if(preventradiobuttonClick || preventradiobuttonClick==undefined || preventradiobuttonClick==null){
        if(this.getMethods('onBeforeAssign')){ //NO I18n
         var temp=bool ? this.getData('suggestedUsers')[input.value] : this.getData('systemData')[input.value];
         return this.executeMethod('onBeforeAssign', temp); //NO I18n
        }
      }
      else{
        return false;
      }

  },
  allCheckboxOnBeforeChecked : async function(){
    if(!this.preventAction){
    var preventAllCheckboxSelection=true;
    if(this.getMethods('beforeAllCheckboxChecked')){ //NO I18n
    /**
     * Before the all select checkbox is checked this method will be called. 
     * @functionType methodCall beforeAllCheckboxChecked
     */
      preventAllCheckboxSelection= await this.executeMethod('beforeAllCheckboxChecked'); //NO I18n
    }
    if(preventAllCheckboxSelection || preventAllCheckboxSelection==undefined || preventAllCheckboxSelection==null){
   if( this.data.cxPropMaxLimit != 0 && (this.getData("cxPropSelectedIds").length >= this.getData("cxPropMaxLimit")) ){ //NO I18n
    this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n
    this.cxPropMaxLimitMessageBox();
    return false;
   }
  }
  else{
    return false;
  }
}
  },
  allCheckboxChecked : async function(){
   if(!this.preventAction){
    if(this.selectingFlag==true){
     var checkBoxes;
     if(!this.getData('selectedList')){
       checkBoxes=this.getData("systemData"); //NO I18n
     }
     else{
      checkBoxes=this.getData("addedItems"); //NO I18n
     }
     var checkBoxesLength=checkBoxes.length;
     this.setData("preventAllCallBacks",true); //NO I18n
     for(var i=0;i<checkBoxesLength;i++){
      if( this.data.cxPropMaxLimit === 0 || ( (this.getData("cxPropSelectedIds").length < this.getData("cxPropMaxLimit")) || this.data.cxPropMaxLimit === 0) ){ //NO I18n
        var preventCheckboxChecked=true;
        if(this.getMethods('beforeCheckboxChecked')){ //NO I18n
          var preventCheckboxChecked;
          if(!this.getData('selectedList')){
         preventCheckboxChecked=await this.executeMethod('beforeCheckboxChecked',this.getData('systemData')[i]); //NO I18n
       }
       else{
         preventCheckboxChecked=await this.executeMethod('beforeCheckboxChecked',this.getData('addedItems')[i]); //NO I18n
       }
        }
        if(preventCheckboxChecked || preventCheckboxChecked==undefined || preventCheckboxChecked==null){
          this.preventCallBacks = true;
          this.preventCheckAllSelection = true;
          if(!this.getData('selectedList')){
            Lyte.Component.set(this.getData('systemData')[i],'lookup_selected_val',true); //No I18N
            let add_data = this.removeModifiedValue(this.getData('systemData')[i]);
	          if(add_data){
              this.dataModified.added_ids.push(this.getData('systemData')[i]);
            }

          }else{

            Lyte.Component.set(this.getData('addedItems')[i],'lookup_selected_val',true); //No I18N
            let add_data = this.removeModifiedValue(this.getData('addedItems')[i]);
	          if(add_data){
              this.dataModified.added_ids.push(this.getData('addedItems')[i]);
            }
          }
       // checkBoxes[i].parentElement.parentElement.ltProp('checked',true); //NO I18n
     }
      }
      else{
        if(!this.getData('selectedList') && this.data.cxPropMaxLimit != 0){
         this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n
         this.cxPropMaxLimitMessageBox();
        }
       break;
      }
     }
    this.preventCheckAllSelection = false;
     var self = this;
     setTimeout(function() {
        self.checkAllSelection();
     }, 0)

     this.preventCallBacks = false;
     this.setData("preventAllCallBacks",false); //NO I18n
    }
    else{
     this.selectingFlag = true;
    }
    if(this.getData("selectedList")){
      this.selectedTotalAddedObjects = this.getData("totalAddedObjects").slice(); //No I18N
    }
    /**
     * When the all select checkbox is checked this method will be called. 
     * @functionType methodCall onAllCheckboxChecked
     */
    if(this.getMethods('onAllCheckboxChecked')){ //NO I18n
     this.executeMethod('onAllCheckboxChecked'); //NO I18n
    }
   }
  },
  allCheckboxbeforeUnchecked : async function(inp , comp , event){
    if(this.getData("preventAllCheckboxUnchecked")){
    var preventAllCheckboxUnSelection=true;
    if(this.getMethods('beforeAllCheckboxUnChecked')){ //NO I18n
    /**
     * Before the all select checkbox is unchecked this method will be called. 
     * @functionType methodCall beforeAllCheckboxUnChecked
     */
    preventAllCheckboxUnSelection=await this.executeMethod('beforeAllCheckboxUnChecked'); //NO I18n
    }
    if(preventAllCheckboxUnSelection==false){
      return false;
    }else{
      if(this.getData('cxPropFilter')=="SelectedUsers"){
        this.onInDirectChange = !event || Object.keys(event).length==0;
      }
    }
  }else{
    this.setData('preventAllCheckboxUnchecked',true);//NO I18n
  }
  },
  allCheckboxUnchecked : async function(){
   if(!this.preventAllSelection){
   if(!this.preventAction){
    if(!this.getData("selectedList")){
      var sys=this.getData("systemData")//NO I18n
      var sysLen=sys.length;
      var sel=this.getData("cxPropSelectedIds"); //NO I18n
      var selLen=sel.length;
     for(var r=0;r<sysLen;r++){
       for(var e=0;e<selLen;e++){
         if(sys[r][this.getData("cxPropPrimaryKey")]==sel[e]){
           this.internalSelection = true;
           Lyte.arrayUtils(sel,'removeAt',e,1);//NO I18n
           let add_data = this.removeModifiedValue(sys[r]);
				   if(add_data){
            this.dataModified.removed_ids.push(sys[r]);
           }
           this.internalSelection = false;
           selLen=sel.length;
         }
       }
     }
     var toot=this.getData("totalAddedObjects");//NO I18N
     var tootLen=toot.length;
     for(var t=0;t<sysLen;t++){
       for(var y=0;y<tootLen;y++){
         if(sys[t][this.getData("cxPropPrimaryKey")]==toot[y][this.getData("cxPropPrimaryKey")]){
           Lyte.arrayUtils(toot,'removeAt',y,1);//NO I18n
           tootLen=toot.length;
         }
       }
     }
    }else{
      this.selectedTotalAddedObjects = [];
      this.internalSelection = true;
      this.setData("cxPropSelectedIds",[]); //NO I18n
      this.internalSelection = false;
    }
    this.setData("cxPropSelectedIdsLength",this.getData("cxPropSelectedIds").length); //NO I18n
    var checkBoxes;
    if(!this.getData('selectedList')){
      checkBoxes=this.getData("systemData"); //NO I18n
    }
    else{
     checkBoxes=this.getData("addedItems"); //NO I18n
    }
    var checkBoxesLength=checkBoxes.length;
    this.setData("preventAllCallBacks",true); //NO I18n
    for(var i=0;i<checkBoxesLength;i++){
      var preventCheckboxUnSelection=true;
      if(this.getMethods('beforeCheckboxUnChecked')){ //NO I18n
        var preventCheckboxUnSelection
         if(!this.getData('selectedList')){
      preventCheckboxUnSelection =await this.executeMethod('beforeCheckboxUnChecked',this.getData('systemData')[i]); //NO I18n
    }else{
      preventCheckboxUnSelection =await this.executeMethod('beforeCheckboxUnChecked',this.getData('addedItems')[i]); //NO I18n
    }
      }
      if(preventCheckboxUnSelection || preventCheckboxUnSelection==undefined || preventCheckboxUnSelection==null){
        this.preventCallBacks = true;
        this.preventCheckAllSelection = true;
      if(!this.getData('selectedList')){
        Lyte.Component.set(this.getData('systemData')[i],'lookup_selected_val',false); //No I18N
      }else{
        Lyte.Component.set(this.getData('addedItems')[i],'lookup_selected_val',false); //No I18N
      }
   }
    }
    this.preventCheckAllSelection = false;
      var self = this;
      setTimeout(function() {
         self.checkAllSelection();
      }, 0)

    this.preventCallBacks = false;
    this.setData("preventAllCallBacks",false); //NO I18n
    if(!this.onInDirectChange){
      this.selectedModalSelectedIds = 0;
    }

   }
   /**
   * When the all select checkbox is unchecked this method will be called. 
   * @functionType methodCall onAllCheckboxUnChecked
   */
   if(this.getMethods('onAllCheckboxUnChecked')){ //NO I18n
    this.executeMethod('onAllCheckboxUnChecked'); //NO I18n
   }
 }
  },
  checkboxChecked : function(input){
    if(this.getData("preventCall")!=true){
    var primaryKey=this.getData("cxPropPrimaryKey"); //NO I18n
    var temp;
    if(!this.getData("cxPropReqForSelected")){
    if(this.getData("cxPropFilter")!="SelectedUsers"){
     temp=this.getData('systemData')[input.value];
    }
    else{
     temp=this.getData('addedItems')[input.value];
     this.selectedModalSelectedIds += 1;
    }
   this.internalSelection = true;
   Lyte.arrayUtils(this.getData("cxPropSelectedIds"), 'push', temp[primaryKey]);//NO I18n
   let add_data = this.removeModifiedValue(temp);
	 if(add_data){
    this.dataModified.added_ids.push(temp);
   }
   this.internalSelection = false;
   this.setData("cxPropSelectedIdsLength",this.getData("cxPropSelectedIds").length); //NO I18n
   Lyte.arrayUtils(this.getData('totalAddedObjects'),'unshift',temp); //NO I18n
   this.setData("cxPropSelectedCount" , this.data.totalAddedObjects.length); //NO I18n
   this.updateSelectedCountMsg();
   if(this.getData("selectedList")){
     this.selectedTotalAddedObjects.unshift(temp);
   }
 }else{
  this.setData("cxPropSelectedCount" , this.getData("cxPropSelectedCount") + 1); //NO I18n
  this.updateSelectedCountMsg();
  this.handleSelection("checked", input.value); //NO I18N
 }
/**
 * When any item checkbox is checked this methods wil be invoked. 
 * @functionType methodCall onCheckboxChecked
 * @param {object} item - The item from the list being checked.
 */
 if(this.getMethods('onCheckboxChecked')){ //NO I18n
  this.executeMethod('onCheckboxChecked',temp); //NO I18n
 }
 if(this.data.cxPropShowAllselectCheckbox){
 if(!this.preventCheckAllSelection){
   var self = this;
   setTimeout(function() {
      self.checkAllSelection();
   }, 0)
 }
 }
 }
  },
  checkboxUnchecked : function(input,checkBoxComp){
    if(this.getData("preventCall")!=true){
      var temp;
      if(!this.getData("cxPropReqForSelected")){
        if(this.getData('cxPropFilter')==="SelectedUsers"){
         temp=this.getData('addedItems')[input.value];
        }
        else{
         temp=this.getData('systemData')[input.value];
        }
      }
      this.unSelectRecordFunc(input);
   /**
   * When any item checkbox is unchecked this methods wil be invoked. 
   * @functionType methodCall onCheckboxUnChecked
   * @param {object} item - The item from the list being unchecked.
   */
   if(this.getMethods('onCheckboxUnChecked')){ //NO I18n
    this.executeMethod('onCheckboxUnChecked',temp); //NO I18n
   }

   if(!this.preventCheckAllSelection){
     var self = this;
     setTimeout(function() {
        self.checkAllSelection();
     }, 0)
   }
 }
  },
  checkboxOnChanged : function(input,checkBoxComp){
    if(this.getData("preventCall")!=true){
    if(!this.getData("cxPropFooterYield")){
    if(!this.filterChange){
      this.setData("buttonAccessibility",false);//NO I18n
    }
   }
   /**
   * When any item checkbox is unchecked/checked this methods wil be invoked. 
   * @functionType methodCall onCheckboxChanged
   * @param {object} item - The item from the list being unchecked/checked.
   */
   if(this.getMethods('onCheckboxChanged')){ //NO I18n
    this.executeMethod('onCheckboxChanged',this.getData('systemData')[input.value]); //NO I18n
   }
  }
  },
  checkboxOnBeforeChecked : async function(input){
     if(this.getData("preventCall")!=true){
      var maxLimit = this.getData("cxPropMaxLimit");//NO I18n
      var preventCheckboxChecked=true;
      if(!this.preventCallBacks){
        var temp;
        if(this.getData("cxPropFilter")!="SelectedUsers"){
         temp=this.getData('systemData')[input.value];
        }
        else{
         temp=this.getData('addedItems')[input.value];
        }
      if(this.getMethods('beforeCheckboxChecked')){ //NO I18n
      preventCheckboxChecked=await this.executeMethod('beforeCheckboxChecked',temp); //NO I18n
      }
    }
      if(preventCheckboxChecked || preventCheckboxChecked==undefined || preventCheckboxChecked==null){
        if(!this.getData("cxPropReqForSelected")){
          if( this.data.cxPropMaxLimit != 0 && (this.getData("totalAddedObjects").length==this.getData("cxPropMaxLimit")) ){ //NO I18n
           this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n
           this.cxPropMaxLimitMessageBox();
           return false;
          }
        }else if( this.data.cxPropMaxLimit != 0 && this.newelySelected.length === this.data.cxPropMaxLimit  &&  !this.data.cxPropSelectedList){
          this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n
          this.cxPropMaxLimitMessageBox();
          return false;
        }
       }
       else{
         return false;
       }
       }
  },
  checkboxOnBeforeUnChecked : async function(input){
    if(this.getData("preventCall")!=true){
    var preventCheckboxUnSelection=true;
    if(!this.preventCallBacks){
      var temp;
      if(this.getData("cxPropFilter")!="SelectedUsers"){
       temp=this.getData('systemData')[input.value];
      }
      else{
       temp=this.getData('addedItems')[input.value];
      }
    if(this.getMethods('beforeCheckboxUnChecked')){ //NO I18n
      preventCheckboxUnSelection=await this.executeMethod('beforeCheckboxUnChecked',temp); //NO I18n
    }
  }
    if(preventCheckboxUnSelection == false){
      return false;
    } else if(this.data.cxPropMaxLimit != 0 &&  this.data.cxPropReqForSelected && this.newelyUnSelected.length === this.data.cxPropMaxLimit && this.data.cxPropSelectedList){
      this.setData("cxPropMaxLimitMsg", this.getModalMaxLimitMsgValue()); //NO I18n
      this.cxPropMaxLimitMessageBox();
      return false;
    }
  }
  },
  allCheckboxOnChanged : function(input,checkBoxComp){
    /**
     * When the all select checkbox state is changed this is invoked
     * @functionType methodCall onAllCheckboxChanged
     */
    if(this.getMethods('onAllCheckboxChanged')){ //NO I18n
     this.executeMethod('onAllCheckboxChanged',this.getData('systemData')[input.value]); //NO I18n
    }
  },
  radiobuttonOnChanged : function(input,checkBoxComp){
    if(this.suggestionCheck){
      this.suggestionCheck = false;
      return;
    }
    var bool = input._callee.classList.contains("suggestionRadioButton"); //NO I18n
    if(this.data.cxPropShowSuggestion && this.data.cxPropType === 'single'){
      if(bool){
        var preSel = this.data.suggestedUsers[input.value];
        this.setData("preventFocus" , false);
      }
    }
    /**
     * When the radiobutton state is changed this is invoked
     * @functionType methodCall onRadiobuttonChanged
     * @param {object} item - The item from the list being interacted with
     */
    if(this.getMethods('onRadiobuttonChanged')){ //NO I18n
     this.executeMethod('onRadiobuttonChanged',bool ? this.getData('suggestedUsers')[input.value] : this.getData('systemData')[input.value]); //NO I18n
    }
  },
  userSelected :  function(event, filterName, filterDropdownComp /*, filterDropdownComp */){
   //if(this.getData("cxPropFilterYield")) { //NO I18n
    // /**
    //  * This callback is fired when each time when there is an change in the filter option.
    //  * @method onLookupClose
    //  * @author mahalakshmi.m
    //  * @version 1.0.0
    //  */
    if(this.getMethods('onFilterOptionSelected')){ //NO I18n
     this.executeMethod('onFilterOptionSelected', event, filterName, filterDropdownComp); //NO I18n
    }
   this.setData('cxPropFilter', filterName); //NO I18n
  }
},
resetUserCache : function(obj){
  if(obj.newValue !== obj.oldValue){
     store.clearCachedQuery(this.getData('cxPropNetworkData').cxPropModuleName, this.queryParams.call(this)); //NO I18n
  }
}.observes('cxPropCriteria'), //NO I18n
setAlternateRadioVal : function(bool , selData){
    var trueData, falseData  , sugUsers = this.data.suggestedUsers , sysUsers = this.data.systemData;
    if(bool){
      trueData = sysUsers.find(function(val){return selData.id === val.id});
      if(!trueData){
        falseData = sysUsers.find(function(item){return item.lookup_selected_val});
      }
    }else{
      trueData = sugUsers.find(function(val){return selData.id === val.id});
      if(!trueData){
        falseData = sugUsers.find(function(item){return item.lookup_selected_val});
      }
    }
    if(trueData){
      this.setData("preventFocus" , true);//No I18N
      Lyte.Component.set(trueData,'lookup_selected_val',true); //No I18N
      this.setData("preventFocus" , false);//No I18N
    }else if(falseData){
      Lyte.Component.set(falseData,'lookup_selected_val',false); //No I18N
    }
 }
}, { "mixins": ["crux-user-utils","crux-element-validation", "crux-aria-table-mixin", "crux-lookup-mixin", "crux-aria-lookup-mixin"], 'alias': 'crm-user-lookup' }); //NO I18n

/**
 * @syntax nonYielded
 * <crux-user-lookup cx-prop-header='[{"systemValue":"full_name","displayValue":"User Name","yield":false,"isSticky":true},{"systemValue":"role","displayValue":"Role","yield":false,"isSticky":false},{"systemValue":"email","displayValue":"Email","yield":false,"isSticky":false},{"systemValue":"profile","displayValue":"Profile","yield":false,"isSticky":false}]' cx-prop-footer-buttons-literals='{"cancel":"Cancel","save":"Assign"}'></crux-user-lookup>
 */
