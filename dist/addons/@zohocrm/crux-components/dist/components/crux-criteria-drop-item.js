Lyte.Component.register("crux-criteria-drop-item", {
_template:"<template tag-name=\"crux-criteria-drop-item\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','prefix')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropType,'==','group')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropOptions.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{cxPropItem.cxPropLabel}}</lyte-drop-label> <template is=\"for\" items=\"{{cxPropItem.cxPropOptions}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-type=\"prefix\" cx-prop-id=\"{{cxPropId}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"{{cxPropDataZcqa}}\" cx-prop-prefix-item=\"{{cxPropPrefixItem}}\"></crux-criteria-drop-item> </template> </lyte-drop-group> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropItem.unused,'!'),'&amp;&amp;',expHandlers(cxPropItem.type,'!=','unused'))}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{cxPropId}}{{cxPropPrefixItem.systemValue}} {{if(cxPropItem.cxDisabled,'cxCriteriaItemDisabled')}}\" onclick=\"{{action('onDropItemClick',event)}}\" onmouseover=\"{{action('dropdownItemMouse',event)}}\" onmouseout=\"{{action('dropdownItemMouse',event)}}\" data-value=\"{{cxPropItem[cxPropPrefixItem.systemValue]}}\" data-zcqa=\"{{cxPropDataZcqa}}_{{cxPropItem[cxPropPrefixItem.systemValue]}}_{{cxPropId}}\" index=\"{{indexi}}\" data-custom-tooltip=\"{{if(cxPropItem.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(cxPropItem.cxTitle,cxPropItem.cxTitle,'')}}\"> {{cxPropItem[cxPropPrefixItem.displayValue]}} </lyte-drop-item> </template></template> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropType,'==','group')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropFields.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{cxPropItem.cxPropLabel}}</lyte-drop-label> <template is=\"for\" items=\"{{cxPropItem.cxPropFields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{cxPropId}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"{{cxPropDataZcqa}}\" cx-prop-display-selector=\"{{cxPropDisplaySelector}}\" cx-prop-hide-id=\"{{cxPropHideId}}\"></crux-criteria-drop-item> </template> </lyte-drop-group> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropItem.id,'!'),'||',expHandlers(cxPropItem.id,'!=',cxPropHideId)),'&amp;&amp;',expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropItem.unused,'!'),'&amp;&amp;',cxPropItem.visible),'&amp;&amp;',expHandlers(cxPropItem.type,'!=','unused')),'&amp;&amp;',cxCriteriaShowField(cxPropItem,hiddenFieldTypes)),'||',cxPropShowAll))}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{cxPropId}} {{if(cxPropItem.cxDisabled,'cxCriteriaItemDisabled')}}\" data-value=\"{{cxPropItem.api_name}}\" data-zcqa=\"{{cxPropDataZcqa}}_{{cxPropItem.api_name}}_{{cxPropId}}\" id=\"{{cxPropItem.data_type}}\" value=\"{{cxPropItem.api_name}}\" onclick=\"{{action('onDropItemClick',event)}}\" onmouseover=\"{{action('dropdownItemMouse',event)}}\" onmouseout=\"{{action('dropdownItemMouse',event)}}\" data-custom-tooltip=\"{{if(cxPropItem.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(cxPropItem.cxTitle,cxPropItem.cxTitle,'')}}\"> {{cxPropItem[cxPropDisplaySelector]}} </lyte-drop-item> </template></template> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropId","cxPropItem","cxPropDataZcqa","cxPropDisplaySelector","cxPropShowAll","cxPropHideId","cxPropType","cxPropPrefixItem"],
_observedAttributesType :["string","object","string","string","boolean","string","string","object"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string'), //no i18n
			cxPropItem : Lyte.attr('object'), //no i18n
			cxPropDataZcqa : Lyte.attr('string'), //no i18n
			cxPropDisplaySelector : Lyte.attr('string'), //no i18n
			cxPropShowAll : Lyte.attr('boolean'), //no i18n
			cxPropHideId : Lyte.attr('string'), //no i18n
			cxPropType : Lyte.attr('string',{default : 'field'}), //no i18n
			cxPropPrefixItem : Lyte.attr('object') //no i18n
		}		
	},
	init : function(){
		var hiddenFieldTypes = [];
		if(typeof cruxAssets !== "undefined" && cruxAssets.cxHiddenCriteriaFieldTypes){
			hiddenFieldTypes = cruxAssets.cxHiddenCriteriaFieldTypes;
		}
		this.setData('hiddenFieldTypes',hiddenFieldTypes);
	},
	actions : {
		onDropItemClick : function(event){
			if(this.data.cxPropItem.cxDisabled){
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		},
		dropdownItemMouse : function(event){
			if(this.data.cxPropItem.cxDisabled){
				if(event.type == 'mouseover'){
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			}
		}
	}
});

Lyte.Component.registerHelper('cxCriteriaShowField',function(field,hiddenFieldTypes){
	var hfl = hiddenFieldTypes ? hiddenFieldTypes.length : 0;
	for(var i=0;i<hfl;i++){
	    var match = true;
	    for(var keyN in hiddenFieldTypes[i]){
	        if(field[keyN] !== hiddenFieldTypes[i][keyN]){
	            match = false;
	            break;
	        }
	    }
	    if(match){
	        return false;
	    }
	}
	return true;
});