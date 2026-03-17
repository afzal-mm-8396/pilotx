/**
 * Renders a hovercard
 * @component lyte-hovercard
 * @dependencies lyte-popover,lyte-wormhole
 * @version  3.1.0
 * @utility alignHovercard, calculateOffset
*/
/**
 * @customElement  lyte-hovercard-content
 */
Lyte.Component.register( 'lyte-hovercard', {
_template:"<template tag-name=\"lyte-hovercard\" lyte-hovercard=\"\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropKeepHovercardDom,'!'),'&amp;&amp;',ltPropShow)}}\"><template case=\"true\"> <lyte-wormhole case=\"{{ltPropShow}}\" style=\"{{if(ltPropShowCopy,'visibility:visible','display:none')}}\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteHovercardWrapperElem hoverCardWrapper {{ltPropClass}}\" id=\"{{ltPropId}}\"> <lyte-yield yield-name=\"hoverCardYield\"></lyte-yield> </div> </template> </lyte-wormhole> </template></template> <template is=\"if\" value=\"{{ltPropUseBetaPopover}}\"><template case=\"true\"> <lyte-beta-popover class=\"lyteHoverCard\" lt-prop=\"{{stringify(ltPropPopover)}}\" lt-prop-close-on-scroll=\"{{ltPropCloseOnScroll}}\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-aria-attributes=\"{{ltPropAriaAttributes}}\" lt-prop-wrapper-class=\"lyteHovercardPopover {{ltPropPopoverWrapperClass}} {{if(ltPropFollowCursor,'lyteHoverCardFollowCursor','')}}\" lt-prop-close-on-body-click=\"false\" lt-prop-type=\"{{ltPropType}}\" lt-prop-show-close-button=\"false\" lt-prop-bind-to-body=\"true\" lt-prop-placement=\"{{ltPropPlacement}}\" lt-prop-offset=\"{{ltPropOffset}}\" lt-prop-close-on-escape=\"{{ltPropCloseOnEscape}}\" lt-prop-prevent-focus=\"{{ltPropPreventFocus}}\" lt-prop-dimmer=\"{{ltPropDimmer}}\" lt-prop-animation=\"{{ltPropAnimation}}\" lt-prop-auto-align=\"{{ltPropAutoAlign}}\" on-before-close=\"{{method(&quot;onPopoverBeforeClose&quot;)}}\" on-close=\"{{method(&quot;onPopoverClose&quot;)}}\" on-before-show=\"{{method(&quot;onPopoverBeforeShow&quot;)}}\" on-show=\"{{method(&quot;onPopoverBeforeShow&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <template is=\"if\" value=\"{{ltPropKeepHovercardDom}}\"><template case=\"true\"> <div class=\"lyteHovercardWrapperElem hoverCardWrapper {{ltPropClass}}\" id=\"{{ltPropId}}\"> <lyte-yield yield-name=\"hoverCardYield\"></lyte-yield> </div> </template></template> </template> </lyte-beta-popover> </template><template case=\"false\"> <lyte-popover class=\"lyteHoverCard\" lt-prop=\"{{stringify(ltPropPopover)}}\" lt-prop-close-on-scroll=\"{{ltPropCloseOnScroll}}\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-aria-attributes=\"{{ltPropAriaAttributes}}\" lt-prop-wrapper-class=\"lyteHovercardPopover {{ltPropPopoverWrapperClass}} {{if(ltPropFollowCursor,'lyteHoverCardFollowCursor','')}}\" lt-prop-close-on-body-click=\"false\" lt-prop-type=\"{{ltPropType}}\" lt-prop-show-close-button=\"false\" lt-prop-bind-to-body=\"true\" lt-prop-placement=\"{{ltPropPlacement}}\" lt-prop-offset=\"{{ltPropOffset}}\" lt-prop-close-on-escape=\"{{ltPropCloseOnEscape}}\" lt-prop-prevent-focus=\"{{ltPropPreventFocus}}\" lt-prop-dimmer=\"{{ltPropDimmer}}\" lt-prop-animation=\"{{ltPropAnimation}}\" lt-prop-auto-align=\"{{ltPropAutoAlign}}\" on-before-close=\"{{method(&quot;onPopoverBeforeClose&quot;)}}\" on-close=\"{{method(&quot;onPopoverClose&quot;)}}\" on-before-show=\"{{method(&quot;onPopoverBeforeShow&quot;)}}\" on-show=\"{{method(&quot;onPopoverBeforeShow&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <template is=\"if\" value=\"{{ltPropKeepHovercardDom}}\"><template case=\"true\"> <div class=\"lyteHovercardWrapperElem hoverCardWrapper {{ltPropClass}}\" id=\"{{ltPropId}}\"> <lyte-yield yield-name=\"hoverCardYield\"></lyte-yield> </div> </template></template> </template> </lyte-popover> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropShowCopy","'visibility:visible'","'display:none'"]}}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropDisplay","ltPropShow","ltPropOriginElem","ltPropMaxHeight","ltPropWidth","ltPropHeight","ltPropPlacement","ltPropClass","ltPropId","ltPropShowDelay","ltPropHideDelay","ltPropMaxDisplayTime","ltPropKeepAlive","ltPropFollowCursor","ltPropPopoverWrapperClass","ltPropOffset","ltPropCloseOnEscape","ltPropAutoShow","ltPropHideOnClick","ltPropAria","ltPropAriaAttributes","ltPropPreventFocus","ltPropMaxWidth","ltPropType","ltPropDimmer","ltPropAnimation","ltPropAutoAlign","ltPropPopover","ltPropCloseOnScroll","ltPropUseBetaPopover","ltPropAddFocusAndBlur","ltPropKeepHovercardDom","mousePosition","mouseover","originEle","popoverTagName"],
_observedAttributesType :["boolean","boolean","string","string","string","string","string","string","string","number","number","number","boolean","boolean","string","object","boolean","boolean","boolean","boolean","object","boolean","string","string","object","string","boolean","object","boolean","boolean","boolean","boolean","array","boolean","string","string"],

  _lyteUtilFunctions : ["alignHovercard","calculateOffset"], 
  data : function(){
    return {
     
      'ltPropDisplay': Lyte.attr('boolean', { 'default': true, input: true } ),
      /** 
       * @componentProperty {boolean} ltPropShow=false
       * @version 3.1.0
       * @output
       * @input
       */
      'ltPropShow': Lyte.attr('boolean', { 'default': false, input: true,output:true } ),
        /** 
       * @componentProperty {string} ltPropOriginElem=''
       * @version 3.1.0
       * @input
       */
        'ltPropOriginElem' : Lyte.attr( 'string', { 'default' : '' , input:true} ),
        /** 
       * @componentProperty {string} ltPropMaxHeight=''
       * @version 3.1.0
       * @input
       */
      'ltPropMaxHeight': Lyte.attr('string', { 'default': '', input: true } ),
        /** 
       * @componentProperty {string} ltPropWidth=''
       * @version 3.1.0
       * @input
       */
      'ltPropWidth': Lyte.attr('string', { 'default': '', input: true } ),
        /** 
       * @componentProperty {string} ltPropHeight=auto
       * @version 3.1.0
       * @input
       */
      'ltPropHeight': Lyte.attr('string', { 'default': 'auto', input: true } ),
        /** 
       * @componentProperty {bottom|bottomLeft|bottomRight|top|topLeft|topRight|left|right} ltPropPlacement
       * @version 3.1.0
       * @input
       */
      'ltPropPlacement': Lyte.attr('string', { 'default': '', input: true } ),
        /** 
       * @componentProperty {string} ltPropClass=''
       * @version 3.1.0
       * @input
       */
        'ltPropClass' : Lyte.attr( 'string', {
           'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-hovercard', 'class', '' ) ,
          input: true
          } ),
        /** 
       * @componentProperty {string} ltPropId=''
       * @version 3.1.0
       * @input
       */
        'ltPropId' : Lyte.attr( 'string', { 'default' : '' , input:true} ),
        /** 
       * @componentProperty {number} ltPropShowDelay=0
       * @version 3.1.0
       * @input
       */
        'ltPropShowDelay' : Lyte.attr( 'number', { 'default': 0 , input:true} ),
        /** 
       * @componentProperty {number} ltPropHideDelay=0
       * @version 3.1.0
       * @input
       */
      'ltPropHideDelay': Lyte.attr('number', { 'default': 0, input: true } ),
        /** 
       * @componentProperty {number} ltPropMaxDisplayTime=5000
       * @version 3.1.0
       * @input
       */
      'ltPropMaxDisplayTime': Lyte.attr('number', { 'default': 5000, input: true } ),
        /** 
       * @componentProperty {boolean} ltPropKeepAlive=true
       * @version 3.1.0
       * @input
       */
      'ltPropKeepAlive': Lyte.attr('boolean', { 'default': true, input: true } ),
        
      'ltPropFollowCursor': Lyte.attr('boolean', { 'default': false, input: true } ),
        /** 
       * @componentProperty {string} ltPropPopoverWrapperClass
       * @version 3.1.0
       * @input
       */
        'ltPropPopoverWrapperClass' : Lyte.attr( 'string',{
          'default': _lyteUiUtils.resolveDefaultValue( 'lyte-hovercard', 'popoverWrapperClass', '' ),
          input: true
         }),
        /** 
       * @componentProperty {object} ltPropOffset={}
       * @version 3.1.0
       * @input
       */
      'ltPropOffset': Lyte.attr('object', { 'default': {}, input: true } ),
        /** 
       * @componentProperty {boolean} ltPropCloseOnEscape=true
       * @version 3.1.0
       * @input
       */
      'ltPropCloseOnEscape': Lyte.attr('boolean', { 'default': true, input: true } ),
        
        'ltPropAutoShow' : Lyte.attr( 'boolean', { 'default' : false}),
         /** 
        * @componentProperty {boolean} ltPropHideOnClick=false
        * @version 3.1.0
        * @input
        */
      'ltPropHideOnClick': Lyte.attr('boolean', {
         'default': _lyteUiUtils.resolveDefaultValue('lyte-hovercard', 'hideOnClick', false), input: true
         } ),
         /**
          * @componentProperty {boolean} ltPropAria
          * @version 3.1.0
          * @default false
          * @input
          */
      "ltPropAria": Lyte.attr('boolean', { default: false, input: true } ),
        /**
         * @componentProperty {object} ltPropAriaAttributes={}
         * @condition ltPropAria true
         * @version 3.1.0
         * @input
         */
      "ltPropAriaAttributes": Lyte.attr('object', { default: {}, input: true } ),
        
      "ltPropPreventFocus": Lyte.attr('boolean', { default: true, input: true } ),
         /**
         * @componentProperty {string} ltPropMaxWidth
         * @input
         */
       "ltPropMaxWidth": Lyte.attr('string', { default: '', input: true }),
      /**
        * @componentProperty {callout|box} ltPropType='callout'
        * @input
        */
        "ltPropType" : Lyte.attr('string',{default :'callout', input: true}),
        
        "ltPropDimmer":Lyte.attr("object",{"default":{"color":"black","opacity":"0.4"}}),
      
        "ltPropAnimation":Lyte.attr("string",{"default":"fade"}), //fade,zoom
        /**
         * @componentProperty {boolean} ltPropAutoAlign=false
         * @input
         */
        "ltPropAutoAlign" : Lyte.attr('boolean', {default : false, input:true}),
        "ltPropPopover" : Lyte.attr('object', { default : {} } ),
        /**
         * @componentProperty {boolean} ltPropCloseOnScroll=true
         * @input
         */
        "ltPropCloseOnScroll" : Lyte.attr('boolean', {default: true, input:true}),
        "ltPropUseBetaPopover" : Lyte.attr('boolean', { default : false}),
        "ltPropAddFocusAndBlur": Lyte.attr('boolean', { 'default': false }),
        "ltPropKeepHovercardDom": Lyte.attr('boolean', { 'default': false }),
        'mousePosition' : Lyte.attr( 'array', { 'default' : [] } ),
        'mouseover' : Lyte.attr( 'boolean', { 'default' : false } ),
        'originEle' : Lyte.attr( 'string', { 'default' : ''}),
        'popoverTagName' : Lyte.attr('string', {'default':'lyte-popover'})
    }   
  },
  init : function() {
    if( this.getData('ltPropAria') ){
      this.setData('ltPropAutoShow', true)
    } 
    /**
     * @method beforeRender
     * @param component
    */
    if( this.getMethods( 'beforeRender' ) ){
            this.executeMethod( 'beforeRender', this.$node );
    }
    if(this.getData('ltPropUseBetaPopover')){
        this.setData('popoverTagName', 'lyte-beta-popover')
    }
 },
  didConnect : function(){
    
    this._popover = this.$node.getElementsByTagName( this.getData('popoverTagName') )[0]
   this._hovercardScroll = this.hovercardScroll.bind( this );
    this._hovercardHideOnClick = this.hovercardHideOnClick.bind(this)
    this._mousemove = this.mousemove.bind(this);
    this._oriEleMouseMove = this.oriEleMousemove.bind(this)
    this._originEleFocus = this.originEleFocus.bind(this)
    this._originEleBlur= this.originEleBlur.bind(this)
    if(this.getData('ltPropKeepHovercardDom')){
      const childComp = this._popover.getChildComp()
      this._childComp = childComp
    }
    if(this.getData('ltPropOriginElem')){
      try{
        const originElement = this.getOriginElement(this.getData('ltPropOriginElem'))
        if(!originElement){
          console.error("Provide a valid selector for 'ltPropOriginElem'; '"+this.getData('ltPropOriginElem') +"' is not a valid origin selector for the Hovercard component");
        }
        
      } catch(err){
        console.warn("Provide a valid selector for 'ltPropOriginElem'; '"+this.getData('ltPropOriginElem') +"' is not a valid origin element selector for the Hovercard component");
      }
    }
    if (this.getData('ltPropAddFocusAndBlur') && this.getData('ltPropOriginElem')) {
      this.addFocus()

    }
    if(this.getData('ltPropAutoShow') && this.getData('ltPropOriginElem')){
      this.setMouseMove()
      this.addMutationObserver()
    }
    $L.fastdom.measure( function() {
         var fg = _lyteUiUtils.getRTL();
         $L.fastdom.mutate( function(){
           if( fg ) {
             this.direction = true;
           }
         }.bind( this ) )
    }.bind( this ) )
    _lyteUiUtils.dispatchEvent( 'afterrender', this.$node ); 

    /**
    * @method afterRender
    * @param component
   */
    if( this.getMethods( 'afterRender' ) ) {
       this.executeMethod('afterRender', this.$node);
    }
    this.$node.alignHovercard = function(){
      this._popover = this._popover || this.$node.getElementsByTagName( this.getData('popoverTagName'))[0]
      if(this._popover && this._popover.alignPopover){
        this._popover.alignPopover()
      }
    }.bind( this ) 
    this.$node.calculateOffset = function(){
      this._popover = this._popover || this.$node.getElementsByTagName( this.getData('popoverTagName'))[0]
      if(this._popover && this._popover.calculateOffset){
        this._popover.calculateOffset()
      }
    }.bind( this ) 
  },
  didDestroy : function(){
    this.$node.classList.remove('lyteActive')
    if( this.getData( 'ltPropHideOnClick') ){
      _lyteUiUtils.removeEventListenerGlobal( 'click' , this._hovercardHideOnClick )
    }
    if(this.$node.ltProp( 'originElem' ) ){
      var originElem = this.getOriginElement( this.$node.ltProp( 'originElem' ) ) 

      if(originElem ){
        this._closeHoverCard && originElem.removeEventListener( 'mouseleave', this._closeHoverCard )
        this.removeEventListenerForOriginElem(originElem)
        if (this.getData('ltPropAddFocusAndBlur')) {
          this.removeFocus(originElem)
        }
        if(this.getData('ltPropAutoShow')){
          this.removeMutationObserver()
        }
      }
    }
   
    if(this._popover){
      this._popover.setData('ltPropShow',false)
    }
    if(_lyteUiUtils.lyteHovercard){
      delete _lyteUiUtils.lyteHovercard[this.$node.ltProp( 'originElem' ) ]

    }
    if( this._childComp ){
      this._childComp.remove()
    }
    if(this.getData('ltPropAutoShow')){
      var eventName = (window.document === document ? 'mousemove' : 'mouseover')

      _lyteUiUtils.removeEventListenerGlobal(eventName,this._mousemove)
    }
    delete this.prevHoverCardNode;
    delete this._childComp;
    delete this._popover;
  },
  addFocus: function(){
    const originElem = this.getOriginElement(this.getData('ltPropOriginElem'))
    if( originElem ){
      originElem.addEventListener('focusin', this._originEleFocus)
    }
   
  },
  removeFocus : function(originElem){
    if( originElem ){
      originElem.removeEventListener('focusin', this._originEleFocus)
    }
  },
  originEleFocus : function(event){
    if(!this.getData('ltPropShow')){
      this.setData('ltPropShow', true)
    }

  },
  originEleBlur : function(){
    if(this.getData('ltPropShow')){
      this.setData('ltPropShow', false)
    }
  },
  setMaxHeightAndWidth: function(div){
    if(this.getData('ltPropMaxWidth')){
      div.style.maxWidth = this.getData('ltPropMaxWidth')
      
    }
    if(this.getData('ltPropMaxHeight')){
      div.style.maxHeight = this.getData('ltPropMaxHeight')
      div.classList.add('lyteHovercardWithMaxHeight')
    }
  },
   isNode: function(target){
    return target instanceof HTMLElement || target instanceof Node;  

  },
  addEventListenerForOriginElem : function( originElem ) {
    if(originElem){
      originElem.addEventListener( 'mousemove', this._oriEleMouseMove )
    }
  },
  removeEventListenerForOriginElem : function(originElem ) {
    if(originElem){
      originElem.removeEventListener( 'mousemove', this._oriEleMouseMove )
    }
    this.setData( 'mousePosition', [] )
    this.setData( 'mouseover', false )

  },
  hovercardHideOnClick : function(event){
    var target = event.target,
    popoverWormhole = this._popover.component.actualModalDiv;
    if( this.getData( 'ltPropHideOnClick' ) && this.getData( 'ltPropShow' ) && this.isNode(target) && !( target === popoverWormhole || popoverWormhole.contains( target ) ) ){
          this.setData( 'ltPropShow', false )
      }
  },
  oriEleMousemove : function( eve ) {

    if( !this.getData( 'mouseover' ) ) {
        this.mouseovereve( eve )
        this.setData( 'mouseover', true )
    }
    var currMpos = [ eve.clientX, eve.clientY ];
    var mpos = this.getData( 'mousePosition' );
    var diff = [ currMpos[ 0 ] - ( mpos[ 0 ]? mpos[ 0 ] : 0 ), currMpos[ 1 ] - ( mpos[ 1 ] ? mpos[ 1 ] : 0 ) ];
    if( this._popover.ltProp( 'show' ) && this._popover.component.childComp) {
      var popupEle = $L( '.lyteHoverCardFollowCursor .lytePopover' ,this._popover.component.childComp)[ 0 ];
      var clientRect = popupEle.getBoundingClientRect();
      popupEle.style.top = clientRect.top + diff[ 1 ] + 'px';
      popupEle.style.left = clientRect.left + diff[ 0 ] + 'px';
    }
    this.setData( 'mousePosition', currMpos );
  },
  mouseovereve : function( eve ) {
    var mpos = [ eve.clientX, eve.clientY ];
    var pos = '';
    
    this._popover.ltProp( {
      offset : { left : mpos[ 0 ] - 9, top : mpos[ 1 ] - 9, height : 18, width : 18 }
    } )
    this.setData('ltPropOffset',{ left : mpos[ 0 ] , top : mpos[ 1 ] , height : 18, width : 18 })
    this.setData( 'mousePosition', mpos );
  },
  mousemove : function(event){
    var nodeName1 = event.target.correspondingElement || event.target;
    while(nodeName1 && nodeName1.tagName != 'BODY' && nodeName1 != document && nodeName1.tagName != 'HTML' && !( nodeName1 instanceof ShadowRoot )  ){
        var iHovercard = nodeName1.getAttribute( 'lyte-hovercard' );

        if( iHovercard ){
          var hovercard = this.findMatchingHoverCard(nodeName1);
          if( hovercard && !hovercard.getData('ltPropShow')){
             hovercard.setData('ltPropShow',true);
          } 
          break;
          
        }
        else {
            nodeName1 = nodeName1.parentNode;
        }  
    }
  
},
 findMatchingHoverCard : function(node){
   for(var item in _lyteUiUtils.lyteHovercard){
      if(node.matches(item)){
        return _lyteUiUtils.lyteHovercard[item];
      }
  }
 },
 setMouseMove : function(){
    var map = _lyteUiUtils.lyteHovercard ? _lyteUiUtils.lyteHovercard : []
    map[this.$node.ltProp( 'originElem' )] = this.$node;
    _lyteUiUtils.lyteHovercard = map;
    var eventName = (window.document === document ? 'mousemove' : 'mouseover')
    document.addEventListener(eventName,this._mousemove)
  },
  widthAndHeightObs : function(){
    const popover = this._popover || this.$node.getElementsByTagName( this.getData('popoverTagName'))[0]
    popover && this.compouteOffset(popover)
  }.observes('ltPropWidth','ltPropHeight' ),
  compouteOffset : function( popover ) {
      var arr = [ 'ltPropWidth', 'ltPropHeight' ];
      for( var i = 0; i < arr.length; i++ ) {
            if( this.getData( arr[ i ] ) ) {
                  popover.setData( arr[ i ], this.getData( arr[ i ] ) )
            }
       }
  },
  createHoverCard : function( event, popoverWormhole ) {
   var popover = this._popover
    if(popover){
      _lyteUiUtils.dispatchEvent( 'beforeshow', this.$node, { originalEvent: event, component : this.$node, wormhole : popover.component.actualModalDiv } ); 
       var res = true;
      /**
        * @method onBeforeHovercardShow
        * @param component
       */
        if( this.getMethods( 'onBeforeHovercardShow' ) ) { 
          res = this.executeMethod('onBeforeHovercardShow', this.$node );
        }
        if(res === false){
          this.setData('ltPropShow', false)
          return false
        }
        popover.ltProp( 'show', true )
        popover.ltProp( 'allowMultiple', true)
        this.$node.classList.add( 'lyteActive' )

        /**
         * @method onHovercardShow
         * @param component
        */
        if( this.getMethods( 'onHovercardShow' ) ) {
                this.executeMethod('onHovercardShow', this.$node );
        }
    }
    if( !this.getData( 'ltPropKeepAlive' ) && !this.getData('ltPropFollowCursor')) {
          var originElem = this.getOriginElement( this.$node.ltProp( 'originElem' ) )
          var eve = event, target 
          if(eve){
            target =  eve.target
          }
          popover._maxdisp = setTimeout( function() {
            this.removeHoverCard(popover, originElem, eve, popoverWormhole, target, true)
          }.bind( this ), this.getData( 'ltPropMaxDisplayTime' ) );
    }
    
  },
  removeTimeout : function( popover ) {
        clearTimeout( popover._settime )
        clearTimeout( popover._maxdisp )
        clearTimeout( popover._bodyTimeout )
  },
  getOriginElement : function(selector){
    var originElem = (window.document === document ? document.querySelector(selector) : document.querySelectorGlobal(selector))
    return originElem
  },
  originEleObs : function(arg){
    if(this.getData('ltPropOriginElem')){
      try{
        const originElement = this.getOriginElement(this.getData('ltPropOriginElem'))
        if(!originElement){
          console.error("Provide a valid selector for 'ltPropOriginElem'; '"+this.getData('ltPropOriginElem') +"' is not a valid origin selector for the Hovercard component");
        }
        
      } catch(err){
        console.warn("Provide a valid selector for 'ltPropOriginElem'; '"+this.getData('ltPropOriginElem') +"' is not a valid origin element selector for the Hovercard component");
      }
    }
    if( arg.oldValue && _lyteUiUtils.lyteHovercard){
      var originElem = this.getOriginElement( arg.oldValue  )  
      if(originElem ){
        this._closeHoverCard && originElem.removeEventListener( 'mouseleave', this._closeHoverCard )
        this.removeEventListenerForOriginElem(originElem)
        this.removeFocus(originElem)
        arg.oldValue && this.removeMutationObserver(arg.oldValue)
        if(this.getData('ltPropAutoShow') && !this.getData('ltPropOriginElem')){
          var eventName = (window.document === document ? 'mousemove' : 'mouseover')

          _lyteUiUtils.removeEventListenerGlobal(eventName,this._mousemove)
        }
      }
      delete _lyteUiUtils.lyteHovercard[ arg.oldValue ]
      this.getData('ltPropShow') && this.setData('ltPropShow', false)
      
      if(this.getData('ltPropOriginElem') ){
        _lyteUiUtils.lyteHovercard[this.getData( 'ltPropOriginElem' )] = this.$node
        this.addMutationObserver()
      }
    } else if(this.getData('ltPropAutoShow') && this.getData('ltPropOriginElem') ) {
       this.setMouseMove()
       this.addMutationObserver()
       
    }
    this.getData('ltPropAddFocusAndBlur') && this.addFocus()
  }.observes('ltPropOriginElem'),
  showToggled : function() {

      var popover = this._popover
    if (popover.component && !popover.getData('ltPropBindToBody') && !this.getData(('ltPropKeepHovercardDom')) ) {
          popover.ltProp( 'bindToBody', true )
      }
      var wormHole,
       popoverWormhole = this._popover.component.actualModalDiv,
       originElem = this.getOriginElement( this.$node.ltProp( 'originElem' ) ) 



      if (!this._childComp && this.getData('ltPropKeepHovercardDom')) {
          const childComp = this._popover.getChildComp()
          this._childComp = childComp
        }
       if(this._childComp){
         wormHole = this._childComp.querySelector('.hoverCardWrapper')
       }
      if( this.getData( 'ltPropShow' ) && originElem ) {
          this.prevHoverCardNode = originElem;
          if( this.getData( 'ltPropHideOnClick') ){
              document.addEventListener( 'click' , this._hovercardHideOnClick )
          }
         
        !this.getData('ltPropKeepHovercardDom') && _lyteUiUtils.appendChild( popoverWormhole, wormHole )

          popover.ltProp( 'originElem', this.getData( 'ltPropOriginElem' ) )
          popover.ltProp( 'freeze', false )
          popover.ltProp( 'duration', undefined )
          // popover.ltProp('offset',this.getData('ltPropOffset'))
          // popover.ltProp('preventFocus',this.getData('ltPropPreventFocus'))
          // popover.ltProp( 'closeOnEscape', this.getData( 'ltPropCloseOnEscape' ) )
          this.compouteOffset( popover );
          wormHole && this.setMaxHeightAndWidth(wormHole)
          // if(this.getData('ltPropPopoverWrapperClass')){
          //    popover.setData( 'ltPropWrapperClass', popover.getData( 'ltPropWrapperClass' )+' '+ this.getData('ltPropPopoverWrapperClass'))
          // }
          if( this.getData( 'ltPropFollowCursor' ) ) {
              this.addEventListenerForOriginElem( originElem )
              // popover.setData( 'ltPropWrapperClass', popover.getData( 'ltPropWrapperClass' )+ ' lyteHoverCardFollowCursor' )
          }
          popover._settime = setTimeout( this.createHoverCard.bind( this ), this.getData( 'ltPropShowDelay' ), event, popoverWormhole );
          
          this._closeHoverCard = this.closeHoverCard.bind( this )
          originElem.addEventListener( 'mouseleave', this._closeHoverCard )
         this.getData('ltPropAddFocusAndBlur') && originElem.addEventListener('focusout', this._closeHoverCard)
      }
      else{

          popover.ltProp( 'show', false )

         !this.getData(('ltPropKeepHovercardDom')) && popover.ltProp( 'bindToBody', false )
          // popover.setData( 'ltPropWrapperClass', 'lyteHovercardPopover' )
          this.$node.classList.remove( 'lyteActive' )
          if(originElem){
            originElem.removeEventListener( 'mouseleave', this._closeHoverCard )
            this.getData('ltPropAddFocusAndBlur') && originElem.removeEventListener('focusout', this._closeHoverCard)
          }
          if( this._popovermouseleave ){
              popoverWormhole.removeEventListener( 'mouseleave', this._popovermouseleave )
            this.getData('ltPropAddFocusAndBlur') && popoverWormhole.removeEventListener('focusout', this._popovermouseleave)

          }
           if( this.getData( 'ltPropHideOnClick') ){
            _lyteUiUtils.removeEventListenerGlobal( 'click' , this._hovercardHideOnClick )
          }
          this.removeEventListenerForOriginElem( originElem )
          /**
          * @method onHovercardHide
          * @param component
          */
          if( this.getMethods( 'onHovercardHide' ) ) {
              this.executeMethod( 'onHovercardHide', this.$node );
          }
          if( this.prevHoverCardNode ) {
              delete this.prevHoverCardNode
          }
         !this.getData('ltPropKeepHovercardDom') && delete this._childComp;
          delete this._mousedownFlag;
          this.removeTimeout( popover )
      }
  }.observes( 'ltPropShow' ),
  addMutationObserver : function() {
    let self = this;
    
    const originElement = this.getOriginElement( this.getData('ltPropOriginElem') )
     this._observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for(let i =0; i < mutation.removedNodes.length; i++){
            const removedNode =  mutation.removedNodes[i]
            if (removedNode === originElement) {
                self.getData('ltPropShow') && self.setData('ltPropShow', false)
                _lyteUiUtils.lyteHovercard && _lyteUiUtils.lyteHovercard[ this.getData('ltPropOriginElem') ] && delete _lyteUiUtils.lyteHovercard[ this.getData('ltPropOriginElem') ]
                self._observer.disconnect()
                break
            }
          }
          mutation.removedNodes.forEach(removedNode => {
            
        });
        }
      }
    })
    const config = { childList: true};

    // Start observing the parent node
    originElement && this._observer.observe(originElement.parentElement, config);
  },
  removeMutationObserver : function(){
    this._observer && this._observer.disconnect()
    delete  this._observer
  },
  closeHoverCard : function( event ) {
    
      var wormHole = this._childComp,
       popoverWormhole = this._popover.component.actualModalDiv,
       popover = this._popover,
       originElem = this.getOriginElement( this.$node.ltProp( 'originElem' ) )
      if(  this.prevHoverCardNode && this.isNode(event.target) && ( this.getData('ltPropFollowCursor') || event.target == this.prevHoverCardNode || this.prevHoverCardNode.contains( event.target ) ) && popoverWormhole && event.relatedTarget != popoverWormhole && !popoverWormhole.contains( event.relatedTarget )) {
                var eve = event
                popover._bodyTimeout = setTimeout( this.removeHoverCard.bind( this ), this.getData( 'ltPropHideDelay' ), popover, originElem, eve, popoverWormhole, event.target) ;

          } else if( popoverWormhole  && this.isNode(event.relatedTarget ) && (event.relatedTarget == popoverWormhole || popoverWormhole.contains( event.relatedTarget )  )  ) {  
              this.removeTimeout( popover )
              this._popovermouseleave = this.popoverMouseLeave.bind( this )
              popoverWormhole.addEventListener( 'mouseleave', this._popovermouseleave )
              originElem.removeEventListener( 'mouseleave', this._closeHoverCard )
              if (this.getData('ltPropAddFocusAndBlur')) {
                this._popoverFocusOut = this.popoverFocusOut.bind(this)
                popoverWormhole.addEventListener('focusout', this._popoverFocusOut)
              }
           } 
  },
  removeHoverCard : function( popover, originElem, event, popoverWormhole, target, keepAliveFlag ) {
    var res = true
    if(this.getMethods( 'onHovercardBeforeHide' ) ) {
      /**
     * @method onHovercardBeforeHide
     * @param component
     * @param event
     */
          res = this.executeMethod( 'onHovercardBeforeHide', this.$node, event );
          if( res == false && originElem){
              originElem.removeEventListener( 'mouseleave', this._closeHoverCard )
            this.getData('ltPropAddFocusAndBlur') && originElem.removeEventListener('focusout', this._closeHoverCard)
              if( this._popovermouseleave && popoverWormhole ){
                popoverWormhole.removeEventListener( 'mouseleave', this._popovermouseleave )
                this.getData('ltPropAddFocusAndBlur') && popoverWormhole.removeEventListener('focusout', this._popovermouseleave)
              }
          }
    }
   
    target = target || (event ?  event.target : '')
    if( (res || res == undefined ) && (!event || keepAliveFlag || ( ( this.prevHoverCardNode  && this.isNode(target) && ( target == this.prevHoverCardNode || this.prevHoverCardNode.contains( target ) ) ) || ( popoverWormhole  && this.isNode(target) && ( target == popoverWormhole || popoverWormhole.contains( target ) ) ) ) )){
            this.removeTimeout( popover )

            if( this.getData( 'ltPropShow' ) && popover ) {
                    this.setData( 'ltPropShow', false )
                    popover.setData( 'ltPropShow',false )
                }  
    }
  },
  popoverFocusOut : function(event){
    var wormHole = this._childComp,
      popoverWormhole = this._popover.component.actualModalDiv,
      popover = this._popover,
      originElem = this.getOriginElement(this.$node.ltProp('originElem'))
      var eve = event
      if (popoverWormhole && this.isNode(event.target) && !popoverWormhole.contains(event.target) ) {
        popover._bodyTimeout = setTimeout(this.removeHoverCard.bind(this), this.getData('ltPropHideDelay'), popover, originElem, eve, popoverWormhole, eve.target);
      }
  },
  popoverMouseLeave : function( event ) {
    var wormHole = this._childComp ,
    popoverWormhole = this._popover.component.actualModalDiv ,
    popover = this._popover ,
    originElem = this.getOriginElement( this.$node.ltProp( 'originElem' ) )
    var eve = event

   if( popoverWormhole  && this.isNode(event.target) && ( event.target == popoverWormhole || popoverWormhole.contains( event.target ) ) && event.relatedTarget != this.prevHoverCardNode && !this.prevHoverCardNode.contains( event.relatedTarget ) ) {
     popover._bodyTimeout = setTimeout( this.removeHoverCard.bind( this ), this.getData( 'ltPropHideDelay' ), popover, originElem, eve, popoverWormhole, eve.target);
   }
   else if( this.prevHoverCardNode  && this.isNode(event.relatedTarget) && ( event.relatedTarget == this.prevHoverCardNode || this.prevHoverCardNode.contains( event.relatedTarget ) ) ) {
         popover._settime = setTimeout( this.createHoverCard.bind( this ), this.getData( 'ltPropShowDelay' ), eve, popoverWormhole);
         this._closeHoverCard = this.closeHoverCard.bind( this )
         originElem.addEventListener( 'mouseleave', this._closeHoverCard )
         if( this._popovermouseleave ){
           popoverWormhole.removeEventListener( 'mouseleave', this._popovermouseleave )
         }

   }
  }, 
  hovercardScroll : function( event ) {
    if($L(this.$node).hasClass("lyteActive")){
    var res = true
        var component = this,
            wormHole = component._childComp ,
            popoverWormhole = component._popover.component.actualModalDiv ,
            popover =component._popover ,
            originElem = this.getOriginElement( this.getData('ltPropOriginElem') )
            
        if(component.getMethods( 'onHovercardBeforeHide' ) ) {
            res = component.executeMethod( 'onHovercardBeforeHide', component.$node );
          if (res == false && originElem){
                originElem.removeEventListener( 'mouseleave', component._closeHoverCard )
              this.getData('ltPropAddFocusAndBlur') && originElem.removeEventListener('focusout', this._closeHoverCard)
                if(  component._popovermouseleave && popoverWormhole ){
                    popoverWormhole.removeEventListener( 'mouseleave', component._popovermouseleave )
                  this.getData('ltPropAddFocusAndBlur') && popoverWormhole.removeEventListener('focusout', component._popovermouseleave )
                  }
            }
        }
        if(res || res == undefined){
            
            if( component.getData( 'ltPropShow' ) && popover ) {
                component.setData( 'ltPropShow', false )
                
            }
            if( component.prevHoverCardNode ) {
              delete component.prevHoverCardNode
            }
            component.removeTimeout( popover )
        }
      
      }
  },
  methods :{
    beforeWormholeAppend : function(args){
      this._childComp = args
    },
    onPopoverBeforeClose : function(event, element){
      if (event && (event.type === 'scroll' || event.type === 'resize' || ( event.type === 'keydown' &&
       (event.key == "Escape" || event.key == "Esc")) )){
            var res = true
            if(this.getMethods( 'onHovercardBeforeHide' ) ) {
              res = this.executeMethod( 'onHovercardBeforeHide', this.$node, event );
              const originElement = this.getOriginElement(this.getData('ltPropOriginElem')),
              popoverWormhole = this._popover.component.actualModalDiv
              if( res == false && originElement){
                originElement.removeEventListener( 'mouseleave', this._closeHoverCard )
                this.getData('ltPropAddFocusAndBlur') && originElement.removeEventListener('focusout', this._closeHoverCard)
                  if( this._popovermouseleave && popoverWormhole ){
                    popoverWormhole.removeEventListener( 'mouseleave', this._popovermouseleave )
                    this.getData('ltPropAddFocusAndBlur') && popoverWormhole.removeEventListener('focusout', this._popovermouseleave)
                  }
                  return res;
              }
            }
            // if(res && this.getData( 'ltPropShow' )){
            //   this.setData( 'ltPropShow', false )
            // }
        }
    },
    onPopoverClose : function(event){
      if(this.getData('ltPropShow')){
        this.setData( 'ltPropShow', false )
      }
    },
    onPopoverBeforeShow : function(element){
      if(!this.getData('ltPropShow')){
        this.setData('ltPropShow', true)
      }
    }
  }
});


