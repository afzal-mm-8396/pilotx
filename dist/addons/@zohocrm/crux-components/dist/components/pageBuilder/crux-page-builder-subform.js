Lyte.Component.register("crux-page-builder-subform", {
_template:"<template tag-name=\"crux-page-builder-subform\"> <template is=\"if\" value=\"{{isPreview}}\"><template case=\"true\"> <crux-page-builder-element-preview cx-prop-id=\"{{cxPropId}}\" cx-prop-section-id=\"{{cxSectionId}}\" cx-prop-subform-section=\"{{cxSubformSection}}\"></crux-page-builder-element-preview> </template><template case=\"false\"> <template is=\"if\" value=\"{{draggingState}}\"><template case=\"true\"> <div class=\"cxPbSectionOnDragHeading\">{{cxSubformSection.display_label}}</div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <span class=\"cxPbElemSecActionIcons\"> <span id=\"cxPbUnusedFieldsSubform{{cxSectionId}}\" lt-prop-title=\"{{cruxGetI18n('crm.subform.unused.fields')}}\" data-cx-builder-output=\"remove\" class=\"cxPbElemSecActionIconWrapper lytePbRejectDrag\" onclick=\"{{action('openUnusedFieldInSubform')}}\"><i class=\"cxPbSprite cxPbUnusedFieldIcon\"></i></span> <span data-cx-builder-output=\"remove\" class=\"cxPbElemSecActionIconWrapper lytePbRejectDrag cxPbSubformSettingsIcon\" onclick=\"{{action('onSubformSectionClicked',this)}}\"><i class=\"cxPbSprite cxPbSettingsIcon\"></i></span> </span> </template></template> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxPbSubformFieldChange\" on-fire=\"{{action('setSubformFieldData')}}\"></lyte-event-listener> <div class=\"cxPbTitleSection {{if(cxSubformSection[cxPropFieldSpecialMetaKeys.cxMandatory],'cxPbMandatoryClass','')}}\" onclick=\"{{action('removeActiveClass')}}\"> <crux-text-component class=\"lytePbRejectDrag\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{cxSubformSection.display_label}}\" cx-prop-from=\"{{if(isPreview,'view','create')}}\" on-value-change=\"{{method('sectionLabelChange',this)}}\" cx-prop-error-on-hovercard=\"true\" cx-prop-id=\"subform_{{cxSubformSection.id}}\" cx-prop-error-message=\"{{cxErrorMessage}}\" cx-prop-maxlength=\"50\" onfocus=\"{{action('subformLabelFocus')}}\"></crux-text-component> </div> <div class=\"cxPbSubformTableWrap\"> <template is=\"if\" value=\"{{cruxAnd(pinnedColumn.length,expHandlers(expHandlers(pinnedWidth,'-',tableScrolling),'>',0))}}\"><template case=\"true\"><div class=\"cxPbSubformPinnedTag\"> <span class=\"cxPbSprite cxPbPinnedIcon\">Pinned</span> </div></template></template> <template is=\"if\" value=\"{{cruxAnd(pinnedColumn.length,expHandlers(expHandlers(pinnedWidth,'-',tableScrolling),'>',0))}}\"><template case=\"true\"><div class=\"cxPbSubformPinnedBorder\" style=\"width: {{expHandlers(pinnedWidth,'-',tableScrolling)}}px;\"></div></template></template> <div class=\"cxPbSubformElemWrapper\"> <template is=\"if\" value=\"{{highlightWidth}}\"><template case=\"true\"><div class=\"cxPbSubformActiveBorderElem\" style=\"left : {{expHandlers(highlightLeft,'-',tableScrolling)}}px; width: {{highlightWidth}}px;\"></div></template></template> <template is=\"if\" value=\"{{currentSetWidth}}\"><template case=\"true\"><span class=\"lyteResizeInfoDiv lyteTooltip cxPbSubformTooltip\">{{currentSetWidth}}px</span></template></template> <lyte-table class=\"lytePbRejectDrag cxPbSubformTableElem\" lt-prop-header=\"{{cxSubformSection.section_field}}\" lt-prop-sticky-table=\"true\" lt-prop-column-sortable=\"true\" lt-prop-prevent-table-modify=\"false\" lt-prop-dual-resize=\"true\" lt-prop-yield=\"true\" on-resize-move=\"{{method('onTableResizeMove')}}\" on-resize-end=\"{{method('tableResizeEnd')}}\" lt-prop-width=\"{{tableWidth}}\" on-drop=\"{{method('columnsChange')}}\" on-before-select=\"{{method('tableResizeSelect')}}\" onscroll=\"{{action('handleTableScroll',event,this)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <template is=\"for\" items=\"{{subformFields}}\" item=\"list\" index=\"indexVal\"> <lyte-th id=\"cxSubform_{{cxSectionId}}_{{list.id}}\" style=\"width:{{expHandlers(list.subform_properties.custom_width,'+',25)}}px\" resize=\"enable\" class=\"cxPbSubformElemTh {{if(cxPropRightPanelDisable,'cxPbSubformTableThWithIcon','')}} {{if(list[cxPropFieldSpecialMetaKeys.cxMandatory],'cxPbMandatoryClass')}} {{if(list.subform_properties.pinned_column,'cxPbSubformPinnedCol','')}} {{if(ifEquals(list.api_name,cxPropSpecialFieldsApiName.serial_number),'cxPbSubformSmallTh','')}} {{if(cruxContains(cxPropCustomSmallWidthDataTypes,list.data_type),'cxPbSubformSmallTh','')}}\" onclick=\"{{action('openProperties',this,list)}}\"> <div class=\"cxFlex cxAlignItemCenter\"> <span class=\"cxPbSprite cxPbSubformHeadFieldIcon cxPb{{cruxCapitalize(getFieldData(list,'data_type'))}}Icon\"></span> <template is=\"if\" value=\"{{cxPropEditableFieldLabelElement}}\"><template case=\"true\"> <crux-text-component class=\"cxPbElementLabelInput\" cx-prop-appearance=\"box\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{list.field_label}}\" cx-prop-from=\"create\" on-value-change=\"{{method('fieldLabelChange',list,this)}}\" cx-prop-error-on-hovercard=\"true\" cx-prop-id=\"subform_{{cxSubformSection.id}}_{{list.id}}\" cx-prop-tooltip=\"\"></crux-text-component> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{list.field_label}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{list.display_field}}\"><template case=\"true\"><span class=\"cxPbSubformPrimaryField cxSaveIcon\" lt-prop-title=\"{{cruxGetI18n('crm.subform.primaryfield.identifier')}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropRightPanelDisable}}\"><template case=\"true\"> <span id=\"toolbar_icon_{{list.id}}\" class=\"cxPbElemActionIconWrap {{if(propertyDisable,'cxPbDisabled','')}}\" onclick=\"{{action('onToolbarClick',list,this)}}\"> <span class=\"cxMoreIcon cxPbElemMoreIcon\"></span> </span> </template></template> </div> <template is=\"if\" value=\"{{list.static_field}}\"><template case=\"true\"><lyte-text class=\"cxPbSubformHeaderLabel\" lt-prop-value=\"({{cruxGetI18n('static.field')}})\"></lyte-text></template></template> <template is=\"if\" value=\"{{getBuilderFieldSpecialMetaText(list,list[cxPropFieldSpecialMetaKeys.cxUnique],list[cxPropFieldSpecialMetaKeys.cxEncrypt],list[cxPropFieldSpecialMetaKeys.cxPersonal],list[cxPropFieldSpecialMetaKeys.cxPersonalHealth])}}\"><template case=\"true\"><lyte-text class=\"cxPbSubformHeaderLabel\" lt-prop-value=\"({{getBuilderFieldSpecialMetaText(list,list[cxPropFieldSpecialMetaKeys.cxUnique],list[cxPropFieldSpecialMetaKeys.cxEncrypt],list[cxPropFieldSpecialMetaKeys.cxPersonal],list[cxPropFieldSpecialMetaKeys.cxPersonalHealth])}})\"> </lyte-text></template></template> </lyte-th> </template> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"if\" value=\"{{expHandlers(picklistValueIterator.length,'>',0)}}\"><template case=\"true\"> <template is=\"for\" items=\"{{picklistValueIterator}}\" item=\"list\" index=\"indexVal\"> <lyte-tr> <template is=\"for\" items=\"{{subformFields}}\" item=\"header\" index=\"fieldIndex\"> <lyte-td style=\"width:{{expHandlers(list.subform_properties.custom_width,'+',25)}}px\" class=\"{{if(header.subform_properties.pinned_column,'cxPbSubformPinnedCol','')}} {{if(ifEquals(list.api_name,cxPropSpecialFieldsApiName.serial_number),'cxPbSubformSerialTd','')}}\"> {{subformFields[fieldIndex].static_values[indexVal].value}} </lyte-td> </template> </lyte-tr> </template> </template><template case=\"false\"> <lyte-tr> <template is=\"for\" items=\"{{subformFields}}\" item=\"header\" index=\"fieldIndex\"> <lyte-td style=\"width:{{expHandlers(list.subform_properties.custom_width,'+',25)}}px\" class=\"{{if(header.subform_properties.pinned_column,'cxPbSubformPinnedCol','')}} {{if(ifEquals(list.api_name,cxPropSpecialFieldsApiName.serial_number),'cxPbSubformSerialTd','')}}\"></lyte-td> </template> </lyte-tr> </template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <div class=\"cxPbSubformElemAddBtnWrap {{if(expHandlers(subformFields.length,'>',0),'boxsh','')}}\" onclick=\"{{action('removeActiveClass',event)}}\"> <div class=\"{{if(showStaticField,'cxClubbedBtn','')}}\"> <lyte-button id=\"subformAddButton{{cxSectionId}}\" lt-prop-appearance=\"primary\" lt-prop-class=\"cxOutlinePrimaryBtn\" onclick=\"{{action('showMenu')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.label.subform.addField')}} </template> </lyte-button> <template is=\"if\" value=\"{{showStaticField}}\"><template case=\"true\"><lyte-button id=\"subformAddButton{{cxSectionId}}\" lt-prop-appearance=\"primary\" lt-prop-class=\"cxOutlinePrimaryBtn\" onclick=\"{{action('showMenu',true)}}\"> <template is=\"registerYield\" yield-name=\"text\"> </template> </lyte-button></template></template> </div> </div> </template></template> </div> </div> <div class=\"cxFlex lytePbRejectDrag\" onclick=\"{{action('removeActiveClass',event)}}\"> <div class=\"cxPbSubformAggregateFieldWrap\"> <template is=\"for\" items=\"{{aggregateFields}}\" item=\"field\" index=\"index\"> <crux-page-builder-element class=\"cxPbSubformAggBuilderElem lytePbRejectDrag\" cx-prop-field=\"{{field}}\" cx-prop-id=\"{{cxPropId}}\" toolbar-click=\"{{method('aggregateToolbarClicked',this)}}\"></crux-page-builder-element> </template> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(showAddAggregateField,'&amp;&amp;',subformFields.length)}}\"><template case=\"true\"><div class=\"cxPbSubformAggregateFieldLi cxPbSubformAggregateFieldBtnLi cxRestrictDrag lytePbRejectDrag\"> <lyte-button id=\"subformAddAggregateButton\" lt-prop-appearance=\"primary\" lt-prop-class=\"cxOutlinePrimaryBtn\" onclick=\"{{action('addAggregateField')}}\" lt-prop-disabled=\"{{expHandlers(aggregateFields.length,'>=',aggreateFieldLimit)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.subform.add.aggregate.field')}} </template> </lyte-button> </div></template></template> </template></template> <lyte-hovercard lt-prop-origin-elem=\"lyte-button#subformAddAggregateButton\" lt-prop-auto-show=\"{{expHandlers(expHandlers(aggregateFields.length,'>=',aggreateFieldLimit),'?:',true,false)}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <p>{{cruxGetI18n('crm.subform.label.limit.reached')}}</p> <p>{{cruxGetI18n('crm.label.subform.agg.field.creation.limit')}}</p> </lyte-hovercard-content> </template> </lyte-hovercard> </div> </div> </template></template> <lyte-menu lt-prop-width=\"370px\" lt-prop-height=\"{{if(staticFieldMenu,'auto','320px')}}\" lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"lyte-button#subformAddButton{{cxSectionId}}\" lt-prop-show=\"{{lbind(subformAddMenuShow)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbSubformFieldMenuBody\"> <template is=\"if\" value=\"{{staticFieldMenu}}\"><template case=\"true\"> <lyte-menu-item class=\"{{staticFieldPropertyJson.wrapperClass}} cxPbSubformFieldCont\" data-cx-pb-element-value=\"{{staticFieldPropertyJson.data_type}}\" onclick=\"{{action('addFieldInSubform',staticFieldPropertyJson)}}\"> <lyte-text lt-prop-value=\"New Static Field\" class=\"cxPbSubformFieldLabel\"></lyte-text> </lyte-menu-item> </template><template case=\"false\"> <template is=\"if\" value=\"{{addNewFields}}\"><template case=\"true\"><crux-page-builder-subform-elements add-field-menu-click=\"{{method('addFieldMenuClickMt')}}\" cx-prop-id=\"{{cxPropId}}\" lookup-fields=\"{{lookupFields}}\" cx-subform-section=\"{{cxSubformSection}}\" show-lookup-field=\"{{showLookupField}}\"></crux-page-builder-subform-elements></template></template> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-width=\"360px\" lt-prop-query=\"#cxPbUnusedFieldsSubform{{cxSectionId}}\" lt-prop-show=\"{{lbind(subformAddUnusedFieldShow)}}\" on-before-close=\"{{method('unusedFieldsClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <div class=\"cxPbSubformUnusedFieldHeader\">{{cruxGetI18n('crm.subform.unused.fields')}}</div> <div class=\"cxPbSubformUnusedFieldSearch\"> <lyte-search lt-prop-close-icon=\"true\" on-search=\"{{method('searchUnusedFields')}}\" lt-prop-value=\"{{lbind(searchValue)}}\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"search\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxPbSubformUnusedFldMenuBody{{cxSectionId}}&quot; , &quot;search&quot; : &quot;.cxPbElementText&quot;, &quot;target&quot; : &quot;.cxPbSubfrmUnusdFldMenuItem&quot; ,&quot;related&quot; : &quot;lyte-menu-group&quot;} \"></lyte-search> </div> <lyte-menu-body class=\"cxPbSubformUnusedFldMenuBody cxPbSubformUnusedFldMenuBody{{cxSectionId}}\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxPbSubformUnusedFldLoader\"> <div class=\"cxSpinloader cxVat\"></div> </div> </template><template case=\"false\"> <template is=\"forIn\" object=\"{{unusedFields}}\" value=\"value\" key=\"category\"> <template is=\"if\" value=\"{{value.length}}\"><template case=\"true\"><lyte-menu-group> <lyte-menu-header class=\"cxPbUnusedFldMenuCont\">{{if(ifEquals(category,'field'),cruxGetI18n('crm.subform.fields'),cruxGetI18n('crm.subform.aggregate.fields'))}}</lyte-menu-header> <template is=\"for\" items=\"{{value}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxPbSubfrmUnusdFldMenuItem\" onclick=\"{{action('onUnusedElementClick',item,category)}}\"> <span class=\"cxPbSprite cxPbSubfrmUnusdFldIcon cxPb{{cruxCapitalize(item.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span> <span class=\"cxPbElementText lyteTextEllipsisNode\">{{item.field_label}}</span> <template is=\"if\" value=\"{{cxPbLeftPanelDeleteAllowed(item)}}\"><template case=\"true\"><span class=\"cxPbSprite cxPbDeleteIcon\" lt-prop-title=\"{{if(expHandlers(cxPbLeftPanelRemovalAllowed(item),'!'),cruxGetI18n('crm.mb.field.delete.error1'),'')}}\" onclick=\"{{action('deleteUnusedField',item,this)}}\"></span></template></template> </lyte-menu-item> </template> </lyte-menu-group></template></template> </template> <template is=\"if\" value=\"{{noUsedFields}}\"><template case=\"true\"> <div class=\"cxPbSubformUnusedFldNotFound\">{{cruxGetI18n('crm.mb.label.empty.unused.fields')}}</div> </template></template> </template></template> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]}]}},"default":{}},{"type":"attr","position":[3],"trans":true},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[7,1]},{"type":"if","position":[7,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[7,3]},{"type":"if","position":[7,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '",{"type":"helper","value":{"name":"expHandlers","args":["pinnedWidth","'-'","tableScrolling"]}},"'px;'"]}}}}]}},"default":{}},{"type":"attr","position":[7,5,1]},{"type":"if","position":[7,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'left : '",{"type":"helper","value":{"name":"expHandlers","args":["highlightLeft","'-'","tableScrolling"]}},"'px; width: '","highlightWidth","'px;'"]}}}}]}},"default":{}},{"type":"attr","position":[7,5,3]},{"type":"if","position":[7,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[7,5,5]},{"type":"registerYield","position":[7,5,5,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'",{"type":"helper","value":{"name":"expHandlers","args":["list.subform_properties.custom_width","'+'",25]}},"'px'"]}}}},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'",{"type":"helper","value":{"name":"expHandlers","args":["list.subform_properties.custom_width","'+'",25]}},"'px'"]}}}},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'",{"type":"helper","value":{"name":"expHandlers","args":["list.subform_properties.custom_width","'+'",25]}},"'px'"]}}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[7,5,5]},{"type":"attr","position":[7,5,7]},{"type":"if","position":[7,5,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[9]},{"type":"attr","position":[9,1,1]},{"type":"for","position":[9,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[9,1,3]},{"type":"if","position":[9,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[9,1,5]},{"type":"registerYield","position":[9,1,5,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[9,1,5]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"for","position":[0,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[5]}]}},"default":{}}],
_observedAttributes :["cxSectionId","subformAddMenuShow","cxPropId","cxPropRightPanelDisable","picklistValueIterator","addNewFields","unusedFields","lookupFields","subformFields","aggregateFields","pinnedColumn","noUsedFields","showLoading","aggreateFieldLimit","showStaticField","showLookupField","cxErrorMessage","isPreview","cxPropEditableFieldLabelElement","cxPropFieldSpecialMetaKeys","cxPropFieldTypeCustomWidth","showAddAggregateField","draggingState","lcData","tableWidth","pinnedWidth","tableScrolling","cxPropSpecialFieldsApiName","highlightLeft","highlightWidth","cxPropCustomSmallWidthDataTypes"],
_observedAttributesType :["string","boolean","string","boolean","array","boolean","object","array","array","array","array","boolean","boolean","number","boolean","boolean","string","boolean","boolean","object","object","boolean","boolean","object","string","number","number","object","number","number","array"],

	data : function(){
		return {
			cxSectionId : Lyte.attr('string'), //no i18n
			subformAddMenuShow : Lyte.attr('boolean'), //no i18n
			cxPropId : Lyte.attr('string'), //no i18n
			cxPropRightPanelDisable : Lyte.attr('boolean'), //no i18n
			picklistValueIterator : Lyte.attr('array',{default : []}), //no i18n
			addNewFields : Lyte.attr('boolean',{default : true}),
			unusedFields : Lyte.attr('object',{default : {}}),
			lookupFields : Lyte.attr('array',{default : []}),
			subformFields : Lyte.attr('array',{default : []}),
			aggregateFields :  Lyte.attr('array',{default : []}),
			pinnedColumn : Lyte.attr('array',{default : []}),
			noUsedFields : Lyte.attr('boolean'),
			showLoading : Lyte.attr('boolean'),
			aggreateFieldLimit : Lyte.attr('number',{default : 5}),
			showStaticField : Lyte.attr('boolean',{default : false}),
			showLookupField : Lyte.attr('boolean',{default : false}),
			cxErrorMessage : Lyte.attr('string',{default : ""}),
			isPreview : Lyte.attr('boolean',{default : false}),
			cxPropEditableFieldLabelElement : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropFieldSpecialMetaKeys : Lyte.attr('object'), //no i18n
			cxPropFieldTypeCustomWidth : Lyte.attr('object', {default : {}}), //no i18n
			showAddAggregateField : Lyte.attr('boolean',{default : true}), //no i18n
			draggingState : Lyte.attr('boolean',{default : false}), //no i18n
			lcData : Lyte.attr('object'), //no i18n
			tableWidth : Lyte.attr('string',{default : 'auto'}),
			pinnedWidth : Lyte.attr('number'),
			tableScrolling : Lyte.attr('number',{default : 0}),
			cxPropSpecialFieldsApiName : Lyte.attr('object',{default : {}}), //no i18n
			highlightLeft : Lyte.attr('number'),
			highlightWidth : Lyte.attr('number'),
			cxPropCustomSmallWidthDataTypes : Lyte.attr('array') //no i18n
		};	
	},
	init : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.fieldIterator = {};
		this.field_label_list = [];
		Lyte.triggerEvent('cxPbAddedElement',{
			name : 'section',
			node : this.$node
		});
		this.setData('cxPropCustomizableFieldMetaMapping',this.cruxPageBuilder.cruxNode.component.data.cxPropCustomizableFieldMetaMapping);
		this.setData('cxPropProfiles',this.cruxPageBuilder.cruxNode.component.data.cxPropProfiles);
		this.setData('cxPropFieldModelName',this.cruxPageBuilder.cruxNode.component.data.cxPropFieldModelName);
		this.setData('cxPropRightPanelDisable',this.cruxPageBuilder.cruxNode.component.data.cxPropRightPanelDisable);
		this.setData('cxPropFieldSpecialMetaKeys',this.cruxPageBuilder.cruxNode.component.data.cxPropFieldSpecialMetaKeys);
		this.setData('cxPropEditableFieldLabelElement',this.cruxPageBuilder.cruxNode.component.data.cxPropEditableFieldLabelElement);
		this.setData('propertiesJson',this.cruxPageBuilder.cruxNode.component.data.propertiesJson);
		this.setData('isPreview',this.cruxPageBuilder.cruxNode.component.data.cxPropShowPreview);
		this.setData('cxPropFieldTypeCustomWidth', this.cruxPageBuilder.cruxNode.component.data.cxPropFieldTypeCustomWidth);
		this.setData('cxPropAvailableFields',this.cruxPageBuilder.cruxNode.component.data.availableFields);
		// this.setData('cxPropSpecialFieldsApiName',this.cruxPageBuilder.cruxNode.component.data.cxPropSpecialFieldsApiName);
		this.setData('cxPropCustomSmallWidthDataTypes',this.cruxPageBuilder.cruxNode.component.data.cxPropCustomSmallWidthDataTypes);
		Object.values(this.data.cxPropAvailableFields).forEach((item)=>{
		    var s = item.cxPropAvailableFields.cruxFilterBy({data_type : 'picklist'})
		    if(s.length){
		        this.setData('staticFieldPropertyJson',s[0]);
		    }
		})
		if(this.cruxPageBuilder.getMethods('cxPbSubformProperties')){
			var subformProperties = this.cruxPageBuilder.executeMethod('cxPbSubformProperties',this.data.cxSectionId);
			this.fieldIterator = (subformProperties && subformProperties.cxSubformFieldIterator) || {};
			this.setData('aggreateFieldLimit',(subformProperties && subformProperties.cxAggregateFieldLimit) || 5);
			this.setData('cxPropSpecialFieldsApiName',(subformProperties && subformProperties.cxSpecialFieldsApiName) || {});
		}
		this.setData('cxSubformSection',store.peekRecord('section',this.data.cxSectionId));
		this.setData('cxSubformSectionField',this.data.cxSubformSection.section_field.filter((item)=>{return item.ui_type === 500})[0])
		var {subformFields,aggregateFields} = this.segregateSubformAggregateFields(this.data.cxSubformSection.section_field);
		this.setData({subformFields : subformFields,aggregateFields : aggregateFields});
		this.picklistValueIteratorCalculate();
		this.setData('showStaticField',this.data.cxSubformSectionField.data_type === 'static_subform');
		this.setData('lcData',this.$lc);
	},
	didConnect : function(){
		if(!this.data.isPreview){
			this.setTitleToInput(this.$node.querySelector('.cxPbTitleSection').querySelector('input'),this.data.cxSubformSection.display_label);
			this.cruxPageBuilder.updateSectionList('add',this.data.cxSubformSection);
			this.agregateFieldDisplayEventId = Lyte.addEventListener("cxPbAggregateFieldDisplayEvent",function(arg){
				if(this.data.cxSubformSection.id === arg.id){
					this.setData('showAddAggregateField',arg.cxShowAggregateField);
				}
			}.bind(this));
		}
		this.runAggregateSortable();
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
		if(!this.data.isPreview){
			Lyte.removeEventListener(this.agregateFieldDisplayEventId);
		}	
	},
	runAggregateSortable : function(){
		$L(".cxPbSubformAggregateFieldWrap",this.$node).sortable({
			restrict : '.cxRestrictDrag',
			cancel : 'cxPbSubformAggBuilderElem',
			onSelect : function(element,index,parent,event){
				if(event.target.closest('lyte-input')){
					return false;
				}
			},
			onDrop : function(droppedElement , destinantion , belowElement , fromIndex , toIndex  ){
				var field = Lyte.arrayUtils(this.data.aggregateFields,'removeAt',fromIndex)[0];
				if(field instanceof Record){
					field.$.set('sequence_number',toIndex);
				}else{
					field.sequence_number = toIndex;
				}
				if (this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',field,"sequence_number",toIndex,this.data.cxSubformSection, fromIndex);
				}
				Lyte.arrayUtils(this.data.aggregateFields,'insertAt',toIndex,field);
				this.runAggregateSortable();
			}.bind(this)
		});
	},
	segregateSubformAggregateFields : function(fields = [],dontSetWidth){
		var subformFields=[],aggregateFields=[],tableWidth = 0;
		this.field_label_list = [];
		fields.forEach((field)=>{
			field = store.peekRecord(this.data.cxPropFieldModelName,field.id);
			if((![500].includes(field.ui_type))){
				this.field_label_list.push(field.field_label);
				if((field.subform || field.associated_module) && (![555, 556].includes(field.ui_type))){
					aggregateFields.push(field);
				}else{
					subformFields.push(field);
					if(!dontSetWidth){
						if(!field.subform_properties){
							dontSetWidth = true;
							return;
						}
						tableWidth += parseInt(field.subform_properties.custom_width);
						tableWidth += 25;
					}
				}
				if(field.data_type === 'lookup'){
					this.setData('showLookupField',true);
				}
			}
		});
		if(!dontSetWidth){
			this.setData('tableWidth',tableWidth+'px')
		}
		return {subformFields : subformFields,aggregateFields : aggregateFields};
	},
	picklistValueIteratorCalculate : function(){
		var fieldLength = 0;
		this.setData('pinnedColumn',[]);
		var pinnedWidth = 0;
		if(this.data.cxSubformSection.section_field){
			this.data.cxSubformSection.section_field.forEach((field)=>{
				if(field.subform_properties && field.subform_properties.pinned_column){
					Lyte.arrayUtils(this.data.pinnedColumn,'push',field.id);
					pinnedWidth += field.subform_properties.custom_width;
					pinnedWidth += 25;
				}
				if(field.static_field && field.static_values && field.static_values.length > fieldLength){
					fieldLength = field.static_values.length;
				}
			});
		}
		this.setData('pinnedWidth',pinnedWidth);
		this.setData('picklistValueIterator',new Array(fieldLength));
	},
	actions : {
		openProperties : function(node){
			this.removeActiveClass();
			this.setActiveClassSubformHeader(node);
		},
		removeActiveClass : function(event){
			if(event && event.target.closest('crux-page-builder-element')){
				return;
			}
			this.removeActiveClass();
		},
		showMenu : async function(isStatic){
			if(isStatic){
				this.setData('staticFieldMenu',true)
			}else{
				this.setData('staticFieldMenu',false)
				var lookupFields = [];
				if(this.cruxPageBuilder.getMethods('cxPbGetFieldOfLookupModuleSubform')){
					lookupFields = await this.cruxPageBuilder.executeMethod('cxPbGetFieldOfLookupModuleSubform',this.data.cxSubformSection);
				}
				this.setData('lookupFields',lookupFields);
			}
		},
		subformLabelFocus : function(){
			this.removeActiveClass();
		},
		addFieldInSubform : function(item){
			this.addFieldInSubformFn(item,undefined,true);
		},
		onToolbarClick : function(field,element){
			if(element.classList.contains('cxDisabled')){
				return;
			}
			this.removeActiveClass();
			this.setActiveClassSubformHeader(element.closest('lyte-th'));
			if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
				this.cruxPageBuilder.executeMethod('cxPbToolBarAction', field,element);
			}
		},
		onSubformSectionClicked : function(element){
			this.removeActiveClass();
			if(this.cruxPageBuilder.getMethods('cxPbSubformSettingAction')){
				this.cruxPageBuilder.executeMethod('cxPbSubformSettingAction',this.data.cxSubformSection,element);
			}
			this.$node.classList.add("cxPbElementActiveSection");
		},
		openUnusedFieldInSubform : async function(){
			this.removeActiveClass();
			var unusedFields = [];
			this.setData('showLoading',true);
			this.setData('noUsedFields',false);
			if(this.cruxPageBuilder.getMethods('cxPbGetSubformUnusedFields')){
				unusedFields = await this.cruxPageBuilder.executeMethod('cxPbGetSubformUnusedFields',this.data.cxSubformSection);
			}
			var {subformFields,aggregateFields} = this.segregateSubformAggregateFields(unusedFields,true);
			unusedFields = {field : subformFields,aggregateFields : aggregateFields};
			this.setData('unusedFields',unusedFields);
			this.setData('showLoading',false);
			if(subformFields.length === 0 && aggregateFields.length === 0){
				this.setData('noUsedFields',true);
			}
			this.$node.classList.add("cxPbElementActiveSection");
		},
		onUnusedElementClick : function(field,category){
			var newSequence,section = this.data.cxSubformSection;
			if(!section.section_field){
				section.$.set('section_field',[]);
				newSequence = 1;
			}else if(field.api_name && field.api_name === this.data.cxPropSpecialFieldsApiName['serial_number']){
				newSequence = 1;
				Lyte.arrayUtils(this.data.pinnedColumn,'push',field.id);
				this.setData('pinnedWidth',this.data.pinnedWidth + field.subform_properties.custom_width+25);
				Lyte.objectUtils(field.subform_properties,'add','pinned_column',true);
				if (this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',field,"subform_properties",field.subform_properties,this.data.cxSubformSection);
				}
			}else{
				newSequence = section.section_field.length + 1;
			}
			if(field instanceof Record){
				field.$.set('sequence_number',newSequence);
			}else{
				field.sequence_number = newSequence;
			}
			Lyte.arrayUtils(section.section_field , 'insertAt' , newSequence-1 , field);
			if(category === 'aggregateFields'){
				Lyte.arrayUtils(this.data.aggregateFields,'insertAt' , newSequence === 1 ? 0 : this.data.aggregateFields.length , field);
			}else{
				this.setData('tableWidth',(parseInt(this.data.tableWidth)+field.subform_properties.custom_width+25)+'px')
				Lyte.arrayUtils(this.data.subformFields,'insertAt' , newSequence === 1 ? 0 : this.data.subformFields.length , field);
				var tableNode = this.$node.querySelector('lyte-table');
				if(field.api_name === this.data.cxPropSpecialFieldsApiName['serial_number']){
					tableNode.scrollTable(0);
				}else{
					tableNode.scrollTable(parseInt(this.data.tableWidth));
				}
			}
			
			
			if (this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
				this.cruxPageBuilder.executeMethod('cxPbPropertyChange',field,"sequence_number",newSequence,section);
			}
				// var sequenceNumberOperationsItem = {section : section,section_field : [{field : field,sequence_number : newSequence}]}
				// Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem)
			this.setData('subformAddUnusedFieldShow',false);
		},
		setSubformFieldData : function(obj){
			if(this.data.cxSectionId === obj.subformId){
				if(obj.field){
					if(obj.field.subform_properties && obj.field.subform_properties.pinned_column && this.data.pinnedColumn.indexOf(obj.field.id) === -1){
						Lyte.arrayUtils(this.data.pinnedColumn,'push',obj.field.id);
						this.setData('pinnedWidth',this.data.pinnedWidth + obj.field.subform_properties.custom_width + 25)
					}
					if((!obj.field.subform_properties || !obj.field.subform_properties.pinned_column) && this.data.pinnedColumn.indexOf(obj.field.id) > -1){
						Lyte.arrayUtils(this.data.pinnedColumn,'removeObjects',obj.field.id);
						this.setData('pinnedWidth',this.data.pinnedWidth - obj.field.subform_properties.custom_width - 25)
					}
					var fieldInd = this.data.cxSubformSection.section_field.cruxFindIndexOfObject('id',obj.field.id);
					Lyte.arrayUtils(this.data.cxSubformSection.section_field,'replaceAt',fieldInd,obj.field);
					var subFieldInd = this.data.subformFields.cruxFindIndexOfObject('id',obj.field.id);
					Lyte.arrayUtils(this.data.subformFields,'replaceAt',subFieldInd,obj.field);
					if(obj.field.static_values && obj.field.static_values.length > this.data.picklistValueIterator.length){
						this.setData('picklistValueIterator',new Array(obj.field.static_values.length));
					}
				}else{
					this.setData('cxSubformSection',obj.subform);
					this.setData('cxSubformSectionField',obj.subform.section_field.filter((item)=>{return item.ui_type === 500})[0])
					this.setData('showLookupField',false);
					var {subformFields,aggregateFields} = this.segregateSubformAggregateFields(this.data.cxSubformSection.section_field);
					this.setData({subformFields : subformFields,aggregateFields : aggregateFields});
					this.picklistValueIteratorCalculate();
					
					this.setData('showStaticField',this.data.cxSubformSectionField.data_type === 'static_subform');
					
				}
			}
		},
		// newSectionCreate : function(){
		// 	Lyte.triggerEvent('cxPbAddElement',{
		// 		name : 'section',
		// 		node : this.$node
		// 	});
		// },
		addAggregateField : async function(){
			this.removeActiveClass();
			var field;
			if (this.cruxPageBuilder.getMethods('cxPbAggregateFieldCreate')){
				field = await this.cruxPageBuilder.executeMethod('cxPbAggregateFieldCreate',this.data.cxSubformSection);
			}
			Lyte.arrayUtils(this.data.aggregateFields,'push',field);
			Lyte.arrayUtils(this.data.cxSubformSection.section_field,'push',field);
			this.runAggregateSortable();
		},
		deleteUnusedField : function(field,event){
			var check = true;
			if(this.cruxPageBuilder.getMethods('cxPbDeleteFromUnusedField')){
				check = this.cruxPageBuilder.executeMethod('cxPbDeleteFromUnusedField',field,this.data.cxSubformSection);
			}
			if(check instanceof Promise){
				check.then(function(){
					Lyte.arrayUtils(this.data.unusedFields,'removeAt',this.data.unusedFields.cruxFindIndexOfObject('id',field.id));
				}.bind(this));
			}else if(check){
				Lyte.arrayUtils(this.data.unusedFields,'removeAt',this.data.unusedFields.cruxFindIndexOfObject('id',field.id));
			}
			event.stopPropagation();
		},
		handleTableScroll : function(event){
			this.setData('tableScrolling',event.target.scrollLeft)
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		searchUnusedFields : function(result){
			this.setData('noUsedFields',result.length === 0);
		},
		sectionLabelChange : async function(comp,value){
			var errorMessage="";
   			this.$node.classList.remove('cxPbElementErrorDiv');
   			this.setData('cxErrorMessage',"");
   			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.subform.label.empt'); 
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.subform.label.splc');
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.subform.label.sykw');
			} 

			let field_labels = this.cruxPageBuilder.cruxNode.component.section_field_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== this.data.cxSubformSection.display_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.subform.label.dplk');
			}
			if(errorMessage){
				this.setData('cxErrorMessage',errorMessage);
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSubformSection.id,errorMessage);
				this.$node.classList.add('cxPbElementErrorDiv');
				return;
			}
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',this.data.cxSubformSection,'display_label',value,this.data.cxSubformSection.display_label);
				if(ch &&  typeof ch.then === "function"){
					ch = await ch;
				}
				if((typeof ch === 'object' && ch.type === 'error')){
					this.setData('cxErrorMessage',ch.message);
					this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSubformSection.id,ch.message);
					this.$node.classList.add('cxPbElementErrorDiv');
					return;
				}
			}
			if(ch){
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSubformSection.id);
				this.data.cxSubformSection.$.set('display_label',value);
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxSubformSection,'display_label',value);
				}
				this.setTitleToInput(comp.querySelector('input'),value);
			}
		},
		checkAndSaveLabel : function(){
			// TODO: Implementation needed
		},
		unusedFieldsClose : function(){
			this.setData('noUsedFields',false);
			// menu.component.childComp.querySelector('lyte-search').setValue('');
			this.$node.classList.remove("cxPbElementActiveSection");
		},
		onTableResizeMove : function(header,event){
			var bounding = header.getBoundingClientRect();
			var field = this.data.subformFields[header.order].subform_properties;
			this.removeActiveClass();
			var pinnedWidth;
			if(field.pinned_column){
				var pinnedWidth = this.data.pinnedWidth;
				if(!this.data.currentSetWidth){
					pinnedWidth -= this.data.subformFields[header.order].subform_properties.custom_width;
				}else{
					pinnedWidth -= this.data.currentSetWidth;
				}
				pinnedWidth -= 25;
				pinnedWidth += bounding.width;
				this.setData('pinnedWidth',pinnedWidth)
			}
			
			this.setData('currentSetWidth',parseInt(bounding.width)-25);
			var resizeTooltip = this.$node.querySelector('.lyteResizeInfoDiv');
			// this.data.subformFields[header.order].subform_properties.custom_width =  bounding.width;
			if(resizeTooltip){
				resizeTooltip.style.top = (event.clientY - resizeTooltip.clientHeight)+'px';
		    	resizeTooltip.style.left = (event.clientX - (resizeTooltip.clientWidth/2)) +'px'; //eslint-disable-line @zoho/webperf/layout-thrashing
			}
		},
		tableResizeEnd : function(header){
			Lyte.objectUtils(this.data.subformFields[header.order].subform_properties,'add','custom_width',this.data.currentSetWidth);
			if (this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
				this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.subformFields[header.order],"subform_properties",this.data.subformFields[header.order].subform_properties,this.data.cxSubformSection);
			}
			this.setData('currentSetWidth',undefined)
		},
		columnsChange : function(source,target,soruceColumn,targetColumn){
			if(soruceColumn === targetColumn){
				return;
			}
			var field = Lyte.arrayUtils(this.data.subformFields,'removeAt',soruceColumn)[0];
			if(field instanceof Record){
				field.$.set('sequence_number',targetColumn);
			}else{
				field.sequence_number = targetColumn;
			}
			if (this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
				this.cruxPageBuilder.executeMethod('cxPbPropertyChange',field,"sequence_number",targetColumn,this.data.cxSubformSection, soruceColumn);
			}
			Lyte.arrayUtils(this.data.subformFields,'insertAt',targetColumn,field);

		},
		addFieldMenuClickMt : function(item,isLookup,isStatic){
			this.addFieldInSubformFn(item,isLookup,isStatic);
		},
		fieldLabelChange : async function(subFormField,comp,value){
			var errorMessage="";
   			this.$node.classList.remove('cxPbElementErrorDiv');
   			comp.cxProp('errorMessage','');
   			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.empt'); 
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.splc');
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.sykw');
			} 

			let field_labels = this.field_label_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== subFormField.field_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.dplk');
			}
			if(errorMessage){
				comp.cxProp('errorMessage',errorMessage);
				this.cruxPageBuilder.cruxNode.component.setError(subFormField,errorMessage);
				return;
			}
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',subFormField,'field_label',value,subFormField.field_label);
				if(ch &&  typeof ch.then === "function"){
					ch = await ch;
				}
				if(typeof ch === 'object' && ch.type === 'error'){
					comp.cxProp('errorMessage',errorMessage);
					this.cruxPageBuilder.cruxNode.component.setError(subFormField,errorMessage);
					return;
				}
			}
			if(ch){
				this.cruxPageBuilder.cruxNode.component.setError(subFormField,'');
				this.cruxPageBuilder.updateFieldList('remove',subFormField);
				this.data.cxPropField.$.set('field_label',value);
				this.cruxPageBuilder.updateFieldList('add',subFormField);
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',subFormField,'field_label',value);
				}
			}
		},
		tableResizeSelect : function(th,event){
			if(event.target.classList.contains('cxPbElemMoreIcon') || event.target.classList.contains('cxPbElemActionIconWrap') || event.target.closest('.cxPbElementLabelInput') || event.target.classList.contains('cxPbSubformPinnedCol') || event.target.closest('.cxPbSubformPinnedCol')){
				return false;
			}
		},
		aggregateToolbarClicked : function(element){
			this.removeActiveClass();
			element.classList.add('cxPbSubformActiveElem');
		}
	},
	removeActiveClass : function(){
		var activeNode = this.$node.querySelector('.cxPbSubformActiveElem');
		if(activeNode){
			activeNode.classList.remove('cxPbSubformActiveElem');
		}
		this.setData({highlightLeft : 0,highlightWidth : 0})
	},
	setActiveClassSubformHeader : function(node){
		this.setData({highlightLeft : node.offsetLeft,highlightWidth : node.offsetWidth})
	},
	addFieldInSubformFn : function(item,isLookup,isStatic){
		this.setData('subformAddMenuShow',false);
		var section = this.data.cxSubformSection;
		var newSequence;
		if(!section.section_field){
			section.$.set('section_field',[]);
			newSequence = 1;
		}else{
			newSequence = section.section_field.length + 1;
		}
		var field;
		field = Object.assign(Object.assign({},item),{custom_field : true,sequence_number : newSequence,data_type : item.data_type,static_field : isStatic});
		delete field.field_type;
		delete field.properties;
		delete field.mandatoryProperties;
		delete field.customizable_properties;
		delete field.subform_properties;
		field.subform_properties = {"pinned_column" : false};
		field.subform_properties.custom_width = parseInt(this.data.cxPropFieldTypeCustomWidth[field.data_type]);
		if(field.data_type === 'autonumber'){
			field.auto_number = {};
		}
		if(field.data_type === 'lookup'){
			field.lookup = {};
		}
		if(field.data_type === 'multiselectlookup'){
			field.multiselectlookup = {};
		}
		var customizable_properties = ['removal'];
		function updateField(property){
			if(property.api_name){
				var keyToPush = property.api_name;
				if(this.data.cxPropCustomizableFieldMetaMapping && this.data.cxPropCustomizableFieldMetaMapping[keyToPush]){
					keyToPush = this.data.cxPropCustomizableFieldMetaMapping[keyToPush];
				}
				customizable_properties.push(keyToPush);
			}
			if(property.cxPropProperties){
				property.cxPropProperties.forEach(updateField.bind(this));
			}
		}
		if(isLookup){
			item.properties = this.data.propertiesJson[item.data_type].properties;
		}
		item.properties.forEach(updateField.bind(this));
		// var it = 1
		
		var field_label;
		if(!this.fieldIterator[field.data_type]){
			this.fieldIterator[field.data_type] = 1;
		}else{
			Lyte.objectUtils(this.fieldIterator,'add',field.data_type,this.fieldIterator[field.data_type] + 1);
		}
		while(true){
			field_label = item.display_label + " " + this.fieldIterator[field.data_type];
			if(this.field_label_list.indexOf(field_label) === -1){
				break;
			}
			Lyte.objectUtils(this.fieldIterator,'add',field.data_type,this.fieldIterator[field.data_type] + 1);
		}
		field.field_label = field_label;
		field.customizable_properties = customizable_properties;
		
		field.profiles = this.data.cxPropProfiles;
		let prof_len = field.profiles.length;
		for (let index = 0; index < prof_len; index++) {
			field.profiles[index].permission_type = "read_write";
		}
		if (this.cruxPageBuilder.getMethods('cxPbBeforeNewFieldCreate')){
			field = this.cruxPageBuilder.executeMethod('cxPbBeforeNewFieldCreate',field,section);
		}
		if(field){
			field = store.createRecord(this.data.cxPropFieldModelName,field);
			if(field.data_type === 'lookup'){
				this.setData('showLookupField',true);
			}
			this.setData('tableWidth',(parseInt(this.data.tableWidth)+field.subform_properties.custom_width+25)+'px')
			Lyte.arrayUtils(section.section_field,'push',field);
			Lyte.arrayUtils(this.data.subformFields,'push',field);
			
			
			if (this.cruxPageBuilder.getMethods('cxPbNewFieldCreate')){
				field = this.cruxPageBuilder.executeMethod('cxPbNewFieldCreate',field,section);
			}
			this.$node.querySelector('lyte-table').scrollTable(parseInt(this.data.tableWidth))
			var thNode = this.$node.querySelector('#cxSubform_'+this.data.cxSectionId+'_'+field.id);
			this.setActiveClassSubformHeader(thNode);
			var titleNode = thNode.querySelector('.cxPbElementLabelInput');
			titleNode.classList.add('cxPbElementHighlight');
			setTimeout(()=>{
				titleNode.classList.remove('cxPbElementHighlight');
			},2000)
			// var sequenceNumberOperationsItem = {section : section,section_field : [{field : field,sequence_number : newSequence}]}
			// Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem)
		}else{
			return false;
		}
	},
	observeLcData : function(){
		this.setData('draggingState',this.$lc.draggingState);
		if(this.data.draggingState){
			this.$node.classList.add('cxPbElemSecOnDrag');
		}else{
			this.$node.classList.remove('cxPbElemSecOnDrag');
		}
	}.observes('lcData.draggingState')
},{mixins : ['crux-page-builder-mixin']});
