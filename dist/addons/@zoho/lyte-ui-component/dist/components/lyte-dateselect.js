/**
 * This component is used to select a date or a range of date from the given options
 * @component lyte-dateselect
 * @version 1.0.5
 * @dependency lyte-dropdown
 *  components/lyte-dropdown.js
 *  theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * @dependency lyte-calendar
 *  components/lyte-calendar.js
 *  theme/compiledCSS/default/ltr/lyte-ui-calendar.css
 * 	plugins/lyte-moment.js
 * @dependency lyte-daterangepicker
 *  components/lyte-daterangepicker.js
 *  theme/compiledCSS/default/ltr/lyte-ui-daterangepicker.css
 * @import lyte-dropdown
 * @ignoreMethods
 * @ignoreProperties
 * @ignoreUtils
 */

/**
 * @domEvents 
 * @import lyte-dropdown
 */

Lyte.Component.register("lyte-dateselect", {
_template:"<template tag-name=\"lyte-dateselect\" lyte-dateselect=\"\"> <lyte-dropdown lt-prop=\"{{stringify(ltPropDropdown)}}\" before-select=\"{{method('keepTickOnCalendarSelection')}}\" on-before-show=\"{{method('bfSw')}}\" on-show=\"{{method('sw')}}\" on-before-hide=\"{{method('bfHde')}}\" on-hide=\"{{method('hde')}}\" on-option-selected=\"{{method('optSel')}}\" lt-prop-selected=\"{{lbind(ltPropSelected)}}\" on-position-changed=\"{{method('posChange')}}\" lt-prop-prevent-navigation=\"{{preventNavigation}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button id=\"{{randomId}}\" class=\"lyteTextEllipsisNode\" lt-prop-tooltip-config=\"{{ltPropDropdown.tooltip}}\"> <template is=\"if\" value=\"{{ltPropButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"buttonYield\" lt-prop-display-value=\"{{ltPropDisplayValue}}\" lt-prop-selected=\"{{ltPropSelected}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(ltPropSelected,'&amp;&amp;',ltPropDisplayValue)}}\"><template case=\"true\"> {{ltPropDisplayValue}} </template><template case=\"false\"> <span class=\"lyteDropPlaceholderMultiple\">{{ltPropDropdown.placeholder}}</span> </template></template> <lyte-icon class=\"dropdown {{ltPropDropdown.iconClass}}\"></lyte-icon> </template></template> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropDropdownWrapperClass}}\" id=\"lyteDateSelect\"> <lyte-drop-body class=\"lyteList\"> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <template is=\"if\" value=\"{{value}}\"><template case=\"true\"><lyte-drop-item data-value=\"{{key}}\" aria-label=\"{{ltPropAriaLabel[key]}}\" class=\"{{changeClass(key,this)}}\" id=\"drop_{{randomId}}_{{key}}\" aria-controls=\"{{randomId}}_{{key}}\" aria-haspopup=\"{{if(popupMap[key],'dialog',false)}}\" aria-expanded=\"{{expanded}}\"> <template is=\"if\" value=\"{{ltPropItemYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"item\" item-value=\"{{ltPropOptions[key]}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(value,'==',true)}}\"><template case=\"true\"> {{lyteUiI18n(key)}} </template><template case=\"false\"><template is=\"if\" value=\"{{value}}\"><template case=\"true\"> {{value}} </template></template></template></template></template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(key,'==','specificDate'),'||',expHandlers(key,'==','customRange')),'||',expHandlers(key,'==','before')),'||',expHandlers(key,'==','after'))}}\"><template case=\"true\"> <span class=\"{{if(ifEquals(pos,'left'),'dateArrow arrowLeft','dateArrow arrowRight')}}\"></span> </template></template> </lyte-drop-item></template></template> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"dateSelectcal lyteDropdownHidden {{ltPropCalendarWrapperClass}}\"> <template is=\"if\" value=\"{{opend}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropOptions.specificDate}}\"><template case=\"true\"> <div class=\"specificDate lyteDropdownHidden\" aria-describedby=\"drop_{{randomId}}_specificDate\" id=\"{{randomId}}_specificDate\" aria-modal=\"true\" role=\"dialog\" aria-live=\"polite\"> <template is=\"if\" value=\"{{renderCalendar}}\"><template case=\"true\"><lyte-calendar lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-date=\"{{lbind(ltPropCurrentDate)}}\" on-date-selected=\"{{method('dateselected1')}}\" on-navigate=\"{{method('rangenavigate','onNavigate')}}\" lt-prop-activate-navigation=\"{{lbind(calNavigation)}}\"> <template is=\"if\" value=\"{{ltPropCalendarYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template></template> </lyte-calendar></template></template> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"dateselect-footer\" selected=\"{{ltPropSelected}}\" current-date=\"{{ltPropCurrentDate}}\"></lyte-yield> </template></template> </div> </template></template> <template is=\"if\" value=\"{{ltPropOptions.customRange}}\"><template case=\"true\"> <div class=\"customRange lyteDropdownHidden\" aria-describedby=\"drop_{{randomId}}_customRange\" id=\"{{randomId}}_customRange\" aria-modal=\"true\" role=\"dialog\" aria-live=\"polite\"> <template is=\"if\" value=\"{{renderRangePicker}}\"><template case=\"true\"><lyte-daterangepicker lt-prop=\"{{stringify(ltPropDateRangePicker)}}\" lt-prop-start-date=\"{{lbind(ltPropStartDate)}}\" lt-prop-end-date=\"{{lbind(ltPropEndDate)}}\" short-month-names=\"{{shortMonthNames}}\" long-month-names=\"{{longMonthNames}}\" cal-view-date1=\"{{lbind(ltPropStartDateObject)}}\" cal-view-date2=\"{{lbind(ltPropEndDateObject)}}\" on-date-selected=\"{{method('dateselected')}}\" on-navigation=\"{{method('rangenavigate','onNavigation')}}\" on-start-date-changed=\"{{method('startChange')}}\" date-selected=\"{{lbind(dateSelected)}}\" lt-prop-activate-navigation=\"{{lbind(rangeNavigation)}}\" lt-prop-navigation=\"true\" prevent-keydown=\"{{preventKeydown}}\" lt-prop-lazy-rendering=\"{{ltPropLazyRendering}}\"> </lyte-daterangepicker></template></template> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"dateselect-footer\" selected=\"{{ltPropSelected}}\" start-date=\"{{ltPropStartDate}}\" end-date=\"{{ltPropEndDate}}\"></lyte-yield> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.before,'||',ltPropOptions.after)}}\"><template case=\"true\"> <div class=\"lyteDsBeforeCal lyteDropdownHidden\" aria-describedby=\"drop_{{randomId}}_{{ltPropSelected}}\" id=\"{{randomId}}_before\" aria-modal=\"true\" role=\"dialog\" aria-live=\"polite\"> <template is=\"if\" value=\"{{renderBefore}}\"><template case=\"true\"><lyte-calendar lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-date=\"{{lbind(bfrAftrCurrentDate)}}\" on-date-selected=\"{{method('dateselected1',event,true)}}\" on-navigate=\"{{method('rangenavigate','onNavigate')}}\" lt-prop-activate-navigation=\"{{lbind(beforeNavigation)}}\"> <template is=\"if\" value=\"{{ltPropCalendarYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template></template> </lyte-calendar></template></template> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"dateselect-footer\" selected=\"{{ltPropSelected}}\" current-date=\"{{ltPropCurrentDate}}\"></lyte-yield> </template></template> </div> </template></template></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"forIn","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,2]},{"type":"if","position":[0,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["shortMonthNames","longMonthNames","ltPropStartDateObject","ltPropEndDateObject","ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropCalendarYield","ltPropCalendar","ltPropDateRangePicker","ltPropItemYield","ltPropSelected","ltPropOptions","ltPropDropdownWrapperClass","ltPropDropdown","ltPropDisplayValue","ltPropButtonYield","ltPropCalendarWrapperClass","ltPropFooterYield","ltPropI18n","ltPropAnimation","ltPropNavigation","ltPropBeforeCurrentDate","ltPropAfterCurrentDate","ltPropLazyRendering","pos","prevSel","opend","randomId","dateSelected","calNavigation","rangeNavigation","beforeNavigation","preventKeydown","bfrAftrCurrentDate","itemMap","renderCalendar","renderRangePicker","renderBefore","preventNavigation","popupMap","expanded"],
_observedAttributesType :["array","array","object","object","string","string","string","boolean","object","object","boolean","string","object","string","object","string","boolean","string","boolean","boolean","object","boolean","string","string","boolean","string","string","boolean","string","boolean","boolean","boolean","boolean","boolean","string","object","boolean","boolean","boolean","boolean","object","string"],

	_lyteUtilFunctions : [ "toggle" ],
	init : function(){
		/**
		 * This method is called before the dateselect is rendered.
		 * @method beforeRender
		 * @author ponkarthikeyan.t@zohocorp.com
		 * @version 1.0.5
		 * @param { object } dateselectElement
		 */
		this.getMethods( 'beforeRender' ) && this.executeMethod( 'beforeRender', this.$node );
		
		this.$node.toggle = function(){
			this._drop.toggle();
		}.bind( this );

		var __data = this.data;
		
		if( __data.ltPropLazyRendering ){
			__data.renderCalendar = false;
			__data.renderRangePicker = false;
			__data.renderBefore = false;
		}
	},

	removeTempUnSelection: function() {
		var dropdown = this.$node.querySelector( 'lyte-dropdown' ),
		box = dropdown.getDropBox(),
		item = box.querySelector( '.lyteDateSelectTempSelection' );

		if( item ) {
			item.classList.remove( 'lyteDateSelectTempSelection' );
		}
	},

	removeTempSelection: function() {
		var dropdown = this.$node.querySelector( 'lyte-dropdown' ),
		box = dropdown.getDropBox(),
		item = box.querySelector( '.lyteDateSelectPrevTempSelection' );

		if( item ) {
			item.classList.remove( 'lyteDateSelectPrevTempSelection' );
		}
	},

	data : function(){

		var default_values = _lyteUiUtils.getDefault( 'lyte-dateselect' );

		return {
			// data for date range picker and calendar
		   /**
			* @experimental shortMonthNames
			*/
			shortMonthNames : Lyte.attr( "array" , { "default" : [ 'Jan', 'Feb', 'Mar', 'Apr', 'short.may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]}),
		   /**
			* @experimental longMonthNames
			*/
			longMonthNames : Lyte.attr( 'array', { 
				'default': [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December' 
				]
			} ),	
			ltPropStartDateObject : Lyte.attr( "object" ),
			ltPropEndDateObject : Lyte.attr("object"),
		   /**
			* @componentProperty {dateString} ltPropStartDate=''
			* @depends ltPropDateRangePicker.format
			* @version 1.0.5
			* @output
			* @input
			* @condition ltPropOptions.customRange =! false
			*/
			ltPropStartDate : Lyte.attr( "string", { "default" : default_values.startDate || "", input : true, output : true } ),
		   /**
			* @componentProperty {dateString} ltPropEndDate=''
			* @depends ltPropDateRangePicker.format
			* @version 1.0.5
			* @output
			* @input
			* @condition ltPropOptions.customRange =! false
			*/
			ltPropEndDate : Lyte.attr( "string", { "default" : default_values.endDate || "", input : true, output : true } ),
		   /**
			* @componentProperty {dateString} ltPropCurrentDate=''
			* @depends ltPropCalendar.format
			* @version 1.0.5
			* @output
			* @input
			* @condition ltPropOptions.specificDate =! false
			*/
			ltPropCurrentDate : Lyte.attr( "string", { "default" : default_values.currentDate || "", input : true, output : true } ),
		   /**
			* @componentProperty {boolean} ltPropCalendarYield=false
			* @version 1.0.5
			* @condition ltPropOptions.specificDate =! false
			* @or
			* @condition ltPropOptions.before =! false
			* @or
			* @condition ltPropOptions.after =! false
			* @input
			*/
			ltPropCalendarYield : Lyte.attr( 'boolean', { default : default_values.calendarYield || false, input : true } ),
			/**
			 * @typedef {object} dateselectcalendar
			 * @default {"monthHeaderFormat":"MMMM YYYY"}
			 * @property {
			 	* MM/DD/YYYY |
				* YYYY/MM/DD |
				* MMM/DD/YYYY |
				* MMM/YYYY/DD |
				* DD/MMM/YYYY |
				* YYYY/MMM/DD |
				* DD/YYYY/MMM |
				* YYYY/DD/MMM |
				* MMMM/DD/YYYY |
				* MMMM/YYYY/DD |
				* DD/YYYY/MMMM |
				* YYYY/DD/MMMM |
				* DD/MMMM/YYYY |
				* YYYY/MMMM/DD
				* } format=MM/DD/YYYY
			 * @property {dateString} minDate
			 * @depends ltPropCalendar.format
			 * @property {dateString} maxDate
			 * @depends ltPropCalendar.format
			 * @propery {number} startWeekDay=1
			 * @property {boolean} fillRows=false
			 * @property {default|dropdown} headerType=dropdown
			 * @property {boolean} year=false
			 * @condition ltPropCalendar.headerType default
			 */
			
		   /**
			* @componentProperty {dateselectcalendar} ltPropCalendar
			* @default {"headerType":"dropdown","fillRows":false}
			* @version 1.0.5
			* @input
			* @condition ltPropOptions.specificDate =! false
			* @or
			* @condition ltPropOptions.before =! false
			* @or
			* @condition ltPropOptions.after =! false
			*/
			ltPropCalendar : Lyte.attr( 'object', { default : default_values.calendar || { headerType : "dropdown", fillRows : false }, input : true } ),

			/**
			 * @typedef {object} dateselectdateRangePicker
			 * @property {string} currentDate
			  * @property {
			 	* MM/DD/YYYY |
				* YYYY/MM/DD |
				* MMM/DD/YYYY |
				* MMM/YYYY/DD |
				* DD/MMM/YYYY |
				* YYYY/MMM/DD |
				* DD/YYYY/MMM |
				* YYYY/DD/MMM |
				* MMMM/DD/YYYY |
				* MMMM/YYYY/DD |
				* DD/YYYY/MMMM |
				* YYYY/DD/MMMM |
				* DD/MMMM/YYYY |
				* YYYY/MMMM/DD
				* } format=MM/DD/YYYY
			 * @property { 'MMMM YYYY' | 'MMM YYYY' } monthHeaderFormat 
			 * @default MMMM YYYY
			 * @property {number} startYear=1900
			 * @minValue 1
			 * @property {number} endYear=2100
			 * @minValue 1
			 * @property {array} disabledDates
			 * @property {dateString} minDate
			 * @depends ltPropDateRangePicker.format
			 * @property {dateString} maxDate
			 * @depends ltPropDateRangePicker.format
			 * @property {continuous|separate} selectionType=continuous
			 * @property {left|right} position=left
			 * @property {default|dropdown} headerType=dropdown
			 * @property {boolean} fillRows=false
			 * @property {boolean} year=false
			 * @condition ltPropDateRangePicker.headerType default
			 */
			
		   /**
			* @componentProperty {dateselectdateRangePicker} ltPropDateRangePicker
			* @version 1.0.5
			* @input
			* @condition ltPropOptions.customRange =! false
			*/
			ltPropDateRangePicker : Lyte.attr( 'object', { default : default_values.dateRangePicker || { monthHeaderFormat : "MMMM YYYY" }, input : true } ),
		   /**
			* @componentProperty {boolean} ltPropItemYield=false
			* @version 1.0.5
			* @input
			*/
			ltPropItemYield : Lyte.attr( 'boolean', { default : default_values.itemYield || false, input : true } ),

			// dateselect props
		   /**
			* @componentProperty {string} ltPropSelected=today
			* @version 1.0.5
			* @output
			* @input
			*/
			ltPropSelected : Lyte.attr('string', { default : default_values.selected || 'today', input : true, output : true }),
		   /**
		    * @typedef {object} dateSelectOptions
		    * @property {boolean} today=true
		    * @property {boolean} yesterday=true
		    * @property {boolean} last7days=true
		    * @property {boolean} last30days=true
		    * @property {boolean} thisWeek=true
		    * @property {boolean} thisMonth=true
		    * @property {boolean} specificDate=true
		    * @property {boolean} customRange=true
			* @property {boolean} before=false
			* @property {boolean} after=false
		    */
		   /**
			* @componentProperty {dateSelectOptions} ltPropOptions
			* @version 1.0.5
			* @input
			*/
			ltPropOptions : Lyte.attr( 'object', { default : default_values.options || {
				today :  true,
				yesterday : true,
				last7days : true,
				last30days : true,
				thisWeek : true,
				thisMonth : true,
				specificDate : true,
				customRange : true
			}, input : true } ),
		//    /**
		// 	* @componentProperty {string} ltPropDropdownWrapperClass=''
		// 	* @version 1.0.5
		// 	* @input
		// 	*/
			ltPropDropdownWrapperClass : Lyte.attr( 'string', { default : default_values.dropdownWrapperClass || '' } ),

			/**
			 * @typedef {object} dateselectboundary
			 * @property {number} top
			 * @property {number} bottom	
			 * @property {number} left
			 * @property {number} right
			 */

			/**
			 * @typedef {object} dateselecttooltipConfig
			 * @property {left | right | top | bottom | topright | bottomright | topleft | bottomleft | followcursor} position=bottom
			 * @property {box | callout} appearance=callout
			 * @condition ltPropTooltipConfig.position =! followcursor
			 * @property {number} margin=0
			 * @maxValue 20
			 * @property {number} showdelay=0
			 * @property {number} hidedelay=0
			 * @property {number} maxdisplaytime=5000
			 * @property {boolean} keeptooltip=false
			 * @property {boolean} hideOnClick=true
			 */

			/**
			 * @typedef {object} dateselectdropdown
			 * @property {number} tabindex=0
			 * @property {up|down|left|right} position=down
			 * @property {boolean} callout=false
			 * @property {string} placeholder=''
			 * @condition ltPropButtonYield false
			 * @property {boolean} disabled=false
			 * @property {boolean} hover=false
			 * @property {dateselectboundary} boundary
			 * @property {boolean} fixPositionOnOpen=false
			 * @property {dateselecttooltipConfig} tooltipConfig
			 */
			
		   /**
			* @componentProperty {dateselectdropdown} ltPropDropdown
			* @default {}
			* @version 1.0.5
			* @input
			*/
			ltPropDropdown : Lyte.attr( 'object', { default : default_values.dropdown || {}, input : true } ),
		   /**
			* @componentProperty {string} ltPropDisplayValue=''
			* @version 1.0.5
			* @input
			*/
			ltPropDisplayValue : Lyte.attr( 'string', { default : default_values.displayValue || '', input : true } ),
		   /**
			* @componentProperty {boolean} ltPropButtonYield=false
			* @version 1.0.5
			* @input
			*/
			ltPropButtonYield : Lyte.attr( 'boolean', { default : default_values.buttonYield || false, input : true } ),
		//    /**
		// 	* @componentProperty {string} ltPropCalendarWrapperClass=''
		// 	* @version 1.0.5
		// 	* @input
		// 	* @condition ltPropOptions.specificDate =! false
		// 	* @or
		// 	* @condition ltPropOptions.customRange =! false
		// 	* @or
		// 	* @condition ltPropOptions.before =! false
		// 	* @or
		// 	* @condition ltPropOptions.after =! false
		// 	*/
			ltPropCalendarWrapperClass : Lyte.attr( 'string', { default : default_values.calendarWrapperClass || '' } ),
		   /**
			* @componentProperty {boolean} ltPropFooterYield=false
			* @version 3.10.0
			* @input
			* @condition ltPropOptions.specificDate =! false
			* @or
			* @condition ltPropOptions.customRange =! false
			* @or
			* @condition ltPropOptions.before =! false
			* @or
			* @condition ltPropOptions.after =! false
			*/
			ltPropFooterYield : Lyte.attr( 'boolean', { default : default_values.footerYield || false, input : true } ),
		   /**
			* @componentProperty {boolean} ltPropI18n=false
			* @version 3.10.0
			* @input
			*/
			ltPropI18n : Lyte.attr( 'boolean', { default : default_values.i18n || false, input : true } ),
		   /**
		    * @typedef dateselectanimeDef
		    * @property {Fade|Scale|Slide} dropdown=Fade
		    * @property {Fade|Scale|Slide} calendar=Fade
		    */

		   /**
			* @componentProperty {dateselectanimeDef} ltPropAnimation
			* @version 3.14.0
			* @input
			*/
			ltPropAnimation : Lyte.attr( 'object', { default : default_values.animation || {
				dropdown : "Fade", // Scale, Slide
				calendar : "Fade"
			}, input : true } ),
			ltPropNavigation : Lyte.attr( 'boolean', { default : default_values.navigation || false, input : true } ),
		   /**
			* @componentProperty {dateString} ltPropBeforeCurrentDate=''
			* @version 3.96.0
			* @input
			* @output
			* @condition ltPropOptions.before =! false
			* @depends ltPropCalendar.format
			*/
			ltPropBeforeCurrentDate : Lyte.attr('string', { default : default_values.beforeCurrentDate || '', input : true, output : true } ),
			/**
			* @componentProperty {dateString} ltPropAfterCurrentDate=''
			* @version 3.96.0
			* @input
			* @output
			* @condition ltPropOptions.after =! false
			* @depends ltPropCalendar.format
			*/
			ltPropAfterCurrentDate : Lyte.attr('string', { default : default_values.afterCurrentDate || '', input : true, output : true } ),

			// for performance optimization
			ltPropLazyRendering : Lyte.attr( 'boolean', { default : default_values.lazyRendering || false, input : true } ),
			

			// system data

		   /**
			* @experimental pos
			*/
			pos : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @experimental prevSel
			*/
			prevSel : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @experimental opend
			*/
			opend : Lyte.attr( 'boolean',  { default : false } ),

			randomId : Lyte.attr( 'string', { default : "lyteDateSelect_" + parseInt( Math.random() * 1e6 ) } ),

			dateSelected : Lyte.attr( 'boolean', { default : false } ),

			calNavigation : Lyte.attr( 'boolean', { default : false } ),
			rangeNavigation : Lyte.attr( 'boolean', { default : false } ),
			beforeNavigation : Lyte.attr( 'boolean', { default : false } ),

			preventKeydown : Lyte.attr( 'boolean' ),
			bfrAftrCurrentDate : Lyte.attr('string'),
			itemMap : Lyte.attr( 'object', { default : { 
				before : 'lyteDsBeforeCal',
				after : 'lyteDsBeforeCal'
			 } } ),

			 renderCalendar : Lyte.attr( 'boolean', { default : true } ),
			 renderRangePicker : Lyte.attr( 'boolean', { default : true } ),
			 renderBefore : Lyte.attr( 'boolean', { default : true } ),

			 preventNavigation : Lyte.attr( 'boolean', { default : false } ),
			 popupMap : Lyte.attr( 'object', { default : {
				specificDate : true,
				customRange : true,
				before : true,
				after : true
			 }}),
			 expanded : Lyte.attr( 'string', { default : "false" } )

		}		
	},

	selectValue : function( dat ){
		// if( !this.data.ltPropButtonYield ){
			// var val = this.data.ltPropOptions[ dat ];
			// var oriDisp = val.constructor == Boolean ? _lyteUiUtils.i18n( dat ) : val;
			this.setData( 'ltPropDisplayValue', this.getVal( dat ) )
		// }
	},

	didConnect : function(){
		this._drop = this.$node.querySelector( 'lyte-dropdown' );
		this._drop.parent = this.$node;
		
		var com = this._drop.component,
		data = this.data;

		this._cmp = com.childComp ? com.childComp : this._drop.querySelector( 'lyte-drop-box' )
		this._end = this.tranEnd.bind( this );
		this._indend = this.tranEnd1.bind( this );

		this._opentrans = this.opentrans.bind( this );

		this._caldiv = this.$node.querySelector( '.dateSelectcal' ) 
		_lyteUiUtils.appendChild( document.body, this._caldiv );
		this.checkCurrentDate();
		// if( !data.ltPropButtonYield ){
			this.setData( 'ltPropDisplayValue', this.getVal( data.ltPropSelected ) )
		// }
		if( !document._dateselectResize ){
			document._dateselectResize = true;

			[ 'resize', 'orientationchange' ].forEach( function( item ){
				window.addEventListener( item, dtslctscroll );
			});

			if( _lyteUiUtils.isWidget ){
				_lyteUiUtils.addGlobalEventListener( 'scroll', dtslctscroll );
			} else {
				window.addEventListener( 'scroll', dtslctscroll );
			}
		}
		/**
		 * @utility toggle
		 * @author Pon karthikeyan T <ponkarthikeyan.t@zohocorp.com>
		 * @version 1.0.5
		 * @param { object } event
		 * @param { string } eventType
		 */
		this.$node.toggle = function( ev, tp ){
			this._drop.toggle( ev, tp )
		}.bind( this );

		this._drop.updateButtonAria( 'aria-labelledby', data.randomId );

		/**
		 * This method is called after the dateselect is rendered.
		 * @method afterRender
		 * @author ponkarthikeyan.t@zohocorp.com
		 * @version 1.0.5
		 * @param { object } dateselectElement
		 */

		this.getMethods( 'afterRender' ) && this.executeMethod( 'afterRender', this.$node );

		$L.fastdom.measure( function(){
			this._dir = _lyteUiUtils.getRTL();
			if( this._dir ) {
				$L.fastdom.mutate( function(){
						this._caldiv.classList.add( 'lyteRTL' )
				}.bind( this ) )
			}
		}.bind( this ) )
	},

	didDestroy : function(){
		// document.body.removeChild( this._caldiv );
		this._caldiv.remove();
		if( document._dateselectResize && document.querySelectorAll( 'lyte-dateselect' ).length == 0 ){
			delete document._dateselectResize;
			[ 'resize', 'orientationchange' ].forEach( function( item ){
				window.removeEventListener( item, dtslctscroll );
			});

			if( _lyteUiUtils.isWidget ){
				_lyteUiUtils.removeGlobalEventListener( 'scroll', dtslctscroll );
			} else {
				window.removeEventListener( 'scroll', dtslctscroll );
			}
		}
		delete this._caldiv; delete this._cmp; delete this._drop; delete this.$node.toggle;
	},

	getVal : function( sel ){
		if( !sel ){
			return "";
		}
		var val = this.data.ltPropOptions[ sel ];
		
		if( !val ){
			return;
		}

		var oridisp = val.constructor == Boolean ? _lyteUiUtils.i18n( sel ) :  val ;
 		if( [ 'specificDate', 'customRange', 'before', 'after' ].indexOf( sel ) == -1 ){
			return oridisp;
		} else if( sel == 'specificDate' ){
			return this.i18_date( this.data.ltPropCurrentDate, this.data.ltPropCalendar.format || "MM/DD/YYYY" ) || oridisp;
		} else if( sel == 'customRange' ) {
			var format = this.data.ltPropDateRangePicker.format || "MM/DD/YYYY",
			s = this.i18_date( this.data.ltPropStartDate, format ), e = this.i18_date( this.data.ltPropEndDate, format );
			return ( s && e ) ? ( s + ' - ' + e ): oridisp;
		}else if( sel == 'before' ){
			let date = (this.i18_date( this.data.ltPropBeforeCurrentDate, this.data.ltPropCalendar.format || "MM/DD/YYYY" )) ;
			return date ? ( val.constructor == Boolean ? _lyteUiUtils.i18n('before') : oridisp ) + " - " + date : oridisp;
		}else if( sel == 'after' ){
			let date = (this.i18_date( this.data.ltPropAfterCurrentDate, this.data.ltPropCalendar.format || "MM/DD/YYYY" ));
			return date ? ( val.constructor == Boolean ? _lyteUiUtils.i18n('after') : oridisp ) + " - " + date : oridisp;
		}
		// return _lyteUiUtils.i18n( s );
	},

	resolveConflicts: function( format ) {
		var match = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/.exec( format ),
		index = ( match || {} ).index,
		matchLength = ( match || [] )[ 0 ].length || 0;

		if( !isNaN( index ) ) {
			return format.substring( 0, index + matchLength ) + ( format.substring( index + matchLength ) || '' ).toUpperCase();
		}

		return format.toUpperCase();
	},

	isConflictingFormat: function( format ) {
		var rdate = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/ig,
		match = format.match( rdate ) || [];

		return match.length > 1;
	},

	getRelevantFormat: function( format ) {

		if( this.isConflictingFormat( format ) ) {
			return this.resolveConflicts( format );
		}

		return format.toUpperCase();
	},

	i18_date : function( date, format ){

		format = this.getRelevantFormat( format );

		if( date && $L.moment && this.data.ltPropI18n ){
			var cb = function( value, converted, format ){
				if( this.getMethods( 'onI18n' ) ){
					/**
					 * This method is called when the date is converted to i18n format.
					 * @method onI18n
					 * @author ponkarthikeyan.t@zohocorp.com
					 * @version 3.10.0
					 * @param { string } value
					 * @param { string } converted
					 * @param { string } format
					 * @condition ltPropI18n true
					 */
					return this.executeMethod( 'onI18n', value, converted, format );
				}
				return converted;
			}.bind( this );
			return $L.moment( date, format ).i18N( format, cb );
		}
		return date;
	},

	selectedObs : function( arg ){

		this.hidedropdown();

		var __newvalue = arg.newValue;

		if( __newvalue && this._cmp && !this._cmp.classList.contains( 'lyteDropdownHidden' ) ) {
			 var oldAn = [ 'specificDate', 'customRange', 'before', 'after' ].indexOf( arg.oldValue ) != -1 ? this._caldiv.querySelector( '.' + this.getClass(arg.oldValue) ) : null,
			 newAn = [ 'specificDate', 'customRange', 'before', 'after' ].indexOf( arg.newValue ) != -1 ? this._caldiv.querySelector( '.' + this.getClass(__newvalue) ) : null;
			 if( newAn ) {
			 	if( oldAn ) {
			 		var prm = new Promise( function( res, rej ){
			 			this._new = res;
			 			this.hideele( oldAn );
			 		}.bind( this ) );
			 		Promise.resolve( prm ).then( function(){
			 			$L.fastdom.mutate( this.openele.bind( this ) );
			 		}.bind( this ))
			 	} else{
			 		this.openele()
			 	}
			 	this.data.prevSel = this.data.prevSel || arg.oldValue
			 }
		} else if( __newvalue && ( ( this._cmp && this._cmp.classList.contains( 'lyteDropdownHidden' ) ) || [ 'specificDate', 'customRange', "before", "after" ].indexOf( __newvalue ) != -1 ) ){
			this.selectValue( __newvalue );
		} else if( !__newvalue ){
			this.selectValue( "" );
			this.$node.ltProp({
				startDate : "",
				endDate : "",
				currentDate : ""
			});
		}

		this._callonchange = true;

		// this.resetValue();
	}.observes( 'ltPropSelected' ), 

	opentrans : function( evt ){
		$L( this._cmp ).removeClass( 'lyteDateselectAnimationHappening' );
		this._cmp.removeEventListener( 'transitionend', this._opentrans, true );
		delete this._drop.component._preventSetcss;

		this.setup_navigation();

		/**
		 * This method is called when the animation ends after the dropdown is opened.
		 * @method onAnimationEnd
		 * @author ponkarthikeyan.t@zohocorp.com
		 * @version 3.114.0
		 * @param { object } dateselectElement
		 */

		if( this.getMethods( 'onAnimationEnd' ) ){
			this.executeMethod( 'onAnimationEnd', this.$node );
		}
	},

	setup_navigation : function( elem ){
		var __data = this.data,
		__selected = __data.ltPropSelected;

		if( __data.ltPropNavigation ){
			var __prop;
			switch( __selected ){
				case "specificDate": {
					__prop = "calNavigation";
				}
				break;
				case "customRange": {
					__prop = "rangeNavigation";
				}
				break;
				case "before" :
				case "after" : {
					__prop = "beforeNavigation";
				}
				break;
			}
			if( __prop ){
				if( elem ){
					var options = __data.ltPropOptions,
					selected_query = typeof options[ __selected ] == "boolean" ? __selected : options[ __selected ];

					elem.setAttribute( 'aria-label', _lyteUiUtils.i18n( selected_query ) );
				}
				this.setData( __prop, true );
			}
		}
	},

	tranEnd : function( evt ){
		if( this._cmp ){
			this._cmp.removeEventListener( 'transitionend', this._end, true );
			$L( this._cmp ).removeClass( 'lyteDateselectAnimationHappening' ).css( this.getValue( 1, 'dropdown', this._cmp ) );
		}

		if( this._el ){
			this._el.classList.add( 'lyteDropdownHidden' );
			delete this._el;
		}
		if( this._res ){
			this._res( true );
			this._caldiv.classList.add( 'lyteDropdownHidden' );
			this.callRevert();
			delete this._res;
		}
		// this.hidedropdown();
	},

	tranEnd1 : function( evt ){
		if( this._el ){
			this._el.removeEventListener( 'transitionend', this._indend, true );
			$L( this._el ).removeClass( 'lyteDateselectAnimationHappening' );
			this._el.classList.add( 'lyteDropdownHidden' );
			delete this._el;
		}
		if( this._new ){
			this._new( true );
			delete this._new;
		}

		// this.hidedropdown();
	},

	hidedropdown : function(){
		var caldiv = this._caldiv;
		if( caldiv ){
			var dropdown = Array.from( caldiv.getElementsByTagName( 'lyte-dropdown' ) );

			dropdown.forEach( function( item ){
				item.close();
			});
		}
	},

	hideele : function( elem ){
		elem.addEventListener( 'transitionend', this._indend, true );
		$L( elem ).addClass( 'lyteDateselectAnimationHappening' );

		this._el = elem;
		
		if( this.data.ltPropAnimation.dropdown ){
			$L( elem ).css( this.getValue( 0, 'calendar', elem ) );
		} else{
			this._indend();
		}

		if( this.data.ltPropNavigation ){
			this.setData( 'preventNavigation', false );
		}

		if( elem.classList.contains( 'lyteDropdownHidden' ) ){
			this.tranEnd1();
		}
	},

	getValue : function( value, type, elem ){
		var animation = this.data.ltPropAnimation[ type ];

		if( animation == 'Fade' ){
			return {
				opacity : value
			}
		} else if( animation == 'Scale' ){
			return{
				transform : "scaleY(" + value + ')'
			}
		} else if(  animation == 'Slide' ){
			var obj = {
				height : value ? ( elem.__height ) : 0,
				transform : ""
			};

			if( $L( this._caldiv ).hasClass( 'lyteDateselectUp' ) ){
				// obj.transform = 'translateY(' + ( !value ? elem.__height : 0 ) + 'px)';

				// obj.transform = value ? '' : ( 'translateY(' + elem.__height + 'px)' );
			}

			return obj;
		}
		return {};
	},

	checkSelected : function(selected){
		if( selected === 'specificDate' ){
			return this.data.ltPropCurrentDate;
		}else if( selected === 'customRange' ){
			return this.data.ltPropStartDate;
		}else if( selected === 'before' ){
			return this.data.ltPropBeforeCurrentDate;
		}else if( selected === 'after' ){
			return this.data.ltPropAfterCurrentDate;
		}

		return true;
	},

	openele : function(){
		var sel = this.data.ltPropSelected,
		el,
		fn = function(){
			this.setCss();
			this.setup_navigation( el );
		}.bind( this ),
		map = {
			specificDate : 'Calendar',
			customRange : 'RangePicker',
			before : "Before",
			after : "Before"
		};

		this.checkCurrentDate();

		if( [ 'specificDate', 'customRange', 'before', 'after' ].indexOf( sel ) != -1 ) {
			var ns = "render" + map[ sel ],
			is_newly_rendered = !this.getData( ns );

			this.setData( ns, true );

			this._caldiv.classList.remove( 'lyteDropdownHidden' );
			el = this._caldiv.querySelector( '.' + this.getClass(sel) );
			
			if( is_newly_rendered && this.data.ltPropNavigation ){
				try{
					$L( el ).trapFocus();
				} catch( err ){}
			}
			
			el.classList.remove( 'lyteDropdownHidden' );

			if( this.data.ltPropAnimation.calendar == 'Slide' ){
				$L.fastdom.measure( function(){
					el.__height = this._caldiv.__height = el.children[ 0 ].getBoundingClientRect().height;
					$L.fastdom.mutate( function(){
						$L( el ).css( 'transitionDuration', '0s' ).css( this.getValue( 0, 'calendar', el ) );
						// $L.fastdom.measure( this.setCss.bind( this ) );
						setTimeout( function(){
							$L( el ).css( 'transitionDuration', '' );
							fn();
						}.bind( this ), 20 );
					}.bind( this ) );
				}.bind( this ));
			} else {
				$L( el ).css( this.getValue( 0, 'calendar', el ) );
				$L.fastdom.measure( fn );
			}

			this.data.ltPropNavigation && this.setData( 'preventNavigation', true );
		} else {
			this.setData( 'preventNavigation', false );
		}
	},

	animation_obs : function(){
		var animation = this.data.ltPropAnimation;
		
		$L( this._caldiv )
		.removeClass( 'lyteDateselectAnimate' )
		.addClass( animation.calendar != 'Fade' ? 'lyteDateselectAnimate' : '' )
		.css( {
			transform : "",
			opacity : ""
		} );

		$L( this._cmp )
		.removeClass( 'lyteDateselectAnimate' )
		.addClass( animation.dropdown != 'Fade' ? 'lyteDateselectAnimate' : '' )
		.css( {
			transform : "",
			opacity : ""
		} );

	}.observes( 'ltPropAnimation.{}', 'ltPropAnimation' ).on( 'didConnect' ),

	currentDateObs : function(){
		this.checkCurrentDate();
	}.observes( 'ltPropBeforeCurrentDate' , 'ltPropAfterCurrentDate' ),

	methods : {
		keepTickOnCalendarSelection: function( event, previousSelected, dropdown, item, currentSelected ) {
			var dropdown = this.$node.querySelector( 'lyte-dropdown' ),
			box = dropdown.getDropBox(),
			selectionTickRetainedItem = box.querySelector( '.lyteDateSelectPrevTempSelection' ),
			previousItem;

			/* If some item is made to retain the selection tick, don't change anything in dropdown since it has to retain it till the end of dropdown's open*/
			if( selectionTickRetainedItem ) {
				return ;
			}

			previousItem = dropdown.getItem( previousSelected );

			if( ( currentSelected === 'specificDate' || currentSelected === 'customRange' || currentSelected === 'before' || currentSelected === 'after' ) && previousItem && this.checkSelected(previousSelected)) {
				previousItem.classList.add( 'lyteDateSelectPrevTempSelection' );
			}
		},

		rangenavigate : function( cb ){

			var args = arguments;

			if( this.getMethods( cb ) ){
				this.executeMethod.apply( this, args );
			}

			if( this.data.ltPropAnimation.calendar == 'Slide' ){
				var datepicker = args[ 3 ].$node;
				$L.fastdom.measure( function(){
					var height = datepicker.getBoundingClientRect().height;
					$L.fastdom.mutate( function(){
						$L( datepicker.parentNode ).css( 'height', height );
					});
				});
			}
		},

		bfSw : function( arg1, arg2 ){
			var ret;

			this._caldiv && _lyteUiUtils.dispatchEvent( 'beforeshow', this.$node, { originalEvent: arg1, component : this.$node, wormhole : this._caldiv } );

			if( this.getMethods( 'onBeforeShow' ) ){
				ret = this.executeMethod( 'onBeforeShow', arg1, arg2 )
			}
			if( !this.data.opend && ret != false ) {
				this.setData( 'opend', true );
				return new Promise( function( res ){
					window.requestAnimationFrame( res );
				})
			}
			return ret;
		},
		sw : function( arg1, arg2 ){

			var __data = this.data;

			if( __data.ltPropDateRangePicker.maxDiff != void 0 ){
				this.__initial_start = __data.ltPropStartDate;
				this.__initial_end = __data.ltPropEndDate;
			}

			this._drop.component._preventSetcss = !this._drop.ltProp( 'freeze' );

			this.getMethods( 'onShow' ) && this.executeMethod( 'onShow', arg1, arg2 );

			var body = arg2.childComp;
			
			$L( body ).addClass( 'lyteDateselectAnimationHappening' ).css( 'transitionDuration', '0s' ).css( this.getValue( 0, 'dropdown', body ) );

			this.setData( 'preventKeydown', !this.data.ltPropNavigation );
			
			setTimeout( function(){ // request animation frame causes issue in ff
				$L( body ).css( 'transitionDuration', '' );
				this.openele();

				body.addEventListener( 'transitionend', this._opentrans, true );

				$L.fastdom.mutate( function(){
					$L( body ).css( this.getValue( 1, 'dropdown', body ) );	
				}.bind( this ) ); 
			}.bind( this ), 20 );
		},
	
		bfHde : function( arg1, arg2 ){

			delete this._callonchange;

			if( this._prevent || ( this._caldiv.contains( ( arg1 || {} ).target ) ) && ( arg1 || {} ).type == "click" ){
				delete this._prevent;
				return false;
			}

			var common_query = '.specificDate:not(.lyteDropdownHidden),.customRange:not(.lyteDropdownHidden),.lyteDsBeforeCal:not(.lyteDropdownHidden)';

			if( ( arg1 || {} ).type == "keydown" && this._caldiv.contains( arg1.target ) && this.data.ltPropNavigation ){
				var key = arg1.key;
				switch( key ){
					case 'Escape': {
						this.hidedropdown();
						this.hideele( this._caldiv.querySelector( common_query ) );
						this._drop.ltProp( 'focus', true );
						return false;
					}
					break;
					case "Tab" : {
						return !$L.prototype.trapFocus;
					}
					break;
				}
			}

			var ret;
			if( this.getMethods( 'onBeforeHide' ) ){
				ret = this.executeMethod( 'onBeforeHide', arg1, arg2 )
			}
			if( ret != false ){
				return new Promise( function( res, rej ){
					this._res = res;
					var animation = this.data.ltPropAnimation || {},
					el = this._caldiv.querySelector( common_query );

					this._el = el;

					// this.hidedropdown();

					if( animation.dropdown ){
						arg2.childComp.addEventListener( 'transitionend', this._end, true );
						$L( arg2.childComp ).addClass( 'lyteDateselectAnimationHappening' );
						if( el ) {
							$L( el ).css( this.getValue( 0, 'calendar', el ) );
						}
						$L( arg2.childComp ).css( this.getValue( 0, 'dropdown', arg2.childComp ) );
					} else{
						this._end();
					}
				}.bind( this ) )
			}
			return ret;
		},
		
		hde : function( arg1, arg ){
			var data = this.data,
			__rest = this._rest,
			__selected = data.ltPropSelected,
			fn = function(){
				var rangepicker = data.ltPropDateRangePicker,
				cal_div = this._caldiv;

				if( rangepicker.maxDiff != void 0 && cal_div ){
					var dom = cal_div.getElementsByTagName( 'lyte-daterangepicker' )[ 0 ],
					__comp = dom.component;

					__comp.__frm_init = true;

					dom.ltProp({
						startDate : data.ltPropStartDate || this.__initial_start || "",
						endDate : data.ltPropEndDate || this.__initial_end || "",
						minDate : rangepicker.minDate || "",
						maxDate : rangepicker.maxDate || ""
					});

					delete __comp.__frm_init;
				}
			}.bind( this );

			this.removeTempUnSelection();
			this.removeTempSelection();

			this.setData( 'preventKeydown', false );

			if( !__rest && data.prevSel ){
				this.setData( 'ltPropSelected', __selected = data.prevSel );
				// if( !this.data.ltPropButtonYield ){
					this.setData( 'ltPropDisplayValue', this.getVal( __selected ) );
				// }
			}else if( !__rest && !data.prevSel && /specificdate|customrange|before|after/i.test( __selected) ){

				let clr = function(){
					this.setData( 'ltPropSelected',  '' );
					this.setData( 'ltPropDisplayValue', '' );
				}.bind(this);
				
				if( __selected == 'specificData' && !data.ltPropCurrentDate ){
					clr();
				}else if( __selected == 'customRange' && !data.ltPropStartDate ){
					if( !this.__initial_end ){
						clr();
					}
				}else if( __selected == 'before' && !data.ltPropBeforeCurrentDate ){
					clr();
				}else if( __selected == 'after' && !data.ltPropAfterCurrentDate ){
					clr();
				}
			}else if( __rest && /customRange/i.test( __selected ) ){
				fn();
			}

			if( data.dateSelected ){
				this.setData( 'dateSelected', false );
				fn();
			}

			delete this._rest;
			delete this.__initial_start;
			delete this.__initial_end;
			data.prevSel = ''; 
			this.resetValue();
			if( data.ltPropAnimation.dropdown == 'Slide' ){
				$L( this._cmp ).css( 'height', '' );
			}

			this.data.ltPropNavigation && this.setData( 'expanded', "false" );

			this._caldiv && _lyteUiUtils.dispatchEvent( 'onhide', this.$node, { originalEvent: arg1, component : this.$node, wormhole : this._caldiv } );

			if( this.getMethods( 'onHide' ) ){
				return this.executeMethod( 'onHide', arg1, arg )
			}
			
		},
		dateselected : function( event ){
			this.selected( event, true )
		},

		dateselected1 : function( event , flag ){
			this.selected( event , void 0, flag )
		},

		optSel : function( evt, dat, com, itm ){
			this.removeTempUnSelection();

			if( [ 'specificDate', 'customRange', 'before', 'after' ].indexOf( dat ) != -1 ){
				!itm.classList.contains( 'lyteDateSelectPrevTempSelection' ) && itm.classList.add( 'lyteDateSelectTempSelection' );
				this._prevent = true;

				if( !this._callonchange && this._caldiv.querySelector( '.' + ( this.data.itemMap[ dat ] || dat ) ).classList.contains( 'lyteDropdownHidden' ) ){
					this.openele();
				}

				return;
			}
			this.selectValue( dat );
			/**
			 * This method is called when a option is selected.
			 * @method onSelect
			 * @author ponkarthikeyan.t@zohocorp.com
			 * @version 3.40.0
			 * @param { object } event
			 * @param { object } dateselectElement
			 * @param { string } selectedValue
			 * @param { object | string } selectedItemElementOrStartDate
			 * @param { string } endDate
			 */
			this.getMethods('onSelect') && this.executeMethod( 'onSelect', evt, this.$node, dat, itm );

			if( this._callonchange ){
				var cb = "onChange";

				/**
				 * This method is called when the current selected value is changed.
				 * @method onChange
				 * @author ponkarthikeyan.t@zohocorp.com
				 * @version 3.40.0
				 * @param { object } event
				 * @param { object } dateselectElement
				 * @param { string } selectedValue
				 * @param { object } selectedItemElement
				 */

				this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node, dat, itm );
			}

			this._rest = true;
		},
		posChange : function( pos ){
			var addClass = 'removeClass'
			if( /up/i.test( pos ) ){
				addClass = 'addClass';
			}
			$L( this._cmp )[ addClass ]( 'lyteDateselectUp' );
			$L( this._caldiv )[ addClass ]( 'lyteDateselectUp' );
		},

		startChange : function( arg ){
			var cb = 'onStartDateChanged';

			if( this.getMethods( cb ) ){
				this.executeMethod( cb, arg );
			}
		}
	},

	resetValue : function(){
		if( this.data.ltPropSelected != 'specificDate' ) {
			this.setData( 'ltPropCurrentDate', '' );
		}
		if( this.data.ltPropSelected != 'customRange' ){
			this.setData( 'ltPropStartDate', '' );
			this.setData( 'ltPropEndDate', '' );
		}

		if( this.data.ltPropSelected != 'before' ){
			this.setData( 'ltPropBeforeCurrentDate', '' );
		}
		if( this.data.ltPropSelected != 'after' ){
			this.setData( 'ltPropAfterCurrentDate', '' );
		}
	},

	callRevert : function(){
		var selected = this.data.ltPropSelected,
		calendar = this._caldiv.querySelector( '.specificDate lyte-calendar' ),
		daterange = this._caldiv.querySelector( '.customRange lyte-daterangepicker' ),
		before_after = this._caldiv.querySelector( '.lyteDsBeforeCal lyte-calendar' ),
		__selected,
		__today1,
		__today2;

		switch( selected ){
			case 'specificDate' : {
				__selected = calendar;
				__today1 = daterange;
				__today2 = before_after;
			}
			break;
			case 'customRange' : {
				__selected = daterange;
				__today1 = calendar;
				__today2 = before_after;
			}
			break;
			case "before" :
			case "after" : {
				__selected = before_after;
				__today1 = calendar;
				__today2 = daterange;
			}
			break;
		}

		__selected && __selected.revertToSelected();
		__today1 && __today1.revertToToday();
		__today2 && __today2.revertToToday();
	},

	setCss : function( obj ) {
		function rtlfunc( lft, bcr, ww ){
			if( this._dir ) {
				if( bcr ) {
					if( lft == 'right' ) {
						return ww - bcr.left;
					}
					return ww - bcr.right;
				} else if( lft == 'left' ) {
					return 'right';
				} 
			}
			return bcr ? bcr[ lft ] : 'left';
		}
		var y = window.pageYOffset || document.documentElement.scrollTop,
		body = this._caldiv, par = this._cmp,
		bbcr = body.getBoundingClientRect(),
		bcr = { left : bbcr.left, right : bbcr.right, width : bbcr.width, height : body.__height || bbcr.height }, 
		__bcr = par.getBoundingClientRect(),
		parcr = { left : __bcr.left, right : __bcr.right, width : __bcr.width, height : par.__height, top : parseFloat( par.style.top ) - y, bottom : parseFloat( par.style.top ) - y + par.__height },
		wwidth = window.innerWidth,
		x = ( window.pageXOffset || document.documentElement.scrollLeft ) * ( this._dir ? - 1: 1 ),
		selEl = par.querySelector( 'lyte-drop-item[selected = "true"]' ),
		__selBcr = selEl.getBoundingClientRect(),
		selBcr = { bottom : __selBcr.bottom - ( __bcr.top - parcr.top ) },
		arrow = selEl.querySelector( '.dateArrow' ),
		arbcr = arrow ? arrow.getBoundingClientRect() : { width : 0 },

		newLeft = rtlfunc.call( this, 'left', parcr, wwidth ) + parcr.width + arbcr.width / 2 + x,
		rgtLft = rtlfunc.call( this, 'left', parcr, wwidth ) - arbcr.width / 2 - bcr.width + x,
		newTop = par.style.top,
		newBottom = par.style.bottom,
		pos;

		if( parseFloat( newTop ) + bcr.height < selBcr.bottom + y ){
			newTop = ( y + selBcr.bottom - bcr.height ) + 'px';
		}
		if( newLeft + bcr.width < wwidth + x ) {
			pos = 'right';
		} else {
			if( rgtLft > x ){
				newLeft = rgtLft;
				pos = 'left';
			} else {
				if( wwidth - rtlfunc.call( this, 'right', parcr, wwidth ) > rtlfunc.call( this, 'left', parcr, wwidth ) ){
					pos = 'right'
				} else {
					newLeft = rgtLft;
					pos = 'left'
				}
			}
		}
		$L.fastdom.mutate( function(){
			body.style[ rtlfunc.call( this, 'left' ) ] = newLeft + 'px';
			body.style.top = newTop;
			body.style.bottom = newBottom;
			var elem = this._caldiv.getElementsByClassName( this.getClass(this.data.ltPropSelected) )[ 0 ];
			if( elem ){
				$L( elem ).css( this.getValue( 1, 'calendar', elem ) );
			}
			this.setData( 'pos', pos );
			
			if( this.data.ltPropNavigation ){
				this.setData( 'expanded', "false" );
				selEl.setAttribute( 'aria-expanded', 'true' );
				this._drop.highlightItem( selEl );
			}
		}.bind( this ))
	},

	selected : function( evt, flag, flag1 ){

		var data = this.data,
			selected = this.data.ltPropSelected;

		// this.removeTempUnSelection();
		this.checkCurrentDate(true);

		// if( !data.ltPropButtonYield ){
			this.setData( 'ltPropDisplayValue', this.getVal( data.ltPropSelected ) );
		// }

		var cb = 'onSelect',
		cb1 = 'onChange',
		args = [ cb, evt, this.$node ]

		if(flag1 === true){
			if( selected == 'before' ){
				args.push( 'before', data.bfrAftrCurrentDate );
			}else if( selected == 'after' ){
				args.push( 'after', data.bfrAftrCurrentDate );
			}
		}else if( flag ){
			args.push( "customRange", data.ltPropStartDate, data.ltPropEndDate );
		} else{
			args.push( 'specificDate', data.ltPropCurrentDate );
		}

		if( selected == 'before' ){
			this.setData( "ltPropBeforeCurrentDate" , this.data.bfrAftrCurrentDate );
		}

		if( selected == 'after' ){
			this.setData( "ltPropAfterCurrentDate" , this.data.bfrAftrCurrentDate );
		}

		if( this.getMethods( cb ) ){
			this.executeMethod.apply( this, args ); 
		}

		if( this._callonchange  && this.getMethods( cb1 ) ){
			args.shift();
			args.unshift( cb1 );
			this.executeMethod.apply( this, args );
		}

		this._rest = true
		this._drop.toggle()
	},

	getClass : function( className ){
		let classMap = this.data.itemMap;

		return classMap.hasOwnProperty( className ) ? classMap[ className ] : className;
	},

	checkCurrentDate : function(flag){
		var selected = this.data.ltPropSelected;

		if( flag ){
			selected == 'before' && this.setData( 'ltPropBeforeCurrentDate' , this.data.bfrAftrCurrentDate );
			selected == 'after' && this.setData( 'ltPropAfterCurrentDate' , this.data.bfrAftrCurrentDate );
		}else{
			this.setData( 'bfrAftrCurrentDate', 
						   selected =='before' ? this.data.ltPropBeforeCurrentDate : 
						   selected == 'after' ? this.data.ltPropAfterCurrentDate : '' );
		}

		
	},

	calendar_obs : function( arg ){
		this._callonchange = true;
	}.observes( 'ltPropStartDate', 'ltPropEndDate', 'ltPropCurrentDate' )

});

function dtslctscroll( evt ){
	if( evt && evt.type == 'resize' && _lyteUiUtils.isMobile ) {
		return;
	}
	var drops = document.querySelectorAll( 'lyte-drop-box:not(.lyteDropdownHidden)' )
	for( var i = 0; i < drops.length; i++ ){
		var opendrop = drops[ i ];
		if( opendrop && opendrop.origindd && opendrop.origindd.parent ){
			var cmp = opendrop.origindd.parent.component;
			evt.type == "orientationchange" ?  setTimeout( cmp.setCss.bind( cmp ), 500 ) : $L.fastdom.measure( cmp.setCss.bind( cmp ) );
		}
	}
}

Lyte.Component.registerHelper("changeClass",function( className, _this ){
	let data = [ 'customRange', 'specificDate', 'before', 'after' ];

	if( data.indexOf( className ) != -1 ){
		return (['before', 'after'].indexOf( className ) != -1 ? 'lyteDs' + className.charAt(0).toUpperCase() + className.slice(1) : className ) + " lyteDS_SecondaryOptItem";
	}else{
		return className;
	}
				
	
});
/**
 * @syntax nonYielded
 * <lyte-dateselect></lyte-dateselect>
 */

/**
 * @syntax Button Yield
 * @attribute ltPropButtonYield=true
 * <lyte-dateselect lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Item yield
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-item-yield = true>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Calendar yield
 * @attribute ltPropCalendarYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Footer and item yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-item-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Footer and button yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropButtonYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Button, item and calendar yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropButtonYield=true
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-item-yield = true lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */
