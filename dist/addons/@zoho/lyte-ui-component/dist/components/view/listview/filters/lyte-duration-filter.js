Lyte.Component.register("lyte-duration-filter", {
_template:"<template tag-name=\"lyte-duration-filter\"> <lyte-dropdown lt-prop-selected=\"{{lbind(selected)}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteTimeFilterDropdown\"> <lyte-drop-body> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\">{{value}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"lyteTimeFilterWrapper\"> <template is=\"if\" value=\"{{renderFirst}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"number\" lt-prop=\"{{stringify(ltPropFilterElementProperties.duration)}}\" lt-prop-appearance=\"box\" class=\"lyteTimeFilterFirst\" lt-prop-input-wrapper-class=\"{{hideFirst}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-value=\"{{lbind(first)}}\" lt-prop-bind-to-body=\"false\"></lyte-input> </template></template><template is=\"if\" value=\"{{renderSecond}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"number\" lt-prop=\"{{stringify(ltPropFilterElementProperties.duration)}}\" lt-prop-appearance=\"box\" class=\"lyteTimeFilterSecond\" lt-prop-input-wrapper-class=\"{{hideSecond}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-value=\"{{lbind(second)}}\" lt-prop-bind-to-body=\"false\"></lyte-input> </template></template><template is=\"if\" value=\"{{display}}\"><template case=\"true\"> <div class=\"lyteTimeFilterDisabledElement\">{{display}}</div> </template></template><template is=\"if\" value=\"{{showUnit}}\"><template case=\"true\"> <lyte-dropdown class=\"lyteDurationFilterUnitDropdown\" lt-prop-selected=\"{{lbind(ltPropDropdownSelected)}}\" lt-prop=\"{{stringify(ltPropDropdown)}}\"></lyte-dropdown> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"forIn","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,2]},{"type":"if","position":[3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,4]},{"type":"if","position":[3,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropCondition","ltPropTempSelected","ltPropPlaceholder","ltPropOptions","ltPropFormat","ltPropNoMatch","ltPropDropdownSelected","ltPropSearchCount","ltPropReset","ltPropUnits","ltPropDropdown","selected","renderFirst","renderSecond","display","noResult","isSearch","first","second","isNeg","hideFirst","hideSecond","unit","showUnit"],
_observedAttributesType :[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],


	init : function(){
		var __data = this.data;
		__data.hideFirst = __data.hideSecond = 'lyteSearchHidden';

		if(_lyteUiUtils.lyteUiIsEmpty(__data.ltPropCondition)){
			this.setData( 'ltPropCondition', { input : "", start : -Infinity, end : Infinity, isNeg : false, isValid : false, value : "", label : "", type : "duration" } );
		}else{
			this.updateInitialConditions();
		}
	},

	didConnect : function(){
		if( this.getMethods( 'onFilterConstruct' ) ){
			this.executeMethod( 'onFilterConstruct', this.data.ltPropCondition, this.data.ltPropOptions, this.$node );
		}
	},

	updateInitialConditions : function(){

		let condition = this.data.ltPropCondition;

		this.setData( 'ltPropTempCondition', condition );
		this.setData( 'selected', condition.value );
		
		if( this.data.renderFirst ){ this.setData( 'first', condition.start ) }
		if( this.data.renderSecond ){ this.setData( 'second', condition.end ) }
		
	},

	condn_obs : function( arg ){
		this.setData( 'selected', arg.newValue.value || "" );
	}.observes( 'ltPropCondition' ),

	data : function(){
		var __string = "string",
		__array = "array",
		__object = "object",
		__boolean = "boolean",
		__number = 'number';

		return {
			ltPropCondition : Lyte.attr( __object ),
			ltPropTempSelected : Lyte.attr( __object ),
			ltPropPlaceholder : Lyte.attr( __string, { default : "None" } ),
			ltPropOptions : Lyte.attr( __object, { default : {
				equal : _lyteUiUtils.i18n( "equal", "listview.filter", "Equal" ),
				not_equal : _lyteUiUtils.i18n( "not.equal", "listview.filter", "Not equal" ),
				between : _lyteUiUtils.i18n( "between", "listview.filter", "Between" ),
				less_than : _lyteUiUtils.i18n( 'less.than', 'listview.filter', "Less than" ),
				greater_than : _lyteUiUtils.i18n( 'greater.than', 'listview.filter', "Greater than" )
			} } ),

			ltPropFormat : Lyte.attr( __string, { default : "MM-DD-YYYY" } ),
			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),
			ltPropDropdownSelected : Lyte.attr( __string, { default : "seconds" } ),
			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),

			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			ltPropUnits : Lyte.attr( __array, { default : [ "seconds", "minutes", "hours", "days", "weeks", "months", "years" ] } ),
			ltPropDropdown : Lyte.attr( __object, { default : { 
				options : [
						{ name : 'seconds', value : 'Seconds' },
						{ name : 'minutes', value : 'Minutes' },
						{ name : 'hours', value : 'Hours' },
						{ name : 'days', value : 'Days' },
						{ name : 'weeks', value : 'Weeks' },
						{ name : 'months', value : 'Months' },
						{ name : 'years', value : 'Years' }
					],
				selected : 'seconds',
				placeholder : 'Select Unit',
				userValue : 'value',
				systemValue : 'name'
		 }} ),

			selected : Lyte.attr( __string, { default : "" } ),
			renderFirst : Lyte.attr( __boolean ),
			renderSecond : Lyte.attr( __boolean ),
			display : Lyte.attr( __string ),
			noResult : Lyte.attr( __boolean ),

			isSearch : Lyte.attr( __boolean ),

			first : Lyte.attr( __string, { default : "" } ),
			second : Lyte.attr( __string, { default : "" } ),
			isNeg : Lyte.attr( __boolean, { default : false } ),
			hideFirst : Lyte.attr( __string ),
			hideSecond : Lyte.attr( __string ),
			unit : Lyte.attr( __string ),
			showUnit : Lyte.attr( __boolean )
		}		
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			this.setData( arg.item, false );
			this.setData( 'selected', "" );
		}
	}.observes( 'ltPropReset' ),

	selected_obs : function( arg ){
		var selected = arg.newValue,
		renderFirst = false,
		renderSecond = false,
		showUnit = false,
		isNeg = false,
		display = selected ? "${" + selected.toUpperCase() + "}" : "",
		__data = this.data,
		hiddenclass = 'lyteSearchHidden',
		condition = __data.ltPropTempCondition,
		Lc = Lyte.objectUtils,
		ns = "lyteDurationFilter_";

		$L( this.$node ).addClass( ns + selected ).removeClass( ns + arg.oldValue );

		switch( selected ){
			case 'equal' : {
				renderFirst = true;
				display = "";
				showUnit = true;
			}
			break;
			case 'not_equal' : {
				renderFirst = true;
				isNeg = true;
				display = "";
				showUnit = true;
			}
			break;
			case 'greater_than' : {
				renderFirst = true;
				display = "";
				showUnit = true;
			}
			break;
			case 'less_than' : {
				renderFirst = true;
				display = "";
				showUnit = true;
			}
			break;
			case 'between' : {
				renderFirst = renderSecond = true;
				display = "";
				showUnit = true;
			}
			break;
		}

		Lc( condition, 'add', 'start', '' );
		Lc( condition, 'add', 'end', '' );
		Lc( condition, 'add', 'isValid', false );
		Lc( condition, 'add', 'class', '')

		this.setData({
			renderFirst : renderFirst ,
			renderSecond : renderSecond ,
			display : display,
			first : "",
			second : "",
			hideFirst : renderFirst ? '' : hiddenclass,
			hideSecond : renderSecond ? '' : hiddenclass,
			showUnit : showUnit
		});

		if( display ){
			this.update_value( -inf, inf );
		}

		Lc( condition, 'add', 'isNeg', isNeg );
		Lc( condition, 'add', 'type', 'duration' );

		Lc( condition, 'add', 'value', selected );
		Lc( condition, 'add', 'label', __data.ltPropOptions[ selected ] || "" );

	}.observes( 'selected' ),

	start_end_obs : function( arg ){
		
		var value = this.data.first,
		__data = this.data,
		condition = __data.ltPropTempCondition,
		Lc = Lyte.objectUtils,
		hideFirst = __data.hideFirst,
		hideSecond = __data.hideSecond,
		first = __data.first,
		second = __data.second,
		startVal = first,
		endVal = second,
		input = "",
		isValid = false;

		if( hideFirst && hideSecond ){
			isValid = first != "";
		} else if( hideSecond ){
			isValid = !!first;
		} else {
			isValid = !!first && !!second;
		}

		if( isValid ){
			switch( __data.selected ){
				case 'equal':
				case 'not_equal':
					input = value;
					break;
				case 'greater_than':
					input = "> " + value;
					break;
				case 'less_than':
					input = "< " + value;
					break;
				case 'between':
					input = first + " <= && " + second + " >=";
					break;
			}
		}

		Lc( condition, 'add', 'unit', this.$node.querySelector( '.lyteDurationFilterUnitDropdown' ).ltProp().selected );
		Lc( condition, 'add', 'start', isValid ? startVal : '' );
		Lc( condition, 'add', 'end', isValid ? endVal : '' );
		Lc( condition, 'add', 'input', input + ( this.data.ltPropDropdownSelected ? " (" + this.data.ltPropDropdownSelected + ")" : "" ) );

		Lc( condition, 'add', 'isValid', isValid );
		Lc( condition, 'add', 'class', isValid ? 'lyteListFilterSelected' : '' );


	}.observes( 'first', 'second', 'ltPropDropdownSelected' )
});
