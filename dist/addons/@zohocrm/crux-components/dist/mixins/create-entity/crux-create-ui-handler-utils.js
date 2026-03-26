Lyte.Mixin.register("crux-create-ui-handler-utils", {
    // customData: {
    //     component_type: 'button',
    //     component_details: {
    //         type: 'Click',
    //         details: {
    //             buttonName: 'Save'
    //         }
    //     }
    // },
    // customData: {
    //     component_type: 'field',
    //     component_details: {
    //         type: 'Read',
    //         details: {
    //             field_name: 'Email'
    //         }
    //     }
    // },
    // $L('crux-createform')[0].formUiHandler({
    //     component_type: 'field',
    //     component_details: {
    //         type: 'Info',
    //         details: {
    //             field_name: 'Website',
    //             field_data: 'ToolTip set via cscript..cscript..cscript'
    //         }
    //     }
    // })
    cxFormUiHandler: function (customData, layoutComponentData) {
        customData = customData || {};
        switch (customData.component_type) {
            case 'button': {
                return this.buttonComponentHandler(customData, { layoutComponentData });
            }
            case 'field': {
                return this.fieldComponentHandler(customData, { layoutComponentData });
            }
        }
    },
    buttonComponentHandler: function (customData, otherData = {}) {
        let actionDetails = customData.component_details || {},
            { layoutComponentData } = otherData,
            givenButtonDetails = actionDetails.details,
            formButtons = layoutComponentData.cxInternalUtilityObj.cxPropButtons,
            currentInstObjKey = layoutComponentData.currentInstObjKey,
            formButtonDetails = formButtons.filter(btn => { return btn.name === givenButtonDetails.name; })[0];
        switch (actionDetails.type) {
            case 'Click': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.click();
                    }
                }
                break;
            }
            case 'Enable': {
                if (formButtonDetails) {
                    Lyte.objectUtils(formButtonDetails, "add", "disabled", false);//no i18n
                }
                break;
            }
            case 'Disable': {
                if (formButtonDetails) {
                    Lyte.objectUtils(formButtonDetails, "add", "disabled", true);//no i18n
                }
                break;
            }
            case 'Show': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.classList.remove('vH');
                    }
                }
                break;
            }
            case 'Hide': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.classList.add('vH');
                    }
                }
                break;
            }
            case 'SetValue': {
                if (formButtonDetails && givenButtonDetails.data) {
                    Lyte.objectUtils(formButtonDetails, "add", "label", givenButtonDetails.data);//no i18n
                }
                break;
            }
            case 'GetValue': {
                if (formButtonDetails) {
                    return formButtonDetails.label;
                }
                break;
            }
            case 'GetAll': {
                if (formButtons && formButtons.length) {
                    return formButtons.map((button) => {
                        if (['cancel', 'saveAndNew', 'save'].includes(button.name)) {
                            return { api_name: button.name, type: 'system' };
                        }
                    });
                }
                break;
            }
        }
    },
    fieldComponentHandler: function (customData, otherData = {}) {
        let componentDetails = customData.component_details || {},
            { layoutComponentData } = otherData,
            givenfieldDetails = componentDetails.details,
            currentInstObjKey = layoutComponentData.currentInstObjKey;

        let fieldMetaInfo = layoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject[givenfieldDetails.name];
        if (!fieldMetaInfo) {
            return { error: `no such field present - ${givenfieldDetails.name}` };
        }
        const { ui_type, api_name } = fieldMetaInfo;
        let formFieldList = layoutComponentData.cxInternalUtilityObj.formFieldList,
            current_formFieldList = formFieldList[api_name];

        if (componentDetails.type === 'setRequired') {
            if (typeof givenfieldDetails.data === "string") {
                givenfieldDetails.data = givenfieldDetails.data === "true";
            }
            componentDetails.type = givenfieldDetails.data ? "Mandate" : "UnMandate";//no i18n
        }
        switch (componentDetails.type) {
            case 'Read': {
                if (layoutComponentData.layoutComponentDomNode) {
                    let fldValue = layoutComponentData.layoutComponentDomNode.getFormData()[givenfieldDetails.name];
                    return fldValue === undefined ? null : fldValue;
                }
                break;
            }
            case 'Write': {
                if (layoutComponentData.layoutComponentDomNode) {
                    let apiName = givenfieldDetails.name, finalObj = {};
                    finalObj[apiName] = givenfieldDetails.data;
                    layoutComponentData.layoutComponentDomNode.setFormData(finalObj);
                }
                break;
            }
            case 'SetCriteria': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'SetSuggestions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'GetSuggestions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'GetOptions': {
                if ([2, 100, 26].includes(ui_type)) {
                    let plValues = fieldMetaInfo[currentInstObjKey].pick_list_values || fieldMetaInfo.pick_list_values;
                    const current_options = new Set(plValues.map(option => option.id));
                    let validOptions = fieldMetaInfo[currentInstObjKey].originalPickListValues || fieldMetaInfo.pick_list_values;
                    return validOptions.map(({ id, display_value, actual_value }) => ({ ...(actual_value !== '-None-' && { id, filtered: !current_options.has(id) }), display_value, actual_value })); // no i18n
                }
                return { error: 'action supported only for picklist and multiselect picklist fields' };//no i18n
            }
            case 'SetOptions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'Error': {
                let errObj = {
                    code: "ERR02",//no i18n
                    isError: true,
                    message: typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(givenfieldDetails.data) : givenfieldDetails.data,//No I18N
                    isCustomError: true,
                    ignoreActualErrorMessage: true
                };
                fieldMetaInfo[currentInstObjKey].fieldErrorDetails = errObj;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                break;
            }
            case 'Mandate': {
                if (current_formFieldList && !current_formFieldList.mandatory) {
                    fieldMetaInfo[currentInstObjKey].isCustomMandatory = true;
                    current_formFieldList.mandatory = true;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'required', true);//no i18n
                    if (!Array.isArray(current_formFieldList.validation)) {
                        current_formFieldList.validation = [];
                    }
                    current_formFieldList.validation.push('cxFormEmptyValueValidation');//no i18n
                    if (fieldMetaInfo.data_type === 'picklist') {
                        current_formFieldList.validation.push('cxFormPicklistValidation');//no i18n
                    }
                }
                break;
            }
            case 'UnMandate': {
                if (current_formFieldList && fieldMetaInfo[currentInstObjKey].isCustomMandatory && (fieldMetaInfo[currentInstObjKey].required || current_formFieldList.mandatory)) {
                    fieldMetaInfo[currentInstObjKey].isCustomMandatory = false;
                    current_formFieldList.mandatory = false;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'required', false);//no i18n
                    fieldMetaInfo[currentInstObjKey].fieldErrorDetails = {};
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                }
                break;
            }
            case 'MaxLength': {
                if (current_formFieldList) {
                    if (fieldMetaInfo.data_type === "fileupload" || fieldMetaInfo.data_type === "imageupload") {
                        return { error: 'unsupported action for fileupload/imageupload fields' };//no i18n
                    }
                    current_formFieldList.fieldLength = givenfieldDetails.data;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'length', givenfieldDetails.data);//no i18n
                }
                break;
            }
            case 'ReadOnly': {
                if (!fieldMetaInfo[currentInstObjKey].isReadonlyByDefault) {
                    if (typeof givenfieldDetails.data === "string") {
                        givenfieldDetails.data = givenfieldDetails.data === "true";
                    }
                    fieldMetaInfo[currentInstObjKey].isCustomReadOnly = givenfieldDetails.data;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'read_only', givenfieldDetails.data);//no i18n
                }
                break;
            }
            case 'Visibility': {
                let value = !!givenfieldDetails.data;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'isCustomHidden', !value);//no i18n
                if (value && !this.isEmptyObj(fieldMetaInfo[currentInstObjKey].fieldErrorDetails)) {
                    fieldMetaInfo[currentInstObjKey].fieldErrorDetails = {};
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                }
                break;
            }
            case 'Info': {
                let ttValue = givenfieldDetails.data === null ? null : { // no i18n
                    name: "Info Icon", // no i18n
                    value: `${givenfieldDetails.data}`
                };
                fieldMetaInfo[currentInstObjKey].tooltip = ttValue;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'setTooltipValue', !fieldMetaInfo[currentInstObjKey].setTooltipValue);//no i18n
                break;
            }
            case 'ToolTip': {
                let ttValue = givenfieldDetails.data === null ? null : { // no i18n
                    name: "Static Text", // no i18n
                    value: `${givenfieldDetails.data}`
                };
                fieldMetaInfo[currentInstObjKey].tooltip = ttValue;
                fieldMetaInfo[currentInstObjKey].ignorePlaceholderValue = givenfieldDetails.ignorePlaceholderValue;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'setTooltipValue', !fieldMetaInfo[currentInstObjKey].setTooltipValue);//no i18n
                delete fieldMetaInfo[currentInstObjKey].ignorePlaceholderValue;
                break;
            }
        }
    }
});