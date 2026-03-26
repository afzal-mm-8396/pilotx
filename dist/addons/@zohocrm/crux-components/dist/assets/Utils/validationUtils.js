// $Id$
/**
 * @namespace
 */
var validationUtils = {
	emailRegex : /^[\p{L}\p{M}\p{N}_\-]([\p{L}\p{M}\p{N}!#$%&'*+\-/=?^_`{|}~.]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([-_]*[\p{L}\p{M}\p{N}])*)[.])+[\p{L}\p{M}]{2,22}$/,  //No I18N
	emailRegexOfUser : /^[\w](['A-Za-z0-9._%\-+]*@[A-Za-z0-9-]+(\.[a-zA-Z0-9-]{1,30}){0,9}\.[a-zA-Z]{2,22})$/
}; 

   /**
	* Returns *true* if an enumerable **object** contains no values (no enumerable own-properties). For strings and array-like objects empty checks if the length property is 0.
	* @param {Object|Array|String} obj - This provides the object to be validated i.e, to check whether it is empty or not.
	* @returns {Boolean} - It returns true if the passed in argument is empty and false if not.
	* @example
	* validationUtils.isEmpty([1, 2, 3]); 
	* => false
	* validationUtils.isEmpty({}); 
	* => true
	*/
validationUtils.isEmpty = function(obj) {
	 try{
		 var tempObj = null;
		 if (!obj || obj === "null" || obj === "NULL" || obj === "empty" || obj === "EMPTY" || obj === "undefined" || obj === "UNDEFINED"){//No I18N
			 return true;
		 }else if(typeof obj !== "object" && typeof obj === "string"){//No I18N
			 tempObj = obj.replace( /[ ]/g , "");
		 }
		 else if(typeof obj === "object"){//No I18N
			 return Object.keys(obj).length < 1 ? true : false;
		 }
		 if(tempObj === ""){
			 return true;

		 }else{
			 return false;
		 }
	 }
	 catch(e){
		 return true;
	 }
}

   /**
	* Returns *true* if an enumerable **object** contains values.
	* @param {Object|Array|String} obj - This provides the object to be validated.
	* @returns {Boolean} - It returns true if the passed in argument is not empty and false if not.
	* @example
	* validationUtils.isNotEmpty([1, 2, 3]); 
	* => true
	* validationUtils.isNotEmpty({}); 
	* => false
	*/
validationUtils.isNotEmpty = function (obj){
	return !this.isEmpty(obj);
}

	/**
	 * Returns *true* if **value** is *undefined*.
	 * @param {Object} source - This provides the object that is to be validated i.e, to check whether Object is undefined or or not.
	 * @param {String} key - This provides the key of the Object to check whether its value is empty or not. i.e, to check whether the object has key with empty values 
	 * @returns {Boolean} - It returns true if the passed in object is undefined and false if not.
	 * @example 
	 * validationUtils.isUndefined({a:""},"a");
	 * => true
	 */
validationUtils.isUndefined = function(source,key){
	if(typeof source === "undefined" || !source){ // NO I18N 
		return true;
	} 
	else if(typeof source === "object"){
		var value = source[key];
		return typeof value === "undefined" || !value; // NO I18N
	}
	return false;
}

	/**
	 * This method is used to check whether the particular HTML field is empty i.e, it checks whether it is a date field or radio or checkbox or select field.
	 * @param {jQueryElement} Jelement - This provides the JQueryElement which is to be validated.
	 * @returns {Boolean} It returns true if the passed-in JQueryElement Field is empty and false if not.
	 * @example
	 * validationUtils.isFieldEmpty($("input#cVarNAME.textField"))
	 * => true // if text is empty
	 */
validationUtils.isFieldEmpty = function(Jelement) {
	var type = Jelement.prop("type");// No I18N
	var val = commonUtils.getValue(Jelement);
	if (val == undefined && Jelement[0] && Jelement[0].component && Jelement[0].getAttribute("type") === "single") { // No I18N
		var val = Jelement[0].component.data.userId;
	}
	if (type === "text" && (Jelement.data("contentType") && Jelement.data("contentType").toLowerCase().indexOf("date") !== -1)) { // No I18N
		// Should check whether it is date field so it will contain date format so exclude it
		val = val.replace(Crm.userDetails.DATE_PATTERN, "");
	} else if (type === "radio") {
		var propertyName = Jelement.prop("name");// No I18N
		val = commonUtils.getRadioValue(propertyName);
	} else if (type === "checkbox") {
		val = Jelement.is(":checked") ? "true" : "false";// No I18N
	} else if (type === "combo" || type === "select-one" || type === "select") {
		if (val) {
			val = val.replace(/-None-|none|None/g, "");
		}
	}
	return validationUtils.isEmptyString(val);
}

	/**
	 * This method is used to validate the passed-in record email Id.
	 * @param {String} emailId - The emailId to be validated is passed to the function.
	 * @returns {Boolean} - It returns true if the emailId is valid and False if not.
	 * @example
	 * validationUtils.isValidEmail("example@zohocorp.com") 
	 * => true
	 */
validationUtils.isValidEmail = function(emailId){//No I18N
	if(emailId == "") { 
		return true;
	}
	else if(emailId == undefined)
	{
	   return false;
	}
	var objRegExp = new XRegExp(validationUtils.emailRegex.source,"i");       //No I18N
	return XRegExp.test(emailId.trim(), objRegExp);
	
}
  
	/**
	 * This method is used to validate the given user emailid.
	 * @param {String} emailId - The emailId of the user to be validated is passed to the method.
	 * @returns {Boolean} - It returns true if the emailId is valid and False if not.
	 * @example
	 * validationUtils.isValidEmailOfUser("example@zohocorp.com") 
	 * => true
	 */
validationUtils.isValidEmailOfUser = function(emailId){//No I18N
	if(emailId == "") { 
		return true; 
	}
	var reg = validationUtils.emailRegexOfUser;
	return reg.test(emailId);
}

	/**
	 * This method is used to Validates the given pattern. Parameters  regex  pattern and value to validate.
	 * @param {String} pattern - This provides a regex pattern which is used to validate the passed in value.
	 * @param {String} value -  This provides the value that has to be validated.
	 * @returns {Boolean} - It returns true if the value matches the pattern and False if not.
	 * @example
	 * validationUtils.validatePattern("/^\d{1,2}(\:\d{1,2})*$/","01:02:03") 
	 * => true
	 */
validationUtils.validatePattern = function(pattern,value){//No I18N
	if(value == "") { 
		return true; 
	}
	else if(value  == undefined)
	{
		return  false;
	}
	var objRegExp = new XRegExp(pattern.source,"i"); // No I18N
	return XRegExp.test(value.trim(), objRegExp);
}

	/**
	 * This method is used to validate the passed-in twitter id.
	 * @param {String} twitterId - The twitters Id to be validated is passed to the function.
	 * @returns {Boolean} - It returns true if the twitter id is valid and False if not.
	 * @example 
	 * validationUtils.isValidTwitter("twitter_example") 
	 * => true
	 */
validationUtils.isValidTwitter = function(twitterId) {// no i18n
	if (twitterId === "") {
		return true;
	}
	if (twitterId.trim().length <= 50 && twitterId.trim().length > 0) {
		var twNamePattern = /^[a-zA-Z0-9_]*$/;
		return twNamePattern.test(twitterId);
	}
}

	/**
	 * This method is used to validate the domain names.
	 * @param {String} server - The server domain name to be validated is provided.
	 * @returns {Boolean} - It returns true if the server is valid and False if not.
	 * @example 
	 * validationUtils.isValidDomain("crm.zoho.com") 
	 * => true
	 */
validationUtils.isValidDomain = function(server) { // No I18N
	if (server === "") {
		return true;
	}
	var domainRegex = new RegExp("^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z]{2,22}$");// No I18N
	return domainRegex.test(server);
}

	/**
	 * This method is used to validate the web Urls.
	 * @param {String} url - The Url to be validated is provided.
	 * @returns {Boolean} - It returns true if the Url is valid and False if not.
	 * @example 
	 * validationUtils.isValidWebUrl("https://crm.zoho.com")
	 * => true
	 */
validationUtils.isValidWebUrl = function(url){//No I18N
    if(url === ""){
    	return true; 
    }
    var httpProtocol = "http"; //No I18N
    var httpsProtocol = "https"; //No I18N
    //Values are blacklisted here in client side based on ASCII Code
    var urlregex = new RegExp("^("+httpProtocol+":\\/\\/www.|"+httpsProtocol+":\\/\\/www.|ftp:\\/\\/www.|www.|"+httpProtocol+":\\/\\/|"+httpsProtocol+":\\/\\/|ftp:\\/\\/|){1}[^\x00-\x19\x22-\x27\x2A-\x2C\x2E-\x2F\x3A-\x3F\x5B-\x5E\x60\x7B\x7D-\x7F]+(\\.[^\x00-\x19\x22\x24-\x2C\x2E-\x2F\x3C\x3E\x40\x5B-\x5E\x60\x7B\x7D-\x7F]+)+([/?].*)*$");
    return urlregex.test(url);    
}

	/**
	 * This method is used to validate the web Urls and display necessary error div based on the alertType
	 * @param {String} fldLabel - The field label which has to be validated.
	 * @param {String} value - The Url to be validated is provided.
	 * @param {String} alertType - This provides whether the alert is inline or not.
	 * @param {String} elem - This provides the element in which the error div has to be displayed.
	 * @returns {Boolean} - It returns true if the Url is valid and False if not.
	 */
validationUtils.isValidWebURL_extended = function(fldLabel, value, alertType, elem, translatedFieldLabel){
	var httpProtocol = "http"; //No I18N
	var httpsProtocol = "https"; //No I18N
	var urlregex = new RegExp("^("+httpProtocol+":\\/\\/www.|"+httpsProtocol+":\\/\\/www.|ftp:\\/\\/www.|www.|"+httpProtocol+":\\/\\/|"+httpsProtocol+":\\/\\/|ftp:\\/\\/|){1}[^\x00-\x19\x22-\x2C\x2E-\x2F\x3A-\x40\x5B-\x5E\x60\x7B-\x7F]+(\\.[^\x00-\x19\x22\x24-\x2C\x2E-\x2F\x3C-\x3E\x40\x5B-\x5E\x60\x7B-\x7F]+)+(/[^\x00-\x19\x22\x28-\x29\x3C\x3E\x5E\x7B-\x7D\x7F]*)*$");
	if(urlregex.test(value) )	{
		return true;
	}
	var replacedFldLabel = fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
	var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : replacedFldLabel)); //No I18N
	if(alertType === 'inline')	{
		if($(elem).closest('.labelValCreate').length)	{
			commonUtils.showErrorMsg(alertMsg,$(elem));
		}
		else{
			renderingUtils.displayErrorDiv(fldLabel, undefined, alertMsg, elem);
		}
	}
	else{
		if(fldLabel === 'Link'){
			//eslint-disable-next-line @zoho/webperf/no-show
			$("#invalid_webUrl").text(alertMsg).show().closest('td').addClass('crmNegativeColor'); //No I18N
		}
		else{	
			alert(alertMsg); // eslint-disable-line no-alert
		}
	}
	return false;
}


	/**
	 * This method is used to check whether the passed-in string is a valid integer or not.
	 * @param {String} val -This provides the string that has to be validated.
	 * @returns {Boolean} - It returns true if the string is a valid integer and false if not.
	 * @example 
	 * validationUtils.isValidInteger("-43") 
	 * => true
	 */
validationUtils.isValidInteger = function(val) {// No I18N
	if (val === "") {
		return true;
	}
	var re = /^-?\d+(,(\d)+)*$/
	if (isNaN(val) || val.indexOf(".") !== -1 || !re.test(val)) {
		return false;
	}
	return true;
}
	
	/**
	 * This method is used to check whether the passed-in number is a valid Number or not.
	 * @param {Number} val -This provides the Number that has to be validated.
	 * @param {Number} decimalLen - This provides the maximum possible length for the passed-in Number
	 * @returns {Boolean} - It returns true if the Number with the provided decimal length is valid and false if not.
	 * @example 
	 * validationUtils.isValidNumber( 22222.2222 , 5) 
	 * => true
	 */
validationUtils.isValidNumber = function(val, decimalLen) {// No I18N
	var reg = /^-?(\d+)(\.)*(\d+)*$/;
	var valArr = reg.exec(val);
	if (!valArr) {
		return false;
	}
	var decimalVal = valArr[3];
	if (decimalVal) {
		if (decimalLen && decimalVal.length > decimalLen) {
			return false;
		}
	}
	return true;
}

	/**
	 * This method is used ot check whether the given value is decimal, It also checks the length of the base value and decimal points.
	 * @param {Number} val - This gives the Number with decimal point .
	 * @param {Number} baselen - This is the length of base i.e, the number value before decimal point.
	 * @param {Number} decimallen - This is the length of the decimal i.e, the number value after decimal point.
	 * @param {Object} resultObj - This provides an object which is set with these properties maxlengthFailed,decimalLengthCheckFailed if there is a mismatch with the passed in baselen and decimallen.
	 * @returns {Boolean} - It returns true if both base value/length and decimal value/length is valid and false if not
	 * @example 
	 * validationUtils.isValidDecimal(12345.56789,5,5,{}) 
	 * => true
	 * validationUtils.isValidDecimal(12345.56789,4,5,{}) 
	 * => false (resultObj = {maxlengthFailed : true})
	 */
validationUtils.isValidDecimal = function(val,baselen,decimallen,resultObj){//No I18N
	if(val === ""){
		return true;
	}
	val = val + '';
	//below code is to avoid value contains only dot 
	if( val.indexOf(".") !== -1 ){
		var splitedVal = val.split('.');
		if( splitedVal[0] === "" && splitedVal[1] === "" ){
			return false;
		}
	}
	if(val.split('.')[0].length === 0){
		 val = 0 + val;
	}
	var reg = /^-?(\d+)?(\.){0,1}(\d+)*$/; 
    var valArr = reg.exec(val);
    if(!valArr){
      	return false;    
    }
    var baseVal = valArr[1]; 
    var decimalVal = valArr[3];

    if(baseVal == undefined && decimalVal == undefined){
    	return false;
    }
        
	if( ( baseVal ? baseVal.length : 0 ) + ( decimalVal ? decimalVal.length : 0 ) <= baselen + decimallen){
		if(baseVal){
			baselen = baseVal.length;
		}
		if(decimalVal){
			decimallen = decimalVal.length;
		}
	}
    if(!decimalVal){
    	baselen += decimallen;
    }
    if(baseVal){
    	if(!validationUtils.isValidInteger(baseVal)){
    		return false;
		}
    	if(baseVal.length > baselen){
    		if(resultObj)
    		{
        		resultObj.maxlengthFailed = true;
    		}
            return false;
		}
    }
    if( decimalVal){
    	if(!validationUtils.isValidInteger(decimalVal)){
    		 return false;
		}
    	if(decimalVal.length > decimallen){
    		if(resultObj){
    			resultObj.decimalLengthCheckFailed = true;
    		}
    		return false;
		}
       
    }
    return true;
 }
    
	/**
	 * This method is used to validate the length of the decimal
	 * @param {Number} val - This gives the number with/without decimal point
	 * @param {Number} decimalLen - This is the maximum possible length of the decimal.
	 * @returns {Boolean} - It returns true if the length of decimal is within the maximum passed-in length and false if not.
	 * @example 
	 * validationUtils.decimalLengthCheck(21435.5678,4) 
	 * => true
	 */
validationUtils.decimalLengthCheck = function(val, decimalLen) {// no i18n
	if (val === "") {
		return true;
	}
	var reg = /^-?(\d+)?(\.){0,1}(\d+)*$/;
	var valArr = reg.exec(val);
	if (!valArr) {
		return false;
	}
	var decimalVal = valArr[3];
	if (decimalVal && decimalVal.length > decimalLen) {
		return false;
	}
	return true;
}

	/**
	 * This method is used to split the emails and validate each email
	 * @param {String} elemId - This provides the ID of the field element from which the list of email's are taken.
	 * @returns {Boolean} - It returns true if the list of emails are set to be true and false if not.
	 * @example 
	 * validationUtils.validateCommaSepEmails("invMoreEmails")
	 * => true //if all emails are seperated by comma 
	 * => false // if all emails are not seperated by comma and alert's the user with a custom Message.
	 */
validationUtils.validateCommaSepEmails = function(elemId) {// No I18n
	var elem = $("#" + elemId)
	var emailIds = elem.val();
	if (!emailIds) {
		return true;
	}
	if (emailIds !== "") {
		var emailArr = emailIds.split(",");
		var len = emailArr.length;
		for (var k = 0; k < len; k++) {
			var email = trimBoth(emailArr[k]);
			if (!validationUtils.isValidEmail(email)) {
				var emailArr = emailIds.split(",");
				renderingUtils.showCustomAlert(I18n.getMsg("crm.email.comma"));
				elem.focus();
				return false;
			}
		}
	}
	return true;
}

	/**
	 * This method is used to check whether the limit of TO's,Cc's,Bcc's is reached or not i.e, it checks for total limit of 50
	 * @param {String} to - This param is used to show the number of senders.
	 * @param {String} cc - This is used to show the number of Carbon copy senders.
	 * @param {String} bcc - This is used to show the number of Blind Carbon copy senders.
	 * @param {Number} maxEmail - This is the maximum limit of no of senders. By default the maximum limit is 50.
	 * @returns {Boolean} - It returns True if the Email's Limit is exceeded above maxEmail and False if not
	 * @example 
	 * validationUtils.checkEmailLimitExceed(["example@test.com","example@test.com"..],["example@test.com","example@test.com"..],["example@test.com","example@test.com"..],100)
	 * // if the total length of email exceeds the passed-in limit it will return false
	 * => false 
	 * // if not 
	 * => true
	 */
validationUtils.checkEmailLimitExceed = function(to, cc, bcc, maxEmail) {
	var toArr = to.split(",");
	var ccArr = [];
	var bccArr = [];
	maxEmail = maxEmail? maxEmail : 50;
	if (cc !== "null") {
		ccArr = cc.split(",");
	}
	if (bcc !== "null") {
		bccArr = bcc.split(",");
	}
	var emailArrLen = toArr.length + ccArr.length + bccArr.length;
	if (emailArrLen > maxEmail) {
		return true;
	} else {
		return false;
	}
}

	/**
	 * This method is used to check whether the passed-in number is a integer or not
	 * @param {Number} num - This provides the number that is to be validated as a number or not.
	 * @returns {Number} - It returns true if the passed-in number is a integer and false ifnot
	 * @example 
	 * validationUtils.isInteger(-23) 
	 * => true
	 */
validationUtils.isInteger = function(num) {
	return isNaN(num) || parseFloat(num) % 1 !== 0 ? false : true;
}

	/**
	 * This method is used to check the validity of a passed-in phone number in the input form.
	 * @param {jQueryElement} fldObj - This provides the JqueryElement/Input form in which the phone number is being validated.
	 * @param {String} fldValue - This provides the value inside the JqueryElement/Input form.
	 * @returns {Boolean} It returns true if the number is a valid one and false if not.
	 * @example 
	 * validationUtils.isValidPhoneNo($("crm_Leads_PHONE").textfield,"044-555555555")
	 *  => true
	 */
validationUtils.isValidPhoneNo = function(fldObj, fldValue) {// No I18N
	if (fldValue) {
		if(typeof Crm !== "undefined" && Crm.userDetails.isPhoneNoNewView && typeof CrmPhoneNumberInput !== "undefined"){
    			fldValue = CrmPhoneNumberInput.getValueFromPhoneFieldComp(fldObj, fldValue);
    	}
		var re = /^([\+]?)(?![\.-])((?=([\.-]?[ ]?[\da-zA-Z]+))\3+|([ ]?\((?![\.-])(?=[ \.-]?[\da-zA-Z]+)([ \.-]?[\da-zA-Z]+)+\)(?!\.)([ -][\da-zA-Z]+)?)+)+((([,]+)?[;]?[\da-zA-Z]+)+(([#][\da-zA-Z]+)+)?)?[#;]?$/; /* eslint-disable-line no-useless-escape */   
		var maxLength = fldObj.attr("maxlength"); // No I18N
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
		tempVal = tempVal.replace(/\)(?![\s;,\-\/])/g, ") "); 
		var len = tempVal.length;
		if (tempVal === "") {
			return false;
		}
		var tempfldVal = tempVal[0];
		for (var i = 1; i < len; i++) {
			if (tempVal[i] === "(" && tempVal[i - 1] !== " ") {
				tempfldVal = tempfldVal + " " + tempVal[i];
			} else {
				tempfldVal = tempfldVal + tempVal[i];
			}
		}
		tempfldVal = tempfldVal.replace(/^\s+/, "");
		tempfldVal = tempfldVal.replace(/\s+$/, "");
		if (tempfldVal.length <= maxLength) {
			fldValue = tempfldVal;
		}
		if (re.test(fldValue)) {
			if(typeof Crm !== "undefined" && Crm.userDetails.isPhoneNoNewView && typeof CrmPhoneNumberInput !== "undefined"){
        			return CrmPhoneNumberInput.validatePhoneNumber(fldObj);
        	}
			fldObj.val(fldValue);
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}

}

	/**
	 * This method is used to check whether the given variable is a JSON or not
	 * @param {Object} obj - This provides the JSON Object that is to be validated
	 * @returns {Boolean} - It returns true if the passed-in value is a JSON object and false if not.
	 * @example 
	 * validationUtils.isJson({ module : "Leads", id : "3555310000000185247"}) 
	 * =>true
	 */
validationUtils.isJson = function(obj) {
	try {
		if (typeof obj === 'object' || JSON.parse(obj)) {
			return true;
		}
	} catch (e) {
		 /* eslint-disable-line @zoho/zohocrm/murphy-error */
	}
	return false;
}

	/**
	 * This method is used to check whether the given variable is a JSON or not. In addition to it checks whether the type of object passed is not of type Number.
	 * @param {Object} obj - This provides the JSON Object that is to be validated
	 * @returns {Boolean} - It returns true if the passed-in value is a JSON object and false if not.
	 * @example 
	 * validationUtils.isJsonCheck({ module : "Leads", id : "3555310000000185247"}) 
	 * =>true
	 */
validationUtils.isJsonCheck = function(obj){
	try{
		if(typeof obj === 'object' || JSON.parse(obj) && !typeof obj === 'number'){
			return true;
		}
	}
	catch(e){
		    /* eslint-disable-line @zoho/zohocrm/murphy-error */
	}
	return false;
}

	/**
	 * This method is used to check whether the given string is a JSON or not.
	 * @param {String} str - This provides the JSON Object that is to be validated in the form of String
	 * @returns {Boolean} - It returns true if the passed-in value is a JSON object and false if not.
	 * @example 
	 * validationUtils.isJsonCheck("{ module : "Leads", id : "3555310000000185247"}") 
	 * =>true
	 */
validationUtils.IsJsonString =  function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


	/**
	 * This method is used to check whether the provided string is empty or not.
	 * @param {String} val - This provides the string that is to be validated as empty or not.
	 * @returns {Boolean} -It returns true if the provided string is empty and false if not.
	 * @example
	 * validationUtils.isEmptyString(undefined | null)
	 * => true
	 * validationUtils.isEmptyString(" " | "")
	 * => true
	 */
validationUtils.isEmptyString = function(val){//No I18N
    return val == null || (typeof val === "string" && val.trim().length === 0);//No I18N
}
validationUtils.validateRange = function(fieldName, fieldLabel, range, formName, alertType, alertDetails, fielddetails){
    var errorMsg = "";
    var isValid = true;
    var isAlertNeeded = (alertDetails) ? alertDetails.isAlertNeeded : true;
	if(range){
		var elem = {
			range: range,
			ui_type: fielddetails && fielddetails.uitype,
			IsoCode: fielddetails && fielddetails.isocode,
			field_label: fielddetails && fielddetails.fieldlabel
		}
		if((range.to || range.to === 0) && (range.from || range.from === 0) && (!validationUtils.numConstComp(fieldName, fieldLabel, "BETWEEN",{"from":range.from,"to":range.to},formName, alertType,isAlertNeeded,errorMsg))){
			// errorMsg = I18n.getMsg("crm.radiobutton.max.min.value", [range.to, range.from]);
			errorMsg = crmTemplate.getErrLiteralforSlider("min_max_value_check", elem, false, false); //No I18N
			isValid = false;
		}
		if((range.to || range.to === 0) && isValid && (!validationUtils.numConstComp(fieldName, fieldLabel, "LE",range.to,formName, alertType,isAlertNeeded,errorMsg))){
			// errorMsg = _cruxUtils.getI18n("crm.custom.field.less.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel), range.to);//No I18N
			errorMsg = crmTemplate.getErrLiteralforSlider("max_value_check", elem, false, false); //No I18N
			isValid = false;
		}
		if((range.from || range.from === 0) && isValid && !validationUtils.numConstComp(fieldName, fieldLabel, "GE",range.from,formName, alertType,isAlertNeeded,errorMsg) ){
			// errorMsg =_cruxUtils.getI18n("crm.custom.field.greater.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel), range.from);//No I18N
			errorMsg = crmTemplate.getErrLiteralforSlider("min_value_check", elem, false, false); //No I18N
			isValid = false;
		}
		if(!isAlertNeeded && errorMsg !== ''){
			renderingUtils.displayAlert(fieldName,undefined,errorMsg,getObj(fieldName));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
		}
	}
	return isValid;
}

validationUtils.validateRangewithVal= function(range,fieldVal,fieldLabel){
	 var errorMsg = "";
     var isValid = true;
     if(range){
		if((range.from || range.from === 0) && fieldVal < range.from){
			 errorMsg =_cruxUtils.getI18n("crm.custom.field.greater.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel), range.from);//No I18N
			 isValid = false;
		 }
		 else if((range.to || range.to === 0) && fieldVal > range.to){
			errorMsg = _cruxUtils.getI18n("crm.custom.field.less.than.equalto", Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel), range.to);//No I18N
			isValid = false;
		}
		if(!isValid && (range.from || range.from === 0) && (range.to || range.to === 0)){
			errorMsg = I18n.getMsg("crm.radiobutton.max.min.value",[Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel),range.from,range.to]);
		}
	 }
	 return {"isValid" : isValid, "errorMsg" : errorMsg};//No I18N
}
	/**
	 * This method is used to validate the values present within a field of type email,date,time and phone
	 * @param {String} fldName - This provides the value present within the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} type - This provides the type of field that has to be validated 
	 * @param {Boolean} isValue - This is set to true if there is value inside the field 
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {HTMLElement} currObj - This provides the current object that has to be validated.
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @param {String} entityType - This provides the type of entity whether it is user or not
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.patternValidate = function(fldName,fldLabel,type,isValue,formName, currObj,alertType,entityType,isAlertNeeded=true,isI18n=false, translatedFieldLabel) {
	if(!isValue && !currObj){
		var currObj=getElm(formName,fldName);
	    if(currObj==null){
	    	currObj=getElm(formName,"property('+fldLabel+')") //no i18n
	    }
	}
	var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
	if(!isValue){
    	var ptVal=currObj.value;
	}
    else{
		var ptVal=fldName;
	}
    if (type.toUpperCase()=="EMAIL"){ //Email ID validation
    	var re =  validationUtils.emailRegex;
    	if(entityType!=null && entityType == 'User'){
    		   re =  validationUtils.emailRegexOfUser;
    	}
	}

    if (type.toUpperCase()=="DATE") {//DATE validation
    	var userDateFormatTemp = Crm.userDetails.DATE_PATTERN ? Crm.userDetails.DATE_PATTERN.toUpperCase() : userDateFrmtinCE;
		try{
			var crmDate = new CrmDate(CrmDateUtils.getDateObjectFromString(ptVal, userDateFormatTemp,isI18n));
			return crmDate.validate();
		}
		catch(e){
			return false;
		}
    }

    if (type.toUpperCase()=="TIME") {//TIME validation
        var re = /^\d{1,2}(:\d{1,2})*$/
    }

	var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : replacedFldLabel)); //No I18N
    if (type.toUpperCase()=="PHONE"){
    	if(!validationUtils.isValidPhoneNo($(currObj),ptVal)){
    		if(isAlertNeeded){
    		if(Search.isVRCriteria){
	    		$(".validationRuleCongureWarningMsg").text(alertMsg).show();//NO I18N
			}
    		else{
    			renderingUtils.displayAlert(fldName, undefined, alertMsg, currObj,alertType);
    		}

    		if(!isValue){
	 	    	currObj.setAttribute("autocomplete","off");
	 	        currObj.focus()
	 		}
    		}
	 	        return false
    	}
    }
    else if (!validationUtils.validatePattern(re,trimBoth(ptVal))){
    	if(isAlertNeeded){
	  	if(Search.isVRCriteria){
    		$(".validationRuleCongureWarningMsg").text(alertMsg).show();//NO I18N
		}
	  	else{
	  		renderingUtils.displayAlert(fldName, undefined, alertMsg, currObj,alertType);
	  	}

    	if(!isValue){
 	    	currObj.setAttribute("autocomplete","off");
 	        currObj.focus()
 		}
    	}
        return false
	 	   
    }
    else{
		var parentComp = $(currObj).parent();
		if(parentComp.length>0)
		{
			parentComp.find('.form_err_msg').remove();
		}

	}
}

	/**
	 * This method is used to validate the values present within a field of type email.
	 * @param {String} fldName - This provides the value present within the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @param {String} entityType - This provides the type of entity whether it is user or not
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.emailValidate = function(fldName,fldLabel,formName,alertType,entityType,isAlertNeeded=true, translatedFieldLabel) {
	if(validationUtils.patternValidate(fldName,fldLabel,"EMAIL",undefined,formName,undefined,alertType,entityType,isAlertNeeded, false, translatedFieldLabel)===false){
		return false;
	}
        return true;
}

	/**
	 * This method is used to validate the decimal number values passed to the fields with specific format or any format
	 * @param {String} fldName - This provides the name of the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} format - This provides the format of the decimal number that has to be validated.
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.decimalValidate = function(fldName,fldLabel,format,formName,alertType,isAlertNeeded=true, translatedFieldLabel) {
	var fldObj = fldName;
	if(fldName != null && typeof fldName == "string"){
		fldObj=getElm(formName,fldName);
		if(!fldObj){
  	     fldName = "property("+fldLabel+")";//No I18N
  	     fldObj = getElm(formName,fldName);
  	    }
  	 }
	var replacedFldLabel = fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
	replacedFldLabel = translatedFieldLabel ? translatedFieldLabel : replacedFldLabel;
	if (fldObj != null && fldObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
		var val=fldObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '')
		var re=/^-?\d+(\.\d\d*)*$/
		if(val.split('.')[0].length==0){
			val = 0+val;
		}
        if (!re.test(val)) {
        	if(isAlertNeeded){
      		var alertMsg = I18n.getValueForFields("crm.field.valid.check",replacedFldLabel); //No I18N
      		renderingUtils.displayAlert(fldName,fldLabel,alertMsg,fldObj,alertType);
      		fldObj.setAttribute("autocomplete","off");
        	fldObj.focus()
        	}
        	return false
        }
		 else if(!validationUtils.decimalLengthCheck(val,format)){
			var alertMsg = I18n.getValueForFields("crm.field.valid.decimal.cal.check",[replacedFldLabel,format]); //No I18N
			renderingUtils.displayAlert(fldName,fldLabel,alertMsg,fldObj,alertType);
			fldObj.setAttribute("autocomplete","off");
	    	fldObj.focus()
	    	return false
		 }
		 else{
			 return true
		 }
    }
   else{
	   return true
   }
}

	/**
	 * This method is used to validate the numeric values passed to the fields with specific format or any format
	 * @param {String} fldName - This provides the name of the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} format - This provides the format of the decimal number that has to be validated.
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.numValidate = function(fldName,fldLabel,format,formName,alertType,isAlertNeeded=true, translatedFieldLabel) {
	var numField = getElm(formName,fldName)
	var val = numField.value.replace(/^\s+/g, '').replace(/\s+$/g, '')
	if (numField != null && numField.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
		if (format!="any" && parseInt(format) != 0) {
        	var format = format.split(",")
        	var restr = "^-?\\d+((\\d)+)*(\\.\\d{1,"+format[0]+"})?$";//NO I18N
        	var re = new RegExp(restr)
    	}
		else {
			var re = /^-?\d+((\d)+)*(\.\d{1,2})?$/
    	}
        if (!re.test(val)) {
        	if(isAlertNeeded){
      		if($("#fieldUpdateValidationType").val() == "inline" || alertType == "inline"){
      			renderingUtils.displayErrorDiv(fldName, fldLabel, I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : fldLabel)) );//NO I18N
      		}
      		else {
      			_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : fldLabel)) } });//No I18N
      		}
      		numField.setAttribute("autocomplete","off");
      		numField.focus()
        	}
        	return false
    	}
        else{
        	if(isAlertNeeded){
        	numField.value = val
        	}return true
        }
   }
   else{
	   return true
   }
}

	/**
	 * This method is used to validate the phone number fields 
	 * @param {String} fldName - This provides the name of the phone number field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the phone number field that has to be validated 
	 * @param {String} formName - This provides the form name within which the phone number field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.phoneValidate = function(fldName,fldLabel,formName,alertType,isAlertNeeded=true, translatedFieldLabel) {
	if(validationUtils.patternValidate(fldName,fldLabel,"PHONE",undefined,formName,undefined,alertType,undefined,isAlertNeeded, false, translatedFieldLabel)===false){
		return false; }
	return true;
}

	/**
	 * This method is used to validate the integer values passed to the fields
	 * @param {String} fldName - This provides the name of the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.intValidate = function(fldName,fldLabel,formName,alertType,isAlertNeeded=true, translatedFieldLabel) {
	var currObj = getElm(formName,fldName);
   if (currObj != null && currObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	   	var val = getElm(formName,fldName).value.replace(/^\s+/g, '').replace(/\s+$/g, '');
	   	var alertMsg = I18n.getValueForFields("crm.field.valid.check",(translatedFieldLabel ? translatedFieldLabel : fldLabel));//No I18N
    	if (!validationUtils.isValidInteger(val)){
    		if(isAlertNeeded){
    		if(alertType != undefined){
    			alertMsg = I18n.getValueForFields("crm.field.valid.check", (translatedFieldLabel ? translatedFieldLabel : $ESAPI.encoder().encodeForHTML(fldLabel)));//No I18N
	   		}
      		renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
      		currObj.setAttribute("autocomplete","off");
			try{
				currObj.focus()
			}
			catch(e){
				murphy.error(e)
			}
    		}
        	return false
    	}
        else{
        	currObj.value = currObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '');
            return true
        }
   }
   else{
        return true
   }
}

	/**
	 * This method is used to compare two numeric values and display the respective alert.
	 * @param {String} fldName - This provides the name of the field which has to be compared with the constant value
	 * @param {String} fldLabel - This provides the label or name of the field that has to be compared with the constant value
	 * @param {String} type - This provides the type of date field whether it is 'L' , 'LE' etc...
	 * @param {String} constval - This provides the constant that has to be compared with the value within the provided field
	 * @param {String} formName - This provides the form name within which the field value has to be compared 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.numConstComp = function(fldName,fldLabel,type,constval,formName,alertType,isAlertNeeded=true,customErrMsg, translatedFieldLabel) {
    var currObj = getElm(formName,fldName);
  	 if(!currObj){
  	     fldName = "property("+fldLabel+")";//No I18N
  	     currObj=getElm(formName,fldName);
  	     if(!currObj){
  	    	 return true;
	    }
  	 }
    var val=parseFloat(getElm(formName,fldName).value.replace(/^\s+/g, '').replace(/\s+$/g, ''))
    if(type !== "BETWEEN") {
	constval=parseFloat(constval)
	}
	var replacedFldLabel=fldLabel.replace(/_____/g,')').replace(/____/g,'(').replace(/___/g,'.');
	replacedFldLabel = translatedFieldLabel ? translatedFieldLabel : replacedFldLabel;
    var ret=true
    switch (type) {
		case "BETWEEN" :
					if((val < constval.from || val > constval.to) && isAlertNeeded){
						var alertMsg = I18n.getValueForFields("crm.radiobutton.max.min.value",[replacedFldLabel,constval.from+'', constval.to+'']);//No I18N
						if(customErrMsg) {
							alertMsg = customErrMsg;
						}
						renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
						ret=false;
					}
					break;
        case "L"  : if (val>=constval) {
        				if(isAlertNeeded){
						var alertMsg = I18n.getValueForFields("crm.custom.field.less.than",[replacedFldLabel,constval]);//No I18N
						renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
        				}
        				ret=false
                    }
                    break;
        case "LE" :  if (val>constval) {
						if(isAlertNeeded){
			    		var alertMsg = I18n.getValueForFields("crm.custom.field.less.than.equalto",[replacedFldLabel,constval]);//No I18N
			    		if(customErrMsg) {
							alertMsg = customErrMsg;
						}
						renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
						}
						ret=false
                    }
                    break;
        case "E"  :    if (val!=constval) {
							if(isAlertNeeded){
        					_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : I18n.getValueForFields("crm.custom.field.equalto",[replacedFldLabel,constval]) } });//No I18N
							}
							ret=false
        				}
                                break;
        case "NE" : if (val==constval) {
						if(isAlertNeeded){
		 				var alertMsg = I18n.getValueForFields("crm.custom.field.not.equalto",[replacedFldLabel,constval]);//No I18N
		 				renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
						}
						ret=false
                    }
                    break;
        case "G"  : if (val<=constval) {
        				if(isAlertNeeded){
		 				var alertMsg = I18n.getValueForFields("crm.custom.field.greater.than",[replacedFldLabel,constval]);//No I18N
		 				renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
        				}
        				ret=false
                    }
                    break;
        case "GE" : if (val<constval) {
        				if(isAlertNeeded){
	      				var alertMsg = I18n.getValueForFields("crm.field.comparision.check",[replacedFldLabel,constval]);//No I18N
	      				if(customErrMsg) {
							alertMsg = customErrMsg;
						}
						renderingUtils.displayAlert(fldName,fldLabel,alertMsg,currObj,alertType);
	      				currObj.setAttribute("autocomplete","off");
        				}ret=false
                    }
                    break;
    }

    if (ret==false) {
    	if(isAlertNeeded){
    	currObj.focus()
    	}
        return false
    } 
    else{
    	return true;
    }
}

	/**
	 * This method is used to compare two numeric values and display the respective alert.
	 * @param {String} formName1 - This provides the name of the form in which the validation has to be done.
	 * @param {Array} fldNameArr - This provides the name of the field(s) that has to be validated
	 * @param {Array} fldLabelArr - This provides the name or label of the field(s) that has to be validated
	 * @param {Array} fldTypeArr - This provides the type of field whether it is 'O','V','C','E','D', 'DT' etc...
	 * @param {String} alertType -  This provides the type of alert whether it is inline or Custom Alert Message
	 * @param {Boolean} fromQCreate - This is set to true if it is from quick create and false if not 
	 * @param {String} entityType - This provides the type of entity whether it is user or not
	 * @returns {Boolean} - If it is a valid pattern it returns true else false
	 */

validationUtils.formValidate = function(formName1, fldNameArr, fldLabelArr, fldTypeArr,alertType,fromQCreate,entityType,isAlertNeeded=true, translatedFieldLabel) {
	var isValid = true;
	var fieldname = fldNameArr ? fldNameArr : window.fieldname;
	var fieldlabel = fldLabelArr ? fldLabelArr : window.fieldlabel;
	var fielddatatype = fldTypeArr ? fldTypeArr : window.fielddatatype;
	var quickCreateModule = $("#quick_module").val();
	var whoModule = $("#leContModSel").val();
	var whoId = $("#leContModId").val();
	let range;
	for (var i=0; i<fieldname.length; i++) {
            var type=fielddatatype[i].split("~")
            if(!formName1||formName1==="null"||formName1==="undefined"){
                var cond = getObj(fieldname[i]);
            }
            else{
            	var escapedStr = fieldname[i].replace(/'/g, "\\'");
            	var cond = $("[name='"+formName1+"'] [name='"+escapedStr+"']")[0];
            }
            if(fieldname[i].indexOf("Products in Bundle") > -1 && cond.className.indexOf("MXNDUMMYCOLUMNBUNDLE") > -1) {
				if(cond.classList.contains('errorFieldP')){
    				cond.classList.remove('errorFieldP') // NO I18N
				}
				cond = "#"+cond.className
			}
            var curnFldName = fieldname[i];
            if(!cond && escapedStr&& escapedStr.indexOf('Owner') !== -1){
            	//eslint-disable-next-line @zoho/zstandard/no-jQuery-casting
            	cond = $("[name='" + formName1 + "'] [name='property(ownerId)']")[0];//eslint-disable-line @zoho/webperf/no-attribute-selectors
            	var ownerdata  = $(cond).data();
            	if(ownerdata && ownerdata.uitype === 8){
            		curnFldName = 'property(ownerId)';//NO I18N
        		}
            	else{
            		cond = undefined;
        		}
            	if($(cond).closest('#call_qowner').hasClass('changeOwnerDisabled')){ //eslint-disable-line @zoho/webperf/directly-select-with-id
            		alertType="inline"; //No I18N
            		$('#call_qowner').focus(); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
            	}

        	}
            if(cond && fromQCreate){//Check from Crm.validateEntity for lookup field
	            if(fieldname[i].indexOf("Products in Bundle") > -1 && typeof(cond) === 'string' && cond.indexOf("MXNDUMMYCOLUMNBUNDLE") > -1) {
					Crm.checkIfLookUpAndLookUpValue($L(cond));
				} else {
            		Crm.checkIfLookUpAndLookUpValue($(cond));
            	}
        	}
            var isMandatory = type[1] === "M";
            var columData = $(cond).data();
			if(columData && columData.custom_mandatory) {
				isMandatory = true;
			}
            	if(fieldname[i].indexOf("Products in Bundle") > -1 && typeof(cond) === 'string' && cond.indexOf("MXNDUMMYCOLUMNBUNDLE") > -1) {
				columData = $L(cond).data();
			}
		if(columData && columData.sysrefname === 'Currency' && !Crm.userDetails.CURRENCY_DETAILS[columData.previso].isActive){ // added for currency status validation
			   commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(I18n.getMsg("crm.currency.active.check")),$(getElm(formName1,curnFldName))); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
			   isValid = false ;
			}
            if(Crm.userDetails.LITE.IS_LITE_USER && columData && columData.uitype === 8){
            	isMandatory = true;
        	}
            if(CFRExec  && validationUtils.isNotEmpty(CFRExec.QCObj) && columData){
            	if(columData.colname && CFRExec.isLayoutRuleHiddenElem( columData.colname )){
            		continue;
        		}
            	if(!isMandatory && (columData.mandate === true ||  columData.mandate === 'true')){
            		isMandatory = true;
        		}
            	else if (isMandatory && columData.colname && CFRExec.isLayoutRuleHiddenElem( columData.colname )){
        			isMandatory = false;
        		}
            }
            if (isMandatory){
        		if(fieldname[i] === 'property(DurationInMinute)' || fieldname[i] === 'property(DurationInSecond)' || fieldname[i] === 'property(Call Duration)')        		{
        			var selectedCall = jQuery('input[name=whichCall]:checked').length!=0 ? jQuery('input[name=whichCall]:checked').val() : "";//No I18N
        			var $selected_calltype = $("#Crm_Calls_CALLTYPE").children("option:selected");  //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
        			var actual_calltype = $selected_calltype.attr("actualvalue");	//NO I18n
        			if(selectedCall !== "ScheduleCall" && selectedCall !== "CurrentCall" && actual_calltype !== "Missed"){
        				if (!commonUtils.emptyCheck(fieldname[i],fieldlabel[i],undefined,formName1,alertType,undefined,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
        					isValid = false;

        				}
        			}
        		}
        		else if(!commonUtils.emptyCheck(curnFldName,fieldlabel[i],undefined,formName1,alertType,undefined,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))) {
    				isValid = false;
    				//adding custom class - quick create
    				if(Crm.userDetails.isRadioButtonAndSliderEnabled && Crm.userDetails.isRadioFieldSupported && (columData && columData.uitype === CrmField.UITYPES.PICK_LIST && columData.displayformat && cond)){
    					$L(cond).closest(".labelValCreate").find("crux-grouper-radio-component")[0].component.setData('cxPropErrorType','mandatory');//No I18N
    					
    				}
        		}
	        }
	        var isAddressField = $(cond).closest("crm-addressfield")[0];
	        if(isAddressField){
	        var addressSearch = $(cond).find('crm-address-field-search'); //No i18N
				if(addressSearch) {
					var autosuggestError = false;
					var addressComp = addressSearch;
					if(addressComp && addressComp.length > 0) {
					var junkInput = addressComp[0].getData("currentInput");
					var show = addressComp[0].getData("show"); //No I18N
					var field = addressComp[0].getData("field");
					var selectedAddress = addressComp[0].getData("selectedAddress"); //No I18N
					var autosuggestComp = $L("#addressTextDrop_" + field.id);
					var mandatoryField = addressComp[0].getData("isMandatory"); //No I18
					let addressData = addressComp[0].getData("address"); //No I18N
					
					if(addressData) {
						let latitude = addressData.lat;
						let longitude = addressData.lng;
						
						let latError = latitude &&  latitude !== "" && (!longitude || longitude === ""); //No I18N
						let lngError = longitude && longitude !== "" && (!latitude || latitude === ""); //No I18N
						if(latError || lngError) {
							isValid = false;
							addressComp[0].component.executeMethod("addressExpand");
						}
					}
					if(junkInput && junkInput !== "" && show){
						var alertMsg = I18n.getValueForFields("crm.field.valid.check",$ESAPI.encoder().encodeForHTML(fieldlabel[i]));
						if(alertType === "inline"){
							addressComp[0].setData({"cxPropErrorMessage" : alertMsg, "cxPropErrorSpanClass" : "cafErrorSpan" , "cxPropErrorZcqaSuffix ": "Error", "cxPropField" :  addressComp[0].getData("field"), "isError" : true, "cxPropErrorYield" : false, "cxPropErrorSpanClass" : "alignLeft"}); //No I18N 
						} else if(isValid) {
							_cruxUtils.showCustomMessage({ params : { ltPropMessage : alertMsg, ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
						}
						isValid = false;
						autosuggestError = true;
					}
					if(mandatoryField && show && (!selectedAddress || selectedAddress === "")) {
						var alertMsg = I18n.getValueForFields("crm.field.empty.check",$ESAPI.encoder().encodeForHTML(fieldlabel[i]));
						if(alertType === "inline"){
							addressComp[0].setData({"cxPropErrorMessage" : alertMsg, "cxPropErrorSpanClass" : "cafErrorSpan" , "cxPropErrorZcqaSuffix ": "Error", "cxPropField" :  addressComp[0].getData("field"), "isError" : true, "cxPropErrorYield" : false, "cxPropErrorSpanClass" : "alignLeft"}); //No I18N 
						} else if(isValid) {
							_cruxUtils.showCustomMessage({ params : { ltPropMessage : alertMsg, ltPropType: "error", ltPropDuration: "3000" } })// No I18N
						}
						isValid = false;
						autosuggestError = true;
					}
					if(autosuggestComp && autosuggestError) {
						autosuggestComp.addClass('addressFieldAutocompleteError');
					}
					}
				}
	        }
	        if(isAddressField){
				isValid = validationUtils.validateAddressField(cond,alertType,isValid);
//				var addressFldChildArr = $(cond).find('crux-text-component,crux-picklist-component,crux-number-component');
//				var addressFldChildArrLen = addressFldChildArr.length;
//				for(let x=0;x<addressFldChildArrLen;x++){
//					let tempChildComponent = addressFldChildArr[x].component;
//					let tempChildCompData = tempChildComponent.data;
//					//detail[tempChildCompData.cxPropField.api_name] = tempChildCompData.cxPropValue;
//					let emptyCheck = tempChildCompData.cxPropValue !== '' && tempChildCompData.cxPropValue !== undefined && tempChildCompData.cxPropValue !== '-None-';
//					if(tempChildCompData.cxPropField.required && !(emptyCheck)){
//						var alertMsg = I18n.getValueForFields("crm.field.empty.check",tempChildCompData.cxPropField.field_label); //No I18N
//						if(alertType === "inline"){
//							tempChildComponent.setData('cxPropErrorMessage',alertMsg);//No I18N
//						}else if(isValid){
//						_cruxUtils.showCustomMessage({ params : { ltPropMessage : alertMsg, ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
//						}
//						//crmui.showMsgBand("error",$ESAPI.encoder().encodeForHTML(alertMsg),3000,"");//No I18N
//						isValid = false;
//					} else if(tempChildCompData.cxPropField.address.type === 'latitude' && emptyCheck && !(tempChildCompData.cxPropValue > -90 && tempChildCompData.cxPropValue < 90)) {
//						if(alertType === "inline"){
//							tempChildComponent.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.latitude.rangeerror'));//No I18N
//						}else if(isValid){
//						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.latitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
//						}
//						//crmui.showMsgBand("error","Latitude should in -90 - 90",3000,"");//No I18N
//						isValid = false;
//					} else if(tempChildCompData.cxPropField.address.type === 'longitude' && emptyCheck && !(tempChildCompData.cxPropValue > -180 && tempChildCompData.cxPropValue < 180)) {
//						if(alertType === "inline"){
//							tempChildComponent.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.longitude.rangeerror'));//No I18N
//						}else if(isValid){
//						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.longitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
//						}
//						//crmui.showMsgBand("error","Longitude should in -180 - 180",3000,"");//No I18N
//						isValid = false;
//					}
//				}
//				var coords=addressFldChildArr.filter("crux-number-component");//no i18n
//				let latitude = coords[0].component;
//				let longitude = coords[1].component;
//				if(latitude.data.cxPropValue && !longitude.data.cxPropValue && !latitude.data.cxPropErrorMessage){
//					if(alertType === "inline"){
//					longitude.setData('cxPropErrorMessage',I18n.getMsg('crm.field.empty.check',longitude.data.cxPropField.field_label));//no i18n
//					}else if(isValid){
//					_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getMsg('crm.field.empty.check',longitude.data.cxPropField.field_label), ltPropType: "error", ltPropDuration: "3000" } })// No I18N		
//					}
//					isValid = false;
//				}else if(longitude.data.cxPropValue && !latitude.data.cxPropValue && !longitude.data.cxPropErrorMessage){
//					if(alertType === "inline"){
//					latitude.setData('cxPropErrorMessage',I18n.getMsg('crm.field.empty.check',latitude.data.cxPropField.field_label));//no i18n
//					}else if(isValid){
//					_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getMsg('crm.field.empty.check',latitude.data.cxPropField.field_label), ltPropType: "error", ltPropDuration: "3000" } })// No I18N			
//					}
//					isValid = false;
//			}
			//}
			}
			
			
			//},1000);

			let isCurrentFieldValid = true;
	         switch (type[0]) {
	            case "O"  : break;
	            case "V"  : break;
	            case "C"  : break;
	            case "E"  :
	                if (cond && cond!=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                    if (!validationUtils.emailValidate(fieldname[i],fieldlabel[i],formName1,alertType,entityType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                        isValid = false }
	                }
	                break;
	                case "DT" :
	                if (cond!=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                    if(typeof(type[3])=="undefined"){
	                    	var currdatechk="OTH"//No I18N
	                    }
	                    else{
	                    	var currdatechk=type[3]
	                    }
	
	                    if (!CrmDateUtils.dateTimeValidate(fieldname[i],type[2],fieldlabel[i],currdatechk,formName1,alertType,isAlertNeeded, true, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                        isValid = false }
	                    if (type[4]){
	                        if (!CrmDateUtils.dateTimeComparison(fieldname[i],type[2],fieldlabel[i],type[5],type[6],type[7],type[4],formName1,alertType,isAlertNeeded)) {
	                            isValid = false }
	                    }
	                }
	                            break;
	                case "D"  :
	                    if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                        if(typeof(type[2])=="undefined"){
	                        	var currdatechk="OTH" //no i18n
	                        }
	                        else{
	                        	var currdatechk=type[2]
	                        }
	                        if (!CrmDateUtils.dateValidate(fieldname[i],fieldlabel[i],currdatechk,formName1,undefined,alertType,isAlertNeeded, false, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                isValid = false 
	                        }
	                        if (type[3]) {
		                        if (!CrmDateUtils.dateComparison(fieldname[i],fieldlabel[i],type[4],type[5],type[3],alertType,isAlertNeeded)){
		                            isValid = false
		                        }
		                    }
	                }
	                            break;
	                case "T"  :
	                    if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                        if(typeof(type[2])=="undefined"){
	                        	var currtimechk="OTH"; //No I18N
	                        }
	                        else{
	                        	var currtimechk=type[2]
	                        }
	
	                        if (!CrmDateUtils.timeValidate(fieldname[i],fieldlabel[i],currtimechk,formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))) {
	                                isValid = false 
	                        }
	                        if (type[3]){
	                                if (!CrmDateUtils.timeComparison(fieldname[i],fieldlabel[i],type[4],type[5],type[3],formName1,alertType,isAlertNeeded)) {
	                                    isValid = false 
	                                }
	                        }
	                }
	                            break;
	                case "I"  :
	                    if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                        if (!validationUtils.intValidate(fieldname[i],fieldlabel[i],formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                isValid = false 
									isCurrentFieldValid = false;
							}
		                    if (type[2]) {
		                        if (!validationUtils.numConstComp(fieldname[i],fieldlabel[i],type[2],type[3],formName1,alertType,isAlertNeeded, undefined, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
		                            isValid = false 
									isCurrentFieldValid = false;
								}
	                       }
	                       if( fieldname[i] == "property(Probability)"){
	                    	   if(cond.value > 100){
	                    	   if(isAlertNeeded){
	                    		   renderingUtils.displayAlert(fieldname[i], fieldlabel[i], I18n.getMsg('crm.criteria.editor.probability.value.exceed'), cond, alertType);
	                    		   }
	                    		   isValid = false;
								   isCurrentFieldValid = false;
	                    	   }
	                    	   else if(cond.value < 0){
	                    	   if(isAlertNeeded){
									renderingUtils.displayAlert(fieldname[i],fieldlabel[i], I18n.getValueForFields("crm.field.valid.check",((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : $ESAPI.encoder().encodeForHTML(fieldlabel[i]))), cond, alertType);
	                    		   }
	                    		   isValid = false;
								   isCurrentFieldValid = false;
								}
	                        }
							range = cond.dataset && cond.dataset.range && JSON.parse(cond.dataset.range);
							let fielddetails = {};
							if(cond.dataset.fielddetails){
								fielddetails = {
									uitype: columData.uitype
								}
							}
							if(range && Object.keys(range).length && isCurrentFieldValid && !validationUtils.validateRange(fieldname[i],fieldlabel[i],range,formName1,alertType,undefined,fielddetails)){
								isValid = false;
							}
	                    }
	                break;
	        case "B"  :
	            if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                    if (!validationUtils.intValidate(fieldname[i],fieldlabel[i],formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                            isValid = false 
								isCurrentFieldValid = false;
						}
	                    if (type[2]) {
	                            if (!validationUtils.numConstComp(fieldname[i],fieldlabel[i],type[2],type[3],formName1,alertType,isAlertNeeded, undefined, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                    isValid = false 
										isCurrentFieldValid = false;
								}
	                    }
						range = cond.dataset && cond.dataset.range && JSON.parse(cond.dataset.range);
						let fielddetails = {};
						if(cond.dataset.fielddetails){
							fielddetails = {
								uitype: columData.uitype
							}
						}
						if(range && Object.keys(range).length && isCurrentFieldValid && !validationUtils.validateRange(fieldname[i],fieldlabel[i],range,formName1,alertType,undefined,fielddetails)){
							isValid = false;
						}
	            }
	                break;
	
	               case "DE"  :
	                   if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                        if (typeof(type[2])=="undefined"){
	                        	var numformat="any"; //No I18N
	                        }
	                        else{
	                        	var numformat=type[2]
	                        }
	
	                        if (!validationUtils.decimalValidate(fieldname[i],fieldlabel[i],numformat,formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                isValid = false 
									isCurrentFieldValid = false;
							}
	                       if (type[3]) {
	                            if (!validationUtils.numConstComp(fieldname[i],fieldlabel[i],type[2],type[3],formName1,alertType,isAlertNeeded, undefined, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                isValid = false
									isCurrentFieldValid = false;
								}
	                       }
						   range = cond.dataset && cond.dataset.range && JSON.parse(cond.dataset.range);
						   let fielddetails = {};
						   if(cond.dataset.fielddetails){
							   fielddetails = {
								   uitype: columData.uitype
							   }
						   }
						   if(range && Object.keys(range).length && isCurrentFieldValid && !validationUtils.validateRange(fieldname[i],fieldlabel[i],range,formName1,alertType,undefined,fielddetails)){
							   isValid = false;
						   }
	                    }
	                break;
	           case "N"  :
	               if (cond != null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                    if (typeof(type[2])=="undefined"){
	                    	var numformat="any"; //No I18N
	                    }
	                    else{
	                    	var numformat=type[2]
	                    }
	
	                    if (!validationUtils.numValidate(fieldname[i],fieldlabel[i],numformat,formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))) {
	                        isValid = false 
							isCurrentFieldValid = false;
						}
	                    if (type[3]){
		                    if (!validationUtils.numConstComp(fieldname[i],fieldlabel[i],type[3],type[4],formName1,alertType,isAlertNeeded, undefined, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))) {
		                            isValid = false 
									isCurrentFieldValid = false;
							}
	                    }
						range = cond.dataset && cond.dataset.range && JSON.parse(cond.dataset.range);
						let fielddetails = {};
						if(cond.dataset.fielddetails){
							fielddetails = {
								uitype: columData.uitype,
								isocode: JSON.parse(cond.dataset.fielddetails).isocode
							}
						}
						if(range && Object.keys(range).length && isCurrentFieldValid && !validationUtils.validateRange(fieldname[i],fieldlabel[i],range,formName1,alertType,undefined,fielddetails)){
							isValid = false;
						}
	                }
	                            break;
	             case "P" :
	                 if(cond !=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                	 if (!validationUtils.phoneValidate(fieldname[i],fieldlabel[i],formName1,alertType,isAlertNeeded, ((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : fieldlabel[i]))){
	                                    isValid = false 
	                	 }
	                 }
	                            break;
	                case "W" :
	                    if(cond !=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0){
	                        if(formName1){
								var webObj = document[formName1][fieldname[i]];
	                        }
	                        else{
								var webObj = document.getElementsByName(fieldname[i])[0];
	
	                        }
			                if (!validationUtils.isValidWebUrl(webObj.value)){
			                if(isAlertNeeded){
			                
			                	var alertMsg1 = I18n.getValueForFields("crm.field.valid.check",((translatedFieldLabel && translatedFieldLabel[i]) ? translatedFieldLabel[i] : "Website")); //No I18N
			                	renderingUtils.displayAlert("url",'Website',alertMsg1,webObj,alertType);//No I18N
			                	}
			                	isValid = false;
			                
			                }
	                }
	                break;
	            case "CL" :
	                if (cond !=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0) {
	                    if (!checkSplChars(fieldname[i], fieldlabel[i],undefined,isAlertNeeded)) {
	                        isValid = false;
	                    }
	                }
	                break;
	             case "R" :
	                 if (cond !=null && cond.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length!=0) {
	                    if (!checkMatchForRegex(fieldname[i], fieldlabel[i])) {
	                        isValid = false;
	                    }
	                }
	                break;
	             case "L" :
	            	 if(cond){
	            		 cond = $(cond);
	            		 var data = cond.data();
	            		 var datavalue= cond.val();
	            		 if(data && data.id && data.hasOwnProperty('selectedlookupvalue') && cond.attr("data-selectedlookupvalue") != "" && (!(datavalue === "" && cond[0].value === undefined || cond.attr("data-old-value") == datavalue) && !(datavalue == cond[0].value && (cond.attr("data-old-value") != datavalue && datavalue == cond.attr("data-selectedlookupvalue") )))){
		 						data.id = null;
		 						if(isAlertNeeded){
		 						$('#'+ cond[0].id).data('id', null);
		 						cond.data('id', null);//No I18N
		 				 }
		 				 }
	            		 if( data && !data.id && datavalue && datavalue.trim() && data.lookupModule){
	            		 if(isAlertNeeded){
	            			var lookDisplayLabel = moduleRecordMapping[data.lookupModule].singular_label;
	            			renderingUtils.displayAlert(fieldname[i], fieldlabel[i],I18n.getMsg('crm.label.lookup.norecord',lookDisplayLabel),cond,alertType);//No I18N
	            			}
	            			isValid = false;
	            		 }
	            		 else if(data && datavalue && !data.id && fieldname[i] === 'property(Account Name)' && quickCreateModule !== 'Potentials'){
	            		 if(isAlertNeeded){
	            			 var alertAccMsg = I18n.getMsg('crm.label.lookup.norecord',moduleRecordMapping.Accounts.singular_label);//eslint-disable-line dot-notation
	            			 crmui.showMsgBand("error",$ESAPI.encoder().encodeForHTML(alertAccMsg,cond,alertType),3000,"");//No I18N
	            			 }
	            			 isValid = false;
	            		 }
	            		 if(quickCreateModule === "Tasks" && fieldname[i] === "property(modname)" && whoModule === "Leads" && data.id !== "" && whoId !== ""){
	            		 if(isAlertNeeded){
	            			 var alertAccMsg = I18n.getMsg('crm.import.error.invalid.data');
	            			 crmui.showMsgBand("error",$ESAPI.encoder().encodeForHTML(alertAccMsg,cond,alertType),3000,"");//No I18N
	            			 }
	            			 isValid = false;
	            		 }
	            	 }
	              }
            }
       var module = $("[name='"+formName1+"'] #quick_module").val();
       if(module === 'Calls'){
    	   var res = validateCallTime2(formName1);
    	   if(res === false){isValid = false;}
       }
       if(!module){
    	   module = $("[name='"+formName1+"'] input[name=searchModule]").val();
       }
       if(module === 'Campaigns'){
    	   var $zohoSurveyCampaign = $('input[name=zohoSurveyCampaign]');
    	   if($zohoSurveyCampaign && $zohoSurveyCampaign.val() === "true"){
    		   var res = ZSurvey.validateQCreateCampSurveyExtraFields(formName1,isAlertNeeded);
    		   if(res === false){isValid = false;}
    	   }
       }
       return isValid;
}

/**
 * This method is used to restrict a field from entering keys other than numbers.
 * @param {Event} evt - This provides a event using which we can check for a valid key
 * @returns {Boolean} - This returns True if it is a number and false if not.
 */

validationUtils.validateNumberFields = function(evt) {
    var e = evt || window.event;
    var charCode = e.which || e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
    	return false;
    }
    return true;
}

validationUtils.validateAddressField = function(cond,alertType,isValid,isAllMandatory,focusCheck,isDraft){
	            var isCanvasFormview=cond.component && cond.component.data && cond.component.data.isCanvasFormview;
				var addressFldChildArr = $(cond).find('crux-text-component,crux-picklist-component,crux-number-component');
				var addressFldChildArrLen = addressFldChildArr.length;
				for(let x=0;x<addressFldChildArrLen;x++){
					let tempChildComponent = addressFldChildArr[x].component;
					let tempChildCompData = tempChildComponent.data;
					//detail[tempChildCompData.cxPropField.api_name] = tempChildCompData.cxPropValue;
					let emptyCheck = tempChildCompData.cxPropValue !== '' && tempChildCompData.cxPropValue !== undefined && tempChildCompData.cxPropValue !== '-None-';
					tempChildComponent.setData('tempChildComponent','');//no i18n
					if(isCanvasFormview){
						var $addressFld=addressFldChildArr.eq(x).closest('.zcanvas_address_childfield');//NO I18n
						tempChildComponent.setData('cxPropErrorMessage','');//NO I18n
						$addressFld.removeClass('zc_errorstate');//NO I18n
					}
					if((tempChildCompData.cxPropField.required || isAllMandatory) && !(emptyCheck) && !isDraft){
						var alertMsg = I18n.getValueForFields("crm.field.empty.check",tempChildCompData.cxPropField.field_label); //No I18N
						if(alertType === "inline"){
							tempChildComponent.setData('cxPropErrorMessage', Lyte.Component.registeredHelpers.cruxEncodeHTML(alertMsg));//No I18N
						}else if(isValid){
						_cruxUtils.showCustomMessage({ params : { ltPropMessage : alertMsg, ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
						}
						//crmui.showMsgBand("error",$ESAPI.encoder().encodeForHTML(alertMsg),3000,"");//No I18N
						isValid = false;
						if(isCanvasFormview){
							$addressFld.addClass('zc_errorstate');//NO I18n
						}
						if(focusCheck){
							focusCheck.value = true;
						}
					}
//					 else if(tempChildCompData.cxPropField.address.type === 'latitude' && emptyCheck && !(tempChildCompData.cxPropValue > -90 && tempChildCompData.cxPropValue < 90)) {
//						if(alertType === "inline"){
//							tempChildComponent.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.latitude.rangeerror'));//No I18N
//						}else if(isValid){
//						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.latitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
//						}
//						//crmui.showMsgBand("error","Latitude should in -90 - 90",3000,"");//No I18N
//						isValid = false;
//					} else if(tempChildCompData.cxPropField.address.type === 'longitude' && emptyCheck && !(tempChildCompData.cxPropValue > -180 && tempChildCompData.cxPropValue < 180)) {
//						if(alertType === "inline"){
//							tempChildComponent.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.longitude.rangeerror'));//No I18N
//						}else if(isValid){
//						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.longitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
//						}
//						//crmui.showMsgBand("error","Longitude should in -180 - 180",3000,"");//No I18N
//						isValid = false;
//					}
				}
				var coords=addressFldChildArr.filter("crux-number-component");//no i18n
				if(coords && coords.length > 0) {
				let latitude = coords[0].component;
				let longitude = coords[1].component;
				let latitudeData = latitude.data;
				let longitudeData = longitude.data;
				if(!((latitudeData.cxPropField.required || isAllMandatory)&&!(latitudeData.cxPropValue && latitudeData.cxPropValue !== ''))){
					latitude.setData('cxPropErrorMessage','');//no i18n
				}
				if(!((longitudeData.cxPropField.required || isAllMandatory)&&!(longitudeData.cxPropValue && longitudeData.cxPropValue !== ''))){
					longitude.setData('cxPropErrorMessage','');//no i18n
				}
				if(isCanvasFormview){
					var $latitude=coords.eq(0).closest('.zcanvas_address_childfield');//NO I18n
					var $longitude=coords.eq(1).closest('.zcanvas_address_childfield')//NO I18n
				}
				for(var i=0;i<2;i++){
					if( ((isDraft && coords.eq(i)[0].component.data.cxPropValue !=='') || (!isDraft) ) && coords.eq(i)[0].component.data.cxPropErrorMessage === '' && !coords.eq(i)[0].component.validate()){
							isValid = false;
							if(isCanvasFormview){
								var $addressFld=coords.eq(i).closest('.zcanvas_address_childfield');//NO I18n
								$addressFld.addClass('zc_errorstate');//NO I18n
							}
							if(focusCheck){
								focusCheck.value = true;
							}
					}
				}
				 if(latitudeData.cxPropField.address.type === 'latitude' && latitudeData.cxPropValue && latitudeData.cxPropValue !== '' && !(latitudeData.cxPropValue >= -90 && latitudeData.cxPropValue <= 90) && !latitudeData.cxPropErrorMessage) {
						if(alertType === "inline"){
							latitude.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.latitude.rangeerror'));//No I18N
						}else if(isValid){
						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.latitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
						}
						isValid = false;
						if(isCanvasFormview){
							$latitude.addClass('zc_errorstate');//NO I18n
						}
						if(focusCheck){
							focusCheck.value = true;
						}
					} 
					if(longitudeData.cxPropField.address.type === 'longitude' && longitudeData.cxPropValue && longitudeData.cxPropValue !== '' && !(longitudeData.cxPropValue >= -180 && longitudeData.cxPropValue <= 180) && !longitudeData.cxPropErrorMessage) {
						if(alertType === "inline"){
							longitude.setData('cxPropErrorMessage',I18n.getValueForFields('crm.addressfield.longitude.rangeerror'));//No I18N
						}else if(isValid){
						_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getValueForFields('crm.addressfield.longitude.rangeerror'), ltPropType: "error", ltPropDuration: "3000" } })// No I18N	
						}
						isValid = false;
						if(isCanvasFormview){
							$longitude.addClass('zc_errorstate');//NO I18n
						}
						if(focusCheck){
							focusCheck.value = true;
						}
				}
				
				if(latitudeData.cxPropValue && !longitudeData.cxPropValue && !latitudeData.cxPropErrorMessage){
					if(alertType === "inline"){
					longitude.setData('cxPropErrorMessage',I18n.getMsg('crm.field.empty.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(longitudeData.cxPropField.field_label)));//no i18n
					}else if(isValid){
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getMsg('crm.field.empty.check',longitudeData.cxPropField.field_label), ltPropType: "error", ltPropDuration: "3000" } })// No I18N		
					}
					isValid = false;
					if(isCanvasFormview){
						$longitude.addClass('zc_errorstate');//NO I18n
					}
					if(focusCheck){
						focusCheck.value = true;
					}
				}else if(longitudeData.cxPropValue && !latitudeData.cxPropValue && !longitudeData.cxPropErrorMessage){
					if(alertType === "inline"){
					latitude.setData('cxPropErrorMessage',I18n.getMsg('crm.field.empty.check',Lyte.Component.registeredHelpers.cruxEncodeHTML(latitudeData.cxPropField.field_label)));//no i18n
					}else if(isValid){
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : I18n.getMsg('crm.field.empty.check',latitudeData.cxPropField.field_label), ltPropType: "error", ltPropDuration: "3000" } })// No I18N			
					}
					isValid = false;
					if(isCanvasFormview){
						$latitude.addClass('zc_errorstate');//NO I18n
					}
					if(focusCheck){
						focusCheck.value = true;
					}
				}
			}
			return isValid;
}



