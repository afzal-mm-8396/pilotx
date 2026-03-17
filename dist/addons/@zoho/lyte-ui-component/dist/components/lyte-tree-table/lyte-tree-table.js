Lyte.Component.register("lyte-tree-table", {
_template:"<template tag-name=\"lyte-tree-table\" class=\"lyteTreeTable\"> <template is=\"if\" value=\"{{ltPropLinearTable}}\"><template case=\"true\"> <lyte-tree-table-node-wrapper class=\"lyteTreeTableInfiniteWrapper\"> <lyte-tree-table-node> <template is=\"if\" value=\"{{expHandlers(calledFromInside,'!')}}\"><template case=\"true\"> <lyte-tree-table-header class=\"lyteTreeTableInfiniteHeader{{if(ltPropHideHeader,' lyteTreeTableHeaderHidden','')}}\"> <lyte-yield yield-name=\"treeTableHead\" header-value=\"{{ltPropHeader}}\"></lyte-yield> </lyte-tree-table-header> </template></template> <lyte-tree-table-body class=\"lyteTreeTableInfiniteBody\"> <template is=\"if\" value=\"{{expHandlers(noResultsFound,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(enableInfiniteScroll,'!')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"listValue\" index=\"index\"> <lyte-tree-table-infinite-tr class=\"lyteTreeTableInfiniteTr infinitescrollDisabled\" intend-level=\"\" tabindex=\"1\" data-id=\"{{listValue.id}}\" onmouseenter=\"{{action('focusTableRow',event,this)}}\" onmouseleave=\"{{action('blurTableRow',event,this)}}\" onmousedown=\"{{action('cloneTableRow',event,this)}}\" onfocus=\"{{action('focusTableRow',event,this)}}\" onblur=\"{{action('blurTableRow',event,this)}}\"> <lyte-yield class=\"lyteTreeTableRow\" yield-name=\"lyteTreeTableRow\" list-value=\"{{listValue}}\" index=\"{{index}}\" level=\"{{level}}\" style=\"--tree-level:{{setIntendLevel(listValue)}};\" data-index=\"{{indexVar}}\" lt-prop-linear-table=\"{{ltPropLinearTable}}\"> </lyte-yield> </lyte-tree-table-infinite-tr> </template> </template><template case=\"false\"> <template is=\"forIn\" object=\"{{linearDataRenderObject}}\" value=\"listValue\" key=\"key\"> <lyte-tree-table-infinite-tr class=\"lyteTreeTableInfiniteTr\" intend-level=\"\" tabindex=\"1\" data-id=\"{{listValue.data.id}}\" onmouseenter=\"{{action('focusTableRow',event,this)}}\" onmouseleave=\"{{action('blurTableRow',event,this)}}\" onmousedown=\"{{action('cloneTableRow',event,this)}}\" onfocus=\"{{action('focusTableRow',event,this)}}\" onblur=\"{{action('blurTableRow',event,this)}}\"> <lyte-yield class=\"lyteTreeTableRow\" yield-name=\"lyteTreeTableRow\" list-value=\"{{listValue.data}}\" index=\"{{index}}\" level=\"{{level}}\" style=\"--tree-level:{{setIntendLevel(listValue)}};\" data-index=\"{{indexVar}}\" lt-prop-linear-table=\"{{ltPropLinearTable}}\"> </lyte-yield> </lyte-tree-table-infinite-tr> </template> </template></template> </template><template case=\"false\"> <lyte-tree-table-infinite-tr class=\"lyteTreeTableInfiniteTr\"> <lyte-yield yield-name=\"noResultsFound\" class=\"lyteTreeTableNoResultsFound\"> No Results Found </lyte-yield> </lyte-tree-table-infinite-tr> </template></template> </lyte-tree-table-body> </lyte-tree-table-node> </lyte-tree-table-node-wrapper> </template><template case=\"false\"> <lyte-tree-table-node> <template is=\"if\" value=\"{{expHandlers(calledFromInside,'!')}}\"><template case=\"true\"> <lyte-tree-table-header class=\"lyteTreeTableHeader{{if(ltPropHideHeader,' lyteTreeTableHeaderHidden','')}}\"> <lyte-yield yield-name=\"treeTableHead\" header-value=\"{{ltPropHeader}}\"></lyte-yield> </lyte-tree-table-header> </template></template> <lyte-tree-table-body class=\"lyteTreeTableBody\"> <lyte-tree-table-child @hide-tag=\"true\" lt-prop-data=\"{{ltPropData}}\"> <template is=\"registerYield\" yield-name=\"treeTableRow\"> <lyte-yield class=\"lyteTreeTableRow {{lyteTTIconHelper(listValue)}} {{lyteTThasChildHelper(listValue)}}\" yield-name=\"lyteTreeTableRow\" list-value=\"{{listValue}}\" index=\"{{index}}\" level=\"{{level}}\" style=\"--tree-level:{{level}};\" data-index=\"{{indexVar}}\"> </lyte-yield> </template> </lyte-tree-table-child> </lyte-tree-table-body> </lyte-tree-table-node> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--tree-level:'",{"type":"helper","value":{"name":"setIntendLevel","args":["listValue"]}},"';'"]}}}},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--tree-level:'",{"type":"helper","value":{"name":"setIntendLevel","args":["listValue"]}},"';'"]}}}},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1],"trans":true},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--tree-level:'","level","';'"]}}}},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropHeader","ltPropData","ltPropAsTree","ltPropScrollSpeed","ltPropRowSortable","ltPropColumnSortable","ltPropHideHeader","ltPropLinearTable","ltPropSearchKey","ltPropLinearDataAnimate","ltPropRowHeight","ltPropCollapsed","ltPropInfiniteScroll","leftInterSectionArr","rootMarginArr","asTreeIndex","fixedColConfigs","initialRowVals","initialClientVals","originalLinearCompleteData","noResultsFound","clonedRowElement","clonedRowClickDifference","lastActiveRow","lastScrollTop","linearDataRenderObject","infiniteScrollDisplayElem","enableInfiniteScroll","linearTableIdType","selectedRowData","selectedRowForAnimate","lastMouseDownEventforAnimate","enableAnimate","isAllCollapsed"],
_observedAttributesType :["array","array","string","number","boolean","boolean","boolean","boolean","string","boolean","number","boolean","boolean","array","array","number","array","object","object","array","boolean","object","number","object","number","object","number","boolean","string","object","object","object","boolean","boolean"],

	data: function () {
		return {
			// Exposed variables
			ltPropHeader: Lyte.attr('array', {
				default: []
			}),
			ltPropData: Lyte.attr('array', {
				default: [],
				watch: true
			}),
			ltPropAsTree: Lyte.attr('string', {
				default: '1'
			}),
			ltPropScrollSpeed: Lyte.attr('number', {
				default: 5
			}),
			ltPropRowSortable: Lyte.attr('boolean', {
				default: false
			}),
			ltPropColumnSortable: Lyte.attr('boolean', {
				default: true
			}),
			ltPropHideHeader: Lyte.attr('boolean', {
				default: false
			}),
			ltPropLinearTable: Lyte.attr('boolean', {
				default: false
			}),
			ltPropSearchKey: Lyte.attr('string', {
				default: 'Name'
			}),
			ltPropLinearDataAnimate: Lyte.attr('boolean', {
				default: false
			}),
			ltPropRowHeight: Lyte.attr('number', {
				default: 40
			}),
			ltPropCollapsed: Lyte.attr('boolean', {
				default: false
			}),
			ltPropInfiniteScroll: Lyte.attr('boolean', {
				default: true
			}),

			// Internal variables
			// intersection observer variables
			leftInterSectionArr: Lyte.attr('array', {
				default: [0]
			}),
			rootMarginArr: Lyte.attr('array', {
				default: []
			}),
			asTreeIndex: Lyte.attr('number', {
				default: 1
			}),
			fixedColConfigs: Lyte.attr('array', {
				default: []
			}),

			// drag and drop variables
			initialRowVals: Lyte.attr('object', {
				default: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: 0,
					height: 0
				}
			}),
			initialClientVals: Lyte.attr('object', {
				default: {
					x: 0,
					y: 0
				}
			}),


			originalLinearCompleteData: Lyte.attr('array', {
				default: []
			}),
			noResultsFound: Lyte.attr('boolean', {
				default: false
			}),
			clonedRowElement: Lyte.attr('object', {
				default: null
			}),
			clonedRowClickDifference: Lyte.attr('number', {
				default: 0
			}),
			lastActiveRow: Lyte.attr('object', {
				default: null
			}),
			lastScrollTop: Lyte.attr('number', {
				default: 0
			}),
			linearDataRenderObject: Lyte.attr("object", {
				default: {},
				watch: true
			}),
			infiniteScrollDisplayElem: Lyte.attr("number", {
				default: 10
			}),
			enableInfiniteScroll: Lyte.attr("boolean", {
				default: false
			}),
			linearTableIdType: Lyte.attr("string", {
				default: ""
			}),
			selectedRowData: Lyte.attr("object", {
				default: {}
			}),
			selectedRowForAnimate: Lyte.attr("object", {
				default: {}
			}),
			lastMouseDownEventforAnimate: Lyte.attr("object", {
				default: {}
			}),
			enableAnimate: Lyte.attr("boolean", {
				default: true
			}),
			isAllCollapsed: Lyte.attr("boolean", {
				default: false
			})
		}
	},
	init: function () { 
		this.getData('ltPropData').forEach(function (item) {
				if (item.children && item.children.length) {
					Lyte.objectUtils(item, 'add', 'actionIconState', "expanded");
				}
			});
	},
	didConnect: function () {
		if (this.getData('ltPropLinearTable') && this.getData('ltPropData').length) {
			this.setData("linearTableIdType", typeof this.getData("ltPropData")[0].id === "number" ? "number" : "string");
			let data = [...this.getData('ltPropData')];
			
			this.$node.expandAll = this.expandAllLinearData.bind(this)
			this.$node.collapseAll = this.collapseAllLinearData.bind(this)
			this.$node.searchTree = this.searchData.bind(this)
			
			this.setData('originalLinearCompleteData', data);
			
			if (this.getData('ltPropCollapsed')) {
				this.$node.collapseAll();
			}
			if (this.getData('ltPropInfiniteScroll')) {
				this.checkForInfiniteScroll.call(this)
			}
		} else {
			var _this = this
			this.updateNewRowProps()

			if(this.getData('ltPropRowSortable')){
				$L(this.$node).find('lyte-tree-table-body')[0].addEventListener('mousedown' , this.mouseDownFunction)
			}

			this.$node.alignTreeTable = function(){
				_this.updateNewRowProps()
			}

			// this.initiateIntersectionObserver();
		}

	},

	mouseDownFunction: function (event) {
		var _this = $L(event.target).closest('lyte-tree-table')[0].component;
		var currentDraggedRow = $L(event.target).closest('.lyteTreeTableRow')
		currentDraggedRow.addClass('lyteTTCurrentDraggedRow')
		var rowDim = currentDraggedRow[0].getBoundingClientRect()


		Lyte.objectUtils(_this.getData('initialClientVals') , 'add' , 'x' , event.clientX)
		Lyte.objectUtils(_this.getData('initialClientVals') , 'add' , 'y' , event.clientY)


		Lyte.objectUtils(_this.getData('initialRowVals') , 'add' , {
			'top' : rowDim.top,
			'left' : rowDim.left,
			'right' : rowDim.right,
			'bottom' : rowDim.bottom,
			'width' : rowDim.width,
			'height' : rowDim.height
		})

		var onDragStart = _this.executeMethod('onDragStart' , _this.getTreeObj(currentDraggedRow.attr('data-index')) , _this.getTreeData(currentDraggedRow.attr('data-index')))

		if(onDragStart !== false){
			window.addEventListener('mousemove' , _this.mouseMoveFunction)
			window.addEventListener('mouseup' , _this.mouseUpFunction)
		}
	},
	// mouseMoveFunction : function(event){
	// 	$L('.lyteTTtopPlaceHolder').removeClass('lyteTTtopPlaceHolder')
	// 	$L('.lyteTTchildPlaceHolder').removeClass('lyteTTchildPlaceHolder')
	// 	$L('.lyteTTbottomPlaceHolder').removeClass('lyteTTbottomPlaceHolder')
	// 	$L('.lyteTTnotDroppable').removeClass('lyteTTnotDroppable')
	// 	var _this = $L('.lyteTTCurrentDraggedRow').closest('lyte-tree-table')[0].component;
	// 	var currentRow = $L('.lyteTTCurrentDraggedRow').closest('.lyteTreeTableRow')

	// 	if(Math.abs(_this.getData('initialClientVals').y - event.clientY) > 5){
	// 		if(!$L('.lyteTreeCurrentSortElem')[0]){
	// 			var currentSortNode = $L(_this.$node).find('.lyteTTCurrentDraggedRow')[0]
	// 			var dummyNode = currentSortNode.cloneNode(true);
	// 			$L(dummyNode).addClass('lyteTreeCurrentSortElem')
	// 			$L(dummyNode).removeClass('lyteTTCurrentDraggedRow');
	// 			dummyNode.style.position = "absolute";
	// 			dummyNode.style.height = currentSortNode.getBoundingClientRect().height + "px"
	// 			dummyNode.style.zIndex = '100000'
	// 			dummyNode.style.border = "solid 1px #ccc"
	// 			dummyNode.style.setProperty('--treeLevel' , $L(currentSortNode).closest('lyte-tree-body').attr('data-level'))
	// 			var dummyNodeChildren = $L(dummyNode).find('lyte-tree-table-td')
		
	// 			$L(dummyNode).find('lyte-tree-icon').addClass('lyteTreeClonedIcon')
	// 			document.body.appendChild(dummyNode)
	// 			$L(dummyNode).find('.lyteTreeFixedCol').removeClass('lyteTreeFixedCol')
	// 			$L(dummyNode).find('.lyteTableTreeCol').removeClass('lyteTableTreeCol')
	// 		}
	
	// 		var currentSortElem = $L('.lyteTreeCurrentSortElem')[0]
	// 		currentSortElem.style.top = _this.getData('initialRowVals').top - (_this.getData('initialClientVals').y - event.clientY) + "px"
	// 		currentSortElem.style.left = _this.getData('initialRowVals').left - (_this.getData('initialClientVals').x - event.clientX) + "px"
	
	// 		// currentSortElem.style.top =event.clientY + "px"
	// 		// currentSortElem.style.left =event.clientX + "px"

	// 		var dragObj = {};
	// 		dragObj.component = _this
	// 		dragObj.event = event
	// 		dragObj.sourceArray = _this.getTreeData(currentRow.attr('data-index'))
	// 		dragObj.sourceObject = _this.getTreeObj(currentRow.attr('data-index'))
	// 		dragObj.sourceIndex = parseInt(_this.getTreeIndex(currentRow.attr('data-index')))


	// 		dragObj.draggedElem = currentSortElem

	
	// 		var backgroundRow = $L(event.target).closest('.lyteTreeTableRow')
			
	// 		if(backgroundRow[0]){
	// 			dragObj.overArray = _this.getTreeData(backgroundRow.attr('data-index'))
	// 			dragObj.overObject = _this.getTreeObj(backgroundRow.attr('data-index'))
	// 			if(!_this.isOverChild(currentRow.attr('data-index') , backgroundRow.attr('data-index'))){
	// 				if(backgroundRow[0]){
	// 					var backgroundRowDim = backgroundRow[0].getBoundingClientRect()
			
	// 					var topHeight = backgroundRowDim.height * .2
	// 					var midheight = backgroundRowDim.height * .8
	// 					if(!$L(event.target).closest('.lyteTreeTableRow').hasClass('lyteTTCurrentDraggedRow')){
	// 						if(event.clientY < (backgroundRowDim.top + topHeight)){
	// 							dragObj.asChild = false
	// 							_this.executeMethod('onDrag' , dragObj)
	// 							$L(backgroundRow).addClass('lyteTTtopPlaceHolder')
	// 						} else if((event.clientY > (backgroundRowDim.top + topHeight)) && (event.clientY < (backgroundRowDim.top + midheight))){
	// 							dragObj.asChild = true
	// 							_this.executeMethod('onDrag' , dragObj)
	// 							$L(backgroundRow).addClass('lyteTTchildPlaceHolder')
	// 						} else if((event.clientY > (backgroundRowDim.top + midheight)) && (event.clientY < (backgroundRowDim.top + backgroundRowDim.height))){
	// 							dragObj.asChild = false
	// 							_this.executeMethod('onDrag' , dragObj)
	// 							$L(backgroundRow).addClass('lyteTTbottomPlaceHolder')
	// 						}
	// 					}
	// 				}
	// 			} else {
	// 				$L(backgroundRow).addClass('lyteTTnotDroppable')
	// 			}
	// 		}
	// 	}

		
	// },
	mouseMoveFunction : function(event){
		$L('.lyteTTtopPlaceHolder').removeClass('lyteTTtopPlaceHolder')
		$L('.lyteTTchildPlaceHolder').removeClass('lyteTTchildPlaceHolder')
		$L('.lyteTTbottomPlaceHolder').removeClass('lyteTTbottomPlaceHolder')
		$L('.lyteTTnotDroppable').removeClass('lyteTTnotDroppable')
		var _this = $L('.lyteTTCurrentDraggedRow').closest('lyte-tree-table')[0].component;
		var currentRow = $L('.lyteTTCurrentDraggedRow').closest('.lyteTreeTableRow')

		if(Math.abs(_this.getData('initialClientVals').y - event.clientY) > 5){
			if(!$L('.lyteTreeCurrentSortElem')[0]){
				var currentSortNode = $L(_this.$node).find('.lyteTTCurrentDraggedRow')[0]
				var dummyNode = currentSortNode.cloneNode(true);
				$L(dummyNode).addClass('lyteTreeCurrentSortElem')
				$L(dummyNode).removeClass('lyteTTCurrentDraggedRow');
				dummyNode.style.position = "absolute";
				dummyNode.style.height = currentSortNode.getBoundingClientRect().height + "px"
				dummyNode.style.zIndex = '100000'
				dummyNode.style.border = "solid 1px #ccc"
				dummyNode.style.setProperty('--treeLevel' , $L(currentSortNode).closest('lyte-tree-body').attr('data-level'))
				var dummyNodeChildren = $L(dummyNode).find('lyte-tree-table-td')
		
				$L(dummyNode).find('lyte-tree-icon').addClass('lyteTreeClonedIcon')
				document.body.appendChild(dummyNode)
				$L(dummyNode).find('.lyteTreeFixedCol').removeClass('lyteTreeFixedCol')
				$L(dummyNode).find('.lyteTableTreeCol').removeClass('lyteTableTreeCol')
			}
	
			var currentSortElem = $L('.lyteTreeCurrentSortElem')[0]
			currentSortElem.style.top = _this.getData('initialRowVals').top - (_this.getData('initialClientVals').y - event.clientY) + "px"
			currentSortElem.style.left = _this.getData('initialRowVals').left - (_this.getData('initialClientVals').x - event.clientX) + "px"
		}
	},
	mouseUpFunction : function(event){
		$L('.lyteTTtopPlaceHolder').removeClass('lyteTTtopPlaceHolder')
		$L('.lyteTTchildPlaceHolder').removeClass('lyteTTchildPlaceHolder')
		$L('.lyteTTbottomPlaceHolder').removeClass('lyteTTbottomPlaceHolder')
		$L('.lyteTTnotDroppable').removeClass('lyteTTnotDroppable')
		if($L('.lyteTreeCurrentSortElem')[0]){
			$L('.lyteTreeCurrentSortElem')[0].remove()
		}
		var _this = $L('.lyteTTCurrentDraggedRow').closest('lyte-tree-table')[0].component;
		if($L(event.target).closest('lyte-tree-table')[0] == _this.$node){
			var currentRow = $L('.lyteTTCurrentDraggedRow').closest('.lyteTreeTableRow')

			var currentDraggedObject = _this.getTreeObj(currentRow.attr('data-index'))
			var currentDraggedParentArray = _this.getTreeData(currentRow.attr('data-index'))
			var currentDraggedDataIndex = parseInt(_this.getTreeIndex(currentRow.attr('data-index')))

			var dragObj = {};
			dragObj.component = _this
			dragObj.event = event
			dragObj.sourceArray = currentDraggedParentArray
			dragObj.sourceObject = currentDraggedObject
			dragObj.sourceIndex = currentDraggedDataIndex


			var backgroundRow = $L(event.target).closest('.lyteTreeTableRow')


			if(backgroundRow[0]){

				var backgroundRowDim = backgroundRow[0].getBoundingClientRect()

				var backgroundObject = _this.getTreeObj(backgroundRow.attr('data-index'))
				var backgroundParentArray = _this.getTreeData(backgroundRow.attr('data-index'))
				var backgroundDataIndex = parseInt(_this.getTreeIndex(backgroundRow.attr('data-index')))

				dragObj.overArray = backgroundParentArray
				dragObj.overObject = backgroundObject
				dragObj.overIndex = backgroundDataIndex
				dragObj.overElement = backgroundRow

				var onDragEnd = _this.executeMethod('onDragEnd' , dragObj);
				if(onDragEnd === false){
					return;
				}
	
		
				var topHeight = backgroundRowDim.height * .2
				var midheight = backgroundRowDim.height * .8
				if(!_this.isOverChild(currentRow.attr('data-index') , backgroundRow.attr('data-index'))){
					var onBeforeDrop;
					var dropObj = {}
					if(!backgroundRow.hasClass('lyteTTCurrentDraggedRow')){
						if(event.clientY < (backgroundRowDim.top + topHeight)){

							dragObj.asChild = false;

							onBeforeDrop = _this.executeMethod('onBeforeDrop' , dragObj);
							if(onBeforeDrop === false){
								return;
							}

							if((currentDraggedDataIndex > backgroundDataIndex) || (currentDraggedParentArray !== backgroundParentArray)){
								Lyte.arrayUtils(currentDraggedParentArray , 'removeObjects' , currentDraggedObject)
								Lyte.arrayUtils(backgroundParentArray , 'insertAt' , backgroundDataIndex , currentDraggedObject)
							} else if((currentDraggedDataIndex < backgroundDataIndex) || (currentDraggedParentArray !== backgroundParentArray)){
								Lyte.arrayUtils(backgroundParentArray , 'insertAt' , backgroundDataIndex , currentDraggedObject)
								Lyte.arrayUtils(currentDraggedParentArray , 'removeObjects' , currentDraggedObject)
							}
							dropObj.droppedIndex = backgroundDataIndex
						} else if((event.clientY > (backgroundRowDim.top + topHeight)) && (event.clientY < (backgroundRowDim.top + midheight))){
							if(backgroundObject){

								

								if(backgroundObject.children && backgroundObject.children.length>1){
									Lyte.objectUtils(backgroundObject , 'add' , 'collapsed' , false);
								}
								if(!backgroundObject.children){
									Lyte.objectUtils(backgroundObject , 'add' , 'children' , [])
								}

								dragObj.asChild = true;
								dragObj.overArray = backgroundObject.children

								onBeforeDrop = _this.executeMethod('onBeforeDrop' , dragObj);
								if(onBeforeDrop === false){
									return;
								}

								Lyte.arrayUtils(backgroundObject.children , 'push' , currentDraggedObject)
								Lyte.arrayUtils(currentDraggedParentArray , 'removeObjects' , currentDraggedObject)

								dropObj.droppedIndex = backgroundObject.children.length

								if(backgroundRow.hasClass('lyteTreeTableLeafNode') || backgroundRow.hasClass('lyteTreeTableClosedRow')){
									backgroundRow.removeClass('lyteTreeTableLeafNode')
									backgroundRow.removeClass('lyteTreeTableClosedRow')
									backgroundRow.addClass('lyteTreeTableOpenedRow')
								}
							}
						} else if((event.clientY > (backgroundRowDim.top + midheight)) && (event.clientY < (backgroundRowDim.top + backgroundRowDim.height))){
							dragObj.asChild = false;

							onBeforeDrop = _this.executeMethod('onBeforeDrop' , dragObj);
							if(onBeforeDrop === false){
								return;
							}
							
							if((currentDraggedDataIndex > backgroundDataIndex) || (currentDraggedParentArray !== backgroundParentArray)){
								Lyte.arrayUtils(currentDraggedParentArray , 'removeObjects' , currentDraggedObject)
								Lyte.arrayUtils(backgroundParentArray , 'insertAt' , (backgroundDataIndex+1) , currentDraggedObject)
							} else if((currentDraggedDataIndex < backgroundDataIndex) || (currentDraggedParentArray !== backgroundParentArray)){
								Lyte.arrayUtils(backgroundParentArray , 'insertAt' , (backgroundDataIndex+1) , currentDraggedObject)
								Lyte.arrayUtils(currentDraggedParentArray , 'removeObjects' , currentDraggedObject)
							}
							dropObj.droppedIndex = backgroundDataIndex
						}
						_this.updateNewRowProps()
						
						dropObj.oldArray = currentDraggedParentArray
						dropObj.droppedArray = dragObj.overArray

						_this.executeMethod('onDrop' , dropObj)
					}
				}
			}

			
		}
		
		$L('.lyteTTCurrentDraggedRow').removeClass('lyteTTCurrentDraggedRow')
		_this.resetInitialVals()
		window.removeEventListener('mousemove' , _this.mouseMoveFunction)
		window.removeEventListener('mouseup' , _this.mouseUpFunction)
	},
	resetInitialVals : function(){
		Lyte.objectUtils(this.getData('initialClientVals') , 'add' , 'x' , 0)
		Lyte.objectUtils(this.getData('initialClientVals') , 'add' , 'y' , 0)
	},

	initiateIntersectionObserver: function () {
		if (this.observer) {
			this.observer.disconnect()
		}
		var _this = this
		var toFixLeft = 0;
		var parentElem = this.$node;

		var treeTableHeaader = $L(this.$node).find('lyte-tree-table-th')
		var rootMarginLeft = 0;
		var rootMarginRight = 0;
		var thresholdArr = [];
		var rootWidth = this.$node.getBoundingClientRect().width - 2;

		// Adding fixed column class and fixing left value so when scrolling it gets sticked

		var fixedColConfig = {}

		for (var i = 0; i < treeTableHeaader.length; i++) {
			if ($L(treeTableHeaader[i]).hasClass('lyteTreeFixedHeader')) {
				$L(this.$node).find(('.lyteTreeTableCol' + i)).addClass('lyteTreeFixedCol')
				if (i === 0) {
					fixLeft(treeTableHeaader[i], 0)
					fixLeft(('.lyteTreeTableCol' + i), 0)
					fixedColConfig.left = toFixLeft
					toFixLeft += treeTableHeaader[i].getBoundingClientRect().width
				} else {
					Lyte.arrayUtils(this.getData('leftInterSectionArr'), 'push', toFixLeft);
					fixLeft(treeTableHeaader[i], toFixLeft)
					fixLeft(('.lyteTreeTableCol' + i), toFixLeft)
					fixedColConfig.left = toFixLeft
					toFixLeft += treeTableHeaader[i].getBoundingClientRect().width
				}
				fixedColConfig.index = parseInt($L(treeTableHeaader[i]).attr('head-index'))
				Lyte.arrayUtils(this.getData('fixedColConfigs'), 'push', fixedColConfig)
				fixedColConfig = {}
			}
		}

		function fixLeft(node, val) {
			$L(node).css({ "left": val })
		}

		// Looping through fixed classes and creating threshold for intersection observer

		for (var i = 0; i < treeTableHeaader.length; i++) {
			if (i === 0 && $L(treeTableHeaader[i]).hasClass('lyteTreeFixedHeader') && !$L(treeTableHeaader[i]).hasClass('supportObserverNode')) {
				$L(treeTableHeaader[i + 1]).addClass('supportObserverNode')
				thresholdArr.push(1)
			} else if ($L(treeTableHeaader[i]).hasClass('supportObserverNode') && $L(treeTableHeaader[i]).hasClass('lyteTreeFixedHeader')) {
				$L(treeTableHeaader[i]).removeClass('supportObserverNode')
				$L(treeTableHeaader[i + 1]).addClass('supportObserverNode')
				thresholdArr.push(1)
			} else if ($L(treeTableHeaader[i]).hasClass('lyteTreeFixedHeader')) {
				$L(treeTableHeaader[i]).addClass('actualObserverNode')
				thresholdArr.push(.99)
			}
		}

		// Looping through fixed classes and creating rootmargin for intersection observer

		var testArr = $L(this.$node).find('lyte-tree-table-th.lyteTreeFixedHeader')
		for (var i = 0; i < testArr.length; i++) {
			var rootMarVal = ""
			if ($L(testArr[i]).hasClass('actualObserverNode')) {
				rootMarginRight = rootWidth - (rootMarginRight + testArr[i].getBoundingClientRect().width)
				rootMarVal = "0px -" + rootMarginRight + "px 0px -" + rootMarginLeft + "px";
				rootMarginLeft += testArr[i].getBoundingClientRect().width
				rootMarginRight = rootMarginLeft
			} else {
				rootMarginLeft += testArr[i].getBoundingClientRect().width
				rootMarVal = "0px 0px 0px -" + rootMarginLeft + "px";
				rootMarginRight = rootMarginLeft
			}
			Lyte.arrayUtils(this.getData('rootMarginArr'), 'push', rootMarVal)
		}

		// Intersection observer config

		var fixedCols = $L(this.$node).find('.supportObserverNode,.actualObserverNode')
		var rootMargin = this.getData('rootMarginArr')

		function interObs(rootMargin, thresholdArr, fixedCols) {
			_this.observer = new IntersectionObserver(function (entries) {

				var entry = entries[0];

				if ($L(entry.target).hasClass('supportObserverNode')) {
					var prevInd = parseInt($L(entry.target).attr('head-index')) - 1
					var prevCol = $L(parentElem).find('lyte-tree-table-th[head-index = "' + prevInd + '"]')
					var prevBodyCol = $L(parentElem).find('lyte-tree-table-td[col-index = "' + prevInd + '"]')

					if (entry.isIntersecting) {
						if ($L(parentElem).find('.headerShadow')[0]) {
							if ($L(testArr[testArr.indexOf(prevCol[0]) - 1]).hasClass('supportObserverNode') || $L(testArr[testArr.indexOf(prevCol[0]) - 1]).hasClass('actualObserverNode')) {
								$L(testArr[testArr.indexOf(prevCol[0]) - 1]).addClass('headerShadow')
								$L(_this.getColumn($L(testArr[testArr.indexOf(prevCol[0]) - 1]))).addClass('headerShadow')
							}
						}
						$L(prevCol).removeClass('headerShadow')
						$L(prevBodyCol).removeClass('headerShadow')
					} else {
						$L(parentElem).find('.headerShadow').removeClass('headerShadow')
						$L(prevCol).addClass('headerShadow')
						$L(prevBodyCol).addClass('headerShadow')
					}

				} else if ($L(entry.target).hasClass('actualObserverNode')) {
					var curInd = parseInt($L(entry.target).attr('head-index'))
					var curBodyCol = $L(parentElem).find('lyte-tree-table-td[col-index = "' + curInd + '"]')
					if (!entry.isIntersecting) {
						if ($L(parentElem).find('.headerShadow')[0]) {
							$L(testArr[testArr.indexOf(entry.target) - 1]).addClass('headerShadow')
							$L(_this.getColumn($L(testArr[testArr.indexOf(entry.target) - 1]))).addClass('headerShadow')
						}
						$L(entry.target).removeClass('headerShadow')
						$L(curBodyCol).removeClass('headerShadow')
					} else {
						$L(parentElem).find('.headerShadow').removeClass('headerShadow')
						$L(entry.target).addClass('headerShadow')
						$L(curBodyCol).addClass('headerShadow')
					}
				}

			}, {
				root: parentElem,
				rootMargin: rootMargin,
				threshold: thresholdArr
			})

			_this.observer.observe(fixedCols)
		}

		var rootMarginLen = rootMargin.length - 1

		for (var i = fixedCols.length - 1; i >= 0; i--) {
			$L(fixedCols[i]).data('intersectionIndex', i)
			interObs(rootMargin[rootMarginLen], thresholdArr[i], fixedCols[i])
			rootMarginLen--;
		}
	},

	getColumn: function (node) {
		// This function is used in intersection observer
		var headInd = parseInt($L(node).attr('head-index'))
		return $L(this.$node).find(('.lyteTreeTableCol' + headInd));
	},
	// function to call infinite scroll
	initializeInfiniteScroll: function (_this) { 
		
		let tableWrapper = $L(this.$node).find('.lyteTreeTableInfiniteWrapper');
		this.setData('infiniteScrollDisplayElem', Math.round(tableWrapper[0].getBoundingClientRect().height / this.getData('ltPropRowHeight')));

		tableWrapper.infiniteScroll({
			dataArray: this.data.ltPropData,
			populateObject: this.data.linearDataRenderObject,
			displayElem: this.data.infiniteScrollDisplayElem,
			nonTable: true,
			rowSelector: ".lyteTreeTableInfiniteTr",
			onLastSet: this.onScrollLastSet.bind(this)
		});
	},
	// function to destroy infinite scroll
	destroyInfiniteScroll: function (_this) { 
		this.setData('linearDataRenderObject', {});
		$L(".lyteTreeTableInfiniteWrapper", this.$node).infiniteScroll("destroy");
	},
	// resetting linearData treeTable at top 0 and data
	resetTreeTable: function (data) { 
		data = data || this.getData('ltPropData');
		this.destroyInfiniteScroll.call(this);
		this.setData({
			ltPropData: data,
			noResultsFound: false
		});
		this.initializeInfiniteScroll.call(this);
		$L(this.$node).find('lyte-tree-table-body')[0].scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	},
	// function to remove placeholder classes on dropend
	removePlaceholderClasses : function() {
		if($L('.lyteTTtopPlaceHolder')[0]) {
			$L('.lyteTTtopPlaceHolder').removeClass('lyteTTtopPlaceHolder');
		}
		if($L('.lyteTTchildPlaceHolder')[0]) {
			$L('.lyteTTchildPlaceHolder').removeClass('lyteTTchildPlaceHolder');
		}
		if($L('.lyteTTbottomPlaceHolder')[0]) {
			$L('.lyteTTbottomPlaceHolder').removeClass('lyteTTbottomPlaceHolder');
		}
	},
	// function to check if droppable and re-render table rows after drag and drop
	reRenderTableRows: function () {

		let data = this.getData('ltPropData');
		let dummyData = [...data];
		
		if (!this.getData('ltPropLinearDataAnimate')) {
		
			let activeRow = $L('.lyteActiveInfiniteRow')[0];
			if (!this.checkIfDroppable()) { return }
			
			if (activeRow) {
				let activeRowDataId = this.getData("linearTableIdType") === "number" ? parseInt($L(activeRow).attr('data-id')) : $L(activeRow).attr('data-id'),
					clonedRowElement = this.getData('clonedRowElement'),
					clonedRowDataId = clonedRowElement ? this.getData("linearTableIdType") === "number" ? parseInt($L(clonedRowElement).attr('data-id')) : $L(clonedRowElement).attr('data-id') : null;

				let activeRowData = this.getLinearData(activeRowDataId),
					clonedRowData = this.getLinearData(clonedRowDataId);
				
				let childrenCount = this.getChildrenCount(clonedRowData.data, true),
					totalElementCount = childrenCount + 1; // +1 for the cloned row itself
				
				if ($L(activeRow).hasClass("lyteTTtopPlaceHolder")) {
					let splicedData = dummyData.splice(clonedRowData.index, totalElementCount);
					
					Lyte.arrayUtils(data, 'removeAt', data.indexOf(clonedRowData.data), totalElementCount);
					removeFromCurrentParent.call(this);
					
					Lyte.arrayUtils(data, 'insertAt', data.indexOf(activeRowData.data), splicedData);
					appendToNewParent.call(this);

					$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();

				} else if ($L(activeRow).hasClass("lyteTTchildPlaceHolder")) {
					let splicedData = dummyData.splice(clonedRowData.index, totalElementCount);

					Lyte.arrayUtils(data, 'removeAt', data.indexOf(clonedRowData.data), totalElementCount);
					removeFromCurrentParent.call(this);

					let childrenNum = this.getChildrenCount(activeRowData.data, true)
					Lyte.arrayUtils(data, 'insertAt', (data.indexOf(activeRowData.data) + childrenNum + 1), splicedData);
					appendToActiveRow.call(this);

					$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
				} else if ($L(activeRow).hasClass("lyteTTbottomPlaceHolder")) {
					let splicedData = dummyData.splice(clonedRowData.index, totalElementCount);

					Lyte.arrayUtils(data, 'removeAt', data.indexOf(clonedRowData.data), totalElementCount);
					removeFromCurrentParent.call(this);

					let childrenNum = this.getChildrenCount(activeRowData.data, true)
					Lyte.arrayUtils(data, 'insertAt', (data.indexOf(activeRowData.data) + childrenNum + 1), splicedData);
					appendToNewParent.call(this);

					$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
				}
			}
			$L(".lyteTreeTableInfiniteWrapper")[0].scrollTo = {
				top: this.getData("lastScrollTop"),
				behavior: "smooth"
			};
		}
		// else { 

		// }

		function removeFromCurrentParent() { 
			data.find(function (item) {
				if (item.id === clonedRowData.parentId) {
					Lyte.arrayUtils(item.children, 'removeAt', item.children.indexOf(clonedRowData.data), 1);
				}
			});
		}
		function appendToNewParent() {
			data.find(function (item) {
				if (activeRowData.parentId) { 
					Lyte.objectUtils(clonedRowData.data, 'add', 'parentId', activeRowData.parentId);
					data.find(function (item) {
						if (item === activeRowData.parentData) {
							if (!item.children) {
								Lyte.objectUtils(item, 'add', 'children', []);
								Lyte.objectUtils(item, 'add', 'actionIconState', "expanded");
							} else {
								item.children.indexOf(clonedRowData.data) === -1 ? item.children.push(clonedRowData.data) : null;
							}
							return true; // Stop searching once we find the parent
						}
					});
				}
			});
		}
		function appendToActiveRow() { 
			if (activeRowData.data.id) { 
				Lyte.objectUtils(clonedRowData.data, 'add', 'parentId', activeRowData.data.id);
			}
			Lyte.objectUtils(activeRowData.data, "add", {
				"children": activeRowData.data.children || [],
				"actionIconState": "expanded"
			});
			if (activeRowData.data.children.indexOf(clonedRowData.data) === -1) {
				Lyte.arrayUtils(activeRowData.data.children, 'push', clonedRowData.data);
			}
		}

		this.setData('originalLinearCompleteData', [...data]);
	},
	// function to check if the row is droppable (parent-child relationship)
	checkIfDroppable: function () { 
		let activeRow = $L('.lyteActiveInfiniteRow')[0],
			clonedRowElement = this.getData('clonedRowElement');
		if (activeRow && clonedRowElement) {
			let activeRowData = this.getLinearData(this.getData("linearTableIdType") === "number" ? parseInt($L(activeRow).attr('data-id')) : $L(activeRow).attr('data-id')),
			clonedRowData = this.getLinearData(this.getData("linearTableIdType") === "number" ? parseInt(clonedRowElement.getAttribute('data-id')) : clonedRowElement.getAttribute('data-id'));

			let clonedRowChildrenCount = this.getChildrenCount(clonedRowData.data);
			let range = [clonedRowData.index, clonedRowData.index + clonedRowChildrenCount];
			if (activeRowData.index >= range[0] && activeRowData.index <= range[1]) {
				return false
			}
			else { 
				return true;
			}
		}
	},
	// function to collapse parent
	collapseTree: function (selectedNode) {
		let selectedNodeData = this.getLinearData(this.getData("linearTableIdType") === "number" ? parseInt($L(selectedNode).attr('data-id')) : $L(selectedNode).attr('data-id'));

		let selectedNodeChildrenCount = this.getChildrenCount(selectedNodeData.data, true);

		Lyte.arrayUtils(this.getData('ltPropData'), 'removeAt', selectedNodeData.index + 1, selectedNodeChildrenCount);
		// this.getData('ltPropData').splice(selectedNodeData.index + 1, selectedNodeChildrenCount);

		this.executeMethod('onCollapse', selectedNode);

		this.setActionStateClass($L(selectedNode).find('.lyteTreeTableRowActionButton')[0]);

		if (this.checkForInfiniteScroll.call(this)) {
			$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
		}
	},
	//function to expand parent
	expandTree: function (selectedNode) {
		let selectedNodeData = this.getLinearData(this.getData("linearTableIdType") === "number" ? parseInt($L(selectedNode).attr('data-id')) : $L(selectedNode).attr('data-id'));
		let originalData = [...this.getData('originalLinearCompleteData')];
		
		let selectedNodeChildrenCount = this.getChildrenCount(selectedNodeData.data);
		let splicedData = originalData.splice(originalData.indexOf(selectedNodeData.data) + 1, selectedNodeChildrenCount);

		splicedData = this.filterCollapsedData.call(this, splicedData, selectedNodeData);

		Lyte.arrayUtils(this.getData('ltPropData'), 'insertAt', selectedNodeData.index + 1, splicedData);

		this.executeMethod('onExpand', selectedNode);

		this.setActionStateClass($L(selectedNode).find('.lyteTreeTableRowActionButton')[0]);

		if (this.checkForInfiniteScroll.call(this)) {
			$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
		}
		this.setData('isAllCollapsed', false);
	},
	// function to filter out collapsed data from a set of original data
	filterCollapsedData: function (data, parentData) {
		if (this.getData('isAllCollapsed')) {
			let result = [];
			result = data.filter(function (item) { 
				return item.parentId === parentData.data.id;
			});
			return result;
		}

		for (let i = 0; i < data.length; i++) { 
			if (data[i].children && data[i].actionIconState === "collapsed") { 
				let childrenCount = this.getChildrenCount(data[i]);
				data.splice(i + 1, childrenCount);
			}
		}


		return data;

		// let collapsed = undefined;
		// for (let i = 0; i < data.length; collapsed ? i += data[i].children.length : i++) {
		// 	if (data[i].actionIconState === "collapsed") {
		// 		collapsed = true;
		// 		if (data[i].children && data[i].children.length > 0) {
		// 			if (data[i].parentId !== parentData.data.id) {
		// 				data.splice(i + 1, data[i].children.length);
		// 			}
		// 		} else { // expanded case
		// 		}
		// 	} else { 
		// 		collapsed = false;
		// 		data.splice(i + 1, 1);
		// 	}
		// 	// newData.push(data[i]);
		// }
		// return data;
	},
	// function to check if infinite scroll is needed depending on the data length
	checkForInfiniteScroll: function () { 
		if (this.getData("ltPropData").length > this.getData('infiniteScrollDisplayElem') && this.getData('ltPropInfiniteScroll') && !this.getData('ltPropLinearDataAnimate')) {
			this.setData('enableInfiniteScroll', true);
			this.initializeInfiniteScroll.call(this);
			return true;
		} else { 
			this.setData('enableInfiniteScroll', false);
			this.destroyInfiniteScroll.call(this);
			return false;
		}
	},
	toggleLinearTree: function (element, selectedNode) { 
		if ($L(element)[0].classList.contains('lyteTreeTableRowActionButton')) {
				let selectedNodeData = this.getLinearData(this.getData("linearTableIdType") === "number" ? parseInt($L(selectedNode).attr('data-id')) : $L(selectedNode).attr('data-id'));
				if(selectedNodeData.data.actionIconState === "expanded") {
					this.collapseTree(selectedNode)
					Lyte.objectUtils(selectedNodeData.data, 'add', 'actionIconState', "collapsed");
				} else {
					this.expandTree(selectedNode);
					Lyte.objectUtils(selectedNodeData.data, 'add', 'actionIconState', "expanded");
				}
				return;
			}
	},
	// function to expand all linear data
	expandAllLinearData: function () { 
		this.setData('ltPropData', [...this.getData('originalLinearCompleteData')]);
		this.getData('ltPropData').forEach(function (element) { 
			if (element.children && element.children.length > 0 && element.actionIconState) {
				element.actionIconState = "expanded";
			}
		})
		this.setData('noResultsFound', false);
		if (this.checkForInfiniteScroll.call(this)) {
			$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
		}
		this.setData('isAllCollapsed', true);
		this.executeMethod('onExpandAll');
	},
	// function to collapse all linear data
	collapseAllLinearData: function () {
		let data = this.getData('ltPropData'), newData = [];

		for (let i = 0; i < data.length; i) {
			let childrenCount = this.getChildrenCount(data[i], true);
			newData.push(data[i]);
			i += childrenCount + 1;
		}
		this.getData('ltPropData').forEach(function (element) { 
			if (element.children && element.children.length > 0 && element.actionIconState) {
				this.reflectOnOriginalData(element, "actionIconState", "collapsed");
				element.actionIconState = "collapsed";
			}
		}.bind(this))

		this.setData('ltPropData', newData);
		if (this.checkForInfiniteScroll.call(this)) {
			$L(".lyteTreeTableInfiniteWrapper", this.$node)[0].rePopulate();
		}
		this.setData('noResultsFound', false);
		this.setData('isAllCollapsed', true);
		this.executeMethod('onCollapseAll');
	},
	onScrollLastSet: function () { 
		if (this.getMethods('onLastSet')) { 
			return new Promise((resolve, reject) => {
				this.executeMethod('onLastSet').then(function (response){ 
					resolve(response);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	},
	reflectOnOriginalData: function (element, key, value) { 
		key = key || "actionIconState";
		Lyte.objectUtils(this.getData('originalLinearCompleteData').find(function (item) { return item.id === element.id; }), 'add', key, value);
	},
	// function to handle animation of row on drag and drop (only on ltPropLinearDataAnimate)
	animateRow: function (draggedRow, hoveredRow, event, moveUp) { 
		let _this = this;
		const container = $L(".lyteTreeTableInfiniteBody", this.$node)[0];
		const rowHeight = draggedRow.getBoundingClientRect().height;
		let appendAtLast =  false
		let draggedRowTransform, hoveredRowTransform;
		if (moveUp) {
			draggedRowTransform = `translateY(-${rowHeight}px)`;
			hoveredRowTransform = `translateY(${rowHeight}px)`;
		} else { 
			if (!hoveredRow) { 
				appendAtLast = true;
			}
			draggedRowTransform = `translateY(${rowHeight}px)`;
			hoveredRowTransform = `translateY(-${rowHeight}px)`;
		}
		draggedRow.style.transform = draggedRowTransform;
    	hoveredRow.style.transform = hoveredRowTransform;

		$L(draggedRow).removeClass("lyteTTAnimateRowDrag")
		setTimeout(function () {
			if (!appendAtLast) {
				if (!moveUp) {
					siblingRow = $L(hoveredRow).next()[0];
				} else { 
					siblingRow = hoveredRow;
				}

				$L(draggedRow).addClass('lyteTTDisabledTransition');
				$L(hoveredRow).addClass('lyteTTDisabledTransition');

				draggedRow.style.transform = `translateY(0px)`;
				hoveredRow.style.transform = `translateY(0px)`;

				container.insertBefore(draggedRow, siblingRow);
			} else { 
				draggedRow.style.transform = `translateY(0px)`;
				container.appendChild(draggedRow);
			}
			setTimeout(function () {
				$L(draggedRow).removeClass('lyteTTDisabledTransition');
				$L(hoveredRow).removeClass('lyteTTDisabledTransition');
			}, 300);
		_this.setData('enableAnimate', true);
		}, 300)

		this.reRenderTableRows();
	},
	searchData: function (searchText) { 
		if (!searchText || searchText.trim() === "") {		
			this.resetTreeTable.call(this);
			return;
		}
		const linearTree = $L.objectSearch({
			dataArray: this.getData('originalLinearCompleteData'),
			linearData: true,
			key: this.getData('ltPropSearchKey'),
			value: searchText
		});
		let flattenedTreeData = this.flattenNestedObjects(linearTree);
		flattenedTreeData.forEach(function (element) {
			// element.level = this.setIntendLevel(element);
			element.level = element.index.length - 1; // Assuming index is an array of indices representing the path
		}, this);
		
		if (flattenedTreeData.length === 0) {
			this.setData({
				ltPropData: [],
				noResultsFound: true
				});
		} else {
			this.resetTreeTable.call(this, flattenedTreeData);

		}
	},
	setActionStateClass: function (element, listValue) {
		if (listValue) {
			if(listValue.children && listValue.children.length > 0) {
				$L(element).attr('style', `--tree-level:${this.setIntendLevel(listValue)};`);
				if (listValue.actionIconState === 'expanded') {
					$L(element).addClass('lyteTreeTableCollapseButton');
					$L(element).removeClass('lyteTreeTableExpandButton');
				} else {
					$L(element).addClass('lyteTreeTableExpandButton');
					$L(element).removeClass('lyteTreeTableCollapseButton');
				}
			} else {
				$L(element).removeClass('lyteTreeTableExpandButton');
				$L(element).removeClass('lyteTreeTableCollapseButton');
				$L(element).attr('style', `--tree-level:${this.setIntendLevel(listValue)}; visibility: hidden`);
			}
		} else {
			if ($L(element).hasClass('lyteTreeTableExpandButton')) {
				$L(element).removeClass('lyteTreeTableExpandButton');
				$L(element).addClass('lyteTreeTableCollapseButton');
			} else {
				$L(element).removeClass('lyteTreeTableCollapseButton');
				$L(element).addClass('lyteTreeTableExpandButton');
			}
		}
	},
	reRenderActionClass: function (element) { 
		this.getData('ltPropData').forEach(function (value) {
			let listValue = this.getLinearData(this.getData("linearTableIdType") === "number" ?
							parseInt($L(element).closest('lyte-tree-table-infinite-tr').attr('data-id')) :
							$L(element).closest('lyte-tree-table-infinite-tr').attr('data-id')).data;	
			
			this.setActionStateClass(element, value);
		}.bind(this))

	},
	methods: {
		onToggle: function () { },
		onToggleEnd: function () { },
		onBeforeOpen: function () { },
		onOpen: function () { },
		onBeforeClose: function () { },
		onClose: function () { },
		onDragStart: function () { },
		onDrag: function () { },
		onDragEnd: function () { },
		onBeforeDrop: function () { },
		onDrop: function () { },
		onExpand: function () { },
		onCollapse: function () { },
		onExpandAll: function () { },
		onCollapseAll: function () { },
		onSelect: function () { }
	},
	actions: {
		toggleTree: function (th) {
			if ($L(th).hasClass('lyteTreeTableClosed')) {
				$L(th).removeClass('lyteTreeTableClosed')
				$L(th).addClass('lyteTreeTableOpened')
				$L(th).closest('.lyteTreeTableRow').addClass('lyteTreeTableOpenedRow')
				$L(th).closest('.lyteTreeTableRow').removeClass('lyteTreeTableClosedRow')
				this.updateNewRowProps();
			} else if ($L(th).hasClass('lyteTreeTableOpened')) {
				$L(th).closest('.lyteTreeTableRow').removeClass('lyteTreeTableOpenedRow')
				$L(th).closest('.lyteTreeTableRow').addClass('lyteTreeTableClosedRow')
				$L(th).removeClass('lyteTreeTableOpened')
				$L(th).addClass('lyteTreeTableClosed')
				this.updateNewRowProps();
			}
		},
		// action to focus table row
		focusTableRow: function (event, comp) { 
			if (!this.getData("clonedRowElement")) { 
				$L(comp).addClass('lyteActiveInfiniteRow');
			}
		},
		// action to blur table row
		blurTableRow: function (event, comp) {
			if (!this.getData("clonedRowElement")) { 
				$L(comp).removeClass('lyteActiveInfiniteRow');
			}
		},
		// action to clone table row on mouseDown
		cloneTableRow: function (event, selectedNode) { 
			if (event.target.classList.contains('lyteTreeTableRowActionButton')) {
				return;
			}
			this.executeMethod('onSelect', selectedNode);
			let body = document.querySelector('body'),
				container = $L(".lyteTreeTableInfiniteBody", this.$node)[0];
			let containerRect = container.getBoundingClientRect(),
				selectedNodeBCR = selectedNode.getBoundingClientRect();

			let clonedNode = selectedNode.cloneNode(true);
			
			if ($L(clonedNode).find(".lyteTreeTableCollapseButton")[0]) {
				$L(clonedNode).find(".lyteTreeTableCollapseButton")[0].remove();
			}
			
			$L(selectedNode).addClass('lyteTreeTableSelectedRow');
			this.setData("clonedRowElement", clonedNode);
			clonedNode.classList.add('lyteTreeTableClonedRow');
			
			if (this.getData('ltPropLinearDataAnimate')) {

				let clickDifference = Math.abs(event.clientY - selectedNodeBCR.top);
				
				$L(clonedNode).css({
					top: event.clientY - clickDifference + 'px',
					left: containerRect.left + 'px',
					width: containerRect.width + 'px'
				});

				this.setData({
					clonedRowClickDifference: clickDifference,
					selectedRowForAnimate: selectedNode,
					lastMouseDownEventforAnimate: event
				});
			} else {
				$L(clonedNode).css({
					top: event.clientY + 'px',
					left: event.clientX + 'px',
					width: containerRect.width + 'px'
				});
			}
			
			body.appendChild(clonedNode)
			body.addEventListener("mousemove", this.moveClonedNode);
			body.addEventListener("mouseup", this.removeClonedNode);
		}
	},
	// function to reset the intend level of each row after rerendering
	resetIntendLevel: function () { 
		let data = this.getData('ltPropData');
		data.forEach(function (element) {
			element.level = this.setIntendLevel(element);
		}, this);
		this.setData('ltPropData', data);
	},
	// function to move the cloned node on mouse move and to track mouse position for ltPropLinearDataAnimate case
	moveClonedNode: function (event) {
		var _this = $L(event.target).closest('lyte-tree-table')[0].component;
		let hoveredRow = $L(event.target).closest('.lyteTreeTableInfiniteTr')[0],
			activeRow = $L('.lyteActiveInfiniteRow')[0];
		let lastActiveRow = _this.getData('lastActiveRow');

		if (!_this.getData('ltPropLinearDataAnimate')) {
			if (hoveredRow !== lastActiveRow) {
				if (lastActiveRow) {
					$L(lastActiveRow).removeClass('lyteActiveInfiniteRow');
					_this.removePlaceholderClasses();
				}
				if (hoveredRow) {
					$L(hoveredRow).addClass('lyteActiveInfiniteRow');
				}
				activeRow = hoveredRow;
			}
			if (hoveredRow) {
				let hoveredRowBCR = hoveredRow.getBoundingClientRect();
				if (event.clientY > hoveredRowBCR.top && event.clientY < hoveredRowBCR.bottom && event.clientX > hoveredRowBCR.left && event.clientX < hoveredRowBCR.right) {
					if (event.clientY < (hoveredRowBCR.top + hoveredRowBCR.height * 0.25)) {
						if ($L('.lyteTTchildPlaceHolder')[0]) {
							$L('.lyteTTchildPlaceHolder').removeClass("lyteTTchildPlaceHolder")
						} if ($L('.lyteTTbottomPlaceHolder')[0]) {
							$L('.lyteTTbottomPlaceHolder').removeClass("lyteTTbottomPlaceHolder")
						}
						$L(hoveredRow).addClass('lyteTTtopPlaceHolder');
					} else if (event.clientY > (hoveredRowBCR.top + hoveredRowBCR.height * 0.25) && event.clientY < (hoveredRowBCR.top + hoveredRowBCR.height * 0.75)) {
						if ($L('.lyteTTtopPlaceHolder')[0]) {
							$L('.lyteTTtopPlaceHolder').removeClass("lyteTTtopPlaceHolder")
						}
						if ($L('.lyteTTbottomPlaceHolder')[0]) {
							$L('.lyteTTbottomPlaceHolder').removeClass("lyteTTbottomPlaceHolder")
						}
						$L(hoveredRow).addClass('lyteTTchildPlaceHolder');
					}
					else if (event.clientY > (hoveredRowBCR.top + hoveredRowBCR.height * 0.75)) {
						if ($L('.lyteTTtopPlaceHolder')[0]) {
							$L('.lyteTTtopPlaceHolder').removeClass("lyteTTtopPlaceHolder")
						} if ($L('.lyteTTchildPlaceHolder')[0]) {
							$L('.lyteTTchildPlaceHolder').removeClass("lyteTTchildPlaceHolder")
						}
						$L(hoveredRow).addClass('lyteTTbottomPlaceHolder');
					}
				}
			}
			_this.setData('lastActiveRow', activeRow);

			const clonedNode = document.querySelector('.lyteTreeTableClonedRow');
			if (clonedNode) {
				clonedNode.style.top = event.clientY + 'px';
				clonedNode.style.left = event.clientX + 'px';
			}
		} else { 
			const container = $L(".lyteTreeTableInfiniteWrapper", _this.$node)[0];
			const containerRect = container.getBoundingClientRect();
			const clonedNode = document.querySelector('.lyteTreeTableClonedRow');
			const clonedNodeBCR = clonedNode.getBoundingClientRect();	
			if (clonedNode) {
				let clickDifference = _this.getData('clonedRowClickDifference');
				clonedNode.style.top = Math.min(Math.max(containerRect.top , event.clientY - clickDifference), containerRect.bottom - clonedNodeBCR.height) + 'px';
			}

			let selectedNode = _this.getData('selectedRowForAnimate'),
				nextsiblingRow = $L(selectedNode).next()[0] ? $L(selectedNode).next()[0] : null,
				prevSiblingRow = $L(selectedNode).prev()[0] ? $L(selectedNode).prev()[0] : null;
			
			if (clonedNode && (prevSiblingRow || nextsiblingRow)) {
				
				let prevSiblingRowBCR = prevSiblingRow ? prevSiblingRow.getBoundingClientRect() : undefined;
				let nextSiblingRowBCR = nextsiblingRow ? nextsiblingRow.getBoundingClientRect() : undefined;

				let lastMouseDownEvent = _this.getData('lastMouseDownEventforAnimate'),
					difference = event.clientY - lastMouseDownEvent.clientY;
				
				if (_this.getData('enableAnimate')) {
					if (difference < 0 && prevSiblingRow) {
						let normalLimit = prevSiblingRowBCR.top + (prevSiblingRowBCR.height * 0.6);
						let lowerLimit = prevSiblingRowBCR.top + (prevSiblingRowBCR.height * 0.15);
						let upperLimit = prevSiblingRowBCR.top + (prevSiblingRowBCR.height * 0);
						let timeoutId;
						
						// if (clonedNodeBCR.top < lowerLimit && clonedNodeBCR.top > upperLimit) {
						// 	console.log("there")
						// 	// this.animateRowAsChild(selectedNode, prevSiblingRow, event);
						// 	_this.setData({ enableAnimate: false });
						// 	clearTimeout(timeoutId);
						// }
						// timeoutId = setTimeout(function () {
							if (clonedNodeBCR.top < normalLimit && _this.getData('enableAnimate')) {
								_this.animateRow(selectedNode, prevSiblingRow, event, true);
								_this.setData({ enableAnimate: false });
							}
						// }, 300);
					} else if (difference > 0 && nextsiblingRow) { 
						let normalLimit = nextSiblingRowBCR.top + (nextSiblingRowBCR.height * 0.4);
						let lowerLimit = nextSiblingRowBCR.top + (nextSiblingRowBCR.height * 0.85);
						let upperLimit = nextSiblingRowBCR.top + (nextSiblingRowBCR.height * 1);
						let timeoutId;
						
						// if(clonedNodeBCR.bottom > lowerLimit && clonedNodeBCR.bottom < upperLimit) {
						// 	// this.animateRowAsChild(selectedNode, nextsiblingRow, event);
						// 	console.log("here")
						// 	_this.setData({ enableAnimate: false });
						// 	clearTimeout(timeoutId);
						// } 
						// timeoutId = setTimeout(function () {
							if (clonedNodeBCR.bottom > normalLimit && _this.getData('enableAnimate')) {
								_this.animateRow(selectedNode, nextsiblingRow, event);
								_this.setData({ enableAnimate: false });
							}
						// }, 300);
					}
				}
			}
			setTimeout(function () {
				_this.setData('lastMouseDownEventforAnimate', event);
			}, 50)
		}
	},
	// function to remove the cloned node on mouse up and re-render the table rows
	removeClonedNode: function (event) {
		var _this = $L(event.target).closest('lyte-tree-table')[0].component;
		let clonedNode = document.querySelector('.lyteTreeTableClonedRow'),
			body = document.querySelector('body');
		
		// if (!_this.getData('lastActiveRow') || $L(".lyteActiveInfiniteRow").attr("data-id") === $L(clonedNode).attr("data-id")) {
		// 	$L('.lyteTreeTableSelectedRow').removeClass('lyteTreeTableSelectedRow');
		// } else {
		// 	_this.setData("lastScrollTop", $L(_this.$node).find('.lyteTreeTableInfiniteWrapper')[0].scrollTop);
		// 	_this.reRenderTableRows();
		// }
		if ($L('.lyteTreeTableSelectedRow')[0]) {
			$L('.lyteTreeTableSelectedRow').removeClass('lyteTreeTableSelectedRow');
		}
		
		if (!_this.getData('ltPropLinearDataAnimate')) {
			_this.setData("lastScrollTop", $L(_this.$node).find('.lyteTreeTableInfiniteWrapper')[0].scrollTop);
			_this.reRenderTableRows();
		} else {
			let selectedNode = _this.getData('selectedRowForAnimate');
			let selectedNodeData = _this.getLinearData(_this.getData("linearTableIdType") === "number" ? parseInt($L(selectedNode).attr('data-id')) : $L(selectedNode).attr('data-id'));
			if ($L(selectedNode).hasClass('lyteTTAnimateRowDrag')) { 
				$L(selectedNode).css({
					transform: `translateY(0px)`
				});
				$L(selectedNode).removeClass('lyteTTAnimateRowDrag');
			}
			_this.setData({
				selectedRowData: selectedNodeData,
				selectedRowForAnimate: null,
				lastMouseDownEventforAnimate: {}
			});
		}

		_this.removePlaceholderClasses();
		if (clonedNode) {
			clonedNode.remove();
			_this.setData("clonedRowElement", null);
		}
		body.removeEventListener("mousemove", _this.moveClonedNode);
		body.removeEventListener("mouseup", _this.removeClonedNode);
	},
	// function to flatten nested objects in the tree data
	flattenNestedObjects: function (data) {
		const result = [];
		function recurse(nodes, parentNode, path = []) {
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				// Push a shallow copy without children
				// node.index = [...path, i];
				if (parentNode) { 
					// node.parent = parentNode;
					node.parentId = parentNode.id;
				}
				result.push(node);
	  
				// Recurse if there are children
				if (node.children && Array.isArray(node.children)) {
					recurse(node.children, node, node.index);
				}
		  	}
		}
	  
		recurse(data);
		return result;
	},
	// function to set the intend level of each row based on its parent-child relationship
	setIntendLevel: function (data) { 
		let allData = this.getData().ltPropData;

			function getLevel(data) {
				if (!data || !data.parentId) {
					return 0;
				}
				const parent = allData.find(obj => obj.id === data.parentId);
				return 1 + getLevel(parent);
			}

			const level = getLevel(data);
			
			return level;
	},
	// function to get a specific linear data based on id
	getLinearData: function (id) { 
		let data = this.getData('ltPropData');
		let returnObj = {}
	
		returnObj.data = data.find(function (item) { return item.id === id; });
		returnObj.index = data.indexOf(returnObj.data);
		returnObj.parentId = returnObj.data.parentId ? returnObj.data.parentId: undefined;
		if (returnObj.parentId) { 
			returnObj.parentData = data.find(function (item) { return item.id === returnObj.parentId; });
			returnObj.parentIndex = data.indexOf(returnObj.parentData)
		}
		return returnObj;
	},
	// function to get the count of children for a specific data object with an option to consider collapsed state
	getChildrenCount: function (data, considerCollapsed) { 
		let count = 0;
		if(considerCollapsed && data.actionIconState === "collapsed") {
			return 0;
		}
		if (data.children && Array.isArray(data.children)) {
			count += data.children.length;
			data.children.forEach(child => {
				count += this.getChildrenCount(child, considerCollapsed);
			});
		}
		return count;
	},
	getTreeData: function (dataIndex) {
		// Gives the array data of the element selected or passed to the function

		var indArr = dataIndex.split(" ")
		var treeData = this.getData('ltPropData')

		for (var i = 0; i < indArr.length - 1; i++) {
			treeData = treeData[parseInt(indArr[i])].children
		}

		return treeData

	},
	getTreeObj: function (dataIndex) {
		// Gives the object data of the element selected or passed to the function

		var indArr = dataIndex.split(" ")
		var treeData = this.getData('ltPropData')

		for (var i = 0; i < indArr.length - 1; i++) {
			treeData = treeData[parseInt(indArr[i])].children
		}

		return treeData[indArr[indArr.length - 1]]

	},
	getTreeIndex : function(dataIndex){
		var dataIndexArr = dataIndex.split(' ')
		return dataIndexArr[dataIndexArr.length-1];
	},
	isOverChild : function(holdIndex , hoverIndex){
		const array = hoverIndex.split(' ');
		const startIndex = holdIndex.split(' ').length;
		const endIndex = hoverIndex.split(' ').length - holdIndex.split(' ').length
		var newDataIndexArr = array.splice(startIndex, endIndex);
		var newDataIndex = array.join(' ').trim()
		if(newDataIndex === holdIndex){
			return true
		}
		return false
	},

	_dataChangeObserver: function () {
		this.updateNewRowProps()
	}.observes('ltPropData.[]', 'ltPropData'),
	// Helpers work from component 

	objectObserver: function (change) { 
		this.getData('ltPropData').forEach(function (value) {
			let actionIcon = $L(this.$node).find('lyte-tree-table-infinite-tr[data-id=' + value.id + ']')
							 .find('lyte-tree-table-infinite-tr .lyteTreeTableRowActionButton')
			
			this.setActionStateClass(actionIcon, value);
		}.bind(this))
	}.observes('linearDataRenderObject.*'),
	updateNewRowProps: function () {

		var asTreeNode = $L(this.$node).find('lyte-tree-table-th[asTree]')

		// setting class to column that acts as tree

		if (asTreeNode[0]) {
			var headIndex = parseInt(asTreeNode.attr('head-index'))
			this.setData('asTreeIndex', headIndex)
			$L(this.$node).find("lyte-tree-table-td[col-index='" + headIndex + "']").addClass('lyteTableTreeCol')
		}

		var fixedColConfig = this.getData('fixedColConfigs')
		for (var i = 0; i < fixedColConfig.length; i++) {
			$L(this.$node).find('lyte-tree-table-td[col-index="' + fixedColConfig[i].index + '"]').addClass('lyteTreeFixedCol')
			$L(this.$node).find('lyte-tree-table-td[col-index="' + fixedColConfig[i].index + '"]').css({ "left": fixedColConfig[i].left })
		}

		this.initiateIntersectionObserver();
	},

	didDestroy: function () {
		if (this.observer) {
			this.observer.disconnect()
		}
	}

});

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-table-icon']) {
	_lyteUiUtils.registeredCustomElements['lyte-tree-table-icon'] = true;
	Lyte.createCustomElement("lyte-tree-table-icon", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return [];
				}
			}
		},

		"connectedCallback": function () {

		},

		constructor: function () {

			this.addEventListener('click', function (eve) {

				var currentRow = $L(this).closest('.lyteTreeTableRow')
				var currenttreeTable = $L(this).closest('lyte-tree-table')[0]

				var currentLevel = parseInt(currentRow.attr('data-level'))
				var nextLevel = currentLevel + 1
				var currentDataIndex = currentRow.attr('data-index')

				if ((currenttreeTable.component.getTreeObj(currentDataIndex).collapsed === false) || (currenttreeTable.component.getTreeObj(currentDataIndex).collapsed === undefined)) {

					if ((currenttreeTable.component.getTreeObj(currentDataIndex).hasChild === true) && currentRow.hasClass('lyteTreeTableClosedRow')) {
						openTree()
					} else {
						closeTree()
					}

				} else if ((currenttreeTable.component.getTreeObj(currentDataIndex).collapsed)) {

					openTree()

				}

				function openTree() {

					function openFun(){
						if ((onBeforeCloseRet !== false) && ( onToggle !== false)) {
							Lyte.objectUtils(currenttreeTable.component.getTreeObj(currentDataIndex), 'add', 'collapsed', false)
							currenttreeTable.component.executeMethod('onOpen')
							currenttreeTable.component.executeMethod('onToggleEnd', true, currenttreeTable.component.getTreeObj(currentRow.attr('data-index')), eve, currentRow[0])
							currentRow.addClass('lyteTreeTableOpenedRow')
							currentRow.removeClass('lyteTreeTableClosedRow')
						}
						currenttreeTable.component.updateNewRowProps()
					}

					var onBeforeCloseRet = currenttreeTable.component.executeMethod('onBeforeOpen',
						currenttreeTable.component.getTreeObj(currentRow.attr('data-index'))     // First Arg the current clicked data obj
					)

					var onToggle = currenttreeTable.component.executeMethod('onToggle', true, currenttreeTable.component.getTreeObj(currentRow.attr('data-index')), eve, currentRow[0])
					if (onBeforeCloseRet && onBeforeCloseRet.then) {
						onBeforeCloseRet.then(function (arg) {
							openFun()
						}, function () { });
					} else if(onToggle && onToggle.then){
						onToggle.then(function (arg) {
							openFun()
						}, function () { });
					} else {
						openFun()
					}
					
				}

				function closeTree() {
					if ((currenttreeTable.component.executeMethod('onBeforeClose',
						currenttreeTable.component.getTreeObj(currentRow.attr('data-index'))) !== false) && (currenttreeTable.component.executeMethod('onToggle', false, currenttreeTable.component.getTreeObj(currentRow.attr('data-index')), eve, currentRow[0]) !== false)) {
						Lyte.objectUtils(currenttreeTable.component.getTreeObj(currentDataIndex), 'add', 'collapsed', true)

						currenttreeTable.component.executeMethod('onClose')
						currenttreeTable.component.executeMethod('onToggleEnd', false, currenttreeTable.component.getTreeObj(currentRow.attr('data-index')), eve, currentRow[0])
						currentRow.removeClass('lyteTreeTableOpenedRow')
						currentRow.addClass('lyteTreeTableClosedRow')
					}
					currenttreeTable.component.updateNewRowProps()
				}

			})

		}
	})
}

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-table-tr']) {
	_lyteUiUtils.registeredCustomElements['lyte-tree-table-tr'] = true;
	Lyte.createCustomElement("lyte-tree-table-tr", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return [];
				}
			}
		},

		"connectedCallback": function () {

		},

		constructor: function () {

		}
	})
}

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-table-th']) {
	_lyteUiUtils.registeredCustomElements['lyte-tree-table-th'] = true;
	Lyte.createCustomElement("lyte-tree-table-th", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return [];
				}
			}
		},

		"connectedCallback": function () {

		},

		constructor: function () {
			var currYield = $L(this).closest('lyte-yield')
			var currInd = currYield.find('lyte-tree-table-th').indexOf(this);
			$L(this).attr("head-index", currInd)
			$L(this).addClass('lyteTreeTableHead' + currInd)
			if ($L(this)[0].hasAttribute('fixed')) {
				$L(this).addClass('lyteTreeFixedHeader')
			}
		}
	})
}

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-table-td']) {
	_lyteUiUtils.registeredCustomElements['lyte-tree-table-td'] = true;
	Lyte.createCustomElement("lyte-tree-table-td", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return [];
				}
			}
		},

		"connectedCallback": function () {

		},

		constructor: function () {

			var currentRow = $L(this).closest('.lyteTreeTableRow')
			var currenttreeTable = $L(this).closest('lyte-tree-table')[0]

			if (currenttreeTable.component.getData("ltPropLinearTable")) { 
				$L(this).addClass('lyteTreeTableLinearCol')
			}
			
			var currYield = $L(this).closest('lyte-yield')
			var currInd = currYield.find('lyte-tree-table-td').indexOf(this);
			$L(this).addClass('lyteTreeTableCol' + currInd)
			$L(this).attr("col-index", currInd)
		}
	})
}

