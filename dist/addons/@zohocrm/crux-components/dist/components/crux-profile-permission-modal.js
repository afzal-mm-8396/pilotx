/**
 * @component crux-profile-permission-modal
 * @author silambarasan.rt
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-profile-permission-modal", {
_template:"<template tag-name=\"crux-profile-permission-modal\"> <div> <lyte-modal id=\"cxProfilePopup\" lt-prop-max-width=\"560px\" lt-prop-wrapper-class=\"cxBoxModal cxPermModalWrapper\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-show-close-button=\"false\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-close-on-body-click=\"false\" on-show=\"{{method(&quot;showPermissionModal&quot;)}}\" on-close=\"{{method(&quot;onCloseModal&quot;)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div> <template is=\"if\" value=\"{{cxPropHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"profileModalHeader\"></lyte-yield> </template><template case=\"false\"> <span>{{cxPropHeader}} </span> - <span class=\"cxPermModalHeadSubText\">{{cxPropModule}}</span> </template></template> </div> </lyte-modal-header> <lyte-modal-content> <div class=\"cxPermModalDescriptionText\">{{cxPropDescription}}</div> <div class=\"mT10 mB10\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"loadingGifDiv cxAlignCenter\"> <img class=\"loadingGif\" src=\"/crm/CRMClient/images/crux-search-loader.svg\"> </div> </template><template case=\"false\"> <lyte-dropdown id=\"cxProfileDropDown\" lt-prop-id=\"cxProfileWrapper\" style=\"width:100%;\" class=\"cxBoxDropdown\" lt-prop-type=\"multisearch\" on-add=\"{{method('addProfile')}}\" on-before-remove=\"{{method('beforeRemoveProfile')}}\" on-remove=\"{{method('removeProfile')}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-selected=\"{{lbind(selectedProfileIds)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box id=\"permissiondropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{cxPropProfiles}}\" item=\"profile\" index=\"index\"> <lyte-drop-item data-value=\"{{profile.id}}\">{{profile.display_label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"if\" value=\"{{showErrorMsg}}\"><template case=\"true\"> <div class=\"plErrMsg mT10\">{{showErrorMsg}}</div> </template></template> </div> <template is=\"if\" value=\"{{cxPropNotes}}\"><template case=\"true\"> <div class=\"cxPermModalNoteText\">{{cxPropNotes}}</div> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button id=\"cancelProfileBtn\" onclick=\"{{action('closeprofileModal',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.cancel\")}} </template> </lyte-button> <lyte-button id=\"saveProfileBtn\" lt-prop-appearance=\"primary\" onclick=\"{{action('saveProfiles',this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.save\")}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["cxPropProfiles","cxPropPreventProfileIds","cxPropSelectedProfiles","cxPropSelectedIds","cxPropDescription","cxPropHeader","cxPropHeaderClass","cxPropHeaderYield","cxPropModule","cxPropPlaceholder","cxPropShow","cxPropNotes","cxPropSuccessMessage","cxPropFailureMessage","showLoading","selectedProfileIds","cxPropRecord","cxPropUpdateKey","cxPropModal","showErrorMsg"],
_observedAttributesType :["array","array","array","array","string","string","string","boolean","string","string","boolean","string","string","string","boolean","string","object","object","string","string"],
//no i18n
	data : function(){
		return {
			/**
			 * An array of profile objects to be rendered directly by the component. When provided, the component uses this data instead of making a request to the profile store.
			 * @componentProperty { array } cxPropProfiles
			 */
			cxPropProfiles : Lyte.attr("array",{default : []}), //no i18n
			/**
			 * A list of profile IDs that should be excluded from rendering. Any profiles matching these IDs will not be displayed in the list.
			 * @componentProperty { array } cxPropPreventProfileIds
			 */
			cxPropPreventProfileIds : Lyte.attr("array",{default : []}), //no i18n
			cxPropSelectedProfiles : Lyte.attr("array",{default : []}),//no i18n
			/**
			 * An array of profile IDs representing the profiles that are currently selected in the component.
			 * @componentProperty { array } cxPropSelectedIds
			 */
			cxPropSelectedIds : Lyte.attr("array",{default : []}),//no i18n
			/**
			 * A short descriptive text displayed above the profiles dropdown to provide context or instructions to the user.
			 * @componentProperty { string } cxPropDescription
			 */
			cxPropDescription : Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * The title text rendered in the modal header.
			 * @componentProperty { string } cxPropHeader
			 */
			cxPropHeader :  Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * A CSS class name applied to the modal header for custom styling.
			 * @componentProperty { string } cxPropHeaderClass
			 */
			cxPropHeaderClass :  Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * When set to true, allows developers to render custom header content instead of the default header.
			 * @componentProperty { boolean } cxPropHeaderYield=false
			 * @defaultValue false
			 */
			cxPropHeaderYield : Lyte.attr("boolean",{default : false}),//no i18n
			cxPropModule :  Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * The placeholder text displayed in the profiles dropdown when no selection is made.
			 * @componentProperty { string } cxPropPlaceholder
			 */
			cxPropPlaceholder :  Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * Controls the visibility of the modal. When set to true, the modal is displaye
			 * @componentProperty { boolean } cxPropShow=false
			 * @defaultValue false
			 */
			cxPropShow : Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * Informational notes displayed below the profiles dropdown to guide or inform the user.
			 * @componentProperty { string } cxPropNotes
			 */
			cxPropNotes : Lyte.attr("string"),//no i18n
			/**
			 * The message shown to the user when the profiles are saved successfully.
			 * @componentProperty { string } cxPropSuccessMessage
			 */
			cxPropSuccessMessage : Lyte.attr("string"),//no i18n
			/**
			 * The message shown to the user when saving profiles fails.
			 * @componentProperty { string } cxPropFailureMessage
			 */
			cxPropFailureMessage : Lyte.attr("string"),//no i18n
			showLoading : Lyte.attr("boolean",{default : false}),//no i18n
			selectedProfileIds :  Lyte.attr("string"),//No I18n
			/**
			 * A record object to which the selected profiles will be associated. When provided, the component can trigger a save request to update this record.
			 * @componentProperty { object } cxPropRecord
			 */
			cxPropRecord : Lyte.attr("object"),//No I18n
			/**
			 * Specifies the property key in cxPropRecord where the selected profiles should be stored or updated.
			 * @componentProperty { object } cxPropUpdateKey
			 */
			cxPropUpdateKey : Lyte.attr("object"),//No I18n
			cxPropModal : Lyte.attr("string"),//No I18n
			showErrorMsg : Lyte.attr("string",{default : ""})//No I18n
		}
	},
	setSelectedValue : function(){
		this.setData("selectedProfileIds",JSON.stringify(this.data.cxPropSelectedIds))//no i18n
	}.observes("cxPropSelectedIds").on("init"),//no i18n
	actions : {
		closeprofileModal : function(){
			this.setData("cxPropShow",false);//no i18n
		},
		saveProfiles : function(btnNode){
			var data , record = this.data.cxPropRecord , selectedProfiles = JSON.parse(this.data.selectedProfileIds);
			if( !selectedProfiles.length ){
				this.setData("showErrorMsg",_cruxUtils.getI18n("crm.custom.module.no.profile.selected.alert1"));//No I18n
				return;
			}
			 if(this.getMethods("onBeforeSave")){
				/**
				 * Triggered before the Save button action is executed. Developers can return false from this callback to prevent the save operation from proceeding. Useful for validation or confirmation logic.
				 * @method onBeforeSave
				 * @author silambarasan.rt
				 * @param {Object} object that contains selectedProfiles, component, buttonNode
				*/
				 var retrnFlag = this.executeMethod("onBeforeSave" , { selectedProfiles : selectedProfiles , component : this , buttonNode : btnNode});//No I18n
			}
			if( retrnFlag != false && this.data.cxPropRecord){
				record.$.set(this.data.cxPropUpdateKey , selectedProfiles);
				var _this = this , saveBtn = $L("#saveProfileBtn")[0];
				saveBtn.ltProp("disabled",true);//no i18n
				record.$.save().then(function(res){
					saveBtn.ltProp("disabled",false);//no i18n
					if(_this.data.cxPropSuccessMessage){
						 _cruxUtils.showCustomMessage({params : {ltPropMessage : _this.data.cxPropSuccessMessage,ltPropType : "sucess"}})//no i18n
					}
					_this.setData("cxPropShow",false);//no i18n
				},function(errRes){
					saveBtn.ltProp("disabled",false);//no i18n
					if(_this.data.cxPropFailureMessage){
						 _cruxUtils.showCustomMessage({"params" : {"ltPropMessage" : _this.data.cxPropFailureMessage,"ltPropType" : "error"}});//no i18n
					}
					// if(_this.getMethods("onError")){
					// 	_this.executeMethod("onError" , { errorResponse : errRes , component : _this});//No I18n
					// }
				})
			}
		}
	},
	 methods:{
		 showPermissionModal : function(){
			 if(!this.data.cxPropProfiles || !this.data.cxPropProfiles.length){
					this.setData("showLoading",true)//no i18n
					store.findAll('profile').then(function(data){ //no i18n
						this.setData("cxPropProfiles",data)//no i18n
//						this.openDropdownfn(data)
						this.setData("showLoading",false)//no i18n
					}.bind(this))
				 }
			 if(this.getMethods("onShow")){
				/**
				 * Invoked when the modal is opened and rendered. Can be used to perform initialization logic or analytics tracking.
				 * @method onShow
				 * @author silambarasan.rt
				 * @param {Object} Object that contains component
				*/
				this.executeMethod("onShow" , { component : this});//No I18n
			}
			
		 }, 
		 onCloseModal :  function(){
			if(this.getMethods("onClose")){
				/**
				 * Invoked when the modal is closed. Useful for cleanup, resetting state, or triggering follow-up actions.
				 * @method onClose
				 * @author silambarasan.rt
				 * @param {Object} Object that contains component
				*/
				 this.executeMethod("onClose" , { component : this});//No I18n
			}
			 this.setData("showErrorMsg","");//No I18n
		 },
		 addProfile : function(eve , selected){
			 this.setData("showErrorMsg","");//No I18n
			 if(this.getMethods("onAddProfile")){
				/**
				 * Triggered when a profile is selected from the dropdown and added to the selection list. Provides the added profile and the updated list of selected profiles.
				 * @method onAddProfile
				 * @author silambarasan.rt
				 * @param {Object} Object that contains event, selectedProfile and component
				*/
				this.executeMethod("onAddProfile" , { event : eve , selectedProfile : selected , component : this});//No I18n
			}
		 },
		 beforeRemoveProfile : function(eve , profileId){
			 this.setData("showErrorMsg","")//No I18n
			 if(this.getMethods("onBeforeRemoveProfile")){
				/**
				 * Triggered before a selected profile is removed (e.g., when the remove icon is clicked). Returning false from this callback prevents the profile from being removed. Enables validation or conditional restriction logic.
				 * @method onBeforeRemoveProfile
				 * @author silambarasan.rt
				 * @param {Object} Object that contains event, removed profile and  component
				*/
				 var retrnFlag =this.executeMethod("onBeforeRemoveProfile" , { event : eve , removedProfile : profileId , component : this });//No I18n
			}
			 if( retrnFlag != false ){
				 var selectedIdIndex = this.data.cxPropPreventProfileIds.indexOf(profileId)
				 if( selectedIdIndex != -1){
					 $L("#cxProfileDropDown")[0].close();//No I18n
					 this.setData("showErrorMsg",_cruxUtils.getI18n("crm.auto.enrich.remove.default.profile"))//No I18n
					 return false;
				 }
			 }
			 return retrnFlag;
		 },
		 removeProfile : function(eve , removedProfile){
			 if(this.getMethods("onRemoveProfile")){
				/**
				 * Triggered after a profile has been successfully removed from the s
				 * @method onRemoveProfile
				 * @author silambarasan.rt
				 * @param {Object} Object that contains event, removed profile and component
				*/
				 this.executeMethod("onRemoveProfile" , { event : eve , removedProfile : removedProfile , component : this });//No I18n
			}
		 }
	 }
});
/**
 * @syntax nonYielded
 * <crux-profile-permission-modal></crux-profile-permission-modal>
 */
