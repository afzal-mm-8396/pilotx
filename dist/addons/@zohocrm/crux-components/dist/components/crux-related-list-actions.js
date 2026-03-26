Lyte.Component.register("crux-related-list-actions", {
_template:"<template tag-name=\"crux-related-list-actions\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropRelatedList.module.api_name,'===','Attachments'),'&amp;&amp;',cxPropShowAttachmentActions)}}\"><template case=\"true\"> <lyte-button id=\"attach_drop\" data-zcqa=\"Detail_Add_Attachemnt\" lt-prop-appearance=\"primary\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.attach.option.label')}} </template> </lyte-button> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"#attach_drop\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropRlActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item onclick=\"{{action('relatedListActionClicked',this,item['data-cid'],event)}}\"> <lyte-menu-label>{{item.label}}</lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropRelatedList.module.api_name,'!==','Attachments')}}\"><template case=\"true\"><template items=\"{{cxPropRlActions}}\" item=\"action\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowAllActions,'||',expHandlers(isIncludes(cxPropAvailableRlActions,action['data-cid']),'&amp;&amp;',if(checkAction('Edit',action),if(relatedListRecords.length,true,false),true)))}}\"><template case=\"true\"><lyte-button id=\"{{if(checkAction('Edit',action),expHandlers('relList_Edit_','+',cxPropRelatedList.id),expHandlers(expHandlers(expHandlers('relList_','+',action.label),'+','_'),'+',cxPropRelatedList.id))}}\" onclick=\"{{action('relatedListActionClicked',this,action['data-cid'],event)}}\" data-zcqa=\"{{if(action.data_zcqa,action.data_zcqa,action.zcqa)}}\" class=\"{{if(isIncludes(cxPropRlActionHide,action['data-cid']),'showOnCheckActions','hideOnCheckActions')}}\" lt-prop-appearance=\"primary\" lt-prop-class=\"outlineprimary\"> <template is=\"registerYield\" yield-name=\"text\"> {{action.label}} </template> </lyte-button></template></template> </template></template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropRelatedList","cxPropRlActions","relatedListRecords","cxPropShowAttachmentActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropRlActionHide"],
_observedAttributesType :["object","array","array","boolean","boolean","array","array"],

	data : function(){
		return {
			cxPropRelatedList : Lyte.attr('object'), 
			cxPropRlActions : Lyte.attr('array'),
			relatedListRecords : Lyte.attr('array',{default : []}),
			cxPropShowAttachmentActions : Lyte.attr('boolean'),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropRlActionHide : Lyte.attr('array')
		}		
	},
	observeCount : function(){
		if(!this.getData('relatedListRecords.length')){
			$L(this.$node.querySelector("#relList_Edit_" + this.getData('cxPropRelatedList.id'))).hide();
		}
	}.observes('relatedListRecords.[]').on('init'),
	actions : {
		// Functions for event handling
		relatedListActionClicked : function(elem,action,eventObj){
			if(this.getMethods('relatedListAction')){
				this.executeMethod('relatedListAction',action,this.getData('cxPropRelatedList.id'),elem,eventObj);
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	},
	didConnect : function(){
		var campActions = this.$node.querySelectorAll('.showOnCheckActions');//No I18N
		if(campActions.length){
			campActions.forEach(function(elem){$L(elem).hide();})
		}
	}
});
Lyte.Component.registerHelper("checkAction",function(type,action){//No I18N 
	var actionName = action.data_zcqa ? action.data_zcqa.toLowerCase() : action.zcqa ? action.zcqa.toLowerCase() : "";
	var result = false; 
	if(type === 'Edit'){//No I18N
		result = actionName.includes('edit') || action['data-cid'] === 'dissociateMxN';//No I18N
	}
	return result;
});
Lyte.Component.registerHelper("isIncludes",function(array,value){//No I18N 
	if(array && array.length && value){
		return array.includes(value);
	}
	return false;
});
