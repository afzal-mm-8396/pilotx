Lyte.Mixin.register("crm-crux-module-mixin", { //No I18n
    setProperty: function (layout, customData) {
        var layoutId = layout.id;
        var sections = layout.sections;
        if (sections) {
            var sectionsLength = sections.length;
            var lay_fields = [];
            var module = layout.module ? layout.module.id : undefined;
            if (customData && customData.set_available_user_layout && (layout.status === "active" || layout.status === "hidden")) {
                var profileName = store.peekRecord("user", Crm.userDetails.USER_ID).profile.name; //No I18n
                var isProfileAvail = layout.profiles.find(x => x.name === profileName);
            }
            for (var j = 0; j < sectionsLength; j++) {
                var section = sections[j];
                if (customData && customData.apiVersion && customData.apiVersion === "2.2") {
                    section.uid = section.id;
                }
                section.id = layoutId + "_" + j;
                var fields = section.fields;
                var fieldsLength = fields.length;
                for (var k = 0; k < fieldsLength; k++) {
                    var field = fields[k];
                    //need to show "lead name" instead of "full name" for leads and contact module alone.
                    if (field.column_name === "FULLNAME") {
                        let mod_info = store.peekRecord("module", module);//no i18n
                        if (mod_info && ["Leads", "Contacts"].indexOf(mod_info.api_name) !== -1 && mod_info.singular_label) {
                            field.field_label = field.display_label = I18n.getMsg("crm.label.vendor.name", mod_info.singular_label);//no i18n
                        }
                    }

                    if (section.isSubformSection) {
                        field.subform_api = true;
                    }
                    //added subform check, since it is setting subform fields into entity module fields
                    if (customData && customData.moduleSet && (customData.subformModuleSet || !field.subform_api || field.subform_api && (field.data_type === "subform" || field.data_type === "static_subform"))) {
                        field.module = module ? [module] : [];
                    }
                    if (isProfileAvail) {
                        field.available_in_user_layout = true;
                    }
                    lay_fields.push(field.id);
                    /*handling for static lookup criteria being over written*/
                    if (field.lookup && field.lookup.query_details) {
                        const cachedField = store.peekRecord("field", field.id);//no i18n
                        if (cachedField && cachedField.lookup && cachedField.lookup.query_details) {
                            field.lookup.query_details.criteria = cachedField.lookup.query_details.criteria || field.lookup.query_details.criteria;
                        }
                    }
                    var NewField = [];
                    if (field.pick_list_values && field.pick_list_values.length) {
                        NewField = store.peekAll("field").filterBy({ id: field.id });//no i18n
                    }
                    if (section.type === "used" || section.screen || (!customData || customData.from !== "lyteCreate")) { //added for sequence num mismatch when business card fields,quick create fields comes in layoutCache req
                        if (field.pick_list_values && field.pick_list_values.length) {
                            if (!store.model.field.fieldList.hasOwnProperty(layoutId)) {
                                store.addField("field", layoutId, "object");//No I18n
                                field[layoutId] = { pick_list_values: field.pick_list_values, default_value: field.default_value };
                            } else if (validationUtils.isNotEmpty(field[layoutId])) {
                                var temp = field[layoutId];
                                temp.pick_list_values = field.pick_list_values;
                                temp.default_value = field.default_value;
                                field[layoutId] = temp;
                            } else {
                                field[layoutId] = { pick_list_values: field.pick_list_values, default_value: field.default_value };
                            }
                            //id fix for ZCRM-92662
                            if (NewField[0] && NewField[0].pick_list_values && !(customData && customData.peekField === false)) {
                                field.pick_list_values = NewField[0].pick_list_values;
                            }
                            if (field.enable_colour_code) {
                                field.picklist_colour_codes = field.pick_list_values.slice(0);
                            }
                            field.colour_code_enabled = field.enable_colour_code;
                        }

                        if (field.sequence_number !== undefined) {
                            if (!store.model.field.fieldList.hasOwnProperty(layoutId)) {
                                store.addField("field", layoutId, "object");//No I18n
                                field[layoutId] = { sequence_number: field.sequence_number, required: field.required };
                                if (field.data_type === "boolean" && field.default_value) {
                                    field[layoutId].default_value = field.default_value;
                                }
                            }
                            else if (validationUtils.isNotEmpty(field[layoutId])) {
                                let temp = field[layoutId];
                                temp.sequence_number = field.sequence_number;
                                temp.required = field.required;
                                if (field.data_type === "boolean" && field.default_value) {
                                    temp.default_value = field.default_value;
                                }
                                field[layoutId] = temp;
                            } else {
                                field[layoutId] = { sequence_number: field.sequence_number, required: field.required };
                                if (field.data_type === "boolean" && field.default_value) {
                                    field[layoutId].default_value = field.default_value;
                                }
                            }
                        }
                        if (field.convert_mapping) {
                            if (field[layoutId] === undefined) {
                                field[layoutId] = {};
                            }
                            field[layoutId].convert_mapping = field.convert_mapping;
                        }
                    }
                    if(field.sequence_number !== undefined){
						var key=layoutId+'_'+section.id;
						field[key] = {sequence_number : field.sequence_number};
					}
                    if (NewField[0] && NewField[0].pick_list_values && customData && customData.peekField === false) {
                        delete field.pick_list_values;
                    }
                }
            }
            if (store.model.layout.fieldList.hasOwnProperty("fields")) {
                layout.fields = lay_fields;
            }
        }
    },
    addSubformFieldsintoLyteModel: function (currSec) {
        var isubform = false, layout_id;
        if (currSec) {
            currSec.forEach(function (sec) {
                var field = {};
                field.id = Lyte.attr('string');//No I18N
                isubform = false;
                var isInventorySubform;
                if (sec.isSubformSection && sec.fields) {
                    sec.fields.forEach(function (fields) {
                        if (fields.data_type === 'subform' || fields.data_type === 'static_subform') {
                            isubform = true;
                            layout_id = fields.subform ? fields.subform.id : fields.associated_module.id;
                            if (["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fields.api_name)) {
                                isInventorySubform = true;
                            }
                        }
                        else if (!fields.subform) {
                            field[fields.api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fields));
                            field[fields.api_name].fieldID = fields.id;
                            field[fields.api_name].uiType = fields.ui_type;
                            field[fields.api_name].columnName = fields.column_name;
                            field[fields.api_name].fieldType = fields.data_type;
                            field[fields.api_name].length = fields.length;
                            field[fields.api_name].displayLabel = fields.display_label;
                            field[fields.api_name].isCustomField = fields.custom_field;
                            if (fields.column_name === "LINETAX") {
                                field[fields.api_name].watch = true;
                            }
                        }
                    });
                }
                var _model = store.model[layout_id];
                if (_model && isubform && field) {
                    //to handle reordering subform in edit case
                    field.__CUSTOM_sequence_NUMBER__ = { type: 'string' };//no i18n
                    field.removedRow = { type: 'string' };//no I18n
                    if (isInventorySubform) {
                        field.$clone_reference_id = { type: 'string' };//no I18n
                    }
                    for (var key in field) {
                        if (!_model.fieldList[key]) { // added this check for same module lookup issue ->validation removes
                            store.addField(layout_id, key, field[key].type, field[key], undefined, true);
                        }
                    }
                }
            });
        }
    },
    getfieldattributeType: function (fieldList) {
        var attrType;
        if (fieldList.ui_type === 116 && crmConstants.entityforumlaMapping[fieldList.formula.return_type]) {
            attrType = crmConstants.entityforumlaMapping[fieldList.formula.return_type];
        } else if (fieldList.ui_type === 118 && crmConstants.entitydataParamMapping[fieldList.rollup_summary.return_type]) {
            attrType = crmConstants.entitydataParamMapping[fieldList.rollup_summary.return_type];
        } else if (crmConstants.entityuiTypeMapping[fieldList.ui_type]) {
            attrType = crmConstants.entityuiTypeMapping[fieldList.ui_type];
        } else if (crmConstants.entitycolumnMapping[fieldList.column_name]) {
            attrType = crmConstants.entitycolumnMapping[fieldList.column_name];
        } else if (crmConstants.entityjsonTypeMapping[fieldList.json_type]) {
            attrType = crmConstants.entityjsonTypeMapping[fieldList.json_type];
        } else if (fieldList.json_type === 'string' && fieldList.data_type === "currency") { //No I18N
            attrType = 'number';//No I18N
        } else if (fieldList.json_type) {
            attrType = fieldList.json_type;
        } else {
            attrType = "string";//no i18n
        }
        //used for special handling
        if (fieldList.column_name === "REMINDAT") {
            attrType = "object";//no i18n
        }
        return attrType;
    }
});
//$Id$
Lyte.Mixin.register("crm-date-datetime-mixin", {//No I18n
    getDateTimeWithTimezone: function (dateObj) {
        function trailingZero(num) {
            return num < 10 ? '0' + num : num;
        }
        var serverFormatTime;
        if (dateObj) {
            serverFormatTime = dateObj.getFullYear() +
                '-' + trailingZero(dateObj.getMonth() + 1) +
                '-' + trailingZero(dateObj.getDate()) +
                'T' + trailingZero(dateObj.getHours()) + //no i18n
                ':' + trailingZero(dateObj.getMinutes()) +
                ':' + trailingZero(dateObj.getSeconds());// +userZone.replace('.',':'); //time zone handled in server side in order to handle Daylight saving time
        }
        return serverFormatTime;
    },
    getcurrentTime: function (increaseHrsby) {
        function trailZ(num) {
            return num < 10 ? '0' + num : num;
        };
        var usertimeF = Crm.userDetails.TIME_FORMAT.split(' ');
        var userTimeobj = {};
        userTimeobj.format = usertimeF.length > 1 ? "12" : "24";
        var dateT = new Date();
        var hrs = dateT.getHours();
        var tempdt;
        hrs = increaseHrsby ? hrs + increaseHrsby : hrs;
        if (hrs >= 24) {
            hrs = hrs - 24;
        }
        switch (userTimeobj.format) {
            case '12':
                var ampm = hrs >= 12 ? I18n.getMsg('PM') : I18n.getMsg('AM');//no i18n
                tempdt = hrs > 12 ? trailZ(hrs - 12) + ':00 ' + ampm : trailZ(hrs === 0 ? 12 : hrs) + ':00 ' + ampm;//no i18n
                break;
            case '24':
            case '202':
                tempdt = trailZ(hrs) + ':00';//no i18n
                break;
        }
        userTimeobj.currTime = tempdt;
        if (userTimeobj.format === "12") {
            userTimeobj.startTime = "00:00 " + I18n.getMsg('AM'); userTimeobj.endTime = "11:59 " + I18n.getMsg('PM');
        } else {
            userTimeobj.startTime = "00:00"; userTimeobj.endTime = "23:59";
        }
        userTimeobj.meridian = { AM: I18n.getMsg('AM'), PM: I18n.getMsg('PM') };
        return userTimeobj;
    },
    getfinalTimeObjectfromTime: function (time) {
        if (time) {
            var obj = {};
            var usertimeF = Crm.userDetails.TIME_FORMAT.split(' ');
            var format = usertimeF.length > 1 ? "12" : "24";
            var timeV = time.split(' ');
            var spaceIndexVal = time.indexOf(' ');
            if (spaceIndexVal !== -1) {
                var parsedMeridiemVal = time.slice(spaceIndexVal + 1);
                parsedMeridiemVal = parsedMeridiemVal && typeof parsedMeridiemVal === "string" ? parsedMeridiemVal.trim() : parsedMeridiemVal;//no i18n
                if (parsedMeridiemVal && timeV[1]) {
                    timeV[1] = parsedMeridiemVal;
                }
            }
            var splitdTime = timeV[0].split(':');
            if (format === "12") {
                if (timeV[1]) {
                    timeV[1] = timeV[1].toUpperCase();
                    obj.hrs = (timeV[1] === I18n.getMsg("AM").toUpperCase() ? (splitdTime[0] === 12 ? 0 : splitdTime[0]) : 12 + (splitdTime[0] === 12 ? 0 : Number(splitdTime[0])));//no i18n
                }
                obj.mins = splitdTime[1];
            } else {
                obj.hrs = splitdTime[0];
                obj.mins = splitdTime[1];
            }
            return obj;
        }
    },
    convertTimeTo24HoursFormat: function (hrs, meridiem) {
        if (meridiem === undefined) {
            return hrs;
        }
        meridiem = meridiem.toLowerCase();
        if (meridiem === "am") {  //No I18N
            return (hrs === 0) ? 12 : (hrs === 12) ? 0 : hrs;
        } else if (meridiem === "pm") { //No I18N
            return (hrs === 12) ? hrs : hrs + 12;
        } else if (meridiem === I18n.getMsg("AM") || I18n.getMsg("am") === meridiem) {
            return (hrs === 0) ? 12 : (hrs === 12) ? 0 : hrs;
        } else if (meridiem === I18n.getMsg("PM") || I18n.getMsg("pm") === meridiem) {
            return (hrs === 12) ? hrs : hrs + 12;
        }
    },
    convertdateToDBformat: function (date) {
        //var dateObj = $L.moment(date).toDate();
        return $L.moment(date).format("YYYY-MM-DD");//No i18n
    },
    getCurrentMonthForOrgTimeZone() {
        return crmCalendar.monthName[new CrmDate().dateObject.getMonth()].html;
    },
    getDateTimeObjFromString: function (dateTimeStr) {
        var _dtformat, timeFormat, dateFormat, retValue = {};
        if (Crm.userDetails.TIME_FORMAT.split(' ').length > 1) {
            timeFormat = Crm.userDetails.TIME_FORMAT.replace('a', 'A');
        } else {
            timeFormat = Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm');
        }
        dateFormat = Crm.userDetails.DATE_PATTERN.toUpperCase();
        _dtformat = dateFormat + " " + timeFormat;
        var mom = $L.moment(dateTimeStr, _dtformat);
        var date = mom.format(dateFormat),
            time = mom.format(timeFormat);

        if (mom && mom._isValid) {
            retValue = {
                date: date,
                time: time,
                dateTimeStr: date + "TV" + time //No I18N
            };
        }
        return retValue;
    },
    getDateTimeFormatFromString: function (dateTimeStr) {
        var formats = [
            {
                time: Crm.userDetails.TIME_FORMAT.replace('a', 'A'),
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + " " + Crm.userDetails.TIME_FORMAT.replace('a', 'A')
            },
            {
                time: Crm.userDetails.TIME_FORMAT.replace('a', 'A'),
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + "TV" + Crm.userDetails.TIME_FORMAT.replace('a', 'A') //No i18n
            },
            {
                time: Crm.userDetails.TIME_FORMAT,
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + " " + Crm.userDetails.TIME_FORMAT
            },
            {
                time: Crm.userDetails.TIME_FORMAT,
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + "TV" + Crm.userDetails.TIME_FORMAT //No i18n
            },
            {
                time: Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm'),
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + " " + Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm')
            },
            {
                time: Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm'),
                date: Crm.userDetails.DATE_PATTERN.toUpperCase(),
                full: Crm.userDetails.DATE_PATTERN.toUpperCase() + "TV" + Crm.userDetails.TIME_FORMAT.toUpperCase().replace(':MM', ':mm') //No i18n
            },
            {
                time: "HH:mm:ssZ", //No i18n
                date: "YYYY-MM-DD", //No i18n
                full: "YYYY-MM-DDTHH:mm:ssZ" //No i18n
            }
        ],
            formatsLen = formats.length,
            mom, foundFormat = false,
            pos;

        for (var i = 0; i < formatsLen; i++) {
            mom = $L.moment(dateTimeStr, formats[i].full, { i18n: true });
            if (mom.validate()) {
                foundFormat = true;
                pos = i;
                break;
            }
        }

        if (foundFormat) {
            return {
                format: {
                    full: formats[pos].full,
                    date: formats[pos].date,
                    time: formats[pos].time
                },
                moment: mom
            };
        }
        return {};
    }
});
//$Id$
Lyte.registerDataType("date", {//no i18n
	extends: "string",//no i18n
	serialize: function (deserialized) {
		var alreadyValidated = Utils.isValidDate("yyyy-mm-dd", deserialized);//no i18n
		if (deserialized) {
			if (alreadyValidated) {
				return deserialized;
			}
			return deserialized && typeof deserialized === "string" && deserialized.trim() ? apiDateFormat(deserialized) : "";//no i18n
		}
	},
	deserialize: function (value) {
		if (value && Utils.isValidDate("yyyy-mm-dd", value)) {
			value = value.replace(/[+-]\d{2}:\d{2}/, '');
			//             var formattedDate = Utils.getDateInUserDatePattern(value, true);//No I18n
			var mixin = Lyte.registeredMixins["crux-element-validation"];//No I18n
			var res = /^(.*)T/.exec(value);
			if (res) {
				value = res[1];
			}
			if (_lyteUiUtils.updateI18n && !_cruxUtils.isI18nUpdated) {
				var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];
				months.forEach(function (m) {
					_lyteUiUtils.updateI18n(m, I18n.getMsg(m));
				});
				_cruxUtils.isI18nUpdated = true;
			}
			return mixin.getDateInUserDatePattern(mixin.getDateObjectFromString(value, "YYYY-MM-DD"), Crm.userDetails.DATE_PATTERN, undefined, true);//No I18n
		}
		return value;
	}
});
Lyte.registerDataType("datetime", {//no i18n
	extends: "string",//no i18n
	serialize: function (deserialized) {
		if (deserialized) {
			var temp_desz = deserialized.replace(/[+-]\d{2}:\d{2}/, '');
			if (deserialized === Lyte.registeredMixins["crm-date-datetime-mixin"].getDateTimeWithTimezone(new Date(temp_desz))) {
				return deserialized;
			}
			var dateInfo = Lyte.registeredMixins["crm-date-datetime-mixin"].getDateTimeFormatFromString(deserialized); //NO I18N
			if (dateInfo && Object.keys.length && dateInfo.format && dateInfo.moment) {
				if (dateInfo.format.full !== "YYYY-MM-DDTHH:mm:ss") {
					return dateInfo.moment.format("YYYY-MM-DDTHH:mm:ss"); //NO I18N
				}
				return deserialized;
			}
			return deserialized;
		}
	},
	deserialize: function (value) {
		if (value && typeof value === 'string' && value.match('T')) {
			value = value.replace(/[+-]\d{2}:\d{2}/, '');
			//                var date = new Date(value);
			var dateValue = value.split("-");
			var date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2].split("T")[0]);
			value = value.split("T");
			var time = value[1] ? value[1].split(":") : '';
			if (time) {
				date.setHours(time[0]);
				date.setMinutes(time[1]);
			}
			// var formattedDate = Utils.getDateTimeInUserFormat(date, true);//No I18n
			return $L.moment(new Date(date)).i18N(Crm.userDetails.DATE_PATTERN.toUpperCase()) + " " + Utils.getTimeInUserFormat(date, true);
			// var month = formattedDate.slice(0,3);
			//  return formattedDate.replace(month,I18n.getMsg(month));
		}
		return value;
	}
});
Lyte.registerDataType("datetimeorg", {//no i18n
	extends: "string",//no i18n
	serialize: function (deserialized) {
		if (deserialized) {
			var temp_desz = deserialized.replace(/[+-]\d{2}:\d{2}/, '');
			if (deserialized === Lyte.registeredMixins["crm-date-datetime-mixin"].getDateTimeWithTimezone(new Date(temp_desz))) {
				return deserialized;
			}
			var dt = deserialized.split('TV');
			deserialized = dt.length > 1 ? dt[0] + ' ' + dt[1] : deserialized;
			var checkLocale = (['dd.mm.yyyy.', 'yyyy. mm. dd', 'yyyy.mm.dd', "yyyy'年'mm'月'dd'日'"].indexOf(Crm.userDetails.DATE_PATTERN.toLowerCase()) !== -1) ? true : false;//no i18n
			var dateObj = Utils.convertUsrtoDefaultDatePattern(dt[0], checkLocale);
			if (dt[1]) {
				var timeObj = Lyte.registeredMixins["crm-date-datetime-mixin"].getfinalTimeObjectfromTime(dt[1]);//no i18n
				if (validationUtils.isNotEmpty(timeObj)) {
					dateObj.setHours(timeObj.hrs);
					dateObj.setMinutes(timeObj.mins);
				}
			}
			var localdatetime = Lyte.registeredMixins["crm-date-datetime-mixin"].getDateTimeWithTimezone(dateObj);//no i18n
			return localdatetime;
		}
	},
	deserialize: function (value) {
		if (value && typeof value === 'string' && value.match('T')) {
			return new CrmDate(new Date(value), true).getDateTimeInUserPattern();
		}
		return value;
	}
});
Lyte.registerDataType("multi-picklist", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value && typeof value !== 'string') {
			if (value[0] !== undefined && typeof value[0] === 'string') {
				value = value.join("; ");
			} else {
				value = value.map(function (f) { return f.value; }).join('; ');
			}
		}
		return value;
	},
	serialize: function (value) {
		if (value && typeof value === 'string') {
			var val;
			try {
				val = JSON.parse(value);
			} catch (e) {
				val = value;
			}
			return val;
		}
		return value;
	}
});
Lyte.registerDataType("tax", {//No I18n
	extends: "string",//No I18n
	deserialize: function (obj) {
		var value = "";
		var objLen = obj.length;
		if (obj && objLen) {
			for (var i = 0; i < objLen; i++) {
				if (obj[i].value) {
					value += obj[i].value + "; ";
				}
			}
			value = value && typeof value === 'string' && value.trim() || value;
			value = value.substring(0, value.length - 1);
			return value;
		}

	}
});

