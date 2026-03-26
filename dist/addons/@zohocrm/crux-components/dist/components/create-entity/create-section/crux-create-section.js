Lyte.Component.register("crux-create-section", {
_template:"<template tag-name=\"crux-create-section\"> <template is=\"if\" value=\"{{isYieldSupported}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormCompleteSectionYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{sectionCurntInstObj.isValidSectionToRender}}\"><template case=\"true\"> <div style=\"{{cxHelperGetNodeDisplayValue(sectionCurntInstObj.isvalidSection,'section')}}\" class=\"cxcreateSectionInnerCont\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionHeaderYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> <div class=\"cxCreateSectionDetailsContainer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSection.generated_type,'===','default'),'&amp;&amp;',expHandlers(cxPropSection.name,'===','Record Image'))}}\"><template case=\"true\"> <div id=\"entityImageDiv\"></div> </template><template case=\"false\"><template is=\"if\" value=\"{{sectionCurntInstObj.isSubformSection}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(sectionCurntInstObj.haveVisiblefieldsInSubform,'&amp;&amp;',expHandlers(expHandlers(sectionCurntInstObj.subformPermissions,'!'),'||',expHandlers(sectionCurntInstObj.subformPermissions,'&amp;&amp;',sectionCurntInstObj.subformPermissions.viewable)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{sectionCurntInstObj.isSectionLabelYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionLabelYield}}\" cx-prop-section=\"{{cxPropSection}}\" yield-data-object=\"{{sectionCurntInstObj.yieldDataObject}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template><template case=\"false\"> <div id=\"{{concat('secHead_',sectionCurntInstObj.parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont\"> <div id=\"sectitle\" class=\"cxDIB\">{{cxPropSection.display_label}}</div> </div> </template></template> <crux-create-subformsection cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-subform-section=\"{{cxPropSection}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" is-subform=\"{{isSubform}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{cxPropSubformSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-subformsection> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(isQuickCreateSection,'!')}}\"><template case=\"true\"><div id=\"{{concat('secHead_',sectionCurntInstObj.parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont\"> <div id=\"sectitle\" class=\"cxDIB\">{{cxPropSection.display_label}}</div> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSection.column_count,'===',1)}}\"><template case=\"true\"> <div class=\"cxCreateSingleContainer\"> <template items=\"{{sectionCurntInstObj.singleContainer}}\" item=\"sectionField\" index=\"index\" is=\"for\"> <crux-create-field container-name=\"singleContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> </template><template case=\"false\"> <div class=\"cxcreateSectionTwoColumn\"> <div class=\"cxCreateContainer1\"> <template is=\"for\" items=\"{{sectionCurntInstObj.leftContainer}}\" item=\"sectionField\" index=\"indO\"> <crux-create-field container-name=\"leftContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> <div class=\"cxCreateContainer2\"> <template items=\"{{sectionCurntInstObj.rightContainer}}\" item=\"sectionField\" index=\"index\" is=\"for\"> <crux-create-field container-name=\"rightContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> </div> </template></template> </template></template></template></template> </div> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionFooterYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxHelperGetNodeDisplayValue","args":["sectionCurntInstObj.isvalidSection","'section'"]}}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"insertYield","position":[1,5]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropModuleData","sectionCurntInstObj","isYieldSupported","isQuickCreateSection","isLyteViewPort","cxPropSection"],
_observedAttributesType :["object","string","object","object","boolean","boolean","boolean","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			sectionCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			isYieldSupported: Lyte.attr("boolean", { "default": false }),//no i18n
			isQuickCreateSection: Lyte.attr("boolean", { "default": false }),//no i18n
			isLyteViewPort: Lyte.attr("boolean", { "default": false }),//no i18n
			cxPropSection: Lyte.attr('object', { 'default': {} })//no i18n
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropSection = this.data.cxPropSection;
		var currentInstObjKey = layoutComponentData.cxInternalUtilityObj && layoutComponentData.cxInternalUtilityObj.currentInstObjKey;
		if (currentInstObjKey && !Object.keys(this.data.sectionCurntInstObj || {}).length) {
			if (!Object.keys(cxPropSection[currentInstObjKey] || {}).length) {
				cxPropSection[currentInstObjKey] = {};
			}
			this.setData('sectionCurntInstObj', cxPropSection[currentInstObjKey]);
		}
		if (layoutComponentData.isLyteViewPort) {
			this.setData('isLyteViewPort', !!layoutComponentData.isLyteViewPort);
		}
		if (!layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta) {
			layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta = {};
		}
		layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta[cxPropSection.name] = cxPropSection;
		var sectionCurntInstObj = this.data.sectionCurntInstObj, selectedLayoutid = layoutComponentData.cxPropLayoutId, currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;
		sectionCurntInstObj.tab_traversal = cxPropSection.tab_traversal, sectionCurntInstObj.type = cxPropSection.type;
		if ((cxPropSection.name === "Quick create" || cxPropSection.name === "Quick Create") && cxPropSection.generated_type === "default" && layoutComponentData.isQuickCreate) {
			sectionCurntInstObj.type = "used";//no i18n
			this.setData('isQuickCreateSection', true);
		}
		if (sectionCurntInstObj.type === "used") {
			sectionCurntInstObj.isValidSectionToRender = true;
		}
		var currentViewType = layoutComponentData.cxInternalUtilityObj.currentViewType ? layoutComponentData.cxInternalUtilityObj.currentViewType : (currentPage === "clone" ? "create" : currentPage);//no i18n
		var newArr, temparrL = [], temparrR = [], singleArr = [], seqNoPropertyKey = 'sequence_number';//no i18n
		if (this.data.isQuickCreateSection) {
			seqNoPropertyKey = "quick_sequence_number";
		}
		if (selectedLayoutid && cxPropSection.fields) {
			newArr = cxPropSection.fields.sort(function (field1, field2) {
				var field1_sequenceNumber, field2_sequenceNumber;
				field1_sequenceNumber = (field1[selectedLayoutid] && field1[selectedLayoutid].hasOwnProperty(seqNoPropertyKey) && field1[selectedLayoutid][seqNoPropertyKey]) ||
					(field1.hasOwnProperty(seqNoPropertyKey) && field1[seqNoPropertyKey]) || field1.sequence_number;
				field2_sequenceNumber = (field2[selectedLayoutid] && field2[selectedLayoutid].hasOwnProperty(seqNoPropertyKey) && field2[selectedLayoutid][seqNoPropertyKey]) ||
					(field2.hasOwnProperty(seqNoPropertyKey) && field2[seqNoPropertyKey]) || field2.sequence_number;
				return field1_sequenceNumber - field2_sequenceNumber;
			}.bind(this));
		} else {
			newArr = cxPropSection.fields;
		}
		newArr = newArr || [];
		var fldVisiblityCustomData = { currentPage };
		fldVisiblityCustomData.columnsToSkip = layoutComponentData.columnsToSkip || [];
		if (!fldVisiblityCustomData.columnsToSkip.includes('SALUTATION')) {
			fldVisiblityCustomData.columnsToSkip.push('SALUTATION');
		}
		fldVisiblityCustomData.apiNamesToSkip = layoutComponentData.apiNamesToSkip || [];
		let uiTypeToSkip = layoutComponentData.uiTypeToSkip || [];
		// 116-formula, 250-rich-text, 118-rollup_summary, 556-Image upload, 555-File upload
		let unsupportedUiTypes = [116, 118];
		unsupportedUiTypes.forEach((uiType) => {
			if (!uiTypeToSkip.includes(uiType)) {
				uiTypeToSkip.push(uiType);
			}
		});
		fldVisiblityCustomData.uiTypeToSkip = uiTypeToSkip;
		if (!cxPropSection.isSubformSection && currentViewType) {
			newArr.forEach(function (field) {
				if (!(this.isValidFieldToRender(field, fldVisiblityCustomData) && field.view_type[currentViewType])) {
					return;
				}
				if (cxPropSection.column_count === 1) {
					singleArr.push(field);
				} else {
					var sequenceNumber = field[selectedLayoutid] && field[selectedLayoutid].sequence_number || field.sequence_number;
					if (sequenceNumber % 2 != 0) {
						temparrL.push(field);
					} else {
						temparrR.push(field);
					}
				}
			}.bind(this));
		}
		Lyte.Component.set(sectionCurntInstObj, 'leftContainer', temparrL);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'rightContainer', temparrR);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'singleContainer', singleArr);//No i18n
		var yieldNeededSections = layoutComponentData.yieldNeededSections || {};
		if (yieldNeededSections.hasOwnProperty(cxPropSection.name)) {
			this.setData('isYieldSupported', true);
		}
		if (cxPropSection.isSubformSection || cxPropSection.type === "subforms") {
			sectionCurntInstObj.isSubformSection = true;
		}
		var isSubformFieldPresent, haveVisiblefieldsInSubform, fieldsLen = newArr.length;
		if (sectionCurntInstObj.isSubformSection) {
			for (var z = 0; z < fieldsLen; z++) {
				if (newArr[z].data_type === 'subform' || newArr[z].data_type === 'static_subform') {
					isSubformFieldPresent = true;
					sectionCurntInstObj.subform_apiname = newArr[z].api_name;
					sectionCurntInstObj.subformFieldId = newArr[z].id;
					sectionCurntInstObj.isMandatorySubform = newArr[z].required === true;
				} else if (newArr[z].column_name !== 'SERIAL_NUMBER' && !newArr[z].subform && newArr[z].visible && newArr[z].view_type[currentViewType]) {
					haveVisiblefieldsInSubform = true;
				}
			}
			if (!layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta) {
				layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta = {};
			}
			layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta[sectionCurntInstObj.subform_apiname] = cxPropSection;
		}
		if (sectionCurntInstObj.subform_apiname) {
			sectionCurntInstObj.subformPermissions = layoutComponentData.subformPermissions && layoutComponentData.subformPermissions[sectionCurntInstObj.subform_apiname];
		}
		Lyte.Component.set(sectionCurntInstObj, 'isunusedSubform', sectionCurntInstObj.isSubformSection && !isSubformFieldPresent ? true : false);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'isSubformSection', isSubformFieldPresent);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'haveVisiblefieldsInSubform', haveVisiblefieldsInSubform);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'parsedSectionLabel', cxPropSection.name.replace(/ |'/g, "_"));//No i18n
		this.setData('id', 'secDiv_' + this.data.sectionCurntInstObj.parsedSectionLabel);//no i18n
		for (var i = 0; i < fieldsLen; i++) {
			if (newArr[i].view_type[currentViewType] && this.isValidFieldToRender(newArr[i], fldVisiblityCustomData)) {
				Lyte.Component.set(sectionCurntInstObj, 'isvalidSection', true);//No i18n
				Lyte.Component.set(sectionCurntInstObj, 'haveValidFields', true);//No i18n
				break;
			}
		}
		if (!layoutComponentData.isQuickCreate && cxPropSection.generated_type === "default" && ["Businesss Card", "Quick create","Quick Create"].includes(cxPropSection.name)) {
			Lyte.Component.set(sectionCurntInstObj, 'isvalidSection', false);//No i18n
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",//No I18n
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",//No I18n
		"crux-entity-date-time-mixin"//No I18n
	]
});