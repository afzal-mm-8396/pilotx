/**
 * @component crux-column-list
 * @author manikaraja.p
 * @version 1.0.0
 * @summary Crux Column List is a sortable menu where each item can be selected or unselected
 * @notes The properties cxPropFields and cxPropId mandatory
 */
Lyte.Component.register("crux-column-list", {
_template:"<template tag-name=\"crux-column-list\"> <div class=\"cxColListWrapperDiv {{if(cruxOr(isAccordianEnabled,isGrouperEnabled),'cxColumnListWithAccordion','')}}\"> <lyte-menu-body> <div class=\"{{if(cxPropGroupFilter,'cxGrouperEnabledBox cxGrouperEnabledWrapper','')}}\"> <template is=\"if\" value=\"{{cxPropGroupFilter}}\"><template case=\"true\"> <crux-dropdown cx-prop-options=\"{{items}}\" cx-prop-user-value=\"header_label\" cx-prop-system-value=\"{{cxPropUniqueNameSelector}}\" on-option-select=\"{{method('onSelectFilter')}}\"> </crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropHideSearch,'!')}}\"><template case=\"true\"> <div class=\"columnListComp cxColListSearchWrap cxSearchWrapper\"> <template is=\"if\" value=\"{{cxPropLazyRender}}\"><template case=\"true\"><lyte-input lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" data-zcqa=\"{{cxPropSearchZcqa}}\" on-value-change=\"{{method('searchColumns')}}\" class=\"columnListSearchIcon cxDB cxColumnListSearchInput\" id=\"cruxColumnSearch\" lt-prop-appearance=\"{{cxPropSearchAppearance}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\"> </lyte-input></template><template case=\"false\"><lyte-search lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" data-zcqa=\"{{cxPropSearchZcqa}}\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.lyteBodyPosition.{{cxPropId}}&quot;, &quot;target&quot; : &quot;lyte-menu-item.lyteMenuItem.{{cxPropId}}&quot;, &quot;search&quot; : &quot;lyte-menu-item.lyteMenuItem.{{cxPropId}}&quot;}\" on-search=\"{{method('searchColumnList')}}\" on-after-search=\"{{method('afterSearch')}}\" class=\"columnListSearchIcon cxDB\" id=\"cruxColumnSearch\" lt-prop-trim=\"{{cxPropTrimSearch}}\" lt-prop-appearance=\"{{cxPropSearchAppearance}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-focus=\"{{method('changeFocus','focus')}}\" on-blur=\"{{method('changeFocus','blur')}}\"></lyte-search></template></template> <span class=\"searchCloseOpen cxSearchClearWrap cxColListSearchClearWrap {{if(showCloseIcon,'cxdF','cxdN')}}\" data-zcqa=\"lv_column_search_clear\" onclick=\"{{action('clearSearch')}}\"> <span class=\"cxSearchClearIcon\"></span> </span> </div> </template></template> </div> <lyte-yield yield-name=\"listHeaderYield\"></lyte-yield> <div style=\"max-height: {{cxPropMaxHeight}};\" class=\"lyteBodyPosition cxColListContainer_{{cxPropId}} {{cxPropId}} {{if(ifEquals(pinnedFieldCount,1),'cxColListSingleFieldPinned','')}} {{if(ifEquals(pinnedFieldCount,cxPropPinFieldLimit),'cxColumnListMaxLimitReached','')}} cxToScrollTop\"> <div class=\"divTopBorder {{if(cxPropSingleMandatoryCheck,'cxColListOnlyOneMandatoryChecked')}}\"> <template is=\"for\" items=\"{{propertyFields}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxColPropField cxColListItem lyteMenuItem {{cxPropId}} {{item.cxPropClass}} restrict cxNotSortable cxPropDisableSort\"> <lyte-checkbox lt-prop-tabindex=\"-1\" data-value=\"{{item[cxPropUniqueNameSelector]}}\" index=\"{{index}}\" lt-prop-id=\"moduleProperty_{{item[cxPropUniqueNameSelector]}}\" lt-prop-type=\"default\" lt-prop-checked=\"{{lbind(item.selected)}}\" lt-prop-label=\"{{item[cxPropDisplayLabel]}}\" on-before-unchecked=\"{{method('beforeUnChecked',item)}}\" on-before-checked=\"{{method('beforeChecked',item)}}\" class=\"{{if(item.selected,'cxColListCheckedElem')}}\" on-checked=\"{{method('checkedCheckboxForProp',item)}}\" on-unchecked=\"{{method('unCheckedCheckboxForProp',item)}}\"> </lyte-checkbox> </lyte-menu-item> </template> <template is=\"if\" value=\"{{cxPropPropertyFields.length}}\"><template case=\"true\"><div class=\"cxColLineSeparator\"></div></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(isAccordianEnabled,'!'),'&amp;&amp;',expHandlers(isGrouperEnabled,'!'))}}\"><template case=\"true\"> <template is=\"for\" items=\"{{items}}\" item=\"item\" index=\"index\" unbound=\"{{cxPropDataBind}}\"><template is=\"if\" value=\"{{item[cxPropDisplayLabel]}}\"><template case=\"true\"> <lyte-menu-item class=\"cxColListItem lyteMenuItem {{cxPropId}} {{if(item[cxPropMandatory],'cxColListMandatoryItem')}} {{if(cruxAnd(disable,negate(item.selected)),'restrictSortable')}} {{if(cruxOr(cruxAnd(negate(item.selected),cxPropDisableSortForUnselectedFields),cxPropDisableSortable),'cxPropDisableSort')}} {{item.cxPropClass}} {{if(cruxOr(cruxAnd(cxPropPreventSortableOnMandatoryFields,item[cxPropMandatory]),cruxAnd(cxPropPreventSortableOnDisabledFields,item.cxPropDisabled)),'restrict')}} {{if(item.pinned,'cxColListPinnedField','cxColListUnPinnedField')}}\" data-zcqa=\"{{if(cxPropDragZcqaPrefix,concat(cxPropDragZcqaPrefix,item.column_name),'')}}\"> <template is=\"if\" value=\"{{cxPropFieldYield}}\"><template case=\"true\"> <lyte-checkbox lt-prop-tabindex=\"-1\" data-value=\"{{item[cxPropUniqueNameSelector]}}\" index=\"{{index}}\" lt-prop-id=\"{{item.id}}_{{item[cxPropUniqueNameSelector]}}\" lt-prop-type=\"default\" lt-prop-checked=\"{{if(item.selected,true,false)}}\" lt-prop-label=\"{{item[cxPropDisplayLabel]}}\" on-checked=\"{{method('checkedCheckbox',item,undefined,undefined)}}\" on-unchecked=\"{{method('unCheckedCheckbox',item,undefined,undefined)}}\" lt-prop-label-class=\"{{if(item[cxPropMandatory],'cxColumnMandatory')}}\" on-before-unchecked=\"{{method('beforeUnChecked',item)}}\" on-before-checked=\"{{method('beforeChecked',item)}}\" lt-prop-disabled=\"{{if(cruxOr(cruxAnd(disable,negate(item.selected)),item.cxPropDisabled),true,false)}}\" class=\"{{if(item.selected,'cxColListCheckedElem')}} {{if(cxPropLabelEllipsis,'cxColumnListWrapItem','')}}\" lt-prop-show-tooltip=\"{{cxPropLabelEllipsis}}\" lt-prop-yield=\"{{cxPropFieldYield}}\" data-zcqa=\"{{if(cxPropZcqaPrefix,concat(cxPropZcqaPrefix,item.column_name),concat(item.id,'_',item[cxPropDisplayLabel]))}}\" lt-prop-title=\"{{if(cruxAnd(disable,negate(item.selected)),cxPropMaxCountReachTooltip,'')}}\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"fieldYield\" field-obj=\"{{item}}\"></lyte-yield> </template> </lyte-checkbox> </template><template case=\"false\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <lyte-checkbox lt-prop-tabindex=\"-1\" data-value=\"{{item[cxPropUniqueNameSelector]}}\" index=\"{{index}}\" lt-prop-id=\"{{item.id}}_{{item[cxPropUniqueNameSelector]}}\" lt-prop-type=\"default\" lt-prop-checked=\"{{if(item.selected,true,false)}}\" lt-prop-label=\"{{item[cxPropDisplayLabel]}}\" on-checked=\"{{method('checkedCheckbox',item,undefined,undefined)}}\" on-unchecked=\"{{method('unCheckedCheckbox',item,undefined,undefined)}}\" lt-prop-label-class=\"{{if(item[cxPropMandatory],'cxColumnMandatory')}}\" on-before-unchecked=\"{{method('beforeUnChecked',item)}}\" on-before-checked=\"{{method('beforeChecked',item)}}\" lt-prop-disabled=\"{{if(cruxOr(cruxAnd(disable,negate(item.selected)),item.cxPropDisabled),true,false)}}\" class=\"{{if(item.selected,'cxColListCheckedElem')}}\" lt-prop-yield=\"{{cxPropFieldYield}}\" data-zcqa=\"{{if(cxPropZcqaPrefix,concat(cxPropZcqaPrefix,item.column_name),concat(item.id,'_',item[cxPropDisplayLabel]))}}\" lt-prop-title=\"{{if(cruxAnd(disable,negate(item.selected)),cxPropMaxCountReachTooltip,'')}}\"></lyte-checkbox> </template></template> <lyte-yield yield-name=\"listSuffixYield\" field=\"{{item}}\" class=\"{{cxPropListSuffixYieldClass}}\"></lyte-yield> <span class=\"dragIcon dIB cxAlignRight cxVam fR svgIcons\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropPinUnpinOption,'&amp;&amp;',item.selected)}}\"><template case=\"true\"> <span id=\"cxPinUnpinIcon\" class=\"cP mlAuto {{if(item.pinned,'cxColPinActiveIcon','cxColPinIcon')}}\" lt-prop-tooltip-config=\"{&quot;showdelay&quot;:600}\" onclick=\"{{action('doPinOrUnpin',item,this)}}\" onmouseenter=\"{{action('mouseEnterForPinIcon',item,this)}}\"></span> </template></template> </lyte-menu-item> </template><template case=\"false\"> <div class=\"dN\"></div> </template></template></template> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{if(ifEquals(cxPropFields.length,0),true,false)}}\"><template case=\"true\"><div class=\"cxColListNoResult {{cxPropNoContentClass}}\">{{cxPropEmptyListMsg}}</div></template><template case=\"false\"><template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"><div class=\"cxColListNoResult {{cxPropNoContentClass}}\">{{cxPropSearchEmptyMessage}}</div></template></template></template></template> </template><template case=\"false\"> <lyte-accordion lt-prop-exclusive=\"false\" lt-prop-dynamic=\"true\" on-before-open=\"{{method(&quot;beforeOpenAcc&quot;)}}\" after-render=\"{{method('afterRenderAcc')}}\" on-before-close=\"{{method('beforeCloseAcc')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"for\" items=\"{{items}}\" item=\"group\" index=\"pos\"> <lyte-accordion-item data-fetched=\"{{group.isDatafetched}}\" class=\"{{group.class}}\" selector-atr=\"{{group[cxPropUniqueNameSelector]}}\" selector-pos=\"{{pos}}\" id=\"cxColumListAccItem_{{pos}}\"> <template is=\"if\" value=\"{{expHandlers(group.suffix,'==','cxColumnListDefault')}}\"><template case=\"true\"> <lyte-accordion-header style=\"padding:0px;\"></lyte-accordion-header> </template><template case=\"false\"> <lyte-accordion-header data-zcqa=\"{{group[cxPropUniqueNameSelector]}}\" class=\"columnListAccHeader {{if(isGrouperEnabled,'cxCDefault','')}}\">{{group.header_label}}<template is=\"if\" value=\"{{isAccordianEnabled}}\"><template case=\"true\"><lyte-icon class=\"lyteAccordionArrow\"></lyte-icon></template></template></lyte-accordion-header> </template></template> <lyte-accordion-body class=\"columnListAccordianBody\"> <template is=\"for\" items=\"{{group.fields}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item[cxPropDisplayLabel]}}\"><template case=\"true\"> <lyte-menu-item class=\"cxColListItem lyteMenuItem {{cxPropId}} {{if(item[cxPropMandatory],'cxColListMandatoryItem')}} {{if(cruxOr(cruxAnd(negate(item.selected),cxPropDisableSortForUnselectedFields),cxPropDisableSortable),'cxPropDisableSort')}} {{item.cxPropClass}} {{if(cruxOr(cruxAnd(cxPropPreventSortableOnMandatoryFields,item[cxPropMandatory]),cruxAnd(cxPropPreventSortableOnDisabledFields,item.cxPropDisabled)),'restrict')}} {{if(item.pinned,'cxColListPinnedField','cxColListUnPinnedField')}} \" grpr-pos=\"{{pos}}\" data-zcqa=\"{{item[cxPropUniqueNameSelector]}}\"> <template is=\"if\" value=\"{{cxPropFieldYield}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <lyte-checkbox lt-prop-tabindex=\"-1\" data-value=\"{{item[cxPropUniqueNameSelector]}}\" index=\"{{index}}\" lt-prop-id=\"{{item.id}}_{{item[cxPropUniqueNameSelector]}}\" lt-prop-type=\"default\" lt-prop-checked=\"{{if(item.selected,true,false)}}\" lt-prop-label=\"{{if(item.cx_display_label,item.cx_display_label,item[cxPropDisplayLabel])}}\" on-checked=\"{{method('checkedCheckbox',item,pos,index)}}\" on-unchecked=\"{{method('unCheckedCheckbox',item,pos,index)}}\" lt-prop-label-class=\"{{if(item[cxPropMandatory],'cxColumnMandatory')}}\" on-before-unchecked=\"{{method('beforeUnChecked',item)}}\" on-before-checked=\"{{method('beforeChecked',item)}}\" lt-prop-disabled=\"{{if(cruxOr(cruxAnd(disable,negate(item.selected)),item.cxPropDisabled),true,false)}}\" class=\"{{if(item.selected,'cxColListCheckedElem')}}\" lt-prop-yield=\"{{cxPropFieldYield}}\" data-zcqa=\"{{item.id}}_{{item[cxPropDisplayLabel]}}\" lt-prop-title=\"{{if(cruxAnd(disable,negate(item.selected)),cxPropMaxCountReachTooltip,'')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"fieldYield\" field-obj=\"{{item}}\"></lyte-yield> </template> </lyte-checkbox> </template><template case=\"false\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <lyte-checkbox lt-prop-tabindex=\"-1\" data-value=\"{{item[cxPropUniqueNameSelector]}}\" index=\"{{index}}\" lt-prop-id=\"{{item.id}}_{{item[cxPropUniqueNameSelector]}}\" lt-prop-type=\"default\" lt-prop-checked=\"{{if(item.selected,true,false)}}\" lt-prop-label=\"{{if(item.cx_display_label,item.cx_display_label,item[cxPropDisplayLabel])}}\" on-checked=\"{{method('checkedCheckbox',item,pos,index)}}\" on-unchecked=\"{{method('unCheckedCheckbox',item,pos,index)}}\" lt-prop-label-class=\"{{if(item[cxPropMandatory],'cxColumnMandatory')}}\" on-before-unchecked=\"{{method('beforeUnChecked',item)}}\" on-before-checked=\"{{method('beforeChecked',item)}}\" lt-prop-disabled=\"{{if(cruxOr(cruxAnd(disable,negate(item.selected)),item.cxPropDisabled),true,false)}}\" class=\"{{if(item.selected,'cxColListCheckedElem')}}\" lt-prop-yield=\"{{cxPropFieldYield}}\" data-zcqa=\"{{item.id}}_{{item[cxPropDisplayLabel]}}\" lt-prop-title=\"{{if(cruxAnd(disable,negate(item.selected)),cxPropMaxCountReachTooltip,'')}}\"></lyte-checkbox> </template></template> <span class=\"dragIcon dIB cxAlignRight cxVam fR svgIcons\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropPinUnpinOption,'&amp;&amp;',item.selected)}}\"><template case=\"true\"> <span id=\"cxPinUnpinIcon\" onmouseover=\"{{action('mouseEnterForPinIcon',item,this)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;Right&quot;}\" class=\"cP {{if(item.pinned,'cxColPinActiveIcon','cxColPinIcon')}}\" onclick=\"{{action('doPinOrUnpin',item,this,pos,index)}}\"></span> </template></template> </lyte-menu-item> </template><template case=\"false\"> <div class=\"dN\"></div> </template></template></template> <div class=\"cxColListNonActionItems\" style=\"height: 0.01px;\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{group.isAllSelected}}\"><template case=\"true\"> <div class=\"cxColListAllFieldsSelected\">{{cxPropAllSelectedMessage}}</div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(group.isDatafetched,'!')}}\"><template case=\"true\"> <span class=\"cxColListLoader\"></span> </template></template></template></template> </div> </lyte-accordion-body> </lyte-accordion-item> </template> <template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-column-list.html\",\"Feb Default Changes\")}} <div class=\"cxColListNoResult\">{{cxPropSearchEmptyMessage}}</div> </template></template> </template> </lyte-accordion> </template></template> </div> </div> </lyte-menu-body> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]}]}},"default":{}},{"type":"insertYield","position":[1,1,3]},{"type":"attr","position":[1,1,5],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-height: '","cxPropMaxHeight","';'"]}}}},{"type":"attr","position":[1,1,5,1]},{"type":"attr","position":[1,1,5,1,1]},{"type":"for","position":[1,1,5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,1,5,1,3]},{"type":"if","position":[1,1,5,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,5,1,5]},{"type":"if","position":[1,1,5,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"insertYield","position":[1,3]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]},{"type":"text","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]},{"type":"text","position":[1,3,3,1]},{"type":"attr","position":[1,3,3,3]},{"type":"if","position":[1,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["cxPropFields","cxPropSelectedFields","cxPropDisplayLabel","cxPropMandatory","cxPropId","cxPropMaxSelectColumn","cxPropDisableSortForUnselectedFields","cxPropDataBind","cxPropFieldYield","cxPropDisableSortable","cxPropHideSearch","cxPropPreventSortableOnMandatoryFields","cxPropSearchAppearance","cxPropUniqueNameSelector","cxPropMaxAccordianColumns","cxPropAllSortLiteral","cxPropZcqaPrefix","cxPropDragZcqaPrefix","cxPropPreventReordering","cxPropPinUnpinOption","cxPropPinFieldLimit","cxPropPinFieldLimitMessage","cxPropPropertyFields","cxPropSortOrder","cxPropFixedColumns","cxPropMinSelectColumn","cxPropTrimSearch","cxPropGroupFilter","cxPropFiltering","cxPropSearchEmptyMessage","cxPropAllSelectedMessage","cxPropGroupLimitReachedInfo","cxPropEmptyListMsg","cxPropMaxlength","cxPropMaxHeight","cxPropAccessibilityClass","cxPropPreventSortableOnDisabledFields","cxPropSearchZcqa","cxPropNoContentClass","cxPropAria","cxPropLazyRender","cxPropMaxCountReachTooltip","cxPropListSuffixYieldClass","cxPropLabelEllipsis","propertyFields","showNoResult","showCloseIcon","pinnedFieldCount","isAccordianEnabled","items","cxPropSingleMandatoryCheck","disable","disablePinOption","isGrouperEnabled"],
_observedAttributesType :["array","array","string","string","string","number","boolean","string","boolean","boolean","boolean","boolean","string","string","number","string","string","string","boolean","boolean","number","string","array","string","number","number","boolean","boolean","boolean","string","string","string","string","number","string","string","boolean","string","string","boolean","boolean","string","string","boolean","array","boolean","boolean","number","boolean","array","boolean","boolean","boolean","boolean"],
//No I18n
	init : function(){
		// var property = [ { api_name : "activity_badge" , field_label : "Activity Badge"   } ];
		// this.setData("cxPropPropertyFields",property)
		var isAndroid=(_lyteUiUtils.isAndroid.constructor == Boolean ? _lyteUiUtils.isAndroid : _lyteUiUtils.isAndroid()), isIos=(_lyteUiUtils.isIos.constructor == Boolean ? _lyteUiUtils.isIos : _lyteUiUtils.isIos());
		this._isMobile=(isAndroid || isIos);
		this.$node.toggleField = function(api_name){
			this.querySelector("[data-value='"+api_name+"']").click();//No I18n
		}
    },
   data : function(){
		return {
			/**
			 * The fields or values to be listed should be passed in this property
			 * @componentProperty { array } cxPropFields
			 * @author manikaraja.p
			 */
			cxPropFields : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * The fields (or values) selected should be passed in this property. Each array item should be an object with fields' id and api_name.
			 * @componentProperty { array } cxPropSelectedFields
			 * @author manikaraja.p
			 */
			cxPropSelectedFields : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * The key in cxPropFields that determines what should be displayed as a label.
			 * @componentProperty { string } cxPropDisplayLabel='field_label'
			 * @author manikaraja.p
			 */
			cxPropDisplayLabel :  Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * The key in cxPropFields that determines which field is mandatory
			 * @componentProperty { string } cxPropMandatory='mandatory'
			 * @author manikaraja.p
			 */
			cxPropMandatory : Lyte.attr("string", {default : "mandatory"}),//No I18n
			/**
			 * A unique identifier used to search across the items. Please note that this property is mandatory if you have more than one column list component in your page.
			 * @componentProperty { string } cxPropId
			 * @author manikaraja.p
			 */
			cxPropId : Lyte.attr("string"), //No I18n
			/**
			 * The maximum number of fields that can be selected by a user
			 * @componentProperty { number } cxPropMaxSelectColumn
			 * @author manikaraja.p
			 */
			cxPropMaxSelectColumn : Lyte.attr("number"),//No I18n
			/**
			 * Set this to true to disable sortable for unselected fields.
			 * @componentProperty { boolean } cxPropDisableSortForUnselectedFields=false
			 * @author manikaraja.p
			 */
			cxPropDisableSortForUnselectedFields : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true to disable data binding for the component. Disabling data binding will prevent changes made in setData to be reflected in DOM.
			 * @componentProperty { string } cxPropDataBind
			 * @author manikaraja.p
			 */
			cxPropDataBind : Lyte.attr("string", {default : "false"}),//No I18n
			/**
			 * Set this to true to render your own field item instead of rendering the default field label.
			 * @componentProperty { boolean } cxPropFieldYield=false
			 * @author manikaraja.p
			 */
			cxPropFieldYield : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true to disable fields sortable.
			 * @componentProperty { boolean } cxPropDisableSortable=false
			 * @author manikaraja.p
			 */
			cxPropDisableSortable : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true to disable search.
			 * @componentProperty { boolean } cxPropHideSearch=false
			 * @author manikaraja.p
			 */
			cxPropHideSearch : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true to prevent sortable for mandatory fields
			 * @componentProperty { boolean } cxPropPreventSortableOnMandatoryFields=false
			 * @author manikaraja.p
			 */
			cxPropPreventSortableOnMandatoryFields : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { string } cxPropSearchAppearance='box'
			 * @author manikaraja.p
			 */
			cxPropSearchAppearance : Lyte.attr("string", {default : "box"}),//No I18n
			/**
			 * The key in cxPropFields which is used to uniquely identify the field.
			 * @componentProperty { string } cxPropUniqueNameSelector='api_name'
			 * @author manikaraja.p
			 */
			cxPropUniqueNameSelector : Lyte.attr("string", {default : "api_name"}),//No I18n
			/**
			 * The maximum number of accordion groups whose fields can be selected by user.
			 * @componentProperty { number } cxPropMaxAccordianColumns=5
			 * @author manikaraja.p
			 */
			cxPropMaxAccordianColumns : Lyte.attr("number" , {default :5}),//No I18n
			cxPropAllSortLiteral	: Lyte.attr("string", {default : "All Fields"}),//No I18n
			/**
			 * The string prefixed to each zcqa for the field's checkbox.
			 * @componentProperty { string } cxPropZcqaPrefix
			 * @author manikaraja.p
			 */
			cxPropZcqaPrefix : Lyte.attr("string"),//No i18n
			/**
			 * The string prefixed to each zcqa for the fields' menu item.
			 * @componentProperty { string } cxPropDragZcqaPrefix
			 * @author manikaraja.p
			 */
			cxPropDragZcqaPrefix : Lyte.attr("string"),//No I18n
			/**
			 * Set this to true to prevent reordering of fields on check/uncheck.
			 * @componentProperty { boolean } cxPropPreventReordering=false
			 * @author manikaraja.p
			 */
			cxPropPreventReordering : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set this to true to enable the pin/unpin option. Note : A pinned field cannot be sortable.
			 * @componentProperty { boolean } cxPropPinUnpinOption=false
			 * @author manikaraja.p
			 */
			cxPropPinUnpinOption : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The maximum number of fields that can be pinned.
			 * @componentProperty { number } cxPropPinFieldLimit=2
			 * @author manikaraja.p
			 */
			cxPropPinFieldLimit : Lyte.attr("number" , {default :2}),//No I18n
			/**
			 * The tooltip message to be displayed when cxPropPinFieldLimit is reached.
			 * @componentProperty { string } cxPropPinFieldLimitMessage
			 * @author manikaraja.p
			 */
			cxPropPinFieldLimitMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * List of fields or values that are always displayed on top irrespective of their check/uncheck status. Note : These fields cannot be sortable.
			 * @componentProperty { array } cxPropPropertyFields
			 * @author manikaraja.p
			 */
			cxPropPropertyFields : Lyte.attr("array",{default : []}),//No I18n
			/**
			 * Set this property to ascending/descending to enable sort for the list of unselected fields.
			 * @componentProperty { string } cxPropSortOrder
			 * @author manikaraja.p
			 * @options ["ascending", "descending"]
			 */
			cxPropSortOrder    : Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * The number of columns that are fixed in a list starting. These fixed fields will not be sortable
			 * @componentProperty { number } cxPropFixedColumns
			 * @author manikaraja.p
			 */
			cxPropFixedColumns : Lyte.attr("number"), //No I18n
			/**
			 * The minimum number of fields that have to be selected.
			 * @componentProperty { number } cxPropMinSelectColumn=0
			 * @author manikaraja.p
			 */
			cxPropMinSelectColumn : Lyte.attr("number" , {default : 0}), //No I18n
			/**
			 * Set to false to prevent trim of search value
			 * @componentProperty { boolean } cxPropTrimSearch=true
			 * @author manikaraja.p
			 */
			cxPropTrimSearch : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropGroupFilter : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set as false to display all fields passed under cxPropFields. i.e. the component filters out some fields based on ui_type and column_name. Setting this property to false, will prevent it.
			 * @componentProperty { boolean } cxPropFiltering=true
			 * @author manikaraja.p
			 */
			cxPropFiltering		 : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * The message to be displayed when no results are found after search.
			 * @componentProperty { string } cxPropSearchEmptyMessage
			 * @author manikaraja.p
			 */
			cxPropSearchEmptyMessage : Lyte.attr("string" , {default : _cruxUtils.getI18n("crm.label.no.results.match")}),//No I18n
			/**
			 * The message displayed when all fields of a group are selected.
			 * @componentProperty { string } cxPropAllSelectedMessage
			 * @author manikaraja.p
			 */
			cxPropAllSelectedMessage : Lyte.attr("string"),//No I18n
			/**
			 * The message displayed when the selected field count matches cxPropMaxAccordionColumns
			 * @componentProperty { string } cxPropGroupLimitReachedInfo
			 * @author manikaraja.p
			 */
			cxPropGroupLimitReachedInfo : Lyte.attr("string"),//No I18n
			/**
			 * The message displayed when no fields are passed in cxPropFields.
			 * @componentProperty { string } cxPropEmptyListMsg
			 * @author manikaraja.p
			 */
			cxPropEmptyListMsg : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.no.data.found")}),//No I18n
			/**
			 * The maxlength allowed for the search input.
			 * @componentProperty { number } cxPropMaxlength=25
			 * @author manikaraja.p
			 */
			cxPropMaxlength : Lyte.attr("number", {default : 25}),
			/**
			 * The max height applied to the parent div of the list.
			 * @componentProperty { string } cxPropMaxHeight
			 * @author manikaraja.p
			 */
			cxPropMaxHeight : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropAccessibilityClass='cxAriaActive'
			 * @author mariswaran.sv
			 */
			cxPropAccessibilityClass :  Lyte.attr("string", {default : "cxAriaActive"}),//No I18n
			/**
			 * Set to true to prevent sortable on disabled fields.
			 * @componentProperty { boolean } cxPropPreventSortableOnDisabledFields=false
			 * @author manikaraja.p
			 */
			cxPropPreventSortableOnDisabledFields : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The zcqa value for the search input.
			 * @componentProperty { string } cxPropSearchZcqa
			 * @author manikaraja.p
			 */
			cxPropSearchZcqa : Lyte.attr("string"),//No I18n
			/**
			 * The class for the div that contains the no fields found message.
			 * @componentProperty { string } cxPropNoContentClass='noResultAriaComp'
			 * @author manikaraja.p
			 */
			cxPropNoContentClass : Lyte.attr("string", {"default" : "noResultAriaComp"}), //No I18n
			/**
			 * @componentProperty { boolean } cxPropAria=false
			 * @author mariswaran.sv
			 */
			cxPropAria : Lyte.attr('boolean', {default : false}),
			/**
			 * Set to true to lazy load the fields.
			 * @componentProperty { string } cxPropLazyRender=false
			 * @author manikaraja.p
			 */
			cxPropLazyRender : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It will be shown while reached the maximum limit.
			 * @componentProperty { string } cxPropMaxCountReachTooltip
			 * @author manikaraja.p
			 */
			cxPropMaxCountReachTooltip : Lyte.attr('string', {default : ''}),
			cxPropListSuffixYieldClass : Lyte.attr("string"),//No I18n
			cxPropLabelEllipsis :  Lyte.attr("boolean", {default : false}),//No I18n
			propertyFields : Lyte.attr("array",{default : []}),//No I18n
			showNoResult : Lyte.attr("boolean", {default : false}),//No I18n
			showCloseIcon : Lyte.attr("boolean", {default : false}),//No I18n
			pinnedFieldCount : Lyte.attr("number",{default : 0}),//No I18n
			isAccordianEnabled : Lyte.attr("boolean", {default : false}),//No I18n
			items	 : Lyte.attr("array"),//no i18n
			cxPropSingleMandatoryCheck : Lyte.attr("boolean", {default : true}),//no i18n
			disable : Lyte.attr("boolean", {default : false}),//No I18n
			disablePinOption : Lyte.attr("boolean", {default : false}),//No I18n
			isGrouperEnabled : Lyte.attr("boolean", {default : false})//No I18n

		}
	},
	selectedCount : function( key , bool ){
		var items = this.grouping ? this.data.items[0].fields : bool ? this.columns : this.data.items;
		var selected = 0;
		for(var i=0; i<items.length; i++){
			if(items[i] && items[i][key]){
				selected++;
			}
		}
		if(key === 'selected'){
			this.selectedListCount = selected;
		}
		return selected
	},
	actions : {
		clearSearch : function(){
			var search = this.$node.querySelector("#cruxColumnSearch");
			if(!this.data.cxPropLazyRender){
				search.setValue(""); //No I18n
			}else{
				search.ltProp('value' , "");//No I18n
			}
			this.setData("showCloseIcon", false);
			search.focus();
		},
		doPinOrUnpin : function(field , ele , grprKey , pos){
			var checked = field.pinned ? false : true;
			var pinnedFieldCnt = this.selectedCount("pinned" , this.data.cxPropLazyRender);//No I18n
			if(checked){
				if(  this.data.cxPropPinFieldLimit >  pinnedFieldCnt){
					this.checkUncheck("check",field , ele , "pinned" , grprKey , pos);
					this.setData("pinnedFieldCount", pinnedFieldCnt + 1);	//NO I18N
				}
				if( pinnedFieldCnt+1  == this.data.cxPropPinFieldLimit){
					this.setData("disablePinOption",true);//no i18n
				}
			}else{
				this.checkUncheck("uncheck" ,field, ele , "pinned" , grprKey , pos);
				this.setData("disablePinOption",false);//no i18n
				 this.setData("pinnedFieldCount", pinnedFieldCnt - 1);	//NO I18N
			}

		},
		mouseEnterForPinIcon : function( item , element ){
			var pinIcon = element;
			if( item.pinned ){
				pinIcon.setAttribute('lt-prop-title', _cruxUtils.getI18n("crm.customview.unpin.column"))//No I18n
				return
			}
			if(this.data.pinnedFieldCount >= this.data.cxPropPinFieldLimit ){
				pinIcon.setAttribute('lt-prop-title', this.data.cxPropPinFieldLimitMessage)
			}else{
				pinIcon.setAttribute('lt-prop-title', _cruxUtils.getI18n("crm.customview.pin.column"))
			}
		}
	},
	methods : {
		afterRenderAcc : function(){
			this.toggleAccordions();
		},
	   	checkedCheckbox : function(item , grprPos , pos , chkBox){
	   		if(this.data.cxPropPreventReordering){
	   			item.selected = true;
	   			this.afterSelectionUnselection("onCheckBoxChecked" , undefined , chkBox);
	   		}
	   		else{
	   			this.checkUncheck("check", item, chkBox ,'selected' , grprPos , pos);

			}
			this.selectedColumnsObj[item[this.data.cxPropUniqueNameSelector]] = item;
		},
		unCheckedCheckbox : function(item , grprPos , pos , chkBox){
			if(this.data.cxPropPreventReordering){
				item.selected = false;
				this.afterSelectionUnselection("onCheckBoxUnChecked" , undefined , chkBox);
			}else{
					this.checkUncheck("uncheck", item, chkBox,'selected' , grprPos , pos);
			}
			delete this.selectedColumnsObj[item[this.data.cxPropUniqueNameSelector]];
		},
		beforeUnChecked : function(item, ele){
			if( this._prevent ) {
				delete this._prevent;
				return false;
			}
			var min = this.data.cxPropMinSelectColumn;
			if( !this.checkUncheckAllEvent && min &&  this.selectedCount('selected') - 1 < min){
				return false;
			}
			if(this.getMethods("onBeforeUnchecked") && !this.checkUncheckAllEvent){
				/**
				 * This method is invoked before a field is unchecked. Return false to prevent the unselection of the field.
				 * @method onBeforeUnchecked
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } item checkbox element
				 * @param {*} ele the menu item element
				 */
				return this.executeMethod("onBeforeUnchecked", item, ele.closest("lyte-menu-item"));//No I18n
			}
			return true;
		},
		beforeChecked : function(item, ele){
			if( this._prevent ) {
				delete this._prevent;
				return false;
			}
			if(this.grouping){
				var split = item[this.data.cxPropUniqueNameSelector].split(".");
				var bool = split.length > 1 ? Object.keys(this.accordianAsChecked).includes(split[0]) : true;
				if(!bool && Object.keys(this.accordianAsChecked).length >= this.data.cxPropMaxAccordianColumns){
					_cruxUtils.showCustomAlert({params : {ltPropWrapperClass : "",ltPropCloseOnEscape : false ,  ltPropContentAlign:"center", ltPropButtonPosition : "center", ltPropSecondaryMessage : this.data.cxPropGroupLimitReachedInfo, ltPropButtons : [{"type":"accept","text":_cruxUtils.getMsg('crm.button.ok.got.it'),"appearance":"primary"}], ltPropButtonPosition : 'center'}});//no i18n
					return false;
				}
			}	
			if(this.getMethods("onBeforeChecked") && !this.checkUncheckAllEvent){
				/**
				 * This method is invoked before a field is checked. Return false to prevent the selection of the field.
				 * @method onBeforeChecked
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } item checkbox element
				 * @param {*} ele the menu item element
				 */
				var retVal = this.executeMethod("onBeforeChecked", item, ele.closest("lyte-menu-item"));//No I18n
				if(typeof retVal === 'object' && retVal.position && this.selectedListCount >= retVal.position){
					this.selectPosition = retVal.position;
					return true;
				}
				return retVal;
			}
			return true;
		},
		checkedCheckboxForProp : function(item , chkBox){
			setTimeout(function(){ //setTimeout because the ltPropChecked lbind is not working correctly. Our propert is not updated. After completes this callback, The value is updated.
				if(this.getMethods("onCheckBoxChecked")){
					this.executeMethod("onCheckBoxChecked", this.getSelectedPropertyFields() , chkBox, this.data.propertyFields , item);//No I18n
				}
			}.bind(this),0);
		},
		unCheckedCheckboxForProp : function(item , chkBox){
			setTimeout(function(){
				if(this.getMethods("onCheckBoxUnChecked")){
					this.executeMethod("onCheckBoxUnChecked",this.getSelectedPropertyFields() , chkBox, this.data.propertyFields , item);//No I18n
				}
			}.bind(this),0);
		},
		searchColumns : function(input){
			var columns = this.columns , len = columns.length , propertyFields = this.data.cxPropPropertyFields , proFields = [] , value = input.newValue.trim().toUpperCase() , d_label = this.data.cxPropDisplayLabel , filteredColumns = [];
			for(var i = 0 ; i < len ; i++){
				if(columns[i][d_label].toUpperCase().indexOf(value) !== -1){
					filteredColumns.push(columns[i]);
				}
			}
			$L('.divTopBorder' , this.$node)[0].scrollTop = 0;
			if(propertyFields.length){
				for(var j = 0 ; j < propertyFields.length ; j++){
					if(propertyFields[j][d_label].toUpperCase().indexOf(value) !== -1){
						proFields.push(propertyFields[j]);
					}
				}
				this.setData('propertyFields' , proFields); //No I18n
			}
			var lineNode = $L(".cxColLineSeparator" , this.$node) , fLen = filteredColumns.length , proLen = proFields.length;
			lineNode.addClass("cxHide");
			this.setData("showNoResult", false);//No I18n
			if(fLen && proLen){
				lineNode.removeClass("cxHide");
			}else if(!fLen && !proLen){
				this.setData("showNoResult", true);//No I18n
			}
			this.setData("showCloseIcon", input.newValue.length ? true : false);
			$L(".divTopBorder" , this.$node)[0].scrollTop = 0;
			this.initialRender(filteredColumns);
			if(this.getMethods("onSearch")){
				/**
				 * This method is invoked when user searches a value
				 * @method onSearch
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } filteredColumns
				 */
				return this.executeMethod("onSearch", filteredColumns);//No I18n
			}
		},
		beforeOpenAcc : function(event , accItem){
			var pos = accItem.getAttribute('selector-pos') ,items = this.data.items , _self = this ,sortedArray, uNSelector = this.data.cxPropUniqueNameSelector;
			// if(Object.keys(this.accordianAsChecked).length >= this.data.cxPropMaxAccordianColumns){
			// 	_cruxUtils.showCustomAlert({params : {ltPropWrapperClass : "",ltPropCloseOnEscape : false ,  ltPropContentAlign:"center", ltPropButtonPosition : "center", ltPropSecondaryMessage : "Maximum selected Lookup Columns reached", ltPropButtons : [{"type":"accept","text":I18n.getMsg('crm.button.ok.got.it'),"appearance":"primary"}], ltPropButtonPosition : 'center'}})//no i18n
			// 	return false;
			// }
			if(!items[pos].isDatafetched && !this.isFetchingTriggered[items[pos][uNSelector]]){
				var selected = _self.selectedAccFields[items[pos][uNSelector]] , field = this.accordianFields.find(function(x){return x[uNSelector] === items[pos][uNSelector]}), searchEle = $L("#cruxColumnSearch" , this.$node)[0] , searchVal = searchEle ? searchEle.getData("ltPropValue") : "" ;
				var promise = {} ;
				if(field.fields && field.fields.length){
					promise.fields = field.fields;
				}else if(this.getMethods('fetchAccordianFields')){
					/**
					 * This callback is fired while open the accordion body.
					 * @method fetchAccordianFields
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } field
					 */
					promise.fields = this.executeMethod("fetchAccordianFields" , field);
				}
				this.isFetchingTriggered[items[pos][uNSelector]] = true;
				Lyte.resolvePromises(promise).then(function(res){ //No I18n
						var fields = Lyte.deepCopyObject(res.fields);
						fields.map(function(x){ x[uNSelector] = field[uNSelector]+"."+x[uNSelector]});
						var len = selected.length;
						for(var i = 0 ; i < len ; i++){
							var ind = fields.findIndex(function(x){ return x[uNSelector] === selected[i][uNSelector]});  //eslint-disable-line no-loop-func
							fields.splice(ind , 1);
							i = i-1 ;len = len-1;
						}
						if(_self.data.cxPropFiltering){
							var fLen = fields.length;
							for(var j = 0 ; j < fLen ; j++){
								if( _self.preventUIType.indexOf(fields[j].ui_type) > -1 || _self.preventColumnName.indexOf(fields[j].column_name) > -1  ){
									fields.splice(j , 1);
									j = j-1 ;fLen = fLen-1;
								}
							}
						}
						sortedArray = _self.getSortedArray(fields);
						Lyte.objectUtils(items[pos] , "add" , "isDatafetched" , true); //No I18n
						Lyte.objectUtils(items[pos] , "add" , "fields" , sortedArray); //No I18n
						if(!fields.length){
							Lyte.objectUtils(items[pos] , "add" , "isAllSelected" , true); //No I18n
						}
						_self.itemsArray[pos] = Lyte.deepCopyObject(items[pos]);
						if(searchVal.length){
							searchEle.setValue(searchVal);
						}
				})
		  }
			return true;
		},
		beforeCloseAcc : function(){
			if(this.data.isGrouperEnabled){
				return false;
			}
		},
		afterSearch : function(result){
			if(this.grouping){
				var arr = [];
				for(var i = 0 ; i < result.length ; i++){
					var val = parseInt(result[i].getAttribute('grpr-pos'));
					if(arr.indexOf(val) === -1){
						arr.push(parseInt(val));
					}
				}
				var items = this.data.items, val = this.searchVal , self = this; // compNode = this.$node ;
				items.forEach(function(item , ind){
					if(arr.indexOf(ind) === -1 && val.length){
							// Lyte.objectUtils(items[ind] , 'add' , 'hideSection' , true); //No I18n
							self.accItems[ind].classList.add('dN'); //No I18n
					}else{
						if(arr.indexOf(ind) === -1 && item.isDatafetched){
							Lyte.objectUtils(items[ind] , 'add' , 'isAllSelected' , true); //No I18n
						}
						// Lyte.objectUtils(items[ind] , 'add' , 'hideSection' , false); //No I18n
						self.accItems[ind].classList.remove('dN'); //No I18n
					}
				})
				this.setData("showNoResult", result.length == 0);//No I18n
				// var acc = $L("lyte-accordion-item" , this.$node); //No I18n
				// for(var j = 0 ; j < acc.length ; j++){
				// 	var pos = acc[j].getAttribute('selector-pos'); //No I18n
				// 	if(!acc[j].classList.contains('lyteAccordionActive') && items[pos].isDatafetched){ //No I18n
				// 		acc[j].click();
				// 	}
				// }
			}else{
				this.setData("showNoResult", result.length == 0);//No I18n
			}
		},
		searchColumnList : function(result,searchNode,event ,value){

			//this handling to show line seperator while search -satrt
			var lineNode = $L(".cxColLineSeparator" , this.$node);
			lineNode.addClass("cxHide");
			var propFieldCnt = 0 , moduleFieldCnt = 0;
			result.forEach(function(node){
				if(node.classList.contains("cxColPropField")){
					propFieldCnt++;
				}else{
					moduleFieldCnt++;
				}
			})
			if(propFieldCnt && moduleFieldCnt ){
				lineNode.removeClass("cxHide");
			}
			//this handling to show line seperator while search -end
			this.searchVal = value;
			// var search = $L(".searchCloseCOpen" , this.$node);
			this.setData("showCloseIcon", value.length ? true : false);
			if(this.resetScroll != false){
				this.$node.querySelector(".cxToScrollTop").scrollTop = 0;//No I18n
				delete this.resetScroll;
			}
			if(this.getMethods("onSearch")){ 
				/**
				 * This method is invoked when user searches a value.
				 * @method onSearch
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } result
				 */
				return this.executeMethod("onSearch", result);//No I18n
			}
		},
		onSelectFilter : function(event , value){
			var items = this.data.items , len = items.length;
			var ind = items.findIndex( x => x[this.data.cxPropUniqueNameSelector] === value);
			for(var i = 1 ; i < len ; i++){
				if(ind !== 0 && ind !== i){
					this.accItems[i].classList.add('dN'); //No I18n
				}else{
					this.accItems[i].classList.remove('dN'); //No I18n
				}
			}
		},
		changeFocus : function(type){
			if(this.data.cxPropGroupFilter){
				this.focusParent(type);
			}
		}
	},
	focusParent : function(type){
		var parentElem = $L(".cxGrouperEnabledWrapper" , this.$node)[0];
		if(type === "focus"){
			parentElem.classList.add("cxGrouperFocus");
		}else{
			parentElem.classList.remove("cxGrouperFocus");
		}
	},
	toggleAccordions : function(){
		this.accItems = $L("lyte-accordion-item" , this.$node);
		var len = this.accItems.length;
		for(var i = 0 ; i < len ; i++){
			if(!this.accItems[i].classList.contains('lyteAccordionActive')){
				this.accItems[i].open(true);
				if(this.data.isAccordianEnabled){
					break;
				}
			}
			// this.accItems[i].classList.add("lyteAccordionActive"); //No I18n
			// if(this.data.isAccordianEnabled){
			// 	break;
			// }
		}
	},
    didConnect : function(){

		this.sortableMenu();
    	this._searchInput= this.$node.querySelector("#cruxColumnSearch");
    	if(this.getMethods("onRender")){
				/**
				 * This method is invoked on render of the component
				 * @method onRender
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } component element
				 */
    		this.executeMethod("onRender", this.$node);//No I18n
    	}
		if(this.data.cxPropLazyRender){
			this.rendered = true;
			this.lazyLoadFn = this.lazyRender.bind(this);
			if(this.columns && this.columns.length){
				this.initialRender(this.columns);
			}
			$L('.lyteBodyPosition' , this.$node)[0].addEventListener('scroll', this.lazyLoadFn , true);//No I18n
			this.resizeFn = this.onResize.bind(this);
			window.addEventListener('resize', this.resizeFn , true);//No I18n
		}
		if(this.data.cxPropGroupFilter){
			var dropdownFocusDiv = $L(".lyteDummyEventContainer" , this.$node)[0];
			dropdownFocusDiv.addEventListener("focus" , function(){
				this.focusParent('focus');
			}.bind(this));
			dropdownFocusDiv.addEventListener("blur" , function(){
				this.focusParent('blur');
			}.bind(this));
		}
		this.$node.setSearchValue = function(val){
			if(this.component.data.cxPropLazyRender){
				this.component._searchInput.ltProp('value' , val);
			}else{
				this.component._searchInput.setValue(val);
			}
		};
		this.$node.selectAllCheckbox = function(){
			this.component.selectAllColumns();
		};
		this.$node.unSelectAllCheckbox = function(){
			this.component.unSelectAllColumns();
		};
	},
	didDestroy : function(){
		if(this.data.cxPropLazyRender){
			$L('.lyteBodyPosition' , this.$node)[0].removeEventListener('scroll', this.lazyLoadFn , true);//No I18n			
			window.removeEventListener('resize', this.resizeFn , true);//No I18n
		}
		delete this.accItems;
	},
	selectAllColumns : function(){
		var columns = this.data.items , colLen = columns.length , i , maxColumn = this.data.cxPropMaxSelectColumn , selColumns = 0 , bool;
		this.checkUncheckAllEvent = true;
		if(!this.data.isAccordianEnabled){
			for(i = 0 ; i < colLen ; i++){
				if(this.getMethods("onBeforeChecked")){
					bool = this.executeMethod("onBeforeChecked", columns[i] , undefined , "selectAll");//No I18n
					if(bool === false){
						break;
					}
				}
				if(!columns[i].selected){
					Lyte.objectUtils(columns[i] , "add" , "selected" , true);
					this.selectedColumnsObj[columns[i][this.data.cxPropUniqueNameSelector]] = columns[i];
				}
				if(maxColumn){
					selColumns++;
					if(selColumns >= maxColumn){
						this.setData('disable' , true);
						if(this.getMethods("onMaxSelectionReached")){
							this.executeMethod("onMaxSelectionReached", selColumns);//No I18n
						}
						break;
					}
				}
			}
		}else{
			var stopParLoop = false , maxAccCount = 0 , maxAccColumn = this.data.cxPropMaxAccordianColumns;
			for(i = 0 ; i < colLen ; i++){
				if(columns[i].isDatafetched){
					if(i !== 0){
						maxAccCount++;
						if(maxAccCount > maxAccColumn){
							_cruxUtils.showCustomAlert({params : {ltPropWrapperClass : "",ltPropCloseOnEscape : false ,  ltPropContentAlign:"center", ltPropButtonPosition : "center", ltPropSecondaryMessage : this.data.cxPropGroupLimitReachedInfo, ltPropButtons : [{"type":"accept","text":I18n.getMsg('crm.button.ok.got.it'),"appearance":"primary"}], ltPropButtonPosition : 'center'}});//no i18n
							break;
						}
					}
					var fields = columns[i].fields , len = fields.length;
					for(var j = 0 ; j < len ; j++){
						if(this.getMethods("onBeforeChecked")){
							bool = this.executeMethod("onBeforeChecked", fields[j] , undefined , "selectAll");//No I18n
							if(bool === false){
								stopParLoop = true;
								break;
							}
						}
						var field = fields[i === 0 ? j : 0];
						if(!field.selected){
							Lyte.objectUtils(field , "add" , "selected" , true);
							this.selectedColumnsObj[field[this.data.cxPropUniqueNameSelector]] = field;
						}
						if(maxColumn){
							selColumns++;
							if(selColumns >= maxColumn){
								this.setData('disable' , true);
								if(this.getMethods("onMaxSelectionReached")){
									this.executeMethod("onMaxSelectionReached", selColumns);//No I18n
								}
								stopParLoop = true;
								break;
							}
						}
					}
					if(stopParLoop){
						break;
					}
				}
			}
		}
		this.checkUncheckAllEvent = false;
	},
	unSelectAllColumns : function(){
		var columns = this.data.items , uNselector = this.data.cxPropUniqueNameSelector , i , dummy = [] , bool;
		this.checkUncheckAllEvent = true;
		this.setData('disable' , false);
		if(!this.data.isAccordianEnabled){
			var colLen = columns.length;
			for(i = colLen - 1 ; i >= 0 ; i--){
				if(columns[i].selected){
					if(this.getMethods("onBeforeUnchecked")){
						bool = this.executeMethod("onBeforeUnchecked", columns[i] , undefined , "unSelectAll");//No I18n
					}
					if(bool === false){
						dummy.push(columns[i]);
						Lyte.arrayUtils( columns , 'removeAt' , i , 1 );
						i--;colLen--;
						continue;
					}
					Lyte.objectUtils(columns[i] , "add" , "selected" , false);
					delete this.selectedColumnsObj[columns[i][uNselector]];
				}
			}
			if(dummy.length){
				Lyte.arrayUtils( columns , 'unshift' , dummy );
			}			
		}else{
				var initFields = this.itemsArray[0].fields; //fields = columns[0].fields , len = fields.length
				// if(Object.keys(this.selectedAccFields).length && false){
				// 	for(var i = 0 ; i < initFields.length ; i++){
				// 		debugger
				// 	}
				// }else{
					var initLen = initFields.length;
					for(i = 0 ; i < initLen ; i++){
							// var selectedField = this.selectedColumnsObj[initFields[i][uNselector]];
							// if(selectedField && selectedField.selected){
								// if(this.getMethods("onBeforeUnChecked")){
								// 	var bool = this.executeMethod("onBeforeUnChecked", initFields[i] , undefined , "unSelectAll");//No I18n
								// }
								// if(bool === false){
								// 	dummy.push(initFields[i]);
								// 	initFields.splice(i , 1);
								// 	i--;initLen--;
								// 	continue;
								// }
							// }
						initFields[i].selected = false;
						delete this.selectedColumnsObj[initFields[i][uNselector]];
					}
					this.itemsArray[0].fields = Array.from(initFields);
					var itemsArrLen = this.itemsArray.length;
					for(i = 0 ; i < itemsArrLen ; i++){
						if(this.itemsArray[i].isDatafetched){
							Lyte.objectUtils(columns[i], 'add' , 'fields', Lyte.deepCopyObject(this.itemsArray[i].fields));
							Lyte.objectUtils(columns[i], 'add' , 'isAllSelected', false);
						}
					}
				// }
				// columns = this.data.items[0];
		}
		// var min = this.data.cxPropMinSelectColumn;
		// if(min){
		// 	var count = this.selectedCount();
		// 	if(min > count){
		// 		var diff = min - count;
		// 		for(var i = 0 ; i < diff.length ; i++){
		// 			Lyte.objectUtils(columns[count+i] , "add" , "selected" , true);
		// 		}
		// 	}
		// }
		this.checkUncheckAllEvent = false;

	},
	getItem : function(self){
		var item = {}
		Object.keys(self).forEach(function(key) {
              item[key] = {};
               item[key] = self[key];

          	})
		return item
	},
	getHiddenCount : function(menuItem,start,end){
		if(this.data.cxPropLazyRender){
			return 0;
		}
		var startIndex = Math.min( start, end ),
		endIndex = Math.max( start, end ),
		count=0;
		for( var i = startIndex; i < endIndex; ++i ){
			if( menuItem[ i ].classList.contains( 'lyteSearchHidden' ) ){
				count++;
			}
		}
		return count;
	},
    setItemArray : function(clear){
    	var cxPropFields = this.getFilteredFields();
    	var selectedFields = clear ? [] : this.getData("cxPropSelectedFields").slice(0);//No I18n
		var preventUIType=this.preventUIType , filtering = this.data.cxPropFiltering;
		var uNSelector = this.data.cxPropUniqueNameSelector , _self = this;
		this.selectedColumnsObj = {};
		var selectedMappingObj = {} , pinnedFields = [];
		var selectedIds = selectedFields.map(function(field){
			selectedMappingObj[field[uNSelector]] = field;
			return field[uNSelector];
		});
		var fieldsApi = cxPropFields.map(function(field){
			return field[uNSelector];
		});
		pinnedFields = selectedFields.filter(function(fld){
			if( ( fld._pin ||fld._pin_order) && fieldsApi.indexOf(fld[uNSelector]) !== -1){
				return fld;
			}
		});
		var selected=[],j=pinnedFields.length , pinFldInd = 0 , index;
		for(var i=0;i<selectedIds.length;i++){
			index =fieldsApi.indexOf(selectedIds[i]);
			if(index > -1){
				if( selectedMappingObj[selectedIds[i]]._pin || selectedMappingObj[selectedIds[i]]._pin_order){
					let itemInd = selectedMappingObj[selectedIds[i]]._pin_order ? selectedMappingObj[selectedIds[i]]._pin_order : ++pinFldInd;
					selectedMappingObj[selectedIds[i]].cxFrom = i;
					selected[itemInd-1] = selectedIds[i]
				}else{
					selected[j++]=selectedIds[i]
				}
			}
		}
			var newarr = [];
			var k=0;
			var mandatory = 0;
			for(var i=0; i<cxPropFields.length; ++i){
				var fieldInfo = cxPropFields[i];
				if(fieldInfo[this.getData("cxPropMandatory")]){
					mandatory++;
					if(mandatory > 1){
						this.setData("cxPropSingleMandatoryCheck", false);//no i18n
					}
				}
	           	var allfields=this.getItem(fieldInfo);
	           	var selectedFieldObj = selectedMappingObj[allfields[uNSelector]];
	           	if(selectedFieldObj && ( selectedFieldObj._pin || selectedFieldObj._pin_order)){
	           		allfields.pinned = true;
	           		allfields.cxFrom = selectedFieldObj.cxFrom;
	           	}
	           	index = selected.indexOf(allfields[uNSelector]);
				if( filtering && ( this.preventUIType.indexOf(allfields.ui_type) > -1 || this.preventColumnName.indexOf(allfields.column_name) > -1 || (allfields.ui_type === 250 && allfields.column_name !== "NOTECONTENT")) ){ // 250-uitype is the richtext field. But, That Note_Content column should be shown in the list. Referred from CRM.
					continue;
				}else if(index > -1){
					allfields.selected = true;
					this.selectedColumnsObj[allfields[uNSelector]] = allfields;
				}
				if(this.data.cxPropPreventReordering){
					newarr.push(allfields);
				}else{
					if(index > -1){
						newarr[index] = allfields;
					}else{
						newarr[j++] = allfields;
					}
				}
			}
			this.selectedListCount = selected.length;
			if(this.data.cxPropSortOrder){
				var selectedArr = newarr.slice(0 , selected.length);
				var sortedUnselectedArr = this.getSortedArray(newarr.slice(selected.length , newarr.length));
				newarr = selectedArr.concat(sortedUnselectedArr);
			}
			if(this.data.cxPropLazyRender){
				this.columns = newarr;
				if(this.rendered){
					this.initialRender(newarr);
				}
			}else if(this.grouping){
				this.itemsArray[0].fields = newarr;
				this.setData("items" , Lyte.deepCopyObject(this.itemsArray)); //No I18n
				setTimeout(() => {
					_self.toggleAccordions();
				}, 0);
			}else{
				this.setData({items : newarr});
			}
			this.setData("pinnedFieldCount", this.selectedCount("pinned" , this.data.cxPropLazyRender));	//No I18n
    },
    sortableMenu : function(){
    	if(this.data.cxPropDisableSortable || this._isMobile || !this.$node.querySelector(".cxToScrollTop")){
    		return false;
    	}
			if(this.grouping){
				var menu=this.$node.querySelector('.columnListAccordianBody');//No I18n
			}else{
				var menu=this.$node.querySelector('.divTopBorder');//No I18n
			}
    	var self=this;
    	$L(menu).sortable({
    	containment  : "parent", //No I18n
    	cancel  : "input", //No I18n
    	onSelect  : function(currentElem,fromIndex,source,event) {
    		var target=event.target
    		if(target.tagName=="SPAN" && target.classList.contains('lyteCheckBoxDefault')){
    			return false;
    		}
			if(self.data.cxPropFixedColumns && fromIndex < self.data.cxPropFixedColumns){
    			return false;
			}
    		var pinnedFieldCnt =  self.selectedCount("pinned" , self.data.cxPropLazyRender);//no i18n
    		if( pinnedFieldCnt == 1 &&  currentElem.classList.contains( "cxColListPinnedField" )){
    			return false
    		}
			var items = self.data.isAccordianEnabled ? self.data.items[0].fields : self.data.items;
			if(self.getMethods("onSelect")){
				var propertyFieldCnt = self.data.propertyFields.length;
				fromIndex = fromIndex - propertyFieldCnt;
				return self.executeMethod("onSelect",items[fromIndex]);//No I18n
			}
    		return true;
		 },

    	onDrag  : function() {
				this._prevent = true;
		 }.bind( this ) ,
		 onDragStart : function(draggableElement,source) {
		 	var removeSortableClass = draggableElement.classList.contains( "cxColListPinnedField" ) ? "cxColListUnPinnedField" : "cxColListPinnedField";//No I18n
		 	var sortingClass = draggableElement.classList.contains( "cxColListPinnedField" ) ? "cxColListPinnedColumnSorting" : "cxColListUnPinnedColumnSorting";//No I18n
		 	self.$node.querySelector('.divTopBorder').classList.add(sortingClass);//No I18n
		 	var selectedElements = source.querySelectorAll("lyte-checkbox input:checked");//No I18n
		 	self.rem_from_sort = []
		 	selectedElements.forEach( function( ele ){
		 		var item = ele.closest("lyte-menu-item");//No I18n
				if( item.classList.contains(removeSortableClass) ){
		 			self.rem_from_sort.push( item );
		 			item.classList.add("restrict");//No I18n
		 			source.removeFromSortable(item);
		 		}
		 	} )
		 },
		 onBeforeDrop  : function (droppableElement ,belowElement ,placeholderElement ,fromIndex ,toIndex ,source ,destination ){
			var propertyFieldCnt = self.data.propertyFields.length ? self.data.propertyFields.length+1 : 0;
			fromIndex = fromIndex - propertyFieldCnt;//to calculate source index due to unsorted field cxPropPropertyFields and line seperator
			toIndex = toIndex - propertyFieldCnt;//to calculate to index due to unsorted field cxPropPropertyFields and line seperator
			var item=self.getData("items");//No I18n
			delete self._prevent;
			if(self.data.cxPropFixedColumns && toIndex < self.data.cxPropFixedColumns){
				return false;
			}
			if(self.getMethods("onBeforeDropItem")){
				/**
				 * This event is triggered when the user drops the item but the placeholder is still available. Note: If the callback returns false then the element will return back to its initial position.
				 * @method onBeforeDropItem
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param {*} droppableElement - The item which is being dragged and dropped.
				 * @param {*} belowElement - The last item over which the mouse was hovered.
				 * @param {*} The positional element where the dragged item will be placed
				 */
				return self.executeMethod("onBeforeDropItem",droppableElement,item[fromIndex],item[toIndex]);//No I18n
			}
		 },
		onDrop  : function (droppedElement , destinantion , belowElement , from, to , source ){
			var propertyFieldCnt = self.data.propertyFields.length ? self.data.propertyFields.length+1 : 0;
			var lazyRender = self.data.cxPropLazyRender;
			if(!lazyRender){
				from = from - propertyFieldCnt;//to calculate source index due to unsorted field cxPropPropertyFields and line seperator
				to = to - propertyFieldCnt;//to calculate to index due to unsorted field cxPropPropertyFields and line seperator
			}
			var items = self.grouping ? self.data.items[0].fields : self.data.items;
			if(self.data.cxPropLazyRender && from != to){
				var sElem, dragData = items[from] , columns = self.columns , op , sel = self.data.cxPropUniqueNameSelector;
				if(from > to){
					sElem =  items[to - 1];
					op = 1;
				}else{
					sElem =  items[to];
					op = 0;
				}
				var addIn = sElem ? columns.findIndex(function(x){return x[sel] === sElem[sel]}) + op : 0;
				self.setColumnValueForLazy(dragData , "remove");//No I18n
				self.setColumnValueForLazy(dragData , "add" , addIn);//No I18n
			}
			var data=Lyte.arrayUtils(items, "removeAt", from, 1)[0];//No I18n
			Lyte.arrayUtils(items, "insertAt", to, data);//No I18n
			self.sortableMenu();
			self.$node.querySelector('.divTopBorder').classList.remove("cxColListPinnedColumnSorting","cxColListUnPinnedColumnSorting");//no i18n
			if( self.rem_from_sort.length ){
				self.rem_from_sort.forEach( function( ele ){
					ele.classList.remove("restrict");//No I18n
					source.addToSortable(ele);
				})
			}
			if(self.getMethods("onDropItem")){
				/**
				 * This event is triggered when the user have dropped the item and the DOM position has changed.
				 * @method onDropItem
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } droppedElement - The item which is dropped.
				 */
				return self.executeMethod("onDropItem",droppedElement,data);//No I18n
			}
		},
		restrict : this.getData("cxPropDisableSortForUnselectedFields") ? ".restrict,.cxPropDisableSort,lyte-checkbox label>span,.cxColLineSeparator" : ".restrict,lyte-checkbox label>span,.cxColLineSeparator"//No I18n
 		});
    },
    getSelectedPropertyFields : function(){
    	var items = this.getData("propertyFields");//No I18n
    	var selected = [];
		for(var i=0; i<items.length; i++){
			if(items[i] && items[i].selected){
				selected.push(items[i]);
			}
		}
		return selected;
    },
     getSelectedFields : function(modelName){
    	var items = this.grouping ? this.data.items[0].fields : this.data.cxPropLazyRender ? this.columns : this.data.items;//No I18n
    	var selected = {} , selIds = [] ;
		var itemsLength = items.length;
		for(var i = 0 ; i < itemsLength ; i++){
			if(items[i] && items[i].selected){
				selected[items[i][this.data.cxPropUniqueNameSelector]] = items[i];
				selIds.push(items[i][this.data.cxPropUniqueNameSelector]);
			}
		}
		// var selectedElements = this.$node.querySelectorAll("lyte-menu-item.lyteMenuItem:not(.cxNotSortable) lyte-checkbox input:checked");//No I18n
		var selectedArr = [] , tempValue , pinnedFields = {} , pinnedOrder = 1;
		// var selectedElementsLength = selectedElements.length;
		for(var j = 0; j<selIds.length; j++){
			// var id = selectedElements[j].closest("lyte-checkbox").getAttribute("data-value");//No I18n
			var id = selIds[j];
			if(modelName){
				tempValue = store.peekRecord(modelName, id);
			}
			else if(selected[id]){
				tempValue = selected[id];
			}
			else{
				tempValue = items.filter(function(item){//eslint-disable-line no-loop-func
					return item[this.data.cxPropUniqueNameSelector] == id;
				}.bind(this))[0];
			}
			if( selected[id] && selected[id].pinned ){
				var itemInd = selected[id].cxFrom ;
				tempValue._pin_order = pinnedOrder++;
				pinnedFields[itemInd] = tempValue;
			}else{
				selectedArr.push(tempValue)
			}
		}
		for (const ind in pinnedFields) {
		  selectedArr.splice(ind, 0, pinnedFields[ind]);
		}
		return selectedArr;
    },
    clearSelectedFields : function(clear){
    	if(this.getData('cxPropMaxSelectColumn') && this.getData("cxPropSelectedFields").length >= this.getData('cxPropMaxSelectColumn')){
    		this.setData("disable", true);//No I18n
    	}else{
    		this.setData("disable", false);//No I18n
    	}
    	this.setItemArray(clear);

    	this.sortableMenu();
    },
    selectedFieldsObs : function(){
    	if(this.getData('cxPropMaxSelectColumn') && this.getData("cxPropSelectedFields").length >= this.getData('cxPropMaxSelectColumn')){
    		this.setData("disable", true);//No I18n
    	}else{
    		this.setData("disable", false);//No I18n
    	}
    	this.setItemArray();
		var search = this.$node.querySelector("#cruxColumnSearch")//No I18n
		if(search){
			var input = $L('input',search)[ 0 ];
			if(!this.data.cxPropLazyRender){
				search.setValue(input.value);	//No I18n
			}else{
				search.ltProp('value' ,input.value);//No I18n
			}
		}
		this.sortableMenu();
    }.observes('cxPropSelectedFields.[]'), //No I18n
	    preventUIType : [556,555,51,123,500,66,444,343,41,1234,445],
	    preventColumnName : ["KEYWORDID","ADID","GADCONFIGID","ADGROUPID","REMINDINVITEESAT","CONVERTEDDATE","PRODUCTDETAILS","ISAPPROVED","CONSENTID","SE_STATUS","PROCESSINGBASIS","COMMENTCONTENTS","ISCTICALL","PUBLISHED","CALLSTATUS","ISDUPLICATE","ZCAMPAIGNID","CONVERTED", "ISLOCKED", "CTIVOICEURL"],//No I18n
	    observeFields : function(){
	    	this.setItemArray();
			if(this.getData("cxPropMaxSelectColumn") && this.getData('cxPropSelectedFields').length >= this.getData("cxPropMaxSelectColumn")){ //No I18n
				this.data.disable = true;
			}
			this.sortableMenu();
	    }.observes("cxPropFields").on("init"),//No I18n
	    observePreventReordering : function(){
	    	if(this.data.cxPropPreventReordering){
	    		this.setData("cxPropDisableSortable", true);
	    	}
	    }.observes("cxPropPreventReordering").on("init"),
		observePropertyFields : function(){
			this.setData('propertyFields' , this.data.cxPropPropertyFields); //No I18n
		}.observes("cxPropPropertyFields").on("init"),
	    afterSelectionUnselection : function(method, selected,chkBox){
			if(!this.checkUncheckAllEvent){
				if(this.getMethods(method)){
					this.executeMethod(method,this.getSelectedFields(), this.$node.querySelector("[lt-prop-id='"+chkBox.id+"']").parentElement, this.data.items, selected);//No I18n
				}
				if( (method === "onCheckBoxChecked" || method === "onCheckBoxUnChecked") && this.getData("cxPropMaxSelectColumn") && this.selectedCount("selected" , this.data.cxPropLazyRender) >= this.getData("cxPropMaxSelectColumn")) {
					this.setData("disable", true);//No I18n
				}
				else if(method === "onCheckBoxUnChecked"){
					this.setData("disable", false);
				}
			}
	    },
		setColumnValueForLazy : function(column , action , addIndex){
			var columns = this.columns , selector = this.data.cxPropUniqueNameSelector;
			if(action === "remove"){
				var index = columns.findIndex(function(x){return x[selector] === column[selector]});
				this.columns.splice(index , 1);
			}else if(action === "add"){
				this.columns.splice(addIndex , 0 , column );
			}
		},
		checkUncheckFn : function(checkUncheck, item, chkBox , key , grprPos , curPos,self,liItem, items){
			if(typeof grprPos === 'number'){
				var accBody = chkBox.closest(".columnListAccordianBody"); //No I18n
			}
			var menuItem = self.$node.querySelectorAll("lyte-menu-item:not(#dummy):not(.cxNotSortable)"), bool = false , objItems = self.data.items;//No I18n
					curPos = typeof curPos === 'number' ? curPos : Array.prototype.slice.call(menuItem).indexOf(liItem);//No I18n
					var ele = Lyte.arrayUtils(typeof grprPos === 'number' ? objItems[grprPos].fields : objItems, "removeAt", curPos, 1)[0];//No I18N   grprPos is a lookup modules grouping location
					var uNSelector = self.data.cxPropUniqueNameSelector;
					ele[key] = checkUncheck == "check" ? true : false;
					if(self.data.cxPropLazyRender){
						self.setColumnValueForLazy(ele , "remove"); //No I18n
					}
					if(checkUncheck == "check"){
						var index=self.selectedCount(key);
						var selected = typeof grprPos === 'number' ? index : (curPos<index?curPos:index);//No I18n
						if(key == "pinned"){
							var largeIndEleCnt = 0;
							for(var k = 0 ; k < items.length ; k++){
								let it=items[k];
								if( !it.pinned ){
									break;
								}
								if( it.id != item.id){
									if(curPos <= it.cxFrom){
										largeIndEleCnt++;
									}
								}
							}
							ele.cxFrom = curPos - largeIndEleCnt;
						}else if(self.grouping){
							var suffix = self.data.items[grprPos].suffix;
							ele[key] = true ; ele.cxIsFrom = self.data.items[grprPos][uNSelector] ;
							if (suffix && suffix !== "cxColumnListDefault"){
								ele.cx_display_label = ele[self.data.cxPropDisplayLabel]+" (" + suffix + ")";
								self.accordianAsChecked[ele.cxIsFrom] += 1;
							}

						}
					}else{
						var index=self.selectedCount('selected');
						if(key == "pinned"){
							index= self.itemInd;
							delete self.itemInd;
						}
						var selected=(index<curPos?curPos:index);
						if(self.grouping && ele.cxIsFrom && ele.cxIsFrom !== "cxColumnListDefault" && key !== "pinned"){
							ele.cx_display_label = undefined; //ele[self.data.cxPropDisplayLabel].substring(ele[self.data.cxPropDisplayLabel].indexOf(")") + 2);
							var ind = self.data.items.map( function(x){ return x.api_name; }).indexOf(ele.cxIsFrom) , targetItem = self.data.items[ind];
							if(targetItem.isDatafetched){
								var eleIndex = targetItem.fields.length;
								if(self.data.cxPropSortOrder){
									var dummyArray = $L.extend(true , [] ,targetItem.fields);
									dummyArray.push(ele)
									eleArr = self.getSortedArray(dummyArray);
									eleIndex = eleArr.findIndex(function(x){return x[uNSelector] === ele[uNSelector]})
								}
								Lyte.arrayUtils(targetItem.fields, "insertAt", eleIndex, ele);//No I18n
								var curEle = $L("#cxColumListAccItem_"+ind , self.$node)[0]
								if(curEle && !curEle.classList.contains('lyteAccordionActive')){
									curEle.click();
								}
								// Lyte.arrayUtils(targetItem.fields, "push", ele);//No I18n
							}else{
								var fInd = self.selectedAccFields.findIndex(function(x){ return x[uNSelector] === ele[uNSelector]});
								self.selectedAccFields[targetItem[uNSelector]].splice(fInd , 1);
							}
							Lyte.objectUtils(targetItem, "add", 'isAllSelected', false);//No I18n
							// Lyte.objectUtils(targetItem, "add", 'hideSection', false);//No I18n
							self.accItems[ind].classList.remove('dN'); //No I18n
							self.accordianAsChecked[ele.cxIsFrom] = self.accordianAsChecked[ele.cxIsFrom] - 1;
							if(self.accordianAsChecked[ele.cxIsFrom] === 0){
								delete self.accordianAsChecked[ele.cxIsFrom];
							}
							bool = true;
						}else if(self.data.cxPropSortOrder ){
								var unSelArr = items.slice(selected , items.length);unSelArr.push(ele);
								var unSelSortedArr = self.getSortedArray(unSelArr);
								var unSelSortedArrInd = unSelSortedArr.findIndex(function(x){return x[uNSelector] === ele[uNSelector]})
								selected = selected + unSelSortedArrInd;
							// Lyte.arrayUtils(items, "insertAt", selected, ele);//No I18n
						}
					}
					if(self.data.cxPropLazyRender){
						// var ind=self.selectedCount('selected'); 
						if(selected <= self.data.items.length){
							Lyte.arrayUtils(self.data.items, "insertAt", self.selectPosition ? self.selectPosition - 1 : selected, ele);//No I18n
						}else{
							var newInd = self.columnsToBeRender.findIndex(function(x){return !x.selected});
							self.columnsToBeRender.splice(newInd , 0 , ele);
						}
						self.setColumnValueForLazy(ele , "add" , self.selectedCount('selected',true));//No I18n
						bool = true
					}
					if(!bool){
						Lyte.arrayUtils(items, "insertAt", self.selectPosition ? self.selectPosition - 1 : selected, ele);//No I18n
					}
					delete self.selectPosition;
					if(typeof grprPos === 'number'&& checkUncheck === "check"){       // lookup grouper column list changes.
						var menuItems = accBody.querySelectorAll("lyte-menu-item"); //No I18n
						if(!menuItems.length){
							Lyte.objectUtils(objItems[grprPos], "add", 'isAllSelected', true);//No I18n
						}
						var visibleMenuItems = accBody.querySelectorAll("lyte-menu-item:not(.lyteSearchHidden)") , searchVal = self.searchVal; //No I18n
						if(searchVal && searchVal.length && !visibleMenuItems.length){
							self.accItems[grprPos].classList.add('dN'); //No I18n
							// Lyte.objectUtils(objItems[grprPos], "add", 'hideSection', true);//No I18n
						}
					}
					var input = $L('input',self._searchInput)[ 0 ]
					if(self._searchInput && input.value && !self.data.cxPropLazyRender){
						self.resetScroll = false;
						self._searchInput.setValue(input.value);
					}
					if(!this.checkUncheckAllEvent){
						liItem.style.transition = "";//No I18n
						liItem.style.transform = "";//No I18n
						liItem.style.background = "#fff";//No I18n
						liItem.style.zIndex="";//No I18n
					}
					// if( key == "pinned" ){
					// 	self.setData("pinnedFieldCount" , self.selectedCount(key));//no i18n
					// }
					if(key == "pinned"){
						if( self.getMethods("onPinOptionChanged") ){
							var selectedList=self.getSelectedFields();
							/**
							 * This method is invoked when a pinned field is changed.
							 * @method onPinOptionChanged
							 * @author manikaraja.p
							 * @version 1.0.0
							 * @param { * } selectedList
							 * @param {*} checkbox element
							 * @param {*} items
							 * @param {*} action PinAction/UnpinAction
							 */
							self.executeMethod("onPinOptionChanged",selectedList, self.$node.querySelector("#"+chkBox.id).parentElement, self.data.items , selected ,checkUncheck == "check" ? "PinAction" : "unPinAction");//No I18n
						}
					}else{
						self.afterSelectionUnselection(checkUncheck == "check" ? "onCheckBoxChecked" : "onCheckBoxUnChecked", selected,chkBox);
					}
					self.sortableMenu();
		},
		checkUncheck : function(checkUncheck, item, chkBox , key , grprPos , curPos){
			if(this.checkUncheckAllEvent && !this.data.isAccordianEnabled){
				return;
			}
			var _self = this;
	    	var liItem = chkBox.closest("lyte-menu-item") , uNSelector = this.data.cxPropUniqueNameSelector;//No I18n
   			var events = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend", "animationend"];//No I18n
			var items = typeof grprPos === 'number' ? this.data.items[0].fields : this.data.items;
			if(this.checkUncheckAllEvent){
				this.checkUncheckFn(checkUncheck, item, chkBox , key , grprPos , curPos,_self,liItem, items);
			}else{
				events.forEach(function(eve){
					liItem.addEventListener(eve, function uncheckListener(e){
						if(e.currentTarget.dataset.triggered) { return; };
						e.currentTarget.dataset.triggered = true;
						_self.checkUncheckFn(checkUncheck, item, chkBox , key , grprPos , curPos, _self,liItem, items);
						events.forEach(function(eve1){
							liItem.removeEventListener(eve1, uncheckListener);
						});
					});
				});
			}
			if(!this.checkUncheckAllEvent){
				var menuItem = this.$node.querySelectorAll("lyte-menu-item:not(#dummy):not(.cxNotSortable)");//No I18n
				var curPosition = Array.prototype.slice.call(menuItem).indexOf(liItem);//No I18n
				if(checkUncheck == "check"){
					var index=this.selectedCount(key);//No I18n
					var selected = curPosition < index ? curPosition : index;//No I18n
					var c = this.getHiddenCount(menuItem,curPosition,selected);
					var diff = (curPosition - selected - c);
					if(this.selectPosition){
						diff = diff + ( index - this.selectPosition );
					}
					var diffLen = diff * liItem.getBoundingClientRect().height;
					if(typeof grprPos === "number"){
						if(grprPos !== 0){
							var height = $L(".columnListAccHeader" , this.$node)[0].offsetHeight;
							diffLen = diffLen + (height * grprPos);
						}
					}
					liItem.style.transition = "0.3s all ease";//No I18n
					liItem.style.transform = "translateY(-"+diffLen+"px)";//No I18n
					liItem.style.background = "#ebebeb";//No I18n
					liItem.style.zIndex="1";//No I18n

				}
				else{
					var index = this.selectedCount(key )-1;//No I18n
					if(key == "pinned"){
						var itemInd = item.cxFrom;
						for(var k = 0 ; k < items.length ; k++){
							let it = items[k];
							if( !it.pinned ){
								break;
							}
							if( it.id != item.id){
								// if( item.cxFrom >= it.cxFrom ){
								// 	it.cxFrom = it.cxFrom - 1;
								// }else
								if(item.cxFrom < it.cxFrom){
									itemInd = itemInd + 1;
								}
							}
						}
						var lastItem = items[itemInd];
						if(!lastItem){
							var lInd = items.length-1;
							lastItem = items[lInd];
							item.cxFrom = itemInd = lInd;
						}
						var existingPosEle = document.getElementById(lastItem.id+"_"+lastItem[uNSelector]);
						// var existingPosEle = $L("#"+items[itemInd].id+"_"+items[itemInd][uNSelector])[0];
						if( existingPosEle.checked ){
							index = itemInd;
						}
						this.itemInd = index;
					}
					var selected=(index<curPosition?curPosition:index);
					var c=this.getHiddenCount(menuItem,curPosition,selected);
					var diffLen = (selected - curPosition - c) * liItem.getBoundingClientRect().height;
					if(typeof grprPos === "number"){
						var fie = this.getData("items")[grprPos].fields[curPos];//No I18n
						if(fie.cxIsFrom && fie.cxIsFrom !== "cxColumnListDefault" && key !== "pinned"){
							var ind = this.data.items.map(function(x){ return x[uNSelector]}).indexOf(fie.cxIsFrom);
							var height = 0;
							while(1 <= ind){
								height = height + $L("#cxColumListAccItem_"+ind , this.$node)[0].offsetHeight;
								ind--;
							}
							var activeMenuItems = this.$node.querySelector("#cxColumListAccItem_0").querySelectorAll("lyte-menu-item:not(.lyteSearchHidden)"); //No I18n
							var clickedIndexPos = Array.prototype.slice.call(activeMenuItems).indexOf(liItem);
							height = height + (activeMenuItems.length - (clickedIndexPos + 1));
							diffLen = diffLen + height;
						}
					}
					liItem.style.transition = "0.3s all ease";//No I18n
					liItem.style.transform = "translateY(+"+diffLen+"px)";//No I18n
					liItem.style.background = "#ebebeb";//No I18n
					liItem.style.zIndex="1";//No I18n
				}
			}
		},
		onResize : function(){
			this.getRenderCount();
			this.lazyRender();
		},
		initialRender : function(columns){
			var count = this.getRenderCount()
			var renderFields = columns.slice(0 , count);
			this.columnsToBeRender = columns.slice(count);
			this.setData("items" , renderFields); //No I18n
			this.sortableMenu();
			if(count === 50){
				this.lazyRender();
			}
		},
		getRenderCount : function(){
			var oHeight = $L(".lyteBodyPosition" , this.$node)[0].offsetHeight; //No I18n
			var curCount = Math.ceil(oHeight/10);
			this.initRenderCount =  curCount > 50 ? curCount : 50;
			this.scrollRenderCount =  Math.ceil(this.initRenderCount/2);
			return this.initRenderCount;
		},
		lazyRender : function(){
			var scrollHeight , scrollTop , self = this.$node ? this : $L(this).closest('crux-column-list')[0].component , elem = $L(".lyteBodyPosition" , self.$node)[0], gap = self.initRenderCount * 2  , columns = self.columnsToBeRender ;
			$L.fastdom.measure(()=> {
				scrollHeight = elem.scrollHeight - gap;
				offsetHeight = Math.ceil(elem.offsetHeight);
				scrollTop = Math.ceil(elem.scrollTop);
			});
			$L.fastdom.mutate(()=> {
				if(scrollHeight <= (offsetHeight + scrollTop) && columns.length){
					let renderColumns = columns.slice(0 ,self.scrollRenderCount);
					self.columnsToBeRender = columns.slice(self.scrollRenderCount);
					Lyte.arrayUtils(self.data.items , "push", renderColumns); //No I18n
					self.sortableMenu();
				}
			})
		// }
		},
		getFilteredFields : function(){
			var  accordianFields = [], cxField , uniqueFields=[], fields = [] , cxFields = Lyte.deepCopyObject( this.data.cxPropFields ) , len = cxFields.length , uNSelector = this.data.cxPropUniqueNameSelector ;
			this.itemsArray = [],this.selectedAccFields = {};
			for(var i = 0 ; i < len ; i++){
				cxField = cxFields[i];
				if(cxField.cxAccHeader || cxField.cxGroupHeader){
					accordianFields.push(cxField);
					uniqueFields = [];
					if(cxField.fields && cxField.fields.length){
						uniqueFields = cxField.fields;
						uniqueFields.map(function(x){ x[uNSelector] = cxField[uNSelector]+"."+x[uNSelector]; });
					}
				  //this.itemsArray.push({ fields : [] , field : fields[i] , field_prefix : fields[i][dLabel] , [uNSelector] : fields[i][uNSelector] , header_label : fields[i][dLabel] + " " + _cruxUtils.getI18n("crm.label.field.plural") , isDatafetched : false , isAllSelected : false , hideSection : false });
					this.itemsArray.push({ fields : uniqueFields , suffix : cxField.suffix , [uNSelector] : cxField[uNSelector] , header_label : cxField.cxAccHeader ? cxField.cxAccHeader : cxField.cxGroupHeader , isDatafetched : uniqueFields.length || cxField.cxGroupHeader ? true : false , isAllSelected : false , hideSection : false});
					this.selectedAccFields[cxField[uNSelector]] = [];
				}else{
					fields.push(cxField);
				}
			}
			if(!accordianFields.length){
				this.setData("isAccordianEnabled" , false);		//No I18n
				return cxFields;
			}
			this.isFetchingTriggered = {};
			this.accordianAsChecked = {};
			this.grouping = true;
			var selectedFields = this.data.cxPropSelectedFields , dLabel = this.data.cxPropDisplayLabel;
			this.itemsArray.unshift({ fields : [] , suffix : "cxColumnListDefault" , [uNSelector] : "cxColumnListDefault" ,header_label : this.data.cxPropAllSortLiteral , isDatafetched : true , isAllSelected : false , hideSection : false }); //No I18n
			this.accordianFields = accordianFields;
			if(accordianFields.length){
				var lFields=selectedFields.filter( function(x){ return x[uNSelector].split(".").length === 2});
				var fLen = lFields.length , apis , groupIndex , grpFld , rInd , disLabel , grpFldUniSel;
				for( j = 0 ; j < fLen ; j++){
					apis = lFields[j][uNSelector].split(".");
					groupIndex = accordianFields.findIndex(function(x){ return x[uNSelector] === apis[0]; });
					grpFld = accordianFields[groupIndex];
					if(grpFld){
						grpFldUniSel = grpFld[uNSelector];
						disLabel = grpFld.suffix;
						lFields[j].cx_display_label = disLabel ? lFields[j][dLabel]+" (" + disLabel + ")" : lFields[j][dLabel];
						lFields[j].cxIsFrom = grpFldUniSel;
						if(this.accordianAsChecked[grpFldUniSel]){
							this.accordianAsChecked[grpFldUniSel] = this.accordianAsChecked[grpFldUniSel] + 1;
						}else{
							this.accordianAsChecked[grpFldUniSel] = 1;
						}
						this.selectedAccFields[grpFldUniSel].push(lFields[j]);
						fields.push(lFields[j]);
						rInd = this.itemsArray[groupIndex].fields.findIndex( x => x[uNSelector] === grpFldUniSel);
						if(rInd !== -1){
							this.itemsArray[groupIndex].fields.splice(rInd , 1);
						}
					}
				}
				if(accordianFields[0].cxGroupHeader){
					this.setData("isGrouperEnabled" , true);		//No I18n
				}else{
					this.setData("isAccordianEnabled" , true);		//No I18n
				}
			}else{
				this.setData({'isGrouperEnabled' : false ,'isAccordianEnabled' : false });
			}
			return fields;
	},
	getSortedArray : function(fields){
		var sort = this.data.cxPropSortOrder , filter_key = this.data.cxPropDisplayLabel;
		if(sort === "ascending"){
		   var x = -1 , y = 1;
		}else if(sort === "descending"){
			 var x = 1 , y = -1;
		}else{
			 return fields;
		}
		fields.sort(function(a, b) {
        var nameA = a[filter_key].toUpperCase();
        var nameB = b[filter_key].toUpperCase();
        if (nameA < nameB) {
            return x;
        }
        if (nameA > nameB) {
            return y;
        }
        return 0;
    });
    return fields;

	},
	keyDownEvent : function(){
		setTimeout(() => {
			if(this.$node.cxProp('aria')){
				this.bindEventForAriaColumnList();
			}
		}, 500);
	}.observes('items', 'cxPropAria').on('didConnect')
},{mixins: ["crux-aria-column-list-mixin"]});
