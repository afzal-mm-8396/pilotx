//$Id$
//store.unregisterModel("user")
store.registerModel("user", { //No I18N
    fields: Lyte.attr('array'),//No I18N
    name: Lyte.attr('string'),//No I18n
    zuid: Lyte.attr('string'), //No I18n
    customize_info: Lyte.attr('object'), //No I18n
    alias: Lyte.attr('string'), //No I18n
    confirm: Lyte.attr('boolean'), //No I18n
    date_format: Lyte.attr('string'), //No I18n
    email: Lyte.attr('string'), //No I18n
    first_name: Lyte.attr('string'), //No I18n
    full_name: Lyte.attr('string'), //No I18n
    last_name: Lyte.attr('string'), //No I18nNo I18n
    status: Lyte.attr('string'), //No I18n
    language: Lyte.attr('string'), //No I18n
    locale: Lyte.attr('string'), //No I18n
    country_locale: Lyte.attr('string'), //No I18n
    time_format: Lyte.attr('string'), //No I18n
    time_zone: Lyte.attr('string'), //No I18n
    Currency: Lyte.attr("string"), //NO I18n
    id: Lyte.attr('string')//No I18N
}, {
    actions: {
        "search": { "endPoint": "search" }, //NO I18n
        "convert": {}, //NO I18n
        "get_unassigned": {}, //No I18N
        "get_assigned": {}, //No I18N
        "transfer_and_delete": {}, //No I18N 
        "grouped_counts": {}, //No I18N
        "count": {}, //NO I18n
        "get_territories": {}, //No I18N
        "reinvite": {} //NO I18N
    }
});
//$Id$
//store.unregisterAdapter("user")
store.registerAdapter("user", {//No I18n
    xhrReq: new XMLHttpRequest(),
    namespace: "crm/v7", //No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url) {
        url = url.replace(modelName, modelName + "s"); //NO I18n
       if(typeof(featuresAvailable)  !== 'undefined' && featuresAvailable.DIGITAL_EMPLOYEE_SUPPORT){
			url = url.replace("v7","v9");
		}
        return url;
    },
    methodForRequest: function (method, type) {
        if (method === "PATCH" && type === "updateRecord") {
            return "PUT"; //NO i18n
        }
        return method;
    },
    processRequest: function (type, modelName, payload, snapshot, customData) {
        var _self = this;
        if (type === "action") {
            payload = JSON.parse(payload);
            if (payload.type === "search" || payload.type === "count") {
                return new Promise(function (resolve, reject) {
                    var xhr = _self.xhrReq;
                    var url = payload.type === "search" ? "/" + _self.namespace + "/users/search?" : "/" + _self.namespace + "/users/actions/count?"; //NO I18n
                     if(typeof(featuresAvailable)  !== 'undefined' && featuresAvailable.DIGITAL_EMPLOYEE_SUPPORT){
			            url = url.replace("v7","v9");
		            }
                    if (payload.type === "count" && customData) {
                        payload.customData = customData;
                    }
                    for (var k in payload.customData) {
                        if (k !== "tempApiVersion") {
                            url += k + "=" + encodeURIComponent(payload.customData[k]) + "&";
                        }
                    }
                    xhr.open("GET", url);
                    var hd = store.adapter.application.headersForRequest(type, undefined, payload.customData);
                    for (var key in hd) {
                        xhr.setRequestHeader(key, hd[key]);
                    }
                    xhr.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        }
                    };
                    xhr.onerror = function () {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    };
                    xhr.send();
                });
            }
            else if (customData && customData.feature !== "subordinates") { //No I18n
                var url;
                return new Promise(function (resolve, reject) {
                    var xhr = _self.xhrReq;
                    xhr.open("POST", url);
                    var hd = store.adapter.application.headersForRequest();
                    for (var key in hd) {
                        xhr.setRequestHeader(key, hd[key]);
                    }
                    xhr.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(xhr.response);
                        }
                        else if (this.status === 400 && xhr.response) {
                            reject({
                                status: this.status,
                                statusText: xhr.response

                            });
                        }
                        else {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        }
                    };
                    xhr.onerror = function () {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    };
                    xhr.send(JSON.stringify(customData));
                });
            }
        }
    },
    parseResponse: function (type, modelName, xhrObj, payLoad) {
        if (payLoad.get_assigned) {
            return payLoad.get_assigned;
        }
        return payLoad;
    }
});
//$Id$
//store.unregisterSerializer("user")
store.registerSerializer("user", { //No I18N
    varPayloadKey: 'users',  //for lucene search //No I18N
    serialize: function (type, payLoad, records, customData, modelName, queryParams, actionName) {
        if (type === "action") {
            return actionName === "search" ? { type: "search", customData: customData } : actionName === "count" ? { type: "count" } : {};//No I18N
        }
        if (type === "updateRecord" && payLoad && !payLoad[this.varPayloadKey] && payLoad['user']) {
            payLoad[this.varPayloadKey] = [payLoad['user']];
            delete payLoad.user;
        }
        return payLoad;
    },
    normalizeUserData: function (user) {
        for (var prop in user) {
            if (user[prop] === null) {
                user[prop] = undefined;
            }
        }
    },
    normalizeResponse: function (modelName, type, payLoad) {
        if (validationUtils.isEmpty(payLoad) && (type === "findRecord" || type === "findAll")) {
            payLoad.users = [];
        } else if (payLoad && payLoad.count !== undefined) {
            payLoad.meta = {
                count: payLoad.count
            };
            payLoad.users = [];
            delete payLoad.count;
        } else if (type === "findRecord" || type === "findAll") {
            var nameformat = Crm.userDetails.NAME_FORMAT.split(',');//No I18N
            var userLength = payLoad.users.length;
            var firstName = nameformat.indexOf("First Name");//No I18N
            var lastName = nameformat.indexOf("Last Name");//No I18N
            for (var i = 0; i < userLength; i++) {
                var userObject = payLoad.users[i];
                var fullname = userObject.last_name ? userObject.last_name : userObject.first_name;
                if (firstName > lastName) {
                    fullname = (userObject.first_name ? userObject.first_name : "") + " " + (userObject.last_name ? userObject.last_name : "");//No I18N
                }
                else {
                    fullname = (userObject.last_name ? userObject.last_name : "") + " " + (userObject.first_name ? userObject.first_name : "");//No I18N
                }
                payLoad.users[i].full_name = fullname.trim();
            }
        }
        if (type === "updateRecord" && payLoad && payLoad[this.varPayloadKey] && payLoad[this.varPayloadKey][0] && payLoad[this.varPayloadKey][0].details) {
            payLoad[this.varPayloadKey][0].id = payLoad[this.varPayloadKey][0].details.id;
        }
        var users = payLoad.users;
        if (users) {
            if (users.constructor === Array) {
                users.forEach(function (user) {
                    this.normalizeUserData(user);
                }.bind(this));
            } else if (users.constructor === Object) {
                this.normalizeUserData(users);
            }
        }
        return payLoad;
    },
    //for lucene search
    payloadKey: function () {
        return this.varPayloadKey;
    },
    normalize: function (modelName, type, payLoad) {
        if (payLoad) {
            var rec = store.peekRecord('user', payLoad.id);//No I18n
            if (!payLoad.image_link && rec && !rec.image_link) {
                payLoad.image_link = "";
            }
        }
        if (type === "findAll" && payLoad !== undefined) {
            var territory = payLoad.territories, len = territory ? territory.length : 0;
            if (len) {
                for (var i = 0; i < len; i++) {
                    if (Object.keys(territory[i]).includes("manager")) {
                        delete territory[i].manager;
                    }
                }
            }
            if (!payLoad.customize_info) {
                payLoad.customize_info = {};
            }
        }
        return payLoad;
    }
});