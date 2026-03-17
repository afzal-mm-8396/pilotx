/**
 * This component is used to select one or more ranges between given minimum and maximum values
 * @component lyte-multislider
 * @version 1.0.8
 */

/**
 * ToDO
 * 1. taking ltPropMinDiff into account while moving handlers for aria-min and max setting
 */

/**
 * @domEvents commonEvents keydown,keyup,keypress,focusin,focusout,wheel
 */

Lyte.Component.register("lyte-multislider", {
_template:"<template tag-name=\"lyte-multislider\" lyte-multislider=\"\"> <div class=\"lyteSlide{{if(ltPropDisabled,' lyteSliderDisabled','')}}\" onkeydown=\"{{action('keydown',event)}}\" tabindex=\"{{ltPropTabindex}}\" data-tabindex=\"{{ltPropDataTabindex}}\" style=\"width: {{ltPropWidth}}; height: {{ltPropHeight}}\"> <div class=\"lyteRangeSlider {{ltPropDirection}}\" onclick=\"{{action('click',event)}}\" style=\"background-color: {{ltPropNonFillColor}}\"> <template is=\"for\" items=\"{{ltPropValue}}\" item=\"item\" index=\"index\"> <div class=\"lyteSliderFill {{ltPropValue[index].class}}\" id=\"{{ltPropValue[index].id}}\" data-order=\"{{index}}\" style=\"background-color: {{if(ltPropColor[index],ltPropColor[index],ltPropFillColor)}};left: 0; top: 0;right: 0\"></div> <div data-order=\"{{index}}\" class=\"lyteSliderHandler {{ltPropHandler}} lyteHandler{{index}} {{item.class}}\" lt-prop-title=\"{{if(ltPropTooltip,item.value,'')}}\" ontouchstart=\"{{action('mousedown',event,this,index)}}\" onmousedown=\"{{action('mousedown',event,this,index)}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-style=\"{{ltPropTooltipStyle}}\" lt-prop-tooltip-class=\"{{ltPropTooltipClass}}\" role=\"{{lyteUiAttribute('slider',ltPropAria)}}\" tabindex=\"{{lyteUiAttribute(expHandlers(item.tabindex,'||',ltPropHandlerTabindex),ltPropAria)}}\" aria-valuemin=\"{{lyteSliderBoundary('Min',item.min)}}\" aria-valuemax=\"{{lyteSliderBoundary('Max',item.max)}}\" aria-valuenow=\"{{lyteNumericOnly(lyteUiAttribute(item.value,ltPropAria))}}\" aria-valuetext=\"{{lyteUiAttribute(item.value,ltPropAria,item.text)}}\" aria-label=\"{{lyteUiAttribute(item.label,ltPropAria)}}\" aria-labelledby=\"{{lyteUiAttribute(item.labelledby,ltPropAria)}}\" aria-orientation=\"{{lyteUiAttribute(orientation,ltPropAria)}}\" onfocus=\"{{action('focus',this,event)}}\"></div> </template> <div class=\"lyteSliderFill endFill\" id=\"endFill\" style=\"right: 0;bottom: 0;left: 0;background-color: {{ltPropFillColor}}\"></div> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteMultiSlider\" lt-prop-scale-value=\"{{scaleVal}}\" lt-prop-scale-style=\"{{divLength}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption {{ltPropHandler}}\"> <template is=\"for\" items=\"{{divLength}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\"> <span></span> <span class=\"lyteScalLable\">{{scaleVal[indexVal]}}</span> </span> </template> </div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropWidth","'; height: '","ltPropHeight"]}}}},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color: '","ltPropNonFillColor"]}}}},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-color: '",{"type":"helper","value":{"name":"if","args":["ltPropColor[index]","ltPropColor[index]","ltPropFillColor"]}},"';left: 0; top: 0;right: 0'"]}}}},{"type":"attr","position":[3]}]},{"type":"attr","position":[1,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'right: 0;bottom: 0;left: 0;background-color: '","ltPropFillColor"]}}}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"text","position":[1,3,0]}]}]}},"default":{}}],
_observedAttributes :["ltPropMin","ltPropMax","ltPropValue","ltPropDirection","ltPropHandler","ltPropWidth","ltPropFillColor","ltPropNonFillColor","ltPropHeight","ltPropContent","ltPropScaleInterval","ltPropDiscrete","ltPropScaleAppend","ltPropScalePrepend","ltPropColor","ltPropTooltipStyle","ltPropTooltipConfig","ltPropTooltip","ltPropDigits","ltPropMinDiff","ltPropYield","ltPropTabindex","ltPropAria","ltPropRerender","ltPropCssDirection","ltPropPromiseHandling","ltPropDisabled","ltPropDataTabindex","ltPropHandlerTabindex","divLength","scaleVal","secArr","orientation"],
_observedAttributesType :["number","number","array","string","string","string","string","string","string","array","number","number","string","string","array","string","object","boolean","number","number","boolean","number","boolean","boolean","string","boolean","boolean","string","number","array","array","array","string"],


    _lyteUtilFunctions : [ "reRender" ],

    init : function(){

        var dir = this.data.ltPropCssDirection;

        if( dir ){
            this._dir = dir == "rtl";
        } else {
            this._dir = _lyteUiUtils.getRTL();
        }

        this._mv = this.mousemove.bind( this );
        this._mp = this.mouseup.bind( this );

        /**
         * This method is called before rendering the slider
         * @method beforeRender
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 1.0.8
         * @param { object } sliderElement
         */

        this.getMethods( 'beforeRender' ) && this.executeMethod( 'beforeRender', this.$node );
    },

    didConnect : function(){
        /**
         * @utility reRender
         * @version 2.2.3
         * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
         */
        this.$node.reRender = function(){
            this.initObs.call( this );
            this.dctWrk.call( this );
        }.bind( this )
    },

    rerend_obs : function( arg ){
        if( arg.newValue ){
            this.$node.reRender();
            this.setData( arg.item, false );
        }
    }.observes( 'ltPropRerender' ),

    dis_obs : function(){
        $L( this.$node )[ ( this.data.ltPropDisabled ? 'add' : 'remove' ) + 'Class' ]( 'lyteMultiSliderDisabled' );
    }.observes( 'ltPropDisabled' ).on( 'didConnect' ),

    dcnt : function(){
        if( this._prevent ){
            return
        }
        clearTimeout( this._time );

        this._time = setTimeout( this.dctWrk.bind( this ), 20 );
    }.observes( 'ltPropValue.[]', 'ltPropValue', 'ltPropDirection', 'ltPropWidth', 'ltPropHeight', 'ltPropMin', 'ltPropMax', 'ltPropContent.[]', 'ltPropContent' ).on( 'didConnect' ),

    didDestroy : function(){
        clearTimeout( this._time ); clearTimeout( this._time2 );
    },

    rtlfunc : function( lft, bcr, ww ) {
        if( this._dir && lft != 'top' && lft != 'clientY' ) {
            if( bcr ) {
                if( lft == 'right' ) {
                    return ww - bcr.left;
                } else if( lft == 'clientX' ) {
                    return ww - bcr.clientX
                }
                return ww - bcr.right;
            } else if( lft == 'left' ) {
                return 'right';
            } 
        }
        return bcr ? bcr[ lft ] : lft;
    },

    hgtObs : function(){
        var data = this.data, dir = data.ltPropDirection == "lyteHorizontal";
        this._prevent = true;
        this.$node.ltProp( 'width',  data.ltPropWidth || ( dir ? '200px' : "30px" ) ),
        this.$node.ltProp( 'height',  data.ltPropHeight || ( dir ? '30px' : "200px" ) );
        delete this._prevent;
    }.on('init'),

    initWrk : function( arg ){
        if( this._prevent ){
            return
        }
        clearTimeout( this._time2 );
        this._time2 = setTimeout( this.initObs.bind( this ), 0, arg )
    }.observes('ltPropContent.[]', 'ltPropContent', 'ltPropDiscrete', 'ltPropScaleInterval', 'ltPropValue.[]', 'ltPropValue' ).on('init'),


    initObs : function( arg ){
        var data = this.data, dir = data.ltPropDirection == "lyteHorizontal", cont = data.ltPropContent, len = cont.length, len1 = len, dis = data.ltPropDiscrete, sI = data.ltPropScaleInterval,
        sclVal = [ ], divLen = [ ], lft = this.rtlfunc( 'left' ), pre = data.ltPropScalePrepend, app = data.ltPropScaleAppend, sec = [], value = data.ltPropValue, yild = data.ltPropYield;
        if( !dir ) {
            lft = "top";
        }
        this._prevent = true;
        if( len ) {
            data.ltPropMax = 100;
            data.ltPropMin = 0;
            data.ltPropScaleInterval = data.ltPropDiscrete = 100 / ( len - 1 )
            len--;
        } else {
            if( dis ) {
                sI = data.ltPropScaleInterval = dis
            } else if( !sI ) {
                sI = data.ltPropScaleInterval = 0.1 * Math.abs( parseFloat( data.ltPropMax ) - parseFloat( data.ltPropMin ) )
            }
            len = Math.abs( parseFloat( data.ltPropMax ) - parseFloat( data.ltPropMin ) ) / data.ltPropScaleInterval;
        }
        if( !yild ) {
            divLen.push( lft + ": 0" );
            sclVal.push( pre + ( len1 ? cont[ 0 ] : data.ltPropMin ) + app )
            for( var i = 1; i < len; i++ ) {
                divLen.push( lft + ":" + ( 100 * i / len ) + "%" )
                sclVal.push( pre + ( len1 ? cont[ i ] : ( data.ltPropMin + sI * i * ( data.ltPropMin > data.ltPropMax ? -1 : 1 ) ) ) + app  )   
            }
            if( len1 ){
                var discrete = data.ltPropDiscrete
                for( var i = 0; i < value.length; i++ ) {
                    var mx = cont.indexOf( value[ i ].max );
                    sec.push( { id : i - 1, value : ( cont.indexOf( value[ i ].value ) ) * discrete, min : Math.max( 0, ( cont.indexOf( value[ i ].min ) ) * discrete ), max : Math.min( 100, ( mx != -1 ? mx : 100 ) * discrete ) } )
                }
            }
            divLen.push( lft + ": 100%" );
            sclVal.push( pre + ( len1 ? cont[ len1 - 1 ] : data.ltPropMax ) + app )
            this.setData( 'divLength', divLen );
            this.setData( 'scaleVal', sclVal );
        }
        this.setData( 'secArr', len1 ? sec : value.slice() )
        delete this._prevent;
    },

    dctWrk : function( sortVal, bcr, handBcr, flag ){
        var data = this.data, val = data.secArr.slice().sort( function( a, b ){
            return a.value < b.value ? -1 : 1;
        } ), frmdc = !!val, sortVal = sortVal || [],
        dir = data.ltPropDirection == "lyteHorizontal", cont = data.ltPropContent, len = cont.length, hp = [], wd = "width",

        lft = this.rtlfunc( 'left' ), bcr = bcr || this.bcr( this.$node.querySelector( '.lyteSlide' ) ), max =  parseFloat( data.ltPropMax ), min = parseFloat( data.ltPropMin ),

        handlers = this.$node.querySelectorAll( '.lyteSliderHandler[ data-order ]' ), hp = [],

        fill = this.$node.querySelectorAll( '.lyteSliderFill' ), prev;

        if( data.ltPropAria ){
            this.setData( 'orientation', dir ? 'horizontal' : 'vertical' );
        }

        if( !dir ) {
            wd = "height", lft = "top";
        }
        var ddct = max < min ? bcr[ wd ] : 0
        for( var i = 0; i < val.length; i++ ) {
            var j = data.secArr.indexOf( val[ i ] );
            if( sortVal.length && sortVal.indexOf( j ) == -1 ) {
                hp.push( undefined )
                continue;
            }
            hp.push( { node : handlers[ j ], id : val.indexOf( val[ i ] ) } ); 
            hp[ i ].bcr = handBcr || this.bcr( handlers[ j ] );
            hp[ i ].style = this.getLeft( bcr[ wd ], hp[ i ].bcr[ wd ], val[ i ].value, max, min )
            prev = this.findPrevmin.call( this, j, val[ i ].value );
        }
        for( var i = 0; i < hp.length; i++ ) {
            if( hp[ i ] ) {
                var prev = fill[ hp[ i ].id - 1 ];
                if( ddct ) {
                    hp[ i ].style = ddct - hp[ i ].style - hp[ i ].bcr[ wd ];
                    hp[ i ].node.style[ lft ] = hp[ i ].style + 'px';
                    fill[ hp[ i ].id ].style[ lft ] =  hp[ i ].style + hp[ i ].bcr[ wd ] / 2 + 'px';
                    fill[ hp[ i ].id ].style[ wd ] = Math.max( 0, ( prev ? ( parseFloat( prev.style[ lft ] ) ) : ddct )  - hp[ i ].bcr[ wd ] / 2 - hp[ i ].style ) + 'px';
                    if( hp[ i ].id + 2 == fill.length ) {
                        fill[ hp[ i ].id + 1 ].style[ lft ] = '0';
                        fill[ hp[ i ].id + 1 ].style[ wd ] = Math.max( 0, hp[ i ].style + hp[ i ].bcr[ wd ] / 2 ) + 'px';
                        fill[ hp[ i ].id + 1 ].setAttribute( 'range-max', this.convert( cont, min ) );
                    }
                    if( hp[ i ].id == 0 ){
                        fill[ hp[ i ].id ].setAttribute( 'range-min', this.convert( cont, max ) );
                    }
                } else {
                    hp[ i ].node.style[ lft ] = hp[ i ].style + 'px';
                    fill[ hp[ i ].id + 1 ].style[ lft ] = hp[ i ].style + hp[ i ].bcr[ wd ] / 2 + 'px';
                    fill[ hp[ i ].id ].style[ wd ] = Math.max( 0, hp[ i ].style + hp[ i ].bcr[ wd ] / 2 - ( prev ? parseFloat( prev.style[ lft ] ) + ( parseFloat( prev.style[ wd ] ) ) : 0 ) ) + 'px';
                    if( hp[ i ].id + 2 == fill.length ) {
                        fill[ hp[ i ].id + 1 ].style[ wd ] = Math.abs( ddct - Math.max( bcr[ wd ] - hp[ i ].style - hp[ i ].bcr[ wd ] / 2, 0 ) ) + 'px';
                        fill[ hp[ i ].id + 1 ].setAttribute( 'range-max', this.convert( cont, max ) );
                    }
                    if( hp[ i ].id == 0 ){
                        fill[ hp[ i ].id ].setAttribute( 'range-min', this.convert( cont, min ) );
                    }
                }
                fill[ hp[ i ].id ].setAttribute( 'range-max', this.convert( cont, val[ hp[ i ].id ].value ) );
                fill[ hp[ i ].id + 1 ].setAttribute( 'range-min', this.convert( cont, val[ hp[ i ].id ].value ) );
            }
        }

        /**
         * This method is called after rendering the slider
         * @method afterRender
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 1.0.8
         * @param { object } sliderElement
         */

        !flag && this.getMethods( 'afterRender' ) && this.executeMethod( 'afterRender', this.$node );
    },

    setValues : function( wd, style, prev ){
        var hp = {};
        if( prev == undefined ) {
                hp.left = 0;
                hp.width = style + wd;
            } else {
                hp.left =  parseFloat( prev.style )  + wd ;
                hp.width = style - hp.left + wd;
            }
        return hp   
    },

    findPrevmin : function( idd, curr, flag, rest, rest2 ){
        var id, val = this.data.secArr.slice(), sel;
        if( curr != undefined ) {
            for( var i = 0; i < val.length; i++ ) {
                if( [ idd, rest2, rest].indexOf( i ) == -1 ) {
                    if( val[ i ].value <= curr && !flag ){
                        if( sel && val[ i ].value > sel ) {
                            sel = val[ i ].value;
                            id = i;
                        } else if( !sel ) {
                            sel = val[ i ].value;
                            id = i;
                        }
                    } else if( val[ i ].value >= curr && flag ) {
                        if( sel && val[ i ].value < sel ) {
                            sel = val[ i ].value;
                            id = i;
                        } else if( !sel ) {
                            sel = val[ i ].value;
                            id = i;
                        }
                    }
                }
            }
            return [ id, sel ]
        } else {
            val.sort( function( a, b ){
                return a.value < b.value ? -1 : 1;
            } )
            var id = this.data.secArr.indexOf( val[ val.length - 1 ] )
            return [ id, this.data.secArr[ id ].value ]
        }
    },

    findPrevmin1 : function( idd, curr, flag ){
        var id, value = this.data.secArr.slice(), sel;
        for( var i = 0; i < value.length; i++ ){
            if( i != idd ){
                if( flag ){
                    if( curr < value[ i ].value ){
                        if( sel && value[ i ].value < sel ){
                            sel = value[ i ].value; id = i;
                        } else if( !sel ) {
                            sel = value[ i ].value
                            id = i
                        }
                    }
                } else{
                    if( curr > value[ i ].value ){
                        if( sel && value[ i ].value > sel ){
                            sel = value[ i ].value; id = i;
                        } else if( !sel ) {
                            sel = value[ i ].value;
                            id = i
                        }
                    }
                }
            }
        }
        return [ id, sel ];
    },

    getLeft : function( parWid, handWid, value, max, min ){
        var ret = ( value - Math.min( min, max ) ) * parWid / (  Math.max( min, max ) -  Math.min( min, max ) ),
        val = Math.round( Math.min( Math.max( ( ret - 0.5 * handWid ), -0.5 * handWid ), parWid - 0.5 * handWid ) * 100 ) / 100
        return val;
    },

    getValue : function( parWid, curr, max, min, vmin, vmax ){
        var pow =  Math.pow( 10, this.data.ltPropDigits );
        if( max > min ){
            return Math.min( Math.max( vmin || min, Math.round( ( min + ( ( max - min ) * curr / parWid ) ) * pow ) / pow ), vmax||max );
        } else {
            return Math.min( Math.max( vmin || max, Math.round( ( max + ( ( min - max ) * ( parWid - curr ) / parWid ) ) * pow ) / pow ), vmax||min )
        }
    },

    convert : function( con, val ){
        if( con.length ){
            return ( con[ Math.round( val / this.data.ltPropDiscrete ) ] )
        } else {
            var pow =  Math.pow( 10, this.data.ltPropDigits );
            return parseInt( val * pow ) / pow;
        }
    },  

    data : function(){

        var default_values = _lyteUiUtils.getDefault( 'lyte-multislider' );

        return {
            /**
             * @componentProperty {number} ltPropMin=0
             * @condition ltPropContent []
             * @mandatory
             * @version 1.0.8
             * @input
             */
            ltPropMin : Lyte.attr( 'number', { default : default_values.min || 0, input : true } ),
            /**
             * @componentProperty {number} ltPropMax
             * @condition ltPropContent []
             * @mandatory 
             * @version 1.0.8
             * @input
             */
            ltPropMax : Lyte.attr( 'number', { default : default_values.max, input : true } ),
            /**
             * @componentProperty {object[]} ltPropValue
             * @version 1.0.8
             * @default []
             * @output
             * @input
             */
            ltPropValue : Lyte.attr( 'array', { default : [], output : true, input : true } ),
            /**
             * @componentProperty {lyteHorizontal | lyteVertical} ltPropDirection=lyteHorizontal
             * @mandatory
             * @version 1.0.8
             * @input
             */
            ltPropDirection : Lyte.attr( 'string', { default : default_values.direction || "lyteHorizontal", input : true } ),
            /**
             * @componentProperty {lyteArrow | lyteArrowLeft | lyteSquare | lyteCircle} ltPropHandler=lyteArrow
             * @mandatory
             * @allowedValuesDepends ltPropDirection
             * @map lyteHorizontal lyteArrow,lyteCircle,lyteSquare
             * @map lyteVertical lyteArrow,lyteArrowLeft,lyteCircle,lyteSquare
             * @version 1.0.8
             * @input
             */
            ltPropHandler:Lyte.attr( "string", { default : default_values.handler || 'lyteArrow', input : true } ),
            /**
             * @componentProperty {string} ltPropWidth=''
             * @version 1.0.8
             * @input
             */
            ltPropWidth : Lyte.attr( "string", { default : default_values.width || '', input : true } ),
            /**
             * @componentProperty {colorString} ltPropFillColor=''
             * @version 1.0.8
             * @input
             */
            ltPropFillColor:Lyte.attr( "string", { default : default_values.fillColor || '', input : true } ),
            /**
             * @componentProperty {colorString} ltPropNonFillColor=''
             * @version 1.0.8
             * @input
             */
            ltPropNonFillColor:Lyte.attr( "string", { default : default_values.nonFillColor || '', input : true } ),
            /**
             * @componentProperty {string} ltPropHeight=''
             * @version 1.0.8
             * @input
             */
            ltPropHeight:Lyte.attr( "string", { default : default_values.height || '', input : true } ),
            /**
             * @componentProperty {string[]} ltPropContent
             * @default []
             * @mandatory
             * @version 1.0.8
             * @input
             */
            ltPropContent : Lyte.attr( 'array', { default : [ ], input : true } ),
            /**
             * @componentProperty {number} ltPropScaleInterval
             * @condition ltPropDiscrete ""
             * @version 1.0.8
             * @input
             */
            ltPropScaleInterval : Lyte.attr( 'number', { default : default_values.scaleInterval, input : true } ),
            /**
             * @componentProperty {number} ltPropDiscrete
             * @version 1.0.8
             * @input
             */
            ltPropDiscrete : Lyte.attr( 'number', { default : default_values.discrete, input : true } ),
            /**
             * @componentProperty {string} ltPropScaleAppend ''
             * @condition ltPropYield false
             * @version 1.0.8
             * @input
             */
            ltPropScaleAppend : Lyte.attr( 'string', { default : default_values.scaleAppend || "", input : true } ),
            /**
             * @componentProperty {string} ltPropScalePrepend ''
             * @condition ltPropYield=false
             * @version 1.0.8
             * @input
             */
            ltPropScalePrepend : Lyte.attr( 'string', { default : default_values.scalePrepend || "", input : true } ),
            /**
             * @componentProperty {string[]} ltPropColor
             * @default []
             * @version 1.0.8
             * @input
             */
            ltPropColor : Lyte.attr( 'array', { default : default_values.color || [ ], input : true } ),
            /**
             * @componentProperty {string} ltPropTooltipStyle ''
             * @condition ltPropTooltip true
             * @version 1.0.8
             * @input
             */
            ltPropTooltipStyle : Lyte.attr( 'string', { default : default_values.tooltipStyle || '', input : true } ),

            /**
             * @typedef {object} multisliderConfig
             * @property {number} margin=5
             * @property {left | right | top | bottom | topright | bottomright | topleft | bottomleft} position=top
             * @property {box | callout} appearance=callout
             * @property {number} showdelay=0
             * @property {number} hidedelay=0
             * @property {number} maxdisplaytime=5000
             * @property {boolean} keeptooltip=false
             */

            /**
             * @componentProperty {multisliderConfig} ltPropTooltipConfig
             * @default {}
             * @version 1.0.8
             * @condition ltPropTooltip true
             * @input
             */
            ltPropTooltipConfig : Lyte.attr( 'object', { default : default_values.tooltipConfig || { margin : 5, position : "top" }, input : true } ),
            /**
             * @componentProperty {boolean} ltPropTooltip=false
             * @version 1.0.8
             * @input
             */
            ltPropTooltip : Lyte.attr( 'boolean', { default : default_values.tooltip || false, input : true } ),
            /**
             * @componentProperty {number} ltPropDigits=2
             * @version 1.0.8
             * @input
             */
            ltPropDigits : Lyte.attr( 'number', { default : default_values.digits || 2, input : true } ),
            /**
             * @componentProperty {number} ltPropMinDiff=0
             * @version 1.0.8
             * @condition ltPropContent []
             * @input
             */
            ltPropMinDiff : Lyte.attr( 'number', { default : default_values.minDiff || 0, input : true } ),
            /**
             * @componentProperty {boolean} ltPropYield=false
             * @version 1.0.8
             * @input
             */
            ltPropYield : Lyte.attr( 'boolean', { default : default_values.yield || false, input : true } ),
            /**
             * @componentProperty {number} ltPropTabindex=0
             * @version 3.1.0
             * @input
             */            
            ltPropTabindex : Lyte.attr( 'number', { default : default_values.tabindex || 0, input : true } ),
            /**
             * @componentProperty {boolean} ltPropAria=false
             * @version 3.1.0
             * @input
             */
            ltPropAria : Lyte.attr( 'boolean', { default : default_values.aria || false, input : true } ),
             /**
             * @componentProperty {boolean} ltPropRerender=false
             * @version 3.80.0
             * @input
             */
            ltPropRerender : Lyte.attr( 'boolean', { default : false, input : true } ),
             /**
             * @componentProperty { ltr | rtl } ltPropCssDirection
             * @version 3.80.0
             * @input
             */
            ltPropCssDirection : Lyte.attr( 'string', { default : default_values.cssDirection, input : true } ),
            /**
             * @componentProperty { boolean } ltPropPromiseHandling = false
             * @version 3.91.1
             * @input
             */
            ltPropPromiseHandling : Lyte.attr( 'boolean', { default : default_values.promiseHandling || false, input : true } ),
            /**
             * @componentProperty { boolean } ltPropDisabled = false
             * @version 3.91.1
             * @input
             */
            ltPropDisabled : Lyte.attr( 'boolean', { default : default_values.disabled || false, input : true } ),
            /**
             * @componentProperty { string } ltPropDataTabindex = 0
             * @version 3.91.1
             * @input
             */
            ltPropDataTabindex : Lyte.attr( 'string', { default : default_values.dataTabindex || "0", input : true } ),

            ltPropHandlerTabindex : Lyte.attr( 'number', { default : default_values.handlerTabindex || 0, input : true } ),

            // system data
            divLength : Lyte.attr( 'array', { default : [] } ),
            scaleVal : Lyte.attr( 'array', { default : [] } ),
            secArr : Lyte.attr( 'array', { default : [] } ),

            orientation : Lyte.attr( 'string', { default : "" } )
        }       
    },

    mousemove : function( evt, inc ){
        var _this = this._sel, bcr = this.bcr( this.$node.querySelector( '.lyteSlide' ) ), data = this.data, dir = data.ltPropDirection == "lyteHorizontal",
        client = "clientX", lft = this.rtlfunc( 'left' ), wd = "width", idx = this._idx, val = data.secArr, oldVal, old, discrete = data.ltPropDiscrete, con = data.ltPropContent, ww = window.innerWidth,
        max = parseFloat( data.ltPropMax ), min = parseFloat( data.ltPropMin ), prevval = [], nextVal = [], diff = this.data.ltPropMinDiff, ev = evt, isTch = evt.type == "touchmove";
        if( isTch && evt.touches.length != 1 ) {
            return;
        } else if( isTch ) {
            ev = evt.touches[ 0 ];
        }
        if( !dir ) {
            client = "clientY", lft = "top", wd = "height";
        }
        old = parseFloat( _this.style[ lft ] );
        if( isNaN( old ) ){
            this.dctWrk.call( this, [], bcr, this._bcr, true );
            old = parseFloat( _this.style[ lft ] );
        }
        if( /mousemove|touchmove/.test( evt.type ) ){
            inc = parseInt( ( ( bcr.scale * ( this.rtlfunc( client, ev, ww ) - this.rtlfunc( lft == "right" ? 'left' : lft, bcr, ww ) - this._xoff ) - parseFloat( _this.style[ lft ] ) ) * 100 ) ) / 100;
        } 
        this._prevent = true;
        if( discrete ) {
            var crval = this.getValue( bcr[ wd ], old + inc, max, min  );
            var acc = Math.min( Math.max( Math.round( ( crval ) / discrete ) * discrete, 0 ) );
            if( acc == data.secArr[idx].value && ( ( crval != max && crval != min ) ) || ( crval == data.secArr[idx].value ) ){
                delete this._prevent;
                return
            } else if( crval == max || crval == min ) {
                acc = crval;
            }
            if( !con.length && max < min ){
                inc = this.getLeft( bcr[wd], this._bcr[ wd ], data.secArr[ idx ].value, max, min ) - this.getLeft( bcr[wd], this._bcr[ wd ], acc, max, min )
            } else {
                inc = this.getLeft( bcr[wd], this._bcr[ wd ], acc, max, min ) - old;
            }
        }
        if( con.length ){
            diff = diff * discrete;
        }
        if( !isNaN( diff ) ) {
            prevval = this.findPrevmin1( idx, val[ idx ].value );
            if( prevval[ 0 ] != undefined ) {
                prevval[ 1 ] += diff * 1; 
            } else {
                prevval[ 1 ] = Math.min( max, min );
            }
            nextVal = this.findPrevmin1( idx, val[ idx ].value, true )
            if( nextVal[ 0 ] != undefined ){
                nextVal[ 1 ] -= diff * 1 ;
            } else {
                nextVal[ 1 ] = Math.max( max, min );
            }
            if( ( inc < 0 && val[ idx ].frmMax ) || ( inc > 0 && val[ idx ].frmMin ) ){
                return
            } 
        }
        oldVal = val[ idx ] .value;
        Lyte.objectUtils( val[ idx ], 'add', 'value', this.getValue( bcr[ wd ], old + inc + this._bcr[ wd ] / 2, max, min, Math.max( val[ idx ].min || prevval[ 1 ], prevval[ 1 ] || val[ idx ].min ), Math.min( val[ idx ].max || nextVal[ 1 ], nextVal[ 1 ] || val[ idx ].max ) ) )
        Lyte.objectUtils( data.ltPropValue[ idx ], 'add', 'value', this.convert( con, val[ idx ].value ) );
        prevval = this.findPrevmin( idx, val[ idx ].value )
        if( diff != undefined ) {
            if( prevval[ 1 ] == val[ idx ].value ) {
                if( inc > 0 && !val[ idx ].frmMax ){
                    val[ idx ].frmMin = true;
                } else if( !val[ idx ].frmMin ) {
                    val[ idx ].frmMax = true;
                }
            } else {
                delete val[ idx ].frmMax; delete val[ idx ].frmMin;
            }
        }
        this.dctWrk.call( this, [], bcr, this._bcr, true);
        delete this._prevent;
        evt.preventDefault();

        /**
         * This method is called whenever slider handler is dragged
         * @method onChange 
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 1.0.8
         * @param { number } index
         * @param { object } handlerData
         * @param { object } event
         * @param { object } sliderElement
         */

        if( /mousemove|touchmove/.test( evt.type ) && this.getMethods( 'onChange' ) && oldVal != val[ idx ] .value ){
            this.executeMethod( 'onChange', idx, data.ltPropValue[ idx ], evt, this.$node )
        }

        if( _this.tooltip && _this.tooltip.refresh ){
            _this.tooltip.refresh( { clientX : Math.max( Math.min( evt.clientX, bcr.right ), bcr.left ) }, _this.tooltip.tooltipSpan );
        }
    },

    mouseup : function( evt ) {
        var ret, isTch = evt.type == "touchend",
        ns = "removeEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" );

        document[ ns ]( isTch ? 'touchmove' : "mousemove", this._mv, true );
        document[ ns ]( isTch ? 'touchend' : "mouseup", this._mp, true );

        /**
         * This method is called whenever slider value is changed
         * @method onSelect 
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 1.0.8
         * @param { number } index
         * @param { object } handlerData
         * @param { object } event
         * @param { object } sliderElement
         */

        if( this.getMethods( 'onSelect' ) ) {
            ret = this.executeMethod( 'onSelect', this._idx, this.data.ltPropValue[ this._idx ], evt, this.$node );
        }
        delete this._sel; delete this._xoff; delete this._idx;
        delete this._bcr; delete this._prevent;

        if( ret != false && isTch ){
            evt.preventDefault();
        }
    },

    callBack : function( idx, evt ){
        this.getMethods( 'onChange' ) && this.executeMethod( 'onChange', idx, this.data.ltPropValue[ idx ], evt, this.$node );
        this.getMethods( 'onSelect' ) && this.executeMethod( 'onSelect', idx, this.data.ltPropValue[ idx ], evt, this.$node );
    },

    bind_fakeup : function( isTch ){
        document[ "addEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" ) ]( isTch ? "touchend" : "mouseup", this.__fakeup || ( this.__fakeup = this.remove_fakeup.bind( this, isTch ) ), true );
    },

    remove_fakeup : function( isTch ){
        document[ "removeEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" ) ]( isTch ? "touchend" : "mouseup", this.__fakeup, true );
        delete this.__fakeup;
        delete this.__promise_wait;
        delete this._sel;
        delete this._bcr;
        delete this._xoff;
    },  

    actions : {
        mousedown : function( evt, _this, idx ){
            if( evt.button == 2 || this.data.ltPropDisabled ){
                return;
            }
            var isTch = evt.type == "touchstart", ev = evt;
            if( isTch && evt.touches.length != 1 ){
                return
            } else if( isTch ){
                ev = evt.touches[ 0 ];
            }


            $L.fastdom.mutate( function(){
                var __clsname = 'lyteMultiSliderSelected';

                $L( '.' + __clsname, this.$node ).removeClass( __clsname );
                $L( _this ).addClass( __clsname );
            }.bind( this ) );

            var __fn = function(){
                var bcr = _this.getBoundingClientRect(), data = this.data, dir = data.ltPropDirection == "lyteHorizontal",
                client = "clientX", lft = this.rtlfunc( 'left'), wd = "width", ww = window.innerWidth;
                if( !dir ) {
                    client = "clientY"; lft = "top"; wd = "height";
                }
                this._xoff =this.rtlfunc( client, ev, ww ) - this.rtlfunc( lft == "right" ? 'left' : lft, bcr, ww );
                this._sel = _this; this._idx = idx;
                this._bcr = this.bcr( _this );

                var ns = "addEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" )

                document[ ns ]( isTch ? 'touchmove' : "mousemove", this._mv, true );
                document[ ns ]( isTch ? 'touchend' : "mouseup", this._mp, true );
                ( isTch || _lyteUiUtils.isWidget ) && evt.preventDefault();
            }.bind( this );

            /**
             * This method is called before selecting the handler for drag
             * @method onBeforeSelect 
             * @author ponkarthikeyan.t@zohocorp.com
             * @version 1.0.8
             * @param { object } handlerElement
             * @param { object } event
             * @param { number } index
             * @param { object } sliderElement
             */

            if( this.getMethods( 'onBeforeSelect' ) ){
                var __ret = this.executeMethod( 'onBeforeSelect', _this, evt, idx, this.$node );
                if( __ret == false ){
                    return;
                } else if( __ret && __ret.then ){
                    this.bind_fakeup( isTch );
                    this.__promise_wait = true;
                    return __ret.then( function( __value ){
                        if( this.__fakeup ){
                            this.remove_fakeup( isTch );
                            if( __value == false ){
                                return;
                            }
                            __fn();
                        }
                    }.bind( this ), this.remove_fakeup.bind( this, isTch ) );
                }
            }

            __fn();
        },
        click : function( evt ){
            var target = evt.target, wd = "width", client = "clientX", lft = this.rtlfunc( 'left' ) , data = this.data, isLen = !!data.ltPropContent.length;
            if( this.data.ltPropDisabled || this.__promise_wait || target.classList.contains( 'lyteSliderHandler' ) || ! target.classList.contains( 'lyteSliderFill' ) ){
                return
            }
            if( this.data.ltPropDirection != "lyteHorizontal" ){
                wd = "height"; client = "clientY"; lft = "top";
            }
            var slide_elem = this.$node.querySelector( '.lyteSlide' ),
            modified_bcr = this.bcr( slide_elem ),
            bcr = slide_elem.getBoundingClientRect(), hand = this.$node.querySelectorAll( '.lyteSliderHandler' ), appVal, max, min, fact = 1, ww = window.innerWidth;
            if( hand.length ) {
                appVal = this.getValue(  bcr[ wd ], this.rtlfunc( client, evt, ww ) - this.rtlfunc( lft == "right" ? 'left' : lft, bcr, ww ), data.ltPropMax, data.ltPropMin );
                min = this.findPrevmin1( null, appVal );
                max = this.findPrevmin1( null, appVal, true );
                if( ( max[ 1 ] || Math.max( data.ltPropMax, data.ltPropMin ) ) - appVal > appVal - ( min[ 1 ] || Math.min( data.ltPropMax, data.ltPropMin ) ) ) {
                    min[ 0 ] = min[ 0 ] != undefined ? min[ 0 ] : ( min[ 0 ] || max[ 0 ])
                    this._sel = hand[ min[ 0 ] ];
                    this._idx = min[ 0 ];
                } else {
                    max[ 0 ] = max[ 0 ] != undefined ? max[ 0 ] : min[ 0 ];
                    this._sel = hand[ max[ 0 ] ];
                    this._idx = max[ 0 ];
                }

                var __fn = function(){
                    if( appVal - data.secArr[ this._idx ].value < 0 ) {
                        fact = -1;
                    }
                    if( !isLen && data.ltPropMin > data.ltPropMax ){
                        fact *= -1;
                    }
                    this._bcr = this.bcr( this._sel );
                    this.mousemove.call( this, evt, fact * this.getLeft( modified_bcr[ wd ], 0, Math.abs( appVal - data.secArr[ this._idx ].value ) + ( isLen ? 0 : Math.min( data.ltPropMin, data.ltPropMax ) ), data.ltPropMax, data.ltPropMin ) );
                    this.callBack.call( this, this._idx, evt );
                    $L.fastdom.mutate( __cancel );
                }.bind( this ),
                __cancel = function(){
                    var clsName = "lyteMultiSliderSelected";
                    $L( '.' + clsName, this.$node ).removeClass( clsName );
                    $L( this._sel ).addClass( clsName );
                    delete this._bcr; 
                    delete this._idx; 
                    delete this._sel;
                    delete this.__promise_wait;
                }.bind( this );


                if( this.data.ltPropPromiseHandling ){
                    var cb = "onBeforeSelect";

                    if( this.getMethods( cb ) ){
                        var __ret = this.executeMethod( cb, this._sel, evt, this._idx, this.$node );

                        if( __ret == false ){
                            __cancel();
                        } else if( __ret && __ret.then ){
                            this.__promise_wait = true;
                            __ret.then( function( __value ){
                                if( __value == false ){
                                    __cancel();
                                } else {
                                    __fn();
                                }
                            }, __cancel );
                        }
                    }
                } else {
                    __fn();
                }
            }   
        },
        keydown : function( evt ){
            if( this.data.ltPropDisabled ){
                return;
            }
            var keyCode = evt.keyCode || evt.which;
            if( [ 37, 38, 39, 40, 36, 35, 33, 34 ].indexOf( keyCode ) != -1 ) {
                var active = this.$node.querySelector( '.lyteSliderHandler.lyteMultiSliderSelected' );
                if( active ){
                    var data = this.data, dir = data.ltPropDirection == "lyteHorizontal", wd =  dir ? "width" : "height", fact = 1,isLen = !!data.ltPropContent.length,
                    is_aria = data.ltPropAria;
                    
                    if( this.__promise_wait || ( /^(38|40)$/.test( keyCode ) && dir || !dir && /^(39|37)$/.test( keyCode ) ) ){
                        return;
                    }

                    if( !is_aria && /^3(3|4|5|6)$/.test( keyCode ) ){
                        return;
                    }

                    if( /^(38|37)$/.test( keyCode ) ){
                        fact = -1;
                    } else if( /^(39|40)$/.test( keyCode ) ){
                        fact = 1;
                    }

                    this._bcr = this.bcr( active );
                    this._idx = parseInt( active.getAttribute( 'data-order' ) );
                    this._sel = active;
                    var final,
                    nodeBcrwd = this.bcr( this.$node.querySelector( '.lyteSlide' ) )[ wd ];

                    final = data.ltPropScaleInterval + ( isLen ? 0 : Math.min( data.ltPropMin, data.ltPropMax ) );

                    if( is_aria ){
                        switch( keyCode ){
                            case 33 : {
                                fact = 5;
                            }
                            break;
                            case 34 : {
                                fact = -5;
                            }
                            break;
                            case 35 : {
                                final = data.ltPropMax - data[ isLen ? 'secArr' : 'ltPropValue' ][ this._idx ].value;
                            }
                            break;
                            case 36 : {
                                final = data[ isLen ? 'secArr' : 'ltPropValue' ][ this._idx ].value - data.ltPropMin;
                                fact = -1;
                            }
                            break;
                        }
                    }

                    var __fn = function(){
                        this.mousemove( evt, fact * ( this.getLeft( nodeBcrwd, 0, final, data.ltPropMax, data.ltPropMin ) ) )
                        this.callBack.call( this, this._idx, evt );
                        __delete();
                    }.bind( this ),
                    __delete = function(){
                        delete this._bcr; 
                        delete this._idx; 
                        delete this._sel;
                        delete this.__promise_wait;
                    }.bind( this );

                    if( this.data.ltPropPromiseHandling ){
                        var cb = "onBeforeSelect";

                        if( this.getMethods( cb ) ){
                            var __ret = this.executeMethod( cb, this._sel, evt, this._idx, this.$node );

                            if( __ret == false ){
                                return __delete();
                            } else if( __ret && __ret.then ){
                                this.__promise_wait = true;
                                return __ret.then( function( __value ){
                                    if( __value == false ){
                                        __delete();
                                    } else {
                                        __fn();
                                    }
                                }.bind( this ), __delete );
                            }
                        }
                    }

                    __fn();
                    evt.preventDefault();
                }
            }
        },

        focus : function( _this, evt ){
            var active = this.$node.querySelector( '.lyteSliderHandler.lyteMultiSliderSelected' );
            if( active == _this ){
                return;
            }
            active && active.classList.remove( 'lyteMultiSliderSelected' );
            _this.classList.add( 'lyteMultiSliderSelected' );
        }
    },

    bcr : function( node ){
        var __bcr = node.getBoundingClientRect(),
        width = node.offsetWidth,
        rendered_width = __bcr.width,
        rendered_height = __bcr.height,
        __scale = width / rendered_width,
        excess_width = width - rendered_width,
        excess_height = node.offsetHeight - rendered_height;

        return {
            left : __bcr.left - ( this._dir ? excess_width : 0 ),
            top : __bcr.top,
            width : rendered_width * __scale,
            height : rendered_height * __scale,
            right : __bcr.right + ( this._dir ? 0 : excess_width ),
            bottom : __bcr.bottom + excess_height,
            scale : __scale
        };
    },

    get_client : function( evt, clientX, wwidth ){
        var bcr = this.bcr( this.$node ),
        scale = bcr.scale,
        is_rtl = this._dir;

        if( clientX == "clientX" ){
            if( is_rtl ){
                return wwidth - ( bcr.right - ( bcr.right - evt[ clientX ] ) * scale );
            } else {
                return bcr.left + ( evt[ clientX ] - bcr.left ) * scale;
            }
        } else {
            return bcr.top + ( evt[ clientX ] - bcr.top ) * scale;
        }

    }
});

