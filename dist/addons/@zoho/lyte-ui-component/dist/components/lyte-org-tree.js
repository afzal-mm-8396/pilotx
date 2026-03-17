/**
 * Renders a org tree
 * @component lyte-org-tree
 * @version 1.0.0
 * @methods onDragStart,onDrag,onDrop,onScrollEnd,onOpen,onClose
 */
Lyte.Component.register("lyte-org-tree", {
_template:"<template tag-name=\"lyte-org-tree\" lyte-org-tree=\"\"> <div> <div></div> <div></div> </div> <div class=\"lyteOrgTreeWrapper\"> <template is=\"for\" items=\"{{lyteOrgTreePopulateArray}}\" item=\"item\" index=\"index\"> <div class=\"lyteOrgTreeColumn {{if(expHandlers(index,'>=',expHandlers(lyteOrgTreePopulateArray.length,'-',ltPropMinimumExpanded)),'lyteOrgTreeExpandedColumn','lyteOrgTreeShrinkedColumn')}}\" column-index=\"{{expHandlers(index,'+',1)}}\" onscroll=\"{{action('scrollVerticalConnector',event,this,expHandlers(index,'+',1),item)}}\"> <div class=\"lyteOrgTreeScrollTopWrap\"> <div class=\"lyteOrgTreeTopScroll\" onclick=\"{{action('scrollColumnTop',index)}}\"></div> </div> <template is=\"for\" items=\"{{item}}\" item=\"val\" index=\"ind\"> <div class=\"lyteOrgTreeElementsWrap\" onclick=\"{{action('openChildLevel',this,val,index,event)}}\" onmousedown=\"{{action('startDrag',this)}}\" row-index=\"{{expHandlers(ind,'+',1)}}\"> <div class=\"lyteOrgTreeChildDropZone\"> <template is=\"if\" value=\"{{expHandlers(index,'>',0)}}\"><template case=\"true\"><div class=\"lyteOrgTreeLeftHorizontalConnect\"></div></template></template> <div class=\"lyteOrgTreeElements\" row-index=\"{{expHandlers(ind,'+',1)}}\"> <div class=\"lyteOrgTreeElementDragHandle\"></div> <template is=\"if\" value=\"{{expHandlers(index,'>=',expHandlers(lyteOrgTreePopulateArray.length,'-',ltPropMinimumExpanded))}}\"><template case=\"true\"> <lyte-yield yield-name=\"orgTreeExpanded\" list-value=\"{{val}}\" class-value=\"lyteOrgTreeShrinked\"></lyte-yield> </template><template case=\"false\"> <lyte-yield yield-name=\"orgTreeShrinked\" list-value=\"{{val}}\" class-value=\"lyteOrgTreeExpanded\"></lyte-yield> </template></template> </div> <template is=\"if\" value=\"{{val[ltPropChildrenCountKey]}}\"><template case=\"true\"><div class=\"lyteOrgTreeBadgeWrapper\"> <div class=\"lyteOrgTreeChildrenCountBadge\">{{val[ltPropChildrenCountKey]}}</div> </div></template></template> <div class=\"lyteOrgTreeRightHorizontalConnect\"></div> <template is=\"if\" value=\"{{dragRunning}}\"><template case=\"true\"><div class=\"lyteOrgTreeChildPlaceHolder\"></div></template></template> </div> </div> </template> <div class=\"lyteOrgTreeLoadMoreWrap\"> <div class=\"lyteOrgTreeLoadMore lyteOrgTreeBottomScroll\" onclick=\"{{action('loadMoreData',index)}}\"></div> </div> <template is=\"if\" value=\"{{expHandlers(index,'>',0)}}\"><template case=\"true\"><div class=\"lyteOrgTreeVerticalConnect\"></div></template></template> <template is=\"if\" value=\"{{expHandlers(index,'>',0)}}\"><template case=\"true\"><div class=\"lyteOrgTreeVerticalBorder\"></div></template></template> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},{"type":"attr","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}],
_observedAttributes :["ltPropData","ltPropChildrenKey","ltPropTarget","ltPropTargetIndex","ltPropMinimumExpanded","ltPropInitialRenderCount","ltPropTargetKey","ltPropChildrenCountKey","ltPropDragThreshold","lyteOrgTreeMainArray","lyteOrgTreePopulateArray","initialDimension","dragRunning","initialElemWrapDim","currentDragInd","droppedOnSame","onDragPrevented","svgWrapHeight","svgWrapWidth"],
_observedAttributesType :["array","string","object","string","number","number","string","string","number","array","array","object","boolean","object","object","boolean","boolean","number","number"],

	data: function () {
		return {
			/**
			* @componentProperty {array} ltPropData
			* @version 1.0.0
			* @default []
			*/
			ltPropData: Lyte.attr('array', {
				default: []
			}),
			/**
			 * @componentProperty {string} ltPropChildrenKey
			 * @version 1.0.0
			 * @default 'children'
			 */
			ltPropChildrenKey: Lyte.attr('string', {
				default: 'children'
			}),
			/**
			 * @componentProperty {object} ltPropTarget
			 * @version 1.0.0
			 * @default {}
			 */
			ltPropTarget: Lyte.attr('object', {
				default: {}
			}),
			/**
			 * @componentProperty {string} ltPropTargetIndex
			 * @version 1.0.0
			 * @default '0'
			 */
			ltPropTargetIndex: Lyte.attr('string', {
				default: '0'
			}),
			/**
		 * @componentProperty {number} ltPropMinimumExpanded
		 * @version 1.0.0
		 * @default 2
		 */
			ltPropMinimumExpanded: Lyte.attr('number', {
				default: 2
			}),
			/**
			 * @componentProperty {number} ltPropInitialRenderCount
			 * @version 1.0.0
			 * @default 5
			 */
			ltPropInitialRenderCount: Lyte.attr('number', {
				default: 5
			}),
			/**
			 * @componentProperty {string} ltPropTargetKey
			 * @version 1.0.0
			 */
			ltPropTargetKey: Lyte.attr('string'),
			/**
			 * @componentProperty {string} ltPropChildrenCountKey
			 * @version 1.0.0
			 */
			ltPropChildrenCountKey: Lyte.attr('string'),
			/**
			 * @componentProperty {number} ltPropDragThreshold
			 * @version 1.0.0
			 * @default 10
			 */
			ltPropDragThreshold: Lyte.attr('number', {
				default: 10
			}),
			/**
			 * @componentProperty {array} lyteOrgTreeMainArray
			 * @version 1.0.0
			 * @default []
			 */
			lyteOrgTreeMainArray: Lyte.attr('array', {
				default: []
			}),
			/**
			 * @componentProperty {array} lyteOrgTreePopulateArray
			 * @version 1.0.0
			 * @default []
			 */
			lyteOrgTreePopulateArray: Lyte.attr('array', {
				default: []
			}),
			/**
			 * @componentProperty {object} initialDimension
			 * @version 1.0.0
			 * @default {left: 0, top: 0, prevClientX: 0, prevClientY: 0}
			 **/
			initialDimension: Lyte.attr('object', {
				default: {
					left: 0,
					top: 0,
					prevClientX: 0,
					prevClientY: 0
				}
			}),
			/**
			 * @componentProperty {boolean} dragRunning
			 * @version 1.0.0
			 * @default false
			 */
			dragRunning: Lyte.attr('boolean', {
				default: false
			}),
			/**
			 * @componentProperty {object} initialElemWrapDim
			 * @version 1.0.0
			 * @default {
					width: 0,
					height: 0
				}
			 */
			initialElemWrapDim: Lyte.attr('object', {
				default: {
					width: 0,
					height: 0
				}
			}),
			/**
			 * @componentProperty {object} currentDragInd
			 * @version 1.0.0
			 * @default {
					column: 0,
					row: 0
				}
			 */
			currentDragInd: Lyte.attr('object', {
				default: {
					column: 0,
					row: 0
				}
			}),
			/**
			 * @componentProperty {boolean} droppedOnSame
			 * @version 1.0.0
			 * @default false
			 */
			droppedOnSame: Lyte.attr('boolean', {
				default: false
			}),
			/**
		 * @componentProperty {boolean} onDragPrevented
		 * @version 1.0.0
		 * @default false
		 */
			onDragPrevented: Lyte.attr('boolean', {
				default: false
			}),
			/**
		 * @componentProperty {number} svgWrapHeight
		 * @version 1.0.0
		 */
			svgWrapHeight: Lyte.attr('number'),
			/**
		 * @componentProperty {number} svgWrapWidth
		 * @version 1.0.0
		 */
			svgWrapWidth: Lyte.attr('number')
		}
	},
	init: function () {
	},
	didConnect: function () {
		var arr;
		if (this.getData('ltPropTarget') !== "0") {
			this.openSpecific()
		} else {
			arr = [this.getData('ltPropData')]
			Lyte.arrayUtils(this.getData('lyteOrgTreeMainArray'), 'push', [this.getData('ltPropData')])
			Lyte.arrayUtils(this.getData('lyteOrgTreePopulateArray'), 'push', [this.getData('ltPropData')])
		}
		// Get dimensions of the wrapping element and store them
		var dim = $L(this.$node).find('.lyteOrgTreeElementsWrap')[0].getBoundingClientRect()
		Lyte.objectUtils(this.getData('initialElemWrapDim'), 'add', 'width', dim.width)
		Lyte.objectUtils(this.getData('initialElemWrapDim'), 'add', 'height', dim.height)
	},
	actions: {
		startDrag: function (th) {
			var onDragStartFun = this.executeMethod('onDragStart')
			if (onDragStartFun === false) {
				return;
			}
			if (!$L(th).closest('.lyteOrgTreeElementsWrap').hasClass('lyteOrgTreeActiveWrap')) {
				this._dragElem = $L(th).closest('.lyteOrgTreeColumn');
				this.setData('dragRunning', true)
				var holdElem = $L(th).closest('.lyteOrgTreeElementsWrap')[0]
				var draggedElem = holdElem.cloneNode(true)
				$L(draggedElem).addClass('dragElem clonedElem')
				this.$node.appendChild(draggedElem)
				// Store initial dimensions and mouse positions
				Lyte.objectUtils(this.getData('initialDimension'), 'add', 'left', holdElem.getBoundingClientRect().left)
				Lyte.objectUtils(this.getData('initialDimension'), 'add', 'top', holdElem.getBoundingClientRect().top)
				Lyte.objectUtils(this.getData('initialDimension'), 'add', 'prevClientX', event.clientX)
				Lyte.objectUtils(this.getData('initialDimension'), 'add', 'prevClientY', event.clientY)
				draggedElem.style.display = "none"
				draggedElem.style.width = (holdElem.getBoundingClientRect().width) + "px"
				// draggedElem.style.left = (holdElem.getBoundingClientRect().left) + "px"
				// draggedElem.style.top = (holdElem.getBoundingClientRect().top) + "px"
				this.setData('currentDragInd', this.getElementIndexes(th))
				this.$node.addEventListener('mousemove', this.moveTreeElement)
				this.$node.addEventListener('mouseup', this.removeMoveEvent)
			}
		},
		openChildLevel: function (th, item, level, eve) {
			var treeCol = $L(th).closest('.lyteOrgTreeColumn');
			var treeWrap = $L(th).closest('.lyteOrgTreeElementsWrap');
			if ($L(event.target).hasClass('lyteOrgTreeElementDragHandle') || this.getData('droppedOnSame')) {
				this.setData('droppedOnSame', false)
				return
			}
			th = $L(th).find('.lyteOrgTreeElements')[0]
			if (level + 1 > 1) {
				this.connectorFun(th, eve)
			}
			treeCol.find('.lyteOrgTreeActiveElement').removeClass('lyteOrgTreeActiveElement')
			treeCol.find('.lyteOrgTreeActiveWrap').removeClass('lyteOrgTreeActiveWrap')
			$L(th).addClass('lyteOrgTreeActiveElement')
			$L(th).closest('.lyteOrgTreeElementsWrap').addClass('lyteOrgTreeActiveWrap')
			if (level + 1 <= this.getData('lyteOrgTreeMainArray').length) {

				var prevRowInd = parseInt($L(this.$node).find('.lyteOrgTreeColumn').eq(level).find('.lyteOrgTreeActiveWrap').attr('row-index'));

				var onBeforeClose = this.executeMethod('onBeforeClose', this.getData('lyteOrgTreeMainArray')[level][prevRowInd])

				if (onBeforeClose === false) {
					return;
				}

				Lyte.arrayUtils(this.getData('lyteOrgTreeMainArray'), 'splice', level + 1, (this.getData('lyteOrgTreeMainArray').length - (level + 1)));
				Lyte.arrayUtils(this.getData('lyteOrgTreePopulateArray'), 'splice', level + 1, (this.getData('lyteOrgTreePopulateArray').length - (level + 1)));

				var onClose = this.executeMethod('onClose', this.getData('lyteOrgTreeMainArray')[level][prevRowInd])
				if (onClose === false) {
					return;
				}

			}
			if (item[this.getData('ltPropChildrenKey')] && (item[this.getData('ltPropChildrenKey')].length > 0)) {
				var onBeforeOpen = this.executeMethod('onBeforeOpen', item)

				if (onBeforeOpen === false) {
					return;
				}

				var loopArr = item[this.getData('ltPropChildrenKey')]
				var minPushArr = []
				pushArr = loopArr
				Lyte.arrayUtils(this.getData('lyteOrgTreeMainArray'), 'push', [pushArr])
				if (minPushArr.length + this.getData('ltPropInitialRenderCount') >= pushArr.length) {
					minPushArr = pushArr.slice(minPushArr.length)
				} else {
					minPushArr = pushArr.slice(minPushArr.length, minPushArr.length + this.getData('ltPropInitialRenderCount'))
				}
				Lyte.arrayUtils(this.getData('lyteOrgTreePopulateArray'), 'push', [minPushArr]);
				var nextActiveEle = treeCol[0].nextElementSibling;
				var currNode = $L(th).closest('.lyteOrgTreeElementsWrap').last()[0];
				var childEle = $L(nextActiveEle).find('.lyteOrgTreeElementsWrap').last()[0];
				var borderTop = childEle.offsetTop + (childEle.offsetHeight / 2);
				var currentEleNode = $L(currNode).closest('.lyteOrgTreeColumn').find('.lyteOrgTreeVerticalConnect')[0];
				if (currentEleNode) {
					currentEleNode.style.background = "#0088ff";
				}
				$L(nextActiveEle).find('.lyteOrgTreeVerticalConnect')[0].style.background = '#ccc';
				$L(nextActiveEle).find('.lyteOrgTreeVerticalConnect')[0].style.width = '2px';
				$L(nextActiveEle).find('.lyteOrgTreeVerticalConnect')[0].style.opacity = '1';
				$L(nextActiveEle).find('.lyteOrgTreeVerticalConnect')[0].style.height = currNode.getBoundingClientRect().top - childEle.getBoundingClientRect().top + 'px';
				$L(nextActiveEle).find('.lyteOrgTreeVerticalConnect')[0].style.top = borderTop + 'px';

				this.appendScrollEvent(level + 1);

				var onOpen = this.executeMethod('onOpen', item)

				if (onOpen === false) {
					return;
				}
			}
			if (treeCol[0].nextElementSibling) {
				$L(treeWrap).find('.lyteOrgTreeRightHorizontalConnect')[0].style.opacity = 1;
			}
			else {
				$L(treeWrap).find('.lyteOrgTreeRightHorizontalConnect')[0].style.opacity = 0;
			}
		},
		scrollVerticalConnector: function (eve, th, level, item) {
			var currentColumn = $L(th)[0]
			var leftColumn, rightColumn;
			var leftConnector, rightConnector;
			if (level > 1) {
				leftColumn = $L(this.$node).find('.lyteOrgTreeColumn[column-index="' + (level - 1) + '"]')[0]
			}
			rightColumn = $L(this.$node).find('.lyteOrgTreeColumn[column-index="' + (level + 1) + '"]')[0]
			leftConnector = $L(currentColumn).find('.lyteOrgTreeVerticalConnect')[0]
			rightConnector = $L(rightColumn).find('.lyteOrgTreeVerticalConnect')[0]
			this.connectorsScrollHandling(leftColumn, rightColumn, currentColumn, eve)
		},
		loadMoreData: function (level) {
			var ret = this.executeMethod('onLoadMore')
			var arr = this.getData('lyteOrgTreeMainArray')[level]
			var currentArr = this.getData('lyteOrgTreePopulateArray')[level]
			var toPushArr = arr.slice(currentArr.length, currentArr.length + 5)
			if (toPushArr.length < 1) {
				if (ret) {
					Lyte.arrayUtils(currentArr, 'push', ret)
				}
			} else {
				Lyte.arrayUtils(currentArr, 'push', toPushArr)
			}
		},
		scrollColumnTop: function (level) {

		}
	},
	methods: {
		onDragStart: function () { },
		onDrag: function () { },
		onDrop: function () { },
		onBeforeOpen: function () { },
		onOpen: function () { },
		onBeforeClose: function () { },
		onClose: function () { },
		onScrollEnd: function () { },
		onLoadMore: function () { }
	},
	appendScrollEvent: function (level) {
		var _this = this;
		var arr = this.getData('lyteOrgTreeMainArray')[level]
		var popArr = this.getData('lyteOrgTreePopulateArray')[level]
		var renderCount = 5
		if (arr.length === renderCount) {
			renderCount -= 1;
		}
		$L($L('.lyteOrgTreeColumn')[level]).lazyRender({
			entireData: arr,
			dataToRender: popArr,
			selector: ".lyteOrgTreeColumn",
			renderConfig: {
				pushCount: 5,
				renderCount: renderCount
			},
			onEnd: function () {
				var ret = _this.executeMethod('onScrollEnd')
				if (ret) {
					Lyte.arrayUtils(this.entireData, 'push', ret)
				}
			}
		})
	},
	openSpecific: function () {

		var obj = {}
		obj[this.getData('ltPropChildrenKey')] = this.getData('ltPropData')
		var ind = ''
		var _th = this;

		function searchTree(element, matchingTitle) {
			if (element[_th.getData('ltPropTargetKey')] == matchingTitle) {
				return element;
			} else if (element.testChild != null) {
				var i;
				var result = null;
				for (i = 0; result == null && i < element.testChild.length; i++) {
					result = searchTree(element.testChild[i], matchingTitle);
				}
				if (result) {
					ind = i + " " + ind;
					return result;
				}
			}
			return null;
		}

		searchTree(obj, this.getData('ltPropTarget')[this.getData('ltPropTargetKey')])

		this.setData('ltPropTargetIndex', ind.trim())

		var toOpenArr = this.getData('ltPropTargetIndex').split(" ")
		var len = toOpenArr.length
		var currentInd;
		var loopArr = this.getData('ltPropData')
		var currentActiveElem
		var pushArr = [], minPushArr = []
		for (var i = 0; i < len; i++) {
			pushArr = [], minPushArr = []
			currentInd = parseInt(toOpenArr[i])
			if (i === 0) {
				pushArr = loopArr
				Lyte.arrayUtils(this.getData('lyteOrgTreeMainArray'), 'push', [pushArr])
				if (minPushArr.length + this.getData('ltPropInitialRenderCount') >= pushArr.length) {
					minPushArr = pushArr.slice(minPushArr.length)
				} else {
					minPushArr = pushArr.slice(minPushArr.length, minPushArr.length + this.getData('ltPropInitialRenderCount'))
				}
				Lyte.arrayUtils(this.getData('lyteOrgTreePopulateArray'), 'push', [minPushArr])
				loopArr = loopArr[parseInt(toOpenArr[i]) - 1][this.getData('ltPropChildrenKey')]
			} else {
				if (loopArr[parseInt(toOpenArr[i])]) {
					pushArr = loopArr
					Lyte.arrayUtils(this.getData('lyteOrgTreeMainArray'), 'push', [pushArr])
					if (minPushArr.length + this.getData('ltPropInitialRenderCount') >= pushArr.length) {
						minPushArr = pushArr.slice(minPushArr.length)
					} else {
						minPushArr = pushArr.slice(minPushArr.length, minPushArr.length + this.getData('ltPropInitialRenderCount'))
					}
					Lyte.arrayUtils(this.getData('lyteOrgTreePopulateArray'), 'push', [minPushArr])
					loopArr = loopArr[parseInt(toOpenArr[i]) - 1][this.getData('ltPropChildrenKey')]
				}
			}
		}

		for (var i = 0; i < len; i++) {
			currentInd = parseInt(toOpenArr[i])
			currentActiveElem = ($L(this.$node).find('.lyteOrgTreeColumn[column-index="' + (i + 1) + '"]').find('.lyteOrgTreeElements[row-index="' + currentInd + '"]'))[0]
			$L(currentActiveElem).addClass('lyteOrgTreeActiveElement');
			var colInd = $L(currentActiveElem).closest('.lyteOrgTreeColumn')[0].getAttribute('column-index');
			if (colInd == len) {
				$L(currentActiveElem).closest('.lyteOrgTreeElementsWrap').addClass('lyteOrgTreeActiveWrap');
				$L(currentActiveElem.nextElementSibling)[0].style.opacity = 0;
			}
			else {
				$L(currentActiveElem).closest('.lyteOrgTreeElementsWrap').addClass('lyteOrgTreeActiveWrap');
			}
			if ((i > 0) && (i < len)) {
				this.connectorFun(currentActiveElem)
			}
			this.appendScrollEvent(i);
		}
	},
	getConnectorCoordinates: function (leftColumn, rightColumn, currentColumn) {

	},
	connectorFun: function (th, eve) {
		var treeEle = $L(th).closest('.lyteOrgTreeColumn');
		var activeTreeWrap = $L(th).closest('.lyteOrgTreeElementsWrap')[0];
		var lastScrollTop = activeTreeWrap.getBoundingClientRect().top;
		if (treeEle.prev()[0] && treeEle.prev().hasClass('lyteOrgTreeVerticalConnect')) {
			treeEle.prev()[0].remove();
		}
		if (treeEle.prev().length) {
			var activeParent = treeEle.prev().find('.lyteOrgTreeActiveElement')[0];
			var activeParentMid = activeParent.getBoundingClientRect().top + (activeParent.getBoundingClientRect().height / 2)
			var currentMid = $L(th)[0].getBoundingClientRect().top + ($L(th)[0].getBoundingClientRect().height / 2)
			var connector = treeEle.find('.lyteOrgTreeVerticalConnect')[0]
			var wrapper = $L(th).closest('.lyteOrgTreeWrapper')[0]
			if (eve && eve.type == "scroll") {
				var connectorBorder = treeEle[0].nextElementSibling;
				var nextActiveEle = $L(connectorBorder).find('.lyteOrgTreeElementsWrap');
				var childEle = nextActiveEle[nextActiveEle.length - 1]
				if (nextActiveEle.length && nextActiveEle[0].getBoundingClientRect().top < lastScrollTop) {
					var borderTop = childEle.offsetTop + (childEle.offsetHeight / 2);
					$L(connectorBorder).find('.lyteOrgTreeVerticalConnect')[0].style.height = activeTreeWrap.getBoundingClientRect().top - nextActiveEle[nextActiveEle.length - 1].getBoundingClientRect().top + "px";
					$L(connectorBorder).find('.lyteOrgTreeVerticalConnect')[0].style.top = borderTop + "px";
				}
				else if (nextActiveEle.length && nextActiveEle[nextActiveEle.length - 1].getBoundingClientRect().top > lastScrollTop) {
					$L(connectorBorder).find('.lyteOrgTreeVerticalConnect')[0].style.height = nextActiveEle[0].getBoundingClientRect().top - activeTreeWrap.getBoundingClientRect().top + "px";
					$L(connectorBorder).find('.lyteOrgTreeVerticalConnect')[0].style.top = activeTreeWrap.offsetHeight / 2 + (activeTreeWrap.offsetTop - activeTreeWrap.parentElement.scrollTop) + 'px';
				}
			}
			if (activeParent.getBoundingClientRect().top < $L(th)[0].getBoundingClientRect().top) {
				//parent active in top and child active in bottom
				connector.style.top = (activeParent.getBoundingClientRect().top + (activeParent.getBoundingClientRect().height / 2)) - wrapper.getBoundingClientRect().top - 1 + "px"
				connector.style.height = currentMid - activeParentMid + 2 + "px";
				connector.style.background = '#0088ff';
			} else {
				//parent active in bottom and child active in top
				connector.style.top = ($L(th)[0].getBoundingClientRect().top + ($L(th)[0].getBoundingClientRect().height / 2)) - wrapper.getBoundingClientRect().top - 1 + "px"
				connector.style.height = activeParentMid - currentMid + 2 + "px";
				connector.style.background = '#0088ff';
			}
		}
	},
	connectorsScrollHandling: function (leftColumn, rightColumn, currentColumn, eve) {
		if (leftColumn && rightColumn) {
			this.connectorFun($L(currentColumn).find('.lyteOrgTreeActiveElement')[0], eve)
			if ($L(rightColumn).find('.lyteOrgTreeActiveElement')[0]) {
				this.connectorFun($L(rightColumn).find('.lyteOrgTreeActiveElement')[0])
			}
		}
		if (!leftColumn && rightColumn) {
			if ($L(rightColumn).find('.lyteOrgTreeActiveElement')[0]) {
				this.connectorFun($L(rightColumn).find('.lyteOrgTreeActiveElement')[0], eve)
			}
		}
		if (leftColumn && !rightColumn) {
			if ($L(currentColumn).find('.lyteOrgTreeActiveElement')[0]) {
				this.connectorFun($L(currentColumn).find('.lyteOrgTreeActiveElement')[0], eve)
			}
		}
	},
	moveTreeElement: function (event) {
		if ((Math.abs(this.component.getData('initialDimension').prevClientX - event.clientX) >= this.component.getData('ltPropDragThreshold')) ||
			(Math.abs(this.component.getData('initialDimension').prevClientY - event.clientY) >= this.component.getData('ltPropDragThreshold'))) {

			var onDragFun = this.component.executeMethod('onDrag');
			if (onDragFun === false) {
				this.component.setData('dragRunning', true);
				this.component.setData('onDragPrevented', true);
				this.addEventListener('mouseup', this.component.removeMoveEvent)
				return;
			}

			this.component.setData('dragRunning', true);
			$L(this.component.$node).find('.lyteOrgTreeChildPlaceHolderActive').removeClass('lyteOrgTreeChildPlaceHolderActive')
			if ($L(event.target).closest('.lyteOrgTreeChildDropZone')[0]) {
				$L(event.target).closest('.lyteOrgTreeChildDropZone').eq(0).find('.lyteOrgTreeChildPlaceHolder').addClass('lyteOrgTreeChildPlaceHolderActive')
			}
			this.component.setData('droppedOnSame', true)
			var dragElem = $L(this).find('.dragElem')[0];
			dragElem.style.display = "block"
			dragElem.style.left = (event.clientX - this.getData('initialDimension').prevClientX) + this.getData('initialDimension').left + "px"
			dragElem.style.top = (event.clientY - this.getData('initialDimension').prevClientY) + this.getData('initialDimension').top + "px"

		}
		this.addEventListener('mouseup', this.component.removeMoveEvent)
	},
	getElementIndexes: function (elem) {
		var dropColumn = $L(elem).closest('.lyteOrgTreeColumn')[0]
		var columnInd = parseInt($L(dropColumn).attr('column-index')) - 1
		var rowInd
		if ($L(elem).attr('row-index')) {
			rowInd = parseInt($L(elem).attr('row-index')) - 1
		} else {
			rowInd = -1
		}
		return { column: columnInd, row: rowInd };
	},
	removeMoveEvent: function (event) {
		var elemIndex = this.component.getData('currentDragInd');
		var elemData = this.component.getData('lyteOrgTreeMainArray')[elemIndex.column][elemIndex.row]
		var tarWrap = $L(event.target).closest('.lyteOrgTreeElementsWrap')[0]
		var dropIndexes = this.component.getElementIndexes(tarWrap)
		var columns = $L(this.component.$node).find('.lyteOrgTreeColumn');
		var onDropFun = this.component.executeMethod('onDrop', event);
		if (((elemIndex.column === dropIndexes.column && elemIndex.row === dropIndexes.row) || this.component.getData('onDragPrevented')) || (onDropFun === false)) {
			$L(this).find('.dragElem')[0].remove()
			this.component.setData('dragRunning', false)
			this.removeEventListener('mousemove', this.component.moveTreeElement)
			this.removeEventListener('mouseup', this.component.removeMoveEvent)
			this.component.setData('droppedOnSame', false)
			return
		}
		var mainArr = this.component.getData('lyteOrgTreeMainArray')
		var popArr = this.component.getData('lyteOrgTreePopulateArray');
		if ($L(event.target).closest('.lyteOrgTreeElementsWrap').hasClass('lyteOrgTreeActiveWrap')) {
			if (mainArr[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')]) {
				Lyte.arrayUtils(mainArr[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')], 'insertAt', popArr[dropIndexes.column + 1].length, [elemData])
				Lyte.arrayUtils(popArr[dropIndexes.column + 1], 'push', [elemData])
			} else {
				Lyte.objectUtils(mainArr[dropIndexes.column][dropIndexes.row], "add", this.component.getData('ltPropChildrenKey'), [elemData])
				Lyte.objectUtils(popArr[dropIndexes.column][dropIndexes.row], "add", this.component.getData('ltPropChildrenKey'), [elemData])
				Lyte.arrayUtils(mainArr, 'push', [[elemData]])
				Lyte.arrayUtils(popArr, 'push', [[elemData]])
			}
		} else {
			if (dropIndexes.row > 0) {
				if (mainArr[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')]) {
					Lyte.arrayUtils(this.component.getData('lyteOrgTreeMainArray')[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')], 'push', [elemData])
				} else {
					Lyte.objectUtils(mainArr[dropIndexes.column][dropIndexes.row], "add", this.component.getData('ltPropChildrenKey'), [elemData])
				}
			}
			if ($L(event.target).closest('.lyteOrgTreeColumn')[0] == columns[elemIndex.column] && mainArr[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')]) {
				Lyte.arrayUtils(mainArr[dropIndexes.column][dropIndexes.row][this.component.getData('ltPropChildrenKey')], "push", elemData);
			}
			else {
				var arrIndex = event.target.getAttribute('column-index');
				Lyte.arrayUtils(mainArr[arrIndex - 1], 'push', elemData);
				Lyte.arrayUtils(popArr[arrIndex - 1], 'push', elemData);
			}
		}
		this.component.setData('droppedOnSame', false)
		this.component.setData('dragRunning', false)
		Lyte.arrayUtils(mainArr[elemIndex.column], 'removeAt', elemIndex.row, 1);
		Lyte.arrayUtils(popArr[elemIndex.column], 'removeAt', elemIndex.row, 1);
		this.component.connectorsScrollHandling(columns[dropIndexes.column - 1], columns[dropIndexes.column + 1], columns[dropIndexes.column], event)
		if (dropIndexes.column > 0) {
			this.component.connectorsScrollHandling(columns[dropIndexes.column - 2], columns[dropIndexes.column], columns[dropIndexes.column - 1], event)
		}
		$L(this).find('.dragElem')[0].remove()
		if ($L(this.component.$node).find('.lyteOrgTreeSiblingPlaceHolder')[0]) {
			$L(this.component.$node).find('.lyteOrgTreeSiblingPlaceHolder')[0].remove()
		}
		this.removeEventListener('mousemove', this.component.moveTreeElement)
		this.removeEventListener('mouseup', this.component.removeMoveEvent);
		var nextActiveEle = $L(event.target.nextElementSibling).find('.lyteOrgTreeActiveWrap');
		var currActiveEle = $L(event.target).find('.lyteOrgTreeActiveWrap');
		if (tarWrap) {
			var nextChildEle = $L(tarWrap).closest('.lyteOrgTreeColumn')[0].nextElementSibling;
			if (nextActiveEle.length) {
				if (currActiveEle[0].getBoundingClientRect().top == nextActiveEle[0].getBoundingClientRect().top) {
					$L(event.target.nextElementSibling).find('.lyteOrgTreeVerticalConnect')[0].style.height = 0;
				}
			}
			if (nextChildEle && $L(tarWrap).hasClass('lyteOrgTreeActiveWrap')) {
				var childrenNode = $L(nextChildEle).find('.lyteOrgTreeElementsWrap');
				$L(tarWrap).find('.lyteOrgTreeRightHorizontalConnect')[0].style.opacity = 1;
				var borderTop = childrenNode[0].offsetTop + (childrenNode[0].offsetHeight / 2);
				if (childrenNode[childrenNode.length - 1]) {
					$L(nextChildEle).find('.lyteOrgTreeVerticalConnect')[0].style.height = $L(event.target).closest('.lyteOrgTreeElementsWrap')[0].getBoundingClientRect().top - childrenNode[childrenNode.length - 1].getBoundingClientRect().top + 'px';
					$L(nextChildEle).find('.lyteOrgTreeVerticalConnect')[0].style.top = borderTop + 'px';
					$L(nextChildEle).find('.lyteOrgTreeVerticalConnect')[0].style.background = '#CCCCCC';
				}
			}

		}
		var draggedNode = this.component._dragElem;
		if (event.target && draggedNode) {
			var draggedActiveElem = $L(draggedNode).find('.lyteOrgTreeActiveWrap');
			var droppedActiveEle = $L(event.target).find('.lyteOrgTreeActiveWrap');
			if (draggedActiveElem.length) {
				this.component.connectorFun(draggedActiveElem);
			}
			if (droppedActiveEle.length) {
				this.component.connectorFun(droppedActiveEle);
			}
			if (draggedNode[0].nextElementSibling) {
				var draggedNextElem = $L(draggedNode[0].nextElementSibling).find('.lyteOrgTreeActiveWrap');
				this.component.connectorFun(draggedNextElem);
			}
		}
	},
	didDestroy: function () {
		delete this._dragElem;
	}
});




