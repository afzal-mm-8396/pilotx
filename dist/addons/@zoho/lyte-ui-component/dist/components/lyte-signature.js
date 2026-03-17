/**
 * This component is used to get hand written inputs and convert them to images
 * @component lyte-signature
 * @utility refresh,clear,downloadAsImage,reset,resetQueue
 * @version 3.17.0
 */

/**
 * @domEvents commonEvents wheel
 */

Lyte.Component.register("lyte-signature", {
_template:"<template tag-name=\"lyte-signature\" lyte-signature=\"\"> <canvas onmousedown=\"{{action('mousedown',event)}}\" ontouchstart=\"{{action('mousedown',event)}}\" tabindex=\"0\" onkeydown=\"{{action('keydown',event)}}\">Canvas not supported</canvas> <template is=\"if\" value=\"{{expHandlers(ltPropImageUrl,'&amp;&amp;',showImage)}}\"><template case=\"true\"> <img src=\"{{ltPropImageUrl}}\"> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropInsertStroke","ltPropInsertLineWidth","ltPropInsertLineDash","ltPropFileName","ltPropDontModifyCurrent","ltPropImageUrl","ltPropUndoRedo","ltPropMode","ltPropEraseStroke","ltPropEraseLineWidth","ltPropBackgroundColor","showImage","undoQueue","redoQueue","strokes"],
_observedAttributesType :["string","number","array","string","boolean","string","boolean","string","string","number","string","boolean","array","array","array"],

	_lyteUtilFunctions : [ "refresh", "clear", "downloadAsImage", "reset", "resetQueue" ],
	data : function(){

		var default_values = _lyteUiUtils.getDefault( 'lyte-signature' );

		return {
			/**
			 * @componentProperty {colorString} ltPropInsertStroke='#000000'
			 * @condition ltPropMode Insert
			 * @mandatory
			 * @version 3.17.0
			 * @input
			 */			
			ltPropInsertStroke : Lyte.attr( 'string', { default : default_values.insertStroke || "#000000", input : true }),
			/**
			 * @componentProperty {number} ltPropInsertLineWidth=1
			 * @condition ltPropMode Insert
			 * @mandatory
			 * @version 3.17.0
			 * @input
			 */				
			ltPropInsertLineWidth : Lyte.attr( 'number', { default : default_values.insertLineWidth || 1, input : true }),
			/**
			 * @componentProperty {array} ltPropInsertLineDash=[]
			 * @condition ltPropMode Insert
			 * @mandatory
			 * @version 3.17.0
			 * @input
			 */				
			ltPropInsertLineDash : Lyte.attr( 'array', { default : default_values.insertLineDash || [], input : true }),
			/**
			 * @componentProperty {string} ltPropFileName=sample_sign
			 * @version 3.17.0
			 * @input
			 */				
			ltPropFileName : Lyte.attr( 'string', { default : default_values.fileName || "sample_sign", input : true }),
			/**
			 * @componentProperty {boolean} ltPropDontModifyCurrent=false
			 * @version 3.17.0
			 * @input
			 */				
			ltPropDontModifyCurrent : Lyte.attr( 'boolean', { default : default_values.dontModifyCurrent || false, input : true }),
			/**
			 * @componentProperty {string} ltPropImageUrl=''
			 * @version 3.17.0
			 * @input
			 */				
			ltPropImageUrl : Lyte.attr( 'string', { default : default_values.imageUrl || "", input : true } ),
			/**
			 * @componentProperty {boolean} ltPropUndoRedo=false
			 * @version 3.17.0
			 * @input
			 */				
			ltPropUndoRedo : Lyte.attr( 'boolean', { default : default_values.undoredo || false, input : true } ),
			/**
			 * @componentProperty {Insert | Erase} ltPropMode='Insert'
			 * @version 3.17.0
			 * @input
			 */				
			ltPropMode : Lyte.attr( 'string', { default : default_values.mode || 'Insert', input : true } ),
			/**
			 * @componentProperty {colorString} ltPropEraseStroke='white'
			 * @condition ltPropMode Erase
			 * @version 3.17.0
			 * @input
			 */			
			ltPropEraseStroke : Lyte.attr( 'string', { default : default_values.eraseStroke || "white", input : true }),
			/**
			 * @componentProperty {number} ltPropEraseLineWidth=3
			 * @condition ltPropMode Erase 
			 * @version 3.17.0
			 * @input
			 */				
			ltPropEraseLineWidth : Lyte.attr( 'number', { default : default_values.eraseLineWidth || 5, input : true }),
			
			ltPropBackgroundColor : Lyte.attr( 'string', { default : default_values.backgroundColor || "white", input : true } ),

			showImage :  Lyte.attr( 'boolean', { default : true } ),
			undoQueue : Lyte.attr( 'array', { default : [] } ),
			redoQueue : Lyte.attr( 'array', { default : [] } ),
			strokes : Lyte.attr( 'array', { default : [] } )
		}		
	},

	lineObs : function( arg ){
		if( this.data.ltPropDontModifyCurrent ){
			return;
		}

		var ctx = this._context,
		obj = {
			ltPropInsertStroke : "strokeStyle",
			ltPropInsertLineWidth : "lineWidth"
		};

		if( !ctx ){
			return;
		}

		ctx[ obj[ arg.item ] ] = arg.newValue;
		ctx.stroke();
	}.observes( 'ltPropInsertLineWidth', 'ltPropInsertStroke' ),

	dashObs: function(  ){
		if( this.data.ltPropDontModifyCurrent ){
			return;
		}

		var ctx = this._context;
		if( !ctx ){
			return;
		}

		var dash = this.getData('ltPropInsertLineDash') || [];

		ctx.setLineDash( dash );
	}.observes( 'ltPropInsertLineDash' ),

	getActiveStrokeConfig : function(){
		var mode = this.data.ltPropMode,
		config = { mode : mode };

		if( mode === 'Insert' ){
			config.strokeStyle = this.data.ltPropInsertStroke;
			config.lineWidth = this.data.ltPropInsertLineWidth;
			config.lineDash = ( this.data.ltPropInsertLineDash || [] ).slice();
		} else {
			config.strokeStyle = this.data.ltPropEraseStroke;
			config.lineWidth = this.data.ltPropEraseLineWidth;
			config.lineDash = [];
		}

		return config;
	},

	prepareStrokeRecording : function( point ){
		var config = this.getActiveStrokeConfig();
		this._currentStroke = {
			mode : config.mode,
			strokeStyle : config.strokeStyle,
			lineWidth : config.lineWidth,
			lineDash : ( config.lineDash || [] ).slice(),
			points : [ { x : point.x, y : point.y } ]
		};
		this.applyStrokeConfigToContext( config );
	},

	applyStrokeConfigToContext : function( config ){
		if( !this._context ){
			return;
		}
		this._context.lineWidth = config.lineWidth;
		this._context.strokeStyle = config.strokeStyle;
		this._context.setLineDash( config.lineDash || [] );
	},

	appendPointToCurrentStroke : function( point ){
		if( this._currentStroke ){
			this._currentStroke.points.push( { x : point.x, y : point.y } );
		}
	},

	finalizeCurrentStroke : function(){
		if( this._currentStroke && this._currentStroke.points.length ){
			this.data.strokes.push( this._currentStroke );
		}
		this._currentStroke = null;
	},

	cloneStrokes : function( source ){
		return ( source || [] ).map( function( stroke ){
			return {
				mode : stroke.mode,
				strokeStyle : stroke.strokeStyle,
				lineWidth : stroke.lineWidth,
				lineDash : ( stroke.lineDash || [] ).slice(),
				points : ( stroke.points || [] ).map( function( point ){
					return { x : point.x, y : point.y };
				})
			};
		});
	},

	redrawAllStrokes : function(){
		if( !this._context ){
			return;
		}
		this.wipeCanvas();
		this.drawBaseImage();
		var strokes = this.data.strokes || [];
		for( var i = 0; i < strokes.length; i++ ){
			this.drawStroke( strokes[ i ] );
		}
		if( this._currentStroke && this._currentStroke.points && this._currentStroke.points.length ){
			this.drawStroke( this._currentStroke );
		}
	},

	drawStroke : function( stroke ){
		var points = stroke.points || [];
		if( !points.length ){
			return;
		}

		var ctx = this._context;
		ctx.save();
		var fallbackColor = this.data.ltPropInsertStroke;
		var fallbackWidth = this.data.ltPropInsertLineWidth || 1;
		ctx.lineWidth = stroke.lineWidth != void 0 ? stroke.lineWidth : fallbackWidth;
		ctx.strokeStyle = stroke.strokeStyle || fallbackColor;
		ctx.setLineDash( stroke.lineDash || [] );
		ctx.beginPath();
		ctx.moveTo( points[ 0 ].x, points[ 0 ].y );
		for( var i = 1; i < points.length; i++ ){
			ctx.lineTo( points[ i ].x, points[ i ].y );
		}
		ctx.stroke();
		ctx.restore();
	},

	drawBaseImage : function(){
		if( this._baseImage ){
			this._context.drawImage( this._baseImage, 0, 0, this._canvas.width, this._canvas.height );
		}
	},

	wipeCanvas : function(){
		if( !this._canvas || !this._context ){
			return;
		}
		var canvas = this._canvas;
		this._context.fillStyle = this.data.ltPropBackgroundColor;
		this._context.fillRect( 0, 0, canvas.width, canvas.height );
	},

	updateInsertStrokesProperty : function( field, value, shouldRedraw ){
		var updated = false,
			strokes = this.data.strokes || [];

		strokes.forEach( function( stroke ){
			if( stroke.mode === 'Insert' ){
				stroke[ field ] = value;
				updated = true;
			}
		});

		if( this._currentStroke && this._currentStroke.mode === 'Insert' ){
			this._currentStroke[ field ] = value;
			updated = true;
		}

		if( updated && shouldRedraw !== false ){
			this.redrawAllStrokes();
		}

		return updated;
	},

	updateInsertStrokesDash : function( dash, shouldRedraw ){ 
		var updated = false,
			strokes = this.data.strokes || [];

		strokes.forEach( function( stroke ){
			if( stroke.mode === 'Insert' ){
				stroke.lineDash = ( dash || [] ).slice();
				updated = true;
			}
		});

		if( this._currentStroke && this._currentStroke.mode === 'Insert' ){
			this._currentStroke.lineDash = ( dash || [] ).slice();
			updated = true;
		}

		if( updated && shouldRedraw !== false ){
			this.redrawAllStrokes();
		}

		return updated;
	},

	didConnect : function(){
		this._canvas = this.$node.children[ 0 ];
		this._context = this._canvas.getContext( '2d' );
		this._currentStroke = null;
		this._baseImage = null;
		this.set_dimension();

		this.$node.refresh = this.set_dimension.bind( this );
		this.$node.clear = this.clear.bind( this );
		this.$node.downloadAsImage = this.download.bind( this );
		this.$node.reset = this.reset.bind( this );
		this.$node.resetQueue = this.resetQueue.bind( this );
		this.$node.redraw = this.redraw.bind( this );

	},

	reset : function(){
		this.setData( 'showImage', true );
		this.set_dimension();
		this.data.strokes = [];
		this._currentStroke = null;
		this.resetQueue();
	},

	resetQueue : function(){
		this.data.undoQueue = [];
		this.data.redoQueue = [];
		this.call_queueUpdate();
	},

	clear : function(){
		this.wipeCanvas();
		this._baseImage = null;
		this.data.strokes = [];
		this._currentStroke = null;
		this.resetQueue();
	},

	redraw : function(){
		var updated = false;
		updated = this.updateInsertStrokesProperty( 'strokeStyle', this.data.ltPropInsertStroke, false ) || updated;
		updated = this.updateInsertStrokesProperty( 'lineWidth', this.data.ltPropInsertLineWidth, false ) || updated;
		updated = this.updateInsertStrokesDash( this.data.ltPropInsertLineDash || [], false ) || updated;

		if( updated ){
			this.redrawAllStrokes();
		}
	},

	download : function(){
		var canvas = this._canvas;
		var a = document.createElement( 'a' );
		a.download = this.data.ltPropFileName;
		a.href = canvas.toDataURL( "image/png" );

		a.style.position = 'absolute';

		/**
         * This method is called before downloading the signature
         * @method onBeforeDownload
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 3.17.0
         * @param { object } anchorTag
		 * @param { object } signatureElement
         */

		if( this.getMethods( 'onBeforeDownload' ) ){
			if( this.executeMethod( 'onBeforeDownload', a, this.$node ) == false ){
				return;
			}
		}
		this.$node.appendChild( a );
		a.click();
		a.remove();
	},

	didDestroy : function(){
		this.remove_events();

		[ '_canvas', '_context', '_currentStroke', '_baseImage', 'refresh', 'clear', 'downloadAsImage', 'reset', 'resetQueue' ].forEach( function( item ){
			delete this[ item ];
		}.bind( this ) );
	},

	set_dimension : function(){
		var canvas = this._canvas,
		_this = this;

		$L.fastdom.measure( function(){
			var bcr = canvas.getBoundingClientRect();

			$L.fastdom.mutate( function(){
				canvas.setAttribute( 'width', bcr.width );
				canvas.setAttribute( 'height', bcr.height );	
				_this._context.fillStyle = _this.data.ltPropBackgroundColor;
				_this._context.fillRect( 0, 0, canvas.width, canvas.height );
				_this.include_image();
				_this.redrawAllStrokes();
			});

		});
	},

	include_image : function(){
		var img = this.$node.querySelector( 'img' );
		if( img ){
			var loadFn = function(){
				var ctx = this._context,
				canvas = this._canvas;
				ctx.drawImage( img, 0, 0, canvas.width, canvas.height );
				this._baseImage = img;
				this.setData( 'showImage', false );
				if( ( this.data.strokes || [] ).length ){
					this.redrawAllStrokes();
				}
			}.bind( this );

			if( img.complete ){
				loadFn();
			} else{
				img.onload = loadFn;
			}
		}
	},

	getEvent : function( evt ){
		var touches = evt.touches || [ evt ];

		if( touches.length > 1 ){
			return;
		}

		return touches[ 0 ];
	},

	mousemove : function( ev ){
		var evt = this.getEvent( ev );
		if( !evt ){
			return;
		}
		this._moved = true;
		var coor = this.get_coordinate( evt ),
		ctx = this._context;

		if( !ctx ){
			return;
		}

		var activeStroke = this._currentStroke || this.getActiveStrokeConfig();
		ctx.lineWidth = activeStroke.lineWidth;
		ctx.strokeStyle = activeStroke.strokeStyle;
		ctx.setLineDash( activeStroke.lineDash || [] );

		ctx.lineTo( coor.x, coor.y );
		ctx.stroke();
		this.appendPointToCurrentStroke( coor );

		/**
         * This method is called when the user draws on the canvas
         * @method onDrawMove
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 3.17.0
         * @param { object } event
		 * @param { object } signatureElement
         */

		if( this.getMethods( 'onDrawMove' ) ){
			this.executeMethod( 'onDrawMove', ev, this.$node );
		}
		ev.preventDefault();
	},

	remove_events : function(){
		if( this._move ){

			var ns = "removeEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" );
			
			[ { name : 'mousemove', evt : this._move }, { name : 'mouseup', evt : this._up }, { name : 'touchmove', evt : this._move }, { name : 'touchend', evt : this._up } ].forEach( function( item ){
				document[ ns ]( item.name, item.evt, true );
			}.bind( this ));

			delete this._move;
			delete this._up;
		}
	},

	mouseup : function( evt ){
		this.remove_events();
		this.finalizeCurrentStroke();
		if( this._moved && this.data.ltPropUndoRedo ){
			this.push_to_queue();
		}

		/**
         * This method is called when the user finishes drawing on the canvas
         * @method onDrawEnd
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 3.17.0
         * @param { object } event
		 * @param { boolean } booleanToIndicateIfMoved
		 * @param { object } signatureElement
         */

		if( this.getMethods( 'onDrawEnd' ) ){
			this.executeMethod( 'onDrawEnd', evt, this._moved, this.$node );
		}
		delete this._moved;
	},

	push_to_queue : function( snapshot ){
		var data = snapshot || this.cloneStrokes( this.data.strokes );
		this.data.undoQueue.push( data );
		this.data.redoQueue.splice( 0 );

		this.call_queueUpdate();
	},

	call_queueUpdate : function(){

		/**
         * This method is called when the undo/redo queue is updated
         * @method onUndoRedoQueueUpdate
         * @author ponkarthikeyan.t@zohocorp.com
		 * @condition ltPropUndoRedo true
         * @version 3.17.0
         * @param { array } undoQueue
		 * @param { array } redoQueue
		 * @param { object } signatureElement
         */

		var callback_name = 'onUndoRedoQueueUpdate';
		if( this.getMethods( callback_name ) ){
			this.executeMethod( callback_name, this.data.undoQueue, this.data.redoQueue, this.$node );
		}
	},

	get_coordinate : function( evt ){
		var bcr = this.$node.getBoundingClientRect();
		return{
			x : evt.clientX - bcr.left,
			y : evt.clientY - bcr.top
		};
	},

	undo : function( evt ){
		var undo = this.data.undoQueue,
		redo = this.data.redoQueue;

		var current = undo.pop(),
		last_before = $L( undo ).get( -1 );

		if( current ){
			redo.push( this.cloneStrokes( current ) );
		}

		this.data.strokes = this.cloneStrokes( last_before ) || [];
		this._currentStroke = null;
		this.redrawAllStrokes();
		if( evt ){
			evt.preventDefault();
		}
		this.call_queueUpdate();
	},

	redo : function( evt ){
		var redo = this.data.redoQueue,
		current = redo.pop();

		if( current ){
			var snapshot = this.cloneStrokes( current );
			this.data.undoQueue.push( snapshot );
			this.data.strokes = this.cloneStrokes( snapshot );
			this._currentStroke = null;
			this.redrawAllStrokes();
			if( evt ){
				evt.preventDefault();
			}
			this.call_queueUpdate();
		}

	},

	actions : {
		mousedown : function( evt ){
			var ev = this.getEvent( evt ),
			namemove = "mousemove",
			nameup = "mouseup";

			if( ev ){
				if( ev != evt ){
					namemove = 'touchmove';
					nameup = 'touchend';
				}
			} else {
				return;
			}

			/**
			 * This method is called before the user starts drawing on the canvas
			 * @method onBeforeDrawSelect
			 * @author ponkarthikeyan.t@zohocorp.com
			 * @version 3.17.0
			 * @param { object } event
			 * @param { object } signatureElement
			 */

			if( this.getMethods( 'onBeforeDrawSelect' ) ){
				if( this.executeMethod( 'onBeforeDrawSelect', evt, this.$node ) == false ){
					return;
				}
			}

			var coor = this.get_coordinate( ev ),
			ctx = this._context;

			ctx.beginPath();

			ctx.moveTo( coor.x, coor.y );
			this.prepareStrokeRecording( coor );

			this._move = this.mousemove.bind( this );
			this._up = this.mouseup.bind( this );

			var ns = "addEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" );

			document[ ns ]( namemove, this._move, true );
			document[ ns ]( nameup, this._up, true );

			/**
			 * This method is called when the user starts drawing on the canvas
			 * @method onDrawSelect
			 * @author ponkarthikeyan.t@zohocorp.com
			 * @version 3.17.0
			 * @param { object } event
			 * @param { object } signatureElement
			 */

			if( this.getMethods( 'onDrawSelect' ) ){
				this.executeMethod( 'onDrawSelect', evt, this.$node );
			}
			if( namemove == 'touchmove' ){
				evt.preventDefault();
			}
		},

		keydown : function( evt ){
			if( this.data.ltPropUndoRedo ){
				var keycode = evt.which || evt.keyCode,
				is_meta = evt.metaKey != void 0 ? evt.metaKey : evt.ctrlKey;

				if( keycode == 90 && is_meta ){
					if( evt.shiftKey ){
						this.redo( evt );
					} else {
						this.undo( evt );
					}
				}
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-signature></lyte-signature>
 */