;( function(){
    var __fn = function( evt ){
        var is_resize = evt.type == "resize";

        clearTimeout( window.__slider_time );
        window.__slider_time = setTimeout( function(){
            delete  window.__slider_time;
            
            var elems = document.body.getElementsByTagName( 'lyte-multislider' ),
            len = elems.length;

            for( var i = 0; i < len; i++ ){
                var cur = elems[ i ],
                rgx = /%/;
                if( rgx.test( cur.ltProp( 'width' ) || "" ) || rgx.test( cur.ltProp( 'height' ) || "" ) ){
                    cur.reRender();
                }
            }
        }, is_resize ? 5 : 500 );
    };

    window.addEventListener( 'resize', __fn, true );
    window.addEventListener( 'orientationchange', __fn, true );
} )();

/**
 * @syntax nonYielded
 * @dollar 0 [ { "value" : 30, "min" : 20, "max" : 40 }, { "value" : 50, "min" : 40, "max" : 60 }, { "value" : 80, "min" : 70} ]
 * @dollar 1 [ "red", "green", "yellow" ]
 * <lyte-multislider lt-prop-max = '100' lt-prop-width='600px' lt-prop-value = '{{$0}}' lt-prop-color = '{{$1}}' lt-prop-discrete = 10 > </lyte-multislider> 
 */

 /**
  * @syntax yielded
  * @dollar 0 [ { "value" : 30, "class" : "class1" }, { "value" : 50, "class" : "class2"}, { "value" : 80, "class" : "class3" } ]
  * @dollar 1 [ "red", "green", "yellow" ]
  * <lyte-multislider lt-prop-yield = true lt-prop-max = '100' lt-prop-width='600px' lt-prop-value = '{{$0}}' lt-prop-color = '{{$1}}'> 
  *    <template is = "registerYield" yield-name = "lyteMultiSlider"> 
  *        <div class="lyteScaleOption"> 
  *            <span class="lyteScaleLine" style="left: 0"> 
  *                <span> </span> 
  *                <span class="lyteScalLable"> 0 </span> 
  *            </span>
  *            <span class="lyteScaleLine" style="left: 50%"> 
  *                <span> </span> 
  *                <span class="lyteScalLable">  50</span> 
  *            </span> 
  *            <span class="lyteScaleLine" style="left: 100%"> 
  *                <span> </span> 
  *                <span class="lyteScalLable">  100</span> 
  *            </span> 
  *        </div> 
  *    </template> 
  * </lyte-multislider> 
  */