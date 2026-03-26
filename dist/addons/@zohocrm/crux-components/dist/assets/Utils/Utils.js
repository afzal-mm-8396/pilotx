//$Id$
/***
 * This file contains all common utilities also the prototype methods to support function over inbuild data type.
 *
 ***/
$.fn.outerHTML = function() {
	var $t = $(this);
	if ('outerHTML' in $t[0]) {
		return $t[0].outerHTML;
	} else {
		var content = $t.wrap('<div></div>').parent().html();
		$t.unwrap();
		return content;
	}
}
//Added to avoid IIVF logger issues - compatibility code
detailview_log = { //eslint-disable-line @zoho/webperf/no-global-variables
	xhrTiming : [],
	resourceTime : [],
	getRes : []
};
//for using forEach with nodelist in IE
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
/**
 * @classdesc Sets the required class for a given Poppu (JQyery Object)
 * @param {String} divId -  Id of the popup node. 
 */
$.fn.setPopupClass=function(divId){
	$("#"+divId+"Popup").removeClass();
	$("#"+divId+"Popup").addClass('zcrm-content');
	$("#"+divId+"Header").removeClass();
	$("#"+divId+"Header").addClass('popup-model-header crm-heading-font-size crm-font-bold crmHeadingColor');//eslint-disable-line @zoho/webperf/no-multipleDOMLookup
	$("#"+divId+"Content").removeClass();
	$("#"+divId+"Content").addClass('popup-model-content');
	if($("#"+divId+"Footer").length>0){
		$("#"+divId+"Footer").removeClass();
		$("#"+divId+"Footer").addClass('popup-model-footer');
	}
	showAnimatePopup('topBandPopup');//No I18N
}

/**
 * Copying prototype of Array to HTMLCollection, NodeList
 */
try {
	(function(){
		['forEach', 'map', 'filter', 'every'].forEach(function(prototypeMethod) { // NO I18N
			[NodeList, HTMLCollection, DOMTokenList, StyleSheetList, CSSRuleList].forEach(function(objectConstructor) {
				if(!objectConstructor.prototype[prototypeMethod]) {
					objectConstructor.prototype[prototypeMethod] = function() {
						return Array.prototype[prototypeMethod].apply(this,arguments);
					}
				}
			})
		})
	})();
} catch (e) {
	// suppress error
}
/**
 * @classdesc used to include a javascript file. This can be used when we need to execute the script after a script file is downloaded. 
 * @example CJS.execScript("/crm/javascript/crmTemplate.js", crmTemplate.create);
 * @param {String} - Js file path 
 * @param {Function} - Call back to be executed once the file is loaded. 
 **/
/*****Prototypes*****/
var CJS = (function(){ 
	return{
		execScript : function(src, onLoad, available, isStaticUrl,isAsync) {
			// single function that works with onload and onreadystatechange
					if( src.includes(FingerPrint.basePathUrl) && FingerPrint.isEnabled && !isStaticUrl){
						var fileName = src.split("javascript/")[1].split("?")[0];
						var resourcePath = FingerPrint.basePathUrl + ResourceConstants.JAVASCRIPT+'/';
	
						if(FingerPrint.isCdnEnabled){
							networkUtils.cdnUrl = FingerPrint.primaryCdnUrl;
							if(crmConstants.isCNCDN){
								networkUtils.cdnUrl = FingerPrint.dynamicCdnUrl;
							}
							
							var fp_fileName = commonUtils.getfingerPrintProperties(fileName);
							src = networkUtils.cdnUrl + resourcePath + fp_fileName
						}
						else{
							src = resourcePath + fileName
						}
					}
			if(available){
				onLoad();
				return;
			}
			var func = function() {
				if ( this.readyState && this.readyState != "complete" && this.readyState != "loaded" ) {
					return; 
				}
				this.onload = this.onreadystatechange = null; // ensure callback is only called once
				onLoad(); 
			};

			// Add a SCRIPT element pointing to the (already cached) src so the JS gets executed.
			var se = document.createElement('script');
			se.onload = se.onreadystatechange = func;  // set this BEFORE setting .src
			if(src.includes("/crm/") && ((document.domain).indexOf('localzoho.com')>-1 || FingerPrint.isCdnEnabled || ( typeof Crm != "undefined" && Crm.userDetails && Crm.userDetails.JS_CORS_ENABLED))){
				se.src = src+FingerPrint.corsParams;
				se.setAttribute("crossorigin","anonymous"); //NO I18N
				
				// SRI Implementation
			if(typeof isSRIntegrityEnabled !== 'undefined' && isSRIntegrityEnabled){
					var integrityHash = networkUtils.getIntegrityProperties(src);
					if(integrityHash){
						se.setAttribute("integrity", integrityHash); //NO I18N
					}
				}
			}else{
				se.src = src;
			}
			if(isAsync){
				se.defer = true;
				document.getElementsByTagName('body')[0].appendChild(se);
			}else{
				var s1 = document.getElementsByTagName('script')[0];
				s1.parentNode.insertBefore(se, s1);
			}
		}
	};	
	})();
