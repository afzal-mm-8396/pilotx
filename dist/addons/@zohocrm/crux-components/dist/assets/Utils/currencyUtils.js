// $Id$

/**
 * @namespace
 */

var currencyUtils = {};

currencyUtils.ROUNDINGOPTION = {
    "NORMAL" : 0, //NO I18N
    "ROUND_OFF" : 1, //NO I18N
    "ROUND_UP" : 2, //NO I18N
    "ROUND_DOWN" : 3 //NO I18N
}
	/**
	 * This method is used to get the Currency seperator of the User according to the chosen home currency or default Org Currency.
	 * @returns {void}
	 * @example
	 * currencyUtils.getPresentCurrencySepartor() //if base currency is INR 
	 *  => ","
	 */
currencyUtils.getPresentCurrencySepartor = function(){//no i18n
	var iso = $("#subvalue_CURRENCYISOCODE").text();
	let props = _cruxUtils._getProperty();
	if(iso === ""){
		 iso = props.baseCurrency;
	}
	if(props.currencyDetails && props.currencyDetails[iso]){
		var separtor = props.currencyDetails[iso] ? props.currencyDetails[iso].format.split("|")[0] : ",";
		return separtor;
	}
	else if(props.defaultOrgCurrency){
		return props.defaultOrgCurrencyDetails && props.defaultOrgCurrencyDetails.format ? props.defaultOrgCurrencyDetails.format.split("|")[0] : ",";
	}
	else{
		return ",";
	}
}
	/**
	 * This method is used to apply rounding for on/off/down property.
	 * @param {String} value - This provides the value that has to be rounded off 
	 * @param {Number} uiType - This provides the ui type using which it is decided to on/off/down.
	 * @param {Number} precision - This provides the exponential value to which the number is to be rounded off.
	 * @returns {String} - This provides end result after rounding is applied.
	 */
currencyUtils.applyRounding = function(value,uiType,precision,roundingOpt)
{
	if(!isNaN(value) && precision > -1)
	{
		var parts = value.toString().split(".");
		if(parts && parts[1] && parts[1].length > precision){
			value = Number(value).toFixed(16);
			if(currencyUtils.ROUNDINGOPTION.ROUND_OFF === roundingOpt){
				value = Math.round(value * Math.pow(10,precision)) / Math.pow(10,precision);
			}
			else if(currencyUtils.ROUNDINGOPTION.ROUND_DOWN === roundingOpt){
				value = Math.floor(value * Math.pow(10,precision)) / Math.pow(10,precision);
			}
			else if(currencyUtils.ROUNDINGOPTION.ROUND_UP === roundingOpt){
				value = Math.ceil(value * Math.pow(10,precision)) / Math.pow(10,precision);
			}	
		}
		return value;
	}
	return value;
}
	/**
	* This method is used to return the currency value in default currency or home currency detais.
	* @param {String|undefined} isoCode - This provides the User's base currency or home currency.
	* @param {String} value - This provides the currency value from the user's entry.
	* @param {Number} decimalDigits - This provides the number of decimal digits that are to be present when displaying the currency.
	* @param {Number} exRate - This provides the exchange rate . in case if new currency is added to the org. 
	* @param {Number} uiType - This provides the ui type using which it is decided to on/off/down.
	* @param {Number} precision - This provides the exponential value to which the number is to be rounded off.
	* @return {String} - It returns the Currency values in default or home Currency.
	* @example
	* currencyUtils.returnValueInDefaultCurrency("$","123456789.12345",2,200)
	* => $ 123,456,789.12 (KY$ 617,283.95) // when home currency is KY$ but isocode is USD 
	*/

