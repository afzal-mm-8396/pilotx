/**
 * This is used to indicate the current position in a page
 * @component lyte-breadcrumb
 * @version 1.0.0
 */

Lyte.Component.register('lyte-breadcrumb',{
_template:"<template tag-name=\"lyte-breadcrumb\" lyte-breadcrumb=\"\"> <div onclick=\"{{action('divClick',event,this)}}\" class=\"lyteBreadcrumbContainer {{if(expHandlers(ltPropType,'==','advanced'),'lyteBreadcrumbCollapsibleContainer ','')}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;default&quot;)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <lyte-breadcrumb-structure class=\"{{ltPropClass}}\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\"><template case=\"true\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{indexVal}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template case=\"false\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\"><template case=\"true\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{array[ltPropOption]}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template case=\"false\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template></template></template></template> </lyte-breadcrumb-structure> </template><template case=\"false\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;advanced&quot;)}}\"><template case=\"true\"> <lyte-breadcrumb-structure> <div class=\"lyteBreadcrumbFirst lyteBreadcrumbCollapseSection\"> <lyte-yield yield-name=\"yield\" lt-prop-content=\"{{advContent.first}}\" lt-prop-first=\"{{advYieldData}}\"></lyte-yield> </div> <template is=\"if\" value=\"{{advMiddleButtonShow}}\"><template case=\"true\"><lyte-dropdown lt-prop=\"{{ltPropDropdown}}\" lt-prop-selected=\"{{lbind(middleSelected)}}\" class=\"lyteBreadcrumbCollapseShowElem\" on-option-selected=\"{{method('dropdownItem')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"lyteBreadcrumbShrinkButton\"> <template is=\"if\" value=\"{{ltPropButtonDisplay}}\"><template case=\"true\"><span>{{ltPropButtonDisplay}}</span></template><template case=\"false\"><span class=\"lyteBreadcrumbCollapseIcon\"></span></template></template> </lyte-drop-button> <lyte-drop-box class=\"lyteBreadcrumbDropdown\"> <lyte-drop-body> <template is=\"for\" items=\"{{advContent.middle}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\"> <lyte-yield yield-name=\"yield\" lt-prop-content=\"{{item}}\" lt-prop-dropdown=\"{{advYieldData}}\"></lyte-yield> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown></template></template> <div class=\"lyteBreadcrumbLast lyteBreadcrumbCollapseSection\"> <lyte-yield yield-name=\"yield\" lt-prop-content=\"{{advContent.last}}\" lt-prop-last=\"{{advYieldData}}\"></lyte-yield> </div> </lyte-breadcrumb-structure> </template><template case=\"false\"> <lyte-breadcrumb-structure class=\"{{ltPropClass}}\"> <lyte-dropdown lt-prop=\"{{ltPropDropdown}}\" lt-prop-selected=\"{{lbind(middleSelected)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button>{{ltPropButtonDisplay}}</lyte-drop-button> <lyte-drop-box class=\"lyteBreadcrumbDropdown\"> <lyte-drop-body> <template is=\"for\" items=\"{{middleItems}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{index}}\"> <lyte-yield yield-name=\"yield\" lt-prop-item=\"{{item}}\" lt-prop-dropdown=\"true\"></lyte-yield> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"for\" items=\"{{backwardItems}}\" item=\"item\" index=\"index\"> <lyte-breadcrumb-item data-orient=\"backward\" data-index=\"{{index}}\" class=\"{{item.class}}\" id=\"{{item.id}}\"> <lyte-yield yield-name=\"yield\" lt-prop-item=\"{{item}}\"></lyte-yield> </lyte-breadcrumb-item> </template> </lyte-breadcrumb-structure> </template></template></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"insertYield","position":[1,5,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropClass","ltPropData","ltPropActiveClass","ltPropCompletedClass","ltPropYield","ltPropLabel","ltPropOption","ltPropAria","ltPropAriaValue","ltPropType","ltPropButtonDisplay","ltPropDropdown","backwardItems","middleSelected","advContent","advMiddleButtonShow","advYieldData"],
_observedAttributesType :["string","array","string","string","boolean","string","string","boolean","string","string","string","string","array","string","object","boolean","boolean"],

	_lyteUtilFunctions : [ "modifyCrumbItems" ],
	init : function(){
	    /**
		 * This method is called before the breadcrumb is rendered.
		 * @method beforeRender
		 * @author ponkarthikeyan.t@zohocorp.com
		 * @version 1.0.1
		 * @param { object } breadcrumbElement
		 */
		this.getMethods('beforeRender') && this.executeMethod('beforeRender', this.$node);
	},	

	didDestroy : function(){
		clearTimeout( this._timeout );
		delete this.$node.modifyCrumbItems;
		window.removeEventListener('resize', this.advEventFunctions);
		window.removeEventListener('orientationchange', this.advEventFunctions);
		delete this.advEventFunctions;
	},

	didConnect : function(){
		if( this.data.ltPropType == "default" ){
			this.ArrayContentChange();

			/**
			 * @utility refreshBreadcrumbSize
			 * @author Rahul B <rahul.babu@zohocorp.com>
			 * @version 1.0.0
			 * @condition ltPropType advanced
			 */

			/**
			 * @utility modifyCrumbItems
			 * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
			 * @version 1.0.0
			 * @param { string } propertyName
			 * @param { number } index
			 * @param { string | object } value
			 */

			this.$node.modifyCrumbItems = function( property, arg1, arg2 ){
				if( !this.data.ltPropYield ){
					Lyte.arrayUtils( this.data.ltPropData, property, arg1, arg2 );
				} else {
					this.ArrayContentChange();
				}
			}.bind( this );

			this.breadcrumbClass();

			$L.fastdom.measure( function(){
				var is_rtl = _lyteUiUtils.getRTL();
				$L.fastdom.mutate( function(){
					if( is_rtl ){
						$L( this.$node ).addClass( 'lyteRTL' );
					}
				}.bind( this ));
			}.bind( this ));
			var cb = "afterRender";
			/**
			 * This method is called after the breadcrumb is rendered.
			 * @method afterRender
			 * @author ponkarthikeyan.t@zohocorp.com
			 * @version 1.0.1
			 * @param { object } breadcrumbElement
			 */
	       if( this.getMethods( cb ) ){
	       		this.executeMethod( cb, this.$node );
	       }
	   }

	   if( this.data.ltPropAria ){
			var $node = $L( this.$node );
			if( !$node.attr( 'role' ) ){
				$node.attr( 'role', "navigation" );
			}
	   }
	},

	ArrayContentChangeObs : function(){
		clearTimeout( this._timeout );
		this._timeout = setTimeout( this.ArrayContentChange.bind( this ), 0 );
	}.observes( 'ltPropData.[]', 'ltPropData' ),

	ArrayContentChange : function(){
		var data = this.data,
		active = data.ltPropActiveClass,
		completed = data.ltPropCompletedClass,
		aria = data.ltPropAria,
		innerElements = $L( 'lyte-breadcrumb-item', this.$node ),
		__length = innerElements.length - 1,
		last = innerElements.eq( -1 );

		for( var i = 0; i < __length; i++ ){
			var cur = innerElements.eq( i );
			cur.addClass( completed ).removeClass( active );
			if( aria ){
				!cur.attr( 'role' ) && cur.attr( "role", "listitem" );
				cur.find( 'a' ).removeAttr( 'aria-current' );
			}
		}

		last.removeClass( completed ).addClass( active );
		if( aria ){
			last.find( 'a' ).attr( 'aria-current', data.ltPropAriaValue );
		}
	},

	aria_obs : function(){
		 $L( 'lyte-breadcrumb-item', this.$node ).eq( -1 ).find( "a" ).attr( "aria-current", this.data.ltPropAriaValue );
	}.observes( 'ltPropAriaValue' ),

	breadcrumbClassObs : function(){
		this.breadcrumbClass();
	}.observes('ltPropClass'),

	breadcrumbClass : function(){
		var structure = $L( 'lyte-breadcrumb-structure', this.$node );
		if( this.data.ltPropYield ) {
			structure.addClass( this.data.ltPropClass );
		}

		if( this.data.ltPropAria && !structure.attr( 'role' ) ){
			structure.attr( 'role', "list" )
		}
	},
	data : function(){
		var default_values = _lyteUiUtils.getDefault( 'lyte-breadcrumb' );

        return {
			//  user data
		   /**
			* @componentProperty {string} ltPropClass=lyteBreadcrumbSlash
			* @version 1.0.0
			* @input
			*/
			ltPropClass : Lyte.attr("string",{"default": default_values.class || 'lyteBreadcrumbSlash', input : true}),
		   /**
			* @componentProperty {string[] | object[]} ltPropData
			* @mandatory
			* @version 1.0.0
			* @default []
			* @input
			*/
			ltPropData : Lyte.attr("array",{"default":[], input : true}),
		   /**
			* @componentProperty {string} ltPropActiveClass=lyteActive
			* @version 1.0.0
			* @input
			* @condition ltPropYield true
			*/
			ltPropActiveClass : Lyte.attr("string",{"default": default_values.activeClass || 'lyteActive', input : true}),
		   /**
			* @componentProperty {string} ltPropCompletedClass=lyteCompleted
			* @version 1.0.0
			* @input
			* @condition ltPropYield true
			*/
			ltPropCompletedClass : Lyte.attr("string",{"default": default_values.completedClass || 'lyteCompleted', input : true}),
		   /**
			* @componentProperty {boolean} ltPropYield=false
			* @version 1.0.0
			* @input
			*/
			ltPropYield : Lyte.attr("boolean",{"default": default_values.yield || false, input : true}),
		   /**
			* @componentProperty {string} ltPropLabel=''
			* @condition ltPropYield false
			* @version 1.0.0
			* @input
			*/
			ltPropLabel : Lyte.attr('string', {'default': default_values.label || '', input : true}),
		//    /**
		// 	* @componentProperty {string} ltPropOption=''
		// 	* @condition ltPropYield false
		// 	* @version 1.0.0
		// 	* @input
		// 	*/			
            ltPropOption : Lyte.attr('string', {'default': default_values.option || ''}),

            // aria
		   /**
			* @componentProperty {boolean} ltPropAria=false
			* @version 3.1.0
			* @input
			*/
            ltPropAria : Lyte.attr( 'boolean', { default : default_values.aria || false, input : true } ),
           /**
			* @componentProperty {string} ltPropAriaValue=page
			* @condition ltPropAria true
			* @version 3.1.0
			* @input
			*/
            ltPropAriaValue : Lyte.attr( 'string', { default : default_values.ariaValue || "page", input : true } ),

            ltPropType : Lyte.attr( 'string', { default : default_values.type || "default", input : true } ),

            ltPropButtonDisplay : Lyte.attr( 'string', { default : default_values.buttonDisplay || "", input : true } ),

            ltPropDropdown : Lyte.attr( 'string', { default : default_values.dropdown || '{}', input : true } ),

            backwardItems : Lyte.attr( 'array', { default : [] } ),
            middleSelected : Lyte.attr( 'string', { default : "" } ),
			advContent : Lyte.attr( 'object', { default : {} } ),
			advMiddleButtonShow : Lyte.attr( 'boolean', { default : false } ),
			advYieldData : Lyte.attr( 'boolean', { default : true } ) //to pass as arg via yield
		}
	},
	actions : {
	   'onclick' : function ( event, Component, data ){
		   	var target = event.target,
		   	cb = 'onClick';

			if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && event.target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
				return false;
			}

			/**
			 * This method is called while clicking on a breadcrumb item.
			 * @method onClick
			 * @author ponkarthikeyan.t@zohocorp.com
			 * @version 1.0.0
			 * @param { object } breadcrumbItem
			 * @param { object } breadcrumbElement
			 * @param { object } event
			 * @param { string | object } breadcrumbItemData
			 */

			if( this.getMethods( cb ) ){
				this.executeMethod( cb, Component, this.$node, event, data );
				event.stopPropagation();	
			}
		},
        divClick : function( event, div ){
        	var target = event.target,
        	cb = "onClick";

			if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
				return false;
			}
            if( this.getMethods( cb ) && this.data.ltPropYield ) {

            	var node = $L( target.correspondingElement || target ).closest( 'lyte-breadcrumb-item', div );

            	if( node.length ){
            		this.executeMethod( cb, node.get( 0 ), this.$node, event, node.attr( 'data-value' ) );
            	}
            }
        }
	},
	methods : {
		/**
		 * @customElement lyte-breadcrumb-item
		 */
		/**
		 * @customElement lyte-breadcrumb-head
		 */
		/**
		 * @customElement lyte-breadcrumb-body
		 */
		dropdownItem : function( event ){
			var node = arguments[3].querySelector('lyte-breadcrumb-item');
			this.getMethods( 'onClick' ) && this.executeMethod( 'onClick', node, this.$node, event, node.getAttribute('data-value') );
		}
	}
}, { mixins : [ 'lyte-advanced-breadcrumb' ] });

