/**
 * Renders an board
 * @component lyte-board
 * @version 3.1.0
 * @utility getVisibleCard, collapse, expand
 */

Lyte.Component.register('lyte-board', {
_template:"<template tag-name=\"lyte-board\" lyte-board=\"\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <template is=\"if\" value=\"{{expHandlers(ltPropLoadingYield,'!')}}\"><template case=\"true\"> <div class=\"lyteBoardWrapper\"> <div class=\"lyteKVLoadingHeaderPlaceholder\"></div> <div class=\"lyteBoardContainer\"> <div class=\"lyteKVLoadingPlaceholder\"></div> <div class=\"lyteKVLoadingPlaceholder\"></div> <div class=\"lyteKVLoadingPlaceholder\"></div> </div> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"loading\"></lyte-yield> </template></template> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div class=\"lyteBoardWrapper {{ltPropClass}}\"> <div class=\"lyteBoardHeader\"> <lyte-yield yield-name=\"headerItem\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </div> <div class=\"lyteBoardContainer\"> <div class=\"lyteKanbanNestedSortable {{ltPropKanbanId}}\" id=\"{{ltPropBoardDetail.id}}\" index=\"{{ltPropIndex}}\" data-loaded=\"{{dataLoaded}}\" cards-length=\"{{cardArray.length}}\" onscroll=\"{{action('boardScroll',event,this)}}\"> <template is=\"for\" items=\"{{cardArray}}\" item=\"itemContent\" index=\"index1\"> <template is=\"if\" value=\"{{ltPropCardIntersection}}\"><template case=\"true\"> <lyte-card-item class=\"lyteBoardItemContentData {{lyteUiConcat(lyteUiAddSortableClass(ltPropBoardSortable,this),itemContent[ltPropCardClassName])}}\" data-index=\"{{index1}}\" style=\"width: {{ltPropCardWidth}}\" id=\"{{itemContent.id}}\"> <template is=\"if\" value=\"{{visibleCards[index1]}}\"><template case=\"true\"><lyte-yield yield-name=\"contentItem\" lyte-card-item=\"{{itemContent}}\" lyte-card-index=\"{{index1}}\"></lyte-yield></template></template> </lyte-card-item> </template><template case=\"false\"> <div class=\"lyteBoardItemContentData {{lyteUiConcat(lyteUiAddSortableClass(ltPropBoardSortable,this),itemContent[ltPropCardClassName])}}\" id=\"{{itemContent.id}}\"> <lyte-yield yield-name=\"contentItem\" lyte-card-item=\"{{itemContent}}\" lyte-card-index=\"{{index1}}\"></lyte-yield> </div> </template></template> </template> </div> <template is=\"if\" value=\"{{expHandlers(cardArray.length,'==',0)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropNoResultYield,'!')}}\"><template case=\"true\"> <div class=\"lyteKanbanNoResultMsg\">{{ltPropNoResultMessage}}</div> </template><template case=\"false\"> <lyte-yield yield-name=\"noResultYield\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </template></template> </template></template> </div> <div class=\"lyteBoardFooter\"> <lyte-yield yield-name=\"footerItem\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </div> <div class=\"lyteBoardCollapse\"> <lyte-yield yield-name=\"collapseItem\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </div> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropCardWidth"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"insertYield","position":[1,5,1]},{"type":"attr","position":[1,7,1]},{"type":"insertYield","position":[1,7,1]}]}},"default":{}}],
_observedAttributes :["lyteViewPort","ltPropBoardDetail","ltPropIndex","ltPropBoardSortable","ltPropClass","ltPropKanbanId","ltPropMoreStageRecord","ltPropNoResultMessage","ltPropLoadingYield","ltPropCardClassName","ltPropAria","ltPropBoardAria","ltPropCardAria","ltPropNoResultYield","ltPropCardIntersection","ltPropCardHeight","visibleCards","rowsPerLoad","lastTopIndex","lastBottomIndex","currentStartIndex","currentEndIndex","dummyId","cardArray","ignoreObserve"],
_observedAttributesType :["boolean","object","number","boolean","string","string","boolean","string","boolean","string","boolean","object","object","boolean","boolean","string","array","number","number","number","number","number","string","array","boolean"],

	_lyteUtilFunctions: ["getVisibleCard", "collapse", "expand"],
	data: function () {
		return {

			lyteViewPort: Lyte.attr("boolean", { "default": true }),//No I18n
			/**
		  * @componentProperty {object} ltPropBoardDetail
		  * @version 3.1.0
		  * @input
		  */
			'ltPropBoardDetail': Lyte.attr('object', { default: {}, input: true }),
			/**
			* @componentProperty {number} ltPropIndex
			* @version 3.1.0
			* @input
			*/
			'ltPropIndex': Lyte.attr('number', { input: true }),
			/**
			* @componentProperty {boolean} ltPropBoardSortable=true
			* @version 3.1.0
			* @input
			*/
			'ltPropBoardSortable': Lyte.attr('boolean', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-board', 'boardSortable', true),
				input: true
			}),
			/**
			* @componentProperty {string} ltPropClass
			* @version 3.1.0
			* @input
			*/
			'ltPropClass': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-board', 'class', ''),
				input: true
			}),
			/**
			* @componentProperty {string} ltPropKanbanId=''
			* @version 3.1.0
			* @input
			*/
			'ltPropKanbanId': Lyte.attr('string', {
				'default': '',
				input: true
			}),
			/**
			* @componentProperty {boolean} ltPropMoreStageRecord=false
			* @version 3.1.0
			* @input
			*/
			'ltPropMoreStageRecord': Lyte.attr('boolean', {
				'default': false,
				input: true
			}),
			/**
			* @componentProperty {string} ltPropNoResultMessage=''
			* @version 3.1.0
			* @input
			*/
			'ltPropNoResultMessage': Lyte.attr('string', {
				'default': _lyteUiUtils.resolveDefaultValue('lyte-dropdown', 'noResultMessage', _lyteUiUtils.i18n('no.results.found')),
				input: true
			}),
			/**
			* @componentProperty {boolean} ltPropLoadingYield=true
			* @version 3.1.0
			* @input
			*/
			'ltPropLoadingYield': Lyte.attr('boolean', {
				'default': true,
				input: true
			}),
			/**
			* @componentProperty {string} ltPropCardClassName
			* @version 3.1.0
			* @input
			*/
			'ltPropCardClassName': Lyte.attr('string', { 'default': undefined, input: true }),
			/**
			* @componentProperty {boolean} ltPropAria
			* @version 3.1.0
			* @input
			*/
			'ltPropAria': Lyte.attr('boolean', {
				'default': false,
				input: true
			}),
			/**
			 * @componentProperty {object} ltPropBoardAria
			 * @version 3.1.0
			 * @input
			 */
			'ltPropBoardAria': Lyte.attr('object', {
				default: {},
				input: true
			}),
			/**
			* @componentProperty {object} ltPropCardAria
			* @version 3.1.0
			* @input
			*/
			'ltPropCardAria': Lyte.attr('object', {
				default: {},
				input: true
			}),
			'ltPropNoResultYield': Lyte.attr('boolean', {
				default: false
			}),
			'ltPropCardIntersection': Lyte.attr('boolean', {
				default: false
			}),
			'ltPropCardHeight': Lyte.attr('string', { default: '150px' }),

			visibleCards: Lyte.attr('array', { default: [] }),
			rowsPerLoad: Lyte.attr('number', { default: 10 }),
			'lastTopIndex': Lyte.attr('number', {
				'default': -1
			}),
			'lastBottomIndex': Lyte.attr('number', {
				'default': -1
			}),
			'currentStartIndex': Lyte.attr('number', {
				'default': 0
			}),
			'currentEndIndex': Lyte.attr('number', {
				'default': 0
			}),
			/**
			* @experimental dummyId
			*/
			'dummyId': Lyte.attr('string', {
				'default': ''
			}),
			/**
			* @experimental cardArray
			*/
			'cardArray': Lyte.attr('array', {
				'default': []
			}),
			'ignoreObserve': Lyte.attr('boolean', {
				default: false
			})
		}
	},
	init: function () {

	},
	setVisibleArray: function () {
		let visibleCards = this.getData('visibleCards')
		var boardDetail = this.getData('ltPropBoardDetail'), len
		if (boardDetail && boardDetail.cards) {
			var rowsPerLoad = Math.max(this.getData('rowsPerLoad'), this.getVisibleRowCount() + 1)
			len = boardDetail.cards ? Math.min(boardDetail.cards.length, rowsPerLoad) : 0
		}
		for (let i = 0; i < len; i++) {
			Lyte.arrayUtils(visibleCards, 'push', true)
		}
	},
	didConnect: function () {
		if (this.getData('ltPropCardIntersection')) {
			this.setData('lyteViewPort', false)
			this.setVisibleArray()
		}
		this.setCardArray()
		this.$node.getVisibleCard = function () {
			var scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			if (scrollDiv.scrollHeight > scrollDiv.clientHeight) {
				return this.getVisibleNode()

			}
			return (this.getData('ltPropBoardDetail').cards ? this.getData('ltPropBoardDetail').cards : [])

		}.bind(this)
		this.$node.collapse = function () {
			var kanbanviewItem = $L(this.$node).closest('.lyteKanbanViewItem')[0]
			if (kanbanviewItem) {
				kanbanviewItem.classList.add('lyteKanbanBoardCollapse')
			}

		}.bind(this)
		this.$node.expand = function () {
			var kanbanviewItem = $L(this.$node).closest('.lyteKanbanViewItem')[0]
			if (kanbanviewItem) {
				kanbanviewItem.classList.remove('lyteKanbanBoardCollapse')
			}
		}.bind(this)
		this.$node.toggleIgnore = function () {
			this.setData('ignoreObserve', !this.getData('ignoreObserve'))
		}.bind(this)
		if (this.getData('ltPropCardIntersection')) {
			var kanbanview = $L(this.$node).closest('lyte-kanbanview')[0]
			if (kanbanview) {
				kanbanview.component.callSetUpCardFunc()
			}
			this.createObserver()
			this.addAllCardItemToObserver()

		}
	},
	ariaObs: function () {
		if (!this.getData('ltPropLoadingYield')) {
			this.addAria()
		}
	}.observes('ltPropBoardAria', 'ltPropCardAria', 'ltPropLoadingYield').on('didConnect'),
	addAria: function () {
		if (this.getData('ltPropAria')) {
			var self = this
			_lyteUiUtils.setAttribute(this.$node.querySelector('.lyteBoardWrapper'), this.getData('ltPropBoardAria') || {}, {});
			this.$node.querySelectorAll('.lyteBoardItemContentData').forEach(function (item) {
				_lyteUiUtils.setAttribute(item, self.getData('ltPropCardAria') || {}, {});
			})

		}
	},
	viewPortObs: function () {
		if (!this.getData('lyteViewPort') && this.getData('ltPropBoardSortable')) {
			var kanbanview = $L(this.$node).closest('lyte-kanbanview')[0]
			if (kanbanview) {
				kanbanview.component.addSortableForCard()
			}
			this.addAria()
		}


	}.observes('lyteViewPort'),
	didDestroy: function () {
		this._observer && this._observer.disconnect()
		delete this._observer
		clearTimeout(this.timeout1);
		clearTimeout(this.debounceTimeout)
	},
	addAllCardItemToObserver: function () {
		const kanbanItems = this.$node.querySelectorAll('lyte-card-item')
		for (let idx = 0; idx < kanbanItems.length; idx++) {
			this.addRowObserve(kanbanItems[idx])
		}
	},
	removeAllCardItemToObserver: function () {
		const kanbanItems = this.$node.querySelectorAll('lyte-card-item')
		for (let idx = 0; idx < kanbanItems.length; idx++) {
			this.removeRowObserve(kanbanItems[idx])
		}
	},
	addRowObserve: function (row) {
		// console.log(row)
		this._observer.observe(row)
	},
	removeRowObserve: function (row) {
		this._observer.unobserve(row)
	},
	addVisibleRows: function (cardItem) {
		if (this.getData('ignoreObserve')) {
			return
		}
		const boardDetail = this.getData('ltPropBoardDetail')
		let visibleCards = this.getData('visibleCards')
		let indexToShow = cardItem.getAttribute('data-index')
		if (indexToShow > visibleCards.length - 1) {
			Lyte.arrayUtils(visibleCards, 'push', true)
			this.addSortableForNewRecords()

		} else if (visibleCards[indexToShow] && cardItem._removedChild) {
			Lyte.Component.appendChild(cardItem, cardItem._removedChild)
			delete cardItem._removedChild
		}


	},
	removeNotVisibleRows: function (row) {
		if (this.getData('ignoreObserve')) {
			return
		}
		let visibleCards = this.getData('visibleCards')
		const index = row.getAttribute('data-index')
		const kanbanItem = row.closest('lyte-kanban-item')

		if (visibleCards[index] && !row._removedChild && !row.classList.contains('sortable-element-selected') && !row.classList.contains('lyteKanbanSortableParent')) {
			LyteComponent.ignoreDisconnect = true;

			if (row.children.length > 0 && row.children[0]) {
				row._removedChild = row.removeChild(row.children[0])
			}
			LyteComponent.ignoreDisconnect = false;
			return true
		}
		return false
	},
	getVisibleRowCount: function () {
		const containerHeight = this.$node.querySelector('.lyteBoardContainer').clientHeight;
		const rowHeight = parseInt(this.getData('ltPropCardHeight')) || this.$node.querySelector('lyte-card-item').clientHeight; // Assuming all rows have the same height
		return Math.max(1, Math.floor(containerHeight / rowHeight));;
	},
	updateVisibility: function (newTopIndex) {
		const visibleCount = this.getVisibleRowCount();
		const bottomIndex = this.getData('currentEndIndex');
		let topIndex = this.getData('currentStartIndex');
		const bufferSize = 2
		let cards = this.getData('ltPropBoardDetail') ? this.getData('ltPropBoardDetail').cards : []

		// const newBottomIndex = newTopIndex + visibleCount + bufferSize * 2 - 1;
		const newBottomIndex = Math.min(cards.length - 1, newTopIndex + visibleCount - 1);

		if (newTopIndex === topIndex) {
			return; // No change, skip update
		}

		// **Calculate Buffered Range**
		const start = Math.max(0, newTopIndex - bufferSize);
		const end = Math.min(cards.length - 1, newBottomIndex + bufferSize);

		const kanbanItems = this.$node.querySelectorAll('lyte-card-item')
		kanbanItems.forEach((row, index) => {
			if (index >= start && index <= end) {
				this.addVisibleRows(row)
			} else {
				this.removeNotVisibleRows(row)
			}
		});

		// topIndex = newTopIndex;
		// bottomIndex = newBottomIndex;
		this.setData('currentStartIndex', newTopIndex)
		this.setData('currentEndIndex', newBottomIndex)
		// this.setData('lastTopIndex', newTopIndex)
		// this.setData('lastBottomIndex', newBottomIndex)
	},
	intersectionObserverFunc: function (entries) {
		const self = this
		let topIndex = this.getData('currentStartIndex');
		let bottomIndex = this.getData('currentEndIndex');
		let boardDetail = this.getData('ltPropBoardDetail')
		let cards = boardDetail ? boardDetail.cards : []
		let bufferSize = 1
		if (!cards || cards.length == 0) {
			return
		}
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// const rowIndex = Math.abs(entry.target.getAttribute('data-index'));

				// // const visibleCount = this.getVisibleRowCount();
				// let newTopIndex = topIndex;
				// if (rowIndex <= topIndex && topIndex > 0) {
				// 	newTopIndex = Math.max(0, topIndex - bufferSize);
				//   }

				//   // **Scroll Down: Load next rows**
				//   if (rowIndex >= bottomIndex  && bottomIndex < cards.length - 1) {
				// 	newTopIndex = Math.min(cards.length - bufferSize, topIndex + bufferSize);
				//   }

				// this.setData('currentStartIndex',topIndex)
				// this.updateVisibility(newTopIndex);
				if (entry.target.classList.contains('lyteSortablePlaceholder')) {
					return
				}
				this.addVisibleRows(entry.target)
			} else {
				if (entry.target.classList.contains('lyteSortablePlaceholder')) {
					return
				}
				this.removeNotVisibleRows(entry.target)
			}

		});
	},
	createObserver: function () {
		const cardHeight = parseInt(this.getData('ltPropCardHeight')) * 2
		const container = this.$node.querySelector('.lyteKanbanNestedSortable')
		const options = {
			root: container,
			threshold: 0.01, // Trigger when 10% of a row is visible
			rootMargin: cardHeight + "px 0px " + cardHeight + "px 0px"
		};
		this._observer = new IntersectionObserver(this.intersectionObserverFunc.bind(this), options);
	},
	getVisibleNode: function () {
		// return;
		var bcr = this.$node.querySelector('.lyteBoardContainer').getBoundingClientRect(),
			originalRows = Array.from(this.$node.getElementsByClassName('lyteBoardItemContentData')),
			tValue = Math.max(bcr.top + 10, -10),
			bValue = Math.min(window.innerWidth + 10, bcr.bottom),
			visible = [], boardDetails = this.getData('ltPropBoardDetail').cards;




		for (var i = 0; i < originalRows.length; i++) {
			var row = originalRows[i],
				_bcr = row.getBoundingClientRect(),
				index = this.getData('ltPropCardIntersection') ? parseInt(row.getAttribute('data-index')) : i;
			if (_bcr.bottom > tValue && _bcr.top < bValue) {
				visible.push(boardDetails[index]);

			}
		}


		return visible;

	},
	contentObs: function (changeObj) {
		this.setCardArray()
		if (this.getData('ltPropCardIntersection')) {
			if (this.getData('visibleCards').length < this.getData('rowsPerLoad')) {
				this.setVisibleArray()
			} else {
				if (changeObj.insertedItems && changeObj.insertedItems.length > 0 && changeObj.index >= this.getData('visibleCards').length) {
					Lyte.arrayUtils(this.getData('visibleCards'), 'push', true)
				}
				if (changeObj.removedItems && changeObj.removedItems.length > 0 && changeObj.index <= this.getData('visibleCards').length - 1) {
					Lyte.arrayUtils(this.getData('visibleCards'), 'removeAt', changeObj.index)
				}
			}
			if (this.getData('ltPropBoardSortable') && !this.getData('lyteViewPort')) {
				this.addSortableForNewRecords()
			}
			this.addAllCardItemToObserver()
			return
		}

		if (this.getData('ltPropBoardSortable') && !this.getData('lyteViewPort')) {
			this.addSortableForNewRecords()
		}

	}.observes('ltPropBoardDetail.cards.[]'),
	setCardArray: function () {
		var boardDetail = this.getData('ltPropBoardDetail')
		if (boardDetail && boardDetail.cards) {
			this.setData('cardArray', boardDetail.cards)
		}
	},
	addSortableForNewRecords: function () {
		var div = this.$node.querySelectorAll('.lyteKanbanNestedSortable.' + this.getData('ltPropKanbanId'))[0]
		if (div.classList.contains('sortable-parent')) {
			var sortableClass = div.getSortableClass(),
				cardWithoutSortable = this.$node.querySelectorAll('.lyteBoardItemContentData:not(.' + sortableClass + ')')
			$L(cardWithoutSortable).map(function (index, element) {
				element.parentNode.addToSortable(element);
			})
		}


	},
	addShadow: function () {
		this.$node.querySelector('.lyteBoardWrapper ').classList.add('lyteKanbanviewShadow');
		this.$node.querySelector('.lyteBoardHeader').classList.remove('lyteKanbanviewHeaderShadow'); // No I18n

	},
	hasScrollHeightReached: function (event) {
		if (event.target.scrollHeight - 10 <= (Math.ceil(event.target.offsetHeight) + Math.ceil(event.target.scrollTop))) {
			if (this.getData('ltPropMoreStageRecord') && this.getMethods('onBoardScroll')) {
				/**
				 * @method onBoardScroll
				 * @condition ltPropMoreStageRecord true
				 * @version 1.0.0
				 * @param { * } this.getData('ltPropBoardDetail')
				 * @param { * } this
				 * @param { * } event
				 */
				this.executeMethod('onBoardScroll', this.getData('ltPropBoardDetail'), this, event); //NO i18n
			}
		}
	},
	removeShadow: function () {
		this.$node.querySelector('.lyteBoardWrapper ').classList.add('lyteKanbanviewShadow');
		this.$node.querySelector('.lyteBoardHeader').classList.remove('lyteKanbanviewHeaderShadow'); // No I18n
	},
	executeScrollStop: function (event) {
		if (this.getMethods('onBoardScrollStop')) {
			var visible, boardDetail = this.getData('ltPropBoardDetail'),
				scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			if (scrollDiv.scrollHeight > scrollDiv.clientHeight) {
				visible = this.getVisibleNode()
			} else {
				visible = boardDetail.cards
			}
			/**
			 * @method onBoardScrollStop
			 * @author vidhya.d <vidhya.d@zohocorp.com>
			 * @version 1.0.0
			 * @param { * } boardDetail
			 * @param { * } visible
			 * @param { * } this
			 * @param { * } scrollDiv.scrollTop
			 * @param { * } event
			 */
			this.executeMethod('onBoardScrollStop', boardDetail, visible, this, scrollDiv.scrollTop, event);
		}
	},
	actions: {
		boardScroll: function (event) {
			if (event.target.scrollTop != 0) {
				this.addShadow();
			}

			this.timeout1 = setTimeout(function () {

				this.hasScrollHeightReached(event)
			}.bind(this), 10);

			if (event.target.scrollTop == 0) {
				this.removeShadow()
			}
			//debounce
			clearTimeout(this.debounceTimeout)
			this.debounceTimeout = setTimeout(function () {
				this.executeScrollStop(event)
			}.bind(this), 100)
			// event.preventDefault()
			// event.stopPropagation();
		}
	}
});
Lyte.Component.registerHelper('lyteUiAddSortableClass', function (sortable, item) {
	if (sortable && item.parentNode && item.parentNode.getSortableClass) {
		return "sortable-element " + item.parentNode.getSortableClass() + (item.classList.contains("sortable-element-selected") ? " sortable-element-selected " : " ")
	}
	return ''
});
/**
 * @customElement lyte-card-item
 */
