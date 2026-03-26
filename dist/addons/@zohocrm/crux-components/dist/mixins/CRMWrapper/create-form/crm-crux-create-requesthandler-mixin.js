Lyte.Mixin.register("crm-crux-create-requesthandler-mixin", {
    fetchModuleMetaData: async function (moduleId) {
        return new Promise(function (resolve) {
            try {
                store.findRecord('module', moduleId, {}, false, true, { allowMultiple: true }).then(
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
    fetchLayoutMetaData: async function (layoutCompData, layoutId, layoutName) {
        let layoutDetails = (this.getDefaultLayoutDetails(layoutCompData.cxPropModuleData, layoutCompData.cxPropProfileName, layoutId, layoutName)) || {},
            layoutCacheCustomdata = {
                layoutId: layoutId || layoutDetails.currentLayoutId,
                moduleSet: true,
                peekField: false,
                from: "lyteCreate", //no i18n
                allowMultiple: true
            };
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
    fetchLayoutRuleData: async function (layoutCompData, cxPropLayoutId , isDetailView) {
        return new Promise(function (resolve) {
            try {
                let currentLayoutId = cxPropLayoutId || (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id),
                    isSystemLRModule = ['Deals', 'Potentials'];
                if (isSystemLRModule.indexOf(layoutCompData.cxPropModuleData.module_name) !== -1 || (typeof Crm !== 'undefined' &&
                    (Crm.userDetails.LAYOUTRULEAVAILABLE === undefined || Crm.userDetails.LAYOUTRULEAVAILABLE === true &&
                        Crm.userDetails.LRINVOLVEDMODULES.includes(layoutCompData.cxPropModuleData.module_name)))) {
                            var lrQueryParams = {};
                            lrQueryParams.module = layoutCompData.cxPropModuleData.api_name;
                            if(isDetailView){
                                if(!Crm.userDetails.DYNAMIC_FORMS && Crm.userDetails.LAYOUT_RULE_LYTE)
                                {
                                    lrQueryParams.isLRLyte = true;
                                }
                                if(Crm.userDetails.DYNAMIC_FORMS){
                                    lrQueryParams.include = "conditions";//NO I18N
                                    lrQueryParams.ispagecall = true;
                                    lrQueryParams.layout_id = cxPropLayoutId;
                                }
                            }
                    store.findAll("layout_rule", lrQueryParams, false, false, {layout_id : currentLayoutId , newFlow :isDetailView }).then(
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
    fetchLookupRecordsData: function (customData, layoutComponentData) {
        customData = customData || {};
        let { moduleId, queryParams } = customData,
            lookupQpAndCustomData = {},
            lookupQueryParams = {},
            lookupCustomData = {};
        customData.parentModuleId = layoutComponentData && (layoutComponentData.cxPropModuleId ||
            (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.id));
        customData.currentPage = layoutComponentData && layoutComponentData.cxPropCurrentPage;
        customData.currentInstObjKey = layoutComponentData && layoutComponentData.currentInstObjKey;
        try {
            lookupQpAndCustomData = this.getQpAndCustomDataForLookupRecordsFetch(customData) || {};
            if (lookupQpAndCustomData.queryParams) {
                lookupQueryParams = lookupQpAndCustomData.queryParams;
            }
            if (lookupQpAndCustomData.customData) {
                lookupCustomData = lookupQpAndCustomData.customData;
            }
        } catch (e) {
            lookupQueryParams = queryParams || {};
            lookupCustomData = {};
        }
        return new Promise((resolve) => {
            store.findAll(moduleId, lookupQueryParams, undefined, undefined, lookupCustomData).then(
                (entityRecords) => {
                    resolve(entityRecords);
                },
                (failureResponse) => {
                    resolve(failureResponse);
                });
        });
    },
    getQpAndCustomDataForLookupRecordsFetch: function (customData) {
        let returnCustomData = {}, returnQueryParams = {},
            { queryParams, fieldMeta, parentModuleId, currentPage, formData, currentInstObjKey } = customData;
        returnQueryParams = $L.extend(true, {}, queryParams || {});
        fieldMeta = fieldMeta || {};
        let isSearchQuery = returnQueryParams.filters ? true : false,
            lookupModuleId = fieldMeta.lookup && fieldMeta.lookup.module ? fieldMeta.lookup.module.id : undefined,
            isCustomField = fieldMeta.custom_field;
        if (!(fieldMeta.lookup && fieldMeta.lookup.query_details && fieldMeta.lookup.query_details.query_id)) {
            delete returnQueryParams.child_data;
        }
        if (isSearchQuery) {
            returnCustomData.from = "Lookup";//NO I18N
            returnCustomData.type = "Search";//NO I18N
            returnCustomData.criteria = returnQueryParams.criteria = returnQueryParams.filters;
            delete returnQueryParams.filters;
        }
        let fieldmeta_criteria = fieldMeta.criteria;
        if (fieldmeta_criteria && fieldmeta_criteria.criteria) {
            if (!returnCustomData.hasOwnProperty('type')) {
                returnCustomData.type = "Search";//NO I18N
            }
            if (!returnCustomData.hasOwnProperty('from')) {
                returnCustomData.from = "Lookup";//NO I18N
            }
            returnCustomData.criteria = returnQueryParams.criteria = returnCustomData.criteria ? fieldmeta_criteria ? `(${returnCustomData.criteria} and ${fieldmeta_criteria.criteria})` : returnCustomData.criteria : fieldmeta_criteria.criteria;
            delete returnQueryParams.filters;
            if (fieldMeta.lookup && fieldMeta.lookup.query_details && fieldMeta.lookup.query_details.query_id) {
                returnQueryParams.query_id = fieldMeta.lookup.query_details.query_id;
            }
        }
        returnQueryParams.approved = "both";//NO I18N
        returnQueryParams.approval_state = "approved,approval_process_pending,approval_process_rejected";//NO I18N
        let lookupModuleRecord = store.peekRecord('module', lookupModuleId);
        if (lookupModuleRecord && lookupModuleRecord.module_name === 'Products') { //no i18n
            let productModuleFields = lookupModuleRecord.fields || [],
                productActiveField = productModuleFields.filter(function (mFields) { return mFields.api_name === 'Product_Active'; })[0],//no i18n
                profile = productActiveField && productActiveField.profiles ? productActiveField.profiles.some(function (profile) { return typeof Crm !== 'undefined' && Crm.userDetails.PROFILE_NAME === profile && profile.name; })[0] : undefined;
            if (productActiveField && ((profile && profile.permission_type !== "hidden") || productActiveField.visible)) {
                returnQueryParams = this.queryParamsConstructor(Lyte.deepCopyObject(returnQueryParams), "(Product_Active:equals:true)"); //no i18n
            }
        }
        if (lookupModuleId === parentModuleId && !isCustomField && currentPage === 'edit') { //no i18n
            let recordId = formData.id;
            returnQueryParams = this.queryParamsConstructor(Lyte.deepCopyObject(returnQueryParams), "(id:not_equal:" + recordId + ")");//no i18n
        }
        let currentPageModule = store.peekRecord('module', parentModuleId);
        if (currentPageModule && currentPageModule.module_name === 'Contacts' &&
            fieldMeta.api_name === 'Reporting_To' &&
            formData.Account_Name &&
            formData.Account_Name.id) {
            returnQueryParams = this.queryParamsConstructor(Lyte.deepCopyObject(returnQueryParams), `(Account_Name:equals:${formData.Account_Name.id})`);
            if (!returnQueryParams.relatedId) {
                returnQueryParams.relatedId = formData.Account_Name.id;
            }
            if (!returnQueryParams.relationId && fieldMeta[currentInstObjKey] && fieldMeta[currentInstObjKey].relationDetails && fieldMeta[currentInstObjKey].relationDetails.relationId) {
                returnQueryParams.relationId = fieldMeta[currentInstObjKey].relationDetails.relationId;
            }
        }
        if (returnQueryParams.criteria) {
            if (!returnCustomData.hasOwnProperty('type')) {
                returnCustomData.type = "Search";//NO I18N
            }
            if (!returnCustomData.hasOwnProperty('from')) {
                returnCustomData.from = "Lookup";//NO I18N
            }
            returnCustomData.criteria = returnQueryParams.criteria;
        }
        return {
            queryParams: returnQueryParams,
            customData: returnCustomData
        };
    },
    queryParamsConstructor: function (queryParams = {}, currentFilter) {
        queryParams.criteria = queryParams.criteria ? queryParams.criteria + 'and' + currentFilter : currentFilter;	//no i18n
        return queryParams;
    },
    saveCurrentForm: function (customData, isQuickCreate, layoutComponentData) {
        customData = customData || {};
        var entityRecord = customData.formData && customData.formData.$ && customData.formData.$.model ? customData.formData : store.createRecord(customData.moduleId, customData.formData, true);
        this.showHideLoadingDiv(true);
        return new Promise((resolve) => {
            let saveCustomData = {
                currentSubformDetails: (layoutComponentData.cxInternalUtilityObj && layoutComponentData.cxInternalUtilityObj.subformFieldList) || {},
                crux_feature_type: 'entitySave',//no i18n
                currentPage: customData.currentPage,
                moduleId: customData.moduleId,
                moduleName: customData.moduleName
            };
            entityRecord = this.serializeFormDataBeforeSave(entityRecord, layoutComponentData.cxInternalUtilityObj.formFieldList);
            if (customData.currentPage === 'clone') {
                let cloneData = {};
                cloneData.parent_id = layoutComponentData.cxPropRecordId || layoutComponentData.cxPropRecordData.id;
                cloneData.type = "POST";
                cloneData.dataToSend = customData.formDirtyAttributes;
                saveCustomData.cloneData = cloneData;
            }
            if (!entityRecord.$.save) {
                _cruxUtils.showCustomAlert({
                    params: {
                        ltPropType: 'warning', //NO I18N
                        ltPropPrimaryMessage: 'Invalid Action',//no i18n
                        ltPropSecondaryMessage: 'Save operation cannot be completed for this form instance. Required configuration is missing/incorrect.',//no i18n
                        ltPropButtonPosition: 'right', //No I18n
                        ltPropShowCloseButton: 'false',//No I18n
                        ltPropButtons: [
                            {
                                "type": "accept",
                                "text": "Close",
                                "appearance": "failure"
                            }
                        ]
                    }
                });
                this.showHideLoadingDiv();
                return;
            }
            entityRecord.$.save(saveCustomData).then(
                (successResponse) => {
                    if (!successResponse) {
                        successResponse = { id: entityRecord.id }; // dummy save will not return any response
                    }
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
    },
    openQuickCreateForm: function (quickCreateDataObject = {}) {
        let { fromModal, cxPropFieldData } = quickCreateDataObject;
        setTimeout(() => {
            this.quickCreateFromModal = fromModal;
            this.hideLookupDropdown(Object.assign({ fromModal }, quickCreateDataObject));
            let fieldMeta = cxPropFieldData || this.data.cxPropFieldData, layoutComponentData = this.data.cxPropLayoutComponentData, newLayoutRenderingObj = {},
                lookupModuleDetails = Lyte.deepCopyObject(fieldMeta.lookup.module || {}),
                originalLayoutComponentData = (layoutComponentData.layoutComponentDomNode.component.data.originalLayoutComponentData || {}),
                { cxPropOutletValue } = originalLayoutComponentData;
            let lookupModuleRecord = layoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[lookupModuleDetails.id];
            if (lookupModuleRecord) {
                lookupModuleDetails.moduleName = lookupModuleRecord.module_name;
            }
            newLayoutRenderingObj.cxPropModuleName = lookupModuleDetails.moduleName;
            newLayoutRenderingObj.cxPropModuleId = lookupModuleDetails.id;
            newLayoutRenderingObj.cxPropModuleApiName = lookupModuleDetails.api_name;
            newLayoutRenderingObj.cxPropOutletValue = (cxPropOutletValue || "body");//no i18n
            newLayoutRenderingObj.isQuickCreate = true;
            let crmCruxCreateFormNode = Lyte.Component.render('crm-create-form', {//no i18n
                cxPropLayoutComponentData: newLayoutRenderingObj,
                cxPropRenderMode: "modal",//no i18n
            }, newLayoutRenderingObj.cxPropOutletValue);
            if (crmCruxCreateFormNode) {
                crmCruxCreateFormNode.setMethods({
                    onFormAfterSave: (callBackDataObject) => {
                        this.onFormAfterSave.call(this, newLayoutRenderingObj, quickCreateDataObject, callBackDataObject);
                        return false;
                    },
                    onFormCancel: (callBackDataObject) => {
                        this.onFormCancel.call(this, newLayoutRenderingObj, quickCreateDataObject, callBackDataObject);
                        return false;
                    },
                    onFormAfterRender: (callBackDataObject) => {
                        let parentModuleName = layoutComponentData && layoutComponentData.cxPropModuleName,
                            parentModuleLookupFieldApiName = quickCreateDataObject.cxPropFieldData && quickCreateDataObject.cxPropFieldData.api_name;
                        if (parentModuleName === 'Contacts' && parentModuleLookupFieldApiName === 'Reporting_To') { //no i18n
                            let selectedAccountLookupData = quickCreateDataObject.formData && quickCreateDataObject.formData.Account_Name &&
                                quickCreateDataObject.formData.Account_Name.id &&
                                quickCreateDataObject.formData.Account_Name.name ?
                                quickCreateDataObject.formData.Account_Name : undefined;
                            let fieldApiVsMetaObject = callBackDataObject.allFieldMetaDetails && callBackDataObject.allFieldMetaDetails.fieldApiVsMetaObject || {};
                            let setFormDataUtil = crmCruxCreateFormNode && crmCruxCreateFormNode.setFormData;
                            if (setFormDataUtil && fieldApiVsMetaObject && fieldApiVsMetaObject.Account_Name) {
                                setFormDataUtil({ Account_Name: selectedAccountLookupData });
                            }
                        }
                    }
                });
            }
            if (fromModal) {
                this.hideLookupModal(Object.assign({ fromModal }, quickCreateDataObject));
            }
        }, 25);
    },
    layoutSwitchHanlder: async function (dataObject = {}) {
        let { selectedLayoutId, newLayoutRenderObj, crmCxoriginalLayoutComponentData } = dataObject;
        let finalRenderingObj = Object.assign({}, crmCxoriginalLayoutComponentData);
        finalRenderingObj.cxPropLayoutId = selectedLayoutId || newLayoutRenderObj.cxPropLayoutId;
        if (!finalRenderingObj.cxPropModuleId && newLayoutRenderObj.cxPropModuleId) {
            finalRenderingObj.cxPropModuleId = newLayoutRenderObj.cxPropModuleId;
        }
        if (this.isEmptyObj(finalRenderingObj.cxPropModuleData) && !this.isEmptyObj(newLayoutRenderObj.cxPropModuleData)) {
            finalRenderingObj.cxPropModuleData = newLayoutRenderObj.cxPropModuleData;
        }
        this.setData('showLoading', true);
        this.setData('cxPropLayoutComponentData', finalRenderingObj);
        await this.initHandler();
        await this.didConnectHandler();
    },
    executeVrFunction: async function (dataObject = {}) {
        let { formData, jsonData } = dataObject;
        return new Promise(function (resolve) {
            try {
                store.triggerAction(formData.$.model._name, 'execute', { type: 'POST', jsonData: jsonData }).then( //no i18n
                    (successResponse) => {
                        resolve({ success: successResponse });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (vrExecutionException) {
                resolve({ isExceptionOccured: true, vrExecutionException });
            }
        }.bind(this));
    }
});