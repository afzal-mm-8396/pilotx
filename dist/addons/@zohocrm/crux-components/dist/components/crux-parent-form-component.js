Lyte.Component.register("crux-parent-form-component", {
_template:"<template tag-name=\"crux-parent-form-component\"> <lyte-yield yield-name=\"cruxParentFormComponent\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["widthData","labelElmArr","labelElmTextArr","labelElmIconArr","cxPropLabelWidth"],
_observedAttributesType :["array","array","array","array","string"],
 //no i18n
	data : function(){
		return {
			widthData : Lyte.attr('array',{default:[]}),//no i18n
			labelElmArr : Lyte.attr('array',{default:[]}),//no i18n
			labelElmTextArr : Lyte.attr('array',{default:[]}),//no i18n
			labelElmIconArr : Lyte.attr('array',{default:[]}),//no i18n
			cxPropLabelWidth: Lyte.attr('string') //no i18n
		}
	},
	didConnect : function(){
		_cruxUtils.addMurhyInfo("crux-parent-form-component.js", "Feb Default Changes");
		this.updateFormLabelWidth();
	},
	createSpanElement: function(data){
		const fontType = typeof(data) === "object" && data.fontType;
		let fontSizeType = "cxRegularFont";
		fontSizeType = typeof(data) === "object" && data.fontSizeType ? data.fontSizeType : "cxBaseFontSize";
		const fontFamilyTypes = {
			"cxBoldFont" : "--crux-bold-font"
		};
		const fontSizeTypes = {
			"cxBaseFontSize": "--crux-base-font-size",
			"cxMediumFontSize" : "--crux-medium-font-size"
		};
		var rootElementStyle = getComputedStyle(document.querySelector(':root'));
		var canvasElem = document.createElement("canvas");
		var canvasElemCxt = canvasElem.getContext("2d");//no i18n
		const fontSize = fontSizeTypes[fontSizeType]  ?  rootElementStyle.getPropertyValue(fontSizeTypes[fontSizeType]) : "1.4rem";
		const fontFamily = fontFamilyTypes[fontType] ? rootElementStyle.getPropertyValue(fontFamilyTypes[fontType]) : rootElementStyle.getPropertyValue('--crux-primary-font');
		canvasElemCxt.font = `${fontSize} ${fontFamily}`;
		_cruxUtils.addMurhyInfo("crux-parent-form-component.js", "Feb Default Changes");
		return canvasElemCxt;
	},
	removeSpanElement: function(spanElm){
		spanElm.canvas.remove();
	},

	updateFormLabelWidth : function(){
		var currentForm = this.$node;
		var _this = this;

		var currentFormRows = $L(currentForm).find(".crmFormComponentRow, .cruxFormComponentRow");
		if(_this.data.cxPropLabelWidth){
			const labelWidth = parseInt(_this.data.cxPropLabelWidth)
			currentFormRows.find(".lyteLabel,.cxElementLabel").css({"width": labelWidth + "px","max-width":"initial"});
			var currentFormWidth = labelWidth + 395;	//375 + 5
			$L(currentForm).css({minWidth: currentFormWidth+"px", display: 'block'});	//no i18n
		}else{
			this.setData({'widthData':[]}); //no i18n
			var widthData = this.getData('widthData'); //no i18n

			var spanElm = this.createSpanElement();
			var labelArr = [], labelIconArr = [], labelTextArr = [];
			currentFormRows.each(function(i, elm){
				var lyteLabel = $L(elm).find(".lyteLabel, .cxElementLabel");
				if(lyteLabel.length === 0){
					return;
				}
				labelArr.push(lyteLabel);

				var cxInfoIconWt = 0;
				if(lyteLabel.find(".cxInfoIcon").length > 0){
					lyteLabel.addClass('cxElemLabelWithIcon');
					cxInfoIconWt = 20;
				}
				labelIconArr.push(cxInfoIconWt);
				// labelTextArr.push(lyteLabel.html());
				labelTextArr.push(lyteLabel.text()); /* When Info icon is added in label, html() takes whole html of icon. so changed to text */
				})
			this.setData("labelElmArr", labelArr);
			this.setData("labelElmIconArr", labelIconArr);
			this.setData("labelElmTextArr", labelTextArr);
			currentFormRows.each(function(i, elm){
				if(labelTextArr[i]){
					let spanElement = spanElm;
					const customSpanElem = _this.getCustomSpanElem(labelArr[i]);
					if(customSpanElem){
						spanElement = customSpanElem;
					}
					var textWidth = Math.ceil(spanElement.measureText(labelTextArr[i]).width) + 18 + labelIconArr[i];
					widthData[widthData.length] = textWidth;
					_this.setData('widthData',widthData);	//no i18n
				}
			});
			if(widthData.length > 0){
				var maxWidth = Math.max.apply(null, widthData);
				if(maxWidth > 200){
					maxWidth = 200;
				}
				$(currentFormRows).find(">.lyteLabel,>.cxElementLabel").css({"width": maxWidth + "px"});	//eslint-disable-line zstandard/no-jQuery-casting
				var currentFormWidth = maxWidth + 395;	//375 + 5
				$L(currentForm).css({minWidth: currentFormWidth+"px", display: 'block'});	//no i18n
				if(this.getMethods("onFormShow")){
					this.executeMethod("onFormShow",this,maxWidth,currentFormWidth);
				}
			}
			this.removeSpanElement(spanElm);
		}
	},
	labelWidthObserver:function(){
		this.updateFormLabelWidth();
	}.observes('cxPropLabelWidth'),
	getCustomSpanElem:function(labelArr){
		const labelClasses = labelArr[0].classList;
		const spanParam = {
			fontSizeType:"",
			fontType:""
		};
		switch (true) {
			case labelClasses.contains('cxBoldFont'):
				spanParam.fontType = "cxBoldFont";
				break;
			default:
				break;
		}
		switch (true) {
			case labelClasses.contains('cxMediumFontSize'):
				spanParam.fontSizeType = "cxMediumFontSize";
				break;
			default:
				break;
		}
		if(spanParam.fontSizeType || spanParam.fontType){
			return this.createSpanElement(spanParam);
		}
		// else{
		// 	return false
		// }
	}
});
