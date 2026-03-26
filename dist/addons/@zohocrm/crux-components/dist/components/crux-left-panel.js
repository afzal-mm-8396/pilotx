Lyte.Component.register("crux-left-panel", {
_template:"<template tag-name=\"crux-left-panel\"> <lyte-tabs lt-prop=\"{&quot;position&quot; : {&quot;pos&quot; : &quot;left&quot;, &quot;align&quot; : &quot;top&quot;} }\" lt-prop-height=\"100vh\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head> <template is=\"for\" items=\"{{cxPropParentMenus.menus}}\" item=\"tab\" index=\"indexVal\"> <template is=\"if\" value=\"{{ifNotEquals(tab.viewType,'custom')}}\"><template case=\"true\"><lyte-tab-title lt-prop-id=\"tab_{{tab.menu_id}}\"> <span class=\"{{tab.iconClass}}\"></span> {{tab.menu_name}} </lyte-tab-title></template><template case=\"false\"><div onclick=\"{{action('customMenuClick',this,tab)}}\" id=\"custommenu_{{tab.menu_id}}\"> <span class=\"{{tab.iconClass}}\"></span> {{tab.menu_name}} </div></template></template> </template> </lyte-tab-head> <lyte-tab-body id=\"leftPanelTabBody\"> <div>Team Space</div><span class=\"HideTab\" onclick=\"{{action('hideTabBody')}}\">=&gt;</span> <template is=\"for\" items=\"{{cxPropParentMenus.menus}}\" item=\"tab\" index=\"indexVal\"> <template is=\"if\" value=\"{{ifNotEquals(tab.viewType,'custom')}}\"><template case=\"true\"><lyte-tab-content id=\"tab_{{tab.menu_id}}\"> <crux-left-panel-submenu add-sub-menu-item=\"{{method('addSubmenuItem',tab)}}\" menu-properties=\"{{tab}}\" base-route=\"{{tab.route}}\" header-name=\"{{tab.menu_name}}\" tab-id=\"{{tab.menu_id}}\" sub-menu=\"{{tab.sub_menu}}\" show-search=\"{{tab.search}}\" view-type=\"{{tab.viewType}}\"></crux-left-panel-submenu> </lyte-tab-content></template></template> </template> </lyte-tab-body> </template> </lyte-tabs> </template>",
_dynamicNodes : [{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"text","position":[0,3]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"text","position":[0,3]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,2]},{"type":"attr","position":[3,4]},{"type":"for","position":[3,4],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropParentMenus","cxPropFooterIcons"],
_observedAttributesType :["object","array"],

	data : function(){
		return {
			cxPropParentMenus : Lyte.attr("object"),//No I18N
			cxPropFooterIcons : Lyte.attr('array')//No I18N
		}		
	},
	init : function(){
		//this.setData('parentMenus',this.$lg.menuObject);//No I18N 
	},
	actions : {
		// Functions for event handling
		hideTabBody : function(){
			var tabBody = this.$node.querySelector('#leftPanelTabBody').classList;
			if(tabBody && tabBody.contains('tabClosed')){
				tabBody.remove('tabClosed')
			}else{
				tabBody.add('tabClosed');
			}
		},
		customMenuClick : function(ele,menu){
			menu.menuOnClick(ele,event);
		}
		
	},
	methods : {
		addSubmenuItem : function(tab,type,eve){
			tab.addCallback(type,eve);
		}
	}
});
