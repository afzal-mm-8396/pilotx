//$Id$
//store.unregisterModel("layout_rule");
store.registerModel("layout_rule", {
    layout: Lyte.belongsTo("layout")//No I18n
});
//$Id$
//store.unregisterAdapter("layout_rule")
store.registerAdapter("layout_rule", {//No I18n
    namespace: 'crm/v4.1/settings',//No I18n
    buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
        if(customData.newFlow && ((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS) && !queryParams.filters)
		{
			url = url.replace('layout_rule','layout_rules');
			url = url.replace("v4.1", "v9");
			
			if(type === 'delete'){
				url = url + '/'+ customData.layout_id;
			}
			return url;
		}
        url = url.replace(modelName, 'layouts/' + customData.layout_id + '/rules');
        return url;
    }
});
//$Id$
//store.unregisterSerializer("layout_rule");
store.registerSerializer("layout_rule", {
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData) {
        if(customData.newFlow){
            if(Lyte.registeredMixins["crm-crux-create-base-mixin"].isEmptyObj(payLoad)){
                if (((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS)) {
                    return {layout_rules : []};
                }
                return {layout_rule : []};
            }else if(!((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS)){
                var _respL = payLoad.rules.length;
                for (var i = 0; i < _respL; i++){
                    if(!payLoad.rules[i].hasOwnProperty('id')){
                        payLoad.rules[i].id = customData.layout_id + "_" + i;
                    }
                    payLoad.rules[i].layout = customData.layout_id;
                }
            }
        }else{
            if (!payLoad || !Object.keys(payLoad).length) {
                return { layout_rule: [] };
            }
            var _respL = payLoad.rules.length;
            for (var i = 0; i < _respL; i++) {
                if (!payLoad.rules[i].id) {
                    payLoad.rules[i].id = customData.layout_id + "_" + i;
                }
                payLoad.rules[i].layout = customData.layout_id;
            }
        }
        return payLoad;
    },
    payloadKey: function (modelName , type , key , queryParams,customData ) {
        if(customData.newFlow && ((Crm.userDetails.LAYOUT_RULE_LYTE && !queryParams.isLRLyte) || Crm.userDetails.DYNAMIC_FORMS) && !queryParams.filters) {
            return 'layout_rules';//no i18n
        }
        return 'rules';//no i18n
    }
});