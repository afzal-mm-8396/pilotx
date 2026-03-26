//$Id$
//store.unregisterModel("entity");
store.registerModel("entity", { //No I18N	
    type: Lyte.attr('string'), //No I18N
    $approved: Lyte.attr('boolean'), //No I18N
    $notes_view: Lyte.attr('array') // NO I18N
}, {
    actions: {
        count: {},
        fetchrelatedList: {},
        get_related_records_count: {},
        execute: {}
    }
});
//$Id$
//store.unregisterAdapter("entity")
store.registerAdapter("entity", {//No I18n
    namespace: "crm/v2.2", //No I18n
    // reloadAll: function () {
    //     return true;
    // },
    methodForRequest: function (method, type, Competitors, customData, actionName) {
        if (type === "findAll") {
            method = "POST";//no i18n
        }
        if (customData && customData.type === "Search" && customData.from === "Lookup" && Competitors && Competitors._child_data) {
            return "POST"; //no i18n
        }
        if (customData && customData.type === "Search" && customData.from === "Lookup") {
            return "GET"; //NO I18N
        }
        if (customData && customData.type) {
            return customData.type;
        }
        if (type === "action") { //No I18n
            if (actionName === "count") {
                return "POST";//No I18n
            }
            return customData && customData.type ? customData.type : "GET"; //No I18n
        }
        return method;
    },
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        if (!queryParams) {
            queryParams = {};
        }
        if (!customData) {
            customData = {};
        }
        var modelDetail = store.peekRecord('module', modelName); //No I18n
        var model = modelDetail.api_name;
        if (customData.entityId) {
            model = model + "/" + customData.entityId;
        }
        url = url.replace(modelName, model);
        if (customData.type !== undefined && customData.type === "Search") {
            url = url + '/search'; //no i18n
            if (customData.from !== "Lookup") {
                url = url.replace('v2.2', 'v2');
            }
            queryParams.criteria = customData.criteria;
        }
        if (actionName === 'change_owner' && customData && customData.entityid) {
            // if (customData && customData.entityid) {
            url = url.replace('/actions/change_owner', '/' + customData.entityid + '/actions/change_owner');
            // }
        }
        if (actionName === "custom_buttons") {
            if (customData.isProcessFlowBtn) {
                url = url.replace('/v2.2', '/v6'); 	//No i18n
                url = url.replace('actions/custom_buttons', 'actions/execute_custom_buttons'); 	//No i18n
                queryParams.id = customData.button_id;

            }
            else {
                url += "/" + customData.button_id;
            }
        }
        else if (actionName === "count") {
            for (var key in customData) {
                queryParams[key] = customData[key];
            }
            customData.actionName = "count";//no i18n
        }

        if (actionName === "execute") {
            url = url.replace(url.slice(url.indexOf('/crm/'), url.indexOf('/actions') + 1), '/crm/v2/functions/');
        }
        if (type === "findAll") {
            url = url + "/bulk";//no i18n
        }
        if (type === "findAll" && customData.type === "Search" && customData.from === "Lookup") {
            url = url.replace('/bulk', '');
        }
        if(queryParams && queryParams.relationId && store.peekRecord('related_list',queryParams.relationId) && store.peekRecord('related_list',queryParams.relationId).action === "picklist_tracker"){
			url = url.replace('bulk','');
			url = url+queryParams.relatedId+'/' + store.peekRecord('related_list',queryParams.relationId).api_name; //no i18n
			delete queryParams.relationId;
			delete queryParams.relatedId;
		}
        if (queryParams.fields) {
            queryParams.fields = queryParams.fields.toString();
        }
        if (queryParams && (queryParams.filters || queryParams.cross_filters) && !["timelines", "upcoming_actions", "journeys", "ownership_history", "picklist_tracker"].includes(actionName)) {
            var dataObj = {};
            dataObj.value = queryParams.filters && typeof queryParams.filters !== "string" ? JSON.stringify(queryParams.filters) : queryParams.filters;//no i18n
            Object.defineProperty(queryParams, '_filters', dataObj);//no i18n
            dataObj.value = queryParams.cross_filters && typeof queryParams.cross_filters !== "string" ? JSON.stringify(queryParams.cross_filters) : queryParams.cross_filters;//no i18n
            Object.defineProperty(queryParams, '_cross_filters', dataObj);//no i18n
            delete queryParams.filters; delete queryParams.cross_filters;
        }
        if (customData.type && customData.module && customData.id) {
            url = url + '/' + customData.module + '/' + customData.id;
        }
        //clone support
        if (customData.cloneData) {
            url += "/" + customData.cloneData.parent_id + "/actions/clone";
        }
        if (customData.version === 4) {
            url = url.replace('v2.2', 'v4'); // NO I18N
        }
        if(customData.apiVersion){
            url = url.replace('v2.2', customData.apiVersion); // NO I18N
        }
        if (customData.invRECORDSversion) {
            url = url.replace('/v2.2/', '/' + customData.invRECORDSversion + '/');//no i18n
        }
        if (actionName === 'rlCount') { //No I18n
            url = url.replace('v2.2', 'v4'); // NO I18N
        }
        return url;
    },
    parseResponse: function (type, modelName, xhrObj, payLoad) {
        if (xhrObj.status === 204) {
            payLoad = this.super(arguments);//eslint-disable-line @zoho/zstandard/no-reserved-words
            payLoad.info = {};
        }
        return payLoad;
    },
    headersForRequest: function (type, action, customData) {
        var headers = this.$super.headersForRequest(type, action, customData);
        if (customData && customData["X-CRM-FEATURE-NAME"]) {
            headers["X-CRM-FEATURE-NAME"] = customData["X-CRM-FEATURE-NAME"];//No I18N
        }
        if (!headers.Range && customData && customData.subformNavigation) {
            headers.Range = customData.subformNavigation;
        }
        if( customData && customData.businessCard){
            headers["X-ZOHO-SERVICE"]= "crm/lookupTooltip";	//no i18n
        }
        return headers;
    }
});
/* $Id$ */
//store.unregisterSerializer("entity")
store.registerSerializer("entity", { //No I18N
    preserveTypes_CEC: ["date", "datetime", "multi-picklist", "phone", "time-in-hrs", "time-in-minutes", "tax"],//no i18n
    serializeKey: function (modelName, type, customData) {
        if (customData === undefined || (customData && customData.action !== 'convert' && customData.action !== 'mass_convert') && customData.action !== 'merge') {
            return 'data'; //No I18N
        }
    },
    normalize: function (modelName, type, data) {
        if (type === "findAll") {
            //To handle dirty values getting removed when same module lookup field used. So patching dirty values.
            var exitingRecord = store.peekRecord(modelName, data.id);
            if (exitingRecord && exitingRecord.$.isDirty()) {
                var fldName = exitingRecord.$.getDirtyAttributes()[0];
                var extValue = exitingRecord[fldName];
                var curntModel = store.modelFor(modelName);
                if (curntModel && curntModel.fieldList && curntModel.fieldList[fldName] &&
                    curntModel.fieldList[fldName].type === "relation"
                    && exitingRecord[fldName] && exitingRecord[fldName].mapBy) { //Maximum call stack size exceeded exception for subform in Edit page ---lyteCreate
                    extValue = exitingRecord[fldName].mapBy('id');
                }
                data[fldName] = extValue;
            }
        }
        var keys = Object.keys(data);
        var keyLength = keys.length;
        for (var ind = 0; ind < keyLength; ind++) {
            if (keys[ind].indexOf(".") > -1) {
                delete data[keys[ind]];
            }
        }
        return data;
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {
        if (customData && customData.$se_module) {
            payLoad.data.$se_module = customData.$se_module;
        }
        if (type !== "destroyRecord" && type !== "create" && payLoad && actionName !== "convert" && actionName !== "mass_convert" &&
            actionName !== "merge" && actionName !== "pre_validate") { //no i18n
            // fix for $se_module 
            if (records.$se_module && payLoad.data) {
                payLoad.data.$se_module = records.$se_module;
            }
            //clone new API support
            if (customData && customData.cloneData) {
                var finServerObj = {};
                for (var k1 in customData.cloneData.dataToSend) {
                    var fldProps = store.modelFor(modelName).fieldList[k1];
                    if (fldProps && fldProps.fieldType === "multiuserlookup" && !payLoad.data[k1]) {
                        finServerObj[k1] = [];
                    } else {
                        finServerObj[k1] = payLoad.data[k1];
                    }
                }
                payLoad.data = [finServerObj];
            } else {
                payLoad.data = [payLoad.data];
            }
        }
        if (actionName === "execute" && customData && customData.jsonData) {
            return { functions: customData.jsonData };
        }
        if (actionName === "change_owner" && customData && customData.qParams) {
            var pObject = {}, qp = customData.qParams;
            pObject.owner = { id: qp.owner_id };
            pObject.notify = qp.notify;
            if (qp.related_modules && qp.related_modules.length) {
                pObject.related_modules = qp.related_modules;
            } else {
                pObject.related_modules = [];
            }
            return pObject;
        }
        let currentModelDetails = store.modelFor(modelName);
        try {
            if (customData && customData.currentPage && ['create', 'edit', 'clone'].includes(customData.currentPage)) {
                if (customData.currentSubformDetails && Object.keys(customData.currentSubformDetails).length) {
                    let subformNames = Object.keys(customData.currentSubformDetails);
                    function isFileUploadFieldEmpty(uploadedFiles) {
                        return uploadedFiles ? (uploadedFiles.filter(function (f) { return !f.hasOwnProperty('_delete'); }).length === 0) : true;//no i18n
                    };
                    subformNames.forEach((subformName) => {
                        let finIds = [];
                        if (payLoad.data[0][subformName]) {
                            let _currSub = records[subformName],
                                _fldList = _currSub.model.fieldList,
                                _finArr = [], _refArr = [];
                            _currSub.forEach(function (subRecs, index) {
                                var isValidrec = false;
                                for (var k in _fldList) {
                                    if (_fldList[k].fieldID && (!["SERIAL_NUMBER", "LINETAX"].includes(_fldList[k].columnName)) && _fldList[k].fieldType !== "formula") {
                                        subRecs[k] = typeof subRecs[k] === "string" ? (subRecs[k] && subRecs[k] === "[]" ? "" : subRecs[k].trim()) : subRecs[k];
                                        if (((subRecs[k] || subRecs[k] === 0) && _fldList[k].fieldType !== "picklist" && _fldList[k].fieldType !== "fileupload") ||
                                            (subRecs[k] && _fldList[k].fieldType === "picklist" && subRecs[k] !== '-None-') || (_fldList[k].fieldType === "fileupload" && !isFileUploadFieldEmpty(subRecs[k]))) {
                                            isValidrec = subRecs.removedRow !== "true" && subRecs.$dummyRow !== true;
                                        }
                                    }
                                }
                                if (isValidrec) {
                                    if (payLoad.data[0][subformName][index]) {
                                        _finArr.push(payLoad.data[0][subformName][index]);
                                    }
                                    finIds.push(subRecs.id);
                                }
                                _refArr.push({ 'isValid': isValidrec, 'id': subRecs.id });
                            });
                            var invalidRowIds = [];
                            _refArr.forEach(function (r) {
                                if (!r.isValid) {
                                    invalidRowIds.push(r.id);
                                    if (payLoad.data[0][subformName]) {
                                        store.unloadRecord(payLoad.data[0][subformName].$._model, r.id);
                                    }
                                }
                            });
                            if (_finArr.length) {
                                //to set null as value for the undefined fields since those fields wont be sent in request -- ZCRM-21466
                                _finArr.forEach(function (arr) {
                                    for (var k in arr) {
                                        arr[k] = arr[k] === undefined ? null : arr[k];
                                    }
                                });
                                payLoad.data[0][subformName] = _finArr;
                            } else {
                                payLoad.data[0][subformName] = null;
                            }
                        }
                    });
                }
                let taxFieldInModel = currentModelDetails && currentModelDetails.fieldList && currentModelDetails.fieldList.Tax;
                if (taxFieldInModel && (taxFieldInModel.uiType === 96 || taxFieldInModel.type === 'tax') && taxFieldInModel.columnName === "TAX" && payLoad.data[0].hasOwnProperty('Tax')) {
                    let finalTax = [],
                        _tax = payLoad.data[0].Tax;
                    _tax = _tax && typeof _tax === 'string' ? JSON.parse(_tax) : _tax; //no i18n

                    if (_tax && _tax.length) {
                        _tax.forEach((itax) => {
                            let finalTaxObject = { id: null };//supported for tax alone
                            finalTaxObject.value = itax;
                            finalTax.push(finalTaxObject);
                        });
                        payLoad.data[0].Tax = finalTax;
                    } else {
                        payLoad.data[0].Tax = [];
                    }
                }
            }
        } catch (exe) {
            if (!customData) {
                customData = {};
            }
            customData.exception = exe;
        }
        return payLoad;
    },
    normalizeResponse: function (modelName, type, payLoad) {
        function handleNullvaluesinRecord(_data) {
            if (_data) {
                var _keys = Object.keys(_data);
                var _keyLen = _keys.length;
                var _model = store.modelFor(modelName);
                var fieldList = _model.fieldList;
                if (!payLoad.meta) {
                    payLoad.meta = {};
                }
                if (!payLoad.meta.original) {
                    payLoad.meta.original = {};
                }
                if (!_data._$) {
                    _data._$ = {};
                }
                if (!_data._$.original) {
                    _data._$.original = {};
                }
                var preserveTypes = this.preserveTypes_CEC;
                for (var l = 0; l < _keyLen; l++) {
                    if (_data[_keys[l]] === null) { //removed since it was handled in store itself ----> reverted since it is breaking in default features. eg: ZCRM-129235
                        _data[_keys[l]] = undefined;
                    }
                    if (fieldList[_keys[l]] && (_data[_keys[l]] || _data[_keys[l]] === 0) && preserveTypes.indexOf(fieldList[_keys[l]].type) > -1) {
                        payLoad.meta.original[_keys[l]] = _data._$.original[_keys[l]] = _data[_keys[l]];
                    } else if (_data[_keys[l]] && _data[_keys[l]].length && fieldList[_keys[l]] && fieldList[_keys[l]].type === "relation" && fieldList[_keys[l]].relType === "hasMany") {
                        payLoad.meta.original[_keys[l]] = _data._$.original[_keys[l]] = Lyte.deepCopyObject(_data[_keys[l]].slice(0));
                    }
                }

                //to support null check for subform relations
                var _relations = _model.relations;
                for (var rel in _relations) {
                    var currRel = _relations[rel];
                    if (currRel && currRel.length && currRel[0].relType === "hasMany" &&
                        (_data[currRel[0].relKey] === null || _data[currRel[0].relKey] === undefined) &&
                        (_data.hasOwnProperty(currRel[0].relKey))) { //eslint-disable-line @zoho/zstandard/no-duplicate-null-check
                        _data[currRel[0].relKey] = [];
                    }
                }
            }
        };
        if (payLoad.data) {
            payLoad.data.forEach(function (item) {
                if (item.hasOwnProperty('transition')) { //no i18n
                    item.id = item.transition.id;
                }
                if (item.hasOwnProperty('$approval_state') && !(item.hasOwnProperty('$approved'))) {
                    if (item.$approval_state === 'approved' || item.$approval_state === 'review_process_pending' ||
                        item.$approval_state === 'review_process_rejected' || item.$approval_state === 'merge_pending') { // NO I18N
                        item.$approved = true;
                    } else {
                        item.$approved = false;
                    }
                }
            });
        }

        if (type === "createRecord" || type === "create" || type === 'updateRecord') {
            var a = {}; a[modelName] = {};
            a[modelName] = payLoad.data[0].details;
            return a;
        }
        if (type === "findAll" || type === "findRecord") {
            payLoad[modelName] = payLoad.data ? payLoad.data : [];
            delete payLoad.data;
            if (type === "findRecord") {
                var _fRdata = payLoad[modelName] ? payLoad[modelName][0] : undefined;
                handleNullvaluesinRecord.call(this, _fRdata);
            } else if (typeof payLoad[modelName] !== "undefined") {
                payLoad[modelName].forEach(function (_indRecord) {
                    handleNullvaluesinRecord.call(this, _indRecord);
                }.bind(this));
            }
        }
        return payLoad;
    },
    payloadKey: function (modelName, type, key, query, customdata) {
        if (customdata !== undefined && customdata.action === 'convert') {
            return '__conversion_options';//No I18N
        }
        return modelName;
    },
    extractMeta: function (payLoad) {
        return payLoad.info;
    }
});