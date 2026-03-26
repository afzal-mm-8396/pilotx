Lyte.Mixin.register("crux-create-validators-mixin", {
    emailRegex: /^[\p{L}\p{M}\p{N}_]([\p{L}\p{M}\p{N}!#$%&'*+\-/=?^_`{|}~.]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([-_]*[\p{L}\p{M}\p{N}])*)[.])+[\p{L}\p{M}]{2,22}$/,  //No I18N
    emailRegexOfUser: /^[\w](['A-Za-z0-9._%\-+]*@[A-Za-z0-9-]+(\.[a-zA-Z0-9-]{1,30}){0,9}\.[a-zA-Z]{2,22})$/,
    cxFormTwitteridValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.isValidTwitter(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormEmailValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.cxFormIsValidEmail(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormIsValidEmail: function (emailId) {
        if (emailId == "") {
            return true;
        } else if (emailId == undefined) {
            return false;
        }
        var objRegExp = new XRegExp(this.emailRegex.source, "i");//No I18N
        return XRegExp.test(emailId.trim(), objRegExp);
    },
    cxFormWebsiteValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.isValidWebUrl(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormPhonenumValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps) {
                if (!this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                    return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
                }
                isValid = this.isValidPhoneNo(fieldValue, fieldListProps.fieldLength);
                return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
            }
        }
        return true;
    },
    cxFormDecimalValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var isValidDecimal = this.isValidDecimal(fieldValue);
            if (!isValidDecimal) {
                return { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
            }
            var fieldListProps = customData.fieldProperties;
            if (!this.cxFormHaveValidLength(fieldListProps, fieldValue, true)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            if (fieldListProps) {
                isValid = this.decimalLengthCheck(fieldValue, { decimal_place: fieldListProps.decimalPlace });
                return isValid ? isValid : { code: "ERR04", message: Lyte.errorCodes.ERR04, allowedDecimal: fieldListProps.decimalPlace, fieldValue: fieldValue };//no i18n
            }
        }
        return true;
    },
    cxFormPicklistValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue;
        var fieldListProps = customData.fieldProperties;
        if (fieldListProps
            && fieldListProps.mandatory && fieldValue == "-None-") {
            return { code: "ERR02", message: Lyte.errorCodes.ERR02 };//no i18n
        }
        return true;
    },
    cxFormEmptyValueValidation: function (customData) {
        var fieldListProps = customData.fieldProperties; customData = customData || {};
        var fieldName = customData.fieldName, fieldValue = customData.fieldValue;
        if (fieldListProps.mandatory) {
            //survey integration special handling
            if (['Native__Survey__Extn__Survey', 'Native__Survey__Extn__Survey_Department', 'Native__Survey__Extn__Survey_Type'].indexOf(fieldName) !== -1 && (!fieldValue || fieldValue === 'zsurvey___crm__SYSTEM__NONE')) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            }
            if (fieldValue && typeof fieldValue == 'object' && this.isEmptyObj(fieldValue)) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else if (fieldValue && typeof fieldValue == 'string' && !fieldValue.trim()) { //no i18n
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else if (fieldValue && typeof fieldValue == 'string' && fieldListProps.fieldDataType === "multiselectpicklist" && //no i18n
                (fieldValue.indexOf('[') != -1 && fieldValue.indexOf('; ') == -1) && !JSON.parse(fieldValue).length) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else {
                if (fieldValue && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) { //ZCRM-123887
                    return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
                }
                return true;
            }
        }
        return true;
    },
    cxFormIntegerValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (!this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            if (fieldListProps.columnName === "PROBABILITY" && !(fieldValue >= 0 && fieldValue <= 100)) {
                return { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n	
            }
            isValid = this.isValidInteger(String(fieldValue));
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormBasicFieldLengthValidator: function (customData) {
        customData = customData || {};
        var fieldName = customData.fieldName, fieldValue = customData.fieldValue;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && (["string", "double", "integer"].indexOf(fieldListProps.lyteAtrrType) !== -1) && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
        }
        return true;
    },
    cxFormHaveValidLength: function (fieldListProps, fieldValue, skipDot) {
        if (fieldListProps && fieldListProps.fieldLength) {
            fieldValue = Array.isArray(fieldValue) ? fieldValue : fieldValue + '';
            var valLen = fieldValue.length;
            if (skipDot && fieldValue.indexOf(".") !== -1) {
                valLen = valLen ? --valLen : valLen;
            }
            return valLen <= fieldListProps.fieldLength ? true : false;
        }
        return true;
    },
    cxFormFileUploadValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue;
        var fieldListProps = customData.fieldProperties;
        if (fieldListProps) {
            var isEmpty = this.isEmptyObj(fieldValue);
            if (!isEmpty) {
                isEmpty = fieldValue.every((obj) => '_delete' in obj) //no i18n
            }
            if (fieldListProps.mandatory && isEmpty) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02 };//no i18n
            }
        }
        return true;
    },
    registerUtilityMethods: function () {
        this.$node.setFormData = (customData) => {
            this.setFormData(customData);
        };
        this.$node.getFormData = () => {
            return this.getFinalFormData();
        };
        this.$node.getFormDirtyAttributes = () => {
            let layoutCompData = this.data.cxPropLayoutComponentData,
                cxPropFormData = layoutCompData.cxPropFormData,
                cxPropRecordData = this.data.originalLayoutComponentData.cxPropRecordData;
            return this.getCruxFormDirtyAttributes(cxPropFormData, cxPropRecordData);
        };
        this.$node.getSubFormData = (customData) => {
            customData = customData || {};
            return this.getCruxSubFormData(customData);
        };
        this.$node.validateForm = (customData) => {
            customData = customData || {};
            let saveUtilData = { validateCruxCreateForm: true };
            if (!customData.validateCruxSubform) {
                saveUtilData.validateCruxSubform = true;
            }
            if (!customData.validateAndSave) {
                saveUtilData.validateAndSave = false;
            }
            saveUtilData = Object.assign(saveUtilData, customData);
            return this.validateAndSaveForm(saveUtilData);
        };
        this.$node.validateSubform = (customData) => {
            customData = customData || {};
            return this.validateCruxSubformData(customData);
        };
        this.$node.destroyComponent = () => {
            this.destroyComponent(this.data.cxPropLayoutComponentData);
        };
        this.$node.getContentWrapperClass = () => {
            return this.getContWrapperClass(this.data.cxPropLayoutComponentData);
        };
        this.$node.formUiHandler = (customData = {}) => {
            return this.cxFormUiHandler(customData, this.data.cxPropLayoutComponentData);
        };
        this.$node.getFieldDetails = (mappingKey) => {
            return this.getValidFieldDetails(mappingKey, this.data.cxPropLayoutComponentData);
        };
        this.$node.executeValidationRule = (vrFieldDetail) => {
            return this.executeGivenValidationRules(vrFieldDetail, this.data.cxPropLayoutComponentData);
        };
        this.$node.renderErrorYield = (customData = {}) => {
            return this.setDataAndRenderErrorYield(customData, this.data.cxPropLayoutComponentData);
        };
        this.$node.setFormConfigurations = (customData = {}) => {
            let supportedProperties = ['api_name', 'column_name', 'data_type', 'ui_type', 'id'],
                layoutCompData = this.data.cxPropLayoutComponentData,
                currentInstObjKey = layoutCompData.currentInstObjKey,
                _setFormConfigurations = (fieldMetaDetails, currentPropertyObj) => {
                    let instanceObject = fieldMetaDetails && fieldMetaDetails[currentInstObjKey],
                        formconfigCustomData = {};
                    formconfigCustomData.fieldCurntInstObj = instanceObject;
                    formconfigCustomData.fieldSpecificFormConfigData = currentPropertyObj;
                    formconfigCustomData.cxPropFieldData = fieldMetaDetails;
                    if (fieldMetaDetails) {
                        this.setFormConfigurations(formconfigCustomData, layoutCompData);
                    }
                };
            supportedProperties.forEach(prop => {
                if (customData.hasOwnProperty(prop)) {
                    let currentPropertyObj = customData[prop] || {},
                        correspondingMapKey = {
                            api_name: 'layoutFieldApiVsMetaObject',
                            column_name: 'layoutFieldColumnNameVsMetaObject',
                            id: 'layoutFieldIdVsMetaObject',
                            data_type: 'layoutFieldDatatypeVsMetaObject',
                            ui_type: 'layoutFieldUitypeVsMetaObject'
                        },
                        currentMapKey = correspondingMapKey[prop],
                        metaDetails = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj[currentMapKey] || {};
                    if (['api_name', 'column_name', 'id'].indexOf(prop) !== -1) {
                        for (let eachPropKey in currentPropertyObj) {
                            let fieldMetaDetails = metaDetails[eachPropKey];
                            _setFormConfigurations(fieldMetaDetails, currentPropertyObj[eachPropKey]);
                        }
                    } else if (['data_type', 'ui_type'].indexOf(prop) !== -1) {
                        for (let eachPropKey in currentPropertyObj) {
                            let allFieldMetaDetails = metaDetails[eachPropKey];
                            if (allFieldMetaDetails && Array.isArray(allFieldMetaDetails) && allFieldMetaDetails.length) {
                                allFieldMetaDetails.forEach(fieldMetaDetails => {
                                    _setFormConfigurations(fieldMetaDetails, currentPropertyObj[eachPropKey]);
                                });
                            }
                        }
                    }
                }
            });
        };
    }
});
