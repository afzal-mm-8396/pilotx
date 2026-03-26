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
