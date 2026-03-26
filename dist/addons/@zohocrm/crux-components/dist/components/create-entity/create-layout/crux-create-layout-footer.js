Lyte.Component.register("crux-create-layout-footer", {
_template:"<template tag-name=\"crux-create-layout-footer\"> <div class=\"cx-layout-footer-wrapper\"> <div class=\"cx-layout-footer-yield-wrapper\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFooterYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </div> <template is=\"if\" value=\"{{expHandlers(cxPropLayoutComponentData.isQuickCreate,'||',expHandlers(cxPropLayoutComponentData.buttonData.button_position,'===','bottom'))}}\"><template case=\"true\"> <div class=\"cx-layout-footer-button-wrapper\"> <crux-create-button module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\"> </crux-create-button> </div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropRenderMode","cxPropModuleData","showButton","moduleCurntInstObj","yieldLayoutGlobalData"],
_observedAttributesType :["object","string","string","object","boolean","object","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "outlet", "hideAttr": true }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			showButton: Lyte.attr("boolean", { "default": true }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} })//no i18n
		}
	}
});