// $Id$
 
/**
 * @namespace
 */

var storageUtils = {};


/**
 * This method is used to remove the specific local storage data or to delete the specific Cookie
 * @param {String} key - The key is the data stored in the cache of the browser
 * @returns {void}
 */
storageUtils.removeLocalStorageValue = function(key){ //No I18N
	if(typeof Storage !== "undefined"){
		localStorage.removeItem(key);
	}else{
		cookieUtils.deleteCookie(key);
	}
};

/**
 * This method is used to set the specific data into the Local Storage or set it as new cookie
 * @param {String} key  - It is the Unique identification key for each individual User saved locally in the browser 
 * @param {String} value - It is the data that is stored against the Unique Identifiaction key in the local memory
 * @returns {void} 
 */
storageUtils.setLocalStorage = function(key,value){ //No I18N
	if(typeof Storage !== "undefined"){
		localStorage.setItem(key,value);
	}else{
		cookieUtils.setCookie(key,value);
	}
};

/**
 * This method is used to get the data/cookie from the Local storage using the Unique Identification key 
 * @param {String} key - The unique identification key that is used to get the data/cookie from the local Storage
 * @returns {String} The method returns the Value from the local storage 
 */
storageUtils.getLocalStorageValue = function(key){ //No I18N
	var value = null;
	if(typeof Storage !== "undefined"){
		value = localStorage.getItem(key);
	}else{
		value = cookieUtils.getCookie(key);
	}
	return value;
};