Lyte.registerDataType("territory", {//No I18n
	extends: "array"//No I18n
});
Lyte.registerDataType("phone", {//No I18n
	extends: "string",//No I18n
	deserialize: function (val) {
		var newVal = val;
		if (Crm.userDetails.COUNTRY_LOCALE === "en_US" && newVal.match(/^[0-9]+$/)) {
			newVal = "(";
			if (val.length === 10) {
				newVal += val.substring(0, 3) + ") " + val.substring(3, 6) + "-" + val.substring(6, 10);
			}
			else if (val.length === 9) {
				newVal += val.substring(0, 5) + ")-" + val.substring(5, 9);
			}
			else {
				newVal = val;
			}
		}
		return newVal;
	},
	serialize: function (value) {
		if (value) {
			//to remove hidden characters -- added for LyteCreate
			return value.replace(/[\u202c]/g, "");
		}
		return value;
	}
});
Lyte.registerDataType("user-view-date-time", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value) {
			value = value.replace(/[+-]\d{2}:\d{2}/, '');
			var date = new Date(value);
			value = value.split("T");
			var time = value[1].split(":");
			date.setHours(time[0]);
			date.setMinutes(time[1]);
			var newDate = date;
			//value=Utils.convertUsrtoDefaultDatePattern(date);
			//value.setTime(value.getTime()+(value.getTimezoneOffset()*60000) )
			var formattedDate = Utils.getDateInUsrViewFormat(newDate);
			formattedDate += " " + Utils.getTimeInUserFormat(newDate, true);
			var month = formattedDate.slice(0, 3);
			return formattedDate.replace(month, I18n.getMsg(month));
		}
		return value;
	}
});

