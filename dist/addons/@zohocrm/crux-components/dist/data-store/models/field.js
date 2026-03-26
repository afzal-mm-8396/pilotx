//$Id$
//store.unregisterModel("field");
store.registerModel("field", {	//No I18N		
    id: Lyte.attr("string"), //No I18n
    api_name: Lyte.attr('string'), //No I18n
    column_name: Lyte.attr('string'), //No I18n
    custom_field: Lyte.attr('boolean'), //No I18n
    data_type: Lyte.attr('string'), //No I18n
    decimal_place: Lyte.attr('string'), //No I18n
    field_label: Lyte.attr('string'), //No I18n
    length: Lyte.attr('number'),//No I18n
    read_only: Lyte.attr('boolean'), //No I18n
    show_type: Lyte.attr('number'), //No I18n
    ui_type: Lyte.attr('number'), //No I18n
    show_type: Lyte.attr('number'), //No I18n
    visible: Lyte.attr('boolean'), //No I18n
    field_read_only: Lyte.attr('boolean'), //No I18n
    default_value: Lyte.attr('string'), //No I18N
    required: Lyte.attr('boolean'),//No I18n
    system_mandatory: Lyte.attr('boolean'),//No I18n
    sequence_number: Lyte.attr('number'), //No I18n
    private: Lyte.attr("object"), //No I18N
    currency: Lyte.attr('object'), //No I18n
    lookup: Lyte.attr('object'), //No I18n
    conversion_mapping: Lyte.attr('object'), //No I18n
    dynamic_field_label: Lyte.attr('string'),//No I18n
    profiles: Lyte.attr("array"), //Don't use profile as relationship.Any queries, contact client team //NO I18N
    formula: Lyte.attr('object'),//No I18n
    rollup_summary: Lyte.attr('object'),//NO I18N
    pick_list_values: Lyte.attr('array'), //No I18N
    mass_update: Lyte.attr('boolean'), //No I18n
    field_read_only: Lyte.attr('boolean'), //NO I18N
    pick_list_values: Lyte.attr('array'), //NO I18N
    //This key only available when getting fields from layout api
    subform_api: Lyte.attr('boolean'), //NO I18N
    //if number field set to follow seperator
    separator: Lyte.attr('boolean'),//NO I18N
    colour_code_enabled: Lyte.attr('boolean'), //NO I18N

    section: Lyte.hasMany('section', { inverse: 'fields' }), //No I18n
    allowed_modules: Lyte.hasMany('module'), //NO I18N
    module: Lyte.hasMany('module', { inverse: 'fields' }), //No I18n
    custom_view: Lyte.belongsTo('custom_view'),//No I18N
    layouts: Lyte.hasMany('layout'), //No I18n

    didLoad: function () {
        this._type = this.$.model._name;
    }
}, {
    actions: {
    }
});

//$Id$
//store.unregisterAdapter("field")
store.registerAdapter("field", {//No I18n
	namespace: "crm/v2.2/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		url = this.$super.buildURL(modelName, type, queryParams, payLoad, url, actionName, customData);
		if(customData && customData.apiVersion) {
			url = url.replace("crm/v2/settings", "crm/v" + customData.apiVersion + "/settings");
		}
		return url;
	},
}).extends("application"); //NO I18N

//$Id$
//store.unregisterSerializer("field")
store.registerSerializer("field", {//No I18N
    serializeKey: function (modelName) {
        return modelName + "s"; //No I18N
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
        var a = store.peekAll('module').filterBy({ api_name: queryParams.module }); //no i18n
        if (payLoad && payLoad.fields && a.length > 0) {
            let modInfo = a[0];
            if (customData && !customData.include_external_fields) {
                payLoad.fields = payLoad.fields.filter(field => field.external === null);
            }
            payLoad.fields.forEach(function (item) {
                item.module = [];
                item.module[0] = a[0] && a[0].id ? a[0].id : '';
                if (item.column_name === "FULLNAME" && ["Leads", "Contacts"].includes(modInfo.api_name)) {
                    item.field_label = item.display_label = I18n.getMsg("crm.label.vendor.name", modInfo.singular_label);//no i18n
                }
                if (type !== 'create' && type !== "update" && item.api_name.indexOf(".") > -1) {
                    item.api_name.replace(".", "__");
                }
            });
        }
        return this.$super.normalizeResponse(modelName, type, payLoad);
    }
});