currencyUtils.returnValueInDefaultCurrency = function(isoCode,value,decimalDigits,exRate,uiType,precision,isSymbolNeeded,roundingOpt,fromDashboardShortened){//no i18n
	isSymbolNeeded = isSymbolNeeded == false ? false : true;
	var retString;
	var locale;
	let props = _cruxUtils._getProperty();
	if(!isoCode){
		isoCode = props.isMultiCurrencyEnabled ? props.baseCurrency : props.defaultCurrencyISOCode;
	}
	var isIndianFormatSupportCurrency = currencyUtils.isIndianFormatSupportCurrency(isoCode);
    
	if(!isNaN(precision)){
		value = currencyUtils.applyRounding(value,uiType,precision,roundingOpt);
	}
	if(!props.currencyDetails[props.baseCurrency] && isIndianFormatSupportCurrency){
		locale =  props.decimalSeparator.replace('_','-');
		retString=currencyUtils.formatCurrencyValue(value,locale,null,null,decimalDigits);
		if(props.baseCurrency !== "" && isoCode === props.baseCurrency && props.currencyDetails && props.currencyDetails[props.baseCurrency]){
			retString = isSymbolNeeded ? (props.currencyDetails[isoCode].isPrefix === false ? retString + " " + props.currencyDetails[isoCode].symbol :props.currencyDetails[isoCode].symbol + " " + retString) : retString;
		}
		else{
			retString = isSymbolNeeded ? props.defaultOrgCurrency + " " + retString : retString;
		}
	}
	else{
		var floatvalue = parseFloat(value), defSep;
		var decimal_base = typeof decimalDigits !== 'undefined' ? decimalDigits : typeof props.defaultRoundOff !== 'undefined' ? parseInt(props.defaultRoundOff) : 2;//no i18n
		var homeCurrVal=currencyUtils.decimalLengthCheck(floatvalue, decimal_base);
		retString = currencyUtils.getNumberWithCommas(homeCurrVal,",",".");
	//	var	curr_value =  Number(Math.round(floatvalue + "e+" + decimal_base) + "e-" + decimal_base);//no i18n commenting this line due to value conversion issue when decimal places is 6
		var homeVal = currencyUtils.decimalLengthCheck(floatvalue, decimal_base);
		if(props.currencyDetails[props.baseCurrency] && isoCode){
			decimal_base = fromDashboardShortened ? decimalDigits : parseInt(props.currencyDetails[props.baseCurrency].decimals);
			var decimal_curr = fromDashboardShortened ? decimalDigits : parseInt(props.currencyDetails[isoCode].decimals);
			var calcVal = (exRate ? value / parseFloat(exRate) : value / parseFloat(props.currencyDetails[isoCode].er) ) + "";
			defSep = props.currencyDetails[isoCode].format.split("|");
			var refSep = props.currencyDetails[props.baseCurrency].format.split("|"); //refSep[0] for thousands separator refSep[1] for decimal separator
			//var defVal = currencyUtils.getNumberWithCommas(parseFloat(value).toPrecision((parseInt(value)+"").length+decimal_curr),defSep[0],defSep[1]);
			var defVal;
			if(isoCode && isIndianFormatSupportCurrency){
				locale = 'en-IN';//no i18n
				defVal=currencyUtils.formatCurrencyValue(Number(homeCurrVal).toFixed(decimal_curr),locale,defSep[0],defSep[1],fromDashboardShortened ? decimalDigits : props.currencyDetails[isoCode].decimals);
			}
			else{
				//var defVal = currencyUtils.getNumberWithCommas(Number(Math.round(floatvalue + "e+" + decimal_curr) + "e-" + decimal_curr).toFixed(decimal_curr),defSep[0],defSep[1]);
				var defVal = currencyUtils.getNumberWithCommas(Number(currencyUtils.decimalLengthCheck(floatvalue, decimal_curr)).toFixed(decimal_curr),defSep[0],defSep[1]);
			}
			if(isoCode === props.baseCurrency){
				retString = isSymbolNeeded ? (props.currencyDetails[isoCode].isPrefix === false ? defVal + " " + props.currencyDetails[isoCode].symbol : props.currencyDetails[isoCode].symbol + " " + defVal) : defVal;
			}else{
				var homeVal1 =  currencyUtils.decimalLengthCheck(parseFloat(calcVal), decimal_base);
				let homeFormattedValue, currVal;
				if(props.baseCurrency && currencyUtils.isIndianFormatSupportCurrency(props.baseCurrency))
				{
					locale = 'en-IN';//no i18n
					homeFormattedValue = currencyUtils.formatCurrencyValue(homeVal1,locale,refSep[0],refSep[1],props.currencyDetails[props.baseCurrency].decimals);
					currVal =  " (" + (props.currencyDetails[props.baseCurrency].isPrefix === false ? homeFormattedValue + " " + props.currencyDetails[props.baseCurrency].symbol : props.currencyDetails[props.baseCurrency].symbol + " " + homeFormattedValue) +")";
					retString = isSymbolNeeded ? (props.currencyDetails[isoCode].isPrefix === false ? defVal + " " + props.currencyDetails[isoCode].symbol + currVal : props.currencyDetails[isoCode].symbol + " " + defVal + currVal) : defVal + currVal;
					//retString = props.currencyDetails[isoCode].symbol + " " + currVal;
				}
				else
				{
					homeFormattedValue = currencyUtils.getNumberWithCommas(homeVal1,refSep[0],refSep[1]);
					currVal = " (" + (props.currencyDetails[props.baseCurrency].isPrefix===false ? homeFormattedValue + " " + props.currencyDetails[props.baseCurrency].symbol : props.currencyDetails[props.baseCurrency].symbol + " " +homeFormattedValue) +")";
					retString = isSymbolNeeded ? (props.currencyDetails[isoCode].isPrefix === false ? defVal + " " + props.currencyDetails[isoCode].symbol + currVal : props.currencyDetails[isoCode].symbol + " " + defVal + currVal) : defVal + currVal;
					//retString = props.currencyDetails[isoCode].symbol + " " + currVal;
				}
			}
		}else if(props.defaultOrgCurrency){
			defSep = props.defaultOrgCurrencyDetails && props.defaultOrgCurrencyDetails.format ? props.defaultOrgCurrencyDetails.format.split("|") : [',','.'];
			if(props.defaultOrgCurrency === "SFr.")
			{
				props.defaultOrgCurrency = "CHF";//no i18n
			}
            if(isoCode === "EUR"){
                retString = isSymbolNeeded ? currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]) + " " + props.defaultOrgCurrency : currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]);
            }
            else{
                retString = isSymbolNeeded ? props.defaultOrgCurrency + " " + currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]) : currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]);
            }
		}else if(props.currencyDetails && props.baseCurrency && props.currencyDetails[props.baseCurrency]){
			decimal_base = parseInt(props.currencyDetails[props.baseCurrency].decimals);
			homeVal = currencyUtils.decimalLengthCheck(floatvalue, decimal_base);
			//homeVal =  Number(Math.round(homeVal + "e+" + decimal_base) + "e-" + decimal_base);//no i18n			
			defSep = props.currencyDetails[props.baseCurrency].format.split("|"); //refSep[0] for thousands separator refSep[1] for decimal separator
			var currntVal = currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]);
			retString = isSymbolNeeded ? (props.currencyDetails[props.baseCurrency].isPrefix === false ? currntVal + " " +  props.currencyDetails[props.baseCurrency].symbol : props.currencyDetails[props.baseCurrency].symbol + " " + currntVal) : currntVal;
		}	
	}
	if(retString){
	    let spaceInd = retString.indexOf(' ');	
		if (retString.charAt(spaceInd+1) === '-' || retString.charAt(0) === '-'){
			let match = retString.match(/\d/);
		    let firstIndex = match.index;
		    retString = retString.substring(0, firstIndex) + " " + retString.substring(firstIndex);
			// If home currency value appended
			/** var splitStr = retString.split('(');
			if(splitStr.length>1){
				var needToChange = splitStr[1];
				let spInd = needToChange.indexOf(' ');	
				if (needToChange.charAt(spInd+1) === '-'){
					let mat = needToChange.match(/\d/);
					let firstInd = mat.index;
					needToChange = needToChange.substring(0, firstInd) + " " + needToChange.substring(firstInd);
					retString = splitStr[0] + " ("+ needToChange;
				}
			}**/
		}
	}
	return retString;
}

