Lyte.Component.register("crux-page-builder-preview", {
_template:"<template tag-name=\"crux-page-builder-preview\"> </template>",
_dynamicNodes : [],
_observedAttributes :["cxPropPreview"],
_observedAttributesType :["boolean"],

	data : function(){
		return {
			cxPropPreview :  Lyte.attr('boolean', {"default" : true}) //NO I18n
		};		
	},
	init : function(){
		this.$lc.set({"cxPropPreview":true});
	}
});
