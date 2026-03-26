// $Id$
//store.unregisterModel("custom_button");
store.registerModel("custom_button", {//No I18N
});
//$Id$
//store.unregisterAdapter("custom_button")
store.registerAdapter("custom_button", { //No I18n
	namespace: "crm/v2/settings", //No I18n
	delayPersistence: { delete: true },
	buildURL: function (modelName, type, queryParams, payLoad, url) {
		url = url.replace('custom_button', 'custom_buttons'); //No I18n
		return url;
	},

	headersForRequest: function (type, action, customData) {
		var headers = this.$super.headersForRequest();
		if (customData && customData.headers && customData.headers["X-CRM-ORG"]) {
			headers["X-CRM-ORG"] = customData.headers["X-CRM-ORG"]; //No I18n
		}
		return headers;
	},

});
// $Id$
//store.unregisterSerializer("custom_button")
store.registerSerializer("custom_button", {

});
