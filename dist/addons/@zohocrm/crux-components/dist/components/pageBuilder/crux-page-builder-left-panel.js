Lyte.Component.register("crux-page-builder-left-panel", {
_template:"<template tag-name=\"crux-page-builder-left-panel\" class=\"cxPBLeftPanel\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','quickcreate')}}\"><template case=\"true\"> <div class=\"cxPbLeftPanelWrapperDiv\"> <div class=\"cxPbLeftPanelPrimaryHeading\">{{cruxGetI18n('crm.label.pagelayout.available.fields')}}</div> <div class=\"cxPbLeftPanelFieldSearchWrap\"> <lyte-search class=\"cxPbLeftPanelInput\" lt-prop-maxlength=\"50\" lt-prop-value=\"{{lbind(searchText)}}\" on-search=\"{{method('searchLeftPanelField')}}\" lt-prop-close-icon=\"true\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxPbLeftPanelFieldWrapper&quot; , &quot;search&quot; : &quot;.cxPbElementText&quot;, &quot;target&quot; : &quot;.cxBuilderElement&quot;,&quot;related&quot; : &quot;.cxPbFieldSection&quot; }\" lt-prop-aria-label=\"Field Search\" data-zcqa=\"cxPbQc_Field_Search\" lt-prop-placeholder=\"{{cruxGetI18n('crm.label.search')}}\"></lyte-search> </div> <div class=\"cxPbLeftPanelFieldWrapper\"> <template is=\"forIn\" object=\"{{cxPropQuickCreateSections}}\" value=\"sec\" key=\"key\"> <template is=\"if\" value=\"{{displaySection(sec.section_field,droppedList,sec.id)}}\"><template case=\"true\"> <div class=\"cxPbFieldSection cxPbQuickCreateFieldSection\"> <lyte-text class=\"cxPbFieldHeading\" lt-prop-value=\"{{sec.display_label}}\"></lyte-text> <template is=\"for\" items=\"{{sec.section_field}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(negate(cruxContains(droppedList,item.id,droppedList.length),droppedList.length),'&amp;&amp;',negate(getFieldData(item,'address')))}}\"><template case=\"true\"> <div class=\"{{item.wrapperClass}} lytePbSelector cxBuilderElement cxBuilderFullWidthElement\" data-cx-pb-field-id=\"{{getFieldData(item,'id')}}\" tabindex=\"0\" data-zcqa=\"{{cruxConcat('cxPbQc_',getFieldData(item,'api_name'),'_leftPanel')}}\"> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPb{{cruxCapitalize(getFieldData(item,'data_type'))}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span></template><template case=\"false\"><span class=\"cxPbElementTextWrapper\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(getFieldData(item,'data_type'))}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span> <span class=\"cxPbElementText lyteTextEllipsisNode\">{{getFieldData(item,'field_label')}}</span> </span></template></template> </div> </template></template> </template> </div> </template></template> </template> <template is=\"if\" value=\"{{allFieldsUsed}}\"><template case=\"true\"> <div class=\"cxPbLeftPanelNotFoundMsg\">{{cruxGetI18n('crm.mb.label.empty.unused.fields')}}</div> </template></template> <template is=\"if\" value=\"{{noFieldsFound}}\"><template case=\"true\"> <div class=\"cxPbLeftPanelNotFoundMsg\">{{cruxGetI18n('crm.import.no.fields.found')}}</div> </template></template> </div> </div> </template><template case=\"false\"> <lyte-tabs on-before-open=\"{{method(&quot;onLeftTabChange&quot;)}}\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head class=\"{{if(minimizeLeftPanel,'cxPbLeftPanelMinimized','')}}\"> <lyte-tab-title class=\"cxFlexCenter cxPbLeftPanelNewFldTabTitle\" lt-prop-id=\"cxPbNewFieldTab\"> <span class=\"cxPbLeftTabHeading\">New Fields</span> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPbNewFieldIcon\"></span></template></template> </lyte-tab-title> <template is=\"if\" value=\"{{cxPropShowUnusedFields}}\"><template case=\"true\"> <lyte-tab-title class=\"cxFlexCenter\" lt-prop-id=\"cxPbUnusedFieldTab\"> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPbUnusedFieldIcon\"></span></template></template> <span class=\"cxPbLeftTabHeading\">Unused Fields</span> <span class=\"cxPbUnusedFieldCount\">{{cruxLength(cxPropUnusedFields,cxPropUnusedFields.length)}}</span> </lyte-tab-title> </template></template> </lyte-tab-head> <lyte-tab-body class=\"cxPbLeftPanelTabBody\"> <lyte-tab-content id=\"cxPbNewFieldTab\" class=\"cxPbNewFieldTabContent\"> <template is=\"forIn\" object=\"{{cxPropAvailableFields}}\" value=\"sec\" key=\"key\"> <div class=\"cxPbFieldSection\"> <lyte-text class=\"cxPbFieldHeading\" lt-prop-value=\"{{sec.cxPropLabel}}\"></lyte-text> <template is=\"for\" items=\"{{sec.cxPropAvailableFields}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(item.hideInLeftPanel,'!')}}\"><template case=\"true\"> <div class=\"{{getDisabledClass(field_disabled_obj,item,field_disabled_obj[item.data_type])}} {{item.wrapperClass}} lytePbSelector cxBuilderElement\" lyte-hovercard=\"true\" data-cx-pb-element-value=\"{{item.data_type}}\" data-cx-label=\"{{item.display_label}}\" onmouseenter=\"{{action('displayTooltip',item,this)}}\" onmouseleave=\"{{action('hideTooltip',item,this)}}\"> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon\"></span></template><template case=\"false\"><span class=\"cxPbElementTextWrapper\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon\"></span> <span class=\"{{if(expHandlers(field_disabled_obj[item.data_type],'!'),'lyteTextEllipsisNode','')}} cxPbElementText\">{{item.display_label}}</span> <template is=\"if\" value=\"{{expHandlers(field_disabled_obj[item.data_type],'&amp;&amp;',expHandlers(item.data_type,'===',&quot;multiselectlookup&quot;))}}\"><template case=\"true\"> <span class=\"cxPbSprite cxPbWarningTriFillIcon\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(item.is_new_field,'||',field_disabled_obj[item.data_type].is_new_field)}}\"><template case=\"true\"> <crm-ui-loaders class=\"cxPbNewFeatureLoader\" interaction-name=\"crmNewReleaseLoader\" lt-prop-title=\"{{cruxGetI18n('crm.label.new')}}\"></crm-ui-loaders> </template></template> </span></template></template> </div> </template></template> </template> </div> </template> </lyte-tab-content> <lyte-tab-content id=\"cxPbUnusedFieldTab\" class=\"cxPbLeftPanelUnusedTab\"> <template is=\"if\" value=\"{{unusedFieldsLen}}\"><template case=\"true\"><div class=\"cxPbUnusedFieldSection\"> <div class=\"cxPbUnusedFieldSecHeader\"> <div class=\"cxPbUnusedFldFilterWrap\"> <crux-dropdown class=\"cxPbUnusedFldFilterDD\" cx-prop-options=\"{{availbleFieldsFilter}}\" cx-prop-user-value=\"display\" cx-prop-system-value=\"id\" cx-prop-selected=\"{{selectedFilterValue}}\" on-option-select=\"{{method('unusedFilter')}}\"></crux-dropdown> <template is=\"if\" value=\"{{ifNotEquals(selectedFilterValue,'all')}}\"><template case=\"true\"><div class=\"cxPbUnusedFldClearBtn\" onclick=\"{{action('removeFilter')}}\">{{cruxGetI18n('crm.report.clear.filter')}}</div></template></template> </div> <lyte-search lt-prop-close-icon=\"true\" class=\"cxPbLeftPanelInput\" on-search=\"{{method('searchLeftPanelField')}}\" lt-prop-value=\"{{lbind(searchValue)}}\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"search\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxPbUnusedFieldSection&quot; , &quot;search&quot; : &quot;.cxPbElementText&quot;, &quot;target&quot; : &quot;.cxBuilderUnusedElement&quot;, &quot;related&quot; : &quot;.cxPbUnusedFldMenuCont&quot; } \"></lyte-search> </div> <div @class=\"cxPbUnusedFldMenuCont {{if(negate(noFieldsFound),'cxFlexOne','')}}\"> <template is=\"if\" value=\"{{unusedFilteredFields.length}}\"><template case=\"true\"><lyte-text class=\"cxPbFieldHeading\" lt-prop-value=\"{{cruxGetI18n('crm.label.customize.fields')}}\"></lyte-text></template></template> <template is=\"for\" items=\"{{unusedFilteredFields}}\" item=\"item\" index=\"index\"> <div class=\"{{if(item.disabled,'cxPbLeftElemDisable cxRestrictDrag')}} {{item.wrapperClass}} lytePbSelector cxBuilderUnusedElement\" data-cx-pb-element-value=\"{{item.data_type}}\" data-cx-pb-field-id=\"{{item.id}}\" data-cx-pb-unused-field=\"true\" data-cx-label=\"{{item.field_label}}\"> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span></template><template case=\"false\"><span class=\"cxPbElementTextWrapper\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span> <span class=\"cxPbElementText lyteTextEllipsisNode\">{{item.field_label}}</span> <template is=\"if\" value=\"{{cxPbLeftPanelDeleteAllowed(item)}}\"><template case=\"true\"><span class=\"cxPbSprite cxPbDeleteIcon cxRestrictDrag\" lt-prop-title=\"{{if(expHandlers(cxPbLeftPanelRemovalAllowed(item),'!'),cruxGetI18n('crm.mb.field.delete.error1'),'')}}\" onclick=\"{{action('deleteUnusedField',item,this)}}\"></span></template></template> </span></template></template> </div> </template> <template is=\"if\" value=\"{{unusedFilteredSubform.length}}\"><template case=\"true\"><lyte-text class=\"cxPbFieldHeading\" lt-prop-value=\"{{cruxGetI18n('crm.label.customize.subforms')}}\"></lyte-text></template></template> <template is=\"for\" items=\"{{unusedFilteredSubform}}\" item=\"item\" index=\"index\"> <div class=\"{{if(item.disabled,'cxPbLeftElemDisable cxRestrictDrag')}} {{item.wrapperClass}} lytePbSelector cxBuilderUnusedElement\" data-cx-pb-element-value=\"{{item.data_type}}\" data-cx-pb-field-id=\"{{item.id}}\" data-cx-pb-unused-field=\"true\" data-cx-label=\"{{item.field_label}}\"> <template is=\"if\" value=\"{{minimizeLeftPanel}}\"><template case=\"true\"><span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span></template><template case=\"false\"><span class=\"cxPbElementTextWrapper\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[item.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[item.data_type]),'Icon'),'')}}\"></span> <span class=\"cxPbElementText lyteTextEllipsisNode\">{{item.display_label}}</span> <template is=\"if\" value=\"{{cxPbLeftPanelDeleteAllowed(item)}}\"><template case=\"true\"><span class=\"cxPbSprite cxPbDeleteIcon cxRestrictDrag\" lt-prop-title=\"{{if(expHandlers(cxPbLeftPanelRemovalAllowed(item),'!'),cruxGetI18n('crm.mb.field.delete.error1'),'')}}\" onclick=\"{{action('deleteUnusedField',item)}}\"></span></template></template> </span></template></template> </div> </template> <template is=\"if\" value=\"{{expHandlers(expHandlers(unusedFilteredFields.length,'!'),'&amp;&amp;',expHandlers(unusedFilteredSubform.length,'!'))}}\"><template case=\"true\"> <div class=\"cxPbLeftPanelNotFoundMsg cxFlexOne cxOH\"> No matching fields found </div> </template></template> </div> <template is=\"if\" value=\"{{noFieldsFound}}\"><template case=\"true\"> <div class=\"cxPbLeftPanelNotFoundMsg\">{{cruxGetI18n('crm.import.no.fields.found')}}</div> </template></template> </div></template><template case=\"false\"><div class=\"cxPbLeftPanelNotFoundMsg\"> {{cruxGetI18n('crm.mb.label.empty.unused.fields')}} </div></template></template> </lyte-tab-content> </lyte-tab-body> </template> </lyte-tabs> <lyte-hovercard lt-prop-placement=\"bottomLeft topLeft\" lt-prop-keep-alive=\"true\" lt-prop-hide-on-click=\"true\" id=\"left_elem_disable_tooltip_{{pageBuilderId}}\" lt-prop-origin-elem=\".cxDisableHovercard\" on-hovercard-hide=\"{{method('hoverCardHide')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content onclick=\"{{action('hoverCardHide')}}\"> {{unescape(cxPropDisableContent)}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!==','quickcreate')}}\"><template case=\"true\"> <div class=\"cxLeftPanelFooter\"> <template is=\"component\" component-name=\"{{cxPropFooterComponent}}\" data-from-parent=\"{{cxPropFooterComponentData}}\"></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5,1]},{"type":"forIn","position":[1,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,3,0]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,5,5]},{"type":"if","position":[1,5,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,5,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"forIn","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"text","position":[0,3,0]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1,1]},{"type":"componentDynamic","position":[0,1,1,1]},{"type":"attr","position":[0,1,1,3]},{"type":"if","position":[0,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]},{"type":"attr","position":[0,3],"trans":true},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3,3]},{"type":"for","position":[0,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,3,0]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[0,3,5]},{"type":"if","position":[0,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3,7]},{"type":"for","position":[0,3,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,3,0]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[0,3,9]},{"type":"if","position":[0,3,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]}},"default":{}}],
_observedAttributes :["unusedFieldCount","pageBuilderId","searchText","searchValue","metaData","dataFromParent","activeNodeElement","cxPropAvailableFields","minimizeLeftPanel","cxPropUnusedFields","cxPropShowUnusedFields","cxPropFooterComponent","cxPropFooterComponentData","droppedList","cxPropQuickCreateSections","availbleFieldsFilter","unusedFilteredFields","unusedFieldsLen","noFieldsFound","fieldAvailableSections","allFieldsUsed","selectedFilterValue","field_disabled_obj"],
_observedAttributesType :["string","string","string","string","object","object","object","object","boolean","array","boolean","string","object","array","array","array","array","number","boolean","object","boolean","string","object"],

	data : function(){
		return {
			unusedFieldCount : Lyte.attr('string'),
			pageBuilderId : Lyte.attr('string'),
			searchText : Lyte.attr('string',{default : ''}),
			searchValue : Lyte.attr('string',{default : ''}),
			metaData : Lyte.attr('object'),
			dataFromParent : Lyte.attr('object'),
			activeNodeElement : Lyte.attr('object'),
			cxPropAvailableFields : Lyte.attr('object',{default : {}}),
			minimizeLeftPanel : Lyte.attr('boolean',{default:false}),
			cxPropUnusedFields : Lyte.attr('array'),
			cxPropShowUnusedFields : Lyte.attr('boolean'),
			cxPropFooterComponent : Lyte.attr('string'),
			cxPropFooterComponentData : Lyte.attr('object'),
			droppedList : Lyte.attr('array',{default : []}),
			cxPropQuickCreateSections : Lyte.attr('array',{default : []}),
			availbleFieldsFilter : Lyte.attr('array',{default : []}),
			unusedFilteredFields : Lyte.attr('array',{default : []}),
			unusedFieldsLen : Lyte.attr('number',{default : 0}),
			noFieldsFound : Lyte.attr('boolean',{default : false}),
			fieldAvailableSections : Lyte.attr('object',{default : {}}),
			allFieldsUsed : Lyte.attr('boolean',{default : false}),
			selectedFilterValue : Lyte.attr('string'),
			field_disabled_obj :  Lyte.attr('object',{default : {}})
		};	
	},
	actions:{
		toggleLeftPanel:function(){
			const leftPanelCurrentState = this.getData('minimizeLeftPanel');
			this.setData('minimizeLeftPanel',!leftPanelCurrentState);
			if(this.cruxPageBuilder.getMethods('cxPbToggleLeftPanel')){
				this.cruxPageBuilder.executeMethod('cxPbToggleLeftPanel',this.data.minimizeLeftPanel ? 'open' : 'close');
			}
			if(!leftPanelCurrentState){
				$L(this.$node).closest('.lytePbLeftBar').addClass('cxPbMinLeftPanel');
			}else{
				$L(this.$node).closest('.lytePbLeftBar').removeClass('cxPbMinLeftPanel');
			}
		},
		deleteUnusedField : function(field){
			var check = true;
			if(!field.customizable_properties.includes("deletion")){
				return;
			}
			if(this.cruxPageBuilder.getMethods('cxPbDeleteFromUnusedField')){
				check = this.cruxPageBuilder.executeMethod('cxPbDeleteFromUnusedField',field);
			}
			if(check instanceof Promise){
				check.then(function(){
					Lyte.arrayUtils(this.data.cxPropUnusedFields,'removeAt',this.data.cxPropUnusedFields.cruxFindIndexOfObject('id',field.id));
				}.bind(this));
			}else if(check){
				Lyte.arrayUtils(this.data.cxPropUnusedFields,'removeAt',this.data.cxPropUnusedFields.cruxFindIndexOfObject('id',field.id));
			}
		},
		displayTooltip: function(obj, node) {
			const item = this.data.field_disabled_obj[obj.data_type];
			const isDisabled = obj.disabled || !!item;
			if (!isDisabled) {
				return;
			}
			const hovercard = document.getElementById('left_elem_disable_tooltip_'+this.data.pageBuilderId);
			node.classList.add("cxDisableHovercard");
			const tooltipText = obj.tooltip || (item ? item.tooltip : "");
			if(tooltipText !== "" && tooltipText){
				this.setData("cxPropDisableContent", tooltipText);
				hovercard.ltProp('show', true);
			}
			
		},
		hideTooltip: function(obj, node) {
			const isDisabled = obj.disabled || this.data.field_disabled_obj[obj.data_type];
		    if (!isDisabled) {
				return;
			};
			node.classList.remove("cxDisableHovercard");
		},
		removeFilter : function(){
			this.setData("selectedFilterValue", this.data.availbleFieldsFilter[0].id);
			const filtered = this.getFilteredFields(this.data.cxPropUnusedFields, this.data.selectedFilterValue);
			this.setData('unusedFilteredFields', filtered.fields);
			this.setData('unusedFilteredSubform', filtered.subforms);
			this.runDraggablePlugin();
		},
		hoverCardHide: function() {
           const hovercard = document.getElementById('left_elem_disable_tooltip_'+this.data.pageBuilderId);
           hovercard.ltProp('show', false);
        }	
	},
	methods:{
		onLeftTabChange:function(){
			$L(".cxPbLeftPanelTabBody",this.$node)[0].scrollTop = 0;
			if(!this._leftPanelUnusedCont || !this._leftPanelUnusedCont.length){
				this._leftPanelUnusedCont = $L(".cxPbUnusedFldMenuCont",this.$node);
				if(this._leftPanelUnusedCont){
					this._leftPanelUnusedCont.scroll({
						showOn:"scroll",
						appendTo: ".cxPBLeftPanel .cxPbUnusedFldMenuCont"
					});
				}
			}
			this.setData("searchValue", "");
			let setEmpty = this.$node.querySelector('.cxPbLeftPanelInput');
			if(setEmpty){
				setEmpty.setValue("");
			}
			if(this.data.minimizeLeftPanel){
				this.setData('minimizeLeftPanel',!this.data.minimizeLeftPanel);
				$L(this.$node).closest('.lytePbLeftBar').removeClass('cxPbMinLeftPanel');
			} 
		},
		hoverCardHide : function(hovercard){
			this.setData("cxPropDisableContent", "");
			hovercard.ltProp('show', false);
		},
		searchLeftPanelField : function(result){
			if(this.data.cxPropType === 'quickcreate'){
				$L(".cxPbLeftPanelFieldWrapper",this.$node)[0].scrollTop = 0;
			}else{
				$L(".cxPbLeftPanelTabBody",this.$node)[0].scrollTop = 0;;
			}
			if(result.length === 0 && (!this.data.allFieldsUsed || this.data.cxPropType !== "quickcreate")) {
				this.setData('noFieldsFound',true);
			}else{
				this.setData('noFieldsFound',false);
			}
		},
		unusedFilter : function(event,value){
			this.setData("selectedFilterValue", value);
			const filtered = this.getFilteredFields(this.data.cxPropUnusedFields, value);
			if(value === 'all'){
				this.setData('unusedFilteredFields', filtered.fields);
				this.setData('unusedFilteredSubform', filtered.subforms);
			}else if(value === 'subform'){
				this.setData('unusedFilteredSubform', filtered.subforms);
				this.setData('unusedFilteredFields', []);
			}else{
				this.setData('unusedFilteredFields', filtered.fields);
				this.setData('unusedFilteredSubform', []);
			}
			this.runDraggablePlugin();
		}

	},
	init : function(){
		this.setData(this.data.dataFromParent);
		var availableFieldType = [];
		availableFieldType.push({id : 'all',display : 'All Fields'}); // need to do I18n
		for(var k in this.data.dataFromParent.cxPropAvailableFields){
			this.data.dataFromParent.cxPropAvailableFields[k].cxPropAvailableFields.forEach((item)=>{
				availableFieldType.push({id : item.data_type,display : item.display_label});
				this.addDisableObj(item);
			});
		}
		this.setData('availbleFieldsFilter',availableFieldType);
		const filtered = this.getFilteredFields(this.data.cxPropUnusedFields, this.data.selectedFilterValue);
		this.setData('unusedFilteredFields', filtered.fields);
		this.setData('unusedFilteredSubform', filtered.subforms);
		this.setData('unusedFieldsLen',this.data.cxPropUnusedFields.length);
		this.setData("selectedFilterValue", this.data.availbleFieldsFilter[0].id);
	},
	didConnect : function(){
		this.disableFieldListener = Lyte.addEventListener("modifyLeftPanelField", function(opt){
			var items = Array.isArray(opt) ? opt : [opt];
			var anyNodeFound = false;
			let array_len = items.length;
			for (var i = 0; i < array_len; i++) {
				var item = items[i];
				if (!item || !item.data_type) { continue; }
				var node = this.$node.querySelector('[data-cx-pb-element-value="' + item.data_type + '"]');
				if (node) {
					anyNodeFound = true;
				}
				this.addDisableObj(item);
			}
			if (anyNodeFound) {
				$L(".lytePbSelector",this.$node).draggable( "destroy" );
				this.runDraggablePlugin();
			}
		}.bind(this));

		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropDataTypeMappingIcons", this.cruxPageBuilder.getData("cxPropDataTypeMappingIcons"));
		Lyte.triggerEvent('cxPbLeftPanelRendered',{node : this.$node});
		let leftPanelScrollCont;
		let leftPanelScrollOption = {
			showOn:"scroll"
		};
		if(this.data.cxPropType === 'quickcreate'){
			leftPanelScrollCont = $L(".cxPbLeftPanelFieldWrapper",this.$node);
			leftPanelScrollOption.appendTo = ".cxPbLeftPanelWrapperDiv .cxPbLeftPanelFieldWrapper";
		}else{
			leftPanelScrollCont = $L(".cxPbLeftPanelTabBody",this.$node);
			leftPanelScrollOption.appendTo = ".cxPBLeftPanel .cxPbLeftPanelTabBody";
		}
		leftPanelScrollCont.scroll(leftPanelScrollOption);
	},
	didDestroy : function(){
		Lyte.removeEventListener(this.disableFieldListener);
		delete this.cruxPageBuilder;
	},
	/**
	 * Utility to filter unused fields and subforms consistently.
	 * @param {Array} fields - The array of fields to filter.
	 * @returns {Object} { fields: [...], subforms: [...] }
	 */
	getFilteredFields: function(fields, selectedFilter) {
		const subformTypes = ["subform", "static_subform"];
		if(selectedFilter && selectedFilter !== 'all'){
			if(selectedFilter === 'subform'){
				return {
					fields: [],
					subforms: fields.filter(item => subformTypes.includes(item.data_type))
				};
			}
			return {
				fields: fields.filter(item => item.data_type === selectedFilter),
				subforms: []
			};
		}
		return {
			fields: fields.filter(item => !subformTypes.includes(item.data_type)),
			subforms: fields.filter(item => subformTypes.includes(item.data_type))
		};
	},
	addDisableObj: function (opt) {
		// if (!opt || !opt.data_type) { return; }
		var target = this.getData('field_disabled_obj');
		if (opt.disabled) {
			Lyte.objectUtils(target, 'add', opt.data_type, opt);
		} else {
			Lyte.objectUtils(target, 'delete', opt.data_type);
		}

	},
	runDraggablePlugin : function(){
		var ob = {
		  tolerance: 'touch',
		  appendTo: document.body,
		  helper : this.draggableHelperFuntion.bind(this),
		  onStop: this.onStopHandler.bind(this),
		  restrictClass : 'cxRestrictDrag',
		  cancel : ['.cxRestrictDrag'],
		  preventReapply : true,
		  onStart : this.draggableStart.bind(this),
		  aria : true,
		  userSelect : true
		};
		var draggableNode = $L('.lytePbSelector',this.$node);
		if(draggableNode.length){
				draggableNode.draggable(ob);
		}
		
	},
	draggableStart : function(){
		if(this.data.cxPropType === 'quickcreate'){
			return true;
		}
		Lyte.triggerEvent('cxPbRemoveActiveClass');
		return this.$node.closest('crux-page-builder').cxCheckAndClosePropperties();
	},
	draggableHelperFuntion : function(reference){
		var node = reference.cloneNode(true);
		if(this.data.minimizeLeftPanel){
			var disLabel = reference.getAttribute('data-cx-label');
			node.innerHTML = node.innerHTML + `<span class="cxPbElementText lyteTextEllipsisNode">`+disLabel+`</span>`;
		}
		var templateTitle = 'Element';
		var element = reference.getAttribute('data-cx-pb-element-value');
		if(element === 'section'){
			templateTitle = 'Section';
		}else if(element === 'subform'){
			templateTitle = 'Subform';
		}
		Lyte.triggerEvent('cxPbEventClosePropertiesPanel');
		if(element === 'Widget'){
			node.setAttribute('lyte-pb-static-column-span',2);
		}else{
			node.setAttribute('lyte-pb-static-column-span',1);
		}
		node.dataToTransfer = {
			pageBuilderId : this.data.pageBuilderId,
			columnSpan : element === 'text' ? 2 : 1,
			title : templateTitle		
		};
		if(this.cruxPageBuilder.getMethods('cxPbOnLeftPanelDragHelper')){
			this.cruxPageBuilder.executeMethod('cxPbOnLeftPanelDragHelper',node);
		}
	  	return node;
	},
	onStopHandler: function (draggedNode) {
	  	draggedNode.parentNode.removeChild(draggedNode);

	},
	observeUnusedField : function(obj){
		this.setData("unusedFieldsLen",this.data.cxPropUnusedFields.length );
		let value = this.data.selectedFilterValue;
		const filtered = this.getFilteredFields(this.data.cxPropUnusedFields, this.data.selectedFilterValue);
		if(value ) {
			this.executeMethod("unusedFilter", null, value);
		}else{
			this.setData('unusedFilteredFields', filtered.fields);
			this.setData('unusedFilteredSubform', filtered.subforms);
		}
		this.setData("allFieldsUsed", Object.keys(this.data.fieldAvailableSections).length === 0);
		clearTimeout(this.draggableTimeout);
		this.draggableTimeout = setTimeout(()=>{
			this.runDraggablePlugin();
		},50);
		if(obj && obj.item === "cxPropQuickCreateSections") {
			this.setData("searchText","");
		}
		if(obj && obj.item === 'droppedList'){
			this.$node.querySelector('.cxPbLeftPanelInput').setValue(this.data.searchText);
		}
	}.observes('cxPropUnusedFields','cxPropUnusedFields.[]','cxPropQuickCreateSections','cxPropQuickCreateSections.[]','droppedList','droppedList.[]').on('didConnect')
});