// window.addEventListener( 'scroll', function(event) {
//     if($L(event.target).closest('.lytePopover')[0]){
//      return
//   }
//    window.clearTimeout( _lyteUiUtils._expressDebounce );

//   _lyteUiUtils._expressDebounce = setTimeout( function() {
//     // var activeHovercard = document.querySelector('lyte-hovercard.lyteActive')
//     // if(activeHovercard){
//     //    var popover = activeHovercard.component._popover
//     //    if(popover){
//     //     var childComp = popover.component.actualModalDiv
//     //     var target = arguments[0].target
//     //     if(childComp.contains(target)){
//     //       return;
//     //     }
//     //    }
//     // }

//     debugger
//       var hovercard = document.getElementsByTagName( 'lyte-hovercard' ),
//       i = 0;
     
//           for( ; i < hovercard.length; i++ ) {
//               if( hovercard[ i ] ){
//                   hovercard[ i ].component.hovercardScroll();
//               }
          
//       }   
//   }, 250,event );
  
// }, true );
/**
 * @syntax yielded
 * <lyte-hovercard>
 *     <template is = "registerYield" yield-name = "hoverCardYield">
 *         <lyte-hovercard-content>
 *             //Some Content
 *         </lyte-hovercard-content>
 *     </template>
 * </lyte-hovercard>
 */