Lyte.registerDataType("time-in-minutes", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value) {
			return Utils.convertTimeInDoubleToReadableForm(value);
		}
	}
});

Lyte.registerDataType("time-in-hrs", {//This datatype for services and appointment modules //No I18n 
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value) {
			var serviceMixin = Lyte.registeredMixins["crm-services-mixin"];
			serviceMixin = !serviceMixin && window.Lyte.registeredMixins["crm-services-mixin"] ? window.Lyte.registeredMixins["crm-services-mixin"] : serviceMixin;
			return serviceMixin ? serviceMixin.methods.convertDurationTimeDoubleToUserFormat(value) : value; //No I18n
		}
	},
	serialize: function (value) {
		if (value) {
			var serviceMixin = Lyte.registeredMixins["crm-services-mixin"];
			serviceMixin = !serviceMixin && window.Lyte.registeredMixins["crm-services-mixin"] ? window.Lyte.registeredMixins["crm-services-mixin"] : serviceMixin;
			return serviceMixin ? serviceMixin.methods.convertTimeInHrMinsToDouble(value) : value; //No I18n
		}
		return value;
	}
});

Lyte.registerDataType("millisec-to-time", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value) {
			return Utils.getTimefromMillisecs(value);
		}
	}
});
Lyte.registerDataType("exchange-rate", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value) {
			return Number(value).toFixed(9);
		}
	}
});
Lyte.registerDataType("expected-revenue", {//No I18n
	extends: "string",//No I18n
	deserialize: function (value) {
		if (value !== undefined) {
			return value + '';
		}
	}
});
Lyte.registerDataType("multi-user", {//No I18n
	extends: "object",//No I18n
	deserialize: function (value) {
		if (value) {
			return value.length ? { users: value } : undefined;
		}
	},
	serialize: function (value) {
		if (value) {
			return value.users;
		}
		return value;
	}
});
/*Lyte.registerDataType("multi-select-lookup",{
	extends : "object", // No I18n
	deserialize : function(value)
	{
		if(value)
		{
			console.log(value);
			return value.length ? {options : value} : undefined;
		}
	},
	serialize : function(value)
	{
		if(value)
		{
			console.log(value);
			return value.options;
		}
		return value;
	}
})*/
//$Id$
//store.unregisterAdapter("application")
store.registerAdapter("application", { //No I18N
    namespace: "crm/v2", //No I18n
    batchNamespace: "batch_requests", //No I18n
    actionNamespace: "actions", //No I18n
    Tab_ID: (function () {
        if (sessionStorage.getItem("TabZID") === null)//NO I18N
        {
            var Session_ID = ($L && $L.moment) ? $L.moment('').toDate().valueOf() : Date.now();
            sessionStorage.setItem("TabZID", Session_ID);//NO I18N
        }
        return sessionStorage.getItem("TabZID");//NO I18N
    })(),

    headersForRequest: function () {
        var headers = {
            "X-ZCSRF-TOKEN": csrfParamName + "=" + csrfToken, //No I18N	
            "X-CRM-ORG": crmZgid, //No I18N	
            "X-CRM-REF-ID": crmZuid + '_' + crmZgid + '_' + this.Tab_ID + '_' + Date.now() //no i18n
        };
        if (window.clientPortalName) {
            headers["X-CRMPORTAL"] = window.clientPortalName;//No I18N
        }
        if (typeof crmZgid !== 'undefined' && crmZgid) {
            headers["X-CRM-ORG"] = crmZgid; //No I18N
        }
        // if (_cruxUtils && _cruxUtils.isLyteWidgetBuild) {
        //     headers["X-CRM-FEATURE-NAME"] = 'crm/lux';//no i18n
        // }
        return headers;
    },
    buildURL: function (modelName, type, payLoad, queryParams, url) {
        var lastIndex = url.lastIndexOf(modelName);
        if (lastIndex !== -1) {
            url = url.substring(0, lastIndex) + modelName + "s" + url.substring(lastIndex + modelName.length); //No I18N
        }
        return url;
    },
    parseResponse: function (type, modelName, xhr, payload) { //added for payload is coming as "" in lyte version upgrade to 3.0.1
        if (!payload && xhr && xhr.status === 204) {
            return {};
        }
        return payload;
    }

});
//$Id$
//store.unregisterSerializer("application")
store.registerSerializer("application", {//No I18n
    extractMeta: function (payLoad) {
        if (payLoad && payLoad.info) {
            payLoad.meta = payLoad.info;
            delete payLoad.info;
            return payLoad.meta;
        }
        return undefined;
    },
    serialize: function (type, payLoad) {
        if (type === "batch") { //NO i18n
            payLoad.batch_requests = payLoad.batch;
            delete payLoad.batch;
        }
        return payLoad;
    },
    payloadKey: function (modelName) {
        if (modelName !== 'blueprint') {
            return modelName + 's';//no i18n
        }
    },
    normalizeResponse: function (modelName, type, payLoad) {
        if (payLoad === undefined || payLoad === null || Object.keys(payLoad).length === 0) {
            var res = {};
            if (type === "findAll") {
                res[modelName] = [];
            }
            else if (type === "findRecord") {
                res[modelName] = {};
            }
            return res;
        }
        return payLoad;
    }
});
//$Id$
/*
//Temporary code for testing
let module_tojson = {};
for (var k in moduleRecordMapping) {
    module_tojson[k] = moduleRecordMapping[k].$.toJSON();
}

store.unregisterModel("module");

*/
store.registerModel("module", { //No I18N
    //basic properties
    api_name: Lyte.attr("string"), //No I18N
    id: Lyte.attr("string"), //No I18N
    plural_label: Lyte.attr("string"), //No I18N
    singular_label: Lyte.attr("string"), //No I18N
    module_name: Lyte.attr("string"), //No I18N
    profiles: Lyte.attr("array"), //No I18N

    //relations
    fields: Lyte.hasMany("field", { "deserialize": "record" }), //No I18N
    layouts: Lyte.hasMany("layout"), //No I18N
    related_lists: Lyte.hasMany("related_list", { inverse: "relatedListModule" }), //No I18N

    didLoad: function (record) {
        record = (this instanceof Record) ? this : record;
        var module_id = record.id;
        var moduleName = record.module_name;
        if (moduleName === "Deals") {
            record.module_name = "Potentials";//No I18n
        } if (moduleName === "Meetings") { //No I18n
            record.module_name = "Events";//No I18n
        }
        var field = {};
        var fieldList = record.fields;
        field.id = Lyte.attr('string');//No I18N
        /*
                //temp temp
                store.unregisterModel(module_id);
        */
        if (fieldList && fieldList.length) { //length added since it registers all module's model -- due to new lyte build --lyteCreate
            //added this for handling new fields/section added and we don't reload the page
            if (!store.model[module_id]) {
                let lenF = fieldList.length;
                for (let i = 0; i < lenF; i++) {
                    if (fieldList[i].data_type !== "subform" && fieldList[i].data_type !== "static_subform") {
                        field[fieldList[i].api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]));
                        field[fieldList[i].api_name].fieldID = fieldList[i].id;
                        field[fieldList[i].api_name].uiType = fieldList[i].ui_type;
                        field[fieldList[i].api_name].columnName = fieldList[i].column_name;
                        field[fieldList[i].api_name].fieldType = fieldList[i].data_type;
                        field[fieldList[i].api_name].length = fieldList[i].length;
                        field[fieldList[i].api_name].displayLabel = fieldList[i].display_label;
                        field[fieldList[i].api_name].isCustomField = fieldList[i].custom_field;
                        if (fieldList[i].column_name === "PRICINGDETAILS") {
                            field[fieldList[i].api_name].watch = true;
                        }
                    } else {
                        let serializeVal = Crm.userDetails.isSubformNewComponentEnabled || Crm.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM ? "partial" : "record";//no i18n
                        let subform_id = fieldList[i].subform ? fieldList[i].subform.id : fieldList[i].associated_module.id;
                        field[fieldList[i].api_name] = Lyte.hasMany(subform_id, { serialize: serializeVal });
                        field[fieldList[i].api_name].cusRelationFldType = "subform";//ZCRM-193858
                        if (!store.model[subform_id]) {
                            let subfield = {};
                            subfield.__parent_module__ = Lyte.belongsTo(record.id, { inverse: fieldList[i].api_name });
                            if (!fieldList[i].custom_field && ["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fieldList[i].api_name)) {
                                subfield.$parent_line_item_id = Lyte.attr("string");//No i18N
                            }
                            store.registerModel(subform_id, subfield, { extends: 'entity' }); //No I18N
                        }
                        if (!record.currsubformApinames) {
                            record.currsubformApinames = [];
                        }
                        if (!record.currsubformApinames.includes(fieldList[i].api_name)) {
                            record.currsubformApinames.push(fieldList[i].api_name);
                        }
                    }
                }
                field.$state = Lyte.attr("string");//No i18N
                field.$wizard_connection_path = Lyte.attr("array");//No i18N
                field.$validation_rule_action = Lyte.attr("object");//NO I18N
                field.$transitionid = Lyte.attr("string");//No i18N
                if (["Quotes", "Invoices", "SalesOrders", "PurchaseOrders"].includes(moduleName)) {
                    field.$line_tax = Lyte.attr("array", { watch: true });//No i18N
                    field.$parent_inventory_id = Lyte.attr("string");//No i18N
                }
                store.registerModel(module_id, field, { extends: 'entity' }); //No I18N
            } else {
                let lenF = fieldList.length;
                var _model = store.model[module_id];
                if (_model) {
                    for (let i = 0; i < lenF; i++) {
                        if (!_model.fieldList[fieldList[i].api_name] || (_model.fieldList[fieldList[i].api_name].cusRelationFldType !== "subform" && !_model.fieldList[fieldList[i].api_name].fieldType)) { //ZCRM-192913
                            if (fieldList[i].data_type !== "subform" && fieldList[i].data_type !== "static_subform") {
                                var k = {};
                                k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
                                k.fieldID = fieldList[i].id;
                                k.uiType = fieldList[i].ui_type;
                                k.columnName = fieldList[i].column_name;
                                k.fieldType = fieldList[i].data_type;
                                k.length = fieldList[i].length;
                                k.displayLabel = fieldList[i].display_label;
                                k.isCustomField = fieldList[i].custom_field;
                                if (fieldList[i].column_name === "PRICINGDETAILS") {
                                    k.watch = true;
                                }
                                store.addField(module_id, fieldList[i].api_name, k.type, k, undefined, true);
                            } else {
                                let serializeVal = Crm.userDetails.isSubformNewComponentEnabled || Crm.userDetails.FIELD_OF_LOOKUP_IN_SUBFORM ? "partial" : "record";//No I18N
                                store.addField(module_id, fieldList[i].api_name, Lyte.hasMany(fieldList[i].subform.id, { serialize: serializeVal }));
                                if (_model.fieldList[fieldList[i].api_name]) {
                                    _model.fieldList[fieldList[i].api_name].cusRelationFldType = "subform";//ZCRM-193858
                                }
                                if (!store.model[fieldList[i].subform.id]) {
                                    let subfield = {};
                                    subfield.__parent_module__ = Lyte.belongsTo(record.id, { inverse: fieldList[i].api_name });
                                    if (!fieldList[i].custom_field && ["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fieldList[i].api_name)) {
                                        subfield.$parent_line_item_id = Lyte.attr("string");//No i18N
                                    }
                                    store.registerModel(fieldList[i].subform.id, subfield, { extends: 'entity' }); //No I18N
                                }
                                if (!record.currsubformApinames) {
                                    record.currsubformApinames = [];
                                }
                                if (!record.currsubformApinames.includes(fieldList[i].api_name)) {
                                    record.currsubformApinames.push(fieldList[i].api_name);
                                }
                            }
                        } else {
                            //reset the dynamically changeable properties --- can be modifed via cscript, layout rules ---added for lyteCreate
                            _model.fieldList[fieldList[i].api_name].length = fieldList[i].length;
                        }
                    }
                    if (!_model.fieldList.$state) {
                        store.addField(module_id, '$state', "string");//No i18N
                    }
                    if (!_model.fieldList.$wizard_connection_path) {
                        store.addField(module_id, '$wizard_connection_path', "array");//No i18N
                    }
                    if (!_model.fieldList.$validation_rule_action) {
                        store.addField(module_id, '$validation_rule_action', "object");//No i18N
                    }
                    if (!_model.fieldList.$transitionid) {
                        store.addField(module_id, '$transitionid', "string");//No i18N
                    }
                    if (["Quotes", "Invoices", "SalesOrders", "PurchaseOrders"].includes(moduleName)) {
                        if (!_model.fieldList.$line_tax) {
                            store.addField(module_id, '$line_tax', "array", { type: "array", watch: true });//No i18N
                        }
                        if (!_model.fieldList.$parent_inventory_id) {
                            store.addField(module_id, '$parent_inventory_id', "string");//No i18N
                        }
                    }
                }
            }
        }
        if (validationUtils.isNotEmpty(record.layouts) && record.layouts.length) {
            record.layouts.forEach(function (lay) {
                if ((lay.status >= 0 || lay.status === 'active') && lay.sections && lay.sections.length) {
                    Lyte.registeredMixins["crm-crux-module-mixin"].addSubformFieldsintoLyteModel(lay.sections);//no i18n
                }
            });
        }
        if (moduleName) {
            if (typeof moduleRecordMapping !== "undefined" && !moduleRecordMapping[moduleName]) {
                moduleRecordMapping[moduleName] = record;
            }
            if (typeof idModuleMapping !== "undefined" && !idModuleMapping[module_id]) {
                idModuleMapping[module_id] = moduleName;
            }
            if (typeof moduleApiMapping !== "undefined" && !moduleApiMapping[moduleName]) {
                moduleApiMapping[moduleName] = record.api_name;
            }
            if (typeof moduleApiVsNameMapping !== "undefined" && !moduleApiVsNameMapping[record.api_name]) {
                moduleApiVsNameMapping[record.api_name] = moduleName;
            }
        }
    }.on("add")
}, {
    actions: {
        view_preference_configurations: {}
    }
});
/*
for (let k in module_tojson) {
    store.pushPayload('module', module_tojson[k]);
}
*/
//$Id$
//store.unregisterAdapter("module");
store.registerAdapter("module", {//No I18n
    namespace: "crm/v2.2/settings",//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        url = this.$super.buildURL(modelName, type, queryParams, payLoad, url, actionName, customData);
        if (type === 'action') {
            switch (actionName) {
                case "view_preference_configurations":
                    url = url.replace("v2.2", "v6");
                    var replaceStr = "/settings/modules/"; //No I18n
                    replaceStr = payLoad.id ? replaceStr + payLoad.id + "/" : replaceStr;
                    url = url.replace(replaceStr, "/settings/modules/" + customData.module + "/");
                    return url;
            }
        }
        if (type !== "findAll") {
            var id = url.substring(url.lastIndexOf('/') + 1);
            if (!["ABM_Account__s", "ABM_Segment__s", "ABM_Account_Segment__s"].includes(id)) {
                var moduleName = idModuleMapping[id];
                if (moduleName) {
                    url = url.replace(id, moduleRecordMapping[moduleName].api_name);
                }
            }
        }
        if (!queryParams) {
            queryParams = {};
        }
        if (type === "findRecord" && !queryParams.include) {
            queryParams.include = ["$properties", "$on_demand_properties", "layouts", "custom_view", "mass_action_cv", "show_social", "show_webform", "show_visitor", "show_googlesync", "show_emailparser",  //No i18n
                "show_phonebridge", "show_salessignals", "show_emailsettings", "show_dashboard", "default_view", "chart_view", "chart_view_supported", "chart_view_cache_supported", "per_page", "filter_status", "kanban_view", "kanban_view_supported", "stage_view", "customized_view", "show_zf_panel", "task_completed_rule_configured", "new_call_view", "zb_custommodule_enabled", //No i18n
                "group_by_field_available", "kanban_feature_status", "kanban_view_fields", "module_mlabel", "module_nlabel", "zia_view", "territory", "related_lists", "related_list_properties", "business_card_fields", "search_layout_fields", "cpq_search_layout_fields", "lookup_field_properties"]; //No i18n
        }
        if (queryParams.include) {
            queryParams.include = queryParams.include.toString();
        }
        return url;
    },
    methodForRequest: function (method, type, queryParams, customData) {
        if (method === "PATCH") {
            return "PUT";//no i18n
        }
        if (type === "action") {
            method = customData && customData.type ? customData.type : method;
        }
        return method;
    },
    processRequest: function (type, modelName, payLoad, snapshot, customData, queryParams, key) {
        if (type === "findRecord") {
            if (customData && customData.getMeta === true) {
                return undefined;
            }
            var _this = this;
            var module = store.peekRecord("module", key).module_name;//No I18n
            if (customData && (customData.getFields === true || customData.layoutId)) {
                return this.fetchFields(module, customData).then(function (data) { //No i18n
                    _this.deleteXHR(module);
                    var a = [];
                    a[0] = data;
                    return JSON.stringify({ modules: a });
                });
            }
            var moduleInfo = store.peekRecord("module", key); //No I18N
            return Lyte.resolvePromises({
                module: store.findRecord("module", key, queryParams, undefined, true, { getMeta: true }),//No I18n
                fields: _this.fetchFields(moduleInfo.module_name, customData)
            }).then(function (res) {
                _this.deleteXHR(module);//No I18n
                res.module[0] = res.module[0].$.toJSON();
                return JSON.stringify({ modules: res.module });
            });
        }
        return undefined;
    },
    fetchFields: function (module, customData) {
        var qp = "";
        if (customData && customData.layoutId) {
            qp = "&layoutId=" + customData.layoutId;//No I18n
            if (customData.mode) {
                qp += "&mode=" + customData.mode;//No i18n
            }
        } else {
            qp = "&getField=true";//No I18n
        }
        var _self = this;
        return new Promise(function (res, rej) {
            var xhr = _self.getXHR(module, customData), url = Crm.getCrmBasePath() + "/ModuleCache.do"; //No I18N
            var reqUrl = url; //No I18N
            xhr.open("GET", reqUrl + "?module=" + module + qp);
            var hd = store.adapter.application.headersForRequest();
            for (var key in hd) {
                xhr.setRequestHeader(key, hd[key]);
            }
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var clonedData = xhr.response ? Object.assign({}, JSON.parse(xhr.response)) : {};
                    //need to show "lead name" instead of "full name" for leads and contact module alone.
                    var dummyModuleData = store.peekRecord('module', clonedData.id); //no i18n
                    let fullNameField = dummyModuleData && ["Leads", "Contacts"].indexOf(dummyModuleData.api_name) !== -1 && clonedData && clonedData.fields ? clonedData.fields.filter(fld => fld.column_name === "FULLNAME")[0] : undefined;//no i18n
                    if (fullNameField) {
                        fullNameField.field_label = fullNameField.display_label = I18n.getMsg("crm.label.vendor.name", dummyModuleData.singular_label);//no i18n
                    }

                    var mod = store.serializer.module.normalize("module", "findRecord", clonedData, customData); //No I18n
                    if (customData && customData.layoutId) {
                        //only this layout alone sets in relation, other layouts removed from relation
                        dummyModuleData = store.peekRecord('module', mod.id); //no i18n
                        if (dummyModuleData.layouts) {
                            var allLayouts = dummyModuleData.layouts.mapBy('id');//no i18n
                            allLayouts.removeLastOccurenceOfElement(customData.layoutId);//fix for ZCRM-112716
                            mod.layouts = mod.layouts.concat(allLayouts);
                        }
                    }
                    store.pushPayload("module", [mod]); //No I18n
                    res(clonedData);
                } else {
                    rej({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                rej({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    },
    getXHR: function (module, customData) {
        if (!this.xhr[module]) {
            this.xhr[module] = new XMLHttpRequest();
        }
        else if (customData && customData.allowMultiple) {
            return new XMLHttpRequest();//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
        }
        return this.xhr[module];
    },
    xhr: {},
    deleteXHR: function (module) {
        delete this.xhr[module];
    }
}).extends("application"); //NO I18N
//$Id$
//store.unregisterSerializer("module");
store.registerSerializer("module", { //No I18N
    serialize: function (type, data, records, customData, modelName, queryParams, actionName) {
        if (actionName === "view_preference_configurations") {
            var payLoad = {};
            payLoad.modules = [data];
            return payLoad;
        }
        var id = data.modules.id;
        if (id === undefined) {
            return data;
        }
        var moduleDetail = store.peekRecord('module', id); //No I18n
        data.modules.api_name = moduleDetail.api_name;
        if (type !== "updateRecord") {
            data.modules.api_name = moduleDetail.api_name;
        }
        data.modules = [data.modules];
        return data;
    },
    serializeKey: function (modelName) {
        return modelName + 's'; //no I18n
    },
    normalizeResponse: function (modelName, type, payLoad) {
        switch (type) {
            case "update": {
                if (payLoad && payLoad.modules && payLoad.modules.length > 0) {
                    payLoad.modules.forEach(function (module) {
                        module.id = module.details.id;
                        delete module.status;
                    });
                }
                break;
            }
            case "pushPayload":
            case "findAll":
                {
                    payLoad = type === "findAll" ? payLoad.modules : payLoad; //No I18N
                    payLoad = type === "findAll" ? { modules: payLoad } : payLoad;//No I18N
                }
                break;
        }
        if (type === "pushPayload") {
            return { modules: payLoad };
        }

        return payLoad;
    },
    normalize: function (modelName, type, snapShot, customData) {
        //to handle customView dropdown in activites module
        var mName = snapShot.module_name;
        if ((type === "findAll" || type === "findRecord") && (mName === 'Calls' || mName === 'Events' || mName === 'Tasks') && !Crm.isActivitySplitDone) {
            delete snapShot.custom_view;
        }
        if ((type === "findAll" || type === "findRecord") && snapShot.layouts) {
            var layoutsLen = snapShot.layouts.length, preventLayouts = [-3, -4];     //status -3 is Marked for delete (Hidden from the UI)
            for (var i = 0; i < layoutsLen; i++) {									   // status -4 is user defined downgraded layout.
                if (preventLayouts.indexOf(snapShot.layouts[i].status) !== -1) {
                    store.unloadRecord("layout", snapShot.layouts[i].id);
                    snapShot.layouts.splice(i, 1);
                    i--; layoutsLen--;
                    continue;
                }
                if (snapShot.id) {
                    snapShot.layouts[i].module = { id: snapShot.id };
                }
                this.setProperty(snapShot.layouts[i], customData);
            }
        }
        if (snapShot.fields && customData && !customData.getExternalFields) {
            var fieldsLength = snapShot.fields.length;
            var fields = [];
            var externalProp = "";
            var field = null;
            for (let i = 0; i < fieldsLength; i++) {
                field = snapShot.fields[i];
                externalProp = field.external;
                if (externalProp === null) {
                    fields.push(field);
                }
            }
            if (typeof fields === "object" && fields.length > 0) {
                snapShot.fields = fields;
            }
        }
        return snapShot;
    }
}, { mixins: ["crm-crux-module-mixin"] });//No I18n
if (typeof moduleDetailedInfo !== 'undefined' &&
    moduleDetailedInfo.modules &&
    moduleDetailedInfo.modules.length) {
    store.pushPayload('module', moduleDetailedInfo.modules, true);//No I18n
}
//$Id$
//store.unregisterModel("user")
store.registerModel("user", { //No I18N
    fields: Lyte.attr('array'),//No I18N
    name: Lyte.attr('string'),//No I18n
    zuid: Lyte.attr('string'), //No I18n
    customize_info: Lyte.attr('object'), //No I18n
    alias: Lyte.attr('string'), //No I18n
    confirm: Lyte.attr('boolean'), //No I18n
    date_format: Lyte.attr('string'), //No I18n
    email: Lyte.attr('string'), //No I18n
    first_name: Lyte.attr('string'), //No I18n
    full_name: Lyte.attr('string'), //No I18n
    last_name: Lyte.attr('string'), //No I18nNo I18n
    status: Lyte.attr('string'), //No I18n
    language: Lyte.attr('string'), //No I18n
    locale: Lyte.attr('string'), //No I18n
    country_locale: Lyte.attr('string'), //No I18n
    time_format: Lyte.attr('string'), //No I18n
    time_zone: Lyte.attr('string'), //No I18n
    Currency: Lyte.attr("string"), //NO I18n
    id: Lyte.attr('string')//No I18N
}, {
    actions: {
        "search": { "endPoint": "search" }, //NO I18n
        "convert": {}, //NO I18n
        "get_unassigned": {}, //No I18N
        "get_assigned": {}, //No I18N
        "transfer_and_delete": {}, //No I18N 
        "grouped_counts": {}, //No I18N
        "count": {}, //NO I18n
        "get_territories": {}, //No I18N
        "reinvite": {} //NO I18N
    }
});
//$Id$
//store.unregisterAdapter("user")
store.registerAdapter("user", {//No I18n
    xhrReq: new XMLHttpRequest(),
    namespace: "crm/v7", //No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace(modelName, modelName + "s"); //NO I18n
       if(typeof(featuresAvailable)  !== 'undefined' && featuresAvailable.DIGITAL_EMPLOYEE_SUPPORT){
			url = url.replace("v7","v9");
		}
        return url;
    },
    methodForRequest: function (method, type) {
        if (method === "PATCH" && type === "updateRecord") {
            return "PUT"; //NO i18n
        }
        return method;
    },
    processRequest: function (type, modelName, payload, snapshot, customData) {
        var _self = this;
        if (type === "action") {
            payload = JSON.parse(payload);
            if (payload.type === "search" || payload.type === "count") {
                return new Promise(function (resolve, reject) {
                    var xhr = _self.xhrReq;
                    var url = payload.type === "search" ? "/" + _self.namespace + "/users/search?" : "/" + _self.namespace + "/users/actions/count?"; //NO I18n
                     if(typeof(featuresAvailable)  !== 'undefined' && featuresAvailable.DIGITAL_EMPLOYEE_SUPPORT){
			            url = url.replace("v7","v9");
		            }
                    if (payload.type === "count" && customData) {
                        payload.customData = customData;
                    }
                    for (var k in payload.customData) {
                        if (k !== "tempApiVersion") {
                            url += k + "=" + encodeURIComponent(payload.customData[k]) + "&";
                        }
                    }
                    xhr.open("GET", url);
                    var hd = store.adapter.application.headersForRequest(type, undefined, payload.customData);
                    for (var key in hd) {
                        xhr.setRequestHeader(key, hd[key]);
                    }
                    xhr.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        }
                    };
                    xhr.onerror = function () {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    };
                    xhr.send();
                });
            }
            else if (customData && customData.feature !== "subordinates") { //No I18n
                var url;
                return new Promise(function (resolve, reject) {
                    var xhr = _self.xhrReq;
                    xhr.open("POST", url);
                    var hd = store.adapter.application.headersForRequest();
                    for (var key in hd) {
                        xhr.setRequestHeader(key, hd[key]);
                    }
                    xhr.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(xhr.response);
                        }
                        else if (this.status === 400 && xhr.response) {
                            reject({
                                status: this.status,
                                statusText: xhr.response

                            });
                        }
                        else {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        }
                    };
                    xhr.onerror = function () {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    };
                    xhr.send(JSON.stringify(customData));
                });
            }
        }
    },
    parseResponse: function (type, modelName, xhrObj, payLoad) {
        if (payLoad.get_assigned) {
            return payLoad.get_assigned;
        }
        return payLoad;
    }
});
//$Id$
//store.unregisterSerializer("user")
store.registerSerializer("user", { //No I18N
    varPayloadKey: 'users',  //for lucene search //No I18N
    serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {
        if (type === "action") {
            return actionName === "search" ? { type: "search", customData: customData } : actionName === "count" ? { type: "count" } : {};//No I18N
        }
        if (type === "updateRecord" && payLoad && !payLoad[this.varPayloadKey] && payLoad['user']) {
            payLoad[this.varPayloadKey] = [payLoad['user']];
            delete payLoad.user;
        }
        return payLoad;
    },
    normalizeUserData: function (user) {
        for (var prop in user) {
            if (user[prop] === null) {
                user[prop] = undefined;
            }
        }
    },
    normalizeResponse: function (modelName, type, payLoad) {
        if (validationUtils.isEmpty(payLoad) && (type === "findRecord" || type === "findAll")) {
            payLoad.users = [];
        } else if (payLoad && payLoad.count !== undefined) {
            payLoad.meta = {
                count: payLoad.count
            };
            payLoad.users = [];
            delete payLoad.count;
        } else if (type === "findRecord" || type === "findAll") {
            var nameformat = Crm.userDetails.NAME_FORMAT.split(',');//No I18N
            var userLength = payLoad.users.length;
            var firstName = nameformat.indexOf("First Name");//No I18N
            var lastName = nameformat.indexOf("Last Name");//No I18N
            for (var i = 0; i < userLength; i++) {
                var userObject = payLoad.users[i];
                var fullname = userObject.last_name ? userObject.last_name : userObject.first_name;
                if (firstName > lastName) {
                    fullname = (userObject.first_name ? userObject.first_name : "") + " " + (userObject.last_name ? userObject.last_name : "");//No I18N
                }
                else {
                    fullname = (userObject.last_name ? userObject.last_name : "") + " " + (userObject.first_name ? userObject.first_name : "");//No I18N
                }
                payLoad.users[i].full_name = fullname.trim();
            }
        }
        if (type === "updateRecord" && payLoad && payLoad[this.varPayloadKey] && payLoad[this.varPayloadKey][0] && payLoad[this.varPayloadKey][0].details) {
            payLoad[this.varPayloadKey][0].id = payLoad[this.varPayloadKey][0].details.id;
        }
        var users = payLoad.users;
        if (users) {
            if (users.constructor === Array) {
                users.forEach(function (user) {
                    this.normalizeUserData(user);
                }.bind(this));
            } else if (users.constructor === Object) {
                this.normalizeUserData(users);
            }
        }
        return payLoad;
    },
    //for lucene search
    payloadKey: function () {
        return this.varPayloadKey;
    },
    normalize: function (modelName, type, payLoad) {
        if (payLoad) {
            var rec = store.peekRecord('user', payLoad.id);//No I18n
            if (!payLoad.image_link && rec && !rec.image_link) {
                payLoad.image_link = "";
            }
        }
        if (type === "findAll" && payLoad !== undefined) {
            var territory = payLoad.territories, len = territory ? territory.length : 0;
            if (len) {
                for (var i = 0; i < len; i++) {
                    if (Object.keys(territory[i]).includes("manager")) {
                        delete territory[i].manager;
                    }
                }
            }
            if (!payLoad.customize_info) {
                payLoad.customize_info = {};
            }
        }
        return payLoad;
    }
});
//$Id$
//store.unregisterModel("layout")
store.registerModel("layout", {	//No I18N
    created_by: Lyte.attr('string'),//No I18N
    id: Lyte.attr('string', { primaryKey: true }),//No I18N
    modified_by: Lyte.attr('string'),//No I18N
    modified_time: Lyte.attr('string'),//No I18N
    name: Lyte.attr('string'),//No I18N
    status: Lyte.attr('number'),//No I18N
    created_time: Lyte.attr('string'),//No I18N
    parent_layout: Lyte.attr("string"),  //No I18N
    profiles: Lyte.attr('array'),//No I18N

    sections: Lyte.hasMany('section'),//No I18N
    module: Lyte.belongsTo('module'),//No I18N
    fields: Lyte.hasMany('field'),//No I18N
    layout_rule: Lyte.hasMany("layout_rule"),//No I18n
    validation_rule: Lyte.hasMany("validation_rule"),//No I18n

    didLoad: function (record) {
        record = (this instanceof Record) ? this : record;
        Lyte.registeredMixins["crm-crux-module-mixin"].addSubformFieldsintoLyteModel(record.sections);//no i18n
    }.on("add")
}, {
    actions: {

    }
});

