Lyte.Component.register("data-view-chart", {
	data : function(){
		return {
			ltPropType : Lyte.attr("string", { default : "bar" }),
			ltPropTitle : Lyte.attr("string", { default : "" }),
			ltPropSeriesData : Lyte.attr("object", { default : {} }),
			ltPropMetaDataAxes : Lyte.attr("object", { default : {} }),
			ltPropMetaDataColumns : Lyte.attr("array", { default : [] })
		}
	},
	actions : {},
	methods : {}
});
