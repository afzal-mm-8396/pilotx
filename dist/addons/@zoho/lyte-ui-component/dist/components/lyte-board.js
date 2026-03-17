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