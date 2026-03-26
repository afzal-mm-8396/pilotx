Lyte.Component.register("crux-dashboard", {
_template:"<template tag-name=\"crux-dashboard\"> <div id=\"scrolls\" class=\"oA\" style=\"height : {{cxPropHeight}}\" onscroll=\"{{action('scroll')}}\"> <lyte-gridstack id=\"{{cxPropId}}\" style=\"width: 100%;\" on-before-select=\"{{method('beforeSelect')}}\" on-select=\"{{method('select')}}\" on-before-drop=\"{{method('beforeDrop')}}\" after-render=\"{{method('afterRender')}}\" on-item-add=\"{{method('itemAdd')}}\" on-drop=\"{{method('drop')}}\" on-drag=\"{{method('drag')}}\" on-window-resize=\"{{method('windowResize')}}\" before-render=\"{{method('beforeRender')}}\" on-property-change=\"{{method('propertyChange')}}\" lt-prop=\"{{cxPropGridstackProperties}}\" onclick=\"{{action('scroll')}}\" lt-prop-freeze-mode=\"{{cxPropFreeze}}\" lt-prop-unit-x=\"{{cxPropUnitX}}\" lt-prop-unit-y=\"{{cxPropUnitY}}\" lt-prop-grid-length=\"{{cxPropGridLength}}\" lt-prop-bestfit-type=\"grid\" lt-prop-scope=\"div.lyteGridStack\" lt-prop-handler=\".lyteGridStackItem\"> <template is=\"registerYield\" yield-name=\"lyteGridStack\"> <div id=\"lyteGridStack\" class=\"lyteGridStack {{if(cxPropFreeze,'value1','value2')}}\"> <template is=\"for\" items=\"{{cxPropBindData}}\" item=\"item\" index=\"index\"> <div lyte-grid-x=\"{{lbind(item.dimensional_properties.layout.x)}}\" lyte-grid-y=\"{{lbind(item.dimensional_properties.layout.y)}}\" id=\"widget{{index}}\" class=\"lyteGridStackItem grid {{cxPropGridClass}} {{item.class}} {{cxPropId}}{{index}}\" lyte-grid-length=\"{{item.dimensional_properties.layout.width}}\" lyte-grid-height=\"{{item.dimensional_properties.layout.height}}\"> <lyte-grid-content> <template is=\"if\" value=\"{{cxPropIsHeaderYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerYield\"> <h1>{{item.name}} <i class=\"fa fa-refresh\" title=\"{{item.lastRefresh}}\" onclick=\"{{action(&quot;refresh&quot;,index)}}\" style=\"margin-left: 10px;\"></i> <template is=\"if\" value=\"{{expHandlers(cxPropMenuData.length,'>',0)}}\"><template case=\"true\"><i id=\"{{cxPropId}}-{{index}}\" class=\"someClass\" style=\"float: right;margin-right: 10px;\"></i></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropMenuData.length,'>',0)}}\"><template case=\"true\"><lyte-menu lt-prop-callout=\"true\" lt-prop-content=\"{{cxPropMenuData}}\" on-menu-click=\"{{method('menuClick')}}\" lt-prop-user-value=\"name\" lt-prop-wrapper-class=\"class\" lt-prop-query=\".someClass\"></lyte-menu></template></template> </h1> </lyte-yield></template></template> <template is=\"if\" value=\"{{item.isvisible}}\"><template case=\"true\"><div> loading... </div></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(item.isvisible,'!'),'&amp;&amp;',expHandlers(item.type,'===','custom_view')),'&amp;&amp;',response[index].header)}}\"><template case=\"true\"><div> <crux-table-component cx-prop-header=\"{{response[index].header}}\" cx-prop-content=\"{{cruxDashboardSlice(response[index].content,response[index].tableInfo.page,response[index].content.length)}}\" cx-prop-height=\"{{if(response[index].content.length,expHandlers(expHandlers(expHandlers(item.dimensional_properties.layout.height,'-',1),'*',cxPropUnitY),'+','px'),'35px')}}\"> </crux-table-component> <template is=\"if\" value=\"{{response[index].content.length}}\"><template case=\"true\"><lyte-navigator on-next=\"{{method('next',index)}}\" on-previous=\"{{method('previous',index)}}\" lt-prop-yield=\"false\" lt-prop-value=\"{{response[index].tableInfo.page}}\" lt-prop-records=\"{{response[index].content.length}}\" lt-prop-perpage=\"{{response[index].tableInfo.per_page}}\" lt-prop-more-records=\"{{response[index].tableInfo.more_records}}\"></lyte-navigator></template></template> </div></template><template case=\"false\"><div id=\"contentBody_{{cxPropId}}_{{index}}\"> </div></template></template></template></template> </lyte-grid-content> </div> </template> </div> </template> </lyte-gridstack> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height : '","cxPropHeight"]}}}},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,1,2]},{"type":"attr","position":[0,1,4]},{"type":"if","position":[0,1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,6]},{"type":"if","position":[0,1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}]}]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["cxPropIsHeaderYield","cxPropBindData","cxPropFreeze","cxPropHeight","cxPropMenuData","cxPropGridstackProperties","cxPropGridLength","cxPropUnitY","cxPropUnitX","cxPropGridClass","cxPropId","response"],
_observedAttributesType :["boolean","array","boolean","string","array","object","string","string","string","string","string","array"],
 //No I18n
	data : function(){
		return {
			cxPropIsHeaderYield : Lyte.attr('boolean',{ default : true}),//No I18n
			cxPropBindData : Lyte.attr("array"),//No I18n
			cxPropFreeze : Lyte.attr('boolean',{ default : true}),//No I18n
			cxPropHeight : Lyte.attr( 'string',{ default : '100%'}),//No I18n
			cxPropMenuData : Lyte.attr( 'array' ),//No I18n
			cxPropGridstackProperties : Lyte.attr('object'),//No I18n
			cxPropGridLength : Lyte.attr('string',{default:'12'}),//No I18n
			cxPropUnitY : Lyte.attr('string',{default:'100'}),//No I18n
			cxPropUnitX : Lyte.attr('string',{default:'50'}),//No I18n
			cxPropGridClass : Lyte.attr('string'),//No I18n
			cxPropId : Lyte.attr('string', { default : ''}),//No I18n
			response : Lyte.attr('array', { default : []})//No I18n
		}		
	},
	count : 0,
	actions : {
		scroll:function(){
			this.getVisibleData();
		},
		refresh : function(index){
			refreshGrid(index);
		}
	},
	methods : {
		afterRender : function(lyteGridstack){
			this.$node.querySelector( "lyte-gridstack" ).ltProp(this.data.cxPropGridstackProperties);//No I18n
			this.saveGridDimontional();
			this.getVisibleData();
			if(this.getMethods("onAfterRender")){//No I18n
				this.executeMethod("onAfterRender", lyteGridstack);//No I18n
			}
		},
		menuClick : function ( value , event , element , menuOriginElem , clickedItemAndSubmenu_detail ) {
			if(value.enabled){
				if(value.key === 'delete'){
					document.querySelector( "#"+((menuOriginElem.id).split("-")[0]) ).removeGrid( document.getElementsByClassName(  (menuOriginElem.id).split("-")[0]+((menuOriginElem.id).split("-")[1]) )[0] );//No I18n
				}
				if(this.getMethods("onMenuClick")){//No I18n
					this.executeMethod("onMenuClick", value , event ,element, menuOriginElem);//No I18n
				}
			}
		},
		beforeSelect : function(selectedGrid , event , lyteGridstack){
			if(this.getMethods("onBeforeSelect")){//No I18n
				this.executeMethod("onBeforeSelect", selectedGrid , event , lyteGridstack);//No I18n
			}
		},
		select : function ( selectedGrid , event , lyteGridstack ) {
			if(this.getMethods("onSelect")){//No I18n
				this.executeMethod("onSelect", selectedGrid , event , lyteGridstack);//No I18n
			}
	   	},
		beforeDrop : function ( selectedGrid , event , lyteGridstack, isresize ) {
			if(this.getMethods("onBeforeDrop")){//No I18n
				this.executeMethod("onBeforeDrop", selectedGrid , event , lyteGridstack, isresize);//No I18n
			}
	    },
		drop : function ( selectedGrid , event , lyteGridstack, isresize ) {
			if(this.getMethods("onDrop")){//No I18n
				this.executeMethod("onDrop", selectedGrid , event , lyteGridstack, isresize);//No I18n
			}
	   	},
		drag : function ( selectedGrid , event , lyteGridstack ) {
			if(this.getMethods("onDrag")){//No I18n
				this.executeMethod("onDrag", selectedGrid , event , lyteGridstack);//No I18n
			}
	   	},
		windowResize : function ( event , lyteGridstack ) {
			if(this.getMethods("onWindowResize")){//No I18n
				this.executeMethod("onWindowResize", event , lyteGridstack);//No I18n
			}
	    },
		beforeRender : function ( lyteGridstack ) {
			for(let i=0;i<this.data.cxPropBindData.length;i++){
				let value = this.data.cxPropBindData[i];
				Lyte.objectUtils( value , "add" , "isvisible" , true );//No I18n
				if(!this.data.cxPropBindData[i].dimensional_properties){
					Lyte.objectUtils( value , "add" , "dimensional_properties" , {"layout":{"x":"0","y":"0","width":"6","height":"4"}} );//No I18n
				}
			}
			if(this.getMethods("onBeforeRender")){//No I18n
				this.executeMethod("onBeforeRender", lyteGridstack);//No I18n
			}
	   	},
		propertyChange : function ( div, propertyName, properties, grid ) {
			if(this.getMethods("onPropertyChange")){//No I18n
				this.executeMethod("onPropertyChange", div, propertyName, properties, grid);//No I18n
			}
	    },
		itemAdd : function ( div, properties, grid ) {
			if(this.getMethods("onItemAdd")){//No I18n
				this.executeMethod("onItemAdd", div, properties, grid);//No I18n
			}
	   	},
		next : function(index, value, element, event){
			if(this.data.response[index].content.length<=value){
				store.findAll(this.data.cxPropBindData[index].module.id, {page : (value/10)+1, per_page : this.data.response[index].tableInfo.per_page}).then(function(resp){
					Lyte.arrayUtils( this.data.response[index].content , 'push' , resp);
					let object = Lyte.deepCopyObject(this.data.response[index]);
					object.tableInfo.page = value;
					object.tableInfo.more_records = resp.$.meta.more_records;
					Lyte.arrayUtils( this.data.response , 'replaceAt' , index , object);//No I18n
				}.bind(this));
			}else{
				let object = Lyte.deepCopyObject(this.data.response[index]);
				object.tableInfo.page = value;
				Lyte.arrayUtils( this.data.response , 'replaceAt' , index , object);//No I18n
			}
		},
		previous : function(index, value, element, event){
			let object = Lyte.deepCopyObject(this.data.response[index]);
			object.tableInfo.page = value;
			Lyte.arrayUtils( this.data.response , 'replaceAt' , index , object);//No I18n
		}
	},

	//using javascript height
	getVisibleData : function() {
		if(this.count <= this.data.cxPropBindData.length) {
			for(let i=0;i<this.data.cxPropBindData.length;i++){
				var element = this.$node.querySelector('#widget'+i);//No I18n
				if(this.data.cxPropBindData[i].isvisible && (this.data.cxPropBindData[i].isVisibleDataOnLoad || this.checkVisible(element))){
					this.getObjectData(i);
				}
			}
		}
	},
	checkVisible : function(elm) {
	  var rect = elm.getBoundingClientRect();
	  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	},
	getObjectData : function(i){
		let cxPropId = this.getData('cxPropId');//No I18n
		if(this.getMethods("onCustomRequest")){//No I18n
			this.setIsVisible(i);
			this.executeMethod("onCustomRequest", i , this.data.cxPropBindData[i], '#contentBody_'+cxPropId+'_'+i).then(function(response){//No I18n
				this.count++;
				let object = this.data.cxPropBindData[i];
				Lyte.arrayUtils( this.data.response , 'push' , {});//No I18n
				if(response && response.component){
					this.$node.querySelector('#contentBody_'+cxPropId+'_'+i).innerHTML = '';//No I18n
					Lyte.Component.render( response.component , {content : response.content} , '#contentBody_'+cxPropId+'_'+i);//No I18n
				}
				else if(response && response.content){
					this.$node.querySelector('#contentBody_'+cxPropId+'_'+i).innerHTML = response.content;//No I18n
				}
				else if(object.type === 'custom_view'){
					this.setTableData(i);
				}
			}.bind(this))
		}else{
			this.count++;
			Lyte.arrayUtils( this.data.response , 'push' , {});//No I18n
			this.setTableData(i);
		};
	},
	setTableData : function(i){
		let object = this.data.cxPropBindData[i];
		if(object.type === 'custom_view'){
			Lyte.resolvePromises([store.findRecord("custom_view", this.data.cxPropBindData[i].resource.id , {module : this.data.cxPropBindData[i].module.api_name}), store.findRecord("module",this.data.cxPropBindData[i].module.id)]).then(function(resp){
				var header = [];
				for(let i=0;i<resp[0].fields.length;i++){
					header[i] = store.peekRecord("field", resp[0].fields[i].id);
				}
				store.findAll(this.data.cxPropBindData[i].module.id,{per_page : 10}).then(function(response){
					let data = {
						header : header,
						content : [...response],
						tableInfo : response.$.meta
					}
					data.tableInfo.page = 0;
					Lyte.arrayUtils( this.data.response , 'replaceAt', i , data);//No I18n
					this.setIsVisible(i);
				}.bind(this));
			}.bind(this))
		}else{
			this.setIsVisible(i);
			this.$node.querySelector('#contentBody_'+this.getData('cxPropId')+'_'+i).innerHTML = '<h2>' + (parseInt(i)+1) + ' Content Body<h2>';//No I18n
		}
	},
	setIsVisible : function(i){
		let object = this.data.cxPropBindData[i];
		Lyte.objectUtils( object , "add" , "isvisible" , false );//No I18n
		Lyte.objectUtils( object , "add" , "lastRefresh" , $L.moment().format('DD/MM/YYYY HH:mm:ss') );//No I18n
	},

	//utilites function
	//reset 
	reset : function(){
		this.count = 0;
		for(let i=0;i<this.data.cxPropBindData.length;i++){
			let object = this.data.cxPropBindData[i];
			Lyte.objectUtils( object , "add" , "isvisible" , true );//No I18n
		}
		this.getVisibleData();
	},
	resetPosition : function(){
		for(let i=0;i<this.data.cxPropBindData.length;i++){
			var element = this.$node.querySelector('#widget'+i);//No I18n
			element.setAttribute("lyte-grid-x", this.data.cxPropBindData[i].dimensional_properties.layout.x);//No I18n
			element.setAttribute("lyte-grid-y", this.data.cxPropBindData[i].dimensional_properties.layout.y);//No I18n
		}
	},
	resetIndex : function(index){
		let object = this.data.cxPropBindData[index];
		Lyte.objectUtils( object , "add" , "isvisible" , true );//No I18n
		Lyte.objectUtils( object , "add" , "lastRefresh" , $L.moment().format('DD/MM/YYYY HH:mm:ss') );//No I18n
		this.getObjectData(index);
	},

	saveGridDimontional : function(){
		for(let i=0;i<this.data.cxPropBindData.length;i++){
			var element = this.$node.querySelector('#widget'+i);//No I18n
			let object = this.data.cxPropBindData[i].dimensional_properties.layout;
			Lyte.objectUtils( object , "add" , "x" , element.getAttribute("lyte-grid-x") );//No I18n
			Lyte.objectUtils( object , "add" , "y" , element.getAttribute("lyte-grid-y") );//No I18n
			Lyte.objectUtils( object , "add" , "height" , element.getAttribute("lyte-grid-height") );//No I18n
			Lyte.objectUtils( object , "add" , "width" , element.getAttribute("lyte-grid-length") );//No I18n
		}
		return this.data.cxPropBindData;
	},
	refreshGrid(index = -1){
		if(index<0){
			this.reset();
			this.resetPosition();
		}else {
			this.resetIndex(index);
		}
	},
	viewFullScreen : function(){
		var element = this.$node.querySelector("#scrolls");//No I18n
		element.requestFullscreen();
	}
});

Lyte.Component.registerHelper('cruxDashboardSlice', function( data, pageVal, maxRecord ) {// NO I18N
	var resultVal = (data).slice(pageVal, maxRecord<pageVal+10?maxRecord:pageVal+10);
	return resultVal;
});