Lyte.Component.register("crux-icons", {
_template:"<template tag-name=\"crux-icons\"> <svg class=\"zcicn_embedSvg {{cxIconClass}}\"> <use href=\"{{expHandlers('#zcicn-','+',cxIconName)}}\"></use> </svg> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}],
_observedAttributes :["cxIconName","cxIconClass"],
_observedAttributesType :["string","string"],

	data : function(){
		return {
			cxIconName : Lyte.attr('string'),
			cxIconClass : Lyte.attr('string')
		};		
	}
});
