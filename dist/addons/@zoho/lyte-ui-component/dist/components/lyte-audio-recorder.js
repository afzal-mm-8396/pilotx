Lyte.Component.register("lyte-audio-recorder", {
_template:"<template tag-name=\"lyte-audio-recorder\" lyte-audio-recorder=\"\"> <template is=\"if\" value=\"{{expHandlers(ltPropMode,'==',&quot;playBack&quot;)}}\"><template case=\"true\"> <lyte-voicenote lyte-audio-recorder=\"\" lt-prop=\"{{stringify(ltPropPlaybackOptions)}}\" lt-prop-src=\"[{&quot;src&quot; : {{audioUrl}}}]\" lt-prop-refresh=\"{{refresh}}\" lt-prop-prefetch=\"true\" lt-prop-audio-thumb=\"true\" lt-prop-thumb-options=\"{{options}}\" lt-prop-type=\"playBack\" lt-prop-thumb-buttons=\"{{ltPropButtons.playbackMode}}\" lt-prop-thumb-button-yield=\"{{ltPropButtonYield}}\" on-clear=\"{{method(&quot;onPbClear&quot;)}}\" on-before-clear=\"{{method(&quot;onBeforePbClear&quot;)}}\" on-restart=\"{{method(&quot;onPbRestart&quot;)}}\" on-volume-change=\"{{method(&quot;onPbVolumeChange&quot;)}}\" on-progress=\"{{method(&quot;onPbProgress&quot;)}}\" on-play=\"{{method(&quot;onPbPlay&quot;)}}\" on-pause=\"{{method(&quot;onPbPause&quot;)}}\" on-error=\"{{method(&quot;onPbError&quot;)}}\" on-prefetch-success=\"{{method(&quot;onPbPrefetchSuccess&quot;)}}\" on-meta-loaded=\"{{method(&quot;onPbMetaLoaded&quot;)}}\"> <template is=\"registerYield\" yield-name=\"button\" from-parent=\"\"></template> </lyte-voicenote> </template><template case=\"false\"> <div class=\"audioRecorderWrap\"> <template is=\"if\" value=\"{{ltPropDisplayTime}}\"><template case=\"true\"> <div class=\"lyteTimePreview\"> <div class=\"lyteVoicenoteTimeInfo\">{{currentTime}}<template is=\"if\" value=\"{{ltPropTimeLimit}}\"><template case=\"true\">/{{totalTime}}</template></template></div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropMode,'==',&quot;recording&quot;)}}\"><template case=\"true\"> <div class=\"lyteRecordingPreview\"> <canvas class=\"lyteRecordingCanvas\"></canvas> </div> </template></template> <div class=\"lyteRecordingControlButtons\"> <template is=\"if\" value=\"{{ltPropButtonYield}}\"><template case=\"true\"><lyte-yield yield-name=\"button\" data=\"{{buttons}}\"></lyte-yield></template><template case=\"false\"><template items=\"{{buttons}}\" item=\"value\" index=\"index\" is=\"for\"> <lyte-button purpose=\"{{value.purpose}}\" class=\"lyte{{lyteUiCapitalizeName(value.purpose)}}Button {{value.class}}\" lt-prop-title=\"{{value.purpose}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;Bottom&quot;}\" lt-prop-appearance=\"{{value.appearance}}\" onclick=\"{{action('controlButtons',value.purpose)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{value.text}} </template> </lyte-button> </template></template></template> </div> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,1,2]},{"type":"if","position":[1,1,2],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropOptions","ltPropButtons","ltPropMode","ltPropWorkersPath","ltPropDisplayTime","ltPropCurrentTime","ltPropTimeLimit","ltPropPlaybackOptions","ltPropButtonYield","recording","cancel","currentTime","totalTime","hourValid","buttons","audioUrl","options","blob"],
_observedAttributesType :["object","object","string","string","boolean","number","number","object","boolean","boolean","boolean","string","string","boolean","array","string","object","object"],

	data: function () {
		return {
			ltPropOptions: Lyte.attr("object", { default: {} }),
			ltPropButtons: Lyte.attr("object", {
				default: {
					initialMode: [
						{ purpose: "record", text: "Record audio", appearance: "primary" }
					],
					recordingMode: [
						{ purpose: "cancel" },
						{ purpose: "stop" },
						{ purpose: "pause" }
					],
					playbackMode: [
						{ purpose: "clear" },
						{ purpose: "backward" },
						{ purpose: "play" },
						{ purpose: "forward" },
						{ purpose: "refresh" }
					]
				}
			}),
			ltPropMode: Lyte.attr("string", { default: "initial" }),
			ltPropWorkersPath: Lyte.attr("string"),
			ltPropDisplayTime: Lyte.attr("boolean", { default: false }),
			ltPropCurrentTime: Lyte.attr("number"),
			ltPropTimeLimit: Lyte.attr("number"),
			ltPropPlaybackOptions: Lyte.attr("object", { default: {} }),
			ltPropButtonYield: Lyte.attr("boolean", { default: false }),

			recording: Lyte.attr("boolean", { default: false }),
			cancel: Lyte.attr("boolean", { default: false }),
			currentTime: Lyte.attr("string", { default: "00:00" }),
			totalTime: Lyte.attr("string"),
			hourValid: Lyte.attr("boolean", { default: false }),
			buttons: Lyte.attr("array"),
			audioUrl: Lyte.attr("string"),
			options: Lyte.attr("object"),
			blob: Lyte.attr("object")
		}
	},

	actions: {
		controlButtons: function (button) {
			this.$node[button]();
		}
	},

	methods: {

		onBeforePbClear: function () {
			return this.callBacks('onBeforePlaybackClear', arguments);
		},

		onPbClear: function () {
			this.setData('ltPropMode', "initial");
			this.callBacks('onPlaybackClear', arguments);
		},

		onPbRestart: function () {
			this.callBacks('onPlaybackRestart', arguments);
		},

		onPbVolumeChange: function () {
			this.callBacks('onPlaybackVolumeChange', arguments);
		},

		onPbProgress: function () {
			this.callBacks('onPlaybackProgress', arguments);
		},

		onPbPlay: function () {
			this.callBacks('onPlaybackPlay', arguments);
		},

		onPbPause: function () {
			this.callBacks('onPlaybackPause', arguments);
		},

		onPbError: function () {
			this.callBacks('onPlaybackError', arguments);
		},

		onPbPrefetchSuccess: function () {
			this.callBacks('onPlaybackPrefetchSuccess', arguments);
		},

		onPbMetaLoaded: function () {
			this.callBacks('onPlaybackMetaLoaded', arguments);
		}

	},

	alterButtons: function () {
		var data = this.data,
			cancel = this.$node.cancel,
			ltMode = data.ltPropMode,
			options = data.options,
			mode;
		if (ltMode == "recording") {
			mode = "recordingMode";
		} else if (ltMode == "initial") {
			cancel && cancel();
			this.setData('audioUrl', undefined);
			this.setData('blob', undefined);
			options && Lyte.objectUtils(options, 'delete', 'buffer');
			mode = "initialMode";
		}

		this.setData("buttons", data.ltPropButtons[mode]);

	}.observes('ltPropMode').on('init'),

	didConnect: function () {

		var node = this.$node,
			data = this.data,
			limit = data.ltPropTimeLimit,
			_this = this,
			getVoiceNote = function () {
				return $L('lyte-voicenote', this.$node)[0];
			}.bind(this),
			getAudio = function () {
				return getVoiceNote().component._audio;
			}.bind(this);

		if (data.ltPropDisplayTime && limit) {
			var limitVal = this.getFormTime(limit);
			this.setData("totalTime", limitVal);
			if (limitVal.length > 6) {
				this.setData("hourValid", true);
				this.setData("currentTime", "00:00:00");
			}
		}

		node.record = function () {
			return new Promise(function (res) {
				_this.res = res;
				node.cancel();
			}).then(() => {
				_this.res = undefined;
				this.setData('ltPropMode', "recording");
				_this.record();
			})
		}.bind(this);

		node.cancel = function () {
			this.stop(true);
		}.bind(this);

		node.pause = this.pause.bind(this);

		node.resume = this.resume.bind(this);

		node.stop = this.stop.bind(this);

		node.save = function () {
			var data = this.data,
				ret = { blob: data.blob, url: data.audioUrl };
			$L('lyte-voicenote', this.$node).get(0).clear();
			return ret;
		}.bind(this);

		node.playbackVolume = function (volume) {
			if(volume !== undefined){
				var audio = getAudio();
				volume == 0 && (audio.muted = true);
				audio.volume = volume;
			}
		}.bind(this);

		node.playbackRate = function (rate) {
			if(rate !== undefined){
				var audio = getAudio();
				audio.playbackRate = rate;
			}
		}.bind(this);

		node.playbackPlay = function () {
			getVoiceNote().play();
		}.bind(this);

		node.playbackPause = function () {
			getVoiceNote().pause();
		}.bind(this);

		node.playbackSkip = function (skip) {
			if(skip){
				var audio = getAudio();
				audio.currentTime += skip;
			}
		}.bind(this);

	},

	record: function () {
		var _this = this,
			data = _this.data,
			callbackCount = 0,
			curDur = 0,
			hourValid = data.hourValid,
			options = data.ltPropOptions,
			stopped = false;
		if (data.ltPropWorkersPath) {
			if (this.callBacks("onBeforeRecord") == false) {
				return;
			}

			var type = options.type,
				verticalScale,
				sample;

			if (!type || type == 'bar') {
				verticalScale = 0.7,
					sample = 64
			}

			this.setData('options', $L.extend({
				type: "bar",
				margin: 2,
				minHeight: 2,
				verticalScale: verticalScale,
				sample: sample
			}, options));

			this._canvas || (this._canvas = this.$node.querySelector(".lyteRecordingCanvas"));

			$L.media.record({
				workletBasePath: data.ltPropWorkersPath,
				workerBasePath: data.ltPropWorkersPath,
				chunk: true,
				onStop: function (blob, buffer) {
					var methodName = data.cancel ? 'onCancel' : 'onStop',
						defTime = data.hourValid ? "00:00:00" : "00:00";
					_lyteUiUtils.generateThumb({
						stop: true
					})
					window.audioThumbRej && window.audioThumbRej();
					clearTimeout(window.__times);
					delete window.__times;
					_this._canvas.getContext("2d").clearRect(0, 0, options.width || 350, options.height || 100);
					_this.setData('recording', false);
					_this.setData('currentTime', defTime);
					_this.addRemoveClass("lyteAudioRecorderRecording");
					_this.addRemoveClass("lyteAudioRecorderPause", undefined, "resume", "pause");
					delete _this._canvas;
					if (methodName == 'onStop') {
						_this.setData('blob', blob);
						_this.setData('audioUrl', JSON.stringify(window.URL.createObjectURL(blob)));
						Lyte.objectUtils(data.options, 'add', 'buffer', buffer);
						_this.setData('ltPropMode', "playBack");

						var $node = _this.$node,
							pb = $L('lyte-voicenote', $node).get(0);

						$node.playbackPause = pb.pause;
						$node.playbackPlay = pb.play;
						_this.getMethods(methodName) && _this.executeMethod(methodName, blob, buffer, _this.$node);
					} else {
						_this.setData('ltPropMode', "initial");
						_this.setData('cancel', false);
						_this.callBacks(methodName);
					}
					_this.res && _this.res();
				},
				onProgress: function (buffer) {
					if (stopped || $L(_this.$node).hasClass('lyteAudioRecorderPause')) {
						return;
					}
					callbackCount++;
					curDur = Math.floor(callbackCount / 345);
					if (curDur != undefined && data.ltPropCurrentTime != curDur) {
						_this.setData("ltPropCurrentTime", curDur);
						if (data.ltPropDisplayTime) {
							_this.setData("currentTime", _this.getFormTime(curDur, hourValid));
						}
					}
					_this.getMethods('onProgress') && _this.executeMethod('onProgress', buffer, curDur, _this.$node);
					if (data.ltPropTimeLimit != undefined && curDur >= data.ltPropTimeLimit) {
						stopped = true;
						_this.stop();
						// _this.getMethods('onProgress') && _this.executeMethod('onProgress', curDur, data.ltPropTimeLimit, _this.$node);
						return;
					}
					_this._canvas && _lyteUiUtils.generateThumb($L.extend({
						buffer: buffer,
						canvas: _this._canvas,
						recording: true,
						fillStyle: "#E74C3C"
					}, data.options));
				}
			});
			$L(this.$node).addClass("lyteAudioRecorderRecording");
			this.setData('recording', true);
			this.callBacks("onRecord");
		}
	},

	stop: function (cancel) {//format time
		if (this.data.recording) {
			var callBack = cancel ? "Cancel" : "Stop";
			if (this.callBacks("onBefore" + callBack) == false) {
				return;
			}
			cancel && this.setData('cancel', true);
			$L.media.stop();
		} else if (this.res) {
			this.res();
		} else {
			return false;
		}
	},

	resume: function () {
		if (this.data.recording) {
			if (this.callBacks("onBeforeResume") == false) {
				return;
			}
			$L.media.resume();
			this.addRemoveClass("lyteAudioRecorderPause", "lyteAudioRecorderRecording", "resume", "pause");
			this.callBacks("onResume")
		}
	},

	pause: function () {
		if (this.data.recording) {
			if (this.callBacks("onBeforePause") == false) {
				return;
			}
			$L.media.pause();
			this.addRemoveClass("lyteAudioRecorderRecording", "lyteAudioRecorderPause", "pause", "resume");
			_lyteUiUtils.generateThumb($L.extend({
				buffer: [],
				canvas: this._canvas,
				fillStyle: "#0984E3",
				prevRecording: true
			}, this.data.options));
			this.callBacks("onPause")
		}
	},

	getFormTime: function (time, overRide) {//time in sec
		var retTime = "",
			min = Math.floor(time / 60),
			hour = Math.floor(time / 3600),
			retForm = function (num) {
				return num.toString().length == 1 ? "0" + num : num
			};
		if (hour || overRide) {
			retTime += (retForm(hour) + ":")
		}
		retTime += (retForm(min - (hour * 60)) + ":");
		retTime += retForm(time - (min * 60));
		return retTime;
	},

	addRemoveClass: function (remClass, addClass, from, to) {
		var $node = $L(this.$node),
			buttons = this.data.ltPropButtons.recordingMode;
		remClass && $node.removeClass(remClass);
		addClass && $node.addClass(addClass);
		from && buttons && buttons.every(item => {
			if (item.purpose == from) {
				Lyte.objectUtils(item, "add", "purpose", to);
				return
			}
			return true
		});
	},

	callBacks: function (name, args) {
		args = Array.from(args || []);
		args.push(this.$node);
		if (this.getMethods(name)) {
			return this.executeMethod.apply(this, [name].concat(args));
		}
	}

});
