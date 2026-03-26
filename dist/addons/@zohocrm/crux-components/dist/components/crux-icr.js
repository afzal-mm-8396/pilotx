/**
 * @component crux-icr
 * @author Gowtham Prasath gowtham.mp@zohocorp.com
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-icr", {
_template:"<template tag-name=\"crux-icr\"> <div class=\"cxCompWrapper\" style=\"display: flex;\"> <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"cxConnectionContainer\"> <defs> <marker id=\"cxConnectionStart\" style=\"fill:{{connectionMarkerColor}};\" markerUnits=\"strokeWidth\" markerWidth=\"12\" markerHeight=\"12\" refX=\"0\" refY=\"2\" orient=\"auto\"> <path d=\"M0,4 A 2,2,0,0,0 0,0 Z\"></path> </marker> <marker id=\"cxConnectionEnd\" style=\"fill:{{connectionMarkerColor}};\" markerUnits=\"strokeWidth\" markerWidth=\"12\" markerHeight=\"12\" refX=\"6\" refY=\"6\" orient=\"auto\"> <ellipse cx=\"6\" cy=\"6\" rx=\"2\" ry=\"2\"></ellipse> </marker> </defs> </svg> <div class=\"cxImageOuterWrapper\" onmouseleave=\"{{action('mouseLeave')}}\"> <div class=\"cxImageWrapper\" style=\"height:{{cxPropHeight}};width:{{cxPropWidth}};max-height:{{cxPropHeight}};max-width:{{cxPropWidth}}\"> <div class=\"cxImageInnerWrapper\"> <template is=\"if\" value=\"{{cxPropShowRuler}}\"><template case=\"true\"> <span class=\"cxSelectionXaxisRuler\"></span> <span class=\"cxSelectionYaxisRuler\"></span> </template></template> <img id=\"image\" src=\"{{cxPropImagePath}}\" alt=\"{{cxPropImageAlt}}\" class=\"cxIcrImage {{cxPropImageClass}}\"> </div> </div> <div class=\"cxImageOptionsWrapper\"> <div class=\"cxZoom {{if(expHandlers(selectorLoaded,'!'),'cxHide')}}\"> <template is=\"if\" value=\"{{expHandlers(zoomData.zoomScale,'!=',1)}}\"><template case=\"true\"><span class=\"cxResetZoom\" onclick=\"{{action('handleZoom','reset')}}\">{{cruxGetI18n('crm.layout.fit.to.screen')}}</span></template></template> <span onclick=\"{{action('handleZoom','out')}}\" class=\"cxZoomOut {{if(expHandlers(zoomData.zoomScale,'==',cxPropMinZoom),'cxDisableZoom')}}\">-</span> <span class=\"cxZoomPer {{if(expHandlers(zoomData.zoomScale,'==',1),'cxDisableZoom')}}\" onclick=\"{{action('handleZoom','reset')}}\">{{zoomData.zoomPer}}</span> <span onclick=\"{{action('handleZoom','in')}}\" class=\"cxZoomIn {{if(expHandlers(zoomData.zoomScale,'==',cxPropMaxZoom),'cxDisableZoom')}}\">+</span> </div> </div> </div> <div class=\"cxImageFieldWrapper\"> <lyte-yield yield-name=\"field-yield\"></lyte-yield> </div> </div> <template is=\"if\" value=\"{{expHandlers(cxPropFrom,'!==','view')}}\"><template case=\"true\"> <lyte-menu lt-prop-freeze=\"false\" lt-prop-yield=\"true\" class=\"{{cxPropMenuClass}}\" lt-prop-query=\"{{if(menuData.originElem,menuData.originElem,&quot;cxDummyQuery&quot;)}}\" lt-prop-show=\"{{menuData.show}}\" on-menu-click=\"{{method('menuSelected')}}\" on-before-open=\"{{method('beforeMenuOpen')}}\" on-before-close=\"{{method('beforeMenuClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item data-value=\"associateField\" class=\"{{if(selectedMenu,'cxMenuSelected')}}\"> <lyte-menu-label>{{cruxGetI18n('crm.icr.associatefield')}}</lyte-menu-label> </lyte-menu-item> <template is=\"if\" value=\"{{cxPropAllowDelete}}\"><template case=\"true\"><lyte-menu-item data-value=\"removeTag\"> <lyte-menu-label>{{cruxGetI18n('crm.icr.removetag')}}</lyte-menu-label> </lyte-menu-item></template></template> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'fill:'","connectionMarkerColor","';'"]}}}},{"type":"attr","position":[1,1,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'fill:'","connectionMarkerColor","';'"]}}}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height:'","cxPropHeight","';width:'","cxPropWidth","';max-height:'","cxPropHeight","';max-width:'","cxPropWidth"]}}}},{"type":"attr","position":[1,3,1,1,1]},{"type":"if","position":[1,3,1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,1,1,3]},{"type":"attr","position":[1,3,3,1]},{"type":"attr","position":[1,3,3,1,1]},{"type":"if","position":[1,3,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,3,1,3]},{"type":"attr","position":[1,3,3,1,5]},{"type":"text","position":[1,3,3,1,5,0]},{"type":"attr","position":[1,3,3,1,7]},{"type":"insertYield","position":[1,5,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropFrom","cxPropImagePath","cxPropImageAlt","cxPropTooltipClass","cxPropMenuClass","cxPropImageClass","cxPropSelectionData","cxPropSelectorMinWidth","cxPropSelectorMinHeight","cxPropColorCodes","cxPropMinZoom","cxPropMaxZoom","cxPropConnectionType","cxPropHeight","cxPropWidth","cxPropShowRuler","cxPropAllowCreate","cxPropAllowDelete","cxPropAllowDrag","cxPropIsRtl","cxPropHoverCallbackDelay","cxPropPreventOverlap","cxPropDisableColor","connectionMarkerColor","menuData","zoomData","selectedMenu","selectorLoaded"],
_observedAttributesType :["string","string","string","string","string","string","array","number","number","array","number","number","string","string","string","boolean","boolean","boolean","boolean","boolean","number","boolean","string","string","object","object","boolean","boolean"],

	data: function () {
		return {
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropFrom:  Lyte.attr('string',{default:'create'}),
			/**
			 * @componentProperty { string } cxPropImagePath
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropImagePath: Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropImageAlt
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropImageAlt: Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropTooltipClass: Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropMenuClass
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropMenuClass: Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropImageClass
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropImageClass: Lyte.attr('string'),
			/**
			 * @componentProperty { array } cxPropSelectionData
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropSelectionData: Lyte.attr('array', { default: [{}] }),
			/**
			 * @componentProperty { number } cxPropSelectorMinWidth
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropSelectorMinWidth: Lyte.attr('number',{default:1}),
			/**
			 * @componentProperty { number } cxPropSelectorMinHeight
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropSelectorMinHeight: Lyte.attr('number',{default:1}),
			/**
			 * @componentProperty { array } cxPropColorCodes
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropColorCodes: Lyte.attr('array', { default: ['#FF0000', '#088802', '#001BFF', '#9700FF'] }),
			/**
			 * @componentProperty { number } cxPropMinZoom
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMinZoom: Lyte.attr('number',{default:1}),
			/**
			 * @componentProperty { number } cxPropMaxZoom
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxZoom: Lyte.attr('number',{default:6}),
			/**
			 * @componentProperty { string } cxPropConnectionType
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropConnectionType: Lyte.attr('string',{default:'elbow'}),
			/**
			 * @componentProperty { string } cxPropHeight
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropHeight: Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropWidth
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropWidth: Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropShowRuler=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropShowRuler: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropAllowCreate=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropAllowCreate: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropAllowDelete=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropAllowDelete: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropAllowDrag=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropAllowDrag: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropIsRtl=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropIsRtl:Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { number } cxPropHoverCallbackDelay
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropHoverCallbackDelay: Lyte.attr('number',{default:100}),
			/**
			 * @componentProperty { boolean } cxPropPreventOverlap=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropPreventOverlap: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { string } cxPropDisableColor
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			cxPropDisableColor: Lyte.attr('string',{default:'#9ca1a6'}),
			/**
			 * @componentProperty { string } connectionMarkerColor
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			connectionMarkerColor: Lyte.attr('string'),
			/**
			 * @componentProperty { object } menuData
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			menuData: Lyte.attr('object'),
			/**
			 * @componentProperty { object } zoomData
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			zoomData: Lyte.attr('object', { default: { zoomOut: false, zoomIn: true, zoomPer: '100%', zoomScale: 1 } }),
			/**
			 * @componentProperty { boolean } selectedMenu=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			selectedMenu: Lyte.attr('boolean', { default: false }),
			/**
			 * @componentProperty { boolean } selectorLoaded=false
			 * @author Gowtham Prasath gowtham.mp@zohocorp.com
			 * @version 1.0.0
			 */
			selectorLoaded: Lyte.attr('boolean', { default: false })
		}
	},
	init: function () {
		this.$node.hideSelection = (count)=>{
			this.displayConnection(count,false,true);
			this.displaySelection(count,false);
		};
		this.$node.showSelection = (count)=>{
			this.displaySelection(count,true);
		};
		this.$node.disableSelection = (count,disable)=>{
			this.disableSelection(count,disable);
		};
		/**
		 * @utility showConnection
		 * @author Gowtham Prasath gowtham.mp@zohocorp.com
		 * @version 1.0.0
		 * @param { * } count
		 * @param { * } show
		 */
		this.$node.showConnection = function(count,show){
			this.displayConnection(count,show,true);
		}.bind(this);
		/**
		 * @utility deleteConnection
		 * @author Gowtham Prasath gowtham.mp@zohocorp.com
		 * @version 1.0.0
		 * @param { * } count
		 */
		this.$node.deleteConnection = function(count){
			this.removeConnection(count);
		}.bind(this)
		this.$node.getOverlapedSelections = (elem)=>{
			return this.selectionElem.data().getIntersectedNodes(elem)
		}
	},
	didDestroy: function () {
		let innerWrapper = $L('.cxImageInnerWrapper', this.$node);
		innerWrapper.off('click', this.clickHandler);
		innerWrapper.off('mousemove', this.mouseMoveHandler);
		$L('.cxImageWrapper',this.$node).off('scroll',this.scrollHandler);
		$L('.cxImageOuterWrapper').off('mousedown', this.mouseDownHandler);

		this.connectionElem = null;
		this.selectionElem = null;
		this.imageWrapper = null;
	},
	didConnect: function () {

		//color classes
		this.connectionElem = $L('.cxCompWrapper');
		this.selectionElem = $L("#image");
		this.imageWrapper = $L('.cxImageWrapper');
		this.colorCodes = Array.from(this.getData('cxPropColorCodes'));
		var _this = this;
		// $L('.cxImageInnerWrapper', this.$node).scroll({'verticalPosition':this.getData('cxPropIsRtl')?'right':'left'})
		this.imageWrapper.scroll({'verticalPosition':this.getData('cxPropIsRtl')?'right':'left'})
		this.mouseDownHandler = (lyteEvent)=>{
			_this.showStableConnection(lyteEvent.target,true);
		};
		this.clickHandler = function (lyteEvent) {
			_this.showMenu(lyteEvent.target, 'click',true);
		};
		this.mouseMoveHandler = function (lyteEvent) {
			if(!_this.stableConnectionShown){
				_this.handleConnection(lyteEvent.target);
			}
			if(_this.getData('cxPropShowRuler')){
				_this.transformRuler(lyteEvent);
			}
		};
		this.scrollHandler = function(){
			if(!_this.stableConnectionShown && _this.prevSelectionElem){
				_this.showOrHideConnection(_this.prevSelectionElem,false)
			}else if(_this.stableConnectionShown && _this.prevSelectionElem){
				_this.handleConnection(_this.prevSelectionElem,true);
			}
			// _this.updateConnection();
		}
		let imageInnerWrapper = $L('.cxImageInnerWrapper', this.$node);
		$L('.cxImageOuterWrapper').on('mousedown', this.mouseDownHandler);
		imageInnerWrapper.on('click', this.clickHandler);
		imageInnerWrapper.on('mousemove', this.mouseMoveHandler);
		$L('.cxImageWrapper',this.$node).on('scroll',this.scrollHandler);
	},
	imageObserver: function(change){
		this.tagCount = 0;
		this.selectionData = {};
		if(change && change.oldValue){ //when image changes, below has to be done
			this.connectionElem.connection( 'destroy' )
			if(this.selectorAdded){
				this.zoomHandler('reset')
				this.selectionElem.selector({destroy:true})
				this.selectorAdded = false;
			}
			this.selectionElem.off('load',this.addSelectorBind)
		}
		if(this.getData('cxPropImagePath')){
			this.setData('selectorLoaded',false);
			this.addSelectorBind = this.addSelector.bind(this);
			this.addConnection();
			this.selectionElem.on('load',this.addSelectorBind)
		}
	}.observes('cxPropImagePath').on('didConnect'),
	resizeImage: function(){
		var ratio = this.selectionElem[0].naturalWidth/this.selectionElem[0].naturalHeight;
		var wrapperRect = $L('.cxImageWrapper')[0].getBoundingClientRect();
		var newHeight, newWidth;
		if(ratio>1){
			newWidth = wrapperRect.width-100;
			newHeight = newWidth / ratio;
			if(newHeight > wrapperRect.height-100){ 
				newHeight = wrapperRect.height-100;
				newWidth = newHeight*ratio;
			}
		}
		else{
			newHeight = wrapperRect.height-100;
			newWidth = newHeight * ratio;
			if(newWidth > wrapperRect.width-100){ 
				newWidth =  wrapperRect.width-100;
				newHeight = newWidth / ratio;
			}
		}
		this.selectionElem.css({height:newHeight+'px',width:newWidth+'px'});
	},
	addSelector: function () {
		 this.resizeImage();
		this.selectorAdded = true;
		var _this = this;
		this.selectionElem.selector({
			classAttr: 'data-color',
			classList:'hello',
			zoomEnabled: true,
			initHeight:this.getData('cxPropSelectorMinHeight') ,
			initWidth: this.getData('cxPropSelectorMinWidth'),
			selections: this.getData('cxPropSelectionData'),
			preventOverlap: this.getData('cxPropPreventOverlap'),
			preventOverlapClass: this.getData('cxPropPreventOverlapClass'),
			onRenderComplete: function(){
				_this.setData('selectorLoaded',true);
			},
			onBeforeCreate: function(elem, manual){
				if(manual){
					return _this.getData('cxPropAllowCreate');
				}
				// if(_this.getData('cxPropFrom')==="view" && init){
				// 	return false;
				// }
			},
			onCreate: function (selectionElem,manual) {
				selectionElem.dataset.count = ++_this.tagCount;
				selectionElem.id = "selection_tag_" + (_this.tagCount);
				_this.selectionData[_this.tagCount] = {id:selectionElem.id}
				if(manual){
					_this.ignoreClick = true;
					_this.showMenu(selectionElem,undefined,true);
				}
				else {
					if(_this.getData('cxPropSelectionData')[_this.tagCount-1].target){
						_this.associateTag(selectionElem,true);
					}else{
						selectionElem.setAttribute('lt-prop-tooltip-class',_this.getData('cxPropTooltipClass'))
						selectionElem.setAttribute('lt-prop-title',_cruxUtils.getI18n('crm.icr.unassoicatedtext'))
					}
				}

			},
			onDragStart: function (selectionElem) {
				if(_this.getData('cxPropFrom')==="view" || !_this.getData('cxPropAllowDrag')){
					return false;
				}
				else{
					_this.showOrHideConnection(selectionElem, false);
				}
			},
			onDragEnd: function (selectionElem) {
				if (_this.checkIfAssociatedTag(selectionElem)) {
					_this.ignoreClick = true;
					// _this.updateConnection($L('#connection_'+selectionElem.dataset.count));
					_this.showOrHideConnection(selectionElem, true);
				}
			},
			onResizeStart: function (selectionElem) {
				if(_this.getData('cxPropFrom')==="view"){
					return false;
				}
				else{
					if(!_this.checkIfAssociatedTag(selectionElem)){
						_this.showMenu(selectionElem,undefined,false);
					}
					_this.prevSelectionElem = false;
					_this.showOrHideConnection(selectionElem, false);
					if(_this.getMethods('onResizeStart')){
						/**
						 * @method onResizeStart
						 * @author Gowtham Prasath gowtham.mp@zohocorp.com
						 * @version 1.0.0
						 * @param { * } selectionElem
						 */
						_this.executeMethod('onResizeStart',selectionElem)
					}
				}
			},
			onResizeEnd: function (selectionElem) {
				// _this.ignoreHover = false;
				_this.ignoreClick = true;
				if(!_this.overlap){
					if (_this.checkIfAssociatedTag(selectionElem)) {
						// _this.updateConnection($L('#connection_'+selectionElem.dataset.count));
						_this.showStableConnection(selectionElem,true);
						// _this.showOrHideConnection(selectionElem, true);
					}else{
						_this.showMenu(selectionElem,undefined,true);
					}
				}
				_this.overlap = false;
				if(_this.getMethods('onResizeEnd')){
					var currentSelectorData,selectorData = $L( "#image",this.$node ).data( 'lyteSelector' ).getData();
					if(selectorData && selectorData.imageSelections){
						currentSelectorData = selectorData.imageSelections[parseInt(selectionElem.dataset.count)-1];
					}
					/**
					 * @method onResizeEnd
					 * @author Gowtham Prasath gowtham.mp@zohocorp.com
					 * @version 1.0.0
					 * @param { * } selectionElem
					 * @param { * } currentSelectorData
					 */
					_this.executeMethod('onResizeEnd',selectionElem,currentSelectorData)
				}
			},
			onBeforeOverlap: function(intersectedNodes , activeBox){
				if(_this.getMethods('onBeforeOverlap')){
					 /**
					  * @method onBeforeOverlap
					  * @author Gowtham Prasath gowtham.mp@zohocorp.com
					  * @version 1.0.0
					  * @param { * } intersectedNodes
					  * @param { * } activeBox
					  */
					return _this.executeMethod('onBeforeOverlap',intersectedNodes , activeBox);
				}
			},
			onOverlap: function(){
				if(_this.getMethods('onOverlap')){
					_this.overlap = true;
					/**
					 * @method onOverlap
					 * @author Gowtham Prasath gowtham.mp@zohocorp.com
					 * @version 1.0.0
					 */
					_this.executeMethod('onOverlap');
				}
			}
		});
	},
	addConnection: function () {
			this.connectionElem.connection({
				wrapperElement: $L('.cxCompWrapper .cxConnectionContainer').get(0),
				connection_type: "advanced_curve",
				markerStart: "url(#cxConnectionStart)",
				markerEnd:"url(#cxConnectionEnd)",
				connection_type:this.getData('cxPropConnectionType')
			})
	},
	setColorcode: function (type, code, element) {
		switch (type) {
			case 'selection':
				$L(element).css({
					'border':'1px solid ' + code,
					'outline':'1px solid ' + code
				})
				break;
			case 'path':
				element.css('stroke', code);
				break;
			case 'marker':
				this.setData('connectionMarkerColor', code)
				break;
		}
	},
	getSrcPosition: function (selectionElem) {
		var position;
		var containerRect = this.imageWrapper[0].getBoundingClientRect();
		var selectionRect = selectionElem.getBoundingClientRect();
		var isRightHidden = selectionRect.right >= containerRect.right;
		var isBottomHidden = selectionRect.bottom >= containerRect.bottom;
		var isTopHidden = selectionRect.top <= containerRect.top;
		var isLeftHidden = selectionRect.left <= containerRect.left

		if(selectionRect.left>=containerRect.right || 
			selectionElem.right<=containerRect.left  || selectionElem.top<=containerRect.bottom || selectionElem.bottom>=containerRect.top){
				return -1;
		}

		if (!isRightHidden) {
			//check if the center of right is visible
			var rightCenter = selectionRect.top + selectionRect.height / 2;
			var isRCentreVisible = rightCenter > containerRect.top && rightCenter < containerRect.bottom;
			if (isRCentreVisible) {
				position = { x: 1, y: 0.5 }
			}
		}if (!isBottomHidden && !position) {
			var bottomCenter = selectionRect.left + selectionRect.width / 2;
			var isBCentreVisible = bottomCenter > containerRect.left && bottomCenter < containerRect.right;
			if (isBCentreVisible) {
				position = { x: 0.5, y: 1 };
			}
		} if (!isTopHidden && !position) {
			var topCenter = selectionRect.left + selectionRect.width / 2;
			var isBCentreVisible = topCenter > containerRect.left && topCenter < containerRect.right;
			if (isBCentreVisible) {
				position = { x: 0.5, y: 0 };
			}
		} if (!isLeftHidden && !position) {
			var leftCenter = selectionRect.top + selectionRect.height / 2;
			var isBCentreVisible = leftCenter > containerRect.top && leftCenter < containerRect.bottom;
			if (isBCentreVisible) {
				position = { x: 0, y: 0.5 };
			}
		}
		if (!position) {
			//if no edge center is visible, visible corner is chosen
			position = { x: !isLeftHidden ? 0 : 1, y: !isTopHidden ? 0 : 1 }
		}
		//bottom
		//top
		//left


		return position;
	},
	createConnection: function (selectionElem,target,init) {
		this.selectionHoverElem = selectionElem;
		var connectionSrc = '#' + selectionElem.id;
		var connectionClass = selectionElem.classList[0];
		id = "connection_" + selectionElem.dataset.count;
		var srcPosition = this.getSrcPosition(selectionElem);
		let selectionData = this.getData('cxPropSelectionData');
		this.selectionData[selectionElem.dataset.count].srcPosition = srcPosition;
		this.connectionElem.connection('create', connectionSrc, target, { // creating a connection
			id: id, // id of the connector
			// for rtl give src position as target and target as src
			src_position: srcPosition,
			target_position: {
				y: 0.5,
				x: this.getData('cxPropIsRtl')?1:0
			},
			class: connectionClass
		});
		var colorCode = this.getColorCode(selectionData[selectionElem.dataset.count-1],init);
		this.setColorcode('path', colorCode, $L('#' + id + ' .lyteConnectionPath'));
		this.setColorcode('marker', colorCode);
		// selectionElem.style.zIndex = 17;
		// if(init){
		this.showOrHideConnection(selectionElem, false,false,init);
		// }
		

	},
	updateSrcPosition: function(selectionElem){
		var currSrcPosition;
		if (this.checkExistingConnection(selectionElem.dataset.count)) {
				this.setColorcode('marker',selectionElem.dataset.colorcode);
				//compare the src position and update the connection
				currSrcPosition = this.getSrcPosition(selectionElem);
						if(currSrcPosition!==-1 && !$u.isEqual(currSrcPosition,this.selectionData[selectionElem.dataset.count].srcPosition)){
							//update the src position
							this.selectionData[selectionElem.dataset.count].srcPosition.x = currSrcPosition.x;
							this.selectionData[selectionElem.dataset.count].srcPosition.y = currSrcPosition.y;

						}
		}
	},
	handleConnection: function (selectionElem,forceUpdate) {
			if (selectionElem.classList.contains('lyteSelectionBox') && selectionElem.dataset.colorcode) {
				this.updateSrcPosition(selectionElem);
				// if(currSrcPosition===-1){
				// 	this.showOrHideConnection(this.prevSelectionElem, false);
				// 	this.prevSelectionElem = null;
				// }else 
				if (forceUpdate || !this.prevSelectionElem || (this.prevSelectionElem && this.prevSelectionElem!==selectionElem)) {
						if(!forceUpdate && this.prevSelectionElem){
							this.showOrHideConnection(this.prevSelectionElem, false);
						}
						this.prevSelectionElem = selectionElem;
						this.showOrHideConnection(selectionElem, true,forceUpdate);
					}
			} else {
				if (this.prevSelectionElem) {
					this.showOrHideConnection(this.prevSelectionElem, false);
					this.prevSelectionElem = null;
				}
			}
	},
	checkIfAssociatedTag: function (element) {
		return element.dataset.colorcode ? true : false;
	},
	checkExistingConnection: function (count) {
		return $L('#connection_' + count).length ? true : false;
	},
	//when selection is created, last used color is moved to last
	//when selection is deleted, last used color is moved to first
	shiftOrUnshiftColor: function (shift, colorCode) {
		if (shift) {
			this.colorCodes.push(this.colorCodes.shift());
		} else {
			this.colorCodes.unshift(this.colorCodes.splice(this.colorCodes.indexOf(colorCode), 1));
		}
	},
	removeConnection: function(count){
		if(count){
			var elm =  $L('#selection_tag_'+count);
			this.shiftOrUnshiftColor(false,elm[0].dataset.colorcode);
			elm.attr({
				'lt-prop-tooltip-class':this.getData('cxPropTooltipClass'),
				'lt-prop-title':_cruxUtils.getI18n('crm.icr.unassoicatedtext')
			});
			elm[0].dataset.colorcode = '';
			elm.css({
				'border':'',
				'outline':''
			})
			// this.setColorcode('selection', '#FFF',elm);
			this.connectionElem.connection('delete',elm);
		}
	},
	scrollSelectorIntoView: function(selectionElem,afterFunc){
		var containerRect = this.imageWrapper[0].getBoundingClientRect();
		var selectionRect = selectionElem.getBoundingClientRect();
		        //hidden completely
			// if(selectionRect.right<containerRect.left ||
			// 		selectionRect.left>containerRect.right || 
			// 		selectionRect.bottom<containerRect.top || 
			// 		selectionRect.top>containerRect.bottom){
			// 			var scrollLeft = this.imageWrapper[0].scrollLeft;
			// 			var scrollTop = this.imageWrapper[0].scrollTop;
			// 			var contCenterX = containerRect.width/2;
			// 			var contCenterY = containerRect.height/2;
			// 			var selCenterY = selectionRect.top-containerRect.top + selectionRect.height/2;
			// 			var selCenterX = selectionRect.left-containerRect.left + selectionRect.width/2;
			// 			var finalLeft = scrollLeft-(contCenterX-selCenterX)>0?scrollLeft-(contCenterX-selCenterX):0;
			// 			var finalTop = scrollTop-(contCenterY-selCenterY)>0?scrollTop-(contCenterY-selCenterY):0;
			// 			this.imageWrapper.scrollTo({left:finalLeft,top:finalTop},{
			// 				duration:200,
			// 				onAfter:afterFunc
			// 			})
			// 	}else{
			// 		afterFunc();
			// 	}
			// if(selectionRect.right<containerRect.left ||
			// 	selectionRect.left>containerRect.right || 
			// 	selectionRect.bottom<containerRect.top || 
			// 	selectionRect.top>containerRect.bottom){
					var scrollLeft = this.imageWrapper[0].scrollLeft;
					var scrollTop = this.imageWrapper[0].scrollTop;
					// var contCenterX = containerRect.width/2;
					// var contCenterY = containerRect.height/2;
					//var contCenterY = (window.innerHeight - containerRect.top)/2

					var contCenterX = Math.abs((containerRect.left>0?containerRect.left:0) - (containerRect.right<window.innerWidth? containerRect.right: window.innerWidth))/2;
					var contCenterY = Math.abs((containerRect.top>0?containerRect.top:0) - (containerRect.bottom<window.innerHeight? containerRect.bottom: window.innerHeight))/2;
					var selCenterY = selectionRect.top-containerRect.top + selectionRect.height/2;
					var selCenterX = selectionRect.left-containerRect.left + selectionRect.width/2;
					var finalLeft = scrollLeft-(contCenterX-selCenterX)>0?scrollLeft-(contCenterX-selCenterX):0;
					var finalTop = scrollTop-(contCenterY-selCenterY)>0?scrollTop-(contCenterY-selCenterY):0;
					this.imageWrapper[0].scrollTo(finalLeft,finalTop);		
			// }
			afterFunc();
	},
	displaySelection: function(count,show){
		var selElem =  $L('#selection_tag_'+count);
		if(selElem.length>0){
			selElem.css('display',show ? 'block' : 'none');
		}
	},
	disableSelection: function(count,disable){
		var colorCode = disable ? this.getData('cxPropDisableColor') : this.getColorCode(this.getData('cxPropSelectionData')[count-1]);
		var selElem =  $L('#selection_tag_'+count);
		selElem[0].dataset.colorcode = colorCode;
		var id = 'connection_'+count;
		this.setColorcode('marker',colorCode);
		this.setColorcode('selection',colorCode,selElem);
		this.setColorcode('path', colorCode, $L('#' + id + ' .lyteConnectionPath'));

	},
	displayConnection: function(count,show,isUtil){
		var connElem = $L('#connection_' + count);
		if(connElem.length==0){
			return
		}
		if(show){
			this.updateConnection(connElem);
		}
		if(isUtil){
			var selElem =  $L('#selection_tag_'+count)[0];
			if(show){
				//TODO: to be checked later
				// this.prev && this.prev.cancel();
				// this.prev = $L.debounce(function(){
				// 	this.scrollSelectorIntoView(selElem,function(){
				// 		if(this.prevConn==connElem){
				// 			// console.log('show'+count)
				// 			this.setColorcode('marker',selElem.dataset.colorcode);
				// 			connElem.css('display', 'block');
				// 		// }else{
				// 		// 	console.log('rejected'+count)
				// 		}
				// 	}.bind(this));	
				// }.bind(this),200);
				// this.prev();
				// this.prevConn = connElem;
				//TODO: end
				this.scrollSelectorIntoView(selElem,function(){
					this.setColorcode('marker',selElem.dataset.colorcode);
					connElem.css('display', 'block');
				}.bind(this));
				if(show){
					this.updateSrcPosition(selElem);
				}
			}else{
				this.prevSelectionElem = null;
				this.stableConnectionShown = false;
				connElem.css('display','none');
			}
		}else{
			connElem.css('display', show ? 'block' : 'none');

		}
	},
	showOrHideConnection: function (selection, show,forceUpdate,init) {
		var count = selection.dataset.count;
		if(show){
		var callback = function(){
			if(!forceUpdate && this.getMethods('onConnectionShow')){
				/**
				 * @method onConnectionShow
				 * @author Gowtham Prasath gowtham.mp@zohocorp.com
				 * @version 1.0.0
				 * @param { * } count
				 * @param { * } show
				 * @param { * } this.stableConnectionShown
				 */
				this.executeMethod('onConnectionShow',count,show,this.stableConnectionShown);
			}
			this.displayConnection(count,show);
			}.bind(this);
			if(!forceUpdate && this.getData('cxPropHoverCallbackDelay')!==undefined){
				this.timeoutId = setTimeout(callback,this.getData('cxPropHoverCallbackDelay'));
			}else{
				callback();
			}
		}else{
			this.displayConnection(count,show);
			if(this.timeoutId){
				clearTimeout(this.timeoutId);
			}
			if(!init && this.getMethods('onConnectionShow')){
				/**
				 * @method onConnectionShow
				 * @author Gowtham Prasath gowtham.mp@zohocorp.com
				 * @version 1.0.0
				 * @param { * } count
				 * @param { * } show
				 */
				this.executeMethod('onConnectionShow',count,show);
			
			}
		}
	},
	showStableConnection: function(selectionElem,show){
		if (show && this.checkIfAssociatedTag(selectionElem) && selectionElem.classList.contains('lyteSelectionBox')) {
			this.stableConnectionShown = true;
			this.handleConnection(selectionElem);
		}else if(this.prevSelectionElem){
			this.stableConnectionShown = false;
			this.showOrHideConnection(this.prevSelectionElem,false);
		}
	},
	showMenu: function (selectionElem, event,show) {
		if(!show){
			this.setData('menuData', { show: false, originElem: undefined});
		}else{
			if (selectionElem.classList.contains('lyteSelectionBox') && !this.checkIfAssociatedTag(selectionElem)) {
				this.menuSelectionElem = selectionElem;
				selectionElem.setAttribute('lt-prop-title','');
				var originElem = '.' + selectionElem.classList[0] + '.lyteSelectionBox';
				//condition added since menu handles this show and hide
				if (event == 'click') {
					if (!this.getData('menuData') || this.getData('menuData').originElem != originElem) {
						this.setData('menuData', { show: true, originElem: originElem })
					}
				} else {
					this.setData('menuData', { show: true, originElem: originElem })
				}
			}
		}
	},
	transformRuler: function (lyteEvent) {
		
		var translateX = 0,translateY=0;
		if(lyteEvent){
			var originalEvent = lyteEvent;
			var rect = $L('.cxImageInnerWrapper')[0].getBoundingClientRect();
			translateX = originalEvent.clientY - rect.top;
			translateY = originalEvent.clientX - rect.left;
		}
		$L('.cxSelectionXaxisRuler').css({
			transform: 'translateY(' + translateX + 'px)'
		})
		$L('.cxSelectionYaxisRuler').css({
			transform: 'translateX(' + translateY + 'px)'
		})

	},
	//if no connectionElem is passed all the connection will be updated
	updateConnection: function (connectionElem) {
		if(connectionElem){
			this.connectionElem.connection('updateConnection', connectionElem);
		}else{
			var connections = $L('.cxConnectionContainer g');
			for(var i=0;i<connections.length;i++){
				this.connectionElem.connection('updateConnection', connections.eq(i));
			}
		}
	},
	//if init is false, no need to consider disabled key
	getColorCode: function(selectionData,init){
		return selectionData ?  selectionData.disabled&&init ? this.getData('cxPropDisableColor') : selectionData.color : this.colorCodes[0];	
	},
	associateTag: function(elem,init){
		   /**
		    * @method onAssociateField
		    * @author Gowtham Prasath gowtham.mp@zohocorp.com
		    * @version 1.0.0
		    * @param { * } elem
		    */
		var connTrg = init?this.getData('cxPropSelectionData')[parseInt(elem.dataset.count)-1].target:this.executeMethod("onAssociateField",elem);
		if(connTrg){
				//if color is not passed in selection data, get the color from colorcodes
				var colorCode = this.getColorCode(this.getData('cxPropSelectionData')[elem.dataset.count-1],init);
				this.setColorcode('selection',colorCode,elem);
				elem.dataset.colorcode = colorCode;
				if(elem.hasAttribute('lt-prop-title')){
					elem.setAttribute('lt-prop-title','')
				}
				this.prevSelectionElem = elem;
				this.createConnection(elem,connTrg,init);
				this.shiftOrUnshiftColor(true);
		}
	},
	zoomHandler(type){
		var zoomData = this.getData('zoomData');
		var scale = zoomData.zoomScale;
		if( (type==="out" && scale===this.getData('cxPropMinZoom')) || (type==="in" && scale===this.getData('cxPropMaxZoom'))){
			return;
		}
		if(this.getData('cxPropShowRuler')){
			this.transformRuler();
		}
		var imageCont = $L('#image');
		scale = type === 'reset'? 1 : type==="in" ?scale + 0.25 : scale - 0.25
		Lyte.objectUtils(zoomData, 'add', 'zoomScale', scale);
		Lyte.objectUtils(zoomData, 'add', 'zoomPer', parseInt(scale * 100) + '%');
		imageCont.data().zoom(scale)
		// if(type==='reset'){
			this.imageWrapper.resetScrollbar();
		// }
		if(this.stableConnectionShown){
			this.showStableConnection(this.prevSelectionElem,false);
		}else{
			this.updateConnection();
		}
	},
	actions: {
		mouseLeave: function(){
			if(this.prevSelectionElem && !this.stableConnectionShown){
				this.showOrHideConnection(this.prevSelectionElem,false)
			}
		},
		handleZoom: function (type) {
			this.zoomHandler(type)
		}
	},
	methods: {
		menuSelected: function (value, event, menuElement, target) {
			this.associateTag(target);
			// if (value == "associateField") {
			// 	this.associateTag(target);
			// } else {
			// 	if(this.checkIfAssociatedTag(target)){
			// 		this.shiftOrUnshiftColor(false, target.dataset.colorcode);
			// 		this.connectionElem.connection('delete', $L('.lyteSelectorActiveBox'));
			// 	}
			// 	this.selectionElem[0].deleteSelection($L('.lyteSelectorActiveBox')[0]);

			// }
		},
		beforeMenuOpen: function (menu, event, target) {
			if (this.ignoreClick || (this.checkIfAssociatedTag(target) && !this.getData('cxPropAllowDelete')) ) {
				this.ignoreClick = false;
				return false;
			}
			//show associate field menu as selected
			if (this.checkIfAssociatedTag(target)) {
				this.setData('selectedMenu', true)
			}
			else if (this.getData('selectedMenu')) {
				this.setData('selectedMenu', false)
			}
		},
		beforeMenuClose: function(){
			if (this.ignoreClick) {
				this.ignoreClick = false;
				return false;
			}
			var selectionElem = this.menuSelectionElem;
			if(selectionElem && !this.checkIfAssociatedTag(selectionElem)){
				selectionElem.setAttribute('lt-prop-title',_cruxUtils.getI18n('crm.icr.unassoicatedtext'));
			}
		}
	}
});
/**
 * @syntax nonYielded
<crux-icr></crux-icr>
 */
