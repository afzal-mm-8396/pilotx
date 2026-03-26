Lyte.Component.register("crux-audio-recorder", {
_template:"<template tag-name=\"crux-audio-recorder\"> <div class=\"cxAudioRecContainer {{if(ifEquals(cxPropMode,'initial'),'cxAudioRecDummyDiv','')}}\"> <lyte-audio-recorder lt-prop-workers-path=\"{{workersPath}}\" lt-prop-display-time=\"{{cxPropDisplayTime}}\" lt-prop-download=\"{{cxPropDownload}}\" lt-prop-mode=\"{{lbind(cxPropMode)}}\" lt-prop-time-limit=\"{{cxPropTimeLimit}}\" lt-prop-options=\"{{cxPropOptions}}\" lt-prop-buttons=\"{{cxPropButtons}}\" lt-prop-playback-options=\"{{cxPropPlaybackOptions}}\" lt-prop-button-yield=\"true\" on-before-record=\"{{method('onBeforeRecordAudio')}}\" on-record=\"{{method('onRecordAudio')}}\" on-progress=\"{{method('onProgressAudio')}}\" on-before-pause=\"{{method('onBeforePauseAudio')}}\" on-pause=\"{{method('onPauseAudio')}}\" on-before-resume=\"{{method('onBeforeResumeAudio')}}\" on-resume=\"{{method('onResumeAudio')}}\" on-before-cancel=\"{{method('onBeforeCancelAudio')}}\" on-cancel=\"{{method('onCancelAudio')}}\" on-before-stop=\"{{method('onBeforeStopAudio')}}\" on-stop=\"{{method('onStopAudio')}}\" on-playback-play=\"{{method('onPlaybackPlayAudio')}}\" on-playback-pause=\"{{method('onPlaybackPauseAudio')}}\" on-playback-clear=\"{{method('onPlaybackClearAudio')}}\" on-playback-progress=\"{{method('onPlaybackProgressAudio')}}\" on-playback-error=\"{{method('onPlaybackErrorAudio')}}\"> <template is=\"registerYield\" yield-name=\"button\"> <div class=\"cxFlex cxAudioRecActionDiv\"> <template is=\"if\" value=\"{{expHandlers(cxPropMode,'===','initial')}}\"><template case=\"true\"><lyte-button class=\"cxAudioRecBtn\" lt-prop-appearance=\"primary\" onclick=\"{{action('startRecord')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Record </template> </lyte-button></template><template case=\"false\"> <div class=\"cxFlex\"> <span class=\"cxIconHoverEffect cxAudioRecDelIconWrap\" onclick=\"{{action('deleteAudio','delete')}}\"> <span class=\"cxDeleteOutlineIcon\"></span> </span> <template is=\"if\" value=\"{{enableAudioPlay}}\"><template case=\"true\"> <template is=\"if\" value=\"{{enablePlay}}\"><template case=\"true\"><span class=\"cxIconHoverEffect cxAudioRecPausePlayIconWrap\" onclick=\"{{action('recordAudio','play')}}\"> <span class=\"cxPlayIcon\"></span> </span></template><template case=\"false\"><span class=\"cxIconHoverEffect cxAudioRecPausePlayIconWrap\" onclick=\"{{action('recordAudio','pause')}}\"> <span class=\"cxPauseIcon\"></span> </span></template></template> </template></template> </div> <div> <lyte-yield yield-name=\"cxCustomButton\"></lyte-yield> <lyte-button class=\"{{if(enableAudioPlay,'cxAudioRecHideBtn','')}}\" lt-prop-class=\"cxOutlineFailureBtn\" lt-prop-appearance=\"failure\" onclick=\"{{action('stopAudio','stop')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Stop </template> </lyte-button> </div> </template></template> </div> </template> </lyte-audio-recorder> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"insertYield","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3,3]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["workersPath","cxPropDisplayTime","cxPropDownload","cxPropMode","cxPropTimeLimit","cxPropOptions","cxPropButtons","cxPropPlaybackOptions","cxPropEnableAudio","enablePlay","enableAudioPlay"],
_observedAttributesType :["string","boolean","boolean","string","number","object","object","object","boolean","boolean","boolean"],

    data: function() {
        return {
            // Path Configuration
            workersPath: Lyte.attr("string", { 
                default: "/dist/addons/@zoho/lyte-ui-component/dist/plugins/lyteAudioWorkers/" 
            }),
            
            // Display Properties
            cxPropDisplayTime: Lyte.attr('boolean', { default: false }),
            cxPropDownload: Lyte.attr('boolean', { default: false }),
            
            // Mode Configuration
            cxPropMode: Lyte.attr('string', { default: 'initial' }), // 'initial', 'recording', 'playBack'
            
            // Time Properties
            cxPropTimeLimit: Lyte.attr('number', { default: undefined }),
            
            // Waveform Options
            cxPropOptions: Lyte.attr('object', { default: {} }),
            
            // Button Configuration
            cxPropButtons: Lyte.attr('object', { default: {} }),
            
            // Playback Options
            cxPropPlaybackOptions: Lyte.attr('object', { default: {'timePreview': 'false'} }),

			cxPropEnableAudio: Lyte.attr('boolean', { default: true }),
			enablePlay: Lyte.attr('boolean', { default: true }),
			enableAudioPlay: Lyte.attr('boolean', { default: false }),
        };
    },

	performMethodsCallBack: function (methodName, args) {
		if (this.getMethods(methodName)) {
			const result = this.executeMethod(methodName, args);
			if (result === false) {
				return false;
			}
		};
	},

	init: function() {
		this.$node.cxRecord = () => {
			return this.cxRecord();
		};
		this.$node.cxPause = () => {
			return this.cxPause();
		};
		this.$node.cxResume = () => {
			return this.cxResume();
		};
		this.$node.cxCancel = () => {
			return this.cxCancel();
		};
		this.$node.cxStop = () => {
			return this.cxStop();
		};
		this.$node.cxPlaybackPause = () => {
			return this.cxPlaybackPause();
		};
		this.$node.cxPlaybackPlay = () => {
			return this.cxPlaybackPlay();
		};
		this.$node.cxSave = () => {
			return this.cxSave();
		};
		const reg = /var\(--[0-9a-zA-Z_-]+\)/g;
		const rootElementStyle = getComputedStyle(document.querySelector(':root'));
		const styleOptions = {
			fillStyle:this.data.cxPropOptions.fillStyle,
			strokeFillStyle:this.data.cxPropOptions.strokeFillStyle
		};
		for (const styleOpt in styleOptions) {
			let styleVariable = styleOptions[styleOpt];
			if(styleVariable && styleVariable.match(reg)){
				const variable = styleVariable.match(/--[0-9a-zA-Z_-]+/g);
				styleVariable = styleVariable.replace(reg,rootElementStyle.getPropertyValue(variable[0]));
				Lyte.objectUtils( this.data.cxPropOptions ,'add',styleOpt,styleVariable);
			}
		}
	},

	cxRecord: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.record) {
			recorder.record();
		}
	},

	cxPause: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.pause) {
			recorder.pause();
		}
	},

	cxResume: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.resume) {
			recorder.resume();
		}
	},

	cxCancel: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.cancel) {
			recorder.cancel();
		}
	},

	cxStop: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.stop) {
			recorder.stop();
		}
	},

	cxPlaybackPause: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.playbackPause) {
			recorder.playbackPause();
		}
	},

	cxPlaybackPlay: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.playbackPlay) {
			recorder.playbackPlay();
		}
	},

	cxSave: function () {
		var recorder = this.$node.querySelector('lyte-audio-recorder');
		if (recorder && recorder.save) {
			return recorder.save();
		}
		return null;
	},
    
    actions: {
		recordAudio:function(arg){
			if(arg === 'play'){
				this.setData("enablePlay", false);
				this.cxPlaybackPlay();
				// $L('.playIcon')
			} else{
				this.setData("enablePlay", true);
				this.cxPlaybackPause();
			}
		},
		deleteAudio:function(arg){
			if(arg === 'delete'){
				this.setData("cxPropEnableAudio", false);
				this.setData('cxPropMode','initial');
				this.setData("enableAudioPlay", false);
			}
		},
		stopAudio: function(arg){
			if (arg === 'stop') {
				this.setData("enableAudioPlay", true);
				this.cxStop();
			}
		},
		startRecord:function(){
			this.cxRecord();
		}
    },
    
    methods: {
		onBeforeRecordAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnBeforeRecord', args);
		},

		onRecordAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnRecord', args);
		},

		onProgressAudio(buffer, currentTime, element) {
			const args = { buffer, currentTime, element };
			this.performMethodsCallBack('cxOnProgress', args);
		},

		onBeforePauseAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnBeforePause', args);
		},

		onPauseAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnPause', args);
		},

		onBeforeResume(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnBeforeResume', args);
		},

		onResumeAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnResume', args);
		},

		onBeforeCancelAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnBeforeCancel', args);
		},

		onCancelAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnCancel', args);
		},

		onBeforeStopAudio(element) {
			const args = { element };
			this.performMethodsCallBack('cxOnBeforeStop', args);
		},

		onStopAudio(blob, buffer, element) {
			const args = { blob, buffer, element};
			this.performMethodsCallBack('cxOnStop', args);
		},

		// Playback Methods
		onPlaybackPlayAudio(voicenote, element) {
			const args = { voicenote, element };
			this.performMethodsCallBack('cxOnPlaybackPlay', args);
		},

		onPlaybackPauseAudio(voicenote, element) {
			const args = { voicenote, element };
			this.performMethodsCallBack('cxOnPlaybackPause', args);
		},

		onPlaybackClearAudio(audio, event, voicenote, element) {
			const args = { audio, event, voicenote, element };
			this.performMethodsCallBack('cxOnPlaybackClear', args);
		},

		onPlaybackProgressAudio(audio, event, voicenote, element) {
			const args = { audio, event, voicenote, element };
			this.performMethodsCallBack('cxOnPlaybackProgress', args);
		},

		onPlaybackErrorAudio(event, voicenote, element) {
			const args = { audio, event, voicenote, element };
			this.performMethodsCallBack('cxOnPlaybackError', args);
		}
    }
});