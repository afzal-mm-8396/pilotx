/**
 * Step indicates the stage or phase of a work within a navigational hierarchy and automatically adds separators between them
 * @component lyte-step
 * @version 1.0.0
 */

Lyte.Component.register('lyte-step', {
_template:"<template tag-name=\"lyte-step\" lyte-step=\"\"> <div onclick=\"{{action('divClick',event,this)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'!=',&quot;advanced&quot;)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <lyte-step-structure class=\"{{ltPropClass}}\" onclick=\"{{action('divClick',event,this)}}\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStepBullet')}}\"><template case=\"true\"> <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-step-body> {{array}} </lyte-step-body> <lyte-step-head>{{indexVal}}</lyte-step-head> </lyte-step-item> </template><template case=\"false\"> <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-step-body> {{array}} </lyte-step-body> </lyte-step-item> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStepBullet')}}\"><template case=\"true\"> <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-step-body> {{array[ltPropLabel]}} </lyte-step-body> <lyte-step-head>{{array[ltPropOption]}}</lyte-step-head> </lyte-step-item> </template><template case=\"false\"> <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-step-body> {{array[ltPropLabel]}} </lyte-step-body> </lyte-step-item> </template></template></template></template></template> </lyte-step-structure> </template><template case=\"false\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template></template><template case=\"false\"> <lyte-yield class=\"lyteStepAdvanced\" yield-name=\"yield\" lt-prop-content=\"{{dummyContent}}\"></lyte-yield> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropClass","ltPropLabelAlignment","ltPropData","ltPropSelected","ltPropSkip","ltPropActiveClass","ltPropCompletedClass","ltPropWarningClass","ltPropKeepMarked","ltPropYield","ltPropLabel","ltPropOption","ltPropType","ltPropOffset","ltPropIndex","ltPropDataType","ltPropAria","ltPropAriaValue","ltPropDirection","ltPropPreventLastAsCompleted","dummyContent","widthArr","divWidth","forwardWidth","backwardWidth"],
_observedAttributesType :["string","string","array","number","boolean","string","string","string","boolean","boolean","string","string","string","number","number","array","boolean","string","string","boolean","array","array","number","number","number"],

    _lyteUtilFunctions : [ 'next', 'previous', 'goto', "refreshStep" ],
    init: function () {
        /**
         * This method is called before the step component is rendered.
         * @method beforeRender
         * @author ponkarthikeyan.t@zohocorp.com
         * @version 1.0.1
         * @param { object } stepElement
         */
        this.getMethods('beforeRender') && this.executeMethod('beforeRender', this.$node)
    },

    didDestroy: function () {
        delete this.$node.next; delete this.$node.previous; delete this.$node.goto;
        delete this._finalCallback; delete this._transEnd;
        clearTimeout(this._animetime);
    },

    didConnect: function () {
        var type = this.getData('ltPropType') == "advanced";
        /**
         * @utility next
         * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
         * @version 1.0.0
         * @param {string} state
         */
        this.$node.next = function (state) {
            this.$node.goto(this.data.ltPropSelected + 1, state, true)
        }.bind(this);

        /**
         * @utility previous
         * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
         * @version 1.0.0
         * @param {string} state
         */

        this.$node.previous = function (state) {
            this.$node.goto(this.data.ltPropSelected - 1, state, true)
        }.bind(this);

        if (!type) {

            if( this.data.ltPropPreventLastAsCompleted ){
                this.$node.classList.add( 'lyteStepMarkPreventAsCompleted' );
            }

            /**
             * @utility goto
             * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
             * @version 1.0.0
             * @param {number} number
             * @param {string} state
             * @condition ltPropSkip true
             */
            this.$node.goto = function (number, state, flag) {
                if (this.component.getData('ltPropSkip') || flag) {
                    var elements = this.querySelectorAll('lyte-step-item'), ltPropSelected = this.component.getData('ltPropSelected'), ltPropWarningClass = this.component.getData('ltPropWarningClass');
                    var selectedElement = elements[ltPropSelected], ltPropCompletedClass = this.component.getData('ltPropCompletedClass'), ltPropActiveClass = this.component.getData('ltPropActiveClass')

                    var is_completed = false,
                    prevent_last_as_completed = flag && this.component.data.ltPropPreventLastAsCompleted;

                    if (number >= -1 && elements.length) {
                        if (state == 'incomplete') {
                            $L( selectedElement ).addClass( ltPropWarningClass ).removeClass( ltPropCompletedClass );
                        }
                        else {
                            is_completed = prevent_last_as_completed && number == elements.length ? number == ltPropSelected : false;
                            $L( selectedElement ).addClass( ltPropCompletedClass );
                        }
                        $L( selectedElement ).removeClass( ltPropActiveClass );
                        if (number == elements.length) {
                            number--;
                            is_completed = prevent_last_as_completed ? state != 'incomplete' : false;
                        }
                        else if (number == -1) {
                            number++;
                        }
                        !is_completed && $L( elements[number] ).addClass( ltPropActiveClass );
                        if (number == ltPropSelected && selectedElement ) {
                            $L( selectedElement ).removeClass( ltPropWarningClass );
                            !is_completed && $L( selectedElement ).removeClass( ltPropCompletedClass );
                        }
                        else {
                            this.component.setData('ltPropSelected', Math.min( number, elements.length - 1 ) );
                        }
                    }
                }
            }
        } else {
            this.$node.goto = function (number, state, flag) {
                if (this.getData('ltPropSkip') || flag) {
                    this.moveTo(number, state, this.getData('ltPropSelected'));
                }
            }.bind(this);

            /**
             * @utility refreshStep
             * @condition ltPropType advanced
             */
            this.$node.refreshStep = this._measureWidth.bind(this, this.constructForward);
        }
        $L.fastdom.measure(function () {
            var fg = _lyteUiUtils.getRTL();
            $L.fastdom.mutate(function () {
                if (fg) {
                    this.$node.classList.add('lyteRTL')
                }
                this.breadcrumbClass.call(this);
            }.bind(this))
        }.bind(this))
        if (type) {

            /**
             * This method is called after the step component is rendered.
             * @method afterRender
             * @author ponkarthikeyan.t@zohocorp.com
             * @version 1.0.1
             * @param { object } stepElement
             */

            if (this.getMethods('afterRender')) {
                this._finalCallback = this.executeMethod.bind(this, this.$node);
            }
        } else {
            this.getMethods('afterRender') && this.executeMethod('afterRender', this.$node);
        }

        this._transEnd = this.transfade.bind(this);

        if( this.data.ltPropAria ){
			var $node = $L( this.$node );
			if( !$node.attr( 'role' ) ){
				$node.attr( 'role', "navigation" );
			}
	   }
        if( this.getData("ltPropDirection") == "vertical") {
            this.$node.querySelector("lyte-step-structure").classList.add("lyteStepVertical")
       }
    },

    selectedElementFindObs: function (arg) {
        if (this.getData('ltPropType') != "advanced") {
            $L.fastdom.mutate(this.selectedElementFind.bind(this));
        } else if (arg && !this._preventselect) {
            this.$node.goto(arg.newValue, '', true);
            var index = this.getData('ltPropIndex');

            if (arg.newValue < index || arg.newValue > index + this.getData('dummyContent').length) {
                this._enableAnimate = true;
                this.setData('ltPropIndex', arg.newValue);
            }

        }
    }.observes('ltPropSelected').on('didConnect'),

    setLabelAlignment: function() {
		if(this.getData("ltPropClass") == 'lyteStepBullet') {
			var stepStructure = this.$node.querySelector("lyte-step-structure");
			if(this.getData("ltPropLabelAlignment") == "left") {
				stepStructure.classList.add("lyteStepBodyLeftAligned");
			}
			else {
				stepStructure.classList.remove("lyteStepBodyLeftAligned");
			}
		}
    }.observes('ltPropLabelAlignment').on('didConnect'),

    selectedElementFind : function(){
        var data = this.data,
        selected = data.ltPropSelected,
        active = data.ltPropActiveClass,
        completed = data.ltPropCompletedClass,
        warning = data.ltPropWarningClass,
        items = $L( 'lyte-step-item', this.$node ),
        aria = data.ltPropAria,
        length = data.ltPropKeepMarked ? selected : items.length - 1;

        items.removeClass( active );

        if( aria ){
            this.add_roles( items );
            items.find( 'a' ).removeAttr( 'aria-current' );
        }

        items.eq( selected ).addClass( active ).removeClass( warning, completed );

        if( aria ){
            items.eq( selected ).find( 'a' ).attr( 'aria-current', data.ltPropAriaValue );
        }

        for( var i = 0; i <= length; i++ ){

            var cur = items.eq( i );

            if( cur.hasClass( warning ) ){
                continue;
            }

            if( i < selected ){
                cur.addClass( completed );
            } else if( i > selected ){
                cur.removeClass( completed, warning );
            }
        }
    },

    ArrayContentChangeObs: function () {
        this.ArrayContentChange.call(this);
    }.observes('ltPropData.[]', 'ltPropData'),

    ArrayContentChange: function () {
        if (this.getData('ltPropSelected') == undefined) {
            this.setData('ltPropSelected', 0)
        }
        else {
            this.selectedElementFind.call(this);
        }
    },

    breadcrumbClassObs: function () {
        this.breadcrumbClass.call(this);
    }.observes('ltPropClass'),

    breadcrumbClass: function () {

        var __class = this.data.ltPropClass,
        structure = $L('lyte-step-structure', this.$node);

        if (this.getData('ltPropType') != "advanced") {
            if (this.data.ltPropYield && __class ) {
                structure.addClass( __class );
            }
        }

        if (this.data.ltPropAria && !structure.attr('role')) {
            structure.attr('role', "list")
        }
    },
    data: function () {
        var default_values = _lyteUiUtils.getDefault( 'lyte-step' );

        return {
            //  user data
            /**
             * @componentProperty {lyteStepSlash | lyteStepArrow | lyteStepBullet | lyteStepFlat} ltPropClass=lyteStepSlash
             * @condition ltPropType default
             * @version 1.0.0
             * @input
             */
            ltPropClass: Lyte.attr("string", { "default": default_values.class || 'lyteStepSlash', input : true }),
            /**
             * @componentProperty {center | left} ltPropLabelAlignment=center
             * @condition ltPropClass lyteStepBullet
             * @version 3.115.4
             * @input
             */
            ltPropLabelAlignment: Lyte.attr("string", { "default": "center", input : true}),
            /**
             * @componentProperty {string[] | object[]} ltPropData
             * @default []
             * @version 1.0.0
             * @input
             */
            ltPropData: Lyte.attr("array", { "default": [], input : true }),
            /**
             * @componentProperty {number} ltPropSelected=0
             * @version 1.0.0
             * @output
             * @input
             */
            ltPropSelected: Lyte.attr("number", { "default": default_values.selected || 0, output : true, input : true }),
            /**
             * @componentProperty {boolean} ltPropSkip=true
             * @version 1.0.0
             * @input
             */
            ltPropSkip: Lyte.attr("boolean", { "default": default_values.skip == false ? false : true, input : true }),
            /**
             * @componentProperty {string} ltPropActiveClass=lyteActive
             * @version 1.0.0
             * @input
             * @condition ltPropYield true
             */
            ltPropActiveClass: Lyte.attr("string", { "default": default_values.activeClass || 'lyteActive', input : true }),
            /**
             * @componentProperty {string} ltPropCompletedClass=lyteCompleted
             * @version 1.0.0
             * @input
             * @condition ltPropYield true
             */
            ltPropCompletedClass: Lyte.attr("string", { "default": default_values.completedClass || 'lyteCompleted', input : true }),
            /**
             * @componentProperty {string} ltPropWarningClass=lyteWarning
             * @version 1.0.0
             * @input
             * @condition ltPropYield true
             */
            ltPropWarningClass: Lyte.attr("string", { "default": default_values.warningClass || 'lyteWarning', input : true }),
            /**
             * @componentProperty {boolean} ltPropKeepMarked=false
             * @version 1.0.0
             * @input
             */
            ltPropKeepMarked: Lyte.attr("boolean", { "default": default_values.keepMarked || false, input : true }),
            /**
             * @componentProperty {boolean} ltPropYield=false
             * @version 1.0.0
             * @input
             */
            ltPropYield: Lyte.attr("boolean", { "default": default_values.yield || false, input : true }),
            /**
             * @componentProperty {string} ltPropLabel=''
             * @condition ltPropYield false
             * @version 1.0.0
             * @input
             */
            ltPropLabel: Lyte.attr('string', { 'default': default_values.label || '', input : true }),
            // /**
            //  * @componentProperty {string} ltPropOption=''
            //  * @condition ltPropYield false
            //  * @version 1.0.0
            //  * @input
            //  */
            ltPropOption: Lyte.attr('string', { 'default': default_values.option || '', input : true }),

            /**
             * @componentProperty {default | advanced} ltPropType=default
             * @version 2.2.6
             * @input
             * @allowedValuesDepends ltPropYield
             * @map false default
             * @map true default,advanced
             */
            ltPropType: Lyte.attr('string', { default: default_values.type, input : true }),
            /**
             * @componentProperty {number} ltPropOffset=0
             * @condition ltPropType advanced
             * @version 2.2.6
             * @input
             */
            ltPropOffset: Lyte.attr('number', { default: default_values.offset || 0, input : true }),
            /**
             * @componentProperty {number} ltPropIndex=0
             * @condition ltPropType advanced
             * @version 2.2.6
             * @input
             */
            ltPropIndex: Lyte.attr('number', { default: default_values.index || 0, input : true }),
            /**
             * @experimental ltPropDataType
             */
            ltPropDataType: Lyte.attr('array', { default: [] }),

            // aria
            /**
             * @componentProperty {boolean} ltPropAria=false
             * @version 3.1.0
             * @input
             */
            ltPropAria: Lyte.attr('boolean', { default: default_values.aria || false, input : true }),
            /**
             * @componentProperty {string} ltPropAriaValue=step
             * @condition ltPropAria true
             * @version 3.1.0
             * @input
             */
            ltPropAriaValue: Lyte.attr('string', { default: default_values.ariaValue || 'step', input : true }),

            /**
             * @componentProperty {horizontal | vertical} ltPropDirection=horizontal
             * @condition ltPropClass lyteStepBullet
             * @version 3.118.0
             * @input
             */
            ltPropDirection: Lyte.attr("string", { "default": "horizontal", input : true}),

            ltPropPreventLastAsCompleted : Lyte.attr( 'boolean', { default : default_values.preventLastAsCompleted || ( _lyteUiUtils.isWidget || window.isLyteWidget ) || false } ),

            // system data

            dummyContent: Lyte.attr('array', { default: [] }),
            widthArr: Lyte.attr('array', { default: [] }),
            divWidth: Lyte.attr('number', { default: 0 }),
            forwardWidth: Lyte.attr('number', { default: 0 }),
            backwardWidth: Lyte.attr('number', { default: 0 })
        }
    },
    /**
     * @customElement lyte-step-item
     */
    /**
     * @customElement lyte-step-head
     */
    /**
     * @customElement lyte-step-body
     */
    /**
     * @customElement lyte-step-structure
     */
    /**
     * @customElement lyte-step-backward
     */
    /**
     * @customElement lyte-step-forward
     */
    actions: {
        'onclick': function (event, Component, data) {
            if ((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined && event.target.href.indexOf('javascript:') != -1 && event.target.target == '_blank') { return false; }
            if (this.getMethods('onClick')) {

                /**
                 * This method is called after the step component is rendered.
                 * @method onClick
                 * @author ponkarthikeyan.t@zohocorp.com
                 * @version 1.0.1
                 * @param { object } stepItemClicked
                 * @param { object } stepElement
                 * @param { object } event
                 * @param { string | object } data
                 */

                this.executeMethod('onClick', Component, this.$node, event, data);
                event.stopPropagation();
            }
        },
        divClick: function (event, div) {
            if (this.getData('ltPropType') != 'advanced') {
                if ((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined && event.target.href.indexOf('javascript:') != -1 && event.target.target == '_blank') { return false; }
                if (this.getMethods('onClick') && this.getData('ltPropYield')) {
                    var node = event.target.correspondingElement || event.target;
                    while (node && node != div) {
                        if (node.tagName == 'LYTE-STEP-ITEM') {
                            this.executeMethod('onClick', node, this.$node, event, node.getAttribute('data-value'))
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            } else {
                if (this._transstart) {
                    return;
                }
                var close = $L(event.target).closest('lyte-step-forward');
                if (close.length) {
                    
                    /**
                     * This method is called before navigating to the next step.
                     * @method onBeforeNavigate
                     * @author ponkarthikeyan.t@zohocorp.com
                     * @condition ltPropType advanced
                     * @version 2.2.6
                     * @param { string } direction
                     * @param { number } startIndex
                     * @param { object } stepElement
                     */

                    if (this.getMethods('onBeforeNavigate') && this.executeMethod('onBeforeNavigate', 'forward', this.getData('ltPropIndex'), this.$node) == false) {
                        return;
                    }
                    this._enableAnimate = true;
                    this.setData('ltPropIndex', Math.max(0, this.getData('ltPropIndex') + this.getData('dummyContent').length));

                    if (this.getMethods('onNavigate')) {
                        /**
                         * This method is called after navigating to the next step.
                         * @method onNavigate
                         * @author ponkarthikeyan.t@zohocorp.com
                         * @condition ltPropType advanced
                         * @version 2.2.6
                         * @param { string } direction
                         * @param { number } startIndex
                         * @param { object } stepElement
                         */
                        this._finalCallback = this.executeMethod.bind(this, 'onNavigate', 'forward', this.getData('ltPropIndex'), this.$node);
                    }
                } else {
                    close = $L(event.target).closest('lyte-step-backward');
                    if (close.length) {
                        if (this.getMethods('onBeforeNavigate') && this.executeMethod('onBeforeNavigate', 'backward', this.getData('ltPropIndex'), this.$node) == false) {
                            return;
                        }
                        this._transstart = true;
                        this._transendback = this.constructBackward;
                        $L('lyte-step-structure', this.$node).on('transitionend', this._transEnd).addClass('lyteStepFade');
                        this.timeout();
                        if (this.getMethods('onNavigate')) {
                            this._finalCallback = this.executeMethod.bind(this, 'onNavigate', 'backward', this.getData('ltPropIndex'), this.$node);
                        }
                    } else {
                        if ((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined && event.target.href.indexOf('javascript:') != -1 && event.target.target == '_blank') {
                            return false;
                        }
                        close = $L(event.target).closest('lyte-step-item');
                        if (close.length) {
                            this.getMethods('onClick') && this.executeMethod('onClick', close.get(0), this.$node, event, close.attr('data-value'));
                        }
                    }
                }
            }
        }
    },

    forwardAdd: function (min, width, divWidth, consWid, newArr, data) {
        for (var i = min; i < width.length; i++) {

            if (consWid + width[i] > divWidth) {
                i--;
                break;
            }
            consWid += width[i];
            newArr.push(data[i]);
        }
        return { consWid: consWid, i: i };
    },

    backwardAdd: function (min, width, divWidth, consWid, newArr, data) {
        for (var i = min - 1; i >= 0; i--) {
            if (consWid + width[i] > divWidth) {
                break;
            }
            consWid += width[i];
            newArr.unshift(data[i]);
            min = i;
        }
        return { consWid: consWid, min: min };
    },

    constructBackward: function (forward, backward) {
        forward = forward || $L('lyte-step-forward', this.$node ).get(0);
        backward = backward || $L('lyte-step-backward', this.$node ).get(0);

        var data = this.getData('ltPropData'),
            min = Math.min(data.length, this.getData('ltPropIndex') + this.getData('ltPropOffset')),
            consWid = 0,
            newArr = [],
            width = this.getData('widthArr'),
            forwardWidth = this.getData('forwardWidth'),
            backwardWidth = this.getData('backwardWidth'),
            divWidth = this.getData('divWidth');

        consWid += backwardWidth;

        var ret = this.backwardAdd(min, width, divWidth, consWid, newArr, data);
        consWid = ret.consWid;
        min = ret.min;
        if (min == 0) {
            consWid -= backwardWidth;
            if (backward) {
                backward.classList.add('lyteStepHidden');
            }
        }

        if (consWid < divWidth) {
            var ret = this.forwardAdd((min + newArr.length), width, divWidth, consWid, newArr, data);
            consWid = ret.consWid;
        }
        if (min + newArr.length < data.length) {
            if (forward) {
                forward.classList.remove('lyteStepHidden');
            }
            consWid += forwardWidth;
            // var i = min;
            while (consWid > divWidth && newArr.length) {
                consWid -= width[min + newArr.length];
                // min++;
                newArr.pop();
                // newArr.shift();
            }
        }
        this._prevent = true;
        this.setData('ltPropIndex', min);
        delete this._prevent;
        this._arr = newArr;
        this.transend();
    },

    transend: function () {
        this.setData('dummyContent', this._arr);
        delete this._arr;
        if (this._finalCallback) {
            this._finalCallback();
            delete this._finalCallback;
        }
        this.moveTo(this.getData('ltPropSelected'), '', this.getData('ltPropSelected'), this.getData('ltPropIndex') + this.getData('dummyContent').length == this.getData('ltPropData').length);
        $L('.lyteStepFade', this.$node).removeClass('lyteStepFade')
    },

    constructForward: function (forward, backward) {
        forward = forward || $L('lyte-step-forward', this.$node ).get(0);
        backward = backward || $L('lyte-step-backward', this.$node ).get(0);
        var min = Math.max(0, this.getData('ltPropIndex') - this.getData('ltPropOffset')),
            consWid = 0,
            newArr = [],
            width = this.getData('widthArr'),
            forwardWidth = this.getData('forwardWidth'),
            backwardWidth = this.getData('backwardWidth'),
            divWidth = this.getData('divWidth'),
            data = this.getData('ltPropData');

        if (min != 0) {
            consWid += backwardWidth;
            if (backward) {
                backward.classList.remove('lyteStepHidden');
            }
        } else {
            if (backward) {
                backward.classList.add('lyteStepHidden');
            }
        }

        var ret = this.forwardAdd(min, width, divWidth, consWid, newArr, data),
            i = ret.i;

        consWid = ret.consWid;
        if (i < width.length) {
            while (consWid + forwardWidth > divWidth && i) {
                consWid -= width[i];
                i--;
                newArr.pop();
            }
            if (forward) {
                forward.classList.remove('lyteStepHidden');
            }
        } else {
            if (forward) {
                forward.classList.add('lyteStepHidden')
            }
            if (consWid < divWidth) {
                ret = this.backwardAdd(min, width, divWidth, consWid, newArr, data);
                consWid = ret.consWid;
                min = ret.min;
            }
            if (min == 0 && this.getData('ltPropIndex')) {
                consWid -= backwardWidth;
                consWid = this.forwardAdd(min + newArr.length, width, divWidth, consWid, newArr, data);
            }
        }
        this._prevent = true;
        this.setData('ltPropIndex', min);
        delete this._prevent;

        this._arr = newArr;
        this.transend();
    },

    measureWidth: function () {
        if (this.getData('ltPropType') == "advanced") {
            this._measureWidth(this.constructForward);
        }
    }.on('didConnect'),

    indexObs: function (arg) {
        if (this._prevent) {
            return;
        }
        if (this._enableAnimate) {
            this._transstart = true;
            delete this._enableAnimate;
            this.timeout();
            $L('lyte-step-structure', this.$node).on('transitionend', this._transEnd).addClass('lyteStepFade');
        } else {
            this._measureWidth(this.constructForward);
        }
    }.observes('ltPropIndex', 'ltPropData', 'ltPropData.[]'),

    _measureWidth: function (callback) {
        if (this.getData('ltPropType') == "advanced") {
            var width = [], data = this.getData('ltPropData');
            this.setData('dummyContent', data);

            var forward = $L('lyte-step-forward', this.$node).get(0),
                backward = $L('lyte-step-backward', this.$node).get(0);

            if (forward) {
                forward.classList.remove('lyteStepHidden');
            }

            if (backward) {
                backward.classList.remove('lyteStepHidden');
            }

            $L.fastdom.measure(function () {
                var items = $L('lyte-step-item', this.$node);

                for (var i = 0; i < items.length; i++) {
                    var style = getComputedStyle(items.get(i));
                    width[i] = items.get(i).getBoundingClientRect().width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                }
                var divWidth = this.$node.querySelector('lyte-step-structure').getBoundingClientRect().width,
                    forwardWidth = 0,
                    backwardWidth = 0;

                if (forward) {
                    forwardWidth = forward.getBoundingClientRect().width;
                    var compsty = getComputedStyle(forward);
                    forwardWidth += (parseFloat(compsty.marginRight) + parseFloat(compsty.marginLeft));
                }

                if (backward) {
                    backwardWidth = backward.getBoundingClientRect().width;
                    var compsty = getComputedStyle(backward);
                    backwardWidth += (parseFloat(compsty.marginRight) + parseFloat(compsty.marginLeft));
                }

                this.setData({
                    divWidth: divWidth,
                    widthArr: width,
                    forwardWidth: forwardWidth,
                    backwardWidth: backwardWidth
                })
                $L.fastdom.mutate(callback.bind(this, forward, backward));
            }.bind(this))
        }
    },

    add_roles : function( items ){
        var len = items.length;

        for( var i = 0; i < len; i++ ){
            var cur = items.eq( i );
            !cur.attr( 'role') && cur.attr( 'role', 'listitem' );
        }
    },

    moveTo: function (number, state, selected, addClass) {
        this._preventselect = true;
        var data = this.getData('ltPropData'),
            dummyContent = this.getData('dummyContent'),
            index = this.getData('ltPropIndex'),
            array = this.getData('ltPropDataType'),
            items = $L('lyte-step-item', this.$node),
            active = this.getData('ltPropActiveClass'),
            completed = this.getData('ltPropCompletedClass'),
            incomplete = this.getData('ltPropWarningClass'),
            keep = this.getData('ltPropKeepMarked');

        addClass && items.eq(-1).addClass('lyteStepLast');

        if( this.data.ltPropAria ){
            this.add_roles( items );
        }

        number = Math.min(Math.max(0, number || 0), data.length - 1);

        if (selected == undefined) {
            for (var i = 0; i < data.length; i++) {
                if (array[i] == 'active') {
                    selected = i;
                }
            }
            if (selected == undefined) {
                this.setData('ltPropSelected', 0);
                selected = 0;
            }
        }

        for (var i = 0; i < data.length; i++) {
            var arrOp = array[i] == undefined ? 'insertAt' : 'replaceAt',
                state2Push;

            if (number != selected && number > selected && i >= selected && i < number) {
                state2Push = state == "incomplete" ? 'incomplete' : 'completed';
            } else {
                if (i == number) {
                    state2Push = "active";
                } else if (i > number) {
                    state2Push = keep ? array[i] || '' : "";
                } else {
                    if (i > selected) {
                        state2Push = state == "incomplete" ? 'incomplete' : 'completed';
                    } else {
                        state2Push = (array[i] == "active" ? "completed" : array[i]) || 'completed';
                    }
                }
            }

            Lyte.arrayUtils(array, arrOp, i, state2Push);
            if (i >= index) {
                if (array[i] == 'active') {
                    items.eq(i - index).removeClass(completed, incomplete).addClass(active);
                } else if (array[i] == "incomplete") {
                    items.eq(i - index).removeClass(completed, active).addClass(incomplete);
                } else if (array[i] == "completed") {
                    items.eq(i - index).removeClass(active, incomplete).addClass(completed);
                } else {
                    items.eq(i - index).removeClass(completed, active, incomplete);
                }
                if (this.data.ltPropAria) {
                    array[i] == 'active' ? items.eq(i - index).find('a').attr('aria-current', this.data.ltPropAriaValue) : items.eq(i - index).find('a').removeAttr('aria-current')
                }
            }
        }
        this.setData('ltPropSelected', number);
        delete this._preventselect;
    },

    aria_obs : function(){
        var data = this.data;

        $L( 'lyte-step-item.' + data.ltPropActiveClass, this.$node ).find( "a" ).attr( "aria-current", data.ltPropAriaValue );
    }.observes( 'ltPropAriaValue' ),

    transfade: function () {
        clearTimeout(this._animetime);
        delete this._animetime;
        delete this._transstart;
        this._measureWidth(this._transendback || this.constructForward);
        delete this._transendback;
        $L('.lyteStepFade', this.$node).off('transitionend');
    },

    returntran: function (prop) {
        var ret = 0;
        if (/(.+)(s|ms)$/.test(prop)) {
            var match = prop.match(/(.+)(s|ms)$/);
            ret = parseFloat(match[1]) * (match[2] == "s" ? 1000 : 1);
        }
        return ret;
    },

    timeout: function () {
        var elem = $L('lyte-step-structure', this.$node).get(0),
            style = getComputedStyle(elem);
        this._animetime = setTimeout(this._transEnd, 10 + this.returntran(style.transitionDuration) + this.returntran(style.transitionDelay));
    }
});

var stepResize = function(evt) {
    clearTimeout(window._stepresize);
    window._stepresize = setTimeout(function () {
        delete window._stepresize;
        var steps = document.getElementsByTagName('lyte-step');
        for (var i = 0; i < steps.length; i++) {
            var comp = steps[i].component;
            comp.data.ltPropType == 'advanced' && comp._measureWidth(comp.constructForward);
        }
    }, 0)
}

window.addEventListener('resize', stepResize, true);
window.addEventListener('orientationchange', stepResize, true);

/**
 * @syntax nonYielded
 * @dollar 0 ["Home","Menu",{"name": "Leads"},{"name": "Contacts"},{"name": "Services"}]
 * <lyte-step lt-prop-data='{{$0}}' lt-prop-label="name" lt-prop-label-alignment="left"></lyte-step>
 */

/**
 * @syntax yielded
 * <lyte-step lt-prop-yield="true">
 *      <template is="registerYield" yield-name="yield">
 *          <lyte-step-structure>
 *              <lyte-step-item>
 *                  <lyte-step-body>
 *                      Home
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item>
 *                  <lyte-step-body>
 *                      Menu
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item>
 *                  <lyte-step-body>
 *                      Edit
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item>
 *                  <lyte-step-body>
 *                      Save
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *          </lyte-step-structure>
 *      </template>
 *  </lyte-step>
 */

/**
 * @syntax aria
 * @attribute ltPropAria=true
 * <lyte-step lt-prop-yield="true" lt-prop-aria = true role = "navigation" aria-label = "step">
 *      <template is="registerYield" yield-name="yield">
 *          <lyte-step-structure role = "list">
 *              <lyte-step-item role = 'listitem'>
 *                  <lyte-step-body>
 *                      <a href = "">Home</a>
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item role = 'listitem'>
 *                  <lyte-step-body>
 *                     <a href = "">Menu</a>
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item role = 'listitem'>
 *                  <lyte-step-body>
 *                      <a href = "">Edit</a>
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *              <lyte-step-item role = 'listitem'>
 *                  <lyte-step-body>
 *                      <a href = "">Save</a>
 *                  </lyte-step-body>
 *              </lyte-step-item>
 *          </lyte-step-structure>
 *      </template>
 *  </lyte-step>
 */

/**
 * @syntax
 * @attribute ltPropYield=true
 * @attribute ltPropClass=lyteStepBullet
 * <lyte-step lt-prop-yield ="true" lt-prop-class = "lyteStepBullet">
 *   <template is="registerYield" yield-name="yield">
 *       <lyte-step-structure>
 *           <lyte-step-item>
 *               <lyte-step-body>Home</lyte-step-body>
 *               <lyte-step-head>1</lyte-step-head>
 *           </lyte-step-item>
 *           <lyte-step-item>
 *               <lyte-step-body>Menu</lyte-step-body>
 *               <lyte-step-head>2</lyte-step-head>
 *           </lyte-step-item>
 *           <lyte-step-item>
 *           <lyte-step-body>Edit</lyte-step-body>
 *               <lyte-step-head>3</lyte-step-head>
 *           </lyte-step-item>
 *           <lyte-step-item>
 *               <lyte-step-body>Save</lyte-step-body>
 *               <lyte-step-head>4</lyte-step-head>
 *           </lyte-step-item>
 *       </lyte-step-structure>
 *   </template>
 *  </lyte-step>
 */

/**
 * @syntax 
 * @attribute ltPropYield=true
 * @attribute ltPropType=advanced
 * @dollar 0 [{ "name" : "Home" , "order" : 1 },{ "name" : "Edit" , "order" : 2 },{ "name" : "Delete" , "order" : 3 },{ "name" : "Save" , "order" : 4 },{ "name" : "Export" , "order" : 5 },{ "name" : "Import" , "order" : 6 },{ "name" : "Settings" , "order" : 7 },{ "name" : "Profile" , "order" : 8 },{ "name" : "Logout" , "order" : 9 }]
 * <lyte-step lt-prop-yield = true lt-prop-type = "advanced" lt-prop-class = "lyteStepFlat" lt-prop-data = {{$0}}>
 *   <template is="registerYield" yield-name="yield">
 *       <lyte-step-structure>
 *           <lyte-step-backward>backward</lyte-step-backward>
 *           <template lyte-for = "{{ltPropContent}} as item index">
 *               <lyte-step-item data-value = {{item.order}}>
 *                   <lyte-step-body> {{item.name}} </lyte-step-body>
 *               </lyte-step-item>
 *           </template>
 *           <lyte-step-forward>forward</lyte-step-forward>
 *       </lyte-step-structure>
 *   </template>
 * </lyte-step>
 */