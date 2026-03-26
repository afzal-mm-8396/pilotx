//$Ids$
//store.unregisterModel("servapp_preferences")
store.registerModel("servapp_preferences", {

});
//$Ids$
//store.unregisterAdapter("servapp_preferences")
store.registerAdapter("servapp_preferences", {//No I18n
	namespace: "crm/v3/settings",//No I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		if (type === 'findAll' || type === 'update' && customData && customData.module &&
			(customData.module === 'Services' || customData.module === 'Appointments')) {
			// if(customData && customData.module && 
			// (customData.module === 'Services' || customData.module === 'Appointments')){//No I18n
			var newUrl = (customData.module === 'Services' ? 'service' : 'appointment') + '_preferences';//No I18n
			url = url.replace(modelName, newUrl);
			// }
		}
		return url;
	},
	reloadAll: function (res, queryParams, customData) {
		if (customData && customData.module &&
			(customData.module === 'Services' || customData.module === 'Appointments') && !customData.reloadAll) { //No I18n
			var existingData = store.peekAll('servapp_preferences');//No I18n
			if (existingData.length > 0 && existingData[0][customData.module.toLowerCase()]) {
				return false;
			}
		}
		return true;
	},
});

//$Ids$
//store.unregisterSerializer("servapp_preferences")
store.registerSerializer("servapp_preferences", {

});