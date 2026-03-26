Lyte.Mixin.register("crux-element-validation", {//No I18n
	/**
	 * isValidDate is called to validate a date value. internally uses $L.moment
	 * @author anuja.manoharan
	 * @version 1.0.0
	 * @returns true or false
	 * @params dateVal - the date valie
	 * @params datepat - the pattern of the data value
	 */
	isValidDate : function(dateVal, datepat){
		if(!dateVal){
			return false;
		}
		datepat = datepat ? datepat : this.getData("cxPropDatePattern");//no i18n
		//pattern changed to uppercase as day(01,02,..), month(01,02..) and year are represented as tokens DD, MM and YYYY in moment
		//lowercase 'dd' and 'mm' represents day of week('Su','Mo'..) and minutes respectivetly
		datepat = datepat.toUpperCase();
		datepat = datepat.replace(/'/g,'');
		dateVal = dateVal.replace(/'/g,'');
		if(this.data.cxPropMinDate || this.data.cxPropMaxDate){
			var inputDate = $L.moment(dateVal, datepat).getDObj();
			var minDate, maxDate;
			var invalidDateError = false;
			if(this.data.cxPropMinDate){
				minDate = $L.moment(this.data.cxPropMinDate, datepat).getDObj();
				if(inputDate && minDate && inputDate<minDate){
					invalidDateError = true;
				}
			}
			if(this.data.cxPropMaxDate){
				maxDate = $L.moment(this.data.cxPropMaxDate, datepat).getDObj();
				if(inputDate && maxDate && inputDate>maxDate){
					invalidDateError = true;
				}
			}

			if(invalidDateError){
				return false;
			}
		}
		try{
			return $L.moment(dateVal, datepat, {i18n : true}).validate();
		}
		catch(e){
			return false;
		}
	},
	isEmoji : function(str) {
	    var regex= /([\uD800-\uDBFF][\uDC00-\uDFFF])/i;
	    if(regex.test(str)) {
	        return true;
	    }else{
	        return false;
	    }
	},
	SplitWord : function(str){
		str = str.split(",")
		var res=[],temp
		var ind;
		for(var i=0;i<str.length;i++){
			ind = str[i].indexOf("\\");
			if(ind!=-1 && str[i].length-2 == ind){
				temp = str[i].slice(0,str[i].length-2) + ","+str[i+1]
			 	Lyte.arrayUtils(res, "push", temp);//No I18n
				i = i+1;
			}else if(str[i] != ""){
				Lyte.arrayUtils(res, "push", str[i]);//No I18n
			}
		}
		return res.length == 1 ? res[0] : res;;
	},
	/**
	 * @author anuja.manoharan
	 * Used to validate a date from input value
	 * @params currObj - input element
	 * returns true or false
	 * Called from criteria editor or smart filter, as it will throw an alert if error
	 */
	dateValidate : function(currObj , value=""){
		if (!value && currObj){
			value = currObj.value;
		}
		var ret = this.isValidDate(value.trim(), this.getData("cxPropDatePattern"));//no i18n
		if(!ret){
			var field = this.getData("cxPropField");//no i18n
			var fldLabel = field.errorFieldLabel ? field.errorFieldLabel : field.field_label;//No I18n
			var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
			var alertMsg = _cruxUtils.getI18n("crm.field.valid.check",Lyte.Component.registeredHelpers.cruxEncodeHTML(replacedFldLabel)); //No I18N
    		this.showAlert(alertMsg,currObj);
			if (currObj){
				currObj.setAttribute("autocomplete","off");
			}
		}
		return ret;
	},
	/**
	 * @author anuja.manoharan
	 * used to validate a date using date pattern
	 * @params currObj - used to get value from element
	 */
	patternValidate : function(currObj){
		if(!this.isValidDate(currObj.value, this.getData("cxPropDatePattern")) && this.$node.querySelector("lyte-input").calendarDiv){
			/**
			 * If date is invalid, then calendar is reverted to current date
			 */
			this.$node.querySelector("lyte-input").calendarDiv.querySelector("lyte-calendar").revertToToday();//No I18n
		}
	},
	showAlertMsg : function(alertMsg){
		var comp = this;
		_cruxUtils.showCustomAlert({ 
			params : { 
			cxPropYield : true,
			cxPropHeading : alertMsg, 
			cxPropButtonPosition : 'center',
			// cxPropContentAlign : "center",
			cxPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary", "cxPropZcqa":"button_primary"}],
			id : "cruxElementAlert"
			},
			close : function(){
				if(comp && comp.$node.querySelector("lyte-input")){
					comp.$node.querySelector("lyte-input").focus();//No I18n
				}else if(comp && comp.$node.querySelector("lyte-number")){//no i18n
					comp.$node.querySelector("lyte-number").focus();//No I18n
				}
			}.bind(this)})	


		// var ele = document.getElementById("cruxElementAlert");
		// if(!ele){
		// 	ele = Lyte.Component.render("lyte-alert", {id : "cruxElementAlert", ltPropShowCloseButton : false, ltPropButtonPosition : "center",
		// 		ltPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}], ltPropContentAlign : "center"}, "body");//No I18n
			
		
		// 	}
		// var span = document.createElement("span");
		// span.innerHTML = alertMsg;
		// ele.ltProp({"secondaryMessage" : span.innerText,top : '0px'});//No I18n
		// ele.ltProp("show", true);//No I18n
		
		// ele.setMethods({onClose : function(){
		// 	if(comp && comp.$node.querySelector("lyte-input")){
		// 		comp.$node.querySelector("lyte-input").focus();//No I18n
		// 	}else if(comp && comp.$node.querySelector("lyte-number")){//no i18n
		// 		comp.$node.querySelector("lyte-number").focus();//No I18n
		// 	}
		// }.bind(this)})
	},
	showAlert : function(alertMsg,currObj){
		if(this.getMethods("onError")){
			var check = false;
			check = this.executeMethod("onError", alertMsg , this);//No I18n
			if( !check ){
				return false;
			}
		}
		if(currObj){
			currObj.focus();
		}
		this.showAlertMsg(alertMsg)
	},
	showMsgBox : function(alertMsg,type,properties){
		if(this.getMethods("onError")){
			var check = false;
			check = this.executeMethod("onError", alertMsg , this);//No I18n
			if( !check ){
				return false;
			}
		}
		var ele = document.getElementById("lyteMsgBox");
        if( !properties ){
                properties = {};
        }
        properties.ltPropType = type;
        properties.ltPropMessage = alertMsg;
        properties.id = "lyteMsgBox";
        if(ele){
        	ele.ltProp("show", false);//No I18n
        }
        ele = Lyte.Component.render("lyte-messagebox", properties, "body");//No I18n
        ele.setMethods( 'onClose', function(arg){ //no i18n
                document.body.removeChild( arg.$node );
        })
//      ele.ltProp({"message" : alertMsg,"type" : type});//No I18n
        ele.ltProp("show", true);//No I18n
	},
	// splitDateVal : function(dateval, userDateFormatTemp){
	// 	userDateFormatTemp = userDateFormatTemp ? userDateFormatTemp.toLowerCase() : this.getData("cxPropDatePattern").toLowerCase();//No I18n
	// 	userDateFormatTemp = userDateFormatTemp.replace(/'/g,'');
	// 	var year = userDateFormatTemp.indexOf("yyyy");
	// 	var dateelements = new Array(3);
	// 	dateelements[2] = dateval.substring(year, year+4);
	// 	var month = userDateFormatTemp.indexOf("mm");
	// 	dateelements[1] = dateval.substring(month, month+2);
	// 	var date = userDateFormatTemp.indexOf("dd");
	// 	dateelements[0] = dateval.substring(date, date+2);
	// 	return dateelements;
	// },
	/**
	 * @author anuja.manoharan
	 * Used to convert date to user format
	 * @params newDate - Date
	 * @params userPattern - string
	 * @params validate - boolean
	 * @params i18n - boolean - date will be translated only if this property is true
	 * @returns date in user format
	 */
	getDateInUserDatePattern : function(newDate, userPattern, validate, i18n){
		userPattern = userPattern ? userPattern : this.getData("cxPropDatePattern");//no i18n
		userPattern = userPattern.toUpperCase();
		var pattern;
		if(validate != true){
			pattern = validate;
		}
		var dateMom = $L.moment(newDate, pattern);
		var dateValidate = dateMom.validate();
		return dateValidate || validate == true ? i18n ? dateMom.i18N(userPattern) : dateMom.format(userPattern) : newDate;
	},
	/**
	 * @author anuja.manoharan
	 * Used to convert time in date format to user format
	 * @params dateObj - Date
	 * @params timeFormat - string - 12 or 24
	 * @returns string
	 * If hour is single digit, then 0 is prepended.
	 */
	getTimeInUserFormat : function(dateObj, timeFormat) {//No I18n
		var hr = dateObj.getHours();//No I18n
		var min = (dateObj.getMinutes()<10)?("0"+dateObj.getMinutes()):dateObj.getMinutes();//No I18n
		var ret = "";
		timeFormat = timeFormat ? timeFormat : this.getData("cxPropTimeFormatInput");//no i18n
		if ( timeFormat == "12") {  //No I18n
			var mer = "PM";//No I18n
			if(hr > 12){
				hr = hr-12;
				if(hr < 10){
					ret = "0"+hr;
				}
				else{
					ret = hr;
				}
				// ret = (hr-12);
			}
			else if(hr == 0){
				ret = "12";//No I18n
				mer = "AM";//No I18n
			}
			else{
				ret = hr;
				if(hr<10){
					ret = "0"+ret;//No I18n
				}
				if(hr != 12){
					mer = "AM";					//No I18n
				}
			}
			ret+=":"+min+" "+_cruxUtils.getI18n(mer);
		}
		else{
			if(hr<10 && hr.toString().length < 2){
				hr = "0"+hr;//No I18n
			}
			ret = hr+":"+min;
		}
		return ret;
	},
	/**
	 * @author anuja.manoharan
	 * To get date object from given date string
	 * @params dateval - string
	 * @params time - string
	 * @params datePattern - string
	 * @returns date object
	 */
	getDateObject : function(dateval,time, datePattern){
        datePattern = datePattern ? datePattern.toUpperCase() : this.getData("cxPropDatePattern").toUpperCase();//No I18n
		datePattern = datePattern.replace(/'/g,'');
        var dateObj = $L.moment(dateval,datePattern, {i18n : true}).getDObj();
		if(!dateObj){
			return "";
		}
		if(time){
        	var timeSplit = time.match(/(\d{1,2}):(\d{1,2})/)
        	time = time.replace(_cruxUtils.getI18n('AM'),'AM').replace(_cruxUtils.getI18n('PM'),'PM')
        	var meridium = time.match(/([A,P]M)/)
        	time = time.split(":");
        	if(meridium){
	        	var timeConv = this.convertTimeTo24HoursFormat(parseInt(timeSplit[0]),meridium[1])
		        dateObj.setHours(timeConv);
        	}
        	else{
        		dateObj.setHours(time[0]);
        	}
			if(time[1]){
				dateObj.setMinutes(time[1].split(" ")[0]);
			}
        }
        return dateObj;
    },
	/**
	 * @author anuja.manoharan
	 * Used to convert a given hour value to 24 hours. If hours is single digit, then 0 is prepended to the same.
	 * @params hrs - string
	 * @params merdiem
	 * @returns string
	 */
    convertTimeTo24HoursFormat : function(hrs,meridiem){
        meridiem = meridiem.toLowerCase();
        if(meridiem == "am"){  //No I18N
                return (hrs == 0)?12:(hrs == 12)?0:hrs;
        }else if(meridiem == "pm"){//No I18N
        		return (hrs == 12)?hrs:hrs+12;
        }else if(meridiem == _cruxUtils.getI18n("AM") || _cruxUtils.getI18n("am") == meridiem ){//No I18N
        	 return (hrs == 0)?12:(hrs == 12)?0:hrs;
        }else if(meridiem == _cruxUtils.getI18n("PM") || _cruxUtils.getI18n("pm") == meridiem ){//No I18N
        	 return(hrs == 12)?hrs:hrs+12;
        }
    },
	/**
	 * @author anuja.manoharan
	 * Used to validate an integer field value
	 * @params val - string
	 * @returns boolean
	 */
	isValidInteger : function(val){//No I18N
		if(val == "") { return true; }
		var re=/^-?\d+(,(\d)+)*$/
		if (isNaN(val) || val.indexOf(".")!=-1 || !re.test(val)) {
			return false;
		}
		return true;
    },
	/**
	 * @author anuja.manoharan
	 * Used to validate a given decimal field value
	 * @params val - string
	 * @returns boolean
	 */
    isValidDecimal: function(val){//No I18N
		if(val == "") { return true; }
		var reg = /^-?(\d+)?(\.){0,1}(\d+)*$/;
        var valArr = reg.exec(val);
        if(!valArr){
        	return false;
        }
        if(valArr[1]==undefined && valArr[3] == undefined){
        	return false;
        }
        return true;
    },
	/**
	 * @author anuja.manoharan
	 * Used to validate a decimal value for its decimal length
	 * @params val - string
	 * @params fieldProp - object - the decimal_place is read from this
	 * @returns boolean
	 */
    decimalLengthCheck : function(val, fieldProp){//no i18n
    	if(val == "") { return true; }
    	var reg = /^-?(\d+)?(\.){0,1}(\d+)*$/;
        var valArr = reg.exec(val);
        if(!valArr){return false;}
        var decimalVal = valArr[3];
        fieldProp = fieldProp ? fieldProp : this.getData("cxPropField");//No I18n
    	if(decimalVal&&decimalVal.length>fieldProp.decimal_place){
    		return false;
    	}
    	return true;
    },
	/**
	 * @author anuja.manoharan
	 * Used to convert a given number string to a currency value, i.e. perform currency based formatting, prepending currency symbol and appending home currency if applicable
	 * @params isoCode - string - the currency code in which the record is.
	 * @params value - string
	 * @params decimal_base - number
	 * @params currencyDetails - object
	 * @params currencyCode - string - the default currency code of the user
	 * @params exchangeRate - number
	 * @params exchangeRateFinance - number
	 * @params homeCurrency - calculated based on the value and its exchangeRate. This is sent from the server for formatting issues.
	 * @params displayCurrency - boolean
	 * @params formattedCurrency - the final value is also sent from the server due to formatting issues.
	 * @params defaultOrgCurrency
	 */
    convertCurrencyValue : function(isoCode,value, decimal_base, currencyDetails, currencyCode, exchangeRate, exchangeRateFinance, homeCurrency, displayCurrency, formattedCurrency,defaultOrgCurrency,roundingOption,precision){//no i18n
		if(typeof Crm != "undefined" && typeof currencyUtils != "undefined" && currencyUtils.returnValueInDefaultCurrency){
			return currencyUtils.returnValueInDefaultCurrency(isoCode, value, decimal_base, exchangeRate,undefined,precision,(displayCurrency || displayCurrency==false)?displayCurrency:this.data.cxPropDisplayCurrency,roundingOption ? currencyUtils.ROUNDINGOPTION[roundingOption.toUpperCase()]:undefined);
		}
		var indianCurrencies = ['INR','BDT','MMK','PKR'];
		displayCurrency = displayCurrency == false ? false : true;
		if(!isoCode && typeof Crm != "undefined" && !Crm.userDetails.IS_MULTI_CURRENCY_ENABLED && this.data && indianCurrencies.indexOf(currencyCode?currencyCode:this.data.cxPropDefaultCurrencyIsoCode) > -1)		   {
			var locale = Crm.userDetails.DECIMAL_SEPARATOR.replace('_','-');
			defaultOrgCurrency = defaultOrgCurrency ? defaultOrgCurrency : this.getData('cxPropDefaultOrgCurrency');
			return (displayCurrency ? defaultOrgCurrency + " " : "" )+currencyUtils.formatCurrencyValue(parseFloat(value),locale, undefined, undefined, decimal_base);
		}
		var retString = formattedCurrency != undefined ? parseFloat(value) : this.getNumberWithCommas(parseFloat(value),",",".");//No I18n
		decimal_base = (decimal_base || decimal_base==0) ? decimal_base : this.getData("cxPropDefaultRoundOff");//No I18n
		var floatvalue = parseFloat(value);
		var len = (parseInt(floatvalue+"")+"").length;
		currencyDetails  = currencyDetails ? currencyDetails : this.getData("cxPropCurrencyDetails");//No I18n
		currencyCode = currencyCode ? currencyCode : this.getData("cxPropCurrencyCode");//No I18n
		var homeVal  = value;
		var roundOff = Crm.userDetails.defaultRoundOff?Crm.userDetails.defaultRoundOff:2;
		
		if(formattedCurrency !== undefined){
			homeVal = formattedCurrency;
		}
		else{
			var valLen = (value+'').length;
			var decimalLen = valLen==len?0:valLen-len-1; //-1 added for removing decimal separator
			if(decimalLen>decimal_base || (decimalLen<roundOff && decimalLen<decimal_base)){
			var fixed = (decimalLen>decimal_base)?decimal_base : roundOff;
			homeVal = Number(parseFloat(value)).toFixed(fixed);	
			}
		}
		if(currencyDetails[currencyCode]&&isoCode){
			decimal_base = parseInt(currencyDetails[currencyCode].decimals);//No I18n
			var decimal_curr = parseInt(currencyDetails[isoCode].decimals);
			// exchangeRate = exchangeRate ? exchangeRate : currencyDetails[isoCode].er;
			var calcVal;
			if(exchangeRateFinance){
				calcVal = value*exchangeRateFinance;
			}
			else if(exchangeRate){
				calcVal = value/parseFloat(exchangeRate)+"";
			}
			else{
				calcVal = value/parseFloat(currencyDetails[isoCode].er) + "";//No I18n
			}
			var defSep = currencyDetails[isoCode].format.split("|");//No I18n
			var refSep = currencyDetails[currencyCode].format.split("|"); //refSep[0] for thousands separator refSep[1] for decimal separator
			var defVal;
			if(typeof Crm != "undefined" && indianCurrencies.indexOf(isoCode) > -1){
				defVal=currencyUtils.formatCurrencyValue(value,'en-IN', defSep[0], defSep[1], currencyDetails[isoCode].decimals);
				// if(homeCurrency){
					// _homeVal = currencyUtils.formatCurrencyValue(homeCurrency, 'en-IN');
				// }
			}
			else{
				defVal = formattedCurrency != undefined ? formattedCurrency : this.getNumberWithCommas(parseFloat(value).toFixed(decimal_curr),defSep[0],defSep[1]);
				// if(homeCurrency){
				// 	_homeVal = this.getNumberWithCommas(homeCurrency,refSep[0],refSep[1]);
				// }
			}
			retString = displayCurrency ? currencyDetails[isoCode].symbol+" " : "";
			if(isoCode == currencyCode || defVal == 0){
				retString += defVal;//No I18n
			}else if(homeCurrency){
				if(typeof Crm != "undefined" && indianCurrencies.indexOf(currencyCode) > -1){
					retString = retString+(defVal)+" ("+currencyDetails[currencyCode].symbol+" "+currencyUtils.formatCurrencyValue(homeCurrency, 'en-IN', refSep[0], refSep[1], currencyDetails[currencyCode].decimals)+")";//No I18n
				}
				else{
					retString = retString+(defVal)+" ("+currencyDetails[currencyCode].symbol+" "+this.getNumberWithCommas(homeCurrency,refSep[0],refSep[1])+")";//No I18n					
				}
			}else{
				if(typeof Crm != "undefined" && indianCurrencies.indexOf(currencyCode) > -1){
					retString = retString+(defVal)+" ("+currencyDetails[currencyCode].symbol+" "+currencyUtils.formatCurrencyValue(calcVal,'en-IN', refSep[0], refSep[1], currencyDetails[currencyCode].decimals)+")";
				}
				else{
					var homeVal1 =  parseFloat(calcVal).toPrecision((parseInt(calcVal)+"").length+decimal_base);
					retString = retString+(defVal)+" ("+currencyDetails[currencyCode].symbol+" "+this.getNumberWithCommas(parseFloat(homeVal1).toFixed(decimal_base),refSep[0],refSep[1])+")";//No I18n					
				}
			}
		}else if(defaultOrgCurrency){//No I18n
			var defSep = defaultOrgCurrency && typeof defaultOrgCurrency == "object" && defaultOrgCurrency.format ? defaultOrgCurrency.format.split("|") : [',','.'];//No I18n
			retString = displayCurrency ? defaultOrgCurrency+" " : "";//No I18n
			retString = retString+this.getNumberWithCommas(homeVal, defSep[0], defSep[1], formattedCurrency != undefined);
		}else if(currencyDetails && currencyCode && currencyDetails[currencyCode]){//No I18n
			var defSep = currencyDetails[currencyCode].format.split("|"); //refSep[0] for thousands separator refSep[1] for decimal separator
			retString = displayCurrency ? currencyDetails[currencyCode].symbol+" " : "";
			retString = retString+this.getNumberWithCommas(homeVal, defSep[0], defSep[1], formattedCurrency != undefined);
		}
		return retString;
	},
	getNumberWithCommas : function(number,k_sep,dec_sep, formattedCurrency) {//no i18n
		if(formattedCurrency){
			return number.toString();
		}
		k_sep = (k_sep)?k_sep:",";
		dec_sep =(dec_sep)?dec_sep:".";
	    var parts = number.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, k_sep);
	    return parts.join(dec_sep);
	},
	/**
	 * @author anuja.manoharan
	 * validates a phone field value
	 * @params fldValue - string
	 * @params len - number - the maxlength of the field
	 * @returns boolean
	 */
	isValidPhoneNo : function(fldValue, len){
		var re= /^([\+]?)(?![\.-])((?=([\.\/-]?[ ]?[\da-zA-Z]+))\3+|([ ]?\((?![\.-])(?=[ \.-]?[\da-zA-Z]+)([ \.-]?[\da-zA-Z]+)+\)(?!\.)([ -][\da-zA-Z]+)?)+)+((([,]+)?[;]?([\*#]+)?[\da-zA-Z]+)+)?[#;]?$/;
		fldValue = fldValue.replace(/[\u202d]/g, "");
		fldValue = fldValue.replace(/[\u202c]/g, "");
		fldValue = fldValue.replace(/[,](?!.)/, "");
		fldValue = fldValue.replace(/\s{2,}/g, " "); 
		fldValue = fldValue.replace(/\s-/g, "-"); 
		fldValue = fldValue.replace(/-\s/g, "-"); 
		fldValue = fldValue.replace(/\s[.]/g, "[.]"); 
		fldValue = fldValue.replace(/\s;/g, ";"); 
		fldValue = fldValue.replace(/;\s/g, ";"); 
		fldValue = fldValue.replace(/\s,/g, ","); 
		fldValue = fldValue.replace(/,\s/g, ","); 
		fldValue = fldValue.replace(/\s#/g, "#"); 
		fldValue = fldValue.replace(/#\s/g, "#"); 
		fldValue = fldValue.replace(/\(\s/g, "("); 
		fldValue = fldValue.replace(/\s\)/g, ")"); 
		fldValue = fldValue.replace(/\u202F/g, " ");
       	var tempVal = fldValue;
       	tempVal=tempVal.replace(/\)(?![\s;,\-\/])/g, ") ");
       	var len=tempVal.length;
       	if(tempVal == ""){
        		return false;
        }
       	var tempfldVal=tempVal[0];
       	for(var i=1;i<len;i++)
       	{
       	  	if(tempVal[i]=="(" && tempVal[i-1]!=" ")
       	  	{
       	  	   	tempfldVal=tempfldVal+" "+tempVal[i];
       	  	}
        	else
          	{
       	  		tempfldVal=tempfldVal+tempVal[i];
       	  	}
       	}
       	tempfldVal=tempfldVal.replace(/^\s+/,"");
       	tempfldVal=tempfldVal.replace(/\s+$/,"");
        fldValue=tempfldVal;
        if(re.test(fldValue))
       	{
			var isValid = true;
			if(this.data && this.data.cxPropEnableCountryCode){
				if(fldValue.startsWith('+')){
					try{
						isValid = ZlibPhoneNumber.isValidNumber(fldValue);
					}catch(e){
						isValid = false;
						murphy.error(e);
					}
				}else{
					var phNoNumberAlone = fldValue.replace(/[^0-9A-Za-z]/g,'');
					isValid = phNoNumberAlone.length <= 12 && phNoNumberAlone.length >= 1;
				}
			}
			return isValid;
        }
        return false;
	},
	/**
	 * @author anuja.manoharan
	 * Used to validate a twitter field value
	 * @params twitterId - string
	 * @returns boolean
	 */
	isValidTwitter : function(twitterId){//no i18n
    	if(twitterId==""){
    		return true;
    	}
    	if(twitterId.trim().length<=50 && twitterId.trim().length>0){
            var twNamePattern=/^[a-zA-Z0-9_]*$/;
            return twNamePattern.test(twitterId);
        }
        return false;
    },
	/**
	 * @author anuja.manoharan
	 * used to validate a webiste field value
	 * @params url - string
	 * @returns - boolean
	 */
    isValidWebUrl : function(url){//No I18N
		if(url == "") { return true; }
        var httpProtocol = "http"; //No I18N
        var httpsProtocol = "https"; //No I18N
	var urlregex = new RegExp("^("+httpProtocol+":\\/\\/www.|"+httpsProtocol+":\\/\\/www.|ftp:\\/\\/www.|www.|"+httpProtocol+":\\/\\/|"+httpsProtocol+":\\/\\/|ftp:\\/\\/|){1}[^\x00-\x19\x22-\x27\x2A-\x2C\x2E-\x2F\x3A-\x3F\x5B-\x5E\x60\x7B\x7D-\x7F\x20]+(\\.[^\x00-\x19\x22\x24-\x2C\x2E-\x2F\x3C\x3E\x40\x5B-\x5E\x60\x7B\x7D-\x7F\x20]+)+([/?].*)*$");
        return urlregex.test(url);
    },
	/**
	 * @author anuja.manoharan
	 * used to format a number field based on its currency and decimal properties
	 * @params value - string
	 * @params type - string - which is data_type
	 * @params isoCode - string
	 * @params uitype - number
	 * @params currencyDetails - object
	 * @params decimal_base - number
	 * @params currencyCode - string
	 * @params exchangeRate - number
	 * @params exchangeRateFinance - number
	 * @params homeCurrency - string
	 * @params displayCurrency - boolean
	 * @params formmatedCurrency - string
	 * @params separator
	 * @params defaultOrgCurrency - string
	 * @returns string
	 */
    getNumberValueForView : function(value, type, isoCode, uitype, currencyDetails, decimal_base, currencyCode, exchangeRate, exchangeRateFinance, homeCurrency, displayCurrency, formattedCurrency, separator,defaultOrgCurrency,roundingOption,precision){
    	if(type == "currency" || uitype == 39 || uitype == 36 || uitype == 77 || uitype == 143 || uitype == 144 || uitype == 145){
    		currencyDetails = currencyDetails ? currencyDetails : this.getData("cxPropCurrencyDetails");//No I18n
    		if(isoCode && currencyDetails){
    			for(var key in currencyDetails){
    				if(currencyDetails[key].symbol == isoCode){
    					isoCode = key;
    					break;
    				}
    			}
    		}
    		else{
    			isoCode = undefined;
    		}
    		value = this.convertCurrencyValue(isoCode, value, decimal_base, currencyDetails, currencyCode, exchangeRate, exchangeRateFinance, homeCurrency, displayCurrency, formattedCurrency,defaultOrgCurrency,roundingOption,precision);
			return value;
    	}
    	else if(uitype === 40 && value && value.indexOf("e") > -1){
    		value = parseFloat(value).toFixed(9);
    	}
		/**
		 * if value is of type decimal yet does not have any decimal point, this will add one
		 */
    	else if(uitype !=38 && uitype != 34 && uitype != 40 && type == "double" && value % 1 == 0){
    		value = value/1+".0";
    	}
    	if(separator && typeof Search != "undefined" && Search.formatNumber){
    	    return Search.formatNumber(value);
    	}
    	return value.toString();
    },
	/**
	 * @author anuja.manoharan
	 * validates a given number
	 * @params val - string
	 * @params field -object
	 * @params maxLength - number
	 * @params maxvalue - number
	 * @params minvalue - number
	 * @returns boolean
	 */
    validateNumberField : function(val, field, maxLength, maxvalue, minvalue){
		/**
		 * if value is empty and field is mandatory, false is returned
		 */
    	if(!val || val.trim() == ""){
    		return this.validateMandatory(true);
		}
		if(!this.validateMaskField()){
			return true;
		}
		/**
		 * if value's length is greater than maxLength then false is returned
		 */
		var nV = val.match(new RegExp(/\d/g)) ? val.match(new RegExp(/\d/g)) : "";
		var valueLen = nV.length;
		if(maxLength && valueLen > maxLength){
			 if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR04, this);//No I18n
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.length.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			return false;
		}
		/**
		 * if value is greater than maxvalue then false is returned
		 */
		if(typeof maxvalue!=='undefined' && maxvalue!==null && val > maxvalue){
			if(this.getMethods("onError")){
				if(this.data.cxPropField.range){
					this.executeMethod("onError", this.errorCodes.ERR05, this);
				}else{
					this.executeMethod("onError", this.errorCodes.ERR02, this);
				}
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.custom.field.less.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label), maxvalue));				
			}
			return false;
		}
		/**
		 * if value is less than minvalue then false is returned
		 */
		if(typeof minvalue!=='undefined' && minvalue!==null && val < minvalue){
			if(this.getMethods("onError")){
				if(this.data.cxPropField.range){
					this.executeMethod("onError", this.errorCodes.ERR06, this);
				}else{
					this.executeMethod("onError", this.errorCodes.ERR02, this);
				}
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crux.custom.field.greater.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label), minvalue));				
			}
			return false;
		}
		if(field.data_type == "integer" || field.data_type == "bigint"){
			var check = this.isValidInteger(val);
			if(!check){
				if(this.getMethods("onError")){
					this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
				}
				else{
					this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				}
			}
			return check;
		}
		else{
			var check = this.isValidDecimal(val);
			if(check){
				// var decimals = (this.data.cxPropCurrencyCode && typeof Crm != "undefined" && Crm.userDetails.IS_MULTI_CURRENCY_ENABLED) ? Crm.userDetails.CURRENCY_DETAILS[this.data.cxPropCurrencyCode].decimals : field.decimal_place
				// check = this.decimalLengthCheck(val, (typeof Crm !== "undefined" && Crm.userDetails.IS_MULTI_CURRENCY_ENABLED) ?  {decimal_place : decimals} : field);
				check = this.decimalLengthCheck(val, field);
				if(!check){
					if(this.getMethods("onError")){
						this.executeMethod("onError", this.errorCodes.ERR03, this);//No I18n
					}
					else{
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.valid.decimal.check2", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label), field.decimal_place));//No I18n

					}
				}
			}
			else{
				if(this.getMethods("onError")){
					this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
				}
				else{
					this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				}
			}
			return check;
		}
    },
	/**
	 * @author anuja.manoharan
	 * called to validate a phone number
	 * @params field - object 
	 * @params value - string
	 * @returns boolean
	 */
    validatePhoneNumber : function(field, value){
    	if(!value || value.trim() == ""){
			/**
			 * if value is empty but field is mandatory then false is returned
			 */
    		if(!this.validateMandatory(true)){
				if(this.data && !this.data.cxPropPreventFocusOnError){
    				this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
				}
			return false;
    		}
    		this.setData("cxPropErrorMessage", "");//No I18n
		return true;
		}
		if(!this.validateMaskField()){
			this.setData("cxPropErrorMessage", "");
			return true;
		}
		var check = this.validateLength(value);
		if(check){
			check = this.isValidPhoneNo(value);
		}else{
			return false;
		}
		if(!check){
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			if(this.data && !this.data.cxPropPreventFocusOnError){
				this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
			}
		}else{
			this.setData("cxPropErrorMessage", "");//No I18n	
		}
	    	return check;

    },
    errorCodes : {ERR01 : "value_empty", ERR02 : "value_invalid", ERR03 : "decimal_check", ERR04 : "maxlength_check",ERR05:"max_value_check",ERR06:"min_value_check"},//No I18n
    	/**
	 * @author anuja.manoharan
	 * to validate whether a given value is within the maxlength passed. all error related handling done
	 * @params value
	 * @params len - if not passed cxPropMaxlength is taken
	 * @returns boolean
	 */
    validateLength : function(value, len){
    	len = len ? len : this.data.cxPropMaxlength;
     	if(len && value.length > len){
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR04, this);//No I18n
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.length.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData("cxPropField").field_label)));//No I18n
			}
			if(this.data && !this.data.cxPropPreventFocusOnError){
				this.$node && this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
			}
			return false;
		}
		return true;
     },
	 /**
	  * @author anuja.manoharan
	  @internal used in crm
	  used to validate a text element based on mandatory and length. if error is found, callback is triggered or error message is set. similarly focus is set to element if error.
	  @params field - object
	  @params val - string
	  @params len - number
	  @params layout - id
	  @returns boolean
	  */
     validateText : function(field, val, len, layout){
     	if(!this.validateMandatory(!val || val.trim() == "", undefined, field, layout)){
	     	if(this.data && !this.data.cxPropPreventFocusOnError){
		     	!this.inFocus && this.$node && this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n     	
     		}
		return false;
     	}
		if(!this.validateMaskField()){
			this.setData("cxPropErrorMessage", "");
			return true;
		}
		if(val && !this.validateLength(val, len)){
			return false;
		}
		this.setData("cxPropErrorMessage", "");//No I18n
		return true;
     },
	 /**
	  * @author anuja.manoharan
	  called from table and phone component when the phone icon is clicked. triggers a function in CRM
	  */
     phoneClick : function(value, id, module, entityName){
     	event.preventDefault();
		if(typeof ctiApiNotifier != "undefined"){
			ctiApiNotifier.click2Call(value, Crm.userDetails.ZGID, Crm.userDetails.USER_ID, id,'', module, entityName);//No I18n
		}
		event.stopPropagation();
     },
     stopPropagation : function(){
     	event.stopPropagation();
     	return false;
     },
	 /**
	  * @author anuja.manoharan
	  used to set precision to a number
	  @params value
	  @params length
	  @returns number
	  */
     toPrecision : function(value, length){
     	value = value.toString();
     	var split = value.split(".");
     	var ret = split[0];
     	var start = ret.length;
     	if(split.length < 2){
     		split[1] = "";
     	}
     	for(var i=start, j=0; i<length; i++, j++){
     		if(j == 0){
     			ret+=".";
     		}
     		if(split[1][j]){
     			ret+=split[1][j];
     		}
     		else{
	     		ret+="0";
     		}
     	}
     	return ret;
     },
	 /**
	  * @author anuja.manoharan
	    @internal used in crm, do not remove
		converts date in any given pattern to Date format
		@params dateVal - string
		@params datePattern - string
		@params timeFormat
		@params validate - boolean to determine whether given string needs to be validated
		@params i18n - boolean to determine whether given string is in user locale or not
		@returns Date
	  */
     getDateObjectFromString : function(dateVal,datePattern, timeFormat, validate, i18n)
	  {
	 	if(!dateVal)
	 	{
	 		return new Date();
	 	}
	  	if(!dateVal.getMonth)
	  	{
	  		if(!datePattern)
			{
				var colonIndex = dateVal.indexOf(":");
				if(colonIndex >-1)
				{
					timeFormat = timeFormat ? timeFormat : Crm.userDetails.TIME_FORMAT;
					if(dateVal.indexOf("AM") >1 || dateVal.indexOf("PM") >1)
					{
						timeFormat = timeFormat.replace('a','A');
					}
					datePattern += " "+timeFormat;
				}
			}
			var dateMom = $L.moment(dateVal.trim(), datePattern.toUpperCase().trim(), {i18n : i18n});
			var dateValidate = dateMom.validate();
			var dateObj = dateMom.getDObj();//No I18n
			if(!dateObj)
			{
				dateObj= new Date();
			}
			return dateValidate || validate ? dateObj : dateVal;;
	  	}
	  	return dateVal;
	  },
		"getDateTimeInUserFormat" : function(dateObj,upCase, isView, noNeedI18n) {// no i18n
			var dtStr = this.getDateInUserDatePattern(dateObj);
			dtStr += " " + this.getTimeInUserFormat(dateObj, upCase, noNeedI18n);
			return dtStr;
		},
		/**
		 * @author anuja.manoharan
		 * Used to show or hide info tooltip on view case.
		 * @param the element to which info tooltip is to be displayed
		 */
		showHideInfoTooltip: function(elem) {
			var infoIcon;

			if(elem) {
				infoIcon = $L(elem);
	      infoIcon.addClass('cxCurrentHovercard'); //No I18n
	      var hoverCardElem = infoIcon.next();
	      hoverCardElem[0].ltProp('show', true); //No I18n
			} else {
				infoIcon = this.$node.querySelector(".cxCurrentHovercard"); //NO I18n
	      $L(infoIcon).removeClass('cxCurrentHovercard'); //No I18n
			}
		},
		/**
		 * @author anuja.manoharan
		 * used to validate an element specifically for its mandatory properties. A field can be set as mandatory by either passing cxPropMandatory or field[layout].required or field[required] as true. If an element fails the check, onError callback will be triggered (if available), else error message will be set.
		 */
		validateMandatory : function(bool, callback, field, layout){
			field = field ? field : this.data.cxPropField;
			layout = layout ? layout : this.data.cxPropLayout;
			var required = (this.data.cxPropMandatory == true || this.data.cxPropMandatory == false) ? this.data.cxPropMandatory : layout && field[layout] ? field[layout].required : field.required;
			if(required && bool){
				if(typeof callback != "undefined"){
					callback();
				}
				else{
					if(this.getMethods("onError")){
						this.executeMethod("onError", this.errorCodes.ERR01, this);//No I18n
					}
					else{
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.empty.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData("cxPropField").field_label)));//No I18n
					}
				}
				return false;
			}
			return true;
		},
		/**
		 * elements in create mode have focus util added
		 */
		setFocusUtil : function(){
			this.$node.focus = function(){
				let focusElem = this.$node.querySelector('.cxFocusableElememnt');
				if(focusElem){
					if(focusElem.open){
						focusElem.open();
					}else{
						focusElem.focus();
					}
				}else{
					var chk = this.$node.querySelector("lyte-checkbox");
					var inp = chk ? chk : this.$node.querySelector("input");
					inp = inp ? inp : this.$node.querySelector("textarea");
					if(!inp || (this.$node.querySelector("lyte-dropdown") && !(this.$node.tagName==='CRUX-PHONE-COMPONENT'))){
						inp = this.$node.querySelector("lyte-dropdown");
						inp ? inp.open() : "";
						var inpInsideDropdown = inp ? inp.querySelector("input") : "";
						inpInsideDropdown ? inpInsideDropdown.selectionStart = inpInsideDropdown.value.length : ""; //eslint-disable-line no-unused-expressions
						inpInsideDropdown ? inpInsideDropdown.focus() : ""; //eslint-disable-line no-unused-expressions
					}
					else{
						//in  case of masking, if a element is already in focus and focus util is called cursor it changed to last 
						//but if there is no permission it shouldn't happend
						if(!chk && inp && 
								(!this.data.cxPropMaskingProperties || !Object.keys(this.data.cxPropMaskingProperties).length>0 ||
								this.data.maskUnmaskPermission || !this.noMaskPermissionKeyDown)){
							inp.selectionStart = inp.value.length;
						}		
						inp ? inp.focus() : "";
					}
				}
			}.bind(this)
		},
		/**
		 * called on observer of cxPropFrom and cxPropMandatory to set the class accordingly. The element selector and class name need to be passed as arguments
		 */
	observeMandatoryMixin: function (sel, cls) {
		var node = this.$node.querySelector(sel);
		if (!node || (this.getData("cxPropFrom") !== "create" && this.$node.tagName !== 'CRUX-GROUPER-RADIO-COMPONENT')) {
			return;
		}
		var mandatory = (this.data.cxPropMandatory === true || this.data.cxPropMandatory === false) ? this.data.cxPropMandatory : this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout] && this.data.cxPropField[this.data.cxPropLayout].required : this.data.cxPropField && this.data.cxPropField.required;
		cls = cls ? cls : "mandatoryField"; //No I18n
		if (this.data.cxPropPrefixYield) {
			const mandatoryInput = this.$node.querySelector("lyte-input.mandatoryField");
			if (mandatoryInput) {
				mandatoryInput.classList.remove("mandatoryField"); // No I18n
			}
		}
		if (mandatory) {
			node.classList.add(cls); // No I18n
		} else {
			node.classList.remove(cls); // No I18n
		}
	},
		setSelectUtil : function(){
			this.$node.select = function(){
				var inp = this.$node.querySelector("lyte-input");
				inp ? inp.select() : "";
			}.bind(this)
		},
		/**
		 * Used to set tooltip to a crux element in create mode. If cxPropTooltip is passed, it is set, else if field is disabled, then readonly tooltip is set, else it is set to false. This is called when cxPropDisabled is toggled as well.
		 */
		observeAndSetTooltip : function(){
			if(typeof this.data.cxPropTooltip != 'undefined'){
				this.setData("tooltip", this.data.cxPropTooltip);
			}
			else if(this.data.cxPropDisabled){
				this.setData("tooltip", _cruxUtils.getI18n("crm.lable.read.only"))//NO I18n
			}
			else{
				this.setData("tooltip", "");
			}
		},
		actions : {
			focusOnViewElement : function(){
				this.setData('lyteViewPort',false);
				this.$node.focus();
			},
			showHideInfoTooltip: function(origElem) {
			      this.showHideInfoTooltip(origElem);
			},
			preventUndoOnInput: function(event){
				if(this.getData('cxPropMaskingProperties') && Object.keys(this.getData('cxPropMaskingProperties')).length && !this.data.maskUnmaskPermission){
					if(event.inputType === "historyUndo"){
						event.preventDefault();
						return;
					}
					delete this.noMaskPermissionKeyDown;
				}
			}
		},
		methods : {
			showHideInfoTooltip: function() {
			      this.showHideInfoTooltip();
			}
		},
		observeMandatoryMixin2 : function(){
			var mandatory = (this.data.cxPropMandatory == true || this.data.cxPropMandatory == false) ? this.data.cxPropMandatory : this.data.cxPropLayout ? this.data.cxPropField[this.data.cxPropLayout].required : this.data.cxPropField.required;
			this.setData("mandatory", mandatory);
		},
		observeError : function(sel, className){
			if(this.data.cxPropFrom == "create" && this.$node.querySelector(sel)){
				this.data.isError ? this.$node.querySelector(sel).classList.add(className) : this.$node.querySelector(sel).classList.remove(className);
			}
		},
		observeClass : function(sel, op){
			if(this.data.cxPropFrom == "create"){
				var ele = $L(sel, this.$node);
				if(!ele.length){
					return;
				}
				if(op && op.oldValue){
					ele.removeClass(op.oldValue);
				}
				if(this.data.cxPropClass){
					ele.addClass(this.data.cxPropClass);
				}
			}
		},
		observeRender : function(){
			!this.data.lyteViewPort && this.getMethods("onElementRendered") ? this.executeMethod("onElementRendered", this) : "";
		},
		observeMandatoryTypeMixin : function(sel){
			if(this.data.cxPropMandatoryType && this.data.cxPropMandatoryType !== 'red_accent_line'){
				if(!this.$node.querySelector('.cxMandatoryOptEnabled')){
					$L(sel, this.$node).addClass('cxMandatoryOptEnabled');
					// $L(this.$node.querySelector('.mandatoryField')).addClass('cxMandatoryOptEnabled');
				}
			}else if(this.$node.querySelector('.cxMandatoryOptEnabled')){
				$L(sel, this.$node).removeClass('cxMandatoryOptEnabled');
				// $L(this.$node.querySelector('.mandatoryField')).removeClass('cxMandatoryOptEnabled');
			}
		},
		setElementCompUtils : function(){
			this.$node.animateErrorMsg = (type = "shake")=>{
				var errorMsgNode = this.$node.querySelector('crux-error-message');
				if( errorMsgNode.animateErrorMsg ){
					errorMsgNode.animateErrorMsg(type);
				}
			}
		},
		elementPropsObserver : function(){
			this.convertLtPropJson();
		}.observes('cxPropElementProps'),
		convertLtPropJson : function(json){
			let maskProps = this.getData('cxPropMaskingProperties');
			if( !maskProps && this.getData('cxPropField') && this.getData('cxPropField').mask_details ){
				this.setData('cxPropMaskingProperties', this.getData('cxPropField').mask_details);
			}if(maskProps && !Object.keys(maskProps).length){
				this.setData('cxPropMaskingProperties', undefined);
			}
			this.setElementCompUtils();
			json = json ? json : this.data.cxPropElementProps;
			var compProps = {} , tempProps , resJson = {};
			if(json){
				for(var comp in json){
					compProps = json[comp] ? json[comp] : {};
					var props = {};
					for(var property in compProps){ 
						tempProps = property.replace('ltProp','');
						tempProps = tempProps.replace('cxProp','');
						props[tempProps.charAt(0).toLowerCase()+tempProps.slice(1)] = compProps[property];
					}
					resJson[comp] = JSON.stringify(props);
				}
				this.setData('childCompProps' , resJson);//no i18N
			}
		},
		observeTabindexMixin : function(changes){
			if(this.data.$dataAttributes && this.data.$dataAttributes.cxPropTabindex){
				this.setData("cxPropTabIndex", this.data.cxPropTabindex);
				this.setData("cxPropTabindex", this.data.cxPropTabindex);
			}else if(this.data.$dataAttributes && this.data.$dataAttributes.cxPropTabIndex){
				this.setData("cxPropTabIndex", this.data.cxPropTabIndex);
				this.setData("cxPropTabindex", this.data.cxPropTabIndex);
			}else if(changes && changes.item){
				if(changes.item === 'cxPropTabindex'){
					this.setData("cxPropTabIndex", this.data.cxPropTabindex);
				}else if(changes.item === 'cxPropTabIndex'){
					this.setData("cxPropTabindex", this.data.cxPropTabIndex);
				}
			}else{
				if((this.data.cxPropTabindex !== "0" || this.data.cxPropTabIndex === undefined) && this.data.cxPropTabindex !== undefined){
					this.setData("cxPropTabIndex", this.data.cxPropTabindex);
				}else if((this.data.cxPropTabIndex !== "0" || this.data.cxPropTabindex === undefined) && this.data.cxPropTabIndex !== undefined){
					this.setData("cxPropTabindex", this.data.cxPropTabIndex);
				}
			}

		},
		getColouredPicklistStyleDetails: function (cxPropField, picklistValueInRecord, cxPropNoneKeyword, cxPropPicklistValues, cxPropLayout) {
			let styleDetails = {},
				picklistValues = cxPropPicklistValues || [],
				colorCode = null,
				selectedPicklistValue = null;
			if (cxPropLayout && cxPropField[cxPropLayout]) {
				picklistValues = cxPropField[cxPropLayout].pick_list_values;
			} else if (cxPropField.pick_list_values) {
				picklistValues = cxPropField.pick_list_values;
			}
			if (picklistValueInRecord) {
				selectedPicklistValue = picklistValues.filter(function (item) { return item.display_value === picklistValueInRecord || item.display_label === picklistValueInRecord ; });
				if (selectedPicklistValue.length < 1 && cxPropField.pick_list_values) {
					selectedPicklistValue = cxPropField.pick_list_values.filter(function (item) { return item.display_value === picklistValueInRecord || item.display_label === picklistValueInRecord ; });
				}
				colorCode = selectedPicklistValue.length >= 1 ? selectedPicklistValue[0].colour_code : "#ffffff";
			}
			if (picklistValueInRecord && picklistValueInRecord !== cxPropNoneKeyword) {
				var fontColor = "black"; //NO i18n
				if (colorCode && colorCode !== "" && colorCode.indexOf("#") === 0) {
					var colourCode = colorCode.substring(1);
					var c_r = parseInt(colourCode.substr(0, 2), 16);
					var c_g = parseInt(colourCode.substr(2, 2), 16);
					var c_b = parseInt(colourCode.substr(4, 2), 16);
					var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
					if (brightness < 175) {
						fontColor = "white"; //NO I18N
					}
				}
				var styleObj = "background-color:" + colorCode + ";color:" + fontColor; //No i18N
				if (colorCode === "#ffffff") {
					styleObj = styleObj + ";border: 1px solid #C9C9C9";  //No i18N
				}
				styleDetails.propColorStyleObj = styleObj;
				styleDetails.pkColorEnabledClass = "colorAppliedPicklist";//no i18n
			} else {
				styleDetails.propColorStyleObj = "";//no i18n
				styleDetails.pkColorEnabledClass = "colorAppliedPicklist colorAppliedPKNone";//no i18n
			}
			return styleDetails;
		},
		timeValidate : function(currObj){
			var ret = this.isValidTime(currObj.value.trim(), this.getData("convertedTimeFormat"));//no i18n
			if(!ret){
				var field = this.getData("cxPropField");//no i18n
				var fldLabel = field.errorFieldLabel || field.field_label || "";//No I18n
				var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
				var alertMsg = _cruxUtils.getI18n("crm.field.valid.check",Lyte.Component.registeredHelpers.cruxEncodeHTML(replacedFldLabel)); //No I18N
				this.showAlert(alertMsg,currObj);
				 currObj.setAttribute("autocomplete","off");
			}
			return ret;
		},
		isValidTime : function(dateVal, datepat){
			if(!dateVal)
			{
				return false;
			}
			datepat = datepat ? datepat : this.getData("convertedTimeFormat");//no i18n
			try{
				return $L.moment(dateVal,datepat, {i18n : true}).validate();
			}catch(e){
				return false;
			}
		},
		executeMaskingPermissionFn : function(change){
			this.getCruxAssetsPropertiesFn();
			if(!change  || (change && (change.item!=='cxPropValue' || (change.item==='cxPropValue' && this.getData('cxPropFrom')==="view")))){
				delete this.noMaskPermissionKeyDown ; 
				this.maskingPermissionFn();
			}
		},
		maskingPermissionFn:function(){
			var { cxPropField, cxPropFrom, cxPropValue, cxPropProfileId, cxPropShowMaskUnmaskIcon , cxPropMaskingProperties } = this.data;
			if (cxPropFrom !== "criteria" && cxPropMaskingProperties && cxPropMaskingProperties.profiles && cxPropValue) {
    			var permission = cxPropMaskingProperties.profiles.some(profile => profile.id === cxPropProfileId) && cxPropShowMaskUnmaskIcon;
    			this.setData("maskUnmaskPermission", permission);
    			if (cxPropFrom === 'view' && !cxPropField.unmask) {
        			this.setData("cxPropToggleMasking", true);
    			} else if(!this.data.maskUnmaskPermission){
        			this.noMaskPermissionKeyDown = {};
    			}
			}
		},
		clientScriptMasking: function(){
			let {cxPropFrom, cxPropMaskingProperties } = this.data;
			if(cxPropFrom === 'view'){
				if(cxPropMaskingProperties && Object.keys(cxPropMaskingProperties).length>0 &&!cxPropMaskingProperties.profiles){
					this.setData("cxPropToggleMasking", true);
				}else if(!cxPropMaskingProperties){
					this.setData("cxPropToggleMasking", false);
				}
			}
		},
		onKeyDownMaskField:function(event){
			var {cxPropField , cxPropMaskingProperties}=this.data;
			if(cxPropField && cxPropMaskingProperties && !this.data.maskUnmaskPermission && this.noMaskPermissionKeyDown ){
				this.noMaskPermissionKeyDown[event.key]=true;
				// if( !this.noMaskPermissionKeyDown['Meta'] && !this.noMaskPermissionKeyDown['Alt'] && !this.noMaskPermissionKeyDown['Control'] && !this.noMaskPermissionKeyDown['Shift'] && !this.noMaskPermissionKeyDown['ArrowRight'] &&  !this.noMaskPermissionKeyDown['ArrowLeft'] && !this.noMaskPermissionKeyDown['ArrowUp'] && !this.noMaskPermissionKeyDown['ArrowDown'] && !this.noMaskPermissionKeyDown['Tab'] &&  !this.noMaskPermissionKeyDown['Escape']){
				// 	delete this.noMaskPermissionKeyDown;
				// }else 
				if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown'){
					event.preventDefault();
				}
				// if(this.noMaskPermissionKeyDown['ArrowRight'] || this.noMaskPermissionKeyDown['ArrowLeft'] || this.noMaskPermissionKeyDown['ArrowUp'] || this.noMaskPermissionKeyDown['ArrowDown']){
				// 	// delete this.noMaskPermissionKeyDown[event.key];
				// 	event.preventDefault();
				// }
			}
			if(cxPropMaskingProperties && !this.data.maskUnmaskPermission && ((event.ctrlKey || event.metaKey) && event.key === 'z')){
				event.preventDefault();
			}
		},
		onKeyUpMaskField:function(){
			// var {cxPropField , cxPropMaskingProperties} =this.data;
			// if(cxPropField && cxPropMaskingProperties  && !this.data.maskUnmaskPermission && this.noMaskPermissionKeyDown){
			// 	if(this.noMaskPermissionKeyDown['Backspace']){
			// 		delete this.noMaskPermissionKeyDown;
			// 	}else{
			// 		delete this.noMaskPermissionKeyDown[event.key];
			// 	}
			// }
		},
		onMouseDownMaskField:function(event){
			var {cxPropField , cxPropMaskingProperties} =this.data;
			if(cxPropField && cxPropMaskingProperties && !this.data.maskUnmaskPermission && this.noMaskPermissionKeyDown) {
				if(event.target.select){
					event.target.select();
				}
				event.preventDefault();
			}
		},
		onFocusMaskField:function(event){
			if(this.data.cxPropMaskingProperties && !this.data.maskUnmaskPermission && this.noMaskPermissionKeyDown) {
				clearTimeout(this.timeoutId);
				this.timeoutId = setTimeout(() => {
					if(event.target.select){
						event.target.select();
					}
				}, 0);
			}
		},
		getCruxAssetsPropertiesFn:function(){
			// if(typeof cruxAssets !== 'undefined' && typeof cruxAssets.getPropertiesForCruxElements !=='undefined' &&  cruxAssets.getPropertiesForCruxElements.constructor===Function){
			// 	var props=cruxAssets.getPropertiesForCruxElements(this);
			// 	this.setData(props);
			// }
			let cruxAssetService = Lyte.Service.getInjected('cruxAssests');
			if(typeof cruxAssetService!=='undefined' && typeof cruxAssetService.getPropertiesForCruxComponents !=='undefined'){
				var node=this.$node;
				var comp_data = node.cxProp ? node.cxProp() : this.data;
				var tag_name = node.tagName || node.localName;
				var props=cruxAssetService.getPropertiesForCruxComponents(comp_data ,tag_name ,this);
				this.setData(props);
			}
		},
		getCruxMaskValue: function(value, prop,isFormatTypeMaksing,phoneField){
			return Lyte.Component.registeredHelpers.cruxMaskValue(value, prop,isFormatTypeMaksing,phoneField);
		},
	observePrefixAndSuffixYieldMixin: function (hasPrefixYield, hasSuffixYield, componentName, hasCxPropDisplayIconTextComp, hasCxPropHideLookupIconUserComp) {
		const YieldStatus = hasPrefixYield || hasSuffixYield;
		const booleanCompObserverComponents = ["crux-boolean-component"];
		const yieldObserver = this.$node.querySelector(".cxYieldObserver");
		const commonElemCompObserver = this.$node.querySelector(".cxYieldObserverElemComp");
		const booleanCompCheckboxObserver = booleanCompObserverComponents.includes(componentName) ? this.$node.querySelector(".cxYieldObserverBooleanLyteCheckBox") : null;

		if (componentName === "crux-text-area-component" && this.$node) { this.$node.classList.add("cxElemCompViewWrap"); } // No need to remove the class since it already exists.

		if (hasCxPropDisplayIconTextComp === true && yieldObserver && YieldStatus) {
			yieldObserver.classList.remove("cxBoxWithRightIcon");
		}

		if (YieldStatus) {
			if (yieldObserver){ yieldObserver.classList.add("cxBoxWithRightIcon", "cxElemCompWithPrefixYield"); }
			if (commonElemCompObserver){ commonElemCompObserver.classList.add("cxElemCompWithPrefixYield"); }
			if (booleanCompCheckboxObserver){ booleanCompCheckboxObserver.classList.add("cxErrorCheckbox"); }
			if (hasCxPropHideLookupIconUserComp === true && commonElemCompObserver){ commonElemCompObserver.classList.add("cxBoxWithRightIcon"); }

			if (componentName !== "crux-file-upload-component" && this.$node){ this.$node.classList.add("cxElemPrefixViewWrap"); }

		} else {
			if (yieldObserver){ yieldObserver.classList.remove("cxBoxWithRightIcon", "cxElemCompWithPrefixYield"); }
			if (commonElemCompObserver){ commonElemCompObserver.classList.remove("cxElemCompWithPrefixYield"); }
			if (booleanCompCheckboxObserver){ booleanCompCheckboxObserver.classList.remove("cxErrorCheckbox"); }
			if (hasCxPropHideLookupIconUserComp === true && commonElemCompObserver){ commonElemCompObserver.classList.remove("cxBoxWithRightIcon"); }

			if (this.$node){ this.$node.classList.remove("cxElemPrefixViewWrap"); }

			if (hasCxPropDisplayIconTextComp === true && yieldObserver) { yieldObserver.classList.add("cxBoxWithRightIcon"); }
		}
	},

		/* sets aria attributes for view case */
		ariaSetForView : function(){
			if(this.data.cxPropFrom == 'view'){
				var focusableElement = this.$node.firstElementChild;
				this.observeTabindexMixin();
				if(focusableElement && focusableElement.firstElementChild){
					focusableElement = focusableElement.firstElementChild;
				}
			if(focusableElement && focusableElement.tabIndex !== this.data.cxPropTabindex){
					focusableElement.tabIndex = this.data.cxPropTabindex;
				}
				_lyteUiUtils.setAttribute(focusableElement, this.data.cxPropAriaAttributes || {}, {});
			}
		},
		/* set aria attributes for components */
		ariaGetMergedAttributes: function(compType) {
			_cruxUtils.addMurhyInfo("crux-element-validation.js", "Feb Default Changes");
			/* contains all aria props */
			var ariaAttributes = {
		                cxAriaAttributes: {},
		                cxAriaCheckbox: {},
		                cxAriaRadio: {},
		                cxTimeAriaAttributes: {},
		                cxAriaButton: {},
		                cxAriaBody: {},
		                cxAriaBox: {},
				cxAriaErrorProperties: {},
        		        cxAriaDropdownAttributes: {},
				cxAriaFileUploadModal: {},
		                cxAriaFilterDropdownAttributes: {},
		                cxAriaMenu: {},
		                cxAriaModal: {},
		                cxAriaSlider: {},
		                cxAriaSearch: {},
		                cxAriaPopover: {},
		                cxAriaNoteHeading: {},
		                cxAriaImageDiv: {},
		                cxAriaImagePreview: {},
		                cxAriaImageUpload: {},
		                cxAriaUploadButton: {},
		                cxAriaMessageBox: {},
		                cxAriaDownloadIcon: {},
		                cxAriaRemoveIcon: {},
		                cxAriaUploadIcon: {},
		                cxAriaRightIcon: {},
		                cxAriaCallIcon: {},
		                cxAriaEditIcon: {},
		                cxAriaCloseIcon: {}
			};

			/* contains exposed aria props */
			var constAriaKeys = [
				'cxPropAriaCheckbox',
				'cxPropAriaRadio',
				'cxPropTimeAriaAttributes',
				'cxPropAriaButton',
				'cxPropAriaBox',
				'cxPropAriaBody',
				'cxPropAriaErrorProperties'
			];

			/* merge values in exposed Props(constAriaKeys) to all Props(ariaAttributes) */
			constAriaKeys.forEach(attrKey => {
				const value = this.data[attrKey];
				if (value && Object.keys(value).length > 0) {
					const targetKey = attrKey.replace('cxProp', 'cx'); // converts cxPropAriaCheckbox -> cxAriaCheckbox
					ariaAttributes[targetKey] = value;
				}
			});

			if(compType === 'dropdown'){
				var dropdownAttr = {
					cxAriaButton : ariaAttributes.cxAriaButton,
					cxAriaBox : ariaAttributes.cxAriaBox,
					cxAriaBody : ariaAttributes.cxAriaBody
				};
				ariaAttributes.cxAriaDropdownAttributes = dropdownAttr;
				ariaAttributes.cxAriaButton = {};
				ariaAttributes.cxAriaBox = {};
				ariaAttributes.cxAriaBody = {};
			}

			/* sets ariaAttribute to all props(ariaAttributes) */
			var tempAriaAttr = this.data.cxPropAriaAttributes;
            if (tempAriaAttr && Object.keys(tempAriaAttr).length !== 0) {
                var hasMatchingKeys = Object.keys(tempAriaAttr).some(key => key in ariaAttributes);
				if (hasMatchingKeys) {
					Object.assign(ariaAttributes, tempAriaAttr);
				} else {
					ariaAttributes.cxAriaAttributes = tempAriaAttr;
				}
            }
		
			var mergedAttrs = this.checkDuplicate(ariaAttributes, this.data.ariaAttributes);
			return this.ariaSetLabelForIcon(mergedAttrs);
		},
		/* check if the aria attributes already having value */
		checkDuplicate : function (ariaAttr, defaultAriaAttr) {
			for (const key in defaultAriaAttr) {
				// Check if the key exists in ariaAttr
				if (ariaAttr.hasOwnProperty(key)) {
					// If both values are objects, do a recursive check
					if (typeof ariaAttr[key] === 'object' && typeof defaultAriaAttr[key] === 'object' && !Array.isArray(ariaAttr[key]) && !Array.isArray(defaultAriaAttr[key])) {
						// Recursively check nested objects
						this.checkDuplicate(ariaAttr[key], defaultAriaAttr[key]);
					} else if (ariaAttr[key] === defaultAriaAttr[key]) {
						// If the value matches, update ariaAttr with defaultAriaAttr's value
						ariaAttr[key] = defaultAriaAttr[key];
					}
				}else{
					ariaAttr[key] = defaultAriaAttr[key];
				}
			}
			return ariaAttr;
		},
	/* sets default label for icons */
	ariaSetLabelForIcon : function(ariaAttributes){
		_cruxUtils.addMurhyInfo("crux-element-validation.js", "Feb Default Changes");
		var defaultIconLabel = {
			cxAriaRemoveIcon : _cruxUtils.getI18n("crm.fileuploader.removefile"),
			cxAriaDownloadIcon : _cruxUtils.getI18n("crm.view.attachment.download"),
			cxAriaUploadIcon : _cruxUtils.getI18n("crm.button.upload"),
			cxAriaRightIcon : 'Field Icon',
			cxAriaCallIcon : 'Call Icon',
			cxAriaEditIcon : 'Edit Icon',
			cxAriaCloseIcon : 'Close Icon',
			cxAriaLookupIcon : 'Lookup Icon'
		};
		for (const key in defaultIconLabel) {
			if (!ariaAttributes[key]) {
				ariaAttributes[key] = { 'aria-label' : defaultIconLabel[key] };
			}else if(ariaAttributes[key] && !(ariaAttributes[key]['aria-label'])){
				ariaAttributes[key]['aria-label'] = defaultIconLabel[key];
			}
			return ariaAttributes;
		}
	},
	//if the mask field is modified by the user
	validateMaskField: function(){
		return this.data.cxPropMaskingProperties && Object.keys(this.data.cxPropMaskingProperties).length>0
		&& !this.data.maskUnmaskPermission && this.noMaskPermissionKeyDown ? false : true;
	}
});
