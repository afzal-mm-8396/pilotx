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
