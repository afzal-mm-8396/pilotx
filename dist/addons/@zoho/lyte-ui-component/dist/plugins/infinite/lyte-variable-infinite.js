;( function( cb ){
	if( typeof define == "function" && define.amd ){
		define( [ "@zoho/lyte-dom" ], cb );
	} else {
		cb( _lyteUiUtils.isWidget ? $L : window.$L );
	}
} )( function( $L ){
    function check_intersections( int ){
        var dom = this,
        data = $L( dom ).data( "lyteVariableInfinite" ),
        is_top = int.target.classList.contains( "lyteVariableInfinite" + ( data.scrollDirection == "horizontal" ? "InlineStart" : "Top" ) ),
        ratio = int.intersectionRatio,
        is_visible = !!ratio || int.isIntersecting;

        if( data.renderContent.length && data.scrollCheck ){
            return;
        }

        if( is_visible ){
            if( is_top ){
                handle_top.call( dom, int );
            } else {
                handle_bottom.call( dom, int );
            }
            return true;
        }
    }

    function call_fastdom( data, ns, fn ){
        if( data.mouseIsDown ){
            fn();
        } else {
            if( ns == "requestAnimationFrame" ){
                return window.requestAnimationFrame( fn );
            }
            return $L.fastdom[ ns ]( fn );
        }
    }

    function update_content( index, new_chunk_index, data, dom ){

        var before_update = data.onBeforeUpdate,
        after_update = data.onAfterUpdate,
        before_render = data.onBeforeRender,
        after_render = data.onAfterRender,
        originalContent = data.originalContent, 
        renderContent = data.renderContent,
        on_initial_update = data.onInitialUpdate,
        is_already_rendered = renderContent.length,
        arrayUtils = data.arrayUtils,
        objectUtils = data.objectUtils;

        if( !is_already_rendered && typeof on_initial_update === "function" ){
            renderContent = [];
        }

        for( var i = index; i < new_chunk_index; i++ ){
            var cur = originalContent[ i ],
            ref_index = i - index,
            exst = renderContent[ ref_index ];

            if( exst ){

                if( exst.body === cur && exst.index === i ){
                    continue;
                }

                if( typeof before_update === "function" ){ 
                    before_update.call( dom, ref_index, i, cur, dom, exst );
                }

                if( typeof objectUtils != "undefined" ){
                    objectUtils( exst, 'add', "body", cur );
                    objectUtils( exst, 'add', "index", i );
                }

                if( typeof after_update === "function" ){   
                    after_update.call( dom, ref_index, i, cur, dom, exst );
                }

            } else {
                var __obj = { 
                    body : cur, 
                    index : i
                };

                if( typeof before_render === "function" ){
                    before_render.call( dom, ref_index, i, cur, dom, __obj );
                }

                if( typeof arrayUtils != "undefined" ){
                    arrayUtils( renderContent, 'insertAt', ref_index, __obj );
                }

                if( typeof after_render === "function" ){
                    after_render.call( dom, ref_index, i, cur, dom, __obj );
                }
            }
        }

        if( !is_already_rendered && on_initial_update ){
            on_initial_update.call( dom, renderContent, originalContent );
            data.renderContent = renderContent;
        }

        if( dom.classList.contains( 'lyteSortableParent' ) ){
            var elems = Array.from( dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow)' ) ),
            __class = dom.getSortableClass(),
            __index = data.sortableIndex,
            original_cls = 'lyteInfiniteOriginalSortableElement';

            elems.forEach( function( elem ){
                if( !elem.classList.contains( __class ) ){
                    elem.classList.add( 'sortable-element', __class );
                }
                elem.classList.remove( original_cls );
            });

            if( typeof __index == "number" ){
                var render_index;

                renderContent.every( function( rec, index ){
                    if( rec.index == __index ){
                        render_index = index;
                        return false;
                    }
                     return true;
                });

                if( typeof render_index == "number" ){
                    elems[ render_index ].classList.add( original_cls );
                }
            }
        }
    }

    function get_from_bcr( bcr, prop, data, __innerWidth ){
        var is_rtl = data.writingDirection == "rtl",
        is_horizontal = data.scrollDirection === "horizontal";

        if( is_horizontal ){
            switch( prop ){
                case "top" : {
                    return is_rtl ? ( __innerWidth - bcr.right ) : bcr.left;
                }
                break;
                case "bottom" : {
                    return is_rtl ? ( __innerWidth - bcr.left ) : bcr.right;
                }
                break;
                case "height" : {
                    return bcr.width;
                }
                break;
                case "scrollTop" : {
                    if( bcr ){
                        return bcr.scrollLeft;
                    }
                    return "scrollLeft"; 
                }
                break;
                case "scrollHeight" : {
                    return bcr.scrollWidth;
                }
                break;
                case "offsetHeight" : {
                    return bcr.offsetWidth;
                }
                break;
            }
        } else {
            return bcr ? bcr[ prop ] : prop;
        }
    }

    function handle_top( int, new_index ){  
         var dom = this,
        data = $L( dom ).data( "lyteVariableInfinite" ),
        top_elem = int.target,
        bottom_elem = data.bottomElem,
        originalContent = data.originalContent,
        renderContent = data.renderContent,
        moreRecords = data.moreRecordsTop,
        index = data.index,
        render_length = renderContent.length,
        original_length = originalContent.length,
        content_length = Math.min( data.contentLength, original_length ),
        new_chunk_index =  index + content_length,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", data ),
        scroll_top = dom[ __scroll_top_var ],
        elems = Array.from( data.elems || ( render_length ? ( data.elems = dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow)' ) ) : [] ) ),
        root_bcr = int.rootBounds,
        hidden_count = 0,
        visible_count = 0,
        height_adjust = 0,
        buffer = render_length ? ( data.buffer || 1 ) : 0,
        avg_height = data.averageHeight,
        padding_start = 0,
        inner_width = window.innerWidth,
        __diff = Math.max( 0, get_from_bcr( int.boundingClientRect, "bottom", data, inner_width ) - get_from_bcr( root_bcr, "top", data, inner_width ) ),
        __margin = parseFloat( data.margin ) || 0/*,
        __map = data.height_map*/;

        if( data.callback_called ){
            if( data.direction === "up" ){
                dom.__prev_scrolltop = dom[ __scroll_top_var ] = data[ __scroll_top_var ];
                return;
            } else {
                delete data.callback_called;
                delete data[ __scroll_top_var ];
                delete data.direction;
            }
        }

        elems.forEach( function( elem, index ){
            var bcr = elem.getBoundingClientRect(),
            hgt = get_from_bcr( elem, "offsetHeight", data );

            // __map.set( renderContent[ index ].body, hgt );

            avg_height = Math.max( avg_height, hgt );

            if( get_from_bcr( bcr, "top", data, inner_width ) >=  get_from_bcr( root_bcr, "bottom", data, inner_width ) - __margin ){
                hidden_count++;
            } else {
                visible_index = index;
                visible_count++;
                
                if( index == 0 ){
                    var diff_hgt = Math.max( 0, get_from_bcr( bcr, "top", data, inner_width ) - get_from_bcr( root_bcr, "top", data, inner_width ) - __margin );

                    if( diff_hgt ){
                        height_adjust += diff_hgt * Math.round( hgt / get_from_bcr( bcr, "height", data, inner_width ) );
                    }
                }
            }
       });

       if( render_length && avg_height ){
            var __app_count = Math.round( __diff / avg_height );

            if( __app_count > 2 ){
				var min_visible_count = Math.round( ( get_from_bcr( root_bcr, "height", data, inner_width ) - 2 * __margin ) / avg_height ) + buffer + 1;
                new_index = index - __app_count;
				hidden_count = Math.min( render_length - min_visible_count, hidden_count + __app_count );
				visible_count = render_length - hidden_count;
				height_adjust = 0;
            }
       }

       if( typeof new_index == "number" ){
           new_index = Math.min( new_index, original_length - content_length );

           index = new_index;
       }

       if( hidden_count ){
            index -= ( hidden_count + content_length - buffer );
       }
    
       new_chunk_index = index + content_length;
       data.averageHeight = Math.max( data.averageHeight, avg_height );

       if( new_chunk_index > original_length ){
            new_chunk_index = original_length;
            index = Math.max( 0, new_chunk_index - content_length );
       }

       if( index < 0 ){
            var old_index = index,
            render_length = renderContent.length;
            
            if( moreRecords && data.index == content_length ){
                if( render_length ){
                    var cb = data.onScrollStart;

                    if( typeof cb === "function" ){
                        var ret = cb.call( dom, originalContent, renderContent, index, new_chunk_index, dom ),
                        __fn = function(){
                            var new_index = originalContent.indexOf( renderContent[ 0 ].body );
                            data.index = data.index + new_index;
                            handle_top.call( dom, int );
                        };

                        if( ret ){
                            if( ret.then ){
                                data.callback_called = true;
                                data.direction = "up";
                                data[ __scroll_top_var ] = scroll_top;

                                var common_fn = function(){
                                    delete data.callback_called;
                                    delete data[ __scroll_top_var ];
                                    delete data.direction;
                                };

                                ret.then( function(){
                                    if( data.callback_called ){
                                        common_fn();
                                        __fn();
                                    }
                                }).catch( common_fn );  
                            } else {
                                __fn();
                            }
                        } else {
                            if( originalContent.length > original_length ){
                                __fn();
                            } else {
                                data.direction = "up";
                                data.callback_called = true;
                                data[ __scroll_top_var ] = scroll_top;
                            }
                        }
                    }  
                    return;
                } else {
                    // it won't be called. remove this code
                    padding_start = moreRecords ? 100 : 0;
                    index = 0;
                    new_chunk_index = Math.min( content_length, originalContent.length );
                }
            } else {
                if( render_length ){
                    if( data.index == content_length ){
                        return;
                    }
                    index = 0;
                    new_chunk_index = content_length;
                } else {
                    padding_start = moreRecords ? 100 : 0;
                    index = 0;
                    new_chunk_index = Math.min( content_length, originalContent.length );
                }
            }

            buffer += Math.max( 0, index - old_index );
       } else if( index == 0 ){
            if( moreRecords ){
                padding_start = 100;
            } else if( data.index == content_length && render_length ){
                return;
            }
       }

       update_content( index, new_chunk_index, data, dom );
       
       data.callback_called = true;
       data.direction = "up";
       data[ __scroll_top_var ] = scroll_top;

       data.scheduled = true;

       call_fastdom( data, "measure", function(){
            var hgt_measured = 0,
            __limit = content_length - visible_count - buffer;

            if( render_length ){
                for( var i = 0; i < __limit; i++ ){
                    var elem = elems[ i ];
                    if( elem ){
                        var __hgt = get_from_bcr( elem, "offsetHeight", data );
                        hgt_measured += __hgt;
                        // __map.set( renderContent[ i ].body, __hgt );
                    }
                }
            }

            if( !avg_height ){
                if( hgt_measured ){
                    avg_height = hgt_measured / __limit;
                } else {
                    avg_height = 100;
                }
            }

            var exp_scroll_top = ( data.moreRecordsTop ? 1 : 0 ) + ( index * avg_height + height_adjust + hgt_measured + padding_start ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 ),
            on_before_position_update = data.onBeforePositionUpdate,
            exp_top =  Math.max( padding_start, index * avg_height ),
            cur_top = parseFloat( top_elem.style[ data.propertyTop ] ) || 0;

			exp_scroll_top += ( dom[ __scroll_top_var ] - scroll_top );

            if( typeof on_before_position_update === "function" ){
                on_before_position_update.call( dom, root_bcr, exp_top - cur_top - ( exp_scroll_top - scroll_top ), dom );
            }

            call_fastdom( data, "mutate", function(){

                data.custom_scroll = data.mouseIsDown;

                top_elem.style[ data.propertyTop ] = exp_top + "px";
				
                // if( data.mouseIsDown && !moreRecords && !data.preventFrequentUpdate ){
                //     var exst_bottom = parseFloat( bottom_elem.style[ data.propertyBottom ] ) || 0;
                //     bottom_elem.style[ data.propertyBottom ] = ( exst_bottom + Math.abs( exp_top - cur_top ) ) + "px";
                // } else {
                    bottom_elem.style[ data.propertyBottom ] = Math.max( data.moreRecordsBottom ? 1 : 0, ( original_length - new_chunk_index ) * avg_height ) + "px";
                // }

                if( !data.mouseIsDown /*|| !data.preventFrequentUpdate*/ ){
                    dom.__prev_scrolltop = dom[ __scroll_top_var ] = exp_scroll_top;
                }

                data.index = new_chunk_index;

				if( typeof on_before_position_update === "function" ){
					on_before_position_update.call( dom, dom.getBoundingClientRect(),0, dom );
				}

                window.requestAnimationFrame( function(){
                    delete data.scheduled;
                    delete data.callback_called;
                    delete data[ __scroll_top_var ];
                    delete data.direction;
					
                    window.requestAnimationFrame( function(){
                        delete data.custom_scroll;
                        if( data.scrollCheck ){
                            scroll_handler.call( dom, { target : dom } );
                        }
                    } );
                });
            });
        });
    }

    function handle_bottom( int, new_index, frm_rec ){
        var dom = this,
        data = $L( dom ).data( "lyteVariableInfinite" ),
        bottom_elem = int.target,
        top_elem = data.topElem,
        originalContent = data.originalContent,
        renderContent = data.renderContent,
        moreRecords = data.moreRecordsBottom,
        index = data.index,
        original_length = originalContent.length,
        content_length = Math.min( data.contentLength, original_length ),
        new_chunk_index =  index + content_length,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", data ),
        scroll_top = dom[ __scroll_top_var ],
		render_length = renderContent.length,
        elems = Array.from( data.elems || ( render_length ? ( data.elems = dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow)' ) ) : [] ) ),
        root_bcr = int.rootBounds,
        inner_width = window.innerWidth,
        hidden_count = 0,
        visible_count = 0,
        height_adjust = 0,
        buffer = frm_rec ? 0 : ( data.buffer || 1 ),
        avg_height = data.averageHeight,
        __margin = parseFloat( data.margin ) || 0,
        __diff = Math.max( 0, get_from_bcr( root_bcr, "bottom", data, inner_width ) - __margin - get_from_bcr( int.boundingClientRect, "top", data, inner_width ) ),
        fake_buffer = 0/*,
        height_map = data.height_map*/;

        if( data.mouseIsDown && !moreRecords ){
            var measured_bcr = bottom_elem.getBoundingClientRect(),
            measured_diff = Math.max( 0, get_from_bcr( root_bcr, "bottom", data, inner_width ) - __margin - get_from_bcr( measured_bcr, "top", data, inner_width ) );

            if( measured_diff == 0 ){
                return;
            }
        }

        if( data.callback_called ){
            if( data.direction === "down" ){
                if( data[ __scroll_top_var ] == void 0 ){
                    return;
                }
                dom[ __scroll_top_var ] = data[ __scroll_top_var ];
                return;
            } else {
                delete data.callback_called;
                delete data[ __scroll_top_var ];
                delete data.direction;
            }
        }

       elems.slice(0).reverse().forEach( function( elem, index ){
            var bcr = elem.getBoundingClientRect(),
            hgt = get_from_bcr( elem, "offsetHeight", data );

            // height_map.set( renderContent[ elems.indexOf( elem ) ].body, hgt );

            avg_height = Math.max( avg_height, hgt );

            if( get_from_bcr( bcr, "bottom", data, inner_width ) <= get_from_bcr( root_bcr, "top", data, inner_width ) + __margin ) {
                hidden_count++;
            } else {
                visible_count++;
                height_adjust += Math.max( 0, get_from_bcr( root_bcr, "top", data, inner_width ) + __margin - get_from_bcr( bcr, "top", data, inner_width ) ) * hgt / get_from_bcr( bcr, "height", data );
            }
       });

        if( render_length && avg_height ){
            var __app_count = Math.round( __diff / avg_height );

            if( __app_count > 2 ){
                new_index = index + __app_count - content_length;
                height_adjust = -( 10 + get_from_bcr( dom, "offsetHeight", data ) );
                buffer = 0;
                fake_buffer = render_length;
            }
       }

       if( typeof new_index == "number" ){
           new_index = Math.min( new_index, original_length - content_length );

           index = new_index;
       }

       if( hidden_count ){
            index -= ( visible_count + buffer );
       }
       index = Math.max( 0, index );
       new_chunk_index = index + content_length;

       data.averageHeight = Math.max( data.averageHeight, avg_height );

        if( data.index >= original_length ){
            if( moreRecords ){
                var cb = data.onScrollEnd;
                if( typeof cb === "function" ){
                    var ret = cb.call( dom, originalContent, renderContent, index, new_chunk_index, dom );

                    if( ret ){
                        if( ret.then ){
                            data.callback_called = true;
                            data.direction = "down";
                            data[ __scroll_top_var ] = scroll_top;

                            var common_fn = function(){
                                delete data.callback_called;
                                delete data[ __scroll_top_var ];
                                delete data.direction;
                            };

                            ret.then( function(){
                                if( data.callback_called ){
                                    common_fn();
                                    handle_bottom.call( dom, int, void 0, true );
                                }
                            } ).catch( common_fn );
                        } else {
                            handle_bottom.call( dom, int, void 0, true );
                        }
                    } else {
                        if( originalContent.length > original_length ){
                            handle_bottom.call( dom, int, void 0, true ); 
                        } else {
                            data.direction = "down";
                            data.callback_called = true;
                            data[ __scroll_top_var ] = scroll_top;
                        }
                    }
                }
                return;
            }
        } else if( new_chunk_index > original_length ){
            var __new_index = original_length - content_length;

            buffer += ( index - __new_index );
            index = __new_index;
            new_chunk_index = original_length;
        }

        if( data.index == original_length ){
            return;
        }

        update_content( index, new_chunk_index, data, dom );

        data.callback_called = true;
        data.direction = "down";
        data[ __scroll_top_var ] = scroll_top;

        data.scheduled = true;

        call_fastdom( data, "measure", function(){
            var hgt_measured = 0;

            for( var i = 0; i < ( fake_buffer || buffer ); i++ ){
                var elem = elems[ content_length - i - 1 ];
                if( elem ){
                    var __hgt = get_from_bcr( elem, "offsetHeight", data );
                    hgt_measured += __hgt;
                    // height_map.set( renderContent[ content_length - i - 1 ].body, __hgt );
                }
            }

            if( !avg_height ){
                if( hgt_measured ){
                    avg_height = hgt_measured / buffer;
                } else {
                    avg_height = 100;
                }
            }

            var exp_scroll_top = ( data.moreRecordsTop ? 1 : 0 ) + ( index * avg_height + height_adjust + hgt_measured ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 ),
            on_before_position_update = data.onBeforePositionUpdate,
            top_to_be = Math.max( 0, index * avg_height ),
            exst_top = parseFloat( top_elem.style[ data.propertyTop ] ) || 0;

			exp_scroll_top += ( dom[ __scroll_top_var ] - scroll_top );

            if( typeof on_before_position_update === "function" ){
                on_before_position_update.call( dom, root_bcr, top_to_be - exst_top - ( exp_scroll_top - scroll_top ), dom );
            }

            call_fastdom( data, "mutate", function(){

                data.custom_scroll = data.mouseIsDown;

                var /*exst_bottom = parseFloat( bottom_elem.style[ data.propertyBottom ] ) || 0,*/
                cur_bottom = Math.max( data.moreRecordsBottom ? 1 : 0, ( original_length - new_chunk_index ) * avg_height );

                bottom_elem.style[ data.propertyBottom ] = cur_bottom + "px";

                // if( data.mouseIsDown && !moreRecords && !data.preventFrequentUpdate ){
                //     var exst_top = exst_top;
                //     top_elem.style[ data.propertyTop ] = ( exst_top + Math.abs( cur_bottom - exst_bottom ) ) + "px";
                    // exp_scroll_top = ( data.moreRecordsTop ? 1 : 0 ) + ( ( exst_top + Math.abs( cur_bottom - exst_bottom ) ) + height_adjust + hgt_measured ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 );
                // } else {
                    top_elem.style[ data.propertyTop ] = top_to_be + "px";
                // }

                if( !data.mouseIsDown /*|| !data.preventFrequentUpdate*/ ){
                    dom.__prev_scrolltop = dom[ __scroll_top_var ] = exp_scroll_top;
                }
                data.index = new_chunk_index;

				if( typeof on_before_position_update === "function" ){
					on_before_position_update.call( dom, dom.getBoundingClientRect(),0, dom );
				}

                window.requestAnimationFrame( function(){
                    delete data.scheduled;
                    delete data.callback_called;
                    delete data[ __scroll_top_var ];
                    delete data.direction;

                    window.requestAnimationFrame( function(){
                        delete data.custom_scroll;
                        if( data.scrollCheck ){
                            scroll_handler.call( dom, { target : dom } );
                        }
                    });
                });
            });
        });
    }

    function intersection( ints ){
        ints.every( function( int ){
            var ret = check_intersections.call( this, int );
            return !ret;
        }.bind( this ) );
    }

    function scroll_handler( evt ){

        if( evt.target != this ){
            return;
        }

        var dom = this,
        __data = $L( dom ).data( "lyteVariableInfinite" ),
        scroll_speed = __data.scrollSpeed,
        scroll_update  = __data.onScrollUpdate,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", __data ),
        mouseIsDown = __data.mouseIsDown;

		dom.__$scrollLeft = dom.scrollLeft;
        dom.__$scrollTop = dom.scrollTop;

        if( typeof scroll_update === "function" ){
            scroll_update.call( dom, dom );
        }
        
        if( scroll_speed && !mouseIsDown ){
            var prev = dom.__prev_scrolltop,
            cur = dom[ __scroll_top_var ],
            diff = cur - prev,
            custom = false,
            half_scroll = scroll_speed / 2;

            if( diff > scroll_speed ){
                cur = dom.__prev_scrolltop = prev + scroll_speed;
                custom = true;
            } else if( diff < -half_scroll ){
                custom = true;
                cur = dom.__prev_scrolltop = Math.max( 0, prev - half_scroll );
            }
            
            dom.__prev_scrolltop = cur;

            if( custom ){
                dom[ __scroll_top_var ] = cur;
                evt.preventDefault();
                evt.stopPropagation();
            }
        }

        if( __data.custom_scroll ||  __data.scheduled ){
            // dom[ __scroll_top_var ] = dom.__prev_scrolltop;
            return;
        }

        if( evt.type && __data.preventFrequentUpdate /*&& __data.scrollCheck*/ && mouseIsDown && !__data.scheduled ){
            clearTimeout( __data.__scroll_time );
            __data.__scroll_time = setTimeout( function(){
                delete __data.__scroll_time;
                scroll_handler.call( this, { target : this } );
            }.bind( this ), 100 );
            return;
        }

        // $L.fastdom.clear( dom.__fdm );

        ( __data.scrollCheck || mouseIsDown ) && ( dom.__fdm = $L.fastdom.measure( function(){
            delete dom.__fdm;
            if( __data.scheduled ){
                return;
            }

            var top_elem = __data.topElem,
            bottom_elem = __data.bottomElem,
            inner_width = window.innerWidth,
            avg_height = Math.max( 100, __data.averageHeight || 0 ),
            bottom_bcr = bottom_elem.getBoundingClientRect(),
            top_bcr = top_elem.getBoundingClientRect(),
            root_bcr = dom.getBoundingClientRect(),
            top_overflow = ( top_bcr.height || !__data.renderContent.length ) && Math.max( 0,  get_from_bcr( top_bcr, "bottom", __data, inner_width ) - get_from_bcr( root_bcr, "top", __data, inner_width ) ),
            bottom_overflow = ( bottom_bcr.height || !__data.renderContent.length ) && Math.max( 0, get_from_bcr( root_bcr, "bottom", __data, inner_width ) - get_from_bcr( bottom_bcr, "top", __data, inner_width ) );

            if( avg_height ){
                $L.fastdom.mutate( function(){
                    if( top_overflow ){
                        handle_top.call( dom, { boundingClientRect : top_bcr, target : top_elem, rootBounds : root_bcr } );
                    } else if( bottom_overflow ){
                        handle_bottom.call( dom, { boundingClientRect : bottom_bcr, target : bottom_elem, rootBounds : root_bcr } );
                    }
                });
            }
        }) );
    }

    function mousedown_handler( evt ){
        var dom = this,
        __data = $L( dom ).data( "lyteVariableInfinite" );

        if( evt.target === dom ){
            __data.mouseIsDown = true;
            document.addEventListener( 'mouseup', __data.__mouseup = __data.__mouseup || mouseup_handler.bind( this ), true );
            dom.classList.add( 'lyteVariableInfiniteScrollMousedown' );
        }
    }

    function mouseup_handler(){
        var dom = this,
        __data = $L( dom ).data( "lyteVariableInfinite" );

        __data.mouseIsDown = false;
        document.removeEventListener( 'mouseup', __data.__mouseup, true );
        delete __data.__mouseup;
        dom.classList.remove( 'lyteVariableInfiniteScrollMousedown' );

        if( __data.__scroll_time ){
            clearTimeout( __data.__scroll_time );
            delete __data.__scroll_time;
            scroll_handler.call( this, { target : this } );
        } else {
            reset.call( $L( this ), true, true );
        }
    }

    function setup_infinite( __dom, __data ){
        var is_table = __data.isTable,
        is_lyte_table = __dom.classList.contains( "lyteTableScroll" ),
        query = __data.placeholderElement || ( is_table ? "td" : "div" ),
        top_elem = document.createElement( query ),
        bottom_elem = document.createElement( query ),
        ns = "lyteVariableInfinite",
        is_horizontal = __data.scrollDirection === "horizontal",
        int_obs = __data.scrollCheck ? void 0 : new IntersectionObserver( intersection.bind( __dom ), { threshold : [ 0 ], root : __dom, rootMargin : __data.margin } );
        bottom_elem.className = top_elem.className = ns + "Placeholder";
        top_elem.classList.add( ns + ( is_horizontal ? "InlineStart" : "Top" ) );
        bottom_elem.classList.add( ns + ( is_horizontal ? "InlineEnd" : "Bottom" ) ),
        original_dom = __dom;

        top_elem.style[ __data.propertyTop ] = "0px";
        bottom_elem.style[ __data.propertyBottom ] = "0px";

        __dom.addEventListener( 'scroll', scroll_handler, true );
        __dom.addEventListener( 'mousedown', mousedown_handler, true );

        if( is_table ){
            var row_name = is_lyte_table ? "lyte-tr" : "tr",
            tr1 = document.createElement( row_name ),
            tr2 = document.createElement( row_name ),
            custom_cls = 'lyteInfiniteCustomRow';

            tr1.classList.add( custom_cls );
            tr2.classList.add( custom_cls );
            
            top_elem.colSpan = bottom_elem.colSpan = ( __dom.querySelector( is_lyte_table ? "lyte-thead lyte-tr" : "thead tr" ) || {} ).children.length;

            tr1.appendChild( top_elem );
            tr2.appendChild( bottom_elem );

            __dom = __dom.querySelector( is_lyte_table ? "lyte-tbody" : "tbody" );

            __dom.insertBefore( tr1, __dom.firstChild );
            __dom.appendChild( tr2 );
        } else {
            __dom.insertBefore( top_elem, __dom.firstChild );
            __dom.appendChild( bottom_elem );
        }

        __data.observer = int_obs;
        __data.topElem = top_elem;
        __data.bottomElem = bottom_elem;

        if( __data.scrollCheck ){
            scroll_handler.call( original_dom, { target : original_dom } );
        } else {
            int_obs.observe( top_elem );
            int_obs.observe( bottom_elem );
        }

        // __data.height_map = new WeakMap();
    }

    function update_horizontal_props( options ){
        var __fn = function( prop ){
            switch( prop ){
                case "height":{
                    return "width";
                }
                break;
                case "paddingTop":{
                    return "paddingInlineStart";
                }
                break
                case "paddingBottom":{
                    return "paddingInlineEnd";  
                }
                break;
                default:{
                    return prop;
                }
            }
        };

        options.propertyTop = __fn( options.propertyTop );
        options.propertyBottom = __fn( options.propertyBottom );
    }

    function apply_infinite( __cur, options ){
        var ns = "lyteVariableInfinite"

        if( __cur.data( ns ) ){
            return;
        }

        var def_options = {
            originalContent : [],
            renderContent : [],
            moreRecordsBottom : true,
            moreRecordsTop : false,
            contentLength : 10,
            initialRecord : 0,
            averageHeight : 0,
            buffer : 1,
            isTable : false,
            scrollCheck : false,
            propertyTop : "height",
            propertyBottom : "height",
            margin : "0px",
            arrayUtils : typeof Lyte != "undefined" ? Lyte.arrayUtils : void 0,
            objectUtils : typeof Lyte != "undefined" ? Lyte.objectUtils : void 0,
            scrollDirection : "vertical",
            writingDirection : "ltr",
            preventFrequentUpdate : false
        },
        __dom = __cur.addClass( 'lyteVariableInfiniteScroll' ).get( 0 );

        $L.extend( def_options, options );

        if( def_options.scrollDirection === "horizontal" ){
            update_horizontal_props( def_options );
        }

        // def_options.index = Math.min( def_options.contentLength, def_options.originalContent.length ) + def_options.initialRecord;
        def_options.index = Math.min( def_options.initialRecord, Math.max( 0, def_options.originalContent.length - def_options.contentLength ) );
        __cur.data( ns, def_options );

        setup_infinite( __dom, def_options );
    }

    function destroy(){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data ){
            return;
        }

        if( data.mouseIsDown ){
            mouseup_handler.call( this );
        }

        __cur.removeClass( 'lyteVariableInfiniteScroll' ).removeData( ns );

        if( data.observer ){
            data.observer.disconnect();
            delete data.observer;
        }

        var top = data.topElem,
        bottom = data.bottomElem;

        if( data.isTable ){
            top.parentNode.remove();
            bottom.parentNode.remove();
        } else {
            top.remove();
            bottom.remove();
        }

        delete data.topElem;
        delete data.bottomElem;
        delete data.elems;
        
        dom.removeEventListener( 'scroll', scroll_handler, true );
        dom.removeEventListener( 'mousedown', mousedown_handler, true );
    }

    function reset( maintain_index, __ignore_force_update ){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data ){
            return;
        }

        var top_elem = data.topElem,
        bottom_elem = data.bottomElem,
        renderContent = data.renderContent,
        bcr = dom.getBoundingClientRect(),
        arrayUtils = data.arrayUtils,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", data ),
        render_len = renderContent.length,
        __index = data.index - ( maintain_index ? render_len : 0 ),
        __elems = data.elems,
        __innerWidth = window.innerWidth,
        extra_scroll = 0;

       if( maintain_index ){
            if( __elems ){
                var __left_value = get_from_bcr( bcr, 'top', data, __innerWidth );

                Array.from( __elems ).every( function( item ){
                    var item_bcr = item.getBoundingClientRect();
                    if( __left_value > get_from_bcr( item_bcr, 'bottom', data, __innerWidth ) ){
                        __index++;
                        return true;
                    }
                    extra_scroll += Math.max( 0, __left_value - get_from_bcr( item_bcr, 'top', data, __innerWidth ) )
                } );
            } else {
                extra_scroll = dom[ __scroll_top_var ];
            }
        }

        if( maintain_index ){
            __cur.infinite( 'scrollToIndex', Math.max( 0, __index ), __ignore_force_update == void 0 || __ignore_force_update, extra_scroll );
        } else {
            bottom_elem.style[ data.propertyBottom ] = top_elem.style[ data.propertyTop ] = 0;
            dom.__prev_scrolltop = dom[ __scroll_top_var ] = 0;

            if( typeof arrayUtils == "undefined" ){
                renderContent.splice( 0, renderContent.length );
            } else {
                arrayUtils( renderContent, 'removeAt', 0, renderContent.length );
            }

            data.index = 0;
            data.averageHeight = 0;

            delete data.elems;
            delete dom.__prev_scrolltop;
            
            window.requestAnimationFrame( function(){
                handle_top.call( dom, { boundingClientRect : top_elem.getBoundingClientRect(), target : top_elem, rootBounds : bcr } );
            });
        }
    }

    function update_props( options ){
        var __cur = this,
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data ){
            return;
        }

        $L.extend( data, options );
    }

    function scroll_to_index( __new_index, __force, additional_offset ){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data ){
            return;
        }

        var top_elem = data.topElem,
        buffer = data.buffer || 1,
        new_index = __new_index - buffer,
        bottom_elem = data.bottomElem,
        new_chunk_index,
        originalContent = data.originalContent,
        original_length = originalContent.length,
        content_length = Math.min( data.contentLength, original_length ),
        avg_height = data.averageHeight || 100,
        is_end_reached = data.callback_called && data.direction === "down";

        if( new_index < 0 ){
            buffer += new_index;
            new_index = 0;
        } else if( new_index + content_length > original_length ){
            buffer += ( new_index + content_length - original_length );
            new_index = Math.max( 0, original_length - content_length );
        }

        new_chunk_index = new_index + content_length;

        if( data.index != new_chunk_index || __force ){
            update_content( new_index, new_chunk_index, data, dom );
        }

        window.requestAnimationFrame( function(){
            var new_hgt = 0,
            elems = Array.from( dom.querySelectorAll( data.records + ':not(.lyteInfiniteCustomRow)' ) ),
            __scroll_top_var = get_from_bcr( void 0, "scrollTop", data );

            for( var i = 0; i < buffer; i++ ){
                var elem = elems[ i ];
                if( elem ){
                    new_hgt += get_from_bcr( elem, "offsetHeight", data );
                }
            }

            if( is_end_reached ){
                delete data[ __scroll_top_var ];
            }

            top_elem.style[ data.propertyTop ] = new_index * avg_height + "px";
            bottom_elem.style[ data.propertyBottom ] = Math.max( data.moreRecordsBottom ? 1 : 0, ( original_length - new_chunk_index ) * avg_height ) + "px";
            dom.__prev_scrolltop = dom[ __scroll_top_var ] = ( new_index * avg_height + new_hgt + ( additional_offset || 0 ) ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 );
            data.index = new_chunk_index; 

            if( is_end_reached ){
                window.requestAnimationFrame( function(){
                    data[ __scroll_top_var ] = ( get_from_bcr( dom, "scrollHeight", data ) - get_from_bcr( dom, "offsetHeight", data ) ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 );
                });
            }
        });
    }

    function insert_row( insert_index, new_data, force ){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data || !new_data ){
            return;
        }

        if( !Array.isArray( new_data ) ){
            new_data = [ new_data ];
        }

        var new_chunk_index = data.index,
        originalContent = data.originalContent,
        original_length = originalContent.length,
        content_length = Math.min( data.contentLength, original_length ),
        index =  new_chunk_index - content_length,
        new_length = new_data.length,
        avg_height = data.averageHeight || 100,
        top_elem = data.topElem,
        bottom_elem = data.bottomElem,
        final_insert_chunk = insert_index + new_length,
        is_top_modification = final_insert_chunk < index,
        is_bottom_modification = insert_index >= new_chunk_index,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", data ),
        scroll_top = dom[ __scroll_top_var ],
        arrayUtils = data.arrayUtils;

        if( typeof arrayUtils == "undefined" ){
            originalContent.splice( insert_index, 0, ...new_data );
        } else {
            arrayUtils( originalContent, 'insertAt', insert_index, new_data );
        }

        if( !force && ( is_top_modification || is_bottom_modification ) ){
            if( is_top_modification ){
                index += new_length;
                new_chunk_index += new_length;

                top_elem.style[ data.propertyTop ] = ( index * avg_height ) + "px";
                // dom.__prev_scrolltop = dom[ __scroll_top_var ] = ( scroll_top + ( new_length * avg_height ) * ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 ) );
                scroll_to_index.call( __cur, index, true, true );
            } else if( is_bottom_modification ){
                bottom_elem.style[ data.propertyBottom ] = Math.max( data.moreRecordsBottom ? 1 : 0, ( original_length + new_length - new_chunk_index ) * avg_height ) + "px";
            }
            data.index = new_chunk_index;
        } else {
            data.index = new_chunk_index + new_length;
            scroll_to_index.call( __cur, insert_index + new_length - 1, true );
        }
    }

    function remove_row( remove_index, count ){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data ){
            return;
        }

        count = count || 1;

        var new_chunk_index = data.index,
        originalContent = data.originalContent,
        original_length = originalContent.length,
        content_length = Math.min( data.contentLength, original_length ),
        index =  new_chunk_index - content_length,
        final_remove_index = remove_index + count,
        is_top_modification = final_remove_index < index,
        is_bottom_modification = remove_index >= new_chunk_index,
        avg_height = data.averageHeight || 100,
        top_elem = data.topElem,
        bottom_elem = data.bottomElem,
        __scroll_top_var = get_from_bcr( void 0, "scrollTop", data ),
        scroll_top = dom[ __scroll_top_var ],
        ret,
        arrayUtils = data.arrayUtils;

        if( typeof arrayUtils == "undefined" ){
           ret = originalContent.splice( remove_index, count );
        } else {
            ret = arrayUtils( originalContent, 'removeAt', remove_index, count );
        }

        if( is_top_modification || is_bottom_modification ){
            if( is_top_modification ){
                index -= count;
                new_chunk_index -= count;

                update_content( index, new_chunk_index, data, dom );

                top_elem.style[ data.propertyTop ] = ( index * avg_height ) + "px";
                dom.__prev_scrolltop = dom[ __scroll_top_var ] = scroll_top - ( count * avg_height ) *  ( data.writingDirection == "rtl" && data.scrollDirection === "horizontal" ? -1 : 1 );
            } else if( is_bottom_modification ){
                bottom_elem.style[ data.propertyBottom ] = Math.max( data.moreRecordsBottom ? 1 : 0, ( original_length - count - new_chunk_index ) * avg_height ) + "px";
            }
            data.index = new_chunk_index;
        } else {
            data.index = new_chunk_index - count;
            scroll_to_index.call( __cur, remove_index - count, true );
        }

        return ret;
    }

    function move_row( from_index, to_index ){
        var __cur = this,
        dom = __cur.get( 0 ),
        ns = "lyteVariableInfinite",
        data = __cur.data( ns );

        if( !data || from_index === to_index ){
            return;
        }

        var originalContent = data.originalContent,
        __index = data.index,
        __content_length = Math.min( data.contentLength, originalContent.length ),
        remove_data = originalContent[ from_index ],
        buff = 0,
        arrayUtils = data.arrayUtils;

        if( typeof arrayUtils == "undefined" ){
            originalContent.splice( from_index, 1 );
            originalContent.splice( to_index, 0, remove_data );
        } else {
            arrayUtils( originalContent, 'removeAt', from_index, 1 );
            arrayUtils( originalContent, 'insertAt', to_index, remove_data );
        }
        
        update_content( Math.max( 0, __index - __content_length - buff ), data.index = ( __index - buff ), data, dom );
        
    }

    $L.prototype.infinite = function( options, props, value, force ){
        var __this = this,
        __len = __this.length;

        for( var i = 0; i < __len; i++ ){
            var __cur = __this.eq( i );

            switch( options ){
                case "destroy" : {
                    destroy.call( __cur );
                }
                break;
                case "reset" : {
                    reset.call( __cur, props );
                }
                break;
                case "update" : {
                    update_props.call( __cur, props );
                }
                break;
                case "scrollToIndex" : {
                    scroll_to_index.call( __cur, props, value, force );
                }   
                break;
                case "insert" : {
                    insert_row.call( __cur, props, value, force );
                }   
                break;
                case "remove" : {
                    return remove_row.call( __cur, props, value );
                }
                break;
                case "move" : {
                    move_row.call( __cur, props, value );
                }
                break;
                default : {
                    apply_infinite( __cur, options );
                }
            }
        }

        return __this;
    }
} );