var Utils = {
	"detachObjects":[],//No I18N
	"sectionNamesArrayForSearch":[],//No I18N
    
    "getMonthEnd" : function(month,year){//No I18N
	var monthEndArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(month == 1){
        	monthEndArr[1] = ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 !=0))) ? 29 : 28;
	}
	return monthEndArr[month];
    },
    "isValidTime" : function(hrs,mins){//No I18N
        var argLen = arguments.length;
		var reg = /\d*/g;
        for(var i=0;i<argLen;i++){
        	// eslint-disable-next-line @zoho/zstandard/no-reserved-words
            if(!reg.test(arguments[i]))
                return false;
        	// eslint-disable-next-line @zoho/zstandard/no-reserved-words
            if(i == 0 && (arguments[i] === "" || arguments[i] > 23)) { return false; }
        	// eslint-disable-next-line @zoho/zstandard/no-reserved-words
            else if(i == 1 && (arguments[i] === "" || arguments[i] > 59)) { return false; }
        }
        return true;
    },
    "formatTimeVal"    :    function(val){//No I18N
        val = (val < 10)? ("0"+val) : val;
        return val; 
    },
    convertTimeTo24HoursFormat      :       function(hrs,meridiem){
		if(meridiem && typeof meridiem === "string"){
			meridiem = meridiem.toLowerCase();
			if(meridiem == "am"){  //No I18N
					return (hrs == 0)?12:(hrs == 12)?0:hrs;
			}else if(meridiem == "pm"){//No I18N
					return (hrs == 12)?hrs:hrs+12;
			}else if(meridiem == I18n.getMsg("AM").toLowerCase() || I18n.getMsg("am").toLowerCase() == meridiem ){
				return (hrs == 0)?12:(hrs == 12)?0:hrs;
			}else if(meridiem == I18n.getMsg("PM").toLowerCase() || I18n.getMsg("pm").toLowerCase() == meridiem ){
				return(hrs == 12)?hrs:hrs+12;
			}else if(meridiem == I18n.getMsg("crm.label.morning").toLowerCase()){
				return (hrs == 0)?12:(hrs == 12)?0:hrs;
			}else if(meridiem == I18n.getMsg("crm.label.afternoon").toLowerCase()){
				return(hrs == 12)?hrs:hrs+12;
			}
		}
    },
    convertTimeTo12HoursFormat     :       function(hrs,meridiem){
        if(meridiem && typeof meridiem === "string"){
			meridiem = meridiem.toLowerCase();
			if(meridiem == "pm"){
					return (hrs <= 12) ? hrs:hrs-12;
			}
			else if(meridiem == "am"){      
					return (hrs == 0)? 12 : hrs ;
			}  
		}
    },    
    getDateObject        :    function(strDate,time){
        var dateObj = crmCalendar.getDateObjectFromGivenDateString(strDate, Crm.isCalendarSchedule === true?"mm/dd/yyyy":undefined); // No I18n
        if(time.hrs){
            dateObj.setHours(time.hrs);
        }
        if(time.mins){
            dateObj.setMinutes(time.mins);
        }
        if(time.sec){
            dateObj.setSeconds(time.sec);
        }
        return dateObj;    
    },
    getTimeDiff : function(startDate, endDate) {
        var elapsed = (endDate.getTime() - startDate.getTime())/1000;
        var seconds=elapsed%60;
        var minutes=(elapsed%3600)/60;
        var hours=elapsed/3600;
        return {"hours": hours,"minutes":minutes,"seconds":seconds};//No I18N
    },
    getTimeArrayWithGivenIntervalNew : function(offsetMins,timeLimit)
    {
    	var startTime;
    	var realTime = new CrmDate();
    	if(timeLimit === 'future'){
    		var tempHr,tempMin;
    		if(realTime.userDisplayMinute <= 30){
        		tempHr = realTime.userHourIn24hrFmt;
        		tempMin = 30 ;
        	}else {
        		tempHr = realTime.userHourIn24hrFmt + 1;
        		tempMin = 0 ;
        	}
    		startTime = CrmDateUtils.getCrmDateFromUserTime(realTime.userDisplayMonth,realTime.userDisplayDate,realTime.userDisplayYear,tempHr,tempMin,0);
    	}else{
    		startTime = CrmDateUtils.getCrmDateFromUserTime(realTime.userDisplayMonth,realTime.userDisplayDate,realTime.userDisplayYear,0,0,0);
    	}
    	var iterDate = startTime;	//No I18n
    	var allTimeArr = [];
    	var offsetMillis = offsetMins;
      	do
    	{
    		var userTime = iterDate.getTimeInUserPattern();
    		var meridiem = iterDate.userHourIn24hrFmt > 11 ? "PM" : "AM";//No I18n
    		var tKey = [{"name": "span", "html": userTime, "attr": {"diff":0,"hrs":userTime.split(':')[0],"mins":iterDate.userDisplayMinute,"meridiem":meridiem}}]; //No I18n
            allTimeArr.push(tKey);
           // var initDate = new Date(iterDate.getDateInUserPattern()+" "+iterDate.getTimeInUserPattern());
            iterDate = CrmDateUtils.getAfterMinsByCrmdate(offsetMillis,iterDate);
            
    	}
    	while(timeLimit === 'past' ? !iterDate.isFutureTime() : iterDate.isToday());	//NO I18n
   		return allTimeArr;	
    },
    getTimeArrayWithGivenInterval    :    function(calculateFromCurrTime,minDiff,dateObj,options, additionalOption){
        if(calculateFromCurrTime){
            var dateObj = new Date();
        }else if(!dateObj){
            var dateObj = new Date(2000,0,1,0,0,0);//default date
        }
        var minDiff = (!minDiff)?30:minDiff;
        var currDateObj = new Date(dateObj);
        var startDateObj = new Date(dateObj);
        var nextDayObj = new Date(currDateObj.setDate(currDateObj.getDate()+1));
        var nextDayCurrTime = nextDayObj.getTime();
//        dateObj.setMinutes(dateObj.getMinutes()+minDiff);
        var optionalVal ='' ;
        var allTimeArr = [];
        var timeJson = {};
        while(dateObj.getTime() < nextDayCurrTime){
            var mins = dateObj.getMinutes();
            var tfHour = dateObj.getHours();
            var hour = (Crm.userDetails.TIME_FORMAT === "HH:mm")? tfHour :  this.convertTimeTo12HoursFormat(tfHour, Utils.getMeridiem(dateObj) );//No I18N
            var timeDifInMin = 0;
    var meridiem = ( tfHour > 11 ) ? "PM" : "AM";//No I18n
            if(options == "meridiem" && Crm.userDetails.TIME_FORMAT !== "HH:mm"){
                optionalVal = ( tfHour > 11 ) ? I18n.getMsg("PM") : I18n.getMsg("AM");//No I18n
            }else if(options == "timeDiff"){//No I18n
                var timeDiff = this.getTimeDiff(startDateObj,dateObj);
                if(timeDiff["hours"] > 1){
                    optionalVal = timeDiff.hours +" "+I18n.getMsg("crm.workflow.scheduler.hours");//No I18n
                    timeDifInMin = timeDiff.hours * 60;
                }
                else if(timeDiff["hours"] == 1){
                	timeDifInMin = timeDiff.hours * 60;
                    optionalVal = timeDiff.hours +" "+I18n.getMsg("crm.workflow.scheduler.hour");//No I18n
                }
                else{
                    optionalVal = timeDiff.minutes +" " +I18n.getMsg("crm.workflow.scheduler.mins");//No I18n
                    timeDifInMin =timeDiff.minutes;
                }
            }
            var tKey = [{"name": "span", "html": Utils.formatTimeVal(hour)+":"+Utils.formatTimeVal(mins)+" ", "attr": {"diff":timeDifInMin,"hrs":(Crm.userDetails.TIME_FORMAT === "HH:mm")?tfHour:hour,"mins":Utils.formatTimeVal(mins),"meridiem":meridiem}}];//No I18n
	    if(optionalVal){
		    tKey.push( {"name": "span", "html": optionalVal, "attr": {"class":"crmNotFoundColor crm-small-font-size pL5"}});  //No I18N
	    }
            //dateObj.setMinutes(mins+minDiff);//We are having some bug in chrome(during daylight saving) so we are using the below format.
            allTimeArr.push(tKey);
            if(!validationUtils.isEmpty(additionalOption))
            {
            	var opHour = additionalOption.optionHour;
            	var opMin = additionalOption.optionMin;
            	var opName = additionalOption.optionName;
            	 var opHourDisp = (Crm.userDetails.TIME_FORMAT === "HH:mm")? opHour :  this.convertTimeTo12HoursFormat(opHour, (opHour>12)?"pm":"am" );//No I18N
            	var optionHtml = [{"name": "span", "html": opName, "attr": {"diff":0,"hrs":(Crm.userDetails.TIME_FORMAT === "HH:mm")?opHour:opHourDisp,"mins":Utils.formatTimeVal(opMin),"meridiem":meridiem}}];//No I18n
            	if((opHour == tfHour) && (opMin >= mins) && ((opMin - mins)<minDiff)){
                    allTimeArr.push(optionHtml);
                }
            }
    	    dateObj = new Date(dateObj.getTime() + minDiff*60000);
        }
        return allTimeArr;
    },
    
    "compareDate" : function(startDate, endDate,dontIncludeZero){//No I18N
	    var startTime = new Date(startDate.getTime());
	    startTime.setHours(0,0,0,0);
	    var endTime = new Date(endDate.getTime());
	    endTime.setHours(0,0,0,0);
		var returnValue = dontIncludeZero ? (endTime.getTime()-startTime.getTime() > 0) : (endTime.getTime()-startTime.getTime() >= 0);
	    return returnValue ;
    },
	"compareDateandTime"	:	function(startDate,endDate){//No I18n
		var startTime = new Date(startDate).getTime();//In order to avoid milliseconds difference
		var endTime = new Date(endDate).getTime();
		var diff = endTime - startTime;
		return (diff >= 1000);
//		return (diff >= 0); //in order to support equal dates
	},
	"isValidDate"	:	function(datepat,dateVal,cusdatepat,isI18n = false){//No I18n
		//var reg = /./;
		if(!dateVal)
		{
			return false;
		}
		datepat = cusdatepat!=undefined ? cusdatepat : datepat;	
		//pattern changed to uppercase as day(01,02,..), month(01,02..) and year are represented as tokens DD, MM and YYYY in moment
		//lowercase 'dd' and 'mm' represents day of week('Su','Mo'..) and minutes respectivetly
		datepat = datepat.toUpperCase();
		
		try{
			if(isI18n){
				return $L.moment(dateVal,datepat,{i18n:true}).validate();
			}
			return $L.moment(dateVal,datepat).validate();
		}
		catch(e){
			return false;
		}	
	},

    
