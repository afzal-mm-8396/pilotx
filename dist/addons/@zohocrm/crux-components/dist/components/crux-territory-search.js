//$Id$
Lyte.Component.register("crux-territory-search", {
_template:"<template tag-name=\"crux-territory-search\"> <lyte-dropdown on-option-selected=\"{{method('optionSelected')}}\" lt-prop-placeholder=\"Search\" on-before-show=\"{{method('onBeforeDropdownOpen')}}\" class=\"cxBoxDropdown\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"{{if(dropButtonFocus,'cxDropButtonFocused')}}\"> <lyte-search class=\"cxTerritorySearchElement\" lt-prop-appearance=\"box\" lt-prop-close-icon=\"true\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.searchScopeTerritory{{cxPropId}}&quot;,&quot;search&quot;:&quot;.cxTerritorySearchTerritoryName&quot;,&quot;target&quot;:&quot;.cxTerritorySearchDropItem&quot;}\" on-search=\"{{method('showNoOption')}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\" on-blur=\"{{method('onBlur')}}\" on-focus=\"{{method('onFocus')}}\" on-value-change=\"{{method('onSearchValueChange')}}\" data-zcqa=\"territoryTreeSearch\"></lyte-search> </lyte-drop-button> <lyte-drop-box class=\"cxTerritoriesDropbox searchScopeTerritory{{cxPropId}} cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{territoryDropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item class=\"cxTerritorySearchDropItem\" data-value=\"{{item.id}}\" data-zcqa=\"terrtioryItem_{{item.name}}\"> <lyte-text class=\"cxTerritorySearchTerritoryName cxTerritorySearchDropItemPrimaryLabel\" lt-prop-value=\"{{item.name}}\"></lyte-text> <lyte-text class=\"cxTerritorySearchDropItemSecondaryLabel\" lt-prop-value=\"{{cruxJoin(cruxSplit(item.hierachyName,'>cx'),'>')}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{unescape(getHeirachyNames(item.hierachyName))}} </template> </lyte-text> </lyte-drop-item> </template> <template is=\"if\" value=\"{{showNoOption}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["territoryDropdownData","cxPropTerritory","cxPropModelName","cxPropQueryParams","cxPropCustomData","cxPropSearchPlaceholder","dropButtonFocus","openDropdown","cxPropId"],
_observedAttributesType :["array","array","string","object","object","string","boolean","boolean","string"],

	data : function(){
		return {
			territoryDropdownData : Lyte.attr('array',{default : []}), //no i18n
			cxPropTerritory : Lyte.attr('array',{default : []}), //no i18n
			cxPropModelName : Lyte.attr('string',{default : 'territory'}), //no i18n
			cxPropQueryParams : Lyte.attr('object'), //no i18n
			cxPropCustomData : Lyte.attr('object'), //no i18n
			cxPropSearchPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.globalsearch.search.title')}), //no i18n
			dropButtonFocus : Lyte.attr('boolean',{default : false}), // no i18n
			openDropdown : Lyte.attr('boolean',{default : false}),
			cxPropId : Lyte.attr('string') //no i18n
		}
	},
	setDatas : function(){
		function something(ter,parentName,array){
		    ter.children && ter.children.forEach(function(item){
		        var itemName = parentName+ ' >cx ' + item.name
		        array.push(Object.assign(item,{hierachyName : itemName}));
		        something(item,itemName,array);
		    })
		}
		var a = [],terrr = this.data.cxPropTerritory[0];
		a.push(Object.assign(terrr,{hierachyName : terrr.name}))
		something(terrr,terrr.name,a);
		this.setData('territoryDropdownData',a);
	},
	init : function(){
		this.$node.focus = function(){
			var search = this.querySelector('lyte-search')
			search.click();
			search.focus();
		}
		this.$node.setSearchValue = function(a){
			this.querySelector('lyte-search').setValue(a);
		}
		if(!this.data.cxPropTerritory || this.data.cxPropTerritory.length == 0){
			if(!store.peekAll(this.data.cxPropModelName) || store.peekAll(this.data.cxPropModelName).length == 0){
				store.findAll(this.data.cxPropModelName).then(function(data){ //no i18n
					this.setData('cxPropTerritory',[].concat(data[0]));//no i18n
					this.setDatas();
				}.bind(this));
			}else{
				this.setData('cxPropTerritory',[].concat(store.peekAll(this.data.cxPropModelName)[0]));//no i18n
				this.setDatas();
			}
		}else{
			this.setDatas();
		}
	},
	setFromComp : false,
	actions : {
		// Functions for event handling
	},
	methods : {
		optionSelected : function(event,id){
			if(this.getMethods('onTerritorySelected')){
				this.executeMethod('onTerritorySelected',id)
			}else{
				console.warn('Please use the onTerritorySelected to get the selected territory')
			}
		},
		onBeforeDropdownOpen : function(event,comp){
			if(comp){
				comp.setData('ltPropSelected',"");
			}
			return this.setFromComp;
		},
		showNoOption : function(list,node,event,word){
			this.setData('showNoOption',list.length == 0);
			if(word.length == 0){
				var dropdown = this.$node.querySelector('lyte-dropdown')
				if(dropdown.ltProp('isOpen')){
					dropdown.close();
				}
				this.setFromComp = false;
			}else{
				this.setFromComp = true;
			}
		},
		onSearchValueChange : function(word){
			var dropdown = this.$node.querySelector('lyte-dropdown')
			if(word.newValue.length >= 1){
				this.setData('openDropdown',true)
				if(!dropdown.ltProp('isOpen')){
					this.setFromComp = true;
					dropdown.open();
				}
			}else{
				if(dropdown.ltProp('isOpen')){
					this.setFromComp = false;
					dropdown.close();
				}
			}
		},
		onFocus : function(){
			this.setData('dropButtonFocus',true)
		},
		onBlur : function(){
			this.setData('dropButtonFocus',false)
		}
	}
});

Lyte.Component.registerHelper('getHeirachyNames',function (value) {
	var a = value.split('>cx')
	var ret = $ESAPI.encoder().encodeForHTML(a[0])
	for(var i=1;i<a.length;i++){
		ret += '<span class="cxTerritoryCrumb"> > </span>' + $ESAPI.encoder().encodeForHTML(a[i]) ;
	}
	return ret
});
