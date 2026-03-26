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
