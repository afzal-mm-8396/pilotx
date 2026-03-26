//$Id$
Lyte.Component.register("crux-lookupfilter-component", {
_template:"<template tag-name=\"crux-lookupfilter-component\"> <template is=\"if\" value=\"{{cxPropShowFilter}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropDisplayFields}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{checkNoFilter(field,cxPropOnlyFilterable)}}\"><template case=\"true\"> <lyte-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}} {{if(field.cxNoFilter,'cxLookupFieldList')}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\"> <div class=\"{{if(field.customWidth,'','w150')}} mT20\"> </div> </lyte-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'===',true)}}\"><template case=\"true\"> <lyte-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.yieldName,'===','filter'),'&amp;&amp;',cxPropEndFilter)}}\"><template case=\"true\"> <lyte-button data-zcqa=\"{{applyZcqa}}\" lt-prop-appearance=\"primary\" lt-prop-class=\"{{cxPropApplyClass}}\" lt-prop-disabled=\"{{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableFilter,'!')),'true','false')}}\" onclick=\"{{action('onClickApply',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropApplyText}} </template> </lyte-button> <template is=\"if\" value=\"{{cxPropShowClear}}\"><template case=\"true\"> <lyte-button data-zcqa=\"{{clearZcqa}}\" lt-prop-class=\"{{cxPropClearClass}}\" onclick=\"{{action('clearFilter',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropClearText}} </template> </lyte-button> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(filterAtfirst,'&amp;&amp;',expHandlers(index,'===',0))}}\"><template case=\"true\"> <div class=\"mT20 cxLookupFilterButtonWrap\"> <lyte-button class=\"dIB cxVam\" lt-prop-appearance=\"primary\" lt-prop-class=\"{{cxPropApplyClass}}\" lt-prop-disabled=\"{{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableClear,'!')),'true','false')}}\" onclick=\"{{action('onClickApply',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.apply.filter')}} </template> </lyte-button> <template is=\"if\" value=\"{{cxPropShowClear}}\"><template case=\"true\"> <lyte-button class=\"dIB cxVam mL10\" lt-prop-appearance=\"default\" lt-prop-class=\"{{cxPropApplyClass}}\" lt-prop-disabled=\"{{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableClear,'!')),'true','false')}}\" onclick=\"{{action('clearFilter',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.title.clear.name')}} </template> </lyte-button> </template></template> </div> </template></template> </template></template> </lyte-th> </template><template case=\"false\"> <lyte-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{if(field.cxNoFilter,'cxLookupFieldList')}} {{field.cxPropClass}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\"> <div class=\"cxLookupCriteriaFilter\"> <template is=\"if\" value=\"{{cxPropComparator}}\"><template case=\"true\"> <crux-dropdown id=\"cruxComparator{{index}}\" cx-prop-class=\"{{if(field.customWidth,'','w150')}} cxLookupFilterscomparator cxBoxDropdown\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,expHandlers('comparator_','+',field.cxPropFilterZcqa),expHandlers('comparator_','+',index))}}\" cx-prop-tabindex=\"1\" cx-prop-maxsearch=\"{{maxSearchComparator}}\" cx-prop-options=\"{{cruxLookupFilterComparator(field,cxPropFormulaUitypes,cxPropContent)}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"api_val\" on-option-select=\"{{method('queryBuild',expHandlers(index,'-',firstIndex),this)}}\" on-show=\"{{method('lookupFilterDropdownOpened')}}\" on-hide=\"{{method('lookupFilterDropdownClosed')}}\" cx-prop-placeholder=\"{{if(cxPropComparatorPlaceholder,cxPropComparatorPlaceholder,field.comparatorPlaceholder)}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,true,field)}}\"> </crux-dropdown> </template></template> <div class=\"{{if(field.customWidth,'','w150')}} cxCriteriaInputSection mT20\"> {{addMurhyInfo(\"crux-lookupfilter-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{reRender}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(enableEmptyOrNotempty[field.id],'&amp;&amp;',enableEmptyOrNotempty[field.id].hasemptyOrNotempty),'||',expHandlers(enableEmptyOrNotempty[field.api_name],'&amp;&amp;',enableEmptyOrNotempty[field.api_name].hasemptyOrNotempty))}}\"><template case=\"true\"> <lyte-input id=\"emptyConditionInput{{index}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" class=\"cxFlex\" lt-prop-type=\"text\" lt-prop-disabled=\"true\"> </lyte-input> </template><template case=\"false\"><template is=\"if\" value=\"{{field.noOverride}}\"><template case=\"true\"> <template is=\"component\" id=\"cruxElem{{index}}\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-box-class=\"{{cxPropLookupfilterWrapperClass}}\" cx-prop-allow-negative-value=\"{{if(ifEquals(field.cxPropAllowNegativeValue,false),false,true)}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-dropdown-hide=\"{{method('hide')}}\" on-before-dropdown-open=\"{{method('beforeShow')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" on-calendar-open=\"{{method('show')}}\" on-calendar-close=\"{{method('hide')}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" cx-prop-appearance=\"box\" cx-prop-ignore-empty-value=\"true\" cx-prop-time-zone=\"\" model-req=\"{{field.modelReq}}\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" on-before-add=\"{{method('onBeforeAdd',field.cxTypeMapping)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\" cx-prop=\"{{field.filterProperties}}\" max-user-drop-limit-err=\"{{method('userCompMaxLimitErr',field.maxLimit)}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.cxDateselect,'===','dateselect')}}\"><template case=\"true\"> <lyte-dateselect id=\"cruxElem{{index}}\" class=\"{{field.filterClass}}\" lt-prop=\"{{field.filterProperties}}\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" on-change=\"{{method('queryBuildCompDateselect',expHandlers(index,'-',firstIndex),this)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\"></lyte-dateselect> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'===','lookup'),'||',expHandlers(field.cxTypeMapping,'===','text')),'||',expHandlers(field.cxTypeMapping,'===','email')),'||',expHandlers(field.cxTypeMapping,'===','twitter')),'||',expHandlers(field.cxTypeMapping,'===','phone')),'||',expHandlers(field.cxTypeMapping,'===','text-area')),'||',expHandlers(field.cxTypeMapping,'===','website')),'||',expHandlers(field.cxTypeMapping,'===','multi-picklist')),'||',expHandlers(field.ui_type,'===','100'))}}\"><template case=\"true\"> <template is=\"component\" id=\"cruxElem{{index}}\" component-name=\"crux-text-component\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-dropdown-hide=\"{{method('hide')}}\" on-before-dropdown-open=\"{{method('beforeShow')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-appearance=\"box\" cx-prop-direction=\"vertical\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" cx-prop-ignore-empty-value=\"true\" cx-prop-type=\"single\" onkeyup=\"{{action(&quot;filterSetValue&quot;,&quot;text&quot;,event)}}\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" cx-prop=\"{{field.filterProperties}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.cxTypeMapping,'===','tag')}}\"><template case=\"true\"> <template is=\"component\" id=\"cruxElem{{index}}\" component-name=\"crux-tag-component\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-dropdown-hide=\"{{method('hide')}}\" on-before-dropdown-open=\"{{method('beforeShow')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-appearance=\"box\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" cx-prop-ignore-empty-value=\"true\" onkeyup=\"{{action(&quot;filterSetValue&quot;,event)}}\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" cx-prop=\"{{field.filterProperties}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'===','date'),'||',expHandlers(field.cxTypeMapping,'===','date-time')),'&amp;&amp;',cruxDateFilterComparator(filterQuery,index,firstIndex))}}\"><template case=\"true\"> <template is=\"component\" id=\"cruxElem{{index}}Number\" component-name=\"crux-number-component\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" cx-prop-appearance=\"box\" cx-prop-ignore-empty-value=\"true\" model-req=\"{{field.modelReq}}\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\" cx-prop=\"{{field.filterProperties}}\" cxpropmaxlength=\"4\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> <template is=\"component\" id=\"cruxElem{{index}}Time\" component-name=\"crux-picklist-component\" cx-prop-picklist-values=\"{{cxPropTimeOptions}}\" cx-prop-user-value=\"name\" cx-prop-system-value=\"api_val\" cx-prop-value=\"{{cxPropTimeOptions[0].name}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-from=\"create\" cx-prop-appearance=\"box\" cx-prop-ignore-empty-value=\"true\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\" cx-prop=\"{{field.filterProperties}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> </template><template case=\"false\"> <template is=\"component\" id=\"cruxElem{{index}}\" component-name=\"{{if(ifEquals(field.cxTypeMapping,'date-time'),'crux-date-component',expHandlers(expHandlers('crux-','+',field.cxTypeMapping),'+','-component'))}}\" cx-prop-allow-negative-value=\"{{if(ifEquals(field.cxPropAllowNegativeValue,false),false,true)}}\" on-calendar-open=\"{{method('show')}}\" on-calendar-close=\"{{method('hide')}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-dropdown-hide=\"{{method('hide')}}\" on-before-dropdown-open=\"{{method('beforeShow')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" cx-prop-appearance=\"box\" cx-prop-ignore-empty-value=\"true\" model-req=\"{{field.modelReq}}\" cx-prop-time-zone=\"\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" on-before-add=\"{{method('onBeforeAdd',field.cxTypeMapping)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\" cx-prop=\"{{field.filterProperties}}\" max-user-drop-limit-err=\"{{method('userCompMaxLimitErr',field.maxLimit)}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\"></template> <template is=\"if\" value=\"{{isBetweenCheck(isBetween,isBetweenArr,index,firstIndex)}}\"><template case=\"true\"> <p>and</p> <template is=\"component\" id=\"cruxElem{{index}}\" component-name=\"{{if(ifEquals(field.cxTypeMapping,'date-time'),'crux-date-component',expHandlers(expHandlers('crux-','+',field.cxTypeMapping),'+','-component'))}}\" cx-prop-allow-negative-value=\"{{if(ifEquals(field.cxPropAllowNegativeValue,false),false,true)}}\" cx-prop-prevent-parent-scroll=\"true\" data-zcqa=\"{{if(field.cxPropFilterZcqa,field.cxPropFilterZcqa,expHandlers('filter_','+',index))}}\" cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-class=\"cxLookupFiltersInput preventWheel {{field.filterClass}}\" cx-prop-appearance=\"box\" cx-prop-ignore-empty-value=\"true\" cx-prop-time-zone=\"\" cx-prop-from=\"filter\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('queryBuildComp',expHandlers(index,'-',firstIndex),this)}}\" onkeyup=\"{{action('filterSetValue',field.cxTypeMapping,event)}}\" cx-prop=\"{{field.filterProperties}}\" cx-prop-disabled=\"{{cruxFilterDisabled(filterQuery,index,firstIndex,cxPropMaxFilter,false,field)}}\" on-calendar-open=\"{{method('show')}}\" on-calendar-close=\"{{method('hide')}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-dropdown-hide=\"{{method('hide')}}\" on-before-dropdown-open=\"{{method('beforeShow')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\"></template> </template></template> </template></template> </template></template></template></template></template></template></template></template></template></template> </template></template> </div> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(filterAtfirst,'!'),'&amp;&amp;',expHandlers(index,'===',firstIndex)),'&amp;&amp;',expHandlers(cxPropEndFilter,'!'))}}\"><template case=\"true\"> <div class=\"cxLookupFilterButtonWrap\"> <template is=\"if\" value=\"{{cxPropFilterButton}}\"><template case=\"true\"> <lyte-button lt-prop-size=\"small\" data-zcqa=\"{{applyZcqa}}\" lt-prop-tab-index=\"0\" lt-prop-appearance=\"primary\" lt-prop-class=\"{{cxPropApplyClass}}\" lt-prop-disabled=\"{{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableFilter,'!')),'true','false')}}\" onclick=\"{{action('onClickApply',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropApplyText}} </template> </lyte-button> </template><template case=\"false\"> <a data-zcqa=\"{{applyZcqa}}\" class=\"cxLookupApplyFilter cP dIB {{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableFilter,'!')),'cxDisabledLink eventNone','')}} {{cxPropApplyClass}}\" onclick=\"{{action('onClickApply',event)}} \">{{cxPropApplyText}}</a> </template></template> <template is=\"if\" value=\"{{cxPropShowClear}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropClearButton}}\"><template case=\"true\"> <lyte-button lt-prop-size=\"small\" data-zcqa=\"{{clearZcqa}}\" lt-prop-tab-index=\"0\" lt-prop-class=\"{{cxPropClearClass}}\" lt-prop-disabled=\"{{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableClear,'!')),'true','false')}}\" onclick=\"{{action('clearFilter',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropClearText}} </template> </lyte-button> </template><template case=\"false\"> <a data-zcqa=\"{{clearZcqa}}\" class=\"cxLookupClearFilter {{if(expHandlers(cxPropDisableFilter,'&amp;&amp;',expHandlers(enableClear,'!')),'cxDisabledLink eventNone','')}} {{cxPropClearClass}}\" onclick=\"{{action('clearFilter',event)}} \">{{cxPropClearText}}</a> </template></template> </template></template> </div> </template></template> </lyte-th> </template></template></template></template> </template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]},{"type":"attr","position":[3]},{"type":"component","position":[3],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3]},{"type":"component","position":[3],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}],
_observedAttributes :["module","cxPropModuleName","cxPropShowFilter","currentQuery","cxPropLookupfilterWrapperClass","cxPropHeaderFields","cxPropDisplayFields","cxPropContent","cxPropNoValidation","cxPropEndFilter","cxPropFormulaUitypes","cxPropComparator","cxPropOnlyFilterable","cxPropDefaultComparator","cxPropDatatypeComparator","cxPropDatePattern","cxPropPlaceHolder","cxPropDisableFilter","cxPropApplyText","cxPropClearText","cxPropApplyClass","cxPropClearClass","cxPropComparatorPlaceholder","cxPropMaxFilter","cxPropUnselectComparator","cxPropDateComparaTors","cxPropTimeOptions","cxPropEncryptFldComparator","enableFilter","enableClear","filterQuery","cxPropShowClear","getBackfilter","firstIndex","reRender","isBetween","filterAtfirst","cxPropFilterButton","cxPropClearButton","clearZcqa","applyZcqa","head","maxSearchComparator","isBetweenArr","cxPropAria","cxPropApiNameMapping","cxPropTimeZone","cxPropAppearance","enableEmptyOrNotempty"],
_observedAttributesType :["object","string","boolean","object","string","array","array","object","boolean","boolean","object","boolean","string","object","object","string","object","boolean","string","string","string","string","string","number","boolean","object","array","object","boolean","boolean","array","boolean","array","number","boolean","boolean","boolean","boolean","boolean","string","string","object","string","array","boolean","object","string","string","object"],
//no i18n
	data : function(){
		return {
			// The main module object, often containing details about the current module 's configuration or state.
			module : Lyte.attr("object",{default:{}}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropModuleName
			 * Name of the current module as a string, likely used for display or referencing purposes.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropModuleName : Lyte.attr("string",{default:""}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropShowFilter=false
			 * Determines if the filter UI component should be displayed to the user.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropShowFilter : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Holds the current filter or search query object, containing parameters for backend API calls.
			currentQuery : Lyte.attr("object",{default:{}}),//no i18n
			/**
			 * @componentProperty { string } cxPropLookupfilterWrapperClass
			 * cxPropLookupfilterWrapperClass used for Dark theme related changes
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropLookupfilterWrapperClass :  Lyte.attr("string") ,// No I18n
			/**
			 * @componentProperty { array } cxPropHeaderFields
			 * An array specifying which fields should be displayed in the header section of the module.
         	 * Hidden attribute for backend use only.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropHeaderFields : Lyte.attr("array",{default:[], hideAttr:true}) ,// No I18n
			/**
			 * @componentProperty { array } cxPropDisplayFields
			 * Defines the fields that should be shown to the user in the main content or details section.
         	 * Hidden attribute for backend processing.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDisplayFields : Lyte.attr("array",{default:[], hideAttr:true}) ,// No I18n
			/**
			 * @componentProperty { object } cxPropContent
			 * Contains options and values for filters based on data types. Values are dynamically generated for each field type.
         	 * Uses _cruxUtils for multilingual support (I18n).
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropContent : Lyte.attr("object",{default:{ // No I18n
				'786':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is after"),"api_val":"greater_than"},{"name":_cruxUtils.getI18n("is before"),"api_val":"less_than"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'200':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is after"),"api_val":"greater_than"},{"name":_cruxUtils.getI18n("is before"),"api_val":"less_than"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'24':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is after"),"api_val":"greater_than"},{"name":_cruxUtils.getI18n("is before"),"api_val":"less_than"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'333':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is after"),"api_val":"greater_than"},{"name":_cruxUtils.getI18n("is before"),"api_val":"less_than"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'14':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is after"),"api_val":"greater_than"},{"name":_cruxUtils.getI18n("is before"),"api_val":"less_than"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'209':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'35':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'52':[{"name":"=","api_val":"equal"},{"name":"!=","api_val":"not_equal"},{"name":">","api_val":"greater_than"},{"name":">=","api_val":"greater_equal"},{"name":"<","api_val":"less_than"},{"name":"<=","api_val":"less_equal"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'32':[{"name":"=","api_val":"equal"},{"name":"!=","api_val":"not_equal"},{"name":">","api_val":"greater_than"},{"name":">=","api_val":"greater_equal"},{"name":"<","api_val":"less_than"},{"name":"<=","api_val":"less_equal"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'36':[{"name":"=","api_val":"equal"},{"name":"!=","api_val":"not_equal"},{"name":">","api_val":"greater_than"},{"name":">=","api_val":"greater_equal"},{"name":"<","api_val":"less_than"},{"name":"<=","api_val":"less_equal"},{"name":_cruxUtils.getI18n("between"),"api_val":"between"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}],	// no i18n
				'2':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"}],// no i18n
				'26':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"}],// no i18n
				'8':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"}],// no i18n
				'20':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"}],// no i18n
				'300':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"}],//no i18n
				'301':[{"name": _cruxUtils.getI18n("is"),"api_val":"equal"}],//no i18n
				'0':[{"name":_cruxUtils.getI18n("starts with"),"api_val":"starts_with"},{"name":_cruxUtils.getI18n("contains"),"api_val":"contains"},{"name":_cruxUtils.getI18n("doesn\'t contain"),"api_val":"not_contains"},{"name": _cruxUtils.getI18n("is"),"api_val":"equal"},{"name":_cruxUtils.getI18n("isn\'t"),"api_val":"not_equal"},{"name":_cruxUtils.getI18n("is empty"),"api_val":"empty"},{"name":_cruxUtils.getI18n("is not empty"),"api_val":"notempty"}]// no i18n
			}}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropNoValidation=false
			 * If set to true, disables validations for this module or component.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropNoValidation : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropEndFilter=false
			 * Indicates if the filter should automatically close or "end" after use.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropEndFilter : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { object } cxPropFormulaUitypes
			 * Holds UI type configurations for formula-based fields.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropFormulaUitypes : Lyte.attr("object",{default:{}}),	//no i18n
			/**
			 * @componentProperty { boolean } cxPropComparator=false
			 * Indicates if comparison functionality should be enabled.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropComparator : Lyte.attr("boolean",{default:true}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropOnlyFilterable
			 * Specifies which properties are exclusively filterable within the module.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropOnlyFilterable : Lyte.attr("string",{default:''}) ,// No I18n
			/**
			 * @componentProperty { object } cxPropDefaultComparator
			 * Default comparator settings for filter actions, initialized with a default value.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDefaultComparator :  Lyte.attr("object",{default:{"starts_with":[0]}}),	//no i18n
			/**
			 * @componentProperty { object } cxPropDatatypeComparator
			 * Mapping of comparators available for each data type.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDatatypeComparator :  Lyte.attr("object",{default:{}}),	//no i18n
			/**
			 * @componentProperty { string } cxPropDatePattern
			 * Date format string applied to date-based fields, dependent on user preferences.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDatePattern : Lyte.attr("string",{default: typeof Crm !== 'undefined' ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy"}), //no i18n
			/**
			 * @componentProperty { object } cxPropPlaceHolder
			 * Default placeholders for various fields in the module.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropPlaceHolder : Lyte.attr("object",{default:{}}),	//no i18n
			/**
			 * @componentProperty { boolean } cxPropDisableFilter=false
			 * Disables the filter UI or actions for this module if true.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDisableFilter : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropApplyText
			 * Label text for the "Apply" filter button, supporting multilingual text via _cruxUtils.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropApplyText : Lyte.attr("string",{default:_cruxUtils.getI18n('crm.button.apply.filter')}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropClearText
			 * Label text for the "Clear" filter button, supporting multilingual text via _cruxUtils.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropClearText : Lyte.attr("string",{default:_cruxUtils.getI18n('crm.title.clear.name')}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropApplyClass
			 * CSS class for the "Apply" filter button, allowing customization.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropApplyClass : Lyte.attr("string",{default:''}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropClearClass
			 * CSS class for the "Clear" filter button, allowing customization.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropClearClass : Lyte.attr("string",{default:''}) ,// No I18n
			/**
			 * @componentProperty { string } cxPropComparatorPlaceholder
			 * Placeholder text for comparator selection, allowing user guidance.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropComparatorPlaceholder : Lyte.attr("string",{default:''}) ,// No I18n
			/**
			 * @componentProperty { number } cxPropMaxFilter
			 * Maximum limit for filters, if applicable.
			 * @author authorName
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxFilter : Lyte.attr('number',{default:-1}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropUnselectComparator=false
			 * Allows for unselecting the comparator if enabled.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropUnselectComparator : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { object } cxPropDateComparaTors
			 * Contains date comparators for various time references, such as today, tomorrow, and other relative time periods.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropDateComparaTors : Lyte.attr("object",{default:{"today": "${TODAY}","tomorrow": "${TOMORROW}","tommorow_onwards": "${TOMORROWPLUS}","yesterday": "${YESTERDAY}","this_week": "${THISWEEK}","this_month": "${THISMONTH}","last_week": "${LASTWEEK}","last_month": "${LASTMONTH}","this_year": "${THISYEAR}","current_fy": "${THISFY}","current_fq": "${THISFQ}","last_year": "${LASTYEAR}","previous_fy": "${PREVFY}","previous_fq": "${PREVFQ}","next_year": "${NEXTYEAR}","next_fy": "${NEXTFY}","next_fq": "${NEXTFQ}" ,"last7days": "${last7days}" ,"last30days": "${last30days}" ,"thisWeek": "${thisWeek}" ,"thisMonth": "${thisMonth}" ,"specificDate": "${specificDate}" ,"customRange": "${customRange}"}}),	//no i18n
			/**
			 * @componentProperty { array } cxPropTimeOptions
			 * Provides an array of time options (days, weeks, months) for selection.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropTimeOptions :  Lyte.attr("array",{default:[{"name":_cruxUtils.getI18n("days"),"api_val":"DAYS"},{"name":_cruxUtils.getI18n("weeks"),"api_val":"WEEKS"},{"name":_cruxUtils.getI18n("months"),"api_val":"MONTHS"}]}),	//no i18n
			/**
			 * @componentProperty { object } cxPropEncryptFldComparator
			 * Holds comparison properties for encrypted fields, allowing for specific field comparisons.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropEncryptFldComparator : Lyte.attr('object',{default:{}}),	//no i18n
			// Indicates whether filtering is enabled in the component.
			enableFilter : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Indicates whether the clear functionality is enabled for the component.
			enableClear : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Stores the filter query parameters as an array, used for applying filters in the component.
			filterQuery : Lyte.attr("array",{default:[]}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropShowClear=false
			 * Determines whether the clear button should be displayed in the component.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropShowClear : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Holds an array of filters to be applied to the component upon initialization or on specific actions.
			getBackfilter : Lyte.attr("array",{default:[]}) ,// No I18n
			// Specifies the starting index for operations or data retrieval, with minimum and maximum constraints.
			firstIndex : Lyte.attr("number",{default:0}) ,// No I18n
			// Indicates whether the component should re-render under certain conditions.
			reRender : Lyte.attr("boolean",{default:true}) ,// No I18n
			// Specifies whether a "between" filter is applied to the component's data.
			isBetween : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Indicates whether filtering should be applied at the initial load of the component.
			filterAtfirst : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropFilterButton=false
			 * Determines whether the filter button is enabled and visible in the component.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropFilterButton : Lyte.attr("boolean",{default:false}) ,// No I18n
			/**
			 * @componentProperty { boolean } cxPropClearButton=false
			 * Specifies whether the clear button is enabled and visible in the component.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropClearButton : Lyte.attr("boolean",{default:false}) ,// No I18n
			// Provides the text for the clear button, which can be internationalized.
			clearZcqa : Lyte.attr("string",{default:"clear_filter"}) ,// No I18n
			// Provides the text for the apply button, which can be internationalized.
			applyZcqa : Lyte.attr("string",{default:"apply_filter"}) ,// No I18n
			// Defines the display fields for various modules, used for rendering data in the component.
			head: Lyte.attr("object", { default: typeof crmConstants !== 'undefined' ? crmConstants.moduleDisplayField : {"Leads":["Full_Name","Last_Name"],"Activities":["Subject"],"Accounts":["Account_Name"],"Contacts":["Full_Name"],"Deals":["Deal_Name"],"Potentials":["Deal_Name"],"Campaigns":["Campaign_Name"],"Cases":["Subject"],"Solutions":["Solution_Title"],"Products":["Product_Name"],"Vendors":["Vendor_Name"],"PriceBooks":["Price_Book_Name"],"Quotes":["Subject"],"SalesOrders":["Subject"],"PurchaseOrders":["Subject"],"Invoices":["Subject"], "Visits" : ["Visited_Page"]}}),//no i18n
			// Holds a maximum search comparator value, used for filtering or sorting operations.
			maxSearchComparator : Lyte.attr("string",{default:undefined}) ,// No I18n
			// Stores an array of values that are used to determine if a certain value falls between specified thresholds.
			isBetweenArr : Lyte.attr("array",{default:[]}), // No I18n
			/**
			 * @componentProperty { boolean } cxPropAria=false
			 * Indicates whether ARIA attributes should be enabled for accessibility support in the component.
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropAria : Lyte.attr('boolean', {default : false}),
			cxPropApiNameMapping: Lyte.attr("object", { default: typeof moduleApiVsNameMapping !== 'undefined' ? moduleApiVsNameMapping  : {}}),
			cxPropTimeZone: Lyte.attr("string", { default: (typeof Crm !== "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30") }),//No I18n
			cxPropAppearance: Lyte.attr("string", { default: "box" }),//No I18n
			enableEmptyOrNotempty: Lyte.attr('object', { default: {}})
		}
	},
	showFilter :function(arg){
		if(!arg.newValue){
			this.setData({'isBetween':false,'isBetweenArr':[],'addSearch':false,'filterQuery':[],'currentQuery':[]})// no i18n
		}else{
			this.initialSetup()
		}
	}.observes('cxPropShowFilter'),//no i18n
    didConnect : function(){
      	this.initialSetup()
    },
    initialSetup : function(){
      if(this.getMethods('setLookupFilterConditions')){
		if(this.getData('cxPropDisableFilter')){ // no i18n
			this.setData('enableFilter',false); // no i18n 
			this.setData('enableClear',false); // no i18n
		}
		a=this.executeMethod('setLookupFilterConditions',this); //No I18N
		this.setData('cxPropContent',Object.assign({},this.data.cxPropContent,a)); //no i18n
	  }
	  this.displayChanged();
    },
    displayChanged : function(){
    	var headerFields = this.getData('cxPropDisplayFields').slice();	//no i18n
    	var placeHolder = this.getData('cxPropPlaceHolder');	//no i18n
		var cxPropOnlyFilterable = this.getData('cxPropOnlyFilterable');//no i18n
		for(var i=0,len=headerFields.length;i<len;i++){
			if (headerFields[i].id && (!headerFields[i].yield && !(headerFields[i].ui_type === 116 && headerFields[i].formula && headerFields[i].formula.dynamic) && (!headerFields[i].noFilter && !headerFields[i].cxNoFilter) && !(cxPropOnlyFilterable.length && headerFields[i][cxPropOnlyFilterable] === false) && headerFields[i].ui_type !== 777 && headerFields[i].ui_type !== 776 && (headerFields[i].address == null || (headerFields[i].address.type !== 'latitude' && headerFields[i].address.type !== 'longitude')))) { //eslint-disable-line eqeqeq
		  		this.setData({'firstIndex':i,'cxPropHeaderFields':headerFields.slice(i)});	//no i18n
				break;
	  		}
		}
		var headerFields = this.getData('cxPropHeaderFields');	//no i18n
		for(var i=0,len=headerFields.length;i<len;i++){
			// if (typeof headerFields[i].filterProperties !== 'object' && typeof headerFields[i].filterProperties !== 'undefined' && headerFields[i].filterProperties !== '{}'){
			// 	headerFields[i].filterProperties = JSON.parse(headerFields[i].filterProperties);
			// }
			if (typeof headerFields[i].filterProperties !== 'object' && typeof headerFields[i].filterProperties !== 'undefined' && headerFields[i].filterProperties !== '{}') {
				try {
					headerFields[i].filterProperties = JSON.parse(headerFields[i].filterProperties.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":'));
				} catch (error) {
					// console.error("Invalid JSON format: ", error);
				}
			}
			var obj = typeof headerFields[i].filterProperties === 'object' ? headerFields[i].filterProperties : {};
		  		if(placeHolder[headerFields[i].ui_type]){
					obj.placeholder = placeHolder[headerFields[i].ui_type]
		  		}else if(placeHolder[headerFields[i].cxTypeMapping]){
		  			obj.placeholder = placeHolder[headerFields[i].cxTypeMapping]
		  		}
		  		if(headerFields[i].cxPropType){
		  			obj.type = headerFields[i].cxPropType
		  		}
		  		if(headerFields[i].maxLimit){
		  			obj.maxLimit = headerFields[i].maxLimit
		  		}
		  		if(headerFields[i].maxLength){
		  			obj.maxlength = headerFields[i].maxLength
		  		}
		  		if(headerFields[i].disableExtraValue !== undefined){
		  			obj.disableExtraValue = headerFields[i].disableExtraValue
		  		}
		  		if(headerFields[i].cxPropDecimalAllowed !== undefined){
		  			obj.decimalAllowed = headerFields[i].cxPropDecimalAllowed
		  		}
		  		if(headerFields[i].freeze !== undefined){
		  			obj.freeze = headerFields[i].freeze
		  		}
		  		if(headerFields[i].maxValue){
		  			obj.maxvalue = headerFields[i].maxValue
		  		}
		  		if(headerFields[i].cxTypeMapping === 'boolean'){
		  			obj.noneSelected = true
		  		}
				if(headerFields[i].userQueryParams){
		  			obj.queryParam = headerFields[i].userQueryParams
		  		}
				if (headerFields[i] && headerFields[i].filterProperties && headerFields[i].filterProperties.cxDateselect === 'dateselect'){
					headerFields[i].cxDateselect = headerFields[i].filterProperties.cxDateselect
		  		}
		  		headerFields[i].filterProperties = JSON.stringify(obj);

			const fieldKey = headerFields[i] && (headerFields[i].id || headerFields[i].api_name);
				if (fieldKey && this.data.enableEmptyOrNotempty && this.data.enableEmptyOrNotempty[fieldKey] && this.data.enableEmptyOrNotempty[fieldKey].hasemptyOrNotempty === true) {
					Lyte.objectUtils(this.data.enableEmptyOrNotempty[fieldKey], "add", "hasemptyOrNotempty", false);
				}
		}
		this.setData('cxPropHeaderFields',headerFields);	//no i18n
	    this.displayFilter();
	},
	fieldChanged : function(){
		this.displayChanged();
	}.observes('cxPropDisplayFields'),	//no i18n
	onOpenFilter : function(){
        var cxPropShowFilter = this.getData('cxPropShowFilter');	//no i18n
        if(cxPropShowFilter){
            var tableComp = $L(this.$node).parents('lyte-table');	//no i18n
            if(tableComp && tableComp[0]){
                tableComp[0].scrollTable();
            }
        }
	}.observes('cxPropShowFilter'),	//no i18n

	buildFilterQuery: function (index, elem, value, selected, date, startDate, endDate, dat, itm){
		var dispIndex = this.getData('firstIndex') + index;
			var filterQuery = JSON.parse(JSON.stringify(this.getData('filterQuery')))  // no i18n
			//value = (typeof selected==='string')?selected:value; //no i18n
			var fld
			var obj = (filterQuery[index])?filterQuery[index]:{} ,cxPropComparator = this.getData('cxPropComparator');
			var content = this.getData('cxPropContent'),headerFields = this.getData('cxPropHeaderFields'),isBetweenArr=this.getData('isBetweenArr');  // no i18n
			var datePattern = this.getData('cxPropDatePattern');	//no i18n
			var noOverride = headerFields[index].noOverride
			if( !filterQuery[index]){
				 var head={"Leads":["Full_Name","Last_Name"],"Activities":["Subject"],"Accounts":["Account_Name"],"Contacts":["Full_Name"],"Deals":["Deal_Name"],"Potentials":["Deal_Name"],"Campaigns":["Campaign_Name"],"Cases":["Subject"],"Solutions":["Solution_Title"],"Products":["Product_Name"],"Vendors":["Vendor_Name"],"PriceBooks":["Price_Book_Name"],"Quotes":["Subject"],"SalesOrders":["Subject"],"PurchaseOrders":["Subject"],"Invoices":["Subject"], "Visits" : ["Visited_Page"]}; //No I18N
				if(headerFields[index].data_type==='lookup' || headerFields[index].cxTypeMapping==='lookup'){
					var lName =  head[headerFields[index].lookup.module.api_name] ? head[headerFields[index].lookup.module.api_name][0] : 'Name'
					fld = headerFields[index].api_name + '.' + lName
				}else{
					fld=headerFields[index].api_name
				}
				if(cxPropComparator){
					var cxPropFormulaUitypes = this.getData('cxPropFormulaUitypes'), cxPropContent = this.getData('cxPropContent');	//no i18n
					var x = Lyte.Component.registeredHelpers.cruxLookupFilterComparator.call(this,headerFields[index],cxPropFormulaUitypes,cxPropContent)[0].api_val;
				}
				obj.field ={api_name:fld,id:headerFields[index].id};
				if(x === 'in_the_last' || x === 'due_in'){
					obj.ageIn = x;
					x = 'equal';
				}
				obj.comparator = x;

			}
			if(!cxPropComparator){
				var datatypeComparator = this.getData('cxPropDatatypeComparator')	//no i18n
				var comps = Object.keys(datatypeComparator),x, l = comps.length
				if(l){
					for(var i = 0; i < l;i++){
						var type = headerFields[index].data_type === 'formula' ? headerFields[index].formula.return_type : headerFields[index].data_type === 'rollup_summary' ? headerFields[index].rollup_summary.return_type : headerFields[index].data_type
						if(datatypeComparator[comps[i]].indexOf(type) > -1){
							x = comps[i];
							break;
						}
					}
				}else{
					var defaultComparator = this.getData('cxPropDefaultComparator')	//no i18n
					comps = Object.keys(defaultComparator), l = comps.length
					for(var i = 0; i < l;i++){
						if(defaultComparator[comps[i]].indexOf(headerFields[index].ui_type) > -1){
							x = comps[i];
							break;
						}
					}
				}
				// obj.comparator = x;
				var lyteDateSelect = this.data.cxPropDisplayFields.cruxFilterBy({ "id": obj.field.id })[0].cxDateselect
				if (lyteDateSelect === 'dateselect') {
					obj.comparator = 'between';
				} else {
					obj.comparator = x;
				}

			}
			var cxPropDateComparaTors = this.getData('cxPropDateComparaTors');
			if( obj.ageIn ){
				Object.values(cxPropDateComparaTors).includes(obj.value);
				var time = this.$node.querySelector("#cruxElem" + dispIndex + "Time").component.getValue();
				var number = this.$node.querySelector("#cruxElem" + dispIndex + "Number").component.getValue();
				obj.value = obj.ageIn === "in_the_last" ? "${AGEIN" : "${DUEIN";
				obj.value = obj.value + time.toUpperCase() +"}+"+number;				
			} else if(isBetweenArr[dispIndex]){ //no i18n
				var elem = this.$node.querySelectorAll('.cxCriteriaInputSection')[index],compName=elem.firstElementChild.tagName,elems = elem.querySelectorAll(compName),val =[]
				if(headerFields[index].data_type==='datetime' || headerFields[index].cxTypeMapping==='date-time'){
					var dateCheck = $L.moment(elems[1].component.getValue(), datePattern.toUpperCase()).validate()
					val[1]= dateCheck ? noOverride? this.getEndMinute(elems[1].component.getValue(), datePattern.toUpperCase()) : this.getISODateTime(elems[1].component.getValue(),datePattern,'end',undefined ,false) : elems[1].component.getValue();
					dateCheck = $L.moment(elems[0].component.getValue(), datePattern.toUpperCase()).validate()
					val[0]= dateCheck ? noOverride? this.getStartMinute(elems[1].component.getValue(), datePattern.toUpperCase()) : this.getISODateTime(elems[0].component.getValue(),datePattern,'start',undefined ,false) : elems[0].component.getValue();
				}else if(headerFields[index].data_type==='date' || headerFields[index].cxTypeMapping==='date'){
					var dateCheck = $L.moment(elems[1].component.getValue(), datePattern.toUpperCase()).validate()
					val[1] = dateCheck ? this.getDate(elems[1].component.getValue()) : elems[1].component.getValue()
					dateCheck = $L.moment(elems[0].component.getValue(), datePattern.toUpperCase()).validate();
					val[0]= dateCheck ? this.getDate(elems[0].component.getValue()) : elems[0].component.getValue()
				}else{
					val[1] = elems[1].component.getValue()
					val[0] = elems[0].component.getValue()
				}
				obj.value = val;
			}else if(headerFields[index].data_type==='date' || headerFields[index].cxTypeMapping==='date'){
				var dateCheck = $L.moment(elem.component.getValue(), datePattern.toUpperCase()).validate()
				obj.value = dateCheck ? this.getDate(elem.component.getValue()) : value ? value : '';
			}
			else if(headerFields[index].data_type==='datetime' || headerFields[index].cxTypeMapping==='date-time'){
				var dateCheck = $L.moment(elem.component.getValue(), datePattern.toUpperCase()).validate()
				if(!dateCheck){
						obj.value = value;
				}else{
					if(obj.comparator === 'equal' || obj.comparator === 'not_equal' || obj.comparator==='between' || obj.comparator==='not_between'){  // no i18n
							if(obj.comparator === 'equal'){  // no i18n
								obj.comparator = 'between'  // no i18n
							}else if(obj.comparator === 'not_equal'){  // no i18n
								obj.comparator = 'not_between'  // no i18n
							}
							var val = []
							val[0] = noOverride ? this.getStartMinute(value, datePattern.toUpperCase()) : this.getISODateTime(value, datePattern, 'start', undefined , false);
							val[1]= noOverride? this.getEndMinute(value, datePattern.toUpperCase()) : this.getISODateTime(value,datePattern,'end',undefined ,false);
							obj.value = val;
						}else if(obj.comparator === 'less_than'){ // no i18n
							obj.value = noOverride? this.getStartMinute(value, datePattern.toUpperCase()) : this.getISODateTime(value,datePattern,'start',undefined ,false);
						}else{
							obj.value = noOverride? this.getEndMinute(value, datePattern.toUpperCase()) : this.getISODateTime(value,datePattern,'end',undefined ,false);
						}
				}
			}else if(headerFields[index].data_type==='boolean' || headerFields[index].cxTypeMapping==='boolean'){
				obj.value = value === -1 ? undefined : value ? 'true' : 'false';
			}else{				
				obj.value = value;

				if (this.data.cxPropDisplayFields.cruxFilterBy({ id: obj.field.id })[0].cxDateselect === 'dateselect') {
					const userZone = this.getData("cxPropTimeZone");

					const formatDateTime = (date) => {
						const pad = (num) => (num < 10 ? "0" + num : num);

						const year = date.getFullYear();
						const month = pad(date.getMonth() + 1);
						const day = pad(date.getDate());
						const hours = pad(date.getHours());
						const minutes = pad(date.getMinutes());
						const seconds = pad(date.getSeconds());
						const timezone = userZone.replace('.', ':');

						return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
					};

					const getStartAndEndOfDay = (date) => [
						new Date(date.setHours(0, 0, 0, 0)),
						new Date(date.setHours(23, 59, 59, 999))
					];

					const calculateRange = (start, end) => [
						// Example code : Will use it later
						// $L.moment().startOf('date').format(),
						// $L.moment().endOf('date').format(),

						formatDateTime(new Date(start)),
						formatDateTime(new Date(end))
					];

					switch (value) {
						case "today": {
							const [start, end] = getStartAndEndOfDay(new Date());
							obj.value = calculateRange(start, end);
							break;
						}
						case "yesterday": {
							// Example code : Will use it later
							// $L.moment().format();
							// $L.moment().subtract(1, 'date').endOf('date').format();
							const yesterday = new Date();
							yesterday.setDate(yesterday.getDate() - 1);
							const [start, end] = getStartAndEndOfDay(yesterday);
							obj.value = calculateRange(start, end);
							break;
						}
						case "last7days": {
							const start = new Date();
							start.setDate(start.getDate() - 7);
							const [dayStart] = getStartAndEndOfDay(start);
							const [, dayEnd] = getStartAndEndOfDay(new Date());
							obj.value = calculateRange(dayStart, dayEnd);
							break;
						}
						case "last30days": {
							const start = new Date();
							start.setDate(start.getDate() - 30);
							const [dayStart] = getStartAndEndOfDay(start);
							const now = new Date();
							obj.value = calculateRange(dayStart, now);
							break;
						}
						case "thisWeek": {
							const now = new Date();
							const startOfWeek = new Date(now);
							startOfWeek.setDate(now.getDate() - now.getDay());
							const endOfWeek = new Date(startOfWeek);
							endOfWeek.setDate(startOfWeek.getDate() + 6);
							const [weekStart] = getStartAndEndOfDay(startOfWeek);
							const [, weekEnd] = getStartAndEndOfDay(endOfWeek);
							obj.value = calculateRange(weekStart, weekEnd);
							break;
						}
						case "thisMonth": {
							const now = new Date();
							const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
							const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
							const [monthStart] = getStartAndEndOfDay(startOfMonth);
							const [, monthEnd] = getStartAndEndOfDay(endOfMonth);
							obj.value = calculateRange(monthStart, monthEnd);
							break;
						}
						case "specificDate": {
							if (startDate) {
								const [specificStart, specificEnd] = getStartAndEndOfDay($L.moment(startDate, this.data.cxPropDatePattern.toUpperCase()).toDate());
								obj.value = calculateRange(specificStart, specificEnd);
							} else {
								obj.value = null;
							}
							break;
						}
						case "customRange": {
							if (startDate && endDate) {
								const [customStart] = getStartAndEndOfDay($L.moment(startDate, this.data.cxPropDatePattern.toUpperCase()).toDate());
								const [, customEnd] = getStartAndEndOfDay($L.moment(endDate, this.data.cxPropDatePattern.toUpperCase()).toDate());
								obj.value = calculateRange(customStart, customEnd);
							} else {
								obj.value = null;
							}
							break;
						}
						case "anytime":
							this.enableFilter = true;
						default:
							obj.value = null;
							break;
					}
				}
			}
			filterQuery.forEach((item, itemIndex) => {
				if (item && (item.value === "" || (Array.isArray(item.value) && item.value.length === 0))) {
					filterQuery[itemIndex] = null;
				}
			});
			filterQuery[index] = obj;
			this.dispFilterApply=false;
			this.setData('filterQuery',filterQuery); //no i18n

			var fObj = this.getFilterQuery();
			const isFilterEnabled = this.getData('cxPropDisableFilter') && (fObj && (fObj.comparator || fObj.group_operator)) && (obj.value !== "" || obj.value !== null); // no i18n
			this.setData('enableFilter',this.enableFilter || isFilterEnabled); // no i18n
			this.setData('enableClear',this.enableFilter || isFilterEnabled); // no i18n
	},
	methods: {
		beforeShow: function(arg1,arg2){
			if(this.getMethods("onBeforeShow")){
	    		return this.executeMethod("onBeforeShow",arg1,arg2);
	    	}
		},
		beforeHide: function(arg1,arg2){
			if(this.getMethods("onBeforeHide")){
	    		return this.executeMethod("onBeforeHide",arg1,arg2);
	    	}
		},
		show: function(arg1,arg2){
			if(this.getMethods("onShow")){
	    		this.executeMethod("onShow",arg1,arg2);
	    	}
		},
		hide: function(arg1,arg2){
			if(this.getMethods("onHide")){
	    		this.executeMethod("onHide", arg1,arg2);
	    	}
		},
		queryBuild : function(index,elem,event,currentItem){
			var dispIndex = this.getData('firstIndex') + index;
			var headerFields = this.getData('cxPropHeaderFields'),fld; //No I18n
			var head=this.getData('head'); //No I18N
			var filterQuery = JSON.parse(JSON.stringify(this.getData('filterQuery'))), isBetweenArr = this.getData('isBetweenArr').slice()  // no i18n
			var obj = (filterQuery[index]) ?filterQuery[index]:{},cruxTagname=headerFields[index].cxTypeMapping;
			var datePattern = this.getData('cxPropDatePattern');
			var noOverride = headerFields[index].noOverride
			var cxPropDateComparaTors = this.getData('cxPropDateComparaTors');
			var fI = this.getData('firstIndex');	//no i18n
			var cruxElem = this.$node.querySelector('#cruxElem' + (index + fI));
			const fieldKey = headerFields[index] && (headerFields[index].id || headerFields[index].api_name);
			if(!noOverride){
				if (cruxTagname==='lookup' || cruxTagname==='text' || cruxTagname==='email' || cruxTagname==='multi-picklist' || cruxTagname==='twitter' || cruxTagname==='phone' || cruxTagname==='text-area' || cruxTagname==='website' || headerFields[index].ui_type === '100'){
					cruxTagname='text' //no i18n
				}else if(cruxTagname==='date-time'){	//no i18n
					cruxTagname='date'	//no i18n
				}
			}
			if(headerFields[index].data_type==='lookup' || headerFields[index].cxTypeMapping==='lookup'){
				var mod = (typeof headerFields[index].lookup.module === 'object')? headerFields[index].lookup.module.api_name : headerFields[index].lookup.module;
				mod = this.data.cxPropApiNameMapping[mod];
				var lName = head[mod] && head[mod][0] ? head[mod][0] : 'Name';
				fld = headerFields[index].api_name + '.' + lName;
			}
			else{
				fld = headerFields[index].api_name
			}
			// Start - Below Code for multiModuleLookup support, Need to get approval from Visual team. Followup by vignesh.bp@zohocorp.com - CRM Automation Team (Remove above if else check and use the below one)

			// if (headerFields[index].ui_type === 132) {
			// 	let mod = (typeof headerFields[index].lookup.module === 'object') ? headerFields[index].lookup.module : { api_name: headerFields[index].lookup.module };
			// 	const mappedMod = this.data.cxPropApiNameMapping[mod.api_name];
			// 	const relatedField = head[mappedMod] && head[mappedMod][0] ? head[mappedMod][0] : 'Name';

			// 	fld = headerFields[index].api_name + '->' + mappedMod + '.' + relatedField;
			// } else if (headerFields[index].data_type === 'lookup' || headerFields[index].cxTypeMapping === 'lookup') {
			// 	let mod = (typeof headerFields[index].lookup.module === 'object') ? headerFields[index].lookup.module.api_name : headerFields[index].lookup.module;
			// 	mod = this.data.cxPropApiNameMapping[mod];
			// 	let lName = head[mod] && head[mod][0] ? head[mod][0] : 'Name';
			// 	fld = headerFields[index].api_name + '.' + lName;
			// } else {
			// 	fld = headerFields[index].api_name;
			// }

			// End - above Code for multiModuleLookup support, Need to get approval from Visual team. Followup by vignesh.bp@zohocorp.com - CRM Automation Team (Remove above if else check and use the below one)

			if ( !this.data.enableEmptyOrNotempty[fieldKey] ){
				Lyte.objectUtils(this.data.enableEmptyOrNotempty, "add", fieldKey, {});
			}	
			Lyte.objectUtils(this.data.enableEmptyOrNotempty[fieldKey], "add", "hasemptyOrNotempty", false);
			if( currentItem !== 'in_the_last' && currentItem !== 'due_in' ){
				delete obj.ageIn;
				filterQuery[index] = obj;
				this.setData('filterQuery',filterQuery) // no i18n
				Lyte.Component.registeredHelpers.cruxDateFilterComparator.bind(this,filterQuery,dispIndex,this.getData('firstIndex'))();
			}
			var inputElem=elem.parentElement.querySelectorAll('crux-'+cruxTagname+'-component')//no i18n
			if( currentItem === 'in_the_last' || currentItem === 'due_in' ){
				obj.ageIn = currentItem;
				filterQuery[index] = obj;
				this.setData('filterQuery',filterQuery) // no i18n
				Lyte.Component.registeredHelpers.cruxDateFilterComparator.bind(this,filterQuery,dispIndex,this.getData('firstIndex'))();
				this.$node.querySelector("#cruxElem" + dispIndex + "Number").cxProp("disabled",false);
				this.$node.querySelector("#cruxElem" + dispIndex + "Time").cxProp("disabled",false);
			} else if( currentItem === 'empty' || currentItem === 'notempty' || currentItem === 'blocked' || currentItem === 'notblocked' || cxPropDateComparaTors[currentItem]){
				obj.field ={api_name: fld,id:headerFields[index].id};
				if( currentItem === 'blocked' || currentItem === 'notblocked' ){
					obj.comparator = (currentItem === 'blocked') ? 'equal' : 'not_equal';	//no i18n
					obj.value = '${BLOCKED}';
				}else if(currentItem === 'empty' || currentItem === 'notempty'){
					obj.comparator = 'equal';  // no i18n
					obj.value = (currentItem === 'notempty') ? '${NOTEMPTY}':'${EMPTY}';		  // no i18n
						if (!this.data.enableEmptyOrNotempty[fieldKey]) {
							Lyte.objectUtils(this.data.enableEmptyOrNotempty, "add", fieldKey, {});
						}
						Lyte.objectUtils(this.data.enableEmptyOrNotempty[fieldKey], "add", "hasemptyOrNotempty", true);
						var shouldRenderEmptyOrNotempty = this.data.enableEmptyOrNotempty[fieldKey].hasemptyOrNotempty;
						if (shouldRenderEmptyOrNotempty === true) {
							var emptyConditionInputElem = this.$node.querySelector('#emptyConditionInput' + (index + fI));
							if (emptyConditionInputElem) {
								emptyConditionInputElem.setData('ltPropValue', obj.value);
							}
						}
					if (cruxElem) {
						cruxElem.setData('cxPropValue', obj.value);
					}
				}else {
					obj.comparator = 'equal';  // no i18n
					obj.value = cxPropDateComparaTors[currentItem];
				}
				isBetweenArr[dispIndex]=false
				this.setData({'isBetweenArr':isBetweenArr,'cxPropHeaderFields':headerFields}) //no i18n
				obj.empty = true;
				var l = inputElem.length
				for(var i=0;i<l;i++){
					inputElem[i].cxProp('disabled',true);//no i18n
				}
			} else if(currentItem === 'between' || currentItem === 'not_between'){
				obj.field ={api_name: fld,id:headerFields[index].id};
				obj.comparator = currentItem;
				isBetweenArr[dispIndex]=true
				var _this = this
				var l = inputElem.length
				var arr = [];
				if(obj && obj.value && (obj.value==="${EMPTY}" || obj.value==="${NOTEMPTY}" || obj.value === '${BLOCKED}' || Object.values(cxPropDateComparaTors).includes(obj.value))){
					obj.value='';
				}
				for(var i=0;i<l;i++){
					var e =inputElem[i]
					if(headerFields[index].data_type==='datetime' || headerFields[index].cxTypeMapping==='date-time'){
						var dateCheck = $L.moment(e.component.getValue(), datePattern.toUpperCase()).validate();
						arr[i]= dateCheck ? noOverride ? this.getStartMinute(e.component.getValue(), datePattern.toUpperCase()) : _this.getISODateTime(e.component.getValue(),datePattern,'start',undefined,false) : e.component.getValue();
					}else if(headerFields[index].data_type==='date' || headerFields[index].cxTypeMapping==='date'){
						var dateCheck = $L.moment(e.component.getValue(), datePattern.toUpperCase()).validate();
						arr[i] = dateCheck ? this.getDate(e.component.getValue()) : e.component.getValue()
					}else{
						arr[i] = e.component.getValue()
					}
					e.cxProp('disabled',false);	//no i18n
				}
				obj.value = arr;
				this.setData({'isBetweenArr':isBetweenArr,'isBetween':true,'cxPropHeaderFields':headerFields}) //no i18n
				this.displayFilter(index)
			} else {
				obj.field ={api_name: fld,id:headerFields[index].id};
				if(headerFields[index].data_type==='datetime' || headerFields[index].cxTypeMapping==='date-time'){
					var x
					if(currentItem === 'equal'){  // no i18n
						obj.comparator = 'between'  // no i18n
						x=true
					}else if(currentItem === 'not_equal'){  // no i18n
						obj.comparator = 'not_between'  // no i18n
						x=true
					}else {
						obj.comparator=currentItem
					}
					if( x && obj.value ){
						var value = inputElem[0].component.getValue()
						var value=(typeof value!=='string')?value[0]:value
						var val = []
						var dateCheck = $L.moment(value, datePattern.toUpperCase()).validate();
						val[0]= dateCheck ? noOverride ? this.getStartMinute(value) : this.getISODateTime(value,datePattern,'start' , undefined , false) : value;
						val[1] = dateCheck ? noOverride ? this.getEndMinute(value, datePattern.toUpperCase()) : this.getISODateTime(value, datePattern, 'end', undefined, false) : value;
						obj.value = val;
					}else{
						var v = inputElem[0].component.getValue(), dateCheck = $L.moment(v, datePattern.toUpperCase()).validate();
						if(currentItem === 'greater_than'){	//no i18n
							obj.value = Array.isArray(v) && v.length ? v[0] : dateCheck ? noOverride ? this.getEndMinute(v, datePattern.toUpperCase()) : this.getISODateTime(v,datePattern,'end',undefined ,false) : v;
						}else if(currentItem === 'less_than'){	//no i18n
							obj.value = Array.isArray(v) && v.length ? v[1] : dateCheck ? noOverride ?this.getStartMinute(v, datePattern.toUpperCase()) : this.getISODateTime(v,datePattern,'start',undefined ,false) : v;
						}else{
							obj.value = ( typeof v !=='string' && obj.value ) ? obj.value[0] : dateCheck ? noOverride ? this.getStartMinute(v, datePattern.toUpperCase()) : this.getISODateTime(v,datePattern,'start',undefined ,false) : v; //eslint-disable-line valid-typeof
						}
					}
				}else if(headerFields[index].data_type==='date' || headerFields[index].cxTypeMapping==='date'){	//no i18n
					obj.comparator = currentItem;
					var dateCheck = $L.moment(inputElem[0].component.getValue(), datePattern.toUpperCase()).validate();
					obj.value = dateCheck ? this.getDate(inputElem[0].component.getValue()) : inputElem[0].component.getValue()
				}
				else{
					obj.comparator = currentItem;
				}
				if(obj && obj.value && (obj.value==="${EMPTY}"||obj.value==="${NOTEMPTY}" || obj.value === '${BLOCKED}' || Object.values(cxPropDateComparaTors).includes(obj.value))){
					obj.value='';
					if (cruxElem) {
						cruxElem.setData('cxPropValue', obj.value);
					}
				}
				isBetweenArr[dispIndex]=false
				this.setData({'isBetweenArr':isBetweenArr,'cxPropHeaderFields':headerFields}) //no i18n
				obj.value =( headerFields[index].cxTypeMapping==='date' || headerFields[index].cxTypeMapping==='date-time')?obj.value : inputElem[0].component.getValue()	//no i18n
				var l=inputElem.length
				for(var i=0;i<l;i++){
					inputElem[i].cxProp('disabled',false);	//no i18n
				}
			}
			if(this.getData('cxPropUnselectComparator') && currentItem === '-1' ){
				delete filterQuery[index]
			}else{
				filterQuery[index] = obj;
			}
			 this.dispFilterApply=false
			this.setData('filterQuery', filterQuery) //no i18n
			 var fObj = this.getFilterQuery();
			 this.setData('enableFilter',this.getData('cxPropDisableFilter') && (fObj.comparator || fObj.group_operator)); // no i18n
			 this.setData('enableClear',this.getData('cxPropDisableFilter') && (fObj.comparator || fObj.group_operator)); // no i18n 
		},
		queryBuildComp : function(index,elem,value, selected){
			this.buildFilterQuery(index, elem, value, selected);
		},

		queryBuildCompDateselect : function(index,elem,value, selected, date, startDate, endDate, dat, itm){
			var value = date;
			this.buildFilterQuery(index, elem, value, selected, date, startDate, endDate, dat, itm);
		},
        lookupFilterDropdownOpened: function(ev, comp) {
            $L(comp.childComp).addClass('cxDropbox');
			if(this.getMethods('onShow')){
				this.executeMethod('onShow',ev,comp)
			}
        },
		lookupFilterDropdownClosed: function(){
			if(this.getMethods('onHide')){
				this.executeMethod('onHide')
			}
		},
        onBeforeAdd : function(elemName,value,selectedArray){
        	if(elemName === 'picklist' || elemName === 'user'){
        		if(this.getMethods("picklistAdd")){
        			return this.executeMethod("picklistAdd",elemName,value,selectedArray);//No I18n
        		}
        	}
        	return true;
        },
      		userCompMaxLimitErr: function(limit){
					_cruxUtils.showCustomMessage({
						params: {
							ltPropType: "error", //No I18n
							ltPropMessage: _cruxUtils.getI18n("crux.comboBox.max.limit", limit, _cruxUtils.getI18n("crm.label.users")), //NO I18N
							ltPropDuration: "2000", //No I18n
							ltPropShow: true
						}
					});
				}
	},
	actions: {
		filterSetValue : function(type,event){
			if( event.keyCode===13 && this.getMethods("applyFilter")){
				if(type !== 'text' && type !== 'number' && type !== 'phone' && type !== 'date' 	//no i18n
					&& type !== 'twitter' && type !== 'phone' && type !== 'website' && type !== 'email' && type !== 'text-area'){	//no i18n
						return;
				}
				if(!this.getData('cxPropNoValidation')){ // no i18n
					var bool = this.validate();
				}
				if(this.getData('cxPropDisableFilter')){ // no i18n
					this.setData('enableFilter',false); // no i18n
					this.setData('enableClear',true); // no i18n
				}
				if (this.data.currentQuery && this.data.currentQuery.value !== ""){
					this.setData('enableClear', true);
				}
				this.executeMethod("applyFilter",this,event,bool);//No I18n
			}
		},
		clearFilter : function(){
			// this.getBackupFilterFcn() : Note - Testing code
			this.clearFilter();
			delete this.enableFilter;
		},
		onClickApply : function(elem,event){
			if(this.getMethods("applyFilter")){
				if(!this.getData('cxPropNoValidation')){ // no i18n
					var bool = this.validate();
				}
				if(this.getData('cxPropDisableFilter')){ // no i18n
					this.setData('enableFilter',false) // no i18n
				}
				this.executeMethod("applyFilter",this,event,bool);//No I18n
			}
		}
	},
	clearFilter : function(){
		if(this.getMethods("clearFilter")){
			this.executeMethod("clearFilter",this,event);//No I18n
		}
		if(this.getData('cxPropDisableFilter')){ // no i18n
			this.setData('enableFilter',false); // no i18n 
			this.setData('enableClear',false); // no i18n
		}
		var firstIndex = this.getData('firstIndex');	//no i18n
		var x=this.getData('cxPropDisplayFields')	// No I18n
			var l =x.length,i=0,headerFields=this.getData('cxPropHeaderFields'),cxPropContent=this.getData('cxPropContent'),filterQuery = this.getData('filterQuery');//no i18n
			for(;i<l;i++){
				const fieldKey = headerFields[i] && (headerFields[i].id || headerFields[i].api_name);
				if (fieldKey && this.data.enableEmptyOrNotempty && this.data.enableEmptyOrNotempty[fieldKey] && this.data.enableEmptyOrNotempty[fieldKey].hasemptyOrNotempty === true) {
					Lyte.objectUtils(this.data.enableEmptyOrNotempty[fieldKey], "add", "hasemptyOrNotempty", false);
				}

				if(filterQuery[i-firstIndex]){
					this.setData({'isBetweenArr':[],'isBetween':false})	//no i18n
					if(this.getData('cxPropComparator')){ // no i18n
						var ddElem = this.$node.querySelector('#cruxComparator'+i) //eslint-disable-line no-multipleDOMLookup
						var cxPropFormulaUitypes = this.getData('cxPropFormulaUitypes'), cxPropContent = this.getData('cxPropContent');	//no i18n
						var ddval = Lyte.Component.registeredHelpers.cruxLookupFilterComparator.call(this,headerFields[i],cxPropFormulaUitypes,cxPropContent)[0].api_val
						ddElem.cxProp('selected',ddval)//no i18n
					}
					this.setData('reRender',false)//no i18n
					this.setData('reRender',true)//no i18n
				}
			}
			this.displayFilter()
			this.setData('filterQuery',[]);//no i18n
	},
	getFilterQuery : function(){
		var filterQuery=this.getData('filterQuery'),query=[],q={},j=0, cxPropComparator = this.getData('cxPropComparator') //no i18n
		filterQuery.forEach(function(obj){
			if(obj && obj.field && (obj.comparator || !cxPropComparator) && obj.value){
				obj.value =  typeof obj.value === 'string' ? obj.value.trim(' ') : obj.value; // no i18n
				if(((Array.isArray(obj.value) && obj.value.length && obj.value[0] !== '' && obj.value[1] !== '' ) || (!Array.isArray(obj.value) &&(obj.value || obj.empty || obj.ageIn)))) {
					if(typeof obj.value === 'object'){
						obj.value=(obj.value && obj.value.id)?obj.value.id:obj.value;
						if(obj.value===null){
							obj.value='';
						}
					}else if(obj.ageIn && !obj.value[obj.value.indexOf('+')+1]){
						obj.value='';
						return;
					}
					delete obj.empty
					query[j]= obj
					j++;
				}
			}
		})
		if(query.length >= 1){
			if(query.length ===1){
				q=query[0]
			} else {
				q.group_operator = "AND" //no i18n
				q.group=query
			}
		} else {
			q = {}
		}
		this.setData('currentQuery',q);//no i18n
		return q;
	},
	elemsValidate : function(){
		var elements = this.getData('cxPropDisplayFields'),flag=true, l=(elements)?elements.length:0, filterQuery = this.getFilter() // no i18n
		var firstIdx = this.getData('firstIndex');
		for (var i = 0; i < l ;i++){
			var  elem = this.$node.querySelectorAll('#cruxElem'+(i+firstIdx)+":not(template)"),l1=elem.length
			for(var j=0;j<l1;j++){
				var elemValue = elem[j].component.getValue()
				elemValue =  Array.isArray(elemValue) ? elemValue.length : elemValue
				if(filterQuery[i] && elemValue && elem[j].tagName !== 'LYTE-DATESELECT'){
					flag = elem[j].component.validate();
					if(!flag){
						return flag;
					}
				}
			}
		}
		return flag;
	},
	getFilter : function(){
		var fQ = this.getData('filterQuery').slice() //no i18n
		return fQ
	},
	validate : function(){ 
		var betweenObj = this.betweenValidate();
		if(!this.elemsValidate() || (betweenObj && !betweenObj.bool)){
			return false;
		}
		return true;

	},
	betweenValidate : function(){
		var filterQuery = this.getData('filterQuery'),headerFields=this.getData('cxPropHeaderFields'),a,b,x={field:'',bool:true},_this=this// no i18n
		var fI = this.getData('firstIndex');	//no i18n
		const _enableFilter = this.enableFilter;
		if (_enableFilter === true) {
			return;
		}
		filterQuery.forEach(function(filter,index){
			if(filter!=null && (filter.comparator==='between' || filter.comparator==='not_between') && typeof filter.value!== 'string'){
				if(headerFields[index].cxTypeMapping == "date-time" || headerFields[index].cxTypeMapping == "date"){
					a = new Date(filter.value[0]);
					b = new Date(filter.value[1]);
					if(a.toJSON() == null || b.toJSON() == null){
						return false;
					}
				}else if(headerFields[index].cxTypeMapping == "number"){
					a = Number(filter.value[0]);
					b = Number(filter.value[1]);
					if(a === NaN || b === NaN){
						return false;
					}
				}else{
					a=filter.value[0];
					b=filter.value[1];
					if(!a || !b){
						var alertMessage = _cruxUtils.getI18n("crm.field.valid.check",headerFields[index].display_label);
						return false;
					}
				}
				if( a >= b ){
					x.field=headerFields[index]
					x.bool= false;
					var cruxElem = _this.$node.querySelector('#cruxElem'+(index+fI))	//no i18n
					if(cruxElem){
						var inpElem = cruxElem.querySelector('input') //no i18n
					}
					if(x.field.data_type == "datetime" || x.field.data_type == "date"){
						var alertMessage = _cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"); // no i18n
					}else{
						var alertMessage = _cruxUtils.getI18n('crm.custom.field.less.than.to1')//no i18n
					}
					if(cruxElem && cruxElem.component && typeof cruxElem.component.showAlert === "function"){
						cruxElem.component.showAlert(alertMessage,inpElem)
					}
					return false
				}
			}
		})
		delete this.enableFilter;
		return x;
	},

    displayFilter : function(index){
    		var firstIndex = this.getData('firstIndex');
		var dispIndex = firstIndex + index, displayFields = this.getData('cxPropDisplayFields');
		var getBackfilter = this.getData('getBackfilter'),gbf = [],gbl=getBackfilter.length	// No I18n
		var l =displayFields.length,i=(dispIndex!==undefined)?dispIndex:0,headerFields=this.getData('cxPropHeaderFields'),filterQuery=[];//no i18n
		l=(index!==undefined)?dispIndex+1:l;
		var cxPropComparator = this.getData('cxPropComparator');	//no i18n
		for(var j=0;j<gbl;j++){
			gbf[j] = getBackfilter[j].id
		}
		for(;i<l;i++){
			var arr=this.getData('isBetweenArr').slice() //no i18n
			if(dispIndex){
				arr[dispIndex]=true;
			}
			var ind = (gbf.length)?gbf.indexOf(displayFields[i].id):-1
			if(getBackfilter[ind] && (getBackfilter[ind].comparator==='between' || currentItem === 'not_between') && !cxPropComparator){
				arr[i]=true
			}
			this.setData('isBetweenArr',arr)//no i18n
			var dd = this.$node.querySelector('#cruxComparator'+dispIndex) // no i18n
			if(dd){
				dd.classList.add('cxBoxDropdown')   // no i18n
			}
			if(ind!==-1){
				var elem = this.$node.querySelector('#cruxElem'+dispIndex) //eslint-disable-line no-multipleDOMLookup
				if(cxPropComparator){
					var ddElem = this.$node.querySelector('#cruxComparator'+ (ind) ) //eslint-disable-line no-multipleDOMLookup
					ddElem.ltProp('selected',getBackfilter[ind].comparator)//no i18n
				}
				var elemLength = elem.length
				for(var elemIndex= 0; elemIndex < elemLength; elemIndex++){
					var e = elem[elemIndex]
					if(getBackfilter[ind].comparator==='empty' || getBackfilter[ind].comparator==='notempty' || getBackfilter[ind].comparator==='blocked' || getBackfilter[ind].comparator==='notblocked'){
						elem.cxProp('disabled',true);	//no i18n
					}else{
						if(e.tagName === 'CRUX-USER-COMPONENT'){	// No I18n
							var usrArr = getBackfilter[ind].value[elemIndex]
							e.component.setData('cxPropValue',{users:usrArr})	// No I18n
						}else if(e.tagName === 'CRUX-DATE-COMPONENT'){	// No I18n
							//eslint-disable-next-line no-multipleDOMLookup
							e.querySelector('lyte-input').ltProp('value',getBackfilter[ind].value[elemIndex])	// No I18n
						}else if(e.tagName === 'CRUX-PICKLIST-COMPONENT'){// no i18n
							e.cxProp('value',getBackfilter[ind].value[elemIndex])
							e.cxProp('displayValue',getBackfilter[ind].value[elemIndex]) //eslint-disable-line no-multipleDOMLookup
						}else{
							e.cxProp('value',getBackfilter[ind].value[elemIndex])	//no i18n
						}
					}
				}
				filterQuery[i-firstIndex]=getBackfilter[ind].filterQuery
			}
		}
		this.setData('filterQuery', filterQuery) //no i18n
		this.setData('getBackfilter',[]) //no i18n
	},

	getBackupFilter : function(selFields){
		var domLookup = this.$node //No I18n
		var l=selFields.length; //No I18n
		var filterQuery = this.getData('filterQuery')// no i18n
		var cxPropComparator = this.getData('cxPropComparator');	//no i18n
		var elemLength = currentFields.length,getBackfilter = [], currentFields = this.getData('cxPropDisplayFields'),sf = []// no i18n
		var firstIndex = this.getData('firstIndex');	//no i18n
		var cxPropDateComparaTors = this.getData('cxPropDateComparaTors');	//no i18n
		for(var i=0;i<l;i++){
			sf[i]= selFields[i].id
		}
		for(var i=0,j=0;i<elemLength;i++){
			if(filterQuery[i-firstIndex] && sf.indexOf(currentFields[i].id)!==-1){
				var inpElems = this.$node.querySelectorAll('#cruxElem'+i+":not(template)"),val=[],ltP=this.$node.querySelector('#cruxComparator'+i) // no i18n;
				inpElems.forEach(function(elem,index){//eslint-disable-line no-loop-func
					if(elem.tagName === 'CRUX-DATE-COMPONENT'){
						//eslint-disable-next-line no-multipleDOMLookup
						val[index] = elem.querySelector('lyte-input').ltProp('value')//no i18n
					}else{
						val[index] = elem.component.getValue()
					}
				})
				getBackfilter[j]={filterQuery:filterQuery[i-firstIndex],value : val,id:currentFields[i].id}
				if (filterQuery[i].value === '${NOTEMPTY}') { // no i18n
					getBackfilter[j].comparator = 'notempty'; // no i18n
				} else if (filterQuery[i].value === '${EMPTY}') { // no i18n
					getBackfilter[j].comparator = 'empty'; // no i18n
				} else if (filterQuery[i].value === '${BLOCKED}') { // no i18n
					getBackfilter[j].comparator = 'blocked'; // no i18n
				} else if (Object.values(cxPropDateComparaTors).includes(filter.value)) { // no i18n
					getBackfilter[j].comparator = 'blocked'; // no i18n
				} else if (filterQuery[i].comparator === 'between' || filterQuery[i - firstIndex].comparator === 'not_between') {
					getBackfilter[j].comparator = (ltP && cxPropComparator) ? ltP.ltProp('selected') : filterQuery[i - firstIndex].comparator; // no i18n
				} else {
					getBackfilter[j].comparator = filterQuery[i - firstIndex].comparator; // no i18n
				}
				j++
			}
		}
		this.setData('getBackfilter',getBackfilter);//no i18n
		return getBackfilter
	},
	getDate : function(val){
		var datePattern = this.getData('cxPropDatePattern');	//no i18n
		var d = this.convertUsrtoDefaultDatePattern(val,datePattern);
		function trailingZero(num){
			return num < 10 ? '0'+num : num;
		}
		return (d)?d.getFullYear() + '-' + trailingZero(d.getMonth()+1) + '-' +trailingZero(d.getDate()):''
	},
	getStartMinute : function(val, datePattern){
		var dObj = $L.moment(val, datePattern).getDObj();
		dObj.setSeconds('00');
		return $L.moment(dObj).format();
	},
	getEndMinute : function(val, datePattern){
		var dObj = $L.moment(val, datePattern).getDObj();
		dObj.setSeconds('59');
		return $L.moment(dObj).format();
	},
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAriaLookUpFilter();
		}
	}.observes('cxPropShowFilter', 'cxPropContent', 'cxPropAria').on('didConnect')
},{
	mixins: ["crux-filter-utils","crux-element-validation", "crux-aria-lookup-filter-mixin"]//No I18N
});

Lyte.Component.registerHelper("checkNoFilter", function( field , cxPropOnlyFilterable) { //No I18n
	if( field.noFilter || field.cxNoFilter  || (cxPropOnlyFilterable.length && field[cxPropOnlyFilterable] === false) ){
		return true;
	}
	if(field.ui_type === 116 && field.formula && field.formula.dynamic){
		return true;
	}
	if (field.ui_type === 776 || field.ui_type === 777 || field.address && (field.address.type === 'latitude' || field.address.type === 'longitude')){
		return true;
	}
	return false;
});
