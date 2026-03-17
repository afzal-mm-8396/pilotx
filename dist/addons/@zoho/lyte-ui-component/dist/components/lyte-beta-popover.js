if(typeof(_lyteBetaPopover) === 'undefined'){
	var _lyteBetaPopover = {}
}
window.addEventListener('click' , function(eve){
	if(LytePopup._stopPropagation){
		LytePopup._sourceComp.setData('ltPropStopClick', false);
		return;
	}
	if(_lyteUiUtils.popupStack){
		if(_lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.betaPopoverStack.length > 0){
			var lastPopup = _lyteUiUtils.popupStack.globalStack[ _lyteUiUtils.popupStack.globalStack.length - 1 ]
			if(
				(_lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length-1].parentElement === _lyteUiUtils.popupStack.betaPopoverStack[_lyteUiUtils.popupStack.betaPopoverStack.length-1].parentElement) ||
				(_lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length-1].parentElement.tagName === 'LYTE-POPOVER')
				){
				if(lastPopup.parentElement.tagName === "LYTE-BETA-POPOVER" && $L(lastPopup.parentElement).hasClass('lytePopoverOpened') && ($L(eve.target).attr('id') !== 'lytedropdownfreezelayer') && (eve.target.tagName !== 'LYTE-DROP-ITEM') && ($L(eve.target).closest('lyte-wormhole')[0] == lastPopup.childElement)){
					if($L(eve.target).closest('.lytePopoverElement')[0]){
						return;
					}
					if(!lastPopup.parentElement.getData('ltPropCloseOnBodyClick')){
						return
					}
					lastPopup.parentElement.setData('ltPropShow' , false);
				} else {
					lastPopup = _lyteUiUtils.popupStack.betaPopoverStack[ _lyteUiUtils.popupStack.betaPopoverStack.length - 1 ]
					if( ( _lyteUiUtils.popupStack.betaPopoverStack[ _lyteUiUtils.popupStack.betaPopoverStack.length - 1 ] !== _lyteUiUtils.popupStack.globalStack[ _lyteUiUtils.popupStack.globalStack.length - 1 ]) || !lastPopup.parentElement.getData('ltPropCloseOnBodyClick')){
						return
					}
					lastPopup.parentElement.setData('ltPropShow' , false);
				}
			}
		}
	}
},true);

window.addEventListener('resize' , function(eve){
	if(_lyteUiUtils.popupStack){
		if(_lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.betaPopoverStack.length > 0){
			for(var i=0;i<_lyteUiUtils.popupStack.betaPopoverStack.length;i++){
				var currentPopup = _lyteUiUtils.popupStack.betaPopoverStack[i].parentElement
				if(currentPopup.getData('ltPropCloseOnResize')){
					currentPopup.setData('ltPropShow' , false)
					return
				}
				if(!currentPopup.getData('ltPropOffsetForParent')){
					currentPopup.component.setPopoverPosition();
				} else {
					currentPopup.component.setDirectPopoverPosition();
				}
				if(currentPopup.component.getMethods('onResize')){
					currentPopup.component.executeMethod('onResize' , currentPopup.component , eve)
				}
			}
		}
	}
},true);

_lyteBetaPopover.scrollHandler = function(event){
	if($L(event.target).closest('.lytePopoverWrapper')[0]){
		return
	}
	if(_lyteUiUtils.targetAvailable){
		if(_lyteUiUtils.targetAvailable.originElem){
			var originElem = $L(_lyteUiUtils.targetAvailable.originElem)[0]
			if(_lyteUiUtils.targetAvailable && _lyteUiUtils.targetAvailable.closedOn){
				if(_lyteUiUtils.targetAvailable && _lyteUiUtils.targetAvailable.closedOn === 'top'){
					if(_lyteUiUtils.targetAvailable.top && originElem.getBoundingClientRect().top >= _lyteUiUtils.targetAvailable.top){
						_lyteUiUtils.targetAvailable.popover.setData('ltPropShow' , true)
						delete _lyteUiUtils.targetAvailable
					}
				} else if(_lyteUiUtils.targetAvailable && _lyteUiUtils.targetAvailable.closedOn === 'bottom'){
					if(_lyteUiUtils.targetAvailable.bottom && (window.innerHeight - (originElem.getBoundingClientRect().top + originElem.getBoundingClientRect().height)) >= _lyteUiUtils.targetAvailable.bottom){
						_lyteUiUtils.targetAvailable.popover.setData('ltPropShow' , true)
						delete _lyteUiUtils.targetAvailable
					}
				}
				if(_lyteUiUtils.targetAvailable && _lyteUiUtils.targetAvailable.closedOn === 'left'){
					if(_lyteUiUtils.targetAvailable.left && originElem.getBoundingClientRect().left >= _lyteUiUtils.targetAvailable.left){
						_lyteUiUtils.targetAvailable.popover.setData('ltPropShow' , true)
						delete _lyteUiUtils.targetAvailable
					}
				} else if(_lyteUiUtils.targetAvailable &&_lyteUiUtils.targetAvailable.closedOn === 'right'){
					if(_lyteUiUtils.targetAvailable.right && (window.innerWidth - (originElem.getBoundingClientRect().left + originElem.getBoundingClientRect().width)) >= _lyteUiUtils.targetAvailable.right){
						_lyteUiUtils.targetAvailable.popover.setData('ltPropShow' , true)
						delete _lyteUiUtils.targetAvailable
					}
				}
			}
		}
	}
	if(_lyteUiUtils.popupStack){
		if(_lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.betaPopoverStack.length > 0){
			for(var i=0;i<_lyteUiUtils.popupStack.betaPopoverStack.length;i++){
				var currentPopup = _lyteUiUtils.popupStack.betaPopoverStack[i].parentElement
				if(currentPopup){
					if(currentPopup.getData('ltPropCloseOnScroll')){
						if($L(event.target).closest('lyte-drop-box')[0] && $L(event.target).closest('lyte-drop-box')[0].origindd.closest('.lytePopover')){
							return
						}
						currentPopup.setData('ltPropShow' , false);
						return;
					}
	
					var currentWormhole = _lyteUiUtils.popupStack.betaPopoverStack[i].childElement
					if(currentWormhole && currentPopup.getData('ltPropScrollable')){
	
						if(!currentPopup.getData('ltPropOffsetForParent')){
							currentPopup.component.setPopoverPosition();
						} else {
							currentPopup.component.setDirectPopoverPosition();
						}
	
					}
					// will throw error in isPopoverInBoundary function if the originElem is not present (ltPropShow is false)
					if(!currentPopup.component.isPopoverInBoundary()){
						if(!_lyteUiUtils.targetAvailable){
							_lyteUiUtils.targetAvailable = {}
						}
						_lyteUiUtils.targetAvailable.popover = currentPopup
						if(currentPopup.getData('ltPropBoundary').top){
							_lyteUiUtils.targetAvailable.top = parseFloat(currentPopup.getData('ltPropBoundary').top)
						} else {
							_lyteUiUtils.targetAvailable.top = 0
						}
						if(currentPopup.getData('ltPropBoundary').left){
							_lyteUiUtils.targetAvailable.left = parseFloat(currentPopup.getData('ltPropBoundary').left)
						} else {
							_lyteUiUtils.targetAvailable.left = 0
						}
						if(currentPopup.getData('ltPropBoundary').bottom){
							_lyteUiUtils.targetAvailable.bottom = parseFloat(currentPopup.getData('ltPropBoundary').bottom)
						} else {
							_lyteUiUtils.targetAvailable.bottom = window.innerHeight
						}
						if(currentPopup.getData('ltPropBoundary').right){
							_lyteUiUtils.targetAvailable.right = parseFloat(currentPopup.getData('ltPropBoundary').right)
						} else {
							_lyteUiUtils.targetAvailable.right = window.innerWidth
						}
						_lyteUiUtils.targetAvailable.originElem = currentPopup.getData('ltPropOriginElem')
						currentPopup.setData('ltPropShow' , false);
						return;
					}

					if(!currentPopup.getData('ltPropForceScroll')){
						currentPopup.component.isOriginElemInViewport()
					}

				}


			}
		}
	}
}

window.addEventListener('scroll' , function(eve){
	_lyteBetaPopover.scrollHandler(eve)
},true)
window.addEventListener('wheel' , function(eve){
	//  this should done only when ltPropShow is true.
	_lyteBetaPopover.scrollHandler(eve)
},true)

