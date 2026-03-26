Lyte.Component.register("crux-create-layout-content", {
_template:"<template tag-name=\"crux-create-layout-content\"> <div class=\"cxcreateSectionsCont\"> <template items=\"{{cxPropLayoutSections}}\" item=\"section\" index=\"index\" is=\"for\"> <crux-create-section cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-section=\"{{section}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutContentYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" is-subform=\"{{isSubform}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{section}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-section> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["cxPropLayoutComponentData","cxPropRenderMode","instanceObjKey","cxPropModuleData","cxPropLayoutSections","moduleCurntInstObj","yieldLayoutGlobalData"],
_observedAttributesType :["object","string","string","object","array","object","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "outlet", "hideAttr": true }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropLayoutSections: Lyte.attr('array', { 'default': [] }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} })//no i18n
		}
	},
	actions: {
		// Functions for event handling
	},
	methods: {
		// Functions which can be used as callback in the component.
	}
});