getTimeStringWithAmPm : function(dateObj)
{
    if (!dateObj) {
        dateObj = new Date();
    }
    var hr = dateObj.getHours();
    var min = dateObj.getMinutes();
    var is24HoursFormat =  Crm.userDetails.TIME_FORMAT === "HH:mm";//No I18n
    var amPm = "";
    if(!is24HoursFormat){
		amPm = Utils.getMeridiem(dateObj);
		hr = Utils.convertTimeTo12HoursFormat( hr,amPm );
	}
    if(hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10){
        min = "0" + min;
    }
    return {"hrs":hr,"mins": min,"meridiem":amPm};//No I18N
},
 "getMeridiem" : function(dateObj,upCase){//No I18n
    var meridiem = (upCase)?"AM":"am"; //No I18N
    var hr = dateObj.getHours();
    if(hr >= 12){
        meridiem =(upCase)?"PM":"pm"; }//No I18N
    return meridiem;
},
	"getDateObjFromDateStr" : function(dateVal, datePattern,isI18N=false){ // NO I18N		
		if(!dateVal)
		{
			return '';
		}
		if(!datePattern)
		{
			datePattern = Crm.userDetails.DATE_PATTERN.toUpperCase();;
		}
		if(!dateVal.getMonth)
		{
			var dateObj = new Date();
			try{
				dateObj = isI18N ? $L.moment(dateVal,datePattern,{i18n : true}).getDObj() : $L.moment(dateVal,datePattern).getDObj();
			}catch(e){ 
				murphy.error(e); 
			}			
			if(!dateObj)
			{
				dateObj = new Date();
			}
			return dateObj;
		}
		return dateVal;
			
	},
	
	//the below mothod converts date to specified date format using Lyte moment. 'formatPattern' should follow the Lyte moment format tokens.
	"convertDateToUserPattern" : function(dateInString, formatPattern,isI18n = false) //NO i18N
	{
		if(dateInString){
			if(!formatPattern)
			{
				formatPattern = Crm.userDetails.DATE_PATTERN.toUpperCase();
			}
			if(isI18n){
				return $L.moment(dateInString).i18N(formatPattern);
			}
			return $L.moment(dateInString).format(formatPattern); // eslint-disable-line @zoho/zohocrm/Date-Util-Usage
		}
	},
	"getDateInUsrViewFormat" : function(newDate,isI18N=false){ //NO i18N
		newDate = this.convertUsrtoDefaultDatePattern(newDate);
		 var usrLocale = Crm.userDetails.COUNTRY_LOCALE;
		 var format = "MMM D, YYYY"; //NO I18N
		 if(usrLocale == "en_GB"){
			 format = "D MMM, YYYY"; //NO I18N
		 }
		 return this.convertDateToUserPattern(newDate, format,isI18N);
	},
	"getCurrentCrmTimeInUserFormat": function() { //NO i18N
		var today = new Date();
		Utils.convertToUserTimezone(today);
		return Utils.getTimeInUserFormat(today);
	},
	// the below method will return date in user locale as May 27(if year is current year)/May27 2016
	"getDateInUsrLocaleFormat" : function(newDate,isI18N=false){ //NO i18N
		 var format = "MMM D, YYYY"; //NO I18N

		if(new Date(newDate).getFullYear() === new Date().getFullYear()) {
			 format = format.split(",")[0];
		 }
		 var formattedDate = this.convertDateToUserPattern( new Date(newDate) , format,isI18N);// eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
		 var month = formattedDate.slice(0,3);
		 return formattedDate.replace(month,I18n.getMsg(month));
	},
	"getDateInUserDatePattern"	: function(newDate,isI18N=false){ //NO I18N		
		return this.convertDateToUserPattern(newDate,undefined,isI18N);
		
	},
	"getDateInGivenPattern"	: function(newDate,pattern){ //NO I18N
		if( !newDate || !(newDate instanceof Date) ){
			var newDate = new Date();
		}
		var newToDay = newDate.getDate();
		var newMonth = newDate.getMonth();
		var str=newToDay+" "+newMonth+" "+newDate.getFullYear();
		return crmCalendar.convertToUserDatePattern(str,pattern);
	},
	"getDateInLocaleDefaultFormat" : function(newDate){//NO I18N
		if( !newDate || !(newDate instanceof Date) ){
			 var newDate = new Date();
		}
		return crmCalendar.monthNameWithThreeLetter[newDate.getMonth()].html+" "+newDate.getDate()+", "+newDate.getFullYear();
	},
	//return userformat datetime without I18n
	"getDateTimeInUsrFmtWithoutLbl" : function(dateObj,upCase) {// no i18n   
		var dtStr = Utils.getDateInUserDatePattern(dateObj);  
		dtStr += " " + Utils.getTimeInUserFormat(dateObj, upCase, true);
		return dtStr;
	},
	"getDateTimeInUserFormat" : function(dateObj,upCase, isView, noNeedI18n) {// no i18n  
		var dtStr = Utils.getDateInUserDatePattern(dateObj);
		dtStr += " " + Utils.getTimeInUserFormat(dateObj, upCase, noNeedI18n);
		return dtStr;
	},
	"getUserDateTimeFormatFromServerFormat" : function (value) {// no i18n
	    if(value &&  typeof value === 'string' && value.match('T')) {
	           value = value.replace(/[+-]\d{2}:\d{2}/,'');
	           var dateValue = value.split("-");
	           var date = $L.moment(value.split("T")[0], 'YYYY-MM-DD').toDate();// no i18n
	           value = value.split("T");
				var time = value[1] ? value[1].split(":") : '';
				if(time) {
	           date.setHours(time[0]);
	           date.setMinutes(time[1]);
				}
	           var formattedDate = Utils.getDateTimeInUserFormat(date, true);
	           var month = formattedDate.slice(0,3);
	           return formattedDate.replace(month,I18n.getMsg(month));
	       }
	       return value;
	},
	"getDateTimeInUserFormatWithI18N" : function(newDate) { // no i18n
		if( !newDate || !(newDate instanceof Date) ){
			 var newDate = new Date();
		}
		var dtStr = Utils.getDateInLocaleDefaultFormat(newDate);
		dtStr += " " + Utils.getTimeInUserFormat(newDate, true);
		return dtStr;
	},
	"getTimeInUserFormat" : function(dateObj, upCase, noNeedI18n) {//No I18n
		if ( Crm.userDetails.TIME_FORMAT == "HH:mm" && dateObj instanceof Date ) {  //No I18n
			var hr = (dateObj.getHours()<10)?("0"+dateObj.getHours()):dateObj.getHours();//No I18n
			var min = (dateObj.getMinutes()<10)?("0"+dateObj.getMinutes()):dateObj.getMinutes();//No I18n
			return hr+":"+ min;//No I18n
		}else{
			var timeObj = Utils.convertTo12HoursFormatTimeObj(dateObj,upCase);
			if(noNeedI18n){
				return timeObj.hrs+":"+timeObj.mins+" "+timeObj.meridiem;//No I18n
			}
			return timeObj.hrs+":"+timeObj.mins+" "+I18n.getMsg(timeObj.meridiem);//No I18n
		}
	},
	"convertTo12HoursFormatTimeObj" : function(dateObj,upCase) {//No I18n
    if (!dateObj) {
        dateObj = new Date();
    }
        var hr = dateObj.getHours();
    var amPm = this.getMeridiem(dateObj,upCase);
    var min = dateObj.getMinutes();
    hr = Utils.convertTimeTo12HoursFormat( hr, Utils.getMeridiem(dateObj) );    
    if(hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10){
        min = "0" + min;
    }
    return {"hrs":hr,"mins": min,"meridiem":amPm};  //No I18N
},
//the below method returns dateObject parsed from given date value and user date pattern using lyte moment.
"convertUsrtoDefaultDatePattern" : function(newDate, checkLocale){ //No I18N
	if(!newDate)
	{
		return '';
	}	
	if( ! newDate.getMonth)
	{
		var	datePattern = Crm.userDetails.DATE_PATTERN.toUpperCase();			
		
		try{
			newDate = $L.moment(newDate, datePattern, {i18n : true}).getDObj();
		}catch(e){ 
			murphy.error(e);
		}	
	}
	return newDate;
},
"getTimeStrForAllDayReminder" : function() {//No I18n
	var dayStartsAt = Crm.calPreferences.DAYSTARTSAT.split(":");//No I18n
	var newDateObj = new Date();
	newDateObj.setHours(parseInt(dayStartsAt[0]) - 1);
	var res = "";
	if ( "HH:mm" === Crm.userDetails.TIME_FORMAT) {
		var hr_new = newDateObj.getHours();
		res = (hr_new < 10 ? "0"+hr_new : hr_new) + ":00";
	} else {
	var dateJson = Utils.convertTo12HoursFormatTimeObj(newDateObj);
	var time = parseInt(dateJson.hrs);
	if ( time < 10) {
		dateJson.hrs = dateJson.hrs.substr(1);
	}
		res = dateJson.hrs + " " + I18n.getMsg(dateJson.meridiem.toUpperCase()); //No I18n
	}
	return res;
},
	"isToday" : function(dateObj) {//NO I18n
		var todayDate = new Date();
		return ( dateObj.getDate() === todayDate.getDate() &&  dateObj.getMonth() === todayDate.getMonth() && dateObj.getFullYear() === todayDate.getFullYear());
	},
	"getDayDiff" : function(endDt, startDt) {//No I18n
		var endtStr = $.datepicker.formatDate("yy-mm-dd", endDt);//No I18n
		var diff = Math.abs( endDt.getTime() - startDt.getTime() );
		var days = Math.ceil(diff / (1000 * 3600 * 24));
		return days;
	}, 
	getMillisecondsToBasicDateProperties : function(timeInMilliSeconds, daysNeeded) 
	{
		var days = parseInt(timeInMilliSeconds / 864e5),//864e5 === 86400000
		hours = (daysNeeded) ? parseInt((timeInMilliSeconds % 864e5) / 36e5)
							 : parseInt(timeInMilliSeconds / 36e5), // 36e5 === 3600000
		mins = parseInt((timeInMilliSeconds % 36e5) / 6e4);//36e5 === 3600000 && 6e4 = 60000 
	    secs = Math.floor((timeInMilliSeconds % 6e4) / 1000);//6e4 = 60000
	    var dateProp = {};
	    dateProp.days = days;
	    dateProp.hours = hours;
	    dateProp.mins = mins;
	    dateProp.secs = secs;
	    return dateProp;
	},
	getProperI18nTimeUnit : function(value, unit) 
	{
		if (value != 1) 
		{
			unit = unit + 's'; //No I18N
		}
		unit = I18n.getMsg(unit);
		return value + " " + unit + " ";
	},
	convertTimeInDoubleToReadableForm : function(doubleVal,hourVal) 
	{
		if (!validationUtils.isValidDecimal(doubleVal)) 
		{
			return doubleVal;
		}
		doubleVal = parseFloat(doubleVal);
		if (doubleVal == 0) 
		{
			return 0;
		}
		var timeInMilliSeconds = doubleVal * 60 * 1000;
		var dateProp = Utils.getMillisecondsToBasicDateProperties(timeInMilliSeconds, true);
		var result = "";
		if (dateProp.days) 
		{
			result += Utils.getProperI18nTimeUnit(dateProp.days, "day");//No I18N
			delete dateProp.mins;
			delete dateProp.secs;
		}
		if (dateProp.hours) 
		{
			result += hourVal ? Utils.getProperI18nTimeUnit(dateProp.hours, hourVal) : Utils.getProperI18nTimeUnit(dateProp.hours, "hour"); //No I18N
			//result += Utils.getProperI18nTimeUnit(dateProp.hours, "hour");//No I18N
			delete dateProp.secs;
		}
		if (dateProp.mins) 
		{
			result += Utils.getProperI18nTimeUnit(dateProp.mins, "min");//No I18N
		}
		if (dateProp.secs) 
		{
			result += Utils.getProperI18nTimeUnit(dateProp.secs, "sec");//No I18N 
		}
		return result.trim();
	},
	"sortDate" : function(a,b) { 	//NO I18N
		return (new Date(a) - new Date(b));
	},
    
    "sortDateDecending" : function(a,b) { 	//NO I18N
    	return (new Date(b) - new Date(a));
	},
	
	"dateEquals" : function(date1, date2) { 	//NO I18N
    	return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }
	
};
jQuery.fn.clonewithvalues = (function () {
	var original = jQuery.fn.clone;
	return function() {
		var result       = original.apply(this, arguments),
		my_textareas     = this.find('textarea').add(this.filter('textarea')),//no i18n
		result_textareas = result.find('textarea').add(result.filter('textarea')),//no i18n
		my_selects       = this.find('select').add(this.filter('select')),//no i18n
		result_selects   = result.find('select').add(result.filter('select'));//no i18n

		for (var i = 0, l = my_textareas.length; i < l; ++i){          
			$(result_textareas[i]).val($(my_textareas[i]).val());
		}
		for (var i = 0, l = my_selects.length;   i < l; ++i) {
			result_selects[i].selectedIndex = my_selects[i].selectedIndex;
		}

		return result;
	}
 })();
		
