//$Id$
//store.unregisterModel("validation_rule")
store.registerModel("validation_rule", {
    active: Lyte.attr('string'), //No I18n
    created_time: Lyte.attr('string'),//No I18N
    execution_type: Lyte.attr('string'),//No I18N
    field_validation: Lyte.attr('boolean'),//NO I18N
    associated_function: Lyte.attr("object"), //No I18N
    generated_type: Lyte.attr('string'),//No I18N
    id: Lyte.attr('string', { primaryKey: true }),//No I18N
    modified_time: Lyte.attr('string'),//No I18N
    source: Lyte.attr('string'),//No I18N
    validation_type: Lyte.attr('string'),//No I18N
    conditions: Lyte.attr('array'),//No I18N

    layout: Lyte.belongsTo("layout"),//No I18n
    modified_by: Lyte.belongsTo('user', { serialize: "record" }), //No I18N
    field: Lyte.belongsTo('field', { serialize: "record" }) //No I18N

}, {
    actions: {

    }
});

//$Id$
//store.unregisterAdapter("validation_rule")
store.registerAdapter("validation_rule", {//No I18n
    namespace: 'crm/v2.1/settings',//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace('validation_rule', 'validation_rules');
        return url;
    },
    methodForRequest: function (method, type) {
        if (type === 'create') {
            return "POST";//no i18n
        }
        return method;
    },
    parseResponse: function (type, modelName, xhr, payload, queryParams) {
        if (payload && queryParams && queryParams.layout_id) {
            var layoutId = queryParams.layout_id;
            var len = payload.validation_rules ? payload.validation_rules.length : 0;
            for (var i = 0; i < len; i++) {
                payload.validation_rules[i].layout = layoutId;
            }
        }
        return payload;
    }
});

//$Id$
//store.unregisterSerializer("validation_rule")
store.registerSerializer("validation_rule", {
    normalizeResponse: function (modelName, type, payLoad) {
        if (payLoad) {
            payLoad[modelName] = payLoad.validation_rules ? payLoad.validation_rules : [];
            delete payLoad.validation_rules;
            return payLoad;
        }
        payLoad[modelName] = [];
        return payLoad;
    },
    payloadKey: function (modelName) {
        if (modelName) {
            return modelName;
        }
    }
});
