Lyte.Component.register("crux-page-builder-element-preview", {
_template:"<template tag-name=\"crux-page-builder-element-preview\"> <template is=\"if\" value=\"{{visible}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropField.cxIsSpecialField}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{cxPropSpecialFieldPreviewComponent}}\" field=\"{{cxPropField}}\"></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{isSubform}}\"><template case=\"true\"> <template is=\"if\" value=\"{{showSubform}}\"><template case=\"true\"> <div class=\"cxPbTitleSection\"> <crux-text-component class=\"lytePbRejectDrag\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{cxPropSubformSection.display_label}}\" cx-prop-from=\"view\" cx-prop-id=\"subform_{{cxPropSubformSection.id}}\" cx-prop-tooltip=\"\"></crux-text-component> <template is=\"if\" value=\"{{cxPropSubformSection.tooltip}}\"><template case=\"true\"> <i class=\"cxPbSprite cxPbInfoIcon\" lt-prop-title=\"{{cxPropSubformSection.tooltip.value}}\"></i> </template></template> </div> <crux-subform class=\"cxPbSubformPreview\" cx-prop-allow-action-on-preview=\"{{allowCreate}}\" cx-prop-preview-mode=\"true\" cx-prop-type=\"create\" cx-prop-content=\"{{cxPropContent}}\" cx-prop-section=\"{{cxPropSubformSection}}\" crux-table-header-fields=\"{{lbind(tableHeaderFields)}}\" cx-prop-disable-create=\"{{expHandlers(allowCreate,'!')}}\" cx-prop-disable-edit=\"{{isSubformReadonly}}\" cx-prop-disable-delete=\"{{disableDelete}}\"></crux-subform> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropField.ui_type,'===',250)}}\"><template case=\"true\"> <div class=\"cxPbPreviewElements\"> <div class=\"cxElementLabel\" cx-prop-zcqa=\"{{cxPropZcqa}}\"> {{cxPropField.field_label}} <template is=\"if\" value=\"{{cxPropToolTipText}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft bottomLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{unescape(cruxEncodeHTML(cxPropToolTipText))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> <div class=\"cxElementValue\"> <crm-richtext-component init-minimize=\"{{method('fieldAction',cxPropField)}}\" click-maximize=\"{{method('fieldAction',cxPropField)}}\" cx-prop-zcqa=\"{{cxPropZcqa}}\" class=\"cxElementValue\" cx-prop-field-key=\"field_label\" show-more-button=\"true\" cx-prop-field-api-name=\"{{cxPropField.api_name}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-readonly=\"{{cxPropReadOnly}}\" cx-prop-placeholder=\"{{cxPropPlaceHolder}}\" cx-prop-maxlength=\"{{cxPropField.length}}\"></crm-richtext-component> </div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropField.ui_type,'===',123)}}\"><template case=\"true\"> <div class=\"cxPbPreviewElements\"> <div class=\"cxElementLabel cxElementLabelNoPadding\" cx-prop-zcqa=\"{{cxPropZcqa}}\"> {{cxPropField.field_label}} </div> <div class=\"cxElementValue\"> <lyte-checkbox class=\"{{if(cruxContains(QCRestrictedFields,cxPropField.ui_type),'cxPeNone')}} cxPbPreviewElements\" lt-prop-disabled=\"true\" lt-prop-type=\"switch\" lt-prop-name=\"checkbox\" lt-prop-checked=\"false\" lt-prop-id=\"checkbox\" lt-prop-field-key=\"{{cxPropField.field_label}}\"></lyte-checkbox> </div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropField.data_type,'===','address')}}\"><template case=\"true\"> <div class=\"cxPbPreviewAddressHeader\" cx-prop-zcqa=\"{{cxPropZcqa}}\"> {{cxPropField.field_label}} <template is=\"if\" value=\"{{cxPropToolTipText}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft bottomLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{unescape(cruxEncodeHTML(cxPropToolTipText))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> <div class=\"cxPbAddressElementFieldsWrap\"> <template is=\"for\" items=\"{{cxPropField.child_fields}}\" item=\"fld\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(fld.address.type,'===',&quot;coordinates&quot;)}}\"><template case=\"true\"> <div class=\"cxPbPreviewElements cxPbPreviewDoubleElements\"> <lyte-text class=\"cxElementLabel\" lt-prop-value=\"{{fld.field_label}}\"></lyte-text> <div class=\"cxFlex cxFlexSpaceBtwn cxElementValue\"> <template is=\"for\" items=\"{{fld.child_fields}}\" item=\"cfld\" index=\"index\"> <template cx-prop-zcqa=\"{{cfld.cxPropQcPreviewLabelZcqa}}\" id=\"{{cxPropField.api_name}}_child_{{cfld.api_name}}\" class=\"cxPbPreviewDoubleElemChild cxFlexOne\" cx-prop-handler=\"lyteCircle\" cx-prop-readonly=\"{{cxPropReadOnly}}\" cx-prop-scope=\"#preview_node.cxPbPreviewModalContent\" component-name=\"crux-{{cxPropUITypeVsComponentMap[cfld.ui_type]}}-component\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cfld}}\" cx-prop-from=\"create\" is=\"component\" cx-prop-maxlength=\"{{cfld.length}}\" cx-prop-picklist-values=\"{{cfld.pick_list_values}}\" cx-prop-is-color-code-enabled=\"{{cfld.enable_colour_code}}\" cx-prop-value=\"{{lbind(cfld.cxPropValue)}}\" cx-prop-is-display-format-enabled=\"true\" cx-prop-freeze=\"true\" cx-prop-placeholder=\"{{cfld.field_label}}\"></template> </template> </div> </div> </template><template case=\"false\"> <template cx-prop-zcqa=\"{{fld.cxPropQcPreviewLabelZcqa}}\" id=\"{{cxPropField.api_name}}_child_{{fld.api_name}}\" class=\"cxPbPreviewElements\" cx-prop-handler=\"lyteCircle\" cx-prop-scope=\"#preview_node.cxPbPreviewModalContent\" component-name=\"crux-{{cxPropUITypeVsComponentMap[fld.ui_type]}}-component\" cx-prop-appearance=\"box\" cx-prop-field=\"{{fld}}\" cx-prop-field-key=\"field_label\" cx-prop-from=\"create\" is=\"component\" cx-prop-readonly=\"{{cxPropReadOnly}}\" cx-prop-maxlength=\"{{fld.length}}\" cx-prop-picklist-values=\"{{fld.pick_list_values}}\" cx-prop-is-color-code-enabled=\"{{fld.enable_colour_code}}\" cx-prop-value=\"{{lbind(fld.cxPropValue)}}\" cx-prop-is-display-format-enabled=\"true\" cx-prop-freeze=\"true\" on-value-change=\"{{method('onAddressFieldChange',fld)}}\"></template> </template></template> </template> <div class=\"cxPbAddressClearBtn {{if(cxPropReadOnly,'cxPbAddressBtnReadonly','')}}\" onclick=\"{{action('resetAddressField',cxPropField.id)}}\">Clear All</div> </div> </template><template case=\"false\"> <template id=\"preview_{{cxPropField.api_name}}\" on-show-lookup=\"{{method('fieldValueChange',cxPropField)}}\" cx-prop-zcqa=\"{{cxPropZcqa}}\" on-value-change=\"{{method('fieldValueChange',cxPropField)}}\" cx-prop-mandatory=\"{{cxPropField.required}}\" cx-prop-div-wrapper-class=\"{{if(cruxContains(QCRestrictedFields,cxPropField.ui_type),'cxPeNone','')}}\" class=\"cxPbPreviewElements\" component-name=\"crux-{{componentType}}-component\" cx-prop-appearance=\"box\" cx-prop-field=\"{{cxPropField}}\" cx-prop-field-key=\"field_label\" cx-prop-from=\"create\" is=\"component\" cx-prop-readonly=\"{{cxPropReadOnly}}\" cx-prop-type=\"{{fieldType}}\" cx-prop-maxlength=\"{{cxPropField.length}}\" cx-prop-picklist-values=\"{{cxPropPicklistValues}}\" cx-prop-is-color-code-enabled=\"{{cxPropField.enable_colour_code}}\" cx-prop-placeholder=\"{{cxPropPlaceHolder}}\" cx-prop-info-tooltip=\"{{cxPropToolTipText}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-is-display-format-enabled=\"true\" cx-prop-freeze=\"true\" cx-prop-enable-lbind=\"false\" cx-prop-show-calculator=\"{{if(ifEquals(cxPropField.data_type,'currency'),'true','false')}}\" cx-prop-prefix-yield=\"{{cxPropField.dependent_field}}\" cx-prop-tab-index=\"{{if(cruxContains(QCRestrictedFields,cxPropField.ui_type),'-1')}}\" cx-prop-icon-class=\"{{iconClass}}\" cx-prop-show-close-icon=\"true\" cx-prop-enable-country-code=\"{{userDetails.isPhoneNoNewView}}\" cx-prop-date-in-user-pattern=\"true\" cx-prop-filterable=\"false\" cx-prop-handler=\"lyteCircle\" cx-prop-option-type=\"{{optionType}}\" cx-prop-options=\"{{cxPropPicklistValues}}\" cx-prop-disabled=\"{{cxPropDisabled}}\" on-module-select=\"{{method('fieldValueChange',cxPropField)}}\"> <template is=\"registerYield\" yield-name=\"prefixYield\"> <crux-dropdown class=\"cxPbElemPrevDepDropdown\" cx-prop-options=\"{{cxPropField.dependent_field.pick_list_values}}\" cx-prop-user-value=\"display_value\" cx-prop-system-value=\"actual_value\"></crux-dropdown> </template> </template> </template></template></template></template></template></template></template></template> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]},{"type":"attr","position":[3,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["visible","cxPropField","fieldType","cxPropReadOnly","lcData","cxPropId","cxPropPlaceHolder","cxPropToolTipText","cxPropUITypeVsComponentMap","cxPropDataTypeToCruxMapping","userDetails","QCRestrictedFields","cxPropGlobalCountryStateMap","cxPropZcqa","cxPropValue","tableHeaderFields","cxPropSpecialFieldPreviewComponent","isSubform","cxPropSubformSection","cxPropContent","showSubform","isSubformReadonly","allowCreate","disableDelete","optionType","cxPropPicklistValues"],
_observedAttributesType :["boolean","object","string","boolean","object","string","string","string","object","object","object","array","object","string","string","array","string","boolean","object","object","boolean","boolean","boolean","boolean","string","array"],

	data : function(){
		return {
			visible : Lyte.attr('boolean',{default :true}), //no i18n
			cxPropField : Lyte.attr('object',{hideAttr : true,default : {field_label : 'Field Label'}}), //no i18n
			fieldType : Lyte.attr('string',{default:'single'}),
			cxPropReadOnly : Lyte.attr('boolean',{default:false}),
			lcData : Lyte.attr('object',{watch : true}),
			cxPropId : Lyte.attr('string'),
			cxPropPlaceHolder : Lyte.attr('string'),
			cxPropToolTipText : Lyte.attr('string'),
			cxPropUITypeVsComponentMap : Lyte.attr('object', {default: { 
					"1": "text",
					"2": "picklist",
					"3": "text-area",
					"4": "lookup",
					"5": "lookup",
					"8": "user",
					"14": "date-time",
					"20": "user",
					"21": "website",
					"22": "twitter",
					"24": "date",
					"25": "email",
					"26": "picklist",
					"32": "number",
					"33": "phone",
					"34": "number",
					"36": "number",
					"38": "number",
					"39": "picklist",
					"40": "number",
					"52": "number",
					"55": "user",
					"77": "number",
					"96":"picklist",
					"100": "picklist",
					"110": "text-area",
					"111": "text",
					"132": "lookup",
					"133": "lookup",
					"143": "number",
					"144": "number",
					"145": "number",
					"200": "date-time",
					"202": "date",
					"207": "layout",
					"208": "layout",
					"209": "tag",
					"221": "user",
					"300": "boolean",
					"301": "boolean",
					"333": "date-time",
					"444":"lookup",
					"445":"user",
					"555":"file-upload",
					"556": "image",
					"786": "date-time",
					"999": "layout"
			}}),
			cxPropDataTypeToCruxMapping : Lyte.attr('object', {default: 
				{
					"boolean": "boolean",
					"date": "date",
					"datetime": "date-time",
					"email": "email",
					"image": "image",
					"layout": "layout",
					"lookup": "lookup",
					"number": "number",
					"phone": "phone",
					"picklist": "picklist",
					"tag": "tag",
					"text": "text",
					"textarea": "text-area",
					"twitter": "twitter",
					"user": "user",
					"website": "website"
				}
			}),
			userDetails : Lyte.attr('object',{default:{}}),
			QCRestrictedFields : Lyte.attr('array',{default:[123,133,445,444,556]}),
			cxPropGlobalCountryStateMap : Lyte.attr('object',{default:{}}),
			cxPropZcqa: Lyte.attr('string'),
			cxPropValue: Lyte.attr('string'),
			tableHeaderFields: Lyte.attr('array',{default:[]}),
			cxPropSpecialFieldPreviewComponent : Lyte.attr('string'),
			isSubform: Lyte.attr('boolean',{default:false}),
			cxPropSubformSection : Lyte.attr('object',{default : {}}),
			cxPropContent : Lyte.attr('object',{default : {}}),
			showSubform : Lyte.attr('boolean',{default:true}),
			isSubformReadonly : Lyte.attr('boolean',{default:false}),
			allowCreate: Lyte.attr('boolean',{default:true}),
			disableDelete: Lyte.attr('boolean',{default:false}),
			optionType: Lyte.attr('string'),
			cxPropPicklistValues: Lyte.attr('array',{default:[]})
		};		
	},
	init : function(){
		if(this.data.cxPropSectionId){
			this.setData('cxPropSubformSection',store.peekRecord('section',this.data.cxPropSectionId));
			this.setData('isSubform',true);
			let subformField;
			if(this.data.cxPropSubformSection.section_field.length === 0){
				subformField = this.data.cxPropSubformSection.fields[0];
			} else {
				this.data.cxPropSubformSection.section_field.forEach((fld)=>{
					if(fld.ui_type === 500){
						subformField = fld;
					}
					else {
						let view_type = fld.view_type;
						view_type.create = view_type.client_create;
						view_type.edit = view_type.client_edit;
						view_type.view = view_type.display_everywhere;
						fld.visible = view_type.view;
					}
				});
			}
			this.setData('cxPropField',subformField);
		}
		this.setData('cxPropField',store.peekRecord('field',this.data.cxPropField.id));
		this.setData('lcData',this.$lc);
		let cxPropField = this.getData('cxPropField');
		this.setData('cxPropValue',cxPropField.default_value);
		if(cxPropField.data_type === "picklist" && cxPropField.required === true){
			this.setData('cxPropValue',cxPropField.pick_list_values[0].display_value);
		}
		if(cxPropField && cxPropField.data_type === 'address'){
			// this.$node.classList.add('cxPbAddressElementComp');
			let addField = cxPropField;
			addField.child_fields.forEach((fld)=>{
				if(fld.child_fields){
					fld.child_fields.forEach((cfld)=>{
						// cfld.$.set('cxClass','cxPbAddressElemDoubleColField');
						cfld.$.set('cxPropValue','');
						if(!cfld.cxPropQcPreviewLabelZcqa){
							cfld.cxPropQcPreviewLabelZcqa = 'cxPbQcPreview_'+cfld.field_label;
						}			
					});
				}
				if(!fld.cxPropQcPreviewLabelZcqa){
					fld.cxPropQcPreviewLabelZcqa = 'cxPbQcPreview_'+fld.field_label;
				}
				fld.$.set('cxPropValue','');				
			});
		}
		if(cxPropField.data_type === "multiselectpicklist"){
			this.setData('fieldType','multiple');
		}
		if(cxPropField.data_type === "multi_module_lookup" || (cxPropField.module && cxPropField.module[0].api_name === "Tasks" && ["Who_Id","What_Id"].contains(cxPropField.api_name))){
			this.setData('fieldType','multi_module_lookup');
		}
		if(cxPropField.tool_tipcontent){
			this.setData({'cxPropPlaceHolder':cxPropField.tool_tiptype === 0 ? '' : cxPropField.tool_tipcontent ,cxPropToolTipText:cxPropField.tool_tiptype === 0 ? cxPropField.tool_tipcontent : ''});
		}
		if(cxPropField.ui_type === 556){
			this.setData('cxPropPlaceHolder',_cruxUtils.getI18n('crm.FileuploadField.addNewImage'));
		}
		if(cxPropField.ui_type === 250 || cxPropField.ui_type === 2 && (cxPropField.display_format === "radio_button" || cxPropField.display_format === "group_button")){
			this.$node.classList.add('cxPbPreviewElements');
		}
		this.setData('cxPropPicklistValues',cxPropField.pick_list_values);
		if(cxPropField.data_type === 'fileupload'){
			this.setData('fieldType','multiple');
			this.setData('optionType','menu');
			this.setData('cxPropPicklistValues',cxPropField.file_upolad_optionlist);
			this.setData('cxPropPlaceHolder',_cruxUtils.getI18n("crm.staticresources.file.choose"));
		}
		let componentType = this.data.cxPropUITypeVsComponentMap[cxPropField.ui_type] || this.data.cxPropDataTypeToCruxMapping[cxPropField.data_type] || "text";
		if(cxPropField.ui_type === 2 && (cxPropField.display_format === "radio_button" || cxPropField.display_format === "group_button")){
			componentType = "grouper-radio";
		}
		this.setData('componentType',componentType);
		if(["lookup","multiselectlookup","multi_module_lookup"].indexOf(this.data.cxPropField.data_type) !== -1){
			this.setData('iconClass',this.getLookupIconClass(this.data.cxPropField));
		}
		this.setData('cxPropZcqa',cxPropField.cxPropQcPreviewLabelZcqa || 'cxPbQcPreview_'+cxPropField.field_label);
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("userDetails", this.cruxPageBuilder.getData("cxPropUserDetails"));
		this.setData('cxPropSpecialFieldPreviewComponent',this.cruxPageBuilder.getData("cxPropSpecialFieldPreviewComponent"));
	},
	didConnect : function(){
		if(this.data.cxPropField.data_type === 'address'){
			this.setData("cxPropGlobalCountryStateMap", this.cruxPageBuilder.getData("cxPropGlobalCountryStateMap"));
			let addField = this.data.cxPropField;
			addField.child_fields.forEach((fld)=>{
				if(fld.default_value && fld.address.type==="country"){
					fld.$.set('cxPropValue',fld.default_value);
					this.executeMethod('onAddressFieldChange',fld,fld.default_value);
				}
			});
		}
		if(this.data.cxPropField.ui_type === 8){
			let userRecord = store.peekRecord('user',this.data.userDetails.USER_ID);
			var userDetails = {};
			userDetails.id = this.data.userDetails.USER_ID;
			userDetails.full_name = userRecord && userRecord.full_name;
			this.setData('cxPropValue',userDetails);
		}
	},
	didDestroy : function(){
		delete this.cruxPageBuilder
	},
	getLookupIconClass: function (lookupFieldData,value) {
		var corres_moduleName, isCustommodule = false, returnValue = "cxModulecustomModule", havemoduleId = true;
	switch (lookupFieldData.data_type) {
			case 'multiselectlookup':
				corres_moduleName = lookupFieldData.multiselectlookup.connected_details.module.api_name;
				if (!lookupFieldData.multiselectlookup.connected_details.module.id) {
					havemoduleId = false;
				}
				if (lookupFieldData.multiselectlookup.connected_details.module && lookupFieldData.multiselectlookup.connected_details.module.hasOwnProperty("generated_type")) {
					isCustommodule = lookupFieldData.multiselectlookup.connected_details.module.generated_type === 'default' ? false : true;//no i18n
				}
				break;
			case 'lookup':
				corres_moduleName = lookupFieldData.lookup.module.api_name;
				if (!lookupFieldData.lookup.module.id) {
					havemoduleId = false;
				}
				if (lookupFieldData.lookup.module && lookupFieldData.lookup.module.hasOwnProperty("generated_type")) {
					isCustommodule = lookupFieldData.lookup.module.generated_type === 'default' ? false : true;//no i18n
				} else if (havemoduleId) {
					let lookupModuleRecord = store.peekRecord('module', lookupFieldData.lookup.module.id);
					if (lookupModuleRecord && lookupModuleRecord.hasOwnProperty("generated_type")) {
						isCustommodule = lookupModuleRecord.generated_type === 'default' ? false : true;//no i18n
					}
				}
				break;
			case 'multi_module_lookup':
				corres_moduleName = value ? value.api_name : lookupFieldData.multi_module_lookup.modules[0].module_name;
				let multiModuleRecord = store.peekRecord('module', value ? value.id : lookupFieldData.multi_module_lookup.modules[0].id);
				if (multiModuleRecord && multiModuleRecord.hasOwnProperty("generated_type")) {
					isCustommodule = multiModuleRecord.generated_type === 'default' ? false : true;//no i18n
				}
				break;
		}
		corres_moduleName = corres_moduleName.toLowerCase();
		corres_moduleName = corres_moduleName === 'deals' ? 'potentials' : corres_moduleName;
		isCustommodule = corres_moduleName === "services__s" ? true : isCustommodule;
		if (isCustommodule === false) {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : `zcicncss-${corres_moduleName} zcicn-cssIcons`;//no i18n
		} else {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : "zcicncss-custommodule zcicn-cssIcons";	//no i18n
		}
		return returnValue;
	},
	profileChange : function (){
		let cxPropField = this.data.cxPropField;
		let profiles = this.data.cxPropField && this.data.cxPropField.profiles;
		let isSubform = this.data.isSubform;
		let currProf;
		profiles.forEach(ele=>{
			if(this.$lc.currProfId === ele.id && ele.permission_type !== "hidden"){
				currProf = ele;
			}
		});
		if(!currProf){
			this.setData('visible',false);
		}else if(currProf && currProf.permission_type === "read_only"){
			this.setData({'cxPropReadOnly':true,'visible':true});
		}else {
			this.setData({'cxPropReadOnly':false,'visible':true});
		}
		switch (cxPropField.data_type) {
			case 'address':
				let clrBtn = $L(this.$node).find('.cxPbAddressClearBtn')[0];
				if(clrBtn && currProf && currProf.permission_type === "read_only"){
					clrBtn.classList.add('cxPbAddressBtnReadonly');
				}else if(clrBtn){
					clrBtn.classList.remove('cxPbAddressBtnReadonly');
				}
				break;
			case "picklist":
				this.setData('cxPropValue',cxPropField.pick_list_values[0].display_value);
				break;
			case "radio_button":
			case "boolean":
				if(this.data.cxPropReadOnly){
					this.setData('cxPropDisabled',true);
				}
				break;
		}
		this.setData('cxPropValue',cxPropField.default_value);
		if(isSubform && this.data.cxPropSubformSection.section_field.length === 0){
			this.setData('showSubform',false);
		}
		if(isSubform){
			let permission = this.data.cxPropSubformSection.permission[this.$lc.currProfId];
			if(permission){
				this.setData({
					'allowCreate':permission.creatable,
					'isSubformReadonly':!permission.editable,
					'disableDelete':!permission.deletable,
					'showSubform':permission.viewable
				})
			}
		}
	}.observes('lcData.currProfId').on('init'),
	actions : {
		resetAddressField : function(id){
			let addField = store.peekRecord('field',id);
			addField.child_fields.forEach((fld)=>{
				if(fld.child_fields){
					fld.child_fields.forEach((cfld)=>{
						cfld.$.set('cxPropValue','');
					});
				}
				fld.$.set('cxPropValue','');
			});
		},
		showInfoTooltip: function(origElem) {
			this.showHideInfoTooltip(origElem);
		}
	},
	methods : {
		onAddressFieldChange : function(childFld,value){
			if(childFld.address.type==="country"){
				let pick_list_values = this.data.cxPropGlobalCountryStateMap.pick_list_values;
				let options_len = pick_list_values.length,stateField;
				this.data.cxPropField.child_fields.forEach((fld)=>{
					if(fld.address.type==="state"){
						stateField = fld;
					}
				});
				for(let i=0;i<options_len;i++){
					if(pick_list_values[i].display_value === value){
						let child_options = pick_list_values[i].maps;
						child_options.unshift(child_options.pop());
						let childFldApiName = `#${this.data.cxPropField.api_name}_child_${stateField.api_name}`;
						let childComp = $L(childFldApiName)[0];
						if(childComp){
							childComp.setData('cxPropPicklistValues',child_options);
							childComp.setData('cxPropValue','');
							break;
						}
						else{
							stateField.pick_list_values = child_options;
						}
					}
				}
			}
		},
		fieldValueChange: function(field,value){
			switch (field.data_type) {
				case "picklist":
					let option;
					field.pick_list_values.forEach((opt)=>{
						if(opt.display_value === value && opt.maps && opt.maps.length > 0){
							option = opt;
						}
					});
					let childField = option && $L("#preview_"+option.maps[0].api_name)[0];
					if(childField){
						childField.component.setData('cxPropPicklistValues',option.maps[0].pick_list_values);
					}
					break;
				case "multi_module_lookup" :
					this.setData('iconClass',this.getLookupIconClass(field,value));
					break;
			}
			this.setData("cxPropValue",value);
		},
		hideInfoTooltip: function() {
			this.showHideInfoTooltip();
   		},
		fieldAction : function(field) {
			switch (field.data_type) {
				case "textarea":
					let ltModal = $L('#lytePreviewModal')[0].component;
					let minimizeClick = ltModal.getData('ltPropWrapperClass');
					if(minimizeClick){
						ltModal.setData('ltPropWrapperClass','');
					}else {
						ltModal.setData('ltPropWrapperClass','cxPbPrevModalTransUnset');
					}
					break;
			}
		}
	}
},{mixins : ["crux-element-validation"]});

Lyte.Component.register("crux-page-builder-element-toolbar", {
_template:"<template tag-name=\"crux-page-builder-element-toolbar\" class=\"cxPbElementToolBar\"> <span id=\"toolbar_icon_{{cxPropField.id}}\" class=\"cxPbToolIconWrap\">...</span> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"#toolbar_icon_{{cxPropField.id}}\" on-before-open=\"{{method('getFieldPropertyActions')}}\" on-menu-click=\"{{method('onToolbarClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropFieldActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.value}}\"> <lyte-menu-label>{{item.name}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropId","cxPropField","cxPropFieldActions"],
_observedAttributesType :["string","object","array"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string',{default : 'standard'}), //no i18n
			cxPropField : Lyte.attr('object'), //no i18n
			cxPropFieldActions : Lyte.attr('array',{default : [{name : "Mark as required",value : 'mark_as_required'},{name : "Set Permission",value : 'set_permission'},{name : "Edit Properties",value : 'edit_properties'}, {name : "Create Layout Rule",value : 'create_layout_rule'}, {name : "Create Validation Rule",value : 'create_validation_rule'} , {name : "Add to other layouts",value : 'add_to_other_layouts'}, {name : "Remove Field",value : 'remove_field'}]}) //no i18n
		};	
	},
	didConnect : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
	},
	methods : {
		onToolbarClick : function(value){
			if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
				this.cruxPageBuilder.executeMethod('cxPbToolBarAction',this.data.cxPropField,value);
			}
		},
		getFieldPropertyActions : function(){
			let opt = this.data.cxPropFieldActions;
			if(this.cruxPageBuilder.getMethods('cxPbSetToolBarActions')){
				opt = this.cruxPageBuilder.executeMethod('cxPbSetToolBarActions',this.data.cxPropField,opt);
				this.setData("cxPropFieldActions", opt);
			}
		}
	},
	actions : {
		// onToolbarClick : function(value){
		// 	if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
		// 		this.cruxPageBuilder.executeMethod('cxPbToolBarAction',this.data.cxPropField,value);
		// 	}
		// }
	}
});

