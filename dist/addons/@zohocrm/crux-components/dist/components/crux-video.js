/**
 * It is a wrapper written over HTML video tag to support cross browser functionalities.
 * @component crux-video
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-video", {
_template:"<template tag-name=\"crux-video\"> <template is=\"if\" value=\"{{isNotSafari11}}\"><template case=\"true\"> <video src=\"{{src}}\" class=\"{{class}}\" width=\"{{width}}\" height=\"{{height}}\" autoplay=\"{{autoplay}}\" controls=\"{{controls}}\" muted=\"{{muted}}\" onended=\"{{action('ended')}}\" id=\"{{cxPropId}}\"> </video> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}],
_observedAttributes :["src","width","height","autoplay","controls","muted","isNotSafari11","class","cxPropId"],
_observedAttributesType :["string","string","string","boolean","boolean","boolean","boolean","string","string"],
//No I18n
	data : function(){
		return {
			/**
			 * This defines the src of the video file
			 * @componentProperty { string } src
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			src:Lyte.attr("string"),//No I18n
			/**
			 * To set the width of the component
			 * @componentProperty { string } width
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			width:Lyte.attr("string"),//No I18n
			/**
			 * To set the height of the component.
			 * @componentProperty { string } height
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			height:Lyte.attr("string"),//No I18n
			/**
			 * When present, the video will automatically start playing as soon as it can do so without stopping.
			 * @componentProperty { boolean } autoplay=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			autoplay:Lyte.attr("boolean", {default:false}),//No I18n
			/**
			 * Specifies that video controls should be displayed (such as a play/pause button etc)
			 * @componentProperty { boolean } controls=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			controls:Lyte.attr("boolean", {default:false}),//No I18n
			/**
			 * Specifies that the audio output of the video should be muted.
			 * @componentProperty { boolean } muted=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			muted:Lyte.attr("boolean",{default: false}),//No I18n
			isNotSafari11:Lyte.attr("boolean",{default :false}),//No I18n
			/**
			 * Sets class to the video element
			 * @componentProperty { string } class
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			class:Lyte.attr("string"),//No I18n
			/**
			 * Set a unique id to the video element
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId : Lyte.attr("string")//No I18n
		}		
	},
	init : function(){
		var isSafari = navigator.userAgent.indexOf("Safari");//No I18n
		if(isSafari != -1)
		{
			var versionArr = navigator.userAgent.match(/version\/(\d+)/i) || [];
			if(!versionArr[1])
			{
				this.setData("isNotSafari11", true);//No I18n
			}
		}	
		else{
			this.setData("isNotSafari11", true);//No I18n
		}
	},
	didConnect : function(){
		if(!this.getData("isNotSafari11")){	
			var video = document.createElement("video")
			video.setAttribute("src", this.getData("src"));
			video.setAttribute("autoplay", this.getData("autoplay"));
			video.setAttribute("controls",this.getData("controls"));
			video.setAttribute("muted", this.getData("muted"));
			video.setAttribute("width", this.getData("width"));
			video.setAttribute("height", this.getData("height"));
			video.addEventListener("ended",function(){
				if(this.parentNode.component.getMethods("onVideoEnded")){
	                this.parentNode.component.executeMethod("onVideoEnded");//No I18n					
				}
            });
            video.setAttribute("id", this.getData("cxPropId"));
            if(this.getData("controls") == false){
            	video.removeAttribute("controls");
            }
			this.$node.appendChild(video);
		}
		 /**
		  * Triggers play of the video element
		 * @utility play
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */
		this.$node.play = function(){
			this.querySelector("video").play();//No I18n
		}
		 /**
		  * Triggers pause of the video element
		 * @utility pause
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */
		this.$node.pause = function(){
			this.querySelector("video").pause();//No I18n
		}
		 /**
		  * Triggers load of the video element
		 * @utility load
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */
		this.$node.load = function(){
			this.querySelector("video").load();//No I18n
		}
	},
	actions : {
		ended:function(){
			if(this.getMethods("onVideoEnded")){
				/**
				 * Is triggered when video has ended
				 * @method onVideoEnded
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onVideoEnded");//No I18n				
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <crux-video></crux-video>
 */