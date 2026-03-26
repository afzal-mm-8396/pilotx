//$Id$
//store.unregisterModel("related_list")
store.registerModel("related_list", {//No I18N
    list_label: Lyte.attr('string'), //No I18N
    sequence_number: Lyte.attr("string"), //No I18N
    display_label: Lyte.attr("string"), //No I18N
    api_name: Lyte.attr("string"), //No I18N
    module: Lyte.attr("object"), //No I18N
    name: Lyte.attr("string"), //No I18N
    action: Lyte.attr("string"), //No I18N
    id: Lyte.attr("string", { primaryKey: true }), //No I18N
    href: Lyte.attr("string"), //No I18N
    type: Lyte.attr("string"), //No I18N
    visibility: Lyte.attr("number"), //No I18N  
    visible: Lyte.attr("boolean"),//No I18N  
    sort_order: Lyte.attr('string'), // No I18n
    connectedmodule: Lyte.attr('string'), //no i18n
    mxnfield: Lyte.attr('string'), //no i18n
    linkingmodule: Lyte.attr('string'), //no i18n
    record_operations: Lyte.attr('object'), //no i18n
    //    fields : Lyte.hasMany('field',{ serialize  : "record" }) //no i18n
    fields: Lyte.attr('array') //no i18n
});
/* $Id$ */
//store.unregisterAdapter("related_list")
store.registerAdapter("related_list", {//NO I18N
	namespace: "crm/v2.2/settings", // NO I18N
	buildURL: function (modelName, type, queryParams, payLoad, url) {
		url = url.replace(modelName, modelName + "s");
		return url;
	},
});

/* $Id$ */
//store.unregisterSerializer("related_list")
store.registerSerializer("related_list", { //No I18N
	payloadKey: function () {
		return 'related_lists'; //No I18N
	},
	serialize: function (type, payLoad) {
		payLoad.related_lists = [];
		payLoad.related_lists[0] = payLoad.related_list;
		delete payLoad.related_list;
		return payLoad;
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
		if (payLoad.related_lists && Array.isArray(payLoad.related_lists)) {
			payLoad.related_lists.forEach(function (item) {
				var module_id;
				var fieldapi;
				if (item.type === 'multiselectlookup') {
					var multiSelectLookupFld = store.peekAll("field").filterBy({ "data_type": "multiselectlookup" }).filter(function (record) { //No I18N
						return record.multiselectlookup.api_name === item.api_name;
					})[0];
					if (multiSelectLookupFld) {
						item.mxnfield = multiSelectLookupFld.id;
						fieldapi = multiSelectLookupFld.api_name;
					}
				}
				if (item.fields && item.fields.length > 0) {
					if (item.type === 'multiselectlookup') {
						module_id = moduleRecordMapping[item.connectedmodule] ? moduleRecordMapping[item.connectedmodule].id : undefined;
						var mxnid = item.module.id;
						if (!store.model[module_id]) {
							store.registerModel(module_id, {}, { extends: 'entity' }); //No I18N
						}
						if (!store.model[mxnid]) {
							store.registerModel(mxnid, {}, { extends: 'entity' }); //No I18N
						}
						var connectedModel = store.model[module_id];
						var mxnModel = store.model[mxnid];
						store.addField(mxnid, fieldapi, Lyte.belongsTo(module_id));
						var field = {};
						field.id = Lyte.attr('string'); //No I18N
						var fieldList = item.fields;
						var lenF = fieldList.length;
						for (var i = 0; i < lenF; i++) {
							if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
								fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
							}
							if (fieldList[i].api_name.split('.').length > 1) {
								var api_name = fieldList[i].api_name.split('.')[1];
								if (!connectedModel.fieldList[api_name]) {
									var k = {};
									k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
									k.fieldID = fieldList[i].id;
									k.columnName = fieldList[i].column_name;
									k.fieldType = fieldList[i].data_type;
									k.displayLabel = fieldList[i].display_label;
									k.isCustomField = fieldList[i].custom_field;

									store.addField(module_id, api_name, k.type, k);
								}
							} else if (!mxnModel.fieldList[fieldList[i].api_name]) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
								if (fieldList[i].data_type !== "subform") { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
									var k = {};//eslint-disable-line no-redeclare
									k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
									k.fieldID = fieldList[i].id;
									k.columnName = fieldList[i].column_name;
									k.fieldType = fieldList[i].data_type;
									k.displayLabel = fieldList[i].display_label;
									k.isCustomField = fieldList[i].custom_field;
									store.addField(mxnid, fieldList[i].api_name, k.type, k);
								}
							}
						}
					} else if (!item.api_name.includes('Chronological')) { // No I18N						
						module_id = item.module.id;
						var field = {};//eslint-disable-line no-redeclare
						field.id = Lyte.attr('string'); //No I18N
						var fieldList = item.fields;//eslint-disable-line no-redeclare
						if (!store.model[module_id]) {
							var lenF = fieldList.length;//eslint-disable-line no-redeclare
							for (var i = 0; i < lenF; i++) { //eslint-disable-line no-redeclare
								if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
									fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
								}
								if (fieldList[i].data_type !== "subform") {
									field[fieldList[i].api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]));
									field[fieldList[i].api_name].fieldID = fieldList[i].id;
									field[fieldList[i].api_name].columnName = fieldList[i].column_name;
									field[fieldList[i].api_name].fieldType = fieldList[i].data_type;
									field[fieldList[i].api_name].displayLabel = fieldList[i].display_label;
									field[fieldList[i].api_name].isCustomField = fieldList[i].custom_field;
								}
							}
							field.$state = Lyte.attr("string");//No i18N
							field.$transitionid = Lyte.attr("string");//No i18N
							store.registerModel(module_id, field, { extends: 'entity' }); //No I18N
						} else {
							var lenF = fieldList.length;//eslint-disable-line no-redeclare
							var _model = store.model[module_id];
							if (_model) {
								for (var i = 0; i < lenF; i++) { //eslint-disable-line no-redeclare
									if (!_model.fieldList[fieldList[i].api_name]) {
										if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
											fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
										}
										if (fieldList[i].data_type !== "subform") {
											var k = {};//eslint-disable-line no-redeclare
											k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
											k.fieldID = fieldList[i].id;
											k.columnName = fieldList[i].column_name;
											k.fieldType = fieldList[i].data_type;
											k.displayLabel = fieldList[i].display_label;
											k.isCustomField = fieldList[i].custom_field;
											store.addField(module_id, fieldList[i].api_name, k.type, k);
										}
									}
								}
							}
						}
					}
				}
				if (window.Lyte && window.Lyte.registeredMixins["crm-detail-view-utils"] && customData && customData.getActions && item.personality_name !== "ACTIVITYPERSONALITY" && item.personality_name !== 'COMPETITORSPERSONALITY'&& item.personality_name !== 'ATTACHMENTSPERSONALITY') { //No I18N
					window.Lyte.registeredMixins["crm-detail-view-utils"].getRelatedListActions(item, objectUtils.getMatchedKey(moduleApiMapping, queryParams.module)); //No I18N
				}
				if (queryParams && queryParams.layout_id) {
					item[queryParams.layout_id] = Lyte.deepCopyObject(item);
				}
			});
		}
		return payLoad;
	}
});