//To get difference between two date objects based on different parameters , instead of different functions  
Utils.getTimeDiffInFormats = function( startDate, endDate ){

    	var delta = Math.abs(endDate - startDate) / 1000;
    	var result = {};
    	var formats = { //Seconds value for different time frame
    	    //year: 31536000,
    	    month: 2592000,
    	    //week: 604800, 
    	    day: 86400,   
    	    hours: 3600,
    	    minutes: 60,
    	    seconds: 1
    	};

    	Object.keys(formats).forEach(function(key){
    	    result[key] = Math.floor(delta / formats[key]);
    	    delta -= result[key] * formats[key];
    	});

    	return result;
        
    }

Utils.convertToUserTimezone = function( dateObj ){
	
	var clientOffset = dateObj.getTimezoneOffset();
	 var userOffset = Utils.getTimezoneOffset();
	 if( userOffset !== clientOffset ){
		 //Both the offset are in minutes
		 
		 //Convert client to gmt time. Offset tells how many minutes the client timezone is ahead or before gmt. 
		 //If GMT+10 , then the offset will be -600 , implies you have to subtract 600 mins to get GMT.
		 //dateObj.setMinutes( dateObj.getMinutes() + clientOffset   );
		 
		 //Convert gmt to user timezone.
		 //dateObj.setMinutes( dateObj.getMinutes() - userOffset );
		 var diff = clientOffset - userOffset;
		dateObj.setMinutes( dateObj.getMinutes() + diff );
	 }
	
};

