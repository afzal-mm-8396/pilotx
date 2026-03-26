Lyte.Component.register("crux-select-modal", {
_template:"<template tag-name=\"crux-select-modal\"> <lyte-beta-modal lt-prop-wrapper-class=\"selectModalWrpr cxSelectModalWrapper {{cxPropModalWrapCls}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-allow-multiple=\"{{cxPropAllowMultiple}}\" lt-prop-close-on-escape=\"{{cxPropCloseOnEscape}}\" lt-prop-max-height=\"{{cxPropMaxHeight}}\" lt-prop-height=\"{{cxPropHeight}}\" lt-prop-show-close-button=\"{{cxPropShowCloseButton}}\" lt-prop-max-width=\"{{cxPropMaxWidth}}\" lt-prop-width=\"{{cxPropModalWidth}}\" lt-prop-transition=\"{{cxPropTransition}}\" lt-prop-offset=\"{{cxPropOffset}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-dimmer=\"{{cxPropDimmer}}\" on-before-show=\"{{method(&quot;modalBeforeShow&quot;)}}\" on-show=\"{{method(&quot;modalShow&quot;)}}\" on-before-close=\"{{method('onBeforeModalClose')}}\" on-close=\"{{method('onModalClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <template is=\"if\" value=\"{{cxPropHeader}}\"><template case=\"true\"><lyte-modal-header class=\"cxSelectModalHeader\"> {{cxPropHeader}} </lyte-modal-header></template></template> <lyte-modal-content> <crux-select-panel cx-prop-filter-options=\"{{cxPropFilterOptions}}\" cx-prop-filter-zcqa=\"{{cxPropFilterZcqa}}\" cx-prop-filter-user-value=\"{{cxPropFilterUserValue}}\" cx-prop-filter-system-value=\"{{cxPropFilterSystemValue}}\" cx-prop-search-zcqa=\"{{cxPropSearchZcqa}}\" cx-prop-group-placeholder=\"{{cxPropGroupPlaceholder}}\" cx-prop-placeholder=\"{{cxPropPlaceholder}}\" cx-prop-input-autocomplete=\"{{cxPropInputAutocomplete}}\" cx-prop-input-autofocus=\"{{cxPropInputAutofocus}}\" cx-prop-input-disabled=\"{{cxPropInputDisabled}}\" cx-prop-input-style=\"{{cxPropInputStyle}}\" cx-prop-input-readonly=\"{{cxPropInputReadonly}}\" cx-prop-input-id=\"{{cxPropInputId}}\" cx-prop-input-class=\"{{cxPropInputClass}}\" cx-prop-input-type=\"{{cxPropInputType}}\" cx-prop-input-name=\"{{cxPropInputName}}\" cx-prop-input-width=\"{{cxPropInputWidth}}\" cx-prop-input-appearance=\"{{cxPropInputAppearance}}\" cx-prop-input-direction=\"{{cxPropInputDirection}}\" cx-prop-input-tabindex=\"{{cxPropInputTabindex}}\" cx-prop-close-icon=\"{{cxPropCloseIcon}}\" cx-prop-maxlength=\"{{cxPropMaxlength}}\" cx-prop-show-select-all=\"{{cxPropShowSelectAll}}\" cx-prop-selected-users-label=\"{{cxPropSelectedUsersLabel}}\" cx-prop-add-more-users-label=\"{{cxPropAddMoreUsersLabel}}\" cx-prop-add-more-zcqa=\"{{cxPropAddMoreZcqa}}\" cx-prop-select-all-zcqa=\"{{cxPropSelectAllZcqa}}\" cx-prop-disable-select-all-chk-box=\"{{cxPropDisableSelectAllChkBox}}\" cx-prop-select-all-title=\"{{cxPropSelectAllTitle}}\" cx-prop-select-all-in-view-zcqa=\"{{cxPropSelectAllInViewZcqa}}\" cx-prop-select-all-users-label=\"{{cxPropSelectAllUsersLabel}}\" cx-prop-display-selected-zcqa=\"{{cxPropDisplaySelectedZcqa}}\" cx-prop-checkbox-zcqa=\"{{cxPropCheckboxZcqa}}\" cx-prop-diasble-checkbox=\"{{cxPropDiasbleCheckbox}}\" cx-prop-enable-img=\"{{cxPropEnableImg}}\" cx-prop-display-value=\"{{cxPropDisplayValue}}\" cx-prop-query-params=\"{{cxPropQueryParams}}\" cx-prop-data=\"{{cxPropData}}\" cx-prop-selected=\"{{cxPropSelected}}\" cx-prop-sort-enable=\"{{cxPropSortEnable}}\" cx-prop-search-query-params=\"{{cxPropSearchQueryParams}}\" cx-prop-custom-request=\"{{cxPropCustomRequest}}\" cx-prop-elevate-selected=\"{{cxPropElevateSelected}}\" cx-prop-no-result-label=\"{{cxPropNoResultLabel}}\" cx-prop-enable-markusers=\"{{cxPropEnableMarkusers}}\" cx-prop-all-check-box-label=\"{{cxPropAllCheckBoxLabel}}\" cx-prop-enable-displayusers=\"{{cxPropEnableDisplayusers}}\" on-custom-request=\"{{method('cruxPanelOnCustomRequest')}}\" on-before-select-all-checked=\"{{method('cruxPanelOnBeforeSelectAllChecked')}}\" on-before-select-all-unchecked=\"{{method('cruxPanelOnBeforeSelectAllUnchecked')}}\" on-checked=\"{{method('cruxPanelOnChecked')}}\" on-unchecked=\"{{method('cruxPanelOnUnchecked')}}\" on-before-checked=\"{{method('cruxPanelOnBeforeChecked')}}\" on-before-unchecked=\"{{method('cruxPanelOnBeforeUnchecked')}}\" on-before-group-checked=\"{{method('cruxPanelOnBeforeGroupChecked')}}\" on-before-group-unchecked=\"{{method('cruxPanelOnBeforeGroupUnchecked')}}\" cx-prop-enable-dropdown=\"{{cxPropEnableDropdown}}\"></crux-select-panel> </lyte-modal-content> <template is=\"if\" value=\"{{buttonsDisable}}\"><template case=\"true\"> <lyte-modal-footer class=\"right\"> <lyte-button data-zcqa=\"{{cxPropCancelZcqa}}\" onclick=\"{{action('cancelAction')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button data-zcqa=\"{{cxPropConfirmZcqa}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('confirmAction')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('Done')}} </template> </lyte-button> </lyte-modal-footer> </template></template> </template> </lyte-beta-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropModalWrapCls","cxPropShow","cxPropAllowMultiple","cxPropCloseOnEscape","cxPropMaxHeight","cxPropShowCloseButton","cxPropMaxWidth","cxPropModalWidth","cxPropTransition","cxPropOffset","cxPropFreeze","cxPropDimmer","cxPropHeader","buttonsDisable","cxPropCancelZcqa","cxPropConfirmZcqa","cxPropFilterOptions","cxPropFilterZcqa","cxPropFilterUserValue","cxPropFilterSystemValue","cxPropInputAutocomplete","cxPropInputAutofocus","cxPropInputDisabled","cxPropInputStyle","cxPropInputReadonly","cxPropInputId","cxPropInputClass","cxPropInputType","cxPropInputName","cxPropInputWidth","cxPropInputAppearance","cxPropInputDirection","cxPropInputTabindex","cxPropCloseIcon","cxPropMaxlength","cxPropShowSelectAll","cxPropSelectedUsersLabel","cxPropAddMoreUsersLabel","cxPropAddMoreZcqa","cxPropSelectAllZcqa","cxPropDisableSelectAllChkBox","cxPropSelectAllTitle","cxPropSelectAllInViewZcqa","cxPropSelectAllUsersLabel","cxPropDisplaySelectedZcqa","cxPropCheckboxZcqa","cxPropDiasbleCheckbox","cxPropEnableImg","cxPropDisplayValue","cxPropNoResultLabel","cxPropPlaceholder","cxPropSearchZcqa","cxPropGroupPlaceholder","cxPropQueryParams","cxPropData","cxPropSelected","cxPropSortEnable","cxPropSearchQueryParams","cxPropCustomRequest","cxPropHeight","cxPropElevateSelected","cxPropEnableDropdown","cxPropEnableMarkusers","cxPropAllCheckBoxLabel","cxPropEnableDisplayusers"],
_observedAttributesType :["string","boolean","boolean","boolean","string","boolean","string","string","object","object","boolean","object","string","boolean","string","string","array","string","string","string","string","boolean","boolean","string","boolean","string","string","string","string","string","string","string","string","boolean","number","boolean","string","string","string","string","boolean","string","string","string","string","string","boolean","boolean","object","string","string","string","string","object","array","array","boolean","object","boolean","string","boolean","boolean","boolean","string","boolean"],

	data: function () {
		return {
			cxPropModalWrapCls: Lyte.attr('string', { default: "" }),
			cxPropShow: Lyte.attr("boolean", { default: false }), // No I18n
			cxPropAllowMultiple: Lyte.attr('boolean', { "default": false }), //NO I18n
			cxPropCloseOnEscape: Lyte.attr('boolean', { "default": true }), //NO I18n
			cxPropMaxHeight: Lyte.attr("string", { "default": "90%" }), //NO I18N
			cxPropShowCloseButton: Lyte.attr('boolean', { default: false }),
			cxPropMaxWidth: Lyte.attr("string", { "default": "100%" }), //NO I18N
			cxPropModalWidth: Lyte.attr("string", { "default": "370px" }), //NO I18N
			cxPropTransition: Lyte.attr('object', { "default": { "animation": "slideFromTop", "duration": "0.4" } }), //NO I18n
			cxPropOffset: Lyte.attr('object', { "default": { "top": "0px", "left": "center" } }), //NO I18n
			cxPropFreeze: Lyte.attr('boolean'),
			cxPropDimmer: Lyte.attr('object'),
			cxPropHeader: Lyte.attr('string', { default: "" }),
			buttonsDisable: Lyte.attr('boolean', { default: true }),
			cxPropCancelZcqa: Lyte.attr('string', { default: "cancelZcqa" }),
			cxPropConfirmZcqa: Lyte.attr('string', { default: "confirmZcqa" }),

			cxPropFilterOptions: Lyte.attr('array'), //NO I18n
			cxPropFilterZcqa: Lyte.attr('string', { default: "filterZcqa" }),
			cxPropFilterUserValue: Lyte.attr('string', { "default": 'category' }), //NO I18n
			cxPropFilterSystemValue: Lyte.attr('string', { "default": 'id' }), //NO I18n
			cxPropInputAutocomplete: Lyte.attr("string", { "default": 'off' }), //NO I18n
			cxPropInputAutofocus: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputDisabled: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputStyle: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputReadonly: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputId: Lyte.attr("string", { "default": 'inputId' }), //NO I18n
			cxPropInputClass: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputType: Lyte.attr("string", { "default": 'search' }), //NO I18n
			cxPropInputName: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputWidth: Lyte.attr("string", { "default": 'auto' }), //NO I18n
			cxPropInputAppearance: Lyte.attr("string", { "default": 'box' }), //NO I18n
			cxPropInputDirection: Lyte.attr("string", { "default": 'vertical' }), //NO I18n
			cxPropInputTabindex: Lyte.attr('string', { "default": '0' }), //NO I18n
			cxPropCloseIcon: Lyte.attr('boolean', { default: false }),
			cxPropMaxlength: Lyte.attr('number'),
			cxPropShowSelectAll: Lyte.attr('boolean', { default: false }),
			cxPropSelectedUsersLabel: Lyte.attr('string', { default: "" }),
			cxPropAddMoreUsersLabel: Lyte.attr('string', { default: "" }),
			cxPropAddMoreZcqa: Lyte.attr('string', { default: "addMoreZcqa" }),
			cxPropSelectAllZcqa: Lyte.attr('string', { default: "selectAllZcqa" }),
			cxPropDisableSelectAllChkBox: Lyte.attr('boolean', { default: false }),
			cxPropSelectAllTitle: Lyte.attr('string', { default: "" }),
			cxPropSelectAllInViewZcqa: Lyte.attr('string', { default: "selectAllInViewZcqa" }),
			cxPropSelectAllUsersLabel: Lyte.attr('string', { default: "" }),
			cxPropDisplaySelectedZcqa: Lyte.attr('string', { default: "displaySelectedZcqa" }),
			cxPropCheckboxZcqa: Lyte.attr('string', { default: "checkboxZcqa" }),
			cxPropDiasbleCheckbox: Lyte.attr('boolean', { default: false }), //NO I18N
			cxPropEnableImg: Lyte.attr('boolean', { default: false }),
			cxPropDisplayValue: Lyte.attr('object', { default: { cxImage: "image_link", cxDisplayLabel: "full_name", cxEmailLabel: "email" } }),
			cxPropNoResultLabel: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.no.results.match") }),

			cxPropPlaceholder: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.search.for.users") }),
			cxPropSearchZcqa: Lyte.attr('string', { default: "searchZcqa" }),
			cxPropGroupPlaceholder: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.globalsearch.search.title") }),
			cxPropQueryParams: Lyte.attr('object', { "default": {} }),
			cxPropData: Lyte.attr('array', { "default": [] }), //NO I18N
			cxPropSelected: Lyte.attr('array', { "default": [] }), //NO I18N
			cxPropSortEnable: Lyte.attr('boolean', { default: false }),
			cxPropSearchQueryParams: Lyte.attr('object', { "default": { type: 'AllUsers' } }),
			cxPropCustomRequest: Lyte.attr('boolean', { default: false }),
			cxPropHeight: Lyte.attr('string'),
			cxPropElevateSelected: Lyte.attr('boolean', { default: true }),
			cxPropEnableDropdown: Lyte.attr('boolean', { default: true }),
			cxPropEnableMarkusers: Lyte.attr('boolean', { default: true }),
			cxPropAllCheckBoxLabel: Lyte.attr('string',{ "default": 'Select All' }),
			cxPropEnableDisplayusers: Lyte.attr('boolean', { default: true }),
		};
	},

	performMethodsCallBack: function(methodName, args){
		if (this.getMethods(methodName)) {
			const result = this.executeMethod(methodName, args);
			if (result === false) {
				return false;
			}
		};
	},

	performActionsCallBack: function(onBeforeAction, onAction){
		const args = { selectedData: this.cruxSelectPanel.getSelectedUsers() };
		let triggerSaveAction = true;
		if (this.getMethods(onBeforeAction)) {
			triggerSaveAction = this.executeMethod(onBeforeAction, args);
			if (triggerSaveAction === false) {
				return;
			}
		};
		this.setData("cxPropShow", false); // No I18N
		if (this.getMethods(onAction)) {
			this.executeMethod(onAction, args);
		};
	},

	actions: {
		cancelAction: function () {
			this.performActionsCallBack('onBeforeCancel', 'onCancel');
		},

		confirmAction: function () {
			this.performActionsCallBack('onBeforeSave', 'onSave');
		},
	},

	methods: {
		modalBeforeShow: function (arg) {
			this.performMethodsCallBack('onBeforeShow', arg);
			const lyteBetaModal = this.$node && this.$node.querySelector('lyte-beta-modal');
			this.cruxSelectPanel = lyteBetaModal && lyteBetaModal.component.childComp && lyteBetaModal.component.childComp.querySelector('crux-select-panel');
		},

		modalShow: function (arg) {
			this.performMethodsCallBack('onShow', arg);
			this.cruxSelectPanel.handlePanelOnBeforeShow();
		},
		onBeforeModalClose: function (arg) {
			this.performMethodsCallBack('onBeforeClose', arg);
		},
		onModalClose: function (arg) {
			this.performMethodsCallBack('onClose', arg);
			this.cruxSelectPanel.resetSelectedData();
		},

		cruxPanelOnCustomRequest:function(arg){
			this.performMethodsCallBack('onCustomRequest', arg);			
		},
		cruxPanelOnBeforeSelectAllChecked: function (arg) {
			this.performMethodsCallBack('onBeforeSelectAllChecked', arg);
		},
		cruxPanelOnBeforeSelectAllUnchecked: function (arg) {
			this.performMethodsCallBack('onBeforeSelectAllUnchecked', arg);
		},
		cruxPanelOnChecked: function (arg) {
			this.performMethodsCallBack('onChecked', arg);
		},
		cruxPanelOnUnchecked: function (arg) {
			this.performMethodsCallBack('onUnchecked', arg);
		},
		cruxPanelOnBeforeChecked: function (arg) {
			this.performMethodsCallBack('onBeforeChecked', arg);
		},
		cruxPanelOnBeforeUnchecked: function (arg) {
			this.performMethodsCallBack('onBeforeUnchecked', arg);
		},
		cruxPanelOnBeforeGroupChecked: function (arg) {
			this.performMethodsCallBack('onBeforeGroupChecked', arg);
		},
		cruxPanelOnBeforeGroupUnchecked: function (arg) {
			this.performMethodsCallBack('onBeforeGroupUnchecked', arg);
		},

	},
}, { "mixins": ["crux-user-utils"] });
