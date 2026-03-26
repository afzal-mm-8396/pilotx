Lyte.Mixin.register("crux-create-requesthandler-mixin", {
    fetchModuleMetaData: async function (moduleId) {
        return new Promise(function (resolve) {
            try {
                store.findRecord('module', moduleId).then(
                    (successResponse) => {
                        resolve({ success: successResponse });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (moduleFetchException) {
                resolve({ isExceptionOccured: true, moduleFetchException });
            }
        }.bind(this));
    },
    fetchLayoutMetaData: async function (layoutCompData, layoutId) {
        let layoutDetails = (this.getDefaultLayoutDetails(layoutCompData.cxPropModuleData, layoutCompData.cxPropProfileName, layoutId)) || {},
            layoutCacheCustomdata = { layoutId: layoutId || layoutDetails.currentLayoutId, moduleSet: true, peekField: false, from: "lyteCreate" };//no i18n
        if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
            layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
        }
        if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
            layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
        }
        return new Promise(function (resolve) {
            try {
                store.findRecord("module", layoutCompData.cxPropModuleData.id, { include_inner_details: "lookup.query_details.criteria" }, undefined, true, layoutCacheCustomdata).then(
                    (successResponse) => {
                        resolve({ success: successResponse, layoutId: layoutCacheCustomdata.layoutId });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (layoutFetchException) {
                resolve({ isExceptionOccured: true, layoutFetchException });
            }
        }.bind(this));
    },
    fetchLayoutRuleData: async function (layoutCompData, cxPropLayoutId) {
        return new Promise(function (resolve) {
            try {
                let currentLayoutId = cxPropLayoutId || (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id);
                if (typeof Crm !== 'undefined' &&
                    (Crm.userDetails.LAYOUTRULEAVAILABLE === undefined || Crm.userDetails.LAYOUTRULEAVAILABLE === true &&
                        Crm.userDetails.LRINVOLVEDMODULES.includes(layoutCompData.cxPropModuleData.module_name))) {
                    store.findAll("layout_rule", { module: layoutCompData.cxPropModuleData.api_name }, false, false, {layout_id : currentLayoutId }).then(
                        (successResponse) => {
                            resolve({ success: successResponse });
                        },
                        (failureResponse) => {
                            resolve({ failure: failureResponse });
                        });
                } else {
                    resolve();
                }
            } catch (layoutRuleFetchException) {
                resolve({ isExceptionOccured: true, layoutRuleFetchException });
            }
        }.bind(this));
    },
    fetchValidationRuleData: async function (layoutCompData, cxPropLayoutId) {
        return new Promise(function (resolve) {
            try {
                let currentLayoutId = cxPropLayoutId || (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id);
                if (typeof Crm !== 'undefined' &&
                    (Crm.userDetails.VALIDATIONRULEAVAILABLE === undefined || Crm.userDetails.VALIDATIONRULEAVAILABLE === true &&
                        Crm.userDetails.VRINVOLVEDMODULES.includes(layoutCompData.cxPropModuleData.module_name))) {
                    store.findAll("validation_rule", {
                        layout_id: currentLayoutId,
                        module: layoutCompData.cxPropModuleData.api_name,
                        download_rules: true
                    }, false).then(
                        (successResponse) => {
                            resolve({ success: successResponse });
                        },
                        (failureResponse) => {
                            resolve({ failure: failureResponse });
                        });
                } else {
                    resolve();
                }
            } catch (validationRuleFetchException) {
                resolve({ isExceptionOccured: true, validationRuleFetchException });
            }
        }.bind(this));
    },
    fetchLookupModuleData: function (customData) {
        customData = customData || {};
        let { id } = customData;
        return new Promise((resolve) => {
            store.findRecord("module", id).then(
                (moduleResponse) => {
                    resolve(moduleResponse[0]);
                },
                (failureResponse) => {
                    resolve(failureResponse);
                });
        });
    },
    fetchLookupRecordsData: function (customData) {
        customData = customData || {};
        let { moduleId, queryParams } = customData;
        return new Promise((resolve) => {
            store.findAll(moduleId, queryParams).then(
                (entityRecords) => {
                    resolve(entityRecords);
                },
                (failureResponse) => {
                    resolve(failureResponse);
                });
        });
    },
    saveCurrentForm: function (customData, isQuickCreate, layoutComponentData) {
        customData = customData || {};
        var entityRecord = customData.formData && customData.formData.$ && customData.formData.$.model ? customData.formData : store.createRecord(customData.moduleId, customData.formData, true);
        this.showHideLoadingDiv(true);
        return new Promise((resolve) => {
            let saveCustomData = { crux_feature_type: 'entitySave', currentPage: customData.currentPage, moduleId: customData.moduleId, moduleName: customData.moduleName };
            entityRecord = this.serializeFormDataBeforeSave(entityRecord, layoutComponentData.cxInternalUtilityObj.formFieldList);
            entityRecord.$.save(saveCustomData).then(
                (successResponse) => {
                    let returnObj = {
                        saveResponse: successResponse.hasOwnProperty(customData.moduleId) ? successResponse[customData.moduleId] : successResponse
                    };
                    if (successResponse.data && successResponse.data[0] && successResponse.data[0].details) {
                        returnObj.saveResponse = successResponse.data[0].details;
                    }
                    if (customData.currentButtonObj && customData.currentButtonObj.name === 'saveandassociate' &&
                        isQuickCreate && returnObj.saveResponse && returnObj.saveResponse.id) {
                        store.findRecord(customData.moduleId, returnObj.saveResponse.id).then(
                            (successResponse) => {
                                this.showHideLoadingDiv();
                                returnObj.quickCreatedRecord = (Array.isArray(successResponse) && successResponse[0]) || successResponse;
                                resolve(returnObj);
                            },
                            () => {
                                this.showHideLoadingDiv();
                                resolve(returnObj);
                            }).catch(() => {
                                this.showHideLoadingDiv();
                                resolve(returnObj);
                            });
                    } else {
                        this.showHideLoadingDiv();
                        resolve(returnObj);
                    }
                },
                (failureResponse) => {
                    this.showHideLoadingDiv();
                    resolve({ errorObject: failureResponse, isSaveFailed: true });
                });
        });
    },
    fetchAndSetLookupModuleMeta: function (cxUtilityObj, modId) {
        return new Promise((resolve) => {
            store.findRecord('module', modId).then(
                (sucessReponse) => {
                    if (Array.isArray(sucessReponse) && sucessReponse[0]) {
                        Lyte.objectUtils(cxUtilityObj.lookupModuleMetaInfo, 'add', modId, sucessReponse[0]);
                    } else {
                        delete cxUtilityObj.lookupModuleMetaInfo[modId];
                    }
                    resolve();
                },
                () => {
                    delete cxUtilityObj.lookupModuleMetaInfo[modId];
                    resolve();
                }
            ).catch(() => {
                delete cxUtilityObj.lookupModuleMetaInfo[modId];
                resolve();
            });
        });
    },
    fetchEntityRecordData: function (layoutCompData) {
        let { cxPropRecordId, cxPropModuleId } = layoutCompData,
            qp = { approved: "both", converted: "both" };
        return new Promise(function (resolve) {
            try {
                store.findRecord(cxPropModuleId, cxPropRecordId, qp).then(
                    (successResponse) => {
                        resolve({ success: successResponse });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (recordFetchException) {
                resolve({ isExceptionOccured: true, recordFetchException });
            }
        }.bind(this));
    }
});