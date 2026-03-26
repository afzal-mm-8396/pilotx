Lyte.Component.register("crux-detailpage-header", {
_template:"<template tag-name=\"crux-detailpage-header\"> <div class=\"cxDvHeaderParent cxFlex cxAlignItemCenter\"> <div class=\"cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropShowBackButton}}\"><template case=\"true\"><span data-zcqa=\"backOneLevel\" class=\"zcicn-cssIcons zcicncss-arrow-back cxCP\" id=\"backbutton\" onclick=\"{{action('backButtonClickAction')}}\"></span></template></template> <div id=\"recordDetails\" class=\"cxFlex\"> <template is=\"if\" value=\"{{cxPropShowRecImage}}\"><template case=\"true\"><span data-zcqa=\"detailViewLyteimgContainer\" class=\"cxDvRecordUserImage\"> <template is=\"if\" value=\"{{headerField1[0]}}\"><template case=\"true\"> {{headerField1[0]}} </template><template case=\"false\"><template is=\"if\" value=\"{{headerField2[0]}}\"><template case=\"true\"> {{headerField2[0]}} </template></template></template></template> </span></template></template> <div class=\"cxDvRecordRight\"> <div class=\"cxDvRecordName cxFlex cxAlignItemCenter\"> <span id=\"recHeader1\" class=\"cxDvRecordHeader1\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(headerField1,'===','Unknown'),'||',cxPropBusinessCardDetails[0].showDefaultValue)}}\"><template case=\"true\"> {{headerField1}} </template><template case=\"false\"><crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{cxPropBusinessCardDetails[0]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" field-id-val=\"title_fieldElem\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;column_name&quot;,&quot;value_input_zcqa&quot;:&quot;column_name&quot;}\"></crux-detailpage-field-details></template></template> </span> <template is=\"if\" value=\"{{expHandlers(headerField1,'&amp;&amp;',headerField2)}}\"><template case=\"true\"><span id=\"headerHypen\" class=\"cxDvRecordHeaderhypen\">-</span></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropNoOfFieldsInHeader,'===',2)}}\"><template case=\"true\"><span id=\"recHeader2\" class=\"cxDvRecordHeader2\"> <crux-detailpage-field-details component-unique-id=\"{{componentUniqueId}}\" cx-prop-detail-page-route=\"{{cxPropDetailPageRoute}}\" cx-prop-field=\"{{cxPropBusinessCardDetails[1]}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-record=\"{{cxPropRecord}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-field-zcqa-prefix=\"{&quot;value_zcqa&quot;:&quot;value_&quot;,&quot;value_input_zcqa&quot;:&quot;&quot;}\" field-id-val=\"title_fieldElem\" cx-prop-field-zcqa-value=\"{&quot;value_zcqa&quot;:&quot;column_name&quot;,&quot;value_input_zcqa&quot;:&quot;column_name&quot;}\"></crux-detailpage-field-details> </span></template></template> </div> <div class=\"cxDvRecordEmail\">{{cxPropRecord['Email']}}</div> <template is=\"if\" value=\"{{cxPropIsTagFieldSupported}}\"><template case=\"true\"><div class=\"cx_detail_record_tags\" id=\"cx_detail_record_tags\"> <crux-detailpage-tags data-zcqa=\"detailViewLyteTag\" component-unique-id=\"{{componentUniqueId}}\" class=\"cxDvTagIconPosition\" cx-prop-existing-tags=\"{{cxPropExistingTags}}\" cx-prop-record-tags=\"{{cxPropRecordTags}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-support-ajax-edit=\"{{cxPropSupportAjaxEdit}}\" on-tag-save=\"{{method('onTagSave')}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"></crux-detailpage-tags> </div></template></template> </div> </div> </div> <div class=\"cxAlignItemCenter cxFlex recBtnSection\"> <template is=\"if\" value=\"{{cxPropShowEditButton}}\"><template case=\"true\"><lyte-button data-zcqa=\"edit\" onclick=\"{{action('editRecord',this)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n(\"Edit\")}}</template> </lyte-button></template></template> <template is=\"if\" value=\"{{cxPropShowMoreButton}}\"><template case=\"true\"><lyte-button data-zcqa=\"CustomizeTools\" class=\"cxDvApprovalMoreOptionsBtn\" id=\"record_options\"> <template is=\"registerYield\" yield-name=\"text\"> <span class=\"cxDetailHeader cruxSprite cxMoreIconHor\"></span> </template> </lyte-button></template></template> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"lyte-button#record_options\" on-menu-click=\"{{method('menuOptionSelected')}}\" on-before-close=\"{{method('checkForSubmenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template items=\"{{cxPropRecordOptions}}\" item=\"value\" index=\"index\" is=\"for\"> <template object=\"{{value}}\" value=\"group\" key=\"key\" is=\"forIn\"> <lyte-menu-group> <template items=\"{{group}}\" item=\"item\" index=\"index\" is=\"for\"> <lyte-menu-item id=\"parentMenu_{{item.clickId}}\" data-value=\"{{item}}\" data-zcqa=\"{{item.zcqa}}\" lt-prop-disabled=\"{{item.disabled}}\"> <lyte-menu-label>{{item.display_label}}</lyte-menu-label> <lyte-menu-description>{{item.description}} </lyte-menu-description> </lyte-menu-item> </template> </lyte-menu-group> </template> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"submenu\" lt-prop-position=\"right\" lt-prop-show=\"{{showSubmenu}}\" lt-prop-yield=\"true\" lt-prop-event=\"click/mouseenter\" lt-prop-query=\"lyte-menu-item#parentMenu_{{currentSubmenuId}}\" on-menu-click=\"{{method('menuOptionSelected')}}\" on-before-close=\"{{method('checkForSubmenu')}}\" on-close=\"{{method('closeSubmenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template items=\"{{submenuOptions}}\" item=\"submenu\" index=\"index\" is=\"for\"> <lyte-menu-item lt-prop-disabled=\"{{item.disabled}}\" id=\"subMenu_{{submenu.clickId}}\" data-value=\"{{submenu}}\"> <lyte-menu-label>{{submenu.display_label}}</lyte-menu-label> <lyte-menu-description>{{submenu.description}} </lyte-menu-description> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <template is=\"if\" value=\"{{expHandlers(cxPropPreviousRecord,'||',cxPropNextRecord)}}\"><template case=\"true\"><lyte-navigator on-next=\"{{method('navigateToNextRecord')}}\" on-previous=\"{{method('navigateToPreviousRecord')}}\" lt-prop-show-only-icon=\"true\" style=\"margin-left: 20px;\"></lyte-navigator></template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,1,1]},{"type":"if","position":[1,1,3,3,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,3]},{"type":"if","position":[1,1,3,3,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,3,1,5]},{"type":"if","position":[1,1,3,3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"text","position":[1,1,3,3,3,0]},{"type":"attr","position":[1,1,3,3,5]},{"type":"if","position":[1,1,3,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"registerYield","position":[1,3,5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,5]},{"type":"attr","position":[1,3,7]},{"type":"registerYield","position":[1,3,7,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,7]},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["cxPropBusinessCardDetails","cxPropRecord","headerField1","headerField2","cxPropRecordOptions","currentSubmenuId","submenuOptions","showSubmenu","cxPropNextRecord","cxPropPreviousRecord","cxPropDetailPageRoute","cxPropExistingTags","cxPropModule","cxPropRecordTags","cxPropMaxTagLimit","cxPropShowMoreButton","cxPropShowEditButton","cxPropNoOfFieldsInHeader","cxPropSupportAjaxEdit","cxPropShowRecImage","cxPropLayoutId","cxPropIsTagFieldSupported","cxPropModuleName","componentUniqueId"],
_observedAttributesType :["array","object","string","string","array","string","array","boolean","string","string","string","array","string","array","number","boolean","boolean","number","boolean","boolean","string","boolean","string","string"],

	data : function(){
		return {
			cxPropBusinessCardDetails : Lyte.attr('array'),
			cxPropRecord : Lyte.attr('object'),
			headerField1 : Lyte.attr('string'),
			headerField2 : Lyte.attr('string'),
			cxPropRecordOptions : Lyte.attr('array'),
			currentSubmenuId : Lyte.attr('string'),
			submenuOptions : Lyte.attr('array'),
			showSubmenu : Lyte.attr('boolean',{default : false}),
			cxPropNextRecord : Lyte.attr('string'),
			cxPropPreviousRecord : Lyte.attr('string'),
			cxPropDetailPageRoute : Lyte.attr('string'),
			cxPropExistingTags : Lyte.attr('array'),
			cxPropModule : Lyte.attr("string"),
			cxPropRecordTags : Lyte.attr('array'),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropShowMoreButton : Lyte.attr('boolean'),
			cxPropShowEditButton : Lyte.attr('boolean'),
			cxPropNoOfFieldsInHeader : Lyte.attr('number'),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropShowRecImage : Lyte.attr('boolean',{default : true}),
			cxPropLayoutId : Lyte.attr("string"),
			cxPropIsTagFieldSupported : Lyte.attr('boolean',{default : true}),
			cxPropModuleName 	 : Lyte.attr('string'),
			componentUniqueId	: Lyte.attr('string')
		}	;	
	},
	init : function(){
		this.setHeaderFields();
	},
	recordObserver:function(){
		this.setHeaderFields();
	}.observes('cxPropBusinessCardDetails','cxPropRecord'),
	setHeaderFields : function(){
		var card1,card2;
		var field1,field2;
		field1 = this.data.cxPropBusinessCardDetails[0]; 

		if(field1.showDefaultValue){
			this.setData({headerField1 : field1.titleCardDefaultValue});
			return;
		}
		
		card1 =(field1.data_type === 'lookup' || field1.data_type === 'ownerlookup') ? this.data.cxPropRecord[field1.api_name] ? this.data.cxPropRecord[field1.api_name].name : "" : this.data.cxPropRecord[field1.api_name];
		card1 = field1.includeSalutation && this.data.cxPropRecord['Salutation'] ? this.data.cxPropRecord['Salutation'] + ' ' + card1 : card1;
		if(this.getData('cxPropNoOfFieldsInHeader') === 2){
			field2 = this.data.cxPropBusinessCardDetails[1];
			card2 =(field2.data_type === 'lookup' || field2.data_type === 'ownerlookup') ? this.data.cxPropRecord[field2.api_name] ? this.data.cxPropRecord[field2.api_name].name : "" : this.data.cxPropRecord[field2.api_name];
			card2 = field2.includeSalutation && this.data.cxPropRecord['Salutation'] ? this.data.cxPropRecord['Salutation'] + ' ' + card2 : card2;
		}
		if(field1 && field1.field_component_type === "activity_mml" && this.cruxGetActivityMMLObj){
			this.setData({activity_mml_obj : this.cruxGetActivityMMLObj( this.getData('cxPropModule') , this.getData('cxPropRecord') , field1 ) });
		}
		if(!card1 && !card2 && !this.data.activity_mml_obj){
			card1 = 'Unknown';
		}
		this.setData({headerField1 : card1, headerField2 : card2});
	},
	actions : {
		backButtonClickAction : function(){
			if(this.getMethods('backBtnMethod')){
				this.executeMethod('backBtnMethod');
			}
		},
		editRecord : function(elem){
			if(this.getMethods('recordHeaderEditCallback')){
				this.executeMethod('recordHeaderEditCallback',elem,event);
			}
		}
	},
	methods : {
		menuOptionSelected : function(value,event,element, menuoriginElem , clickedItemDetail){
			var menuItem = JSON.parse(value);
			if(menuItem.submenu){
				this.setData({currentSubmenuId : menuItem.clickId , submenuOptions : menuItem.submenu ,showSubmenu : true});
			}else{
				this.setData({currentSubmenuId : '' , submenuOptions : [] ,showSubmenu : false});
				if(this.getMethods("excuteRecordActions")){
					this.executeMethod("excuteRecordActions",menuItem,event,element, menuoriginElem , clickedItemDetail);
				}
			}
		},
		checkForSubmenu : function(ele , event){
			if(this.getData('currentSubmenuId') && !(event.target && event.target.className && event.target.className.includes('lytemenufreezelayer'))){
				return false;
			}
			return true;
		},
		closeSubmenu : function(){
			this.setData({currentSubmenuId : '' , submenuOptions : [] ,showSubmenu : false});
		},
		navigateToNextRecord : function(){
			Lyte.Router.transitionTo(this.getData('cxPropDetailPageRoute'),this.getData('cxPropModule'),this.getData('cxPropNextRecord'));
		},
		navigateToPreviousRecord : function(){
			Lyte.Router.transitionTo(this.getData('cxPropDetailPageRoute'),this.getData('cxPropModule'),this.getData('cxPropPreviousRecord'));
		}
	}
},{mixins : ["crm-crux-detailpage-mixin"]});