/**
 * @syntax Yielded
 * @attribute ltPropYield=true
 *  <lyte-breadcrumb lt-prop-yield="true">
 *		<template is="registerYield" yield-name="yield">
 *			<lyte-breadcrumb-structure>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Home 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Menu 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Edit 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Save 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *			</lyte-breadcrumb-structure>
 *		</template>
 *	</lyte-breadcrumb>
 */

/**
 * @syntax Non Yielded
 * @dollar 0 ["home","works",{"name": "Leads"},{"name": "Contacts"},{"name": "Services"}]
 * <lyte-breadcrumb lt-prop-data='{{$0}}' lt-prop-label="name">
 * </lyte-breadcrumb>
 */

/**
 * @syntax aria
 * @attribute ltPropAria=true
  *  <lyte-breadcrumb lt-prop-yield="true" lt-prop-aria = true role = "navigation" aria-label = "breadcrumb">
 *		<template is="registerYield" yield-name="yield">
 *			<lyte-breadcrumb-structure role = "list">
 *				<lyte-breadcrumb-item role = "listitem">
 *					<lyte-breadcrumb-body>
 *						<a href = "">Home</a>
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item role = "listitem">
 *					<lyte-breadcrumb-body>
 *						<a href = "">Menu</a>
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item role = "listitem">
 *					<lyte-breadcrumb-body>
 *						<a href = "">Edit</a>
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item role = "listitem">
 *					<lyte-breadcrumb-body>
 *						<a href = "">Save</a>
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *			</lyte-breadcrumb-structure>
 *		</template>
 *	</lyte-breadcrumb>
 */