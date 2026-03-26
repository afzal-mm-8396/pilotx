Lyte.Component.register("crux-create-layout-dropdown", {
_template:"<template tag-name=\"crux-create-layout-dropdown\"> <div class=\"crux-create-row\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(defaultLayoutDropdownData.length,'>',1),'&amp;&amp;',cxPropLayoutComponentData.isQuickCreate)}}\"><template case=\"true\"><div class=\"cxElementLabel\">Layout</div></template></template> <template is=\"if\" value=\"{{expHandlers(showIntegrationLayoutDropdown,'&amp;&amp;',expHandlers(integrationDropdownData.length,'>',1))}}\"><template case=\"true\"> <crux-dropdown on-option-select=\"{{method('onLayoutSelection',true)}}\" cx-prop-display-value=\"{{lbind(currentIntegrationLayoutDisplayValue)}}\" cx-prop-selected=\"{{lbind(currentIntegrationLayoutSelectedValue)}}\" cx-prop-options=\"{{integrationDropdownData}}\" cx-prop-system-value=\"systemvalue\" cx-prop-user-value=\"uservalue\"> </crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(defaultLayoutDropdownData.length,'>',1)}}\"><template case=\"true\"> <crux-dropdown on-option-select=\"{{method('onLayoutSelection',false)}}\" cx-prop-display-value=\"{{lbind(currentDefaultLayoutDisplayValue)}}\" cx-prop-selected=\"{{lbind(currentDefaultLayoutSelectedValue)}}\" cx-prop-options=\"{{defaultLayoutDropdownData}}\" cx-prop-system-value=\"systemvalue\" cx-prop-user-value=\"uservalue\"> </crux-dropdown> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","layoutDropdownData","instanceObjKey","integrationDropdownData","defaultLayoutDropdownData","cxPropModuleName","currentDefaultLayoutDisplayValue","currentDefaultLayoutSelectedValue","currentIntegrationLayoutDisplayValue","currentIntegrationLayoutSelectedValue","showIntegrationLayoutDropdown"],
_observedAttributesType :["object","array","string","array","array","string","string","string","string","string","boolean"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			layoutDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			integrationDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			defaultLayoutDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			cxPropModuleName: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentDefaultLayoutDisplayValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentDefaultLayoutSelectedValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentIntegrationLayoutDisplayValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentIntegrationLayoutSelectedValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			showIntegrationLayoutDropdown: Lyte.attr("boolean", { "default": false }) //no i18n
		}
	},
	setRespectiveDropdownData: function () {
		let dropdownData = this.data.layoutDropdownData || [], integrationDropdownData = [], defaultLayoutDropdownData = [];
		dropdownData.forEach((options) => {
			if (!(options.status === "active")) {
				return;
			}
			if (options.source === "campaign_integration") {
				integrationDropdownData.push(options);
			} else {
				defaultLayoutDropdownData.push(options);
			}
		});
		this.setData('integrationDropdownData', integrationDropdownData);
		this.setData('defaultLayoutDropdownData', defaultLayoutDropdownData);
		let currentSelectedLayoutDetails = defaultLayoutDropdownData.filter((f) => { return f.id === this.data.cxPropLayoutComponentData.cxPropLayoutId })[0];
		if (currentSelectedLayoutDetails) {
			this.setData({
				'currentDefaultLayoutDisplayValue': currentSelectedLayoutDetails.uservalue,
				'currentDefaultLayoutSelectedValue': currentSelectedLayoutDetails.id
			});
		}
	},
	observeLayoutDropdownData: function () {
		this.setRespectiveDropdownData();
	}.observes('layoutDropdownData.[]').on('init'),
	methods: {
		onLayoutSelection: function (isIntegrationLayout, ev, selectedLayoutId) {
			let cxPropLayoutComponentData = this.data.cxPropLayoutComponentData;
			if (selectedLayoutId === cxPropLayoutComponentData.cxPropLayoutId) {
				return;
			}
			let ddOptions = this.data.defaultLayoutDropdownData || [];
			if (isIntegrationLayout) {
				ddOptions = this.data.integrationDropdownData || [];
			}
			let currentLayoutInfo = ddOptions.filter(layoutInfo => layoutInfo.id === selectedLayoutId)[0];
			let selectedLayoutName = currentLayoutInfo && currentLayoutInfo.uservalue;
			this.invokeCruxFormCallBacks({
				callbackEventName: 'onFormLayoutSwitch',//no i18n
				onFormLayoutSwitch: {
					selectedLayoutId,
					selectedLayoutName,
					cxPropLayoutComponentData,
					newLayoutRenderObj: this.getNewLayoutRenderingObj(selectedLayoutId, cxPropLayoutComponentData)
				}
			});
			//this.getNewLayoutRenderingObj(selectedLayoutId, cxPropLayoutComponentData);
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils"
	]
});