/**
 * Renders a tour hint component
 * @component lyte-tour-hint
 * @version 3.1.0
 */


 Lyte.Component.register("lyte-tour-hint", {
_template:"<template tag-name=\"lyte-tour-hint\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourTargetBackground {{ltPropTargetClass}}\"></div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBackgroundAnimation","ltPropTargetClass","ltPropBindToBody","tourStepIndex","ltPropArrowPosition","ltPropAppendBackground","ltPropLabel"],
_observedAttributesType :["boolean","string","boolean","number","string","boolean","string"],

	data : function(){
		return {

			/**
			 * @componentProperty {boolean} ltPropBackgroundAnimation
			 * @default false
			 * 
			 */

			'ltPropBackgroundAnimation' : Lyte.attr('boolean' , { default : false }),
			'ltPropTargetClass': Lyte.attr("string", { default: 'lyteTourTarget' }),
			'ltPropBindToBody' : Lyte.attr('boolean' , { default : false }),
			'tourStepIndex'			: Lyte.attr('number' , { default : 0 }),
			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }),
			'ltPropAppendBackground' : Lyte.attr('boolean' , { default : false }),
			'ltPropLabel'	: Lyte.attr('string' , { default : '' })
		}
	},
	init : function(){

	},
	methods:{
		beforeWormholeAppend : function(arg){
			if(this.childComp){
				delete this.childComp;
			}
			if(this.actualTourDiv){
				delete this.actualTourDiv;
			}
			this.childComp = arg;
			this.actualTourDiv = this.childComp.querySelector(".lyteTourWrap");
		}
	},
	didDestroy : function(){
		if(this.childComp){
			this.childComp.remove();
			delete this.childComp;
		}
		if(this.actualTourDiv){
			delete this.actualTourDiv;
		}
	}
});