Lyte.Component.register("crux-page-builder-element", {
_template:"<template tag-name=\"crux-page-builder-element\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField.field_label}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"if\" value=\"{{isPreview}}\"><template case=\"true\"> <crux-page-builder-element-preview lc-data=\"{{lcData}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-id=\"{{cxPropId}}\" lt-prop-title=\"{{if(cxPropReadOnly,cruxGetI18n('crm.lable.read.only'),'')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;,&quot;hidedelay&quot; : &quot;50&quot;}\"></crux-page-builder-element-preview> </template><template case=\"false\"> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxBuilderFieldChange\" on-fire=\"{{action('setFieldData')}}\"></lyte-event-listener> <div class=\"{{elementClassNames}} {{if(cxPropField[cxPropFieldSpecialMetaKeys.cxMandatory],'cxPbMandatoryClass','')}} {{if(expHandlers(expHandlers(cxPropEditableFieldLabelElement,'&amp;&amp;',expHandlers(cxPropType,'==','standard')),'&amp;&amp;',cruxContains(cxPropField.customizable_properties,'fieldlabel')),'cxPbEditableLabelElement','')}}\" onclick=\"{{action('openProperties',event)}}\" data-zcqa=\"{{if(cruxAnd(ifEquals(cxPropType,'quickcreate'),cxPropField.cxPropQcLabelZcqa),cxPropField.cxPropQcLabelZcqa,if(cxPropField.cxPropLabelZcqa,cxPropField.cxPropLabelZcqa,cruxConcat(if(ifEquals(cxPropType,'quickcreate'),'cxPbQc_','cxPb_'),cxPropField.api_name,'_label')))}}\" tabindex=\"0\"> <span class=\"cxPbElementIcon cxPbSprite cxPb{{cruxCapitalize(cxPropField.data_type)}}Icon {{if(cxPropDataTypeMappingIcons[cxPropField.data_type],cruxConcat('cxPb',cruxCapitalize(cxPropDataTypeMappingIcons[cxPropField.data_type]),'Icon'),'')}}\" lt-prop-title=\"{{propertyJson.display_label}}\"></span> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropEditableFieldLabelElement,'&amp;&amp;',expHandlers(cxPropType,'==',&quot;standard&quot;)),'&amp;&amp;',cruxContains(cxPropField.customizable_properties,'fieldlabel'))}}\"><template case=\"true\"> <crux-text-component class=\"cxPbElementLabelInput lytePbRejectDrag cxPbElementLabel\" cx-prop-appearance=\"box\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{cxPropField.field_label}}\" cx-prop-from=\"create\" on-value-change=\"{{method('fieldLabelChange',this)}}\" cx-prop-tooltip=\"\" cx-prop-maxlength=\"50\"></crux-text-component> </template><template case=\"false\"> <lyte-text class=\"cxPbElementLabel\" lt-prop-value=\"{{cxPropField.field_label}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{cxPropEditableFieldLabelElement}}\"><template case=\"true\"> <template is=\"if\" value=\"{{getBuilderFieldSpecialMetaText(cxPropField,cxPropField[cxPropFieldSpecialMetaKeys.cxUnique],cxPropField[cxPropFieldSpecialMetaKeys.cxEncrypt],cxPropField[cxPropFieldSpecialMetaKeys.cxPersonal],cxPropField[cxPropFieldSpecialMetaKeys.cxPersonalHealth])}}\"><template case=\"true\"><div class=\"cxPbElemFieldMetaText\"> {{getBuilderFieldSpecialMetaText(cxPropField,cxPropField[cxPropFieldSpecialMetaKeys.cxUnique],cxPropField[cxPropFieldSpecialMetaKeys.cxEncrypt],cxPropField[cxPropFieldSpecialMetaKeys.cxPersonal],cxPropField[cxPropFieldSpecialMetaKeys.cxPersonalHealth])}} </div></template></template> </template></template> <template is=\"if\" value=\"{{cxPropField.dependent_field}}\"><template case=\"true\"> <crux-dropdown class=\"cxPbElemDepDropdown\" cx-prop-options=\"{{cxPropField.dependent_field.pick_list_values}}\" cx-prop-selected=\"{{cxPropField.dependent_field.pick_list_values[1].actual_value}}\" cx-prop-user-value=\"display_value\" cx-prop-system-value=\"actual_value\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropType,'==',&quot;quickcreate&quot;),'&amp;&amp;',expHandlers(cxPropField[cxPropFieldSpecialMetaKeys.cxMandatory],'!')),'&amp;&amp;',showRemoveIcon),'&amp;&amp;',expHandlers(dontShowRemoveIconForSingleField,'!'))}}\"><template case=\"true\"> <span class=\"cxIconHoverEffect cxPbQcMinusIconWrapper lytePbRejectDrag\" data-zcqa=\"{{if(cxPropField.cxPropQcRemoveZcqa,cxPropField.cxPropQcRemoveZcqa,cruxConcat('cxPbQc_',cxPropField.api_name,'_remove'))}}\" onclick=\"{{action('removeField',event)}}\" onkeydown=\"{{action('removeFieldKey',event)}}\" tabindex=\"0\"> <span class=\"cxMinusRoundedIcon\"></span> </span> </template></template> <template is=\"if\" value=\"{{cxPropRightPanelDisable}}\"><template case=\"true\"> <span id=\"toolbar_icon_{{cxPropField.id}}\" lt-prop-title=\"{{if(propertyDisable,cxPropDisableToolTip,'')}}\" class=\"cxPbElemActionIconWrap {{if(cruxOr(propertyDisable,cxErrorMessage),'cxPbDisabled','')}}\" onclick=\"{{action('onToolbarClick',this)}}\"> <span class=\"cxMoreIcon cxPbElemMoreIcon\"></span> </span> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(cxPropField.data_type,'===','address')}}\"><template case=\"true\"> <div class=\"cxPbAddressElementFieldsWrap\"> <template is=\"for\" items=\"{{cxPropField.child_fields}}\" item=\"fld\" index=\"index\"> <template is=\"if\" value=\"{{fld.child_fields}}\"><template case=\"true\"> <template is=\"for\" items=\"{{fld.child_fields}}\" item=\"cfld\" index=\"index\"> <div class=\"{{cfld.cxClass}} {{if(cfld[cxPropFieldSpecialMetaKeys.cxMandatory],'cxPbMandatoryClass')}} cxPbElementClass cxPbElementDraggable\"> <lyte-text lt-prop-value=\"{{cfld.field_label}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropRightPanelDisable}}\"><template case=\"true\"> <span id=\"toolbar_icon_{{cfld.id}}\" lt-prop-title=\"{{if(propertyDisable,cxPropDisableToolTip,'')}}\" class=\"cxPbElemActionIconWrap {{if(cruxOr(propertyDisable,cxErrorMessage),'cxPbDisabled','')}}\" onclick=\"{{action('onToolbarClick',this,cfld)}}\"> <span class=\"cxMoreIcon cxPbElemMoreIcon\"></span> </span> </template></template> </div> </template> </template><template case=\"false\"> <div class=\"{{fld.cxClass}} {{if(fld[cxPropFieldSpecialMetaKeys.cxMandatory],'cxPbMandatoryClass')}} cxPbElementClass cxPbElementDraggable\"> <lyte-text lt-prop-value=\"{{fld.field_label}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropRightPanelDisable}}\"><template case=\"true\"> <span id=\"toolbar_icon_{{fld.id}}\" lt-prop-title=\"{{if(propertyDisable,cxPropDisableToolTip,'')}}\" class=\"cxPbElemActionIconWrap {{if(cruxOr(propertyDisable,cxErrorMessage),'cxPbDisabled','')}}\" onclick=\"{{action('onToolbarClick',this,fld)}}\"> <span class=\"cxMoreIcon cxPbElemMoreIcon\"></span> </span> </template></template> </div> </template></template> </template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxErrorMessage,'||',cxInfoMessage)}}\"><template case=\"true\"><div class=\"cxPbElemMessage\"> <template is=\"if\" value=\"{{cxInfoMessage}}\"><template case=\"true\"><span class=\"cxInfoIcon\"></span></template></template> {{unescape(expHandlers(cxErrorMessage,'||',cxInfoMessage))}} </div></template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"text","position":[2,1,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,9]},{"type":"if","position":[3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,11]},{"type":"if","position":[3,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[0,3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxMapping","cxMandatory","cxPropField","cxPropSubformField","cxPropSetActive","cxPropId","cxPropType","cxPropFieldSpecialMetaKeys","cxPropRightPanelDisable","isPreview","lcData","propertyDisable","moduleName","showRemoveIcon","userDetails","dontShowRemoveIconForSingleField","cxPropEditableFieldLabelElement","cxErrorMessage","cxInfoMessage","lyteViewPort","propertyJson"],
_observedAttributesType :["string","boolean","object","boolean","boolean","string","string","object","boolean","boolean","object","boolean","string","boolean","object","boolean","boolean","string","string","boolean","object"],

	data : function(){
		return {
			cxMapping : Lyte.attr('string',{default : 'Single Line'}), //no i18n
			cxMandatory : Lyte.attr('boolean',{default :false}), //no i18n
			cxPropField : Lyte.attr('object',{hideAttr : true,default : {field_label : 'Field Label'}}), //no i18n
			cxPropSubformField : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropSetActive :  Lyte.attr('boolean',{default : false}), //no i18n
			cxPropId : Lyte.attr('string'),
			cxPropType : Lyte.attr('string',{default : 'standard'}),
			cxPropFieldSpecialMetaKeys :  Lyte.attr('object',{default : {}}),
			cxPropRightPanelDisable : Lyte.attr('boolean'),
			isPreview : Lyte.attr('boolean',{default:false}),
			lcData : Lyte.attr('object',{watch : true}),
			propertyDisable : Lyte.attr('boolean',{default : false}),
			moduleName : Lyte.attr('string',{hideAttr : true}),
			showRemoveIcon : Lyte.attr('boolean',{default : true}),
			userDetails : Lyte.attr('object',{default:{}}),
			dontShowRemoveIconForSingleField : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropEditableFieldLabelElement : Lyte.attr('boolean',{default : false}), //no i18n
			cxErrorMessage : Lyte.attr('string'), //no i18n
			cxInfoMessage : Lyte.attr('string'), //no i18n
			lyteViewPort : Lyte.attr('boolean',{default : true}),
			propertyJson : Lyte.attr('object')
		};		
	},
	init : function(){
		this.setData('cxPropField',store.peekRecord('field',this.data.cxPropField.id));
		this.setData('lcData',this.$lc);
		if(this.data.cxPropField && this.data.cxPropField.data_type === 'address'){
			this.$node.classList.add('cxPbAddressElementComp');
			let addField = this.data.cxPropField;
			addField.child_fields.forEach((fld)=>{
				if(fld.child_fields){
					fld.child_fields.forEach((cfld)=>{
						cfld.$.set('cxClass','cxPbAddressElemDoubleColField');
						cfld.$.set('cxPropValue','');				
						if(cfld.required){
							this.setData('showRemoveIcon',false);
						}
					});
				}
				fld.$.set('cxPropValue','');				
				if(fld.required){
					this.setData('showRemoveIcon',false);
				}
			});
		}
		if(this.data.$lc.isPreview){
			this.setData("isPreview",true);
			return;
		}
		if(!this.data.cxPropField.customizable_properties || this.data.cxPropField.customizable_properties.length === 0 || (this.data.cxPropField.customizable_properties.length === 1 && this.data.cxPropField.customizable_properties.includes('fixed_position'))){
			this.setData('propertyDisable',true);
		}		
		this.setData('cxPropDisableToolTip',_cruxUtils.getI18n('crm.element.field.properties.disable'));
		let field_restrict = this.data.cxPropField.quick_create_restricted_properties;
		if(field_restrict){
			field_restrict.forEach(action => {
				if(action === "removal"){
					this.setData('showRemoveIcon',false);
				}else if(action === "position"){
					this.$node.classList.add('lytePbRejectDrag');
				}
			  });
		}
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropFieldSpecialMetaKeys", this.cruxPageBuilder.getData("cxPropFieldSpecialMetaKeys"));
		this.setData("cxPropRightPanelDisable", this.cruxPageBuilder.getData("cxPropRightPanelDisable"));
		this.setData("cxPropDataTypeMappingIcons", this.cruxPageBuilder.getData("cxPropDataTypeMappingIcons"));
		this.setData("cxPropEditableFieldLabelElement", this.cruxPageBuilder.getData("cxPropEditableFieldLabelElement"));
		this.setData("propertyJson", this.cruxPageBuilder.getData("propertiesJson")[this.data.cxPropField.data_type]);
		this.setData("moduleName", this.cruxPageBuilder.getData("cxPropModule"));
		this.setData("userDetails", this.cruxPageBuilder.getData("cxPropUserDetails"));
		// if(this.data.cxPropField.data_type === "multiselectpicklist"){
		// 	this.setData('fieldType','multiple');
		// }
		if(this.data.cxPropType !== "quick_create" && this.data.cxPropField.customizable_properties && this.data.cxPropField.customizable_properties.includes('fixed_position')){
			this.$node.classList.add('lytePbRejectDrag');
		}
	},
	didDestroy : function(){
		if(this.data.$lc.isPreview){
			return;
		}
		if(!this.data.isPreview){
			this.cruxPageBuilder.updateFieldList('remove',this.data.cxPropField);
		}
		delete this.cruxPageBuilder;
		Lyte.removeEventListener(this.fieldErrorEventId);
		Lyte.removeEventListener(this.removeActiveClass);
		Lyte.removeEventListener(this.addressFieldChangeEvent);
		Lyte.removeEventListener(this.customDotToolTip);
		Lyte.removeEventListener(this.fieldErrorEventInfoId);
		Lyte.removeEventListener(this.fieldHighlightEventId);
	},
	didConnect : function(){
		if(this.data.$lc.isPreview){
			return;
		}
		// this.setData("cxPropPreviewEnableFields", this.cruxPageBuilder.getData("cxPropPreviewEnableFields"));
		
		
		setTimeout(()=>{
			this.cruxPageBuilder.updateFieldList('add',this.data.cxPropField);
			if(!this.data.isPreview && this.data.cxPropField[this.data.cxPropFieldSpecialMetaKeys.cxMandatory]){
				let cxSecNode = this.$node.closest('crux-page-builder-section');
				if(cxSecNode){
					cxSecNode.checkMandatory(this.data.cxPropField.field_label,true);
				}
			}
			var labelNode = this.$node.querySelector('.cxPbElementLabelInput');
			if(labelNode){
				this.setTitleToInput(labelNode.querySelector('input'),this.data.cxPropField.field_label);
			}
			var draggableElementNode = this.$node.querySelector('.cxPbElementDraggable');
			if(draggableElementNode){
				draggableElementNode.addEventListener('blur',()=>{
					if(event.relatedTarget && event.relatedTarget.classList.contains('cxPbMinusIconWrapper')){
						var mainDiv = event.target,relatedTargetDiv=event.relatedTarget;
						if(relatedTargetDiv){
							relatedTargetDiv.addEventListener('blur',()=>{
								mainDiv.classList.remove('cxPbActiveClass');
							});
						}
						mainDiv.classList.add('cxPbActiveClass');
					}
				});
			}
		},10);

		this.fieldHighlightEventId = Lyte.addEventListener("cxPbFieldHighlight",function(arg){
			if(this.data.cxPropField.id === arg.field_id){
				var titleNode = this.$node.querySelector('.cxPbElementLabel');
				titleNode.classList.add('cxPbElementHighlight');
				setTimeout(()=>{
					titleNode.classList.remove('cxPbElementHighlight');
				},2000)
			}
		}.bind(this));
		this.fieldErrorEventId = Lyte.addEventListener("cxPbEventFieldError",function(arg){
			if(this.data.cxPropField.id === arg.id){
				this.setData('errorProperties',arg.error);
				var func  = arg.error ? Object.keys(arg.error).length ? 'add' : 'remove' : 'remove';
				this.setData('errorProperties',arg.error);
				this.$node.querySelector('.cxPbElementClass').classList[func]('cxPbErrorElement');
			}
		}.bind(this));
		this.removeActiveClass = Lyte.addEventListener("cxPbRemoveActiveClass",function(){
			if(this.$node){
				this.setData("cxPropSetActive", false);
			} 
		}.bind(this));
		this.customDotToolTip = Lyte.addEventListener("cxPbThreeDotToolTip",function(arg){
			if(this.data.cxPropField.id === arg.id){
				this.setData('cxPropDisableToolTip',arg.msg);
			}
		}.bind(this));

		this.fieldErrorEventInfoId = Lyte.addEventListener("cxPbEventInfoErrorFieldEvent",function(arg){
			if(this.data.cxPropField.id === arg.id){
				this.$node.classList.remove('cxPbElementErrorDiv');
				this.$node.classList.remove('cxPbElementInfoDiv');
				this.setData('cxInfoMessage','');
				this.setData('cxErrorMessage','');
				if(arg.type === 'info'){
					this.setData('cxInfoMessage',arg.cxMessage);
					this.$node.classList.add('cxPbElementInfoDiv');
				}else if(arg.type === 'error'){
					this.setData('cxErrorMessage',arg.cxMessage);
					this.$node.classList.add('cxPbElementErrorDiv');
				}
				if(arg.focus){
					this.$node.scrollIntoView();
				}
			}
		}.bind(this));

		this.addressFieldChangeEvent = Lyte.addEventListener("cxPbAddressFieldChangeEvent",function(arg){
			if(this.data.cxPropField.id === arg.id){
				let addField = store.peekRecord('field',arg.id);
				addField.child_fields.forEach((fld)=>{
					if(fld.child_fields){
						fld.child_fields.forEach((cfld)=>{
							if(cfld.required){
								this.setData('showRemoveIcon',false);
							}
						});
					}
					if(fld.required){
						this.setData('showRemoveIcon',false);
					}
				});
			}
		}.bind(this));
	},
	observeField : function(){
		var classNames = "cxPbElementClass cxPbElementDraggable";
		if(this.data.cxPropField.dependent_field){
			classNames += " cxPbElemWithDropdown";
		}
		if(this.data.cxPropType === 'quickcreate' && !this.data.cxPropField[this.data.cxPropFieldSpecialMetaKeys.cxMandatory]){
			classNames += " cxPbElementWithMinus";
		}
		if(this.data.cxPropField.data_type === 'address'){
			classNames += " cxPbAddressElem";
		}
		if(this.data.cxPropRightPanelDisable){
			classNames += " cxPbElementWithMoreIcon";
		}	
		this.setData('elementClassNames',classNames);
	}.observes('cxPropField').on('didConnect'),
	actions : {
		onToolbarClick : function(element,childField){
			if(element.classList.contains('cxPbDisabled')){
				return;
			}
			if(this.getMethods('toolbarClick')){
				this.executeMethod('toolbarClick');
			}
			if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
				this.cruxPageBuilder.executeMethod('cxPbToolBarAction',childField ? childField : this.data.cxPropField,element);
			}
		},
		openProperties : function(event){
			if(this.data.cxPropType === 'quickcreate' || this.cruxPageBuilder.cruxNode.cxCheckAndClosePropperties() === false){
				return;
			}
			if(this.data.cxPropType === 'standard'){
				if(!this.data.cxPropField.customizable_properties || this.data.cxPropField.customizable_properties.length === 0){
					return;
				}
				if(!event.target.closest('crux-page-builder-element-toolbar')){
					Lyte.triggerEvent('cxPbEventOpenPropertiesPanel',{
						cxPropField : this.data.cxPropField,
						isError : this.data.errorProperties
					});
				}
				if(!this.data.cxPropRightPanelDisable){
					this.setData("cxPropSetActive",true);
				}else{
					let active_node = $L(".cxPbActiveElem")[0];
					if(active_node){
						active_node.classList.remove("cxPbActiveElem");
					}	
				}
				
			}else{
				Lyte.triggerEvent('cxPbElemenClick',{
					cxPropField : this.data.cxPropField
				});
			}
		},
		setFieldData : function(obj){
			this.setData('cxPropSetActive', false);
			if (this.data.cxPropField && obj && obj.field && this.data.cxPropField.id === obj.field.id) {
				this.setData('cxPropField', obj.field);
				var specialMetaKeys = this.data.cxPropFieldSpecialMetaKeys || {};
				var isMandatory = specialMetaKeys.cxMandatory && this.data.cxPropField[specialMetaKeys.cxMandatory];
				var sectionNode = this.$node.closest('crux-page-builder-section');
				if (sectionNode && typeof sectionNode.checkMandatory === 'function') {
					sectionNode.checkMandatory(this.data.cxPropField.field_label, !!isMandatory);
				}
			}
		},
		removeField : function(event){
			this.removeField(event);
			
		},
		removeFieldKey : function(event){
			if(event.keyCode === 32)
			{
				this.removeField(event);
				event.preventDefault();
			}	
		}
	},
	removeField : function(){
		var ch = true;
		if(this.cruxPageBuilder.getMethods('cxPbBeforeDeleteField')){
			ch = this.cruxPageBuilder.executeMethod('cxPbBeforeDeleteField',this.data.cxPropField);
		}
		if(ch instanceof Promise){
			ch.then(function(){
				Lyte.triggerEvent('cxPbDeleteElements',{
					name : 'element', 				
					node : this.$node,
					data : this.data.cxPropField
				});
			}.bind(this));
		}else if(ch){
			Lyte.triggerEvent('cxPbDeleteElements',{ 
				name : 'element', 				
				node : this.$node,
				data : this.data.cxPropField
			});
		}
		event.stopPropagation();
	},
	profileChange : function (){
		let profiles = this.data.cxPropField && this.data.cxPropField.profiles;
		let currProf;
		profiles.forEach(ele=>{
			if(this.$lc.currProfId === ele.id && ele.permission_type !== "hidden"){
				currProf = ele;
			}
		});
		if(!currProf){
			this.setData('visible',false);
		}else if(currProf && currProf.permission_type === "read_only"){
			this.setData({'cxPropReadOnly':true,'visible':true});
		}else {
			this.setData({'cxPropReadOnly':false,'visible':true});
		}
		if(this.data.isPreview){
			if(!this.data.visible || this.data.cxPropField.cxPropIsPreviewNotSupported || [116,118].contains(this.data.cxPropField.ui_type)){
				this.$node.classList.add('cxdN');
			}else {
				this.$node.classList.remove('cxdN');
			}
		}
	}.observes('lcData.currProfId').on('init'),
	previewObserve : function(){
		this.setData({'isPreview':this.$lc.isPreview,'currProfId':this.$lc.currProfId});
	}.observes('lcData.isPreview'),
	methods : {
   		fieldLabelChange : async function(comp,value){
   			var errorMessage="";
   			var inputEl = comp.querySelector('input');
   			this.$node.classList.remove('cxPbElementErrorDiv');
   			this.setData('cxErrorMessage',"");
   			this.setTitleToInput(inputEl,value);
   			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.empt'); 
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.splc');
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.sykw');
			} 

			let field_labels = this.cruxPageBuilder.cruxNode.component.field_label_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== this.data.cxPropField.field_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.field.label.dplk');
			}
			if(errorMessage){
				this.setData('cxErrorMessage',errorMessage);
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxPropField.id,errorMessage);
				this.$node.classList.add('cxPbElementErrorDiv');
				return;
			}
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',this.data.cxPropField,'field_label',value,this.data.cxPropField.field_label);
				if(ch &&  typeof ch.then === "function"){
					ch = await ch;
				}
				if(typeof ch === 'object' && ch.type === 'error'){
					this.setData('cxErrorMessage',ch.message);
					this.cruxPageBuilder.cruxNode.component.setError(this.data.cxPropField.id,ch.message);
					this.$node.classList.add('cxPbElementErrorDiv');
					return;
				}
			}
			if(ch){
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxPropField.id);
				this.cruxPageBuilder.updateFieldList('remove',this.data.cxPropField);
				this.data.cxPropField.$.set('field_label',value);
				this.cruxPageBuilder.updateFieldList('add',this.data.cxPropField);
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxPropField,'field_label',value);
				}
				this.setTitleToInput(inputEl,value);
			}
   		}
	// 	toolbarActions : function(action){
	// 		if(action == 'required'){
	// 			this.setData('cxMandatory',!this.data.cxMandatory)
	// 			if(this.data.cxMandatory){
	// 				_cruxUtils.showCustomMessage({params : {ltPropMessage : this.data.cxPropField.field_label+'have been succefully set as mandatory'}})
	// 			}
	// 		}else if(action == 'delete'){
	// 			var ch = true
	// 			if(this.cruxPageBuilder.getMethods('cxPbBeforeDeleteField')){
	// 				ch = this.cruxPageBuilder.executeMethod('cxPbBeforeDeleteField',this.data.cxPropField)
	// 			}
	// 			if(ch instanceof Promise){
	// 				ch.then(function(){
	// 					Lyte.triggerEvent('cxPbDeleteElements',{
	//  		 				name : 'element', 				
	//  		 				node : this.$node,
	//  		 				data : this.data.cxPropField
	//  		 			})
	// 				}.bind(this))
	// 			}else if(ch){
	// 				Lyte.triggerEvent('cxPbDeleteElements',{
 	// 	 				name : 'element', 				
 	// 	 				node : this.$node,
 	// 	 				data : this.data.cxPropField
 	// 	 			})
	// 			}
	// 		}
	// 	}
	}
	// observeRequired : function(){
	// 	this.setData('cxMandatory',this.data.cxPropField[this.data.cxPropFieldSpecialMetaKeys.cxMandatory])
	// }.observes('cxPropField.required')
},{mixins : ["crux-element-validation","crux-page-builder-mixin"]});

/**
 * @syntax staticBuilder
 * <crux-page-builder-element></crux-page-builder-element>
 */

// Lyte.createCustomElement( 'crux-page-builder-section',{
// 	connectedCallback : function(){
// 		if(event && event.type === 'mousemove'){
// 			return ;
// 		}
// 		var element = this;
// 		Lyte.triggerEvent('cxPbAddedElement',{
// 			name : 'section',
// 			node : element
// 		});
// 		var sectionBtn = this.querySelector('.cxPbNewSectionBtn');
// 		let deleteIcon = this.querySelector('.cxPbDeleteIcon');
// 		var deleteBtn = deleteIcon ? deleteIcon.parentElement : null;
// 		this.sectionComp = this.querySelector('lyte-pb-titled-template');

// 		this.mandatoryArray = [];
// 		this.cruxPageBuilder = new CruxCommonBuilder(this.getAttribute('cx-prop-id'));
// 		this.cruxPageBuilder.updateSectionList('add',store.peekRecord('section',this.getAttribute('cx-section-id')));
// 		this.checkMandatory = function(field,mandatory){
// 			if(mandatory && this.mandatoryArray.indexOf(field) === -1){
// 				this.mandatoryArray.push(field);
// 			}else if(!mandatory){
// 				this.mandatoryArray.splice(this.mandatoryArray.indexOf(field),1);
// 			}
// 			if(this.mandatoryArray.length > 0 && deleteBtn){
// 				deleteBtn.classList.add('cxPbDisabled');
// 				deleteBtn.setAttribute('lt-prop-title',"Section Cant be deleted");
// 			}else{
// 				var sec = store.peekRecord('section',this.getAttribute('cx-section-id'));
// 				if(sec && sec.actions_allowed && sec.actions_allowed.delete === false){
// 					return;
// 				}
// 				if(deleteBtn){
// 					deleteBtn.classList.remove('cxPbDisabled');
// 					deleteBtn.setAttribute('lt-prop-title',"");
// 				}
				
// 			}
// 		};

// 		if(sectionBtn){
// 			sectionBtn.addEventListener('click',function(){
// 				Lyte.triggerEvent('cxPbAddElements',{
// 					name : 'section',
// 					node : element
// 				});
// 			}.bind(this));
// 		}

// 		if(deleteBtn){
// 			deleteBtn.addEventListener('click',function(){
// 				if(deleteBtn.classList.contains('cxPbDisabled')){
// 					return;
// 				}
// 				Lyte.triggerEvent('cxPbDeleteElements',{
// 					name : 'section',
// 					node : element
// 				});
// 			});
// 		}
// 	}
// });


Lyte.Component.registerHelper("getBuilderFieldSpecialMetaText",function(field,cxUnique,cxEncrypt,cxPersonal,cxPersonalHealth){
	let disp_text = "";
	if(cxUnique){
		disp_text = "Unique";
	}
	if(cxEncrypt){
		disp_text = disp_text ? `${disp_text}, Encrypted` : "Encrypted";
	}
	if(cxPersonal || cxPersonalHealth){
		disp_text = disp_text ? `${disp_text}, Personal` : "Personal";
	}	
	return disp_text;
});

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

Lyte.Component.register("crux-page-builder-preview", {
_template:"<template tag-name=\"crux-page-builder-preview\"> </template>",
_dynamicNodes : [],
_observedAttributes :["cxPropPreview"],
_observedAttributesType :["boolean"],

	data : function(){
		return {
			cxPropPreview :  Lyte.attr('boolean', {"default" : true}) //NO I18n
		};		
	},
	init : function(){
		this.$lc.set({"cxPropPreview":true});
	}
});

