Lyte.Component.register("crux-smart-filter-input", {
_template:"<template tag-name=\"crux-smart-filter-input\"> <template is=\"if\" value=\"{{rendered}}\"><template case=\"true\"> <lyte-messagebox lt-prop-type=\"error\" id=\"errorMessage\"></lyte-messagebox> <template is=\"if\" value=\"{{expHandlers(field.cxFieldsDetails,'&amp;&amp;',field.renderNew)}}\"><template case=\"true\"> <div class=\"{{if(expHandlers(expHandlers(ifEquals(field.api_name,'Competitor_Duration'),'||',ifEquals(field.api_name,'Competitor_Sentiment')),'||',ifEquals(field.api_name,'Competitor_Name')),'','paddingElm cxSmFrInputWrapper')}}\"> <template is=\"for\" items=\"{{field.cxFieldsDetails}}\" item=\"rowObj\" index=\"fldInd\"> <div class=\"\"> <template is=\"if\" value=\"{{rowObj.cxLabel}}\"><template case=\"true\"> <span class=\"mR2\">{{rowObj.cxLabel}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxDropDown_1,'&amp;&amp;',rowObj.cxDropDown_1.cxShow)}}\"><template case=\"true\"> <lyte-dropdown class=\"{{rowObj.cxDropDown_1.class}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"cxDropDown_1_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"cxDropDown_1_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(rowObj.cxDropDown_1.selectedValue)}}\" on-option-selected=\"{{method('getDropDownVal')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{rowObj.cxDropDown_1.values}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxElement_1,'&amp;&amp;',rowObj.cxElement_1.cxShow)}}\"><template case=\"true\"> <template is=\"component\" class=\"{{rowObj.cxElement_1.class}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(rowObj.cxElement_1,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{rowObj.cxElement_1.maxValue}}\" cx-prop-minvalue=\"{{rowObj.cxElement_1.minValue}}\" cx-prop-maxlength=\"{{rowObj.cxElement_1.maxLength}}\" cx-prop-placeholder=\"{{rowObj.cxElement_1.placeholder}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{rowObj.cxElement_1.cxClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{rowObj.cxElement_1}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{rowObj.cxElement_1.selectedValue}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{rowObj.cxElement_1.cxDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"true\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{rowObj.cxElement_1.cxDisableExtraValue}}\" cx-prop-type=\"{{rowObj.cxElement_1.cxType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{rowObj.cxElement_1.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"id_{{cruxReplace(field.api_name,'[/.]','_')}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxElement_2,'&amp;&amp;',rowObj.cxElement_2.cxShow)}}\"><template case=\"true\"> <template is=\"component\" class=\"{{rowObj.cxElement_2.class}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(rowObj.cxElement_2,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{rowObj.cxElement_2.maxValue}}\" cx-prop-minvalue=\"{{rowObj.cxElement_2.minValue}}\" cx-prop-maxlength=\"{{rowObj.cxElement_2.maxLength}}\" cx-prop-placeholder=\"{{rowObj.cxElement_2.placeholder}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{rowObj.cxElement_2.cxClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{rowObj.cxElement_2}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{rowObj.cxElement_2.selectedValue}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{rowObj.cxElement_2.cxDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"true\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{rowObj.cxElement_2.cxDisableExtraValue}}\" cx-prop-type=\"{{rowObj.cxElement_2.cxType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{rowObj.cxElement_2.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"id_{{cruxReplace(field.api_name,'[/.]','_')}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxDropDown_2,'&amp;&amp;',rowObj.cxDropDown_2.cxShow)}}\"><template case=\"true\"> <lyte-dropdown class=\"{{rowObj.cxDropDown_2.class}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"cxDropDown_2_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"cxDropDown_2_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(rowObj.cxDropDown_2.selectedValue)}}\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"for\" items=\"{{crossFields}}\" item=\"Obj\" index=\"index\"> <template is=\"if\" value=\"{{Obj.isCheckBox}}\"><template case=\"true\"> <div class=\"facet mL10\"><lyte-checkbox title=\"{{Obj.field_label}}\" value=\"{{Obj.api_name}}\" data-zcqa=\"\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,Obj)}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('inputValueChanged',Obj,true)}}\"></lyte-checkbox> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(Obj.isRadioBtn,'!==',false)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"{{field.column_name}}_{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{radioBtnIsSelected(field,Obj,true)}}\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('getCrossFieldOption',index,Obj)}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(Obj.showSubField,'!==',false)}}\"><template case=\"true\"> <crux-smart-filter-input class=\"{{Obj.cxClass}}\" id=\"sub_option_{{Obj.api_name}}\" cx-prop-field=\"{{Obj}}\" module=\"{{if(ifEquals(module,'Activities'),Obj.module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',Obj,false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> </template> </div> </template> </div> </template><template case=\"false\"> <div class=\"{{if(expHandlers(expHandlers(ifEquals(field.api_name,'Competitor_Duration'),'||',ifEquals(field.api_name,'Competitor_Sentiment')),'||',ifEquals(field.api_name,'Competitor_Name')),'','paddingElm cxSmFrInputWrapper')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.cxFilter_RecordAction,'==',true),'||',expHandlers(field.api_name,'==',&quot;Recommendation&quot;))}}\"><template case=\"true\"> <div class=\"cxSmartFilterTwoCol\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"record_{{field.field_label}}\" class=\"{{dropDownWidth.headDropDownWidth}}\" id=\"record_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-selected=\"{{lbind(selectedValues.headDropDownValue)}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{field.values}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'===',&quot;SimilarityAvailable&quot;)}}\"><template case=\"true\"> <div class=\"facet mB5\"> <div class=\"cxSmartFilterInputSimAvailable \"> <div class=\"facet mL20 mB10\"> <lyte-checkbox title=\"{{crossFields[0].field_label}}\" data-zcqa=\"{{field.column_name}}_{{crossFields[0].api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,crossFields[0])}}\" id=\"sub_field_{{crossFields[0].api_name}}\" lt-prop-value=\"{{crossFields[0].api_name}}\" lt-prop-label=\"{{crossFields[0].field_label}}\" on-changed=\"{{method('getCrossFieldOption',null,crossFields[0])}}\"> </lyte-checkbox> <template is=\"if\" value=\"{{similarity.isScore}}\"><template case=\"true\"> <crux-smart-filter-input id=\"sub_option_{{crossFields[0].api_name}}\" cx-prop-field=\"{{crossFields[0]}}\" module=\"{{if(ifEquals(module,'Activities'),crossFields[0].module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',crossFields[0],false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"> </crux-smart-filter-input> </template></template> </div> <div class=\"facet mL20 mB10\"> <lyte-checkbox title=\"{{crossFields[1].field_label}}\" data-zcqa=\"{{field.column_name}}_{{crossFields[1].api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,crossFields[1])}}\" id=\"sub_field_{{crossFields[1].api_name}}\" lt-prop-value=\"{{crossFields[1].api_name}}\" lt-prop-label=\"{{crossFields[1].field_label}}\" on-changed=\"{{method('getCrossFieldOption',null,crossFields[1])}}\"> </lyte-checkbox> <template is=\"if\" value=\"{{similarity.isRecords}}\"><template case=\"true\"> <crux-smart-filter-input id=\"sub_option_{{crossFields[1].api_name}}\" cx-prop-field=\"{{crossFields[1]}}\" module=\"{{if(ifEquals(module,'Activities'),crossFields[1].module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',crossFields[1],false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"> </crux-smart-filter-input> </template></template> </div> </div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;Recommendation&quot;),'&amp;&amp;',renderRecommendation)}}\"><template case=\"true\"> <div class=\"facet mB5\"> <div class=\"mB0\"> <template is=\"if\" value=\"{{expHandlers(selectedValues.headDropDownValue,'===',&quot;selected&quot;)}}\"><template case=\"true\"> <div class=\"dB mB5 \"> <lyte-dropdown lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" class=\"w260 cxMXNFld\" id=\"multiSelect_lookup_{{cruxReplace(field.api_name,'[/.]','_')}}_infield\" lt-prop-yield=\"true\" on-add=\"{{method('addToList','Recommendation_infield')}}\" on-remove=\"{{method('removeFromList')}}\" on-show=\"{{method('onShowDropBox')}}\" on-hide=\"{{method('onBeforeHide')}}\" lt-prop-type=\"multisearch\" on-option-selected=\"{{method('inputValueChanged')}}\" on-value-change=\"{{method('changeUserInputValue')}}\" lt-prop-selected=\"{{selectedValues.multiSelectFieldValue1}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"dB\"> <div class=\"lyteMultiselect\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{renderItems2}}\" item=\"selitem\" index=\"indexval\"> <li id=\"renderItems_{{selitem[lookupDisplayField]}}_infield\" class=\"rec\" data-value=\"{{selitem.id}}\"> <span class=\"lyteDropdownVisible\">{{selitem[lookupDisplayField]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input id=\"{{field.api_name}}_infield_Search_val\" on-value-change=\"{{method('onSearch')}}\" onclick=\"{{action('toggleDropDown',field,'Recommendation_infield')}}\" lt-prop-placeholder=\"{{placeholderValue[0]}}\"></lyte-input> </li> </ul> </div> </lyte-drop-button> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox lookup_result_Box\"> <lyte-drop-body class=\"result_items\"> <template is=\"if\" value=\"{{displayMsg.multiLookupMsg}}\"><template case=\"true\"> <div id=\"display_msg_{{cruxReplace(field.api_name,'[/.]','_')}}\" class=\"select2-results__option select2-results__message\">{{displayMsg.multiLookupMsg}}</div> </template></template> <template is=\"for\" items=\"{{lookUpArray}}\" item=\"item\" index=\"indval\"> <lyte-drop-item id=\"campaign_{{item[lookupDisplayField]}}\" class=\"campaigns_item\" data-value=\"{{item.id}}\" data-zcqa=\"{{field.field_label}}_{{item[lookupDisplayField]}}\"> {{item[lookupDisplayField]}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <div class=\"cxSmartFilterLabelWrap\"> <span class=\"cxSmartFilterLabel \">{{cruxGetI18n('crm.filter.label.in')}}</span> </div> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.FirstTime,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.first_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.FirstTime[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.FirstTime[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Dependent,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.cross_selling)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Dependent[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Dependent[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Bundle,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.bundle)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Bundle[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Bundle[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Repeat,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.re_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Repeat[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Repeat[dropdownDispValue]}}\"></lyte-checkbox> </div> <div class=\"cxSmartFilterLabelWrap\"> <template is=\"if\" value=\"{{recommendationBasedOn.re_buy}}\"><template case=\"true\"> <span class=\"mR5 cxSmartFilterLabelContent \" style=\"font-size: 14px;\">{{cruxGetI18n('crm.filter.label.and.purchase.in')}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(selectedValues.firstDropDownValue,'==',&quot;CUSTOM&quot;)}}\"><template case=\"true\"> <div id=\"Recommendation_custom_div1\"> <crux-date-component cx-prop-from=\"filter\" cx-prop-class=\"w100\" id=\"Recommendation_custom\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{lbind(selectedValues.headDateValue)}}\"></crux-date-component> </div> </template></template> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Sequence,'!==',undefined)}}\"><template case=\"true\"> <div class=\"dB mB5 mT10\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.next_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Sequence[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Sequence[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> </div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.cxFieldsDetails,'&amp;&amp;',field.cxFieldsDetails[0]),'||',expHandlers(field.field_data_type,'==',&quot;custom&quot;)),'||',expHandlers(field.api_name,'==',&quot;cxFilter_Email_Sentiment&quot;)),'||',expHandlers(field.api_name,'==',&quot;best_time&quot;))}}\"><template case=\"true\"> <div class=\"cxSmartFilterTwoCol {{if(expHandlers(field.api_name,'==','best_time'),'mT10')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.cxFieldsDetails,'!'),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Status&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Sentiment&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;best_time&quot;))}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{cruxGetI18n('crm.label.By')}}</span> </template></template> <template is=\"if\" value=\"{{field.cxFieldsDetails}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{field.cxFieldsDetails[0].cxLabel}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;best_time&quot;)}}\"><template case=\"true\"> <span class=\"mR5\">{{cruxGetI18n('crm.label.available')}}</span> </template></template> <lyte-dropdown class=\"w150\" lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"by_{{field.field_label}}\" id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('showSentStatus',field)}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.byDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{bydropdownOption}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(userDetails,'&amp;&amp;',expHandlers(userDetails.NBX_GOAL,'!')),'&amp;&amp;',expHandlers(field.data_type,'===',&quot;NBX&quot;)),'&amp;&amp;',expHandlers(field.api_name,'===',&quot;NBX_Available&quot;))}}\"><template case=\"true\"> <crux-picklist-component cx-prop-from=\"filter\" cx-prop-box-class=\"cxSmartFilterDropbox\" data-zcqa=\"NBX_ACTIVITY_OPTION\" id=\"NBX_ACTIVITY_OPTION\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-field=\"{{field}}\"> </crux-picklist-component> <div class=\"mT5\"> <span class=\"mR5 cxPickListContent dIB cxVam\">{{cruxGetI18n('crm.zia.nbx.filter.due')}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"NBX_TIME_OPTION\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <div class=\"cvRowField\"> <template is=\"if\" value=\"{{expHandlers(field.parent_field,'==',&quot;prediction&quot;)}}\"><template case=\"true\"> <div class=\"cxPredictionContent\"> <template is=\"if\" value=\"{{expHandlers(predictionSelectedType.first,'||',predictionSelectedType.second)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <span class=\" cxPredictionSelectedTypeContent mR5 dIB cxVam mB10\">{{predictionSelectedType.predict_field[0].field_label}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.api_name}}\" lt-prop-freeze=\"true\" id=\"criteria_comparator\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','prediction_criteria')}}\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{predictionOptions.criteria_operator}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" data-zcqa=\"{{item['display']}}\"> {{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(criteriaDisplay,'&amp;&amp;',expHandlers(isCriteriaBetween,'==',false)),'&amp;&amp;',expHandlers(showSecondDropdownType,'!=',&quot;date&quot;))}}\"><template case=\"true\"> <div class=\"{{if(ifEquals(predictionEle,'date'),'cxShowSecondDropdownType','')}}\"> <template is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-class=\"mB5 {{setWidth}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue}}\"></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(showSecondDropdownType,'==',&quot;date&quot;)}}\"><template case=\"true\"> <div class=\"cxShowSecondDropdownContent\"> <crux-number-component cx-prop-from=\"filter\" data-zcqa=\"dateInput\" id=\"dateInput\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.dateVal)}}\"> </crux-number-component> <lyte-dropdown class=\"w80\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.column_name}}_dateOptions\" id=\"second_{{field.api_name}}_dropdown\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.secondDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template></template></template> </div> <template is=\"if\" value=\"{{expHandlers(criteriaDisplay,'&amp;&amp;',isCriteriaBetween)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <div class=\"mB5\"> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction_0\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue0}}\"></template> <span class=\"cxCriteriaDisplayContent\"> - </span> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction_1\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue1}}\"></template> </div> </div> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{predictionSelectedType.completed}}\"><template case=\"true\"> <div class=\"mL10\"> <lyte-radiobutton tabindex=\"0\" data-zcqa=\"{{successFailureOption[0].display}}\" id=\"sub_field_{{successFailureOption[0].system}}\" lt-prop-name=\"option_{{field.api_name}}\" lt-prop-value=\"{{successFailureOption[0].system}}\" lt-prop-label=\"{{successFailureOption[0].display}}\" lt-prop-type=\"primary\" on-checked=\"{{method('getCrossFieldOption',0,successFailureOption[0])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <template is=\"if\" value=\"{{expHandlers(expHandlers(isSuccess,'==',&quot;true&quot;),'&amp;&amp;',expHandlers(isSuccess,'!=',&quot;undefined&quot;))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"successFailureDropDown\" class=\"mT10\" id=\"record_{{field.api_name}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_SF')}}\" lt-prop-selected=\"{{lbind(selectedOptionSf)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{successFailureDropDown}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <div class=\"mL10\"> <lyte-radiobutton tabindex=\"0\" data-zcqa=\"{{successFailureOption[1].display}}\" id=\"sub_field_{{successFailureOption[1].system}}\" lt-prop-name=\"option_{{field.api_name}}\" lt-prop-value=\"{{successFailureOption[1].system}}\" lt-prop-label=\"{{successFailureOption[1].display}}\" lt-prop-type=\"primary\" on-checked=\"{{method('getCrossFieldOption',1,successFailureOption[1])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <template is=\"if\" value=\"{{expHandlers(expHandlers(isSuccess,'!=',&quot;true&quot;),'&amp;&amp;',expHandlers(isSuccess,'!=',&quot;undefined&quot;))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"successFailureDropDown\" class=\"mT10\" id=\"record_{{field.api_name}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_SF')}}\" lt-prop-selected=\"{{lbind(selectedOptionSf)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{successFailureDropDown}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(predictionSelectedType.score_field,'!=',undefined)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(isScoreSelected)}}\" id=\"scoreCheckBox\" lt-prop-name=\"{{predictionSelectedType.score_field.api_name}}\" lt-prop-value=\"{{predictionSelectedType.score_field.id}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-label=\"{{cruxGetI18n('crm.zia.prediction.likelihood')}}\" class=\"mT5 mB10\"> </lyte-checkbox> <template is=\"if\" value=\"{{isScoreSelected}}\"><template case=\"true\"> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.api_name}}\" lt-prop-freeze=\"true\" id=\"score_criteria_comparator\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','score_criteria')}}\" lt-prop-selected=\"{{lbind(selectedValues.scoreComparator)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{predictionOptions.score_operator}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" data-zcqa=\"{{item['display']}}\"> {{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(scoreCriteriaDisplay,'&amp;&amp;',expHandlers(isScoreBetween,'==',false))}}\"><template case=\"true\"> <template is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction\" component-name=\"crux-number-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-maxlength=\"3\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue)}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(scoreCriteriaDisplay,'&amp;&amp;',isScoreBetween)}}\"><template case=\"true\"> <div class=\"mB5\"> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction_0\" component-name=\"crux-number-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-maxlength=\"3\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue0)}}\"></template> <span class=\"cxScoreCriteriaDisplay\"> - </span> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction_1\" component-name=\"crux-number-component\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" cx-prop-module=\"{{module}}\" cx-prop-maxlength=\"3\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue1)}}\"></template> </div> </template></template> </template></template> </div> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(predictionSelectedType.first,'||',predictionSelectedType.second),'&amp;&amp;',isTrendShown)}}\"><template case=\"true\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(isTrendSelected)}}\" id=\"trendCheckBox\" data-zcqa=\"by_{{field.field_label}}\" class=\"cxSfTrendCheckbox\"> </lyte-checkbox> <lyte-dropdown class=\"w150\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"trend\" id=\"record_{{field.api_name}}\" lt-prop-selected=\"{{lbind(selectedTrend)}}\" lt-prop-disabled=\"{{if(ifEquals(isTrendSelected,false),true,false)}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_trend')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{trendOption}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(options.length,'&amp;&amp;',firstDropdown),'&amp;&amp;',expHandlers(field.api_name,'!==',&quot;SimilarityRecords&quot;)),'&amp;&amp;',expHandlers(field.data_type,'!==',&quot;NBX&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!==',&quot;Competitor_Sentiment&quot;)),'&amp;&amp;',expHandlers(field.field_data_type,'!==',&quot;crossModule&quot;))}}\"><template case=\"true\"> <lyte-dropdown class=\"{{setWidth}} {{setMargin}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('getDropDownVal')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" before-select=\"{{method('beforeSelectDropDown')}}\" lt-prop-disabled-list=\"{{optionsDisabledList}}\" on-before-show=\"{{method('beforeOptionsSet')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\" data-custom-tooltip=\"{{if(item.cxTitle,'true','false')}}\" lt-prop-title=\"{{item.cxTitle}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxElement1,'&amp;&amp;',valuePrefixDropdownOpt.prefixOption),'&amp;&amp;',valuePrefixDropdownOpt.prefixOption.length)}}\"><template case=\"true\"> <crux-dropdown id=\"cxPrefixDD\" data-zcqa=\"cxPrefixdropdown\" cx-prop-options=\"{{valuePrefixDropdownOpt.prefixOption}}\" cx-prop-user-value=\"display_value\" cx-prop-system-value=\"actual_value\" on-option-select=\"{{method('onPrefixSelection')}}\" cx-prop-selected=\"{{valuePrefixDropdownOpt.selected.actual_value}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(selectedValues.firstDropDownValue,'==',&quot;CUSTOM&quot;)}}\"><template case=\"true\"> <div id=\"Recommendation_custom_div\"> <crux-date-component cx-prop-from=\"filter\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-class=\"w100\" id=\"Recommendation_custom\" cx-prop-value=\"{{selectedValues.headDateValue}}\"></crux-date-component> </div> </template></template> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'||',expHandlers(expHandlers(field.field_data_type,'===',&quot;multirelation&quot;),'||',expHandlers(expHandlers(field.field_data_type,'==',&quot;multiselectlookup&quot;),'&amp;&amp;',expHandlers(field.ui_type,'!=',445)))),'||',expHandlers(field.api_name,'===',&quot;SimilarityRecords&quot;)),'||',isChildFieldLookup)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'&amp;&amp;',opt1.length)}}\"><template case=\"true\"> <div> <lyte-dropdown class=\"w250\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.field_label}}_filterOptions\" id=\"DDV1_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.headDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{opt1}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <lyte-dropdown lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" class=\"cxBoxDropdown {{if(expHandlers(field.api_name,'===','SimilarityRecords'),w150,w250)}} dB cxMXNFld\" id=\"multiSelect_lookup_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-yield=\"true\" on-add=\"{{method('addToList',field.api_name)}}\" on-remove=\"{{method('removeFromList')}}\" on-show=\"{{method('onShowDropBox',field.api_name,this)}}\" on-hide=\"{{method('onBeforeHide')}}\" lt-prop-type=\"multisearch\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" lt-prop-selected=\"{{lbind(selectedValues.multiSelectFieldValue)}}\" lt-prop=\"{{childCompProps}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"dB\"> <div class=\"lyteMultiselect\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{renderItems}}\" item=\"selitem\" index=\"indexval\"> <li id=\"renderItems_{{selitem[lookupDisplayField]}}\" class=\" lyteMultipleSelect {{if(ifEquals(indexval,0),'')}}\" data-value=\"{{selitem.id}}\"> <span class=\"lyteDropdownVisible\">{{selitem[lookupDisplayField]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_Search_val\" on-value-change=\"{{method('onSearch')}}\" onclick=\"{{action('toggleDropDown',field,'',this)}}\" lt-prop-placeholder=\"{{placeholderValue[0]}}\" onkeydown=\"{{action('preventDefault',this,event)}}\"></lyte-input> </li> </ul> </div> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox lookup_result_Box {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body class=\"result_items\"> <template is=\"if\" value=\"{{displayMsg.multiLookupMsg}}\"><template case=\"true\"> <div id=\"display_msg_{{cruxReplace(field.api_name,'[/.]','_')}}\" class=\"select2-results__option select2-results__message\">{{displayMsg.multiLookupMsg}}</div> </template></template> <template is=\"for\" items=\"{{lookUpArray}}\" item=\"item\" index=\"indval\"> <lyte-drop-item id=\"campaign_{{item[lookupDisplayField]}}\" class=\"campaigns_item\" data-value=\"{{item.id}}\" data-zcqa=\"{{field.field_label}}_{{item[lookupDisplayField]}}\"> {{item[lookupDisplayField]}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'&amp;&amp;',memberStatus)}}\"><template case=\"true\"> <div id=\"memberStatus\"> <template is=\"component\" cx-prop-class=\"w250 dB\" data-zcqa=\"memberStatus\" id=\"memberStatusField\" component-name=\"crux-picklist-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-box-class=\"cxSmartFilterDropbox\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value2}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.filters.select.campaign.status',cruxGetI18n('campaign.Member'))}}\" cx-prop-id=\"memberStatus\" cx-prop-appearance=\"box\"></template> </div> <template is=\"if\" value=\"{{expHandlers(field.serviceStatus,'&amp;&amp;',field.serviceStatus.length)}}\"><template case=\"true\"> <div id=\"serviceStatus\"> <template is=\"component\" cx-prop-class=\"w250 dB\" data-zcqa=\"serviceStatus\" id=\"serviceStatusField\" component-name=\"crux-picklist-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-box-class=\"cxSmartFilterDropbox\" cx-prop-field=\"{{field}}\" cx-prop-picklist-values=\"{{field.serviceStatus}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.Service_Status}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.filters.select.campaign.status',cruxGetI18n('Service'))}}\" cx-prop-id=\"serviceStatus\"></template> </div> </template></template> </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxElement1,'&amp;&amp;',expHandlers(isChildFieldLookup,'!')),'&amp;&amp;',expHandlers(showSecondDropdownType,'!=',&quot;between&quot;))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAssetsCompMapping[field.api_name]}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{cruxAssetsCompMapping[field.api_name]}}\" field=\"{{field}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" comparator=\"{{selectedValues.firstDropDownValue}}\" selected-value=\"{{selectedValues.value1}}\" criteria=\"{{cxPropCriteria}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" from=\"smart_filter\"></template> </template><template case=\"false\"> <template is=\"component\" cx-prop-box-class=\"cxSmartFilterDropbox\" class=\"{{field.cxFilterClass.cruxElement1}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(cruxElement1,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-placeholder=\"{{placeholderValue[0]}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{numberDropClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement1}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{selectedValues.value1}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{numberFieldDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"{{field.cxLoginUser}}\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{field.cxDisableExtraValue}}\" cx-prop-type=\"{{field.cxPropType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{field.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"{{elementsCompId}}\" cx-prop-callback-delay=\"{{defaultUndefined}}\" cx-prop=\"{{childCompProps}}\" cx-prop-min-max-validation=\"{{field.cxMinMaxValidate}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;percentage&quot;)}}\"><template case=\"true\"> <span class=\"present \">%</span> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cruxElement1,'&amp;&amp;',expHandlers(field.field_data_type,'==',&quot;picklist&quot;)),'&amp;&amp;',field.history_tracking),'&amp;&amp;',expHandlers(isChildInput,'!'))}}\"><template case=\"true\"> <div id=\"picklist_tracker_field\" class=\"facet p5 \"> <lyte-checkbox data-zcqa=\"history_Tracking\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_picklist_tracker\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone\" lt-prop-disabled=\"true\" lt-prop-label=\"{{cruxGetI18n('crm.events.duration')}}\" on-changed=\"{{method('picklistTrackerDuration')}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"></lyte-checkbox> <div id=\"durationField\" class=\"durationFilter pL20 pT10 eventNone op5\"> <lyte-dropdown data-zcqa=\"history_Tracking_Options\" lt-prop-freeze=\"true\" id=\"DDV1_{{cruxReplace(field.api_name,'[/.]','_')}}_picklistTracker\" lt-prop-index=\"1\" on-option-selected=\"{{method('getDropDownVal')}}\" lt-prop-user-value=\"display\" lt-prop-system-value=\"system\" lt-prop-options=\"{{durationOpt}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.HT_DropDownValue)}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"></lyte-dropdown> <template is=\"component\" data-zcqa=\"history_Tracking_value\" cx-prop-class=\"w100\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_historyTrackDurationDays\" component-name=\"crux-number-component\" cx-prop-maxlength=\"4\" cx-prop-decimal-allowed=\"false\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-value=\"{{value}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-appearance=\"box\"></template> <span class=\"cxAriaPrefixLabel present\" style=\"display: inline-block;\">{{cruxGetI18n('days')}}</span> </div> </div> </template></template></template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(showSecondDropdownType,'==',&quot;date&quot;),'&amp;&amp;',expHandlers(expHandlers(field.api_name,'!=',&quot;Prediction_0&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;Prediction_1&quot;)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(field.ui_type,'==',132)}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{cruxGetI18n('crm.label.simply.in')}}</span> </template></template> <lyte-dropdown class=\"{{field.cxFilterClass.secondDropDownClass}} mB7\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.column_name}}_dateOptions\" id=\"second_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdown\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.secondDropDownValue)}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(showSecondDropdownType,'==',&quot;between&quot;),'&amp;&amp;',expHandlers(expHandlers(field.api_name,'!=',&quot;Prediction_0&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;Prediction_1&quot;)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAssetsCompMapping[field.api_name]}}\"><template case=\"true\"> <div> <template is=\"component\" component-name=\"{{cruxAssetsCompMapping[field.api_name]}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" field=\"{{field}}\" selected-value=\"{{selectedValues.value1}}\" comparator=\"{{selectedValues.firstDropDownValue}}\" criteria=\"{{cxPropCriteria}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" from=\"smart_filter\"></template> </div> </template><template case=\"false\"> <div> <template is=\"component\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-class=\"{{numberDropClass}}\" cx-prop-zcqa=\"fromdate_{{field.display_field_label}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement2}}-component\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-placeholder=\"{{placeholderValue[1]}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value1}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-appearance=\"box\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop=\"{{childCompProps}}\"></template> <span id=\"betweenDateText\"> - </span> <template is=\"component\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-class=\"{{numberDropClass}}\" cx-prop-zcqa=\"todate_{{field.display_field_label}}\" id=\"between_{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement2}}-component\" cx-prop-from=\"filter\" cx-prop-placeholder=\"{{placeholderValue[2]}}\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value2}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-appearance=\"box\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop=\"{{childCompProps}}\"></template> </div> </template></template> </template></template></template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cruxElement1,'!=',undefined),'&amp;&amp;',expHandlers(cruxElement1,'!=',&quot;&quot;)),'&amp;&amp;',expHandlers(field.field_data_type,'==',&quot;currency&quot;)),'&amp;&amp;',expHandlers(iscurrencyField,'==',true)),'&amp;&amp;',expHandlers(field.crypt,'!'))}}\"><template case=\"true\"> </template></template><template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;cxFilter_Email_Sentiment&quot;)}}\"><template case=\"true\"> <div class=\"andSectionEmailStat \">{{cruxGetI18n('and')}} <span id=\"clearEmailSentimentSubfield\" class=\"andsecClear cxTxtAR fR cxLink cP hide mR40\" style=\"display: inline;\" onclick=\"{{action('clearEmailSentiment')}}\">{{cruxGetI18n('crm.title.clear.name')}}</span> </div> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[0].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[0].api_name}}\" lt-prop-label=\"{{crossFields[0].field_label}}\" on-checked=\"{{method('getCrossFieldOption',0,crossFields[0])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <crux-smart-filter-input id=\"sub_option_{{crossFields[0].api_name}}\" cx-prop-field=\"{{crossFields[0]}}\" module=\"{{module}}\" on-value-change=\"{{method('inputValueChanged')}}\" ccx-prop-value=\"{{selectedValues.value1}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> <template is=\"if\" value=\"{{expHandlers(expHandlers(Email_Sentiment_Value,'==',2),'||',expHandlers(Email_Sentiment_Value,'==',3))}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[1].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[1].api_name}}\" lt-prop-label=\"{{crossFields[1].field_label}}\" on-checked=\"{{method('getCrossFieldOption',1,crossFields[1])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <crux-smart-filter-input id=\"sub_option_{{crossFields[1].api_name}}\" cx-prop-field=\"{{crossFields[1]}}\" module=\"{{module}}\" on-value-change=\"{{method('inputValueChanged')}}\" cx-prop-value=\"{{selectedValues.value1}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> <template is=\"if\" value=\"{{expHandlers(Email_Sentiment_Value,'==',3)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[2].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[2].api_name}}\" lt-prop-label=\"{{crossFields[2].field_label}}\" on-checked=\"{{method('getCrossFieldOption',2,crossFields[2])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template> </template></template> <template is=\"if\" value=\"{{sentStatusFlag}}\"><template case=\"true\"> <div style=\"margin-top: 5px; display: block;\"> <template is=\"if\" value=\"{{sentStatusFlag}}\"><template case=\"true\"> <strong class=\"cxAriaPrefixLabel\" style=\"color:#111\">{{cruxGetI18n('crm.label.status.is')}}</strong> </template></template> <template is=\"for\" items=\"{{sentStatus}}\" item=\"Obj\" index=\"index\"> <div><lyte-radiobutton data-zcqa=\"{{field.column_name}}:{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{if(ifEquals(sentStatus[0].api_name,Obj.api_name),true,false)}}\" lt-prop-name=\"{{if(ifEquals(field.api_name,'cxFilter_Email_Status'),'sent_status','RecentPrediction')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-checked=\"{{method('getCrossFieldOption')}}\" style=\"display: inline-block;\"></lyte-radiobutton> <span lt-prop-title=\"{{convesationTitle}}\" class=\"{{if(ifEquals(Obj.api_name,'last3'),'informationpredict','')}}\"></span> </div> </template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(crossFields.length,'||',expHandlers(field.api_name,'===',&quot;cxFilter_Competitor_Alert&quot;)),'||',expHandlers(field.field_data_type,'===',&quot;ABM_Scores&quot;)),'||',expHandlers(field.field_data_type,'===',&quot;ABM_Techniques&quot;)),'||',expHandlers(field.field_data_type,'==',&quot;rfm&quot;)),'||',expHandlers(field.api_name,'==',&quot;Similarity&quot;)),'||',field.Activity_tag),'||',expHandlers(expHandlers(expHandlers(field.field_data_type,'==',&quot;crossfield&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Campaigns&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Sentiment&quot;))),'||',expHandlers(field.api_name,'==',&quot;Prediction&quot;)),'||',expHandlers(field.api_name,'===','next_best_experience'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{field.Activity_tag}}\"><template case=\"true\"> <div style=\"position: relative; top: 4px; margin-bottom: 10px; left: 8px; font-size: 12.5px; font-weight:bold;\">{{cruxGetI18n(\"crm.label.tag.related.to\")}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'!=','cxFilter_Email_Sentiment'),'&amp;&amp;',expHandlers(field.api_name,'!=','SimilarityAvailable'))}}\"><template case=\"true\"><div class=\"{{if(field.Activity_tag,'pR left20','')}} \"> <template is=\"for\" items=\"{{crossFields}}\" item=\"Obj\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(Obj.cxHide,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{Obj.isCheckBox}}\"><template case=\"true\"> <div class=\"facet mL10\"><lyte-checkbox title=\"{{Obj.field_label}}\" value=\"{{Obj.api_name}}\" data-zcqa=\"{{Obj.api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,Obj)}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('inputValueChanged',Obj,true)}}\"></lyte-checkbox> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(Obj.isRadioBtn,'!==',false)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"{{field.column_name}}_{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{radioBtnIsSelected(field,Obj,true)}}\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('getCrossFieldOption',index,Obj)}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template></template></template> <template is=\"if\" value=\"{{Obj.cxLabel}}\"><template case=\"true\"> <div class=\"{{if(Obj.cxClass,Obj.cxClass,'')}}\" style=\"{{if(Obj.cxStyle,Obj.cxStyle,'')}}\">{{unescape(Obj.cxLabel)}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(Obj.api_name,'==',&quot;Locked_True&quot;)}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\" id=\"recLock\" style=\"display: none\">{{cruxGetI18n('crm.label.via')}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(Obj.showSubField,'!==',false)}}\"><template case=\"true\"> <crux-smart-filter-input class=\"{{Obj.cxClass}}\" id=\"sub_option_{{Obj.api_name}}\" cx-prop-field=\"{{Obj}}\" module=\"{{if(ifEquals(module,'Activities'),Obj.module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',Obj,false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> </template></template> </template> </div></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(field.field_data_type,'===',&quot;crossModule&quot;)}}\"><template case=\"true\"> <div class=\"cxSmFrCrossFldModuleWrap\"> <span class=\"cxSmFrCrossFldModuleLable\">{{field.parentModuleLabel}}</span> <lyte-dropdown data-zcqa=\"crossModule_Input_{{field.field_label}}\" lt-prop-selected=\"{{lbind(selectedValues.value)}}\" class=\"cxSmFrCrossFldDropdown\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox\"> <lyte-drop-body> <lyte-drop-item data-value=\"with\">{{cxPropCrossFilterTranslations.crossFilterConditions.opt1}}</lyte-drop-item> <lyte-drop-item data-value=\"without\">{{cxPropCrossFilterTranslations.crossFilterConditions.opt2}}</lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span>{{cruxGetI18n('crm.label.any')}} {{field.field_label}}</span> </div> </template></template> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"for","position":[1,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"for","position":[3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,11]},{"type":"if","position":[1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,13]},{"type":"if","position":[1,1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"registerYield","position":[1,7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,7]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3]}]}},"default":{}},{"type":"attr","position":[1,11,1]},{"type":"if","position":[1,11,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"component","position":[1,1,1],"dynamicNodes":[]},{"type":"attr","position":[1,1,5]},{"type":"component","position":[1,1,5],"dynamicNodes":[]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,5]},{"type":"component","position":[1,5],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,3]},{"type":"if","position":[1,11,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,4]},{"type":"if","position":[1,11,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"registerYield","position":[2,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"for","position":[3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[2]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,6]},{"type":"if","position":[1,11,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"component","position":[1,3,3],"dynamicNodes":[]},{"type":"text","position":[1,3,5,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,7]},{"type":"if","position":[1,11,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,5]},{"type":"component","position":[1,5],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,14]},{"type":"if","position":[1,14],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"text","position":[1,2,0]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,16]},{"type":"if","position":[1,16],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]},{"type":"attr","position":[1,2]}]}]}},"default":{}},{"type":"attr","position":[1,18]},{"type":"if","position":[1,18],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["Obj.cxStyle","Obj.cxStyle","''"]}}}},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,20]},{"type":"if","position":[1,20],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,5,2]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropField","cxPropModule","cxPropCriteria","cxPropCommonInfo","cxPropCurrentUserDetails","cxPropModuleDisplayField","cxPropHideComparator","cxPropAutoCompleteInLookup","cxPropModuleRecordMapping","cxPropIgnoreCallbackInSetCriteria","cxPropIgnoreEmptyValue","idModuleMapping","field","rendered","options","cruxElement1","bydropdownOption","module","module_info","dateoptions","value","showSecondDropdownType","cruxElement2","sentStatusFlag","sentStatus","firstDropdown","crossFields","withOption","lookUpArray","renderItems","renderItems2","numberDropClass","iscurrencyField","recordDropdownValues","dropdownNames","durationOpt","lookupDisplayField","Email_Sentiment_Value","memberStatus","placeholderValue","maxLen","moduleDisplayField","selectedValues","tagSubModule","numberFieldDecimal","dropdownSysValue","dropdownDispValue","boundary","renderRecommendation","selectedRecommendations","crossSelling","reBuy","recommendationTypeSelected","recommendationBasedOnOption","recommendationBasedOn","reBuyVal","similarity","abmSegmentsList","abmSegmentsSearchedText","abmTechniqueFieldList","abmScoreFieldList","displayMsg","dropDownWidth","convesationTitle","predictionSelectedType","predictionData","trendOption","successFailureOption","successFailureDropDown","selectedOptionSf","sfAccuracyCount","sfEndCount","selectedTrend","isSuccess","isScoreSelected","isTrendSelected","isTrendShown","configLength","predictionOptions","criteriaDisplay","predictionEle","isCriteriaBetween","isScoreBetween","scoreCriteriaDisplay","roleRequestModel","predictionCriteria","scoreCriteria","userProperty","userDetails","cruxAssetsCompMapping","defaultUndefined","isChildInput","isChildFieldLookup","blockedCriteria","supportRelatedModules","optionsDisabledList","childCompProps","cxPropAria","valuePrefixDropdownOpt","cxPropEnableDateTime","elementsCompId","parentField"],
_observedAttributesType :["object","string","object","object","object","object","boolean","boolean","object","boolean","boolean","object","object","boolean","array","string","array","string","object","array","string","string","string","boolean","array","boolean","array","array","array","array","array","string","boolean","array","object","array","string","number","boolean","array","number","object","object","string","boolean","string","string","object","boolean","boolean","boolean","boolean","boolean","object","object","string","object","array","string","array","array","object","object","string","object","array","array","array","array","string","number","number","string","string","boolean","boolean","boolean","number","object","boolean","string","boolean","boolean","boolean","string","object","object","object","object","object","string","boolean","boolean","object","boolean","array","string","boolean","object","boolean","string","object"],
//no i18n
	data : function(){
		return{
			cxPropField : Lyte.attr("object"),//No I18n
			cxPropModule : Lyte.attr("string"),//No I18n
			cxPropCriteria : Lyte.attr("object"),//No I18n
			cxPropCommonInfo : Lyte.attr("object" , {default : {}}),//No I18n
			cxPropCurrentUserDetails : Lyte.attr("object"),//No I18n
			cxPropModuleDisplayField : Lyte.attr("object"),//no i18n
			cxPropHideComparator : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropAutoCompleteInLookup : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropModuleRecordMapping 	: Lyte.attr("object" , {default : {}}),//no i18n
			cxPropIgnoreCallbackInSetCriteria : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			idModuleMapping				:  Lyte.attr("object",{default : {}}),//no i18n
			field : Lyte.attr("object"),//No I18n
			// criteriaCondition : Lyte.attr("object" , { default : {} }),//No I18n
			
			rendered : Lyte.attr("boolean", {default : false}),//No I18n
			options : Lyte.attr("array"),//No I18n 
			cruxElement1 : Lyte.attr("string"),//No I18n
			bydropdownOption : Lyte.attr("array", {default : []}),//no i18n
			module : Lyte.attr("string"),//No I18n
			module_info :  Lyte.attr("object"),//No I18n
			dateoptions : Lyte.attr("array", {default : [{system : "DAYS", display : _cruxUtils.getI18n("days")}, {system : "WEEKS", display : _cruxUtils.getI18n("weeks")}, {system : "MONTHS", display : _cruxUtils.getI18n("months")}]}),//No I18n
			value : Lyte.attr("string"),//No I18n
			showSecondDropdownType : Lyte.attr("string"),//No I18n 
			cruxElement2 : Lyte.attr("string"),//No I18n
			sentStatusFlag : Lyte.attr('boolean',{default : false}), // no i18n
			sentStatus : Lyte.attr("array",{default : []}), //no i18n
			firstDropdown : Lyte.attr('boolean' ,{default : true}), //no i18n
			crossFields : Lyte.attr("array",{default : []}), //no i18n
			withOption : Lyte.attr("array",{default : [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{system : "equal", display : _cruxUtils.getI18n("on")},{system : "less_than", display : _cruxUtils.getI18n("before")},{system : "greater_than", display : _cruxUtils.getI18n("crm.label.general.small.after")},{system : "between", display : _cruxUtils.getI18n("between")},{system : '${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{system : "${YESTERDAY}", display : _cruxUtils.getI18n("Yesterday")},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{system : "${LASTWEEK}", display : _cruxUtils.getI18n("Last\ Week")},{system : "${LASTMONTH}", display : _cruxUtils.getI18n("Last\ Month")}]}), //no i18n
			lookUpArray : Lyte.attr('array', {default : []}), //no i18n
			renderItems : Lyte.attr('array',{default : []}), //no i18n
			renderItems2 : Lyte.attr('array',{default : []}), //no i18n
			numberDropClass : Lyte.attr("string",{default : ""}),//No I18n
			iscurrencyField : Lyte.attr("boolean",{default : false}), //No i18n
			recordDropdownValues : Lyte.attr('array',{default : []}), //no i18n
			dropdownNames : Lyte.attr('object'), //no i18n
			durationOpt : Lyte.attr('array',{default : []}), //no i18n
			lookupDisplayField : Lyte.attr('string'), //no i18n
			Email_Sentiment_Value : Lyte.attr('number',{default : 3}),//no i18n  
			memberStatus : Lyte.attr('boolean',{default : false}), //no i18n
			placeholderValue : Lyte.attr('array',{default : []}), //no i18n
			maxLen : Lyte.attr("number"),//no i18n
			moduleDisplayField : Lyte.attr("object"),//no i18n
			selectedValues : Lyte.attr("object", {default : {}}),//no i18n
			tagSubModule : Lyte.attr("string"),//no i18n
			numberFieldDecimal : Lyte.attr("boolean",{default : true}),//no i18n
			dropdownSysValue : Lyte.attr("string",{default : "system"}),//no i18n
			dropdownDispValue : Lyte.attr("string",{default : "display"}),//no i18n
			boundary : Lyte.attr("object",{default : {}}),//no i18n
            renderRecommendation : Lyte.attr("boolean", {default : true}),//No I18n
            selectedRecommendations : Lyte.attr("boolean", {default : false}),//No I18n
            crossSelling : Lyte.attr("boolean", {default : false}),//No I18n
            reBuy : Lyte.attr("boolean", {default : false}),//No I18n
			recommendationTypeSelected : Lyte.attr("boolean", {default : true}),//No I18n
			recommendationBasedOnOption : Lyte.attr("object", {default : {'first_buy':false,'cross_selling':false,'bundle':false,'re_buy':false,'next_buy':false}}),//No I18n
			recommendationBasedOn : Lyte.attr("object", {default : {'first_buy':false,'cross_selling':false,'bundle':false,'re_buy':false,'next_buy':false}}),//No I18n
			reBuyVal:Lyte.attr("string"),//no i18n
			similarity : Lyte.attr("object", {default : {'isScore':false, 'isRecords':false}}),//No I18n
			abmSegmentsList: Lyte.attr('array',{default : []}), // NO I18N
			abmSegmentsSearchedText: Lyte.attr('string',{default : ""}), // NO I18N
			abmTechniqueFieldList: Lyte.attr('array', {default: []}), // NO I18N
			abmScoreFieldList: Lyte.attr('array', {default: []}), // NO I18N
			displayMsg : Lyte.attr("object" ,{default : {}}),//no i18n
			dropDownWidth  :  Lyte.attr("object" , {default : {}}),//no i18n
			// zohoCampStatus : Lyte.attr("array",{default: [{'actual_value' : "Sent" , 'display_value' : "Sent" },{'actual_value' : "Opened" , 'display_value' : "Opened" },{'actual_value' : "Clicked" , 'display_value' : "Clicked" },{'actual_value' : "Bounced" , 'display_value' : "Bounced" },{'actual_value' : "Marked as Spam" , 'display_value' : "Marked as Spam" },{'actual_value' : "Replied" , 'display_value' : "Replied" }]}), //no i18n
			// otherMemberStatus :Lyte.attr("array"),//no i18n
			convesationTitle : Lyte.attr("string"),//no i18n
			predictionSelectedType : Lyte.attr("object",{default:{}}),//No I18n
			predictionData : Lyte.attr("array"),//No I18n
			trendOption : Lyte.attr("array"),//No I18n
			successFailureOption : Lyte.attr("array"),//No I18n
			successFailureDropDown : Lyte.attr("array"),//No I18n
			selectedOptionSf : Lyte.attr("string"),//No I18n
			sfAccuracyCount :  Lyte.attr("number",{default:0}),//No I18n
			sfEndCount : Lyte.attr("number",{default:0}),//No I18n
			selectedTrend : Lyte.attr("string"),//No I18n
			isSuccess : Lyte.attr("string",{default:"undefined"}),//No I18n
			isScoreSelected : Lyte.attr("boolean",{default:false}),//No I18n
			isTrendSelected : Lyte.attr("boolean",{default:false}),//No I18n
			isTrendShown : Lyte.attr("boolean",{default:true}),//No I18n
			configLength : Lyte.attr("number"),//No I18n
			predictionOptions : Lyte.attr("object",{default:{"criteriaValues":[],"score_operator":[],"criteria_operator":[]}}),//No I18n
			criteriaDisplay : Lyte.attr("boolean",{default:true}),//No I18n
			predictionEle:Lyte.attr("string"),//No I18n
			isCriteriaBetween:Lyte.attr("boolean",{default:false}),//No I18n
			isScoreBetween:Lyte.attr("boolean",{default:false}),//No I18n
			scoreCriteriaDisplay : Lyte.attr("boolean",{default:true}),//No I18n
			roleRequestModel : Lyte.attr("string", {default : ""}),//No I18n
			predictionCriteria : Lyte.attr("object",{default:{}}),//No I18n
			scoreCriteria : Lyte.attr("object",{default:{}}),//No I18n
			/* this is used for user field alone */
			userProperty : Lyte.attr("object" , { default : {} }),//No I18n
			userDetails : Lyte.attr("object" , { default : {} }),//No I18n
			cruxAssetsCompMapping : Lyte.attr("object" , { default : {} }),//No I18n
			defaultUndefined : Lyte.attr("string"),//no i18n
			isChildInput:Lyte.attr("boolean",{default:false}),//No I18n
			isChildFieldLookup:Lyte.attr("boolean",{default:false}),//No I18n
			blockedCriteria : Lyte.attr("object",{default:{'Email':'','Secondary_Email':''}}),//No I18n
			supportRelatedModules : Lyte.attr("boolean", {default : false}), //No I18N
			optionsDisabledList : Lyte.attr("array" , { default : [] }),//No I18n
			childCompProps		: Lyte.attr("string" , {default : ""}),//No I18n
			cxPropAria : Lyte.attr('boolean', {default : false}),
			valuePrefixDropdownOpt : Lyte.attr("object" , { default : {prefixOption : []} }),//No I18n
			cxPropEnableDateTime: Lyte.attr('boolean', { default: false }),
			elementsCompId : Lyte.attr("string" , {default : ""}),//No I18n
			parentField :  Lyte.attr("object")//No I18n
		}
	},
	init : function(){
		this.setModuleMappingData();
		if( this.data.cxPropField ){
			this.setData("field" , this.data.cxPropField );
			this.data.cxPropModule && this.render(); //eslint-disable-line no-unused-expressions
		}
		if(this.data.cxPropModuleDisplayField){
			this.setData('moduleDisplayField' , this.data.cxPropModuleDisplayField);//no i18N
		}
		if(this.data.field ){
			//this.setData("field", $L.extend( {} , this.data.field)); // Removed the clone — the data set in the parent (smart filter) is not reflecting here.
		   if(this.data.field.isDummy){
			  this.render();
		   }
		   if(this.data.isChildInput && this.data.field.field_data_type === 'lookup' && this.data.field.api_name !== 'Who_Id'){
			    this.setData("isChildFieldLookup" , true );
		   }
		}
		this.$node.resetField =function(criteria){
			return this.component.resetField(criteria);
		};
	},
	resetField : function(){
		this.setData('rendered'  , false);
		this.render();
		this.setData('rendered'  , true);
	},
	setFieldMethods : function(field){
		field = field ? field : this.data.field;
		if( field.cxChildCompMethods ){
			setTimeout(function(){
				this.setCriteria();
					var api_name = this._cruxReplace(field.api_name, "[/.]","_");//no i18n
					var childComp = $L("#"+api_name+"_crux_comp")[0],//no i18n
						childComp1 = $L("#between_"+api_name+"_crux_comp")[0],//no i18n
						methodsObject = field.cxChildCompMethods;
					for (var methodName in methodsObject) {
						childComp ? childComp.setMethods(methodName , methodsObject[methodName]) : ""; //eslint-disable-line no-unused-expressions
						childComp1 ? childComp1.setMethods(methodName , methodsObject[methodName]) : "";//eslint-disable-line no-unused-expressions
					}
				
			}.bind(this),100);
		}
	},
	render : function(parent){
		if(this.getData("rendered")){
			this.$node.style.display = "";
			return;
		}
		this.parentCompData = parent ? parent : this;
		this.cruxCompMapping = {layout : "layout",autonumber : "text",multiselectpicklist : "text",textarea : 'text' , text : "text", phone : "text", email : "text", mobile : "text", website : "text",decimal : "number", integer : "number", bigint : "number", double : 'number' ,currency : "number", picklist : "picklist", datetime : "date",//No I18n
								date : "date",multiuserlookup : "user", ownerlookup : "user",userlookup : "user", boolean : "boolean", lookup : "text" , date_time : "date-time",longinteger : "number"};//No I18n
		this.cruxCondMapping = {textarea : "text" ,multiselectpicklist : "text",text : "text",autonumber : "text", phone : "text", email : "text", mobile : "text", website : "text", integer : "number",decimal : "number", bigint : "number", double : 'number' , currency : "number", picklist : "defWithEmpty", datetime : "date", date_time :"date",//No I18n
								date : "date", ownerlookup : "defWithEmptyUl",multiuserlookup : "defWithEmpty" ,userlookup : "defWithEmptyUl" , boolean : "boolean", lookup : "text",longinteger : "number",fileupload : "defEmpty" , imageupload : "defEmpty"};//No I18n
		Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "w250" });//no i18n
		Lyte.objectUtils(this.getData("selectedValues") ,"add",{ headDropDownValue : undefined, byDropDownValue:undefined ,firstDropDownValue : undefined,secondDropDownValue : undefined,multiSelectFieldValue : undefined,HT_DropDownValue : undefined,HT_value : undefined,value1 : undefined,value2 : undefined ,Service_Status : undefined});//no i18n
		this.setData({'renderItems' : [] , 'renderItems2' : []});
		this.initCruxConditions("filter");//No I18n
		var field = this.getData("field"), //no i18n
			moduleRecordMapping = this.moduleRecordMapping,
			updObj = { cxFilterClass : { secondDropDownClass : "w80"} },
			opt , crossFields = field.crossFields ? $L.extend(true,[],field.crossFields) : []
		this.cruxAssets = typeof cruxAssets !== 'undefined' ? cruxAssets : {}; 
		this.cruxAssetsCompMapping = {};

		// if(typeof cruxAssets != "undefined" ){

		if( this.cruxAssets.getCruxFilterCriteriaConditions ){
			var conditons = cruxAssets.getCruxFilterCriteriaConditions();
			conditons = conditons ? conditons : {};
			for(var type in conditons){ 
				this[type+'Conditions']=conditons[type];
			}
		}
		if( this.cruxAssets.fieldDataTypeToCruxCompMapping ){
			var typeMapping = cruxAssets.fieldDataTypeToCruxCompMapping;
			for(var type in typeMapping){ 
				this.cruxCompMapping[type]=typeMapping[type];
			}
		}
		if(this.data.field.cxAutoCompleteInLookup || this.data.cxPropAutoCompleteInLookup){
			this.setData('isChildFieldLookup' , true);
		}
			
		// }

		if( parent ){
			this.idModuleMapping = parent.getData("idModuleMapping");
			moduleRecordMapping = this.moduleRecordMapping = parent.getData("cxPropModuleRecordMapping");
			// this.setData( "userDetails" ,  parent.getData("cxPropCurrentUserDetails"));//no i18n
			this.setData('cxPropCommonInfo' , parent.getData('cxPropCommonInfo'));
			if(!this.data.cxPropModule){
				this.setData('cxPropModule' , parent.getData('cxPropModule'));//no i18N
			}
			// this.cruxAssets =  parent.cruxAssets;
			this.cruxAssetsCompMapping = parent.cruxAssetsCompMapping ? parent.cruxAssetsCompMapping : {};
			this.setData("cruxAssetsCompMapping", this.cruxAssetsCompMapping);
			this.setData("supportRelatedModules",parent.data ? parent.data.supportRelatedModules : false); //No I18n
		}
		if( this.data.cxPropModule ){
			this.setData('module', this.data.cxPropModule);//no i18n
		}
		var module_name = this.data.module;
		if(module_name && moduleRecordMapping[module_name]){
			var module_info = store.peekRecord("module",moduleRecordMapping[module_name].id); 
			module_info = module_info ? module_info : moduleRecordMapping[module_name]; //getting undefined if module model is not registered.
			this.setData('module_info',module_info) //no i18n
		}
			
		this.setData('userDetails', this.data.cxPropCurrentUserDetails ? this.data.cxPropCurrentUserDetails : parent ? parent.getData("cxPropCurrentUserDetails") : this.getData('userDetails'));//no i18n
		this.datePattern = this.data.userDetails && this.data.userDetails.DATE_PATTERN ? this.data.userDetails.DATE_PATTERN : "dd/mm/yyyy";
		if(field.field_data_type == undefined){
			updObj.field_data_type = this.getFieldDataType(field);
			// Lyte.objectUtils(field ,"add","field_data_type",field.data_type);//no i18n
		}
		if( field.disableExtraValue ){ //depreicated check
			field.cxDisableExtraValue = field.disableExtraValue
		}
		field.cxLoginUser = field.cxLoginUser == undefined ? true : field.cxLoginUser 
		if( !field.display_field_label ){
			updObj.display_field_label = field.field_label
			// Lyte.objectUtils(field ,"add","display_field_label",field.field_label);//no i18n
		}
		Lyte.objectUtils(field ,"add",updObj);//no i18n
		this.setData({"showSecondDropdownType" : undefined , cruxElement1 : undefined , cruxElement2 : undefined});//no i18n
		if(!field.column_name){
			field.column_name = field.api_name
		}
		this.setData("numberDropClass","");//No I18n
		// if(field.api_name === "cxFilter_Scoring_Rule"){
		// 	this.setData("crossFields" , field.crossFields);//no i18n
		// }else if(field.api_name === "cxFilter_Series"){
		// 	this.setData("crossFields" , field.crossFields);//no i18n
		// }
		//  else 
		 if(field.field_data_type === "rfm" || field.field_data_type === "ABM_Techniques" || field.field_data_type === 'ABM_Scores') {
			this.setData({ "firstDropdown" : false});//no i18n
		}else if(field.field_data_type == "crossfield" && field.api_name !="cxFilter_Campaigns"){//no i18n
			ele = "";field.minValue = 0;
			crossFields = field.options ? $L.extend(true , [],field.options) : crossFields;
			// if( field.api_name == "cxFilter_Recent_prediction_score" ){ //no i18n
			// 	this.setData('sentStatus',field.options) //no i18n
			// 	this.setData('firstDropdown',false) //no i18n
			// }else 
			if(field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
				this.setData({maxLen : 4, showSecondDropdownType : "date", 'firstDropdown' : true});//No I18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
				ele = "number" //no i18n
			}else{
				this.setData('firstDropdown',false) //no i18n
			}
		}else if(field.field_data_type == 'nofield'){ //no i18n
			opt = [];ele = ""
			this.setData('firstDropdown',false) //no i18n
		}else if(field.api_name =="cxFilter_Campaigns"){ //no i18n
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name',_cruxUtils.getI18n('Campaign'))])//no i18n
			this.linkingModule =moduleRecordMapping.Campaigns;//no i18n
			// this.setData({"firstDropdown" : true,"otherMemberStatus" : field.pick_list_values.slice(0)}) //no i18n
			this.setData({"firstDropdown" : true}) //no i18n
			// ele = "lookup" //no i18n
			this.setData("setWidth","w250");//no i18n
		} else if(field.api_name === "cxFilter_Linked_Segment__s") {
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name', _cruxUtils.getI18n('abm.segment'))]) // NO I18N
			this.linkingModule = moduleRecordMapping.ABMSegment;
			this.setData({"firstDropdown" : true}); // NO I18N
		}else if(field.api_name == "Activity_Due"){//no i18n
			// this.setData("setWidth","w230");//no i18n
			ele = "";
		}else if(field.field_data_type == "custom"){ //no i18n
			field.minValue=0;
			this.setData({'recordDropdownValues' : field.values, "numberFieldDecimal" : false,"setMargin" : "setMarginLeft" , "setWidth" : ""}) //no i18n
			if(field.api_name == "cxFilter_Email_Status"){
				let sentStatusArr = this.getData("sentStatus"); //no i18n				
				let sentStatusFlag = sentStatusArr.length > 0 ? true : false;				
				
				Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "" });//no i18n
				this.setData({"setMargin" : "","setWidth" : "",'sentStatusFlag' : sentStatusFlag});//no i18n
			}
			ele = "number" //no i18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
			this.setData({maxLen : 4, showSecondDropdownType : "date", 'firstDropdown' : true});//No I18n
		}else if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1 ){ //no i18n
			this.setData({'firstDropdown' : true}) //no i18n
			ele = "";
		}else if(field.field_data_type === "crossModule"){
		   this.setData("selectedValues",{value : "with"}); //No I18n
		}else{
			this.setData("numberDropClass","cxW100Per");//No I18n
			var field_data_type
			// if(field.field_data_type == "formula" || field.dataparam.return_type){
			// 	Lyte.objectUtils(field , "add", "field_data_type", field.formula.return_type ? field.formula.return_type : field.dataparam.return_type) //no i18n
			// }
			if( field.cxDecimalAllowed !== undefined ){
				this.setData("numberFieldDecimal",field.cxDecimalAllowed);
			}
			if( field.cxModule !== undefined ){
				this.setData("module",field.cxModule);
			}
			if(["SOLUTIONNUMBER","INVOICENUMBER","SONUMBER","QUOTENUMBER","CASENUMBER"].indexOf(field.column_name) != -1 ){
				Lyte.objectUtils(field , "add", "field_data_type", "integer") //no i18n
			}
			field_data_type = field.field_data_type //no i18n
			if(field.field_data_type == "currency"){
				if(this.data.userDetails.BASE_CURRENCY!=""){
					this.setData("numberDropClass","w150");//No I18n
					this.setData('iscurrencyField',true) //no i18n
				}
			}
			var crux = this.cruxCompMapping
			var ele = this.cruxAssetsCompMapping[field.api_name];
			ele = ele ? ele : crux[field_data_type] ;
			if(ele == "text" || ele =="number"){
				this.setData("numberDropClass" , ele == "number" ? "w150" : this.data.numberDropClass);//no i18n
				this.setData('placeholderValue',[_cruxUtils.getI18n('crm.label.filter.typehere')]) //no i18n
			}
			if( field.ui_type == 80 ){
				this.setData('placeholderValue',[_cruxUtils.getI18n('crm.label.type.minutes')]) //no i18n
			}
			this.setData('firstDropdown',true) //no i18n
			if(field.field_data_type == "multiselectlookup" || (this.data.isChildFieldLookup)){
				if(field.ui_type == "445" ){
					ele = "user"; //no i18n
				}else{
					var id = this.data.isChildFieldLookup ? field.lookup.module.id : field.multiselectlookup.connected_module.id;
					this.linkingModule = moduleRecordMapping[this.idModuleMapping[id]];//no i18n
					this.setData('placeholderValue', this.linkingModule ? [_cruxUtils.getI18n('crm.module.name',this.linkingModule.singular_label)] : _cruxUtils.getI18n('crm.label.filter.typehere')); //no i18n
				}
			}
			if(field.column_name == "CALLDURATIONINSEC"){
				this.setData("numberFieldDecimal",false);//no i18n
			}
			// if(field.api_name === "cxFilter_Prediction_Score"){
			// 	field.maxValue = 100;
			// 	field.minValue = 1;
			// 	//Lyte.objectUtils(field ,"add","maxValue",100)//no i18n
			// }else 
			if( field.ParentField == "cxFilter_Email_Sentiment" && (field.api_name == "count" || field.api_name == "percentage") ){//no i18n
				var value =(field.api_name =="count")?"1":"50", //no i18n
				maxValue = (field.api_name =="count")?1000:100, //no i18n
				len = (field.api_name =="count")?4:3; //no i18n
				field.minValue = 1;field.maxValue=maxValue;
				//Lyte.objectUtils(field ,"add","maxValue",maxValue)//no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",value)//no i18n
				// this.setData('value',value)//no i18n
				// 'maxLen' : len ,
				this.setData({'numberDropClass' : "" , 'placeholderValue' : [''],"numberFieldDecimal" : false}) //no i18n
			}
		}
		if(field.ui_type == 132){
			Lyte.objectUtils(field.cxFilterClass ,"add",{'cruxElement1' : "dB mB7 cxSmartFilterMultiModuleLookup",secondDropDownClass : ""});//no i18n
			this.setData("showSecondDropdownType" , "date");//No I18n
		}
		if(typeof moduleRecordMapping != "undefined"  && field.field_data_type == "tag"){
			ele = "tag";//No I18n
			var moduleInfo =  moduleRecordMapping[this.getData("module")] ? moduleRecordMapping[this.getData("module")] : {};
			if(moduleInfo.module_name == "Activities"  && moduleInfo.custom_view && !moduleInfo.custom_view.activity_view){
				this.setData("module",field.module_name);//no i18n
			}else if(!field.PreventActivityTag  && moduleInfo.custom_view && moduleInfo.custom_view.activity_view){
				Lyte.objectUtils(field , "add", {"Activity_tag" : true}); //no i18n
				crossFields = [{api_name : "Events_Tag" , field_data_type  :"tag",data_type  :"tag", field_label : moduleRecordMapping.Events.plural_label,module_name : "Events",PreventActivityTag : true,parent_field : field},{api_name : "Calls_Tag" , field_data_type : "tag",data_type  :"tag", field_label : moduleRecordMapping.Calls.plural_label ,module_name : "Calls" , PreventActivityTag : true,parent_field : field},{api_name : "Tasks_Tag" , field_data_type  : "tag",data_type  :"tag", field_label : moduleRecordMapping.Tasks.plural_label , module_name : "Tasks",PreventActivityTag : true,parent_field : field}];//no i18n
				Lyte.objectUtils(field , "add", "crossFields", crossFields) //no i18n
				// this.setData("crossFields",crossFields);//no i18n
				ele = "";this.setData('firstDropdown',false) //no i18n
			}else{
				Lyte.objectUtils(field , "add", "Activity_tag", false) //no i18n
			}

		}else if(field.column_name == "ACTIVITYTYPE"){//no i18n
			Lyte.objectUtils(field , "add", "field_data_type", "picklist") //no i18n
			var pick_list_values = [{display_value :moduleRecordMapping.Tasks.plural_label ,actual_value :moduleRecordMapping.Tasks.api_name },{display_value :moduleRecordMapping.Calls.plural_label ,actual_value :moduleRecordMapping.Calls.api_name },{display_value :moduleRecordMapping.Events.plural_label ,actual_value :moduleRecordMapping.Events.api_name }];//no i18n
			Lyte.objectUtils(field,"add","pick_list_values",pick_list_values);//no i18n
			ele = "picklist";//no i18n
		}
		if(ele == "text"){
			this.setData("maxLen", field.maxLength || 2500);//no i18n
		}
		if(field.field_data_type == "date" || field.field_data_type == "datetime" || ele == "date" || field.api_name == "cxFilter_Email_Sentiment"){
			field.minValue=0;
			field.cxMinMaxValidate = true;
			this.setData({'placeholderValue' : [''] , numberFieldDecimal : false , numberDropClass : '' , setWidth : ""}) //no i18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
			this.setData({maxLen : 4, showSecondDropdownType : "date"});//No I18n
			if(field.api_name == "With_Open_Deal" || field.api_name == "Without_Open_Deal"){ //no i18n
				ele = ""
			}
		}else if( field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){//no i18n
			Lyte.objectUtils(field,"add",{"maxValue" : 5 , "minValue" : 1});//no i18n
			this.setData( {"numberDropClass" : 'w100' ,"placeholderValue" : [_cruxUtils.getI18n("crm.filter.number.range",1,5)]}) //no i18n
			//this.setData('placeholderValue',[I18n.getMsg('crm.filter.number.range',[1,5])]) //no i18n
		}
		if(field.api_name === 'cxFilter_Scoring_Rule'){
			ele = "picklist"; //No I18n
		}
		if(field.api_name === 'cxFilter_Series'){
			ele = "picklist"; //No I18n
		}

		this.setData("numberDropClass" , ele == "boolean" ? "" : this.data.numberDropClass);//no i18n
		this.setData({ cruxElement1 : ele});
		if( ele == "user" && parent ){
			this.setData( "userProperty" , field.cxUserProperties ? field.cxUserProperties : parent.getData("cxPropUserFieldProperties"));//no i18n
		}
		if(field.cxChildCompProps){
			var props = {}; 
			for(var property in field.cxChildCompProps){ 
				var tempProps = property.replace('cxProp','');
				tempProps = tempProps.replace('ltProp','');
				props[tempProps.charAt(0).toLowerCase()+tempProps.slice(1)] = field.cxChildCompProps[property];
			}
			this.setData('childCompProps' , JSON.stringify(props));//no i18n
		}
		if(( !field.cxHideComparator && !this.data.cxPropHideComparator) && field.api_name !== "Without_Open_Activity" && field.api_name !== "Without_Any_Deal" && field.api_name !== 'With_Contact' && field.api_name !== 'Without_Any_Contact' && field.api_name !== 'Locked_False'){
			this.setDropDownValuesFun(true);
		}
		if(field.api_name === "Recommendation"){ //no i18n
			var module = moduleRecordMapping[this.getData("module")]; //no i18n
			var label = module.recommendationsDetailsJson.what_to.display_label;
			this.setData( { "lookupDisplayField" : label , setWidth : ""}); //no i18n
			Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "w150" });//no i18n
			this.setData('placeholderValue',[label]) //no i18n
			this.setData('options',[{"system":"all","display":_cruxUtils.getI18n('allTime')},{"system":"${TODAY}","display":_cruxUtils.getI18n('crm.filter.label.a.day')},{"system":"${THISWEEK}","display":_cruxUtils.getI18n('crm.filter.label.a.week')},{"system":"${THISMONTH}","display":_cruxUtils.getI18n('crm.filter.label.a.month')},{"system":"CUSTOM","display":_cruxUtils.getI18n('crm.cal.custom')}]) //no i18n
		}
		// if(field.api_name === "Similarity"){
		// 	this.setData("crossFields", field.crossFields);
		// }else if(field.api_name === "SimilarityAvailable") {
		// 	this.setData("crossFields", field.crossFields);
		// 	// var module = this.getData("module");
		// 	// var moduleLabel = moduleRecordMapping[module].plural_label;
		// 	// this.setData("crossFields", [   //No I18n
		// 	// 	{api_name: "SimilarityScore", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.score'), data_type: "integer"},  //No I18n
		// 	// 	{api_name: "SimilarityRecords", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.records.search', moduleLabel)}  //No I18n
		// 	// ]);
		// } 
		else if(field.api_name === "SimilarityScore") {
			this.setData("options", this.numberConditions);
			this.setData("firstDropdown", true);
			this.setData("cruxElement1", 'number');
			field.minValue = 0;
			field.maxValue = 100;
			this.setData("field", field);
			this.setData('placeholderValue',[_cruxUtils.getI18n('Score')]) //no i18n
			this.setData("numberDropClass", "w150");
		} else if(field.api_name === "SimilarityRecords") {
			this.setData("field.data_type", "multiselectlookup");
			var moduleDisplayField = this.getData("moduleDisplayField");
			var module = moduleRecordMapping[this.getData("module")]; //no i18n
			if(!moduleDisplayField) {
				var moduleApiName = module.api_name;
				var obj = {};
				obj[moduleApiName] = [module.display_field.api_name];
				this.setData("moduleDisplayField", obj);
			}
			var multiselectlookup = {};
			multiselectlookup.connected_module = {api_name : module.api_name, id : module.id  };
			// multiselectlookup.connected_module.id = module.id;
			// multiselectlookup.connected_module.api_name = module.api_name;
			this.setData("field.multiselectlookup", multiselectlookup);
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name', module.singular_label)])//no i18n
		}
		// if( field.api_name  === 'next_best_experience'){
		// 	var option_values = [];
		// 	if(this.data.userDetails.permissions.Crm_Implied_View_Calls){
		// 		option_values.push({'actual_value' : 'Calls' , 'display_value' : _cruxUtils.getI18n('Call')});
		// 	}
		// 	if(this.data.userDetails.permissions.Crm_Implied_View_Events){
		// 		option_values.push({'actual_value' : 'Events' , 'display_value' : _cruxUtils.getI18n('Meeting')});
		// 	}
		// 	if(this.data.userDetails.permissions.Crm_Implied_Send_Mail_Potentials){
		// 		option_values.push({'actual_value' : 'Emails' , 'display_value' : _cruxUtils.getI18n('crm.field.label.email')});
		// 	}
		// }
		if(field.api_name === "Prediction" || field.api_name === "Prediction_0" ||  field.api_name === "Prediction_1" ||  field.api_name === "completed_prediction"){
			var node = field.api_name === "Prediction" ? $L("#option_Prediction")[0] : $L("#sub_option_" + field.api_name)[0];//No I18n
			Lyte.objectUtils(node.getData("selectedValues"),"add","dateVal",2);//No I18n
			Lyte.objectUtils(node.getData("selectedValues"),"add","criteriaValue","");//No I18n
			var module = moduleRecordMapping[node.getData("module")];//No I18n
			node.setData('predictionData',module.prediction_details.slice());//No I18n
			node.setData('trendOption',[{"system" : "no_trend", "display" : _cruxUtils.getI18n("crm.zia.prediction.notrend")},{"system" : "trend_up", "display":_cruxUtils.getI18n("crm.intelligence.prediction.trendup")},{"system" : "trend_down", "display" : _cruxUtils.getI18n("crm.intelligence.prediction.trenddown")}]);//No I18n
			node.setData('successFailureOption', [{"system" : "success_prediction", "display" : _cruxUtils.getI18n("crm.label.success"), "parent_field": "completed_prediction"}, {"system":"failure_prediction", "display" : _cruxUtils.getI18n("crm.label.Failure"),  "parent_field": "completed_prediction" }]);//No I18n
			node.setData("configLength",module.prediction_details.length);//No I18n
			var len = node.getData('configLength');//No I18n
			if(field.api_name === "Prediction"){
				var crossFieldsData = [];
				for(var ind = 0;ind < len; ind++){
					var details = {};
					var predictField = node.getData('predictionData')[ind].predict_field;//No I18n
					var isPickList = node.getData('predictionData')[ind].values === undefined ? false : true;
					details.predict_field = predictField;
					details.prediction_field = node.getData('predictionData')[ind].prediction_field;//No I18n;//No I18n
					details.isPickList = isPickList;
					details.api_name = "Prediction_" + ind;//No I18n
					details.name = node.getData('predictionData')[ind].name;//No I18n
					details.id = node.getData('predictionData')[ind].id;//No I18n
					details.field_label = node.getData('predictionData')[ind].name;//No I18n
					details.parent_field = 'prediction';//No I18n
					if(isPickList){
						details.score_field = node.getData('predictionData')[ind].prediction_score_field;//No I18n
					}
					details.trend = node.getData('trendOption');//No I18n
					crossFieldsData.push(details);
				}
				var details = {};
				details.successFailureDropDown = node.getData('successFailureDropDown');//No I18n
				details.api_name = "completed_prediction";//No I18n
				details.id = "both";//No I18n
				details.field_label = _cruxUtils.getI18n("Completed");//No I18n
				details.parent_field = 'prediction';//No I18n
				crossFieldsData.push(details);
				crossFields = crossFieldsData
				// node.setData('crossFields',crossFieldsData);//No I18n
			}
			var SFoption = [];
			var newLen = node.getData('configLength');//No I18n
			for(var i = 0;i < newLen; i++){
				var config = {"system":this.getData('predictionData')[i].id , "display":node.getData('predictionData')[i].name};//No I18n
				SFoption.push(config);
			}
			if(newLen === 2){
				SFoption.push({"system":"both" , "display":_cruxUtils.getI18n("Both")});//No I18n
			}
			node.setData('successFailureDropDown',SFoption);//No I18n
			node.setData('selectedOptionSf',node.getData('successFailureDropDown')[0].system);//No I18n
		}
		this.setData("crossFields" , crossFields);//no i18n
		if( ele == "picklist" && !field.cxType){
			field.cxPropType =  ("cxFilter_Scoring_Rule" == field.api_name || field.api_name == "cxFilter_UnallocatedRecords" || "cxFilter_Series" == field.api_name) ? "single":"multiple";//No I18n
		}
		// if( ele == "picklist" ){
		// 	field.cxPropType =  "cxFilter_Series" == field.api_name ? "single":"multiple";//No I18n
		// }

		if(field.api_name === "cxFilter_Competitor_Alert"){
			this.setData('firstDropdown',false);
			this.setData('crossFields',Lyte.deepCopyObject(field.options));
		}
		if(field.api_name === "Competitor_Name"){
			this.setData("cruxElement1","picklist");
			var additionalOptions = this.textConditions;
			this.setData('options',additionalOptions);
		}
		if(field.api_name === "Competitor_Duration"){
			Lyte.arrayUtils(this.getData('options'),'removeAt',12,this.getData('options').length);
			this.setData("cruxElement1","number");
		}
		if(field.api_name === "Competitor_Sentiment"){
			this.setData('field.cxPropType','single');
		}
		let uniqueKey = ()=>{
			let finalString = '' , len = 5;
			for(var k = 0; k < len; k++){
				finalString += Math.floor(Math.random() * 100).toString(36);
			}
			return finalString;
		};

		this.setData('elementsCompId' , `id_${this.data.module}_${this._cruxReplace(field.api_name, "[/.]","_")}_${uniqueKey()}`);
		if( this.getMethods('onBeforeRender') ){
			let tempObj = this.executeMethod('onBeforeRender', { calledFrom : "init", field : field , cruxElementComponent : this.data.cruxElement1});//No I18N
			if(tempObj && tempObj.constructor === Object){
				if(tempObj.field){
					this.setData('field' , tempObj.field);//No I18n
				}
				if(tempObj.cruxElementComponent){
					this.setData('cruxElement1' , tempObj.cruxElementComponent);//No I18n
				}
			}
		}

		this.setData("rendered", true);//No I18n
		this.setFieldMethods(field);
		// if( field.api_name == "Likely_to_convert" ){//no i18n
		// 	$L("#sub_field_"+field.options[0].api_name)[0].classList.add("Likely_to_convert_selectedRadioBtn");//no i18n
		// }
	},
	actions : {
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		toggleDropDown : function(field, type, node){
			var eve,
				apiName = type === "Recommendation_infield" ? type : this._cruxReplace(field.api_name, "[/.]","_"); //no i18n
			
			if(apiName === "cxFilter_Linked_Segment__s" && !node.component.data.ltPropValue) {
				eve = {
					type: "change", // NO I18N
					oldValue: "",
					newValue: "",
					item: "ltPropValue" // NO I18N
				}
				
				this.methods.onSearch.call(this, eve, node);
			}

			var dropDownNode = this.$node.querySelector("#multiSelect_lookup_"+apiName);//no i18n
			if(dropDownNode.ltProp("show") == true){
				var t = $L("#"+ apiName+"_Search_val")[0];//no i18n
				if(t.querySelector("input").value){
					t.ltProp("value",'');//No I18n
				}
				dropDownNode.toggle();//No I18n
				return false;
			}


		},
		inputValidate : function(Obj,event,field){
			if(field.field_data_type == "date" || field.field_data_type == "datetime" || field.field_data_type == "custom"){
				if(event.keyCode == 189){
					event.preventDefault();
				}
			}
		},
		clearEmailSentiment : function(){
			var checked = $( '[name=option_cxFilter_Email_Sentiment]:checked' ).closest( 'lyte-radiobutton' ) //eslint-disable-line no-attribute-selectors
			if(checked.length){
				checked[0].ltProp('checked',false) //no i18n
				var id = "sub_option_" + checked[0].ltProp('value') //no i18n
				var node = document.getElementById(id)
				if(node){
					node.style.display = 'none'
				}
			}
			$L("#clearEmailSentimentSubfield")[0].classList.add("dNI");//no i18n
			$(".cxFilter_Email_Sentiment_selectedRadioBtn").removeClass("cxFilter_Email_Sentiment_selectedRadioBtn")
			if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
				this.executeMethod("onValueChange",{field : this.data.field});//No I18n
			}
		}

	},
	methods : {
		onPrefixSelection : function(ev , selectedValue){
			// var prefixOpts = this.data.valuePrefixDropdownOpt.prefixOption;
			// var selectedObj = prefixOpts.filter(function(item){
			// 	return item.display_value == selectedValue;
			// })
			this.checkValuePrefixDD('change', undefined, selectedValue);
			this.valueChanged(selectedValue);
		},
		beforeOptionsSet : function(){
			if(this.data.field.cxForceSetCondition){
				this.triggerConditionCallback(this.data.options , true , true , {bydropdownOption : this.data.bydropdownOption});
			}
		},
		beforeSelectDropDown : function(eve , prevSelVal , comp , dropItem , selVal){
			if(this.getMethods("beforeSelectDropdown")){
				return this.executeMethod("beforeSelectDropdown", { field : this.data.field , event : eve , oldValue : prevSelVal , newValue : selVal , dropdown : comp});	
			}
		},
		// setDropDownValues : function(node){
		// 	return;
		// 	if(!node.getAttribute("renderAllValues")){
		// 		this.setDropDownValuesFun(true)
		// 		var selected = node.ltProp("selected")//no i18n
		// 		node.ltProp("selected","") // no i18n
		// 		node.ltProp("selected",selected) //no i18n
		// 		node.setAttribute("renderAllValues",true)
		// 	}
		// },
		observeDropDownChanges : function(){
			this.valueChanged();
		},
		beforeErrorCallback : function(msg){
			if(this.getMethods('onBeforeErrorAlert')){
				return this.executeMethod('onBeforeErrorAlert',msg); //No I18N
			}
			return true;
		},
		beforeAlert : function(alertMsg,comp){
			var check=true;
			if(this.getMethods('onBeforeErrorAlert')){
				check=this.executeMethod('onBeforeErrorAlert',alertMsg);//No I18N
			}
			if(check){
				var field = this.getData("field");//no i18n
				if( ["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(field.api_name) != -1 && field.parent_field && field.parent_field.Activity_tag){
					this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check',field.parent_field.display_label) );//no i18n
					return false;
				}else if(field.showCommonError){
					if(comp.$node.nodeName == "CRUX-NUMBER-COMPONENT" && comp.getValue() == ""){//no i18n
						this.showFilterAlert(_cruxUtils.getI18n('crm.mb.field.common.empt'),comp );//no i18n
						return false;
					}else if(comp.$node.nodeName == "CRUX-DATE-COMPONENT"){//no i18n
						this.showFilterAlert( _cruxUtils.getI18n('crm.field.valid.check',_cruxUtils.getI18n("Date")) ,comp);//no i18n
						return false;
					}
				}else if( this.getData("field").history_tracking && comp.$node.tagName === "CRUX-NUMBER-COMPONENT" ){//no i18n
					this.showFilterAlert( _cruxUtils.getI18n('crm.field.valid.check', _cruxUtils.getI18n("crm.events.duration") ) , comp);//no i18n
					return false;
				}
				return true;
			}
		},
		getDropDownVal : function( event,value,dropdown,dropItem,thisScope){ 
			var _this = thisScope ? thisScope : this;
			var field = _this.getData("field");//no i18n 
			if(   field.api_name == "Email" || field.api_name == "Secondary_Email"){
				let  emailOptionsArray = [] , skipUpdate = false; 
				if( value.includes("${BLOCKED") &&  _this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT){  
					let bounceCategories = Crm.bounceCategories;
					let moduleName = _this.getData('module'); //no i18n 
					emailOptionsArray = [ 
							{"api_name":"cxFilter_"+field.column_name+"_temporary","column_name":"Temporary","data_type":"date","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.temporary"),"field_data_type":"date","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.temporary"),"module_name":moduleName,"system":"hey","display":"hey",
								cxFieldsDetails : [ { cxLabel : _cruxUtils.getI18n("crm.email.unblock.filter.category") , cxElement : "dropdown" ,  cxOptions : bounceCategories.temporary } ]
							},
							{"api_name":"cxFilter_"+field.column_name+"_permanent","column_name":"Permanent","data_type":"date","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.permanent"),"field_data_type":"date","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.permanent"),"module_name":moduleName,"system":"hey","display":"hey",
								cxFieldsDetails : [ { cxLabel : _cruxUtils.getI18n("crm.email.unblock.filter.category") , cxElement : "dropdown" ,  cxOptions :bounceCategories.permanent  } ]
							},
							{"api_name":"cxFilter_"+field.column_name+"_both","column_name":"Both","data_type":"nofield","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.both"),"field_data_type":"nofield","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.both"),"module_name":moduleName,"system":"hey","display":"hey"}
					];
					skipUpdate = _this.data.crossFields.length ? true : false;
				}
				!skipUpdate ? _this.setData("crossFields",emailOptionsArray) : undefined; //no i18n
			}
			if(field.api_name == "cxFilter_Campaigns"){
				// if(Crm && Crm.zohoCampaignEnabled ){
				// 	if(value == Crm.partnerName + " Campaigns"){
				// 		field.pick_list_values = _this.data.zohoCampStatus;
				// 	}else if(value == ""){//no i8n
				// 		var value = _this.data.otherMemberStatus.slice(0);//no i18n
				// 		_this.removeValue(value,"actual_value",["Sent","Opened","Clicked","Bounced","Marked as Spam", "Replied"]);//no i18n
				// 		field.pick_list_values = value.concat(_this.data.zohoCampStatus);
				// 	}else{
				// 		field.pick_list_values = _this.data.otherMemberStatus;
				// 	}

				// }
				_this.setData("renderItems",[]);//no i18n
				$L("#"+_this._cruxReplace(field.api_name, "[/.]","_")+"_Search_val")[0].ltProp("value","");
				Lyte.objectUtils(_this.getData("selectedValues") ,"add",{Service_Status : [],"multiSelectFieldValue" :"[]"});//no i18n
			}
			_this.getValue(value , true , true);
		},
		showSentStatus : function(field,ev, value){
			if( this.data.selectedValues.firstDropDownValue === "${EMPTY}" ){
				Lyte.objectUtils(this.data.selectedValues ,"add","firstDropDownValue","Age in Days")//no i18n
				this.getValue("Age in Days");//no i18n
			}
			this.showHideEmailStatus(value,field)
			// this.valueChanged()
		},
		getCrossFieldOption : function(index,sub_field,input,comp){
			this.setData("isSuccess","undefined");//No I18n
			Lyte.objectUtils(this.getData("predictionCriteria") ,"add","value",undefined)//no i18n
			if(!comp){
				comp = sub_field
				sub_field = {api_name : ""}
			}
			if(sub_field.ParentField == "cxFilter_Email_Sentiment"){
				$L("#clearEmailSentimentSubfield")[0].classList.remove("dNI");//no i18n
			}else if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf( sub_field.api_name ) != -1){//no i18n
				this.setData("tagSubModule",sub_field.api_name)//no i18n
			}
			else if(sub_field.parent_field === "prediction"){
				var data = {};
				var scoreCheck = $L("#scoreCheckBox")[0];//No I18n
				if(scoreCheck && this.getData("isScoreSelected")){
					scoreCheck.ltProp("checked",false);//No I18n
				}
				var parentNode =  $('#option_Prediction')[0];//No I18n
				var $node = $('#sub_option_' + sub_field.api_name)[0]
				if(index === 0 || index === 1 && comp.data.id !== "sub_field_completed_prediction"){
					var prediction_field = parentNode.getData("predictionData")[index].prediction_field;
					var predict_field_values = parentNode.getData("predictionData")[index].values;//No I18n
					var predict_field = parentNode.getData("predictionData")[index].predict_field;
					Lyte.objectUtils(parentNode.getData("predictionCriteria"),"add","field",prediction_field);//No I18n
					var moduleFields = this.moduleRecordMapping[parentNode.getData("module")].fields;
					var criteria_fields = moduleFields.filter(function(item){
						return item.id === prediction_field.id
					});
					var predicted_field = moduleFields.filter(function(item){
						return item.id === predict_field.id
					});
					var actual_pick_list_values = [];

					if(criteria_fields[0].field_data_type === "picklist"){
						var valuesArray = [];
						var len = predict_field_values.length;;
						for(var valuesIndex = 0; valuesIndex < len ; valuesIndex++) {
							valuesArray.push(predict_field_values[valuesIndex].actual_value)
						}
						var len1 = predicted_field[0].pick_list_values.length
						for (var ind = 0; ind < len1; ind++){
							if(criteria_fields[0].pick_list_values[ind] && valuesArray.indexOf(criteria_fields[0].pick_list_values[ind].actual_value) !== -1){
								actual_pick_list_values.push(criteria_fields[0].pick_list_values[ind])
							}
						}
						criteria_fields[0].pick_list_values = actual_pick_list_values;
					}
					var dataType = criteria_fields[0].data_type;
					var options = this.cruxCondMapping;
					var criteria_operator = this[options[dataType] + "Conditions"];
					$node.setData("predictionEle",dataType);//No i18n
					parentNode.setData("predictionEle",dataType);//No i18n
					if(dataType === "integer"  || dataType == "longinteger" || dataType === "decimal" || dataType === "bigint" || dataType === "double" || dataType === "currency"){
						$node.setData("setWidth","w100");//No I18n
						$node.setData("predictionEle","number");//No I18n
						parentNode.setData("predictionEle","number");//No I18n
					}
					else if(dataType === "multiselectpicklist" || dataType === "picklist"){
						$node.setData("predictionEle","picklist");//No I18n
						parentNode.setData("predictionEle","picklist");//No I18n
					}
					else if(dataType === "userlookup" || dataType === "multiuserlookup"){
						$node.setData("predictionEle","user");//No I18n
						parentNode.setData("predictionEle","user");//No I18n
					}
					else if(dataType === "datetime" || dataType === "date"){
						$node.setData("predictionEle","date");//No I18n
						parentNode.setData("predictionEle","date");//No I18n
						var value = criteria_operator[0].system;
						if(value === "equal" || value === "less_than" || value === "greater_than"){
							Lyte.objectUtils($node.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
							$node.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
						}else if(value === "between"){//no i18n
							Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
							$node.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
						}else if(value === "Due in Days" || value === "Age in Days"){//no i18n
							$node.setData("showSecondDropdownType", "date");//No I18n
						}
					}

					Lyte.objectUtils($node.getData("predictionOptions"),"add","criteria_operator",criteria_operator);//No I18n
					var prediction_score_field ;
					if(parentNode.getData("predictionData")[index].score_field){
						var score_field = this.getData("predictionData")[index].score_field;//No I18n
						Lyte.objectUtils(parentNode.getData("scoreCriteria"),"add","field",score_field);//No I18n
						prediction_score_field = moduleFields.filter(function(item){
							return item.id === score_field.id
						});
						Lyte.objectUtils(data,"add","score_field",prediction_score_field); //No I18N
					}
					if(index === 0){
						data = {"first":true,"second":false,"completed":false};//No I18n
					}
					else if(index === 1 && comp.data.id !== "sub_field_completed_prediction"){
						data = {"first":false,"second":true,"completed":false};//No I18n
					}
				}
				else{

					data = {"first":false,"second":false,"completed":true};//No I18n
				}
				Lyte.objectUtils(data,"add","criteria_fields",criteria_fields);//No I18n
				Lyte.objectUtils(data,"add","predict_field",predicted_field);//No I18n

				if(prediction_score_field){
					Lyte.objectUtils(data,"add","score_field",prediction_score_field); //No I18N
				}
				$node.setData("predictionSelectedType",data);//No I18n
				parentNode.setData("predictionSelectedType",data);//No I18n
				if(index === 0 || index === 1 && comp.data.id !== "sub_field_completed_prediction"){
					var comparatorComp = $node.querySelector("#criteria_comparator");//No I18n
					if(comparatorComp){
						comparatorComp.ltProp("selected",criteria_operator[0].system);//No I18n
						var display = criteria_operator[0].system === "${EMPTY}" || criteria_operator[0].system === "${NOTEMPTY}" ? false : true;//No I18n
						var between = criteria_operator[0].system === "between" || criteria_operator[0].system === "not_between" ? true : false;//No I18n
						$node.setData("criteriaDisplay",display);//No I18n
						$node.setData("isCriteriaBetween",between);//No I18n
						Lyte.objectUtils(parentNode.getData("predictionCriteria"),"add","comparator",criteria_operator[0].system);//No I18n
						Lyte.objectUtils($node.getData("predictionCriteria"),"add","comparator",criteria_operator[0].system);//No I18n
					}
					var scoreComp = $node.querySelector("#score_criteria_comparator");//No i18n
					if(scoreComp){
						scoreComp.ltProp("selected",$node.getData("predictionOptions").score_operator[0].system);//No I18n
						var display =  $node.getData("predictionOptions").score_operator[0].system === "${EMPTY}" || $node.getData("predictionOptions").score_operator[0].system === "${NOTEMPTY}" ? false : true;//No I18n
						$node.setData("scoreCriteriaDisplay",display);//No I18n
					}
					Lyte.objectUtils(parentNode.getData("scoreCriteria"),"add","comparator",$node.getData("predictionOptions").score_operator[0].system);//No I18n
					Lyte.objectUtils($node.getData("scoreCriteria"),"add","comparator",$node.getData("predictionOptions").score_operator[0].system);//No I18n
				}
			}
			else if(sub_field.parent_field === "completed_prediction"){
				var $node = $L('#sub_option_' + sub_field.parent_field)[0];//No I18n
				var parentNode =  $L('#option_Prediction')[0];//No I18n
				parentNode.setData("selectedOptionSf",$node.getData("selectedOptionSf"));//No I18n
				$node.setData("isSuccess", index === 0 ? "true" : "false");//No I18n
				parentNode.setData("isSuccess", index === 0 ? "true" : "false");//No I18n
			} else if(sub_field.api_name === "SimilarityScore") {
				this.setData("similarity.isScore", input.checked);
			} else if(sub_field.api_name === "SimilarityRecords") {
				this.setData("similarity.isRecords", input.checked);
			} else if(sub_field.api_name === "SimilarityNotAvailable") {
				this.setData("similarity.isScore", false);
				this.setData("similarity.isRecords", false);
			}

			this.getField(sub_field,comp)
		},
		crossFieldHideOption : function(input,comp){
			this.hideSubfieldOption(input,comp)
		},
		// headDropDownValChanged :function(){

		// 	this.valueChanged()
		// },
		inputValueChanged : function( data , isSubfield , input , comp ){
			// var field = this.getData('field')//no i18n
			if(  data != "lyte-dropdown" ){
				this.valueChanged();
			}
			
			if(data && (data.show_type === 13 && ["Recency", "Frequency", "Monetary"].indexOf(data.api_name) !== -1 || this.getData('abmTechniqueFieldList').indexOf(data.api_name) !== -1 || this.getData('abmScoreFieldList').indexOf(data.api_name) !== -1 || data.showSubField !== false ) && isSubfield === true) {
				var subfield = $L("#sub_option_"+ this._cruxReplace(data.api_name, "[/.]","_"))[0];//no i18n
				if( comp.$node.checked ){
					subfield.component.render(this.parentCompData);
				}else{
					subfield.setData("rendered",false)//no i18n
				}
			}
			var parentComp = $L("#option_Prediction")[0];//No I18n
			if(data === "prediction_criteria"){
				if(this.getData("predictionEle") === "date" || parentComp.getData("predictionEle") === "date"){
					if(input === "equal" || input === "less_than" || input === "greater_than"){
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
					}else if(input === "between"){//no i18n
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
					}else if(input === "Due in Days" || input === "Age in Days"){//no i18n
						this.setData("showSecondDropdownType", "date");//No I18n
					}
					else{
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({"showSecondDropdownType": "", "predictionEle" : ""});//No I18n
					}
				}
				var display = ["${TODAY}","${YESTERDAY}","${LASTYEAR}","${EMPTY}","${NOTEMPTY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}"].indexOf(input) != -1 ? false : true;//No I18n
				var between = input === "between" || input === "not_between" ? true : false;//No I18n
				if(input === "${EMPTY}" && this.getData("field").score_field && !this.getData("isScoreSelected")){
					parentComp.setData({isTrendSelected:false,selectedTrend:"no_trend",isTrendShown:false});//No I18n
					this.setData({isTrendSelected:false,selectedTrend:"no_trend",isTrendShown:false});//No I18n
				}
				else{
					parentComp.setData("isTrendShown",true);//No I18n
					this.setData("isTrendShown",true);//No I18n
				}
				this.setData("criteriaDisplay",display);//No I18n
				this.setData("isCriteriaBetween",between);//No I18n
				Lyte.objectUtils(parentComp.getData("predictionCriteria"),"add","comparator",input);//No I18n
				Lyte.objectUtils(this.getData("predictionCriteria"),"add","comparator",input);//No I18n
			}
			else if(data === "score_criteria"){
				var display =  input === "${EMPTY}" || input === "${NOTEMPTY}" ? false : true;//No I18n
				var between = input === "between" || input === "not_between" ? true : false;//No I18n
				this.setData("scoreCriteriaDisplay",display);//No I18n
				this.setData("isScoreBetween",between);//No I18n
				Lyte.objectUtils(parentComp.getData("scoreCriteria"),"add","comparator",input);//No I18n
				Lyte.objectUtils(this.getData("scoreCriteria"),"add","comparator",input);//No I18n
			}
			if(data === "prediction_trend"){
				parentComp.setData("selectedTrend",input);//No I18n
			}
			else if(data === "prediction_SF"){
				parentComp.setData("selectedOptionSf",input);//No I18n
			}
		},
		changeUserInputValue : function(value,node){
			var field = this.getData('field'),value,maxValue //no i18n
			if( field.api_name === 'cxFilter_Scoring_Rule' ){// scoring rule Specific case. No Need to automate for this if check
				this.checkSubFieldOpt({field ,value});
			}
			if(field.history_tracking && !this.data.isChildInput){
				value = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp')[0].component.getValue()
				var node = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];
				var trackingNode = picklist_tracker_field
				if(value.length && value.length <= 10){
					// node.parentElement.style.opacity = 1;
					node.removeAttribute("lt-prop-title")
					node.ltProp('disabled',false) //no i18n
				}else{
					// node.parentElement.style.opacity = 0.5;
					if( value.length > 10 ){
						node.setAttribute("lt-prop-title" , _cruxUtils.getI18n("crm.smartfilter.picklist.options.msg"));//no i18n
					}
					node.ltProp('checked',false) // no i18n
					node.ltProp('disabled',true) //no i18n
				}
			}
			else if(field.api_name === "Prediction_0" || field.api_name === "Prediction_1"){
				var selectedValues = this.getData("selectedValues");//No I18n
				if(value.id === "criteria_prediction" || value.id === "criteria_prediction_0" || value.id === "criteria_prediction_1"){
					node = value.getData().cxPropField.data_type === "date" ? Lyte.Transform.date.serialize(node) : value.getData().cxPropField.data_type === "datetime" ? Lyte.Transform.datetime.serialize(node) : node ; //no i18n
				}
				switch(value.id){
					case "criteria_prediction":
						Lyte.objectUtils(selectedValues,"add","criteriaValue",node);//No I18n
						break;
					case "criteria_prediction_0":
						Lyte.objectUtils(selectedValues,"add","criteriaValue0",node);//No I18n
						break;
					case "criteria_prediction_1":
						Lyte.objectUtils(selectedValues,"add","criteriaValue1",node);//No I18n
						break;
					case "score_criteria_prediction":
						Lyte.objectUtils(selectedValues,"add","scoreValue",node);//No I18n
						break;
					case "score_criteria_prediction_0":
						Lyte.objectUtils(selectedValues,"add","scoreValue0",node);//No I18n
						break;
					case "score_criteria_prediction_1":
						Lyte.objectUtils(selectedValues,"add","scoreValue1",node);//No I18n
						break;
					case "dateInput":
						Lyte.objectUtils(selectedValues,"add","dateVal",node);//No I18n
						break;
				}
			}
			// else if(field.api_name == "Prediction_Score" || field.api_name == "percentage" || field.api_name=="count"){ //no i18n
			// 	maxValue = (field.api_name=="count") ? 1000 : 100;//no i18n
			// 	var maxLen = (field.api_name=="count") ? 3 : 2;//no i18n
			// 	var regex = new RegExp('\\d{'+maxLen+'}','g');
			// 	if(value > maxValue){
			// 		node.querySelector("lyte-number").ltProp("value",regex.exec(value)[0]) //no i18n
			// 		//node.component.set("cxPropValue",/\d{2}/g.exec(value)[0])//no i18n
			// 		var msg=_cruxUtils.getI18n('sentiment.criteria.wrongcriteria',maxValue);//no i18n
			// 		var errorMsg = $L("#errorMessage")[0]//no i18n
			// 		errorMsg.ltProp({
			// 			"show" : true, //no i18n
			// 			"message" : msg//no i18n
			// 		})
			// 	}
			// }
			// else if(value && node &&  node.getData && node.getData().cxPropMinvalue && value < node.getData().cxPropMinvalue){
			// 	node.querySelector("lyte-number").ltProp("value","");//no i18n
			// }
			this.valueChanged(value)
		},
		picklistTrackerDuration : function(input,checkbox){
			var node = $L('#durationField')[0]
			if(checkbox.$node.checked){
				$L(node).removeClass("eventNone op5")
				// node.classList.remove('eventNone op5') //no i18n
			}else{
				// node.querySelector("lyte-number").ltProp("value","");//no i18n
				$L(node).addClass("eventNone op5");//no i18n
				// node.classList.add('eventNone op5') //no i18n
			}
			this.valueChanged()
		},
		addToList : function(apiName,event,src,selected,comp){

			var renderItems = apiName ==="Recommendation_infield" ? this.getData('renderItems2') : this.getData('renderItems'); //no i18n
			var lookUpArray = this.getData('lookUpArray') //no i18n
			var len = lookUpArray.length,i
			for(i=0;i<len;i++){
				if(lookUpArray[i].id == src){
					break
				}
			}
			Lyte.arrayUtils(renderItems, 'push', lookUpArray[i]); //no i18n
			
			if(apiName === "cxFilter_Linked_Segment__s") {
				
				if(renderItems && renderItems.length >= 5) {
					this.setData('lookUpArray', []); // NO I18N
					Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names'))); // NO I18N
				} else {
					this.searchAbmSegments(this.getData("abmSegmentsSearchedText"), this.getData("renderItems")); // NO I18N
				}
				
			} else {
				this.setData('lookUpArray', []); // NO I18N
				
				$L("#" + this._cruxReplace(apiName, "[/.]","_") + "_Search_val",this.$node)[0].ltProp('value',''); // NO I18N
				this.hideDropDown();
			}
			
			var field = this.getData('field') //no i18n
			if(field.api_name == "cxFilter_Campaigns" && (!field.serviceStatus || !field.serviceStatus.length)){
				field.serviceStatus = [];
				this.setServiceStatus(this.data.selectedValues.firstDropDownValue , this);
				Lyte.objectUtils(this.data.selectedValues ,"add",{Service_Status : [] });//no i18n
			}
			this.valueChanged(renderItems,comp.$node);

		},
		removeFromList:function(event,id,val,comp){
			var renderItems = comp.$node.id === "multiSelect_lookup_Recommendation_infield" ? this.getData('renderItems2') : this.getData('renderItems'); //no i18n
			for(i=0;i<renderItems.length;i++){
				if(renderItems[i].id == id){
					Lyte.arrayUtils(renderItems, 'removeAt', i, 1) //no i18n
				}
			}
			this.valueChanged(renderItems,comp.$node)
			if( renderItems.length >=5 ){
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected',this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]))//no i18n
			} else if(this.data.field.api_name==="SimilarityRecords" && this.data.renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
			} else{
				
				if("multiSelect_lookup_cxFilter_Linked_Segment__s" === comp.$node.id) {
					comp.$node.close();
					return;
				}
				
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			}
		},
		onShowDropBox : function(fieldApiName, node){
			var eve,
				message;
			
			if( this.data.renderItems2.length >=5  || this.data.renderItems.length >= 5){
				
				if(fieldApiName === "cxFilter_Linked_Segment__s") {
					message = _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names')); // NO I18N
				} else {
					message = _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]); // NO I18N
				}
				
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", message); // NO I18N
			} else if(this.data.field.api_name==="SimilarityRecords" && this.data.renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
			} else{
				
				if(fieldApiName === "cxFilter_Linked_Segment__s" && !node.component.data.ltPropValue) {
					eve = {
						type: "change", // NO I18N
						oldValue: "",
						newValue: "",
						item: "ltPropValue" // NO I18N
					}
					
					Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg", _cruxUtils.getI18n('crm.chosen.searching.text')); // NO I18N
					this.methods.onSearch.call(this, eve, node);
					return;
				}
				
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			}

		},
		onBeforeHide : function(){
			this.hideDropDown()
		},
		onSearch : function(eve,ele){
			clearTimeout(this._timeout);
  			this._timeout = setTimeout(this.onSearchFun.bind(this,eve,ele), 100);
		}
	},
	triggerGetDropDownVal : function(value,thisScope){
		thisScope.methods.getDropDownVal(null,value,null,null,thisScope);
	},
	showHideEmailStatus : function(value,field){
		if(field && field.api_name =="cxFilter_Email_Sentiment"){
			if(value == "Positive" || value =="Negative"  || value == "PositiveOrNegative"  || value == "Neutral"){
				this.setData('Email_Sentiment_Value',3) //no i18n
			}else if(value == "PositiveAndNegative"){ //no i18n
				this.setData('Email_Sentiment_Value',2) //no i18n
			}else{
				this.setData('Email_Sentiment_Value',1) //no i18n
			}
		}else if(field && field.api_name == "cxFilter_Email_Status"){//no i18n
			if( value == "not_sent" ){
				Lyte.arrayUtils(this.data.options, 'insertAt',this.data.options.length, [{system : "${EMPTY}", display : _cruxUtils.getI18n("crm.condition.till.today")}]) //no i18n
			}else if(this.data.options[this.data.options.length-1].system === "${EMPTY}"){//no i18n
				Lyte.arrayUtils(this.data.options ,'pop');//no i18n
			}
			let sentStatusArr = this.getData("sentStatus"); //no i18n				
			let sentStatusFlag = sentStatusArr.length > 0 ? true : false;	

			this.setData('sentStatusFlag',value == "sent" && sentStatusFlag ? true : false) // no i18n
		}
	},
	getConditionOpt : function(sysVal){
		if( !sysVal || !this.data.options || !this.data.options.length)return {};
		let optObj = this.data.options.filter((item)=>item.system == sysVal)[0];
		if( !optObj && sysVal.includes('_N_')){
			let val = sysVal.replace('${','').replace('}','').split(':');
			// let inputVal = val.replace(/\D/g, '');
			let inputVal = val[1];
			let compVal = val[0].split('_N_');
			optObj = this.data.options.filter((item)=>item.system == compVal[0])[0];
			optObj.value = inputVal;
			optObj.secondDropDownOpt = compVal[1];	
		}
		return optObj ? optObj : {};
	},
	getValue : function(value , changeStatus , preventCallback){
		var field = this.getData("field") , comp;//No I18n
		if( field.persist_values == false){
			this.setData({'cruxElement1' : ''});
			Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
		}
		if( !preventCallback ){
			this.valueChanged()
		}
		if( value == "${NOTEMPTY}" || value == "${EMPTY}" ){
			this.setData({cruxElement1 : ""});
		}
		let condObj = this.getConditionOpt(value) || {};
		if( field.ui_type == 53 ){
			this.setData({numberDropClass : "" ,maxLen : 4,cruxElement1 : "number",placeholderValue : [""]});//No I18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value1" : "2","value2" : undefined});//no i18n
			return
		}
		// if(["cxFilter_TouchedRecords","cxFilter_UnTouchedRecords","cxFilter_RecordAction","cxFilter_RelatedRecordsAction","Activity_Due"].indexOf(field.api_name) != -1){
		// 	if(["${AGEINDAYS}+30","${AGEINDAYS}+60","${AGEINDAYS}+90","${TODAYANDOVERDUE}"].indexOf(value) != -1){
		// 		this.setData("setWidth","w230");//no i18n
		// 	}else{//no i18n
		// 		this.setData("setWidth","w100");//no i18n
		// 	}
		// }
		if(value == "not_contains"){
			this.setData("setWidth","w150");//no i18n
		}
		if( this.getMethods('onBeforeRender') ){
			let tempObj = this.executeMethod('onBeforeRender', { calledFrom : "comparatorChange", field : field , cruxElementComponent : this.data.cruxElement1 , comparator : value});//No I18N
			if(tempObj && tempObj.constructor === Object && tempObj.cruxElementComponent){
				// if(tempObj.cruxElementComponent){
					comp = tempObj.cruxElementComponent;
					// this.setData('cruxElement1' , tempObj.cruxElementComponent);//No I18n
				// }
			}
		}
		if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1){
			return
		}else if( ["date" , "datetime" , "custom" , "date_time"].includes(field.field_data_type) || field.api_name == 'cxFilter_Email_Sentiment' ){ //no i18n
			var ele = field.field_data_type == "date_time" ? "date-time" : "date";
			if( Object.keys(condObj).length ){
				let minVal= 0;
				if( condObj.cxDateOptions ){
					this.setData('dateoptions' , condObj.cxDateOptions);//no i18N
					let dateOptDD = $L(`#second_${field.api_name}_dropdown`)[0];
					if( dateOptDD ){
						dateOptDD.resetSelected();
					}
				}
				if( condObj.cxMinvalue !== undefined ){
					minVal = condObj.cxMinvalue;
				}
				Lyte.objectUtils(field,'add','minValue',minVal)
			}
			if( ["equal" , "less_than" , "greater_than"].includes(value)){
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({value : "","cruxElement1": ele,numberDropClass : "w150", showSecondDropdownType : ""});//No I18n
			}else if(value == "between" || value == "not_between"){ //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,cruxElement2 :ele, cruxElement1 : "",placeholderValue : ['',_cruxUtils.getI18n('workflow.option.webhookFailure.fromDate'),_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")]});//No I18n
			}else if(value == "Due in Days" || value == "Age in Days" || condObj.showDynamicInput){//no i18n
				this.setData("showSecondDropdownType", "date");//No I18n
				if(field.api_name != 'With_Open_Deal' && field.api_name != 'Without_Open_Deal'){
					this.setData({numberDropClass : "" ,maxLen : 4,cruxElement1 : "number",placeholderValue : [""]});//No I18n
					Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value1" : "2","value2" : undefined});//no i18n
				}
			}else {
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({"showSecondDropdownType": "", "cruxElement1" : ""});//No I18n
			}
		}
		else if( ["num" , "currency" , "double" , "bigint" , "integer" , "longinteger" , "decimal"].indexOf(field.field_data_type)  != -1 ){
			if( field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){//no i18n
				this.setData("numberDropClass" , 'w100') //no i18n
			}else if(!/count|percentage/.test(field.api_name)){
				this.setData("numberDropClass" , "w150");//No I18n
			}
			if(this.data.selectedValues.value2){
				Lyte.objectUtils(this.getData("selectedValues") ,"add", {"value1" : undefined,"value2" : undefined });//no i18n
			}
			if(field.ui_type == 80){
				this.setData("placeholderValue",[_cruxUtils.getI18n('crm.label.type.minutes')]);//no i18n
			}
			else{
				this.setData("placeholderValue",[_cruxUtils.getI18n('crm.label.filter.typehere')]);//no i18n
			}
			if(value == "between" || value == "not_between"){
				Lyte.objectUtils(this.getData("selectedValues") ,"add", {"value1" : undefined,"value2" : undefined });//no i18n
				this.setData({"showSecondDropdownType": "between", cruxElement2 : "number",cruxElement1 : "number",numberDropClass : "w100",placeholderValue : ['',_cruxUtils.getI18n('crm.label.from'),_cruxUtils.getI18n("crm.label.to")]});//No I18n
				if( field.ui_type == 80 ){
					this.setData('placeholderValue', ['', _cruxUtils.getI18n("crm.label.in.minutes",_cruxUtils.getI18n('crm.label.from')) ,_cruxUtils.getI18n("crm.label.in.minutes",_cruxUtils.getI18n("crm.label.to"))]) //no i18n
				}
			}else if(value == "not_equal" || value == "equal" || value == "less_than" || value == "greater_than" || value == "less_equal" || value == "greater_equal"){//no i18n
				var comp = (field.column_name == "LAYOUTID")?"layout":"number" //no i18n
				this.setData({showSecondDropdownType : "", cruxElement1 : comp});//no i18n
			}else{
				this.setData({"showSecondDropdownType": "", cruxElement1 : ""});//No I18n
			}
			var tNode = this.$node.querySelector("lyte-number");//no i18n
			if(tNode && changeStatus){
				tNode.focus()
			}
		}
		else if( this.cruxAssetsCompMapping[field.api_name] ||  ["text","textarea","multiselectpicklist","phone","email","mobile","website","lookup","picklist","autonumber","tag"].indexOf(field.field_data_type)  != -1 && !this.data.isChildFieldLookup){
			if(!this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT &&["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field){
				var tname = field.column_name == "EMAIL" ? "Secondary_Email" : "Email" ; //no i18n
				var id = this.parentCompData.data.cxPropChildModuleFields ? "#option_"+tname+"_"+field.id+"_"+this.parentCompData.data.cxPropChildModuleRelation : "#option_"+tname , tNode = $(id)[0];//no i18n
				if( ["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 ){
					this.$node._callee.component.blockedCriteriaSelected = field.api_name;
				}else if( field.api_name == this.$node._callee.component.blockedCriteriaSelected ){//no i18n
					this.$node._callee.component.blockedCriteriaSelected = false;
				}
				if( tNode ){
					if( field.api_name == this.$node._callee.component.blockedCriteriaSelected){//no i18n
						Lyte.arrayUtils(tNode.getData("options") ,'removeAt',8,2);//no i18n
					}else if( tNode.getData("options").length<=8 ){//no i18n
						Lyte.arrayUtils(tNode.getData("options"), 'push', [{system : '${BLOCKED}',display : _cruxUtils.getI18n('crm.filter.email.isblocked')},{system :'${NOTBLOCKED}' ,display : _cruxUtils.getI18n('crm.filter.email.isnotblocked')}]) //no i18n
					}

				}
			}
			if(value.indexOf("$") != -1){
				this.setData({cruxElement1 : "" , showSecondDropdownType : ""});
			}
			else{
				comp = comp || (field.field_data_type === "tag"?"tag":this.cruxCompMapping[field.field_data_type] )//no i18n
				this.setData("cruxElement1", comp);//No I18n
				if(field.ui_type == 132){
					this.setData("showSecondDropdownType" , "date");//No I18n
				}
				if( field.history_tracking && value == "not_equal"){
					$L("#picklist_tracker_field").addClass("dN");//no i18n
				}else if( field.history_tracking && value == "equal" ){//no i18n
					$L("#picklist_tracker_field").removeClass("dN");//no i18n
				}
				var tNode = this.$node.querySelector("lyte-input");//no i18n
				if(tNode && changeStatus){
					tNode.focus()
				}
			}
		}else if(field.field_data_type == "multiselectlookup" || this.data.isChildFieldLookup){ //no i18n
			var node = $L("#multiSelect_lookup_"+this._cruxReplace(field.api_name, "[/.]","_"))[0]//no i18n
			if(node){
				node.style.display = (value === "${EMPTY}" || value === "${NOTEMPTY}")?"none": "block"
			}
		}else if(["ownerlookup","multiuserlookup","userlookup"].indexOf(field.field_data_type)  != -1 && value.indexOf("$") == -1 && ['equal_role','equal_group','not_equal_role'].indexOf(value) == -1){//no i18n
			this.setData("cruxElement1", "user");//No I18n
		} else if(field.field_data_type === "multirelation") {
			var node = $L("#multiSelect_lookup_" + this._cruxReplace(field.api_name, "[/.]","_"))[0]; // NO I18N
			node ? node.style.display = value === "${EMPTY}" ? "none" : "block" : undefined // NO I18N
		} else if(['equal_role','equal_group','not_equal_role'].indexOf(value) > -1){
			if(value.indexOf("group") > -1 && typeof Crm && !Crm.groupUserRelDetails){
				store.findAll("related_list", {
				            module: "Users"
				        },true).then(function(res){
				        	if (typeof Crm){
				        		if(!Crm.groupUserRelDetails){
				        			Crm.groupUserRelDetails = {listRelation : res.find( obj => obj.api_name == 'GroupUserRel__s')};
				        		}else{
				        			Crm.groupUserRelDetails.listRelation = res.find( obj => obj.api_name == 'GroupUserRel__s') ;
				        		}
				        }});
				store.findAll('field',{
							module : 'GroupUserRelations__s'
						},true).then(function(res){
				        	if (typeof Crm){
				        		if(!Crm.groupUserRelDetails){
				        			Crm.groupUserRelDetails = {field : res.find( fld => fld.api_name == 'GroupRel__s')};
				        		}else{
				        			Crm.groupUserRelDetails.field = res.find( fld => fld.api_name == 'GroupRel__s');
				        		}
				        }});
			}else if (value.indexOf("role") > -1 && typeof Crm  && !Crm.userRoleField){
				store.findAll('field',{
							module : 'Users'
						},true).then(function(res){
				        	Crm.userRoleField = res.find( fld => fld.api_name == 'role');	
				        });
			}
			this.setData("cruxElement1", "role");//No I18n
			// To differentiate store request in role component
			if(this.getData('roleRequestModel') && value.indexOf(this.getData('roleRequestModel')) === -1)  {
				Lyte.objectUtils(this.getData('selectedValues') ,"add","value1" , []  )//no i18n
			}
			this.setData('roleRequestModel', value.indexOf("group") > -1 ? 'user_group' : 'role' );
			
		}
	},
	
	/**
	 * No Ajax call
	 */
	findAbmSegments: function(text, renderItems) {
		var thisObj = this,
			abmSegmentsList = thisObj.getData('abmSegmentsList'), // NO I18N
			flag = true,
			segmentName;
		
		thisObj.setData('lookUpArray', []); // NO I18N
		
		abmSegmentsList.forEach(function(data){
			segmentName = data.Segment_Name__s.toLowerCase();
			
			if(!thisObj.isSelected(data, renderItems) && segmentName.startsWith(text)) {
				flag = false;
				Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
			}
		});
		
		if(flag){
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
		} else {
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", ""); // NO I18N
		}
	},
	
	searchAbmSegments: function(text, renderItems) {
		var url,
			abmSegmentsList = this.getData('abmSegmentsList'), // NO I18N
			thisObj = this;
		
		text = text.trim().toLowerCase();
		thisObj.setData("abmSegmentsSearchedText", text);
		
		if(abmSegmentsList && abmSegmentsList.length) {
			thisObj.findAbmSegments(text, renderItems);
			return;
		}
			
		thisObj.setData('lookupDisplayField', "Segment_Name__s"); // NO I18N
		Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.searching.text')); // NO I18N
		
		url = "/crm/v4/ABM_Segment__s?fields=Segment_Name__s"; // NO I18N
		
		thisObj.sendxhr(url, "GET").then(function(res) { // NO I18N
			var flag = true,
				segmentName,
				segmentLength;
			
			thisObj.setData('lookUpArray', []); // NO I18N
			
			if(res.response !== ""){
				Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", ""); // NO I18N
				res = JSON.parse(res.response).data;
				segmentLength = res.length;
				thisObj.setData('abmSegmentsList', res); // NO I18N
				
				if(segmentLength) {
					
					if(renderItems.length === 0) {
						
						res.forEach(function(data){
							segmentName = data.Segment_Name__s.toLowerCase();
							
							if(!text || segmentName.startsWith(text)) {
								flag = false;
								Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
							}
						});
					} else {
						
						res.forEach(function(data){
							segmentName = data.Segment_Name__s.toLowerCase();
							
							if(!thisObj.isSelected(data, renderItems) && (!text || segmentName.startsWith(text))) {
								flag = false;
								Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
							}
						});
					}
					
					if(flag){
						Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
					}
				}
			} else {
				Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
				thisObj.setData('lookUpArray', []); // NO I18N
			}
			
		}, function() {
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.error.loading.text')); // NO I18N
		});
	},
	
	onSearchFun : function(event,ele){

		var module = this.moduleRecordMapping[this.getData('module')];

		var field = this.getData('field');//no i18n
		var apiName = $(ele).attr('id') === 'Recommendation_infield_Search_val' ? 'Recommendation_infield' :  field.api_name; //no i18n

		var renderItems = apiName === 'Recommendation_infield' ? this.getData('renderItems2') : this.getData('renderItems') //no i18n
		
		if(renderItems) {
			if(apiName==="SimilarityRecords" && renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
				return;
			} else if(renderItems.length>=5) {
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg", _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names'))); // NO I18N
				return;
			}
		}

		if(this.$node.querySelector("#multiSelect_lookup_"+ this._cruxReplace(apiName, "[/.]","_"))){
				this.$node.querySelector("#multiSelect_lookup_"+this._cruxReplace(apiName, "[/.]","_")).open();//No I18n
			}
		//var head={"Leads":["Full_Name","Last_Name"],"Activities":["Subject"],"Accounts":["Account_Name"],"Contacts":["Full_Name"],"Deals":["Deal_Name"],"Potentials":["Deal_Name"],"Campaigns":["Campaign_Name"],"Cases":["Subject"],"Solutions":["Solution_Title"],"Products":["Product_Name"],"Vendors":["Vendor_Name"],"PriceBooks":["Price_Book_Name"],"Quotes":["Subject"],"SalesOrders":["Subject"],"PurchaseOrders":["Subject"],"Invoices":["Subject"], "Visits" : ["Visited_Page"], "Sales_Orders" : ["Subject"]}; //No I18N
		var head = this.getData("moduleDisplayField");//no i18n
		//crmConstants.moduleDisplayField;
		var self = this;



        // var search = $L("#searching_"+apiName)[0] //no i18n
		// var noresult = $L("#"+apiName+"_noOption")[0] //no i18n
		var text = event.newValue
		var msg = $L('#display_msg_'+this._cruxReplace(apiName, "[/.]","_"))[0] //no i18n
		
		if( apiName === "cxFilter_Linked_Segment__s" ) {
			this.searchAbmSegments(text, renderItems);
		} else if(text.length === 0){

			// search.classList.add('dNI') //no i18n
			// noresult.classList.add('dNI') //no i18n
			self.setData('lookUpArray',[]) //no i18n
			// msg.classList.remove('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.minimum.input.text','2') //no i18n
		}else if(text.length == 1){
			// msg.classList.remove('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','1'))//no i18n
			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.minimum.input.text','1') //no i18n
			self.setData('lookUpArray',[]) //no i18n
			// search.classList.add('dNI') //no i18n
			// noresult.classList.add('dNI') //no i18n
		} else{
			// msg.classList.add('dNI') //no i18n
			//search.classList.remove('dNI') //no i18n
			//noresult.classList.add('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.searching.text'))//no i18n

			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.searching.text') //no i18n
			var display_field,moduleName;
			moduleName =(apiName == "cxFilter_Campaigns" && field.field_data_type === "crossfield") ? "Campaigns" : (apiName == "Recommendation" || apiName == 'Recommendation_infield') ? 	this.idModuleMapping[module.recommendationsDetailsJson.what_to.id] : this.data.isChildFieldLookup ? this.idModuleMapping[field.lookup.module.id] : this.idModuleMapping[field.multiselectlookup.connected_module.id];//no i18n
			if( head[moduleName]){
				display_field = head[moduleName][0]
			}else {
				display_field = moduleRecordMapping[moduleName].display_field ?  moduleRecordMapping[moduleName].display_field.api_name : "Name"//no i18n
			 }
			// var display_field = (apiName == "Campaigns")?head.Campaigns[0]: display_field
			this.setData('lookupDisplayField',display_field) //no i18n
			//this.displayField =head[ field.multiselectlookup.connected_module.api_name ][0]
			var mod_api_name = (apiName == "cxFilter_Campaigns"&&field.field_data_type === "crossfield")?"Campaigns": (apiName == "Recommendation" || apiName == 'Recommendation_infield') ? 	module.recommendationsDetailsJson.what_to.api_name : this.data.isChildFieldLookup ? moduleRecordMapping[moduleName].api_name : field.multiselectlookup.connected_module.api_name//no i18n
			let searchApiVersion = this.cruxAssets.cxFilterLookupSearchApiVersion || 'v2';//no i18n
			var url = `/crm/${searchApiVersion}/${mod_api_name}/search?` // "/crm/v2/"+mod_api_name+"/search?" //no i18n
			
			if(mod_api_name === "Campaigns" && field.field_data_type === "crossfield"){
				var criteria ="(Campaign_Name:starts_with:"+text.trim().replace(/([<>*()?\\])/g, "\\$1")+")"//and(Status:equals:"+status+"))and(Type:equals:"+type+"))" //no i18n
				var type = this.getData("selectedValues").firstDropDownValue;//no i18n
				if(type){
					criteria = "("+criteria+"and(Type:equals:"+this.data.options.filter(function(item){return item.actual_value == type })[0].display_value+"))"
				}
				var status = this.getData("selectedValues").headDropDownValue;//no i18n
				if(status){
					criteria = "("+criteria+"and(Status:equals:"+this.data.opt1.filter(function(item){return item.actual_value == status })[0].display_value+"))"
				}
			}else{
				criteria="("+this.getData('lookupDisplayField')+":starts_with:"+ text.trim().replace(/([<>*()?\\])/g, "\\$1") +")" //no i18n
			}
			url = url+"criteria="+encodeURIComponent(criteria) //no i18n
			let reqProm ;
			if( this.getMethods('onCustomRequest') ){
				reqProm = this.executeMethod('onCustomRequest',{searchWord : text});
			}
			if( !reqProm ){
				reqProm = this.sendxhr(url, "GET"); //no i18n
			}
			reqProm.then(function(res){ //no i18n
				if(res.response !=="" || res.data){
					 res = res.response ? JSON.parse(res.response).data : res.data;
					 //search.classList.add('dNI') //no i18n
					 Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg","")//no i18n
					 //msg.innerHTML="";
					 self.setData('lookUpArray',[])//no i18n
						if(res.length !=0){
							//self.setData('campaigns',res)	//no i18n
							var len =res.length


							if(renderItems.length == 0){
								self.setData('lookUpArray',res) //no i18n
								$L("#campaign_"+res[0][self.data.lookupDisplayField]).addClass("lyteDropdownSelection");//no i18n
							}else{var flag = false;
								for(var i=0;i<len;i++){
									if(!self.isSelected(res[i],renderItems)){
										flag =true;
										Lyte.arrayUtils(self.getData('lookUpArray'), 'push', res[i]) //no i18n
									}
								}
								if(!flag){
									Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.label.no.options.found'))//no i18n
									//msg.innerHTML = _cruxUtils.getI18n('crm.label.no.options.found') //no i18n
								}else if($L("#campaign_"+self.data.lookUpArray[0][self.data.lookupDisplayField])[0]){
									$L("#campaign_"+self.data.lookUpArray[0][self.data.lookupDisplayField]).addClass("lyteDropdownSelection");//no i18n
								}
							}
						}
				}else{
					Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.label.no.options.found'))//no i18n
					//msg.innerHTML = _cruxUtils.getI18n('crm.label.no.options.found') //no i18n
					// noresult.classList.remove('dNI') //no i18n
					// search.classList.add('dNI') //no i18n
					self.setData('lookUpArray',[]) //no i18n
				}
			},function(errRes){
				if(errRes.status === 403 && errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION')
				{
					Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.security.error'))//no i18n
				}
				else
			    {
                    Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.error.loading.text'))//no i18n
				}
				//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.error.loading.text') //no i18n
			})
		}



	},
	valueChanged : function(val,node){

		var field = this.getData('field') //no i18n
		if(field.api_name == "cxFilter_Campaigns"){
			var value = JSON.parse($L("#multiSelect_lookup_"+field.api_name)[0].ltProp('selected'));//no i18n


			// if(   ["Zoho Campaigns","Zoho Webinar1","Zoho Backstage","Zoho Survey"].indexOf(this.data.selectedValues.firstDropDownValue) != -1){

			// }
			if( value.length == 0 ){
				this.setData('memberStatus',false) //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value2" : []});//no i18n
			}else{
				this.setData('memberStatus',true) //no i18n
			}
			if(node){
				node.open();//No I18n
			}
		}
		if(field.api_name === "Prediction_0" || field.api_name === "Prediction_1"){
			if(this.$node.querySelector("#scoreCheckBox")){
				var $node = $L("#sub_option_" + field.api_name)[0];//No I18n
				var parentNode = $L("#option_Prediction")[0];//No I18n
				if($node.querySelector("#scoreCheckBox").checked && !$node.getData("isScoreSelected")){
					$node.setData("isScoreSelected",true);//No I18n
					parentNode.setData("isScoreSelected",true);//No I18n
				}
				else if(!$node.querySelector("#scoreCheckBox").checked && $node.getData("isScoreSelected")){
					$node.setData("isScoreSelected",false);//No I18n
					parentNode.setData("isScoreSelected",false);//No I18n
				}
			}
		}

		if(field.api_name == "Recommendation" || field.api_name =="Recommendation_infield"){
			var selectedValues = this.getData("selectedValues");//no i18n
			var recommendationType = selectedValues.byDropDownValue;
			if(recommendationType == "Dependent"){
				this.setData("crossSelling",true);//no i18n
				this.setData("reBuy",false);//no i18n

			}else if(recommendationType == "Repeat"){//no i18n
				this.setData("crossSelling",false);//no i18n
				this.setData("reBuy",true);//no i18n
			}else{
				this.setData("crossSelling",false);//no i18n
				this.setData("reBuy",false);//no i18n
			}
		}

		if(field.api_name === "Competitor_Name"){
			var mention_criteria = this.getData('selectedValues').firstDropDownValue;
			if(mention_criteria === '${EMPTY}' || mention_criteria === '${NOTEMPTY}'){
				Lyte.arrayUtils($L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields,'removeAt',1,2);
			}
			else{
				var options = $L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields;
				if(options.length===1){
					// var competitorSentiments = [{"actual_value":"Positive","display_value":"Positive","sequence_number":1,"type":"used"},{"actual_value":"Negative","display_value":"Negative","sequence_number":2,"type":"used"},{"actual_value":"Neutral","display_value":"Neutral","sequence_number":3,"type":"used"}];
					// var competitorOptions = [{api_name: 'Competitor_Duration',data_type: 'date',field_data_type: 'date',field_label: 'Competitor Duration',display_field_label: 'Competitor Duration'},{api_name: 'Competitor_Sentiment',data_type: 'picklist',field_label: 'Competitor Sentiment',display_field_label: 'Competitor Sentiment', pick_list_values: competitorSentiments}];
					Lyte.arrayUtils(options,'push',$L('#option_cxFilter_Competitor_Alert')[0].component.data.field.options.slice(1));
				}
			}
		}

		if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
			this.executeMethod("onValueChange",{ field : field , value : val , comp : this });//No I18n
		}
	},
	hideSubfieldOption : function(ltPropname){
		var field = this.getData("field")//no i18n
//		comp.$node.classList.remove(field.api_name+"_selectedRadioBtn") //no i18n
		var name = this.$node.id;
		if(ltPropname){
			name =ltPropname
		}
		var Selected_node = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")
		if(name == "option_cxFilter_Email_Sentiment"){
			Selected_node[0].classList.remove("dNI")
		}
		var len = Selected_node.length
		if(len !='0'){
			var node = Selected_node[0]
			var id = "sub_option_"+node.ltProp('value'),//no i18n
			subOption = document.getElementById(id);
			if(subOption){
				subOption.style.display = "none";
			}
		}
	},
	getField : function(sub_field,comp){
		var node,field = this.getData("field")//no i18n
		var selected_id = "."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn"
		node = $L(selected_id)[0]
		if(node){
			node.classList.remove(field.api_name+"_selectedRadioBtn") //no i18n
		}
		comp.$node.classList.add(field.api_name+"_selectedRadioBtn") //no i18n
		var id = "sub_option_"+sub_field.api_name //no i18n
		node = document.getElementById(id);
		if(node!=null){
			node.classList.add("cvSubOption");//no i18n
			node.component.render(this.parentCompData)
		}
		if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
			this.executeMethod("onValueChange",{ field : field , sub_field : sub_field });//No I18n
		}
	},
	isSelected : function(Obj,renderItems){
		// var label = this.getData('lookupDisplayField')//no i18n
		var len = renderItems.length
		for(var i=0;i<len;i++){
			if(renderItems[i].id ==Obj.id){
				return true
			}
		}
		return false
	},
	hideDropDown : function(){
		var field = this.getData('field') //no i18n
		// var msg = $L('#display_msg_'+field.api_name)[0] //no i18n
		// var noresult = $L("#"+field.api_name+"_noOption")[0] //no i18n
		Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg","")//no i18n
		// msg.classList.remove('dNI') //no i18n
		//noresult.classList.add('dNI') //no i18n
		//var node = document.querySelector("#"+field.api_name+"_Search_val") //no i18n
		this.setData('lookUpArray',[]) //no i18n
		//node.ltProp('value','')//no i18n
	},
	setServiceStatus : function(key , _this){
		if( this.cruxAssets.setOptForCampaignsServiceStatus ){
			Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , this.cruxAssets.setOptForCampaignsServiceStatus({campaign_type : key}) );//no i18n
			return ;
		}
			_this.serviceStatusMap = {"Zoho Webinar"  : [{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Registered",actual_value : "Registered"},{display_value : "Attended",actual_value : "Attended"}],//no i18n
								  "Zoho Backstage" : [{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Yet to check in" ,actual_value : "Yet to check in" },{display_value : "Purchased",actual_value :"Purchased" },{display_value :"Checked in" ,actual_value :"Checked in" },{display_value : "Cancelled" ,actual_value :  "Cancelled"}],//no i18n
								 "Zoho Survey"    : [{display_value : "Yet to visit",actual_value :"Yet to visit" },{display_value : "Visited",actual_value : "Visited"},{display_value : "Partially Completed",actual_value : "Partially Completed"},{display_value : "Completed",actual_value : "Completed"}]
								 }
			// _this.serviceStatusMap["Zoho Campaigns"] = [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Bounced",actual_value :  "Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" }]//no i18n
			// if( Crm && Crm.userDetails &&  Crm.userDetails.isSoftBouncedEnabled){
				_this.serviceStatusMap["Zoho Campaigns"]= [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Hard Bounced",actual_value :  "Hard Bounced"},{display_value:"Soft Bounced" , actual_value : "Soft Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" }]//no i18n
			// }
			// _this.allService = [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Bounced",actual_value :  "Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" },{display_value : "Registered",actual_value : "Registered"},{display_value : "Attended",actual_value : "Attended"},{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Yet to check in" ,actual_value : "Yet to check in" },{display_value : "Purchased",actual_value :"Purchased" },{display_value :"Checked in" ,actual_value :"Checked in" },{display_value : "Cancelled" ,actual_value :  "Cancelled"},{display_value : "Yet to visit",actual_value :"Yet to visit" },{display_value : "Visited",actual_value : "Visited"},{display_value : "Completed",actual_value : "Completed"}];//no i18n
			// _this.allService = _this.sortArray(activeOptions , "display_value");//no i18n
			Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , []);//no i18n
			Lyte.objectUtils(_this.data.selectedValues ,"add",{Service_Status :[]});//no i18n
			if( ["Zoho Campaigns","Zoho Webinar","Zoho Backstage","Zoho Survey"].indexOf(key) != -1){
					Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.serviceStatusMap[key]);//no i18n
			}else if(!key){
				if( _this.allService && _this.allService.length){
					Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.allService);//no i18n
					return
				}
				if( !_this.data.options.length ){
					return "";
				}
				//to check active integration and concat the options
				var camType =_this.data.options,  camTypeLen = camType.length , activeOptions = []
				for( var i = 0 ; i < camTypeLen ; i++ ){
					if( _this.serviceStatusMap[camType[i].actual_value] ){
						var j = 0 , eachTypeOption = _this.serviceStatusMap[camType[i].actual_value] , optLen = eachTypeOption.length;
						for( j = 0 ; j < optLen ; j++ ){
							if( !activeOptions.filter(function(item){ return item.actual_value == eachTypeOption[j].actual_value })[0] ){ //eslint-disable-line no-loop-func
								activeOptions.push(eachTypeOption[j]);
							}
						}
					}
				}
				_this.allService = _this.sortArray(activeOptions , "display_value");//no i18n
				Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.allService);//no i18n
			}

	},

	setDropDownValuesFun : function(setAllVal){
		var options = this.cruxCondMapping;
			var field = this.getData("field"),bydropdownOption = [],opt1 = [],durationOpt = [],dateoptions = [],opt = [],dateOpt = []//No I18n
			var moduleRecordMapping = this.moduleRecordMapping
			if( field.data_type == "dynamicFilter" ){
				return
			} 
			if(field.field_data_type == "crossfield" && field.api_name !="cxFilter_Campaigns"){
				// if( field.api_name == "cxFilter_Recent_prediction_score" ){ //no i18n
				// 	this.setData("dateoptions",[{system : "DAY", display : _cruxUtils.getI18n("days")}, {system : "WEEK", display : _cruxUtils.getI18n("weeks")}, {system : "MONTH", display : _cruxUtils.getI18n("months")}]);//no i18n
				// 	bydropdownOption = [{system : "goneup" , display : _cruxUtils.getI18n('crm.intelligence.prediction.trendup')},{system : "gonedown" , display : _cruxUtils.getI18n('crm.intelligence.prediction.trenddown')}] //no i18n
				// }else 
				if(field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
					opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${TODAY}' , display : _cruxUtils.getI18n('Today')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{ 'system' : '${AGEINDAYS}+30' , display : _cruxUtils.getI18n('crm.condition.last.30.days')},{ 'system' : '${AGEINDAYS}+60' , display : _cruxUtils.getI18n('crm.condition.last.60.days')},{ 'system' : '${AGEINDAYS}+90' , display : _cruxUtils.getI18n('crm.condition.last.90.days')},{ 'system' : '${CURRENTTIME}' , display : _cruxUtils.getI18n('crm.condition.until.now')}] //no i18n
					bydropdownOption = [{'system' : 'Positive' , 'display' : _cruxUtils.getI18n('crm.sentiment.Positive') },{'system' : 'Negative' , 'display' : _cruxUtils.getI18n('crm.sentiment.Negative') },{'system' : 'PositiveAndNegative' , 'display' : _cruxUtils.getI18n('sentiment.positiveandnegative') },{'system' : 'PositiveOrNegative' , 'display' : _cruxUtils.getI18n('sentiment.positiveornegative') },{'system' : 'PositiveOnly' , 'display' : _cruxUtils.getI18n('sentiment.positiveonly') },{'system' : 'NegativeOnly' , 'display' : _cruxUtils.getI18n('sentiment.negativeonly') },{'system' : 'Neutral' , 'display' : _cruxUtils.getI18n('crm.sentiment.Neutral') }]//no i18n
				}
			}else if(field.api_name =="cxFilter_Campaigns"){ //no i18n
				//opt = [{'system' : '' , 'display' : _cruxUtils.getI18n('crm.filters.select.campaign.type',_cruxUtils.getI18n('Campaign')) },{'system' : 'Advertisement' , 'display' : _cruxUtils.getI18n('Advertisement') },{'system' : 'Banner Ads' , 'display' : _cruxUtils.getI18n('Banner\ Ads') },{'system' : 'Conference' , 'display' : _cruxUtils.getI18n('Conference') },{'system' : 'Direct mail' , 'display' : _cruxUtils.getI18n('Direct\ mail') },{'system' : 'Email' , 'display' : _cruxUtils.getI18n('crm.taskreminder.line8') },{'system' : 'Others' , 'display' : _cruxUtils.getI18n('Others') },{'system' : 'Partner' , 'display' : _cruxUtils.getI18n('Partner') },{'system' : 'Public Relations' , 'display' : _cruxUtils.getI18n('Public\ Relations') },{'system' : 'Referral Program' , 'display' : _cruxUtils.getI18n('Referral\ Program') },{'system' : 'Telemarketing' , 'display' : _cruxUtils.getI18n('Telemarketing') },{'system' : 'Trade Show' , 'display' : _cruxUtils.getI18n('Trade\ Show') },{'system' : 'Webinar' , 'display' : _cruxUtils.getI18n('Webinar') }] //no i18n
				this.setData({dropdownSysValue : "actual_value",dropdownDispValue : "display_value"});//no i18n
				var t_field = moduleRecordMapping.Campaigns.fields.filterBy({api_name : "Type"})[0];//no i18n
				if( t_field && t_field.visible && t_field.available_in_user_layout){
					opt =  t_field ? t_field.pick_list_values.slice(0) : [];//no i18n
					opt = opt.filter(function(item){return item.type != "unused"});//no i18n
					this.removeValue(opt,"actual_value",["-None-"]);opt = this.sortArray(opt,'display_value');//no i18n
					if(Crm && Crm.zohoCampaignEnabled){
						this.removeValue(opt,"actual_value",["Zoho Campaigns"])//no i18n
						 opt.unshift({'actual_value' : Crm.partnerName + " Campaigns" , 'display_value' : Crm.partnerName + " Campaigns" });//no i18n
					}
					opt.unshift({'actual_value' : '' , 'display_value' : "-"+_cruxUtils.getI18n('crm.filters.select.campaign.type',_cruxUtils.getI18n('Campaign'))+"-" });//no i18n
				}else{
					this.setData("firstDropdown",false);//no i18n
				}
				t_field = moduleRecordMapping.Campaigns.fields.filterBy({api_name : "Status"})[0];//no i18n
				if( t_field && t_field.visible && t_field.available_in_user_layout){
					var opt1 =  t_field ? t_field.pick_list_values.slice(0) : [];//no i18n
					opt1 = opt1.filter(function(item){return item.type != "unused"});//no i18n
					this.removeValue(opt1 , "actual_value" , ["-None-"]);opt1 = this.sortArray(opt1,'display_value');//no i18n
					opt1.unshift({'actual_value' : '' , 'display_value' : "-"+_cruxUtils.getI18n('crm.filters.select.campaign.status',_cruxUtils.getI18n('Campaign'))+"-" });//no i18n
				}

				//var opt1 = [{'system' : '' , 'display' : _cruxUtils.getI18n('crm.filters.select.campaign.status',_cruxUtils.getI18n('Campaign')) },{ 'system' : 'Active' , 'display' : _cruxUtils.getI18n('Active')},{ 'system' : 'Complete' , 'display' : _cruxUtils.getI18n('Complete')},{ 'system' : 'Inactive' , 'display' : _cruxUtils.getI18n('Inactive')},{ 'system' : 'Planning' , 'display' : _cruxUtils.getI18n('Planning')}] //no i18n
			}
			// else if(field.field_data_type == "recordlocks"){//NO I18N
				// $L("#recLock").css("display", "None");//NO I18N
			 // 	if(field.api_name == "Locked_True"){//no i18n
			 // 		$L("#recLock").css("display", "inline-block");//NO I18N
				// 	opt=[{'system' :'all_lock' , 'display' : _cruxUtils.getI18n('crm.globalsearch.option.all')},{'system' :'record_locking' , 'display' : _cruxUtils.getI18n('crm.record.label.recordlocking')},{'system' :'orchestration' , 'display' : _cruxUtils.getI18n('crm.label.automation.orchestration')}] //no i18n
				// 	Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "all_lock");//no i18n
				// }
				// else{
			 // 		$L("#recLock").css("display", "None");//NO I18N
				// }

			// }
			else if(field.field_data_type == "activity"){//no i18n
				if(field.api_name == "Overdue"){
					var modData=moduleRecordMapping[this.data.module];
					opt=[{'system' :'Activities' , 'display' : _cruxUtils.getI18n('Activities')},{'system' :'Tasks' , 'display' : _cruxUtils.getI18n('Tasks')},{'system' :'Calls' , 'display' : _cruxUtils.getI18n('Calls')}] //no i18n
					if(this.data.parentField && this.data.parentField.appointmentsOptEnabled){
						var appObj = {'system' :'Appointments' , 'display' : _cruxUtils.getI18n('Appointments')};
						opt.push(appObj);
					}
				}else if(field.api_name == "Activity_Due"){ //no i18n
					//eslint-disable-next-line no-useless-escape
					opt=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')},{'system' :'${DUEINDAYS}+7' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','7')},{'system' :'${TODAYANDOVERDUE}' , 'display' : _cruxUtils.getI18n('Today\ +\ Overdue')}] //no i18n
					Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAYANDOVERDUE}");//no i18n
				}
			}else if(field.field_data_type == "custom"){ //no i18n
				bydropdownOption = [{'system' : 'UserAndSystem' , 'display' : _cruxUtils.getI18n('crm.source.user.and.system') },{'system' :'UserOrSystem' , 'display' : _cruxUtils.getI18n('crm.source.user.or.system') },{'system' : 'User' , 'display' : _cruxUtils.getI18n('User') },{'system' : 'System', 'display' : _cruxUtils.getI18n('crm.label.system2') },{'system' : 'OnlyByUser' , 'display' : _cruxUtils.getI18n('crm.source.user.only') },{'system' : 'OnlyBySystem' , 'display' : _cruxUtils.getI18n('crm.source.system.only') }] //no i18n
				opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${TODAY}' , display : _cruxUtils.getI18n('Today')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{ 'system' : '${AGEINDAYS}+30' , display : _cruxUtils.getI18n('crm.condition.last.30.days')},{ 'system' : '${AGEINDAYS}+60' , display : _cruxUtils.getI18n('crm.condition.last.60.days')},{ 'system' : '${AGEINDAYS}+90' , display : _cruxUtils.getI18n('crm.condition.last.90.days')},{ 'system' : '${CURRENTTIME}' , display : _cruxUtils.getI18n('crm.condition.until.now')}] //no i18n
				this.setData('recordDropdownValues',field.values) //no i18n
				if(field.api_name == "cxFilter_Email_Status"){
					bydropdownOption = field.options
					opt = this.getData('withOption') //no i18n
				}
				//this.setData('bydropdownOption',optionVal)//no i18n
			}else if(field.api_name == "Recommendation"){ //no i18n
				//eslint-disable-next-line no-useless-escape
				// sthis.setData('recordDropdownValues',field.values) //no i18n
				this.setData('firstDropdown',false);//no i18n
				// renderRecommendation = false;
				var recommendationBasedOnOption = {
					FirstTime : {'system': 'FirstTime', 'display': _cruxUtils.getI18n('crm.filter.label.firstbuy')}, //no i18n
					Dependent : {'system': 'Dependent', 'display': _cruxUtils.getI18n('crm.filter.label.cwbab')}, //no i18n
					Bundle : {'system': 'Bundle', 'display': _cruxUtils.getI18n('crm.filter.label.fbt')}, //no i18n
					Repeat : {'system': 'Repeat', 'display': _cruxUtils.getI18n('crm.filter.label.rebuy')}, //no i18n
					Sequence: {'system': 'Sequence', 'display': _cruxUtils.getI18n('crm.filter.label.nextbuy')}  //no i18n
				};
				if(moduleRecordMapping && moduleRecordMapping[this.data.module] && moduleRecordMapping[this.data.module].isRecommendationsEnable && moduleRecordMapping[this.data.module].recommendationsDetailsJson){
					var recommendationsDetailsJson = moduleRecordMapping[this.data.module].recommendationsDetailsJson;
					if(recommendationsDetailsJson && recommendationsDetailsJson.suggestion_type){
						var suggestion_type = recommendationsDetailsJson.suggestion_type;
						bydropdownOption = [];
						if (suggestion_type.first_buy && suggestion_type.first_buy.enabled) {
							recommendationBasedOnOption.FirstTime = {'system' :'FirstTime' , 'display' : suggestion_type.first_buy.label}; //no i18n
						}else{
							recommendationBasedOnOption.FirstTime = undefined;
						}
						if (suggestion_type.customer_also_bought && suggestion_type.customer_also_bought.enabled) {
							recommendationBasedOnOption.Dependent = {'system' :'Dependent' , 'display' : suggestion_type.customer_also_bought.label};//no i18n
						}else{
							recommendationBasedOnOption.Dependent = undefined;
						}
						if (suggestion_type.frequently_bought_together && suggestion_type.frequently_bought_together.enabled) {
							recommendationBasedOnOption.Bundle = {'system' :'Bundle' , 'display' : suggestion_type.frequently_bought_together.label};//no i18n
						}else{
							recommendationBasedOnOption.Bundle = undefined;
						}
						if (suggestion_type.rebuy && suggestion_type.rebuy.enabled) {
							recommendationBasedOnOption.Repeat = {'system' :'Repeat' , 'display' : suggestion_type.rebuy.label};//no i18n
						}else{
							recommendationBasedOnOption.Repeat = undefined;
						}
						if (suggestion_type.next_buy && suggestion_type.next_buy.enabled) {
							recommendationBasedOnOption.Sequence = {'system' :'Sequence' , 'display' : suggestion_type.next_buy.label};//no i18n
						}else{
							recommendationBasedOnOption.Sequence = undefined;
						}
					}
				}

				this.setData("recommendationBasedOnOption",recommendationBasedOnOption); //no i18n
			}
			else if(field.api_name === "Prediction" || field.api_name === "Prediction_0" || field.api_name === "Prediction_1" ){
				var node = field.api_name === "Prediction" ? $L("#option_Prediction")[0] : $L("#sub_option_" + field.api_name)[0];//no i18n
				var scoreOperators = node.component.numberWithOEmptyConditions;
				Lyte.objectUtils(node.getData("predictionOptions"),"add","score_operator",scoreOperators);//No I18n
			}
			else if(field.data_type === "BestTime" && field.api_name === "best_time"){		
				bydropdownOption=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')}] //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAY}");//no i18n		
			}
			else if(field.data_type === "NBX" && field.api_name === "NBX_Available" && !this.data.userDetails.NBX_GOAL){
				opt=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')},{'system' :'${DUEINDAYS}+7' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','7')},{'system' :'${DUEINDAYS}+15' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','15')},{'system' :'${DUEINDAYS}+30' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','30')}] //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAY}");//no i18n
			} 
			else if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1){ //no i18n
				//eslint-disable-next-line no-useless-escape
				opt = [{ 'system' : 'Scheduled' , display : _cruxUtils.getI18n('Scheduled')},{ 'system' : 'Attended Dialled' , display : _cruxUtils.getI18n('Attended\ Dialled')},{ 'system' : 'Unattended Dialled' , display : _cruxUtils.getI18n('Unattended\ Dialled')},{ 'system' : 'Overdue' , display : _cruxUtils.getI18n('Overdue')},{ 'system' : 'Cancelled' , display : _cruxUtils.getI18n('Cancelled')},{ 'system' : 'Received' , display : _cruxUtils.getI18n('Received')},{ 'system' : 'Missed' , display : _cruxUtils.getI18n('Missed')}] //no i18n
			}else{
				var field_data_type = field.field_data_type //no i18n
				// if( field.field_data_type == "formula" || field.dataparam.return_type){
				// 	field_data_type = (field.field_data_type == "formula")?field.formula.return_type : field.dataparam.return_type; //no i18n
				// }
				if( field_data_type == "multiselectpicklist" && this[field_data_type+"Conditions"]){
					opt = this[field_data_type+"Conditions"];
				}else{
					opt = this[options[field_data_type]+"Conditions"];
					// opt = opt ? opt : this.defaultConditions;
				}
				opt = opt ? opt : [];
				
// (field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1) ||
				if(  field.ui_type == 80 ||  ([ "Positive_Score" , "Negative_Score"  , "Touch_Point_Positive_Score" , "Touch_Point_Negative_Score" , "Touch_Point_Score" , "Score"].indexOf(field.api_name) !== -1 && field.ui_type == undefined) ){
					opt.pop();opt.pop();
				}else if(["APPOINTMENTSTATUS","SERVICESTATUS"].indexOf(field.column_name)!= -1){//no i18n
					opt = this.defaultConditions;
				}
				if( "Email" ==  field.column_name && this.$node._callee.component.data.isFromModal){
					opt.pop();opt.pop();
				} else if(field.api_name == "cxFilter_Deal_Owner"){ //We can't apply cross of Cross filter in custom view. So restricting role and group operator in cross deal owner
					opt = this.defWithEmptyConditions;
				}
				if(["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field && (this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT ||  !this.$node._callee.component.blockedCriteriaSelected) ){
					Lyte.arrayUtils(opt, 'push', [{system : '${BLOCKED}',display : _cruxUtils.getI18n('crm.filter.email.isblocked')},{system :'${NOTBLOCKED}' ,display : _cruxUtils.getI18n('crm.filter.email.isnotblocked')}]) //no i18n
				}
				if(field.field_data_type == "multiselectlookup" || this.data.isChildFieldLookup){
					if(field.ui_type == "445"){
						ele = "user";opt = this.booleanConditions //no i18n
					}else{
						var id = this.data.isChildFieldLookup ? field.lookup.module.id : field.multiselectlookup.connected_module.id;
						this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name',moduleRecordMapping[this.idModuleMapping[id]].singular_label)]) //no i18n
						opt = [{system : "equal", display : _cruxUtils.getI18n("is")},{system : "${EMPTY}", display : _cruxUtils.getI18n("is empty")}] //no i18n
					}
				}
				
				if(["cxFilter_Linked_Segment__s"].includes(field.api_name)) {
					opt = [{
						system: "equal", // NO I18N
						display: _cruxUtils.getI18n("is") // NO I18N
					}, {
						system: "${EMPTY}", // NO I18N
						display: _cruxUtils.getI18n("is empty") // NO I18N
					}];
				}
				
				if(field.field_data_type == "picklist" && field.history_tracking){
					 var durationOpt = [{system : "greater_than", display : ">"},{system : "less_than", display : "<"},{system : "greater_equal", display : ">="},{system : "less_equal", display : "<="},{system : "equal", display : "="}] //no i18n
					//this.setData('durationOpt',durationOpt) //no i18n
				}
				// if(field.api_name == "cxFilter_Prediction_Score"){
				// 	opt = [{system : "less_than", display : "<"},{system : "greater_than", display : ">"},{system : "less_equal", display : "<="},{system : "greater_equal", display : ">="},{system : "between", display : _cruxUtils.getI18n('between')}] //no i18n
				// }
				if(field.api_name == "count" || field.api_name == "percentage"){
					opt = [{system : "greater_than", display : ">"},{system : "less_than", display : "<"},{system : "greater_equal", display : ">="},{system : "less_equal", display : "<="},{system : "equal", display : "="}] //no i18n
				}
			}
			if(field.field_data_type == "tag"){
				opt = this.defWithEmptyConditions;
			}else if( ["ACTIVITYTYPE","LAYOUTID","PROCESSINGBASIS","SE_STATUS","WIZARDID"].indexOf(field.column_name) != -1 ){//no i18n
				opt = this.defaultConditions;
			}else if( field.column_name == "STAGE" || field.api_name == "cxFilter_Deal_Stage"){//no i18n
				opt = this.stageConditions;
			}
			if( ["date" , "datetime" , "date_time"].includes(field.field_data_type) || field.api_name == "cxFilter_Email_Sentiment" ){
				if(field.api_name == "Without_Any_Activity" || field.api_name == "Without_Any_Notes" || field.api_name == "Attended" || field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
					opt=this.getData('withOption') //no i18n
					if(setAllVal){
						if(field.api_name == "cxFilter_Email_Sentiment" && opt.filter(function(item){return item.system == "${CURRENTTIME}"}).length == 0){
							Lyte.arrayUtils(opt, "push", {system : "${CURRENTTIME}", display : _cruxUtils.getI18n("condition.till.now")});//No I18n
						}else if(opt.filter(function(item){return item.system == "${EMPTY}"}).length == 0){ //no i18n
							Lyte.arrayUtils(opt, "push", {system : "${NOTEMPTY}", display : _cruxUtils.getI18n("crm.condition.till.today")});//No I18n
						}
					}
				}else if(field.api_name == "Activity_Done" || field.api_name =="Notes_Added" || field.api_name == "Missed"){ //no i18n
					opt = this.getData('withOption') //no i18n
				}else if(field.api_name == "With_Open_Deal" || field.api_name == "Without_Open_Deal"){ //no i18n
					opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{system : "${LASTWEEK}", display : _cruxUtils.getI18n("Last\ Week")},{system : "${LASTMONTH}", display : _cruxUtils.getI18n("Last\ Month")}]  //no i18n
					dateOpt = [{'system' : '${AGEINMONTHS}+1' , display : _cruxUtils.getI18n('crm.recurring.no.months','1')},{'system' : '${AGEINMONTHS}+2' , display : _cruxUtils.getI18n('crm.recurring.no.months','2')},{'system' : '${AGEINMONTHS}+3' , display : _cruxUtils.getI18n('crm.recurring.no.months','3')},{'system' : '${AGEINMONTHS}+4' , display : _cruxUtils.getI18n('crm.recurring.no.months','4')},{'system' : '${AGEINMONTHS}+5' , display : _cruxUtils.getI18n('crm.recurring.no.months','5')},{'system' :'${AGEINMONTHS}+6' , display : _cruxUtils.getI18n('crm.recurring.no.months','6')}] //no i18n
					this.setData('dateoptions', (setAllVal) ? dateOpt : [dateOpt[0]]) //no i18n
				}
			}
			if(field.ui_type == 53){
				opt = this.numberConditions.slice(0,6);
				this.setData("dateoptions",[
					{system : "HOURS", display : _cruxUtils.getI18n("hours")},
					{system : "DAYS", display : _cruxUtils.getI18n("days")},		
					{system : "WEEKS", display : _cruxUtils.getI18n("weeks")},
					{system : "MONTHS", display : _cruxUtils.getI18n("months")},
					{system : "YEARS", display : _cruxUtils.getI18n("years")}
				]);
			}
			if( field.ui_type == 132 ){
				var moduleList = field.multi_module_lookup.modules , dateOpt = [] , moduleDet ;
				for(const module of moduleList){
					moduleDet = this.moduleRecordMapping[this.idModuleMapping[module.id]];
					dateOpt.push( { system : moduleDet.id, display : moduleDet.plural_label } );
				}
				this.setData('dateoptions', (setAllVal) ? dateOpt : [dateOpt[0]]) //no i18n
			}
			if( field.crypt ){
				var opt = this.encryptNumberConditions;
				if( this.data.cruxElement1 != "number" || ["date","datetime","currency"].indexOf(this.data.field.field_data_type) != -1 ){
					this.setData({"cruxElement1" : false , "showSecondDropdownType" : ""});//no i18n
					opt = this.defEmptyConditions;
				}
			}
			if( field.cxFieldsDetails && field.cxFieldsDetails[0] ){
				bydropdownOption = field.cxFieldsDetails[0].cxOptions;
			}
			if( field.api_name == "cxFilter_UnallocatedRecords"){
				this.setData("crossFields" , field.crossFields);//no i18n
				this.setData('firstDropdown', false) //no i18n
				opt = [];
			}
			this.triggerConditionCallback(opt , setAllVal , false , { bydropdownOption : bydropdownOption});
			// var callbackArgs = {field : this.data.field,condition : opt , type : options[field_data_type] , dateOption : this.data.dateoptions}
			// if(this.cruxAssets.setFieldBasedFilterComparator){
			// 	callbackArgs.condition = opt;
			// 	opt = cruxAssets.setFieldBasedFilterComparator(callbackArgs);
			// }
			// if( this.getMethods("setConditions") ){
			// 	opt = this.executeMethod("setConditions",callbackArgs)
			// }
			

			// if(opt && opt.length){
			// 	var optDisableList = opt.filter(a=>a.cxDisabled).map(item=>item.system);
			// 	this.setData('optionsDisabledList',optDisableList);
			// }
			if(setAllVal){
				this.setData({durationOpt : durationOpt,opt1 : opt1});
			}else{
				//this.setData("dateoptions",this.getData("dateoptions")[0])
				this.setData({durationOpt : [durationOpt[0]],opt1 : [opt1[0]]});
			}
	},
	showAlertMsg : function(alertMsg,comp){
		var ele = document.getElementById("cxFilterAlert");
		// if(!ele){
		// 	ele = Lyte.Component.render("lyte-alert", {ltPropWrapperClass:  "cxSmartFilterAlert", id : "cxFilterAlert", ltPropShowCloseButton : false, ltPropButtonPosition : "center",
		// 		ltPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}], ltPropContentAlign : "left"}, "body");//No I18n
		// }
		if( !ele ){
			return
		}
		$("crux-smart-filter")[0].setData("alertMsg",alertMsg);//no i18n
		ele.ltProp({"top" :'0px'});//No I18n
		ele.ltProp("show", true);//No I18n
		ele.setMethods({onClose : function(){
			if(comp && comp.$node.querySelector("lyte-input")){
				comp.$node.querySelector("lyte-input").focus();//No I18n
			}else if(comp && comp.$node.querySelector("lyte-number")){//no i18n
				comp.$node.querySelector("lyte-number").focus();//No I18n
			}
		},onShow : function(){
			$L(".cxSmartFilterAlert lyte-button").focus();//no i18n
		}
	})
	},
	triggerConditionCallback : function(opt , setAllVal , preventGetValueFn=false , moreData={}){
		var field = this.data.field , cond , selectedValue;
		var callbackArgs = {field : this.data.field,condition : opt ? opt : [], type : this.cruxCondMapping[field.field_data_type] , dateOption : this.data.dateoptions, comp : this}
		callbackArgs.fieldOption = moreData.bydropdownOption ? moreData.bydropdownOption : [];
		if( field.cxDynamicFilterCriteriaComponent && this.cruxAssets.getDynamicFilterCriteriaCondtions ){
			callbackArgs.condition = opt;
			cond = this.cruxAssets.getDynamicFilterCriteriaCondtions(field , opt);
			if( cond && cond.constructor === Array){
				opt = cond;
			}else if(cond && cond.constructor === Object ){
				opt = cond.condition ? cond.condition : opt;
				callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
				selectedValue = cond.selected ? cond.selected : selectedValue;
			}
		}
		if(this.cruxAssets.setFieldBasedFilterComparator){
				callbackArgs.condition = opt;
				cond = cruxAssets.setFieldBasedFilterComparator(callbackArgs);
				if(cond && cond.constructor == Array){
					opt = cond;
				}else if(cond && cond.constructor == Object ){
					opt = cond.condition ? cond.condition : opt;
					callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
					selectedValue = cond.selected ? cond.selected : selectedValue;
					callbackArgs.prefixDropdownOption = cond.prefixDropdownOption ? cond.prefixDropdownOption : [];
				}

				// if( cond && cond.length ){
				// 	opt = cond;
				// }
			}
			let compScope = this.parentCompData || this; // to Execute setConditions callback for parent component.
			if( compScope.getMethods("setConditions") ){
				callbackArgs.condition = opt;
				cond = compScope.executeMethod("setConditions",callbackArgs)
				if(cond && cond.constructor == Array){
					opt = cond;
				}else if(cond && cond.constructor == Object ){
					opt = cond.condition ? cond.condition : opt;
					callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
					selectedValue = cond.selected ? cond.selected : selectedValue;
					Lyte.objectUtils(this.data.selectedValues ,"add","firstDropDownValue" , selectedValue);//no i18n
					callbackArgs.prefixDropdownOption = cond.prefixDropdownOption ? cond.prefixDropdownOption : [];
				}
			}
			selectedValue = selectedValue ? selectedValue : opt && opt[0] ?opt[0].system : "";
			if(setAllVal){
				this.setData({options : opt ,bydropdownOption :  callbackArgs.fieldOption});
			}else{
				//this.setData("dateoptions",this.getData("dateoptions")[0])
				this.setData({options : (field.api_name === "Activity_Due") ? [opt[3]] : [opt[0]] , bydropdownOption : callbackArgs.fieldOption});
			}
			if( selectedValue && this.data.firstDropdown && !preventGetValueFn){
				this.getValue( selectedValue ,undefined,true)
			}
			this.setData("sentStatus", field.sent_status ? field.sent_status : []);//no i18n
			if( callbackArgs.prefixDropdownOption && callbackArgs.prefixDropdownOption.length ){
				this.checkValuePrefixDD("get",callbackArgs.prefixDropdownOption);
			}

			let sentStatusArr = this.getData("sentStatus"); //no i18n				
			let sentStatusFlag = sentStatusArr.length > 0 ? true : false;
			
			this.setData('sentStatusFlag', sentStatusFlag); //no i18n

			if(opt && opt.length){
				var optDisableList = opt.filter(a=>a.cxDisabled).map(item=>item.system);
				this.setData('optionsDisabledList',optDisableList);
			}
			// if( field.cxForceSetCondition ){
				var dropdownNode = $L('#DDV_'+field.api_name)[0];
				if( dropdownNode ){
					dropdownNode.resetSelected();
				}
			// }

	},
	checkValuePrefixDD : function(type = "get" , options=[] , selectedPrefix , criteriaValue){ //no i18n
		var field = this.data.field , selectedItem;
		if(type === "set"){
			if( !this.data.valuePrefixDropdownOpt.prefixOption.length ){
				return "" ;
			}
			var checkSelectedOpt = function(opt, selVal){
				var pick_vals = opt[opt.api_name];
				var filtVal = pick_vals.filter(function(val){ return val[opt.getValueArgs] === selVal[0]; }) ;
				if( filtVal[0] ){
					return true;
				}
			};
			options = this.data.valuePrefixDropdownOpt.prefixOption;
			options.forEach(function(item){
				if( checkSelectedOpt(item , criteriaValue) ){
					selectedItem = item;
					Lyte.objectUtils(this.data.valuePrefixDropdownOpt , 'add' , 'selected' ,item );
					return "";
				}
			}.bind(this));
			// return "";
		}
		if( type === 'change' ){
			if(!selectedPrefix){
				return "";
			}
			options = this.data.valuePrefixDropdownOpt.prefixOption;
			selectedItem = options.filter(function(item){
				return item.actual_value === selectedPrefix;
			})[0];
			var ele = this.data.cruxElement1;
			this.setData('cruxElement1', "");
			Lyte.objectUtils(this.data.selectedValues , 'add' , {value1 : undefined});
			// selvalues = {picklistValues : selectedItem[selectedItem.api_name]};
			// this.setData('childCompProps', JSON.stringify(selvalues));//no i18n
			// Lyte.objectUtils(field , 'add' , 'pick_list_values' , selectedOpt[selectedOpt.api_name]);
			this.setData('cruxElement1', ele);
			Lyte.objectUtils(this.data.valuePrefixDropdownOpt , 'add' , 'selected' ,selectedItem );
			// return "";
		}
		if(!options.length){
			return "";
		}
		if( type === "get"){
			var valueOpt = {api_name : "pick_list_values" ,getValueArgs : "display_value", actual_value : "value",display_value : _cruxUtils.getI18n('crm.label.value') };
			valueOpt.cxDisableExtraValue = field.cxDisableExtraValue;
			options.unshift(valueOpt);
			// options.push({api_name : "record_state" ,getValueArgs : "actual_value" ,actual_value : "record_state",display_value : "Record State" , record_state : [{actual_value : "${STATE.open}" , display_value : "Open" , type :"used"},{actual_value : "${STATE.success}" , display_value : "Success" , type :"used"}]}); 
			
			options.forEach(function(item){
				if( !item.getValueArgs ){
					item.getValueArgs = "display_value";
				}
				if( !item.cxDisableExtraValue ){
					item.cxDisableExtraValue = false;
				}
				if(field[item.api_name]){
					item[item.api_name] = field[item.api_name];
				}
				if(item.selected){
					selectedItem = item;
				}
			});
			selectedItem = selectedItem ? selectedItem : options[0];
			Lyte.objectUtils(this.data.valuePrefixDropdownOpt , "add",{prefixOption : options , selected : selectedItem});
		}
		if(selectedItem){
			Lyte.objectUtils(field , 'add' , 'cxDisableExtraValue' , selectedItem.cxDisableExtraValue);//no i18n
			this.data.picklistValues = selectedItem[selectedItem.api_name];
			var selvalues = {picklistValues : this.data.picklistValues};
			this.setData('childCompProps', JSON.stringify(selvalues));//no i18n	
		}	
	},
	observesCriteria : function(){
		this.setCriteria();
	}.observes("cxPropCriteria"),//no i18n
	setCriteria : function(){
		if( !this.data.cxPropCriteria || !this.data.rendered ){
			return;
		}
		this.preventValChangeCallback = true;
		if( typeof Crm && !this.data.cxPropIgnoreCallbackInSetCriteria){ //getting error due to prevent callback. temp fix for CRM. need to remove once vamsi handled CRM side.
			delete this.preventValChangeCallback
		}
		var field = this.getData("field") , comp2;//no i18n
		var node = this.$node, selectedValues = this.getData("selectedValues");//no i18n
		var criteria = this.getData("cxPropCriteria");//no i18n
		criteria.type = criteria.type ? criteria.type : field.field_data_type;
		if(  criteria.type == "dynamicFilter"){
			return;
		}
		
		var cruxAssetsFldType = this.cruxAssets.fieldDataTypeToCruxCompMapping;
		cruxAssetsFldType = cruxAssetsFldType? cruxAssetsFldType : {};
		if(cruxAssetsFldType[field.field_data_type]){
			criteria.type = cruxAssetsFldType[field.field_data_type] ;
		}
		var comparator = criteria.comparator,type = criteria.type ? criteria.type : this.getData("field").field_data_type,value = criteria.value;
		var _self = this , moduleRecordMapping = this.moduleRecordMapping;
	   
	    if(this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT && criteria.value && criteria.value.includes && criteria.value.includes("${BLOCKED") && criteria.comparator ==='equal'){
			$L('#DDV_'+criteria.api_name)[0].ltProp('selected','${BLOCKED}');
			let comp = $L('#option_'+criteria.api_name)[0].component;
			this.triggerGetDropDownVal(criteria.value,comp);
			this.setEmailBlockedCriteria(criteria.api_name,criteria.value);
			return;
		}
		if(criteria.api_name === 'cxFilter_Scoring_Rule' || criteria.api_name === 'cxFilter_Series'){ 
			 // var nameArr = [];
			// if(!Array.isArray(value)){
			// 	value = [value];
			// }
			// value.forEach(function(optionId){
				var isValueAvail  = false;
				value = value.id ? value.id : value;
				this.checkSubFieldOpt({field , value :value});
				_self.getData("field").pick_list_values.some(function(eachOptions){//no i18n
					if(eachOptions.actual_value + "" === value + ""){
						value = eachOptions.display_value;
						isValueAvail = true;
						return true;
					}
				})
			// });
			if( isValueAvail || criteria.api_name === 'cxFilter_Scoring_Rule' ){
				$L("#" + _self._cruxReplace(criteria.api_name, "[/.]","_") + "_crux_comp").e.component.set("cxPropValue",value);
			}
			//comparator = criteria.subfieldComp , value = criteria.subfieldValue;
		}

		var subCriteria , val = "";
		if( criteria.api_name != "cxFilter_Email_Sentiment" ){
			subCriteria = $L('#sub_field_'+criteria.subfield);//no i18n
		}
		if(typeof moduleRecordMapping != "undefined" &&  criteria.type == "crossfield"  && criteria.api_name == moduleRecordMapping.Contacts.api_name){
			if( subCriteria[0] ){
				subCriteria[0].ltProp("checked",true);//no i18n
			}
			return
		}else if((value == '${EMPTY}' || ( value == "${BLOCKED}" && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1  && !field.custom_field) ) && comparator == "not_equal"){//no i18n
			value =(value == '${EMPTY}') ?  '${NOTEMPTY}' :"${NOTBLOCKED}" //no i18n
			comparator = 'equal' //no i18n
			if(criteria.origCriteria && criteria.origCriteria.include_objects == false){
				value = '${EMPTY}';//no i18n
			}
			
			if(criteria.api_name === "cxFilter_Linked_Segment__s") {
				value = '${EMPTY}'; // NO I18N
			}

			if(criteria.api_name === "sub_option_Competitor_Name") {
				Lyte.arrayUtils($L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields,'removeAt',1,2);
			}
			
		}else if(value && value.indexOf && value!=true && value.indexOf("AGEIN") != '-1'){ //no i18n
			flag = true;
			comparator = "Age in Days"; //no i18n
			value = comparator;
			val = /\d+/i.exec(criteria.value)[0];
			comp2 = (criteria.value.indexOf('DAYS') !='-1')?"DAYS" : (criteria.value.indexOf('WEEKS') !='-1')?"WEEKS" : (criteria.value.indexOf('MONTHS') !='-1')?"MONTHS" : "YEARS"; //no i18n
		}
		else if(value && value.indexOf && value!=true && value.indexOf("DUEIN") != "-1"){
			flag = true
			comparator = "Due in Days" //no i18n
			value = comparator
			val = value = /\d+/i.exec(criteria.value)[0]
			comp2 = (criteria.value.indexOf('DAYS') !='-1')?"DAYS" : (criteria.value.indexOf('WEEKS') !='-1')?"WEEKS" : "MONTHS" //no i18n
		}else if(criteria.type === "rfm" || criteria.type === "ABM_Techniques" || criteria.type === 'ABM_Scores'){
			node = $L("#sub_option_"+criteria.subfield)[0];selectedValues = node.getData("selectedValues");//no i18n
			subCriteria[0].ltProp("checked",true);//no i18n
			type = "integer";//no i18n
		}else if(value && value.includes && value.includes("${") ){ //no i18n
			// ["${CURRENTTIME}","${TODAY}","${YESTERDAY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${THISFY}","${THISFQ}","${LASTYEAR}","${PREVFY}","${PREVFQ}","${NEXTYEAR}","${NEXTFY}","${NEXTFQ}","${LASTWEEK}","${LASTMONTH}","${TODAYANDOVERDUE}","${OPEN}","${CLOSEDWON}","${CLOSEDLOST}"].indexOf(value) != -1
			// comparator = value;
			// value = "";
			let condObject =  this.checkIsValidComparator(value , comparator);
			if( Object.keys(condObject).length ){
				comp2 = condObject.secondDropDownOpt || comp2; 
				comparator = condObject.system || value;
				val = value = condObject.value || "";
			}
		} 
		if( (criteria.type == "crossfield" || criteria.api_name == "cxFilter_Email_Sentiment") && criteria.api_name !="cxFilter_Campaigns" && criteria.api_name !== 'cxFilter_Scoring_Rule' && criteria.api_name !== 'cxFilter_Series'){
			if(criteria.api_name == "cxFilter_Email_Sentiment"){
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.status);//no i18n
				//$L("#by_"+criteria.api_name)[0].ltProp('selected',criteria.status)
				node.component.showHideEmailStatus(criteria.status,criteria)
				var suboption
				if(criteria.subfield == "Last_Email_Sentiment"){
					suboption = $L("#sub_field_For_The_Last_Email")[0].ltProp('checked',true);//no i18n
				}else{
					var val1 = ( /.*?{(.*)}.*?/.exec(criteria.subfield) ) ?  /.*?{(.*)}.*?/.exec(criteria.subfield)[1].split('|') : [];//no i18n
					if(val1[1] && val1[1] != 0){
						val1[0] = val1[0].toLowerCase();
						var suboption = $L("#sub_field_"+val1[0])[0];
						suboption.ltProp('checked',true) //no i18n
						selectedValues = $L("#sub_option_"+val1[0])[0].component.data.selectedValues;
						Lyte.objectUtils(selectedValues ,"add",{"firstDropDownValue" : criteria.subfieldComp, value1 : val1[1]});//no i18n
						// $L("#DDV_"+val1[0])[0].ltProp('selected',criteria.subfieldComp)
						// $L("#"+val1[0]+"_crux_comp")[0].component.set('cxPropValue',val1[1])
					}
				}
				selectedValues = this.data.selectedValues;
				criteria.subfield = criteria.api_name;suboption = node
			}else{
				var suboption = $L('#sub_option_'+criteria.subfield)[0]
				if(suboption){
					suboption.component.hideSubfieldOption() //no i18n
					selectedValues = suboption.component.data.selectedValues;
				}
				subCriteria[0].ltProp('checked',true) //no i18n
				//suboption.component.render()
				if(criteria.api_name == "cxFilter_Contacts" || criteria.subfield == "Without_Open_Activity" ||criteria.subfield == "Without_Any_Deal" || criteria.subfield == "Locked_False" || criteria.subfield == "Locked_True"){
					return
				}
				//suboption.component.setDropDownValuesFun(true)
			}
			//$L('#DDV_'+criteria.subfield)[0].ltProp('selected',comparator)
			if(value && value.indexOf("${") != -1 && ( comparator == "equal" || comparator == "not_equal")){
				comparator = value;
			}
			if(comparator === "between" || comparator === "not_between"){
				value[0] =  /^(.*)T/.exec(value[0]) && /^(.*)T/.exec(value[0])[1]  ? /^(.*)T/.exec(value[0])[1] : value[0];
				value[1] = /^(.*)T/.exec(value[1]) && /^(.*)T/.exec(value[1])[1]  ? /^(.*)T/.exec(value[1])[1] : value[1];
				if(value[0] == value[1]){
					comparator = "equal";//no i18n
					value = value[0];
				}
			}
			if(value && value.includes && value.includes("${") ){ //no i18n
				let condObject =  suboption.component.getConditionOpt(value);
				if( Object.keys(condObject).length ){
					comp2 = condObject.secondDropDownOpt || comp2; 
					comparator = condObject.system || value;
					val = value = condObject.value || "";
				}
			}

			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			suboption.component.getValue(comparator)
			 var input_node = $L('#'+criteria.subfield+'_crux_comp')[0]
			// var second_DD = $L('#second_'+criteria.subfield+'_dropdown')[0]
			if(comparator === "between" || comparator === "not_between"){
				Lyte.objectUtils(selectedValues ,"add",{value1 : value[0],value2 : value[1]});
				 //input_node.component.set('cxPropValue', /^(.*)T/.exec(value[0])[1])
				// $L('#between_'+criteria.subfield+'_crux_comp')[0].component.set('cxPropValue',/^(.*)T/.exec(value[1])[1])
			}else if(comp2 && criteria.api_name != "cxFilter_Deals"){ //no i18n
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				// input_node.component.set('cxPropValue',val) //no i18n
				// second_DD.ltProp('selected',comp2) //no i18n
			}else if(criteria.api_name == "cxFilter_Deals" && flag){ //no i18n
				Lyte.objectUtils(selectedValues ,"add",{secondDropDownValue : criteria.value});//no i18n
				//second_DD.ltProp('selected',criteria.value) //no i18n
			}else if(input_node){
				Lyte.objectUtils(selectedValues ,"add",{value1 : value});//no i18n
				//input_node.component.set('cxPropValue',/^(.*)T/.exec(criteria.value)[1]) //no i18n
			}

		}
		else if(criteria.type == "custom"){
			if(criteria.api_name =="cxFilter_RecordAction" || criteria.api_name =="cxFilter_RelatedRecordsAction"){
				Lyte.objectUtils(selectedValues ,"add","headDropDownValue" , criteria.isModified);//no i18n
				//$L('#record_'+criteria.api_name)[0].ltProp('selected',criteria.isModified)
			}
			if( this.$node._callee.component.specialDateObject &&  this.$node._callee.component.specialDateObject[criteria.api_name] && val){//no i18n
				comparator = "${AGEINDAYS}+"+val;//no i18n
				val="";
				delete this.$node._callee.component.specialDateObject[criteria.api_name];
			}
			if(criteria.api_name == "cxFilter_Email_Status"){
				comparator = ( ["not_opened","not_sent","not_received"].indexOf(criteria.status) !=-1 && comparator != "Age in Days" && comparator != "Due in Days" ) ? this.negative_Comparator(comparator) : comparator;//no i18n
				if(criteria.status == "sent" && subCriteria && subCriteria[0]){					
					subCriteria[0].ltProp('checked',true);
				}
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.status);//no i18n
				// $L('#by_'+criteria.api_name)[0].ltProp('selected',criteria.status)
				node.component.showHideEmailStatus(criteria.status,criteria)
			}else{
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.comparator);//no i18n
				// $L('#by_'+criteria.api_name)[0].ltProp('selected',criteria.comparator)
			}
			if(comparator == "between"){
				value[0] = ( /^(.*)T/.exec(value[0])[1] ) ? /^(.*)T/.exec(value[0])[1] : value[0];
				value[1] = ( /^(.*)T/.exec(value[1])[1] ) ? /^(.*)T/.exec(value[1])[1] : value[1];
				if(value[0] == value[1]){
					comparator = "equal";//no i18n
					value = value[0];
				}
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			// compNode = $L('#DDV_'+criteria.api_name)
			// compNode[0].ltProp('selected',comparator)
			node.component.getValue(comparator);//no i18n
			//var crux_node = $L('#'+criteria.api_name+'_crux_comp')[0]
			if(comp2){
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				// crux_node.component.set('cxPropValue',val) //no i18n
				// $L('#second_'+criteria.api_name+'_dropdown')[0].ltProp('selected',comp2)
			}else{
				var temp = value
				if(comparator == "between"){
					temp = value[0]
					Lyte.objectUtils(selectedValues ,"add","value2" , value[1]);//no i18n
					// $L("#between_"+criteria.api_name+"_crux_comp")[0].component.set('cxPropValue',value[1])
				}
				Lyte.objectUtils(selectedValues ,"add","value1" , temp);//no i18n
				// crux_node.component.set('cxPropValue',temp) //no i18n
			}
		}
		else if((field.api_name === "Competitor_Name" && (value === '${EMPTY}' || value === '${NOTEMPTY}')) || field.api_name !== "Prediction" && field.api_name !== "Similarity" && comparator === "equal" &&  (value === "${EMPTY}" || value === "${NOTEMPTY}" || (["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) !== -1 && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field)) ) {
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',value) //no i18n
			if(["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field){
				this.$node._callee.setData("cxPropBlockedReason",true);//no i18n
			}
			if(criteria.subfield && ["Calls","Tasks","Events"].indexOf(criteria.subfield) != -1){
				$L("#sub_field_"+criteria.subfield+"_Tag")[0].ltProp("checked",true);//no i18n
				node = $L("#sub_option_"+criteria.subfield+"_Tag")[0];//no i18n
				selectedValues = node.getData("selectedValues");//no i18n
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , value);//no i18n
			node.component.getValue(value,undefined,false)
		}else if((comparator  == "between" || comparator == "not_between") && type !== "similarity"){ //no i18n
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			// node.component.getValue(comparator)
			if(type == "datetime"){
				value[0] = /^(.*)T/.exec(value[0])[1]
				value[1] = /^(.*)T/.exec(value[1])[1]
			}
			if(comparator  == "between" && value[0] == value[1]){
				comparator = "equal";//no i18n
				value[1] = "";
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			node.component.getValue(comparator);
			Lyte.objectUtils(selectedValues ,"add",{value1 : value[0],value2 : value[1]});//no i18n
			// $L('#'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value[0])
			//$L('#between_'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value[1])
		}else if(criteria.api_name === "Layout" ||  ["number","textarea" , "multiselectpicklist" ,"text" , "phone", "layout" , "email" , "mobile" , "website" , "picklist" , "integer" , "longinteger" , "double" , "bigint" , "currency" , "num" , "boolean" , "tag" , "autonumber" , "decimal"].includes(type) || (type == "lookup" && !this.data.isChildFieldLookup)){ //no i18n
			if(value.constructor === Array && ["autonumber","textarea","text","phone","email","mobile","website","lookup","multiselectpicklist"].indexOf(type) !== -1 && value[0].constructor === String){
				value = value.join(",")
			} 
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			if(criteria.subfield && ["Calls","Tasks","Events"].indexOf(criteria.subfield) != -1){
				$L("#sub_field_"+criteria.subfield+"_Tag")[0].ltProp("checked",true);//no i18n
				node = $L("#sub_option_"+criteria.subfield+"_Tag")[0];//no i18n
				selectedValues = node.getData("selectedValues");//no i18n
			}
			if( field.ui_type == 132 ){
				var module = field.multi_module_lookup.modules.filter( function( item ){ return item.api_name == criteria.multi_module_lookup } )[0]
				Lyte.objectUtils(selectedValues ,"add", "secondDropDownValue", module.id);//no i18n
			}
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true);//no i18n
			if(type == "layout"){
				// value = ( typeof(value) == "string") ? value.split() : value;//no i18n
				// for(var i =0 ; i<value.length;i++){
				// 	value[i] = {id : value[i], name : store.peekRecord("layout", value[i]).name}
				// }
				value = {layouts : value}
			}
			if(type == "tag" && value.constructor == Object){
				value = [value];
			}
			if(type === "picklist" && value){
				value = (value && typeof(value) == "string") ? value.split(",") : value //no i18n
				this.checkValuePrefixDD('set', undefined, undefined ,value );
				let act_value = this.getDisplayValue( value , field , 'display_value' , this.data.picklistValues ? this.data.picklistValues : [] , 'display_value' );
				if( this.data.field.cxGetActualValue || !act_value.length){
					act_value = this.getDisplayValue( value , field , 'display_value' , this.data.picklistValues ? this.data.picklistValues : [] , "actual_value" );
				}
				value = act_value.length ? act_value : value;
				if(criteria.api_name == "Activity_Type" && this.data.module == "Activities"){
					var k , tempLen = value.length , tempVal = [];

					for(var k = 0 ; k < tempLen ; k++){
						function a(key){return moduleApiMapping[key] === value[k]} //eslint-disable-line no-loop-func
						tempVal.push(moduleRecordMapping[Object.keys(moduleApiMapping).find(a)].plural_label);//no i18n
					}
					value = tempVal;
				}
				else if(criteria.api_name === "Competitor_Sentiment"){
					value = value[0];
				}
				else if(field.api_name === "cxFilter_UnallocatedRecords")
				{
					_self.getData("field").pick_list_values.some(function(eachOptions){//no i18n
					if(eachOptions.actual_value + "" === value[0] + ""){
						value = eachOptions.display_value;
						return true;
					}
				})
				}
			}
			// if( this.cruxAssetsCompMapping[field.ui_type] ){
			// 	let dyComp  = this.$node.querySelector('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp');
			// 	dyComp.setValue(value);
			// }else{
				Lyte.objectUtils(selectedValues ,"add",{value1 :value });//no i18n
			// }
			
			// if(type == "picklist" && $L("crux-smart-filter")[0].component.picklist_trackingObj ){ //no i18n
			// 	var smartFilterNode = $L("crux-smart-filter")[0];//no i18n
			// 	var node = $L("#"+criteria.api_name+"_picklist_tracker")[0],Obj = smartFilterNode.component.picklist_trackingObj;
			// 	if(node){
			// 		node.ltProp("disabled",false) //no i18n
			// 		node.ltProp('checked',true) //no i18n
			// 		$L("#DDV1_"+criteria.api_name+"_picklistTracker")[0].ltProp('selected',Obj.comparator);//no i18n
			// 		$L("#"+criteria.api_name+"_historyTrackDurationDays")[0].set('cxPropValue',/\d+/i.exec(Obj.value)[0]);//no i18n

			// 	}
			// 	smartFilterNode.component.picklist_trackingObj = undefined;
			// }else
			var tNode = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];
			if(tNode){

				if(value && value.length > 10){
					tNode.ltProp("disabled",true) //no i18n
					tNode.setAttribute("lt-prop-title" , _cruxUtils.getI18n("crm.smartfilter.picklist.options.msg"));//no i18n
				}else{
					tNode.ltProp("disabled",false) //no i18n
				}
			}
			//$L('#'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value)
		}else if ( field.ui_type === 53 && field.cxGetValueInMS !== false) {
			if(node._callee.component.pf_timeToReach_value){
				var convertedValue = this.getDurationfromMilliSeconds(parseInt(value),node._callee.component.pf_timeToReach_value.secondDropDownValue);
				Lyte.objectUtils(selectedValues ,"add",{firstDropDownValue : comparator, secondDropDownValue : node._callee.component.pf_timeToReach_value.secondDropDownValue , value1 : convertedValue});		//NO I18N
				node._callee.component.pf_timeToReach_value = undefined;
				// this.methods.getDropDownVal("",selectedValues.firstDropDownValue,"","",this);//no i18n
			}
			else {
				var valueObj = this.getDurationfromMilliSeconds(parseInt(value));
				Lyte.objectUtils(selectedValues ,"add",{firstDropDownValue : comparator, secondDropDownValue : valueObj.durationType , value1 : valueObj.value});		//NO I18N
			}
		}else if( ["date" , "datetime" , "date_time"].includes(type)){//no i18n
			if( field.ui_type === 53 ){
				comparator = criteria.comparator;
			}
			// let condObj = {};
			// if( value.includes('${') ){
			// 	condObj = this.getConditionOpt(value);
			// 	comp2 = condObj.secondDropDownOpt;
			// 	comparator = condObj.system;
			// 	val = condObj.value;
			// 	flag = true;
			// }
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true);
			var input_node = $L('#'+this._cruxReplace(criteria.api_name, "[/.]","_")+'_crux_comp')[0]
			if(comp2){
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				//input_node.set('cxPropValue',val) //no i18n
				// $L('#second_'+criteria.api_name+'_dropdown')[0].ltProp('selected',comp2)
			}else if(input_node){
				if(type == "datetime"){
					value = /^(.*)T/.exec(value)[1]
				}
				Lyte.objectUtils(selectedValues ,"add",{value1 :value })//no i18n
				//input_node.set('cxPropValue',value) //no i18n
			}
		}else if(type == "ownerlookup" || type == "userlookup" || type == "multiuserlookup" ) { //no i18n
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true)
			if(comparator.indexOf('_role') > -1 || comparator.indexOf('_group') > -1 ){ //Role Group Components cxPropValue is of different pattern
				value = Array.isArray(value) ? value : [value];
				Lyte.objectUtils(selectedValues ,"add","value1" , value  )//no i18n
			}else{
				Lyte.objectUtils(selectedValues ,"add","value1" ,{users : value } )//no i18n
			}
		} else if(type === "multirelation" || criteria.api_name === "cxFilter_Linked_Segment__s") {
			var i,
				node = $L("#option_" + this._cruxReplace(criteria.api_name, "[/.]","_"))[0].component; /* eslint-disable-line no-multipleDOMLookup */ //NO I18N
				res = criteria.value,
				selected = [];
			
			node.setData('lookupDisplayField', 'Segment_Name__s'); // NO I18N
			
			res.forEach((data) => {
				selected.push(data.id);
			});
			
			node.setData('renderItems', res); // NO I18N
			Lyte.objectUtils(selectedValues, "add", "multiSelectFieldValue", JSON.stringify(selected)); // NO I18N
			this.setServiceStatus(this.data.selectedValues.firstDropDownValue, this);
		}else if(type == "multiselectlookup" || criteria.api_name == "cxFilter_Campaigns" || this.data.isChildFieldLookup){ //no i18n
			if( criteria.field && criteria.field.ui_type == 445  ){
				var res = {ids : value.join(',')}
				$L('#'+this._cruxReplace(criteria.field.api_name, "[/.]","_")+'_crux_comp')[0].component.set('cxPropValue',res);//no i18n

			}else{
				var ids = value.toString(),url,flag= true;
				var display_field =  this.getData("moduleDisplayField");//no i18n
				//crmConstants.moduleDisplayField;
				if(criteria.api_name != "cxFilter_Campaigns"){
					compNode = $L('#DDV_'+this._cruxReplace(criteria.api_name, "[/.]","_"))[0]
					if(compNode){
						compNode.ltProp('selected',comparator) //no i18n
						node.component.getValue(comparator,undefined,true);
					}
					flag = (comparator == "${EMPTY}")? false : true //no i18n
				}else{
					if(node._callee.component.campaigns_sel_value){
						Lyte.objectUtils(selectedValues ,"add",{ firstDropDownValue : node._callee.component.campaigns_sel_value.firstDropDownValue , headDropDownValue : node._callee.component.campaigns_sel_value.headDropDownValue });//no i18n
						node._callee.component.campaigns_sel_value = undefined;
						this.methods.getDropDownVal("",selectedValues.firstDropDownValue,"","",this);//no i18n
					}
				}
				if(flag){
					// url = "/crm/v2.1/"+ ( (criteria.api_name == "Campaigns")? "Campaigns" : criteria.field.multiselectlookup.connected_module.api_name )+"?ids="+ids //no i18n
					// Lyte.resolvePromises({
				        // "result" : this.sendxhr(url, "GET") //No I18n
					 // }).then(function(res){
						 var res = criteria.value.constructor == Array ? criteria.value : [criteria.value],len = res.length,i=0 , selected = []
						 var node = $L("#option_"+this._cruxReplace(criteria.api_name, "[/.]","_"))[0] ? $L("#option_"+this._cruxReplace(criteria.api_name, "[/.]","_"))[0].component : this;//no i18n
						//eslint-disable-next-line @zoho/zstandard/no-reserved-words
						 var label = "Name"; //NO I18n
						 if(this.data.isChildFieldLookup) {
                             label = (display_field[this.idModuleMapping[this.data.field.lookup.module.id]]) ? (display_field[this.idModuleMapping[this.data.field.lookup.module.id]])[0] : "Name"; //NO I18n
						 } else {
							 label = (criteria.api_name == "cxFilter_Campaigns")?"Campaign_Name" : (display_field[this.idModuleMapping[criteria.field.multiselectlookup.connected_module.id]] ) ? display_field[this.idModuleMapping[criteria.field.multiselectlookup.connected_module.id]][0] : "Name"; //no i18n
						 }
						 node.setData('lookupDisplayField', label) //no i18n
						 if(this.data.supportRelatedModules && criteria.api_name === "cxFilter_Campaigns" || (this.data.isChildFieldLookup && !(res[0].name || res[0][label]))){
                             var moduleApiName = criteria.api_name === "cxFilter_Campaigns" ? "Campaigns" : this.data.field.lookup.module.api_name;
							 var fieldApiName = this.data.field.api_name;
							 var url = "/crm/v2/" + moduleApiName + "/search?"
							 var idslength = res.length;
							 var searchCriteria = "";
							 for(var i=0;i<idslength;i++){
								searchCriteria+="(Id:equals:"+res[i].id+")";
								if(i<idslength-1){
									searchCriteria+="or";
								}
							 }
							 url = url + "criteria=" + encodeURIComponent(searchCriteria);
							 this.sendxhr(url, "GET").then(function(result) {
								if (result.response != "") {
									result = JSON.parse(result.response).data;
									if (result.length != 0) {
										var _len = result.length;
										var renderObjects = [];
										for(var i=0;i<_len;i++){
											var Obj = result[i];
                                            renderObjects.push({id:Obj.id,name:Obj[label], [label] :Obj[label] })
										}
										node.setData('renderItems',renderObjects) //no i18n
							            Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(res));//no i18n
									}
								}
							 },function(errRes) {
					             //need to handle error
							});
						 } else {
							for( ; i < len ; i++){
								res[i][label] = res[i][label] ? res[i][label] : res[i].name;
								selected.push(res[i].id)//no i18n
							}
							node.setData('renderItems',res) //no i18n
							Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(selected));//no i18n
						 }
						 //$L("#multiSelect_lookup_"+criteria.api_name)[0].ltProp('selected',selected)
						 node.setData('memberStatus',true) //no i18n
						 if(criteria.Member_Status && criteria.api_name === "cxFilter_Campaigns"){
						 	criteria.Member_Status = typeof criteria.Member_Status === "string" ? [ criteria.Member_Status ] : criteria.Member_Status;//no i18n
							Lyte.objectUtils(selectedValues ,"add",{value2 :criteria.Member_Status });//no i18n
							 // $L("#memberStatusField")[0].component.set('cxPropValue',criteria.Member_Status)
						 }
						 if(field.api_name === "cxFilter_Campaigns" ){
							this.setServiceStatus(this.data.selectedValues.firstDropDownValue , this);
						 }
						  if(criteria.Service_Status && criteria.api_name === "cxFilter_Campaigns"){
							criteria.Service_Status = typeof criteria.Service_Status === "string" ? [ criteria.Service_Status ] : criteria.Service_Status;//no i18n
							Lyte.objectUtils(selectedValues ,"add",{Service_Status :criteria.Service_Status });//no i18n
							// Lyte.objectUtils(this.data.field ,"add",{serviceStatus :criteria.Service_Status });//no i18n
							// $L("#memberStatusField")[0].component.set('cxPropValue',criteria.Member_Status)
						 }
					 // })
				}
			}

		}
		else if(field.api_name === "Prediction" || criteria.type === "Prediction"){  //No I18n
			var module = moduleRecordMapping[node.getData('module')];  //No I18n
			var childNode1 = $L("#sub_option_Prediction_0")[0],childNode2 = $L("#sub_option_Prediction_1")[0],childNode3 = $L("#sub_option_completed_prediction")[0];//No I18n
			var childRadio1 = $L("#sub_field_Prediction_0")[0],childRadio2 = $L("#sub_field_Prediction_1")[0],childRadio3 = $L("#sub_field_completed_prediction")[0];//No I18n
			var data = module.prediction_details;
			var len = node.getData('configLength');//No I18n
			for(var i = 0;i < len + 1; i++){
				if(len === 2 && i === 2 || len === 1 && i === 1){
					if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY") || criteria.criteria.field.api_name.toUpperCase().endsWith("ISEND") && !criteria.criteria.from){
						if(node.getData('isSuccess') === "undefined"){  //No I18n
							childRadio3.ltProp("checked",true);  //No I18n
						}
						if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY")){	//No I18n
							var sfSubField
							if(criteria.criteria.comparator === "greater_than"){	//No I18n
							 	sfSubField = $L("#sub_field_" + node.getData('successFailureOption')[0].system)[0];//No I18n
							}
							else if(criteria.criteria.comparator === "less_equal"){//No I18n
								 sfSubField = $L("#sub_field_" + node.getData('successFailureOption')[1].system)[0];//No I18n
							}
							sfSubField.ltProp("checked",true);//No I18n
						}
						var accuracyFieldId = module.prediction_details[0].insights_details.accuracy_field.id;
						var isEndFieldId = module.prediction_details[0].insights_details.isEnded_field.id ;
						if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY")){
							childNode3.setData('sfAccuracyCount',this.getData('sfAccuracyCount') + 1); //No I18n
							this.setData('sfAccuracyCount',this.getData('sfAccuracyCount') + 1); //No I18n
						}
						else{
							childNode3.setData('sfEndCount',this.getData('sfEndCount') + 1); //No I18n
							this.setData('sfEndCount',this.getData('sfEndCount') + 1);//No I18n
						}
						var selectedOption = node.getData("sfAccuracyCount") > 1 && node.getData("sfEndCount") > 1 ? "both" : accuracyFieldId === criteria.criteria.field.id || isEndFieldId === criteria.criteria.field.id ? module.prediction_details[0].id : (module.prediction_details[1].insights_details.accuracy_field.id === criteria.criteria.field.id ||  module.prediction_details[1].insights_details.isEnded_field.id === criteria.criteria.field.id) && len === 2 ? module.prediction_details[1].id : undefined;
						this.setData("selectedOptionSf",selectedOption);//No I18n
						childNode3.setData("selectedOptionSf",selectedOption);//No i18n
						break;
					}
				}
				else{
					var subNode = i === 0 ? childNode1 : childNode2;
					var subField = i === 0 ? childRadio1 : childRadio2;
					if(criteria.criteria.field.api_name === data[i].insights_details.trend_field.api_name){
						subField.ltProp("checked",true);//No I18n
						var trendValue = criteria.criteria.value === "-1" ? "trend_down" : criteria.criteria.value === "1" ? "trend_up" : "no_trend" ;//No I18n
						if(subNode.getData("isTrendShown")){
							subNode.setData("isTrendSelected",true);//No I18n
							this.$node.setData("isTrendSelected",true);//No I18n
						}
						this.setData("selectedTrend",trendValue);//No I18n
						subNode.setData("selectedTrend",trendValue);//No I18n
						break;
					}
					else if(criteria.criteria.field.api_name.toUpperCase().endsWith('PREDICTION') && data[i].prediction_field.api_name === criteria.criteria.field.api_name){
						var predictionCri = this.getData("predictionCriteria");//No I18n
						var cri = criteria.criteria;
						if(!subField.ltProp("checked")){
							subField.ltProp("checked",true);//No I18n
						}
						if(cri.value[0] && cri.value[0].startsWith("$")){
							if(cri.value.startsWith("${AGEIN") || cri.value.startsWith("${DUEIN")){
								predictionCri.comparator = cri.value.startsWith("${AGEIN") ? "Age in Days" : "Due in Days";//No I18n
								var secondDropDownValue = cri.value.startsWith("${AGEINDAYS}") || cri.value.startsWith("${DUEINDAYS}") ? "DAYS" : cri.value.startsWith("${AGEINWEEKS}") || cri.value.startsWith("${DUEINWEEKS}") ? "WEEKS" : "MONTHS";//No I18n
								var numberInput = cri.value.match(/(\d+)/)[0];
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","dateVal",numberInput);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","secondDropDownValue",secondDropDownValue);//No I18n
								subNode.setData("showSecondDropdownType", "date");//No I18n
							}
							else{
								predictionCri.comparator = cri.value;
								subNode.setData('criteriaDisplay',false); //No I18n
								this.setData("criteriaDisplay",false);//No I18n
							}
						}
						else{
							predictionCri.comparator = cri.comparator;
							subNode.setData('criteriaDisplay',true); //No I18n
							this.setData("criteriaDisplay",true);//No I18n
						}
						Lyte.objectUtils(this.getData("selectedValues"),"add","firstDropDownValue",predictionCri.comparator),Lyte.objectUtils(subNode.getData("selectedValues"),"add","firstDropDownValue",predictionCri.comparator);//No I18n
						if(predictionCri.comparator === "between" || predictionCri.comparator === "not_between"){
							if(subNode.getData("predictionEle") === "date" || node.getData("predictionEle") === "date"){
								predictionCri.value = [];
								predictionCri.value[0] = /^(.*)T/.exec(cri.value[0]) ? /^(.*)T/.exec(cri.value[0])[1] : cri.value[0];
								predictionCri.value[1] = /^(.*)T/.exec(cri.value[1]) ? /^(.*)T/.exec(cri.value[1])[1] : cri.value[1];
								Lyte.objectUtils(subNode.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
								subNode.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
							}
							subNode.setData('isCriteriaBetween',true); //No I18n
							this.setData("isCriteriaBetween",true);//No I18n
						}
						else{
							if(subNode.getData("predictionEle") === "date"){
								if(predictionCri.comparator === "equal" || predictionCri.comparator === "less_than" || predictionCri.comparator === "greater_than"){
									subNode.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
								}else if(predictionCri.comparator === "${LASTMONTH}" || predictionCri.comparator === "${LASTWEEK}" || predictionCri.comparator === "${THISWEEK}" || predictionCri.comparator === "${THISYEAR}" || predictionCri.comparator === "${THISMONTH}" || predictionCri.comparator === "${TODAY}" || predictionCri.comparator === "${YESTERDAY}" || predictionCri.comparator === "${EMPTY}" || predictionCri.comparator === "${NOTEMPTY}"){//No I18n
									subNode.setData({"showSecondDropdownType": "", "predictionEle" : ""});//No I18n
								}
							}
							if(predictionCri.comparator === "${EMPTY}" && !data[i].score_field){
								subNode.setData("isTrendShown",false);//No i18n
								this.$node.setData("isTrendShown",false);//No i18n
							}
							subNode.setData('isCriteriaBetween',false); //No I18n
							this.setData("isCriteriaBetween",false);//No I18n
						}
						if(this.getData("criteriaDisplay")){
							predictionCri.value = cri.value;
							if(subNode.getData("isCriteriaBetween")){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue0",predictionCri.value[0]);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue1",predictionCri.value[1]);//No I18n
							}
							else if(predictionCri.value.toString().indexOf("$") < 0 ){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue",predictionCri.value);//No I18n
							}
						}
					}
					if(criteria.criteria.field.api_name.toUpperCase().endsWith('PREDICTION_SCORE') || criteria.criteria1 && (data[i].score_field && (data[i].score_field.api_name === criteria.criteria.field.api_name || data[i].score_field.api_name === criteria.criteria1.field.api_name))){
						this.setData("isScoreSelected",true),subNode.setData("isScoreSelected",true);//No i18n
						var scoreCri = this.getData("scoreCriteria");//No I18n
						var cri = criteria.criteria1 === undefined ? criteria.criteria : criteria.criteria1;
						if(cri.value[0].startsWith("$")){
							scoreCri.comparator = cri.value;data[i].score_field
							subNode.setData("scoreCriteriaDisplay",false);//No I18n
							this.setData("scoreCriteriaDisplay",false);//No I18n
						}
						else{
							scoreCri.comparator = cri.comparator;
							subNode.setData("scoreCriteriaDisplay",true);//No I18n
							this.setData("scoreCriteriaDisplay",true);//No I18n
						}
						Lyte.objectUtils(this.getData("selectedValues"),"add","scoreComparator",scoreCri.comparator),Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreComparator",scoreCri.comparator);//No I18n
						if(cri.comparator === "between" || cri.comparator === "not_between"){
							subNode.setData("isScoreBetween",true);//No I18n
							this.setData("isScoreBetween",true);//No I18n
						}
						else{
							subNode.setData("isScoreBetween",false);//No I18n
							this.setData("isScoreBetween",false);//No I18n
						}
						if(subNode.getData("scoreCriteriaDisplay")){
							scoreCri.value = cri.value;
							if(subNode.getData("isScoreBetween")){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue0",scoreCri.value[0]);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue1",scoreCri.value[1]);//No I18n
							}
							else{
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue",scoreCri.value);//No I18n
							}
						}
						break;
					}
				}
			}
		}
		else if(field.api_name === "best_time"){
			var $bestTimeAvl = $L('#by_best_time')[0];
			if (criteria.value === "-1"){
				$bestTimeAvl.component.setData('ltPropSelected', '${TODAY}');
			} else {
				$bestTimeAvl.component.setData('ltPropSelected', '${TOMORROW}');
			}			
		}
		else if(field.api_name === "next_best_experience"){
			if(criteria.comparator === "Available"){
				var $sub_field_Available = $L('#sub_field_NBX_Available')[0];
				$sub_field_Available.setData("ltPropChecked",true);  //No I18n
				if(!this.data.userDetails.NBX_GOAL){
					var $sub_field_nbx_available = $L('#sub_option_NBX_Available')[0]
					var $picklistComp = $L('#NBX_ACTIVITY_OPTION')[0];
					var sysVsDisplay = {"Calls" : _cruxUtils.getI18n('Call'), "Emails" : _cruxUtils.getI18n('crm.field.label.email') , "Events" : _cruxUtils.getI18n('Meeting')}; //no i18n
							var disNames = [];
							var singleValueFromSave = typeof criteria.val1 === "string";
							if(singleValueFromSave){
								disNames.push(sysVsDisplay[criteria.val1]);
							}
							else{
								var valueLen = criteria.val1.length;
								for(var ind = 0 ; ind < valueLen ; ind++){
									disNames.push(sysVsDisplay[criteria.val1[ind]]);
								}	
							}
					$picklistComp.component.set('cxPropValue',disNames);
					Lyte.objectUtils($sub_field_nbx_available.getData('selectedValues') ,"add","firstDropDownValue" , criteria.val2 );//no i18n
				}
			}
			else{ 
				var $sub_field_NotAvailable = $('#sub_field_NBX_NotAvailable')[0];
				$sub_field_NotAvailable.setData("ltPropChecked",true); //No I18n
			}
		}
		else if(field.api_name  === 'Similarity'){
			if(criteria.comparator === 'NotAvailable') {
				var $sub_field_NotAvailable = $('#sub_field_SimilarityNotAvailable')[0];
				$sub_field_NotAvailable.setData("ltPropChecked",true); //No I18n
			} else {
				var $sub_field_Available = $('#sub_field_SimilarityAvailable')[0];
				$sub_field_Available.setData("ltPropChecked",true);  //No I18n
				if(criteria.field === 'Score') {
					var $sub_field_Score = $('#sub_field_SimilarityScore')[0];
					$sub_field_Score.setData("ltPropChecked",true); //No I18n
					var scoreDiv = $('#sub_option_SimilarityScore')[0];
					var scoreComponent = scoreDiv.component;
					if(criteria.value === "${NOTEMPTY}" || criteria.value === "${EMPTY}") {
						scoreComponent.setData("selectedValues.firstDropDownValue", criteria.value);
						scoreComponent.setData({cruxElement1 : ""});
					} else {
						scoreComponent.setData("selectedValues.firstDropDownValue", criteria.comparator);
						var splCases = ["between", "not_between"];
						if (splCases.contains(criteria.comparator)) {
							scoreComponent.getValue(criteria.comparator, true, true);
							var inputDiv = $('#SimilarityScore_crux_comp')[0];
							var inputComponent = inputDiv.component;
							inputComponent.setData("cxPropValue", criteria.value[0]);
							var betweenDiv = $('#between_SimilarityScore_crux_comp')[0];
							var betweenComponent = betweenDiv.component;
							betweenComponent.setData("cxPropValue", criteria.value[1]);
						} else {
							var inputDiv = $('#SimilarityScore_crux_comp')[0];
							var inputComponent = inputDiv.component;
							inputComponent.setData("cxPropValue", criteria.value);
						}
					}
				} else if(criteria.field === 'Records') {
					var $sub_field_Records = $('#sub_field_SimilarityRecords')[0];
					$sub_field_Records.setData("ltPropChecked",true); //No I18n
					var recordsDiv = $('#sub_option_SimilarityRecords')[0];
					var recordsComponent = recordsDiv.component;

					var res = criteria.value, len = res.length, i = 0, selected = [];
					var module = moduleRecordMapping[node.getData('module')];
					var moduleLabel = module.display_field.api_name;
					recordsComponent.setData('lookupDisplayField', moduleLabel) //no i18n

					for( ; i < len ; i++){
						res[i][moduleLabel] = res[i].name;
						selected.push(res[i].id)//no i18n
					}
					recordsComponent.setData('renderItems',res) //no i18n
					var selectedValues = recordsComponent.getData("selectedValues");
					Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(selected));//no i18n

				}
			}
		}
		else if(field.api_name === "Recommendation"){

			var module = moduleRecordMapping[node.getData('module')];
			var url;


			Lyte.objectUtils(selectedValues ,"add","headDropDownValue" ,criteria.comparator === 'all' ? 'all' : 'selected' );//no i18n

			var recommendationBasedOn = node.getData('recommendationBasedOn'); //no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","first_buy" , recommendationBasedOn.first_buy || criteria.field === 'FirstTime');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","cross_selling" ,recommendationBasedOn.cross_selling || criteria.field === 'Dependent');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","bundle" ,recommendationBasedOn.bundle || criteria.field === 'Bundle');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","re_buy" ,recommendationBasedOn.re_buy || criteria.field === 'Repeat');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","next_buy" ,recommendationBasedOn.next_buy || criteria.field === 'Sequence');//no i18n


			if( criteria.comparator === "selected"){

				// var ids = criteria.value;
				// url = "/crm/v2.1/"+module.recommendationsDetailsJson.what_to.api_name+"?ids="+ids //no i18n

				// Lyte.resolvePromises({
				// 	"result" : this.sendxhr(url, "GET") //No I18n
				// }).then(function(res){
					var res = criteria.value,len = res.length,i=0 , selected = [];
					var label = module.recommendationsDetailsJson.what_to.display_field;
					node.setData('lookupDisplayField', label) //no i18n

					for( ; i < len ; i++){
						res[i][label] = res[i].name;
						selected.push(res[i].id)//no i18n
					}
					node.setData('renderItems2',res) //no i18n
					Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue1" ,JSON.stringify(selected));//no i18n


				// })
			}

			if(criteria.field === "Repeat" ){
				var dateVal = criteria.value1;
				if(dateVal){
					var reBuyOption = node.getData("options"); //no i18n
					if(reBuyOption.filter(function(e){ return e.system === dateVal }).length !== 0) {
						Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,dateVal);//no i18n
					}else{
						Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,"CUSTOM");//no i18n
						Lyte.objectUtils(selectedValues ,"add","headDateValue" ,dateVal[0]);//no i18n
					}
				}else{
					Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,"all");//no i18n
				}

			}




		}
		if( criteria.subfield && criteria.subfieldComp && criteria.subfieldValue){
			let crit = { api_name : criteria.subfield , comparator : criteria.subfieldComp , value : criteria.subfieldValue,type : criteria.type }
			if(criteria.api_name === 'cxFilter_Scoring_Rule' || criteria.api_name === 'cxFilter_Series') {
				delete crit.type;
			}
			this.checkSubFieldOpt({field , value :criteria.value});
			$L("#sub_field_"+crit.api_name)[0].ltProp("checked",true);
			let subFldNode = $L("#sub_option_"+crit.api_name);
			if( subFldNode[0] ){
				subFldNode[0].setData("cxPropCriteria" , crit)
			}
		}
		delete this.preventValChangeCallback;
	},//no i18n
	checkIsValidComparator : function( value , comp){
		if( !comp ){
			return false;
		}
		if( value == "${NOTEMPTY}" || value == "${EMPTY}" ){ //empty ,not empty criteria will be handled bydefault.
			return false;
		}
		if(["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 && ["EMAIL","ADDN_EMAIL"].indexOf(this.data.field.column_name)!== -1 && !this.data.field.custom_field){
			return false; 
		}

		// let option = this.data.options ? this.data.options : [];
		let opt = this.getConditionOpt(value);
		return opt;
	},
	didConnect: function() {
		var field = this.getData('field') //no i18n
		if(["Activity_Due" , "With_Open_Deal" , "Without_Any_Notes" , "Attended" , "Events_Tag" , "Positive_Score","Prediction_0","Prediction_1","completed_prediction","NBX_Available","Start_Date__s","Competitor_Duration","Competitor_Sentiment","Competitor_Name"].indexOf(field.api_name) >= 0){
			var subOption = $L('#sub_option_'+this._cruxReplace(field.api_name, "[/.]","_"));//no i18n
			if(subOption[0]){
				subOption[0].component.render(subOption[0]._callee._callee.component);
				subOption.addClass("cvSubOption");
			}
		}
		this.setCriteria();
	},
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAriaFilterInput();
		}
	}.observes('rendered', 'cxPropAria'),
    setDropdownMixin: function(){
        var lyteDrpdwn = this.$node.querySelectorAll('lyte-dropdown:not(crux-dropdown lyte-dropdown)');
		if(this.$node.cxProp('aria')){
			for(var i=0;i<lyteDrpdwn.length;i++){
				if(!lyteDrpdwn[i].bindFunc){
					lyteDrpdwn[i].bindFunc = Lyte.registeredMixins['crux-aria-dropdown-mixin'].bindEventForAria.bind(lyteDrpdwn[i].component);
					lyteDrpdwn[i].bindFunc();
				}
			}
		}
    }.observes('boundary'),
	getFieldCriteria : function(parent = this){
		this.handleFieldDisplayForCrossFilter();
		parent.specialDateObject = parent.specialDateObject ? parent.specialDateObject : {};
		var field = this.data.field,
			api_name = field.api_name,
			header = this.getData("moduleDisplayField"),//no i18n
			moduleRecordMapping = this.moduleRecordMapping,
			idModuleMapping = this.idModuleMapping,
			module_name = this.data.module,
			activity_option = "",
			commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
			abmTechniqueFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
			abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
			abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [],
			scoreParentCriteria, subTagCriteria, seriesParentCriteria,
			comparator , value, crux_comp,subfield , mod;

			if(field.Activity_tag){
			var RadioBtnValue = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0].ltProp("value");//no i18n
			subfield = this.$node.querySelector("#sub_option_"+RadioBtnValue);//no i18n
			field = subfield.getData("field");//no i18n
			api_name = field.api_name;
			//subTagCriteria = true;
		}
		if(field.api_name === "cxFilter_Scoring_Rule"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				return { isValdationFailure : true};
			}
			var selectedVal = nodeElem.getValue("actual_value");//No I18n
			scoreParentCriteria = {comparator : "equal",field : {api_name : 'Scoring_Rule',id : ""},value : selectedVal};//No I18n
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			if(!selectedELem){
				return { isValdationFailure : true};
			}
			field = $L("#" + selectedELem.id.replace("_field_","_option_")).e.component.data.field;
			api_name = field.api_name;
		}

		var srsPrnt , srsField = field.api_name;
		if(field.api_name === "cxFilter_Series"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				flag = false;return { isValdationFailure : true};
			}
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			if(!selectedELem){
				flag = false;return { isValdationFailure : true};
			}
			var selectedVal = nodeElem.getValue("actual_value");//No I18n
			seriesParentCriteria = {comparator : "equal",field : {api_name : 'Cadencesid__s',id : ""},value : selectedVal};//No I18n
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			let subComp = $L("#" + selectedELem.id.replace("_field_","_option_"))[0];
		
			let criteria = subComp.component.getFieldCriteria();
			if( criteria.isValdationFailure ){
				return criteria;
			}
			let cross_filter = this.groupSeriesCriteria(seriesParentCriteria,criteria );
			seriesParentCriteria = undefined;//The seriesParentCriteria variable is used in this function but is not needed. set it to undefined.
			return { type : "cross_filter" , cross_filter : cross_filter };
		}

		if(field.api_name === "cxFilter_UnallocatedRecords"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				flag = false;return { isValdationFailure : true};
			}
			var thresholdId = nodeElem.getValue("actual_value");//No I18n
			var threshCri = {comparator : "equal",field : {api_name : 'Threshold__s',id : ""},value : thresholdId};//No I18n
			var allocType = {comparator : "equal",field : {api_name : 'Allocation_Type__s',id : ""},value : "2"};//No I18n
			var thrshldGrpCri = this.construct_group(threshCri,allocType,"AND");//no i18n
			var cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : moduleRecordMapping.Thresholds.api_name },criteria : tempCri1 };
			cross_filter.criteria = thrshldGrpCri;
			// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
			// continue;
			return { type : "cross_filter" , cross_filter : cross_filter };
		}
		if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Email_Sentiment","cxFilter_Locked"].indexOf(field.api_name) != -1 && (field.field_data_type == "crossfield" || field.field_data_type == "custom" )){