Lyte.Component.registerHelper('getFieldData',function(field,key){
	if(field[key]){
		return field[key];
	}
	return store.peekRecord('field',field.id)[key];
	
});

Lyte.Component.registerHelper('displaySection',function(sec_field,droppedList, sec_id){
	let fieldAvailableSections = this.getData("fieldAvailableSections") || {};
	let sec_len = sec_field.length;
	for(var i = 0;i < sec_len;i++){
		if(droppedList.indexOf(sec_field[i].id) === -1){
			fieldAvailableSections[sec_id] = true;
			return true;
		}
	}
	delete fieldAvailableSections[sec_id];
	return false;
});

Lyte.Component.registerHelper('cxPbLeftPanelDeleteAllowed',function(field){
	if(field.customizable_properties && field.customizable_properties.length > 0 && field.customizable_properties.indexOf('removal') > -1){
		return true;
	}
	return false;
});

Lyte.Component.registerHelper('cxPbLeftPanelRemovalAllowed', function (item) {
  return  item.customizable_properties.includes('deletion');
});

Lyte.Component.registerHelper('getDisabledClass', function (disabledObj, item) {
	let className = '';
	if(disabledObj[item.data_type]){
		if(item.data_type === "multiselectlookup"){
			className = 'cxRestrictDrag';
		}else{
			className = 'cxPbLeftElemDisable cxRestrictDrag';
		}
	}
	return className;
});