Lyte.Component.register("crux-page-builder-properties", {
_template:"<template tag-name=\"crux-page-builder-properties\"> <template is=\"if\" value=\"{{showModal}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" on-menu-click=\"{{method('fieldActionSelected')}}\" lt-prop-freeze=\"false\" lt-prop-query=\"#fieldPropertyActions\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbPreventPropertiesPanelClose\"> <template is=\"for\" items=\"{{cxPropFieldPropertiesActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.value}}\"> <lyte-menu-label>{{item.name}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-modal lt-prop-wrapper-class=\"cxPbPropertiesModal\" lt-prop-overlay-close=\"true\" lt-prop-height=\"calc(100% - 50px)\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromRight&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;50px&quot;,&quot;right&quot;:&quot;0&quot;}\" lt-prop-aria=\"true\" lt-prop-allow-multiple=\"true\" lt-prop-width=\"360px\" on-before-show=\"{{method('beforeShow')}}\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method('modalClose')}}\" on-before-close=\"{{method('onBeforeModalClose')}}\" on-show=\"{{method('modalShow')}}\" lt-prop-dimmer=\"{&quot;opacity&quot;:&quot;0&quot;}\" lt-prop-show=\"{{propertiesPanelShow}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div class=\"cxFlex cxAlignItemsCenter cxPbModalHeaderWrap\"> <div class=\"cxPbModalHeaderFLabel cxFlex cxAlignItemCenter\"> <lyte-text lt-prop-value=\"{{cxPropField.display_label}}\"></lyte-text> </div> <div class=\"cxFlex cxAlignItemsCenter\"> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <span class=\"cxPbModalActionIconsWrap {{if(cxPropDisableFieldPropActions,'disableclass')}}\" id=\"fieldPropertyActions\" lt-prop-title=\"{{if(cxPropDisableFieldPropActions,cxPropFieldPropActionsToolTip)}}\"> <i class=\"cxPbMoreIcon\"></i> </span> </template></template> <span class=\"cxPbModalActionIconsWrap\" onclick=\"{{action('closeProperties')}}\"> <i class=\"cxPbSprite cxPbCloseIcon\"></i> </span> </div> </div> </lyte-modal-header> <lyte-modal-content> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> </template><template case=\"false\"> <lyte-tabs class=\"cxPbPropModalTab\" lt-prop=\"{&quot;height&quot; : &quot;100%&quot; }\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <lyte-tab-title lt-prop-id=\"tabsProperties\">Properties</lyte-tab-title> </template></template> <template is=\"if\" value=\"{{expHandlers(cxHidePermissions,'!')}}\"><template case=\"true\"> <lyte-tab-title lt-prop-id=\"tabsPermission\">Permissions</lyte-tab-title> </template></template> <template is=\"for\" items=\"{{cxPropExtraDefinitions}}\" item=\"item\" index=\"index\"> <lyte-tab-title lt-prop-id=\"tabs{{index}}\">{{item.cxHeader}}</lyte-tab-title> </template> </lyte-tab-head> <lyte-tab-body> <template is=\"if\" value=\"{{expHandlers(cxHideProperties,'!')}}\"><template case=\"true\"> <lyte-tab-content id=\"tabsProperties\"> <template items=\"{{propertiesJson}}\" item=\"item\" index=\"index\" is=\"for\"><div> <div class=\"{{if(checkVisibleProperty(item.cxPropProperties,triggerVisiblity),'','dN ')}}\"> <template is=\"if\" value=\"{{item.cxPropLabel}}\"><template case=\"true\"><div data-cy=\"{{item.cxPropLabel}}\" class=\"cxPbFormHeading\"> {{item.cxPropLabel}} </div></template></template> <template items=\"{{item.cxPropProperties}}\" item=\"prop\" index=\"index\" is=\"for\"><div> <crux-page-builder-property-header cx-prop-property=\"{{cruxClone(prop)}}\" cx-prop-field=\"{{cxPropField}}\" property-changed=\"{{method('propertyValueChange')}}\" error-property=\"{{method('errorInProperty')}}\" cx-prop-id=\"{{cxPropId}}\" piclikist-setting-option-clicked=\"{{method('piclikistSettingOptionClickedFn')}}\" trigger-visiblity=\"{{lbind(triggerVisiblity)}}\" lookup-property-modal-clicked=\"{{method('lookupPropertyModalClickedFn')}}\" data-cy=\"{{prop.api_name}}\"></crux-page-builder-property-header> </div></template> </div> </div></template> <lyte-button lt-prop-disabled=\"{{if(cruxOr(cxPropField[cxPropFieldSpecialMetaKeys.cxMandatory],negate(showRemoveField)),true,false)}}\" lt-prop-title=\"{{if(negate(showRemoveField),mandatoryDisableTooltip,'')}}\" lt-prop-appearance=\"failure\" onclick=\"{{action('removeField')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Remove Field </template> </lyte-button> </lyte-tab-content> </template></template> <template is=\"if\" value=\"{{expHandlers(cxHidePermissions,'!')}}\"><template case=\"true\"> <lyte-tab-content id=\"tabsPermission\"> <crux-permission-list cx-prop-field=\"{{cxPropField}}\" class=\"cxPbPermListComp\" cx-prop-field-profiles=\"{{cxPropField.profiles}}\" cx-prop-value=\"{{cxPropField.profiles}}\" cx-prop-profiles=\"{{cxPropProfiles}}\" on-before-profile-permission-select=\"{{method('beforeProfilePermissionSelect')}}\" on-profile-permission-changed=\"{{method('profilePermissionChanged')}}\"></crux-permission-list> </lyte-tab-content> </template></template> <template is=\"for\" items=\"{{cxPropExtraDefinitions}}\" item=\"item\" index=\"index\"> <lyte-tab-content id=\"tabs{{index}}\"> <lyte-yield yield-name=\"{{item.cxYieldName}}\"></lyte-yield> </lyte-tab-content> </template> </lyte-tab-body> </template> </lyte-tabs> </template></template> </lyte-modal-content> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{showPreview}}\"><template case=\"true\"> <lyte-popover lt-prop-show=\"{{showPreview}}\" lt-prop-origin-elem=\"#cruxBuilderFieldPreview_{{cxPropField.id}}\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method(&quot;closePreviewPopup&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <div class=\"tooltip_cnt\" style=\"max-height: 251.375px; overflow: auto;\"> <lyte-popover-content> <div> {{cxPropField.field_label}}</div> <crux-field cx-prop-field=\"{{cxPropField}}\" cx-prop-appearance=\"box\" cx-prop-field-key=\"undefined\" cx-prop-align-label=\"horizontal\"></crux-field> </lyte-popover-content> </div> </template> </lyte-popover> </template></template> <template is=\"if\" value=\"{{picklistSettingsModal}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbPicklistSettingsModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"764px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{picklistSettingsModalHeader}}</lyte-modal-header> <lyte-modal-content> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','reference_values')}}\"><template case=\"true\"> <div class=\"cxPbPropActionModalContent\"> {{cruxGetI18n('crm.picklist.reference.info')}} <span onclick=\"{{action('helpLinkClicked','picklist_reference_values')}}\">{{cruxGetI18n('crm.login.learn.more')}}</span> </div> <div class=\"cxPbPropNote\"> <b>Note:</b> Changes made to reference values will be affected to all the layouts. </div> <lyte-table lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th> {{list.name}} </lyte-th> <lyte-th> {{list.name}} </lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"for\" items=\"{{picklistJson}}\" item=\"list\" index=\"indexVal\"> <lyte-tr> <lyte-td><lyte-input lt-prop-appearance=\"box\" lt-prop-width=\"100%\" lt-prop-disabled=\"true\" lt-prop-value=\"{{list.display_value}}\"> </lyte-input></lyte-td> <lyte-td><lyte-input lt-prop-appearance=\"box\" lt-prop-width=\"100%\" lt-prop-value=\"{{lbind(list.reference_value)}}\"> </lyte-input></lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','bulk_option')}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"textarea\" lt-prop-height=\"485px\" lt-prop-width=\"100%\" lt-prop-text-area-resize=\"{&quot;horizontal&quot; : true, &quot;vertical&quot; : false }\" lt-prop-placeholder=\"{{cruxGetI18n('crm.picklist.textarea.msg')}}\" lt-prop-value=\"{{lbind(picklistBulkOptionValue)}}\"></lyte-input> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','unused_values')}}\"><template case=\"true\"> <ul> <template is=\"for\" items=\"{{picklistUnusedValues}}\" item=\"item\" index=\"index\"> <li> <lyte-checkbox lt-prop-label=\"{{item.actual_value}}\" on-changed=\"{{method('unusedOptionsChecked',item)}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{ifEquals(picklistUnusedOptionItemsChecked.length,picklistUnusedValues.length)}}\"></lyte-checkbox> </li> </template> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','predefined_options')}}\"><template case=\"true\"> <div class=\"cxPbPlPreOptModalCont\"> <ul class=\"cxPbPlPreOptModalLeftCont\"> <template is=\"for\" items=\"{{picklistPredefinedOption}}\" item=\"item\" index=\"index\"> <li class=\"cxPbPlPreOptModalLeftContItem\" onclick=\"{{action('piclistPredefinedOptionsTitleClicked',item)}}\">{{item.cxPropTitle}}</li> </template> </ul> <ul class=\"cxPbPlPreOptModalRightCont\"> <li class=\"cxPbPlPreOptModalRightContItem cxPbPinned\"> <lyte-checkbox lt-prop-label=\"Select All\" on-changed=\"{{method('prefidenedChecked','select_all')}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{ifEquals(picklistPredefinedOptionItemsChecked.length,picklistPredefinedOptionItems.length)}}\"></lyte-checkbox> </li> <li class=\"cxPbPlPreOptModalRightNestedCont\"> <ul> <template is=\"for\" items=\"{{picklistPredefinedOptionItems}}\" item=\"item\" index=\"index\"> <li class=\"cxPbPlPreOptModalRightContItem\"> <lyte-checkbox lt-prop-label=\"{{item}}\" lt-prop-checked=\"{{cruxContains(picklistPredefinedOptionItemsChecked,item,picklistPredefinedOptionItemsChecked.length)}}\" lt-prop-prevent-callback-observers=\"true\" on-changed=\"{{method('prefidenedChecked',item)}}\"></lyte-checkbox> </li> </template> </ul> </li> </ul> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','convert_global')}}\"><template case=\"true\"> <p class=\"cxPbPropActionModalContent\">{{cruxGetI18n('mb.globalfield.convertWarning1')}}</p> <div class=\"cxPbPropNote\">{{cruxGetI18n('mb.globalfield.convertWarning2')}}</div> <div class=\"cxPbPropPlGlobalFormField\"> <span class=\"cxPbPropPlGlobalFormLabel\"> {{cruxGetI18n('globalfield.label.name')}} </span> <lyte-input lt-prop-width=\"100%\" lt-prop-value=\"{{lbind(globalPicklistName)}}\" lt-prop-appearance=\"box\"></lyte-input> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','replace_values')}}\"><template case=\"true\"> <p class=\"cxPbPropActionModalContent\">{{cruxGetI18n('picklist.replace.info')}}</p> <div class=\"cxPbPropPlReplaceForm\"> <div class=\"cxPbPropPlReplaceFormFld\"> <span class=\"cxPbPropPlReplaceFormFldLabel\">{{cruxGetI18n('crm.replace.picklist.originalStr')}}</span> <crux-dropdown cx-prop-options=\"{{picklistJson}}\" cx-prop-user-value=\"actual_value\" cx-prop-system-value=\"actual_value\" cx-prop-type=\"single\" on-option-select=\"{{method('picklistReplaceOriginalSelect')}}\"></crux-dropdown> </div> <div class=\"cxPbPropPlReFormSwapIconWrap cxFlexCenter\"> <i class=\"cxPbSprite cxPbMoveIcon cxPbPropPlSwapIcon\"></i> </div> <div class=\"cxPbPropPlReplaceFormFld\"> <span class=\"cxPbPropPlReplaceFormFldLabel\">{{cruxGetI18n('crm.replace.picklist.replaceStr')}}</span> <crux-dropdown cx-prop-options=\"{{replacePicklistJson}}\" cx-prop-user-value=\"actual_value\" cx-prop-system-value=\"actual_value\" cx-prop-type=\"single\" on-option-select=\"{{method('picklistReplaceReplaceSelect')}}\"></crux-dropdown> </div> </div> <ul class=\"cxPbPropNote cxPbPlReplaceModalNote\"> <li>{{cruxGetI18n('crm.picklist.replace.info1')}}{{cruxGetI18n('crm.picklist.replace.info2')}}</li> <li>{{cruxGetI18n('crm.picklist.replace.info3')}}</li> <li>{{cruxGetI18n('crm.picklist.replace.info5')}}</li> </ul> </template></template> <template is=\"if\" value=\"{{expHandlers(picklistSettingOption,'==','history_tracking')}}\"><template case=\"true\"> <div> {{cruxGetI18n('crm.picklist.tracker.label.name')}} <lyte-input lt-prop-value=\"{{lbind(picklistTrackingRelatedName)}}\" lt-prop-appearance=\"box\"></lyte-input> {{cruxGetI18n('crm.picklist.tracker.sc.label')}} <span> {{cruxGetI18n('crm.smartfilter.picklist.options.msg')}} </span> <crux-column-list cx-prop-fields=\"{{picklistTrackingFields}}\" cx-prop-selected-fields=\"{{picklistTrackingSelectedFields}}\" cx-prop-id=\"picklistTracking\"></crux-column-list> </div> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closePicklistSeetingModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('picklistSettingModalSave')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{picklistSettingModalSaveButtonTitle}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{lookupPropertyModal}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbLookupSettingModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"764px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" on-show=\"{{method('lookupPropertyModalShowMt')}}\" lt-prop-allow-multiple=\"true\" on-close=\"{{method('lookupPropertyModalCloseMt')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> {{lookupPropertyModalTitle}} <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','field_of_lookup')}}\"><template case=\"true\"> <div class=\"cxPbFieldOfLookupHeader\"> <div>{{cruxGetI18n('crm.customfield.lookup.relatedfield.addmsg')}}</div> <lyte-button lt-prop-appearance=\"primary\" lt-prop-class=\"cxPbFieldOfLookupBtn outlineprimary\" onclick=\"{{action('addFieldOfLookupFields')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.customfield.lookup.relatedfield.addfieldbutton')}} </template> </lyte-button> </div> </template></template> </lyte-modal-header> <lyte-modal-content class=\"{{if(expHandlers(lookupPropertyModalOption,'==','field_of_lookup'),'cxPbFldLookupModalContent','')}}\"> <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','lookup_filter')}}\"><template case=\"true\"> <div class=\"cxPbModalCriteria\"></div> </template></template> <template is=\"if\" value=\"{{expHandlers(lookupPropertyModalOption,'==','field_of_lookup')}}\"><template case=\"true\"> <div class=\"cxPbFieldOfLookup\"> <lyte-table lt-prop-yield=\"true\" class=\"cxPbFieldOfLookupTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.fieldsadded',relatedModule.singular_label)}}</lyte-th> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.relatedas')}}</lyte-th> <lyte-th>{{cruxGetI18n('crm.customfield.lookup.relatedfield.fieldsadded',cxPropModule.singular_label)}}</lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"if\" value=\"{{expHandlers(fieldOfLookupSelectedFieldsList.length,'==',0)}}\"><template case=\"true\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"2\"><table><tbody> <tr><td colspan=\"3\" class=\"cxPbFldLookupTableNoRecord\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.emptylist')}}</td></tr> </tbody></table></template></template> </template><template case=\"false\"> <template is=\"for\" items=\"{{fieldOfLookupSelectedFieldsList}}\" item=\"item\" index=\"index\"> <lyte-tr> <lyte-td>{{item.fieldOfLookupPrimaryFieldsSelectedObj.label}}</lyte-td> <lyte-td>{{item.fieldOfLookupMappingSelected.relation_type}}</lyte-td> <lyte-td>{{item.primary_field_label}}</lyte-td> </lyte-tr> </template> </template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </div> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"cxPbFldLookupModalFooter {{if(expHandlers(lookupPropertyModalOption,'==','lookup_filter'),'cxPbLkupFltrModalFooter','')}}\"> <span class=\"cxPbFldLookupMsg\"><span class=\"cxPbDefaultSprite cxPbFldLookupInfoIcon\"></span>{{cruxGetI18n('crm.customfield.lookup.relatedfield.info')}}</span> <span> <lyte-button onclick=\"{{action('closeLookupPropertyModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveLookupPropertyModal',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{saveLookupPropertyModalLabel}} </template> </lyte-button> </span> </lyte-modal-footer> </template> </lyte-modal> </template></template> <template is=\"if\" value=\"{{fieldOfLookupFieldAdd}}\"><template case=\"true\"> <lyte-modal lt-prop-show-close-button=\"false\" class=\"cxPbFieldOfLookupModal\" lt-prop-wrapper-class=\"cxPbPropActionModal\" lt-prop-width=\"664px\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-allow-multiple=\"true\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{cruxGetI18n('crm.label.subform.addField')}}</lyte-modal-header> <lyte-modal-content> <div class=\"cxPbFldLookupFormRow\"> <span class=\"cxPbFldLookupFormLabel\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.chooselookupfield',relatedModule.singular_label)}}</span> <div class=\"cxPbFldLookupFormValue\"> <crux-dropdown cx-prop-options=\"{{fieldOfLookupPrimaryFields}}\" cx-prop-selected=\"{{lbind(fieldOfLookupPrimaryFieldsSelected)}}\" cx-prop-user-value=\"label\" cx-prop-system-value=\"fieldId\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"single\" on-option-select=\"{{method('lookupFieldSelection')}}\"></crux-dropdown> </div> </div> <div class=\"cxPbFldLookupFormRow\"> <div class=\"cxPbFldLookupFormValue\"> <div class=\"cxMappingTypeWrapper\"> <label class=\"cxPbFldLookupFormLabel\">Mapping type</label> <lyte-radiobutton-group lt-prop-name=\"mappingType\" lt-prop-type=\"default\" lt-prop-value=\"{{lbind(fieldOfLookupMappingSelected)}}\" lt-prop-options=\"{{fieldOfLookupMappingOptions}}\" lt-prop-user-value=\"name\" lt-prop-system-value=\"value\" lt-prop-selected=\"{{lbind(fieldOfLookupMappingSelected)}}\" lt-prop-disabled-list=\"{{if(fieldOfLookupMappingDisabled,fieldOfLookupMappingDisabledOptions,)}}\" lt-prop-alignment=\"horizontal\"> </lyte-radiobutton-group> </div> </div> </div> <div class=\"cxPbFldLookupFormRow\"> <template is=\"if\" value=\"{{expHandlers(fieldOfLookupMappingSelected.value,'==','new_field')}}\"><template case=\"true\"> <span class=\"cxPbFldLookupFormLabel\">Field Label</span> <div class=\"cxPbFldLookupFormValue\"> <lyte-input lt-prop-width=\"100%\" lt-prop-type=\"text\" lt-prop-name=\"fieldLabel\" lt-prop-placeholder=\"Field Name\" lt-prop-value=\"{{primary_field_label}}\" lt-prop-disabled=\"{{fieldOfLookupSecondaryDisabled}}\" lt-prop-required=\"{{expHandlers(ltPropMappingType,'===','add_new')}}\"> </lyte-input> </div> </template><template case=\"false\"> <span class=\"cxPbFldLookupFormLabel\">{{cruxGetI18n('crm.customfield.lookup.relatedfield.sync.option2.label')}}</span> <div class=\"cxPbFldLookupFormValue\"> <crux-dropdown cx-prop-options=\"{{fieldOfLookupSecondaryFields}}\" cx-prop-user-value=\"label\" cx-prop-system-value=\"fieldId\" cx-prop-icon-class=\"dropdown\" cx-prop-no-result-message=\"No Result Found\" cx-prop-position=\"down\" cx-prop-type=\"single\" cx-prop-disabled=\"{{fieldOfLookupSecondaryDisabled}}\" cx-prop-selected=\"{{lbind(fieldOfLookupSecondarySelected)}}\"></crux-dropdown> </div> </template></template> </div> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('closeFieldOfLookupFieldAddModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveFieldOfLookupFieldAddModal',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.save')}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </template></template> <lyte-alert> </lyte-alert> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"for","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"for","position":[0,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"for","position":[3,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"text","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,0]},{"type":"componentDynamic","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},{"type":"attr","position":[1,3,1,1]},{"type":"componentDynamic","position":[1,3,1,1]},{"type":"attr","position":[1,3,3,1,1]},{"type":"for","position":[1,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[3,9]},{"type":"if","position":[3,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]},{"type":"text","position":[5,1,1]},{"type":"attr","position":[5,3]},{"type":"componentDynamic","position":[5,3]}]}},"default":{}},{"type":"attr","position":[3,11]},{"type":"if","position":[3,11],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,1,1,0]},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"text","position":[3,5,1,0]},{"type":"attr","position":[3,5,3]},{"type":"componentDynamic","position":[3,5,3]},{"type":"text","position":[5,1,0]},{"type":"text","position":[5,1,1]},{"type":"text","position":[5,3,0]},{"type":"text","position":[5,5,0]}]}},"default":{}},{"type":"attr","position":[3,13]},{"type":"if","position":[3,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5]},{"type":"text","position":[1,7,1]},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1,9]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1,0]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"text","position":[1,1,1,3,0]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"text","position":[1,1,1,5,0]},{"type":"componentDynamic","position":[1,1,1,5]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,0]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,1,1]},{"type":"attr","position":[5,3,1]},{"type":"registerYield","position":[5,3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3,1]},{"type":"attr","position":[5,3,3]},{"type":"registerYield","position":[5,3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,1,0]},{"type":"attr","position":[3,1,3,1]},{"type":"componentDynamic","position":[3,1,3,1]},{"type":"attr","position":[3,3,1,1,3]},{"type":"componentDynamic","position":[3,3,1,1,3]},{"type":"attr","position":[3,5,1]},{"type":"if","position":[3,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[11]}],
_observedAttributes :["cxPropExtraDefinitions","cxPropField","cxPropFieldPropertyJson","inputFieldObj","inputFieldObj1","dropdownOption","statusOption","customTaxJson","picklistJson","unusedFieldsJson","propertiesJson","primary_field_label","cxPropRules","cxPropProfiles","selectedProfiles","profilesReadWrite","profilesReadOnly","profileOption","cxPropSectionModelName","showModal","picklistPredefinedOption","cxPropFieldPropertiesActions","cxPropDisableFieldPropActions","cxPropFieldPropActionsToolTip","picklistPredefinedOptionItems","picklistPredefinedOptionItemsChecked","picklistBulkOptionValue","triggerVisiblity","fieldOfLookupMappingOptions","fieldOfLookupMappingSelected","folAssociation","fieldOfLookupMappingDisabled","fieldOfLookupSelectedFieldsList","fieldOfLookupMappingDisabledOptions","fieldOfLookupSecondaryDisabled","fieldOfLookupPrimaryFieldsSelected","fieldOfLookupSecondarySelected","fieldOfLookupUserValue","fieldOfLookupSystemValue","cxPropModule","relatedModule","cxPropFieldSpecialMetaKeys","mandatoryDisableTooltip"],
_observedAttributesType :["array","object","object","object","object","array","array","array","array","array","array","string","array","array","array","array","array","boolean","string","boolean","array","array","boolean","string","array","array","string","boolean","array","object","array","boolean","array","array","boolean","string","string","string","string","object","object","object","string"],

	data : function(){
		var dataArr = [{"name":"normal","value":"Normal"},{"name":"small","value":"Small"}];  //no I18n
		var stautusArr = [{"name":"Closed Lost","value":"closed_lost"}];  //no I18n
		return {
			cxPropExtraDefinitions : Lyte.attr('array',{default : []}), //no I18n
			cxPropField : Lyte.attr('object',{default : {}}), //no i18n
			cxPropFieldPropertyJson : Lyte.attr('object'),
			inputFieldObj: Lyte.attr('object', {'default': {"field_label":"First name","required":true} }), //no I18n
			inputFieldObj1: Lyte.attr('object', {'default': {"field_label":"First www"} }), //no I18n
			dropdownOption: Lyte.attr('array', { default: dataArr }), //no I18n
			statusOption: Lyte.attr('array', { default: stautusArr }), //no I18n
			customTaxJson : Lyte.attr( 'array' , { default : [ //no I18n
					{ tax : 'VAT' , value : '20' }, //no I18n
					{ tax : 'Sales Tax' , value : '20' }, //no I18n
					{ tax : 'Sales Tax1' , value : '20' } //no I18n
			] } ),
			picklistJson: Lyte.attr('array'),
			unusedFieldsJson: Lyte.attr( 'array' , { default : [ //no I18n
				{ name:"Closed-Lost to competition to to competition",probability:"39",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Value Proposition",probability:"20",dealCategory:"Closed Won",forecastCategory:"Closed"}, //no I18n
				{ name:"Identify Decision Makers",probability:"43",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Proposal/Price Quote",probability:"44",dealCategory:"Open",forecastCategory:"Pipeline"}, //no I18n
				{ name:"Negative Review",probability:"55",dealCategory:"Closed Won",forecastCategory:"Closed"} //no I18n
			]}),
			propertiesJson : Lyte.attr('array'),
			primary_field_label: Lyte.attr('string', {default : ''}),
			cxPropRules : Lyte.attr('array', {default : [{name : 'Layout'}, {name : 'Validation'}]}),
			cxPropProfiles : Lyte.attr('array'),
			selectedProfiles : Lyte.attr('array',{default : []}),
			profilesReadWrite : Lyte.attr('array',{default : []}),
			profilesReadOnly : Lyte.attr('array',{default : []}),
			profileOption : Lyte.attr('boolean', {default : false}),
			cxPropSectionModelName : Lyte.attr('string'), //no i18n
			showModal : Lyte.attr('boolean',{default : false}),
			picklistPredefinedOption : Lyte.attr('array',{default :
				[{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.days.of.the.week"),
					"cxPropOptions":[_cruxUtils.getI18n("Sunday"),_cruxUtils.getI18n("Monday"),_cruxUtils.getI18n("Tuesday"),_cruxUtils.getI18n("Wednesday"),_cruxUtils.getI18n("Thursday"),_cruxUtils.getI18n("Friday")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.month.of.the.year"),
					"cxPropOptions":[_cruxUtils.getI18n("January"),_cruxUtils.getI18n("February"),_cruxUtils.getI18n("March"),_cruxUtils.getI18n("April"),_cruxUtils.getI18n("May"),_cruxUtils.getI18n("June"),_cruxUtils.getI18n("July"),_cruxUtils.getI18n("August"),_cruxUtils.getI18n("September"),_cruxUtils.getI18n("October"),_cruxUtils.getI18n("November"),_cruxUtils.getI18n("December")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.time.zones"),
					"cxPropOptions":["(-12:00) International Date Line","(-11:00) Midway Island, Samoa","(-10:00) Hawaii","(-9:00) Alaska","(-8:00) Pacific","(-7:00) Mountain","(-6:00) Central","(-5:00) Eastern","(-4:30) Venezuela","(-4:00) Atlantic","(-3:30) Newfoundland","(-3:00) Brasilia, Buenos Aires, Georgetown","(-2:00) Mid-Atlantic","(-1:00) Azores, Cape Verde Isles","(0:00) Dublin, London, Monrovia, Casablanca","(+1:00) Paris, Madrid, Athens, Berlin, Rome","(+2:00) Eastern Europe, Harare, Pretoria, Israel","(+3:00) Moscow, Baghdad, Kuwait, Nairobi","(+3:30) Tehran","(+4:00) Abu Dhabi, Muscat, Tbilisi, Kazan","(+4:30) Kabul","(+5:00) Islamabad, Karachi, Ekaterinburg","(+5:30) Bombay, Calcutta, Madras, New Delhi","(+6:00) Almaty, Dhaka","(+7:00) Bangkok, Jakarta, Hanoi","(+8:00) Beijing, Hong Kong, Perth, Singapore","(+9:00) Tokyo, Osaka, Sapporo, Seoul, Yakutsk","(+9:30) Adelaide, Darwin","(+10:00) Sydney, Guam, Port Moresby, Vladivostok","(+11:00) Magadan, Solomon Isles, New Caledonia","(+12:00) Fiji, Marshall Isles, Wellington, Auckland"]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.us.state"),
					"cxPropOptions":[_cruxUtils.getI18n("Alabama"),_cruxUtils.getI18n("Alaska"),_cruxUtils.getI18n("Arizona"),_cruxUtils.getI18n("Arkansas"),_cruxUtils.getI18n("California"),_cruxUtils.getI18n("Colorado"),_cruxUtils.getI18n("Connecticut"),_cruxUtils.getI18n("Delaware"),_cruxUtils.getI18n("Florida"),_cruxUtils.getI18n("Georgia And The South Sandwich Islands"),_cruxUtils.getI18n("Hawaii"),_cruxUtils.getI18n("Idaho"),_cruxUtils.getI18n("Illinois"),_cruxUtils.getI18n("Indiana/Indianapolis"),_cruxUtils.getI18n("Iowa"),_cruxUtils.getI18n("Kansas"),_cruxUtils.getI18n("Kentucky/Louisville"),_cruxUtils.getI18n("Louisiana"),_cruxUtils.getI18n("Maine"),_cruxUtils.getI18n("Maryland"),_cruxUtils.getI18n("Massachusetts"),_cruxUtils.getI18n("Michigan"),_cruxUtils.getI18n("Minnesota"),_cruxUtils.getI18n("Mississippi"),_cruxUtils.getI18n("Missouri"),_cruxUtils.getI18n("Montana"),_cruxUtils.getI18n("Nebraska"),_cruxUtils.getI18n("Nevada"),_cruxUtils.getI18n("New Hampshire"),_cruxUtils.getI18n("New Jersey"),_cruxUtils.getI18n("New Mexico"),_cruxUtils.getI18n("New York"),_cruxUtils.getI18n("North Carolina"),_cruxUtils.getI18n("North Dakota"),_cruxUtils.getI18n("Ohio"),_cruxUtils.getI18n("Oklahoma"),_cruxUtils.getI18n("Oregon"),_cruxUtils.getI18n("Pennsylvania"),_cruxUtils.getI18n("Rhode Island"),_cruxUtils.getI18n("South Carolina"),_cruxUtils.getI18n("South Dakota"),_cruxUtils.getI18n("Tennessee"),_cruxUtils.getI18n("Texas"),_cruxUtils.getI18n("Utah"),_cruxUtils.getI18n("Vermont"),_cruxUtils.getI18n("Virginia"),_cruxUtils.getI18n("Washington"),_cruxUtils.getI18n("West Virginia"),_cruxUtils.getI18n("Wisconsin"),_cruxUtils.getI18n("Wyoming")]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.continents"),
					"cxPropOptions":["Asia", "North America", "South America", "Africa", "Antarctica", "Australia", "Europe"]
				},{
					"cxPropTitle":_cruxUtils.getI18n("crm.label.regions"),
					"cxPropOptions":[_cruxUtils.getI18n("Afghanistan-Asia/Kabul"),_cruxUtils.getI18n("Albania-Europe/Tirane"),_cruxUtils.getI18n("Algeria-Africa/Algiers"),_cruxUtils.getI18n("American Samoa"),_cruxUtils.getI18n("Andorra"),_cruxUtils.getI18n("Angola"),_cruxUtils.getI18n("Anguilla"),_cruxUtils.getI18n("Antarctica"),_cruxUtils.getI18n("Antigua and Barbuda"),_cruxUtils.getI18n("Argentina-AGT"),_cruxUtils.getI18n("Armenia-Asia/Yerevan"),_cruxUtils.getI18n("/Aruba"),_cruxUtils.getI18n("Australia-ACT"),_cruxUtils.getI18n("Austria-Europe/Vienna"),_cruxUtils.getI18n("Azerbaijan-Asia/Baku"),_cruxUtils.getI18n("Bahamas"),_cruxUtils.getI18n("Bahrain-Asia/Bahrain"),_cruxUtils.getI18n("Bangladesh"),_cruxUtils.getI18n("Barbados"),_cruxUtils.getI18n("Belarus-Europe/Minsk"),_cruxUtils.getI18n("BelgiumDutch"),_cruxUtils.getI18n("BelgiumFrench"),_cruxUtils.getI18n("Belize"),_cruxUtils.getI18n("Benin"),_cruxUtils.getI18n("Bermuda"),_cruxUtils.getI18n("Bhutan"),_cruxUtils.getI18n("Bolivia-America/La_Paz"),_cruxUtils.getI18n("Bosnia and Herzegovina"),_cruxUtils.getI18n("Botswana-Africa/Gaborone"),_cruxUtils.getI18n("Bouvet Island"),_cruxUtils.getI18n("Brazil-America/Araguaina"),_cruxUtils.getI18n("British Indian Ocean Territory"),_cruxUtils.getI18n("British Virgin Islands"),_cruxUtils.getI18n("Brunei-Asia/Brunei"),_cruxUtils.getI18n("Bulgaria-Europe/Sofia"),_cruxUtils.getI18n("Burkina Faso"),_cruxUtils.getI18n("Burundi"),_cruxUtils.getI18n("Cambodia"),_cruxUtils.getI18n("Cameroon"),_cruxUtils.getI18n("CanadaEnglish"),_cruxUtils.getI18n("CanadaFrench"),_cruxUtils.getI18n("Cape Verde"),_cruxUtils.getI18n("Cayman Islands"),_cruxUtils.getI18n("Central African Republic"),_cruxUtils.getI18n("Chad"),_cruxUtils.getI18n("Chile-America/Santiago"),_cruxUtils.getI18n("China"),_cruxUtils.getI18n("Christmas Island"),_cruxUtils.getI18n("Cocos Islands"),_cruxUtils.getI18n("Colombia-America/Bogota"),_cruxUtils.getI18n("Comoros"),_cruxUtils.getI18n("Congo"),_cruxUtils.getI18n("Cook Islands"),_cruxUtils.getI18n("Costa Rica-America/Costa_Rica"),_cruxUtils.getI18n("Croatia-Europe/Zagreb"),_cruxUtils.getI18n("Cuba"),_cruxUtils.getI18n("Cyprus"),_cruxUtils.getI18n("Czech Republic-Europe/Prague"),_cruxUtils.getI18n("dIvoire"),_cruxUtils.getI18n("Denmark-Europe/Copenhagen"),_cruxUtils.getI18n("Democratic Republic of the Congo"),_cruxUtils.getI18n("Djibouti-Africa/Djibouti"),_cruxUtils.getI18n("Dominican Republic-America/Santo_Domingo"),_cruxUtils.getI18n("Ecuador-America/Guayaquil"),_cruxUtils.getI18n("Egypt-Africa/Cairo"),_cruxUtils.getI18n("El Salvador-America/El_Salvador"),_cruxUtils.getI18n("Equatorial Guinea"),_cruxUtils.getI18n("Eritrea-Africa/Asmera"),_cruxUtils.getI18n("Estonia-Europe/Tallinn"),_cruxUtils.getI18n("Ethiopia-Africa/Addis_Ababa"),_cruxUtils.getI18n("Falkland Islands"),_cruxUtils.getI18n("Faroe Islands-Atlantic/Faeroe"),_cruxUtils.getI18n("Fiji"),_cruxUtils.getI18n("Finland-Europe/Helsinki"),_cruxUtils.getI18n("France-ECT"),_cruxUtils.getI18n("French Guiana"),_cruxUtils.getI18n("French Polynesia"),_cruxUtils.getI18n("French Southern Territories"),_cruxUtils.getI18n("Gabon"),_cruxUtils.getI18n("Gambia"),_cruxUtils.getI18n("Germany-Europe/Berlin"),_cruxUtils.getI18n("Ghana"),_cruxUtils.getI18n("Gibraltar"),_cruxUtils.getI18n("Greece-Europe/Athens"),_cruxUtils.getI18n("Greenland-America/Danmarkshavn"),_cruxUtils.getI18n("Grenada"),_cruxUtils.getI18n("Guadeloupe"),_cruxUtils.getI18n("Guam"),_cruxUtils.getI18n("Guatemala-America/Guatemala"),_cruxUtils.getI18n("Guinea-Bissau"),_cruxUtils.getI18n("Guyana"),_cruxUtils.getI18n("Haiti"),_cruxUtils.getI18n("Honduras-America/Tegucigalpa"),_cruxUtils.getI18n("Hungary-Europe/Budapest"),_cruxUtils.getI18n("Iceland-Atlantic/Reykjavik"),_cruxUtils.getI18n("Indonesia-Asia/Jakarta"),_cruxUtils.getI18n("Iran-Asia/Tehran"),_cruxUtils.getI18n("Iraq-Asia/Baghdad"),_cruxUtils.getI18n("Ireland-Eire"),_cruxUtils.getI18n("Northern Ireland "),_cruxUtils.getI18n("Israel-Asia/Jerusalem"),_cruxUtils.getI18n("Italy-Europe/Rome"),_cruxUtils.getI18n("Jamaica"),_cruxUtils.getI18n("Japan"),_cruxUtils.getI18n("Jordan-Asia/Amman"),_cruxUtils.getI18n("Kazakhstan-Asia/Almaty"),_cruxUtils.getI18n("Kenya-Africa/Nairobi"),_cruxUtils.getI18n("Kiribati"),_cruxUtils.getI18n("Kosovo"),_cruxUtils.getI18n("Kuwait-Asia/Kuwait"),_cruxUtils.getI18n("Kyrgyzstan"),_cruxUtils.getI18n("Laos"),_cruxUtils.getI18n("Latvia-Europe/Riga"),_cruxUtils.getI18n("Lebanon-Asia/Beirut"),_cruxUtils.getI18n("Lesotho"),_cruxUtils.getI18n("Liberia"),_cruxUtils.getI18n("Libya-Africa/Tripoli"),_cruxUtils.getI18n("Liechtenstein"),_cruxUtils.getI18n("Lithuania-Europe/Vilnius"),_cruxUtils.getI18n("LuxembourgFrench"),_cruxUtils.getI18n("LuxembourgGerman"),_cruxUtils.getI18n("Macao SAR China-Asia/Macao"),_cruxUtils.getI18n("Macedonia-Europe/Skopje"),_cruxUtils.getI18n("North Macedonia"),_cruxUtils.getI18n("Madagascar"),_cruxUtils.getI18n("Malawi"),_cruxUtils.getI18n("Malaysia-Asia/Kuala_Lumpur"),_cruxUtils.getI18n("Maldives"),_cruxUtils.getI18n("Malicious content detected."),_cruxUtils.getI18n("Malta-Europe/Malta"),_cruxUtils.getI18n("Marshall Islands"),_cruxUtils.getI18n("Martinique"),_cruxUtils.getI18n("Mauritania"),_cruxUtils.getI18n("Mauritius"),_cruxUtils.getI18n("Mayotte"),_cruxUtils.getI18n("Mexico-America/Cancun"),_cruxUtils.getI18n("Micronesia"),_cruxUtils.getI18n("Moldova"),_cruxUtils.getI18n("Monaco"),_cruxUtils.getI18n("Mongolia"),_cruxUtils.getI18n("Montserrat"),_cruxUtils.getI18n("Morocco-Africa/Casablanca"),_cruxUtils.getI18n("Mozambique"),_cruxUtils.getI18n("Myanmar"),_cruxUtils.getI18n("Namibia"),_cruxUtils.getI18n("Nauru"),_cruxUtils.getI18n("Nepal"),_cruxUtils.getI18n("Netherlands-Europe/Amsterdam"),_cruxUtils.getI18n("Netherlands Antilles"),_cruxUtils.getI18n("New Caledonia"),_cruxUtils.getI18n("New Zealand-NST"),_cruxUtils.getI18n("Nicaragua-America/Managua"),_cruxUtils.getI18n("Niger"),_cruxUtils.getI18n("Nigeria"),_cruxUtils.getI18n("Niue"),_cruxUtils.getI18n("Norfolk Island"),_cruxUtils.getI18n("North Korea"),_cruxUtils.getI18n("Northern Mariana Islands"),_cruxUtils.getI18n("Norway-Europe/Oslo"),_cruxUtils.getI18n("Oman-Asia/Muscat"),_cruxUtils.getI18n("Pakistan-Asia/Karachi"),_cruxUtils.getI18n("Palau"),_cruxUtils.getI18n("Palestine"),_cruxUtils.getI18n("Panama-America/Panama"),_cruxUtils.getI18n("Papua New Guinea"),_cruxUtils.getI18n("Paraguay-America/Asuncion"),_cruxUtils.getI18n("Peru-America/Lima"),_cruxUtils.getI18n("Philippines-Asia/Manila"),_cruxUtils.getI18n("Pitcairn"),_cruxUtils.getI18n("Poland-Europe/Warsaw"),_cruxUtils.getI18n("Portugal-Atlantic/Azores"),_cruxUtils.getI18n("Puerto Rico-America/Puerto_Rico"),_cruxUtils.getI18n("Qatar-Asia/Qatar"),_cruxUtils.getI18n("Reunion"),_cruxUtils.getI18n("Romania-Europe/Bucharest"),_cruxUtils.getI18n("Russia-Asia/Anadyr"),_cruxUtils.getI18n("Rwanda"),_cruxUtils.getI18n("Saint Helena"),_cruxUtils.getI18n("Saint Lucia"),_cruxUtils.getI18n("San Marino"),_cruxUtils.getI18n("Saudi Arabia-Asia/Riyadh"),_cruxUtils.getI18n("Senegal"),_cruxUtils.getI18n("Serbia and Montenegro"),_cruxUtils.getI18n("Seychelles"),_cruxUtils.getI18n("Sierra Leone"),_cruxUtils.getI18n("Singapore-Asia/Singapore"),_cruxUtils.getI18n("Slovakia-Europe/Bratislava"),_cruxUtils.getI18n("Slovenia-Europe/Ljubljana"),_cruxUtils.getI18n("Solomon Islands"),_cruxUtils.getI18n("Somalia-Africa/Mogadishu"),_cruxUtils.getI18n("South Africa-Africa/Johannesburg"),_cruxUtils.getI18n("South Korea-Asia/Seoul"),_cruxUtils.getI18n("SpainCatalan"),_cruxUtils.getI18n("SpainSpanish"),_cruxUtils.getI18n("Sri Lanka"),_cruxUtils.getI18n("Sudan-Africa/Khartoum"),_cruxUtils.getI18n("Suriname"),_cruxUtils.getI18n("Eswatini"),_cruxUtils.getI18n("Sweden-Europe/Stockholm"),_cruxUtils.getI18n("SwitzerlandFrench"),_cruxUtils.getI18n("SwitzerlandGerman"),_cruxUtils.getI18n("SwitzerlandItalian"),_cruxUtils.getI18n("Syria-Asia/Damascus"),_cruxUtils.getI18n("Taiwan-Asia/Taipei"),_cruxUtils.getI18n("Tajikistan"),_cruxUtils.getI18n("Tanzania-Africa/Dar_es_Salaam"),_cruxUtils.getI18n("Thailand-Asia/Bangkok"),_cruxUtils.getI18n("Timor-Leste"),_cruxUtils.getI18n("Togo"),_cruxUtils.getI18n("Tokelau"),_cruxUtils.getI18n("Tonga"),_cruxUtils.getI18n("Trinidad and Tobago"),_cruxUtils.getI18n("Tunisia-Africa/Tunis"),_cruxUtils.getI18n("turkey"),_cruxUtils.getI18n("Turkmenistan"),_cruxUtils.getI18n("Tuvalu"),_cruxUtils.getI18n("U.S. Virgin Islands-America/St_Thomas"),_cruxUtils.getI18n("Uganda"),_cruxUtils.getI18n("Ukraine-Europe/Kiev"),_cruxUtils.getI18n("United Arab Emirates-Asia/Dubai"),_cruxUtils.getI18n("United Kingdom-Europe/Belfast"),_cruxUtils.getI18n("Albanian"),_cruxUtils.getI18n("Algerian"),_cruxUtils.getI18n("United States-America/Adak"),_cruxUtils.getI18n("United States Minor Outlying Islands"),_cruxUtils.getI18n("Uruguay-America/Montevideo"),_cruxUtils.getI18n("Uzbekistan-Asia/Samarkand"),_cruxUtils.getI18n("Vanuatu"),_cruxUtils.getI18n("Vatican"),_cruxUtils.getI18n("Venezuela-America/Caracas"),_cruxUtils.getI18n("Western Sahara"),_cruxUtils.getI18n("Yemen-Asia/Aden"),_cruxUtils.getI18n("Zambia"),_cruxUtils.getI18n("Zimbabwe-Africa/Harare")]
				}]
			}),
			cxPropFieldPropertiesActions : Lyte.attr('array',{default : [{name : "Revert to last saved",value : 'revert_to_last_saved'},{name : "Field usage",value : 'field_usage'}, {name : "Create Layout Rule",value : 'create_layout_rule'}, {name : "Create Validation Rule",value : 'create_validation_rule'} , {name : "Add to other layouts",value : 'add_to_other_layouts'}]}),
			cxPropDisableFieldPropActions : Lyte.attr('boolean',{default : false}),
			cxPropFieldPropActionsToolTip :  Lyte.attr('string'), //no i18n
			picklistPredefinedOptionItems : Lyte.attr('array',{default : []}),
			picklistPredefinedOptionItemsChecked  : Lyte.attr('array',{default : []}),
			picklistBulkOptionValue : Lyte.attr('string',{default : ""}),
			triggerVisiblity : Lyte.attr('boolean',{default : true}),
			fieldOfLookupMappingOptions : Lyte.attr('array',{default : [{name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option1.new'),value : 'new_field', "relation_type" : "Added as"},{name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option2.existing'),value : 'existing_field', "relation_type" : "Mapped to"}]}),
			fieldOfLookupMappingSelected : Lyte.attr('object',{default : {value : 'new_field', name : _cruxUtils.getI18n('crm.customfield.lookup.relatedfield.relatedas.option1.new'), "relation_type" : "Added as"}}), //no i18n
			folAssociation : Lyte.attr('array',{default : []}), //no i18n
			fieldOfLookupMappingDisabled : Lyte.attr('boolean',{default : true}), //no i18n
			fieldOfLookupSelectedFieldsList : Lyte.attr('array',{default : []}),
			fieldOfLookupMappingDisabledOptions : Lyte.attr('array',{default : ['new_field', 'existing_field']}),
			fieldOfLookupSecondaryDisabled : Lyte.attr('boolean',{default : true}), //no i18n
			fieldOfLookupPrimaryFieldsSelected : Lyte.attr('string',{default : 'none'}), //no i18n
			fieldOfLookupSecondarySelected : Lyte.attr('string',{default : ''}), //no i18n
			fieldOfLookupUserValue : Lyte.attr('string',{default : 'label'}), //no i18n
			fieldOfLookupSystemValue : Lyte.attr('string',{default : 'id'}), //no i18n
			cxPropModule : Lyte.attr('object'), //no i18n
			relatedModule : Lyte.attr('object'), //no i18n
			cxPropFieldSpecialMetaKeys :  Lyte.attr('object',{default : {}}),
			mandatoryDisableTooltip : Lyte.attr('string',{default : 'you cannot remove a field that is marked as required'})
		};		
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
		Lyte.removeEventListener(this.closePropertiesPanel);
	},
	didConnect : function(){
		// this.resetModalPosition();
		// window.addEventListener('resize',()=>{
		// 	this.resetModalPosition();
		// });

		this.closePropertiesPanel = Lyte.addEventListener("cxPbEventClosePropertiesPanel", function(){
			this.closeModal();
		}.bind(this));
	},
	init : function(){
		this.$node.checkAndClosePropperties = function(){
			if(!this.getData('propertiesPanelShow')){
				return true;
			}
			if(this.component.errorProperties && Object.keys(this.component.errorProperties).length){
				Object.keys(this.component.errorProperties).forEach((key)=>{
					Lyte.triggerEvent('cxPbShowFieldMetaError',{
						api_name : key
					});
				});
				return false;
			}
			return new Promise((resolve,reject)=>{
				this.component.closeModal();
				this.component.propertiesCloseResolve = resolve;
				this.component.propertiesCloseReject = reject;
			});
		};

		this.$node.open = async function(field,options){
			if(await this.checkAndClosePropperties() === false){
				return false;
			}
			function dataUpdate(opt){
				if(typeof opt !== 'undefined'){
					if(opt.cxPropPropertyJson){
						this.setData('propertiesJson',opt.cxPropPropertyJson);
					}
					if(opt.cxHideProperties){
						this.setData('cxHideProperties',opt.cxHideProperties);
					}
					if(opt.cxPropExtraDefinitions){
						this.setData('cxPropExtraDefinitions',opt.cxPropExtraDefinitions);
					}
					if(opt.cxHidePermissions){
						this.setData('cxHidePermissions',opt.cxHidePermissions);
					}
					if(opt.error){
						this.component.errorProperties = opt.error;
					}
					if(opt.cxPropFieldPropertiesActions){
						this.setData('cxPropFieldPropertiesActions',opt.cxPropFieldPropertiesActions);
					}
					if(opt.cxPropDisableFieldPropActions){
						this.setData('cxPropDisableFieldPropActions',opt.cxPropDisableFieldPropActions);
					}
					if(opt.cxPropFieldPropActionsToolTip){
						this.setData('cxPropFieldPropActionsToolTip',opt.cxPropFieldPropActionsToolTip);
					}
					if(opt.cxPropModule){
						this.setData('cxPropModule',opt.cxPropModule);
					}
				}
				if((!this.component.data.cxPropField.customizable_properties || this.component.data.cxPropField.customizable_properties.indexOf('removal') > -1) && !this.component.data.cxPropField[this.component.data.cxPropFieldSpecialMetaKeys.cxMandatory]){
					this.setData('showRemoveField',true);
				}else{
					this.setData('showRemoveField',false);
				}
			}
			if(this.component.data.cxPropFieldPropertyJson && this.component.data.cxPropFieldPropertyJson[field.data_type]){
				this.setData({'propertiesJson' : this.component.data.cxPropFieldPropertyJson[field.data_type].properties, 'propertyTitle': this.component.data.cxPropFieldPropertyJson[field.data_type].field_label});
			}
			
			this.setData('cxPropField',field);
			this.component.errorProperties = {};
			dataUpdate.call(this,options);
			if(!this.component.lastRevertKeys[field.id]){
				this.component.lastRevertKeys[field.id] = [];
			}
			this.component.editingValues = {};
			this.component.setProfiles();
			this.setData('showModal',true);
			this.setData('showLoading',false);
			if(this.component.cruxPageBuilder.getMethods('cxPbBeforePropertyPanelOpen')){
				var a = this.component.cruxPageBuilder.executeMethod('cxPbBeforePropertyPanelOpen',this.component.data.propertiesJson,field, this.component.data.cxPropFieldPropertiesActions);
				if(a === false){
					this.setData('showModal',false);
					return;
				}
				if(a instanceof Promise){
					a.then(dataUpdate.bind(this));
				}else{
					dataUpdate.call(this,a);
				}
			}
			this.setData('propertiesPanelShow',true);
			if(Object.keys(this.component.errorProperties).length){
				for(var key in this.component.errorProperties){
					Lyte.triggerEvent('cxPbEventFieldPropertyError',{field_key : key,errorMessage : this.component.errorProperties[key]});
				}
			}
		};
		this.$node.close = function(){
			this.component.closeModal();
		};

		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropFieldSpecialMetaKeys", this.cruxPageBuilder.getData("cxPropFieldSpecialMetaKeys"));
		this.setData("cxPropFieldLabelIterator", this.cruxPageBuilder.getData("cxPropFieldLabelIterator"));
		this.lastRevertKeys = {};
		this.setData('propertiesJson',this.data.cxPropFieldPropertyJson.text.properties);

	},	
	actions : {
		addCustomTaxData:function(indexVal){
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data.splice(index + 1,0,{tax : '' , value : '' }); //no I18n
			this.setData({customTaxJson: [...data]}); //no I18n
			// const className = $L("#cxPbCustomTaxSortSelector")[0].getSortableClass(); //no I18n
			// $L('#cxPbCustomTaxSortSelector lyte-tr').addClass(`sortable-element  ${className}`); //no I18n
		},
		previewField : function() {
			this.setData("showPreview", true);
		},
		removeCustomTaxData:function(indexVal){ //no I18n
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data.splice(index,1); //no I18n
			this.setData({customTaxJson: [...data]}); //no I18n
			// const className = $L("#cxPbCustomTaxSortSelector")[0].getSortableClass(); //no I18n
			// $L('#cxPbCustomTaxSortSelector lyte-tr').addClass(`sortable-element  ${className}`); //no I18n
		},
		setCustomTaxValue:function(e,indexVal){ //no I18n
			const data = this.getData('customTaxJson'); //no I18n
			const index = Array.prototype.indexOf.call($L(`#cxPbCustomTaxSortSelector`).children(),$L(`#cxPbCustomTaxTd${indexVal}`)[0]); //no I18n
			data[index][e.target.name] = e.target.value; //no I18n
			this.setData({customTaxJson : data}); //no I18n
		},
		revertToLastSaved : function(){
			this.setData('showLoading',true);
			this.data.cxPropField.$.rollBackAttributes(this.lastRevertKeys[this.data.cxPropField.id]);
			this.setData('showLoading',false);
			if(this.cruxPageBuilder.getMethods('cxPbRevertToLastSaved')){
				this.cruxPageBuilder.executeMethod('cxPbRevertToLastSaved',field);
			}
		},
		closeProperties : function(){
			this.closeModal();
		},
		removeField :  function(){
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforeDeleteField')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforeDeleteField',this.data.cxPropField);
			}
			if(ch instanceof Promise){
				ch.then(function(){
					Lyte.triggerEvent('cxPbDeleteElements',{
						name : 'element', 				
						node : this.$node,
						data : this.data.cxPropField
					});
					this.$node.close();
				}.bind(this));
			}else if(ch){
				Lyte.triggerEvent('cxPbDeleteElements',{
					name : 'element', 				
					node : this.$node,
					data : this.data.cxPropField
				});
				this.$node.close();

			}		
			if(this.cruxPageBuilder.getMethods('cxPbRemoveField')){
				this.cruxPageBuilder.executeMethod('cxPbRemoveField');
			}  

		},
		helpLinkClicked : function(opt){
			if(this.cruxPageBuilder.getMethods('cxPbOpenHelpLink')){
				this.cruxPageBuilder.executeMethod('cxPbOpenHelpLink',opt);
			}    
		},
		piclistPredefinedOptionsTitleClicked : function(opt){
			this.setData({'picklistPredefinedOptionItems' :opt.cxPropOptions, 'picklistPredefinedOptionItemsChecked':[]});
		},
		closePicklistSeetingModal : function(){
			if(this.picklistHistoryReject){
				this.picklistHistoryReject();
			}
			this.setData('picklistSettingOption','');
			this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',false);
		},
		picklistSettingModalSave : function(){
			var dummyArr = [];
			if(this.data.picklistSettingOption === 'reference_values'){
				Lyte.triggerEvent('cxPbEventChangePicklistValues',{field_id : this.data.cxPropField.id,picklistJson : this.data.picklistJson});
			}
			if(this.data.picklistSettingOption === 'replace_values'){
				if(this.cruxPageBuilder.getMethods('cxPbReplacePicklistValue')){
					this.cruxPageBuilder.executeMethod('cxPbReplacePicklistValue',this.data.picklistReplaceOriginalSelected,this.data.picklistReplaceReplaceSelected);
				}
				Lyte.triggerEvent('cxPbEventRemovePicklistValues',{field_id : this.data.cxPropField.id,picklistJson : this.data.picklistReplaceOriginalSelected});
			}
			if(this.data.picklistSettingOption === 'bulk_option'){
				var arrayValue = this.data.picklistBulkOptionValue.split('\n');
				arrayValue.forEach(function(item){
					dummyArr.push({actual_value : item,display_value : item,reference_value : item,color_code : 'noFill'});
				});
				Lyte.triggerEvent('cxPbEventAppendPicklistValues',{field_id : this.data.cxPropField.id,picklistJson : dummyArr});
			}
			if(this.data.picklistSettingOption === 'predefined_options'){
				this.data.picklistPredefinedOptionItemsChecked.forEach(function(item){
					dummyArr.push({actual_value : item,display_value : item,reference_value : item,color_code : 'noFill'});
				});
				Lyte.triggerEvent('cxPbEventAppendPicklistValues',{field_id : this.data.cxPropField.id,picklistJson : dummyArr});
			}
			if(this.data.picklistSettingOption === 'convert_global' && this.cruxPageBuilder.getMethods('cxPbConvertToGlobalSet')){
				
				this.cruxPageBuilder.executeMethod('cxPbConvertToGlobalSet',this.data.globalPicklistName,this.data.picklistJson);
				
			}
			if(this.data.picklistSettingOption === 'history_tracking'){
				this.picklistHistoryResolve();
				if(this.cruxPageBuilder.getMethods('cxPbSetPicklistTrackingDetails')){
					this.cruxPageBuilder.executeMethod('cxPbSetPicklistTrackingDetails',this.data.cxPropField,{display_label : this.data.picklistTrackingRelatedName,cxPropSelectedFields : this.$node.querySelector('.cxPbPicklistSettingsModal').component.childComp.querySelector('crux-column-list').component.getSelectedFields()});
				}
			}
			// this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',false);
		},
		saveLookupPropertyModal : function(node){
			if(this.data.lookupPropertyModalOption === 'lookup_filter'){
				var criteria = node.closest('.cxPbPropActionModal').querySelector('crux-criteria-editor').getCriteria();
				if(criteria){
					this.lookupPropertyModalResponse(criteria);
					this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',false);
				}
			}
		},
		closeLookupPropertyModal : function(){
			this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',false);
		},
		addFieldOfLookupFields : function(){
			let fieldOfLookupMappingDisabled = this.data.fieldOfLookupPrimaryFieldsSelected === 'none';
			this.setData({'fieldOfLookupFieldAdd': true, fieldOfLookupSecondaryDisabled : false,fieldOfLookupMappingDisabled : fieldOfLookupMappingDisabled,fieldOfLookupPrimaryFieldsSelected : '',fieldOfLookupSecondarySelected : ''});
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',true);
		},
		closeFieldOfLookupFieldAddModal : function(){
			this.setData({"fieldOfLookupPrimaryFieldsSelected" : "none","fieldOfLookupMappingDisabled" : true, "primary_field_label" : "", "fieldOfLookupMappingSelected" : this.data.fieldOfLookupMappingOptions[0] });
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',false);
		},
		saveFieldOfLookupFieldAddModal : function(){
			const entry = {
				fieldOfLookupPrimaryFieldsSelectedObj: this.data.fieldOfLookupPrimaryFieldsSelectedObj,
				fieldOfLookupMappingSelected: this.data.fieldOfLookupMappingSelected,
				primary_field_label: this.data.primary_field_label
			};
			Lyte.arrayUtils(this.data.fieldOfLookupSelectedFieldsList,'push',entry);
			this.$node.querySelector('.cxPbFieldOfLookupModal').ltProp('show',false);
		}

	},
	methods : {
		closePreviewPopup : function(){
			this.setData("showPreview", false);
		},
		fieldActionSelected : function(item){
			if(item === "revert_to_last_saved"){
				this.editingValues = {};
				this.data.cxPropField.$.rollBack();
				this.setData('showLoading',true);
				this.setData('showLoading',false);

			}
			else if(this.cruxPageBuilder.getMethods('cxPbFieldActions')){
				this.cruxPageBuilder.executeMethod('cxPbFieldActions', item.value, this.data.cxPropField);
			}
	
		},
		modalShow : function(){
			if(this.data.propertyRules[this.data.cxPropField.data_type]){
				this.data.propertyRules[this.data.cxPropField.data_type].keys.forEach(function(k){	
					this.updateRules(k,Lyte.Component.registeredHelpers.cruxGetNestedValue(this.data.cxPropField,k));
				}.bind(this));	
			}
			if(this.cruxPageBuilder.getMethods('cxPbPropertyPanelShow')){
				this.cruxPageBuilder.executeMethod('cxPbPropertyPanelShow', this.data.cxPropField);
			}
		// 	setTimeout(function () {
		// 	let input = $L("#prop_header_field_label").find("input")[0];
		// 	if(input){debugger
		// 		input.focus();
		// 	}
		// },0)
			
		},
		onBeforeModalClose : function(event,comp){
			if(Object.keys(this.errorProperties).length){
				Object.keys(this.errorProperties).forEach((key)=>{
					Lyte.triggerEvent('cxPbShowFieldMetaError',{
						api_name : key
					});
				});
				if(this.propertiesCloseReject){
					this.propertiesCloseReject();
				}
				return false;
			}
			if(event.target.closest('.cxMergeFieldBodyPopover') || event.target.closest('.fieldallPermissions') || event.target.closest('.cxPalettePopoverContent') || event.target.closest('.cxPbPreventPropertiesPanelClose') || event.target.closest('.cxPaletteMoreColorsBtn')){
				return false;
			}
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyPanelClose')){
				var t = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyPanelClose',event,comp,this.data.propertiesJson,this.data.cxPropField,this.editingValues);
				if(t === false){
					if(this.propertiesCloseReject){
						this.propertiesCloseReject();
					}
					return false;
				}
			}
			for(var key in this.editingValues){
				if(key === 'field_label'){
					this.cruxPageBuilder.updateFieldList('remove',this.data.cxPropField);
				}
				this.data.cxPropField.$.set(key,this.editingValues[key]);
				Lyte.triggerEvent('cxPbFieldPropChange',{id : this.data.cxPropField.id,error : this.errorProperties});
				if(key === 'field_label'){
					// add new label to list after changing
					this.cruxPageBuilder.updateFieldList('add',this.data.cxPropField);
					// advance iterator for the staged data_type so next preview will move forward
					if(this.stagedFieldLabelDataType){
						if(!this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType]){
							this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType] = 1;
						}else{
							Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',this.stagedFieldLabelDataType,this.data.cxPropFieldLabelIterator[this.stagedFieldLabelDataType] + 1);
						}
						this.stagedFieldLabelDataType = null;
					}
				}
			}
			// eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
			if(Object.keys(this.errorProperties).length){
				Lyte.triggerEvent('cxPbEventFieldError',{id : this.data.cxPropField.id,error : this.errorProperties});
			}else{
				Lyte.triggerEvent('cxPbEventFieldError',{id : this.data.cxPropField.id});
			}
		},
		modalClose : function(comp){
			// for(var key in this.editingValues){
			// 	this.data.cxPropField.$.set(key,this.editingValues[key]);
			// }
			Lyte.triggerEvent('cxBuilderFieldChange',{
				field : this.data.cxPropField
			});
			// comp.setData( "ltPropReRenderModal" , true ) ;
			comp.setData( "ltPropBindToBody" , false ) ;
			setTimeout(function(){
				this.setData({'showModal':false, 'selectedProfiles':[],'profilesReadWrite':[],'profilesReadOnly':[], 'showPreview' : false,'propertiesPanelShow' :false, "cxHideProperties": false});
				if(this.cruxPageBuilder.getMethods('cxPbPropertyPanelClose')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyPanelClose',event,comp,this.data.cxPropField,this.editingValues);
				}
				if(this.propertiesCloseResolve){
					this.propertiesCloseResolve();
				}
			}.bind(this),300);
			this.setData('showLoading',true);
		},
		piclikistSettingOptionClickedFn : function(opt,picklistJson){
			this.setData('picklistSettingsModal',true);
			var a;
			if(opt === 'history_tracking'){
				if(this.cruxPageBuilder.getMethods('cxPbGetPicklistTrackingDetails')){
					a = this.cruxPageBuilder.executeMethod('cxPbGetPicklistTrackingDetails',this.data.cxPropField);
					var tempPicklistTrackingFunction = function(obj){
						this.setData({'picklistSettingOption' : opt, 'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.picklist.tracker.trackinghistory'), 'picklistSettingModalSaveButtonTitle':_cruxUtils.getI18n("Done")});
						this.setData({picklistTrackingRelatedName : obj.display_label,picklistTrackingFields : obj.cxPropFields,picklistTrackingSelectedFields : obj.cxPropSelectedFields});
						this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',true);
					}.bind(this);
					if(a instanceof Promise){
						a.then(function(obj){
							tempPicklistTrackingFunction(obj);
						}.bind(this));
					}else{
						tempPicklistTrackingFunction(a);
					}	
				}
				return new Promise(function(res,rej){
					this.picklistHistoryResolve = res;
					this.picklistHistoryReject = rej;
				}.bind(this));	
			}
			if(this.cruxPageBuilder.getMethods('cxPbPicklistSettingOption') && opt !== 'history_tracking'){
				a = this.cruxPageBuilder.executeMethod('cxPbPicklistSettingOption',opt,this.data.cxPropField,picklistJson);
			 	if(a === false){
			 		return;
			 	}
			}
			this.setData({'picklistSettingsModal':true, 'picklistJson':picklistJson, 'replacePicklistJson':[],'picklistSettingOption':opt});
			if(opt === 'reference_values'){
				this.setData({'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.picklist.reference.value'), 'picklistSettingModalSaveButtonTitle':'Save'});
			}
			if(opt === 'unused_values'){
				this.setData({'picklistSettingsModalHeader' : 'Unused Values', 'picklistSettingModalSaveButtonTitle':'Save'});
				if(this.cruxPageBuilder.getMethods('cxPbGetUnusedPicklistValues')){
					this.setData('picklistUnusedValues',this.cruxPageBuilder.executeMethod('cxPbGetUnusedPicklistValues',this.data.cxPropField));
				}
			}
			if(opt === 'bulk_option'){
				this.setData({'picklistBulkOptionValue' : '', 'picklistSettingsModalHeader':this.data.propertyTitle + ' Properties', 'picklistSettingModalSaveButtonTitle':'Add Choices'});
			}
			if(opt === 'predefined_options'){
				this.setData({'picklistSettingsModalHeader':this.data.propertyTitle + ' Properties', 'picklistPredefinedOptionItems' :this.data.picklistPredefinedOption[0].cxPropOptions, 'picklistPredefinedOptionItemsChecked':[], 'picklistSettingModalSaveButtonTitle':'Add Choices'});
			}
			if(opt === 'convert_global'){
				this.setData({'globalPicklistName':'', 'picklistSettingModalSaveButtonTitle':_cruxUtils.getI18n('crm.workdrive.tab.btn.confirm'), 'picklistSettingsModalHeader':_cruxUtils.getI18n('mb.globalfield.convertGlobal.heading')});
			}
			if(opt === 'replace_values'){
				var temp = Array.from(picklistJson);
				Lyte.arrayUtils(temp,'removeObjects',picklistJson[0]);
				this.setData({'replacePicklistJson':temp,'picklistReplaceOriginalSelected':picklistJson[0] ,'picklistSettingsModalHeader':_cruxUtils.getI18n('crm.mb.label.replace.values'), 'picklistSettingModalSaveButtonTitle':'Save' });
			}
			this.$node.querySelector('.cxPbPicklistSettingsModal').ltProp('show',true);
		},
		lookupPropertyModalClickedFn : async function(opt,property){
			this.setData({'lookupPropertyModal':true, 'lookupPropertyModalOption':opt, 'lookupPropertyModalPropertyObj':property});
			if(opt === 'lookup_filter'){
				this.setData({'saveLookupPropertyModalLabel':_cruxUtils.getI18n('Done'), 'lookupPropertyModalTitle':'Lookup Filter'});
			}
			if(opt === 'field_of_lookup'){
				try{
					// related module info may be sync or return a Promise
					if(this.cruxPageBuilder.getMethods('cxPbGetRelatedModuleInfo')){
						var relatedModule = this.cruxPageBuilder.executeMethod('cxPbGetRelatedModuleInfo', this.data.cxPropField, this.editingValues);
						if(relatedModule instanceof Promise){
							relatedModule = await relatedModule;
						}
						this.setData('relatedModule', relatedModule);
					}
					// related fields - depends on relatedModule, so await result before calling
					if(this.cruxPageBuilder.getMethods('cxPbGetRelatedFieldsInfo')){
						let related_field_info = this.cruxPageBuilder.executeMethod('cxPbGetRelatedFieldsInfo', this.data.relatedModule, this.data.cxPropField);
						if(related_field_info instanceof Promise){
							related_field_info = await related_field_info;
						}
						related_field_info.fields.unshift({label: "None", fieldId: "none"});
						this.setData('fieldOfLookupPrimaryFields', related_field_info.fields);
						this.setData('fieldOfLookupUserValue', related_field_info.field_user_value);
						this.setData('fieldOfLookupSystemValue', related_field_info.field_system_value);
					}
					// current fields may also be async
					if(this.cruxPageBuilder.getMethods('cxPbGetCurrentFields')){
						var currentFields = this.cruxPageBuilder.executeMethod('cxPbGetCurrentFields', this.data.cxPropField, this.editingValues);
						if(currentFields instanceof Promise){
							currentFields = await currentFields;
						}
						this.setData('fieldOfLookupSecondaryFields', currentFields.fields);
					}
				}catch(err){
					this.setData('fieldOfLookupPrimaryFields', this.data.fieldOfLookupPrimaryFields || []);
					this.setData('fieldOfLookupSecondaryFields', this.data.fieldOfLookupSecondaryFields || []);
				}
				this.setData({'saveLookupPropertyModalLabel':_cruxUtils.getI18n('crm.button.save'), 'lookupPropertyModalTitle':_cruxUtils.getI18n('crm.customfield.lookup.relatedfield.fieldlisttitle')});
			}
			this.$node.querySelector('.cxPbLookupSettingModal').ltProp('show',true);
			return new Promise(function(res,rej){
				this.lookupPropertyModalResponse = res;
				this.lookupPropertyModalReject = rej;
			}.bind(this));
		},
		lookupFieldSelection : function(){
			let sel = this.data.fieldOfLookupPrimaryFieldsSelected;
			this.setData('fieldOfLookupMappingDisabled', sel === 'none');
			let sel_field = this.data.fieldOfLookupPrimaryFields.filter(function(field){
				return field.fieldId === sel;
			});
			// If a primary field is selected, compute the next preview label (do NOT advance iterator yet)
			if(sel_field && sel_field.length){
				this.setData("fieldOfLookupPrimaryFieldsSelectedObj", sel_field[0]);
				if(sel !== 'none'){
					var fieldM = sel_field[0];
					var iter = this.data.cxPropFieldLabelIterator[fieldM.data_type] || 1;
					var field_label = fieldM.label + " " + iter;
					// store preview label in primary_field_label and keep data_type to increment iterator only on save
					this.setData('primary_field_label', field_label);
					this.stagedFieldLabelDataType = fieldM.data_type;
				}		
			}else{
				// clear preview
				this.setData('primary_field_label','');
				this.stagedFieldLabelDataType = null;
			}
		},
		lookupPropertyModalShowMt : async function(node){
			if(this.data.lookupPropertyModalOption === 'lookup_filter' && this.cruxPageBuilder.getMethods('cxPbGetLookupCriteriaDetails')){
		 		var obj = await this.cruxPageBuilder.executeMethod('cxPbGetLookupCriteriaDetails',this.data.cxPropField,this.data.lookupPropertyModalPropertyObj, this.editingValues);
		 		if(!obj.data.cxPropSetCriteria){
		 			obj.data.cxPropSetCriteria = this.editingValues[this.data.lookupPropertyModalPropertyObj.api_name] || this.data.cxPropField[this.data.lookupPropertyModalPropertyObj.api_name];
		 		}
				Lyte.Component.render('crux-criteria-editor',obj.data,node.childComp.querySelector('.cxPbModalCriteria'),{methods : obj.methods}); 	
			}
		},
		lookupPropertyModalCloseMt : function(comp){
			comp.setData("ltPropReRenderModal",true);
		},
		prefidenedChecked : function(item,node){
			if(item === 'select_all'){
				if(node.checked){
					this.setData('picklistPredefinedOptionItemsChecked',Array.from(new Set(this.data.picklistPredefinedOptionItemsChecked.concat(this.data.picklistPredefinedOptionItems))));
					// Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'concat',this.data.picklistPredefinedOptionItems)
				}else{
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'removeObjects',this.data.picklistPredefinedOptionItems);
				}
			}else if(node.checked){
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'push',item);
				}else{
					Lyte.arrayUtils(this.data.picklistPredefinedOptionItemsChecked,'removeObjects',item);
				}
		},
		unusedOptionsChecked : function(){
			if(node.checked){
				Lyte.arrayUtils(this.data.picklistUnusedOptionItemsChecked,'push',item);
			}else{
				Lyte.arrayUtils(this.data.picklistUnusedOptionItemsChecked,'removeObjects',item);
			}
		},
		picklistReplaceOriginalSelect : function(event,value){
			var temp = Array.from(this.data.picklistJson);
			Lyte.arrayUtils(temp,'removeAt',this.data.picklistJson.cruxFindIndexOfObject('actual_value',value));
			this.setData({'replacePicklistJson':temp, 'picklistReplaceOriginalSelected' :this.data.picklistJson.cruxFilterBy({'actual_value' : value})[0]});
		},
		picklistReplaceReplaceSelect : function(event,value){
			this.setData('picklistReplaceReplaceSelected',this.data.picklistJson.cruxFilterBy({'actual_value' : value})[0]);
		},
		beforeProfilePermissionSelect : function(item, type){
			if(this.cruxPageBuilder.getMethods('cxPbBeforeFieldProfilePermissionChange')){
				return this.cruxPageBuilder.executeMethod('cxPbBeforeFieldProfilePermissionChange',this.data.cxPropField,item,type);
			}
		},
		profilePermissionChanged : function(changedVal){
			return this.updateProfiles(changedVal);
		},
		propertyValueChange : function(key,value,error){
			if(this.data.propertyRules[this.data.cxPropField.data_type] && this.data.propertyRules[this.data.cxPropField.data_type].keys.indexOf(key) > -1){
				this.updateRules(key,value);
			}
			if(!error){
				delete this.errorProperties[key];	
			} 
			this.editingValues[key] = value;
			if(key.indexOf('auto_number') > -1){
				var prefix = typeof this.editingValues["auto_number.prefix"] !== "undefined" ? this.editingValues["auto_number.prefix"] : this.data.cxPropField.auto_number.prefix || "";
				prefix = prefix.replace(new RegExp('[$]{DD}','gi'),$L.moment(new Date()).format('DD')).replace(new RegExp('[$]{MM}','gi'),$L.moment(new Date()).format('MM')).replace(new RegExp('[$]{MMM}','gi'),$L.moment(new Date()).format('MMM')).replace(new RegExp('[$]{MMMM}','gi'),$L.moment(new Date()).format('MMMM')).replace(new RegExp('[$]{YY}','gi'),$L.moment(new Date()).format('YY')).replace(new RegExp('[$]{YYYY}','gi'),$L.moment(new Date()).format('YYYY'));
				var suffix = typeof this.editingValues["auto_number.suffix"] !== "undefined" ? this.editingValues["auto_number.suffix"] : this.data.cxPropField.auto_number.suffix || "";
				suffix = suffix.replace(new RegExp('[$]{DD}','gi'),$L.moment(new Date()).format('DD')).replace(new RegExp('[$]{MM}','gi'),$L.moment(new Date()).format('MM')).replace(new RegExp('[$]{MMM}','gi'),$L.moment(new Date()).format('MMM')).replace(new RegExp('[$]{MMMM}','gi'),$L.moment(new Date()).format('MMMM')).replace(new RegExp('[$]{YY}','gi'),$L.moment(new Date()).format('YY')).replace(new RegExp('[$]{YYYY}','gi'),$L.moment(new Date()).format('YYYY'));
				var starting_number = typeof this.editingValues["auto_number.starting_number"] !== "undefined" ? this.editingValues["auto_number.starting_number"] : this.data.cxPropField.auto_number.starting_number || "";
				Lyte.triggerEvent('cxPbEventAutoNumberPreview',prefix,starting_number,suffix);
			}
			if(this.lastRevertKeys[this.data.cxPropField.id] && this.lastRevertKeys[this.data.cxPropField.id].indexOf(key) === -1){
				this.lastRevertKeys[this.data.cxPropField.id].push(key);
			}
		},
		errorInProperty : function(key,message){
			this.errorProperties[key] = message;
			delete this.editingValues[key];
		}
		// Functions which can be used as callback in the component.
	},
	closeModal : function(){
		this.setData("cxHideProperties", false);
		this.setData('propertiesPanelShow',false);
	},	  
	checkRulesCondition : function(rule,value){
		if(typeof value === 'undefined' || value === null ){
			return false;
		}
		if (typeof value === 'object') {
			if (Object.keys(value).length === 0) {
			  return false;
			}
			value = value.system_value ? value.system_value : (value.id ? value.id : value);
	    }
		if(rule.condition){
			return Lyte.Component.registeredHelpers.expHandlers(rule.condition_value,rule.condition,value);
		}else if(typeof value === 'boolean'){
			return value;
		}
		return true;
	},
	updateRules : function(key,value){
		var rules = this.data.propertyRules[this.data.cxPropField.data_type] && this.data.propertyRules[this.data.cxPropField.data_type].rules;
		if(rules){ 
			rules.forEach(function(item){
				var ind = item.properties.indexOf(key),i;
				if(ind > -1){
					let properties_len = item.properties ? item.properties.length : 0;
					switch(item.type){
						case 'disable':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key){
									var msg,msgKey = "crux.pb." + item.properties[i] + "." + key + ".error";
									if(!_cruxUtils._cruxLocale[msgKey] && this.cruxPageBuilder.getMethods('cxPbI18nMessage')){
										msg = this.cruxPageBuilder.executeMethod('cxPbI18nMessage',msgKey);
									}else{
										msg = _cruxUtils.getI18n("crux.pb." + item.properties[i] + "." + key + ".error");
									}
				
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										cxTooltipMessage : msg,
										action : this.checkRulesCondition(item,value) ? 'disable' : 'enable',
										fromProperty : key
									});
								}
							}
						break;
						case 'options_change':
							if(item.properties[0] === key){
								let maxLength = (value === 'info_icon') ? 255 : 32;
								for(i = 0; i < properties_len; i++){
									if(item.properties[i] !== key){
										Lyte.triggerEvent('cxPbEventModifyProperty',{
											propertyKey : item.properties[i],   
											action : 'set_property',
											length : maxLength,
											fromProperty : key,
											fromValue : value
										});
									}
								}
								return; 
							}
							if(item.properties[0] === key){
								var options = [];
								for(i = 0;i < (value > 10 ? 10 : value);i++){
									options.push({
			                            "system_value": i,
			                            "display_value": i
			                    	});
								}
								for(i = 0;i < properties_len;i++){
									if(item.properties[i] !== key){
										Lyte.triggerEvent('cxPbEventModifyProperty',{
											propertyKey : item.properties[i],
											action : 'options_change',
											options : options,
											fromProperty : key,
											fromValue : value
										});
									}
								}
							}
						break;
						case 'hide':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : this.checkRulesCondition(item,value) ? 'hide' : 'show',
										fromProperty : key
									});
								}
							}
						break;
						case 'checked':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key && key === "sliding_scale"){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : 'options_select',
										fromProperty : key
									});
								}
							}
						break;
						case 'unchecked':
							for(i = 0;i < properties_len;i++){
								if(item.properties[i] !== key && key === "sliding_scale"){
									Lyte.triggerEvent('cxPbEventModifyProperty',{
										propertyKey : item.properties[i],
										action : 'disable_select',
										fromProperty : key
									});
								}
							}
						break;
					}
				}
			}.bind(this));	
		}
		if(key === this.data.cxPropFieldSpecialMetaKeys.cxMandatory){
			value ? this.setData("showRemoveField", false) : this.setData("showRemoveField", true);
		}
	},
	// didConnect:function(){
		
	// 	this.cruxPageBuilder = new CruxCommonBuilder()
	// 	// $L("#cxPbCustomTaxSortSelector").sortable({ //no I18n
	// 	// 	items : ".cxPbTableSortableHandle", //no I18n
	// 	// 	scrollDivY : "lyte-table-structure" , //no I18n
	// 	// 	onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
	// 	// 		if(fromIndex !== toIndex){
	// 	// 			const component = $L('crux-page-builder-properties')[0].component
	// 	// 			const customTaxData = component.getData('customTaxJson') //no I18n
	// 	// 			const data = customTaxData.splice(fromIndex,1)
	// 	// 			customTaxData.splice(toIndex,0,...data)
	// 	// 		}
	// 	// 	},
	// 	// 	onSelect : function() {
	// 	// 		$L('#cxPbCustomTaxSortSelector input').blur() //no I18n
	// 	// 	}
	// 	// });

	// 	// $L("#cxPbPickListSortSelector").sortable({ //no I18n
	// 	// 	items : ".cxPbTableSortableHandle", //no I18n
	// 	// 	scrollDivY : "lyte-table-structure"  //no I18n
	// 	// })
		
	// },
	// resetModalPosition : function(){
	//  	const builderArtBoard = $L(this.$node).prev('lyte-page-builder').find('lyte-pb-artboard');
	// 	// setTimeout(() => {
	// 	// 	$L(this.$node).find('lyte-modal')[0].ltProp('height',`${builderArtBoard.outerHeight() - 50}px`)
	// 	// 	$L(this.$node).find('lyte-modal')[0].ltProp('offset',{"top":`${builderArtBoard.offset().top + 50}px`,"right":"0"})		
	// 	// }, 0);
	// },
	setProfiles :function(){
		var profiles = this.data.cxPropField.profiles;
		if(profiles && profiles.length){
			profiles.forEach(function(item){
				if(!this.data.selectedProfiles.includes(item.id)){
					Lyte.arrayUtils(this.data.selectedProfiles,'push',item.id);
				}
				if(item.permission_type === 'read_write' && !this.data.profilesReadWrite.includes(item.id)){
					Lyte.arrayUtils(this.data.profilesReadWrite,'push',item.id);
				}else if(item.permission_type === 'read_only' && !this.data.profilesReadOnly.includes(item.id)){
					Lyte.arrayUtils(this.data.profilesReadOnly,'push',item.id);
				}
			}.bind(this));
			var selProfs = this.data.selectedProfiles;
			var ROProfs = this.data.profilesReadOnly;
			var RWProfs = this.data.profilesReadWrite;
			var cxProfs = this.data.cxPropProfiles;
			if(selProfs.length >= 1 && (selProfs.length === ROProfs.length || selProfs.length === RWProfs.length) && selProfs.length === cxProfs.length){
				this.setData('profileOption', true);
			}else{
				this.setData('profileOption', false);
			}
		}
	},
	updateProfiles : function(profiles){
		// this.data.cxPropField.$.set('profiles',profiles);
		this.editingValues.profiles = profiles;
		if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
			this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxPropField,"profiles",profiles);
		}
	}
});
Lyte.Component.registerHelper('checkVisibleProperty',function(properties){
	var pLength = properties.length;
	properties.forEach(function(item){
		if(item.cxHide){
			pLength -= 1;
		}
	});
	if(pLength === 0){
		return false;
	}
	return true;
});