currencyUtils.returnValueInDefaultCurrencyAsArray = function(isoCode,value,decimalDigits,exRate,uiType,precision,roundingOpt){
	if(!isNaN(precision)){
		value = currencyUtils.applyRounding(value,uiType,precision,roundingOpt);
	}
	let props = _cruxUtils._getProperty();
	var currencyArray = []
	var defSep;
	currencyArray[0] = currencyUtils.getNumberWithCommas(parseFloat(value),",",".");
	var decimal_base = typeof decimalDigits !== 'undefined' ? decimalDigits : typeof props.defaultRoundOff !== 'undefined' ? parseInt(props.defaultRoundOff) : 2;//no i18n
	var floatvalue = parseFloat(value);
//	var	homeVal =  Number(Math.round(floatvalue + "e+" + decimal_base) + "e-" + decimal_base).toFixed(decimal_base);//no i18n
	var homeVal =  Number(currencyUtils.decimalLengthCheck(floatvalue, decimal_base)).toFixed(decimal_base);//no 
	if( props.currencyDetails[props.baseCurrency] && isoCode){
		decimal_base = parseInt( props.currencyDetails[props.baseCurrency].decimals);
		var decimal_curr = parseInt( props.currencyDetails[isoCode].decimals);
		var calcVal = (exRate ? value / parseFloat(exRate) : value / parseFloat( props.currencyDetails[isoCode].er) ) + "";
		defSep =  props.currencyDetails[isoCode].format.split("|");
		// var refSep =  props.currencyDetails[ props.baseCurrency].format.split("|"); //refSep[0] for thousands separator refSep[1] for decimal separator
		//var defVal = currencyUtils.getNumberWithCommas(parseFloat(value).toPrecision((parseInt(value)+"").length+decimal_curr),defSep[0],defSep[1]);
		var defVal = currencyUtils.getNumberWithCommas(Number(currencyUtils.decimalLengthCheck(floatvalue, decimal_curr)).toFixed(decimal_curr),defSep[0],defSep[1]);
		//var defVal = currencyUtils.getNumberWithCommas(Number(Math.round(floatvalue + "e+" + decimal_curr) + "e-" + decimal_curr).toFixed(decimal_curr),defSep[0],defSep[1]);
		if(isoCode ===  props.baseCurrency){
			currencyArray[0] = defVal;
		}else{
		//	var homeVal1 =  Number(Math.round(parseFloat(calcVal) + "e+" + decimal_base) + "e-" + decimal_base).toFixed(decimal_base);//no 
			var homeVal1 =  Number(currencyUtils.decimalLengthCheck(parseFloat(calcVal), decimal_base)).toFixed(decimal_base);//no 

			currencyArray[0] = currencyUtils.getWholeOrDecimalValue(homeVal1,decimal_base)+'';
			currencyArray[1] = defVal;
		}
	}else if(props.defaultOrgCurrency){
		defSep =  props.defaultOrgCurrencyDetails &&  props.defaultOrgCurrencyDetails.format ?  props.defaultOrgCurrencyDetails.format.split("|") : [',','.'];
		currencyArray[0] = currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]); 
	}else if( props.currencyDetails &&  props.baseCurrency &&  props.currencyDetails[ props.baseCurrency]){
		decimal_base = parseInt( props.currencyDetails[ props.baseCurrency].decimals);
		//homeVal =  Number(Math.round(floatvalue+"e+"+decimal_base)+"e-"+decimal_base).toFixed(decimal_base);//no i18n
		homeVal =  Number(currencyUtils.decimalLengthCheck(floatvalue, decimal_base)).toFixed(decimal_base);
		defSep =  props.currencyDetails[ props.baseCurrency].format.split("|");

 //refSep[0] for thousands separator refSep[1] for decimal separator
		currencyArray[0] = currencyUtils.getNumberWithCommas(homeVal, defSep[0], defSep[1]);
	}	
	return currencyArray;
}

	/**
	 * This method is used to validate the Currency value  
	 * @param {Number} val - This gives the total Currency value
	 * @param {Number} baselen - This is the length of base i.e, money value before decimal point
	 * @param {Number} decimallen - This is the length of the decimal i.e, money value after decimal point 
	 * @param {Object} resultObj - This provides an object which is set with these properties maxlengthFailed,decimalLengthCheckFailed if there is a mismatch with the passed in baselen and decimallen.
	 * @returns {Boolean} - It returns True if the Currency value is valid and false if not
	 */