//$Id$
//store.unregisterAdapter("layout");
store.registerAdapter("layout", {//No I18n
	namespace: "crm/v2.1/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		if(customData && customData.apiVersion === "2.2") {
			url = url.replace("crm/v2/settings", "crm/v2.2/settings");
			url = url.replace("crm/v2.1/settings", "crm/v2.2/settings");
		}
		url = url.replace(modelName, modelName + "s");
		return url;
	}
});
//$Id$
//store.unregisterSerializer("layout")
store.registerSerializer("layout", {//No I18n
	serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {
		//		else if(actionName != 'associated' && actionName != 'layoutDeleteAction' &&  actionName != 'layoutDeactivateAction' &&  actionName != 'layoutActivateAction'  && actionName != 'layoutPermissionAction'){
		if (actionName !== 'associated' && !(customData && customData.noPayloadArray) && payLoad) {
			payLoad.layouts = [payLoad.layouts];
		}
		return payLoad;
	},
	normalize: function (modelName, type, payLoad, customData) {
		if ((type === "findAll" || type === "findRecord") && payLoad) {
			this.setProperty(payLoad, customData);
		}
		return payLoad;
	},
	serializeKey: function (modelName) {
		return modelName + "s"; //No I18N
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
		function a(key) {
			if (key === "Potentials") {
				return queryParams.module === "Potentials";//No I18N
			}
			return moduleApiMapping[key] === queryParams.module;
		}
		function altFind(arr, callback) {
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				var match = callback(arr[i]);
				if (match) {
					return arr[i];
				}
			}
		}
		var module;
		try {
			module = moduleRecordMapping[altFind(Object.keys(moduleApiMapping), a)].id;
		} catch (err) {
			if (customData && customData.clientPortalSettings && err.message === "Cannot read property 'id' of undefined") {
				crmui.showMsgBand("error", I18n.getMsg("portal.apiname.change.error", crmBasePath + '/settings/client-portal'), 10000);//No i18N
				throw err;
			} else {
				module = queryParams.module;
			}
		}
		if ((type === "findAll" || type === "findRecord") && payLoad.layouts) {
			var payLoadLength = payLoad.layouts.length, preventV2Layouts = ["hidden", "downgraded"], preventV1Layouts = [-3, -4]; //No I18n  
			for (var i = 0; i < payLoadLength; i++) {
				//following code is removed in CRM so removing here too (changeset - 2e13386dff0adceee1e5ba54a10f8ab9eec8350f)
				// var sections = payLoad.layouts[i].sections;							   // status -4 is the downgraded layout. //status -3 is Marked for delete (Hidden from the UI)
				// if (customData && !customData.include_external_fields && sections) {
				// 	var sectionLength = sections.length;
				// 	for (var j = 0; j < sectionLength; j++) {
				// 		sections[j].fields = sections[j].fields.filter(field => field.external === null);
				// 	}
				// 	payLoad.layouts[i].sections = sections;
				// }
				if ((customData && !customData.showHiddenLayouts) && (preventV1Layouts.indexOf(payLoad.layouts[i].status) !== -1 || preventV2Layouts.indexOf(payLoad.layouts[i].status) !== -1 || (payLoad.layouts[i].source === "campaign_integration" && payLoad.layouts[i].status === 'inactive'))) {
					store.unloadRecord("layout", payLoad.layouts[i].id);
					payLoad.layouts.splice(i, 1);
					i--; payLoadLength--;
					continue;
				}
				payLoad.layouts[i].module = { id: module };
			}
			//			payLoad.layout = payLoad.layouts;
			//			delete payLoad.layouts;
		}
		return payLoad;
	}
}, { mixins: ["crm-crux-module-mixin"] });//No I18n
//$Id$
//store.unregisterModel("section")
store.registerModel("section", {	//No I18N	
    id: Lyte.attr('string'),//No I18N
    column_count: Lyte.attr('number'),//No I18N
    display_label: Lyte.attr('string'),//No I18N
    name: Lyte.attr('string'),//No I18N
    sequence_number: Lyte.attr('number'),//No I18N
    fields: Lyte.hasMany('field'),//No I18N
    layout: Lyte.belongsTo('layout')//No I18N
});
//$Id$
//store.unregisterModel("field");
store.registerModel("field", {	//No I18N		
    id: Lyte.attr("string"), //No I18n
    api_name: Lyte.attr('string'), //No I18n
    column_name: Lyte.attr('string'), //No I18n
    custom_field: Lyte.attr('boolean'), //No I18n
    data_type: Lyte.attr('string'), //No I18n
    decimal_place: Lyte.attr('string'), //No I18n
    field_label: Lyte.attr('string'), //No I18n
    length: Lyte.attr('number'),//No I18n
    read_only: Lyte.attr('boolean'), //No I18n
    show_type: Lyte.attr('number'), //No I18n
    ui_type: Lyte.attr('number'), //No I18n
    show_type: Lyte.attr('number'), //No I18n
    visible: Lyte.attr('boolean'), //No I18n
    field_read_only: Lyte.attr('boolean'), //No I18n
    default_value: Lyte.attr('string'), //No I18N
    required: Lyte.attr('boolean'),//No I18n
    system_mandatory: Lyte.attr('boolean'),//No I18n
    sequence_number: Lyte.attr('number'), //No I18n
    private: Lyte.attr("object"), //No I18N
    currency: Lyte.attr('object'), //No I18n
    lookup: Lyte.attr('object'), //No I18n
    conversion_mapping: Lyte.attr('object'), //No I18n
    dynamic_field_label: Lyte.attr('string'),//No I18n
    profiles: Lyte.attr("array"), //Don't use profile as relationship.Any queries, contact client team //NO I18N
    formula: Lyte.attr('object'),//No I18n
    rollup_summary: Lyte.attr('object'),//NO I18N
    pick_list_values: Lyte.attr('array'), //No I18N
    mass_update: Lyte.attr('boolean'), //No I18n
    field_read_only: Lyte.attr('boolean'), //NO I18N
    pick_list_values: Lyte.attr('array'), //NO I18N
    //This key only available when getting fields from layout api
    subform_api: Lyte.attr('boolean'), //NO I18N
    //if number field set to follow seperator
    separator: Lyte.attr('boolean'),//NO I18N
    colour_code_enabled: Lyte.attr('boolean'), //NO I18N

    section: Lyte.hasMany('section', { inverse: 'fields' }), //No I18n
    allowed_modules: Lyte.hasMany('module'), //NO I18N
    module: Lyte.hasMany('module', { inverse: 'fields' }), //No I18n
    custom_view: Lyte.belongsTo('custom_view'),//No I18N
    layouts: Lyte.hasMany('layout'), //No I18n

    didLoad: function () {
        this._type = this.$.model._name;
    }
}, {
    actions: {
    }
});

