;( function( cb ){
	if( typeof define == "function" && define.amd ){
		define( [ "@zoho/lyte-dom" ], cb );
	} else {
		cb( window.$L );
	}
} )( function( $L ){
    $L.prototype.infiniteSortable = function( options ) {
        if( typeof options == 'object' || !options ){
            options = options || {};
            options.restrict = options.restrict || '.lyteVariableInfinitePlaceholder,.lyteInfiniteCustomRow';
            options.clone = true;
            options.omitRestricted = true;
            
            options.helper = function( elem ){
                var dom = elem.closest( '.lyteVariableInfiniteScroll' ),
                data = $L( dom ).data( 'lyteVariableInfinite' ),
                elems = Array.from( dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow)' ) ),
                dom_index = elems.indexOf( elem ),
                item_data = data.renderContent[ dom_index ];
                
                data.sortableIndex = item_data.index;
                data.originalNode = elem;

                return elem.cloneNode( true );
            };
            
            var onBeforeDrop = options.onBeforeDrop,
            placeholder = options.onPlaceholder,
            enter = options.onEnter;

            options.onEnter = function(){            
                if( typeof enter == "function" ){
                    enter.apply( this, arguments );
                }
            };

            options.onPlaceholder = function( _1, _2, dom ){
                var data = $L( dom ).data( 'lyteVariableInfinite' ),
                original_node = data.originalNode;

                original_node.classList.add( 'lyteInfiniteOriginalSortableElement' );

                if( typeof placeholder == "function" ){
                    return placeholder.apply( this, arguments );
                }

            };

            options.onBeforeDrop = function( _1, below_elem, __placeholder, _2, _3, frm_container, to_container ){
                var data = $L( frm_container ).data( 'lyteVariableInfinite' ),
                dom = frm_container,
                original_node = data.originalNode,
                __fn = function(){
                    original_node.classList.remove( 'lyteInfiniteOriginalSortableElement' );
                };
                
                if( below_elem.classList.contains( 'lyteVariableInfiniteScroll' ) ){
                    __fn();
                    return false;
                }

                if( frm_container == to_container ){
                    var elems = Array.from( dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow):not(.sortable-helper)' ) ),
                    dom_index = Math.max( 0, elems.indexOf( below_elem ) - ( below_elem.previousElementSibling == __placeholder ? 1 : 0 ) ),
                    render_data = data.renderContent,
                    final_index = render_data[ dom_index ].index,
                    original_index = data.sortableIndex;

                    if( original_index == final_index ){
                        __fn();
                        return false;
                    }

                    var args = Array.from( arguments ),
                    __ret;

                    args.splice( 3, 2, original_index, final_index );

                    delete data.originalNode;
                    delete data.sortableIndex;

                    __fn();

                    if( typeof onBeforeDrop == "function" ){
                        __ret = onBeforeDrop.apply( this, args );
                    }

                    if( __ret != false ){
                        $L( frm_container ).infinite( 'move', original_index, final_index );
                    }
                } else {
                    var frm_elems = Array.from( frm_container.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow):not(.sortable-helper)' ) ),
                    to_elems = Array.from( to_container.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow):not(.sortable-helper)' ) ),
                    frm_dom_index = frm_elems.indexOf( original_node ),
                    to_dom_index = to_elems.indexOf( below_elem ),
                    $from_container = $L( frm_container ),
                    $to_container = $L( to_container ),
                    from_data = $from_container.data( 'lyteVariableInfinite' ),
                    to_data = $to_container.data( 'lyteVariableInfinite' );

                    if( !from_data || !to_data ){
                        return false;
                    }   

                    var from_render_data = from_data.renderContent,
                    to_render_data = to_data.renderContent,
                    original_index = from_render_data[ frm_dom_index ].index,
                    final_index = to_render_data[ to_dom_index ].index;

                    if( below_elem.nextElementSibling == __placeholder ){
                        final_index++;
                    }

                    var args = Array.from( arguments ),
                    __ret;

                    args.splice( 3, 2, original_index, final_index );

                    delete data.originalNode;
                    delete data.sortableIndex;

                    __fn();

                    if( typeof onBeforeDrop == "function" ){
                        __ret = onBeforeDrop.apply( this, args );
                    }

                    if( __ret != false ){
                        $to_container.infinite( 'insert', final_index, $from_container.infinite( 'remove', original_index ), true );
                    }
                }

                return false;
            };
        };
        
        if( this.length ){
            this.sortable( options );
        } else {
            setTimeout( function(){
                this.sortable( options );
            }.bind( this ) );
        }
    };
});