Lyte.Component.register("crux-page-builder-property-header-help-info-icon", {
_template:"<template tag-name=\"crux-page-builder-property-header-help-info-icon\"> <template is=\"if\" value=\"{{expHandlers(cxPropProperty.help_info.display_type,'==','info_icon')}}\"><template case=\"true\"> <i id=\"cxPbShowTooltip_{{cxPropProperty.api_name}}\" class=\"cxPbSprite cxPbInfoIcon\" lyte-hovercard=\"true\"></i> <template is=\"if\" value=\"{{expHandlers(cxPropProperty.api_name,'!=',&quot;rounding_option&quot;)}}\"><template case=\"true\"> <lyte-hovercard lt-prop-auto-show=\"true\" lt-prop-origin-elem=\"#cxPbShowTooltip_{{cxPropProperty.api_name}}\" lt-prop-popover-wrapper-class=\"yourclass\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> {{unescape(cxPropProperty.help_info.display_value)}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropProperty.help_info.display_type,'===','help_icon')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropProperty.help_info.link}}\"><template case=\"true\"><i class=\"cxPbSprite cxPbHelpIcon\" lt-prop-title=\"{{cxPropProperty.help_info.display_value}}\" onclick=\"{{action('openHelp')}}\"></i></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropProperty.help_info}}\"><template case=\"true\"><i class=\"cxPbSprite cxPbInfoIcon\" lt-prop-title=\"{{cxPropProperty.help_info.display_value}}\"></i></template></template> </template></template></template></template> <lyte-hovercard lt-prop-auto-show=\"true\" lt-prop-origin-elem=\"#cxPbShowTooltip_rounding_option\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxPbPropHelpHovercard\"> <div class=\"cxPbPropHelpHovercardHead\"> Currency Type Custom Fields </div> <lyte-table lt-prop-yield=\"true\" class=\"cxPbPropHelpHovercardTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-thead> <lyte-tr> <lyte-th>Option</lyte-th> <lyte-th>Amount</lyte-th> <lyte-th>Decimal Places</lyte-th> <lyte-th>Precision</lyte-th> <lyte-th>Result</lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <lyte-tr> <lyte-td>Normal</lyte-td> <lyte-td> <div>1234.123</div> <div>1234.123</div> </lyte-td> <lyte-td> <div>3</div> <div>3</div> </lyte-td> <lyte-td> <div>-</div> <div>-</div> </lyte-td> <lyte-td> <div>1234.123</div> <div>1234.123</div> </lyte-td> </lyte-tr> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </lyte-hovercard-content> </template> </lyte-hovercard> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"componentDynamic","position":[1,1,1,5]},{"type":"componentDynamic","position":[1,1,1,7]},{"type":"componentDynamic","position":[1,1,1,9]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3,1,1]},{"type":"componentDynamic","position":[1,3,1,3]},{"type":"componentDynamic","position":[1,3,1,5]},{"type":"componentDynamic","position":[1,3,1,7]},{"type":"componentDynamic","position":[1,3,1,9]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropProperty"],
_observedAttributesType :["object"],

	data : function(){
		return {
			cxPropProperty : Lyte.attr('object')
		};	
	},
	actions : {
		openHelp : function(){
			window.open(this.data.cxPropProperty.help_info.link);
		}
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

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

Lyte.Component.register("crux-page-builder-record-image", {
_template:"<template tag-name=\"crux-page-builder-record-image\"> <template is=\"if\" value=\"{{expHandlers(showImage,'&amp;&amp;',expHandlers(cxPropRightPanelDisable,'!'))}}\"><template case=\"true\"><span class=\"cxPbElemSecActionIcons\"> <span data-cx-builder-output=\"remove\" class=\"cxPbElemSecActionIconWrapper lytePbRejectDrag\" onclick=\"{{action('openPermissionPage')}}\"><i class=\"cxPbSprite cxPbSettingsIcon\"></i></span> </span></template></template> <div class=\"cxPbImgSecTitleDiv {{if(expHandlers(showImage,'!'),'cxPbRecImgHideTitleDiv','')}}\"> <label for=\"cxPbRecordImageTitle\" class=\"cxPbImgSecTitle\">{{cxPropSection.display_label}}</label> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"><lyte-checkbox lt-prop-type=\"switch\" lt-prop-name=\"checkbox\" lt-prop-checked=\"{{showImage}}\" lt-prop-value=\"val\" lt-prop-id=\"cxTitleImageSwitch\" on-changed=\"{{method('checkboxChanged')}}\"></lyte-checkbox></template></template> </div> <div class=\"cxPbElementClass cxPbRecordImageElement {{if(expHandlers(showImage,'!'),'cxPbHideDefaultUserImage','')}}\"> <span class=\"cxPbDefaultUserImage\"></span> <template is=\"if\" value=\"{{cxPropRightPanelDisable}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"><span id=\"toolbar_icon_{{cxPropSection.id}}\" class=\"cxPbElemActionIconWrap\" onclick=\"{{action('onToolbarClick',this)}}\"> <span class=\"cxMoreIcon cxPbElemMoreIcon\"></span> </span></template></template> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropSectionId","cxPropId","cxPropSection","cxPreventNewSectionCreation","showImage","cxPropRightPanelDisable","isPreview"],
_observedAttributesType :["string","string","object","boolean","boolean","boolean","boolean"],

	data : function(){
		return {
			cxPropSectionId : Lyte.attr('string'), //no i18n
			cxPropId : Lyte.attr('string'), //no i18n
			cxPropSection : Lyte.attr('object'), //no i18n
			cxPreventNewSectionCreation : Lyte.attr('boolean',{default : true}), //no i18n
			showImage : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropRightPanelDisable : Lyte.attr('boolean'),
			isPreview : Lyte.attr('boolean',{default : false})
		};	
	},
	init : function(){
		if(this.data.cxPropSectionId){
			this.setData('cxPropSection',store.peekRecord('section',this.data.cxPropSectionId));
			this.setData("showImage", this.data.cxPropSection.section_field.length  > 0);
		}
	},
	didConnect : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData("cxPropRightPanelDisable", this.cruxPageBuilder.getData("cxPropRightPanelDisable"));
		this.setData('isPreview',this.cruxPageBuilder.cruxNode.component.data.cxPropShowPreview);
		Lyte.triggerEvent('cxPbAddedElement',{
			name : 'section',
			node : this.$node,
			section : this.data.cxPropSection
		});
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
	},
	actions : {
		newSectionCreate : function(){
			Lyte.triggerEvent('cxPbAddElements',{
				name : 'section',
				node : this.$node
			});
		},
		openPermissionPage : function(){
			this.$node.closest('crux-page-builder').component.propertiesPanel.open(this.data.cxPropSection.section_field[0],{cxHideProperties : true});
		},
		onToolbarClick : function(element){
			if(element.classList.contains('cxPbDisabled')){
				return;
			}
			if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
				this.cruxPageBuilder.executeMethod('cxPbToolBarAction',this.data.cxPropSection,element);
			}
		}
	},
	methods : {
		checkboxChanged : function(node){
			this.setData('showImage',node.checked);
			if(this.cruxPageBuilder.getMethods('cxPbImageCheckboxChanged')){
				this.cruxPageBuilder.executeMethod('cxPbImageCheckboxChanged',node.checked);
			}
		}
	}
});