if (!_lyteUiUtils.registeredCustomElements['lyte-card-item']) {
	_lyteUiUtils.registeredCustomElements['lyte-card-item'] = true;

	Lyte.createCustomElement('lyte-card-item', {
		static: {

		},
		disconnectedCallback: function () {
			if (Lyte.Component.shouldIgnoreDisconnect()) {
				return
			}
			if (this._removedChild) {
				document.body.appendChild(this._removedChild);
				this._removedChild.remove();
			}
			var kanbanview = $L(this).closest('lyte-board').get(0);
			kanbanview && kanbanview.component.removeRowObserve(this);
		}
	})
}
/**
 * Renders a kanbanview
 * @component lyte-kanbanview
 * @version 3.1.0
 * @dependencies lyte-card,lyte-board
 * @utility getVisibleBoard
*/

/**
 * @domEvents commonEvents keydown, keyup, focus, blur, focusin, focusout
 */

/**
 * @method onDragSelectForBoard  
 * @param { * } board
 * @param { number } fromIndex
 * @param { * } source
 * @param { * } event
 */
 
 /**
 * @method onReadyForBoard 
 * @param { * } sortableElement
 * @param { * } component
 */

 /**
 * @method onDragForBoard 
 * @param {*} board
 * @param {*} belowElem
 * @param {*} event
 * @param {*} placeholder
 */

 /**
 * @method onBodyScroll 
 * @condition ltPropMoreStageRecord true
 * @param {*} component
 * @param {*} boardDetails
 * @param {*} event
 */

 /**
 * @method onReadyForCard
 * @param { * } sortableElement
 * @param { * } boardComponent
*/

 /**
 * @method onDragSelectForCard 
 * @param {*} card
 * @param {number} fromIndex
 * @param {*} source
 * @param {*} event
 */

 /**
 * @method onRecordDropForBoard 
 * @param {*} droppedElement
 * @param {*} source
 * @param {*} destination
 * @param {number} fromIndex
 * @param {number} toIndex
 * @param {*} boardDetails
 * @param {*} draggedElement
 */

 /**
 * @method onRecordDrop 
 * @param {*} card
 * @param {*} sourceBoard
 * @param {*} destinationBoard
 * @param {number} fromIndex
 * @param {number} toIndex
 * @param {number} sourceIndex
 * @param {number} destinationIndex
 * @param {*} boardDetails
 * @param {*} draggedElement
 */

 /**
 * @method onDragForCard 
 * @param {*} card
 * @param {*} belowElem
 * @param {*} event
 * @param {*} placeholder
 */

 /**
 * @method onBodyScrollStop 
 * @param {*} boardDetails
 * @param {*} visible
 * @param {*} component
 * @param {number} fromIndex
 * @param {*} event
 */

 /**
 * @method onEnterForBoard 
 * @param {*} boardDetails
 * @param {*} event
 * @param {*} obj
 */

 /**
 * @method onLeaveForBoard
 * @param {*} boardDetails
 * @param {*} event
 * @param {*} obj
 */

 /**
 * @method onEnterForCard
 * @param {*} boardDetails
 * @param {*} event
 * @param {*} obj
 */

 /**
 * @method onLeaveForCard
 * @param {*} boardDetails
 * @param {*} event
 * @param {*} obj
*/
 /**
  * @method onPlaceholderForCard
 * @param {*} card
 * @param {*} placeholderElement
 * @param {*} source
 * @param {*} destination
*/

 /**
 * @method onPlaceholderForBoard 
 * @param {*} board
 * @param {*} placeholderElement
 * @param {*} source
 * @param {*} destination
*/

 /**
 * @method onBeforeDropForCard 
 * @param {*} boardDetails
 * @param { array } sourceArray
 * @param { array } destArray
 * @param {*} droppableElement
 * @param {*} placeholderElement
 * @param {number} fromIndex
 * @param {number} toIndex
 * @param {*} source
 * @param {*} destination
 */

 Lyte.Component.register( 'lyte-kanbanview' , {
_template:"<template tag-name=\"lyte-kanbanview\" lyte-kanbanview=\"\"> <div class=\"lyteKanbanviewScrollDivSelector {{dummyId}} {{if(ltPropBoardIntersection,'','')}}\" onscroll=\"{{action('onBodyScroll',event)}}\"> <template is=\"for\" items=\"{{ltPropBoardDetails}}\" item=\"item\" index=\"dataIndex\"> <template is=\"if\" value=\"{{ltPropIntersection.board}}\"><template case=\"true\"> <lyte-kanban-item class=\"lyteKanbanViewItem {{item[ltPropKanbanItemClassKey]}} {{if(item.collapse,'lyteKanbanBoardCollapse','')}}\" data-index=\"{{dataIndex}}\" style=\"width: {{ltPropBoardWidth}}\"> <template is=\"if\" value=\"{{visibleBoards[dataIndex]}}\"><template case=\"true\"><lyte-yield yield-name=\"kanbanYield\" lyte-board-item=\"{{item}}\" lyte-index=\"{{dataIndex}}\" lyte-kanban-id=\"{{dummyId}}\"></lyte-yield></template></template> </lyte-kanban-item> </template><template case=\"false\"> <div class=\"lyteKanbanViewItem {{item[ltPropKanbanItemClassKey]}} {{if(item.collapse,'lyteKanbanBoardCollapse','')}}\" data-index=\"{{dataIndex}}\"> <lyte-yield yield-name=\"kanbanYield\" lyte-board-item=\"{{item}}\" lyte-index=\"{{dataIndex}}\" lyte-kanban-id=\"{{dummyId}}\"></lyte-yield> </div> </template></template> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropBoardWidth"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]}],
_observedAttributes :["ltPropBoardDetails","ltPropSortable","ltPropMoreStageRecord","ltPropId","ltPropPreventBoardDetailObserver","ltPropViewPort","ltPropBoardScrollStopDuration","ltPropAria","ltPropAriaAttributes","ltPropSortableCancel","ltPropSortableRestrict","dummyId","ltPropKanbanItemClassKey","ltPropIntersection","ltPropBoardWidth","visibleBoards","lastTopIndex","lastBottomIndex","currentStartIndex","currentEndIndex","rowsPerLoad"],
_observedAttributesType :["array","object","boolean","string","boolean","boolean","number","boolean","object","string","string","string","string","object","string","array","number","number","number","number","number"],

	_lyteUtilFunctions : ["getVisibleBoard"],
	data : function(){
		return {
			/** 
			 * @componentProperty {array} ltPropBoardDetails=[]
			 * @version 3.1.0
			 * @input
			 */

			'ltPropBoardDetails' : Lyte.attr( 'array', {
				'default': [],
				input:true
			} ), 
			/** 
			 * @typedef {object} sortable
			 * @property {boolean} board
			 * @property {boolean} card
			*/
			/**
			 * @componentProperty {sortable} ltPropSortable={"board" : true, "card" : true }
			 * @version 3.1.0
			 * @input
			 */
			'ltPropSortable' : Lyte.attr( 'object', {
				'default': {"board" : true, "card" : true },
				input: true
			} ) ,
			/** 
			 * @componentProperty {boolean} ltPropMoreStageRecord=false
			 * @version 3.1.0
			 * @input
			 */
			'ltPropMoreStageRecord' : Lyte.attr( 'boolean', {
				'default': false,
				input: true
			} ),
			/** 
			 * @componentProperty {string} ltPropId
			 * @version 3.1.0
			 * @input
			 */
			'ltPropId' : Lyte.attr( 'string', {default:undefined, input:true}),
			/** 
			 * @componentProperty {boolean} ltPropPreventBoardDetailObserver
			 * @version 3.1.0
			 * @input
			 */
			'ltPropPreventBoardDetailObserver' : Lyte.attr('boolean',{
				'default':false,
				input: true
			}),
			/** 
			 * @componentProperty {boolean} ltPropViewPort
			 * @version 3.1.0
			 * @input
			 */
			'ltPropViewPort' : Lyte.attr('boolean',{
				'default':true,
				input: true
			}),
			/** 
			 * @componentProperty {number} ltPropBoardScrollStopDuration=250
			 * @version 3.1.0
			 * @input
			 */
			'ltPropBoardScrollStopDuration' : Lyte.attr('number',{
				'default':250,
				input: true
			}),
			/** 
			 * @componentProperty {boolean} ltPropAria
			 * @version 3.1.0
			 * @input
			 */
			'ltPropAria' : Lyte.attr('boolean',{
				'default':false,
				input: true
			}),
			/** 
			 * @componentProperty {object} ltPropAriaAttributes
			 * @version 3.1.0
			 * @input
			 */
			'ltPropAriaAttributes' : Lyte.attr('object',{
				default:{},
				input: true
			}), 
			/**
            * @componentProperty {string} ltPropSortableCancel
			* @version 3.1.0
			* @input
            */
			'ltPropSortableCancel' : Lyte.attr('string', {default: undefined, input:true}),
			'ltPropSortableRestrict' : Lyte.attr('string'),
			/**
            * @experimental dummyId
            */
			'dummyId' : Lyte.attr( 'string', {
				'default' : ''
			} ),
			'ltPropKanbanItemClassKey': Lyte.attr("string", {default: ''}),
			'ltPropIntersection' :  Lyte.attr( 'object', {
				'default': {"board" : false, "card" : false }

			} ),
			'ltPropBoardWidth' : Lyte.attr('string', { default: '300px' }),

			'visibleBoards' : Lyte.attr('array', {
				'default': []
			}),
			'lastTopIndex' : Lyte.attr('number', {
				'default' : -1
			}),
			'lastBottomIndex' : Lyte.attr('number', {
				'default' : -1
			}),
			'currentStartIndex' : Lyte.attr('number', {
				'default' : 0
			}),
			'currentEndIndex' : Lyte.attr('number', {
				'default' : 0
			}),
			'rowsPerLoad' : Lyte.attr('number', {
				'default' : 10
			})
		}		
	},
	init : function(){
		
		
	},
	setVisibleArray : function(){
			var  visibleBoards = this.getData('visibleBoards'),
			  boardDetails = this.getData('ltPropBoardDetails'),
			  rowsPerLoad = Math.max(this.getData('rowsPerLoad'), this.getVisibleRowCount()+1)

			for( let i = 0 ; i < Math.min(rowsPerLoad, boardDetails.length) ; i++ ){
				Lyte.arrayUtils(visibleBoards, 'push', true)
			}
	},
	didDestroy : function() {
		this._observer && this._observer.disconnect()
		delete this._observer
		delete this._dir
		clearTimeout(this.timeout2);
		clearTimeout(this.debounceTimeout)
		clearTimeout(this.viewPortTimeOut)
		clearTimeout(this._sortableTimeout)
		clearTimeout(this._cardSortableTimeout)
	},
	didConnect : function() {
		var kanbanviewList = document.querySelectorAll('lyte-kanbanview')
		this._dir = _lyteUiUtils.getRTL();
		if(this.getData('ltPropIntersection').board){
			this.setVisibleArray()
		}
		if(this.getData('ltPropId') == undefined){
			var pos = Object.values(kanbanviewList).indexOf(this.$node)
			this.setData('dummyId', 'dummyId'+pos)
		}
		else{
			this.setData('dummyId',this.getData('ltPropId'))
		}
		this.doBoardSortable()
		if(!this.getData('ltPropViewPort')){
			this.doCardSortable()
		}
		this.$node.getVisibleBoard =function(){
			var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
			if(scrollDiv.scrollWidth<scrollDiv.clientWidth){
				return this.getData('ltPropBoardDetails')
			}
			return this.getVisibleNode()
		}.bind(this)
		if(this.getData('ltPropIntersection').board){
			setTimeout(function(){
				this.createObserver()
				this.addAllKanbanItemToObserver()
			}.bind(this), 200)
			
		}
	},
	ariaObs : function(){
		if(this.getData('ltPropAria')){
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteKanbanviewScrollDivSelector'), this.getData( 'ltPropAriaAttributes' ) || {}, {} );
		}
	}.observes('ltPropAriaAttributes').on('didConnect'),
	
	addVisibleRows : function(kanbanItem){

		const boardDetails = this.getData('ltPropBoardDetails')
		let visibleBoards = this.getData('visibleBoards')
		let indexToShow = kanbanItem.getAttribute('data-index')
		if(indexToShow > visibleBoards.length -1 ){
			Lyte.arrayUtils(visibleBoards,'push', true)
			// const sortableParent = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.sortable-parent' )
			// const sortableElements = sortableParent[0].getConnectedWithArray()
			// this.setUpCard(sortableElements)

		} else if(visibleBoards[indexToShow] && kanbanItem._removedChild ){
			Lyte.Component.appendChild( kanbanItem, kanbanItem._removedChild )
			const board = kanbanItem.querySelector('lyte-board')
			board.toggleIgnore()
			delete kanbanItem._removedChild
		}
		
	},
	removeNotVisibleRows : function(row){
		let visibleBoards = this.getData('visibleBoards')
		const index = row.getAttribute('data-index')
		if(visibleBoards[index] && !row._removedChild && !row.classList.contains('sortable-element-selected') && !row.classList.contains('lyteKanbanSortableParent')){
			LyteComponent.ignoreDisconnect = true;

			if(row.children.length > 0 && row.children[0] ){
				const board = row.querySelector('lyte-board')
				board.toggleIgnore()
				row._removedChild = row.removeChild(row.children[0])
			}
			LyteComponent.ignoreDisconnect = false;
			return true
		} 
		return false
	},
	getVisibleRowCount : function() {
		const containerHeight = this.$node.clientHeight;
		const rowHeight = parseInt(this.getData('ltPropBoardWidth')) || this.$node.querySelector('lyte-kanban-item').clientWidth; // Assuming all rows have the same height
		return Math.max(1, Math.floor(containerHeight / rowHeight));;
	},
	updateVisibility : function(newTopIndex) {
		const visibleCount = this.getVisibleRowCount();
		const bottomIndex = this.getData('currentEndIndex');
		let topIndex = this.getData('currentStartIndex');
		const lastTopIndex = this.getData('lastTopIndex')
		const lastBottomIndex = this.getData('lastBottomIndex')
		const bufferSize = 2
		const newBottomIndex = newTopIndex + visibleCount + bufferSize * 2 - 1;

		if (newTopIndex === lastTopIndex && newBottomIndex === lastBottomIndex){
			 return;
			} // No change, skip update


		// Hide rows out of new range
		// for (let i = lastTopIndex; i <= lastBottomIndex; i++) {
		// 	if (i < newTopIndex || i > newBottomIndex) {
		// 	// rows[i]?.style.display = "none";
		// 		this.removeNotVisibleRows(i)
		// 	}
		// }

		// // Show rows in new range
		// for (let i = newTopIndex; i <= newBottomIndex; i++) {
		// 	if (i < lastTopIndex || i > lastBottomIndex) {
		// 		this.addVisibleRows(i)
		// 	}
		// }

		const kanbanItems = this.$node.querySelectorAll('lyte-kanban-item:not(.lyteSortablePlaceholder)')
		kanbanItems.forEach((row, index) => {
			if(index >= newTopIndex && index <= newBottomIndex){
				this.addVisibleRows(row)
			} else{
				this.removeNotVisibleRows(row)
			}
		  });

		// topIndex = newTopIndex;
		// bottomIndex = newBottomIndex;
		this.setData('currentStartIndex', newTopIndex)
		this.setData('currentEndIndex', newBottomIndex)
		this.setData('lastTopIndex', newTopIndex)
		this.setData('lastBottomIndex', newBottomIndex)
	},
	intersectionObserverFunc : function(entries){
		const self = this
		let topIndex = this.getData('currentStartIndex');
		let bottomIndex = this.getData('currentEndIndex');
		entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// const rowIndex = parseInt(entry.target.getAttribute('data-index'))
					const row = entry.target
					// const visibleCount = this.getVisibleRowCount();
					// let newTopIndex = topIndex;

					// // **Scrolled up → Load previous rows**
					// if (rowIndex === topIndex && topIndex > 0) {
					// 	newTopIndex = Math.max(0, topIndex - 1);
					// }

					// // **Scrolled down → Load next rows**
					// if (rowIndex === bottomIndex && bottomIndex < this.getData('ltPropBoardDetails').length - 1) {
					// 	newTopIndex = Math.min(this.getData('ltPropBoardDetails').length - visibleCount, topIndex + 1);
					// }
					// this.setData('currentStartIndex',topIndex)
					// this.updateVisibility(newTopIndex);


					if(row.classList.contains('lyteSortablePlaceholder')){
						return
					}
					this.addVisibleRows(row)
				} else{
					if(entry.target.classList.contains('lyteSortablePlaceholder')){
						return
					}
					this.removeNotVisibleRows(entry.target)
				}
			})
		
		
	},
	createObserver : function(){
		const boardWidth = parseInt(this.getData('ltPropBoardWidth')) * 2
		const container = this.$node.querySelector('.lyteKanbanviewScrollDivSelector')
		const options = {
		  root: container,
		  threshold: 0, // Trigger when 10% of a row is visible
		  rootMargin: "0px "+boardWidth+"px 0px "+boardWidth +"px"
		};
		this._observer = new IntersectionObserver( this.intersectionObserverFunc.bind(this), options);
	},
	addAllKanbanItemToObserver : function(){
		const kanbanItems= this.$node.querySelectorAll('.lyteKanbanViewItem')
		for(let idx=0; idx < kanbanItems.length; idx++){
			this.addRowObserve( kanbanItems[idx] )
		}
	},
	removeAllKanbanItemToObserver : function(){
		const kanbanItems= this.$node.querySelectorAll('lyte-kanban-item')
		for(let idx=0; idx < kanbanItems.length; idx++){
			this.removeRowObserve( kanbanItems[idx] )
		}
	},
	addRowObserve : function(row){
		// console.log(row)
		!row._observed && this._observer.observe(row)
		row._observed = true
	},
	removeRowObserve : function(row){
		this._observer.unobserve(row)
		row._observed = false
	},
	getVisibleNode : function(){

		// if(this._insideObserver){
		// 	return 
		// }

        // return;
        var bcr=this.$node.getBoundingClientRect(),
        originalRows = Array.from( this.$node.getElementsByTagName( 'lyte-board' ) ),
        tValue = Math.max( bcr.left + (this._dir?0:10) , -10 ),
        bValue = Math.min( window.innerWidth + 10, bcr.right  - (this._dir?10:0)),
        visible = [],boardDetails = this.getData('ltPropBoardDetails');


        for( var i = 0; i < originalRows.length; i++ ){
            var row = originalRows[ i ],
            _bcr = row.getBoundingClientRect(),
			index = this.getData('ltPropIntersection').board ? row.getData('ltPropIndex') : i ;
            if( _bcr.right > tValue && _bcr.left <bValue ){
				if(originalRows[i].component.getMethods('onBoardVisible')){
					originalRows[i].component.executeMethod('onBoardVisible', boardDetails,boardDetails[i])
				}

                visible.push( boardDetails[index] );
                
            }
        }

        return visible;
    
	},
	callOnBoardVisible : function(){

		var originalRows = Array.from( this.$node.getElementsByTagName( 'lyte-board' ) )
		for( var i = 0 ; i < originalRows.length ; i++) {
			if( originalRows[i].component.getMethods( 'onBoardVisible' ) ) {
				originalRows[i].component.executeMethod( 'onBoardVisible' , this.getData('ltPropBoardDetails') ,  this.getData('ltPropBoardDetails')[i])
			}
		}
	},
	boardObs : function(changeObj) {
		if(this.getData('ltPropIntersection').board){
			if(this.getData('visibleBoards').length < this.getData('rowsPerLoad')){
				this.setVisibleArray()
			} else{
				if(changeObj.insertedItems && changeObj.insertedItems.length > 0 && this.getData('visibleBoards').length == changeObj.index){
					Lyte.arrayUtils(this.getData('visibleBoards'),'push',true)
				}
				if(this.getData('visibleBoards').length > this.getData('ltPropBoardDetails').length){
					Lyte.arrayUtils(this.getData('visibleBoards'),'removeAt', this.getData('visibleBoards').length-1)
				}
			}
			
			if( this.getData('ltPropSortable').board ) {
				this.addSortableForNewBoards()
			}
			const sortableParent = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.sortable-parent' )

			if(!this.getData('ltPropPreventBoardDetailObserver') && this.getData('ltPropSortable').card && (!this.getData('ltPropIntersection').card || sortableParent.length == 0)){
				clearTimeout(this._sortableTimeout)
				this._sortableTimeout = setTimeout(function(){
					this.setupSortableForCard()
					this.addAllKanbanItemToObserver()

				}.bind(this),100)
				
			} else{
				this.addAllKanbanItemToObserver()

			}
			return
		}
		
		if( this.getData('ltPropSortable').board ) {
			this.addSortableForNewBoards()
		}
		if(!this.getData('ltPropPreventBoardDetailObserver') && this.getData('ltPropSortable').card){
			// $L( '.lyteKanbanviewScrollDivSelector ', this.$node ).sortable("destroy")
			clearTimeout(this._sortableTimeout)
			this._sortableTimeout = setTimeout(function(){
				this.setupSortableForCard()
			}.bind(this),100)
			
		}
	}.observes( 'ltPropBoardDetails.[]' ),
	doCardSortable : function() {
		clearTimeout(this._cardSortableTimeout)
		this._cardSortableTimeout =setTimeout( function(){
			if( this.getData( 'ltPropBoardDetails' ).length > 0 && this.getData( 'ltPropSortable' ).card ) {
				this.setupSortableForCard()
			}
		}.bind(this),100)
		
	},
	doBoardSortable : function() {
		if(  this.getData( 'ltPropSortable' ).board ) {
			this.setupSortableForBoard()
		}
	},
	hasSameColumnReordered : function( source, destination ) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' )

		if( sourceIndex == destinationIndex ) {
			return true
		}
		return false
	},
	onRecordDropForBoard : function( boardDetails, droppedElement, fromIndex, toIndex, source, destination, draggedElement ){
		
		if( this.getMethods( 'onRecordDropForBoard') ) {
			this.executeMethod( 'onRecordDropForBoard', droppedElement, source, destination, fromIndex, toIndex ,boardDetails ,draggedElement[0] )
		}
	},
	onRecordDrop : function( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination,droppedElement) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' ),
		sBoard,dBoard,card


		dBoard = destination.closest( 'lyte-board' );
		card = droppedElement.querySelector( 'lyte-card' )
		if( !this.hasSameColumnReordered( source, destination ) ) {
			sBoard = source.closest('lyte-board')
			boardDetails[ sourceIndex ].cards = sourceArray; 
			sBoard.setData( 'ltPropContent' , sourceArray );
		}
		sBoard = sBoard || dBoard
		boardDetails[ destinationIndex ].cards = destArray; 
		dBoard.setData('ltPropContent' , destArray);

		if( this.getMethods( 'onRecordDrop') ) {
			this.executeMethod( 'onRecordDrop', card, sBoard, dBoard, fromIndex, toIndex,parseInt(sourceIndex),parseInt(destinationIndex),boardDetails,draggedElement[0] ) 
		}
	},
	addSortableForCard : function(){
		//debounce
		clearTimeout(this.viewPortTimeOut)
		this.viewPortTimeOut = setTimeout(function(){
			// this.setupSortableForCard()
			
			this.setUpCard()
		}.bind(this),250)
	},
	callSetUpCardFunc : function(){
		const sortableParent = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.sortable-parent' )
		if(sortableParent.length != 0){
			const sortableElements = sortableParent[0].getConnectedWithArray()
			this.setUpCard(sortableElements)
		}
		
	},
	setUpCard : function(boardWithSortable){
		// console.log(boardWithSortable)
		var boardWithoutSortable = this.$node.querySelectorAll( '.lyteKanbanNestedSortable:not(.sortable-parent)' )
		boardWithSortable = boardWithSortable || this.$node.querySelectorAll( '.lyteKanbanNestedSortable.sortable-parent' )
		if( boardWithoutSortable.length > 0 && boardWithSortable.length > 0 ){
			var self=this  ;
			var sortableObject = {
				scrollDivX  :  '.lyteKanbanviewScrollDivSelector.'+self.getData('dummyId') , 
				isSameClass : true, 
				dblTouchEvent : true,
				onReady : function(sortableElem) {
					var board = $L(sortableElem)[0].closest("lyte-board")
					if( self.getMethods( 'onReadyForCard' ) ){
						return self.executeMethod( 'onReadyForCard', sortableElem, board); 
					}
				},
				onSelect  : function( currentElem, fromIndex, source, event ) { 
					
					if($L(currentElem).hasClass('lyteKanbanNoResultMsg')){
						return false;
					}
					
					_lyteUiUtils.closeAllPopups()
					var	card = currentElem.querySelector( 'lyte-card' )
					var res = true
					if( self.getMethods( 'onDragSelectForCard' ) ){
						res =  self.executeMethod( 'onDragSelectForCard', card, fromIndex, source, event ); 
						
					}
					if(res && (self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board)){
						var kanbanItem = $L(currentElem)[0].closest('lyte-kanban-item')
						kanbanItem && kanbanItem.classList.add('lyteKanbanSortableParent')
					}
					return res;
				},
				
				onPlaceholder : function (draggableElement ,placeholderElement ,source ,destination ) {
					var	card = draggableElement.querySelector( 'lyte-card' )
					if( self.getMethods( 'onPlaceholderForCard' ) ){
						return self.executeMethod( 'onPlaceholderForCard', card, placeholderElement, source, destination ); 
					}
					return true
				},
				onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
					self.prevent =true
					var	card = draggableElement.querySelector( 'lyte-card' )
					if( self.getMethods( 'onDragForCard' ) ){
							self.executeMethod( 'onDragForCard', card, belowElem, event, placeholder ); 
					}
				},
				onEnter : function(event, obj){
					// console.log("onEnter")
					var element = arguments[1].sortable,
					boardDetails=self.getData( 'ltPropBoardDetails' )

					if(element.getAttribute('cards-length')==0){
						var div=element.nextElementSibling
						if($L(div).hasClass('lyteKanbanNoResultMsg')){
							div.classList.add('lyteHide')
						}
					}
					if( self.getMethods( 'onEnterForCard' ) ){
						return self.executeMethod( 'onEnterForCard', boardDetails, event, obj); 
					}
				},
				onLeave : function ( event , obj) {
					var element = arguments[1].sortable,
					boardDetails=self.getData( 'ltPropBoardDetails' )

					if(element.getAttribute('cards-length')==0){
						var div=element.nextElementSibling
						if($L(div).hasClass('lyteKanbanNoResultMsg')){
							div.classList.remove('lyteHide')
						}
					}
					if( self.getMethods( 'onLeaveForCard' ) ){
						return self.executeMethod( 'onLeaveForCard',boardDetails, event, obj); 
					}
				},
				onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
					var sourceIndex = source.getAttribute( 'index' ),
					destinationIndex = destination.getAttribute( 'index' ),
					boardDetails=self.getData( 'ltPropBoardDetails' ),
					sourceArray=boardDetails[ sourceIndex ].cards,
					destArray=boardDetails[ destinationIndex ].cards,
					flag = true;
					if( self.getMethods( 'onBeforeDropForCard' ) ){
						flag = self.executeMethod( 'onBeforeDropForCard', boardDetails, sourceArray, destArray, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
					}
					if(!flag && (self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board)){
						var kanbanItem = $L(droppableElement)[0].closest('lyte-kanban-item')
						kanbanItem && kanbanItem.classList.remove('lyteKanbanSortableParent')
					}
					return flag;
				},
				onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
					var sourceIndex = source.getAttribute( 'index' ),
					destinationIndex = destination.getAttribute( 'index' ),
					boardDetails=self.getData( 'ltPropBoardDetails' ),
					sourceArray=boardDetails[ sourceIndex ].cards,
					destArray=boardDetails[ destinationIndex ].cards,
					draggedElement
					if(destArray.length==0){
						toIndex=0;
					}
					draggedElement = ( self.hasSameColumnReordered( source, destination ) ? Lyte.arrayUtils( destArray, 'splice', fromIndex, 1 ) : Lyte.arrayUtils( sourceArray, 'splice', fromIndex, 1 ) )
					Lyte.arrayUtils( destArray, 'splice', toIndex, 0, draggedElement[ 0 ] )
					delete self.prevent

					self.onRecordDrop( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination ,droppedElement)
					if(self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board){
						var kanbanItem = $L(source)[0].closest('lyte-kanban-item')
						kanbanItem && kanbanItem.classList.remove('lyteKanbanSortableParent')
					}
				}  
			}
			if( this.getData('ltPropSortableCancel') ){
				sortableObject.cancel = this.getData('ltPropSortableCancel')

			}
			if(this.getData('ltPropSortableRestrict')){
				sortableObject.restrict = this.getData('ltPropSortableRestrict')
			}
			boardWithSortable.forEach(function(element){
				if(Array.from(boardWithoutSortable).indexOf(element) > -1){
					return
				}
				element.addToConnectedWith(
					boardWithoutSortable,sortableObject);
			})
			// console.log(boardWithoutSortable)
			// console.log(boardWithSortable)
		} 
		if(boardWithSortable.length == 0){
			this.setupSortableForCard()
		}
	},
	setupSortableForBoard : function() {
		var self=this  ;
		var sortableObject =  {  
			scrollDivX  :  '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			dblTouchEvent: true ,
			onReady : function(sortableElem) {
				if( self.getMethods( 'onReadyForBoard' ) ){
					return self.executeMethod( 'onReadyForBoard', sortableElem, this); 
				}
			},
			onSelect  : function( currentElem, fromIndex, source, event ) { 
					var	board = currentElem.querySelector( 'lyte-board' )
					_lyteUiUtils.closeAllPopups()
					if( self.getMethods( 'onDragSelectForBoard' ) ){
						return self.executeMethod( 'onDragSelectForBoard', board, fromIndex, source, event ); 
					}
					
					return true;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	board = draggableElement.querySelector( 'lyte-board' )

				if( self.getMethods( 'onDragForBoard' ) ){
						 self.executeMethod( 'onDragForBoard', board, belowElem, event, placeholder ); 
				}
			},
			onEnter : function ( event , obj) {
				var boardDetails=self.getData( 'ltPropBoardDetails' )

				if( self.getMethods( 'onEnterForBoard' ) ){
					self.executeMethod( 'onEnterForBoard',boardDetails, event, obj); 
		   		}
			},
			onLeave : function ( event , obj) {
				var boardDetails=self.getData( 'ltPropBoardDetails' )

				if( self.getMethods( 'onLeaveForBoard' ) ){
					self.executeMethod( 'onLeaveForBoard', boardDetails, event, obj); 
		   		}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				board = droppableElement.querySelector( 'lyte-board' ),
				flag = true;
				if( self.getMethods( 'onBeforeDropForBoard' ) ){
					flag = self.executeMethod( 'onBeforeDropForBoard', boardDetails, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				draggedElement, board = droppedElement.querySelector( 'lyte-board' )



				draggedElement = Lyte.arrayUtils( boardDetails, 'splice', fromIndex, 1 )
				Lyte.arrayUtils( boardDetails, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.setData('ltPropBoardDetails',boardDetails)
				self.onRecordDropForBoard( boardDetails, board , fromIndex, toIndex, source, destination, draggedElement)
				$L( '.lyteKanbanNestedSortable ', this.$node ).sortable("destroy")

				
		 	} ,
			onPlaceholder : function (draggableElement ,placeholderElement ,source ,destination) {
				var	board = draggableElement.querySelector( 'lyte-board' )
					if( self.getMethods( 'onPlaceholderForBoard' ) ){
						return self.executeMethod( 'onPlaceholderForBoard', board, placeholderElement, source, destination ); 
					}
				return true
			}
 		}
		if( this.getData('ltPropSortableCancel') ){
			sortableObject.cancel = this.getData('ltPropSortableCancel')

		}
		if(this.getData('ltPropSortableRestrict')){
			sortableObject.restrict = this.getData('ltPropSortableRestrict')
		}
		$L( '.lyteKanbanviewScrollDivSelector ', this.$node ).sortable(sortableObject); 
	},
	setupSortableForCard : function(){
		var self=this;
		// if($L( '.lyteKanbanNestedSortable', this.$node )){
		var sortableObject = {  
			scrollDivX  : '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			connectedWith  : '.lyteKanbanNestedSortable.'+this.getData('dummyId') , 
			isSameClass : true,
			dblTouchEvent: true ,
			onReady : function(sortableElem) {
				var board = $L(sortableElem)[0].closest("lyte-board")
				if( self.getMethods( 'onReadyForCard' ) ){
					return self.executeMethod( 'onReadyForCard', sortableElem, board); 
				}
			},
			onSelect  : function( currentElem, fromIndex, source, event ) { 
					if($L(currentElem).hasClass('lyteKanbanNoResultMsg')){
						return false;
					}
					
					_lyteUiUtils.closeAllPopups()
					var	card = currentElem.querySelector( 'lyte-card' ), res = true

					if( self.getMethods( 'onDragSelectForCard' ) ){
						 res = self.executeMethod( 'onDragSelectForCard', card, fromIndex, source, event ); 
						
					}
					if(res && (self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board)){
						var kanbanItem = $L(currentElem)[0].closest('lyte-kanban-item')
						kanbanItem && kanbanItem.classList.add('lyteKanbanSortableParent')
					}
					return res;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	card = draggableElement.querySelector( 'lyte-card' )
				if( self.getMethods( 'onDragForCard' ) ){
						 self.executeMethod( 'onDragForCard', card, belowElem, event, placeholder ); 
				}
			},
			onEnter : function(event, obj){
				var element = arguments[1].sortable,
				boardDetails=self.getData( 'ltPropBoardDetails' )

				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.add('lyteHide')
					}
				}
				if( self.getMethods( 'onEnterForCard' ) ){
					return self.executeMethod( 'onEnterForCard', boardDetails, event, obj); 
				}
			},
			onLeave : function ( event , obj) {
				var element = arguments[1].sortable,
				boardDetails=self.getData( 'ltPropBoardDetails' )

				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.remove('lyteHide')
					}
				}
				if( self.getMethods( 'onLeaveForCard' ) ){
					return self.executeMethod( 'onLeaveForCard',boardDetails, event, obj); 
				}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				flag = true;
				if( self.getMethods( 'onBeforeDropForCard' ) ){
					flag = self.executeMethod( 'onBeforeDropForCard', boardDetails, sourceArray, destArray, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				if(!flag && (self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board)){
					var kanbanItem = $L(droppableElement)[0].closest('lyte-kanban-item')
					kanbanItem && kanbanItem.classList.remove('lyteKanbanSortableParent')
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				draggedElement
				if(destArray.length==0){
					toIndex=0;
				}
				draggedElement = ( self.hasSameColumnReordered( source, destination ) ? Lyte.arrayUtils( destArray, 'splice', fromIndex, 1 ) : Lyte.arrayUtils( sourceArray, 'splice', fromIndex, 1 ) )
				Lyte.arrayUtils( destArray, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.onRecordDrop( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination ,droppedElement)
				if((self.getData('ltPropIntersection').card || self.getData('ltPropIntersection').board)){
					var kanbanItem = $L(source)[0].closest('lyte-kanban-item')
					kanbanItem && kanbanItem.classList.remove('lyteKanbanSortableParent')
				}
			},
			onPlaceholder : function ( draggableElement , placeholderElement , source , destination ) {
				var	card = draggableElement.querySelector( 'lyte-card' )
					if( self.getMethods( 'onPlaceholderForCard' ) ){
						return self.executeMethod( 'onPlaceholderForCard', card, placeholderElement, source, destination ); 
					}
				return true
			}
		 }
		if(this.getData('ltPropSortableCancel')){
			sortableObject.cancel =this.getData('ltPropSortableCancel')

		}
		if(this.getData('ltPropSortableRestrict')){
			sortableObject.restrict = this.getData('ltPropSortableRestrict')
		}
			$L( '.lyteKanbanNestedSortable', this.$node ).sortable( sortableObject );
		// }
		 
	},
	isDragging : function(){
		if(this.prevent){
			return true
		}
		return false
	},
	hasScrollEndReached : function(event) {
		var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ),
			boardDetails = this.getData( 'ltPropBoardDetails' ),
			clientRect=this.$node.getBoundingClientRect(),
			lastClient=scrollDiv.lastElementChild.getBoundingClientRect()
			if((!this._dir && lastClient.right-3 < clientRect.right)||(this._dir&& lastClient.left+3>Math.min(window.innerWidth,clientRect.left))){
					
				if( this.getData('ltPropMoreStageRecord') && this.getMethods( 'onBodyScroll' ) ) {
					this.executeMethod( 'onBodyScroll', this, boardDetails,event );
					
					}
			}
         
	},
	addSortableForNewBoards : function() {
		var sortableClass = this.$node.querySelectorAll( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )[ 0 ].getSortableClass(),
		boardWithoutSortable = this.$node.querySelectorAll( '.lyteKanbanViewItem:not(.'+sortableClass+')' )

		$L(boardWithoutSortable).addClass("sortable-element "+sortableClass );
	},
	executeScrollStop : function(event){
		
		var visible,boardDetails=this.getData('ltPropBoardDetails'),
		scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
		if(scrollDiv.scrollWidth > scrollDiv.clientWidth){
			visible = this.getVisibleNode()
		}
		else{
			visible = boardDetails
			this.callOnBoardVisible()

		}	
		if( this.getMethods( 'onBodyScrollStop' ) ) {
			this.executeMethod( 'onBodyScrollStop', boardDetails, visible, this, scrollDiv.scrollLeft,event );
		}
	},
	actions :{
		onBodyScroll : function( ev ) {
			this.timeout2 = setTimeout( function() {
				this.hasScrollEndReached(ev)
			}.bind( this ), 10 );
			clearTimeout(this.debounceTimeout)
			this.debounceTimeout = setTimeout( function(){
				this.executeScrollStop(ev)
			}.bind(this),this.getData('ltPropBoardScrollStopDuration'))
		}
	}
});
/**
 * @customElement lyte-kanban-item
 */