currencyUtils.isValidCurrency = function(val, baselen, decimallen,resultObj){//No I18N
	return validationUtils.isValidDecimal(val,baselen,decimallen,resultObj);
}

currencyUtils.decimalLengthCheck = function(val, decimalLen) {
	if (val === ""  ) {
		   return val;
	}
	var reg = /^-?(\d+)?(\.){0,1}(\d+)*$/;
	var valArr = reg.exec(val);
	let props = _cruxUtils._getProperty();
	if (!valArr) {
		return val;
	}
	var decimalVal = valArr[3];
	if(decimalVal && val.toString().length > 16 && decimalVal.length == 1){
		return val+'0';
	}
    var isMultiCurrencyEnabled = props.isMultiCurrencyEnabled;
	if(!decimalVal && !isMultiCurrencyEnabled && decimalLen > 0 && props.defaultRoundOff && props.defaultRoundOff > 0){
		return val.toFixed(props.defaultRoundOff);
	}
    else if(!decimalVal && isMultiCurrencyEnabled && decimalLen > 0){
        return val.toFixed(decimalLen);
    }
	else if(decimalVal && isMultiCurrencyEnabled && decimalVal.length < 3){
		return val.toFixed(decimalLen);
	}
	else if(decimalVal && !isMultiCurrencyEnabled && decimalVal.length == 1 && decimalLen > 1){
		decimalLen = 2;
		return val.toFixed(decimalLen);
	}
	else if (decimalVal && decimalVal.length > decimalLen) {
		return val.toFixed(decimalLen);
	}
	else{
		return val;
	}
}

	/**
	 * This method is used to get the Currency values without any Formating 
	 * @param {String} currency - This provides the currency value without ISOCode 
	 * @returns {String} - It returns the currency value without any seperator.
	 * @example
	 * currencyUtils.getCurrencyWithoutSeperator("$ 23,456,789.12,212,3223");
	 * => "23456789.122123223"
	 */