//$Id$
//store.unregisterAdapter("field")
store.registerAdapter("field", {//No I18n
	namespace: "crm/v2.2/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		url = this.$super.buildURL(modelName, type, queryParams, payLoad, url, actionName, customData);
		if(customData && customData.apiVersion) {
			url = url.replace("crm/v2/settings", "crm/v" + customData.apiVersion + "/settings");
		}
		return url;
	},
}).extends("application"); //NO I18N

//$Id$
//store.unregisterSerializer("field")
store.registerSerializer("field", {//No I18N
    serializeKey: function (modelName) {
        return modelName + "s"; //No I18N
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
        var a = store.peekAll('module').filterBy({ api_name: queryParams.module }); //no i18n
        if (payLoad && payLoad.fields && a.length > 0) {
            let modInfo = a[0];
            if (customData && !customData.include_external_fields) {
                payLoad.fields = payLoad.fields.filter(field => field.external === null);
            }
            payLoad.fields.forEach(function (item) {
                item.module = [];
                item.module[0] = a[0] && a[0].id ? a[0].id : '';
                if (item.column_name === "FULLNAME" && ["Leads", "Contacts"].includes(modInfo.api_name)) {
                    item.field_label = item.display_label = I18n.getMsg("crm.label.vendor.name", modInfo.singular_label);//no i18n
                }
                if (type !== 'create' && type !== "update" && item.api_name.indexOf(".") > -1) {
                    item.api_name.replace(".", "__");
                }
            });
        }
        return this.$super.normalizeResponse(modelName, type, payLoad);
    }
});
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
//$Id$
//store.unregisterModel("layout_rule");
store.registerModel("layout_rule", {
    layout: Lyte.belongsTo("layout")//No I18n
});
//$Id$
//store.unregisterAdapter("layout_rule")
store.registerAdapter("layout_rule", {//No I18n
    namespace: 'crm/v4.1/settings',//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        if(customData.newFlow && ((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS) && !queryParams.filters)
		{
			url = url.replace('layout_rule','layout_rules');
			url = url.replace("v4.1", "v9");
			
			if(type === 'delete'){
				url = url + '/'+ customData.layout_id;
			}
			return url;
		}
        url = url.replace(modelName, 'layouts/' + customData.layout_id + '/rules');
        return url;
    }
});
//$Id$
//store.unregisterSerializer("layout_rule");
store.registerSerializer("layout_rule", {
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
        if(customData.newFlow){
            if(Lyte.registeredMixins["crm-crux-create-base-mixin"].isEmptyObj(payLoad)){
                if (((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS)) {
                    return {layout_rules : []};
                }
                return {layout_rule : []};
            }else if(!((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS)){
                var _respL = payLoad.rules.length;
                for (var i = 0; i < _respL; i++){
                    if(!payLoad.rules[i].hasOwnProperty('id')){
                        payLoad.rules[i].id = customData.layout_id + "_" + i;
                    }
                    payLoad.rules[i].layout = customData.layout_id;
                }
            }
        }else{
            if (!payLoad || !Object.keys(payLoad).length) {
                return { layout_rule: [] };
            }
            var _respL = payLoad.rules.length;
            for (var i = 0; i < _respL; i++) {
                if (!payLoad.rules[i].id) {
                    payLoad.rules[i].id = customData.layout_id + "_" + i;
                }
                payLoad.rules[i].layout = customData.layout_id;
            }
        }
        return payLoad;
    },
    payloadKey: function (modelName , type , key , queryParams,customData ) {
        if(customData.newFlow && ((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS) && !queryParams.filters) {
            return 'layout_rules';//no i18n
        }
        return 'rules';//no i18n
    }
});
//$Id$
//store.unregisterModel("validation_rule")
store.registerModel("validation_rule", {
    active: Lyte.attr('string'), //No I18n
    created_time: Lyte.attr('string'),//No I18N
    execution_type: Lyte.attr('string'),//No I18N
    field_validation: Lyte.attr('boolean'),//NO I18N
    associated_function: Lyte.attr("object"), //No I18N
    generated_type: Lyte.attr('string'),//No I18N
    id: Lyte.attr('string', { primaryKey: true }),//No I18N
    modified_time: Lyte.attr('string'),//No I18N
    source: Lyte.attr('string'),//No I18N
    validation_type: Lyte.attr('string'),//No I18N
    conditions: Lyte.attr('array'),//No I18N

    layout: Lyte.belongsTo("layout"),//No I18n
    modified_by: Lyte.belongsTo('user', { serialize: "record" }), //No I18N
    field: Lyte.belongsTo('field', { serialize: "record" }) //No I18N

}, {
    actions: {

    }
});

//$Id$
//store.unregisterAdapter("validation_rule")
store.registerAdapter("validation_rule", {//No I18n
    namespace: 'crm/v2.1/settings',//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace('validation_rule', 'validation_rules');
        return url;
    },
    methodForRequest: function (method, type) {
        if (type === 'create') {
            return "POST";//no i18n
        }
        return method;
    },
    parseResponse: function (type, modelName, xhr, payload, queryParams) {
        if (payload && queryParams && queryParams.layout_id) {
            var layoutId = queryParams.layout_id;
            var len = payload.validation_rules ? payload.validation_rules.length : 0;
            for (var i = 0; i < len; i++) {
                payload.validation_rules[i].layout = layoutId;
            }
        }
        return payload;
    }
});

//$Id$
//store.unregisterSerializer("validation_rule")
store.registerSerializer("validation_rule", {
    normalizeResponse: function (modelName, type, payLoad) {
        if (payLoad) {
            payLoad[modelName] = payLoad.validation_rules ? payLoad.validation_rules : [];
            delete payLoad.validation_rules;
            return payLoad;
        }
        payLoad[modelName] = [];
        return payLoad;
    },
    payloadKey: function (modelName) {
        if (modelName) {
            return modelName;
        }
    }
});

// $Id$
//store.unregisterModel("custom_button");
store.registerModel("custom_button", {//No I18N
});
//$Id$
//store.unregisterAdapter("custom_button")
store.registerAdapter("custom_button", { //No I18n
	namespace: "crm/v2/settings", //No I18n
	delayPersistence: { delete: true },
	buildURL: function (modelName, type, queryParams, payLoad, url) {
		url = url.replace('custom_button', 'custom_buttons'); //No I18n
		return url;
	},

	headersForRequest: function (type, action, customData) {
		var headers = this.$super.headersForRequest();
		if (customData && customData.headers && customData.headers["X-CRM-ORG"]) {
			headers["X-CRM-ORG"] = customData.headers["X-CRM-ORG"]; //No I18n
		}
		return headers;
	},

});
// $Id$
//store.unregisterSerializer("custom_button")
store.registerSerializer("custom_button", {

});

//$Id$
//store.unregisterModel("related_list")
store.registerModel("related_list", {//No I18N
    list_label: Lyte.attr('string'), //No I18N
    sequence_number: Lyte.attr("string"), //No I18N
    display_label: Lyte.attr("string"), //No I18N
    api_name: Lyte.attr("string"), //No I18N
    module: Lyte.attr("object"), //No I18N
    name: Lyte.attr("string"), //No I18N
    action: Lyte.attr("string"), //No I18N
    id: Lyte.attr("string", { primaryKey: true }), //No I18N
    href: Lyte.attr("string"), //No I18N
    type: Lyte.attr("string"), //No I18N
    visibility: Lyte.attr("number"), //No I18N  
    visible: Lyte.attr("boolean"),//No I18N  
    sort_order: Lyte.attr('string'), // No I18n
    connectedmodule: Lyte.attr('string'), //no i18n
    mxnfield: Lyte.attr('string'), //no i18n
    linkingmodule: Lyte.attr('string'), //no i18n
    record_operations: Lyte.attr('object'), //no i18n
    //    fields : Lyte.hasMany('field',{ serialize  : "record" }) //no i18n
    fields: Lyte.attr('array') //no i18n
});
/* $Id$ */
//store.unregisterAdapter("related_list")
store.registerAdapter("related_list", {//NO I18N
	namespace: "crm/v2.2/settings", // NO I18N
	buildURL: function (modelName, type, queryParams, payLoad, url) {
		url = url.replace(modelName, modelName + "s");
		return url;
	},
});

/* $Id$ */
//store.unregisterSerializer("related_list")
store.registerSerializer("related_list", { //No I18N
	payloadKey: function () {
		return 'related_lists'; //No I18N
	},
	serialize: function (type, payLoad) {
		payLoad.related_lists = [];
		payLoad.related_lists[0] = payLoad.related_list;
		delete payLoad.related_list;
		return payLoad;
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
		if (payLoad.related_lists && Array.isArray(payLoad.related_lists)) {
			payLoad.related_lists.forEach(function (item) {
				var module_id;
				var fieldapi;
				if (item.type === 'multiselectlookup') {
					var multiSelectLookupFld = store.peekAll("field").filterBy({ "data_type": "multiselectlookup" }).filter(function (record) { //No I18N
						return record.multiselectlookup.api_name === item.api_name;
					})[0];
					if (multiSelectLookupFld) {
						item.mxnfield = multiSelectLookupFld.id;
						fieldapi = multiSelectLookupFld.api_name;
					}
				}
				if (item.fields && item.fields.length > 0) {
					if (item.type === 'multiselectlookup') {
						module_id = moduleRecordMapping[item.connectedmodule] ? moduleRecordMapping[item.connectedmodule].id : undefined;
						var mxnid = item.module.id;
						if (!store.model[module_id]) {
							store.registerModel(module_id, {}, { extends: 'entity' }); //No I18N
						}
						if (!store.model[mxnid]) {
							store.registerModel(mxnid, {}, { extends: 'entity' }); //No I18N
						}
						var connectedModel = store.model[module_id];
						var mxnModel = store.model[mxnid];
						store.addField(mxnid, fieldapi, Lyte.belongsTo(module_id));
						var field = {};
						field.id = Lyte.attr('string'); //No I18N
						var fieldList = item.fields;
						var lenF = fieldList.length;
						for (var i = 0; i < lenF; i++) {
							if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
								fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
							}
							if (fieldList[i].api_name.split('.').length > 1) {
								var api_name = fieldList[i].api_name.split('.')[1];
								if (!connectedModel.fieldList[api_name]) {
									var k = {};
									k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
									k.fieldID = fieldList[i].id;
									k.columnName = fieldList[i].column_name;
									k.fieldType = fieldList[i].data_type;
									k.displayLabel = fieldList[i].display_label;
									k.isCustomField = fieldList[i].custom_field;

									store.addField(module_id, api_name, k.type, k);
								}
							} else if (!mxnModel.fieldList[fieldList[i].api_name]) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
								if (fieldList[i].data_type !== "subform") { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
									var k = {};//eslint-disable-line no-redeclare
									k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
									k.fieldID = fieldList[i].id;
									k.columnName = fieldList[i].column_name;
									k.fieldType = fieldList[i].data_type;
									k.displayLabel = fieldList[i].display_label;
									k.isCustomField = fieldList[i].custom_field;
									store.addField(mxnid, fieldList[i].api_name, k.type, k);
								}
							}
						}
					} else if (!item.api_name.includes('Chronological')) { // No I18N						
						module_id = item.module.id;
						var field = {};//eslint-disable-line no-redeclare
						field.id = Lyte.attr('string'); //No I18N
						var fieldList = item.fields;//eslint-disable-line no-redeclare
						if (!store.model[module_id]) {
							var lenF = fieldList.length;//eslint-disable-line no-redeclare
							for (var i = 0; i < lenF; i++) { //eslint-disable-line no-redeclare
								if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
									fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
								}
								if (fieldList[i].data_type !== "subform") {
									field[fieldList[i].api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]));
									field[fieldList[i].api_name].fieldID = fieldList[i].id;
									field[fieldList[i].api_name].columnName = fieldList[i].column_name;
									field[fieldList[i].api_name].fieldType = fieldList[i].data_type;
									field[fieldList[i].api_name].displayLabel = fieldList[i].display_label;
									field[fieldList[i].api_name].isCustomField = fieldList[i].custom_field;
								}
							}
							field.$state = Lyte.attr("string");//No i18N
							field.$transitionid = Lyte.attr("string");//No i18N
							store.registerModel(module_id, field, { extends: 'entity' }); //No I18N
						} else {
							var lenF = fieldList.length;//eslint-disable-line no-redeclare
							var _model = store.model[module_id];
							if (_model) {
								for (var i = 0; i < lenF; i++) { //eslint-disable-line no-redeclare
									if (!_model.fieldList[fieldList[i].api_name]) {
										if (fieldList[i].ui_type === 116 && fieldList[i].formula_return_type) {
											fieldList[i].formula = { return_type: fieldList[i].formula_return_type };
										}
										if (fieldList[i].data_type !== "subform") {
											var k = {};//eslint-disable-line no-redeclare
											k.type = Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fieldList[i]);
											k.fieldID = fieldList[i].id;
											k.columnName = fieldList[i].column_name;
											k.fieldType = fieldList[i].data_type;
											k.displayLabel = fieldList[i].display_label;
											k.isCustomField = fieldList[i].custom_field;
											store.addField(module_id, fieldList[i].api_name, k.type, k);
										}
									}
								}
							}
						}
					}
				}
				if (window.Lyte && window.Lyte.registeredMixins["crm-detail-view-utils"] && customData && customData.getActions && item.personality_name !== "ACTIVITYPERSONALITY" && item.personality_name !== 'COMPETITORSPERSONALITY'&& item.personality_name !== 'ATTACHMENTSPERSONALITY') { //No I18N
					window.Lyte.registeredMixins["crm-detail-view-utils"].getRelatedListActions(item, objectUtils.getMatchedKey(moduleApiMapping, queryParams.module)); //No I18N
				}
				if (queryParams && queryParams.layout_id) {
					item[queryParams.layout_id] = Lyte.deepCopyObject(item);
				}
			});
		}
		return payLoad;
	}
});