Lyte.Component.register("lyte-beta-popover", {
_template:"<template tag-name=\"lyte-beta-popover\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" class=\"lytePopoverVisibilityHidden\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\" lt-prop-focus-on-close=\"{{ltPropFocusOnClose}}\" lt-prop-show=\"{{ltPropShowWormhole}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"popoverWrapper lytePopoverWrapper {{ltPropWrapperClass}} lytePopupZI\"> <div class=\"lytePopoverElement {{if(ifEquals(ltPropAnimation,'zoom'),'lytePopover lyteZoom','lytePopover')}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropType,&quot;callout&quot;)}}\"><template case=\"true\"> <span id=\"lytePopoverArrow\" class=\"lytePopoverArrowIcon\"></span> </template></template> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"><template case=\"true\"> <span case=\"true\" class=\"lytePopoverClose\" onclick=\"{{action('closePopover')}}\" tabindex=\"0\" role=\"button\" aria-label=\"Close Popover\"></span> </template></template> <lyte-yield yield-name=\"popover\" class=\"lytePopoverYield\"></lyte-yield> </div> <template is=\"if\" value=\"{{ltPropFreeze}}\"><template case=\"true\"> <lyte-popover-freeze class=\"lytePopupFreezeLayer\"></lyte-popover-freeze> </template></template> <template is=\"if\" value=\"{{showDragFreeze}}\"><template case=\"true\"> <lyte-popover-freeze class=\"lytePopupFreezeLayer lytePopupDragFreezeLayer\"></lyte-popover-freeze> </template></template> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"insertYield","position":[1,1,5]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropType","ltPropFreeze","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropOriginElem","ltPropPosition","ltPropPlacement","ltPropDimmer","ltPropDraggable","ltPropAllowMultiple","ltPropScrollable","ltPropMaxHeight","ltPropMaxWidth","ltPropWidth","ltPropHeight","ltPropWrapperClass","ltPropBoundary","ltPropCloseOnBodyClick","ltPropDuration","ltPropOffset","ltPropOffsetForParent","ltPropOffsetFromTarget","ltPropBindToBody","ltPropHeaderPadding","ltPropContentPadding","ltPropFooterPadding","ltPropAnimation","ltPropWindowSpacing","ltPropForceScroll","ltPropAutoAlign","ltPropPreventFocus","ltPropStopClick","ltPropIgnoreBoundary","ltPropMargin","ltPropCloseOnScroll","ltPropCloseOnResize","ltPropAllowContainment","ltPropIgnoreInput","ltPropFocusOnClose","ltPropAria","ltPropAriaAttributes","ltPropDragHandle","ltPropScaleFrom","ltPropShowWormhole","ltPropHostElement","ltPropReOpen","ltPropWrapContainer","initialPopoverDim","initialMouseDown","initialComputedPopoverDim","prevOffsetVal","finalPlacement","popoverClosedOn","finalPosition","showDragFreeze","onCloseTriggered","triggeredFromLocal"],
_observedAttributesType :["boolean","string","boolean","boolean","boolean","string","string","string","object","boolean","boolean","boolean","string","string","string","string","string","object","boolean","string","object","boolean","object","boolean","string","string","string","string","object","boolean","boolean","boolean","boolean","boolean","object","boolean","boolean","boolean","boolean","boolean","boolean","object","string","number","boolean","string","string","string","object","object","object","object","string","string","string","boolean","boolean","boolean"],

	data : function(){
		return {
			ltPropShow : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropType : Lyte.attr("string",{
				default : "callout"
			}),
			ltPropFreeze : Lyte.attr("boolean",{
				default : true
			}),
			ltPropShowCloseButton : Lyte.attr("boolean",{
				default : true
			}),
			ltPropCloseOnEscape : Lyte.attr('boolean' ,{
				default : true
			}),
			ltPropOriginElem : Lyte.attr('string' ,{
				default : ''
			}),
			ltPropPosition : Lyte.attr('string' ,{
				default : "bottom"
			}),
			ltPropPlacement : Lyte.attr("string" ,{
				default : "rightCenter"
			}),
			ltPropDimmer : Lyte.attr( "object" ,{
				default : {"color":"black","opacity":"0.4"}
			}),
			ltPropDraggable : Lyte.attr( "boolean" ,{
				default : false
			}),
			ltPropAllowMultiple : Lyte.attr("boolean" ,{
				default : false
			}),
			ltPropScrollable : Lyte.attr("boolean" ,{
				default: false
			}),
			ltPropMaxHeight : Lyte.attr("string" ,{
				default : ""
			}),
			ltPropMaxWidth : Lyte.attr("string" ,{
				default : ""
			}),
			ltPropWidth : Lyte.attr('string' , {
				default : ""
			}),
			ltPropHeight : Lyte.attr('string' , {
				default : ""
			}),	
			ltPropWrapperClass : Lyte.attr('string' ,{
				default : ""
			}),
			ltPropBoundary : Lyte.attr("object" ,{
				default : {}
			}),
			ltPropCloseOnBodyClick : Lyte.attr('boolean' , {
				default : true
			}),
			ltPropDuration : Lyte.attr('string' , {
				default : "400"
			}),
			ltPropOffset : Lyte.attr('object' ,{
				default : {}
			}),
			ltPropOffsetForParent : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropOffsetFromTarget : Lyte.attr( "object" ,{	
				default : {}
			}),
			ltPropBindToBody : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropHeaderPadding : Lyte.attr( "string" ,{
				default : ""
			}),
			ltPropContentPadding : Lyte.attr( "string" ,{
				default : ""
			}),
			ltPropFooterPadding : Lyte.attr( "string" ,{
				default : ""
			}),
			ltPropAnimation : Lyte.attr("string" ,{
				default : "fade"
			}),
			ltPropWindowSpacing : Lyte.attr("object"),

			ltPropForceScroll : Lyte.attr( 'boolean' ,{
				default : false 
			}),
			ltPropAutoAlign : Lyte.attr( 'boolean' ,{
				default : false
			}),
			ltPropPreventFocus : Lyte.attr('boolean' ,{
				default : false 
			}),
			ltPropStopClick : Lyte.attr( 'boolean' ,{
				default : false
			}),
			ltPropIgnoreBoundary : Lyte.attr( 'boolean' ,{	
				default : false
			}),
			ltPropMargin : Lyte.attr('object',{default : {}}),

			ltPropCloseOnScroll : Lyte.attr( 'boolean' ,{
				default : false
			}),
			ltPropCloseOnResize : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropAllowContainment : Lyte.attr('boolean' , {
                default : false
            }),
            ltPropIgnoreInput : Lyte.attr('boolean' , {	
                default : false
            }),
            ltPropFocusOnClose : Lyte.attr('boolean' , {	
                default : false
            }),

			ltPropAria : Lyte.attr( 'boolean' ,{ 	
				default : false
			}),
			ltPropAriaAttributes : Lyte.attr( 'object' ,{ 	
				default : {} 
			}),
			ltPropDragHandle : Lyte.attr('string' , {
				default : ''
			}),
			
			ltPropScaleFrom : Lyte.attr('number' , {
				default: 0
			}),
			ltPropShowWormhole : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropHostElement : Lyte.attr('string' , {
                default : ''
            }),
			ltPropReOpen : Lyte.attr('string' , {
				default : false
			}),
			ltPropWrapContainer : Lyte.attr('string' , {
				default : '' 
			}), 

			initialPopoverDim : Lyte.attr('object',{
				default : {
					top : 0,
					left : 0,
					right : 0,
					bottom : 0,
					width : 0,
					height : 0
				}
			}),
			initialMouseDown : Lyte.attr('object' , {
			default : {
				clientX : 0,
				clientY : 0
			}
			}),
			initialComputedPopoverDim : Lyte.attr('object' , {
			default : {
				left : 0,
				top : 0
			}
			}),
			prevOffsetVal : Lyte.attr('object' , {
				default : {}
			}),
			finalPlacement : Lyte.attr('string' , {
				default : 'bottom'
			}),
			popoverClosedOn : Lyte.attr('string' , {
				default : ''
			}),
			finalPosition : Lyte.attr('string' , {
				default : ''
			}),
			showDragFreeze : Lyte.attr('boolean' , {
				default : false
			}),
			onCloseTriggered : Lyte.attr('boolean' , {default : false}),
			triggeredFromLocal : Lyte.attr('boolean' , {
				default : false
			})


		}		
	},
	init : function(){
		var _this = this;
		if(!_lyteUiUtils.lytePopoverKeyDown){
			_lyteUiUtils.lytePopoverKeyDown = true
			document.addEventListener('keydown' , function(evt){
				_this.event = evt
				var popoverArr = []
				var popStack = []
				if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.betaPopoverStack){
					popoverArr = _lyteUiUtils.popupStack.betaPopoverStack
				}
				if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.globalStack){
					popStack = _lyteUiUtils.popupStack.globalStack
				}
				var isEscape = false;
				if ("key" in evt) {
					isEscape = (evt.key == "Escape" || evt.key == "Esc");
					isTabPressed = (evt.key == "Tab");
					isEnter = (evt.key == "Enter");
				} else {
					isEscape = (evt.keyCode == 27);
					isTabPressed = (evt.keyCode == 9);
					isEnter = (evt.keyCode == 13);
				}
				if(isEscape){
					if(popoverArr && popoverArr.length > 0){
						if(popoverArr[popoverArr.length - 1].parentElement.getData('ltPropCloseOnEscape')){
							if(popStack[popStack.length-1] === popoverArr[popoverArr.length-1]){
								popoverArr[popoverArr.length - 1].parentElement.setData('ltPropShow' , false);
							}
						}
					}
				}
			})
		}
		this.$node.getActualPosition = function(){
			return this.component.getData('finalPosition')
		}
		this.$node.alignPopover = function(){
			if(!this.getData('ltPropOffsetForParent')){
				this.component.setPopoverPosition();
			} else {
				this.component.setDirectPopoverPosition();
			}
		}
	},
	actions : {
		closePopover : function(){
			if(!_lyteUiUtils.isAriaKeyDownEnabled){
				this.setData('ltPropShow' , false);
			}
		}	
		// Functions for event handling
	},
	methods : {
		beforeWormholeAppend : function(arg){
			if(this.childComp){
                delete this.childComp;
            }
            if(this.actualModalDiv){
                delete this.actualModalDiv;
            }
            this.childComp = arg;
			this.actualModalDiv = $L(this.childComp).find(".lytePopoverElement")[0];

			if(this.getData('ltPropDraggable')){
				if(this.getData('ltPropDragHandle') !== '' && $L(this.childComp).find(this.getData('ltPropDragHandle'))[0]){
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].style.cursor="move";
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].addEventListener('mousedown' , this.mousedownFun)
				} else {
					if($L(this.childComp).find('lyte-popover-header')[0]){
						$L(this.childComp).find('lyte-popover-header')[0].style.cursor="move";
						$L(this.childComp).find('lyte-popover-header')[0].addEventListener('mousedown' , this.mousedownFun)
					}
				}
			}

            // //Sets the padding style based on user provide padding values
            // if(this.$node.parentElement && this.$node.parentElement.tagName == 'LYTE-COLORPICKER'){
            //     this.$node.parentElement.component.childComp = this.childComp;
            // }
            // if(this.childComp.querySelector('lyte-popover-header')){
            //     this.childComp.querySelector('lyte-popover-header').style.padding = this.getData('ltPropHeaderPadding');
            // }
            // if(this.childComp.querySelector('lyte-popover-content')){
            //     this.childComp.querySelector('lyte-popover-content').style.padding = this.getData('ltPropContentPadding');
            // }
            // if(this.childComp.querySelector('lyte-popover-footer')){
            //     this.childComp.querySelector('lyte-popover-footer').style.padding = this.getData('ltPropFooterPadding');
            // }
            // this.actualModalDiv = this.childComp.querySelector(".lytePopover");
            // if(this.childComp.querySelector('lyte-popover-header') && this.getData('ltPropShowCloseButton')){
            //     var headerHeight=0, closeHeight= 0;
            //     $L.fastdom.measure(function(){
            //         headerHeight = this.childComp.querySelector('lyte-popover-header').offsetHeight /*this.childComp.querySelector('lyte-popover-header').getBoundingClientRect().height*/;
            //         closeHeight = this.childComp.querySelector('.lytePopoverClose').offsetHeight /*this.childComp.querySelector('.lytePopoverClose').getBoundingClientRect().height*/;
            //     },this);
            //     $L.fastdom.mutate(function(){
            //         this.childComp.querySelector('.lytePopoverClose').style.top = (headerHeight - closeHeight) / 2 + "px";
            //     },this);
            // }
        }
	},


	//Mouse event functions
	mousedownFun : function(eve){
		$L(this).addClass('lytePopoverDragRunning')
		var getBcr = $L(this)[0].getBoundingClientRect()
		var _this = $L(this).closest('lyte-wormhole')[0].component.parent.component
		_this.setData('showDragFreeze' , true)

		// if((_this.getData('initialMouseDown').clientX === 0) && (_this.getData('initialMouseDown').clientY === 0)){
			Lyte.objectUtils(_this.getData('initialMouseDown') , 'add' , 'clientX' , eve.clientX)
			Lyte.objectUtils(_this.getData('initialMouseDown') , 'add' , 'clientY' , eve.clientY)
		// }

		var innerPopoverElementRect = _this.actualModalDiv.getBoundingClientRect();
		var modalWrapperElem = _this.actualModalDiv.parentElement;
		$L(modalWrapperElem).removeClass('lyteModalVerticalMiddleAlign lyteModalHorizontalCenterAlign lyteModalBottomAlign lyteModalRightAlign').addClass('lyteModalTopAlign lyteModalLeftAlign');
		_this.actualModalDiv.style.top = innerPopoverElementRect.top + 'px';
		_this.actualModalDiv.style.left = innerPopoverElementRect.left + 'px';
		_this.actualModalDiv.style.bottom = '';
		_this.actualModalDiv.style.right = '';

		_this.actualModalDiv.style.transition = 'none';

		Lyte.objectUtils(_this.getData('initialComputedPopoverDim') , 'add' , 'left' , parseFloat(getComputedStyle($L(_this.actualModalDiv)[0]).left))
		Lyte.objectUtils(_this.getData('initialComputedPopoverDim') , 'add' , 'top' , parseFloat(getComputedStyle($L(_this.actualModalDiv)[0]).top))
		window.addEventListener('mouseup' , _this.mouseupFun)
		window.addEventListener('mousemove' , _this.mousemoveFun);
	},
	mousemoveFun : function(eve){
		var dragHeader = $L('.lytePopoverDragRunning')
		var popoverEle = $L(dragHeader).closest('.lytePopoverElement')[0]
		var popoverComp = $L(dragHeader).closest('lyte-wormhole')[0].component.parent;

		popoverComp.setData('ltPropType' , 'box')

		popoverEle.style.left = popoverComp.getData('initialComputedPopoverDim').left - (popoverComp.getData('initialMouseDown').clientX - eve.clientX) + "px"
		popoverEle.style.top = popoverComp.getData('initialComputedPopoverDim').top - (popoverComp.getData('initialMouseDown').clientY - eve.clientY) + "px"
		if(popoverComp.getData('ltPropAllowContainment')){
			if((popoverComp.getData('initialComputedPopoverDim').left - (popoverComp.getData('initialMouseDown').clientX - eve.clientX)) <= 0){
				popoverEle.style.left = "0px"
			}
			if((popoverComp.getData('initialComputedPopoverDim').top - (popoverComp.getData('initialMouseDown').clientY - eve.clientY))<= 0){
				popoverEle.style.top = "0px"
			}
			if((popoverComp.getData('initialComputedPopoverDim').left - (popoverComp.getData('initialMouseDown').clientX - eve.clientX)) + popoverComp.getData('initialPopoverDim').width >= window.innerWidth){
				popoverEle.style.left = (window.innerWidth - popoverComp.getData('initialPopoverDim').width) + "px"
			}
			if((popoverComp.getData('initialComputedPopoverDim').top - (popoverComp.getData('initialMouseDown').clientY - eve.clientY)) + popoverComp.getData('initialPopoverDim').height >= window.innerHeight){
				popoverEle.style.top = (window.innerHeight - popoverComp.getData('initialPopoverDim').height) + "px"
			}
		}
	},
	mouseupFun : function(eve){
		var dragHeader = $L('.lytePopoverDragRunning')
		var _this = $L('.lytePopoverDragRunning').closest('lyte-wormhole')[0].component.parent.component
		_this.setData('showDragFreeze' , false)

		dragHeader.removeClass('lytePopoverDragRunning')
		window.removeEventListener('mousemove' , _this.mousemoveFun);
		window.removeEventListener('mouseup' , _this.mouseupFun);
		
	},



	//Component functions
	addMutationObserver : function(){
        if(this.getData('ltPropAutoAlign')){
            var popover = this.$node,
            targetNode = this.actualModalDiv, reAlign, config;
            this.setData('prevOffsetVal', {
                    height : this.actualModalDiv.offsetHeight,
                    width : this.actualModalDiv.offsetWidth
                });
            popover.mutobserver = new MutationObserver( function( mutations ) {
                if(this.getData('ltPropAutoAlign') && this.getData('ltPropShow') && this.actualModalDiv ){
                    var popoverElem = this.actualModalDiv;
                    var prevOffsetVal = this.getData('prevOffsetVal');
                    var offsetWidth = popoverElem.offsetWidth;
                    var offsetHeight = popoverElem.offsetHeight;
                    for( var i = 0; i < mutations.length; i++ ) {
                        if( (mutations[ i ].type === 'attributes'/* && mutations[ i ].attributeName === 'style'*/) || mutations[i].type == 'childList' || mutations[i].type == 'subtree' ) {
                            if(prevOffsetVal.width != offsetWidth || prevOffsetVal.height != offsetHeight){
                                reAlign = true;
                                this.setData('prevOffsetVal', {
                                    height : offsetHeight,
                                    width : offsetWidth
                                })
                                break;
                            }
                        }
                    }
                    if(reAlign){
                        reAlign = false;
						if(!this.getData('ltPropOffsetForParent')){
							this.setPopoverPosition();
						} else {
							this.setDirectPopoverPosition();
						}
						// if(this.getData('ltPropOriginElem') !== ''){
						// 	this.setPopoverPosition();
						// } else if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
						// 	this.setArrowPosition(this.getData('ltPropPlacement'));
						// }
                    }
                }
            }.bind( this ) );

            config = {
                attributes: true,
                childList : true,
                subtree: true
                // attributeFilter: ['style', 'class']
            };

            popover.mutobserver.observe( targetNode, config );
            // Mutation observer ends
        }
    },

	closePrevPopup : function(){
		if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.globalStack.length > 0){
			var tagname = _lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length-1].parentElement.tagName
				if(
					tagname === 'LYTE-BETA-POPOVER' || 
					tagname === 'LYTE-BETA-MODAL' ||
					tagname === 'LYTE-POPOVER' ||
					tagname === 'LYTE-MODAL'){
						var prevIndex = _lyteUiUtils.popupStack.globalStack.length-1
						if(_lyteUiUtils.popupStack.globalStack[prevIndex].parentElement.getData('ltPropAllowMultiple') === false){
							_lyteUiUtils.popupStack.globalStack[prevIndex].parentElement.setData('ltPropShow' , false);
						}
					}
		}
	},
	
	setPopoverWidth : function(){
		if(this.getData('ltPropWidth') !== ""){
			var popoverElem = $L(this.childComp).find('.lytePopoverElement')
			if(popoverElem[0]){
				popoverElem[0].style.width = this.getData('ltPropWidth')
			}
		}
	},
	setPopoverHeight : function(){
		if(this.getData('ltPropHeight') !== ""){
			var popoverElem = $L(this.childComp).find('.lytePopoverElement')
			if(popoverElem[0]){
				popoverElem[0].style.height = this.getData('ltPropHeight')
			}
		}
	},	
	setPopoverMaxWidth : function(){
		if(this.getData('ltPropMaxWidth') !== ""){
			var popoverElem = $L(this.childComp).find('.lytePopoverElement')[0]
			popoverElem.style.maxWidth = this.getData('ltPropMaxWidth');
		}
	},
	setPopoverMaxHeight : function(){
		if(this.getData('ltPropMaxHeight') !== ""){
			var popoverElem = $L(this.childComp).find('.lytePopoverElement')[0]
			popoverElem.style.maxHeight = this.getData('ltPropMaxHeight');
		}
	},
	setPadding : function(){
		if(this.getData('ltPropHeaderPadding') !== ""){
			var popoverElem = $L(this.childComp).find('lyte-popover-header')[0]
			if(popoverElem){
				popoverElem.style.padding = this.getData('ltPropHeaderPadding');
			}
		}
		if(this.getData('ltPropContentPadding') !== ""){
			var popoverElem = $L(this.childComp).find('lyte-popover-content')[0]
			if(popoverElem){
				popoverElem.style.padding = this.getData('ltPropContentPadding');
			}
		}
		if(this.getData('ltPropFooterPadding') !== ""){
			var popoverElem = $L(this.childComp).find('lyte-popover-footer')[0]
			if(popoverElem){
				popoverElem.style.padding = this.getData('ltPropFooterPadding');
			}
		}
	},

	setPopoverWithOffset: function() {
		var popoverElem = $L(this.childComp).find('.lytePopoverElement')[0]
		var offset = this.getData('ltPropOffset');
		if(popoverElem) {
			if(offset.left) {
				popoverElem.style.left = offset.left;
			}
			else if(offset.right) {
				popoverElem.style.right = offset.right;
			}
			if(offset.top) {
				popoverElem.style.top = offset.top;
			}
			else if(offset.bottom) {
				popoverElem.style.bottom = offset.bottom;
			}
		}
	},
	setDirectPopoverPosition : function(){
		var popoverElem = $L(this.childComp).find('.lytePopoverElement')
		var offsetObj = this.getData('ltPropOffset')
		if(Object.keys(offsetObj).length > 0){

			if(parseFloat(offsetObj.left) > -1){
				popoverElem[0].style.left = offsetObj.left;
			}
			if(parseFloat(offsetObj.top) > -1){
				popoverElem[0].style.top = offsetObj.top;
			}
			if(parseFloat(offsetObj.right) > -1){
				popoverElem[0].style.right = offsetObj.right;
			}
			if(parseFloat(offsetObj.bottom) > -1){
				popoverElem[0].style.bottom = offsetObj.bottom;
			}
		}
	},
	setPopoverPosition : function(){

		var popoverElem = $L(this.childComp).find('.lytePopoverElement')
		if(popoverElem[0]){
			var popoverElemDim = popoverElem[0].getBoundingClientRect()
		}
		var originElem
		if(this.getData('ltPropHostElement') !== ""){
            originElem = $L(document.querySelector(this.$node.ltProp('hostElement')))[0].shadowRoot.querySelector(this.getData('ltPropOriginElem'))
        } else {
			originElem = $L(this.getData('ltPropOriginElem'))
		}
		if(originElem instanceof HTMLElement){
			var originElemDim = originElem.getBoundingClientRect()
		} 
		else if (originElem[0] instanceof HTMLElement){
			var originElemDim = originElem[0].getBoundingClientRect();
		}
		if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
			originElemDim = this.getOffsetOfOrigin();
		}
		var spacing = 10;
		if(this.getData('ltPropType') === 'box'){
			spacing = 0;
		}

		if(!this.getData('ltPropPlacement')){
			this.setData('ltPropPlacement' , 'bottom')
		}

		var placementArr = this.getData('ltPropPlacement').split(" ")
		var placement = placementArr[0];

		var popoverElemHeight = popoverElemDim.height;
		var popoverElemWidth = popoverElemDim.width;

		if(this.getData('ltPropAnimation') === 'zoom'){
			popoverElemHeight = popoverElem[0].offsetHeight
			popoverElemWidth = popoverElem[0].offsetWidth
		}
		// if(this.getData('ltPropOriginElem') !== ""){

			var finalPosition;
			if(this.getData('ltPropWrapContainer') !== ''){
				finalPosition = this.getActualPositionWithWrapper(popoverElemWidth , popoverElemHeight,originElemDim ,placementArr , $L(this.getData('ltPropWrapContainer'))[0].getBoundingClientRect()  )
			} else {
				finalPosition = this.getActualPosition(popoverElemWidth , popoverElemHeight,originElemDim ,placementArr)
			}
			this.setData('finalPosition' , finalPosition)

			switch(finalPosition){
				case "top":
					popoverElem[0].style.top = "unset";
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.bottom = ( window.innerHeight - originElemDim.top + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = this.setMidLeft()
				break;
				case "right":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.left = (originElemDim.left + originElemDim.width + spacing + this.getPopoverMargin(placement)) + "px"
					// popoverElem[0].style.top = this.setMidTop()										// in v4 the placement property for left and right will be changed 
					popoverElem[0].style.top = originElemDim.top + "px";
				break;
				case "bottom":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.top = (originElemDim.top + originElemDim.height + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = this.setMidLeft()
				break;
				case "left":
					popoverElem[0].style.left = "unset";
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.right = (window.innerWidth - originElemDim.left + spacing + this.getPopoverMargin(placement)) + "px"
					// popoverElem[0].style.top = this.setMidTop()										// in v4 the placement property for left and right will be changed 
					popoverElem[0].style.top = originElemDim.top + "px";
				break;
				case "topLeft":
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.top = "unset";
					popoverElem[0].style.bottom = ( window.innerHeight - originElemDim.top + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = originElemDim.left + "px";
				break;
				case "topRight":
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.top = "unset";
					popoverElem[0].style.bottom = ( window.innerHeight - originElemDim.top + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = (originElemDim.left - (popoverElemWidth - originElemDim.width)) + "px"
				break;
				case "bottomLeft":
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.top = (originElemDim.top + originElemDim.height + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = originElemDim.left + "px";
				break;
				case "bottomRight":
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.top = (originElemDim.top + originElemDim.height + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.left = (originElemDim.left - (popoverElemWidth - originElemDim.width)) + "px"
				break;
				case "leftCenter":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.left = "unset";
					popoverElem[0].style.right = (window.innerWidth - originElemDim.left + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.top = this.setMidTop()
				break;
				case "leftBottom":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.left = "unset";
					popoverElem[0].style.right = (window.innerWidth - originElemDim.left + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.top = (originElemDim.top - (popoverElem[0].offsetHeight - originElemDim.height)) + "px"
				break;
				case "rightCenter":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.left = (originElemDim.left + originElemDim.width + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.top = this.setMidTop()
				break;
				case "rightBottom":
					popoverElem[0].style.bottom = "unset";
					popoverElem[0].style.right = "unset";
					popoverElem[0].style.left = (originElemDim.left + originElemDim.width + spacing + this.getPopoverMargin(placement)) + "px"
					popoverElem[0].style.top = (originElemDim.top - (popoverElem[0].offsetHeight - originElemDim.height)) + "px"
				break;
			}

			var firstLetter = placement[0].toUpperCase();
			var popoverPlacementClass = "lytePopover" + firstLetter + placement.substr(1);
			popoverElem[0].classList.add(popoverPlacementClass);
			this.setArrowPosition(finalPosition);
		// }
	
	},
	
	setArrowPosition : function(placement){
		var animationType = this.getData("ltPropAnimation");
		var popoverArrow = $L(this.childComp).find('.lytePopoverArrowIcon')
		var popoverElem = $L(this.childComp).find('.lytePopoverElement')
		var popoverElemWidth, popoverElemHeight;
		if(popoverElem[0]){
			var popoverElemDim = popoverElem[0].getBoundingClientRect()
			popoverElemWidth = popoverElemDim.width;
			popoverElemHeight = popoverElemDim.height;
		}
		if(this.getData('ltPropAnimation') === 'zoom'){
			popoverElemHeight = popoverElem[0].offsetHeight
			popoverElemWidth = popoverElem[0].offsetWidth
		}
		var originElem = $L(this.getData('ltPropOriginElem'))
		if(originElem[0]){
			var originElemDim = originElem[0].getBoundingClientRect()
		}
		if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
			originElemDim = this.getOffsetOfOrigin();
		}

		if(popoverArrow[0]){
			$L(popoverArrow[0]).removeClass('lytePopoverArrowTop')
			$L(popoverArrow[0]).removeClass('lytePopoverArrowBottom')
			$L(popoverArrow[0]).removeClass('lytePopoverArrowRight')
			$L(popoverArrow[0]).removeClass('lytePopoverArrowLeft')
			popoverArrow[0].style.transform = 'unset'
			switch(placement){
				case "top":
					$L(popoverArrow[0]).addClass('lytePopoverArrowBottom')
					popoverArrow[0].style.top = ""
					popoverArrow[0].style.bottom = "-5px"
					popoverArrow[0].style.left = this.setArrowMidLeft()
				break;
				case "right":
					$L(popoverArrow[0]).addClass('lytePopoverArrowLeft')
					popoverArrow[0].style.right = ""
					popoverArrow[0].style.left = "-5px"
					popoverArrow[0].style.top = (( originElemDim.height / 2 ) - this.arrowHalfSize()) + "px"
				break;
				case "bottom":
					$L(popoverArrow[0]).addClass('lytePopoverArrowTop')
					popoverArrow[0].style.bottom = ""
					popoverArrow[0].style.top = "-5px"
					popoverArrow[0].style.left = this.setArrowMidLeft()
				break;
				case "left":
					$L(popoverArrow[0]).addClass('lytePopoverArrowRight')
					popoverArrow[0].style.left = ""
					popoverArrow[0].style.right = "-5px"
					popoverArrow[0].style.top = (( originElemDim.height / 2 ) - this.arrowHalfSize()) + "px"
				break;
				case "topLeft":
					$L(popoverArrow[0]).addClass('lytePopoverArrowBottom')
					popoverArrow[0].style.bottom = "-5px"
					popoverArrow[0].style.top = ""
					if(originElemDim.width > popoverElemWidth){
						popoverArrow[0].style.left = this.setArrowMidLeft()
					} else {
						popoverArrow[0].style.left = ( originElemDim.width / 2 ) - this.arrowHalfSize() + "px"
					}
				break;
				case "topRight":
					$L(popoverArrow[0]).addClass('lytePopoverArrowBottom')
					popoverArrow[0].style.bottom = "-5px"
					popoverArrow[0].style.top = ""
					if(originElemDim.width > popoverElemWidth){
						popoverArrow[0].style.left = this.setArrowMidLeft()
					} else {
						popoverArrow[0].style.left = ( popoverElemWidth - (originElemDim.width / 2) - this.arrowHalfSize() ) + "px"
					}
				break;
				case "bottomLeft":
					$L(popoverArrow[0]).addClass('lytePopoverArrowTop')
					popoverArrow[0].style.top = "-5px"
					popoverArrow[0].style.bottom = ""
					if(originElemDim.width > popoverElemWidth){
						popoverArrow[0].style.left = this.setArrowMidLeft()
					} else {
						popoverArrow[0].style.left = (( originElemDim.width / 2 ) - this.arrowHalfSize()) + "px"
					}
				break; 
				case "bottomRight":
					$L(popoverArrow[0]).addClass('lytePopoverArrowTop')
					popoverArrow[0].style.top = "-5px"
					popoverArrow[0].style.bottom = ""
					// popoverArrow[0].style.left = ( popoverElemWidth - (originElemDim.width / 2) - this.arrowHalfSize() ) + "px"
					if(originElemDim.width > popoverElemWidth){
						popoverArrow[0].style.left = this.setArrowMidLeft()
					} else {
						popoverArrow[0].style.right = ((originElemDim.width / 2) - this.arrowHalfSize()) + "px"
					}
				break;
				case "leftCenter":
					$L(popoverArrow[0]).addClass('lytePopoverArrowRight')
					popoverArrow[0].style.right = "-5px"
					popoverArrow[0].style.left = ""
					popoverArrow[0].style.top = this.setArrowMidTop()
				break;
				case "leftBottom":
					$L(popoverArrow[0]).addClass('lytePopoverArrowRight')
					popoverArrow[0].style.right = "-5px"
					popoverArrow[0].style.left = ""
					popoverArrow[0].style.top = ( popoverElemHeight - (originElemDim.height / 2) - this.arrowHalfSize()) + "px"
				break;
				case "rightCenter":
					$L(popoverArrow[0]).addClass('lytePopoverArrowLeft')
					popoverArrow[0].style.left = "-5px"
					popoverArrow[0].style.right = ""
					popoverArrow[0].style.top = this.setArrowMidTop()
				break;
				case "rightBottom":
					$L(popoverArrow[0]).addClass('lytePopoverArrowLeft')
					popoverArrow[0].style.left = "-5px"
					popoverArrow[0].style.right = ""
					popoverArrow[0].style.top = ( popoverElemHeight - (originElemDim.height / 2) - this.arrowHalfSize()) + "px"
				break;
			}
			popoverArrow[0].style.transform = '';

		}
	},

	getActualPosition:function(popLength, popHeight, obj, preference){
		var tarLength = obj.width;
		var tarHeight = obj.height;
		let wlength = window.innerWidth;
		let wHeight = window.innerHeight;
		let results = {
			topLeft : [wlength - obj.left,obj.top],
			top : tcFunc(),
			topRight : [obj.left+tarLength, obj.top],
		   
			left : [obj.left,wHeight-obj.top],
			leftCenter : lcFunc(),
			leftBottom : [obj.left,obj.top+tarHeight],
		   
			bottomLeft : [wlength-obj.left,wHeight-(tarHeight+obj.top)],
			bottom : bcFunc(),
			bottomRight : [obj.left+tarLength,wHeight-(tarHeight+obj.top)],
		   
			right : [wlength-(obj.left+tarLength),wHeight-obj.top],
			rightCenter : rcFunc(),
			rightBottom : [wlength-(obj.left+tarLength),obj.top+tarHeight]
		}
		function lcFunc(){
			let x = obj.left;
			let y = 0;
			if((((tarHeight/2) + obj.top) >= (popHeight/2)) && ((wHeight - (obj.top + (tarHeight/2))) >= (popHeight/2))){
				y = ((tarHeight/2) + obj.top)+(wHeight - (obj.top + (tarHeight/2)));
			}
			return [x,y];
		}
		function bcFunc(){
			let x = 0;
			let y = wHeight-(tarHeight+obj.top);
			if(((((tarLength/2)+obj.left) >= popLength/2)) && ((wlength - (obj.left + (tarLength/2))) >= (popLength/2))){
				x = ((tarLength/2)+obj.left) + (wlength - (obj.left + (tarLength/2)));
			}
			return [x,y];
		}
		function rcFunc(){
			let x = wlength-(obj.left+tarLength);
			let y = 0;
			if(((obj.top+(tarHeight/2)) >= (popHeight/2)) && ((wHeight - (obj.top + (tarHeight/2))) >= (popHeight/2))){
				y = (obj.top+(tarHeight/2)) + (wHeight - obj.top - (tarHeight/2));
			}
			return [x,y];
		}
		function tcFunc(){
			let x = 0;
			let y = obj.top;
			if((((tarLength/2)+obj.left) >= (popLength/2)) && ((wlength-(obj.left+(tarLength/2))) >= (popLength/2))){
				x = ((tarLength/2)+obj.left) + (wlength-(obj.left+(tarLength/2)));
			}
			return [x,y];
		}
		function getPopupPosition(results,popLength,popHeight,preference){
			if(preference!==undefined && preference.length>=0){
				for(let key of preference){
					if(results[key][0]>=popLength && results[key][1]>=popHeight){
						return key;
					}
				}
			}
			for(let key in results){
				if(results[key][0]>=popLength && results[key][1] >=popHeight){
					return key;
				}
			}
			if(preference!==undefined && preference.length>=0){
				return preference[0];
			}
			return 'topRight';
		}
		return getPopupPosition(results,popLength,popHeight,preference);
	},
	getActualPositionWithWrapper : function(popLength, popHeight, obj, preference,layoutObj) {
    
		let wlength = window.innerWidth;
		let wHeight = window.innerHeight;
	
		let results = {        
			topLeft : [(layoutObj.width-(obj.left-layoutObj.left)),(obj.top - layoutObj.top)], 
			top : tcFunc(),
			topRight : [((obj.left-layoutObj.left)+obj.width), (obj.top - layoutObj.top)],
	
		
			left : [(obj.left-layoutObj.left),(layoutObj.height)-((obj.top-layoutObj.top))],
			leftCenter : lcFunc(), 
			leftBottom : [(obj.left-layoutObj.left),((obj.top-layoutObj.top)+obj.height)],
		   
			
			bottomLeft : [(layoutObj.width-(obj.left-layoutObj.left)),(layoutObj.bottom-obj.bottom)],
			bottom : bcFunc(), 
			bottomRight : [((obj.left-layoutObj.left)+obj.width),(layoutObj.bottom-obj.bottom)],
		   
			
			right : [(layoutObj.right-obj.right),(layoutObj.height)-((obj.top-layoutObj.top))],
			rightCenter : rcFunc(),
			rightBottom : [(layoutObj.right-obj.right),((obj.top-layoutObj.top)+obj.height)]
		}
		function lcFunc(){
			let x = (obj.left-layoutObj.left);
			let y = 0;
			if((((obj.top-layoutObj.top)+(obj.height/2)) >= (popHeight/2)) && (((layoutObj.bottom-obj.bottom)+(obj.height/2)) >= (popHeight/2))){
				y = ((obj.top-layoutObj.top)+(obj.height/2))+((layoutObj.bottom-obj.bottom)+(obj.height/2));
			}
			return [x,y];
		}
		function bcFunc(){
			let x = 0;
			let y = (layoutObj.bottom-obj.bottom);
			if((((obj.left-layoutObj.left)+(obj.width/2)) >= (popLength/2)) && (((layoutObj.right-obj.right)+(obj.width/2)) >= (popLength/2))){
				x = ((obj.left-layoutObj.left)+(obj.width/2))+((layoutObj.right-obj.right)+(obj.width/2));
			}
			return [x,y];
		}
		function rcFunc(){
			let x = (layoutObj.right-obj.right);
			let y = 0;
			if((((obj.top - layoutObj.top)+(obj.height/2)) >= (popHeight/2)) && (((layoutObj.bottom-obj.bottom)+(obj.height/2)) >= (popHeight/2))){
				y = ((obj.top - layoutObj.top)+(obj.height/2)) + ((layoutObj.bottom-obj.bottom)+(obj.height/2));
			}
			return [x,y];
		}
		function tcFunc(){
			let x = 0;
			let y = (obj.top-layoutObj.top);
			if((((obj.left-layoutObj.left)+(obj.width/2))>= (popLength/2)) &&  (((layoutObj.right-obj.right)+(obj.width/2)) >= (popLength/2))){
					x = (((obj.left-layoutObj.left)+(obj.width/2)) + ((layoutObj.right-obj.right)+(obj.width/2)));
			}
			return [x,y];
		}
		function getPopupPosition(results,popLength,popHeight,preference){
			if(preference!==undefined && preference.length>=0){
				for(let key of preference){
					if(results[key][0]>=popLength && results[key][1]>=popHeight){
						return key;
					}
				}
			}
			for(let key in results){
				if(results[key][0]>=popLength && results[key][1] >=popHeight){
					return key;
				}
			}
			if(preference!==undefined && preference.length>=0){
				return preference[0];
			}
			return 'topRight';
		}
		return getPopupPosition(results,popLength,popHeight,preference);
	},


	getOffsetOfOrigin : function(){
		var offsetDim = {}
		if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
			var offsetVal = this.getData('ltPropOffset')

			if(offsetVal.left){
				offsetDim.left = parseFloat(offsetVal.left)
			} else if(offsetVal.right){
				offsetDim.right = parseFloat(offsetVal.right)
			} else {
				offsetDim.left = 0
			}

			if(offsetVal.right){
				offsetDim.right = parseFloat(offsetVal.right)
			} else if(offsetVal.left){
				offsetDim.left = parseFloat(offsetVal.left)
			} else {
				offsetDim.right = 0
			}

			if(offsetVal.bottom){
				offsetDim.bottom = parseFloat(offsetVal.bottom)
			} else if(offsetVal.top){
				offsetDim.top = parseFloat(offsetVal.top)
			} else {
				offsetDim.bottom = 0
			}
			if(offsetVal.top){
				offsetDim.top = parseFloat(offsetVal.top)
			} else if(offsetVal.bottom){
				offsetDim.bottom = parseFloat(offsetVal.bottom)
			} else {
				offsetDim.bottom = 0
			}
			
			if(offsetVal.width){
				offsetDim.width = parseFloat(offsetVal.width)
			} else {
				offsetDim.width = 1
			}
			if(offsetVal.height){
				offsetDim.height = parseFloat(offsetVal.height)
			} else {
				offsetDim.height = 1
			}

			return offsetDim

		}

	},
	getTargetMidPoint : function(){
		var originElem = $L(this.getData('ltPropOriginElem'))
		var retVal = {
			midHeight : 0,
			midWidth : 0
		}
		if(originElem[0]){
			var originElemDim = originElem[0].getBoundingClientRect()
			retVal.midWidth = (originElemDim.width / 2) + originElemDim.left
			retVal.midHeight = (originElemDim.height / 2) + originElemDim.top
			retVal.halfWidth = (originElemDim.width / 2)
		} else {
			if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
				var offsetDim = this.getOffsetOfOrigin();
				retVal.midWidth = (offsetDim.width / 2) + offsetDim.left
				retVal.midHeight = (offsetDim.height / 2) + offsetDim.top
				retVal.halfWidth = (offsetDim.width / 2)
			}
		}

		return retVal
	},

	getPopoverMidPoint : function(){

		var animationType = this.getData("ltPropAnimation");
		var popoverElem = $L(this.childComp).find('.lytePopoverElement')
		var retVal = {
			midHeight : 0,
			midWidth : 0
		}

		if(popoverElem[0]){
			var popoverElemDim = popoverElem[0].getBoundingClientRect()
			// retVal.midWidth = (popoverElemDim.width / 2) + popoverElemDim.left
			// retVal.midHeight = (popoverElemDim.height / 2) + popoverElemDim.top
			retVal.midWidth = (popoverElemDim.width / 2)
			retVal.midHeight = (popoverElemDim.height / 2)
			if(this.getData('ltPropAnimation') === 'zoom'){
				retVal.midHeight = (popoverElem[0].offsetHeight / 2)
				retVal.midWidth = (popoverElem[0].offsetWidth / 2)
			}
		}

		return retVal
	},
	
	getArrowMindPoint : function(){
		var popoverElem = $L(this.childComp).find('.lytePopoverArrowIcon')

		var retVal = {
			midHeight : 0,
			midWidth : 0
		}
		if(popoverElem[0]){
			var popoverElemDim = popoverElem[0].getBoundingClientRect()
			retVal.midWidth = (popoverElemDim.width / 2) + popoverElemDim.left
			retVal.midHeight = (popoverElemDim.height / 2) + popoverElemDim.top
		}

		return retVal
	},

	getPopoverMargin : function(placement){
		var spaceVal = 0;
		switch(placement){
			case "topLeft":
			case "topRight":
			case "top":
				if(this.getData('ltPropMargin') && this.getData('ltPropMargin').bottom){
					spaceVal = this.getData('ltPropMargin').bottom
				}
			break;
			case "right":
			case "rightCenter":
			case "rightBottom":
				if(this.getData('ltPropMargin') && this.getData('ltPropMargin').left){
					spaceVal = this.getData('ltPropMargin').left
				}
			break;
			case "bottomLeft":
			case "bottomRight":
			case "bottom":
				if(this.getData('ltPropMargin') && this.getData('ltPropMargin').top){
					spaceVal = this.getData('ltPropMargin').top
				}
			break;
			case "leftCenter":
			case "leftBottom":
			case "left":
				if(this.getData('ltPropMargin') && this.getData('ltPropMargin').right){
					spaceVal = this.getData('ltPropMargin').right
				}
			break;
		}
		return spaceVal;
	},

	arrowHalfSize : function(){
		var popoverElem = $L(this.childComp).find('.lytePopoverArrowIcon')
		
		if(this.getData('ltPropAnimation') === 'zoom'){
			return popoverElem[0].offsetWidth / 2
		}
		return popoverElem[0].getBoundingClientRect().width / 2
		
	},

	setMidLeft : function(){
		return ((this.getTargetMidPoint().midWidth - this.getPopoverMidPoint().midWidth) + "px");
	},

	setMidTop : function(){
		return ((this.getTargetMidPoint().midHeight - this.getPopoverMidPoint().midHeight) + "px");
	},

	setArrowMidLeft : function(){
		return ((this.getPopoverMidPoint().midWidth - this.arrowHalfSize()) + "px");
	},
	setArrowMidTop : function(){
		return ((this.getPopoverMidPoint().midHeight - this.arrowHalfSize()) + "px");
	},
	setDimension : function(){
		var dim = this.actualModalDiv.getBoundingClientRect();
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'top' , dim.top)
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'left' , dim.left)
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'right' , dim.right)
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'bottom' , dim.bottom)
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'width' , dim.width)
		Lyte.objectUtils(this.getData('initialPopoverDim') , 'add' , 'height' , dim.height)
	},
	unsetDimensions : function(){
		var popoverElem = $L(this.childComp).find('.lytePopoverWrapper')
		var popoverElemInnerElem = popoverElem.find('.lytePopoverElement')[0];
		if(popoverElem.find('#lytePopoverArrow')[0]){
			popoverElem.find('#lytePopoverArrow')[0].style.left = ''
			popoverElem.find('#lytePopoverArrow')[0].style.right = ''
			popoverElem.find('#lytePopoverArrow')[0].style.bottom = ''
			popoverElem.find('#lytePopoverArrow')[0].style.top = ''
		}
		if(popoverElemInnerElem){
			popoverElemInnerElem.style.left = ''
			popoverElemInnerElem.style.right = ''
			popoverElemInnerElem.style.bottom = ''
			popoverElemInnerElem.style.top = ''
		}
		// this.setData('ltPropOffset' , {})
	},

	isOriginElemInViewport : function(){
		if(this.childComp && this.getData('ltPropOriginElem')){
			var originElem
			if(this.getData('ltPropHostElement') !== ""){
				originElem = $L(document.querySelector(this.$node.ltProp('hostElement')))[0].shadowRoot.querySelector(this.getData('ltPropOriginElem'))
			} else {
				originElem = $L(this.getData('ltPropOriginElem'))[0]
			}
			var originDim = originElem.getBoundingClientRect();
			if((originDim.top < 0) || (originDim.top + originDim.height > window.innerHeight)){
				if(this.getData('ltPropReOpen')){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
						if((originDim.top < 0)){
							_lyteUiUtils.targetAvailable.closedOn = 'top'
						} else if((originDim.top + originDim.height > window.innerHeight)){
							_lyteUiUtils.targetAvailable.closedOn = 'bottom'
						}
						_lyteUiUtils.targetAvailable.popover = this
						if(this.getData('ltPropBoundary').top){
							_lyteUiUtils.targetAvailable.top = parseFloat(this.getData('ltPropBoundary').top)
						} else {
							_lyteUiUtils.targetAvailable.top = 0
						}
						if(this.getData('ltPropBoundary').bottom){
							_lyteUiUtils.targetAvailable.bottom = parseFloat(this.getData('ltPropBoundary').bottom)
						} else {
							_lyteUiUtils.targetAvailable.bottom = window.innerHeight
						}

						_lyteUiUtils.targetAvailable.originElem = this.getData('ltPropOriginElem')
						
					}
				}
				this.setData('ltPropShow' , false)
			}
			if((originDim.left < 0) || (originDim.left + originDim.width > window.innerWidth)){
				if(this.getData('ltPropReOpen')){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
						if((originDim.left < 0)){
							_lyteUiUtils.targetAvailable.closedOn = 'left'
						} else if((originDim.left + originDim.width > window.innerWidth)){
							_lyteUiUtils.targetAvailable.closedOn = 'right'
						}
		
						if(this.getData('ltPropBoundary').right){
							_lyteUiUtils.targetAvailable.right = parseFloat(this.getData('ltPropBoundary').right)
						} else {
							_lyteUiUtils.targetAvailable.right = window.innerWidth
						}
		
						if(this.getData('ltPropBoundary').left){
							_lyteUiUtils.targetAvailable.left = parseFloat(this.getData('ltPropBoundary').left)
						} else {
							_lyteUiUtils.targetAvailable.left = 0
						}
						_lyteUiUtils.targetAvailable.originElem = this.getData('ltPropOriginElem')
					}
				}
				this.setData('ltPropShow' , false)
			} 

		}
	},

	isPopoverInBoundary : function(){
		// var popoverDim = this.actualModalDiv.getBoundingClientRect();
		var originElem
		if(this.getData('ltPropHostElement') !== ""){
			originElem = $L(document.querySelector(this.$node.ltProp('hostElement')))[0].shadowRoot.querySelector(this.getData('ltPropOriginElem'))
		} else {
			originElem = $L(this.getData('ltPropOriginElem'))[0]
		}
		if(originElem && Object.keys(this.getData('ltPropBoundary')).length > 0){
			var popoverDim = originElem.getBoundingClientRect()
			var boundaryVal = this.getData('ltPropBoundary')
			if(!boundaryVal.top){
				boundaryVal.top = 1
			}
			if(boundaryVal.top){
				popoverDim = originElem.getBoundingClientRect()
				if(popoverDim.top < parseFloat(boundaryVal.top)){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
					}
					_lyteUiUtils.targetAvailable.closedOn = 'top'
					return false
				}
			}
			if(!boundaryVal.bottom){
				boundaryVal.bottom = 1
			}
			if(boundaryVal.bottom){
				popoverDim = originElem.getBoundingClientRect()
				if((window.innerHeight - (popoverDim.top+popoverDim.height)) < parseFloat(boundaryVal.bottom)){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
					}
					_lyteUiUtils.targetAvailable.closedOn = 'bottom'
					return false
				}
			}
			if(!boundaryVal.left){
				boundaryVal.left = 1
			}
			if(boundaryVal.left){
				popoverDim = originElem.getBoundingClientRect()
				if(popoverDim.left < parseFloat(boundaryVal.left)){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
					}
					_lyteUiUtils.targetAvailable.closedOn = 'left'
					return false
				}
			}
			if(!boundaryVal.right){
				boundaryVal.right = 1
			}
			if(boundaryVal.right){
				popoverDim = originElem.getBoundingClientRect()
				if((window.innerWidth - (popoverDim.left+popoverDim.width)) < parseFloat(boundaryVal.right)){
					if(!_lyteUiUtils.targetAvailable){
						_lyteUiUtils.targetAvailable = {}
					}
					_lyteUiUtils.targetAvailable.closedOn = 'right'
					return false
				}
			}
		}
		return true
	},
	_closePopover: function(event) {
		var popStack = _lyteUiUtils.popupStack.globalStack
		var popoverElem = $L(this.childComp).find('.lytePopoverWrapper')
		var popoverElemInnerElem = popoverElem.find('.lytePopoverElement')[0];
		var animationType = this.getData('ltPropAnimation');
		var duration = parseFloat(this.getData('ltPropDuration'))
		if(_lyteUiUtils.targetAvailable){
			delete _lyteUiUtils.targetAvailable
		}
		if($L(this.childComp).find('.lytePopupFreezeLayer')[0]){
			$L(this.childComp).find('.lytePopupFreezeLayer')[0].style.opacity = 0;
		}
		var finalPositionBackup = this.getData("finalPosition");
		this.setData('finalPosition' , '')
		switch(animationType) {
			case "fade": 
				popoverElem.removeClass('lytePopoverFadeAnimation')
				break;
			case "zoom":
				var popoverElemDim = popoverElemInnerElem.getBoundingClientRect();
				var originElemMidPoint = this.getTargetMidPoint();
	
				var popoverElemLeft = popoverElemDim.x + (popoverElemDim.width / 2);
				var popoverElemTop = popoverElemDim.y + (popoverElemDim.height / 2);
				var originElemLeft = originElemMidPoint.midWidth;
				var originElemTop = originElemMidPoint.midHeight;
				
				var xdiff = -1 * (popoverElemLeft - originElemLeft) + 'px';
				var ydiff = -1 * (popoverElemTop - originElemTop) + 'px';
				if(finalPositionBackup == "left" || finalPositionBackup == "leftBottom" || finalPositionBackup == "leftCenter") {
					xdiff = "50%";
				}
				else if(finalPositionBackup == "right" || finalPositionBackup == "rightBottom" || finalPositionBackup == "rightCenter") {
					xdiff = "-50%";
				}
				else if(finalPositionBackup == "top" || finalPositionBackup == "topLeft" || finalPositionBackup == "topRight") {
					ydiff = "50%";
				}
				else if(finalPositionBackup == "bottom" || finalPositionBackup == "bottomLeft" || finalPositionBackup == "bottomRight") {
					ydiff = "-50%";
				}
				var transformString;
				transformString = 'translate(' + xdiff + ", " + ydiff + ") scale(0)";
				popoverElemInnerElem.style.transform = transformString;
				popoverElem.removeClass('lytePopoverZoomAnimation');
				break;
			case "pop":
				transformString = "scale(" + this.getData("ltPropScaleFrom") + ")";
				popoverElemInnerElem.style.transform = transformString;
				popoverElem.removeClass('lytePopoverPopAnimation');
				break;
		}
		var _self = this;

		if(this.getData('ltPropFreeze') && popStack && popStack.length > 1){
			$L(this.childComp).find('.lytePopupFreezeLayer').addClass('lyteModalFreezeLayerHidden')
			if(popStack && popStack.length > 1){
				for(var i=popStack.length-2 ; i>=0 ;i--){
					var prevFreeze = $L(popStack[i].parentElement.component.childComp).find('.lytePopupFreezeLayer')
					if(prevFreeze[0]){
						prevFreeze.removeClass('lyteModalFreezeLayerHidden')
						i=-1;
					}
				}
			}
		}

		this.closePopoverTransition = setTimeout(function() {
			if(_self.$node && _self.$node.mutobserver){
				_self.$node.mutobserver.disconnect()
			}
			$L(_self.childComp).trapFocus('destroy')
			_self.unsetDimensions();
			popoverElem.removeClass('lytePopoverShow').addClass('lytePopoverHide');
			popoverElem.removeClass('lytePopoverZoom lytePopoverPop');
			_self.setData("ltPropShow", false);
			popoverElemInnerElem.style.transform = '';
			popoverElemInnerElem.classList.remove(
				"lytePopoverLeft", 
				"lytePopoverLeftCenter",
				"lytePopoverLeftBottom",
				"lytePopoverTopLeft",
				"lytePopoverTop",
				"lytePopoverTopRight",
				"lytePopoverRight",
				"lytePopoverRightCenter",
				"lytePopoverRightBottom",
				"lytePopoverBottom",
				"lytePopoverBottomLeft",
				"lytePopoverBottomRight"
			)

			$L(_self.$node).removeClass('lytePopoverOpened')

			_self.setData('ltPropShowWormhole' , false)

			if(_self.getMethods("onClose") && !_self.getData('onCloseTriggered')){
				_self.setData('onCloseTriggered' , true)
				_self.executeMethod( "onClose" , event , _self , _self.actualModalDiv);
			}
			_self.event = null
		},duration)
	},



	//Observer funcitons
	_showPopover : function(){
		if(this.getData('triggeredFromLocal')){
			this.setData('triggeredFromLocal' , false)
			return
		}
		var event = event || window.event || {}
		if(this.closePopoverTransition){
			clearTimeout(this.closePopoverTransition)
		}
		var originElem = $L(this.getData('ltPropOriginElem'))[0]
		var animationType = this.getData('ltPropAnimation');
		var duration = parseInt(this.getData('ltPropDuration'))
		if(!this.getData('ltPropShow') && this.actualModalDiv){

			var closeResult = true;

			if(this.getMethods("onBeforeClose")){
				closeResult = this.executeMethod("onBeforeClose",event,this , this.actualModalDiv);
			}
			if(closeResult !== false){
				this._closePopover(event);
			}
			if(closeResult === false){
				this.setData('triggeredFromLocal' , true)
				this.setData('ltPropShow' , true)
			}
			return;
		}

		this.closePrevPopup()

		if(this.getData('ltPropShow')){
			this.setData('onCloseTriggered' , false)
			this.setData('finalPosition' , '')
			if(this.closePopoverTransition){
				clearTimeout(this.closePopoverTransition); 
			}

			if(this.getData('ltPropHostElement') !== ""){
				originElem = $L(document.querySelector(this.$node.ltProp('hostElement')))[0].shadowRoot.querySelector(this.getData('ltPropOriginElem'))
			} else {
				originElem = $L(this.getData('ltPropOriginElem'))[0]
			}

			if(!originElem && Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
				console.error("Please provide values for either ltPropOriginElem or ltPropOffset to open the popover at proper position.")
				this.setData('ltPropShow',false);
				return;
			}
			
			this.setData('ltPropBindToBody' , true)
			this.setData('ltPropShowWormhole' , true)

			if(this.childComp){
				$L(this.childComp).removeClass('lytePopoverVisibilityHidden')
			}
			var result = true;
			if(this.getMethods("onBeforeShow")){
				result = this.executeMethod("onBeforeShow",this , this.actualModalDiv , this.childComp);
			}
			if(result !== false){

				var popoverElem = $L(this.childComp).find('.lytePopoverWrapper');
				popoverElem.addClass('lytePopoverShow').removeClass('lytePopoverHide');

				popoverElem[0].style.zIndex = _lyteUiUtils.getZIndex();

				this.setPopoverWidth()
				this.setPopoverHeight()
				this.setPopoverMaxWidth()
				this.setPopoverMaxHeight()
				this.setPadding()

				if(this.getData('ltPropFreeze')){
					var freezeElem = $L(this.childComp).find('.lytePopupFreezeLayer')
					freezeElem[0].style.opacity = this.getData('ltPropDimmer').opacity
					freezeElem[0].style.background = this.getData('ltPropDimmer').color
					var popStack = _lyteUiUtils.popupStack.globalStack
					freezeElem.removeClass('lyteModalFreezeLayerHidden')
					if(popStack && popStack.length > 1){
						for(var i=popStack.length-2 ; i>=0 ;i--){
							var prevFreeze = $L(popStack[i].parentElement.component.childComp).find('.lytePopupFreezeLayer')
							if(prevFreeze[0]){
								prevFreeze.addClass('lyteModalFreezeLayerHidden')
								i=-1;
							}
						}
					}
				} 
				// else {
				// 	// this.setData('ltPropFreeze' , false)
				// 	// this.setData('showFreeze' , false)
				// }


				// if(!Lyte.Component.registeredHelpers.lyteUiIsEmptyObject(this.$node.ltProp('offset'))){
				// 	// this.setData('ltPropOriginElem' , '')
				// 	this.setPopoverWithOffset()
				// 	if(this.getData('ltPropType') === 'callout'){
				// 		this.setArrowPosition(this.getData('ltPropPlacement'));
				// 	}
				// } else if(originElem){
					if(!this.getData('ltPropOffsetForParent')){
						this.setPopoverPosition();
					} else {
						this.setDirectPopoverPosition();
					}
				// }

				this.addMutationObserver();
				var popoverElemInnerElem = popoverElem.find('.lytePopoverElement')[0];
				var transformString;
				if(animationType === "pop" || animationType === "zoom") {
					if( animationType === "pop") {
						popoverElem.addClass('lytePopoverPop');
						transformString = "scale(" + this.getData("ltPropScaleFrom") + ")";
					}
					else {
						var finalPosition = this.getData("finalPosition");
						var popoverElemDim = popoverElemInnerElem.getBoundingClientRect();
						var popoverElemLeft = popoverElemDim.x + (popoverElemDim.width / 2);
						var popoverElemTop = popoverElemDim.y + (popoverElemDim.height / 2);
						var originElemMidPoint = this.getTargetMidPoint();
						var originElemLeft = originElemMidPoint.midWidth;
						var originElemTop = originElemMidPoint.midHeight;
						var xdiff = -1 * (popoverElemLeft - originElemLeft) + "px";
						var ydiff = -1 * (popoverElemTop - originElemTop) + "px";
						if(finalPosition == "left" || finalPosition == "leftBottom" || finalPosition == "leftCenter") {
							xdiff = "50%";
						}
						else if(finalPosition == "right" || finalPosition == "rightBottom" || finalPosition == "rightCenter") {
							xdiff = "-50%";
						}
						else if(finalPosition == "top" || finalPosition == "topLeft" || finalPosition == "topRight") {
							ydiff = "50%";
						}
						else if(finalPosition == "bottom" || finalPosition == "bottomLeft" || finalPosition == "bottomRight") {
							ydiff = "-50%";
						}

						popoverElem.addClass('lytePopoverZoom');
						transformString = 'translate(' + xdiff + ", " + ydiff + ") scale(0)";
					}
					popoverElemInnerElem.style.transition = 'none';
					popoverElemInnerElem.style.transform = transformString;
				}
				var _self = this;
				setTimeout(function() {
					var animType = _self.getData('ltPropAnimation');
					popoverElemInnerElem.style.transition = '';
					popoverElemInnerElem.style.transitionDuration = (duration+'ms')
					switch (animType) {
						case "fade":
							
							popoverElem.addClass('lytePopoverFadeAnimation')
							break;
						case "zoom":
							popoverElemInnerElem.style.transform = 'translate(0, 0) scale(1)';
							popoverElem.addClass('lytePopoverZoomAnimation');
							break;
						case "pop":
							popoverElemInnerElem.style.transform = 'scale(1)';
							popoverElem.addClass('lytePopoverPopAnimation');
							break;
					}
					$L(_self.$node).addClass('lytePopoverOpened')
				}, 10);
				setTimeout(function(){
					if(_self.getMethods("onShow")){
						_self.executeMethod("onShow",_self , _self.actualModalDiv);
					}
					if(!_self.getData('ltPropPreventFocus') && _self.getData('ltPropShow')){
						$L(_self.childComp).trapFocus()
					}
					_self.setDimension()
				},duration+10)
			} else {
				this.setData('ltPropShow' ,false)
				this.setData('ltPropBindToBody' , false)
				this.setData('ltPropShowWormhole' , false)
			}
		}

	}.observes('ltPropShow').on('didConnect'),

	_changeHeight : function(){
	if(this.actualModalDiv && this.getData('ltPropShow')){
		this.setPopoverHeight();
	}
	}.observes('ltPropHeight'),

	_changeWidth : function(){
		if(this.actualModalDiv && this.getData('ltPropShow')){
			this.setPopoverWidth();
		}
	}.observes('ltPropWidth'),

	_changeOriginElem : function(){
		if(this.actualModalDiv && this.getData('ltPropShow')){
			if(!this.getData('ltPropOffsetForParent')){
				this.setPopoverPosition();
			} else {
				this.setDirectPopoverPosition();
			}
		}
	}.observes('ltPropOriginElem'),

	_changePlacement : function(){
		if(this.actualModalDiv && this.getData('ltPropShow')){
			this.unsetDimensions();
			var popoverElem = $L(this.childComp).find('.lytePopoverWrapper')
			var popoverElemInnerElem = popoverElem.find('.lytePopoverElement')[0];
			popoverElemInnerElem.style.transform = '';
			popoverElemInnerElem.classList.remove(
				"lytePopoverLeft", 
				"lytePopoverLeftCenter",
				"lytePopoverLeftBottom",
				"lytePopoverTopLeft",
				"lytePopoverTop",
				"lytePopoverTopRight",
				"lytePopoverRight",
				"lytePopoverRightCenter",
				"lytePopoverRightBottom",
				"lytePopoverBottom",
				"lytePopoverBottomLeft",
				"lytePopoverBottomRight"
			)
			if(!this.getData('ltPropOffsetForParent')){
				this.setPopoverPosition();
			} else {
				this.setDirectPopoverPosition();
			}
		}
	}.observes('ltPropPlacement'),

	_offsetChanges : function(){
		if(this.childComp){
			var popoverElem = $L(this.childComp).find('.lytePopoverWrapper')
			var popoverElemInnerElem = popoverElem.find('.lytePopoverElement')[0];
			if(popoverElem.find('#lytePopoverArrow')[0]){
				popoverElem.find('#lytePopoverArrow')[0].style.left = ''
				popoverElem.find('#lytePopoverArrow')[0].style.right = ''
				popoverElem.find('#lytePopoverArrow')[0].style.bottom = ''
				popoverElem.find('#lytePopoverArrow')[0].style.top = ''
			}
			if(popoverElemInnerElem){
				popoverElemInnerElem.style.left = ''
				popoverElemInnerElem.style.right = ''
				popoverElemInnerElem.style.bottom = ''
				popoverElemInnerElem.style.top = ''
			}
			if(!this.getData('ltPropOffsetForParent')){
				this.setPopoverPosition();
			} else {
				this.setDirectPopoverPosition();
			}
		}
	}.observes('ltPropOffset'),
	
	_dimmerChanges : function(){
		if(this.childComp && this.getData('ltPropShow')){
			if ($L(this.childComp).find('.lytePopupFreezeLayer')[0]) {
				var freezeElem = $L(this.childComp).find('.lytePopupFreezeLayer')
				if(!this.getData('ltPropDimmer').color){
					freezeElem[0].style.background = freezeElem[0].style.background
				} else {
					freezeElem[0].style.background = this.getData('ltPropDimmer').color
				}
				if(!this.getData('ltPropDimmer').opacity){
					freezeElem[0].style.opacity = freezeElem[0].style.opacity
				} else {
					freezeElem[0].style.opacity = this.getData('ltPropDimmer').opacity	
				}
			}
		}
	}.observes('ltPropDimmer'),

	_observeClickEvent : function(){
        _lyteBetaPopover._stopPropagation = this.getData('ltPropStopClick');
        if(_lyteBetaPopover._stopPropagation){
            _lyteBetaPopover._sourceComp = this;
        }
        else{
            if(_lyteBetaPopover._sourceComp){
                delete _lyteBetaPopover._sourceComp;
            }
        }
    }.observes('ltPropStopClick'),

	_popoverChanges : function(){

		var popoverElem = $L(this.childComp).find('.lytePopoverElement')
		if(popoverElem[0]){
			var popoverElemDim = popoverElem[0].getBoundingClientRect()
		}

		var originElem = $L(this.getData('ltPropOriginElem'))
		if(originElem[0]){
			var originElemDim = originElem[0].getBoundingClientRect()
		}

		// this.popoverObserver = new MutationObserver(function(mutations) {
		// 	mutations.forEach(function(mutation) {

		// 	});
		// });

		const config = { attributes: true, childList: true, subtree: true };

		this.popoverObserver.observe(popoverElem[0], config);
	},

	_draggableFunction:function(){
		if(this.childComp && this.getData('ltPropShow')){
			if(this.getData('ltPropDragHandle') !== ''){
				if(this.getData('ltPropDraggable') && $L(this.childComp).find(this.getData('ltPropDragHandle'))[0]){
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].style.cursor="move";
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].addEventListener('mousedown' , this.mousedownFun)
					return
				} else {
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].style.cursor="";
					$L(this.childComp).find(this.getData('ltPropDragHandle'))[0].removeEventListener('mousedown' , this.mousedownFun)
				}
			}
			if(this.getData('ltPropDraggable')){
				$L(this.childComp).find('lyte-popover-header')[0].style.cursor="move";
				$L(this.childComp).find('lyte-popover-header')[0].addEventListener('mousedown' , this.mousedownFun)
			} else {
				$L(this.childComp).find('lyte-popover-header')[0].style.cursor="";
				$L(this.childComp).find('lyte-popover-header')[0].removeEventListener('mousedown' , this.mousedownFun)
			}
		}
	},
	removeDOMReferences : function(){
        if(this.childComp){
            delete this.childComp;
        }
        if(this.actualModalDiv){
            delete this.actualModalDiv;
        }
    },

	didDestroy : function(){

		this.setData('ltPropShowWormhole', false);
		// this.$node.classList.remove('lytePopoverOpened');
		if(this.getData('showDragFreeze')){
			window.removeEventListener('mousemove' , this.mousemoveFun);
			window.removeEventListener('mouseup' , this.mouseupFun);
			this.setData('showDragFreeze' , false)
			var popover = $L('.lytePopoverDragRunning')[0]
			$L('.lytePopoverDragRunning').removeClass('lytePopoverDragRunning')
			popover.style.overflow = "auto"
		}

		clearTimeout(this.closePopoverTransition); 
		if(this.popoverObserver){
			this.popoverObserver.disconnect();
			delete this.popoverObserver
		}
		if(_lyteUiUtils.targetAvailable){
			delete _lyteUiUtils.targetAvailable
		}

        if(this.childComp){
			if(this.getMethods("onClose") && !this.getData('onCloseTriggered')){
				this.setData('onCloseTriggered' , true)
				this.executeMethod("onClose",window.event , this , this.actualModalDiv);
			}
			this.event = null
            if(this.tIdBeforeClose){
                clearTimeout(this.tIdBeforeClose);
                this.tIdBeforeClose = false;
            }
            if(this.tIdClose){
                clearTimeout(this.tIdClose);
                this.tIdClose = false;
            }
            if(this.getData('ltPropFreeze') && this.addedFreezeDetails){
                LytePopup.hideOrShowFreeze("close",this);
                delete this.addedFreezeDetails;
            }
            
            this.childComp.remove();
            if(!this.getData('ltPropFreeze') && document.body.classList.contains('lyteStopBodyScrolling')){
                document.body.classList.remove('lyteStopBodyScrolling');
            }
			this.removeDOMReferences();
        }

	}

});