currencyUtils.getCurrencyWithoutSeperator = function(currency){
//	currency = currency.replace(/[^0-9\.,]/g,'');
	currency = currency.replace(/\u00a0/g, '');
	currency = /[0-9\.,]+/g.exec(currency);/* eslint-disable-line no-useless-escape */ // No I18n 
	if(currency && currency.length > 0){
		currency = currency[0]; 
	}else{
		return "";
	}
	currency = currency.replace(/^\./g,'');//Removing dot(.) if it is starting with decimal dot(.)
	var decimalSeprator = currencyUtils.getPresentCurrencySepartor(); 
	if(decimalSeprator === '.'){
		currency = currency.replace(/\./g,'');//removing the grouping separator
		while(currency.search(/,(\d+)?0$/) > -1){
			currency = currency.replace(/0$/,'');//removing trailing zeros
		}
		currency = currency.replace(/,$/,'');//removing the final decimalseparator
		//finally change the , to . for decimalseparator
		currency = currency.replace(/,(\d+$)/,'.$1')
	}else if(decimalSeprator.trim() === ''){
		currency = currency.replace(/\ /g,'');/* eslint-disable-line no-useless-escape */ //removing the grouping separator
		while(currency.search(/,(\d+)?0$/) > -1){
			currency = currency.replace(/0$/,'');//removing trailing zeros
		}
		currency = currency.replace(/,$/,'');//removing the final decimalseparator
		//finally change the , to . for decimalseparator
		currency = currency.replace(/,(\d+$)/,'.$1')
	}else{
		currency = currency.replace(/,/g,'');//removing the grouping separator
		while(currency.search(/\.(\d+)?0$/) > -1){
			currency = currency.replace(/0$/,'');//removing trailing zeros
		}
		currency = currency.replace(/\.$/,'');//removing the final decimalseparator
	}
	return currency
}
currencyUtils.formatCurrencyValue = function(number,locale,grp,dec,decimalPlace){ // For Indian Formatting
	if(grp !== ',' || dec !== '.'){
		grp = ',';
		dec = '.';
	}
	let props = _cruxUtils._getProperty();
	var defSep = props.defaultOrgCurrencyDetails && props.defaultOrgCurrencyDetails.format ? props.defaultOrgCurrencyDetails.format.split("|") : [',','.'];
	decimalPlace = typeof decimalPlace !== 'undefined' ? decimalPlace : typeof props.defaultRoundOff !== 'undefined' ? parseInt(props.defaultRoundOff) : 2;//no i18n
	grp = typeof grp !== 'undefined' & grp !== null ? grp : defSep[0];
	dec = typeof dec !== 'undefined' & dec !== null ? dec : defSep[1];
	if(number && typeof(number) !== "string" ){
		number = number.toString();
	}
	var maximumFractionDigitValue;
	if(decimalPlace == -1 || decimalPlace == 0)
	{
		maximumFractionDigitValue = 2;
	}
	else
	{
		maximumFractionDigitValue = decimalPlace
	}
		var number1=number;
		if(number){
			if(number.indexOf(".") !== -1){
			number = Intl.NumberFormat(locale,{minimumFractionDigits:1,maximumFractionDigits:maximumFractionDigitValue}).format(number);	
			}else{
				number = Intl.NumberFormat(locale,{maximumFractionDigits:maximumFractionDigitValue}).format(number);	
			}
		}
	var group = new Intl.NumberFormat(locale).format(11111).replace(/1/g, '');
	var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
	number1 = Intl.NumberFormat("en-IN",{maximumFractionDigits:maximumFractionDigitValue}).format(number1); //NO I18N
	var formattedValue = number1 ? number1.split(group).join(group) : number1;
	var currencyValue;
	var decPlaceValue;
	if(props.isMultiCurrencyEnabled || props.baseCurrency !== ""){
		formattedValue = formattedValue.replaceAll(decimal,"/");
		formattedValue = formattedValue.replaceAll(group,grp);
		formattedValue = formattedValue.replaceAll("/",dec);
		currencyValue = formattedValue.split(dec);
		if(decimalPlace === 0)
		{
			formattedValue = currencyValue[0];
		}
		else if(currencyValue.length <= 1){
			let decimalPart =  '';
   			currencyValue[1] = decimalPart.padEnd(decimalPlace, '0');
   			formattedValue = currencyValue[0]+dec+currencyValue[1];
		}
		else{
			decPlaceValue = currencyValue[currencyValue.length-1];
			if (decPlaceValue.length < decimalPlace) {
    			decPlaceValue = decPlaceValue.padEnd(decimalPlace, '0');
    			formattedValue = currencyValue[0]+dec+decPlaceValue;
			}
		}
	}
	else{
		formattedValue = formattedValue.replaceAll(".","/");
		formattedValue = formattedValue.replaceAll(",",grp);
		formattedValue = formattedValue.replaceAll("/",dec);
		currencyValue = formattedValue.split(dec);
		if(decimalPlace === 0){
			formattedValue = currencyValue[0];
		}
		else if(currencyValue.length <= 1 && decimalPlace > 1){
			formattedValue = formattedValue+dec+"00";
		}
        else if(currencyValue.length <= 1 && decimalPlace == 1){
			formattedValue = formattedValue+dec+"0";
		}
		else{
			decPlaceValue = currencyValue[currencyValue.length-1];
			if(decPlaceValue.length === 1 && decimalPlace > 1){
				formattedValue = formattedValue+"0";
			}
		}
	}
	return formattedValue;
}
	/**
	 * This method is used to seperate the currency with base currency seperator.
	 * @param {Number} number - This provides the currency value that is to be seperated using the base currency seperator.
	 * @param {String} k_sep - This provides the custom currency seperator. By default it is set as ",".
	 * @param {String} dec_sep - This provides the decimal seperator. By default it is set as "."
	 * @returns {String} - It returns the currency seperated with the currency seperator.
	 * @example 
	 * currencyUtils.getNumberWithCommas(23456789.122123223,"|",",")
	 * => "23|456|789,122123223"
	 */
