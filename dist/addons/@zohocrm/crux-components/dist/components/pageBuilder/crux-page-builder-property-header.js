Lyte.Component.register("crux-page-builder-property-header", {
_template:"<template tag-name=\"crux-page-builder-property-header\"> <template is=\"if\" value=\"{{negate(cxPropProperty.cxHide)}}\"><template case=\"true\"><div class=\"{{if(cruxAnd(cruxContains(cxPropPreviewEnableFields,cxPropProperty.api_name),cruxGetNestedValue(cxPropField,cxPropProperty.api_name)),'cxFlex','')}}\"> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'input')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-text-component class=\"cxPbPrComp\" cx-prop-id=\"prop_header_{{cxPropProperty.api_name}}\" cx-prop-width=\"100%\" cx-prop-placeholder=\"{{cxPropProperty.placeholder}}\" cx-prop-appearance=\"box\" cx-prop-from=\"create\" cx-prop-mandatory=\"{{cxPropProperty.required}}\" cx-prop-tooltip=\"{{if(cxPropProperty.tooltip,cxPropProperty.tooltip,cxPropProperty.customizable_tooltip)}}\" cx-prop-value=\"{{cruxGetNestedValue(cxPropField,cxPropProperty.api_name)}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-callback-delay=\"{{undefinedData}}\" cx-prop-maxlength=\"{{cxPropProperty.length}}\"></crux-text-component> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbPropFormElemNote\"> {{cxPropProperty.notes}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'auto_number_input')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-text-component class=\"cxPbPrComp\" id=\"mentionInput\" cx-prop-width=\"100%\" cx-prop-placeholder=\"{{cxPropProperty.placeholder}}\" cx-prop-appearance=\"box\" cx-prop-from=\"create\" cx-prop-mandatory=\"{{cxPropProperty.required}}\" cx-prop-value=\"{{cruxGetNestedValue(cxPropField,cxPropProperty.api_name)}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-callback-delay=\"{{undefinedData}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\"></crux-text-component> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbPropFormElemNote\"> {{cxPropProperty.notes}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'number')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-number-component class=\"cxPbPrComp\" cx-prop-width=\"100%\" cx-prop-allow-negative-value=\"false\" cx-prop-placeholder=\"{{cxPropProperty.placeholder}}\" cx-prop-appearance=\"box\" cx-prop-from=\"create\" cx-prop-mandatory=\"{{cxPropProperty.required}}\" cx-prop-value=\"{{cruxGetNestedValue(cxPropField,cxPropProperty.api_name)}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-callback-delay=\"{{undefinedData}}\" cx-prop-type=\"number\" cx-prop-maxvalue=\"{{cxPropProperty.length}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\"></crux-number-component> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbPropFormElemNote\"> {{cxPropProperty.notes}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'text')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> {{cxPropProperty.display_label}} </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'child_fields')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <template is=\"for\" items=\"{{cxPropField.child_fields}}\" item=\"value\" index=\"index\"> <div> <crux-boolean-component cx-prop-from=\"create\" cx-prop-label=\"{{value.display_label}}\" cx-prop-value=\"{{getDisplayValue(cxPropField[value.api_name],cxPropProperty.allowed_values)}}\"></crux-boolean-component> </div> </template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'html')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> {{unescape(cxPropProperty.display_label)}} </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'textarea')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-text-area-component class=\"cxPbPrComp\" cx-prop-from=\"create\" cx-prop-max-length=\"{{cxPropProperty.max_length}}\" cx-prop-value=\"{{cxPropField[cxPropProperty.api_name]}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-appearance=\"box\"></crux-text-area-component> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbPropFormElemNote\"> {{cxPropProperty.notes}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'formula_property')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-text-area-component class=\"cxPbPrComp cxPbPrCompTextarea\" cx-prop-from=\"create\" cx-prop-value=\"{{cxPropField[cxPropProperty.api_name]}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-appearance=\"box\" cx-prop-mandatory=\"{{cxPropProperty.required}}\" onclick=\"{{action('getTextAreaFocusCall',this)}}\"></crux-text-area-component> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbPropFormElemNote\"> {{cxPropProperty.notes}} </span></template></template> <lyte-modal class=\"cxPbAddFormulaModal\" lt-prop-wrapper-class=\"cxPbPropertiesModal\" lt-prop-overlay-close=\"true\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;center&quot;}\" lt-prop-aria=\"true\" lt-prop-allow-multiple=\"true\" lt-prop-width=\"70%\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"true\" lt-prop-dimmer=\"{&quot;opacity&quot;:&quot;0.5&quot;}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div class=\"cxFlex cxAlignItemsCenter cxPbModalHeaderWrap\"> <div class=\"cxPbModalHeaderFLabel cxFlex cxAlignItemCenter\"> <lyte-text lt-prop-value=\"{{cxPropField.display_label}}\"></lyte-text> </div> </div> </lyte-modal-header> <lyte-modal-content> <crux-formula-editor class=\"cxPbFormulaEditorComp\" cx-prop-from=\"create\" cx-prop-value=\"{{cruxGetNestedValue(cxPropField,cxPropProperty.api_name)}}\" cx-prop-function-dropdown-options=\"{{funcDrpOpt}}\" cx-prop-operator-dropdown-options=\"{{oprDrpOpt}}\" cx-prop-field-dropdown-options=\"{{fldDrpOpt}}\" cx-prop-only-picklist=\"false\" cx-prop-only-operator=\"true\" on-run-execution=\"{{method('onRunExecution',this)}}\"></crux-formula-editor> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closeAddFormulaPBModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveAddFormulaPBModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.save')}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'checkbox')}}\"><template case=\"true\"><div class=\"cxPbFormCbRow\"> <crux-boolean-component cx-prop-label=\"{{cxPropProperty.display_label}}\" class=\"cxPbPropModalBoolean cxPbPrComp\" cx-prop-from=\"create\" cx-prop-value=\"{{constructDisplayValue(cxPropField,cxPropProperty)}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-tooltip=\"{{if(cxPropProperty.tooltip,cxPropProperty.tooltip,cxPropProperty.customizable_tooltip)}}\"></crux-boolean-component> <div class=\"cxElementLabel\" onclick=\"{{action('checkBoxClick',this)}}\"> <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'radiobutton')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-grouper-radio-component cx-prop-from=\"create\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-system-value=\"system_value\" cx-prop-value=\"{{getDisplayValue(cxPropField[cxPropProperty.api_name],cxPropProperty.allowed_values)}}\" cx-prop-picklist-values=\"{{cxPropProperty.allowed_values}}\" cx-prop-field=\"{{cxPropProperty}}\" cx-prop-is-display-format-enabled=\"true\" cx-prop-user-value=\"{{dropdownUserValue}}\" on-value-change=\"{{method('radioButtonChanged',this)}}\" cx-prop-select-option-by-default=\"true\" cx-prop-id=\"{{cxPropProperty.api_name}}\" cx-prop-maxsearch=\"100\"></crux-grouper-radio-component> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'dropdown')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-dropdown cx-prop-options=\"{{cxPropProperty.allowed_values}}\" cx-prop-maxsearch=\"{{if(ifEquals(cxPropProperty.data_type,'integer'),undefined,10)}}\" cx-prop-user-value=\"{{dropdownUserValue}}\" cx-prop-system-value=\"{{dropdownSystemValue}}\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"single\" cx-prop-selected=\"{{cxPropGetSelectedValue(cxPropField,cxPropProperty.api_name,dropdownSystemValue)}}\" on-option-select=\"{{method('dropdownValueSelect')}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-title=\"{{cxPropProperty.tooltip}}\"></crux-dropdown> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbFormInfo\"> {{unescape(cxPropProperty.notes)}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'multidropdown')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <crux-dropdown cx-prop-options=\"{{cxPropProperty.allowed_values}}\" cx-prop-maxsearch=\"{{if(ifEquals(cxPropProperty.data_type,'integer'),undefined,10)}}\" cx-prop-user-value=\"{{dropdownUserValue}}\" cx-prop-system-value=\"{{dropdownSystemValue}}\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"multiple\" cx-prop-selected=\"{{cxPropGetSelectedValue(cxPropField,cxPropProperty.api_name,dropdownSystemValue)}}\" on-option-select=\"{{method('dropdownValueSelect')}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-title=\"{{cxPropProperty.tooltip}}\"></crux-dropdown> <template is=\"if\" value=\"{{cxPropProperty.notes}}\"><template case=\"true\"><span class=\"cxPbFormInfo\"> {{unescape(cxPropProperty.notes)}} </span></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'component')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <template is=\"component\" component-name=\"{{prop.component}}\" field=\"{{cxPropField}}\" property=\"{{cxPropProperty}}\"></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.property_type_custom,'plType')}}\"><template case=\"true\"><div class=\"cxPbListHeading cxPbFormHeading\"> Picklist Type <div class=\"cxElementLabel\"> {{cxPropProperty.display_label}} <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <div class=\"cxPbListType\"> <lyte-radiobutton lt-prop-label=\"Local\" lt-prop-name=\"type\" lt-prop-value=\"Local\"></lyte-radiobutton> <lyte-radiobutton lt-prop-label=\"Global\" lt-prop-name=\"type\" lt-prop-value=\"Global\"></lyte-radiobutton> </div> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'options')}}\"><template case=\"true\"><div class=\"cxPbFormTableRow cxPbPicklistFormTableCont\"> <lyte-table lt-prop-yield=\"true\" class=\"cxPbDynamicSortableTable {{if(isPicklistMaximize,'cxPbFormPicklistTableMax','cxPbFormPicklistTableMin')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th class=\"cxPbTablePlSortIconTh\"></lyte-th> <lyte-th class=\"cxPbPicklistTableOptionsTh\">Options</lyte-th> <lyte-th class=\"cxPbPicklistSettings\"> <span class=\"cxPbPlOptActionBtn cxPbPlOptActionSettingsBtn cxPbPicklistSettingsOptions\"> <i class=\"cxPbSprite cxPbSettingsIcon\"></i> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\".cxPbPicklistSettingsOptions\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbPreventPropertiesPanelClose\"> <template is=\"for\" items=\"{{picklistOptions}}\" item=\"value\" index=\"index\"> <lyte-menu-group> <template is=\"for\" items=\"{{value}}\" item=\"item\" index=\"index\"> <lyte-menu-item onclick=\"{{action('piclikistSettingOptionClicked',item.system)}}\"> {{item.display}} </lyte-menu-item> </template> </lyte-menu-group> </template> </lyte-menu-body> </template> </lyte-menu> </span> <span class=\"cxPbPlOptActionBtn\" onclick=\"{{action('picklistMaxMin')}}\"> <i class=\"cxPbSprite cxPbMaximizeIcon {{if(isPicklistMaximize,'cxPbMinimizeIcon','cxPbMaximizeIcon')}}\"></i> </span> </lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody id=\"cxPbPickListSortSelector\" class=\"cxPbPickListSortSelectorTable\"> <template is=\"for\" items=\"{{picklistJson}}\" item=\"list\" index=\"indexVal\"> <lyte-tr> <lyte-td class=\"cxPbTableActionTd cxPbTablePlSortIconTd\"> <span class=\"cxPbDefaultSprite cxPbHandleIcon cxPbTableSortableHandle\"></span> </lyte-td> <lyte-td class=\"cxPbFormTableInfoTd\"> <div class=\"cxFlexCenter\"> <template is=\"if\" value=\"{{colorPalleteEnabled}}\"><template case=\"true\"> <crux-color-palette class=\"cxPbPropPlColorFld\" on-select-color=\"{{method('colorCodeSelected',indexVal)}}\" cx-prop-selected-color=\"{{list.color_code}}\" cx-prop-id=\"{{indexVal}}\"></crux-color-palette> </template></template> <crux-text-component class=\"cxPbPropPlValueFld\" cx-prop-appearance=\"box\" on-value-change=\"{{method('picklistOptionChange',indexVal)}}\" cx-prop-name=\"tax\" cx-prop-from=\"create\" cx-prop-value=\"{{list.display_value}}\" cx-prop-field-key=\"field_label\"></crux-text-component> </div> </lyte-td> <lyte-td class=\"cxPbTableActionTd cxPbTablePlActionTd\"> <span class=\"cxPbMinusIconWrapper\" onclick=\"{{action('removePicklistOption',indexVal)}}\"><i class=\"cxPbDefaultSprite cxPbMinusIcon\"></i></span> <span class=\"cxPbPlusIconWrapper\" onclick=\"{{action('addPicklistOption',indexVal)}}\"><i class=\"cxPbSprite cxPbPlusIcon\"></i></span> </lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <div class=\"cxPbFormTableFooter\"> <crux-page-builder-property-header cx-prop-property=\"{{cruxClone(colorCodeProperty)}}\" cx-prop-field=\"{{cxPropField}}\" property-changed=\"{{method('propertyChangedSub')}}\" error-property=\"{{method('errorInPropertySub')}}\" cx-prop-id=\"{{cxPropId}}\"></crux-page-builder-property-header> </div> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'criteriaFilters')}}\"><template case=\"true\"><div> <div class=\"cxPbListHeading cxPbFormHeading cxPbFormHeadingWithRightBtn\">{{cxPropProperty.display_label}} <template is=\"if\" value=\"{{cruxAnd(expHandlers(cruxGetNestedValue(cxPropField,cxPropProperty.api_name),'!'),negate(showCriteriaView))}}\"><template case=\"true\"><div class=\"cxPbFormHeadingRightBtn\" onclick=\"{{action('openCriteriaDetails')}}\"> Add Criteria </div></template></template> </div> <template is=\"if\" value=\"{{cruxOr(cruxGetNestedValue(cxPropField,cxPropProperty.api_name),showCriteriaView)}}\"><template case=\"true\"><div class=\"cxPbCriteriaViewContainer\"> <div id=\"cxPbLookupCriteria\"></div> <span onclick=\"{{action('openCriteriaDetails')}}\">edit</span> <span onclick=\"{{action('deleteCriteriaDetails')}}\">delete</span> </div></template></template> <template is=\"if\" value=\"{{cxPropProperty.sub_properties[0].cxPropProperties[0].show}}\"><template case=\"true\"><crux-page-builder-property-header class=\"cxPbLookupCriteriaCkbox\" cx-prop-property=\"{{cruxClone(cxPropProperty.sub_properties[0].cxPropProperties[0])}}\" cx-prop-field=\"{{cxPropField}}\" property-changed=\"{{method('propertyChangedSub')}}\" error-property=\"{{method('errorInPropertySub')}}\" cx-prop-id=\"{{cxPropId}}\"></crux-page-builder-property-header></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.display_type,'field_of_lookup')}}\"><template case=\"true\"><div> <div class=\"cxPbListHeading cxPbFormHeading cxPbFormHeadingWithRightBtn\">{{cxPropProperty.display_label}} <div class=\"cxPbFormHeadingRightBtn\" onclick=\"{{action('openFieldOfLookup')}}\"> Add Field </div> </div> <template is=\"if\" value=\"{{cruxGetNestedValue(cxPropField,cxPropProperty.api_name)}}\"><template case=\"true\"><div onclick=\"{{action('openFieldOfLookup')}}\"> </div></template></template> </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.property_type_custom,'rollupOptions')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <div class=\"cxPbPropRollupSumLabel\">Choose a predefined rollup summary field</div> <div class=\"cxFlex cxAlignItemCenter cxFlexSpaceBtwn cxPbPropRollupSumHead\"> <lyte-search lt-prop-appearance=\"box\" id=\"rollupSummarySearch\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.cxPbPropRollupSumRightCont&quot;,&quot;search&quot;:&quot;.cxPbPropRollupSumField&quot;, &quot;target&quot; : &quot;.cxPbPropRollupSumField&quot;}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('gotoSelectedPage')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Create Custom Rollup Field </template> </lyte-button> </div> <div class=\"cxPbPropRollupSumCont\"> <div class=\"cxPbPropRollupSumLeftCont\"> <div class=\"cxPbPropRollSumLeftHead\">Related Modules</div> <lyte-nav class=\"cxPbPropRollSumLeftNav\" lt-prop-max-width=\"30%\" lt-prop-nav-menu-class=\"lyteNavMenuClass\" lt-prop-menu-icon=\"lyteNavKebabMenu\" lt-prop-container-class=\"lyteNavIconContainer\" lt-prop-click=\"lyteNavActive\" lt-prop-alignment=\"vertical\" lt-prop-event=\"click\" lt-prop-width=\"auto\" lt-prop-height=\"auto\" lt-prop-query-class=\"lyteMenuSelected\" lt-prop-arrow=\"false\" lt-prop-query=\"#showButton\" lt-prop-aria-attributes=\"{&quot;role&quot;:&quot;menu&quot;}\"> <template is=\"for\" items=\"{{rollupOptions}}\" item=\"item\" index=\"index\"> <lyte-nav-item id=\"roll_left_item_{{index}}\" class=\"cxPbPropRollSumLeftNavItem {{if(ifEquals(item.name,rollupOptionSelected),'lyteNavActive')}}\">{{item.name}}<span class=\"cxPbPropRollSumRecCount\">{{item.data.length}}</span></lyte-nav-item> </template> </lyte-nav> </div> <div class=\"cxPbPropRollupSumRightCont\" onscroll=\"{{action('rollupOnScroll',event)}}\"> <template is=\"for\" items=\"{{rollupOptions}}\" item=\"item\" index=\"index\"> <div class=\"cxPbPropRollupSumFormRow\"> <div class=\"cxPbPropRollupSumFormLabel\">{{item.name}}</div> <div class=\"cxPbPropRollupSumFieldCont\"> <template is=\"for\" items=\"{{item.data}}\" item=\"value\" index=\"index\"> <div class=\"cxPbPropRollupSumField\">{{value}}</div> </template> </div> </div> </template> </div> </div> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cruxContains(cxPropPreviewEnableFields,cxPropProperty.api_name),'&amp;&amp;',cruxGetNestedValue(cxPropField,cxPropProperty.api_name))}}\"><template case=\"true\"><span id=\"cruxBuilderFieldPreview_{{cxPropField.id}}\" class=\"cxPbFormPreviewText {{if(cruxGetNestedValue(cxPropField,cxPropProperty.api_name),'','cxPbPrevwTextDisabled')}}\" onclick=\"{{action(renderFieldPreview)}}\"> preview </span></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.property_type_custom,'auto_number_preview')}}\"><template case=\"true\"><div class=\"cxPbFormRow\"> <span>Preview : </span> {{autoNumberPreview}} </div></template></template> <template is=\"if\" value=\"{{ifEquals(cxPropProperty.property_type_custom,'picklistHistoryTracking')}}\"><template case=\"true\"><div class=\"cxPbFormCbRow\"> <crux-boolean-component cx-prop-label=\"{{cxPropProperty.display_label}}\" class=\"cxPbPropModalBoolean\" cx-prop-from=\"create\" cx-prop-value=\"{{cxPropField[cxPropProperty.api_name]}}\" on-value-change=\"{{method('valueChanged',this)}}\" cx-prop-disabled=\"{{if(cruxOr(cxPropProperty.disabled,cxPropProperty.customizable_disabled),true,false)}}\" cx-prop-tooltip=\"{{if(cxPropProperty.tooltip,cxPropProperty.tooltip,cxPropProperty.customizable_tooltip)}}\"></crux-boolean-component> <div class=\"cxElementLabel\"> <crux-page-builder-property-header-help-info-icon cx-prop-property=\"{{cxPropProperty}}\"></crux-page-builder-property-header-help-info-icon> </div> <template is=\"if\" value=\"{{cxPropProperty.sub_properties[0].cxPropProperties[0].show}}\"><template case=\"true\"><div class=\"cxElementLabel\" onclick=\"{{action('picklistTrackingEdit')}}\">Edit</div></template></template> </div></template></template> <template is=\"if\" value=\"{{cxPropDisplayNotes}}\"><template case=\"true\"><div>{{unescape(cxPropDisplayNotes)}}</div></template></template> </div></template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropProperty.sub_properties,negate(cruxContains(cruxSplit('picklistHistoryTracking,plOpt,criteriaFilters',','),cxPropProperty.property_type_custom)))}}\"><template case=\"true\"><div> <template items=\"{{cxPropProperty.sub_properties}}\" item=\"item\" index=\"index\" is=\"for\"><div> <template is=\"if\" value=\"{{item.cxPropLabel}}\"><template case=\"true\"><div class=\"cxPbFormHeading\" data-cy=\"{{item.cxPropLabel}}\"> {{item.cxPropLabel}} </div></template></template> <template items=\"{{item.cxPropProperties}}\" item=\"prop\" index=\"index\" is=\"for\"><div> <template is=\"if\" value=\"{{prop.show}}\"><template case=\"true\"><crux-page-builder-property-header is-sub-property=\"{{subPropVal}}\" cx-prop-property=\"{{cruxClone(prop)}}\" cx-prop-field=\"{{cxPropField}}\" property-changed=\"{{method('propertyChangedSub')}}\" error-property=\"{{method('errorInPropertySub')}}\" cx-prop-id=\"{{cxPropId}}\" data-cy=\"{{prop.api_name}}\"></crux-page-builder-property-header></template></template> </div></template> </div></template> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,9]},{"type":"if","position":[0,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[0,11]},{"type":"if","position":[0,11],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,13]},{"type":"if","position":[0,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,15]},{"type":"if","position":[0,15],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"registerYield","position":[0,7,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[0,7]}]}},"default":{}},{"type":"attr","position":[0,17]},{"type":"if","position":[0,17],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,1]}]}},"default":{}},{"type":"attr","position":[0,19]},{"type":"if","position":[0,19],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}},{"type":"attr","position":[0,21]},{"type":"if","position":[0,21],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,23]},{"type":"if","position":[0,23],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3]},{"type":"componentDynamic","position":[0,3]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,25]},{"type":"if","position":[0,25],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"component","position":[0,1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[0,27]},{"type":"if","position":[0,27],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"componentDynamic","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,3]}]}},"default":{}},{"type":"attr","position":[0,29]},{"type":"if","position":[0,29],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"registerYield","position":[1,1,1,5,1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1,5,1,3]},{"type":"attr","position":[1,1,1,5,3]},{"type":"attr","position":[1,1,1,5,3,1]},{"type":"componentDynamic","position":[1,1,1,5]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1,3]},{"type":"componentDynamic","position":[1,3,1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5,1]},{"type":"attr","position":[1,5,3]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,1]}]}},"default":{}},{"type":"attr","position":[0,31]},{"type":"if","position":[0,31],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,1,2]},{"type":"if","position":[0,1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,3]},{"type":"attr","position":[0,5]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,33]},{"type":"if","position":[0,33],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,1,2]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,35]},{"type":"if","position":[0,35],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0,3,1]},{"type":"attr","position":[0,3,3]},{"type":"registerYield","position":[0,3,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0,3,3]},{"type":"attr","position":[0,5,1,3,1]},{"type":"for","position":[0,5,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,5,1,3]},{"type":"attr","position":[0,5,3]},{"type":"attr","position":[0,5,3,1]},{"type":"for","position":[0,5,3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]}]}},"default":{}},{"type":"attr","position":[0,37]},{"type":"if","position":[0,37],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,39]},{"type":"if","position":[0,39],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,3]}]}},"default":{}},{"type":"attr","position":[0,41]},{"type":"if","position":[0,41],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,1]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,43]},{"type":"if","position":[0,43],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"for","position":[0,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]}]}},"default":{}}],
_observedAttributes :["cxPropProperty","cxPropField","picklistOptions","picklistJson","rollupOptions","dropdownUserValue","dropdownSystemValue","undefinedData","autoNumberPreview","filterLoading","isPicklistMaximize","colorCodeProperty","triggerVisiblity","showCriteriaView","subPropVal","rollupOptionSelected","uiOutlet","sections","moduleListSmall","moduleCRMData","dependencies","apisections","owner","field","funcDrpOnlyOpt","funcDrpOpt","oprDrpOpt","fldDrpOpt","cxPropHelpMaxCharNotes"],
_observedAttributesType :["object","object","array","array","array","string","string","object","string","boolean","boolean","object","boolean","boolean","boolean","string","string","array","array","array","object","object","string","object","array","array","array","array","string"],

	data : function(){
		return {
			cxPropProperty : Lyte.attr('object'),
			cxPropField : Lyte.attr('object'),
			picklistOptions : Lyte.attr('array',{default : [
					[{system : 'reference_values',display : _cruxUtils.getI18n('crm.picklist.reference.view.value')},{system : 'unused_values',display : _cruxUtils.getI18n('crm.label.from.add.unused.values')},{system : 'replace_values',display : 'Replace Values'}],
					[{system : 'predefined_options',display : 'Add Predefined Choices'},{system : 'bulk_option',display : 'Add bulk options'}],
					[{system : 'convert_global',display : 'Convert to Global Set'}]
				]}),
			picklistJson: Lyte.attr( 'array' , { default : [ //no I18n
				{ actual_value : 'Option 1' , display_value : 'Option 1',color_code : 'noFill',reference_value : 'Option 1' }, //no I18n
				{ actual_value : 'Option 2' , display_value : 'Option 2',color_code : 'noFill',reference_value : 'Option 2' } //no I18n
			] } ),
			rollupOptions : Lyte.attr('array', {default : 
				[
					{'name' : 'Notes', 'value' : 'notes', 'data' : ['Last Note Added On', 'Total Notes Added']}, 
					{'name' : 'Attachments', 'value' : 'attachments', 'data' : ['Total Attachments Added']}, 
					{'name' : 'Calls', 'value' : 'calls', 'data' : ['Total Calls', 'Total Outgoing Calls', 'Total Incoming Calls', 'Total Missed Calls', 'Total Overdue Calls', 'Total Cancelled Calls', 'Last Call Made On', 'Last Call Received On', 'Upcoming Scheduled Call Date', 'Average Call Duration (in seconds)']}, 
					{'name' : 'Meetings', 'value' : 'meetings', 'data' : ['Total Meetings Created', 'Total Completed Meetings', 'Total Upcoming Meetings', 'Last Meeting Created On', 'Last Meeting Completed On', 'Next Meeting Time']}, 
					{'name' : 'Tasks', 'value' : 'tasks', 'data' : ['Total Tasks Created', 'Total Completed Tasks', 'Total Open Tasks', 'Total Overdue Tasks', 'Last Task Created On', 'Last Task Completed On', 'Next Task Due Date']}, 
					{'name' : 'Emails', 'value' : 'emails', 'data' : ['Last Email Sent On', 'Total Outgoing Emails', 'Total Opened Emails', 'Total Not Opened Emails', 'Total Bounced Emails']}
				]
			}),
			dropdownUserValue : Lyte.attr('string',{default : 'display_value'}),
			dropdownSystemValue : Lyte.attr('string',{default : 'system_value'}),
			undefinedData : Lyte.attr('object',{default : undefined}), // no i18n
			autoNumberPreview : Lyte.attr('string',{default : ""}), //no i18n
			filterLoading : Lyte.attr('boolean',{default : false}), //no i18n
			isPicklistMaximize : Lyte.attr('boolean',{default : false}), //no i18n
			colorCodeProperty : Lyte.attr('object',{default : {}}),
			triggerVisiblity : Lyte.attr('boolean'),
			showCriteriaView : Lyte.attr('boolean',{default : false}), //no i18n
			subPropVal : Lyte.attr('boolean',{default : true}), //no i18n
			rollupOptionSelected : Lyte.attr('string',{default : ""}), //no i18n

			// FORMULA EDITOR
			uiOutlet: Lyte.attr( 'string', { 'default': '' } ), //NO I18N
			sections: Lyte.attr( 'array', { 'default': [ 'Default FormulaEditor' ] } ),
			moduleListSmall: Lyte.attr("array", { default: [
				{'name': '1', 'value': '1:1'},
				{'name': '2', 'value': '2:2'},
				{'name': '3', 'value': '3:3'},
				{'name': '4', 'value': '4:4'}

			]}),
			moduleCRMData: Lyte.attr("array", {default: [
				{'name': '1', 'value': '1:1'},
				{'name': '2', 'value': '2:2'},
				{'name': '3', 'value': '3:3'},
				{'name': '4', 'value': '4:4'},
				{'name': '5', 'value': '5:5'},
				{'name': '6', 'value': '6:6'},
				{'name': '7', 'value': '7:7'},
				{'name': '89', 'value': '8:89'},
				{'name': '9', 'value': '9:9'},
				{'name': '10', 'value': '10:10'},
				{'name': '11', 'value': '11:11'},
				{'name': '12', 'value': '12:12'},
				{'name': '13', 'value': '13:13'},
				{'name': '14', 'value': '14:14'},
				{'name': '15', 'value': '15:15'},
				{'name': '16', 'value': '16:16'},
				{'name': '17', 'value': '17:17'},
				{'name': '18', 'value': '18:18'},
				{'name': '19', 'value': '19:19'},
				{'name': '20', 'value': '20:20'},
				{'name': '21', 'value': '21:21'},
				{'name': '22', 'value': '22:22'},
				{'name': '23', 'value': '23:23'},
				{'name': '24', 'value': '24:24'},
				{'name': '25', 'value': '25:25'},
				{'name': '26', 'value': '26:26'},
				{'name': '27', 'value': '27:27'},
				{'name': '28', 'value': '28:28'},
				{'name': '29', 'value': '29:29'},
				{'name': '30', 'value': '30:30'},
				{'name': '31', 'value': '31:31'},
				{'name': '32', 'value': '32:32'},
				{'name': '33', 'value': '33:33'},
				{'name': '-None-', 'value': 'none'},
				{'name': 'Qualification', 'value': '10:Qualification'},
				{'name': 'Needs Analysis', 'value': '20:Needs Analysis'},
				{'name': 'Value Proposition', 'value': '40:Value Proposition'},
				{'name': 'Id. Decision Makers', 'value': '60:Id. Decision Makers'},
				{'name': 'Proposal/Price Quote', 'value': '75:Proposal/Price Quote'},
				{'name': 'Negotiation/Review', 'value': '90:Negotiation/Review'},
				{'name': 'Closed Won', 'value': '100:Closed Won'},
				{'name': 'Closed Lost', 'value': '0:Closed Lost'},
				{'name': 'Closed Lost to Competition', 'value': '0:Closed Lost to Competition'},
				{'name': '5th layout', 'value': '90:5th layout'},
				{'name': '8', 'value': '8:8'},
				{'name': '189', 'value': '18:189'},
				{'name': '11111111', 'value': '1:11111111'},
				{'name': '22222222', 'value': '1:22222222'},
				{'name': '342342343423', 'value': '1:342342343423'},
				{'name': 'edfrs', 'value': '1:edfrs'},
				{'name': '234234324', 'value': '2:234234324'},
				{'name': 'dfsdfdf', 'value': '22:dfsdfdf'},
				{'name': '3242342343423', 'value': '22:3242342343423'},
				{'name': 'dfsdfdfsdf332423', 'value': '33:dfsdfdfsdf332423'},
				{'name': 'dfsd434rewref', 'value': '33:dfsd434rewref'},
				{'name': 'sdfds3434fdsfd', 'value': '33:sdfds3434fdsfd'},
				{'name': 'r33ewe', 'value': '33:r33ewe'},
				{'name': 'rr332rr3r4r', 'value': '33:rr332rr3r4r'},
				{'name': 'edrwer343e', 'value': '33:edrwer343e'},
				{'name': 'r3343r3', 'value': '33:r3343r3'},
				{'name': 'r3r3r3r34r', 'value': '33:r3r3r3r34r'},
				{'name': 'r33r3r', 'value': '33:r33r3r'},
				{'name': '3r33r3r3r4', 'value': '33:3r33r3r3r4'},
				{'name': '3r34r34r34r', 'value': '33:3r34r34r34r'},
				{'name': 'er4r34r34t', 'value': '33:er4r34r34t'},
				{'name': '34r34r43r', 'value': '33:34r34r43r'},
				{'name': 'r34r43r34r', 'value': '33:r34r43r34r'},
				{'name': '4r34r43r', 'value': '33:4r34r43r'},
				{'name': '4r', 'value': '33:4r'},
				{'name': 'r43', 'value': '33:r43'},
				{'name': '4r34', 'value': '33:4r34'},
				{'name': 'fgdfgdfgdfgdfgfdgdfgdfg', 'value': '33:fgdfgdfgdfgdfgfdgdfgdfg'},
				{'name': '4t', 'value': '33:4t'},
				{'name': '4t34534534534543534', 'value': '33:4t34534534534543534'},
				{'name': '4tfgdfgfgdfgdfgdfgdfgdf', 'value': '33:4tfgdfgfgdfgdfgdfgdfgdf'},
				{'name': 'fgfgdfgfdgdfgdfgdf4', 'value': '33:fgfgdfgfdgdfgdfgdf4'},
				{'name': 't4', 'value': '33:t4'},
				{'name': 't4345345345', 'value': '33:t4345345345'},
				{'name': 'dfsdfdsfsdds', 'value': '33:dfsdfdsfsdds'},
				{'name': 'dsfsdf', 'value': '33:dsfsdf'},
				{'name': 'sffdsdf', 'value': '33:sffdsdf'},
				{'name': 't34t', 'value': '22:t34t'},
				{'name': '43', 'value': '22:43'},
				{'name': '34t', 'value': '22:34t'},
				{'name': '2222222dw', 'value': '22:2222222dw'},
				{'name': '34t34t434t4t', 'value': '22:34t34t434t4t'},
				{'name': '443344t43t', 'value': '22:443344t43t'}
			]}),
			dependencies : Lyte.attr("object", {default : {"crux-components" : ["components/crux-filter-editor.js", "theme/compiledCSS/default/ltr/crux-form-elements.css (for ltr languages only)",
				"theme/compiledCSS/default/rtl/crux-form-elements.css (for rtl languages only)", "theme/compiledCSS/default/ltr/crux-dropdown.css (for ltr languages only)",
				"theme/compiledCSS/default/rtl/crux-dropdown.css (for rtl languages only)"], "lyte-ui-components" : ["components/lyte-dropdown.js", "components/lyte-search.js", "components/lyte-text.js", "components/lyte-texteditor.js"]}}),
			apisections : Lyte.attr("object", {default : {}}),
			owner : Lyte.attr("string", {default : "dk"}),
			field : Lyte.attr("object", {default : {field_label : "Insert Formula", required : true}}),
			funcDrpOnlyOpt: Lyte.attr('array', {default: 
				[{
					"name": "Abs",
					"value": "Abs(number)"
				},
				{
					"name": "Ceil",
					"value": "Ceil(number)"
				},
				{
					"name": "Floor",
					"value": "Floor(number)"
				},
				{
					"name": "Round",
					"value": "Round(number)"
				},
				{
					"name": "Naturallog",
					"value": "Naturallog(number)"
				},
				{
					"name": "Base10log",
					"value": "Base10log(number)"
				},
				{
					"name": "Max",
					"value": "Max(number, number)"
				},
				{
					"name": "Min",
					"value": "Min(number, number)"
				},
				{
					"name": "Sqrt",
					"value": "Sqrt(number)"
				},
				{
					"name": "If",
					"value": "If(boolean, generic, generic)"
				},
				{
					"name": "Len",
					"value": "Len(string)"
				},
				{
					"name": "Find",
					"value": "Find(string, search string, number)"
				},
				{
					"name": "Dayofweek",
					"value": "Dayofweek(date-time)"
				},
				{
					"name": "Dayofmonth",
					"value": "Dayofmonth(date-time)"
				},
				{
					"name": "Dayofyear",
					"value": "Dayofyear(date-time)"
				},
				{
					"name": "Hour",
					"value": "Hour(date-time)"
				},
				{
					"name": "Minute",
					"value": "Minute(date-time)"
				},
				{
					"name": "Month",
					"value": "Month(date-time)"
				},
				{
					"name": "Year",
					"value": "Year(date-time)"
				},
				{
					"name": "Weekday",
					"value": "Weekday(date-time)"
				},
				{
					"name": "And",
					"value": "And(boolean, boolean)"
				},
				{
					"name": "Or",
					"value": "Or(boolean, boolean)"
				},
				{
					"name": "Not",
					"value": "Not(boolean)"
				},
				{
					"name": "Concat",
					"value": "Concat(string, string)"
				},
				{
					"name": "CaseInsensitiveEquals",
					"value": "CaseInsensitiveEquals(string, string)"
				},
				{
					"name": "Contains",
					"value": "Contains(string, search string)"
				},
				{
					"name": "Startswith",
					"value": "Startswith(string, search string)"
				},
				{
					"name": "Endswith",
					"value": "Endswith(string, search string)"
				},
				{
					"name": "Lower",
					"value": "Lower(string)"
				},
				{
					"name": "Upper",
					"value": "Upper(string)"
				},
				{
					"name": "Trim",
					"value": "Trim(string)"
				},
				{
					"name": "Substring",
					"value": "Substring(string, number, number)"
				},
				{
					"name": "Tostring",
					"value": "Tostring(generic)"
				},
				{
					"name": "Replace",
					"value": "Replace(string, search string, replacement string)"
				},
				{
					"name": "IsEmpty",
					"value": "IsEmpty(string)"
				},
				{
					"name": "Newdate",
					"value": "Newdate(year, month, day, hour, minute, am/pm)"
				},
				{
					"name": "Datepart",
					"value": "Datepart(date-time)"
				},
				{
					"name": "Timepart",
					"value": "Timepart(date-time)"
				},
				{
					"name": "Adddate",
					"value": "Adddate(date-time, number, string)"
				},
				{
					"name": "Subdate",
					"value": "Subdate(date-time, number, string)"
				},
				{
					"name": "Now",
					"value": "Now()"
				},
				{
					"name": "Datecomp",
					"value": "Datecomp(date-time, date-time)"
				},
				{
					"name": "DateBetween",
					"value": "DateBetween(date-time, date-time)"
				},
				{
					"name": "FromTimestamp",
					"value": "FromTimestamp(timestamp)"
				},
				{
					"name": "Timestamp",
					"value": "Timestamp()"
				},
				{
					"name": "Tonumber",
					"value": "Tonumber()"
				},
				{
					"name": "IsPositive",
					"value": "IsPositive()"
				},
				{
					"name": "IsNegative",
					"value": "IsNegative()"
				}]
			}),
			funcDrpOpt: Lyte.attr('array', {default: 
				[{
					"name": "Abs",
					"value": "Abs(number)",
					"editorVal": "Abs(${1:number})"
				},
				{
					"name": "Ceil",
					"value": "Ceil(number)",
					"editorVal": "Ceil(${1:number})"
				},
				{
					"name": "Floor",
					"value": "Floor(number)",
					"editorVal": "Floor(${1:number})"
				},
				{
					"name": "Round",
					"value": "Round(number)",
					"editorVal": "Round(${1:number})"
				},
				{
					"name": "Naturallog",
					"value": "Naturallog(number)",
					"editorVal": "Naturallog(${1:number})"
				},
				{
					"name": "Base10log",
					"value": "Base10log(number)",
					"editorVal": "Base10log(${1:number})"
				},
				{
					"name": "Max",
					"value": "Max(number, number)",
					"editorVal": "Max(${1:number}, ${2:number})"
				},
				{
					"name": "Min",
					"value": "Min(number, number)",
					"editorVal": "Min(${1:number}, ${2:number})"
				},
				{
					"name": "Sqrt",
					"value": "Sqrt(number)",
					"editorVal": "Sqrt(${1:number})"
				},
				{
					"name": "If",
					"value": "If(boolean, generic, generic)",
					"editorVal": "If(${1:boolean}, ${2:generic}, ${3:generic})"
				},
				{
					"name": "Len",
					"value": "Len(string)",
					"editorVal": "Len(${1:string})"
				},
				{
					"name": "Find",
					"value": "Find(string, search string, number)",
					"editorVal": "Find(${1:string}, ${2:search string}, ${3:number})"
				},
				{
					"name": "Dayofweek",
					"value": "Dayofweek(date-time)",
					"editorVal": "Dayofweek(${1:date-time})"
				},
				{
					"name": "Dayofmonth",
					"value": "Dayofmonth(date-time)",
					"editorVal": "Dayofmonth(${1:date-time})"
				},
				{
					"name": "Dayofyear",
					"value": "Dayofyear(date-time)",
					"editorVal": "Dayofyear(${1:date-time})"
				},
				{
					"name": "Hour",
					"value": "Hour(date-time)",
					"editorVal": "Hour(${1:date-time})"
				},
				{
					"name": "Minute",
					"value": "Minute(date-time)",
					"editorVal": "Minute(${1:date-time})"
				},
				{
					"name": "Month",
					"value": "Month(date-time)",
					"editorVal": "Month(${1:date-time})"
				},
				{
					"name": "Year",
					"value": "Year(date-time)",
					"editorVal": "Year(${1:date-time})"
				},
				{
					"name": "Weekday",
					"value": "Weekday(date-time)",
					"editorVal": "Weekday(${1:date-time})"
				},
				{
					"name": "And",
					"value": "And(boolean, boolean)",
					"editorVal": "And(${1:boolean}, ${2:boolean})"
				},
				{
					"name": "Or",
					"value": "Or(boolean, boolean)",
					"editorVal": "Or(${1:boolean}, ${2:boolean})"
				},
				{
					"name": "Not",
					"value": "Not(boolean)",
					"editorVal": "Not(${1:boolean})"
				},
				{
					"name": "Concat",
					"value": "Concat(string, string)",
					"editorVal": "Concat(${1:string}, ${2:string})"
				},
				{
					"name": "CaseInsensitiveEquals",
					"value": "CaseInsensitiveEquals(string, string)",
					"editorVal": "CaseInsensitiveEquals(${1:string}, ${2:string})"
				},
				{
					"name": "Contains",
					"value": "Contains(string, search string)",
					"editorVal": "Contains(${1:string}, ${2:search string})"
				},
				{
					"name": "Startswith",
					"value": "Startswith(string, search string)",
					"editorVal": "Startswith(${1:string}, ${2:search string})"
				},
				{
					"name": "Endswith",
					"value": "Endswith(string, search string)",
					"editorVal": "Endswith(${1:string}, ${2:search string})"
				},
				{
					"name": "Lower",
					"value": "Lower(string)",
					"editorVal": "Lower(${1:string})"
				},
				{
					"name": "Upper",
					"value": "Upper(string)",
					"editorVal": "Upper(${1:string})"
				},
				{
					"name": "Trim",
					"value": "Trim(string)",
					"editorVal": "Trim(${1:string})"
				},
				{
					"name": "Substring",
					"value": "Substring(string, number, number)",
					"editorVal": "Substring(${1:string}, ${2:number}, ${3:number})"
				},
				{
					"name": "Tostring",
					"value": "Tostring(generic)",
					"editorVal": "Tostring(${1:generic})"
				},
				{
					"name": "Replace",
					"value": "Replace(string, search string, replacement string)",
					"editorVal": "Replace(${1:string}, ${2:search string}, ${3:replacement string})"
				},
				{
					"name": "IsEmpty",
					"value": "IsEmpty(string)",
					"editorVal": "IsEmpty(${1:string})"
				},
				{
					"name": "Newdate",
					"value": "Newdate(year, month, day, hour, minute, am/pm)",
					"editorVal": "Newdate(${1:year}, ${2:month}, ${3:day}, ${4:hour}, ${5:minute}, ${6:am/pm})"
				},
				{
					"name": "Datepart",
					"value": "Datepart(date-time)",
					"editorVal": "Datepart(${1:date-time})"
				},
				{
					"name": "Timepart",
					"value": "Timepart(date-time)",
					"editorVal": "Timepart(${1:date-time})"
				},
				{
					"name": "Adddate",
					"value": "Adddate(date-time, number, string)",
					"editorVal": "Adddate(${1:date-time}, ${2:number}, ${3:string})"
				},
				{
					"name": "Subdate",
					"value": "Subdate(date-time, number, string)",
					"editorVal": "Subdate(${1:date-time}, ${2:number}, ${3:string})"
				},
				{
					"name": "Now",
					"value": "Now()",
					"editorVal": "Now()"
				},
				{
					"name": "Datecomp",
					"value": "Datecomp(date-time, date-time)",
					"editorVal": "Datecomp(${1:date-time}, ${2:date-time})"
				},
				{
					"name": "DateBetween",
					"value": "DateBetween(date-time, date-time)",
					"editorVal": "DateBetween(${1:date-time}, ${2:date-time})"
				},
				{
					"name": "FromTimestamp",
					"value": "FromTimestamp(timestamp)",
					"editorVal": "FromTimestamp(${1:timestamp})"
				},
				{
					"name": "Timestamp",
					"value": "Timestamp()",
					"editorVal": "Timestamp()"
				},
				{
					"name": "Tonumber",
					"value": "Tonumber()",
					"editorVal": "Tonumber()"
				},
				{
					"name": "IsPositive",
					"value": "IsPositive()",
					"editorVal": "IsPositive()"
				},
				{
					"name": "IsNegative",
					"value": "IsNegative()",
					"editorVal": "IsNegative()"
				}]
			}),
			oprDrpOpt: Lyte.attr('array', {default: 
				[{
					'name':'+ Add',
					'value':'+'
				},
				{
					'name':'- Subtract',
					'value':'-'
				},
				{
					'name':'* Multiply',
					'value':'*'
				},
				{
					'name':'/ Divide',
					'value':'/'
				},
				{
					'name':'% Remainder',
					'value':'%'
				},
				{
					'name':'^ Exponentiation',
					'value':'^'
				},
				{
					'name':'( Open parenthesis',
					'value':'('
				},
				{
					'name':') Close parenthesis',
					'value':')'
				},
				{
					'name':'!= Not equal',
					'value':'!='
				},
				{
					'name':'== Equals',
					'value':'=='
				},
				{
					'name':'< Less than',
					'value':'<'
				},
				{
					'name':'> Greater than',
					'value':'>'
				},
				{
					'name':'<= Less than or equal',
					'value':'<='
				},
				{
					'name':'>= Greater than or equal',
					'value':'>='
				}]
			}),
			fldDrpOpt: Lyte.attr('array', {default: 
				[
					{'Lead Information': 
					[
						{
							'field_label':'Company',
							'api_name':'Company'
						},
						{
							'field_label':'Lead Owner',
							'api_name':'Lead Owner'
						},
						{
							'field_label':'Last Name',
							'api_name':'Last Name'
						},
						{
							'field_label':'First Name',
							'api_name':'First Name'
						},
						{
							'field_label':'Email',
							'api_name':'Email'
						},
						{
							'field_label':'Pick List 1',
							'api_name':'Pick List 1'
						},
						{
							'field_label':'Fax',
							'api_name':'Fax'
						},
						{
							'field_label':'Title',
							'api_name':'Title'
						},
						{
							'field_label':'Website',
							'api_name':'Website'
						},
						{
							'field_label':'Phone',
							'api_name':'Phone'
						},
						{
							'field_label':'Lead Status',
							'api_name':'Lead Status'
						},
						{
							'field_label':'Mobile',
							'api_name':'Mobile'
						},
						{
							'field_label':'No. of Employees',
							'api_name':'No. of Employees'
						},
						{
							'field_label':'Lead Source',
							'api_name':'Lead Source'
						},
						{
							'field_label':'Rating',
							'api_name':'Rating'
						},
						{
							'field_label':'Industry',
							'api_name':'Industry'
						},
						{
							'field_label':'Created Time',
							'api_name':'Created Time'
						},
						{
							'field_label':'Modified Time',
							'api_name':'Modified Time'
						},
						{
							'field_label':'Salutation',
							'api_name':'Salutation'
						},
						{
							'field_label':'Last Activity Time',
							'api_name':'Last Activity Time'
						},
						{
							'field_label':'Annual Revenue',
							'api_name':'Annual Revenue'
						},
						{
							'field_label':'Skype ID',
							'api_name':'Skype ID'
						},
						{
							'field_label':'Email Opt Out',
							'api_name':'Email Opt Out'
						},
						{
							'field_label':'Secondary Email',
							'api_name':'Secondary Email'
						},
						{
							'field_label':'Modified By',
							'api_name':'Modified By'
						},
						{
							'field_label':'Twitter',
							'api_name':'Twitter'
						}
					]
				},
				{'Address Information':
					[
						{
							'field_label':'Street',
							'api_name':'Street'
						},
						{
							'field_label':'City',
							'api_name':'City'
						},
						{
							'field_label':'State',
							'api_name':'State'
						},
						{
							'field_label':'Zip Code',
							'api_name':'Zip Code'
						},
						{
							'field_label':'Country',
							'api_name':'Country'
						}
					]
				},
				{'Description Information':
					[
						{
							'field_label':'Description',
							'api_name':'Description'
						}
					]
				}]
			}),
			cxPropHelpMaxCharNotes : Lyte.attr("string", {default : "Max of 255 characters"})

			// FORMULA EDITOR
		};		
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
		Lyte.removeEventListener(this.modifyPropertyEvent);
		Lyte.removeEventListener(this.propertyDisplayNotes);
		if (this.autoNumberPreviewEvent) {
			Lyte.removeEventListener(this.autoNumberPreviewEvent);
		}
		if (this.picklistJsonChangeEvent) {
			Lyte.removeEventListener(this.picklistJsonChangeEvent);
		}
		if (this.picklistJsonAppendEvent) {
			Lyte.removeEventListener(this.picklistJsonAppendEvent);
		}
		if (this.picklistJsonRemoveEvent) {
			Lyte.removeEventListener(this.picklistJsonRemoveEvent);
		}
		if (this.picklistUpdateEvent) {
			Lyte.removeEventListener(this.picklistUpdateEvent);
		}
		if (this.internalPicklistValuesTrigger) {
			Lyte.removeEventListener(this.internalPicklistValuesTrigger);
		}
		if(this.fieldErrorEvent){
			Lyte.removeEventListener(this.fieldErrorEvent);
		}
	},
	checkForCustomizableProperty : function(){
		if(this.data.cxPropField.customizable_properties && !this.data.isSubProperty){
			var mapping = this.cruxPageBuilder.getData('cxPropCustomizableFieldMetaMapping');
			var key = this.data.cxPropProperty.api_name;
			if(mapping[this.data.cxPropProperty.api_name]){
				key = mapping[this.data.cxPropProperty.api_name];
			}
			if(this.data.cxPropField.customizable_properties.indexOf(key) === -1){
				Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_disabled', true);
			}else{
				Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_disabled', false);
			}
		}
	},
	didConnect : function(){
		this.checkForCustomizableProperty();
		this.showMetaError = Lyte.addEventListener('cxPbShowFieldMetaError',(obj)=>{
			if(this.$node && this.data.cxPropProperty.api_name === obj.api_name){
				var input = this.$node.querySelector('.cxPbPrComp');
				var errorSpan = input.querySelector('.cruxErrMsg');
				errorSpan.classList.add('cxShakeErrorMessage');
				input.focus();
				setTimeout(()=>{
					errorSpan.classList.remove('cxShakeErrorMessage');
				},500);
			}
		});
		this.propertyDisplayNotes = Lyte.addEventListener("cxPbEventPropertyNotes", function(obj){
			if(this.$node && this.data.cxPropProperty.api_name === obj.api_name){
				this.setData("cxPropDisplayNotes" , obj.cxPropDisplayNotes);
			}
		}.bind(this));
		this.fieldErrorEvent = Lyte.addEventListener('cxPbEventFieldPropertyError',function(obj){
			if(this.data.cxPropProperty.api_name === obj.field_key){
				this.$node.querySelector('.cxPbPrComp').cxProp('errorMessage',obj.errorMessage);
			}
		}.bind(this));
		this.modifyPropertyEvent = Lyte.addEventListener("cxPbEventModifyProperty", function(obj){
			if(this.data.cxPropProperty.sub_properties){
				this.data.cxPropProperty.sub_properties.forEach(function(item,index){
					item.cxPropProperties.forEach(function(sub,subIndex){
						if(!item.show && sub.api_name === obj.propertyKey){
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','allowed_values', obj.options);
						}
					}.bind(this));
				}.bind(this));
			}
			if(obj.propertyKey === this.data.cxPropProperty.api_name){
				if(obj.action === 'set_property' && obj.length){
					Lyte.objectUtils(this.data.cxPropProperty,'add','max_length', obj.length);
					return; 
				}
				if(obj.action === "options_change"){
					var dropdownNode = this.$node.querySelector('crux-dropdown');
					if(parseInt(dropdownNode.cxProp('selected')) > obj.fromValue){
						dropdownNode.cxProp('selected','0');
						this.propertyChangeFn(0,dropdownNode);
					}
					Lyte.objectUtils(this.data.cxPropProperty,'add','allowed_values', obj.options);
					return;
				}else if(obj.action === 'hide' || obj.action === 'show'){
					Lyte.objectUtils(this.data.cxPropProperty,'add','cxHide',obj.action === 'hide');
					this.setData('triggerVisiblity',!this.data.triggerVisiblity);
				}else if(obj.action === "checked"){
					var checkBoxNode = this.$node.querySelector('crux-boolean-component');
					this.propertyChangeFn(true,checkBoxNode);
				}else if(obj.action === "unchecked"){
					Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_disabled', true);
				}
				var index = this.modificationArray.cruxFindIndexOfObject('fromProperty',obj.fromProperty);
				if(index > -1){
					this.modificationArray[index] = obj;
				}else{
					this.modificationArray.push(obj);
				}
					var disableIndex = this.modificationArray.cruxFindIndexOfObject('action','disable');
				if(disableIndex > -1){
					var checkLyteBoxNode = this.$node.querySelector('lyte-checkbox');
					if(checkLyteBoxNode && checkLyteBoxNode.ltProp('checked')){
						checkLyteBoxNode.ltProp('checked',false);
						this.propertyChangeFn(false,checkLyteBoxNode.closest('crux-boolean-component'));
					}
					Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_disabled', true);
					Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_tooltip', this.modificationArray[disableIndex].cxTooltipMessage);
				}else{
					this.checkForCustomizableProperty();
					Lyte.objectUtils(this.data.cxPropProperty,'add','customizable_tooltip', undefined);

				}
			}
		}.bind(this));

		if(this.data.cxPropProperty.display_type === 'auto_number_input'){
			var ar = [
		    	{'Date' : [{'name' : '{DD} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('DD') + '</span>','value' : '{DD}'}]},
		        {'Month' : [{'name' : '{MM} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('MM') + '</span>','value' : '{MM}'},{'name' : '{MMM} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('MMM') + '</span>','value' : '{MMM}'},{'name' : '{MMMM} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('MMMM') + '</span>','value' : '{MMMM}'}]},
		        {'Year' : [{'name' : '{YY} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('YY') + '</span>','value' : '{YY}'},{'name' : '{YYYY} <span class="cxPbAutoNumberMergeDate">- ' + $L.moment(new Date()).format('YYYY') + '</span>','value' : '{YYYY}'}]}
    	    ];
			var a = this.$node.querySelector('lyte-input');

		    $L(a).cruxMergeField({
            	onMergeFieldGetReplaceData : function(event,value){ 
            		// setTimeout(function(){
            		// 	this.propertyChangeFn(a.component.getValue(),a.component);
            		// }.bind(this,100))
					return value.value;
            	}.bind(this),
				cxPropField:ar,
				cxPropUserValue:"name",
				cxPropSystemValue:"value",
				cxPropType:"box",
				cxPropRenderHtmlInUserValue : true,
				cxPropOptSupport : true
			});
		}

		if(this.data.cxPropProperty.property_type_custom === 'plOpt'){
			this.updatedPicklistJson();
			if(this.data.cxPropField.data_type === 'multiselectpicklist'){
				this.setData('picklistOptions',[
						[{system : 'unused_values',display : _cruxUtils.getI18n('crm.label.from.add.unused.values')}],
						[{system : 'predefined_options',display : 'Add Predefined Choices'},{system : 'bulk_option',display : 'Add bulk options'}]
					]);
			}
			if(this.cruxPageBuilder.getMethods('cxPbChangePicklistSettingOptions')){
					this.setData('picklistOptions',this.cruxPageBuilder.executeMethod('cxPbChangePicklistSettingOptions',this.data.picklistOptions,this.data.cxPropProperty,this.data.cxPropField));
			}
		}
		if(this.data.cxPropProperty.display_type === 'dropdown' && (!this.data.cxPropField[this.data.cxPropProperty.api_name] ||!this.getNestedValue(this.data.cxPropField, this.data.cxPropProperty.api_name))){
			var dropdownNode = this.$node.querySelector('crux-dropdown');
			var selected = dropdownNode.cxProp('selected');
			if(dropdownNode.cxPropOptions){
				if(this.data.cxPropProperty.name === 'related_module'){
					this.propertyChangeFn({id : selected},dropdownNode);
				}else{
					this.propertyChangeFn(selected,dropdownNode);
				}
			}			
		}
		if(this.data.cxPropProperty.display_type === 'criteriaFilters'){
		    var outputNode = this.$node.querySelector('#cxPbLookupCriteria');
		    if(outputNode){
		 		this.criteriaViewRender(this.data.cxPropField[this.data.cxPropProperty.api_name]);
		    }
		}
	},
	getNestedValue : function(obj, path) {
		return path.split('.').reduce((acc, key) => {
			return acc ? acc[key] : undefined;
		}, obj);
	},
	init : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropFieldSpecialMetaKeys", this.cruxPageBuilder.getData("cxPropFieldSpecialMetaKeys"));
		this.setData("cxPropPreviewEnableFields", this.cruxPageBuilder.getData("cxPropPreviewEnableFields"));
		let property = this.data.cxPropProperty;
		let field = this.data.cxPropField;

		function setNestedValue(obj, path, value) {
			const keys = path.split('.');
			let field_ref = obj;
			let keyLen = keys.length;
			for (let i = 0; i < keyLen; i++) {
				const key = keys[i];
				if (i === keyLen - 1) {
				field_ref[key] = value;
				} else {
				field_ref[key] = field_ref[key] || {};
				field_ref = field_ref[key];
				}
			}
		}
		const currentValue = property.api_name ? this.getNestedValue(field, property.api_name) : undefined;

		if (property.api_name && property.data_type === "jsonobject" && currentValue && typeof currentValue === "object" && Object.keys(currentValue).length === 0) {
			setNestedValue(field, property.api_name, {});
		}
		if ((property.default_value !== undefined || property.api_name.indexOf('.') > -1) && property.api_name !== "field_label" && (currentValue === undefined || currentValue === null)) {
			if (property.api_name.indexOf('.') > -1) {
				setNestedValue(field,property.api_name,property.default_value !== undefined ? property.default_value : {});
			} else if (property.data_type === "boolean") {
				field[property.api_name] = property.default_value === 'true';
			} else {
				field[property.api_name] = property.data_type === "integer" || property.data_type === "number" ? parseInt(property.default_value): property.default_value;
			}
		}
		if(property.cxPropDisplayNotes){
			this.setData("cxPropDisplayNotes" , property.cxPropDisplayNotes);
		}
		// if(property.api_name === "tool_tiptype"){
		// 	this.setData("cxPropHelpMaxCharNotes", this.data.cxPropField[property.api_name] === "info_icon" ? "Max of 255 characters" : "Max of 32 characters");
		// }
		if(this.data.cxPropProperty.display_type === 'radiobutton'){
			this.setData('cxPropProperty',Object.assign({"display_format" : 'radio_button'},this.data.cxPropProperty));
		} 
		if(this.data.cxPropProperty.data_type === 'integer' && this.data.cxPropProperty.notes === null && this.data.cxPropProperty.length){
			Lyte.objectUtils(this.data.cxPropProperty,'add','notes',"Max of " + this.data.cxPropProperty.length + " characters");
		}
		if(this.data.cxPropProperty.api_name === 'tool_tipcontent' && this.data.cxPropProperty.notes === null && this.data.cxPropProperty.max_length){
			let len = this.data.cxPropProperty.max_length ? this.data.cxPropProperty.max_length : 255;
			Lyte.objectUtils(this.data.cxPropProperty,'add','notes',"Max of " + len + " characters");
		}
		this.modificationArray = [];
		if(this.data.cxPropProperty.property_type === '#custom'){
			if(this.data.cxPropProperty.name === 'options'){
				this.data.cxPropProperty.property_type_custom = 'plOpt';
				Lyte.objectUtils(this.data.cxPropProperty,'add','property_type_custom','plOpt');
				var ci = this.data.cxPropProperty.sub_properties[0].cxPropProperties.cruxFilterBy({name : 'color_code'});
				if(ci.length){
					this.setData({'colorCodeProperty': ci[0],'colorPalleteEnabled': this.data.cxPropField[ci[0].api_name] });
				}
				this.picklistJsonChangeEvent = Lyte.addEventListener("cxPbEventChangePicklistValues",function(opt){
					if(opt.field_id === this.data.cxPropField.id){
						this.setData('picklistJson',opt.picklistJson);
						this.updatedPicklistJson();
					}
				}.bind(this));
				this.picklistJsonAppendEvent = Lyte.addEventListener("cxPbEventAppendPicklistValues",function(opt){
					if(opt.field_id === this.data.cxPropField.id){
						Lyte.arrayUtils(this.data.picklistJson,'concat',opt.picklistJson);
						// this.setData('picklistJson',picklistJson)
						this.updatedPicklistJson();
					}
				}.bind(this));
				this.picklistJsonRemoveEvent = Lyte.addEventListener("cxPbEventRemovePicklistValues",function(opt){
					if(opt.field_id === this.data.cxPropField.id){
						Lyte.arrayUtils(this.data.picklistJson,'removeObjects',opt.picklistJson);
						// this.setData('picklistJson',picklistJson)
						this.updatedPicklistJson();
					}
				}.bind(this));
				this.internalPicklistValuesTrigger = Lyte.addEventListener('internalPicklistValuesTrigger',function(){
					Lyte.triggerEvent('cxPbEventPicklistValuesUpdated',{field_id : this.data.cxPropField.id, picklistJson : this.data.picklistJson});
				}.bind(this));
			}
			if(this.data.cxPropProperty.name === 'auto_number_preview'){
				this.data.cxPropProperty.property_type_custom = 'auto_number_preview';
				this.setData('autoNumberPreview',(this.data.cxPropField.auto_number.prefix || "") + (this.data.cxPropField.auto_number.starting_number || "") + (this.data.cxPropField.auto_number.suffix || ""));
				this.autoNumberPreviewEvent = Lyte.addEventListener("cxPbEventAutoNumberPreview",function(prefix,starting_number,suffix){
					this.setData('autoNumberPreview',prefix + starting_number + suffix);
				}.bind(this));
			}
			if(this.data.cxPropProperty.name === 'history_tracking'){
				this.data.cxPropProperty.property_type_custom = 'picklistHistoryTracking';
				Lyte.objectUtils(this.data.cxPropProperty,'add','property_type_custom','picklistHistoryTracking');
			}
			if(this.data.cxPropProperty.name === 'rollup_summary_options'){
				this.data.cxPropProperty.property_type_custom = 'rollupOptions';
				Lyte.objectUtils(this.data.cxPropProperty,'add','property_type_custom','rollupOptions');
			}
			if(this.data.cxPropProperty.name === "lookup_filter"){
				Lyte.objectUtils(this.data.cxPropProperty,'add','property_type_custom','criteriaFilters');
			}
			if(this.data.cxPropProperty.name === "field_of_lookup"){
				Lyte.objectUtils(this.data.cxPropProperty,'add','property_type_custom','fieldOfLookup');
			}

		}

		if(this.data.cxPropField.pick_list_values){
			this.setData('picklistJson',this.data.cxPropField.pick_list_values);
		}
		if(this.data.cxPropProperty.name === 'default_value' && (this.data.cxPropField.data_type === 'picklist' || this.data.cxPropField.data_type === 'multiselectpicklist')){
			Lyte.objectUtils(this.data.cxPropProperty,'add','options',this.data.picklistJson);
			this.setData({'dropdownUserValue' :'display_value', 'dropdownSystemValue' :'reference_value'});
			this.picklistUpdateEvent = Lyte.addEventListener('cxPbEventPicklistValuesUpdated',function(opt){
				if(opt.field_id === this.data.cxPropField.id){
					this.setData('picklistJson',opt.picklistJson);
					Lyte.objectUtils(this.data.cxPropProperty,'add','options',this.data.picklistJson);
					var dropdownNode = this.$node.querySelector('crux-dropdown');
					if(dropdownNode){
						var a = dropdownNode.cxProp('selected');
						dropdownNode.cxProp('selected','');
						dropdownNode.cxProp('selected',a);
					}
				}
			}.bind(this));
			Lyte.triggerEvent('internalPicklistValuesTrigger');
		}
		if(this.data.cxPropProperty.api_name === 'lookup.module' || this.data.cxPropProperty.api_name === 'multiselectlookup.module'){
			this.setData({'dropdownUserValue' :'plural_label','dropdownSystemValue' :'id'});
		}
		if((this.data.cxPropProperty.display_type === 'dropdown'  || this.data.cxPropProperty.diseplay_type === 'multidropdown' )&& (!this.data.cxPropProperty.allowed_values || this.data.cxPropProperty.allowed_values.length === 0)){
			if(this.cruxPageBuilder.getMethods('cxPbGetDropdownOptions')){
				var options = this.cruxPageBuilder.executeMethod('cxPbGetDropdownOptions',this.data.cxPropProperty,this.data.cxPropField);
				if(options instanceof Promise){
					options.then((opt)=>{
						if(opt){
							Lyte.objectUtils(this.data.cxPropProperty,'add','allowed_values',opt);
							var dropdownNode = this.$node.querySelector('crux-dropdown');
							let sel_value = opt.cruxFilterBy({[this.data.dropdownSystemValue] : dropdownNode.cxProp('selected')})[0];
							setNestedValue(this.data.cxPropField, this.data.cxPropProperty.api_name, sel_value);
							this.propertyChangeFn(sel_value,dropdownNode);
						}
						
					});
				}else{
					Lyte.objectUtils(this.data.cxPropProperty,'add','allowed_values',options);
					var dropdownNode = this.$node.querySelector('crux-dropdown');
					let sel_value = options.cruxFilterBy({[this.data.dropdownSystemValue] : dropdownNode.cxProp('selected')})[0];
					setNestedValue(this.data.cxPropField, this.data.cxPropProperty.api_name, sel_value);
					this.propertyChangeFn(sel_value,dropdownNode);
				}
			}else{
				// console.error('cxPbGetDropdownOptions is mandatory when the options is not provided for the dropdown type property');
			}
		}
		this._value = this.data.cxPropField[this.data.cxPropProperty.api_name];
		this.checkSubPropertyVisibility(this._value);
	},
	actions : {
		checkBoxClick : function(item){
			if(item.previousElementSibling.nodeName === "CRUX-BOOLEAN-COMPONENT"){
				item.previousElementSibling.querySelector("input").click();
			}
		},
		renderFieldPreview : function(){
			this.throwEvent("previewField", this.data.cxPropField);
		},
		addPicklistOption : function(index){
			Lyte.arrayUtils(this.data.picklistJson,'insertAt',index + 1,{actual_value : "",display_value : "",reference_value : "",color_code : 'noFill'});
			this.updatedPicklistJson();
		},
		removePicklistOption : function(index){
			if(this.data.picklistJson.length === 1){
				return;
			}
			Lyte.arrayUtils(this.data.picklistJson,'removeAt',index,1);
			this.updatedPicklistJson();
		},
		piclikistSettingOptionClicked : function(opt){
			this.executeMethod('piclikistSettingOptionClicked',opt,this.data.picklistJson.filter(function(item) { return item.actual_value !== ""; } ));
		},
		picklistTrackingEdit : function(){
			this.executeMethod('piclikistSettingOptionClicked','history_tracking',this.data.picklistJson);
		},
		picklistMaxMin : function(){
			this.setData('isPicklistMaximize',!this.data.isPicklistMaximize);
		},
		openCriteriaDetails : function(){
			var a = this.executeMethod('lookupPropertyModalClicked','lookup_filter',this.data.cxPropProperty);
			a.then(function(value){
				this.setData('showCriteriaView',true);
				this.propertyChangeFn(value);
				this.criteriaViewRender(value);
			}.bind(this));
		},
		deleteCriteriaDetails : function(){
			this.setData('showCriteriaView',false);
			this.propertyChangeFn(null);
		},
		openFieldOfLookup : function(){
			var a = this.executeMethod('lookupPropertyModalClicked','field_of_lookup',this.data.cxPropProperty);
			a.then(function(){
				this.setData('showCriteriaView',true);
			}.bind(this));
		},
		rollupOnScroll: function() {
			const sections = document.querySelectorAll('.cxPbPropRollupSumField');
			sections.forEach(section => {
				if (this.isElementInViewport(section)) {
					let parentElem = section.closest('.cxPbPropRollupSumFormRow').querySelector('.cxPbPropRollupSumFormLabel');
					let selectedVal = parentElem.innerText;
					this.setData("rollupOptionSelected", selectedVal);
				}
			});
		},
		getTextAreaFocusCall : function(){ // formula editor open modal
			this.$node.querySelector(".cxPbAddFormulaModal").ltProp('show', true);
			let formulaEditorComp = $L('.cxPbFormulaEditorComp')[0].component;
			let getTextareaVal = this.$node.querySelector(".cxPbPrCompTextarea").component.getValue();
			formulaEditorComp.setData("cxPropValue", getTextareaVal);
			formulaEditorComp.getValue();
		},
		closeAddFormulaPBModal : function(){ // formula editor close modal
			let formulaEditorComp = $L('.cxPbFormulaEditorComp')[0].component;
			let getTextareaVal = this.$node.querySelector(".cxPbPrCompTextarea").component.getValue();
			formulaEditorComp.setData("cxPropValue", getTextareaVal);
			formulaEditorComp.getValue();
			this.$node.querySelector('.cxPbAddFormulaModal').ltProp('show',false);
		},
		saveAddFormulaPBModal : function(){ // formula editor save modal
			let formulaEditorComp = $L('.cxPbFormulaEditorComp')[0].component;
			let formulaValue = formulaEditorComp.getValue();
			this.$node.querySelector(".cxPbPrCompTextarea").component.setData("cxPropValue", formulaValue);
			this.$node.querySelector('.cxPbAddFormulaModal').ltProp('show',false);
			this.methods.onRunExecution(formulaValue);
		}
	},
	methods : {
		valueChanged : function(comp,value){
			// if(this.getMethods('propertyChanged'))
			if(this.data.cxPropProperty.display_type === 'number'){
				value = isNaN(parseInt(value)) ? null : parseInt(value);
			}
			if(this.data.cxPropProperty.property_type_custom === 'picklistHistoryTracking'){
				if(this.picklistTrackingDontTrigger){
					return;
				}
				var promiseRes;
				if(value){
					promiseRes = this.executeMethod('piclikistSettingOptionClicked','history_tracking',this.data.picklistJson);
				}else{
					promiseRes = new Promise(function(res,rej){
						_cruxUtils.showCustomAlert({ reject : function(){ res(); }, accept : function(){ rej(); }, params : { ltPropWrapperClass : 'cxPbPreventPropertiesPanelClose', ltPropPrimaryMessage : _cruxUtils.getI18n('crm.picklist.tracker.disableTrackingMsg'), ltPropButtonPosition : 'center', ltPropButtons : [{ "type": "reject", "text": _cruxUtils.getI18n('crm.camp.integ.button.disable'), "appearance": "failure" }, { "type": "accept", "text": _cruxUtils.getI18n('crm.button.cancel') }] } });
					});
				}
				promiseRes.then(function(){
					this.propertyChangeFn(value,comp);	
				}.bind(this),function(){
					this.picklistTrackingDontTrigger = true;
					this.$node.querySelector('crux-boolean-component').cxProp('value',!value);
					this.picklistTrackingDontTrigger = false;
				}.bind(this));
			}else{	
				this.propertyChangeFn(value,comp);
			}
		},
		radioButtonChanged : function(comp,value){
			try{
				value = this.data.cxPropProperty.allowed_values.cruxFilterBy({display_value : value})[0].system_value;
				// if(value === "static"){
				// 	this.setData("cxPropHelpMaxCharNotes", "Max of 32 characters");
				// }
			}catch(e){
				murphy.error(e);
			}
			
			this.propertyChangeFn(value,comp);
		},
		dropdownValueSelect : function(event,value,comp){
			try{
				value = this.data.cxPropProperty.allowed_values.cruxFilterBy({[this.data.dropdownSystemValue] : value})[0];
			}catch(e){
				murphy.error(e);
			}
			
			this.propertyChangeFn(value,comp);
		},
		propertyChangedSub : function(key,value){
			this.executeMethod('propertyChanged',...arguments);
			if(this.data.cxPropProperty.property_type_custom === 'plOpt' && this.data.colorCodeProperty && this.data.colorCodeProperty.api_name === key){
				this.setData('colorPalleteEnabled',value);
			}
		},
		errorInPropertySub : function(){
			this.executeMethod('errorProperty',...arguments);
		},
		picklistOptionChange : function(index,value){
			Lyte.objectUtils(this.data.picklistJson[index],'add','actual_value',value);
			Lyte.objectUtils(this.data.picklistJson[index],'add','display_value',value);
			// Lyte.objectUtils(this.data.picklistJson[index],'add','reference_value',value)
			this.updatedPicklistJson();
		},
		colorCodeSelected : function(index,value){
			Lyte.objectUtils(this.data.picklistJson[index],'add','color_code',value);
			this.updatedPicklistJson();
		},
		onRunExecution: function(){ // formulaEditor exception error handling callback
			$L(".cxPbFormulaEditorComp")[0].component.getValue();
		}
	},
	isElementInViewport: function(el) {
		const rect = el.getBoundingClientRect();
		return rect.top >= 0 && rect.bottom <= window.innerHeight;
	},
	criteriaViewRender : async function(criteria){
		if(this.cruxPageBuilder.getMethods('cxPbGetCriteriaViewDetails')){
	 		var obj = await this.cruxPageBuilder.executeMethod('cxPbGetCriteriaViewDetails',this.data.cxPropField,this.data.cxPropProperty,criteria);
	 		if(!obj.data.cxPropSetCriteria){
	 			obj.data.cxPropSetCriteria = criteria;
	 		}
	 		if(!obj.data.cxPropType){
	 			obj.data.cxPropType = 'view';
	 		}
	 		var outputNode = this.$node.querySelector('#cxPbLookupCriteria');
	 		outputNode.innerHTML = "";
	 		Lyte.Component.render('crux-criteria-editor',obj.data,outputNode,{methods : obj.methods});
	 	}else{
	 		// console.error('cxPbGetCriteriaViewDetails this method is mandatory to show the criteria values');
	 	}
	},
	validateValue : function(value,validation){
		if(validation.length){
			return value.length < validation.length;
		}else if(validation.max_value){
			return value < validation.max_value;
		}
	},
	propertyChangeFn : async function(value,comp){
		if(this.data.cxPropProperty.display_type === 'auto_number_input'){
			value = value.replace(new RegExp('{DD}','gi'),'${DD}').replace(new RegExp('{MM}','gi'),'${MM}').replace(new RegExp('{MMM}','gi'),'${MMM}').replace(new RegExp('{MMMM}','gi'),'${MMMM}').replace(new RegExp('{YY}','gi'),'${YY}').replace(new RegExp('{YYYY}','gi'),'${YYYY}');
		}
		var error = false;
		var errorMessage;
		if(this.data.cxPropProperty.validation && this.data.cxPropProperty.validation.length){
			this.data.cxPropProperty.validation.forEach(function(validation){
				var t = this.validateValue(value,validation);
				if(t === false){
					errorMessage = "Please enter a valid input";
					this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
					comp.cxProp('errorMessage',errorMessage);
					error = true;
				}
			}.bind(this));
		}
		if(this.data.cxPropProperty.api_name === 'field_label'){
			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.empt'); 
				this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
				comp.cxProp('errorMessage',errorMessage);
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.splc');
				this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
				comp.cxProp('errorMessage',errorMessage);
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.sykw');
				this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
				comp.cxProp('errorMessage',errorMessage);
			} 

			let field_labels = this.cruxPageBuilder.cruxNode.component.field_label_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== this.data.cxPropField.field_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.dplk');
				this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
				comp.cxProp('errorMessage',errorMessage);
				error = true;
			}

		}else if(this.data.cxPropProperty.required && !value){
			errorMessage = "Please enter a valid input";
			this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
			comp.cxProp('errorMessage',errorMessage);
			error = true;
		}
		if(this.data.cxPropProperty.property_type === 'number'){
			if(!this.isValidDecimal(value)){
				errorMessage = "Please enter a valid number";
				this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
				comp.cxProp('errorMessage',errorMessage);
				error = true;
			}else{
				value = parseInt(value);
				if(Number.isNaN(value)){
					errorMessage = "Please enter a valid number";
					this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,errorMessage);
					comp.cxProp('errorMessage',errorMessage);
					value = '';
				}
			}
		}

		// if(this.data.cxPropProperty.data_type === 'jsonobject' && !value){
		// 	value = {};
		// }

		var ch = true;
		if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
			ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',this.data.cxPropField,this.data.cxPropProperty.api_name,value,this._value);
			if(ch &&  typeof ch.then === "function"){
				ch = await ch;
			}
			if(typeof ch === 'object'){
				if(ch.type === 'error'){
					this.executeMethod('errorProperty',this.data.cxPropProperty.api_name,ch.message);
					comp.cxProp('errorMessage',ch.message);
					error = true;
					ch = true;
				}
				if(ch.type === 'update'){
					ch = true;
				}
			}
		}
		if(ch){
			// if(this.data.cxPropField instanceof Record){
			// 	this.data.cxPropField.$.set(this.data.cxPropProperty.api_name,value);
			// }
			this.checkSubPropertyVisibility(value);
				if(this.data.cxPropProperty.data_type === 'jsonobject' && this.data.cxPropProperty.sub_properties && value){
					if(typeof value !== 'object'){
						value = {};
					}
					this.data.cxPropProperty.sub_properties.forEach(function(item,index){
						item.cxPropProperties.forEach(function(prop,subIndex){
							value[this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex].api_name.split(this.data.cxPropProperty.api_name + ".")[1]] = this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex].default_value;
						}.bind(this));
					}.bind(this));
					
				}
				// else if(!value){
				// 	value = null;
				// }
				// value = this.data.cxPropField[this.data.cxPropProperty.api_name];
			
				this._value = value;
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxPropField,this.data.cxPropProperty.api_name,value);
				}
				this.executeMethod('propertyChanged',this.data.cxPropProperty.api_name,value,error);
		}
	},
	updatedPicklistJson : function(opt){
		var picklistJson = this.data.picklistJson.filter(function(item){ return item.actual_value !== ""; });
		Lyte.triggerEvent('cxPbEventPicklistValuesUpdated',{field_id : this.data.cxPropField.id, picklistJson : this.data.picklistJson});
		if (!opt) {
			this.setScrollForPicklistOptions();
		}
		this.propertyChangeFn(picklistJson,this);
	},
	setScrollForPicklistOptions : function(){
		$L("#cxPbPickListSortSelector").sortable({ //no I18n
			items : ".cxPbTableSortableHandle", //no I18n
			scrollDivY : ".lyteTableScroll",  //no I18n
			onDrop : function ( droppedElement , destinantion , belowElement , fromIndex , toIndex ) {
				var data = Lyte.arrayUtils(this.getData("picklistJson"), "removeAt", fromIndex, 1)[0];//No I18n
   				Lyte.arrayUtils(this.getData("picklistJson"), "insertAt", toIndex, data);//No I18n
   				this.updatedPicklistJson(true);
			}.bind(this)
		});
	},
	checkSubPropertyVisibility : function(value){
		if(this.data.cxPropProperty.sub_properties){
			this.data.cxPropProperty.sub_properties.forEach(function(item,index){
				item.cxPropProperties.forEach(function(prop,subIndex){
					if(prop.condition && this.data.cxPropProperty.data_type === "jsonobject" && typeof value === 'object') {
						if(Object.keys(value).length){
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',true);
						}else{
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',false);
						}
					}else if(prop.condition && value){
						if(prop.condition.value.includes(value.toString())){
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',true);
						}else{
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',false);
						}
					}else if(typeof prop.condition === 'undefined'){
						if(value){
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',true);
						}else{
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',false);
						}
					}else if(prop.condition === value){
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',true);
					}
					else{
							Lyte.objectUtils(this.data.cxPropProperty.sub_properties[index].cxPropProperties[subIndex],'add','show',false);
					}
				}.bind(this));
			}.bind(this));
		
		}
	}
},{mixins : ['crux-element-validation']});

Lyte.Component.registerHelper('getDisplayValue',function(value,array){
	try{
		if(value){
			value = array.cruxFilterBy({system_value : value})[0].display_value;
			return value;
		}
	}catch(e){
		murphy.error(e);
	}
});
Lyte.Component.registerHelper('constructDisplayValue',function(field,prop){
	let val;
	if(prop.data_type === "jsonobject" && field[prop.api_name] && Object.keys(field[prop.api_name]).length === 0){
		val = false;
	}else{
		val = field[prop.api_name];
	}	
	return val;
});
Lyte.Component.registerHelper('cxPropGetSelectedValue',function(field,apiName,dropdownSystemValue){
	let val = Lyte.Component.registeredHelpers.cruxGetNestedValue(field,apiName);
	if (typeof val === "object" && val !== null) {
		return val[dropdownSystemValue];
	}
	return val;
});
