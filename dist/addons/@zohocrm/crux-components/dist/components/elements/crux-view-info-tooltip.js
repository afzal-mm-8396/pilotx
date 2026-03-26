Lyte.Component.register("crux-view-info-tooltip", {
_template:"<template tag-name=\"crux-view-info-tooltip\"> <i class=\"cxInfoIcon cxViewInfoTooltipIcon\" lyte-hovercard=\"true\" id=\"{{cxPropId}}_{{cxPropField.api_name}}_icon\"></i> <lyte-hovercard lt-prop-origin-elem=\"#{{cxPropId}}_{{cxPropField.api_name}}_icon\" lt-prop-auto-show=\"true\"> <template is=\"yield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{cxPropField}}\" prop-value=\"{{cxPropValue}}\"></lyte-yield> </lyte-hovercard-content> </template> </lyte-hovercard> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],

	data : function(){
		return {

		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});