//$Id$
//store.unregisterModel("custom_view");
store.registerModel("custom_view", { //No I18N

});

//$Id$
//store.unregisterAdapter("custom_view")
store.registerAdapter("custom_view", {//No I18n
    namespace: "crm/v2.2/settings", //No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace(modelName, modelName + "s"); //NO I18n
        return url;
    }
});
// $Id$
//store.unregisterSerializer("custom_view")
store.registerSerializer("custom_view", {  //No I18N
	normalizeResponse: function (modelName, type, payLoad) {
		if (!payLoad) {
			payLoad = [];
			return payLoad;
		}


		if (type === "findRecord") {
			if (payLoad.custom_views) { //No I18N
				payLoad.custom_views = payLoad.custom_views[0];
			} else {
				payLoad = {};
			}
		}
		return payLoad;

	},
});
//$Id$
//store.unregisterModel("note")
store.registerModel("note", { //NO i18n
    "id": Lyte.attr("string", { primaryKey: true }), //NO i18n
    "Parent_Id": Lyte.attr("object"), //NO i18n
    "$se_module": Lyte.attr("string"), //NO i18n
    "Note_Title": Lyte.attr("string"), //NO i18n
    "Note_Content": Lyte.attr("string"), //NO i18n
    "$attachments": Lyte.attr("array"), //NO I18n
    "$is_shared_to_client": Lyte.attr("boolean") //NO I18n
});
//$Id$
//store.unregisterAdapter("note")
store.registerAdapter("note", { //NO I18n
	namespace: "crm/v9", //NO I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		var apiName = modelName[0].toUpperCase() + modelName.substr(1) + "s";
		url = url.replace(modelName, apiName); //NO I18n
		var seModule;
		//eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
		if (type === "findAll") { //NO I18n
			if (customData && customData.module && customData.entityId) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				url = url.replace(apiName, ""); //NO I18n
				url += customData.module + "/" + customData.entityId + "/" + apiName; //NO I18n
			}
		} else if (type === "deleteRecord") {
			url = url.substring(0, url.indexOf(apiName));
			seModule = payLoad.$se_module;
			//if previous call get response was from v6 semodule will be absent
			if(seModule===undefined && payLoad.Parent_Id.module){
				seModule = payLoad.Parent_Id.module.api_name;
			}
			url += seModule + "/" + payLoad.Parent_Id.id + "/" + apiName;
			url = url + "?ids=" + customData.noteId; //No I18n
		} else if (type === "updateRecord" && customData.removeAttachment) {
			url += "/Attachments?ids=" + customData.ids; //NO i18n
		}
		else if (type === "createRecord") {
			url = url.replace(apiName, ""); //NO I18n
			url += payLoad.$se_module + "/" + payLoad.Parent_Id.id + "/" + apiName;
		}
		else if (type === "updateRecord") {
			let record = store.peekRecord('note', payLoad.id); //No I18N
			if (record && record.id) {
				url = url.substring(0, url.indexOf(apiName));
				seModule = record.$se_module;
				//if previous call get response was from v6 semodule will be absent
				if(seModule===undefined && record.Parent_Id.module){
					seModule = record.Parent_Id.module.api_name;
				}
				url += seModule+"/"+ record.Parent_Id.id+"/"+apiName;
			}
		}
		else if (type === "findRecord" && customData && customData.module && customData.entityId) {
			url = url.replace(apiName, customData.module + "/" + customData.entityId + "/" + apiName); //NO I18n
		}

		if (customData && customData.apiVersion) {
			url = url.replace('v2', customData.apiVersion); //no i18n
		}

		return url;
	},
	methodForRequest: function (method, type, queryParams, customData) {
		if (method === "PATCH") { //NO I18n
			method = "PUT"; //NO I18n
		}
		if (type === "updateRecord" && customData.removeAttachment) {
			method = "DELETE"; //NO I18n
		}
		return method;
	}
});
//$Id$
//store.unregisterSerializer("note")
store.registerSerializer("note", {
	normalizeResponse: function (modelName, type, payLoad) {
		payLoad[modelName] = payLoad.data;
		if (type === "createRecord" || type === "updateRecord") {
			payLoad.data = payLoad.data[0].details;
		}
		return payLoad;
	},
	serialize: function (type, payLoad, records) {
		if (records.entity) {
			delete records.entity;
		}
		payLoad.data = [records];
		return payLoad;
	},
	serializeKey: function () {
		return "data"; //NO i18n
	},
	payloadKey: function () {
		return "data"; //NO i18n
	}
});
//$Ids$
//store.unregisterModel("servapp_preferences")
store.registerModel("servapp_preferences", {

});
//$Ids$
//store.unregisterAdapter("servapp_preferences")
store.registerAdapter("servapp_preferences", {//No I18n
	namespace: "crm/v3/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		if (type === 'findAll' || type === 'update' && customData && customData.module &&
			(customData.module === 'Services' || customData.module === 'Appointments')) {
			// if(customData && customData.module && 
			// (customData.module === 'Services' || customData.module === 'Appointments')){//No I18n
			var newUrl = (customData.module === 'Services' ? 'service' : 'appointment') + '_preferences';//No I18n
			url = url.replace(modelName, newUrl);
			// }
		}
		return url;
	},
	reloadAll: function (res, queryParams, customData) {
		if (customData && customData.module &&
			(customData.module === 'Services' || customData.module === 'Appointments') && !customData.reloadAll) { //No I18n
			var existingData = store.peekAll('servapp_preferences');//No I18n
			if (existingData.length > 0 && existingData[0][customData.module.toLowerCase()]) {
				return false;
			}
		}
		return true;
	},
});

