/**
 * Renders a messagebox
 * @component lyte-messagebox
 * @version 1.0.0
 * @dependencies lyte-wormhole
 */

 Lyte.Component.register("lyte-messagebox", {
_template:"<template tag-name=\"lyte-messagebox\" lyte-messagebox=\"\"> <template is=\"if\" value=\"{{ltPropShow}}\"> <template case=\"true\"><lyte-wormhole lyte-messagebox=\"\" style=\"visibility: hidden\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\" on-append=\"{{method(&quot;afterWormholeAppend&quot;)}}\" lt-prop-show=\"{{ltPropShow}}\" lt-prop-focus-on-close=\"{{ltPropFocusOnClose}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"{{lyteUiMsgBoxConcatClass(ltPropClass,ltPropType,'MessageIcon','lyteMessageBox')}}\" aria-live=\"polite\"> <template is=\"if\" value=\"{{ltPropType}}\"><template case=\"true\"> <span class=\"lyteMessageBoxSymbol\"></span> </template></template> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <span class=\"lyteMessageBoxContent\" role=\"{{ltPropAriaRole}}\"> <lyte-yield yield-name=\"messageboxYield\"></lyte-yield> </span> </template><template case=\"false\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropMessage,'')}}\"> <template case=\"false\"><div> <span class=\"lyteMessageBoxContent\" role=\"{{ltPropAriaRole}}\">{{ltPropMessage}}</span> <span class=\"lyteMessageBoxContentHidden\" role=\"{{ltPropAriaRole}}\" aria-live=\"polite\">{{messageContent}}</span> </div></template> </template> </template></template> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"><template case=\"true\"><span class=\"lyteMessageBoxClose\" onclick=\"{{action('closeMessageBox')}}\" role=\"button\" aria-label=\"Close Message box\"></span></template></template> </div> </template> </lyte-wormhole></template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,3]},{"type":"text","position":[0,3,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropShow","ltPropMessage","messageContent","ltPropDuration","ltPropOffset","ltPropTransition","ltPropYield","ltPropClass","ltPropCloseManually","ltPropAriaRole","onResizeBoolean","ltPropShowCloseButton","ltPropFocusOnClose"],
_observedAttributesType :["string","boolean","string","string","string","object","object","boolean","string","boolean","string","boolean","boolean","boolean"],

    init : function() {
      var th = this;
      /**
       * @utility alignMessageBox
       * @version 1.0.0
       */
      this.$node.alignMessageBox = function(){
        th.setData('onResizeBoolean' , true);
        th.computeOffsetImpl();
      }
    },
    data : function(){
        return {

            /**
             * @componentProperty {success | error | warning | info} ltPropType
             * @version 1.0.0
             * @default success
             * @input
             */
            "ltPropType":Lyte.attr("string",{"default":"success",input:true,output:false}),

            /**
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             * @input 
             * @output
             */
            "ltPropShow":Lyte.attr("boolean",{"default":false,input:true,output:true}),

            /**
             * @componentProperty {string} ltPropMessage
             * @version 1.0.0
             * @input
             * @output
             */
            "ltPropMessage":Lyte.attr("string",{"default":"",input:true,output:true}),
            
            messageContent : Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropDuration
             * @version 1.0.0
             * @default 2000
             * @input
             * @output
             */
            "ltPropDuration":Lyte.attr("string",{"default":"2000",input:true,output:true}),
            /**
             * @typedef {object} offset
             * @property {string} left="center"
             * @property {string} top="center"
             * @property {string} right
             * @property {string} bottom
             */
            /**
             * @componentProperty {offset} ltPropOffset
             * @version 1.0.0
             * @input
             */
            "ltPropOffset":Lyte.attr("object",{"default":null,input:true,output:false}),

            /**
             * @typedef {object} transition
             * @property {slideFromTop | fadeIn} animation="fadeIn"
             * @property {string} duration
             */
            /**
             * @componentProperty {transition} ltPropTransition
             * @version 1.0.0
             * @default { "animation" : "fadeIn", "duration" :"0.2s"}
             * @input
             */
            "ltPropTransition":Lyte.attr("object",{"default":{"animation" : "fadeIn","duration" : "0.2s"},input:true,output:false}),

            /**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             * @input
             */
            "ltPropYield":Lyte.attr("boolean",{"default" : false,input:true,output:false}),

            /**
             * @componentProperty {string} ltPropClass
             * @version 1.0.0
             * @input
             */
            "ltPropClass":Lyte.attr("string",{"default":"",input:true,output:false}),

            /**
             * @componentProperty {boolean} ltPropCloseManually
             * @version 3.0.X
             * @input
             */
            "ltPropCloseManually":Lyte.attr("boolean",{"default": false,input:true,output:false}),
            /**
             * @componentProperty {string} ltPropAriaRole='status'
             * @version 1.0.0
             * @input
             */
            "ltPropAriaRole" : Lyte.attr('string' , {
                default : 'status',input:true,output:false
            }),

            "onResizeBoolean" : Lyte.attr('boolean' , {
              'default' : false
            }),
            /**
             * @componentProperty {boolean} ltPropShowCloseButton=true
             * @version 1.0.0
             * @input
             */
            "ltPropShowCloseButton" : Lyte.attr('boolean' , {
                default : true,input:true,output:false
            }),
            
            /**
             * @componentProperty {boolean} ltPropFocusOnClose=false
             * @version 1.0.0
             * @input
             */
            "ltPropFocusOnClose" : Lyte.attr('boolean' , {
                default : false,input:true,output:false
            })  
        }
    },
    setDuration : function(){

        var durationVal = this.$node.ltProp("duration");
        if(durationVal != ""){
            this.setData("ltPropDuration",durationVal);
        }
        
    }.observes('ltPropDuration'),

    computeOffsetImpl : function(){
        var messageEle = this.actualMessageDiv;
        this.fastdomfn1 = $L.fastdom.measure(function(){
            delete this.fastdomfn1;
            var messageElePosition = messageEle.getBoundingClientRect();
            // var offsetObj = this.$node.ltProp('offset');
            var offsetObj = Object.assign({},this.$node.ltProp('offset'));

            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            if(this.$node.ltProp('offset')){
                if(offsetObj.left === "center" || offsetObj.right === "center" || offsetObj.left == undefined || offsetObj.left == ""){
                    var offLeft = (w - messageElePosition.width)/2;
                    if(offLeft < 0){
                        offLeft = 20;
                    }
                    offsetObj.left = offLeft + "px";
                }
                if(offsetObj.top === "center" || offsetObj.bottom === "center"){
                    var offTop = (h - messageElePosition.height)/2;
                    if(offTop < 0){
                        offTop = 20;
                    }
                    offsetObj.top = offTop + "px";
                }
                if(offsetObj.right && offsetObj.right !== "center"){
                    if(offsetObj.right.indexOf("%") > -1){
                        offsetObj.left = w-(messageElePosition.width+(w/parseFloat(offsetObj.right)))+"px";
                    }
                    else{
                        offsetObj.left = w-(messageElePosition.width+parseFloat(offsetObj.right))+"px";
                    }
                }
                if(offsetObj.bottom && offsetObj.bottom !== "center"){
                    if(offsetObj.bottom.indexOf("%") > -1){
                        offsetObj.top = h-(messageElePosition.height+(h/parseFloat(offsetObj.bottom)))+"px";
                    }
                    else{
                        offsetObj.top = h-(messageElePosition.height+parseFloat(offsetObj.bottom))+"px";
                    }
                }
                if(!offsetObj.top){
                    offsetObj.top = 20;
                }
                this.fastdomfn2 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn2;
                    messageEle.style.left = parseFloat(offsetObj.left) + "px";
                    if(this.getData('ltPropTransition').animation === "slideFromTop"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (parseFloat(offsetObj.top) + messageElePosition.height) +"px)";
                    } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = window.innerHeight + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (parseFloat(offsetObj.top) - window.innerHeight) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else {
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = parseFloat(offsetObj.top) + "px";
                    }
                    if(!this.getData('onResizeBoolean')){
                      this.showMessagebox();
                    }
                },this);
            }
            else{
                var offsetLeft="",offsetTop="";
                offsetLeft = (document.body.clientWidth - messageElePosition.width)/2;
                this.fastdomfn3 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn3;
                    messageEle.style.left = parseFloat(offsetLeft)+"px";
                    if(this.getData('ltPropTransition').animation === "slideFromTop"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (messageElePosition.height + 20) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = window.innerHeight + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (messageElePosition.height + 20 - window.innerHeight) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else {
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = "20px";
                    }
                    if(!this.getData('onResizeBoolean')){
                      this.showMessagebox();
                    }
                },this);
            }

        },this);
    },
    closeMessageBoxFn : function(checkWormhole){
        this.setData('onResizeBoolean' , false);
        if(this.timeOutId){
            clearInterval(this.timeOutId);
            this.timeOutId = false;
        }
        if( this.childComp && document.contains( this.childComp ) ){
            this.childComp.remove();
        }
        delete this.actualMessageDiv;
        delete this.childComp;
        if(!checkWormhole && this.getMethods("onClose")){
            /**
             * @method onClose
             * @author surendran.m@zohocorp.com
             * @version 1.0.0
             * @param { object } lyteMessageBox
             */
            this.executeMethod("onClose",this);
        }
        window.removeEventListener('resize' , this.$node.alignMessageBox)
    },

    clearFastdom : function(){
        if(this.fastdomfn1){
            $L.fastdom.clear(this.fastdomfn1);
            delete this.fastdomfn1;
        }
        if(this.fastdomfn2){
            $L.fastdom.clear(this.fastdomfn2);
            delete this.fastdomfn2;
        }
        if(this.fastdomfn3){
            $L.fastdom.clear(this.fastdomfn3);
            delete this.fastdomfn3;
        }
    },

	showToggled : function() {
        if(this.actualMessageDiv){
            _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeOpen' , this.actualMessageDiv , { originalEvent: null, component : this.$node, wormhole : this.actualMessageDiv })
        }
		if(!(this.$node.ltProp("show"))){
            this.closeMessageBoxFn();
        }
    }.observes('ltPropShow').on('didConnect'),

    showMessagebox : function(){
        // start = new Date().getTime();
        var duration = parseInt(this.getData("ltPropDuration"));
        var self = this;
        // if(self.actualMessageDiv && !self.getData('ltPropShow')){
        //     _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
        // }
        this.timeOutId = setInterval(function(){
            clearInterval(self.timeOutId);
            // end = new Date().getTime();
            if(!self.$node || self.getData('ltPropCloseManually')){
                return;
            }
            if(self.getData('ltPropTransition').animation === "slideFromTop"){
                _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            } else if(self.getData('ltPropTransition').animation === "slideFromBottom"){
                _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            } else {
                _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            self.timeOutId = false;
        },duration);
        window.addEventListener('resize' , this.$node.alignMessageBox)
    },

    didDestroy : function(){
        if(this.event){
            delete this.event
        }
        this.clearFastdom();
        if(this.actualMessageDiv){
            _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , this.actualMessageDiv)
        }
        if(this.timeOutId || this.getData('ltPropShow')){
            clearInterval(this.timeOutId);
            if(this.getData('ltPropTransition').animation === "slideFromTop" && this.actualMessageDiv){
                this.actualMessageDiv.style.transform = "";
	        	this.setData("ltPropShow",false);
        	} else if(this.getData('ltPropTransition').animation != "slideFromTop" && this.actualMessageDiv){
                this.actualMessageDiv.style.transform = "";
	        	this.setData("ltPropShow",false);
            } else { 
        		this.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
        		this.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
	        	this.setData("ltPropShow",false);
        	}
            this.timeOutId = false;
            this.closeMessageBoxFn(true);
        }
        window.removeEventListener('resize' , this.$node.alignMessageBox)
    },

    actions : {
        closeMessageBox : function(){
            clearInterval(this.timeOutId);
            this.timeOutId = false;
            var self = this;
            if(self.actualMessageDiv){
                _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
            }
            if(self.getData('ltPropTransition').animation === "slideFromTop"){
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },200);
            } else if(self.getData('ltPropTransition').animation === "slideFromBottom"){
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },200);
            } else {
                self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            window.removeEventListener('resize' , this.$node.alignMessageBox)
        }
    },

    methods : {
        onBeforeShow : function(){},
        onShow:function(){},
        beforeWormholeAppend : function(arg){
            this.childComp = arg;
            this.actualMessageDiv = this.childComp.querySelector(".lyteMessageBox");
            this.actualMessageDiv.style.position = "fixed";
            // LyteComponent.appendChild(document.body,this.childComp);
        },
        afterWormholeAppend : function(arg){
            var dur = parseFloat(this.getData('ltPropTransition').duration)*100
            // if(this.getData('ltPropDuration')){
            //     dur = parseFloat(this.getData('ltPropDuration'))
            // }
            var _this = this;
            if(this.getData('ltPropTransition').animation === "slideFromTop"){
                this.actualMessageDiv.classList.add('lyteMessageBoxSlideFromTop');
                this.computeOffsetImpl();
                setTimeout(function(){
                    if(_this.getMethods("onShow")){
                        /**
                         * @method onShow
                         * @author surendran.m@zohocorp.com
                         * @version 1.0.0
                         * @param { object } _this.actualMessageDiv
                         */
                         _this.setData('messageContent' , _this.getData('ltPropMessage'))
                        _this.executeMethod("onShow",_this.actualMessageDiv);
                    }
                },dur)
            } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                this.actualMessageDiv.classList.add('lyteMessageBoxSlideFromBottom');
                this.computeOffsetImpl();
                setTimeout(function(){
	                _this.setData('messageContent' , _this.getData('ltPropMessage'))
                    if(_this.getMethods("onShow")){
                        _this.executeMethod("onShow",_this.actualMessageDiv);
                    }
                },dur)
            } else {
                this.computeOffsetImpl();
                this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                setTimeout(function(){
	                _this.setData('messageContent' , _this.getData('ltPropMessage'))
                    if(_this.getMethods("onShow")){
                        _this.executeMethod("onShow",_this.actualMessageDiv);
                    }
                },dur)
                // this.childComp.style.visibility = "visible";
            }
        }
    }


});

/**
 * @syntax nonYielded
 * <lyte-messagebox lt-prop-message = "This is a messagebox without yield.">
 * </lyte-messagebox>
 */

 /**
 * @syntax yielded
 * <lyte-messagebox lt-prop-yield = true>
 *     <template is = "registerYield" yield-name = "messageboxYield">
 *         <span> Here is the text. </span>
 *         <a href = "#"> Some link </a>
 *     </template>
 * </lyte-messagebox>
 */
