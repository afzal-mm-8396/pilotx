
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