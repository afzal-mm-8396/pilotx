Lyte.Component.register("lyte-custom-filter", {
_template:"<template tag-name=\"lyte-custom-filter\"> <lyte-yield yield-name=\"lyte-custom-filter\" lt-prop-data=\"{{ltPropData}}\" lt-prop-condition=\"{{ltPropCondition}}\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropCondition","ltPropTempCondition","ltPropReset","ltPropData"],
_observedAttributesType :["object","object","boolean","object"],


	init : function(){
		var __data = this.data;

		if( _lyteUiUtils.lyteUiIsEmpty( __data.ltPropCondition ) ){
			this.setData( 'ltPropCondition', { isValid : false, value : "", label : "", class : "", type : "custom" } );
		}else{
			this.setData( 'ltPropTempCondition', __data.ltPropCondition );
		}

	},

	data : function(){

		return {
			ltPropCondition : Lyte.attr( 'object', { watch : true } ),
			ltPropTempCondition : Lyte.attr( 'object' ),
			ltPropReset : Lyte.attr( 'boolean', { default : false } ),
			ltPropData : Lyte.attr( 'object', { default : {} } )
		}		
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			var cb = "onCustomFilterReset",
			__data = this.data,
			Lc = Lyte.objectUtils,
			condition = __data.ltPropCondition;

			Lc( condition, 'add', 'isValid', false );
			Lc( condition, 'add', 'label', "" );
			Lc( condition, 'add', 'value', "" );
			Lc( condition, 'add', 'class', "" );

			this.getMethods( cb ) && this.executeMethod( cb, __data.ltPropData, condition, this.$node );
			this.setData( arg.item, false );
		}
	}.observes( 'ltPropReset' ),

	obs : function(arg){
		this.setData( 'ltPropTempCondition', this.data.ltPropCondition );
	}.observes( 'ltPropCondition.*' )
});
