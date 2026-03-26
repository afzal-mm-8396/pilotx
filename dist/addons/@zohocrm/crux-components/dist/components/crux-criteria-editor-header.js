// $Id$
Lyte.Component.register("crux-criteria-editor-header", {
_template:"<template tag-name=\"crux-criteria-editor-header\"> <template is=\"if\" value=\"{{expHandlers(showFieldsCriteria,'!')}}\"><template case=\"true\"> <div class=\"criteriaRow\"></div> </template></template> <div class=\"criteriaTd criteriaNumber\"> <div class=\"cxCriteriaNumWrap\"> <template is=\"if\" value=\"{{ifNotEquals(criteriaIndex,1)}}\"><template case=\"true\"> <div class=\"cxCriteriaAndOr {{if(cxPropDisabledGroupOperator,'cxCriteriaHeaderDisabled','')}}\"> <lyte-input class=\"cxCriteriaAndOrLyteInput\" lt-prop-class=\"cxCriteriaAndOrInput\" lt-prop-readonly=\"true\" lt-prop-value=\"{{andOrCondition}}\" data-zcqa=\"criteria_cond_{{criteriaIndex}}\" onclick=\"{{action('changeAndOr')}}\"></lyte-input> </div> </template></template> <input type=\"text\" data-zcqa=\"criteria_patternnum_{{criteriaIndex}}\" id=\"patternNum\" class=\"cxCriteriaPatternNum patterNum\" value=\"{{criteriaNumber}}\" readonly=\"\" tabindex=\"-1\"> </div> </div> <template is=\"for\" items=\"{{prefixArray}}\" item=\"item\" index=\"index\"> <div class=\"criteriaTd {{if(ifEquals(item.type,'text'),'cxCriteriaTextTd','')}}\"> <template is=\"if\" value=\"{{expHandlers(item.type,'==','text')}}\"><template case=\"true\"> <div class=\"cxCriteriaTdTextWrapper\"> <lyte-text class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedArray[index].value[item.displayValue]}}\"></lyte-text> </div> </template><template case=\"false\"> {{addMurhyInfo(\"crux-criteria-editor-header\",\"January Group Automation\")}} <div class=\"cxCriteriaDropdown pR {{if(item.dropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(item.dropdownOpen,if(item.dropdownOpenUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(item.showValue,&quot;&quot;,&quot;cxCriteriaDropdownDisabled&quot;)}}\"> <div class=\"cx_prefixDropdownLabel prefix_{{item.apiValue}} {{if(item.showValue,'','lyteDropdown-disabled')}}\" data-zcqa=\"criteria_{{item.apiValue}}_{{criteriaIndex}}\" onclick=\"{{action('showPrefixDropdown',index,event)}}\" onkeydown=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> {{addMurhyInfo(\"crux-criteria-editor-header.html\",\"Feb Default Changes\")}} <lyte-text class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedArray[index].value[item.displayValue]}}\" lt-prop-tooltip-config=\"{{tooltipConfig}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{item.showDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cxCriteriaPrefixOrigDropdown cx_PrefixDropdown{{item.apiValue}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" on-option-selected=\"{{method('changePrefixOption',index)}}\" lt-prop-selected=\"{{selectedArray[index].value[item.systemValue]}}\" on-before-show=\"{{method('onPrefixDropdownBeforeShow',index)}}\" on-show=\"{{method('onPrefixDropdownShow',index)}}\" on-hide=\"{{method('onDropdownHide')}}\" on-before-hide=\"{{method('prefixBeforeHide',index)}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{expHandlers(showArray[item.apiValue],'&amp;&amp;',isSearchNeeded(showArray[item.apiValue],true))}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"prefixSearchBox\" class=\"w100per prefixSearchStyle{{criteriaIndex}}{{item.apiValue}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lytePrefixDropbody{{criteriaIndex}}{{item.apiValue}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;,&quot;related&quot; : &quot;lyte-drop-group&quot;}\" on-search=\"{{method(&quot;onPrefixSearch&quot;,index)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lytePrefixDropbody{{criteriaIndex}}{{item.apiValue}}\"> <template is=\"if\" value=\"{{expHandlers(showArray[item.apiValue],'==','Loading')}}\"><template case=\"true\"> <div class=\"cxCriteriaInitialLoaderWrap\"> <span class=\"cxCriteriaScrollLoaderIcon\"></span> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(item.cxPropDisableNone,'!')}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{criteriaIndex}}\" data-zcqa=\"criteria{{item.apiValue}}drop_none\" data-value=\"-1\" id=\"-1\" index=\"-1\" value=\"none\"> {{cruxGetI18n('None')}} </lyte-drop-item> </template></template> <template is=\"for\" items=\"{{showArray[item.apiValue]}}\" item=\"value\" index=\"indexi\"> <crux-criteria-drop-item cx-prop-type=\"prefix\" cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{value}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-prefix-item=\"{{item}}\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{item.emptyOptionsShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{item.showError}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaFieldError\" class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(item.showError)}}</span> </template></template> </template></template> </div> </template> <template is=\"if\" value=\"{{showFieldsCriteria}}\"><template case=\"true\"> <div class=\"criteriaTd cxCriteriaTdField\"> <div class=\"cxCriteriaDropdown {{if(fieldDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(fieldDropdownOpen,if(fieldDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(showField,&quot;&quot;,&quot;cxCriteriaDropdownDisabled&quot;)}}\"> {{addMurhyInfo(\"crux-criteria-editor-header.html\",\"Feb Default Changes\")}} <div class=\"cx_fieldDropdownLabel {{if(showField,'','lyteDropdown-disabled')}} {{if(showFieldErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_field_{{criteriaIndex}}\" onclick=\"{{action('showFieldsDropdown',event)}}\" onkeyup=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedField.field_label}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showFieldsDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cx_fieldsDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" on-option-selected=\"{{method('changeField')}}\" lt-prop-selected=\"{{selectedField.api_name}}\" on-before-show=\"{{method('onFieldDropdownBeforeShow')}}\" on-show=\"{{method('onFieldDropdownShow')}}\" lt-prop-is-open=\"{{lbind(fieldDrodownOpen)}}\" on-before-hide=\"{{method('fieldBeforeHide')}}\" on-hide=\"{{method('onDropdownHide')}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{isSearchNeeded(fields)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"fieldSearchBox\" class=\" fieldSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteFieldsDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;,&quot;related&quot; : &quot;lyte-drop-group&quot;}\" on-search=\"{{method(&quot;onFieldSearch&quot;)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteFieldsDropbody{{criteriaIndex}}\"> <template is=\"if\" value=\"{{showFieldsLoading}}\"><template case=\"true\"> <div class=\"cxCriteriaInitialLoaderWrap\"> <span class=\"cxCriteriaScrollLoaderIcon\"></span> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropNoneField}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{criteriaIndex}}\" data-zcqa=\"criteriafielddrop_none\" data-value=\"None\" id=\"-1\" index=\"-1\" value=\"none\"> {{cruxGetI18n('None')}} </lyte-drop-item> </template></template> <template is=\"for\" items=\"{{fields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-show-all=\"{{cxPropShowAllFields}}\" cx-prop-display-selector=\"field_label\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{emptyFieldShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{showFieldErrorMsg}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaFieldError\" class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showFieldErrorMsg)}}</span> </template></template> </div> <div class=\"criteriaTd\"> <div class=\"cxCriteriaDropdown {{if(condDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(condDropdownOpen,if(condDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(showComparator,&quot;cxCriteriaDropdownDisabled&quot;,&quot;&quot;)}}\" id=\"conditionDiv\"> <div class=\"cx_compDropdownLabel {{if(showComparator,'lyteDropdown-disabled','')}} {{if(showCondErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_comp_{{criteriaIndex}}\" onclick=\"{{action('showComparatorDropdown',event)}}\" onkeyup=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedComparator.display}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showComparatorDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cx_compDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" id=\"comparator\" lt-prop-selected=\"{{selectedComparator.system}}\" on-option-selected=\"{{method('changeCondition')}}\" on-before-show=\"{{method('onConditionDropdownBeforeShow')}}\" on-show=\"{{method('onConditionDropdownShow')}}\" lt-prop-is-open=\"{{lbind(condDropdownOpen)}}\" on-before-hide=\"{{method('conditionBeforeHide')}}\" on-hide=\"{{method('onDropdownHide')}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\" lt-prop-prevent-parent-scroll=\"true\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{expHandlers(condArray.length,'>',9)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"conditionSearchBox\" class=\" conditionSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteConditionDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;}\" on-search=\"{{method(&quot;onConditionSearch&quot;)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteConditionDropbody{{criteriaIndex}}\"> <template is=\"for\" items=\"{{condArray}}\" item=\"item\" index=\"index\"> <lyte-drop-item class=\"selector{{cxPropId}} {{if(item.cxDisabled,'cxCriteriaItemDisabled')}}\" data-zcqa=\"criteria_compdrop_{{item.system}}_{{criteriaIndex}}\" data-value=\"{{item.system}}\" index=\"{{index}}\" data-custom-tooltip=\"{{if(item.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(item.cxTitle,item.cxTitle,'')}}\" onclick=\"{{action('onCriteriaConditionItemClicked',this)}}\"> {{item.display}} </lyte-drop-item> </template> <template is=\"if\" value=\"{{emptyConditionShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{showCondErrorMsg}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaConditionError\" class=\"cxCriteriaConditionError cxCriteriaInlineError\">{{unescape(showCondErrorMsg)}}</span> </template></template> </div> <div class=\"criteriaTd cxElementDiv\"> <div class=\"cxFlexCenter\"> <div class=\"cxCriteriaValueCol {{if(cruxOr(dynamicTypeValue,cruxAnd(selectedField.enable_record_category,negate(disabledRecordStateConfig))),'cxFlex cxCriteriaValueColDropInputWrap')}} {{if(expHandlers(betweenCond,'&amp;&amp;',ifEquals(elementsCond,'date-time')),'cxCriteriaColBtwDTCase','')}} {{if(noneCondition,'cxCriteriaValueColDisabled')}}\" style=\"flex: 1;\"> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'||',expHandlers(expHandlers(selectedField.enable_record_category,'&amp;&amp;',expHandlers(disabledRecordStateConfig,'!')),'&amp;&amp;',expHandlers(expHandlers(selectedComparator.system,'==','equal'),'||',expHandlers(selectedComparator.system,'==','not_equal'))))}}\"><template case=\"true\"> <lyte-dropdown class=\"cxCriteriaValueColTypeDropdown\" lt-prop-selected=\"{{lbind(dynamicTypeValueSelected)}}\" lt-prop-disabled=\"{{cruxOr(noneCondition,disabledDynamicValueDropdown)}}\" on-option-selected=\"{{method('onDynamicTypeSelected')}}\" on-show=\"{{method('onDynamicValueOpen')}}\" on-hide=\"{{method('onDynamicValueHide')}}\" data-zcqa=\"cxDynamicDropdown_{{criteriaIndex}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{dynamicTypeValueOptions}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'||',expHandlers(item.system,'!=','field'))}}\"><template case=\"true\"> <lyte-drop-item data-zcqa=\"cxDynamic{{item.system}}\" data-value=\"{{item.system}}\">{{item.display}}</lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(showSecondaryModuleDropdown,'&amp;&amp;',expHandlers(expHandlers(dynamicTypeValueSelected,'==','field'),'||',expHandlers(dynamicTypeValue,'!')))}}\"><template case=\"true\"> <div class=\"{{if(dynamicTypeValue,&quot;cxCriteriaValueColDropField&quot;,&quot;cxCriteriaDropdown&quot;)}} {{if(secFieldDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(secFieldDropdownOpen,if(secFieldDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}}\"> <template is=\"if\" value=\"{{expHandlers(noneCondition,'||',dynamicallyFedField)}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaDynamicFedInput disabledText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','')}}\" lt-prop-value=\"{{disableText}}\"></lyte-text> </template><template case=\"false\"> <div class=\"cx_fieldDropdownLabel {{if(showSecFieldErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_sec_field_{{criteriaIndex}}\" onclick=\"{{action('showSecFieldsDropdown')}}\"> <span class=\"lyteMarginRight lyteDropdownLabel\"> <template is=\"if\" value=\"{{dynamicTypeValue}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaValueColText\" lt-prop-value=\"{{if(cruxAnd(ifNotEquals(selectedSecField.id,'-1'),negate(hideSecondayModule)),concat(selectedSecField.field_label,' ( ',secondaryModuleDisplayName,' )'),selectedSecField.field_label)}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> <span class=\"cxCriteriaValueColFieldLabel\"> {{selectedSecField.field_label}} </span> <template is=\"if\" value=\"{{expHandlers(expHandlers(selectedSecField.id,'!=','-1'),'&amp;&amp;',expHandlers(hideSecondayModule,'!'))}}\"><template case=\"true\"> <span class=\"cxCriteriaValueColModuleLabel\"> ({{secondaryModuleDisplayName}}) </span> </template></template> </template> </lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaValueColText\" lt-prop-value=\"{{selectedSecField.field_label}}\"></lyte-text> </template></template> </span> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showSecondaryFieldsDropdown}}\"><template case=\"true\"> <lyte-dropdown class=\"cx_fieldsDropdown cxSecFieldDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"1\" on-before-hide=\"{{method('secFieldBeforeHide')}}\" on-option-selected=\"{{method('changeSecField')}}\" lt-prop-selected=\"{{selectedSecField.api_name}}\" on-before-show=\"{{method('onSecFieldDropdownBeforeShow')}}\" on-show=\"{{method('onSecFieldDropdownShow')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{isSearchNeeded(relatedFields)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"fieldSearchBox\" class=\" secFieldSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteSecFieldsDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;}\" on-search=\"{{method(&quot;onSecFieldSearch&quot;)}}\" lt-prop-close-icon=\"true\" lt-prop-trim=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteSecFieldsDropbody{{criteriaIndex}}\"> <template is=\"for\" items=\"{{relatedFields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-show-all=\"{{cxPropShowAllFields}}\" cx-prop-display-selector=\"field_label\" cx-prop-hide-id=\"{{if(hidePrimarySelectedField,selectedField.id,'')}}\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{emptySecondaryFieldShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{showSecFieldErrorMsg}}\"><template case=\"true\"> <span class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showSecFieldErrorMsg)}}</span> </template></template> </template></template> <template is=\"if\" value=\"{{showSecFieldErrorMsg}}\"><template case=\"true\"> <span class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showSecFieldErrorMsg)}}</span> </template></template> </template></template> </div> </template><template case=\"false\"> <div id=\"searchval_div\" class=\"cxCriteriaValueSection\"> <template is=\"if\" value=\"{{noneCondition}}\"><template case=\"true\"> <lyte-input lt-prop-appearance=\"{{cxPropAppearance}}\" class=\"cxCriteriaNoneConditionInput disabledText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','')}}\" lt-prop-type=\"text\" lt-prop-disabled=\"true\" lt-prop-value=\"{{disableText}}\"> </lyte-input> </template><template case=\"false\"><template is=\"if\" value=\"{{dynamicElementComponentRender}}\"><template case=\"true\"> <template is=\"component\" class=\"cxCriteriaDynamicElement\" component-name=\"{{dynamicCond}}\" selected-value=\"{{value[0]}}\" field=\"{{selectedField}}\" comparator=\"{{selectedComparator}}\" on-value-change=\"{{method('changeValue')}}\" from=\"criteria_editor\" on-error=\"{{method('valueError')}}\" selected-dynamic-value=\"{{dynamicTypeValueSelected}}\"></template> </template><template case=\"false\"><template is=\"if\" value=\"{{ageInDaysCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaAgeInDays\"> <template is=\"if\" value=\"{{negate(previousNextComp)}}\"><template case=\"true\"><div class=\"ageInDaysComp cxDIB vab cxCriteriaAgeSpacing\"> <lyte-dropdown data-zcqa=\"criteria_age_{{criteriaIndex}}\" on-option-selected=\"{{method('changeAgeInDaysCondition')}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" lt-prop-selected=\"{{selectedAgeInDays.system}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{tabIndex}}\" id=\"ageindayscondition\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{ageindays}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"criteria_agedrop_{{item.system}}_{{criteriaIndex}}\" data-value=\"{{item.system}}\" index=\"{{index}}\">{{item.display}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div></template></template> <div class=\"ageInDaysVal cxDIB vab cxCriteriaAgeSpacing\"> <template is=\"if\" value=\"{{betweenAgeInDaysCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaBetweenCase\"> <crux-number-component class=\"cxCriteriaBetween1\" id=\"ageValueInput1\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_from_number_1\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[0]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-decimal-allowed=\"false\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\"></crux-number-component> <crux-number-component class=\"cxCriteriaBetween2\" id=\"ageValueInput2\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_to_number_1\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[1]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-decimal-allowed=\"false\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\"></crux-number-component> </div> </template><template case=\"false\"> <crux-number-component id=\"ageValueInput\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_number_{{criteriaIndex}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[0]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" class=\"{{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" cx-prop-decimal-allowed=\"false\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-minvalue=\"{{selectedComparator.cxMinvalue}}\" cx-prop-min-max-validation=\"true\"></crux-number-component> </template></template> </div> <template is=\"if\" value=\"{{previousNextComp}}\"><template case=\"true\"><div class=\"ageInDaysComp cxDIB cxCriteriaAgeSpacing\"> <lyte-dropdown data-zcqa=\"criteria_previous_next_{{criteriaIndex}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" lt-prop-selected=\"{{lbind(changePreviousNextSelected)}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{tabIndex}}\" id=\"ageindayscondition\" lt-prop-prevent-parent-scroll=\"true\" on-option-selected=\"{{method('changepreviousNextCondition')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{selectedComparator.cxDateOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" index=\"{{index}}\">{{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{betweenCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaBetweenCase\"> <template is=\"component\" id=\"betweenComponent1\" class=\"cxCriteriaBetween1\" component-name=\"crux-{{elementsCond}}-component\" on-value-change=\"{{method('changeValue')}}\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_from_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-field=\"{{selectedField}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-value=\"{{value[0]}}\" cx-prop-maxlength=\"{{maxLen}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{if(ifEquals(cxPropAppearance,'box'),'box','flat')}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\"></template> <template is=\"component\" id=\"betweenComponent2\" class=\"cxCriteriaBetween2\" component-name=\"crux-{{elementsCond}}-component\" cx-prop-data-zcqa=\"criteria_to_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-maxlength=\"{{maxLen}}\" on-value-change=\"{{method('changeValue')}}\" cx-prop-from=\"criteria\" cx-prop-field=\"{{selectedField}}\" cx-prop-value=\"{{value[1]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{if(ifEquals(cxPropAppearance,'box'),'box','flat')}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\"></template> </div> </template><template case=\"false\"> <template is=\"component\" id=\"elementComponent\" component-name=\"crux-{{elementsCond}}-component\" class=\"cxCriteriaElementComponent\" cx-prop-from=\"criteria\" cx-prop-placeholder=\"{{if(ifEquals(selectedField.ui_type,'80'),cruxGetI18n('crm.label.type.minutes'))}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-module=\"{{module}}\" cx-prop-data-zcqa=\"criteria_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-type=\"{{if(selectedField.cxPropType,selectedField.cxPropType,if(ifEquals(elementsCond,'user'),'multiple'))}}\" cx-prop-disable-extra-value=\"{{if(cruxOr(customPicklistValues,ifEquals(dynamicTypeValueSelected,'record_category')),true,selectedField.cxPropDisableExtraValue)}}\" cx-prop-do-not-skip-first-value=\"{{selectedField.cxPropDoNotSkipFirstValue}}\" cx-prop-show-unused=\"{{selectedField.cxPropShowUnused}}\" on-value-change=\"{{method('changeValue')}}\" cx-prop-field=\"{{if(userTypeField,userTypeField,selectedField)}}\" cx-prop-login-user=\"{{cxPropShowLoggedInUser}}\" on-error=\"{{method('valueError')}}\" cx-prop-value=\"{{value[0]}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-id=\"criteria_{{elementsCond}}_{{criteriaIndex}}_{{cxPropId}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-max-count=\"{{if(selectedField.cxPropMaxCount,selectedField.cxPropMaxCount,if(ifNotEquals(elementsCond,'role'),'50'))}}\" cx-prop-layout=\"{{cxPropLayout}}\" cx-prop-request-model=\"{{roleComponentRequestModal}}\" cx-prop-custom-data=\"{{if(ifEquals(elementsCond,'role'),if(ifEquals(roleComponentRequestModal,'role'),roleComponentProperties.customData,if(ifEquals(roleComponentRequestModal,'profile'),profileComponentProperties.customData,emptyObject)),emptyObject)}}\" cx-prop-query-param=\"{{queryParam}}\" cx-prop-exclude-ids=\"{{if(selectedField.cxPropExcludeIds,selectedField.cxPropExcludeIds,emptyArray)}}\" cx-prop-is-subordinate=\"{{userComponentProperties.isSubordinate}}\" cx-prop-custom-request=\"{{userComponentProperties.cxPropCustomRequest}}\" on-custom-request=\"{{method('userComponentCustomRequest')}}\" cx-prop-dropdown=\"{{selectedField.cxPropShowDropdown}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-ignore-empty-value=\"{{if(selectedField.cxPropIgnoreEmptyValue,true,false)}}\" cx-prop-prevent-parent-scroll=\"true\" cx-prop-render-auto-complete-in-criteria=\"{{selectedField.cxPropRenderAutoCompleteInCriteria}}\" fetch-module-data=\"{{method('lookupComponentDataFetch','module')}}\" fetch-records=\"{{method('lookupComponentDataFetch','records')}}\" cx-prop-minimum-characters-for-search=\"{{selectedField.cxPropMinimumCharactersForSearch}}\" cx-prop-fields=\"{{selectedField.cxPropFields}}\" cx-prop-assignee-module-name=\"{{selectedField.cxPropAssigneeModuleName}}\" cx-prop-icon-class=\"{{selectedField.cxPropIconClass}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\" cx-prop-decimal-allowed=\"{{if(cxHasOwnProperty(selectedField,'cxPropDecimalAllowed'),selectedField.cxPropDecimalAllowed,true)}}\" cx-prop-skip-user-field-request=\"{{userComponentProperties.cxPropSkipUserFieldRequest}}\" cx-prop-picklist-values=\"{{customPicklistValues}}\" cx-prop-logged-in-user-role-required=\"{{selectedField.cxLoggedInUserRole}}\" cx-prop-hide-text-component=\"{{selectedField.cxHideTextComponent}}\" cx-prop-unassigned-user=\"{{selectedField.cxPropUnassignedUser}}\" cx-prop-masking-properties=\"{{maskingProperties}}\"></template> </template></template></template></template></template></template></template></template> </div> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(dynamicallyFedField,'&amp;&amp;',expHandlers(dynamicTypeValueSelected,'==','field'))}}\"><template case=\"true\"> <span class=\"cxCriteriaDynamicConfig cxLink\" data-zcqa=\"cx_dynamic_set_value\" onclick=\"{{action('dynamicFedFieldClicked')}}\"> <template is=\"if\" value=\"{{expHandlers(disableText,'==','')}}\"><template case=\"true\"> {{cruxGetI18n('voc.gc.configure')}} </template><template case=\"false\"> {{cruxGetI18n('Edit')}} </template></template> </span> </template></template> </div> </div> </template><template case=\"false\"> </template></template> <div class=\"criteriaTd cxAddRemoveTd\"> <div class=\"cxCriteriaAddRemove\"> <template is=\"if\" value=\"{{showRemove}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(hideCriteriaAddRemove.cxRemove)}}\"><template case=\"true\"><a id=\"check1\" data_zcqa=\"criteria_remove_{{criteriaIndex}}\" class=\"cxCriteriaRemoveIcon\" onclick=\"{{action('removeCriteria')}}\"></a></template></template> </template></template><template is=\"if\" value=\"{{showAdd}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(hideCriteriaAddRemove.cxAdd)}}\"><template case=\"true\"><a id=\"addRow\" data_zcqa=\"criteria_add_{{criteriaIndex}}\" class=\"cxCriteriaAddIcon\" onclick=\"{{action('createNewCriteria')}}\"></a></template></template> </template></template> </div> </div> <template is=\"if\" value=\"{{childCriteria}}\"><template case=\"true\"> <div class=\"cxChildCriteria\"> <template is=\"if\" value=\"{{negate(alwaysShowChildCriteria)}}\"><template case=\"true\"><div class=\"cxChildCriteriaShowCheck\"> <lyte-checkbox lt-prop-checked=\"{{lbind(showChildCriteria)}}\" lt-prop-id=\"childCriteriaCheckbox\" lt-prop-label=\"{{childCriteriaCheckboxLael}}\" lt-prop-disabled=\"{{disabledChildCriteria}}\" lt-prop-title=\"{{if(disabledChildCriteria,childCriteriaCheckboxTitle,'')}}\"></lyte-checkbox> </div></template></template> <template is=\"if\" value=\"{{showChildCriteria}}\"><template case=\"true\"><crux-criteria-editor id=\"childCriteria_{{criteriaIndex}}\" cx-prop-fields=\"{{emptyArray}}\" cx-set-data-and-methods=\"{{method('setMethodsAndDataForChildCriteriaCaller')}}\" cx-prop-set-criteria=\"{{childSetCriteria}}\"></crux-criteria-editor></template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[5]},{"type":"for","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"text","position":[3,1,1]},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,5]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,3]},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5,1,1]},{"type":"attr","position":[5,1,1,1]},{"type":"if","position":[5,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5,1,1,3]},{"type":"if","position":[5,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,3]},{"type":"component","position":[1,3],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1,3]},{"type":"if","position":[5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[9,1,1]},{"type":"if","position":[9,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[9,1,2]},{"type":"if","position":[9,1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["module","fields","ageindays","criteria","showAdd","showRemove","selectCond","formCond","criteriaIndex","andOrCondition","ageindays","selectUser","ageInDays","dueInDays","nocCondition","users","dropdowndata","pickList","lookup","criteriaObject","setCriteriaObj","tags","layout","emptyFieldShow","emptyPicklistShow","searchValue","showEmpty","condArray","dataType","callModule","lookupField","betweenCond","elementsCond","noneCondition","ageInDaysCond","disableText","displayField","showComparator","selectedAgeInDays","showFieldsDropdown","cxPropShowLoggedInUser","gotFields","gotComparator","cxPropNoneField","showFieldInTitle","numberFieldException","unusedField","textAreaMaxLength","maxLen","cxPropShowAllFields","cxPropBoundary","cxPropAppearance","prefixArray","selectedArray","showArray","showExtraColumn","showField","showFieldsCriteria","dynamicColumn","textMaxLength","criteriaNumber","moduleMapping","moduleRecordMapping","disabledListDropdown","boxButtonWidth","undefinedData","currencyProperties","tabIndex","datePattern","timeFormat","timeZone","cxPropId","cxPropLayout","userComponentProperties","emptyObject","emptyArray","secondaryModule","dynamicTypeValue","showSecondaryModuleDropdown","secondaryModuleDisplayName","ageInDaysMax","dynamicTypeValueSelected","hideSecondayModule","disabledDynamicValueDropdown","showFieldErrorMsg","showCondErrorMsg","showValueErrorMsg","showSecFieldErrorMsg","dynamicallyFedField","dynamicTypeValueOptions","roleComponentRequestModal","hideFieldComparatorValue","relatedFields","hidePrimarySelectedField","tooltipConfig","showErrorForEmptyCriteria","cxPropForceSetCondition","cxPropDisabled","cxPropDisabledGroupOperator","roleComponentProperties","profileComponentProperties","queryParam","userTypeField","allowEmptyChildCriteria","alwaysShowChildCriteria","showChildCriteria","childCriteriaCheckboxLael","childCriteriaCheckboxTitle","hideCriteriaAddRemove","disabledChildCriteria","disabledRecordStateConfig","previousNextComp","changePreviousNextSelected","maskingProperties"],
_observedAttributesType :["string","array","array","number","boolean","boolean","string","string","number","string","array","boolean","boolean","boolean","boolean","array","array","boolean","boolean","object","object","array","array","boolean","boolean","string","boolean","array","string","string","string","boolean","string","boolean","boolean","string","object","boolean","object","boolean","boolean","boolean","boolean","boolean","boolean","object","object","number","number","boolean","object","string","array","array","object","boolean","boolean","boolean","boolean","number","string","array","object","array","string","object","object","number","string","string","string","string","string","object","object","array","string","boolean","boolean","string","number","string","boolean","boolean","string","string","string","string","boolean","array","string","boolean","array","boolean","string","boolean","boolean","boolean","boolean","object","object","object","object","boolean","boolean","boolean","string","string","object","boolean","boolean","boolean","string","object"],
 //No I18N
	data : function(){
		return {
			module : Lyte.attr("string"), //No I18N
			fields : Lyte.attr("array",{default : []}),//No I18N
			ageindays : Lyte.attr("array"),//No I18N
			criteria : Lyte.attr("number"),//No I18N
			showAdd : Lyte.attr('boolean'),//No I18N
			showRemove : Lyte.attr('boolean'),//No I18N
			selectCond : Lyte.attr('string'),//No I18N
			formCond : Lyte.attr('string'),//No I18N
			criteriaIndex : Lyte.attr('number'),//No I18N
			andOrCondition : Lyte.attr('string'), //No I18N
			ageindays :  Lyte.attr('array'), // no i18n
			selectUser : Lyte.attr('boolean',{default : false}),//No I18N
			ageInDays : Lyte.attr('boolean',{default : false}), //No I18N
			dueInDays :Lyte.attr('boolean',{default : false}), //No I18N
			nocCondition : Lyte.attr('boolean',{default : false}), //no i18n
			users : Lyte.attr('array'),//No I18N
			dropdowndata : Lyte.attr('array'),//No I18N
			pickList : Lyte.attr('boolean'),//No I18N
			lookup : Lyte.attr('boolean'), //No I18N
			criteriaObject : Lyte.attr('object'), //No I18N
			setCriteriaObj : Lyte.attr('object'), //No I18N
			tags : Lyte.attr('array'),//No I18N
			layout : Lyte.attr('array'),//No I18N
			emptyFieldShow : Lyte.attr('boolean',{default :false}), //NO I18N
			emptyPicklistShow : Lyte.attr('boolean',{default :false}), //No I18N
			searchValue : Lyte.attr('string'), // No I18N
			showEmpty : Lyte.attr('boolean',{default : false}), //No I18N
			condArray : Lyte.attr('array'), //No I18n
			dataType : Lyte.attr('string',{default : ''}), //no i18n
			callModule : Lyte.attr('string',{default : ''}), //no i18n
			lookupField : Lyte.attr('string',{default : ''}), //no i18n
			betweenCond : Lyte.attr('boolean',{default : false}), //no i18n
			elementsCond : Lyte.attr('string'),  //no i18n
			noneCondition : Lyte.attr('boolean',{default : true}),  //no i18n
			ageInDaysCond : Lyte.attr('boolean',{default : false}),  //no i18n
			disableText : Lyte.attr('string'), //no i18n
			displayField : Lyte.attr('object'), //No I18n
			showComparator : Lyte.attr('boolean',{default : true}),//No I18N
			selectedAgeInDays : Lyte.attr('object'), //No I18N
			showFieldsDropdown : Lyte.attr('boolean',{default : false}), //No I18N
			cxPropShowLoggedInUser : Lyte.attr('boolean'), //No I18N
			gotFields : Lyte.attr('boolean',{default : false}), //No I18N
			gotComparator : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropNoneField : Lyte.attr('boolean'), //no i18n
			showFieldInTitle : Lyte.attr('boolean',{default : false}), //no i18n
			numberFieldException : Lyte.attr('object',{default : { 'Solutions':"Solution_Number",'Invoices':"Invoice_Number",'SalesOrders':"SO_Number",'Quotes':"Quote_Number",'Cases':"Case_Number"}}), //no i18n
			unusedField : Lyte.attr('object'), //no i18n
			textAreaMaxLength : Lyte.attr('number'), //no i18n
			maxLen : Lyte.attr('number'), //no i18n
			cxPropShowAllFields : Lyte.attr('boolean'), //no i18n
			cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
            cxPropAppearance: Lyte.attr('string', {default: 'flat'}),    //NO I18N
			prefixArray : Lyte.attr('array',{default : []}), //no i18n
			selectedArray : Lyte.attr('array',{default : []}), //no i18n
			showArray : Lyte.attr('object',{default : {}}), //no i18n
			showExtraColumn : Lyte.attr('boolean',{default : []}), //no i18n
			showField : Lyte.attr('boolean',{default : true}), //no i18n
			showFieldsCriteria : Lyte.attr('boolean',{default : true}), //no i18n
			dynamicColumn : Lyte.attr('boolean'), //no i18n
			textMaxLength : Lyte.attr('number'), //no i18n
			criteriaNumber : Lyte.attr('string'), //no i18n
			moduleMapping : Lyte.attr('array'), //no i18n
			moduleRecordMapping : Lyte.attr('object'), //no i18n
		    disabledListDropdown : Lyte.attr('array',{default : ["prevent"]}),//no i18n
		    boxButtonWidth : Lyte.attr('string'),//no i18n
		    undefinedData : Lyte.attr('object'), //no i18n
		    currencyProperties : Lyte.attr('object'), //no i18n
		    tabIndex : Lyte.attr('number'), //no i18n
		    datePattern : Lyte.attr('string'), //no i18n
		    timeFormat : Lyte.attr('string'), //no i18n
		    timeZone : Lyte.attr('string'), //no i18n
		    cxPropId : Lyte.attr('string'), //no i18n
		    cxPropLayout : Lyte.attr('string'), //no i18n
		    userComponentProperties : Lyte.attr('object'), //no i18n
	      	emptyObject : Lyte.attr('object',{default : {}}), //no i18n
	      	emptyArray : Lyte.attr('array',{default : []}), //no i18n
			secondaryModule : Lyte.attr('string'), //no i18n
			dynamicTypeValue : Lyte.attr('boolean'), //no i18n
			showSecondaryModuleDropdown : Lyte.attr('boolean'), //no i18n
			secondaryModuleDisplayName : Lyte.attr('string'), //no i18n
	      	ageInDaysMax : Lyte.attr('number',{default : 9999}), //no i18n
	      	dynamicTypeValueSelected : Lyte.attr('string',{default : 'value'}), //no i18n
	      	hideSecondayModule : Lyte.attr('boolean',{default : false}), //no i18n
	      	disabledDynamicValueDropdown : Lyte.attr('boolean',{default : false}), //no i18n
	      	showFieldErrorMsg : Lyte.attr('string'), //no i18n
	      showCondErrorMsg : Lyte.attr('string'), //no i18n
	      showValueErrorMsg : Lyte.attr('string',{default : ""}), //no i18n
	      showSecFieldErrorMsg : Lyte.attr('string'), //no i18n
	      	dynamicallyFedField : Lyte.attr('boolean',{default : false}), //no i18n
	      	dynamicTypeValueOptions : Lyte.attr('array'), //no i18n
	      	roleComponentRequestModal : Lyte.attr('string',{default : 'role'}), //no i18n
	      	hideFieldComparatorValue : Lyte.attr('boolean',{default : false}), //no i18n
	      	relatedFields : Lyte.attr('array',{default : []}), //no i18n
	      	hidePrimarySelectedField : Lyte.attr('boolean',{default : false}), //no i18n
	      	tooltipConfig : Lyte.attr('string'), //no i18n
	      	showErrorForEmptyCriteria : Lyte.attr('boolean'), //no i18n
	      	cxPropForceSetCondition : Lyte.attr('boolean'), //no i18n
	      	cxPropDisabled : Lyte.attr('boolean',{default : false}), //no i18n
	      	cxPropDisabledGroupOperator : Lyte.attr('boolean',{default : false}), //no i18n
			roleComponentProperties : Lyte.attr('object'),
			profileComponentProperties : Lyte.attr('object'),
			queryParam : Lyte.attr('object', {default : {}}),
			userTypeField : Lyte.attr('object'),
	      	allowEmptyChildCriteria : Lyte.attr('boolean'), //no i18n
	      	alwaysShowChildCriteria : Lyte.attr('boolean'), //no i18n
	      	showChildCriteria : Lyte.attr('boolean'), //no i18n
	      	childCriteriaCheckboxLael : Lyte.attr('string',{default : 'Add condition'}),
	      	childCriteriaCheckboxTitle : Lyte.attr('string',{default : ''}),
	      	hideCriteriaAddRemove : Lyte.attr('object'),
	      	disabledChildCriteria : Lyte.attr('boolean',{default : true}),
	      	disabledRecordStateConfig : Lyte.attr('boolean'), //no i18n
			previousNextComp : Lyte.attr('boolean',{default : false}), //no i18n
			changePreviousNextSelected : Lyte.attr('string',{default : 'days'}), //no i18n
			maskingProperties : Lyte.attr('object') //no i18n
		}
	},
	init : function(){
		this.setData('showChildCriteria',this.data.alwaysShowChildCriteria); //no i18n
		this.moduleApiMapping = {};
		this.moduleIdMapping = {};
		this.hideDropdowns(0);
		if(this.data.prefixArray.length >= 1){
			this.setData('showField',false); //no i18n
		}
		this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
		if(this.getData('setCriteriaObj')&&Object.keys(this.getData('setCriteriaObj')).length!=0){
			this.setCriteria(this.getData('setCriteriaObj'));//No I18N
		}else if(!this.getData('cxPropNoneField') && this.data.prefixArray.length == 0){ //no i18n
			var field = this.executeMethod('getFieldsForHeader',true); //No I18N
			Lyte.arrayUtils(this.getData('fields'),'push',field);//No I18Nshow
			this.setData('selectedField',field); //No I18N
			this.changeFieldFunction(true);
		}else{
			if(this.data.prefixArray.length > 0){
				for(var i=0;i<this.data.prefixArray.length;i++){
					var prefix = this.getData('prefixArray')[i];
					var value={}
					if(i == 0 && (prefix.cxPropDisableNone || prefix.type == 'text')){
						var data = this.executeMethod("getPrefixValues", 0, this.getData("selectedArray"), this.getDeveloperArg(0 - 1, this.data.selectedArray),undefined,undefined,this.data.criteriaIndex); //no i18n
						Lyte.Component.set(this.getData('showArray'),prefix.apiValue,data)//No I18N
						value[prefix.systemValue] = data[0][prefix.systemValue];
						value[prefix.displayValue] = data[0][prefix.displayValue];
					}else{
						value[prefix.systemValue] = '-1';
						value[prefix.displayValue] = _cruxUtils.getI18n('None');
					}

					var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
					Lyte.arrayUtils(this.data.selectedArray,'push',criteria); //NO I18N
					if(prefix.type == 'text'){
						this.hideDropdowns(i+1);
					}
				}
			}
			var checkingSomething
			var _this = this;
			if(this.data.prefixArray && this.data.prefixArray.length > 0 && this.data.prefixArray[0].cxPropDisableNone && this.getData('showArray')[this.data.prefixArray[0].apiValue]){
				var prefix = this.getData('prefixArray')[0];
				if(prefix.apiValue == 'module'){
					this.setData('module',this.getData('showArray')[prefix.apiValue][0].lookup ? this.getModuleFromApiName(_this.getData('showArray')[prefix.apiValue][0].lookup.module.api_name,this.data.moduleRecordMapping) : this.getData('showArray')[prefix.apiValue][0].module_name ? this.getData('showArray')[prefix.apiValue][0].module_name : this.getData('showArray')[prefix.apiValue][0][prefix.systemValue])
				}
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : this.getData('showArray')[prefix.apiValue][0]};//No I18N
				this.executeMethod('getPrefixValues',this.getData('prefixArray')[1] ? 1 : -1,this.getData('selectedArray'),this.getDeveloperArg(0,this.data.selectedArray),undefined,undefined,this.data.criteriaIndex); //no i18n
				this.changePrefixFunction(0);
			}
			this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
			this.changeFieldFunction(true);
		}
		if(!this.data.showFieldsCriteria){
			var a = this.executeMethod('getPrefixArray',this.data.prefixArray.length-1,this.getData('selectedArray'),this.getDeveloperArg(this.data.prefixArray.length-1,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			if(a){
				if(typeof a.cxPropShowChildCriteria !== 'undefined'){
					this.setData('showChildCriteria',a.cxPropShowChildCriteria);
				}
				if(a.cxPropChildCriteriaConditionLabel){
					this.setData('childCriteriaCheckboxLael',a.cxPropChildCriteriaConditionLabel);
				}
				if(a.cxPropChildCriteriaConditionTitle){
					this.setData('childCriteriaCheckboxTitle',a.cxPropChildCriteriaConditionTitle);
				}
				if(typeof a.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',a.cxPropDisableChildCriteria);
				}
			}
		}
		if(this.data.dynamicColumn){
			this.setData('showFieldsCriteria',false);//No I18N
		}
	},
	hideDropdowns : function(index){
		var preLen = this.data.prefixArray ? this.data.prefixArray.length : 0;
		for(var i=0;i<preLen;i++){
			if(i<=index){
				Lyte.Component.set(this.getData('prefixArray')[i],'showValue',true); //no i18n
			}else{
				var prefix = this.getData('prefixArray')[i];
				var value={}
				value[prefix.systemValue] = '-1';
				value[prefix.displayValue] = _cruxUtils.getI18n('None');
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',i,criteria); //no i18n
				}
				Lyte.Component.set(this.getData('prefixArray')[i],'showValue',false); //no i18n
			}
		}
		this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
		this.setData('selectedComparator',{system: "None", display: _cruxUtils.getI18n('None')}) //no i18n
		this.setData('showEmpty',false); //No I18N
		this.setData('selectUser',false);//No I18N
		this.setData('pickList',false);//No I18N
		this.setData('showFieldErrorMsg',undefined);
		this.setData('showCondErrorMsg',undefined);
		this.setData('showSecFieldErrorMsg',undefined);
		this.setData('showValueErrorMsg',"")
		this.setData('lookup',false); //No I18N
		this.setData('betweenCond',false) //no i18n
		this.setData('ageInDaysCond',false); //no i18n
		this.setData('noneCondition',true); //no i18n
		this.setData('disableText',''); //no i18n
		this.setData('value',[""]); //no i18n
		this.setData('fcomp',undefined); //no i18n
		if(this.getData('prefixArray') && this.getData('prefixArray').length == index){
			this.setData('showField',true); //no i18n
		}else{
			this.setData('showField',false); //no i18n
		}
		this.setData('showComparator',true) //no i18n
	},
	getValue : function(skipValidation,valueValidation,inlineMessage,criteriaHeaderOpt){
		this.setData({showFieldErrorMsg : undefined,showCondErrorMsg : undefined,showValueErrorMsg : "",showSecFieldErrorMsg : undefined});
		this._skipVal = skipValidation;
		this.showInlineMsg = inlineMessage;
		var d=this.$node;
		var mainDiv = d.querySelector('#searchval_div'); //No I18N
		var value=this.getData('fvalue'); //No I18N
		var type = this.data.dynamicTypeValueSelected;//No I18N
		if(this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected == 'field' || !this.data.dynamicTypeValue) && !this.getData('noneCondition')){
			type = 'field';//No I18N
			if(!this.data.dynamicallyFedField){
				// value = '${!'+this.data.secondaryModule+'.'+this.data.selectedSecField.api_name+'}'
				value={};
				value.api_name = this.modifyApiName(this.data.selectedSecField.api_name,this.data.selectedSecField);
				value.id = this.data.selectedSecField.id;
				value.fieldRecord = this.data.selectedSecField
				// var metaData = {}
				// metaData.condition_value = value;
				// metaData.field = (({ api_name,field_label,id }) => ({ api_name,field_label,id }))(this.data.selectedSecField);
				// metaData.module = {api_name : this.data.secondaryModule};
				// this.executeMethod('criteriaMetaMethod',metaData); //no i18n
			}
		}else{
			type = this.data.dynamicTypeValueSelected;//No I18N
			var apiModification;
			if(this.data.dynamicElementComponentRender && !this.getData('noneCondition')){
				var dynamicDiv=mainDiv.querySelector('.cxCriteriaDynamicElement'); //No I18N
				if(!dynamicDiv || (!dynamicDiv.component.validate() && !skipValidation)){
					_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
					this._skipVal = undefined
					this.showInlineMsg = undefined
					return false;
				}
				value=dynamicDiv.component.getValue();
			}else{
				if(this.getData('ageInDaysCond')){
					if(this.data.betweenAgeInDaysCond){
						var numdiv1=mainDiv.querySelector('#ageValueInput1'); //No I18N
						var numdiv2=mainDiv.querySelector('#ageValueInput2'); //No I18N
						if((!numdiv1.component.validate() || !numdiv2.component.validate())  && !skipValidation){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						var value1 = numdiv1.component.getValue();
						value1 = value1.trim();
						var value2 = numdiv2.component.getValue();
						value2 = value2.trim();
						value= ['${NOC'+value1+'}' , '${NOC'+value2+'}']
					}else{
						var numdiv=mainDiv.querySelector('crux-number-component'); //No I18N
						if(!numdiv.component.validate() && !skipValidation){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						var val=numdiv.component.getValue();
						val = val.trim();
						if(this.data.previousNextComp){
							value="${"
							value+= this.data.selectedComparator.system === 'previous' ? 'LAST_N_' : 'NEXT_N_'
							value+= this.data.changePreviousNextSelected.toUpperCase();
							value+="}:"
							value+= val;
						}else if(this.getData('ageInDays')){
							value='${AGEINDAYS}+'+val;//No I18N
						}else if(this.getData('dueInDays')){//No I18N
							value='${DUEINDAYS}+'+val;//No I18N
						}else if(this.data.nocCondition){
							value='${NOC'+val+'}';//no i18n
						}
					}
				}
				else if(this.getData('betweenCond')){
					if((!mainDiv.querySelector('#betweenComponent1').component.validate() || !mainDiv.querySelector('#betweenComponent2').component.validate()) && !skipValidation){
						_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
						this._skipVal = undefined
						this.showInlineMsg = undefined
						return false;
					}
					var value1 = mainDiv.querySelector('#betweenComponent1').component.getValue();  //no i18n
					var value2 = mainDiv.querySelector('#betweenComponent2').component.getValue();  //no i18n
					if(this.data.elementsCond == 'number'){
						value1 = value1.trim();
						value2 = value2.trim();
					}
					value=[value1,value2]
				}else if(!this.getData('noneCondition')){ //no i18n
					if(!mainDiv.querySelector('#elementComponent').component.validate() && !skipValidation){
						this._skipVal = undefined
						this.showInlineMsg = undefined
						return false;
					}
					value = mainDiv.querySelector('#elementComponent').component.getValue(this.data.dynamicTypeValueSelected === 'record_category' ? 'actual_value' : ''); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
					value = Array.isArray(value) && value.length == 1 ? value[0] : value;
					if(value && typeof value == 'string'){
						value = value.trim();
					}
					if(this.data.elementsCond == 'number'){
						value = value.trim();
					}
					if(this.data.selectCond == 'text' && Array.isArray(value)){
						var temp = [];
						for(var i=0;i<value.length;i++){
							if(value[i].trim() != ""){
								temp.push(value[i].trim());
							}
						}
						if(temp.length == 0){
							this.executeMethod('onValueError',this.getData('criteriaIndex'),_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData('selectedField').field_label))); //no i18n
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						value = temp;
					}
					if(this.data.selectedField.ui_type==137){
		                var temp=[]
		                if(Array.isArray(value)){
		                    for(var i=0;i<value.length;i++){
		                    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value[i]}  );//eslint-disable-line no-loop-func
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].api_name);
						    	}
						    	else{
		                            temp.push(value[i]);

						    	}
						    }
					    }
					    else{
					    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value}  );
					    	if(recordObj[0]){
					    		temp.push( recordObj[0].api_name);//eslint-disable-line no-loop-func
					    	}
					    	else{
		                        temp.push(value);
					    	}
					    }
		                value=temp;
		                temp = [];
		                if(Array.isArray(value)){
		                    for(var i=0;i<value.length;i++){
		                      	var api_name ={"api_name":value[i].trim()};
		                      	temp[i]=api_name;
		                    }
		                }
		                else{
		                    var api_name ={"api_name":value.trim()};  //no i18n
		                    temp[0]=api_name;
		                }
		                value=temp;
		            }
					if(this.data.selectedField.api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
						if(Array.isArray(value)){
							var temp=[]
							for(var i=0;i<value.length;i++){
								temp.push(Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value[i]})[0].api_name)//eslint-disable-line no-loop-func
							}
							value = temp
						}else{
							value = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value})[0].api_name
						}
					}
					if(this.data.selectedField.data_type == 'multi_module_lookup'){
						apiModification = value.module
						value = value.name;
					}
				}
			}
		}
		var criteria={}
		field=Object.assign({},this.getData('selectedField')) //no i18n
		criteria.field = {};
		criteria.field.api_name = this.modifyApiName(field.api_name,field,apiModification);
		criteria.field=Object.assign(criteria.field,{id : field.id,field_label : field.field_label,data_type : field.data_type});
		if(criteria.field.data_type == 'formula'){
			criteria.field.formula = field.formula
		}
		if(criteria.field.data_type == 'rollup_summary'){
			criteria.field.rollup_summary = field.rollup_summary
		}
		if(field.decimal_place){
			criteria.field.decimal_place = field.decimal_place
		}
		if(field.separator){
			criteria.field.separator = field.separator
		}
		criteria.comparator = this.getData('ageInDaysCond') ? this.getData('selectedAgeInDays').system : this.getData('fcomp') ? this.getData('fcomp') : this.getData('selectedComparator').system; //No I18N
		criteria.value = value;
		criteria.type = type;
		if(this.data.selectedComparator.system == 'equal_role' || this.data.selectedComparator.system=='not_equal_role'){
			criteria.field.api_name = criteria.field.api_name+'.role';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-5)
		}
		if(this.data.selectedComparator.system == 'equal_group' || this.data.selectedComparator.system=='not_equal_group'){
			criteria.field.api_name = criteria.field.api_name+'.group';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-6)
		}
		if(this.data.selectedComparator.system == 'equal_type' || this.data.selectedComparator.system=='not_equal_type'){
			criteria.field.api_name = criteria.field.api_name+'.type__s';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-5)
		}
		criteria.fieldRecord = this.getData('selectedField'); //no i18n
		var checField = skipValidation || !this.data.showFieldsCriteria ? true : this.checkValuesCondition(criteria,valueValidation);
		if(checField){
			if(criteria.field.api_name.match(/Tag/) && this.getData('selectedField').module && this.getData('selectedField').module[0].module_name == 'Activities'){
				var g = [];
				g.push({comparator:criteria.comparator  ,field :{api_name : 'Tag', id : criteria.field.id},value : criteria.value})
				g.push({comparator:"equal" ,field :{ api_name : "Activity_Type"},value : criteria.field.api_name.split('.')[0]})
				criteria = {group_operator : 'AND', group : g} //no i18n
			}
			if(this.data.prefixArray.length >= 1){
				if(this.data.criteriaFormat == 'quoteLineItem'){
					var secCri = {}
					var quoteModule = this.data.selectedArray[1].value[this.data.prefixArray[1].systemValue];
					secCri.field = {api_name : this.data.selectedArray[0].value[this.data.prefixArray[0].systemValue]+'->'+quoteModule+'.'+this.data.displayField[quoteModule][0]};
					secCri.comparator = 'equal' //no i18n
					secCri.value = this.data.selectedArray[2].value[this.data.prefixArray[2].displayValue]
					criteria = this.joinCriteria(secCri,criteria);
				}else if(this.data.criteriaFormat === 'relatedModuleChildCriteria' && (!criteriaHeaderOpt || !criteriaHeaderOpt.skipChildren)){
					var childC;
					if(this.data.showChildCriteria){
						var cNode =  this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex);
						childC = cNode && cNode.getCriteria({skipValidation : skipValidation});
					} 
					if(!childC && !this.data.allowEmptyChildCriteria){
						return childC;
					}
					var pC = {}
					this.data.selectedArray.forEach(function(item){
						pC[item.api_name] = item.value;
					})
					pC.criteria = childC;
					criteria = pC
				}else{
					var md = this.data.prefixArray.filter(function(item){return item.apiValue == 'module'})[0];
					if(md && criteria.field){
						var index = this.data.prefixArray.indexOf(md);
						criteria.field.api_name =this.data.selectedArray[index].value[this.data.prefixArray[index].systemValue]+'.'+criteria.field.api_name;
					}
					if(!this.data.showFieldsCriteria){
						criteria = {}
					}
					for(var i=this.data.prefixArray.length -1;i>=0;i--){
						if(this.data.prefixArray[i].apiValue != 'module'){
							criteria = this.joinCriteria(this.data.selectedArray[i],criteria);
						}
					}
				}
			}
			this._skipVal = undefined
			this.showInlineMsg = undefined
			return criteria;
		}
		this._skipVal = undefined
		this.showInlineMsg = undefined
		return checField;
	},
	modifyApiName : function(api,field,apiModification){
		if(["Activities","Calls","Events","Tasks"].indexOf(this.data.module) > -1){
			if(api.endsWith('What_Id') || field.api_name.endsWith('What_Id.name')){
		 		return api
		 	}
		 	if(this.data.apiVersion == 'criteria' && (api.endsWith('Who_Id') || field.api_name.endsWith('Who_Id.name'))){
		 		return api
		 	}
		}else if(api == 'Data_Processing_Basis' && this.data.apiVersion != 'EQL'){ //no i18n
			return 'Data_Processing_Basis_Details.Data_Processing_Basis'; //no i18n
		}

		if(field.data_type == 'lookup' && field.lookup && field.lookup.module){
			if(this.getData('displayField')[this.getModuleFromId(field.lookup.module.id,this.data.moduleRecordMapping)]){
				return api +'.'+this.getData('displayField')[this.getModuleFromId(field.lookup.module.id,this.data.moduleRecordMapping)][0];
			}else{
				return api +'.'+'Name';
			}
		}

		if(field.data_type == 'multi_module_lookup' && apiModification){
			if(this.getData('displayField')[this.getModuleFromId(apiModification.id,this.data.moduleRecordMapping)]){
				return api +'->'+apiModification.api_name+'.'+this.getData('displayField')[this.getModuleFromId(apiModification.id,this.data.moduleRecordMapping)][0];
			}else{
				return api +'->'+apiModification.api_name+'.Name';
			}
		}

		return api;
	},
	checkValuesCondition : function(item,valueValidation){
		var obj=item.field,errorMsg;
		if(this.data.selectedArray && this.data.selectedArray.length && this.data.selectedArray[0].value[this.data.prefixArray[0].systemValue] == -1){
			if(this.data.criteriaIndex != 1 || this.data.totalCriteria > 1){
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header.js", "Feb Default Changes");
				// this.throwEvent('alertEvent',this.data.prefixArray[0].cxPropErrorMsg,this.data.prefixArray[0],this.data.criteriaIndex);  //No I18N
				if(!this._skipVal){

					var em = this.executeMethod('onValueError',this.getData('criteriaIndex'),this.data.prefixArray[0].cxPropErrorMsg,this.data.prefixArray[0]); //no i18n
					if(em && this.showInlineMsg){
						Lyte.Component.set(this.data.prefixArray[0],'showError',em);
					}
				}
				return false;
			}
			return undefined;
		}
		if(obj.api_name == "" || obj.api_name=="None" || obj.api_name==null){
			if(this.data.prefixArray && this.data.prefixArray.length == 0 && this.data.criteriaIndex == 1 && this.data.totalCriteria == 1 && !this.data.showErrorForEmptyCriteria){
				return undefined
			}
			if(!this._skipVal){
				if(this.showInlineMsg){
					this.setData('showFieldErrorMsg',_cruxUtils.getI18n('crux.criteria.fieldlabel.valid.check',this.data.criteriaIndex) ) //No I18N 
				}else{
					this.throwEvent('alertEvent',_cruxUtils.getI18n('crm.criteria.fieldlabel.valid.check',this.data.criteriaIndex));  //No I18N
				}
			}
			return false;
		}
		else if(item.comparator == "" || item.comparator=="None" || item.comparator===null){
			errorMsg = _cruxUtils.getI18n('crm.criteria.condition.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)) //No I18N 
			if(!valueValidation && !this._skipVal){
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
				if(this.showInlineMsg){
					this.setData('showCondErrorMsg',errorMsg) //No I18N 
				}else{
					this.throwEvent('alertEvent',errorMsg);  //No I18N
				}
				return false;
			}
			return undefined;
		}else if(!this.data.selectedField.cxPropIgnoreEmptyValue && (item.value === "" || item.value === null)){
			errorMsg = _cruxUtils.getI18n('crm.field.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)) //No I18N 
			if(this.showInlineMsg){
				this.setData('showValueErrorMsg',errorMsg) //No I18N 
			}else{
				this.throwEvent('alertEvent',errorMsg);  //No I18N
			}
			return false;
		}else if(!this.data.dynamicallyFedField && this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected =='field' || !this.data.dynamicTypeValue) && this.data.selectedSecField.id == '-1'){
			errorMsg = _cruxUtils.getI18n('crm.field.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)); //No I18N
			if(!this._skipVal){
				if(this.showInlineMsg){
					this.setData('showSecFieldErrorMsg',errorMsg ) //No I18N 
				}else{
					this.throwEvent('alertEvent',errorMsg);  //No I18N
				}
			}
			return false;
		}
		else if(item.comparator.match(/between/)){
			var data_type = item.field.data_type
			if(data_type == 'formula'){
				data_type = item.field.formula.return_type;
			}
			if(data_type == 'rollup_summary'){
				data_type = item.field.rollup_summary.return_type;
			}
			if(data_type == 'time'){
				return true;
			}
			if(data_type == 'datetime' || data_type == 'date'){
				if(item.value[0]>item.value[1]){
					errorMsg = _cruxUtils.getI18n('crm.custom.field.less.than.equalto',_cruxUtils.getI18n('workflow.option.webhookFailure.fromDate'),_cruxUtils.getI18n('workflow.option.webhookFailure.toDate')) //No I18N 
					if(this.showInlineMsg){
						this.setData('showValueErrorMsg',errorMsg) //No I18N 
					}else{
						this.throwEvent('alertEvent',errorMsg);  //No I18N
					}
					return false;
				}
			}else {
				if(( item.value[0].match('NOC') && parseFloat(item.value[0].replace(/\D/g, '')) >= parseFloat(item.value[1].replace(/\D/g, '')) ) || parseFloat(item.value[0]) >= parseFloat(item.value[1])) {
					errorMsg = _cruxUtils.getI18n('crm.custom.field.less.than.to') //No I18N 
					if(this.showInlineMsg){
						this.setData('showValueErrorMsg',errorMsg) //No I18N 
					}else{
						this.throwEvent('alertEvent',errorMsg);  //No I18N
					}
					return false;
				}
			}
		}
		return true;
	},
	joinCriteria : function(c1,c2){
		if(Object.keys(c1).length == 0){
			return c2
		}
		if(Object.keys(c2).length == 0){
			return c1
		}
		var c={};
		c.group_operator = 'and'; //no i18n
		c.group=[];
		c.group[0]=c1;
		c.group[1]=c2;
		return c;
	},
	setCriteria : function(criteriaObj){
		this.setData('showEmpty',false); //No I18N
		this.setData('selectUser',false);//No I18N
		this.setData('pickList',false);//No I18N
		this.setData('lookup',false); //No I18N
		this.setData('betweenCond',false) //no i18n
		this.setData('ageInDaysCond',false); //no i18n
		this.setData('noneCondition',true); //no i18n
		this.setData('value',undefined); //no i18n
		this.setData('fcomp',undefined); //no i18n
		var criteriaArray=[]
		if(criteriaObj.field == undefined){
			criteriaArray = this.getCriteriaArray(criteriaObj,[]);
		}
		else{
			criteriaArray.push(criteriaObj);
		}
		if(this.data.prefixArray.length > 0 && criteriaArray.length < 2 && this.data.prefixArray.cruxFindIndexOfObject('apiValue','module') > -1){
			var array=this.getModuleFromCriteria(criteriaArray[criteriaArray.length-1]);
			this.setData('module', array[0].value.lookup ? this.getModuleFromApiName(array[0].value.lookup.module.api_name,this.data.moduleRecordMapping) : array[0].value.module_name ? array[0].value.module_name : this.getModuleFromApiName(array[0].value.api_name,this.data.moduleRecordMapping))
			criteriaArray.splice(criteriaArray.length-1,1);
			criteriaArray = criteriaArray.concat(array);
		}
		var criteriaFormat = this.data.criteriaFormat;
		var criteria
		if(criteriaFormat == 'quoteLineItem' && criteriaArray[0].field && criteriaArray[0].field.api_name.match('->') && criteriaArray.length == 1){
			criteriaFormat = 'quoteLineItem5'; //no i18n
		}else{
			if(this.data.showFieldsCriteria){
				criteria= criteriaArray.pop();	
			}
 			
		}
		if(criteriaFormat == 'quoteLineItem' || criteriaFormat == 'quoteLineItem5'){
			this.setData('selectedArray',this.parseCriteriaArray(criteriaArray)); //NO I18N
		}else if(criteriaFormat == 'relatedModuleChildCriteria'){
			var criteriNewArray = []
			this.data.prefixArray.forEach(function(item,index){
			    criteriNewArray.push({api_name : item.apiValue,comparator : 'equal',value : criteriaObj[item.apiValue]})
			    Lyte.Component.set(this.getData('prefixArray')[index],'showValue',true); //no i18n
			}.bind(this));
			if(criteriaObj.criteria){
				
				this.setData('childSetCriteria',criteriaObj.criteria)
				this.setData('childCriteria',true);
				this.setData('disabledChildCriteria',false);
				this.setData('showChildCriteria',true);
			}
			this.setData('selectedArray',criteriNewArray)
		}else{
			this.setData('selectedArray',criteriaArray); //NO I18N
		}
		if(criteriaFormat != 'quoteLineItem5' && criteriaFormat != 'relatedModuleChildCriteria'){
			var unformattedFieldApi = criteria.field.api_name,multiModule;
			criteria.rawField = Object.assign({},criteria.field)
			this.executeMethod('setFieldForCriteria',criteria); //no i18n
			Lyte.arrayUtils(this.getData('fields'),'push',criteria.field);//No I18N
			// if(criteria.field.unused){
			// 	this.setData('unusedField',criteria.field); //no i18n
			// }
			this.setData('selectedField',criteria.field); //No I18N
			var formulaDate = false;
			if(criteria.field.data_type == 'formula' || criteria.field.data_type == 'rollup_summary'){
				formulaDate = true;
			}
			var ageCond,ageValue;
			var condition=criteria.comparator;
			var value=criteria.value;
			var val=[];
			if(criteria.type != 'dynamic_component' && ((Array.isArray(value) && typeof value[0] == 'string' && value[0].match('NOC')) || (typeof value == 'string' && value.match(/\{/)) && (this.getData('selectedField').data_type == 'datetime' || this.getData('selectedField').data_type == 'date'|| formulaDate || value.match('NOC') || value == '${EMPTY}' || value == '${OPEN}' || value == '${CLOSEDWON}' || value == "${CLOSEDLOST}" || value == '${C_OPEN}' || value == '${C_COMPLETED}' || value == '${C_FAILED}' || value == '${NOTEMPTY}' || this.getData('selectedField').api_name.match(/Call_Status/)))){
					if(Array.isArray(value) && value[0].match('NOC')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Number of Characters';//No I18N
						val[0]=value[0].replace(/\D/g, '');
						val[1]=value[1].replace(/\D/g, '');
						this.setData('betweenAgeInDaysCond',true);
					}else if(value.match('LAST_N')){
						condition = 'previous'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						value=value.replace(/\D/g, '');
						this.setData('previousNextComp',true);
					}else if(value.match('NEXT_N')){
						condition = 'next'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						value=value.replace(/\D/g, '');
						this.setData('previousNextComp',true);
					}else if(value.match('DUEINDAYS')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Due in Days';//No I18N
						value=value.replace(/\D/g, '');
					}else if(value.match('AGEINDAYS')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Age in Days';//No I18N
						value=value.replace(/\D/g, '');
					}else if(value.match('NOC')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Number of Characters';//No I18N
						value=value.replace(/\D/g, '');
					}else{
						if((condition == 'equal' || condition == 'contains') && value == '${EMPTY}'){
							condition = '${EMPTY}'//No I18N
						}else if(value == '${EMPTY}' || value == '${NOTEMPTY}'){//No I18N
							condition = '${NOTEMPTY}'//No I18N
						}else{
							condition = value;
						}
					}
			}
			this.setData('dynamicTypeValueSelected',criteria.type);
			if(criteria.field.data_type == 'userlookup' || criteria.field.data_type == 'ownerlookup'){
				if(criteria.rawField.api_name.indexOf('.role') > -1){
					condition = condition+'_role'
				}else if(criteria.rawField.api_name.indexOf('.group') > -1){
					condition = condition+'_group'
				}else if(criteria.rawField.api_name.indexOf('.type__s') > -1){
					condition = condition+'_type'
				}
			}
			this.changeFieldFunction(undefined,condition);
			this.setData('showField',true); //no i18n
			if(criteria.type == 'field'){
				if(this.data.dynamicallyFedField){
					this.setData('showSecondaryModuleDropdown',true);
					this.setData('disableText',criteria.value.display)
					this.setData('fvalue',criteria.value); //No I18N
				}else{
					this.setData('selectedSecField',this.executeMethod('getRelatedFields',value)); //no i18n
					if(this.data.selectedSecField && this.data.selectedSecField.parentCriteriaFieldGroup){
						this.setData('secondaryModuleDisplayName',this.data.selectedSecField.parentCriteriaFieldGroup.cxPropLabel)
					}
					if(!this.data.secondaryModuleDisplayName && this.data.selectedSecField.module && this.data.selectedSecField.module.length){
						this.setData('secondaryModuleDisplayName',this.data.selectedSecField.module[0].plural_label)
					}
				}
				this.changeDynamicTypeFunction('field',true);
			}else{
				this.setData('showSecondaryModuleDropdown',false); //no i18n
				this.changeDynamicTypeFunction(this.data.dynamicTypeValueSelected,true);
				if(this.data.dynamicElementComponentRender){
					val[0] = value;
				}else{
					if(this.getData('pickList')){
						if(typeof value == 'string' && this.data.selectedField.cxPropType != "single"){
							value=[].concat(value);
						}
						if(this.data.selectedField.ui_type==137){
		                	var temp=[]
		                    if(Array.isArray(value)){
		                        for(var i=0;i<value.length;i++){
		                              if(value[i].api_name){
		                                 temp[i]=value[i].api_name;
		                              }
		                              else{
		                              	temp[i]=value[i];
		                              }
		                           }
		                        }
		                    else{
		                        if(value.api_name){
		                         	temp[0]=value.api_name;
		                        }
		                        else{
			                    	temp[0] = value;
			                    }
		                    }
			                value=temp;
			                temp = [];
		                    if(Array.isArray(value)){
		                        for(var i=0;i<value.length;i++){
		                        	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value[i]}  );//eslint-disable-line no-loop-func
							    	if(recordObj[0]){
								    		temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
								    	}
								    	else{
			                                temp.push(value);
			                            }
							    }
			                }else{
						    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value}  );
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
						    	}
						    	else{
	                                temp.push(value);
	                            }
						    }
		                    value=temp;
		                }else if(value[0] && value[0].indexOf('${CATEGORY') > -1 && !this.data.disabledRecordStateConfig){
							this.setData('dynamicTypeValueSelected','record_category');
							if(!this.data.selectedField.enable_record_category){
								Lyte.objectUtils(this.data.selectedField,'add','enable_record_category',true);
							}
							var cpV = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
							this.setData('customPicklistValues',cpV);
							var tempp = [];
							value.forEach((item)=>{
								var t = cpV.cruxFindIndexOfObject('actual_value',item);
								tempp.push(cpV[t] ? cpV[t].display_value : item);
							});
							value = tempp;
						}else if(this.data.dynamicTypeValueSelected === 'record_category'){
							var customp = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
							this.setData('customPicklistValues',customp);
						}
						if(this.data.selectedField.api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
							if(Array.isArray(value)){
								var temp=[]
								for(var i=0;i<value.length;i++){
									temp.push(moduleRecordMapping[value[i]].plural_label)
								}
								value = temp
							}else{
								value = moduleRecordMapping[value].plural_label
							}
						}
						val[0] = value;
					}else if(this.getData('selectUser')){ //no i18n
						if(criteria.rawField.api_name.indexOf('.role') > -1 || criteria.rawField.api_name.indexOf('.group') > -1 || criteria.rawField.api_name.indexOf('.type__s') > -1){
							if(!Array.isArray(value)){
								val[0] = [].concat(value);
							}else{
								val[0] = value
							}
						}else{
							val[0] = {'users' : value}
						}
					}else if(this.getData('elementsCond') == 'tag'){ //no i18n
						val[0] = [].concat(value)
					}else if(this.getData("elementsCond") == 'layout'){ //no i18n
						val[0] = {'layouts' : value}
					}else if(ageCond){
						for(var i=0;i<this.getData('ageindays').length;i++){
							if(this.getData('ageindays')[i].system == ageCond){
								this.setData('selectedAgeInDays',this.getData('ageindays')[i]); //No I18N
							}
						}
						if(typeof value == 'string'){
							val[0] = value;
						}
					}else if(this.getData('betweenCond')){ //No I18N
						val = value;
					}else if(this.data.selectedField.data_type == 'multi_module_lookup'){
						var moduleExtracted = unformattedFieldApi.substr(unformattedFieldApi.indexOf('->')+2,unformattedFieldApi.length)
						moduleExtracted = moduleExtracted.substr(0,moduleExtracted.indexOf('.'))
						multiModule = this.data.moduleRecordMapping[this.getModuleFromApiName(moduleExtracted,this.data.moduleRecordMapping)]
						if(multiModule){
							val[0] = {name : value,module : {api_name : multiModule.api_name,id : multiModule.id}}
						}
					}else if((this.getData('elementsCond') == 'text' || this.getData('elementsCond') == 'text-area' || this.getData('elementsCond') == 'lookup')  && value){ //no i18n
						// if(typeof value == 'object'){ //no i18n
						// 	val[0] = "";
						// 	value.forEach(function(item,index){
						// 		val[0]+=item.replace(',','\\\\,')
						// 		if(index != value.length-1){
						// 			val[0]+=","
						// 		}
						// 	})
						// }else{
						// 	val[0] = value.replace(',','\\\\,')
						// }
						if(Array.isArray(value)){
							val[0] = value.join(',');
						}else{
							val[0] = value;
						}
					}else if(this.data.elementsCond == 'role' && !Array.isArray(value)){ //no i18n
						val[0] = [].concat(value);
					}else if(!this.getData('noneCondition')){ //no i18n
						val[0] = value;
					}
				}
			}
			this.setData('value',val); //No I18N
		}
	},
	fieldConditionSet : function(args){
		if(typeof args.cxPropShowSecondaryFields != "undefined"){
			this.setData('showSecondaryModuleDropdown',args.cxPropShowSecondaryFields)
			if(!this.data.showSecondaryModuleDropdown){
				this.setData('dynamicTypeValue',false)
			}
		}
		if(typeof args.cxPropDynamicValueType != "undefined"){
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			this.setData('dynamicTypeValue',args.cxPropDynamicValueType)
		}
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		if(typeof args.cxPropDynamicValueSelected != "undefined"){
			this.setData('dynamicTypeValueSelected',args.cxPropDynamicValueSelected);
		}
		if(typeof args.cxPropDynamicDisabled !== "undefined"){
			this.setData('disabledDynamicValueDropdown',args.cxPropDynamicDisabled);
		}
		if(typeof args.cxPropHideSecondayModuleName != "undefined"){
			this.setData('hideSecondayModule',args.cxPropHideSecondayModuleName)
		}
		if(typeof args.cxPropShowLoggedInUser !== 'undefined'){
			this.setData('cxPropShowLoggedInUser',args.cxPropShowLoggedInUser);
		}
		if(typeof args.cxPropSelectedField != 'undefined'){
			this.setData('selectedField',args.cxPropSelectedField);
		}
		if(typeof args.cxPropDynamicValueTypeOptions !== 'undefined'){
			this.setData('dynamicTypeValueOptions',args.cxPropDynamicValueTypeOptions);
		}
		if(typeof args.cxPropUserTypeField !== 'undefined'){
			this.setData('userTypeField',args.cxPropUserTypeField);
		}
	},
	changeConditionFunction : function(){
		this.setData('userTypeField',undefined);
		var args = this.executeMethod('onConditionSetCall',this.getData('criteriaIndex'),this.data.selectedComparator,this.data.selectedField);//No I18N
		if(args){
			this.fieldConditionSet(args);
		}
		this.setData('noneCondition',true); //no i18n
		this.setData('previousNextComp',false);
		var select = this.getData('selectCond');//No I18N
		var comparator,value,form;
		form = this.getData('selectedComparator'); //No I18N
		if(!this.data.disabledRecordStateConfig){
			var recordStateIndex = this.data.dynamicTypeValueOptions.cruxFindIndexOfObject('system','record_category');
			if(this.data.selectedField.enable_record_category && (this.data.selectedComparator.system === 'equal' || this.data.selectedComparator.system === 'not_equal')){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(recordStateIndex === -1){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'push',{display : _cruxUtils.getI18n('crm.record.category'),system : 'record_category'});
				}				
			}else if(recordStateIndex !== -1){
				Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'removeAt',recordStateIndex);

			}	
		}
		comparator=form.system;
		var value=null;
		if(this.data.selectedField.data_type ==  "ownerlookup" || this.data.selectedField.data_type == "userlookup"){
			if(comparator == 'equal_role' || comparator=='not_equal_role'){
				this.setData('elementsCond','role'); //no i18n
				this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'role')
			}else if(comparator == 'equal_group'){
				this.setData('elementsCond','role'); //no i18n
				this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'user_group')
			}else if(comparator === 'equal_type' || comparator === 'not_equal_type'){
				this.setData('elementsCond','picklist'); //no i18n
			}else{
				this.setData('elementsCond','user'); //no i18n
			}	
		}
		
		if(comparator=="None"){
			this.setData('disableText',''); //no i18n
		}
		else if(comparator == "${EMPTY}"){
			this.setData('noneCondition',true); //no i18n
			this.setData('disableText','${EMPTY}'); //no i18n
			comparator='equal';//No I18N
			value='${EMPTY}'; //no i18n
		}
		else if(comparator == "${NOTEMPTY}"){
			this.setData('noneCondition',true); //no i18n
			this.setData('disableText','${NOTEMPTY}'); //no i18n
			comparator='not_equal';//No I18N
			value='${EMPTY}';//no i18n
		}
		else if(comparator == "between" || comparator =="not_between"){
			this.setData('noneCondition',false); //no i18n
			this.setData('betweenCond',true); //no i18n
		}
		else if(comparator.match('{')){
			this.setData('noneCondition',true); //no i18n
			var text = this.data.selectedField.api_name == 'Call_Status' ? form.display : form.system; //no i18n
			if(text == '${OPEN}'){
			    text = '${'+ _cruxUtils.getI18n('crm.potential.all.open')+'}'
			}else if(text == '${CLOSEDWON}'){ //no i18n
			    text = '${'+_cruxUtils.getI18n('crm.potential.all.won')+'}'
			}else if(text == '${CLOSEDLOST}'){ //no i18n
			    text = '${'+_cruxUtils.getI18n('crm.potential.all.lost')+'}'
			}else if(text == '${C_OPEN}'){
				text = '${All Open}';
			}else if(text == '${C_COMPLETED}'){
				text = '${All Completed} '
			}else if(text == '${C_FAILED}'){
				text = '${All Failed}'
			}
			this.setData('disableText',text); //no i18n
			comparator='equal';//No I18N
			value=form.system;
		}
		else if(comparator == "Age in Days"){
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]);  //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('ageInDays',true); //No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}else if(comparator == "Due in Days"){ //No I18N
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('dueInDays',true); //No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}else if(comparator == "Number of Characters"){ //No I18N
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('nocCondition',true); //No I18N
			this.setData('ageInDaysMax',this.data.selectedField.length); //no i18n
		}else if(comparator == 'previous' || comparator == 'next'){
			this.setData('noneCondition',false); //no i18n
			this.setData('previousNextComp',true);
			this.setData('selectedAgeInDays',{system : 'equal',display : 'is'}); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}
		else{
			this.setData('noneCondition',false); //no i18n
		}
		this.setData('fcomp',comparator); //No I18N
		this.setData('fvalue',value); //No I18N
	},
	changeFieldFunction : function(set,comp){
		if(typeof cruxAssets !== "undefined" && cruxAssets.onCriteriaFieldSet){
			var args = cruxAssets.onCriteriaFieldSet(this.data.selectedField,this.data.criteriaIndex,{cxUserComponentProperties : this.data.userComponentProperties,cxModule : this.data.module});
			if(typeof args.cxPropSelectedField !== 'undefined'){
				this.setData('selectedField',args.cxPropSelectedField);
			}
		}
		var args = this.executeMethod('onFieldSetCall',this.getData('criteriaIndex'),this.data.selectedField.field_label,this.data.selectedField);//No I18N
		if(args){
			this.fieldConditionSet(args);
			if(typeof args.cxSelectedComparator != 'undefined'){
				comp = args.cxSelectedComparator;
				this.setData('gotComparator',false)
			}
		}
		if(this.data.selectedField && this.data.selectedField.module && this.data.selectedField.module.length > 0 && typeof this.data.selectedField.module[0] === 'object'){
			this.setData('module',this.data.selectedField.module[0].module_name == 'Activities' && this.data.selectedField.api_name.match(/Tag/) ? this.data.selectedField.sub_module.api_name : this.data.selectedField.module[0].module_name);
		}
		var selectId=this.getData('selectedField').data_type; //No I18N
		var value = this.getData('selectedField').api_name; //No I18N
		if(selectId == 'formula'){
			selectId = this.getData('selectedField').formula.return_type;//no i18n
		}
		if(selectId == 'rollup_summary'){
			selectId = this.getData('selectedField').rollup_summary.return_type;//no i18n
		}
		this.setData('maxLen',undefined); //no i18n
		var select="default",elementsCond="text"; //no i18n
		switch(selectId){
		case "none":
			select="none";//No I18N
			elementsCond = "none"; //no i18n
			break;
		case "text": case "email": case "phone": case "website": case "autonumber":
			select="text";//No I18N
			elementsCond = "text"; //no i18n
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		case "textarea":
			select="text";//No I18N
			elementsCond = "text-area"; //no i18n
			this.setData('maxLen',this.data.textAreaMaxLength); //no i18n
			break;
		case "multiselectpicklist":
			elementsCond="text";//No I18N
			select = "multiselectpicklist"; //no i18n
			break;
		case "currency": case "double": case "integer": case "bigint": case "decimal": case "longinteger": case 'percent':
			select="number";//No I18N
			elementsCond = "number"; //no i18n
			if(this.data.apiVersion == 'EQL'){
				this.setData('maxLen',this.data.selectedField.length); //no i18n
			}else{
				this.setData('maxLen',19); //no i18n
			}
			break;
		case "datetime":
			select="date";//No I18N
			elementsCond = "date-time"; //no i18n
			break;
		case "date":
			select="date";  //no i18n
			elementsCond = "date"; //no i18n
			break;
		case "time":
			select="time";  //no i18n
			elementsCond = "time"; //no i18n
			if(this.data.selectedField.cxPropTimeFormat){
				this.setData('timeFormat',this.data.selectedField.cxPropTimeFormat);
			}
			if(this.data.selectedField.cxPropDefaultTime){
				this.setData('value',[this.data.selectedField.cxPropDefaultTime,this.data.selectedField.cxPropDefaultTime])
			}
			break;
		case "boolean":
			select="boolean";//No I18N
			elementsCond = "boolean"; //no i18n
			break;
		case "ownerlookup":
		case "userlookup":
			select = "user";//No I18N
			elementsCond = "user"; //no i18n
			this.setData('selectUser',true);//No I18N
			break;
		case "multiselectlookup":
		case "multiuserlookup":
			select = "defEmpty"; //No I18N
			elementsCond = "text"; //no i18n
			break;
		case "picklist":
		case "radiobutton":
			this.setData('pickList',true); //No I18N
			select = "picklist";//No I18N
			elementsCond = "picklist"; //no i18n
			this.setData('maxLen',500); //no i18n
			break;
		case "lookup":
			select = "text"; //No I18N
			elementsCond = "lookup"; //no i18n
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		case "fileupload": 
		case "imageupload":
			select = "defEmpty";
			elementsCond = "text"; //no i18n
			break;
		case "multi_module_lookup":
			select = "multimodulelookup"; //No I18N
			elementsCond = "lookup"; //no i18n
			Lyte.Component.set(this.data.selectedField,'cxPropType','multi_module_lookup')
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		}
		if(this.getData('numberFieldException')[this.data.module] == this.getData('selectedField').api_name){
			select="number";//No I18N
			elementsCond = "number"; //no i18n
			this.setData('maxLen',19); //no i18n
		}else if(this.criteriaApiNameCheck(value,'Tag')){ //no i18n
			select="defWithEmpty"; //No I18N
			elementsCond = "tag"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'tag')
		}else if(this.criteriaApiNameCheck(value,'Layout')){ //no i18n
			select ="default"; //No I18N
			elementsCond = "layout"; //no i18n
		}else if(this.criteriaApiNameCheck(value,'Wizard')){ //no i18n
			select = "default"; //no i18n
			elementsCond = "layout"; //no i18n
		}else if(selectId == 'lookup' && this.criteriaApiNameCheck(value,'role',this.data.selectedField)){ //no i18n
			select ="default"; //No I18N
			elementsCond = "role"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'role')
		}else if(this.criteriaApiNameCheck(value,'profile')){ //no i18n
			this.setData('pickList',false); //No I18N
			select ="default"; //No I18N
			elementsCond = "role"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'profile')
		}else if(this.criteriaApiNameCheck(value,'Call_Status') && (this.data.module == 'Activities' || this.data.module =='Calls')){ //no i18n
			select = "cs"; //No I18N
		}else if(value.match(/Activity_Type/) && this.data.module == 'Activities'){ //no i18n
			select = "default"; //No I18N
			elementsCond = "picklist" //No I18N
			this.setData('pickList',true); //No I18N
			var pick_list_values = [{display_value :this.data.moduleRecordMapping.Tasks.plural_label ,actual_value :this.data.moduleRecordMapping.Tasks.api_name },{display_value :this.data.moduleRecordMapping.Calls.plural_label ,actual_value :this.data.moduleRecordMapping.Calls.api_name },{display_value :this.data.moduleRecordMapping.Events.plural_label ,actual_value :this.data.moduleRecordMapping.Events.api_name }];
			// Lyte.objectUtils(this.data.selectedField,"add","pick_list_values",pick_list_values);//no i18n
			// Lyte.objectUtils(this.data.selectedField,"add","cxPropDisableExtraValue",true);//no i18n
			this.data.selectedField.pick_list_values = pick_list_values;
			this.data.selectedField.cxPropDisableExtraValue = true;
		}else if(this.getData('selectedField').column_name == 'APPOINTMENTSTATUS' || this.getData('selectedField').column_name == 'SERVICESTATUS'){ //no i18n
			select = "default"; //no i18n
		}else if(this.criteriaApiNameCheck(value,'Stage')&& (this.data.module == 'Potentials' || this.data.module =='Deals')){ //no i18n
			select = "stage"; //No I18N
		}
		if(this.getData('selectedField').ui_type == 80){
			select = 'numberWithOEmpty'; //NO I18N
		}else if(this.getData('selectedField').ui_type == 137){ //no i18n
			this.setData('pickList',true); //No I18N
			select = "picklist";//No I18N
			elementsCond = "picklist"; //no i18n
			this.setData('maxLen',500); //no i18n
		}else if(this.data.selectedField.api_name == 'Data_Source' && select == "picklist"){ //no i18n
			select = 'default'; //no i18n
		}
		if(this.getData('selectedField').crypt){
		    select = (select == 'number' && this.getData('selectedField').data_type != 'currency') ? 'encryptNumber' : 'defEmpty'; //no i18n
		}
		if(typeof cruxAssets != "undefined" && cruxAssets.fieldDataTypeToCruxCompMapping && cruxAssets.fieldDataTypeToCruxCompMapping[selectId]){
			elementsCond = cruxAssets.fieldDataTypeToCruxCompMapping[selectId];
		}
		elementsCond = this.executeMethod('fieldToCruxCompMapping',this.data.selectedField,elementsCond);
		if(this.getData('selectedField').cxPropDynamicFieldValue){
			this.setData('dynamicallyFedField',true);
		}
		this.setData('selectCond',select);//No I18N
		if(this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField)){
			this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField))
			this.setData('dynamicElementComponentRender',true);
			this.setData('elementsCond',elementsCond); //no i18n
		}else{
			this.setData('dynamicElementComponentRender',false);
			this.setData('elementsCond',elementsCond); //no i18n
		}
		if(set && !this.data.dynamicallyFedField && this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected == 'field' || !this.data.dynamicTypeValue) && this.data.selectedField.id != '-1'){
			var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type ,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
			check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
			if(!check || check.length == 0){
				// if(this.data.secondaryModule){
				// 	this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield.module',selectId,this.data.secondaryModule)); //No I18N
				// }else{
					this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',selectId == 'bigint' ? 'Long Integer' : selectId)); //No I18N
				// }
				if(!this.data.dynamicTypeValue){
					this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
					this.hideDropdowns(0);
					return;
				}
				this.setData('dynamicTypeValueSelected','value');
			}
		}
		if(!this.data.disabledRecordStateConfig){
			var recordStateIndex = this.data.dynamicTypeValueOptions.cruxFindIndexOfObject('system','record_category');
			if(this.data.selectedField.enable_record_category){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(recordStateIndex === -1){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'push',{display : _cruxUtils.getI18n('crm.record.category'),system : 'record_category'});
				}
			}else if(recordStateIndex !== -1){
				Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'removeAt',recordStateIndex);

			}
		}
		select == 'none' ? this.setData('showComparator',true) : this.setData('showComparator',false); //No I18N
		if(set && !comp){
			this.setData("condArray",this.executeMethod('setConditions',select,undefined,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex));//No I18N
			this.setData('gotComparator',true); //No I18N
		}else{
			this.setData('condArray',this.executeMethod('setConditions',select,comp,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex)); //No I18N
		}
		this.setData('selectedComparator',this.getData('condArray')[0]); //No I18N

		this.setData('queryParam', {});
		if(elementsCond === 'user'){
			if(this.data.selectedField.cxUserProperties && this.data.selectedField.cxUserProperties.queryParam){
				this.setData('queryParam', this.data.selectedField.cxUserProperties.queryParam);
			}else if(this.data.userComponentProperties.queryParam){
				this.setData('queryParam', this.data.userComponentProperties.queryParam);
			}
		}else if(elementsCond === 'role'){
			if(this.data.roleComponentRequestModal === 'role' && this.data.roleComponentProperties.queryParam){
				this.setData('queryParam', this.data.roleComponentProperties.queryParam);
			}else if(this.data.roleComponentRequestModal === 'profile' && this.data.profileComponentProperties.queryParam){
				this.setData('queryParam', this.data.profileComponentProperties.queryParam);
			}
		}
		this.changeConditionFunction();
	},
	changePrefixFunction : async function(index){
		Lyte.Component.set(this.data.prefixArray[index],'showError',undefined);
		if(this.data.dynamicColumn){
			this.setData('showFieldsCriteria',false);//No I18N
			var column = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			Lyte.arrayUtils(this.data.selectedArray ,'splice',index+1,this.data.selectedArray.length -1); //no i18n
			Lyte.arrayUtils(this.data.prefixArray ,'splice',index+1,this.data.prefixArray.length -1); //no i18n
			if(!column.endCriteria){
				if(column.showFields){
					this.setData('showFieldsCriteria',true);//No I18N
				}else if(column.cxPropShowChildCriteria){
					this.setData('showChildCriteria',true);
				}else{
					this.criteriaFormat = column.criteriaFormat || this.criteriaFormat;
					Lyte.arrayUtils(this.data.prefixArray,'push',column);//No I18N
					var selectedColumn = {};
					selectedColumn.api_name = column.apiValue;
					selectedColumn.comparator = 'equal'; //no i18n
					selectedColumn.value={}
					selectedColumn.value[column.systemValue] = '-1'
					selectedColumn.value[column.displayValue] = 'None'
					Lyte.arrayUtils(this.data.selectedArray,'push',selectedColumn); //no i18n
				}

				if(typeof column.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',column.cxPropDisableChildCriteria);
				}
			}
		}else if(!this.data.showFieldsCriteria){
			var a = await this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			if(a){
				if(typeof a.cxPropShowChildCriteria !== 'undefined'){
					this.setData('showChildCriteria',a.cxPropShowChildCriteria);
				}
				if(a.cxPropChildCriteriaConditionLabel){
					this.setData('childCriteriaCheckboxLael',a.cxPropChildCriteriaConditionLabel);
				}
				if(a.cxPropChildCriteriaConditionTitle){
					this.setData('childCriteriaCheckboxTitle',a.cxPropChildCriteriaConditionTitle);
				}
				if(typeof a.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',a.cxPropDisableChildCriteria);
				}
			}
		}
		if(this.data.childCriteria && this.data.showChildCriteria){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex).component,this.data.selectedArray,this.getDeveloperArg(0,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
		}
		this.hideDropdowns(index+1);
	},
	changeDynamicTypeFunction : function(selected,dontTriggerOnChange){
		var arg = this.executeMethod('dynamicTypeChangeCall',this.data.selectedField,this.data.condArray,selected,this.data.criteriaIndex,dontTriggerOnChange);
		if(typeof arg != 'undefined'){
			if(arg.cxPropSetComparator){
				this.setData('condArray',arg.cxPropSetComparator)
				this.setData('gotComparator',true); //No I18N
				if(this.data.condArray.cruxFindIndexOfObject('system',this.data.selectedComparator.system) == -1){
					this.setData('selectedComparator',this.getData('condArray')[0]); //No I18N
					this.changeConditionFunction();
				}
			}
		}
		if(selected === 'dynamic_component' || (this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField))){
			this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField))
			this.setData('dynamicElementComponentRender',true);
		}
	},
	methods :{
		changeField : function(a,b,c,d){
			if(b!=undefined){
				var selectedField = (b == "None") ? {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"} : d.parentElement.component.data.cxPropItem //no i18n
				if(selectedField && this.data.selectedField.api_name == selectedField.api_name){
					return;
				}
				this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
				this.setData('showFieldErrorMsg',undefined);
				this.setData('showCondErrorMsg',undefined);
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('showValueErrorMsg',"")
				this.setData('dynamicElementComponentRender',false);
				this.setData('noneCondition',true); //no i18n
				this.setData('showEmpty',false); //No I18N
				this.setData('selectUser',false);//No I18N
				this.setData('dynamicTypeValueSelected','value'); // no i18n
				this.changeDynamicTypeFunction('value',true); //no i18n
				this.setData('relatedFields',[]); //no i18n
				this.setData('pickList',false);//No I18N
				this.setData('lookup',false); //No I18N
				this.setData('betweenCond',false) //no i18n
				this.setData('ageInDaysCond',false); //no i18n
				this.setData('disableText',''); //no i18n
				this.setData('value',[""]); //no i18n
				this.setData('fcomp',undefined); //no i18n
				this.setData('dynamicallyFedField',false);
				var fields=this.getData('fields'); //No I18N
				this.setData('selectedField',selectedField);//No I18N
				this.setData('customPicklistValues',undefined)
				this.changeFieldFunction(true);
				this.executeMethod('onFieldChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedField);//No I18N
			}else{
				this.executeMethod('onFieldChangeCall',this.getData('criteriaIndex'),d.innerText,{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"});//No I18N
			}
			try{
				c.$node.parentElement.querySelector('.cx_fieldDropdownLabel').focus(); //no i18n
			}catch(e){}
		},
		changeCondition : function(a,b,c,d){
			if(b!=undefined){
				var array = this.getData('condArray')[d.getAttribute('index')];//No I18N
				if(this.data.selectedComparator == array){
					return;
				}
				this.setData('showCondErrorMsg',undefined);
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('showValueErrorMsg',"")
				this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
				this.setData('noneCondition',false); //no i18n
				
				this.setData('dynamicTypeValueSelected','value'); // no i18n
				this.changeDynamicTypeFunction('value',true); //no i18n
				this.setData("betweenCond",false); //no i18n
				this.setData('ageInDaysCond',false); //No I18N
				this.setData('ageInDays',false); //no i18n
				this.setData('dueInDays',false); //no i18n
				this.setData('nocCondition',false); //No I18N
				this.setData('value',[""]); //no i18n
				this.setData('fcomp',undefined); //no i18n
				this.setData('disableText',''); //no i18n
				this.setData('selectedComparator',array); //No I18N
				this.setData('customPicklistValues',undefined);
				this.executeMethod('onOperatorChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedComparator,this.data.selectedField);//No I18N
				this.setData('changePreviousNextSelected','days')
				this.changeConditionFunction();
				
			}else{
				this.executeMethod('onOperatorChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedComparator,this.data.selectedField);//No I18N
			}
			try{
				c.$node.parentElement.querySelector('.cx_compDropdownLabel').focus() //no i18n
			}catch(e){}
		},
		changeValue : function(a){
			this.setData('showValueErrorMsg',"")
			this.executeMethod('onValueChangeCall',this.getData('criteriaIndex'),a); //no i18n
		},
		changeSecField : function(a,b,c,d){
			if(b!=undefined){
				var fields=this.getData('fields'); //No I18N
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('selectedSecField',b == "None" ? {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"} : d.parentElement.component.data.cxPropItem);//No I18N
				if($L(d.parentElement.parentElement).closest('crux-criteria-drop-item').length > 0){
					this.setData('secondaryModuleDisplayName',$L(d.parentElement.parentElement).closest('crux-criteria-drop-item')[0].component.data.cxPropItem.cxPropLabel)
				}
				if(!this.data.secondaryModuleDisplayName && this.data.selectedSecField.module && this.data.selectedSecField.module.length){
					this.setData('secondaryModuleDisplayName',this.data.selectedSecField.module[0].plural_label)
				}
				this.executeMethod('onSecFieldChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedSecField);//No I18N
			}
		},
		onFieldSearch : function(list){
			var dropdownNode = this.$node.querySelector('.cx_fieldsDropdown'); //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				this.setData('emptyFieldShow',true);//No I18N
			}else{
				this.setData('emptyFieldShow',false);//No I18N
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onConditionSearch : function(list){
			var dropdownNode = this.$node.querySelector('.cx_compDropdown'); //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				this.setData('emptyConditionShow',true);//No I18N
			}else{
				this.setData('emptyConditionShow',false);//No I18N
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onSecFieldSearch : function(list){
			if(list.length==0){
				this.setData('emptySecondaryFieldShow',true);//No I18N
			}else{
				this.setData('emptySecondaryFieldShow',false);//No I18N
			}
		},
		onPrefixSearch : function(index,list,node){
			var dropdownNode = node.closest('lyte-drop-box').origindd //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				Lyte.objectUtils(this.data.prefixArray[index],'add','emptyOptionsShow',true); //no i18n
			}else{
				Lyte.objectUtils(this.data.prefixArray[index],'add','emptyOptionsShow',false); //no i18n
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onFieldDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('fieldDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
				try{
					this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
					// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
				}catch(e){}
			}.bind(this),10);
			this.setData('fieldDropdownOpen',true);//No I18N
			this.executeMethod('onfieldDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		onConditionDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('condDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
			}.bind(this),10);
			this.setData('condDropdownOpen',true);//No I18N
			this.executeMethod('onconditionDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		onSecFieldDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('secFieldDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
				try{ //eslint-disable-line @zoho/zohocrm/murphy-error
					this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
					// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
				}catch(e){} //eslint-disable-line no-empty
			}.bind(this),10);
			this.setData('secFieldDropdownOpen',true)
			this.focusDynamicSet(true);
			this.executeMethod('onsecfieldDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		fieldBeforeHide : function(a,b){
			this.setData('fieldDropdownOpen',false);//No I18N
			this.executeMethod('onfieldDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		secFieldBeforeHide : function(a,b){
			var searchi=b.childComp.querySelector('lyte-search');//No I18N
			if(searchi){
				searchi.setValue("");
			}
			this.focusDynamicSet();
			this.setData('secFieldDropdownOpen',false)
			this.executeMethod('onsecfieldDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		conditionBeforeHide : function(a,b){
			this.setData('condDropdownOpen',false);//No I18N
			this.executeMethod('onconditionDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		onDropdownHide : function(a,b){
			if(b.$node.parentElement.contains(a.target)){
				a.stopImmediatePropagation()
			}
		},
		changeAgeInDaysCondition : function(a,b,c,d){
			this.setData('betweenAgeInDaysCond',false);
			this.setData('value',[""]); //no i18n
			this.setData('selectedAgeInDays',this.getData('ageindays')[d.getAttribute('index')]); //No I18N
			if(this.data.selectedAgeInDays.system == "between" || this.data.selectedAgeInDays.system =="not_between"){
				this.setData('betweenAgeInDaysCond',true);
			}
			this.executeMethod('onAgeInConditionChangeCall',this.getData('criteriaIndex'),d.innerText,this.getData('ageindays')[d.getAttribute('index')]);//No I18N
		},
		changepreviousNextCondition : function(event, selVal, comp, dropItem){
			this.executeMethod('onChangePreviousNextConditionCall',this.getData('criteriaIndex'),dropItem.innerText,this.getData('selectedComparator').cxDateOptions[dropItem.getAttribute('index')]);//No I18N
		},
		onFieldDropdownBeforeShow : function(a,b){
			var s=b.$node.ltProp('selected'); //NO I18N
			var selfThis = this;
			var check = this.executeMethod('getFieldsForHeader',undefined,this.getData('criteriaIndex'),this.getData('prefixArray').length > 0 ? this.getData('selectedArray') : undefined,this.getData('prefixArray').length > 0 ? this.getDeveloperArg(this.getData('prefixArray').length-1,this.getData('selectedArray'))  : undefined); //no i18n
			if(check instanceof Promise){
				this.setData('showFieldsLoading',true); //no i18n
				check.then(function(data){
					selfThis.setData('fields',data); //no i18n
					selfThis.setData('showFieldsLoading',false); //no i18n
					selfThis.focusSearch(b);
					b.$node.ltProp('selected','')//No I18N
					b.$node.ltProp('selected',s)//No I18N
					b.$node.resetPosition();
					try{
						this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
						// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
					}catch(e){}
				});
			}
			else if(check){
				this.setData('fields',check);//No I18N
			}else{
				return false;
			}
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		onSecFieldDropdownBeforeShow : function(a,b){
			var a=b.$node.ltProp('selected'); //no i18n
			var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
			check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
			if(!check || check.length == 0){
				this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',this.data.selectedField.data_type == 'bigint' ? 'Long Integer' : this.data.selectedField.data_type)); //No I18N
				return false;
			}else{
				this.setData('relatedFields',check); //no i18n
			}
			try{ //eslint-disable-line @zoho/zohocrm/murphy-error
				this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
			}catch(e){} //eslint-disable-line no-empty
			b.$node.ltProp('selected','');//No I18N
			b.$node.ltProp('selected',a)//No I18N
		},
		onConditionDropdownBeforeShow : function(a,b){
			if(!this.getData('gotComparator') || this.data.cxPropForceSetCondition || this.data.selectedField.cxForceSetCondition){
				this.setData("condArray",this.executeMethod('setConditions',this.getData('selectCond'),undefined,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex));//No I18N
				this.setData('gotComparator',true); //No I18N
			}
			var s=b.$node.ltProp('selected'); //NO I18N
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		valueError : function(errorMsg){
			if(!this._skipVal){
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
				if(this.showInlineMsg){
					this.setData('showValueErrorMsg',errorMsg) //No I18N 
				}else{
					this.executeMethod('onValueError',this.getData('criteriaIndex'),errorMsg); //no i18n
				}
				
			}
			return false;
		},
		onPrefixDropdownBeforeShow : function(index,a,b){
			var s=b.$node.ltProp('selected'); //NO I18N
			var self=this;
			if(!this.getData('prefixArray')[index].forceFetch && this.getData('prefixArray')[index].cxPropOptions){
				Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,this.getData('prefixArray')[index].cxPropOptions)//No I18N
			}else{
				var a=this.executeMethod('getPrefixValues',index,this.getData('selectedArray'),this.getDeveloperArg(index-1,this.data.selectedArray),undefined,this.getData('prefixArray')[index].forceFetch,this.data.criteriaIndex); //no i18n
				if(a instanceof Promise){
					Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,'Loading')//No I18N
					a.then(function(data){
						Lyte.Component.set(self.getData('showArray'),self.getData('prefixArray')[index].apiValue,data)//No I18N
					})
				}else{
					if(a.showRecords){
						Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,'Loading')//No I18N
						store.findAll(this.data.moduleRecordMapping[a.module].id).then(function(data){
							Lyte.Component.set(self.getData('showArray'),self.getData('prefixArray')[index].apiValue,data)//No I18N
						});
					}else{
						Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,a)//No I18N
					}
				}
			}
			
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		onPrefixDropdownShow : function(index,a,b){
			this.focusSearch(b);
			setTimeout(function(){
				Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpenUp',b.childComp.classList.contains('lyteDropdownUp')); //no i18n
			}.bind(this),10);
			Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpen',true); //no i18n
		},
		prefixBeforeHide : function(index){
			Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpen',false); //no i18n
		},
		changePrefixOption : function(index,a,b,c,d){
			var prefix = this.getData('prefixArray')[index];
			var _this=this;
			if(prefix.apiValue == 'module' && b != -1){
				this.setData('module',d.parentElement.component.data.cxPropItem.lookup ? this.getModuleFromApiName(d.parentElement.component.data.cxPropItem.lookup.module.api_name,this.data.moduleRecordMapping) : d.parentElement.component.data.cxPropItem.module_name ? d.parentElement.component.data.cxPropItem.module_name : d.parentElement.component.data.cxPropItem[prefix.systemValue])
			}
			if(b != -1){
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : d.parentElement.component.data.cxPropItem};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',index,criteria); //no i18n
				}else{
					Lyte.arrayUtils(this.getData('selectedArray'),'insertAt',index,criteria); //no i18n
				}
				// if(this.data.dynamicColumn){
				// 	var column = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray)); //no i18n
				// 	Lyte.arrayUtils (this.data.selectedArray ,'splice',index+1,this.data.selectedArray.length -1);
				// 	Lyte.arrayUtils (this.data.prefixArray ,'splice',index+1,this.data.prefixArray.length -1);
				// 	if(!column.endCriteria){
				// 		if(column.showFields){
				// 			this.setData('showFieldsCriteria',true);//No I18N
				// 		}else{
				// 			this.criteriaFormat = column.criteriaFormat;
				// 			Lyte.arrayUtils(this.data.prefixArray,'push',column);//No I18N
				// 			var selectedColumn = {};
				// 			selectedColumn.api_name = column.apiValue;
				// 			selectedColumn.comparator = 'equal'
				// 			selectedColumn.value={}
				// 			selectedColumn.value[column.systemValue] = '-1'
				// 			selectedColumn.value[column.displayValue] = 'None'
				// 			Lyte.arrayUtils(this.data.selectedArray,'push',selectedColumn)
				// 		}
				// 	}
				// }
				// this.hideDropdowns(index+1);
				this.changePrefixFunction(index)
			}else{
				var value={}
				value[prefix.systemValue] = '-1';
				value[prefix.displayValue] = _cruxUtils.getI18n('None');
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',index,criteria); //no i18n
				}else{
					Lyte.arrayUtils(this.getData('selectedArray'),'insertAt',index,criteria); //no i18n
				}
				// for(var i=0;)
				this.hideDropdowns(index);
				if(!this.data.showFieldsCriteria){
					var out = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
					if(out){
						if(typeof out.cxPropShowChildCriteria !== 'undefined'){
							this.setData('showChildCriteria',out.cxPropShowChildCriteria);
						}
						if(typeof out.cxPropDisableChildCriteria !== 'undefined'){
							this.setData('disabledChildCriteria',out.cxPropDisableChildCriteria);
						}
						if(out.cxPropChildCriteriaConditionLabel){
							this.setData('childCriteriaCheckboxLael',out.cxPropChildCriteriaConditionLabel);
						}
						if(out.cxPropChildCriteriaConditionTitle){
							this.setData('childCriteriaCheckboxTitle',out.cxPropChildCriteriaConditionTitle);
						}
					}
				}
				if(this.data.childCriteria && this.data.showChildCriteria){
					this.executeMethod('setMethodsAndDataForChildCriteriaCall',this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex).component,this.data.selectedArray,this.getDeveloperArg(index,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
				}
				
			}
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header.js", "Feb Default Changes");
			this.executeMethod('prefixChanged');
			if(!(this.getData('prefixArray')[index+1] && this.getData('prefixArray')[index+1].cxPropOptions) && index+1 < this.data.prefixArray.length){
				this.executeMethod('getPrefixValues',this.getData('prefixArray')[index+1] ? index+1 : -1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),true,undefined,this.data.criteriaIndex); //no i18n
			}
			try{
				c.$node.parentElement.querySelector('.cx_prefixDropdownLabel').focus(); //no i18n
			}catch(e){}
		},
		userComponentCustomRequest : function(a,b,c,d,e){
			return this.executeMethod('userComponentCustomRequestCall',a,b,c,d,e);
		},
		onDynamicTypeSelected : function(event,selected){
			this.setData('noneCondition',true);
			this.setData('dynamicElementComponentRender',false);
			this.setData('customPicklistValues',undefined);
			this.setData('noneCondition',false);
			var ch = this.executeMethod('onBeforeDynamicTypeChangeCall',selected,this.data.selectedField,this.data.selectedComparator,this.data.criteriaIndex)
			if(ch === false){
				this.setData('dynamicTypeValueSelected',selected == 'field' ? 'value' : 'field' );
				return;
			}
			if(selected === 'record_category'){
				this.setData('dynamicTypeValueSelected',selected);
				var cp = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
				this.setData('customPicklistValues',cp);
			}
			this.setData('value',undefined)
			this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
			if(!this.data.dynamicallyFedField && selected == 'field' && (!this.data.relatedFields || this.data.relatedFields.length == 0)){
				var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type ,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
				check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
				if(!check || check.length == 0){
					var data_type = this.data.selectedField.data_type
					if(data_type == 'formula'){
						data_type = this.getData('selectedField').formula.return_type;//no i18n
					}
					if(data_type == 'rollup_summary'){
						data_type = this.getData('selectedField').rollup_summary.return_type;//no i18n
					}
					//if(this.data.secondaryModule){
					//	this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield.module',data_type,this.data.secondaryModule)); //No I18N
					//}else{
						this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',data_type == 'bigint' ? 'Long Integer' : data_type)); //No I18N
					//}
					this.setData('dynamicTypeValueSelected','value');
					selected = 'value';
				}
			}
			this.setData('showSecondaryModuleDropdown',selected == 'field'); //no i18n
			this.changeDynamicTypeFunction(selected);
		},
		onDynamicValueOpen : function(){
			this.focusDynamicSet(true);
		},
		onDynamicValueHide : function(){
			this.focusDynamicSet();
		},
		setMethodsAndDataForChildCriteriaCaller : function(component){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',component,this.data.selectedArray,this.getDeveloperArg(0,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
		},
		lookupComponentDataFetch : function(){
			return this.executeMethod('lookupComponentDataFetchFn',...arguments);
		},
		onElementDropdownOpenCallback : function(element, ev, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', ev, element, comp);
			}
		},
		onElementDropdownCloseCallback : function(element, ev, comp){
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', ev, element, comp);
			}
		}
	},
	actions : {
		createNewCriteria : function(){
			this.throwEvent('createNewCriteria');//No I18N
		},
		removeCriteria : function(){
			this.throwEvent('removeCriteria',this.getData('criteriaIndex'));//No I18N
		},
		changeAndOr : function(){
			this.throwEvent('changeAndOr',this.getData('andOrCondition'),this.getData('criteriaIndex'));//No I18N
		},
		showFieldsDropdown : function(event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			this.setData('showFieldsDropdown',true); //No I18N
			this.$node.querySelector('.cx_fieldsDropdown').toggle(); //No I18n
		},
		showComparatorDropdown : function(event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			this.setData('showComparatorDropdown',true); //No I18N
			this.$node.querySelector('.cx_compDropdown').toggle(); //No I18N
		},
		showPrefixDropdown : function(index,event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			Lyte.Component.set(this.getData('prefixArray')[index],'showDropdown',true); //no i18n
			this.$node.querySelector('.cx_PrefixDropdown'+this.getData('prefixArray')[index].apiValue).toggle(); //no i18n
		},
		keyUpDropdown : function(element,event){
			if(event.keyCode == 32){
				event.stopImmediatePropagation();
				if(!element.classList.contains('lyteDropdown-disabled')){
					element.click();
				}
			}
		},
		showSecFieldsDropdown : function(){
			this.setData('showSecondaryFieldsDropdown',true); //No I18N
			this.$node.querySelector('.cxSecFieldDropdown').toggle(); //No I18N
		},
		dynamicFedFieldClicked : function(){
			var fvalue = this.executeMethod('clickDynamicFieldValue',this.data.selectedField,this.data.criteriaIndex,this.data.selectedComparator,this.data.fvalue)
			if(fvalue){
				if(fvalue instanceof Promise){
					fvalue.then(function(res){
						if(typeof res == 'object'){
							this.setData('fvalue',res);
							this.setData('disableText',res.display);
						}else{
							this.setData('fvalue',res);
							this.setData('disableText',res);
						}
						
					}.bind(this),function(){})
				}else{
					if(typeof res == 'object'){
						this.setData('fvalue',res);
						this.setData('disableText',res.display);
					}else{
						this.setData('fvalue',fvalue);
						this.setData('disableText',fvalue);
					}
				}
			}
		},
		onCriteriaConditionItemClicked : function(node){
			if(node.classList.contains('cxCriteriaItemDisabled')){
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		},
		showChildCriteriaAction : function(){
			this.setData('showChildCriteria',!this.data.showChildCriteria);
		}
	},
	getDeveloperArg : function(index,selectedArray){
		var arg={},s='';
		for(var i=0;i<=index;i++){
			arg[selectedArray[i].api_name] = selectedArray[i].value;
			s=s+selectedArray[i].value[this.data.prefixArray[i].systemValue]+'.'
		}
		return [arg,s];
	},
	focusSearch : function(dropdown){
		var searchi=dropdown.childComp && dropdown.childComp.querySelector('lyte-search');//No I18N
		if(searchi){
			searchi.setValue("");
			var s=searchi.querySelector("input");//No I18N
		   s.focus();
		}
		dropdown.$node.resetPosition();
	},
	focusDynamicSet : function(set){
		var a = $L('.cxCriteriaValueColDropInputWrap',this.$node)
		set ? a.addClass('cxCriteriaValueColDropInputWrapActive') : a.removeClass('cxCriteriaValueColDropInputWrapActive')
	},
	setError : function(error){
		if(error.type == 'prefix'){
			Lyte.Component.set(this.data.prefixArray[error.index],'showError',error.message);
		}
	},
	moveIntoView : function(element,box){
		var body = box.querySelector('lyte-drop-body'); //no i18n
		containerScrollTop = body.scrollTop,
		elementTop = element.offsetTop;
		containerHeight = body.offsetHeight;
		if(elementTop <= containerScrollTop){
			body.scrollTop = elementTop - (containerHeight/2);
		}else if(elementTop >=  (containerScrollTop+containerHeight-element.offsetHeight)){
			body.scrollTop = elementTop + element.offsetHeight - (containerHeight/2);
		}
	},
	prefixArrayObserver : function(){
		if(!this.data.dynamicColumn){
			this.hideDropdowns(0);
		}
	}.observes('prefixArray.[]'), //no i18n
	secondaryModuleObserver : function(){
		this.setData('showSecondaryModuleDropdown',this.data.secondaryModule); //no i18n
	}.observes('secondaryModule'), //no i18n
	setFocusEventListeners : function(){
		var dropdown = $L('.cxCriteriaValueColTypeDropdown',this.$node)
		if(dropdown.length){
			dropdown[0].addEventListener('focusin',function(){
				this.focusDynamicSet(true)
			}.bind(this));
			dropdown[0].addEventListener('focusout',function(){
				this.focusDynamicSet()
			}.bind(this));
		}
		if(this.data.dynamicTypeValueSelected == 'value'){
			var node = $L('.cxCriteriaValueSection',this.$node)
			if(node.length > 0){
				node[0].addEventListener('focusin',function(){
					this.focusDynamicSet(true)
				}.bind(this));
				node[0].addEventListener('focusout',function(){
					this.focusDynamicSet()
				}.bind(this));
			}
		}
	}.observes('showSecondaryModuleDropdown','dynamicTypeValueSelected','dynamicTypeValue').on('didConnect') //no i18n
},{mixins : ["crux-criteria-util"]});//No I18N
