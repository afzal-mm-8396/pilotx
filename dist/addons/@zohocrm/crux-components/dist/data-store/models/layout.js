//$Id$
//store.unregisterModel("layout")
store.registerModel("layout", {	//No I18N
    created_by: Lyte.attr('string'),//No I18N
    id: Lyte.attr('string', { primaryKey: true }),//No I18N
    modified_by: Lyte.attr('string'),//No I18N
    modified_time: Lyte.attr('string'),//No I18N
    name: Lyte.attr('string'),//No I18N
    status: Lyte.attr('number'),//No I18N
    created_time: Lyte.attr('string'),//No I18N
    parent_layout: Lyte.attr("string"),  //No I18N
    profiles: Lyte.attr('array'),//No I18N

    sections: Lyte.hasMany('section'),//No I18N
    module: Lyte.belongsTo('module'),//No I18N
    fields: Lyte.hasMany('field'),//No I18N
    layout_rule: Lyte.hasMany("layout_rule"),//No I18n
    validation_rule: Lyte.hasMany("validation_rule"),//No I18n

    didLoad: function (record) {
        record = (this instanceof Record) ? this : record;
        Lyte.registeredMixins["crm-crux-module-mixin"].addSubformFieldsintoLyteModel(record.sections);//no i18n
    }.on("add")
}, {
    actions: {

    }
});

//$Id$
//store.unregisterAdapter("layout");
store.registerAdapter("layout", {//No I18n
	namespace: "crm/v2.1/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		if(customData && customData.apiVersion === "2.2") {
			url = url.replace("crm/v2/settings", "crm/v2.2/settings");
			url = url.replace("crm/v2.1/settings", "crm/v2.2/settings");
		}
		url = url.replace(modelName, modelName + "s");
		return url;
	}
});
//$Id$
//store.unregisterSerializer("layout")
store.registerSerializer("layout", {//No I18n
	serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {
		//		else if(actionName != 'associated' && actionName != 'layoutDeleteAction' &&  actionName != 'layoutDeactivateAction' &&  actionName != 'layoutActivateAction'  && actionName != 'layoutPermissionAction'){
		if (actionName !== 'associated' && !(customData && customData.noPayloadArray) && payLoad) {
			payLoad.layouts = [payLoad.layouts];
		}
		return payLoad;
	},
	normalize: function (modelName, type, payLoad, customData) {
		if ((type === "findAll" || type === "findRecord") && payLoad) {
			this.setProperty(payLoad, customData);
		}
		return payLoad;
	},
	serializeKey: function (modelName) {
		return modelName + "s"; //No I18N
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
		function a(key) {
			if (key === "Potentials") {
				return queryParams.module === "Potentials";//No I18N
			}
			return moduleApiMapping[key] === queryParams.module;
		}
		function altFind(arr, callback) {
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				var match = callback(arr[i]);
				if (match) {
					return arr[i];
				}
			}
		}
		var module;
		try {
			module = moduleRecordMapping[altFind(Object.keys(moduleApiMapping), a)].id;
		} catch (err) {
			if (customData && customData.clientPortalSettings && err.message === "Cannot read property 'id' of undefined") {
				crmui.showMsgBand("error", I18n.getMsg("portal.apiname.change.error", crmBasePath + '/settings/client-portal'), 10000);//No i18N
				throw err;
			} else {
				module = queryParams.module;
			}
		}
		if ((type === "findAll" || type === "findRecord") && payLoad.layouts) {
			var payLoadLength = payLoad.layouts.length, preventV2Layouts = ["hidden", "downgraded"], preventV1Layouts = [-3, -4]; //No I18n  
			for (var i = 0; i < payLoadLength; i++) {
				//following code is removed in CRM so removing here too (changeset - 2e13386dff0adceee1e5ba54a10f8ab9eec8350f)
				// var sections = payLoad.layouts[i].sections;							   // status -4 is the downgraded layout. //status -3 is Marked for delete (Hidden from the UI)
				// if (customData && !customData.include_external_fields && sections) {
				// 	var sectionLength = sections.length;
				// 	for (var j = 0; j < sectionLength; j++) {
				// 		sections[j].fields = sections[j].fields.filter(field => field.external === null);
				// 	}
				// 	payLoad.layouts[i].sections = sections;
				// }
				if ((customData && !customData.showHiddenLayouts) && (preventV1Layouts.indexOf(payLoad.layouts[i].status) !== -1 || preventV2Layouts.indexOf(payLoad.layouts[i].status) !== -1 || (payLoad.layouts[i].source === "campaign_integration" && payLoad.layouts[i].status === 'inactive'))) {
					store.unloadRecord("layout", payLoad.layouts[i].id);
					payLoad.layouts.splice(i, 1);
					i--; payLoadLength--;
					continue;
				}
				payLoad.layouts[i].module = { id: module };
			}
			//			payLoad.layout = payLoad.layouts;
			//			delete payLoad.layouts;
		}
		return payLoad;
	}
}, { mixins: ["crm-crux-module-mixin"] });//No I18n