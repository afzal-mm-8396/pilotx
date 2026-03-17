Lyte.Component.register("lyte-nested-table", {
_template:"<template tag-name=\"lyte-nested-table\"> <colgroup> <template items=\"{{ltPropWidthMap}}\" item=\"item\" index=\"index\" is=\"for\"><col style=\"{{setStyle(item.width,item.minWidth)}}\"></template> </colgroup> <template is=\"if\" value=\"{{ltPropGroupTitle}}\"><template case=\"true\" depth=\"1\"><table><thead> <tr> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"cell\" index=\"index\" depth=\"3\"></td> </tr> </thead></table></template></template> <template is=\"if\" value=\"{{isGroup}}\"><template case=\"true\" depth=\"1\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{renderContent}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody></table></template><template case=\"false\" depth=\"1\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{renderContent}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody></table></template></template> <span class=\"lyteListviewIntersectionspan\"></span> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"setStyle","args":["item.width","item.minWidth"]}}}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[5,0]}]}},"default":{}}]}},"default":{}}],"actualTemplate":"<template items=\"{{ltPropHeader}}\" item=\"cell\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><th class=\"{{cell.data.class}}\"> <template is=\"if\" value=\"{{index}}\"><template case=\"true\"> <template is=\"if\" value=\"{{index}}\"><template case=\"true\"><lyte-yield yield-name=\"{{cell.data.groupYield}}\" row-data=\"{{item}}\" cell-data=\"{{cell.data}}\" cell-index=\"{{index}}\"></lyte-yield></template></template> </template><template case=\"false\"> <div class=\"lyteNestedTableMainThWrapper\"> <span tabindex=\"0\" role=\"button\" aria-live=\"polite\" aria-label=\"{{ariaLabel}}\" onkeydown=\"{{action('toggle',event)}}\" onclick=\"{{action('toggle')}}\" class=\"lyteListviewNestedTableHandler\"></span> <template is=\"if\" value=\"{{ltPropHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.groupYield,'||','yield')}}\" row-data=\"{{item}}\" cell-data=\"{{cell.data}}\" cell-index=\"{{index}}\"></lyte-yield> </template><template case=\"false\"> <span class=\"lyteListviewNestedTableHeading lyteTextEllipsisNode\">{{ltPropGroupTitle}}</span> <span class=\"lyteListviewNestedTableCount lyteTextEllipsisNode lyteBracket\">(</span> <span class=\"lyteListviewNestedTableCount lyteTextEllipsisNode\">{{ltPropCount}}</span> <span class=\"lyteListviewNestedTableCount lyteTextEllipsisNode lyteBracket\">)</span> </template></template> </div> </template></template> </th></tr></tbody></table></template>","tagName":"TR"}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-listview-nested-level:'","item.level"]}}}},{"type":"registerYield","position":[0,1,1,1,1],"dynamicNodes":[]},{"type":"attr","position":[0,1,1,1,3]},{"type":"for","position":[0,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0],"dynamicNodes":[]}]}},"default":{}}]},{"type":"componentDynamic","position":[0,1,1,1]}],"actualTemplate":"<template items=\"{{renderContent}}\" item=\"item\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr> <td colspan=\"{{ltPropHeader.length}}\" class=\"lyteListviewNestedGroupHolder\"> <div class=\"lyteListviewTableHolder\"> <lyte-nested-table item=\"{{item}}\" intersection=\"{{intersection}}\" lt-prop-header-yield=\"{{ltPropHeaderYield}}\" lt-prop-count=\"{{item.count}}\" lt-prop-group-title=\"{{item.name}}\" lt-prop-column-title=\"{{item.column}}\" lt-prop-header=\"{{ltPropHeader}}\" lt-prop-content=\"{{item.rows}}\" lt-prop-width-map=\"{{ltPropWidthMap}}\" is-group=\"{{item.isGroup}}\" fixed-column-status=\"{{fixedColumnStatus}}\" style=\"--lyte-listview-nested-level:{{item.level}}\"> <template is=\"registerYield\" yield-name=\"yield\" from-parent=\"true\"></template> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{item.data.yield}}\"><template case=\"true\"><template is=\"registerYield\" yield-name=\"{{item.data.yield}}\" from-parent=\"true\"></template></template></template> <template is=\"if\" value=\"{{item.data.groupYield}}\"><template case=\"true\"><template is=\"registerYield\" yield-name=\"{{item.data.groupYield}}\" from-parent=\"true\"></template></template></template> </template> </lyte-nested-table> </div> </td> </tr></tbody></table></template>","tagName":"TBODY"}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]}],"actualTemplate":"<template items=\"{{ltPropHeader}}\" item=\"cell\" index=\"cellIndex\" is=\"for\" depth=\"3\"><table><tbody><tr><td> <lyte-yield yield-name=\"{{expHandlers(cell.data.yield,'||',&quot;yield&quot;)}}\" row-data=\"{{item.data}}\" cell-data=\"{{cell.data}}\" actual-index=\"{{index}}\" cell-index=\"{{cellIndex}}\" row-index=\"{{index}}\"></lyte-yield> </td></tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template items=\"{{renderContent}}\" item=\"item\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr onclick=\"{{action('rowclick',event,this,index)}}\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"cell\" index=\"cellIndex\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TBODY"}]}},"default":{}}],
_observedAttributes :["ltPropHeader","ltPropContent","ltPropGroupTitle","ltPropCount","ltPropHeaderYield","ltPropWidthMap","isGroup","renderContent","topLevel","intersection","ariaLabel","item","fixedColumnStatus"],
_observedAttributesType :["array","array","string","number","boolean","array","boolean","array","boolean","object","string","object","object"],

	data : function(){
		return {
			ltPropHeader : Lyte.attr( 'array', { default : [] } ),
			ltPropContent : Lyte.attr( 'array', { default : [] } ),
			ltPropGroupTitle : Lyte.attr( 'string', { default : "" } ),
			ltPropCount : Lyte.attr( 'number' ),
			ltPropHeaderYield : Lyte.attr( 'boolean', { default : false } ),
			ltPropWidthMap : Lyte.attr( 'array', { default : [] } ),

			isGroup : Lyte.attr( 'boolean', { default : true } ),
			renderContent : Lyte.attr( 'array', { default : [] } ),
			topLevel : Lyte.attr( 'boolean', { default : false } ),
			intersection : Lyte.attr( "object" ),
			ariaLabel : Lyte.attr( 'string' ),
			item : Lyte.attr( 'object' ),

			fixedColumnStatus : Lyte.attr( 'object', { default : {}, watch : true } )
		}		
	},

	fixed_obs : function( arg ){

		// if( this.data.isGroup ){
		// 	return;
		// }

		this.check_fixed_column();
	}.observes( 'fixedColumnStatus.*' ),
	
	check_fixed_column : function(){
		var groups = $L( this.$node ).children( 'thead,tbody' ),
		status = this.data.fixedColumnStatus,
		cls_name = 'lyteFixedColumn',
		fixed_cls = 'lyteTableFixed';
		
		Array.from( groups ).forEach( function( tbody ){
			Array.from( tbody.children ).forEach( function( row ){
				Array.from( row.children ).forEach( function( cell, index ){
					var __cur = status[ index ],
					fn = "removeClass",
					__style = {
						left : "",
						right : ""
					};
					
					if( __cur ){
						var inner_cls = fn;
	
						fn = "addClass";
						$L.extend( __style, __cur );
	
						if(  status[ 'fixed_' + index ] ){
							inner_cls = fn;
						}
	
						$L( cell )[ inner_cls ]( fixed_cls );
					}
	
					$L( cell )[ fn ]( cls_name ).css( __style );
				});
			});
		});
		
	},

	actions : {

		rowclick : function( evt, __this, index ){
			var row_data = this.data.renderContent[ index ].data,
			cell = evt.target.closest( 'td' ),
			cell_index = Array.from( cell.parentNode.children ).indexOf( cell );

			this.throwEvent( 'nestedRowClick', row_data, __this, evt, this.data.ltPropHeader[ cell_index ].data );
			return false;
		},

		toggle : function( evt ){
			if( evt ){
				if( /^32|13$/.test( evt.which ) ){
					evt.preventDefault();
				} else {
					return;
				}
			}
			this.toggle();
		}
	},

	init : function(){
		
		this._req = window.requestAnimationFrame( function(){
			this._req = window.requestAnimationFrame( function(){
				var cells,
					col_grps = this.$node.querySelector( 'colgroup' ).children;
				if( this.data.topLevel ){
					cells = this.$node.closest( 'lyte-table-structure' ).querySelector( 'lyte-thead' ).children[ 0 ];
				} else {
					cells = this.$node.parentNode.closest( 'lyte-nested-table' ).querySelector( 'colgroup' );
				}
				
				Array.from( cells.children ).forEach( function( item, index ){
					var __col = col_grps[ index ],
						__width = __col.style.width;
					if(__width.indexOf( 'px' ) == -1 ){
						__col.style.width = item.style.width;
					}
				} )
			}.bind( this ));
		}.bind( this ));
	},

	didConnect : function(){
		if( this.data.topLevel ){
			// var scroll_elem = this.$node.closest( '.lyteTableScroll' );
			this.setData( 'intersection', { obs : new IntersectionObserver( this.intersection.bind( this ), { threshold : [ 0.01 ], root : document } ) } );
		} else if( this.data.intersection ){
			this.add_to_inter();
			this.update_aria();
		}

		this.$node.toggle = this.toggle.bind( this );
	},

	update_aria : function( ns ){
		this.setData( 'ariaLabel', this.data.ltPropGroupTitle +  " Row group " + ( ns || "expanded" ) );
	},

	toggle : function(){
		var cls_name = "lyteListviewNestedTableClosed",
		anime_class = "lyteListviewNestedAnimationHappening",
		__this = this,
		$node = $L( this.$node ).parent(),
		height = __this.$node.offsetHeight,
		thead = __this.$node.querySelector( "thead" ),
		tbody = thead.nextElementSibling;

		if( $node.hasClass( anime_class ) ){
			return;
		}

		if( $node.hasClass( cls_name ) ){
			$L( tbody ).css( "display", "" );
			$node.css({
				height : height + 'px'
			}).removeClass( cls_name ).addClass( anime_class ).on( 'transitionend', function(){
				$node.removeClass( anime_class ).off( 'transitionend' ).css( "height", "" );
				__this.update_aria();
			});

			window.requestAnimationFrame( function(){
				window.requestAnimationFrame( function(){
					var new_hgt = __this.$node.offsetHeight;
					$node.css({
						height : new_hgt + 'px'
					} );

					if( new_hgt == height ){
						$node.trigger( 'transitionend' );
					}
				});
			});
		} else {
			var th_height = thead.offsetHeight;

			$node.css({
				height : height + 'px'
			}).addClass( cls_name + " " + anime_class ).on( 'transitionend', function(){ 
				$node.removeClass( anime_class ).off( 'transitionend' ).css( "height", "" );
				$L( tbody ).css( "display", "none" );
				__this.update_aria( 'collapsed' );
			});

			window.requestAnimationFrame( function(){
				window.requestAnimationFrame( function(){
					$node.css({
						height : th_height + 'px'
					} );

					if( th_height == height ){
						$node.trigger( 'transitionend' );
					}
				} );
			} );
		}
	},

	didDestroy : function(){

		window.cancelAnimationFrame( this._req );

		var obs = this.data.intersection,
		span = $L( this.$node.children ).get( -1 );
		obs.obs.unobserve( span );

		this.data.intersection = void 0;
	},

	intersection : function( intersections ){
		intersections.forEach( function( item ){
			if( item.intersectionRatio ){
				var target = item.target,
				table = target.parentNode,
				root_bound = item.rootBounds,
				__this = table.component;

				if( !__this.add_more_data() ){
					__this.check_nested_end( root_bound, target );
				}
			}
		} ); 
	},

	check_nested_end : function( root_bound, target ){
		var __this = this;
		$L.fastdom.measure( function(){
			var bcr = target.getBoundingClientRect(),
			is_vert_outside = root_bound.top > bcr.bottom || root_bound.bottom < bcr.top,
			is_hori_outside = root_bound.left > bcr.right || root_bound.right < bcr.left;

			if( !( is_vert_outside || is_hori_outside ) ){
				$L.fastdom.mutate( function(){
					if( !__this.add_more_data() ){
						__this.check_nested_end( root_bound, target );
					}
				} )
			}
		} )
	},

	obs : function(){
		this.add_to_inter();
	}.observes( 'intersection' ),

	content_obs : function( arg ){
		this.setData( 'renderContent', [] );
		this.add_more_data();
	}.observes( 'ltPropContent' ),

	add_to_inter : function(){ 
		var  obs = this.data.intersection,
		span = $L( this.$node.children ).get( -1 );
		obs.obs.observe( span );
	},

	add_more_data : function(){
		var __data = this.data,
		renderContent = __data.renderContent,
		content = __data.ltPropContent || [],
		__len = renderContent.length;

		if( __len == content.length ){
			return true;
		}

		Lyte.arrayUtils( renderContent, 'push', content.slice( __len, __len + 10 ) );
		!__data.isGroup && this.check_fixed_column();
	}
});

Lyte.Component.registerHelper( 'setStyle', function( width, minWidth ){
	return (width ? "width: " + width + ";" : '' ) + ( minWidth ? "min-width: " + minWidth + ";" : '' );
});