/**
 * @component crux-permission-denied-alert
 * @author manikaraja.p
 * @version 1.0.0
 * @summary The crux-permission-denied-alert can be used when the user does not have permission to access the page or perform certain actions.
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-permission-denied-alert", {
_template:"<template tag-name=\"crux-permission-denied-alert\" class=\"crux-permission-denied-alert\"> <lyte-alert data-zcqa=\"crm_error_page\" lt-prop-focus-on-close=\"{{cxPropFocusOnClose}}\" lt-prop-buttons=\"{{cxPropButtons}}\" lt-prop-button-position=\"{{cxPropButtonPosition}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-top=\"{{cxPropTop}}\" lt-prop-wrapper-class=\"cxPermissionDeniedAlert\" lt-prop-yield=\"true\" lt-prop-show-close-button=\"false\" lt-prop-close-on-escape=\"{{cxPropCloseOnEscape}}\" on-accept=\"{{method(&quot;onAcceptAlert&quot;)}}\" on-reject=\"{{method(&quot;onRejectAlert&quot;)}}\" on-show=\"{{method(&quot;onShowAlert&quot;)}}\" on-close=\"{{method(&quot;onCloseAlert&quot;)}}\"> <template is=\"registerYield\" yield-name=\"alert\"> <template is=\"if\" value=\"{{cxPropIcon}}\"><template case=\"true\"> <lyte-alert-header class=\"cxPermDenyWithIcon\"> <span class=\"cxPermissionDeniedIcon dIB cxVam\"></span> <span class=\"cxPermissionDeniedText\" data-zcqa=\"cxPermDeniedPopupTitle\">{{unescape(cxPropTitle)}}</span> </lyte-alert-header> <lyte-alert-content class=\"cxPermDenyWithIcon\" data-zcqa=\"cxPermDeniedPopupReason\">{{unescape(cxPropReason)}}</lyte-alert-content> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-alert-footer> <lyte-yield yield-name=\"footerYield\"></lyte-yield> </lyte-alert-footer> </template></template> </template><template case=\"false\"> <lyte-alert-header> {{unescape(cxPropTitle)}} </lyte-alert-header> <lyte-alert-content> {{unescape(cxPropReason)}}</lyte-alert-content> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-alert-footer> <lyte-yield yield-name=\"footerYield\"></lyte-yield> </lyte-alert-footer> </template></template> </template></template> </template> </lyte-alert> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropReason","cxPropTitle","cxPropShow","cxPropIcon","cxPropButtons","cxPropButtonPosition","cxPropTop","cxPropFooterYield","cxPropCloseOnEscape","cxPropFocusOnClose"],
_observedAttributesType :["string","string","boolean","boolean","array","string","string","boolean","boolean","boolean"],
 //NO I18N
	data : function(){
		return {
			/**
			 * To set the content of the alert box.
			 * @componentProperty { string } cxPropReason
			 * @author manikaraja.p
			 */
			cxPropReason : Lyte.attr("string"), //NO I18N
			/**
			 * To set the title of the alert box.
			 * @componentProperty { string } cxPropTitle
			 * @author manikaraja.p
			 */
			cxPropTitle :  Lyte.attr("string"), //NO I18N
			/**
			 * Set this property to true to display the alert, false to close
			 * @componentProperty { boolean } cxPropShow=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropShow : Lyte.attr("boolean"), //NO I18N
			/**
			 * A permission denied icon is displayed by default, you can choose to not display it by passing this value as false.
			 * @componentProperty { boolean } cxPropIcon=false
			 * @author manikaraja.p
			 * @defaultValue true
			 */
			cxPropIcon : Lyte.attr("boolean",{default : true}), //NO I18N
			//cxPropButtonText : Lyte.attr("string",{default : _cruxUtils.getI18n("crm.button.ok")}), //NO I18N
			/**
			 * A JSON string, consists of buttons information to be rendered in the alert. The string can consist of all the properties supported by lyte-button. Two types of buttons are supported: accept and reject.
			 * @componentProperty { array } cxPropButtons
			 * @author manikaraja.p
			 */
			cxPropButtons : Lyte.attr("array" , {default : [{"type":"accept","text": _cruxUtils.getI18n("crm.button.ok") ,"appearance":"default"}]}), //NO I18N
			/**
			 * This property defined the position of the button.
			 * @componentProperty { string } cxPropButtonPosition
			 * @author manikaraja.p
			 * @defaultValue right
			 * @allowedValues ["left", "right", "center"]
			 */
			cxPropButtonPosition : Lyte.attr("string",{default : "right"}), //NO I18N
			/**
			 * This property helps you to set the top property of the alert.
			 * @componentProperty { string } cxPropTop
			 * @author manikaraja.p
			 * @defaultValue 0px
			 */
			cxPropTop : Lyte.attr("string",{default : "0px"}), //NO I18N
			/**
			 * Set this property to true to provide the footer of the alert using yield
			 * @componentProperty { boolean } cxPropFooterYield=false
			 * @author manikaraja.p
			 * @defaultValue false
			 */
			cxPropFooterYield : Lyte.attr("boolean" , {default : false}), //NO I18N
			/**
			 * Set this property to true to close the alert on escape keypress
			 * @componentProperty { boolean } cxPropCloseOnEscape=false
			 * @author manikaraja.p
			 * @defaultValue true
			 */
			cxPropCloseOnEscape : Lyte.attr("boolean" , {default : true}), //NO I18N
			/**
			 * It will focus the document after closed the alert.
			 * @componentProperty { boolean } cxPropFocusOnClose=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFocusOnClose  : Lyte.attr("boolean" , {default : false}) //NO I18N
		}
	},
	// init : function(){
	// 	if(!this.data.cxPropButtons){
	// 		this.setData("cxPropButtons" , [{"type":"accept","text": this.data.cxPropButtonText ,"appearance":"default"}]);//NO I18N
	// 	}
	// },
	methods : {
		onAcceptAlert : function(){
			this.setData("cxPropShow" , false); //NO I18N
			if(this.getMethods('onAccept')){ //NO I18N
				/**
				 * It is called, on click of button with type accept.
				 * @method onAccept
				 * @author manikaraja.p
				 * @version 1.0.0
				 */
				this.executeMethod('onAccept'); //NO I18N
		 	}
		},
		onShowAlert : function(){
			var reason = this.getData("cxPropReason"); //NO I18N
			var title = this.getData("cxPropTitle"); //NO I18N
			if(!reason){
				this.setData("cxPropReason",_cruxUtils.getI18n("crm.security.error")) //NO I18N
			}else{
				reason = reason.trim().replace(/\s+/g, " ");
				this.setData("cxPropReason",reason); //NO I18N
			}
			if(!title){
				this.setData("cxPropTitle",_cruxUtils.getI18n("crm.label.creator.noPermission")) //NO I18N
			}else{
				title = title.trim().replace(/\s+/g, " ");
				this.setData("cxPropTitle",title); //NO I18N
			}
			var button = $L(".cxPermissionDeniedAlert lyte-button")[0];
			button && button.setAttribute("data-zcqa","crm_permission_error");
			if(this.getMethods('onShow')){ //NO I18N
				/**
				 * It is called, whenever alert is opened.
				 * @method onShow
				 * @author manikaraja.p
				 * @version 1.0.0
				 */
				this.executeMethod('onShow'); //NO I18N
		 	}
		 },
		 onCloseAlert : function(){
			if(this.getMethods('onClose')){ //NO I18N
				/**
				 * It is called, whenever alert is closed. Alert can be closed on click of close button and escape key pressed. It is called after onAccept and onReject too.
				 * @method onClose
				 * @author manikaraja.p
				 * @version 1.0.0
				 */
				this.executeMethod('onClose'); //NO I18N
		 	}
		},
		onRejectAlert : function(){
			if(this.getMethods('onReject')){ //NO I18N
				/**
				 * It is called, on click of button with type reject. If false is returned then the alert won't be closed.
				 * @method onReject
				 * @author manikaraja.p
				 * @version 1.0.0
				 */
				this.executeMethod('onReject'); //NO I18N
		 	}
		}
	}

});
