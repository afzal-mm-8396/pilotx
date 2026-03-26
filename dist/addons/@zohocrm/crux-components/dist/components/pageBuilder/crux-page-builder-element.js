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
