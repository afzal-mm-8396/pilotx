/**
 * Renders a counter
 * @component lyte-counter
 * @version  2.0.0
 */


Lyte.Component.register("lyte-counter", {
_template:"<template tag-name=\"lyte-counter\" lyte-counter=\"\"> <div class=\"counterDiv {{ltPropClass}}\" tabindex=\"{{ltPropTabIndex}}\" data-tabindex=\"{{ltPropDataTabIndex}}\"> <span class=\"counterNegative\">{{negative}}</span> <span class=\"counterPrefix\">{{ltPropPrefix}}</span> <span class=\"counterValue\">{{result}}</span> <span class=\"counterSuffix\">{{ltPropSuffix}}</span> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,7,0]}],
_observedAttributes :["ltPropStart","ltPropEnd","ltPropPrefix","ltPropSuffix","ltPropDecimals","ltPropDuration","ltPropUseEasing","ltPropUseGrouping","ltPropSeparator","ltPropDecimalSeparator","ltPropState","ltPropClass","ltPropAria","ltPropAriaAttributes","ltPropTabIndex","ltPropDataTabIndex","negative","startValue","endValue","result"],
_observedAttributesType :["number","number","string","string","number","number","boolean","boolean","string","string","string","string","boolean","object","number","number","string","number","number","string"],

	data: function () {
		return {
			/** 
			 * @componentProperty {number} ltPropStart=0
			 * @version 2.0.0
			 * @input
			 */
			'ltPropStart': Lyte.attr('number', {
				'default': 0,
				input: true
			}),
			/** 
			 * @componentProperty {number} ltPropEnd=0
			 * @version 2.0.0
			 * @input
			 */
			'ltPropEnd': Lyte.attr('number', {
				'default': 0,
				input: true
			}),
			/** 
			 * @componentProperty {string} ltPropPrefix=""
			 * @version 2.0.0
			 * @input
			 */
			'ltPropPrefix': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'prefix', ""),
				input: true
			}),
			/** 
			 * @componentProperty {string} ltPropSuffix=""
			 * @version 2.0.0
			 * @input
			 */
			'ltPropSuffix': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'suffix', ""),
				input: true
			}),
			/** 
			 * @componentProperty {number} ltPropDecimals=0
			 * @version 2.0.0
			 * @input
			 */
			'ltPropDecimals': Lyte.attr('number', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'decimals', 0),
				input: true
			}),
			/** 
			 * @componentProperty {number} ltPropDuration=2
			 * @version 2.0.0
			 * @input
			 */
			'ltPropDuration': Lyte.attr('number', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'duration', 2),
				input: true
			}),
			/** 
			 * @componentProperty {boolean} ltPropUseEasing=true
			 * @version 2.0.0
			 * @input
			 */
			'ltPropUseEasing': Lyte.attr('boolean', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'useEasing', true),
				input: true
			}),
			/** 
			 * @componentProperty {boolean} ltPropUseGrouping=true
			 * @version 2.0.0
			 * @input
			 */
			'ltPropUseGrouping': Lyte.attr('boolean', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'useGrouping', true),
				input: true
			}),
			/** 
			 * @componentProperty {string} ltPropSeparator=,
			 * @version 2.0.0
			 * @input
			 */
			'ltPropSeparator': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'separator', ','),
				input: true
			}),
			/** 
			 * @componentProperty {string} ltPropDecimalSeparator=.
			 * @version 3.0.0
			 * @input
			 */
			'ltPropDecimalSeparator': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'decimalSeparator', "."),
				input: true
			}),

			/**
			 * @componentProperty {string} ltPropState
			 * @default ''
			 * @input
			 */
			'ltPropState': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'state', ''),
				input: true
			}),
			/** 
			 * @componentProperty {string} ltPropClass=""
			 * @version 2.0.0
			 * @input
			 */
			'ltPropClass': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-counter', 'class', ''),
				input: true
			}),
			/**
			 * @componentProperty {boolean} ltPropAria=false
			 * @version 3.1.0
			 * @input
			 */
			'ltPropAria': Lyte.attr('boolean', {
				'default': false,
				input: true
			}),
			/**
			 * @componentProperty {object} ltPropAriaAttributes={}
			 * @condition ltPropAria true
			 * @version 3.1.0
			 * @input
			 */
			'ltPropAriaAttributes': Lyte.attr('object', {
				'default': {},
				input: true
			}),
			/**
			 * @componentProperty {number} ltPropTabIndex=0
			 * @version 3.1.0
			 * @input
			 */
			'ltPropTabIndex': Lyte.attr('number', { 'default': 0, input: true }),
			'ltPropDataTabIndex': Lyte.attr('number', { 'default': 0 }),

			/**
			* @experimental negative
			*/
			'negative': Lyte.attr('string', {
				'default': ''
			}),
			/**
			* @experimental startValue
			*/
			'startValue': Lyte.attr('number', {
				'default': 0
			}),
			/**
			* @experimental endValue
			*/
			'endValue': Lyte.attr('number'),
			/**
			* @experimental result
			*/
			'result': Lyte.attr('string')
		}
	},

	didConnect: function () {
		if (this._rAFId) {
			window.cancelAnimationFrame(this._rAFId)
		}
		this._initialized = false;
		delete this._startTime;
		delete this._paused;
		delete this._remaining;
		delete this._elapsed;
		if (this.getData('ltPropSeparator') === '') {
			this.setData('ltPropUseGrouping', false)
		}
		if (this.getData('ltPropEnd') == null) {
			throw new TypeError('"endValue" is null or not defined')
		}
		if (!this.checkForNumber(Number(this.getData('ltPropStart')))) {
			throw new TypeError('"Start Value" is not a number')
		}
		if (!this.checkForNumber(Number(this.getData('ltPropEnd')))) {
			throw new TypeError('"End Value" is not a number')
		}
		this._startVal = Number(this.getData('ltPropStart'))
		this._endVal = Number(this.getData('ltPropEnd'))
		delete this._startTime
		delete this._paused
		delete this._remaining
		delete this._elapsed
		this.initialize()
		if (this.getData('ltPropState').toUpperCase() == 'START') {
			this.start();
		}
	},
	ariaObserver: function (change) {
		if (this.getData('ltPropAria')) {
			_lyteUiUtils.setAttribute(this.$node.querySelector('.counterDiv'), this.getData('ltPropAriaAttributes') || {}, {});

		}

	}.observes('ltPropAriaAttributes').on('didConnect'),
	stateObs: function () {
		if (this.getData('ltPropState').toUpperCase() == 'START') {
			this.start();
		}
		else if (this.getData('ltPropState').toUpperCase() == 'RESET') {
			this.reset();
		}
		else if (this.getData('ltPropState').toUpperCase() == 'PAUSE') {
			if (this._initialized) {
				this._paused = true;
				window.cancelAnimationFrame(this._rAFId);
				var now = (window.performance && performance.now) ? performance.now() : Date.now();
				if (this._startTime != null) {
					var segmentProgress = now - this._startTime;
					this._elapsed = (this._elapsed || 0) + segmentProgress;
					this._elapsed = Math.max(0, Math.min(this._elapsed, this._duration || 0));
					delete this._startTime;
				}
				if (this._duration != null) {
					this._remaining = Math.max(0, (this._duration || 0) - (this._elapsed || 0));
				}
			}
		}
		else if (this.getData('ltPropState').toUpperCase() == 'RESUME' && this._paused) {
			this.resume();
		}
	}.observes('ltPropState'),
	updateObs: function () {
		this._endVal = Number(this.getData('ltPropEnd'));
		if (this.getData('ltPropState') == 'Running') {
			this.update(this.getData('ltPropEnd'));
		}
	}.observes('ltPropEnd'),
	startObs: function () {
		if (this._rAFId) {
			window.cancelAnimationFrame(this._rAFId)
		}
		this._initialized = false;
		this._startVal = Number(this.getData('ltPropStart'))
		this._endVal = Number(this.getData('ltPropEnd'))
		delete this._startTime
		delete this._paused
		delete this._remaining
		delete this._elapsed
		this.initialize()
	}.observes('ltPropStart'),
	start: function () {
		if (this._rAFId) {
			window.cancelAnimationFrame(this._rAFId)
		}
		this._initialized = false;
		delete this._startTime;
		delete this._paused;
		delete this._remaining;
		delete this._elapsed;
		this.initialize()
		this.setData('ltPropState', 'Running')
		this._startVal = this.getData('ltPropStart')
		this._rAFId = requestAnimationFrame(this.count.bind(this));
	},
	reset: function () {
		this._paused = false;
		window.cancelAnimationFrame(this._rAFId);
		delete this._startTime;
		delete this._remaining;
		delete this._elapsed;
		this._initialized = false;
		this.setData('ltPropState', '');
		if (this.initialize()) {
			this.printValue(this.getData('ltPropStart'));
		}
	},
	update: function (endVal) {
		if (!this._initialized) {
			return;
		}
		if (!this.checkForNumber(endVal)) {
			return;
		}
		if (endVal === this._frameVal) {
			return;
		}
		window.cancelAnimationFrame(this._rAFId);
		this._paused = false;
		delete this._startTime;
		delete this._remaining;
		delete this._elapsed;
		this._startVal = this._frameVal;
		this.setData('ltPropEnd', endVal);
		this._endVal = endVal;
		this._endValue = this._endVal;
		this._countDown = (this._startVal > this._endVal);
		this._rAFId = window.requestAnimationFrame(this.count.bind(this));
	},
	resume: function () {
		if (this._initialized) {
			this._paused = false;
			delete this._startTime;
			if (this._elapsed == null && this._remaining != null && this._duration != null) {
				this._elapsed = Math.max(0, (this._duration || 0) - (this._remaining || 0));
			}
			this.setData('ltPropState', 'Running');
			this._rAFId = window.requestAnimationFrame(this.count.bind(this));
		}
	},
	count: function (rafTimestamp) {
		if (this._paused) {
			return;
		}
		var timestamp = (typeof rafTimestamp === 'number') ? rafTimestamp : ((window.performance && performance.now) ? performance.now() : Date.now());
		if (this._startTime == null) {
			this._startTime = timestamp;
		}
		this._timestamp = timestamp;
		var duration = this._duration || 0;
		var progress = (this._elapsed || 0) + (timestamp - this._startTime);
		progress = Math.max(0, Math.min(progress, duration));
		this._remaining = duration - progress;
		var easeFlag = false
		if (this.getData('ltPropUseEasing')) {
			if (this._countDown) {

				/**
				 * @method easingFunction
				 * @condition ltPropUseEasing true
				 * @author vidhya.d <vidhya.d@zohocorp.com>
				 * @version 1.0.0
				 * @param { * } progress
				 * @param { * } startValue
				 * @param { * } delta
				 * @param { * } duration
				 */
				var easeValue = this.executeMethod('easingFunction', progress, 0, this._startVal - this._endVal, duration);
				if (easeValue !== undefined) {
					easeFlag = true
					this._frameVal = this._startVal - easeValue
				}

			} else {
				var easeValue = this.executeMethod('easingFunction', progress, this._startVal, this._endVal - this._startVal, duration);
				if (easeValue !== undefined) {
					easeFlag = true
					this._frameVal = easeValue
				}

			}
		}
		if (!easeFlag) {
			if (this._countDown) {
				this._frameVal = this._startVal - ((this._startVal - this._endVal) * (duration ? (progress / duration) : 1));
			} else {
				this._frameVal = this._startVal + (this._endVal - this._startVal) * (duration ? (progress / duration) : 1);
			}
		}
		var totalSteps = Math.abs(this._endVal - this._startVal);
		var displayVal;
		if (this._decimals === 0 && totalSteps > 0) {
			var stepDuration = duration / totalSteps;
			var currentStep = Math.min(totalSteps, Math.floor(progress / stepDuration));
			displayVal = this._countDown ? (this._startVal - currentStep) : (this._startVal + currentStep);
		} else {
			if (this._countDown) {
				this._frameVal = (this._frameVal < this._endVal) ? this._endVal : this._frameVal;
			} else {
				this._frameVal = (this._frameVal > this._endVal) ? this._endVal : this._frameVal;
			}
			displayVal = Math.round(this._frameVal * this._dec) / this._dec;
		}
		this.printValue(displayVal);
		if (progress <= duration) {
			var func1 = this.count.bind(this);
			this._rAFId = window.requestAnimationFrame(func1);

		}
		else {
			var self = this;
			if (this.getData('ltPropAria')) {
				var counterDiv = this.$node.querySelector('.counterDiv')
				counterDiv.focus()
			}
			setTimeout(function () {
				if (self.getMethods('onComplete')) {
					/**
					 * @method onComplete
					 * @author vidhya.d <vidhya.d @zohocorp.com>
					 * @version 1.0.0
					 */
					self.executeMethod('onComplete')
				}
			}, 100);
			this.setData('ltPropState', '');
			this._initialized = false;
			delete this._elapsed;
			delete this._startTime;
		}
	},
	initialize: function () {
		if (this._initialized) {
			return true;
		}
		if (this.checkForNumber(this._startVal) && this.checkForNumber(this._endVal)) {
			this._decimals = Math.max(0, this.getData('ltPropDecimals') || 0)
			this._dec = Math.pow(10, this._decimals)
			this._duration = Number(this.getData('ltPropDuration')) * 1000 || 2000
			this._countDown = (this._startVal > this._endVal)
			this._frameVal = this._startVal
			this._initialized = true
			this.printValue(this._startVal)
			return true
		}
		return false;
	},
	checkForNumber: function (n) {
		var num = Number(n)
		return (typeof num === 'number' && !isNaN(num));
	},
	printValue: function (value) {
		var result;
		if (this.getMethods('onValueChange')) {
			/**
			 * @method onValueChange
			 * @author vidhya.d <vidhya.d @zohocorp.com>
			 * @version 1.0.0
			 * @param { * } value
			 * @param { * } component
			 */
			result = this.executeMethod('onValueChange', value, this)
		}
		if (!result) {
			result = this.formatNumber(value)
		}
		this.setData('result', result);


	},
	formatNumber: function (num) {
		var neg = (num < 0), x, x1, x2, x3, i, len;
		num = Math.abs(num).toFixed(this.getData('ltPropDecimals'));
		num += '';
		x = num.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? this.getData('ltPropDecimalSeparator') + x[1] : '';
		if (this.getData('ltPropUseGrouping')) {
			x3 = '';
			for (i = 0, len = x1.length; i < len; ++i) {
				if (i !== 0 && ((i % 3) === 0)) {
					x3 = this.getData('ltPropSeparator') + x3;
				}
				x3 = x1[len - i - 1] + x3;
			}
			x1 = x3;
		}
		this.setData('negative', (neg ? '-' : ''));
		return x1 + x2;
	},
	methods: {
		easingFunction: function (t, b, c, d) {
			return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
		}
	}
});

/**
 * @syntax nonYielded 
 * <lyte-counter ></lyte-counter> 
 */