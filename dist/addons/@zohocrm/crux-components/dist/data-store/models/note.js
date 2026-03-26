//$Id$
//store.unregisterModel("note")
store.registerModel("note", { //NO i18n
    "id": Lyte.attr("string", { primaryKey: true }), //NO i18n
    "Parent_Id": Lyte.attr("object"), //NO i18n
    "$se_module": Lyte.attr("string"), //NO i18n
    "Note_Title": Lyte.attr("string"), //NO i18n
    "Note_Content": Lyte.attr("string"), //NO i18n
    "$attachments": Lyte.attr("array"), //NO I18n
    "$is_shared_to_client": Lyte.attr("boolean") //NO I18n
});
//$Id$
//store.unregisterAdapter("note")
store.registerAdapter("note", { //NO I18n
	namespace: "crm/v9", //NO I18n
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
		var apiName = modelName[0].toUpperCase() + modelName.substr(1) + "s";
		url = url.replace(modelName, apiName); //NO I18n
		var seModule;
		//eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
		if (type === "findAll") { //NO I18n
			if (customData && customData.module && customData.entityId) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				url = url.replace(apiName, ""); //NO I18n
				url += customData.module + "/" + customData.entityId + "/" + apiName; //NO I18n
			}
		} else if (type === "deleteRecord") {
			url = url.substring(0, url.indexOf(apiName));
			seModule = payLoad.$se_module;
			//if previous call get response was from v6 semodule will be absent
			if(seModule===undefined && payLoad.Parent_Id.module){
				seModule = payLoad.Parent_Id.module.api_name;
			}
			url += seModule + "/" + payLoad.Parent_Id.id + "/" + apiName;
			url = url + "?ids=" + customData.noteId; //No I18n
		} else if (type === "updateRecord" && customData.removeAttachment) {
			url += "/Attachments?ids=" + customData.ids; //NO i18n
		}
		else if (type === "createRecord") {
			url = url.replace(apiName, ""); //NO I18n
			url += payLoad.$se_module + "/" + payLoad.Parent_Id.id + "/" + apiName;
		}
		else if (type === "updateRecord") {
			let record = store.peekRecord('note', payLoad.id); //No I18N
			if (record && record.id) {
				url = url.substring(0, url.indexOf(apiName));
				seModule = record.$se_module;
				//if previous call get response was from v6 semodule will be absent
				if(seModule===undefined && record.Parent_Id.module){
					seModule = record.Parent_Id.module.api_name;
				}
				url += seModule+"/"+ record.Parent_Id.id+"/"+apiName;
			}
		}
		else if (type === "findRecord" && customData && customData.module && customData.entityId) {
			url = url.replace(apiName, customData.module + "/" + customData.entityId + "/" + apiName); //NO I18n
		}

		if (customData && customData.apiVersion) {
			url = url.replace('v2', customData.apiVersion); //no i18n
		}

		return url;
	},
	methodForRequest: function (method, type, queryParams, customData) {
		if (method === "PATCH") { //NO I18n
			method = "PUT"; //NO I18n
		}
		if (type === "updateRecord" && customData.removeAttachment) {
			method = "DELETE"; //NO I18n
		}
		return method;
	}
});
//$Id$
//store.unregisterSerializer("note")
store.registerSerializer("note", {
	normalizeResponse: function (modelName, type, payLoad) {
		payLoad[modelName] = payLoad.data;
		if (type === "createRecord" || type === "updateRecord") {
			payLoad.data = payLoad.data[0].details;
		}
		return payLoad;
	},
	serialize: function (type, payLoad, records) {
		if (records.entity) {
			delete records.entity;
		}
		payLoad.data = [records];
		return payLoad;
	},
	serializeKey: function () {
		return "data"; //NO i18n
	},
	payloadKey: function () {
		return "data"; //NO i18n
	}
});