//				var name = (field.api_name == "Activities")?"option_Activities": (field.api_name == "Notes")? "option_Notes" : (field.api_name == "Deals")?'option_Deals':(field.api_name == "cxFilter_Chats")?'option_Chats':(field.api_name == "cxFilter_Email_Sentiment")?'option_Email_Sentiment':'option_Contacts' //no i18n
			var node = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0];//no i18n
			activity_option = (node)?node.ltProp('value'):"";
			subfield = this.$node.querySelector("#sub_option_"+activity_option);//no i18n
		}

		if(["Without_Open_Activity" ,"Without_Any_Deal" ,'With_Contact','Without_Any_Contact'].indexOf(activity_option) == -1){
			id = "#DDV_"+ ( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Locked" || api_name == "cxFilter_Chats"  )?activity_option : this._cruxReplace(api_name, "[/.]","_") )//no i18n
			var tN= this.$node.querySelector(id);
			comparator = tN ? tN.ltProp("selected") : "equal";//no i18n
		}
		id = '#'+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats" || api_name == "cxFilter_Locked")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+'_crux_comp' //no i18n
		crux_comp  = this.$node.querySelector(id);

		//Hanlding for dynamicFilter field
		if( field.field_data_type ===  "dynamicFilter"){
			return crux_comp.component.getFieldCriteria();
		}
		if( !(field.api_name === "cxFilter_Email_Status" && field.data_type === "custom") && ( ["${OPEN}","${CLOSEDWON}","${CLOSEDLOST}","${EMPTY}","${BLOCKED}","${NOTBLOCKED}","${NOTEMPTY}"].indexOf(comparator) !== -1 ) && field.field_data_type !== "multiselectlookup" && field.field_data_type !== "multirelation" && field.field_data_type !== "multiuserlookup" && ["Without_Any_Activity","Without_Any_Notes","Attended"].indexOf(activity_option) === -1){/* eslint-disable-line no-extra-parens */ //NO I18N
			value = (comparator == "${NOTBLOCKED}")? "${BLOCKED}" : comparator //no i18n
			comparator =(comparator == "${NOTBLOCKED}")?"not_equal" : "equal" //no i18n
			if(field.api_name == "lookup"){
				api_name = api_name+"."+header[field.lookup.module.api_name][0]
			}
			// if(field.ui_type == 133 || field.data_type == "lookup"){
			// 	customLookupField.push(field.display_field_label);
			// 	CustomLookupCount = CustomLookupCount + 1;
			// }
			var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
			// TODO: Surya
			if(value==="${BLOCKED}" && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length<=0){
				let blockType = api_name==='Email' ? $L('input[name=option_'+api_name+']:checked').val().split('_')[2] : $L('input[name=option_'+api_name+']:checked').val().split('_')[3];
					let fieldApiNameUpperCase = api_name === 'Email'? 'EMAIL' : 'ADDN_EMAIL';//no i18n
					if(!blockType || blockType==="both"){
						value = "${BLOCKED}";
					}else{
						let subOption = $L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.data.selectedValues;//no i18n
						let bounceCategory = subOption.byDropDownValue;
						let firstDropDown = subOption.firstDropDownValue;
						let secondDropDown = subOption.secondDropDownValue;
						if(firstDropDown.includes('Age in') || firstDropDown.includes('Due in')){
							firstDropDown = firstDropDown.replace('Days',secondDropDown);
							// let numberComp = $L('#id_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('value');
							let numComp =  $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0];
							let numberComp = numComp ? numComp.component.getValue() : '';
							if(!numberComp){
								this.showFilterAlert("Enter a valid number", numComp?numComp.component:'');//no i18n
								return {isValdationFailure: true};
							}
							firstDropDown = firstDropDown.replaceAll(' ','');
							firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = 'less_than {' +firstDropDown+ '}+'+numberComp;
						}else if(firstDropDown === 'less_than' || firstDropDown === 'greater_than'){
							let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp = this.getISODateTime(dateComp,this.datePattern)
							firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = firstDropDown+' '+dateComp;
						}else if(firstDropDown === 'equal'){
							let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							let dateComp1 = this.getISODateTime(dateComp,this.datePattern);
							let dateComp2 = this.getISODateTime(dateComp,this.datePattern,"end");
							//firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = "between";
							firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
						}else if(firstDropDown === 'between'){
							let dateComp1 = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp1){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp1 = this.getISODateTime(dateComp1,this.datePattern);
							let dateComp2 = $L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp2){
								this.showFilterAlert("Enter a valid date",$L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp2 = this.getISODateTime(dateComp2,this.datePattern,"end")
							//firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
						}else{
							firstDropDown = comparator + ' '+ firstDropDown;
						}
							value = "${BLOCKED_" +bounceCategory.toUpperCase()+'}' +' '+firstDropDown ;
					}
			}else if(value && value.includes("${BLOCKED") && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length>0){
				this.setEmailBlockedCriteria(field.api_name);
			}
			if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent" || field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts") ){

				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" || field.api_name == "cxFilter_Deal_Stage" ){ //no i18n
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				// this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if(field.api_name === "cxFilter_Record_status"){//no i18n
				cross_filter = {include_objects :true ,relation : { api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status"},value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
				api_name = "Tag";//no i18n
				subTagCriteria =true;
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id},value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				tempCri1 = "";
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			if(subTagCriteria){
				var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
				var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
				tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
			}
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria ,tempCri1 );
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter }
			}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) }	
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
			}else{
				if((this.data.supportRelatedModules) && field.ui_type === 133 && (field.field_data_type == "lookup" && !( this.data.cxPropModule == "Activities"&& ["CONTACTID","SEID"].indexOf(field.column_name)!= -1))){
					mod = idModuleMapping[field.lookup.module.id];
					return {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" )},value : value};
				}
				return tempCri1
				// Lyte.arrayUtils(group, "push", tempCri1);//No I18n
			}
			//Lyte.arrayUtils(group, "push", {comparator : comparator ,field :{ api_name : api_name,id : field.id } ,value : value});//No I18n
		}else if(	(comparator == "between" || comparator == "not_between") && !(field.field_data_type == "custom" || field.field_data_type=="crossfield")){//no i18n
			var id1 = "#between_"+this._cruxReplace(api_name, "[/.]","_")+"_crux_comp";//no i18n
			var crux_comp1 = this.$node.querySelector(id1)
			var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
			if(!crux_comp.component.validate() || !crux_comp1.component.validate()){
				return { isValdationFailure : true};
			}
			value = crux_comp.component.getValue();
			 value1 = crux_comp1.component.getValue();
			if(["datetime" , "date" , "date_time"].includes(field.field_data_type)){
				if( field.field_data_type != "date_time" ){
					value =  this.getISODateTime(value,this.datePattern,"start",field.field_data_type);
					value1 = this.getISODateTime(value1,this.datePattern,"end",field.field_data_type);
				}
				// var a = /^(.*)T/.exec(value)[1];
				// var b = /^(.*)T/.exec(value1)[1];
				// if( field.field_data_type == "date" ){
				// 	value = a;
				// 	value1 = b;
				// }
				if( value > value1 ){
					this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
					return { isValdationFailure : true};
				}
			}else{
				//value = parseInt(value); value1 = parseInt(value1);
				// var isDecimal1 = (value.split(".")[1]) ? value.split(".")[1] : false;
				// var isDecimal2 = (value1.split(".")[1]) ? value1.split(".")[1] : false;
				// if( ( isDecimal1 && isDecimal1.length > 2 ) || ( isDecimal2 && isDecimal2.length > 2 ) ){
				// 	this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
				// 	flag = false; return { isValdationFailure : true};
				// }
				//value = Number(value);value1 = Number(value1);
				 //eslint-disable-next-line no-use-before-define
				if(parseFloat(value) === parseFloat(value1) || parseFloat(value) > parseFloat(value1)){
					this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.to1"),crux_comp); //NO I18N
					return { isValdationFailure : true};
				}
			}
			value = [value,value1]
			if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent") && (module_name == "Leads" || module_name == "Contacts")){
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" ){ //no i18n
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
			}
			var tempBtwCrt = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
			// if(api_name == "cxFilter_Prediction_Score"){
			// 	preventSaveFilter = "prediction"; //no i18n
			// 	api_name ="Prediction_Score";//no i18n
			// }
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria , tempBtwCrt);
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter }
			}else if(seriesParentCriteria){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempBtwCrt );
				tempBtwCrt = ""
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) }
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
				// continue;
			}else if(field.field_data_type != "custom" && field.field_data_type != "crossfield"){//No I18n
				return tempBtwCrt;
				// Lyte.arrayUtils(group, "push", tempBtwCrt);//No I18n
			}

		}else if(field.api_name === "cxFilter_Locked"){//NO I18N
			var feature_type = comparator;
			comparator = "equal";//No I18n
			var lockVal = false;
			if("Locked_True" === activity_option){
				lockVal = true;
				// if(feature_type === "record_locking" || feature_type === "orchestration"){
				// 	var cross_filter = {include_objects :true ,relation : { relation_id : moduleRecordMapping.LockingInformation.id, api_name : moduleRecordMapping.LockingInformation.api_name},criteria : {comparator:comparator ,field :{ api_name : "Feature_Type__s" },value : feature_type }} //no i18n
				// 	this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// }
			}
			return {comparator:comparator ,field : { api_name : "Locked__s"},value : lockVal}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field : { api_name : "Locked__s"},value : lockVal});//No I18n
		}else if( field.field_data_type == "custom" || field.field_data_type == "crossfield" ){ //no i18n
			var val = comparator ,sub_status
			by = comparator
			if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Campaigns","cxFilter_Locked"].indexOf(field.api_name) == -1){
				id = '#by_'+this._cruxReplace(api_name, "[/.]","_") // no i18n
				var by = this.$node.querySelector(id).ltProp("selected") //no i18n
			}
			if(activity_option!="" && activity_option != "Overdue" && field.api_name!="cxFilter_Email_Sentiment" ){
				by = activity_option
				val = null
			}
			if(field.api_name == "cxFilter_RecordAction" || field.api_name == "cxFilter_RelatedRecordsAction" ){
				var id = "#record_"+field.api_name //no i18n
				sub_status = this.$node.querySelector(id).ltProp('selected') //no i18n
			}
			if(field.api_name == "cxFilter_Email_Status" && by == "sent"){
				var check = parent.data.cxPropCurrentUserDetails.emailTrackingOption;
				var node = $L("."+field.api_name+"_selectedRadioBtn")[0];//no i18n
				if(!node ){
					if( check === 'entprofoff' ){
						sub_status = 'sent'; //no i18n
					}else{
						flag = false;
						return { isValdationFailure : true};		
					}			
				}else if(node){
					sub_status = node.ltProp('value') //no i18n
				}
			}
			if(field.api_name == "cxFilter_Email_Sentiment"){
				sub_status = (activity_option)?activity_option:"";
				if(sub_status == "percentage" || sub_status == "count"){
					if(!this.$node.querySelector("#"+sub_status+"_crux_comp").component.validate()){
						flag = false;return { isValdationFailure : true};
					}
				}
			}
			let condObj = {};
			if( subfield ){
				condObj = subfield.component.getConditionOpt(comparator) || {};
			}
			if( !Object.keys(condObj).length ){
				condObj = this.getConditionOpt(comparator) || {};
			}
			if(comparator == "Age in Days" ||  condObj.showDynamicInput){
				id = "#second_"+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+"_dropdown"//no i18n
				value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
				val =value1
				if(api_name != "cxFilter_Deals"){
					if(!crux_comp.component.validate()){
						flag = false ; return { isValdationFailure : true};
					}
					value = crux_comp.component.getValue()
					if( condObj.showDynamicInput ){
						val = '${'+comparator+'_N_'+value1+'}:'+value;//no i18n
					}else{
						val = '${AGEIN'+value1+'}+'+value+'';//no i18n
					}
				}
				comparator = comparator = condObj.comparator ? condObj.comparator :"less_equal" //no i18n
			}else if(field.api_name != "cxFilter_Campaigns"){ //no i18n
				val = comparator
				if(comparator == "${UNTILNOW}" || comparator == "${CURRENTTIME}"){ //no i18n
					comparator = 'less_equal' //no i18n
				}else if(comparator == '${AGEINDAYS}+30' || comparator == '${AGEINDAYS}+60' || comparator == '${AGEINDAYS}+90'){ //no i18n
					parent.specialDateObject[api_name] = { value : comparator};
					comparator = "less_equal" //no i18n
				}else if( comparator == "${DUEINDAYS}+7"){ //no i18n
					comparator = "less_equal" //no i18n
				}else if(crux_comp &&(activity_option == "Without_Any_Activity" || activity_option == "Activity_Done" || field.api_name =="cxFilter_Email_Status" || field.api_name == "cxFilter_Notes" || field.api_name == "cxFilter_Chats" || field.api_name == "cxFilter_Email_Sentiment") && !(["${TODAY}","${YESTERDAY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}","${UNTILNOW}","${TODAYANDOVERDUE}","${EMPTY}"].indexOf(comparator) != -1)){ //no i18n
					if(!crux_comp.component.validate()){
						flag = false;return { isValdationFailure : true};
					}
					val = crux_comp.component.getValue();
					if(comparator == "equal"){
						comparator = "between" //no i18n
						val = [this.getISODateTime(val,this.datePattern),this.getISODateTime(val,this.datePattern,"end")]
					}else if(comparator == "between"){ //no i18n
						var id1 ="#between_"+((activity_option && api_name != "cxFilter_Email_Sentiment")?activity_option:this._cruxReplace(api_name, "[/.]","_"))+"_crux_comp";//no i18n
						var crux_comp1 = this.$node.querySelector(id1)
						value1 = crux_comp1.component.getValue();
						if(!crux_comp1.component.validate()){
							//this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.display_field_label)) //no i18n
							flag = false;return { isValdationFailure : true};
						}
						val = this.getISODateTime(val,this.datePattern);
						value1 = this.getISODateTime(value1,this.datePattern,"end");
						// var a = /^(.*)T/.exec(val)[1];
						// var b = /^(.*)T/.exec(value1)[1];
						if( val > value1 ){
							this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
							flag = false;return { isValdationFailure : true};
						}
						val = [val,value1]
					}else{
						val = (comparator == "greater_than") ? this.getISODateTime(val,this.datePattern,"end") : this.getISODateTime(val,this.datePattern) //no i18n
					}
				}else{
					comparator = "equal" //no i18n
				}
			}
			if(field.field_data_type == "custom"){
				return { type : "custom_filter" , custom_filter :  this.specialfield(field,by,val,comparator,sub_status) }
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
			}else{
				if(field.api_name ==  "cxFilter_Campaigns"){
					// var t = $("#option_"+field.api_name)[0];//no i18n
					var t = this.$node;
					var sub_option_sel_value = t.getData("renderItems");//no i18n
					 this.campaigns_sel_value = t.getData("selectedValues");//no i18n
					//value = this.$node.querySelector("#multiSelect_lookup_"+field.api_name).ltProp('selected') //no i18n
					// value = JSON.parse(sub_option_sel_value.multiSelectFieldValue);
					value = this.getValueBasedonKeys(sub_option_sel_value , t.getData().lookupDisplayField);
					if(!value.length){
						this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",$("#option_"+field.api_name)[0].getData().placeholderValue[0]),this.$node.querySelector("#multiSelect_lookup_"+this._cruxReplace(field.api_name, "[/.]","_"))) //no i18n
						flag = false;return { isValdationFailure : true};
					}
					cross_filter = {include_objects :true ,relation : { api_name : "Campaigns"}} //no i18n
					var member_Status = this.$node.querySelector("#memberStatusField").component.getValue();//no i18n
					var Obj1 = {comparator:"equal" ,field :{ api_name : "Campaign_Name" },value : value} //no i18n
					if(member_Status.length){
						var Obj2 = {comparator:"equal" ,field :{ api_name : "Member_Status" },value : member_Status} //no i18n
						Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
					}
					var service_Status = this.$node.querySelector("#serviceStatusField") ? this.$node.querySelector("#serviceStatusField").component.getValue() : [];//no i18n
					if(service_Status.length){
						var Obj2 = {comparator:"equal" ,field :{ api_name : "Service_Status" },value : service_Status} //no i18n
						Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
					}
					cross_filter.criteria = Obj1;
					return { type : "cross_filter" , cross_filter : cross_filter };
					// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
					//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
					// continue;
				}
				cross_filter = this.specialfield(field,by,val,comparator,sub_status);
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
			}
		} else if(field.ui_type == 53) {
			if(!crux_comp.component.validate()){
				flag = false ;return { isValdationFailure : true};
			}
			var t = $("#option_"+field.api_name)[0];	//NO I18N
			this.pf_timeToReach_value = t.getData("selectedValues");	//NO I18N
			value = crux_comp.component.getValue();
			id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
			value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
			if (field.cxGetValueInMS === false) {
				value = '${'+"AGEIN"+value1+'}+'+value+'';	//NO I18N
			} else {
				value = this.getMilliSecondsfromDuration(value, value1);
			}
			if (field.api_name === "time_to_reach__s") {
				preventSaveFilter = "PathFinder";	//NO I18N
			}
			return  {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		} else if(field.field_data_type == "date" || field.field_data_type == "datetime" || field.field_data_type == "date_time" ){ //no i18n
			let condObj = this.getConditionOpt(comparator) || {};
			if(comparator.indexOf("${") != -1){
				value = comparator;comparator = condObj.comparator ? condObj.comparator : "equal"; //no i18n
			}else{
				if(!crux_comp.component.validate()){
					flag = false ;return { isValdationFailure : true};
				}
				// let condObj = this.getConditionOpt(comparator);
				value = crux_comp.component.getValue();
				if(comparator == "Due in Days" || comparator == "Age in Days" || condObj.showDynamicInput){
					var str="";
					id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
					value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
					if(comparator == "Due in Days"){
						str = '${DUEIN'+value1+'}+'+value+'';
					}else if(comparator == "Age in Days"){
						str = '${AGEIN'+value1+'}+'+value+'';
					}else{
						str = '${'+comparator+'_N_'+value1+'}:'+value;
					}
					
					comparator = condObj.comparator ? condObj.comparator : 'less_equal'; value = str; //no i18n
				}else{
					if(comparator == "equal"  && field.field_data_type == "datetime"){
						comparator = "between" ;//no i18n
						value = [this.getISODateTime(value,this.datePattern),this.getISODateTime(value,this.datePattern,"end")]
					}else if( field.field_data_type !== "date_time" ){
						var time = comparator == "greater_than" ? "end" : "start" ;
						value = this.getISODateTime(value,this.datePattern,time,field.field_data_type)
					}
					// else if(comparator == "greater_than"){ //no i18n
					// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern,"end") : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
					// }else{
					// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern) : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
					// }
				}
			}
			if( field.api_name == "cxFilter_Deal_Closing_Date" || ( field.api_name == "Visited_Time" && (module_name == "Leads" || module_name == "Contacts") )){
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Closing_Date"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			}
			if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) };
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
				// continue;
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
			if(srsPrnt){
				var cross_filter =this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				tempCri1 = "";
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else{
				return tempCri1
			}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		}
		else if( field.field_data_type == "num" || field.field_data_type == "currency" || field.field_data_type == "bigint" || field.field_data_type == "integer" ||  field.field_data_type == "longinteger" || field.field_data_type =="double" || field.field_data_type =="decimal" ){
			value = crux_comp.component.getValue();
			var isDecimal = (value.split(".")[1]) ? value.split(".")[1] : false,
				abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
				abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [];
			if( (field.data_type == "autonumber" || field.data_type == "bigint") && isDecimal){
				this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
				flag = false ; return { isValdationFailure : true};
			}
			if(!crux_comp.component.validate() ){
				flag = false ; return { isValdationFailure : true};
			}
			//value = Number(value);
			if( field.api_name == "cxFilter_Deal_Amount" || (field.api_name == "Time_Spent" && (module_name == "Leads" || module_name == "Contacts") )){
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Amount"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
			}
			preventSaveFilter = (abmAccountFields.includes(field.api_name.replace('cxFilter_', '')) ? 'abm' : false); //no i18n
			var crtTemp = {comparator:comparator ,field :{ api_name : preventSaveFilter == "prediction" ? "Prediction_Score" : api_name,id : field.id },value : value}; //No I18n
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria,crtTemp);
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(seriesParentCriteria){
				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name},value : value}
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else {
				return crtTemp;
				// Lyte.arrayUtils(group, "push", crtTemp);//No I18n
			}

		}
		else if(["textarea","text","multiselectpicklist","phone","email","mobile","website","picklist","lookup","autonumber","tag","layout"].indexOf(field.field_data_type) !== -1 && !this.data.isChildFieldLookup){
			if(comparator.indexOf("${") != -1){
				value = comparator;comparator = "equal"; //no i18n
			}else{
				if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.cxPropModule)!= -1 ){
					value = "${Calls.Call Status."+comparator+"}"//no i18n
					return {comparator:"equal" ,field :{ api_name : api_name,id : field.id },value :value }
					// Lyte.arrayUtils(group, "push",{comparator:"equal" ,field :{ api_name : api_name,id : field.id },value :value } );//No I18n
					// continue
				}
				if(!crux_comp.component.validate()){
					flag = false;return { isValdationFailure : true};
				}
				// if(field.ui_type == 133 || field.data_type == "lookup"){
				// 	customLookupField.push(field.display_field_label);
				// 	CustomLookupCount = CustomLookupCount + 1;
				// }
				// if(field.field_data_type == "multiselectpicklist"){
				// 	value = crux_comp.querySelector("input").value;//No I18n
				// }
				// else{ 
					var args = field.cxGetActualValue ? "actual_value" : undefined;
					if(this.data.valuePrefixDropdownOpt.prefixOption.length){
						args = this.data.valuePrefixDropdownOpt.selected.getValueArgs ? this.data.valuePrefixDropdownOpt.selected.getValueArgs : "";
					}
					value = crux_comp.component.getValue(args);
					if(field.column_name == "ACTIVITYTYPE"){
						value = crux_comp.component.getValue("actual_value");//no i18n
					}
					// if(value.constructor == String && value.indexOf(",")!= -1 ){
					// 	value = this.SplitWord(value);
					// }
				// }
				// if(!this.checkLimitValues(value,"text")){
				// 	flag = false;return { isValdationFailure : true};
				// }
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name, id : field.id},value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}

			var checkbox = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];//no i18n
			var crossFilterCriteria ;
			if(field.field_data_type == "picklist" && field.history_tracking &&checkbox && checkbox.checked && comparator == "equal"){
				var comp =this.$node.querySelector('#DDV1_'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklistTracker').ltProp('selected');//no i18n
				var daysNode = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_historyTrackDurationDays')[0];//no i18n
				//daysNode.setData("cxPropErrorMessage" , )
				if(!daysNode.component.validate()){
					flag = false;return { isValdationFailure : true};
				}
				var days = daysNode.component.getValue();
				days = "${AGEINDAYS}+"+days+""; //no i18n
				var relation_details =this.getData('module_info').related_lists[ this.getIndex(this.getData('module_info').related_lists,'picklist_tracker','action',true) ] //no i18n
				//var relation_details = field.history_tracking.module;
				var Obj1 = {field : {api_name : 'Modified_Time'},comparator : comp,value : days} // no i18n
				var Obj2 = {field : {api_name : field.history_tracking.duration_configured_field.api_name} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
				// if( field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")  ){
				// 	Obj2 = {field : {api_name : 'Stage_Duration_Calendar_Days'} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
				// }
				var temp = this.construct_group(Obj1,Obj2,"AND"); //no i18n

				//moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields.filterBy({custom_field : false,data_type : "picklist"})[0].api_name
				if(field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")){
					Obj1 = {field : {api_name : 'Stage'} ,comparator : comparator,value : value} //no i18n
				}else{
					Obj1 = {field : {api_name : this.get_pick_track_enable_field(moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields,field)} ,comparator : comparator,value : value} //no i18n
				}
                var relationApiName = this.data.supportRelatedModules ? this.getRelSysRefName(relation_details) : relation_details.api_name ;
				crossFilterCriteria = {include_objects :true ,relation : { api_name : relationApiName },criteria : this.construct_group(temp,Obj1,"AND")};//no i18n
					
				// return { type : "cross_filter" , cross_filter : cross_filter };
					
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", {include_objects :true ,relation : { api_name :relation_details.api_name },criteria : this.construct_group(temp,Obj1,"AND")}) //no i18n
			}
			if(field.api_name == "cxFilter_Record_status"){
				cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status" },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			}else if(field.field_data_type == "lookup" && !( this.data.cxPropModule == "Activities"&& ["CONTACTID","SEID"].indexOf(field.column_name)!= -1) ){// field.column_name !=  "CONTACTID" removed for contact lookup in salesorder module //no i18n
				if( field.ui_type == 132 ){
					var selectedId = this.getData().selectedValues.secondDropDownValue;
					mod = store.peekRecord("module",selectedId);//no i18n
					return {comparator:comparator ,field :{ api_name : api_name+"->"+mod.api_name+"."+( ( header[mod.module_name] && header[mod.module_name].length) ? header[mod.module_name][0] : "Name" )},value : value};
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"->"+mod.api_name+"."+( ( header[mod.module_name] && header[mod.module_name].length) ? header[mod.module_name][0] : "Name" )},value : value});//No I18n
				}else{
					mod = idModuleMapping[field.lookup.module.id];
					return {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" ) , id : field.id},value : value}
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" )},value : value});//No I18n
				}
			}else if( field.api_name == "cxFilter_Deal_Stage" || (( field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts")  ) ){ //no i18n
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Stage"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : 'Visits_Zoho_Livedesk'},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
			} else{
				subTagCriteria =false;
				if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
					api_name = "Tag";//no i18n
					subTagCriteria = true;
				}
				else if(api_name == "Status" && this.isZBCustomModule(this.getData("cxPropModule")) && value && field.pick_list_values){
					value = this.getDisplayValue(value, field , 'actual_value');
				}
				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name , id : field.id},value : value}
				if(srsPrnt){
					var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
					srsPrnt=undefined;
					seriesParentCriteria = undefined;
					return { type : "cross_filter" , cross_filter : cross_filter };
				}
				if(srsField === "cxFilter_Series"){
					tempCri1 = "";
				}

				if(subTagCriteria){
					var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
					var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
					tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
				}else if(field.api_name == "Data_Processing_Basis" && !(this.data.supportRelatedModules || this.data.isChildInput)){ //no i18n
					tempCri1.field.api_name = "Data_Processing_Basis_Details.Data_Processing_Basis";//no i18n
				}
				if(field.api_name !== "cxFilter_Competitor_Alert"){
					if((srsField && srsField !== "cxFilter_Series") || !srsField){
						if( crossFilterCriteria ){
							return { cross_filter : crossFilterCriteria , criteria : tempCri1};
						}
						return tempCri1
					}
				}
				
				// Lyte.arrayUtils(group, "push", tempCri1);//No I18n
			}
		}else if(field.field_data_type == "ownerlookup" || field.field_data_type == "userlookup"){ //no i18n
			if(!crux_comp.component.validate()){
				flag = false;return { isValdationFailure : true};
			}
			value = crux_comp.component.getValue();
			// if(!this.checkLimitValues(value,"text")){
			// 	flag = false;return { isValdationFailure : true};
			// }
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				// this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			var roleOrGroup = '';
			if(['equal_role','equal_group'].indexOf(comparator) > -1){
				roleOrGroup = comparator.indexOf('role') > -1 ? 'role' : 'group'; //For Group, api_name need not to be changes as per doc
				comparator = 'equal';
			}else if(comparator == 'not_equal_role'){ // not equal support is not there for groups
				roleOrGroup = 'role';
				comparator = 'not_equal';
			}
			if(roleOrGroup === 'group'){
				//For Groups, inner relation based cross fitler is being applied
				var cross_filter = {include_objects : true};
				var relatedListDetails = Crm.groupUserRelDetails.listRelation;
				cross_filter.relation = {type : 'field' , api_name : field.api_name};
				cross_filter.relation.relation = {type : 'related_list', api_name : relatedListDetails.api_name};
					
				var grpUserFldDetails = Crm.groupUserRelDetails.field ;
				cross_filter.criteria = {comparator : comparator, field : { api_name : grpUserFldDetails.api_name , id : grpUserFldDetails.id} , value : value};
				//doubtFull of multiple apiname based grps
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no i18n
				
			}else if(roleOrGroup === 'role'){
					var roleField = Crm.userRoleField;
					return {comparator:comparator ,field :{ api_name : api_name+'.role' ,id : roleField.id },value : value}
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+'.role' ,id : roleField.id },value : value});//No I18n
			}
			//This case need to be validated. Cross of crossfields
			if(field.api_name == "cxFilter_Deal_Owner"){
				var cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : roleOrGroup == 'role' ? field.name+'.role' : field.name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			}else if(!roleOrGroup){
				return tempCri1;
				// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
			}
		}else if(field.field_data_type == "boolean"){ //no i18n
			value = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp')[0].component.getValue() //no i18n
			return  {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		}else if(field.field_data_type == "multiselectlookup" || field.field_data_type == "multiuserlookup" || this.data.isChildFieldLookup){ //no i18n
			// var modInfo = moduleRecordMapping[idModuleMapping[field[field.field_data_type].linking_module.id]],
			var include_objects = true
			value = comparator
			if(comparator.indexOf("${") == -1){
				if(field.ui_type == 445 || field.field_data_type == "multiuserlookup"){
					if(!crux_comp.component.validate()){
						flag = false;return { isValdationFailure : true};
					}
					value = crux_comp.component.getValue()
				}else{
					// var t = this.$node.querySelector("#option_"+this._cruxReplace(field.api_name, "[/.]","_"));//no i18n
					var t = this.$node;
					value = t.getData().renderItems //no i18n
					// value = JSON.parse(value)
					if(!value.length && !this.data.cxPropIgnoreEmptyValue){
						this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp) //no i18n
						flag = false;return { isValdationFailure : true};
					}
					value = this.getValueBasedonKeys(value,t.getData().lookupDisplayField);
				}
			}else {
				include_objects = comparator == "${EMPTY}" ? false : true;//no i18n
				if( comparator == "${NOTEMPTY}" ){
					value = "${EMPTY}" //no i18n
				}
				comparator = "not_equal";//no i18n

			}
			//comparator = (field.data_type == "multiuserlookup") ? comparator :  "equal" //no i18n
			//var relation_details =this.getData('module_info').related_lists[this.getIndex(this.getData('module_info').related_lists,modInfo.module_name,'linkingmodule',true)] //no i18n
			//var link_field = this.findLinkingField(field,modInfo.fields)
			var cross_filter = {include_objects :include_objects ,relation : { api_name : field[field.field_data_type].api_name},criteria : {comparator:comparator ,field : { api_name : this.data.isChildFieldLookup ? field.api_name : field[field.field_data_type].connectedlookup_apiname,id : field.id },value : value }} //no i18n
			if(this.data.isChildFieldLookup){
				return cross_filter.criteria;
			}
			return { type : "cross_filter" , cross_filter : cross_filter };
			// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
			// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
		} else if(field.field_data_type === "multirelation" && field.api_name === "cxFilter_Linked_Segment__s") {
			var cross_filter,
				cruxNode,
				isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
				include_objects = true,
				value = comparator,
				relation = {
					type: 'related_list', // NO I18N
					api_name: this.data.supportRelatedModules ? 'ABM_Account__r' : "ABM_Accounts", // NO I18N
					relation: {
						api_name: 'ABM_Account_Segment__s' // NO I18N
					}
				};
				/*
				 relation = {
					 type: 'related_list',
					 api_name: 'ABM_Account_Segment1'
				 }; */

			if (!isAccountModule) {
				relation = {
					type: 'field', // NO I18N
					api_name: commonInfo.abmModuleInfo.account_name.api_name, // NO I18N,
					relation: {
						api_name: this.data.supportRelatedModules ? 'ABM_Account_Segment__r' : 'ABM_Account_Segment1' // NO I18N
					}
				};
			}
			
			isAbmFieldUsed = true;
			
			if(comparator.indexOf("${") === -1) {
				// cruxNode = this.$node.querySelector("#option_" + this._cruxReplace(field.api_name, "[/.]","_")); // NO I18N
				cruxNode = this.$node;
				value = cruxNode.getData().renderItems;
				
				if(!value.length){
					this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check", field.field_label), crux_comp); // NO I18N
					flag = false;
					
					return {
						isValdationFailure: true
					};
				}
				
				value = this.getValueBasedonKeys(value, cruxNode.getData().lookupDisplayField);
			} else {
				include_objects = !(comparator === "${EMPTY}"); // NO I18N
				
				if(comparator === "${NOTEMPTY}") {
					value = "${EMPTY}"; // NO I18N
				}
				
				comparator = "not_equal"; // NO I18N
			}

			cross_filter = {
				include_objects: include_objects,
				relation: relation,
				criteria: {
					comparator: comparator,
					field: {
						api_name: "Linked_Segment__s" // NO I18N
					},
					value: value
				}
			};
			return { type : "cross_filter" , cross_filter : cross_filter , relation_name : isAccountModule ? relation.api_name : relation.relation.api_name  };
			// this.updateCrossFilter(crossfilter, isAccountModule ? relation.api_name : relation.relation.api_name, cross_filter);
		} 
	},
	getABMCriteria: function (api_name, comparator, value) {
		var commonInfo = this.getData('cxPropCommonInfo'), // NO I18N
			cross_filter,
			isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
			relation = {
				api_name: this.data.supportRelatedModules ? 'ABM_Account__r' : 'ABM_Accounts' // NO I18N
			},
			relationApiName = relation.api_name;
		if (!isAccountModule) {
			relation = {
				type: 'field', // NO I18N
				api_name: commonInfo.abmModuleInfo.account_name.api_name,
				relation: relation
			};
			relationApiName = relation.relation.api_name;
		}
		cross_filter = {
			include_objects: true,
			relation: relation,
			criteria: {
				comparator: comparator,
				field: {
					api_name: api_name
				},
				value: value
			}
		};
		return {cross_filter: cross_filter, relation_api_name: relationApiName};
	},
	groupScoreCriteria : function(scoreParentCriteria ,crtTemp ){
		var crossCrt = this.construct_group(scoreParentCriteria,crtTemp,"AND"); //No I18n
		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping["Entity Scores"].id ,api_name : this.moduleRecordMapping["Entity Scores"].api_name},criteria : crossCrt }
		return crossFltr;
		// this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
	},
	groupSeriesCriteria : function(srsParentCriteria,crossCrt ){
		//var crossCrt
		var mod = crmListView.getObject().module;
		var realtedDetails = this.getData('module_info').related_lists;
		var crossCrt = this.construct_group(srsParentCriteria,crossCrt,"AND"); //No I18n
        var len = realtedDetails.length
        for(var i = 0; i< len ;i++){
	         if(realtedDetails[i].personality_name === 'SERIESPERSONALITY'){
				    var relationApiName = this.data.supportRelatedModules ? this.getRelSysRefName(realtedDetails[i]) :  realtedDetails[i].api_name;
		       		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping.Entity_Cadences.id ,api_name : relationApiName},criteria : crossCrt }
		            return crossFltr;
					// this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
		            // break;
	          }
         }
	},
	getRelSysRefName : function(childDetails){
        var moduleApiName = childDetails.module.api_name;
		var relatedModules =this.getData('module_info').relatedModules;
		var relatedModule = relatedModules.find(item => item.module.api_name === moduleApiName);
		if(relatedModule){
            return relatedModule.api_name;
		} else {
			return childDetails.api_name;
		}
	},
	handleFieldDisplayForCrossFilter : function(){
		var originalFieldLabel = this.data.field.field_label;
		var _self = this;
		if(this.data.isChildInput && this.parentCompData && this.parentCompData.data.cxPropChildModuleDisplayLabel){ //handling to display alert containing field name along with module name for cross filters will be revert set at end of this method
			var fieldLabel = this.data.field.field_label+" of "+this.parentCompData.data.cxPropChildModuleDisplayLabel;
			Lyte.Component.set(this.data.field,{"field_label" : fieldLabel}); //NO I18n
		}
		setTimeout(function(){
            Lyte.Component.set(_self.data.field,{"field_label" : originalFieldLabel}); //NO I18n
		},100);
	},
	get_pick_track_enable_field : function(fields,currField){
		var i, len = fields.length;
		for( i =0 ; i < len ; i++){
			if(fields[i].refer_from_field && fields[i].refer_from_field.id === currField.id && fields[i].api_name !== 'Moved_To__s'){ // Skipping the 'Moved_To__s' field because it also refers to the same picklist field.
				return fields[i].api_name;
			}
		}
		return false;
	},
	checkSubFieldOpt : function(opt = {}){
		let {field , value} = opt;
		if(field.api_name === 'cxFilter_Scoring_Rule' && value){
			let selRule = field.pick_list_values.filter((pickVal)=>{return value == pickVal.display_value || value == pickVal.actual_value})[0],
				hide = false;
			this.data.crossFields.forEach((subFld)=>{
				Lyte.objectUtils(subFld , 'add' , 'cxHide' , true);
				hide = false;
				if(  selRule && selRule.type === 'zia_scoring' && subFld.api_name !== "Score"){
					hide = true;
				}
				Lyte.objectUtils(subFld , 'add' , 'cxHide' , hide);
			})
			// if(  ){
				$L(`#sub_field_Score`)[0].ltProp('checked',selRule.type === 'zia_scoring');//No i18N
			// }
		}
	}
 }, {mixins : ["crux-criteria-conditions","crux-filter-utils", "crux-aria-smart-filter-input-mixin"]});//No I18n
Lyte.Component.registerHelper("radioBtnIsSelected", function(field,Obj,isChecked) {//No I18n
	var defaultSelected = ["Positive_Score","Activity_Due","Without_Any_Notes", "high","win" , "opened" ,"With_Contact" , "With_Open_Deal" , "Attended","In_Last","Events_Tag","NBX_Available", "Locked_True","Start_Date__s"]; //no i18n
	if( field.sent_status && field.sent_status[0] && field.sent_status[0].api_name == Obj.api_name){
		return field.api_name+"_selectedRadioBtn"; //no i18n
	}
	if(defaultSelected.indexOf(Obj.api_name)!=-1){
		if(isChecked){
			return true;
		}
		return field.api_name+"_selectedRadioBtn"; //no i18n
	}
	if(Obj.api_name==="cxFilter_EMAIL_both" || Obj.api_name==="cxFilter_ADDN_EMAIL_both"){
		return true;
	}
	if(isChecked){
			return false;
	}
	return "";
});
