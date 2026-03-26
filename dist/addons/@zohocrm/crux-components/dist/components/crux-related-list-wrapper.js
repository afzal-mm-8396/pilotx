Lyte.Component.register("crux-related-list-wrapper", {
_template:"<template tag-name=\"crux-related-list-wrapper\"> <lyte-event-listener event-name=\"relatedListRefresh\" on-fire=\"{{action('refreshRL')}}\"></lyte-event-listener> <template is=\"if\" value=\"{{cxPropRelatedListYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxPropRelatedListYield\"></lyte-yield> </template><template case=\"false\"> <template items=\"{{cxPropRelatedLists}}\" item=\"relatedList\" index=\"index\" is=\"for\"><div class=\"cx_detail_rl_container\"> <template is=\"if\" value=\"{{expHandlers(relatedList.api_name,'===','Notes')}}\"><template case=\"true\"><div id=\"{{relatedList.api_name}}__{{relatedList.id}}\" class=\"rl_scroll_header\"> <crux-note cx-prop-forced-fetch=\"true\" cx-prop-query-param=\"{{cxPropQueryParam}}\" cx-prop-rich-text-format=\"{{cxPropNotesRichText}}\" cx-prop-entity=\"{{cxPropRecord}}\" cx-prop-module=\"{{cxPropModuleName}}\" relid=\"{{relatedList.id}}\" cx-prop-selected-filter=\"All\" cx-prop-note-count=\"true\" cx-prop-related-list=\"{{relatedList}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\"></crux-note> </div></template><template case=\"false\"> <crux-related-list-table data-zcqa=\"Related_list_Div_{{relatedList.display_label}}\" lyte-view-port=\"{{cxPropLyteViewPort}}\" cx-prop-show-rl-actions=\"{{cxPropShowRlActions}}\" cx-prop-show-all-actions=\"{{cxPropShowAllActions}}\" cx-prop-available-rl-actions=\"{{cxPropAvailableRlActions}}\" cx-prop-role-values=\"{{cxPropRoleValues}}\" cx-prop-show-edit-delete-icons=\"{{cxPropShowEditDeleteIcons}}\" cx-prop-show-attachment-actions=\"{{cxPropShowAttachmentActions}}\" cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" cx-prop-bulk-request-to=\"{{cxPropBulkRequestTo}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" id=\"rl_{{relatedList.id}}\" cx-prop-rl=\"{{relatedList}}\" cx-prop-rl-data=\"{{cxPropRlData[relatedList.id]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" related-list-table-action=\"{{method('relatedListWrapperAction')}}\" rl-table-row-click=\"{{method('rlWrapperTableRowClick')}}\" rl-rec-action=\"{{method('rlRecAction')}}\"></crux-related-list-table> </template></template> </div></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}}],
_observedAttributes :["cxPropRelatedLists","cxPropModule","cxPropModuleId","cxPropModuleName","cxPropLayoutId","cxPropEntityId","cxPropRlData","cxPropRecord","cxPropRelatedListYield","cxPropBulkRequestTo","componentUniqueId","cxPropQueryParam","cxPropRlActionHide","cxPropShowEditDeleteIcons","cxPropShowRlActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropNotesRichText","cxPropRoleValues","cxPropLyteViewPort","cxPropShowAttachmentActions"],
_observedAttributesType :["array","string","string","string","string","string","object","object","boolean","string","string","object","array","boolean","boolean","boolean","array","boolean","array","boolean","boolean"],

	data : function(){
		return {
			cxPropRelatedLists	 : Lyte.attr('array'),
			cxPropModule 	  	 : Lyte.attr('string'),
			cxPropModuleId: Lyte.attr('string'),
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropLayoutId		 : Lyte.attr('string'),
			cxPropEntityId		 : Lyte.attr('string'), 
			cxPropRlData 		 : Lyte.attr('object'),
			cxPropRecord 		 : Lyte.attr('object'),
			cxPropRelatedListYield : Lyte.attr('boolean'),
			cxPropBulkRequestTo : Lyte.attr('string'),
			componentUniqueId	: Lyte.attr('string',{default : '1234'}) ,
			cxPropQueryParam	: Lyte.attr('object',{default : {}}),
			cxPropRlActionHide : Lyte.attr('array',{default : []}),
			cxPropShowEditDeleteIcons : Lyte.attr('boolean',{default : true}), 
			cxPropShowRlActions	:	Lyte.attr('boolean',{default : true}),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropNotesRichText : Lyte.attr('boolean',{default : false}), 
			cxPropRoleValues : Lyte.attr('array'),
			cxPropLyteViewPort : Lyte.attr('boolean',{default : false}),
			cxPropShowAttachmentActions : Lyte.attr('boolean',{default : true})
		}		
	},
	init : function(){
		if(this.getData('componentUniqueId') !== '1234'){
			this.setData('cxPropQueryParam',{'sort_by':'Created_Time' , 'sort_order':'desc' , 'uniqueId' : this.getData('componentUniqueId')});
		}
	},
	observeLayoutId : function(){
		var _self = this;
		var rlList = this.getData('cxPropRelatedLists');
		if(!rlList){
			store.findAll('related_list',{module : this.getData('cxPropModule'), layout_id : this.getData('cxPropLayoutId')}).then(function(res){
				var list = res.filter(function (item) { return item.visible; });
				_self.setData('cxPropRelatedLists',list);
			})
		}
	}.observes('cxPropLayoutId').on('init'),
	actions : {
		// Functions for event handling
		refreshRL : function(data){
			var rlNode = this.$node.querySelector('#rl_'+data.id);
			rlNode.component.setData('cxPropRlData',data.rlData);
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		relatedListWrapperAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListAction')){
				return this.executeMethod('relatedListAction',actionId, rlId , elem , eventObj);
			}
		},
		rlRecAction : function(actionId,recId,rlId,elem,eventObj,record){
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',actionId ,recId , rlId , elem , eventObj,record);
			}
		} ,
		rlWrapperTableRowClick : function(rec,evnt,rl){
			if(this.getMethods('rlRowClick')){
				return this.executeMethod('rlRowClick',rec,evnt,rl);
			}
		}
	}
});
