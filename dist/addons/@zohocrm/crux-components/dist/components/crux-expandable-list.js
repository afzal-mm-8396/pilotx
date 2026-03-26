// Lyte.Component.render("crux-expandable-list", { "cxPropFrom": "create", "cxPropDisplayValue" : "full_name" }, "body")
Lyte.Component.register("crux-expandable-list", {
_template:"<template tag-name=\"crux-expandable-list\"> <template value=\"{{cxPropFrom}}\" is=\"switch\">   <template case=\"view\"> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'&amp;&amp;',cxPropValue.length)}}\"><template case=\"true\"> <div id=\"{{cxPropId}}\" class=\"cxExpListWrapper cxExpListDefWidth {{if(negate(cxPropClipMode),'cxExpListTagWrapMode','')}} {{if(expHandlers(cxPropTagType,'===','primary'),'cxExpListTag','cxExpListDefault')}}\"> <template items=\"{{listValues}}\" item=\"item\" index=\"index\" is=\"for\"> {{addMurhyInfo(\"crux-expandable-list.html\",\"Feb Default Changes\")}} {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <div style=\"{{if(expHandlers(cxPropTagType,'===','primary'),concat('background:',if(ifEquals(item.color_code,'noFill'),'transparent',concat(item.color_code,'!important')),';color:',cruxGetPicklistFontColor(item.color_code),';display:',if(item.hide,'none;','')),'')}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"{{if(cxPropTooltipClass,cxPropTooltipClass,'')}}\" class=\"cxExpListElementLi {{if(item.imageUrl,'cxExpListElemLiWithImg','')}} {{if(cxPropTriggerTagClick,'cxCP cxExpListElemLiClickable','')}} {{if(cruxOr(ifEquals(item.color_code,'noFill'),negate(item.color_code)),'cxExpListNoFillCol','')}}\" onclick=\"{{action('tagsTransition',item)}}\"> <template is=\"if\" value=\"{{item.imageUrl}}\"><template case=\"true\"><img class=\"cxExpListImg\" src=\"{{item.imageUrl}}\" alt=\"{{item.imageAlt}}\"></template></template> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-text class=\"cxExpListElemText {{cxPropTagClass}}\" lt-prop-value=\"{{item[cxPropUserValue]}}\" lt-prop-show=\"false\"></lyte-text> <template is=\"if\" value=\"{{cxPropEnableRemoveIcon}}\"><template case=\"true\"><span class=\"cxExpListElemRemoveIconWrap cxFlexCenter\" onclick=\"{{action('removePopoverItem',item,true)}}\"> <span class=\"cxCancelIcon\"></span> </span></template></template> </div> </template> <template is=\"if\" value=\"{{showMoreForMaxCount}}\"><template case=\"true\"> <div class=\"cxExpListMoreTagOpt\"> <span class=\"cxPeNone\">{{cruxGetI18n('and')}}</span> <span class=\"cxExpListMoreCount\" onclick=\"{{action('showMoreTags',event)}}\" onmouseover=\"{{action('onHoverShowMoreTags',event)}}\"> {{showMore}} {{cxPropShowmoreLabel}} </span> </div> </template></template> </div> </template></template> {{addMurhyInfo(\"crux-expandable-list.html\",\"Feb Default Changes\")}} <lyte-popover id=\"cxExpListPopover_{{cxPropId}}\" lt-prop-origin-elem=\".cxPropOnFocusTag .cxExpListMoreTagOpt\" lt-prop-freeze=\"{{cxPropFreezePopover}}\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{lbind(showLytePopover)}}\" lt-prop-type=\"box\" lt-prop-max-width=\"{{cxPropPopoverMaxWidth}}\" lt-prop-width=\"{{cxPropPopoverWidth}}\" lt-prop-duration=\"{{durationUndefined}}\" lt-prop-bind-to-body=\"true\" lt-prop-dimmer=\"{{cxPropPopoverDimmer}}\" lt-prop-close-on-scroll=\"true\" lt-prop-max-height=\"200px\" lt-prop-offset=\"{{cxPropPopoverOffset}}\" on-close=\"{{method('closePopover')}}\" on-scroll=\"{{method('updateNextSetUsers')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxExpListPopoverCont {{if(expHandlers(compType,'===','primary'),'cxExpListTag','cxExpListDefault')}}\" data-zcqa=\"cruxTagCompPopOver\" onscroll=\"{{action('updateNextSetUsers',event)}}\"> <template items=\"{{remainingValues}}\" item=\"popoverItem\" index=\"popoverIndex\" is=\"for\"> <div class=\"cxExpListPopElemWrap\"> <span class=\"cxExpListElementLi {{if(popoverItem.imageUrl,'cxExpListElemLiWithImg','')}} {{if(cxPropTriggerTagClick,'cxCP cxExpListElemLiClickable','')}} {{if(cruxOr(ifEquals(popoverItem.color_code,'noFill'),negate(popoverItem.color_code)),'cxExpListNoFillCol','')}}\" style=\"{{if(expHandlers(compType,'===','primary'),concat('background:',if(ifEquals(popoverItem.color_code,'noFill'),'transparent',concat(popoverItem.color_code,' !important')),';color:',cruxGetPicklistFontColor(popoverItem.color_code)))}}\" onclick=\"{{action('tagsTransition',popoverItem)}}\"> <template is=\"if\" value=\"{{popoverItem.imageUrl}}\"><template case=\"true\"><img class=\"cxExpListImg\" src=\"{{popoverItem.imageUrl}}\" alt=\"{{popoverItem.imageAlt}}\"></template></template> <lyte-text class=\"cxExpListElemText {{tagElemClass}}\" lt-prop-value=\"{{popoverItem[cxPropUserValue]}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropEnableRemoveIcon}}\"><template case=\"true\"><span onclick=\"{{action('removePopoverItem',popoverItem,false)}}\"></span></template></template> </span> </div> </template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\" cxFlexCenter\"> <span class=\"cxElementsLoaderBg\"></span> </div> </template></template> </lyte-popover-content> </template> </lyte-popover> </template><template case=\"create\"> <lyte-dropdown style=\"position: absolute; top: 200px; right: 450px; z-index: 11111;\" lt-prop-selected=\"{{selectedList}}\" lt-prop-yield=\"true\" lt-prop-type=\"multisearch\" lt-prop-disable-item-tooltip=\"true\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-show-remove-icon=\"true\" on-add=\"{{method('addToList')}}\" on-remove=\"{{method('removeFromList')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <ul class=\"lyteMultipleSelect cxExpListDDItemWrap\"> <template items=\"{{cxPropValue}}\" item=\"item\" index=\"index\" is=\"for\"> <li class=\"{{if(item.isError,'cxExpListDDItemError','')}}\" data-value=\"{{item}}\"> <lyte-text class=\"lyteDropdownVisible\" lt-prop-value=\"{{item}}\"> </lyte-text> <lyte-drop-remove class=\"lyteCloseIcon cxExpListDDCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input data-zcqa=\"{{cxPropSearchZcqa}}\" lt-prop-update-delay=\"{{unDef}}\" lt-prop-callback-delay=\"{{unDef}}\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" lt-prop-autocomplete=\"{{cxPropInputAutocomplete}}\" lt-prop-autofocus=\"{{cxPropInputAutofocus}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-style=\"{{cxPropInputStyle}}\" lt-prop-readonly=\"{{cxPropInputReadonly}}\" lt-prop-id=\"{{cxPropId}}\" lt-prop-class=\"{{cxPropTagClass}}\" lt-prop-type=\"{{cxPropTagType}}\" lt-prop-name=\"{{cxPropInputName}}\" lt-prop-width=\"{{cxPropWidth}}\" lt-prop-direction=\"{{cxPropInputDirection}}\" lt-prop-tab-index=\"{{cxPropDataTabindex}}\" lt-prop-close-icon=\"{{cxPropCloseIcon}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-value-change=\"{{method(&quot;searchValueChange&quot;,event)}}\" on-focus=\"{{method('onInputFocus')}}\" onkeydown=\"{{action('onKeyDown',this,event)}}\"></lyte-input> </li> </ul> </lyte-drop-button> <lyte-drop-box> <lyte-drop-body id=\"standardScrollDiv\" onscroll=\"{{action('onScroll',event,'Standard')}}\"> <template is=\"if\" value=\"{{cxPropAllowDropdown}}\"><template case=\"true\"> <div> <template items=\"{{displayData}}\" item=\"tagItem\" index=\"tagIndex\" is=\"for\"> <lyte-drop-item data-value=\"{{tagItem[cxPropDisplayValue]}}\"> <span> <lyte-text lt-prop-value=\"{{tagItem[cxPropDisplayValue]}}\"> </lyte-text> </span> </lyte-drop-item> </template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxSelectModalLoader cxFlexCenter\"> <span class=\"cxElementsLoaderBg\"></span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(noResultsMatch,'&amp;&amp;',expHandlers(displayData.length,'!'))}}\"><template case=\"true\"> <div>{{cxPropNoResultLabel}}</div> </template></template> </div> </template></template> <div class=\"cxFlexCenter\"> </div> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]},{"type":"attr","position":[5],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"expHandlers","args":["cxPropTagType","'==='","'primary'"]}},{"type":"helper","value":{"name":"concat","args":["'background:'",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["item.color_code","'noFill'"]}},"'transparent'",{"type":"helper","value":{"name":"concat","args":["item.color_code","'!important'"]}}]}},"';color:'",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["item.color_code"]}},"';display:'",{"type":"helper","value":{"name":"if","args":["item.hide","'none;'","''"]}}]}},"''"]}}}},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"text","position":[5,3]},{"type":"attr","position":[5,5]},{"type":"componentDynamic","position":[5,5]},{"type":"attr","position":[5,7]},{"type":"if","position":[5,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]},{"type":"text","position":[1,3,3]}]}},"default":{}}]}},"default":{}},{"type":"text","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"expHandlers","args":["compType","'==='","'primary'"]}},{"type":"helper","value":{"name":"concat","args":["'background:'",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["popoverItem.color_code","'noFill'"]}},"'transparent'",{"type":"helper","value":{"name":"concat","args":["popoverItem.color_code","' !important'"]}}]}},"';color:'",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["popoverItem.color_code"]}}]}}]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropValue","listValues","cxPropId","cxPropTooltip","cxPropTooltipConfig","cxPropTooltipClass","cxPropTriggerTagClick","cxPropTagClass","showMoreForMaxCount","showMore","cxPropWidth","cxPropClipMode","cxPropMaxCount","showLytePopover","cxPropCustomShowMoreCount","cxPropUserValue","loadUserBatchCnt","backUpBatch","remainingValues","batchStartIndex","cxPropEvent","cxPropTagType","cxPropFreezePopover","durationUndefined","cxPropPopoverDimmer","showLoading","cxPropPopoverOffset","cxPropFrom","displayData","cxPropDisabled","cxPropDataTabindex","cxPropAria","cxPropAriaBody","cxPropAriaButton","cxPropAriaBox","cxPropBoundary","cxPropScope","cxPropDisplayValue","cxPropInputValue","cxPropInputPlaceholder","cxPropAllowDropdown","cxPropInputAutocomplete","cxPropInputAutofocus","cxPropInputStyle","cxPropInputReadonly","cxPropInputName","cxPropInputAppearance","cxPropInputDirection","cxPropCloseIcon","cxPropMaxlength","onFocus","cxPropNoResultLabel","noResultsMatch","selectedList","cxPropCustomRequest","cxPropPopoverWidth","cxPropPopoverMaxWidth","cxPropEnableRemoveIcon","cxPropShowmoreLabel"],
_observedAttributesType :["array","array","string","string","object","string","boolean","string","boolean","number","string","boolean","number","boolean","number","string","number","array","array","number","string","string","boolean","number","object","boolean","object","string","array","boolean","string","boolean","object","object","object","object","string","string","string","string","boolean","string","boolean","string","boolean","string","string","string","boolean","number","boolean","string","boolean","array","boolean","string","string","boolean","string"],

	data : function(){
		return {
			cxPropValue: Lyte.attr("array", { default: [] }),//No I18n
			listValues: Lyte.attr("array", { default: [] }),//No I18n
			cxPropId: Lyte.attr("string", { "default": "" }), //NO i18n
			cxPropTooltip: Lyte.attr("string"),//No I18n
			cxPropTooltipConfig: Lyte.attr("object", { default: { appearance: "box" } }),//No I18n
			cxPropTooltipClass: Lyte.attr("string"),//No I18n
			cxPropTriggerTagClick: Lyte.attr("boolean", { default: false }),
			cxPropTagClass: Lyte.attr("string"),
			showMoreForMaxCount: Lyte.attr("boolean", { default: true }),
			showMore: Lyte.attr("number", { default: 0 }),//No I18n			
			cxPropWidth: Lyte.attr("string", { default: "230px" }),//No I18n
			cxPropClipMode: Lyte.attr("boolean", { default: true }),
			cxPropMaxCount: Lyte.attr("number", { default: 0 }),
			showLytePopover: Lyte.attr("boolean", { default: false }),
			cxPropCustomShowMoreCount: Lyte.attr("number", { default: 0 }),
			cxPropUserValue: Lyte.attr("string", { default: "name" }),//No I18n
			loadUserBatchCnt: Lyte.attr("number", { default: 20 }),
			backUpBatch: Lyte.attr("array", { default: [] }),//No I18n
			remainingValues: Lyte.attr("array", { default: [] }),
			batchStartIndex: Lyte.attr("number", { default: 0 }),
			cxPropEvent: Lyte.attr("string", { default: "click" }),
			cxPropTagType: Lyte.attr("string", { default: "" }),
			cxPropFreezePopover: Lyte.attr("boolean", { default: false }),
			durationUndefined: Lyte.attr("number", { default: undefined }),//NO I18n
			cxPropPopoverDimmer: Lyte.attr("object", { default: { "color": "#000", "opacity": "0" } }),
			showLoading: Lyte.attr('boolean', { default: false }),
			cxPropPopoverOffset: Lyte.attr("object", { default: {} }),

			// //Exp : The limit to the number of options the component can have i.e cxPropTagOptions
			// cxPropMaxOptionsLimit: Lyte.attr('number', { default: 0 }),
			// //Exp : The limit to the number of tag the user can create
			// cxPropMaxTagLimit: Lyte.attr('number', { default: 0 }),

// cxPropFrom = create case
			cxPropFrom: Lyte.attr("string", { default: "view" }),
			displayData: Lyte.attr("array", { default: [] }),
			cxPropDisabled: Lyte.attr('boolean', { default: false }), //NO I18N
			cxPropDataTabindex: Lyte.attr('string'),
			cxPropAria: Lyte.attr('boolean', { default: false }),
			cxPropAriaBody: Lyte.attr('object', { default: {} }),
			cxPropAriaButton: Lyte.attr('object', { default: {} }),
			cxPropAriaBox: Lyte.attr('object', { default: {} }),
			cxPropBoundary: Lyte.attr("object", { default: {} }),//no i18n
			cxPropScope: Lyte.attr('string'), //NO I18N
			cxPropDisplayValue: Lyte.attr('string'),
			cxPropInputValue: Lyte.attr('string', { default: "" }),
			cxPropInputPlaceholder: Lyte.attr('string', { default: _cruxUtils.getI18n('crm.label.enter.tag') }),
			cxPropAllowDropdown: Lyte.attr('boolean', { default: true }),

			cxPropInputAutocomplete: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropInputAutofocus: Lyte.attr('boolean', { default: false }),
			cxPropInputStyle: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropInputReadonly: Lyte.attr('boolean', { default: false }),
			cxPropInputName: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropInputAppearance: Lyte.attr("string", { default: 'box' }),//NO I18N
			cxPropInputDirection: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropCloseIcon: Lyte.attr('boolean', { default: false }),
			cxPropMaxlength: Lyte.attr('number'),
			onFocus: Lyte.attr('boolean', { default: false }),
			cxPropNoResultLabel: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.no.results.match") }),
			noResultsMatch: Lyte.attr('boolean', { default: false }),
			selectedList : Lyte.attr("array", {default : []}),
			cxPropCustomRequest: Lyte.attr('boolean', { default: false }),
			cxPropPopoverWidth: Lyte.attr("string", { default: "230px" }),//No I18n
			cxPropPopoverMaxWidth: Lyte.attr("string", { default: "230px" }),//No I18n
			cxPropEnableRemoveIcon: Lyte.attr('boolean', { default: false }),
			// cxPropMinWidth: Lyte.attr("string", { default: "230px" }),//No I18n
			cxPropShowmoreLabel: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.More") }),
		};
	},

	init: function () {
		if(this.data.cxPropFrom === "view"){
			this.$node.resize = this.resize.bind(this);
		}
		else{
			this.instances = {};
			this.instances.standard = $L.cruxLazyLoad({
				lzCustomData: { type: 'Standard' },
				lzProperties: {
					requestDetails: {
						storeReqType: 'findAll',
						storeDetails: {
							modelName: 'user',
							queryParams: this.data.cxPropQueryParams || {}
						},
						parseResponseKey: 'user'
					},
					searchRequestDetails: {
						storeReqType: 'triggerAction',
						storeDetails: {
							modelName: 'user',
							actionName: 'search',
							customData: this.data.cxPropSearchQueryParams || {}
						},
						parseResponseKey: 'users'
					},
					customRequest : this.data.cxPropCustomRequest,
					perPage: 200,
					batchSize: 50,
					triggerSearchLength: 1
				},
				lzMethods: {
					onLoadingStateUpdate: this.handleLoadingStateUpdate.bind(this),
					onNewBatch: this.onProcessNextBatch.bind(this),
					modifyRequestDetails: this.onModifyRequestParams.bind(this),
					beforeSearchRequestTriggered: this.onBeforeSearchRequest.bind(this),
					onInvalidResponse: this.handleInvalidResponse.bind(this),
					onCustomRequest: this.handleOnCustomrequest.bind(this),
				}
			});
			this.preventScroll = false;

		}
	},

	didConnect: function () {
		if (this.data.cxPropFrom === "view"){
			this.mouseOverEvent = this.mouseOverFn.bind(this);
			this.mouseLeaveEvent = this.hideTags.bind(this);
			this.clickEvent = this.clickFn.bind(this);
		}
	},

	appendFetchedUsers: function (newUsers) {
		const maxVisibleCount = 20, remainingValues = this.data.remainingValues;
		const limitedUsers = newUsers.slice(0, maxVisibleCount);
		Lyte.arrayUtils(remainingValues, "push", limitedUsers);
		Lyte.arrayUtils(this.data.backUpBatch, "push", newUsers);
		this.setData("batchStartIndex", remainingValues.length);
		this.setData("showLoading", true);
		this.ignoreScroll = false;
	},

	loadNextBatch: function () {
		const { backUpBatch, batchStartIndex, loadUserBatchCnt } = this.data;
		const maxVisibleCount = 20;
		let nextBatch = backUpBatch.slice(0, batchStartIndex + loadUserBatchCnt);
		let hasMoreUsersToLoad = batchStartIndex < backUpBatch.length;
		if (nextBatch.length > 0 && hasMoreUsersToLoad) {
			this.setData("remainingValues", []);
			Lyte.arrayUtils(this.data.remainingValues, "push", nextBatch);
			this.setData("batchStartIndex", batchStartIndex + loadUserBatchCnt);
			this.setData("loadUserBatchCnt", maxVisibleCount);
			this.setData("showLoading", false);
		} else {
			this.processInputOrFetchRecords();
		}
	},
	handleOnCustomrequest: async function (instance, queryParams) {
		if (this.getMethods("onCustomRequest")) {
			try {
				const request = await this.executeMethod("onCustomRequest", instance, queryParams);
				return request;
			} catch (err) {
				murphy.error(err);
			}
		}
	},

	handleLoadingStateUpdate: function (instance, state) {
		var showLoading = (state === "initial" || state === "scroll" || state === "search");
		this.setData('showLoading', showLoading);
	},

	onProcessNextBatch: function (instance, batch) {
		if (instance.userCustomData.type === "Standard") {
			if (this.searchingEnable === true && this.data.cxPropInputValue !== ""){
				const displayKey = this.getData("cxPropDisplayValue"), cxValue = this.getData("cxPropValue");
				const cxValueLength = cxValue.length, batchLength = batch.length;
				let uniqueItems = [], existingKeys = [], exiKeysLength = existingKeys.length;

				for (let i = 0; i < cxValueLength; i++) {
					const val = cxValue[i];
					existingKeys.push(val);
				}

				for (let i = 0; i < batchLength; i++) {
					const item = batch[i], itemKey = item[displayKey];
					let isDuplicate = false;

					for (let j = 0; j < exiKeysLength; j++) {
						if (existingKeys[j] === itemKey) {
							isDuplicate = true;
							break;
						}
					}

					if (!isDuplicate) {
						uniqueItems.push(item);
						existingKeys.push(itemKey);
					}
				}

				if (uniqueItems.length) {
					Lyte.arrayUtils(this.data.displayData, 'push', uniqueItems);
				} else{
					this.setData("noResultsMatch", true);
				}
			} else{
				Lyte.arrayUtils(this.data.displayData, "push", batch);
			}
		}
	},

	onModifyRequestParams: function (instance, details) {
		if (instance.userCustomData.type === "Standard") {
			var inputValue = this.data.cxPropInputValue;
			if (inputValue && instance.properties.isSearchReq) {
				// const criteria = this.getMethods("generateSearchCriteria") ? this.executeMethod("generateSearchCriteria", inputValue) : null;
				details.customData = this.data.cxPropSearchQueryParams || {};
				// details.customData.criteria = criteria;
				details.customData.criteria = '(((first_name:starts_with:' + inputValue + ')or(last_name:starts_with:' + inputValue + ')or(full_name:starts_with:' + inputValue + ')or(email:starts_with:' + inputValue + ')))';

				var queryParams = details.queryParams;
				for (var key in queryParams) {
					details.customData[key] = queryParams[key];
				}
			}
		}
		return details;
	},

	onBeforeSearchRequest: function (instance, requestTriggerStatus) {
		if (instance.userCustomData.type === "Standard") {
			this.setData("noResultsMatch", false); // No I18N
			if (requestTriggerStatus !== "rejected") {
				this.setData('noResultsMatch', false);
			}
		}
	},

	handleInvalidResponse: function (instance, response) {
		var isEmpty = !response || (response && response.user && !response.user.length);
		if (instance.userCustomData.type === "Standard" && isEmpty && !this.data.displayData.length) {
			this.setData("noResultsMatch", true); // No I18N
		}
		this.setData('noResultsMatch', true);
	},


	actions: {
		showMoreTags: function (event) {
			if (event.type === "click") {
				this.mouseOverFn();
			}
		},

		onHoverShowMoreTags: function (event) {
			if (event.type === "mouseover" && this.data.cxPropEvent === "hover") {
				this.mouseOverFn();
			}
		},

		tagsTransition: function (tag) {
			if (this.getMethods("onExpandableListClick")) {
				this.executeMethod("onExpandableListClick", tag.id);
			}
		},

		updateNextSetUsers: function (event) {
			if (this.ignoreScroll){
				return;
			}
			const body = event.target;
			window.requestAnimationFrame(() => {
				const isAtBottom = Math.ceil(body.scrollTop + body.clientHeight) >= body.scrollHeight;
				if (isAtBottom) {
					this.loadNextBatch();
				}
			});
		},

		removePopoverItem: function (popoverItem) {
			if (this.getMethods("onBeforeExpListRemove")) {
				const result = this.executeMethod("onBeforeExpListRemove", popoverItem);
				if (result === false){
					return false;
				}
			}
			let cxPropValue = this.data.cxPropValue;
			const index = cxPropValue.findIndex(item => item === popoverItem);
			if (index > -1) {
				Lyte.arrayUtils(cxPropValue, 'removeAt', index, 1);
			}

			if (this.getMethods("onExpListRemove")) {
				this.executeMethod("onExpListRemove", popoverItem);
			}
		},
		// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		onScroll: function (event, from) {
			if (from === "Standard") {
				this.instances.standard.performScroll(event);
			}
		},

		onKeyDown: function (_this, event) {
			if (event.key === 'Enter' && event.keyCode === 13) {
				event.preventDefault();
				const inputValue = this.getData('cxPropInputValue');
				this.processInputOrFetchRecords(inputValue);
			}
		}
	},

		findRowAndCallFixHeight: function (tr) {
			var table = document.querySelector("lyte-expresstable");
			if (table) {
				while (tr && tr.nodeName !== "LYTE-EXPTABLE-TR") {
					tr = tr.parentElement;
				}
				if (tr) {
					table.fixRowHeight(tr);
				}
			}
		},

		observeValue: function (op) {
			if (this.data.cxPropValue && this.data.cxPropValue.length && this.data.cxPropFrom === "view") {
				if (op && op.type === "change" && op.item === "cxPropClipMode") {
					this.setValueFn1({ cxPropClipMode: this.data.cxPropClipMode });
				} else {
					this.setValueFn1();
				}
			}
		}.observes("cxPropValue","cxPropValue.[]", "cxPropClipMode").on("init"),

		hideTags: function () {
			var _this = this;
			clearTimeout(this.hideTimeout);
			this.hideTimeout = setTimeout(function () {
				_this.setData("showLytePopover", false);
				_this.$node.querySelector(".cxExpListWrapper").classList.remove("cxPropOnFocusTag");
			}, 100);
		},

		resize: function (options) {
			this.setValueFn1(options);
		},

		mouseOverFn: function () {
			if (this.getMethods("onBeforeShowMoreTags") && this.executeMethod("onBeforeShowMoreTags") === false) {
				return false;
			}

			const ul = this.$node.querySelector(".cxExpListWrapper");
			if (ul.classList.contains("cxPropOnFocusTag")) {
				return;
			}

			clearTimeout(this.newTimer);

			const prevFocused = document.querySelector(".cxPropOnFocusTag");
			if (prevFocused) {
				prevFocused.classList.remove("cxPropOnFocusTag");
			}

			this.newTimer = setTimeout(() => {
				ul.classList.add("cxPropOnFocusTag");
				this.setData("showLytePopover", true);
			}, 20);
		},

		clickFn: function () {
			var tagElementList = this.$node.querySelectorAll(".cxExpListElementLi");//No I18n
			const len = tagElementList.length;
			for (var i = this.hideCount; i < len; i++) {
				tagElementList[i].style.display = "";
			}
			this.$node.querySelector(".cxExpListMoreTagOpt").style.display = "none";
			this.findRowAndCallFixHeight(this.$node);
			if (this.getMethods("onShowMoreTags")) {
				this.executeMethod("onShowMoreTags");//No I18n
			}
			this.hiddenElem = this.getData("cxPropValue").length;
			event.stopPropagation();
		},

		setValueFn1 : function(options){
			var fromResize = false;
			if(options){
				fromResize = true;
				this.setData("cxPropClipMode", options.cxPropClipMode !== undefined ? options.cxPropClipMode : this.data.cxPropClipMode);//No I18n
				this.setData("cxPropPopoverWidth", options.cxPropPopoverWidth ? options.cxPropPopoverWidth : this.data.cxPropPopoverWidth);//No I18n

				// let listValues = this.data.cxPropValue.slice(0);

				// // Apply cxPropMaxOptionsLimit: Limit number of options visible
				// if (this.data.cxPropMaxOptionsLimit && listValues.length > this.data.cxPropMaxOptionsLimit) {
				// 	listValues = listValues.slice(0, this.data.cxPropMaxOptionsLimit);
				// }
			}
			else if(!this.data.cxPropMaxCount){
				this.setData("listValues", this.data.cxPropValue.slice(0));
			}
			else{
				var listValues = this.data.cxPropValue.slice(0, this.data.cxPropMaxCount);
				var remainingValues = this.data.cxPropValue.slice(this.data.cxPropMaxCount);
				const customCount = this.data.cxPropCustomShowMoreCount;
				const maxCount = this.data.cxPropMaxCount;

				remainingValues.forEach(item => item.hide = true);

				this.setData("listValues", listValues);
				this.setData("remainingValues", remainingValues);

				// var visibleItems = customCount ? this.$node.querySelectorAll(".cxExpListElementLi:not([style*='display: none'])").length : 0;
				// var showMoreCount = customCount ? (customCount - visibleItems) : remainingValues.length;
				// if (showMoreCount < 0) {
				// 	showMoreCount = 0;
				// }

				let showMoreCount = 0;

				if (customCount && (maxCount === 0 || maxCount === undefined)) {
					showMoreCount = customCount;
				} else {
					showMoreCount = remainingValues.length;
				}

				if (showMoreCount < 0) {
					showMoreCount = 0;
				}
				this.setData("showMore", showMoreCount);
				this.setData("showMoreForMaxCount", showMoreCount > 0);
			}
			this.extraWidth = this.data.cxPropValue.length > 1 ? 6 : 3; //tag margin right width
			this.cxShowMoreHold = false;
			if(!this.data.cxPropMaxCount){
				$L.fastdom.measure(function(){
		_cruxUtils.addMurhyInfo("crux-expandable-list.js", "Feb Default Changes");
					_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
					const showMoreNode = this.$node.querySelector(".cxExpListMoreTagOpt");
					if (showMoreNode){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
						showMoreNode.style.display = "";
					}
					var child = this.$node ? this.$node.querySelectorAll(".cxExpListWrapper div") : []; //eslint-disable-line @zoho/webperf/no-complex-selector
					const childLen = child.length;
					if(!fromResize){
						this.widths = [];
						for(let i=0; i < childLen - 1; i++){
							// const style = getComputedStyle(child[i]);
							// const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
							// const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
							// const realWidth = child[i].offsetWidth - paddingX - borderX;

							// this.widths.push(realWidth + this.extraWidth);
							this.widths.push(child[i].offsetWidth+this.extraWidth);
						}				
					}
					_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
					let tagOptionWidth = 0; 
					const DoubleDigitTagCount = 12; //12 double digit tag count
					if (showMoreNode){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
						tagOptionWidth = showMoreNode.offsetWidth + DoubleDigitTagCount; //eslint-disable-line @zoho/webperf/layout-thrashing
					}
					const wrapper = this.$node.querySelector(".cxExpListWrapper");
					wrapper.style.width = this.data.cxPropWidth;
					// wrapper.style.minWidth = this.data.cxPropMinWidth;
					// wrapper.style.maxWidth = "230px";
					var width = `${wrapper.offsetWidth}px`; //eslint-disable-line @zoho/webperf/layout-thrashing
					// const allowExtraWidth = 25;
					try{
						width = Number.parseInt(width.split("px")[0]);
						// width -= allowExtraWidth;
					}catch(e){
						width = 230;
					}
					if(width !== 230 && wrapper){
						wrapper.classList.remove("cxExpListDefWidth");
					}
					var total = 0, prevWidth = 0;
					if(this.data.cxPropClipMode && this.data.cxPropValue.length !== 1){
						width = width - tagOptionWidth;
					}
					// else{
					// 	width = width-20;
					// }
					$L.fastdom.mutate(function(){
						let wrapperWidth = width;
						let i=0, hideChildren = false;
						const widthLen = this.widths.length;
						for (; i < widthLen; i++){
							if (wrapperWidth <= 0 || hideChildren){
								child[i].style.display = "none";
								continue;
							}
							total+=this.widths[i];
							if(this.data.cxPropClipMode && i === widthLen-1 && i !== 0){
								wrapperWidth = wrapperWidth + tagOptionWidth;
							}
							var minWidthNeeded = 40; //min width for tag
							if(total > wrapperWidth){
								var calc = (wrapperWidth-prevWidth);
								if(calc >= minWidthNeeded){
									this.cxShowMoreHold = true;
									var setWidth = this.widths[i]-this.extraWidth;
									var goingWidth = wrapperWidth-prevWidth-this.extraWidth;
									child[i].style.display = "";
									child[i].setAttribute("lt-prop-title", child[i].textContent);
									child[i].style.width = (goingWidth > setWidth ? setWidth : goingWidth)+"px";							
									// this.allowExtaWidth = true;
									child[i].querySelector(".cxExpListElemText").classList.add("cxExpListElemTitle"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
								}
								else{
									if(i === 0){
										hideChildren = true;
									}
									i--;
								}
								if(this.data.cxPropClipMode){
									i++;
									break;							
								}
								else{
									prevWidth = 0;
									total = 0;
								}
							}
							else{
								child[i].style.display = "";
								child[i].setAttribute("lt-prop-title", "");
								child[i].style.width = "";
								child[i].querySelector(".cxExpListElemText").classList.remove("cxExpListElemTitle"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
								prevWidth+=this.widths[i];
							}
						}
						var count = 0, remainingValues = [], values = this.data.cxPropValue, maxVisibleCount = 20, backUpBatch = [];
						const childLen = child.length;
						for (; i < childLen - 1; i++){
							child[i].style.display = "none";
							count++;
							// if (values[i] != undefined && remainingValues.length < maxVisibleCount){
							// 	remainingValues.push(values[i]);
							// }
							if (values[i] !== undefined){
								backUpBatch.push(values[i]);
								if (remainingValues.length < maxVisibleCount){
									remainingValues.push(values[i]);
								}
							}
							else{
								count--;
							}
						}
						this.setData("loadUserBatchCnt", this.data.loadUserBatchCnt + maxVisibleCount);
						this.setData("backUpBatch", [...backUpBatch]);
						_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
						if (count === 0 && showMoreNode) {
							// const elemTextList = this.$node.querySelectorAll(".cxExpListElemText");
							showMoreNode.style.display = "none";
							// if (elemTextList.length && this.allowExtaWidth && calc >= (minWidthNeeded + this.extraWidth)) {
							// 	const lastElem = elemTextList[elemTextList.length - 1], currentWidth = parseInt(lastElem.style.width, 10);
							// 	const FianllWidth = (currentWidth + allowExtraWidth) + "px";
							// 	lastElem.style.width = FianllWidth;
							// }
						}
						else{
							this.cxShowMoreHold = true;
							if (showMoreNode){
								showMoreNode.style.display = "";
							}
							// var visibleItems = this.data.cxPropCustomShowMoreCount ? this.$node.querySelectorAll(".cxExpListElementLi:not([style*='display: none'])").length : 0
							// var showMoreCount = this.data.cxPropCustomShowMoreCount ? (this.data.cxPropCustomShowMoreCount - visibleItems) : count;
							// if (showMoreCount < 0) {
							// 	showMoreCount = 0;
							// }

							const customCount = this.data.cxPropCustomShowMoreCount;
							const maxCount = this.data.cxPropMaxCount;
							let showMoreCount = 0;

							if (customCount && (maxCount === 0 || maxCount === undefined)) {
								showMoreCount = customCount;
							} else {
								showMoreCount = count;
							}

							if (showMoreCount < 0) {
								showMoreCount = 0;
							}
							this.$node.querySelector(".cxExpListMoreCount").innerText = " " + showMoreCount +" "+this.data.cxPropShowmoreLabel;
						}
						this.setData("remainingValues", remainingValues);
						if(!fromResize && this.getMethods("onAfterRender")){
							this.executeMethod("onAfterRender", this.cxShowMoreHold);
						}
					}.bind(this));
				}.bind(this));
			};
		},

		tagsTransition: function (tag) {
			if (this.data.cxPropTriggerTagClick) {
				var cvid = moduleRecordMapping ? moduleRecordMapping[this.data.cxPropModule].custom_view.id : "";
				var url, route;
		_cruxUtils.addMurhyInfo("crux-expandable-list.js", "Feb Default Changes");
				if (this.data.cxPropRedirectUrl) {
					route = Lyte.Router.getRoute(this.data.cxPropRedirectUrl);
				}
				else {
					route = { route: "crm.tab.module.custom-view.list", dynamicParams: [this.data.cxPropModule, cvid] };
				}
				if (!route.queryParams) {
					route.queryParams = {};
				}
				if (!route.queryParams) {
					route.queryParams = {};
				}
				route.queryParams.filters = JSON.stringify({ field: { id: "", api_name: "Tag" }, comparator: "equal", value: [tag] });
				url = Lyte.Router.getURL(route);
				window.open(url, "_blank");
			}
	},

	processInputOrFetchRecords: async function (inputValue) {
		let isViewFetch = this.data.cxPropFrom === "view" && this.getMethods("onScrollFetchMoreRecords");
		this.setData("showLoading", true);

		try {
			if (isViewFetch) {
				this.ignoreScroll = true;
				const fetchMethod = await this.executeMethod("onScrollFetchMoreRecords");

				if (Array.isArray(fetchMethod) && fetchMethod.length) {
					this.appendFetchedUsers(fetchMethod);
				} else if (fetchMethod && typeof fetchMethod === 'object') {
					this.appendFetchedUsers(fetchMethod);
				}
				this.ignoreScroll = false;
			} else {
				const validateMethod = this.getMethods("onInputValueValidation");
				if (!validateMethod) {
					this.setData("showLoading", false);
					return;
				}
				const result = await this.executeMethod("onInputValueValidation", inputValue);

				if (Array.isArray(result) && result.length) {
					result.forEach(item => this.pushIfNotDuplicate(item));
				} else if (result && typeof result === 'object') {
					this.pushIfNotDuplicate(result);
				}
			}
		} catch (err) {
			if (isViewFetch) {
				this.ignoreScroll = false;
			}
			murphy.error(err);
		} 
		this.setData("showLoading", false);
	},


	pushIfNotDuplicate: function (item) {
		const currentValues = this.getData('cxPropValue');
		const displayKey = this.data.cxPropDisplayValue;
		const isDuplicate = currentValues.some(val => typeof val === 'object' ? val[displayKey] === item[displayKey] : val === item[displayKey]);

		if (!isDuplicate) {
			Lyte.arrayUtils(currentValues, 'push', item[displayKey]);
			this.setData('cxPropValue', currentValues);
			this.setData('selectedList', currentValues.slice());
		}
		this.setData('cxPropInputValue', '');
	},

	methods : {
		// Functions which can be used as callback in the component.
		closePopover: function () {
			const onFocusTagNode = this.$node.querySelector(".cxPropOnFocusTag");
			setTimeout((function () {
				if(onFocusTagNode){
					onFocusTagNode.classList.remove("cxPropOnFocusTag");
				}
			}), 10);
		},
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


		//This function is used to add tag when user clicks on the dropitem // addToList: function (event, data, ltPropSelected, component, dropItem) {
		addToList: function (event, data) {
				Lyte.arrayUtils(this.getData("cxPropValue"), 'push', data);
				this.setData('cxPropInputValue', '');
		}, // removeFromList: function (event, src, selected, component, method, item) {
		removeFromList: function (event, src){
			const value = this.getData("cxPropValue"), len = value.length;
			for (let i=0; i<len ; i++){
				if (src === value[i]) {
					Lyte.arrayUtils(value, 'removeAt', i, 1); //NO I18N
					break;
				}
			}
		},
		onInputFocus: function (inputEle) {
			if (inputEle && inputEle.classList && inputEle.classList.contains("lyteInputFocus") && !this.data.onFocus) {
				this.setData("onFocus", true); //NO I18N
				this.$node.querySelector('lyte-drop-button').classList.add('cxDropButtonFocused'); //NO I18N
			}
		},

		searchValueChange: function (value, lyte_input) {
			this.searchingEnable = true;
			this.setData("displayData", []); //NO I18N
			this.setData("cxPropInputValue", lyte_input.newValue); //NO I18N
			this.instances.standard.properties.searchValue = this.data.cxPropInputValue;
			this.instances.standard.performSearch($L("#standardScrollDiv")[0]); //NO I18N
		},
	}

}, { mixins: ["crux-element-validation", "crux-aria-dropdown-mixin"] });//No I18n
