Lyte.Component.register("crux-permission-list", {
_template:"<template tag-name=\"crux-permission-list\"> <lyte-table class=\"cxPermissionTable\"> <lyte-table-structure class=\"cxPermTableStruct\"> <lyte-thead> <lyte-tr> <lyte-th class=\"cxPermTableTitleTd\">Title</lyte-th> <lyte-th> <lyte-button id=\"allPermission\" class=\"cxPermTableActionBtnWrap\" lt-prop-class=\"cxPermTableActionBtn\"> <template is=\"registerYield\" yield-name=\"text\"> <div class=\"cxAlignItemCenter cxFlex\"> <span class=\"cxPermTableActionText\">{{cxPropDefaultPermission}}</span> <span class=\"cxPermTableDownArrowIcon\"></span> </div> </template> </lyte-button> </lyte-th> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"for\" items=\"{{cxPropProfiles}}\" item=\"item\" index=\"index\"> <lyte-tr> <lyte-td>{{item.name}}</lyte-td> <lyte-td> <lyte-dropdown class=\"cxPermTableActionBtnWrap\" lt-prop-selected=\"{{cxGetCurrentProfilePermissionType(item.id)}}\" before-select=\"{{method('onPermissionBeforeSelect',item)}}\" lt-prop-freeze=\"false\" on-option-selected=\"{{method(&quot;onPermissionSelect&quot;,item)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cxPermTableActionBtn cxAlignItemCenter cxFlex\"> <span class=\"cxPermReadWriteIcon\"></span> <span class=\"cxPermTableActionText\">{{cxGetDisplayValue(item.permission_type)}}</span> <span class=\"cxPermTableDownArrowIcon\"></span> </lyte-drop-button> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropAllPermissionsList}}\" item=\"list\" index=\"index\"> <lyte-drop-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{list.system_value}}\"> <span class=\"{{list.iconClass}}\"></span> {{list.display_value}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </lyte-td> </lyte-tr> </template>  </lyte-tbody></lyte-table-structure> </lyte-table> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"lyte-button#allPermission\" lt-prop-freeze=\"false\" on-menu-click=\"{{method('onAllPermissionClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"fieldallPermissions\"> <lyte-menu-header>Set all permission to</lyte-menu-header> <template is=\"for\" items=\"{{cxPropAllPermissionsList}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{item.system_value}}\"> <span class=\"{{item.iconClass}}\"></span> {{item.display_value}} </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1,1,1,1]},{"type":"registerYield","position":[1,1,1,1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]}]},{"type":"componentDynamic","position":[1,1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,1,3]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropDefaultPermission","cxPropAllPermissionsList","allPermission","cxPropProfiles","cxPropFieldProfiles"],
_observedAttributesType :["string","array","string","array","array"],

	data : function(){
		return {
			cxPropDefaultPermission : Lyte.attr('string', {default : 'All Permissions'}),
			cxPropAllPermissionsList : Lyte.attr('array', {default : [{"display_value" : "Read & Write", "system_value" : "read_write","iconClass":"cxPermReadWriteIcon"}, {"display_value" : "Read Only", "system_value" : "read_only","iconClass":"cxPermReadOnlyIcon"}, {"display_value" : "Don't Show", "system_value" : "hidden","iconClass":"cxPermHideIcon"}]}),
			allPermission : Lyte.attr('string', {default : 'Read & write'}),
			cxPropProfiles : Lyte.attr('array', {default : []}),
			cxPropFieldProfiles : Lyte.attr('array',{default : []})
		};
	},
	init : function(){
		let fieldProfles = this.data.cxPropFieldProfiles || [];
		let profiles_list = this.data.cxPropProfiles;
		let permissionList = this.data.cxPropAllPermissionsList;
		function filterPermission(permissionList,field_prof_item){
			return permissionList.filter(obj => obj.system_value ===field_prof_item.permission_type)[0];
		}
		var fieldProfileLength = fieldProfles.length;
		for (let i = 0; i < fieldProfileLength; i++) {
			let field_prof_item = fieldProfles[i];
			var profileListLength = profiles_list.length;
			for (let j = 0; j < profileListLength; j++) {
				let profile_item = profiles_list[j];
				if (field_prof_item.id === profile_item.id) {
					let type = filterPermission(permissionList,field_prof_item);
					profile_item.permission_type  = type.system_value;
				}
			}
		}
		

	},
	methods : {
		// Functions which can be used as callback in the component.
		onAllPermissionClick : function(selected){
			if(this.getMethods("onBeforeProfilePermissionSelect")){
				this.executeMethod("onBeforeProfilePermissionSelect", selected);
			}
			let profiles_list = this.data.cxPropProfiles;
			var profileListLength = profiles_list.length;
			for (let j = 0; j < profileListLength; j++) {
				let profile_item = profiles_list[j];
				Lyte.objectUtils( profile_item , "add" , "permission_type" ,selected );	
			}			
			if(this.getMethods("onProfilePermissionChanged")){
				this.executeMethod("onProfilePermissionChanged", profiles_list);
			}					
		},
		onPermissionBeforeSelect : function(item, event, previous_selected, component, lyte_drop_item, selected){
			if(this.getMethods("onBeforeProfilePermissionSelect")){
				return this.executeMethod("onBeforeProfilePermissionSelect", item, previous_selected, component, lyte_drop_item, selected);
			}
		},
		onPermissionSelect : function(item, event, selected_val){	
			let currentProfile = this.data.cxPropProfiles.filter(obj => obj.id ===item.id)[0];
			this.setData({'allPermission_selected': false});
			// let permission_type = this.data.cxPropAllPermissionsList.filter(obj => obj.system_value ===selected_val)[0].system_value;
			Lyte.objectUtils( currentProfile , "add" , "permission_type" ,selected_val );
			if(this.getMethods("onProfilePermissionChanged")){
				this.executeMethod("onProfilePermissionChanged", this.data.cxPropProfiles);
			}
		}
	}
});

Lyte.Component.registerHelper("cxGetCurrentProfilePermissionType", function (profileId) { //no i18n
	let prof = this.component.data.cxPropFieldProfiles;
	return prof ? prof.filter(obj => obj.id ===profileId)[0].permission_type: "read_write";
});

Lyte.Component.registerHelper("cxGetDisplayValue", function (permission_type) { //no i18n
	let prof = this.component.data.cxPropAllPermissionsList;
	return prof.filter(obj => obj.system_value ===permission_type)[0].display_value;
});
