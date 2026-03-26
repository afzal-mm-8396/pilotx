// $Id$
/**
 * @component crux-form-component
 * @author naveen.winson
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-form-component", {
_template:"<template tag-name=\"crux-form-component\"> <lyte-yield yield-name=\"cruxFormComponent\" class=\"cruxFormComponent\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["widthData","labelElmArr","labelElmTextArr","labelElmIconArr","cxPropLabelWidth"],
_observedAttributesType :["array","array","array","array","string"],
 //no i18n
	data : function(){
		return {
			/**
			 * @componentProperty {array} widthData
			 * @default []
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			widthData : Lyte.attr('array',{default:[]}),//no i18n
			/**
			 * @componentProperty {array} labelElmArr
			 * @default []
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			labelElmArr : Lyte.attr('array',{default:[]}),//no i18n
			/**
			 * @componentProperty {array} labelElmTextArr
			 * @default []
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			labelElmTextArr : Lyte.attr('array',{default:[]}),//no i18n
			/**
			 * @componentProperty {array} labelElmIconArr
			 * @default []
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			labelElmIconArr : Lyte.attr('array',{default:[]}),//no i18n
			/**
			 * @componentProperty {string} cxPropLabelWidth=''
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropLabelWidth: Lyte.attr('string',{default:''}) //no i18n
		}
	},
	didConnect : function(){
		var rootElementStyle = getComputedStyle(document.querySelector(':root'));
		this.primaryFont = rootElementStyle.getPropertyValue('--crux-primary-font');
		this.updateFormLabelWidth();
		_cruxUtils.addMurhyInfo("crux-form-component.js", "Feb Default Changes");
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
		_cruxUtils.addMurhyInfo("crux-form-component.js", "Feb Default Changes");

		return canvasElemCxt;
	},
	removeSpanElement: function(spanElm){
		spanElm.canvas.remove();
	},
	updateFormLabelWidth: function(){
		var currentForm = this.$node;
		var _this = this;
		// var currentFooterYeild = $L('.cxFormFieldFooterYield', currentForm);
		if(_this.data.cxPropLabelWidth){
			const labelWidth = parseInt(_this.data.cxPropLabelWidth)
			var currentFormRows = $L(currentForm).find(".crmFormComponentRow, .cruxFormComponentRow");
			currentFormRows.find(".lyteLabel,.cxElementLabel").css({"width": labelWidth + "px","max-width":"initial"});
			var currentFormWidth = labelWidth + 395;	//375 + 5
			$L(currentForm).css({minWidth: currentFormWidth+"px", display: 'block'});	//no i18n
			// currentFooterYeild.css({paddingLeft: currentFormWidth+"px"});	//no i18n
			
		}else{
			var hasParentElement = currentForm.closest("crux-parent-form-component") ? true : false;//no i18n

			if(!hasParentElement){
				var currentFormRows = $L(currentForm).find(".crmFormComponentRow, .cruxFormComponentRow");
				this.setData({'widthData':[]}); //no i18n
				var widthData = this.getData('widthData'); //no i18n

				var spanElm = this.createSpanElement();
				if(widthData.length === 0){
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
						labelTextArr.push(lyteLabel.text());
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
							if(textWidth){
								widthData[widthData.length] = textWidth;
								_this.setData('widthData',widthData);	//no i18n						
							}
						}
					});
				}
				if(widthData.length > 0){
					var maxWidth = Math.max.apply(null, widthData);
					if(maxWidth > 200){
						maxWidth = 200;
					}
					$(currentFormRows).find(">.lyteLabel,>.cxElementLabel").css({"width": maxWidth + "px"});	//eslint-disable-line zstandard/no-jQuery-casting
					var currentFormWidth = maxWidth + 395;	//375 + 5
					$L(currentForm).css({minWidth: currentFormWidth+"px", display: 'block'});	//no i18n
					// currentFooterYeild.css({paddingLeft: currentFormWidth+"px"});	//no i18n
					if(this.getMethods("onFormShow")){
						/**
						 * @method onFormShow
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } this
						 * @param { * } maxWidth
						 * @param { * } currentFormWidth
						 */
						this.executeMethod("onFormShow",this,maxWidth,currentFormWidth);
					}
				}
				this.removeSpanElement(spanElm);
			}
		}
	},
	labelWidthObserver:function(){
		this.updateFormLabelWidth();
	}.observes('cxPropLabelWidth'),
	getCustomSpanElem:function(labelArr){
		if(!labelArr || !labelArr[0]){
			return false;
		}
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
	},
	getMaxLabelWidth:function(labelArr){
		if(labelArr && Array.isArray(labelArr) && labelArr.length > 0){
		_cruxUtils.addMurhyInfo("crux-form-component.js", "Feb Default Changes");
			const spanElm = this.createSpanElement();
			const widthData = [];
			labelArr.forEach((labelText)=>{
				widthData.push(Math.ceil(spanElm.measureText(labelText).width) + 18);
			})
			let maxWidth = Math.max.apply(null, widthData);
			if(maxWidth > 200){
				maxWidth = 200;
			}
			return maxWidth;
		}
	}
});
