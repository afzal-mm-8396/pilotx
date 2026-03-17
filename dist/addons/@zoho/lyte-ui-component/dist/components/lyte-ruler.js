Lyte.Component.register("lyte-ruler", {
_template:"<template tag-name=\"lyte-ruler\" lyte-ruler=\"\"> <div class=\"horizontalRuler rulerElem\"> <span class=\"pointerTracker horizontalTracker\"></span> <template is=\"for\" items=\"{{horizontalData}}\" item=\"item\" index=\"index\"> <div class=\"horizontalSegment {{item.type}}\"> {{item.value}} </div> </template> </div> <div class=\"verticalRuler rulerElem\"> <span class=\"pointerTracker verticalTracker\"></span> <template is=\"for\" items=\"{{verticalData}}\" item=\"item\" index=\"index\"> <div class=\"verticalSegment {{item.type}}\"> {{item.value}}</div> </template> </div> <lyte-menu lt-prop-content=\"{{unitArray}}\" lt-prop-event=\"contextmenu\" lt-prop-query=\".rulerElem\" on-menu-click=\"{{method('changeUnit')}}\"></lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},{"type":"attr","position":[3,3]},{"type":"for","position":[3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["ltPropWrapper","ltPropTarget","ltPropUnit","ltPropMarkerEvent","targetDimensions","wrapperDimensions","horizontalData","verticalData","topExtras","bottomExtras","leftExtras","rightExtras","unitArray","markerPositions"],
_observedAttributesType :["string","string","string","string","object","object","array","array","number","number","number","number","array","array"],

	data: function () {
		return {
			ltPropWrapper: Lyte.attr('string', {
				default: ""
			}),
			ltPropTarget: Lyte.attr('string', {
				default: ""
			}),
			ltPropUnit: Lyte.attr('string', {
				default: "percentage" // percentage || pixels || inches || centimeters || millimeters || point || picas
			}),
			ltPropMarkerEvent : Lyte.attr('string', {
				default: "drag" // drag || click
			}),

			targetDimensions: Lyte.attr('object', {
				default: {}
			}),
			wrapperDimensions: Lyte.attr('object', {
				default: {}
			}),
			horizontalData: Lyte.attr('array', {
				default: []
			}),
			verticalData: Lyte.attr('array', {
				default: []
			}),
			topExtras: Lyte.attr('number', {
				default: 0
			}),
			bottomExtras: Lyte.attr('number', {
				default: 0
			}),
			leftExtras: Lyte.attr('number', {
				default: 0
			}),
			rightExtras: Lyte.attr('number', {
				default: 0
			}),
			unitArray: Lyte.attr('array', {
				default: ["percentage", "pixels", "inches", "centimeters", "millimeters", "point", "picas"]
			}),
			markerPositions: Lyte.attr('array', {
				default: [
					{ horizontalPositions: [], verticalPositions: [] }
				]
			})
		}
	},
	didConnect: function () {
		this.initialFunctions();
	},
	initialFunctions: function () {
		let _this = this,
			unit = this.getData('ltPropUnit');
		
		this.setData({
			targetDimensions: this.getBCR($L(this.getData('ltPropTarget'))[0]),
			wrapperDimensions: this.getBCR($L(this.getData('ltPropWrapper'))[0])
		})

		this.calculateScale(unit)

		let markerEvent;
		switch (this.getData("ltPropMarkerEvent")) {
			case "drag":
				markerEvent = "mousedown"
				break;
			case "click":
				markerEvent = "click"
				break;
			default:
				markerEvent = "mousedown"
				break;
		}

		$L(this.getData('ltPropWrapper'))[0].addEventListener('mousemove', this.moveTrackers.bind(this))
		Array.from($L('.rulerElem')).forEach(function (elem) {
			elem.addEventListener(markerEvent, _this.generateMarker)
		})


		 // ResizeObserver for width & height changes
		const resizeObserver = new ResizeObserver(entries => {
			 for (const entry of entries) {
				 this.calculateScale(this.getData('ltPropUnit'), entry)
				 
			}
		});
	  
		  // MutationObserver for inline style changes (e.g., top, left)
		const mutationObserver = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.attributeName === "style") {
					this.calculateScale(this.getData('ltPropUnit'), mutation)
			  }
			}
		});
	  
		  // IntersectionObserver for viewport position changes
		const intersectionObserver = new IntersectionObserver(entries => {
			  for (const entry of entries) {
					this.calculateScale(this.getData('ltPropUnit'), entry)
			}
		}, {
			root:$L(this.getData('ltPropWrapper'))[0] , // Observe relative to parent
			threshold: 0.1 // Trigger when at least 10% of the div is visible
		});

		resizeObserver.observe($L(this.getData('ltPropTarget'))[0]);
    	mutationObserver.observe($L(this.getData('ltPropTarget'))[0], { attributes: true, attributeFilter: ["style"] });
		intersectionObserver.observe($L(this.getData('ltPropTarget'))[0]);
		
	},
	calculateScale: function (unit) { 
		if ($L(".lyteMarkerElement").length) { 
			this.moveMarkers();
		}
		this.setBCR();
		let wrapperDimensions = this.getData('wrapperDimensions'),
			targetDimensions = this.getData('targetDimensions');
		
		switch (unit) { 
			case "percentage": { 
				let normalWidthDiff = targetDimensions.width / 10,
					normalHeightDiff = targetDimensions.height / 10;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / normalWidthDiff),
					verticalNumber = Math.ceil(wrapperDimensions.height / normalHeightDiff)

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;
				
				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / normalWidthDiff), 2),
					rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / normalWidthDiff), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / normalHeightDiff), 2),
					bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / normalHeightDiff), 2);
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (10 + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = leftExtras - i;
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = i - (leftExtras + 10);
					} else { 
						obj.type = "Xmain";
						obj.value = i - leftExtras;
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (10 + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = topExtras - i;
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = i - (topExtras + 10);
					} else { 
						obj.type = "Ymain";
						obj.value = i - topExtras;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', normalWidthDiff + "px");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', normalHeightDiff + "px");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			case "pixels": {
				let pixelDiff = 100, cssUnitFactor = 1; 
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / (pixelDiff * cssUnitFactor)),
				verticalNumber = Math.ceil(wrapperDimensions.height / (pixelDiff * cssUnitFactor));

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				
				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / (pixelDiff * cssUnitFactor)), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / (pixelDiff * cssUnitFactor)), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / (pixelDiff * cssUnitFactor)), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / (pixelDiff * cssUnitFactor)), 2);
				
				let horizontalMainNumber = targetDimensions.width / (pixelDiff * cssUnitFactor),
					verticalMainNumber = targetDimensions.height / (pixelDiff * cssUnitFactor); 
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * (pixelDiff * cssUnitFactor);
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * (pixelDiff * cssUnitFactor);
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * (pixelDiff * cssUnitFactor);
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < verticalMainNumber + topExtras + bottomExtras; i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * (pixelDiff * cssUnitFactor); 
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * (pixelDiff * cssUnitFactor);
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * (pixelDiff * cssUnitFactor);
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', pixelDiff + "px");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', pixelDiff + "px");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");

				break;
			}
			case "inches": {
				let scaleDiff = this.generateDummyDiv("inches"), cssUnitFactor = 1;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / scaleDiff),
				verticalNumber = Math.ceil(wrapperDimensions.height / scaleDiff);

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / scaleDiff), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / scaleDiff), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / scaleDiff), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / scaleDiff), 2);
				
				let horizontalMainNumber = targetDimensions.width / (scaleDiff * cssUnitFactor),
					verticalMainNumber = targetDimensions.height / (scaleDiff * cssUnitFactor);
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * cssUnitFactor; 
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * cssUnitFactor; 
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * cssUnitFactor; 
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (verticalMainNumber + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * cssUnitFactor; 
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', cssUnitFactor + "in");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', cssUnitFactor + "in");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			case "centimeters": {
				let scaleDiff = this.generateDummyDiv("cm"), cssUnitFactor = 2;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / (scaleDiff * cssUnitFactor)),
				verticalNumber = Math.ceil(wrapperDimensions.height / (scaleDiff * cssUnitFactor));

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / (scaleDiff * cssUnitFactor)), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / (scaleDiff * cssUnitFactor)), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / (scaleDiff * cssUnitFactor)), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / (scaleDiff * cssUnitFactor)), 2);
				
				let horizontalMainNumber = targetDimensions.width / (scaleDiff * cssUnitFactor),
				verticalMainNumber = targetDimensions.height / (scaleDiff * cssUnitFactor);
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (verticalMainNumber + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', cssUnitFactor + "cm");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', cssUnitFactor + "cm");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			case "millimeters": {
				let scaleDiff = this.generateDummyDiv("mm"), cssUnitFactor = 20;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / (scaleDiff * cssUnitFactor)),
				verticalNumber = Math.ceil(wrapperDimensions.height / (scaleDiff * cssUnitFactor));

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / (scaleDiff * cssUnitFactor)), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / (scaleDiff * cssUnitFactor)), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / (scaleDiff * cssUnitFactor)), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / (scaleDiff * cssUnitFactor)), 2);
				
				let horizontalMainNumber = targetDimensions.width / (scaleDiff * cssUnitFactor),
					verticalMainNumber = targetDimensions.height / (scaleDiff * cssUnitFactor);
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (verticalMainNumber + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', cssUnitFactor + "mm");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', cssUnitFactor + "mm");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			case "point": {
				let scaleDiff = this.generateDummyDiv("pt"), cssUnitFactor = 50;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / (scaleDiff * cssUnitFactor)),
				verticalNumber = Math.ceil(wrapperDimensions.height / (scaleDiff * cssUnitFactor));

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / (scaleDiff * cssUnitFactor)), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / (scaleDiff * cssUnitFactor)), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / (scaleDiff * cssUnitFactor)), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / (scaleDiff * cssUnitFactor)), 2);
				
				let horizontalMainNumber = targetDimensions.width / (scaleDiff * cssUnitFactor),
				verticalMainNumber = targetDimensions.height / (scaleDiff * cssUnitFactor);
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (verticalMainNumber + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', cssUnitFactor + "pt");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', cssUnitFactor + "pt");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			case "picas": {
				let scaleDiff = this.generateDummyDiv("picas"), cssUnitFactor = 10;
				
				let horizontalnumber = Math.ceil(wrapperDimensions.width / (scaleDiff * cssUnitFactor)),
				verticalNumber = Math.ceil(wrapperDimensions.height / (scaleDiff * cssUnitFactor));

				horizontalnumber = horizontalnumber & 1 ? horizontalnumber + 1 : horizontalnumber;
				verticalNumber = verticalNumber & 1 ? verticalNumber + 1 : verticalNumber;

				let leftExtras = Math.max(Math.ceil((targetDimensions.left - wrapperDimensions.left) / (scaleDiff * cssUnitFactor)), 2),
				rightExtras = Math.max(Math.ceil((wrapperDimensions.right - targetDimensions.right) / (scaleDiff * cssUnitFactor)), 2);
				let topExtras = Math.max(Math.ceil((targetDimensions.top - wrapperDimensions.top) / (scaleDiff * cssUnitFactor)), 2),
				bottomExtras = Math.max(Math.ceil((wrapperDimensions.bottom - targetDimensions.bottom) / (scaleDiff * cssUnitFactor)), 2);
				
				let horizontalMainNumber = targetDimensions.width / (scaleDiff * cssUnitFactor),
					verticalMainNumber = targetDimensions.height / (scaleDiff * cssUnitFactor);
				
				this.setData({
					leftExtras: leftExtras,
					rightExtras: rightExtras,
					topExtras: topExtras,
					bottomExtras: bottomExtras,
					horizontalData: [],
					verticalData: []
				})

				for (let i = 0; i < (horizontalMainNumber + leftExtras + rightExtras); i++) {
					let obj = {};

					if (i < leftExtras) {
						obj.type = "leftExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else if (i > 9 + leftExtras) {
						obj.type = "rightExtra";
						obj.value = (i - leftExtras) * cssUnitFactor;
					} else { 
						obj.type = "Xmain";
						obj.value = (i - leftExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('horizontalData') , 'push' , obj);
				}
		
				for (let i = 0; i < (verticalMainNumber + topExtras + bottomExtras); i++) {
					let obj = {};

					if (i < topExtras) {
						obj.type = "topExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else if (i > 9 + topExtras) {
						obj.type = "bottomExtra";
						obj.value = (i - topExtras) * cssUnitFactor;
					} else { 
						obj.type = "Ymain";
						obj.value = (i - topExtras) * cssUnitFactor;
					}

					Lyte.arrayUtils( this.getData('verticalData') , 'push' , obj);
				}
				
				let lastRulerTop = parseFloat(this.$node.style.getPropertyValue('--ruler-top')) || 0,
					lastRulerLeft = parseFloat(this.$node.style.getPropertyValue('--ruler-left')) || 0;
				
				this.$node.style.setProperty('--ruler-width', cssUnitFactor + "pc");
				this.$node.style.setProperty('--ruler-left', lastRulerLeft +  targetDimensions.left - this.getBCR($L('.Xmain')[0]).left + "px");
				this.$node.style.setProperty('--ruler-height', cssUnitFactor + "pc");
				this.$node.style.setProperty('--ruler-top', lastRulerTop +  targetDimensions.top - this.getBCR($L('.Ymain')[0]).top + "px");
				break;
			}
			default: { 
				break;
			}
		}
	},
	moveTrackers: function (event) { 
		let horizontalRuler = $L('.horizontalRuler', this.$node)[0],
			verticalRuler = $L('.verticalRuler', this.$node)[0]
		this.$node.style.setProperty('--tracker-left',  event.clientX - this.getBCR(horizontalRuler).left  + "px");
		this.$node.style.setProperty('--tracker-top',  event.clientY - this.getBCR(verticalRuler).top + "px");
	},
	generateMarker: function (event) {
		if (event.buttons === 2) { 
			return;
		}
		let _this = $L(this).closest('lyte-ruler')[0].component,
			markerSpan = document.createElement("span"),
			wrapperDimensions = _this.getData('wrapperDimensions')
		
		markerSpan.classList.add("lyteMarkerElement");
		markerSpan.setAttribute('lyte-marker-id', 'lyteMarker_' + Math.random().toString(36).substring(2, 10))

		this.parentNode.appendChild(markerSpan)

		if (this.classList.contains('horizontalRuler')) {
			if (_this.getData("markerPositions")[0].horizontalPositions.includes(parseInt(event.clientX - wrapperDimensions.left))) { 
				markerSpan.remove();;
				return
			}
			markerSpan.style.height = "100%";
			markerSpan.style.width = "1px";
			markerSpan.style.top = "0px"; 
			markerSpan.style.left = (event.clientX - wrapperDimensions.left) + "px";

			Lyte.arrayUtils(_this.getData("markerPositions")[0].horizontalPositions, 'push', parseInt(markerSpan.style.left));
			markerSpan.classList.add("lyteVerticalMarker");

		} else if (this.classList.contains('verticalRuler')) { 
			if (_this.getData("markerPositions")[0].verticalPositions.includes(parseInt(event.clientY - wrapperDimensions.top))) { 
				markerSpan.remove();;
				return
			}
			markerSpan.style.width = "100%";
			markerSpan.style.height = "1px";
			markerSpan.style.left = "0px"; 
			markerSpan.style.top = (event.clientY - wrapperDimensions.top) + "px";

			Lyte.arrayUtils(_this.getData("markerPositions")[0].verticalPositions, 'push', parseInt(markerSpan.style.top));
			markerSpan.classList.add("lyteHorizontalMarker");
		}
	},
	moveMarkers: function () { 
		let markers = Array.from($L('.lyteMarkerElement'));
		let targetBCR = this.getBCR($L(this.getData("ltPropTarget"))[0]);
		let leftDiff = this.getData("targetDimensions").left - targetBCR.left,
			topDiff = this.getData("targetDimensions").top - targetBCR.top;

		markers.forEach(function (elem) { 
			if (elem.classList.contains("lyteHorizontalMarker")) { 
				elem.style.top = parseFloat(elem.style.top) - topDiff + "px";
			} else if (elem.classList.contains("lyteVerticalMarker")) { 
				elem.style.left = parseFloat(elem.style.left) - leftDiff + "px";
			}
		})
	},
	generateDummyDiv: function (unit) { 
		let dummyDiv = document.createElement("div");
		dummyDiv.style.display = "hidden";
		dummyDiv.style.position = "absolute";
		document.body.appendChild(dummyDiv);
		switch (unit) {
			case "inches":
				dummyDiv.style.width = "1in";
				break;
			case "cm":
				dummyDiv.style.width = "1cm";
				break;
			case "mm": 
				dummyDiv.style.width = "1mm";
				break;
			case "pt":	
				dummyDiv.style.width = "1pt";
				break;
			case "picas":
				dummyDiv.style.width = "1pc";
				break;
			default:
				break;
		}
		let dummyDivBCR = this.getBCR(dummyDiv);
		dummyDiv.remove();	
		return dummyDivBCR.width;
	},
	setBCR: function () { 
		this.setData("targetDimensions", this.getBCR($L(this.getData("ltPropTarget"))[0]));
		this.setData("wrapperDimensions", this.getBCR($L(this.getData("ltPropWrapper"))[0]));
	},
	getBCR: function(elem) { 
		return elem.getBoundingClientRect();
	},
	actions : {
		// Functions for event handling
	},
	methods: {
		changeUnit: function (value) { 
			this.setData('ltPropUnit', value)
			this.calculateScale(value);
		}
		// Functions which can be used as callback in the component.
	}
});