;( function(){

	function __index( elem ){
		return Array.from( elem.parentNode.children ).indexOf( elem );
	}

	function __previous_cell( elem, count ){
		/*
		 * returns previous row
		 */
		var parentNode = 'parentNode',
		previousElementSibling = 'previousElementSibling',
		prev = elem[ parentNode ][ previousElementSibling ];
		if( prev ){
			var ret = $L( prev.children ).get( -count );
			if( ret && ret.offsetParent == null ){
				return __previous_cell( ret, 1 );
			}
			return ret;	
		}

		/*
		 * returns from children of thead
		 */

		var thead = elem[ parentNode ][ parentNode ][ previousElementSibling ];
		if( thead ){
			var ret = $L( thead.children ).eq( -1 ).children().get( -count );
			if( ret && ret.offsetParent == null ){
				return __previous_cell( ret, 1 );
			}
			return ret;
		}
	}

	function __next_cell( elem, count ){
		/*
		 * returns next row
		 */
		var parentNode = 'parentNode',
		nextElementSibling = 'nextElementSibling',
		next = elem[ parentNode ][ nextElementSibling ];
		if( next ){
			var ret = next.children[ count ];
			if( ret && ret.offsetParent == null ){
				return __next_cell( ret, 1 );
			}
			return ret;
		}

		/*
		 * returns from children of tbody
		 */

		var tbody = elem[ parentNode ][ parentNode ][ nextElementSibling ];
		if( tbody ){
			var ret = $L( tbody.children ).eq( 0 ).children().get( count );
			if( ret && ret.offsetParent == null ){
				return __next_cell( ret, 1 );
			}
			return ret;
		}
	}

	function moveHori( cell, count ){
		var index = __index( cell ),
		new_index = index + count,
		__children = cell.parentNode.children,
		diff = new_index - index;

		if( diff == 0 ){
			return;
		}
 
		if( diff > 0 ){
			/*
			 * right, bottom, end navigation
			 */
			var __length = __children.length;
			if( __length > new_index ){
				return __children[ new_index ];
			} else {
				return __next_cell( cell, new_index - __length );
			}
		} else {
			/*
			 * left, top, home navigation
			 */
			 if( new_index < 0 ){
			 	return __previous_cell( cell, -new_index );
			 } else {
			 	return __children[ new_index ];
			 }
		}
	}

	function ret_grp( cell, count ){
		var parentNode = 'parentNode';
		var ret = $L( cell[ parentNode ][ parentNode ][ parentNode ].children ).eq( count ).children().eq( count ).children().get( count );

		if( ret && ret.offsetParent == null ){
			return __previous_cell( ret, 1 );
		}
		return ret;
	}

	function home( cell, ctrl ){
		if( ctrl ){
			return ret_grp( cell, 0 );
		}
		return moveHori( cell, - __index( cell ) );
	}

	function end( cell, ctrl ){
		if( ctrl ){
			return ret_grp( cell, -1 );
		}
		return moveHori( cell, cell.parentNode.children.length - __index( cell ) - 1 );
	}

	function click( cell ){
		cell.click();
		return cell;
	}

	function moveVert( cell, count ){
		return moveHori( cell, count * cell.parentNode.children.length );
	}

	function get_origin_cell( target, origin, query ){
		var cell = target.closest( query ),
		parentNode = 'parentNode';

		if(  cell[ parentNode ][ parentNode ][ parentNode ] != origin ){
			return get_origin_cell( cell[ parentNode ], origin, query );
		}

		return cell;
	}

	function keyEvent( evt ){

		if( evt.defaultPrevented ){
			return;
		}

		var target = evt.target,
		origin = _lyteUiUtils.getCurrentTarget( evt ),
		__tagName = target.tagName || "",
		key = evt.key,
		options = $L( origin ).data( 'tableNavigation' ),
		before_nav = options.onBeforeNavigation,
		after_nav = options.onAfterNavigation,
		is_escape = key == "Escape" || key == "Esc",
		query = 'lyte-td, lyte-th, td, th, lyte-exptable-th, lyte-exptable-td';

		if( is_escape ){
			var is_expanded = target.getAttribute( 'aria-expanded' );
			if( is_expanded == "true" || is_expanded == "" ){
				return;
			}
			
			target = get_origin_cell( target, origin, query )
			__tagName = target.tagName;
		} else if( target == origin ){
			switch( key ){
				case "ArrowDown" :
				case " " : {
					key = "Home";
					target = origin.querySelector( query );
					__tagName = target ? target.tagName : "";
				}
				break;
			}
		}

		if( /^lyte\-t(d|h)$/i.test( __tagName ) ||  /^lyte-exptable\-t(d|h)$/i.test( __tagName ) || /^t(h|d)$/i.test( __tagName ) ){

			if( target.parentNode.parentNode.parentNode != origin ){
				return;
			}

			var fn,
			 __count,
			 ret = is_escape ? target : void 0,
			 trapFocus = options.trapFocus;

			 /*
			  * If target is in fixed part you can return original table cell here. navigation will happen in original table
			  */
			  
			 before_nav && ( ret = before_nav.call( origin, target, evt ) || ret );

			 if( ret != void 0 ){
			 	if( ret == false ){
				  return;
				} else if( ret.nodeType == 1 ){
				  target = ret;
				}
			 }

			 switch( key ){
			 	case "ArrowLeft" : {
			 		fn = moveHori;
			 		__count = -1;
			 	}	
			 	break;
			 	case "ArrowRight" : {
			 		fn = moveHori;
			 		__count = 1;
			 	}	
			 	break;
			 	case 'ArrowDown' : {
			 		fn = moveVert;
			 		__count = 1;
			 	}
			 	break;
			 	case 'ArrowUp' : {
			 		fn = moveVert;
			 		__count = -1;
			 	}
			 	break;
			 	case "Home" : {
			 		fn = home;
			 		__count = evt.metaKey || evt.ctrlKey;
			 	}
			 	break;
			 	case 'End' : {
			 		fn = end;
			 		__count = evt.metaKey || evt.ctrlKey;
			 	}
			 	break;
				case "Enter" : {
					fn = click;
				}
				break;
			 }

			if( fn ){
				ret = fn( target, __count );

				if( trapFocus && __count && !ret ){
					if( __count == 1 ){
						fn = home;
						__count = true;
					} else if( __count == -1 ){
						fn = end;
						__count = true;
					}
					ret = fn( target, __count );
				}
			}

			if( ret ){
				/*
				 * If particular column is fixed you can return fixed column here. fixed column will be focused
				 */
				after_nav && ( ret = after_nav.call( origin, ret, evt ) || ret );

				var tab_index = options.tabindex || 0;
				if( ret.tabIndex < tab_index ){
					ret.tabIndex = tab_index;
				}

				ret.focus();
				evt.preventDefault();
			}
		} else {
			var key_down = options.onKeyDown;

			key_down && key_down.call( origin, evt );
		}
	}

	_lyteUiUtils.tableNavigation = function( table, option, custom_options ){
		var ns = "add",
		$node = $L( table ),
		data_ns = 'tableNavigation',
		cls_name = "lyteTableNavigationEnabled";

		if( option == "unbind" ){
			ns = "remove";
			$node.removeClass( cls_name ).removeData( data_ns );
		}  else {
			$node.addClass( cls_name ).data( data_ns, option = option || {} );

			custom_options = custom_options || {};

			var tab_index = custom_options.tabindex || 0;
			if( typeof tab_index != "undefined" ){ // this plugin will not handle dynamic elements addition
				Array.from( table.children ).forEach( function( row_grp ){
					Array.from( row_grp.children ).forEach( function( row ){
						Array.from( row.children ).forEach( function( cell ){
							var exst_tab_index = cell.tabIndex;
							if( exst_tab_index < tab_index ){
								cell.tabIndex = tab_index;
							}
						});
					});
				});
			}
		}

		table[ ns + 'EventListener' ]( 'keydown', keyEvent, true );
	}

})();