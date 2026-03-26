//$Id$
//store.unregisterModel("custom_view");
store.registerModel("custom_view", { //No I18N

});

//$Id$
//store.unregisterAdapter("custom_view")
store.registerAdapter("custom_view", {//No I18n
    namespace: "crm/v2.2/settings", //No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace(modelName, modelName + "s"); //NO I18n
        return url;
    }
});
// $Id$
//store.unregisterSerializer("custom_view")
store.registerSerializer("custom_view", {  //No I18N
	normalizeResponse: function (modelName, type, payLoad) {
		if (!payLoad) {
			payLoad = [];
			return payLoad;
		}


		if (type === "findRecord") {
			if (payLoad.custom_views) { //No I18N
				payLoad.custom_views = payLoad.custom_views[0];
			} else {
				payLoad = {};
			}
		}
		return payLoad;

	},
});