Lyte.Component.register("crux-detailpage-wrapper", {
_template:"<template tag-name=\"crux-detailpage-wrapper\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropModule,'&amp;&amp;',cxPropSections),'&amp;&amp;',cxPropBusinessCardDetails),'&amp;&amp;',cxPropRecord)}}\"><template case=\"true\"> <crux-detailpage-header cx-prop-business-card-details=\"{{cxPropBusinessCardDetails}}\" cx-prop-record=\"{{cxPropRecord}}\" back-btn-method=\"{{method('executeBackBtn')}}\" record-header-edit-callback=\"{{method('recordWrapperEditCallback')}}\" cx-prop-record-options=\"{{cxPropRecordOptions}}\" excute-record-actions=\"{{method('excuteRecordActions')}}\" cx-prop-next-record=\"{{cxPropNextRecord}}\" cx-prop-previous-record=\"{{cxPropPreviousRecord}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-existing-tags=\"{{cxPropExistingTags}}\" cx-prop-record-tags=\"{{cxPropRecordTags}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-show-rec-image=\"{{cxPropShowRecImage}}\" on-tag-save=\"{{method('onRecordTagsSave')}}\" cx-prop-is-tag-field-supported=\"{{cxPropIsTagFieldSupported}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-show-more-button=\"{{cxPropShowMoreButton}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-show-edit-button=\"{{cxPropShowEditButton}}\" cx-prop-no-of-fields-in-header=\"{{cxPropNoOfFieldsInHeader}}\" cx-prop-show-back-button=\"{{cxPropShowBackButton}}\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"></crux-detailpage-header> <div class=\"cxDvWrapParent\"> <template is=\"if\" value=\"{{expHandlers(cxPropBusinessCardDetails.length,'>',cxPropNoOfFieldsInHeader)}}\"><template case=\"true\"><div class=\"dv_details_bc_section cxDvBcSection cxDvTabContent\"> <crux-detailpage-sections id=\"businesscard_section\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-ajax-request-to=\"{{cxPropAjaxRequestTo}}\" change-owner-section-callback=\"{{method('changeOwner')}}\" on-save=\"{{method('onSave')}}\" on-error=\"{{method('onError')}}\" ajax-save-handler=\"{{method('saveDetailAjax')}}\" self-execution=\"{{selfExecution}}\" record-is-in-ajax-edit=\"{{recordIsInAjaxEdit}}\" field-id-val=\"business_fieldElem\" cx-prop-business-card-details=\"{{cxPropBusinessCardDetails}}\" is-business-card-section=\"true\" cx-prop-no-of-fields-in-header=\"{{cxPropNoOfFieldsInHeader}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-self-execution=\"{{cxPropSelfExecution}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-layout-rules=\"{{cxPropLayoutRules}}\"> <template is=\"registerYield\" yield-name=\"detailSectionField\"> <lyte-yield yield-name=\"field-{{fieldObj.yieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-sections> </div></template></template> <div class=\"dv_details_section\"> <div id=\"detailview_tabheader\"> <lyte-nav class=\"lyteOuterNav cxDvLyteNav\" lt-prop-type=\"collapse\" lt-prop-user-value=\"label\" lt-prop-system-value=\"id\" lt-prop-nav-yield=\"true\" lt-prop-menu-yield=\"true\" lt-prop-items=\"{{cxPropDetailTabs}}\" lt-prop-max-width=\"70%\"> <template is=\"registerYield\" yield-name=\"nav\"> <template is=\"for\" items=\"{{items}}\" item=\"tab\" index=\"index\"> <lyte-nav-item id=\"header_{{tab.id}}\" class=\"cxDvNavItem cxDvShowHideArrowWrap\" data-value=\"{{tab.id}}\" onclick=\"{{action('scrollToContent',tab)}}\"><span class=\"cxDvShowHideArrowAnim\"></span> {{tab.label}}</lyte-nav-item> </template> </template> <template is=\"registerYield\" yield-name=\"menu\"> <lyte-menu-body> <template is=\"for\" items=\"{{items}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.id}}\" onclick=\"{{action('scrollToContent',item)}}\">{{item.label}}</lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-nav> </div> <div id=\"detailview_bodyContent\" class=\"cxDvBodyContent\"> <div id=\"detail_tab_content\" class=\"rl_scroll_header cxDvTabContent\"> <template items=\"{{cxPropSections}}\" item=\"section\" index=\"index\" is=\"for\"><div class=\"dvSectionContainer\"> <crux-detailpage-sections class=\"{{cruxGetShowHideClassForLR(section,cxPropLayoutRules,cxPropLayoutId,if(section.isSubformSection,'subform','section'))}}\" cx-prop-all-sections=\"{{cxPropSections}}\" component-unique-id=\"{{componentUniqueId}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-ajax-request-to=\"{{cxPropAjaxRequestTo}}\" change-owner-section-callback=\"{{method('changeOwner')}}\" on-save=\"{{method('onSave')}}\" on-error=\"{{method('onError')}}\" ajax-save-handler=\"{{method('saveDetailAjax')}}\" self-execution=\"{{selfExecution}}\" record-is-in-ajax-edit=\"{{recordIsInAjaxEdit}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-scroll-selector=\"{{cxPropScrollSelector}}\" cx-prop-section-data=\"{{section}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-self-execution=\"{{cxPropSelfExecution}}\" cx-prop-user-time-zone=\"{{cxPropUserTimeZone}}\" cx-prop-field-column-map=\"{{cxPropFieldColumnMap}}\" cx-prop-layout-rules=\"{{cxPropLayoutRules}}\"> <template is=\"registerYield\" yield-name=\"detailSectionField\"> <lyte-yield yield-name=\"field-{{fieldObj.yieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> </crux-detailpage-sections> </div></template> </div> <template is=\"if\" value=\"{{cxPropShowRelatedLists}}\"><template case=\"true\"> <crux-related-list-wrapper cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" cx-prop-related-list-yield=\"{{cxPropRelatedListYield}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-entity-id=\"{{cxPropEntityId}}\" cx-prop-related-lists=\"{{cxPropRelatedLists}}\" cx-prop-rl-data=\"{{cxPropRlData}}\" related-list-action=\"{{method('relatedListAction')}}\" rl-rec-action=\"{{method('rlRecAction')}}\" cx-prop-record=\"{{cxPropRecord}}\" rl-row-click=\"{{method('rlDetailRowClick')}}\"> </crux-related-list-wrapper> </template></template> </div> </div> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,3,1,1]},{"type":"registerYield","position":[3,3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,2]},{"type":"componentDynamic","position":[1]}]}]},{"type":"registerYield","position":[3,3,1,1,3],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3,1,1]},{"type":"attr","position":[3,3,3,1,1]},{"type":"for","position":[3,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]},{"type":"attr","position":[3,3,3,3]},{"type":"if","position":[3,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropModule","cxPropLayoutId","recordIsInAjaxEdit","cxPropRecord","cxPropSections","cxPropEntityId","cxPropBusinessCardDetails","cxPropModuleId","cxPropModuleData","cxPropModuleName","cxPropDetailTabs","selfExecution","cxPropRelatedLists","cxPropRlData","cxPropRecordOptions","cxPropRelatedListYield","cxPropNextRecord","cxPropPreviousRecord","cxPropDetailPageRoute","cxPropExistingTags","cxPropRecordTags","cxPropMaxTagLimit","cxPropShowRelatedLists","cxPropAjaxRequestTo","cxPropShowMoreButton","cxPropShowEditButton","cxPropShowBackButton","cxPropNoOfFieldsInHeader","cxPropSupportAjaxEdit","cxPropShowRecImage","cxPropIsTagFieldSupported","componentUniqueId","cxPropSelfExecution","cxPropUserTimeZone","cxPropFieldColumnMap","cxPropLayoutRules","cxPropScrollSelector","cxPropRlActionHide"],
_observedAttributesType :["string","string","boolean","object","array","string","array","string","object","string","array","boolean","array","object","array","boolean","string","string","string","array","array","number","boolean","string","boolean","boolean","boolean","number","boolean","boolean","boolean","string","boolean","string","object","object","string","array"],
 
	data : function(){
		return {
			cxPropModule : Lyte.attr("string"),
			cxPropLayoutId : Lyte.attr("string"),
			recordIsInAjaxEdit : Lyte.attr("boolean",{default : false}),
			cxPropRecord : Lyte.attr("object"),
			cxPropSections : Lyte.attr('array'),
			cxPropEntityId : Lyte.attr("string"),
			cxPropBusinessCardDetails : Lyte.attr("array"),
			cxPropModuleId : Lyte.attr("string"),
			cxPropModuleData : Lyte.attr('object'),
			cxPropModuleName 	 : Lyte.attr('string'),
			cxPropDetailTabs : Lyte.attr('array',{default : [{id : "overview_tab" , label : "Overview"},{id : "timeline_tab" , label : "Timeline"},{id : "dataprivacy_tab" , label : "Data Privacy"}]}),
			selfExecution : Lyte.attr('boolean',{default : false}),
			cxPropRelatedLists : Lyte.attr('array',{default : []}),
			cxPropRlData : Lyte.attr('object'),
			cxPropRecordOptions : Lyte.attr('array'),
			cxPropRelatedListYield : Lyte.attr('boolean',{default : false}),
			cxPropNextRecord : Lyte.attr('string'),
			cxPropPreviousRecord : Lyte.attr('string'),
			cxPropDetailPageRoute : Lyte.attr('string',{default : "crm.tab.module.entity.detail"}),
			cxPropExistingTags : Lyte.attr('array'),
			cxPropRecordTags : Lyte.attr('array'),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropShowRelatedLists : Lyte.attr('boolean',{default : true}),
			cxPropAjaxRequestTo : Lyte.attr('string',{default : "moduleapiname"}),
			cxPropShowMoreButton : Lyte.attr('boolean',{default : true}),
			cxPropShowEditButton : Lyte.attr('boolean',{default : true}),
			cxPropShowBackButton : Lyte.attr('boolean',{default : true}),
			cxPropNoOfFieldsInHeader : Lyte.attr('number',{default : 2}),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropShowRecImage : Lyte.attr('boolean',{default : true}),
			cxPropIsTagFieldSupported : Lyte.attr('boolean',{default : true}),
			componentUniqueId	: Lyte.attr('string',{default : '1234'}) ,
			cxPropSelfExecution	: Lyte.attr('boolean',{default : true}),
			cxPropUserTimeZone : Lyte.attr('string',{default : ''}),
			cxPropFieldColumnMap : Lyte.attr('object',{default : {}}),
			cxPropLayoutRules : Lyte.attr('object',{default : {}}),
			cxPropScrollSelector : Lyte.attr('string',{default : 'crux-detailpage-wrapper'}),
			cxPropRlActionHide : Lyte.attr('array',{default : []})
		};		
	},
	init : function(){ 
		var _self = this;
		//For Crm
		// if(!this.getData('cxPropModule') && this.getData('cxPropModuleId')){
		// 	store.findRecord('module',_self.data.cxPropModuleId).then(function(res){
		// 		_self.setData({cxPropModule : res[0].api_name , cxPropModuleData : res[0]});
		// 	})
		// }
		// if(!this.getData('cxPropRecord') && this.getData('cxPropModuleId') && this.getData('cxPropEntityId')){
		// 	this.setData('selfExecution',true);
		// 	store.findRecord(_self.data.cxPropModuleId , _self.data.cxPropEntityId).then(function(res){
		// 		_self.setData('cxPropRecord' , res[0]);
		// 	})
		// }
		
		//Based On core structure
        if( !this.getData('cxPropModuleId') && this.getData('cxPropModule')){
            store.findRecord('module',_self.data.cxPropModule).then(function(res){
                _self.setData({cxPropModuleId : res[0].id , cxPropModuleData : res[0]});
            });
        }
        if(!this.getData('cxPropRecord') && this.getData('cxPropModule') && this.getData('cxPropEntityId')){
            this.setData('selfExecution',true);
            store.findRecord(_self.data.cxPropModule , _self.data.cxPropEntityId).then(function(res){
                _self.setData('cxPropRecord' , res[0]);
            });
        }

		this.getPageTabValues();
		  
	},
	getLayoutDetails : function(){
		var _self = this;
		//For Crm
		// if(!this.getData('cxPropSections') && this.getData('cxPropLayoutId')){
		// 	store.findRecord('layout', _self.data.cxPropLayoutId ,{module : _self.data.cxPropModule}).then(function(res){
		// 		_self.setData('cxPropSections', res[0].sections );
		// 	})
		// }
		// //change following request to core business card request pattern
		// if(!this.getData('cxPropBusinessCardDetails') && this.getData('cxPropLayoutId')){
		// 	store.findRecord('layout', _self.data.cxPropLayoutId ,{module : _self.data.cxPropModule , mode : "business_card"}).then(function(res){
		// 		_self.setData('cxPropBusinessCardDetails', res[0].sections[0].fields );
		// 	})
		// }

		//Based On core structure
		if(!this.getData('cxPropSections') && this.getData('cxPropLayoutId')){
            store.findAll('section',{module : _self.data.cxPropModule , layoutId : this.data.layoutId}).then(function(res){
                var bCard,otherSections = [];
				res[0].sections.filter(function(section){
                    if( !_self.getData("cxPropBusinessCardDetails") && section.api_name === "Business_Card"){
                        bCard = section;
                    }else if(section.api_name !== "Quick_Create"){
						otherSections.push(section);
					}
                });
                _self.setData({'cxPropBusinessCardDetails': bCard[0].section_field , cxPropSections : otherSections});
            });
        }
	}.observes('cxPropModule'),
	actions : {
		// Functions for event handling
		scrollToContent : function(tab){
			if(tab.id === "details_tab"){
				$L('#detailview_bodyContent').scrollTo($L('#detail_tab_content'),{ duration: 400,offset: { top: 0 } });
			}else{
				$L('#detailview_bodyContent').scrollTo($L('#'+tab.api_name+"__"+tab.id),{ duration: 400,offset: { top: - 20 } });
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
		executeBackBtn : function(){
			if(this.getMethods('backBtnUserMethod')){
				return this.executeMethod('backBtnUserMethod');
			}
		},
		recordWrapperEditCallback : function(elem, eventObj){
			if(this.getMethods('recordEditCallback')){ 
				return this.executeMethod('recordEditCallback',elem, eventObj);  
			}
		},
		excuteRecordActions : function(value,event,element, menuoriginElem , clickedItemDetail){
			if(this.getMethods('excuteRecordActions')){
				return this.executeMethod('excuteRecordActions',value,event,element, menuoriginElem , clickedItemDetail);
			}
		},
		saveDetailAjax : function(changedData , fieldObj){
			if(this.getMethods('ajaxEditSave')){
				return this.executeMethod('ajaxEditSave',changedData,fieldObj);
			}
		},
		onSave : function(successRes,fieldObj){ 
			if(this.getMethods('onSaveAjax')){
				return this.executeMethod('onSaveAjax',successRes,fieldObj);
			}
		},
		onError : function(errorRes){
			if(this.getMethods('onErrorAjax')){
				return this.executeMethod('onErrorAjax',errorRes);
			}
		},
		relatedListAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListAction')){
				return this.executeMethod('relatedListAction',actionId, rlId , elem , eventObj);
			}
		},
		rlRecAction : function(actionId,recId,rlId,elem,eventObj,record){
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',actionId ,recId , rlId , elem , eventObj,record);
			}
		},
		rlDetailRowClick : function(rec,evnt,rl){
			if(this.getMethods('relatedListRowClick')){
				return this.executeMethod('relatedListRowClick',rec,evnt,rl);
			}
		},
		onRecordTagsSave : function(allTags,newlyCreatedTags){
			if(this.getMethods('onTagsSave')){
				return this.executeMethod('onTagsSave',allTags,newlyCreatedTags);
			}
		},
		changeOwner : function(fieldObject , userId ,fieldElem){
			if(this.getMethods('userChangeOwner')){
				return this.executeMethod('userChangeOwner',fieldObject , userId ,fieldElem);
			}
		}
	},
	didConnect : function(){
		// this.setDVBodyHeight();
		// window.addEventListener('resize',this.setDVBodyHeight);
        // $L('#detailview_bodyContent').scroll().scrollspy({query:".rl_scroll_header",activeClass : 'headerActive', onChange : function(current, changed, scrollDiv){
		// 	if(changed){
		// 		$L('.lyteNavActive').removeClass('lyteNavActive');
		// 	}
		// 	if(current){
		// 			if(current.id === "detail_tab_content"){
		// 				$L('#header_details_tab').addClass('lyteNavActive')
		// 			}else{
		// 			var correspondingHeader = current.id.split('__');
		// 			if(correspondingHeader && correspondingHeader[1]){
		// 				$L('#header_'+correspondingHeader[1]).addClass('lyteNavActive');
		// 			}
		// 		}
		// 	}
		// }})
	},
	didDestroy : function(){
		window.removeEventListener('resize',this.setDVBodyHeight);
	},
	setDVBodyHeight : function(){
		var detailviewbodycontent = $L('#detailview_bodyContent');
        var detailviewbodyheight = window.innerHeight - detailviewbodycontent.offset().top;
        var wmsbarheight = $L('.wms-chatwindowcontainer').height();
        detailviewbodycontent.height(detailviewbodyheight - (wmsbarheight ? wmsbarheight + 40 : 60)); //40px is the top and bottom padding value
	},
	getPageTabValues : function(){
		var pageTabDetails = [];
		var rlMetaData = this.getData('cxPropRelatedLists');
		pageTabDetails[0] = {id : "details_tab" , label : "Details"};
		if(rlMetaData.length){
			rlMetaData.forEach(function(item){
				var dummy = {};
				dummy.id = item.id;
				dummy.label = item.display_label;
				dummy.api_name = item.api_name;
				pageTabDetails.push(dummy);
			});
		}
		this.setData('cxPropDetailTabs' , pageTabDetails);
	}
});

