Lyte.Mixin.register("crux-entity-common-utils", {
    getFieldVal: function (customData) {
        var fieldApiName = customData.fieldMetaDetails.api_name, fieldDatatype = customData.fieldMetaDetails.data_type, formData = customData.cxPropFormData;
        if (customData.executionType !== "failure") {
            if (fieldDatatype === "text" && typeof formData[fieldApiName] === "string") {
                return formData[fieldApiName].trim();
            }
            return formData[fieldApiName];
        } else if (fieldDatatype === "text" && typeof formData[fieldApiName] === "string") { //no i18n
            if (formData[fieldApiName].trim() === "") {
                return undefined;
            }
            return formData[fieldApiName].trim();
        } else if (fieldDatatype === "picklist" && formData[fieldApiName] === "-None-") { //no i18n
            return undefined;
        }
        return formData[fieldApiName];
    },
    getSectionMetaByGivenField: function (customData) {
        var { layoutSections, fieldId } = customData;
        layoutSections = layoutSections || [];
        var layoutSectionsLen = layoutSections.length, sectionMetaData, fieldMetaData;
        for (var k1 = 0; k1 < layoutSectionsLen; k1++) {
            var currentSection = layoutSections[k1];
            if (currentSection.fields) {
                var currntSectionFields = currentSection.fields || [], currntSectionFieldsLen = currntSectionFields.length;
                for (var k2 = 0; k2 < currntSectionFieldsLen; k2++) {
                    var eachCurrntSectionField = currntSectionFields[k2];
                    if (eachCurrntSectionField.id === fieldId) {
                        fieldMetaData = eachCurrntSectionField;
                        sectionMetaData = currentSection; break;
                    }
                }
            }
        }
        return { sectionMetaData: sectionMetaData, fieldMetaData: fieldMetaData };
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
    }
});