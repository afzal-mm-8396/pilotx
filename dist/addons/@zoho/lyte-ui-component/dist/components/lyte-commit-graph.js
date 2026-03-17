Lyte.Component.register("lyte-commit-graph", {
_template:"<template tag-name=\"lyte-commit-graph\" lyte-commit-graph=\"\"> <div class=\"lyteCommitGraphWrapper\"> <div class=\"lyteCommitGraphDummyTargetsTop\"> <template is=\"for\" items=\"{{dummyNodeCount}}\" item=\"item\" index=\"index\"> <div class=\"lyteCommitGraphLinkDummyWrapTop\" style=\"--dummy-node-left:{{index}}\"> <div id=\"lyteCommitGraphDummyTargetTop_{{index}}\" class=\"lyteCommitGraphDummyLinkTop\" connect-intent-level=\"{{index}}\"></div> </div> </template> </div> <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"lyteConnectionMarker lyteCommitGraphSvg\"> <defs> <marker id=\"lyteConnectionHeadMarker\" markerUnits=\"strokeWidth\" markerWidth=\"12\" markerHeight=\"12\" refX=\"6\" refY=\"6\" orient=\"auto\"> <ellipse cx=\"6\" cy=\"6\" rx=\"2\" ry=\"2\"></ellipse> </marker> <marker id=\"lyteConnectionTailMarker\" markerUnits=\"strokeWidth\" markerWidth=\"12\" markerHeight=\"12\" refX=\"6\" refY=\"3\" orient=\"auto\"> <path d=\"M 6 3 L 0 6 0 0 z\"></path> </marker> </defs> </svg> <div class=\"lyteCommitsWrapper\"> <div class=\"lyteCommitGraphCommits\"> <template is=\"forIn\" object=\"{{graphRenderObject}}\" value=\"item\" key=\"key\"> <div class=\"lyteCommitGraphCard\" id=\"lyteCommitLi_{{item.data.sha}}\"> <div class=\"lyteCommitGraphLiWrapper\" style=\"--padding-var:{{lyteCommitGraphLevelHelp(item.data,item.index,this)}}\" onclick=\"{{action('onItemClicked',this,item.data)}}\" oncontextmenu=\"{{action('onItemRightClicked',this,item.data)}}\"> <div class=\"lyteCommitGraphLinkWrap {{lyteCommitGraphClassHelper(item.data,this)}}\"> <div id=\"lmg_{{item.data.sha}}\" class=\"lyteCommitGraphLink\"></div> </div> <div class=\"lyteCommitGraphDetailsWrap\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"commit\" item-value=\"{{item.data}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteCommitGraphLiMessage\"> <p class=\"lyteCommitGraphLiMessageP\">{{item.data.commit}}</p> </div> <div class=\"lyteCommitGraphLiMoreDets\"> <div class=\"lyteCommitGraphLiAuthor\"> {{item.data.authorName}} </div> <template is=\"if\" value=\"{{lyteCommitGraphHasBranchHelper(item.data.branch)}}\"><template case=\"true\"> <div class=\"lyteCommitGraphLiBranch\"> <template is=\"if\" value=\"{{expHandlers(item.data.branch.head,'&amp;&amp;',expHandlers(item.data.branch.head,'!==',''))}}\"><template case=\"true\"> <span class=\"lyteCommitGraphHead\">{{item.data.branch.head}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(item.data.branch.tags,'&amp;&amp;',expHandlers(item.data.branch.tags,'!==',''))}}\"><template case=\"true\"> <span class=\"lyteCommitGraphTag\">tag/{{item.data.branch.tags}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(item.data.branch.origin,'&amp;&amp;',expHandlers(item.data.branch.origin,'!==',''))}}\"><template case=\"true\"> <span class=\"lyteCommitGraphOrigin\">origin/{{item.data.branch.origin}}</span> </template></template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{ltPropShowDate}}\"><template case=\"true\"><div class=\"lyteCommitGraphLiDate\"> {{lyteCommitGraphDayHelper(item.data.day)}} </div></template><template case=\"false\"><div class=\"lyteCommitGraphLiDate\"> {{item.data.relativeTime}} </div></template></template> </template></template> </div> </template></template> </div> </div> </div> </template> </div> </div> <div class=\"lyteCommitGraphDummyTargets\"> <template is=\"for\" items=\"{{dummyNodeCount}}\" item=\"item\" index=\"index\"> <div class=\"lyteCommitGraphLinkDummyWrap\" style=\"--dummy-node-left:{{index}}\"> <div id=\"lyteCommitGraphDummyTarget_{{index}}\" class=\"lyteCommitGraphDummyLink\" connect-intent-level=\"{{index}}\"></div> </div> </template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--dummy-node-left:'","index"]}}}},{"type":"attr","position":[1,1]}]},{"type":"attr","position":[1,5,1,1]},{"type":"forIn","position":[1,5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--padding-var:'",{"type":"helper","value":{"name":"lyteCommitGraphLevelHelp","args":["item.data","item.index","this"]}}]}}}},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[3,1,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[1,7,1]},{"type":"for","position":[1,7,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--dummy-node-left:'","index"]}}}},{"type":"attr","position":[1,1]}]}],
_observedAttributes :["ltPropData","ltPropLatestCommit","ltPropYield","ltPropCommitCardHeight","ltPropShowDate","ltPropDataUpdateIndex","graphRenderObject","previousIndex","availableSlots","dummyNodeCount","connectionCreated","toRemoveLater","scrollDirection","scrollInitiatedFlag","previousScrollUpdateIndex"],
_observedAttributesType :["array","object","boolean","number","boolean","number","object","number","array","array","boolean","string","string","boolean","number"],

	data : function(){
		return {
			ltPropData : Lyte.attr('array' , {
				default : []
			}),
			ltPropLatestCommit : Lyte.attr('object' , {
				default : {}
			}),
			ltPropYield : Lyte.attr('boolean' , {
				default : false
			}),
			ltPropCommitCardHeight : Lyte.attr('number' , {
				default : 50
			}),
			ltPropShowDate : Lyte.attr('boolean' , {
				default : true
			}),
			ltPropDataUpdateIndex : Lyte.attr('number' , {
				default : 100
			}),
			graphRenderObject : Lyte.attr('object' , {
				default : {}
			}),
			previousIndex : Lyte.attr('number' , {
				default : -1
			}),

			availableSlots : Lyte.attr('array' , {
				default : ['available']
			}),
			
			dummyNodeCount : Lyte.attr('array' , {
				default : ['Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy',
				'Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy','Dummy']
			}),
			
			connectionCreated : Lyte.attr('boolean' , {
				default : false
			}),

			toRemoveLater : Lyte.attr('string' , {
				default : ''
			}),
			scrollDirection : Lyte.attr('string' , {
				default :''
			}),
			scrollInitiatedFlag : Lyte.attr('boolean' , {
				default : false
			}),
			previousScrollUpdateIndex : Lyte.attr('number' , {
				default : 1
			})

		}		
	},
	init : function(){
		this.$node.reRender = function(){
			var _this = this.component;
			$L(_this.$node).find('.lyteCommitGraphCommits').infiniteScroll('destroy')
			_this.resetDefault();
		}
	},
	resetDefault : function(){
		$L(this.$node).find( '.lyteCommitsWrapper' ).connection('destroy')
		this.setData( 'graphRenderObject' , {} )
		this.setData( 'availableSlots' , [] )
		this.setData( 'previousIndex' , -1 )
		this.setData( 'connectionCreated' , false )
		this.setData( 'toRemoveLater' , '' )
		this.setData( 'scrollDirection' , '' )
	},
	didConnect : function(){
		
		if((this.getData('ltPropData').length > 0) && !this.getData('scrollInitiatedFlag')){
			this.initiateScroll()
			this.setData('scrollInitiatedFlag' , true)
		}
		this.$node.initiateGraph = function(){
			this.component.initiateScroll()
		}
		// $L(this.$node).find('.lyteCommitGraphCommits').scroll()
	},
	dataUpdated : function(){
		if((this.getData('ltPropData').length > 0) && !this.getData('scrollInitiatedFlag')){
			this.initiateScroll()
			this.setData('scrollInitiatedFlag' , true)
		}
	}.observes('ltPropData'),
	initiateScroll : function(){
		var _this = this

		if(this.getData('ltPropLatestCommit').sha){
			Lyte.arrayUtils(this.getData().availableSlots , 'insertAt' , 0 , this.getData('ltPropLatestCommit').sha)
		}

		var cardWrapperElem = $L(this.$node).find('.lyteCommitGraphCommits')[0] 

		var elemCount = Math.ceil(cardWrapperElem.getBoundingClientRect().height / this.getData('ltPropCommitCardHeight')) + 4

		$L(this.$node).find('.lyteCommitGraphCommits').infiniteScroll({
			dataArray : this.data.ltPropData,
			populateObject : this.data.graphRenderObject,
			nonTable : true,
			displayElem : elemCount,
			rowSelector : '.lyteCommitGraphCard',
			ignoreRow : '.lyteCommitGraphSvg',
			onObjectUpdate : async function(data){
				var prevIndex = _this.getData().previousScrollUpdateIndex
				if(data.dataArrayIndex === prevIndex * _this.getData('ltPropDataUpdateIndex')){
					if(_this.getMethods('onScrollEnd')){
						var data = _this.getData()
						var retVal = await _this.executeMethod('onScrollEnd' , data.ltPropData , data.ltPropLatestCommit)
						if(retVal !== false){
							$L(_this.$node).find('.lyteCommitGraphCommits')[0].rePopulate()
							_this.setData('previousScrollUpdateIndex' , _this.getData('previousScrollUpdateIndex') + 1)
						} else {
							return
						}
					}
				}
			},
			onScrollReset : function(){
				_this.setData('scrollDirection' , 'scrollDown')
			},
			onBeforeUpdate : function(obj){

				var nodeToBeMoved = obj.node
				var direction = obj.scrollDirection
				switch(direction){
					case 'scrollDown':
						// var commitCard = $L(('.'+nodeToBeMoved))

						var commitCard = $L(nodeToBeMoved)
						var _this = commitCard.closest('lyte-commit-graph')[0].component
						var graphLinkNode = commitCard.find('.lyteCommitGraphLinkWrap')[0]

						$L(_this.$node).find(('#lyteCommitGraphDummyTargetTop_'+commitCard.data().intentLevel)).attr('source' , commitCard.data().itemValue.sha)

						var intentLevel = commitCard.data().intentLevel
						var connections = $L(_this.$node).find('.lyteCommitsWrapper').connection( 'getConnections', $L(graphLinkNode).find('.lyteCommitGraphLink')[0] )
						var sourceFor = connections.src
						var targetFor = connections.target
						if(targetFor.length > 0){
							for(var i=0;i<targetFor.length ;i++){
								$L(_this.$node).find('.lyteCommitsWrapper').connection( 'delete', $L(graphLinkNode).find('.lyteCommitGraphLink')[0], targetFor[i].attr('id'))
								// targetFor[i][0].remove();
							}
						}

						if(sourceFor.length > 0){
							var topDummy = $L(_this.$node).find(("#lyteCommitGraphDummyTargetTop_"+intentLevel))
							topDummy.attr('source' , commitCard.attr('id').slice(12))
							for(var i=0;i<sourceFor.length ;i++){
								_this.updateTopConnection( topDummy[0] , sourceFor[i] , 'src' )
							}
						}
						_this.setData('scrollDirection' , direction)
					break;
					case 'scrollUp':
						// var commitCard = $L(('.'+nodeToBeMoved))
						var commitCard = $L(nodeToBeMoved)
						var _this = commitCard.closest('lyte-commit-graph')[0].component
						var graphLinkNode = commitCard.find('.lyteCommitGraphLinkWrap')[0]

						var intentLevel = commitCard.data().intentLevel

						var connections = $L(_this.$node).find('.lyteCommitsWrapper').connection( 'getConnections', $L(graphLinkNode).find('.lyteCommitGraphLink')[0] )
						var sourceFor = connections.src
						var targetFor = connections.target
						if(sourceFor.length > 0){
							for(var i=0;i<sourceFor.length ;i++){
								$L(_this.$node).find('.lyteCommitsWrapper').connection( 'delete', $L(graphLinkNode).find('.lyteCommitGraphLink')[0] , sourceFor[i].attr('id'))
								// sourceFor[i][0].remove();
							}
						}
						if(targetFor.length > 0){
							for(var i=0;i<targetFor.length ;i++){
								_this.updateTopConnection( $L(_this.$node).find(("#lyteCommitGraphDummyTarget_"+intentLevel))[0] , targetFor[i]  , 'target')
							}
						}
						_this.setData('scrollDirection' , direction)
					break;
				}

			}
		})	

		$L(_this.$node).find('.lyteCommitGraphCommits')[0].addEventListener('scroll' , function(){
			// Array.from( $L(_this.$node).find('.lyteCommitsWrapper' ).find( '.lyteConnectionTargetElement,.lyteConnectionSrcElement' ) ).forEach( function( item ){
			// 	$L(_this.$node).find('.lyteCommitsWrapper' ).connection( 'update', item );
			// });
			var wrapper = $L(_this.$node).find('.lyteCommitsWrapper' );
			Array.from( $L(_this.$node).find('.lyteCommitGraphSvg' ).find( 'g' ) ).forEach( function( item ){
				wrapper.connection( 'updateConnection', $L(item) );
			});
		})
	},
	updateTopConnection : function(targetNode , node , toChange){
		switch(toChange){
			case 'src':
				if($L(this.$node).find('.lyteCommitsWrapper')[0]){
					$L(this.$node).find('.lyteCommitsWrapper').connection( 'updateConnectionElement', {src : targetNode }, node)
				}
			break;
			case 'target':
				if($L(this.$node).find('.lyteCommitsWrapper')[0]){
					$L(this.$node).find('.lyteCommitsWrapper').connection( 'updateConnectionElement', {target : targetNode }, node)
				}
			break;
		}
	},
	appendClass : function( node , item , data , fromParent , parentIndex ){

		var retClass = 'lgg_target_'+item+" "

		var classList = node.classList[1]
		var retVal = ''
		var targetClass = ' lgg_target_'+item
		var intentLevel = data.graphIntentLevel
		if(fromParent){
			intentLevel = parentIndex
		}
		if(data.sha === 'current_changes'){
			retVal += 'lyteCommitBoxDashedLine '
			intentLevel = 0
		}

		intentLevel = intentLevel % 6;
		retVal += 'lyteCommitBoxLine_'+(intentLevel)
		if($L(node).hasClass('lyteCommitConnectBox')||fromParent){
			retVal = retVal + ' lyteCommitStartingConnect'
		}
		retVal +=targetClass
		return retVal
	},
	appendClassForReverseScroll : function( node , item ){
		var retVal = ''
		var intentLevel = item.graphIntentLevel
		intentLevel = intentLevel % 6;
		if(item.sha === 'current_changes'){
			retVal += 'lyteCommitBoxDashedLine '
			intentLevel = 0
		}
		var lineClass = ''
		lineClass += 'lyteCommitBoxLine_'+(intentLevel)
		var targetClass = ' lgg_target_'+item.sha
		retVal = lineClass+targetClass
		if($L(node).hasClass('lyteCommitConnectBox')){
			retVal = retVal + ' lyteCommitStartingConnect'
		}
		return retVal
	},
	actions : {
		onItemClicked : function(th , data){
			if(this.getMethods('onItemClick')){
				this.executeMethod('onItemClick' , {node : th , data : data})
			}
		},
		onItemRightClicked : function(th , data){
			if(this.getMethods('onContextMenu')){
				this.executeMethod('onContextMenu' , {node : th , data : data})
			}
		}
	}
});


