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