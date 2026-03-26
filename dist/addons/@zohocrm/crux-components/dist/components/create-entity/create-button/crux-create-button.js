Lyte.Component.register("crux-create-button", {
_template:"<template tag-name=\"crux-create-button\"> <template items=\"{{cxPropButtons}}\" item=\"btn\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{expHandlers(btn.visible,'&amp;&amp;',expHandlers(renderedBtnCnt,'<',buttonLimit))}}\"><template case=\"true\"> <lyte-button lt-prop-disabled=\"{{expHandlers(moduleCurntInstObj.disableFormbuttons,'?:',moduleCurntInstObj.disableFormbuttons,btn.disabled)}}\" data-zcqa=\"{{btn.name}}\" lt-prop-name=\"{{btn.name}}\" onclick=\"{{action('createFormSubmit',btn,this,event)}}\" lt-prop-appearance=\"{{expHandlers(btn.appearance,'?:',btn.appearance,'default')}}\" lt-prop-class=\"{{expHandlers(btn.class,'?:',btn.class,'basicbutton')}}\" lt-prop-id=\"{{btn.id}}\" class=\"{{btn.id}}{{instanceObjKey}} {{btn.buttonClass}}\" id=\"{{btn.id}}{{cxPropModuleData.module_name}}\"> <template is=\"registerYield\" yield-name=\"text\">{{btn.label}}</template> </lyte-button> {{Increment('renderedBtnCnt')}} </template></template> </template> <template is=\"if\" value=\"{{expHandlers(visibleBtnlen,'>',buttonLimit)}}\"><template case=\"true\"> <lyte-button data-zcqa=\"cxQcMoreOptionBtn\" lt-prop-name=\"cxQcMoreOptionBtn\" lt-prop-appearance=\"primary\" lt-prop-id=\"\" class=\"cxQcMoreOptionBtn\" id=\"cxQcMoreOptionBtn{{instanceObjKey}}\"> <template is=\"registerYield\" yield-name=\"text\"><span class=\"cxDropdown cxDropdownWhite\"></span> </template> </lyte-button> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"lyte-button#cxQcMoreOptionBtn{{instanceObjKey}}\" lt-prop-freeze=\"false\" on-menu-click=\"{{method('menuSelection',this)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"btn\" index=\"index\"> <template is=\"if\" value=\"{{btn.visible}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(index,'>=',buttonLimit)}}\"><template case=\"true\"><lyte-menu-item data-value=\"{{btn.name}}\"> <lyte-menu-label>{{btn.label}} </lyte-menu-label> </lyte-menu-item></template></template> </template></template> </template> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}],
_observedAttributes :["cxPropButtons","buttons","cxPropLayoutComponentData","instanceObjKey","moduleCurntInstObj","cxPropModuleData","visibleBtnlen","buttonLimit","renderedBtnCnt"],
_observedAttributesType :["array","array","object","string","object","object","number","number","number"],

	data: function () {
		return {
			cxPropButtons: Lyte.attr('array', { 'default': [] }), //no i18n
			buttons: Lyte.attr('array', { 'default': [] }), //no i18n
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			visibleBtnlen: Lyte.attr('number', { default: 0 }),//no i18n
			buttonLimit : Lyte.attr('number', { default: 0 }),//no i18n
			renderedBtnCnt : Lyte.attr('number', { default: 0 })//no i18n
			
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData;
		var defaultButtons = [
			{
				"disabled": false,
				"visible": true,
				"name": "cancel",//no i18n
				"id": "cx_create_cancelbutn",//no i18n
				"label": _cruxUtils.getI18n("crm.button.cancel")//no i18n
			},
			{
				"disabled": false,
				"visible": true,
				"name": "save",//no i18n
				"id": "cx_create_savebutn",//no i18n
				'label': _cruxUtils.getI18n("crm.button.save"),//no i18n
				'appearance': 'primary',
				'class': 'primarybtn'//no i18n
			}
		];
		if (layoutComponentData.isQuickCreate) {
			Lyte.arrayUtils(defaultButtons, "insertAt", 1, {
				"disabled": false,
				"visible": true,
				"name": "saveandassociate",//no i18n
				"id": "cx_create_saveandassociatebutn",//no i18n
				"label": I18n.getMsg('crm.button.save.and.associate'),//no i18n
				'appearance': 'primary',
				'class': '',
				'buttonClass': 'cxBtnHasShowMore'//no i18n
			});
		} else {
			Lyte.arrayUtils(defaultButtons, "insertAt", 1, {
				"disabled": false,
				"visible": true,
				"name": "saveAndNew",//no i18n
				"id": "cx_create_saveandnewbutn",//no i18n
				"label": _cruxUtils.getI18n("crm.button.save&new")//no i18n
			});
		}
		let defaultButtonsOriginal = Lyte.deepCopyObject(defaultButtons),
			buttonProperties = ['disabled', 'visible', 'name', 'id', 'label', 'appearance', 'class', 'buttonClass'];//no i18n
		let givenButtonData;
		if (layoutComponentData.buttonData) {
			if (Array.isArray(layoutComponentData.buttonData)) {
				givenButtonData = layoutComponentData.buttonData;
			} else if (typeof layoutComponentData.buttonData === 'object' && layoutComponentData.buttonData.buttons) {
				givenButtonData = layoutComponentData.buttonData.buttons;
			}
		}
		if (givenButtonData && givenButtonData.length) {
			try {
				givenButtonData.forEach(formButton => {
					let currentButtons = defaultButtons.map(butn => { return butn.name; }),
						existingIndex = currentButtons.indexOf(formButton.name);
					if (existingIndex !== -1) {
						let finalButtonObj = Object.assign({}, formButton),
							existingButtonInfo = defaultButtons[existingIndex];
						buttonProperties.forEach(key => {
							if (!formButton.hasOwnProperty(key) && existingButtonInfo.hasOwnProperty(key)) {
								finalButtonObj[key] = existingButtonInfo[key];
							}
						});
						if (finalButtonObj.hasOwnProperty('position')) {
							let indexVal = Number(finalButtonObj.position),
								isValidIndex = defaultButtons.length >= indexVal;
							if (isValidIndex) {
								Lyte.arrayUtils(defaultButtons, "removeAt", existingIndex, 1);
								Lyte.arrayUtils(defaultButtons, "insertAt", (--indexVal), finalButtonObj);
							}
						} else {
							Lyte.arrayUtils(defaultButtons, "replaceAt", existingIndex, finalButtonObj);
						}
					} else {
						if (formButton.hasOwnProperty('position')) {
							let indexVal = Number(formButton.position),
								isValidIndex = defaultButtons.length >= indexVal;
							if (isValidIndex) {
								Lyte.arrayUtils(defaultButtons, "insertAt", (--indexVal), formButton);
							}
						} else {
							defaultButtons.push(formButton);
						}
					}
				});
			} catch (exe) {
				defaultButtons = defaultButtonsOriginal;
			}
		}
		this.setData('cxPropButtons', defaultButtons);//no i18n
		this.setData('visibleBtnlen', defaultButtons.filter((btn=>btn.visible)).length);
		this.setData('buttonLimit' , defaultButtons.length);
		if (layoutComponentData.isQuickCreate && defaultButtons.length > 2) {
			this.setData('buttonLimit', 2);
		}
		layoutComponentData.cxInternalUtilityObj.cxPropButtons = this.data.cxPropButtons;
	},
	actions: {
		// Functions for event handling
		createFormSubmit: async function (buttonObj, lyteButtonNode, event) {
			this.formButtonHandling(buttonObj, lyteButtonNode, event);
		}
	},
	methods: {
		// Functions which can be used as callback in the component.
		menuSelection: function (menuNode, btnName, event) {
			let buttonObj = this.data.cxPropButtons.filter(btn => btn.name == btnName)[0];
			this.formButtonHandling(buttonObj, menuNode, event);
		}
	},
	showCancelConfirmationAlert: function () {
		_cruxUtils.showCustomAlert({
			params: {
				ltPropPrimaryMessage: 'Confirm Action',//no i18n
				ltPropSecondaryMessage: 'Are you sure you want to cancel? Any unsaved changes will be lost and the form will be removed from the view.',//no i18n
				ltPropButtonPosition: 'center', //No I18n
				ltPropContentAlign: 'center', //No I18n
				ltPropShowCloseButton: 'false',//No I18n
				ltPropButtons: [
					{
						"type": "failure",
						"text": "Cancel",
						"appearance": "default"
					},
					{
						"type": "accept",
						"text": "Confirm",
						"appearance": "failure"
					}
				]
			},
			accept: function () {
				this.destroyComponent(this.data.cxPropLayoutComponentData);
			}.bind(this)
		});
	},
	formButtonHandling: async function (buttonObj, lyteButtonNode, event) {
		var cbObject = { currentButtonObj: buttonObj, currentButtonNode: lyteButtonNode, eventDetails: event },
			layoutComponentData = this.data.cxPropLayoutComponentData;
		if (buttonObj.name !== 'cancel') {
			var onBeforeSaveClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormSaveClick', onFormSaveClick: cbObject });//no i18n
			onBeforeSaveClickCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				} else {
					this.validateAndSaveForm({ callBackDataObject: promiseResponse, currentButtonObj: buttonObj, currentButtonNode: lyteButtonNode, event: event });
				}
			}.bind(this));
		} else {
			let cbValue = await this.invokeCruxFormCallBacks({ callbackEventName: 'onFormCancel', onFormCancel: cbObject });//no i18n
			if (cbValue === false) {
				return;
			}
			this.showCancelConfirmationAlert();//ZCRM-686119
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-element-validation",
		"crux-create-validators-mixin",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-create-requesthandler-mixin",
		"crux-entity-date-time-mixin"
	]
});
Lyte.Component.registerHelper("Increment", function( data ) { //No I18n
	var val = this.getData(data);
	this.setData(data,val+=1);
});