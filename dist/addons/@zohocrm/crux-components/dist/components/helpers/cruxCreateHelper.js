Lyte.Component.registerHelper("cxHelperGetNodeDisplayValue", function (showNode, source, isHiddenInLayoutRules, isCustomHidden) { //No I18n
    var val = "display : ", blockValue = (val + "block !important;"), hiddenValue = (val + "none !important;");//No I18n
    if (source === "section") {
        return showNode ? blockValue : hiddenValue;
    } else if (source === "field") {
        return showNode && !(isHiddenInLayoutRules || isCustomHidden) ? blockValue : hiddenValue;
    }
});
Lyte.Component.registerHelper("cxHelpgetCruxComponentTemplateClass", function (fieldMeta, val, isSubform) { //no i18n
    var classVal = "cxCreateElementCommonClass";
    if (["userlookup", "ownerlookup", "multiuserlookup"].indexOf(fieldMeta.data_type) !== -1) {
        classVal = classVal + " cxClassUserLookup";
    }
    if (!isSubform) {
        classVal = classVal + " cxcreateFormComponentRow cruxFormComponentRow";
    }
    return classVal;
});
Lyte.Component.registerHelper("cxHelpisValuePresent", function (valueToLookFor, stringToBeSplitted) { //no i18n
    //splits the string by comma(,) and looks for value in it
    if (stringToBeSplitted && typeof stringToBeSplitted == "string") {
        return stringToBeSplitted.split(',').indexOf(valueToLookFor) !== -1;
    }
});
Lyte.Component.registerHelper("cxGetSubformFieldWidth", function (subFldMeta, tableOriginalWidth) { //no i18n
    var type = subFldMeta.ui_type, cName = subFldMeta.column_name;
    type = cName === 'SERIAL_NUMBER' ? 'a' : type;//no i18n
    var returnWidth = "195px";//no i18n
    switch (type) {
        case 'a':
            returnWidth = "75px"; //no i18n
            break;
        case 1:
        case 11:
        case 25:
        case 37:
        case 35:
        case 33:
        case 19:
        case 127:
        case 21:
            returnWidth = "265px"; //no i18n
            break;
        case 2:
        case 133:
        case 221:
            returnWidth = tableOriginalWidth >= 1410 ? "195px" : "265px"; //no i18n
            returnWidth = cName === "PRODUCTID" ? "345px" : returnWidth; //no i18n
            break;
        case 110:
        case 100:
        case 3:
            returnWidth = tableOriginalWidth >= 1410 ? "315px" : "365px"; //no i18n
            break;
        case 555:
            returnWidth = tableOriginalWidth >= 1410 ? "315px" : "365px"; //no i18n
            break;
        case 24:
        case 202:
            returnWidth = tableOriginalWidth >= 1410 ? "125px" : "145px"; //no i18n
            break;
        case 333:
            returnWidth = "268px"; //no i18n
            break;
        case 301:
            returnWidth = "91px"; //no i18n
            break;
        case 52:
        case 34:
        case 32:
        case 36:
        case 38:
        case 143:
        case 144:
        case 145:
            returnWidth = tableOriginalWidth >= 1410 ? "160px" : "160px";//no i18n
            var widthObj = { "QUANTITY": "110px", "TAX": "158px", "DISCOUNT": "170px" };//no i18n
            if (widthObj.hasOwnProperty(cName)) {
                returnWidth = widthObj[cName];
            }
            break;
        case 116:
            returnWidth = tableOriginalWidth >= 1410 ? "155px" : "195px";//no i18n
            returnWidth = "NETTOTAL,TOTAL".indexOf(cName) !== -1 ? "171px" : returnWidth;//no i18n
            break;
    }
    return returnWidth;
});
Lyte.Component.registerHelper('cxGetSubformFieldClass', function (subFldMeta) { //no i18n
    var type = subFldMeta.ui_type, cName = subFldMeta.column_name;
    type = cName === 'SERIAL_NUMBER' ? 'a' : type;//no i18n
    switch (type) {
        case 'a':
            return "cxSubFrmSnFld"; //no i18n
        case 1:
        case 11:
        case 25:
        case 37:
        case 35:
        case 33:
        case 19:
        case 127:
        case 21:
            return ""; //no i18n
        case 110:
        case 3:
            return "cxSubFrmMulLinFld"; //no i18n
        case 100:
            return "cxSubFrmMulSelFld"; //no i18n
        case 2:
            return "cxSubFrmSelFld"; //no i18n
        case 24:
        case 202:
            return "cxSubFrmDateFld";//no i18n
        case 333:
            return "cxSubFrmDateAndTimeFld";//no i18n
        case 301:
            return "cxNSubFrmCheckBFld";//no i18n
        case 133:
            var returnClass = "cxSubFrmLookupFld";//no i18n
            if (cName === "PRODUCTID") {
                returnClass += " cxSubInvDefaultProdLookupFLd";//no i18n
                //no i18n
            }
            return returnClass;
        case 221:
            return "cxSubFrmUserLookupFld";//no i18n
        case 52:
            return "cxSubFrmLongIntFld";//no i18n
        case 34:
            return "cxSubFrmPrecentFld";//no i18n
        case 38:
            return "cxSubFrmDecimalFld";//no i18n
        case 36:
        case 143:
        case 144:
        case 145:
            return "cxSubFrmCurncyFld";//no i18n
        case 32:
            return "cxSubFrmNumbFld";//no i18n
        case 116:
            return "cxSubFrmFormulaFld";//no i18n
        case 555:
            return "cxSubFrmFileUploadFld";//no i18n
    }
});
Lyte.Component.registerHelper("cxGetSubformFieldValues", function (fieldInfo, recordData, fType, currentTime, currentPage, isdefaultInvSubform) { //no i18n
    var fValue = recordData[fieldInfo.api_name];
    switch (fieldInfo.data_type) {
        case 'multiselectpicklist':
            if (currentPage === 'clone' && fieldInfo.default_value && fValue === '[]') {
                fValue = JSON.stringify([fieldInfo.default_value]);
            }
            if (fValue && typeof fValue == 'string') {
                try {
                    fValue = JSON.parse(fValue);
                } catch (e) {
                    fValue = fValue.split('; ');
                }
            }
            if (fValue && fValue.length) {
                return fValue;
            } else {
                return 'None';//no i18n
            }
        case 'datetime':
            if (fValue) {
                var t, cT;
                if (fValue.indexOf('TV') == -1) {
                    t = fValue.split(' ');
                    cT = t.length >= 2 ? t.length == 2 ? t[1] : t[1] + ' ' + t[2].toUpperCase() : '';
                } else {
                    t = fValue.split('TV');
                    cT = t.length >= 2 ? t[1] : '';
                }
                if (fType == 'date') {
                    return t[0];
                } else if (fType == 'time') { //no i18n
                    return cT;
                }
            } else {
                return currentTime;
            }
        case 'picklist':
            if (currentPage === 'clone' && fieldInfo.default_value && !fValue) {
                return fieldInfo.default_value;
            } else {
                return "-None-";//no i18n
            }
        case 'userlookup':
            if (currentPage === 'clone' && fieldInfo.default_value && !fValue) {
                return fieldInfo.default_value;
            } else {
                return "None";//no i18n
            }
        case 'fileupload':
            if (currentPage === 'clone') {
                return [];
            }
            else if (fValue) {
                var details = [];
                var fls = fileupload.uploadedFileObject ? fileupload.uploadedFileObject : [];
                var fllen = fls.length;
                if (fValue.length > 0) {
                    if (fValue[0].attachment_Id === undefined) {
                        for (var k = 0; k < fllen; k++) {
                            if (fls[k].fieldId === fieldInfo.id
                                && fValue[0].file_id === fls[k].encryptedUploadId) {
                                var flobj = {};
                                flobj.file_Size = fls[k].fileSize && parseInt(fls[k].fileSize) !== 0 ? fileupload.formatBytes(fls[k].fileSize, 2) : "";
                                flobj.file_Name = fls[k].fileName;
                                flobj.attachment_Id = fls[k].uploadId;
                                flobj.fromService = fls[k].fromService;
                                flobj.currView = currentPage;
                                details.push(flobj);

                            }
                        }
                    }
                    else {
                        return fValue;
                    }

                }
                return details;
            }
            else {
                return fValue ? fValue : [];
            }
        case 'lookup':
            if (fValue) {
                if (fieldInfo.column_name === "PRODUCTID" && !fieldInfo.custom_field && isdefaultInvSubform) {
                    var pCode = fieldInfo.lookup.show_fields && fieldInfo.lookup.show_fields[0].field.api_name === 'Product_Code' && fieldInfo.lookup.show_fields[0].show_data ? recordData[fieldInfo.api_name].Product_Code : undefined
                    return pCode ? recordData[fieldInfo.api_name].name + ' (' + pCode + ')' : recordData[fieldInfo.api_name].name
                } else {
                    return recordData[fieldInfo.api_name].name
                }
            } else {
                return '';
            }
    }
});
Lyte.Component.registerHelper("cxneedAlignright", function (datatype) { //no i18n
    switch (datatype) {
        case 'double':
        case 'bigint':
        case 'integer':
        case 'currency':
        case 'formula':
            return true;
        default:
            return false;
    }
});
Lyte.Component.registerHelper("cxIsValuePresent", function (valueToLookFor, stringToBeSplitted) { //no i18n
    //splits the string by comma(,) and looks for value in it
    if (stringToBeSplitted && typeof stringToBeSplitted == "string") {
        return stringToBeSplitted.split(',').indexOf(valueToLookFor) !== -1;
    }
});
Lyte.Component.registerHelper('cxArithResult', function (param1, param2, operator) { //No I18N
    param1 = parseFloat(param1);
    param2 = parseFloat(param2);
    switch (operator) {
        case "+": return param1 + param2;
        case "-": return param1 - param2;
        case "*": return param1 * param2;
        case "/": return param1 / param2;
        case "%": return param1 % param2;
    }
});
Lyte.Component.registerHelper("cxShowIntegLayoutSearch", function (layoutDropdownData) { //no i18n
    layoutDropdownData = layoutDropdownData || [];
    let count = layoutDropdownData.filter((ddData) => { return ddData.source !== "crm" }).length;//no i18n
    count++;//for offline layout
    return count >= 8;
});
Lyte.Component.registerHelper("cxShowLayoutSearch", function (layoutDropdownData, moduleName, wizardData) { //no i18n
    layoutDropdownData = layoutDropdownData || [];
    let count = layoutDropdownData.length;
    if (moduleName === "Campaigns") {
        count = layoutDropdownData.filter((ddData) => { return ddData.source === "crm" }).length;//no i18n
    }
    if (wizardData instanceof Array) {
        var wizLength = wizardData.length
        for (var i = 0; i < wizLength; i++) {
            count = count + wizardData[i].layouts.length
        }
    }
    return count >= 8;
});
Lyte.Component.registerHelper("isQuickCreateSupported", (layoutComponentData, cxPropFieldData, currentSubformConfiguration) => {
    let showQCButton = false;
    if (layoutComponentData.isQuickCreate) {
        showQCButton = false;
    } else {
        showQCButton = true;
        if (cxPropFieldData.lookup && cxPropFieldData.lookup.module && cxPropFieldData.lookup.module.api_name &&
            ['Quotes', 'Purchase_Orders', 'Sales_Orders', 'Invoices', 'Price_Books', 'Services__s'].includes(cxPropFieldData.lookup.module.api_name)) {
            showQCButton = false;
        }
        if (currentSubformConfiguration && currentSubformConfiguration.api_name && currentSubformConfiguration.api_name.hasOwnProperty(cxPropFieldData.api_name) && currentSubformConfiguration.api_name[cxPropFieldData.api_name].isLookupQuickCreateSupported === false) {
            showQCButton = false;
        }
    }
    return showQCButton;
});
