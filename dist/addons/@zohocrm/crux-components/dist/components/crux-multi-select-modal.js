Lyte.Component.register("crux-multi-select-modal", {
_template:"<template tag-name=\"crux-multi-select-modal\"> <lyte-modal lt-prop-show=\"{{cxPropShow}}\" lt-prop-width=\"{{cxPropModalWidth}}\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-wrapper-class=\"cxMSelModModal\" lt-prop-allow-multiple=\"true\" lt-prop=\"{{cruxStringify(cxPropModalProperties)}}\" lt-prop-show-close-button=\"false\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes.cxAriaModal}}\" on-before-show=\"{{method('beforeModalShow')}}\" on-show=\"{{method('modalShow')}}\" on-before-close=\"{{method('beforeModalClose')}}\" on-close=\"{{method('modalClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"cxMSelModHeader\"> <span class=\"cxMSelModalHeading\" data-zcqa=\"cxSelectModalHeaderText\">{{cxPropHeader}}</span> <template is=\"if\" value=\"{{cxPropHeaderNote}}\"><template case=\"true\"><lyte-yield yield-name=\"headerNotes\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropDropdownLabel}}\"><template case=\"true\"><span class=\"cxMSelModLabel\" data-zcqa=\"cxSelectModalDropdownLabel\">{{cxPropDropdownLabel}}</span></template></template> <div class=\"cxMSelModDropdownSearch {{if(cxPropDropdownLabel,'cxMSelModDropdownSearchWithLabel','')}}\"> <template is=\"if\" value=\"{{cxPropDropdownOptions}}\"><template case=\"true\"> <crux-dropdown class=\"cxMSelModDropdown\" cx-prop-options=\"{{cxPropDropdownOptions}}\" cx-prop-zcqa=\"{{cxPropDropdownZcqa}}\" cx-prop-option-zcqa=\"{{cxPropDropdownOptionZcqa}}\" cx-prop-user-value=\"{{cxPropDropdownUserValue}}\" cx-prop-system-value=\"{{cxPropDropdownSystemValue}}\" cx-prop-disabled=\"{{cxPropDropdownDisabled}}\" cx-prop-display-value=\"{{cxPropDropdownDisplayValue}}\" cx-prop-disabled-list=\"{{cxPropDropdownDisabledList}}\" cx-prop-search-placeholder=\"{{cxPropDropdownSearchPlaceholder}}\" cx-prop-class=\"{{cxPropDropdownClass}}\" cx-prop-box-button-width=\"{{cxPropDropdownBoxButtonWidth}}\" cx-prop-no-result-message=\"{{cxPropDropdownNoResultMessage}}\" cx-prop-position=\"{{cxPropDropdownPosition}}\" on-option-select=\"{{method('dropdownSelected')}}\" on-show=\"{{method('dropdownShow')}}\" on-before-show=\"{{method('dropdownBeforeShow')}}\" on-hide=\"{{method('dropdownHide')}}\" on-before-hide=\"{{method('dropdownBeforeHide')}}\"></crux-dropdown> </template></template> <lyte-input lt-prop-appearance=\"box\" class=\"cxMSelModSearch\" lt-prop-width=\"280px\" on-value-change=\"{{method('checkSearch')}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropErrorCount}}\"><template case=\"true\"> <span class=\"cxMSelModErrorMsg\" onclick=\"{{action('showErrorPopover')}}\"><span class=\"cxMSelModErrorIcon cxWarnIcon\"></span><span class=\"{{if(popoverShow,'cxMSelModErrorMsgOnPopoverOpen','')}}\">{{cruxGetI18n('crm.settings.wizard.errors.found',cxPropErrorCount)}}</span></span> </template></template> </div> </lyte-modal-header> <lyte-modal-content class=\"cxMSelModContent\"> <template is=\"if\" value=\"{{showRefrshBtn}}\"><template case=\"true\"> <div class=\"cxRefreshBtnWrap cxFlex\"> <lyte-button lt-prop-size=\"small\" lt-prop-disabled=\"{{refreshBtnIsProcess}}\" lt-prop-class=\"cxRefreshBtn\" lt-prop-appearance=\"primary\" onclick=\"{{action('refreshClicked')}}\" class=\"{{if(refreshBtnIsProcess,'cxOnRefresh')}} cxRefreshLyteBtn\"> <template is=\"registerYield\" yield-name=\"text\"> <div class=\"cxFlexCenter cxRefreshBtnTextWrap\"> <span class=\"cxRefreshIcon cxPrimaryBtnRefreshIcon\"></span> <div class=\"cxCircleLoader cxRefreshBtnLoader\"> <div class=\"cxCircleLoader1\"></div> <div class=\"cxCircleLoader2\"></div> </div> <span class=\"cxRefreshBtnText\">Refresh</span> </div> </template> </lyte-button> </div> </template></template> <lyte-table cellpadding=\"0\" cellspacing=\"0\" class=\"cxMSelModTable\" style=\"height: 200px; overflow: auto;\" onscroll=\"{{action('scrollTable',event)}}\" lt-prop-yield=\"true\"> <template is=\"yield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody class=\"cxMSelModTbody\"> <template items=\"{{dataToRender}}\" item=\"data\" index=\"index\" is=\"for\"> <lyte-tr class=\"cxMSelModTr\" id=\"{{data[cxPropSystemValue]}}\"> <lyte-td class=\"cxMSelModTd\"> <lyte-checkbox class=\"cxMSelModCheckBox\" lt-prop-label-class=\"cxMSelModCheckBoxLabel\" lt-prop-checked=\"{{data.cxSelected}}\" lt-prop-value=\"{{data[cxPropSystemValue]}}\" lt-prop-label=\"{{data[cxPropUserValue]}}\" on-checked=\"{{method('check',data)}}\" on-unchecked=\"{{method('uncheck',data)}}\" data-zcqa=\"{{data[cxPropZcqaSelector]}}\" on-before-checked=\"{{method('beforeCheck',data)}}\" on-before-unchecked=\"{{method('beforeUncheck',data)}}\"></lyte-checkbox> </lyte-td> <lyte-td class=\"cxMSelModTd\"><template is=\"component\" component-name=\"{{cxPropDynamicComponentName}}\" row-data=\"{{data}}\"></template></lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"><div class=\"cxMSelModNoResultMsg\">{{cruxGetI18n(\"crm.social.integ.no.result\")}}</div></template></template> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button onclick=\"{{action('cancel')}}\" data-zcqa=\"cxSelectModalCancel\" lt-prop-disabled=\"{{cxPropDisableCancel}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cxPropCancelText}}</template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('save')}}\" data-zcqa=\"cxSelectModalSave\" lt-prop-disabled=\"{{cxPropDisableSave}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cxPropSaveText}}</template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> <lyte-popover lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-origin-elem=\".cxMSelModErrorMsg\" lt-prop-placement=\"bottom\" lt-prop-show=\"{{lbind(popoverShow)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-yield yield-name=\"errorPopover\"></lyte-yield> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"attr","position":[1,7,1]},{"type":"if","position":[1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7,3]},{"type":"componentDynamic","position":[1,7,3]},{"type":"attr","position":[1,7,5]},{"type":"if","position":[1,7,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,0]},{"type":"component","position":[1,3,0],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropHeader","cxPropShow","cxPropHeaderNote","cxPropData","cxPropSystemValue","cxPropUserValue","cxPropDynamicComponentName","cxPropSelected","cxPropIdSelector","cxPropCancelText","cxPropSaveText","cxPropDropdownOptions","cxPropDropdownLabel","cxPropModalWidth","cxPropErrorCount","popoverShow","showNoResult","cxPropDropdownZcqa","cxPropDropdownOptionZcqa","cxPropZcqaSelector","cxPropModalProperties","cxPropAria","cxPropAriaAttributes","cxPropDisableCancel","cxPropDisableSave","cxPropSearchPlaceholder","cxPropDropdownUserValue","cxPropDropdownSystemValue","cxPropDropdownDisabled","cxPropDropdownDisplayValue","cxPropDropdownDisabledList","cxPropDropdownSearchPlaceholder","cxPropDropdownClass","cxPropDropdownBoxButtonWidth","cxPropDropdownNoResultMessage","cxPropDropdownPosition","refreshBtnIsProcess","cxPropShowRefresh","showRefrshBtn","dataToRender","cxPropRenderCount","reRender"],
_observedAttributesType :["string","boolean","boolean","array","string","string","string","array","string","string","string","array","string","string","number","boolean","boolean","string","string","string","object","boolean","object","boolean","boolean","string","string","string","boolean","string","array","string","string","string","string","string","boolean","boolean","boolean","array","number","boolean"],

	data : function(){
		_cruxUtils.addMurhyInfo("crux-multi-select-modal.js", "Feb Default Changes");
		return {
			cxPropHeader : Lyte.attr("string"),
			cxPropShow : Lyte.attr("boolean", {default : false}),
			cxPropHeaderNote : Lyte.attr("boolean", {default : false}),
			cxPropData : Lyte.attr("array"),
			cxPropSystemValue : Lyte.attr("string"),
			cxPropUserValue : Lyte.attr("string"),
			cxPropDynamicComponentName : Lyte.attr("string", {default : "input"}),
			cxPropSelected : Lyte.attr("array", {default : []}),
			cxPropIdSelector : Lyte.attr("string", {default : "id"}),
			cxPropCancelText : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.button.cancel")}),
			cxPropSaveText : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.button.save")}),
			cxPropDropdownOptions: Lyte.attr("array"),
			cxPropDropdownLabel : Lyte.attr("string"),
			cxPropModalWidth: Lyte.attr("string", {default : "650px"}),
			cxPropErrorCount : Lyte.attr("number"),
			popoverShow : Lyte.attr("boolean", {default : false}),
			showNoResult : Lyte.attr("boolean", {default : false}),
			cxPropDropdownZcqa : Lyte.attr("string"),
			cxPropDropdownOptionZcqa : Lyte.attr("string"),
			cxPropZcqaSelector : Lyte.attr("string"),
			cxPropModalProperties: Lyte.attr("object"),
			cxPropAria : Lyte.attr("boolean"),
			cxPropAriaAttributes : Lyte.attr("object"),
			cxPropDisableCancel: Lyte.attr("boolean"),
			cxPropDisableSave : Lyte.attr("boolean"),
			cxPropSearchPlaceholder : Lyte.attr("string"),
			cxPropDropdownUserValue : Lyte.attr("string"),
			cxPropDropdownSystemValue : Lyte.attr("string"),
			cxPropDropdownDisabled : Lyte.attr("boolean"),
			cxPropDropdownDisplayValue : Lyte.attr("string"),
			cxPropDropdownDisabledList : Lyte.attr("array", {default : []}),
			cxPropDropdownSearchPlaceholder : Lyte.attr("string"),
			cxPropDropdownClass : Lyte.attr("string"),
			cxPropDropdownBoxButtonWidth : Lyte.attr("string", {default : "min-button"}),
			cxPropDropdownNoResultMessage : Lyte.attr("string"),
			cxPropDropdownPosition : Lyte.attr("string"),
			refreshBtnIsProcess : Lyte.attr("boolean",{default : false}),
			cxPropShowRefresh : Lyte.attr("boolean", {default : false}),
			showRefrshBtn : Lyte.attr('boolean',{default: false}),
			dataToRender : Lyte.attr("array", {default : []}),
			cxPropRenderCount : Lyte.attr("number", {default : 50}),
			reRender : Lyte.attr("boolean", {default : true})
		};
	},
	observeData : function(){
		if(this.data.reRender){
			this.setData("dataToRender", this.data.cxPropData.slice(0, this.data.cxPropRenderCount));
			this.rendered = this.data.cxPropRenderCount;
			this.searchEndIndex = 0;
			if(this.data.cxPropData.length > this.data.cxPropRenderCount){
				this.moreContent = true;
			}
			else{
				this.moreContent = false;
			}
		}
	}.observes("cxPropData", "reRender").on("init"),
	observeSelected : function(){
		var selected = this.data.cxPropSelected ? this.data.cxPropSelected : [];
		var selectedIds = selected.map(function(sel){
			return sel[this.data.cxPropIdSelector];
		}.bind(this));
		var len = this.data.cxPropData.length;
		for(var i=0; i<len; i++){
			if(selectedIds.indexOf(this.data.cxPropData[i][this.data.cxPropIdSelector]) > -1){
				Lyte.objectUtils(this.data.cxPropData[i], "add", "cxSelected", true);
				this.data.cxPropData[i].cxSelected = true;
			}
			else{
				Lyte.objectUtils(this.data.cxPropData[i], "delete", "cxSelected");
			}
		}
	}.observes("cxPropSelected", "cxPropSelected.[]").on("init"),
	// getValue : function(){
	// 	for(var i=0; i<this.data.cxPropSelected.length; i++){
			
	// 	}
	// },
	didConnect : function(){
		this.$node.highlightRow = this.highlightRow.bind(this);
	},
	actions : {
		cancel : function(){
			var res;
			if(this.getMethods("onCancel")){
				res = this.executeMethod("onCancel");
			}
			if(res !== false){
				this.setData("cxPropShow", false);				
			}
		},
		save : function(){
			var res;
			if(this.getMethods("onSave")){
				res = this.executeMethod("onSave");
			}
			if(res !== false){
				this.setData("cxPropShow", false);				
			}
		},
		showErrorPopover : function(){
			this.setData("popoverShow", true);
		},
		refreshClicked : function(){
			this.setData("refreshBtnIsProcess" , true);
			this.throwEvent("refresh-modal");
		},
		scrollTable : function(ev){
			var body = ev.target;
			if(this.moreContent && (body.scrollHeight-300 <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop)))){
				this.moreContent = false;
				var searchVal = document.querySelector(".cxMSelModModal .cxMSelModSearch").ltProp("value");
				var more;
				if(searchVal !== ""){
					more = this.performSearch(searchVal);
				}
				else{
					more = this.data.cxPropData.slice(this.rendered, this.data.cxPropRenderCount+this.rendered);					
				}
				if(more && more.length){
					Lyte.arrayUtils(this.data.dataToRender, "push", more);
					this.rendered+=more.length;
					this.moreContent = true;
				}
			}
		}
	},
	methods : {
		check : function(item, input, comp, ev, action){
			if(action !== "script"){
				Lyte.arrayUtils(this.data.cxPropSelected, "push", item);
				if(this.getMethods("onChecked")){
					this.executeMethod("onChecked", item);
				}
			}
		},
		uncheck : function(data, input, comp, ev, action){
			if(action !== "script"){
				var len = this.data.cxPropSelected.length;
				for(var i=0; i<len; i++){
					if(this.data.cxPropSelected[i][this.data.cxPropIdSelector] === data[this.data.cxPropIdSelector]){
						Lyte.arrayUtils(this.data.cxPropSelected, "removeAt", i);
						break;
					}
				}
				if(this.getMethods("onUnchecked")){
					this.executeMethod("onUnchecked", item);
				}
			}
		},
		checkSearch : function(res){
			// if(res.length === 0){
			// 	this.setData("showNoResult", true);
			// }
			// else{
			// 	this.setData("showNoResult", false);
			// }
			var val = res.newValue;
			if(val){
				this.searchEndIndex = 0;
				this.performSearch(val, true);
			}
			else{
				this.setData("reRender", false);
				this.setData("reRender", true);
			}
			document.querySelector(".cxMSelModModal .lyteTableScroll").scrollTop = 0;
		},
		beforeModalShow : function(){
			var res;
			if(this.getMethods("onBeforeShow")){
				res = this.executeMethod("onBeforeShow");
			}
			if(res === false){
				return false;
			}
		},
		modalShow : function(){
			if(this.getMethods("onShow")){
				this.executeMethod("onShow");
			}
		},
		beforeModalClose : function(){
			var res;
			if(this.getMethods("onBeforeClose")){
				res = this.executeMethod("onBeforeClose");
			}
			if(res === false){
				return false;
			}
		},
		modalClose: function(){
			if(this.getMethods("onClose")){
				this.executeMethod("onClose");
			}
		},
		beforeCheck : function(item){
			var res;
			if(this.getMethods("onBeforeChecked")){
				res = this.executeMethod("onBeforeChecked", item);
			}
			if(res === false){
				return false;
			}
		},
		beforeUncheck : function(item){
			var res;
			if(this.getMethods("onBeforeChecked")){
				res = this.executeMethod("onBeforeChecked", item);
			}
			if(res === false){
				return false;
			}
		},
		dropdownSelected : function(ev, selected, comp, item){
			if(this.getMethods("onOptionSelected")){
				this.executeMethod("onOptionSelected", ev, selected, comp, item);
			}
		},
		dropdownShow : function(){
			if(this.getMethods("onDropdownShow")){
				this.executeMethod("onDropdownShow");
			}
		},
		dropdownBeforeShow : function(){
		_cruxUtils.addMurhyInfo("crux-multi-select-modal.js", "Feb Default Changes");
			var res;
			if(this.getMethods("dropdownBeforeShow")){
				res = this.executeMethod("onDropdownBeforeShow");
			}
			return res;
		},
		dropdownHide : function(){
			if(this.getMethods("onDropdownHide")){
				this.executeMethod("onDropdownHide");
			}
		},
		dropdownBeforeHide : function(){
			var res;
			if(this.getMethods("onDropdownBeforeHide")){
				res = this.executeMethod("onDropdownBeforeHide");
			}
			return res;
		}
	},
	observeRefresh : function(){
		if(this.data.cxPropShowRefresh){
			this.setData('showRefrshBtn',true);
			this.setData("refreshBtnIsProcess", false);
		}else{
			setTimeout(()=>{
				this.setData('showRefrshBtn',false);
				this.setData("refreshBtnIsProcess", false);
			},3000);
		}
	}.observes("cxPropShowRefresh"),
	highlightRow : function(rowId){
		var content = this.$node.querySelector("lyte-modal").component.childComp.querySelector("lyte-modal-content");
		content.classList.add("cxMSelModRefreshCompleted");
		var row = content.querySelector("lyte-tr#"+rowId);
		row.classList.add("cxMSelModHighlightRow");
		setTimeout(function(){
			row.classList.remove("cxMSelModHighlightRow");
			content.classList.remove("cxMSelModRefreshCompleted");
		}, 3000);
	},
	performSearch : function(val, setData){
		val = val.toLowerCase();
		var res = [];
		this.moreContent = false;
		var dataLen = this.data.cxPropData.length;
		for(var i=this.searchEndIndex; i<dataLen; i++){
			if(this.data.cxPropData[i][this.data.cxPropUserValue].toLowerCase().indexOf(val) > -1){
				res.push(this.data.cxPropData[i]);
				if(res.length >= this.data.cxPropRenderCount){
					this.moreContent = true;
					this.searchEndIndex = i;
					break;
				}
			}
		}
		if(setData){
			this.setData("dataToRender", res);
		}
		else{
		_cruxUtils.addMurhyInfo("crux-multi-select-modal.js", "Feb Default Changes");
			return res;
		}
	}
});
