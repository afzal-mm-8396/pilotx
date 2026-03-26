/**
 * @component crux-schedular-notification-popup
 * @author silambarasan.rt
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-schedular-notification-popup", {
_template:"<template tag-name=\"crux-schedular-notification-popup\" id=\"cruxSchedularPopup\" class=\"cruxSchedularPopup_{{cxPropClass}}\"> <lyte-modal lt-prop-allow-multiple=\"true\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-freeze=\"false\" lt-prop-width=\"{{cxPropWidth}}\" lt-prop-close-on-escape=\"false\" lt-prop-show-close-button=\"false\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromBottom&quot;,&quot;duration&quot;:&quot;0.5&quot;}\" lt-prop-offset=\"{&quot;right&quot;:&quot;0px&quot;,&quot;bottom&quot;:&quot;30px&quot;}\" lt-prop-wrapper-class=\"cxSchedularModal cxSchedularModal_{{cxPropClass}}\" on-show=\"{{method(&quot;onOpen&quot;)}}\" on-close=\"{{method(&quot;closeNotification&quot;)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header data-zcqa=\"{{cxPropClass}}_header\"> <span data-zcqa=\"{{cxPropHeaderDataZcqa}}\"> {{cxPropHeader}} </span> <div class=\"cxSchedularCloseWrap\"> <template is=\"if\" value=\"{{cxPropShowMinimizeIcon}}\"><template case=\"true\"><span data-zcqa=\"{{cxPropClass}}_minimize_icon\" class=\"cxSchedularMinimize\" onclick=\"{{action('closeModal','minimize')}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropShowCloseIcon}}\"><template case=\"true\"><span data-zcqa=\"{{cxPropClass}}_close_icon\" class=\"cxSchedularClose\" onclick=\"{{action('closeModal','close')}}\"></span></template></template> </div> </lyte-modal-header> <lyte-modal-content class=\"cxSchedularBody {{cxPropClass}}\"> <template is=\"if\" value=\"{{cxPropBodyYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"schedularBodyYield\"></lyte-yield> </template><template case=\"false\"> <template is=\"for\" items=\"{{cxPropMessage}}\" item=\"item\" index=\"ind\"> <div class=\"cxSchedularNotification cxNotification_{{ind}} {{item.cxClass}}\"> <template is=\"if\" value=\"{{item.cxMessage}}\"><template case=\"true\"><div class=\"cxSchedularMsg\"> <template is=\"if\" value=\"{{expHandlers(item.cxIcon,'||',expHandlers(item.cxStatus,'==','success'))}}\"><template case=\"true\"><span class=\"cxSchedularIcon {{item.cxIconClass}} {{if(ifEquals(item.cxStatus,'success'),'cxSchedularSuccessIcon','')}}\"></span></template></template> <div class=\"cxSchedularMsgDataWrap\"> <template is=\"if\" value=\"{{item.cxMessageYield}}\"><template case=\"true\"> {{unescape(item.cxMessage)}} </template><template case=\"false\"> <span data-zcqa=\"{{expHandlers(item.cxZcqa,'||',item.cxMessage)}}\" class=\"cxSchedularMsgText\">{{item.cxMessage}}</span> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropMessage.length,'>',1),'&amp;&amp;',item.cxCloseIconClass)}}\"><template case=\"true\"><span onclick=\"{{action('removeMessage',item,ind)}}\" class=\"cxSchedularCardCloseIcon {{item.cxCloseIconClass}}\"></span></template></template> </div></template></template> <template is=\"if\" value=\"{{expHandlers(item.cxStatus,'==','progress')}}\"><template case=\"true\"><div class=\"cxProgressBar\"> <div class=\"cxProgressBarLoader\"></div> </div></template></template> <template is=\"for\" items=\"{{cxLink}}\" item=\"link\" index=\"index\"> <span class=\"cxLink_{{index}}\"> <link-to lt-prop-route=\"{{link.route}}\" lt-prop-dp=\"{{link.dp}}\" lt-prop-qp=\"{{link.qp}}\" lt-prop-class=\" {{link.class}}\"> {{link.name}} </link-to> </span> </template> </div> </template> </template></template> </lyte-modal-content> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"for","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]}]}]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropLink","cxPropMessage","cxPropHeader","cxPropShow","cxPropTimeOut","cxPropBodyYield","cxPropWidth","cxPropClass","cxPropPreventCloseOnTimeout","cxPropShowMinimizeIcon","cxPropShowCloseIcon","modalTransition","cxPropHeaderDataZcqa"],
_observedAttributesType :["array","array","string","boolean","number","boolean","string","string","boolean","boolean","boolean","object","string"],
//no i18n
	data : function(){
		return {
			/**
			 * @componentProperty { array } cxPropLink
			 */
			cxPropLink : Lyte.attr("array" , {default : []}),//no i18n
			/**
			 * This property used to set content of the notification
			 * @componentProperty { array } cxPropMessage
			 */
			cxPropMessage : Lyte.attr("array" , { default : [] }),//no i18n
			/**
			 * This property used to set header of the notification
			 * @componentProperty { string } cxPropHeader
			 */
			cxPropHeader : Lyte.attr("string" , { default : "" }),//no i18n
			/**
			 * @componentProperty { boolean } cxPropShow=false
			 */
			cxPropShow : Lyte.attr("boolean"),//no i18n
			/**
			 * Amount of time (in milliseconds) for which the notification will be displayed
			 * @componentProperty { number } cxPropTimeOut
			 * @default 5000
			 */
			cxPropTimeOut : Lyte.attr("number" , {default : 5000}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropBodyYield=false
			 */
			cxPropBodyYield : Lyte.attr("boolean" , {default : false}),//no i18n
			/**
			 * This property helps you to define width of the modal
			 * @componentProperty { string } cxPropWidth
			 */
			cxPropWidth: Lyte.attr("string", {default: '400px'}),	//NO I18N
			/**
			 * this class property should be unique.
			 * @componentProperty { string } cxPropClass
			 */
			cxPropClass: Lyte.attr("string", {default: ''})	,//NO I18N
			/**
			 * set this property to true to prevent close the popup
			 * @componentProperty { boolean } cxPropPreventCloseOnTimeout=false
			 */
			cxPropPreventCloseOnTimeout : Lyte.attr("boolean" , {default : false}),//no i18n
			/**
			 * set true to show minimize icon in the header
			 * @componentProperty { boolean } cxPropShowMinimizeIcon=false
			 */
			cxPropShowMinimizeIcon	: Lyte.attr("boolean" , {default : false}),//no i18n
			/**
			 * set false to hide the close icon in the header
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 */
			cxPropShowCloseIcon		: Lyte.attr("boolean" , {default : true}),//no i18n
			modalTransition : Lyte.attr("object" , { default : {"animation":"slideFromBottom","duration":"0.6"}}),
			cxPropHeaderDataZcqa : Lyte.attr("string", { default: "" }),//no i18n
		}		
	},
	init : function(){
		this.$node.show = ()=>{
			this.setData('cxPropShow',true);//no i18n
		}
		this.$node.hide = (destroyNode = false)=>{
			this.setData('cxPropShow',false);//no i18n
			if( destroyNode ){
				this.$node.remove();
			}
		}
	},
	actions : {
		removeMessage : function(item , ind){
			Lyte.arrayUtils(this.getData('cxPropMessage'), 'removeAt', ind ,1) //no i18n
			// if( !this.getData('cxPropMessage').length ){
			// 	this.closeFncalledFrom = 'close'
			// 	this.setData('cxPropShow' , false);
			// }
		},
		// stopEvent : function(){
		// 	clearTimeout(this.timeInverval);
		// 	this.setData("cxPropShow" , false);//no i18n
		// },
		closeModal : function(calledFrom){
			this.closeFncalledFrom = calledFrom;
			this.setData("cxPropShow" , false);//no i18n
		}
	},
	observeMessage : function(){
		let modalEle = this.$node.querySelector('lyte-modal');
		if( modalEle && modalEle.alignModal ){
			modalEle.alignModal();
		}
		if( !this.getData('cxPropMessage').length ){
			this.closeFncalledFrom = 'close'
			this.setData('cxPropShow' , false);
		}
		
	}.observes('cxPropMessage.[]').on('didConnect'),
	methods :{
		onOpen : function(){
			if(this.getMethods("onShow")){
				/**
				 * @method onShow
				 * @param { * } component
				 */
				this.executeMethod("onShow" , this);//No I18n
			}
			if(!this.data.cxPropPreventCloseOnTimeout){
				clearTimeout(this.timeInverval);
				this.timeInverval = setTimeout(function(){
					this.closeFncalledFrom = "timeout"
					 this.setData("cxPropShow" , false);//no i18n
				}.bind(this),this.data.cxPropTimeOut)
			}
		},
		closeNotification : function(){
			if(this.getMethods("onClose")){
				/**
				 * @method onClose
				 * @param { * } component
				 */
				this.executeMethod("onClose" , this , this.closeFncalledFrom);//No I18n
			}
			clearTimeout(this.timeInverval);
		}
	}
});
/**
 * @syntax nonYielded
 * <crux-schedular-notification-popup></crux-schedular-notification-popup>
 */