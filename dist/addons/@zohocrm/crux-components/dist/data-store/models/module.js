//$Id$
/*
//Temporary code for testing
let module_tojson = {};
for (var k in moduleRecordMapping) {
    module_tojson[k] = moduleRecordMapping[k].$.toJSON();
}

store.unregisterModel("module");

*/
store.registerModel("module", { //No I18N
    //basic properties
    api_name: Lyte.attr("string"), //No I18N
    id: Lyte.attr("string"), //No I18N
    plural_label: Lyte.attr("string"), //No I18N
    singular_label: Lyte.attr("string"), //No I18N
    module_name: Lyte.attr("string"), //No I18N
    profiles: Lyte.attr("array"), //No I18N

    //relations
    fields: Lyte.hasMany("field", { "deserialize": "record" }), //No I18N
    layouts: Lyte.hasMany("layout"), //No I18N
    related_lists: Lyte.hasMany("related_list", { inverse: "relatedListModule" }), //No I18N

    didLoad: function (record) {
        record = (this instanceof Record) ? this : record;
        var module_id = record.id;
        var moduleName = record.module_name;
        if (moduleName === "Deals") {
            record.module_name = "Potentials";//No I18n
        } if (moduleName === "Meetings") { //No I18n
            record.module_name = "Events";//No I18n
        }
        var field = {};
        var fieldList = record.fields;
        field.id = Lyte.attr('string');//No I18N
        /*
                //temp temp
                store.unregisterModel(module_id);
        */
        if (fieldList && fieldList.length) { //length added since it registers all module's model -- due to new lyte build --lyteCreate
            //added this for handling new fields/section added and we don't reload the page
            if (!store.model[module_id]) {
                let lenF = fieldList.length;
                for (let i = 0; i < lenF; i++) {
                    if (fieldList[i].data_type !== "subform" && fieldList[i].data_type !== "static_subform") {
                        field[fieldList[i].api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]));
                        field[fieldList[i].api_name].fieldID = fieldList[i].id;
                        field[fieldList[i].api_name].uiType = fieldList[i].ui_type;
                        field[fieldList[i].api_name].columnName = fieldList[i].column_name;
                        field[fieldList[i].api_name].fieldType = fieldList[i].data_type;
                        field[fieldList[i].api_name].length = fieldList[i].length;
                        field[fieldList[i].api_name].displayLabel = fieldList[i].display_label;
                        field[fieldList[i].api_name].isCustomField = fieldList[i].custom_field;
                        if (fieldList[i].column_name === "PRICINGDETAILS") {
                            field[fieldList[i].api_name].watch = true;
                        }
                    } else {
                        let serializeVal = Crm.userDetails.isSubformNewComponentEnabled || Crm.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM ? "partial" : "record";//no i18n
                        let subform_id = fieldList[i].subform ? fieldList[i].subform.id : fieldList[i].associated_module.id;
                        field[fieldList[i].api_name] = Lyte.hasMany(subform_id, { serialize: serializeVal });
                        field[fieldList[i].api_name].cusRelationFldType = "subform";//ZCRM-193858
                        if (!store.model[subform_id]) {
                            let subfield = {};
                            subfield.__parent_module__ = Lyte.belongsTo(record.id, { inverse: fieldList[i].api_name });
                            if (!fieldList[i].custom_field && ["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fieldList[i].api_name)) {
                                subfield.$parent_line_item_id = Lyte.attr("string");//No i18N
                            }
                            store.registerModel(subform_id, subfield, { extends: 'entity' }); //No I18N
                        }
                        if (!record.currsubformApinames) {
                            record.currsubformApinames = [];
                        }
                        if (!record.currsubformApinames.includes(fieldList[i].api_name)) {
                            record.currsubformApinames.push(fieldList[i].api_name);
                        }
                    }
                }
                field.$state = Lyte.attr("string");//No i18N
                field.$wizard_connection_path = Lyte.attr("array");//No i18N
                field.$validation_rule_action = Lyte.attr("object");//NO I18N
                field.$transitionid = Lyte.attr("string");//No i18N
                if (["Quotes", "Invoices", "SalesOrders", "PurchaseOrders"].includes(moduleName)) {
                    field.$line_tax = Lyte.attr("array", { watch: true });//No i18N
                    field.$parent_inventory_id = Lyte.attr("string");//No i18N
                }
                store.registerModel(module_id, field, { extends: 'entity' }); //No I18N
            } else {
                let lenF = fieldList.length;
                var _model = store.model[module_id];
                if (_model) {
                    for (let i = 0; i < lenF; i++) {
                        if (!_model.fieldList[fieldList[i].api_name] || (_model.fieldList[fieldList[i].api_name].cusRelationFldType !== "subform" && !_model.fieldList[fieldList[i].api_name].fieldType)) { //ZCRM-192913
                            if (fieldList[i].data_type !== "subform" && fieldList[i].data_type !== "static_subform") {
                                var k = {};
                                k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
                                k.fieldID = fieldList[i].id;
                                k.uiType = fieldList[i].ui_type;
                                k.columnName = fieldList[i].column_name;
                                k.fieldType = fieldList[i].data_type;
                                k.length = fieldList[i].length;
                                k.displayLabel = fieldList[i].display_label;
                                k.isCustomField = fieldList[i].custom_field;
                                if (fieldList[i].column_name === "PRICINGDETAILS") {
                                    k.watch = true;
                                }
                                store.addField(module_id, fieldList[i].api_name, k.type, k, undefined, true);
                            } else {
                                let serializeVal = Crm.userDetails.isSubformNewComponentEnabled || Crm.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM ? "partial" : "record";//No I18N
                                store.addField(module_id, fieldList[i].api_name, Lyte.hasMany(fieldList[i].subform.id, { serialize: serializeVal }));
                                if (_model.fieldList[fieldList[i].api_name]) {
                                    _model.fieldList[fieldList[i].api_name].cusRelationFldType = "subform";//ZCRM-193858
                                }
                                if (!store.model[fieldList[i].subform.id]) {
                                    let subfield = {};
                                    subfield.__parent_module__ = Lyte.belongsTo(record.id, { inverse: fieldList[i].api_name });
                                    if (!fieldList[i].custom_field && ["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fieldList[i].api_name)) {
                                        subfield.$parent_line_item_id = Lyte.attr("string");//No i18N
                                    }
                                    store.registerModel(fieldList[i].subform.id, subfield, { extends: 'entity' }); //No I18N
                                }
                                if (!record.currsubformApinames) {
                                    record.currsubformApinames = [];
                                }
                                if (!record.currsubformApinames.includes(fieldList[i].api_name)) {
                                    record.currsubformApinames.push(fieldList[i].api_name);
                                }
                            }
                        } else {
                            //reset the dynamically changeable properties --- can be modifed via cscript, layout rules ---added for lyteCreate
                            _model.fieldList[fieldList[i].api_name].length = fieldList[i].length;
                        }
                    }
                    if (!_model.fieldList.$state) {
                        store.addField(module_id, '$state', "string");//No i18N
                    }
                    if (!_model.fieldList.$wizard_connection_path) {
                        store.addField(module_id, '$wizard_connection_path', "array");//No i18N
                    }
                    if (!_model.fieldList.$validation_rule_action) {
                        store.addField(module_id, '$validation_rule_action', "object");//No i18N
                    }
                    if (!_model.fieldList.$transitionid) {
                        store.addField(module_id, '$transitionid', "string");//No i18N
                    }
                    if (["Quotes", "Invoices", "SalesOrders", "PurchaseOrders"].includes(moduleName)) {
                        if (!_model.fieldList.$line_tax) {
                            store.addField(module_id, '$line_tax', "array", { type: "array", watch: true });//No i18N
                        }
                        if (!_model.fieldList.$parent_inventory_id) {
                            store.addField(module_id, '$parent_inventory_id', "string");//No i18N
                        }
                    }
                }
            }
        }
        if (validationUtils.isNotEmpty(record.layouts) && record.layouts.length) {
            record.layouts.forEach(function (lay) {
                if ((lay.status >= 0 || lay.status === 'active') && lay.sections && lay.sections.length) {
                    Lyte.registeredMixins["crm-crux-module-mixin"].addSubformFieldsintoLyteModel(lay.sections);//no i18n
                }
            });
        }
        if (moduleName) {
            if (typeof moduleRecordMapping !== "undefined" && !moduleRecordMapping[moduleName]) {
                moduleRecordMapping[moduleName] = record;
            }
            if (typeof idModuleMapping !== "undefined" && !idModuleMapping[module_id]) {
                idModuleMapping[module_id] = moduleName;
            }
            if (typeof moduleApiMapping !== "undefined" && !moduleApiMapping[moduleName]) {
                moduleApiMapping[moduleName] = record.api_name;
            }
            if (typeof moduleApiVsNameMapping !== "undefined" && !moduleApiVsNameMapping[record.api_name]) {
                moduleApiVsNameMapping[record.api_name] = moduleName;
            }
        }
    }.on("add")
}, {
    actions: {
        view_preference_configurations: {}
    }
});
/*
for (let k in module_tojson) {
    store.pushPayload('module', module_tojson[k]);
}
*/
//$Id$
//store.unregisterAdapter("module");
store.registerAdapter("module", {//No I18n
    namespace: "crm/v2.2/settings",//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        url = this.$super.buildURL(modelName, type, queryParams, payLoad, url, actionName, customData);
        if (type === 'action') {
            switch (actionName) {
                case "view_preference_configurations":
                    url = url.replace("v2.2", "v6");
                    var replaceStr = "/settings/modules/"; //No I18n
                    replaceStr = payLoad.id ? replaceStr + payLoad.id + "/" : replaceStr;
                    url = url.replace(replaceStr, "/settings/modules/" + customData.module + "/");
                    return url;
            }
        }
        if (type !== "findAll") {
            var id = url.substring(url.lastIndexOf('/') + 1);
            if (!["ABM_Account__s", "ABM_Segment__s", "ABM_Account_Segment__s"].includes(id)) {
                var moduleName = idModuleMapping[id];
                if (moduleName) {
                    url = url.replace(id, moduleRecordMapping[moduleName].api_name);
                }
            }
        }
        if (!queryParams) {
            queryParams = {};
        }
        if (type === "findRecord" && !queryParams.include) {
            queryParams.include = ["$properties", "$on_demand_properties", "layouts", "custom_view", "mass_action_cv", "show_social", "show_webform", "show_visitor", "show_googlesync", "show_emailparser",  //No i18n
                "show_phonebridge", "show_salessignals", "show_emailsettings", "show_dashboard", "default_view", "chart_view", "chart_view_supported", "chart_view_cache_supported", "per_page", "filter_status", "kanban_view", "kanban_view_supported", "stage_view", "customized_view", "show_zf_panel", "task_completed_rule_configured", "new_call_view", "zb_custommodule_enabled", //No i18n
                "group_by_field_available", "kanban_feature_status", "kanban_view_fields", "module_mlabel", "module_nlabel", "zia_view", "territory", "related_lists", "related_list_properties", "business_card_fields", "search_layout_fields", "cpq_search_layout_fields", "lookup_field_properties"]; //No i18n
        }
        if (queryParams.include) {
            queryParams.include = queryParams.include.toString();
        }
        return url;
    },
    methodForRequest: function (method, type, queryParams, customData) {
        if (method === "PATCH") {
            return "PUT";//no i18n
        }
        if (type === "action") {
            method = customData && customData.type ? customData.type : method;
        }
        return method;
    },
    processRequest: function (type, modelName, payLoad, snapshot, customData, queryParams, key) {
        if (type === "findRecord") {
            if (customData && customData.getMeta === true) {
                return undefined;
            }
            var _this = this;
            var module = store.peekRecord("module", key).module_name;//No I18n
            if (customData && (customData.getFields === true || customData.layoutId)) {
                return this.fetchFields(module, customData).then(function (data) { //No i18n
                    _this.deleteXHR(module);
                    var a = [];
                    a[0] = data;
                    return JSON.stringify({ modules: a });
                });
            }
            var moduleInfo = store.peekRecord("module", key); //No I18N
            return Lyte.resolvePromises({
                module: store.findRecord("module", key, queryParams, undefined, true, { getMeta: true }),//No I18n
                fields: _this.fetchFields(moduleInfo.module_name, customData)
            }).then(function (res) {
                _this.deleteXHR(module);//No I18n
                res.module[0] = res.module[0].$.toJSON();
                return JSON.stringify({ modules: res.module });
            });
        }
        return undefined;
    },
    fetchFields: function (module, customData) {
        var qp = "";
        if (customData && customData.layoutId) {
            qp = "&layoutId=" + customData.layoutId;//No I18n
            if (customData.mode) {
                qp += "&mode=" + customData.mode;//No i18n
            }
        } else {
            qp = "&getField=true";//No I18n
        }
        var _self = this;
        return new Promise(function (res, rej) {
            var xhr = _self.getXHR(module, customData), url = Crm.getCrmBasePath() + "/ModuleCache.do"; //No I18N
            var reqUrl = url; //No I18N
            xhr.open("GET", reqUrl + "?module=" + module + qp);
            var hd = store.adapter.application.headersForRequest();
            for (var key in hd) {
                xhr.setRequestHeader(key, hd[key]);
            }
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var clonedData = xhr.response ? Object.assign({}, JSON.parse(xhr.response)) : {};
                    //need to show "lead name" instead of "full name" for leads and contact module alone.
                    var dummyModuleData = store.peekRecord('module', clonedData.id); //no i18n
                    let fullNameField = dummyModuleData && ["Leads", "Contacts"].indexOf(dummyModuleData.api_name) !== -1 && clonedData && clonedData.fields ? clonedData.fields.filter(fld => fld.column_name === "FULLNAME")[0] : undefined;//no i18n
                    if (fullNameField) {
                        fullNameField.field_label = fullNameField.display_label = I18n.getMsg("crm.label.vendor.name", dummyModuleData.singular_label);//no i18n
                    }

                    var mod = store.serializer.module.normalize("module", "findRecord", clonedData, customData); //No I18n
                    if (customData && customData.layoutId) {
                        //only this layout alone sets in relation, other layouts removed from relation
                        dummyModuleData = store.peekRecord('module', mod.id); //no i18n
                        if (dummyModuleData.layouts) {
                            var allLayouts = dummyModuleData.layouts.mapBy('id');//no i18n
                            allLayouts.removeLastOccurenceOfElement(customData.layoutId);//fix for ZCRM-112716
                            mod.layouts = mod.layouts.concat(allLayouts);
                        }
                    }
                    store.pushPayload("module", [mod]); //No I18n
                    res(clonedData);
                } else {
                    rej({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                rej({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    },
    getXHR: function (module, customData) {
        if (!this.xhr[module]) {
            this.xhr[module] = new XMLHttpRequest();
        }
        else if (customData && customData.allowMultiple) {
            return new XMLHttpRequest();//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
        }
        return this.xhr[module];
    },
    xhr: {},
    deleteXHR: function (module) {
        delete this.xhr[module];
    }
}).extends("application"); //NO I18N
//$Id$
//store.unregisterSerializer("module");
store.registerSerializer("module", { //No I18N
    serialize: function (type, data, records, customData, modelName, queryParams, actionName) {
        if (actionName === "view_preference_configurations") {
            var payLoad = {};
            payLoad.modules = [data];
            return payLoad;
        }
        var id = data.modules.id;
        if (id === undefined) {
            return data;
        }
        var moduleDetail = store.peekRecord('module', id); //No I18n
        data.modules.api_name = moduleDetail.api_name;
        if (type !== "updateRecord") {
            data.modules.api_name = moduleDetail.api_name;
        }
        data.modules = [data.modules];
        return data;
    },
    serializeKey: function (modelName) {
        return modelName + 's'; //no I18n
    },
    normalizeResponse: function (modelName, type, payLoad) {
        switch (type) {
            case "update": {
                if (payLoad && payLoad.modules && payLoad.modules.length > 0) {
                    payLoad.modules.forEach(function (module) {
                        module.id = module.details.id;
                        delete module.status;
                    });
                }
                break;
            }
            case "pushPayload":
            case "findAll":
                {
                    payLoad = type === "findAll" ? payLoad.modules : payLoad; //No I18N
                    payLoad = type === "findAll" ? { modules: payLoad } : payLoad;//No I18N
                }
                break;
        }
        if (type === "pushPayload") {
            return { modules: payLoad };
        }

        return payLoad;
    },
    normalize: function (modelName, type, snapShot, customData) {
        //to handle customView dropdown in activites module
        var mName = snapShot.module_name;
        if ((type === "findAll" || type === "findRecord") && (mName === 'Calls' || mName === 'Events' || mName === 'Tasks') && !Crm.isActivitySplitDone) {
            delete snapShot.custom_view;
        }
        if ((type === "findAll" || type === "findRecord") && snapShot.layouts) {
            var layoutsLen = snapShot.layouts.length, preventLayouts = [-3, -4];     //status -3 is Marked for delete (Hidden from the UI)
            for (var i = 0; i < layoutsLen; i++) {									   // status -4 is user defined downgraded layout.
                if (preventLayouts.indexOf(snapShot.layouts[i].status) !== -1) {
                    store.unloadRecord("layout", snapShot.layouts[i].id);
                    snapShot.layouts.splice(i, 1);
                    i--; layoutsLen--;
                    continue;
                }
                if (snapShot.id) {
                    snapShot.layouts[i].module = { id: snapShot.id };
                }
                this.setProperty(snapShot.layouts[i], customData);
            }
        }
        if (snapShot.fields && customData && !customData.getExternalFields) {
            var fieldsLength = snapShot.fields.length;
            var fields = [];
            var externalProp = "";
            var field = null;
            for (let i = 0; i < fieldsLength; i++) {
                field = snapShot.fields[i];
                externalProp = field.external;
                if (externalProp === null) {
                    fields.push(field);
                }
            }
            if (typeof fields === "object" && fields.length > 0) {
                snapShot.fields = fields;
            }
        }
        return snapShot;
    }
}, { mixins: ["crm-crux-module-mixin"] });//No I18n
if (typeof moduleDetailedInfo !== 'undefined' &&
    moduleDetailedInfo.modules &&
    moduleDetailedInfo.modules.length) {
    store.pushPayload('module', moduleDetailedInfo.modules, true);//No I18n
}