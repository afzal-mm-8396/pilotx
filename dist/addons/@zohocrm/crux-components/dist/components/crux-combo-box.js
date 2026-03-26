/**
 * @component crux-combo-box
 * @author silambarasan.rt
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-combo-box", {
_template:"<template tag-name=\"crux-combo-box\"> <lyte-alert lt-prop-wrapper-class=\"sampleAlert\" lt-prop-yield=\"true\" lt-prop=\"{&quot;buttons&quot; : [{&quot;type&quot;:&quot;accept&quot;,&quot;text&quot;:&quot;Delete&quot;,&quot;appearance&quot;:&quot;failure&quot;},{&quot;type&quot;:&quot;reject&quot;,&quot;text&quot;:&quot;Cancel&quot;,&quot;appearance&quot;:&quot;default&quot;}]}\" lt-prop-show=\"{{deleteAlertShow}}\" on-accept=\"{{method('clearData')}}\"> <template is=\"registerYield\" yield-name=\"alert\"> <lyte-alert-content> Changes made have not been saved. Do you want to proceed ? </lyte-alert-content> </template> </lyte-alert> <lyte-modal lt-prop-allow-multiple=\"{{cxPropAllowMultiple}}\" lt-prop-transition=\"{{cxPropTransition}}\" lt-prop-offset=\"{{cxPropOffset}}\" lt-prop-width=\"{{cxPropWidth}}\" lt-prop-show-close-button=\"false\" on-before-show=\"{{method('beforComboBoxOpen')}}\" on-show=\"{{method('onComboxBoxOpen')}}\" on-before-close=\"{{method('BeforeComboBoxClose')}}\" on-close=\"{{method('onComboBoxClosing')}}\" lt-prop-wrapper-class=\"cxBoxModal {{if(cxPropNeedRecipient,'cxComboAdditionalRecipientPresent','')}} {{if(expHandlers(cxPropHeaderMsg,'!'),'cxComboboxWithoutHeader','')}}\" lt-prop-height=\"{{cxPropHeight}}\" lt-prop-max-height=\"{{cxPropMaxHeight}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <template is=\"if\" value=\"{{expHandlers(cxPropHeaderYield,'!')}}\"><template case=\"true\"> <span class=\"cxComboxBoxHeader comboxBoxHeader\" data-zcqa=\"combo_box_header_msg\">{{cxPropHeaderMsg}}</span> <template is=\"if\" value=\"{{cxPropShowUserOnly}}\"><template case=\"true\"> <span class=\"cxComboHeaderInfo\"> <span class=\"cxComboboxHeaderInfoIcon\"></span> <span class=\"cxComboHeaderLimitMsg\">{{cxPropMaxLimitMsg}}</span> </span> </template></template> <span data-zcqa=\"combo_box_close\" class=\"comboboxCloseIcon lyteModalClose\" onclick=\"{{action('cancelData')}}\"></span> </template><template case=\"false\"> <lyte-yield yield-name=\"comboBoxHeaderYield\"></lyte-yield> </template></template> </lyte-modal-header> <lyte-modal-content class=\"cxComboBoxContent {{if(cxPropShowUserOnly,'cxComboboxUserOnlyModalContent')}}\"> <div class=\"cxFlex cxComboBoxContentInner combo-box-content\"> <div class=\"cxUserSelectionPart user-selection-part\"> <div class=\"cxFlex cxComboLeftColHeadSection\"> <div class=\"user-selection-head cxComboboxSectionHeading crm-font-bold\">{{cruxGetI18n('crm.label.available')}}</div> <template is=\"if\" value=\"{{cxPropShowUserOnly}}\"><template case=\"true\"> <lyte-dropdown class=\"cxComboBoxFilterDD mL10\" data-zcqa=\"combo_box_type\" lt-prop-yield=\"true\" lt-prop-tabindex=\"1\" lt-prop-selected=\"{{setSelectedFilterOption}}\" on-option-selected=\"{{method('SelectedFilter')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"if\" value=\"{{expHandlers(cxPropDropdownYield,'!')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropFilterOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"combo_box_type_{{item[cxPropFilterSystemValue]}}\" data-value=\"{{item[cxPropFilterSystemValue]}}\">{{item[cxPropFilterUserValue]}}</lyte-drop-item> </template> </template><template case=\"false\"> <lyte-yield yield-name=\"comboBoxDropdown\"></lyte-yield> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <div class=\"cxUserSelectionContent user-selection-content\"> <div class=\"cxUserDDSearchWrapper dropdown-search-wrapper\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowUserOnly,'&amp;&amp;',subFilterOption.length)}}\"><template case=\"true\"> <div class=\"cxUserSelectionOption user-selection-option\"> <crux-dropdown id=\"cxComboSubFilterDD\" class=\"cxComboBoxFilterDD\" data-zcqa=\"combo_box_sub_type\" cx-prop-selected=\"{{subFilterOption[0].id}}\" on-option-select=\"{{method('SelectedSubFilter',this)}}\" cx-prop-options=\"{{subFilterOption}}\" cx-prop-maxsearch=\"10\" cx-prop-user-value=\"{{currentFilterValue.nameSelector}}\" cx-prop-system-value=\"id\"></crux-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropShowUserOnly,'!')}}\"><template case=\"true\"> <div class=\"cxUserSelectionOption user-selection-option\"> <lyte-dropdown class=\"cxComboBoxFilterDD\" data-zcqa=\"combo_box_type\" lt-prop-yield=\"true\" lt-prop-tabindex=\"1\" lt-prop-selected=\"{{setSelectedFilterOption}}\" on-option-selected=\"{{method('SelectedFilter')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"if\" value=\"{{expHandlers(cxPropDropdownYield,'!')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropFilterOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"combo_box_type_{{item[cxPropFilterSystemValue]}}\" data-value=\"{{item[cxPropFilterSystemValue]}}\">{{item[cxPropFilterUserValue]}}</lyte-drop-item> </template> </template><template case=\"false\"> <lyte-yield yield-name=\"comboBoxDropdown\"></lyte-yield> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropShowUserOnly,'!'),'||',expHandlers(cxPropShowUserOnly,'&amp;&amp;',expHandlers(subFilterOption.length,'||',expHandlers(currentFilterValue.model_name,'==','user'))))}}\"><template case=\"true\"> <div class=\"cxUserSearch user-search\"> <lyte-input class=\"cxW100Per cxComboBoxSearch\" lt-prop-class=\"cxComboBoxSearchInput\" data-zcqa=\"combo_box_search\" lt-prop-disabled=\"{{isSearchDisabled}}\" lt-prop-type=\"search\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" oninput=\"{{action('searchKeyup',event)}}\"></lyte-input> <span data-zcqa=\"combo_box_search_clear\" style=\"{{if(cxPropInputValue,if(searchLoading,'display: none','display: block'),'display: none')}}\" class=\"clear-search\" onclick=\"{{action('clearInputField')}}\"></span> <span class=\"cxComboSearchLoader search-loader\" style=\"{{if(cxPropInputValue,if(searchLoading,'display: block','display: none'),'display: none')}}\"></span> </div> </template></template> </div> <div class=\"cxComboUserWrapper user-lists-container-wrapper\"> <div class=\"clearFix user-lists-container\" onscroll=\"{{action('tableScroll',event)}}\"> <div class=\"search-loader filter-switching-loader\" style=\"{{if(filterChange,'display:block','display:none')}};\"></div> <div class=\"{{currentFilterValue.model_name}}-lists\"> <ul class=\"p0 m0 cxSearch-loaderContent \" style=\"{{if(filterChange,'display:none','')}};\"> <template is=\"for\" items=\"{{displayContainerData}}\" item=\"item\" index=\"index\"> <li data-zcqa=\"combo-box_list_{{item[containerDataObject.nameSelector]}}\" class=\"cxComboUserList user-list\" onclick=\"{{action('addToList',event,index)}}\"> <div class=\"cxComboUserDetail user-detail\"> <template is=\"if\" value=\"{{expHandlers(containerDataObject.imageSelector,'!=',undefined)}}\"><template case=\"true\"> <div class=\"dIB cxVam user-image mR5\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(item[containerDataObject.imageSelector],'==',undefined),'||',expHandlers(item[containerDataObject.imageSelector],'==',null)),'||',expHandlers(item[containerDataObject.imageSelector].length,'==',0))}}\"><template case=\"true\"> <span class=\"combo-box-nophoto\"></span> </template><template case=\"false\"> <img class=\"cxComboBoxImg\" src=\"{{item[containerDataObject.imageSelector]}}\"> </template></template> </div> </template></template> <div class=\"cxComboUserDescWrap {{if(ifEquals(containerDataObject.imageSelector,undefined),'','cxComboUserDesc user-desc')}}\"> <template is=\"if\" value=\"{{expHandlers(containerDataObject.nameSelector,'!=',undefined)}}\"><template case=\"true\"> <div data-zcqa=\"cxComboUserNameSel\" class=\"cxComboUserNameSelector\" onmouseover=\"{{action('checkForToolTip',this,item[containerDataObject.nameSelector],item)}}\">{{item[containerDataObject.nameSelector]}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(containerDataObject.descriptionSelector,'!=',undefined)}}\"><template case=\"true\"> <div data-zcqa=\"cxComboUserDescSel\" class=\"cxComboUserDescSelector\" onmouseover=\"{{action('checkForToolTip',this,item[containerDataObject.descriptionSelector])}}\">{{item[containerDataObject.descriptionSelector]}}</div> </template></template> </div> </div> <div class=\"user-add-option\"> <template is=\"if\" value=\"{{expHandlers(selectedUsersList,'&amp;&amp;',selectedUsersList[item.id])}}\"><template case=\"true\"> <span class=\"cxComboBoxAddedLabel\">Added</span> </template><template case=\"false\"> <lyte-button lt-prop-appearance=\"primary\" lt-prop-class=\"cxComboBoxAddBtn\" lt-prop-size=\"small\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.add')}} </template> </lyte-button> </template></template> </div> </li> </template><template is=\"if\" value=\"{{expHandlers(displayContainerData.length,'==',0)}}\"><template case=\"true\"> <li class=\"cxComboBoxEmptyMessage\">{{currentFilterValue.cxPropEmptyDataMsg}}</li> </template></template> </ul> <div class=\"cxComboSearchLoader search-loader mAuto\" style=\"{{if(scrollLoading,'display:block','display:none')}};\"> </div> </div> </div> </div> </div> </div> <div class=\"user-selected-part cxUserSelectionPart\"> <div class=\"cxComboUserSelectedHeaderContentWrap\"> <div class=\"user-selected-head cxComboboxSectionHeading\">{{cruxGetI18n('crm.label.selected')}}</div> <template is=\"if\" value=\"{{cxPropTotalRecipientCount.needed}}\"><template case=\"true\"> <div class=\"cxComboboxTotalRecipientCount\">{{cxPropTotalRecipientCount.count}} / {{cxPropTotalRecipientCount.total}} {{cruxGetI18n('crm.workflow.select.recipients')}}</div> </template></template> </div> <div class=\"cxComboUserSelectedContent user-selected-content\"> <div class=\"no-results-found {{if(ifEquals(totalSelectedItemsCount,0),'no-user-selected-div','emptySelected')}}\"> {{cxPropEmptySelectedMsg}} </div> <div class=\"cxComboUserSelectedListContainer selected-user-list-container\"> <lyte-accordion data-zcqa=\"combo_box_selected_type\" lt-prop-exclusive=\"false\" lt-prop-dynamic=\"true\" on-before-close=\"{{method('preventClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"for\" items=\"{{localOptionModels}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(item.selectedItems.length,'!=',0)}}\"><template case=\"true\"> <lyte-accordion-item data-zcqa=\"combo_box_selected_type_{{item.name}}\" class=\"lyteAccordionActive cxComboUserSelectedListSection selected-user-list-section {{if(ifEquals(cruxArithResult(localOptionModels.length,'-',1),index),'selected-user-list-last-section','')}}\"> <lyte-accordion-header class=\"cxComboboxheader op5_op1_parent\"> <div class=\"dIB cxVam selected-user-type-detail\"> <span class=\"dIB cxVam user-type cxComboboxSelectedHead\">{{item.name}}</span> <span class=\"seperator dIB cxVam\">-</span> <span data-zcqa=\"combo_box_{{item.name}}_count\" class=\"selected-user-count dIB cxVam \"> <template is=\"if\" value=\"{{expHandlers(cxPropShowUserOnly,'&amp;&amp;',expHandlers(item.prefix,'==',&quot;U&quot;))}}\"><template case=\"true\"> {{item.selectedItems[0].users.length}} </template><template case=\"false\"> {{item.selectedItems.length}} </template></template> </span> </div> <lyte-yield yield-name=\"{{concat('accordionItemHeaderRightYield')}}\" cx-current-option-model=\"{{item}}\"></lyte-yield> <lyte-icon class=\"lyteAccordionArrow op5_op1_child\"></lyte-icon> </lyte-accordion-header> <lyte-accordion-body class=\"cxComboboxAccordionBody\"> <template is=\"if\" value=\"{{cxPropShowUserOnly}}\"><template case=\"true\"> <template is=\"for\" items=\"{{item.selectedItems}}\" item=\"value\" index=\"position\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowUserOnly,'&amp;&amp;',expHandlers(item.prefix,'!=',&quot;U&quot;))}}\"><template case=\"true\"> <div class=\"dIB cxVam selected-user-type-detail\"> <span class=\"dIB cxVam user-type cxComboboxSelectedHead\">{{value.name}}</span> <span class=\"seperator dIB cxVam\">-</span> <span data-zcqa=\"combo_box_{{item.name}}_{{value.name}}_count\" class=\"cxComboSelectedUserCount selected-user-count dIB cxVam\">{{value.users.length}}</span> </div> </template></template> <ul class=\"p0 m0 selected-user-ul cxComboboxRecipientSelectedList\"> <template is=\"for\" items=\"{{value.users}}\" item=\"user\" index=\"userPosition\"> <li data-zcqa=\"combo-box_selected_list_{{user.name}}\" class=\"cxComboSelectedList selected-user-list\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(userModelsOption.imageSelector,'!=',undefined),'&amp;&amp;',expHandlers(userModelsOption.imageSelector,'!=',null)),'&amp;&amp;',expHandlers(userModelsOption.imageSelector.length,'!=',0))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(user.image,'==',undefined),'||',expHandlers(user.image,'==',null)),'||',expHandlers(user.image.length,'==',0))}}\"><template case=\"true\"> <span class=\"combo-box-nophoto \"></span> </template><template case=\"false\"> <span class=\"dIB cxVam selected-user-img\"><img class=\"cxComboBoxImg\" src=\"{{user.image}}\"></span> </template></template> </template></template> <span class=\"cxEllipsis selected-user-name dIB cxVam\" onmouseover=\"{{action('checkForToolTip',this,user.name)}}\">{{user.name}}</span> <span data-zcqa=\"combo-box_selected_remove_{{user.name}}\" class=\"close-selected-wrap cP op5_op1_parent\" onclick=\"{{action('removeFromList',event,index,position,'',value,userPosition,user[userModelsOption.idSelector])}}\"> <span class=\"svgIcons close-selected-user-icon dIB cxVam op5_op1_child\"></span> </span> </li> </template> </ul> </template> </template><template case=\"false\"> <ul class=\"p0 m0 selected-user-ul cxComboboxRecipientSelectedList\"> <template is=\"for\" items=\"{{item.selectedItems}}\" item=\"value\" index=\"position\"> <li data-zcqa=\"combo-box_selected_list_{{value.name}}\" class=\"cxComboSelectedList selected-user-list\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(item.imageSelector,'!=',undefined),'&amp;&amp;',expHandlers(item.imageSelector,'!=',null)),'&amp;&amp;',expHandlers(item.imageSelector.length,'!=',0))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(value.image,'==',undefined),'||',expHandlers(value.image,'==',null)),'||',expHandlers(value.image.length,'==',0))}}\"><template case=\"true\"> <span class=\"combo-box-nophoto \"></span> </template><template case=\"false\"> <span class=\"dIB cxVam selected-user-img\"><img class=\"cxComboBoxImg\" src=\"{{value.image}}\"></span> </template></template> </template></template> <span class=\"cxEllipsis selected-user-name dIB cxVam\" onmouseover=\"{{action('checkForToolTip',this,value.name)}}\">{{value.name}}</span> <span data-zcqa=\"combo-box_selected_remove_{{value.name}}\" class=\"close-selected-wrap cP op5_op1_parent\" onclick=\"{{action('removeFromList',event,index,position)}}\"> <span class=\"svgIcons close-selected-user-icon dIB cxVam op5_op1_child\"></span> </span> </li> </template> </ul> </template></template> </lyte-accordion-body> </lyte-accordion-item> </template></template></template> </template> </lyte-accordion> </div> </div> </div> </div> </lyte-modal-content> <lyte-modal-footer class=\"{{if(cxPropFooterYield,'','right cxComboBoxFooter')}}\"> <div class=\"cxComboRecipientWrapper\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(showAddRecipient,'||',expHandlers(cxPropSelectedTags.length,'>',0)),'||',expHandlers(cxPropShowUserOnly,'&amp;&amp;',cxPropNeedRecipient))}}\"><template case=\"true\"> <div class=\"cxComboRecipientWrap\"> <div class=\"cxFlex cxComboboxRecipientHeadArea\"> <div class=\"cxComboRecipient\"> <span class=\"dIB cxVam\">{{cxPropRecipient.key}}</span> <template is=\"if\" value=\"{{expHandlers(cxPropRecipient.tags.length,'>=',1)}}\"><template case=\"true\"> <span class=\"cxComboRecipientSep seperator dIB cxVam\">-</span> <span data-zcqa=\"combo_box_{{cxPropRecipient.key}}_count\" class=\"cxComboSelUserCount selected-user-count\">{{cxPropRecipient.tags.length}}</span> </template></template> </div> <template is=\"if\" value=\"{{cxPropShowUserOnly}}\"><template case=\"true\"> <lyte-button class=\"cxComboBtnUserOnly mlAuto\" data-zcqa=\"combo_box_add_recipient\" onclick=\"{{action('showAddRecipient',param)}}\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n(\"crm.button.add\")}}</template> </lyte-button> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(showAddRecipient,'!')}}\"><template case=\"true\"> <lyte-button class=\"cxComboBtnUserOnly mlAuto\" data-zcqa=\"combo_box_add_recipient\" onclick=\"{{action('showAddRecipient')}}\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n(\"crm.button.add\")}}</template> </lyte-button> </template><template case=\"false\"> <span class=\"cxComboRecipientPlaceholder\">{{cruxGetI18n('crm.workflow.alert.type.otherEmails')}}</span> </template></template></template></template> </div> <template is=\"if\" value=\"{{showAddRecipient}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropRecipient.tags.length,'>=',1)}}\"><template case=\"true\"> <crux-tag id=\"tagComp\" cx-prop-allow-dropdown=\"false\" cx-prop-tags=\"{{cruxClone(cxPropRecipient.tags)}}\" on-add-tag=\"{{method('validateTag')}}\" on-before-add-tag=\"{{method('onBeforeTag')}}\" on-remove-tag=\"{{method('removeTagFromList')}}\" cx-prop-input-placeholder=\"{{cruxGetI18n('crm.inv.label.add.emails')}}\" cx-prop-comma-seperation=\"true\" cx-prop-max-tag-length=\"{{cxPropTagLengthLimit}}\" onkeydown=\"{{action('checkForLimit',event)}}\" on-error=\"{{method(&quot;showAlertMessage&quot;)}}\" cx-prop-color-tags=\"false\"></crux-tag> </template><template case=\"false\"> <crux-tag id=\"tagComp\" cx-prop-input-placeholder=\"{{cruxGetI18n('crm.inv.label.add.emails')}}\" cx-prop-allow-dropdown=\"false\" on-before-add-tag=\"{{method('onBeforeTag')}}\" on-add-tag=\"{{method('validateTag')}}\" on-remove-tag=\"{{method('removeTagFromList')}}\" cx-prop-comma-seperation=\"true\" cx-prop-max-tag-length=\"{{cxPropTagLengthLimit}}\" onkeydown=\"{{action(&quot;checkForLimit&quot;,event)}}\" on-error=\"{{method(&quot;showAlertMessage&quot;)}}\" cx-prop-color-tags=\"false\"></crux-tag> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropSelectedTags.length,'==',0)}}\"><template case=\"true\"> <ul class=\"selected-user-ul cxComboboxRecipientSelectedList cxComboboxNoRecipientUl\"></ul> </template><template case=\"false\"> <ul class=\"selected-user-ul cxComboboxRecipientSelectedList\"> <template is=\"for\" items=\"{{cxPropRecipient.tags}}\" item=\"tag\" index=\"position\"> <li data-zcqa=\"combo-box_selected_list_{{value.name}}\" class=\"cxComboSelectedList selected-user-list\"> <span class=\"cxEllipsis selected-user-name dIB cxVam\" onmouseover=\"{{action('checkForToolTip',this,tag.name)}}\">{{tag.name}}</span> <span data-zcqa=\"combo-box_close_icon\" class=\"close-selected-wrap cP op5_op1_parent\" onclick=\"{{action('removeFromList',event,index,position,'Recipient')}}\"> <span class=\"svgIcons close-selected-user-icon dIB cxVam op5_op1_child\"></span> </span> </li> </template> </ul> </template></template> </template></template> </div> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropShowUserOnly,'!'),'&amp;&amp;',cxPropNeedRecipient),'&amp;&amp;',expHandlers(expHandlers(cxPropRecipient.tags,'&amp;&amp;',expHandlers(cxPropRecipient.tags.length,'===',0)),'||',expHandlers(cxPropRecipient.tags,'!'))),'&amp;&amp;',expHandlers(showAddRecipient,'!'))}}\"><template case=\"true\"> <lyte-button data-zcqa=\"combo_box_add_recipient\" onclick=\"{{action('showAddRecipient',param)}}\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n(\"crm.recipient.add.recipient\")}}</template> </lyte-button> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropFooterYield,'!')}}\"><template case=\"true\"> <lyte-button class=\"mlAuto\" onclick=\"{{action('cancelData')}}\" data-zcqa=\"combo_box_cancel\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.cancel')}}</template> </lyte-button> <lyte-button data-zcqa=\"combo_box_save\" lt-prop-id=\"cruxComboBoxSaveButton\" lt-prop-disabled=\"{{cxPropSaveButtonDisabledState}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('saveData')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{if(cxPropSaveButtonCustomLiteral,cxPropSaveButtonLiteral,cruxGetI18n('crm.button.save'))}}</template> </lyte-button> </template><template case=\"false\"> <lyte-yield yield-name=\"comboBoxFooterYield\"></lyte-yield> </template></template> </lyte-modal-footer> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[5]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,1,1,1,1,0]},{"type":"attr","position":[3,1,1,1,3]},{"type":"if","position":[3,1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,1,3,1,1]},{"type":"if","position":[3,1,1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,1,3,1,3]},{"type":"if","position":[3,1,1,3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,1,3,1,5]},{"type":"if","position":[3,1,1,3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropInputValue",{"type":"helper","value":{"name":"if","args":["searchLoading","'display: none'","'display: block'"]}},"'display: none'"]}}}},{"type":"attr","position":[1,5],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropInputValue",{"type":"helper","value":{"name":"if","args":["searchLoading","'display: block'","'display: none'"]}},"'display: none'"]}}}}]}},"default":{}},{"type":"attr","position":[3,1,1,3,3,1]},{"type":"attr","position":[3,1,1,3,3,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["filterChange","'display:block'","'display:none'"]}},"';'"]}}}},{"type":"attr","position":[3,1,1,3,3,1,3]},{"type":"attr","position":[3,1,1,3,3,1,3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["filterChange","'display:none'","''"]}},"';'"]}}}},{"type":"attr","position":[3,1,1,3,3,1,3,1,1]},{"type":"for","position":[3,1,1,3,3,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"attr","position":[3,1,1,3,3,1,3,1,2]},{"type":"if","position":[3,1,1,3,3,1,3,1,2],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,1,3,3,1,3,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["scrollLoading","'display:block'","'display:none'"]}},"';'"]}}}},{"type":"text","position":[3,1,3,1,1,0]},{"type":"attr","position":[3,1,3,1,3]},{"type":"if","position":[3,1,3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]},{"type":"text","position":[1,4]}]}},"default":{}},{"type":"attr","position":[3,1,3,3,1]},{"type":"text","position":[3,1,3,3,1,1]},{"type":"attr","position":[3,1,3,3,3,1]},{"type":"registerYield","position":[3,1,3,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,1,5]},{"type":"attr","position":[1,1,1,5,1]},{"type":"if","position":[1,1,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"insertYield","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,5]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[3,1,3,3,3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"attr","position":[5,1,1]},{"type":"if","position":[5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3]},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5,5]},{"type":"if","position":[5,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["currentlyExcludedArray","cxPropFooterYield","cxPropHeaderYield","cxPropInputPlaceholder","preventSetValues","saveClosing","initialSelected","totalList","totalListPosition","preventFutherRequest","stopScrolling","preventShowCalling","setScrolling","cxPropDropdownYield","isSearch","clearField","searchLoading","scrollLoading","filterChange","render","splitRecords","cxPropSelectedPerPage","cxPropSelected","localSelected","displayContainerData","localOptionModels","defaultOptionModels","localClose","totalSelectedItemsCount","perPageValue","pageNoValue","searchNonPaginationData","cxPropEmptySelectedMsg","cxPropEmptyDataMsg","cxPropTotalMaxLimit","cxPropMaxLimit","cxPropMaxLimitMsg","alertMessage","systemData","localData","cxPropNetworkData","cxPropExclude","cxPropInputValue","cxPropSelectedTags","cxPropPerPage","cxPropMinLength","currentPos","pageNo","noMoreRecords","cxPropCustomRequest","cxPropFilterUserValue","cxPropFilterSystemValue","cxPropSelectedFilterOption","setSelectedFilterOption","currentFilterValue","cxPropFilterOptions","cxPropHeaderMsg","cxPropNoResultMsg","cxPropShow","cxPropQueryParams","cxPropPrimaryKey","cxPropSearchAction","cxPropOptionModels","cxPropInputValue","selectedItems","selectedOption","cxPropDropboxFooterYield","calledWithIn","cxPropDeletedList","observerDelList","cxPropNewSelectedList","cxPropAllowMultiple","cxPropWidth","cxPropHeight","cxPropMaxHeight","cxPropCustomPagination","cxPropNoMoreData","preventSetOfNoMoreData","cxPropDisableSearch","isSearchDisabled","cxPropRecipient","showAddRecipient","localRecipient","showAlertMessage","messageType","deleteAlertShow","cxPropNeedRecipient","cxPropTagLimit","messageBoxType","cxPropMaxLimitDuration","cxPropTagLengthLimit","cxPropTotalRecipientCount","cxPropShowUserOnly","subFilterOption","userModelsOption","containerDataObject","selectedUsersList","cxPropTransition","cxPropOffset","cxPropSaveButtonDisabledState","cxPropSaveButtonCustomLiteral","cxPropSaveButtonLiteral"],
_observedAttributesType :["array","boolean","boolean","string","boolean","boolean","array","array","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","number","number","array","array","array","array","array","boolean","number","number","number","array","string","string","number","number","string","string","array","array","object","array","string","array","number","number","number","number","boolean","boolean","string","string","string","string","object","array","string","string","boolean","object","string","boolean","array","string","array","string","boolean","boolean","array","array","array","boolean","string","string","string","boolean","boolean","boolean","boolean","boolean","object","boolean","array","boolean","string","boolean","boolean","number","string","string","number","object","boolean","array","object","object","object","object","object","boolean","boolean","string"],
 //no i18n
	data : function(){
		return {
			//new---------------------------------------------------------------------------------------------------------------
			currentlyExcludedArray : Lyte.attr('array', {"default" : []}), //NO I18n
      //Yield
			/**
			 * Set to true to render a custom footer.
			 * @componentProperty { boolean } cxPropFooterYield=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFooterYield : Lyte.attr('boolean', { "default" : false}), //NO I18n
			/**
			 * Set to true to render a custom header.
			 * @componentProperty { boolean } cxPropHeaderYield=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropHeaderYield : Lyte.attr('boolean', { "default" : false}), //NO I18n
			//input
			/**
			 * Placeholder text displayed in the input box used for searching.
			 * @componentProperty { string } cxPropInputPlaceholder
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue Search
			 */
			cxPropInputPlaceholder : Lyte.attr("string",{"default" :_cruxUtils.getI18n('crm.globalsearch.search.title')}), //NO I18n
			preventSetValues : Lyte.attr('boolean', { "default" : false}), //NO I18n
			saveClosing : Lyte.attr('boolean', { "default" : false}), //NO I18n
			initialSelected : Lyte.attr('array',{default : []}), //No I18n
			totalList : Lyte.attr('array',{default : []}), //No I18n
			totalListPosition : Lyte.attr('array',{default : []}), //No I18n
			preventFutherRequest :  Lyte.attr('boolean', { "default" : false}), //NO I18n
			stopScrolling : Lyte.attr('boolean', { "default" : false}), //NO I18n
			preventShowCalling :Lyte.attr('boolean', { "default" : false}), //NO I18n
			setScrolling : Lyte.attr('boolean', { "default" : false}), //NO I18n
			/**
			 * Set to true to render a custom filter dropdown.
			 * @componentProperty { boolean } cxPropDropdownYield=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDropdownYield : Lyte.attr('boolean', { "default" : false}), //NO I18n
			isSearch : Lyte.attr('boolean', { "default" : false}), //NO I18n
			// cxPropSearchCriteria : Lyte.attr("string",{"default" : ''}), //NO I18n
			clearField : Lyte.attr('boolean', { "default" : false}), //NO I18n
			searchLoading : Lyte.attr('boolean', { "default" : false}), //NO I18n
			scrollLoading :Lyte.attr('boolean', { "default" : false}), //NO I18n
			filterChange : Lyte.attr('boolean', { "default" : false}), //NO I18n
			render : Lyte.attr('boolean', { "default" : true}), //NO I18n
			splitRecords : Lyte.attr('number',{default : 0}), //No I18n
			// this represents api id's request limit
			cxPropSelectedPerPage : Lyte.attr('number',{default : 100}), //No I18n
			/**
			 * @componentProperty { array } cxPropSelected
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropSelected : Lyte.attr('array',{default : []}), //No I18n
			localSelected : Lyte.attr('array',{default : []}), //No I18n
			displayContainerData : Lyte.attr('array',{default : []}), //No I18n
			localOptionModels : Lyte.attr('array',{default : []}), //no i18n
			defaultOptionModels : Lyte.attr('array'), //no i18n
			localClose : Lyte.attr('boolean', { "default" : false}), //NO I18n
			totalSelectedItemsCount : Lyte.attr('number',{default : 0}), //No I18n
			perPageValue : Lyte.attr('number'), //No I18n
			pageNoValue : Lyte.attr('number'), //No I18n
			searchNonPaginationData : Lyte.attr('array',{default : []}), //No I18n
			/**
			 * Message displayed when no options are selected.
			 * @componentProperty { string } cxPropEmptySelectedMsg
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue No results found
			 */
			cxPropEmptySelectedMsg : Lyte.attr("string",{default :  _cruxUtils.getI18n('crm.template.listview.search.no.results')}), //NO I18n
			/**
			 * Message displayed when no data is available.
			 * @componentProperty { string } cxPropEmptyDataMsg
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropEmptyDataMsg :  Lyte.attr("string",{default : ''}), //NO I18n
			/**
			 * @componentProperty { number } cxPropTotalMaxLimit
			 * @maxValue maximum
			 */
			cxPropTotalMaxLimit : Lyte.attr('number'), //No I18n
			/**
			 * Maximum number of options that can be selected.
			 * @componentProperty { number } cxPropMaxLimit
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @defaultValue 100
			 */
			cxPropMaxLimit : Lyte.attr('number',{default : 100}), //No I18n
			/**
			 * Message shown when the maximum selection limit is reached.
			 * @componentProperty { string } cxPropMaxLimitMsg
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropMaxLimitMsg : Lyte.attr("string",{default : ''}), //NO I18n
			alertMessage : Lyte.attr("string",{default :""}), //NO I18n
			//mixins
     	 systemData : Lyte.attr('array',{default : []}), //No I18n
			localData : Lyte.attr('array',{default : []}), //No I18n
			//It's internal property - start
			//it wasn't exposed and we can't change the property name, we're keeping the cxProp prefix.
			cxPropNetworkData : Lyte.attr('object', {"default" : {"cxPropModuleName": "", "cxPropCacheQuery":true , "cxPropDataCache":false}}), //NO I18n
			cxPropExclude : Lyte.attr('array',{default : []}), //No I18n
			cxPropInputValue : Lyte.attr("string",{default : ''}), //NO I18n
			cxPropSelectedTags : Lyte.attr("array",{default : []}), //NO I18N
			//It's internal property - end
			/**
			 * Number of records to fetch from the server per request.
			 * @componentProperty { number } cxPropPerPage
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @defaultValue 200
			 */
			cxPropPerPage : Lyte.attr('number', {default : 200}), //No I18n
			/**
			 * Minimum number of characters required to trigger a search
			 * @componentProperty { number } cxPropMinLength
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @defaultValue 1
			 */
			cxPropMinLength : Lyte.attr('number', {default : 1}), //NO I18n
			currentPos : Lyte.attr('number', { "default" : 0}), //NO I18n
			pageNo: Lyte.attr("number", {"default": 1}), //NO I18n
			noMoreRecords : Lyte.attr('boolean', { "default" : true}), //NO I18n
			//%%
			/**
			 * Enables custom request handling during model selection.
			 * @componentProperty { boolean } cxPropCustomRequest=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropCustomRequest : Lyte.attr('boolean', { "default" : false}), //NO I18n
			//&&
			//DropDown
			cxPropFilterUserValue : Lyte.attr('string',{default : 'name'}), //No I18n
			cxPropFilterSystemValue : Lyte.attr('string',{default : 'prefix'}), //No I18n
			/**
			 * Specifies which filter should be active when the combo box opens. Defaults to the first filter. The value should be prefixed with the model name.
			 * @componentProperty { string } cxPropSelectedFilterOption
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropSelectedFilterOption : Lyte.attr('string',{default : ''}), //No I18n
			setSelectedFilterOption : Lyte.attr('string',{default : ''}), //No I18n
			currentFilterValue : Lyte.attr('object',{default : {}}), //No I18n
			/**
			 * List of available filter options.
			 * @componentProperty { array } cxPropFilterOptions
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropFilterOptions : Lyte.attr('array',{default : []}), //No I18n
			//Dynamic Messages
			/**
			 * Message displayed in the component header. The value should be an I18n key.
			 * @componentProperty { string } cxPropHeaderMsg
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropHeaderMsg : Lyte.attr('string',{default : ''}), //NO I18n
			/**
			 * Message displayed when a search returns no results.
			 * @componentProperty { string } cxPropNoResultMsg
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue No Results Found
			 */
			cxPropNoResultMsg : Lyte.attr('string',{default : 'No Results Found'}), //NO I18n
      //Modal
			/**
			 * Determines whether the modal component should be rendered.
			 * @componentProperty { boolean } cxPropShow=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShow : Lyte.attr('boolean',{default : false}), //No I18n
			//unused props - start
			cxPropQueryParams : Lyte.attr('object', {"default" : {}}), //NO I18n
			cxPropPrimaryKey : Lyte.attr("string",{default : ''}), //NO I18n
			//unused props - end
			cxPropSearchAction : Lyte.attr('boolean',{default : false}), //no i18n

			//old---------------------------------------------------------------------------------------------------------------
			/**
			 * Defines the data models used by the combo box. Each item in the array should be an object with mandatory and optional key-value pairs that determine how the component behaves.
			 * @componentProperty { array } cxPropOptionModels
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @property showLoggedinUser key needs to be true, if logged in user needs to be differentiated from all user
			 */
			cxPropOptionModels : Lyte.attr('array'), //no i18n
			 /**
			  * Contains the list of selected options.
			  * @componentProperty { array } cxPropSelected
			  * @author Mahalakshmi M
			  * @version 1.0.0
			  */
			// cxPropSelected : Lyte.attr('array'), //no i18n
			/**
			 * @componentProperty { string } cxPropInputValue
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropInputValue : Lyte.attr('string',{default : ''}), //no i18n
			selectedItems : Lyte.attr('array',{default : []}), //no i18n
			selectedOption : Lyte.attr('string',{default :'0'}), //no i18n
			/**
			 * Set to true to render a custom footer inside the filter dropdown.
			 * @componentProperty { boolean } cxPropDropboxFooterYield=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDropboxFooterYield : Lyte.attr('boolean',{default : false}), //no i18n
			calledWithIn : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Contains records that were unselected (deleted) during the current session.
			 * @componentProperty { array } cxPropDeletedList
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropDeletedList : Lyte.attr('array',{default : []}), //No I18n
			observerDelList : Lyte.attr('array',{default : []}), //No I18n
			/**
			 * Contains records that were newly selected during the current session.
			 * @componentProperty { array } cxPropNewSelectedList
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropNewSelectedList : Lyte.attr('array',{default : []}), //No I18n
			/**
			 * Sets lt-prop-allow-multiple on the modal to allow multiple selections.
			 * @componentProperty { boolean } cxPropAllowMultiple=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAllowMultiple : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Sets lt-prop-width of the modal.
			 * @componentProperty { string } cxPropWidth
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue 1090px
			 */
			cxPropWidth : Lyte.attr('string',{default : "1090px"}), //no i18n
			/**
			 * Sets lt-prop-width of the modal.
			 * @componentProperty { string } cxPropHeight
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue auto
			 */
			cxPropHeight : Lyte.attr("string",{"default":"auto"}), //NO I18N
			/**
			 * Sets lt-prop-max-height of the modal.
			 * @componentProperty { string } cxPropMaxHeight
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropMaxHeight : Lyte.attr("string",{"default":""}), //NO I18N
			/**
			 * When set to true, the component ignores page and perPage values and does not send them in requests.
			 * @componentProperty { boolean } cxPropCustomPagination=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropCustomPagination : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Prevents additional requests for the current filter once all data is loaded. Automatically resets when the filter or search changes.
			 * @componentProperty { boolean } cxPropNoMoreData=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropNoMoreData : Lyte.attr('boolean',{default : false}), //no i18n
			preventSetOfNoMoreData : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Disables the search box for all filters when set to true.
			 * @componentProperty { boolean } cxPropDisableSearch=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDisableSearch : Lyte.attr('boolean',{default : false}), //no i18n
			isSearchDisabled : Lyte.attr('boolean'), //no i18n
			/**
			 * Contains recipient details. Must include a tags key with an array of email addresses.
			 * @componentProperty { object } cxPropRecipient
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropRecipient : Lyte.attr("object",{default : {}}), //NO I18N
			showAddRecipient : Lyte.attr("boolean",{default : false}), //NO I18N
			localRecipient : Lyte.attr("array",{default : []}), //NO I18N
			showAlertMessage : Lyte.attr("boolean",{default : false}), //NO I18N
			messageType : Lyte.attr("string",{default : ""}), //NO I18N
			deleteAlertShow : Lyte.attr("boolean",{"default" : false}), //NO I18N
			/**
			 * Controls whether the recipient footer section is displayed.
			 * @componentProperty { boolean } cxPropNeedRecipient=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropNeedRecipient : Lyte.attr("boolean",{"default" : false}), //NO I18N
			/**
			 * Maximum number of recipients that can be added.
			 * @componentProperty { number } cxPropTagLimit
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @defaultValue 15
			 */
			cxPropTagLimit : Lyte.attr("number",{"default" : 15}), //NO I18N
			messageBoxType : Lyte.attr('string', { "default" : "info"}), //NO I18n
			/**
			 * Duration (in ms) for which the max limit message is displayed.
			 * @componentProperty { string } cxPropMaxLimitDuration
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue 2000
			 */
			cxPropMaxLimitDuration : Lyte.attr("string",{"default" : "2000"}), //NO I18n
			/**
			 * Maximum character limit for a recipient tag.
			 * @componentProperty { number } cxPropTagLengthLimit
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 * @defaultValue 10
			 */
			cxPropTagLengthLimit : Lyte.attr("number",{"default" : 10}), //NO I18N
			/**
			 * Displays the total recipient count for the component.
			 * @componentProperty { object } cxPropTotalRecipientCount
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropTotalRecipientCount : Lyte.attr("object",{"default" : {count : 0 , total : 50,needed : false}}) ,//NO I18N

			/**
			 * @componentProperty { boolean } cxPropShowUserOnly=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowUserOnly : Lyte.attr("boolean",{ "default" : false }),//NO I18N
			subFilterOption : Lyte.attr("array",{default : []}),//no i18n
			userModelsOption : Lyte.attr("object",{default : {}}),//no i18n 
			containerDataObject : Lyte.attr("object",{default : {}}),//no i18n 
			selectedUsersList : Lyte.attr("object",{default : {}}),//NO I18n
			/**
			 * Passed to lt-prop-transition to control modal animation.
			 * @componentProperty { object } cxPropTransition
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 */
			cxPropTransition : Lyte.attr('object',{"default":{"animation":"slideFromTop","duration":"0.5"}}), //NO I18n
   			/**
				* Passed to lt-prop-offset to control modal positioning.
   			 * @componentProperty { object } cxPropOffset
   			 * @author Mahalakshmi M
   			 * @version 1.0.0
   			 */
   			cxPropOffset : Lyte.attr('object',{"default" : {"top":"0px","left":"center"}}), //NO I18n
			/**
			 * Passed to lt-prop-disabled of the Save button to control its state.
			 * @componentProperty { boolean } cxPropSaveButtonDisabledState=false
			 * @author Mahalakshmi M
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropSaveButtonDisabledState : Lyte.attr("boolean",{ "default" : true }),//NO I18N
			cxPropSaveButtonCustomLiteral : Lyte.attr("boolean",{ "default" : false }),//NO I18N
			cxPropSaveButtonLiteral : Lyte.attr("string")//NO I18N

		}
	},
	didDestroy : function(){
		//this function is used to destroy all the values cached when the request has been made.
		var modules=this.getData('cxPropOptionModels'); //NO I18n
			for(var i=0;i<modules.length;i++){
					if(modules[i].pagination==true){

						var initialQueryParams = this.setCriteria( modules[i] );
						initialQueryParams.per_page = this.data.cxPropPerPage;
						initialQueryParams.page = 1;

						store.clearCachedQuery(modules[i].model_name, initialQueryParams);
					}
					else if(!modules[i].pagination && !modules[i].cxPropOptions){
						store.clearCachedQuery(modules[i].model_name, this.customCacheQueryObject[modules[i].prefix]);
					}
			}
			delete this.bodydrop;
			delete this.modalWrapperElement;
   },
	showToogle : function(){
		//this function is called when ever there is a change in the ltPropShow value and will set the respective cxPropShow value.
	 if(!this.getData("preventShowCalling")){
		 if(this.getData("cxPropShow")){
	     this.$node.querySelector('lyte-modal').ltProp('show',true); //NO I18n
		 }
		 else{
	    this.$node.querySelector('lyte-modal').ltProp('show',false); //NO I18n
		 }
	 }
	 else{
		 this.setData("preventShowCalling",false);//NO I18n
	 }

 }.observes('cxPropShow').on('didConnect'), //NO I18n
 setNoMoreData : function(){
	 if(!this.getData("preventSetOfNoMoreData")){
	 	this.setData("noMoreRecords", this.getData("cxPropNoMoreData") ? false : true);
	 }else{
		 this.setData("preventSetOfNoMoreData",false);//NO I18n
	 }
 }.observes("cxPropNoMoreData"), //NO I18n
 recipientObserve:function(){
		this.setData("cxPropRecipient",this.getData("cxPropRecipient")); //NO I18N
		this.setData("cxPropInitialtags",[]); //NO I18N
		this.assignDatas();
 }.observes('cxPropRecipient.tags.[]'), //NO I18n
 obsForSelectedData : function(){
	if(!this.preventSelObs && this.data.cxPropShow && this.data.cxPropShowUserOnly){
		this.preSelectedHandeling("observer");
	}
 }.observes('cxPropSelected.[]'), //NO I18n
	preSelectedHandeling : function(from){
		var list=[];
		var listPosition;
		var set=false;
		//this function is used to collects all the selected values and check weather a request is to be made or not for them.
		var selected=this.getData("cxPropSelected")?this.getData("cxPropSelected"):[]; //NO I18n
		this.setData("totalSelectedItemsCount",0);
  	 var networkReqData=[];
  	 if( this.data.cxPropShowUserOnly ){
  	 	for(var j=0;j<this.getData('localOptionModels').length;j++){
  		 	var localModel = this.getData('localOptionModels')[j];
  			var temp , selectedDataByModel = selected.filter(function(item){return item.prefix == localModel.prefix}), resArray = []//eslint-disable-line no-loop-func
	  		selectedDataByModel.forEach(function(data){//eslint-disable-line no-loop-func
				if( !this.data.selectedUsersList[data.user.id] ){
					data.id = data[localModel.singular_name].id
					data.name = data[localModel.singular_name].name;
					data.user.image = data.user[this.data.userModelsOption.imageSelector]
					isDataAvail = resArray.filter(function(item){ return item.id == data[localModel.singular_name].id})[0];//eslint-disable-line no-loop-func
					if( localModel.prefix ==  this.data.userModelsOption.prefix){
						isDataAvail = resArray.filter(function(item){ return item.id == localModel.singular_name})[0];//eslint-disable-line no-loop-func
						temp = isDataAvail?isDataAvail : { type : localModel.model_name , prefix : localModel.prefix , id : localModel.singular_name , name : localModel.name ,users : [data.user]}
					}else{
						temp = { type : localModel.model_name , prefix : data.prefix , id : data.id , name : data.name , users : [data.user]}
					}
					if( !isDataAvail ){
						resArray.push(temp)
					}else{
						isDataAvail.users.push(data.user)
					}
					Lyte.objectUtils(this.data.selectedUsersList,"add",data.user.id,data);//NO I18n
				}
	  		}.bind(this))
  			Lyte.arrayUtils(this.getData('localOptionModels')[j].selectedItems, 'concat', resArray); //NO I18n
	  		this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+selectedDataByModel.length); //No I18N
		}
		if(from === "observer"){
			this.resetDisplayArray(this.getData("currentFilterValue"));//NO I18n
		}
  	 }else{
  	 	for(var j=0;j<this.getData('localOptionModels').length;j++){
	  		 this.setData("splitRecords",0); //NO I18n
	  		var tempCollection=[],noReqData=[],tempModel=[];
	  		for(var k=0;k<selected.length;k++){
	  			if(selected[k].prefix==this.getData('localOptionModels')[j].prefix){
						if(this.getData('localOptionModels')[j].cxPropOptions!=undefined){
							for(var r=0;r<this.getData('localOptionModels')[j].cxPropOptions.length;r++){
								if(this.getData('localOptionModels')[j].cxPropOptions[r].id==selected[k].id){
									var data=this.getData('localOptionModels')[j];
									Lyte.arrayUtils(noReqData,"push",{type : data.model_name,name : data.cxPropOptions[r][data.nameSelector], id : data.cxPropOptions[r][data.idSelector],prefix : data.prefix,image : data.cxPropOptions[r][data.imageSelector]});
								}
							}
						}
						else{
							if(selected[k].id!=undefined){
	  				if(selected[k].name!=undefined){
	  					if(this.getData('localOptionModels')[j].imageSelector!=undefined && selected[k].image!=undefined){
	  						Lyte.arrayUtils(noReqData, 'push', selected[k]);
	  					}
	  					else if(this.getData('localOptionModels')[j].imageSelector==undefined){
	  						Lyte.arrayUtils(noReqData, 'push', selected[k]);
	  					}
	  					else{
	  						Lyte.arrayUtils(tempCollection, 'push', selected[k].id);
	  					}
	  				}
						else{
	  					Lyte.arrayUtils(tempCollection, 'push', selected[k].id);
	  				}
					}
	  				else{
	  					Lyte.arrayUtils(tempCollection, 'push', selected[k].id);
	  				}
					}
	  			}
	  		}
	  		Lyte.arrayUtils(this.getData('localOptionModels')[j].selectedItems, 'concat', noReqData); //NO I18n
	      // if(this.getData("currentFilterValue").prefix==this.getData('localOptionModels')[j].prefix){
				// 		this.resetDisplayArray(noReqData,this.getData('localOptionModels')[j]);
			  // }
	  		this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+noReqData.length); //No I18N
	  		while(this.getData('splitRecords')<tempCollection.length){ //NO I18n
	  			var array=tempCollection.slice(this.getData('splitRecords'),this.getData('splitRecords')+this.getData('cxPropSelectedPerPage'));//NO I18n
	  			this.setData('splitRecords',this.getData('splitRecords')+this.getData('cxPropSelectedPerPage'));//NO I18n
	  			//localModel = this.getData('localOptionModels')[j];
	  			// this.requestPreSelectedData(j,array);
					// Lyte.arrayUtils(list,"push",array);
					list.push(array);
					listPosition=j;
					set=true;
	  		}
	      // Lyte.arrayUtils(totalList,"push",list);
				if(set){
					this.getData("totalList").push(list);//NO I18n
					this.getData("totalListPosition").push(listPosition);//NO I18n
					list=[];
					set=false;
				}

	  	 }
  	 }
  	 
		 //--------------------------------------------------------------
	 if( from !== "observer" ){
		this.requestData.call(this);
	 }
	

				//----------------------------------------------------------
	},
	// requestPreSelectedData : function(position,array){
	// 	//this function is called from function preSelectedHandeling to make a request for values.
	// 	store.findAll(this.getData('localOptionModels')[position].model_name,{ids:array.join(',')},false,false).then(function(arg){ //NO I18n
 	// 	 if(arg[this.getData('localOptionModels')[position].model_name]!=undefined){
 	// 	 arg=arg[this.getData('localOptionModels')[position].model_name];
 	// 	 }
	// 	 var tempArray=[];
	// 	 for(var q=0;q<arg.length;q++){
	// 		 Lyte.arrayUtils(this.getData('localOptionModels')[position].selectedItems,"push",{type : this.getData('localOptionModels')[position].model_name,name : arg[q][this.getData('localOptionModels')[position].nameSelector], id : arg[q][this.getData('localOptionModels')[position].idSelector],prefix : this.getData('localOptionModels')[position].prefix,image : arg[q][this.getData('localOptionModels')[position].imageSelector]});
	// 		 if(this.getData("currentFilterValue").prefix==this.getData('localOptionModels')[position].prefix){
  //       tempArray.push(arg[q][this.getData('localOptionModels')[position].idSelector]);
 	// 	   }
	// 	 }
	// 	 if(this.getData("currentFilterValue").prefix==this.getData('localOptionModels')[position].prefix){
	// 	 this.resetDisplayArray(tempArray,this.getData('localOptionModels')[position]);
	//    }
 	// 	 this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+this.getData('localOptionModels')[position].selectedItems.length); //No I18N
 	//  }.bind(this),function(err){
 	// 	 var s = console.error;
 	// 	s(err);
 	//  }.bind(this));
	// },
	customReqFunc : function(networkData,params,isSearch){
		var currFil = this.getData("currentFilterValue");//No I18N
		if( currFil.inbuildCustomSubReq){
			return new Promise(function(resolve, reject) {
				 store.triggerAction("user", "get_assigned", params).then(function(arg) {
					 resolve(arg);
				 }.bind(this), function(err) {
					 if(isSearch){
						 if (this.errorOnSearch) {
							 if (type != "userLookup") {
								 this.setData("searchLoading", false); //NO I18n
								 this.setData("scrollLoading", false); //NO I18n
								 this.setData("systemData", []); //NO I18n
							 }
							 this.errorOnSearch();
						 }
						 var s = console.error;
						 s(err);
						 this.setData("multiScroll", false); //NO I18n
					 }
				 }.bind(this));
				}.bind(this));
		} else {
			if( this.data.cxPropShowUserOnly ){
				if(this.getMethods('onCustomRequest')){ //NO I18n
					 /**
					  * When cxPropCustomRequest is passed as true, you need to pass the data to be rendered by making your custom request.
					  * @method onCustomRequest
					  * @param { object } networkData
					  * @param { object } params
					  * @param { boolean } this.getData("isSearch")
					  * @param { string } this.getData("cxPropInputValue")
					  * @param { object } this.getData("currentFilterValue")
					  * @param { * } this.data.subFilterSelected
					  */
					var retVal=this.executeMethod('onCustomRequest',networkData,params,this.getData("isSearch"),this.getData("cxPropInputValue"),this.getData("currentFilterValue") , this.data.subFilterSelected); //NO I18n
				return retVal;
			  }
			}

			if(this.getMethods('onCustomRequest')){ //NO I18n
				if(this.getData("currentFilterValue").pagination){
					var retVal=this.executeMethod('onCustomRequest',networkData,params,this.getData("isSearch"),this.getData("cxPropInputValue"),this.getData("currentFilterValue")); //NO I18n
				}
		    else{
					var retVal=this.executeMethod('onCustomRequest',networkData,params,this.getData("currentFilterValue")); //NO I18n
				}
		    return retVal;
		  }
		}
  },
	requestData : function(){
		var allowThrough=true;
		for(var i=0;i<this.getData("localOptionModels").length;i++){
			if(this.getData("localOptionModels")[i].prefix==this.getData("cxPropSelectedFilterOption") && this.getData("localOptionModels")[i].cxPropOptions!=undefined){
				this.setData("localData",this.getData("localOptionModels")[i].cxPropOptions);//No I18N
				if(this.getData("localOptionModels")[i].cxPropOptions.length==0){
					allowThrough=false;
				}
			}
		}
		var promArray=[];
		var shiftPos;
		var lists =this.getData("totalList");//NO I18n
		var positions=this.getData("totalListPosition");//NO I18n
		if( this.data.cxPropShowUserOnly && this.data.currentFilterValue.model_name != "user"){
			var networkObject = this.data.cxPropNetworkData;
			promArray = store.findAll(networkObject.cxPropModuleName,{}, networkObject.cxPropCacheQuery,true, networkObject.cxPropCustomData)
		}
		Lyte.resolvePromises(promArray).then(function(res){
			if( res && (res[this.data.currentFilterValue.model_name] || res.length)){
				res=res[this.data.currentFilterValue.model_name] ? res[this.data.currentFilterValue.model_name]: res ;
				this.setData("subFilterOption",res);//no i18n
				this.setData("subFilterSelected",res[0]);//no i18n
          		this.setData("containerDataObject",this.data.userModelsOption);//no i18n
				var networkData = { cxPropModuleName : this.data.userModelsOption.model_name , cxPropCacheQuery : true , cxPropDataCache : true ,cxPropRecordId : res[0].id}
				this.setData("cxPropNetworkData",networkData);//no i18n
			}else{
				this.setData("containerDataObject",this.data.currentFilterValue);//no i18n
			}
			if(!(this.getData("currentFilterValue").cxPropOptions!=undefined && lists.length==0)){
		if(allowThrough){
			shiftPos=1;
			this.setData("preventSetValues",true);//NO I18n
			promArray = [this.constructArray.call(this,"comboBox",false)];
			 for(var x=0;x<lists.length;x++){
				 for(var w=0;w<lists[x].length;w++){
					 var currentQueryObj = {ids:lists[x][w].join(',')};//NO I18n
					 var selectedParams = this.getData('localOptionModels')[positions[x]].selectedQueryParams;//NO I18n
					 if(Object.keys(selectedParams).length){
						 for(var key in selectedParams) {
							 currentQueryObj[key] = selectedParams[key];
						 }
					 }
					 promArray.push(store.findAll(this.getData('localOptionModels')[positions[x]].model_name,currentQueryObj,false,false));
				 }
			}
		}
		else{
			shiftPos=0;
			 for(var x=0;x<lists.length;x++){
				 var currentQueryObj = {ids:lists[x].join(',')};//NO I18n
				 var selectedParams = this.getData('localOptionModels')[positions[x]].selectedQueryParams;//NO I18n
				 if(Object.keys(selectedParams).length){
					 for(var key in selectedParams) {
						 currentQueryObj[key] = selectedParams[key];
					 }
				 }
				promArray.push(store.findAll(this.getData('localOptionModels')[positions[x]].model_name,currentQueryObj,false,false));
			}
		}
			var prom = Lyte.resolvePromises(promArray);
			prom.then(function(data){
				if( this.data.cxPropShowUserOnly ){
					this.resetDisplayArray(this.getData("currentFilterValue"));//NO I18n
					this.bodydrop.querySelector("lyte-dropdown").ltProp("disabled",false);//NO I18n
	        		var selObj = [];
					var localOptions = this.getData('localOptionModels');//NO I18n
					var localLength = localOptions.length;
					for(var r=0;r<localLength;r++){
						var selectedLocalLength = localOptions[r].selectedItems.length;
						var selArr = [];
						for(var w=0;w<selectedLocalLength;w++){
	            			selArr.push(localOptions[r].selectedItems[w]);
						}
						selObj.push({"prefix" : localOptions[r].prefix , "selectedItems" : selArr});
					}
	     			this.setData("observerDelList" , selObj);//NO I18n
				}else{

				var arg,totalLength=0;
				var dataLists =this.getData("totalList");//NO I18n
				var dataPositions=this.getData("totalListPosition");//NO I18n
				for(var s=0;s<dataLists.length;s++){
						arg=[];
						for(var w=0;w<dataLists[s].length;w++){
							if(data[w+shiftPos+totalLength][this.getData('localOptionModels')[dataPositions[s]].model_name]){
								arg = arg.concat(data[w+shiftPos+totalLength][this.getData('localOptionModels')[dataPositions[s]].model_name])
							}
						}
						totalLength=totalLength+dataLists[s].length;
					 var tempArray=[];
					 for(var q=0;q<arg.length;q++){
						 Lyte.arrayUtils(this.getData('localOptionModels')[dataPositions[s]].selectedItems,"push",{type : this.getData('localOptionModels')[dataPositions[s]].model_name,name : arg[q][this.getData('localOptionModels')[dataPositions[s]].nameSelector], id : arg[q][this.getData('localOptionModels')[dataPositions[s]].idSelector],prefix : this.getData('localOptionModels')[dataPositions[s]].prefix,image : arg[q][this.getData('localOptionModels')[dataPositions[s]].imageSelector]});
						 if(this.getData("currentFilterValue").prefix==this.getData('localOptionModels')[dataPositions[s]].prefix){
							 tempArray.push(arg[q][this.getData('localOptionModels')[dataPositions[s]].idSelector]);
							 }
					 }
						this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+this.getData('localOptionModels')[dataPositions[s]].selectedItems.length); //No I18N
						// if(this.getData("currentFilterValue").prefix==this.getData('localOptionModels')[dataPositions[s]].prefix){
						// this.resetDisplayArray(this.getData('localOptionModels')[dataPositions[s]]);
					 // }
			}
				this.resetDisplayArray(this.getData("currentFilterValue"));//NO I18n
				this.bodydrop.querySelector("lyte-dropdown").ltProp("disabled",false);//NO I18n
        var selObj = [];
				var localOptions = this.getData('localOptionModels');//NO I18n
				var localLength = localOptions.length;
				for(var r=0;r<localLength;r++){
					var selectedLocalLength = localOptions[r].selectedItems.length;
					var selArr = [];
					for(var w=0;w<selectedLocalLength;w++){
             selArr.push(localOptions[r].selectedItems[w]);
					}
					selObj.push({"prefix" : localOptions[r].prefix , "selectedItems" : selArr});
				}
      this.setData("observerDelList" , selObj);//NO I18n

				}

			}.bind(this));

		}
		else{
			if(allowThrough){
				this.constructArray.call(this,"comboBox",false);//NO I18n
				this.bodydrop.querySelector("lyte-dropdown").ltProp("disabled",false);//NO I18n
			}
			else{
				this.bodydrop.querySelector("lyte-dropdown").ltProp("disabled",false);//NO I18n
			}
		}
		this.afterRequestSetOptionsProvideCase();
		}.bind(this))
		
	},
	resetDisplayArray : function(filter){
		var i,j;
		this.setData("preventSetValues",false);//NO I18n
		var networkData=this.getData("systemData"); //NO I18n
		var selected=filter.selectedItems;
		if(this.data.cxPropShowUserOnly){
			filter = this.data.userModelsOption;
			var res = [];
			selected.forEach(function(item){
				if(item.users){
					res = res.concat(item.users);
				}
			})
			selected = res;
		}


		var displayData=[]; //NO I18n
		//added the below code for display logged in user
		if(filter.model_name == "user" && filter.showLoggedinUser){
			Lyte.arrayUtils(displayData, 'push', {'full_name': _cruxUtils.getI18n("current.logged.in.user"), 'id': "${CURRENTUSER}", 'email': _cruxUtils.getI18n("current.logged.in.user.definition"), 'loggedinuser': true});
		 }
		 
  	 for(i=0;i<networkData.length;i++){
  		 Lyte.arrayUtils(displayData, 'push', networkData[i]);
  		 for(j=0;j<selected.length;j++){
  			if(networkData[i][filter.idSelector]==selected[j][filter.idSelector]){
  		 Lyte.arrayUtils(displayData, 'pop'); //NO I18n
  			}
  		 }
  	 }
		 this.setData("displayContainerData",displayData); //NO I18n
		 $L.fastdom.mutate(function(){
			 // this.setData("displayContainerData",displayData); //NO I18n
			 if(/*this.getData("noMoreRecords") &&*/ networkData.length!=0){
				 $L.fastdom.measure(function(){
					 if(this.getData("noMoreRecords") || this.getData("systemData").length<this.getData("localData").length){
						 this.checkEndOfSelection();
					 }
				 },this);
			 }
		 },this);
	},
	assignDatas : function(){
		var recipient = this.getData("cxPropRecipient"); //NO I18N
		this.setData("cxPropSelectedTags",[]); //NO I18N
		var recipientKey = this.getData("cxPropRecipient.key") ? this.getData("cxPropRecipient.key") : _cruxUtils.getI18n("crm.workflow.alert.additional.recipients"); //NO I18N
		this.setData("cxPropRecipient.key" , recipientKey); //NO I18N

		if(recipient.tags && recipient.tags.length > 0){
			var arr = [];
			for(var i = 0;i<recipient.tags.length;i++){
				if(recipient.tags[i].name){
					arr.push(recipient.tags[i].name);
					Lyte.arrayUtils(this.getData("cxPropSelectedTags"), 'push', recipient.tags[i]); //NO I18n
				}
			}
			var ulList = $L('.cxComboboxRecipientSelectedList' , this.modalWrapperElement)[0];
			if(ulList) {
				ulList.scrollTop = ulList.scrollHeight - ulList.clientHeight;
			}
		}
	},
	init : function(){
		//in this function here the option models used in the component will be formed.i.e localOptionModels and the changes for the first filter will be set.
		//old---------------------------------------------------------------------------------------------------------------
		 /**
		  * @utility toggle
		  * @author Contributor Name <name.lastname@zohocorp.com>
		  * @version 1.0.0
		  */
		// this.$node.toggle = function(){
		// 	var dropdown = this.querySelector('.mainCruxDropdown'); //no i18n
		// 	dropdown.toggle();
		// }
		 /**
		  * call this util to get the selected values in the combo box
		  * @utility getValue
		  * @version 1.0.0
		  */
		// this.$node.getValue = function(){
		// 	return JSON.parse(this.querySelector('.mainCruxDropdown').ltProp('selected')).join(',') //no i18n
		// }
		//new---------------------------------------------------------------------------------------------------------------

		var modules=this.getData('cxPropOptionModels'), //NO I18n
		customCacheQueryObject = {};
			for(var i=0;i<modules.length;i++){
				customCacheQueryObject[modules[i].prefix] = "cxComboBox_" + modules[i].prefix + "_filter"; //No I18N
			}
		// if( this.data.cxPropShowUserOnly ){
		// 	this.setData("cxPropRecipient",JSON.parse("{\"key\":\"Additional Recipients\",\"tags\":[{\"name\":\"silamburvg@gmail.com\"},{\"name\":\"test@gmail.com\"}]}"))//no i18n
		// 	this.setData("cxPropMaxLimitMsg","Maximum of 5 users/additional recipients can be selected");	//NO I18N
		// 	this.setData("cxPropNeedRecipient",true);//no i18n
		// 	var selected = "[{\"prefix\":\"G\",\"group\":{\"id\":\"111111000000056639\",\"name\":\"group1\"},\"type\":\"Groups\",\"user\":{\"id\":\"111111000000047553\",\"name\":\"testig\"},\"id\":\"111111000000056639\"},{\"prefix\":\"U\",\"user\":{\"id\":\"111111000000054485\",\"name\":\"user1\"},\"type\":\"Users\",\"id\":\"111111000000054485\"},{\"prefix\":\"R\",\"role\":{\"id\":\"111111000000045351\",\"name\":\"CEO\"},\"type\":\"Roles\",\"user\":{\"id\":\"111111000000056354\",\"name\":\"user2 \"},\"id\":\"111111000000045351\"}]";	//NO I18N
		// 	this.setData("cxPropSelected",JSON.parse(selected));//no i18n
		// }
			this.customCacheQueryObject = customCacheQueryObject;
		this.assignDatas();


		//this.setData("cxPropRecipient",{"key" : "Recipient", "tags" : [{"name" : "sindhuja.gs@zohocrop.com"},{"name" : "sasi.gowtham@zohocrop.com"},{"name" : "kamalesh.u@zohocrop.com"}]}); //NO I18N

		// if(modules.length==0){
		// 	 var filters = [];
		// 	 filters[0] = {"model_name": "user", "name": _cruxUtils.getI18n('crm.security.groups')}; //NO I18n
    // 	 filters[1] = {"model_name": "user_group", "name": _cruxUtils.getI18n('webform.status.Active')}; //NO I18n
		// 	 filters[2] = {"model_name": "role", "name": _cruxUtils.getI18n('crm.workflow.alert.roles')}; //NO I18n
    // 	 this.setData("cxPropFilterOptions", filters); //NO I18n
		// }
		// else{
			// var filters = [];
			// for(var i=0;i<modules.length;i++){
			// 		filters[i] = {"prefix": modules[i].prefix, "name":modules[i].name}; //NO I18n
			// }
			// this.setData("cxPropFilterOptions", filters); //NO I18n
		// }
		// if(this.getData("cxPropSelectedFilterOption")==''){
		// 	this.setData("cxPropSelectedFilterOption",this.getData('cxPropOptionModels')[0].prefix); //NO I18n
		// }
		// for(var i=0;i<modules.length;i++){
		// 	var tempObject={};
		// 	Lyte.Component.set(tempObject,'model_name',modules[i].model_name); //No I18N
		// 	Lyte.Component.set(tempObject,'pagination',modules[i].pagination); //No I18N
		// 	Lyte.Component.set(tempObject,'name',modules[i].name); //No I18N
		// 	Lyte.Component.set(tempObject,'prefix',modules[i].prefix); //No I18N
		// 	Lyte.Component.set(tempObject,'cxPropEmptyDataMsg',modules[i].cxPropEmptyDataMsg); //No I18N
		// 	Lyte.Component.set(tempObject,'nameSelector',modules[i].nameSelector); //No I18N
		// 	if(modules[i].idSelector==undefined){
		// 		//_primaryKey is for old version of lyte where as _pK is for new version of the lyte
		// 		Lyte.Component.set(tempObject,'idSelector',store.modelFor(modules[i].model_name)._primaryKey); //No I18N
		// 		// Lyte.Component.set(tempObject,'idSelector',store.modelFor(modules[i].model_name)._pK); //No I18N
		// 		// this.setData("cxPropPrimaryKey",store.getPrimaryKey(modules[i].model_name)); //NO I18n
		// 	}
		// 	else{
		// 		Lyte.Component.set(tempObject,'idSelector',modules[i].idSelector); //No I18N
		// 	}
		// 	if(modules[i].descriptionSelector!=undefined){
		// 		Lyte.Component.set(tempObject,'descriptionSelector',modules[i].descriptionSelector); //No I18N
		// 	}
		// 	if(modules[i].imageSelector!=undefined){
		// 		Lyte.Component.set(tempObject,'imageSelector',modules[i].imageSelector); //No I18N
		// 	}
		// 	if(modules[i].cxPropQueryParams!=undefined){
		// 		Lyte.Component.set(tempObject,'cxPropQueryParams',modules[i].cxPropQueryParams); //No I18N
		// 	}
		// 	if(modules[i].cxPropExclude!=undefined){
		// 		Lyte.Component.set(tempObject,'cxPropExclude',modules[i].cxPropExclude); //No I18N
		// 	}
		// 	if(modules[i].cxPropOptions!=undefined){
		// 		Lyte.Component.set(tempObject,'cxPropOptions',modules[i].cxPropOptions); //No I18N
		// 	}
		// 			if(modules[i].prefix==this.getData("cxPropSelectedFilterOption")){
	  //         this.setData("currentFilterValue",tempObject);//NO I18n
		// 			  }
		// 				Lyte.arrayUtils(this.getData("localOptionModels"), 'push', tempObject); //NO I18n
		// }
		// var requestFormat=this.getData("cxPropNetworkData"); //NO I18n
		// if(this.getData("currentFilterValue").cxPropExclude!=undefined){
		// 	this.setData("cxPropExclude",this.getData("currentFilterValue").cxPropExclude); //NO I18n
		// }
		// requestFormat.cxPropModuleName=this.getData("currentFilterValue").model_name; //NO I18n
		// if(!this.getData("currentFilterValue").pagination && !this.getData("currentFilterValue").cxPropOptions){
    // requestFormat.cxPropDataCache=true; //NO I18n
		// }
		// this.setData("cxPropPrimaryKey",this.getData("currentFilterValue").idSelector); //NO I18n
		// this.setData("cxPropNetworkData",requestFormat); //NO I18n
	},
	didConnect : function(){
    //old---------------------------------------------------------------------------------------------------------------
		// if(this.getData('cxPropSelected')){
		// 	this.getSelectedItems();
		// }

		// for(var i=0;i<this.getData('localOptionModels').length;i++){
		// 	if(this.getData('localOptionModels')[i].selectedItems==undefined){
		// 		Lyte.Component.set(this.getData('localOptionModels')[i],'selectedItems',[]); //No I18N
		// 	}
		// 	else{
		// 		for(var j=0;j<this.getData('localOptionModels')[i].selectedItems.length;j++){
    //      this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+1); //No I18N
		// 		}
		// 	}
		// }
		//new---------------------------------------------------------------------------------------------------------------
		this.setData("perPageValue",this.getData("cxPropPerPage")); //NO I18n
		this.setData("pageNoValue",this.getData("pageNo")); //NO I18n

		/**
		 * call this util to reset the current filter
		 * @utility fullResetCurrentFilter
		 * @author Contributor Name <name.lastname@zohocorp.com>
		 * @version 1.0.0
		 */
		this.$node.fullResetCurrentFilter = function( ) {
			this.filterObserver( this.getData("currentFilterValue").model_name ); //NO I18N
			this.resetRightPanelData( this.getData("currentFilterValue").prefix ); //NO I18N
		}.bind(this);
	},
	comboBoxOpen : function(){
		//in this function here the scroll for the dives are set as well as request for the selected filter is initiated here.

		//from init
		this.modalWrapperElement = this.$node.querySelector('lyte-modal').component.childComp;
    if(this.getData("cxPropDisableSearch")){
			this.setData("isSearchDisabled", true); //NO I18n
		}
		this.setData({"selectedUsersList" : {}, subFilterOption : []});//no i18n

		var dummyLocal=[],current={};
		var filters = [];
		var modules=this.getData('cxPropOptionModels'); //NO I18n
		for(var i=0;i<modules.length;i++){
				filters[i] = {"prefix": modules[i].prefix, "name":modules[i].name}; //NO I18n
		}
		this.setData("cxPropFilterOptions", filters); //NO I18n
		if(this.getData("cxPropSelectedFilterOption")==''){
			this.setData("cxPropSelectedFilterOption",this.getData('cxPropOptionModels')[0].prefix); //NO I18n
		}
		this.setData('setSelectedFilterOption',this.getData("cxPropSelectedFilterOption").slice());//NO I18n
		// var modules=this.getData('cxPropOptionModels'); //NO I18n
		for(var i=0;i<modules.length;i++){
			var tempObject={};
			Lyte.Component.set(tempObject,'model_name',modules[i].model_name); //No I18N
			//added the below code for display logged in user
			if(modules[i].model_name == "user"){
				if(modules[i].showLoggedinUser){
					Lyte.Component.set(tempObject,'showLoggedinUser',true); //No I18N
				}else{
					Lyte.Component.set(tempObject,'showLoggedinUser',false); //No I18N
				}
			}
			Lyte.Component.set(tempObject,'pagination',this.data.cxPropShowUserOnly?true: modules[i].pagination); //No I18N
			Lyte.Component.set(tempObject,'name',modules[i].name); //No I18N
			Lyte.Component.set(tempObject,'singular_name',modules[i].singular_name ? modules[i].singular_name : modules[i].name.toLowerCase().slice(0,-1)); //No I18N
			Lyte.Component.set(tempObject,'prefix',modules[i].prefix); //No I18N
			Lyte.Component.set(tempObject,'cxPropEmptyDataMsg',modules[i].cxPropEmptyDataMsg); //No I18N
			Lyte.Component.set(tempObject,'nameSelector',modules[i].nameSelector); //No I18N
			if(modules[i].disableSearch == undefined){
			  Lyte.Component.set(tempObject,'disableSearch',false); //No I18N
		  }else{
				Lyte.Component.set(tempObject,'disableSearch',modules[i].disableSearch); //No I18N
			}
			if(modules[i].customPagination == undefined){
				Lyte.Component.set(tempObject,'customPagination',false); //No I18N
			}else{
				Lyte.Component.set(tempObject,'customPagination',modules[i].customPagination); //No I18N
			}
			if(modules[i].idSelector==undefined){
				//_primaryKey is for old version of lyte where as _pK is for new version of the lyte
				// Lyte.Component.set(tempObject,'idSelector',store.modelFor(modules[i].model_name)._primaryKey); //No I18N
				// Lyte.Component.set(tempObject,'idSelector',store.modelFor(modules[i].model_name)._pK); //No I18N
				this.setData("cxPropPrimaryKey",store.getPrimaryKey(modules[i].model_name)); //NO I18n
				Lyte.Component.set(tempObject,'idSelector',this.getData("cxPropPrimaryKey")); //No I18N
			}
			else{
				Lyte.Component.set(tempObject,'idSelector',modules[i].idSelector); //No I18N
			}
			if(modules[i].descriptionSelector!=undefined){
				Lyte.Component.set(tempObject,'descriptionSelector',modules[i].descriptionSelector); //No I18N
			}
			if(modules[i].imageSelector!=undefined){
				Lyte.Component.set(tempObject,'imageSelector',modules[i].imageSelector); //No I18N
			}
			if(modules[i].cxPropQueryParams!=undefined){
				Lyte.Component.set(tempObject,'cxPropQueryParams',modules[i].cxPropQueryParams); //No I18N
			}
			if(modules[i].cxPropExclude!=undefined){
				Lyte.Component.set(tempObject,'cxPropExclude',modules[i].cxPropExclude); //No I18N
			}
			if(modules[i].cxPropOptions!=undefined){
				Lyte.Component.set(tempObject,'cxPropOptions',modules[i].cxPropOptions); //No I18N
			}
			Lyte.Component.set(tempObject,'hierarchyFilter',modules[i].hierarchyFilter); //No I18N
			//%%
			this.defaultCustom = false;
			if(modules[i].cxPropCustomRequest!=undefined){
				Lyte.Component.set(tempObject,'cxPropCustomRequest',modules[i].cxPropCustomRequest); //No I18N
				if(modules[i].cxPropCustomRequest){
					this.defaultCustom = true;
				}
			}else{
				Lyte.Component.set(tempObject,'cxPropCustomRequest',false); //No I18N
				if( this.data.cxPropShowUserOnly && modules[i].model_name != "user"  ){
					Lyte.Component.set(tempObject,'cxPropCustomRequest',true); //No I18N
				}
			}

			if(modules[i].selectedQueryParams!=undefined){
				Lyte.Component.set(tempObject,'selectedQueryParams',modules[i].selectedQueryParams); //No I18N
			}else{
				Lyte.Component.set(tempObject,'selectedQueryParams',{}); //No I18N
			}

			if(modules[i].maxLimitMessage!=undefined){
				Lyte.Component.set(tempObject,'maxLimitMessage',modules[i].maxLimitMessage); //No I18N
			} else {
				Lyte.Component.set(tempObject,'maxLimitMessage',""); //No I18N
			}

			if(modules[i].reqCustomData !== undefined){
				Lyte.Component.set(tempObject,'reqCustomData',modules[i].reqCustomData); //No I18N
			}

	    if(modules[i].isSubordinate!=undefined){
	        Lyte.Component.set(tempObject,'isSubordinate',modules[i].isSubordinate); //No I18N
					if(modules[i].isSubordinate){
						Lyte.Component.set(tempObject,'cxPropCustomRequest',true); //No I18N
						Lyte.Component.set(tempObject,'inbuildCustomSubReq',true); //No I18N
					}
	      } else {
	        Lyte.Component.set(tempObject,'isSubordinate',false); //No I18N
	      }

			//&&
			// Lyte.arrayUtils(this.getData("localOptionModels"), 'push', tempObject); //NO I18n
			// Lyte.arrayUtils(dummyLocal, 'push', tempObject); //NO I18n
			tempObject.localSelected = {};
			if( modules[i].model_name == "user" ){
				this.setData("userModelsOption",tempObject);//NO I18n
			}
			dummyLocal.push(tempObject); //NO I18n
					if(modules[i].prefix==this.getData("cxPropSelectedFilterOption")){
	          // this.setData("currentFilterValue",tempObject);//NO I18n
	          current=tempObject;
					  }
		}
		// Lyte.arrayUtils(this.getData("localOptionModels"), 'push', dummyLocal); //NO I18n
		this.setData("localOptionModels",dummyLocal); //NO I18n
		this.setData("currentFilterValue",current);//NO I18n
		//%%
		if(this.getData("currentFilterValue").cxPropCustomRequest){
			this.setData("cxPropCustomRequest",true);//NO I18n
		}else{
			this.setData("cxPropCustomRequest",false);//NO I18n
		}
		if(this.getData("currentFilterValue").customPagination){
			this.setData("cxPropCustomPagination",true);//NO I18n
		}else{
			this.setData("cxPropCustomPagination",false);//NO I18n
		}
		if(this.getData("cxPropDisableSearch")){
			this.setData("isSearchDisabled" , true);//NO I18n
		}else{
			if(this.getData("currentFilterValue").disableSearch){
				this.setData("isSearchDisabled",true);//NO I18n
			}else{
				this.setData("isSearchDisabled",false);//NO I18n
			}
		}
		//&&
		if(this.getData("currentFilterValue").cxPropExclude!=undefined){
			this.setData("cxPropExclude",this.getData("currentFilterValue").cxPropExclude); //NO I18n
		}
		var requestFormat=this.getData("cxPropNetworkData"); //NO I18n
		requestFormat.cxPropModuleName=this.getData("currentFilterValue").model_name; //NO I18n
		if(!this.getData("currentFilterValue").pagination && !this.getData("currentFilterValue").cxPropOptions){
    		requestFormat.cxPropDataCache=true; //NO I18n
			requestFormat.cxPropCacheQuery=this.customCacheQueryObject[this.data.currentFilterValue.prefix]; //NO I18n
		}

		this.setData("cxPropPrimaryKey",this.getData("currentFilterValue").idSelector); //NO I18n
		delete requestFormat.cxPropCustomData;
		if(this.data.currentFilterValue.reqCustomData){
			requestFormat.cxPropCustomData = this.data.currentFilterValue.reqCustomData;
		} else {
			requestFormat.cxPropCustomData = {"cxComboBox" : "prevent"}; //NO I18N
		}
		this.setData("cxPropNetworkData",requestFormat); //NO I18n
		//end of from init
		// $L('.user-selection-content').scroll({showOn : 'scroll'}); //NO I18n
		$L('.user-lists-container' , this.modalWrapperElement).scroll({showOn : 'hover'}); //NO I18n
		$L('.selected-user-list-container' , this.modalWrapperElement).scroll({showOn : 'hover'}); //NO I18n
		this.setData("filterChange",true);//NO I18n
		for(var i=0;i<this.getData('localOptionModels').length;i++){
 		if(this.getData('localOptionModels')[i].selectedItems==undefined){
 			Lyte.Component.set(this.getData('localOptionModels')[i],'selectedItems',[]); //No I18N
 		}
 		if(this.data.cxPropShowUserOnly && this.getData('localOptionModels')[i].cxPropQueryParams==undefined && this.data.userModelsOption.cxPropQueryParams != undefined){
 			Lyte.Component.set(this.getData('localOptionModels')[i],'cxPropQueryParams',this.data.userModelsOption.cxPropQueryParams); //No I18N
 		}
 	}
	this.bodydrop.querySelector("lyte-dropdown").ltProp("disabled",true);//NO I18n
	var data=this.getData("cxPropSelected");//NO I18n
	this.setData("initialSelected",data.slice());//NO I18n
	// if(this.getData('localRecipient').length > 0 ){
	// 	this.setData("cxPropRecipient.tags",[]); //NO I18N
	// 	for(var i = 0;i < this.getData('localRecipient').length;i++ ){
	// 		Lyte.arrayUtils(this.getData("cxPropRecipient.tags"), 'push', {name : this.getData('localRecipient')[i]}); //NO I18n
	// 	}

	// }

 	 this.preSelectedHandeling();//NO I18n
	 // var allowThrough=true;
	 // for(var i=0;i<this.getData("localOptionModels").length;i++){
		//  if(this.getData("localOptionModels")[i].prefix==this.getData("cxPropSelectedFilterOption") && this.getData("localOptionModels")[i].cxPropOptions!=undefined){
		// 	 this.setData("localData",this.getData("localOptionModels")[i].cxPropOptions);//No I18N
		// 	 if(this.getData("localOptionModels")[i].cxPropOptions.length==0){
		// 		 allowThrough=false;
		// 	 }
		//  }
	 // }
	 // if(allowThrough){
		//  this.constructArray.call(this,"comboBox",false); //NO I18n
	 // }
	 /**TEMPORARILY MOVED AS A FUNCTION BELOW IF CONDITION NAME afterRequestSetOptionsProvideCase 
			 if(this.getData('currentFilterValue').cxPropOptions!=undefined){
				 // if(this.getData("systemData").length==this.getData("localData").length){
					//  this.setData("noMoreRecords",false);//NO I18n
				 // }
				 // if(this.getData("currentFilterValue").pagination==false){
					 var current=this.getData("currentFilterValue");//NO I18n
					 var excludeLength=0;
					 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
				 //   excludeLength=current.cxPropExclude.length;
					 // }
					 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
					 if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
						 this.setData("noMoreRecords",false);//NO I18n
					 }
				// }
				 this.setData("filterChange",false);//NO I18n
				 this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
				 this.setValues();
			 }*/
	 //This way of calling the getAllHeights of the accordian is temporary until accordian can handle dynamic heights
	 setTimeout(function(){
		 this.bodydrop.querySelector('lyte-accordion').component.getAllHeights(); //NO I18n
	 }.bind(this),500);
	},
	afterRequestSetOptionsProvideCase : function(){
		if(this.getData('currentFilterValue').cxPropOptions!=undefined){
				//var current=this.getData("currentFilterValue");//NO I18n
				var excludeLength=0;
				excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
				if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
					this.setData("noMoreRecords",false);//NO I18n
				}
			this.setData("filterChange",false);//NO I18n
			this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
			this.setValues();
		}
	},
	handleErrorOnRequest: function(){
		//this is a callback from the mixin this is set value to show proper result if an error occurs in the search
		this.setData( {
			systemData : [],
			searchLoading : false,
			filterChange : this.data.filterChange ? false : this.data.filterChange
		})
		this.setValues();
	},
	errorOnRequest: function(){
		this.handleErrorOnRequest();
	},
	errorOnSearch : function(){
		this.handleErrorOnRequest();
	},
	setSubordinateQp : function(){
		if( this.getData("currentFilterValue").hierarchyFilter ){
			return this.getData("currentFilterValue").hierarchyFilter;
		}
	    if(this.getData("currentFilterValue").isSubordinate){
					var newQueryParams = {};
					newQueryParams.feature = "subordinates";//No I18N
					newQueryParams.related_entity_id = Crm.userDetails.USER_ID;
					return newQueryParams;
	    } else {
	      return undefined;
	    }
	},
	setValues : function(from){
		//this function will set the values to be displayed in the dom.
		var i,j;
 	 var filter=this.getData("currentFilterValue"); //NO I18n
 	 var options=this.getData('localOptionModels'); //NO I18n
 	 var networkData=this.getData("systemData"); //NO I18n
 	 var displayData=[]; //NO I18n
 	 for(i=0;i<options.length;i++){
 			 if(options[i].prefix==filter.prefix){
 				 break;
 			 }
 	 }
	 if(this.getData("currentFilterValue").pagination==false){
		 var current=this.getData("currentFilterValue");//NO I18n
		 var excludeLength=0;
		 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
     //   excludeLength=current.cxPropExclude.length;
		 // }
		 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
 		if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
 			this.setData("noMoreRecords",false);//NO I18n
 		}
	}
 	 var selected=options[i].selectedItems;
	 //added the below code for display logged in user
	 if(options[i].model_name == "user" && options[i].showLoggedinUser){
		Lyte.arrayUtils(displayData, 'push', {'full_name': _cruxUtils.getI18n("current.logged.in.user"), 'id': "${CURRENTUSER}", 'email': _cruxUtils.getI18n("current.logged.in.user.definition"), 'loggedinuser': true});
	 }
	 
 	 for(i=0;i<networkData.length;i++){
 		 Lyte.arrayUtils(displayData, 'push', networkData[i]);
 		 for(j=0;j<selected.length;j++){
 		 	if( this.data.cxPropShowUserOnly ){
 		 		var userList = selected[j].users;
 		 		for(var k=0;k<userList.length;k++){
 		 			if(networkData[i][this.data.userModelsOption.idSelector]==userList[k][this.data.userModelsOption.idSelector]){
		 		 		Lyte.arrayUtils(displayData, 'pop'); //NO I18n
		 			}
 		 		}
 		 	}else if(networkData[i][filter.idSelector]==selected[j][filter.idSelector]){
 		 		Lyte.arrayUtils(displayData, 'pop'); //NO I18n
 			}
 		 }
 	 }
	 this.setData("displayContainerData",displayData); //NO I18n
	 $L.fastdom.mutate(function(){
		 // this.setData("displayContainerData",displayData); //NO I18n
		 if(/*this.getData("noMoreRecords") &&*/ networkData.length!=0){
			 $L.fastdom.measure(function(){
				 var recordsAvailableinClient = (this.data.systemData.length + this.data.currentlyExcludedArray.length ) < this.data.localData.length;
				 if( recordsAvailableinClient || (!recordsAvailableinClient && this.data.noMoreRecords) ){
					 this.checkEndOfSelection();
				 }
			 },this);
		 }
	 },this);

	},
	loadMoreData : function(){
		//this is a callback from the mixin which will be invoked after the network request has been received. here all the loading values will be reset.
		// if(this.getData("currentFilterValue").pagination==false){
		// 	if(this.getData("systemData").length==this.getData("localData").length){
		// 		this.setData("noMoreRecords",false);//NO I18n
		// 	}
		if(this.getData("currentFilterValue").customPagination){
			if(this.getMethods('afterRequest')){ //NO I18n
				 /**
				  * @method afterRequest
				  * @author Contributor Name <name.lastname@zohocorp.com>
				  * @version 1.0.0
				  * @param { * } arguments[0]
				  */
				var criterias=this.executeMethod('afterRequest', arguments[0]); //NO I18n
			}
		}
		  this.setData("preventFutherRequest",false);//NO I18n
			if(this.getData("currentFilterValue").pagination==false){
	 		 var current=this.getData("currentFilterValue");//NO I18n
	 		 var excludeLength=0;
	 		 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
	     //    excludeLength=current.cxPropExclude.length;
	 		 // }
			 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
	  		if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
	  			this.setData("noMoreRecords",false);//NO I18n
	  		}
	 	  }
  		for(var j=0;j<this.getData('localOptionModels').length;j++){
  			if(this.getData('localOptionModels')[j].prefix==this.getData("currentFilterValue").prefix){
  				this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
  			}
  		}
  	// }
		// this.setData("filterChange",false);//NO I18n
		// this.setData("searchLoading",false);//NO I18n
		// this.setData("scrollLoading",false);//NO I18n
		if(!this.getData("preventSetValues")){
			this.setValues();
			this.setData("filterChange",false);//NO I18n
			this.setData("searchLoading",false);//NO I18n
			this.setData("scrollLoading",false);//NO I18n
		}else{
			this.setData("filterChange",false);//NO I18n
			this.setData("searchLoading",false);//NO I18n
			this.setData("scrollLoading",false);//NO I18n
		}
	},
	setCriteria : function( filterValue ){
		//this is a callback from the mixin where the queryParams are formed here.
		var ret={},
		resultRet,
		currFilterValue = filterValue ? filterValue : this.getData("currentFilterValue"); //NO I18N
		var queryParams= currFilterValue.cxPropQueryParams;
		for(var key in queryParams) {
		ret[key] = queryParams[key];
		}

		var subQp = this.setSubordinateQp();
		if(subQp){
			for(var key in subQp) {
				ret[key] = subQp[key];
			}
		}

		if(!this.getData("isSearch")){
					if(!currFilterValue.pagination){
						/*var queryParams=this.getData("currentFilterValue").cxPropQueryParams; //NO I18n
				    for(var key in queryParams) {
				    ret[key] = queryParams[key];
					}*/
						if(this.getMethods('setQueryParams')){ //NO I18n
							  /**
							   * @method setQueryParams
							   * @author Contributor Name <name.lastname@zohocorp.com>
							   * @version 1.0.0
							   * @param { * } ret
							   * @param { * } currFilterValue
							   * @param { * } false
							   */
							resultRet = this.executeMethod('setQueryParams',ret,currFilterValue,false); //NO I18n
							if(resultRet != undefined || resultRet != null){
								ret = resultRet;
							}
						 }
						this.setData("cxPropPerPage",0); //NO I18n
						this.setData("pageNo",0); //NO I18n
					}else{
						/*var queryParams=this.getData("currentFilterValue").cxPropQueryParams; //NO I18n
				    for(var key in queryParams) {
				    ret[key] = queryParams[key];
					}*/
						if(this.getData("cxPropPerPage")==0){
							this.setData("cxPropPerPage",this.getData("perPageValue")); //NO I18n
						}
						if(this.getData("pageNo")==0){
							this.setData("pageNo",this.getData("pageNoValue")); //NO I18n
						}
						if(this.getMethods('setQueryParams')){ //NO I18n
							  /**
							   * @method setQueryParams
							   * @author Contributor Name <name.lastname@zohocorp.com>
							   * @version 1.0.0
							   * @param { * } ret
							   * @param { * } currFilterValue
							   * @param { * } false
							   */
							resultRet = this.executeMethod('setQueryParams',ret,currFilterValue,false); //NO I18n
							if(resultRet != undefined || resultRet != null){
								ret = resultRet;
							}
						 }
					}
					return ret;
	  }
		else{
			var currFill = currFilterValue;
			if(currFill.pagination==true){
				var resultData=this.escapeString.call(this,this.getData("cxPropInputValue")); //NO I18n
				var criterias;
				if(this.getMethods('setSearchCriteria')){ //NO I18n
					/**
					 * @method setSearchCriteria
					 * @author Contributor Name <name.lastname@zohocorp.com>
					 * @version 1.0.0
					 * @param { * } resultData
					 * @param { * } currFill
					 */
					criterias=this.executeMethod('setSearchCriteria',resultData,currFill); //NO I18n
				 }
				  if(currFill.isSubordinate){
						for(var key in criterias){
							ret[key] = criterias[key];
						}
					} else if(typeof ret === "object" && ret !== null){
							ret.criteria = criterias
						//ret={criteria : criterias};
					} else {
						ret={criteria : criterias};
					}

					/*var queryParams=currFill.cxPropQueryParams;
					for(var key in queryParams) {
						ret[key] = queryParams[key];
					}*/
					if(this.getMethods('setQueryParams')){ //NO I18n
						  /**
						   * @method setQueryParams
						   * @author Contributor Name <name.lastname@zohocorp.com>
						   * @version 1.0.0
						   * @param { * } ret
						   * @param { * } currFill
						   * @param { * } true
						   */
						resultRet = this.executeMethod('setQueryParams',ret,currFill,true); //NO I18n
						if(resultRet != undefined || resultRet != null){
							ret = resultRet;
						}
				 	}
  			return ret;
			}
		}
	},
	endKeyUpSearch : function(){
		if(this.getMethods('onClearSearch')){ //NO I18n
			/**
			 * @method onClearSearch
			 * @author Contributor Name <name.lastname@zohocorp.com>
			 * @version 1.0.0
			 */
			this.executeMethod('onClearSearch'); //NO I18n
	 }
	},
	performKeyUpSearch : function(evt , inputValue){
		if(this.getMethods('onSearch')){ //NO I18n
			/**
			 * @method onSearch
			 * @author Contributor Name <name.lastname@zohocorp.com>
			 * @version 1.0.0
			 * @param { * } this.getData("currentFilterValue")
			 * @param { * } evt
			 * @param { * } inputValue
			 */
			this.executeMethod('onSearch' , this.getData("currentFilterValue") , evt , inputValue); //NO I18n
	 }
	},
	resetRightPanelData : function( filter ){
		var localOptionModels = this.data.localOptionModels;
		for( var i = 0, optionsLen = localOptionModels.length; i < optionsLen; i++ ){
			if( localOptionModels[i].prefix === filter ){
				var currentOption = localOptionModels[i],
				selectedList = currentOption.selectedItems;
				var selectedListLen = selectedList.length;
				while( selectedListLen > 0 ){
					this.removeSingleItemFromList( i, 0 );
					selectedListLen = selectedListLen - 1;
				}
			}
		}
	},
	removeSingleItemFromList : function( optionPos, selectedPos, type, usrPos , userId ){
		this.preventSelObs = true;
		if(type === 'Recipient') {
			var recipientArr = this.getData("cxPropRecipient").tags; //NO I18N
			var removedTag = Lyte.arrayUtils(recipientArr, 'removeAt', selectedPos, 1); //NO I18N
			//Lyte.arrayUtils(this.getData("cxPropSelectedTags"),'removeAt',selectedPos, 1); //NO I18N
			if(this.getMethods('onRemoveTag')){ //NO I18n
				/**
				 * @method onRemoveTag
				 * @author Contributor Name <name.lastname@zohocorp.com>
				 * @version 1.0.0
				 * @param { * } removedTag[0]
				 * @param { * } true
				 */
				this.executeMethod('onRemoveTag', removedTag[0], true); //NO I18n
			}
			this.setData("cxPropSaveButtonDisabledState", false); //NO I18N
			//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",false); //NO I18n
			this.setData("cxPropTotalRecipientCount.count",this.getData("cxPropTotalRecipientCount.count") - 1); //NO I18N
		} else {
			var continueToRemove = true;
			if(this.getMethods('onRemove')){ //NO I18n

	   			if(this.data.cxPropShowUserOnly){
	   				/**
	   				 * @method onRemove
	   				 * @author Contributor Name <name.lastname@zohocorp.com>
	   				 * @version 1.0.0
	   				 * @param { * } this.getData('localOptionModels')[optionPos].selectedItems[selectedPos]
	   				 * @param { * } this.getData('localOptionModels')[optionPos].selectedItems
	   				 * @param { * } this.getData('localOptionModels')
	   				 * @param { * } this.$node
	   				 * @param { * } this.getData("currentFilterValue")
	   				 * @param { * } this.getData('localOptionModels')[optionPos].selectedItems[selectedPos].users[usrPos]
	   				 */
	   				continueToRemove=this.executeMethod('onRemove',this.getData('localOptionModels')[optionPos].selectedItems[selectedPos],this.getData('localOptionModels')[optionPos].selectedItems,this.getData('localOptionModels'),this.$node,this.getData("currentFilterValue"), this.getData('localOptionModels')[optionPos].selectedItems[selectedPos].users[usrPos]); //NO I18n
	   			}else{
	   				/**
	   				 * @method onRemove
	   				 * @author Contributor Name <name.lastname@zohocorp.com>
	   				 * @version 1.0.0
	   				 * @param { * } this.getData('localOptionModels')[optionPos].selectedItems[selectedPos]
	   				 * @param { * } this.getData('localOptionModels')[optionPos].selectedItems
	   				 * @param { * } this.getData('localOptionModels')
	   				 * @param { * } this.$node
	   				 * @param { * } this.getData("currentFilterValue")
	   				 */
	   				continueToRemove=this.executeMethod('onRemove',this.getData('localOptionModels')[optionPos].selectedItems[selectedPos],this.getData('localOptionModels')[optionPos].selectedItems,this.getData('localOptionModels'),this.$node,this.getData("currentFilterValue")); //NO I18n
	   			}
	   		  
				if(continueToRemove === undefined || continueToRemove === null){
					continueToRemove = true;
				}
	    	}
			if(continueToRemove){
				var obsList,
				obsListLen;

				if(!this.data.cxPropShowUserOnly){
      				obsList = this.getData("observerDelList"); //NO I18n
					obsListLen = obsList.length;

       				for(var e = 0 ; e < obsListLen ; e++){
        				if(this.getData('localOptionModels')[optionPos].prefix === obsList[e].prefix){
							var observedItems = obsList[e].selectedItems;
							var observedItemsLength = observedItems.length;
          					for(var k = 0 ; k < observedItemsLength ; k++){
								if(this.getData('localOptionModels')[optionPos].selectedItems[selectedPos][this.getData("currentFilterValue").idSelector] === observedItems[k][this.getData("currentFilterValue").idSelector]){
									Lyte.arrayUtils(this.getData("cxPropDeletedList"), 'push', observedItems[k]);//NO I18n
									break;
								}
				     		}
							break;
				   		}
			  		}
				} else if(this.data.selectedUsersList[userId]) {
					Lyte.arrayUtils(this.getData("cxPropDeletedList"), 'push', this.data.selectedUsersList[userId]); //NO I18n
				}

				obsList = this.getData("cxPropNewSelectedList"); //NO I18n
				obsListLen = obsList.length; 

				var doDeletion = this.data.cxPropShowUserOnly  ? false : true, 
				options = this.getData('localOptionModels'), //NO I18n
				filter = this.getData("currentFilterValue"),//NO I18n
				isConditon;

				for(var eq = 0 ; eq < obsListLen ; eq++){
				 	isConditon = options[optionPos].prefix === obsList[eq].prefix && options[optionPos].selectedItems[selectedPos][filter.idSelector] === obsList[eq][filter.idSelector];
				 	if( this.data.cxPropShowUserOnly ){
				 		if( this.data.cxPropShowUserOnly && obsList[eq].prefix === this.data.userModelsOption.prefix){
				 			isConditon = options[optionPos].selectedItems[selectedPos].users[usrPos].id === obsList[eq][filter.idSelector];
				 		}
				 		if(isConditon && obsList[eq].user && obsList[eq].user.id === userId ){
				 			Lyte.objectUtils(this.data.selectedUsersList,"delete",userId);//NO I18n
							Lyte.arrayUtils(options[optionPos].selectedItems[selectedPos].users, 'removeAt', usrPos ,1);//NO I18n
							if( !options[optionPos].selectedItems[selectedPos].users.length ){
				 				doDeletion = true;
				 			}
				 			Lyte.arrayUtils(this.getData("cxPropNewSelectedList"), 'removeAt', eq ,1);//NO I18n
			 				break;
				 		}
				 	} else if(isConditon) {
				 		Lyte.arrayUtils(this.getData("cxPropNewSelectedList"), 'removeAt', eq ,1);//NO I18n
						break;
					}
				}
				if(!this.getData("cxPropFooterYield")){
					this.setData("cxPropSaveButtonDisabledState", false); //NO I18N
					//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",false); //NO I18n
				}
				this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount") - 1); //No I18N
				// var options=this.getData('localOptionModels'); //NO I18n
				for(var r = 0, selLen = this.getData("cxPropSelected").length; r < selLen; r++){
					isConditon = options[optionPos].selectedItems[selectedPos].id === this.getData("cxPropSelected")[r].id;
					if(this.data.cxPropShowUserOnly){
						if( this.getData("cxPropSelected")[r].prefix === this.data.userModelsOption.prefix && options[optionPos].selectedItems[selectedPos].prefix === this.data.userModelsOption.prefix){
					 		if( !options[optionPos].selectedItems[selectedPos].users.length ) {
					 			Lyte.arrayUtils(this.getData("cxPropSelected"), 'removeAt', r, 1); //NO I18n
					 		} else if(options[optionPos].selectedItems[selectedPos].users[usrPos]) {
					 			isConditon = options[optionPos].selectedItems[selectedPos].users[usrPos].id === this.getData("cxPropSelected")[r].user.id; //NO I18n
					 		}
				 		}
				 		if( isConditon && this.data.selectedUsersList[userId] ){
				 			Lyte.objectUtils(this.data.selectedUsersList,"delete",userId); //NO I18n
							Lyte.arrayUtils(options[optionPos].selectedItems[selectedPos].users, 'removeAt', usrPos ,1);//NO I18n
							if( !options[optionPos].selectedItems[selectedPos].users.length ){
				 				doDeletion = true;
							}
				 		}
				 		if( this.getData("cxPropSelected")[r] && this.getData("cxPropSelected")[r].user && this.getData("cxPropSelected")[r].user.id === userId  ){
							Lyte.arrayUtils(this.getData("cxPropSelected"), 'removeAt', r, 1); //NO I18n
							break;
						}
					} else if(isConditon) {
						Lyte.arrayUtils(this.getData("cxPropSelected"), 'removeAt', r, 1); //NO I18n
						break;
					}
					// if( this.data.cxPropShowUserOnly && this.getData("cxPropSelected")[r].prefix == this.data.userModelsOption.prefix){
				 	// 		if( !options[optionPos].selectedItems[selectedPos].users.length ){
					// 			Lyte.arrayUtils(this.getData("cxPropSelected"), 'removeAt', r, 1);//NO I18n
					// 		}else{
					// 			isConditon = options[optionPos].selectedItems[selectedPos].users[usrPos].id == this.getData("cxPropSelected")[r].user.id;
					// 		}
					// 	}
					// if( isConditon && ( !this.data.cxPropShowUserOnly ||  (this.data.cxPropShowUserOnly && this.getData("cxPropSelected")[r].user && this.getData("cxPropSelected")[r].user.id == userId) ) ){
					// 	if(this.data.cxPropShowUserOnly && this.data.selectedUsersList[userId]){
					// 		Lyte.objectUtils(this.data.selectedUsersList,"delete",userId)//NO I18n
					// 		Lyte.arrayUtils(options[optionPos].selectedItems[selectedPos].users, 'removeAt', usrPos ,1);//NO I18n
					// 		if( !options[optionPos].selectedItems[selectedPos].users.length ){
					// 				doDeletion = true
					// 			}
					// 	}
					// 	Lyte.arrayUtils(this.getData("cxPropSelected"), 'removeAt', r, 1);//NO I18n
					// 	break;
					// }
				}
				if( doDeletion ){
					Lyte.arrayUtils(options[optionPos].selectedItems, 'removeAt', selectedPos, 1);	
				}
				if(this.getData("currentFilterValue").prefix === options[optionPos].prefix){
					filter = this.data.cxPropShowUserOnly ? this.data.userModelsOption : this.getData("currentFilterValue"); //NO I18n
					var i,
					j,
		  			networkData = this.getData("systemData"), //NO I18n
		  			displayData = [],
		  			selected=  options[optionPos].selectedItems,
					nwDataLen = networkData.length,
					seleLen = selected.length;

					//added the below code for display logged in user
					if(options[optionPos].model_name == "user" && options[optionPos].showLoggedinUser){
						Lyte.arrayUtils(displayData, 'push', {'full_name': _cruxUtils.getI18n("current.logged.in.user"), 'id': "${CURRENTUSER}", 'email': _cruxUtils.getI18n("current.logged.in.user.definition"), 'loggedinuser': true});
					}
		  			for( i = 0; i < nwDataLen; i++){
		  				Lyte.arrayUtils(displayData, 'push', networkData[i]);
		  				for( j = 0; j < seleLen; j++ ){
							if( this.data.cxPropShowUserOnly && ( selected[j].users && selected[j].users && selected[j].users.filter(usr=>usr.id === networkData[i].id).length  ) ){
								Lyte.arrayUtils(displayData, 'pop'); //NO I18n
							} else if(networkData[i][filter.idSelector] === selected[j][filter.idSelector]){
								Lyte.arrayUtils(displayData, 'pop'); //NO I18n
							}
		  				}
		  			}
					this.setData("localOptionModels",options); //No I18n
		  			this.setData("displayContainerData",displayData); //NO I18n
				}
			}
			this.bodydrop.querySelector('lyte-accordion').component.getAllHeights(); //NO I18n
		}
		delete this.preventSelObs;
	},
	filterObserver : function(filterName,from){
		//this function will be alled whenever there is a change of the filter , here values are set to transition to next filter by making the request or etc.
    // this.setData("noMoreRecords",true);//NO I18n
		//%%
		if(this.getData("currentFilterValue").cxPropCustomRequest){
			this.setData("cxPropCustomRequest",true);//NO I18n
		}else{
			this.setData("cxPropCustomRequest",false);//NO I18n
		}
		if(this.getData("currentFilterValue").customPagination){
			this.setData("cxPropCustomPagination",true);//NO I18n
		}else{
			this.setData("cxPropCustomPagination",false);//NO I18n
		}
		if(this.getData("cxPropDisableSearch")){
			this.setData("isSearchDisabled" , true);//NO I18n
		}else{
			if(this.getData("currentFilterValue").disableSearch){
				this.setData("isSearchDisabled",true);//NO I18n
			}else{
				this.setData("isSearchDisabled",false);//NO I18n
			}
		}

		//&&
		this.setData("currentlyExcludedArray",[]); //NO I18n
		this.setData("scrollLoading",false);//NO I18n
		this.setData("filterChange",true);//NO I18n
	 var requestFormat=this.getData("cxPropNetworkData"); //NO I18n
 	 requestFormat.cxPropModuleName=filterName; //NO I18n
	 requestFormat.cxPropCacheQuery=true;
	 requestFormat.cxPropRecordId = ""
	 if(!this.getData("currentFilterValue").pagination && !this.getData("currentFilterValue").cxPropOptions){
	 requestFormat.cxPropDataCache=true; //NO I18n
	 requestFormat.cxPropCacheQuery=this.customCacheQueryObject[this.data.currentFilterValue.prefix]; //NO I18n
	 }
	 else{
		 requestFormat.cxPropDataCache=false;
	 }
	 delete requestFormat.cxPropCustomData;
	 if(this.data.currentFilterValue.reqCustomData){
		requestFormat.cxPropCustomData = this.data.currentFilterValue.reqCustomData;
	 } else {
		requestFormat.cxPropCustomData = {"cxComboBox" : "prevent"}; //NO I18N
	 }
 	 this.setData("cxPropNetworkData",requestFormat); //NO I18n
	 this.setData("displayContainerData",[]);//NO I18n
	 var setScroll=this.bodydrop.querySelector('.user-lists-container'); //NO I18n
	 if(setScroll!=null){
    this.setData("setScrolling",true);//NO I18n
		setScroll.scrollTop=0;
	 }
	 this.setData("cxPropInputValue",""); //no i18n
	 this.setData("searchLoading",false);//NO I18n
	 this.setData("isSearch",false);//NO I18n
 	 this.setData("systemData",[]); //NO I18n
 	 this.setData("localData",[]); //NO I18n
	 this.setData("currentPos",0); //NO I18n
	 this.setData("pageNo",1); //NO I18n
	 this.setData("noMoreRecords",true); //NO I18n
	 this.setData("preventSetOfNoMoreData",true); //NO I18n
	 if(!this.getData("cxPropNoMoreData")){
		 this.setData("preventSetOfNoMoreData",false); //NO I18n
	 }
	 this.setData("cxPropNoMoreData" , false); //NO I18n
	 var allowThrough= from == "subFilter"?false:true;//NO I18n
	 if(this.getData("currentFilterValue").pagination==false){
		 for(var j=0;j<this.getData('localOptionModels').length;j++){
			 if(this.getData('localOptionModels')[j].prefix==this.getData("currentFilterValue").prefix){
				 if(this.getData("localOptionModels")[j].cxPropOptions!=undefined){
					 this.setData("localData",this.getData("localOptionModels")[j].cxPropOptions);//No I18N
					 // this.setData("noMoreRecords",false);//NO I18n
					 this.setData("filterChange",false);//NO I18n
					 if(this.getData("localOptionModels")[j].cxPropOptions.length==0){
						 allowThrough=false;
					 }
					 break;
				 }
			 }
		 }
	 }
	 if(allowThrough){
	 	var promArray = []
	 	if( this.data.cxPropShowUserOnly && this.data.currentFilterValue.model_name != "user"){
			var networkObject = this.data.cxPropNetworkData;
			promArray = store.findAll(networkObject.cxPropModuleName,{}, networkObject.cxPropCacheQuery, true, networkObject.cxPropCustomData) 
		}
		Lyte.resolvePromises(promArray).then(function(res){
			if( res && (res[this.data.currentFilterValue.model_name] || res.length) ){
				res=res[this.data.currentFilterValue.model_name] ? res[this.data.currentFilterValue.model_name]: res ;
				this.setData("subFilterOption",res);//no i18n
				this.setData("subFilterSelected",res[0]);//no i18n
          		this.setData("containerDataObject",this.data.userModelsOption);//no i18n
				var networkData = { cxPropModuleName : this.data.userModelsOption.model_name , cxPropCacheQuery : true , cxPropDataCache : true ,cxPropRecordId : res[0].id}
				this.setData("cxPropNetworkData",networkData);//no i18n
			}else{
				this.setData("containerDataObject",this.data.currentFilterValue);//no i18n
			}
			this.constructArray.call(this,"combobox",false) //NO I18n
			for(var j=0;j<this.getData('localOptionModels').length;j++){
				if(this.getData('localOptionModels')[j].prefix==this.getData("currentFilterValue").prefix){
					this.afterRequestSetOptionsProvideCaseTwo(j);
				}
			}
		}.bind(this))
		
	 }
	 /**TEMPORARILY MOVED AS A FUNCTION BELOW IF CONDITION NAME afterRequestSetOptionsProvideCaseTwo
			 for(var j=0;j<this.getData('localOptionModels').length;j++){
				 if(this.getData('localOptionModels')[j].prefix==this.getData("currentFilterValue").prefix){
					 //this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
					 if(this.getData("localOptionModels")[j].cxPropOptions!=undefined){
						 // if(this.getData("systemData").length==this.getData("localData").length){
							//  this.setData("noMoreRecords",false);//NO I18n
						 // }
						 // if(this.getData("currentFilterValue").pagination==false){
							 var current=this.getData("currentFilterValue");//NO I18n
							 var excludeLength=0;
							 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
						 //   excludeLength=current.cxPropExclude.length;
							 // }
							 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
							 if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
								 this.setData("noMoreRecords",false);//NO I18n
							 }
						// }
						 this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
						this.setValues(); //NO I18n
					 }
				 }
			 }*/
	},
	afterRequestSetOptionsProvideCaseTwo : function(j){
		/*for(var j=0;j<this.getData('localOptionModels').length;j++){
			if(this.getData('localOptionModels')[j].prefix==this.getData("currentFilterValue").prefix){*/
				if(this.getData("localOptionModels")[j].cxPropOptions!=undefined){
						//var current=this.getData("currentFilterValue");//NO I18n
						var excludeLength=0;
						excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
						if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
							this.setData("noMoreRecords",false);//NO I18n
						}
					this.setData("searchNonPaginationData",this.getData("localData"));//no i18n
				   this.setValues(); //NO I18n
				}
			/*}
		}*/
	},
	comboBoxClose : function(){
		//this function will set the values for the component to close.

		this.setData("isSearchDisabled", false); //NO I18n
		if(!this.getData("cxPropFooterYield")){
			this.setData("cxPropSaveButtonDisabledState", true); //NO I18N
			//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",true); //NO I18n
		}
		if(this.getData("showAddRecipient")){
			this.setData("showAddRecipient",false); //NO I18N
		}

		this.setData("currentlyExcludedArray",[]); //NO I18n
		this.setData("saveClosing",false);//NO I18n
		this.setData("totalList",[]);//NO I18n
		this.setData("totalListPosition",[]);//NO I18n
		var selectedScroll=this.bodydrop.querySelector('.selected-user-list-container'); //NO I18n
		var listScroll=this.bodydrop.querySelector('.user-lists-container'); //NO I18n
 	 if(selectedScroll!=null){
     this.setData("setScrolling",true);//NO I18n
 		selectedScroll.scrollTop=0;
 	 }
 	 if(listScroll!=null){
     this.setData("setScrolling",true);//NO I18n
 		listScroll.scrollTop=0;
 	 }
		this.setData("preventShowCalling",false);//No I18n
		this.setData("setScrolling",false);//No I18n
		this.setData("cxPropInputValue",""); //no i18n
		this.setData("isSearch",false) //no i18n
 	 this.setData("displayContainerData",[]); //No I18n
	 var data=this.getData("localOptionModels"); //NO I18n
 	 for(var i=0;i<data.length;i++){
		 Lyte.arrayUtils(data[i].selectedItems, 'removeAt', 0, data[i].selectedItems.length);
	 }
	 this.setData("totalSelectedItemsCount",0);//No I18n
	 this.setData("localOptionModels",data);//No I18n
	 this.setData("localOptionModels",[]);//No I18n
	// this.setData("cxPropRecipient.tags",this.getData("initialTags")); //NO I18N
 	 this.setData("localClose",false); //NO I18n
	 var networkData=this.getData("cxPropNetworkData");//NO I18n
	 networkData.cxPropModuleName=this.getData("currentFilterValue").model_name; //NO I18n
	 this.setData("cxPropNetworkData",networkData); //NO I18n
   this.setData("systemData",[]); //NO I18n
	 this.setData("localData",[]); //NO I18n
   this.setData("currentPos",0); //NO I18n
	 this.setData("pageNo",1); //NO I18n
 	 this.setData("noMoreRecords",true); //NO I18n
	 this.setData("preventSetOfNoMoreData",true); //NO I18n
	 this.setData("cxPropNoMoreData" , false); //NO I18n
	 this.setData("cxPropNewSelectedList",[]);//no i18n
	 this.bodydrop.querySelector('lyte-dropdown').ltProp('selected',this.getData("currentFilterValue").prefix); //NO I18n
	},
	checkForPrevention : function(){
		var totalRecords;
  	totalRecords = this.getData('localData'); //NO I18n
		var currentRec = this.getData('currentPos'); //NO I18n
		if(currentRec >= totalRecords.length){
	 	  if(this.getData('noMoreRecords')) { //NO I18n
				this.setData("preventFutherRequest",true);//NO I18n
			}
		}
	},
	checkEndOfSelection : function(){
		//this function will check if there any values to be fetched from the server when the values displayed in the dom are not adequate.
   var data=this.getData("displayContainerData"); //NO I18n
	 if(data.length<2){
		 var length=this.getData("systemData").length; //NO I18n
		 // if(this.getData("currentFilterValue").cxPropExclude!=undefined){
			// length=length+this.getData("currentFilterValue").cxPropExclude.length;//NO I18n
		 // }
		 length=length + this.getData("currentlyExcludedArray").length; //NO I18n
		 // if(this.getData("currentFilterValue").pagination==false /*&& length<this.getData("localData").length*/){
			 if(length<this.getData("localData").length){
				 if(!this.getData("preventFutherRequest")){
            this.checkForPrevention(); //NO I18n
						this.constructArray.call(this,"comboBox",false); //NO I18n
				 }
				if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage")){
					if(this.getData("noMoreRecords") || length<this.getData("localData").length){
						this.setValues();
					}
				}
			 }
			 else if(length>=this.getData("localData").length && this.getData("noMoreRecords")){
				 if(!this.getData("preventFutherRequest")){
					 this.checkForPrevention(); //NO I18n
						this.constructArray.call(this,"comboBox",false); //NO I18n
				 }
				if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage")){
					if(this.getData("noMoreRecords") || length<this.getData("localData").length){
						this.setValues();
					}
				}
			 }
		 // }
		 // else if(this.getData("currentFilterValue").pagination && length<this.getData("localData").length){
			//  this.constructArray.call(this,"comboBox",false);//NO I18n
			// if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage") && this.getData("noMoreRecords")){
			// 	this.setValues();
			// }
		 // }
	 }
	 else{
		 var index=this.getData("displayContainerData").length-2; //NO I18n
		 var displayedData=this.bodydrop.querySelector(".user-lists-container").querySelector("ul").querySelectorAll("li"); //NO I18n
		 var requriedBlock=displayedData[index];
		 var lastRecordsEnd=requriedBlock.getBoundingClientRect().bottom;
		 //--------------------------------
		 var viewEnd=this.bodydrop.querySelector(".user-lists-container").getBoundingClientRect().bottom; //NO I18n
		 //--------------------------------
		 if(lastRecordsEnd<viewEnd){
			 var length=this.getData("systemData").length; //NO I18n
			 // if(this.getData("currentFilterValue").cxPropExclude!=undefined){
		   //  length=length+this.getData("currentFilterValue").cxPropExclude.length;//NO I18n
			 // }
			 length=length + this.getData("currentlyExcludedArray").length; //NO I18n
			 // if(this.getData("currentFilterValue").pagination==false /*&& length<this.getData("localData").length*/){
			 if(length<this.getData("localData").length){
				 if(!this.getData("preventFutherRequest")){
					 this.checkForPrevention(); //NO I18n
 					 this.constructArray.call(this,"comboBox",false); //NO I18n
 				}
				if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage")){
					if(this.getData("noMoreRecords") || length<this.getData("localData").length){
						this.setValues();
					}
				}
			 }
			 else if(length>=this.getData("localData").length && this.getData("noMoreRecords")){
				 if(!this.getData("preventFutherRequest")){
					 this.checkForPrevention(); //NO I18n
 					 this.constructArray.call(this,"comboBox",false); //NO I18n
 				}
				if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage")){
					if(this.getData("noMoreRecords") || length<this.getData("localData").length){
						this.setValues();
					}
				}
			 }

			 // }
			 // else if(this.getData("currentFilterValue").pagination && length<this.getData("localData").length){
				//  this.constructArray.call(this,"comboBox",false); //NO I18n
				// if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage") && this.getData("noMoreRecords")){
				// 	this.setValues();
				// }
			 // }
		 }
	 }
	},
	methods : {
		showAlertMessage : function (tag , errObj) {
			if(errObj.errorCode === 5 && !$L("#cruxCustomMessage")[0]){
				event.preventDefault();
				this.setData("messageBoxType","info"); //NO I18N
					this.setData("cxPropMaxLimitMsg",_cruxUtils.getI18n('crm.message.limit.exceed',this.getData('cxPropTagLengthLimit'),_cruxUtils.getI18n("crm.workflow.select.recipients")));//no i18n
				this.cxPropMaxLimitMessageBox();
			}
		},
		onBeforeTag : function(){
		var tags = this.getData("cxPropSelectedTags").length; //NO I18N
		if(tags !== this.getData("cxPropTagLimit")){
			return true;
		}else{
			return false;
		}
		if(this.getMethods('beforeAddTag')){ //NO I18n
		  /**
		   * @method beforeAddTag
		   * @author Contributor Name <name.lastname@zohocorp.com>
		   * @version 1.0.0
		   */
		 return this.executeMethod('beforeAddTag'); //NO I18n
		}
		},
		SelectedFilter : function (event, filterName, filterDropdownComp, filterDropItem){
			var oldFilter = this.getData('currentFilterValue');//NO I18n
		 if(filterName!=this.getData('currentFilterValue').prefix){
			 var modules=this.getData('localOptionModels'); //NO I18n
			 for(var i=0;i<modules.length;i++){
			 	 if(modules[i].prefix==filterName){
			 		 this.setData('currentFilterValue', modules[i]); //NO I18n
			 		 break;
			 	 }
			 }
			 if(this.getData("currentFilterValue").cxPropExclude!=undefined){
	 			this.setData("cxPropExclude",this.getData("currentFilterValue").cxPropExclude); //NO I18n
	 		 }
			 this.setData("cxPropPrimaryKey",this.getData("currentFilterValue").idSelector); //NO I18n
			 if(this.getMethods('onFilterChange')){ //NO I18n
				 /**
				  * @method onFilterChange
				  * @author Contributor Name <name.lastname@zohocorp.com>
				  * @version 1.0.0
				  * @param { * } oldFilter
				  * @param { * } this.getData('currentFilterValue')
				  */
				 this.executeMethod('onFilterChange' , oldFilter , this.getData('currentFilterValue')); //NO I18n
			 }
			 this.setData("subFilterOption",[]);//no i18n
			 this.filterObserver.call(this,modules[i].model_name);
		 }
		},
		SelectedSubFilter : function(ele,eve ,selected){
			this.filterObserver(this.getData("currentFilterValue").model_name,"subFilter");//NO I18n
			var networkData = { cxPropModuleName : this.data.userModelsOption.model_name , cxPropCacheQuery : true , cxPropDataCache : true ,cxPropRecordId : selected}
			var selectedData = this.data.subFilterOption.filter(function(t){return t.id == selected});
			this.setData("subFilterSelected",selectedData);//no i18n
			this.setData("cxPropNetworkData",networkData);//no i18n
			this.constructArray.call(this,"comboBox",false);//NO I18n
			// this.fetchUserDataUsingSubFilter(this.data.cxPropNetworkData,this.queryParams(),false)
		},
		beforComboBoxOpen : function(){
		 this.bodydrop = this.$node.querySelector('lyte-modal').component.childComp; //NO I18n
 	   if(this.getMethods('onComboBoxBeforeShow')){ //NO I18n
 	     /**
 	      * @method onComboBoxBeforeShow
 	      * @author Contributor Name <name.lastname@zohocorp.com>
 	      * @version 1.0.0
 	      * @param { * } this.$node
 	      */
 	    return this.executeMethod('onComboBoxBeforeShow',this.$node); //NO I18n
 	   }
		},
		onComboxBoxOpen : function(){
			
 	   this.comboBoxOpen.call(this);
 	   if(this.getMethods('onComboBoxShow')){ //NO I18n
 	    /**
 	     * @method onComboBoxShow
 	     * @author Contributor Name <name.lastname@zohocorp.com>
 	     * @version 1.0.0
 	     * @param { * } this.$node
 	     */
 	    this.executeMethod('onComboBoxShow',this.$node); //NO I18n
 	   }
		},
		BeforeComboBoxClose : function(){
			// if(!this.getData("localClose")){ //NO I18n
				var closeLookup;
		    if(this.getMethods('onBeforeComboBoxClose')){ //NO I18n
		     /**
		      * @method onBeforeComboBoxClose
		      * @author Contributor Name <name.lastname@zohocorp.com>
		      * @version 1.0.0
		      * @param { * } this.$node
		      */
		     closeLookup=this.executeMethod('onBeforeComboBoxClose',this.$node); //NO I18n
		    }
		    if(closeLookup!=false){
		     // this.setData("localClose",true); //NO I18n
				 if(!this.getData("cxPropFooterYield")){
				 if(!this.getData("saveClosing")){
					this.preventSelObs = true;
					 Lyte.arrayUtils(this.getData("cxPropSelected"),'removeAt',0,this.getData("cxPropSelected").length);//NO I18n
					 for(var r=0;r<this.getData("initialSelected").length;r++){
						 Lyte.arrayUtils(this.getData("cxPropSelected"),'push',this.getData("initialSelected")[r]);//NO I18n
					 }
					 delete this.preventSelObs;
					 // var data=this.getData("initialSelected");//NO I18n
					 // this.setData("cxPropSelected",data);//NO I18n
				 }
			 }
				 var modules=this.getData('localOptionModels'); //NO I18n
				 for(var i=0;i<modules.length;i++){
		 				if(modules[i].prefix==this.getData("cxPropSelectedFilterOption")){
		 					this.setData('currentFilterValue', modules[i]); //NO I18n
		 					break;
		 				}
		 		}
				 if(this.getData("cxPropShow")){
					 this.$node.cxProp('show',false); //NO I18n
				 }
			}
			else{
				if(!this.getData("cxPropShow")){
          this.setData("preventShowCalling",true); //NO I18n
          this.setData("cxPropShow",true); //NO I18n
        }
				if(this.getData("localClose")){ //NO I18n
          this.setData("localClose",false);//NO I18n
        }
	     return false;
	    }
		// }
		},
		onComboBoxClosing : function(){
			this.comboBoxClose();
	    if(this.getMethods('onComboBoxClose')){ //NO I18n
	     /**
	      * @method onComboBoxClose
	      * @author Contributor Name <name.lastname@zohocorp.com>
	      * @version 1.0.0
	      * @param { * } this.$node
	      */
	     this.executeMethod('onComboBoxClose',this.$node); //NO I18n
	    }
		},
		validateTag : function(tag){
			// to validate email when tag added...
			// have to move to after adding tag...
			var exp = /^[\p{L}\p{M}\p{N}_]([\p{L}\p{M}\p{N}!#$%&'*+-/=?^_`{|}~.]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([-_]*[\p{L}\p{M}\p{N}])*)[.])+[\p{L}\p{M}]{2,22}$/;
			var objRegExp = new XRegExp(exp.source,"i"); //NO I18N
			var comp = $L('crux-tag' , this.modalWrapperElement)[0]; //NO I18N
			var tags = comp.component.data.cxPropTags;
			var len = tags.length;
			var localModels = this.getData('localOptionModels'); //NO I18N
			var total = 0;
			var isValid = true;
			for (var i=0;i<localModels.length;i++) {
				total += localModels[i].selectedItems.length;
			}
			if(tag.match(",")){
				tagsArray = tag.split(",");
				for(var i = 0;i<tagsArray.length;i++){
					if(!XRegExp.test(tagsArray[i].trim(), objRegExp)){
						tags[len - 1].class = "cxComboBoxErrorRecipient"; //NO I18N
						isValid = false;
					}else{
						Lyte.arrayUtils(this.getData("cxPropSelectedTags"),'push', {name : tagsArray[i]}); //NO I18N
					}
				}
			}else{
				if(!XRegExp.test(tag.trim(), objRegExp)){
					tags[len - 1].class = "cxComboBoxErrorRecipient"; //NO I18N
					isValid = false;
				}else{
					Lyte.arrayUtils(this.getData("cxPropSelectedTags"),'push', {name : tag}); //NO I18N
				}
			}

			this.setData("cxPropSaveButtonDisabledState", false); //NO I18N
			//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",false); //NO I18n
			$L("#tagComp" , this.modalWrapperElement).find('lyte-drop-button').scrollTop(100); //NO I18N
			if(this.getMethods('onAddTag')){ //NO I18n
				/**
				 * @method onAddTag
				 * @author Contributor Name <name.lastname@zohocorp.com>
				 * @version 1.0.0
				 * @param { * } tag
				 * @param { * } isValid
				 */
				this.executeMethod('onAddTag',tag,isValid); //NO I18n
			 }
		},
		closePopup : function(){
			this.setData("deleteAlertShow",false); //NO I18N
		},
		preventClose : function(event,item,content){
			// var invalidTags = $L(".cxComboBoxErrorRecipient" , this.modalWrapperElement); //NO I18N
			if(event.target.className === "addRecipient"){
				if(!item.querySelector('crux-tag') || item.querySelector('crux-tag')){
					setTimeout(function(){
						item.querySelector('crux-tag').querySelector('input').focus(); //NO I18N
					},100);
				}
				return false;
			}

		},
		removeTagFromList : function(tag){
			var selectedTags = this.getData("cxPropSelectedTags"); //NO I18N
			var isValid = false;
			for(var j=0;j<selectedTags.length;j++){
				if(selectedTags[j].name === tag){
					Lyte.arrayUtils(this.getData("cxPropSelectedTags"),'removeAt', j , 1); //NO I18N
					isValid = true;
					break;
				}else{
					isValid = false;
				}
			}
			this.setData("cxPropSaveButtonDisabledState", false); //NO I18N
			//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",false); //NO I18n
			if(this.getMethods('onRemoveTag')){ //NO I18n
				/**
				 * @method onRemoveTag
				 * @author Contributor Name <name.lastname@zohocorp.com>
				 * @version 1.0.0
				 * @param { * } tag
				 * @param { * } isValid
				 */
				this.executeMethod('onRemoveTag',tag,isValid); //NO I18n
			 }
		}
		// mainDropdownBeforeHide : function(event,mainDropdown){
		// 	var div = mainDropdown.childComp.querySelector('div.innerDropdownDiv'); //NO I18n
		// 	if(event && div.contains(event.target)){
		// 		return false;
		// 	}
		// },
		// mainDropdownOnHide : function(){
		// 	this.resetHeightOfButton();
		// 	var dropBody = arguments[1].childComp.querySelector('.cruxDropbody')
		// 	dropBody.querySelector('.shown').component.resetMixin(); //NO I18n
		// },
		// mainDropdownOnShow : function(event,mainDropdown){
		// 	var innerDropdown = mainDropdown.childComp.querySelector('div.innerDropdownDiv').querySelector('lyte-dropdown');  //NO I18n
		// 	this.setData('selectedOption',innerDropdown.ltProp('selected')); //NO I18n
		// 	var dropBody
		// 	if(this.$node.querySelector('.mainCruxDropdown').ltProp('show')){
		// 		dropBody = this.$node.querySelector('lyte-dropdown').component.childComp.querySelector('.cruxDropbody'); //NO I18n
		// 	}else{
		// 		dropBody = this.$node.querySelector('.cruxDropbody'); //NO I18n
		// 	}
		// 	dropBody.querySelector('.shown').component.getItems(); //NO I18n
		// },
		// addToList : function(event,item){
		// 	// var name = arguments[4].getAttribute('name');
		// 	// var image = arguments[4].getAttribute('image');
		// 	src=src.split(':');
		// 	for(var i=0;i<this.getData('cxPropOptionModels').length;i++){
		// 		if(this.getData('cxPropOptionModels')[i].prefix == src[0]){
		// 			Lyte.arrayUtils(this.getData('cxPropOptionModels')[i].selectedItems,"push",{name : nam, id : src[1],prefix : src[0],image : img});
		// 		}
		// 	}
		// 	// var button = this.$node.querySelector('.cruxDropButton'); //no i18n
		// 	// var node = this.$node.querySelector('[data-value="'+src.join(':')+'"]') //no i18n
		// 	// button.scrollTop = node.offsetTop;
		// 	// node.classList.add('quickSelect'); //no i18n
		// 	// setTimeout(function(){
		// 	// 	node.classList.remove('quickSelect'); //no i18n
		// 	// },300);
		// 	// var dropBody = document.querySelector("lyte-drop-box:not(.lyteDropdownHidden)").querySelector('.cruxDropbody') //NO I18n
		// 	// dropBody.querySelector('.shown').component.checkDropitem(); //NO I18n
		// 	// if(this.getMethods('onAdd')){
		// 	// 	this.executeMethods('onAdd',arguments[0],arguments[1],arguments[2],arguments[3],arguments[4])
		// 	// }
		// },
		// removeFromList : function(event,src){
		// 	var self=this;
		// 	for(var j=0;j<src.length;j++){
		// 		src[j]=src[j].split(':');
		// 		var prefix=src[j][0]
		// 		src[j]=src[j][1]
		// 		for(var k=0;k<this.getData('cxPropOptionModels').length;k++){
		// 			if(prefix && prefix != this.getData('cxPropOptionModels')[k].prefix){
		// 				continue
		// 			}
		// 			for(var i=0;i<this.getData('cxPropOptionModels')[k].selectedItems.length;i++){
		// 				if(this.getData('cxPropOptionModels')[k].selectedItems[i].id == src[j]){
		// 					Lyte.arrayUtils(this.getData('cxPropOptionModels')[k].selectedItems,'removeAt',i); //no i18n
		// 				}
		// 			}
		// 		}
		// 	}
		// 	clearTimeout(this.c);
		// 	this.c=setTimeout(function(){
		// 		self.resetHeightOfButton();
		// 	},700)
    //
		// 	var dropBody
		// 	if(this.$node.querySelector('.mainCruxDropdown').ltProp('show')){
		// 		dropBody = this.$node.querySelector('lyte-dropdown').component.childComp.querySelector('.cruxDropbody'); //NO I18n
		// 	}else{
		// 		dropBody = this.$node.querySelector('.cruxDropbody'); //NO I18n
		// 	}
		// 	dropBody.querySelector('.shown').component.checkDropitem(); //NO I18n
    //
		// 	if(this.getMethods('onRemove')){
		// 		this.executeMethods('onRemove',arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])
		// 	}
		// },
		// innerDropdownOnOptionSelected : function(a,b){
		// 	this.setData('selectedOption',b); //NO I18n
		// 	this.setData('cxPropInputValue','') //NO I18n
		// 	var dropBody = document.querySelector("lyte-drop-box:not(.lyteDropdownHidden)").querySelector('.cruxDropbody') //NO I18n
		// 	for(var i=0;i<dropBody.childElementCount;i++){
		// 		if(dropBody.children[i].tagName == "CRUX-COMBO-BOX-DROPITEM"){
		// 			dropBody.children[i].component.resetMixin();
		// 		}
		// 	}
		// 	dropBody.querySelector('.shown').component.getItems(); //NO I18n
		// 	dropBody.querySelector('.shown').component.checkDropitem(); //NO I18n
		// },
		// changeSelected : function(){
		// 	var dropdown = this.$node.querySelector('.mainCruxDropdown'); //no i18n
		// 	var selected = dropdown.ltProp('selected'); //no i18n
		// 	dropdown.ltProp('selected',"[]");
		// 	dropdown.ltProp('selected',selected); //no i18n
		// }
	},
	actions : {
		checkForLimit : function(event){
			var tags = this.getData("cxPropSelectedTags").length; //NO I18N
			if(tags === this.getData("cxPropTagLimit")){
				event.preventDefault();
				this.setData("messageBoxType","info"); //NO I18N
				this.setData("cxPropMaxLimitMsg",_cruxUtils.getI18n('crux.comboBox.max.limit',this.getData('cxPropTagLimit'),_cruxUtils.getI18n("crm.workflow.select.recipients")));//no i18n
				this.cxPropMaxLimitMessageBox();
			}
		},
		checkForToolTip : function(element,value , user){
     if(element.scrollWidth>element.offsetWidth){
			 element.setAttribute("lt-prop-title", value);//no i18n
		 }else if(user && this.data.cxPropShowUserOnly && this.data.selectedUsersList && this.data.selectedUsersList[user.id]){
		 	 element.setAttribute("lt-prop-title", "user has been added already");//no i18n
		 }
		 else{
			 if(element.getAttribute('lt-prop-title')!=null){
				 element.removeAttribute("lt-prop-title");//no i18n
			 }
		 }

		},
		addToList : function(event,index){  
			this.preventSelObs = true;
			if( this.data.cxPropShowUserOnly && this.data.selectedUsersList[this.data.displayContainerData[index].id]){
				return
			}
			var preventAdding=false;
			var currFilterValue = this.getData("currentFilterValue");//no i18n
			var limit=this.getData("cxPropMaxLimit");//no i18n
			if( this.data.cxPropShowUserOnly ){
				if( limit <= this.data.totalSelectedItemsCount + this.data.cxPropSelectedTags.length ){
					// var msg = currFilterValue.maxLimitMessage ? currFilterValue.maxLimitMessage : _cruxUtils.getI18n('crux.comboBox.max.limit',this.getData('cxPropMaxLimit'),this.getData("currentFilterValue").name);//no i18n
					// this.setData("cxPropMaxLimitMsg",msg);//no i18n
					preventAdding = true;
					this.cxPropMaxLimitMessageBox();
				}
			}else{
				for(var i=0;i<this.getData('localOptionModels').length;i++){
					if(this.getData('localOptionModels')[i].prefix == this.getData("currentFilterValue").prefix){
						if(  typeof this.data.cxPropTotalMaxLimit !== 'undefined' && this.data.cxPropTotalMaxLimit <= this.data.totalSelectedItemsCount + this.data.cxPropSelectedTags.length  ){
							// var msg = currFilterValue.maxLimitMessage ? currFilterValue.maxLimitMessage
							preventAdding = true;
							this.cxPropMaxLimitMessageBox();
						}else if(this.getData('localOptionModels')[i].selectedItems.length === limit){
	            preventAdding=true;
	      //       			this.setData("showAlertMessage",true); //NO I18N
	      //       			this.setData("messageType","info"); //NO I18N
							if(currFilterValue.maxLimitMessage){
								this.setData("cxPropMaxLimitMsg",currFilterValue.maxLimitMessage);//no i18n
							}
							else{
								this.setData("cxPropMaxLimitMsg",_cruxUtils.getI18n('crux.comboBox.max.limit',this.getData('cxPropMaxLimit'),this.getData("currentFilterValue").name));//no i18n
							}
							// this.$node.querySelector("lyte-messagebox").ltProp("show",true);//no i18n
							//this.$node.querySelector("lyte-messagebox").ltProp("show",true);//no i18n
							this.cxPropMaxLimitMessageBox();
						}
					}
				}
			}
			
			if(preventAdding==false){
				var continueToAdd=true;
				if(this.getMethods('onAdd')){ //NO I18n
					for(var i=0;i<this.getData('localOptionModels').length;i++){
						if(this.getData('localOptionModels')[i].prefix == this.getData("currentFilterValue").prefix){
							break;
						}
					}
		     /**
		      * @method onAdd
		      * @author Contributor Name <name.lastname@zohocorp.com>
		      * @version 1.0.0
		      * @param { * } this.getData("displayContainerData")[index]
		      * @param { * } this.getData('localOptionModels')[i].selectedItems
		      * @param { * } this.getData('localOptionModels')
		      * @param { * } this.$node
		      * @param { * } this.getData("currentFilterValue")
		      */
		     continueToAdd=this.executeMethod('onAdd',this.getData("displayContainerData")[index],this.getData('localOptionModels')[i].selectedItems,this.getData('localOptionModels'),this.$node,this.getData("currentFilterValue")); //NO I18n
				 if(continueToAdd==undefined || continueToAdd==null){
					 continueToAdd = true;
				 }
		  	  }
				if(continueToAdd){
					var item=this.getData("displayContainerData")[index]; //no i18n
					var obsList = this.getData("cxPropDeletedList"); //NO I18n
					var obsListLen = obsList.length;
					 for(var e = 0 ; e<obsListLen ; e++){
					 	if(this.data.cxPropShowUserOnly){
					 		if(obsList[e].user.id == item.id){
					 			Lyte.arrayUtils(this.getData("cxPropDeletedList"), 'removeAt', e ,1);//NO I18n
					 			break
					 		}
					 	}else if(this.getData('currentFilterValue').prefix == obsList[e].prefix && this.getData("displayContainerData")[index][this.getData("currentFilterValue").idSelector] == obsList[e][this.getData("currentFilterValue").idSelector]){
							 Lyte.arrayUtils(this.getData("cxPropDeletedList"), 'removeAt', e ,1);//NO I18n
							 break
						 }
					 }
           var exists = false;
					 var obsList = this.getData("observerDelList"); //NO I18n
		 			var obsListLen = obsList.length;
		        for(var t = 0 ; t<obsListLen ; t++){
		         if(this.getData('currentFilterValue').prefix == obsList[t].prefix){
		 					var observedItems = obsList[t].selectedItems;
		 					var observedItemsLength = observedItems.length;
		           for(var k = 0 ; k<observedItemsLength ; k++){
		 							if(this.getData('displayContainerData')[index][this.getData("currentFilterValue").idSelector] == observedItems[k][this.getData("currentFilterValue").idSelector]){
                      exists = true;
											break
		 								}
		 				     	}
									break
		 				   }
		 			  }
					if(!this.getData("cxPropFooterYield")){
						this.setData("cxPropSaveButtonDisabledState", false); //NO I18N
						//this.bodydrop.querySelector("#cruxComboBoxSaveButton").parentElement.ltProp("Disabled",false); //NO I18n
					}
					this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+1); //No I18N
					Lyte.arrayUtils(this.getData("displayContainerData"), 'removeAt', index, 1); //NO I18n
					var filter=this.getData("currentFilterValue");//no i18n
					for(var i=0;i<this.getData('localOptionModels').length;i++){
						if(this.getData('localOptionModels')[i].prefix == filter.prefix){
							if( this.data.cxPropShowUserOnly){
								// var localSelected = this.getData('localOptionModels')[i].localSelected;
								var subFilterSelectedId =  $("#cxComboSubFilterDD")[0]?  $("#cxComboSubFilterDD")[0].cxProp("selected") : "user" , selectedItems = this.getData('localOptionModels')[i].selectedItems ;
								var containerDataObject = this.data.containerDataObject, subFilterSelected = subFilterSelectedId != "user" ?store.peekRecord(filter.model_name,subFilterSelectedId) : {[filter.nameSelector] :filter.name,[filter.idSelector] : filter.singular_name};//no i18n
								var tempData  = selectedItems.filter(function(it){return it.id == subFilterSelectedId})[0]//eslint-disable-line no-loop-func
								if( !tempData  ){
									tempData = {type : filter.model_name,name : subFilterSelected[filter.nameSelector], id : subFilterSelected[filter.idSelector],prefix : filter.prefix,image : subFilterSelected[filter.imageSelector],users:[]}
									Lyte.arrayUtils(selectedItems,"push",tempData);//NO I18n
									tempData = selectedItems[selectedItems.length-1];
									// localSelected[subFilterSelectedId] = { index : selectedItems.length-1 }
								}
								var usrData = {type : containerDataObject.model_name,name : item[containerDataObject.nameSelector], id : item[containerDataObject.idSelector],prefix : containerDataObject.prefix,image : item[containerDataObject.imageSelector]};
								if( containerDataObject.imageSelector && item[containerDataObject.imageSelector]){
									usrData[containerDataObject.imageSelector] = item[containerDataObject.imageSelector]
								}
								Lyte.arrayUtils(tempData.users,"push",usrData)
								var cxSelected = this.getData("cxPropSelected") , //NO I18n
								subFilterSelected = filter.model_name == "user" ? item : subFilterSelected;//NO I18n
								selectedData = {prefix :  filter.prefix,[filter.singular_name] : {id : subFilterSelected.id,name : subFilterSelected[filter.nameSelector]},type : filter.name}
								// if( filter.model_name != "user" ){
								selectedData.user = {id : item[containerDataObject.idSelector],name:item[containerDataObject.nameSelector]}
								if( containerDataObject.imageSelector && item[containerDataObject.imageSelector]){
									selectedData.user[containerDataObject.imageSelector] = item[containerDataObject.imageSelector]
								}
								// }
								selectedData.id = subFilterSelected[filter.idSelector];
								Lyte.objectUtils(this.data.selectedUsersList,"add",item[containerDataObject.idSelector],selectedData);
								Lyte.arrayUtils(this.getData("cxPropSelected"),'push',selectedData);//NO I18n
							}else{
								Lyte.arrayUtils(this.getData('localOptionModels')[i].selectedItems,"push",{type : filter.model_name,name : item[filter.nameSelector], id : item[filter.idSelector],prefix : filter.prefix,image : item[filter.imageSelector]});
								Lyte.arrayUtils(this.getData("cxPropSelected"),'push',{type : filter.model_name,name : item[filter.nameSelector], id : item[filter.idSelector],prefix : filter.prefix,image : item[filter.imageSelector]});
							}
						}
					}

					if(!exists){
						var allSelected = this.getData("cxPropSelected");//NO I18N
						Lyte.arrayUtils(this.getData("cxPropNewSelectedList"), 'push', allSelected[allSelected.length - 1]);//NO I18n
					}
					this.checkEndOfSelection(); //NO I18n

					this.bodydrop.querySelector('lyte-accordion').component.getAllHeights(); //NO I18n
					var items=this.bodydrop.querySelector('lyte-accordion').querySelectorAll("lyte-accordion-item"); //NO I18n
					var found=false;
					for(var o=0;o<items.length;o++){
						if(items[o].querySelector(".user-type").textContent.toLowerCase()==this.getData("currentFilterValue").name.toLowerCase()){
								found = true
								break;
							// 	 items[o].classList.add("lyteAccordionActive");
						}
					}
					if(found && !items[o].classList.contains("lyteAccordionActive")){
					 $L.fastdom.measure( function() {
						items[o].click();
					 })
					}
				}
			}
			delete this.preventSelObs
		},

		removeFromList : function(event, optionPos, selectedPos, type, selectedItem, usrPos , userId){
			this.removeSingleItemFromList( optionPos, selectedPos, type, usrPos , userId );
		},
		saveData : function (){

			this.setData("saveClosing",true);//NO I18n
			var allowSave = true;
			var array=[];

			var selectedTags = this.getData("cxPropSelectedTags"); //NO I18N
			for(var i=0;i<this.getData("localOptionModels").length;i++){
			 Lyte.arrayUtils(array, 'concat', this.getData("localOptionModels")[i].selectedItems); //NO I18n
			}
			var elem = $L("crux-tag" , this.modalWrapperElement);
			if(elem[0]){
				var tags = elem[0].component.data.cxPropTags;
			}
			if(this.getMethods('onBeforeSave')){ //NO I18N

					  /**
					   * @method onBeforeSave
					   * @author Contributor Name <name.lastname@zohocorp.com>
					   * @version 1.0.0
					   * @param { * } array
					   * @param { * } selectedTags
					   * @param { * } this.$node
					   */
					allowSave = this.executeMethod('onBeforeSave',array,selectedTags,this.$node); //NO I18n

			}
			if(allowSave == undefined || allowSave){
				this.setData("localRecipient",[]); //NO I18N
				if( tags && tags.length > 0){
					setTimeout(function(){
						//var tagComp = $L("crux-tag")[0];
						var input = elem.find('input');
						input.focus();
					}, 100);
					for(var i = 0;i<tags.length;i++){
						if(tags[i].class === "cxComboBoxErrorRecipient"){
							this.setData("messageBoxType","error"); //NO I18N
							this.setData("cxPropMaxLimitMsg",_cruxUtils.getI18n('crm.recipient.invalid.email')); //NO I18N
							this.cxPropMaxLimitMessageBox();
							return;
						}else{
							 Lyte.arrayUtils(this.getData("localRecipient"), 'push', tags[i].name); //NO I18n
						}
					}
				}else{
					for(var j=0;j<selectedTags.length;j++){
						Lyte.arrayUtils(this.getData("localRecipient"), 'push', selectedTags[j].name); //NO I18n
					}
				}
				//this.setData("cxPropRecipient.tags",selectedTags); //NO I18N


				this.$node.cxProp('show',false); //NO I18n
				if(this.getMethods('onSave')){ //NO I18n

					 /**
					  * @method onSave
					  * @author Contributor Name <name.lastname@zohocorp.com>
					  * @version 1.0.0
					  * @param { * } array
					  * @param { * } selectedTags
					  * @param { * } this.getData("cxPropSelectedTags")
					  * @param { * } this.$node
					  */
					return this.executeMethod('onSave',array,selectedTags,this.getData("cxPropSelectedTags"),this.$node); //NO I18n


	  	  		 }
			} else {
				this.setData("saveClosing",false);//NO I18n
			}

		},
		cancelData : function(){
	     this.setData("localClose",true); //NO I18n
	     this.$node.cxProp('show',false); //NO I18n
		},
		tableScroll : function(event){
			if(!this.getData("setScrolling")){
	   if(this.getData("cxPropShow")){
	    clearTimeout(this._timeout1);
	    this._timeout1=setTimeout(function(){
				if(!this.getData("preventFutherRequest")){
				var length=this.getData("systemData").length; //NO I18n
				// if(this.getData("currentFilterValue").cxPropExclude!=undefined && this.getData("currentFilterValue").cxPropExclude.length!=0){
				// 	length=length + this.getData("currentFilterValue").cxPropExclude.length;//NO I18n
				// }
				length=length + this.getData("currentlyExcludedArray").length; //NO I18n
				if(this.getData("currentFilterValue").pagination==false && length!=this.getData("localData").length){
					if(this.getData("isSearch") && length>=this.getData("localData").length){
						this.setData("scrollLoading",false); //NO I18n
		  			this.setData("noMoreRecords",false);//NO I18n
		  		}else{
						this.bodyScroll.call(this,"comboBox",event); //NO I18n
	 				 if(length!=this.getData("systemData").length /*&& length!=this.getData("cxPropPerPage") && this.getData("noMoreRecords")*/){
						 if(this.getData("noMoreRecords") || length<this.getData("localData").length){
  						 this.setValues();
  					 }
	 				 }
					}
					// this.bodyScroll.call(this,"comboBox",event); //NO I18n
 				 // if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage") && this.getData("noMoreRecords")){
 					//  this.setValues();
 				 // }
				}
				else if(this.getData("currentFilterValue").pagination){
					this.bodyScroll.call(this,"comboBox",event); //NO I18n
 				 if(length!=this.getData("systemData").length && length!=this.getData("cxPropPerPage")){
					 if(this.getData("noMoreRecords") || length<this.getData("localData").length){
						 this.setValues();
					 }
 				 }
				}
				else if(this.getData("currentFilterValue").pagination==false && length==this.getData("localData").length){
					this.setData("scrollLoading",false); //NO I18n
					this.setData("noMoreRecords",false); //NO I18n
				}
			 }
	    }.bind(this), 100);
	   }
	 }
	 else{
		 this.setData("setScrolling",false);//NO I18n
	 }
	  },
		searchKeyup : function(event){
	   var setScroll=this.bodydrop.querySelector('.user-lists-container'); //NO I18n
		  if(this.getData("currentFilterValue").pagination==true){
      this.keyup.call(this,"comboBox",setScroll,event); //NO I18n
	   	}
			else{
				clearTimeout(this._timeout2);
		 	 this._timeout2 = setTimeout(function(){
				 var tempData=[];
				 var inputVal = this.getData('cxPropInputValue'), minLength = this.getData('cxPropMinLength'); //NO I18n
 			  if(inputVal.length >= minLength){
 					if(setScroll!=null){
					 this.setData("setScrolling",true);//NO I18n
 			 	   setScroll.scrollTop=0;
 			 	  }
					this.setData("multipleBack",false); //NO I18n
			   this.setData("isSearch", true); //NO I18n
				 for(var i=0;i<this.getData("searchNonPaginationData").length;i++){
					 var netData=this.getData("searchNonPaginationData")[i][this.getData("currentFilterValue").nameSelector].toLowerCase();
					 var searchData=inputVal.toLowerCase();
					 var dbData=netData.trim();
					 var searchString=searchData.trim();
          // if(netData.indexOf(searchData)==0){
					// if(new RegExp('\\s' + searchData).test(" "+netData)){
					var searchFun = (dataString , searchWord)=>{
						let wordsArr = dataString.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
						return wordsArr.some(word => word.startsWith(searchWord));
					};
					if((" "+dbData).indexOf(" "+searchString)>=0 || searchFun(dbData,searchString)){
          Lyte.arrayUtils(tempData, 'push', this.getData("searchNonPaginationData")[i]); //NO I18n
					}
				 }
				 this.setData("localData",tempData);//NO I18n
				 this.setData("currentlyExcludedArray",[]); //NO I18n
				 this.setData("currentPos",0); //NO I18n
				 if(this.getData("localData").length!=0){
					 this.constructArray.call(this,"comboBox",false); //NO I18n
				 }else{
					 this.setData("systemData",[]);//NO I18n
				 }
				// if(this.getData("systemData").length==this.getData("localData").length){
				// 	this.setData("noMoreRecords",false);//NO I18n
				// }
				// if(this.getData("currentFilterValue").pagination==false){
		 		 var current=this.getData("currentFilterValue");//NO I18n
		 		 var excludeLength=0;
		 		 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
		     //    excludeLength=current.cxPropExclude.length;
		 		 // }
				 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n

		  		// if(this.getData("systemData").length + excludeLength >=this.getData("localData").length){
		  		// 	this.setData("noMoreRecords",false);//NO I18n
		  		// }
		  		if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
		  			this.setData("noMoreRecords",false);//NO I18n
		  		}
		 	// }
				// this.setData("filterChange",false);//NO I18n
		 		// this.setData("searchLoading",false);//NO I18n
		 		// this.setData("scrollLoading",false);//NO I18n
		    this.setValues();
				this.setData("filterChange",false);//NO I18n
		 		this.setData("searchLoading",false);//NO I18n
		 		this.setData("scrollLoading",false);//NO I18n
			 }
			 if(this.getData("multipleBack")==false||this.getData("multipleBack")==undefined){
	 			if(this.getData("multipleBack")==undefined && inputVal.length<this.getData('cxPropMinLength')){
	 				this.setData("multipleBack",true); //NO I18n
	 			}
	 			else{
	 	  if(inputVal.length == 0) {
				var allowThrough=true;
	 		 this.setData("isSearch", false); //NO I18n
	 			 this.setData("noMoreRecords",true); //NO I18n
	 			 this.setData("currentPos",0); //NO I18n
	 			 this.setData("localData", []); //NO I18n
	 			 if(this.getData("pageNo")!=0){//NO I18n
	 				this.setData("pageNo",1); //NO I18n
	 				}
					if(this.getData("currentFilterValue").cxPropOptions!=undefined){
						this.setData("localData",this.getData("currentFilterValue").cxPropOptions); //NO I18n
						if(this.getData("currentFilterValue").cxPropOptions.length==0){
							allowThrough=false;
						}
					}
					if(allowThrough){
						this.constructArray.call(this,"comboBox",false); //NO I18n
					}
				 if(this.getData("currentFilterValue").cxPropOptions!=undefined){
					//  if(this.getData("systemData").length==this.getData("localData").length){
	 				// 	this.setData("noMoreRecords",false);//NO I18n
	 				// }
					// if(this.getData("currentFilterValue").pagination==false){
			 		 var current=this.getData("currentFilterValue");//NO I18n
			 		 var excludeLength=0;
			 		 // if(current.cxPropExclude!=undefined && current.cxPropExclude!=null && current.cxPropExclude.length!=0){
			     //    excludeLength=current.cxPropExclude.length;
			 		 // }
					 excludeLength=this.getData("currentlyExcludedArray").length; //NO I18n
			  		if(this.getData("systemData").length + excludeLength ==this.getData("localData").length){
			  			this.setData("noMoreRecords",false);//NO I18n
			  		}
			 	// }
					 this.setValues();
				 }
	 		 this.setData("multipleBack",true); //NO I18n
	 	  }
	 	}
	 	 }
			 }.bind(this), 300);
		 }
	  },
		clearInputField : function(){
			this.setData("clearField",true);//no i18n
			this.setData("cxPropInputValue",""); //no i18n
			if(this.getMethods('onClearSearch')){ //NO I18n
				/**
				 * @method onClearSearch
				 * @author Contributor Name <name.lastname@zohocorp.com>
				 * @version 1.0.0
				 */
				this.executeMethod('onClearSearch'); //NO I18n
		 }
			this.filterObserver(this.getData("currentFilterValue").model_name); //no i18n
		},
		selectRecord : function(){
			//this.addToList(); //no i18n
		},
		showAddRecipient : function(param){
			if(this.data.cxPropShowUserOnly){
				//callback for new requirement
				if( this.getMethods('onAddCustomRecipient') ){
					/**
					 * @method onAddCustomRecipient
					 * @author Contributor Name <name.lastname@zohocorp.com>
					 * @version 1.0.0
					 * @param { * } this.component
					 */
					this.executeMethod('onAddCustomRecipient',this.component)//NO I18n
				}
			}else{
				// to show crux tag for adding email
				this.setData("showAddRecipient",true); //NO I18N

				setTimeout(function(){
					var elem = $L("crux-tag" , this.modalWrapperElement)[0]; //NO I18N
					var input = $L(elem).find('input');
					elem.focus();
				}.bind(this), 100);
			}
			
		},
		clearData : function(){ /* Seems this action was unused, we are not modifying lyte-alert here */

			if(this.getData("showAddRecipient")){
				var elem = $L("crux-tag" , this.modalWrapperElement)[0];
				var initialTags = this.getData("initialTags"); //NO I18N

				if( (initialTags && initialTags.length > 0 && elem)) {
					var currentTags = elem.component.data.cxPropTags;
					if(initialTags.length !== currentTags.length){
						this.setData("deleteAlertShow",true); //NO I18N
						
						// _cruxUtils.showCustomAlert({ 
						// 	params : { 
						// 	ltPropSecondaryMessage : 'Changes made have not been saved. Do you want to proceed ?',
						// 	ltPropWrapperClass : 'sampleAlert', 
						// 	ltPropButtons : '[{"type":"accept","text":"Delete","appearance":"failure"},{"type":"reject","text":"Cancel","appearance":"default"}]'
						//  	},
						// 	accept : function(){
								
						// 	}
						//  })	
					}
				}else{
					elem.cxProp('Tags',[]); //NO I18N
					this.setData("showAddRecipient",false); //NO I18N
				}

			}else{
				this.setData("cxPropRecipient.tags",[]); //NO I18N
				this.setData("showAddRecipient",false); //NO I18N
			}

		}
	}
	// getSelectedItems :function(){
	// 	var selected=this.getData('cxPropSelected'); //no i18n
	// 	for(var i=0;i<this.getData('cxPropOptionModels').length;i++){
	// 		var array=[],selectedArray=selected.slice();
	// 		for(var j=0;j<selectedArray.length;j++){
	// 			selectedArray[j]=selectedArray[j].split(':');
	// 			if(this.getData('cxPropOptionModels')[i].prefix == selectedArray[j][0]){
	// 				array.push(selectedArray[j][1]);
	// 			}
	// 		}
	// 		Lyte.objectUtils(this.getData('cxPropOptionModels')[i],'add','cxPropSelected',array); //NO I18n
	// 	}
	// 	this.setSelectedItems();
	// },
	// setSelectedItems : function(){
	// 	this.setData('selectedItems',[]) //no i18n
	// 	var self=this;
	// 	var dropBody;
	// 		if(this.$node.querySelector('.mainCruxDropdown').ltProp('show')){
	// 			dropBody = this.$node.querySelector('lyte-dropdown').component.childComp.querySelector('.cruxDropbody'); //NO I18n
	// 		}else{
	// 			dropBody = this.$node.querySelector('.cruxDropbody'); //NO I18n
	// 		}
	// 	var pushData = function(a){
	// 		if(a){
	// 			for(var i=0;i<self.getData('cxPropOptionModels').length;i++){
	// 				if(self.getData('cxPropOptionModels')[i].prefix == a[0].prefix){
	// 					Lyte.arrayUtils(self.getData('cxPropOptionModels')[i].selectedItems,"push",a); //no i18n
	// 				}
	// 			}
	// 		}
	// 	}
	// 	for(var i=0;i<dropBody.childElementCount;i++){
	// 		if(dropBody.children[i].tagName == "CRUX-COMBO-BOX-DROPITEM"){
	// 			dropBody.children[i].component.sendSelectedData().then(pushData);
	// 		}
	// 	}
	// 	this.resetHeightOfButton();
	// 	var selected=this.getData('cxPropSelected'); //no i18n
	// 	var dropdown = this.$node.querySelector('.mainCruxDropdown'); //no i18n
	// 	dropdown.ltProp('selected',JSON.stringify(selected)); //no i18n
	// },
	// sendInputToChild : function(){
	// 	var dropBody
	// 		if(this.$node.querySelector('.mainCruxDropdown').ltProp('show')){
	// 			dropBody = this.$node.querySelector('lyte-dropdown').component.childComp.querySelector('.cruxDropbody'); //NO I18n
	// 		}else{
	// 			dropBody = this.$node.querySelector('.cruxDropbody'); //NO I18n
	// 		}
	// 	dropBody.querySelector('.shown').component.updateInputValue(this.getData('cxPropInputValue'));//NO I18n
	// },
	// changeInputValue : function(){
	// 	this.sendInputToChild();
	// }.observes('cxPropInputValue'),//NO I18n
	// observerSelected : function(){
	// 	if(!this.getData('calledWithIn')){
	// 		this.getSelectedItems();
	// 	}
	// 	this.setData('calledWithIn',false); //No I18N
	// }.observes('cxPropSelected.[]'), //no i18n
	// observerOptions : function(){
	// 	this.getSelectedItems();
	// }.observes('cxPropOptionModels.[]'), //no i18n
	// resetHeightOfButton : function(){
	// 	var button = this.$node.querySelector('.cruxDropButton'); //no i18n
	// 	$L.fastdom.mutate( function(){
	// 		button.style.removeProperty('height') //no i18n
	// 		$L.fastdom.measure( function(){
	// 			var shgt = button.scrollHeight //no i18n
	// 			$L.fastdom.mutate( function(){
	// 				button.style.height= shgt+"px";
	// 			})
	// 		} )
	// 	}.bind( this ) )
	// }
},{mixins : ["crux-user-utils"]}); //no i18n