currencyUtils.getNumberWithCommas = function(number,k_sep,dec_sep) {//no i18n
	k_sep = k_sep ? k_sep : ",";
	dec_sep = dec_sep ? dec_sep : ".";
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, k_sep);
    return parts.join(dec_sep);
}

	/**
	 * This method is used to check whether the given value is a Whole number or a decimal Number. If it is a whole number it simply returns it. If it is a decimal number is rounded to passed-in decimal places.
	 * @param {Number|String} currVal - This provides the number which has to be validated.
	 * @param {Number|String} decimal - This provides the number of decimal places to be returned if it is a decimal number.
	 * @returns {Number} - It returns either a Whole Or Decimal number depending on the passed-in values.
	 * @example 
	 * currencyUtils.getWholeOrDecimalValue("5")
	 * => 5
	 * currencyUtils.getWholeOrDecimalValue("5.944","2")
	 * => 5.94
	 */
currencyUtils.getWholeOrDecimalValue = function(currVal,decimal){//NO I18N
	if(isNaN(currVal) || currVal.toString().length === 0 ){
		return;
	}else if((currVal - Math.floor(currVal)) === 0){
		return parseFloat(currVal);
	}else{
		return Number(currVal).toFixed(decimal);
	}
}

	/**
	 * This method is used to get the Currency symbol for the corresponding Currency Code that is passed-in as an argument to the method.
	 * @param {String} currencycode - This provides the currency code for which the currency symbol has to be returned.
	 * @returns {String} - It returns the currency Symbol for the provided currency code.Note that by default the method returns '$' if not currencyCode is provided.
	 * @example
	 * currencyUtils.getCurrencySymbol("USD")
	 * => "$"
	 */
currencyUtils.getCurrencySymbol = function( currencycode){
	switch ( currencycode ){
	case "USD" :
		return "$";
	case "CNY" : 
		return "¥ /元";
	case "INR" :
		return decodeURI("\u20B9");//NO I18N
	case "JPY" :
		return "¥";
	case "GBP" : 
		return "£";
	case "AUD" :
		return "$";
	case "SGD" :
		return "$";
	case "MXN" :
		return "$";
	case "EUR" :
		return "€";
	default:
		return "$";
	}
}

