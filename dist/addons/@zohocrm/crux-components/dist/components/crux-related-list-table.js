Lyte.Component.register("crux-related-list-table", {
_template:"<template tag-name=\"crux-related-list-table\"> <lyte-event-listener event-name=\"refreshRlWithId\" on-fire=\"{{action('refreshRLwithId')}}\"></lyte-event-listener> <div id=\"rl_header\" class=\"cx_rl_header cxFlex cxAlignItemCenter\"> <span id=\"{{cxPropRl.api_name}}__{{cxPropRl.id}}\" class=\"rl_scroll_header cx_rl_scroll_header\" data-zcqa=\"Related_List_Name_{{cxPropRl.display_label}}\">{{cxPropRl.display_label}}</span> <template is=\"if\" value=\"{{cxPropShowRlActions}}\"><template case=\"true\"><crux-related-list-actions cx-prop-show-all-actions=\"{{cxPropShowAllActions}}\" cx-prop-available-rl-actions=\"{{cxPropAvailableRlActions}}\" cx-prop-show-attachment-actions=\"{{cxPropShowAttachmentActions}}\" cx-prop-rl-action-hide=\"{{cxPropRlActionHide}}\" related-list-records=\"{{tableData}}\" cx-prop-rl-actions=\"{{cxPropRl.actions}}\" cx-prop-related-list=\"{{cxPropRl}}\" related-list-action=\"{{method('relatedListTableAction')}}\"></crux-related-list-actions></template></template> </div> <div id=\"{{cxPropRl.id}}\"> <crux-table-component cx-prop-textarea-properties=\"{{cxPropTextAreaProperties}}\" cx-prop-header=\"{{rlFields}}\" cx-prop-label-selector=\"field_label\" cx-prop-content=\"{{tableData}}\" cx-prop-sort-columns=\"true\" cx-prop-body-id=\"rlTableBody\" on-body-row-click=\"{{action('relatedListTableRowClick')}}\" cx-prop-row-zcqa=\"detailView\" cx-prop-date-properties=\"{{cxPropDateUserProperties}}\" data-zcqa=\"relatedListTable\" cx-prop-datetime-properties=\"{{cxPropDateTimeUserProperties}}\" cx-prop-lookup-properties=\"{{cxPropLookupProperties}}\" cx-prop-field-type-mapping=\"{{fieldMapping}}\" cx-prop-field-type-mapping-selector=\"api_name\" cx-prop-no-records-message=\"No records found\" cx-prop-table-id=\"listviewtable\" cx-prop-table-class=\"related_listview_tale\" cx-prop-module=\"{{cxPropRl.module.api_name}}\" cx-prop-add-search=\"false\" cx-prop-enable-body-scroll=\"false\" cx-prop-yield-for-prefix=\"{{if(expHandlers(prefixYields.length,'>',0),true,false)}}\" cx-prop-prefix-yields=\"{{prefixYields}}\" class=\"lyteOuterTable cx_rl_table_component\"> <template is=\"yield\" yield-name=\"body-lookup\"> <template is=\"if\" value=\"{{fieldObj.isDisplayField}}\"><template case=\"true\"> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{recordObj[fieldObj.api_name]}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{cxPropRl.transition.module}}&quot;, &quot;{{recordObj.id}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropRl.type,'===','multiselectlookup')}}\"><template case=\"true\"> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{getNestedObjValue(recordObj,fieldObj.api_name)}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{fieldObj.lookup.module.api_name}}&quot;, &quot;{{getNestedObjValue(recordObj,fieldObj.api_name,true)}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template></template></template></template> <template> <crux-lookup-component cx-prop-tooltip-show=\"false\" cx-prop-show-bc=\"{{cxPropLookupProperties.showBc}}\" cx-prop-target=\"{{cxPropLookupProperties.target}}\" cx-prop-value=\"{{recordObj[fieldObj.api_name]}}\" cx-prop-route-name=\"{{cxPropRl.transition.route}}\" cx-prop-dynamic-params=\"[&quot;{{fieldObj.lookup.module.api_name}}&quot;, &quot;{{recordObj[fieldObj.api_name].id}}&quot;]\" cx-prop-id=\"listView_{{recordObj.id}}\"></crux-lookup-component> </template> </template> <template is=\"yield\" yield-name=\"body-contact-role\"> {{getContactRole(recordObj.Contact_Role,cxPropRoleValues)}} </template> <template is=\"yield\" yield-name=\"body-custom-yield\"> <lyte-yield yield-name=\"rl-body-{{fieldObj.customYieldName}}\" field-obj=\"{{fieldObj}}\" record-obj=\"{{recordObj}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <template is=\"if\" value=\"{{expHandlers(cxPropRl.record_operations,'&amp;&amp;',cxPropRl.record_operations.edit)}}\"><template case=\"true\"> <span onclick=\"{{action('handleRlrecordAction',recordObj,'edit',this)}}\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropRl.record_operations,'&amp;&amp;',expHandlers(cxPropRl.record_operations.delete,'||',cxPropRl.record_operations.disassociate))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(cxPropRl.record_operations.disassociate)}}\"><template case=\"true\"><span onclick=\"{{action('handleRlrecordAction',recordObj,'unassign',this)}}\"></span></template><template case=\"false\"><span onclick=\"{{action('handleRlrecordAction',recordObj,'unassign',this)}}\"></span></template></template> </template></template> </template> </crux-table-component> </div> <template is=\"if\" value=\"{{expHandlers(cxPropRlData.length,'>',expHandlers(cxPropRlInfo.per_page,'-',1))}}\"><template case=\"true\"><lyte-navigator lt-prop-yield=\"true\" on-next=\"{{method('navigNext')}}\" on-previous=\"{{method('navigPrevious')}}\" lt-prop-value=\"{{startIndex}}\" lt-prop-records=\"{{cxPropRlData.length}}\" lt-prop-perpage=\"{{expHandlers(cxPropRlInfo.per_page,'-',1)}}\"> <template is=\"registerYield\" yield-name=\"navigatorYield\"> <div class=\"lyteSingleBack lyteIconSingleBack\"></div> <div class=\"lyteNavigatorMidPoint\"> {{startRecord}} <span class=\"lyteNavigatorText\">-</span> {{endRecord}} </div> <div class=\"lyteSingleFront lyteIconSingleFront\"></div> </template> </lyte-navigator></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,1,3],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"registerYield","position":[5,1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[5,1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[3,1]},{"type":"text","position":[3,5]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["cxPropRl","cxPropModule","cxPropModuleId","cxPropEntityId","cxPropLayoutId","cxPropRlData","cxPropDateTimeUserProperties","cxPropDateUserProperties","cxPropShowEditDeleteIcons","cxPropLookupProperties","defaultUiTypeToCruxMapping","fieldMapping","rlFields","tableData","prefixYields","cxPropRlInfo","startIndex","cxPropFromYield","cxPropBulkRequestTo","relatedModule","makeRequestOnNavig","cxPropTextAreaProperties","cxPropShowAttachmentActions","cxPropShowRlActions","cxPropShowAllActions","cxPropAvailableRlActions","cxPropRoleValues","lyteViewPort","cxPropRetainInput","cxPropRlActionHide"],
_observedAttributesType :["object","string","string","string","string","array","object","object","boolean","object","object","object","array","array","array","object","number","boolean","string","string","boolean","object","boolean","boolean","boolean","array","array","boolean","boolean","array"],

	data : function(){
		return {
			cxPropRl : Lyte.attr('object'),
			cxPropModule : Lyte.attr('string'),
			cxPropModuleId: Lyte.attr('string'),
			cxPropEntityId : Lyte.attr('string'),
			cxPropLayoutId : Lyte.attr('string'),
			cxPropRlData : Lyte.attr('array'),
			cxPropDateTimeUserProperties : Lyte.attr('object'),
			cxPropDateUserProperties : Lyte.attr('object'),
			cxPropShowEditDeleteIcons : Lyte.attr('boolean',{default : true}),
			cxPropLookupProperties: Lyte.attr('object',{default:{"routeName":"crm.tab.module.entity","target":"_blank","showBc" : false,"hideIconForView":true,"hoverCallback":false}}),//NO I18N
			defaultUiTypeToCruxMapping : Lyte.attr('object',{default : {"1": "text","2": "picklist","3": "text-area","4": "lookup","5": "lookup","8": "user","14": "date-time","20": "user",//No I18N
																		"21": "website","22": "twitter","24": "date","25": "email","26": "picklist","32": "number","33": "phone","34": "number","36": "number","38": "number","39": "picklist","40": "number","52": "number",//No I18N
																		"55": "user","77": "number","100": "picklist","110": "text-area","111": "text","133": "lookup","143": "number","144": "number",//No I18N
																		"145": "number","200": "date-time","202": "date","207": "layout","208": "layout","209": "tag","221": "user","300": "boolean","301": "boolean","333": "date-time","786": "date-time","999": "layout"//No I18N
									}}),
			fieldMapping : Lyte.attr('object'),
			rlFields : Lyte.attr('array'),
			tableData : Lyte.attr('array'),
			prefixYields : Lyte.attr('array', {default : []}),
			cxPropRlInfo : Lyte.attr('object' , {default : {per_page : 11 , page : 1 ,more_records : false}}),
			startIndex : Lyte.attr('number'),
			cxPropFromYield : Lyte.attr('boolean',{default : false}),
			cxPropBulkRequestTo : Lyte.attr('string',{default  : 'moduleapiname'}),
			relatedModule : Lyte.attr('string'),
			makeRequestOnNavig : Lyte.attr('boolean',{default : false}),
			cxPropTextAreaProperties : Lyte.attr('object',{default : {lineClamp : 3}}),
			cxPropShowAttachmentActions : Lyte.attr('boolean',{default : true}),
			cxPropShowRlActions : Lyte.attr('boolean',{default : true}),
			cxPropShowAllActions : Lyte.attr('boolean',{default : true}),
			cxPropAvailableRlActions : Lyte.attr('array'),
			cxPropRoleValues : Lyte.attr('array'),
			lyteViewPort	: Lyte.attr("boolean", { "default": false }),
			cxPropRetainInput : Lyte.attr("boolean",{default : true}),
			cxPropRlActionHide : Lyte.attr('array')
			
		}		
	},
	viewPortObs : function(){
		if(!this.getData('lyteViewPort')){
			this.initHandler();
		}
	}.observes('lyteViewPort').on('init'),
	initHandler : function(){
		var rlMeta = this.getData('cxPropRl');
		if(!rlMeta.fields){
			store.findRecord('related_list',rlMeta.id,{module : this.data.cxPropModule , layout_id : this.data.cxPropLayoutId,include_inner_details : "fields.ui_type,fields.lookup,fields.formula,fields.rollup_summary,fields.field_label,fields.pick_list_values,fields.separator,fields.decimal_place,fields.data_type,fields.refer_from_field"}).then(function(res){
				if(res && res.length){
					this.setData({
						cxPropRl : res[0] , 
						cxPropRlData : [] , 
						makeRequestOnNavig : true
					});
					this.relatedListObserver();
				}
			}.bind(this));
		}else if(this.data.cxPropRlData){
			if(!this.data.cxPropDateTimeUserProperties){
				this.setData('cxPropDateTimeUserProperties', {datetimeInUserPattern : true});
			}
			if(!this.data.cxPropDateUserProperties){
				this.setData('cxPropDateUserProperties', {dateInsUserPattern : true});
			}
			this.setData({
				makeRequestOnNavig : false
			});
			this.setRelatedListData();
		}else{
			this.setData({
				cxPropRlData : [] , 
				makeRequestOnNavig : true
			});
            this.relatedListObserver();
        }
		if(this.data.cxPropBulkRequestTo === "moduleid" && this.getData('cxPropRl').module){
				if(this.getData('cxPropRl').type === 'multiselectlookup' && this.getData('cxPropRl').connectedmodule){
					this.setData('relatedModule',this.getData('cxPropRl').connectedmodule); //no i18n
				}else{
					this.setData('relatedModule',this.getData('cxPropRl').module.api_name); //no i18n
				}
		}
	},
	relatedListObserver : function(){
		//Triggering self rl data request
		var rlMeta = this.getData('cxPropRl');
		var params = {relatedId : this.getData("cxPropEntityId") , relationId : rlMeta.id , per_page : this.data.cxPropRlInfo.per_page , page : this.data.cxPropRlInfo.page };
		var bulkReqModel = this.getData('cxPropModule');
		if(this.data.cxPropBulkRequestTo === "moduleid"){
			bulkReqModel = this.data.cxPropModuleId;
			if(rlMeta.type === 'multiselectlookup'){
				params.fields = rlMeta.fields.map((item)=>item.api_name).join(',');//no i18n
				params.fields += ',id'; //no i18n
				var mxnFieldIdFetch = store.peekRecord('field',rlMeta.mxnfield); //no i18n
				var mxnName = mxnFieldIdFetch && mxnFieldIdFetch.multiselectlookup && mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname ? mxnFieldIdFetch.multiselectlookup.connectedlookup_apiname : '';
				if(mxnName){
					params.fields += ','+mxnName;
					params.fields += ','+mxnName+'.$approval,'+mxnName+'.$approval_state,'+mxnName+'.$approved,'+mxnName+'.$review_process,'+mxnName+'.$review,'+mxnName+'.$stop_processing,'+mxnName+'.$locked_for_me,'+mxnName+'.$editable';
				}
			}
		}
		var customData = {};
		if(this.getData('cxPropRl.action') === 'picklist_tracker'){
			customData.type = 'GET';
		}
		store.findAll(bulkReqModel,params,false,false,customData).then(function(resp){
			var res = resp;
			if(res && res[bulkReqModel] ){
				res = store.modelFor(this.getData('cxPropRl.module.id')) ? store.pushPayload(this.getData('cxPropRl.module.id'),res[bulkReqModel]) : res[bulkReqModel];
			}
			if(res && res.length && this.getData('cxPropRl.api_name') === 'Attachments'){
				res.forEach(function(file){
					this.fileSizeFormat(file);
				}.bind(this))
			}
			Lyte.arrayUtils(this.getData('cxPropRlData'),'push',res);
			if(resp.meta){
				this.setData({cxPropRlInfo : resp.meta ,makeRequestOnNavig : resp.meta.more_records})
			}
			this.setRelatedListData();
		}.bind(this));
	}, 
	fileSizeFormat : function(file){			
		if(file.$type == "Document" && file.$docs_file_size){
			file.Size = file.$docs_file_size
		}
		var size = file.Size / 1024;
		if(size > 1000){
			size = size / 1024;
			size = parseFloat(size).toFixed(2) + ' ' + I18n.getMsg('MB')
		}else if(size != 0){
			size = parseFloat(size).toFixed(2) + ' ' + I18n.getMsg('KB')
		}else{
			size = '-';
		}
		file.Size = size;
		if(file.$type == "Link URL"){
			file.extn = 'link'
		}		
	},
	findRLColumnsOnRefresh : function(rlId){
		store.findRecord('related_list',rlId,{module : this.data.cxPropModule , layout_id : this.data.cxPropLayoutId,include_inner_details : "fields.ui_type,fields.lookup,fields.formula,fields.rollup_summary,fields.field_label,fields.pick_list_values,fields.separator,fields.decimal_place,fields.data_type,fields.refer_from_field"}).then(function(res){
			if(res && res.length){
				this.setData({
					cxPropRl : res[0] 
				});
			}
		}.bind(this))
	},
	actions : {
		handleRlrecordAction : function(record,value,elem){
			//call user method
			if(this.getMethods('rlRecAction')){
				return this.executeMethod('rlRecAction',value ,record.id , this.getData('cxPropRl.id') , elem , event,record);
			}
		},
		refreshRLwithId : function(data){
			if(this.data && data.id === this.getData('cxPropRl.id')){
				var bulkReqModel = this.getData('cxPropModule');
				var rlMeta = this.getData('cxPropRl');
				var params = {relatedId : this.getData("cxPropEntityId") , relationId : rlMeta.id , per_page : 11 , page : 1 };
				if(this.data.cxPropBulkRequestTo === "moduleid"){
					bulkReqModel = this.data.cxPropModuleId;
				}
				if(data.fields){
					params.fields = data.fields;
				}
				var customData = {};
				if(this.getData('cxPropRl.action') === 'picklist_tracker'){
					customData.type = 'GET';
				}
				if(data.refreshTemplate){
					this.findRLColumnsOnRefresh(this.getData('cxPropRl.id'));
				}
				store.findAll(bulkReqModel,params,false,false,customData).then(function(resp){
					var res = resp;
					if(res && res[bulkReqModel] ){
						res = store.modelFor(this.getData('cxPropRl.module.id')) ? store.pushPayload(this.getData('cxPropRl.module.id'),res[bulkReqModel]) : res[bulkReqModel];
					}
					if(res && res.length && this.getData('cxPropRl.api_name') === 'Attachments'){
						res.forEach(function(file){
							this.fileSizeFormat(file);
						}.bind(this))
					}
					this.setData('cxPropRlData',[]);
					Lyte.arrayUtils(this.getData('cxPropRlData'),'push',res);
					if(resp.meta){
						this.setData({cxPropRlInfo : resp.meta ,makeRequestOnNavig : resp.meta.more_records})
					}
					this.setRelatedListData();
				}.bind(this));
				Lyte.triggerEvent('rlRefreshed',{id : data.id});
			}
		},
		relatedListTableRowClick : function(record,evnt){
			if(this.getMethods('rlTableRowClick')){
				return this.executeMethod('rlTableRowClick',record,evnt,this.data.cxPropRl);
			}
		}
		
	}, 
	methods : {
		// Functions which can be used as callback in the component.
		relatedListTableAction : function(actionId, rlId , elem , eventObj){
			if(this.getMethods('relatedListWrapperAction')){
				return this.executeMethod('relatedListWrapperAction',actionId, rlId , elem , eventObj);
			}
		},
		navigNext : function(){
			this.setData('cxPropRlInfo.page',this.getData('cxPropRlInfo.page')+1);
			if(this.data.makeRequestOnNavig){
				this.relatedListObserver();
			}else{
				if(this.data.cxPropFromYield && this.getMethods('fetchRlRecords')){
					return this.executeMethod('fetchRlRecords',this.getData('cxPropRlInfo.page'), this.getData('cxPropRl.id') );
				}	
				this.setRelatedListData();
			}
		},
		navigPrevious : function(){
			this.setData('cxPropRlInfo.page',this.getData('cxPropRlInfo.page')-1);
			if(this.data.cxPropFromYield && this.getMethods('fetchRlRecords')){
				return this.executeMethod('fetchRlRecords',this.getData('cxPropRlInfo.page') , this.getData('cxPropRl.id') );
			}
			this.setRelatedListData();
		}
	},
	constructFieldMapping : function(){
		var _self = this;
		var lookupProperties = Lyte.deepCopyObject(_self.getData('cxPropLookupProperties'));//NO I18N
		if(_self.getData('cxPropRl.fields')){
			var allFields = _self.getData('cxPropRl.fields') , fieldMap = {} ,rlFields = [];
			var rlApiName = _self.getData('cxPropRl.api_name');
			if(rlApiName !== "Attachments" && this.getData('cxPropShowEditDeleteIcons')){ 
				Lyte.arrayUtils( _self.getData('prefixYields'), 'push' , {fixed  :"enable" , class : "editDeleteIcons"} )
			}
			if(allFields){
				allFields.forEach(function(field,index){
					if(field.ui_type && _self.data.defaultUiTypeToCruxMapping[field.ui_type]){
						fieldMap[field.api_name] = _self.data.defaultUiTypeToCruxMapping[field.ui_type];
					}else if(field.data_type && field.data_type !== "ownerlookup" && field.data_type !== "userlookup" && field.data_type !== "textarea"){
						fieldMap[field.api_name] = field.data_type;
					} 
					if(rlApiName === 'Contact_Roles' && field.api_name === 'Role' ){
						field.yieldName = "contact-role";
					}
					if(fieldMap[field.api_name] === "lookup" || field.isDisplayField){
						if(_self.getData('cxPropRl.type') === 'multiselectlookup' || field.isDisplayField){
							field.yieldName = "lookup";
						}else{
							var lkpMod = store.peekRecord('module',field.lookup.module.id);
							var lookupModName = lkpMod ? lkpMod.module_name : field.lookup.module.api_name;
							lookupProperties[field.api_name] ={
								"dynamicParams":'["' + lookupModName + '","{{row.' + field.api_name + '.id}}"]',/*for lookup record redirect while click the lookup value*///NO I18N
								"module":lookupModName,/*for lookup hover card*///NO I18N
							}
						}
					}
					if(field.isYield){
						field.yieldName = "custom-yield";
					}
					rlFields.push(field);
				})
				_self.setData({ fieldMapping : fieldMap , rlFields : rlFields , cxPropLookupProperties : lookupProperties});
			}
		}
		if(!this.getData('cxPropRl.transition')){
			this.setData('cxPropRl.transition',{route :'crm.tab.module.entity.detail' , module : this.getData('relatedModule')});
		}
	}.observes('cxPropRl.fields').on('init'),
	setRelatedListData : function(){
		if(this.getData('cxPropRl.fields') && this.getData('cxPropRl.fields').length && this.getData('cxPropRl.action') === 'picklist_tracker'){
				this.processRlFieldsForPickLisTracking();
		}
		if(this.data.cxPropRlData){
			if(this.data.cxPropRlData.length <= this.getData('cxPropRlInfo.per_page')-1){
				this.setData('tableData',[]);
				Lyte.arrayUtils(this.getData('tableData'),'push',this.getData('cxPropRlData'));
			}else{
				this.setData('startIndex',((this.getData('cxPropRlInfo.page') - 1) * (this.getData('cxPropRlInfo.per_page')-1)));
				this.setData('tableData',this.getData('cxPropRlData').slice(this.getData('startIndex'), this.getData('startIndex')+(this.getData('cxPropRlInfo.per_page')-1)));
			}
		}
	},
	processRlFieldsForPickLisTracking : function(){
		var data = this.getData('cxPropRlData');
		var refer_from_field = this.data.cxPropRl.fields.filter(function(x){if(x.refer_from_field){ 
			return x.refer_from_field.refer_from_field ;
		}
		return false;})
		if(moduleRecordMapping && moduleRecordMapping[this.getData('cxPropModule')] && data && data.length && refer_from_field && refer_from_field.length){			
			var modFields = store.peekRecord('module',moduleRecordMapping[this.getData('cxPropModule')].id);
			var picklistTracker = modFields && modFields.fields ? modFields.fields.filter(function(field){return field.history_tracking && field.data_type === "picklist"}) : [];
			picklistTracker = picklistTracker && picklistTracker.length ?  picklistTracker[0] : undefined;
			
			data.forEach(function(record){
				refer_from_field.forEach(function(field,index){
					if(field.refer_from_field && field.refer_from_field.refer_from_field && field.refer_from_field.refer_from_field.api_name === picklistTracker.api_name && 
						( record[field.api_name] === undefined || record[field.api_name] === null) && (index !== 0 || field.api_name !== 'Moved_To__s')){
							record[field.api_name] = 'No Value';
					}
				})
			})																	
		}
	},
	handleRlRefresh : function(){
		this.setRelatedListData();
	}.observes('cxPropRlData').on('init')
});
Lyte.Component.registerHelper('getNestedObjValue',function(recObj , apiName ,needIdOnly){//No I18N
	var keyValues = apiName.split('.');
	var recordValue = recObj;
	keyValues.forEach(function(item){
		if(recordValue){
			recordValue = recordValue[item];
		}
	});
	return needIdOnly && recordValue ? recordValue.id : recordValue;
});
Lyte.Component.registerHelper('getContactRole',function(id,values){ //no i18n
	if(id && values && values.length){
		var a = values.filter(function(item){ return item.id === id; });
		if(a.length){
			return a[0].display_value;
		}
	}
	return "";
});
