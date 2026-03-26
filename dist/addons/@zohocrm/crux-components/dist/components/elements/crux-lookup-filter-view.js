//$Id$
Lyte.Component.register("crux-lookup-filter-view", {
_template:"<template tag-name=\"crux-lookup-filter-view\"> <div class=\"cxLookupFilterViewHeading clearAfterB\"> <h4 class=\"cxDIB m0\"><template is=\"if\" value=\"{{expHandlers(cxPropHeader,'!')}}\"><template case=\"true\">{{cruxGetI18n('crm.lookup.chooserecord',module.singular_label)}}</template><template case=\"false\">{{cxPropHeader}}</template></template></h4> <template is=\"if\" value=\"{{customCloseNeeded}}\"><template case=\"true\"> <div class=\"fR\" data-zcqa=\"lookup_closeIcon\" onclick=\"{{action('closeModal')}}\"> <span class=\"newPopupCloseIcon ico-close-small2 cxNewPopupCloseIcon \"></span> </div> </template></template> </div> <div class=\"cxAlignRight dF pL20 pR20 clearAfterB moduleRelatedDropdown cxModuleRelatedDropdown\"> <lyte-dropdown lt-prop-yield=\"true\" lt-prop-selected=\"{{lbind(selectedRelatedRecordIndex)}}\" data-zcqa=\"relatedRecord\" lt-prop-disabled=\"{{disableRelatedTo}}\" lt-prop-freeze=\"false\" lt-prop-tabindex=\"1\" class=\"dIB mR20 relatedDropdownLookup cxLookupFilterViewRelatedDropdown {{cxPropLookupFilterWrapperClass}}\" on-option-selected=\"{{method('showRelatedRecords')}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{relatedRecordData}}\" item=\"relatedRecord\" index=\"relatedRecordIndex\"> <lyte-drop-item data-zcqa=\"relatedRecord_{{relatedRecordIndex}}\" data-value=\"{{relatedRecordIndex}}\">{{relatedRecord.name}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-input class=\"lookupsearch cxDIB\" lt-prop-id=\"filterbox\" data-zcqa=\"lookupSearch\" lt-prop-focus=\"true\" lt-prop-appearance=\"box\" lt-prop-type=\"search\" lt-prop-value=\"{{lbind(searchBarAttr.searchValue)}}\" lt-prop-placeholder=\"{{if(cxPropSearchPlaceholder,cxPropSearchPlaceholder,searchBarAttr.displayMsg)}}\" lt-prop-maxlength=\"200\" lt-prop-autocomplete=\"off\" on-value-change=\"{{method('searchBarSearch')}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropCreateYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"createYield\" class=\"cxLFVCreateYield cxMlAuto\"></lyte-yield> </template></template> </div> <lyte-popover lt-prop-origin-elem=\"#coloumnSelectOrg\" lt-prop-class=\"columnCustomizeWrap\" lt-prop-wrapper-class=\"columnCustomizeWrap {{cxPropLookupFilterWrapperClass}}\" lt-prop-animation=\"zoom\" lt-prop-bind-to-body=\"false\" lt-prop-show=\"{{showColList}}\" lt-prop-header-padding=\"0px\" lt-prop-content-padding=\"0px\" lt-prop-footer-padding=\"0px\" lt-prop-freeze=\"false\" lt-prop-type=\"box\" lt-prop-placement=\"bottomLeft\" lt-prop-scrollable=\"false\" lt-prop-show-close-button=\"false\" lt-prop-close-on-body-click=\"true\" on-close=\"{{method(&quot;closeColumnList&quot;)}}\" on-show=\"{{method(&quot;setScrollableHeight&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"lookupColumnCustomize\"> <crux-column-list cx-prop-disable-sort-for-unselected-fields=\"true\" cx-prop-selected-fields=\"{{header}}\" class=\"lookupColumnCustComp {{cxPropLookupFilterWrapperClass}}\" id=\"cruxColumnList\" cx-prop-mandatory=\"mandatoryColumn\" cx-prop-max-select-column=\"10\" cx-prop-fields=\"{{availableFields}}\" on-before-unchecked=\"{{method('uncheckColumn')}}\" on-search=\"{{method('OnColumnListSearch')}}\" cx-prop-zcqa-prefix=\"listView_\" cx-prop-drag-zcqa-prefix=\"listViewDrag_\"> </crux-column-list> </lyte-popover-content> <lyte-popover-footer class=\"lookupColumnCustButtons\"> <div class=\"cxColumnListBtn\"> <template is=\"if\" value=\"{{showColListFooter}}\"><template case=\"true\"> <lyte-button data-zcqa=\"columnListSaveButton\" lt-prop-appearance=\"primary\" class=\"mR10\" onclick=\"{{action('closeColumnList','SAVE')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.save')}}</template> </lyte-button> <lyte-button data-zcqa=\"columnListCancelButton\" lt-prop-class=\"mR0\" onclick=\"{{action('closeColumnList','CANCEL')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.cancel')}}</template> </lyte-button> </template></template> </div> </lyte-popover-footer> </template> </lyte-popover> <div class=\"cxAdvanceLookupFilterField lookupFieldList pR\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-wrapper-class=\"{{cxPropLookupFilterWrapperClass}}\" lt-prop-show=\"{{showSortableOptions}}\" lt-prop-event=\"click\" id=\"sortOrderMenu\" on-menu-click=\"{{method('sortColumnsInLookup')}}\" on-close=\"{{method('sortColumnsClose')}}\" lt-prop-query=\".sortableTarget\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{availableSort}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxLookupSortItemNew\" data-zcqa=\"sort_column_{{index}}\" data-value=\"{{item.value}}\"> <lyte-menu-label> <span class=\"cxDIB {{item.class}}\"></span> <span class=\"cxDIB cxVam\">{{item.name}}</span> </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <span tabindex=\"0\" class=\"cxFlexCenter advanceFilter cxLookupFilterViewAdvanceFilterIcon {{cxPropFilterWrapperClass}}\" data-zcqa=\"lookupAdvanceFilterIcon\" lt-prop-title=\"{{if(showFilter,cruxGetI18n('crm.button.clear.filter'),cruxGetI18n('crm.button.show.filter'))}}\" onclick=\"{{action('filterAction',this)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"></span> <crux-table-component cx-prop-show-scroll-on=\"hover\" cx-prop-zcqa-selector=\"field_label\" cx-prop-module=\"{{moduleName}}\" cx-prop-clip-mode=\"false\" cx-prop-hide-header-on-no-content=\"false\" class=\"lyteOuterTable dB entityLookupTable lyteFixedHeaderTable {{if(bigLookupTable,'bigLookupTable','')}}\" cx-prop-column-cell-class=\"lookupCriteriaLabelWrap1\" cx-prop-header=\"{{header}}\" cx-prop-show-business-card=\"false\" cx-prop-row-zcqa=\"detailView\" cx-prop-content=\"{{record}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-sort-columns=\"true\" cx-prop-table-class=\"lookupLyteTable\" cx-prop-no-records-message=\"{{cruxGetI18n('crm.module.empty.message',module.plural_label)}}\" cx-prop-enable-body-scroll=\"false\" cx-prop-show-tooltip=\"false\" cx-prop-no-content-class=\"noresultstyle\" cx-prop-field-type-mapping=\"{{uiTypeMapping}}\" cx-prop-show-filter=\"{{showFilter}}\" set-lookup-filter-conditions=\"{{method('setLookupFilterConditions')}}\" cx-prop-filter-component=\"crux-lookupfilter-component\" apply-filter=\"{{method('applyFilter')}}\" clear-filter=\"{{method('clearFilter')}}\" header-fields=\"{{header}}\" cx-prop-show-sort-icon=\"true\" on-sort=\"{{action('sortColumn')}}\" cx-prop-sorted-column=\"{{sortedColumn}}\" cx-prop-sorted-order=\"{{sortDetails.sort_order}}\" cx-prop-selected-rows=\"{{cxPropDisabledList}}\" cx-prop-selected-row-class=\"cxLookupDisableRow\" cx-prop-lookup-properties=\"{{cxPropLookupProperties}}\" cx-prop-table-wrapper-class=\"{{cxPropLookupFilterWrapperClass}}\"> <template is=\"registerYield\" yield-name=\"body-aTag\"> <link-to data-zcqa=\"{{recordObj[fieldObj.api_name]}}\" lt-prop-class=\"link\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{moduleName}}&quot;, &quot;{{recordObj.id}}&quot;]\" onclick=\"{{action(&quot;selectSingle&quot;,recordObj.id,this,event)}}\"> {{recordObj[fieldObj.api_name]}} </link-to> </template> <template is=\"yield\" yield-name=\"header-prefix-1\" cx-prop-fixed=\"enable\"> <div class=\"lookupCriteriaLabelCol {{if(clientAccount,'cD','')}}\"> <span tabindex=\"0\" class=\"cxDIB coloumnSelect cP {{if(clientAccount,'vH eventNone','')}}\" data-zcqa=\"lookupColumnSelectIcon\" id=\"coloumnSelectOrg\" onclick=\"{{action('showColumnList',event)}}\" lt-prop-title=\"{{cruxGetI18n('crm.label.addColumn')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;}\"></span> <div class=\"lookupCriteriaFilter cxLookFilterVwCriteriaFilter cxdN\"></div> </div> </template> <template is=\"yield\" cx-prop-style=\"width:50px\" yield-name=\"header-suffix-1\"></template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <lyte-radiobutton lt-prop-type=\"primary\" lt-prop-name=\"record\" data-zcqa=\"radioButon_{{recordObj.id}}\" lt-prop-value=\"{{recordObj.id}}\" lt-prop-checked=\"{{ifEquals(recordObj.id,selectedSingle)}}\" onclick=\"{{action('selectSingle',recordObj.id)}}\"></lyte-radiobutton> </template> <template is=\"yield\" yield-name=\"body-lookup\">{{recordObj[fieldObj.api_name].name}}</template> <template is=\"yield\" yield-name=\"body-territory\"> <template is=\"for\" items=\"{{recordObj[fieldObj.api_name]}}\" item=\"item\" index=\"index\"> {{item.Name}} </template> </template> </crux-table-component> </div> <div class=\"cxLookupModalbuttonLayer cxLookupModalFooter {{if(scrollableTable,'moreRecordsTable','')}}\"> <template is=\"if\" value=\"{{expHandlers(lookupSingle,'&amp;&amp;',selectedSingle)}}\"><template case=\"true\"> <div class=\"cxSelectedSingle\"> {{cruxGetI18n(\"crm.record.selected\",module.singular_label)}}: {{lookupSingle}} </div> </template></template> <template is=\"if\" value=\"{{record.length}}\"><template case=\"true\"> <div class=\"cxMlAuto lookupPageNavigation\" data-zcqa=\"lookupNavigation\"> <lyte-navigator id=\"navigator\" lt-prop-more-records=\"{{hasMoreRecords}}\" lt-prop-show-only-icon=\"true\" lt-prop-value=\"{{navigatedRec}}\" lt-prop-records=\"{{navigatorRecordLen}}\" lt-prop-per-page=\"{{perPage}}\" on-next=\"{{method('rendNext')}}\" on-previous=\"{{method('rendPrev')}}\"></lyte-navigator> </div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,0]},{"type":"if","position":[1,1,0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7,1]},{"type":"registerYield","position":[7,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[7,1]},{"type":"attr","position":[7,3]},{"type":"attr","position":[7,5]},{"type":"registerYield","position":[7,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[7,5,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]},{"type":"registerYield","position":[7,5,5],"dynamicNodes":[]},{"type":"registerYield","position":[7,5,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[7,5,9],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"registerYield","position":[7,5,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1]}]}]},{"type":"componentDynamic","position":[7,5]},{"type":"attr","position":[9]},{"type":"attr","position":[9,1]},{"type":"if","position":[9,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}},{"type":"attr","position":[9,3]},{"type":"if","position":[9,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["cxPropDefaultFields","cxPropAllFieldsNeeded","cxPropField","cxPropFrom","showSortableOptions","requiredFieldsForApi","availableFields","availableSort","renderLookupView","searchDoMode","fieldOfLookupVal","currentSelectedRecord","defaultCriteria","searchBarCriteria","targetElement","relatedRecordCriteria","flushView","bigLookupTable","selectedRelatedRecordIndex","relatedRecordData","tempClose","fieldsObj","renderLookup","displayField","selectedSingle","sortDetails","criteria","searchBarAttr","showFilter","customCloseNeeded","scrollableTable","selectedFields","currentSelectedFields","module","moduleName","header","cxPropHeader","cxPropCreateYield","lookupSingle","record","sortedColumn","cxPropHideHeaderOnNoContent","cxPropSearchPlaceholder","modId","comparator","next","navigatedRec","currentPage","tableScrollHeight","perPage","navigatorRecordLen","value","hasMoreRecords","uiTypeMapping","lookupViewRestrictedColumns","lookupViewRestrictedModuleVsColumn","appointmentHiddenFields","tasksHiddenFields","servicesHiddenFields","formulaReturnTypeComparators","lookupUitypeComparator","lookupDatatypeComparator","cxPropReturnFullObjectOnGet","cxPropDisabledList","cxPropQueryParam","cxPropLookupFilterWrapperClass","isRelatedRecordPassed","cxPropAriaButton","allowEncryptedFields","defaultCriteriaStr","cxPropShowAllFields","cxPropLookupProperties","cxPropProfileId"],
_observedAttributesType :["object","boolean","object","string","boolean","array","array","array","boolean","boolean","array","object","array","string","string","string","boolean","boolean","number","array","boolean","object","boolean","string","string","object","string","object","boolean","boolean","boolean","object","object","object","string","array","string","boolean","string","array","string","boolean","string","string","boolean","array","number","number","number","number","number","object","boolean","object","array","object","array","array","array","object","object","object","boolean","array","object","string","boolean","object","boolean","string","boolean","object","string"],
// No I18n
	data : function(){
		return {
			cxPropDefaultFields : Lyte.attr("object", {default : {}}), //NO I18N
			cxPropAllFieldsNeeded : Lyte.attr( 'boolean', { 'default' : false} ),//NO I18N
			cxPropField : Lyte.attr("object", {default : {}}),//NO I18N
			cxPropFrom : Lyte.attr("string",{default:''}),// NO I18N
			showSortableOptions : Lyte.attr( 'boolean', { 'default' : false} ),//NO I18N
			requiredFieldsForApi : Lyte.attr('array',{'default': []}),//NO I18N
			availableFields : Lyte.attr('array',{'default': []}),//NO I18N
			availableSort : Lyte.attr('array',{'default': []}),//NO I18N
			renderLookupView : Lyte.attr( 'boolean', {'default' : false}),//NO I18N
			searchDoMode : Lyte.attr( 'boolean', {'default' : false}),//NO I18N
			fieldOfLookupVal : Lyte.attr('array',{'default': []}),//NO I18N
			currentSelectedRecord : Lyte.attr("object", {default : {}}),//NO I18N /* crux lookup only needs id and val, entity lookups need more data about the record */
			defaultCriteria : Lyte.attr('array',{'default': []}),//NO I18N
			searchBarCriteria : Lyte.attr("string",{default:''}),// NO I18N
			targetElement : Lyte.attr("string",{default:''}),// NO I18N
			relatedRecordCriteria : Lyte.attr("string",{default:''}),// NO I18N
			flushView : Lyte.attr( 'boolean', {'default' : false}),//NO I18N
			bigLookupTable : Lyte.attr( 'boolean', {'default' : false}),//NO I18N
			selectedRelatedRecordIndex : Lyte.attr( 'number', {default:0}),//NO I18N
			relatedRecordData : Lyte.attr('array',{'default': []}),//NO I18N
			tempClose : Lyte.attr("boolean", {default : false}),// No I18n
			fieldsObj : Lyte.attr("object", {default : {}}),//NO I18N
//			lookupUrlForCampaign : Lyte.attr("string",{default:''}),// NO I18N
			renderLookup : Lyte.attr("boolean", {default : false}),// NO I18N
			displayField : Lyte.attr("string",{default:''}),// NO I18N
			selectedSingle : Lyte.attr("string",{default:''}),// NO I18N
			sortDetails : Lyte.attr( 'object', {default : {}}),//NO I18N
			criteria : Lyte.attr( 'string', {'default' : ''}),//NO I18N
			searchBarAttr:Lyte.attr("object", {default : {}}),//NO I18N
			showFilter : Lyte.attr("boolean", {default : false}),// NO I18N
			customCloseNeeded : Lyte.attr("boolean", {default : true}),// NO I18N
			scrollableTable  : Lyte.attr("boolean", {default : false}),// NO I18N
			selectedFields : Lyte.attr("object", {default : {}}),// NO I18N
			currentSelectedFields : Lyte.attr("object", {default : {}}),// NO I18N
			module : Lyte.attr("object", {default : {}}),// NO I18N
			moduleName : Lyte.attr("string", {default : ""}),// NO I18N
			header : Lyte.attr("array", {default : []}),// NO I18N
			cxPropHeader : Lyte.attr("string"),//NO I18N
			cxPropCreateYield : Lyte.attr("boolean", {default : false}),// NO I18N
			lookupSingle : Lyte.attr("string",{default:''}),// NO I18N
			record : Lyte.attr("array", {default : []}),// NO I18N
			sortedColumn : Lyte.attr("string"),// NO I18N
			cxPropHideHeaderOnNoContent : Lyte.attr("boolean", {default : true}),// NO I18N
			cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
			modId : Lyte.attr("string", {default : ""}),// NO I18N
			comparator : Lyte.attr("boolean",{default : false}),//NO I18N
			next : Lyte.attr("array",{default:[0,10]}),// NO I18N
			navigatedRec  : Lyte.attr("number",{default:0}),// NO I18N
			currentPage : Lyte.attr("number",{default:1}),// NO I18N
			tableScrollHeight : Lyte.attr("number",{default:200}),// NO I18N
			perPage : Lyte.attr("number",{default:10}),// NO I18N
			navigatorRecordLen : Lyte.attr("number",{default:0}),// NO I18N
			value : Lyte.attr("object"),// NO I18N
			hasMoreRecords : Lyte.attr("boolean",{default : false}),//NO I18N
			uiTypeMapping : Lyte.attr('object', {default : (typeof crmConstants !== "undefined" && crmConstants.defaultUiTypeToCruxMapping) ? Lyte.deepCopyObject(crmConstants.defaultUiTypeToCruxMapping) : {}}),//NO I18N
			lookupViewRestrictedColumns : Lyte.attr("array",{default:["CURRENCYISOCODE","SCORE","POSITIVE_SCORE","NEGATIVE_SCORE","TP_SCORE","TP_POSITIVE_SCORE","TP_NEGATIVE_SCORE","LEADSCORE"]}),// NO I18N
			lookupViewRestrictedModuleVsColumn : Lyte.attr("object",{default:{ Leads : ["QUALIFICATIONDURATION"] , Products : ["ACTIVE"]}}), //NO I18N
//			fieldsWithInOperatorUiType : Lyte.attr("array",{default:[2,100,207,208,999,209,26]}),
			appointmentHiddenFields:  Lyte.attr("array", { default : ["RESCHEDULEDFROM","REMINDER","ENDTIME"]}), //No i18n
			tasksHiddenFields: Lyte.attr("array", { default : ["REMINDAT","SENDNOTIFICATION"]}), //No i18n
			servicesHiddenFields : Lyte.attr("array", { default : ["AVAILABLE_DATES","AVAILABLE_DAYS","UNAVAILABLE_TILL","STARTING_DATE","CLOSING_DATE","JOBSHEETLAYOUT", "APPOINTMENTFOR","SEID", "APPOINTMENTLOCATION", "APPOINTMENTID", "APPOINTMENTADDRESS", "APPOINTMENTDATEANDTIME", "RESCHEDULEDFROM", "SERVICEID", "RESCHEDULEDTO", "RESCHEDULEDREASON", "RESCHEDULEDNOTE", "CANCELLATIONREASON", "CANCELLATIONNOTE", "SERVICEAVAILABILITY", "AVAILABLE_CUSTOM_TIMING","UNAVAILABLE_FROM", "JOBSHEETSECTION"]}), //No i18n
			formulaReturnTypeComparators : Lyte.attr("object",{default:{ //NO I18N
				boolean   : 'equals', //NO I18N
				currency  : 'equals', //NO I18N
				double    : 'equals', //NO I18N
				text   	  : 'starts_with', //NO I18N
				datetime  : 'between', //NO I18N
				date      : 'equals' //NO I18N
			}}),
			lookupUitypeComparator : Lyte.attr("object",{default:{//NO I18N
    			"starts_with" : [CrmField.UITYPES.SINGLE_LINE,CrmField.UITYPES.SKYPE_FIELD,CrmField.UITYPES.TEXT_FIELD,CrmField.UITYPES.TWITTER,CrmField.UITYPES.FIRST_NAME,CrmField.UITYPES.LAST_NAME,CrmField.UITYPES.TASK_SUBJECT,CrmField.UITYPES.MULTI_LINE_CF,CrmField.UITYPES.TEXT_AREA,CrmField.UITYPES.WEBSITE,CrmField.UITYPES.EMAIL,CrmField.UITYPES.ACCOUNT_NAME_LOOKUP,CrmField.UITYPES.CAMPAIGN_NAME_LOOKUP,CrmField.UITYPES.PRODUCT_NAME_LOOKUP,CrmField.UITYPES.CONTACT_LOOKUP,CrmField.UITYPES.VENDOR_NAME_LOOKUP,CrmField.UITYPES.POTENTIAL_ID,CrmField.UITYPES.SALESORDER_ID,CrmField.UITYPES.CONTACT_ID,CrmField.UITYPES.QUOTE_ID,CrmField.UITYPES.ROLE_NAME,CrmField.UITYPES.LOOK_UP_ENTITY,CrmField.UITYPES.MULTISELECT_LOOK_UP,CrmField.UITYPES.PHONE],		//NO I18N
    			"equals": [CrmField.UITYPES.SERVICE_DURATION,CrmField.UITYPES.DATE,CrmField.UITYPES.DATE_LONG,CrmField.UITYPES.NUMERIC_FIELD,CrmField.UITYPES.LONG_INTEGER,CrmField.UITYPES.CURRENCY,CrmField.UITYPES.AGGREGATE_FIELD,CrmField.UITYPES.PERCENT,CrmField.UITYPES.DECIMAL,CrmField.UITYPES.BIG_DECIMAL,CrmField.UITYPES.RECORD_CURRENCY,98,CrmField.UITYPES.BOOLEAN_DEF,CrmField.UITYPES.BOOLEAN_DEF_NOT,CrmField.UITYPES.AUTONUMBER],		//NO I18N
    			 //Contains for Phone Not supported by lucene
    			"in" : [CrmField.UITYPES.PRODUCT_HANDLER,CrmField.UITYPES.GLOBAL_TAX,999,CrmField.UITYPES.STAGE,CrmField.UITYPES.USERLOOKUP,CrmField.UITYPES.TAGS,CrmField.UITYPES.MULTI_PICK_LIST,CrmField.UITYPES.PICK_LIST,CrmField.UITYPES.OWNER,CrmField.UITYPES.CREATED_BY,CrmField.UITYPES.WIZARD,CrmField.UITYPES.LAYOUT],
    			"between" : [CrmField.UITYPES.DATE_TIME1,CrmField.UITYPES.CREATED_TIME,CrmField.UITYPES.DATETIME,CrmField.UITYPES.DATE_TIME2,CrmField.UITYPES.DATE_TIME_LONG]
    		}}),
	    	lookupDatatypeComparator : Lyte.attr("object",{default:{//NO I18N
				"starts_with" : ['text','textarea','phone','email','website','lookup'],		//NO I18N
				"equals": ['boolean','currency','double','date','integer','bigint','autonumber','decimal', 'longinteger'],		//NO I18N
				 //Contains for Phone Not supported by lucene
				"in" : ['ownerlookup','picklist','userlookup','multiuserlookup','multiselectpicklist'], //NO I18N
				"between" : ['datetime'], //NO I18N
				"formula" : ['formula'], //NO I18N
				"rollup_summary" : ['rollup_summary'] //NO I18N
			}}),
	    	cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
	    	cxPropDisabledList : Lyte.attr("array", {default : []}),
	    	cxPropQueryParam : Lyte.attr("object"),
			cxPropLookupFilterWrapperClass : Lyte.attr("string"),
	    	isRelatedRecordPassed : Lyte.attr("boolean", {default : false}),
	    	cxPropAriaButton : Lyte.attr("object"),
			allowEncryptedFields : Lyte.attr("boolean", {default : (typeof featuresAvailable === 'object' && featuresAvailable.ENCRYPT_SYSTEMDEFINED_FIELDS) ? true  : false}),
			defaultCriteriaStr : Lyte.attr("string"),
			cxPropShowAllFields : Lyte.attr("boolean", {default : false}),
			cxPropLookupProperties : Lyte.attr("object", {default : {routeName : "crm.tab.module.entity.detail"}}),
			cxPropProfileId: Lyte.attr('string',{default:typeof Crm!=="undefined"? Crm.userDetails.PROFILE_ID:''})
		}
	},
	init :function()
	{
		// this.setData({'uiTypeMapping.999' : 'layout', 'uiTypeMapping.96' : 'picklist' , 'uiTypeMapping.80' : 'number'}); //NO I18N
		var map = Object.assign(this.data.uiTypeMapping, {999 : 'layout', 96 : 'picklist', 80 : 'number', 21 : 'text', 22  : 'text', 25 : 'text'});//No I18n
		this.setData("uiTypeMapping", map);//No I18n
		this.lookupInit(this, this.getData("modId"), true);// NO I18N
	},
	didConnect: function() {
		this.lookupTableHeightCalc();
	},
	methods : {
		OnColumnListSearch : function(searchResult){
			this.setData('showColListFooter', searchResult.length ? true : false); //NO I18N
		},
		setScrollableHeight : function(){
			var windowHeight = renderingUtils.windowHeight;
			var scrollableHeight = windowHeight/2;
			$L('.lookupColumnCustComp .lyteSortableParent').css('max-height',scrollableHeight);// NO I18N
			$L("crux-column-list .divTopBorder").scrollTop(0);// No I18n
			$L("crux-column-list lyte-search")[0].setValue(""); // No I18n
		},
		associateSearchClick : function(inp){
			var icon = inp.querySelector(".searchIcon");//NO I18N
			var _this = this;
			icon.onclick = function(){
				var value = inp.querySelector("input");//NO I18N
				_this.actions.searchSetValue.call(_this, undefined, undefined, undefined, value.value, true);
			}
		},
		fetchModuleData : function(id){
			return store.findRecord("module", id,{include : "custom_view,business_card_fields,lookup_field_properties"}).then(function(res) {  // NO I18N
				if(res[0].api_name === 'Contacts' || res[0].api_name === 'Leads')
				{
					store.peekRecord('field',res[0].display_field.id).field_label = res[0].api_name === 'Contacts' ? I18n.getMsg('Contact Name', res[0].singular_label) : I18n.getMsg('Lead Name', res[0].singular_label); //NO I18N
					/*var size = res[0].fields.length;
					for(var i = 0; i < size; i++)
					{
						if(res[0].fields[i].api_name === 'Full_Name')
						{
							res[0].fields[i].field_label = res[0].api_name === 'Contacts' ? I18n.getMsg('Contact Name', moduleRecordMapping.Contacts.singular_label) : I18n.getMsg('Lead Name', moduleRecordMapping.Leads.singular_label);
							break;
						}
					}*/
				}
				return res[0];

			}, function(res){
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				var resp =  res ? JSON.parse(res.response) : {};
				if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		},
	    uncheckColumn : function(item) {
	    	if(item.display_field || item.yieldName === "aTag"){ //aTag is added to full name and Last name of contacts. Re-using it here for restricting uncheck
	    		return false
	    	}

	    },
	    setLookupFilterConditions : function(elem){
//	    	var header = elem.$node._callee.component.getData("header");//NO I18N /*work around for misalignment of filter*/  'cxPropDisplayFields' : header ,
//	    	var headerFields = elem.$node._callee.component.getData("headerFields");
	    	var lookupDatatypeComparator = this.getData('lookupDatatypeComparator')	//NO I18N
			var placeHolder = {'picklist' : _cruxUtils.getI18n("crm.select"),'user' : I18n.getMsg("crm.options.none"), 80 : _cruxUtils.getI18n("crm.label.type.minutes")}; //NO I18N
			elem.setData({cxPropNoValidation : true,  cxPropShowClear:true, cxPropDisableFilter: true, filterAtfirst : false,'cxPropComparator':false,'cxPropDatatypeComparator':lookupDatatypeComparator,'cxPropPlaceHolder':placeHolder,'cxPropCurrency':Crm.userDetails.BASE_CURRENCY});		//NO I18N
			elem.setMethods('picklistAdd',this.pickListValidator); //NO I18N
		},
		clearFilter : function(){//Check Arguments
			if(this.getData('criteria') && !this.fromSearchBar){
				this.setData({'criteria':'' , 'currentPage' : 1 , 'navigatedRec' : 0 }); //NO I18N
				if(this.validateSearchValue()) { this.renderPage() }//Verify whether search criteria need to be emptied
			}

		},
		applyFilter : function(ele)
		{
			var filter = ele.$node.component.getFilterQuery();
			var criteria = this.formatCriteriaForSearchAPI(filter);

			if(criteria && criteria.length){
				this.setData({'criteria':criteria , 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
				this.fetchFilteredRecords();
			}else{
				this.setData({'criteria':'' , 'currentPage' : 1 , 'navigatedRec' : 0 }); //NO I18N
				this.renderPage();
			}
		},
		rendNext : function(value){
				this.renderPage('next',value)//NO I18N
		},
		rendPrev : function(value ){
				this.renderPage('prev',value)//NO I18N
		},
	    searchBarSearch : function(){
	    	clearTimeout(this._timeout);
	    	this._timeout = setTimeout(function(){
//	    	this.rollBackFilterComponent(); //(Have Issues)
	    	var searchValue = this.data.searchBarAttr.searchValue ? this.data.searchBarAttr.searchValue.trim() : "";
	    	this.errorLabel = undefined;
			var fieldData = this.data.header.find(record => record.api_name === this.data.searchBarAttr.apiName)
	    	//eslint-disable-next-line no-unused-expressions
	    	var fieldLabel = fieldData.field_label,
				fieldComparator = this.data.allowEncryptedFields && fieldData.crypt !== null ? ":equals:" : ":starts_with:" ;
	    	if(!this.validateSearchValue(searchValue, fieldLabel)){
	    		this.errorLabel = fieldLabel;
	    		return false
	    	}
	    	if(this.data.searchBarAttr && searchValue){
	    	searchValue = searchValue.replace(/[(]/g,'\\(').replace(/[)]/g,'\\)');
	    	var criteria = "("+this.data.searchBarAttr.apiName+ fieldComparator +searchValue+")";
	    	// criteria += this.isProductCodeAvailable && this.isProductCodeAvailable.api_name ? "or("+this.isProductCodeAvailable.api_name+":starts_with:"+searchValue+")":''; //NO I18N
				if( this.isProductCodeAvailable && this.isProductCodeAvailable.api_name) {
					let codeComparator = this.data.allowEncryptedFields && this.isProductCodeAvailable.crypt !== null ? ":equals:" : ":starts_with:" ;
					criteria = '('+criteria + "or("+this.isProductCodeAvailable.api_name+ codeComparator +searchValue+"))"; //NO I18N
				}
	    	this.setData({'searchBarCriteria':criteria , 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
	    	this.fetchFilteredRecords();
	    	}else if(searchValue.length === 0){
	    		this.setData({'searchBarCriteria':'' , 'currentPage' : 1 , 'navigatedRec' : 0});//NO I18N
	    			this.renderPage();
	    	}
	    	}.bind(this),500);

	    },
	    sortColumnsInLookup : function(selectedSortOption){
			switch (selectedSortOption) {
				case 'mask':
				case 'unmask':			
					if(selectedSortOption === 'mask'){
						this.currentSelectedSortColumn.cxMasked = true;
					}else{
						this.currentSelectedSortColumn.cxMasked = false;
					}
					$L("crux-table-component" , this.$node)[0].maskUnmask(this.currentSelectedSortColumn.api_name , selectedSortOption === 'unmask');
					break;
				default:
					if(selectedSortOption === 'unsort'){
						this.setData({'sortDetails':{},'sortedColumn':"", 'currentPage' : 1 , 'navigatedRec' : 0 }); //NO I18N
					}else{
						this.setData('sortDetails',{sort_order : selectedSortOption,sort_by : this.currentSelectedSortColumn.api_name});//NO I18N
						this.setData({'sortedColumn':this.currentSelectedSortColumn.api_name, 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
					}
					delete this.currentSelectedSortColumn;
					this.renderPage();
					break;
			}
	    },
	    sortColumnsClose : function(){
	    	$L('.sortableColumn').removeClass('sortableColumn');// No I18n
			this.setData({'showSortableOptions': false, 'availableSort' : []});//NO I18N
		},
		selectSingle : function(id,elem){
			this.selectTheSingle(id,elem);
		},
		showRelatedRecords : function(){
			this.showRelatedRecords();
		},
		closeColumnList : function(){
			if(!this.saveColumn){
				$L("crux-column-list")[0].component.clearSelectedFields();
			}
			this.saveColumn = false;
			this.closeColumnList();
		},
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		onDropdownClose : function(event, comp){
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		}
	},
	actions : {
		showColumnList: function() {
	    	this.setData('showColList', true); //NO I18N
	    	},
	    closeColumnList : function(action){
	    	if(action === "SAVE"){
	    		this.saveColumn = true;
	    		this.putModuleData(this.getData("modId")); //NO I18N
	    	}else if (action === "CANCEL"){ //NO I18N
	    		this.saveColumn = false;
//	    		$L("crux-column-list")[0].component.clearSelectedFields();
	    	}
	    	this.closeColumnList();

	    },
	    filterAction : function(elem){
	    	if(this.getData("showFilter")){
	    		this.setData({'criteria' : '', 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
	    		this.renderPage();
	    		this.setData("showFilter",false);//NO I18N
	    		$L(elem).removeClass('lookupFilterOpen');//No I18N
	    	} else{
	    		this.setData("showFilter",true); //NO I18N
	    		this.$node.querySelector('lyte-table').scrollTable();//NO I18N /*To fix filter Open issues and scroll issues*/
	    		$L(elem).addClass('lookupFilterOpen');//No I18N
//	    		var filterElem = $L('.lookupFieldList crux-lookupfilter-component'); //eslint-disable-line webperf/no-complex-selector
//	    		var filterElemTop = filterElem.offset().top;
//	    		var filterElemHgt = filterElem.height();
//	    		var finalTop = filterElemTop + (filterElemHgt - 10);
//	    		$L('.cxLookupFilterButtonWrap').css('top', finalTop);//NO I18N
	    	}
	    },
		sortColumn: function (column, event, eventObj) {
	    	this.currentSelectedSortColumn = column;
			var profileId = this.getData('cxPropProfileId') , sortOrder = [];
			if(column.mask_details){
				var isMaskingNeeded = profileId && column.mask_details.profiles && column.mask_details.profiles.find((profile)=> profileId===profile.id);
				if(!isMaskingNeeded){
					return;
				}
			}
			var sortTarget = $L('.sortableTarget', this.$node);
			if(sortTarget[0]){
				sortTarget.removeClass('sortableTarget');// No I18n
			}
			var elem = eventObj.target;
			$L(elem).addClass('sortableTarget');//NO I18N
			if(column.api_name){
				if(column.sortable){
					// $L('.sortableTarget').removeClass('sortableTarget');// No I18n
					// var elem = document.getElementById(column.id).querySelector('.cxTableSortIcon');
					// var elem = event.target;
					// $L(elem).addClass('sortableTarget');//NO I18N
					sortOrder = [{value : 'asc' , name : _cruxUtils.getI18n('crm.column.sort.asc') , class : "cxSprite cxSortAscArrow sort_asc"} , {value : 'desc' , name : _cruxUtils.getI18n('crm.column.sort.desc') , class : "cxSprite cxSortDescArrow sort_desc"}];
					// var sortOrder = [I18n.getMsg('crm.column.sort.asc'), I18n.getMsg('crm.column.sort.desc')];// No I18n
					if(column.api_name === this.getData('sortDetails').sort_by && this.getData('sortDetails').sort_order){
						if(this.getData('sortDetails').sort_order ==="asc"){
							sortOrder.splice(0 , 1);
						}else{
							sortOrder.splice(1 , 1);
						}
						sortOrder.push({value : 'unsort' , name : _cruxUtils.getI18n('crm.column.unsort') , class : "cxSprite cxSortClearArrow sort_unsort"});
						// var sortData = [];
						// sortData.push( this.getData('sortDetails').sort_order ==="asc"? I18n.getMsg('crm.column.sort.desc') :I18n.getMsg('crm.column.sort.asc') );
						// sortData.push(I18n.getMsg('crm.column.unsort'));
						// sortOrder = sortData
					}
					
				}
				if(isMaskingNeeded){
					if(column.cxMasked || column.cxMasked === undefined){
						sortOrder.push({value : 'unmask' , name :  _cruxUtils.getI18n('crm.masking.view_masked_data') , class : "cxUnmaskIcon cxSprite"});						
					}else{
						sortOrder.push({value : 'mask' , name :  _cruxUtils.getI18n('crm.masking.hide_masked_data') , class : "cxMaskIcon cxSprite"});
					}
				}
				if(sortOrder.length){
					this.setData('availableSort',sortOrder);//NO I18N
					this.setData('showSortableOptions', true);//NO I18N
				}else{
					this.setData('showSortableOptions', false);//NO I18N
				}
			}
	    },
		selectSingle : function(id,elem,ev){
			this.selectTheSingle(id,elem);
			if(ev){
				ev.preventDefault();
			}
		},
		closeModal : function(){ //Should not be here. Need to move to modal. Currently in view
			this.close();
		}
	},
	isBigLookupTable : function(){
		var headerCount = this.getData('header').length;// NO I18N
		var lookupTable = $('.lookupFieldList');
		if(headerCount > 6){
			this.setData('bigLookupTable', true);// NO I18N
		}else{
			this.setData('bigLookupTable', false);// NO I18N
		}
	},
	getRecs : function(){
		var mod = Lyte.deepCopyObject( this.getData("module"));// NO I18N
		var fields = mod.fields,fieldsLen = fields.length, relatedRecLen = this.data.relatedRecordData.length,defaultCriteriaConstructor='',relatedApiNames = [],
		defaultCriteria = Lyte.deepCopyObject(this.data.defaultCriteria);
		//finding whether related record field available to search
		if(relatedRecLen && mod.api_name != 'Campaigns'){ //&& mod.module_name === "Services"
			 relatedApiNames = [];
			for(var i = 0 ; i<relatedRecLen; i++){
				if(this.data.relatedRecordData[i].apiName && !relatedApiNames.includes(this.data.relatedRecordData[i].apiName)){
					relatedApiNames.push(this.data.relatedRecordData[i].apiName);
				}
			}

		}



		//Processing Fields of Lookup data from Module cache fields API
		if(this.getData('parentModule')){ // can be optimized
			var flds = store.peekRecord("module", moduleRecordMapping[this.data.parentModule].id, undefined,undefined,undefined, {getFields : true}), fldsLen;
			flds = flds && flds.fields ? flds.fields : '';
			fldsLen= flds.length
			for(var i = 0; i<fldsLen ; i++){
				if(flds[i].association_details){
					Lyte.arrayUtils( this.data.fieldOfLookupVal, 'push', flds[i].association_details) // No I18n
				}
		}}


		for(var i = 0; i<fieldsLen ; i++){
		/*if(fields[i].association_details){
			Lyte.arrayUtils( this.data.fieldOfLookupVal, 'push', fields[i].association_details) // No I18n
		}*/
		var allowEncFld = false
		if (fields[i].crypt !== null && this.data.allowEncryptedFields && fields[i].data_type !== 'datetime') { //No I18N
			allowEncFld = true
		}
		if(!this.data.cxPropShowAllFields){
			var hideTheField = fields[i].show_type === 17 || (fields[i].show_type === 0 && fields[i].column_name !== 'FULLNAME') || (!fields[i].filterable && (fields[i].column_name !== 'DESCRIPTION' && fields[i].column_name !== 'SHAREDTO' && fields[i].api_name !=='zohoshowtime__Total_Revenue') && (fields[i].address && (fields[i].address.type !== 'latitude' && fields[i].address.type !== 'longitude'))) || !fields[i].searchable || fields[i].virtual_field || (fields[i].crypt !== null && !allowEncFld)
			if((hideTheField || !(fields[i].visible && !((mod.module_name === "Cases" || mod.module_name === "Solutions") && fields[i].column_name === "ADDCOMMENT") && !( mod.module_name === "Tasks" && this.data.tasksHiddenFields.indexOf(fields[i].column_name) > -1) && !( mod.module_name === "Appointments" && this.data.appointmentHiddenFields.indexOf(fields[i].column_name) > -1) && !( mod.module_name === "Services" && this.data.servicesHiddenFields.indexOf(fields[i].column_name) > -1) && !(mod.module_name.startsWith("Orchestration") && fields[i].column_name === "SMOWNERID") && !(mod.module_name === 'DealHistory' && fields[i].column_name === "LASTACTIVITYTIME"))) && [777, 776].indexOf(fields[i].ui_type) === -1 ){
				fields.splice(i, 1);
				i--;fieldsLen--;
				continue;
			}			
		}

		if(!this.data.isRelatedRecordPassed && mod.module_name === "Services" && relatedRecLen && fields[i].api_name === "Status" && fields[i].pick_list_values.length){
				for(var j = 0; j < relatedRecLen ; j++ ){

					switch (j)  {
						case 0 :
							this.data.relatedRecordData[j].id = "multi";
							this.data.relatedRecordData[j].criteria = "(("+ this.data.relatedRecordData[j].apiName + ":"+ "equals"+":"+fields[i].pick_list_values[0].id+")or("+ this.data.relatedRecordData[j].apiName + ":"+ "equals"+":"+fields[i].pick_list_values[1].id+"))";
							break;
						case 1 :
							this.data.relatedRecordData[j].id = "all";
							break;
						case 2 :
							this.data.relatedRecordData[j].id = fields[i].pick_list_values[0].id;
							break;
						case 3 :
							this.data.relatedRecordData[j].id = fields[i].pick_list_values[1].id;
							break;
						case 4 :
							this.data.relatedRecordData[j].id = fields[i].pick_list_values[2].id;
							break;
					}

					/*
					if(this.data.relatedRecordData[i].id === 0){ this.data.relatedRecordData[i].id = "multiple"  };

					this.data.relatedRecordData[i].id = this.data.relatedRecordData[i].id === 0 ? "multiple" : "" ;*/
				}
			}


		if(defaultCriteria && defaultCriteria.length){
			for(var criteria of defaultCriteria){
				if(criteria.api_name == fields[i].api_name || criteria.parentCriteria || criteria.api_name == "id"){
					defaultCriteriaConstructor = (defaultCriteriaConstructor.length) ? defaultCriteriaConstructor+'and' : defaultCriteriaConstructor; //NO I18N
					defaultCriteriaConstructor+='(' + criteria.api_name + ':' + criteria.comparator + ':' + criteria.value + ')';
					defaultCriteria.splice(defaultCriteria.indexOf(criteria),1);
				}
			}
		}

		if(relatedRecLen && relatedApiNames.length){
			var rrIndex = relatedApiNames.indexOf(fields[i].api_name)
			if(rrIndex>-1) {
				relatedApiNames.splice(rrIndex,1)
				}
		}
		fields[i].cxPropFilterZcqa = 'lookupFiltersInput_'+fields[i].api_name;
		}
		this.defaultCriteriaPattern = defaultCriteriaConstructor ? defaultCriteriaConstructor : ''; //NO I18N

		var fieldsRestrictedInLookup = function(fields){
			var lookupViewRestrictedColumns = this.getData('lookupViewRestrictedColumns') , moduleName = this.getData('moduleName') , lookupViewRestrictedModuleVsColumn = this.getData('lookupViewRestrictedModuleVsColumn'); //NO I18N
		    let len = fields.length;
		    for(var i=0 ; i<len;i++ ){
		    if( (lookupViewRestrictedColumns.contains(fields[i].column_name)) || (moduleName in lookupViewRestrictedModuleVsColumn && lookupViewRestrictedModuleVsColumn[moduleName].contains(fields[i].column_name)) || (fields[i].show_type === 13 && ["Segment_Label","Recency","Frequency","Monetary"].includes(fields[i].api_name)) ){
		    	fields.splice(i,1);
		    	i--;
		    	len--;

		    }
		}
//		    return fields;
		}.bind(this);
		if(!(mod.fields && mod.fields.length)){   // If no fields present in the module, We need to prevent the modal.
			_cruxUtils.showPermissionDeniedModal();
			if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
			return;
		}
		fieldsRestrictedInLookup(mod.fields);
		this.setData("availableFields",mod.fields); //NO I18N
		this.lookupFilterQueryHandling(); // Handling for Lookup FIlter
		this.overRideFieldsForTable();
		if(relatedRecLen && relatedApiNames.length){
			for(var i=0; i < relatedRecLen ; i++){
				if(this.data.relatedRecordData[i].apiName && relatedApiNames.includes(this.data.relatedRecordData[i].apiName)){
				//  this.data.relatedRecordData.splice(i,1);
					Lyte.arrayUtils( this.getData('relatedRecordData') , 'splice' , i , 1); //NO I18N
					i--;relatedRecLen--;
				}
			}
		}
		if(relatedRecLen === 1 && this.data.relatedRecordData[0].id === 'all'){ //if only show all
			this.data.relatedRecordData = '' //No I18N
		}
		var relatedRecordsDom = $L('.relatedDropdownLookup');
		if(this.data.relatedRecordData.length){
			this.setData('selectedRelatedRecordIndex','0');//NO I18N
			//To Invoke the observer of dropdown, changing it to 1 and 0
			relatedRecordsDom.attr('lt-prop-selected','1'); //NO I18N
			//eslint-disable-next-line zstandard/combine-properties
			relatedRecordsDom.attr('lt-prop-selected','0'); //NO I18N
			this.showRelatedRecords();
			relatedRecordsDom.show();
		}else{
			relatedRecordsDom.hide();
			this.renderPage();
		}
	},
	renderPage : function(from,value)
	{
		if(this.getData('criteria') || this.getData('relatedRecordCriteria') || this.getData('searchBarCriteria') || this.defaultCriteriaPattern || this.data.defaultCriteriaStr){
			this.fetchFilteredRecords(from,value);
			return;
		}
		var currentPage = this.getData('currentPage');//NO I18N
		if(from === "next")
		{
			currentPage++;
		}
		else if(from === "prev")
		{
			currentPage--;
		}
		var params = {page : currentPage,per_page : this.getData('perPage') , fields: this.getData('requiredFieldsForApi'), approved : 'both' , approval_state:'approved,approval_process_pending,approval_process_rejected'};//NO I18N
		if(Object.keys(this.getData('sortDetails')).length > 1){
			Object.assign(params,{sort_order : this.getData('sortDetails').sort_order, sort_by : this.getData('sortDetails').sort_by});  //No I18N
		}
		//condition to add lookupFilter criteria if enabled
		if(Object.keys(this.lookupFilterQueryDetails).length && this.lookupFilterQueryDetails.query_id){
			params.query_id = this.lookupFilterQueryDetails.query_id;
		}
		if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(true);
		}
		if(this.relatedListMode){
			this.fetchRelatedListRecords(moduleRecordMapping.Contacts.id,this.selectedRecord,this.getData('moduleName'),params).then(function(res){ //NO I18N
				var recs = res.data,
					hasMoreRecords = recs && res.meta.more_records ? res.meta.more_records : false;
//				if(recs){
//					store.pushPayload(moduleRecordMapping.Contacts.id,recs);
//				}
				this.updateNavigators(recs,hasMoreRecords,from,value);
			}.bind(this))
			return;
		}
		this.fetchRecords(this.getData("modId"), params).then(function(recs){// NO I18N
			var hasRecords = recs && recs.length;
			recs = (hasRecords) ? recs : [];
//			this.setData('record',recs);//NO I18N
//			this.setData('hasMoreRecords', hasRecords ? recs.$.meta.more_records : false);//NO I18N
//			this.executeMethod("onDataLoaded");//NO I18N
			var hasMoreRecords = hasRecords ? recs.$.meta.more_records : false ;
			// this.setNext(undefined, undefined, undefined, this.getData("next")[1], undefined, document.getElementById("navigator"));
			this.updateNavigators(recs,hasMoreRecords,from,value);
//			if(from === "next")
//			{
//				this.setData('currentPage',(this.getData('currentPage')) + 1);//NO I18N
//				this.setData('navigatedRec',value); //NO I18N
//				this.setData('navigatorRecordLen',hasMoreRecords ? (this.getData('navigatorRecordLen') + this.getData('perPage')) : ( this.getData('navigatorRecordLen') + recs.length - 1 ) ); //NO I18N
//			}
//			else if(from === "prev")
//			{
//				this.setData('currentPage',(this.getData('currentPage')) - 1);//NO I18N
//				this.setData('navigatedRec',value);//NO I18N
//				this.setData('navigatorRecordLen',hasMoreRecords ? ( ( this.getData('currentPage') * this.getData('perPage') ) + 1  ) : ( ( this.getData('perPage') * ( this.getData('currentPage') - 1 ) ) + recs.length ) ); //NO I18N /*Delete happens in other tab */
//			}
//			if(this.getData('currentPage') === 1 && (hasMoreRecords === 'false' || !hasMoreRecords) ){
//				this.setData('navigatorRecordLen', recs.length); //NO I18N
//			}else if(this.getData('currentPage') === 1 && hasMoreRecords){ //NO I18N
//				this.setData('navigatorRecordLen', this.getData('perPage') + 1 );//NO I18N /*Need this because we have two type of navigator, record count differs*/
//			}
//			if(this.getData('currentPage') >= 100){
//				this.setData({'hasMoreRecords':false,'navigatorRecordLen':recs.length}); //NO I18N
//			}
			if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
//			this.executeMethod("onDataLoaded");//NO I18N
		}.bind(this), function(res){
			//rejected
			if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
			this.setData('renderLookup',false);
			var resp =  res ? JSON.parse(res.response) : {};
			if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
			{
				_cruxUtils.showPermissionDeniedModal();
			}
		}.bind(this));

	},
	putModuleData : function(id){
		/*getSelectedFields is used for fields api format
		selectedFields is used for lookup_field_properties api format*/
		var colListComp = this.$node.querySelector("lyte-popover").component.childComp.querySelector('CRUX-COLUMN-LIST'); //NO I18N
		var module = store.peekRecord('module',id); //NO I18N
		var getSelectedFields = colListComp.component.getSelectedFields(),
		previousSelectedCols = module.lookup_field_properties.fields;
		this.data.currentSelectedFields = getSelectedFields;
//		this.setData('currentSelectedFields',getSelectedFields); //NO I18N | NOT WORKKING |
		var params = {},fields = [],temp = {};
		var sequenceGenerator = function(columns){
			 var colsLen = columns.length,sequentialFields=[];
			 for(var i=0;i < colsLen; i++){
			  temp = {
			  sequence_number : i+1,
			  api_name : columns[i].api_name,
			  id : columns[i].id
			  }
			  sequentialFields.push(temp);
		  } return sequentialFields };

		  fields = sequenceGenerator(getSelectedFields);
		  if(!this.getData("selectedFields").length){
			  this.data.selectedFields = sequenceGenerator(module.lookup_field_properties.fields);
		  }
		  if(JSON.stringify(fields) === JSON.stringify(this.getData("selectedFields"))){
			  return;
		  }
		  var colsLen = previousSelectedCols.length;
		  var findField = function(fields, id){
				return fields.filter(function(f){
					return f.id === id;
				})[0];
		  }
		  for(var i=0 ; i < colsLen; i++ ){
			  if(!findField(getSelectedFields, previousSelectedCols[i].id)){
				  temp = {
				  _delete : true,
				  api_name : previousSelectedCols[i].api_name,
				  id : previousSelectedCols[i].id
				  }
				  fields.push(temp);
			  }
		  }
		  if(this.fieldsToBeDeleted){
			  for(var i=0; i< this.fieldsToBeDeleted.length; i++){
			  	if(!findField(fields, this.fieldsToBeDeleted[i].id)){
			  		fields.push(this.fieldsToBeDeleted[i]);
			  	}
			  }		  	
		  }
		  // if(this.fieldsToBeDeleted && this.fieldsToBeDeleted.length){
		// 	  fields = fields.concat(this.fieldsToBeDeleted);
		  // }
		  params.fields = fields;
		  module.$.set("lookup_field_properties",params); //NO I18N
		  if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(true);
			}
		  module.$.save().then(function(){
			 // store.unloadAll(id);
			  this.data.selectedFields = module.lookup_field_properties.fields  /*Setting current selected fields in api format*/
			 this.data.selectedFields.splice(this.getData('currentSelectedFields').length); //NO I18N
			  module.lookup_field_properties.fields = this.getData('currentSelectedFields'); //NO I18N /*Resetting lookup_field_properties.fields to field module format (module.$.set) and removing delete*/
//			  var fields = module.lookup_field_properties.fields, fldLen = fields.length;

			  this.fieldsToBeDeleted = [];
			  this.overRideFieldsForTable();








			  if(this.getData("showFilter")){
		    		this.setData({"showFilter":false , 'criteria' : '', 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
		    		$L('.lookupFilterOpen').removeClass('lookupFilterOpen')// No I18n
//		    		this.renderPage();
		    	}
			  this.renderPage();
		  }.bind(this), function(res){
			  colListComp.component.clearSelectedFields();
			  var fieldsReset = colListComp.component.getSelectedFields();
			  module.lookup_field_properties.fields = fieldsReset;
			  this.data.selectedFields = {};
			  if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				var resp =  res ? JSON.parse(res.response) : {};
				if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			  //rejected
			}.bind(this));

	},
	fetchRecords : function(id,query,cacheQuery,cacheData,customData){
		if(this.data.cxPropAdditionalParams && Object.keys(this.data.cxPropAdditionalParams).length){
			query = Object.assign(query,this.data.cxPropAdditionalParams)
		}
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				query[key] = this.data.cxPropQueryParam[key];
			}
		} 
		if(this.getMethods("beforeRequestChangeData")){
			this.executeMethod("beforeRequestChangeData", query, customData, this.data.cxPropField);
		}
		return new Promise(function(resolve, reject){
			var fields = store.model[id].fieldList
			var res = {}
			for(var f in fields){
			    if(fields[f].type && Lyte.Transform.hasOwnProperty(fields[f].type) && Lyte.Transform[fields[f].type].deserialize){
			        res[f] = fields[f];
			    }
			}
			store.findAll(id,query,cacheQuery,false,customData).then(function(resp){
				var records = resp[id]
			    for(var i=0; i<records.length; i++){
			        for(var f in res){
			            if(records[i][f]){
			                records[i][f] = Lyte.Transform[res[f].type].deserialize(records[i][f], f, id, "id");
			            }
			        }
			    }
			    records.info = resp.info;
			    records.meta = resp.meta;
			    records.$ = {meta : resp.info};
				commonUtils.showHideLoadingDiv(false);
			    resolve(records);
			},function(res){
				var resp =  JSON.parse(res.response);
				if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				{
					_cruxUtils.showPermissionDeniedModal();
				}
				else if(resp.code === 'INVALID_QUERY'||  resp.code === 'INVALID_DATA')
				{
					commonUtils.showHideLoadingDiv(false);
		    		crmui.showMsgBand("error",_cruxUtils.getI18n("crm.lookup.advance.error.msg"),5000);//No I18N
				}
				reject();
			});
		});
	},
	fetchRelatedListRecords : function(parentModuleId,recordId,relFieldName,params){
		return new Promise(function(resolve, reject){
			store.triggerAction(parentModuleId,'fetchrelatedList',{'entityid':recordId,'relapiname':relFieldName},params).then(function(res){
				//eslint-disable-next-line no-unused-expressions
				res.data =  res.data ? res.data : [],
				res.data = res.data ? store.pushPayload(parentModuleId, res.data) : [];
				resolve(res);
			},function(res){
				var resp =  res ? JSON.parse(res.response) : {};
				if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				{
					_cruxUtils.showPermissionDeniedModal();
				}
				reject();
			});
		});
	},
	//This method is used to perform search and filter
	fetchFilteredRecords : function(from,value){
		var criteria = this.getData('criteria'), currentPage = this.getData('currentPage'),customData = {type : "Search" , from : "Lookup"};//NO I18N
		if(from === "next")
		{
			currentPage++;
		}
		else if(from === "prev")
		{
			currentPage--;
		}
		var queryParams = {page : currentPage , per_page : this.getData('perPage'), fields: this.getData('requiredFieldsForApi'), approved : 'both' , approval_state:'approved,approval_process_pending,approval_process_rejected'}; //NO I18N
		if(criteria && criteria.length){
			customData.criteria = criteria ;
		}
		if(this.getData('relatedRecordCriteria') && this.getData('relatedRecordCriteria').length){
			customData.criteria = customData.criteria ? customData.criteria + "and" + this.getData('relatedRecordCriteria') : this.getData('relatedRecordCriteria') ; //NO I18N
		}
		if(this.getData('searchBarCriteria') && this.getData('searchBarCriteria').length){
			customData.criteria = customData.criteria ? customData.criteria + "and" + this.getData('searchBarCriteria') : this.getData('searchBarCriteria') ; //NO I18N
		}
		if(this.data.defaultCriteriaStr && this.data.defaultCriteriaStr.length){
			customData.criteria = customData.criteria ? customData.criteria + "and" + this.data.defaultCriteriaStr : this.data.defaultCriteriaStr;
		}
		else if(this.getData('defaultCriteria') && this.getData('defaultCriteria').length && this.defaultCriteriaPattern){
			customData.criteria = customData.criteria ? customData.criteria + "and" + this.defaultCriteriaPattern : this.defaultCriteriaPattern ; //NO I18N
		}
		if(Object.keys(this.getData('sortDetails')).length > 1){
			Object.assign(queryParams,{sort_order : this.getData('sortDetails').sort_order , sort_by : this.getData('sortDetails').sort_by}); //NO I18N
		}
		if(Object.keys(this.lookupFilterQueryDetails).length && this.lookupFilterQueryDetails.query_id){
			queryParams.query_id =this.lookupFilterQueryDetails.query_id
		}
		if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(true);
		}
		//TEMPORARY HANDLING FOR CONTACT-CAMPAIGN RELATIONSHIP
		if(this.relatedListMode){
			this.searchUsingDO(customData.criteria,queryParams,from,value);
			return;
		}

		//DONE
		this.fetchRecords(this.getData("modId"), queryParams,false,undefined,customData).then(function(recs){//NO I18N
			var hasRecords = recs && recs.length;
			recs = (hasRecords) ? recs : [];
//			this.setData('record',recs);//NO I18N
//			this.setData('hasMoreRecords', hasRecords ? recs.$.meta.more_records : false);//NO I18N
//			this.executeMethod("onDataLoaded");//NO I18N
			var hasMoreRecords = hasRecords ? recs.$.meta.more_records : false ;

//			var records = (recs[this.data.modId] && recs[this.data.modId].length) ? recs[this.data.modId] : [];
//			this.setData('record',records);//NO I18N
//			this.setData('hasMoreRecords',recs.info ? recs.info.more_records : false);//NO I18N
//			var hasMoreRecords = recs.info ? recs.info.more_records : false
			this.updateNavigators(recs,hasMoreRecords,from,value);
//			if(from === "next")
//			{
//				this.setData('currentPage',(this.getData('currentPage')) + 1);//NO I18N
//				this.setData('navigatedRec',value); //NO I18N
//				this.setData('navigatorRecordLen',hasMoreRecords ? (this.getData('navigatorRecordLen') + this.getData('perPage')) : ( this.getData('navigatorRecordLen') + records.length - 1 ) ); //NO I18N
//			}
//			else if(from === "prev")
//			{
//				this.setData('currentPage',(this.getData('currentPage')) - 1);//NO I18N
//				this.setData('navigatedRec',value);//NO I18N
//				this.setData('navigatorRecordLen',hasMoreRecords ? ( ( this.getData('currentPage') * this.getData('perPage') ) + 1  ) : ( ( this.getData('perPage') * ( this.getData('currentPage') - 1 ) ) + recs.length ) ); //NO I18N /*Delete happens in other tab */
//			}
//
//			if(this.getData('currentPage') === 1 && (hasMoreRecords === 'false' || !hasMoreRecords) ){
//				this.setData('navigatorRecordLen', records.length); //NO I18N
//			}else if(this.getData('currentPage') === 1 && hasMoreRecords){//NO I18N
//				this.setData('navigatorRecordLen', this.getData('perPage') + 1 );//NO I18N
//			}
//			if(this.getData('currentPage') >= 100){
//				this.setData({'hasMoreRecords':false,'navigatorRecordLen':records.length}); //NO I18N
//			}
//
			if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
//			this.executeMethod("onDataLoaded");//NO I18N
		}.bind(this),
		function(res){
			if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
			var resp =  res ? JSON.parse(res.response) : {};
			if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
			{
				_cruxUtils.showPermissionDeniedModal();
			}
			//rejected
//			renderingUtils.displayPermissionDenied();
		});
	},
	selectTheSingle : function(id){
		var rec = this.getData("record");// No I18n
		var disp = this.getData("displayField");// No I18n
		var val, selected;
		var recLen = rec.length;
		for(var i=0; i<recLen; i++){
			if(id === rec[i].id){
				if(disp === "Full_Name"){
					val = rec[i][disp] ? rec[i][disp] : ( (rec[i].First_Name) ? rec[i].First_Name+" "+rec[i].Last_Name : rec[i].Last_Name);
					// val = val ? val : rec[i][disp] ;
				}
				else{
					val = rec[i][disp];
				}
				this.setData({lookupSingle : val, selectedSingle : id , currentSelectedRecord : rec[i]});
				this.data.currentSelectedRecord.displayName = val;
				selected = rec[i];
				break;
			}
		}
		if(!this.bool){
			this.setData("renderLookup",false); //NO I18N
			this.close();
			if(this.getMethods("onSelect")){
				this.executeMethod("onSelect");// No I18n
			}
			if(this.getMethods("onValueChange")){
				this.setData("cxPropValue", {id : this.getData("selectedSingle"), name : this.getData("lookupSingle")});// No I18n
				selected.name = this.getData("lookupSingle");
				this.executeMethod("onValueChange", this.data.cxPropReturnFullObjectOnGet ? selected : this.data.cxPropValue); // NO I18N /*CXPROPVALUE IS NOT BEING PASSED VIA HTML BINDING*/
					//	("onValueChange",id,elem,this.getData('cxPropValue'));
			}
		}
	},
	close : function(){
		//Emptying lookup_field_properties as it is causing circular JSON error in autoComplete of lookup component
		store.peekRecord('module',this.data.modId).lookup_field_properties = undefined //NO I18N
		this.setData("show", false);// No I18n
	},
	/*To Update Record and Navigators after a successful API hit*/
	updateNavigators : function(records,hasMoreRecords,from,value){
		this.setData({'record':records,'hasMoreRecords': hasMoreRecords});//NO I18N
		if(from === "next")
		{
			this.setData('currentPage',(this.getData('currentPage')) + 1);//NO I18N
			this.setData('navigatedRec',value); //NO I18N
			this.setData('navigatorRecordLen',hasMoreRecords ? (this.getData('navigatorRecordLen') + this.getData('perPage')) : ( this.getData('navigatorRecordLen') + records.length - 1 ) ); //NO I18N
		}
		else if(from === "prev")
		{
			this.setData('currentPage',(this.getData('currentPage')) - 1);//NO I18N
			this.setData('navigatedRec',value);//NO I18N
			this.setData('navigatorRecordLen',hasMoreRecords ? ( ( this.getData('currentPage') * this.getData('perPage') ) + 1  ) : ( ( this.getData('perPage') * ( this.getData('currentPage') - 1 ) ) + recs.length ) ); //NO I18N /*Delete happens in other tab */
		}

		if(this.getData('currentPage') === 1 && (hasMoreRecords === 'false' || !hasMoreRecords) ){
			this.setData('navigatorRecordLen', records.length); //NO I18N
		}else if(this.getData('currentPage') === 1 && hasMoreRecords){//NO I18N
			this.setData('navigatorRecordLen', this.getData('perPage') + 1 );//NO I18N
		}
		if(this.getData('currentPage') >= 100){
			this.setData({'hasMoreRecords':false,'navigatorRecordLen':records.length}); //NO I18N
		}

		if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(false);
		}
		this.executeMethod("onDataLoaded");//NO I18N
	},
	//Temporary method to handle campaign - contact relationship
	searchUsingDO : function(criteria,queryParams,from,value){
		var url = this.getData('lookupUrlForCampaign'), params = criteria ? "searchcriteria=" : "", //NO I18N
		currentPage = queryParams.page, sortOrderString = queryParams.sort_order ? ("sort_"+queryParams.sort_order) : undefined, sortColumnString = queryParams.sort_by; //NO I18N
		url +="&luceneSearch=true&isFromFilterView=true"; //no i18n
		if(currentPage){
			url+="&FROM_INDEX="+((currentPage*this.data.perPage)-9)+"&TO_INDEX="+((currentPage*this.data.perPage)); //NO I18N
		}
		if(sortOrderString && sortColumnString){
			url+="&sortColumnString="+sortColumnString+"&sortOrderString="+sortOrderString; //NO I18N
		}
//		NEED SUPPORT
//		if(requestObj !== null)
//		{
//			requestObj.abort();
//			delete Crm.REQUEST_QUEUE[url+"---"+params];
//			requestObj = null //eslint-disable-line webperf/no-global-variables
//		}
		$L('#navigateBack, #navigateForward').addClass('pEvents');// No I18n
		//Processing Filter to adapt search DO
		/*var criteriaArray = [];
		if(criteria && criteria.includes(")and(")){
			var splittedCriteria = criteria.split("and");
			for(crt of splittedCriteria){
				var tempObj = {};
				[tempObj.api_name,tempObj.condition,tempObj.searchword] = crt.replace(/[{()}]/g, '').split(":"); //Destructuring
				tempObj.uiType = this.data.header.find(ele => ele.api_name === tempObj.api_name).ui_type;
				criteriaArray.push(tempObj);
			}
		}else if (criteria && criteria.length){
			tempObj = {};
			[tempObj.api_name,tempObj.condition,tempObj.searchword] = criteria.replace(/[{()}]/g, '').split(":"); //Destructuring
			tempObj.uiType = this.data.header.find(ele => ele.api_name === tempObj.api_name).ui_type;
			criteriaArray.push(tempObj);
		}*/
		//DONE
//		params += criteriaArray.length ? JSON.stringify(criteriaArray) : "";
		params += criteria ? encodeURIComponent(criteria) : "";
		params+=criteria? "&"+csrfParamName+"="+csrfToken : csrfParamName+"="+csrfToken;

		/*var reqPool = new crmRequestPool();
		reqPool.initiate({
		action : url,
		data : params,
		type : "POST", //NO I18N
		success: function(res){
	    	  if(res.status === "error")
	    	  {
	    		  crmui.showMsgBand("error",I18n.getMsg("crm.lookup.advance.error.msg"),5000);//No I18N
	    	  }
	    	  else
	    	  {
	    		  this.setData('record',res.body ? res.body : []);//NO I18N
	    		  this.setData('hasMoreRecords', res.hasMoreRecords ? res.hasMoreRecords : false); //NO I18N
	    		  this.executeMethod("onDataLoaded");//NO I18N

	    		  var record = res.body ? res.body : [], hasMoreRecords = res.hasMoreRecords ? res.hasMoreRecords : false;
	    		  this.updateNavigators(record,hasMoreRecords,from,value);
	    	  }
//	    	  commonUtils.showHideLoadingDiv(false);
	    	  $L('#navigateBack, #navigateForward').removeClass('pEvents');
	    	  $L('.entityLookupTable .lyteTableScroll').resetScrollbar();

		}.bind(this),
		error: function(res){},
		})*/


		//eslint-disable-next-line zohocrm/no-unused-vars
		var request = $.ajax({  //eslint-disable-line zohocrm/no-deprecated-fnc
		      url: url,
		      type: "POST", // No I18N
		      data: params,
		      success: function( res ) {
		    	  if(res.status === "error")
		    	  {
		    		  crmui.showMsgBand("error",_cruxUtils.getI18n("crm.lookup.advance.error.msg"),5000);//No I18N
		    	  }
		    	  else
		    	  {
		    		//eslint-disable-next-line no-unused-expressions
		    		  res.body =  res.body ? res.body : [],
		    		  res.body = res.body ? store.pushPayload(this.data.modId, res.body) : [];
		    		  this.setData('record',res.body);//NO I18N
		    		  this.setData('hasMoreRecords', res.hasMoreRecords ? res.hasMoreRecords : false); //NO I18N
		    		  this.executeMethod("onDataLoaded");//NO I18N

		    		  var record = res.body ? res.body : [], hasMoreRecords = res.hasMoreRecords ? res.hasMoreRecords : false;
		    		  this.updateNavigators(record,hasMoreRecords,from,value);
		    	  }
//		    	  commonUtils.showHideLoadingDiv(false);
		    	  $L('#navigateBack, #navigateForward').removeClass('pEvents');// No I18n
		    	  $L('.entityLookupTable .lyteTableScroll').resetScrollbar();// No I18n
		      }.bind(this),
			  error:function(resp) {
				  commonUtils.showHideLoadingDiv(false);
				  var resp =  res ? JSON.parse(res.response) : {};
				  if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				  {
					  _cruxUtils.showPermissionDeniedModal();
					  $('crm-entity-lookup')[0].component.setData('ltPropShow',false);//NO I18N
				  }
				  $L('#navigateBack, #navigateForward').removeClass('pEvents');// No I18n
			  }
		});
//		requestObj = reqPool; //eslint-disable-line webperf/no-global-variables
	},
	showRelatedRecords : function(){
			this.relatedListMode = false;
			var selectedRecord = this.getData('relatedRecordData')[this.data.selectedRelatedRecordIndex]
			this.setData({'searchDoMode': false , 'currentPage' : 1 , 'navigatedRec' : 0}); //NO I18N
			if((selectedRecord.id === "multi" && selectedRecord.criteria) || selectedRecord.criteria){
				this.setData('relatedRecordCriteria',selectedRecord.criteria); //NO I18N
			}else if(this.data.lookupUrlForCampaign && this.getData('lookupUrlForCampaign').length && selectedRecord.id !== 'all'){ //NO I18N
				this.relatedListMode = true;
				this.selectedRecord = selectedRecord.id;
//				this.setData('searchDoMode', true); //NO I18N
			}
			else if(selectedRecord.id && selectedRecord.id !== 'all'){ //NO I18N
				var criteria = "("+ selectedRecord.apiName + ":"+ "equals"+":"+selectedRecord.id+")";//NO I18N
				this.setData('relatedRecordCriteria',criteria); //NO I18N
			}else if(this.getData('criteria')){ //NO I18N
				this.setData({'relatedRecordCriteria':''});//NO I18N
			}else{
				this.setData({'relatedRecordCriteria':'','criteria':''});//NO I18N
			}
			this.renderPage();

		},
	closeColumnList : function(){
			this.setData('showColList', false); //NO I18N
			this.isBigLookupTable();
		},
	pickListValidator : function(type, value, fieldArray){
		if(fieldArray.length >19) {
			crmui.showMsgBand('error',_cruxUtils.getI18n("crm.las.error.picklist.maxlimit"),3000);// No I18n
			return false;
		}
		return true;
	},
	lookupTableHeightCalc : function(){
		var windowheight = renderingUtils.windowHeight
		var scrollableArea = ((windowheight/ 100) * 70) - 30;
//		this.setData('tableScrollHeight', scrollableArea);//NO I18N
		// setTimeout(function(){
		// 	$L('.lookupLyteTable').css('max-height',scrollableArea);//NO I18N
		// },200);
		$L(this.$node).find('.entityLookupTable').css('max-height', (windowheight / 2));	//NO I18N
		

	},
	overRideFieldsForTable : function(){

		var mod = this.getData('module'), fields,customView = false; //NO I18N

		if(this.getData("cxPropFields")){
			customView = true;
			fields = $L.extend(true , [] , this.data.cxPropFields);//NO I18N
		}
		else if(mod.lookup_field_properties && mod.lookup_field_properties.fields){
			customView = true;
			fields = $L.extend(true, [] , mod.lookup_field_properties.fields);
		}
		var filterField = function(fields, id){
			return fields.filter(function(f){
				return f.id === id;
			})[0];
		}
		let len = fields.length;
		this.fieldsToBeDeleted = [];
		for(var i=0; i<len; i++){
			if(customView){
				var fieldAvailable = filterField(this.data.availableFields, fields[i].id)
				if(!fieldAvailable){
					this.fieldsToBeDeleted.push(
							{
								_delete : true,
								api_name : fields[i].api_name,
								id : fields[i].id
							});
				}
				fields[i] = fieldAvailable;
			}
			// fields[i] = fields[i] ? Object.assign({}, fields[i]) : undefined;
			if(!fields[i]){//DELETE use case
				fields.splice(i, 1);
				i--;len--;
				continue;
			}
			if(fields[i].yieldName){
				delete fields[i].yieldName;
			}
			if(fields[i].fixed){
				delete fields[i].fixed;
			}
			if(fields[i].id === mod.display_field.id || fields[i].column_name === "POTENTIAL_NAME" || fields[i].column_name === "POTENTIALID"){
				fields[i].yieldName = "aTag";
				fields[i].mandatoryColumn = "true"
				if(fields[i].id === mod.display_field.id && fields[i].field_label){
					fields[i].display_field = true;
					var searchBarObj = {displayMsg : I18n.getMsg('crm.lookup.searchby.placeholder',fields[i].field_label) , apiName : fields[i].api_name };
				    if(this.data.module.api_name === 'Products' || this.data.module.api_name === 'Bundles__s'){
				    	for(var x of this.data.availableFields){
				    		if((x.api_name==="Product_Code" || x.api_name==="Bundle_Code") && ((x.profiles && x.profiles[0] && x.profiles[0].permission_type !== "hidden") || (x.visible)) ){
				    			this.isProductCodeAvailable = x;
				    			break
				    		}
				    	}
//				    	this.isProductCodeAvailable= this.getData('module').fields.find(field => field.api_name === "Product_Code")
				    	if(this.isProductCodeAvailable){
//				    		this.isProductCodeAvailable = true;
				    		searchBarObj.displayMsg+=(' / '+this.isProductCodeAvailable.field_label);
				    	}
				    }
				    if(!(this.data.searchBarAttr.displayMsg === searchBarObj.displayMsg)){
				    	this.setData("searchBarAttr", searchBarObj);//NO I18N
				    }
				}
				if(!customView){
					break;
				}
			}
			if(fields[i].data_type === "lookup" || fields[i].data_type === "multi_module_lookup"){
				fields[i].yieldName = "lookup";
			}else if(fields[i].ui_type=== 999){
				fields[i].yieldName = "territory";
			}else if(fields[i].data_type === "integer" || fields[i].data_type === "bigint"){
				fields[i].cxPropDecimalAllowed = false;
			}
			// else if(fields[i].ui_type === 116 && fields[i].formula && fields[i].formula.dynamic){
			// 	fields[i].cxNoFilter = true;
			// }
			
//			if(fields[i].id === display_field && fields[i].field_label){
//				fields[i].display_field = true;
//				var searchBarObj = {displayMsg : I18n.getMsg('crm.lookup.searchby.placeholder',fields[i].field_label) , apiName : fields[i].api_name };
//			    this.setData("searchBarAttr", searchBarObj);//NO I18N
//			}
			if(!fields[i].sortable){
				fields[i].cxPropClass = "cursorDefault";
			}
			if(this.getData('lookupUitypeComparator').in.includes(fields[i].ui_type)){
				fields[i].freeze = true;
				if(!(fields[i].ui_type === 8 || fields[i].ui_type === 221 || fields[i].ui_type === 20 || fields[i].ui_type === 55 || fields[i].ui_type === CrmField.UITYPES.LAYOUT || fields[i].ui_type === CrmField.UITYPES.WIZARD)){
					fields[i].noOverride = true; //to conver pick list to multi picklist
				}
				if(fields[i].ui_type === CrmField.UITYPES.LAYOUT || fields[i].ui_type === CrmField.UITYPES.WIZARD || fields[i].ui_type === 999){
					fields[i].type = 'multisearch';
				}else{
					fields[i].type = 'multiple';
				}

				if(fields[i].ui_type === 999){
					fields[i].cxTypeMapping = 'layout';
					fields[i].modelReq = 'territory';
				}
				fields[i].filterClass = "preventWheel";
				fields[i].maxLimit = '20';
				fields[i].disableExtraValue = true;
//				fields[i].cxTypeMapping = 'picklist';
			}else if (this.getData('lookupUitypeComparator').starts_with.includes(fields[i].ui_type)){
				fields[i].maxLength = 200;
			}else if(this.getData('lookupUitypeComparator').equals.includes(fields[i].ui_type)){
				fields[i].maxLength = 20;
			}
			/*if(fields[i].ui_type === 8 || fields[i].ui_type === 221 || fields[i].ui_type === 20){
////			fields[i].noOverride = true;
			fields[i].type = 'multiple';
			fields[i].filterClass = "preventWheel"
			fields[i].maxLimit = '20';
			}*/
			if(fields[i].ui_type === 209){
				fields[i].tagWidth = "90px"
			}
		}

		fields[0].fixed = "enable";
		this.setData("header", fields);// NO I18N
		
	},
	rollBackFilterComponent : function() {
		var filterComponent = this.$node.querySelector("crux-lookupfilter-component"); //NO I18N
		if(filterComponent && this.getData('showFilter') && this.filterValueIds) {
			filterComponent = filterComponent.component
			var result = filterComponent.getBackupFilter(this.data.header), len = result.length,flagToProceed;
			for(var i=0;i<len;i++){
				if(!this.filterValueIds.includes( result[i].id)){
					result.splice(i,1);
					i--; len--;
					flagToProceed = true;
				}
			}
			if(flagToProceed){
			filterComponent.setData('getBackfilter',result); //NO I18N
			this.fromSearchBar = true;
			filterComponent.$node.querySelector('.cxLookupClearFilter').click() //NO I18N
			this.fromSearchBar = false;
//			filterComponent.actions.clearFilter();
			filterComponent.displayFilter();
			}
		}
	},
	lookupFilterQueryHandling(){
		var currentField = this.data.cxPropField;
		this.lookupFilterQueryDetails = {};
		if(currentField && currentField.lookup && currentField.lookup.query_details){
			this.lookupFilterQueryDetails = currentField.lookup.query_details;
		}
	},
	//OBSERVERS
	observeValue : function(){ // Will be invoked in init.
		if(this.getData("cxPropValue")){
			try{
				this.setData("value", JSON.parse(this.getData("cxPropValue")));// No I18n
				this.setData("selectedSingle", this.getData("value").id);// No I18n
			}
			catch(err){
				this.setData("value", this.data.cxPropValue);// No I18n
				this.setData("selectedSingle", this.data.value.id);// No I18n
			}
		}
	}.observes("cxPropValue").on("init"),//NO I18N
	observeFieldsForApi : function(){
		this.setData('requiredFieldsForApi',[]); //NO I18N
//		if(this.getData('moduleName') === 'Accounts'){
//			this.data.requiredFieldsForApi.push("Mailing_Street", "Other_Street", "Mailing_City", "Other_City",
//					"Mailing_State", "Other_State", "Mailing_Zip", "Other_Zip", "Mailing_Country", "Other_Country")
//		}
		var header = this.getData('header'); //NO I18N
		if( this.getData('cxPropAllFieldsNeeded') ){
			header = this.getData('module').fields; //NO I18N
		}
		for(var fields of header){
			this.data.requiredFieldsForApi.push(fields.api_name)
		}
		var defaultFields = this.getData('cxPropDefaultFields') && this.getData('cxPropDefaultFields').api_names ? this.getData('cxPropDefaultFields').api_names : [];
		var defaultFieldIds = this.getData('cxPropDefaultFields') && this.getData('cxPropDefaultFields').id ? this.getData('cxPropDefaultFields').id : [];
		if(Object.keys(defaultFieldIds)){
			for(var curId of defaultFieldIds){
				var fld = store.peekRecord('field',curId);
				if(fld && fld.api_name){
					defaultFields.includes(fld.api_name) || defaultFields.push(fld.api_name)
				}
			}
		}
		if(Object.keys(defaultFields)){
			for(var curFld of defaultFields){
				this.data.requiredFieldsForApi.includes(curFld) || this.data.requiredFieldsForApi.push(curFld);
			}
		}
		var lookupId = this.getData('lookupFieldId') ? this.getData('lookupFieldId') : (this.data.cxPropField && this.data.cxPropField.id ? this.data.cxPropField.id : '' )
		if(lookupId){
		for(var fieldOfLookup of this.data.fieldOfLookupVal){
			if(fieldOfLookup.lookup_field.id == lookupId){ //== is recommended
				this.data.requiredFieldsForApi.includes(fieldOfLookup.related_field.api_name) || this.data.requiredFieldsForApi.push(fieldOfLookup.related_field.api_name)
				}

		}
		if(!this.data.requiredFieldsForApi.includes('Currency')){ //Currency field needed for crux table to render multicurrency
			this.data.requiredFieldsForApi.push('Currency');
		}
		}
		//Code for big lookup table issue (Removing from timeOut)
		this.isBigLookupTable();
	}.observes("header"), //NO I18N
	flushDataofComponent : function(){
		delete this.relatedListMode;delete this.selectedRecord;
		this.setData({
			record : [],
			selectedRelatedRecordIndex : 0,
			relatedRecordData : [],
			criteria : '',
			relatedRecordCriteria : '',
			searchBarCriteria : '',
			ltPropBindToBody : false, //Needed or not?
			selectedSingle : '',
			lookupUrlForCampaign : '',
			flushView : false,
			fieldOfLookupVal : [],
			lookupSingle : ''
			} );
	}.observes("flushView") //NO I18N

}, {mixins : ["crux-lookup-mixin", "crux-aria-lookup-mixin"]});//NO I18N
