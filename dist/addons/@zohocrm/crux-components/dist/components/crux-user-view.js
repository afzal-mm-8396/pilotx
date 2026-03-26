Lyte.Component.register("crux-user-view", {
_template:"<template tag-name=\"crux-user-view\"> <crux-user-lookup cx-prop-wrapper-class=\"cxUserViewModal {{cxPropWrapperClass}}\" cx-prop-view-width=\"{{cxPropViewWidth}}\" cx-prop-selected-link-message=\"{{cxPropSelectedLinkMessage}}\" cx-prop-max-width=\"{{cxPropMaxWidth}}\" cx-prop-max-height=\"{{cxPropMaxHeight}}\" cx-prop-custom-request=\"{{cxPropCustomRequest}}\" cx-prop-allow-multiple=\"{{cxPropAllowMultiple}}\" cx-prop-query-params=\"{{cxPropQueryParams}}\" cx-prop-header-yield=\"{{cxPropHeaderYield}}\" cx-prop-footer-yield=\"{{cxPropFooterYield}}\" cx-prop-header=\"{{cxPropHeader}}\" cx-prop-network-data=\"{{cxPropNetworkData}}\" cx-prop-forced-fetch=\"{{cxPropForcedFetch}}\" cx-prop-criteria=\"{{cxPropCriteria}}\" cx-prop-search-criteria=\"{{cxPropSearchCriteria}}\" cx-prop-header-name=\"{{cxPropHeaderName}}\" cx-prop-type=\"view\" cx-prop-per-page=\"{{cxPropPerPage}}\" cx-prop-exclude=\"{{cxPropExclude}}\" cx-prop-module-name=\"{{cxPropModuleName}}\" cx-prop-filter-yield=\"{{cxPropFilterYield}}\" cx-prop-filter-options=\"{{cxPropFilterOptions}}\" cx-prop-selected-filter-option=\"{{cxPropSelectedFilterOption}}\" cx-prop-filter-user-value=\"{{cxPropFilterUserValue}}\" cx-prop-filter-system-value=\"{{cxPropFilterSystemValue}}\" cx-prop-searchable=\"{{cxPropSearchable}}\" cx-prop-filterable=\"{{cxPropFilterable}}\" cx-prop-records=\"{{cxPropRecords}}\" cx-prop-min-lenghth=\"{{cxPropMinLength}}\" on-body-before-show=\"{{method('beforeView')}}\" set-search-criteria=\"{{method('searchCriterias')}}\" on-body-show=\"{{method('view')}}\" get-criteria=\"{{method('criteria')}}\" on-before-lookup-close=\"{{method('beforeExit')}}\" on-lookup-close=\"{{method('exit')}}\" on-after-search-response=\"{{method('afterSearchResponse')}}\" on-filter-option-selected=\"{{method('changeFilter')}}\" on-custom-request=\"{{method('makeCustomReq')}}\" cx-prop-no-user-avilable-msg=\"{{cxPropNoUserAvilableMsg}}\" cx-prop-transition=\"{{cxPropTransition}}\" cx-prop-offset=\"{{cxPropOffset}}\" cx-prop-show-close-icon=\"{{cxPropShowCloseIcon}}\" cx-prop-show=\"{{lbind(cxPropShow)}}\"> <template is=\"if\" value=\"{{cxPropFilterYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"userDropdownInner\"> <lyte-yield yield-name=\"userDropdownInner\"></lyte-yield> </template> </template></template> <template is=\"if\" value=\"{{cxPropHeaderYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"userHeaderYield\"> <lyte-yield yield-name=\"userHeaderYield\"></lyte-yield> </template> </template></template> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"userFooterYield\"> <lyte-yield yield-name=\"userFooterYield\"></lyte-yield> </template> </template></template> <template is=\"registerYield\" yield-name=\"headerDetail\"> <template is=\"if\" value=\"{{currentHeader.yield}}\"><template case=\"true\"> <lyte-yield yield-name=\"{{currentHeader.systemValue}}\" cell-index=\"{{cellIndex}}\" cell-value=\"{{cellValue}}\"> </lyte-yield> </template></template> </template> </crux-user-lookup> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"registerYield","position":[1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropAllowMultiple","cxPropCustomRequest","cxPropViewWidth","cxPropQueryParams","cxPropForcedFetch","cxPropShow","cxPropCriteria","cxPropSearchCriteria","cxPropTableHeaders","cxPropDisplayTableHeader","cxPropHeader","cxPropPerPage","cxPropExclude","cxPropModuleName","cxPropNetworkData","cxPropHeaderName","cxPropHeaderYield","cxPropFooterYield","cxPropFilterYield","cxPropFilterOptions","cxPropSelectedFilterOption","cxPropFilterUserValue","cxPropFilterSystemValue","cxPropSearchable","cxPropFilterable","cxPropRecords","cxPropMinLength","cxPropWrapperClass","cxPropNetworkData","cxPropNoUserAvilableMsg","cxPropTransition","cxPropOffset","cxPropShowCloseIcon","cxPropSelectedLinkMessage","cxPropModalWidth","cxPropMaxWidth","cxPropMaxHeight","cxPropHeight"],
_observedAttributesType :["boolean","boolean","string","object","boolean","boolean","string","string","array","array","array","number","array","string","object","string","boolean","boolean","boolean","array","string","string","string","boolean","boolean","number","number","string","object","string","object","object","boolean","string","string","string","string","string"],
 //NO I18n
	/*showToggle : function(){
	  if(this.getData('cxPropShow')){
       this.$node.querySelector("crux-user-lookup").cxProp('show',true); //NO I18n
	  }
	}.observes('cxPropShow'), //NO I18n*/
	data : function(){
		return {
			cxPropAllowMultiple : Lyte.attr('boolean', { "default" : false}), //NO I18n
	    cxPropCustomRequest : Lyte.attr('boolean', { "default" : false}), //NO I18n
			
			cxPropViewWidth : Lyte.attr("string", { "default" : "40%"}), //NO I18n
			cxPropQueryParams : Lyte.attr('object', { "default" : {}}), //NO I18n
			cxPropForcedFetch : Lyte.attr('boolean', { "default" : false}), //NO I18n
			cxPropShow : Lyte.attr("boolean",{"default": false}), //NO I18n
			cxPropCriteria : Lyte.attr("string",{"default": ""}), //NO I18n
			cxPropSearchCriteria : Lyte.attr("string",{"default": ""}), //NO I18n
			//Modal Data
			//To The Developer
			cxPropTableHeaders : Lyte.attr('array', {"default" : ["full_name","role"]}), //NO I18n
			cxPropDisplayTableHeader : Lyte.attr('array', {"default" : ["User Name","Role"]}), //NO I18n
      cxPropHeader : Lyte.attr('array',{"default" : [{"systemValue":"full_name" , "displayValue":_cruxUtils.getI18n('crm.zti.label.user') , "yield":false} , {"systemValue":"role" , "displayValue":_cruxUtils.getI18n('cob.role') , "yield":false}]}), //NO I18n
			// System Data
			//To The Developer
			cxPropPerPage : Lyte.attr("number", {"default": 200}), //NO I18n
			cxPropExclude : Lyte.attr("array", {"default": []}), //NO I18n
			// cxPropSearchCount : Lyte.attr("number", {"default":500}), //NO I18n
			cxPropModuleName : Lyte.attr("string", {"default":"user"}), //NO I18n
			cxPropNetworkData : Lyte.attr("object", {"default":{"cxPropModuleName": "user", "cxPropCacheQuery":true , "cxPropDataCache":false}}), //NO I18n
      cxPropHeaderName : Lyte.attr("string", {"default": "Users In - General Shift"}), //NO I18n
			cxPropHeaderYield : Lyte.attr("boolean", {"default" : false}), //NO I18n
			cxPropFooterYield : Lyte.attr("boolean", {"default" : false}), //NO I18n
			//User Dropdown
			//To The Developer
			cxPropFilterYield : Lyte.attr('boolean', {"default" : false}), //NO I18n
			cxPropFilterOptions : Lyte.attr('array', { "default" : []}), //NO I18n
			cxPropSelectedFilterOption : Lyte.attr('string'), //NO I18n
			cxPropFilterUserValue : Lyte.attr('string', {"default" : ''}), //NO I18n
			cxPropFilterSystemValue : Lyte.attr('string', { "default" : ''}), //NO I18n
			cxPropSearchable : Lyte.attr('boolean', {"default" :  true}), //NO I18n
			cxPropFilterable : Lyte.attr('boolean', { "default" : true}), //NO I18n
			// component data {developer can not give crmPropRecords <=10 as the scroll will become inactive}
			cxPropRecords : Lyte.attr('number', { "default" : 20}), //NO I18n
			cxPropMinLength : Lyte.attr('number', { "default" : 2}), //NO I18n
			cxPropWrapperClass : Lyte.attr('string', {"default" : ''}), //NO I18n
			cxPropNetworkData : Lyte.attr('object', {"default" : {"cxPropModuleName": "user", "cxPropCacheQuery":true , "cxPropDataCache":false}}), //NO I18n
			cxPropNoUserAvilableMsg : Lyte.attr("string", { "default" :_cruxUtils.getI18n('crm.security.group.users.empty') }), //NO I18n
			cxPropTransition : Lyte.attr('object' , {"default" : {"animation":"slideFromTop","duration":"0.4"}}), //NO I18n
			cxPropOffset : Lyte.attr('object' , {"default" : {"top":"0px","left":"center"}}), //NO I18n
			cxPropShowCloseIcon:Lyte.attr('boolean',{"default":true}),
			cxPropSelectedLinkMessage : Lyte.attr("string"), //NO I18n
			cxPropModalWidth : Lyte.attr("string"), //NO I18n
    		cxPropMaxWidth : Lyte.attr("string", { "default" : ""}), //NO I18n
   			cxPropMaxHeight : Lyte.attr("string", { "default" : ""}), //NO I18n
	 		cxPropHeight : Lyte.attr("string", { "default" : "auto"}) //NO I18N
		}
	},
	methods : {
		makeCustomReq : function(networkData, params, isSearch, cxPropInputValue, cxPropSelectedList){
		    if(this.getMethods('onCustomUserViewRequest')){ //NO I18n
		      return this.executeMethod('onCustomUserViewRequest' , networkData, params, isSearch, cxPropInputValue, cxPropSelectedList); //NO I18n
		    }
		},
		searchCriterias : function(word,firstNameAvailability){
			if(this.getMethods('setSearchCriteria')){ //NO I18n
				return this.executeMethod('setSearchCriteria',word); //NO I18n
			}else{
				var ret={};
				if(this.getData("cxPropNetworkData").cxPropModuleName=="user"){
          var criterias;
          if(firstNameAvailability){
            criterias='((first_name:starts_with:'+word+')or(last_name:starts_with:'+word+')or(email:starts_with:'+word+')or(full_name:starts_with:'+word+'))'; //NO I18n
          }
          else{
            criterias='((last_name:starts_with:'+word+')or(email:starts_with:'+word+')or(full_name:starts_with:'+word+'))'; //NO I18n
          }
          if(this.getData('cxPropSearchCriteria')!=undefined && this.getData('cxPropSearchCriteria')!=""){
          var criterias='('+criterias+'and'+this.getData('cxPropSearchCriteria')+')';
         }
         ret={criteria : criterias}//NO I18n
        }
				return ret;
			}
		},
		criteria : function(){
			if(this.getMethods('formCriteria')){ //NO I18n
				return this.executeMethod('formCriteria'); //NO I18n
			}
		},
		beforeView : function(){
			if(this.getMethods('onBeforeView')){ //NO I18n
				return this.executeMethod('onBeforeView'); //NO I18n
			}
		},
		view : function(){
			if(this.getMethods('onView')){ //NO I18n
 			 this.executeMethod('onView'); //NO I18n
 		 }
		 // this.$node.querySelector('lyte-modal').component.childComp.querySelector(".lookupHeaderStyle").style.height=9/100*this.$node.querySelector('lyte-modal').component.childComp.querySelector(".lyteModal").getBoundingClientRect().height+"px";  //NO I18n
	   // var height=(9/100*this.$node.querySelector('lyte-modal').component.childComp.querySelector(".lyteModal").getBoundingClientRect().height)+(1.5/100*this.$node.querySelector('lyte-modal').component.childComp.querySelector(".lyteModal").getBoundingClientRect().height)+"px"; //NO I18n
	   // this.$node.querySelector('lyte-modal').component.childComp.querySelector("lyte-modal-header").style.paddingTop=height; //NO I18n
		},
		beforeExit : function(){
			if(this.getMethods('onBeforeExit')){ //NO I18n
 			 return this.executeMethod('onBeforeExit'); //NO I18n
 		 }
		},
		exit : function(){
			if(this.getMethods('onExit')){ //NO I18n
 			 this.executeMethod('onExit'); //NO I18n
 		 }
		 this.$node.cxProp('show',false); //NO I18n
	  },
	  afterSearchResponse : function(res){
		 	if(this.getMethods('onAfterSearchResponse')){ //NO I18n
 				return this.executeMethod('onAfterSearchResponse', res); //NO I18n
 			}
			return res;
		},
		changeFilter : function(event, filterName, filterDropdownComp){
			if(this.getMethods('onFilterSelection')){ //NO I18n
 			 return this.executeMethod('onFilterSelection',event, filterName, filterDropdownComp); //NO I18n
 		 }
		}

	}
});
