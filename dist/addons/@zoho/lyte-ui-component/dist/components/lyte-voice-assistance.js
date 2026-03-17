Lyte.Component.register("lyte-voice-assistance", {
_template:"<template tag-name=\"lyte-voice-assistance\"> <lyte-event-listener event-name=\"onVoiceAssistanceFailure\" on-fire=\"{{action('onVoiceAssistanceRequest')}}\"></lyte-event-listener> <lyte-event-listener event-name=\"onVoiceAssistanceSuccess\" on-fire=\"{{action('onVoiceAssistanceRequest')}}\"></lyte-event-listener> <lyte-event-listener event-name=\"onRequestVoiceAssistance\" on-fire=\"{{action('onRequestVoiceAssistance')}}\"></lyte-event-listener> <lyte-modal lt-prop-ignore-zindex=\"true\" lt-prop-draggable=\"true\" lt-prop-allow-containment=\"true\" lt-prop-prevent-focus=\"true\" lt-prop-show-close-button=\"true\" lt-prop-allow-multiple=\"true\" lt-prop-wrapper-class=\"lyteVoAssModalWrap\" id=\"accessShortcut\" lt-prop-height=\"auto\" lt-prop-max-height=\"100%\" lt-prop-width=\"365px\" lt-prop-freeze=\"false\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromBottom&quot;,&quot;duration&quot;:&quot;0.5s&quot;}\" lt-prop-offset=\"{&quot;bottom&quot;:&quot;30px&quot;,&quot;right&quot;:&quot;10px&quot;}\" on-show=\"{{method('openVcAssit')}}\" lt-prop-show=\"{{lbind(ltPropShowModal)}}\" on-before-close=\"{{method(&quot;onShortcutBeforeClose&quot;)}}\" on-close=\"{{method('onShortcutClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"lyteVoAssModalHeader\"> {{ltPropHeader}} </lyte-modal-header> <lyte-modal-content class=\"lyteVoAssModalContent\"> <div id=\"ac_mainVA\" class=\"{{if(ac_vsListCont_class,'lyteVoAssListCont','lyteVoAssFinalSearchCont')}}\">{{ac_mainVA_text}}</div> <div class=\"lyteVoAssMicIconWrapper\" onclick=\"{{action('onRequestVoiceAssistance')}}\"> <template is=\"if\" value=\"{{expHandlers(ac_listenGif_show,'!')}}\"><template case=\"true\"><lyte-icon id=\"ac_micIcon\" class=\"lyteVoAssMicIcon\"></lyte-icon></template></template> <template is=\"if\" value=\"{{ac_listenGif_show}}\"><template case=\"true\"><span id=\"ac_listenGif\" class=\"lyteVoAssListeningGif\"></span></template></template> </div> <div id=\"ac_vsCont\" class=\"lyteVoAssInfoText {{if(ac_vsCont_class,'','lyteVoAssInfoTextHidden')}}\">{{ac_vsCont_text}}</div> </lyte-modal-content> <lyte-modal-footer class=\"right lyteVoAssModalFooter\"> <template is=\"if\" value=\"{{ltPropShowSetting}}\"><template case=\"true\"><span id=\"ac_setting\" lt-prop-title=\"Settings\" class=\"lyteVoAssFooterAction\" onclick=\"{{action('showVcMenu')}}\">Settings</span></template></template> <template is=\"if\" value=\"{{if(ltPropHelpUrl,true,false)}}\"><template case=\"true\"><span class=\"lyteVoAssFooterSep\"></span></template></template> <template is=\"if\" value=\"{{if(ltPropHelpUrl,true,false)}}\"><template case=\"true\"><span lt-prop-title=\"Help\" onclick=\"{{action('openHelp')}}\" class=\"lyteVoAssFooterAction\">Help</span></template></template> </lyte-modal-footer> </template> </lyte-modal> <lyte-menu lt-prop-width=\"230px\" id=\"ac_vsMenu\" lt-prop-show=\"{{lbind(ltPropSettingMenu)}}\" lt-prop-freeze=\"false\" lt-prop-yield=\"true\" lt-prop-event=\"click/mouseenter/dblclick/contextmenu\" lt-prop-query=\"#ac_setting\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item onclick=\"{{action('changeItemNumbering')}}\" data-value=\"{{ltPropItemNumbering}} {{lyteUiI18n('lyte.voiceassistance.numberoverlay')}}\">{{ltPropItemNumbering}} {{lyteUiI18n(\"lyte.voiceassistance.numberoverlay\")}}</lyte-menu-item> <lyte-menu-item id=\"vc_additional_setting\" onclick=\"{{action('openAdditionalSettings')}}\" data-value=\"Additional Settings\">{{lyteUiI18n('lyte.voiceassistance.additioanlsettings')}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"registerYield","position":[7,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"text","position":[3,5,0]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[5,5]},{"type":"if","position":[5,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[7]},{"type":"attr","position":[9]},{"type":"registerYield","position":[9,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,1,2]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[9]}],
_observedAttributes :["ltPropShowModal","voiceAssStart","ltPropItemNumbering","ltPropSettingMenu","ac_mainVA_text","ac_vsListCont_class","ac_vsCont_text","ac_vsCont_class","ac_listenGif_show","isListening","isProcessing","ltPropDisplayMessage","ltPropVcProperties","ltPropHeader","ltPropHelpUrl","ltPropShowSetting","ltPropActionInfoText","ltPropEnableNumbering","ltPropHandlingProperties","lrPropVoiceApiUrl","ltPropIscSignature"],
_observedAttributesType :["boolean","boolean","string","boolean","string","boolean","string","boolean","boolean","boolean","boolean","string","object","string","string","boolean","string","boolean","object","string","string"],

	data : function(){
		return {
			ltPropShowModal : Lyte.attr('boolean', { default: true }),
			voiceAssStart : Lyte.attr('boolean', { default: false }),
			ltPropItemNumbering: Lyte.attr('string', { default: "Enable"}),
			ltPropSettingMenu: Lyte.attr('boolean', { default: false }),
			ac_mainVA_text: Lyte.attr('string', { default: ""}),
			ac_vsListCont_class: Lyte.attr('boolean', { default: false }),
			ac_vsCont_text: Lyte.attr('string', { default: ""}),
			ac_vsCont_class: Lyte.attr('boolean', { default: false }),
			ac_listenGif_show: Lyte.attr('boolean', { default: true }),
			isListening : Lyte.attr('boolean', { default: false }),
			isProcessing : Lyte.attr('boolean', { default: false }),
			ltPropDisplayMessage : Lyte.attr('string', { default: ""}),
			ltPropVcProperties : Lyte.attr('object', { default: {}}),
			ltPropHeader : Lyte.attr('string', { default: ""}),
			ltPropHelpUrl : Lyte.attr('string', { default: ""}),
			ltPropShowSetting : Lyte.attr('boolean', { default: true }),
			ltPropActionInfoText : Lyte.attr('string', { default: ""}),
			ltPropEnableNumbering : Lyte.attr('boolean', { default: false }),
			ltPropHandlingProperties : Lyte.attr('object', { default: {}}),
			lrPropVoiceApiUrl : Lyte.attr('string', { default: ""}),
			ltPropIscSignature : Lyte.attr('string', { default: ""})
		}		
	},
	init: function(){
		this.setData('ltPropItemNumbering', this.data.ltPropEnableNumbering ? "Disable" : "Enable");
	},
	actions : {
		showVcMenu: function(){
			this.setData('ltPropSettingMenu',true);
		},
		onVoiceAssistanceRequest : function(res){
			var _self = this;
			if(!_self.data.isListening){
				this.setData({'ac_vsListCont_class' : false, 'ac_mainVA_text' : res.message, 'isListening' : false, 'isProcessing' : false });
				_self.timeout = setTimeout(() => {
					if(_self && _self.data){
						_self.setData("ac_mainVA_text", this.data.ltPropDisplayMessage);
					}
				}, 5000);
				this.setData({'ac_vsCont_text' : this.data.ltPropActionInfoText, 'ac_vsCont_class' : true });
			}
		},
		onRequestVoiceAssistance : function(fromEvent = null){
			this.onRequestVoiceAssistance(fromEvent);
		},
		changeItemNumbering: function(){
			if(this.data.ltPropItemNumbering === "Enable"){
				this.setData({'ltPropItemNumbering' : "Disable", 'ltPropEnableNumbering' : true });
				setTimeout(() => {
					$L.VA.switchNumbering(true);
				})
			}else{
				this.setData({'ltPropItemNumbering' : 'Enable', 'ltPropEnableNumbering' : false });
				$L.VA.switchNumbering(false);
			}
		},
		openAdditionalSettings: function(){
			// REFACTOR: getMethods is getting something and executeMethod is executing something. - Done
			if(this.getMethods("onClickAdditionalSetting")){
				this.executeMethod('onClickAdditionalSetting','vc_additional_setting');
			}
			// For using plugin
			if(this.data.onClickAdditionalSetting){
				this.data.onClickAdditionalSetting("vc_additional_setting");
			}
		},
		openHelp : function(){
			window.open(this.data.helpURL);
		}
	},
	methods : {
		onShortcutClose : function(){
			this.$node.remove();
			this.setData({'ac_mainVA_text' : '', 'isListening' : false, 'isProcessing' : false, 'ac_vsCont_text' : this.data.ltPropActionInfoText, 'ac_vsCont_class' : true, 'ac_listenGif_show': false });
			this.setData('voiceAssStart', false);
		},
		onShortcutBeforeClose : function(){
			$L.VA.stopVoiceListening();
		},
		openVcAssit: function(){
			this.onRequestVoiceAssistance.call(this);
		}
	},
	onRequestVoiceAssistance : function(fromEvent = null){
		clearTimeout(this.timeout);

		// REFACTOR: Try with a state variable since this will be i18nd - Done
		if(this.data.isProcessing){
			return;
		}
		this.setData({'ac_vsListCont_class' : true, 'ac_listenGif_show' : true, 'ac_mainVA_text' :  'Listening...', 'isListening' : true, 'isProcessing' : false});

		if(this.data.voiceAssStart){
			this.setData({'voiceAssStart' : false, 'ac_listenGif_show' : false });
			if(!fromEvent){
				$L.VA.stopVoiceListening();
			}
			this.setData({"ac_mainVA_text":'Processing...','isProcessing' : true , 'isListening' : false});
		}else{
			this.setData({'voiceAssStart' : true, 'ac_listenGif_show' : true });
			$L.VA.startVoiceListening(this.data,'fromcomponent');
			this.setData({'ac_vsCont_text' : '', 'ac_vsCont_class' : true });
		}
	}
});