Lyte.Mixin.register("crux-entity-date-time-mixin", {
    cxCrmConvertUsrtoDefaultDatePattern: function (customData) {
        var newDate = customData.date, datePattern = customData.datePattern;
        if (!newDate) {
            return '';
        }
        if (!newDate.getMonth) {
            datePattern = datePattern && datePattern.toUpperCase();
            try {
                newDate = $L.moment(newDate, datePattern).getDObj();
            } catch (e) {
                throw e;
            }
        }
        return newDate;
    },
    getDateInGivenPattern: function (newDate, pattern) {
        if (!newDate || !(newDate instanceof Date)) {
            var newDate = new Date();
        }
        var newToDay = newDate.getDate();
        var newMonth = newDate.getMonth();
        var str = newToDay + " " + newMonth + " " + newDate.getFullYear();
        return this.convertToUserDatePattern(str, pattern);
    },
    convertToUserDatePattern: function (date, pattern) {
        var dateArray = date.split(" ");//No I18n
        var dateObj = new Date(dateArray[2], dateArray[1], dateArray[0]);
        pattern = pattern || "";
        return this.convertDateToUserPattern(dateObj, pattern.toUpperCase());
    },
    convertDateToUserPattern: function (dateObj, formatPattern) {
        if (!formatPattern) {
            return;
        }
        return $L.moment(new Date(dateObj)).format(formatPattern);
    },
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
                ':' + trailingZero(dateObj.getSeconds());
        }
        return serverFormatTime;
    },
    getfinalTimeObjectfromTime: function (time, currentTimePattern = "") {
        if (time) {
            var obj = {};
            var usertimeF = currentTimePattern.split(' ');
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
            if (format == "12") {
                if (timeV[1]) {
                    timeV[1] = timeV[1].toUpperCase();
                    obj.hrs = (timeV[1] == I18n.getMsg("AM").toUpperCase() ? (splitdTime[0] == 12 ? 0 : splitdTime[0]) : 12 + (splitdTime[0] == 12 ? 0 : Number(splitdTime[0])));//no i18n
                }
                obj.mins = splitdTime[1];
            } else {
                obj.hrs = splitdTime[0];
                obj.mins = splitdTime[1];
            }
            return obj;
        }
    }
});

