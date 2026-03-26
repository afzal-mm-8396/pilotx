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
