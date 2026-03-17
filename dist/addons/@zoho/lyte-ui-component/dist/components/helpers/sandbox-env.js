/**
 * Known issues
 * 1. setting global function via innerHTML
 * 2. Creating script element
 * 3. Anonymus function inside a function handler window is accessible. Need to add use strict;
 * $Lt.document.addEventListener( "focusin", function( evt ){
        "use strict";
        ( function(){debugger
            console.log( evt, this, evt.target, evt.relatedTarget, evt.view, evt.currentTarget )
        } )();
    } )
 * 4. can't use typeof ==> solved
 * 5. arguments.constructor
 * 6. $Lt.document.querySelector( 'input' ).value  = $Lt.String( "hai" ) ==> solved
 * 7. Insteadof returning proxy for non object shall we override the prototypes?
 * 8. 1 + $Lt.Object()
 * 
 * 
 * 1. With Content security policy we can prevent eval
 * 2. with use strict we can prevent window access via this
 */

;( function(){
    "use strict";
    var document_proxy_map = new WeakMap(),
    window_proxy_map = new WeakMap(),
    other_proxy_map = new WeakMap(),
    other_proxy_reverse_map = new WeakMap(),
    general_proxy_map = new Map(), // clear this in widget destroy
    widget_map = new WeakMap(),
    is_native = function( native ){
        return /\[native code\]/i.test( native.toString() );
    },
    proxy_running = false,

    other_proxies = function( obj, outer_prop, allow_fns ){
        var ret = other_proxy_map.get( obj );
        if( ret ){
            return ret;
        }
        ret = new Proxy( obj, {
            get( target, prop, receiver ){
                if( prop == "lyteTarget" ){
                    return "otherProxy";
                }   
                var ret = target[ prop ];    

                if( typeof ret == "function" ){
                    if( allow_fns ){
                        ret = function_spy( allow_fns, obj, receiver, ret );
                    } else {
                        throw_error( prop, outer_prop );
                    }
                }
                return ret;
            },
            set( _, prop ){
                throw_error( prop, outer_prop, "modify" );
            }
        } );
        other_proxy_map.set( obj, ret );
        other_proxy_reverse_map.set( ret, obj );
        return ret;
    },

    argument_check = function( arg, target ){
        if( arg instanceof Window ){
            return window_proxy( target );
        } else if( arg instanceof Document || arg instanceof ShadowRoot ){
            return window_proxy( target ).document;
        } else if( arg instanceof Node || arg instanceof HTMLElement ){

            var param = arg;
            if( arg.lyteTarget ){
                param = other_proxy_map.get( arg );
            }

            if( target.contains( param ) || is_in_nested_shadow( target, param ) ){ 
                return arg;
            }

            if( !arg.isConnected ){// need to verify this
                return arg;
            }

            return window_proxy( target ).document;
        }
        return arg;
    },

    is_in_nested_shadow = function( outer_shadow, arg ){
        while( arg ){
            var act_shadow = arg.getRootNode();
            if( act_shadow instanceof ShadowRoot ){
                if( widget_map.get( act_shadow ) ){
                    return outer_shadow ? act_shadow == outer_shadow : act_shadow;
                }
                arg = act_shadow.host;
            } else {
                return false;
            }
        }
        
        return false;
    }, 

    function_spy = function( scope, target, receiver, original, frm_self, frm_new ){

        if( original.lyteTarget ){
            return original;
        }

        var __ret,
        ___ = function(){
            var args = Array.from( arguments ),
            to_ret,
            old_proxy_running = proxy_running,
            is_new = !!new.target,
            is_native_fn = !is_new && is_native( original );

            proxy_running = receiver;

            args.forEach( function( arg, index ){

                if( typeof arg == "function" ){
                    args[ index ] = function_spy( general_proxy( scope || receiver, scope || receiver, scope || receiver, target, receiver ), target, receiver, arg, true, is_new );
                } else if( frm_self || !is_native_fn ){
                    var ret_arg = argument_check( arg, target );

                    if( arg == ret_arg && arg ){
                        if( typeof arg == "object" && !arg.lyteTarget ){
                            ret_arg = general_proxy( arg, arg, arg, target, receiver );
                        }
                    } 
                    args[ index ] = ret_arg;
                } else {
                    switch( arg.lyteTarget ){
                        case "window" : {
                            args[ index ] = window;
                        }
                        break;
                        case "document" : {
                            args[ index ] = target;
                        }
                        break;
                        case "otherProxy" :
                        case "general" : {
                            args[ index ] = other_proxy_map.get( arg );
                        }
                        break;
                    }
                } 
            });

            if( frm_self && frm_new ){
                scope = this;
            } else if( is_new ){
                to_ret = new original( ...args );
            }
            
            var final_ret = to_ret || original.apply( scope, args );
            proxy_running = old_proxy_running;
            return general_proxy( final_ret, final_ret, final_ret, target, receiver );
        }

        __ret = general_proxy( ___, scope, original, target, receiver );

        return __ret;
    },

    general_proxy = function( to_spy, scope, original, target, receiver ){
        if( typeof to_spy == "undefined" || to_spy == null || to_spy.lyteTarget ){
            return to_spy;
        }   

        var exst = other_proxy_reverse_map.get( original );

        if( exst ){
            return exst;
        }

        if( typeof to_spy != "object" && typeof to_spy != "function" ){

            // if( general_proxy_map.has( original ) ){
            //     return general_proxy_map.get( original );
            // }

            // to_spy = {
            //     value : to_spy
            // };
            return to_spy;

            // to_spy = new to_spy.constructor( to_spy );
        }

        if( to_spy instanceof Window ){
            return window_proxy( to_spy );
        } else if( to_spy instanceof Document ){
            return window_proxy( to_spy ).document;
        } 

        var __ret = new Proxy( to_spy, {
            get( _, prop ){

                if( original == Object && /define|getown/i.test( prop ) ){
                    throw_error( prop, "Object", "access" );
                }

                var old_proxy_running = proxy_running;
                proxy_running = __ret;

                if( typeof prop == "symbol"  && prop == Symbol.toPrimitive ){
                    return function( hint ){
                        switch( hint ){
                            case "string" : {
                                return original.toString();
                            }
                            break;
                            case "number" : {
                                return Number( original );
                            }
                            break;
                            case "default" : {
                                if( typeof original == "object"  ){
                                    return original.toString();
                                }
                                return original;
                            }
                            break;
                            // default : { // safer check
                            //     return original;
                            // }
                        }
                    };
                }

                switch( prop ){
                    case "lyteTarget" : {
                        return "general";
                    }
                    break;
                    case "prototype" : 
                    case "constructor" :{
                        var __cur = original[ prop ];
                        return general_proxy( __cur, original, __cur, target, receiver );
                    }
                    break;
                }

                var ret = original[ prop ];
                if( typeof ret == "function" ){
                    return function_spy( original, target, receiver, ret ); 
                }
                proxy_running = old_proxy_running;
                ret = argument_check( ret, target );

                return general_proxy( ret, ret, ret, target, receiver );
            },
            set( target, prop, value ){
                if( /constructor|prototype/i.test( prop ) || typeof value == "function" || ( target && target.constructor.prototype == target ) ){
                    throw_error( prop, "function", "modify" );
                }
                target[ prop ] = value && value.lyteTarget ? other_proxy_map.get( value ) : value;
                return true;
            },
            apply( fn, __this, args ){
                var __scope = __this || scope,
                new_args = args.map( function( item ){
                    return general_proxy( item, item, item, target, receiver );
                } );
                return fn.apply( general_proxy( __scope, __scope, __scope, target, receiver ), new_args );
            }
        });

        other_proxy_map.set( __ret, original );
        if( typeof original != "object" && typeof original != "function" ){
            general_proxy_map.set( original, __ret );
        } else {
            other_proxy_reverse_map.set( original, __ret );
        }
        return __ret;
    },

    window_proxy = function( obj){
        var exst = window_proxy_map.get( obj );
        if( exst ){
            return exst;
        }

        widget_map.set( obj, true );

        var ret = new Proxy( obj, {
            get(  target, prop, receiver ){
                var __ret;
                switch( prop ){
                    case "lyteTarget" : {
                        __ret = "window";
                    }
                    break;
                    case "getLyteScope" : {
                        return function( __this ){
                            return argument_check( __this, target );
                        }
                    }    
                    break;
                    case "fetch" : {
                        return function(){
                        var args = Array.from( arguments );
                        return new Promise( function( res, rej ){
                            // add frame handlings handlings
                            debugger;
                        } );
                        }
                    }
                    break;
                    case "localStorage" : 
                    case "eval" :
                    case "postMessage" : 
                    case "Function" : {
                        throw_error( prop, "window" );
                    }
                    break;
                    case "location" :
                    case "navigator" : {
                        return other_proxies( window[ prop ], prop );
                    }
                    break;
                    case "setTimeout" :
                    case "setInterval" :{
                        __ret = function(){
                            var args = Array.from( arguments );
                            if( typeof args[ 0 ] == "function" ){
                                return window[ prop ].apply( window, args );
                            }
                            throw_error( `Can't use string inside ${ prop }` );
                        }
                    }
                    break;
                    case "getSelection" : {
                        __ret = target[ prop ].bind( target );   
                    }
                    break;  
                    case "addEventListener" : 
                    case "removeEventListener" : {
                        return bind_evt.bind( target, prop, window );
                    }
                    break;
                    case "document" : {
                        return document_proxy( target );
                    }
                    break;
                    default : { 
                        var __des = Object.getOwnPropertyDescriptor( window, prop );
                        if( !__des || __des.value ){
                            if( !__des || ( typeof __des.value == "function" && !is_native( __des.value ) ) || ( typeof __des.value == "object" && __des.value.toString() == '[object Object]' ) ){
                                return void 0;
                            }
                        }

                        __ret = window[ prop ];
                    }
                }

                if( __ret ){
                    if( typeof __ret == "function" ){ 
                        __ret = function_spy( window, target, receiver, __ret );
                        }

                        __ret =  argument_check( __ret, target ); 

                    __ret = general_proxy( __ret, __ret, __ret, target, receiver );
                }
                return __ret;
            },
        
            set( _, prop ){
                throw_error( prop, "window", "modify" );
            }
        } );

        window_proxy_map.set( obj, ret );
        return ret;
    },

    document_proxy = function( obj ){
        var exst = document_proxy_map.get( obj );
        if( exst ){
            return exst;
        }
        var ret = new Proxy( obj || {}, {
            get( target, prop, receiver ){
                var __ret;
                switch( prop ){
                    case "lyteTarget" : {
                        return "document";
                    }
                    break;
                    case "head" :
                    case "host" : 
                    case "title" :
                    case "cookie" : 
                    case "innerHTML" :
                    case "write" :
                    case "eval" :
                    case "open" : 
                    case "documentElement" :
                    case "Reflect" : {
                        throw_error( `document.${ prop } is not allowed to access` );
                    }
                    break;
                    case "location" : {
                        return other_proxies( window[ prop ], prop );
                    }
                    break;
                    case "getElementsByClassName" : 
                    case "getElementsByTagName" : {
                        __ret = function( __class ){
                            return target.querySelectorAll( ( /tag/i.test( prop ) ? "" : "." ) + __class );
                            };
                    }
                    break; 
                    case "getElementsByName" : {
                        __ret = function( __name ){
                            return target.querySelectorAll( `[name=${ __name }]` );
                            };
                    }
                    break;
                    case "body" : {
                        return receiver;
                    }   
                    break;
                    case 'hasFocus' : {
                        return function(){
                            var __ret = !!target.activeElement;
                            return general_proxy( __ret, __ret, __ret, target, receiver );
                        };
                    }
                    break;
                    case "addEventListener" : 
                    case "removeEventListener" : {
                        return bind_evt.bind( target, prop, document );
                    }
                    break;
                    default : {
                        var __ret = target[ prop ],
                        custom_target = target;

                        if( __ret == void 0 ){
                            custom_target = document;
                            __ret = document[ prop ];

                            if( __ret instanceof Window ){
                                __ret = window_proxy_map.get( target );
                            } else if ( __ret instanceof Document ){
                                __ret = receiver;
                            } else if( typeof __ret == "function" ){
                                if( !( is_native( __ret ) && /^create/i.test( prop ) ) ){
                                    throw_error( `document.${ prop } is not allowed to access` );
                                }
                            } else if( __ret instanceof Node ){
                                __ret = argument_check( __ret, target );
                            } else if( typeof __ret == "object" ){
                                throw_error( `document.${ prop } is not allowed to access` );
                            }
                        } else if( typeof __ret == "function" ){
                            if( !( is_native( __ret ) )  ){
                                throw_error( `document.${ prop } is not allowed to access` );
                            }
                        }
                    }

                    if( __ret ){
                        if( typeof __ret == "function" ){
                            __ret = function_spy( custom_target, target, receiver, __ret );
                        } else {
                            __ret = general_proxy( __ret, __ret, __ret, target, receiver );
                        }
                    }
                    return __ret;
                }
            },
    
            set( _, prop ){
                throw_error( prop, "document", "modify" );
            }
        });

        document_proxy_map.set( obj, ret );
        return ret;
    },

    throw_error = function( msg, prop, ops ){
        throw new Error( prop ? `You can't ${ ops || "use" } "${ msg }" property in the ${ prop }` : msg );
    },

    bind_evt  = function( prop, scope, evt, handler, use_capture ){
        var shadow = this,
        cb_fn = handler.__lyteWrappedFn || ( handler.__lyteWrappedFn = function( evt ){
            var __target = evt.target;

            if( widget_map.get( __target.shadowRoot ) ){ 
                return;
            }

            var __scope = argument_check( this, shadow );
            return handler.call( __scope, general_proxy( evt, evt, evt, shadow, __scope ) );
        }),
        mod_us_cap = use_capture;

        if( scope instanceof Window && evt == "scroll" ){
            mod_us_cap = true;
        }
        
        shadow[ prop ]( evt, cb_fn, mod_us_cap );
        scope[ prop ]( evt, cb_fn, use_capture );
        
    },

    default_props_proxy_map = new WeakMap(),
    original_function = Function,

    add_fn_proxy = function( fn ){
        Object.defineProperty( fn, 'constructor', {
            writable : false,
            enumerable : false,
            configurable : true,
            value : function_proxy
        } );
    },

    function_proxy = new Proxy( original_function, {
        get( target, prop, receiver ){
            switch( prop ){
                case "lyteTarget" : {
                    return "function";
                }
                break;
            }
            var ret = target[ prop ];
            if( ret && ret.constructor == original_function ){
                add_fn_proxy( ret );
            }
            return ret;
        },

        set(){
            throw_error( "prop", "Function", "modify" );
        },

        apply( fn, scope, args ){
            if( args.length ){
                throw_error( `Can't create a function with the argument "${ args[ 0 ]}"` )
            }
            var ret = fn.apply( scope, args );

            if( ret.constructor == original_function ){
                add_fn_proxy( ret );
            }
            return ret;
        }
    }),

    default_props_proxy = function( obj ){ // handle revert case
        var exst = default_props_proxy_map.get( obj );
        if( exst || !obj ){
            return exst;
        }

        default_props_proxy_map.set( obj, true );

        var keys = Object.getOwnPropertyNames( obj );

        keys.forEach( function( key ){
            try{
                var desc = Object.getOwnPropertyDescriptor( obj, key );
                if( typeof desc.value == "function" ){
                    var value = obj[ key ];
                    if( value instanceof Promise ){
                        return;
                    }

                    if( typeof value == "function" ){

                        if( !value.lyteTarget && value.constructor == original_function ){
                            add_fn_proxy( value );
                        }

                        if( !value.lyteTarget ){
                            default_props_proxy( value );
                            default_props_proxy( value.prototype );
                        }
    
                        if( desc.configurable ){
                            Object.defineProperty( obj, key, {
                                writable : false,
                                configurable : true,
                                enumerable : desc.enumerable,
                                value : desc.value   
                            });
                            default_props_proxy_map.set( obj, desc );
                        }
                    }
                }
            }catch( e ){
                return;
            }
        } );
    };

    default_props_proxy( window );
    default_props_proxy( document );

    window.generateProxy = window_proxy;
} )();