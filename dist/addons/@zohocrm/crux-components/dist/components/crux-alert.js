/**
 * @component crux-alert
 * @author authorName
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */ 
Lyte.Component.register("crux-alert", {
_template:"<template tag-name=\"crux-alert\"> {{addMurhyInfo(\"crux-alert.html\",\"Feb Default Changes\")}} <lyte-alert on-show=\"{{method('setOnShow')}}\" on-close=\"{{method('setOnClose')}}\" on-accept=\"{{method('setOnAccept')}}\" on-reject=\"{{method('setOnReject')}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-allow-multiple=\"{{cxPropAllowMultiple}}\" lt-prop-top=\"{{cxPropTop}}\" lt-prop-buttons=\"{{cxPropButtons}}\" lt-prop-button-position=\"{{cxPropButtonPosition}}\" lt-prop-show-close-button=\"{{cxPropShowCloseButton}}\" lt-prop-close-on-escape=\"{{cxPropCloseOnEscape}}\" lt-prop-dimmer=\"{{cxPropDimmer}}\" lt-prop-yield=\"true\" lt-prop-animation=\"{{cxPropAnimation}}\" lt-prop-content-align=\"{{cxPropContentAlign}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-prevent-focus=\"{{cxPropPreventFocus}}\" lt-prop-aria-attributes=\"{{ariaAttributes.cxAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"alert\"> <div data-zcqa=\"cxAlertContainerZcqa\" class=\"cxAlertContainer\"> <template is=\"if\" value=\"{{cxPropHeading}}\"><template case=\"true\"> <lyte-alert-header> <div id=\"cxAriaHeaderLabel\" class=\"alertContent\"> <template is=\"if\" value=\"{{cxPropType}}\"><template case=\"true\"> <div class=\"alertContentMiddle\"> <span class=\"{{cxPropClass}}\"></span> </div> </template></template> <div class=\"alertContentMiddle\"> <span class=\"alertHeader\" data-zcqa=\"{{cxPropHeadingMessageZcqa}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropYield,'!'),'&amp;&amp;',expHandlers(cxPropHeadingMessageMarkdown,'!'))}}\"><template case=\"true\"> {{cxPropHeading}} </template><template case=\"false\"> {{unescape(headingMessage)}} </template></template> </span> </div> </div> </lyte-alert-header> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropPrimaryMessage,'||',cxPropSecondaryMessage)}}\"><template case=\"true\"> <lyte-alert-content> <div class=\"alertContent\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'&amp;&amp;',expHandlers(cxPropHeading,'!')),'&amp;&amp;',cxPropPrimaryMessage)}}\"><template case=\"true\"> <div class=\"alertContentMiddle\"> <span class=\"{{cxPropClass}}\"></span> </div> </template></template> <template is=\"if\" value=\"{{cxPropPrimaryMessage}}\"><template case=\"true\"> <span id=\"cxAriaPrimaryMsgDesc\" class=\"alertPrimaryMsg\" data-zcqa=\"{{cxPropPrimaryMessageZcqa}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropYield,'!'),'&amp;&amp;',expHandlers(cxPropPrimaryMessageMarkdown,'!'))}}\"><template case=\"true\"> {{cxPropPrimaryMessage}} </template><template case=\"false\"> {{unescape(primaryMessage)}} </template></template> </span> </template></template> </div> <template is=\"if\" value=\"{{cxPropSecondaryMessage}}\"><template case=\"true\"> <span id=\"cxAriaSecondaryMsgDesc\" class=\"alertSecondaryMsg\" data-zcqa=\"{{cxPropSecondayMessageZcqa}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropYield,'!'),'&amp;&amp;',expHandlers(cxPropSecondaryMessageMarkdown,'!'))}}\"><template case=\"true\"> {{cxPropSecondaryMessage}} </template><template case=\"false\"> {{unescape(secondaryMessage)}} </template></template> </span> </template></template> </lyte-alert-content> </template></template> <lyte-alert-footer> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cx-alert-footer\"></lyte-yield> </template><template case=\"false\"> <div class=\"alertFooter {{cxPropButtonPosition}}\"> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"item\" index=\"index\"> <lyte-button lt-prop-type=\"{{item.type}}\" lt-prop-appearance=\"{{item.appearance}}\" onclick=\"{{action('alertButtonClick',item.type,item.text)}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-button=\"{{item.ariaButton}}\" lt-prop-title=\"{{item.tooltip}}\" lt-prop-disabled=\"{{item.disabled}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{item.text}} </template> </lyte-button> </template> </div> </template></template> </lyte-alert-footer> </div> </template> </lyte-alert> </template>",
_dynamicNodes : [{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,1,1]},{"type":"if","position":[1,1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropShow","cxPropPrimaryMessage","cxPropHeading","cxPropSecondaryMessage","cxPropType","cxPropClass","cxPropWrapperClass","cxPropAllowMultiple","cxPropTop","cxPropButtons","cxPropButtonPosition","cxPropShowCloseButton","cxPropCloseOnEscape","cxPropDimmer","cxPropYield","cxPropAnimation","cxPropContentAlign","cxPropPreventFocus","cxAlertHeader","cxAlertContent","cxPropHeadingMessageMarkdown","cxPropPrimaryMessageMarkdown","cxPropSecondaryMessageMarkdown","cxPropHeadingMessageZcqa","cxPropPrimaryMessageZcqa","cxPropSecondayMessageZcqa","cxPropFooterYield","cxPropUtilAlert","cxPropAria","cxPropAriaAttributes","ariaAttributes","headingMessage","primaryMessage","secondaryMessage","cxPropScrollableAlert"],
_observedAttributesType :["boolean","string","string","string","string","string","string","string","string","array","string","boolean","boolean","object","boolean","string","string","boolean","string","string","boolean","boolean","boolean","string","string","string","boolean","boolean","boolean","object","object","string","string","string","boolean"],

	data : function(){
		return {
			/**
			 * Set this property to true to show the alert, false to hide
			 * @componentProperty { boolean } cxPropShow=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShow : Lyte.attr("boolean", {default : false}),
			/**
			 * Text to be rendered as primary message of the alert.
			 * @componentProperty { string } cxPropPrimaryMessage
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropPrimaryMessage : Lyte.attr("string") ,
			/**
			 * Text to be rendered as heading of the alert.
			 * @componentProperty { string } cxPropHeading
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropHeading : Lyte.attr("string"),
			/**
			 * Text to be rendered as secondary message of the alert
			 * @componentProperty { string } cxPropSecondaryMessage
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropSecondaryMessage : Lyte.attr("string"), 
			/**
			 * This specifies the type of the alert
			 * @componentProperty { string } cxPropType
			 * @author authorName
			 * @version 1.0.0
			 * @options ['success', 'error', 'warning', 'info', 'confirm']
			 */
			cxPropType : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropClass
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropClass: Lyte.attr("string"),
			/**
			 * This property sets given class to wrapper div of alert. This helps you to identify your alert and also to make specific style changes to it.
			 * @componentProperty { string } cxPropWrapperClass
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue cxAlertWrapper
			 */
			cxPropWrapperClass : Lyte.attr("string",{default:"cxAlertWrapper"}),
			/**
			 * This property helps you to open multiple alerts/modals/popovers without closing the current alert.
			 * @componentProperty { string } cxPropAllowMultiple
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAllowMultiple : Lyte.attr("string" , {default : false}),
			/**
			 * This property helps you to set the top property of the alert.
			 * @componentProperty { string } cxPropTop
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue 40px
			 */
			cxPropTop : Lyte.attr("string",{default:"0px"}),
			/**
			 * A JSON array of objects that consists of information of the buttons to be rendered in the alert. The object can consist of all properties supported by lyte-button.
			 * @componentProperty { array } cxPropButtons
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue [{"type" : "accept", "text" : "OK, got it!", "appearance" : "primary"}]
			 */
			cxPropButtons: Lyte.attr("array", { default: [{ "type": "accept", "text": _cruxUtils.getI18n('crm.mb.newversion.msg4'), "appearance": "primary" }] }),
			/**
			 * Position of the buttons
			 * @componentProperty { string } cxPropButtonPosition
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue center
			 * @options ["left", "right", "center"]
			 */
			cxPropButtonPosition : Lyte.attr("string" , {default : 'center'} ) ,
			/**
			 * Set this property to true to show close button of the alert.
			 * @componentProperty { boolean } cxPropShowCloseButton=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowCloseButton : Lyte.attr("boolean" , {default : false} ),
			/**
			 * Set this property to false to prevent close of alert on escape keypress.
			 * @componentProperty { boolean } cxPropCloseOnEscape=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropCloseOnEscape : Lyte.attr("boolean" , {default : true} ),
			/**
			 * This property helps you to set the dimmer color and opacity.
			 * @componentProperty { object } cxPropDimmer
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue {"color" : "black", "opacity" : "0.4"}
			 */
			cxPropDimmer : Lyte.attr("object" , {default : { color:'black', opacity:'0.4'} } ),
			/**
			 * Set this property to true to provide the content of the alert using yield.
			 * @componentProperty { boolean } cxPropYield=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropYield : Lyte.attr("boolean" , {default : false}),
			/**
			 * Sets the animation for the alert which will be shown while the alert opens.
			 * @componentProperty { string } cxPropAnimation
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue slideDown
			 * @options ["slideDown", "zoomIn"]
			 */
			cxPropAnimation : Lyte.attr("string" , {default : 'slideDown'} ),
			/**
			 * Set this property to align the content of the alert
			 * @componentProperty { string } cxPropContentAlign
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue left
			 * @options ["left", "center"]
			 */
			cxPropContentAlign : Lyte.attr("string" , {default : 'left'} ),
			/**
			 * If set to true, it will prevent initial focus on elements inside the alert. It is useful in those scenarios where any element rendered inside the alert has ltPropAutoFocus as true.
			 * @componentProperty { boolean } cxPropPreventFocus=false
			 * @author authorName
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropPreventFocus : Lyte.attr("boolean" , {default : false} ),
			/**
			 * @componentProperty { string } cxAlertHeader
			 * @author authorName
			 * @version 1.0.0
			 * @internal
			 */
			cxAlertHeader : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxAlertContent
			 * @author authorName
			 * @version 1.0.0
			 * @internal
			 */
			cxAlertContent: Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropHeadingMessageMarkdown=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropHeadingMessageMarkdown:Lyte.attr("boolean", {default : false}), 
			/**
			 * @componentProperty { boolean } cxPropPrimaryMessageMarkdown=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropPrimaryMessageMarkdown: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropSecondaryMessageMarkdown=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropSecondaryMessageMarkdown: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropHeadingMessageZcqa
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropHeadingMessageZcqa: Lyte.attr('string',{default : 'cxAlertHeadingMessageZcqa'}), //no i18n
			/**
			 * @componentProperty { string } cxPropPrimaryMessageZcqa
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropPrimaryMessageZcqa: Lyte.attr('string',{default : 'cxAlertPrimaryMessageZcqa'}), //no i18n
			/**
			 * @componentProperty { string } cxPropSecondayMessageZcqa
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropSecondayMessageZcqa: Lyte.attr('string',{default : 'cxAlertSecondaryMessageZcqa'}), //no i18n
			/**
			 * @componentProperty { boolean } cxPropFooterYield=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropFooterYield: Lyte.attr('boolean',{default : 'false'}),
			/**
			 * @componentProperty { boolean } cxPropUtilAlert=false
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropUtilAlert: Lyte.attr('boolean',{default: false}),  //to check the alert from util or HTML 

			/* Aria Propperties */
			/**
			 * This is a boolean property that indicates if aria attributes are provided using lt-prop-aria-attributes or not. Setting it to true indicates that some aria attributes are provided and those properties will be added to the alert element.
			 * @componentProperty { boolean } cxPropAria=false
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAria : Lyte.attr("boolean" , {default : false} ),
			/**
			 * This property is used to get the aria properties that will be added to the alert element. For example, if role property is provided, then it is added to the div having class alertPopup. aria-labelledby is added to the header div of the alert and aria-describedby is added to the content div of the alert
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object" , {default : ""} ),
			ariaAttributes : Lyte.attr("object" , {default : ""} ),
			/* Aria Properties End */
			headingMessage : Lyte.attr("string"),
			primaryMessage : Lyte.attr("string"),
			secondaryMessage : Lyte.attr("string"),
			cxPropScrollableAlert : Lyte.attr('boolean',{default : false}) //no i18n
		}		
	},
	didDestroy:function(){
		if(this._alertContent){
			this._alertContent.off("scroll");
			this._alertContent = "";
		}
	},
	cxPropWrapperClassObs : function(){
		if(this.data.cxPropScrollableAlert){
			this.setData('cxPropWrapperClass',this.data.cxPropWrapperClass + ' cxAlertScrollable');
		_cruxUtils.addMurhyInfo("crux-alert.js", "Feb Default Changes");
		}
	}.observes('cxPropWrapperClass').on('init'),
	actions : {
		alertButtonClick: function (type, buttonText) {
			var retVal = true;
			var node=this.data.cxPropUtilAlert? this.$node.querySelector("lyte-alert") : this;
			var methodName="on"+type.charAt(0).toUpperCase() + type.slice(1);
            if (this.getMethods(methodName)) {
                retVal = this.executeMethod(methodName,node,buttonText);
                retVal = retVal == undefined ? true : retVal;
            }
            retVal && this.$node.cxProp("show", false);
        }
	},
	methods : {
		// Functions which can be used as callback in the component.
		setOnShow: function(node){
			node.childComp.querySelectorAll('.alertFooter lyte-button').forEach(function (item, index) {
				if (node.getData('ltPropButtons')[index].cxPropZcqa) {
					item.setAttribute('data-zcqa', node.getData('ltPropButtons')[index].cxPropZcqa)
				}
				else if (node.getData('ltPropButtons')[index].type) {
					var buttonType = node.getData('ltPropButtons')[index].type
					item.setAttribute('data-zcqa', "cxAlert" + buttonType.charAt(0).toUpperCase() + buttonType.slice(1) + "ButtonZcqa");
				}
				else {
					item.setAttribute('data-zcqa', "cxAlertAcceptButtonZcqa");

				}
			});
			if(this.data.cxPropScrollableAlert){
				this.setAlertBoxShadow();
			}
			if (this.getMethods("onShow")) {
				/**
				 * @method onShow
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } node
				 */
				this.executeMethod("onShow", node);
			}
		},
		setOnClose: function(node)
		{
			
		_cruxUtils.addMurhyInfo("crux-alert.js", "Feb Default Changes");
			if (this.getMethods("onClose")) {
				/**
				 * @method onClose
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } node
				 */
				this.executeMethod("onClose", node);
			}

		},
		setOnAccept:function(node,buttonText)
		{
			if(this.getMethods("onAccept")){
				/**
				 * @method onAccept
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } node
				 * @param { * } buttonText
				 */
				this.executeMethod("onAccept",node,buttonText);
				}
		},
		setOnReject: function(node,buttonText){
			
			if(this.getMethods("onReject")){
				/**
				 * @method onReject
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } node
				 * @param { * } buttonText
				 */
				this.executeMethod("onReject",node,buttonText);
				}
		}
	},
	setIconClass: function(){
		if(this.getData().cxPropType)
		{
			var propClass=this.getData().cxPropType.toLowerCase()+"AlertIcon lyteStatusIcon";
			this.setData('cxPropClass',propClass);
		}
	}.observes('cxPropType').on('init'),
	ariaSetAttributes: function(){
		if(this.data.cxPropAria){
			var ariaAttr = this.ariaGetMergedAttributes();
			if(ariaAttr){
				if(!ariaAttr.cxAriaAttributes){
					ariaAttr.cxAriaAttributes = {};
				}
				if(ariaAttr.cxAriaAttributes){
					if(!ariaAttr.cxAriaAttributes['role']){
						ariaAttr.cxAriaAttributes['role'] = "alertdialog";
					}
					if(!ariaAttr.cxAriaAttributes['aria-modal']){
						ariaAttr.cxAriaAttributes['aria-modal'] = "true";
					}
					if(!(ariaAttr.cxAriaAttributes['aria-label'] || ariaAttr.cxAriaAttributes['aria-labelledby'])){
						ariaAttr.cxAriaAttributes['aria-labelledby'] = this.data.cxPropHeading ? 'cxAriaHeaderLabel' : '';
					}
					if(!ariaAttr.cxAriaAttributes['aria-describedby']){
						ariaAttr.cxAriaAttributes['aria-describedby'] = (this.data.cxPropPrimaryMessage && this.data.cxPropSecondaryMessage) ? 'cxAriaPrimaryMsgDesc cxAriaSecondaryMsgDesc' : (this.data.cxPropPrimaryMessage ? 'cxAriaPrimaryMsgDesc' : (this.data.cxPropSecondaryMessage ? 'cxAriaSecondaryMsgDesc' : ''));
					}
					var ariaBtns = this.data.cxPropButtons;
					var ariaBtnsLen = ariaBtns.length;;
					var changeDone = false;
					for (var i = 0; i < ariaBtnsLen; i++) {
						if(ariaAttr.cxAriaAttributes['aria-describedby']){
							if(!ariaBtns[i].ariaButton){
								ariaBtns[i].ariaButton = {'aria-describedby' : ariaAttr.cxAriaAttributes['aria-describedby']};
								changeDone = true;
							}else if(!ariaBtns[i].ariaButton['aria-describedby']){
								ariaBtns[i].ariaButton['aria-describedby'] = ariaAttr.cxAriaAttributes['aria-describedby'];
								changeDone = true;
							}
						}
					}
					if(changeDone){
						this.setData('cxPropButtons', ariaBtns);
					}
				}
			}
			this.setData('ariaAttributes', ariaAttr);
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes', 'cxPropButtons').on('didConnect'),
	setHeadingMessage : function(){
		if(this.data.cxPropYield || this.data.cxPropHeadingMessageMarkdown){
			this.setData("headingMessage", this.data.cxPropHeadingMessageMarkdown ? Lyte.Component.registeredHelpers.markdown(this.data.cxPropHeading) : this.data.cxPropHeading);
		}
		if(this.data.cxPropYield || this.data.cxPropPrimaryMessageMarkdown){
			this.setData("primaryMessage", this.data.cxPropPrimaryMessageMarkdown ? Lyte.Component.registeredHelpers.markdown(this.data.cxPropPrimaryMessage) : this.data.cxPropPrimaryMessage);
		}
		if(this.data.cxPropYield || this.data.cxPropSecondaryMessageMarkdown){
			this.setData("secondaryMessage", this.data.cxPropSecondaryMessageMarkdown ? Lyte.Component.registeredHelpers.markdown(this.data.cxPropSecondaryMessage) : this.data.cxPropSecondaryMessage);
		}
	}.observes("cxPropHeadingMessageMarkdown", "cxPropHeading", "cxPropPrimaryMessageMarkdown", "cxPropPrimaryMessage", "cxPropSecondaryMessageMarkdown", "cxPropSecondaryMessage", "cxPropYield").on("init"),
	setAlertBoxShadow:function(){
		const actualDiv = $L('lyte-alert',this.$node)[0].component.actualModalDiv;
		const alertContent = $L('lyte-alert-content',actualDiv);
		const alertClientHeight = alertContent[0].clientHeight;
		const alertScrollHeight = alertContent[0].scrollHeight;
		if(alertClientHeight < alertScrollHeight){
			this._alertContent = alertContent;
			const alertHeader =  $L('lyte-alert-header',actualDiv);
			const alertFooter = $L('lyte-alert-footer',actualDiv);
			alertFooter.addClass('alertBoxSh');
			alertContent.off('scroll');
			alertContent.on('scroll',()=>{
				let alertScrollTop = alertContent.scrollTop(); //eslint-disable-line @zoho/webperf/layout-thrashing
				let scrollPos = parseInt(alertScrollTop + alertClientHeight);
				if(scrollPos >= alertScrollHeight){
					alertFooter.removeClass('alertBoxSh');
				}else{
					alertFooter.addClass('alertBoxSh');
				}
				if(alertScrollTop === 0){
					alertHeader.removeClass('alertBoxSh');
				}else{
					alertHeader.addClass('alertBoxSh');
				}
			});
		}
	}
	
}, {mixins : ["crux-aria-mixin"]});
/**
 * @syntax nonYielded
 * <crux-alert></crux-alert>
 */
