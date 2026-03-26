//$Id$
Lyte.Component.register("crux-criteria-pattern", {
_template:"<template tag-name=\"crux-criteria-pattern\"> <span class=\"cxGroupPattern\"> <span class=\"cxPatternBrakets prevent\">(</span> <template is=\"if\" value=\"{{cruxHasProperty(patternNode,'group_operator')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxHasProperty(patternNode.group[0],'group_operator')}}\"><template case=\"true\"> <crux-criteria-pattern class=\"prevent\" pattern-node=\"{{patternNode.group[0]}}\" pattern-array=\"{{patternArray}}\"></crux-criteria-pattern> </template><template case=\"false\"> <span class=\"cxCritPtnNum\" data-value=\"{{patternNode.group[0]}}\">{{getNodeValue(patternArray,patternNode.group[0])}}</span> </template></template> <span class=\"cP criteriaCondition\" onclick=\"{{action('changePatternCondition')}}\">{{cruxGetI18n(patternNode.group_operator)}}</span> <template is=\"if\" value=\"{{cruxHasProperty(patternNode.group[1],'group_operator')}}\"><template case=\"true\"> <crux-criteria-pattern class=\"prevent\" pattern-node=\"{{patternNode.group[1]}}\" pattern-array=\"{{patternArray}}\"></crux-criteria-pattern> </template><template case=\"false\"> <span class=\"cxCritPtnNum\" data-value=\"{{patternNode.group[1]}}\">{{getNodeValue(patternArray,patternNode.group[1])}}</span> </template></template> </template></template> <span class=\"cxPatternBrakets prevent\">)</span> </span> </template>",
_dynamicNodes : [{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["patternNode","patternArray"],
_observedAttributesType :["object","array"],
 //no i18n
	data : function(){
		return {
 			patternNode : Lyte.attr('object'),//no i18n
 			patternArray : Lyte.attr('array') //no i18n
		}		
	},
	actions : {
		changePatternCondition : function(){
			Lyte.Component.set(this.data.patternNode,'group_operator',this.data.patternNode.group_operator == 'or' ? 'and' : 'or');//no i18n
		}
	}
});
