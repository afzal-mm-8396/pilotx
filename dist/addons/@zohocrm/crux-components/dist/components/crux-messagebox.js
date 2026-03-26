/**
 * @component crux-messagebox
 * @author mariswaran.sv
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-messagebox", {
_template:"<template tag-name=\"crux-messagebox\"> <lyte-messagebox on-close=\"{{method('setClose')}}\" on-show=\"{{method('setShow')}}\" lt-prop-message=\"{{cxPropMessage}} \" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-type=\"{{cxPropType}} \" lt-prop-class=\"{{cxPropClass}}\" lt-prop-duration=\"{{cxPropDuration}}\" lt-prop-offset=\"{{cxPropOffset}}\" lt-prop-transition=\"{{cxPropTransition}}\" lt-prop-yield=\"true\" lt-prop-animation=\"{{cxPropAnimation}}\" lt-prop-close-manually=\"{{cxPropCloseManually}}\"> <template is=\"registerYield\" yield-name=\"messageboxYield\"> <span> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropYield,'!'),'&amp;&amp;',expHandlers(cxPropMarkdown,'!'))}}\"><template case=\"true\"> {{cxPropMessage}} </template><template case=\"false\"> {{unescape(if(cxPropMarkdown,markdown(cxPropMessage),cxPropMessage))}} </template></template> </span> </template> </lyte-messagebox> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropShow","cxPropMessage","cxPropType","cxPropDuration","cxPropOffset","cxPropTransition","cxPropYield","cxPropClass","cxPropMarkdown","cxPropCloseManually"],
_observedAttributesType :["boolean","string","string","string","object","string","boolean","string","boolean","boolean"],

	data : function(){
		return {
			/**
			 * Set this property true to show the message box, false to hide.
			 * @componentProperty { boolean } cxPropShow=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShow : Lyte.attr("boolean", {default : false}),
			/**
			 * Text to be rendered as message of the message box.
			 * @componentProperty { string } cxPropMessage
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropMessage : Lyte.attr("string", {default : ""}) ,
			/**
			 * Text to be rendered as message of the message box.
			 * @componentProperty { string } cxPropType
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue success
			 */
			cxPropType : Lyte.attr("string", {default : "success"}),
			/**
			 * Amount of time (in milliseconds) for which the message box will be displayed. <bNote:</> 2000 is passed as a string value.
			 * @componentProperty { string } cxPropDuration
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue 2000
			 */
			cxPropDuration: Lyte.attr("string", {default : "2000"}),
			/**
			 * You can define the message box's position using this property. Any valid css values can be given as top and left values. Along with that, we provide 'center' as a value. If top/left value is 'center', we will position the message box vertically/horizontally.
			 * @componentProperty { object } cxPropOffset
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropOffset : Lyte.attr("object"),
			/**
			 * This object specifies the animation to be used. This consists of animation property whose value can either be <b>'fadeIn'</b> or <b>'slideFromTop'</b>. example : ltPropTransition = {'animation':'slideFromTop'}
			 * @componentProperty { string } cxPropTransition
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropTransition: Lyte.attr("string", {default : ' {"animation" : "fadeIn" } ' }),
			/**
			 * Set to true to provide a message for the messagebox.
			 * @componentProperty { boolean } cxPropYield=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropYield: Lyte.attr("boolean", {default : false}),
			/**
			 * It acts as a wrapper class for the messagebox, using which the messagebox can be customized.
			 * @componentProperty { string } cxPropClass
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue cxAlertWrapper
			 */
			cxPropClass: Lyte.attr("string", {default : "cxAlertWrapper"}),
			/**
			 * Set to true to pass markdown message
			 * @componentProperty { boolean } cxPropMarkdown=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropMarkdown: Lyte.attr("boolean", {default : false}),
			/**
			 * Set this to true to prevent close of message box unless done manually
			 * @componentProperty { boolean } cxPropCloseManually=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropCloseManually: Lyte.attr("boolean", {default : false})
			}		
	},
	init: function(){
		if(this.$node.getData("cxPropClass")!= "cxAlertWrapper")
		{
			this.$node.setData("cxPropClass",this.$node.getData("cxPropClass")+" "+"cxAlertWrapper");
		}
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		setShow: function()
		{
			var node=this.$node.querySelector('lyte-messagebox');
			if(this.getMethods("onShow")){
				/**
			 * It is called when the messagebox is shown
			 * @method onShow
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } component
			 */
				node && this.executeMethod("onShow",node.component);
			 }
		},
		setClose: function()
		{
			var node=this.$node.querySelector('lyte-messagebox');
			if(this.getMethods("onClose")){
				/**
			 * It is called when the messagebox is closed
			 * @method onClose
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } component
			 */
				node && this.executeMethod("onClose",node.component);
			 }
		}
	}
});

/**
 * @syntax nonYielded
 * <crux-messagebox></crux-messagebox>
 */
