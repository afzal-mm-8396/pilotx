/**
    
    This mixin utils will process the layout rules and returns the result as boolean.

    Mandatory utils/mixins needed for this to work
    
    1.crux-entity-date-time-mixin.js
    2.crux-entity-common-utils.js
    3.currentInstObjKey -> an unique need be generated for each section and fields, meta/internal properties will be maintained here

 */
Lyte.Mixin.register("crux-common-rules-utils", {
    checkCriteriaMatch: function (customData) {
        var criteriaDetails = customData.criteriaDetails, methodCustomData1 = {};
        for (var cKeys in customData) {
            methodCustomData1[cKeys] = customData[cKeys];
        }
        if (!criteriaDetails.group_operator && (criteriaDetails.length === undefined || criteriaDetails.length === null)) {
            methodCustomData1.criteriaDetails = criteriaDetails;
            return this.checkingMatch(methodCustomData1);
        } else if (criteriaDetails.group_operator) {
            let temp = [], i = 0, condition = criteriaDetails.group_operator;
            var _internalCriteria = criteriaDetails.group, _inL = _internalCriteria.length;
            for (var l = 0; l < _inL; l++) {
                methodCustomData1.criteriaDetails = _internalCriteria[l];
                if (!_internalCriteria[l].group_operator) {
                    temp[i++] = this.checkingMatch(methodCustomData1);
                } else {
                    temp[i++] = this.checkCriteriaMatch(methodCustomData1);
                }
            }
            if (condition === "and") {
                return temp[0] && temp[1];
            } else if (condition === "or") {
                return temp[0] || temp[1];
            }
        } else {
            let condition, temp = [], i = 0, criteria = criteriaDetails || [];
            criteria.forEach(eachCriteriaItem => {
                methodCustomData1.criteriaDetails = eachCriteriaItem;
                if ((eachCriteriaItem && eachCriteriaItem.length === undefined) || typeof eachCriteriaItem === 'string') {
                    if (typeof eachCriteriaItem === 'object') {
                        temp[i++] = this.checkingMatch(methodCustomData1);
                    } else if (typeof eachCriteriaItem === 'string') { //no i18n
                        condition = eachCriteriaItem;
                    }
                } else if (typeof eachCriteriaItem !== 'function') {
                    temp[i++] = this.checkCriteriaMatch(methodCustomData1);
                }
            });
            if (condition === "and") {
                return temp[0] && temp[1];
            } else if (condition === "or") {
                return temp[0] || temp[1];
            }
        }
    },
    checkingMatch: function (customData) {
        var { currentInstObjKey, isVR_Subcondition, executionType, criteriaDetails, layoutFieldIdVsMetaObject, layoutSections } = customData;
        var criteriaFieldApiName = criteriaDetails.field.api_name, criteriaFieldId = criteriaDetails.field.id, currentViewType = customData.currentViewType;
        layoutFieldIdVsMetaObject = layoutFieldIdVsMetaObject || {};
        var fieldMetaDetails = layoutFieldIdVsMetaObject[criteriaFieldId], isreturnUndefined;
        if (fieldMetaDetails === undefined || !fieldMetaDetails.visible) {
            isreturnUndefined = true;
        }
        if (isVR_Subcondition && (!fieldMetaDetails || (fieldMetaDetails && (!fieldMetaDetails.view_type[currentViewType] || !fieldMetaDetails.visible)))) {
            return true;
        }
        if (isreturnUndefined) {
            return undefined;
        }
        var fieldVal = this.getFieldVal({ fieldApiName: criteriaFieldApiName, fieldMetaDetails, cxPropFormData: customData.cxPropFormData, executionType });
        fieldVal = fieldVal === undefined && currentViewType !== "edit" && fieldMetaDetails.default_value ? fieldMetaDetails.default_value : fieldVal; // NO I18N
        var criteriaValue = criteriaDetails.value;
        if (fieldMetaDetails.column_name === "STAGE") {
            var pickListValues = fieldMetaDetails.pick_list_values, stageValues = [], stageLength = pickListValues.length;
            for (var i = 0; i < stageLength; i++) {
                if (criteriaValue === "${OPEN}" && (pickListValues[i].forecast_type === "Open" || pickListValues[i].deal_category === "Open")) {
                    stageValues.push(pickListValues[i].display_value);
                } else if (criteriaValue === "${CLOSEDWON}" && (pickListValues[i].forecast_type === "Closed Won" || pickListValues[i].deal_category === "Closed Won")) {
                    stageValues.push(pickListValues[i].display_value);
                } else if (criteriaValue === "${CLOSEDLOST}" && (pickListValues[i].forecast_type === "Closed Lost" || pickListValues[i].deal_category === "Closed Lost")) {
                    stageValues.push(pickListValues[i].display_value);
                }
            }
            if (stageValues.length > 0) {
                criteriaValue = stageValues;
            }
        }
        var checkComparatorDataObj = { currentDatePattern: customData.currentDatePattern, currentTimePattern: customData.currentTimePattern, currentTimeZone: customData.currentTimeZone };
        checkComparatorDataObj.fieldVal = fieldVal; checkComparatorDataObj.criteriaValue = criteriaValue;
        checkComparatorDataObj.comparator = criteriaDetails.comparator;
        checkComparatorDataObj._api = criteriaFieldApiName; checkComparatorDataObj.fieldId = criteriaFieldId;
        checkComparatorDataObj.executionType = executionType;
        checkComparatorDataObj.isVR_Subcondition = isVR_Subcondition;
        checkComparatorDataObj.formFieldList = customData.formFieldList;
        checkComparatorDataObj.userCurrencyDetails = customData.userCurrencyDetails;
        checkComparatorDataObj.cxPropFormData = customData.cxPropFormData;
        var _flag = this.checkComparator(checkComparatorDataObj);
        if (isVR_Subcondition) {
            var secFieldMetaDetails = this.getSectionMetaByGivenField({ layoutSections, fieldId: criteriaFieldId });
            var currSectiondata = secFieldMetaDetails.sectionMetaData && secFieldMetaDetails.sectionMetaData[currentInstObjKey] || {};
            var currentFieldInfo = secFieldMetaDetails.fieldMetaData && secFieldMetaDetails.fieldMetaData[currentInstObjKey] || {};
            if (currSectiondata.isvalidSection === false || !currentFieldInfo.view_type[currentViewType] || !currentFieldInfo.visible) {
                return undefined;
            }
            return _flag;
        }
        return _flag;
    },
    checkComparator: function (customData) {
        var { fieldVal, formFieldList, cxPropFormData, comparator, _api, executionType, fieldId, isVR_Subcondition, userCurrencyDetails, currentUserId } = customData,
            _val = customData.criteriaValue;
        formFieldList = formFieldList || {};
        var currentFieldModelObj = formFieldList[_api], atrrType = currentFieldModelObj.lyteAtrrType, fieldDataType = currentFieldModelObj.fieldDataType, jsonType = currentFieldModelObj.json_type;
        var currentDatePattern = customData.currentDatePattern || "", currentTimePattern = customData.currentTimePattern || "", currentTimeZone = customData.currentTimeZone || "";
        fieldVal = fieldVal && typeof fieldVal === "string" ? fieldVal.trim() : fieldVal;//no i18n
        if (fieldDataType === 'date' && fieldVal) {
            if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = cxPropFormData.$ && cxPropFormData.$.error[_api].errorValue;
            }
            switch (_val) {
                case '${TODAY}': {
                    comparator = 'equal';//no i18n
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: $L.moment().toDate(), datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${TOMORROW}': {
                    comparator = 'equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${TOMORROWPLUS}': {
                    comparator = 'greater_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${YESTERDAY}': {
                    comparator = 'equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${YESTERDAYMINUS}': {
                    comparator = 'less_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${LASTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${THISMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${NEXTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${LASTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${THISWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${NEXTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() + 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
            }
            if (_val.match('AGEINDAYS') || _val.match('DUEINDAYS')) { //no i18n
                let dateDifference, ageFlag;
                if (_val.match('AGEINDAYS')) {
                    ageFlag = true;
                }
                try {
                    dateDifference = _val.substring(_val.indexOf('+') + 1);
                } catch (e) {
                    throw e;
                }
                if (ageFlag) {
                    dateDifference = '-' + dateDifference;
                }
                let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: new Date(), datePattern: currentDatePattern });
                currDateObj = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                dateDifference = parseInt(dateDifference);
                let date = new Date();
                date.setDate(date.getDate() + dateDifference);
                let checkDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                checkDateObj = this.getDateInGivenPattern(checkDateObj, "yyyy-mm-dd");//no i18n
                _val = checkDateObj;
                switch (comparator) {
                    case 'greater_than':
                    case 'greater_equal':
                        if (ageFlag) {
                            comparator = comparator === 'greater_equal' ? 'less_equal' : 'less_than';//no i18n
                        }
                        break;
                    case 'less_than':
                    case 'less_equal':
                        if (ageFlag) {
                            comparator = 'between'; //no i18n
                            _val = [];
                            _val[0] = checkDateObj;
                            _val[1] = currDateObj;
                        } else {
                            comparator = 'between'; //no i18n
                            _val = [];
                            _val[0] = currDateObj;
                            _val[1] = checkDateObj;
                        }
                        break;
                }
            }
            let isValidDate;
            try {
                isValidDate = $L.moment(fieldVal, currentDatePattern.toUpperCase(), { i18n: true }).validate();
            }
            catch (e) {
                isValidDate = false;
            }
            if (isValidDate) {
                let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: fieldVal, datePattern: currentDatePattern });
                fieldVal = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
            } else {
                return false;
            }
        } else if (fieldDataType === 'datetime' && fieldVal) {
            if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = cxPropFormData.$ && cxPropFormData.$.error[_api].errorValue;
            }
            var fieldValD, fieldV;

            var upperCaseUserDatePattern = Crm.userDetails.DATE_PATTERN.toUpperCase(),
                upperCaseUserTimeFormat = Crm.userDetails.TIME_FORMAT;
            var constructPattern = upperCaseUserDatePattern + " " + upperCaseUserTimeFormat.replace(':MM', ':mm');
            fieldValD = $L.moment(fieldVal, constructPattern).format(upperCaseUserDatePattern);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
            fieldV = [];
            if (!fieldValD) {
                try {
                    fieldValD = $L.moment(fieldVal, constructPattern, { i18n: true }).format(upperCaseUserDatePattern);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
                } catch (exe) { murphy.error(exe); }
            }
            fieldV[0] = fieldValD;
            var expectedTimeFormat = Crm.userDetails.TIME_FORMAT.split(" ").length > 1 ? upperCaseUserTimeFormat.replace('a', 'A') : Crm.userDetails.TIME_FORMAT;
            fieldV[1] = $L.moment(fieldVal, constructPattern).format(expectedTimeFormat);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
            if (!fieldV[1]) {
                try {
                    fieldV[1] = $L.moment(fieldVal, constructPattern, { i18n: true }).format(expectedTimeFormat);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
                } catch (exe) { murphy.error(exe); }
            }
            fieldV[1] = fieldV[1] ? fieldV[1].toUpperCase() : fieldV[1];
            let isValidDate;
            try {
                isValidDate = $L.moment(fieldValD, currentDatePattern.toUpperCase(), { i18n: true }).validate();
            }
            catch (e) {
                isValidDate = false;
            }
            switch (_val) {
                case '${TODAY}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = []; let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${TOMORROW}': {
                    comparator = 'between';//no i18n
                    let date = new Date(new Date().setDate(new Date().getDate() + 1)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${TOMORROWPLUS}': {
                    comparator = 'greater_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateTimeWithTimezone(currDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${YESTERDAY}': {
                    comparator = 'between';//no i18n
                    let date = new Date(new Date().setDate(new Date().getDate() - 1)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${YESTERDAYMINUS}': {
                    comparator = 'less_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    var currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateTimeWithTimezone(currDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${LASTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${THISMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${NEXTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${LASTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${THISWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - curr.getDay(), last = first + 6,
                        firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${NEXTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() + 7 - curr.getDay(), last = first + 6,
                        firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
            }

            if (typeof _val === "string" ? _val.match('AGEINDAYS') || _val.match('DUEINDAYS') : null) { //NOI18N
                let dateDifference, ageFlag = false;
                try {
                    dateDifference = _val.substring(_val.indexOf('+') + 1);
                } catch (e) {
                    throw e;
                }
                if (_val.match('AGEINDAYS')) {
                    ageFlag = true;
                    dateDifference = '-' + dateDifference;
                }
                dateDifference = parseInt(dateDifference);
                let date = new Date(new Date().setDate(new Date().getDate() + dateDifference)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                _val = [];
                let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                let firstCurDay = $L.moment($L.moment().toDate().setHours(0, 0, 0, 0)).toDate(), lastCurDay = $L.moment($L.moment().toDate().setHours(23, 59, 59, 999)).toDate();
                firstCurDay = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstCurDay, datePattern: currentDatePattern });
                firstCurDay = this.getDateTimeWithTimezone(firstCurDay) + currentTimeZone.replace('.', ':');//no i18n
                lastCurDay = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastCurDay, datePattern: currentDatePattern });
                lastCurDay = this.getDateTimeWithTimezone(lastCurDay) + currentTimeZone.replace('.', ':');//no i18n
                switch (comparator) {
                    case 'equal':
                        comparator = 'between';//no i18n
                        break;
                    case 'not_equal':
                        comparator = 'not_between'; //no i18n
                        break;
                    case 'greater_than':
                    case 'greater_equal':
                        if (ageFlag) {
                            _val = _val[0];
                            comparator = comparator === 'greater_equal' ? 'less_equal' : 'less_than';//no i18n
                        } else {
                            _val = _val[1];
                        }
                        break;
                    case 'less_than':
                    case 'less_equal':
                        if (ageFlag) {
                            comparator = 'between'; //no i18n
                            _val[1] = lastCurDay;
                        } else {
                            comparator = 'between'; //no i18n
                            _val[0] = firstCurDay;
                        }
                        break;
                }
            }
            if (isValidDate) {
                var dateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: fieldValD, datePattern: currentDatePattern });
                if (fieldV[1]) {
                    var timeObj = this.getfinalTimeObjectfromTime(fieldV[1], currentTimePattern);//no i18n
                    if (!this.isEmptyObj(timeObj)) {
                        dateObj.setHours(timeObj.hrs);
                        dateObj.setMinutes(timeObj.mins);
                    }
                }
                fieldVal = this.getDateTimeWithTimezone(dateObj) + currentTimeZone.replace('.', ':');//no i18n
            } else {
                return false;
            }
        } else if (['currency', 'double', 'integer'].includes(fieldDataType)) { //no i18n
            if (fieldVal === undefined || fieldVal === null) {
                if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                    fieldVal = isNaN(parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value)) ? (_val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : undefined) : parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value);
                } else if (executionType && executionType !== "failure") { //no i18n
                    fieldVal = _val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : fieldVal;//no i18n
                }
                if (executionType && fieldVal === 0) { // if field dosent have any value, we should consider it as empty value only
                    fieldVal = undefined;
                }
            } else if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = isNaN(parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value)) ? (_val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : undefined) : parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value);
            }
            //to handle multiCurrency - convert the currency
            if (fieldDataType === "currency" && (_val || _val === 0) && typeof _val === 'number') {
                var base = userCurrencyDetails;
                if (cxPropFormData.Currency && base && base[cxPropFormData.Currency]) {
                    _val = base[cxPropFormData.Currency].er * _val;
                }
            }
        } else if (fieldDataType === "lookup" && (!this.isEmptyObj(fieldVal))) { //no i18n
            fieldVal = fieldVal.name;
        } else if (fieldDataType === "userlookup" || fieldDataType === "ownerlookup") { //no i18n
            if (_val === '${EMPTY}' && this.isEmptyObj(fieldVal)) {
                return false;
            } else if (_val === '${NOTEMPTY}' || (comparator === 'not_equal' && _val === '${EMPTY}') && !this.isEmptyObj(fieldVal)) { //no i18n
                return true;
            }
            if (!this.isEmptyObj(fieldVal)) {
                fieldVal = fieldVal.id;
            }
            _val = _val.id ? _val.id : (currentUserId || _val);
        } else if (fieldDataType === "bigint" && atrrType === 'object') {
            if (!this.isEmptyObj(fieldVal)) {
                fieldVal = fieldVal.id;
            }
            if (_val.id) {
                _val = _val.id;
            } else {
                var valArr = [];
                _val.forEach(function (item) { valArr.push(item.id); });
                _val = valArr;
            }
            comparator = comparator === 'equal' ? 'contains' : comparator === 'not_equal' ? 'not_contains' : comparator; //no I18n
        }
        var _f;
        if (executionType) {
            _f = this.chkFieldemptyVR({ fieldVal, executionType, isVR_Subcondition });
            if (_f === undefined && isVR_Subcondition && jsonType === "integer" && fieldVal === undefined && ["not_equal", "less_equal", "less_than"].indexOf(comparator) !== -1) {
                return false;
            }
        }
        if (_val && typeof _val === "string" && _val.indexOf('${NOC') >= 0) {
            _val = _val.replace('${NOC', '').replace('}', '');
            if (executionType) {
                if (fieldVal) {
                    fieldVal = fieldVal.length || 0;
                } else {
                    fieldVal = fieldVal !== undefined ? undefined : fieldVal;
                }
            } else {
                fieldVal = fieldVal ? fieldVal.length : 0;
            }
        }
        switch (comparator) {
            case 'between':
            case 'not_between':
                if (_f === true || _f === false) { return _f; }
                if (_val && _val.length === 2) {
                    if ((typeof _val[0] === 'string' && typeof _val[1] === 'string') &&
                        (_val[0].indexOf('${NOC') >= 0 && _val[1].indexOf('${NOC') >= 0)) {
                        var a = _val[0].replace('${NOC', '').replace('}', '');
                        var b = _val[1].replace('${NOC', '').replace('}', '');
                        fieldVal = fieldVal ? fieldVal.length : 0;
                        let flag = fieldVal >= a.trim() && fieldVal <= b.trim() ? true : false;
                        return comparator === 'between' ? flag : !flag;//no i18n

                    }
                    let flag = fieldVal >= (typeof _val[0] === 'string' ? _val[0].trim() : _val[0]) && fieldVal <= (typeof _val[1] === 'string' ? _val[1].trim() : _val[1]) ? true : false;
                    return comparator === 'between' ? flag : !flag;//no i18n
                }
                break;
            case 'less_equal':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) <= new Date(_val);
                }
                return Number(fieldVal) <= Number(_val) ? true : false;
            case 'less_than':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) < new Date(_val);
                }
                return Number(fieldVal) < Number(_val) ? true : false;
            case 'greater_equal':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) >= new Date(_val);
                }
                return Number(fieldVal) >= Number(_val) ? true : false;
            case 'greater_than':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) > new Date(_val);
                }
                return Number(fieldVal) > Number(_val) ? true : false;
            case 'equal':
            case 'not_equal':
                var eqObj = { fieldVal, _val, comparator, executionType, fieldId, isVR_Subcondition, fieldDataType };
                eqObj.type = typeof _val;
                return this.equalCheckBasedOnType(eqObj);
            case 'starts_with':
            case 'ends_with':
                if (_f === true || _f === false) { return _f; }
                if (_val && typeof _val === "string") {
                    _val = _val ? _val.toLowerCase() : _val;
                    if (fieldVal && typeof fieldVal === "string") {
                        fieldVal = fieldVal.toLowerCase();
                        return comparator === "starts_with" ? fieldVal.startsWith(_val) : fieldVal.endsWith(_val);//no i18n
                    }
                    return false;
                } else if (Array.isArray(_val)) {
                    let _finalBool = _val.some(function (eachItem) {
                        eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                        if (fieldVal && typeof fieldVal === "string") {
                            fieldVal = fieldVal.toLowerCase();
                            return comparator === "starts_with" ? fieldVal.startsWith(eachItem) : fieldVal.endsWith(eachItem);//no i18n
                        }
                        return false;
                    });
                    return _finalBool;
                }
                return false;
            case 'contains':
            case 'not_contains':
                if (_f === true || _f === false) { return _f; }
                //added for handling failure criteria(VR) if v give some values and remove that value from input field
                if (fieldVal === "" && executionType === 'failure') {
                    return true;
                }
                if (executionType === undefined && comparator === 'not_contains' && !fieldVal) {
                    return true;
                }
                if (fieldVal) {
                    if (typeof _val === 'string') {
                        _val = _val ? _val.toLowerCase() : _val;
                        fieldVal = fieldVal ? fieldVal.toLowerCase() : fieldVal;
                        let val = fieldVal.indexOf(_val), dval = val === -1 ? false : true;
                        return comparator === 'contains' ? dval : !dval;//no i18n
                    } else if (Array.isArray(_val) && _val.length) {
                        if (comparator === "not_contains") {
                            var val_arr_len = _val.length, nc_finalBool;
                            for (var c = 0; c < val_arr_len; c++) {
                                var each_item = _val[c];
                                each_item = each_item && typeof each_item === "string" ? each_item.toLowerCase() : each_item;//no i18n
                                if (typeof fieldVal === "string") {
                                    fieldVal = fieldVal.toLowerCase();
                                    let val = fieldVal.indexOf(each_item), dval = val === -1 ? false : true;
                                    if (dval) {
                                        nc_finalBool = true;
                                    }
                                }
                            }
                            return nc_finalBool ? false : true;
                        }
                        let _finalBool = _val.some(function (eachItem) {
                            eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                            if (typeof fieldVal === "string") {
                                fieldVal = fieldVal.toLowerCase();
                                var val = fieldVal.indexOf(eachItem);
                                var dval = val === -1 ? false : true;
                                return comparator === 'contains' ? dval : !dval;//no i18n
                            }
                            return false;
                        });
                        return _finalBool;
                    } else if (typeof _val === 'object' && _val.length) { //no i18n
                        var _flag = _val.indexOf(fieldVal) !== -1;
                        return comparator === 'contains' ? _flag : !_flag;//no i18n
                    }
                }
                return false;
        }
    },
    chkFieldemptyVR: function (customData) {
        var { fieldVal, executionType, isVR_Subcondition } = customData;
        if ((fieldVal === undefined || fieldVal === null) && (executionType && !isVR_Subcondition)) {
            if (executionType !== "failure") {
                return false;
            }
            return true;
        }
    },
    equalCheckBasedOnType: function (customData) {

        function checkIsEmptyOrNot(fieldVal) {
            if (fieldVal === '0' || fieldVal === 0) { //no i18n
                fieldVal = 'notEmpty';//no i18n
            }
            return fieldVal;
        };

        var { fieldVal, type, comparator, executionType, isVR_Subcondition, fieldDataType } = customData;
        var criteriaVal = customData._val;
        if (criteriaVal === '${NOTEMPTY}') { //no i18n
            comparator = 'not_equal'; criteriaVal = '';//no i18n
            fieldVal = fieldVal === '-None-' ? '' : ((fieldVal === undefined || fieldVal === null) ? '' : fieldVal);//no i18n
            fieldVal = checkIsEmptyOrNot(fieldVal);
        } else if (criteriaVal === '${EMPTY}') { //no i18n
            criteriaVal = '';//no i18n
            fieldVal = fieldVal === '-None-' ? '' : ((fieldVal === undefined || fieldVal === null) ? '' : fieldVal);//no i18n
            fieldVal = checkIsEmptyOrNot(fieldVal);
        }

        if (criteriaVal && typeof criteriaVal === "string" && criteriaVal.indexOf('${NOC') >= 0) {
            criteriaVal = criteriaVal.replace('${NOC', '').replace('}', '');
            fieldVal = fieldVal ? fieldVal.length : 0;
        }

        var _f, flag;
        if (executionType) {
            _f = this.chkFieldemptyVR({ fieldVal, executionType, isVR_Subcondition });
            if (fieldDataType === "picklist" && fieldVal === '-None-' && comparator === "not_equal") {
                return false;
            }
        }
        if (_f === true || _f === false) { return _f; }
        switch (type) {
            case 'string':
                flag = (fieldVal && isNaN(fieldVal) ? fieldVal.toString().toLowerCase() : fieldVal) === (criteriaVal && isNaN(fieldVal) ? criteriaVal.toLowerCase() : criteriaVal) ? true : false;
                return comparator === 'equal' ? flag : !flag;//no i18n
            case 'boolean':
            case 'number': {
                let currentFieldVal = fieldVal;
                try {
                    if (type === "number" && typeof fieldVal === "string" && !isNaN(fieldVal)) {
                        currentFieldVal = parseFloat(fieldVal);
                    }
                } catch (e) {
                    currentFieldVal = fieldVal;
                }
                flag = currentFieldVal === criteriaVal ? true : false;
                return comparator === 'equal' ? flag : !flag;//no i18n
            }
            case 'array':
            case 'object':
                var isSatisfied = false;
                criteriaVal.forEach(function (eachItem) {
                    eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                    fieldVal = fieldVal && typeof fieldVal === "string" ? fieldVal.toLowerCase() : fieldVal;//no i18n
                    if (fieldVal && typeof fieldVal === "string") {
                        var dval = eachItem === fieldVal ? true : false;
                        if (dval && !isSatisfied) {
                            isSatisfied = true;
                        }
                    }
                });
                return comparator === 'equal' ? isSatisfied : !isSatisfied;//no i18n
        }
    }
});