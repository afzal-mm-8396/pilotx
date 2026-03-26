Lyte.Component.register("crux-role-component", {
_template:"<template tag-name=\"crux-role-component\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"create\"></template><template case=\"criteria\"></template><template case=\"filter\"> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadonly','')}} {{if(cruxAnd(cxPropDisabled,expHandlers(cxPropReadonly,'!')),'cxElementDisabled','')}}\"> <div @class=\"cxBoxContainsDropdown {{if(expHandlers(ifEquals(cxPropRequestModel,'role'),'&amp;&amp;',cxPropShowLookupIcon),'cxBoxWithRightIcon','')}} {{cxPropDivWrapperClass}}\"> <div class=\"{{if(ifEquals(cxPropRequestModel,'role'),'cxBoxLeftContent','')}}\"> {{addMurhyInfo(\"crux-role-component.html\",\"Feb Default Changes\")}} <lyte-dropdown id=\"{{cxPropId}}\" class=\"cxFocusableElememnt\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" on-before-show=\"{{method('onBeforeShow')}}\" on-show=\"{{method('roleDropBoxOnShow')}}\" on-hide=\"{{method('roleDropBoxOnHide')}}\" on-scroll=\"{{method(&quot;onBodyScroll&quot;)}}\" lt-prop-yield=\"true\" on-add=\"{{method('addToList')}}\" on-before-add=\"{{method('dropDownSelect')}}\" lt-prop-selected=\"{{dropdownSelected}}\" on-remove=\"{{method('removeFromList')}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-tabindex=\"14\" on-option-selected=\"{{method('roleSelected')}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-scope=\"{{cxPropScope}}\" onfocus=\"{{action('setFocusClass',true)}}\" onfocusout=\"{{action('setFocusClass')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-text data-zcqa=\"roleSelected_{{if(ifEquals(cxPropRequestModel,'role'),renderItems[0].display_label,renderItems[0].name)}}\" class=\"lyteDropdownVisible\" lt-prop-value=\"{{if(ifEquals(cxPropRequestModel,'role'),renderItems[0].display_label,renderItems[0].name)}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </template><template case=\"false\"> <ul class=\"lyteMultipleSelect\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <template is=\"for\" items=\"{{renderItems}}\" item=\"selitem\" index=\"indeval\"> <li data-value=\"{{selitem.id}}\" data-zcqa=\"roleSelected_{{if(ifEquals(cxPropRequestModel,'role'),selitem.display_label,selitem.name)}}\"> <lyte-text class=\"lyteDropdownVisible\" lt-prop-value=\"{{if(ifEquals(cxPropRequestModel,'role'),selitem.display_label,selitem.name)}}\"></lyte-text> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-search class=\"cxW100Per cxDropdownSearchInput\" lt-prop-type=\"text\" lt-prop-trim=\"true\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.cxRoleDropBody{{cxPropId}}&quot;, &quot;target&quot;:&quot;lyte-drop-item:not([selected=\\&quot;true\\&quot;])&quot;, &quot;search&quot;:&quot;lyte-drop-item:not([selected=\\&quot;true\\&quot;])&quot;}\" on-search=\"{{method('showNoResult')}}\" data-zcqa=\"cxRoleSearch\" onkeydown=\"{{action('preventDefault',this,event)}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\"></lyte-search> </li> </ul> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} </template></template> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search class=\"cxW100Per\" lt-prop-trim=\"true\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.cxRoleDropBody{{cxPropId}}&quot;, &quot;target&quot;:&quot;lyte-drop-item&quot;, &quot;search&quot;:&quot;lyte-drop-item&quot;}\" on-search=\"{{method('showNoResult')}}\" data-zcqa=\"cxRoleSearch\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-placeholder=\"{{if(expHandlers(renderItems.length,'!'),cxPropSearchPlaceholder)}}\"></lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"cxRoleDropBody{{cxPropId}}\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxRoleLoaderWrap cxAlignCenter\"> <span class=\"cxElementsLoaderBg cxRoleLoaderIcon\"></span> </div> </template><template case=\"false\"><template is=\"for\" items=\"{{systemData}}\" item=\"item\" index=\"indeval\"><template is=\"if\" value=\"{{negate(cruxContains(cxPropExcludeIds,item.id))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxContains(selectedIds,item.id)}}\"><template case=\"true\"> <lyte-drop-item data-value=\"{{item.id}}\" selected=\"true\" data-zcqa=\"cxRole_{{if(ifEquals(cxPropRequestModel,'role'),item.display_label,item.name)}}\"> <lyte-text class=\"cxVam cxDropItemHead\" lt-prop-value=\"{{if(ifEquals(cxPropRequestModel,'role'),item.display_label,item.name)}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(cxPropShowHeirarchy,'&amp;&amp;',item.reporting_to)}}\"><template case=\"true\"> <lyte-text class=\"cxDropItemChild\" lt-prop-value=\"{{getHeirachyForRole(item,true)}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{unescape(getHeirachyForRole(item))}} </template> </lyte-text> </template></template> </lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{item.id}}\" data-zcqa=\"cxRole_{{if(ifEquals(cxPropRequestModel,'role'),item.display_label,item.name)}}\"> <lyte-text class=\"cxVam cxDropItemHead\" lt-prop-value=\"{{if(ifEquals(cxPropRequestModel,'role'),item.display_label,item.name)}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(cxPropShowHeirarchy,'&amp;&amp;',item.reporting_to)}}\"><template case=\"true\"> <lyte-text class=\"cxDropItemChild\" lt-prop-value=\"{{getHeirachyForRole(item,true)}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{unescape(getHeirachyForRole(item))}} </template> </lyte-text> </template></template> <template is=\"if\" value=\"{{ifEquals(item.id,'${CURRENTUSERROLE}')}}\"><template case=\"true\"> <span class=\"cxInfoIcon cxVam mL5\" lt-prop-title=\"{{cruxGetI18n('crux.logged.in.role.definition')}}\"></span> </template></template> </lyte-drop-item> </template></template> </template></template></template> <template is=\"if\" value=\"{{expHandlers(noResult,'||',expHandlers(expHandlers(cxPropType,'!=','single'),'&amp;&amp;',expHandlers(systemData.length,'==',cruxArithResult(renderItems.length,'+',cxPropExcludeIds.length))))}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\">{{cxPropNoResultMessage}}</div> </template></template> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropRequestModel,'==','role'),'&amp;&amp;',cxPropShowLookupIcon),'&amp;&amp;',expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"> <div class=\"cxBoxRightIcon cxFlexCenter\" onclick=\"{{action('openRoleModal')}}\"> <span id=\"openRoleModal\" data-zcqa=\"cxOpenRolePopup\" class=\"{{cxPropRightIconClass}}\"></span> </div> </template></template> </div> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> <template is=\"if\" value=\"{{cxPropShowLookupIcon}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-territory cx-prop-show-modal=\"true\" cx-prop-search=\"dropdownSearch\" cx-prop-modal-header-yield=\"true\" cx-prop-disabled-ids=\"{{cxPropExcludeIds}}\" cx-prop-territory=\"{{modalContent}}\" cx-prop-type=\"{{if(expHandlers(cxPropType,'===','single'),'single','multiple')}}\" cx-prop-show-radio-button=\"true\" cx-prop-model-name=\"role\" cx-prop-selectable-org=\"true\" cx-prop-lazy-loading-enabled=\"false\" cx-prop-value=\"{{renderItems}}\" on-modal-save=\"{{method('saveRoleModal')}}\" cx-prop-search-suffix-yield=\"true\" on-territory-tree-modal-show=\"{{method('roleModalShow')}}\" on-territory-tree-open=\"{{method('roleTreeOpen',true)}}\" on-territory-tree-close=\"{{method('roleTreeOpen',false)}}\"> <template is=\"yield\" yield-name=\"modalHeaderYield\"> {{cruxGetI18n('crm.security.roles.list')}} <div class=\"cxDB cxTerritoryHeaderYieldInfo\">{{cruxGetI18n('crm.security.roles.lookup.info')}}</div> </template> <template is=\"yield\" yield-name=\"searchSuffixYield\"> <span onclick=\"{{action('expandAll')}}\" class=\"cxLink cxCP\"> <template is=\"if\" value=\"{{isCollapsed}}\"><template case=\"true\"> {{cruxGetI18n('crm.label.expand.all')}} </template><template case=\"false\"> {{cruxGetI18n('crm.label.collapse.all')}} </template></template> </span> </template> </crux-territory> </template></template> </template><template case=\"view\"> <template is=\"if\" value=\"{{cruxAnd(renderItems,renderItems.length)}}\"><template case=\"true\"><lyte-text class=\"cxVat\" lt-prop-value=\"{{if(ifEquals(cxPropRequestModel,'role'),renderItems[0].display_label,renderItems[0].name)}}\"></lyte-text></template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"create":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[],"additional":{"next":"filter"}},"filter":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"trans":true},{"type":"attr","position":[1,1,1]},{"type":"text","position":[1,1,1,1]},{"type":"attr","position":[1,1,1,3]},{"type":"registerYield","position":[1,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"componentDynamic","position":[5]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]}]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,5,3]},{"type":"componentDynamic","position":[1,5,3]},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1,1,3]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]},{"type":"registerYield","position":[3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","systemData","renderItems","cxPropValue","showLoading","noResult","cxPropId","cxPropAppearance","cxPropRequestModel","cxPropLoggedInUserRoleRequired","selectedIds","dropdownSelected","cxPropShowLookupIcon","cxPropExcludeIds","cxPropType","cxPropOptions","cxPropMaxCount","modalContent","cxPropQueryParam","cxPropCustomData","cxPropAriaErrorProperties","cxPropDivWrapperClass","cxPropShowHeirarchy","cxPropFrom","cxPropDisabled","cxPropReadonly","cxPropSearchPlaceholder","cxPropNoResultMessage","cxPropRightIconClass","isCollapsed","cxPropFreeze","cxPropScope","cxPropIgnoreEmptyValue"],
_observedAttributesType :["object","object","boolean","array","array","array","boolean","boolean","string","string","string","boolean","array","string","boolean","array","string","array","number","array","object","object","object","string","boolean","string","boolean","boolean","string","string","string","boolean","boolean","string","boolean"],
//No I18N
	data : function(){
		return {
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property used to send multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			systemData : Lyte.attr('array',{default : []}),//No I18N
			renderItems : Lyte.attr('array',{default : []}),//No I18N
			cxPropValue : Lyte.attr('array'),//No I18N
			showLoading: Lyte.attr('boolean',{default : true}),//No I18N
			noResult : Lyte.attr('boolean',{default : false}),//No I18n
			cxPropId: Lyte.attr("string", {"default": ""}), //NO I18n
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			cxPropRequestModel : Lyte.attr('string', {default : 'role'}), //no i18n
			cxPropLoggedInUserRoleRequired : Lyte.attr('boolean',{default : false}),//No I18n
			selectedIds : Lyte.attr('array',{default : []}), //no i18n
			dropdownSelected : Lyte.attr('string'), //no i18n
			cxPropShowLookupIcon : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropExcludeIds : Lyte.attr('array',{default : []}), //no i18n
			cxPropType : Lyte.attr('string',{default : 'multisearch'}), //no i18n
			cxPropOptions : Lyte.attr('array'),//no i18n
			cxPropMaxCount : Lyte.attr( 'number'), //no i18n
			modalContent : Lyte.attr('array'), //no i18n
			cxPropQueryParam : Lyte.attr('object', {default : {}}),
			cxPropCustomData : Lyte.attr('object', {default : {}}),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropShowHeirarchy: Lyte.attr('boolean',{default : true}),
			cxPropFrom: Lyte.attr('string',{default : 'view'}),
			cxPropDisabled: Lyte.attr('boolean'),
			cxPropReadonly: Lyte.attr('boolean'),
			cxPropSearchPlaceholder: Lyte.attr('string',{default: _cruxUtils.getI18n('crm.label.picklist.none')}),
			cxPropNoResultMessage : Lyte.attr("string",{"default" : _cruxUtils.getI18n('crm.label.no.options.found')}),
			cxPropRightIconClass: Lyte.attr('string',{default : 'cx_roleLookupIcon cx_roleIconPos'}),
			isCollapsed: Lyte.attr('boolean'),
			cxPropFreeze: Lyte.attr('boolean',{default : true}),
			cxPropScope: Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If set to true, mandatory validation will be ignored for empty value
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false})
		}
	},
	init : function(){
		if(!this.data.cxPropType){
			this.setData('cxPropType','multisearch'); //no i18n
		}
		if(this.data.cxPropOptions && this.data.cxPropOptions.length > 0){
			this.setData('dataFetched',true); //no i18n
			this.setData('systemData',this.data.cxPropOptions);//No I18N
			this.setData('showLoading',false);//No I18N	
		}
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		this.convertLtPropJson();
	},
	didConnect : function(){
		if(this.getData('cxPropShowLookupIcon')){
			this.territory = this.$node.querySelector('crux-territory');
			this.collapsedMap = new Map();
		}
	},
	didDestroy : function(){
		delete this.territory;
	},
	methods : {
		roleTreeOpen: function(open,comp,treeBody,event,tree,treeIcon,data,currentData){
			if(!open){
				this.collapsedMap.set(currentData.id,true);
				this.setData('isCollapsed',true);
			}else{
				this.collapsedMap.set(currentData.id,false);
				this.setData('isCollapsed',!this.getData('systemData').filter(item=>item.children).every(item=>!this.collapsedMap.has(item.id) || !this.collapsedMap.get(item.id)));
			}
		},
		saveRoleModal: function(arr){
			this.setData('renderItems',arr);
			this.setData('selectedIds',arr.map(e=>e.id));
			this.$node.querySelector('lyte-modal').ltProp('show',false); //no i18n
			if(this.getData('cxPropType') === 'single'){
				this.setData('dropdownSelected',this.data.selectedIds[0]);//no i18n
			}else{
				this.setData('dropdownSelected',JSON.stringify(this.data.selectedIds));//no i18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
		},
		roleDropBoxOnShow: function(ev, comp) {
			$L('.cxBoxWithRightIcon', this.$node).addClass('cxBoxDropdownOpened');
			if(this.getData('cxPropType') === 'single'){
				let searchComp = comp.childComp.querySelector('lyte-search');
				if(searchComp){
					searchComp.focus();
				}
			}
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, ev, comp);
			}
		},
		roleDropBoxOnHide: function(ev, comp) {
			var search = this.$node.querySelector("lyte-search");//No I18n
			search = search ? search : this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-search");//No I18n
			if(search){
				search.setValue("");//No i18n
			}
			$L('.cxBoxWithRightIcon', this.$node).removeClass('cxBoxDropdownOpened');
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, ev, comp);
			}
		},
		dropDownSelect:function(){ /* Method to override max count and manually throwing error or rejecting*/
			if(this.data.cxPropMaxCount && this.getData('renderItems').length>=this.data.cxPropMaxCount){
				if (this.data.cxPropRequestModel == 'role'){
					_cruxUtils.showCustomMessage({params : {ltPropType : 'error',ltPropDuration : 3000 ,ltPropMessage : _cruxUtils.getI18n('crux.comboBox.max.limit',this.data.cxPropMaxCount,_cruxUtils.getI18n('crm.workflow.alert.roles'))}})
				}else if (this.data.cxPropRequestModel == 'user_group'){
					_cruxUtils.showCustomMessage({params : {ltPropType : 'error',ltPropDuration : 3000 ,ltPropMessage : _cruxUtils.getI18n('crux.comboBox.max.limit',this.data.cxPropMaxCount,_cruxUtils.getI18n('crm.security.groups'))}})
				}
				return false; 
			}
			return true;
		},
		addToList:function(event,src,total){
			var search = this.$node.querySelector('lyte-search')
			search && search.setValue('');//No I18N
			var allItems  = this.getData('systemData')  //no i18n
			for(var i=0;i<allItems.length;i++){
				if(allItems[i].id == src){ // Getting the item that was currently selected.
					Lyte.arrayUtils(this.getData('renderItems'), 'push', allItems[i]); //no i18n
					Lyte.arrayUtils(this.data.selectedIds,'push',allItems[i].id); //no i18n
					break;
				}
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			this.setData('dropdownSelected',JSON.stringify(this.data.selectedIds));//no i18n
		},
		removeFromList:function(event,src,data){
			var search = this.$node.querySelector('lyte-search')
			search && search.setValue('');//No I18N
			for(var i=0;i<this.getData('renderItems').length;i++){
				if(this.getData('renderItems')[i].id == src){ // Finding the value that needs to be removed.
					Lyte.arrayUtils(this.getData('renderItems'), 'removeAt', i, 1); //no i18n
					Lyte.arrayUtils(this.data.selectedIds,'removeAt',i,1); //no i18n
				}
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			this.setData('dropdownSelected',JSON.stringify(this.data.selectedIds));//no i18n
		},
		onBeforeShow : function(event){
			if(event && event.target.getAttribute && event.target.getAttribute('id') === "openRoleModal"){
				return false;
			}
			if(!this.getData('dataFetched') && this.data.showLoading){
				this.getDatas();
				return false;
			}
		},
		showNoResult : function(visibleList ,element ,event ,value){
			var visibleListLength = visibleList.length;
			if(this.data.cxPropLoggedInUserRoleRequired){
				var logInOption = visibleList.find(a => a.getAttribute('data-value') == "${CURRENTUSERROLE}" );
				if(logInOption && value.length > 0){
					logInOption.style.display = 'none'; //Code to hide logged in user from results and handling no option found as per requirement
					visibleListLength -= 1 ;
				}else if(logInOption && value.length < 1){
					logInOption.style.display = '';
				}
			}
			this.setData('noResult',value != '' && visibleListLength == 0); //no i18n
		},
		onClose : function(component){
			component.setData('ltPropBindToBody',false); //no i18n
		},
		roleSelected : function(event,id){
			if(this.data.cxPropType == 'single'){
				this.setData('renderItems',[]);
				this.setData('selectedIds',[]);
			}
			var allItems  = this.getData('systemData')  //no i18n
			for(var i=0;i<allItems.length;i++){
				if(allItems[i].id == id){ // Getting the item that was currently selected.
					Lyte.arrayUtils(this.getData('renderItems'), 'push', allItems[i]); //no i18n
					Lyte.arrayUtils(this.data.selectedIds,'push',allItems[i].id); //no i18n
					break;
				}
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());
			}
		},
		onBodyScroll : function(){

		},
		roleModalShow: function(comp){
			this.setData('isCollapsed',false);
			comp.$node.expandTerritories();
			this.collapsedMap = new Map();
		}
	},
	actions : {
		expandAll: function(){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			if(this.data.isCollapsed){
				this.territory.expandTerritories();
				this.collapsedMap = new Map();
			}else{
				this.territory.collapseTerritories();
			}
			this.setData('isCollapsed',!this.data.isCollapsed);
		},
		setFocusClass: function(focus){
			let elem = this.$node.querySelector(".cxBoxContainsDropdown");
			if(!focus){		
				elem.classList.remove("cxBoxDropdownFocused","cxBoxInputFocused");
			}
			else{
				elem.classList.add("cxBoxDropdownFocused","cxBoxInputFocused");
			}
		},
		openRoleModal : function(){
			this.$node.querySelector('lyte-dropdown').close() //no i18n
			if(!this.getData('dataFetched')){
				this.getDatas(true);
			}else{
				this.$node.querySelector('lyte-modal').ltProp('show',true); //no i18n
			}
		},
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		onSelectRole : function(id){
			var flag =0;
			for(var i=0;i<this.getData('renderItems').length;i++){
				if(this.getData('renderItems')[i].id == id){ 
					flag =1;
				}
			}
			if(this.data.cxPropType == 'single'){
				this.setData('renderItems',[]);
				this.setData('selectedIds',[]);
			}
			if(flag == 0){
				Lyte.arrayUtils(this.getData('renderItems'), 'push', store.peekRecord(this.data.cxPropRequestModel,id)); //no i18n
				Lyte.arrayUtils(this.data.selectedIds,'push',id); //no i18n
			}
			this.$node.querySelector('lyte-modal').ltProp('show',false); //no i18n
			this.setData('dropdownSelected',JSON.stringify(this.data.selectedIds));//no i18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
		},
		closeModal : function(){
			this.$node.querySelector('lyte-modal').ltProp('show',false); //no i18n
		}
	},
	getValue : function(){
		var s=[];
		for(var i=0;i<this.getData('renderItems').length;i++){ //no i18n
			s.push({id:this.getData('renderItems')[i].id,name : this.getData('renderItems')[i].name}); //no i18n
		}
		return s;
	},
	validate : function(){
		if(this.getData('renderItems').length === 0 && !this.getData("cxPropIgnoreEmptyValue")){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));//No I18n
			return false;
		}
		return true;
	},
	setValue : function(){
		this.setData('selectedIds',[]); //no i18n
		this.setData('renderItems',[]); //no i18n
		for(var i=0;i<this.data.cxPropValue.length;i++){
			if(this.data.cxPropValue[i].id){
				Lyte.arrayUtils(this.data.renderItems,'push',store.peekRecord(this.data.cxPropRequestModel,this.data.cxPropValue[i].id) ? store.peekRecord(this.data.cxPropRequestModel,this.data.cxPropValue[i].id) : this.data.cxPropValue[i].id === "${CURRENTUSERROLE}"  ? Object.assign(this.data.cxPropValue[i],{display_label : _cruxUtils.getI18n("current.logged.in.user.role")}) : this.data.cxPropValue[i]); //no i18n
				Lyte.arrayUtils(this.data.selectedIds,'push',this.data.cxPropValue[i].id); //no i18n
			}
		}
	},
	getDatas : function(modal){
		var self=this;
		store.findAll(this.data.cxPropRequestModel,this.data.cxPropQueryParam,true,true,this.data.cxPropCustomData).then(function(res){ //No I18N
			var data = Lyte.deepCopyObject(res);
			if(self.getData('cxPropLoggedInUserRoleRequired') && !(data[0] && data[0].id == "${CURRENTUSERROLE}")){
						 Lyte.arrayUtils( data , 'insertAt' , 0 , { "name" : _cruxUtils.getI18n("current.logged.in.user.role"),"display_label" : _cruxUtils.getI18n("current.logged.in.user.role"),id:"${CURRENTUSERROLE}" });
			}
			self.setData('dataFetched',true); //no i18n
			self.setData('systemData',data);//No I18N
			self.setData('showLoading',false);//No I18N
			if(modal){
				self.$node.querySelector('lyte-modal').ltProp('show',true); //no i18n
			}else{
				self.$node.querySelector('lyte-dropdown').open()
			}		
		})
	},
	observeFrom: function(){
		if(this.getData('cxPropFrom')!=='view'){
			this.setFocusUtil();
		}
	}.observes('cxPropFrom').on('init'),
	observesModel : function(){
		this.setData('dataFetched',false);
		this.setData('systemData',[]);//No I18N
		this.setData('showLoading',true);//No I18N
		this.setData('renderItems',[]); //no i18n
		this.setData('selectedIds',[]); //no i18n
		this.setData('dropdownSelected',undefined); //no i18n
	}.observes('cxPropRequestModel'),
	observesValue : function(){
		var self = this;
		if(this.getData('cxPropValue')){
			if(!this.getData('dataFetched')){
				if(this.data.cxPropValue.length){
					for(var i =0 ; i < this.data.cxPropValue.length ; i++){
						if(this.data.cxPropValue[i].name == '${CURRENTUSERROLE}'){
							this.data.cxPropValue[i] = { "name" : _cruxUtils.getI18n("current.logged.in.user.role"),"display_label" : _cruxUtils.getI18n("current.logged.in.user.role"),id:"${CURRENTUSERROLE}" };
							break;
						}
					}
				}
				Lyte.arrayUtils(this.data.renderItems,'push',this.data.cxPropValue); //no i18n
				Lyte.arrayUtils(this.data.selectedIds,'push',this.data.cxPropValue.map((item)=>item.id)); //no i18n
				store.findAll(this.data.cxPropRequestModel,this.data.cxPropQueryParam,true,true,this.data.cxPropCustomData).then(function(res){ //No I18N
					var data = Lyte.deepCopyObject(res);
					if(self.getData('cxPropLoggedInUserRoleRequired') && !(data[0] && data[0].id == "${CURRENTUSERROLE}")){
						 Lyte.arrayUtils( data , 'insertAt' , 0 , { "name" : _cruxUtils.getI18n("current.logged.in.user.role"),"display_label" : _cruxUtils.getI18n("current.logged.in.user.role"),id:"${CURRENTUSERROLE}" });
					}
					self.setData('dataFetched',true); //no i18n
					self.setData('systemData',data);//No I18N
					self.setData('showLoading',false);//No I18N
					self.setValue();
				})
			}else{
				this.setValue();
			}
		}
	}.observes('cxPropValue.[]','cxPropRequestModel').on('init'),//No I18N
	observesSystemData : function(){
		if(this.data.dataFetched){
			let role = store.peekAll('role').filter(function(item){ return !item.reporting_to; });
			this.setData('modalContent',role);
		}
	}.observes('systemData.[]').on('init') //no i18n
}, {mixins : ["crux-element-validation"]}); //no i18n

Lyte.Component.registerHelper('getHeirachyForRole',function (item,tooltip) {
	let curr = item.reporting_to,herir='';
	while(curr){
		herir =  (tooltip ? curr.name : $ESAPI.encoder().encodeForHTML(curr.name)) + herir;
		curr = curr.reporting_to;
		if(curr){
			herir = (tooltip ? ' > ':`<span class="cxDropItemArwSep"> > </span>`)+ herir;
		}
	}
	return herir;
});