Lyte.Component.register("crux-page-builder-section-navigator", {
_template:"<template tag-name=\"crux-page-builder-section-navigator\"> <template is=\"if\" value=\"{{expHandlers(sectionNavigatorData.length,'>',0)}}\"><template case=\"true\"><div class=\"cxPbSectionNavWrapper\"> <lyte-navigator on-next=\"{{method('next')}}\" on-previous=\"{{method('previous')}}\" lt-prop-yield=\"true\" lt-prop-value=\"{{lbind(startIndex)}}\" lt-prop-records=\"{{sectionNavigatorData.length}}\" lt-prop-perpage=\"1\"> <template is=\"registerYield\" yield-name=\"navigatorYield\"> <span class=\"cxPbSecNavIconWrap lyteNavigator lyteSingleBack\"> <i class=\" cxPbSprite cxPbUpArrowIcon\"></i> </span> <span lt-prop-title=\"Navigate To\" class=\"cxPbSecNavCount\" id=\"cxPbSectionNavigator_{{cxPropId}}\">{{startRecNum}}</span> <span class=\"cxPbSecNavIconWrap lyteNavigator lyteSingleFront\"> <i class=\"cxPbSprite cxPbDownArrowIcon\"></i> </span> </template> </lyte-navigator> </div></template></template> <lyte-menu lt-prop-yield=\"true\" lt-prop-content=\"{{sectionNavigatorData}}\" on-menu-click=\"{{method('onSectionNavMenuClick')}}\" lt-prop-query=\"#cxPbSectionNavigator_{{cxPropId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"fieldallPermissions\"> <lyte-menu-header>Navigate To</lyte-menu-header> <template is=\"for\" items=\"{{sectionNavigatorData}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{item.id}}\"> {{item.display_label}} </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[3]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["sectionNavigatorData","startIndex","startRecNum","cxPropId"],
_observedAttributesType :["array","number","number","string"],

	data : function(){
		return {
			sectionNavigatorData:Lyte.attr('array',{default:[]}),
			startIndex : Lyte.attr('number', {default : 0}), //No I18N
			startRecNum : Lyte.attr('number', {default : 1}), //No I18N
			cxPropId : Lyte.attr('string') //No I18N
		};	
	},
	methods : {
		// Functions which can be used as callback in the component.
		onSectionNavMenuClick:function(id){
			this.isNavScrolling = true;
			const sectionDiv = $L(`[cx-section-id='${id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
			this.scrollToElemSection(sectionDiv);
			this.setData("startRecNum" , Number(this.data.sectionNavigatorData.cruxFilterBy({"id" : id})[0].sequence_number));
			this.setData("startIndex", this.data.startRecNum - 1);
		},
		next : function(value){
			this.isNavScrolling = true;
			let data = this.data.sectionNavigatorData[value];
			this.setData({"startRecNum" :this.data.startRecNum + 1, "startIndex": this.data.startIndex + 1});
			if(data){
				const sectionDiv =  $L(`[cx-section-id='${data.id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
				this.scrollToElemSection(sectionDiv);
			}
		},
		previous : function(value){
			this.isNavScrolling = true;
			let data = this.data.sectionNavigatorData[value];
			this.setData({"startRecNum" :this.data.startRecNum - 1, "startIndex": this.data.startIndex - 1});
			if(data){
				const sectionDiv =  $L(`[cx-section-id='${data.id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
				this.scrollToElemSection(sectionDiv);
			}
			
		}
	},
	scrollToElemSection:function(sectionDiv){
		sectionDiv.closest('.cxPbDropAreaContainer').scrollTop = sectionDiv.offsetTop - 35;
		// let titleSection = sectionDiv.querySelector('.cxPbTitleSection');
		// titleSection = (titleSection === null && sectionDiv.getData("cxPropSection").api_name ==="Record_Image") ?  sectionDiv.querySelector('.cxPbImgSecTitle') : titleSection ; 
		sectionDiv.classList.add('cxPbSectionHighlight');
		setTimeout(() => {
			sectionDiv.classList.remove('cxPbSectionHighlight');
			this.isNavScrolling = false;
		}, 2000);	
	},
	observeSectionData : function(){
		if(this.data.startRecNum  > this.data.sectionNavigatorData.length){
			this.setData({"startRecNum" : this.data.sectionNavigatorData.length, "startIndex": this.data.startIndex - 1});
		}
		this.setData('sectionNavigatorData',this.data.sectionNavigatorData.sort((a,b)=>{
			if (parseInt(a.sequence_number) < parseInt(b.sequence_number)){
				return -1;
			}
			if (parseInt(a.sequence_number) > parseInt(b.sequence_number)){
				return 1;
			}
			return 0;
		}));
	}.observes('sectionNavigatorData.[]','sectionNavigatorData')
});

Lyte.Component.register("crux-page-builder-section", {
_template:"<template tag-name=\"crux-page-builder-section\"> <template is=\"if\" value=\"{{draggingState}}\"><template case=\"true\"> <div class=\"cxPbSectionOnDragHeading\">{{cxSection.display_label}}</div> </template></template> <div class=\"{{if(draggingState,'cxdN','')}}\"> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(cxSection.cxSectionActionHide)}}\"><template case=\"true\"><span class=\"cxPbElemSecActionIcons\"> <span id=\"sectionToolbar{{cxSectionId}}\" data-cx-builder-output=\"remove\" class=\"cxPbElemSecActionIconWrapper lytePbRejectDrag\"><i class=\"cxPbSprite cxPbSettingsIcon\"></i></span> <span class=\"cxPbElemSecActionIconWrapper {{if(cruxOr(xSection.actions_allowed.delete,allowedDelete),'','cxPbDisabled')}}\" lt-prop-title=\"{{sectionDeleteDisableTitle}}\" onclick=\"{{action('sectionDelete',this)}}\"><i class=\"cxPbSprite cxPbDeleteIcon\"></i></span> </span></template></template> </template></template> <div class=\"cxPbTitleSection\"> <crux-text-component class=\"lytePbRejectDrag\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{cxSection.display_label}}\" cx-prop-from=\"{{if(cruxOr(isPreview,negate(cxSection.actions_allowed.rename)),'view','create')}}\" on-value-change=\"{{method('sectionLabelChange',this)}}\" cx-prop-error-on-hovercard=\"true\" cx-prop-id=\"subform_{{cxSection.id}}\" cx-prop-error-message=\"{{cxErrorMessage}}\" cx-prop-tooltip=\"\"></crux-text-component> <template is=\"if\" value=\"{{cxSection.cxInfoTitle}}\"><template case=\"true\"> <i class=\"cxPbSprite cxPbInfoIcon\" lt-prop-title=\"{{cxSection.cxInfoTitle}}\"></i> </template></template> </div> <div class=\"gridTemplateContainer\"></div> </div> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <lyte-menu data-cx-builder-output=\"remove\" lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"#sectionToolbar{{cxSectionId}}\" on-menu-click=\"{{method('onSectionSettingClicked')}}\" on-before-open=\"{{method('sectionSettingMenuBeforeOpen')}}\" on-before-close=\"{{method('sectionSettingsMenuClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbSectionSettingsMenuBody\"> <lyte-menu-group> <lyte-menu-header> {{cruxGetI18n('crm.mb.section.layout')}} </lyte-menu-header> <lyte-menu-item class=\"{{if(ifEquals(selectedColumnCount,'single_column_section'),'cxPbMenuSelected','')}}\" data-value=\"single_column_section\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbSingleColIcon cxPbSecSettingMenuIcon\"></span> {{cruxGetI18n('crm.custom.module.single.column')}}</lyte-menu-label> </lyte-menu-item> <lyte-menu-item class=\"{{if(ifEquals(selectedColumnCount,'double_column_section'),'cxPbMenuSelected','')}}\" data-value=\"double_column_section\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbDoubleColIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.custom.module.double.column')}}</lyte-menu-label> </lyte-menu-item> </lyte-menu-group> <lyte-menu-group> <lyte-menu-header> {{cruxGetI18n('crm.mb.tab.traversal')}} </lyte-menu-header> <lyte-menu-item class=\"{{if(cruxAnd(ifEquals(selectedTabTraversal,'left_right'),ifNotEquals(selectedColumnCount,'single_column_section')),'cxPbMenuSelected','')}}\" lt-prop-disabled=\"{{disableOrder}}\" data-value=\"left_right\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbLeftToRightIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.mb.left.right.traversal')}}</lyte-menu-label> </lyte-menu-item> <lyte-menu-item class=\"{{if(cruxAnd(ifEquals(selectedTabTraversal,'top_bottom'),ifNotEquals(selectedColumnCount,'single_column_section')),'cxPbMenuSelected','')}}\" lt-prop-disabled=\"{{disableOrder}}\" data-value=\"top_bottom\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbTopToBottomIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.mb.top.bottom.traversal')}}</lyte-menu-label> </lyte-menu-item> </lyte-menu-group> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"componentDynamic","position":[3,3,1]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,1,2]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"text","position":[1,1,5,1,1]},{"type":"componentDynamic","position":[1,1,5,1]},{"type":"componentDynamic","position":[1,1,5]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,1,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"text","position":[1,3,3,1,1]},{"type":"componentDynamic","position":[1,3,3,1]},{"type":"componentDynamic","position":[1,3,3]},{"type":"attr","position":[1,3,5]},{"type":"text","position":[1,3,5,1,1]},{"type":"componentDynamic","position":[1,3,5,1]},{"type":"componentDynamic","position":[1,3,5]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropId","cxPropType","cxSectionId","pageBuilderId","cxErrorMessage","cxPropSectionModelName","selectedColumnCount","cxSection","disableOrder","isPreview","allowedDelete","sectionDeleteDisableTitle","draggingState","lcData"],
_observedAttributesType :["string","string","string","string","string","string","string","object","boolean","boolean","boolean","string","boolean","object"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string'),
			cxPropType : Lyte.attr('string'),
			cxSectionId : Lyte.attr('string'),
			pageBuilderId : Lyte.attr('string'), 
			cxErrorMessage : Lyte.attr('string',{default : ''}),
			cxPropSectionModelName : Lyte.attr('string'), //no i18n
			selectedColumnCount : Lyte.attr('string'),
			cxSection :  Lyte.attr('object'),
			disableOrder :  Lyte.attr('boolean',{default : false}), //no i18n
			isPreview : Lyte.attr('boolean',{default : false}), //no i18n
			allowedDelete : Lyte.attr('boolean',{default : true}), //no i18n
			sectionDeleteDisableTitle : Lyte.attr('string',{default : ""}), //no i18n
			draggingState : Lyte.attr('boolean',{default : false}), //no i18n
			lcData : Lyte.attr('object')
		};
	},
	init : function(){
		Lyte.triggerEvent('cxPbAddedElement',{
			name : 'section',
			node : this.$node
		});
		this.$node.mandatoryArray = [];

		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData('cxSection',store.peekRecord('section',this.data.cxSectionId));
		this.cruxPageBuilder.updateSectionList('add',this.data.cxSection);
		this.setData("cxPropSectionModelName", this.cruxPageBuilder.cruxNode.component.data.cxPropSectionModelName);
		this.setData("isPreview", this.cruxPageBuilder.cruxNode.component.data.cxPropShowPreview);
		if(this.data.isPreview && this.data.cxSection && (this.data.cxSection.cxPropIsPreviewSupported === false || this.data.cxSection.fields.length === 0)){
			this.$node.remove();
		}
		this.$node.checkMandatory = function(field,mandatory){
			if(mandatory && this.mandatoryArray.indexOf(field) === -1){
				this.mandatoryArray.push(field);
			}else if(!mandatory){
				this.mandatoryArray.splice(this.mandatoryArray.indexOf(field),1);
			}
			if(this.mandatoryArray.length > 0){
				this.setData('allowedDelete',false);
				this.setData('sectionDeleteDisableTitle',_cruxUtils.getI18n('crm.section.remove.mandatoryfield.msg.v2'));
			}else{
				this.setData('allowedDelete',true);
				this.setData('sectionDeleteDisableTitle','');
			}
		};
		this.setData('lcData',this.$lc);
	},
	didDestroy : function(){
		delete this.cruxPageBuilder
		Lyte.removeEventListener(this.appendFieldToSection);
		Lyte.removeEventListener(this.sectionDeleteErrorEventId);
	}, 
	didConnect : function(){
		setTimeout(()=>{
			if(!this.data.cxSection.actions_allowed.reorder){
				this.$node.classList.add('lytePbRejectDrag');
			}
			if(!this.data.cxSection.actions_allowed.add_field){
				this.$node.classList.add('cxAvoidDrop');
			}

			if(this.data.cxSection.actions_allowed.rename && !this.data.isPreview){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				this.setTitleToInput(this.$node.querySelector('.cxPbTitleSection').querySelector('input'),this.data.cxSection.display_label);	
			} 
		},10);
		
		this.appendFieldToSection = Lyte.addEventListener("cxPbAppendFieldToSection",function(arg){
			if(this.data.cxSection.id === arg.section_id){
				var columns = this.$node.querySelectorAll('lyte-pb-column-template'),nodeId,columnToAppend,index;
				if(this.data.cxSection.column_count === 'double_column_section' && arg.sequenceNumber % 2 === 0){
					columnToAppend = columns[1];
					index = parseInt(arg.sequenceNumber/2)-1;
					nodeId = columns[1].getAttribute('node-id');
				}else{
					columnToAppend = columns[0];
					index = parseInt(arg.sequenceNumber/2);
					nodeId = columns[0].getAttribute('node-id');
				}
				
				this.$node.closest('lyte-page-builder').appendChildByNode(nodeId, columnToAppend, {outerHtml : {
						"node":"element",
						"tag":"crux-page-builder-element",
						"attr":{
							"data-type" : arg.field.data_type,
							"lyte-pb-static-column-span":1,
							"lyte-pb-static-type":"STATIC_ELEMENT",
							'lyte-pb-static-label' : 'Element',
							"class":" entity__item lytePbEntityItem",
							"cx-prop-type" : this.data.cxPropType,
							"cx-prop-id" : this.data.cxPropId,
							"cx-prop-field" : { id : arg.field.id}

						},
						"child":[],
						"title":"Element",
						"systemAttributes":""
					}}, index);
			}
		}.bind(this));
		this.sectionDeleteErrorEventId = Lyte.addEventListener("cxPbEventSectionDeleteError",function(arg){
			if(this.data.cxSection.id === arg.sectionId){
				if(arg.cxDeleteDisableTitle){
					this.setData('allowedDelete',false);
					this.setData('sectionDeleteDisableTitle',arg.cxDeleteDisableTitle);
				}else{
					this.setData('allowedDelete',true);
					this.setData('sectionDeleteDisableTitle',"");
				}
			}
		}.bind(this));
		var gridTemplate = this.$node.querySelector('lyte-pb-grid-template');
		if(gridTemplate){
			Lyte.Component.appendChild(this.$node.querySelector('.gridTemplateContainer'), gridTemplate);
		}else{
			// Lyte.Component.render('lyte-pb-grid-template',
			// 	{
			// 		lytePbStaticDrag : false,
			// 		lytePbStaticAddUtils : true,
			// 		lytePbStaticAddDefaultRow : true,
			// 		lytePbStaticColumn : 2,
			// 		lytePbStaticMessage : 'Drag and Drop',
			// 		lytePbStaticBasicProps :true,
			// 		lytePbStaticLayout : "moduleBuilderLayout",
			// 		lytePbStaticView : false,
			// 		pageBuilderId : this.data.pageBuilderId
			// 	},
			// 	this.$node.querySelector('.gridTemplateContainer'))
			this.$node.closest('lyte-page-builder').appendNodeInArtboard(this.$node.getAttribute('node-id'), 'appendChild', 'lyte-pb-grid-template', {outerHtml : {
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"false",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":2,
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true',
					"lyte-pb-static-layout" : "moduleBuilderLayout"
				}},
				"title":"",
				"systemAttributes":""
			}, undefined, this.$node.querySelector('.gridTemplateContainer'));
		}
	},
	actions : {
		newSectionClick : function(){
			Lyte.triggerEvent('cxPbAddElements',{
				name : 'section',
				node : this.$node
			});
		},
		sectionDelete : function(deleteBtn){
			if(deleteBtn.classList.contains('cxPbDisabled')){
				return;
			}
			var ch = true;
			if(this.getMethods('cxPbBeforeSectionDelete')){
				ch = this.executeMethod('cxPbBeforeSectionDelete',this.data.cxSection);
			}
			if(ch){
				Lyte.triggerEvent('cxPbDeleteElements',{
					name : 'section',
					node : this.$node
				});
			}
		}
	},
	methods : {
		sectionLabelChange : async function(comp,value){
			var errorMessage="";
   			this.$node.classList.remove('cxPbElementErrorDiv');
   			this.setData('cxErrorMessage',"");
   			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.empt'); 
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.splc');
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.sykw');
			} 

			let field_labels = this.cruxPageBuilder.cruxNode.component.section_field_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== this.data.cxSection.display_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.dplk');
			}
			if(errorMessage){
				this.setData('cxErrorMessage',errorMessage);
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id,errorMessage);
				return;
			}
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',this.data.cxSection,'display_label',value,this.data.cxSection.display_label);
				if(ch &&  typeof ch.then === "function"){
					ch = await ch;
				}
				if((typeof ch === 'object' && ch.type === 'error')){
					this.setData('cxErrorMessage',ch.message);
					this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id,ch.message);
					return;
				}
			}
			if(ch){
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id);
				this.data.cxSection.$.set('display_label',value);
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxSection,'display_label',value);
				}
				this.setTitleToInput(comp.querySelector('input'),value);
			}
		},
		sectionSettingMenuBeforeOpen : function(){
			this.$node.classList.add('cxPbElementActiveSection');
			var section = this.data.cxSection;
			if(section){
				this.setData({selectedColumnCount : section.column_count,selectedTabTraversal : section.tab_traversal});
				if(section.column_count ===  "single_column_section"){
					this.setData("disableOrder", true);
					this.$node.classList.add('cxPbSingleColElemSection');
				}else{
					this.setData("disableOrder", false);
				}
			}
		},
		sectionSettingsMenuClose : function(){
			this.$node.classList.remove('cxPbElementActiveSection');
		},
		onSectionSettingClicked : function(column_value){
			var section = this.data.cxSection;
			if(section){
				if(column_value === 'single_column_section' || column_value === 'double_column_section'){
					section.$.set('column_count', column_value);
					this.setData('selectedColumnCount',column_value);
					if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
						this.cruxPageBuilder.executeMethod('cxPbPropertyChange',section,'column_count',column_value);
					}
					if(column_value ===  "single_column_section"){
						this.setData("disableOrder", true);
						this.$node.classList.add('cxPbSingleColElemSection');
					}else{
						this.setData("disableOrder", false);
					}
					this.$node.querySelector('lyte-pb-grid-template').component.setData('lytePbStaticColumns',column_value === 'single_column_section' ? '1' : '2');
				}else{
					section.$.set('tab_traversal', column_value);
					this.setData('selectedTabTraversal',column_value);
					if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
						this.cruxPageBuilder.executeMethod('cxPbPropertyChange',section,'tab_traversal',column_value);
					}
				}
				
			}	
		},
		searchSubformPanelField : function(result){
			this.setData('noFieldsFound',result.length === 0);
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

Lyte.Component.register("crux-page-builder-subform-aggregate", {
_template:"<template tag-name=\"crux-page-builder-subform-aggregate\"> </template>",
_dynamicNodes : [],

	data : function(){
		return {

		};		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("crux-page-builder-subform-elements", {
_template:"<template tag-name=\"crux-page-builder-subform-elements\" class=\"cxPbSubformElements\"> <lyte-tabs class=\"cxOuterTab cxPbSubformElemTab\" lt-prop-height=\"100%\" on-open=\"{{method(&quot;tabOpen&quot;)}}\"> <template is=\"registerYield\" yield-name=\"tabYield\" class=\"test111\"> <lyte-tab-head> <lyte-tab-title lt-prop-id=\"subformField\">{{cruxGetI18n('crm.label.subform.newField')}}</lyte-tab-title> <template is=\"if\" value=\"{{showLookupField}}\"><template case=\"true\"> <lyte-tab-title lt-prop-id=\"lookupFields\">{{cruxGetI18n('crm.label.subform.field.lookup.module')}}</lyte-tab-title> </template></template> </lyte-tab-head> <lyte-tab-body> <lyte-tab-content id=\"subformField\"> <div class=\"cxPbSubformFieldSearch\"> <lyte-search class=\"cxPbSubformPanelInput\" lt-prop-value=\"{{lbind(searchText)}}\" on-search=\"{{method('searchSubformPanelField')}}\" lt-prop-maxlength=\"50\" lt-prop-close-icon=\"true\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxPbSubformFieldContWrapper{{cxSubformSection.id}}&quot; , &quot;search&quot; : &quot;.cxPbSubformFieldLabel&quot;, &quot;target&quot; : &quot;.cxPbSubformFieldCont&quot;,&quot;related&quot; : &quot;.cxPbSubformHeadingSpan&quot; }\" lt-prop-aria-label=\"Field Search\" data-zcqa=\"cxPbQc_Field_Search\" lt-prop-placeholder=\"{{cruxGetI18n('crm.label.search')}}\"></lyte-search> </div> <div class=\"cxPbSubformFieldContWrapper{{cxSubformSection.id}}\"> <template is=\"forIn\" object=\"{{cxPropAvailableFields}}\" value=\"sec\" key=\"key\"> <span class=\"cxPbSubformHeadingSpan\"> <template is=\"if\" value=\"{{checkPanelShow(sec)}}\"><template case=\"true\"><div class=\"cxPbSubformFieldsHeading\">{{sec.cxPropLabel}}</div></template></template> <template is=\"for\" items=\"{{sec.cxPropAvailableFields}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.hideInLeftPanel,'!'),'&amp;&amp;',item.subform_support)}}\"><template case=\"true\"> <div data-cx-pb-element-value=\"{{item.data_type}}\" onclick=\"{{action('addFieldInSubform',item)}}\" onmouseenter=\"{{action('disabledTooltip',this,item.data_type)}}\" onmouseleave=\"{{action('disabledTooltip',this,item.data_type,true)}}\" @class=\"{{if(disabledFields[item.data_type],'cxPbLeftElemDisable','')}} {{item.wrapperClass}} cxPbSubformFieldCont\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(item.data_type)}}Icon\"></span> <lyte-text lt-prop-value=\"{{item.display_label}}\" class=\"cxPbSubformFieldLabel\"></lyte-text> </div> </template></template> </template> </span> </template> </div> <template is=\"if\" value=\"{{noFieldsFound}}\"><template case=\"true\"> <div class=\"cxPbSubformFldNotFoundMsg\">{{cruxGetI18n('crm.import.no.fields.found')}}</div> </template></template> </lyte-tab-content> <template is=\"if\" value=\"{{showLookupField}}\"><template case=\"true\"> <lyte-tab-content id=\"lookupFields\"> <div class=\"cxPbSubformFieldSearch\"> <lyte-search class=\"cxPbSubformPanelInput\" lt-prop-value=\"{{lbind(searchText)}}\" on-search=\"{{method('searchSubformPanelField')}}\" lt-prop-maxlength=\"50\" lt-prop-close-icon=\"true\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxPbSubformFieldContWrapper&quot; , &quot;search&quot; : &quot;.cxPbSubformFieldLabel&quot;, &quot;target&quot; : &quot;.cxPbSubformFieldCont&quot;,&quot;related&quot; : &quot;.cxPbSubformFieldsHeading&quot; }\" lt-prop-aria-label=\"Field Search\" data-zcqa=\"cxPbQc_Field_Search\" lt-prop-placeholder=\"{{cruxGetI18n('crm.label.search')}}\"></lyte-search> </div> <div class=\"cxPbSubformFieldContWrapper\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxCriteriaInitialLoaderWrap\"> <span class=\"cxCriteriaScrollLoaderIcon\"></span> </div> </template><template case=\"false\"> <template is=\"for\" items=\"{{lookupFields}}\" item=\"item\" index=\"index\"> <div class=\"cxPbSubformFieldsHeading\">{{item.display_label}}</div> <template is=\"for\" items=\"{{item.fields}}\" item=\"field\" index=\"index\"> <div class=\"cxPbSubformFieldCont\" onclick=\"{{action('onLookupFieldClicked',field)}}\"> <span class=\"cxPbSprite cxPb{{cruxCapitalize(field.data_type)}}Icon\"></span> <lyte-text lt-prop-value=\"{{field.field_label}}\" class=\"cxPbSubformFieldLabel\"></lyte-text> </div> </template> </template> </template></template> </div> <template is=\"if\" value=\"{{noFieldsFound}}\"><template case=\"true\"> <div class=\"cxPbSubformFldNotFoundMsg\">{{cruxGetI18n('crm.import.no.fields.found')}}</div> </template></template> </lyte-tab-content> </template></template> </lyte-tab-body> </template> </lyte-tabs> <lyte-hovercard lt-prop-placement=\"bottomLeft topLeft\" lt-prop-keep-alive=\"true\" id=\"subformFieldDisableTooltip_{{cxSubformSection.id}}\" lt-prop-origin-elem=\".cxDisableHovercard_{{cxSubformSection.id}}\" on-hovercard-hide=\"{{methods('hoverCardHide')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> {{unescape(cxPropDisableContent)}} </lyte-hovercard-content> </template> </lyte-hovercard> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[3,1,3,1]},{"type":"forIn","position":[3,1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]}]},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropAvailableFields","lookupFields","cxPropId","showLookupField","searchText","noFieldsFound","cxSubformSection","disabledFields"],
_observedAttributesType :["object","array","string","boolean","string","boolean","object","object"],

	data : function(){
		return {
			cxPropAvailableFields : Lyte.attr('object'),
			lookupFields : Lyte.attr('array',{default : [{name : 'Single Line',data_type : 'text',iconClass:"SingleLine"},{name : 'Multi Line',data_type : 'textarea',iconClass:"MultiLine"},{name : 'Email',data_type : 'email',iconClass:"Email"},{name : 'Phone',data_type : 'phone',iconClass:"Phone"},{name : 'Picklist',data_type : 'picklist',iconClass:"Picklist"},{name : 'Multi-Select',data_type : 'multiselect',iconClass:"MultiSelect"},{name : 'Date',data_type : 'date',iconClass:"Date"},{name : 'Date/Time',data_type : 'date-time',iconClass:"DateTime"},{name : 'Number',data_type : 'number',iconClass:"Number"},{name : 'AutoNumber',data_type : 'autonumber',column_span : 2,iconClass:"AutoNumber"},{name : 'Currency',data_type : 'currency',iconClass:"Currency"},{name : 'Decimal',data_type : 'decimal',iconClass:"Decimal"},{name : 'Percent',data_type : 'Percent',iconClass:"Percent"},{name : 'Long Integer',data_type : 'number',iconClass:"LongInteger"},{name : 'Checkbox',data_type : 'boolean',iconClass:"Checkbox"},{name : 'URL',data_type : 'website',iconClass:"Url"}]}),
			cxPropId : Lyte.attr('string'), //no i18n
			showLookupField : Lyte.attr('boolean'),
			searchText : Lyte.attr('string',{default : ""}), //no i18n
			noFieldsFound : Lyte.attr('boolean',{default : false}), //no i18n
			cxSubformSection : Lyte.attr('object'), //no i18n
			disabledFields : Lyte.attr('object',{default : {}}) //no i18n
		};		
	},
	init : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData('cxPropAvailableFields',this.cruxPageBuilder.cruxNode.component.data.availableFields);
	},
	didConnect : function(){
		this.modifySubformAvailableField = Lyte.addEventListener('cxPbModifySubformAvailableField',(opt)=>{
			if(opt.disabled){
				Lyte.objectUtils(this.data.disabledFields,'add',opt.data_type,opt);
			}else{
				Lyte.objectUtils(this.data.disabledFields,'delete',opt.data_type);
			}
		})
	},
	actions : {
		// Functions for event handling
		addFieldInSubform : function(item){
			this.executeMethod('addFieldMenuClick',item);
			// this.data.pbUtils.addElementToArtboard('Element',this.data.parentNode.getAttribute('node-id'),{cxPropField : {field_label : 'asd'}},this.data.handleElement,item)
		},
		onLookupFieldClicked : function(item){
			this.executeMethod('addFieldMenuClick',item,true);
		},
		disabledTooltip : function(node,data_type,hide){
			if(this.data.disabledFields[data_type]){
				if(!this.disabledHoverCard){
					this.disabledHoverCard = this.$node.querySelector('#subformFieldDisableTooltip_'+this.data.cxSubformSection.id);
				}
				if(hide){
					node.classList.remove('cxDisableHovercard_'+this.data.cxSubformSection.id);
					this.setData('cxPropDisableContent','')
					this.disabledHoverCard.ltProp('show',false);
				}else if(this.data.disabledFields[data_type].tooltip){
					this.setData('cxPropDisableContent',this.data.disabledFields[data_type].tooltip);
					node.classList.add('cxDisableHovercard_'+this.data.cxSubformSection.id);
					this.disabledHoverCard.ltProp('show',true);
				}
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		tabOpen : function(){
			this.setData('noFieldsFound',false);
			this.setData('searchText',"");
		},
		searchSubformPanelField : function(result){
			this.setData('noFieldsFound',result.length === 0);
		}
	},
	observeLookupFields : function(){
		if(this.data.lookupFields.length){
			this.setData('showLoading',false);
		}else{
			this.setData('showLoading',true);
		}
	}.observes('lookupFields.[]').on('init'),
});
Lyte.Component.registerHelper('checkPanelShow',(avlFld)=>{
	var check = false;
	avlFld.cxPropAvailableFields.forEach((item)=>{
		if(!item.hideInLeftPanel && item.subform_support){
			check =  true;
		}
	});
	return check;
});

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


Lyte.Component.register("crux-page-builder", {
_template:"<template tag-name=\"crux-page-builder\" class=\"cxPbWrapper dd\"> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxPbEventOpenPropertiesPanel\" on-fire=\"{{action('openProperties')}}\"></lyte-event-listener> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxPbAddElements\" on-fire=\"{{action('addElements')}}\"></lyte-event-listener> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxPbDeleteElements\" on-fire=\"{{action('deleteElements')}}\"></lyte-event-listener> <lyte-event-listener @hide-tag=\"true\" event-name=\"cxPbAddedElement\" on-fire=\"{{action('addedElement')}}\"></lyte-event-listener> <lyte-page-builder lt-prop-user-config=\"{{ltPropUserConfig}}\" lt-prop-page-builder-template=\"{{metaData}}\" on-before-element-drop=\"{{method('onBeforeElementDrop')}}\" on-scroll-art-board=\"{{method('onBuilderScroll')}}\" on-place-holder-show=\"{{method('onBuilderShowPlaceholder')}}\" on-titled-template-header-value-change=\"{{method('titleChange')}}\" on-before-element-append=\"{{method('onBeforeElementAppend')}}\" before-render=\"{{method('pageBuilderBeforeRender')}}\" drag-helper=\"{{method('dragHelperBuilder')}}\" on-start-drag=\"{{method('pageBuilderDragStart')}}\" on-before-place-holder-show=\"{{method('onBeforeShowPlaceholder')}}\" on-drag-start=\"{{method('dragStartMt')}}\" on-leave-for-element-drop=\"{{method('removePlaceHolder')}}\" on-after-artboard-loaded=\"{{method('afterRender')}}\" on-after-artboard-reset=\"{{method('afterRender')}}\"></lyte-page-builder> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','standard')}}\"><template case=\"true\"> <crux-page-builder-properties class=\"cxPbProperties\" property-methods=\"{{method('propertyMethods')}}\" cx-prop-field-property-json=\"{{propertiesJson}}\" cx-prop-section-model-name=\"{{cxPropSectionModelName}}\" cx-prop-profiles=\"{{cxPropProfiles}}\" cx-prop-id=\"{{cxPropId}}\" property-rules=\"{{propertyRules}}\" cx-prop-module=\"{{cxPropModule}}\"></crux-page-builder-properties> </template></template> <lyte-beta-modal id=\"lytePreviewModal\" lt-prop-show=\"{{lbind(cxPropShowPreview)}}\" lt-prop-prevent-focus=\"true\" lt-prop-width=\"{{if(ifEquals(cxPropType,'standard'),'80%','720px')}}\" lt-prop-max-height=\"90%\" lt-prop-height=\"auto\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0px&quot;,&quot;left&quot;:&quot;center&quot;}\" lt-prop-allow-multiple=\"true\" on-close=\"{{method('onPreviewClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"cxFlex cxAlignItemCenter cxFlexSpaceBtwn cxPbPreviewModalHeader\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','standard')}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{cruxGetI18n('crm.module.create',cxPropModule)}}\"></lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{cruxGetI18n(&quot;crm.quickcreate.title&quot;)}} &quot;{{cxPropModule}}&quot;\"></lyte-text> </template></template> <div class=\"cxPbPreviewProfileDDWrap\"> <div class=\"cxPbPreviewProfileLabel\">Layout</div> <lyte-dropdown class=\"cxPbPreviewProfileDD\" on-change=\"{{method('onProfileChange',this)}}\" lt-prop-selected=\"{{lbind(selectedPreviewProfile)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropProfiles}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.name}}\">{{item.name}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </lyte-modal-header> <lyte-modal-content class=\"cxPbPreviewModalContent\"> <div id=\"preview_node_{{cxPropId}}\" class=\"{{if(showPreviewLoading,'cxHide','')}}\"> </div> <div class=\"cxPbPrevModalLoader {{if(showPreviewLoading,'','cxHide')}}\"> <div class=\"cxBarLoader cxPbBarLoader\"> <div class=\"cxBarLoader1\"></div> <div class=\"cxBarLoader2\"></div> <div class=\"cxBarLoader3\"></div> </div> </div> </lyte-modal-content> </template> </lyte-beta-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"trans":true},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3],"trans":true},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5],"trans":true},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7],"trans":true},{"type":"componentDynamic","position":[7]},{"type":"attr","position":[9]},{"type":"componentDynamic","position":[9]},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[13]},{"type":"registerYield","position":[13,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"registerYield","position":[1,3,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[13]}],
_observedAttributes :["ltPropUserConfig","sectionNavigatorData","cxPropTemplateJson","cxPropLayoutModelName","cxPropSectionModelName","cxPropFieldModelName","cxPropFieldPropertyJson","cxPropProfiles","cxPropUnusedFields","propertyRules","cxPropShowUnusedFields","cxPropLeftPanelFooterComponent","cxPropLeftPanelFooterComponentData","cxPropArtboardHeaderComponent","cxPropArtboardHeaderComponentData","cxPropType","cxPropQuickCreateSections","cxPropId","sequenceNumberOperations","cxPropIsLeftPanelRequired","cxPropExtraMetaDataDefinition","cxPropModule","cxPropFieldSpecialMetaKeys","cxPropPreviewEnableFields","cxPropCustomizableFieldMetaMapping","cxPropRightPanelDisable","cxPropFieldLabelRegex","cxPropShowPreview","cxPropFieldLabelIterator","cxPropQuickCreateUsedFields","selectedPreviewProfile","cxPropDataTypeMappingIcons","cxPropUserDetails","cxPropEditableFieldLabelElement","cxPropSpecialFieldPreviewComponent","cxPropFieldTypeCustomWidth","cxPropOtherModuleSubformList","cxPropSpecialFieldsApiName","cxPropCustomSmallWidthDataTypes"],
_observedAttributesType :["object","array","object","string","string","string","object","array","array","object","boolean","string","object","string","object","string","array","string","array","boolean","object","string","object","array","object","boolean","string","boolean","object","array","string","object","object","boolean","string","object","array","object","array"],

	data : function(){
		return {
			ltPropUserConfig: Lyte.attr('object', { default: {} }),
			sectionNavigatorData:Lyte.attr('array',{default:[]}),
			cxPropTemplateJson : Lyte.attr('object'),
			cxPropLayoutModelName : Lyte.attr('string',{default : 'layout'}),
			cxPropSectionModelName : Lyte.attr('string',{default : 'section'}),
			cxPropFieldModelName : Lyte.attr('string',{default : 'field'}),
			cxPropFieldPropertyJson : Lyte.attr('object'),
			cxPropProfiles : Lyte.attr('array',{default : [{name : 'Administrator',id : '111111000000000493'},{name : 'Standard12',id : '111111000000000495'}]}),
			cxPropUnusedFields : Lyte.attr('array',{default : []}), //no i18n
			propertyRules : Lyte.attr('object'), //no i18n
			cxPropShowUnusedFields : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropLeftPanelFooterComponent : Lyte.attr('string'),
			cxPropLeftPanelFooterComponentData : Lyte.attr('object'), //no i18n
			cxPropArtboardHeaderComponent : Lyte.attr('string',{default : 'span'}), //no i18n
			cxPropArtboardHeaderComponentData : Lyte.attr('object'),
			cxPropType : Lyte.attr('string',{default : 'standard'}), //no i18n
			cxPropQuickCreateSections : Lyte.attr('array',{default : []}), //no i18n
			cxPropId : Lyte.attr('string'), //no i18n
			sequenceNumberOperations : Lyte.attr('array',{default : []}), //no i18n
			cxPropIsLeftPanelRequired : Lyte.attr('boolean',{default : true}),
			cxPropExtraMetaDataDefinition : Lyte.attr('object',{default : {}}), //no i18n
			cxPropModule : Lyte.attr('string'), //no i18n
			cxPropFieldSpecialMetaKeys : Lyte.attr('object',{default : {cxMandatory : 'required',cxEncrypt : 'crypt',  cxPersonal: 'personal_data', cxPersonalHealth : 'personal_health_data', cxUnique : 'unique'}}),
			cxPropPreviewEnableFields :  Lyte.attr('array',{default : ["sliding_scale","tooltip"]}), //no i18n
			cxPropCustomizableFieldMetaMapping : Lyte.attr('object',{default : {}}), //no i18n
			cxPropRightPanelDisable : Lyte.attr('boolean',{default : false}),//no i18n
			cxPropFieldLabelRegex : Lyte.attr('string'),//no i18n
			cxPropShowPreview : Lyte.attr('boolean',{default : false}),
			cxPropFieldLabelIterator : Lyte.attr('object',{default : {}}), //no i18n
			cxPropQuickCreateUsedFields : Lyte.attr('array',{default : []}), //no i18n
			selectedPreviewProfile : Lyte.attr('string'), //no i18n
			cxPropDataTypeMappingIcons : Lyte.attr('object'), //no i18n
			cxPropUserDetails : Lyte.attr('object',{default : typeof Crm !== "undefined" ? Crm.userDetails : {}}),
			cxPropEditableFieldLabelElement : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropSpecialFieldPreviewComponent : Lyte.attr('string'), //no i18n
			cxPropFieldTypeCustomWidth : Lyte.attr('object', {default : {"text" : 265, "date" : 265 , "email" : 265, "textarea" : 365,"phone" : 265,"picklist" : 265, "multiselect" : 265, "date-time" : 265, "number" : 265, "autonumber" : 265, "currency" : 265, "boolean" : 265, "website" : 265}}),
			cxPropOtherModuleSubformList : Lyte.attr('array'),
			cxPropSpecialFieldsApiName : Lyte.attr('object',{default : {}}), //no i18n
			cxPropCustomSmallWidthDataTypes : Lyte.attr('array') //no i18n 
		};
	},
	init : function(){
		this.$node.getSequenceNumberOperations = function(){
			var op = Lyte.deepCopyObject(this.component.data.sequenceNumberOperations),output = [],opLength = op.length;
			for(var i = 0;i < opLength;i++){
				var item = Object.assign({},op[i]);
				if(output[output.length - 1] && output[output.length - 1].section && output[output.length - 1].section.id === item.section.id && !item.sequence_number && output[output.length - 1].section_field){
					output[output.length - 1].section_field.push(item.section_field[0]);
				}else{
					output.push(item);
				}
				
			}
			return output;
		};

		this.$node.cxPbUtilDroppableEnable = function(check){
			var pageBuidlerNode = this.querySelector('lyte-page-builder');
			if(check){
				pageBuidlerNode.enableDroppable();
			}else{
				pageBuidlerNode.disableDroppable();
			}
		};

		this.$node.cxCheckAndClosePropperties = function(){
			if(this.getData('cxPropEditableFieldLabelElement')){
				var error = Object.keys(this.component.errorProperties)
				if(error.length > 0){
					Lyte.triggerEvent('cxPbEventInfoErrorFieldEvent',{id : error[0],type : 'error',focus : true,cxMessage : this.component.errorProperties[error[0]]})
					Lyte.triggerEvent('cxPbFieldHighlight',{field_id : error[0]})
					return false
				}
				return true;
			}
			return this.component.propertiesPanel.checkAndClosePropperties();
		};

		this.$node.getOutput = function(){
			return this.querySelector('lyte-page-builder').getOutput();
		};

		this.$node.cxPbUtilDisableLeftPanelField = function(fieldType){
			Lyte.triggerEvent('modifyLeftPanelField',{
				type : 'disabled',
				fieldType : fieldType
			});
		};

		this.$node.cxPbUtilEnableLeftPanelField = function(fieldType){
			Lyte.triggerEvent('modifyLeftPanelField',{
				type : 'enabled',
				fieldType : fieldType
			});
		};


		if(!this.data.cxPropId){
			var a = 1;
			while($L('.cxPbUniqueClass' + a).length > 0){ //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
				a++;
			}
			this.setData('cxPropId',a);
		}
		this.$node.classList.add('cxPbUniqueClass' + this.data.cxPropId);
		Object.defineProperty(CruxCommonBuilder.prototype,'cruxNode' + this.data.cxPropId,{
			value:this.$node,
			 configurable: true
		});

		this.cxFieldLabelIterator = {};
		this.leftPanelRenderEvent = Lyte.addEventListener('cxPbLeftPanelRendered',function(obj){
			this.leftPanelNode = obj.node;
		}.bind(this));
		
		this.updateSectionProperty = Lyte.addEventListener('cxPbEventSectionUpdate',function(obj){
		if(obj.key === 'display_label'){
				try{
					this.$node.querySelector('crux-page-builder-section[cx-section-id="' + obj.section.id + '"]').querySelector('lyte-pb-titled-template').setData('lytePbStaticTitle',obj.value);
				}catch(e){
					murphy.error(e);
				}
			}
		}.bind(this));

		this.errorProperties={};
		this.field_label_list = [];
		this.section_field_list=[];
		this.quick_create_field_list = [];
		this.field_label_list = this.data.cxPropUnusedFields.map(obj => obj.field_label);

		
		var rules = {
			email : {
				keys : ['crypt','unique'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique']
					}
				]
			},
			phone : {
				keys : ['crypt','unique'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique']
					}
				]
			},
			integer: {
				keys : ['crypt','unique','limit_values','sliding_scale'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique']
					},
					{
						type : 'checked',
						properties : ['sliding_scale','limit_values']
					},
					{
						type : 'unchecked',
						properties : ['sliding_scale','limit_values']
					}
				]
			},
			longinteger : {
				keys : ['crypt','unique'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique']
					}
				]
			},
			text : {
				keys : ['crypt','unique','external','required','tool_tiptype'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique','external']
					},
					{
						type : 'disable',
						properties : ['required','external']
					},
					{
						type : 'options_change',
						properties : ['tool_tiptype', 'tool_tipcontent']
					}
				]
			},
			website : {
				keys : ['crypt','unique','length'],
				rules : [
					{
						type : 'disable',
						properties : ['crypt','unique']
					},
					{
						type : 'disable',
						properties : ['length','unique'],
						condition_value : 255,
						condition : '<'
					}
				]
			},
			currency : {
				keys : ['length','decimal_place','precision'],
				rules : [
					{
						type : 'options_change'	,
						properties : ['length','decimal_place']
					},
					{
						type : 'options_change'	,
						properties : ['decimal_place','precision']
					}
				]
			},
			decimal : {
				keys : ['length','decimal_place'],
				rules : [
					{
						type : 'options_change'	,
						properties : ['length','decimal_place']
					}
				]
			},
			textarea : {
				keys : ['length'],
				rules : [
					{
						type : 'hide',
						properties : ['length','crypt'],
						condition_value : 32000,
						condition : '=='
					}
				]
			},
			userlookup : {
				keys : ['field_type'],
				rules : [
					{
						type : 'hide',
						properties : ['field_type','required','lookup_filter','field_of_lookup'],
						condition_value : 'multiple_users',
						condition : '=='
					}
				]
			},
			multiselectlookup :  {
				keys : ['multiselectlookup.module'],
				rules : [
					{
						type : 'hide',
						properties : ['multiselectlookup.module','multiselectlookup.connectedfield_apiname','multiselectlookup.layout_value','show_linking_module','relatedlist_name','personal_data','personal_health_data'],
						condition_value : 'select_module',
						condition : '=='
					}
				]
			}
		};

		if(this.getMethods('cxPbChangePropertyRules')){
			rules = this.executeMethod('cxPbChangePropertyRules',rules);
		}
		this.setData('propertyRules',rules);

		var {properties,availableFields} = this.processFieldPropertyJson();
		this.setData('propertiesJson',properties);

		const basePathForPageBuilder = "/dist/addons/@zoho/lyte-static-page-builder/static";
		const metaDataRegister = Object.assign(this.data.cxPropExtraMetaDataDefinition,{
			'Element' :{
				title: 'Element',
				templates : {
					staticBuilder : {
						html : [
							'<crux-page-builder-element cx-prop-id=' + this.data.cxPropId + ' cx-prop-type=' + this.data.cxPropType + '>',
							'</crux-page-builder-element>'
						].join('')
					}
				},
				properties : {'cxPropField' : {}},
				customElements : [
					'crux-page-builder-element'
				],
				groupName :'Templates',
				skipCssBlock : true
			},
			'Section' :{
				title: 'Section',
				templates : {
					staticBuilder : {
						html : [
							'<crux-page-builder-section cx-prop-id=' + this.data.cxPropId + ' class="cxPbElementSection">', //NO I18n
							'</crux-page-builder-section>'
						].join('')
					}
				},
				customElements : [
					'crux-page-builder-section',
					'lyte-pb-row-template',
					'lyte-pb-titled-template',
					'lyte-pb-grid-template'
				],
				groupName :'Templates',
				properties: {
					'cx-section-id': ""
				}
			},
			'lyte-pb-grid-template' :{
				title: 'Grid',
				templates : {
					staticBuilder : {
						html : [
							'<lyte-pb-grid-template lyte-pb-static-drag="false" lyte-pb-static-layout="moduleBuilderLayout" lyte-pb-static-columns="2">', //NO I18n
							'</lyte-pb-grid-template>'
						].join('')
					}
				},
				customElements : [
					'crux-page-builder-section',
					'lyte-pb-row-template',
					'lyte-pb-titled-template',
					'lyte-pb-grid-template'
				],
				groupName :'Templates',
				properties: {
					'cx-section-id': ""
				}
			},
			'Subform' :{
				title: 'Element',
				templates : {
					staticBuilder : {
						html : [
							'<crux-page-builder-subform cx-prop-id=' + this.data.cxPropId + ' class="cxPbElementSection">',
							'</crux-page-builder-subform>'
						].join('')
					}
				},
				properties : {'cxPropField' : {}},
				customElements : [
					'crux-page-builder-subform',
					'lyte-pb-titled-template',
					'lyte-pb-subform'
				],
				groupName :'Templates'
			},
			'RecordImage' : {
				title : 'RecordImage',
				templates : {
					staticBuilder : {
						html : [
							'<crux-page-builder-record-image cx-prop-id=' + this.data.cxPropId + ' class="cxPbImageSection" style="display: flex;"></crux-page-builder-record-image>'
						].join('')
					}
				},
				properties : {'cxPropField' : {}},
				customElements : [
					'crux-page-builder-record-image',
					'crux-page-builder-subform',
					'lyte-pb-titled-template'
				],
				groupName :'Templates'
			},
			'DummyDiv' : {
				title : 'DummyDiv',
				templates : {
					staticBuilder : {
						html : [
							'<div class="cxPbQuickCreateSection lytePbRejectDrag"></div>'
						].join('')
					}
				},
				groupName :'Templates'
			}
		});
		// metaDataRegister.Default = {
		// 	title : 'Default',
		// 	// templates : {
		// 		// staticBuilder : {
		// 			// outerHtml : {"node":"root","child":[{"node":"element","tag":"crux-page-builder-section","attr":{"node-id":"static-node-67f-63-152","class":"cxPbElementSection entity__item","cx-section-id":"2865","lyte-pb-static-type":"STATIC_TEMPLATE"},"child":[{"node":"element","tag":"span","attr":{"node-id":"templateNode_c2-a0-c2","class":"cxPbElemSecActionIcons"},"child":[{"node":"element","tag":"span","attr":{"node-id":"templateNode_31-42-c8","id":"sectionToolbar","data-cx-builder-output":"remove","class":"cxPbElemSecActionIconWrapper"},"child":[{"node":"element","tag":"i","attr":{"node-id":"templateNode_75-52-12","class":"cxPbSprite cxPbSettingsIcon"},"child":[],"title":"","systemAttributes":""}],"title":"","systemAttributes":""},{"node":"element","tag":"span","attr":{"node-id":"templateNode_20-64-06","class":"cxPbElemSecActionIconWrapper"},"child":[{"node":"element","tag":"i","attr":{"node-id":"templateNode_89-2a-14","class":"cxPbSprite cxPbDeleteIcon"},"child":[],"title":"","systemAttributes":""}],"title":"","systemAttributes":""}],"title":"","systemAttributes":""},{"node":"element","tag":"lyte-pb-titled-section","attr":{"node-id":"templateNode_64-b7-b2","lyte-pb-static-columns":"2","data-cx-builder-output":"div","data-cx-builder-output-class":"sectionColumn","lyte-pb-static-message":"Drag and Drop","lyte-pb-static-drop":"true"},"child":[{"node":"element","tag":"lyte-pb-row-template","attr":{"node-id":"templateNode_a8-32-64","lyte-pb-static-drag":"false","lyte-pb-static-option":"combine","lyte-pb-static-columns":2,"lyte-pb-static-ratio":"6:6","lyte-pb-static-message":"Drag and Drop"},"child":[{"node":"element","tag":"lyte-pb-column-template","attr":{"node-id":"templateNode_01-62-38","class":"lytePbColumnItem","lyte-pb-static-drop":"true"},"child":[{"node":"element","tag":"crux-page-builder-element","attr":{"node-id":"static-node-023-03-460","cx-prop-field":{"field_label":"Single Line 1","custom_field":true,"id":"6417","modelName":"field"},"cx-mapping":"text","lyte-pb-static-type":"STATIC_ELEMENT","class":" entity__item"},"child":[],"title":"Element","systemAttributes":""}],"title":"","systemAttributes":""},{"node":"element","tag":"lyte-pb-column-template","attr":{"node-id":"templateNode_33-20-34","class":"lytePbColumnItem","lyte-pb-static-drop":"true"},"child":[],"title":"","systemAttributes":""}],"title":"","systemAttributes":""}],"title":"","systemAttributes":""},{"node":"element","tag":"span","attr":{"node-id":"templateNode_10-44-31","class":"cxPbNewSectionBtn"},"child":[{"node":"element","tag":"span","attr":{"node-id":"templateNode_92-97-e9","class":"cxPbSprite cxPbPlusIcon"},"child":[],"title":"","systemAttributes":""},{"node":"text","text":"New Section","title":""}],"title":"","systemAttributes":""}],"title":"Section","systemAttributes":""}]}
		// 			outerHtml : CruxPageBuilder.templateJSONConvertFunction(sectionsArray)
		// 		// }
		// 	// }
		// }
		this.data.cxPropQuickCreateUsedFields.forEach((field)=>{
			this.quick_create_field_list.push(field.id);
		});
		this.loadingTemplate = { node : 'root',child : [{
				node : 'element',"tag":"div","attr":{"class":"cxBarLoader cxPbBarLoader"},
				child:[
					{
						node:'element',
						tag:'div',
						"attr":{"class":"cxBarLoader1"}
					},
					{
						node:'element',
						tag:'div',
						"attr":{"class":"cxBarLoader2"}
					},
					{
						node:'element',
						tag:'div',
						"attr":{"class":"cxBarLoader3"}
					}
				]
			}]};
		this.setData('metaData',metaDataRegister);
		var loading = false;
		if(!this.data.cxPropTemplateJson){
			this.setData('cxPropTemplateJson',this.loadingTemplate);
			loading = true;
		}
		this.setData('ltPropUserConfig',{
			// edition: edition,
			// dataModal: {
			// 	closeOnDataAddition: true
			// },
			// forceInitialViewToDashboard: true,
			// theme: 'light-theme',
			draggableConfiguration: {
				threshold: 10,
				userSelect: true,
				containment : `[cx-prop-id="${this.data.cxPropId}"] .cxPbDropAreaContainer`,
				aria : true,
				scrollDivY : '.cxPbDropAreaContainer',
				scrollDivX : null,
				scrollSpeed : 5
			},
			basePath: basePathForPageBuilder,
			dependencies: {},
			leftPanel: this.data.cxPropIsLeftPanelRequired,
			loadWithTemplates: this.data.cxPropTemplateJson,
			// loadTemplateWithLayout: false,
			// metaData: metaDataRegister,
			rightPanel : false,
			placeholderConfiguration : {
 				class : 'cxPbElementPlaceholder'
			},
			// rightPanelConfiguration: {
			// 	componentName: "lyte-pb-right-panel",
			// 	data: {},
			// },
			leftPanelConfiguration: {
				componentName: "crux-page-builder-left-panel",//"crux-page-builder-left-panel",//"left-panel-comp",
				data: {cxPropAvailableFields: availableFields,cxPropUnusedFields : this.data.cxPropUnusedFields,cxPropShowUnusedFields : this.data.cxPropShowUnusedFields,cxPropFooterComponent : this.data.cxPropLeftPanelFooterComponent,cxPropFooterComponentData : this.data.cxPropLeftPanelFooterComponentData,cxPropType : this.data.cxPropType,cxPropQuickCreateSections : this.data.cxPropQuickCreateSections,cxPropId : this.data.cxPropId,droppedList : this.quick_create_field_list}
			},
			elementPanelConfiguration : {
				componentName : "crux-page-builder-subform-elements",
				data : {}
			},
			artboardTemplateConfig: {
				name: "templateName",
				html: `<div class="cxPbTemplateLayout">
							<div class="cxPbTemplateHeader"><${this.data.cxPropArtboardHeaderComponent} cx-pb-data=${this.data.cxPropArtboardHeaderComponentData} cx-pb-id=${this.data.cxPropId} cx-pb-type=${this.data.cxPropType}></${this.data.cxPropArtboardHeaderComponent}></div>
							<div class="cxPbDropAreaContainer ${this.data.cxPropType === 'standard' ? 'cxPbCreateDropAreaContainer' : ''} ${loading ? 'cxPbDropAreaLoaderCont' : ''}">
								${this.data.cxPropType === 'standard' ? `<crux-page-builder-section-navigator cx-prop-id=${this.data.cxPropId}></crux-page-builder-section-navigator>` : ``}
								<div class="cxPbTemplateDroppable"></div>
							</div>
						</div>`,
				outletForComponent: ".cxPbTemplateDroppable",
				css: {
				},
				sanitizer: {
					'GLOBAL_TAGS': ['crux-page-builder-section-navigator'],
					'GLOBAL_ATTRIBUTES': []
				} 
			},
			toolbar: false,
			header: false,
			footer: false,
			placeholderOutsideBcrCheck : false
			// footerConfiguration: {
			// 	componentName: "footer-comp",
			// 	data: {}
			// }
		});
		

	},
	didConnect : function(){
		this.propertiesPanel = this.$node.querySelector('crux-page-builder-properties');
	},
	didDestroy : function(){
		delete this.updateSectionProperty;
		delete this.leftPanelRenderEvent;
	},
	showPreview : function(){
		if(this.getData('cxPropShowPreview')){
			if(this.getData('cxPropProfiles') && this.getData('cxPropProfiles').length === 0){
				this.setData('cxPropShowPreview',false);
				return;
			}
			this.setData('showPreviewLoading',true);
			this.setData('selectedPreviewProfile',this.data.cxPropProfiles[0].name);
			setTimeout(()=>{
				let _this = this;
				LytePagebuilder.preview("crux-page-builder-preview", LytePagebuilder.convertJson(this.$node.getOutput().json), "#preview_node_"+this.data.cxPropId,{methods : {onBeforeRender : function(comp){comp.$lc.set({"isPreview":true,"currProfId" : _this.$node.component.data.cxPropProfiles[0].id})}}});
				this.setData('showPreviewLoading',false);
			},300);
		}
	}.observes('cxPropShowPreview'),
	actions : {
		openProperties : function(data){
			var field = data.cxPropField;
			setTimeout(function(){
				if(this.data.cxPropType !== 'quickcreate' && !this.data.cxPropRightPanelDisable){
					this.propertiesPanel.open(field,{error : data.isError});
				}
			}.bind(this),310);
		},
		addElements : function(data){
			var id = data.node.getAttribute('node-id');
			if(data.name === 'section' && data.node.closest('crux-page-builder') === this.$node){
				this.$node.querySelector('lyte-page-builder').appendNodeInArtboard(id, 'insertAfter', 'Section');
			}
		},
		deleteElements : function(data){
			if(data.builderNode === this.$node || data.node.closest('crux-page-builder') === this.$node){
				if(!data.node && data.name === 'section'){
					data.node = this.$node.querySelector("[cx-section-id='"+data.data.id+"']");
				}
				var id = data.node.getAttribute('node-id');
				let delete_node = true, delete_section = true;
				var parentNode = data.node.parentElement;
					
				if(data.name === 'section'){
					let section = store.peekRecord(this.data.cxPropSectionModelName,data.node.getAttribute('cx-section-id'));	
					if(this.getMethods('cxPbBeforeDeleteSection')){
						delete_section = this.executeMethod('cxPbBeforeDeleteSection',section);
					}
					if(delete_section){
						this.$node.querySelector('lyte-page-builder').deleteNodeWithId(id);
						Lyte.arrayUtils( this.getData('sectionNavigatorData') , 'removeAt' , this.getData('sectionNavigatorData').cruxFindIndexOfObject('id' ,section.id));
						this.$node.querySelector('crux-page-builder-section-navigator').setData('sectionNavigatorData',this.getData('sectionNavigatorData'));	
						this.updateSectionList('remove',section);
						if(this.getMethods('cxPbDeleteSection')){
							this.executeMethod('cxPbDeleteSection',section);
						}
					}
					
				}else{
					if(this.getMethods('cxPbDeletedNode')){
						delete_node = this.executeMethod('cxPbDeletedNode',data.name,data.data,data.node);
					}
					if(delete_node){
						this.$node.querySelector('lyte-page-builder').deleteNodeWithId(id);
					}
				}
				if(this.data.cxPropType === 'quickcreate'){
					var field = data.node.component.data.cxPropField;
					var avaiableQcFields = parentNode.querySelectorAll('crux-page-builder-element');
					if(avaiableQcFields.length === 1){
						avaiableQcFields[0].setData('dontShowRemoveIconForSingleField',true);
					}
					var sequenceNumberOperationsItem = {field : field,_delete : true};
					Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem);
				}
					
				
			}
		},
		addedElement : function(data){
			if(data.name === 'section' && data.node.closest('crux-page-builder') === this.$node && this.data.cxPropType !== 'quickcreate'){
				var section;
				if(data.section){
					section = data.section;
				}else{
					try{
						section = store.peekRecord(this.data.cxPropSectionModelName,data.node.getAttribute('cx-section-id'));
					}catch(e){
						murphy.error(e);
					}
				}
				if(!section){
					section = {id : Math.floor(Math.random() * 10000) + 1,display_label : 'New Section'};
				}
				if(this.getData('sectionNavigatorData').cruxFilterBy({id : section.id}).length === 0){
					// Lyte.arrayUtils(this.getData('sectionNavigatorData'), 'insertAt', section.sequence_number -1 , section);
					Lyte.arrayUtils( this.getData('sectionNavigatorData') , 'push' , section);
					this.$node.querySelector('crux-page-builder-section-navigator').setData('sectionNavigatorData',this.getData('sectionNavigatorData'));
				}
			}
		}
	},
	methods : {
		afterRender : function(){
			if(this.getMethods('cxPbArtboardRendered')){
				this.executeMethod('cxPbArtboardRendered');
			}
		},
		// Functions which can be used as callback in the component.
		onProfileChange: function(node,eve,profName){
			var profiles = this.data.cxPropProfiles;
			var selectedProf = profiles.filter((ele)=>ele.name === profName)[0];
			node.closest('lyte-wormhole').querySelector('crux-page-builder-preview').component.$lc.set('currProfId',selectedProf.id);
		},
		onBeforeElementDrop : function(draggedNode,placetoAppend,meta, placeHolder){
			this.draggingState = false;
			this.$node.classList.remove('cxPbScrollInitial');
			if(placeHolder.classList.contains('cxHide') && !placeHolder.classList.contains('cxShownPlaceholder')){
				return false;
			}
			this._placeholderDiv.remove();
			this._placeholderDiv = null;
			if(this.getMethods('cxPbOnBeforeElementDrop')){
				var beforeDrop = this.executeMethod('cxPbOnBeforeElementDrop',draggedNode,placetoAppend);
				if(beforeDrop === false){
					return false;
				}
			}
			var field,sequenceNumberOperationsItem,newSequence,section;
			if(this.data.cxPropType === 'standard'){
				var dataType = draggedNode.getAttribute('data-cx-pb-element-value');
				if(meta.componentName === 'Element'){
					var sectionId = $L(placetoAppend.srcElement).closest('crux-page-builder-section')[0].getAttribute('cx-section-id');
					section = store.peekRecord(this.data.cxPropSectionModelName,sectionId);
					var columns = placetoAppend.srcElement.getData('lytePbStaticColumnStart');
					if(!placetoAppend.prevSibling){
						newSequence = columns + 1;
					}else{
						var index = placetoAppend.srcElement.children.indexOf(placetoAppend.prevSibling) + 1;
						index = (section.column_count === 'single_column_section' ? 1 : 2) * index;
						newSequence = index + (columns + 1);
					}

					if(draggedNode.localName === 'div'){
						if(!meta.outerHtml.child[0].attr){
							meta.outerHtml.child[0].attr = {};
						}
						var fieldM = this.data.propertiesJson[dataType];
						if(draggedNode.getAttribute('data-cx-pb-unused-field')){
							field = store.peekRecord(this.data.cxPropFieldModelName,draggedNode.getAttribute('data-cx-pb-field-id'));
							field.$.set('sequence_number',newSequence);
							Lyte.arrayUtils(this.data.cxPropUnusedFields,'removeAt',this.data.cxPropUnusedFields.cruxFindIndexOfObject('id',field.id));
							if(section.section_field){
								Lyte.arrayUtils(section.section_field,'push',field);
							}
							if(this.getMethods('cxPbPropertyChange')){
								this.executeMethod('cxPbPropertyChange',field,"sequence_number",newSequence,section);
							}
							sequenceNumberOperationsItem = {section : section,section_field : [{field : field,sequence_number : newSequence}]};
							Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem);
							if(this.getMethods('cxPbOnFieldDrop')){
								this.executeMethod('cxPbOnFieldDrop',field,section);
							}
						}else{
							field = Object.assign(Object.assign({},fieldM),{custom_field : true,sequence_number : newSequence,data_type : fieldM.data_type});
							delete field.field_type;
							delete field.properties;
							delete field.mandatoryProperties;
							delete field.customizable_properties;
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
									if(this.data.cxPropCustomizableFieldMetaMapping[keyToPush]){
										keyToPush = this.data.cxPropCustomizableFieldMetaMapping[keyToPush];
									}
									customizable_properties.push(keyToPush);
								}
								if(property.cxPropProperties){
									property.cxPropProperties.forEach(updateField.bind(this));
								}
							}
							this.data.propertiesJson[field.data_type].properties.forEach(updateField.bind(this));
							// var it = 1
							
							var field_label;
							if(!this.data.cxPropFieldLabelIterator[field.data_type]){
								this.data.cxPropFieldLabelIterator[field.data_type] = 1;
							}else{
								Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',field.data_type,this.data.cxPropFieldLabelIterator[field.data_type] + 1);
							}
							while(true){
								field_label = fieldM.display_label + " " + this.data.cxPropFieldLabelIterator[field.data_type];
								if(this.field_label_list.indexOf(field_label) === -1){
									break;
								}
								Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',field.data_type,this.data.cxPropFieldLabelIterator[field.data_type] + 1);
							}
							field.field_label = field_label;
							field.customizable_properties = customizable_properties;
							field.profiles = this.data.cxPropProfiles;
							let prof_len = field.profiles.length;
							for (let index = 0; index < prof_len; index++) {
								field.profiles[index].permission_type = "read_write";
							}
							if(this.getMethods('cxPbBeforeNewFieldCreate')){
								field = this.executeMethod('cxPbBeforeNewFieldCreate',field,section);
							}
							if(field){
								field = store.createRecord(this.data.cxPropFieldModelName,field);
								if(section.section_field){
									Lyte.arrayUtils(section.section_field,'push',field);
								}
								if(this.getMethods('cxPbNewFieldCreate')){
									field = this.executeMethod('cxPbNewFieldCreate',field,section);
								}
								sequenceNumberOperationsItem = {section : section,section_field : [{field : field,sequence_number : newSequence}]};
								Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem);
							}else{
								return false;
							}
						}
						//Removed this temporary for module builder first cut release
						if(!this.data.cxPropRightPanelDisable){
							this.propertiesPanel.open(field);
						}
						

						meta.outerHtml.child[0].attr["cx-prop-field" ] = {id : field.id};
						meta.outerHtml.child[0].attr["cx-prop-set-active" ] = true;

						if(field.data_type === 'texts') {
							meta.outerHtml.child[0].attr["lyte-pb-static-column-span" ] = 2;	
						}else{
							meta.outerHtml.child[0].attr["lyte-pb-static-column-span" ] = 1;
						}
							// var column = $L(placetoAppend.srcElement).closest('lyte-pb-column-template')

							// if(fieldM && fieldM.column_span == 2){
							// 	$L(placetoAppend.srcElement).closest('lyte-pb-grid')[0].appendChildToGrid(draggedNode,placetoAppend,{outerHtml : meta.outerHtml.child[0],start : 0,span : 2})
							// 	return false;
							// }else if(column[0].parentElement.children.length == 1){
							// 	$L(placetoAppend.srcElement).closest('lyte-pb-grid')[0].appendChildToGrid(draggedNode,placetoAppend,{outerHtml : meta.outerHtml.child[0],start : 0,span : 1})
							// 	return false;
							// }
							// placetoAppend.srcElement.appendColumn(draggedNode,placetoAppend,1)
						setTimeout(()=>{
							Lyte.triggerEvent('cxPbFieldHighlight',{field_id : field.id});
						},100);
							
						return meta;
					}
					draggedNode.classList.remove('cxPbDisabled');
					field = draggedNode.component.data.cxPropField;
					if(this.getMethods('cxPbBeforePropertyChange')){
						this.executeMethod('cxPbBeforePropertyChange',field,"sequence_number",field.sequence_number,newSequence);
					}
					field.$.set('sequence_number',newSequence);
					if(section.section_field){
						Lyte.arrayUtils(section.section_field,'push',field);
					}
					if(this.getMethods('cxPbPropertyChange')){
						this.executeMethod('cxPbPropertyChange',field,"sequence_number",newSequence,section);
					}
					sequenceNumberOperationsItem = {section : section,section_field : [{field : field,sequence_number : newSequence}]};
					if(this.getMethods('cxPbOnFieldDrop')){
						this.executeMethod('cxPbOnFieldDrop',field,section);
					}
					setTimeout(()=>{
						Lyte.triggerEvent('cxPbFieldHighlight',{field_id : field.id});
					},100);
				 }else{
				 	this.$lc.set('draggingState',false);
					newSequence = placetoAppend.srcElement.children.indexOf(placetoAppend.prevSibling) + 2;
					if(draggedNode.localName === 'div'){
						if(draggedNode.getAttribute('data-cx-pb-unused-field')){
							if(this.getMethods('cxPbUnusedSectionData')){
								section = this.executeMethod('cxPbUnusedSectionData',draggedNode.getAttribute('data-cx-pb-field-id'))
							}
							section.$.set('sequence_number',newSequence);
							Lyte.arrayUtils(this.data.cxPropUnusedFields,'removeAt',this.data.cxPropUnusedFields.cruxFindIndexOfObject('id',draggedNode.getAttribute('data-cx-pb-field-id')));
	
							if(this.getMethods('cxPbPropertyChange')){
								this.executeMethod('cxPbPropertyChange',section,"sequence_number",newSequence,section);
							}
							if(this.getMethods('cxPbOnSectionDrop')){
								this.executeMethod('cxPbOnSectionDrop',section);
							}
						}else{

							var isSubform = false;
							var sectionKey = 'section';
							if(dataType === 'subform'){
								isSubform = true;
								sectionKey = 'subform';
							}
							var display_label;
							if(!this.data.cxPropFieldLabelIterator[sectionKey]){
								this.data.cxPropFieldLabelIterator[sectionKey] = 1;
							}else{
								Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',sectionKey,this.data.cxPropFieldLabelIterator[sectionKey] + 1);
							}
							while(true){
								display_label = (isSubform ? _cruxUtils.getI18n('crm.label.customize.subform') : _cruxUtils.getI18n('crm.event.layout.new.section'))+ " " + this.data.cxPropFieldLabelIterator[sectionKey];
								if(this.section_field_list.indexOf(display_label) === -1){
									break;
								}
								Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add',sectionKey,this.data.cxPropFieldLabelIterator[sectionKey] + 1);
							}
							var defaultAllowedAction = {"add_field": true,"rename": true,"change_tab_traversal": true,"reorder": true, "delete": true,"remove_field": true,"change_column_count": true};
							section = store.createRecord(this.data.cxPropSectionModelName,{display_label : display_label,generated_type: "custom_generated_section",isSubformSection : isSubform,sequence_number : newSequence,actions_allowed : defaultAllowedAction});
							if(dataType !== 'subform'){
								section.$.set('column_count','double_column_section')
								section.$.set('tab_traversal','left_right')
							}
							if(this.getMethods('cxPbNewSectionCreate')){
								section = this.executeMethod('cxPbNewSectionCreate',section);
							}
						}
						if(this.getData('sectionNavigatorData').cruxFilterBy({id : section.id}).length === 0){
							Lyte.arrayUtils(this.getData('sectionNavigatorData'), 'insertAt', newSequence -1 , section);
							this.$node.querySelector('crux-page-builder-section-navigator').setData('sectionNavigatorData',this.getData('sectionNavigatorData'));
							// $L(this.$node).find('crux-page-builder-section-navigator')[0].setData('sectionNavigatorData',this.getData('sectionNavigatorData'));
						}
						
						meta.outerHtml.child[0].attr["cx-section-id"] = section.id;
						meta.outerHtml.child[0].attr["cx-prop-id"] = this.data.cxPropId;
					}else{
						sectionId = draggedNode.getAttribute('cx-section-id');
						section = store.peekRecord(this.data.cxPropSectionModelName,sectionId);
						if(this.getMethods('cxPbBeforePropertyChange')){
							this.executeMethod('cxPbBeforePropertyChange',section,"sequence_number",section.sequence_number,newSequence);
						}
						section.$.set('sequence_number',newSequence);
						if(this.getMethods('cxPbPropertyChange')){
							this.executeMethod('cxPbPropertyChange',section,"sequence_number",newSequence,section);
						}
						if(this.getMethods('cxPbOnSectionDrop')){
							this.executeMethod('cxPbOnSectionDrop',section);
						}
						var ind = this.data.sectionNavigatorData.cruxFindIndexOfObject('id',sectionId);
						var sec = Lyte.arrayUtils(this.data.sectionNavigatorData,'removeAt',ind);
						Lyte.arrayUtils(this.getData('sectionNavigatorData'), 'insertAt', newSequence -1 , sec);
						this.$node.querySelector('crux-page-builder-section-navigator').setData('sectionNavigatorData',this.getData('sectionNavigatorData'));
					}
					sequenceNumberOperationsItem = {section : section,sequence_number : newSequence};
					setTimeout(()=>{
						const sectionDiv =  $L(`[cx-section-id='${section.id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
						sectionDiv.closest('.cxPbDropAreaContainer').scrollTop = sectionDiv.offsetTop - 35; //eslint-disable-line @zoho/webperf/layout-thrashing
						// const titleSection = sectionDiv.querySelector('.cxPbTitleSection');
						sectionDiv.classList.add('cxPbSectionHighlight');
						setTimeout(() => {
							sectionDiv.classList.remove('cxPbSectionHighlight');
						}, 2000);	
					});
				}
				Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem);
				return meta;
			}else if(this.data.cxPropType === 'quickcreate'){
				if(!meta.outerHtml.child[0].attr){
					meta.outerHtml.child[0].attr = {};
				}
				var sequence_number = placetoAppend.srcElement.children.indexOf(placetoAppend.prevSibling) + 2;
				var fieldId;
				if(draggedNode.localName === 'div'){
					fieldId = draggedNode.getAttribute('data-cx-pb-field-id');
				}else{
					draggedNode.classList.remove('cxPbDisabled');
					fieldId = draggedNode.getData('cxPropField').id;
				}
				field = store.peekRecord(this.data.cxPropFieldModelName,fieldId);
				field.$.set('quick_sequence_number',sequence_number);
				if(this.getMethods('cxPbPropertyChange')){
					this.executeMethod('cxPbPropertyChange',field,"quick_sequence_number",sequence_number);
				}

				sequenceNumberOperationsItem = {field : field,quick_sequence_number : sequence_number};
				Lyte.arrayUtils(this.data.sequenceNumberOperations,'push',sequenceNumberOperationsItem);

				meta.outerHtml.child[0].attr["lyte-pb-static-column-span" ] = 1;
				meta.outerHtml.child[0].attr["cx-prop-field" ] = {id : field.id};
				if(this.getMethods('cxPbQuickCreateFieldAdded')){
					this.executeMethod('cxPbQuickCreateFieldAdded',field);
				}
				var avaiableQcFields = placetoAppend.srcElement.querySelectorAll('crux-page-builder-element');
				if(avaiableQcFields.length === 1){
					avaiableQcFields[0].setData('dontShowRemoveIconForSingleField',false);
				}
				return meta;
			}else if(this.getMethods('cxPbOnBeforeElementDrop')){
				return this.executeMethod('cxPbOnBeforeElementDrop',draggedNode,placetoAppend,meta, placeHolder);
			}		
		},
		onBeforeShowPlaceholder : function(draggedNode,prevPlace,placetoAppend){
			if(draggedNode.classList.contains('cxPbDontShowPlaceholder')){
				return false;
			}
			var column;
			if(this.data.cxPropType === 'standard'){
				column = $L(placetoAppend.srcElement).closest('lyte-pb-column-template');
				var i = column.length ? true : false;
				if(draggedNode.nodeName !== 'CRUX-PAGE-BUILDER-SUBFORM' && draggedNode.getAttribute('data-cx-pb-element-value') !== 'section' && draggedNode.nodeName !== 'CRUX-PAGE-BUILDER-SECTION' && draggedNode.getAttribute('data-cx-pb-element-value') !== 'subform' && draggedNode.getAttribute('data-cx-pb-element-value') !== 'static_subform'){
					if(!i){
						return false;
					}
					if(placetoAppend.srcElement.closest('crux-page-builder-section').classList.contains('cxAvoidDrop')){
						return false;
					}
					if(prevPlace){
						var placeholderMessage = prevPlace.srcElement.closest('lyte-pb-grid-template').querySelector('.lytePbMessage');
						if(placeholderMessage){
							placeholderMessage.classList.remove('cxdN')
						}
					}	
					// return true;

				}else if(i){
					return false;
				}else if(placetoAppend.appendAsFirst && placetoAppend.srcElement.children[0].nodeName === 'CRUX-PAGE-BUILDER-RECORD-IMAGE'){
					return false;
				}
				
				// return true;
			}else if(this.data.cxPropType === 'quickcreate'){
				column = $L(placetoAppend.srcElement).closest('lyte-pb-column-template');
				if(column.length === 0){
					return false;	
				}
				// return true;
			}
			var check;
			if(this.getMethods('cxPbShowPageBuilderPlaceHolder')){
				check = this.executeMethod('cxPbShowPageBuilderPlaceHolder',draggedNode,placetoAppend);
				check = check === false ? false : true;
			}
			return check;
			// placeHolder.classList.remove('cxHide');
		},
		removePlaceHolder : function(){
			if(this._placeholderDiv){
				this._placeholderDiv.remove();
				this._placeholderDiv = null;
			}
		},
		onBuilderShowPlaceholder : function(draggedNode,placetoAppend,placeHolder){
			this.$node.classList.add('cxPbScrollInitial');
			// placeHolder.classList.remove('cxShownPlaceholder');
			// var column;
			// if(this.data.cxPropType === 'standard'){
			// 	column = $L(placetoAppend.srcElement).closest('lyte-pb-column-template');
			// 	var i = column.length ? true : false;
			// 	if(draggedNode.nodeName !== 'CRUX-PAGE-BUILDER-SUBFORM' && draggedNode.getAttribute('data-cx-pb-element-value') !== 'section' && draggedNode.nodeName !== 'CRUX-PAGE-BUILDER-SECTION' && draggedNode.getAttribute('data-cx-pb-element-value') !== 'subform'){
			// 		// var element = JSON.parse(draggedNode.getAttribute('data-cx-pb-element'))
			// 		// if(i && element){
			// 		// 	if(element.column_span == 2){
			// 		// 		return {width : placetoAppend.srcElement.offsetWidth*2+'px',left : placetoAppend.srcElement.offsetLeft}
			// 		// 	}else if(column[0].parentElement.children.length == 1){
			// 		// 		return {width : placetoAppend.srcElement.offsetWidth/2+'px',left : placetoAppend.srcElement.offsetLeft}
			// 		// 	}
			// 		// }
			// 		if(!i){
			// 			placeHolder.classList.add('cxHide');
			// 			return;
			// 		}
					
					
			// 		placeHolder.classList.add('cxHide');

			// 		placeHolder.classList.add('cxShownPlaceholder');
			// 		var placeholderDiv = $L('.cxPbElementSortPlaceholderDiv');
			// 		if(placeholderDiv.length){
			// 			if(placetoAppend.prevSibling && placetoAppend.prevSibling.nextElementSibling.classList.contains('cxPbElementSortPlaceholderDiv')){
			// 				return;
			// 			}
			// 			placeholderDiv[0].remove();
			// 		}
			// 		var dummyNode = document.createElement('div');
			// 		dummyNode.innerHTML = `<span>text</span>`;
			// 		dummyNode.classList.add('cxPbElementSortPlaceholderDiv');
			// 		placetoAppend.srcElement.insertBefore(dummyNode, placetoAppend.prevSibling ? placetoAppend.prevSibling.nextElementSibling : placetoAppend.srcElement.firstChild);
					
			// 		return;
			// 	}
			// 	if(i){
			// 		placeHolder.classList.add('cxHide');
			// 	}else if(placetoAppend.appendAsFirst && placetoAppend.srcElement.children[0].nodeName === 'CRUX-PAGE-BUILDER-RECORD-IMAGE'){
			// 		placeHolder.classList.add('cxHide');
			// 	}else{
			// 		placeHolder.classList.remove('cxHide');
			// 	}
			// 	return;
			// }else if(this.data.cxPropType === 'quickcreate'){
			// 	column = $L(placetoAppend.srcElement).closest('lyte-pb-column-template');
			// 	placeHolder.classList.add('cxHide');
			// 	var placeholderDivQc = $L('.cxPbElementSortPlaceholderDiv');
			// 	if(column.length){
			// 		placeHolder.classList.add('cxShownPlaceholder');
			// 		if(placeholderDivQc.length){
			// 			if(placetoAppend.prevSibling && placetoAppend.prevSibling.nextElementSibling.classList.contains('cxPbElementSortPlaceholderDiv')){
			// 				return;
			// 			}
			// 			placeholderDivQc[0].remove();
			// 		}
			// 		var dummyNodeQc = document.createElement('div');
			// 		dummyNodeQc.innerHTML = `<span>text</span>`;
			// 		dummyNodeQc.classList.add('cxPbElementSortPlaceholderDiv');
			// 		placetoAppend.srcElement.insertBefore(dummyNodeQc, placetoAppend.prevSibling ? placetoAppend.prevSibling.nextElementSibling : placetoAppend.srcElement.firstChild);
			// 	}else{
					
			// 	}
			// 	return;
			// }else if(this.getMethods('cxPbShowPageBuilderPlaceHolder')){
			// 	return this.executeMethod('cxPbShowPageBuilderPlaceHolder',draggedNode,placetoAppend);
			// }
			// if(draggedNode.getAttribute('data-cx-pb-element-value') !== 'subform' || draggedNode.getAttribute('data-cx-pb-element-value') !== 'section'){
			// 	this.$lc.set('draggingState',true);
			// }
			placeHolder.classList.add('cxHide');

			var gridTemplate = placetoAppend.srcElement.closest('lyte-pb-grid-template');
			if(gridTemplate){
				var placeholderMessage = gridTemplate.querySelector('.lytePbMessage');
				if(placeholderMessage){
					placeholderMessage.classList.add('cxdN')
				}
			}


			// placeHolder.classList.remove('cxShownPlaceholder');
			placeHolder.classList.add('cxShownPlaceholder');
			// var placeholderDiv = $L('.cxPbElementSortPlaceholderDiv');
			var dummyNode;
			if(this._placeholderDiv){
				if(placetoAppend.prevSibling && placetoAppend.prevSibling.nextElementSibling && placetoAppend.prevSibling.nextElementSibling.classList.contains('cxPbElementSortPlaceholderDiv')){
					return;
				}
				dummyNode = this._placeholderDiv;
			}else{
				dummyNode = document.createElement('div');
				dummyNode.innerHTML = `<span>text</span>`;
				dummyNode.classList.add('cxPbElementSortPlaceholderDiv');
				dummyNode.classList.add('lytePbIgnoreNode');
				dummyNode.setAttribute('lyte-pb-static-placeholder-ignore','true');
			}
			if(draggedNode.getAttribute('data-cx-pb-element-value') === 'section' || draggedNode.getAttribute('data-cx-pb-element-value') === 'subform' || draggedNode.getAttribute('data-cx-pb-element-value') === 'static_subform'){
				this.$lc.set('draggingState',true);
				dummyNode.classList.add('cxPbElemSecPlaceholderOnDrag');
			}
			placetoAppend.srcElement.insertBefore(dummyNode, placetoAppend.prevSibling ? placetoAppend.prevSibling.nextElementSibling : placetoAppend.srcElement.firstChild);
			this._placeholderDiv = dummyNode;
		},
		dragStartMt : function(draggedNode,handleElement,event,originalHandle,placeholder){
			this.$node.classList.add('cxPbScrollInitial');
			this.draggingState = true;
			var dummyNode = document.createElement('div');
			dummyNode.innerHTML = `<span>text</span>`;
			dummyNode.classList.add('cxPbElementSortPlaceholderDiv');
			dummyNode.classList.add('lytePbIgnoreNode');
			if(draggedNode.nodeName === 'CRUX-PAGE-BUILDER-SECTION' || draggedNode.nodeName === 'CRUX-PAGE-BUILDER-SUBFORM' || draggedNode.nodeName === 'CRUX-PAGE-BUILDER-RECORD-IMAGE' || draggedNode.getAttribute('data-cx-pb-element-value') === 'section' || draggedNode.getAttribute('data-cx-pb-element-value')==='subform' || draggedNode.getAttribute('data-cx-pb-element-value') === 'static_subform'){
				this.$lc.set('draggingState',true);
				dummyNode.classList.add('cxPbElemSecPlaceholderOnDrag');
			}
			dummyNode.setAttribute('lyte-pb-static-placeholder-ignore','true');
			Lyte.triggerEvent('cxPbRemoveActiveClass');
			placeholder.srcElement.insertBefore(dummyNode, placeholder.prevSibling ? placeholder.prevSibling.nextElementSibling : placeholder.srcElement.firstChild);
			this._placeholderDiv = dummyNode;
		},
		dragHelperBuilder : function(){
			// var clonedNode = a.cloneNode(true)
			// a.classList.add('cxPbDisabled')
			// return clonedNode
			// var dummyNode = document.createElement('div');
			// dummyNode.innerHTML = `<span>text</span>`;
			// dummyNode.classList.add('cxPbElementSortPlaceholderDiv');
			// dummyNode.classList.add('lytePbIgnoreNode');
			// dummyNode.setAttribute('lyte-pb-static-placeholder-ignore','true');
			// return dummyNode
		},
		titleChange : function(titleTemplate,name){
			var sectionNode = titleTemplate.closest('crux-page-builder-section');
			var sectionId = sectionNode.getAttribute('cx-section-id');
			var section = store.peekRecord(this.data.cxPropSectionModelName,sectionId);
			var ch = true;
			if(this.getMethods('cxPbBeforePropertyChange')){
				ch = this.executeMethod('cxPbBeforePropertyChange',section,'display_label',name,section.display_label);
			}
			if(ch){
				section.$.set('display_label',name);
				if(this.getMethods('cxPbPropertyChange')){
					this.executeMethod('cxPbPropertyChange',section,"display_label",name);
				}
			}
		},
		onBeforeElementAppend : function(meta,placetoAppend,data){
			if(meta.originalTagName === 'lyte-pb-grid-template'){
				return;
			}
			if(placetoAppend.nodeName === 'LYTE-PB-SUBFORM'){
				if(!meta.outerHtml.child[0].attr){
					meta.outerHtml.child[0].attr = {};
				}
				meta.outerHtml.child[0].attr['cx-prop-subform-field'] = true;
				var field = store.createRecord(this.data.cxPropFieldModelName,{field_label : data.name + ' 1',custom_field : true,data_type : data.field_type});
				if(this.getMethods('cxPbNewFieldCreate')){
					field = this.executeMethod('cxPbNewFieldCreate',field);
				}
				//Removed this temporary for module builder first cut release
				if(!this.data.cxPropRightPanelDisable){
					this.propertiesPanel.open(field);
				}
				
				meta.outerHtml.child[0].attr["cx-prop-field" ] = field;
			}else if(placetoAppend.nodeName === 'CRUX-PAGE-BUILDER-SECTION' || placetoAppend.nodeName === 'CRUX-PAGE-BUILDER-RECORD-IMAGE' || placetoAppend.nodeName === "CRUX-PAGE-BUILDER-SUBFORM"){
				var display_label;
				if(!this.data.cxPropFieldLabelIterator['section']){
					this.data.cxPropFieldLabelIterator['section'] = 1;
				}else{
					Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add','section',this.data.cxPropFieldLabelIterator['section'] + 1);
				}
				while(true){
					display_label = _cruxUtils.getI18n('crm.event.layout.new.section') + " " + this.data.cxPropFieldLabelIterator['section'];
					if(this.section_field_list.indexOf(display_label) === -1){
						break;
					}
					Lyte.objectUtils(this.data.cxPropFieldLabelIterator,'add','section',this.data.cxPropFieldLabelIterator['section'] + 1);
				}
				var defaultAllowedAction = {"add_field": true,"rename": true,"change_tab_traversal": true,"reorder": true, "delete": true,"remove_field": true,"change_column_count": true};
				var section = store.createRecord(this.data.cxPropSectionModelName,{display_label : display_label,generated_type: "custom_generated_section",isSubformSection : false,actions_allowed : defaultAllowedAction});
				var newSequence = placetoAppend.parentElement.children.indexOf(placetoAppend) + 2;
				// newSequence = newSequence.toString();
				section.$.set('sequence_number',newSequence);
				// if(this.getMethods('cxPbPropertyChange')){
				// 	this.executeMethod('cxPbPropertyChange',section,"sequence_number",newSequence);
				// }
				if(this.getMethods('cxPbNewSectionCreate')){
					section = this.executeMethod('cxPbNewSectionCreate',section);
				}
				meta.title = display_label;
				meta.outerHtml.child[0].attr["cx-section-id"] = section.id;
				// meta.outerHtml.child[0].child[1].attr["lyte-pb-static-title"] = display_label;
			}
			return meta;
		},

		onBuilderScroll : function(event){
			if(this.draggingState){
				return;
			}
			let navigator_elem = $L("crux-page-builder-section-navigator")[0];
			if (!event.target || this.data.cxPropType !== 'standard' || navigator_elem.component.isNavScrolling){
				return; 
			} 
			let sections = this.data.sectionNavigatorData.map(item =>
				document.querySelector(`[cx-section-id="${item.id}"]`)
			  ).filter(Boolean);
			let activeIndex = -1;
			let minDistance = Infinity;
			sections.forEach(function(section,index) {
				const rect = section.getBoundingClientRect();
				if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
					return;
				}
				const distance = Math.abs(rect.top);
				if (distance < minDistance) {
				  minDistance = distance;
				  activeIndex = index;
				}
			}.bind(this));
			if (activeIndex === -1) {
				return;
			}
			navigator_elem.setData({
			  startIndex: activeIndex,
			  startRecNum: activeIndex + 1
			});
		},
		propertyMethods : function(methodName){
			var args = Array.from(arguments).slice(1);
			if(this.getMethods(methodName)){
				args.unshift(methodName);
				return this.executeMethod.apply(this,args);
			}
		},
		pageBuilderBeforeRender : function(id,comp){
			if(this.getMethods('cxPbPageBuilderBeforeRender')){
				this.executeMethod('cxPbPageBuilderBeforeRender',id,comp);
			}
			Lyte.triggerEvent('cxPbEventPageBuilderBeforeRender',{pageBuilderId : id,pageBuilderComponent : comp});
		},
		onPreviewClose : function(modal) {
			modal.setData( "ltPropReRenderModal" , true );
		}
	},
	updateFieldList : function(opt,field){
		if(opt === 'add'){
			this.field_label_list.push(field.field_label);
		}else{
			this.field_label_list.splice(this.field_label_list.indexOf(field.field_label),1);
		}

		if(this.data.cxPropType === 'quickcreate'){
			if(opt === 'add'){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(this.quick_create_field_list.indexOf(field.id) === -1){
					this.quick_create_field_list.push(field.id);	
				}
			}else{
				this.quick_create_field_list.splice(this.quick_create_field_list.indexOf(field.id),1);
			}
			clearTimeout(this.updateQuickCreateList);
			this.updateQuickCreateList = setTimeout(function(){
				this.leftPanelNode.setData('droppedList',Array.from(this.quick_create_field_list));
			}.bind(this),300);
		}
	},
	updateSectionList : function(opt,section){
		if(opt === 'add'){
			this.section_field_list.push(section.display_label);
		}else{
			this.section_field_list.splice(this.section_field_list.indexOf(section.display_label),1);
		}
	},
	setError : function(fieldid,message){
		if(message){
			this.errorProperties[fieldid] = message;
		}else{
			delete this.errorProperties[fieldid];
		}
	},
	processFieldPropertyJson : function(){
		var properties = {},availableFields = {};
		if(this.data.cxPropType === 'quickcreate'){
			return {properties : {properties},availableFields : availableFields};
		}
		var fieldTypeMeta = Lyte.deepCopyObject(this.data.cxPropFieldPropertyJson.field_types_meta);
		if(this.data.cxPropFieldPropertyJson){
			for(var prop of fieldTypeMeta){
		    	// var prop = this.data.cxPropFieldPropertyJson[type];
		    	prop.property = [];
		    	if(!availableFields[prop.category]){
		    		availableFields[prop.category] = {cxPropLabel : prop.category.charAt(0).toUpperCase() + prop.category.slice(1) , cxPropAvailableFields : []};
		    	}
		    	if(!prop.iconClass){
		    		prop.iconClass = prop.data_type ? prop.data_type.charAt(0).toUpperCase() + prop.category.slice(1) : "";
		    	}
		    	availableFields[prop.category].cxPropAvailableFields.push(prop);
		    	var labels = [],mandatoryProperties = [];
		    	prop.properties.forEach(function(item,index){
		    		var def = item;
		    		if(def){
		    			if(def.properties){
		    				def.sub_properties = [{cxPropProperties : Array.from(def.properties)}];
		    			}
		    			if(def.mandatory){
		    				mandatoryProperties.push(def.key);
		    			}
		    			if(!def.category){
		    				labels.push({cxPropProperties : [def]});
		    			}else{
		    				var propLabel = labels.filter((i)=>i.cxPropLabel === def.category);
				    		if(propLabel.length === 0){
				    			labels.push({cxPropLabel : def.category,cxPropProperties : []});
				    			propLabel = labels.filter((i)=>i.cxPropLabel === def.category)[0]; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
				    		}else{
				    			propLabel = propLabel[0];
				    		}
				    		propLabel.cxPropProperties.push(def);
		    			}
		    			prop.properties[index] = def;
		    		}
		    	});
		    	prop.properties = labels;
		    	prop.mandatoryProperties = mandatoryProperties;
		        properties[prop.data_type] = prop;
			}
		}
		if(this.getMethods('cxPbChangeProperties')){
			properties = this.executeMethod('cxPbChangeProperties',properties);
		}
		this.setData('propertiesJson',properties);
		if(this.getMethods('cxPbChangeAvailableFields')){
			availableFields = this.executeMethod('cxPbChangeAvailableFields',availableFields);
		}
		this.setData('availableFields',availableFields);
		return {properties : properties,availableFields : availableFields};
	},
	observeLeftPanelData : function(obj){
		if(obj.item === 'cxPropFieldPropertyJson'){ //eslint-disable-line @zoho/zstandard/no-ifel
			var {properties,availableFields} = this.processFieldPropertyJson();
			this.setData('propertiesJson',properties);
			this.setData('cxPropAvailableFields',availableFields);
			this.leftPanelNode.setData('cxPropAvailableFields',availableFields);
		}else if(obj.item === 'cxPropLeftPanelFooterComponent'){
			this.leftPanelNode.setData('cxPropFooterComponent',obj.newValue);
		}else if(obj.item === 'cxPropLeftPanelFooterComponentData'){
			this.leftPanelNode.setData('cxPropFooterComponentData',obj.newValue);
		}else{
			this.leftPanelNode.setData(obj.item,obj.newValue);
		}
	}.observes('cxPropFieldPropertyJson','cxPropQuickCreateSections','cxPropUnusedFields','cxPropShowUnusedFields','cxPropLeftPanelFooterComponent','cxPropLeftPanelFooterComponentData','cxPropType'),
	observeUnusedFields : function(obj){
		let labelsToAdd,labelsToRemove;
		if(obj.item === 'cxPropUnusedFields' && obj.type === "change"){
			labelsToRemove = obj.oldValue.map(obj => obj.field_label);
			this.field_label_list  = this.field_label_list.filter(label => !labelsToRemove.includes(label));
			labelsToAdd = obj.newValue.map(obj => obj.field_label);
			this.field_label_list.push(...labelsToAdd);
		}else if(obj.insertedItems && obj.insertedItems.length){
			labelsToAdd = obj.insertedItems.map(obj => obj.field_label);
			this.field_label_list.push(...labelsToAdd);
		}else if(obj.removedItems && obj.removedItems.length){
			labelsToRemove = obj.removedItems.map(obj => obj.field_label);
			this.field_label_list  = this.field_label_list.filter(label => !labelsToRemove.includes(label));
			
		}
	}.observes('cxPropUnusedFields','cxPropUnusedFields.[]'),
	observeTemplateJson : function(){
		var dropAreaCont = this.$node.querySelector('.cxPbDropAreaContainer');
		dropAreaCont.classList.remove('cxPbDropAreaLoaderCont');
		if(!this.data.cxPropTemplateJson){
			this.setData('cxPropTemplateJson',this.loadingTemplate);
			dropAreaCont.classList.add('cxPbDropAreaLoaderCont');
		}
		this.$node.querySelector('lyte-page-builder').resetArtboard(this.data.cxPropTemplateJson);
		this.errorProperties={};
	}.observes('cxPropTemplateJson'),
	observeSubformList : function(){
		if(this.data.cxPropOtherModuleSubformList){
			this.data.cxPropOtherModuleSubformList.forEach((item)=>{
				this.updateSectionList('add',item);
			})
		}	
	}.observes('cxPropOtherModuleSubformList.[]').on('init')
});
Lyte.Component.register("crux-permission-list", {
_template:"<template tag-name=\"crux-permission-list\"> <lyte-table class=\"cxPermissionTable\"> <lyte-table-structure class=\"cxPermTableStruct\"> <lyte-thead> <lyte-tr> <lyte-th class=\"cxPermTableTitleTd\">Title</lyte-th> <lyte-th> <lyte-button id=\"allPermission\" class=\"cxPermTableActionBtnWrap\" lt-prop-class=\"cxPermTableActionBtn\"> <template is=\"registerYield\" yield-name=\"text\"> <div class=\"cxAlignItemCenter cxFlex\"> <span class=\"cxPermTableActionText\">{{cxPropDefaultPermission}}</span> <span class=\"cxPermTableDownArrowIcon\"></span> </div> </template> </lyte-button> </lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"for\" items=\"{{cxPropProfiles}}\" item=\"item\" index=\"index\"> <lyte-tr> <lyte-td>{{item.name}}</lyte-td> <lyte-td> <lyte-dropdown class=\"cxPermTableActionBtnWrap\" lt-prop-selected=\"{{cxGetCurrentProfilePermissionType(item.id)}}\" before-select=\"{{method('onPermissionBeforeSelect',item)}}\" lt-prop-freeze=\"false\" on-option-selected=\"{{method(&quot;onPermissionSelect&quot;,item)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cxPermTableActionBtn cxAlignItemCenter cxFlex\"> <span class=\"cxPermReadWriteIcon\"></span> <span class=\"cxPermTableActionText\">{{cxGetDisplayValue(item.permission_type)}}</span> <span class=\"cxPermTableDownArrowIcon\"></span> </lyte-drop-button> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropAllPermissionsList}}\" item=\"list\" index=\"index\"> <lyte-drop-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{list.system_value}}\"> <span class=\"{{list.iconClass}}\"></span> {{list.display_value}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </lyte-td> </lyte-tr> </template>  </lyte-tbody></lyte-table-structure> </lyte-table> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"lyte-button#allPermission\" lt-prop-freeze=\"false\" on-menu-click=\"{{method('onAllPermissionClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"fieldallPermissions\"> <lyte-menu-header>Set all permission to</lyte-menu-header> <template is=\"for\" items=\"{{cxPropAllPermissionsList}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{item.system_value}}\"> <span class=\"{{item.iconClass}}\"></span> {{item.display_value}} </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1,1,1,1]},{"type":"registerYield","position":[1,1,1,1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]}]},{"type":"componentDynamic","position":[1,1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,1,3]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropDefaultPermission","cxPropAllPermissionsList","allPermission","cxPropProfiles","cxPropFieldProfiles"],
_observedAttributesType :["string","array","string","array","array"],

	data : function(){
		return {
			cxPropDefaultPermission : Lyte.attr('string', {default : 'All Permissions'}),
			cxPropAllPermissionsList : Lyte.attr('array', {default : [{"display_value" : "Read & Write", "system_value" : "read_write","iconClass":"cxPermReadWriteIcon"}, {"display_value" : "Read Only", "system_value" : "read_only","iconClass":"cxPermReadOnlyIcon"}, {"display_value" : "Don't Show", "system_value" : "hidden","iconClass":"cxPermHideIcon"}]}),
			allPermission : Lyte.attr('string', {default : 'Read & write'}),
			cxPropProfiles : Lyte.attr('array', {default : []}),
			cxPropFieldProfiles : Lyte.attr('array',{default : []})
		};
	},
	init : function(){
		let fieldProfles = this.data.cxPropFieldProfiles || [];
		let profiles_list = this.data.cxPropProfiles;
		let permissionList = this.data.cxPropAllPermissionsList;
		function filterPermission(permissionList,field_prof_item){
			return permissionList.filter(obj => obj.system_value ===field_prof_item.permission_type)[0];
		}
		var fieldProfileLength = fieldProfles.length;
		for (let i = 0; i < fieldProfileLength; i++) {
			let field_prof_item = fieldProfles[i];
			var profileListLength = profiles_list.length;
			for (let j = 0; j < profileListLength; j++) {
				let profile_item = profiles_list[j];
				if (field_prof_item.id === profile_item.id) {
					let type = filterPermission(permissionList,field_prof_item);
					profile_item.permission_type  = type.system_value;
				}
			}
		}
		

	},
	methods : {
		// Functions which can be used as callback in the component.
		onAllPermissionClick : function(selected){
			if(this.getMethods("onBeforeProfilePermissionSelect")){
				this.executeMethod("onBeforeProfilePermissionSelect", selected);
			}
			let profiles_list = this.data.cxPropProfiles;
			var profileListLength = profiles_list.length;
			for (let j = 0; j < profileListLength; j++) {
				let profile_item = profiles_list[j];
				Lyte.objectUtils( profile_item , "add" , "permission_type" ,selected );	
			}			
			if(this.getMethods("onProfilePermissionChanged")){
				this.executeMethod("onProfilePermissionChanged", profiles_list);
			}					
		},
		onPermissionBeforeSelect : function(item, event, previous_selected, component, lyte_drop_item, selected){
			if(this.getMethods("onBeforeProfilePermissionSelect")){
				return this.executeMethod("onBeforeProfilePermissionSelect", item, previous_selected, component, lyte_drop_item, selected);
			}
		},
		onPermissionSelect : function(item, event, selected_val){	
			let currentProfile = this.data.cxPropProfiles.filter(obj => obj.id ===item.id)[0];
			this.setData({'allPermission_selected': false});
			// let permission_type = this.data.cxPropAllPermissionsList.filter(obj => obj.system_value ===selected_val)[0].system_value;
			Lyte.objectUtils( currentProfile , "add" , "permission_type" ,selected_val );
			if(this.getMethods("onProfilePermissionChanged")){
				this.executeMethod("onProfilePermissionChanged", this.data.cxPropProfiles);
			}
		}
	}
});

