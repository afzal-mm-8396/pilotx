// $Id$
store.registerModel("tag",
    {
        created_by: Lyte.attr("object"),//No I18N
        created_time: Lyte.attr("string"),//No I18N
        id: Lyte.attr("string"), //No I18N
        modRefId: Lyte.attr("string"), //No I18N
        modified_by: Lyte.attr("object"),//No I18N
        modified_time: Lyte.attr("string"),//No I18N
        module_name: Lyte.attr("string"), //No I18n
        name: Lyte.attr("string"), //No I18n
        color_code: Lyte.attr("string") //No I18n
    },
    {
        actions: {
            records_count: {},
            merge: {},
            add_tags: {},
            remove_tags: {}
        }
    }
);
// $Id$
store.registerAdapter("tag", {//No I18n
    namespace: "crm/v2.2/settings", //No I18n
    methodForRequest: function (method, type, queryParams, customData) {
        if (type === "create") { //No I18n
            return "POST"; //No I18n
        } else if (type === "update") { //No I18n
            return "PATCH"; //No I18n
        } else if (type === 'action' && (customData.action === "add_tags" || customData.action === "remove_tags")) { //No I18n
            return "POST"; //No I18n
        } else if (type === 'action' && customData !== undefined && customData.module) { //No I18n
            queryParams.module = customData.module;
            return "GET"; //No I18n
        }
        return method;
    },
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        url = url.replace(modelName, modelName + "s"); //No I18n
        if (type === "delete" && customData) {
            url = url + "/" + customData.id; //No I18n
        } else if (type === "action" && (actionName === "add_tags" || actionName === "remove_tags")) { //no i18n
            url = url.slice(0, url.indexOf("tag") + 5);
            url = url + customData.id + "/actions/" + actionName; //no i18n
            url = url.replace("settings/" + modelName + "s", customData.module);
            if (actionName === "remove_tags") {
                url = url.replace('v2.2', 'v2.1') + "?tag_names=" + encodeURIComponent(customData.tag_names) + "&fromClient=" + true;//no i18n
            }
        } else if (type === "action" && customData.id) { //NO I18n
            url = url.slice(0, url.indexOf("tag") + 5);
            url = url + customData.id + "/actions/merge";  //NO I18n
        }
        if (window.isSandboxAcc === 'false' && window.isCanvasSandboxDiff) {
            url = url.replace("/crm/", "/crm/v2/sandbox/diff/");
        }
        if (window.isSandboxAcc === 'true' && window.isCanvasProdDiff) {
            url = url.replace("/crm/", "/crm/v2/production/diff/");
        }
        return url;
    }
});

//$Id$
store.registerSerializer("tag", {
    normalizeResponse: function (modelName, type, payload, pkValue, status, headers, queryParams) {
        switch (type) {
            case 'create': {
                let len = payload.tags.length;
                var data = [];
                for (let i = 0; i < len; i++) {
                    payload.tags[i].details.module_name = queryParams.modulename;
                    if (!payload.tags[i].details.message) {
                        payload.tags[i].details.message = payload.tags[i].message;//Temporary
                    }
                    payload.tags[i].details.module_name = queryParams && queryParams.module;
                    Lyte.arrayUtils(data, 'push', payload.tags[i].details);//no i18n
                    payload.tags[i].module_name = queryParams.module;
                }
                return { tags: data };
            }
            case 'findAll': {
                let len = payload.tags.length;
                for (let i = 0; i < len; i++) {
                    payload.tags[i].module_name = queryParams && queryParams.module;
                }
                break;
            }
            case 'update': {
                return { tags: payload.tags[0].details };
            }
        }
        return payload;
    },
    serializeKey: function (modelName) {
        return modelName + "s";  //No i18n
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {

        if (actionName === 'merge') { //no i18n
            return { "tags": [{ "conflict_id": records.id, "modified_time": records.modified_time }] }; //no i18n
        } else if (type === 'update') { //no i18n
            var name;
            if (payLoad.tags[0].name === undefined) {
                name = records[0].name;
            } else {
                name = payLoad.tags[0].name;
            }
            return { "tags": [{ "name": name, "color_code": payLoad.tags[0].color_code, "id": payLoad.tags[0].id, "modified_time": records.modified_time }] }; //no i18n

        } else if (type === 'create') { //no i18n
            var array = [];
            var recordLen = payLoad.tags.length;
            for (var j = 0; j < recordLen; j++) {
                var obj = { "name": payLoad.tags[j].name, "color_code": payLoad.tags[j].color_code };
                array.push(obj);
            }
            return { "tags": array }; //no i18n
        } else if (actionName === "add_tags" || actionName === "remove_tags") {
            return undefined;
        }
    }
});