Utils.convertToOrgTimezone = function( dateObj ){
	
	var clientOffset = dateObj.getTimezoneOffset();
	var userOffset = Utils.getTimezoneOffset(Crm.userDetails.ORGTIME_ZONE);
	 if( userOffset !== clientOffset ){
		 var diff = clientOffset - userOffset;
		dateObj.setMinutes( dateObj.getMinutes() + diff );
	 }
};
/*
 * Returns the equivalent value of new Date().getTimezoneOffset(),  For a particular timezone. 
 */
Utils.getTimezoneOffset = function(timezone){
	
	var userTimezone = timezone || Crm.userDetails.TIME_ZONE;
	
	var toNegative = false; 
	if( userTimezone.indexOf("+") > -1 ){ 
		toNegative = true;
	}
	userTimezone = userTimezone.replace("+" , "").replace("-", "");
	
	var offsetHours = parseInt( userTimezone );
	var offsetMins = offsetHours * 60 ;
	var userOffsetMins = userTimezone.split(".")[1];
	userOffsetMins = parseInt( userOffsetMins );
	var totalMins = offsetMins + userOffsetMins ;
	
	if( toNegative ){  totalMins *= -1; }
	return totalMins;
	
};
//Utils.selectTempResult = function(data,container){
//	var selectEmptyText = data.text;
//	var ele = data.element;
//	if(ele !== undefined){
//		var selectElem=$(ele.parentElement);
//		var uiType=selectElem.data("uitype"); //No I18N
//		var colorcode_enabled=selectElem.data("colorcode_enabled"); //NO I18N
//
//		if((uiType === 2 || uiType === 26) && colorcode_enabled === true){
//			var pickMap = selectElem.attr("data-picklistmap") ? selectElem.attr("data-picklistmap") : selectElem.attr("data-values"); //NO I18N
//		if (pickMap !== undefined) {
//			var index = $(ele).index();
//			var colorCode = JSON.parse(pickMap)[index].colorCode;
//			if (colorCode){
//				selectEmptyText = "<span class='disable" + data.disabled + "'><span class='dIB activitesColor' data-zcqa='option_"+selectEmptyText+"' style='background:" + colorCode + "'></span><span>" + data.text + "</span></span>";//No I18N
//				$('.select2-container').addClass('dropdown_eventcolor');
//				return selectEmptyText;
//			}
//		}
//		}
//	}
//	};