Lyte.Component.registerHelper("cxGetCurrentProfilePermissionType", function (profileId) { //no i18n
	let prof = this.component.data.cxPropFieldProfiles;
	return prof ? prof.filter(obj => obj.id ===profileId)[0].permission_type: "read_write";
});

Lyte.Component.registerHelper("cxGetDisplayValue", function (permission_type) { //no i18n
	let prof = this.component.data.cxPropAllPermissionsList;
	return prof.filter(obj => obj.system_value ===permission_type)[0].display_value;
});

Lyte.Mixin.register("crux-page-builder-mixin", {
	setTitleToInput : function(input,value){
		if(input){
			$L.fastdom.measure(()=>{
				var set = false;
				if(input.scrollWidth > input.clientWidth){
					set = true;
				}
				$L.fastdom.mutate(()=>{
					input.closest('lyte-input').setAttribute('lt-prop-title',set ? value : "");
				});
			});
		}
		
	}
});


if(typeof CruxPageBuilder === 'undefined'){
	CruxPageBuilder = {}; //eslint-disable-line @zoho/webperf/no-global-variables
}

CruxPageBuilder.templateJSONConvertFunction = function(sectionArray,type = 'standard',options ={}){
	if(!options.cxPropId){
		var a = 1;
		while($L('.cxPbUniqueClass'+a).length > 0){ //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
			a++;
		}
		options.cxPropId = a;
	}
	var fieldConvertFunction = function(fields,section){
		var rows = [],r = 0,ret = [];
		rows[r] = {};
		var columns = section.column_count ? section.column_count === 'single_column_section' ? 1 : 2 :  2;
		var fieldLen = fields.length;
		for(var i=0;i<fieldLen;i++){
			var ind = parseInt(fields[i].sequence_number) % columns;
			if(!rows[r][ind]){
				rows[r][ind] = [];
			}
			rows[r][ind].push(fields[i]);
		}
		rows.forEach(function(item){
			var col = [];
			var inv = Object.values(item).reverse();

			inv.forEach(function(co,coind){
				var emp = [];
				co.forEach(function(field){
					if(field.address){
						return;
					}
					emp.push({
						"node":"element",
						"tag":"crux-page-builder-element",
						"attr":{
							"data-type" : field instanceof Record ? field.$.toJSON()['data_type'] : field.data_type,
							"lyte-pb-static-column-span":1,
							"lyte-pb-static-type":"STATIC_ELEMENT",
							'lyte-pb-static-label' : 'Element',
							"class":" entity__item lytePbEntityItem",
							"cx-prop-type" : type,
							"cx-prop-id" : options.cxPropId,
							"cx-prop-field" : JSON.stringify({id : field.id})

						},
						"child":[],
						"title":"Element",
						"systemAttributes":""
					});
				});
				col.push({
					"node":"element",
					"tag":"lyte-pb-column-template",
					"attr":{
						"class":"lytePbColumnItem",
						"lyte-pb-static-drop":"true",
						"lyte-pb-static-add-element":"false",
						"lyte-pb-static-column-span":1,
						"lyte-pb-static-column-start":coind,
						"data-zcqa" : "cxPbQcColumnZcqa"
					},
					"child":emp,
					"title":"",
					"systemAttributes":""
				});
			});


			ret.push({
				"node":"element",
				"tag":"lyte-pb-row-template",
				"attr":{
					"lyte-pb-static-ratio":columns === 2 ? "1:1" : "1",
					"lyte-pb-static-columns":columns,
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-option":"grid",
					// "lyte-pb-static-view":"false",
					'lyte-pb-static-basic-props' : 'true',
					"data-zcqa" : "cxPbQcRowZcqa"
				},
				"child":col,
				"title":"",
				"systemAttributes":""
			});

			
		});
		return ret;
	};
	var sectionConvertFunction = function(section){
		var output;
		if(options.cxSectionJsonUpdateCallback){
			var out = options.cxSectionJsonUpdateCallback(section);
			if(typeof out === 'object'){
				return out;
			}
		}
		if(section.api_name === 'Record_Image'){
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-record-image',title : "RecordImage"};
			output.attr = {class : 'cxPbElementSection','cx-section-id' : section.id,'cx-prop-section-id' : section.id, 'cx-prevent-new-section-creation' : options.cxPreventNewSectionCreation, 'lyte-pb-static-label' : 'Section',"lyte-pb-static-drag":"false","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];
		}else if(section.subform){
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-subform',title : "Subform"};
			output.attr = {class : 'cxPbElementSection','cx-section-id' : section.id,'cx-prop-section-id' : section.id, 'cx-prevent-new-section-creation' : options.cxPreventNewSectionCreation, 'lyte-pb-static-label' : 'Subform',"lyte-pb-static-drag":"true","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];
		}else{
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-section',title : "Section"};
			let sec_class = section.column_count === 'single_column_section' ? 'cxPbElementSection cxPbSingleColElemSection': 'cxPbElementSection';
			output.attr = {class : sec_class,'cx-section-id' : section.id,'lyte-pb-static-label' : 'Section',"lyte-pb-static-drag":"true","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];

			var columns = section.column_count ? section.column_count === 'single_column_section' ? 1 : 2 :  2;

			output.child.push({
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"false",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":columns,
					// "lyte-pb-static-view":"false",
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true',
					"lyte-pb-static-layout" : "moduleBuilderLayout"
				},
				child : fieldConvertFunction(section.section_field,section)
				,
				"title":"",
				"systemAttributes":""
			});
			// if(!options.cxPreventNewSectionCreation){
			// 	output.child.push({
			// 		"node":"element",
			// 		"tag":"span",
			// 		"attr":{
			// 			"class":"cxPbNewSectionBtn lytePbRejectDrag"
			// 		},
			// 		"child":[
			// 		{
			// 			"node":"element",
			// 			"tag":"span",
			// 			"attr":{
			// 				"class":"cxPbSprite cxPbPlusIcon"
			// 			},
			// 			"child":[],
			// 			"title":"",
			// 			"systemAttributes":""
			// 		},{
			// 			"node":"text",
			// 			"text":_cruxUtils.getI18n('crm.event.layout.new.section'),
			// 			"title":""
			// 		}],
			// 		"title":"",
			// 		"systemAttributes":""
			// 	});
			// }
		}
		return output;
	};


	var output = { node : 'root'};
	output.child = [];
	if(type === 'standard'){
		sectionArray.forEach((section)=>{
			output.child.push(sectionConvertFunction(section));
		});
	}else if(type === 'quickcreate'){ 
		var qcnode = {node : 'element',systemAttributes : '',tag : 'div'};
		qcnode.attr = {class : 'cxPbQuickCreateSection lytePbRejectDrag',"lyte-pb-static-label" : 'DummyDiv'};
		qcnode.child = [];
		// var childArray = []
		// sectionArray.section_field.forEach((fieldItem)=>{
		// 	childArray.push({
		// 		"node":"element",
		// 		"tag":"crux-page-builder-element",
		// 		"attr":{
		// 			"cx-mapping":"phone",
		// 			"data-type" : fieldItem instanceof Record ? fieldItem.$.toJSON()['data_type'] : fieldItem.data_type,
		// 			"lyte-pb-static-column-span":1,
		// 			"lyte-pb-static-type":"STATIC_ELEMENT",
		// 			'lyte-pb-static-label' : 'Element',
		// 			"class":" entity__item lytePbEntityItem",
		// 			"cx-prop-type" : type,
		// 			"cx-prop-id" : options.cxPropId,
		// 			"cx-prop-field" : JSON.stringify({id : fieldItem.id})

		// 		},
		// 		"child":[],
		// 		"title":"Element",
		// 		"systemAttributes":""
		// 	})
		// })
		// qcnode.child=childArray
		qcnode.child=
			[{
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"true",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":"1",
					// "lyte-pb-static-view":"false",
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true'
				},
				child : fieldConvertFunction(sectionArray.section_field,sectionArray)
				,
				"title":"",
				"systemAttributes":""
			}];
		output.child.push(qcnode);
	}
	return output;
};

//eslint-disable-next-line @zoho/zohocrm/no-unused-vars
class CruxCommonBuilder{ //eslint-disable-line no-unused-vars
	constructor(id){
		this.cruxNode = this['cruxNode'+id];
	}
	updateFieldList(opt,label){
		this.cruxNode.component.updateFieldList(opt,label);
	}
	updateSectionList(opt,label){
		this.cruxNode.component.updateSectionList(opt,label);
	}
	getData(dataName){
		return this.cruxNode.getData(dataName);
	}
	getMethods(methodName){
		return this.cruxNode.getMethods(methodName);
	}

	executeMethod(){
		return this.cruxNode.component.executeMethod.apply(this.cruxNode.component,arguments);
		// return
	}
}


//# sourceMappingURL=crux-page-builder-component.js.map