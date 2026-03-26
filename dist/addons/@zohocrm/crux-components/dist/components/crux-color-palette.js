Lyte.Component.register("crux-color-palette", {
_template:"<template tag-name=\"crux-color-palette\"> <span class=\"cxColorDropperOuter\" data-zcqa=\"colorPaletteOpen\" onclick=\"{{action('openPalette',this)}}\"> <span class=\"cxColorDropperCircle cxVam {{concat('cx',cruxReplace(cxPropSelectedColor,'#',''))}}\" id=\"cxPaletteOpener_{{cxPropId}}\" style=\"{{if(ifEquals(cxPropSelectedColor,'noFill'),'',concat('background-color : ',cxPropSelectedColor))}};\"></span> <span class=\"cxPaletteDropArrow\"></span> </span> <lyte-popover lt-prop-placement=\"bottom top\" lt-prop-freeze=\"false\" lt-prop-scrollable=\"true\" lt-prop-content-padding=\"0px\" lt-prop-auto-align=\"{{cxPropAutoAlignPopover}}\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-wrapper-class=\"cxPaletteWrapper {{cxPropWrapperClass}}\" on-before-close=\"{{method('popoverBeforeClose')}}\" on-close=\"{{method('popoverClose')}}\" lt-prop-origin-elem=\"#cxPaletteOpener_{{cxPropId}}\" lt-prop-width=\"{{cxPropPopoverWidth}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxPalettePopoverContent\"> <div id=\"predefinedColorContainer\"> <template is=\"if\" value=\"{{cxPropShowText}}\"><template case=\"true\"> <div class=\" cxAlignCenter cxPaletteSampleTextContainerParent\"> <span class=\"cxPaletteSampleTextContainer cxPaletteSampleTextContainerContent {{if(ifEquals(cxPropSelectedColor,'noFill'),'cxPaletteSampleNofill','')}}\" style=\"background-color: {{bgColor}}; color : {{clr}}\">{{cruxGetI18n('crm.picklist.sample.text')}}</span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(showColorPicker,'!'),'&amp;&amp;',expHandlers(cxPropAlwaysShowColorPicker,'!'))}}\"><template case=\"true\"> <div class=\"cxColorPalette\"> <template is=\"if\" value=\"{{cxPropNoFill}}\"><template case=\"true\"> <span class=\"cxPaletteCircle cxnoFill {{if(expHandlers('noFill','==',cxPropSelectedColor),'cxPaletteSelected','')}}\" data-zcqa=\"noFillColor\" onclick=\"{{action('selectedColor','noFill')}}\"></span> </template></template> <template is=\"for\" items=\"{{defaultColors}}\" item=\"item\" index=\"index\"> <span class=\"cxPaletteCircle {{if(expHandlers(item,'==',cxPropSelectedColor),'cxPaletteSelected selectedColor_picklist','')}} {{concat('cx',cruxReplace(item,'#',''))}}\" data-zcqa=\"color{{cruxReplace(item,'#','')}}\" onclick=\"{{action('selectedColor',item)}}\" style=\"background-color : {{item}};\"></span> </template> </div> <template is=\"if\" value=\"{{cxPropMoreColorButton}}\"><template case=\"true\"> <div class=\"cxPaletteMoreColorsBtn cxAlignCenter\" data-zcqa=\"cp_addNewColor\" id=\"addNewColor\" onclick=\"{{action('showColorpicker')}}\"> <span class=\"cxVam cxPaletteColorPickerIcon\"></span> <span class=\" cxPaletteColorPickerIconColor cxVam\">{{cruxGetI18n('crm.more.colors')}}</span> </div> </template></template> </template><template case=\"false\"> <div id=\"cxLytePickerWrapper\"> <lyte-colorpicker lt-prop-show=\"true\" lt-prop-basic-color-picker=\"false\" lt-prop-selected-color=\"{{cxPropSelectedColor}}\" lt-prop=\"{&quot;boardColor&quot;:&quot;{{boardColor}}&quot;, &quot;inline&quot; : true}\" on-open=\"{{method('addQA')}}\" on-change=\"{{method('colorChanged')}}\" lt-prop-freeze=\"true\" id=\"colorpicker_dropper\" class=\"cxPaletteColorPicker\"></lyte-colorpicker> </div> <div class=\" cxPaletteProceedBtns\"> <lyte-button lt-prop-appearance=\"default\" lt-prop-size=\"small\" onclick=\"{{action('showPredefinedColors')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.back.alone')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-size=\"small\" onclick=\"{{action('setCustomcolor')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('Done')}} </template> </lyte-button> </div> </template></template> </div> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["cxPropSelectedColor","'noFill'"]}},"''",{"type":"helper","value":{"name":"concat","args":["'background-color : '","cxPropSelectedColor"]}}]}},"';'"]}}}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color: '","bgColor","'; color : '","clr"]}}}},{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color : '","item","';'"]}}}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropNoFill","cxPropDefaultColors","cxPropMoreColorButton","cxPropSelectedColor","cxPaletteOpen","cxPropAutoAlignPopover","showColorPicker","boardColor","cxPropShowText","bgColor","cxPropAddCustomColorsToPalette","cxPropShow","cxPropWrapperClass","defaultColors","cxPropPopoverWidth","cxPropId","cxPropAlwaysShowColorPicker"],
_observedAttributesType :["boolean","array","boolean","string","boolean","boolean","boolean","string","boolean","string","boolean","boolean","string","array","string","string","boolean"],
//no i18n
	data : function(){
		return {
			cxPropNoFill : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropDefaultColors : Lyte.attr('array',{default : ['#F17574','#F48435','#E7A826','#A8C026','#63C57E','#1DB9B4','#57B1FD','#879BFC','#D297EE','#FD87BD',"#969696",'#658BA8','#B88562']}), //no i18n
			cxPropMoreColorButton : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropSelectedColor : Lyte.attr('string',{default : 'noFill'}), //no i18n
			cxPaletteOpen : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropAutoAlignPopover : Lyte.attr('boolean',{default : true}), //no i18n
			showColorPicker : Lyte.attr("boolean", {default : false}), //no i18n
			boardColor : Lyte.attr("string", {default : 'ff0000'}),//NO I18n
			cxPropShowText : Lyte.attr("boolean", {default : true}),//NO I18n
			bgColor : Lyte.attr("string"),//NO I18n
			cxPropAddCustomColorsToPalette : Lyte.attr("boolean", {default : false}),//NO I18n
			cxPropShow : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropWrapperClass : Lyte.attr("string", {default :''}),//No I18n
			defaultColors : Lyte.attr("array"),//No I18n
			cxPropPopoverWidth : Lyte.attr('string',{default : '240px'}), //no i18n
			cxPropId : Lyte.attr("string"),
			cxPropAlwaysShowColorPicker : Lyte.attr('boolean',{default : false}) //no i18n
		}		
	},
	init : function(){
		this.$node.closePalette = function(){
			this.component.setData('cxPaletteOpen',false);//no i18n
			var popover = this.querySelector('lyte-popover'); //no i18n
			popover.ltProp('duration',undefined); //no i18n
			popover.ltProp('show',false);//no i18n
			popover.ltProp('duration',400); //no i18n
		}
		this.$node.alignColorPalette = function(){
			this.querySelector('lyte-popover').alignPopover(); //no i18n
		}
		this.$node.resetColorPalette = function(){
			this.setData("defaultColors", this.component.data.cxPropDefaultColors.slice(0));//No I18n
		}
		this.customColorLen = 0;
		this.$node.resetColorPalette();
	},
	actions : {
		selectedColor : function(color){
			if(this.getMethods('onSelectColor')){
				this.executeMethod('onSelectColor',color);//no i18n
			}
			this.setData('cxPropSelectedColor',color);//no i18n
			this.highlightSelectedColor();
			var check = true;
			if(this.getMethods('onBeforeColorPaletteHide')){
				check = this.executeMethod('onBeforeColorPaletteHide',this.data.cxPropId);//no i18n
				check = check == false ? false : true;
			}
			if(check){
				this.$node.querySelector('lyte-popover').ltProp('show',false);//no i18n
			}
		},
		openPalette : function(node){
			if(this.data.cxPaletteOpen){
				setTimeout(function(){
					this.$node.querySelector('lyte-popover').ltProp('show',false);//no i18n
				}.bind(this),10);
			}
			var check = true;
			if(this.getMethods('onBeforeColorPalleteOpen')){
				check = this.executeMethod('onBeforeColorPalleteOpen',this.data.cxPropId);//no i18n
			}
			if(check){
				if(this.data.cxPropShowText){
					if(this.data.cxPropSelectedColor != "noFill"){
						this.setData({"bgColor" : this.getRgbFromHex(this.data.cxPropSelectedColor), clr : this.getPicklistFontColor(this.data.cxPropSelectedColor)})//NO I18n
					}
					else{
						this.setData({bgColor : "transparent", clr : "black"})//no i18n
					}
				}
				this.$node.querySelector('lyte-popover').ltProp('show',true);//no i18n
				node.classList.add('cxPalleteOpened'); //no i18n
				this.setData('cxPaletteOpen',true);//no i18n
				this.setData("showColorPicker", false);//no i18n
				if(this.getMethods('onColorPaletteOpen')){
					this.executeMethod('onColorPaletteOpen',this.data.cxPropId);//no i18n
				}
				this.highlightSelectedColor();
				this.setData("cxPropShow", true)//No I18n
			}
		},
		showColorpicker : function(){
			var selectedColor;
			if(this.data.cxPropSelected == "noFill" || !this.data.cxPropSelectedColor){
				selectedColor = "#ffffff"; //no i18n
			}
			else{
				selectedColor = this.data.cxPropSelectedColor;
			}
			this.setData("boardColor", this.getHexFromRgb(selectedColor)); //no i18n
			this.setData("showColorPicker", true) //no i18n
			this.tempColor = this.data.cxPropSelectedColor;
		},
		setCustomcolor : function(){
			if(this.getMethods('onSelectColor')){
				this.executeMethod('onSelectColor',this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
			}
			this.setData("cxPropSelectedColor", this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
			if(this.tempColor != "noFill" && this.data.cxPropAddCustomColorsToPalette && this.customColorLen < 10 && this.data.defaultColors.indexOf(this.tempColor.hex ? this.tempColor.hex : this.tempColor) == -1){
				Lyte.arrayUtils(this.data.defaultColors, "push", this.tempColor.hex ? this.tempColor.hex : this.tempColor);//no i18n
				this.customColorLen++;
			}
			this.setData('cxPaletteOpen', false);//no i18n
			this.setData("cxPropShow", false);//NO I18n
			setTimeout(function(){
				this.setData("showColorPicker", false);//no i18n
			}.bind(this),10)
		},
		showPredefinedColors : function(){
			this.setData("showColorPicker", false);//NO I18n
			this.executeMethod("colorChanged", undefined, this.data.cxPropSelectedColor);//NO I18n
			this.highlightSelectedColor();
			// this.setData('cxPaletteOpen',false);//no i18n
		}
	},
	methods : {
		popoverClose : function(event,popoverElement){
			var node = this.$node.querySelector('.cxPalleteOpened'); //no i18n
			node && node.classList.remove('cxPalleteOpened'); //no i18n
			popoverElement.setData('ltPropBindToBody',false)
			this.setData('cxPaletteOpen',false);//no i18n
			if(this.getMethods('onColorPaletteHide')){
				this.executeMethod('onColorPaletteHide',this.data.cxPropId,event);//no i18n
			}
		},
		popoverBeforeClose : function(event){
			if(this.getMethods('onBeforeColorPaletteHide')){
				return this.executeMethod('onBeforeColorPaletteHide',this.data.cxPropId,event);//no i18n
			}
		},
		addQA: function () {
			const popover = this.$node.querySelector("lyte-popover");
			if (popover && popover.component && popover.component.childComp) {
				const child = popover.component.childComp;
				const inputShowValue = child.querySelector("#lyteCPShowValue input"); //eslint-disable-line @zoho/webperf/no-complex-selector
				const inputAlpha = child.querySelector("#lyteCP__A input"); //eslint-disable-line @zoho/webperf/no-complex-selector
				const previewDiv = child.querySelector(".previewDiv");

				if (inputShowValue) {
					inputShowValue.setAttribute('data-zcqa', 'cp_hashcode');
				}
				if (inputAlpha) {
					inputAlpha.setAttribute('data-zcqa', 'cp_alpha');
				}
				if (previewDiv) {
					previewDiv.setAttribute('data-zcqa', 'cp_preview');
				}
			}
		},
		colorChanged : function(ev, color){
			this.setData({"bgColor" : this.getRgbFromHex(color.hex ? color.hex : color), clr : this.getPicklistFontColor(color.hex ? color.hex : color)})//NO I18n
			this.tempColor = color;
		}
	},
	getPicklistFontColor : function(colourCode){
		return Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(colourCode);
		// if(colourCode && colourCode !== "" && colourCode.indexOf("#") === 0){
		// 	colourCode = colourCode.substring(1);
		// 	var c_r = parseInt(colourCode.substr(0, 2), 16);
		// 	var c_g = parseInt(colourCode.substr(2, 2), 16);
		// 	var c_b = parseInt(colourCode.substr(4, 2), 16);
		// 	var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
		// 	if(brightness < 175){
		// 		return "white"; //NO I18N
		// 	}
		// }
		// return "black"; //NO I18N
	},
	highlightSelectedColor : function(){
		var fontColor = this.getPicklistFontColor(this.data.cxPropSelectedColor);
		if(fontColor === "var(--crux-tag-dark-color)"){
			$L(".cxPaletteWrapper .cxPaletteSelected").addClass("cxColorPaletteSelDarkIcon");//NO I18N
		}
		else{
			$L(".cxPaletteWrapper .cxPaletteSelected").removeClass("cxColorPaletteSelDarkIcon");	//NO I18N
		}
	},
	getRgbFromHex : function(e){
		if(e == "noFill"){
			return "transparent";//No I18n
		}
		null == e && (e = "ffffff");//no i18n
	    var t = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
	    return t && 4 === t.length ? ("0" + parseInt(t[1], 10).toString(16)).slice(-2) + ("0" + parseInt(t[2], 10).toString(16)).slice(-2) + ("0" + parseInt(t[3], 10).toString(16)).slice(-2) : e
	},
	getHexFromRgb : function(rgb)
	{
		if(rgb == "noFill"){
			return "#ffffff";
		}
		if (rgb === undefined) {
		    return undefined;
		}
		if (rgb.startsWith("rgba")) {
		    return Events.rgbatohexa(rgb);
		} else {
		    if (rgb.search("rgb") === -1) {
		        return rgb;
		    } else {
		        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		        function hex(x) {
		            return ("0" + parseInt(x).toString(16)).slice(-2);
		        }
		        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		    }
		}
	}
});