//				_len--;
//Following fuctions used by Docs team 
function attachDocsIntegCallBackFn(jsonResp)
{
    var jsonArr = jsonResp.docObj;
    var docIds = "";
    var docNames = "";
    var services = "";
    var sharedDocIds = "";
    var sharedDocNames = "";
    var sharedServices = "";
    $(jsonArr).each(function(i, value){

    	// As we are using comma as the delimiter. so changing the comma, if it contains in the name of the file.
    	
        if(value.isDocumentSharedToMe == "true")
        {
            if(value.service == "upload")
            {
                sharedDocIds = (sharedDocIds == "")?value.encryptedId:sharedDocIds + "," + value.encryptedId;
            }
            else
            {
                sharedDocIds = (sharedDocIds == "")?value.docId:sharedDocIds + "," + value.docId;
            }
            sharedDocNames = (sharedDocNames == "")?value.docName:sharedDocNames + "," + value.docName;
            sharedServices = (sharedServices == "")?value.service:sharedServices + "," + value.service;
        }
        else
        {
        	value.docName = commonUtils.HandleCommaInFileName(value.docName);
            docIds = (docIds == "")?value.docId:docIds + "," + value.docId;
            docNames = (docNames == "")?value.docName:docNames + "," + value.docName;
            services = (services == "")?value.service:services + "," + value.service;
        }
    });
    var url = Crm.getCrmBasePath() + "/Status.do"; //No I18N
    var entIdElem = $("#entId"); var idElem = $("#id");
    var idVal = (entIdElem.length) ? entIdElem.val() : ((idElem.length) ? idElem.val() : null);
    var params = "docIds="+docIds+"&docNames="+encodeURIComponent(docNames)+"&services="+services+"&id="+idVal+"&sharedDocIds="+sharedDocIds+"&sharedDocNames="+sharedDocNames+"&sharedServices="+sharedServices; //No I18N
    if(fileupload.fromFileUploadField)
    {
    	params = params+"&fromFileUploadField=true&fieldId="+fileupload.fieldID;//NO I18N
    }
    fileupload.fromFileUploadField = false;
    $.ajax({type:"POST", url: url, data:params, success: function(resp){ //No I18N
        var divObj = document.createElement("DIV");
        divObj.style.display="none";
        document.body.appendChild(divObj);
        //$(divObj).empty();
        divObj.innerHTML = resp;
        JSEvalScript(divObj);        
    }});    
}


(function ($) {
	var html = $.fn.html;
    $.fn.html = function() {
    		if ( arguments.length >= 1 ) {
    			$(this).empty()
    		}

    		return html.apply(this, arguments)
    };
})(jQuery);

/** jquery newer versions, changed calculation of positions for elemets which do not have position as absolute value;
 * 		https://github.com/jquery/jquery/issues/3984
 * 	Hence overwritten
 * */



(function($){
	var _position = $.fn.position; 
	$.fn.position =  function(options) {
		/**
		 * For jquery-ui's position purpose.
		 * 
		 */
		if ( options && options.of ) {
			return _position.apply( this, arguments ); /* eslint-disable-line @zoho/zstandard/no-reserved-words */
		}
		
		/* **/
		if ( !this[ 0 ] ) {
			return;
		}
		
		
		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			var borders = $(offsetParent).eq(0).css(["borderTopWidth","borderLeftWidth"]);
			var borderTopWidth = parseFloat(borders.borderTopWidth);
			borderTopWidth = isFinite(borderTopWidth) ? borderTopWidth || 0 : borders.borderTopWidth;
			var borderLeftWidth = parseFloat(borders.borderLeftWidth);
			borderLeftWidth = isFinite(borderLeftWidth) ? borderLeftWidth || 0 : borders.borderLeftWidth;
			parentOffset = {
				top: parentOffset.top +borderTopWidth ,//NO I18n
				left: parentOffset.left + borderLeftWidth //NO I18n
			};
		}

		// Subtract parent offsets and element margins
		var margins = $(elem).css(["marginTop","marginLeft"]);
		var marginTop = parseFloat(margins.marginTop);
		marginTop = isFinite(marginTop) ? marginTop || 0 : margins.marginTop;
		var marginLeft = parseFloat(margins.marginLeft);
		marginLeft = isFinite(marginLeft) ? marginLeft || 0 : margins.marginLeft;
		
		return {
			top: offset.top - parentOffset.top - marginTop,//NO I18n
			left: offset.left - parentOffset.left - marginLeft//NO I18n
		};
	}
	
})(jQuery);

(function ($) {
	var empty = $.fn.empty;
    $.fn.empty = function() {
    		thirdPartyUtils.unbindChildEvents(this)
    		return empty.apply(this, arguments)
    };
})(jQuery);
(function ($) {
	var remove = $.fn.remove;
    $.fn.remove = function() {
    		thirdPartyUtils.unbindChildEvents(this)
    		return remove.apply(this, arguments)
    };
})(jQuery);
(function ($) {
    $.fn.filterByData = function (prop, val) {
        var $self = this;
        if (typeof val === 'undefined') 
        {
            return $self.filter(
					                function() 
					                {
					                	return typeof $(this).data(prop) !== 'undefined'; 	//NO I18n
					                }
					            );
        }
        return $self.filter(
					            function() 
					            {
					            	return $(this).data(prop) == val; 
					            }
					        );
    };

})(jQuery);

Utils.getTimestamp = function(){
	if(window.performance){
		return performance.now();
	}
	return +new Date();
}

Utils.getUtcDateObj = function(msec)
{
	var d = new Date(msec);
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    return new Date(utc);
}
/**
 * returns a date specific user-readable string
 * 
 * date date to be formatted
 * isTimeIncluded is a time specific result needed
 */
Utils.getDisplayDateTime = function(date, isTimeIncluded)
{
	var currentDate = new Date();

	if(currentDate.getFullYear() - date.getFullYear() == 0)
		{
			if(currentDate.getMonth() - date.getMonth() == 0)
				{			
					switch(currentDate.getDate() - date.getDate())
						{
						case 0 :{

							if(isTimeIncluded)
							{
								var millisecondDifference = currentDate.getTime() - date.getTime();
								var hourDiff = millisecondDifference / (60 * 60 * 1000);

								if(hourDiff < 1)
								{
									var minuteDiff = millisecondDifference / (60 * 1000);

									if(minuteDiff < 1)
									{
										return "Now";	 //NO I18N
									}
									else
									{
										return Math.floor(minuteDiff) +" mins ago"; //NO I18N
									}
								}
								else
								{
									return Math.floor(hourDiff)+" hrs ago";	 //NO I18N
								}
							}
							else
							{
								return "Today"; //NO I18N
							}
						}			

						case 1 :{
							return "Yesterday"; //No I18N
						}
						}
				}
		}
	
	var dateFormat = 'd M'; //No I18N
	
	if(date.getFullYear() != currentDate.getFullYear())		// show year when it is not the current year
	{
		dateFormat = 'd M yy' //No I18N
	}
	
	return $.datepicker.formatDate(dateFormat, date);
}

Utils.getDateTimeForEntity = function(dateTimeString)
{
	var givenDateObj = new Date(dateTimeString);
	var givenTimeInUTC = Utils.getUtcDateObj(givenDateObj.getTime());
	var currentTimeInUTC = Utils.getUtcDateObj(new Date().getTime());
	var userTimeFormat = Crm.userDetails.TIME_FORMAT;
	var dateFormatter;
	if(givenTimeInUTC.getDate() === currentTimeInUTC.getDate())
	{
		return Utils.getTimeInUserFormat(givenDateObj, true);
	}
	else if(givenTimeInUTC.getFullYear() === currentTimeInUTC.getFullYear())
	{
		dateFormatter = "d M"; //NO I18N
	}
	else
	{
		dateFormatter = "d M yy"; //NO I18N
	}
	return $.datepicker.formatDate(dateFormatter, givenDateObj);
}

