/**
 * To reduce the DOM weight, this plugin is used to show only the visible columns of the table.
 * Fully written on table's context
 */

;( function(){  

    var __className = 'lyteLazyViewContainer',
    data_name = "lazyView";

    function destroy(){
        var __this = this,
        len = __this.length;

        for( var i = 0; i < len; i++ ){
            var el = __this.eq( i ),
            options = el.data( data_name ),
            elem = el.get( 0 );
            
            if( options ){
                el.removeClass( __className );
                container = options.outerContainer ? elem.closest( options.outerContainer ) || elem : elem;
                show_all( el.get( 0 ), options );
                container.removeEventListener( "mouseenter", enter_handler, true );
                container.removeEventListener( "mouseleave", leave_handler, true );
                container.removeEventListener( "focusin", focus_handler, true );
                container.removeEventListener( "focusout", focus_handler, true );
            }
        }
    }

    function enter_handler( evt ){
        var __target = evt.currentTarget;

        if( __target != evt.target || __target.__lazyMouseenter ){
            return;
        }

        __target.__lazyMouseenter = true;

        if(  __target.__lazyFocused ){
            return;
        }

        $L.fastdom.clear( __target.__lazyfast );

        var $target = $L( __target );

        show_all( __target, $target.find( '.' + __className ).eq( 0 ).data( data_name ) || $target.data( data_name ) );
    }

    function focus_handler(){
        var active = document.activeElement,
        __container = this,
        is_active = __container.contains( active );

        if( is_active ){
           if( __container.__lazyFocused ){
                return;
           }
           __container.__lazyFocused = true;

           if(  __container.__lazyMouseenter ){
                return;
           }
           
           $L.fastdom.clear( __container.__lazyfast );
           var $container = $L( __container );
           show_all( __container, $container.find( '.' + __className ).eq( 0 ).data( data_name ) || $container.data( data_name ) );
        } else {
            if( __container.__lazyFocused == void 0 || __container.__lazyMouseenter ){
                delete __container.__lazyFocused;
                return;
            }
            delete __container.__lazyFocused;
            check_view( __container.getElementsByClassName( __className )[ 0 ] || __container );
        }
    }

    function leave_handler( evt ){
        var __target = evt.currentTarget;
        if( __target != evt.target || __target.__lazyMouseenter == void 0 ){
            return;
        }

        delete __target.__lazyMouseenter;

        if( __target.__lazyFocused ){
            return;
        }
        check_view( __target.getElementsByClassName( __className )[ 0 ] || __target );
    }

    function modify( cell, to_style ){
        var tr = cell.parentNode,
        index = Array.from( tr.children ).indexOf( cell ),
        thead = tr.parentNode,
        tbody = thead.nextElementSibling,
        rows = Array.from( tbody.children ),
        len = rows.length;

        cell.style.display = to_style;

        Lyte.Component._setIgnoreDisconnect( true );

        for( var i = 0; i < len; i++ ){
            var __row = rows[ i ],
            __node,
            __children = __row.children,
            fake_children = __row.__fake_children || ( __row.__fake_children = {} );

            if( !to_style ){
                __node = fake_children[ index ];
                if( __node ){
                    __row.insertBefore( __node, __children[ index ] );
                    delete fake_children[ index ];
                }
            } else {
                __node = __children[ index ];
                fake_children[ index ] = __node;
                __node.remove();
            }
            // rows[ i ].children[ index ].style.display = to_style;
        }

        Lyte.Component._setIgnoreDisconnect( false );
    }

    function show_all( elem, options ){

        if( !options ){
            return;
        }

        var headers = Array.from( elem.getElementsByTagName( options.selector ) ),
        len = headers.length,
        table = elem.getElementsByTagName( options.table )[ 0 ];

        elem.__lazyfast = $L.fastdom.measure( function(){
            var sL = elem.scrollLeft;

            $L.fastdom.mutate( function(){
                for( var i = 0; i < len; i++ ){
                    modify( headers[ i ], "" );
                }
        
                table.style.width = parseFloat( table.style.width ) + options.paddingLeft + options.paddingRight + "px";

                table.style.paddingInlineEnd = table.style.paddingInlineStart = "0px";
                elem.scrollLeft = options.scrollLeft;
                options.scrollLeft = options.paddingLeft = options.paddingRight = 0;

                elem.scrollLeft = sL;
            });
        });
    }   

    function apply( options ){
        var __this = this,
        len = __this.length;

        for( var i = 0; i < len; i++ ){
            var el = __this.eq( i ),
            elem = el.get( 0 ),
            obj =  $L.extend( {
                selector : "lyte-th",
                table : "lyte-table-structure",
                outerContainer : ".lyteGridstackHandler",
                paddingLeft : 0,
                paddingRight : 0
            }, options );

            if( el.data( data_name ) ){
                continue;
            }

            el.data( data_name, obj ).addClass( __className );

            var container = obj.outerContainer ? elem.closest( obj.outerContainer ) || elem : elem;

            container.addEventListener( "mouseenter", enter_handler, true );
            container.addEventListener( "mouseleave", leave_handler, true );
            container.addEventListener( "focusin", focus_handler, true );
            container.addEventListener( "focusout", focus_handler, true );

            check_view( elem );
        }
    }

    function check_view( elem ){
        var $elem = $L( elem ),
        __data = $elem.data( data_name );

        if( !__data ){
            return;
        }

        $L.fastdom.clear( elem.__lazyfast );

        elem.__lazyfast = $L.fastdom.measure( function(){
            var sL = elem.scrollLeft,
            paddingLeft = __data.paddingLeft,
            paddingRight = __data.paddingRight,
            bcr = elem.getBoundingClientRect(),
            elems = Array.from( elem.getElementsByTagName( __data.selector ) ).map( function( item ){
                var is_visible = true,
                item_bcr = item.getBoundingClientRect();
                
                if( bcr.left > item_bcr.right ){
                    is_visible = false;
                    paddingLeft += item_bcr.width;
                } else if( bcr.right < item_bcr.left ){
                    is_visible = false;
                    paddingRight += item_bcr.width;
                }

                return {
                    elem : item,
                    bcr : item_bcr,
                    is_visible : is_visible
                };
            } ),
            table = elem.getElementsByTagName( __data.table )[ 0 ],
            table_width = table.style.width;

            if( table_width.indexOf( 'px' ) == -1 ){
                table_width = table.offsetWidth + "px";
            }

            $L.fastdom.mutate( function(){
                var len = elems.length;

                for( var i = len - 1; i >= 0; i-- ){
                    var item = elems[ i ],
                    is_visible = item.is_visible;
                    modify( item.elem, is_visible ? "" : "none" );
                }

                table.style.paddingInlineEnd = ( __data.paddingRight = paddingRight ) + "px";
                table.style.paddingInlineStart = ( __data.paddingLeft = paddingLeft ) + "px";
                table.style.width = parseFloat( table_width ) - paddingLeft - paddingRight + "px";
                
                elem.scrollLeft = sL;
            } );
        } );
    }

    $L.prototype.lazyView = function( options ){
        options = options || {};

        var __this = this;

        if( options == "destroy" ){
            destroy.call( __this );
        } else {
            apply.call( __this, options );
        }
    }
} )();