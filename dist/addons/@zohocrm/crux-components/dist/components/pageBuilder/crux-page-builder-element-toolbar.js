Lyte.Component.register("crux-page-builder-element-toolbar", {
_template:"<template tag-name=\"crux-page-builder-element-toolbar\" class=\"cxPbElementToolBar\"> <span id=\"toolbar_icon_{{cxPropField.id}}\" class=\"cxPbToolIconWrap\">...</span> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"#toolbar_icon_{{cxPropField.id}}\" on-before-open=\"{{method('getFieldPropertyActions')}}\" on-menu-click=\"{{method('onToolbarClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropFieldActions}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item.value}}\"> <lyte-menu-label>{{item.name}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropId","cxPropField","cxPropFieldActions"],
_observedAttributesType :["string","object","array"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string',{default : 'standard'}), //no i18n
			cxPropField : Lyte.attr('object'), //no i18n
			cxPropFieldActions : Lyte.attr('array',{default : [{name : "Mark as required",value : 'mark_as_required'},{name : "Set Permission",value : 'set_permission'},{name : "Edit Properties",value : 'edit_properties'}, {name : "Create Layout Rule",value : 'create_layout_rule'}, {name : "Create Validation Rule",value : 'create_validation_rule'} , {name : "Add to other layouts",value : 'add_to_other_layouts'}, {name : "Remove Field",value : 'remove_field'}]}) //no i18n
		};	
	},
	didConnect : function(){
		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
	},
	didDestroy : function(){
		delete this.cruxPageBuilder;
	},
	methods : {
		onToolbarClick : function(value){
			if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
				this.cruxPageBuilder.executeMethod('cxPbToolBarAction',this.data.cxPropField,value);
			}
		},
		getFieldPropertyActions : function(){
			let opt = this.data.cxPropFieldActions;
			if(this.cruxPageBuilder.getMethods('cxPbSetToolBarActions')){
				opt = this.cruxPageBuilder.executeMethod('cxPbSetToolBarActions',this.data.cxPropField,opt);
				this.setData("cxPropFieldActions", opt);
			}
		}
	},
	actions : {
		// onToolbarClick : function(value){
		// 	if(this.cruxPageBuilder.getMethods('cxPbToolBarAction')){
		// 		this.cruxPageBuilder.executeMethod('cxPbToolBarAction',this.data.cxPropField,value);
		// 	}
		// }
	}
});
