//$Id$
store.registerModel("cadence",{
	id: Lyte.attr("string", {primaryKey: true}), // No i18n
	name: Lyte.attr("string", {default: ""}), // No i18n
	description: Lyte.attr("string", {default: ""}), // No i18n
	type :  Lyte.attr("string", {default: ""}), // No i18n
	module: Lyte.attr("object"), // No i18n
	custom_view :  Lyte.attr("object"),// No i18n
	execution_details :  Lyte.attr("object"),// No i18n
	follow_ups : Lyte.attr("array"), // No i18n
	automatic_unenroll : Lyte.attr("boolean",{default : false}), // No i18n
	unenroll_properties : Lyte.attr("object"),// No i18n
	end_date : Lyte.attr("string", {default: ""}), // No i18n
	active:Lyte.attr("boolean",{default : true}), // No i18n
	actionDetails : Lyte.attr("object", {default : {}}),// No i18n
	seriesFollowUps_arr : Lyte.attr("object", {default : {}})// No i18n
    
},
{	
	actions: 
	{
		enrollSeries : {},
		unEnrollSeries:{}
	}
});
//$Id$
store.registerAdapter("cadence", {//No I18n
	namespace  : "crm/v4/settings/automation", //NO i18N
	buildURL  : function (modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData ){ 
		url = this.$super.buildURL( modelName , type ,queryParams, payLoad, url, actionName, customData );
        
        if(actionName === "enrollSeries"){
			var enrollUrl = url.split("settings");//eslint-disable-line no-redeclare
        	var module = moduleApiMapping[customData.module];//eslint-disable-line no-redeclare
			url = enrollUrl [0] + module +"/actions/enrol_in_cadences";
		}
		if(actionName === "unEnrollSeries"){
			var enrollUrl = url.split("settings");//eslint-disable-line no-redeclare
        	var module = moduleApiMapping[customData.module];//eslint-disable-line no-redeclare
			url = enrollUrl [0] + module +"/actions/unenrol_from_cadences";

		}
		return url; 
	},
	headersForRequest: function ( type, action, customData ) {
		var headers = {
				"X-ZCSRF-TOKEN": csrfParamName + "=" + csrfToken, //No I18N	
				"X-CRM-ORG": crmZgid //No I18N	
		};
		if(customData && customData.headers && customData.headers["X-CRM-ORG"]){
		   headers["X-CRM-ORG"] = customData.headers["X-CRM-ORG"]; //No I18n
		}
		return headers;
	 },

	methodForRequest  : function (method ,type ,queryParams ,customData, actionName){ 
		if(type === "action"){
			switch(actionName){
			case "activate" :
				return customData.status === true ? "PUT" : "DELETE";  // No i18n
			case "clone" :
				return "POST";// No i18n
			case "publish" :
				return "PUT";// No i18n
			case "analytics" :
				return "GET";// No i18n
			case "count" :
				return "GET";// No i18n
			}
			
				
				
		}
		if (method === "PATCH"){ 
			return "PUT";  // No i18n
		}
		return method;
	}
});

//$Id$
store.registerSerializer("cadence",{
	
	normalize  : function (modelName ,type ,payload){ 
		if(type === "findAll" && payload){
			var userObj = payload.modified_by ? payload.modified_by : payload.created_by;
			payload.current_user = userObj;
			
			payload.isSelected = false; //used in row checkbox select
			if(payload.module){
				payload.module = payload.module.api_name;
			}
			
		}
		return payload; 
	}, 
	payloadKey: function(){
		return "cadences"; //No I18n   
	},
	normalizeResponse : function (){
		return this.$super.normalizeResponse.apply(this.$super, arguments);
	},
	serialize : function(type,payLoad){
		var reqBody = {};
		if(typeof payLoad !== "undefined"){
			  if(payLoad.hasOwnProperty("cadences_ids")){
				reqBody = payLoad;
			}else{
			reqBody.cadences = [payLoad.cadence];
			}
		}
			return reqBody;
	}
	
}).extends("application"); //No i18N

