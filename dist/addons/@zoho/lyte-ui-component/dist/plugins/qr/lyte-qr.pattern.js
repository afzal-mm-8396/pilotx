;( function(){

    function addFinderPattern( ctx, pattern, unit_x, unit_y, quiet_zone, pts, fill_color, non_fill_color, finder_colors, background_color ){
        function draw( __pattern, ref_x, ref_y, size, color, off ){
            ctx.fillStyle = color;

            switch( __pattern ){
                case "circle" : {
                    var radius = size / 2;
                    ctx.arc( ( ref_x + radius ) * unit_x, ( ref_y + radius ) * unit_y, radius * unit_x, 0, 2 * Math.PI );
                }
                break;
                case "square" : {
                    ctx.rect( ref_x * unit_x, ref_y * unit_y, size * unit_x, size * unit_y );
                }
                break;
                case "squarearc" : {
                    var radius = off * unit_x;
                    ctx.moveTo( ( ref_x + off ) * unit_x, ref_y * unit_y );
                    ctx.lineTo( ( ref_x + size - off ) * unit_x, ref_y * unit_y );
                    ctx.arcTo( ( ref_x + size ) * unit_x, ref_y * unit_y, ( ref_x + size ) * unit_x, ( ref_y + off ) * unit_y, radius );
                    ctx.lineTo( ( ref_x + size ) * unit_x, ( ref_y + size - off ) * unit_y );
                    ctx.arcTo( ( ref_x + size ) * unit_x, ( ref_y + size ) * unit_y, ( ref_x + size - off ) * unit_x, ( ref_y + size ) * unit_y, radius );
                    ctx.lineTo( ( ref_x + off ) * unit_x, ( ref_y + size ) * unit_y );
                    ctx.arcTo( ref_x * unit_x, ( ref_y + size ) * unit_y, ref_x * unit_x, ( ref_y + size - off ) * unit_y, radius );
                    ctx.lineTo( ref_x * unit_x, ( ref_y + off ) * unit_y );
                    ctx.arcTo( ref_x * unit_x, ref_y * unit_y, ( ref_x + off ) * unit_x, ref_y * unit_y, radius );
                }
                break;
            }
            ctx.fill();
            ctx.beginPath();
        }

        var __split = pattern.split( "_" ),
        __outer = __split[ 0 ] || "square",
        __inner = __split[ 1 ],
        len = pts.length,
        __arr = [ 
            {
                x : 0,
                y : 0
            },
            {
                x : len - 7,
                y : 0
            },
            {
                x : 0,
                y : len - 7
            } 
        ];

        if( finder_colors.length == 4 ){
            __arr.push({
                x : len - 7,
                y : len - 7 
            });
        }

        __arr.forEach( function( item, index ){
            var ref_x = quiet_zone + item.x,
            ref_y = quiet_zone + item.y,
            actual_fill_color = finder_colors[ index ] || finder_colors[ finder_colors.length - 1 ] || fill_color;

            if( index == 3 ){ // adding dummy extra finder pattern for CRM case. Use this only with Higher error correction value ( H or Q )
                draw( "square", ref_x - 1.1, ref_y - 1.1, 8.2, background_color || non_fill_color );
            }

            draw( __outer, ref_x, ref_y, 7, actual_fill_color, 2 );
            draw( __outer, ref_x + 1, ref_y + 1, 5, non_fill_color, 1.5 );
            draw( __inner || __outer, ref_x + 2, ref_y + 2, 3, actual_fill_color, 1 );
        } );
    }

    function addPattern( ctx, pattern, x, y, unit_x, unit_y, pts, row_index, col_index ){
        switch( pattern ){
            case "square" : {
                var size = .9,
                size_loss_x = unit_x * ( 1 - size ),
                size_loss_y = unit_y * ( 1 - size );

                ctx.rect( x + size_loss_x, y + size_loss_y, unit_x - 2 * size_loss_x, unit_y - 2 * size_loss_y );
            }
            break;
            case "circle" : {
                var size = .9;

                ctx.arc( x + unit_x / 2, y + unit_y / 2, unit_x * size / 2, 0, 2 * Math.PI );
            }
            break;
            case "diamond" : {
                ctx.save();
                ctx.translate( x + 0.5 * unit_x, y );
                ctx.rotate( Math.PI / 4 );
                ctx.rect( 0, 0, unit_x / 1.414, unit_y / 1.414 );
                ctx.restore();
            }
            break;
            case "star" : {
                var size = 1,
                size_loss = ( 1 - size ) / 2,
                mid_x = x + unit_x / 2,
                mid_y = y + unit_y / 2,
                size_loss_value = size_loss * unit_y,
                radius = unit_x * ( 0.5 - size_loss );

                ctx.moveTo( mid_x, y + size_loss_value );
                ctx.arcTo( mid_x, mid_y, x + size_loss_value, mid_y, radius );
                ctx.arcTo( mid_x, mid_y, mid_x, y + unit_y - size_loss_value, radius );
                ctx.arcTo( mid_x, mid_y, x + unit_x - size_loss_value, mid_y, radius );
                ctx.arcTo( mid_x, mid_y, mid_x, y + size_loss_value, radius );
            }   
            break;
            case "horizontal_line" : {
                var nxt = pts[ row_index ][ col_index + 1 ] || {};
                if( !nxt.fill || nxt.type == "finder_pattern" ){
                    var previous_fills = -1,
                    size = .8,
                    prev = pts[ row_index ][ col_index ];

                    while( prev && prev.fill && prev.type != "finder_pattern" ){
                        prev = pts[ row_index ][ col_index - ++previous_fills - 1 ];
                    }

                    switch( previous_fills ){
                        case 0 : {
                            addPattern( ctx, "circle", x, y, unit_x, unit_y );
                        }
                        break;
                        default : {
                            var ref_x = x - unit_x * previous_fills,
                            half_unit = unit_x / 2;
                            ctx.moveTo( ref_x + half_unit, y );
                            ctx.arcTo( ref_x, y, ref_x, y + half_unit, half_unit );
                            ctx.arcTo( ref_x, y + unit_y, ref_x + half_unit, y + unit_y, half_unit );
                            ctx.lineTo( ref_x + previous_fills * unit_x + half_unit, y + unit_y );
                            ctx.arcTo( x + unit_x, y + unit_y, x + unit_x, y + half_unit, half_unit );
                            ctx.arcTo( x + unit_x, y, x + half_unit, y, half_unit );
                            ctx.lineTo( ref_x + half_unit, y );
                        }
                    }
                }
            }   
            break;
            case "vertical_line" : {
                var nxt = ( pts[ row_index + 1 ] || {} )[ col_index ] || {};
                if( !nxt.fill || nxt.type == "finder_pattern" ){
                    var previous_fills = -1,
                    size = .8,
                    prev = pts[ row_index ][ col_index ];

                    while( prev && prev.fill && prev.type != "finder_pattern" ){
                        prev = ( pts[ row_index - ++previous_fills - 1 ] || {} )[ col_index ];
                    }

                    previous_fills = Math.max( 0, previous_fills );

                    switch( previous_fills ){
                        case 0 : {
                            addPattern( ctx, "circle", x, y, unit_x, unit_y );
                        }
                        break;
                        default : { 
                            var ref_y = y - unit_y * previous_fills,
                            half_unit = unit_x / 2;
                            ctx.moveTo( x, ref_y + half_unit );
                            ctx.arcTo( x, ref_y, x + half_unit, ref_y, half_unit );
                            ctx.arcTo( x + unit_x, ref_y, x + unit_x, ref_y + half_unit, half_unit );
                            ctx.lineTo(  x + unit_x, ref_y + previous_fills * unit_y + half_unit );
                            ctx.arcTo( x + unit_x, y + unit_y, x + half_unit, y + unit_y, half_unit );
                            ctx.arcTo( x , y + unit_x, x, y + half_unit, half_unit );
                            ctx.lineTo( x, ref_y + half_unit );
                        }
                    }
                }
            }   
            break;
        }
    }

    if( typeof $L == "undefined" ){
        var __window = typeof window == "undefined" ? globalThis : window;
        __window.LyteQRPattern = addPattern;
        __window.addFinderPattern = addFinderPattern;
    } else {
        $L.addPattern = addPattern;
        $L.addFinderPattern = addFinderPattern;
    }
} )();