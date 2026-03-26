// $Id$

	/**
	 * This method is used to construct the Date Object i.e, Date, Month, Year, Hour , Minutes and Day 
	 * @example 
	 * > CrmDate({"userDisplayDate": 26 , "userDisplayMonth" : 9 , "userDisplayYear" : 2019 , "userHourIn24hrFmt" : 5})
	 * @param {String|Number} dateObj - This provides the specified date as a String or specified date in milliseconds which is used to create the Date object
	 * @Class CrmDate
	 */

    function CrmDate(dateObj,isOrg)
    {
        if(typeof dateObj=="string" || typeof dateObj=="number")
        {
            dateObj = new Date(dateObj);
        }
        var i18nDayKeys = ["ssun","smon","stue","swed","sthu","sfri","ssat"];	//NO I18n
        var i18nMonthKeys = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];	//NO I18n
        var primitiveDate = dateObj || new Date();
        var utcMinutes = primitiveDate.getUTCMinutes();
        var totalMinsInUsersCrmTZ = isOrg ? (utcMinutes+CrmDateUtils.getTimeOffsetInMins(Crm.userDetails.ORGTIME_ZONE)):(utcMinutes+CrmDateUtils.getTimeOffsetInMins(Crm.userDetails.TIME_ZONE));
        this.primitiveDateObject = new Date(primitiveDate.getTime());
        primitiveDate.setUTCMinutes(totalMinsInUsersCrmTZ);
        this.userDisplayDate = primitiveDate.getUTCDate();
        this.userDisplayMonth = (primitiveDate.getUTCMonth()+1);
        this.userDisplayYear = primitiveDate.getUTCFullYear();
        this.userHourIn24hrFmt = primitiveDate.getUTCHours();
        this.userDisplayMinute = primitiveDate.getUTCMinutes();
        this.userDisplayDay = I18n.getMsg(i18nDayKeys[primitiveDate.getUTCDay()]);
        this.userDisplayMonthName = I18n.getMsg(i18nMonthKeys[primitiveDate.getUTCMonth()]);
        this.dateObject = primitiveDate;
    }
    
        /**
         * This method is used to get the Date and Time in User pattern as per the locale or by custom format chosen. If the user Pattern is dd-mm-yyyy hr:min:ss am|pm then it returns 26-09-2019 12:15:44 pm
         * @example 
         * > getDateTimeInUserPattern();
         * => "26-09-2019 12:15:44 pm"
         * @returns {String} - It returns the Date and Time in User defined pattern
         */
    
    CrmDate.prototype.getDateTimeInUserPattern = function(isI18n=false)
    {
        return this.getDateInUserPattern(isI18n)+" "+this.getTimeInUserPattern();
    };
        
        /**
         * This method is used get the Date in Pattern as per the locale or by custom format chosen. If the user Pattern is dd-mm-yyyy then it returns 26-09-2019 
         * @example 
         * > getDateInUserPattern();
         * => "26-09-2019"
         * @returns {String} - It returns the Date in User defined pattern
         */
    
    CrmDate.prototype.getDateInUserPattern = function(isI18n=false)
    {
        var userPattern = Crm.userDetails.DATE_PATTERN;
        return this.getDateInPattern(userPattern,isI18n);
    };
    
    
    CrmDate.prototype.getDateTimeInDefault = function()
    {
        return this.getDateInPattern("YYYY-MM-DD")+" "+this.userHourIn24hrFmt+":"+this.userDisplayMinute;//NO I18n
    };
    
        /**
         * This method is used to get the Date in Pattern as per the locale or by custom format given. It replaces the dd-mm MMM EEE yyyy as 26-09 Sep Thu 2019  
         * @example 
         * > getDateInPattern("dd-mm MMM EEE yyyy");
         * => "26-09 Sep Thu 2019"
         * @param {String} userPattern - This provides the pattern in which the Date has to be displayed
         * @returns {String} - It returns the formatted Date which replaces the Pattern provied 
         */
    
    CrmDate.prototype.getDateInPattern = function(userPattern,isI18n=false)
    {
        //pattern changed to uppercase because day(01,02,..), month(01,02..) and year are represented as tokens DD, MM and YYYY in moment
        //lowercase 'dd' and 'mm' in moment represents day for week('Su','Mo'..) and minutes respectivetly	
        userPattern = userPattern.toUpperCase();
        userPattern = userPattern.replace("EEE","ddd");
        return isI18n ? $L.moment(new Date(this.userDisplayYear,this.userDisplayMonth-1, this.userDisplayDate)).i18N(userPattern) : $L.moment(new Date(this.userDisplayYear,this.userDisplayMonth-1, this.userDisplayDate)).format(userPattern); // eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
    };
    
    //below method validates the date using lyte moment.
    CrmDate.prototype.validate = function(){
        
        try{
            return $L.moment(this.dateObject).validate();
        }catch(e){
            return false;
        }
    };
    
        /**
         * This method is used to return the Time in user pattern as per the locale or by custom format chosen. If the format is HH:mm am|pm it returns you 13:19 or if in 24hr format and 01:19 PM in 12hr format
         * @example
         * > getTimeInUserPattern(true);
         * => "13:19 
         * @example
         * > getTimeInUserPattern(true);
         * => "01:19 PM 
         * @param {Boolean} noI18n - This is set to True if I18n is needed and False if not needed 
         * @returns {String} - It returns you with time value in user defined pattern
         */
    
    CrmDate.prototype.getTimeInUserPattern = function(noI18n)
    {
        var is24HrsFormat = (Crm.userDetails.TIME_FORMAT === "HH:mm");	//NO I18n
        var timeVal;
        if(is24HrsFormat) 
        {
            timeVal = Utils.formatTimeVal(this.userHourIn24hrFmt) + ":" + Utils.formatTimeVal(this.userDisplayMinute);
        }
        else 
        {
            var userPatternAmPm = null;
            if(this.userHourIn24hrFmt == 12)
            {
                userPatternAmPm = "PM";							//NO I18n
            }
            else if(this.userHourIn24hrFmt > 12)
            {
                userPatternAmPm = "PM"; 						//NO I18n
            }
            else if(this.userHourIn24hrFmt < 12)
            {
                userPatternAmPm = "AM";							//NO I18n
            }
            var userPatternHour = Utils.convertTimeTo12HoursFormat(this.userHourIn24hrFmt, userPatternAmPm);
            var ampmOutput = (noI18n)?userPatternAmPm:I18n.getMsg(userPatternAmPm);
            timeVal = Utils.formatTimeVal(userPatternHour) + ":" + Utils.formatTimeVal(this.userDisplayMinute)+" "+ampmOutput;	//No I18N
        }
        return timeVal;
    };
    
        /**
         * This method is used to get the Formatted Time depending on the date and pattern i.e it provides the time only if it is Today and the month and date if it is in same year and whole date if it is a different year
         * @example 
         * > getFormattedTime();
         * => "01:19 PM"
         * @example 
         * > getFormattedTime();
         * => "Sep 26" 
         * @example 
         * > getFormattedTime();
         * => "Sep 26,2019"
         * @returns {String} - It returns the Time as per the required Date and Time 
         */
    
    CrmDate.prototype.getFormattedTime = function()
    {
        if(this.isToday())
        {
            return this.getTimeInUserPattern();
        }
        else if(this.isCurrentYear())
        {
            return this.getDateInPattern("MMM DD");	//NO I18n
        }
        else
        {
            return this.getDateInPattern("MMM DD,YYYY");	//NO I18n
        }
    };
    
        /**
         * This method is used to check whether the date object within prototype and current date are same. If the date provided is 26-09-2019 and current date is 26-09-2019 then it returns True
         * @example 
         * > var a = new CrmDate("26 Oct 2019 17:25:10 0530(IST)");  
         *   a.isToday();
         * => true
         * @returns {Boolean} - It returns True if the date object within prototype and current Date are same else it returns False
         */
    
    CrmDate.prototype.isToday = function()
    {
        return (this.getDateInUserPattern() == new CrmDate().getDateInUserPattern());
    };
    
        /**
         * This method is used to check whether the year within prototype and current year are same i.e If the year provided is 2019 and current year is 2019 then it returns True  
         * @example 
         * > var a = new CrmDate("26 Oct 2019 17:25:10 0530(IST)");  
         *   a.isCurrentYear();
         * => true
         * @returns {Boolean} - It returns True if the year within prototype and current year are same else it returns False
         */
    
    CrmDate.prototype.isCurrentYear = function()
    {
        return (this.userDisplayYear == new CrmDate().userDisplayYear);
    };
    
        /**
         * This method is used to check whether the date object within prototype is greater than current date Object i.e ,If the date provided is 26-10-2019 and current date is 26-09-2019 then it returns True
         * @example 
         * > var a = new CrmDate("26 Oct 2019 17:25:10 0530(IST)"); 
         *   a.isFutureTime();
         * => true 
         * @returns {Boolean} - It returns True if the date object within prototype is greater than current Date Object else it returns False
         */
    
    CrmDate.prototype.isFutureTime = function()
    {
        return (this.dateObject > new CrmDate().dateObject);
    };
        /**
         * This method is used to find the difference between the date Object witin prototype and the given date 
         * @example
         * > var a = new CrmDate("26 Sep 2019 17:25:10 0530(IST)"); 
         *   var b=new CrmDate("26 Sep 2019 19:25:10 0530(IST)");
         * => 120
         * @param {Object} paramCrmDate - This provides the given date which is used to find the difference between date Object witin prototype
         * @returns {Number} - It returns the difference between the date Object witin prototype and given date in minutes
         */
    
    CrmDate.prototype.leadingTimeInMins = function(paramCrmDate)
    {
        var presentTime = paramCrmDate || new CrmDate();
        var diffInMilliSec = this.dateObject.getTime() - presentTime.dateObject.getTime();
        var diffInMinutes = Math.round(diffInMilliSec / 60000);
        return diffInMinutes;
    };
    
        /**
         * This method is used to find the difference between the date Object witin prototype and the given date 
         * @example
         * > var a = new CrmDate("26 Sep 2019 17:25:10 0530(IST)");
         *   var b=new CrmDate("28 Sep 2019 17:25:10 0530(IST)");
         * => 2 
         * @param {Object} paramCrmDate - This provides the given date which is used to find the difference between date Object witin prototype
         * @returns {Number} - It returns the difference between the date Object witin prototype and given date in Days
         */
    
    CrmDate.prototype.leadingTimeInDays = function(paramCrmDate)
    {
        var presentTime = paramCrmDate || new CrmDate();
        var timeInDate = new Date(this.userDisplayYear,this.userDisplayMonth-1,this.userDisplayDate);
        var presentTimeInDate = new Date(presentTime.userDisplayYear,presentTime.userDisplayMonth-1,presentTime.userDisplayDate);
        var diff =(timeInDate.getTime() - presentTimeInDate.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.round(diff);
    }
    
    var CrmDateUtils = {
            
            /**
             * This method is used to find the time zone and return the time zone in minutes (as IST is +05.30 returns -330)
             * @example
             * > getTimeOffsetInMins();
             * => -330
             * @returns {Number} - This returns the UTC difference in minutes
             */
            
            getTimeOffsetInMins		:	function(timeZone)
                                        {	if(timeZone){
                                                var userTZArray = timeZone.split(".");
                                                var userTZHourOffset = userTZArray[0];
                                                var userTZMinuteOffset = userTZArray[1];
                                                var minutesOffset = Math.abs(userTZHourOffset * 60)+Number(userTZMinuteOffset);
                                                minutesOffset = (Number(userTZHourOffset) >= 0) ?minutesOffset:(-1*minutesOffset);
                                                return minutesOffset;
                                            }
                                            
                                        },
            /**
             * This method is used to get the Crm Date from the User time data 
             * @example 
             * > getCrmDateFromUserTime(09,27,2019,12,40,07,"PM");
             * => {
             * 		dateObject: Fri Sep 27 2019 12:40:07 GMT+0530 (India Standard Time),
             * 		userDisplayDate: 26,
             *		userDisplayDay: "Fri",
             * 		userDisplayMinute: 40,
             * 		userDisplayMonth: 9,
             * 		userDisplayMonthName: "Sep",
             * 		userDisplayYear: 2019,
             * 		userHourIn24hrFmt: 12
             * 	}
             * @param {Number} userTZmm - This provides the user's TimeZone month in numbers
             * @param {Number} userTZdd - This provides the user's TimeZone date in numbers
             * @param {Number} userTZyyyy - This provides the user's TimeZone year in numbers
             * @param {Number} userTZhour - This provides the user's TimeZone hours in numbers
             * @param {Number} userTZminute - This provides the user's TimeZone minutes in numbers
             * @param {Number} userTZseconds - This provides the user's TimeZone seconds in numbers
             * @param {String} userTZ_AMPM - This provides the user's TimeZone merdiem 
             * @returns {Object} - It returns the User Time zone date and time as Crm date Object 
             */							
                                        
            getCrmDateFromUserTime : function(userTZmm, userTZdd, userTZyyyy, userTZhour, userTZminute, userTZseconds, userTZ_AMPM)
                                        {
                                            userTZseconds = (userTZseconds)?userTZseconds:"00";
                                            var offset = Utils.getTimezoneOffset();
                                            var minOffSet = parseInt(offset/60);
                                            var secOffSet = parseInt(offset % 60);
                                            var tzone = (minOffSet < 0)?"GMT+":"GMT-";//NO I18n
                                            secOffSet = (secOffSet < 0)?(secOffSet*-1):secOffSet;
                                            secOffSet = (secOffSet < 10)?("0"+secOffSet):secOffSet;
                                            minOffSet = (minOffSet < 0)?(minOffSet*-1):minOffSet;
                                            var args = userTZmm+"/"+userTZdd+"/"+userTZyyyy+" "+userTZhour+":"+userTZminute+":"+userTZseconds; 
                                            if(Crm.userDetails.TIME_FORMAT!="HH:mm" && userTZ_AMPM)
                                            {
                                            var standardAMPMValues = ["AM","PM","am","pm"];  //NO I18n
                                            if(standardAMPMValues.indexOf(userTZ_AMPM) != -1)
                                            {
                                            args = args+" "+userTZ_AMPM;
                                            }
                                            else if((I18n.getMsg("AM") == userTZ_AMPM) || (I18n.getMsg("am") == userTZ_AMPM))
                                            {
                                            args = args+" AM";   //NO I18n
                                            }
                                            else if((I18n.getMsg("PM") == userTZ_AMPM) || (I18n.getMsg("pm") == userTZ_AMPM))
                                            {
                                            args = args+" PM";   //NO I18n
                                            }
                                            }
                                            args = args+" "+tzone+minOffSet+secOffSet;
                                            var dateObj = new Date(args);
                                            return new CrmDate(dateObj);
                                        },
                                        
                /**
                 * This method is used to get the Crm Date after adding the extra minutes to it . If the extra minutes to be added is 25mins and time is Fri Sep 27 2019 12:15:07 GMT+0530 then it returns 12:40
                 * @example 
                 * > getCrmDateAfterMinutes(25);
                 * => {
                 * 		dateObject: Fri Sep 27 2019 12:40:07 GMT+0530 (India Standard Time),
                 * 		userDisplayDate: 26,
                 * 		userDisplayDay: "Fri",
                 * 		userDisplayMinute: 40,
                 * 		userDisplayMonth: 9,
                 * 		userDisplayMonthName: "Sep",
                 * 		userDisplayYear: 2019,
                 * 		userHourIn24hrFmt: 12
                 *	 }
                 * @param {Number} minutes - This provides the extra minutes to be added
                 * @returns {Object} - It returns the Date object after adding the extra minutes as milliseconds 
                 */
                
                getCrmDateAfterMins : function(minutes) 
                                        {
                                            var millisToBeAdded = new Date().getTime() + (minutes * 60000);
                                            var reqDate = new Date(millisToBeAdded);
                                            return new CrmDate(reqDate);
                                        },
                                        
            /**
             * This method is used to get the Crm Date after adding the extra minutes to it . If the extra minutes to be added is 1500000ms and time is 12:15 then it returns 12:40
             * @example 
             * > getCrmDateAfterMinutes(150000s,{userDisplayDate: 26,userDisplayDay: "Fri", userDisplayMinute: 40 ......});
             * => {
             * 		dateObject: Fri Sep 27 2019 12:40:07 GMT+0530 (India Standard Time),
             * 		userDisplayDate: 26,
             * 		userDisplayDay: "Fri",
             * 		userDisplayMinute: 40,
             * 		userDisplayMonth: 9,
             * 		userDisplayMonthName: "Sep",
             * 		userDisplayYear: 2019,
             * 		userHourIn24hrFmt: 12
             *	 }
             * @param {Number} millis - This provides the extra milliseconds to be added  
             * @param {Object} primitiveDateObj - This provides the Current Crm Date Object to which the extra milliseconds are to be added 
             * @returns {Object} - It returns the Date Object after adding the extra milliseconds  
             */
                                        
              getCrmDateAfterMillis : function(millis, primitiveDateObj) 
                                        {
                                              primitiveDateObj = primitiveDateObj || new Date();
                                            var millisToBeAdded = primitiveDateObj.getTime() + millis;
                                            var reqDate = new Date(millisToBeAdded);
                                            return new CrmDate(reqDate);
                                        },
              getAfterMinsByCrmdate : function(minutes, crmDateObj) 
                                        {
                                            var millisToBeAdded = crmDateObj.primitiveDateObject.getTime() + (minutes * 60000);
                                            var reqDate = new Date(millisToBeAdded);
                                            return new CrmDate(reqDate);
                                        },
                // this method validates the date using lyte moment.
                isValidDate	:	function(dateVal,datePattern){//No I18n
                    //var reg = /./;
                    if(!dateVal)
                    {
                        return false;
                    }			
                    if(!datePattern)
                    {
                        datePattern = Crm.userDetails.DATE_PATTERN.toUpperCase();
                    }				
                    try{
                        return $L.moment(dateVal,datePattern).validate();
                    }catch(e){
                        return false;
                    }	
                },
                                        
            /**
             * Below method returns date object parsed from given date value and date pattern using lyte moment Pattern should be given in Lyte moment tokens. if pattern is not given, user date pattern will be taken.
             * @example 
             * > getDateObjectFromString("2019-11-12");
             * => Sat Oct 12 2019 00:00:00 GMT+0530 (India Standard Time)
             * @param {String} dateVal - This provides the Date as a String from which the Date Object has to be formed.
             * @returns {Object} - dateObj parsed from validate -> if both dateval and datePattern is correct
              * current date -> if date pattern is incorrect
              * 'Invalid date' as String -> if date value is incorrect
             */
            
             getDateObjectFromString : function(dateVal,datePattern,isI18N)
             {
                     if(!dateVal)
                     {
                         return new Date();
                     }				
                      if(!dateVal.getMonth)
                      {	
                          if(!datePattern)
                        {
                            datePattern = Crm.userDetails.DATE_PATTERN.toUpperCase();
                            //In some cases, datetime value is passed to get dateobject. below code is to handle it.
                            var colonIndex = dateVal.indexOf(":");
                            if(colonIndex >-1)
                            {
                                var timeFormat = Crm.userDetails.TIME_FORMAT;
                                //In moment token, 'a' represents 'am/pm' 'A' represents 'AM/PM'. hence below conversion.
                                if(dateVal.indexOf("AM") >1 || dateVal.indexOf("PM") >1)
                                {
                                    timeFormat = timeFormat.replace('a','A');
                                }
                                datePattern += " "+timeFormat;
                            }
                            
                        }
                        var dateObj;	
                        try{
                            dateObj = isI18N ? $L.moment(dateVal.trim(),datePattern.trim(),{i18n : true}).getDObj() : $L.moment(dateVal.trim(),datePattern.trim()).getDObj();
                        }catch(e){
                            murphy.error(e);
                        }			
                        if(!dateObj)
                        {
                            dateObj= new Date();
                        }
                        return dateObj;
                      }
                      return dateVal;
              },
              //below method formats the date using lyte moment in User Pattern if format pattern is not given.
              //formatPattern to be given in lyte moment tokens.
                  convertDateToUserPattern : function(dateObj,formatPattern,isI18n = false)
                  {
                          if(!formatPattern)
                        {
                            formatPattern = Crm.userDetails.DATE_PATTERN.toUpperCase();
                        }
                        if(isI18n){
                            return $L.moment(new Date(dateObj)).i18N(formatPattern); // eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                        }
                        return $L.moment(new Date(dateObj)).format(formatPattern); // eslint-disable-line @zoho/zohocrm/no-deprecated-fnc			 
                  },		  
              getFormattedDate : function(date)
                  {
                    return $L.moment(new Date(date)).format("YYYY-MM-DD");	 // No I18N
                },
                //below method formats the date using lyte moment in given Pattern 
                  //pattern to be given in lyte moment tokens.
                getDateInPattern : function(date, pattern)
                  {
                    return $L.moment(new Date(date)).format(pattern);	 // No I18N
                },
                
                convertDateToISO : function(date, datePattern, timeConstant,isI18N=false){
                    if(typeof datePattern == "undefined"){// No I18N
                        datePattern = "DD/MM/YYYY";// No I18N
                    }
                    if(typeof timeConstant == "undefined"){// No I18N
                        timeConstant = "T00:00:00%2B00:00";// No I18N
                    }
                    if(date && date!=""){
                        return CrmDateUtils.getFormattedDate(this.getDateObjectFromString(date, datePattern,isI18N))+timeConstant;
                    }else{
                        return "";
                    }
                },
                convertDateTimetoISOFormat : function(dateTime,isI18n=false)
                {
                    //Datevalue may contain spaces like "Feb 26, 2020 09:08 AM". below code is to handle date value with space				
                    var breakIndex = dateTime.indexOf(":"); //No I18N
                    var	datePart = dateTime.substring(0,breakIndex-3);
                    var	timePart = dateTime.substring(breakIndex-2, breakIndex+3);
                    var meridiem = dateTime.substring(breakIndex+3,dateTime.length).trim();
                    
                    var dateTimeArr = [];
                    dateTimeArr.push(datePart);
                    var timeVal = timePart.split(' ');
                    dateTimeArr.push(timeVal[0]);
                    if(meridiem.length > 1)
                    {
                        dateTimeArr.push(meridiem);
                    }
                    var dateInDbFormat=CrmDateUtils.convertdateToDBformat(dateTimeArr[0],isI18n);
                    var timeArr=dateTimeArr[1].split(":");
                    var timeOffset = Crm.userDetails.TIME_ZONE.replace(".",":");
                    var hours=parseInt(timeArr[0]);
                    hours=((Crm.userDetails.TIME_FORMAT=="HH:mm")?hours:Utils.convertTimeTo24HoursFormat(hours,dateTimeArr[2]));//No i18n
                    var mins=parseInt(timeArr[1]);
                    if(hours<10)
                    {
                        hours='0'+hours;
                    }
                    
                    if(mins<10)
                    {
                        mins='0'+mins;
                    }
                    var secs="00";
                    var time=hours+':'+mins+':'+secs;
                    return dateInDbFormat+'T'+time+timeOffset;//No i18n
                },
    //			convertdateToDBformat : function(Date){
    //				var date = Utils.convertUsrtoDefaultDatePattern(Date,Crm.userDetails.COUNTRY_LOCALE != "en_GB");//No i18n
    //				
    //				var year = date.getFullYear();
    //				var month = Number(date.getMonth())+1;
    //				var day = date.getDate();
    //				month = month<10?("0"+month):month;
    //				day = day<10?("0"+day):day;
    //				return year+"-"+month+"-"+day;
    //			},
                convertdateToDBformat : function(date,isI18n = false){				
                    var dateObj = isI18n ? CrmDateUtils.getDateObjectFromString(date,undefined,isI18n) : CrmDateUtils.getDateObjectFromString(date);
                    return $L.moment(new Date(dateObj)).format("YYYY-MM-DD");//No i18n
                    
                },
                convertDateAndTimeApiFormatToUserViewFormat : function(dateVal){
                    var d=null,month=null,crtDate=null,year=null,amOrPm=null,modifiedTime=null,forMatedTime=null,arr=null,sign=null;
                    d = new Date(dateVal);
                    
                    modifiedTime=dateVal;
                    forMatedTime=modifiedTime.substring(modifiedTime.length-6);
                    arr=forMatedTime.split(':');
                    sign=arr[0].substring(0,1);
                    arr[1]=parseInt(arr[1]);
    
                    if(sign==='+'){
                        d= new Date(modifiedTime.substr(0,modifiedTime.length-6));
                    }else{
                        d= new Date(modifiedTime.substr(0,modifiedTime.length-6));
                    }
                    
                    month=d.getMonth();
                    crtDate=d.getDate();
                    year=d.getFullYear();
                    amOrPm=Utils.getTimeStringWithAmPm(d);
                    if(Crm.userDetails.TIME_FORMAT !== "HH:mm"){
                        return I18n.getMsg(CrmTags.shortMonth[month])+" "+crtDate+","+" "+year+" "+amOrPm.hrs+":"+amOrPm.mins+" "+I18n.getMsg(amOrPm.meridiem.toUpperCase());
                    }else{
                        return I18n.getMsg(CrmTags.shortMonth[month])+" "+crtDate+","+" "+year+" "+amOrPm.hrs+":"+amOrPm.mins;
                    }
                },
                convertTimeTo12HourFormat : function(Time){
                    var split1 = Time.split(":");
                    var hour = split1[0];
                    var min = split1[1];
                    var ampm = I18n.getMsg('AM'); // No i18n
                    if(hour > 12){
                        hour = Number(hour) -12;
                        ampm = I18n.getMsg('PM'); // No i18n
                    }
                    if(hour == 0){
                        hour = 12;
                        ampm = I18n.getMsg('AM');// No i18n
                    }
                    else if(hour == 12){
                        ampm = I18n.getMsg('PM');// No i18n
                    }
                    if(hour <10 && (hour.toString()).length<2){
                        hour = "0"+hour;
                    }
                    return hour + ":" + min + " " + ampm;
                },
                compareTime : function(startTime,endTime,business){//No I18n
                    var start = CrmDateUtils.timeTomilliseconds(startTime);
                    var end = CrmDateUtils.timeTomilliseconds(endTime);
                    var diff = end - start;
                    if(business){
                        return (diff >= 0);
                    }
                    return (diff >= 1000);
                },
                timeTomilliseconds : function(Time){
                    var split1 = Time.split(":");
                    var hour = split1[0];
                    var min = split1[1];
                    return (hour*60*60*1000)+(min*60*1000);
                },
                getDayNumber : function(dayVal){
                    switch(dayVal){
                        case "Monday":
                            return 1;
                        case "Tuesday":
                            return 2;
                        case "Wednesday":
                            return 3;
                        case "Thursday":
                            return 4;
                        case "Friday":
                            return 5;
                        case "Saturday":
                            return 6;
                        case "Sunday":
                            return 0;
                        default:
                            return 0;
                    }
                    
                },
                checkTimeValue : function(val){
                    var split1Val = val.split(":");
                    if(split1Val.length<=1){
                        return true;
                    }
                    if(!split1Val[0] || (isNaN(Number(split1Val[0])) && Number(split1Val[0]) > 24)){
                        return true;
                    }
                    var split2Val = split1Val[1].split(" ");
                    if(split2Val.length > 0){
                        if(!split2Val[0] || (isNaN(Number(split2Val[0]) && Number(split2Val[0])) > 60)){
                            return true;
                        }
                        if( Crm.userDetails.TIME_FORMAT == "hh:mm a" ){
                            if( !split2Val[1] ||(!(split2Val[1].toUpperCase() == I18n.getMsg('AM') || split2Val[1].toUpperCase() == I18n.getMsg('PM'))) ){
                                return true;
                            }
                        }
                    }
                    return false;
                },
                
                /**
                 * This method is used to split the date values into an array with 3 elements containing date,month and year
                 * @param {Object} dateVal - This provides the date object which has to split into an array 
                 * @returns {Array} - This returns the array containing date,month and year values as an array.
                 * @example
                 * CrmDateUtils.splitDateVal(new Date(2022,07,08));
                 * => [8,8,2022]
                 */
                
                splitDateVal : function(dateval,isI18N=false) {
                    var dateelements = new Array(3);
    
                    var userDateFormatTemp = Crm.userDetails.DATE_PATTERN ? Crm.userDetails.DATE_PATTERN.toUpperCase() : userDateFrmtinCE;
                    var dateObj = CrmDateUtils.getDateObjectFromString(dateval, userDateFormatTemp,isI18N);
                    dateelements[0] = dateObj.getDate();
                    dateelements[1] = dateObj.getMonth() + 1;
                    dateelements[2] = dateObj.getFullYear();
    
                    return dateelements;
                 },
                 
                 /**
                  *  This method is used to compare two date fields and display the respective alert messages  
                  *  @param {Object} date1 - This provides the first date that has to be compared.
                  *  @param {String} fldLabel1 - This provides the field label of the first date field 
                  *  @param {Object} date2 - This provides the second date that has to be compared.
                  *  @param {String} fldLabel2 - This provides the field label of the second date field
                  *  @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
                  *  @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message.
                  *  @param {String} fldName1 - This provides the fieldName in which the alert has to be displayed.
                  *  @returns {Boolean} - This returns true if there is no alert message present and false if present.
                  */
                 
                 comparingDates : function(date1,fldLabel1,date2,fldLabel2,type,alertType,fldName1) {
                        var alertMsg;
                        switch (type) {
                            case 'L'    :    if (date1 >= date2) {//DATE1 VALUE LESS THAN DATE2
                                                   alertMsg = I18n.getValueForFields("crm.custom.field.less.than",[fldLabel1,fldLabel2]); //No I18N
                                             }
                                            break;
                            case 'LE'    :    if (date1 > date2) {//DATE1 VALUE LESS THAN OR EQUAL TO DATE2
                                                   alertMsg = I18n.getValueForFields("crm.custom.field.less.than.equalto",[fldLabel1,fldLabel2]); //No I18N
                                              }
                                            break;
                            case 'E'    :    if (date1 != date2) {//DATE1 VALUE EQUAL TO DATE
                                                 alertMsg = I18n.getValueForFields("crm.custom.field.equalto",[fldLabel1,fldLabel2]); //No I18N
                                             }
                                            break;
                            case 'G'    :    if (date1 <= date2) {//DATE1 VALUE GREATER THAN DATE2
                                                  alertMsg = I18n.getValueForFields("crm.custom.field.greater.than",[fldLabel1,fldLabel2]); //No I18N
                                               }
                                            break;
                            case 'GE'    :    if (date1 < date2) {//DATE1 VALUE GREATER THAN OR EQUAL TO DATE2
                                                  alertMsg = I18n.getValueForFields("crm.field.comparision.check",[fldLabel1,fldLabel2]); //No I18N
                                                }
                                            break;
                        }
                        if (alertMsg){
                            var fldObj = getObj(fldLabel1) ? getObj(fldLabel1): fldName1 ? getObj(fldName1) : undefined
                            renderingUtils.displayAlert(fldLabel1,fldLabel1,alertMsg,fldObj,alertType);
                            return false;
                        }
                        else {
                            return true
                        }
                    },
                        /**
                         * This method is used to validate both date and time 
                         * @param {String} dateFldName - This provides the name of the date field which is to be validated
                         * @param {String} timeFldName - This provides the name of the time field which is to be validated
                         * @param {String} fldLabel - This provides the label of the field that is to be validated.
                         * @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
                         * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message.
                         * @param {String} formName - This provides the name of the form in which the date and time is present
                         * @param {Boolean} tz - This is set to true if timezone is present and false if not.
                         * @returns {Boolean} - This returns true if it is valid date and false if not.
                         */
                    dateTimeValidate : function(dateFldName,timeFldName,fldLabel,type,formName,alertType, tz,isAlertNeeded=true, translatedFieldLabel) {
                        var currObj = getElm(formName,dateFldName);
                        var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
                        if(!currObj){
                            dateFldName = "property("+fldLabel+")";//No I18N
                            timeFldName = fldLabel;
                        }
    //					if(getObj("module")){
    //						var module = getObj("module").value;
    //					}
                        var dateval = getElm(formName,dateFldName).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                        var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : replacedFldLabel)); //No I18N
                        var isValidDate = Utils.isValidDate(Crm.userDetails.DATE_PATTERN, dateval);
                        if(!isValidDate){
                            if(isAlertNeeded){
                            renderingUtils.displayAlert(dateFldName,fldLabel,alertMsg,currObj,alertType);
                        }return false;
                        }
                        /*var isKanbanViewEl = document.getElementById("iskanbanview");
                        if(!( isKanbanViewEl && isKanbanViewEl.value === "true")){*/
                            if(getElm(formName,timeFldName+"hour")){
                                var hourval=getElm(formName,timeFldName+"hour").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
                            else{
                                var hourval=getElm(formName,"property("+timeFldName+"hour)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
                            if(getElm(formName,timeFldName+"minute")){
                                var minval=getElm(formName,timeFldName+"minute").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
                            else{
                                var minval=getElm(formName,"property("+timeFldName+"minute)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
    
                        /*}
                        else{
                            var  _fldLabel = $("[fldlabel='"+fldLabel+"']");
                            if(_fldLabel.length > 0) {
                                var time = _fldLabel.val().split(':');
                            }
                            else {
                                var time = $("#"+timeFldName).val().split(':');
                            }
                            hourval=time[0];
                            minval=time[1];
                        }*/
    
    
                        if(Crm.userDetails.TIME_FORMAT !=="HH:mm"){
                            /*if(!(isKanbanViewEl && isKanbanViewEl.value === "true")){*/
                                if(getElm(formName,timeFldName+"ampm")){
                                    var ampmval=getElm(formName,timeFldName+"ampm").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                                }
                                else{
                                    var ampmval=getElm(formName,"property("+timeFldName+"ampm)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                                }
                            /*}
                            else{
                                if(fldLabel !== "Call Start Time"){
                                    var _callFldLabel = $('[fldlabel="'+fldLabel+'"]');
                                    if(_callFldLabel.attr("time")){
                                        var timeperiod = _callFldLabel.attr("time").split(':')[2]; //No I18N
                                    }
                                    else{
                                        var ampmfieldlabel=fldLabel+"_ampmSpan";//No I18N
                                        var _ampmFldLabel = $("#"+ampmfieldlabel);
                                        if(_ampmFldLabel.length > 0){
                                            var timeperiod = _ampmFldLabel.attr("ampm");//No I18N
                                        }
                                        else{
                                            ampmfieldlabel = timeFldName+"ampmSpan";	//No I18N
                                            var _ampmFldLabel = $("#"+ampmfieldlabel);
                                            if(_ampmFldLabel.length > 0) {
                                                var timeperiod = _ampmFldLabel.attr("ampm");//No I18N
                                            }
                                        }
                                    }
        
                                }
                                else{
                                    if($("span[id='Call Start Time_ampmSpan']").length > 0){
                                        var timeperiod = $("span[id='Call Start Time_ampmSpan']").attr("ampm");
                                    }
                                    else {
                                        ampmfieldlabel = timeFldName+"ampmSpan";	//No I18N
                                        var _ampmFldLabel = $("#"+ampmfieldlabel);
                                        if(_ampmFldLabel.length > 0) {
                                            var timeperiod = _ampmFldLabel.attr("ampm");//No I18N
                                        }
                                    }
        
                                }
                                var ampmval = timeperiod;
                            }*/
                            if((ampmval=="PM"&&hourval>12) || (ampmval=="AM"&&hourval>12)||(ampmval!="AM"&&ampmval!="PM")){
                                if(isAlertNeeded){
                                renderingUtils.displayAlert(timefldName,fldLabel,alertMsg,currObj,alertType);
                                }
                                return false;
                            }
                            if(ampmval == "PM" && (hourval < 12&&hourval>=0)){
                                hourval =parseInt(hourval)+12;
                            }
                            else if(ampmval==="AM" && hourval==="12"){
                                hourval = 0;
                            }
                        }
                        if(hourval>23||hourval<0||minval>59||minval<0){
                            if(isAlertNeeded){
                                renderingUtils.displayAlert(timeFldName,fldLabel,alertMsg,currObj,alertType);
                            }
                            return false;
                        }
                        var timeFldval=hourval+":"+minval;
                        if (validationUtils.patternValidate(timeFldval,fldLabel,"TIME",true,formName,undefined,alertType,undefined,isAlertNeeded)==false){
                            return false;
                        }
                        var currdate=$L.moment().toDate();
                        var chkdate = Utils.convertUsrtoDefaultDatePattern(dateval);
                        chkdate.setHours(hourval);
                        chkdate.setMinutes(minval);
                        var currentDateTime=I18n.getMsg("currentDateTime");//No I18N
                        if (type!="OTH" && !tz) {
                            if (!CrmDateUtils.comparingDates(chkdate,fldLabel,currdate,currentDateTime,type,alertType,isAlertNeeded)) {
                                if(isAlertNeeded){
                                getElm(formName,dateFldName).setAttribute("autocomplete","off");
                                getElm(formName,dateFldName).focus()
                                }
                                    return false
                            }
                             else{
                                 return true;
                             }
                        } 
                        else{
                             return true;
                        }
                    },
                        /**
                         * This method is used to compare two date and time.
                         * @param {String} dateFldName1 - This provides the name of the date1 field which is to be compared
                         * @param {String} timeFldName1 - This provides the name of the time1 field which is to be compared
                         * @param {String} fldLabel1 - This provides the label of the date1 field that is to be compared.
                         * @param {String} dateFldName2 - This provides the name of the date2 field which is to be compared
                         * @param {String} timeFldName2 - This provides the name of the time2 field which is to be compared
                         * @param {String} fldLabel2 - This provides the label of the date2 field that is to be compared.
                         * @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
                         * @param {String} formName - This provides the name of the form in which the date and time is present
                         * @returns {Boolean} - This returns true if it is valid date and false if not.
                         */
                    dateTimeComparison : function(dateFldName1,timeFldName1,fldLabel1,dateFldName2,timeFldName2,fldLabel2,type,formName,alertType,isAlertNeeded=true) {
                        var dateval1=getElm(formName,dateFldName1).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                        if(getElm(formName,dateFldName2)){
                            var dateval2=getElm(formName,dateFldName2).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                        }
                        else if(getElm(formName,fldLabel2)){
                            var dateval2=getElm(formName,fldLabel2).value.replace(/^\s+/g, '').replace(/\s+$/g, '');
                        }
                        var ampmval1;
                        if(getElm(formName,timeFldName1+"hour") && getElm(formName,timeFldName1+"minute") ){
                            var hourval1=getElm(formName,timeFldName1+"hour").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            var minuteval1=getElm(formName,timeFldName1+"minute").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            if(timeFrmat !="HH:mm"){
                                ampmval1=getElm(formName,timeFldName1+"ampm").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
                        }
                        else if(getElm(formName,"property("+fldLabel1+"hour)") && getElm(formName,"property("+fldLabel1+"minute)")){
                            var hourval1=getElm(formName,"property("+fldLabel1+"hour)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            var minuteval1=getElm(formName,"property("+fldLabel1+"minute)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            if(Crm.userDetails.TIME_FORMAT !=="HH:mm"){
                                ampmval1=getElm(formName,"property("+fldLabel1+"ampm)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                            }
                      }
                    else{
                        dateval1 = getElm(formName,"value_"+fldLabel1).innerHTML;//no i18n
                        //Datevalue may contain spaces like "Feb 26, 2020 09:08 AM". below code is to handle date value with space
                        var breakIndex = dateval1.indexOf(":"); //No I18N
                        var	datePart = dateval1.substring(0,breakIndex-3);
                        var	timePart = dateval1.substring(breakIndex-2, dateval1.length);
                        var timeVal = timePart.split(" ");//No I18N
                        dateval1 = datePart;
                        var timeArrVal = timeVal[0].split(":");
                        var hourval1 = timeArrVal[0];
                        var minuteval1 = timeArrVal[1];
                        if(Crm.userDetails.TIME_FORMAT!=="HH:mm"){
                            ampmval1 = timeVal[1];
                        }
                    }
                    if(Crm.userDetails.TIME_FORMAT!=="HH:mm"){
                        if(ampmval1 == "PM"){
                            if(hourval1.indexOf("0") == 0){
                                hourval1 = hourval1.substr(1);
                            }
                            if(hourval1 < 12){
                                hourval1 = parseInt(hourval1) + 12;
                            }
                        }
                        else if(ampmval1 == "AM" && hourval1==12){ //No I18N
                            hourval1=0;
                        }
                    }
                    var ampmval2;
                    if(getElm(formName,timeFldName2+"hour") && getElm(formName,timeFldName2+"minute") ){
                        var hourval2=getElm(formName,timeFldName2+"hour").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        var minuteval2=getElm(formName,timeFldName2+"minute").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        if(Crm.userDetails.TIME_FORMAT!=="HH:mm"){
                            ampmval2=getElm(formName,timeFldName2+"ampm").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        }
                    }
                    else if(getElm(formName,"property("+fldLabel2+"hour)") && getElm(formName,"property("+fldLabel2+"minute)") ){
                        var hourval2=getElm(formName,"property("+fldLabel2+"hour)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        var minuteval2=getElm(formName,"property("+fldLabel2+"minute)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        if(Crm.userDetails.TIME_FORMAT!=="HH:mm"){
                            ampmval2=getElm(formName,"property("+fldLabel2+"ampm)").value.replace(/^\s+/g, '').replace(/\s+$/g, '');//no i18n
                        }
                    }
                    else{
                        dateval2 = getElm(formName,"value_"+fldLabel2).innerHTML;//no i18n
                        var breakIndex = dateval2.indexOf(":"); //No I18N
                        var	datePart = dateval2.substring(0,breakIndex-3);
                        var	timePart = dateval2.substring(breakIndex-2, dateval2.length);
                        var timeVal = timePart.split(" ");//No I18N
                        dateval2 = datePart;
                        var timeArrVal = timeVal[0].split(":");
                        var hourval2 = timeArrVal[0];
                        var minuteval2 = timeArrVal[1];
                        if(Crm.userDetails.TIME_FORMAT !=="HH:mm"){
                            ampmval2 = timeVal[1];
                        }
                    }
                    if(Crm.userDetails.TIME_FORMAT!=="HH:mm"){
                        if(ampmval2 == "PM"){
                            if(hourval2.indexOf("0") == 0){
                                hourval2 = hourval2.substr(1);
                            }
                            if(hourval2 < 12){
                                hourval2 = parseInt(hourval2) + 12;
                            }
                        }
                        else if(ampmval2 == "AM" && hourval2==12){ //No I18N
                            hourval2=0;
                        }
                    }
                    var dateelements1=CrmDateUtils.splitDateVal(dateval1)
                    var dateelements2=CrmDateUtils.splitDateVal(dateval2)
    
                    dd1=dateelements1[0]
                    mm1=dateelements1[1]
                    yyyy1=dateelements1[2]
    
                    dd2=dateelements2[0]
                    mm2=dateelements2[1]
                    yyyy2=dateelements2[2]
    
                    var date1=$L.moment().toDate();
                    var date2=$L.moment().toDate();
                    date1.setYear(yyyy1)
                    date1.setMonth(mm1-1)
                    date1.setDate(dd1)
                    date1.setHours(hourval1)
                    date1.setMinutes(minuteval1)
    
                    date2.setYear(yyyy2)
                    date2.setMonth(mm2-1)
                    date2.setDate(dd2)
                    date2.setHours(hourval2)
                    date2.setMinutes(minuteval2)
    
                    if (type!="OTH") {
                        if (!CrmDateUtils.comparingDates(date1,fldLabel1,date2,fldLabel2,type,alerType,isAlertNeeded)) {
                            if(isAlertNeeded){
                            getElm(formName,dateFldName1).setAttribute("autocomplete","off");
                            getElm(formName,dateFldName1).focus()
                            }
                                return false
                        } 
                        else {
                            return true;
                        }
                    } 
                    else {
                        return true;
                    }
                },
                    /**
                     * This method is used to validate the values present within a field of type date.
                     * @param {String} fldName - This provides the value present within the date field which has to be validated
                     * @param {String} fldLabel - This provides the label or name of the date field that has to be validated 
                     * @param {String} formName - This provides the form name within which the date field value has to be validated 
                      * @param {HTMLElement} currObj - This provides the current object that has to be validated.
                      * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
                     * @returns {Boolean} - If it is a valid pattern it returns true else false
                     */
                dateValidate : function(fldName,fldLabel,type,formName,currObj,alertType,isAlertNeeded=true,isI18n=false, translatedFieldLabel){
                    var currObj= currObj ? currObj : getElm(formName,fldName);
                    if(!currObj){
                        fldName = "property("+fldLabel+")";//No I18N
                        currObj = getElm(formName,fldName);
                    }
                    var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
                    var dateval = currObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '');//No I18N
                        var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : replacedFldLabel)); //No I18N
                        var isValidDate = Utils.isValidDate(Crm.userDetails.DATE_PATTERN, dateval,undefined,isI18n);
                        if(!isValidDate){
                            if(isAlertNeeded){
                                renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);			
                            }
                            return false;
                        }
                        return true;
                },
                    /**
                     * This method is used to validate the values present within a field of type date.
                     * @param {String} fldName1 - This provides the value present within the date1 field which has to be validated
                     * @param {String} fldLabel1 - This provides the label or name of the date1 field that has to be validated 
                     * @param {String} fldName2 - This provides the value present within the date2 field which has to be validated
                     * @param {String} fldLabel2 - This provides the label or name of the date2 field that has to be validated 
                     * @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
                      * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
                     * @returns {Boolean} - If it is a valid pattern it returns true else false
                     */
            dateComparison : function(fldName1,fldLabel1,fldName2,fldLabel2,type,alertType,isAlertNeeded) {
                       var dateval1=getObj(fldName1).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                    if(getObj(fldName2)){
                            var dateval2=getObj(fldName2).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                    }
                    else{
                        var dateval2=getObj("value_"+fldLabel2).innerHTML.replace(/^\s+/g, '').replace(/\s+$/g, '')
                    }
                    var dateelements1=CrmDateUtils.splitDateVal(dateval1)
                    var dateelements2=CrmDateUtils.splitDateVal(dateval2)
                    dd1=dateelements1[0]
                    mm1=dateelements1[1]
                    yyyy1=dateelements1[2]
    
                    dd2=dateelements2[0]
                    mm2=dateelements2[1]
                    yyyy2=dateelements2[2]
    
                    var date1=new Date(yyyy1,(mm1-1), dd1);
                    var date2=new Date(yyyy2, (mm2-1), dd2);
                    if (type!="OTH") {
                        if (!CrmDateUtils.comparingDates(date1,fldLabel1,date2,fldLabel2,type,alertType,fldName1,isAlertNeeded)) {
                            if(isAlertNeeded){
                                getObj(fldName1).setAttribute("autocomplete","off");
                                getObj(fldName1).focus()
                            }
                            
                            return false
                        } 
                        else{ 
                            return true;
                        }
                    }
                    else{
                        return true
                    }
                },
                
                /**
                 * This method is used to validate the values present within a field of type time.
                 * @param {String} fldName - This provides the value present within the time field which has to be validated
                 * @param {String} fldLabel - This provides the label or name of the time field that has to be validated 
                 * @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
                 * @param {String} formName - This provides the form name within which the time field value has to be validated 
                  * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
                 * @returns {Boolean} - If it is a valid pattern it returns true else false
                 */
             timeValidate : function(fldName,fldLabel,type,formName,alertType,isAlertNeeded=true, translatedFieldLabel) {
                    if (validationUtils.patternValidate(fldName,fldLabel,"TIME",undefined,formName,undefined,alertType,isAlertNeeded)==false){
                        return false 
                    }
                    var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
                    var timeval=getElm(formName,fldName).value.replace(/^\s+/g, '').replace(/\s+$/g, '');
                    var hourval=parseInt(timeval.substring(0,timeval.indexOf(":")));
                    var minval=parseInt(timeval.substring(timeval.indexOf(":")+1,timeval.length))
                    var currObj=getElm(formName,fldName)
                    var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : replacedFldLabel)); //No I18N
                    if (hourval>23 || minval>59) {
                        if(isAlertNeeded){
                            renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
                              currObj.setAttribute("autocomplete","off");
                            currObj.focus()
                            if (hourval>23){ 
                                selInvalidText(getElm(formName,fldName),hourval) 
                            }
                            if (minval>59){ 
                                selInvalidText(getElm(formName,fldName),minval) 
                            }
                        }
                          
                        return false
                    }
                    var currtime=$L.moment().toDate();
                    var chktime=$L.moment().toDate();
                    chktime.setHours(hourval)
                    chktime.setMinutes(minval)
                    if (type!="OTH") {
                        if (!CrmDateUtils.comparingDates(chktime,fldLabel,currtime,"current time",type,alertType)) {
                            if(isAlertNeeded){
                            getElm(formName,fldName).setAttribute("autocomplete","off");
                            getElm(formName,fldName).focus()
                            }
                            return false
                        } 
                        else{
                            return true;
                        }
                    } 
                    else{
                        return true
                    }
                },
                
                timeComparison : function(fldName1,fldLabel1,fldName2,fldLabel2,type,formName,alertType,isAlertNeeded=true) {
                    var timeval1=getElm(formName,fldName1).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
                    var timeval2=getElm(formName,fldName2).value.replace(/^\s+/g, '').replace(/\s+$/g, '')
    
                    var hh1=timeval1.substring(0,timeval1.indexOf(":"))
                    var min1=timeval1.substring(timeval1.indexOf(":")+1,timeval1.length)
    
                    var hh2=timeval2.substring(0,timeval2.indexOf(":"))
                    var min2=timeval2.substring(timeval2.indexOf(":")+1,timeval2.length)
    
                    var time1=$L.moment().toDate();
                    var time2=$L.moment().toDate();
    
                    time1.setHours(hh1)
                    time1.setMinutes(min1)
    
                    time2.setHours(hh2)
                    time2.setMinutes(min2)
    
                    if (type!="OTH") {
                        if (!CrmDateUtils.comparingDates(time1,fldLabel1,time2,fldLabel2,type,alertType,isAlertNeeded)) {
                           if(isAlertNeeded){
                            getElm(formName,fldName1).setAttribute("autocomplete","off");
                            getElm(formName,fldName1).focus()
                           }
                           return false
                        } else{
                            return true;
                        }
                    } else{
                        return true;
                    }
                }
    };
    