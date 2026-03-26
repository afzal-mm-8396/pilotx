/**
 * @component crux-div-table-component
 * @author silambarasan.rt
 * @version 1.0.0
 */
Lyte.Component.register("crux-div-table-component", {
_template:"<template tag-name=\"crux-div-table-component\"> <div class=\"cxTableInfoSection\"> <template is=\"if\" value=\"{{cxPropTableFilter.length}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropTableFilter}}\" item=\"filter\" index=\"filterIndex\"> <crux-dropdown class=\"mR10\" cx-prop-options=\"{{filter.options}}\" cx-prop-selected=\"{{lbind(filter.selected)}}\" cx-prop-user-value=\"{{filter.userValue}}\" cx-prop-system-value=\"{{filter.systemValue}}\" cx-prop-maxsearch=\"{{filter.maxSearch}}\" cx-prop-type=\"single\" on-option-select=\"{{method('filterSelected',filter)}}\"></crux-dropdown> </template> </template></template> <template is=\"if\" value=\"{{cxPropSearch}}\"><template case=\"true\"> <lyte-search id=\"searchId\" class=\"mR10\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.cxDivTableBody_{{cxPropTableId}}&quot;, &quot;target&quot; : &quot;.cxDivTableTr_{{cxPropTableId}}&quot;, &quot;search&quot; : &quot;.cxCol_{{cxPropSearchColumn}}&quot;}\" on-search=\"{{method('tableSearch')}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" data-zcqa=\"lv_filter_srch_input\"> </lyte-search> </template></template> <div class=\"cxTableInfoSectionRight\"> <template is=\"if\" value=\"{{cxPropButtons.length}}\"><template case=\"true\"> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"fun\" index=\"funIndex\"> <lyte-button data-zcqa=\"fun.zcqa\" id=\"{{fun.id}}\" class=\"{{fun.class}} {{if(readMode,'eventNone','')}}\" lt-prop-appearance=\"{{fun.appearance}}\" onclick=\"{{action('buttonClick',fun,funIndex)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{fun[cxPropDisplayLabel]}} </template> </lyte-button> </template> </template></template> </div> </div> <div id=\"{{cxPropTableId}}\" class=\"cxDivTable divTable cxDivTable_{{cxPropTableId}} {{cxPropTableClass}}\"> <div class=\"cxDivTableTr divTableTr headerContent\"> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"header\" index=\"headerIndex\"> <div class=\"cxDivTableTh divTableTh {{header.class}} cxHeader_{{header[cxPropUniqueHeaderSelector]}} {{if(ifEquals(header.type,'description'),'cxDivThDescWidth','')}}\"> <template is=\"if\" value=\"{{header.headerYieldName}}\"><template case=\"true\"> <lyte-yield yield-name=\"header-{{header.headerYieldName}}\" header-obj=\"{{header}}\" index-val=\"{{headerIndex}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{header.filter}}\"><template case=\"true\"> <crux-dropdown cx-prop-options=\"{{header.options}}\" cx-prop-user-value=\"{{header.userValue}}\" cx-prop-system-value=\"{{header.systemValue}}\" cx-prop-maxsearch=\"{{header.maxSearch}}\" cx-prop-type=\"single\" on-option-select=\"{{method('filterSelected',header)}}\"></crux-dropdown> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(header.type,'==',&quot;checkbox&quot;)}}\"><template case=\"true\"> <lyte-checkbox data-zcqa=\"header_{{header.zcqa}}\" class=\"cxHeaderCheckBox\" id=\"header_checkbox_{{header[cxPropUniqueHeaderSelector]}}\" on-checked=\"{{method('checkboxChanges',this,'checked',header,header)}}\" on-unchecked=\"{{method('checkboxChanges',this,'unchecked',header,header)}}\" lt-prop-checked=\"{{lbind(row.checked)}}\" lt-prop-name=\"header_checkbox_{{row[cxPropUniqueRowSelector]}}\" lt-prop-aria-checkbox=\"{{cxPropAriaCheckbox}}\"></lyte-checkbox> </template><template case=\"false\"> {{header[cxPropDisplayLabel]}} </template></template> <template is=\"if\" value=\"{{header.info}}\"><template case=\"true\"> <span class=\"dIB infoIconforNeed cP\">{{header.info}}</span> </template></template> </template></template></template></template> </div> </template> </div> <div class=\"cxDivTableBody {{cxPropTableId}} cxDivTableBody_{{cxPropTableId}}\"> <template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\"> <div class=\"cxDivTableTr divTableTr {{if(row.cxDisabled,'cxRowDisabled','')}} cxRow_{{row[cxPropUniqueRowSelector]}} cxDivTableTr_{{cxPropTableId}}\" id=\"{{row[cxPropUniqueRowSelector]}}\" index=\"{{contentIndex}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseenter=\"{{action('onMouseEnter',row,this,event)}}\" onmouseleave=\"{{action('onMouseOut',row,this,event)}}\"> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"header\" index=\"colIndex\"> <div class=\"cxDivTableTd divTableTd cxCol_{{header[cxPropUniqueHeaderSelector]}} cxCol_{{header[cxPropUniqueHeaderSelector]}}_{{row[cxPropUniqueRowSelector]}} {{if(ifEquals(header.type,'description'),'cxDivThDescWidth','')}}\"> <template is=\"if\" value=\"{{header.contentYieldName}}\"><template case=\"true\"> <lyte-yield yield-name=\"body-{{header.contentYieldName}}\" record-obj=\"{{row}}\" header-obj=\"{{header}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(header.type,'==',&quot;checkbox&quot;)}}\"><template case=\"true\"> <lyte-checkbox data-zcqa=\"checkbox_{{row.zcqa}}\" id=\"checkbox_{{row[cxPropUniqueRowSelector]}}\" on-checked=\"{{method('checkboxChanges',this,'checked',row,header)}}\" on-unchecked=\"{{method('checkboxChanges',this,'unchecked',row,header)}}\" lt-prop-checked=\"{{lbind(row.cxChecked)}}\" lt-prop-name=\"checkbox_{{row[cxPropUniqueRowSelector]}}\" lt-prop-aria-checkbox=\"{{cxPropAriaCheckbox}}\" lt-prop-disabled=\"{{row.cxDisabled}}\"></lyte-checkbox> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(header.type,'==',&quot;normal&quot;)}}\"><template case=\"true\"> <lyte-text id=\"{{header.type}}_{{row[cxPropUniqueRowSelector]}}\" class=\"{{header[cxPropUniqueHeaderSelector]}} dIB cxVam \">{{row[header.name]}}</lyte-text> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(header.type,'==',&quot;description&quot;)}}\"><template case=\"true\"> <span id=\"{{header.type}}_{{row[cxPropUniqueRowSelector]}}\" class=\"{{header[cxPropUniqueHeaderSelector]}} {{if(ifEquals(row.showMoreBtn,false),'','cxEllipsis crmPfList_descMaxW')}} dIB cxVam\">{{row[header.name]}}</span> <template is=\"if\" value=\"{{row.showMoreBtn}}\"><template case=\"true\"> <span data-zcqa=\"profileDesc_more_{{index}}\" id=\"moreBtn_{{row[cxPropUniqueRowSelector]}}\" class=\"dIB cxVam cxLink cP\" onclick=\"{{action('expandDescription',contentIndex)}}\">{{getI18n(\"crm.label.More\")}}</span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(header.type,'==',&quot;user&quot;),'&amp;&amp;',row[header.time])}}\"><template case=\"true\"> <div class=\" cxDivTableUserDpAndDate\" lt-prop-title=\"{{setUserTooltip(row,header)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\" lt-prop-tooltip-style=\"max-width: 400px;background: #444;padding: 2px 6px;font-size:1.2rem;\"> <img id=\"userphoto_{{row[cxPropUniqueRowSelector]}}\" class=\"cxDivTableUserDp \" src=\"{{row[header.name][header.image_link]}}\"> <span class=\" cxDivTableUserDateAndTime\">{{getModifiedDate(row[header.time])}}</span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(header.type,'==',&quot;switchButton&quot;)}}\"><template case=\"true\"> <lyte-checkbox data-zcqa=\"switch_{{row.zcqa}}\" id=\"switchBtn_{{row[cxPropUniqueRowSelector]}}\" on-before-unchecked=\"{{method('beforeStatusChange',this,'beforeUnChecked',row)}}\" on-before-checked=\"{{method('beforeStatusChange',this,'beforeChecked',row)}}\" lt-prop-type=\"switch\" lt-prop-checked=\"{{row[header.name]}}\" on-checked=\"{{method('statusChange',this,'checked',row)}}\" on-unchecked=\"{{method('statusChange',this,'unchecked',row)}}\" lt-prop-name=\"status_switch_{{row[cxPropUniqueRowSelector]}}\" lt-prop-value=\"{{row[cxPropUniqueRowSelector]}}\" lt-prop-disabled=\"{{row.cxDisabled}}\" lt-prop-aria-checkbox=\"{{cxPropAriaCheckbox}}\"></lyte-checkbox> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(header.type,'==',&quot;edit&quot;),'||',expHandlers(header.type,'==',&quot;delete&quot;)),'||',expHandlers(header.type,'==',&quot;edit,delete&quot;))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(row.cxDisabled,'!')}}\"><template case=\"true\"><div class=\"cxDivTableWrapperIcon\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(header.type,'==',&quot;edit&quot;),'||',expHandlers(header.type,'==',&quot;edit,delete&quot;))}}\"><template case=\"true\"> <div class=\"cxIconAnimationWrapper\" onclick=\"{{action('doEditDeleteAction','edit',row,header,contentIndex)}}\"> <span class=\"cxDivTableEditIcon \"></span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(header.type,'==',&quot;delete&quot;),'||',expHandlers(header.type,'==',&quot;edit,delete&quot;))}}\"><template case=\"true\"> <div class=\"cxIconAnimationWrapper\" onclick=\"{{action('doEditDeleteAction','delete',row,header,contentIndex)}}\"> <span class=\"cxDivTableDeleteIcon\"></span> </div> </template></template> </div></template></template> </template><template case=\"false\"> <span id=\"{{header.type}}_{{row[cxPropUniqueRowSelector]}}\" class=\"{{header[cxPropUniqueHeaderSelector]}} dIB cxVam \">{{row[header.name]}}</span> </template></template></template></template></template></template></template></template></template></template></template></template></template></template> </div> </template> </div> </template> <template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"> <div class=\"cxDivTableTr cxDivTableNoResultTr\"> <template is=\"for\" items=\"{{cxPropHeader}}\" item=\"header\" index=\"colIndex\"> <div class=\"cxDivTableTd divTableTd\"> <template is=\"if\" value=\"{{expHandlers(colIndex,'==',0)}}\"><template case=\"true\"> <span class=\"cxDivTableNoResultMsg\">{{cxPropNoRecordsMessage}}</span> </template></template> </div> </template> </div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}]}},"default":{}}],
_observedAttributes :["cxPropHeader","cxPropContent","content","cxPropButtons","cxPropSearch","cxPropTableId","cxPropTableFilter","cxPropSortable","cxPropPlaceholder","cxPropDisplayLabel","cxPropUniqueHeaderSelector","cxPropUniqueRowSelector","cxPropNoRecordsMessage","cxPropSearchColumn","cxPropTableClass","showNoResult","cxPropAriaCheckbox"],
_observedAttributesType :["array","array","array","array","boolean","string","array","boolean","string","string","string","string","string","string","string","boolean","object"],
//no i18n
	data : function(){
		return {
			/**
			 * An array of objects that holds the information of columns that need to be rendered in the header of the table.
			 * @componentProperty { array } cxPropHeader
			 */
			cxPropHeader : Lyte.attr("array" , {default : []}),//no i18n
			/**
			 * An array of data that holds the information of the rows that need to be rendered in the body of the table.
			 * @componentProperty { array } cxPropContent
			 */
			cxPropContent : Lyte.attr("array" , {default : []}),//no i18n
			content : Lyte.attr("array" , {default : []}),//no i18n
			/**
			 * An array of objects that holds the information of the buttons that need to be rendered above the table.
			 * @componentProperty { array } cxPropButtons
			 */
			cxPropButtons : Lyte.attr("array" , {default : []}),//no i18n
			/**
			 * Set to true to render a search box above the table.
			 * @componentProperty { boolean } cxPropSearch=false
			 */
			cxPropSearch : Lyte.attr("boolean" , { default : false }),//No I18n
			/**
			 * A unique id to be set to the table.
			 * @componentProperty { string } cxPropTableId
			 */
			cxPropTableId : Lyte.attr("string" , { default : "cxCssTable" }),//No I18n
			/**
			 * The array that holds the filters that are rendered above the table.
			 * @componentProperty { array } cxPropTableFilter
			 */
			cxPropTableFilter : Lyte.attr("array" , { default : [] }),//No I18n
			/**
			 * Set to true to enable sortable for the table
			 * @componentProperty { boolean } cxPropSortable=false
			 */
			cxPropSortable :  Lyte.attr("boolean" , { default : false }),//No I18n
			/**
			Text to be displayed as placeholder for the search input
			 * @componentProperty { string } cxPropPlaceholder
			 */
			cxPropPlaceholder :  Lyte.attr("string" , { default : _cruxUtils.getI18n('crm.label.search') }),//No I18n
			/**
			 * The selector that determines which key holds the display label in the cxPropHeader
			 * @componentProperty { string } cxPropDisplayLabel
			 */
			cxPropDisplayLabel :  Lyte.attr("string", {default : "display_label"}),//No I18n
			/**
			 * The selector that determines which key holds a unique selector in the cxPropHeader
			 * @componentProperty { string } cxPropUniqueHeaderSelector
			 */
			cxPropUniqueHeaderSelector : Lyte.attr("string" , { default : "name" }),//No I18n
			/**
			 * The selector that determines which key holds a unique selector in the cxPropContent
			 * @componentProperty { string } cxPropUniqueRowSelector
			 */
			cxPropUniqueRowSelector : Lyte.attr("string", {default : "id"}),//No I18n
			/**
			 * The message that is to be displayed if no records are found.
			 * @componentProperty { string } cxPropNoRecordsMessage
			 */
			cxPropNoRecordsMessage	: Lyte.attr("string", {default : _cruxUtils.getI18n('crm.no.data.found')}),//No I18n
			/**
			 * The column for which search is to be performed.
			 * @componentProperty { string } cxPropSearchColumn
			 */
			cxPropSearchColumn		: Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Class set to the table
			 * @componentProperty { string } cxPropSearchColumn
			 */
			cxPropTableClass		: Lyte.attr("string", {default : ""}),//No I18n
			showNoResult : Lyte.attr("boolean",{default : false}),//no i18n 
			cxPropAriaCheckbox : Lyte.attr("object")
		}
	},
	didDestroy : function () {
		window.removeEventListener('scroll', this.scrollRef , true);
		delete this.scrollRef;
	},
	didConnect : function(){ 
		var rows = this.getData("content");//no i18n
		this.checkMoreOption(rows , 0 , rows.length);
		this.scrollRef = this.scrollFun.bind(this);
		window.addEventListener('scroll',  this.scrollRef, true)
	},
	checkMoreOption : function(rows , startIndex  , endIndex){
		var moreObj = {};
		$L.fastdom.measure( function(){
			startIndex = startIndex != undefined ? startIndex : 0;
			endIndex = endIndex != undefined ? endIndex : rows.length;
			for( i = startIndex; i < endIndex ; i++){
				if(  rows[i] ){
					var node = this.$node.querySelector("#description_" + rows[i].id)
					if(node && node.offsetWidth < node.scrollWidth){
						moreObj[i] = true;
				    }
				}
			}
			$L.fastdom.mutate( function(){
				for(var key in moreObj) {
					Lyte.objectUtils( rows[key],"add","showMoreBtn",moreObj[key])//no i18n
				}
			},this)
		},this )
	},
	observeSortable : function( ){
		if( this.data.cxPropSortable ){
			this.bindSortable()
		}else{
			var source = this.$node.querySelector(".cxDivTableBody")//No I18n
			$L(source).sortable( "destroy" )//No I18n
		}
	}.observes("cxPropSortable").on("didConnect"),//No I18n
	bindSortable : function(  ){
		var source = this.$node.querySelector(".cxDivTableBody");//No I18n
		var self=this;
    	$L(source).sortable({
    		containment  : "parent", //No I18n
    		onBeforeDrop : function (droppableElement ,belowElement ,placeholderElement ,fromIndex ,toIndex ,source ,destination ){
    			// fromIndex = fromIndex-1;toIndex = toIndex-1;
    			if(self.getMethods("onBeforeDropItem")){
					let data = self.getData("content");
					/**
					 * This callback is fired before the row dropped after drag.
					 * @method onBeforeDropItem
					 * @author silambarasan.rt
					 * @params {*} droppableElement - the element that is going to be dropped
					 * @params {*} fromData - the data that is going to be dropped
					 * @params {*} toData - the data that is going to be replaced after drop
					*/
					return self.executeMethod("onBeforeDropItem",droppableElement,data[fromIndex],data[toIndex]);//No I18n
				}
			 },
			onDrop : function (droppedElement , destinantion , belowElement , from, to , source ){
				// from = from-1; to = to-1;
				var data=Lyte.arrayUtils(self.getData("content"), "removeAt", from, 1)[0];//No I18n
				Lyte.arrayUtils(self.getData("content"), "insertAt", to, data);//No I18n
				self.bindSortable();
				if(self.getMethods("onDropItem")){
					/**
					 * This callback is fired once the row is dropped after drag
					 * @method onDropItem
					 * @author silambarasan.rt
					 * @params (*) droppedElement - the element that is dropped
					 * @params (*) data - the data that is dropped
					*/
					return self.executeMethod("onDropItem",droppedElement,data);//No I18n
				}
			},
			restrict : ".headerContent,.cxRowDisabled"//no i18n
    	})
	},
	init : function(){
		this.$node.getTableContent = function(){
			return {tableContent : this.getData('content')};
		}

		// test data
		// this.setData("cxPropSearchSelector",'{"scope":".cxDivTableBody","target":".cxDivTableTr","search":".cxCol_name"}')//No I18n
		// var header = [ {name :"" , class : "" , type : "edit,delete",display_label : "" }, {name : "" ,class : "w50", type : "checkbox" , display_label : "",checked : true },{ name : "name" , type : "normal" , display_label : "Profile Name" , filter :true , options:[{user:"1",system : "1"},{user:"2",system : "2"},{user:"3",system : "3"}] , userValue : "user" , systemValue : "system" , maxSearch : 2 },{ name : "description" , type : "description", display_label : "profile Description"  },{ name : "created_by" , time :"created_time" , type : "user"  ,display_label : "Created By", image_link : "crm/tab/leads"},{name : "custom" , display_label : "Status",type : "switchButton", filter : true ,options:[{user:"All Status",system : "1"},{user:"Active",system : "2"},{user:"InActive",system : "3"}] , userValue : "user" , systemValue : "system" , maxSearch : 5 }],
		// button = [{name :"new profile" , id : "crate_profile" , display_label : "New Profile" , action : function(){ alert("new profile") }}]//No I18n
		// this.setData("cxPropHeader",header);//No I18N
		// this.setData("cxPropButtons",button);//No I18N
		// var tableFilter = [{ options:[{user:"leads",system : "1"},{user:"contacts",system : "2"},{user:"deals",system : "3"}] , userValue : "user" , systemValue : "system" , selected : "3" }]//No I18n
		// this.setData("cxPropTableFilter",tableFilter)//No I18n
	},
	observesContent : function(){
//		
		// var profiles = []
		// for( var i =0;i<300;i++ ){
		// 	profiles.push( { id :"row_"+i ,name : "testProfile_"+i,description : "sample description asf jhbjadjsh kjndasknxkn bkjbasdkjnb jhdsvjhbsdj kjhewasdbn kkhgdsanK _"+i,created_by : {user : "name"}, created_time : "Dec "+i+", 2021 01:06 PM" , custom : false} )
		// }
		
		// this.setData("cxPropContent",profiles.slice(0))//No I18N
		this.setData( "content" , this.data.cxPropContent.slice(0,50) )//No I18n
		if( this.data.content.length == 0 ){
			this.setData("showNoResult",true);//no i18n
		}
		this.remaing_rows = [];
		if( this.data.cxPropContent.length > 50 ){
			this.remaing_rows =  this.data.cxPropContent.slice(50);
		}
		
	}.observes("cxPropContent").on("init"),//No I18n
	actions : {
		buttonClick : function(fun , index){
			fun.action.call();
		},
		expandDescription : function(index){
			Lyte.objectUtils( this.getData("content")[index],"add","showMoreBtn",false)//no i18n
		},
		onRowClick : function(row,event){
			 if(this.$node._actions["on-body-row-click"]){
				this.throwEvent("on-body-row-click", {rowData : row,event : event});//No I18n
			}
		},
		onMouseEnter : function(row , ele , eve){
			if(this.$node._actions["on-mouse-enter"]){
				this.throwEvent("on-mouse-enter", { rowData : row , element : ele , event : eve});//No I18n
			}
		},
		onMouseOut : function(row , ele , eve){
			if(this.$node._actions["on-mouse-leave"]){
				this.throwEvent("on-mouse-leave", { rowData : row , element : ele , event : eve});//No I18n
			}
		},
		doEditDeleteAction : function( action , row , header , index ){
			if(row.cxDisabled){
				return;
			}
			if( this.getMethods("onEditDeleteAction") ){
				/**
				 * This callback is fired when the edit/delete icon clicked
				 * @method onEditDeleteAction
				 * @author silambarasan.rt
				 * @param (*) an object that tells us what action is performed, which row the action is performed in, the header and the row index.
				*/
				 this.executeMethod("onEditDeleteAction" , { action :  action ,rowData: row , header : header ,rowIndex : index   });//No I18n
			}
		}
	},
	methods : {
		filterSelected : function(filterObj , eve , selectedValue , comp){
			if( this.getMethods("onFilterSelected") ){
				/**
				 * This callback is fired when the filter selected
				 * @method onFilterSelected
				 * @author silambarasan.rt
				 * @param (*) an object that contains the filter object, the component, the selected value, the event and the dropdown component
				*/
				 this.executeMethod("onFilterSelected" , { filter : filterObj, component : this , selected : selectedValue, event : eve , dropdown : comp });//No I18n
			}
		},
		// ColumnFilterSelected : function(filterObj , eve , selectedValue , comp){
		// 	if( this.getMethods("onColumnFilterSelected") ){
		// 		 this.executeMethod("onColumnFilterSelected" , { filter : filterObj, component : this , selected : selectedValue, event : eve , dropdown : comp });//No I18n
		// 	}
		// },
		beforeStatusChange : function(node , method , rowData, input , checkBoxComp , eve){
			if( this.getMethods("onBeforeStatusChange") ){
				/**
				 * This callback is fired before the status filter is applied
				 * @method onBeforeStatusChange
				 * @author silambarasan.rt
				 * @param (*) an object that contains the node element, the component, the event, the method and the row data
				*/
				return this.executeMethod("onBeforeStatusChange" , { node :  node ,component : this , event : eve , method : method ,rowData : rowData });//No I18n
			}
		},
		statusChange : function(node , method, rowData ,input , checkBoxComp , eve){
			if( this.getMethods("onStatusChanged") ){
				/**
				 * This callback is fired when the status filter is changed
				 * @method onBeforeStatusChange
				 * @author silambarasan.rt
				 * @param (*) an object that contains the node, the component, the event, the method, the row data and the table content
				*/
				 this.executeMethod("onStatusChanged" , { node :  node ,component : this , event : eve , method : method ,rowData:rowData , tableContent : this.data.content});//No I18n
			}
		},
		checkboxChanges : function(node , status , rowData , header , input , checkBoxComp , eve , calledFrom){
			if( calledFrom == "script" ){
				return;
			}
			if( rowData.type == "checkbox" ){
				this.changeCheckBoxStatus(this.data.content , node.checked)
				return
			}
			var selectedRowsCount = this.getSelectedCheckBoxCount(),
			headerCheckbox = $L( "#header_checkbox_"+header[this.data.cxPropUniqueHeaderSelector] )[0];
			selectedRowsCount = node.checked ? selectedRowsCount+1: selectedRowsCount-1;
			if( selectedRowsCount == this.data.content.length ){
				headerCheckbox.ltProp("checked",true);//No I18n
			}else if(headerCheckbox.checked == true){
				headerCheckbox.ltProp("checked",false);//No I18n
			}
			if( this.getMethods("onRecordSelectionChanges") ){
				/**
				 * This callback is fired when a checkbox is checked or unchecked
				 * @method onRecordSelectionChanges
				 * @author silambarasan.rt
				 * @param (*) an object that contains the node, the component, the event, the method and the row data
				*/
				 this.executeMethod("onRecordSelectionChanges" , { node :  node ,component : this , event : eve , method : status , rowData : rowData });//No I18n
			}
		},
		tableSearch : function(result , searchElement ,eve, searchWord){
			this.setData("showNoResult", !result.length ? true : false);//no i18n
		}
	},
	changeCheckBoxStatus : function(rows,status){
		var  i = 0 , len = rows.length 
		for( i = 0 ; i < len ; i++ ){
			Lyte.objectUtils(rows[i],"add","cxChecked" , status);//No I18N
		}
	},
	getSelectedCheckBoxCount : function(){
		var rows = this.data.content , i = 0 , len = rows.length , selected = 0 ;
		for( i= 0 ; i < len ; i++ ){
			if( rows[i].cxChecked ){
				selected = selected + 1;
			}
		}
		return selected;
	},scrollFun : function(event){
		var target = event.target;
		if( target && target.querySelector(".cxDivTable") ){
			var tableComp = target.querySelector("crux-div-table-component");//No I18n
			if(this.remaing_rows.length && $L(target).scrollTop() + $L(target).innerHeight() >= $L(target)[0].scrollHeight-500 ){
				var tempData = this.remaing_rows.splice( 0,10) , isHeaderCheckBox = $L(".cxHeaderCheckBox")[0];
				if( isHeaderCheckBox && isHeaderCheckBox.checked ){
					this.changeCheckBoxStatus( tempData ,  true);
				}
				this.renderNextDataSet( tempData );
			}
			if( !this.remaing_rows.length && this.getMethods("onLoadMoreData") && !this.fetchingNextDataSet){
				this.fetchingNextDataSet = true;
				/**
				 * This callback is fired when scroll end is reached to load more data
				 * @method onLoadMoreData
				 * @author silambarasan.rt
				 * @param (*) an object that contains the component and the content
				*/
				let nextData = this.executeMethod( "onLoadMoreData" , { component : this , content : this.data.content} )
				if( nextData && nextData.length ){
					this.handleNextDataSet(nextData);
				} if( nextData && nextData.then ){
					nextData.then(function(data){
						this.handleNextDataSet(data);
					}.bind(this))
				}
			}
		}
	},
	// getSortedValue : function(){
	// 	if(!this.data.cxPropSortable){
	// 		return
	// 	}
	// 	var rows = this.data.content;
	// 	if( this.remaing_rows.length ){
	// 		rows = rows.concat(this.remaing_rows);
	// 	}
	// 	return rows;
	// },
	handleNextDataSet : function(data){
		Lyte.arrayUtils( this.data.cxPropContent , "concat" , data );
		if( data.length > 50 ){
			this.remaing_rows = data.splice(50);
		}
		this.renderNextDataSet(data)
		delete this.fetchingNextDataSet;
	},
	renderNextDataSet : function( data ) {
		Lyte.arrayUtils(this.data.content, "insertAt",this.data.content.length, data);// No I18n
		this.checkMoreOption( this.data.content , this.data.content.length-data.length,this.data.content.length )
		this.bindSortable();
	}
});

Lyte.Component.registerHelper("setUserTooltip", function(rowData , header){ //No I18N
	if( !header.time ||  !header.name ){
		return
	}
	var time = rowData[header.time] , by =  rowData[header.name]
	if(time){
		var splitValue = time.split(",")
		var date = splitValue[0] + splitValue[1].slice(0,5)
		var time = splitValue[1].slice(5)
		return _cruxUtils.getI18n("crm.workflow.rule.created.dateAndtime",[rowData[header.name].name,date,time]);//no i18n
	}
	return "";
});
Lyte.Component.registerHelper("getModifiedDate", function(date){ //No I18N
	if( !date ){
		return "";
	}
	var currYear = new Date().getFullYear();
	var splitValue = date.split(",");
	// if( date.indexOf(currYear) === -1){
		return splitValue[0] + splitValue[1].slice(0,5)
	// }else{
	// 	return splitValue[0];
	// }
});


/**
 * @syntax nonYielded
 * <crux-div-table-component cx-prop-header='[{"name":"","class":"","type":"edit,delete","display_label":""},{"name":"","class":"w50","type":"checkbox","display_label":"","checked":true},{"name":"name","type":"normal","display_label":"Profile Name","filter":true,"options":[{"user":"1","system":"1"},{"user":"2","system":"2"},{"user":"3","system":"3"}],"userValue":"user","systemValue":"system","maxSearch":2},{"name":"description","type":"description","display_label":"profile Description"},{"name":"created_by","time":"created_time","type":"user","display_label":"Created By","image_link":"crm/tab/leads"},{"name":"custom","display_label":"Status","type":"switchButton","filter":true,"options":[{"user":"All Status","system":"1"},{"user":"Active","system":"2"},{"user":"InActive","system":"3"}],"userValue":"user","systemValue":"system","maxSearch":5}]' cx-prop-content='{"id":"row_0","name":"testProfile_0","description":"sample description asf jhbjadjsh kjndasknxkn bkjbasdkjnb jhdsvjhbsdj kjhewasdbn kkhgdsanK _0","created_by":{"user":"name"},"created_time":"Dec 0, 2021 01:06 PM","custom":false}'></crux-div-table-component>
 */