Lyte.Component.registerHelper("cruxGetShowHideClassForLR", function(config,lR_exec_result,layoutId,type){
	if(!lR_exec_result || !config || !type)
	{
		return '';
	}
	
	if(type === 'field') //eslint-disable-line @zoho/zstandard/no-ifel
	{
		
		if(lR_exec_result && lR_exec_result.LRfieldvsMandate && lR_exec_result.LRfieldvsMandate[config.api_name] && config[layoutId] && !config[layoutId].isLayoutConfigLevelMandatory)
		{
			config[layoutId].required = lR_exec_result.LRfieldvsMandate[config.api_name] === 'true';			
		}
		
		if(lR_exec_result && lR_exec_result.LRfieldvsShowType && lR_exec_result.LRfieldvsShowType[config.api_name] === 'hide')
		{
			return 'cxHide';//No I18N
		}
	}
	else if (type === 'section')
	{
		var secname = config.api_name ? config.api_name.replace(/ |'/g,"_") :'';//No I18N
		if(lR_exec_result && lR_exec_result.LRsectionvsShowType && lR_exec_result.LRsectionvsShowType[secname] === 'hide')
		{
			return 'cxHide';//No I18N
		}
		if(lR_exec_result && lR_exec_result.LRfieldvsShowType && config.fields)
		{
			var allFieldsHidden = true;
			config.fields.forEach( function( field){
				if(!allFieldsHidden)
				{
					return;
				}
				// column.forEach(function(field){
					if(!lR_exec_result.LRfieldvsShowType[field.api_name] || lR_exec_result.LRfieldvsShowType[field.api_name]!=='hide')
					{
						allFieldsHidden = false;
					}
				// });
			});
			if(allFieldsHidden)
			{
				return 'cxHide';//No I18N
			}
		}
	}
	else if (type === 'subform')
	{
		var subname = config.subform_apiname ? config.subform_apiname : config.fields ? config.fields.filterBy({ui_type:500})[0].api_name : '';//No I18N
		if(lR_exec_result && lR_exec_result.LRsubformvsShowType && lR_exec_result.LRsubformvsShowType[subname] === 'hide')
		{
			return 'cxHide';//No I18N
		}
	}
	return '';
});