Lyte.Component.register("crux-page-builder-properties", {
_template:"<template tag-name=\"crux-page-builder-properties\"> <template is=\"if\" value=\"{{showModal}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" on-menu-click=\"{{method('fieldActionSelected')}}\" lt-prop-freeze=\"false\" lt-prop-query=\"#fieldPropertyActions\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbPreventPropertiesPanelClose\"> <template is=\"for\" items=\"{{cxPropFieldPropertiesActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.value}}\"> <lyte-menu-label>{{item.name}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-modal lt-prop-wrapper-class=\"cxPbPropertiesModal\" lt-prop-overlay-close=\"true\" lt-prop-height=\"calc(100% - 50px)\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromRight&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;50px&quot;,&quot;right&quot;:&quot;0&quot;}\" lt-prop-aria=\"true\" lt-prop-allow-multiple=\"true\" lt-prop-width=\"360px\" on-before-show=\"{{method('beforeShow')}}\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method('modalClose')}}\" on-before-close=\"{{method('onBeforeModalClose')}}\" on-show=\"{{method('modalShow')}}\" lt-prop-dimmer=\"{&quot;opacity&quot;:&quot;0&quot;}\" lt-prop-show=\"{{propertiesPanelShow}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div class=\"cxFlex cxAlignItemsCenter cxPbModalHeaderWrap\"> <div class=\"cxPbModalHeaderFLabel cxFlex cxAlignItemCenter\"> <lyte-text lt-prop-value=\"{{cxPropField.display_label}}\"></lyte-text> </div> <div class=\"cxFlex cxAlignItemsCenter\"> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <span class=\"cxPbModalActionIconsWrap {{if(cxPropDisableFieldPropActions,'disableclass')}}\" id=\"fieldPropertyActions\" lt-prop-title=\"{{if(cxPropDisableFieldPropActions,cxPropFieldPropActionsToolTip)}}\"> <i class=\"cxPbMoreIcon\"></i> </span> </template></template> <span class=\"cxPbModalActionIconsWrap\" onclick=\"{{action('closeProperties')}}\"> <i class=\"cxPbSprite cxPbCloseIcon\"></i> </span> </div> </div> </lyte-modal-header> <lyte-modal-content> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> </template><template case=\"false\"> <lyte-tabs class=\"cxPbPropModalTab\" lt-prop=\"{&quot;height&quot; : &quot;100%&quot; }\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <lyte-tab-title lt-prop-id=\"tabsProperties\">Properties</lyte-tab-title> </template></template> <template is=\"if\" value=\"{{expHandlers(cxHidePermissions,'!')}}\"><template case=\"true\"> <lyte-tab-title lt-prop-id=\"tabsPermission\">Permissions</lyte-tab-title> </template></template> <template is=\"for\" items=\"{{cxPropExtraDefinitions}}\" item=\"item\" index=\"index\"> <lyte-tab-title lt-prop-id=\"tabs{{index}}\">{{item.cxHeader}}</lyte-tab-title> </template> </lyte-tab-head> <lyte-tab-body> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <lyte-tab-content id=\"tabsProperties\"> <template items=\"{{propertiesJson}}\" item=\"item\" index=\"index\" is=\"for\"><div> <div class=\"{{if(checkVisibleProperty(item.cxPropProperties,triggerVisiblity),'','dN ')}}\"> <template is=\"if\" value=\"{{item.cxPropLabel}}\"><template case=\"true\"><div data-cy=\"{{item.cxPropLabel}}\" class=\"cxPbFormHeading\"> {{item.cxPropLabel}} </div></template></template> <template items=\"{{item.cxPropProperties}}\" item=\"prop\" index=\"index\" is=\"for\"><div> <crux-page-builder-property-header cx-prop-property=\"{{cruxClone(prop)}}\" cx-prop-field=\"{{cxPropField}}\" property-changed=\"{{method('propertyValueChange')}}\" error-property=\"{{method('errorInProperty')}}\" cx-prop-id=\"{{cxPropId}}\" piclikist-setting-option-clicked=\"{{method('piclikistSettingOptionClickedFn')}}\" trigger-visiblity=\"{{lbind(triggerVisiblity)}}\" lookup-property-modal-clicked=\"{{method('lookupPropertyModalClickedFn')}}\" data-cy=\"{{prop.api_name}}\"></crux-page-builder-property-header> </div></template> </div> </div></template> <lyte-button lt-prop-disabled=\"{{if(cruxOr(cxPropField[cxPropFieldSpecialMetaKeys.cxMandatory],negate(showRemoveField)),true,false)}}\" lt-prop-title=\"{{if(negate(showRemoveField),mandatoryDisableTooltip,'')}}\" lt-prop-appearance=\"failure\" onclick=\"{{action('removeField')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Remove Field </template> </lyte-button> </lyte-tab-content> </template></template> <template is=\"if\" value=\"{{expHandlers(cxHidePermissions,'!')}}\"><template case=\"true\"> <lyte-tab-content id=\"tabsPermission\"> <crux-permission-list cx-prop-field=\"{{cxPropField}}\" class=\"cxPbPermListComp\" cx-prop-field-profiles=\"{{cxPropField.profiles}}\" cx-prop-value=\"{{cxPropField.profiles}}\" cx-prop-profiles=\"{{cxPropProfiles}}\" on-before-profile-permission-select=\"{{method('beforeProfilePermissionSelect')}}\" on-profile-permission-changed=\"{{method('profilePermissionChanged')}}\"></crux-permission-list> </lyte-tab-content> </template></template> <template is=\"for\" items=\"{{cxPropExtraDefinitions}}\" item=\"item\" index=\"index\"> <lyte-tab-content id=\"tabs{{index}}\"> <lyte-yield yield-name=\"{{item.cxYieldName}}\"></lyte-yield> </lyte-tab-content> </template> </lyte-tab-body> </template> </lyte-tabs> </template></template> </lyte-modal-content> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{showPreview}}\"><template case=\"true\"> <lyte-popover lt-prop-show=\"{{showPreview}}\" lt-prop-origin-elem=\"#cruxBuilderFieldPreview_{{cxPropField.id}}\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method(&quot;closePreviewPopup&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <div class=\"tooltip_cnt\" style=\"max-height: 251.375px; overflow: auto;\"> <lyte-popover-content> <div> {{cxPropField.field_label}}</div> <crux-field cx-prop-field=\"{{cxPropField}}\" cx-prop-appearance=\"box\" cx-prop-field-key=\"undefined\" cx-prop-align-label=\"horizontal\"></crux-field> </lyte-popover-content> </div> </template> </lyte-popover> </template></template> <template is=\"if\" value=\"{{picklistSettingsModal}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbPicklistSettingsModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"764px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{picklistSettingsModalHeader}}</lyte-modal-header> <lyte-modal-content> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','reference_values')}}\"><template case=\"true\"> <div class=\"cxPbPropActionModalContent\"> {{cruxGetI18n('crm.picklist.reference.info')}} <span onclick=\"{{action('helpLinkClicked','picklist_reference_values')}}\">{{cruxGetI18n('crm.login.learn.more')}}</span> </div> <div class=\"cxPbPropNote\"> <b>Note:</b> Changes made to reference values will be affected to all the layouts. </div> <lyte-table lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th> {{list.name}} </lyte-th> <lyte-th> {{list.name}} </lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"for\" items=\"{{picklistJson}}\" item=\"list\" index=\"indexVal\"> <lyte-tr> <lyte-td><lyte-input lt-prop-appearance=\"box\" lt-prop-width=\"100%\" lt-prop-disabled=\"true\" lt-prop-value=\"{{list.display_value}}\"> </lyte-input></lyte-td> <lyte-td><lyte-input lt-prop-appearance=\"box\" lt-prop-width=\"100%\" lt-prop-value=\"{{lbind(list.reference_value)}}\"> </lyte-input></lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','bulk_option')}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"textarea\" lt-prop-height=\"485px\" lt-prop-width=\"100%\" lt-prop-text-area-resize=\"{&quot;horizontal&quot; : true, &quot;vertical&quot; : false }\" lt-prop-placeholder=\"{{cruxGetI18n('crm.picklist.textarea.msg')}}\" lt-prop-value=\"{{lbind(picklistBulkOptionValue)}}\"></lyte-input> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','unused_values')}}\"><template case=\"true\"> <ul> <template is=\"for\" items=\"{{picklistUnusedValues}}\" item=\"item\" index=\"index\"> <li> <lyte-checkbox lt-prop-label=\"{{item.actual_value}}\" on-changed=\"{{method('unusedOptionsChecked',item)}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{ifEquals(picklistUnusedOptionItemsChecked.length,picklistUnusedValues.length)}}\"></lyte-checkbox> </li> </template> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','predefined_options')}}\"><template case=\"true\"> <div class=\"cxPbPlPreOptModalCont\"> <ul class=\"cxPbPlPreOptModalLeftCont\"> <template is=\"for\" items=\"{{picklistPredefinedOption}}\" item=\"item\" index=\"index\"> <li class=\"cxPbPlPreOptModalLeftContItem\" onclick=\"{{action('piclistPredefinedOptionsTitleClicked',item)}}\">{{item.cxPropTitle}}</li> </template> </ul> <ul class=\"cxPbPlPreOptModalRightCont\"> <li class=\"cxPbPlPreOptModalRightContItem cxPbPinned\"> <lyte-checkbox lt-prop-label=\"Select All\" on-changed=\"{{method('prefidenedChecked','select_all')}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{ifEquals(picklistPredefinedOptionItemsChecked.length,picklistPredefinedOptionItems.length)}}\"></lyte-checkbox> </li> <li class=\"cxPbPlPreOptModalRightNestedCont\"> <ul> <template is=\"for\" items=\"{{picklistPredefinedOptionItems}}\" item=\"item\" index=\"index\"> <li class=\"cxPbPlPreOptModalRightContItem\"> <lyte-checkbox lt-prop-label=\"{{item}}\" lt-prop-checked=\"{{cruxContains(picklistPredefinedOptionItemsChecked,item,picklistPredefinedOptionItemsChecked.length)}}\" lt-prop-prevent-callback-observers=\"true\" on-changed=\"{{method('prefidenedChecked',item)}}\"></lyte-checkbox> </li> </template> </ul> </li> </ul> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','convert_global')}}\"><template case=\"true\"> <p class=\"cxPbPropActionModalContent\">{{cruxGetI18n('mb.globalfield.convertWarning1')}}</p> <div class=\"cxPbPropNote\">{{cruxGetI18n('mb.globalfield.convertWarning2')}}</div> <div class=\"cxPbPropPlGlobalFormField\"> <span class=\"cxPbPropPlGlobalFormLabel\"> {{cruxGetI18n('globalfield.label.name')}} </span> <lyte-input lt-prop-width=\"100%\" lt-prop-value=\"{{lbind(globalPicklistName)}}\" lt-prop-appearance=\"box\"></lyte-input> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','replace_values')}}\"><template case=\"true\"> <p class=\"cxPbPropActionModalContent\">{{cruxGetI18n('picklist.replace.info')}}</p> <div class=\"cxPbPropPlReplaceForm\"> <div class=\"cxPbPropPlReplaceFormFld\"> <span class=\"cxPbPropPlReplaceFormFldLabel\">{{cruxGetI18n('crm.replace.picklist.originalStr')}}</span> <crux-dropdown cx-prop-options=\"{{picklistJson}}\" cx-prop-user-value=\"actual_value\" cx-prop-system-value=\"actual_value\" cx-prop-type=\"single\" on-option-select=\"{{method('picklistReplaceOriginalSelect')}}\"></crux-dropdown> </div> <div class=\"cxPbPropPlReFormSwapIconWrap cxFlexCenter\"> <i class=\"cxPbSprite cxPbMoveIcon cxPbPropPlSwapIcon\"></i> </div> <div class=\"cxPbPropPlReplaceFormFld\"> <span class=\"cxPbPropPlReplaceFormFldLabel\">{{cruxGetI18n('crm.replace.picklist.replaceStr')}}</span> <crux-dropdown cx-prop-options=\"{{replacePicklistJson}}\" cx-prop-user-value=\"actual_value\" cx-prop-system-value=\"actual_value\" cx-prop-type=\"single\" on-option-select=\"{{method('picklistReplaceReplaceSelect')}}\"></crux-dropdown> </div> </div> <ul class=\"cxPbPropNote cxPbPlReplaceModalNote\"> <li>{{cruxGetI18n('crm.picklist.replace.info1')}}{{cruxGetI18n('crm.picklist.replace.info2')}}</li> <li>{{cruxGetI18n('crm.picklist.replace.info3')}}</li> <li>{{cruxGetI18n('crm.picklist.replace.info5')}}</li> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','history_tracking')}}\"><template case=\"true\"> <div> {{cruxGetI18n('crm.picklist.tracker.label.name')}} <lyte-input lt-prop-value=\"{{lbind(picklistTrackingRelatedName)}}\" lt-prop-appearance=\"box\"></lyte-input> {{cruxGetI18n('crm.picklist.tracker.sc.label')}} <span> {{cruxGetI18n('crm.smartfilter.picklist.options.msg')}} </span> <crux-column-list cx-prop-fields=\"{{picklistTrackingFields}}\" cx-prop-selected-fields=\"{{picklistTrackingSelectedFields}}\" cx-prop-id=\"picklistTracking\"></crux-column-list> </div> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closePicklistSeetingModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('picklistSettingModalSave')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{picklistSettingModalSaveButtonTitle}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{lookupPropertyModal}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbLookupSettingModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"764px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" on-show=\"{{method('lookupPropertyModalShowMt')}}\" lt-prop-allow-multiple=\"true\" on-close=\"{{method('lookupPropertyModalCloseMt')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> {{lookupPropertyModalTitle}} <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','field_of_lookup')}}\"><template case=\"true\"> <div class=\"cxPbFieldOfLookupHeader\"> <div>{{cruxGetI18n('crm.customfield.lookup.relatedfield.addmsg')}}</div> <lyte-button lt-prop-appearance=\"primary\" lt-prop-class=\"cxPbFieldOfLookupBtn outlineprimary\" onclick=\"{{action('addFieldOfLookupFields')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.customfield.lookup.relatedfield.addfieldbutton')}} </template> </lyte-button> </div> </template></template> </lyte-modal-header> <lyte-modal-content class=\"{{if(expHandlers(lookupPropertyModalOption,'==','field_of_lookup'),'cxPbFldLookupModalContent','')}}\"> <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','lookup_filter')}}\"><template case=\"true\"> <div class=\"cxPbModalCriteria\"></div> </template></template> <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','field_of_lookup')}}\"><template case=\"true\"> <div class=\"cxPbFieldOfLookup\"> <lyte-table lt-prop-yield=\"true\" class=\"cxPbFieldOfLookupTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.fieldsadded',relatedModule.singular_label)}}</lyte-th> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.relatedas')}}</lyte-th> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.fieldsadded',cxPropModule.singular_label)}}</lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"if\" value=\"{{expHandlers(fieldOfLookupSelectedFieldsList.length,'==',0)}}\"><template case=\"true\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"2\"><table><tbody> <tr><td colspan=\"3\" class=\"cxPbFldLookupTableNoRecord\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.emptylist')}}</td></tr> </tbody></table></template></template> </template><template case=\"false\"> <template is=\"for\" items=\"{{fieldOfLookupSelectedFieldsList}}\" item=\"item\" index=\"index\"> <lyte-tr> <lyte-td>{{item.fieldOfLookupPrimaryFieldsSelectedObj.label}}</lyte-td> <lyte-td>{{item.fieldOfLookupMappingSelected.relation_type}}</lyte-td> <lyte-td>{{item.primary_field_label}}</lyte-td> </lyte-tr> </template> </template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </div> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"cxPbFldLookupModalFooter {{if(expHandlers(lookupPropertyModalOption,'==','lookup_filter'),'cxPbLkupFltrModalFooter','')}}\"> <span class=\"cxPbFldLookupMsg\"><span class=\"cxPbDefaultSprite cxPbFldLookupInfoIcon\"></span>{{cruxGetI18n('crm.customfield.lookup.relatedfield.info')}}</span> <span> <lyte-button onclick=\"{{action('closeLookupPropertyModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveLookupPropertyModal',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{saveLookupPropertyModalLabel}} </template> </lyte-button> </span> </lyte-modal-footer> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{fieldOfLookupFieldAdd}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbFieldOfLookupModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"664px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-allow-multiple=\"true\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{cruxGetI18n('crm.label.subform.addField')}}</lyte-modal-header> <lyte-modal-content> <div class=\"cxPbFldLookupFormRow\"> <span class=\"cxPbFldLookupFormLabel\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.chooselookupfield',relatedModule.singular_label)}}</span> <div class=\"cxPbFldLookupFormValue\"> <crux-dropdown cx-prop-options=\"{{fieldOfLookupPrimaryFields}}\" cx-prop-selected=\"{{lbind(fieldOfLookupPrimaryFieldsSelected)}}\" cx-prop-user-value=\"label\" cx-prop-system-value=\"fieldId\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"single\" on-option-select=\"{{method('lookupFieldSelection')}}\"></crux-dropdown> </div> </div> <div class=\"cxPbFldLookupFormRow\"> <div class=\"cxPbFldLookupFormValue\"> <div class=\"cxMappingTypeWrapper\"> <label class=\"cxPbFldLookupFormLabel\">Mapping type</label> <lyte-radiobutton-group lt-prop-name=\"mappingType\" lt-prop-type=\"default\" lt-prop-value=\"{{lbind(fieldOfLookupMappingSelected)}}\" lt-prop-options=\"{{fieldOfLookupMappingOptions}}\" lt-prop-user-value=\"name\" lt-prop-system-value=\"value\" lt-prop-selected=\"{{lbind(fieldOfLookupMappingSelected)}}\" lt-prop-disabled-list=\"{{if(fieldOfLookupMappingDisabled,fieldOfLookupMappingDisabledOptions,)}}\" lt-prop-alignment=\"horizontal\"> </lyte-radiobutton-group> </div> </div> </div> <div class=\"cxPbFldLookupFormRow\"> <template is=\"if\" value=\"{{expHandlers(fieldOfLookupMappingSelected.value,'==','new_field')}}\"><template case=\"true\"> <span class=\"cxPbFldLookupFormLabel\">Field Label</span> <div class=\"cxPbFldLookupFormValue\"> <lyte-input lt-prop-width=\"100%\" lt-prop-type=\"text\" lt-prop-name=\"fieldLabel\" lt-prop-placeholder=\"Field Name\" lt-prop-value=\"{{primary_field_label}}\" lt-prop-disabled=\"{{fieldOfLookupSecondaryDisabled}}\" lt-prop-required=\"{{expHandlers(ltPropMappingType,'===','add_new')}}\"> </lyte-input> </div> </template><template case=\"false\"> <span class=\"cxPbFldLookupFormLabel\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.sync.option2.label')}}</span> <div class=\"cxPbFldLookupFormValue\"> <crux-dropdown cx-prop-options=\"{{fieldOfLookupSecondaryFields}}\" cx-prop-user-value=\"label\" cx-prop-system-value=\"fieldId\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"single\" cx-prop-disabled=\"{{fieldOfLookupSecondaryDisabled}}\" cx-prop-selected=\"{{lbind(fieldOfLookupSecondarySelected)}}\"></crux-dropdown> </div> </template></template> </div> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closeFieldOfLookupFieldAddModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveFieldOfLookupFieldAddModal',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.save')}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </template></template> <lyte-alert> </lyte-alert> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"for","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"for","position":[0,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"for","position":[3,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"text","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,0]},{"type":"componentDynamic","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},{"type":"attr","position":[1,3,1,1]},{"type":"componentDynamic","position":[1,3,1,1]},{"type":"attr","position":[1,3,3,1,1]},{"type":"for","position":[1,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[3,9]},{"type":"if","position":[3,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]},{"type":"text","position":[5,1,1]},{"type":"attr","position":[5,3]},{"type":"componentDynamic","position":[5,3]}]}},"default":{}},{"type":"attr","position":[3,11]},{"type":"if","position":[3,11],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,1,1,0]},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"text","position":[3,5,1,0]},{"type":"attr","position":[3,5,3]},{"type":"componentDynamic","position":[3,5,3]},{"type":"text","position":[5,1,0]},{"type":"text","position":[5,1,1]},{"type":"text","position":[5,3,0]},{"type":"text","position":[5,5,0]}]}},"default":{}},{"type":"attr","position":[3,13]},{"type":"if","position":[3,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5]},{"type":"text","position":[1,7,1]},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1,9]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1,0]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"text","position":[1,1,1,3,0]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"text","position":[1,1,1,5,0]},{"type":"componentDynamic","position":[1,1,1,5]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,0]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,1,1]},{"type":"attr","position":[5,3,1]},{"type":"registerYield","position":[5,3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3,1]},{"type":"attr","position":[5,3,3]},{"type":"registerYield","position":[5,3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,1,0]},{"type":"attr","position":[3,1,3,1]},{"type":"componentDynamic","position":[3,1,3,1]},{"type":"attr","position":[3,3,1,1,3]},{"type":"componentDynamic","position":[3,3,1,1,3]},{"type":"attr","position":[3,5,1]},{"type":"if","position":[3,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[11]}],
_observedAttributes :["cxPropExtraDefinitions","cxPropField","cxPropFieldPropertyJson","inputFieldObj","inputFieldObj1","dropdownOption","statusOption","customTaxJson","picklistJson","unusedFieldsJson","propertiesJson","primary_field_label","cxPropRules","cxPropProfiles","selectedProfiles","profilesReadWrite","profilesReadOnly","profileOption","cxPropSectionModelName","showModal","picklistPredefinedOption","cxPropFieldPropertiesActions","cxPropDisableFieldPropActions","cxPropFieldPropActionsToolTip","picklistPredefinedOptionItems","picklistPredefinedOptionItemsChecked","picklistBulkOptionValue","triggerVisiblity","fieldOfLookupMappingOptions","fieldOfLookupMappingSelected","folAssociation","fieldOfLookupMappingDisabled","fieldOfLookupSelectedFieldsList","fieldOfLookupMappingDisabledOptions","fieldOfLookupSecondaryDisabled","fieldOfLookupPrimaryFieldsSelected","fieldOfLookupSecondarySelected","fieldOfLookupUserValue","fieldOfLookupSystemValue","cxPropModule","relatedModule","cxPropFieldSpecialMetaKeys","mandatoryDisableTooltip"],
_observedAttributesType :["array","object","object","object","object","array","array","array","array","array","array","string","array","array","array","array","array","boolean","string","boolean","array","array","boolean","string","array","array","string","boolean","array","object","array","boolean","array","array","boolean","string","string","string","string","object","object","object","string"],

	data : function(){
		var dataArr = [{"name":"normal","value":"Normal"},{"name":"small","value":"Small"}];  //no I18n
		var stautusArr = [{"name":"Closed Lost","value":"closed_lost"}];  //no I18n
		return {
			cxPropExtraDefinitions : Lyte.attr('array',{default : []}), //no I18n
			cxPropField : Lyte.attr('object',{default : {}}), //no i18n
			cxPropFieldPropertyJson : Lyte.attr('object'),
			inputFieldObj: Lyte.attr('object', {'default': {"field_label":"First name","required":true} }), //no I18n
			inputFieldObj1: Lyte.attr('object', {'default': {"field_label":"First www"} }), //no I18n
			dropdownOption: Lyte.attr('array', { default: dataArr }), //no I18n
			statusOption: Lyte.attr('array', { default: stautusArr }), //no I18n
			customTaxJson : Lyte.attr( 'array' , { default : [ //no I18n
					{ tax : 'VAT' , value : '20' }, //no I18n
					{ tax : 'Sales Tax' , value : '20' }, //no I18n
					{ tax : 'Sales Tax1' , value : '20' } //no I18n
			] } ),
			picklistJson: Lyte.attr('array'),
			unusedFieldsJson: Lyte.attr( 'array' , { default : [ //no I18n
				{ name:"Closed-Lost to competition to to competition",probability:"39",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Value Proposition",probability:"20",dealCategory:"Closed Won",forecastCategory:"Closed"}, //no I18n
				{ name:"Identify Decision Makers",probability:"43",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Proposal/Price Quote",probability:"44",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Negative Review",probability:"55",dealCategory:"Closed Won",forecastCategory:"Closed"} //no I18n
			]}),
			propertiesJson : Lyte.attr('array'),
			primary_field_label: Lyte.attr('string', {default : ''}),
			cxPropRules : Lyte.attr('array', {default : [{name : 'Layout'}, {name : 'Validation'}]}),
			cxPropProfiles : Lyte.attr('array'),
			selectedProfiles : Lyte.attr('array',{default : []}),
			profilesReadWrite : Lyte.attr('array',{default : []}),
			profilesReadOnly : Lyte.attr('array',{default : []}),
			profileOption : Lyte.attr('boolean', {default : false}),
			cxPropSectionModelName : Lyte.attr('string'), //no i18n
			showModal : Lyte.attr('boolean',{default : false}),
			picklistPredefinedOption : Lyte.attr('array',{default :
				[{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.days.of.the.week"),
					"cxPropOptions":[_cruxUtils.getI18n("Sunday"),_cruxUtils.getI18n("Monday"),_cruxUtils.getI18n("Tuesday"),_cruxUtils.getI18n("Wednesday"),_cruxUtils.getI18n("Thursday"),_cruxUtils.getI18n("Friday")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.month.of.the.year"),
					"cxPropOptions":[_cruxUtils.getI18n("January"),_cruxUtils.getI18n("February"),_cruxUtils.getI18n("March"),_cruxUtils.getI18n("April"),_cruxUtils.getI18n("May"),_cruxUtils.getI18n("June"),_cruxUtils.getI18n("July"),_cruxUtils.getI18n("August"),_cruxUtils.getI18n("September"),_cruxUtils.getI18n("October"),_cruxUtils.getI18n("November"),_cruxUtils.getI18n("December")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.time.zones"),
					"cxPropOptions":["(-12:00) International Date Line","(-11:00) Midway Island, Samoa","(-10:00) Hawaii","(-9:00) Alaska","(-8:00) Pacific","(-7:00) Mountain","(-6:00) Central","(-5:00) Eastern","(-4:30) Venezuela","(-4:00) Atlantic","(-3:30) Newfoundland","(-3:00) Brasilia, Buenos Aires, Georgetown","(-2:00) Mid-Atlantic","(-1:00) Azores, Cape Verde Isles","(0:00) Dublin, London, Monrovia, Casablanca","(+1:00) Paris, Madrid, Athens, Berlin, Rome","(+2:00) Eastern Europe, Harare, Pretoria, Israel","(+3:00) Moscow, Baghdad, Kuwait, Nairobi","(+3:30) Tehran","(+4:00) Abu Dhabi, Muscat, Tbilisi, Kazan","(+4:30) Kabul","(+5:00) Islamabad, Karachi, Ekaterinburg","(+5:30) Bombay, Calcutta, Madras, New Delhi","(+6:00) Almaty, Dhaka","(+7:00) Bangkok, Jakarta, Hanoi","(+8:00) Beijing, Hong Kong, Perth, Singapore","(+9:00) Tokyo, Osaka, Sapporo, Seoul, Yakutsk","(+9:30) Adelaide, Darwin","(+10:00) Sydney, Guam, Port Moresby, Vladivostok","(+11:00) Magadan, Solomon Isles, New Caledonia","(+12:00) Fiji, Marshall Isles, Wellington, Auckland"]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.us.state"),
					"cxPropOptions":[_cruxUtils.getI18n("Alabama"),_cruxUtils.getI18n("Alaska"),_cruxUtils.getI18n("Arizona"),_cruxUtils.getI18n("Arkansas"),_cruxUtils.getI18n("California"),_cruxUtils.getI18n("Colorado"),_cruxUtils.getI18n("Connecticut"),_cruxUtils.getI18n("Delaware"),_cruxUtils.getI18n("Florida"),_cruxUtils.getI18n("Georgia And The South Sandwich Islands"),_cruxUtils.getI18n("Hawaii"),_cruxUtils.getI18n("Idaho"),_cruxUtils.getI18n("Illinois"),_cruxUtils.getI18n("Indiana/Indianapolis"),_cruxUtils.getI18n("Iowa"),_cruxUtils.getI18n("Kansas"),_cruxUtils.getI18n("Kentucky/Louisville"),_cruxUtils.getI18n("Louisiana"),_cruxUtils.getI18n("Maine"),_cruxUtils.getI18n("Maryland"),_cruxUtils.getI18n("Massachusetts"),_cruxUtils.getI18n("Michigan"),_cruxUtils.getI18n("Minnesota"),_cruxUtils.getI18n("Mississippi"),_cruxUtils.getI18n("Missouri"),_cruxUtils.getI18n("Montana"),_cruxUtils.getI18n("Nebraska"),_cruxUtils.getI18n("Nevada"),_cruxUtils.getI18n("New Hampshire"),_cruxUtils.getI18n("New Jersey"),_cruxUtils.getI18n("New Mexico"),_cruxUtils.getI18n("New York"),_cruxUtils.getI18n("North Carolina"),_cruxUtils.getI18n("North Dakota"),_cruxUtils.getI18n("Ohio"),_cruxUtils.getI18n("Oklahoma"),_cruxUtils.getI18n("Oregon"),_cruxUtils.getI18n("Pennsylvania"),_cruxUtils.getI18n("Rhode Island"),_cruxUtils.getI18n("South Carolina"),_cruxUtils.getI18n("South Dakota"),_cruxUtils.getI18n("Tennessee"),_cruxUtils.getI18n("Texas"),_cruxUtils.getI18n("Utah"),_cruxUtils.getI18n("Vermont"),_cruxUtils.getI18n("Virginia"),_cruxUtils.getI18n("Washington"),_cruxUtils.getI18n("West Virginia"),_cruxUtils.getI18n("Wisconsin"),_cruxUtils.getI18n("Wyoming")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.continents"),
					"cxPropOptions":["Asia", "North America", "South America", "Africa", "Antarctica", "Australia", "Europe"]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.regions"),
					"cxPropOptions":[_cruxUtils.getI18n("Afghanistan-Asia/Kabul"),_cruxUtils.getI18n("Albania-Europe/Tirane"),_cruxUtils.getI18n("Algeria-Africa/Algiers"),_cruxUtils.getI18n("American Samoa"),_cruxUtils.getI18n("Andorra"),_cruxUtils.getI18n("Angola"),_cruxUtils.getI18n("Anguilla"),_cruxUtils.getI18n("Antarctica"),_cruxUtils.getI18n("Antigua and Barbuda"),_cruxUtils.getI18n("Argentina-AGT"),_cruxUtils.getI18n("Armenia-Asia/Yerevan"),_cruxUtils.getI18n("/Aruba"),_cruxUtils.getI18n("Australia-ACT"),_cruxUtils.getI18n("Austria-Europe/Vienna"),_cruxUtils.getI18n("Azerbaijan-Asia/Baku"),_cruxUtils.getI18n("Bahamas"),_cruxUtils.getI18n("Bahrain-Asia/Bahrain"),_cruxUtils.getI18n("Bangladesh"),_cruxUtils.getI18n("Barbados"),_cruxUtils.getI18n("Belarus-Europe/Minsk"),_cruxUtils.getI18n("BelgiumDutch"),_cruxUtils.getI18n("BelgiumFrench"),_cruxUtils.getI18n("Belize"),_cruxUtils.getI18n("Benin"),_cruxUtils.getI18n("Bermuda"),_cruxUtils.getI18n("Bhutan"),_cruxUtils.getI18n("Bolivia-America/La_Paz"),_cruxUtils.getI18n("Bosnia and Herzegovina"),_cruxUtils.getI18n("Botswana-Africa/Gaborone"),_cruxUtils.getI18n("Bouvet Island"),_cruxUtils.getI18n("Brazil-America/Araguaina"),_cruxUtils.getI18n("British Indian Ocean Territory"),_cruxUtils.getI18n("British Virgin Islands"),_cruxUtils.getI18n("Brunei-Asia/Brunei"),_cruxUtils.getI18n("Bulgaria-Europe/Sofia"),_cruxUtils.getI18n("Burkina Faso"),_cruxUtils.getI18n("Burundi"),_cruxUtils.getI18n("Cambodia"),_cruxUtils.getI18n("Cameroon"),_cruxUtils.getI18n("CanadaEnglish"),_cruxUtils.getI18n("CanadaFrench"),_cruxUtils.getI18n("Cape Verde"),_cruxUtils.getI18n("Cayman Islands"),_cruxUtils.getI18n("Central African Republic"),_cruxUtils.getI18n("Chad"),_cruxUtils.getI18n("Chile-America/Santiago"),_cruxUtils.getI18n("China"),_cruxUtils.getI18n("Christmas Island"),_cruxUtils.getI18n("Cocos Islands"),_cruxUtils.getI18n("Colombia-America/Bogota"),_cruxUtils.getI18n("Comoros"),_cruxUtils.getI18n("Congo"),_cruxUtils.getI18n("Cook Islands"),_cruxUtils.getI18n("Costa Rica-America/Costa_Rica"),_cruxUtils.getI18n("Croatia-Europe/Zagreb"),_cruxUtils.getI18n("Cuba"),_cruxUtils.getI18n("Cyprus"),_cruxUtils.getI18n("Czech Republic-Europe/Prague"),_cruxUtils.getI18n("dIvoire"),_cruxUtils.getI18n("Denmark-Europe/Copenhagen"),_cruxUtils.getI18n("Democratic Republic of the Congo"),_cruxUtils.getI18n("Djibouti-Africa/Djibouti"),_cruxUtils.getI18n("Dominican Republic-America/Santo_Domingo"),_cruxUtils.getI18n("Ecuador-America/Guayaquil"),_cruxUtils.getI18n("Egypt-Africa/Cairo"),_cruxUtils.getI18n("El Salvador-America/El_Salvador"),_cruxUtils.getI18n("Equatorial Guinea"),_cruxUtils.getI18n("Eritrea-Africa/Asmera"),_cruxUtils.getI18n("Estonia-Europe/Tallinn"),_cruxUtils.getI18n("Ethiopia-Africa/Addis_Ababa"),_cruxUtils.getI18n("Falkland Islands"),_cruxUtils.getI18n("Faroe Islands-Atlantic/Faeroe"),_cruxUtils.getI18n("Fiji"),_cruxUtils.getI18n("Finland-Europe/Helsinki"),_cruxUtils.getI18n("France-ECT"),_cruxUtils.getI18n("French Guiana"),_cruxUtils.getI18n("French Polynesia"),_cruxUtils.getI18n("French Southern Territories"),_cruxUtils.getI18n("Gabon"),_cruxUtils.getI18n("Gambia"),_cruxUtils.getI18n("Germany-Europe/Berlin"),_cruxUtils.getI18n("Ghana"),_cruxUtils.getI18n("Gibraltar"),_cruxUtils.getI18n("Greece-Europe/Athens"),_cruxUtils.getI18n("Greenland-America/Danmarkshavn"),_cruxUtils.getI18n("Grenada"),_cruxUtils.getI18n("Guadeloupe"),_cruxUtils.getI18n("Guam"),_cruxUtils.getI18n("Guatemala-America/Guatemala"),_cruxUtils.getI18n("Guinea-Bissau"),_cruxUtils.getI18n("Guyana"),_cruxUtils.getI18n("Haiti"),_cruxUtils.getI18n("Honduras-America/Tegucigalpa"),_cruxUtils.getI18n("Hungary-Europe/Budapest"),_cruxUtils.getI18n("Iceland-Atlantic/Reykjavik"),_cruxUtils.getI18n("Indonesia-Asia/Jakarta"),_cruxUtils.getI18n("Iran-Asia/Tehran"),_cruxUtils.getI18n("Iraq-Asia/Baghdad"),_cruxUtils.getI18n("Ireland-Eire"),_cruxUtils.getI18n("Northern Ireland "),_cruxUtils.getI18n("Israel-Asia/Jerusalem"),_cruxUtils.getI18n("Italy-Europe/Rome"),_cruxUtils.getI18n("Jamaica"),_cruxUtils.getI18n("Japan"),_cruxUtils.getI18n("Jordan-Asia/Amman"),_cruxUtils.getI18n("Kazakhstan-Asia/Almaty"),_cruxUtils.getI18n("Kenya-Africa/Nairobi"),_cruxUtils.getI18n("Kiribati"),_cruxUtils.getI18n("Kosovo"),_cruxUtils.getI18n("Kuwait-Asia/Kuwait"),_cruxUtils.getI18n("Kyrgyzstan"),_cruxUtils.getI18n("Laos"),_cruxUtils.getI18n("Latvia-Europe/Riga"),_cruxUtils.getI18n("Lebanon-Asia/Beirut"),_cruxUtils.getI18n("Lesotho"),_cruxUtils.getI18n("Liberia"),_cruxUtils.getI18n("Libya-Africa/Tripoli"),_cruxUtils.getI18n("Liechtenstein"),_cruxUtils.getI18n("Lithuania-Europe/Vilnius"),_cruxUtils.getI18n("LuxembourgFrench"),_cruxUtils.getI18n("LuxembourgGerman"),_cruxUtils.getI18n("Macao SAR China-Asia/Macao"),_cruxUtils.getI18n("Macedonia-Europe/Skopje"),_cruxUtils.getI18n("North Macedonia"),_cruxUtils.getI18n("Madagascar"),_cruxUtils.getI18n("Malawi"),_cruxUtils.getI18n("Malaysia-Asia/Kuala_Lumpur"),_cruxUtils.getI18n("Maldives"),_cruxUtils.getI18n("Malicious content detected."),_cruxUtils.getI18n("Malta-Europe/Malta"),_cruxUtils.getI18n("Marshall Islands"),_cruxUtils.getI18n("Martinique"),_cruxUtils.getI18n("Mauritania"),_cruxUtils.getI18n("Mauritius"),_cruxUtils.getI18n("Mayotte"),_cruxUtils.getI18n("Mexico-America/Cancun"),_cruxUtils.getI18n("Micronesia"),_cruxUtils.getI18n("Moldova"),_cruxUtils.getI18n("Monaco"),_cruxUtils.getI18n("Mongolia"),_cruxUtils.getI18n("Montserrat"),_cruxUtils.getI18n("Morocco-Africa/Casablanca"),_cruxUtils.getI18n("Mozambique"),_cruxUtils.getI18n("Myanmar"),_cruxUtils.getI18n("Namibia"),_cruxUtils.getI18n("Nauru"),_cruxUtils.getI18n("Nepal"),_cruxUtils.getI18n("Netherlands-Europe/Amsterdam"),_cruxUtils.getI18n("Netherlands Antilles"),_cruxUtils.getI18n("New Caledonia"),_cruxUtils.getI18n("New Zealand-NST"),_cruxUtils.getI18n("Nicaragua-America/Managua"),_cruxUtils.getI18n("Niger"),_cruxUtils.getI18n("Nigeria"),_cruxUtils.getI18n("Niue"),_cruxUtils.getI18n("Norfolk Island"),_cruxUtils.getI18n("North Korea"),_cruxUtils.getI18n("Northern Mariana Islands"),_cruxUtils.getI18n("Norway-Europe/Oslo"),_cruxUtils.getI18n("Oman-Asia/Muscat"),_cruxUtils.getI18n("Pakistan-Asia/Karachi"),_cruxUtils.getI18n("Palau"),_cruxUtils.getI18n("Palestine"),_cruxUtils.getI18n("Panama-America/Panama"),_cruxUtils.getI18n("Papua New Guinea"),_cruxUtils.getI18n("Paraguay-America/Asuncion"),_cruxUtils.getI18n("Peru-America/Lima"),_cruxUtils.getI18n("Philippines-Asia/Manila"),_cruxUtils.getI18n("Pitcairn"),_cruxUtils.getI18n("Poland-Europe/Warsaw"),_cruxUtils.getI18n("Portugal-Atlantic/Azores"),_cruxUtils.getI18n("Puerto Rico-America/Puerto_Rico"),_cruxUtils.getI18n("Qatar-Asia/Qatar"),_cruxUtils.getI18n("Reunion"),_cruxUtils.getI18n("Romania-Europe/Bucharest"),_cruxUtils.getI18n("Russia-Asia/Anadyr"),_cruxUtils.getI18n("Rwanda"),_cruxUtils.getI18n("Saint Helena"),_cruxUtils.getI18n("Saint Lucia"),_cruxUtils.getI18n("San Marino"),_cruxUtils.getI18n("Saudi Arabia-Asia/Riyadh"),_cruxUtils.getI18n("Senegal"),_cruxUtils.getI18n("Serbia and Montenegro"),_cruxUtils.getI18n("Seychelles"),_cruxUtils.getI18n("Sierra Leone"),_cruxUtils.getI18n("Singapore-Asia/Singapore"),_cruxUtils.getI18n("Slovakia-Europe/Bratislava"),_cruxUtils.getI18n("Slovenia-Europe/Ljubljana"),_cruxUtils.getI18n("Solomon Islands"),_cruxUtils.getI18n("Somalia-Africa/Mogadishu"),_cruxUtils.getI18n("South Africa-Africa/Johannesburg"),_cruxUtils.getI18n("South Korea-Asia/Seoul"),_cruxUtils.getI18n("SpainCatalan"),_cruxUtils.getI18n("SpainSpanish"),_cruxUtils.getI18n("Sri Lanka"),_cruxUtils.getI18n("Sudan-Africa/Khartoum"),_cruxUtils.getI18n("Suriname"),_cruxUtils.getI18n("Eswatini"),_cruxUtils.getI18n("Sweden-Europe/Stockholm"),_cruxUtils.getI18n("SwitzerlandFrench"),_cruxUtils.getI18n("SwitzerlandGerman"),_cruxUtils.getI18n("SwitzerlandItalian"),_cruxUtils.getI18n("Syria-Asia/Damascus"),_cruxUtils.getI18n("Taiwan-Asia/Taipei"),_cruxUtils.getI18n("Tajikistan"),_cruxUtils.getI18n("Tanzania-Africa/Dar_es_Salaam"),_cruxUtils.getI18n("Thailand-Asia/Bangkok"),_cruxUtils.getI18n("Timor-Leste"),_cruxUtils.getI18n("Togo"),_cruxUtils.getI18n("Tokelau"),_cruxUtils.getI18n("Tonga"),_cruxUtils.getI18n("Trinidad and Tobago"),_cruxUtils.getI18n("Tunisia-Africa/Tunis"),_cruxUtils.getI18n("turkey"),_cruxUtils.getI18n("Turkmenistan"),_cruxUtils.getI18n("Tuvalu"),_cruxUtils.getI18n("U.S. Virgin Islands-America/St_Thomas"),_cruxUtils.getI18n("Uganda"),_cruxUtils.getI18n("Ukraine-Europe/Kiev"),_cruxUtils.getI18n("United Arab Emirates-Asia/Dubai"),_cruxUtils.getI18n("United Kingdom-Europe/Belfast"),_cruxUtils.getI18n("Albanian"),_cruxUtils.getI18n("Algerian"),_cruxUtils.getI18n("United States-America/Adak"),_cruxUtils.getI18n("United States Minor Outlying Islands"),_cruxUtils.getI18n("Uruguay-America/Montevideo"),_cruxUtils.getI18n("Uzbekistan-Asia/Samarkand"),_cruxUtils.getI18n("Vanuatu"),_cruxUtils.getI18n("Vatican"),_cruxUtils.getI18n("Venezuela-America/Caracas"),_cruxUtils.getI18n("Western Sahara"),_cruxUtils.getI18n("Yemen-Asia/Aden"),_cruxUtils.getI18n("Zambia"),_cruxUtils.getI18n("Zimbabwe-Africa/Harare")]
				}]
			}),
			cxPropFieldPropertiesActions : Lyte.attr('array',{default : [{name : "Revert to last saved",value : 'revert_to_last_saved'},{name : "Field usage",value : 'field_usage'}, {name : "Create Layout Rule",value : 'create_layout_rule'}, {name : "Create Validation Rule",value : 'create_validation_rule'} , {name : "Add to other layouts",value : 'add_to_other_layouts'}]}),
			cxPropDisableFieldPropActions : Lyte.attr('boolean',{default : false}),
			cxPropFieldPropActionsToolTip :  Lyte.attr('string'), //no i18n
			picklistPredefinedOptionItems : Lyte.attr('array',{default : []}),
			picklistPredefinedOptionItemsChecked  : Lyte.attr('array',{default : []}),
			picklistBulkOptionValue : Lyte.attr('string',{default : ""}),
			triggerVisiblity : Lyte.attr('boolean',{default : true}),
			fieldOfLookupMappingOptions : Lyte.attr('array',{default : [{name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option1.new'),value : 'new_field', "relation_type" : "Added as"},{name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option2.existing'),value : 'existing_field', "relation_type" : "Mapped to"}]}),
			fieldOfLookupMappingSelected : Lyte.attr('object',{default : {value : 'new_field', name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option1.new'), "relation_type" : "Added as"}}), //no i18n
			folAssociation : Lyte.attr('array',{default : []}), //no i18n
			fieldOfLookupMappingDisabled : Lyte.attr('boolean',{default : true}), //no i18n
			fieldOfLookupSelectedFieldsList : Lyte.attr('array',{default : []}),
			fieldOfLookupMappingDisabledOptions : Lyte.attr('array',{default : ['new_field', 'existing_field']}),
			fieldOfLookupSecondaryDisabled : Lyte.attr('boolean',{default : true}), //no i18n
			fieldOfLookupPrimaryFieldsSelected : Lyte.attr('string',{default : 'none'}), //no i18n
			fieldOfLookupSecondarySelected : Lyte.attr('string',{default : ''}), //no i18n
			fieldOfLookupUserValue : Lyte.attr('string',{default : 'label'}), //no i18n
			fieldOfLookupSystemValue : Lyte.attr('string',{default : 'id'}), //no i18n
			cxPropModule : Lyte.attr('object'), //no i18n
			relatedModule : Lyte.attr('object'), //no i18n
			cxPropFieldSpecialMetaKeys :  Lyte.attr('object',{default : {}}),
			mandatoryDisableTooltip : Lyte.attr('string',{default : 'you cannot remove a field that is marked as required'})
		};		
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
		Lyte.removeEventListener(this.closePropertiesPanel);
	},
	didConnect : function(){
		// this.resetModalPosition();
		// window.addEventListener('resize',()=>{
		// 	this.resetModalPosition();
		// });

		this.closePropertiesPanel = Lyte.addEventListener("cxPbEventClosePropertiesPanel", function(){
			this.closeModal();
		}.bind(this));
	},
	init : function(){
		this.$node.checkAndClosePropperties = function(){
			if(!this.getData('propertiesPanelShow')){
				return true;
			}
			if(this.component.errorProperties && Object.keys(this.component.errorProperties).length){
				Object.keys(this.component.errorProperties).forEach((key)=>{
					Lyte.triggerEvent('cxPbShowFieldMetaError',{
						api_name : key
					});
				});
				return false;
			}
			return new Promise((resolve,reject)=>{
				this.component.closeModal();
				this.component.propertiesCloseResolve = resolve;
				this.component.propertiesCloseReject = reject;
			});
		};

		this.$node.open = async function(field,options){
			if(await this.checkAndClosePropperties() === false){
				return false;
			}
			function dataUpdate(opt){
				if(typeof opt !== 'undefined'){
					if(opt.cxPropPropertyJson){
						this.setData('propertiesJson',opt.cxPropPropertyJson);
					}
					if(opt.cxHideProperties){
						this.setData('cxHideProperties',opt.cxHideProperties);
					}
					if(opt.cxPropExtraDefinitions){
						this.setData('cxPropExtraDefinitions',opt.cxPropExtraDefinitions);
					}
					if(opt.cxHidePermissions){
						this.setData('cxHidePermissions',opt.cxHidePermissions);
					}
					if(opt.error){
						this.component.errorProperties = opt.error;
					}
					if(opt.cxPropFieldPropertiesActions){
						this.setData('cxPropFieldPropertiesActions',opt.cxPropFieldPropertiesActions);
					}
					if(opt.cxPropDisableFieldPropActions){
						this.setData('cxPropDisableFieldPropActions',opt.cxPropDisableFieldPropActions);
					}
					if(opt.cxPropFieldPropActionsToolTip){
						this.setData('cxPropFieldPropActionsToolTip',opt.cxPropFieldPropActionsToolTip);
					}
					if(opt.cxPropModule){
						this.setData('cxPropModule',opt.cxPropModule);
					}
				}
				if((!this.component.data.cxPropField.customizable_properties || this.component.data.cxPropField.customizable_properties.indexOf('removal') > -1) && !this.component.data.cxPropField[this.component.data.cxPropFieldSpecialMetaKeys.cxMandatory]){
					this.setData('showRemoveField',true);
				}else{
					this.setData('showRemoveField',false);
				}
			}
			if(this.component.data.cxPropFieldPropertyJson && this.component.data.cxPropFieldPropertyJson[field.data_type]){
				this.setData({'propertiesJson' : this.component.data.cxPropFieldPropertyJson[field.data_type].properties, 'propertyTitle': this.component.data.cxPropFieldPropertyJson[field.data_type].field_label});
			}
			
			this.setData('cxPropField',field);
			this.component.errorProperties = {};
			dataUpdate.call(this,options);
			if(!this.component.lastRevertKeys[field.id]){
				this.component.lastRevertKeys[field.id] = [];
			}
			this.component.editingValues = {};
			this.component.setProfiles();
			this.setData('showModal',true);
			this.setData('showLoading',false);
			if(this.component.cruxPageBuilder.getMethods('cxPbBeforePropertyPanelOpen')){
				var a = this.component.cruxPageBuilder.executeMethod('cxPbBeforePropertyPanelOpen',this.component.data.propertiesJson,field, this.component.data.cxPropFieldPropertiesActions);
				if(a === false){
					this.setData('showModal',false);
					return;
				}
				if(a instanceof Promise){
					a.then(dataUpdate.bind(this));
				}else{
					dataUpdate.call(this,a);
				}
			}
			this.setData('propertiesPanelShow',true);
			if(Object.keys(this.component.errorProperties).length){
				for(var key in this.component.errorProperties){
					Lyte.triggerEvent('cxPbEventFieldPropertyError',{field_key : key,errorMessage : this.component.errorProperties[key]});
				}
			}
		};
		this.$node.close = function(){
			this.component.closeModal();
		};

		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropFieldSpecialMetaKeys", this.cruxPageBuilder.getData("cxPropFieldSpecialMetaKeys"));
		this.setData("cxPropFieldLabelIterator", this.cruxPageBuilder.getData("cxPropFieldLabelIterator"));
		this.lastRevertKeys = {};
		this.setData('propertiesJson',this.data.cxPropFieldPropertyJson.text.properties);

	},	
	actions : {
		addCustomTaxData:function(indexVal){
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data.splice(index + 1,0,{tax : '' , value : '' }); //no I18n
			this.setData({customTaxJson: [...data]}); //no I18n
			// const className = $L("#cxPbCustomTaxSortSelector")[0].getSortableClass(); //no I18n
			// $L('#cxPbCustomTaxSortSelector lyte-tr').addClass(`sortable-element  ${className}`); //no I18n
		},
		previewField : function() {
			this.setData("showPreview", true);
		},
		removeCustomTaxData:function(indexVal){ //no I18n
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data.splice(index,1); //no I18n
			this.setData({customTaxJson: [...data]}); //no I18n
			// const className = $L("#cxPbCustomTaxSortSelector")[0].getSortableClass(); //no I18n
			// $L('#cxPbCustomTaxSortSelector lyte-tr').addClass(`sortable-element  ${className}`); //no I18n
		},
		setCustomTaxValue:function(e,indexVal){ //no I18n
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data[index][e.target.name] = e.target.value; //no I18n
			this.setData({customTaxJson : data}); //no I18n
		},
		revertToLastSaved : function(){
			this.setData('showLoading',true);
			this.data.cxPropField.$.rollBackAttributes(this.lastRevertKeys[this.data.cxPropField.id]);
			this.setData('showLoading',false);
			if(this.cruxPageBuilder.getMethods('cxPbRevertToLastSaved')){
				this.cruxPageBuilder.executeMethod('cxPbRevertToLastSaved',field);
			}
		},
		closeProperties : function(){
			this.closeModal();
		},
		removeField :  function(){
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforeDeleteField')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforeDeleteField',this.data.cxPropField);
			}
			if(ch instanceof Promise){
				ch.then(function(){
					Lyte.triggerEvent('cxPbDeleteElements',{
						name : 'element', 				
						node : this.$node,
						data : this.data.cxPropField
					});
					this.$node.close();
				}.bind(this));
			}else if(ch){
				Lyte.triggerEvent('cxPbDeleteElements',{
					name : 'element', 				
					node : this.$node,
					data : this.data.cxPropField
				});
				this.$node.close();

			}		
			if(this.cruxPageBuilder.getMethods('cxPbRemoveField')){
				this.cruxPageBuilder.executeMethod('cxPbRemoveField');
			}  

		},
		helpLinkClicked : function(opt){
			if(this.cruxPageBuilder.getMethods('cxPbOpenHelpLink')){
				this.cruxPageBuilder.executeMethod('cxPbOpenHelpLink',opt);
			}    
		},
		piclistPredefinedOptionsTitleClicked : function(opt){
			this.setData({'picklistPredefinedOptionItems' :opt.cxPropOptions, 'picklistPredefinedOptionItemsChecked':[]});
		},
		closePicklistSeetingModal : function(){
			if(this.picklistHistoryReject){
				this.picklistHistoryReject();
			}
			this.setData('picklistSettingOption','');
			this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',false);
		},
		picklistSettingModalSave : function(){
			var dummyArr = [];
			if(this.data.picklistSettingOption === 'reference_values'){
				Lyte.triggerEvent('cxPbEventChangePicklistValues',{field_id : this.data.cxPropField.id,picklistJson : this.data.picklistJson});
			}
			if(this.data.picklistSettingOption === 'replace_values'){
				if(this.cruxPageBuilder.getMethods('cxPbReplacePicklistValue')){
					this.cruxPageBuilder.executeMethod('cxPbReplacePicklistValue',this.data.picklistReplaceOriginalSelected,this.data.picklistReplaceReplaceSelected);
				}
				Lyte.triggerEvent('cxPbEventRemovePicklistValues',{field_id : this.data.cxPropField.id,picklistJson : this.data.picklistReplaceOriginalSelected});
			}
			if(this.data.picklistSettingOption === 'bulk_option'){
				var arrayValue = this.data.picklistBulkOptionValue.split('\n');
				arrayValue.forEach(function(item){
					dummyArr.push({actual_value : item,display_value : item,reference_value : item,color_code : 'noFill'});
				});
				Lyte.triggerEvent('cxPbEventAppendPicklistValues',{field_id : this.data.cxPropField.id,picklistJson : dummyArr});
			}
			if(this.data.picklistSettingOption === 'predefined_options'){
				this.data.picklistPredefinedOptionItemsChecked.forEach(function(item){
					dummyArr.push({actual_value : item,display_value : item,reference_value : item,color_code : 'noFill'});
				});
				Lyte.triggerEvent('cxPbEventAppendPicklistValues',{field_id : this.data.cxPropField.id,picklistJson : dummyArr});
			}
			if(this.data.picklistSettingOption === 'convert_global' && this.cruxPageBuilder.getMethods('cxPbConvertToGlobalSet')){
				
				this.cruxPageBuilder.executeMethod('cxPbConvertToGlobalSet',this.data.globalPicklistName,this.data.picklistJson);
				
			}
			if(this.data.picklistSettingOption === 'history_tracking'){
				this.picklistHistoryResolve();
				if(this.cruxPageBuilder.getMethods('cxPbSetPicklistTrackingDetails')){
					this.cruxPageBuilder.executeMethod('cxPbSetPicklistTrackingDetails',this.data.cxPropField,{display_label : this.data.picklistTrackingRelatedName,cxPropSelectedFields : this.$node.querySelector('.cxPbPicklistSettingsModal').component.childComp.querySelector('crux-column-list').component.getSelectedFields()});
				}
			}
			// this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',false);
		},
		saveLookupPropertyModal : function(node){
			if(this.data.lookupPropertyModalOption === 'lookup_filter'){
				var criteria = node.closest('.cxPbPropActionModal').querySelector('crux-criteria-editor').getCriteria();
				if(criteria){
					this.lookupPropertyModalResponse(criteria);
					this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',false);
				}
			}
		},
		closeLookupPropertyModal : function(){
			this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',false);
		},
		addFieldOfLookupFields : function(){
			let fieldOfLookupMappingDisabled = this.data.fieldOfLookupPrimaryFieldsSelected === 'none';
			this.setData({'fieldOfLookupFieldAdd': true, fieldOfLookupSecondaryDisabled : false,fieldOfLookupMappingDisabled : fieldOfLookupMappingDisabled,fieldOfLookupPrimaryFieldsSelected : '',fieldOfLookupSecondarySelected : ''});
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',true);
		},
		closeFieldOfLookupFieldAddModal : function(){
			this.setData({"fieldOfLookupPrimaryFieldsSelected" : "none","fieldOfLookupMappingDisabled" : true, "primary_field_label" : "", "fieldOfLookupMappingSelected" : this.data.fieldOfLookupMappingOptions[0] });
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',false);
		},
		saveFieldOfLookupFieldAddModal : function(){
			const entry = {
				fieldOfLookupPrimaryFieldsSelectedObj: this.data.fieldOfLookupPrimaryFieldsSelectedObj,
				fieldOfLookupMappingSelected: this.data.fieldOfLookupMappingSelected,
				primary_field_label: this.data.primary_field_label
			};
			Lyte.arrayUtils(this.data.fieldOfLookupSelectedFieldsList,'push',entry);
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',false);
		}

	},
	methods : {
		closePreviewPopup : function(){
			this.setData("showPreview", false);
		},
		fieldActionSelected : function(item){
			if(item === "revert_to_last_saved"){
				this.editingValues = {};
				this.data.cxPropField.$.rollBack();
				this.setData('showLoading',true);
				this.setData('showLoading',false);

			}
			else if(this.cruxPageBuilder.getMethods('cxPbFieldActions')){
				this.cruxPageBuilder.executeMethod('cxPbFieldActions', item.value, this.data.cxPropField);
			}
	
		},
		modalShow : function(){
			if(this.data.propertyRules[this.data.cxPropField.data_type]){
				this.data.propertyRules[this.data.cxPropField.data_type].keys.forEach(function(k){	
					this.updateRules(k,Lyte.Component.registeredHelpers.cruxGetNestedValue(this.data.cxPropField,k));
				}.bind(this));	
			}
			if(this.cruxPageBuilder.getMethods('cxPbPropertyPanelShow')){
				this.cruxPageBuilder.executeMethod('cxPbPropertyPanelShow', this.data.cxPropField);
			}
		// 	setTimeout(function () {
		// 	let input = $L("#prop_header_field_label").find("input")[0];
		// 	if(input){debugger
		// 		input.focus();
		// 	}
		// },0)
			
		},
		onBeforeModalClose : function(event,comp){
			if(Object.keys(this.errorProperties).length){
				Object.keys(this.errorProperties).forEach((key)=>{
					Lyte.triggerEvent('cxPbShowFieldMetaError',{
						api_name : key
					});
				});
				if(this.propertiesCloseReject){
					this.propertiesCloseReject();
				}
				return false;
			}
			if(event.target.closest('.cxMergeFieldBodyPopover') || event.target.closest('.fieldallPermissions') || event.target.closest('.cxPalettePopoverContent') || event.target.closest('.cxPbPreventPropertiesPanelClose') || event.target.closest('.cxPaletteMoreColorsBtn')){
				return false;
			}
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyPanelClose')){
				var t = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyPanelClose',event,comp,this.data.propertiesJson,this.data.cxPropField,this.editingValues);
				if(t === false){
					if(this.propertiesCloseReject){
						this.propertiesCloseReject();
					}
					return false;
				}
			}
			for(var key in this.editingValues){
				if(key === 'field_label'){
					this.cruxPageBuilder.updateFieldList('remove',this.data.cxPropField);
				}
				this.data.cxPropField.$.set(key,this.editingValues[key]);
				Lyte.triggerEvent('cxPbFieldPropChange',{id : this.data.cxPropField.id,error : this.errorProperties});
				if(key === 'field_label'){
					// add new label to list after changing
					this.cruxPageBuilder.updateFieldList('add',this.data.cxPropField);
					// advance iterator for the staged data_type so next preview will move forward
					if(this.stagedFieldLabelDataType){
						if(!this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType]){
							this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType] = 1;
						}else{
							Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',this.stagedFieldLabelDataType,this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType] + 1);
						}
						this.stagedFieldLabelDataType = null;
					}
				}
			}
			// eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
			if(Object.keys(this.errorProperties).length){
				Lyte.triggerEvent('cxPbEventFieldError',{id : this.data.cxPropField.id,error : this.errorProperties});
			}else{
				Lyte.triggerEvent('cxPbEventFieldError',{id : this.data.cxPropField.id});
			}
		},
		modalClose : function(comp){
			// for(var key in this.editingValues){
			// 	this.data.cxPropField.$.set(key,this.editingValues[key]);
			// }
			Lyte.triggerEvent('cxBuilderFieldChange',{
				field : this.data.cxPropField
			});
			// comp.setData( "ltPropReRenderModal" , true ) ;
			comp.setData( "ltPropBindToBody" , false ) ;
			setTimeout(function(){
				this.setData({'showModal':false, 'selectedProfiles':[],'profilesReadWrite':[],'profilesReadOnly':[], 'showPreview' : false,'propertiesPanelShow' :false, "cxHideProperties": false});
				if(this.cruxPageBuilder.getMethods('cxPbPropertyPanelClose')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyPanelClose',event,comp,this.data.cxPropField,this.editingValues);
				}
				if(this.propertiesCloseResolve){
					this.propertiesCloseResolve();
				}
			}.bind(this),300);
			this.setData('showLoading',true);
		},
		piclikistSettingOptionClickedFn : function(opt,picklistJson){
			this.setData('picklistSettingsModal',true);
			var a;
			if(opt === 'history_tracking'){
				if(this.cruxPageBuilder.getMethods('cxPbGetPicklistTrackingDetails')){
					a = this.cruxPageBuilder.executeMethod('cxPbGetPicklistTrackingDetails',this.data.cxPropField);
					var tempPicklistTrackingFunction = function(obj){
						this.setData({'picklistSettingOption' : opt, 'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.picklist.tracker.trackinghistory'), 'picklistSettingModalSaveButtonTitle':_cruxUtils.getI18n("Done")});
						this.setData({picklistTrackingRelatedName : obj.display_label,picklistTrackingFields : obj.cxPropFields,picklistTrackingSelectedFields : obj.cxPropSelectedFields});
						this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',true);
					}.bind(this);
					if(a instanceof Promise){
						a.then(function(obj){
							tempPicklistTrackingFunction(obj);
						}.bind(this));
					}else{
						tempPicklistTrackingFunction(a);
					}	
				}
				return new Promise(function(res,rej){
					this.picklistHistoryResolve = res;
					this.picklistHistoryReject = rej;
				}.bind(this));	
			}
			if(this.cruxPageBuilder.getMethods('cxPbPicklistSettingOption') && opt !== 'history_tracking'){
				a = this.cruxPageBuilder.executeMethod('cxPbPicklistSettingOption',opt,this.data.cxPropField,picklistJson);
			 	if(a === false){
			 		return;
			 	}
			}
			this.setData({'picklistSettingsModal':true, 'picklistJson':picklistJson, 'replacePicklistJson':[],'picklistSettingOption':opt});
			if(opt === 'reference_values'){
				this.setData({'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.picklist.reference.value'), 'picklistSettingModalSaveButtonTitle':'Save'});
			}
			if(opt === 'unused_values'){
				this.setData({'picklistSettingsModalHeader' : 'Unused Values', 'picklistSettingModalSaveButtonTitle':'Save'});
				if(this.cruxPageBuilder.getMethods('cxPbGetUnusedPicklistValues')){
					this.setData('picklistUnusedValues',this.cruxPageBuilder.executeMethod('cxPbGetUnusedPicklistValues',this.data.cxPropField));
				}
			}
			if(opt === 'bulk_option'){
				this.setData({'picklistBulkOptionValue' : '', 'picklistSettingsModalHeader':this.data.propertyTitle + ' Properties', 'picklistSettingModalSaveButtonTitle':'Add Choices'});
			}
			if(opt === 'predefined_options'){
				this.setData({'picklistSettingsModalHeader':this.data.propertyTitle + ' Properties', 'picklistPredefinedOptionItems' :this.data.picklistPredefinedOption[0].cxPropOptions, 'picklistPredefinedOptionItemsChecked':[], 'picklistSettingModalSaveButtonTitle':'Add Choices'});
			}
			if(opt === 'convert_global'){
				this.setData({'globalPicklistName':'', 'picklistSettingModalSaveButtonTitle':_cruxUtils.getI18n('crm.workdrive.tab.btn.confirm'), 'picklistSettingsModalHeader':_cruxUtils.getI18n('mb.globalfield.convertGlobal.heading')});
			}
			if(opt === 'replace_values'){
				var temp = Array.from(picklistJson);
				Lyte.arrayUtils(temp,'removeObjects',picklistJson[0]);
				this.setData({'replacePicklistJson':temp,'picklistReplaceOriginalSelected':picklistJson[0] ,'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.mb.label.replace.values'), 'picklistSettingModalSaveButtonTitle':'Save' });
			}
			this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',true);
		},
		lookupPropertyModalClickedFn : async function(opt,property){
			this.setData({'lookupPropertyModal':true, 'lookupPropertyModalOption':opt, 'lookupPropertyModalPropertyObj':property});
			if(opt === 'lookup_filter'){
				this.setData({'saveLookupPropertyModalLabel':_cruxUtils.getI18n('Done'), 'lookupPropertyModalTitle':'Lookup Filter'});
			}
			if(opt === 'field_of_lookup'){
				try{
					// related module info may be sync or return a Promise
					if(this.cruxPageBuilder.getMethods('cxPbGetRelatedModuleInfo')){
						var relatedModule = this.cruxPageBuilder.executeMethod('cxPbGetRelatedModuleInfo', this.data.cxPropField, this.editingValues);
						if(relatedModule instanceof Promise){
							relatedModule = await relatedModule;
						}
						this.setData('relatedModule', relatedModule);
					}
					// related fields - depends on relatedModule, so await result before calling
					if(this.cruxPageBuilder.getMethods('cxPbGetRelatedFieldsInfo')){
						let related_field_info = this.cruxPageBuilder.executeMethod('cxPbGetRelatedFieldsInfo', this.data.relatedModule, this.data.cxPropField);
						if(related_field_info instanceof Promise){
							related_field_info = await related_field_info;
						}
						related_field_info.fields.unshift({label: "None", fieldId: "none"});
						this.setData('fieldOfLookupPrimaryFields', related_field_info.fields);
						this.setData('fieldOfLookupUserValue', related_field_info.field_user_value);
						this.setData('fieldOfLookupSystemValue', related_field_info.field_system_value);
					}
					// current fields may also be async
					if(this.cruxPageBuilder.getMethods('cxPbGetCurrentFields')){
						var currentFields = this.cruxPageBuilder.executeMethod('cxPbGetCurrentFields', this.data.cxPropField, this.editingValues);
						if(currentFields instanceof Promise){
							currentFields = await currentFields;
						}
						this.setData('fieldOfLookupSecondaryFields', currentFields.fields);
					}
				}catch(err){
					this.setData('fieldOfLookupPrimaryFields', this.data.fieldOfLookupPrimaryFields || []);
					this.setData('fieldOfLookupSecondaryFields', this.data.fieldOfLookupSecondaryFields || []);
				}
				this.setData({'saveLookupPropertyModalLabel':_cruxUtils.getI18n('crm.button.save'), 'lookupPropertyModalTitle':_cruxUtils.getI18n('crm.customfield.lookup.relatedfield.fieldlisttitle')});
			}
			this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',true);
			return new Promise(function(res,rej){
				this.lookupPropertyModalResponse = res;
				this.lookupPropertyModalReject = rej;
			}.bind(this));
		},
		lookupFieldSelection : function(){
			let sel = this.data.fieldOfLookupPrimaryFieldsSelected;
			this.setData('fieldOfLookupMappingDisabled', sel === 'none');
			let sel_field = this.data.fieldOfLookupPrimaryFields.filter(function(field){
				return field.fieldId === sel;
			});
			// If a primary field is selected, compute the next preview label (do NOT advance iterator yet)
			if(sel_field && sel_field.length){
				this.setData("fieldOfLookupPrimaryFieldsSelectedObj", sel_field[0]);
				if(sel !== 'none'){
					var fieldM = sel_field[0];
					var iter = this.data.cxPropFieldLabelIterator[fieldM.data_type] || 1;
					var field_label = fieldM.label + " " + iter;
					// store preview label in primary_field_label and keep data_type to increment iterator only on save
					this.setData('primary_field_label', field_label);
					this.stagedFieldLabelDataType = fieldM.data_type;
				}		
			}else{
				// clear preview
				this.setData('primary_field_label','');
				this.stagedFieldLabelDataType = null;
			}
		},
		lookupPropertyModalShowMt : async function(node){
			if(this.data.lookupPropertyModalOption === 'lookup_filter' && this.cruxPageBuilder.getMethods('cxPbGetLookupCriteriaDetails')){
		 		var obj = await this.cruxPageBuilder.executeMethod('cxPbGetLookupCriteriaDetails',this.data.cxPropField,this.data.lookupPropertyModalPropertyObj, this.editingValues);
		 		if(!obj.data.cxPropSetCriteria){
		 			obj.data.cxPropSetCriteria = this.editingValues[this.data.lookupPropertyModalPropertyObj.api_name] || this.data.cxPropField[this.data.lookupPropertyModalPropertyObj.api_name];
		 		}
				Lyte.Component.render('crux-criteria-editor',obj.data,node.childComp.querySelector('.cxPbModalCriteria'),{methods : obj.methods}); 	
			}
		},
		lookupPropertyModalCloseMt : function(comp){
			comp.setData("ltPropReRenderModal",true);
		},
		prefidenedChecked : function(item,node){
			if(item === 'select_all'){
				if(node.checked){
					this.setData('picklistPredefinedOptionItemsChecked',Array.from(new Set(this.data.picklistPredefinedOptionItemsChecked.concat(this.data.picklistPredefinedOptionItems))));
					// Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'concat',this.data.picklistPredefinedOptionItems)
				}else{
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'removeObjects',this.data.picklistPredefinedOptionItems);
				}
			}else if(node.checked){
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'push',item);
				}else{
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'removeObjects',item);
				}
		},
		unusedOptionsChecked : function(){
			if(node.checked){
				Lyte.arrayUtils(this.data.picklistUnusedOptionItemsChecked,'push',item);
			}else{
				Lyte.arrayUtils(this.data.picklistUnusedOptionItemsChecked,'removeObjects',item);
			}
		},
		picklistReplaceOriginalSelect : function(event,value){
			var temp = Array.from(this.data.picklistJson);
			Lyte.arrayUtils(temp,'removeAt',this.data.picklistJson.cruxFindIndexOfObject('actual_value',value));
			this.setData({'replacePicklistJson':temp, 'picklistReplaceOriginalSelected' :this.data.picklistJson.cruxFilterBy({'actual_value' : value})[0]});
		},
		picklistReplaceReplaceSelect : function(event,value){
			this.setData('picklistReplaceReplaceSelected',this.data.picklistJson.cruxFilterBy({'actual_value' : value})[0]);
		},
		beforeProfilePermissionSelect : function(item, type){
			if(this.cruxPageBuilder.getMethods('cxPbBeforeFieldProfilePermissionChange')){
				return this.cruxPageBuilder.executeMethod('cxPbBeforeFieldProfilePermissionChange',this.data.cxPropField,item,type);
			}
		},
		profilePermissionChanged : function(changedVal){
			return this.updateProfiles(changedVal);
		},
		propertyValueChange : function(key,value,error){
			if(this.data.propertyRules[this.data.cxPropField.data_type] && this.data.propertyRules[this.data.cxPropField.data_type].keys.indexOf(key) > -1){
				this.updateRules(key,value);
			}
			if(!error){
				delete this.errorProperties[key];	
			} 
			this.editingValues[key] = value;
			if(key.indexOf('auto_number') > -1){
				var prefix = typeof this.editingValues["auto_number.prefix"] !== "undefined" ? this.editingValues["auto_number.prefix"] : this.data.cxPropField.auto_number.prefix || "";
				prefix = prefix.replace(new RegExp('[$]{DD}','gi'),$L.moment(new Date()).format('DD')).replace(new RegExp('[$]{MM}','gi'),$L.moment(new Date()).format('MM')).replace(new RegExp('[$]{MMM}','gi'),$L.moment(new Date()).format('MMM')).replace(new RegExp('[$]{MMMM}','gi'),$L.moment(new Date()).format('MMMM')).replace(new RegExp('[$]{YY}','gi'),$L.moment(new Date()).format('YY')).replace(new RegExp('[$]{YYYY}','gi'),$L.moment(new Date()).format('YYYY'));
				var suffix = typeof this.editingValues["auto_number.suffix"] !== "undefined" ? this.editingValues["auto_number.suffix"] : this.data.cxPropField.auto_number.suffix || "";
				suffix = suffix.replace(new RegExp('[$]{DD}','gi'),$L.moment(new Date()).format('DD')).replace(new RegExp('[$]{MM}','gi'),$L.moment(new Date()).format('MM')).replace(new RegExp('[$]{MMM}','gi'),$L.moment(new Date()).format('MMM')).replace(new RegExp('[$]{MMMM}','gi'),$L.moment(new Date()).format('MMMM')).replace(new RegExp('[$]{YY}','gi'),$L.moment(new Date()).format('YY')).replace(new RegExp('[$]{YYYY}','gi'),$L.moment(new Date()).format('YYYY'));
				var starting_number = typeof this.editingValues["auto_number.starting_number"] !== "undefined" ? this.editingValues["auto_number.starting_number"] : this.data.cxPropField.auto_number.starting_number || "";
				Lyte.triggerEvent('cxPbEventAutoNumberPreview',prefix,starting_number,suffix);
			}
			if(this.lastRevertKeys[this.data.cxPropField.id] && this.lastRevertKeys[this.data.cxPropField.id].indexOf(key) === -1){
				this.lastRevertKeys[this.data.cxPropField.id].push(key);
			}
		},
		errorInProperty : function(key,message){
			this.errorProperties[key] = message;
			delete this.editingValues[key];
		}
		// Functions which can be used as callback in the component.
	},
	closeModal : function(){
		this.setData("cxHideProperties", false);
		this.setData('propertiesPanelShow',false);
	},	  
	checkRulesCondition : function(rule,value){
		if(typeof value === 'undefined' || value === null ){
			return false;
		}
		if (typeof value === 'object') {
			if (Object.keys(value).length === 0) {
			  return false;
			}
			value = value.system_value ? value.system_value : (value.id ? value.id : value);
	    }
		if(rule.condition){
			return Lyte.Component.registeredHelpers.expHandlers(rule.condition_value,rule.condition,value);
		}else if(typeof value === 'boolean'){
			return value;
		}
		return true;
	},
	updateRules : function(key,value){
		var rules = this.data.propertyRules[this.data.cxPropField.data_type] && this.data.propertyRules[this.data.cxPropField.data_type].rules;
		if(rules){ 
			rules.forEach(function(item){
				var ind = item.properties.indexOf(key),i;
				if(ind > -1){
					let properties_len = item.properties ? item.properties.length : 0;
					switch(item.type){
						case 'disable':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key){
									var msg,msgKey = "crux.pb." + item.properties[i] + "." + key + ".error";
									if(!_cruxUtils._cruxLocale[msgKey] && this.cruxPageBuilder.getMethods('cxPbI18nMessage')){
										msg = this.cruxPageBuilder.executeMethod('cxPbI18nMessage',msgKey);
									}else{
										msg = _cruxUtils.getI18n("crux.pb." + item.properties[i] + "." + key + ".error");
									}
				
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										cxTooltipMessage : msg,
										action : this.checkRulesCondition(item,value) ? 'disable' : 'enable',
										fromProperty : key
									});
								}
							}
						break;
						case 'options_change':
							if(item.properties[0] === key){
								let maxLength = (value === 'info_icon') ? 255 : 32;
								for(i = 0; i < properties_len; i++){
									if(item.properties[i] !== key){
										Lyte.triggerEvent('cxPbEventModifyProperty',{
											propertyKey : item.properties[i],   
											action : 'set_property',
											length : maxLength,
											fromProperty : key,
											fromValue : value
										});
									}
								}
								return; 
							}
							if(item.properties[0] === key){
								var options = [];
								for(i = 0;i < (value > 10 ? 10 : value);i++){
									options.push({
			                            "system_value": i,
			                            "display_value": i
			                    	});
								}
								for(i = 0;i < properties_len;i++){
									if(item.properties[i] !== key){
										Lyte.triggerEvent('cxPbEventModifyProperty',{
											propertyKey : item.properties[i],
											action : 'options_change',
											options : options,
											fromProperty : key,
											fromValue : value
										});
									}
								}
							}
						break;
						case 'hide':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : this.checkRulesCondition(item,value) ? 'hide' : 'show',
										fromProperty : key
									});
								}
							}
						break;
						case 'checked':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key && key === "sliding_scale"){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : 'options_select',
										fromProperty : key
									});
								}
							}
						break;
						case 'unchecked':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key && key === "sliding_scale"){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : 'disable_select',
										fromProperty : key
									});
								}
							}
						break;
					}
				}
			}.bind(this));	
		}
		if(key === this.data.cxPropFieldSpecialMetaKeys.cxMandatory){
			value ? this.setData("showRemoveField", false) : this.setData("showRemoveField", true);
		}
	},
	// didConnect:function(){
		
	// 	this.cruxPageBuilder = new CruxCommonBuilder()
	// 	// $L("#cxPbCustomTaxSortSelector").sortable({ //no I18n
	// 	// 	items : ".cxPbTableSortableHandle", //no I18n
	// 	// 	scrollDivY : "lyte-table-structure" , //no I18n
	// 	// 	onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
	// 	// 		if(fromIndex !== toIndex){
	// 	// 			const component = $L('crux-page-builder-properties')[0].component
	// 	// 			const customTaxData = component.getData('customTaxJson') //no I18n
	// 	// 			const data = customTaxData.splice(fromIndex,1)
	// 	// 			customTaxData.splice(toIndex,0,...data)
	// 	// 		}
	// 	// 	},
	// 	// 	onSelect : function() {
	// 	// 		$L('#cxPbCustomTaxSortSelector input').blur() //no I18n
	// 	// 	}
	// 	// });

	// 	// $L("#cxPbPickListSortSelector").sortable({ //no I18n
	// 	// 	items : ".cxPbTableSortableHandle", //no I18n
	// 	// 	scrollDivY : "lyte-table-structure"  //no I18n
	// 	// })
		
	// },
	// resetModalPosition : function(){
	//  	const builderArtBoard = $L(this.$node).prev('lyte-page-builder').find('lyte-pb-artboard');
	// 	// setTimeout(() => {
	// 	// 	$L(this.$node).find('lyte-modal')[0].ltProp('height',`${builderArtBoard.outerHeight() - 50}px`)
	// 	// 	$L(this.$node).find('lyte-modal')[0].ltProp('offset',{"top":`${builderArtBoard.offset().top + 50}px`,"right":"0"})		
	// 	// }, 0);
	// },
	setProfiles :function(){
		var profiles = this.data.cxPropField.profiles;
		if(profiles && profiles.length){
			profiles.forEach(function(item){
				if(!this.data.selectedProfiles.includes(item.id)){
					Lyte.arrayUtils(this.data.selectedProfiles,'push',item.id);
				}
				if(item.permission_type === 'read_write' && !this.data.profilesReadWrite.includes(item.id)){
					Lyte.arrayUtils(this.data.profilesReadWrite,'push',item.id);
				}else if(item.permission_type === 'read_only' && !this.data.profilesReadOnly.includes(item.id)){
					Lyte.arrayUtils(this.data.profilesReadOnly,'push',item.id);
				}
			}.bind(this));
			var selProfs = this.data.selectedProfiles;
			var ROProfs = this.data.profilesReadOnly;
			var RWProfs = this.data.profilesReadWrite;
			var cxProfs = this.data.cxPropProfiles;
			if(selProfs.length >= 1 && (selProfs.length === ROProfs.length || selProfs.length === RWProfs.length) && selProfs.length === cxProfs.length){
				this.setData('profileOption', true);
			}else{
				this.setData('profileOption', false);
			}
		}
	},
	updateProfiles : function(profiles){
		// this.data.cxPropField.$.set('profiles',profiles);
		this.editingValues.profiles = profiles;
		if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
			this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxPropField,"profiles",profiles);
		}
	}
});
Lyte.Component.registerHelper('checkVisibleProperty',function(properties){
	var pLength = properties.length;
	properties.forEach(function(item){
		if(item.cxHide){
			pLength -= 1;
		}
	});
	if(pLength === 0){
		return false;
	}
	return true;
});