Lyte.Component.registerHelper('lyteCommitGraphClassHelper' , function(item , th){
	
    var intent = item.graphIntentLevel
	var childLinkItem = $L(th).find('.lyteCommitGraphLink')
    var retClass = ''
    if(item.parents.length > 1){
        retClass = ' lyteCommitConnectBox '
    }
    intent = intent % 6 ;
	var parentCard = $L(th).closest('.lyteCommitGraphCard')
	if(item.sha === 'current_changes'){
		parentCard.attr('graph-intent-level' , 0)
		return 'lyteCommitBox_0'
	}
    if(intent > 6){
		var boxLevel = intent%6
		if(boxLevel === 0){
			boxLevel = 6
		}
		parentCard.attr('graph-intent-level' , boxLevel)
        return ( 'lyteCommitBox_' + boxLevel ) + retClass
    } 
	parentCard.attr('graph-intent-level' , intent)
    return ('lyteCommitBox_'+intent) + retClass
})

Lyte.Component.registerHelper('lyteCommitGraphLevelHelp' , function( item , index , nod ){

	if(item.sha === '19a6c0f'){
		debugger
	}

	var availableSlots = this.getData('availableSlots')
	var _this = this
	var scrollDiv = $L(_this).find('.lyteCommitGraphCommits')[0]
	var returnValue;
	index += 1;

	if(this.getData('toRemoveLater') === item.sha){
		$L(nod).find('.lyteCommitGraphDetailsWrap')[0].style.setProperty("--left-intent", item.messageIntentLevel)
		return item.graphIntentLevel
	}
	this.setData('toRemoveLater' , item.sha)

	if(!_this.getData('connectionCreated')){
		var $node = $L(_this).find( '.lyteCommitsWrapper' ).connection({
			wrapperElement : $L( _this ).find('.lyteConnectionMarker').get(0),
			connector_radius : 0,
			connection_type : "line",
			attr_fn: function (elem, name, value) {
				var l = value.split(' '),
					src = { x: parseFloat(l[1]), y: parseFloat(l[2]) },
					trg = { x: parseFloat(l[4]), y: parseFloat(l[5]) },
					cpyVal;
			
				if (name == 'd' && (src.x != trg.x || src.y != trg.y)) {
					var height = Math.min(Math.abs(src.y - trg.y),40),
						secTrg = src.y + height;
					if($L(elem.parentElement).hasClass('testBend')){
						var width = $L(elem.parentElement).data().width,
							midChng = src.x + width;
						cpyVal = "M " + src.x + " " + src.y + " C " + src.x + " " + (src.y + height * 0.5) + " " + midChng + " " + (secTrg - height * 0.5) + " " + midChng + " " + secTrg + " L " + midChng + " " + (trg.y - height)
									+ "C" + midChng + " " + (trg.y - height * 0.5) + " " + trg.x + " " + (trg.y - height * 0.5) + " " + trg.x + " " + trg.y;
					} else if (src.x < trg.x || ($L(elem.parentElement).hasClass('lyteCommitStartingConnect'))) {//start
						cpyVal = "M " + src.x + " " + src.y + " C " + src.x + " " + (src.y + height * 0.5) + " " + trg.x + " " + (secTrg - height * 0.5) + " " + trg.x + " " + secTrg + " L " + trg.x + " " + trg.y;
					} else {
						secTrg = trg.y - height;
						cpyVal = "M " + src.x + " " + src.y + " L " + src.x + " " + secTrg + " C " + src.x + " " + (secTrg + height * 0.5) + " " + trg.x + " " + (trg.y - height * 0.5) + " " + trg.x + " " + trg.y;
					}
					value = cpyVal;
				}
				elem.setAttribute(name, value);
			}
		})
		_this.setData('connectionCreated' , true)
	}
	
	function updateConnectionTopScroll(helperNode){

		var itemParents = item.parents

		for(var i=0;i<item.parents.length;i++){

			var lineNode = $L(_this).find(('#lgg_'+item.sha+'_'+item.parents[i]))
			if(item.sha === 'current_changes'){
				lineNode.addClass('lyteCommitBoxDashedLine')
			}
			if(lineNode[0]){
				$L(_this).find('.lyteCommitsWrapper').connection( 'updateConnectionElement', {src : $L(_this).find(('#lmg_'+ item.sha))[0] }, lineNode[0])
			}

		}

	}

	function createConnectionTopScroll(helperNode){

		var $node = $L(_this).find( '.lyteCommitsWrapper' )

		var node1 = $L(helperNode).find('.lyteCommitGraphLink')[0]
		$L(node1).attr('id' , ('lmg_'+item.sha))
		var dummyTargetIndex = $L(helperNode).closest('lyte-commit-graph').find(('#lyteCommitGraphDummyTargetTop_'+item.graphIntentLevel))[0]
		if(item.children){
			for(var i=0;i<item.children.length;i++){
				var gId = 'lgg_'+item.children[i].sha+'_'+item.sha
				if(!$L(_this).find(('#'+gId))[0]){
					if(item.children.length > 1){
						var passItem = item.children[i]
					} else {
						var passItem = item
					}
					$node.connection( 'create', dummyTargetIndex , node1 , {
						id:gId,
						src_position : {
							y : 1,
							x : 0.5
						},
						target_position : {
							y : 0,
							x : 0.5
						},
						class : _this.component.appendClassForReverseScroll( node1 , passItem )
					});
				}
			}
		}
		

		updateConnectionTopScroll(helperNode)
	}
	
	if(this.getData('scrollDirection') === 'scrollUp'){
		$L(nod).closest('.lyteCommitGraphCard').data('intentLevel' , item.graphIntentLevel)
		$L(nod).closest('.lyteCommitGraphCard').data('itemValue' , item)
		createConnectionTopScroll(nod)
		this.setData('previousIndex' , index)
		if(item.graphIntentLevel > -1){
			return item.graphIntentLevel
		}
		return
	}
	
	if( item.graphIntentLevel > -1 || item.msgIntentLevel > -1 ){
		$L(nod).closest('.lyteCommitGraphCard').data('intentLevel' , item.graphIntentLevel)
		$L(nod).closest('.lyteCommitGraphCard').data('itemValue' , item)

		$L(nod).find('.lyteCommitGraphDetailsWrap')[0].style.setProperty("--left-intent", item.msgIntentLevel)
		$L(nod).find('.lyteCommitGraphLink').attr('connect-intent-level' , item.graphIntentLevel)


		createConnectionFun(item.sha , item.parents[0] , 0 , nod , item.graphIntentLevel)
		if(item.parents[1]){
			createConnectionFun(item.sha , item.parents[1] , 0 , nod , item.graphIntentLevel, true)
		}
		this.setData('previousIndex' , index)
		return item.graphIntentLevel
	}


	// attr_fn: function (elem, name, value) {
	// 	var l = value.split(' '),
	// 		src = { x: parseFloat(l[1]), y: parseFloat(l[2]) },
	// 		trg = { x: parseFloat(l[4]), y: parseFloat(l[5]) },
	// 		cpyVal;
	
	// 	if (name == 'd' && (src.x != trg.x || src.y != trg.y)) {
	// 		var height = Math.min(Math.abs(src.y - trg.y),40),
	// 			secTrg = src.y + height;
	// 		if($L(elem.parentElement).hasClass('lyteCommitExtraConnect')){
	// 			var width = 200,
	// 				midChng = src.x + width;
	// 			cpyVal = "M " + src.x + " " + src.y + " C " + src.x + " " + (src.y + height * 0.5) + " " + midChng + " " + (secTrg - height * 0.5) + " " + midChng + " " + secTrg + " L " + midChng + " " + (trg.y - height)
	// 						+ "C" + midChng + " " + (trg.y - height * 0.5) + " " + trg.x + " " + (trg.y - height * 0.5) + " " + trg.x + " " + trg.y;
	// 		} else if (src.x < trg.x || ($L(elem.parentElement).hasClass('lyteCommitStartingConnect'))) {//start
	// 			cpyVal = "M " + src.x + " " + src.y + " C " + src.x + " " + (src.y + height * 0.5) + " " + trg.x + " " + (secTrg - height * 0.5) + " " + trg.x + " " + secTrg + " L " + trg.x + " " + trg.y;
	// 		} else {
	// 			secTrg = trg.y - height;
	// 			cpyVal = "M " + src.x + " " + src.y + " L " + src.x + " " + secTrg + " C " + src.x + " " + (secTrg + height * 0.5) + " " + trg.x + " " + (trg.y - height * 0.5) + " " + trg.x + " " + trg.y;
	// 		}
	// 		value = cpyVal;
	// 	}
	// 	elem.setAttribute(name, value);
	// }

	function updateConnection(targetForClass , newTarget , helperNode ){

		var lines = $L(_this).find(targetForClass)
		if(lines[0]){
			for(var i=0;i<lines.length;i++){
				var curNode = lines[i]
				if($L(lines[i]).data().active_src && $L(lines[i]).data().active_target){
					var sourceIntent = $L(lines[i]).data().active_src.getAttribute('connect-intent-level')
					var targetIntent = $L(lines[i]).data().active_target.getAttribute('connect-intent-level')
					var topSourceIntent = $L(helperNode).find(('#lmg_'+ newTarget))[0].getAttribute('connect-intent-level')
					if(sourceIntent && targetIntent){
						if((targetIntent !== topSourceIntent) && (sourceIntent !== targetIntent)){
							// var width = Math.abs(sourceIntent - targetIntent) * 10;
							// $L(curNode).data('width' , width)
							// $L(curNode).addClass('testBend')
						}
					}
				}
				$L(_this).find('.lyteCommitsWrapper').connection( 'updateConnectionElement', {target : $L(helperNode).find(('#lmg_'+ newTarget))[0] }, lines[i])
			}
		}

	}

	function createConnectionFun( id1 , id2 , slot , helperNode , check , fromParent){
		
		var $node = $L(_this).find( '.lyteCommitsWrapper' )

		var node1 = $L(helperNode).find('.lyteCommitGraphLink')[0]
		var gId = 'lgg_'+id1+'_'+id2


		var dummyTargetIndex = $L(_this).find(('#lyteCommitGraphDummyTarget_'+check))

		$L(node1).attr('id' , ('lmg_'+item.sha))

		if(item.parents[0]===''){
			updateConnection((".lgg_target_"+id1) , id1 , helperNode )
			return
		}

		if($L(_this).find(('#'+gId))[0]){
			return
		}

		if( node1 && dummyTargetIndex ){
			if(!$L(_this).find(('#'+gId))[0]){
				$node.connection( 'create', node1 , dummyTargetIndex , {
					id : gId,
					src_position : {
						y : 1,
						x : 0.5
					},
					target_position : {
						y : 0,
						x : 0.5
					},
					class : _this.component.appendClass(node1.parentElement , id2 , item , fromParent , check)
				});
			}

			updateConnection((".lgg_target_"+id1) , id1 , helperNode )
			return
		} 

	}


	function createAvailableSlot(){
		availableSlots = _this.getData('availableSlots')
		if(availableSlots.indexOf('available') < 0){
			Lyte.arrayUtils(_this.getData('availableSlots') , 'push' , 'available');
		}
	}

	function popingLastAvailableToSingleSlot(){
	
		for(var i = availableSlots.length-1 ; i>=0;i--){
			if(availableSlots[i] === 'available'){
				availableSlots.pop();
				continue;
			}
			i=0;
		}
		_this.setData('availableSlots' , availableSlots);
	}
	
	createAvailableSlot()
	popingLastAvailableToSingleSlot()

	var entireData = this.component.data.ltPropData
	var parentObjInd = 0
	var parentObj = {}
	if(item.parents[0]!==''){
		for(var i=0;i<item.parents.length;i++){
			parentObjInd = entireData.findIndex(obj => obj.sha === item.parents[i])
			// if(parentObjInd < 0){
			// 	console.log(item);
			// }
			if(parentObjInd > -1){
				parentObj = entireData[parentObjInd]
				if(!parentObj.children){
					Lyte.objectUtils( parentObj , 'add' , 'children' , [] )
				}
				Lyte.arrayUtils( parentObj.children , 'push' , item )
			}
		}
	}
	


	if(item.sha === 'current_changes'){
		createConnectionFun(item.sha , item.parents[0] , 0 , nod , 0 )
		Lyte.objectUtils(item , 'add' , 'messageIntentLevel' , 1)
		$L(nod).find('.lyteCommitGraphDetailsWrap')[0].style.setProperty("--left-intent", 1)
		$L(nod).closest('.lyteCommitGraphCard').data('itemValue' , item)
		$L(nod).closest('.lyteCommitGraphCard').data('intentLevel' , returnValue)
		Lyte.objectUtils(item , 'add' , 'graphIntentLevel' , 0)
		return 0
	}


	if(availableSlots.indexOf(item.sha) > -1){
		var slotCount = availableSlots.filter(str => str === item.sha).length
		returnValue = availableSlots.indexOf(item.sha)
		if(item.parents[0] === ''){
			Lyte.arrayUtils( availableSlots , 'removeObjects' , item.sha );
		} else {
			Lyte.arrayUtils(availableSlots , 'replaceAt' , returnValue , item.parents[0])
		}
		if(slotCount > 1){
			for(var i=0;i<availableSlots.length;i++){
				if(availableSlots[i] === item.sha){
					Lyte.arrayUtils(availableSlots , 'replaceAt' , i , 'available')
				}
			}
		}
		Lyte.objectUtils(item , 'add' , 'graphIntentLevel' , returnValue)
		createConnectionFun(item.sha , item.parents[0] , returnValue , nod , returnValue )
		if(item.parents.length > 1){
			if(availableSlots.indexOf(item.parents[1]) > -1){
				availableSlot = availableSlots.indexOf(item.parents[1])
				// Lyte.arrayUtils(availableSlots , 'replaceAt' , availableSlot , 'available')	
				createConnectionFun(item.sha , item.parents[1] , availableSlot , nod , availableSlot , true)
			} else {
				createAvailableSlot()
				availableSlot = availableSlots.indexOf('available')
				Lyte.arrayUtils(availableSlots , 'replaceAt' , availableSlot , item.parents[1])	
				createConnectionFun(item.sha , item.parents[1] , availableSlot , nod , availableSlot , true)
			}
		}
		
		createAvailableSlot()
		var msgIntentLevel = availableSlots.lastIndexOf('available')
		if( msgIntentLevel < availableSlots.length - 1 ){
			msgIntentLevel = availableSlots.length
		}
		
		Lyte.objectUtils(item , 'add' , 'messageIntentLevel' , msgIntentLevel)
		$L(nod).find('.lyteCommitGraphDetailsWrap')[0].style.setProperty("--left-intent", msgIntentLevel)
		$L(nod).closest('.lyteCommitGraphCard').data('intentLevel' , returnValue)
		$L(nod).closest('.lyteCommitGraphCard').data('itemValue' , item)
		$L(nod).find('.lyteCommitGraphLink').attr('connect-intent-level' , returnValue)
		this.setData('previousIndex' , index)
		return returnValue
	} else {
		createAvailableSlot()
		returnValue = availableSlots.indexOf('available')
		Lyte.arrayUtils(availableSlots , 'replaceAt' , returnValue , item.parents[0])
		Lyte.objectUtils(item , 'add' , 'graphIntentLevel' , returnValue)

		createConnectionFun(item.sha , item.parents[0] , returnValue , nod , returnValue )
		if(item.parents.length > 1){
			if(availableSlots.indexOf(item.parents[1]) > -1){
				availableSlot = availableSlots.indexOf(item.parents[1])
				// Lyte.arrayUtils(availableSlots , 'replaceAt' , availableSlot , 'available')	
				createConnectionFun(item.sha , item.parents[1] , availableSlot , nod , availableSlot , true)
			} else {
				createAvailableSlot()
				availableSlot = availableSlots.indexOf('available')
				Lyte.arrayUtils(availableSlots , 'replaceAt' , availableSlot , item.parents[1])	
				createConnectionFun(item.sha , item.parents[1] , availableSlot , nod , availableSlot , true)
			}
		}
		
		createAvailableSlot()
		var msgIntentLevel = availableSlots.lastIndexOf('available')
		if( msgIntentLevel < availableSlots.length - 1 ){
			msgIntentLevel = availableSlots.length
		}

		Lyte.objectUtils(item , 'add' , 'messageIntentLevel' , msgIntentLevel)
		$L(nod).find('.lyteCommitGraphDetailsWrap')[0].style.setProperty("--left-intent", msgIntentLevel)
		$L(nod).closest('.lyteCommitGraphCard').data('intentLevel' , returnValue)
		$L(nod).closest('.lyteCommitGraphCard').data('itemValue' , item)
		$L(nod).find('.lyteCommitGraphLink').attr('connect-intent-level' , returnValue)
		this.setData('previousIndex' , index)
		return returnValue
	}
})

Lyte.Component.registerHelper('lyteCommitGraphHasBranchHelper' , function(obj){
	if(Object.keys(obj) && Object.keys(obj).length){
		return true
	} else {
		return false
	}
})

Lyte.Component.registerHelper('lyteCommitGraphDayHelper' , function(dateString){
	const regex = /([A-Z][a-z]{2})\s+([A-Z][a-z]{2})\s+([0-9]{1,2})\s+([0-9]{2}:[0-9]{2}:[0-9]{2})\s+([0-9]{4})/;
	const match = regex.exec(dateString);

	if (match) {
		const dayOfWeek = match[1];
		const month = match[2];
		const day = match[3];
		const time = match[4].slice(0 , -3);
		const year = match[5];

		return (month +' '+ day +', ' + time)

		// console.log(`Month: ${month}, Day: ${day}, Year: ${year}`);
	}
})