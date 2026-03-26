Lyte.Component.register("crux-disabled-tooltip", {
_template:"<template tag-name=\"crux-disabled-tooltip\"> <lyte-hovercard lt-prop-popover-wrapper-class=\"cxPickItemDisabledHoverWrapper\" lt-prop-class=\"cxPickItemDisabledHoverCard\" lt-prop-origin-elem=\"{{cxPropOriginElem}}\" lt-prop-show=\"{{show}}\" lt-prop-popover=\"{&quot;allowMultiple&quot;:true}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <template is=\"if\" value=\"{{cxPropOption}}\"><template case=\"true\"><div class=\"cxItemCardText\">{{cxPropOption}}</div></template></template> <div class=\"cxItemCardTooltipMsg\"> <template is=\"if\" value=\"{{cxPropOption}}\"><template case=\"true\"><div class=\"cxItemCardTooltipHead\"> <span class=\"cxSprite cxInfoRedBgIcon\"></span> <span>{{cruxGetI18n('crm.validation.rule.aler.head')}}</span> </div></template></template> <div class=\"cxItemCardTooltipContent\"> {{cxPropDisabledReason}} </div> </div> </lyte-hovercard-content> </template> </lyte-hovercard> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"text","position":[1,3,3,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropOriginElem","cxPropShow","cxPropDisabledReason","cxPropOption","show"],
_observedAttributesType :["string","boolean","string","string","boolean"],

	data : function(){
		return {
			cxPropOriginElem: Lyte.attr('string'),
			cxPropShow:Lyte.attr('boolean'),
			cxPropDisabledReason: Lyte.attr('string'),
			cxPropOption: Lyte.attr('string'),
			show:Lyte.attr('boolean'),
		} 		
	},
	obs: function(){
		this.setData('show',this.getData('cxPropShow'))
	}.observes('cxPropShow').on('didConnect')
});
