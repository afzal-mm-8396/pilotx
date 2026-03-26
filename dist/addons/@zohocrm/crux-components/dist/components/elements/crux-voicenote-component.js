/**
 * @component crux-voicenote-component
 * @author rafik.shaik
 * @version 1.0.0
 * @summary *This component used to render the voicenote component in view case and input component in create case. 
 */
Lyte.Component.register("crux-voicenote-component", {
_template:"<template tag-name=\"crux-voicenote-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"create\"> <div> <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-type=\"text\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-disabled=\"{{cxPropInputDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" on-value-change=\"{{method('onInputValueChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-width=\"{{cxPropWidth}}\" class=\"w100per\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"></lyte-input> </div> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-voicenote-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </template><template case=\"view\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropValue,'!=',undefined),'&amp;&amp;',expHandlers(cxPropValue,'!=',&quot;&quot;))}}\"><template case=\"true\"> <lyte-voicenote lt-prop-prefetch-options=\"{{cxPropPrefetchOptions}}\" lt-prop-preload=\"none\" lt-prop-prefetch=\"{{cxPropPrefetch}}\" lt-prop-vol-ctrl-enabled=\"{{cxPropVolCtrlEnabled}}\" lt-prop-src=\"{{cxPropSrc}}\" lt-prop-popover=\"{&quot;freeze&quot;:false,&quot;showCloseButton&quot;:false,&quot;wrapperClass&quot;:&quot;callsCustomVolumeSlider&quot;}\" on-error=\"{{method(&quot;onVoiceNoteError&quot;)}}\" on-prefetch-error=\"{{method('onVoiceNoteError')}}\" lt-prop-playback-rate=\"0\" class=\"{{if(ifEquals(cxPropDisabled,true),'cxVoiceNoteDisabled')}}\" on-prefetch-success=\"{{method(&quot;onVoiceNoteSuccess&quot;)}}\" style=\"{{if(cxPropWidth,concat('width: ',cxPropWidth),'')}}\"></lyte-voicenote> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\"> {{cxPropEmptyValue}} </template></template></template></template> <template is=\"if\" value=\"{{isLoadingError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropLoadingError}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropLoadingError}}\"></lyte-yield></template> </crux-error-message> </template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"create":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropWidth",{"type":"helper","value":{"name":"concat","args":["'width: '","cxPropWidth"]}},"''"]}}}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropFrom","lyteViewPort","cxPropPrefetch","cxPropSrc","cxPropVolCtrlEnabled","cxPropValue","cxPropShowWarning","cxPropWarningIconClass","cxPropWarningMessage","isError","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropErrorSpanClass","cxPropPrefetchOptions","cxPropPreventFocusOnError","cxPropId","cxPropName","cxPropTooltipConfig","cxPropInputClass","cxPropDirection","cxPropPlaceholder","cxPropDisabled","cxPropReadonly","cxPropClearErrorMessage","cxPropAppearance","cxPropZcqa","cxPropTabindex","cxPropTabIndex","cxPropAutofocus","cxPropAutocomplete","cxPropEnableLbind","cxPropTooltipClass","cxPropWrapperClass","cxPropField","cxPropMandatory","cxPropWidth","cxPropInputDisabled","isLoadingError","cxPropLoadingError","cxPropEmptyValue","cxPropUpdateDelay","cxPropCallbackDelay","cxPropPlayButZcqa","cxPropVoiceCtrlZcqa","cxPropDataTabindex","cxPropAria","cxPropAriaAttributes","cxPropAriaErrorProperties","ariaAttributes"],
_observedAttributesType :["object","object","string","boolean","boolean","array","boolean","string","boolean","string","string","boolean","string","boolean","string","string","string","string","object","boolean","string","string","string","string","string","string","boolean","boolean","boolean","string","string","string","string","boolean","string","boolean","string","string","object","boolean","string","boolean","boolean","string","string","number","number","string","string","string","boolean","object","object","object"],

	data : function(){
		return {
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property used to send multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @version 1.0.0
			 */
			cxPropFrom:Lyte.attr("string",{default:"view"}),
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			cxPropPrefetch:Lyte.attr("boolean",{default:false}),
			cxPropSrc:Lyte.attr("array"),
			/**
			 * @componentProperty { boolean } cxPropVolCtrlEnabled=false
			 * @version 1.0.0
			 */
			cxPropVolCtrlEnabled:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { string } cxPropValue
			 * @version 1.0.0
			 */
			cxPropValue:Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @version 1.0.0
			 */
			cxPropShowWarning:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @version 1.0.0
			 */
			cxPropWarningIconClass:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropWarningMessage
			 * @version 1.0.0
			 */
			cxPropWarningMessage:Lyte.attr("string",{default:""}),
			isError : Lyte.attr("boolean", {default : false}),//NO i18n
			/**
			 * @componentProperty { string } cxPropErrorMessage
			 * @version 1.0.0
			 */
			cxPropErrorMessage:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @version 1.0.0
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @version 1.0.0
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorClass
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropPrefetchOptions
			 * @version 1.0.0
			 */
			cxPropPrefetchOptions:Lyte.attr("object"),
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @version 1.0.0
			 */
			cxPropPreventFocusOnError:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { string } cxPropId
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { string } cxPropName
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropInputClass
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default :""}),//no i18n
			/**
			 * @componentProperty { string } cxPropDirection
			 * @version 1.0.0
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * @componentProperty { string } cxPropPlaceholder
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @version 1.0.0
			 */
			cxPropDisabled : Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @version 1.0.0
			 */
			cxPropReadonly : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @version 1.0.0
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropAppearance
			 * @version 1.0.0
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @version 1.0.0
			 */
			cxPropTabindex : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @version 1.0.0
			 */
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * @componentProperty { string } cxPropAutocomplete
			 * @version 1.0.0
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//NO I18n
			/**
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @version 1.0.0
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropWrapperClass
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @version 1.0.0
			 */
			cxPropField:Lyte.attr("object"),
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { string } cxPropWidth
			 * @version 1.0.0
			 */
			cxPropWidth:Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropInputDisabled=false
			 * @version 1.0.0
			 */
			cxPropInputDisabled:Lyte.attr("boolean",{default:false}),
			isLoadingError:Lyte.attr("boolean",{default:false}),
			cxPropLoadingError:Lyte.attr("string",{default:""}),
			cxPropEmptyValue:Lyte.attr("string",{default:""}),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			cxPropPlayButZcqa:Lyte.attr("string",{default:""}),
			cxPropVoiceCtrlZcqa:Lyte.attr("string",{default:""}),

			/*aria specific properties start*/
			/**
			 * To set data-tabindex attribute to input
			 * @componentProperty { string } cxPropDataTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			/**
			 * To set custom attributes to input/textarea.
			 * @componentProperty { boolean } cxPropAria
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @default false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set aria attributes to input
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			ariaAttributes : Lyte.attr('object', {default : {}})
			/*aria specific properties end*/
		}		
	},
	init:function(){
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		onVoiceNoteError:function(e,ele){
			if(this.getMethods('onPrefetchError')){
				/**
				 * executed on invalide url provided to voicenote componnet
				 * @method onPrefetchError
				 * @author rafik.shaik
				 * @version 1.0.0
				 */
				this.executeMethod('onPrefetchError',e,ele)
			}else{
				this.setData("cxPropLoadingError",_cruxUtils.getI18n("crm.view.calls.recording.err.msg"));
			}
		},
		onVoiceNoteSuccess:function(url,ele){
			if(this.getMethods('onPrefetchSuccess')){
				/**
				 * executed on success of voicenote component
				 * @method onPrefetchSuccess
				 * @author rafik.shaik
				 * @version 1.0.0
				 */
				this.executeMethod('onPrefetchSuccess',url,ele);
			}else{
				this.setData("cxPropLoadingError","");
			}
		},
		onInputValueChange:function(){
			// if(this.getData("cxPropClearErrorMessage")){
			// 	this.setData("cxPropErrorMessage", "");//No I18n
			// }
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
			}
		}
	},
	getValue:function(){
			/**
		* This util will be called to get the value of voicenote component.
    	* @utility getValue
    	* @version 1.0.0
   		*/ 
			return this.data.cxPropValue;
	},
	validate:function(){
		/**
		* this util will be called for validation of voicenote component.
    	* @utility validate
    	* @version 1.0.0
   		*/   
		var value=this.data.cxPropValue;
		var field=this.data.cxPropField
		if(!value || !value.trim()){
			if(!this.validateMandatory(true)){
				if(!this.data.cxPropPreventFocusOnError){
					this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
				}
				return false;
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
		var check = this.isValidWebUrl(value);//No I18n
		if(!check){
			if(this.getMethods("onError")){
				this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
			}
			else{
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			!this.data.cxPropPreventFocusOnError && this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
		}
		else{
			this.setData("cxPropErrorMessage", "");//No I18n
		}
		return check;
	},
	observesView:function(){
		if(this.data.cxPropFrom=='view'){
			var prefetch=false;
			var recording = [];
			var obj= {};
			var src =this.data.cxPropValue;
			if(src && src.indexOf("api.twilio")>0){
				var multiUrls = src.split(",");
				var urlCount = multiUrls.length;
				for(var i=0;i<urlCount;i++){
					obj.src = multiUrls[i];
					obj.type="audio/mpeg";
					recording[i]=obj;
				}
			}else if(src){
				if(typeof pbdomain != "undefined" && src.startsWith(pbdomain)){
					prefetch = true;
					if(typeof Crm !== "undefined" && Crm.iamCrossOrgParams){
						src = src+(src.includes('?') ? Crm.iamCrossOrgParams : '?'+Crm.iamCrossOrgParams.slice(1));
					}
				}
				if(src.toLowerCase().indexOf("http")!==0){
					src = "http"+"://"+src; 
				}
				obj.src = src;
				obj.type="audio/mpeg";
				recording[0]=obj;
			}
			if(recording){
				var copyrecording = Lyte.deepCopyObject(recording);
				this.setData("cxPropSrc",copyrecording);
				this.setData("cxPropPrefetch", prefetch); 
				if(prefetch){
					this.setData('cxPropPrefetchOptions',{method:'GET',mode:'cors',credentials:'include'});
				}
			}
			if(this.data.cxPropLoadingError){
				this.setData("cxPropDisabled",true);
			}else{
				this.setData("cxPropLoadingError","")
				this.setData("cxPropDisabled",false);
			}
		}else{
			this.setFocusUtil();
		}
	}.observes('cxPropFrom', 'cxPropValue').on('init'),
	observeDidConnect:function(){
		var play_btn=this.$node.querySelector(".lyteVoiceNotePausePlayIcon");
		var volume_btn=this.$node.querySelector(".lyteVoiceNoteVolumeControl");
		if(play_btn && volume_btn){
			play_btn.setAttribute("data-zcqa",this.data.cxPropPlayButZcqa);
			volume_btn.setAttribute("data-zcqa",this.data.cxPropVoiceCtrlZcqa);
		}
	}.observes("cxPropFrom","lyteViewPort").on("didConnect"),
	observeMandatory : function(){
		if(this.data.cxPropFrom=="create"){
			this.observeMandatoryMixin("lyte-input");//No I18n
		}
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom").on("didConnect"),//No I18n
	observeIsError : function(){
		if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-input")){
			if(this.getData("isError")){
				this.$node.querySelector("lyte-input").classList.add("cxErrorBox");//No I18n
			}
			else{
				this.$node.querySelector("lyte-input").classList.remove("cxErrorBox");//No I18n
			}
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage","lyteViewPort").on("init"),//No I18n
	observeLoadingError : function(){
		this.setData("isLoadingError", this.getData("cxPropLoadingError") == "" ? false : true);//No I18n
	}.observes("cxPropLoadingError").on("init"),//No I18n
	ariaSetAttributes : function(){
		if(this.data.cxPropAria){
			if(this.data.cxPropFrom === 'view'){
				this.ariaSetForView();
			}else{
				var ariaAttr = this.ariaGetMergedAttributes();

				if(ariaAttr && this.data.cxPropFrom === 'create' && this.data.cxPropField && this.data.cxPropFieldKey && this.data.cxPropField[this.data.cxPropFieldKey] && !(ariaAttr.cxAriaAttributes && (ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby']))){
					if (ariaAttr && !ariaAttr.cxAriaAttributes) {
						ariaAttr.cxAriaAttributes = {};
					}
					ariaAttr.cxAriaAttributes['aria-label'] = this.data.cxPropField[this.data.cxPropFieldKey];
				}

				this.setData('ariaAttributes', ariaAttr);
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropAriaErrorProperties').on('didConnect')
},{mixins : ["crux-element-validation"]});
/**
 * @syntax nonYielded
 <crux-voicenote-component  cx-prop-value='https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'></crux-voicenote-component>
 */
