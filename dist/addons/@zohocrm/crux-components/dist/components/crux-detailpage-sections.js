Lyte.Component.register("crux-detailpage-sections", {
_template:"<template tag-name=\"crux-detailpage-sections\"> <template is=\"if\" value=\"{{expHandlers(cxPropSectionData.section_field.length,'||',isBusinessCardSection)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(negate(isBusinessCardSection),'&amp;&amp;',expHandlers(cxPropSectionData.parent_section,'!'))}}\"><template case=\"true\"><div id=\"section_name_{{cxPropSectionData.id}}\" class=\"cxDvSectionName\"> {{cxPropSectionData.section_name}} </div></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(isBusinessCardSection,'!'),'&amp;&amp;',expHandlers(cxPropSectionData.isSubformSection,'!')),'&amp;&amp;',expHandlers(cxPropSectionData.is_parent_section,'!'))}}\"><template case=\"true\"><div class=\"cxDvInfoCont cxFlex\"> <template items=\"{{cxPropSectionColumns}}\" item=\"item\" index=\"index\" is=\"for\"><div data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" class=\"cxDvFieldSectionContainer cxFlex\"> <div class=\"section_column_{{index}} cxDvFchildContainer\"> <template items=\"{{item}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div class=\"cxDvBcInfoFormRow {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}}\"> <div class=\"cxDvInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"field_label_{{field.id}}\" data-zcqa=\"dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxDvFieldWrap \"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropSupportAjaxEdit,'||',expHandlers(field.data_type,'===','ownerlookup')),'&amp;&amp;',negate(recordIsInAjaxEdit)),'&amp;&amp;',expHandlers(field.read_only,'!')),'&amp;&amp;',expHandlers(field.view_type.client_edit,'||',field.view_type.edit)),'&amp;&amp;',expHandlers(field.preventEdit,'!'))}}\"><template case=\"true\"> <span class=\"edit_icon_{{field.id}} cxDvFieldEditIcon cxCP cxEditIcon\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{field.read_only}}\"><template case=\"true\"> <span class=\"cxDvReadOnlyWrap cxCP\"> <span class=\"cxReadOnlyIcon\"></span> </span> </template></template></template></template> </div> <span id=\"section_save_cancel_span_{{field.id}}\" class=\"cxDvSaveCancelSection\"> <span id=\"saveAjaxEdit_{{field.id}}\" onclick=\"{{action('saveAjaxEdit',field)}}\" class=\"zcicncss-tick-filled-rounded zcicn-cssIcons zcicn_green_mask cxCP\"></span> <span id=\"cancelAjaxEdit_{{field.id}}\" onclick=\"{{action('cancelAjaxEdit',field)}}\" class=\"zcicncss-close-rounded zcicn-cssIcons cxDvRecordEdit cxCP\"></span> </span> </div> </div> </div></template> </div> </div></template> </div></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSectionData.is_parent_section}}\"><template case=\"true\"><div class=\"cxGroupedSubformWrap\"> <template items=\"{{cxPropSectionData.child_sections}}\" item=\"childSec\" index=\"childIndex\" is=\"for\"><div class=\"cxGroupedSubformBlock\"> <div id=\"section_name_{{childSec.id}}\" class=\"cxDvSectionName\"> {{childSec.section_name}} </div> <crux-subform data-zcqa=\"secDiv_{{cruxReplace(childSec.api_name,' ','_')}}\" cx-prop-type=\"view\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-section=\"{{childSec}}\" cx-prop-module-sections=\"{{cxPropAllSections}}\" cx-prop-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-class=\"cxDvSubform\" cx-prop-content=\"{{cxPropRecord}}\" cx-prop-show-scroll-to-top=\"true\" cx-prop-lookup-properties=\"{{childSec.cxPropLookupProperties}}\"> <template is=\"yield\" yield-name=\"body-fileupload\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field=\"{{fieldObj}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{recordObj}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\"></crux-detailpage-field-details> </template> <template is=\"yield\" yield-name=\"cellSuffixYield\"> {{getFieldSuffixValue(recordObj[fieldObj.api_name].name)}} </template> </crux-subform> </div></template> <div class=\"cxDvInfoCont cxFlex cxGroupedSubformFooter\"> <template items=\"{{cxPropSectionColumns}}\" item=\"item\" index=\"index\" is=\"for\"><div data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" class=\"cxDvFieldSectionContainer cxFlex\"> <div class=\"section_column_{{index}} cxDvFchildContainer\"> <template items=\"{{item}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div class=\"cxDvBcInfoFormRow {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}}\"> <div class=\"cxDvInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"field_label_{{field.id}}\" data-zcqa=\"dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}:</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxDvFieldWrap \"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> </div> </div> </div> </div></template> </div> </div></template> </div> </div></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropSectionData.isSubformSection,'&amp;&amp;',expHandlers(cxPropSectionData.parent_section,'!'))}}\"><template case=\"true\"><div class=\"{{cruxGetShowHideClassForLR(cxPropSectionData,cxPropLayoutRules,cxPropLayoutId,'subform')}}\"> <crux-subform data-zcqa=\"secDiv_{{cruxReplace(cxPropSectionData.api_name,' ','_')}}\" cx-prop-type=\"view\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-section=\"{{cxPropSectionData}}\" cx-prop-module-sections=\"{{cxPropAllSections}}\" cx-prop-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-class=\"cxDvSubform\" cx-prop-content=\"{{cxPropRecord}}\" cx-prop-show-scroll-to-top=\"true\" cx-prop-lookup-properties=\"{{cxPropSectionData.cxPropLookupProperties}}\"> <template is=\"yield\" yield-name=\"body-fileupload\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field=\"{{fieldObj}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{recordObj}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\"></crux-detailpage-field-details> </template> </crux-subform> </div></template><template case=\"false\"><div> <template items=\"{{cxPropBusinessCardDetails}}\" item=\"field\" index=\"fldIndex\" is=\"for\"><div data-zcqa=\"secDiv_Business_Card\" class=\"cxFlex cxAlignItemCenter {{cruxGetShowHideClassForLR(field,cxPropLayoutRules,cxPropLayoutId,'field')}} \"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(fldIndex,'!==',0),'&amp;&amp;',expHandlers(expHandlers(fldIndex,'!==',1),'||',expHandlers(cxPropNoOfFieldsInHeader,'===',1))),'&amp;&amp;',field.view_type.client_view)}}\"><template case=\"true\"> <div class=\"cxDvBcInfoFormField {{if(ifEquals(field.data_type,'fileupload'),'mT8','')}}\" id=\"bc_field_label_{{field.id}}\" data-zcqa=\"bc_dtVw_lbl_{{field.column_name}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.field_component_type,'===','activity_mml'),'&amp;&amp;',field.field_component_display_label)}}\"><template case=\"true\">{{field.field_component_display_label}}</template><template case=\"false\">{{field.field_label}}</template></template> <template is=\"if\" value=\"{{expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'===','Info Icon'))}}\"><template case=\"true\"> <span lt-prop-title=\"{{field.tooltip.value}}\" class=\"cxSprite cxInfoGrayBgIcon\"></span> </template></template> </div> <div id=\"bc_field_{{field.id}}\" class=\"dvValueContainer cxDvInfoValue\"> <div class=\"cxFlex cxAlignItemCenter\"> <div class=\"{{if(recordIsInAjaxEdit,'','cxDvCompParent')}} cxFlex cxAlignItemCenter cxDvAjaxEdit\" onclick=\"{{action('ajaxEdit',field)}}\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" field-id-val=\"business_fieldElem\" cx-prop-field=\"{{field}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;bc_value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;display_label&quot;,&quot;value_input_zcqa&quot;:&quot;display_label&quot;}\"> <template is=\"registerYield\" yield-name=\"detailField\"> <lyte-yield yield-name=\"{{if(cxPropRenderedFromSection,expHandlers('field-','+',fieldObj.yieldName),'detailSectionField')}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-field-details> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropSupportAjaxEdit,'||',expHandlers(field.data_type,'===','ownerlookup')),'&amp;&amp;',negate(recordIsInAjaxEdit)),'&amp;&amp;',expHandlers(field.read_only,'!')),'&amp;&amp;',expHandlers(field.view_type.client_edit,'||',field.view_type.edit)),'&amp;&amp;',expHandlers(field.preventEdit,'!'))}}\"><template case=\"true\"> <span class=\"edit_icon_{{field.id}} cxDvFieldEditIcon cxCP cxEditIcon\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span> </template></template> </div> <span id=\"bc_section_save_cancel_span_{{field.id}}\" class=\"cxDvSaveCancelSection\"> <span id=\"bc_saveAjaxEdit_{{field.id}}\" onclick=\"{{action('saveAjaxEdit',field)}}\" class=\"zcicncss-tick-filled-rounded zcicn-cssIcons zcicn_green_mask cxCP\"></span> <span id=\"bc_cancelAjaxEdit_{{field.id}}\" onclick=\"{{action('cancelAjaxEdit',field)}}\" class=\"zcicncss-close-rounded zcicn-cssIcons cxCP cxDvRecordEdit\"></span> </span> </div> </div> </template></template> </div></template> </div></template></template></template></template></template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1,1]},{"type":"attr","position":[0,3,1,1,1]},{"type":"registerYield","position":[0,3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,3,1,1,1]},{"type":"attr","position":[0,3,1,1,3]},{"type":"if","position":[0,3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3,1,3]},{"type":"attr","position":[0,3,1,3,1]},{"type":"attr","position":[0,3,1,3,3]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,3]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[0,3,3],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,3]}]},{"type":"attr","position":[0,3,1]},{"type":"for","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1,1]},{"type":"attr","position":[0,3,1,1,1]},{"type":"registerYield","position":[0,3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,3,1,1,1]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,1]},{"type":"registerYield","position":[3,1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"if","position":[3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[3,1,3,1]},{"type":"attr","position":[3,1,3,3]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropSectionData","cxPropSectionColumns","cxPropModule","cxPropRecord","cxPropLayoutId","isBusinessCardSection","cxPropBusinessCardDetails","cxPropModuleData","cxPropModuleId","cxPropSelfExecution","cxPropAjaxRequestTo","cxPropDetailPageRoute","cxPropRenderedFromSection","cxPropAllSections","cxPropSupportAjaxEdit","cxPropNoOfFieldsInHeader","cxPropUserTimeZone","cxPropFieldColumnMap","cxPropLayoutRules","cxPropScrollSelector","cxPropLookupProperties","componentUniqueId"],
_observedAttributesType :["object","array","string","object","string","boolean","array","object","string","boolean","string","string","boolean","array","boolean","number","string","object","object","string","object","string"],

	data : function(){
		return {
			cxPropSectionData : Lyte.attr('object'),
			cxPropSectionColumns : Lyte.attr('array',{default : []}),
			cxPropModule : Lyte.attr('string'),
			cxPropRecord : Lyte.attr('object'),
			cxPropLayoutId : Lyte.attr("string"),
			isBusinessCardSection : Lyte.attr('boolean',{default : false}),
			cxPropBusinessCardDetails : Lyte.attr('array'),
			cxPropModuleData : Lyte.attr('object'),
			cxPropModuleId : Lyte.attr("string"),
			cxPropSelfExecution : Lyte.attr('boolean',{default : true}),
			cxPropAjaxRequestTo : Lyte.attr('string',{default : "moduleapiname"}),
			cxPropDetailPageRoute : Lyte.attr('string'),
			cxPropRenderedFromSection : Lyte.attr('boolean',{default : false}),
			cxPropAllSections : Lyte.attr('array',{default : []}),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropNoOfFieldsInHeader : Lyte.attr('number',{default : 2}),
			cxPropUserTimeZone : Lyte.attr('string',{default : ''}),
			cxPropFieldColumnMap : Lyte.attr('object',{default : {}}),
			cxPropLayoutRules : Lyte.attr('object',{default : {}}),
			cxPropScrollSelector : Lyte.attr('string'),
			cxPropLookupProperties: Lyte.attr('object',{default:{"routeName":"crm.tab.module.entity","target":"_blank","showBc" : true,"hideIconForView":true,"hoverCallback":false}}),//NO I18N
			componentUniqueId	: Lyte.attr('string') 
		}		
	},
	init : function(){
		// if(this.data.isBusinessCardSection && !this.data.cxPropBusinessCardDetails){
		// 	store.findAll('businesscard',{module : this.data.cxPropModule}).then(function(res){
		// 		this.setData('cxPropBusinessCardDetails',res[0].fields);
		// 	}.bind(this))
		// }
		// if(this.data.cxPropModule && this.data.cxPropModuleId && !this.data.cxPropModuleData){
		// 	store.findRecord('module',this.data.cxPropModuleId).then(function(res){
		// 		this.setData({'cxPropModuleData' : res[0] , "cxPropModuleId" : res[0].id});
		// 	}.bind(this))
		// }
	},
	actions : {
		ajaxEdit : function(fieldObj){
			if(!((this.data.cxPropSupportAjaxEdit || fieldObj.data_type === 'ownerlookup') && !this.data.recordIsInAjaxEdit && !fieldObj.read_only && (fieldObj.view_type.client_edit || fieldObj.view_type.edit) && !fieldObj.preventEdit)){
				return;
			}
			var cruxFieldElem;
			if(fieldObj.data_type === "ownerlookup"){
				cruxFieldElem = $L('#'+this.data.cxPropRecord[fieldObj.api_name].id)[0];
				if(this.getMethods('changeOwnerSectionCallback')){
					this.executeMethod("changeOwnerSectionCallback",fieldObj,this.data.cxPropRecord[fieldObj.api_name].id,cruxFieldElem);
				}
			}else{
			var uniqId = this.getData('componentUniqueId'); 
			cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			var ajaxEditInprogress = wrapperComp.getData('recordIsInAjaxEdit');
				if (cruxFieldElem && !ajaxEditInprogress && (fieldObj.view_type.client_edit || (this.data.cxPropAjaxRequestTo === "moduleid" && fieldObj.view_type.edit))) { //key change
				cruxFieldElem.setData('cxPropFrom','create');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display' , 'flex');//eslint-disable-line @zoho/webperf/no-show
				wrapperComp.setData('recordIsInAjaxEdit',true);
			}
			}
		},
		cancelAjaxEdit : function(fieldObj){
			var uniqId = this.getData('componentUniqueId'); 
			var cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			if(cruxFieldElem){
				cruxFieldElem.cxProp('value',this.data.cxPropRecord[fieldObj.api_name]);
				cruxFieldElem.setData('cxPropFrom','view');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display','none');
				wrapperComp.setData('recordIsInAjaxEdit',false);
			}
			event.stopPropagation();
		},
		saveAjaxEdit : function(fieldObj){
			var cruxFieldElem;
			if(fieldObj.data_type === "ownerlookup"){
				cruxFieldElem = $L('#'+this.data.cxPropRecord[fieldObj.api_name].id)[0];
			}else{
			var _self = this;
			var uniqId = this.getData('componentUniqueId'); 
			cruxFieldElem = $L( this.data.isBusinessCardSection ? '#business_fieldElem_'+uniqId+'_'+fieldObj.id : '#fieldElem_'+uniqId+'_'+fieldObj.id)[0];
			var wrapperComp = $L('crux-detailpage-wrapper')[0];
			if(cruxFieldElem && cruxFieldElem.component && cruxFieldElem.component.validate()){
				var changedData = cruxFieldElem.component.getValue();
				changedData = this.processFieldValuesForAjaxEdit(changedData,fieldObj,cruxFieldElem);
				if(this.data.cxPropSelfExecution){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					//handle according to record api format and params
					var reqModel = this.data.cxPropModule;
					if(this.data.cxPropAjaxRequestTo === "moduleid"){
						reqModel = this.data.cxPropModuleId;
					}
					var record = store.peekRecord(reqModel , this.data.cxPropRecord.id);
					record.$.set(fieldObj.api_name , changedData);
					record.$.save().then(function(res){
						//success handling
						cruxFieldElem.setData('cxPropFrom','view');
						$L('#section_save_cancel_span_'+fieldObj.id).css('display','none');
						wrapperComp.setData('recordIsInAjaxEdit',false);
						if(_self.getMethods('onSave')){
							_self.executeMethod('onSave',res,fieldObj);
						}
					},function(err){
						//error handling
						record.$.rollBack();
						cruxFieldElem.setData('cxPropValue',record[fieldObj.api_name]);
						if(_self.getMethods('onError')){
							_self.executeMethod('onError',err);
						}
					})
				}else{
					if(_self.getMethods('ajaxSaveHandler')){
						_self.executeMethod('ajaxSaveHandler');
					}
				}
				
				
				
				//handling endz
				cruxFieldElem.setData('cxPropFrom','view');
				$L(this.data.isBusinessCardSection ? '#bc_section_save_cancel_span_'+fieldObj.id : '#section_save_cancel_span_'+fieldObj.id).css('display','none');
				wrapperComp.setData('recordIsInAjaxEdit',false);
			}
			event.stopPropagation();
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	},
	findFieldColumns : function(){
		if(!this.data.isBusinessCardSection  && !this.data.cxPropSectionData.isSubformSection){
			var section = this.getData("cxPropSectionData"), layoutId = this.getData("cxPropLayoutId");
			var leftColumnFields = [] , rightColumnFields = [] , dvColumns = [];
			var sortedSectionFields = section.section_field.sort(function(a,b){ // key change
				return a.sequence - b.sequence;// key change
			}.bind(this));
			var secFldLen = sortedSectionFields.length;
			for(var i=0 ; i < secFldLen ; i++){
				var field = sortedSectionFields[i];
				if(field.view_type.client_view){
					if((section.column_count === "double_column_section" || section.column_count === 2) && (field.sequence+1)%2 === 1){	
						rightColumnFields.push(field);
					}else{
						leftColumnFields.push(field);
					}
				}
			}
			dvColumns.push(leftColumnFields);
			if(section.column_count === "double_column_section" || section.column_count === 2){
				dvColumns.push(rightColumnFields);
			}
			if(leftColumnFields.length || rightColumnFields.length){
				this.setData("cxPropSectionColumns",dvColumns);
			}

			//Parent child section handling
			if(section.is_parent_section && section.child_sections){
				section.child_sections.forEach(function(child){
					if(child.isSubformSection){
						this.parseSubformSectionData(child);
					}
				}.bind(this));	
			}
		}else if(this.data.cxPropSectionData && this.data.cxPropSectionData.isSubformSection){
				this.parseSubformSectionData(this.data.cxPropSectionData);
		}
	}.observes('cxPropSectionData').on('init'),
	parseSubformSectionData : function(section){
		var lookupProperties = Lyte.deepCopyObject(this.getData('cxPropLookupProperties'));//NO I18N
		if(section.section_field){
			section.section_field.forEach(function(field){
				if(field.data_type === "fileupload"){
					field.yieldName = 'fileupload';//NO I18N
				}
				if(field.data_type === "lookup"){
						var lkpMod = store.peekRecord('module',field.lookup.module.id);
						var lookupModName = lkpMod ? lkpMod.module_name : field.lookup.module.api_name;
						lookupProperties[field.api_name] ={
							"dynamicParams":'["' + lookupModName + '","{{row.' + field.api_name + '.id}}"]',/*for lookup record redirect while click the lookup value*///NO I18N
							"module":lookupModName,/*for lookup hover card*///NO I18N
						};
				}
				if(field.column_name === "APPOINTMENTID"){
					field.cxPropCellSuffixYield = true;
				}
			});
			this.setData('cxPropSectionData.fields',this.getData('cxPropSectionData.section_field'));
			this.setData('cxPropSectionData.cxPropLookupProperties' , lookupProperties);
			if(section.parent_field){
				Lyte.arrayUtils( this.getData('cxPropSectionData.fields') , 'push' , section.parent_field);
			}
		}
	},
	processFieldValuesForAjaxEdit : function(changedData,fieldObj,cruxFieldElem){
		switch(fieldObj.data_type){
			case 'lookup' : 
				if(changedData){
					changedData = JSON.parse(changedData);
				}
				break;
			case 'currency':
			case 'double' :
			case "integer" :
			case "bigint" : 
			case "long" : 
				changedData = parseFloat(parseFloat(changedData).toFixed(fieldObj.decimal_place));
				if(fieldObj.data_type === 'currency'){
					cruxFieldElem.setData("cxPropFormattedCurrency",changedData);
				}
				break;
			case 'multiselectpicklist':
				changedData = changedData.join('; ');
				break;
			case "multiuserlookup" : 
				var existingValue = this.data.cxPropRecord[fieldObj.api_name];
				var processedValue = {users : []} , obj = {};
				// var removedData;
				if( changedData && changedData.length > 0 ){
					changedData.filter(function(item){
						obj[fieldObj.api_name] = item;
						processedValue.users.push(obj);
					})
					changedData = processedValue;
				}else if(existingValue && existingValue.users && existingValue.users.length){
					// existingValue.users.filter(function(item){
					// 	item[fieldObj.api_name]._delete = null;
					// });
					// return existingValue;
					changedData = undefined;
				}
				break;
		}
		return changedData;
	}
});
Lyte.Component.registerHelper('getFieldSuffixValue',function(value){
	return value ? I18n.getMsg('crm.service.subform.scheduled.service') : I18n.getMsg("crm.label.subform.add.unscheduled.service");
});
