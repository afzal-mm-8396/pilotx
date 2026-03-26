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