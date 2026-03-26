window.store = {
    model: {},
    findRecord: function (modelName, primaryKey, queryParams, cacheQuery, cacheData, customData) {
        var url, modelNameToRet;
        switch (modelName) {
            case "module":
                if (customData && customData.layoutId) {
                    return new Promise((resolve) => {
                        let qpObject = { module: idModuleMapping[primaryKey], layoutId: customData.layoutId };
                        if (customData.mode) {
                            qpObject.mode = customData.mode;
                        }
                        this.makeRequest("crm/ModuleCache.do", qpObject).then(
                            (success) => {
                                let currentModuleRecord = this.peekRecord(modelName, primaryKey);
                                if (success.layouts && currentModuleRecord && currentModuleRecord.layouts && currentModuleRecord.layouts.length) {
                                    let layoutIndex = currentModuleRecord.layouts.mapByKey('id').indexOf(customData.layoutId),
                                        layoutFullDetails = success.layouts.filter(l => l.id === customData.layoutId)[0];
                                    if (layoutIndex !== -1) {
                                        currentModuleRecord.layouts[layoutIndex] = layoutFullDetails;
                                    } else {
                                        currentModuleRecord.layouts.push(layoutFullDetails);
                                    }
                                }
                                let relationDetails = {
                                    relationType: 'hasMany',
                                    parentRecordType: 'layouts',
                                    parentRecord: currentModuleRecord.layouts,
                                    relationRecord: currentModuleRecord,
                                    relationKey: modelName
                                };
                                this.setRecordRelation(relationDetails);
                                this.pushToStore(modelName, currentModuleRecord);
                                resolve([currentModuleRecord]);
                            },
                            () => {
                                resolve([]);
                            }
                        ).catch(() => {
                            resolve([]);
                        });
                    });
                }
                url = "crm/v2.2/settings/modules/" + moduleRecordMapping[idModuleMapping[primaryKey]].api_name;
                var prom = [];
                prom.push(this.makeRequest(url, { include: encodeURIComponent("$properties,$on_demand_properties,layouts,custom_view,mass_action_cv,show_social,show_webform,show_visitor,show_googlesync,show_emailparser,show_phonebridge,show_salessignals,show_emailsettings,show_dashboard,default_view,chart_view,chart_view_supported,chart_view_cache_supported,per_page,filter_status,kanban_view,kanban_view_supported,stage_view,customized_view,show_zf_panel,task_completed_rule_configured,new_call_view,zb_custommodule_enabled,group_by_field_available,kanban_feature_status,kanban_view_fields,module_mlabel,module_nlabel,zia_view,territory,related_lists,related_list_properties,business_card_fields,search_layout_fields,cpq_search_layout_fields,lookup_field_properties") }));
                prom.push(this.makeRequest("crm/ModuleCache.do", { module: idModuleMapping[primaryKey], getField: true }));
                return Promise.all(prom).then(function (resp) {
                    resp[0].modules[0].fields = resp[1].fields;
                    this.pushToStore("field", resp[1].fields);
                    this.pushToStore("module", resp[0].modules);
                    return resp[0].modules;
                }.bind(this));

            case "custom_view":
                url = "crm/v2.2/settings/custom_views/" + primaryKey;
                modelNameToRet = "custom_views";
                break;
            default:
                //entity record get
                url = "crm/v2.2/Leads/" + primaryKey;
                modelNameToRet = 'data';
                break;
        }
        return this.makeRequest(url, queryParams).then(function (resp) {
            this.pushToStore(modelName, resp[modelNameToRet][0]);
            return resp[modelNameToRet][0];
        }.bind(this));
    },
    findAll: function (modelName, queryParams = {}, cacheQuery, cacheData, customData) {
        var url, modelNameToRet, method, pushToStore;
        switch (modelName) {
            case "custom_button":
                url = "crm/v6/settings/custom_buttons";
                pushToStore = true;
                modelNameToRet = "custom_buttons";
                break;
            case "related_list":
                url = "crm/v5/settings/related_lists";
                pushToStore = true;
                modelNameToRet = "related_lists";
                break;
            case "field":
                url = "crm/v2.2/settings/fields";
                pushToStore = true;
                modelNameToRet = "fields";
                break;
            case "note":
                url = "/crm/v2.2/Notes";
                if (customData && customData.module && customData.entityId) {
                    url = "/crm/v2.2/" + customData.module + "/" + customData.entityId + "Notes";
                }
                pushToStore = true;
                modelNameToRet = "notes";
                break;
            case "servapp_preferences":
            case "campaign_status":
                break;
            default:
                if (queryParams.hasOwnProperty('fields')) {
                    queryParams.fields = encodeURIComponent(queryParams.fields);
                }
                url = "crm/v2.2/" + moduleRecordMapping[idModuleMapping[modelName]].api_name + "/bulk";
                method = "POST";
                pushToStore = true;
                modelNameToRet = "data";
                break;
        }
        return this.makeRequest(url, queryParams, method).then(function (resp) {
            if (pushToStore) {
                this.pushToStore(modelName, resp[modelNameToRet]);
            }
            return resp[modelNameToRet];
        }.bind(this));
    },
    triggerAction: function (modelName, action_name, custom_data, qp) {
        var url, method, queruParams, req_payload;
        switch (action_name) {
            case "view_preference_configurations":
                url = "crm/v6/settings/modules/" + custom_data.module + "/actions/" + action_name;
                break;
            case "count":
                url = "crm/v2.2/" + moduleRecordMapping[idModuleMapping[modelName]].api_name + "/actions/" + action_name;
                break;
            case "reset_width":
                url = "crm/v2.2/__internal/settings/custom_views/" + custom_data.id + "/actions/reset_width";
                method = "PUT";
                queruParams = qp;
                break;
            case "change_sort":
                req_payload = { custom_views: [Object.assign({}, custom_data)] };
                // if(custom_data.sort_by && custom_data.sort_by.id){
                queruParams = custom_data;
                queruParams.sort_by = encodeURIComponent(JSON.stringify(custom_data.sort_by));
                // }
                url = "crm/v2.2/settings/custom_views/actions/change_sort";
                method = "PUT";
                break;
            case "pin_unpin_fields":
                req_payload = { custom_views: [Object.assign({}, custom_data)] };
                url = "crm/v2.2/settings/custom_views/" + custom_data.id + "/actions/pin_unpin_fields";
                queruParams = qp;
                method = "PUT";
                break;
            case "customize_width":
                url = "crm/v2.2/__internal/settings/custom_views/" + custom_data.id + "/actions/customize_width";
                method = "PUT";
                req_payload = { custom_views: [Object.assign({}, custom_data)] };
                queruParams = qp;
                break;
            case "customize_wrap_text":
                method = "PUT";
                req_payload = { custom_views: [Object.assign({}, custom_data)] };
                queruParams = qp;
                url = "crm/v2.2/settings/custom_views/actions/customize_wrap_text";
                break;

        }
        return this.makeRequest(url, queruParams, method, req_payload);
    },
    unloadAll: function (modelName) {
        delete this.model[modelName];
    },
    peekRecord: function (modelName, key) {
        var data = this.model[modelName];
        var data_length = data.length;
        if (data && data.length) {
            for (var i = 0; i < data_length; i++) {
                if (data[i].id === key) {
                    return data[i];
                }
            }
        }
        return undefined;
    },
    peekAll: function (modelName) {
        return this.model[modelName];
    },
    clearCachedQuery: function (modelName) {
        return this.model[modelName];//temp
    },

    makeRequest: function (url, params, method, data) {
        url = window.location.origin + "/" + url;
        if (params && Object.keys(params).length) {
            url += "?";
            for (var key in params) {
                url += key + "=" + params[key];
                url += "&";
            }
            url = url.substring(0, url.lastIndexOf("&"));
        }
        method = method ? method : "GET";
        return new Promise(function (res, rej) {
            window.$.ajax({
                url: url,
                headers: {
                    "X-ZCSRF-TOKEN": csrfParamName + "=" + csrfToken
                },
                method: method,
                data: JSON.stringify(data),
                contentType: "application/json", // Set content type to JSON
                success: function (resp) {
                    res(resp);
                },
                error: function (err) {
                    rej(err);
                }
            });
        });
    },

    Record: function (data) {
        // for(var key in data){
        // 	this[key] = data[key];
        // }
        var _this = this;
        Object.defineProperty(data, "$", {
            writable: false,
            value: {
                set: function (key, value) {
                    this[key] = value;
                }.bind(data),
                save: function (customData = {}, qp = {}) {
                    var url, method, entityPayload;
                    if (customData.crux_feature_type === "entitySave") {
                        entityPayload = { data: [Object.assign({}, data)] };
                        url = `crm/v2.2/${customData.moduleName}`;
                        method = `${customData.currentPage === 'create' ? 'POST' : 'PATCH'}`;
                    } else if (customData.crux_feature_type === "listviewSave") {
                        entityPayload = { custom_views: [Object.assign({}, data)] };
                        url = "crm/v2.2/settings/custom_views/" + moduleRecordMapping[qp.module].custom_view.id;
                        method = "PUT";
                    }
                    return _this.makeRequest(url, qp, method, entityPayload);
                }.bind(data),
                rollBack: function () {
                    return this;
                }.bind(data),
                rollBackAttributes: function () {
                    return this;
                }.bind(this)
            }
        });
    },
    pushToStore: function (modelName, data) {
        if (!this.model.hasOwnProperty(modelName)) {
            this.model[modelName] = [];
        }
        if (Array.isArray(data)) {
            var data_len = data.length;
            for (var i = 0; i < data_len; i++) {
                this.pushToStore(modelName, data[i]);
            }
        }
        else {
            var flag = false;
            var mod_leng = this.model[modelName].length;
            for (var j = 0; j < mod_leng; j++) {
                if (data.id && this.model[modelName][j].id === data.id) {
                    // this.model[modelName][i] = this.Record(data);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.Record(data);
                this.model[modelName].push(data);
            }
        };
    },
    createRecord: function (modelName, data) {
        this.pushToStore(modelName, data);
        if (!data.hasOwnProperty('$')) {
            this.Record(data);
        }
        return data;
    },
    setRecordRelation: function (relationObject = {}) {
        var { relationType, parentRecordType, parentRecord, relationRecord, relationKey } = relationObject;
        var setRelationBasedOnType = function (rType, rKey, pRecord, rRecord) {
            if (rType === "hasMany") {
                if (pRecord && pRecord.hasOwnProperty(rKey)) {
                    pRecord[rKey] = pRecord[rKey].length ? pRecord[rKey] : [];
                    pRecord[rKey].push(rRecord);
                } else if (pRecord) {
                    pRecord[rKey] = [rRecord];
                }
            }
        }.bind(this);
        switch (parentRecordType) {
            case 'layouts':
                var setRelationForSections = function (layoutDetails) {
                    if (layoutDetails && layoutDetails.sections && layoutDetails.sections.length) {
                        layoutDetails.sections.forEach(eachSection => {
                            if (eachSection && eachSection.fields && eachSection.fields.length) {
                                eachSection.fields.forEach(eachField => {
                                    if (eachField && typeof eachField === "object") {
                                        setRelationBasedOnType(relationType, relationKey, eachField, relationRecord);
                                    }
                                });
                            }
                        });
                    }
                }.bind(this);
                if (parentRecord) {
                    if (Array.isArray(parentRecord)) {
                        parentRecord.forEach(eachLayout => {
                            setRelationForSections(eachLayout);
                        });
                    } else if (typeof parentRecord === "object") {
                        setRelationForSections(parentRecord);
                    }
                }
                break;
            default: break;
        }
    }
};
