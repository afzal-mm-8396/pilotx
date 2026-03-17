;Lyte.Mixin.register( "lyte-nested-grouping", {
    do_separation : function( content, group_order ){
		var options = {},
		spl_key = "Others", // i18n needed?
		len = group_order.length,
		content_len = content.length;

		for( var i = 0; i < content_len; i++ ){
			var item = content[ i ];

			for( var j = 0; j < len; j++ ){
				var prop = group_order[ j ],
				grp = options[ prop ] || ( options[ prop ] = {} ),
				value = item[ prop ],
				inner_grp;

				if( !value && typeof value != "number" ){
					value = spl_key; 
				}

				inner_grp = grp[ value ] || ( grp[ value ] = new Set() );
				inner_grp.add( item );
			}
		}

		return options;
	},

	find_intersection : function( options, group_order, ref_options ){
		var len = group_order.length;

		for( var i = 1; i < len; i++ ){
			var item = group_order[ i ],
			item_options = options[ item ],
			new_ref = {};
				
			for( var ref_key in ref_options ){
				var ref_cur = ref_options[ ref_key ];
					for( var key in item_options ){
						var cur = item_options[ key ],
						intersection = ref_cur.intersection( cur );

						if( intersection.size ){
							new_ref[ `${ref_key}_._${ key }` ] = intersection;
						}
					}
			}
			ref_options = new_ref;
		}
		return ref_options;
	},

	do_arrange : function( obj ){
		var new_content = [],
		__map = {};

		for( var key in obj ){
			var value = obj[ key ],
			split = key.split( "_._" ),
			split_len = split.length,
			str = "",
			__parent = new_content,
			prev_parents = [];

			for( var j = 0; j < split_len; j++ ){
				var split_cur = split[ j ];
				str += `_._${ split_cur }`,
				newly_created = false,
				cur = __map[ str ] || ( newly_created = __map[ str ] = { name : split_cur, rows : [], isGroup : !!split[ j + 1 ], level : j, count : 0, overall_count : 0 } ),
				exst_content = cur.rows;
				prev_parents.push( cur );
				newly_created && __parent.push( cur );
				__parent = exst_content;
			}

			var __new_arr = Array.from( value );

			__parent.push.apply( __parent, __new_arr.map( function( item, index ){
				return {
					data : item,
					index : index
				}
			} ) );

			prev_parents.forEach( function( item ){
				item.overall_count = ( item.count += __new_arr.length );
			} )
		}

		// var new_content = {};

		// for( var key in obj ){
		// 	var value = obj[ key ],
		// 	split = key.split( "_._" ),
		// 	split_len = split.length,
		// 	__parent = new_content;
			
		// 	for( var j = 0; j < split_len; j++ ){
		// 		var split_cur = split[ j ],
		// 		cur = __parent[ split_cur ] || ( __parent[ split_cur ] = {} );

		// 		__parent = cur;
		// 	}

		// 	__parent.content = Array.from( value );
		// }

		return new_content;
	},

	is_already_grouped : function( content ){
		var __first = content[ 0 ];

		if( __first ){
			var __name = __first.name,
			__rows = __first.rows;

			if( __name && typeof __name == "string" && __rows && ( __rows || [] ).length ){
				return true;
			}
		}

		return false;
	},

	preprocess_grp : function( arr, level, __parent ){
		var __arr = [],
		len = arr.length,
		overall_count = 0;

		for( var i = 0; i < len; i++ ){
			var item = arr[ i ],
			rows = item.rows,
			obj = {
				name : item.name,
				level : level,
				original_data : item,
				parent_data : __parent
			},
			has_not_count = !item.hasOwnProperty( 'count' ),
			__count = 0; 

			if( rows ){
				if( obj.isGroup = this.is_already_grouped( rows ) ){
					var ret = this.preprocess_grp( rows, level + 1, item );
					obj.rows = ret.arr;
					// if( has_not_count ){
						__count += ret.overall_count;
					// }
				} else {
					obj.rows = rows.slice();

					// if( has_not_count ){
						__count += rows.length;
					// }
				}
			}

			obj.overall_count = __count
			overall_count += __count;

			if( has_not_count ){
				obj.count = __count;
			} else {
				obj.count = item.count;
			}

			__arr.push( obj );
		}

		return {
			arr : __arr,
			count : has_not_count ? overall_count : item.count,
			overall_count : overall_count
		}
	},

	do_grouping : function( header, content, group_order ){

		var ret;

		if( this.is_already_grouped( content ) ){
			ret = this.preprocess_grp( content, 0 ).arr;
		} else {
			var options = this.do_separation( content, group_order ),
			ref_options = options[ group_order[ 0 ] ],
			ret = this.do_arrange( this.find_intersection( options, group_order, ref_options ) );
		}
		
		return header ? this.do_summarize( header, ret ) : ret;
	},

	do_summarize : function( header, arr ){
		header.forEach( function( item ){
			var __summarize = item.data.summary;

			if( !__summarize ){
				return;
			}

			var __prop = item.data.prop,
			__fn = function( arr ){

				var ret;

				switch( __summarize ){
					case "add" : {
						ret = 0;
					}
					break;

					case "unique" : {
						ret = new Set();
					}
					break;

					case "min" : {
						ret = Infinity;
					}
					break;

					case "max" : {
						ret = -Infinity;
					}
					break;
				}

				arr.forEach( function( item ){
					if( item.hasOwnProperty( 'isGroup' ) ){
						var __summary = item.summary || ( item.summary = {} ),
						cur_ret = __fn( item.rows );

						switch( __summarize ){
							case "add" : {
								ret += cur_ret;
							}
							break;
							
							case "unique" : {
								ret = ret.union( cur_ret );
								cur_ret = Array.from( cur_ret );
							}
							break;
							
							case "min" : {
								ret = Math.min( ret, cur_ret );
							}
							break;
							
							case "max" : {
								ret = Math.max( ret, cur_ret );
							}
							break;
						}

						__summary[ __prop ] = cur_ret;
					} else {
						switch( __summarize ){
							case "add" : {
								ret += item.data[ __prop ];
							}
							break;
							
							case "unique" : {
								ret.add( item.data[ __prop ] );
							}
							break;

							case "min" : {
								ret = Math.min( ret, item.data[ __prop ] );
							}
							break;
							
							case "max" : {
								ret = Math.max( ret, item.data[ __prop ] );
							}
							break;
						}
					};
				} );
				return ret;
			};

			__fn( arr );
		} );

		return arr;
	}
});