currencyUtils.getCurrencyValue = function(value,previousIso,currentIso){
	if(value === ""){
		return value;
	}
	var currencyDetails = _cruxUtils._getProperty().currencyDetails;
	var previousISO_ER = parseFloat(currencyDetails[previousIso].er);
	var newISO_ER = currencyDetails[currentIso].er;
	var baseValue = value / previousISO_ER;
	var newCurrER = parseFloat(newISO_ER);
	var deciLen = parseInt(currencyDetails[currentIso].decimals);
	return commonUtils.roundNumber(baseValue * newCurrER, deciLen) ;
};

currencyUtils.populateCurrencyDetails = function(obj,plc,pg){
	var currencyCode = $ESAPI.encoder().encodeForHTML(obj.value);
	var selectedOption = obj.options[obj.selectedIndex];
	var currencySymbol = selectedOption.getAttribute("symbol");
	var confirmBtn = document.getElementById("confirm_bbtn");
	if(currencyCode == ""){
		showHideDivSpan("active_spn;exchangeRate_div;currencyFormatDiv_"+plc,"none"); //No I18N
		if(pg == 'setup'){
			confirmBtn.setAttribute("disabled","disabled");
		}
		return;
	}
	document.getElementById('currencyName_'+plc).value = selectedOption.innerHTML; //No I18N
	document.getElementById('currencySymbol_'+plc).value = selectedOption.getAttribute("symbol");
	document.getElementById('currFrmtDiv_'+plc).style.display = 'none';
	
	var symbolObj = document.getElementById("currencySymbol_front");
	while (symbolObj.hasChildNodes()) {
		symbolObj.removeChild(symbolObj.lastChild);
	}
	var opt = document.createElement("OPTION");//NO I18N
	opt.setAttribute("value", currencySymbol);//NO I18N
	opt.innerHTML = currencySymbol;
	symbolObj.appendChild(opt);
	if(currencyCode != currencySymbol)
	{
		opt = document.createElement("OPTION");//NO I18N
		opt.setAttribute("value", currencyCode);//NO I18N
		opt.innerHTML = currencyCode;
		symbolObj.appendChild(opt);
	}
	
	var decimalPlace = selectedOption.getAttribute("decimalplace");
	currencyUtils.setCurrencyCustomValue('decimalPlace_'+plc,decimalPlace); //No I18N
	
	var decimalSep = selectedOption.getAttribute("decimalSep");
	currencyUtils.setCurrencyCustomValue('decimalSeparator_'+plc,decimalSep); //No I18N
	
	var thousandSep = selectedOption.getAttribute("thousandSep");
	currencyUtils.setCurrencyCustomValue('thousandSeparator_'+plc,thousandSep); //No I18N
	
	currencyUtils.selectCurrencyFormat(plc); //stands for From Function method is getting called.
	
	showHideDivSpan("active_spn;exchangeRate_div","table-row"); //No I18N
	if($("#currencyFormatDiv_"+plc).prop("tagName") === "DIV"){
		showHideDivSpan("currencyFormatDiv_"+plc,"block"); //No I18N
	}
	else{
		showHideDivSpan("currencyFormatDiv_"+plc,"table-row"); //No I18N
	}
	var eRateObj = getObj('exchangeRate_'+plc);
	if(eRateObj){
		eRateObj.focus();
	}
	if(pg=='setup'){
		confirmBtn.removeAttribute("disabled");
	}
}