Utils.getDateTimeForEntityHover = function(dateTimeString)
{
	var givenDateObj = new Date(dateTimeString);
	var userTimeFormat = Crm.userDetails.TIME_FORMAT;
	var locale = Crm.userDetails.LOCALE.split('_')[0];
	var date;
	if(locale !== "ja" && locale !== "zh")
	{
		date = $.datepicker.formatDate("D d M yy", givenDateObj); //NO I18N
	}
	else
	{
		date = crmCalendar.convertToUserDatePattern(dateTimeString);
	}
	return  date + " " + Utils.getTimeInUserFormat(givenDateObj, true);
}
Utils.convertDateToGivenPattern = function(formatPattern, dateInString){
	return $.datepicker.formatDate(formatPattern, new Date(dateInString));
}
Utils.getMonth = function(month)  {
	switch ( month + 1 ) {
	case 1:
		return 'January';//No I18N
	case 2:
		return 'February';//No I18N
	case 3:
		return 'March';//No I18N
	case 4:
		return 'April';//No I18N
	case 5:
		return 'May';//No I18N
	case 6:
		return 'June';//No I18N
	case 7:
		return 'July';//No I18N
	case 8:
		return 'August';//No I18N
	case 9:
		return 'September';//No I18N
	case 10:
		return 'October';//No I18N
	case 11:
		return 'November';//No I18N
	case 12:
		return 'December';//No I18N
	}
};

Utils.convertFrom8601DateFormat = function(date){
	var d = new Date(date);
	var userOffset = Utils.getTimezoneOffset();
	d.setMinutes( d.getMinutes() + userOffset );
	return d;
}

Utils.ISO8601toDateObject = function(dateVal){
	var modifiedTime=dateVal,arr=null,d=null,forMatedTime=null,newLong=null,processingTime;
	forMatedTime=modifiedTime.substring(modifiedTime.length-6);
	processingTime=modifiedTime.substring(0,modifiedTime.length-6);
	arr=forMatedTime.split(':');
	newHr=parseInt(arr[0].substring(1));
	sign=arr[0].substring(0,1);
	arr[1]=parseInt(arr[1]);

	/*if(sign=='+'){
		newLong=new Date(modifiedTime).getTime()+(((newHr+1)*60*60*1000)+(arr[1]*60*1000));
		d= new Date(newLong);
	}else{
		newLong=new Date(modifiedTime).getTime()-((newHr*60*60*1000)+(arr[1]*60*1000));
		d= new Date(newLong);
	}*/
	newLong=new Date(processingTime).getTime();
	d= new Date(newLong);
	//d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
	//var userOffset = Utils.getTimezoneOffset();
	//d.setMinutes( d.getMinutes() + userOffset );
	return d;
}

Utils.convertTimeStrToRequiredFormat = function(timeStr){
	var userTimeFrmt = Crm.userDetails.TIME_FORMAT ;
	var remindmin = "00"; //NO i18N
	var remindhour = "01"; //NO i18N
	var remindampm = "AM"; //NO i18N
	var days = null;
	var hr_min = null;
	if ("HH:mm" != userTimeFrmt) {
	    days = timeStr.split(" ");
	    hr_min = days[0].split(":");
	    remindmin = hr_min[1];
	    remindhour = hr_min[0];
	    remindampm = days[1];
	    if (!remindampm) {
	        hr_min = timeStr.split(":");
	        remindmin = hr_min[1];
	        var hrVal = parseInt(hr_min[0]);
	        if (hrVal >= 12) {
	        	var hour = (hrVal > 12) ? (hrVal - 12) : hrVal;
	            remindhour = "" + hour;
	            remindampm = "PM"; //No I18N
	        } else {
	            remindhour = hrVal + "";
	            remindampm = "AM"; //No I18N       
	        }
	    }
	    if (remindhour == "0" && remindampm == "AM") {
	        remindhour = "12";
	    }
	} else {
	    hr_min = timeStr.split(":");
	    remindhour = hr_min[0];
	    remindmin = hr_min[1];
	}
	if ("HH:mm" == userTimeFrmt && (remindmin.indexOf("PM") > 0 || remindmin.indexOf("AM") > 0)) {
	    if (remindmin.indexOf("PM") > 0 && parseInt(remindhour) != 12) {
	        remindhour = "" + (12 + parseInt(remindhour));
	    }
	    remindmin = remindmin.substring(0, remindmin.indexOf(' '));
	    if (remindhour == "12" && timeStr.indexOf("AM") > 0) {
	        remindhour = "00";
	    }
	}
	if (remindhour.length == 1) {
	    remindhour = "0" + remindhour;
	}
	var displayValue = remindhour + ":" + remindmin;
	displayValue += userTimeFrmt == "HH:mm" ? "" : " " + remindampm; //NO i18N
	return displayValue
}
//Overridding jQuery's stopPropagation() 
var tempJQr = $.Event.prototype.stopPropagation;
$.Event.prototype.stopPropagation = function(isOpenerNotNeeded) {  //eslint-disable-line @zoho/zohocrm/no-unused-vars
	var browserDetail;
	if(Crm && !Crm.isDevConsole){ //Temp Code for Lyte Issue Handling in Platform
		var browserMixin = Lyte.registeredMixins["crm-browser-version-check"]; //NO I18N
		browserDetail = (browserMixin &&browserMixin.getBrowserDetails()) || {};
	}
	if((this.currentTarget!=undefined||this.currentTarget!=null)&&(this.currentTarget.attributes!=undefined||this.currentTarget.attributes!=null)&&(this.currentTarget.attributes.isOpenerNotNeeded==undefined||this.currentTarget.attributes.isOpenerNotNeeded==false)&&
		    this.currentTarget.attributes.href!=undefined&&
		    (this.currentTarget.attributes.rel==undefined||this.currentTarget.attributes.rel=='')&&this.currentTarget.attributes.target!=undefined&&
		    this.currentTarget.attributes.target=="_blank"){
     if(browserDetail &&((browserDetail.name==="Chrome" && browserDetail.version>=49) || (browserDetail.name==="Firefox" && browserDetail.version>=52) || (browserDetail.name==="Safari" && browserDetail.version>=10) || (browserDetail.name==="OPR" && browserDetail.version>=36))){
            this.currentTarget.attributes.rel='noopener';
        } 
    }
 tempJQr.call(this);
}


