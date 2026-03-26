//$Id$
//store.unregisterAdapter("application")
store.registerAdapter("application", { //No I18N
    namespace: "crm/v2", //No I18n
    batchNamespace: "batch_requests", //No I18n
    actionNamespace: "actions", //No I18n
    Tab_ID: (function () {
        if (sessionStorage.getItem("TabZID") === null)//NO I18N
        {
            var Session_ID = ($L && $L.moment) ? $L.moment('').toDate().valueOf() : Date.now();
            sessionStorage.setItem("TabZID", Session_ID);//NO I18N
        }
        return sessionStorage.getItem("TabZID");//NO I18N
    })(),

    headersForRequest: function () {
        var headers = {
            "X-ZCSRF-TOKEN": csrfParamName + "=" + csrfToken, //No I18N	
            "X-CRM-ORG": crmZgid, //No I18N	
            "X-CRM-REF-ID": crmZuid + '_' + crmZgid + '_' + this.Tab_ID + '_' + Date.now() //no i18n
        };
        if (window.clientPortalName) {
            headers["X-CRMPORTAL"] = window.clientPortalName;//No I18N
        }
        if (typeof crmZgid !== 'undefined' && crmZgid) {
            headers["X-CRM-ORG"] = crmZgid; //No I18N
        }
        // if (_cruxUtils && _cruxUtils.isLyteWidgetBuild) {
        //     headers["X-CRM-FEATURE-NAME"] = 'crm/lux';//no i18n
        // }
        return headers;
    },
    buildURL: function (modelName, type, payLoad, queryParams, url) {
        var lastIndex = url.lastIndexOf(modelName);
        if (lastIndex !== -1) {
            url = url.substring(0, lastIndex) + modelName + "s" + url.substring(lastIndex + modelName.length); //No I18N
        }
        return url;
    },
    parseResponse: function (type, modelName, xhr, payload) { //added for payload is coming as "" in lyte version upgrade to 3.0.1
        if (!payload && xhr && xhr.status === 204) {
            return {};
        }
        return payload;
    }

});
//$Id$
//store.unregisterSerializer("application")
store.registerSerializer("application", {//No I18n
    extractMeta: function (payLoad) {
        if (payLoad && payLoad.info) {
            payLoad.meta = payLoad.info;
            delete payLoad.info;
            return payLoad.meta;
        }
        return undefined;
    },
    serialize: function (type, payLoad) {
        if (type === "batch") { //NO i18n
            payLoad.batch_requests = payLoad.batch;
            delete payLoad.batch;
        }
        return payLoad;
    },
    payloadKey: function (modelName) {
        if (modelName !== 'blueprint') {
            return modelName + 's';//no i18n
        }
    },
    normalizeResponse: function (modelName, type, payLoad) {
        if (payLoad === undefined || payLoad === null || Object.keys(payLoad).length === 0) {
            var res = {};
            if (type === "findAll") {
                res[modelName] = [];
            }
            else if (type === "findRecord") {
                res[modelName] = {};
            }
            return res;
        }
        return payLoad;
    }
});