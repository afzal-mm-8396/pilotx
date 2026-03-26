Lyte.Mixin.register("crm-crux-create-base-mixin", {
    checkAndFetchMetaData: async function (layoutCompData) {
        // Increment request ID to avoid parallel rendering issues
        this._renderRequestId = (this._renderRequestId || 0) + 1;
        const currentRequestId = this._renderRequestId;
        try {
            let defaultKeysObject = {
                isModuleMetaDataEmpty: 'cxPropModuleData',
                isSectionsMetaDataEmpty: 'cxPropLayoutSections'
            };
            if (layoutCompData.cxPropLayoutRulesRequired || this.data.cxPropLayoutRulesRequired) {
                defaultKeysObject.isLayoutRulesMetaDataEmpty = 'cxPropLayoutRules';
            }
            if (layoutCompData.cxPropValidationRulesRequired || this.data.cxPropValidationRulesRequired) {
                defaultKeysObject.isValidationRulesMetaDataEmpty = 'cxPropValidationRules';
            }
            for (var emptyKey in defaultKeysObject) {
                delete this.data[emptyKey];
                if (this.isEmptyObj(layoutCompData[defaultKeysObject[emptyKey]])) {
                    this.data[emptyKey] = true;
                }
            }
            this.data.isRecordDataEmpty = false;
            if (['edit', 'clone'].includes(this.data.cxPropCurrentPage) && (!this.data.cxPropRecordId || (this.data.cxPropRecordId && this.isEmptyObj(layoutCompData.cxPropRecordData)))) {
                this.data.isRecordDataEmpty = true;
            }
            let haveAllDefaultMetaData = !this.data.isModuleMetaDataEmpty && !this.data.isSectionsMetaDataEmpty &&
                !this.data.isLayoutRulesMetaDataEmpty && !this.data.isValidationRulesMetaDataEmpty && !this.data.isRecordDataEmpty;
            this.setData('haveAllDefaultMetaData', haveAllDefaultMetaData);//no i18n
            if (typeof ZlibPhoneNumber === 'undefined' && typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.isPhoneNoNewView) {
                await Lyte.injectResources(networkUtils.returnDependencyFiles(["zlib_phonenumber.js"], ResourceConstants.CRM));
            }
            //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
            if (this.isParallelRenderingDetected(currentRequestId)) { return; }
            if (haveAllDefaultMetaData) {
                if (this.isEmptyObj(layoutCompData.cxPropFormData)) {
                    if (this.data.cxPropCurrentPage === 'create') {
                        let recordObj = this.isEmptyObj(layoutCompData.cxPropRecordData) ? {} : Object.assign({}, layoutCompData.cxPropRecordData);
                        delete recordObj.id;
                        layoutCompData.cxPropFormData = store.createRecord(layoutCompData.cxPropModuleId, recordObj, true);
                    } else if (this.data.cxPropCurrentPage === 'clone' && !this.isEmptyObj(layoutCompData.cxPropRecordData)) {
                        layoutCompData.cxPropFormData = layoutCompData.cxPropRecordData;
                    }
                }
                return;
            }
            this.setData('showLoading', true);//no i18n
            layoutCompData.__isRequestInProgress = true;
            let promiseObj = {};
            if (this.data.isModuleMetaDataEmpty) {
                if ((!layoutCompData.cxPropModuleId || (layoutCompData.cxPropModuleId !== this.data.cxPropModuleId)) && layoutCompData.cxPropModuleApiName) {
                    let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: layoutCompData.cxPropModuleApiName });
                    if (moduleDetails && moduleDetails.moduleId) {
                        this.data.cxPropModuleId = layoutCompData.cxPropModuleId = moduleDetails.moduleId;
                    }
                }
                if (layoutCompData.cxPropModuleId) {
                    //COM_M1_2 ZCRM-684100
                    let currentModuleCache = store.peekRecord('module', layoutCompData.cxPropModuleId);
                    if (!currentModuleCache) {
                        let parentScopeCache = window.store && window.store.peekRecord && window.store.peekRecord('module', layoutCompData.cxPropModuleId);
                        if (parentScopeCache && parentScopeCache.id) {
                            store.pushPayload('module', {
                                id: parentScopeCache.id,
                                api_name: parentScopeCache.api_name,
                                module_name: parentScopeCache.module_name
                            });
                        }
                    }
                    promiseObj.moduleDetail = await this.fetchModuleMetaData(layoutCompData.cxPropModuleId);
                    if (!promiseObj.moduleDetail) {
                        promiseObj.moduleDetail = {};
                    }
                    if (promiseObj.moduleDetail.success && promiseObj.moduleDetail.success[0]) {
                        layoutCompData.cxPropModuleData = promiseObj.moduleDetail.success[0];
                        this.data.refetchLayoutMetaData = true;
                        delete this.data.isModuleMetaDataEmpty;
                    } else if (promiseObj.moduleDetail.isExceptionOccured) {
                        this.setLayoutComponentError({ isExceptionOccured: true, primaryErrorMessage: 'Exception occured while trying to fetch Module meta data.Mandatory moduleData / moduleId / moduleApiName might be mismatched / incorrect. If newly created module given, refresh and check once.' });//no i18n
                    } else if (promiseObj.moduleDetail.failure) {
                        this.setLayoutComponentError({ errorDetails: promiseObj.moduleDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Module meta data request. Mandatory moduleData / moduleId / moduleApiName might be mismatched / incorrect. If newly created module given, refresh and check once.' });//no i18n
                    }
                } else {
                    this.setLayoutComponentError({ primaryErrorMessage: 'Mandatory moduleData / moduleId / moduleApiName for rendering create form is missing/incorrect. If newly created module given, refresh and check once.' });//no i18n
                }
            } else if (!this.isEmptyObj(layoutCompData.cxPropModuleData) && layoutCompData.cxPropModuleData.id &&
                (!layoutCompData.cxPropModuleId || !this.data.cxPropModuleId)) {
                this.data.cxPropModuleId = layoutCompData.cxPropModuleId = layoutCompData.cxPropModuleData.id;
            }
            //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
            if (this.isParallelRenderingDetected(currentRequestId)) { return; }
            if (this.data.isRecordDataEmpty && !this.isEmptyObj(layoutCompData.cxPropRecordData)) {
                if (['clone', 'edit'].includes(this.data.cxPropCurrentPage)) {
                    if (!(layoutCompData.cxPropRecordData instanceof Record)) {
                        let currentModelDetails = store.modelFor(layoutCompData.cxPropModuleId);
                        if (currentModelDetails && currentModelDetails.relations) {
                            let currentRelations = currentModelDetails.relations || {};
                            for (let relKey in currentRelations) {
                                if (currentRelations[relKey] && currentRelations[relKey].length) {
                                    currentRelations[relKey].forEach((relationObj) => {
                                        if (relationObj && relationObj.cusRelationFldType === "subform") {
                                            let subformRelationKey = relationObj.relKey;
                                            if (layoutCompData.cxPropRecordData &&
                                                layoutCompData.cxPropRecordData.hasOwnProperty(subformRelationKey) &&
                                                !Array.isArray(layoutCompData.cxPropRecordData[subformRelationKey])) {
                                                layoutCompData.cxPropRecordData[subformRelationKey] = [];
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        let newRec = store.pushPayload(layoutCompData.cxPropModuleId, layoutCompData.cxPropRecordData);
                        layoutCompData.cxPropRecordData = newRec;
                    }
                    if (layoutCompData.cxPropRecordData.id && (!layoutCompData.cxPropRecordId || !this.data.cxPropRecordId)) {
                        this.data.cxPropRecordId = layoutCompData.cxPropRecordId = layoutCompData.cxPropRecordData.id;
                    }
                }
                if (this.isEmptyObj(layoutCompData.cxPropFormData)) {
                    layoutCompData.cxPropFormData = layoutCompData.cxPropRecordData;
                }
                if (layoutCompData.cxPropFormData && layoutCompData.cxPropFormData.Layout && layoutCompData.cxPropFormData.Layout.id) {
                    layoutCompData.cxPropLayoutId = layoutCompData.cxPropFormData.Layout.id;
                }
                this.data.isRecordDataEmpty = false;
            }
            if (this.data.isRecordDataEmpty) {
                if (!layoutCompData.cxPropRecordId) {
                    this.setLayoutComponentError({ primaryErrorMessage: `Mandatory record id for rendering ${this.data.cxPropCurrentPage} page is missing/incorrect` });
                } else {
                    promiseObj.recordDataDetails = await this.fetchEntityRecordData(layoutCompData);
                    if (promiseObj.recordDataDetails && promiseObj.recordDataDetails.success) {
                        let successValue = promiseObj.recordDataDetails.success[0] || promiseObj.recordDataDetails.success;
                        if (successValue) {
                            layoutCompData.cxPropFormData = layoutCompData.cxPropRecordData = successValue;
                            delete this.data.isRecordDataEmpty;
                        }
                        if (this.isEmptyObj(successValue)) {
                            this.setLayoutComponentError({ primaryErrorMessage: 'Empty response received for GET Entity record request. Record id / module name might be mismatched / incorrect' });//no i18n
                        } else if (layoutCompData.cxPropFormData && layoutCompData.cxPropFormData.Layout && layoutCompData.cxPropFormData.Layout.id) {
                            layoutCompData.cxPropLayoutId = layoutCompData.cxPropFormData.Layout.id;
                        }
                    }
                }
            }
            //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
            if (this.isParallelRenderingDetected(currentRequestId)) { return; }
            if ((this.data.isSectionsMetaDataEmpty || this.data.refetchLayoutMetaData) && !this.isEmptyObj(layoutCompData.cxPropModuleData)) {
                promiseObj.layoutDetail = await this.fetchLayoutMetaData(layoutCompData, layoutCompData.cxPropLayoutId, layoutCompData.cxPropLayoutName);
                if (!promiseObj.layoutDetail) {
                    promiseObj.layoutDetail = {};
                }
                if (promiseObj.layoutDetail && promiseObj.layoutDetail.success && promiseObj.layoutDetail.success[0]) {
                    let layoutCacheResponse = promiseObj.layoutDetail.success[0] || {},
                        layoutResponse = layoutCacheResponse.layouts && layoutCacheResponse.layouts.filter((f) => { return f.id === promiseObj.layoutDetail.layoutId; })[0] || {},
                        currentLayoutSections = layoutResponse && layoutResponse.sections || [];
                    if (layoutResponse && layoutResponse.id && !layoutResponse.visible) {
                        this.setLayoutComponentError({ primaryErrorMessage: _cruxUtils.getI18n('crm.label.layoutpermis') });//no i18n
                    }
                    layoutCompData.cxPropLayoutSections = currentLayoutSections;
                    layoutCompData.cxPropLayoutData = layoutResponse;
                    layoutCompData.cxPropLayoutId = layoutResponse.id;
                    delete this.data.isSectionsMetaDataEmpty;
                    delete this.data.refetchLayoutMetaData;
                } else if (promiseObj.layoutDetail.isExceptionOccured) {
                    this.setLayoutComponentError({ isExceptionOccured: true, errorDetails: promiseObj.layoutDetail.layoutFetchException, primaryErrorMessage: 'Exception occured while trying to fetch Layout meta data. ' });//no i18n
                } else if (promiseObj.layoutDetail.failure) {
                    this.setLayoutComponentError({ errorDetails: promiseObj.layoutDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Layout meta data request. Layout / module information might be mismatched / incorrect' });//no i18n
                }
            }
            //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
            if (this.isParallelRenderingDetected(currentRequestId)) { return; }
            if (['create', 'clone'].indexOf(this.data.cxPropCurrentPage) !== -1 && (this.isEmptyObj(layoutCompData.cxPropFormData) ||
                !this.isEmptyObj(layoutCompData.cxPropRecordData))) {
                let recordObj = this.getRecordObjectFromRecordData({
                    originalRecordData: layoutCompData.cxPropRecordData,
                    moduleId: layoutCompData.cxPropModuleId
                });
                layoutCompData.cxPropFormData = store.createRecord(layoutCompData.cxPropModuleId, recordObj, true);
            }
            let currentEntityRecord = (layoutCompData.cxPropRecordData || this.data.cxPropRecordData) || {},
                currentModuleData = layoutCompData.cxPropModuleData || this.data.cxPropModuleData || {};
            this.checkForValidPermissons({
                recordDetail: currentEntityRecord,
                moduleDetail: currentModuleData,
                currentPage: this.data.cxPropCurrentPage
            });
            let rulesPromise = {};
            if (this.data.isLayoutRulesMetaDataEmpty) {
                rulesPromise.layoutRulesDetails = this.fetchLayoutRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
            }
            if (this.data.isValidationRulesMetaDataEmpty) {
                rulesPromise.validationRulesDetails = this.fetchValidationRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
            }
            let rulesPromiseResponse = await Lyte.resolvePromises(rulesPromise);
            if (rulesPromiseResponse.layoutRulesDetails && rulesPromiseResponse.layoutRulesDetails.success && rulesPromiseResponse.layoutRulesDetails.success.layout_rule) {
                layoutCompData.cxPropLayoutRules = rulesPromiseResponse.layoutRulesDetails.success.layout_rule;
                delete this.data.isLayoutRulesMetaDataEmpty;
            } else if (layoutCompData.cxPropLayoutRulesRequired) {
                delete this.data.isLayoutRulesMetaDataEmpty;
                Lyte.Component.set(layoutCompData, 'cxPropLayoutRulesRequired', false);
            }
            if (rulesPromiseResponse.validationRulesDetails && rulesPromiseResponse.validationRulesDetails.success && rulesPromiseResponse.validationRulesDetails.success.length) {
                layoutCompData.cxPropValidationRules = rulesPromiseResponse.validationRulesDetails.success;
                delete this.data.isValidationRulesMetaDataEmpty;
            } else if (layoutCompData.cxPropValidationRulesRequired) {
                delete this.data.isLayoutRulesMetaDataEmpty;
                Lyte.Component.set(layoutCompData, 'cxPropValidationRulesRequired', false);
            }
            layoutCompData.__isRequestInProgress = false;
            //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
            if (this.isParallelRenderingDetected(currentRequestId)) { return; }
            await this.actual_init();
            await this.actual_didConnect();
        } catch (error) {
            this.setLayoutComponentError({ errorDetails: error, isExceptionOccured: true });
        }
    },
    setLayoutComponentError: function (customData) {
        delete this._l__rendering__inprogress_flag;
        delete this._m__rendering__inprogress_flag;
        customData = customData || {};
        this.setDefautMessageDetails();
        let cxInternalObj = this.data.cxPropLayoutComponentData.cxInternalUtilityObj;
        Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
        let errDetails = (customData.errorDetails || {}), errMessageSecondary;
        if (customData.isExceptionOccured) {
            errMessageSecondary = errDetails.message;
        } else {
            errMessageSecondary = this.isEmptyObj(errDetails) ? '' : (errDetails.message || errDetails.statusText || '');
        }
        let finalError = `${customData.primaryErrorMessage || ''}
		
		${errMessageSecondary || ''}`;

        Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
        Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", finalError);//no i18n
        this.setData('showLoading', false);
    },
    setDefautMessageDetails: function () {
        if (!this.data) { return; }
        let layoutCompData = this.data.cxPropLayoutComponentData;
        if (!layoutCompData) {
            Lyte.objectUtils(this.data, "add", "cxPropLayoutComponentData", {});//No I18n
        }
        layoutCompData = this.data.cxPropLayoutComponentData;
        if (!layoutCompData.cxInternalUtilityObj) {
            Lyte.objectUtils(layoutCompData, "add", "cxInternalUtilityObj", {});//No I18n
        }
        if (!layoutCompData.cxInternalUtilityObj.commonMessageData) {
            Lyte.objectUtils(layoutCompData.cxInternalUtilityObj, "add", "commonMessageData", {});//No I18n
        }
    },
    isEmptyObj: function (obj) {
        try {
            var tempObj = null;
            if (!obj || obj === "null" || obj === "NULL" || obj === "empty" || obj === "EMPTY" || obj === "undefined" || obj === "UNDEFINED") { //No I18N
                return true;
            } else if (typeof obj !== "object" && typeof obj === "string") { //No I18N
                tempObj = obj.replace(/[ ]/g, "");
            } else if (typeof obj === "object") { //No I18N
                return Object.keys(obj).length < 1 ? true : false;
            }
            if (tempObj === "") {
                return true;
            }
            return false;
        }
        catch (e) {
            return true;
        }
    },
    getDefaultLayoutDetails: function (moduleData, profileName, cxPropLayoutId, cxPropLayoutName) {
        let currentProfileName = profileName || (typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.PROFILE_NAME) || "Administrator",//no i18n
            layDet = moduleData.layouts || [],
            currentLayoutName,
            currentLayoutId,
            layoutddValues = [],
            showIntegrationLayoutDD = false,
            module_name = moduleData.module_name;
        if (layDet && layDet.length) {
            layDet = Lyte.deepCopyObject(layDet);//ZCRM-118843
            layDet = layDet.sort((layout1, layout2) => {
                let name1 = layout1.name.toUpperCase(),
                    name2 = layout2.name.toUpperCase();
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
                return 0;
            });
        }
        let len = layDet && layDet.length || 0;
        for (var i = 0; i < len; i++) {
            if (layDet[i].status >= 0 || layDet[i].status === true || layDet[i].status === "active") {
                showIntegrationLayoutDD = module_name === "Campaigns" && layDet[i].status === "active" && layDet[i].source === "campaign_integration" ? true : showIntegrationLayoutDD;//no i18n
                let isValidLayout = false;
                if (layDet[i].profiles) {
                    var profL = layDet[i].profiles.length, isDefault = false;
                    for (var c = 0; c < profL; c++) {
                        if (currentProfileName === layDet[i].profiles[c].name) {
                            isValidLayout = true;
                            if (layDet[i].profiles[c].default) {
                                currentLayoutName = layDet[i].name;
                                currentLayoutId = layDet[i].id;
                                isDefault = true;
                                break;
                            }
                        }
                    }
                    if (isValidLayout) {
                        let layoutDetailsObj = {
                            uservalue: layDet[i].name,
                            systemvalue: layDet[i].id,
                            id: layDet[i].id,
                            isDefault: isDefault,
                            status: layDet[i].status,
                            source: layDet[i].source
                        };
                        layoutddValues.push(layoutDetailsObj);
                    }
                }
            }
        }
        if (cxPropLayoutId) {
            currentLayoutId = cxPropLayoutId;
            let currentLayoutDetails = layoutddValues.filter((option) => { return option.id === currentLayoutId; })[0];
            currentLayoutName = (currentLayoutDetails && currentLayoutDetails.uservalue) || currentLayoutName;
        }
        if (!cxPropLayoutId && cxPropLayoutName) {
            let layoutDetailsFromName = layoutddValues.filter((option) => { return option.uservalue === cxPropLayoutName; })[0];
            if (layoutDetailsFromName) {
                currentLayoutName = layoutDetailsFromName.uservalue || currentLayoutName;
                currentLayoutId = layoutDetailsFromName.id || currentLayoutId;
            } else {
                currentLayoutId = currentLayoutName = cxPropLayoutName;
            }
        }
        if (!currentLayoutId && layoutddValues && layoutddValues.length) { //when none of the layout is default layout for the profile
            if (module_name === "Campaigns") {
                let layoutToRender = layoutddValues.filter((lay) => { return lay.source === "crm"; })[0];
                layoutToRender = layoutToRender || layoutddValues[0];
                currentLayoutName = layoutToRender.name;
                currentLayoutId = layoutToRender.id;
                layoutToRender.isDefault = true;
            } else if (!cxPropLayoutName) {
                currentLayoutName = layoutddValues[0].uservalue;
                currentLayoutId = layoutddValues[0].id;
                layoutddValues[0].isDefault = true;
            }
        }
        return { layoutddValues, showIntegrationLayoutDD, currentLayoutName, currentLayoutId };
    },
    getLayoutDomNode: function () {
        return this.data.cxPropLayoutComponentData && this.data.cxPropLayoutComponentData.layoutComponentDomNode;
    },
    setFieldOfLookupData: function (customData) {
        customData = customData || {};
        let folDetails = customData.fieldOfLookupDetails || [],
            lookupRecord = customData.selectedLookupRecord || {},
            setDataObject = {};
        //originalValues;
        if (this.isEmptyObj(lookupRecord)) {
            return;
        }
        /*
        if (lookupRecord && lookupRecord._$ && lookupRecord._$.original) {
            originalValues = lookupRecord._$.original;
        }
        originalValues = originalValues || {};
        */
        folDetails.forEach((details) => {
            let { currentFormField, lookupModuleMapField } = details,
                fieldValue = lookupRecord[lookupModuleMapField.api_name];
            /*
            if(originalValues.hasOwnProperty(lookupModuleMapField.api_name)){
                fieldValue = originalValues[lookupModuleMapField.api_name];
            }
            */
            setDataObject[currentFormField] = fieldValue;
        });
        setDataObject = setDataObject || {};
        if (customData.layoutComponentDomNode) {
            customData.layoutComponentDomNode.setFormData({ cruxFormData: setDataObject });
        }
    },
    setSaveResponseInMessage: function (detailsObj, layoutCompData, getMsgAlone) {
        if (detailsObj && detailsObj.saveResponse) {
            let utilityObj = layoutCompData.cxInternalUtilityObj;
            this.setDefautMessageDetails();
            let recordActionType = "", recordStateType = "";
            switch (utilityObj.currentPage) {
                case 'edit':
                    recordActionType = "updated"; recordStateType = "Updated record";
                    break;
                case 'clone':
                    recordActionType = "cloned"; recordStateType = "Newly cloned record";
                    break;
                default:
                    recordActionType = "created"; recordStateType = "Newly created record";
            }
            try {
                let moduleInfo = layoutCompData.cxPropModuleData || {}, formData = layoutCompData.cxPropFormData || {};
                let moduleLabel = moduleInfo.singular_label || "Entity Record",//no i18n
                    recordName = "";
                let displayField = moduleInfo.display_field && moduleInfo.display_field.api_name;
                if (displayField && formData[displayField]) {
                    recordName = formData[displayField];
                }
                if (!recordName && moduleInfo.module_name && ["Leads", "Contacts"].includes(moduleInfo.module_name)) {
                    let format = typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.NAME_FORMAT || "",
                        nameFormatArr = format.split(",") || [];
                    if (nameFormatArr.length) {
                        nameFormatArr.forEach((namePart) => {
                            if (!namePart) { return; }
                            namePart = namePart.trim();
                            if (namePart === "Salutation" && formData.Salutation) {
                                recordName += `${formData.Salutation} `;
                            } else if (namePart === "First Name" && formData.First_Name) {
                                recordName += `${formData.First_Name} `;
                            }
                            else if (namePart === "Last Name" && formData.Last_Name) {
                                recordName += `${formData.Last_Name}`;
                            }
                        });
                    }
                }
                let successMessageInfo = {};
                successMessageInfo.headerMessage = `${moduleLabel} ${recordActionType} successfully`;
                successMessageInfo.recordName = recordName || "";
                successMessageInfo.recordId = detailsObj.saveResponse && detailsObj.saveResponse.id;
                successMessageInfo.moduleName = moduleInfo.module_name || "";
                Lyte.objectUtils(utilityObj.commonMessageData, "add", "successMessageInfo", successMessageInfo);//No I18n
                Lyte.objectUtils(utilityObj.commonMessageData, "add", "isSuccessMessage", true);//No I18n
            } catch (e) {
                utilityObj.commonMessageData.isExceptionOccured = true;
            }
            let msgInfo = utilityObj.commonMessageData.successMessageInfo || {};
            let msg = `${msgInfo.headerMessage}. ${msgInfo.recordName || msgInfo.recordId}`;
            if (getMsgAlone) {
                return msg;
            }
            Lyte.objectUtils(utilityObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
            Lyte.objectUtils(utilityObj.commonMessageData, "add", "message", msg);//No I18n
            Lyte.objectUtils(utilityObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeSuccess');//No I18n
        }
    },
    showHideLoadingDiv: function (show) {
        if (typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv) {
            commonUtils.showHideLoadingDiv(show);
        }
    },
    serializeFormDataBeforeSave: function (formData, formFieldList) {
        if (formData && (!formData.$ || !formData.$.model)) {
            for (var fieldKey in formData) {
                let fieldList = formFieldList[fieldKey], fieldValue = formData[fieldKey];
                if (fieldList && fieldList.fieldDataType === "multiselectpicklist" &&
                    fieldList.json_type === "jsonarray" && fieldValue && typeof fieldValue === "string") {
                    try {
                        formData[fieldKey] = JSON.parse(fieldValue);
                    } catch (exe) {
                        formData[fieldKey] = fieldValue;
                    }
                }
            }
        }
        return formData;
    },
    onFormAfterSave: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    },
    onFormCancel: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    },
    getCurrentLookupNode: function (customData = {}) {
        let { cruxLookupElmId, fromSubform, currentFieldNode } = customData,
            qSel = `${fromSubform ? `#${cruxLookupElmId}` : 'crux-lookup-component'}`,
            nodeElem = currentFieldNode ? currentFieldNode : this.$node;
        return nodeElem.querySelector(qSel);
    },
    showLookupModal: function (customData = {}) {
        let lookupNode = this.getCurrentLookupNode(customData);
        if (lookupNode) {
            lookupNode.showLookup();
        }
    },
    hideLookupDropdown: function (customData = {}) {
        let { cruxLookupElmId, fromSubform, currentFieldNode } = customData;
        let qSel = `${fromSubform ? `#${cruxLookupElmId}` : 'crux-lookup-component'} lyte-autocomplete lyte-dropdown`,//no i18n
            nodeElem = currentFieldNode ? currentFieldNode : this.$node,
            ddNode = nodeElem.querySelector(qSel);
        if (ddNode) {
            ddNode.close();
        }
    },
    hideLookupModal: function (customData = {}) {
        let lookupNode = this.getCurrentLookupNode(customData);
        if (lookupNode) {
            lookupNode.close();
        }
    },
    lookupCallBackHandler: function (dataObj = {}, subformData = {}) {
        let currentButtonObj = dataObj.currentButtonObj,
            fieldMeta = subformData.cxPropFieldData || this.data.cxPropFieldData,
            newRecordDetails = dataObj.quickCreatedRecord;
        if (["cancel", "save"].includes(currentButtonObj.name) && (this.quickCreateFromModal || currentButtonObj.name === "save")) {
            this.showLookupModal(subformData);
        } else if (currentButtonObj.name === "saveandassociate" && newRecordDetails) {
            let layoutCompData = this.data.cxPropLayoutComponentData,
                lookupModuleId = fieldMeta.lookup.module.id,
                currentApiname = fieldMeta.api_name,
                lookupModuleInfo = layoutCompData.cxInternalUtilityObj.lookupModuleMetaInfo,
                fieldValue = { id: newRecordDetails.id };

            if (lookupModuleInfo[lookupModuleId] && lookupModuleInfo[lookupModuleId].display_field) {
                fieldValue.name = newRecordDetails[lookupModuleInfo[lookupModuleId].display_field.api_name];
            }
            if (subformData && subformData.fromSubform && subformData.recordObj) {
                Lyte.Component.set(subformData.recordObj, currentApiname, fieldValue);
            } else {
                let formDataObj = { cruxFormData: {} };
                formDataObj.cruxFormData[currentApiname] = fieldValue;
                if (layoutCompData.layoutComponentDomNode) {
                    layoutCompData.layoutComponentDomNode.setFormData(formDataObj);
                }
            }
        }
    },
    getModuleIdFromModuleApiname: function (dataObj = {}) {
        let { moduleApiname } = dataObj, moduleApiMap = typeof moduleApiMapping !== 'undefined' ? moduleApiMapping : {},
            moduleApiEntries = Object.entries(moduleApiMap),
            moduleApiEntriesLen = moduleApiEntries && moduleApiEntries.length,
            actualModuleName, returnObj = {};
        for (let m = 0; m < moduleApiEntriesLen; m++) {
            let currentModuleDetails = moduleApiEntries[m];
            if (currentModuleDetails && currentModuleDetails[0] && currentModuleDetails[1]) {
                let currentModuleName = currentModuleDetails[0],
                    currentModuleApiName = currentModuleDetails[1];
                if (currentModuleApiName === moduleApiname) {
                    actualModuleName = currentModuleName;
                    break;
                }
            }
        }
        if (actualModuleName && typeof moduleRecordMapping !== 'undefined' && moduleRecordMapping[actualModuleName] && moduleRecordMapping[actualModuleName].id) {
            returnObj.moduleId = moduleRecordMapping[actualModuleName].id;
            returnObj.moduleName = actualModuleName;
            returnObj.moduleApiname = moduleApiname;
        }
        return returnObj;
    },
    checkCruxCreateFormSupport: function (moduleName = "", currentPage) {
        let financeModules = ["CustomModule5001", "CustomModule5002", "CustomModule5003", "CustomModule5004", "CustomModule5005", "CustomModule5006", "CustomModule5007", "CustomModule5008", "CustomModule5009", "CustomModule5010"],//no i18n
            cruxCreateFormSupported = false,
            cruxCreateFormInitialModules = ["Leads", "Contacts", "Accounts", "Potentials", "Deals", "Products", "Solutions", "Vendors", "Cases"];//no i18n
        if ((cruxCreateFormInitialModules.includes(moduleName) ||
            (moduleName.indexOf("CustomModule") > -1 && !financeModules.includes(moduleName)) || moduleName.indexOf("LinkingModule") > -1)) {
            cruxCreateFormSupported = true;
        }
        //if(module.quick_create && (module.module_name !== "Activities") && !((module.visibility & 2)||(module.visibility & 4)) && !(module.access_type === 'team_based' && module.private_profile && module.private_profile.name === 'Requesters')) {%>
        let moduleRecMapping = typeof moduleRecordMapping !== 'undefined' ? moduleRecordMapping : {};
        if (moduleRecMapping[moduleName]) {
            let moduleInfo = moduleRecMapping[moduleName];
            if (!(
                !((moduleInfo.visibility & 2) || (moduleInfo.visibility & 4)) &&
                !(moduleInfo.access_type === 'team_based' && moduleInfo.private_profile && moduleInfo.private_profile.name === 'Requesters')
            ) ||
                (currentPage !== 'edit' && !moduleInfo.quick_create)
            ) {
                cruxCreateFormSupported = false;
            }
        }
        return cruxCreateFormSupported;
    },
    getCurrencyData: function (currencyKey, recordData) {
        let fullCurrencyDetails = {},
            userDetails = typeof Crm !== "undefined" && Crm.userDetails || {},
            finalCurrencyKey;
        if (recordData && recordData.Currency) {
            finalCurrencyKey = recordData.Currency;
        } else {
            let storeScope = window.store || store;
            if (storeScope && storeScope.peekRecord) {
                let usrRecord = storeScope.peekRecord('user', userDetails.USER_ID);//no i18n
                finalCurrencyKey = usrRecord ? usrRecord.Currency : undefined;
            }
        }
        finalCurrencyKey = currencyKey ? currencyKey : finalCurrencyKey;
        let currCurrencySymbol = finalCurrencyKey ? finalCurrencyKey :
            (userDetails.IS_MULTI_CURRENCY_ENABLED ? (userDetails.PREFERRED_CURRENCY || userDetails.BASE_CURRENCY || "") :
                (userDetails.defaultOrgCurrency || userDetails.BASE_CURRENCY || "")
            );
        fullCurrencyDetails.currentCurrency = currCurrencySymbol;
        fullCurrencyDetails.currencyDetails = userDetails.CURRENCY_DETAILS;
        let finalCurrencyData = {};
        if (this.isEmptyObj(fullCurrencyDetails.currencyDetails)) {
            if (currCurrencySymbol && typeof currCurrencySymbol === "string") { //no i18n
                finalCurrencyData.symbol = currCurrencySymbol;
            } else {
                finalCurrencyData = currCurrencySymbol;
            }
        }
        for (let key in fullCurrencyDetails.currencyDetails) {
            if (key === fullCurrencyDetails.currentCurrency || (fullCurrencyDetails.currencyDetails[key] && fullCurrencyDetails.currencyDetails[key].symbol === fullCurrencyDetails.currentCurrency)) {
                finalCurrencyData = fullCurrencyDetails.currencyDetails[key];
                finalCurrencyData.key = key;
                break;
            }
        }
        let currencyExchangeRate = finalCurrencyData ?
            (finalCurrencyData.er && finalCurrencyData.decimals ?
                Number(finalCurrencyData.er).toFixed(finalCurrencyData.decimals) :
                finalCurrencyData.er) : "";

        if (finalCurrencyData && currencyExchangeRate) {
            finalCurrencyData.updatedER = currencyExchangeRate;
        }
        if (!finalCurrencyData || !Object.keys(finalCurrencyData).length) {
            finalCurrencyData = finalCurrencyData || {};
            finalCurrencyData.symbol = currCurrencySymbol;
        }
        if (finalCurrencyData) {
            finalCurrencyData = Lyte.deepCopyObject(finalCurrencyData);
        }
        let currentERValue = recordData && recordData.__currencyERValues || {};
        if (currentERValue && currentERValue !== "" && currentERValue.Currency === finalCurrencyData.key && currentERValue.Exchange_rate !== finalCurrencyData.er) {
            finalCurrencyData.er = currentERValue.Exchange_rate;
        }
        return finalCurrencyData;
    },
    filterValidUITypesInRecord: function (dataObject) {
        let { currentPage, currentInstObjKey, fieldIdVsMetaObject, subFormFieldIdVsMetaObject, isVR, recordObj, source, currentSections } = dataObject,
            _fldList = store.modelFor(recordObj.$.model._name).fieldList,
            userDetails = typeof Crm !== "undefined" && Crm.userDetails || {},//no i18n
            finalObj = {},
            is_semodule = false,
            subFinalObj = {},
            isFromSubfrom = false,
            isValidSubRow = false,
            dataObj = recordObj.$.toJSON(),
            _keys = Object.keys(_fldList),
            _klen = _keys.length,
            preventedKeys = ['$approved', '$state', '$transitionid', 'Data_Source'];//no i18n

        currentPage = currentPage === 'edit' ? 'edit' : 'create';//no i18n

        if (currentPage !== 'edit') {
            preventedKeys.push('id');//no i18n
        }


        function getValBasedOnUIType(valStr, uiTp, apiName) {
            switch (uiTp) {
                //Not allowed ui types.
                case 3: case 8: case 116: case 117: case 123: case 200: case 208: case 209: case 221: case 444:
                case 20: case 39: case 51: case 55: case 77: case 96: case 99: case 100: case 110: case 111:
                case 556: case 445: case 66: case 555: case 111: case 250:
                    return "";
                //allowed UI types
                case 4: case 5: case 6: case 7: case 9: case 10: case 12: case 13: case 15: case 133:
                case 132: case 135: case 136:
                    if (userDetails.VALIDATION_RULE_CF_LOOKUPSUPPORT || userDetails.ValidationAlertPreference) {
                        if (valStr) {
                            if (apiName === "What_Id") {
                                is_semodule = true;
                            }
                            return valStr;
                        }
                        return "";
                    }
                    return "";
                case 24:
                case 202:
                    if (!valStr) { return ""; }
                    return Lyte.Transform.date.serialize(valStr);
                case 14:
                case 30:
                case 333:
                case 786:
                    if (!valStr) { return ""; }
                    var dateInAPIformat = Lyte.Transform.datetime.serialize(valStr);
                    if (userDetails.TIME_ZONE) { dateInAPIformat += userDetails.replace('.', ':'); }
                    return dateInAPIformat;
                case 300:
                case 301: return (valStr === "true" || valStr === "1" || valStr === true) + "";
                case 33: return valStr ? commonUtils.getPlainPhoneNo(valStr) : "";
                case 2: return valStr === "-None-" ? "" : valStr;
                default:
                    return valStr === undefined || valStr === "" || valStr === null ? "" : (typeof valStr === "string" ? valStr.trim() : valStr + "");//eslint-disable-line @zoho/zstandard/no-duplicate-null-check
            }
        };

        for (let k1 = 0; k1 < _klen; k1++) {
            if (_fldList[_keys[k1]] && _fldList[_keys[k1]].fieldID && !["QUOTENUMBER", "SONUMBER", "INVOICENUMBER", "WIZARDID", "LAYOUTID", "TAGMODULEREFID", "LASTACTIVITYTIME", "EXCHANGERATE"].includes(_fldList[_keys[k1]].columnName) && _fldList[_keys[k1]].type !== "relation"
                && !preventedKeys.includes(_keys[k1]) && (_fldList[_keys[k1]].fieldType !== "picklist" || (_fldList[_keys[k1]].fieldType === "picklist" && (dataObj[_keys[k1]] !== '-None-' || isVR)))) {
                let curntFld = fieldIdVsMetaObject[_fldList[_keys[k1]].fieldID];
                if (curntFld && curntFld[currentInstObjKey] && curntFld[currentInstObjKey].visible && (curntFld[currentInstObjKey].view_type[currentPage] || source === 'quickCreate')) {
                    let val = getValBasedOnUIType(dataObj[_keys[k1]], _fldList[_keys[k1]].uiType, _keys[k1]);
                    if (curntFld.subform_api && !(curntFld.subform)) {
                        isFromSubfrom = true;
                        subFinalObj[_keys[k1]] = val;
                        if ((!isValidSubRow &&
                            _fldList[_keys[k1]].fieldID && _fldList[_keys[k1]].columnName !== "SERIAL_NUMBER" && //no i18n
                            _fldList[_keys[k1]].fieldType !== "formula" && _fldList[_keys[k1]].fieldType !== "fileupload") && //no i18n
                            ((val && _fldList[_keys[k1]].fieldType !== "picklist" && _fldList[_keys[k1]].fieldType !== "fileupload" && _fldList[_keys[k1]].fieldType !== "boolean") || //no i18n
                                (val && _fldList[_keys[k1]].fieldType === "picklist" && val !== '-None-') || (_fldList[_keys[k1]].fieldType === "boolean" && val !== "false"))) { //no i18n
                            isValidSubRow = true;
                        }
                    }
                    else {
                        finalObj[_keys[k1]] = val;
                    }
                }
            } else if (recordObj[_keys[k1]] && _fldList[_keys[k1]].cusRelationFldType && _fldList[_keys[k1]].cusRelationFldType === "subform" && source !== "customButtons" && userDetails.ValidationRuleSupportInSubform) {
                let isValidSection = false,
                    layoutSections = currentSections || [],
                    subform_api_name, layoutSectionsLength = layoutSections.length;
                for (let jj = 0; jj < layoutSectionsLength; jj++) {
                    let sectionInstanceObj = layoutSections[jj][currentInstObjKey] || {};
                    subform_api_name = sectionInstanceObj.subform_apiname;
                    if (subform_api_name === _keys[k1]) {
                        isValidSection = sectionInstanceObj.isvalidSection;
                    }
                }
                let rec1, subformDetails = recordObj[_keys[k1]] || [], subformRecLen = subformDetails.length, subRowObj = [];
                if (isValidSection) {
                    for (let ii = 0; ii < subformRecLen; ii++) {
                        let subformDataObj = {
                            currentPage,
                            currentInstObjKey,
                            fieldIdVsMetaObject: subFormFieldIdVsMetaObject[_keys[k1]] || {},
                            isVR,
                            recordObj: subformDetails[ii],
                            source
                        };
                        rec1 = this.filterValidUITypesInRecord(subformDataObj);
                        let recLen = Object.keys(rec1).length;
                        if (recLen > 0) {
                            subRowObj[ii] = rec1;
                        }
                    }
                }
                finalObj[_keys[k1]] = subRowObj;
            }
            if (isValidSubRow && k1 === (_klen - 1)) {
                finalObj = subFinalObj;
            }
        }
        if (is_semodule) {
            finalObj.$se_module = recordObj.$se_module;
        }
        if (!preventedKeys.includes('id') && recordObj.id) { //no i18n
            if (isFromSubfrom && isValidSubRow) {
                finalObj.id = recordObj.id;
            }
            else {
                finalObj.id = recordObj.id;
            }
        }

        return finalObj;
    },
    parseAndHandleVRFunctionResponse: function (vrFunctionsObject = {}, layoutComponentData) {
        let { moduleName, vrErrorArray, dontFocus, functionFieldDetails } = vrFunctionsObject;
        let functionsResponse = vrFunctionsObject.serverResponse && vrFunctionsObject.serverResponse.success && vrFunctionsObject.serverResponse.success.functions || [],
            returnObj = {};
        let primaryFieldObj = {}, fieldsvsError = {},
            valAlertPref = layoutComponentData && layoutComponentData.isVRAlertPreference !== undefined && layoutComponentData.isVRAlertPreference,
            fromVR,
            frompopup,
            internalError = false;
        returnObj = {
            verifyText: '',
            verifyButton: '',
            verifyDisabled: false
        };
        try {
            let fieldsCount = functionsResponse.length;
            for (let i = 0; i < fieldsCount; i++) {
                let func_result = functionsResponse[i];
                if (func_result.status === 'success' && func_result.details) {
                    var output = (typeof func_result.details.output === "string") ? JSON.parse(func_result.details.output.replace(/'/g, '"')) : func_result.details.output;//NO I18N
                    if (!output.status) {
                        internalError = true;
                        break;
                    } else if (output.status !== "success") {
                        if (valAlertPref) {
                            vrErrorArray.push({
                                message: output.message.substring(0, 100),
                                targetField: functionFieldDetails[i].api_name,
                                targetFieldId: functionFieldDetails[i]._targetFieldid,
                                alert_preference: "on_primary_field",//NO I18N
                                alert_type: "stop_saving_records"//NO I18N
                            });
                            returnObj.vrPassed = true;
                        }
                        else {
                            if (output.message) {
                                vrErrorArray.push({
                                    message: output.message.substring(0, 100),
                                    targetField: functionFieldDetails[i].api_name,
                                    targetFieldId: functionFieldDetails[i]._targetFieldid
                                });
                            } else if (!dontFocus) {
                                returnObj.vrPassed = true;
                                commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(output.message.substring(0, 100)), primaryFieldObj, moduleName, frompopup, fromVR, (primaryFieldObj.attr('type') === "checkbox"));//NO i18N
                            }
                        }
                    } else {
                        returnObj.verifyText = 'verified';
                    }
                } else if (func_result.code === "INTERNAL_ERROR" || func_result.code === "INVALID_DATA") { //no i18n
                    internalError = true;
                    break;
                }
            }
        } catch (e) {
            internalError = true;
        }
        try {
            if (dontFocus) {
                return returnObj;
            } else if (internalError) {
                returnObj.vrPassed = true;
                $('#newRelatedListPopUpDiv').css('z-index', '100002').html('<div class="crm-heading-font-size p30  alignLeft"><div class="crm-font-bold crm-heading-font-size">' + I18n.getMsg('crm.validation.rule.function.error.heading') + '</div><div class="crm-subheading-font-size mB10 mT10 crm-font-regular">' + I18n.getMsg('crm.validation.rule.function.error.title') + '</div><ul class="m0 bottom0 cutomfunctionalert"><li>' + I18n.getMsg('crm.validation.rule.function.error1') + '</li><li>' + I18n.getMsg('crm.validation.rule.function.error2') + '</li></ul> <br><div class="aligncenter"><input type="button" id="custom_alert_button" class="primarybtn" value="' + I18n.getMsg('crm.mb.newversion.msg4') + '" onclick="crmui.hidePopup(\'newRelatedListPopUpDiv\')"></div></div>', null, true);//NO i18N
                crmui.showPopup('newRelatedListPopUpDiv');//NO I18N
                $('#FreezeLayer').css('z-index', '30');//eslint-disable-line @zoho/zohocrm/no-freezeLayer
            } else if (!this.isEmptyObj(fieldsvsError) && !internalError) {
                returnObj.vrPassed = true;
                $('#newRelatedListPopUpDiv').removeClass('w860').css('width', '30%').html(Handlebars.templates.validationRuleError(fieldsvsError));
                crmui.showPopup('newRelatedListPopUpDiv'); //NO I18N
            }
        } catch (e) {
            returnObj.internalErrorException = true;
        }
        return returnObj;
    },
    getWidgetComponentDataForRequestHeader: function () {
        try {
            if (!_cruxUtils.isLyteWidgetBuild) {
                return;
            }
            let rootNode = this.$node.getRootNode();
            if (rootNode && rootNode instanceof ShadowRoot) {
                let hostComponent = rootNode.host;
                if (hostComponent && hostComponent._target) {
                    let parentRootNode = hostComponent._target.getRootNode();
                    if (parentRootNode && parentRootNode instanceof ShadowRoot) {
                        let parentHostComponent = parentRootNode.host;
                        if (parentHostComponent && /lyte-yield/i.test(parentHostComponent.tagName)) {
                            let widgetComponentNode = (parentHostComponent._callee || parentHostComponent.parentElement);
                            if (widgetComponentNode && /lyte-widget/i.test(widgetComponentNode.tagName) && widgetComponentNode.component) {
                                return {
                                    widgetComponentName: widgetComponentNode.component.data.baseComponent
                                };
                            }
                        }
                    }
                }
            }
        } catch (exe) {
            if (murphy) {
                murphy.error(exe);
            }
        }
    },
    getUnsupportFieldsList: function (type, pageType = "create") {
        let returnArr = [];
        switch (type) {
            case 'columnsToSkip':
                if (pageType === 'create') {
                    returnArr = ["QUOTENUMBER", "SONUMBER", "INVOICENUMBER",
                        "SALUTATION", "PARENT_CAMPAIGNID", "CONSENTID",
                        "FIRSTFOLLOWEDUPTIME", "LASTFOLLOWEDUPBY", "LASTFOLLOWEDUPTIME",
                        "FOLLOWUPCOUNT", "S_MODIFIEDTIME", "SERVICESTATUS",
                        "UNAVAILABLE_TILL", "UNAVAILABLE_FROM", "JOBSHEETSECTION"
                    ];
                }
                break;
            case 'apiNamesToSkip':
                if (pageType === 'create') {
                    returnArr = ["Native__Survey__Extn__Department_ID", "Native__Survey__Extn__Survey_URL",
                        "Native__Backstage__Extn__Backstage_Portal", "Native__Backstage__Extn__Event_Location",
                        "Native__Webinar__Extn__Webinar_Launch_URL", "Native__Webinar__Extn__Webinar_Registration_URL",
                        "Last_Visited_Time", "First_Visited_URL", "Average_Time_Spent_Minutes", "Number_Of_Chats",
                        "Referrer", "Visitor_Score", "First_Visited_Time", "Days_Visited"];
                }
                break;
            case 'uiTypeToSkip':
                if (pageType === 'create') {
                    returnArr = [135, 207, 500];//ZCRM-683563
                }
                break;
        }
        return returnArr;
    },
    getDefaultUserDetail: function (crmUserDetails) {
        let storeScope = (_cruxUtils.isLyteWidgetBuild && window.store) || store,
            userDataDetails = {};
        if (storeScope && crmUserDetails) {
            let userRecord = storeScope.peekRecord('user', crmUserDetails.USER_ID);
            if (userRecord && userRecord.id) {
                userDataDetails.id = crmUserDetails.USER_ID;
                userDataDetails.name = userRecord.full_name;
            }
        }
        return userDataDetails;
    },
    handleFormFailureResponse: function (failureResponse, layoutComponentData) {
        let errorDetails = failureResponse && failureResponse.errorDetails || {};
        switch (errorDetails.code) {
            case 'DUPLICATE_LINKING_DATA': {
                let duplicateErrorDetails = {};
                if (errorDetails.details && errorDetails.details.id) {
                    duplicateErrorDetails.existingEntityId = errorDetails.details.id;
                }
                let moduleName = layoutComponentData.cxPropModuleName ||
                    (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name) || "",
                    moduleId = layoutComponentData.cxPropModuleId ||
                        (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.id) || "";
                if (moduleName) {
                    duplicateErrorDetails.moduleName = moduleName;
                }
                if (moduleId) {
                    duplicateErrorDetails.moduleId = moduleId;
                }
                this.handleDuplicateLinkingData(duplicateErrorDetails);
                break;
            }
            case 'DUPLICATE_DATA': {
                let moduleData = layoutComponentData.cxPropModuleData || {},
                    fieldMeta = failureResponse && failureResponse.fieldMeta;
                let duplicateErrDetails = this.getDuplicateErrorDetails({ moduleData, errorDetails, fieldMeta }) || {},
                    renderErrorYieldUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.renderErrorYield;
                if (renderErrorYieldUtil) {
                    renderErrorYieldUtil({
                        fieldApiName: fieldMeta.api_name,
                        yieldDataObject: {
                            errorDetails: {
                                type: 'duplicateError',
                                errorMesage: duplicateErrDetails.message,
                                duplicateErrorDetails: duplicateErrDetails
                            }
                        }
                    });
                }
                break;
            }
            case 'MULTIPLE_OR_MULTI_ERRORS': {
                let errorDetails = failureResponse && failureResponse.errorDetails || {},
                    allFieldErrors = errorDetails.details && errorDetails.details.errors || [];
                if (allFieldErrors && allFieldErrors.length) {
                    allFieldErrors.forEach((fieldError) => {
                        let moduleData = layoutComponentData.cxPropModuleData || {},
                            curentFieldKey = fieldError && fieldError.details && fieldError.details.api_name,
                            fieldApiVsMetaObject = failureResponse && failureResponse.fieldApiVsMetaObject || {};
                        fieldMeta = fieldApiVsMetaObject[curentFieldKey] || {};
                        let duplicateErrDetails = this.getDuplicateErrorDetails({ moduleData, errorDetails: fieldError, fieldMeta }) || {},
                            renderErrorYieldUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.renderErrorYield;
                        if (renderErrorYieldUtil) {
                            renderErrorYieldUtil({
                                fieldApiName: fieldMeta.api_name,
                                yieldDataObject: {
                                    errorDetails: {
                                        type: 'duplicateError',
                                        errorMesage: duplicateErrDetails.message,
                                        duplicateErrorDetails: duplicateErrDetails
                                    }
                                }
                            });
                        }
                    });
                }
                break;
            }
        }
    },
    getDuplicateErrorDetails: function (dataObject) {
        let { errorDetails, moduleData, fieldMeta } = dataObject,
            duplicateErrDetails = {},
            displayLabel = fieldMeta && typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(fieldMeta.field_label) : fieldMeta.field_label;//No I18N
        fieldMeta = fieldMeta || {};
        if (errorDetails.details && errorDetails.details.more_records && Crm.userDetails.permissions['Crm_Implied_Merge_' + moduleData.module_name]) {
            duplicateErrDetails.message = _cruxUtils.getI18n("crm.duplicate.value.not.allowed") + ' ' + _cruxUtils.getI18n('crm.duplicate.value.available.multiple', moduleData.singular_label.toLowerCase(), displayLabel);//no i18n
            duplicateErrDetails.more_records = true;
        } else {
            duplicateErrDetails.message = _cruxUtils.getI18n("crm.duplicate.value.not.allowed") + ' ' + _cruxUtils.getI18n("crm.duplicate.value.available", moduleData.singular_label.toLowerCase(), displayLabel);//no i18n
        }
        duplicateErrDetails.duplicateFdetails = {};
        duplicateErrDetails.duplicateFdetails.id = errorDetails.details && errorDetails.details.duplicate_record ? errorDetails.details.duplicate_record.id : undefined;
        duplicateErrDetails.duplicateFdetails.key = errorDetails.details.api_name;
        duplicateErrDetails.duplicateFdetails.dupFieldLabel = displayLabel;
        duplicateErrDetails.duplicateFdetails.dupColName = fieldMeta.column_name;
        duplicateErrDetails.duplicateFdetails.modLabel = moduleData.singular_label;
        duplicateErrDetails.duplicateFdetails.moduleName = moduleData.module_name;
        duplicateErrDetails.duplicateFdetails.modPluLabel = moduleData.plural_label;
        duplicateErrDetails.duplicateFdetails.detailsFromserver = errorDetails.details;
        duplicateErrDetails.duplicateFdetails.isFieldEnc = fieldMeta.crypt !== null;
        return duplicateErrDetails;
    },
    handleDuplicateLinkingData: async function (duplicateErrorDetails) {
        if (duplicateErrorDetails && duplicateErrorDetails.existingEntityId && duplicateErrorDetails.moduleId) {
            let recordDataDetails = await this.fetchEntityRecordData({
                cxPropRecordId: duplicateErrorDetails.existingEntityId,
                cxPropModuleId: duplicateErrorDetails.moduleId
            });
            if (recordDataDetails && recordDataDetails.success) {
                let exisitingRecordInfo = recordDataDetails.success[0] || recordDataDetails.success;
                if (exisitingRecordInfo) {
                    /*
                    let duplicateLinkingMessage = _cruxUtils.getI18n("crm.linking.module.duplicate.warning",
                        duplicateErrorDetails.moduleName,
                        duplicateErrorDetails.existingEntityId,
                        exisitingRecordInfo.Name,
                        
                    );
                    */
                    let duplicateLinkingMessage = I18n.getMsg("crm.linking.module.duplicate.warning",
                        [
                            duplicateErrorDetails.moduleName,
                            duplicateErrorDetails.existingEntityId,
                            exisitingRecordInfo.Name,
                            typeof Crm !== 'undefined' && Crm.getCrmBasePath() //eslint-disable-line valid-typeof
                        ]);
                    if (typeof renderingUtils !== 'undefined') { //eslint-disable-line valid-typeof
                        renderingUtils.showCustomAlert(duplicateLinkingMessage, "", true);
                    }
                    /*
                    _cruxUtils.showCustomAlert({
                        params: {
                            cxPropYield: true,
                            cxPropHeading: duplicateLinkingMessage,
                            cxPropButtonPosition : 'center', //No I18n
                            cxPropContentAlign: 'center', //No I18n
                            cxPropButtons: [
                                {
                                    "type": "accept",
                                    "text": _cruxUtils.getI18n("crm.nsocial.onboard.got.it"),
                                    "appearance": "primary",
                                    "position": 'center'
                                }
                            ]
                        }
                    });
                    */
                }
            }
        }
    },
    handleFormAfterRender: function (dataObj, layoutComponentData) {
        let { cxPropCurrentPage, cxPropModuleData, cxPropFormData } = layoutComponentData;
        //Deals : Stage -> Probability Handling
        let allFieldMetaDetails = dataObj && dataObj.allFieldMetaDetails || {};
        if (cxPropCurrentPage === 'create' && cxPropModuleData && ['Potentials', 'Deals'].includes(cxPropModuleData.module_name) &&
            cxPropFormData.hasOwnProperty('Stage') && !cxPropFormData.hasOwnProperty('Probability')) {
            this.setProbabilityValueInRecord(dataObj, layoutComponentData);
        }
        if (cxPropModuleData && cxPropModuleData.module_name === 'Contacts') {
            this.handleReportingToField(layoutComponentData, allFieldMetaDetails);
        }
    },
    handleReportingToField: function (layoutComponentData, allFieldMetaDetails) {
        let formUiHandlerUtil, setFormDataUtil, setFormConfigurationsUtil;
        if (layoutComponentData.layoutComponentDomNode) {
            formUiHandlerUtil = layoutComponentData.layoutComponentDomNode.formUiHandler;
            setFormDataUtil = layoutComponentData.layoutComponentDomNode.setFormData;
            setFormConfigurationsUtil = layoutComponentData.layoutComponentDomNode.setFormConfigurations;
        }
        let { cxPropFormData } = layoutComponentData;
        let fieldApiVsMetaObject = allFieldMetaDetails.fieldApiVsMetaObject || {};
        let reportingToField = fieldApiVsMetaObject.Reporting_To || undefined;
        let disableReportingTo = !(cxPropFormData && cxPropFormData.Account_Name && cxPropFormData.Account_Name.id);
        let accNameField = fieldApiVsMetaObject.Account_Name || undefined;
        if (formUiHandlerUtil && reportingToField && accNameField) {
            formUiHandlerUtil({
                component_type: 'field',
                component_details: {
                    type: 'ReadOnly',
                    details: {
                        data: disableReportingTo,
                        name: 'Reporting_To'
                    }
                }
            });
            let reportingToTooltipValue = disableReportingTo ? _cruxUtils.getI18n("crm.contact.hierarchy.Specify_account_name", 'Account') : '';
            formUiHandlerUtil({
                component_type: 'field',
                component_details: {
                    type: 'ToolTip',
                    details: {
                        data: reportingToTooltipValue,
                        ignorePlaceholderValue: true,
                        name: 'Reporting_To'
                    }
                }
            });
            if (setFormDataUtil && disableReportingTo) {
                setFormDataUtil({ Reporting_To: undefined });
            }
            if (setFormConfigurationsUtil) {
                let accountModuleId = (accNameField.lookup && accNameField.lookup.module && accNameField.lookup.module.id) || (typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Accounts && moduleRecordMapping.Accounts.id);
                setFormConfigurationsUtil({
                    api_name: {
                        'Reporting_To': {
                            relatedRecordId: (!disableReportingTo && cxPropFormData.Account_Name && cxPropFormData.Account_Name.id) || "",
                            relatedRecordModuleId: (!disableReportingTo && accountModuleId) || "",
                            relatedRecordName: (!disableReportingTo && cxPropFormData.Account_Name && cxPropFormData.Account_Name.name) || "",
                            dontShowRelatedDropdown: !disableReportingTo
                        }
                    }
                });
            }
        }
    },
    handleFormValueChange: function (dataObj, layoutComponentData) {
        let { cxPropModuleData, cxPropFormData, currentInstObjKey } = layoutComponentData,
            { fieldApiName, fieldMeta } = dataObj,
            fieldApiVsMetaObject = dataObj.allFieldMetaDetails && dataObj.allFieldMetaDetails.fieldApiVsMetaObject || {};
        let expectedRevenueFieldMeta = fieldApiVsMetaObject['Expected_Revenue'];
        let setFormDataUtil, setFormConfigurationsUtil;
        if (layoutComponentData.layoutComponentDomNode) {
            setFormDataUtil = layoutComponentData.layoutComponentDomNode.setFormData;
            setFormConfigurationsUtil = layoutComponentData.layoutComponentDomNode.setFormConfigurations;
        }
        if (cxPropModuleData && ['Potentials', 'Deals'].includes(cxPropModuleData.module_name)) {
            if (fieldApiName === 'Stage') {
                this.setProbabilityValueInRecord(dataObj, layoutComponentData);
            }
            let probability = cxPropFormData.Probability;
            if (cxPropFormData.Amount !== undefined && probability !== undefined) {
                let amount = cxPropFormData.Amount;
                if (['Stage', 'Probability', 'Amount'].includes(fieldApiName)) {
                    let expectedRevenueValue = this.getExpectedRevenueValue({ probability, amount, expectedRevenueFieldMeta });
                    if (setFormDataUtil && expectedRevenueValue !== undefined) {
                        setFormDataUtil({ Expected_Revenue: expectedRevenueValue });
                    }
                }
            }
            if (fieldApiName === 'Contact_Name') {
                let existingAccountNameData = cxPropFormData.Account_Name || undefined,
                    accountNameFieldMeta = fieldApiVsMetaObject.Account_Name || undefined;
                if (accountNameFieldMeta && !(existingAccountNameData && existingAccountNameData.id && existingAccountNameData.name)) {
                    let selectedRecord = fieldMeta[currentInstObjKey] && fieldMeta[currentInstObjKey].selectedLookupRecFullData || {};
                    if (setFormDataUtil && selectedRecord && Object.keys(selectedRecord).length &&
                        selectedRecord.Account_Name && selectedRecord.Account_Name.id &&
                        selectedRecord.Account_Name.name) {
                        setFormDataUtil({
                            Account_Name: {
                                id: selectedRecord.Account_Name.id,
                                name: selectedRecord.Account_Name.name
                            }
                        });
                    }
                }
                existingAccountNameData = cxPropFormData.Account_Name || undefined;
                let setRelatedInfo = (existingAccountNameData && existingAccountNameData.id && existingAccountNameData.name);
                if (accountNameFieldMeta && setFormConfigurationsUtil) {
                    let accountModuleId = (accountNameFieldMeta.lookup && accountNameFieldMeta.lookup.module && accountNameFieldMeta.lookup.module.id) || (typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Accounts && moduleRecordMapping.Accounts.id);
                    setFormConfigurationsUtil({
                        api_name: {
                            'Contact_Name': {
                                relatedRecordId: (setRelatedInfo && existingAccountNameData && existingAccountNameData.id) || "",
                                relatedRecordModuleId: (setRelatedInfo && accountModuleId) || "",
                                relatedRecordName: (setRelatedInfo && existingAccountNameData && existingAccountNameData.name) || ""
                            }
                        }
                    });
                }
            }
            if (fieldApiName === 'Account_Name') {
                let existingAccountNameData = cxPropFormData.Account_Name || undefined,
                    accountNameFieldMeta = fieldApiVsMetaObject.Account_Name || undefined,
                    contactNameFieldMeta = fieldApiVsMetaObject.Contact_Name || undefined;
                let setRelatedInfo = (existingAccountNameData && existingAccountNameData.id && existingAccountNameData.name);
                if (contactNameFieldMeta && accountNameFieldMeta && setFormConfigurationsUtil) {
                    let accountModuleId = (accountNameFieldMeta.lookup && accountNameFieldMeta.lookup.module && accountNameFieldMeta.lookup.module.id) || (typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Accounts && moduleRecordMapping.Accounts.id);
                    setFormConfigurationsUtil({
                        api_name: {
                            'Contact_Name': {
                                relatedRecordId: (setRelatedInfo && existingAccountNameData && existingAccountNameData.id) || "",
                                relatedRecordModuleId: (setRelatedInfo && accountModuleId) || "",
                                relatedRecordName: (setRelatedInfo && existingAccountNameData && existingAccountNameData.name) || ""
                            }
                        }
                    });
                }
            }
        }
        if (cxPropModuleData) {
            if (cxPropModuleData.module_name === 'Cases') {
                if (fieldApiName === 'Case_Origin') { //ZCRM-685823
                    let caseOriginValue = cxPropFormData.Case_Origin,
                        mandatoryValue = caseOriginValue === 'Email';
                    let formUiHandlerUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.formUiHandler;
                    if (formUiHandlerUtil) {
                        formUiHandlerUtil({
                            component_type: 'field',
                            component_details: {
                                type: 'setRequired',
                                details: {
                                    data: mandatoryValue,
                                    name: 'Email'
                                }
                            }
                        });
                    }
                }
                if (fieldApiName === "Related_To") {
                    let selectedRecord = fieldMeta[currentInstObjKey] && fieldMeta[currentInstObjKey].selectedLookupRecFullData || {};
                    ['Email', 'Phone'].forEach((fieldName) => {
                        if (selectedRecord && selectedRecord.hasOwnProperty(fieldName) && selectedRecord[fieldName] && (!cxPropFormData.hasOwnProperty(fieldName) || !cxPropFormData[fieldName])) {
                            let valueObj = {};
                            valueObj[fieldName] = selectedRecord[fieldName];
                            setFormDataUtil(valueObj);
                        }
                    });
                }
            }
            if (cxPropModuleData.module_name === 'Contacts' && fieldApiName === 'Account_Name') {
                this.handleReportingToField(layoutComponentData, dataObj.allFieldMetaDetails || {});
                let reportingToMeta = fieldApiVsMetaObject.Reporting_To;
                let accountModuleId = (fieldMeta.lookup && fieldMeta.lookup.module && fieldMeta.lookup.module.id) || (typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Accounts && moduleRecordMapping.Accounts.id),
                    contactModuleId = (reportingToMeta.lookup && reportingToMeta.lookup.module && reportingToMeta.lookup.module.id) || (typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Contacts && moduleRecordMapping.Contacts.id);
                let accountModuleInfo = store.peekRecord('module', accountModuleId) || typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Accounts,
                    contactModuleInfo = store.peekRecord('module', contactModuleId) || typeof moduleRecordMapping !== "undefined" && moduleRecordMapping.Contacts;
                if (accountModuleInfo && contactModuleInfo && reportingToMeta[currentInstObjKey] && !reportingToMeta[currentInstObjKey].hasOwnProperty('relationDetails')) {
                    let relationDetails = this.getRelatedListRelationDetails(accountModuleInfo.related_lists, contactModuleInfo.module_name, contactModuleInfo.api_name);
                    if (relationDetails && relationDetails.relationId) {
                        let setFormConfigurationsUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.setFormConfigurations;
                        if (setFormConfigurationsUtil) {
                            setFormConfigurationsUtil({
                                api_name: {
                                    'Reporting_To': {
                                        relationDetails
                                    }
                                }
                            });
                        }
                    }
                }
                let selectedRecord = fieldMeta[currentInstObjKey] && fieldMeta[currentInstObjKey].selectedLookupRecFullData || {};
                if (selectedRecord && Object.keys(selectedRecord).length) {
                    this.handleAutoFillAddress({
                        selectedRecord,
                        lookupFieldMeta: fieldMeta,
                        fieldColumnNameVsMetaObject: dataObj.allFieldMetaDetails && dataObj.allFieldMetaDetails.fieldColumnNameVsMetaObject || {}
                    }, layoutComponentData);
                }
            }
        }
    },
    getRelatedListRelationDetails: function (moduleRelatedLists, toBeFoundModuleModuleName, toBeFoundModuleApiName) {
        moduleRelatedLists = moduleRelatedLists || [];
        let rlLength = moduleRelatedLists.length;
        if (rlLength) {
            for (let i = 0; i < rlLength; i++) {
                let rl = moduleRelatedLists[i];
                if (rl.api_name === toBeFoundModuleModuleName || rl.api_name === toBeFoundModuleApiName) {
                    return {
                        relationId: rl.id,
                        api_name: toBeFoundModuleApiName
                    };
                }
            }
        }
    },
    handleAutoFillAddress: function (dataObj, layoutComponentData) {
        let { cxPropModuleData, cxPropFormData } = layoutComponentData;
        let { fieldColumnNameVsMetaObject, lookupFieldMeta, selectedRecord } = dataObj;
        let currentModuleName = cxPropModuleData.module_name;
        let lookupFieldModuleId = (lookupFieldMeta.lookup && lookupFieldMeta.lookup.module && lookupFieldMeta.lookup.module.id),
            lookupFieldModuleInfo = store.peekRecord('module', lookupFieldModuleId);
        if (currentModuleName === 'Contacts' && lookupFieldModuleInfo && lookupFieldModuleInfo.api_name === 'Accounts' && !lookupFieldMeta.custom_field) {
            let srcArr = ["MAILINGSTREET", "MAILINGCITY", "MAILINGSTATE", "MAILINGZIP", "MAILINGCOUNTRY", "OTHERSTREET", "OTHERCITY", "OTHERSTATE", "OTHERZIP", "OTHERCOUNTRY"];//no i18n
            let apiNames = {
                "Mailing_Street": "Billing_Street", "Mailing_City": "Billing_City", "Mailing_State": "Billing_State", "Mailing_Zip": "Billing_Code", "Mailing_Country": "Billing_Country",//no i18n
                "Other_Street": "Shipping_Street", "Other_City": "Shipping_City", "Other_State": "Shipping_State", "Other_Zip": "Shipping_Code", "Other_Country": "Shipping_Country", //no i18n
                "Billing_Street": "Mailing_Street", "Billing_City": "Mailing_City", "Billing_State": "Mailing_State", "Billing_Code": "Mailing_Zip", "Billing_Country": "Mailing_Country",//no i18n
                "Shipping_Street": "Other_Street", "Shipping_City": "Other_City", "Shipping_State": "Other_State", "Shipping_Code": "Other_Zip", "Shipping_Country": "Other_Country"//no i18n
            };
            let len = srcArr.length,
                dataKey,
                valueKey,
                obj1 = {},
                obj2 = {};
            for (let i = 0; i < 5; i++) {
                let isPresent = fieldColumnNameVsMetaObject.hasOwnProperty(srcArr[i]);
                if (isPresent) {
                    dataKey = fieldColumnNameVsMetaObject[srcArr[i]].api_name;
                    valueKey = (currentModuleName === lookupFieldModuleInfo.api_name) ? dataKey : apiNames[dataKey];
                    if (selectedRecord[valueKey] && !cxPropFormData[dataKey]) {
                        obj1[dataKey] = selectedRecord[valueKey];
                    } else if (selectedRecord[valueKey]) {
                        obj1 = {};
                        break;
                    }
                }
            }
            for (let i = 5; i < len; i++) {
                let isPresent = fieldColumnNameVsMetaObject.hasOwnProperty(srcArr[i]);
                if (isPresent) {
                    dataKey = fieldColumnNameVsMetaObject[srcArr[i]].api_name;
                    valueKey = (currentModuleName === lookupFieldModuleInfo.api_name) ? dataKey : apiNames[dataKey];
                    if (selectedRecord[valueKey] && !cxPropFormData[dataKey]) {
                        obj2[dataKey] = selectedRecord[valueKey];
                    } else if (selectedRecord[valueKey]) {
                        obj2 = {};
                        break;
                    }
                }
            }
            let finalDataObject = Object.assign({}, (obj1 || {}), (obj2 || {}));
            let setFormDataUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.setFormData;
            if (setFormDataUtil) {
                setFormDataUtil(finalDataObject);
            }
        }
    },
    setProbabilityValueInRecord: function (dataObj, layoutComponentData) {
        let fieldApiVsMetaObject = dataObj.allFieldMetaDetails && dataObj.allFieldMetaDetails.fieldApiVsMetaObject || {},
            stageFieldMeta = fieldApiVsMetaObject['Stage'],
            probabilityFieldMeta = fieldApiVsMetaObject['Probability'];
        let { cxPropFormData } = layoutComponentData,
            stageValue = cxPropFormData.Stage;
        if (stageFieldMeta && probabilityFieldMeta) {
            let probabilityValue = this.getProbabilityValue({ stageValue, stageFieldMeta, currentLayoutId: layoutComponentData.cxPropLayoutId }),
                setFormDataUtil = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.setFormData;
            if (setFormDataUtil && probabilityValue !== undefined) {
                setFormDataUtil({ Probability: probabilityValue });
            }
        }
    },
    getProbabilityValue: function (dataObj) {
        let { stageValue, stageFieldMeta, currentLayoutId } = dataObj,
            stageValues;
        if (stageFieldMeta) {
            if (currentLayoutId && stageFieldMeta.hasOwnProperty('currentLayoutId') && stageFieldMeta[currentLayoutId].pick_list_values) {
                stageValues = stageFieldMeta[currentLayoutId].pick_list_values;
            } else {
                stageValues = stageFieldMeta.pick_list_values;
            }
        }
        stageValues = stageValues || [];
        let stageValueDetails = stageValues.filter(function (stage) { return stage.display_value === stageValue; })[0],
            probability = stageValueDetails && stageValueDetails.probability;
        return probability;
    },
    getExpectedRevenueValue: function (dataObj) {
        let { probability, amount, expectedRevenueFieldMeta } = dataObj,
            expRevenue;
        if (probability !== undefined && amount !== undefined) {
            if (probability === 0 || probability === '0') {
                expRevenue = "0";
            } else {
                expRevenue = (amount * (probability / 100)) + '';
                if (roundValue !== undefined) {
                    expRevenue = roundValue(expRevenue);
                }
            }
            if (expectedRevenueFieldMeta && expectedRevenueFieldMeta.hasOwnProperty('decimal_place') &&
                (!isNaN(Number(expRevenue)) && expRevenue !== 0 && expectedRevenueFieldMeta.decimal_place < 2)) {
                expRevenue = Number(expRevenue).toFixed(expectedRevenueFieldMeta.decimal_place);
            }
            expRevenue = !isNaN(Number(expRevenue)) ? (expRevenue === 0 ? "0" : expRevenue) : undefined;
        }
        return expRevenue;
    },
    crmhideDuplicateRecordDetail: function (ev, popoverNode) {
        if (popoverNode) {
            popoverNode.ltProp('bindToBody', false); //No I18N
        }
    },
    crmShowDuplicateRecordDetail: function ($this, errorDetails, popoverNode) {
        let duplicateErrorDetails = errorDetails && errorDetails.duplicateErrorDetails || {};
        if (duplicateErrorDetails.duplicateFdetails && duplicateErrorDetails.duplicateFdetails.detailsFromserver && duplicateErrorDetails.duplicateFdetails.detailsFromserver.duplicate_record) {
            let _recDetails = duplicateErrorDetails.duplicateFdetails.detailsFromserver.duplicate_record,
                modId = moduleRecordMapping[duplicateErrorDetails.duplicateFdetails.moduleName].id,
                _fld = store.peekRecord('module', modId).display_field,//no i18n
                entityRecord = store.peekRecord(modId, _recDetails.id),
                _entityName = "null";//no i18n
            if (entityRecord) {
                _entityName = _fld.api_name === 'Full_Name' && entityRecord.Salutation ? entityRecord.Salutation + ' ' + entityRecord[_fld.api_name] : entityRecord[_fld.api_name];
                this.showExistingEmailQuickInfo(_entityName,
                    _recDetails.Owner.name,
                    _recDetails.Owner.zuid,
                    duplicateErrorDetails.duplicateFdetails.modLabel,
                    duplicateErrorDetails.duplicateFdetails.key,
                    $this,
                    popoverNode
                );
            } else {
                store.findRecord(modId, _recDetails.id, { approved: 'both', converted: 'both' }).then((succResp) => { //no i18n
                    _entityName = succResp[0] ? (_fld.api_name === 'Full_Name' && succResp[0].Salutation ? succResp[0].Salutation + ' ' + succResp[0][_fld.api_name] : succResp[0][_fld.api_name]) : _entityName;
                    this.showExistingEmailQuickInfo(_entityName,
                        _recDetails.Owner.name,
                        _recDetails.Owner.zuid,
                        duplicateErrorDetails.duplicateFdetails.modLabel,
                        duplicateErrorDetails.duplicateFdetails.key,
                        $this,
                        popoverNode
                    );
                }, () => {
                    this.showExistingEmailQuickInfo(_entityName,
                        _recDetails.Owner.name,
                        _recDetails.Owner.zuid,
                        duplicateErrorDetails.duplicateFdetails.modLabel,
                        duplicateErrorDetails.duplicateFdetails.key,
                        $this,
                        popoverNode
                    );
                });
            }
        }
    },
    showExistingEmailQuickInfo: function (fullName, ownerName, zuid, module, key, $this, popoverNode) {
        let curEle = $L($this),
            imageUrl = (!zuid ? networkUtils.getImageUrl("sprite_avatar.svg", ResourceConstants.CRM) : "https://" + RebrandLinkUtil.getProperty("CONTACTS_URL") + "/file?ID=" + zuid + "&fs=thumb"),//NO I18N
            closestDiv = curEle.closest('div'),//NO I18N
            closestDivInput = closestDiv.find('input')[0],//NO I18N
            id = !closestDivInput ? closestDiv[0].id : closestDivInput.id;
        if (id === "") { // No I18N
            id = curEle.attr('id');// No I18N
        }
        if (popoverNode) {
            this.setData('duplicateInfoPopoverData', {
                "id": "viewExistingRecordQuickInfo" + key,
                "lead_name": fullName,
                "lead_owner": ownerName,
                "image_url": imageUrl,
                "owner_label": I18n.getMsg("Lead Owner", module),
                "lead_label": I18n.getMsg("Lead Name", module)
            });
            popoverNode.ltProp({ 'show': true }); //No I18N
        }
    },
    checkForValidPermissons: function (dataObject) {
        let { recordDetail, moduleDetail, currentPage } = dataObject;
        let finalPermissonLessMessage;
        if (moduleDetail && !this.isEmptyObj(moduleDetail) &&
            (
                (["create", "clone"].includes(currentPage) && !moduleDetail.creatable) ||
                (currentPage === "edit" && !moduleDetail.editable)
            )
        ) {
            finalPermissonLessMessage = _cruxUtils.getI18n("crm.security.error"); //NO I18N
        }

        let isDraftRecord = recordDetail && (recordDetail.$state === "draft" || !this.isEmptyObj(recordDetail.Wizard));//no i18n
        if (moduleDetail && !this.isEmptyObj(moduleDetail) && currentPage === "edit" &&
            recordDetail && !this.isEmptyObj(recordDetail) &&
            (
                !((isDraftRecord && moduleDetail.creatable) || moduleDetail.editable) ||
                ((recordDetail.hasOwnProperty('$editable') && !recordDetail.$editable) || recordDetail.$stop_processing)
            )
        ) {
            if ((recordDetail.hasOwnProperty('$editable') && !recordDetail.$editable) || recordDetail.$stop_processing) {
                if (recordDetail.$locked_for_me && !recordDetail.$stop_processing) {
                    finalPermissonLessMessage = _cruxUtils.getI18n("crm.record.locking.permission.denied");//no i18n
                } else {
                    finalPermissonLessMessage = _cruxUtils.getI18n("crm.label.insufficient.privileges");//no i18n
                }
            } else {
                finalPermissonLessMessage = _cruxUtils.getI18n("crm.security.error"); //NO I18N
            }
        }

        if (finalPermissonLessMessage) {
            this.setLayoutComponentError({ primaryErrorMessage: finalPermissonLessMessage });
        }
    },
    getRecordObjectFromRecordData: function (dataObj) {

        function updateOrDeleteRecordValues(orgRecord = {}, fieldList = {}) {
            let known_$_properties_in_fieldList = [
                "$approval", "$approval_state", "$approved",    //NO I18N
                "$editable", "$layout_rule_execution", "$notes_view",   //NO I18N
                "$refresh_fields", "$state", "$transitionid", "$validation_rule_action",    //NO I18N
                "$wizard_connection_path"   //NO I18N
            ],
                fieldNames = Object.keys(orgRecord) || [];
            fieldNames.forEach((fieldName) => {
                if (Object.keys(fieldList).length &&
                    (!fieldList.hasOwnProperty(fieldName) ||
                        known_$_properties_in_fieldList.includes(fieldName)
                    )) {
                    // keep valid field values only - based on fieldList of model
                    delete orgRecord[fieldName];
                }

                if (fieldList.hasOwnProperty(fieldName)) {
                    //unsupported field values removal
                    if (["imageupload", "multiselectlookup", "fileupload"].includes(fieldList[fieldName].fieldType)) {
                        delete orgRecord[fieldName];
                    }
                    // data deserialization/type conversion
                    if (fieldList[fieldName].fieldType === "date" && orgRecord[fieldName]) {
                        let date_moment_obj = $L.moment(orgRecord[fieldName], "YYYY-MM-DD"), is_server_format; //NO I18N
                        if (date_moment_obj && date_moment_obj.validate) {
                            is_server_format = date_moment_obj.validate();
                        }
                        if (is_server_format) {
                            let user_date_format = typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.DATE_PATTERN;
                            if (user_date_format) {
                                orgRecord[fieldName] = date_moment_obj.format(user_date_format.toUpperCase());
                            }
                        }
                    }
                    if (fieldList[fieldName].fieldType === "datetime" && orgRecord[fieldName]) {
                        let supported_formats = ["YYYY-MM-DDTHH:mm:ss", "YYYY-MM-DDTHH:mm:ssZ"]; //NO I18N
                        let is_server_format, sLen = supported_formats.length, datetime_moment_obj;
                        for (let i = 0; i < sLen; i++) {
                            datetime_moment_obj = $L.moment(orgRecord[fieldName], supported_formats[i]); //NO I18N
                            if (datetime_moment_obj && datetime_moment_obj.validate) {
                                is_server_format = datetime_moment_obj.validate();
                            }
                            if (is_server_format) {
                                break;
                            }
                        }
                        if (is_server_format) {
                            let user_datetime_format;
                            if (typeof Crm !== 'undefined' && Crm.userDetails) {
                                let timeFormat = Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm'); //NO I18N
                                if (Crm.userDetails.TIME_FORMAT.split(' ').length > 1) {
                                    timeFormat = timeFormat.replace('HH', 'hh'); //NO I18N
                                }
                                user_datetime_format = `${Crm.userDetails.DATE_PATTERN.toUpperCase()} ${timeFormat}`;
                            }
                            if (user_datetime_format) {
                                orgRecord[fieldName] = datetime_moment_obj.format(user_datetime_format);
                            }
                        }
                    }
                }
            });
        };

        let { originalRecordData, moduleId } = dataObj,
            recordObj = this.isEmptyObj(originalRecordData) ? {} : Object.assign({}, originalRecordData);

        // id removal for main record and subform records
        delete recordObj.id;
        let modelForOfEntity = store.modelFor(moduleId);
        if (modelForOfEntity && modelForOfEntity.relations) {
            let relationsOfModel = modelForOfEntity.relations || {};
            for (let relKey in relationsOfModel) {
                let actualRelation = relationsOfModel[relKey];
                if (actualRelation && actualRelation.length) {
                    actualRelation.forEach((relationObj) => {
                        if (relationObj && relationObj.cusRelationFldType === "subform") {
                            let subformRelationKey = relationObj.relKey,
                                subform_fieldList = store.modelFor(relationObj.relatedTo).fieldList || {};
                            if (recordObj && recordObj.hasOwnProperty(subformRelationKey)) {
                                if (!Array.isArray(recordObj[subformRelationKey])) {
                                    recordObj[subformRelationKey] = [];
                                } else if (Array.isArray(recordObj[subformRelationKey]) && recordObj[subformRelationKey].length) {
                                    let finalSubformArray = [];
                                    recordObj[subformRelationKey].forEach((subformRecObj) => {
                                        let _copiedsubformRecObj = this.isEmptyObj(subformRecObj) ? {} : Object.assign({}, subformRecObj);
                                        if (_copiedsubformRecObj && _copiedsubformRecObj.id) {
                                            delete _copiedsubformRecObj.id;
                                        }
                                        if (_copiedsubformRecObj && _copiedsubformRecObj.__parent_module__) {
                                            delete _copiedsubformRecObj.__parent_module__;
                                        }
                                        if (_copiedsubformRecObj && Object.keys(_copiedsubformRecObj).length) {
                                            updateOrDeleteRecordValues(_copiedsubformRecObj, subform_fieldList);
                                        }
                                        finalSubformArray.push(_copiedsubformRecObj);
                                    });
                                    recordObj[subformRelationKey] = finalSubformArray;
                                }
                            }
                        }
                    });
                }
            }
        }

        if (recordObj && Object.keys(recordObj).length) {
            let model_fieldList = modelForOfEntity && modelForOfEntity.fieldList || {};
            updateOrDeleteRecordValues(recordObj, model_fieldList);
        }

        return recordObj;
    },
    isParallelRenderingDetected: function (myRequestId) {
        // If a newer request has started, this request should not be processed to avoid parallel rendering issues.
        return myRequestId !== this._renderRequestId;
    }
});
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
/**
 * @component crm-create-form
 * @author kuralarasan.s
 * @version 1.0.0
 * @summary CRM wrapper component for crux create form component
 */
Lyte.Component.register("crm-create-form", {
_template:"<template tag-name=\"crm-create-form\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxCreateLayoutShowLoadingDivWrap\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxCreateLayoutShowLoadingDivWrap\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.showCommonMessage}}\"><template case=\"true\"> <div class=\"cxErrorMessageWrapper\"> <span class=\"cxErrorAlertIcon\"></span> <span class=\"cxErrorMsgText\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.message}}</span> </div> </template><template case=\"false\"> <crux-createform cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-record-data=\"{{cxPropRecordData}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-record-id=\"{{cxPropRecordId}}\" cx-prop-outlet-value=\"{{cxPropOutletValue}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" cx-prop-layout-data=\"{{cxPropLayoutData}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-form-data=\"{{cxPropFormData}}\" cx-prop-layout-rules-required=\"{{cxPropLayoutRulesRequired}}\" cx-prop-validation-rules-required=\"{{cxPropValidationRulesRequired}}\" cx-prop-other-data=\"{{cxPropOtherData}}\" cx-prop-current-page=\"{{cxPropCurrentPage}}\" on-form-cancel=\"{{method('onCrmCxFormCancel')}}\" on-form-value-change=\"{{method('onCrmCxFormValueChange')}}\" on-form-before-render=\"{{method('onCrmCxFormBeforeRender')}}\" on-form-after-render=\"{{method('onCrmCxFormAfterRender')}}\" on-form-after-save=\"{{method('onCrmCxFormAfterSave')}}\" on-form-before-save=\"{{method('onCrmCxFormBeforeSave')}}\" on-form-save=\"{{method('onCrmCxFormSave')}}\" on-form-save-click=\"{{method('onCrmCxFormSaveClick')}}\" on-subform-value-change=\"{{method('onCrmCxSubformValueChange')}}\" on-instance-obj-key-creation=\"{{method('onCrmCxFormInstanceObjKeyCreation')}}\" form-field-of-lookup=\"{{method('onCrmCxFormformFieldOfLookup')}}\" fetch-lookup-module-data=\"{{method('onCrmCxFormfetchLookupModuleData')}}\" fetch-lookup-records=\"{{method('onCrmCxFormfetchLookupRecords')}}\" execute-vr-function=\"{{method('onCrmCxFormExecuteVrFunction')}}\" on-vr-function-response=\"{{method('onCrmCxFormVrFunctionResponse')}}\" on-form-failure-response=\"{{method('onCrmCxFormFailureResponse')}}\" on-form-layout-switch=\"{{method('onCrmCxLayoutSwitchClick')}}\" on-form-before-destroy=\"{{method('onCrmCxFormBeforeDestroy')}}\" on-quick-create-click=\"{{method('onCrmCxQuickCreateClick')}}\"> <template is=\"registerYield\" yield-name=\"cxFormFieldErrorYield\"> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.errorDetails,'&amp;&amp;',yieldDataObject.errorDetails.type)}}\"><template case=\"true\"> <template value=\"{{yieldDataObject.errorDetails.type}}\" is=\"switch\">  <template case=\"duplicateError\"> <span class=\"cruxErrMsg cruxErrorMsgDesc cruxErrorMultiline {{yieldDataObject.errorDetails.duplicateErrorDetails.class}}\" id=\"errorMsg_{{cxPropModuleData.module_name}}_{{cxPropFieldData.column_name}}\"> {{unescape(expHandlers(yieldDataObject.errorDetails.errorMesage,'||',\"\"))}} <template is=\"if\" value=\"{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.isFieldEnc,'!'),'&amp;&amp;',yieldDataObject.errorDetails.duplicateErrorDetails.more_records),'&amp;&amp;',expHandlers(cxPropModuleData.generated_type,'==','default')),'&amp;&amp;',cxIsValuePresent(cxPropModuleData.api_name,'Leads,Contacts,Accounts,Vendors'))}}\"><template case=\"true\"> <link-to id=\"duplicateErrorLink{{cxPropFieldData.api_name}}_{{currentInstObjKey}}\" lt-prop-rel=\"noopener noreferrer\" data-zcqa=\"viewExistingRecord\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.find-and-merge\" lt-prop-qp=\"{&quot;findDupFldName&quot; : &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.dupColName}}&quot;}\" lt-prop-dp=\"[&quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.moduleName}}&quot;, &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.id}}&quot;]\"> {{cruxGetI18n('crm.label.module.merge',yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.modPluLabel)}}</link-to> </template><template case=\"false\"> <link-to id=\"duplicateErrorLink{{cxPropFieldData.api_name}}_{{currentInstObjKey}}\" lt-prop-rel=\"noopener noreferrer\" lt-prop-id=\"{{concat('viewExistingRecordQuickInfo',yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.key)}}\" onmouseenter=\"{{action(&quot;showDuplicateRecordDetail&quot;,this,yieldDataObject.errorDetails)}}\" onmouseleave=\"{{action(&quot;hideDuplicateRecordDetail&quot;,event,this)}}\" data-zcqa=\"viewExistingRecord\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.moduleName}}&quot;, &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.id}}&quot;]\"> {{cruxGetI18n(\"crm.view.record\",yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.modLabel)}}</link-to> </template></template> </template></template> </span> </template></template> </template></template> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionLabelYield\"> <template is=\"if\" value=\"{{yieldDataObject.isSubformSection}}\"><template case=\"true\"> <div class=\"create-det-title\"> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','asterisk'))}}\"><template case=\"true\"> <span class=\"requiredFieldAccessibilty\"><span class=\"crmNegativeColor\">*</span></span> </template></template> <div id=\"{{concat('secHead_',cxPropSection[currentInstObjKey].parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont {{expHandlers(yieldDataObject.subformPermissionMessage,'?:','dIB','')}}\"> <div id=\"sectitle\" class=\"cxDIB {{expHandlers(expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','red_accent_line')),'?:','cxSfTableHeaderMandatory','')}}\"> {{cxPropSection.display_label}}</div> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','required'))}}\"><template case=\"true\"> <span class=\"requiredFieldAccessibilty\">(<span class=\"crmNegativeColor\">{{cruxGetI18n('crm.label.required')}}</span>)</span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSection.properties.tooltip.name,'==','Info Icon')}}\"><template case=\"true\"> <i lt-prop-title=\"{{cxPropSection.properties.tooltip.value}}\" lt-prop-tooltip-class=\"toolTClass\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;topright&quot;,&quot;margin&quot; : &quot;5&quot;,&quot;hidedelay&quot; : &quot;250&quot;}\" class=\"cxDIB info_icon subformTooltip cP pRI\"> <crmutil-icon icon-name=\"info-rounded\" icon-class=\"zcicn-info-rounded crmBaseIcon \"></crmutil-icon> </i> </template></template> <template is=\"if\" value=\"{{yieldDataObject.subformPermissionMessage}}\"><template case=\"true\"> <div class=\"crmNotesSection dIB vaM mL10\"> <span class=\"zcicncss-info zcicn-cssIcons zcicncss13 zcicn_grey_mask mR3\"></span>{{yieldDataObject.subformPermissionMessage}} </div> </template></template> <template is=\"if\" value=\"{{yieldDataObject.mandatoryError}}\"><template case=\"true\"> <span class=\"cruxErrMsg cruxErrorMsgDesc\" data-zcqa=\"mandatory-error-msg-{{cxPropSection.display_label}}\" id=\"errorMsg_Crm_{{yieldDataObject.moduleName}}_{{cxPropSection.display_label}}\"> {{unescape(cruxGetI18n('crm.field.empty.check',cruxEncodeHTML(cxPropSection.display_label)))}} </span> </template></template> </div> </div> </template></template> </template> <template is=\"registerYield\" yield-name=\"cxFormHeaderYield\"> <lyte-yield yield-name=\"cxFormHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFooterYield\"> <lyte-yield yield-name=\"cxFormFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionHeaderYield\"> <lyte-yield yield-name=\"cxFormSectionHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionFooterYield\"> <lyte-yield yield-name=\"cxFormSectionFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormCompleteSectionYield\"> <lyte-yield yield-name=\"cxFormCompleteSectionYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFieldHeaderYield\"> <lyte-yield yield-name=\"cxFormFieldHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFieldFooterYield\"> <lyte-yield yield-name=\"cxFormFieldFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template> </crux-createform> </template></template> <lyte-popover lt-prop-content-padding=\"0px\" id=\"cxCrmDuplicateInfoPopover{{currentInstObjKey}}\" lt-prop-wrapper-class=\"cxCrmDuplicateInfoPopover{{currentInstObjKey}}\" lt-prop-type=\"callout\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-origin-elem=\"a#{{duplicateInfoPopoverData.id}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <lyte-table lt-prop-yield=\"true\" class=\"cxDuplicateInfoTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"if\" value=\"{{expHandlers(duplicateInfoPopoverData.lead_name,'!=','null')}}\"><template case=\"true\"> <lyte-tr class=\"cxCrmDuplicateInfoRow\"> <lyte-td class=\"cxRecordLabel\" data-zcqa=\"QuickInfoPopover_LeadLabel\"><span class=\"cxDIB\">{{duplicateInfoPopoverData.lead_label}}</span></lyte-td> <lyte-td class=\"cxRecordValue\" data-zcqa=\"QuickInfoPopover_LeadName\"> <span class=\"cxDIB\">:</span> {{duplicateInfoPopoverData.lead_name}}</lyte-td> </lyte-tr> </template></template> <lyte-tr class=\"cxCrmDuplicateInfoRow\"> <lyte-td class=\"cxRecordLabel\" data-zcqa=\"QuickInfoPopover_OwnerLabel\"><span class=\"cxDIB\">{{duplicateInfoPopoverData.owner_label}}</span></lyte-td> <lyte-td class=\"cxRecordValue w300\"> <span class=\"pR5 dIB vaT\">:</span> <span class=\"cxDIB\" data-zcqa=\"QuickInfoPopover_Image\"> <img class=\"cxDuplicateRecordCard\" src=\"{{duplicateInfoPopoverData.image_url}}\"> </span> <span class=\"dIB vaT mT2 mL5 wbBreakAll\" data-zcqa=\"QuickInfoPopover_LeadOwner\">{{duplicateInfoPopoverData.lead_owner}}</span> </lyte-td> </lyte-tr> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </lyte-popover-content> </template> </lyte-popover> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"duplicateError":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,2]}]}},"default":{}},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,13],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,15],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,17],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0,0]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,3,3,1]},{"type":"text","position":[1,1,3,3,5,0]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropMode","cxPropModuleInformationType","cxPropModuleId","cxPropModuleApiName","cxPropModuleData","cxPropLayoutInformationType","cxPropLayoutName","cxPropLayoutId","cxPropLayoutData","cxPropRecordInformationType","cxPropRecordId","cxPropRecordData","cxPropContentOverflow","lyteViewPort","cxPropLayoutSections","cxPropOutletValue","cxPropRenderMode","currentInstObjKey","cxPropCurrentPage","cxPropFormData","cxPropLayoutComponentData","cxPropLayoutRulesRequired","cxPropValidationRulesRequired","cxPropOtherData","showLoading"],
_observedAttributesType :["string","string","string","string","object","string","string","string","object","string","string","object","boolean","boolean","array","string","string","string","string","object","object","boolean","boolean","object","boolean"],

    _lyteUtilFunctions: ["refresh", "setFormData", "getFormData", "getSubFormData", "validateForm", "validateSubform", "destroyComponent"],
    data: function () {
        return {
            /**
             * @componentProperty { create | edit | clone } cxPropMode=create
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropMode: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { moduleApiName | moduleData | moduleId } cxPropModuleInformationType=moduleApiName
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropModuleId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleId
             * @input
             */
            cxPropModuleId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropModuleApiName
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleApiName
             * @input
             */
            cxPropModuleApiName: Lyte.attr("string", { default: "", input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropModuleData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleData
             * @input
             */
            cxPropModuleData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { layoutName | layoutData | layoutId } cxPropLayoutInformationType=layoutName
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropLayoutInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropLayoutName
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutName
             * @input
             */
            cxPropLayoutName: Lyte.attr("string", { default: "", input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropLayoutId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutId
             * @input
             */
            cxPropLayoutId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropLayoutData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutData
             * @input
             */
            cxPropLayoutData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { recordId | recordData} cxPropRecordInformationType=recordData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropMode edit,clone
             * @input
             */
            cxPropRecordInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropRecordId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropRecordInformationType recordId
             * @input
             */
            cxPropRecordId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropRecordData
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             * @condition cxPropMode create, edit, clone
             * @condition cxPropRecordInformationType recordData
             */
            cxPropRecordData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false, input: true }), //no i18n

            lyteViewPort: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
            cxPropLayoutSections: Lyte.attr('array', { default: [] }), //no i18n
            cxPropOutletValue: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            cxPropRenderMode: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            currentInstObjKey: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            cxPropCurrentPage: Lyte.attr("string", { default: "create", hideAttr: true }),//no i18n
            cxPropFormData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropLayoutComponentData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropLayoutRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
            cxPropValidationRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
            cxPropOtherData: Lyte.attr('object', { 'default': {} }),//no i18n
            showLoading: Lyte.attr("boolean", { default: true }) //no i18n
        };
    },
    viewPortObserver: function () {
        if (!this.data.lyteViewPort) {
            this.initHandler();
        }
    }.observes('lyteViewPort'),
    init: function () {
        let moduleApiName = this.data.cxPropModuleApiName,
            moduleData = this.data.cxPropModuleData;
        moduleApiName = moduleApiName && typeof moduleApiName === 'string' && moduleApiName.trim();
        this.__initFlag = true;
        if (moduleApiName && moduleData && moduleData.api_name && moduleData.api_name !== moduleApiName) {
            try {
                this.data.cxPropModuleData = {}; this.data.cxPropModuleId = "";
                this.data.cxPropLayoutId = ""; this.data.cxPropLayoutData = {}; this.data.cxPropLayoutName = ""; this.data.cxPropLayoutSections = [];
                let toEmptyProperties = "cx-prop-module-data,cx-prop-module-id,cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name,cx-prop-layout-data";
                this.throwEvent('onBuilderPropertyRemove', toEmptyProperties.split(","));  //No I18N
                this._l__rendering__inprogress_flag = this._m__rendering__inprogress_flag = true;//temp-fix
            } catch (e) {
                this.__builderPropertyRemoveException = true;
            }
        }
        if (!this.data.hasOwnProperty('cxPropLayoutComponentData') || !this.data.cxPropLayoutComponentData) {
            this.data.cxPropLayoutComponentData = {};
        }
        if (this.data.cxPropLayoutComponentData) {
            Lyte.Component.set(this.data.cxPropLayoutComponentData, 'isLyteViewPort', this.data.lyteViewPort);//no i18n
        }
        this.initHandler();
    },
    initHandler: function () {
        if (this.data.lyteViewPort) {
            return;
        }
        let moduleName = this.data.cxPropModuleName,
            moduleApiName = this.data.cxPropModuleApiName,
            moduleData = this.data.cxPropModuleData,
            moduleId = this.data.cxPropModuleId,
            userDetails = typeof Crm != "undefined" && Crm.userDetails || {}; //No I18n
        moduleApiName = moduleApiName && typeof moduleApiName === 'string' && moduleApiName.trim();
        if (!moduleName && moduleApiName) {
            let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: moduleApiName });
            if (moduleDetails && moduleDetails.moduleName) {
                moduleName = moduleDetails.moduleName;
            }
        } else if (!moduleName && (moduleId || (moduleData && moduleData.id))) {
            let idModMapping = typeof idModuleMapping !== 'undefined' ? idModuleMapping : {},
                givenModuleId = moduleId || (moduleData && moduleData.id);
            if (idModMapping[givenModuleId]) {
                moduleName = idModMapping[givenModuleId];
            }
        }
        if (!moduleName && (moduleData && moduleData.module_name)) {
            let moduleRecMapping = typeof moduleRecordMapping !== 'undefined' ? moduleRecordMapping : {};
            if (moduleRecMapping[moduleData.module_name]) {
                moduleName = moduleData.module_name;
            }
        }
        if (this.data.cxPropMode && ['create', 'edit', 'clone'].includes(this.data.cxPropMode)) {
            this.data.cxPropCurrentPage = this.data.cxPropMode;
        }
        if (moduleName) {
            let isModuleSupported = this.checkCruxCreateFormSupport(moduleName, this.data.cxPropCurrentPage);
            if (!isModuleSupported) {
                this.setLayoutComponentError({ primaryErrorMessage: 'unsupported module given to render create form.' });//no i18n
                return;
            }
        }
        if (this.data.cxPropCurrentPage === "clone" && moduleName && moduleName.indexOf("LinkingModule") > -1) {//ZCRM-685838
            this.setLayoutComponentError({ primaryErrorMessage: 'unsupported mode given to render create form.' });//no i18n
            return;
        }
        var layoutCompData = this.data.cxPropLayoutComponentData || {};
        if (!this.data.cxPropCurrentPage && (!this.isEmptyObj(this.data.cxPropRecordData)
            || this.data.cxPropRecordId)) {
            this.data.cxPropCurrentPage = 'edit';//No i18N
        }
        let dataProps = this.getExposedCXPropertiesList();
        dataProps.forEach((dataProps) => {
            if (this.data.hasOwnProperty(dataProps) && !layoutCompData.hasOwnProperty(dataProps)) {
                layoutCompData[dataProps] = this.data[dataProps];
            }
        });
        if (!this.isEmptyObj(layoutCompData)) {
            this.data.originalLayoutComponentData = $L.extend(true, {}, layoutCompData);
            if (moduleName && (['Deals', 'Potentials'].indexOf(moduleName) !== -1 ||
                (userDetails.LAYOUTRULEAVAILABLE === true && userDetails.LRINVOLVEDMODULES.indexOf(moduleName) !== -1))) {
                layoutCompData.cxPropLayoutRulesRequired = true;
            }
            if (moduleName && (userDetails.VALIDATIONRULEAVAILABLE === true && userDetails.VRINVOLVEDMODULES.indexOf(moduleName) !== -1)) {
                layoutCompData.cxPropValidationRulesRequired = true;
            }
            layoutCompData.cxInternalUtilityObj = { formFieldList: {}, subformFieldList: {} };
            if (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id && (!layoutCompData.cxPropLayoutId || layoutCompData.cxPropLayoutId !== layoutCompData.cxPropLayoutData.id)) {
                layoutCompData.cxPropLayoutId = layoutCompData.cxPropLayoutData.id;
            }
            if ((!layoutCompData.cxPropLayoutSections || !layoutCompData.cxPropLayoutSections.length) && layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.sections && layoutCompData.cxPropLayoutData.sections.length) {
                layoutCompData.cxPropLayoutSections = layoutCompData.cxPropLayoutData.sections;
            }
            if (!layoutCompData.hasOwnProperty('cxPropSubformProperties')) {
                layoutCompData.cxPropSubformProperties = {
                    isSubformRecordSupported: true,
                    cxPropLimitRows: true,
                    enableCountryCode: typeof Crm !== "undefined" && Crm.userDetails ? Crm.userDetails.isPhoneNoNewView : false
                };
            }
            if (!layoutCompData.cxPropContentWrapperClass) {
                layoutCompData.cxPropContentWrapperClass = "";
            }
            layoutCompData.columnsToSkip = layoutCompData.columnsToSkip || [];
            layoutCompData.apiNamesToSkip = layoutCompData.apiNamesToSkip || [];
            layoutCompData.uiTypeToSkip = layoutCompData.uiTypeToSkip || [];
            let skipType = ['columnsToSkip', 'apiNamesToSkip', 'uiTypeToSkip'];
            skipType.forEach((skipType) => {
                if (Array.isArray(layoutCompData[skipType])) {
                    let columnsToSkip = this.getUnsupportFieldsList(skipType);
                    layoutCompData[skipType] = layoutCompData[skipType].concat(columnsToSkip);
                }
            });
            this.checkAndFetchMetaData(layoutCompData);
            if (this.data.haveAllDefaultMetaData) {
                if (layoutCompData.cxPropModuleData) {
                    this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
                    layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
                    layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
                }
                if (layoutCompData.cxPropLayoutSections && layoutCompData.cxPropLayoutSections.length) {
                    this.setData('cxPropLayoutSections', layoutCompData.cxPropLayoutSections);
                }
                this.actual_init();
            }
        } else {
            this.setDefautMessageDetails();
            let cxInternalObj = this.data.cxPropLayoutComponentData.cxInternalUtilityObj;
            Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
            Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
            Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", "cxPropLayoutComponentData is empty. It's a mandatory data property to render create form.");//no i18n
        }
    },
    didConnect: function () {
        this.didConnectHandler();
        /**
         * This function will render the component with given data. All mandatory properties required for rendering should be passed.
         * @utility refresh
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { object } componentData - The data to be set into the component. It can contain any of the component properties.
        */
        this.$node.refresh = (customData = {}) => {
            let {
                cxPropMode,
                cxPropModuleId,
                cxPropModuleApiName,
                cxPropRecordId,
                cxPropRecordData
            } = customData,
                currentPage = cxPropMode || this.data.cxPropCurrentPage,
                haveAllMandatoryData = false;

            cxPropModuleApiName = cxPropModuleApiName || this.data.cxPropModuleApiName;
            cxPropModuleId = cxPropModuleId || this.data.cxPropModuleId;
            cxPropRecordId = cxPropRecordId || this.data.cxPropRecordId;
            cxPropRecordData = cxPropRecordData || this.data.cxPropRecordData;
            if (currentPage === "create" && (cxPropModuleId || cxPropModuleApiName)) {
                haveAllMandatoryData = true;
            } else if ((cxPropModuleId || cxPropModuleApiName) && (cxPropRecordId || !this.isEmptyObj(cxPropRecordData))) {
                haveAllMandatoryData = true;
            }
            if (haveAllMandatoryData) {
                this.reRenderComponent(customData, true);
            }
        };
    },
    reRenderComponent: function (customData, isRefresh) {
        this.setData('showLoading', true);
        this.data.cxPropLayoutComponentData = {};
        if (customData.cxPropModuleApiName && !customData.cxPropModuleId) {
            let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: customData.cxPropModuleApiName });
            if (moduleDetails && moduleDetails.moduleId) {
                customData.cxPropModuleId = moduleDetails.moduleId;
            }
        }
        for (var eachDataProp in customData) {
            if (eachDataProp === "cxPropModuleId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
                if (!customData.hasOwnProperty('cxPropModuleData')) {
                    this.data.cxPropModuleData = {};
                    if (this.getMethods('onBuilderPropertyRemove')) {
                        this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data']);
                    }
                }
                if (!customData.hasOwnProperty('cxPropLayoutId')) {
                    this.emptyLayoutDetails();
                }
                this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
            }
            if (eachDataProp === "cxPropLayoutId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
                let layoutPropsToEmpty = [];
                if (!customData.hasOwnProperty('cxPropLayoutSections')) {
                    this.data.cxPropLayoutSections = [];
                    layoutPropsToEmpty.push('cx-prop-layout-sections');
                }
                if (!customData.hasOwnProperty('cxPropLayoutData')) {
                    this.data.cxPropLayoutData = {};
                    layoutPropsToEmpty.push('cx-prop-layout-data');
                }
                if (!customData.hasOwnProperty('cxPropLayoutName')) {
                    this.data.cxPropLayoutName = "";
                    layoutPropsToEmpty.push('cx-prop-layout-name');
                }
                if (this.getMethods('onBuilderPropertyRemove')) {
                    this.executeMethod('onBuilderPropertyRemove', layoutPropsToEmpty);
                }
            }
            if (eachDataProp === "cxPropRecordId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
                if (!customData.hasOwnProperty('cxPropRecordData')) {
                    this.data.cxPropRecordData = {};
                    if (this.getMethods('onBuilderPropertyRemove')) {
                        this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-data']);
                    }
                }
                if (!customData.hasOwnProperty('cxPropLayoutId')) {
                    this.emptyLayoutDetails();
                }
            }
            if (eachDataProp === "cxPropRecordData") {
                if (!customData.hasOwnProperty('cxPropRecordId')) {
                    this.data.cxPropRecordId = "";
                    if (this.getMethods('onBuilderPropertyRemove')) {
                        this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-id']);
                    }
                }
                if (!customData.hasOwnProperty('cxPropLayoutId')) {
                    this.emptyLayoutDetails();
                }
            }
            if (eachDataProp === 'cxPropMode' && customData[eachDataProp] === 'create') {
                if (!customData.hasOwnProperty('cxPropRecordData')) {
                    this.data.cxPropRecordData = {};
                }
                if (this.getMethods('onBuilderPropertyRemove')) {
                    this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-information-type']);
                }
            }
            this.data[eachDataProp] = customData[eachDataProp];
        }
        if (!customData.hasOwnProperty('cxPropFormData')) {
            this.data.cxPropFormData = {};
        }
        this.initHandler();
    },
    didDestroy: function () {
        if (this.observeRecordIdTimeout) { clearTimeout(this.observeRecordIdTimeout); }
        if (this.observeLayoutIdTimeout) { clearTimeout(this.observeLayoutIdTimeout); }
        if (this.observeLayoutNameTimeout) { clearTimeout(this.observeLayoutNameTimeout); }
    },
    //Observers - start
    observeRecordIdAndRefresh: function () {

        if (this.observeRecordIdTimeout) { clearTimeout(this.observeRecordIdTimeout); }

        // last observed record id
        this._pendingRecordId = this.data.cxPropRecordId;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeRecordIdTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            if (this.data.cxPropRecordId) {
                this.reRenderComponent({ cxPropRecordId: this._pendingRecordId });
            } else if (this.data.cxPropCurrentPage === 'create') {
                this.data.cxPropRecordData = {};
            }
        };

        this.observeRecordIdTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropRecordId'),
    observeRecordDataAndRefresh: function () {
        this.reRenderComponent({ cxPropRecordData: this.data.cxPropRecordData || {} });
    }.observes('cxPropRecordData', 'cxPropRecordData.{}'),
    observeLayoutIdAndRefresh: function () {

        if (this.observeLayoutIdTimeout) { clearTimeout(this.observeLayoutIdTimeout); }

        // last observed layout id
        this._pendingLayoutId = this.data.cxPropLayoutId;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeLayoutIdTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            this.emptyLayoutDetails('cxPropLayoutId');
            this.reRenderComponent({ cxPropLayoutId: this._pendingLayoutId });
        };

        this.observeLayoutIdTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropLayoutId'),
    observeLayoutNameAndRefresh: function () {

        if (this.observeLayoutNameTimeout) { clearTimeout(this.observeLayoutNameTimeout); }

        // last observed layout name
        this._pendingLayoutName = this.data.cxPropLayoutName;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeLayoutNameTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            this.emptyLayoutDetails('cxPropLayoutName');
            this.reRenderComponent({ cxPropLayoutName: this._pendingLayoutName });
        };

        this.observeLayoutNameTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropLayoutName'),
    observeLayoutDataAndRefresh: function () {
        if (this._l__rendering__inprogress_flag) {
            delete this._l__rendering__inprogress_flag;
            return;
        }
        this.emptyLayoutDetails('cxPropLayoutData');
        this.reRenderComponent({ cxPropLayoutData: this.data.cxPropLayoutData || {} });
    }.observes('cxPropLayoutData', 'cxPropLayoutData.{}'),
    observeModuleIdAndRefresh: function () {
        if (this.data.cxPropModuleId) {
            let moduleDetails = { cxPropModuleId: this.data.cxPropModuleId };
            let isValidModule = this.isValidModule(moduleDetails);
            if (!isValidModule) {
                this.setInvalidModuleError();
                this.data.cxPropModuleApiName = "";
                this.data.cxPropModuleData = {};
                return;
            }
            if (this.getMethods('onBuilderPropertyRemove')) {
                this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data', 'cx-prop-module-api-name']);
            }
            this.reRenderComponent(moduleDetails);
        }
    }.observes('cxPropModuleId'),
    observeModuleApinameAndRefresh: function () {
        if (this.data.cxPropModuleApiName) {
            let moduleDetails = { cxPropModuleApiName: this.data.cxPropModuleApiName };
            let isValidModule = this.isValidModule(moduleDetails);
            if (!isValidModule) {
                this.setInvalidModuleError();
                this.data.cxPropModuleId = "";
                this.data.cxPropModuleData = {};
                return;
            }
            if (this.getMethods('onBuilderPropertyRemove')) {
                this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data', 'cx-prop-module-id']);
            }
            this.reRenderComponent(moduleDetails);
        }
    }.observes('cxPropModuleApiName'),
    observeModuleDataAndRefresh: function () {
        let dontRemoveLayoutDataFromBuilderProperty = this.__initFlag;
        delete this.__initFlag;
        if (this._m__rendering__inprogress_flag) {
            delete this._m__rendering__inprogress_flag;
            return;
        }
        let moduleDetails = { cxPropModuleData: this.data.cxPropModuleData || {} };
        let isValidModule = this.isValidModule(moduleDetails);
        if (!isValidModule) {
            let propertiesToIgnore = [];
            if (dontRemoveLayoutDataFromBuilderProperty) {
                propertiesToIgnore.push('cx-prop-layout-data');
            }
            this.setInvalidModuleError(propertiesToIgnore);
            this.data.cxPropModuleApiName = "";
            this.data.cxPropModuleId = "";
            return;
        }
        if (this.getMethods('onBuilderPropertyRemove')) {
            this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name', 'cx-prop-module-id']);
        }
        this.reRenderComponent(moduleDetails);
    }.observes('cxPropModuleData', 'cxPropModuleData.{}'),
    observeModeAndRefresh: function () {
        if (this.data.cxPropMode) {
            this.reRenderComponent({ cxPropMode: this.data.cxPropMode });
        }
    }.observes('cxPropMode'),
    //Observers - end
    emptyLayoutDetails: function (validLayoutProperty) {
        let toEmptyProperties = '';
        if (validLayoutProperty) {
            switch (validLayoutProperty) {
                case 'cxPropLayoutId':
                    this.data.cxPropLayoutName = "";
                    this.data.cxPropLayoutSections = [];
                    this.data.cxPropLayoutData = {};
                    toEmptyProperties = "cx-prop-layout-name,cx-prop-layout-sections,cx-prop-layout-data";
                    break;
                case 'cxPropLayoutName':
                    this.data.cxPropLayoutId = "";
                    this.data.cxPropLayoutSections = [];
                    this.data.cxPropLayoutData = {};
                    toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-data";
                    break;
                case 'cxPropLayoutData':
                    this.data.cxPropLayoutId = "";
                    this.data.cxPropLayoutSections = [];
                    this.data.cxPropLayoutName = "";
                    toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name";
                    break;
            }
        } else {
            this.data.cxPropLayoutId = "";
            this.data.cxPropLayoutName = "";
            this.data.cxPropLayoutSections = [];
            this.data.cxPropLayoutData = {};
            toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name,cx-prop-layout-data";
        }
        this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
        if (this.getMethods('onBuilderPropertyRemove')) {
            this.executeMethod('onBuilderPropertyRemove', toEmptyProperties.split(','));
        }
    },
    didConnectHandler: function () {
        if (this.data.haveAllDefaultMetaData) {
            this.actual_didConnect();
        }
    },
    isValidModule: function (dataObj = {}) {
        let { cxPropModuleApiName, cxPropModuleId, cxPropModuleData } = dataObj;
        cxPropModuleApiName = !cxPropModuleApiName && cxPropModuleData && cxPropModuleData.api_name ? cxPropModuleData.api_name : cxPropModuleApiName;
        if (cxPropModuleApiName) {
            let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: cxPropModuleApiName });
            if (moduleDetails && moduleDetails.moduleId) {
                cxPropModuleId = moduleDetails.moduleId;
            }
        }
        return cxPropModuleId ? true : false;
    },
    setInvalidModuleError: function (propertiesToIgnore = []) {
        this.setLayoutComponentError({ primaryErrorMessage: 'Mandatory moduleData / moduleId / moduleApiName for rendering create form is missing/incorrect. If newly created module given, refresh and check once.' });//no i18n
        if (this.getMethods('onBuilderPropertyRemove')) { //ZCRM-685500
            let moduleInfoType = this.data.cxPropModuleInformationType, propsToEmpty = [];
            propsToEmpty.push('cx-prop-layout-sections', 'cx-prop-layout-data', 'cx-prop-layout-name');
            switch (moduleInfoType) {
                case 'moduleApiName':
                    propsToEmpty.push('cx-prop-module-id', 'cx-prop-module-data');
                    break;
                case 'moduleId':
                    propsToEmpty.push('cx-prop-module-api-name', 'cx-prop-module-data');
                    break;
                case 'moduleData':
                    propsToEmpty.push('cx-prop-module-api-name', 'cx-prop-module-id');
                    break;
            }
            propsToEmpty = propsToEmpty.filter((prop) => !propertiesToIgnore.includes(prop));
            this.executeMethod('onBuilderPropertyRemove', propsToEmpty);
        }
    },
    methods: {
        onCrmCxFormSaveClick: function (callBackDataObject) {
            /**
             * This method will be triggered on click of Save or Save and New button
             * @method onFormSaveClick
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormSaveClick', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonNode,currentButtonObj,eventDetails,formData
        },
        onCrmCxFormBeforeSave: function (callBackDataObject) {
            /**
             * This method will be triggered before saving the form
             * @method onFormBeforeSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormBeforeSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData,vrErrorDetails
        },
        onCrmCxFormCancel: function (callBackDataObject) {
            /**
             * This method will be triggered on click of cancel button
             * @method onFormCancel
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormCancel', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonNode,currentButtonObj,eventDetails,formData
        },
        onCrmCxFormValueChange: function (callBackDataObject) {
            /**
             * This method will be triggered on any value change in form
             * @method onFormValueChange
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } fieldValue - The value of the field that has changed.
             * @param { string } fieldApiName - The API name of the field that has changed.
             */
            return this.executeMethodHandler('onFormValueChange', callBackDataObject);//no i18n
            //callBackDataObject keys - allFieldMetaDetails,cxPropFormData,fieldApiName,fieldMeta,fieldValue,formData
        },
        onCrmCxFormBeforeRender: function (callBackDataObject) {
            /**
             * This method will be triggered before form rendering
             * @method onFormBeforeRender
             * @author kuralarasan.s
             * @version 1.0.0
             */
            return this.executeMethodHandler('onFormBeforeRender', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey,allFieldMetaDetails
        },
        onCrmCxFormAfterRender: function (callBackDataObject) {
            /**
             * This method will be triggered after rendering the form
             * @method onFormAfterRender
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } contentWrapperClass - The class of the parent element which contains the form content.
             */
            return this.executeMethodHandler('onFormAfterRender', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey,allFieldMetaDetails,formData
        },
        onCrmCxFormSave: function (callBackDataObject) {
            /**
             * This method will be triggered when click of save button once client validation passed.
             * @method onFormSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData
        },
        onCrmCxFormAfterSave: function (callBackDataObject) {
            /**
             * This method will be triggered after record creation.
             * @method onFormAfterSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } formData - The data of the form that was submitted.
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             * @param { object } responseDetails - This object contains the details of the response from the server.
             */
            return this.executeMethodHandler('onFormAfterSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData, saveResponse
        },
        onCrmCxSubformValueChange: function (callBackDataObject) {
            /**
             * This method will be triggered for any value change in subform
             * @method onSubformValueChange
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } subformApiName - The API name of the subform that has changed.
             * @param { string } fieldApiName - The API name of the field that has changed.
             * @param { number } subformRowNumber - The row number of the subform that has changed.
             * @param { * } fieldValue - The value of the field that has changed.
             */
            return this.executeMethodHandler('onSubformValueChange', callBackDataObject);//no i18n
            //callBackDataObject keys - apiName,componentName,cxPropFormData,element,formData,rowId,value,subformApiname
        },
        onCrmCxFormInstanceObjKeyCreation: function (callBackDataObject) {
            return this.executeMethodHandler('onInstanceObjKeyCreation', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey
        },
        onCrmCxFormfetchLookupModuleData: function (callBackDataObject) {
            return this.executeMethodHandler('fetchLookupModuleData', callBackDataObject);//no i18n
            //callBackDataObject keys - fieldMeta,formData,id
        },
        onCrmCxFormfetchLookupRecords: function (callBackDataObject) {
            return this.executeMethodHandler('fetchLookupRecords', callBackDataObject);//no i18n
            //callBackDataObject keys - fieldMeta,formData,moduleId,queryParams
        },
        onCrmCxFormformFieldOfLookup: function (callBackDataObject) {
            return this.executeMethodHandler('formFieldOfLookup', callBackDataObject);//no i18n
        },
        onCrmCxQuickCreateClick: function (callBackDataObject) {
            /**
             * This method will be triggered when quick create button is clicked.
             * @method onQuickCreateClick
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { boolean } isFromModal - Indicates if the quick create popup is opened from lookup modal instead of lookup dropdown.
             * @param { boolean } isFromSubform - Indicates if the quick create popup is opened from subform instead of main form.
             * @param { string } fieldApiName - The API name of the lookup field that was clicked.
             * @param { string } subformApiName - The API name of subform in which the lookup field is present. This will be available only if the quick create popup is opened from subform.
             */
            return this.executeMethodHandler('onQuickCreateClick', callBackDataObject);//no i18n
            //callBackDataObject keys - cruxLookupElmId,currentFieldNode,cxPropFieldData,formData,fromModal,fromSubform,recordObj,subSectionCurntInstObj
        },
        onCrmCxLayoutSwitchClick: function (callBackDataObject) {
            /**
             * This method will be triggered on layout change.
             * @method onFormLayoutSwitch
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } layoutId - The id of the layout that is being switched to.
             * @param { string } layoutName - The name of the layout that is being switched to.
             */
            return this.executeMethodHandler('onFormLayoutSwitch', callBackDataObject);//no i18n
            //callBackDataObject keys - cxPropLayoutComponentData,formData,newLayoutRenderObj,selectedLayoutId,selectedLayoutName
        },
        onCrmCxFormExecuteVrFunction: function (callBackDataObject) {
            return this.executeMethodHandler('executeVrFunction', callBackDataObject);//no i18n
        },
        onCrmCxFormVrFunctionResponse: function (callBackDataObject) {
            return this.executeMethodHandler('onVrFunctionResponse', callBackDataObject);//no i18n
        },
        onCrmCxFormFailureResponse: function (callBackDataObject) {
            return this.executeMethodHandler('onFormFailureResponse', callBackDataObject);//no i18n
        },
        onCrmCxFormBeforeDestroy: function (callBackDataObject) {
            return this.executeMethodHandler('onFormBeforeDestroy', callBackDataObject);//no i18n
        }
    },
    actions: {
        viewRecord: function (successData) {
            let info = successData && successData.successMessageInfo;
            if (info && info.moduleName && info.recordId) {
                let _parentLyte = window.Lyte,
                    detailViewUrl = _parentLyte.Router.getURL({
                        route: "crm.tab.module.entity.detail",
                        dynamicParams: [
                            info.moduleName,
                            info.recordId
                        ]
                    });
                networkUtils.openUrl(window.location.origin + detailViewUrl, '_blank'); //No I18N
            }
        },
        showDuplicateRecordDetail: function ($this, errorDetails) {
            this.crmShowDuplicateRecordDetail($this, errorDetails, this.getDuplicateRecordDetailsPopoverNode());
        },
        hideDuplicateRecordDetail: function (ev) {
            this.crmhideDuplicateRecordDetail(ev, this.getDuplicateRecordDetailsPopoverNode());
        }
    },
    getDuplicateRecordDetailsPopoverNode: function () {
        return this.$node.querySelector(`#cxCrmDuplicateInfoPopover${this.data.currentInstObjKey}`);//No I18N
    },
    getFormToJSONData: function (formData) {
        if (formData && formData.$ && formData.$.toJSON) {
            let subformJsonData = {};
            let relationsObject = formData.$.model.relations || {};
            for (let relationKey in relationsObject) {
                let relationArray = relationsObject[relationKey] || [];
                relationArray.forEach((eachRelation) => {
                    if (eachRelation && eachRelation.cusRelationFldType === "subform" && eachRelation.relKey && formData[eachRelation.relKey] && formData[eachRelation.relKey].length) {
                        let subformDataArray = [];
                        formData[eachRelation.relKey].forEach((eachSubformRecord) => {
                            if (eachSubformRecord && eachSubformRecord.$ && eachSubformRecord.$.toJSON) {
                                let _toJSONData = eachSubformRecord.$.toJSON();
                                if (_toJSONData && _toJSONData.__parent_module__) {
                                    delete _toJSONData.__parent_module__;
                                }
                                subformDataArray.push(_toJSONData);
                            } else {
                                subformDataArray.push(eachSubformRecord);
                            }
                        });
                        subformJsonData[eachRelation.relKey] = subformDataArray;
                    }
                });
            }
            formData = formData.$.toJSON();
            for (let eachSubformKey in subformJsonData) {
                formData[eachSubformKey] = subformJsonData[eachSubformKey];
            }
        }
        return formData;
    },
    executeMethodHandler: async function (methodName, callBackDataObject) {
        if (this.getMethods(methodName)) {
            let newCBObject = $L.extend(true, {}, callBackDataObject);
            let argsTobeRemoved = ['allFieldMetaDetails'];
            argsTobeRemoved.forEach((eachArg) => {
                if (newCBObject.hasOwnProperty(eachArg)) {
                    delete newCBObject[eachArg];
                }
            });
            if (newCBObject.hasOwnProperty('formData')) {
                if (!['onFormSave', 'onFormAfterSave'].includes(methodName)) {
                    delete newCBObject.formData;
                } else {
                    let formData;
                    try {
                        formData = this.getFormToJSONData(newCBObject.formData);
                    } catch (e) {
                        formData = newCBObject.formData;
                    }
                    newCBObject.formData = formData;
                }
            }
            let keyOrder = [
                "formData", "currentButtonObj", "fieldValue", "subformApiname",
                "saveResponse", "apiName", "rowId", "value", "id", "moduleId", "queryParams",
                "fromModal", "fromSubform", "selectedLayoutId", "contentWrapperClass", "selectedLayoutName"
            ];
            let orderedValues = keyOrder.filter(key => key in newCBObject).map(key => newCBObject[key]);
            if (methodName === 'onQuickCreateClick' && !newCBObject.hasOwnProperty('fromSubform')) {
                orderedValues.push(false);
            }
            if (newCBObject.hasOwnProperty('fieldMeta') && newCBObject.fieldMeta.api_name) {
                orderedValues.push(newCBObject.fieldMeta.api_name);
            } else if (newCBObject.hasOwnProperty('cxPropFieldData') && newCBObject.cxPropFieldData.api_name) {
                orderedValues.push(newCBObject.cxPropFieldData.api_name);
            }
            if (methodName === 'onQuickCreateClick' && newCBObject.hasOwnProperty('subSectionCurntInstObj') && newCBObject.subSectionCurntInstObj.subform_apiname) {
                orderedValues.push(newCBObject.subSectionCurntInstObj.subform_apiname);
            }
            let returnedValue;
            if (callBackDataObject.isQuickCreate) {
                callBackDataObject.layoutComponentData = this.data.cxPropLayoutComponentData;
                returnedValue = await this.executeMethod(methodName, callBackDataObject);
            } else {
                returnedValue = await this.executeMethod(methodName, ...orderedValues);
            }
            if (returnedValue === false &&
                (
                    [
                        'onFormBeforeSave',
                        'onFormSave',
                        'onFormAfterSave',
                        'onFormCancel',
                        'onQuickCreateClick',
                        'onFormLayoutSwitch',
                        'onFormBeforeDestroy'
                    ].includes(methodName)
                )
            ) {
                return false;
            }
        }
        return new Promise(async (resolve) => {
            let layoutComponentData = this.data.cxPropLayoutComponentData;
            switch (methodName) {
                case "fetchLookupModuleData": {
                    let moduleResp = await this.fetchLookupModuleData(callBackDataObject, layoutComponentData);
                    resolve(moduleResp || {});
                    break;
                }
                case "fetchLookupRecords": {
                    let getRecordsResp = await this.fetchLookupRecordsData(callBackDataObject, layoutComponentData);
                    resolve(getRecordsResp || {});
                    break;
                }
                case "onFormSave": {
                    callBackDataObject.moduleId = layoutComponentData.cxPropModuleId || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.id);
                    callBackDataObject.moduleName = layoutComponentData.cxPropModuleName || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name);
                    callBackDataObject.currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;
                    let recordSaveResp = await this.saveCurrentForm(callBackDataObject, layoutComponentData.isQuickCreate, layoutComponentData);
                    resolve(recordSaveResp || {});
                    break;
                }
                case "formFieldOfLookup": {
                    callBackDataObject.layoutComponentDomNode = layoutComponentData.layoutComponentDomNode;
                    let recordSaveResp = await this.setFieldOfLookupData(callBackDataObject);
                    resolve(recordSaveResp || {});
                    break;
                }
                case 'onFormAfterSave': {
                    let isSaveAndNew = false;
                    if (callBackDataObject.currentButtonObj && callBackDataObject.currentButtonObj.name === 'saveAndNew') { //no i18n
                        isSaveAndNew = true;
                    }
                    let message = this.setSaveResponseInMessage(callBackDataObject, layoutComponentData, isSaveAndNew);
                    if (isSaveAndNew) {
                        _cruxUtils.showCustomMessage({
                            params: {
                                ltPropMessage: message,
                                ltPropType: "success", //no i18n
                                ltPropDuration: 3000
                            }
                        });
                        this.$node.refresh({
                            cxPropMode: 'create',
                            cxPropModuleApiName: layoutComponentData.cxPropModuleApiName
                        });
                    }
                    break;
                }
                case 'onQuickCreateClick': {
                    let quickCreateClickResp = await this.openQuickCreateForm(callBackDataObject);
                    resolve(quickCreateClickResp || {});
                    break;
                }
                case 'onFormLayoutSwitch': {
                    callBackDataObject.crmCxoriginalLayoutComponentData = $L.extend(true, {}, (this.data.originalLayoutComponentData || {}));
                    let layoutSwitchResp = await this.layoutSwitchHanlder(callBackDataObject);
                    resolve(layoutSwitchResp || {});
                    break;
                }
                case 'executeVrFunction': {
                    let vrDataArray = callBackDataObject.jsonData || [],
                        filterUiTypeDataObject = {
                            currentPage: this.data.cxPropCurrentPage || layoutComponentData.currentInstObjKey,
                            currentInstObjKey: layoutComponentData.currentInstObjKey,
                            fieldIdVsMetaObject: layoutComponentData.cxInternalUtilityObj.layoutFieldIdVsMetaObject || {},
                            subFormFieldIdVsMetaObject: layoutComponentData.cxInternalUtilityObj.subFormFieldIdVsMetaObject || {},
                            isVR: true,
                            recordObj: callBackDataObject && callBackDataObject.formData || this.data.cxPropFormData,
                            currentSections: this.data.cxPropLayoutSections || layoutComponentData.cxPropLayoutSections
                        }
                    vrDataArray.forEach(eachVrData => {
                        try {
                            let recordForFunction = this.filterValidUITypesInRecord(filterUiTypeDataObject);
                            eachVrData.record = recordForFunction;
                        } catch (e) {
                            callBackDataObject.isExceptionOccured = true;
                        }
                    });
                    let vrFunctionResp = await this.executeVrFunction(callBackDataObject);
                    resolve(vrFunctionResp || {});
                    break;
                }
                case 'onVrFunctionResponse': {
                    let vrFunctionsObject = callBackDataObject || {};
                    vrFunctionsObject.moduleName = layoutComponentData.cxPropModuleData.module_name;
                    let vrDetailsOj = this.parseAndHandleVRFunctionResponse(vrFunctionsObject, layoutComponentData);
                    resolve(vrDetailsOj);
                    break;
                }
                case 'onFormFailureResponse': {
                    let failureResponse = callBackDataObject || {};
                    this.handleFormFailureResponse(failureResponse, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormAfterRender': {
                    let cbDataObject = callBackDataObject || {};
                    this.handleFormAfterRender(cbDataObject, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormValueChange': {
                    let cbDataObject = callBackDataObject || {};
                    this.handleFormValueChange(cbDataObject, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormBeforeRender': {
                    let cbDataObject = callBackDataObject || {},
                        fieldApiVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.fieldApiVsMetaObject || {},
                        fieldDatatypeVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.fieldDatatypeVsMetaObject || {};
                    this.disableQuickCreateForLookupField({ fieldDatatypeVsMetaObject }, layoutComponentData, 'formConfigurations');
                    let subformFieldDatatypeVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.subFormFieldDatatypeVsMetaObject || {};
                    for (let subformKey in subformFieldDatatypeVsMetaObject) {
                        this.disableQuickCreateForLookupField({ fieldDatatypeVsMetaObject: subformFieldDatatypeVsMetaObject[subformKey] }, layoutComponentData, 'subformConfigurations', subformKey);
                        let subformField = fieldApiVsMetaObject[subformKey];
                        if (subformField !== undefined && subformField.subform !== undefined && subformField.subform.id !== undefined) {
                            let subformModuleData = store.peekRecord('module', subformField.subform.id);//no i18n
                            if (subformModuleData) {
                                let permissionsDetails = this.getSubformPermissionDetails(subformModuleData, subformKey, layoutComponentData.cxPropFormData);
                                let finalPermissons = layoutComponentData.subformPermissions || {};
                                finalPermissons[subformKey] = permissionsDetails;
                                layoutComponentData.subformPermissions = finalPermissons;
                            }
                        }
                    }
                    this.setFieldZcqaValue({ fieldApiVsMetaObject }, layoutComponentData, 'formConfigurations');
                    this.setCruxTypeValue({ fieldDatatypeVsMetaObject }, layoutComponentData, 'formConfigurations');
                    resolve();
                    break;
                }
                case 'onInstanceObjKeyCreation': {
                    let { currentInstObjKey } = callBackDataObject || {};
                    this.setData('currentInstObjKey', currentInstObjKey);
                    resolve();
                    break;
                }
                default:
                    resolve("NO_MATCHING_CALLBACKS");
                    break;
            }
        });
    },
    getSubformPermissionDetails: function (subformModuleData, subformKey, cxPropFormData) {
        let subformPermissions = {};
        if (subformModuleData && subformModuleData.module_name && typeof moduleRecordMapping !== "undefined" && moduleRecordMapping[subformModuleData.module_name]) {
            subformModuleData = moduleRecordMapping[subformModuleData.module_name];
        }
        if (subformModuleData) {
            subformPermissions = {
                "viewable": subformModuleData.viewable,
                "editable": subformModuleData.editable,
                "creatable": subformModuleData.creatable,
                "deletable": subformModuleData.deletable
            };
            if (!subformModuleData.editable) {
                if (!subformModuleData.creatable && !subformModuleData.deletable) {
                    subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.view');//no i18n
                }
                else if (cxPropFormData && cxPropFormData[subformKey] && cxPropFormData[subformKey].length > 0) {
                    subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.edit');//no i18n
                }
            }
            if (cxPropFormData && cxPropFormData[subformKey] && cxPropFormData[subformKey].length === 0 && !subformModuleData.creatable) {
                subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.create');//no i18n
            }
        }
        return subformPermissions;
    },
    actual_init: function () {
        let layoutCompData = this.data.cxPropLayoutComponentData;
        let dataProps = this.getExposedCXPropertiesList(),
            crmUserDetails = typeof Crm != "undefined" && Crm.userDetails;
        dataProps.forEach((dataProps) => {
            if (layoutCompData.hasOwnProperty(dataProps)) {
                this.data[dataProps] = layoutCompData[dataProps];
            }
        });
        layoutCompData.crmCruxCreateFormDomNode = this.$node;
        layoutCompData.isFromCrmWrapperComponent = true;
        if (!layoutCompData.cxPropUserCurrencyData) {
            layoutCompData.cxPropUserCurrencyData = typeof Crm != "undefined" ? Crm.userDetails.CURRENCY_DETAILS : {};
        }
        if (!layoutCompData.cxPropCurrencyData) {
            try {
                let cxPropCurrencyData = this.getCurrencyData(undefined, this.data.cxPropRecordData);
                if (cxPropCurrencyData) {
                    layoutCompData.cxPropCurrencyData = cxPropCurrencyData;
                    layoutCompData.cxPropCurrencySymbol = cxPropCurrencyData.symbol;
                    layoutCompData.cxPropCurrencyKey = cxPropCurrencyData.key;
                }
            } catch (e) {
                layoutCompData.cxPropCurrencyData = {};
            }
        }
        if (this.isEmptyObj(layoutCompData.customFieldComponents)) {
            let customFieldComponents = {},
                componentInfo = {
                    componentName: 'crux-text-component',
                    isCruxComponent: true,
                    cxPropData: JSON.stringify({
                        appearance: 'box',
                        from: 'create',
                        disabled: true,
                        tooltip: 'unsupported field'
                    })
                };
            customFieldComponents.data_type = {
                "multiselectlookup": Lyte.deepCopyObject(componentInfo),
                "fileupload": Lyte.deepCopyObject(componentInfo),
                "imageupload": Lyte.deepCopyObject(componentInfo)
            };
            customFieldComponents.ui_type = {
                250: Lyte.deepCopyObject(componentInfo)
            };
            layoutCompData.customFieldComponents = customFieldComponents;
        }
        if (layoutCompData.cxPropCurrentPage === "create" && this.data.cxPropFormData && !this.data.cxPropFormData.hasOwnProperty('Owner')) {
            let userDataDetails = this.getDefaultUserDetail(crmUserDetails);
            if (userDataDetails && userDataDetails.id && userDataDetails.name) {
                Lyte.Component.set(this.data.cxPropFormData, 'Owner', userDataDetails);
            }
        }
        /*
        if (!this.data.showLoading) {
            //temp fix for multiple parallel rendering issue
            this.setData('showLoading', true);//No i18N
        }
        */
        this.setData('showLoading', false);
    },
    actual_didConnect: function () {
        let layoutCompData = this.data.cxPropLayoutComponentData,
            cxUtilityObj = layoutCompData.cxInternalUtilityObj || {};
        this.registerUtilityMethods(this.data.cxPropLayoutComponentData.layoutComponentDomNode);
        if (cxUtilityObj.currentInstObjKey) {
            let class_list = this.getData('class');//no i18n
            class_list = class_list || "";//No i18N
            try {
                let existingClass = this.$node.getAttribute('class') || '';
                existingClass = existingClass.trim();
                if (existingClass && class_list.indexOf(existingClass) === -1) {
                    class_list += ` ${existingClass}`;//No i18N
                }
            } catch (e) {
                class_list = class_list || "";//No i18N
            }
            cxUtilityObj.crmCruxFormCompSelectorValue = `.crmCruxComp${cxUtilityObj.currentInstObjKey}`;
            let fullClassValue = class_list.trim(), classArr = fullClassValue.split(' '), oldCrmInstObjClass;
            classArr.forEach(eachClass => {
                if (eachClass) {
                    oldCrmInstObjClass = eachClass.indexOf('cxInstObj') !== -1 ? eachClass : "";
                }
            });
            let newcrmInstanceClassValue = `crmCruxComp${cxUtilityObj.currentInstObjKey}`;
            if (oldCrmInstObjClass && oldCrmInstObjClass !== newcrmInstanceClassValue) {
                class_list = class_list.replaceAll(oldCrmInstObjClass, '');
            }
            class_list += ` ${newcrmInstanceClassValue}`;//No i18N
            this.setData('class', class_list.trim());//No i18N
        }
        delete this._l__rendering__inprogress_flag;
        delete this._m__rendering__inprogress_flag;
    },
    setFieldZcqaValue: function (dataObject, layoutComponentData, formConfigurationsKey) {
        dataObject = dataObject || {};
        let fieldApiVsMetaObject = dataObject.fieldApiVsMetaObject || {},
            currentModuleName = layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name || "";
        if (fieldApiVsMetaObject && Object.keys(fieldApiVsMetaObject).length) {
            let finalFormConfig = layoutComponentData[formConfigurationsKey] || {};
            for (let fieldKey in fieldApiVsMetaObject) {
                let fieldMetaObject = fieldApiVsMetaObject[fieldKey];
                let isValidFieldToUpdate = !fieldMetaObject.custom_field && !(!fieldMetaObject.custom_field && currentModuleName.indexOf('LinkingModule') >= 0 && fieldMetaObject.data_type === "lookup");
                if (isValidFieldToUpdate) {
                    if (!finalFormConfig.hasOwnProperty('api_name')) {
                        finalFormConfig.api_name = {};
                    }
                    if (finalFormConfig.api_name && !finalFormConfig.api_name.hasOwnProperty(fieldMetaObject.api_name)) {
                        finalFormConfig.api_name[fieldMetaObject.api_name] = {};
                    }
                    finalFormConfig.api_name[fieldMetaObject.api_name].fieldZcqaValue = fieldMetaObject.column_name;
                }
            }
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    setCruxTypeValue: function (dataObject, layoutComponentData, formConfigurationsKey) {
        dataObject = dataObject || {};
        let fldDatatypeVsMetaObject = dataObject.fieldDatatypeVsMetaObject || {},
            userDetails = typeof Crm !== "undefined" && Crm.userDetails || {}, //No I18n
            isGrouperRadioComponentSupported = userDetails && userDetails.isRadioButtonAndSliderEnabled && userDetails.isRadioFieldSupported;
        let existingFormConfig = layoutComponentData[formConfigurationsKey] || {};
        let finalFormConfig = existingFormConfig;
        if (isGrouperRadioComponentSupported && fldDatatypeVsMetaObject.picklist &&
            Array.isArray(fldDatatypeVsMetaObject.picklist) && fldDatatypeVsMetaObject.picklist.length) {
            fldDatatypeVsMetaObject.picklist.forEach(eachPicklistField => {
                if (eachPicklistField && eachPicklistField.ui_type === 2 && eachPicklistField.display_format) {
                    if (!finalFormConfig.hasOwnProperty('api_name')) {
                        finalFormConfig.api_name = {};
                    }
                    if (finalFormConfig.api_name && !finalFormConfig.api_name.hasOwnProperty(eachPicklistField.api_name)) {
                        finalFormConfig.api_name[eachPicklistField.api_name] = {};
                    }
                    finalFormConfig.api_name[eachPicklistField.api_name].cruxType = "grouper-radio";
                    finalFormConfig.api_name[eachPicklistField.api_name].isDisplayFormatEnabled = true;
                }
            });
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    disableQuickCreateForLookupField: function (dataObject, layoutComponentData, formConfigurationsKey, subformKey) {
        dataObject = dataObject || {};
        let fldDatatypeVsMetaObject = dataObject.fieldDatatypeVsMetaObject || {};
        if (fldDatatypeVsMetaObject.lookup && Array.isArray(fldDatatypeVsMetaObject.lookup) && fldDatatypeVsMetaObject.lookup.length) {
            let existingFormConfig = layoutComponentData[formConfigurationsKey] || {};
            let finalFormConfig = existingFormConfig;
            if (subformKey) {
                existingFormConfig = existingFormConfig[subformKey] || {};
            }
            fldDatatypeVsMetaObject.lookup.forEach(eachLookupField => {
                if (eachLookupField && eachLookupField.lookup && eachLookupField.lookup.module && eachLookupField.lookup.module.id) {
                    let lookupModuleName, lookupModuleInfo = store.peekRecord('module', eachLookupField.lookup.module.id);
                    if (lookupModuleInfo && lookupModuleInfo.module_name) {
                        lookupModuleName = lookupModuleInfo.module_name;
                    } else if (eachLookupField.lookup.module.api_name) {
                        lookupModuleName = eachLookupField.lookup.module.api_name;
                    }
                    if (lookupModuleName === 'Campaigns') {
                        if (!existingFormConfig.hasOwnProperty('api_name')) {
                            existingFormConfig.api_name = {};
                        }
                        if (existingFormConfig.api_name && !existingFormConfig.api_name.hasOwnProperty(eachLookupField.api_name)) {
                            existingFormConfig.api_name[eachLookupField.api_name] = {};
                        }
                        existingFormConfig.api_name[eachLookupField.api_name].isLookupQuickCreateSupported = false;
                    }
                }
            });
            if (subformKey) {
                finalFormConfig[subformKey] = existingFormConfig;
            }
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    registerUtilityMethods: function (layoutComponentDomNode) {
        /**
         * This utility function can be used to set the data into the form.
         * @utility setFormData
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { object } formData - The data to be set into the form.
         */
        this.$node.setFormData = (customData) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            layoutComponentDomNode.setFormData(customData);
        };
        /**
         * This utility function can be used to get the data of the form.
         * @utility getFormData
         * @author kuralarasan.s
         * @version 1.0.0
         */
        this.$node.getFormData = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getFormData();
        };
        this.$node.getFormDirtyAttributes = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getFormDirtyAttributes();
        };
        /**
         * This utility function can be used to get the subform data of the form. By default all subform data will be returned. If we need to a get a particular subform data, we can pass the subform api name as a parameter.
         * @utility getSubFormData
         * @author kuralarasan.s
         * @param { string } subformApiName - The api name of the subform for which the data is to be fetched.
         * @version 1.0.0
         */
        this.$node.getSubFormData = (subformApiName) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (subformApiName) {
                customData.subformApiName = subformApiName;
                customData.getAllSubformData = false;
            }
            return layoutComponentDomNode.getSubFormData(customData);
        };
        /**
         * This utility function can be used to validate the form.
         * @utility validateForm
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { boolean } validateSubform - If this parameter is passed as false, then the subform will not be validated.
         * @param { boolean } validateAndSave - If this parameter is passed as false, then the form will be validated but not saved.
         */
        this.$node.validateForm = (validateSubform, validateAndSave) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (validateSubform !== undefined) {
                customData.validateSubform = validateSubform;
            }
            if (validateAndSave !== undefined) {
                customData.validateAndSave = validateAndSave;
            }
            return layoutComponentDomNode.validateForm(customData);
        };
        /**
         * This utility function can be used to validate the subform.
         * @utility validateSubform
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { string } subformApiName - The api name of the subform for which the data is to be validated.
         */
        this.$node.validateSubform = (subformApiName) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (subformApiName) {
                customData.subformApiName = subformApiName;
            }
            return layoutComponentDomNode.validateSubform(customData);
        };
        /**
         * This utility function can be used to destroy the form.
         * @utility destroyComponent
         * @author kuralarasan.s
         * @version 1.0.0
         */
        this.$node.destroyComponent = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            layoutComponentDomNode.destroyComponent();
        };
        this.$node.getContentWrapperClass = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getContentWrapperClass();
        };
    },
    getExposedCXPropertiesList: function () {
        return ['cxPropCurrentPage',
            'cxPropModuleData',
            'cxPropLayoutRulesRequired',
            'cxPropValidationRulesRequired',
            'cxPropRecordData',
            'cxPropRecordId',
            'cxPropOutletValue',
            'cxPropModuleId',
            'cxPropModuleApiName',
            'cxPropLayoutName',
            'cxPropLayoutSections',
            'cxPropLayoutData',
            'cxPropLayoutId',
            'cxPropFormData'];
    },
    // filterValidUITypes: async function (recordData, currentPage, moduleFields, argumentsObj = {}) {
    //     let lyteScope = window.Lyte || Lyte,
    //         recordForFunction = {};
    //     if (lyteScope) {
    //         try {
    //             if (!lyteScope.registeredMixins['crm-create-mixin']) {
    //                 await Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-create-mixin.js'], ResourceConstants.CRMClient)]);
    //             }
    //             if (lyteScope.registeredMixins['crm-create-mixin']) {
    //                 recordForFunction = lyteScope.registeredMixins['crm-create-mixin'].filterValidUITypes(recordData, currentPage, moduleFields, argumentsObj);//no i18n
    //                 return recordForFunction;
    //             }
    //         } catch (exception) {
    //             argumentsObj.isExceptionOccured = true;
    //             argumentsObj.exception = exception;
    //         }
    //     }
    //     return recordForFunction
    // }
}, {
    mixins: [
        "crm-crux-create-base-mixin",//No I18n
        "crm-crux-create-requesthandler-mixin"//No I18n
    ],
    'alias': 'crm-create-form'
});

/**
* @syntax nonYielded
<crm-create-form
cx-prop-content-overflow="true"
cx-prop-layout-information-type="layoutData"
cx-prop-module-information-type="moduleData"
cx-prop-module-data='{"module_name":"DemoLead","api_name":"Demo_Lead","id":"111113000000002405","creatable":true,"editable":true,"profiles":[{"name":"Administrator","id":"111113000000000423"},{"name":"Standard","id":"111113000000000425"}],"layouts":[{"name":"Standard","display_label":"Standard","id":"111113000000003315","profiles":[{"default":true,"name":"Administrator","id":"111113000000000423","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}},{"default":true,"name":"Standard","id":"111113000000000425","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}}],"generated_type":"system","source":"crm","status":"active","visible":true}]}'
cx-prop-layout-data='{"id":"111113000000003315","sections":[{"api_name":"DemoLead Information","column_count":2,"name":"DemoLead Information","display_label":"DemoLead Information","sequence_number":2,"tab_traversal":2,"type":"used","fields":[{"api_name":"Owner","sequence_number":3,"pick_list_values":[],"required":false,"length":120,"id":"111113000000004385","data_type":"ownerlookup","custom_field":false,"ui_type":8,"display_label":"DemoLead Owner","field_label":"DemoLead Owner","json_type":"jsonobject","column_name":"SMOWNERID","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Company","sequence_number":2,"pick_list_values":[],"required":true,"length":200,"id":"111113000000004387","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Company","field_label":"Company","json_type":"string","column_name":"COMPANY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},{"api_name":"First_Name","sequence_number":2,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","maps":[],"colour_code":null,"actual_value":"-None-","id":"111113000000017423","type":"used"},{"display_value":"Mr.","sequence_number":2,"reference_value":"Mr.","maps":[],"colour_code":null,"actual_value":"Mr.","id":"111113000000017426","type":"used"},{"display_value":"Mrs.","sequence_number":3,"reference_value":"Mrs.","maps":[],"colour_code":null,"actual_value":"Mrs.","id":"111113000000017429","type":"used"},{"display_value":"Ms.","sequence_number":4,"reference_value":"Ms.","maps":[],"colour_code":null,"actual_value":"Ms.","id":"111113000000017432","type":"used"}],"required":false,"length":40,"id":"111113000000004389","data_type":"text","custom_field":false,"ui_type":27,"display_label":"First Name","field_label":"First Name","json_type":"string","column_name":"FIRSTNAME","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Salutation","sequence_number":3,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017423","type":"used"},{"display_value":"Mr.","sequence_number":2,"reference_value":"Mr.","colour_code":null,"actual_value":"Mr.","id":"111113000000017426","type":"used"},{"display_value":"Mrs.","sequence_number":3,"reference_value":"Mrs.","colour_code":null,"actual_value":"Mrs.","id":"111113000000017429","type":"used"},{"display_value":"Ms.","sequence_number":4,"reference_value":"Ms.","colour_code":null,"actual_value":"Ms.","id":"111113000000017432","type":"used"}],"required":false,"length":25,"id":"111113000000004441","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"Salutation","field_label":"Salutation","json_type":"string","column_name":"SALUTATION","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Last_Name","sequence_number":1,"pick_list_values":[],"required":true,"length":80,"id":"111113000000004391","data_type":"text","custom_field":false,"ui_type":127,"display_label":"Last Name","field_label":"Last Name","json_type":"string","column_name":"LASTNAME","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Full_Name","sequence_number":4,"pick_list_values":[],"required":false,"length":120,"id":"111113000000004393","data_type":"text","custom_field":false,"ui_type":1,"display_label":"DemoLead Name","field_label":"DemoLead Name","json_type":"string","column_name":"FULLNAME","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":false,"quick_create":false,"create":false},"visible":true},{"api_name":"Designation","sequence_number":5,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004395","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Designation","field_label":"Title","json_type":"string","column_name":"DESIGNATION","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Email","sequence_number":4,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004397","data_type":"email","custom_field":false,"ui_type":25,"display_label":"Email","field_label":"Email","json_type":"string","column_name":"EMAIL","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Phone","sequence_number":5,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004399","data_type":"phone","custom_field":false,"ui_type":33,"display_label":"Phone","field_label":"Phone","json_type":"string","column_name":"PHONE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},{"api_name":"Fax","sequence_number":8,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004401","data_type":"text","custom_field":false,"ui_type":35,"display_label":"Fax","field_label":"Fax","json_type":"string","column_name":"FAX","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Mobile","sequence_number":6,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004403","data_type":"phone","custom_field":false,"ui_type":33,"display_label":"Mobile","field_label":"Mobile","json_type":"string","column_name":"MOBILE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Website","sequence_number":10,"pick_list_values":[],"required":false,"length":255,"id":"111113000000004405","data_type":"website","custom_field":false,"ui_type":21,"display_label":"Website","field_label":"Website","json_type":"string","column_name":"WEBSITE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},
{"api_name":"Lead_Source","sequence_number":11,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017228","type":"used"},{"display_value":"Advertisement","sequence_number":2,"reference_value":"Advertisement","colour_code":null,"actual_value":"Advertisement","id":"111113000000017231","type":"used"},{"display_value":"Cold Call","sequence_number":3,"reference_value":"Cold Call","colour_code":null,"actual_value":"Cold Call","id":"111113000000017234","type":"used"},{"display_value":"Employee Referral","sequence_number":4,"reference_value":"Employee Referral","colour_code":null,"actual_value":"Employee Referral","id":"111113000000017237","type":"used"}],"required":false,"length":120,"id":"111113000000004407","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"DemoLead Source","field_label":"DemoLead Source","json_type":"string","column_name":"LEADSOURCE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},
{"api_name":"Lead_Status","sequence_number":7,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017300","type":"used"},{"display_value":"Attempted to Contact","sequence_number":2,"reference_value":"Attempted to Contact","colour_code":"#add9ff","actual_value":"Attempted to Contact","id":"111113000000017294","type":"used"},{"display_value":"Contact in Future","sequence_number":3,"reference_value":"Contact in Future","colour_code":"#f8e199","actual_value":"Contact in Future","id":"111113000000017288","type":"used"},{"display_value":"Contacted","sequence_number":4,"reference_value":"Contacted","colour_code":"#ffd6bc","actual_value":"Contacted","id":"111113000000017285","type":"used"}],"required":false,"length":120,"id":"111113000000004409","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"DemoLead Status","field_label":"DemoLead Status","json_type":"string","column_name":"STATUS","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Industry","sequence_number":13,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017309","type":"used"},{"display_value":"ASP (Application Service Provider)","sequence_number":2,"reference_value":"ASP (Application Service Provider)","colour_code":null,"actual_value":"ASP (Application Service Provider)","id":"111113000000017312","type":"used"},{"display_value":"Data/Telecom OEM","sequence_number":3,"reference_value":"Data/Telecom OEM","colour_code":null,"actual_value":"Data/Telecom OEM","id":"111113000000017330","type":"used"},{"display_value":"ERP (Enterprise Resource Planning)","sequence_number":4,"reference_value":"ERP (Enterprise Resource Planning)","colour_code":null,"actual_value":"ERP (Enterprise Resource Planning)","id":"111113000000017339","type":"used"}],"required":false,"length":120,"id":"111113000000004411","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"Industry","field_label":"Industry","json_type":"string","column_name":"INDUSTRY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]},
{"api_name":"Address Information","column_count":2,"name":"Address Information","display_label":"Address Information","sequence_number":2,"tab_traversal":2,"type":"used","fields":[{"api_name":"Street","sequence_number":1,"pick_list_values":[],"required":false,"length":250,"id":"111113000000004491","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Street","field_label":"Street","json_type":"string","column_name":"LANE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"City","sequence_number":2,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004493","data_type":"text","custom_field":false,"ui_type":1,"display_label":"City","field_label":"City","json_type":"string","column_name":"CITY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"State","sequence_number":3,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004495","data_type":"text","custom_field":false,"ui_type":1,"display_label":"State","field_label":"State","json_type":"string","column_name":"STATE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Zip_Code","sequence_number":4,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004497","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Zip Code","field_label":"Zip Code","json_type":"string","column_name":"CODE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Country","sequence_number":5,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004499","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Country","field_label":"Country","json_type":"string","column_name":"COUNTRY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]},
{"api_name":"Description Information","column_count":1,"name":"Description Information","display_label":"Description Information","sequence_number":2,"tab_traversal":1,"type":"used","fields":[{"api_name":"Description","sequence_number":1,"pick_list_values":[],"required":false,"length":32000,"id":"111113000000004501","data_type":"textarea","custom_field":false,"ui_type":3,"display_label":"Description","field_label":"Description","json_type":"string","column_name":"DESCRIPTION","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]}]}'>
</crm-create-form>
*/
//# sourceMappingURL=crm-crux-create-form.js.map