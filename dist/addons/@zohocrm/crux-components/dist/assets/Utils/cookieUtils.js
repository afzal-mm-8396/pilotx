// $Id$
var cookieUtils = {};

	/**
	 * This method is used to set the Cookie with provided name, value, path and Duration
	 * @param {String} c_name - This provides the name for the cookie that is to be set.
	 * @param {String} value - This provides the value that has to be set to the corresponding passed in cookie name.
	 * @param {Number} duration - This provides the expiry/validity of the Cookie 
	 * @param {String} path - This provides the path at which the ccokie has to be set, if path is not provided the path is set to current route it is present in.
	 * @param {String} domain - This provides the domain name of the cookie i.e, for which domain the cookie has to be set.
	 * @param {Boolean} secure - This provides whether the cookie is set to be secure or not.
	 * @returns {void}
	 * @example 
	 * cookieUtils.setCookie("JSESSIONID","C30D7A62813C51BAD5E4365CA43C4A71",7,"/","example.com")
	 * => JSESSIONID=C30D7A62813C51BAD5E4365CA43C4A71; expires=Fri, 01 Jan 2020 00:01:02 GMT; domain=example.com; path=/;
	 */
cookieUtils.setCookie = function(c_name,value,duration,path,domain,secure){	
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + duration);
	var cookie = c_name + "=" + value + "; "; //NO I18N
	duration ? cookie += "expires=" + exdate.toUTCString() + "; " : duration ;//NO I18N
	domain ? cookie += "domain=" + domain + "; " : domain;  //NO I18N
	path ? cookie +=  "path=" + path + ";" : path; //NO I18N
	secure ? cookie += " secure" : secure;//No I18N
	document.cookie = cookie ;
}

	/**
	 * This method is used to update the Cookie value i.e, it is used to update one or more value for a particular key  . 
	 * @param {String} cname - This provides the key of the cookie to which the new value has to be added.
	 * @param {String} currvalue - This provides the new value that has to be added to the corresponding key.
	 * @param {Boolean} isDelete - This is set to be true if the cookie has to be deleted and false if not
	 * @returns {void}
	 * @example
	 * cookieUtils.updateCookie("rpo","none")
	 * => rpo=none;
	 */
cookieUtils.updateCookie = function(cname,currvalue,isDelete){
	var openstr = this.getCookie(cname);
	var idTobeStored = currvalue;
	idTobeStored = idTobeStored.replace(/\./gi,'\\.');
	idTobeStored = new RegExp(idTobeStored);
	if(!openstr){
		if(!isDelete){
			openstr = currvalue;
		}
	}
	else if(openstr.search(idTobeStored) > -1 || isDelete){
			openstr = openstr.replace(idTobeStored,'','g');
			openstr = openstr.replace(/,{2,}/gi,',');
			openstr = openstr.replace(/^,/,'');
			openstr = openstr.replace(/,$/,'');
		}
		else{  
			openstr = openstr + ',' + currvalue;
		}
	if(!openstr){
		this.deleteCookie(cname);
	}
	else{
		this.setCookie(cname,openstr);
	}
}

	/**
	 * This method is used to get the corresponding values of the passed-in key from the cookie. 
	 * @param {String} key - This provides the key of the cookie whose corresponding value has to be retrieved.
	 * @returns {String} - It returns the value of the key that is passed on to the method 
	 * @example
	 * cookieUtils.getCookie("x-tkp-token")
	 * => 58351026-9e09dd98-2fa1383197ae2as4dj5k8hj3sd727b47
	 */
cookieUtils.getCookie = function(key){
	var cook = document.cookie;
	var c_start = cook.indexOf(" " + key + "=");
	if (c_start === -1){
	  c_start = cook.indexOf(key + "=");
	  }
	if (c_start === -1){
	  cook = null;
	  }
	else{
	  c_start = cook.indexOf("=", c_start) + 1;
	  var c_end = cook.indexOf(";", c_start);
	  if (c_end === -1){
		  c_end = cook.length;
	  }
	  cook = unescape(cook.substring(c_start,c_end));
	}
	return cook;
};

	/**
	 * This method is used to delete the passed-in cookie key and its corresponding value from the browser.
	 * @param {String} cookie_name - This provides the key of the cookie that is to be deleted.
	 * @param {String} path - This provides the path in which the particular cookie has been created.
	 * @param {String} domain - This provides the domain name in which the cookie been created.
	 * @returns {void}
	 * @example
	 * cookieUtils.deleteCookie("x-tkp-token","/","example.com")
	 */
cookieUtils.deleteCookie = function( cookie_name,path,domain){       
	var cookie_date = new Date( );  // current date & time
	cookie_date.setTime(cookie_date.getTime() - 1 );
	var cookie = cookie_name + "= ; expires=" + cookie_date.toGMTString() + "; "; //NO I18N
	path ? cookie += "path=" + path + ";" : path; //NO I18N
	domain ? cookie += "domain=" + domain + ";" : domain;  //NO I18N
	document.cookie = cookie;
}