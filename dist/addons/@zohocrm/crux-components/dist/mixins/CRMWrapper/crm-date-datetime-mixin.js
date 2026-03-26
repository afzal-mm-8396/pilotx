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