if( !_lyteUiUtils.registeredCustomElements[ 'lyte-kanban-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-kanban-item' ] = true;

	Lyte.createCustomElement( 'lyte-kanban-item', {
        static : {
           
       },
	   disconnectedCallback: function() {
           
		   if(Lyte.Component.shouldIgnoreDisconnect()){
			    return
			}
			if(this._removedChild ){
				document.body.appendChild(this._removedChild);
				this._removedChild.remove();		
		    }
			var kanbanview = $L( this ).closest( 'lyte-kanbanview' ).get( 0 );
			kanbanview && kanbanview.component.removeRowObserve(this );
        }
    })
}

// if( !_lyteUiUtils.registeredCustomElements[ 'lyte-kanban-item ' ] ) {
// 	_lyteUiUtils.registeredCustomElements[ 'lyte-kanban-item ' ] = true; 
// 	Lyte.createCustomElement("lyte-kanban-item", {
//         static : {
             
//         },
//         connectedCallback: function() {
//             var query = "lyte-kanbanview",
//             kanbanview = this.closest ? this.closest( query ) : $L( this ).closest( query ).get( 0 );

//             if( kanbanview && kanbanview.getData( 'ltPropBoardIntersection' ) ){
//                 kanbanview.component.addRowObserve(this)
//             }
//         },
//         // createIntersection : function( arg ){
//         //         var table = $L( this ).closest( 'lyte-expresstable' ).get( 0 );
//         //         if( table.getData('ltPropStickyTable') ){
//         //             if( arg && !this._horizontalIntersectionDiv ){
//         //                 this.createIntersection( table );
//         //             } else if( !arg && this._horizontalIntersectionDiv ){
//         //                 var intersection = this._horizontalIntersectionDiv;
//         //                 this.removeIntersection( intersection, table );
//         //                 table.component.removeSticky( this );
//         //                 table.component.removeFixedClass( this );
//         //             }
//         //         }
//         // },
//         // removeIntersection : function( intersection, table ){
//         //         if( table ){
//         //             table.component._intersectionObs.unobserve( intersection );
//         //         }
//         //         intersection.remove();
//         //         delete intersection._cell;
//         //         delete this._horizontalIntersectionDiv;
//         //     },
//         disconnectedCallback : function(){
//             if(Lyte.Component.shouldIgnoreDisconnect()){
//                 return
//             }
//             var kanbanview = $L( this ).closest( 'lyte-kanbanview' ).get( 0 );
//         	kanbanview && kanbanview.component.removeRowObserve(this );
//         },

               
//     });
// }
/**
 * 
 * @syntax yielded 
 *	<lyte-kanbanview lt-prop-id="kanbanview">
 *   <template is="registerYield" yield-name="kanbanYield">
 *      <lyte-board lt-prop-kanban-id="kanbanview">
 *           <template is="registerYield" yield-name="headerItem">
 *           Board 1
 *           </template>
 *           <template is="registerYield" yield-name="contentItem">
 *               <lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 1
 *                       </lyte-card-body>
 *                   </template>
 *				</lyte-card>
 *				<lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 2
 *                       </lyte-card-body>
 *                   </template>
 *               </lyte-card>
 *          </template>
 *       </lyte-board>
 *       <lyte-board lt-prop-kanban-id="kanbanview">
 *           <template is="registerYield" yield-name="headerItem">
 *           Board 2
 *           </template>
 *           <template is="registerYield" yield-name="contentItem">
 *               <lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 1
 *                       </lyte-card-body>
 *                   </template>
 *				</lyte-card>
 *				<lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 2
 *                       </lyte-card-body>
 *                   </template>
 *               </lyte-card>
 *          </template>
 *       </lyte-board>
 *   </template>
 *   </lyte-kanbanview>
 */