currencyUtils.selectCurrencyFormat = function(plc){
	var indianLocales = ['INR','BDT','MMK','PKR'];//no i18n	
	//var indianSymbols = ['PKRs','Tk',decodeURI("\u20B9")];//no i18n
	var currSym = $L('#currencySymbol_'+plc)[0].value;
	let props = _cruxUtils._getProperty();
	if(currencyUtils.validateCurrencySeparators(plc)){
		if(currSym === ""){
			currSym = props.currencyDetails[props.baseCurrency].symbol;
		}
		var decPlc = $L('#decimalPlace_'+plc)[0].value;
		var rawData = "1#234#567@899999";
		
        var isIndianFormatSupportCurrency = false;  
		
        var sep =props.currencyDetails[isoCode].format.split("|");
	    if(sep[2] && sep[2] === '2'){
		   if(sep[0] === ',' && sep[1] === '.'){
	          isIndianFormatSupportCurrency = true; 
	       }else if(indianLocales.includes(isoCode) && (sep[0] !== ',' || sep[1] !== '.')){
		      isIndianFormatSupportCurrency = true;  
	       } 
	    }
		if(isIndianFormatSupportCurrency)
		{
			rawData = "12#34#567@899999";
	    }
		var decSep = getObj("decimalSeparator_"+plc).value;
		var thsndSep = getObj("thousandSeparator_"+plc).value;
		var totalDec = 6;
		rawData = rawData.replace(/#/g,thsndSep);
		if(decPlc == "0"){
			rawData = rawData.substring(0,rawData.indexOf('@'));
		}
		else{
			rawData = rawData.replace("@",decSep);
			rawData = rawData.substring(0,rawData.length-(totalDec-decPlc));
		}
		$('#dispCurrencySymbol_'+plc).empty();
		document.getElementById('dispCurrencySymbol_'+plc).innerHTML = currSym;
		$('#dispCurrencyFormat_'+plc).empty();
		document.getElementById('dispCurrencyFormat_'+plc).innerHTML = $ESAPI.encoder().encodeForHTML(rawData);
		currencyUtils.setHiddenCurrencyFormat(plc);
		return true;
	}
	else{
		return false;
	}
}

currencyUtils.setCurrencyCustomValue = function(Name,val){
	var nameObj = getObj(Name);
	var totalOptions = nameObj.options.length;
	for(var i=0; i < totalOptions; i++){
		if(nameObj.options[i].value == val){
			nameObj.options[i].selected = true;
		}
	}
}
	

currencyUtils.setHiddenCurrencyFormat = function(plc){
	var decSep = getObj("decimalSeparator_"+plc).value;
	var thsndSep = getObj("thousandSeparator_"+plc).value;
	getObj("currencyFormat_"+plc).value = thsndSep+"|"+decSep;
}

currencyUtils.validateCurrencySeparators = function(plc){
		var decPlc=getObj("decimalPlace_"+plc).value;
		if(decPlc==0){
			getObj("decimalSeparator_tr_"+plc).style.display="none";
		}
		else{
			getObj("decimalSeparator_tr_"+plc).style.display="";
		}
		var decSeparator=getObj("decimalSeparator_"+plc).value;
		var thousandSeparator=getObj("thousandSeparator_"+plc).value;
		if(decPlc!=0 && decSeparator==thousandSeparator){		
			document.getElementById("customize_err_"+plc).style.visibility = "visible";
			document.getElementById("ok_btn_"+plc).setAttribute("disabled","disabled");
			return false;
		}
		else{
			document.getElementById("customize_err_"+plc).style.visibility = "hidden";
			document.getElementById("ok_btn_"+plc).removeAttribute("disabled");
			return true;
		}		
	}
	
currencyUtils.isIndianFormatSupportCurrency =  function(isoCode){
	let props = _cruxUtils._getProperty();
	var indianLocales = ['INR','BDT','MMK','PKR'];//no i18n
	if(props.isMultiCurrencyEnabled && props.currencyDetails[isoCode]){
	   var sep = props.currencyDetails[isoCode].format.split("|");
	   if(sep[2]){
		 if(sep[2] === '2' && sep[0] === ',' && sep[1] === '.'){
		    return true; 
	     }else if(sep[2] === '2' && indianLocales.includes(isoCode) && (sep[0] !== ',' || sep[1] !== '.')){
			return true;  
		 } 
	   }else if(indianLocales.includes(isoCode)){
		  return true;  
	   }
	}else if(indianLocales.includes(isoCode) || indianLocales.includes(props.defaultCurrencyISOCode)){
		return true;  
	}
	return false;
}
currencyUtils.isCurrencyField = function(uiType){
   return uiType == CrmField.UITYPES.CURRENCY || uiType == CrmField.UITYPES.CURRENCY_ROUND_OFF || uiType == CrmField.UITYPES.CURRENCY_ROUND_DOWN || uiType == CrmField.UITYPES.CURRENCY_ROUND_UP;
}
currencyUtils.getOperatorsLen = function(val){
   var matches = val.match(new RegExp('[+-/*.]' , 'g'));
   return matches ? matches.length : 0;
}
currencyUtils.getDefaultCurrencySymbol = function(){
	let props = _cruxUtils._getProperty();
	return props.isMultiCurrencyEnabled ? props.currencyDetails[props.baseCurrency].symbol : props.defaultOrgCurrency;
};
