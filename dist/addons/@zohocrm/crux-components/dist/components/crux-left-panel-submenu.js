Lyte.Component.register("crux-left-panel-submenu", {
_template:"<template tag-name=\"crux-left-panel-submenu\"> <template is=\"if\" value=\"{{showSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{{searchScope}}\"></lyte-search> </template></template> <div>{{headerName}}</div><span class=\"editMenuName\" onclick=\"{{action('menuItemAdd','edit')}}\">%</span> <template is=\"if\" value=\"{{menuProperties.showAddIcon}}\"><template case=\"true\"><span class=\"addIcon\" onclick=\"{{action('menuItemAdd','add')}}\">+</span></template></template> <template is=\"if\" value=\"{{ifEquals(viewType,'accordion')}}\"><template case=\"true\"><lyte-accordion lt-prop-dynamic=\"true\" lt-prop-exclusive=\"false\" class=\"accordionparent\" id=\"accord_{{tabId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template items=\"{{subMenu}}\" item=\"submenuVal\" index=\"index\" is=\"for\"> <template object=\"{{submenuVal}}\" value=\"submenuObj\" key=\"title\" is=\"forIn\"> <lyte-accordion-item class=\"lyteAccordionActive\"> <lyte-accordion-header>{{title}}<lyte-icon class=\"lyteAccordionArrow\"></lyte-icon></lyte-accordion-header> <lyte-accordion-body> <template items=\"{{submenuObj}}\" item=\"menuVal\" index=\"index\" is=\"for\"> <link-to lt-prop-route=\"{{menuVal.submenu_route.route}}\" lt-prop-dp=\"[&quot;{{menuVal.submenu_route.dynamic_param}}&quot;]\" lt-prop-qp=\"{{menuVal.submenu_route.query_param}}\"> <div id=\"{{menuVal.submenu_id}}\" class=\"{{menuVal.submenu_icon_class}}\">{{menuVal.submenu_name}}</div> </link-to> <span id=\"moreOption_{{menuVal.submenu_id}}\">..</span> </template> </lyte-accordion-body> </lyte-accordion-item> </template> </template> </template> </lyte-accordion></template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(viewType,'list')}}\"><template case=\"true\"><div id=\"list_{{tabId}}\"> <template items=\"{{subMenu}}\" item=\"submenuVal\" index=\"index\" is=\"for\"> <link-to lt-prop-route=\"{{baseRoute}}\" lt-prop-dp=\"[&quot;{{submenuVal.module_name}}&quot;]\" class=\"listElem_{{tabId}}\"> <div class=\"icon-module-{{submenuVal.api_name}} searchText_{{tabId}}\">{{submenuVal.plural_label}}</div> </link-to> </template> </div></template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[3,0]},{"type":"attr","position":[4]},{"type":"attr","position":[6]},{"type":"if","position":[6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[8]},{"type":"if","position":[8],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1,2]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}]}]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["subMenu","headerName","showSearch","tabId","viewType","baseRoute","searchScope","menuProperties"],
_observedAttributesType :["array","string","boolean","string","string","string","object","object"],
   
	data : function(){
		return {
			subMenu : Lyte.attr('array'),//No I18N
			headerName : Lyte.attr("string"),//No I18N
			showSearch : Lyte.attr("boolean"),//No I18N
			tabId : Lyte.attr("string"),//No I18N
			viewType : Lyte.attr('string'),//No I18N
			baseRoute : Lyte.attr('string'),//NoI18N
			searchScope : Lyte.attr('object'),//No I18N
			menuProperties : Lyte.attr('object')//No I18N
		}		
	},
	init : function(){
		var view = this.getData('viewType'), searchScope = {};
		if(view === "accordion"){
			searchScope.scope = "#accord_"+this.getData('tabId');
			searchScope.search = "lyte-accordion-body > link-to";
			searchScope.target = "lyte-accordion-body > link-to";
			searchScope.related = "lyte-accordion-item";
		}else if(view === "list"){
			searchScope.scope = "#list_" + this.getData('tabId');
			searchScope.search = ".listElem_" + this.getData('tabId');
			searchScope.target = ".searchText_" + this.getData('tabId');
		}
		this.setData('searchScope',searchScope);
	},
	actions : {
		// Functions for event handling
		menuItemAdd : function(type){
			if(this.getMethods('addSubMenuItem')){
				this.executeMethod('addSubMenuItem',type,event);
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});
