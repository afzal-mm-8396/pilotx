;( function(){

    function clone_style( styles, tag, original_tag, fake_wrapper, container ){
        var eq_node = fake_wrapper.shadowRoot.querySelector( original_tag ),
        eq_style = window.getComputedStyle( eq_node ),
        container_style = window.getComputedStyle( container ),
        len = styles.length,
        str = "",
        table_tags_skip = /^table|tr|thead|tbody|th|td$/i.test( tag ) ? [ "left", "top", "transform", "position", "display", "height", "block-size", "transform-origin", "min-width" ] : [],
        parent_styles_to_check = [ "font-size", "font-family", "color", "box-sizing", "background-color", "text-wrap-mode", "outline-color", "border-left-color", "border-right-color", "border-top-color", "border-bottom-color" ];

        for( var i = 0; i < len; i++ ){
            var cur = styles[ i ],
            __value = styles[ cur ];

            if( /^none|auto|inherit|unset|normal$/i.test( __value ) || /^animation|transition|\-webkit|caret/i.test( cur ) || /block|inline|perspective|column|cursor|emphasis/i.test( cur ) ){
                continue;
            }

            if( __value == "0px" || __value == 0 || table_tags_skip.indexOf( cur ) + 1 || eq_style[ cur ] == __value  ){
                continue;
            }

            if( parent_styles_to_check.indexOf( cur ) + 1 ){
                if( container_style[ cur ] == __value ){
                    continue;
                }   
            }
            
            str += `${ cur }: ${ __value };`;
        }

        return str;
    }

    function convert2table( common_container, selected, wrapper_nodes, start_map, need_style ){
        var attrs_to_skip = [ "class", "id", "role", "fixed", "resize", "aria-live", "aria-label", "lyte-rendered-ce", "lyte-rendered", "scope", "tabindex" ],
        elems_to_skip = [ "lyte-tablehead-resize" ];

        if( need_style ){
            attrs_to_skip.push.apply( attrs_to_skip, [ "style" ] );
        }

        var conversion_span = document.createElement( "span" ),
        cache_conversion = {},
        lyte_comp_check  = function( attributes, tag ){
            return attributes[ "lyte-rendered" ] || attributes[ "lyte-rendered-ce" ] ? "div" : tag;
        },
        __fn = function( nodes, tag_map, __str, __map, container ){
            var node_len = nodes.length,
            str = '',
            prev_index = 0;

            for( var j = 0; j < node_len; j++ ){
                var item = nodes[ j ],
                tag = ( item.tagName || "" ).toLowerCase(),
                original_tag = tag,
                attrs = item.attributes || [],
                attr_len = attrs.length,
                __attr_str = "",
                cur_map = __map[ j ],
                cur_index = undefined,
                has_tag_map = tag_map[ tag ];

                if( cur_map ){
                    cur_index = cur_map[ 0 ] || 0;
                    cur_map.shift();
                }
                // Need to remove this $L usage
                if( elems_to_skip.indexOf( tag ) + 1 || $L( item ).hasClass( "lyteCopySkip" ) ){
                    if( cur_map ){
                        cur_map = undefined;
                        __map = [];
                        prev_index = cur_index;
                    }
                    continue;
                }

                for( var i = 0; i < attr_len; i++ ){
                    var attr = attrs[ i ],
                    __name = attr.nodeName;

                    if( attrs_to_skip.indexOf( __name ) + 1 ){
                        continue;
                    }

                    __attr_str += ` ${ __name }='${ attr.nodeValue }'`;
                }

                tag = tag_map[ tag ] || tag;

                if( tag ){
                    if( __str ){
                        tag = has_tag_map ? tag : lyte_comp_check( attrs, tag );
                        __str = str = `<${ tag }${ __attr_str.replace( /\s+$/g, "" ) }>${ __str }</${ tag }>`;
                    } else {

                        if( need_style ){
                            var eq_node = container.childNodes[ cur_index == void 0 ? ( j + ( prev_index || 0 ) ) : cur_index ];
                            __value = clone_style( window.getComputedStyle( eq_node ), tag, original_tag, need_style, container );
                            
                            __attr_str += ` style='${ __value }'`;

                            if( cur_index != void 0 ){
                                prev_index = cur_index;
                            }
                        }
                        tag = has_tag_map ? tag : lyte_comp_check( attrs, tag );
                        str += `<${ tag }${ __attr_str.replace( /\s+$/g, "" ) }>${ __fn( item.childNodes, tag_map, void 0, [ cur_map ], eq_node ) }</${ tag }>`;
                    }
                } else {
                    var __value = item.nodeValue,
                    converted_value = cache_conversion[ __value ];

                    if( converted_value == void 0 ){
                        conversion_span.innerText = item.nodeValue;
                        converted_value = cache_conversion[ __value ] = conversion_span.innerHTML;
                    }
                    str += converted_value;
                }
            }
            return str;
        },
        tag_map = {
            "lyte-tr" : "tr",
            "lyte-th" : "th",
            "lyte-td" : "td",
            "lyte-tbody" : "tbody",
            "lyte-thead" : "thead",
            "lyte-table-structure" : "table"
        },
        str = __fn( selected.childNodes || [], tag_map, "", [ start_map ], common_container );

        return __fn( wrapper_nodes, tag_map, str, [], common_container );
    }

    function get_all_wrappers( node ){
        var arr = [];

        while( !/lyte\-table\-structure/i.test( node.tagName ) ){
            arr.push( node );
            node = node.parentNode;
        }

        arr.push( node );
        return arr;
    }

    function create_map( range, fake_common ){
        var common_container = fake_common,
        start = range.startContainer,
        __fn = function( node ){
            var map = [];

            while( node != common_container ){
                if( node.contains( common_container ) ){
                    break;
                }

                map.unshift( Array.from( node.parentNode.childNodes ).indexOf( node ) );
                node = node.parentNode;
            }

            return map;
        };
        
        return __fn( start );
    }

    function remove_duplicate( fragment ){
        var __map = {},
        all = Array.from( fragment.querySelectorAll( "*" ) ),
        new_frag = new DocumentFragment();

        all.forEach( function( item ){
            var tag = item.tagName;

            if( !__map[ tag ] ){
                item.style.cssText = "";
                item.innerHTML = "";
                new_frag.appendChild( item );
                __map[ tag ] = true;
            }
        });
        
        return new_frag;
    }

    function forward_check( nodes, has_table ){
        var len = nodes.length,
        res;

        for( var i = 0; i < len; i++ ){
            var cur = nodes[ i ];

            if( !cur.tagName ){
                if( cur.nodeValue.trim() ){
                    return false;
                }
            } else if( cur == has_table ){
                return true;
            } else {
                res = forward_check( cur.childNodes, has_table )
               
                if( res != void 0 ){
                    return res;
                }
            }
        }

        return res;
    }

    function backward_check( nodes, has_table ){
        var len = nodes.length,
        res; 

        for( var i = len - 1; i >= 0; i-- ){
            var cur = nodes[ i ];

            if( !cur.tagName ){
                if( cur.nodeValue.trim() ){
                   return false;
                }
            } else if( cur == has_table ){
                return true;
            }
            else {
                res = backward_check( cur.childNodes, has_table )
               
                if( res != void 0 ){
                    return res;
                }
            }
        }

        return res;
    }

    function copy2clip( evt, need_style ){ 
        if( evt.defaultPrevented ){
            return;
        }
        var selection = window.getSelection();
        if( selection.rangeCount ){
            var range = selection.getRangeAt( 0 ),
            common_container = range.commonAncestorContainer,
            is_lyte_table = false,
            fake_wrapper,
            is_table_part = /^lyte\-(table\-structure|tr|thead|tbody)$/i.test( common_container.tagName || "" ),
            __cloned = range.cloneContents();

            if( !is_table_part ){
                var has_table = __cloned.querySelector( "lyte-table-structure" );
                if( has_table ){
                    var cloned_child = __cloned.childNodes;
                    if( forward_check( cloned_child, has_table ) && backward_check( cloned_child, has_table ) ){
                        is_table_part = true;
                        is_lyte_table = true;
                        common_container = common_container.querySelector( "lyte-table-structure" );
                    }
                }
            }

            if( is_table_part ){
                if( is_lyte_table ){
                    var __table = __cloned.querySelector( 'lyte-table-structure' );
                    __cloned = new DocumentFragment();

                    Array.from( __table.childNodes ).forEach( function( item ){
                        __cloned.appendChild( item );
                    });
                }

                if( need_style ){
                    fake_wrapper = document.createElement( "div" );
                    fake_wrapper.style.cssText = "position: absolute; top: -9999px; left: -9999px; width: 0; height: 0; overflow: hidden;";
                    fake_wrapper.attachShadow( { mode : "open" } );
                    fake_wrapper.shadowRoot.appendChild( remove_duplicate( range.cloneContents() ) );
                    document.body.appendChild( fake_wrapper );
                }

                var str = convert2table( common_container, __cloned, get_all_wrappers( common_container ), create_map( range, common_container ), fake_wrapper ),
                data = evt.clipboardData || window.clipboardData;

                if( data ){
                    data.setData( 'text/html', str );	
                    data.setData( 'text/plain', selection.toString() );
                } else {
                    var __fn = function(){
                        selection.removeAllRanges();
                        selection.addRange( range );
                    };
                    _lyteUiUtils.copy2clip( str, __fn, __fn );
                }

                if( need_style ){
                    fake_wrapper.remove();
                }

                return true;
            }
        }
    }

    _lyteUiUtils.copyTable = copy2clip;
} )();