//Overridding native's stopPropagation() 
var tempNativ = Event.prototype.stopPropagation;
Event.prototype.stopPropagation = function(isOpenerNotNeeded){ //eslint-disable-line @zoho/zohocrm/no-unused-vars
	var browserDetail;
	if(Crm && !Crm.isDevConsole){ //Temp Code for Lyte Issue Handling in Platform
		var browserMixin = Lyte.registeredMixins["crm-browser-version-check"]; //NO I18N
		browserDetail = (browserMixin && browserMixin.getBrowserDetails() ) || {};
	}
	if((this.currentTarget!=undefined||this.currentTarget!=null)&&(this.currentTarget.attributes!=undefined||this.currentTarget.attributes!=null)&&(this.currentTarget.attributes.isOpenerNotNeeded==undefined||this.currentTarget.attributes.isOpenerNotNeeded==false)&&
    this.currentTarget.attributes.href!=undefined&&
    (this.currentTarget.attributes.rel==undefined||this.currentTarget.attributes.rel=='')&&this.currentTarget.attributes.target!=undefined&&
    this.currentTarget.attributes.target=="_blank"){
		if(browserDetail && ((browserDetail.name==="Chrome" && browserDetail.version>=49) || (browserDetail.name==="Firefox" && browserDetail.version>=52) || (browserDetail.name==="Safari" && browserDetail.version>=10) || (browserDetail.name==="OPR" && browserDetail.version>=36))){
            this.currentTarget.attributes.rel='noopener';
        } 
    }
	//passed this to call function
	tempNativ.call(this);
}


Utils.getCurrentDomain = function()
{
	return window.location.protocol + "//" + window.location.host;
};

Utils.getCustomisedSingularLabel = function(module)
{
	var modInfo = Crm.moduleInfo;
	var moduleName = module === "Deals" ? "Potentials" : module; //No i18N
	if(!modInfo[moduleName]) {
		return module;
	}
	//return modInfo[moduleName].isCustomized ? modInfo[moduleName].singularLabel : I18n.getMsg( modInfo[moduleName].singularLabel );
	return modInfo[moduleName].translatedSingularLabel;
};

Utils.getQueryParamsFromUrl = function(url) {
	var urlQueryParams = {};
	if (url) {
		var strQueryParams = url.split('?')[1];
		if (typeof strQueryParams === "string") {
			urlQueryParams = Utils.convertStrQueryparamsToJSON(strQueryParams);
		}
	}
	return urlQueryParams;
}

Utils.convertStrQueryparamsToJSON = function(strQueryParams) {
	var queryParams = {};
	try {
		strQueryParams.split('&').forEach(function(queryParam) {
			queryParam = queryParam.split('=');
			if (queryParam.length === 2) {
				queryParams[queryParam[0]] = queryParam[1];
			}
		});
	} catch (e) {
		// suppress error
	}
	return queryParams;
}

//This method is used to fetch specific row from an array by matching key and value passed to the function
Utils.getMatchedRow = function(arr, key, value) {
	if (Array.isArray(arr)) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if (arr[i][key] == value) {
				return arr[i];
			}
		}
	}
}

/**
 * This method will inverse keys and values of a JSON object
 * json = {
 * 	key1: value1,
 *  key2: value2
 * }
 *
 * resp = {
 * 	value1: key1,
 *  value2: key2
 * }
 */
Utils.inverseKeyValues = function(json) {
	var resp = {};
	for (var key in json) {
		resp[json[key]] = key;
	}
	return resp;
}

Utils.removeDuplicates = function(arr) {
	var resp = {};
	arr.forEach(function(val) {
		resp[val] = true;
	})
	return Object.keys(resp);
}



//This method is used update object's given value for given keys
Utils.updateObject = function(object, keys, value) {
	keys.forEach(function(key) {
		object[key] = value;
	});
}
//This method is used to delete given keys from the JSON object
Utils.removeKeysFromGivenObj = function(object, keys) {
	keys.forEach(function(key) {
		if(object.hasOwnProperty(key)) {
			delete object[key];
		}
	})
}


Utils.convertTimeValueTo24HourFormat = function(Time){
	var split1 = Time.split(":");
	var hour = split1[0].trim();
	var split2 = split1[1].split(' ');
	var min = split2[0].trim();
	if(split2[1] != undefined && (split2[1].toUpperCase() == I18n.getMsg('AM').toUpperCase() || split2[1].toUpperCase() == "AM")  && hour == "12"){
		hour = "0"  
	}
	if(split2[1] != undefined && (split2[1].toUpperCase() == I18n.getMsg('PM').toUpperCase() || split2[1].toUpperCase() == "PM") && Number(hour) < 12){
		hour = Number(hour) + 12;
	}
	if(Number(hour)<10 && (hour.toString()).length<2)
	{
		hour="0"+hour;
	}
	return hour + ":" + min;
}
	
Utils.getTimefromMillisecs = function(val, isPathFinder){
	if(val != undefined){
		var dateProp = Utils.getMillisecondsToBasicDateProperties(val, true);
			var result = "";
			if(dateProp.days){
				result += getReadableString(dateProp.days,"day");//No I18N
			}
			if(dateProp.hours){
				result += getReadableString(dateProp.hours,"hour");//No I18N
			}
			if(!((dateProp.days || dateProp.hours) && dateProp.mins == 0)){
				if(isPathFinder) {
					if(dateProp.mins) {
						result += getReadableString(dateProp.mins,"minute");//No I18N
					}
					result += getReadableString(dateProp.secs,"second");//No I18N
				}else {
					result += getReadableString(dateProp.mins,"minute");//No I18N
				}
			}
			return result.trim();
			
			function getReadableString(curval,unit){
				unit = I18n.getMsg(curval > 1 ? unit + 's' : unit); //No I18N
				return curval + " " + unit + " ";	
			}
	}
};

Utils.windowLocationReload = function(forceGet)
{
	var url = window.location.href;
	if(url.indexOf("frameorigin") === -1)
	{
		var frameOriginUpdatedURL = Utils.getUpdatedFrameOriginURL(url);
		if(frameOriginUpdatedURL !== url)
		{
			history.replaceState(history.state,'',frameOriginUpdatedURL);
		}
	}
	
	window.location.reload(forceGet);
}
Utils.windowLocationHref = function(url)
{
	window.location.href = Utils.getUpdatedFrameOriginURL(url);
}
Utils.getUpdatedFrameOriginURL = function(url)
{
	if(url.indexOf("frameorigin") === -1 && typeof CrmPlusLib !== "undefined" && CrmPlusLib.isLoadedInCrmplusFrame && CrmPlusLib.getFrameOriginForURL)
	{
		var frameOriginURL = CrmPlusLib.getFrameOriginForURL();
		if(frameOriginURL)
		{
			url += url.indexOf('?') === -1 ? "?" : "&";
			url += "frameorigin=" + frameOriginURL;//No i18n
		}
	}
	return url;
}
/*
 * 
 * Removed in perf audit
Utils.disableLyteViewPort = function(){
	//eslint-disable-next-line @zoho/webperf/no-global-variables
	isLyteViewPortEnabled = false;
}
*/
