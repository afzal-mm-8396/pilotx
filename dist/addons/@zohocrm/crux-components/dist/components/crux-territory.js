// $Id$
Lyte.Component.register("crux-territory", {
_template:"<template tag-name=\"crux-territory\"> <template is=\"if\" value=\"{{cxPropShowModal}}\"><template case=\"true\"> <lyte-modal lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-width=\"60%\" lt-prop-height=\"auto\" lt-prop-wrapper-class=\"cxBoxModal cxTerritoryModalWrapper\" on-show=\"{{method('onModalShow')}}\" lt-prop-show-close-button=\"{{cxPropShowCloseIconModal}}\" lt-prop-prevent-focus=\"true\" lt-prop-allow-multiple=\"{{cxPropAllowMultipleModal}}\" on-close=\"{{method('onModalClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <template is=\"if\" value=\"{{cxPropModalHeaderYield}}\"><template case=\"true\"> <lyte-yield class=\"cxDB cxTerritoryHeaderYield\" yield-name=\"modalHeaderYield\"></lyte-yield> </template><template case=\"false\"> {{modalTitle}} </template></template> </lyte-modal-header> <lyte-modal-content class=\"cxTerritoryModalContent\"> <div class=\"cxFlex cxTerritorySearchWrap\"> <template is=\"if\" value=\"{{expHandlers(cxPropSearch,'==','treeSearch')}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-tree#cxTerritoryTree&quot;,&quot;search&quot;:&quot;p.treeValue&quot;,&quot;target&quot;:&quot;.lyteTreeBodyDiv&quot;}\" lt-prop-component=\"tree\" on-search=\"{{method('territorySearch')}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\" data-zcqa=\"territoryTreeSearch\"> </lyte-search> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropSearch,'==','dropdownSearch')}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-territory-search cx-prop-territory=\"{{cxPropTerritory}}\" cx-prop-model-name=\"{{cxPropModelName}}\" cx-prop-query-params=\"{{cxPropQueryParams}}\" cx-prop-custom-data=\"{{cxPropCustomData}}\" on-territory-selected=\"{{method('scrollTerritory')}}\" cx-prop-placeholder=\"{{cxPropSearchPlaceholder}}\" cx-prop-id=\"{{cxPropId}}\"></crux-territory-search> </template></template></template></template> <template is=\"if\" value=\"{{cxPropSearchSuffixYield}}\"><template case=\"true\"> <lyte-yield class=\"cxTerritorySuffixYield\" yield-name=\"searchSuffixYield\"></lyte-yield> </template></template> </div> <div class=\"cxTerritoryModalTreeWrap\"> <lyte-tree lt-prop-max-level=\"{{cxPropTreeMaxLevel}}\" id=\"cxTerritoryTree\" class=\"cxTerritoryTree\" lt-prop-data=\"{{cxPropTerritory}}\" lt-prop-open-class=\"lyteTreeOpen\" lt-prop-close-class=\"lyteTreeClose\" on-toggle=\"{{method('treeToggle')}}\" on-open=\"{{method('treeOpen')}}\" on-close=\"{{method('treeClose')}}\" lt-prop-children-value=\"{{if(cxPropLazyLoadingEnabled,'_children','children')}}\" on-before-open=\"{{method('treeBeforeOpen')}}\"> <template is=\"registerYield\" yield-name=\"content\"> <lyte-tree-content id=\"territoryTree{{listValue.id}}\"> <lyte-tree-icon data-zcqa=\"territoryTreeIcon_{{listValue.name}}\" lyte-custom-icon=\"true\"> <div class=\"collapseBox\"> <div class=\"arrow\"></div> </div> </lyte-tree-icon> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropTerritory[0].id,'!=',listValue.id),'||',cxPropSelectableOrg)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','multiple')}}\"><template case=\"true\"> <lyte-checkbox class=\"cxTerritoryCheckbox\" lt-prop-checked=\"{{cruxContains(selectedIds,listValue.id,selectedIds.length)}}\" on-before-checked=\"{{method('checkBoxBeforeChange','check',listValue.id)}}\" on-before-unchecked=\"{{method('checkBoxBeforeChange','uncheck',listValue.id)}}\" lt-prop-disabled=\"{{cruxContains(cxPropDisabledIds,listValue.id,cxPropDisabledIds.length)}}\" lt-prop-label-class=\"cxTerritoryCkboxEmptyLabel\" data-zcqa=\"territoryCheckbox_{{listValue.name}}\" lt-prop-prevent-callback-observers=\"true\"></lyte-checkbox> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowRadioButton}}\"><template case=\"true\"> <lyte-radiobutton class=\"cxTerritoryCheckbox\" lt-prop-checked=\"{{cruxContains(selectedIds,listValue.id,selectedIds.length)}}\" on-checked=\"{{method('radioCheckedTerritory',listValue.id)}}\" on-before-checked=\"{{method('radioBoxBeforeChange','check',listValue.id)}}\" on-before-unchecked=\"{{method('radioBoxBeforeChange','uncheck',listValue.id)}}\" lt-prop-disabled=\"{{cruxContains(cxPropDisabledIds,listValue.id,cxPropDisabledIds.length)}}\" lt-prop-label-class=\"cxTerritoryCkboxEmptyLabel\" lt-prop-name=\"cxTerritoryRadioButton\" lt-prop-value=\"{{listValue.id}}\" data-zcqa=\"territoryRadio_{{listValue.name}}\"></lyte-radiobutton> </template></template></template></template></template></template> <div class=\"cxTerritoryTreeValueWrapper cxFlex\"> <p class=\"cxTerritoryLabel treeValue {{if(cruxAnd(cruxContains(selectedIds,listValue.id,selectedIds.length),ifEquals(cxPropType,'single'),negate(cxPropShowRadioButton)),'pEvents','')}} {{if(cruxAnd(ifEquals(cxPropTerritory[0].id,listValue.id),negate(cxPropSelectableOrg)),'cxTerritoryNoSelect')}}\" onclick=\"{{action('selectTerritory',listValue.id,event)}}\" data-zcqa=\"cxTerritoryName_{{listValue.name}}\" lt-prop-title=\"{{if(cxPropIdvsToolTip[listValue.id],cxPropIdvsToolTip[listValue.id],listValue.cxTitle)}}\"> {{listValue.name}} </p> <template is=\"if\" value=\"{{cxPropItemYield}}\"><template case=\"true\"> <lyte-yield class=\"cxTerritoryItemYield\" yield-name=\"itemYield\" item-value=\"{{listValue}}\"></lyte-yield> </template></template> </div> </lyte-tree-content> <template is=\"if\" value=\"{{cxPropItemSuffixYield}}\"><template case=\"true\"> <lyte-yield class=\"cxTerritoryItemSuffixWrap\" yield-name=\"itemSuffixYield\" item-value=\"{{listValue}}\"></lyte-yield> </template></template> </template> </lyte-tree> </div> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <template is=\"if\" value=\"{{cxPropModalFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"modalFooterYield\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'!=','single'),'||',cxPropShowRadioButton)}}\"><template case=\"true\"> <lyte-button onclick=\"{{action('closeModal')}}\" data-zcqa=\"cx_territory_cancel\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('saveModal')}}\" data-zcqa=\"cx_territory_save\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{cxPropShowRadioButton}}\"><template case=\"true\"> {{cruxGetI18n('crm.label.assign.manually')}} </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'&amp;&amp;',cxPropValue.length)}}\"><template case=\"true\"> {{cruxGetI18n('crm.button.save')}} </template><template case=\"false\"> {{cruxGetI18n('crm.button.add')}} </template></template> </template></template> </template> </lyte-button> </template></template> </template></template> </lyte-modal-footer> </template> </lyte-modal> </template><template case=\"false\"> <div class=\"cxTerritoryTreeWrap\"> <lyte-tree lt-prop-max-level=\"{{cxPropTreeMaxLevel}}\" class=\"cxTerritoryTree\" lt-prop-data=\"{{cxPropTerritory}}\" lt-prop-open-class=\"lyteTreeOpen\" lt-prop-close-class=\"lyteTreeClose\" on-toggle=\"{{method('treeToggle')}}\" on-open=\"{{method('treeOpen')}}\" on-close=\"{{method('treeClose')}}\" on-before-open=\"{{method('treeBeforeOpen')}}\" lt-prop-children-value=\"{{if(cxPropLazyLoadingEnabled,'_children','children')}}\"> <template is=\"registerYield\" yield-name=\"content\"> <lyte-tree-content class=\"cxTerritoryTreeContentClass\" id=\"territoryTree{{listValue.id}}\"> <lyte-tree-icon lyte-custom-icon=\"true\"> <div class=\"collapseBox\"> <div class=\"arrow\"></div> </div> </lyte-tree-icon> <div class=\"cxTerritoryTreeValueWrapper cxFlex\"> <p class=\"cxTerritoryLabel treeValue {{if(cruxContains(cxPropDisabledIds,listValue.id,cxPropDisabledIds.length),'pEvents','')}}\" onclick=\"{{action('selectTerritory',listValue.id)}}\" data-zcqa=\"cxTerritoryName_{{listValue.name}}\" lt-prop-title=\"{{if(cxPropIdvsToolTip[listValue.id],cxPropIdvsToolTip[listValue.id],listValue.cxTitle)}}\">{{listValue.name}} </p> <template is=\"if\" value=\"{{cxPropItemYield}}\"><template case=\"true\"> <lyte-yield class=\"cxTerritoryItemYield\" yield-name=\"itemYield\" item-value=\"{{listValue}}\"></lyte-yield> </template></template> </div> </lyte-tree-content> <template is=\"if\" value=\"{{cxPropItemSuffixYield}}\"><template case=\"true\"> <lyte-yield class=\"cxTerritoryItemSuffixWrap\" yield-name=\"itemSuffixYield\" item-value=\"{{listValue}}\"></lyte-yield> </template></template> </template> </lyte-tree> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"registerYield","position":[3,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"text","position":[1,5,1,1]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3,3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["cxPropTerritory","cxPropType","cxPropValue","modalTitle","selectedIds","cxPropShowModal","cxPropItemYield","cxPropModelName","cxPropHeight","cxPropDisabledIds","cxPropQueryParams","cxPropCustomData","cxPropSearch","cxPropModalHeaderYield","cxPropShowRadioButton","cxPropModalFooterYield","cxPropSearchSuffixYield","cxPropShowCloseIconModal","cxPropSearchPlaceholder","cxPropAllowMultipleModal","cxPropItemSuffixYield","cxPropLazyLoadingEnabled","cxPropSelectableOrg","cxPropId","cxPropTreeMaxLevel","cxPropIdvsToolTip"],
_observedAttributesType :["array","string","array","string","array","boolean","boolean","string","string","array","object","object","string","boolean","boolean","boolean","boolean","boolean","string","boolean","boolean","boolean","boolean","string","number","object"],
 //no i18n
	data : function(){
		return {
			cxPropTerritory : Lyte.attr('array'), //no i18n
			cxPropType : Lyte.attr('string',{default : 'multiple'}), //no i18n
			cxPropValue : Lyte.attr('array'), //no i18n
			modalTitle : Lyte.attr('string'), //no i18n
			selectedIds : Lyte.attr('array',{default : []}), //no i18n
			cxPropShowModal : Lyte.attr("boolean", {default : true}),//no i18n
			cxPropItemYield : Lyte.attr("boolean", {default : false}),//no i18n
			cxPropModelName : Lyte.attr("string", {default : "territory"}),//no i18n
			cxPropHeight : Lyte.attr("string"),//no i18n
			cxPropDisabledIds : Lyte.attr('array',{default : []}), //no i18n
			cxPropQueryParams : Lyte.attr('object'), //no i18n
			cxPropCustomData : Lyte.attr('object'), //no i18n
			cxPropSearch : Lyte.attr('string',{default : 'none'}), //no i18n
			cxPropModalHeaderYield : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropShowRadioButton : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropModalFooterYield : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropSearchSuffixYield : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropShowCloseIconModal : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropSearchPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.globalsearch.search.title')}), //no i18n
			cxPropAllowMultipleModal : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropItemSuffixYield : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropLazyLoadingEnabled : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropSelectableOrg : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropId : Lyte.attr('string',{default : 'cxTerritory1'}),  //no i18n
			cxPropTreeMaxLevel : Lyte.attr('number',{default : 35}), //no i18n
			cxPropIdvsToolTip :  Lyte.attr('object', {default : {}}) //no i18n
		}		
	},
	init : function(){
		this.$node.show = function(){
			this.component.show();
		}
		this.$node.collapseTerritories = function(){
			this.component.expandCollapseFn('collapseAll');
		}
		this.$node.expandTerritories = function(){
			this.component.expandCollapseFn('expandAll');
		}
		this.$node.scrollToTerritory = function(id){
			this.component.scrollIntoTerritory(id);
		}
		this.$node.toggleTerritory = function(id,type){
			this.component.internalOperation = true
			if(type != 'check'){
				this.component.performUnCheckedOperation(id);
			}else{
				this.component.performCheckedOperation(id);
			}
			this.component.internalOperation = false
		}
		this.$node.checkTerritory = function(id){
			this.component.internalOperation = true
			this.component.performCheckedOperation(id);
			this.component.internalOperation = false
		}
		this.$node.uncheckTerritory = function(id){
			this.component.internalOperation = true
			this.component.performUnCheckedOperation(id);
			this.component.internalOperation = false
		}
		this.$node.removeTerritoryNode = function(parentId,removeTerritory){
			var terrCh = store.peekRecord('territory',parentId)._children
			var ind = terrCh.cruxFindIndexOfObject('id',removeTerritory.id);
			Lyte.arrayUtils(terrCh,'removeAt',ind);
			var contentToSearch = this
			if(this.component.data.cxPropShowModal){
				if(!this.component.modalBody){
					this.component.modalBody = this.$node.querySelector('lyte-modal').component.childComp;
				}
				contentToSearch = this.component.modalBody
			}
			if(terrCh.length == 0){
				// $L('lyte-tree')[0].showIcon($0)
				var mainTree = $L('lyte-tree',contentToSearch)[0];
				var openTree = $L('#territoryTree'+parentId,contentToSearch)[0];
				openTree = openTree.closest('lyte-tree-body');
				mainTree.removeIcon(openTree);
				//tree remove icon to be called
			}
		}
		this.$node.addTerritoryNode = function(parentId,newTerritory){
			var terrCh = store.peekRecord('territory',parentId);
			var showIcon = false;
			if(!terrCh._children){
				Lyte.objectUtils(terrCh,'add','_children',[]);
				showIcon = true;
			}
			terrCh = terrCh._children;
			Lyte.arrayUtils(terrCh,'push',newTerritory);
			if(showIcon){
				var contentToSearch = this
				if(this.component.data.cxPropShowModal){
					if(!this.component.modalBody){
						this.component.modalBody = this.$node.querySelector('lyte-modal').component.childComp;
					}
					contentToSearch = this.component.modalBody
				}
				// $L('lyte-tree')[0].showIcon($0)
				var mainTree = $L('lyte-tree',contentToSearch)[0];
				var openTree = $L('#territoryTree'+parentId,contentToSearch)[0];
				openTree = openTree.closest('lyte-tree-body');
				mainTree.showIcon(openTree);
				mainTree.openIcon(openTree.querySelector('lyte-tree-icon'));
				//tree show icon to be called
			}
		}
		this.$node.getSelected = function(){
			var arr=[]
			this.component.data.selectedIds.forEach(function(item){
				arr.push(store.peekRecord(this.component.data.cxPropModelName,item));
			}.bind(this))
			this.setData('cxPropValue',arr); //no i18n
			return arr;
		}
		this.$node.getSelectedIds = function(){
			return this.component.data.selectedIds;
		}
		this.$node.close = function(){
			this.component.closeModalPopup();
		}
		this.$node.getTreeLevel = function(){
			var contentToSearch = this
			if(this.component.data.cxPropShowModal){
				if(!this.component.modalBody){
					this.component.modalBody = this.querySelector('lyte-modal').component.childComp;
				}
				contentToSearch = this.component.modalBody
			}
			// $L('lyte-tree')[0].showIcon($0)
			var mainTree = $L('lyte-tree',contentToSearch)[0];
			return mainTree.getLevel();
		}
		this.rendered = 0;
		if(!this.data.cxPropTerritory || this.data.cxPropTerritory.length == 0){
			if(!store.peekAll(this.data.cxPropModelName) || store.peekAll(this.data.cxPropModelName).length == 0){
				store.findAll(this.data.cxPropModelName,this.data.cxPropQueryParams,undefined,undefined,this.data.cxPropCustomData).then(function(data){ //no i18n
					// this.setChildData(data);
					var req = [];
					if(data.$ && data.$.meta && data.$.meta.more_records){
						req.push(store.findAll(this.data.cxPropModelName,Object.assign({page : 2},this.data.cxPropQueryParams),undefined,undefined,this.data.cxPropCustomData))
					}
					Lyte.resolvePromises(req).then(function(){
						this.setData('cxPropTerritory',[].concat(store.peekAll(this.data.cxPropModelName)[0]));//no i18n
						if(this.data.cxPropLazyLoadingEnabled){
							this.setCollapsed(this.data.cxPropTerritory[0],true);
							// this.renderTreeNodes(this.data.cxPropTerritory[0]);
						}
					}.bind(this));
				}.bind(this));
			}else{
				this.setData('cxPropTerritory',[].concat(store.peekAll(this.data.cxPropModelName)[0]));//no i18n
				if(this.data.cxPropLazyLoadingEnabled){
					this.setCollapsed(this.data.cxPropTerritory[0],true);
					this.renderTreeNodes(this.data.cxPropTerritory[0]);
				}
			}
		}else{
			if(this.data.cxPropLazyLoadingEnabled){
				this.setCollapsed(this.data.cxPropTerritory[0],true);
				this.renderTreeNodes(this.data.cxPropTerritory[0]);
			}
		}	
	},
	didConnect : function(){
		if(this.data.cxPropLazyLoadingEnabled && !this.data.cxPropShowModal){
			this.openTerritoryTree('#territoryTree'+this.data.cxPropTerritory[0].id,this.$node)
		}
	},
	setCollapsed : function(data,set){
		var len = data.children ? data.children.length : 0;
		if(len){
			Lyte.objectUtils(data,'add','collapsed',true)
			for(var i=0;i<len;i++){
				this.setCollapsed(data.children[i],false);
				this.renderTreeNodes(data.children[i]);
			}
		}
	},
	renderTreeNodes : function(data){
		var len = data.children ? data.children.length : 0;
		// if(len > 30){
		// 	Lyte.objectUtils(data,'add','_children',data.children.slice(0,10));
		// 	var start = 10
		// 	this.renderChildren = setInterval(function(){
		// 		len = data.children ? data.children.length : 0;
		// 		Lyte.arrayUtils(data._children,'push',data.children.slice(start,start+10));
		// 		if(start >= len){
		// 			clearInterval(this.renderChildren)
		// 		}
		// 		start+=10;
		// 	}.bind(this),50);
		// }else{
			Lyte.objectUtils(data,'add','_children',data.children);
		// }
	},
	show : function(){
		if(this.data.cxPropType == 'single'){
			this.setData('modalTitle',_cruxUtils.getI18n('crm.territory.title.assign.territories')); //no i18n
		}else if(!this.data.cxPropValue || this.data.cxPropValue.length == 0){
			this.setData('modalTitle',_cruxUtils.getI18n('crm.territory.addterritory')); //no i18n
		}else{
			this.setData('modalTitle',_cruxUtils.getI18n('crm.title.edit.territory')); //no i18n
		}
		this.resetValues();
		this.$node.querySelector('lyte-modal').ltProp('show',true); //no i18n
	},
	scrollIntoTerritory : function(id){
		var contentToSearch = this.$node;
		if(this.data.cxPropShowModal){
			if(!this.modalBody){
				this.modalBody = this.$node.querySelector('lyte-modal').component.childComp;
			}
			contentToSearch = this.modalBody
		}
		
		var req = [];
		if(this.data.cxPropLazyLoadingEnabled){
			req.push(new Promise(function(resolve,reject){
				var parentIds =[]
				var currentTer = store.peekRecord(this.data.cxPropModelName,id);
				while(currentTer.id != this.data.cxPropTerritory[0].id){
				    parentIds.push(currentTer.reporting_to.id)
				    currentTer = currentTer.reporting_to
				}
				if(parentIds.length){
					var i=parentIds.length-1;
					this.openAllParents =  setInterval(function(){
						this.openTerritoryTree('#territoryTree'+parentIds[i],contentToSearch)
						i--;
						if(i<0){
							clearInterval(this.openAllParents);
							resolve();
						}
					}.bind(this),10)
				}else{
					resolve();
				}
			}.bind(this)))
		}
		Lyte.resolvePromises(req).then(function(){
			setTimeout(function(){
				var treeContent = $L('#territoryTree'+id,contentToSearch)[0];
				if(this.data.cxPropTerritory[0].id !== id || this.data.cxPropSelectableOrg){
					if(this.data.cxPropType == 'multiple'){
						treeContent.querySelector('lyte-checkbox').focus()
					}else if(this.data.cxPropShowRadioButton){
						treeContent.querySelector('lyte-radiobutton').focus()
					}
				}
				var p = treeContent.querySelector('.cxTerritoryTreeValueWrapper')
				p.classList.add('cxTerritoryHighlightElement')
				var eventFn = function(){
					p.classList.remove('cxTerritoryHighlightElement');
					p.removeEventListener('animationend',eventFn);
				}
				p.addEventListener('animationend',eventFn);
				treeContent.scrollIntoView({behavior: 'smooth'});
				var pScroll = $L(treeContent).cxGetScrollParent()
				if(pScroll){
											// setTimeout(function(){
						// 	pScroll.scrollTop = pScroll.scrollTop - 10
						// },300);
						var scrollTimeout;
						var scrollFunction = function() {
						    clearTimeout(scrollTimeout);
						    scrollTimeout = setTimeout(function() {
						    	if(this.data.cxPropShowModal){
									var pScrolBounding = pScroll.getBoundingClientRect()
									var pBounding = p.getBoundingClientRect()
									
									if((pBounding.top - pScrolBounding.top) < pScrolBounding.height/2){
										pScroll.scrollTop = pScroll.scrollTop - 50
									}

									if((pBounding.left - pScrolBounding.left) < pScrolBounding.width/2){
										pScroll.scrollLeft = pScroll.scrollLeft - 50
									}
				
								}else{
						        	pScroll.scrollTop = pScroll.scrollTop - 10
						        }
						        pScroll.removeEventListener('scroll',scrollFunction)
						    }.bind(this), 100);
						}.bind(this)
						pScroll.addEventListener('scroll', scrollFunction);
					
				}
				if(this.getMethods('onScrollToTerritoryEnd')){
					this.executeMethod('onScrollToTerritoryEnd',this,id);
				}
			}.bind(this),300);
			
		}.bind(this))
		
	},
	actions : {
		selectTerritory : function(id,event){
			if(id == this.data.cxPropTerritory[0].id && !this.data.cxPropSelectableOrg){
				return;
			}
			if(this.getMethods("onSelectTerritory")){
				this.executeMethod("onSelectTerritory", id);//No I18n
			}
			if(this.data.cxPropShowModal){
				if(this.data.cxPropType == 'multiple'){
					if(!this.internalOperation){
						this.internalOperation = true
						if(this.data.selectedIds.indexOf(id) > -1){
							this.performUnCheckedOperation(id);
						}else{
							this.performCheckedOperation(id);
						}
						this.internalOperation = false
					}
				}else if(this.data.cxPropShowRadioButton){
					if(this.data.cxPropShowRadioButton){
						$L(event.target).closest('lyte-tree-content').find('lyte-radiobutton')[0].ltProp('checked',true)
					}else{
						this.setData('selectedIds',[id])
					}
					
				}else{
					if(this.getMethods('onSelect')){
						this.executeMethod('onSelect',store.peekRecord(this.data.cxPropModelName,id)); //no i18n
					}
					this.setData('cxPropValue',[store.peekRecord(this.data.cxPropModelName,id)])
					this.closeModalPopup();
				}
			}
		},
		saveModal : function(){
			if(this.getMethods('onModalSave')){
				var arr=[]
				this.data.selectedIds.forEach(function(item){
					arr.push(store.peekRecord(this.data.cxPropModelName,item));
				}.bind(this))
				this.executeMethod('onModalSave',arr); //no i18n
			}
			this.setData('cxPropValue',arr); //no i18n
			this.closeModalPopup();
		},
		closeModal : function(){
			if(this.getMethods('onTerritoryCancel')){
				this.executeMethod('onTerritoryCancel',this);
			}else{
				this.resetValues();
			}
			this.closeModalPopup();
		}
	},
	methods : {
		radioBoxBeforeChange : function(type,id){
			if(this.data.cxPropDisabledIds.indexOf(id) > -1){
				return false;
			}
			if(type == 'check'){
				if(this.getMethods('onBeforeCheckTerritory')){
					return this.executeMethod('onBeforeCheckTerritory',this.data.selectedIds,id);
				}
			}else{
				if(this.getMethods('onBeforeUncheckTerritory')){
					return this.executeMethod('onBeforeUncheckTerritory',this.data.selectedIds,id);
				}
			}
		},
		territorySearch : function(visibleList , element , event , value , hiddenList){
			if(this.getMethods("onTerritorySearch")){
				return this.executeMethod('onTerritorySearch',visibleList , element , event , value , hiddenList);
			}
		},
		checkBoxBeforeChange : function(type,id){
			if(this.data.cxPropDisabledIds.indexOf(id) > -1){
				return false;
			}
			if(!this.internalOperation){
				setTimeout(function(){
					this.internalOperation = true
					if(type != 'check'){
						this.performUnCheckedOperation(id);
					}else{
						this.performCheckedOperation(id);
					}
					this.internalOperation = false
				}.bind(this),10);
				return false;
			}
			
			// if(type == 'check' && !this.internalOperation){
			// 	if(this.getMethods('onBeforeCheckTerritory')){
			// 		return this.executeMethod('onBeforeCheckTerritory',this.data.selectedIds,id);
			// 	}
			// }else{
			// 	if(this.getMethods('onBeforeUncheckTerritory')){
			// 		return this.executeMethod('onBeforeUncheckTerritory',this.data.selectedIds,id);
			// 	}
			// }
		},
		onModalShow : function(node){
			if(this.data.cxPropLazyLoadingEnabled){
				// Lyte.objectUtils(this.data.cxPropTerritory[0],'add','collapsed',false)
				// this.renderTreeNodes(this.data.cxPropTerritory[0]);
				this.openTerritoryTree('#territoryTree'+this.data.cxPropTerritory[0].id,node.childComp)
			}
			this.modalBody = this.$node.querySelector('lyte-modal').component.childComp;
			setTimeout(()=>{
				if(this.data.cxPropSearch == 'dropdownSearch'){
					var s = this.modalBody.querySelector('crux-territory-search');
					s.focus();
					s.setSearchValue('');
				}else{
					var s = this.modalBody.querySelector('lyte-search');
					s.focus();
					s.setValue('');
				}
			},10);
			if(this.getMethods('onTerritoryTreeModalShow')){
				this.executeMethod('onTerritoryTreeModalShow',this);
			}
		},
		scrollTerritory : function(id){
			this.scrollIntoTerritory(id);
		},
		radioCheckedTerritory : function(id){
			if(!this.internalOperation){
				this.internalOperation = true;
				this.setData('selectedIds',[id])
				this.internalOperation = false;
			}
		},
		treeToggle : function(){
			if(this.getMethods('onTerritoryTreeToggle')){
				this.executeMethod('onTerritoryTreeToggle',this);
			}
		},
		treeOpen : function(treeBody,event,tree,treeIcon,data,currentData){
			if(this.getMethods('onTerritoryTreeOpen')){
				this.executeMethod('onTerritoryTreeOpen',this,treeBody,event,tree,treeIcon,data,currentData);
			}
		},
		treeClose : function(treeBody,event,tree,treeIcon,data,currentData){
			if(this.getMethods('onTerritoryTreeClose')){
				this.executeMethod('onTerritoryTreeClose',this,treeBody,event,tree,treeIcon,data,currentData);
			}
		},
		treeBeforeOpen : function(treeBody,event,tree,treeIcon,data,node){
			// this.setCollapsed(node);
			// var len = node.children ? node.children.length : 0;
			// for(var i=0;i<len;i++){
			// 	this.renderTreeNodes(node.children[i]);
			// }
		},
		onModalClose : function(node){
			if(this.getMethods('onTerritoryModalClose')){
				this.executeMethod('onTerritoryModalClose',node)
			}
		}
	},
	closeModalPopup : function(){
		this.$node.querySelector('lyte-modal').ltProp('show',false); //no i18n
	},
	performCheckedOperation : function(id){
		var index = this.data.selectedIds.indexOf(id);
		if(index == -1 && this.data.cxPropDisabledIds.indexOf(id) == -1){
			var returnValue;
			if(this.getMethods('onBeforeCheckTerritory')){
				returnValue = this.executeMethod('onBeforeCheckTerritory',this.data.selectedIds,id);
			}
			if(typeof returnValue == 'undefined' || returnValue){
				Lyte.arrayUtils(this.data.selectedIds,'push',id); //no i18n
			}
		}
		
		var t = store.peekRecord(this.data.cxPropModelName,id);//no i18n
		if(t.children && t.children.length){
			t.children.forEach(function(item){
				this.performCheckedOperation(item.id)
			}.bind(this))
		}
	},
	performUnCheckedOperation : function(id){
		var index = this.data.selectedIds.indexOf(id);
		if(index > -1 && this.data.cxPropDisabledIds.indexOf(id) == -1){
			var returnValue;
			if(this.getMethods('onBeforeUncheckTerritory')){
				returnValue = this.executeMethod('onBeforeUncheckTerritory',this.data.selectedIds,id);
			}
			if(typeof returnValue == 'undefined' || returnValue){
				Lyte.arrayUtils(this.data.selectedIds,'removeAt',index); //no i18n
			}
		}
		var t = store.peekRecord(this.data.cxPropModelName,id);//no i18n
		if(t.children && t.children.length){
			t.children.forEach(function(item){
				this.performUnCheckedOperation(item.id)
			}.bind(this))
		}
	},
	observeValue : function(){
		this.resetValues();
	}.observes('cxPropValue.[]').on('init'), //no i18n
	resetValues : function(){
		this.internalOperation = true
		this.setData('selectedIds',[]); //no i18n
		if(this.data.cxPropValue){
			this.data.cxPropValue.forEach(function(item){
				if(item.id){
					Lyte.arrayUtils(this.data.selectedIds,'push',item.id); //no i18n
				}else{
					Lyte.arrayUtils(this.data.selectedIds,'push',item); //no i18n
				}
			}.bind(this));
		}
		this.internalOperation = false
	},
	setChildData : function(data){
		for(var i=0; i<data.length; i++){
			if(data[i].parent_id){
				var parent = store.peekRecord(this.data.cxPropModelName, data[i].parent_id);
				if(!parent._children){
					parent._children = []
				}
				parent._children.push(data[i]);
			}
		}
		this.rendered++;
		this.setChildren(data[0], 0);
	},
	maxRenderCount : 10,
	setChildren : function(data, index, set){
		if(!data._children || !data._children[index]){
			var parent = store.peekRecord(this.data.cxPropModelName, data.parent_id);//no i18n
			if(parent == undefined){
				this.lastSetTerritory = undefined;
				return;
			}
			return this.setChildren(parent, parent.lastRendered+1, set);
		}
		if(set){
			if(!data.children){
				Lyte.objectUtils(data, "add", "children", []);//No I18n
			}
			Lyte.arrayUtils(data.children, "push", data._children[index])
		}
		else{
			if(!data.children){
				data.children = [];
			}
			data.children.push(data._children[index]);			
		}
		data.lastRendered = index;
		this.rendered++;
		if(this.rendered%this.maxRenderCount != 0){
			this.setChildren(data.children[data.children.length-1], 0, set);
		}
		else{
			this.lastSetTerritory = data;
		}
	},
	expandCollapseFn : function(type){
		var contentToSearch = this.$node;
		if(this.data.cxPropShowModal){
			if(!this.modalBody){
				this.modalBody = this.$node.querySelector('lyte-modal').component.childComp;
			}
			contentToSearch = this.modalBody
		}
		var tree = $L('lyte-tree',contentToSearch)[0];
		tree[type](this.data.cxPropLazyLoadingEnabled ? {changeCollapsed : true} : {});
	},
	openTerritoryTree : function(id,context){
		var mainTree = $L('lyte-tree',context)[0];
		var openTree = $L(id,context)[0];
		openTree = openTree.closest('lyte-tree-body');
		mainTree.openTree(openTree,openTree.querySelectorAll('lyte-tree').length ? {} :  {changeCollapsed : true});
	}
});
