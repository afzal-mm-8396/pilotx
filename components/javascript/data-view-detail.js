Lyte.Component.register("data-view-detail", {
	data : function(){
		return {
			ltPropTitle    : Lyte.attr("string", { default : "" }),
			ltPropInitials : Lyte.attr("string", { default : "?" }),
			ltPropFields   : Lyte.attr("array",  { default : [] })
		}
	},
	actions : {},
	methods : {}
});