//$Ids$
//store.unregisterSerializer("servapp_preferences")
store.registerSerializer("servapp_preferences", {

});
//$Id$
//store.unregisterModel("campaign_status");
store.registerModel("campaign_status", {//No I18N
});

//$Id$
//store.unregisterAdapter("campaign_status")
store.registerAdapter("campaign_status", {//No I18n

});
//$Id$
//store.unregisterSerializer("campaign_status")
store.registerSerializer("campaign_status", {

});
//$Id$
store.registerModel("cadence",{
	id: Lyte.attr("string", {primaryKey: true}), // No i18n
	name: Lyte.attr("string", {default: ""}), // No i18n
	description: Lyte.attr("string", {default: ""}), // No i18n
	type :  Lyte.attr("string", {default: ""}), // No i18n
	module: Lyte.attr("object"), // No i18n
	custom_view :  Lyte.attr("object"),// No i18n
	execution_details :  Lyte.attr("object"),// No i18n
	follow_ups : Lyte.attr("array"), // No i18n
	automatic_unenroll : Lyte.attr("boolean",{default : false}), // No i18n
	unenroll_properties : Lyte.attr("object"),// No i18n
	end_date : Lyte.attr("string", {default: ""}), // No i18n
	active:Lyte.attr("boolean",{default : true}), // No i18n
	actionDetails : Lyte.attr("object", {default : {}}),// No i18n
	seriesFollowUps_arr : Lyte.attr("object", {default : {}})// No i18n
    
},
{	
	actions: 
	{
		enrollSeries : {},
		unEnrollSeries:{}
	}
});
//$Id$
store.registerAdapter("cadence", {//No I18n
	namespace  : "crm/v4/settings/automation", //NO i18N
	buildURL  : function (modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData ){ 
		url = this.$super.buildURL( modelName , type ,queryParams, payLoad, url, actionName, customData );
        
        if(actionName === "enrollSeries"){
			var enrollUrl = url.split("settings");//eslint-disable-line no-redeclare
        	var module = moduleApiMapping[customData.module];//eslint-disable-line no-redeclare
			url = enrollUrl [0] + module +"/actions/enrol_in_cadences";
		}
		if(actionName === "unEnrollSeries"){
			var enrollUrl = url.split("settings");//eslint-disable-line no-redeclare
        	var module = moduleApiMapping[customData.module];//eslint-disable-line no-redeclare
			url = enrollUrl [0] + module +"/actions/unenrol_from_cadences";

		}
		return url; 
	},
	headersForRequest: function ( type, action, customData ) {
		var headers = {
				"X-ZCSRF-TOKEN": csrfParamName + "=" + csrfToken, //No I18N	
				"X-CRM-ORG": crmZgid //No I18N	
		};
		if(customData && customData.headers && customData.headers["X-CRM-ORG"]){
		   headers["X-CRM-ORG"] = customData.headers["X-CRM-ORG"]; //No I18n
		}
		return headers;
	 },

	methodForRequest  : function (method ,type ,queryParams ,customData, actionName){ 
		if(type === "action"){
			switch(actionName){
			case "activate" :
				return customData.status === true ? "PUT" : "DELETE";  // No i18n
			case "clone" :
				return "POST";// No i18n
			case "publish" :
				return "PUT";// No i18n
			case "analytics" :
				return "GET";// No i18n
			case "count" :
				return "GET";// No i18n
			}
			
				
				
		}
		if (method === "PATCH"){ 
			return "PUT";  // No i18n
		}
		return method;
	}
});

