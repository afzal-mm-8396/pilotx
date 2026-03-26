Lyte.Component.register("crux-tag-popover", {
_template:"<template tag-name=\"crux-tag-popover\"> <lyte-popover lt-prop-origin-elem=\".cxPropOnFocusTag .moreTagOption\" class=\"moreTagOptionPopover\" lt-prop-freeze=\"{{cxPropFreezePopover}}\" lt-prop-show-close-button=\"false\" lt-prop-show=\"true\" lt-prop-type=\"box\" lt-prop-max-width=\"200\" lt-prop-width=\"200\" lt-prop-content-padding=\"15px 15px 5px\" lt-prop-wrapper-class=\"nLvTagsMoreOptionhandle cxTagPopoverWrapper\" lt-prop-duration=\"{{durationUndefined}}\" on-close=\"{{method('closePopover')}}\" lt-prop-bind-to-body=\"true\" lt-prop-dimmer=\"{{cxPropPopoverDimmer}}\" lt-prop-close-on-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"tagPopoverLab\" data-zcqa=\"cruxTagCompPopOver\"> <div> <ul class=\"listview_taglists m0 dIB\"> <template is=\"for\" items=\"{{remainingValues}}\" item=\"val\" index=\"index\"> <li class=\"pL0\"> <span class=\"tagElementList dIB cxAddedTags {{concat('cxTag',cruxGetTagColorIndex(val.color_code))}} {{if(tagsClickable,'cP','')}} {{if(cruxOr(ifEquals(val.color_code,'noFill'),negate(val.color_code)),'cxTagNoFillCol','')}}\" style=\"background: {{if(ifEquals(val.color_code,'noFill'),'transparent',concat(val.color_code,' !important;'))}}; color : {{cruxGetPicklistFontColor(val.color_code)}}\" onclick=\"{{action('tagsTransition',val)}}\">{{val.name}}</span> </li> </template> </ul> </div> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background: '",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["val.color_code","'noFill'"]}},"'transparent'",{"type":"helper","value":{"name":"concat","args":["val.color_code","' !important;'"]}}]}},"'; color : '",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["val.color_code"]}}]}}}},{"type":"text","position":[1,1,0]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["durationUndefined","cxPropFreezePopover","cxPropPopoverDimmer","tagsClickable"],
_observedAttributesType :["number","boolean","object","boolean"],
//No I18n
	data : function(){
		return {
            durationUndefined : Lyte.attr("number", {default : undefined}),//NO I18n
			cxPropFreezePopover : Lyte.attr("boolean", {default : false}),
			cxPropPopoverDimmer : Lyte.attr("object", {default : {"color":"#000","opacity":"0"}}),
			tagsClickable : Lyte.attr("boolean", {default : false})
		}		
	},
	actions : {
		showMoreTags : function(){
			clearTimeout(this.getData("cxParent").hideTimeout);//No I18n
		},
		hideMoreTags : function(){
			this.getData("cxParent").hideTags();//No I18n
		},
		tagsTransition :function(tag){
			if(this.getMethods("onTagClick")){
				this.executeMethod("onTagClick", tag);
			}
		}
	},
	methods : {
		closePopover : function(){
			setTimeout(function(){
				document.querySelector(".cxPropOnFocusTag").classList.remove("cxPropOnFocusTag");//No I18n
			}, 10);
		}
	}
});
