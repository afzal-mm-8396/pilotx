Lyte.Component.register("crux-formula-editor", {
_template:"<template tag-name=\"crux-formula-editor\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div class=\"cxFrmlaEdtrContainer {{if(cxPropLeftPanel,'cxFrmlaEdtrPanelIsOpen','cxFrmlaEdtrPanelIsClosed')}}\" style=\"{{if(cxPropWidth,concat('width: ',cxPropWidth),'')}}; {{if(cxPropHeight,concat('height: ',cxPropHeight),'')}}\"> <template is=\"if\" value=\"{{cxPropLeftPanel}}\"><template case=\"true\"> <div class=\"cxFrmlaEdtrPanelExitBtn cxFlexCenter\"> <div class=\"cxIconHoverEffect cxFrmlaEdtrExitIconWrap\" onclick=\"{{action('closeLeftPanel','.cxFrmlaEdtrContainer')}}\"> <span class=\"cxFrmlaEdtrPanelExitIcon\"></span> </div> </div> <div class=\"cxFrmlaEdtrPanelContainer\"> <lyte-tabs class=\"cxFrmlaLeftTabs cxOuterTab\" lt-prop-height=\"100%\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head class=\"cxFrmlaEdtrPanelContainerTabHead\"> <lyte-tab-title lt-prop-id=\"functionsTabs1\"> Functions</lyte-tab-title> <lyte-tab-title lt-prop-id=\"fieldsTabs2\"> Fields </lyte-tab-title> </lyte-tab-head> <lyte-tab-body class=\"cxFrmlaEdtrPanelContainerTabBody\"> <lyte-tab-content id=\"functionsTabs1\"> <lyte-search lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxFrmlaEdtrAccordionFunctions&quot;, &quot;search&quot; : &quot;.cxFrmlaEdtrPanelAccordionFuncName&quot;, &quot;related&quot; : &quot;.cxFrmlaEdtrPanelAccordionitem&quot;, &quot;target&quot; : &quot;.cxFrmlaEdtrPanelAccordionBodyItems&quot;}\" lt-prop-placeholder=\"Search\" class=\"cxFrmlaEdtrPanelSearch\" lt-prop-appearance=\"box\"></lyte-search> <lyte-accordion lt-prop-prevent-auto-scroll=\"true\" lt-prop-exclusive=\"true\" class=\"cxFrmlaEdtrPanelAccordion cxFrmlaEdtrAccordionFunctions\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"for\" items=\"{{cxPropFunctionDropdownOptions}}\" item=\"multiGroup\" index=\"index\"> <lyte-accordion-item class=\"cxFrmlaEdtrPanelAccordionitem cxFrmlaEdtrPanelFunctionitem lyteAccordionActive\"> <template is=\"forIn\" object=\"{{multiGroup}}\" value=\"singleGroup\" key=\"type\"> <lyte-accordion-header class=\"cxFrmlaEdtrPanelAccordionHeader\"> <span class=\"cxFrmlaEdtrPanelAccordionHeaderIcon\"></span> <span>{{type}}</span> </lyte-accordion-header> <lyte-accordion-body class=\"cxFrmlaEdtrPanelAccordionBody\"> <template is=\"for\" items=\"{{singleGroup}}\" item=\"multiGroup\" index=\"index\"> <div class=\"cxFrmlaEdtrPanelAccordionBodyItems cxFrmlaEdtrPanelFunctionBodyItems\"> <div class=\"cxFrmlaEdtrPanelAccordionText\"> <div class=\"cxFrmlaEdtrPanelAccordionFXIcon\"></div> <lyte-text class=\"cxFrmlaEdtrPanelAccordionFuncName\" lt-prop-value=\"{{multiGroup.name}}\"></lyte-text> <div id=\"cxFrmlaEdtrPanelInfoIcon{{index}}\" class=\"cxFrmlaEdtrPanelAccordionInfoIcon\" cx-prop-insert-value=\"{{multiGroup.name}}\" onmouseover=\"{{action('showMyHintData',this)}}\"></div> </div> <div class=\"cxFrmlaEdtrPanelAccordionInsertBtn\" cx-prop-insert-name=\"{{multiGroup.name}}\" cx-prop-insert-value=\"{{multiGroup.value}}\" cx-prop-editor-val=\"{{multiGroup.editorVal}}\" onclick=\"{{action('insertDataFunction',this)}}\">Insert</div> </div> </template> </lyte-accordion-body> </template> </lyte-accordion-item> </template> </template> </lyte-accordion> </lyte-tab-content> <lyte-tab-content id=\"fieldsTabs2\"> <lyte-search lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxFrmlaEdtrAccordionFields&quot;, &quot;search&quot; : &quot;.cxFrmlaEdtrPanelAccordionFieldName&quot;, &quot;target&quot; : &quot;.cxFrmlaEdtrPanelFieldBodyItems&quot;}\" lt-prop-placeholder=\"Search\" class=\"cxFrmlaEdtrPanelSearch\" lt-prop-appearance=\"box\"></lyte-search> <lyte-accordion lt-prop-prevent-auto-scroll=\"true\" lt-prop-exclusive=\"true\" class=\"cxFrmlaEdtrPanelAccordion cxFrmlaEdtrAccordionFields\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-accordion-item class=\"cxFrmlaEdtrPanelAccordionitem cxFrmlaEdtrPanelFielditem lyteAccordionActive\"> <lyte-accordion-header class=\"cxFrmlaEdtrPanelAccordionHeader\"> Fields <span class=\"cxFrmlaEdtrPanelAccordionHeaderIcon\"></span> </lyte-accordion-header> <lyte-accordion-body class=\"cxFrmlaEdtrPanelAccordionBody\"> <template is=\"for\" items=\"{{cxPropFieldDropdownOptions}}\" item=\"item\" index=\"index\"> <div class=\"cxFrmlaEdtrPanelAccordionBodyItems cxFrmlaEdtrPanelFieldBodyItems\"> <div class=\"cxFrmlaEdtrPanelAccordionText\"> <div class=\"cxFrmlaEdtrPanelAccordionFXIcon\"></div> <lyte-text class=\"cxFrmlaEdtrPanelAccordionFieldName\" lt-prop-value=\"{{item.field_label}}\"></lyte-text> </div> <div class=\"cxFrmlaEdtrPanelAccordionInsertBtn\" cx-prop-insert-name=\"{{item.field_label}}\" cx-prop-insert-value=\"{{item.field_label}}\" onclick=\"{{action('insertDataFunction',this)}}\">Insert</div> </div> </template> </lyte-accordion-body> </lyte-accordion-item> </template> </lyte-accordion> </lyte-tab-content> </lyte-tab-body> </template> </lyte-tabs> </div> </template></template> <div class=\"cxFrmlaEdtrSpaceContainer\"> <lyte-editor data-zcqa=\"cxPropFormulaData\" lt-prop-value=\"{{lbind(cxPropValue)}}\" class=\"cxFrmlaEdtrSpaceContainerEditor {{if(cxPropFooterContainer,'cxFrmlaEdtrWithFooter','')}} {{if(cxPropFormulaReturnTypeDrops,'cxFrmlaEdtrWithFooterDD','')}}\" lt-prop-options=\"{{lbind(cxPropLyteEditorOptions)}}\" lt-prop-custom-css-path=\"{{cxPropCustomCssPath}}\" lt-prop-base-css-added=\"true\" lt-prop-render-scoped-toolbar=\"true\" lt-prop-render-in-shadow-root=\"{{cxPropRenderInShadowRoot}}\" lt-prop-base-path=\"{{cxPropBasePath}}\" lt-prop-language=\"{{cxPropLanguage}}\" on-basic-editor-load=\"{{method('onBasicEditorLoad')}}\" on-selection=\"{{method('onSelectionChange',this)}}\" on-value-change=\"{{method('editorValueChange')}}\"> <template is=\"registerYield\" yield-name=\"toolbar\"> <div class=\"cxFrmlaEdtrTopPanelContainer cxFrmlaEdtrInsertContainer\"> <template is=\"if\" value=\"{{expHandlers(cxPropOnlyPicklist,'||',cxPropFormulaTitleYield)}}\"><template case=\"true\"><div class=\"cxFrmlaEdtrHeaderDropdowns\"> <template is=\"if\" value=\"{{cxPropFormulaTitleYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cx-formula-title\"></lyte-yield> <span class=\"cxFrmlaEdtrTopPanelSeparator\"></span> </template></template> <template is=\"if\" value=\"{{cxPropOnlyPicklist}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropFunctionDropdown}}\"><template case=\"true\"> <crux-dropdown class=\"cxFrmlaEdtrTopPanelDropdown\" cx-prop-options=\"{{cxPropFunctionDropdownOptions}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"value\" cx-prop-icon-class=\"dropdown\" cx-prop-maxsearch=\"10\" cx-prop-limit=\"50\" cx-prop-searchplaceholder=\"search\" cx-prop-option-zcqa=\"value in cxPropSystemValue\" cx-prop-box-button-width=\"min-button\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-remove-multiple=\"true\" cx-prop-placeholder=\"Select Function\" on-option-select=\"{{method('onOptionSelect','function')}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{cxPropFieldDropdown}}\"><template case=\"true\"> <crux-dropdown class=\"cxFrmlaEdtrTopPanelDropdown\" cx-prop-options=\"{{cxPropFieldDropdownOptions}}\" cx-prop-user-value=\"field_label\" cx-prop-system-value=\"api_name\" cx-prop-icon-class=\"dropdown\" cx-prop-maxsearch=\"10\" cx-prop-limit=\"50\" cx-prop-searchplaceholder=\"search\" cx-prop-option-zcqa=\"value in cxPropSystemValue\" cx-prop-box-button-width=\"min-button\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-remove-multiple=\"true\" cx-prop-placeholder=\"Select Field\" on-option-select=\"{{method('onOptionSelect','field')}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{cxPropOperatorDropdown}}\"><template case=\"true\"> <crux-dropdown class=\"cxFrmlaEdtrTopPanelDropdown\" cx-prop-options=\"{{cxPropOperatorDropdownOptions}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"value\" cx-prop-icon-class=\"dropdown\" cx-prop-maxsearch=\"10\" cx-prop-limit=\"50\" cx-prop-searchplaceholder=\"search\" cx-prop-option-zcqa=\"value in cxPropSystemValue\" cx-prop-box-button-width=\"min-button\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-remove-multiple=\"true\" cx-prop-placeholder=\"Select Operator\" on-option-select=\"{{method('onOptionSelect','operator')}}\"></crux-dropdown> </template></template> </template></template> </div></template></template> <template is=\"if\" value=\"{{cxPropOnlyOperator}}\"><template case=\"true\"> <div class=\"cxFrmlaPropWrapper\"> <span class=\"cxFrmlaOperatorsHeading\">Operators</span> <div class=\"cxFrmlaOperatorsContainer\"> <div class=\"cxFrmlaOperatorsWrapper\"> <template is=\"for\" items=\"{{cxPropOperatorIcons}}\" item=\"item\" index=\"index\"> <span class=\"cxFrmlaPropIcon\" onclick=\"{{action('selectOperator',item.operator)}}\"><span class=\"{{item.icon}} cxFrmlaPropIconSpan\"></span></span> </template> </div> <template is=\"if\" value=\"{{cxPropOperatorPresent}}\"><template case=\"true\"> <span class=\"cxFrmlaOperMoreIcon cxFlexCenter cxFlexShrink0\"><span class=\"cxArrowDownLineIcon\"></span></span> </template></template> </div> </div> </template></template> <template is=\"if\" value=\"{{cxPropCheckSyntaxBtn}}\"><template case=\"true\"> <div class=\"cxFrmlaEdtrRunBtn\" onclick=\"{{action('runDisplayedFormula')}}\"> <span class=\"cxFrmlaRunIcon cxFlexShrink0\"></span> <lyte-text lt-prop-value=\"Check syntax\"></lyte-text> </div> </template></template> </div> </template> </lyte-editor> <template is=\"if\" value=\"{{cxPropFormulaReturnTypeDrops}}\"><template case=\"true\"> <lyte-yield yield-name=\"formulaProceedRun\"> <div class=\"cxFrmlaEdtrHeader cxFlex cxAlignItemCenter\"> <div class=\"cxFrmlaEdtrHeaderDropdowns\"> <span class=\"cxFrmlaEdtrHeaderDropWrap\"> <lyte-text class=\"cxFrmlaEdtrDDLabel\" lt-prop-value=\"Formula Return Type\"></lyte-text> <crux-dropdown class=\"cxFrmlaEdtrTopPanelDropdown cxPropFrmlaEdtrTypeDrop\" cx-prop-options=\"{{cxPropFormulaReturnType}}\" cx-prop-selected=\"{{cxPropFormulaReturnValue}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"value\" cx-prop-icon-class=\"dropdown\" cx-prop-option-zcqa=\"value in cxPropSystemValue\" cx-prop-box-button-width=\"min-button\" cx-prop-position=\"down\" cx-prop-remove-multiple=\"true\" cx-prop-placeholder=\"Formula Return Type\" on-option-select=\"{{method('selectFrmlaType',this)}}\"></crux-dropdown> </span> <template is=\"if\" value=\"{{cxPropFormulaDropsIsNumber}}\"><template case=\"true\"> <span class=\"cxFrmlaEdtrHeaderDropWrap\"> <lyte-text class=\"cxFrmlaEdtrDDLabel\" lt-prop-value=\"Decimal Places\"></lyte-text> <crux-dropdown class=\"cxFrmlaEdtrTopPanelDropdown cxPropFrmlaEdtrNumDrop\" cx-prop-options=\"{{cxPropNumberOfDecimalPlaces}}\" cx-prop-selected=\"{{cxPropDecimalPlacesValue}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"value\" cx-prop-icon-class=\"dropdown\" cx-prop-option-zcqa=\"value in cxPropSystemValue\" cx-prop-box-button-width=\"min-button\" cx-prop-position=\"down\" cx-prop-remove-multiple=\"true\" cx-prop-placeholder=\"Decimal Places\" on-option-select=\"{{method('selectFrmlaType',this)}}\"></crux-dropdown> </span> </template></template> </div> </div> </lyte-yield> </template></template> <template is=\"if\" value=\"{{cxPropFooterContainer}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropFooterTabs}}\"><template case=\"true\"> <lyte-yield yield-name=\"formulaRunDisplay\" class=\"cxForlaEdtrResTabYield\"> <lyte-tabs lt-prop-height=\"100%\" class=\"cxOuterTab cxFrmlaEdtrResultContainer\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head> <lyte-tab-title class=\"cxFrmlaEdtrResultTitle\" lt-prop-id=\"formulaHelp\"> Help </lyte-tab-title> <lyte-tab-title class=\"cxFrmlaEdtrResultTitle\" lt-prop-id=\"formulaResult\"> Result </lyte-tab-title> </lyte-tab-head> <lyte-tab-body> <lyte-tab-content id=\"formulaHelp\"> <div class=\"cxFrmlaEdtrResultContentContainer {{if(expHandlers(cxPropFrmlaHelpText,'!'),'cxFrmlaEdtrNoErrorContainer','')}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropFrmlaHelpText,'!')}}\"><template case=\"true\"> <span class=\"cxFrmlaNoResText\">No Result Found</span> </template></template> <span class=\"cxFrmlaHelpContent\"></span> </div> </lyte-tab-content> <lyte-tab-content id=\"formulaResult\"> <div class=\"cxFrmlaEdtrResultContentContainer {{if(cxPropNoError,'cxFrmlaEdtrNoErrorContainer','')}}\"> <template is=\"if\" value=\"{{cxPropNoError}}\"><template case=\"true\"> <span class=\"cxFrmlaNoResText\">No Results Found</span> </template><template case=\"false\"> <template is=\"for\" items=\"{{cxPropErrorsMessage}}\" item=\"item\" index=\"index\"> <span class=\"cxFrmlaEdtrResultContent\"> <span class=\"cxFrmlaEdtrWarningIcon\"></span> {{unescape(item)}} </span> </template> </template></template> </div> </lyte-tab-content> </lyte-tab-body> </template> </lyte-tabs> </lyte-yield> </template><template case=\"false\"> <div class=\"cxFrmlaEdtrResultContainer cxFlex cxFlexDC\"> <div class=\"cxFrmlaEdtrResultTitleContainer\"> <span class=\"cxFrmlaEdtrResultTitle\">Result</span> </div> <div class=\"cxFrmlaEdtrResultContentContainer {{if(cxPropNoError,'cxFrmlaEdtrNoErrorContainer','')}}\"> <template is=\"if\" value=\"{{cxPropNoError}}\"><template case=\"true\"> <span class=\"cxFrmlaNoResText\">No Result Found</span> </template><template case=\"false\"> <template is=\"for\" items=\"{{cxPropErrorsMessage}}\" item=\"item\" index=\"index\"> <span class=\"cxFrmlaEdtrResultContent\"> <span class=\"cxFrmlaEdtrWarningIcon\"></span> {{unescape(item)}} </span> </template> </template></template> </div> </div> </template></template> </template></template> </div> <div class=\"cxFrmlaEdtrResCont\"> </div> </div> <template is=\"if\" value=\"{{cxPropErrorMessage}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> <lyte-hovercard class=\"cxFrmlaEdtrHovercard\" lt-prop-placement=\"bottomLeft\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" on-hovercard-hide=\"{{method('hideMyHintPop',this)}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <div class=\"cxFrmlaPopContent\"></div> </lyte-hovercard-content> </template> </lyte-hovercard> <template is=\"if\" value=\"{{cxPropOperatorPresent}}\"><template case=\"true\"> <lyte-menu lt-prop-freeze=\"false\" lt-prop-yield=\"true\" class=\"{{cxPropMenuClass}}\" lt-prop-query=\".cxFrmlaOperMoreIcon\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <div class=\"cxFrmlaOperatorsMenuWrap\"> <template is=\"for\" items=\"{{cxPropOperatorIcons}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxFrmlaOperatorMenuItem\" onclick=\"{{action('selectOperator',item.operator)}}\"> <lyte-menu-label> <div class=\"cxFrmlaOperatorsMenuListWrap\"> <span class=\"{{item.icon}} cxFrmlaPropIconSpan\"></span> <span>{{item.label}}</span> </div> </lyte-menu-label> </lyte-menu-item> </template> </div> </lyte-menu-body> </template> </lyte-menu> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":["cxPropWidth",{"type":"helper","value":{"name":"concat","args":["'width: '","cxPropWidth"]}},"''"]}},"'; '",{"type":"helper","value":{"name":"if","args":["cxPropHeight",{"type":"helper","value":{"name":"concat","args":["'height: '","cxPropHeight"]}},"''"]}}]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1,1]},{"type":"registerYield","position":[3,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"forIn","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"attr","position":[1,3]}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3,3,1]},{"type":"registerYield","position":[3,3,3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,3]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3,3]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,0]}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1,1,1,1]},{"type":"attr","position":[1,1,1,1,3]},{"type":"componentDynamic","position":[1,1,1,1,3]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,1]},{"type":"if","position":[3,1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3,1]},{"type":"attr","position":[3,3,1,1]},{"type":"if","position":[3,3,1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,3]}]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,3]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"text","position":[1,1,1,3,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropBasePath","cxPropCustomCssPath","cxPropLanguage","cxPropRenderInShadowRoot","cxPropOptions","cxPropOperators","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropField","cxPropErrorClass","cxPropErrorSpanClass","cxPropAriaErrorProperties","cxPropErrorMessage","cxPropFooterTabs","cxPropFooterContainer","cxPropLeftPanel","cxPropCheckSyntaxBtn","cxPropFrmlaHelpText","cxPropFormulaTitleYield","cxPropFunctionDropdown","cxPropFormulaReturnTypeDrops","cxPropOnlyPicklist","cxPropOnlyOperator","cxPropValue","cxPropFormulaReturnValue","cxPropFormulaReturnType","cxPropDecimalPlacesValue","cxPropNumberOfDecimalPlaces","cxPropFunctionDropdownOptions","cxPropOperatorDropdown","cxPropOperatorDropdownOptions","cxPropFieldDropdown","cxPropFieldDropdownOptions","cxPropAdvancedInput","isWidgetOpen","cxPropWidgetData","selectedFunction","cxPropNoError","cxPropErrorsMessage","cxPropFields","suggestionList","cxPropOperatorIcons","cxPropOperatorPresent","cxPropInsertName","cxPropInsertValue","cxPropFormulaDropsIsNumber","cxPropLyteEditorOptions","cxPropFormulaMaxLength","cxPropWidth","cxPropHeight","cxPropTheme"],
_observedAttributesType :["string","string","string","boolean","object","string","boolean","string","string","object","string","string","object","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","string","string","array","string","array","array","boolean","array","boolean","array","boolean","boolean","array","string","boolean","array","object","array","array","boolean","string","string","boolean","object","number","string","string","string"],

	data : function(){
		return {
			/* Data's for editor in lyte editor */
			cxPropBasePath :  Lyte.attr('string', { default : '/dist/addons/@zoho/lyte-editor/dist' } ),
			cxPropCustomCssPath : Lyte.attr('string', {default : '/dist/addons/@zohocrm/crux-components/dist/theme/compiledCSS/default/ltr/crux-formula-editor.css'}),
			cxPropLanguage: Lyte.attr('string', { default : 'plainText' }),
			// theme: Lyte.attr('string', {default : 'formula-theme'}),
			cxPropRenderInShadowRoot : Lyte.attr('boolean', {default : true}),
			cxPropOptions : Lyte.attr('object', {default : {
				scrollBeyondLastLine : false,
				wordWrap : true,
				contextmenu : false,
				minimap : {
					enabled : false
				}
			},watch : true}),
			cxPropOperators: Lyte.attr('string', {default: ">, <, >=, <="}), // No I18n
			// ERROR CASE
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No I18n
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			cxPropFooterTabs: Lyte.attr("boolean", {default : false}),
			cxPropFooterContainer: Lyte.attr("boolean", {default : true}),
			//ERROR CASE

			//LEFT PANEL DATA'S
			cxPropLeftPanel: Lyte.attr('boolean', {default: true}),
			
			/* Data's for toolbar in lyte editor  */
			cxPropCheckSyntaxBtn: Lyte.attr('boolean', {default: true}),
			cxPropFrmlaHelpText: Lyte.attr('boolean', {default: false}),
			// cxPropFrmlaResultText: Lyte.attr('string', {default: ""}), // Use cxPropErrorMessage to pass value
			cxPropFormulaTitleYield: Lyte.attr('boolean', {default: false}),
			cxPropFunctionDropdown: Lyte.attr('boolean', {default: true}),
			cxPropFormulaReturnTypeDrops: Lyte.attr('boolean', {default: false}),
			cxPropOnlyPicklist: Lyte.attr('boolean', {default: true}),
			cxPropOnlyOperator: Lyte.attr('boolean', {default: false}),
			// cxPropFieldsLabel: Lyte.attr('string', {default: ""}), // No I18n
			cxPropValue: Lyte.attr('string', {default: ""}), // No I18n
			cxPropFormulaReturnValue: Lyte.attr('string', {default: "Decimal"}), // No I18n
			cxPropFormulaReturnType: Lyte.attr('array', {default: 
				[
					{
						"name": "Decimal",
						"value": "Decimal"
					},
					{
						"name": "Currency",
						"value": "Currency"
					},
					{
						"name": "String",
						"value": "String"
					},
					{
						"name": "Date",
						"value": "Date"
					},
					{
						"name": "DateTime",
						"value": "DateTime"
					},
					{
						"name": "Boolean",
						"value": "Boolean"
					}
				]
			}),
			cxPropDecimalPlacesValue: Lyte.attr('string', {default: "2"}), // No I18n
			cxPropNumberOfDecimalPlaces: Lyte.attr('array', {default: 
				[
					{
						"name": "0",
						"value": 0
					},
					{
						"name": "1",
						"value": 1
					},
					{
						"name": "2",
						"value": 2
					},
					{
						"name": "3",
						"value": 3
					},
					{
						"name": "4",
						"value": 4
					},
					{
						"name": "5",
						"value": 5
					},
					{
						"name": "6",
						"value": 6
					},
					{
						"name": "7",
						"value": 7
					},
					{
						"name": "8",
						"value": 8
					},
					{
						"name": "9",
						"value": 9
					}
				]
			}),
			cxPropFunctionDropdownOptions: Lyte.attr('array', {default: 
				[
					{
						"Date Time Functions": [
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
								"value": "Timepart(date-time"
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
								"value": "DateBetween(date-time, date-time, date-time)"
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
								"name": "Dayofweek",
								"value": "Dayofweek(date-time)"
							}
						]
					},
					{
						"Numeric Functions": [
							{
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
								"name": "Tonumber",
								"value": "Tonumber(string)"
							},
							{
								"name": "IsPositive",
								"value": "IsPositive(number)"
							},
							{
								"name": "IsNegative",
								"value": "IsNegative(number)"
							},
							{
								"name": "isEmpty",
								"value": "isEmpty(string)"
							}
						]
					},
					{
						"String Functions": [
							{
								"name": "Len",
								"value": "Len(string)"
							},
							{
								"name": "Find",
								"value": "Find(string, search string, number)"
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
								"value": "Tostring(string)"
							},
							{
								"name": "Replace",
								"value": "Replace(string, search string, replacement string)"
							},
							{
								"name": "isEmpty",
								"value": "isEmpty(string)"
							}
						]
					},
					{
						"Boolean Functions": [
							{
								"name": "If",
								"value": "If(boolean, generic, generic)"
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
								"name": "isEmpty",
								"value": "isEmpty(string)"
							}
						]
					}
				]
			}),
			cxPropOperatorDropdown: Lyte.attr('boolean', {default: true}),
			cxPropOperatorDropdownOptions: Lyte.attr('array', {default: 
				[
					{
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
					}
				]
			}),
			cxPropFieldDropdown: Lyte.attr('boolean', {default: true}),
			cxPropFieldDropdownOptions: Lyte.attr('array', {default: 
				[
					{
						'field_label':'Company',
						'api_name':'Company'
					},
					{
						'field_label':'Lead Owner',
						'api_name':'LeadOwner'
					},
					{
						'field_label':'Last Name',
						'api_name':'LastName'
					},
					{
						'field_label':'First Name',
						'api_name':'FirstName'
					},
					{
						'field_label':'Email',
						'api_name':'Email'
					},
					{
						'field_label':'Pick List 1',
						'api_name':'PickList1'
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
						'api_name':'LeadStatus'
					},
					{
						'field_label':'Mobile',
						'api_name':'Mobile'
					},
					{
						'field_label':'No. of Employees',
						'api_name':'NoOfEmployees'
					},
					{
						'field_label':'Lead Source',
						'api_name':'LeadSource'
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
						'api_name':'CreatedTime'
					},
					{
						'field_label':'Modified Time',
						'api_name':'ModifiedTime'
					},
					{
						'field_label':'Salutation',
						'api_name':'Salutation'
					},
					{
						'field_label':'Last Activity Time',
						'api_name':'LastActivityTime'
					},
					{
						'field_label':'Annual Revenue',
						'api_name':'AnnualRevenue'
					},
					{
						'field_label':'Skype ID',
						'api_name':'SkypeID'
					},
					{
						'field_label':'Email Opt Out',
						'api_name':'EmailOptOut'
					},
					{
						'field_label':'Secondary Email',
						'api_name':'SecondaryEmail'
					},
					{
						'field_label':'Modified By',
						'api_name':'ModifiedBy'
					},
					{
						'field_label':'Twitter',
						'api_name':'Twitter'
					},
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
						'api_name':'ZipCode'
					},
					{
						'field_label':'Country',
						'api_name':'Country'
					},
					{
						'field_label':'Description',
						'api_name':'Description'
					}
				]
			}),

			/* widget data's */
			cxPropAdvancedInput : Lyte.attr('boolean', {default : false}),
			isWidgetOpen : Lyte.attr('boolean', {default : false}),
			cxPropWidgetData : Lyte.attr('array', {default : [
					{
						"key": "abs",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc1"),
						"Example": [
							{formula: "Abs(-42)", result: '42', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Abs(+33)", result: '33', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "ceil",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc2"),
						"Example": [
							{formula: 'Ceil(3.4)', result: '4', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: 'Ceil(-3.4)', result: '-3', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "floor",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc3"),
						"Example": [
							{formula: 'Floor(3.8)', result: '3', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: 'Floor(-3.4)', result: '-4', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "naturallog",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc4"),
						"Example": [
							{formula: 'Naturallog(1)', result: '0.69', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "base10log",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc5"),
						"Example": [
							{formula: 'Base10log(10)', result: '1.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "max",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc38"),
							_cruxUtils.getI18n("crm.formula.desc38")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc6"),
						"Example": [
							{formula: 'Max(3,1,5,2)', result: '5', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: 'Max(0,-4,-3,2)', result: '2', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "min",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc38"),
							_cruxUtils.getI18n("crm.formula.desc38")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc7"),
						"Example": [
							{formula: 'Min(5,-3,0,1', result: '-3', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: 'Min(5,0,.01,0.5)', result: '0.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "sqrt",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.desc8"),
						"Example": [
							{formula: 'Sqrt(4)', result: '2', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: 'Sqrt(9)', result: '3', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "if",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc41"),
							_cruxUtils.getI18n("crm.formula.desc43"),
							_cruxUtils.getI18n("crm.formula.desc43")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc9"),
						"Example": [
							{formula: "If(8>7,1,0)", result: '1.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "If(8>7,'True','False')", result: 'True', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "len",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc39")],
						"description": _cruxUtils.getI18n("crm.formula.desc10"),
						"Example": [
							{formula: "Len('abc')", result: '3', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Len('zoho')", result: '4', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "find",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc42"),
							_cruxUtils.getI18n("crm.formula.desc38")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc11"),
						"Example": [
							{formula: "Find('greenery','n',1)", result: '5', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "dayofmonth",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc12"),
						"Example": [
							{formula: "Dayofmonth(Newdate(2009,05,19,11,30,'AM'))", result: '19.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "hour",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc13"),
						"Example": [
							{formula: "Hour(Newdate(2009,05,19,11,30,'AM'))", result: '11.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "minute",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc14"),
						"Example": [
							{formula: "Minute(Newdate(2009,05,19,11,30,'AM'))", result: '30.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "month",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc15"),
						"Example": [
							{formula: "Month(Newdate(2009,05,19,11,30,'AM'))", result: '5.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "year",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc16"),
						"Example": [
							{formula: "Year(Newdate(2009,05,19,11,30,'AM'))", result: '2009.0', I18n: '_cruxUtils.getI18n("crm.formula.desc50")'}
						]
					},
					{
						"key": "weekday",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc17"),
						"Example": [
							{formula: "Weekday(Newdate(2009,05,19,11,30,'AM'))", result: '3.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "and",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc41"),
							_cruxUtils.getI18n("crm.formula.desc41")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc18"),
						"Example": [
							{formula: "And(2>1,5>3,7<8)", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "And(2>1,5>3,7>8)", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "or",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc41"),
							_cruxUtils.getI18n("crm.formula.desc41")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc19"),
						"Example": [
							{formula: "Or(2>1,3>5,7>8)", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Or(1>2,3>5,7>8)", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "not",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc41")],
						"description": _cruxUtils.getI18n("crm.formula.desc20"),
						"Example": [
							{formula: "Not(false)", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Not(true)", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "concat",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc39")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc21"),
						"Example": [
							{formula: "Concat('Zoho',' ','CRM')", result: 'Zoho CRM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "contains",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc42")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc22"),
						"Example": [
							{formula: "Contains('abcdef','cd')", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Contains('abcdef','kl')", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "startswith",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc42")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc23"),
						"Example": [
							{formula: "Startswith('abcdef','cd')", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Startswith('abcdef','ab')", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "endswith",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc42")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc24"),
						"Example": [
							{formula: "Endswith('abcdef','ab')", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Endswith('abcdef','ef')", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "lower",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc39")],
						"description": _cruxUtils.getI18n("crm.formula.desc25"),
						"Example": [
							{formula: "Lower('APPLES')", result: 'apples', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Lower('Apples')", result: 'apples', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "upper",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc39")],
						"description": _cruxUtils.getI18n("crm.formula.desc26"),
						"Example": [
							{formula: "Upper('apples')", result: 'APPLES', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Upper('APPles')", result: 'APPLES', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "trim",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc39")],
						"description": _cruxUtils.getI18n("crm.formula.desc27"),
						"Example": [
							{formula: "Trim('abcd')", result: 'abcd', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "substring",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc38"),
							_cruxUtils.getI18n("crm.formula.desc38")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc28"),
						"Example": [
							{formula: "Substring('abcdefg',4,7)", result: 'defg', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "tostring",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc43")],
						"description": _cruxUtils.getI18n("crm.formula.desc29"),
						"Example": [
							{formula: "Tostring(3.4)", result: '3.4', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "replace",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc42"),
							_cruxUtils.getI18n("crm.formula.desc44")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc30"),
						"Example": [
							{formula: "Replace('abcdefg','abc','xyz')", result: 'xyzdefg', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "newdate",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc45")],
						"description": _cruxUtils.getI18n("crm.formula.desc31"),
						"Example": [
							{formula: "Newdate(2007,12,21,06,30,'AM')", result: '21/12/2007 06:30 AM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "datepart",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc32"),
						"Example": [
							{formula: "Datepart(Newdate(2007,12,21,06,30,'AM'))", result: '21/12/2007', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "timepart",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.desc33"),
						"Example": [
							{formula: "Timepart(Newdate(2007,12,21,06,30,'AM'))", result: '06.30 AM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "adddate",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc40"),
							_cruxUtils.getI18n("crm.formula.desc38"),
							_cruxUtils.getI18n("crm.formula.desc39")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc34"),
						"Example": [
							{formula: "Adddate(Newdate(2007,12,21,06,30,'AM'),2,'YEAR')", result: '21/12/2009 06:30 AM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "subdate",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc40"),
							_cruxUtils.getI18n("crm.formula.desc38"),
							_cruxUtils.getI18n("crm.formula.desc39")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc35"),
						"Example": [
							{formula: "Subdate(Newdate(2007,12,21,06,30,'AM'),2,'YEAR')", result: '21/12/2005 06:30 AM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "now",
						"parameters": "",
						"description": _cruxUtils.getI18n("crm.formula.desc36"),
						"Example": [
							{formula: "Now()", result: '', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "datecomp",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc40"),
							_cruxUtils.getI18n("crm.formula.desc40")
						],
						"description": _cruxUtils.getI18n("crm.formula.desc37"),
						"Example": [
							{formula: "Datecomp(Newdate(2009,05,19,11,30,'AM'),Newdate(2009,05,19,12,30,'AM'))", result: '660.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "tonumber",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc43")],
						"description": _cruxUtils.getI18n("crm.formula.tonumberdesc"),
						"Example": [
							{formula: "Tonumber('1000')", result: '1000', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "datebetween",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc40"),
							_cruxUtils.getI18n("crm.formula.desc40"),
							_cruxUtils.getI18n("crm.formula.desc39")
						],
						"description": _cruxUtils.getI18n("crm.formula.datebetweendesc"),
						"Example": [
							{formula: "DateBetween(Newdate(2007,12,21,06,30,'AM'),Newdate(2009,05,19,11,30,'AM'),'YEAR')", result: '1.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "fromtimestamp",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.fromtimestampdesc"),
						"Example": [
							{formula: "FromTimestamp(1672531200000)", result: '01/01/2023 12:00 AM', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "timestamp",
						"parameters": "",
						"description": _cruxUtils.getI18n("crm.formula.timestampdesc"),
						"Example": [
							{formula: "Timestamp()", result: '', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "dayofweek",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc40")],
						"description": _cruxUtils.getI18n("crm.formula.dayofweekdesc"),
						"Example": [
							{formula: "Dayofweek(Newdate(2009,05,19,11,30,'AM'))", result: '3.0', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "round",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.rounddesc"),
						"Example": [
							{formula: "Round(3.7)", result: '4', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "Round(3.4)", result: '3', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "ispositive",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.ispositivedesc"),
						"Example": [
							{formula: "IsPositive(5)", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "IsPositive(-3)", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "isnegative",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc38")],
						"description": _cruxUtils.getI18n("crm.formula.isnegativedesc"),
						"Example": [
							{formula: "IsNegative(-5)", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "IsNegative(3)", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "isempty",
						"parameters": [_cruxUtils.getI18n("crm.formula.desc39")],
						"description": _cruxUtils.getI18n("crm.formula.isemptydesc"),
						"Example": [
							{formula: "isEmpty('')", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "isEmpty('hello')", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					},
					{
						"key": "caseinsensitiveequals",
						"parameters": [
							_cruxUtils.getI18n("crm.formula.desc39"),
							_cruxUtils.getI18n("crm.formula.desc39")
						],
						"description": _cruxUtils.getI18n("crm.formula.caseinsensitiveequalsdesc"),
						"Example": [
							{formula: "CaseInsensitiveEquals('Hello','hello')", result: 'true', I18n: _cruxUtils.getI18n("crm.formula.desc50")},
							{formula: "CaseInsensitiveEquals('Hello','World')", result: 'false', I18n: _cruxUtils.getI18n("crm.formula.desc50")}
						]
					}
				]
			}),
			selectedFunction: Lyte.attr('string', {default: 'IF'}),
			cxPropNoError : Lyte.attr('boolean', {default : false}),
			cxPropErrorsMessage : Lyte.attr('array', {default : []}),
			// cxPropErrorsArray : Lyte.attr('array', {default : ['A Lead.Column is not a number or expression CEILING function allows only number argument', "')' is not closed Either remove or use a appropriate open brace"]}),
			cxPropFields : Lyte.attr('object', {default : {}}),
			// cxPropErrorLine : Lyte.attr('array', {default : [
			// 	{
			// 		startLineNumber : 1,
			// 		endLineNumber:1,
			// 		startColumn:2,
			// 		endColumn:5,
			// 		message:"A Lead.Column is not a number or expression CEILING function allows only number argument",
			// 		severity:8
			// 	}
			// ]}),
			suggestionList : Lyte.attr('array', {default : [
				{
					label: '>',
					kind: 11,
					insertText : '>'
				},{
					label: '>=',
					kind: 11,
					insertText : '>='
				},{
					label: '<',
					kind: 11,
					insertText : '<'
				},{
					label: '<>',
					kind: 11,
					insertText : '<>'
				},{
					label: '!=',
					kind: 11,
					insertText : '!='
				},{
					label: '<=',
					kind: 11,
					insertText : '<='
				},{
					label: '<=>',
					kind: 11,
					insertText : '<=>'
				},{
					label: '=',
					kind: 11,
					insertText : '='
				},{
					label: 'BETWEEN',
					insertText : 'BETWEEN'
				},{
					label: 'AND',
					insertText : 'AND'
				},{
					label: 'IS',
					insertText : 'IS'
				}, {
					label: 'NOT',
					insertText : 'NOT'
				},{
					label: 'NULL',
					insertText : 'NULL'
				}, {
					label: 'LIKE',
					insertText : 'LIKE'
				},{
					label: 'COALESCE',
					kind: 1,
					insertText : 'COALESCE()'
				},{
					label: 'GREATEST',
					kind: 1,
					insertText : 'GREATEST()'
				},{
					label: 'INTERVAL',
					kind: 1,
					insertText : 'INTERVAL()'
				},{
					label: 'IN',
					kind: 1,
					insertText : 'IN()'
				},{
					label: 'ISNULL',
					kind: 1,
					insertText : 'ISNULL()'
				},{
					label: 'LEAST',
					kind: 1,
					insertText : 'LEAST()'
				},{
					label: 'STRCMP',
					kind: 1,
					insertText : 'STRCMP()'
				},{
					label: 'Abs',
					kind: 1,
					insertText : 'Abs(${1:number})'
				},{
					label: 'Ceil',
					kind: 1,
					insertText : 'Ceil(${1:number})'
				},{
					label: 'Floor',
					kind: 1,
					insertText : 'Floor(${1:number})'
				},{
					label: 'Naturallog',
					kind: 1,
					insertText : 'Naturallog(${1:number})'
				},{
					label: 'Base10log',
					kind: 1,
					insertText : 'Base10log(${1:number})'
				},{
					label: 'Max',
					kind: 1,
					insertText : 'Max(${1:number}, ${2:number})'
				},{
					label: 'Min',
					kind: 1,
					insertText : 'Min(${1:number}, ${2:number})'
				},{
					label: 'Sqrt',
					kind: 1,
					insertText : 'Sqrt(${1:number})'
				},{
					label: 'If',
					kind: 1,
					insertText : 'If(${1:boolean}, ${2:generic}, ${3:generic})'
				},{
					label: 'Len',
					kind: 1,
					insertText : 'Len(${1:string})'
				},{
					label: 'Find',
					kind: 1,
					insertText : 'Find(${1:string}, ${2:search string}, ${3:number})'
				},{
					label: 'Dayofmonth',
					kind: 1,
					insertText : 'Dayofmonth(${1:date-time})'
				},{
					label: 'Hour',
					kind: 1,
					insertText : 'Hour(${1:date-time})'
				},{
					label: 'Minute',
					kind: 1,
					insertText : 'Minute(${1:date-time})'
				},{
					label: 'Month',
					kind: 1,
					insertText : 'Month(${1:date-time})'
				},{
					label: 'Year',
					kind: 1,
					insertText : 'Year(${1:date-time})'
				},{
					label: 'Weekday',
					kind: 1,
					insertText : 'Weekday(${1:date-time})'
				},{
					label: 'And',
					kind: 1,
					insertText : 'And(${1:boolean}, ${2:boolean})'
				},{
					label: 'Or',
					kind: 1,
					insertText : 'Or(${1:boolean}, ${2:boolean})'
				},{
					label: 'Not',
					kind: 1,
					insertText : 'Not(${1:boolean})'
				},{
					label: 'Concat',
					kind: 1,
					insertText : 'Concat(${1:string}, ${2:string})'
				},{
					label: 'Contains',
					kind: 1,
					insertText : 'Contains(${1:string}, ${2:string})'
				},{
					label: 'Startswith',
					kind: 1,
					insertText : 'Startswith(${1:string}, ${2:string})'
				},{
					label: 'Endswith',
					kind: 1,
					insertText : 'Endswith(${1:string}, ${2:string})'
				},{
					label: 'Lower',
					kind: 1,
					insertText : 'Lower(${1:string})'
				},{
					label: 'Upper',
					kind: 1,
					insertText : 'Upper(${1:string})'
				},{
					label: 'Trim',
					kind: 1,
					insertText : 'Trim(${1:string})'
				},{
					label: 'Substring',
					kind: 1,
					insertText : 'Substring(${1:string}, ${2:number}, ${3:number})'
				},{
					label: 'Tostring',
					kind: 1,
					insertText : 'Tostring(${1:generic})'
				},{
					label: 'Replace',
					kind: 1,
					insertText : 'Replace(${1:string}, ${2:string}, ${3:string})'
				},{
					label: 'IsEmpty',
					kind: 1,
					insertText : 'IsEmpty(${1:string})'
				},{
					label: 'Newdate',
					kind: 1,
					insertText : 'Newdate(${1:number}, ${2:number}, ${3:number}, ${4:number}, ${5:number}, ${6:string})'
				},{
					label: 'Datepart',
					kind: 1,
					insertText : 'Datepart(${1:date-time})'
				},{
					label: 'Timepart',
					kind: 1,
					insertText : 'Timepart(${1:date-time})'
				},{
					label: 'Adddate',
					kind: 1,
					insertText : 'Adddate(${1:date-time}, ${2:number}, ${3:string})'
				},{
					label: 'Subdate',
					kind: 1,
					insertText : 'Subdate(${1:date-time}, ${2:number}, ${3:string})'
				},{
					label: 'Now',
					kind: 1,
					insertText : 'Now()'
				},{
					label: 'Datecomp',
					kind: 1,
					insertText : 'Datecomp(${1:date-time}, ${2:date-time})'
				},{
					label: 'Tonumber',
					kind: 1,
					insertText : 'Tonumber(${1:generic})'
				}
			]}),
			cxPropOperatorIcons: Lyte.attr('array', {default : 
				[
					{operator : '+', icon : 'cxFrmlaPlusIcon', label : 'Add'},
					{operator : '-', icon : 'cxFrmlaMinusIcon', label : 'Subtract'},
					{operator : '/', icon : 'cxFrmlaSlashIcon', label : 'Divide'},
					{operator : '%', icon : 'cxFrmlaPercentageIcon', label : 'Percentage'},
					{operator : '*', icon : 'cxFrmlaStarIcon', label : 'Multiply'},
					{operator : '^', icon : 'cxFrmlaUpArrowIcon', label : 'Power'},
					{operator : '(', icon : 'cxFrmlaOpenBracketIcon', label : 'Open Bracket'},
					{operator : ')', icon : 'cxFrmlaCloseBracketIcon', label : 'Close Bracket'},
					{operator : '!=', icon : 'cxFrmlaNotEqualIcon', label : 'Not Equal'},
					{operator : '==', icon : 'cxFrmlaDoubleEqualIcon', label : 'Equal'},
					{operator : '>', icon : 'cxFrmlaGreaterThanIcon', label : 'Greater Than'},
					{operator : '<', icon : 'cxFrmlaLessThanIcon', label : 'Less Than'},
				]
			}),
			cxPropOperatorPresent: Lyte.attr('boolean', {default: true}),
			cxPropInsertName: Lyte.attr('string', {default: ''}),
			cxPropInsertValue: Lyte.attr('string', {default: ''}),
			cxPropFormulaDropsIsNumber: Lyte.attr('boolean', {default: true}),
			cxPropLyteEditorOptions: Lyte.attr('object', {default :{} }),
			cxPropFormulaMaxLength: Lyte.attr('number', {default: 50000}),
			cxPropWidth: Lyte.attr('string', {default: ''}),
			cxPropHeight: Lyte.attr('string', {default: ''}),
			cxPropTheme: Lyte.attr('string', {default: 'light' }),
		};
	},
	init:function(){
		this.$node.updateEditorLayout = function() {
			return this.querySelector('lyte-editor').updateEditorLayout();
		}
		const defaultEditorOptions = {
			suggest: {
				snippetsPreventQuickSuggestions: false
			},
			lineNumbers: "off",
			lineNumbersMinChars: 2,
			minimap: {
				enabled: false
			},
			maxTokenizationLineLength : 70000,
			stopRenderingLineAfter : -1,
			fontFamily: "var(--crux-formula-editor-font-family)",
			padding:{
				top: 10,
				bottom: 10
			}
			// overviewRulerLanes : 0,
			// scrollbar : {
			// 	vertical : 'hidden',
			// 	horizontal : 'hidden',
			// 	handleMouseWheel : false
			// },
		}
		this.setData("cxPropLyteEditorOptions", {...defaultEditorOptions,...this.data.cxPropLyteEditorOptions});
	},
	didConnect : function(){
		this.lyteEditor = this.$node.querySelector('lyte-editor');
		const rootElementStyle = getComputedStyle(document.querySelector(':root'));

		/* Updating language and theme */
		this.setData("cxPropLanguage", "formula");
		Lyte.Editor.DefineTheme('formula-theme',{
			base: 'vs',
			inherit : true,
			rules: [
				{ token: 'myFunction', foreground: '006699' }, // BLUE
    			{ token: 'myParam', foreground: 'ff66ff' }, // PINK
				{ token: 'myField', foreground: '6bb300ff' }, // Green
				{ token: 'paren1', foreground: 'FFD700' },
				{ token: 'paren2', foreground: '12AA67' },
				{ token: 'paren3', foreground: 'F18E0A' },
				{ token: 'paren4', foreground: 'C35BF4' },
				{ token: 'paren5', foreground: '8C71FB' },
				{ token: 'paren6', foreground: '24CBB7' },
				{ token: 'paren7', foreground: 'AECC48' },
				{ token: 'paren8', foreground: 'B28B59' },
				{ token: 'paren9', foreground: 'F564BB' },
				{ token: 'paren10', foreground: '226DB4' }
			],
			colors: {
				"editor.background": rootElementStyle.getPropertyValue('--crux-formula-editor-bg-color'),
				"editor.lineHighlightBackground": rootElementStyle.getPropertyValue('--crux-formula-editor-line-highlight-bg-color'),
    			"editor.lineHighlightBorder": rootElementStyle.getPropertyValue('--crux-formula-editor-line-highlight-bg-color')
			}
		});
		Lyte.Editor.DefineTheme('formula-theme-dark',{
			base: 'vs-dark',
			inherit : true,
			rules: [
				{ token: 'myFunction', foreground: '006699' }, // BLUE
    			{ token: 'myParam', foreground: 'ff66ff' }, // PINK
				{ token: 'myField', foreground: '6bb300ff' }, // Green
				{ token: 'paren1', foreground: 'FFD700' },
				{ token: 'paren2', foreground: '12AA67' },
				{ token: 'paren3', foreground: 'F18E0A' },
				{ token: 'paren4', foreground: 'C35BF4' },
				{ token: 'paren5', foreground: '8C71FB' },
				{ token: 'paren6', foreground: '24CBB7' },
				{ token: 'paren7', foreground: 'AECC48' },
				{ token: 'paren8', foreground: 'B28B59' },
				{ token: 'paren9', foreground: 'F564BB' },
				{ token: 'paren10', foreground: '226DB4' }
			],
			colors: {
				"editor.background": rootElementStyle.getPropertyValue('--crux-formula-editor-dark-bg-color'),
				"editor.lineHighlightBackground": rootElementStyle.getPropertyValue('--crux-formula-editor-dark-line-highlight-bg-color'),
    			"editor.lineHighlightBorder": rootElementStyle.getPropertyValue('--crux-formula-editor-dark-line-highlight-bg-color')
			}
		});
		let isOperator = this.$node.component.data.cxPropOnlyOperator;
		if(isOperator) {
			var editorOperators = this;
			this.operatorListUpdate();
			window.addEventListener('resize', function(){
				editorOperators.operatorListUpdate();
			});
		}
	},
	themeObserver: function(){
		const theme = this.data.cxPropTheme === 'dark' ? 'formula-theme-dark' : 'formula-theme';
		Lyte.objectUtils( this.data.cxPropOptions , "add" , "theme" , theme );
	}.observes('cxPropTheme').on('didConnect'),
	setErrorData : function(){
		if(this.data.cxPropErrorsMessage.length === 0){
			this.setData('cxPropNoError', true);
			Lyte.arrayUtils( this.data.cxPropErrorsMessage , 'push' , 'Formula runs successfully!');
		}else{
			this.setData('cxPropNoError', false);
		}
	}.observes('cxPropErrorsMessage').on('didConnect'),
	didDestroy : function(){
		const containerElement = this.$node.querySelector('.cxFrmlaEdtrPanelContainer');
		if(containerElement && this._transitionEndHandler){
			containerElement.removeEventListener('transitionend', this._transitionEndHandler);
		}
	},
	getValue: function () {
		let editor = this.$node.component;
		let getEditorValue =  this.$node.querySelector('lyte-editor').component.data.ltPropValue; //No I18n
		if (!getEditorValue) {
			return false;
		}
		let getApiValue = getEditorValue.replace(/\$\{([^}]+)\}/g, function (full, label) {
			let getFilterVal = editor.data.cxPropFieldDropdownOptions.cruxFilterBy({'field_label': label})[0];
			return "${" + getFilterVal.api_name + "}";
		});
		return getApiValue;
	},
	updateEditorData: function () {
		let gettingSomeVal = this.getData("cxPropValue");
		let editorCompVal = this.$node.querySelector('lyte-editor');
		if(gettingSomeVal !== undefined && gettingSomeVal !== null){
			editorCompVal.component.setData("ltPropValue", gettingSomeVal); //No I18n
		}
		let getEditorValue = editorCompVal.component.data.ltPropValue;
		this.setData("cxPropValue", getEditorValue);
		return getEditorValue;
	}.observes("cxPropValue").on('didConnect'),
	updateOptionsForEditor : function(){
		this.lyteEditor.updateOptions({
			theme : this.data.cxPropOptions.theme
		});
	}.observes('cxPropOptions.*'),
	operatorListUpdate : function(){
		let operatorWrap = this.$node.querySelector(".cxFrmlaOperatorsWrapper");
		let operatorWrapLength = operatorWrap.children.length;
		let menuOperatorBtns = $L(".cxFrmlaOperatorsMenuWrap")[0];
		for (let i = 0; i < operatorWrapLength; i++){
			operatorWrap.children[i].classList.remove("cxFrmlaOperatorHidden", "cxFrmlaOperatorVisible");
			menuOperatorBtns.children[i].classList.remove("cxFrmlaOperatorHidden", "cxFrmlaOperatorVisible");
		}
		let operatorBtns = operatorWrap.children[0].clientWidth + 8; //eslint-disable-line @zoho/webperf/layout-thrashing
		let visibleBtns = Math.floor(operatorWrap.clientWidth / operatorBtns); //eslint-disable-line @zoho/webperf/layout-thrashing
		let operatorBtnsLength = operatorWrap.children.length;
		if (operatorWrap.clientWidth <= operatorWrap.scrollWidth) { //eslint-disable-line @zoho/webperf/layout-thrashing
			for(let i = 0; i < visibleBtns; i++){
				operatorWrap.children[i].classList.add("cxFrmlaOperatorVisible");
				menuOperatorBtns.children[i].classList.add("cxFrmlaOperatorHidden");
			}
			for (let j = visibleBtns; j < operatorBtnsLength; j++){ //eslint-disable-line @zoho/webperf/layout-thrashing
				if (!operatorWrap.children[j].classList.contains("cxFrmlaOperatorVisible")){
					operatorWrap.children[j].classList.add("cxFrmlaOperatorHidden");
					menuOperatorBtns.children[j].classList.add("cxFrmlaOperatorVisible");
				}
			}
		} else {
				this.setData("cxPropOperatorPresent", false);
		}
		if (visibleBtns >= operatorBtnsLength) {
			this.$node.querySelector(".cxFrmlaOperMoreIcon").classList.add("cxFrmlHideBtn");
		} else {
			this.$node.querySelector(".cxFrmlaOperMoreIcon").classList.remove("cxFrmlHideBtn");
		}
	},
	actions : {
		closeLeftPanel: function(className){
			const panelElement = this.$node.querySelector('.cxFrmlaEdtrContainer');
			panelElement.classList.toggle('cxFrmlaEdtrPanelIsOpen');
			const containerElement = this.$node.querySelector('.cxFrmlaEdtrPanelContainer');
			const resizeInterval = setInterval(() => {
				this.lyteEditor.updateEditorLayout();
			},1);
			if(!this._transitionEndHandler){
				this._transitionEndHandler = () => {
					clearInterval(resizeInterval);
					this.lyteEditor.updateEditorLayout();
					this.operatorListUpdate();
				};
				containerElement.addEventListener('transitionend', this._transitionEndHandler);
			}
		},
		showModal: function () {
		  this.setData("showModal", true); //No I18n
		},
		runDisplayedFormula: function () {
			if (this.getMethods("onRunExecution")) {
				this.executeMethod("onRunExecution", this);
			}
		},
		selectOperator: function (operator) {
			// Logic to handle operator selection
			var editorInstance = this.lyteEditor.component.data.editorInstance;
			var cursorPosition = editorInstance.getPosition();
			var range = new monaco.Range(cursorPosition.lineNumber, cursorPosition.column, cursorPosition.lineNumber, cursorPosition.column);
			var id = { major: 1, minor: 1 };
			var selectedValue = operator;
			var op = {identifier: id, range: range, text: selectedValue, forceMoveMarkers: true};
			editorInstance.focus();
			editorInstance.executeEdits("my-source", [op]);
		},
		insertDataFunction: function (element) {
			var editorInstance = this.lyteEditor.component.data.editorInstance;
			let checkTabName = this.$node.querySelector(".cxFrmlaLeftTabs").component.data.ltPropCurrentTab.name;
			this.setData("cxPropInsertName", element.getAttribute("cx-prop-insert-name"));
			editorInstance.focus();

			if(checkTabName === 'Functions'){
				/* Build snippet with tab stops only for parameters inside parentheses */
				var plainValue = element.getAttribute("cx-prop-insert-value");
				var openParenIdx = plainValue.indexOf('(');
				var snippetText;
				if(openParenIdx !== -1) {
					var funcName = plainValue.substring(0, openParenIdx);
					var paramsStr = plainValue.substring(openParenIdx + 1, plainValue.lastIndexOf(')'));
					var params = paramsStr.split(',');
					var ParamCount = params.length;
					snippetText = funcName + '(';
					for(var i = 0; i < ParamCount; i++) {
						snippetText += '${' + (i + 1) + ':' + params[i].trim() + '}';
						if(i < ParamCount - 1) {
							snippetText += ', ';
						}
					}
					snippetText += ')';
				} else {
					snippetText = plainValue;
				}
				var snippetController = editorInstance.getContribution('snippetController2');
				snippetController.insert(snippetText);
				this.methods.onSelectionChange(this.lyteEditor);
			} else {
				var cursorPosition = editorInstance.getPosition();
				var range = new monaco.Range(cursorPosition.lineNumber, cursorPosition.column, cursorPosition.lineNumber, cursorPosition.column);
				var id = { major: 1, minor: 1 };
				let selectedValue = "${"+element.getAttribute("cx-prop-insert-value")+"}";
				var op = {identifier: id, range: range, text: selectedValue, forceMoveMarkers: true};
				editorInstance.executeEdits("my-source", [op]);
			}
		},
		showMyHintData: function(myData){
			var myHoverCard = $L(".cxFrmlaEdtrHovercard")[0].component;
			myHoverCard.setData("ltPropOriginElem", ".lyteAccordionActive #"+myData.id);
			myHoverCard.setData("ltPropShow", true);
			if (myHoverCard.getData("ltPropShow") === true) {
				// let originID = myHoverCard.getData("ltPropOriginElem");
				this.$node.querySelector(".lyteAccordionActive #"+myData.id).closest(".cxFrmlaEdtrPanelAccordionBodyItems").classList.add("cxFrmlaEdtrLeftPanelItemActive");
			} else {
				this.$node.querySelector(".lyteAccordionActive #"+myData.id).closest(".cxFrmlaEdtrPanelAccordionBodyItems").classList.remove("cxFrmlaEdtrLeftPanelItemActive");
			}

			let funcName = myData.getAttribute("cx-prop-insert-value");
			var editorSelf = myData.closest("crux-formula-editor").component;
			var domNode = document.querySelector(".cxFrmlaPopContent");
			domNode.innerHTML = `<div class='cxFrmlaPopEdtrWidget'>
										<div class='cxFrmlaHelpTitle'>Function Usage</div>
										<div class='cxFrmlaEdtrWdgtSytxCont cxFlex cxFrmlaHelpSec'><div class="cxFrmlaLabel">Function</div></div>
										<div class='cxFrmlaEdtrDescCont cxFlex cxFrmlaHelpSec'><div class="cxFrmlaLabel">Description</div></div>
										<div class='cxFrmlaEdtrSyntax cxFlex cxFrmlaHelpSec'><div class="cxFrmlaLabel">Syntax</div></div>
										<div class='cxFrmlaEdtrExmplCont cxFlex cxFrmlaHelpSec'><div class="cxFrmlaLabel">Example</div></div>
								</div>`;

			var widgetContent = domNode.querySelector('.cxFrmlaPopEdtrWidget');

			/* getting data from cxPropWidgetData(data for a widget) which matches consition keyword == selectedFunction  */
			let selectedWidgetData = editorSelf.data.cxPropWidgetData.cruxFilterBy({'key': funcName.toLowerCase()})[0];

			/* Function name display */
			var functionContainer = widgetContent.querySelector('.cxFrmlaEdtrWdgtSytxCont');
			var functionNameSpan = document.createElement('div');
			functionNameSpan.className = 'cxFrmlaHelpValue';
			functionNameSpan.textContent = selectedWidgetData.key + '()';
			functionContainer.append(functionNameSpan);

			/* Syntax Description elements */
			/* IF( condition, value_if_true, value_if_false ); Click for more info */
			var syntaxContainer = widgetContent.querySelector('.cxFrmlaEdtrSyntax');
			
			var syntaxContent = document.createElement('div');
			syntaxContent.className = 'cxFrmlaEdtrWdgtSytx cxFrmlaHelpValue';

			var syntaxInitialSpan = document.createElement('span');
			syntaxInitialSpan.textContent = selectedWidgetData.key+'( ';
			
			syntaxContent.append(syntaxInitialSpan);

			var syntaxParams = selectedWidgetData.parameters;
			var syntaxParamsLen = syntaxParams.length;
			for(var i=0; i<syntaxParamsLen; i++){
				var comma = ', ';
				var syntaxLinks = document.createElement('span');
				syntaxLinks.textContent = syntaxParams[i];
				// syntaxLinks.href = '#';
				
				// syntaxLinks.addEventListener('click', clickOnParams);
				
				if(i<syntaxParamsLen-1){
					syntaxContent.append(syntaxLinks, comma);
				}else{
					syntaxContent.append(syntaxLinks);
				}
			}
			
			var syntaxEndSpan = document.createElement('div');
			syntaxEndSpan.textContent = ' ); ';
			syntaxContent.append(syntaxEndSpan);

			// var moreInfo = document.createElement('a');
			// moreInfo.className = 'cxFrmlaEdtrWdgtMoreInfoBtn';
			// moreInfo.href = '#';
			// moreInfo.textContent = 'Click for more info';

			syntaxContainer.append(syntaxContent);
			/* End of Syntax Description elements */


			/* Function Description elements */
			/* Returns a value if a condition is TRUE, or another value if a condition is FALSE. */
			var functionDescription = widgetContent.querySelector('.cxFrmlaEdtrDescCont');

			var functionDescriptionContent = document.createElement('div');
			functionDescriptionContent.textContent = selectedWidgetData.description;
			functionDescriptionContent.className = 'cxFrmlaHelpValue';

			functionDescription.append(functionDescriptionContent);
			/* End of Function Description elements */


			
			/* The value to test */
			var sampleFormula = widgetContent.querySelector('.cxFrmlaEdtrExmplCont');
			if(editorSelf.data.cxPropAdvancedInput){
				var sampleFormulaInput = document.createElement('lyte-input');
				sampleFormulaInput.className = 'cxSampleInputContent cxFrmlaHelpValue';
				
				sampleFormula.append(sampleFormulaInput);

				widgetContent.querySelector('lyte-input.cxSampleInputContent').ltProp('placeholder', 'The valuee to test');
			}else{
				var sampleFormulaContainer = document.createElement('div');
				sampleFormulaContainer.className = 'cxSampleFormulaContent cxFrmlaHelpValue';

				var sampleFormulaData = selectedWidgetData.Example;
				var sampleFormulaDataLen = sampleFormulaData.length;
				var j;
				for(j=0;j<sampleFormulaDataLen;j++){
					var sampleExampleText = sampleFormulaData[j].formula+' '+sampleFormulaData[j].I18n+' '+sampleFormulaData[j].result;
					sampleFormulaContainer.textContent += sampleExampleText;
					if(j !== sampleFormulaDataLen-1){
						sampleFormulaContainer.textContent += ', ';
					}
				}
				
				sampleFormula.append(sampleFormulaContainer);
			}
			// editorSelf.setData("cxPropFrmlaHelpText", true);
			// editorSelf.setData("cxPropInsertName", '');
			/* End of Sample Formula elements */
			// return domNode;
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		onBasicEditorLoad: function (editorComp, monaco, editorInstance) {
			this.setData("monaco", monaco);	
			var editorSelf = this;

			let frmlaLength = editorSelf.$node.component.data.cxPropFormulaMaxLength;
			let editorTextLength = editorSelf.$node.component.getValue().length;
			if(editorTextLength >= frmlaLength) {
				editorSelf.setData("cxPropErrorMessage", "Formula length exceeded the maximum limit of " + frmlaLength + " characters.");
			}
			
			/* Data's for my content widget */
			// var contentWidget = {				
			// 	domNode: '',
			// 	getId: function () {
			// 	 	 return "my.content.widget";
			// 	},
			// 	getDomNode: function(){
			// 		/* getting widget content from setWidget function */
			// 		this.domNode = editorSelf.setWidget();
			// 		return this.domNode;
			// 	},
			// 	getPosition: function () {
			// 		const range = editorInstance.getSelection();
			// 		const position = {
			// 			lineNumber: range.endLineNumber,
			// 			column: editorInstance.getModel().getWordAtPosition( editorInstance.getPosition() ).endColumn
			// 		};
			// 		return {
			// 			position: position,
			// 			preference: [1,2]
			// 		};
			// 	}
			// };

			/* New language formula created */
			monaco.languages.register({id : 'formula'});
			
			/* Token provider for Keywords, command lines and string for color difference */
			monaco.languages.setMonarchTokensProvider('formula', {
				tokenizer : {
					root: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren1', next: '@params1' }]
					],

					params1: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren2', next: '@params2' }],
						[/\)/, { token: 'paren1', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params2: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren3', next: '@params3' }],
						[/\)/, { token: 'paren2', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params3: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren4', next: '@params4' }],
						[/\)/, { token: 'paren3', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params4: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren5', next: '@params5' }],
						[/\)/, { token: 'paren4', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params5: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren6', next: '@params6' }],
						[/\)/, { token: 'paren5', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params6: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren7', next: '@params7' }],
						[/\)/, { token: 'paren6', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params7: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren8', next: '@params8' }],
						[/\)/, { token: 'paren7', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params8: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren9', next: '@params9' }],
						[/\)/, { token: 'paren8', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params9: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren10', next: '@params10' }],
						[/\)/, { token: 'paren9', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					],

					params10: [
						[/\$\{[^}]+\}/, 'myField'],
						[/([a-zA-Z_]\w*)(?=\s*\()/, 'myFunction'],
						[/\(/, { token: 'paren1', next: '@params1' }],
						[/\)/, { token: 'paren10', next: '@pop' }],
						[/[a-zA-Z_]\w*/, 'myParam'],
						[/\,/, 'delimiter']
					]
				}
			});

			monaco.languages.registerInlineCompletionsProvider('javascript', {
				provideInlineCompletions(model, position) {
					const line = model.getLineContent(position.lineNumber);
					const prefix = line.substring(0, position.column - 1);

					if (prefix.endsWith('cl')) {
						return {
						items: [{
							insertText: 'console.log();',
							range: new monaco.Range(
							position.lineNumber,
							position.column - 2,
							position.lineNumber,
							position.column
							)
						}]
						};
					}
					return { items: [] };
				},
				// freeInlineCompletions() {}
			});

			// Create the editor
			monaco.editor.create(editorSelf.$node.querySelector('.activeEditor'), {
				value: '',
				language: 'javascript',
				theme: this.data.cxPropOptions.theme,
				automaticLayout: true,
				inlineSuggest: {
				enabled: true
				}
			});

			if(!Lyte.Editor.CompletionProvider.registeredInstances()['formula']){
				/* Completion provider for auto suggestions for operations and functions */
				Lyte.Editor.CompletionProvider.Register('formula', {
					id: {
						provideCompletionItems: function () {
							function getSuggestions() {
								let currentEditorSelf = $L("crux-formula-editor")[0].component;
								const funcOpt = currentEditorSelf.data.cxPropFunctionDropdownOptions
									? currentEditorSelf.data.cxPropFunctionDropdownOptions.reduce((acc, curr) => {
										return acc.concat((Object.values(curr).flat()).map(obj => ({
											label: obj.name,
											kind: 1,
											insertText: obj.editorVal,
											insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
											documentation: "Creates a new Date object with year, month, and day."
										})));
									}, [])
									: [];
								const operatorOpt = currentEditorSelf.data.cxPropOperatorDropdownOptions
									? currentEditorSelf.data.cxPropOperatorDropdownOptions.map(obj => ({
										label: obj.name,
										kind: 1,
										insertText: obj.value,
										insertTextRules: 4
									}))
									: [];
								// let moduleFieldsName = editorSelf.data.cxPropFieldsLabel;
								const fieldOption = currentEditorSelf.data.cxPropFieldDropdownOptions
									? currentEditorSelf.data.cxPropFieldDropdownOptions.map(obj => ({
										label: obj.field_label,
										kind: 11,
										insertText: "${" + obj.field_label + "}",
										documentation: 'Field'
									}))
									: [];
								return funcOpt.concat(operatorOpt, fieldOption);
							}
							return {
								suggestions: getSuggestions()
							};
						}
					}
				});
			};
			editorInstance.onDidPaste(function() {
				let frmlaLength = editorSelf.data.cxPropFormulaMaxLength;
				const textModel = editorInstance.getModel()
				const valueLength = textModel.getValueLength();
				const value = textModel.getValue();
				if (valueLength >= frmlaLength) {
					const newContent = value.substring(0, frmlaLength);
					textModel.setValue(newContent)
					editorSelf.setData("cxPropErrorMessage", "Formula length exceeded the maximum limit of " + frmlaLength + " characters.");
				} else {
					editorSelf.setData("cxPropErrorMessage", "");
				}
			});
			editorInstance.onKeyDown(function (evt) {
				let frmlaLength = editorSelf.data.cxPropFormulaMaxLength;
				let editorTextLength = editorSelf.$node.component.getValue().length;
				if(editorTextLength >= frmlaLength) {
					editorSelf.setData("cxPropErrorMessage", "Formula length exceeded the maximum limit of " + frmlaLength + " characters.");
					evt.preventDefault();
				}
			});
		},
		onOptionSelect: function(valueType, event, value, component){
			var editorInstance = this.lyteEditor.component.data.editorInstance;
			var cursorPosition = editorInstance.getPosition();
			/* monaco.Range(start line number, start column, end line number, end column) */
			var range = new monaco.Range(cursorPosition.lineNumber, cursorPosition.column, cursorPosition.lineNumber, cursorPosition.column);
			var id = { major: 1, minor: 1 };
			var selectedValue = value;
			if(valueType === 'function'){
				selectedValue = selectedValue;
			}else if(valueType === 'field'){
				selectedValue = '${'+selectedValue+'}';
			}
			var op = {identifier: id, range: range, text: selectedValue, forceMoveMarkers: true};
			editorInstance.focus();
			editorInstance.executeEdits("my-source", [op]);
			component.$node.parentElement.cxProp('selected', '');
		},
		editorValueChange : function(changeObj, currentValue){
			// Find text position first
			let editorInstance = this.lyteEditor.component.data.editorInstance;
			const model = editorInstance.getModel();
			const matches = model.findMatches("searchText", true, false, true, null, true);

			if (matches.length > 0) {
				editor.setSelection(matches[0].range);
				editor.revealRangeInCenter(matches[0].range);
			}
			var unClosedBracket = this.$node.querySelectorAll('.unexpected-closing-bracket');
			var unClosedBracketLen = unClosedBracket.length;
			for(var i=0;i<unClosedBracketLen;i++){
				var errorPosition = this.data.editorInstance.getPosition(unClosedBracket[i]);
				if(errorPosition && !this.getData('cxPropErrorLine')){
					this.setData('cxPropErrorLine', errorPosition);
				}
			}
			if(this.getData('cxPropErrorLine')){
				monaco.editor.setModelMarkers($L('lyte-editor')[0].component.data.editorInstance.getModel(),"formula",[this.getData('cxPropErrorLine')]);
			}
			this.setData("length", currentValue.length);
			if (this.getData("length") > this.getData("cxPropFormulaMaxLength")) {
				this.setData("cxPropErrorMessage", "Formula length exceeded the maximum limit of " + this.getData("cxPropFormulaMaxLength") + " characters.");
			} else {
				this.setData("cxPropErrorMessage", "");
			}

			if( this.getMethods("onValueChange")){
				this.executeMethod("onValueChange");//No I18n
			}
		},
		onSelectionChange: function (myComp) {
			let editorSelf = myComp.closest("crux-formula-editor").component;
			if (!editorSelf.data.cxPropFooterTabs) {
				return;
			}
			const editor = myComp.component.data.editorInstance;
			const position = editor.getPosition();
			const model = editor.getModel();
			const lineText = model.getLineContent(position.lineNumber);
			const textUntilCursor = lineText.substring(0, position.column - 1);

			// Calculate parenthesis depth across all lines up to the cursor position
			// to determine if the cursor is inside a function call
			var fullTextUntilCursor = '';
			for (var ln = 1; ln < position.lineNumber; ln++) {
				fullTextUntilCursor += model.getLineContent(ln);
			}
			fullTextUntilCursor += textUntilCursor;
			var parenDepth = 0;
			for (var ci = 0; ci < fullTextUntilCursor.length; ci++) {  //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
				if (fullTextUntilCursor[ci] === '(') { parenDepth++; }
				else if (fullTextUntilCursor[ci] === ')') { parenDepth--; }
			}

			// If cursor is not inside any parentheses, hide the help widget and return
			if (parenDepth <= 0) {
				editorSelf.setData("cxPropFrmlaHelpText", false);
				editorSelf.setData("cxPropInsertName", '');
				var helpDom = document.querySelector(".cxFrmlaHelpContent");
				if (helpDom) { helpDom.innerHTML = ''; }
				return;
			}

			const matches = [...textUntilCursor.matchAll(/([A-Za-z_]\w*)\s*\(/g)];
			let funcName = "";
			const selectedValueData = editorSelf.data.cxPropInsertName;

			// Prefer the function name under the cursor (e.g., nested parameter functions) if it is followed by a parenthesis.
			const wordAtCursor = model.getWordAtPosition(position);
			if (wordAtCursor) {
				const textAfterWord = lineText.substring(wordAtCursor.endColumn - 1).trimStart();
				if (textAfterWord.startsWith("(")) {
					funcName = wordAtCursor.word;
				}
			}

			if (!funcName && selectedValueData) {
				funcName = selectedValueData;
			} else if (!funcName && matches.length > 0) {
				funcName = matches[matches.length - 1][1]; // last matched function name
			}
			// var domNode = document.createElement("div");cxFrmlaHelpContent
			var domNode = document.querySelector(".cxFrmlaHelpContent");
			domNode.innerHTML = `<div class='cxFrmlaEdtrWidget'>
										<div class='cxFrmlaEdtrWdgtSytxCont cxFrmlaHelpSec'><div class="cxFrmlaLabel">Function</div></div>
										<div class='cxFrmlaEdtrDescCont cxFrmlaHelpSec'><div class="cxFrmlaLabel">Description</div></div>
										<div class='cxFrmlaEdtrSyntax cxFrmlaHelpSec'><div class="cxFrmlaLabel">Syntax</div></div>
										<div class='cxFrmlaEdtrExmplCont cxFrmlaHelpSec'><div class="cxFrmlaLabel">Example</div></div>
								</div>`;

			var widgetContent = domNode.querySelector('.cxFrmlaEdtrWidget');

			/* getting data from cxPropWidgetData(data for a widget) which matches consition keyword == selectedFunction  */
			let selectedWidgetData = editorSelf.data.cxPropWidgetData.cruxFilterBy({'key': funcName.toLowerCase()})[0];

			/* Function name display */
			var functionContainer = widgetContent.querySelector('.cxFrmlaEdtrWdgtSytxCont');
			var functionNameSpan = document.createElement('div');
			functionNameSpan.className = 'cxFrmlaHelpValue';
			functionNameSpan.textContent = selectedWidgetData.key + '()';
			functionContainer.append(functionNameSpan);

			/* Syntax Description elements */
				/* IF( condition, value_if_true, value_if_false ); Click for more info */
				var syntaxContainer = widgetContent.querySelector('.cxFrmlaEdtrSyntax');
				
				var syntaxContent = document.createElement('div');
				syntaxContent.className = 'cxFrmlaEdtrWdgtSytx cxFrmlaHelpValue';

				var syntaxInitialSpan = document.createElement('span');
				syntaxInitialSpan.textContent = selectedWidgetData.key+'( ';
				
				syntaxContent.append(syntaxInitialSpan);

				var syntaxParams = selectedWidgetData.parameters;
				var syntaxParamsLen = syntaxParams.length;
				for(var i=0; i<syntaxParamsLen; i++){
					var comma = ', ';
					var syntaxLinks = document.createElement('span');
					syntaxLinks.textContent = syntaxParams[i];
					// syntaxLinks.href = '#';
					
					// syntaxLinks.addEventListener('click', clickOnParams);
					
					if(i<syntaxParamsLen-1){
						syntaxContent.append(syntaxLinks, comma);
					}else{
						syntaxContent.append(syntaxLinks);
					}
				}

				// function clickOnParams(){
					// var param1 = '';
					// var param2 = '';
					// var param3 = '';
					// editorSelf.data.cxPropWidgetData[editorSelf.data.selectedFunction].activeParameter = this.textContent;
					// if(this.offsetParent && this.offsetParent.querySelector('.cxFrmlaEdtrDescCont')){
					// 	var paramDescription = this.offsetParent.querySelector('.cxFrmlaEdtrDescCont');
					// 	paramDescription.textContent = selectedWidgetData;
					// }
				// }
				
				var syntaxEndSpan = document.createElement('span');
				syntaxEndSpan.textContent = ' ); ';
				syntaxContent.append(syntaxEndSpan);

				// var moreInfo = document.createElement('a');
				// moreInfo.className = 'cxFrmlaEdtrWdgtMoreInfoBtn';
				// moreInfo.href = '#';
				// moreInfo.textContent = 'Click for more info';

				syntaxContainer.append(syntaxContent);
			/* End of Syntax Description elements */


			/* Function Description elements */
				/* Returns a value if a condition is TRUE, or another value if a condition is FALSE. */
				var functionDescription = widgetContent.querySelector('.cxFrmlaEdtrDescCont');

				var functionDescriptionContent = document.createElement('div');
				functionDescriptionContent.className = 'cxFrmlaHelpValue';
				functionDescriptionContent.textContent = selectedWidgetData.description;

				functionDescription.append(functionDescriptionContent);
			/* End of Function Description elements */


			/* Sample Formula elements */
				/* The value to test */
				var sampleFormula = widgetContent.querySelector('.cxFrmlaEdtrExmplCont');
				if(editorSelf.data.cxPropAdvancedInput){
					var sampleFormulaInput = document.createElement('lyte-input');
					sampleFormulaInput.className = 'cxSampleInputContent cxFrmlaHelpValue';
					
					sampleFormula.append(sampleFormulaInput);

					widgetContent.querySelector('lyte-input.cxSampleInputContent').ltProp('placeholder', 'The valuee to test');
				}else{
					var sampleFormulaContainer = document.createElement('div');
					sampleFormulaContainer.className = 'cxSampleFormulaContent cxFrmlaHelpValue';

					var sampleFormulaData = selectedWidgetData.Example;
					var sampleFormulaDataLen = sampleFormulaData.length;
					var j;
					for(j=0;j<sampleFormulaDataLen;j++){
						var sampleExampleText = sampleFormulaData[j].formula+' '+sampleFormulaData[j].I18n+' '+sampleFormulaData[j].result;
						sampleFormulaContainer.textContent += sampleExampleText;
						if(j !== sampleFormulaDataLen-1){
							sampleFormulaContainer.textContent += ', ';
						}
					}
					
					sampleFormula.append(sampleFormulaContainer);
				}
				editorSelf.setData("cxPropFrmlaHelpText", true);
				editorSelf.setData("cxPropInsertName", '');
			/* End of Sample Formula elements */
			// return domNode;
		},
		selectFrmlaType: function() {
			if (this.getMethods("onRtnTypeSelection")) {
				this.executeMethod("onRtnTypeSelection", this);
			}
		},
		hideMyHintPop: function(element) {
			let currentOriginElem = element.component.getData("ltPropOriginElem");
			this.$node.querySelector(currentOriginElem).closest(".cxFrmlaEdtrPanelAccordionBodyItems").classList.remove("cxFrmlaEdtrLeftPanelItemActive");
		}
	},
	setSuggestionList : function() {
		var funcOpt = this.data.cxPropFunctionDropdownOptions?this.data.cxPropFunctionDropdownOptions.map(obj => ({
			label:obj.name, 
			kind: 1, 
			insertText:obj.editorVal, 
			insertTextRules: 4,
		})): [];
		var operatorOpt = this.data.cxPropOperatorDropdownOptions?this.data.cxPropOperatorDropdownOptions.map(obj => ({
			label:obj.name, 
			kind: 1, 
			insertText:obj.value, 
			insertTextRules: 4,
		})): [];
		var otherOption = funcOpt.concat(operatorOpt);
		var fieldOption = this.data.cxPropFieldDropdownOptions?this.data.cxPropFieldDropdownOptions.map(obj => ({
			label:obj.field_label, 
			kind: 11, 
			insertText: "${" +obj.api_name+ "}",
			documentation:'Field'
		})): [];
		var suggestionArr = otherOption.concat(fieldOption);
		if(suggestionArr.length > 0){
			this.setData('suggestionList', suggestionArr);
		}
	}.observes('cxPropFunctionDropdownOptions', 'cxPropOperatorDropdownOptions', 'cxPropFieldDropdownOptions').on('init')
});