if (!_lyteUiUtils.registeredCustomElements['lyte-linear-tree-table-icon']) {
	_lyteUiUtils.registeredCustomElements['lyte-linear-tree-table-icon'] = true;
	Lyte.createCustomElement("lyte-linear-tree-table-icon", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return ["class"];
				}
			}
		},

		"connectedCallback": function () {
		},
		"attributeChangedCallback": function () { 
			let treeTableComp = this.closest('lyte-tree-table').component;
			// treeTableComp.reRenderActionClass(this);
			// console.log(treeTableComp);
			
		},

		constructor: function () {
			$L(this).addClass('lyteTreeTableRowActionButton');

			let treeTableComp = this.closest('lyte-tree-table').component;
			let listValue = treeTableComp.getLinearData(treeTableComp.getData("linearTableIdType") === "number" ?
							parseInt($L(this).closest('lyte-tree-table-infinite-tr').attr('data-id')) :
							$L(this).closest('lyte-tree-table-infinite-tr').attr('data-id')).data;
			
			treeTableComp.setActionStateClass(this, listValue);
			
			this.addEventListener('click', function (eve) {
				treeTableComp.toggleLinearTree($L(this), this.closest('lyte-tree-table-infinite-tr'));
			})

		}
	})
}

Lyte.Component.registerHelper('setIntendLevel', function (dataObj) { 
	let data = dataObj ? (dataObj.data ? dataObj.data : dataObj) : undefined;
	let allData = this.getData().ltPropData;

	function getLevel(data) {
		if (!data || !data.parentId) {
			return 0;
		}
		const parent = allData.find(obj => obj.id === data.parentId);
		return 1 + getLevel(parent);
	}

	const level = data ? getLevel(data) : 0;

	return level;

})