//$Id$
store.registerSerializer("cadence",{
	
	normalize  : function (modelName ,type ,payload){ 
		if(type === "findAll" && payload){
			var userObj = payload.modified_by ? payload.modified_by : payload.created_by;
			payload.current_user = userObj;
			
			payload.isSelected = false; //used in row checkbox select
			if(payload.module){
				payload.module = payload.module.api_name;
			}
			
		}
		return payload; 
	}, 
	payloadKey: function(){
		return "cadences"; //No I18n   
	},
	normalizeResponse : function (){
		return this.$super.normalizeResponse.apply(this.$super, arguments);
	},
	serialize : function(type,payLoad){
		var reqBody = {};
		if(typeof payLoad !== "undefined"){
			  if(payLoad.hasOwnProperty("cadences_ids")){
				reqBody = payLoad;
			}else{
			reqBody.cadences = [payLoad.cadence];
			}
		}
			return reqBody;
	}
	
}).extends("application"); //No i18N


// $Id$
store.registerModel("tag",
    {
        created_by: Lyte.attr("object"),//No I18N
        created_time: Lyte.attr("string"),//No I18N
        id: Lyte.attr("string"), //No I18N
        modRefId: Lyte.attr("string"), //No I18N
        modified_by: Lyte.attr("object"),//No I18N
        modified_time: Lyte.attr("string"),//No I18N
        module_name: Lyte.attr("string"), //No I18n
        name: Lyte.attr("string"), //No I18n
        color_code: Lyte.attr("string") //No I18n
    },
    {
        actions: {
            records_count: {},
            merge: {},
            add_tags: {},
            remove_tags: {}
        }
    }
);
// $Id$
store.registerAdapter("tag", {//No I18n
    namespace: "crm/v2.2/settings", //No I18n
    methodForRequest: function (method, type, queryParams, customData) {
        if (type === "create") { //No I18n
            return "POST"; //No I18n
        } else if (type === "update") { //No I18n
            return "PATCH"; //No I18n
        } else if (type === 'action' && (customData.action === "add_tags" || customData.action === "remove_tags")) { //No I18n
            return "POST"; //No I18n
        } else if (type === 'action' && customData !== undefined && customData.module) { //No I18n
            queryParams.module = customData.module;
            return "GET"; //No I18n
        }
        return method;
    },
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        url = url.replace(modelName, modelName + "s"); //No I18n
        if (type === "delete" && customData) {
            url = url + "/" + customData.id; //No I18n
        } else if (type === "action" && (actionName === "add_tags" || actionName === "remove_tags")) { //no i18n
            url = url.slice(0, url.indexOf("tag") + 5);
            url = url + customData.id + "/actions/" + actionName; //no i18n
            url = url.replace("settings/" + modelName + "s", customData.module);
            if (actionName === "remove_tags") {
                url = url.replace('v2.2', 'v2.1') + "?tag_names=" + encodeURIComponent(customData.tag_names) + "&fromClient=" + true;//no i18n
            }
        } else if (type === "action" && customData.id) { //NO I18n
            url = url.slice(0, url.indexOf("tag") + 5);
            url = url + customData.id + "/actions/merge";  //NO I18n
        }
        if (window.isSandboxAcc === 'false' && window.isCanvasSandboxDiff) {
            url = url.replace("/crm/", "/crm/v2/sandbox/diff/");
        }
        if (window.isSandboxAcc === 'true' && window.isCanvasProdDiff) {
            url = url.replace("/crm/", "/crm/v2/production/diff/");
        }
        return url;
    }
});

//$Id$
store.registerSerializer("tag", {
    normalizeResponse: function (modelName, type, payload, pkValue, status, headers, queryParams) {
        switch (type) {
            case 'create': {
                let len = payload.tags.length;
                var data = [];
                for (let i = 0; i < len; i++) {
                    payload.tags[i].details.module_name = queryParams.modulename;
                    if (!payload.tags[i].details.message) {
                        payload.tags[i].details.message = payload.tags[i].message;//Temporary
                    }
                    payload.tags[i].details.module_name = queryParams && queryParams.module;
                    Lyte.arrayUtils(data, 'push', payload.tags[i].details);//no i18n
                    payload.tags[i].module_name = queryParams.module;
                }
                return { tags: data };
            }
            case 'findAll': {
                let len = payload.tags.length;
                for (let i = 0; i < len; i++) {
                    payload.tags[i].module_name = queryParams && queryParams.module;
                }
                break;
            }
            case 'update': {
                return { tags: payload.tags[0].details };
            }
        }
        return payload;
    },
    serializeKey: function (modelName) {
        return modelName + "s";  //No i18n
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {

        if (actionName === 'merge') { //no i18n
            return { "tags": [{ "conflict_id": records.id, "modified_time": records.modified_time }] }; //no i18n
        } else if (type === 'update') { //no i18n
            var name;
            if (payLoad.tags[0].name === undefined) {
                name = records[0].name;
            } else {
                name = payLoad.tags[0].name;
            }
            return { "tags": [{ "name": name, "color_code": payLoad.tags[0].color_code, "id": payLoad.tags[0].id, "modified_time": records.modified_time }] }; //no i18n

        } else if (type === 'create') { //no i18n
            var array = [];
            var recordLen = payLoad.tags.length;
            for (var j = 0; j < recordLen; j++) {
                var obj = { "name": payLoad.tags[j].name, "color_code": payLoad.tags[j].color_code };
                array.push(obj);
            }
            return { "tags": array }; //no i18n
        } else if (actionName === "add_tags" || actionName === "remove_tags") {
            return undefined;
        }
    }
});
//# sourceMappingURL=crm-crux-data-store.js.map