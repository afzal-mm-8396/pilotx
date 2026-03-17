Lyte.Component.register( 'lyte-timeline', {
_template:"<template tag-name=\"lyte-timeline\" lyte-timeline=\"\"> <template is=\"if\" value=\"{{infinteStickyHeader}}\"><template case=\"true\"><div class=\"lyteTimelineOriginalSticky\"> <lyte-timeline-group-header>{{infinteStickyHeader}}</lyte-timeline-group-header> </div></template></template> <div class=\"lyteTimelineInfiniteScrollContainer\"> <template items=\"{{timelineRenderData}}\" item=\"item\" index=\"index\" is=\"for\"><lyte-timeline-item data-index=\"{{index}}\" class=\"{{ltPropTimelineItemClass}} {{expHandlers(item.body.date,'?:','lyteTimelineInfiniteGroupLabel','')}}\"> <lyte-yield class=\"lyteTimelineItemYield\" yield-name=\"lyte-timeline-item-content\" timeline-item-data=\"{{item}}\"></lyte-yield> </lyte-timeline-item></template> </div> <template is=\"if\" value=\"{{showBottomLoader}}\"><template case=\"true\"> <lyte-loader id=\"lyteTimelineBottomLoader\" class=\"lyteTimelineLoader\" lt-prop-inline=\"true\" lt-prop-close-icon=\"false\" lt-prop-close-on-escape=\"false\" lt-prop-progress-bar=\"{&quot;show&quot;: false}\" lt-prop-on-timeout=\"{&quot;errorMsg&quot;:&quot;&quot;}\"> </lyte-loader> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropAlignment","ltPropTimelineItemClass","infinteStickyHeader","ltPropTimelineData","ltPropMoreRecordsBottom","timelineLinearData","timelineRenderData","ltPropInfiniteScroll","showBottomLoader"],
_observedAttributesType :["string","string","string","array","boolean","array","array","boolean","boolean"],

	data: function() {
		return {

			// left, right, alternate
			'ltPropAlignment': Lyte.attr( 'string', { 'default': 'left' } ),
			ltPropTimelineItemClass: Lyte.attr( 'string', { 'default': '' }),
			infinteStickyHeader : Lyte.attr( 'string', { default : void 0 } ),
			ltPropTimelineData : Lyte.attr( 'array', { default : [] } ),
			ltPropMoreRecordsBottom: Lyte.attr( 'boolean', {default: true }),
			timelineLinearData : Lyte.attr( 'array', { default : [] } ),
			timelineRenderData : Lyte.attr( 'array', { default : [] } ),
			ltPropInfiniteScroll: Lyte.attr('boolean', {default: false}),
			showBottomLoader: Lyte.attr('boolean', {default: false})
		}
	},
	init: function() {
		if(this.data.ltPropInfiniteScroll && this.data.ltPropTimelineData.length > 0) {
			var timeline = this.data.ltPropTimelineData,
			__map = this.__timeline_map = new Map();
			this.data.timelineLinearData = this.linearizeData(timeline, [], __map);
		}
	},
	didConnect: function() {
		if(this.data.ltPropInfiniteScroll  && this.data.ltPropTimelineData.length > 0) {
			this.bindInfiniteScrollPlugin();
		}
	},

	bindInfiniteScrollPlugin: function() {
		var _self = this;
		var lyteTimelineElem = $L(this.$node);
		var lyteTimelineInnerScrollElem = lyteTimelineElem.find(".lyteTimelineInfiniteScrollContainer");
		lyteTimelineElem.addClass("lyteTimelineInfiniteScrollType");
		lyteTimelineInnerScrollElem.infinite({
			originalContent : this.data.timelineLinearData,
			renderContent : this.data.timelineRenderData,
			contentLength : 20,
			propertyTop : "paddingBottom",
			propertyBottom : "paddingTop",
			records : "lyte-timeline-item",
			averageHeight : 120,
			moreRecordsBottom: this.data.ltPropMoreRecordsBottom,
			onScrollUpdate : this.scroll_update.bind( this ),
			onAfterUpdate: function(dom_index, data_index, data, scroll_container) {
				var grouplastItemElement;
				var lastItemExists = false;
				var isGroupLastItem = false;
				
				// Filter to find the object that contains 'data' in its events array
				var timelineData = _self.getData('ltPropTimelineData');
				for(var i = 0; i < timelineData.length; i++) {
					var timelineDayEventsData = timelineData[i];
					var timelineDayEventsDataLength = timelineDayEventsData.event.length;
					for(var j = 0; j < timelineDayEventsDataLength; j++) {
						if(timelineDayEventsData.event[j] === data) {
							if(timelineDayEventsDataLength - 1 == j) {
								isGroupLastItem = true;
							}
							break;
						}
					}
				}
				if(isGroupLastItem) {
					grouplastItemElement = scroll_container.querySelector(`[data-index='${dom_index}']`);
					grouplastItemElement.classList.add("lyteTimelineGroupLastItem");
				}
				if(scroll_container.querySelector(".lyteTimelineLastItem")) {
					lastItemExists = true;
				}
				if(!lastItemExists && (data_index == (_self.getData('timelineLinearData').length - 1))) {
					grouplastItemElement.classList.add("lyteTimelineLastItem");
				}
			},
			onInitialUpdate : function( arr1, arr2 ){
				this.setData( "timelineRenderData", arr1 );
				$L.fastdom.measure( this.scroll_update.bind( this ) );

				var lyteTimelineGroupLabel = lyteTimelineInnerScrollElem.find(".lyteTimelineInfiniteGroupLabel");
				for(var i = 0; i < lyteTimelineGroupLabel.length; i++) {
					var lyteTimelineGroupLabelItem = lyteTimelineGroupLabel[i];
					var previousElementSibling = lyteTimelineGroupLabelItem.previousElementSibling;
					if(previousElementSibling.tagName.toLowerCase() == "lyte-timeline-item") {
						previousElementSibling.classList.add("lyteTimelineGroupLastItem");
					}
				}

				if(!this.data.ltPropMoreRecordsBottom) {
					$L.fastdom.measure(function() {
						var clientHeight = lyteTimelineInnerScrollElem[0].clientHeight;
						var scrollHeight = lyteTimelineInnerScrollElem[0].scrollHeight;
						if(clientHeight === scrollHeight) {
							//	This case is for handling when there is no scroll during initial update.
							var lastTimelineItem = lyteTimelineInnerScrollElem.find("lyte-timeline-item").last();
							$L.fastdom.mutate(function() {
								lastTimelineItem.addClass("lyteTimelineLastItem", "lyteTimelineGroupLastItem");
							});
						}
					});
				}
			}.bind( this ),
			onScrollEnd: function(org_arr, render_arr, start_index, end_index, dom) {
				if(this.data.ltPropMoreRecordsBottom) {
					this.setData("showBottomLoader", true);
					this.$node.querySelector("#lyteTimelineBottomLoader").ltProp("show", true);
					return new Promise( function( res ){
						var ret = _self.scrollEndFunction();
						if(ret.then) {
							Promise.resolve(ret).then(function(newData) {
								if(newData.length > 0) {
									var timelineData = _self.getData("ltPropTimelineData");
									var tempMap = new Map();
									var existingMap = _self.__timeline_map;
									var timelineDataLastItem = timelineData[timelineData.length - 1];
									var newDataFirstItem = newData[0];
									if(timelineDataLastItem.date === newDataFirstItem.date) {
										timelineDataLastItem.event.push.apply(timelineDataLastItem.event, newDataFirstItem.event);
										timelineData.push.apply(timelineData, newData.slice(1));
									}
									else {
										timelineData.push.apply(timelineData, newData);
									}
									var newLinearData = _self.linearizeData(newData, [], tempMap);
									_self.__timeline_map = new Map([...existingMap, ...tempMap]);
									$L( dom ).infinite("insert", org_arr.length, newLinearData);
								}
								else {
									_self.data.ltPropMoreRecordsBottom = false;
									$L( dom ).infinite("update", {
										moreRecordsBottom : false
									});
									var timelineItems = _self.$node.querySelectorAll("lyte-timeline-item");
									var lastTimelineItem = timelineItems[timelineItems.length - 1];
									lastTimelineItem.classList.add("lyteTimelineGroupLastItem", "lyteTimelineLastItem");
								}
								_self.$node.querySelector("#lyteTimelineBottomLoader").ltProp("show", false);
								res();
							});
						}
						else {
							if(ret.length == 0) {
								$L( dom ).infinite("update", {
									moreRecordsBottom : false
								});
								_self.$node.querySelector("#lyteTimelineBottomLoader").ltProp("show", false);
								res();
							}
						}
					});
				}
				else {
					var timelineItems = _self.$node.querySelectorAll("lyte-timeline-item");
					var lastTimelineItem = timelineItems[timelineItems.length - 1];
					lastTimelineItem.classList.add("lyteTimelineGroupLastItem", "lyteTimelineLastItem");
				}
			}.bind( this )
		});
	},
	updateTimelineData: function() {
		var timeline = this.data.ltPropTimelineData,
		__map = this.__timeline_map = new Map();
		this.data.timelineLinearData = this.linearizeData(timeline, [], __map);
		this.bindInfiniteScrollPlugin();
	}.observes("ltPropTimelineData"),
	linearizeData: function(timeline, linearData, __map) {
		for( var i = 0; i < timeline.length; i++ ) {
			var cur = timeline[ i ],
			__date = cur.date,
			events = cur.event,
			existingLinearData = this.data.timelineLinearData,
			dateExists = false;

			for(var iterator = existingLinearData.length - 1; iterator >= 0; iterator -= 1) {
				if(existingLinearData[iterator].date === __date) {
					dateExists = true;
					break;
				}
			}
			if(!dateExists) {
				linearData.push({
					date : __date
				});
			}
			linearData.push.apply( linearData, events );

			for(var j = 0; j < events.length; j++) {
				__map.set( events[j], __date)
			}
		}
		return linearData;
	},
	scrollEndFunction: function() {
		if (this.getMethods('scrollEnd')) {
			return this.executeMethod('scrollEnd');
		}
	},
	scroll_update : function( ){
		var dom = $L(this.$node).find(".lyteTimelineInfiniteScrollContainer")[0];
		var elems = Array.from( dom.querySelectorAll( 'lyte-timeline-item' ) ),
		dom_bcr = dom.getBoundingClientRect(),
		visible_elem,
		visible_bcr,
		next_elem;
		var render_data = this.data.timelineRenderData;

		elems.every( function( elem ){
			var bcr = elem.getBoundingClientRect();

			if( dom_bcr.top < bcr.bottom ){
				visible_elem = elem;
				visible_bcr = bcr;
				return false;
			}

			return true;
		} );

		if( visible_elem ){
			var next_elem =  visible_elem.nextElementSibling,
			translate = '0px',
			fixed_elem = this.$node.querySelector( '.lyteTimelineOriginalSticky' );

			if( next_elem && next_elem.classList.contains( 'lyteTimelineInfiniteGroupLabel' ) && fixed_elem ){
				var next_bcr = next_elem.getBoundingClientRect(),
				fixed_bcr = fixed_elem.getBoundingClientRect(),
				diff = Math.max( 0, fixed_bcr.bottom - parseFloat( fixed_elem.style.top ) - next_bcr.top );

				translate = `-${ diff }px`;
			}


			var index = parseInt( visible_elem.getAttribute( 'data-index' ) ),
			cur_data = render_data[ index ].body,
			date = cur_data.date || this.__timeline_map.get( cur_data );
			
			this.setData( 'infinteStickyHeader', date );

			fixed_elem && ( fixed_elem.style.top = translate );
		}
	}
} );

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] = true;

	/**
 	 * @customElement lyte-timeline-item
 	 */

 	Lyte.createCustomElement( "lyte-timeline-item", {
		static : {
			"observedAttributes": {
				/* disable async function */
				get : function() {
					return [];
				}
			}
		},
		"connectedCallback": function() {
			var separator = document.createElement( 'lyte-timeline-separator' ),
			label = this.querySelector( 'lyte-timeline-item-label' );

			// this.insertBefore( separator, label.nextElementSibling );
		}
	} ); 



}
