/**
 * Used to display an error message below crux elements
 * @component crux-error-message
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-error-message", {
_template:"<template tag-name=\"crux-error-message\"> {{addMurhyInfo(\"crux-error-message.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{expHandlers(cxPropErrorOnHovercard,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropErrorYield}}\"><template case=\"true\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{errorMessage}}\" cx-field=\"{{cxPropField}}\" data-zcqa=\"{{cruxConcat(cxPropErrorZcqaPrefix,cxPropField.api_name,cxPropErrorZcqaSuffix)}}\"></lyte-yield></template><template case=\"false\"><span id=\"{{cxPropId}}\" class=\"cruxErrMsg cruxErrorMsgDesc {{cxPropErrorSpanClass}} {{if(cxPropAriaErrorProperties.ariaErrorIcon,'cxHasWarnIcon','')}}\" data-zcqa=\"{{cruxConcat(cxPropErrorZcqaPrefix,cxPropField.api_name,cxPropErrorZcqaSuffix)}}\"><span class=\"{{if(cxPropAriaErrorProperties.ariaErrorIcon,'cxWarnIcon','')}}\"></span>{{unescape(errorMessage)}}</span></template></template> </template><template case=\"false\"> <lyte-hovercard lt-prop-auto-show=\"true\" id=\"cx_error_hovercard\" lt-prop-popover-wrapper-class=\"cxErrorHoverCard {{cxPropWrapperClass}}\" lt-prop-origin-elem=\"{{cxPropOriginElem}}\" lt-prop-max-width=\"550px\" class=\"cxErrorHoverCardEle\" lt-prop-hide-on-click=\"{{cxPropHideOnClick}}\" lt-prop-popover=\"{{popoverProps}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-close-on-scroll=\"false\" lt-prop-use-beta-popover=\"{{useMetaPopover}}\" on-before-hovercard-show=\"{{method('beforeOpen')}}\" after-render=\"{{method('afterRenderHovercardComp')}}\" on-hovercard-before-hide=\"{{method('beforeHide')}}\" lt-prop-placement=\"bottomLeft\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <template is=\"if\" value=\"{{cxPropErrorYield}}\"><template case=\"true\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{errorMessage}}\" cx-field=\"{{cxPropField}}\" data-zcqa=\"{{cruxConcat(cxPropErrorZcqaPrefix,cxPropField.api_name,cxPropErrorZcqaSuffix)}}\"></lyte-yield></template><template case=\"false\"><span id=\"{{cxPropId}}\" class=\"cxErrorHoverCardMsg {{cxPropErrorSpanClass}} {{if(cxPropAriaErrorProperties.ariaErrorIcon,'cxHasWarnIcon','')}}\" data-zcqa=\"{{cruxConcat(cxPropErrorZcqaPrefix,cxPropField.api_name,cxPropErrorZcqaSuffix)}}\"><span class=\"{{if(cxPropAriaErrorProperties.ariaErrorIcon,'cxWarnIcon','')}}\"></span>{{unescape(errorMessage)}}</span></template></template> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </template>",
_dynamicNodes : [{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,0]},{"type":"text","position":[0,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropBoundary","cxPropShow","cxPropHideOnClick","cxPropOriginElem","cxPropErrorOnHovercard","cxPropWrapperClass","errorMessage","cxPropId","cxPropErrorYield","cxPropField","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorSpanClass","cxPropErrorIconClass","cxPropPreventClose","popoverProps","cxPropAriaErrorProperties","useMetaPopover"],
_observedAttributesType :["object","boolean","boolean","string","boolean","string","string","string","boolean","object","string","string","string","string","boolean","object","object","boolean"],
//No I18n
	data : function(){
		return {
			cxPropBoundary : Lyte.attr('object'),
			cxPropShow	: Lyte.attr('boolean' , {default : false}),
			cxPropHideOnClick : Lyte.attr('boolean' , {default : true}),
			cxPropOriginElem : Lyte.attr("string"), //No I18n
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropWrapperClass	:  Lyte.attr("string" , {default : ""}),//no i18n
			errorMessage : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * id set to the span tag
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * user can set their own error elements instead of a plain message
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * in yield cases, this is passed back and for non-yield cases this is used for zcqa
			 */
			cxPropField : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * set as prefix to the zcqa
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * set as suffix to the zcqa
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * class set to the span
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropPreventHovercardClose
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * set true to prevent hovercard closing.
			 */
			cxPropPreventClose	 : Lyte.attr('boolean' , {default : false}),//No I18n
			popoverProps : Lyte.attr('object' , {default : {scrollable : true}}),
			/**
			* @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			* @author mariswaran.sv
			* @version 1.0.0
			* property to set error icon and error color
			*/
		   cxPropAriaErrorProperties : Lyte.attr('object'),//No I18n
		   useMetaPopover : Lyte.attr('boolean' , {default : true}),//No I18n
		}
	},
	init : function(){
		this.$node.animateErrorMsg = (type = "shake")=>{
			if( type == "shake" ){
				let className = this.data.cxPropWrapperClass ? this.data.cxPropWrapperClass :"cxErrorHoverCard"
				let popoverWrapEle = $L('.'+className);
				if( popoverWrapEle[0] ){
					popoverWrapEle.addClass('cxShakeErrorHovercard')
					// this.setData('wrapperClass',"cxShakeErrorHovercard");
					setTimeout(()=>{
						popoverWrapEle.removeClass('cxShakeErrorHovercard')
						// this.setData('wrapperClass',"");
					},1000)
				}
				
			}
			
		}
		if( this.data.cxPropBoundary && !this.data.popoverProps.boundary){
			Lyte.objectUtils(this.data.popoverProps ,"add",{"boundary" : this.data.cxPropBoundary});//no i18n
		}
	},
	observeBoundary : function(){
		if( this.data.cxPropBoundary){
			let popoverProps = $L.extend({},this.data.popoverProps);
			popoverProps.boundary = this.data.cxPropBoundary;
			// Lyte.objectUtils(this.data.popoverProps ,"add",{"boundary" : this.data.cxPropBoundary});//no i18n
			this.setData("popoverProps" , popoverProps);
		}
	}.observes('cxPropBoundary').on('init'),
	toggleHovercard : function(){
		
		var currentHoverCard = $L('.cxErrorHoverCardEle' , this.$node)[0];
		if( currentHoverCard ){
			currentHoverCard.ltProp('show',this.data.cxPropShow);
		}
	},
	methods : {
		afterRenderHovercardComp : function(){
			this.toggleHovercard();
		},
		beforeOpen : function(){
			if(!this.data.cxPropPreventClose){
				var currentHoverCard = $L('.cxErrorHoverCardEle' , this.$node)[0];
				var cxHoverCardEle = $L('.cxErrorHoverCardEle');
				var i = 0 ,  len = cxHoverCardEle.length;
				for( i = 0 ; i < len ; i++){
					if( currentHoverCard !=  cxHoverCardEle[i]){
						cxHoverCardEle[i].ltProp('show',false);
					}
				}
			}
			return true;
		},
		beforeHide : function(hovercard , event){
			if(this.data.cxPropPreventClose && event.type !== "scroll"){
				return false;
			}
			return true;
		}
	},
	observeMessage : function(){
        var cruxErrorNode = this.$node;
        var errorMsgSpan = cruxErrorNode.querySelector("span"); //NO I18N
		const lyteErrorNode = $L(cruxErrorNode);
        if(errorMsgSpan && this.data.errorMessage && !this.data.cxPropErrorYield && ((errorMsgSpan.scrollWidth > cruxErrorNode.offsetWidth) || (errorMsgSpan.scrollHeight > 20))){
            lyteErrorNode.addClass("cxErrorMsgMultiLines");    //NO I18N
        }else if(lyteErrorNode.hasClass("cxErrorMsgMultiLines")){
			lyteErrorNode.removeClass("cxErrorMsgMultiLines");
		}
	}.observes("errorMessage").on("didConnect")//No I18n
});

/**
 * @syntax nonYielded
 * <crux-error-message></crux-error-message>
 */