;(function(){
  if($L){
    $L.prototype.trapFocus = function(arg){
      var preventdefault = false
      var forLytePopups = false
      $L(this).addClass('lyteFocusTrappedElement')
      if(arg && arg.preventDefault){
        preventdefault = arg.preventDefault
      }
      if(arg && arg.forLytePopups){
        forLytePopups = arg.forLytePopups
      }

      if((_lyteUiUtils.trappingFocus)&&($L("#"+_lyteUiUtils.focusParent)[0])){
        $L(this[0]).data('trapFocusActiveIndex' , 0)
        _lyteUiUtils.removeEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
        $L("#"+_lyteUiUtils.focusParent)[0].removeEventListener('keydown' , _lyteUiUtils.trapFocusFun)
        _lyteUiUtils.trappingFocus = false
        _lyteUiUtils.focusParent = "";
      }
      var parent = this[0];
      if(arg === 'destroy' || arg === "Destroy"){
        $L(this[0]).data('trapFocusActiveIndex' , 0)
        $L(this).removeClass('lyteFocusTrappedElement')
        _lyteUiUtils.removeEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
        $L(parent)[0].removeEventListener('keydown' , _lyteUiUtils.trapFocusFun)
        _lyteUiUtils.trappingFocus = false
        _lyteUiUtils.focusParent = "";
        _lyteUiUtils.addEventListenerGlobal('keydown',LytePopup.onEscape,true);
        return;
      }
      _lyteUiUtils.removeEventListenerGlobal('keydown',LytePopup.onEscape,true);

      var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable],*:not([aria-attribute="true"])';
    

      var iniFocusableItems = [];
      iniFocusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
        return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
      })
      iniFocusableItems = iniFocusableItems.not('[aria-hidden="true"]');
      if(iniFocusableItems.length < 1){
        if(!$L(this).attr('tabindex')){
          $L(this).attr('tabindex' , 0)
        }
        iniFocusableItems.push($L(this)[0])
      }
      if(iniFocusableItems.indexOf(document.activeElement) < 0){
        if($L(iniFocusableItems[0]).hasClass('lyteModalClose')){
          if(iniFocusableItems[1]){
            iniFocusableItems[1].focus()
          }
        } else {
          if(arg && arg.focusTarget && $L(arg.focusTarget)[0]){
            iniFocusableItems[iniFocusableItems.indexOf($L(arg.focusTarget)[0])].focus()
          } else {
            iniFocusableItems[0].focus()
          }
        }
      }

      if(forLytePopups){
        if(!preventdefault){

          _lyteUiUtils.trapFocusFun = function(evt){
  
            _lyteUiUtils.trappingFocus = true
            _lyteUiUtils.focusParent = $L(parent).attr('id');
            
            if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.globalStack.length < 1){
              return
            }

            var lastPopup = _lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length - 1]
            if(lastPopup.parentElement.tagName === 'LYTE-BETA-MODAL' || lastPopup.parentElement.tagName ===  'LYTE-BETA-POPOVER'){
              var parent = _lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length - 1].childElement
            } else {
              return
            }
  
            var focusableItems;
            focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
              return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
            })
  
            if(focusableItems.length < 1){
              focusableItems.push($L(parent)[0])
            }
            if((evt.keyCode === 9) || (evt.keyCode === 9 && evt.shiftKey)){
              if(focusableItems.indexOf(document.activeElement) < 0){
                focusableItems[0].focus()
              }
              if(focusableItems.length == 0){
                  return;
              }
  
              var focusedItem = document.activeElement;
              var focusedParent;
  
              if(!(parent.contains(focusedItem))){
                focusedParent = $L(focusedItem).closest('lyte-drop-box')[0]
                if(focusedParent){
                  focusedParent = focusedParent.origindd
                }
                if(!(parent.contains(focusedParent))){
                  LytePopup.initializeFocus(parent);
                  evt && evt.preventDefault();
                  return;
                }
              }
  
              var numberOfFocusableItems = focusableItems.length;
  
              var focusedItemIndex;
              for(var i = 0; i < focusableItems.length; i++){
                  if(focusableItems[i] == focusedItem){
                      focusedItemIndex = i;
                      break;
                  }
              }
  
              if (evt.shiftKey && evt.keyCode == 9) {
                  if (focusedItemIndex == 0) {
                      focusableItems.get(numberOfFocusableItems - 1).focus();
                      evt.preventDefault();
                  }
  
              } else if(evt.keyCode == 9){
                  if (focusedItemIndex == numberOfFocusableItems-1) {
                      focusableItems.get(0).focus();
                      evt.preventDefault();
                  }
              }
            }
          }
  
          _lyteUiUtils.addEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
  
  
        }
      } else {
        if(!preventdefault){

          _lyteUiUtils.trapFocusFun = function(evt){
  
            _lyteUiUtils.trappingFocus = true
            _lyteUiUtils.focusParent = $L(parent).attr('id');
  
            var focusableItems;
            focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
              return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
            })
  
            if(focusableItems.length < 1){
              focusableItems.push($L(parent)[0])
            }
            if((evt.keyCode === 9) || (evt.keyCode === 9 && evt.shiftKey)){
              if(focusableItems.indexOf(document.activeElement) < 0){
                focusableItems[0].focus()
              }
              if(focusableItems.length == 0){
                  return;
              }
  
              var focusedItem = document.activeElement;
              var focusedParent;
  
              if(!(parent.contains(focusedItem))){
                focusedParent = $L(focusedItem).closest('lyte-drop-box')[0]
                if(focusedParent){
                  focusedParent = focusedParent.origindd
                }
                if(!(parent.contains(focusedParent))){
                  LytePopup.initializeFocus(parent);
                  evt && evt.preventDefault();
                  return;
                }
              }
  
              var numberOfFocusableItems = focusableItems.length;
  
              var focusedItemIndex;
              for(var i = 0; i < focusableItems.length; i++){
                  if(focusableItems[i] == focusedItem){
                      focusedItemIndex = i;
                      break;
                  }
              }
  
              if (evt.shiftKey && evt.keyCode == 9) {
                  if (focusedItemIndex == 0) {
                      focusableItems.get(numberOfFocusableItems - 1).focus();
                      evt.preventDefault();
                  }
  
              } else if(evt.keyCode == 9){
                  if (focusedItemIndex == numberOfFocusableItems-1) {
                      focusableItems.get(0).focus();
                      evt.preventDefault();
                  }
              }
            }
          }
  
          _lyteUiUtils.addEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
  
  
        } else {
  
          $L(parent).data('trapFocusActiveIndex' , 0)
  
          _lyteUiUtils.trapFocusFun = function(evt){
  
            var index = $L(parent).data('trapFocusActiveIndex')
            var focusableItems;
            focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
              return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
            }).toArray()
  
            if(arg && arg.attachItems){
              var attachItemsString = arg.attachItems.join(',')
              var attachItemArr = $L(attachItemsString).toArray()
              for(var i=0;i<attachItemArr.length;i++){
                focusableItems.push(attachItemArr[i])
              }
            }
  
            if(focusableItems.indexOf(document.activeElement) !== index){
              index = focusableItems.indexOf(document.activeElement)
              $L(parent).data('trapFocusActiveIndex' , index)
            }
  
            if (evt.shiftKey && evt.keyCode == 9) {
              index -=1
              if(index < 0){
                index = focusableItems.length - 1
              }
              focusableItems[index].focus()
              evt.preventDefault()
              $L(parent).data('trapFocusActiveIndex' , index)
            } else if(evt.keyCode == 9){
              index +=1
              if(index > focusableItems.length-1){
                index = 0
              }
              focusableItems[index].focus()
              evt.preventDefault()
              $L(parent).data('trapFocusActiveIndex' , index)
            }
  
          }
  
          _lyteUiUtils.addEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
  
        }
  
      }
    }
  }
}());
