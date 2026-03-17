;( function(){
    var __window = typeof window == "undefined" ? globalThis : window,
    extn_fns = {
        setup_ctx_context : function(){
            var obj  = {
                arr : [],
                fillStyle : "",
                __translate : "",
                __rotate : "",
                textAlign : ""
            };

            obj.fillRect = obj.rect = function( x, y, w, h ){
                this.arr.push({
                type : "rect",
                fill : this.fillStyle,
                x : x,
                y : y,
                w : w,
                h : h,
                translate : this.__translate,
                rotate : this.__rotate
                });
            };

            obj.arc = function( cx, cy, r ){
                this.arr.push({   
                type : "circle",
                fill : this.fillStyle,
                cx : cx, 
                cy : cy,
                r :  r
                });
            };

            obj.moveTo = function( x, y ){
                this.__str = `M ${ x } ${ y }`;
            };

            obj.arcTo = function( x, y, x1, y1 ){
                this.__str += ` Q ${ x } ${ y } ${ x1 } ${ y1 }`;
            };

            obj.lineTo = function( x, y ){
                this.__str += ` L ${ x } ${ y }`;
            }

            obj.fill = obj.beginPath = function(){
                var str = this.__str;
                
                if( str ){
                this.arr.push({
                    type : "path",
                    fill : this.fillStyle,
                    d : str
                })
                delete this.__str;
                }
            };

            obj.translate = function( x, y ){
                this.__translate = `translate(${ x }, ${ y })`;
            };

            obj.rotate = function( value ){
                this.__rotate = `rotate(${ value * 180 / Math.PI })`;
            }

            obj.restore = obj.save = function(){
                this.__translate = this.__rotate = "";
            }

            obj.fillText = function( text, x, y, width ){
                this.arr.push({
                    type : "text",
                    text : text,
                    x : x,
                    y : y,
                    width : width,
                    anchor : this.textAlign,
                    font : this.font,
                    stroke : this.fillStyle
                });
            }

            return obj;
      },

      construct_svg : function( ctx, width, height ){
        var fn = function( arr ){
            var __str = "";

            arr.forEach( function( item ){
                switch( item.type ){
                    case "rect": {
                        __str += `<rect x="${ item.x }" y="${ item.y }" width="${ item.w }" height="${ item.h }" fill="${ item.fill }" transform = "${ item.translate } ${ item.rotate }" />`;
                    }
                    break;
                    case "circle" : {
                        __str += `<circle cx="${ item.cx }" cy="${ item.cy }" r="${ item.r }" fill="${ item.fill }" />`;
                    }
                    break;
                    case "path" : {
                        __str += `<path d="${ item.d }" fill="${ item.fill }" />`;
                    }
                    break;
                    case "text" : {
                        var anchor = item.anchor,
                        __map = {
                            left : "start",
                            center : "middle",
                            right : "end"
                        };
                        __str += `<text font = "${ item.font }" stroke = "${ item.stroke }" fill = "${ item.stroke }" x="${ item.x }" y="${ item.y }" text-anchor="${ __map[ anchor ] || anchor }" style="max-width:${ item.width }px">${ item.text }</text>`;
                    }
                    break;
                }
            } );

            return __str;
        },
        str =  `<svg viewBox="0 0 ${ width } ${ height }" xmlns="${ "htt" }p://www.w3.org/2000/svg"><g>${ fn( ctx.arr ) }</g></svg>`;
        
        this.svg_blob = new Blob( [ str ], { type: "image/svg+xml" } );
        this.svg_string = str;
      }
    },
    instances_ns = [ "qr", "upc", "rss", "pdf417", "itf", "ean", "data_matrix" , "code93", "code39", "code", "aztec" ],
    $L = __window.$L;

    instances_ns.forEach( function( ns, index ){
        var cls_instance;
        if( $L ){
            cls_instance = ( $L[ ns.replace( '_', "" ) ] || {} ).class_instance;
        } else {
            cls_instance = __window[ `Lyte${ index ? `Barcode_` : "" }${ ns.replace( /^.|(_.)/g, function( m ){
                return m.replace( '_', "" ).toUpperCase()
            }) }` ];
        }

        if( cls_instance ){
            var __proto = cls_instance.prototype;
            __proto.setup_ctx_context = extn_fns.setup_ctx_context;
            __proto.construct_svg = extn_fns.construct_svg;
        }
    } );

} )();