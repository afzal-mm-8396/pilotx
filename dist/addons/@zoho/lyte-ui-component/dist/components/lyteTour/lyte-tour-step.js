/**
 * Renders a tour step component
 * @component lyte-tour-step
 * @version 3.1.0
 * @methods onChange, onBeforeChange
 */

 Lyte.Component.register("lyte-tour-step", {
_template:"<template tag-name=\"lyte-tour-step\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" lt-prop-query=\".lyteTourContainer\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourStep {{ltPropClass}}\"> <lyte-yield yield-name=\"lyteTourStep\"></lyte-yield> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBindToBody","ltPropSelector","ltPropClickable","ltPropArrowPosition","ltPropPosition","ltPropScrollToView","ltPropClass","ltPropHostElement","arrowPositionOnBox","initialArrowFlag"],
_observedAttributesType :["boolean","string","boolean","string","string","boolean","string","string","string","boolean"],

	data : function(){
		return {
			'ltPropBindToBody' 	: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {string} ltPropSelector
			 */

			'ltPropSelector'	 	: Lyte.attr('string'),
			'ltPropClickable'		: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {start | end |center} ltPropArrowPosition
			 * @default start
			 */

			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }), //start , end , center

				/**
			 * @componentProperty {right|left|top|bottom} ltPropPosition
			 * @default right
			 * @options right , left , top , bottom
			 */

			'ltPropPosition'		: Lyte.attr('string' , { default : 'right' }), // right , left , top , bottom
			'ltPropScrollToView': Lyte.attr('boolean' , { default : false }),
			'ltPropClass' : Lyte.attr('string'),
			'ltPropHostElement' : Lyte.attr('string' , {
				default : ''
			}),

			'arrowPositionOnBox': Lyte.attr('string' , {default : 'left'}),
			'initialArrowFlag'	: Lyte.attr('boolean' , {default : false})
		}
	},

	startLyteStep : function( th , fromParent){

		var _this = th.component;

		var parentTour = $L(this.$node).closest('lyte-tour')[0]

		// FIX: Maybe this is a different function
		if(this.getData('ltPropPosition') === 'right'){
			this.setData('arrowPositionOnBox' , 'left');
		} else if(this.getData('ltPropPosition') === 'left'){
			this.setData('arrowPositionOnBox' , 'right');
		} else if(this.getData('ltPropPosition') === 'top'){
			this.setData('arrowPositionOnBox' , 'bottom');
		} else if(this.getData('ltPropPosition') === 'bottom'){
			this.setData('arrowPositionOnBox' , 'top');
		}

		if($L('.lyteTourClipMask').length>0){
			$L('.lyteTourClipMask')[0].remove()
		}

		// FIX: Not sure if the th. should be there. Maybe it needs to be just this.
		if(th && th.getData('ltPropBindToBody') && !fromParent){
			th.setData('ltPropBindToBody' , false)
		}
		th.setData('ltPropBindToBody' , true);

		// FIX: Global selector - This and the next statement must be a single function -> this.changeActiveStep()
		if($L('.lyteTourActiveTarget').length){
			$L('.lyteTourActiveTarget').removeClass('lyteTourActiveTarget');
		}

		var currentStepTarget = $L(this.getData('ltPropSelector'))[0];

		var tar = $L(this.getData('ltPropSelector'))[0]
		var tarDim = {}
		var parentHostDim = {}
		parentHostDim.left = 0
		parentHostDim.top = 0
		parentHostDim.bottom = 0
		parentHostDim.right = 0
		parentHostDim.width = 0
		parentHostDim.height = 0

		if(!tar && this.getData('ltPropHostElement') !== ''){
			// $0.contentDocument.querySelector("lyte-button").getBoundingClientRect().top + $0.getBoundingClientRect().top
			tar = $L(document.querySelector(this.getData('ltPropHostElement')))[0].contentDocument.querySelector(this.getData('ltPropSelector'))
			currentStepTarget = tar
			subTargetDim = tar.getBoundingClientRect()
			tarDim = {}
			parentHostDim = document.querySelector(this.getData('ltPropHostElement')).getBoundingClientRect()
			tarDim.top = subTargetDim.top + parentHostDim.top
			tarDim.left = subTargetDim.left + parentHostDim.left
		} else {
			if(tar){
				tarDim = tar.getBoundingClientRect();
			}
		}

		if(parentTour.getData('ltPropCreateDummy')){

			var body = $L('body')[0]
			var selectorString = this.getData('ltPropSelector').split(".")[1]

			var dummy;
			var dummyWrap;

			if($L(this.getData('ltPropSelector')+"Dummy").length){
				dummy = $L(this.getData('ltPropSelector')+"Dummy")[0]
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
			} else {
				dummy = tar.cloneNode(true)
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
				dummy.classList.add(selectorString+"Dummy")
			}

			var tourWrap = $L('.lyteTourWrap')[0]



			if($L('.lyteTourDummyWrap').length){
				dummyWrap = $L('.lyteTourDummyWrap')[0]
			} else {
				 dummyWrap = document.createElement('DIV')
				 dummyWrap.setAttribute("class" , "lyteTourDummyWrap");
			}



			var border = getComputedStyle(tar).borderRadius;

			dummy.style.position = "absolute";
			dummy.style.top = tarDim.top + "px";
			dummy.style.left = tarDim.left + "px";
			dummy.style.width = tarDim.width + "px";
			dummy.style.height = tarDim.height + "px";

			body.appendChild(dummyWrap)
			dummyWrap.appendChild(dummy)
			currentStepTarget = dummy;
		} else if(!parentTour.getData('ltPropCreateDummy')){
			var tourFreeze = $L('.lyteTourFreezeLayer')[0];
			if(tourFreeze){
				var clipDiv = document.createElement("DIV");
				$L(clipDiv).addClass('lyteTourClipMask')
				// $L(clipDiv).addClass($L(tar).attr('class'))
				clipDiv.style.position = "absolute";
				clipDiv.style.top = tarDim.top +"px"
				clipDiv.style.left = tarDim.left +"px"
				clipDiv.style.width = getComputedStyle(tar).width
				clipDiv.style.height = getComputedStyle(tar).height
				clipDiv.style.borderRadius = getComputedStyle(tar).borderRadius
				tourFreeze.appendChild(clipDiv)
			}	
		}



		// FIX: global selector
		$L('.lyteTourStep')[0].classList.add('lyteTourActiveStep');

		// FIX: Global selector can cause problem
		var lyteTourContainer = $L('.lyteTourContainer')[0];
		var stepData = lyteTourContainer.getBoundingClientRect();

		// FIX: Reuse get bounding client rects - no need to invoke them again
		var cs_top = stepData.top,
				cs_bottom = stepData.bottom,
				cs_right = stepData.right,
				cs_left = stepData.left,
				cs_height = stepData.height,
				cs_width = stepData.width;

		var currentStepTargetDim = currentStepTarget.getBoundingClientRect();

		var cst_top = currentStepTargetDim.top + parentHostDim.top,
				cst_bottom = currentStepTargetDim.bottom+parentHostDim.top,
				cst_right = currentStepTargetDim.right+parentHostDim.left,
				cst_left = currentStepTargetDim.left + parentHostDim.left,
				cst_height = currentStepTargetDim.height,
				cst_width = currentStepTargetDim.width;

		var deviation = 12;

		var backDiv = $L('.lyteTourTargetBackground');

		currentStepTarget.classList.add('lyteTourActiveTarget')

		backDiv.css({
			'width' : currentStepTargetDim.width,
			'height' : currentStepTargetDim.height,
			'top' :  currentStepTargetDim.top + parentHostDim.top,
			'left' :  currentStepTargetDim.left + parentHostDim.left
		})

		if( !fromParent && this.getMethods('onRender')){
			this.executeMethod("onRender" , currentStepTarget , lyteTourContainer)
		}

		var tourNewTop;
		var arrowNewTop;

		var initialArrowFlag = false;

		var tourMidHeight = lyteTourContainer.getBoundingClientRect().height / 2;
		var targetMidHeight = currentStepTarget.getBoundingClientRect().top + (currentStepTarget.getBoundingClientRect().height / 2);
		var tourMidWidth = lyteTourContainer.getBoundingClientRect().width / 2;
		var targetMidWidth = currentStepTarget.getBoundingClientRect().left + (currentStepTarget.getBoundingClientRect().width / 2);

		var lyteTourArrow = $L('.lyteTourArrow')[0];
		if(lyteTourArrow){

			lyteTourArrow.style.transform = "rotate(45deg)"
			var arrowData = lyteTourArrow.getBoundingClientRect();

		}


		function arrowTranslate( placement , side){
			var returnVal = {};
			var arrowRotateVal = 45;
			var arrowUserPref = _this.getData('ltPropArrowPosition');

			if(!placement){
				placement = _this.getData('ltPropArrowPosition');
			}
			if(!side){
				side = _this.getData('arrowPositionOnBox');
			}

			switch ( side ){

				case 'left':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourLeftArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'top':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourTopArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'right':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourRightArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'bottom':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourBottomArrow').addClass('lyteTourDefaultArrow');

				break;

			}

			lyteTourArrow = $L('.lyteTourDefaultArrow')[0];
			arrowData = lyteTourArrow.getBoundingClientRect();



			var arrowPlacement = side + (placement.charAt(0).toUpperCase() + placement.slice(1));

			var arrowNewX = -(arrowData.width/2),
					arrowNewY = ((Math.sqrt(2)*arrowData.width - arrowData.width)/2) + 20 ;

			var arrowTranslateVals = setArrowPosition(arrowPlacement);

			arrowNewX = arrowTranslateVals.xValue;
			arrowNewY = arrowTranslateVals.yValue;


			returnVal.arrowVal = "translate(" + arrowNewX + " ," + arrowNewY + ") rotate("+ 45 +"deg)";

			return returnVal;

		}

		function setArrowPosition( placement ){

			var arrowXVal , arrowYVal;
			var retVal = {};
			var arrow = $L('.lyteTourDefaultArrow')[0];

			var arrowWidth = parseFloat(getComputedStyle(arrow).width)
			
			var arrowBorderLeftVal = parseFloat(getComputedStyle(arrow).borderLeftWidth.replace(/px/g, ''))
			var arrowBorderRightVal = parseFloat(getComputedStyle(arrow).borderRightWidth.replace(/px/g, ''))
			var arrowBorderTopVal = parseFloat(getComputedStyle(arrow).borderTopWidth.replace(/px/g, ''))
			var arrowBorderBottomVal = parseFloat(getComputedStyle(arrow).borderBottomWidth.replace(/px/g, ''))
			var borderVal = 0

			if(arrowBorderLeftVal > 0){
				borderVal = arrowBorderLeftVal
			} else if(arrowBorderRightVal > 0){
				borderVal = arrowBorderRightVal
			} else if(arrowBorderTopVal > 0){
				borderVal = arrowBorderTopVal
			} else if(arrowBorderBottomVal > 0){
				borderVal = arrowBorderBottomVal 
			} 

			switch ( placement ){

				case 'leftStart':
				case 'rightStart':
				arrowXVal = '-50%';
				if(placement === 'rightStart'){
					arrowXVal = '50%';
				}
				if(cs_height < cst_height){
					arrowYVal = 20 + "px";
				} else {
					arrowYVal = ((cst_height - arrowWidth) / 2) + "px";
				}
				break;

				case 'leftEnd':
				case 'rightEnd':
				if(cs_height < cst_height){
					arrowYVal = (cs_height - 20) + "px";
				} else {
					arrowYVal = cs_height - ((cst_height - arrowWidth) / 2) + "px";
				}
				arrowXVal = '-50%';
				if(placement === 'rightEnd'){
					arrowXVal = '50%';
				}
				break;

				case 'leftCenter':
				case 'rightCenter':	
				arrowXVal = '-50%';
				if(placement === 'rightCenter'){
					arrowXVal = '50%';
				}
				arrowYVal = ((cs_height - arrowWidth + borderVal)/2) + "px";
				break;

				case 'topCenter':
				case 'bottomCenter':	
				arrowYVal = '-50%';
				if(placement === 'bottomCenter'){
					arrowYVal = '50%';
				}
				arrowXVal = ((cs_width - arrowWidth + borderVal)/2) + "px";
				break;

				case 'topStart':
				case 'bottomStart':
				arrowXVal = ((cst_width - arrowWidth) / 2) + "px";
				arrowYVal = '-50%';
				if(placement === 'bottomStart'){
					arrowYVal = '50%';
				}
				break;

				case 'topEnd':
				case 'bottomEnd':
				arrowXVal = cs_width - ((cst_width - arrowWidth) / 2) + "px";
				arrowYVal = '-50%';
				if(placement === 'bottomEnd'){
					arrowYVal = '50%';
				}
				break;

			} 

			retVal.xValue = arrowXVal;
			retVal.yValue = arrowYVal;

			return retVal;

		}

		function setArrowStyle(placement , side){
			var arrowTransVal = arrowTranslate( placement , side );

			if(!($L('lyte-tour')[0].component.getData('ltPropFixedArrow'))){
				$L('.lyteTourArrow').css({
					'transform' : arrowTransVal.arrowVal
				})
				initialArrowFlag = true;
			}
		}

		function stepTranslate(){

			var userPref = _this.getData('ltPropPosition');
			var stepNewX = 10 , stepNewY = 10;
			var returnVal = {};
			var arrowPlace = _this.getData('ltPropArrowPosition');
			var arrow = $L('.lyteTourArrow')[0];
			var arrowDia = _this.$node.closest('lyte-tour').getData('arrowDiagonalLength');

			var setArrowPos = _this.getData('ltPropArrowPosition');
			var setArrowSide = _this.getData('ltPropPosition');

			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;

			if(arrowDia < 1){
				arrowDia = parseFloat(parentTour.getData('ltPropMarginFromTarget'))
			}

			switch(userPref){

				case 'right':

				stepNewX = cst_right + arrowDia;
				stepNewY = cst_top - deviation;
				if(setArrowPos === "center"){
					if(cs_height > cst_height){
						stepNewY = cst_top - (Math.abs(cst_height - cs_height))/2
					}
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				setArrowSide = "left"

				if((cst_right + cs_width) > windowWidth){
					stepNewX = cst_left  - (cs_width + arrowDia)
					setArrowSide = "right"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(cs_height < windowHeight && ((cst_top + cs_height) < windowHeight)){
					if(cs_height > cst_height){
						stepNewY = cst_top - (Math.abs(cst_height - cs_height))/2
					}
					deviation = 0;
					setArrowPos = "center";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

				case 'left' :

				stepNewX = cst_left - (cs_width + arrowDia)
				stepNewY = cst_top - deviation;

				setArrowSide = "right"

				if(setArrowPos === "center"){
					if(cs_height > cst_height){
						stepNewY = cst_top - (Math.abs(cst_height - cs_height))/2
					}
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				if(cst_left < cs_width){
					stepNewX = cst_right + arrowDia;
					setArrowSide = "left"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(cs_height < windowHeight && (cst_top + cs_height) < windowHeight ){
					if(cs_height > cst_height){
						stepNewY = cst_top - (Math.abs(cst_height - cs_height))/2
					}
					deviation = 0;
					setArrowPos = "center";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;


				// The same applies for these to case blocks
				case 'top':

				stepNewY = cst_top - (cs_height + arrowDia);
				stepNewX = cst_left - deviation

				setArrowSide = "bottom"

				if(setArrowPos === "center"){
					if(cs_width > cst_width){
						stepNewX = cst_left - (Math.abs(cst_width - cs_width))/2
					}
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left  - cs_width + cst_width + deviation
				}

				if(cst_top < cs_height){
					stepNewY = cst_bottom + arrowDia;
					setArrowSide = "top"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left  - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(cs_width < windowWidth && (cst_left + cs_width) < windowWidth) {
					if(cs_width > cst_width){
						stepNewX = cst_left - (Math.abs(cst_width - cs_width))/2
					}
					deviation = 0;
					setArrowPos = "center";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

				case 'bottom':

				stepNewX = cst_left - deviation;
				stepNewY = cst_bottom + arrowDia;

				setArrowSide = "top"

				if(setArrowPos === "center"){
					if(cs_width > cst_width){
						stepNewX = cst_left - (Math.abs(cst_width - cs_width))/2
					}
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left - cs_width + cst_width + deviation
				}

				if((cst_bottom + cs_height) > windowHeight){
					stepNewY = cst_top - (cs_height + arrowDia)
					setArrowSide = "bottom"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(cs_width < windowWidth && (cst_left + cs_width) < windowWidth ){
					if(cs_width > cst_width){
						stepNewX = cst_left - (Math.abs(cst_width - cs_width))/2
					}
					deviation = 0;
					setArrowPos = "center";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

			}

			returnVal.stepNewX = stepNewX
			returnVal.stepNewY = stepNewY

			returnVal.stepVal = "translate(" + stepNewX + "px ," + stepNewY + "px)";

			return returnVal;

		}

		var stepTranslateVal = stepTranslate();

		$L('.lyteTourContainer').css({
			'transform' : stepTranslateVal.stepVal
		})
		
		this.executeMethod('onChange' , currentStepTarget)

		if(parentTour.getData('ltPropPreventOutsideFocus') && $L('.lyteTourActiveStep')[0]){
			$L('.lyteTourActiveStep').trapFocus()
		}

	},

	methods : {
		onChange : function(){},
		onBeforeChange : function(){},
		beforeWormholeAppend : function(arg){
            if(this.childComp){
                delete this.childComp;
            }
            this.childComp = arg;
        }
	},
	didDestroy : function(){
		if($L('.lyteTourActiveTarget')[0]){
			$L('.lyteTourActiveTarget').removeClass('lyteTourActiveTarget')
		}
		if(this.childComp){
			this.childComp.remove();
			delete this.childComp;
		}
	}
});