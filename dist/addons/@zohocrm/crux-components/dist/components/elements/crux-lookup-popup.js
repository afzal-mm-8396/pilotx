//$Id$
Lyte.Component.register("crux-lookup-popup", {
_template:"<template tag-name=\"crux-lookup-popup\"> <lyte-popover lt-prop-wrapper-class=\"cxLookupPopoverWrapper {{cxPropPopoverWrapperClass}}\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{showPopover}}\" lt-prop-freeze=\"false\" lt-prop-type=\"callout\" lt-prop-bind-to-body=\"true\" lt-prop-content-padding=\"0px\" lt-prop-origin-elem=\".cxVisibleLookup .cruxLookupPopover\" lt-prop-duration=\"{{undefinedValue}}\" on-close=\"{{method('closePopver')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <div class=\"cxLookupHoverWrapper\"> <lyte-table lt-prop-yield=\"true\" lt-prop-width=\"100%\" lt-prop-height=\"100%\" lt-prop-border=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure class=\"cxDivTable\"> <lyte-tbody> <template is=\"for\" items=\"{{bcFields}}\" item=\"field\" index=\"index\"> <lyte-tr> <lyte-td class=\"cxLookupPopTd cxLookupViewLabel\">{{field.field_label}}</lyte-td> <lyte-td class=\"cxLookupPopTd cxLookupViewValue\"> <template is=\"if\" value=\"{{data[field.api_name]}}\"><template case=\"true\"> <template is=\"if\" value=\"{{field.mask_details}}\"><template case=\"true\"> {{cruxMaskValue(expHandlers(record[field.api_name].name,'?:',record[field.api_name].name,data[field.api_name]),field.mask_details,true)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{data[field.api_name].name}}\"><template case=\"true\"> {{data[field.api_name].name}} </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.data_type,'==',&quot;autonumber&quot;)}}\"><template case=\"true\"> {{data[field.api_name]}} </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.ui_type,'==',250)}}\"><template case=\"true\"> <crm-richtext-component cx-prop-value=\"{{data[field.api_name]}}\" cx-prop-from=\"view\" show-more-button=\"false\"></crm-richtext-component> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(field.data_type,'==',&quot;textarea&quot;),'||',expHandlers(field.data_type,'==',&quot;text-area&quot;))}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{data[field.api_name]}}\" style=\"max-width: 300px;\"></lyte-text> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(fieldMapping[field.ui_type],'&amp;&amp;',expHandlers(fieldMapping[field.ui_type],'!=',&quot;text&quot;)),'&amp;&amp;',expHandlers(fieldMapping[field.ui_type],'!=',&quot;email&quot;))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{fieldMapping[field.ui_type]}}-component\" cx-prop-value=\"{{data[field.api_name]}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{data.Currency}}\" cx-prop-exchange-rate=\"{{data.Exchange_Rate}}\" cx-prop-home-currency=\"{{data.$home_converted_currency[field.api_name]}}\" cx-prop-formatted-currency=\"{{data.$formatted_currency[field.api_name]}}\" cx-prop-call-allowed=\"{{cxPropCallAllowed}}\" cx-prop-datetime-in-user-pattern=\"{{cxPropDatetimeInUserPattern}}\" cx-prop-date-in-user-pattern=\"{{cxPropDateInUserPattern}}\" cx-prop-phone-in-user-format=\"{{cxPropPhoneInUserFormat}}\"></template> </template><template case=\"false\"> {{data[field.api_name]}} </template></template></template></template></template></template></template></template></template></template> </template></template> </template><template case=\"false\">-</template></template> </lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </div> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["show","showPopover","module","bcFields","fieldMapping","undefinedValue","cxPropPopoverWrapperClass","cxPropModuleDisplayField","cxPropCallAllowed","cxPropDatetimeInUserPattern","cxPropDateInUserPattern","cxPropPhoneInUserFormat"],
_observedAttributesType :["boolean","boolean","object","array","object","number","string","object","boolean","boolean","boolean","boolean"],
//no i18n
	data : function(){
		return {
			show : Lyte.attr("boolean", {default : false}),//no i18n
			showPopover: Lyte.attr("boolean"),
			module : Lyte.attr("object"),//no i18n
			bcFields : Lyte.attr("array"),//no i18n
			fieldMapping : Lyte.attr("object"),//No I18n
			undefinedValue : Lyte.attr("number", {default : undefined}),//No I18n
            cxPropPopoverWrapperClass: Lyte.attr("string", {default: ""}),   //NO I18N
			cxPropModuleDisplayField: Lyte.attr("object", {default : typeof crmConstants!=="undefined" ? crmConstants.moduleDisplayField:{}}),//no i18n
			cxPropCallAllowed: Lyte.attr('boolean',{default:true}),
			cxPropDatetimeInUserPattern: Lyte.attr('boolean',{default:true}),
			cxPropDateInUserPattern: Lyte.attr('boolean',{default:true}),
			cxPropPhoneInUserFormat: Lyte.attr('boolean',{default:true})

		}		
	},
	observeShow: function(){
		let show = this.getData('show');
		if(show){
			var layoutId = this.getData('data').Layout ? this.getData('data').Layout.id : moduleRecordMapping[this.getData('module').module_name].layouts ?moduleRecordMapping[this.getData('module').module_name].layouts[0].id : undefined;
			let prm = layoutId ? store.findRecord("layout",layoutId,{"module": this.getData('module').api_name,"mode":"business_card"},true , false) : store.findAll('layout',{"module": this.getData('module').api_name,"mode":"business_card"},true , false);
			prm.then((res)=>{
				if(res.layout[0] && res.layout[0].sections){
					var bcSection = res.layout[0].sections.find((sec)=>sec.api_name==='Business Card');
					if(bcSection && bcSection.fields){
						var bcFields = bcSection.fields, validbcFields = [];//No I18n
						for(var i=1; i<bcFields.length; i++){
							var field = bcFields[i];
							var disField = this.getData('cxPropModuleDisplayField')[this.getData('module').module_name] ? this.getData('cxPropModuleDisplayField')[this.getData('module').module_name] : ['Name']
							if(field && field.column_name !== "ISCALLBILLABLE" && field.visible !== false && !disField.includes(field.api_name)){
								validbcFields.push(field);
							}
						}
						this.setData("bcFields", validbcFields);//no i18n
						this.setData('showPopover',true);
					}
				}
			})
		}else{
			this.setData('showPopover',false);
		}
	}.observes('show'),
	methods : {
	    closePopver : function(){
	    	setTimeout(function(){
		        this.$node.querySelector("lyte-popover").setData("ltPropBindToBody", false); //no i18n	    		
	    	}.bind(this), 1);
	    }
	}
});
