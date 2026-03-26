Lyte.Component.register("crux-select-panel", {
_template:"<template tag-name=\"crux-select-panel\"> <div class=\"parent cxSelectModalContent\" id=\"standardScrollDiv\" onscroll=\"{{action('handleScroll',event,'Standard')}}\"> <div class=\"cxSelectModalHeaderWrapper\"> <div class=\"cxSelectModSearchWrap cxBoxWithRightIcon\"> <template is=\"if\" value=\"{{cxPropEnableDropdown}}\"><template case=\"true\"><crux-dropdown cx-prop-zcqa=\"{{cxPropFilterZcqa}}\" cx-prop-options=\"{{cxPropFilterOptions}}\" cx-prop-user-value=\"{{cxPropFilterUserValue}}\" cx-prop-system-value=\"{{cxPropFilterSystemValue}}\" cx-prop-selected=\"{{lbind(filterSelectedValue)}}\" on-option-select=\"{{method('applyFilterSelection')}}\" on-show=\"{{method('onInputFocus')}}\" on-hide=\"{{method('onInputBlur')}}\"></crux-dropdown></template></template> <template is=\"if\" value=\"{{showLyteSearch}}\"><template case=\"true\"><lyte-search id=\"cxUserSearch\" data-zcqa=\"{{cxPropSearchZcqa}}\" class=\"cxSelectModUserSearch\" lt-prop-appearance=\"box\" lt-prop-component=\"accordion\" lt-prop-value=\"{{lbind(searchInputValue)}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-accordion.cxSearchParent&quot;, &quot;search&quot;:&quot;div.cxSearchChild&quot;}\" lt-prop-placeholder=\"{{cxPropGroupPlaceholder}}\" lt-prop-close-icon=\"{{searchCloseIcon}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-search=\"{{method('searchGroup')}}\" on-after-search=\"{{method('afterSearchGroup')}}\" on-focus=\"{{method('onInputFocus')}}\" on-blur=\"{{method('onInputBlur')}}\"></lyte-search></template><template case=\"false\"><lyte-input data-zcqa=\"{{cxPropSearchZcqa}}\" lt-prop-width=\"100%\" lt-prop-appearance=\"box\" lt-prop-callback-delay=\"100\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-value=\"{{lbind(standardInputValue)}}\" lt-prop-autocomplete=\"{{cxPropInputAutocomplete}}\" lt-prop-autofocus=\"{{cxPropInputAutofocus}}\" lt-prop-disabled=\"{{cxPropInputDisabled}}\" lt-prop-style=\"{{cxPropInputStyle}}\" lt-prop-readonly=\"{{cxPropInputReadonly}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-type=\"{{cxPropInputType}}\" lt-prop-name=\"{{cxPropInputName}}\" lt-prop-direction=\"{{cxPropInputDirection}}\" lt-prop-tab-index=\"{{cxPropInputTabindex}}\" lt-prop-close-icon=\"{{searchCloseIcon}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-value-change=\"{{method(&quot;searchValueChange&quot;,event)}}\" on-focus=\"{{method('onInputFocus')}}\" on-blur=\"{{method('onInputBlur')}}\"></lyte-input></template></template> </div> <template is=\"if\" value=\"{{cxPropShowSelectAll}}\"><template case=\"true\"><div class=\"cxSelectModalExpModFilterDivWrap cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{addMoreUsers}}\"><template case=\"true\"> <template is=\"if\" value=\"{{selectSingleUsers.length}}\"><template case=\"true\"><lyte-text lt-prop-yield=\"true\" class=\"cxSelModUsrLabel\" lt-prop-value=\"{{if(cxPropSelectedUsersLabel,cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{selectSingleUsers.length}} <span>{{expHandlers(cxPropSelectedUsersLabel,'?:',cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}</span> </template> </lyte-text></template></template> <template is=\"if\" value=\"{{selectSingleUsers.length}}\"><template case=\"true\"><lyte-text lt-prop-value=\"{{if(cxPropAddMoreUsersLabel,cxPropAddMoreUsersLabel,cruxGetI18n('crm.module.addmore'))}}\" class=\"cxSelModUsrSelActionBtn\" data-zcqa=\"{{cxPropAddMoreZcqa}}\" onclick=\"{{action('addUsersToList')}}\"></lyte-text></template></template> </template><template case=\"false\"> <lyte-checkbox id=\"cxSelectAll\" data-zcqa=\"{{cxPropSelectAllZcqa}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-label=\"{{selectAllLabel}}\" lt-prop-checked=\"{{checkBoxChecked}}\" lt-prop-disabled=\"{{cruxOr(cxPropDisableSelectAllChkBox,selectAllDiasbleCheckbox)}}\" lt-prop-title=\"{{cxPropSelectAllTitle}}\" on-changed=\"{{method('selectAllUsers')}}\" on-before-checked=\"{{method('validateSelectAllBeforeCheck','selectAll')}}\" on-before-unchecked=\"{{method('validateSelectAllBeforeUncheck','selectAll')}}\"></lyte-checkbox> <template is=\"if\" value=\"{{allUsers}}\"><template case=\"true\"> <template is=\"if\" value=\"{{selectSingleUsers.length}}\"><template case=\"true\"><lyte-text lt-prop-yield=\"true\" class=\"cxSelModUsrLabel\" lt-prop-value=\"{{if(cxPropSelectedUsersLabel,cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{selectSingleUsers.length}} <span>{{expHandlers(cxPropSelectedUsersLabel,'?:',cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}</span> </template> </lyte-text></template></template> <template is=\"if\" value=\"{{cxPropEnableMarkusers}}\"><template case=\"true\"> <lyte-text class=\"cxSelModUsrSelActionBtn\" data-zcqa=\"{{cxPropSelectAllInViewZcqa}}\" lt-prop-value=\"{{if(cxPropSelectAllUsersLabel,cxPropSelectAllUsersLabel,cruxGetI18n('crux.select.all.users'))}}\" onclick=\"{{action('markSelectedUsers','')}}\"></lyte-text> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{noOfUsers}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropEnableDisplayusers}}\"><template case=\"true\"> <template is=\"if\" value=\"{{selectSingleUsers.length}}\"><template case=\"true\"><lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{expHandlers(cxPropSelectedUsersLabel,'?:',cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}\" class=\"cxSelModUsrSelActionBtn\" data-zcqa=\"{{cxPropDisplaySelectedZcqa}}\" onclick=\"{{action('displaySelectedUsers')}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{selectSingleUsers.length}} <span>{{expHandlers(cxPropSelectedUsersLabel,'?:',cxPropSelectedUsersLabel,cruxGetI18n('crux.users.selected'))}}</span> </template> </lyte-text></template></template> </template></template> </template></template></template></template> </template></template> </div></template></template> </div> <div class=\"cxSelectModalContainer\"> <lyte-accordion class=\"cxSearchParent cxSortable {{if(allScrollCss,'cxSelectModalAccDragSel','')}}\" lt-prop-exclusive=\"false\" on-before-close=\"{{method(&quot;preventClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template items=\"{{displayData}}\" item=\"item\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.show,'&amp;&amp;',expHandlers(showSelectedView,'!')),'||',expHandlers(expHandlers(item.selectedList.length,'>',0),'&amp;&amp;',showSelectedView))}}\"><template case=\"true\"> <lyte-accordion-item class=\"lyteAccordionActive cxSelectModalGroupContainer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.cxPropType,'===','group'),'||',expHandlers(item.cxPropType,'===','accordion'))}}\"><template case=\"true\"><lyte-accordion-header> <template is=\"if\" value=\"{{expHandlers(item.cxPropType,'===','accordion')}}\"><template case=\"true\"><lyte-icon class=\"cxFlexCenter\"> <span class=\"cxAccArwIcon cxArrowIcon cxPeNone\"></span> </lyte-icon></template></template> <template is=\"if\" value=\"{{item.cxPropLabel}}\"><template case=\"true\"><lyte-checkbox id=\"cxGroupSelectAll\" @class=\"{{item.partialClass}} cxSelModGroupNameCheckbox\" lt-prop-yield=\"true\" lt-prop-prevent-callback-observers=\"false\" lt-prop-checked=\"{{item.groupCheckBoxChecked}}\" lt-prop-disabled=\"{{cruxOr(item.cxDisableGroupChkBox,groupSelectAllDiasbleCheckbox)}}\" lt-prop-title=\"{{item.cxGroupTitle}}\" on-changed=\"{{method('manageGroupUsers',item,item.cxData)}}\" on-before-checked=\"{{method('validateGroupBeforeCheck','groupSelectAll',item,item.cxData,item.cxName,item.selectedList)}}\" on-before-unchecked=\"{{method('validateGroupBeforeUncheck','groupSelectAll',item,item.cxData,item.cxName,item.selectedList)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <div class=\"cxSelectModalGroupNameWrap\"> <div class=\"cxSelectModalGroupName\">{{item.cxPropLabel}}</div> <template is=\"if\" value=\"{{item.cxGroupYield}}\"><template case=\"true\"><lyte-yield yield-name=\"cxGroupFieldYield\" field-obj=\"{{item}}\"></lyte-yield></template></template> </div> </template> </lyte-checkbox></template></template> </lyte-accordion-header></template></template> <lyte-accordion-body class=\"cxDraggableElement cxSelectModalAccBody\" style=\"width: auto;\"> <template items=\"{{item.cxData}}\" item=\"childItem\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{checkSelected(showSelectedView,childItem)}}\"><template case=\"true\"><div class=\"cxSearchChild cxSelectModalcheckboxWrapper {{if(cruxContains(selectSingleUsers,childItem.id,selectSingleUsers.length),'','restrictDraggable')}}\"> <span class=\"cxDragIcon cxSelectModalDragIcon\"></span> <lyte-checkbox data-zcqa=\"{{cxPropCheckboxZcqa}}_{{childItem.id}}\" @class=\"cxSelectModalCheckbox {{cruxReplace(item.cxName,' ','_')}}_chckBox\" id=\"{{childItem.id}}\" lt-prop-yield=\"true\" lt-prop-checked=\"{{cruxOr(selectedAllUserInthisview,cruxContains(selectSingleUsers,childItem.id,selectSingleUsers.length))}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-disabled=\"{{cruxOr(childItem.cxDisableChkBox,cxPropDiasbleCheckbox)}}\" lt-prop-title=\"{{childItem.cxTitle}}\" lt-prop-tooltip-config=\"{{childItem.cxTooltipConfig}}\" on-unchecked=\"{{method('unselectedUsers',item,item.cxData,childItem,index,item.selectedList,childSelectAll)}}\" on-checked=\"{{method('selectedUsers',item,item.cxData,childItem,index,item.selectedList,childSelectAll)}}\" on-before-checked=\"{{method('validateBeforeCheck','childSelectAll',item,item.cxData,childItem,item.selectedList,index)}}\" on-before-unchecked=\"{{method('validateBeforeUncheck','childSelectAll',item,item.cxData,childItem,item.selectedList,index)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <div class=\"cxSelectModalNameAndEmailWrapper\"> <template is=\"if\" value=\"{{cxPropEnableImg}}\"><template case=\"true\"> <template is=\"if\" value=\"{{childItem[cxPropDisplayValue.cxImage]}}\"><template case=\"true\"><img alt=\"{{imgAltKey}}\" src=\"{{childItem[cxPropDisplayValue.cxImage]}}\" class=\"cxSelectModalUserImage\"></template><template case=\"false\"><span class=\"cxSelctModalNoUserPhoto\"></span></template></template> </template></template> <div class=\"cxSelectModalNameAndEmailText\"> <template is=\"if\" value=\"{{childItem[cxPropDisplayValue.cxDisplayLabel]}}\"><template case=\"true\"><lyte-text class=\"cxSelModalDisplayLabel\" data-zcqa=\"{{cxPropCheckboxZcqa}}_{{childItem.id}}_displayLabel\" lt-prop-value=\"{{childItem[cxPropDisplayValue.cxDisplayLabel]}}\"></lyte-text></template></template> <template is=\"if\" value=\"{{childItem[cxPropDisplayValue.cxEmailLabel]}}\"><template case=\"true\"><lyte-text class=\"cxSelModalDisplayMail\" data-zcqa=\"{{cxPropCheckboxZcqa}}_{{childItem.id}}_email\" lt-prop-value=\"{{childItem[cxPropDisplayValue.cxEmailLabel]}}\"></lyte-text></template></template> </div> <template is=\"if\" value=\"{{childItem.cxYield}}\"><template case=\"true\"><lyte-yield class=\"cxSelModYield\" yield-name=\"cxFieldYield\" field-obj=\"{{childItem}}\"></lyte-yield></template></template> </div> </template> </lyte-checkbox> </div></template></template> </template> </lyte-accordion-body> </lyte-accordion-item> </template></template> </template> </template> </lyte-accordion> </div> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxSelectModalLoader cxFlexCenter\"> <span class=\"cxElementsLoaderBg\"></span> </div> </template></template> <template is=\"if\" value=\"{{noResultsMatch}}\"><template case=\"true\"> <div class=\"cxSelectModalNoResult cxColListNoResult {{if(negate(buttonsDisable),'cxSelModWoutFooterNoRes','')}}\">{{cxPropNoResultLabel}}</div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"trans":true},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,3],"trans":true},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}],
_observedAttributes :["cxPropData","displayData","standardInputValue","updateDelay","cxPropDiasbleCheckbox","selectSingleUsers","cxPropInputAutocomplete","cxPropInputAutofocus","cxPropInputDisabled","cxPropInputStyle","cxPropInputReadonly","cxPropInputId","cxPropInputClass","cxPropInputType","cxPropInputName","cxPropInputWidth","cxPropInputAppearance","cxPropInputDirection","cxPropInputTabindex","cxPropFilterOptions","cxPropFilterUserValue","cxPropFilterSystemValue","cxPropDisplayValue","viewType","selectedAllUserInthisview","cxPropAllCheckBoxLabel","selectAllLabel","noOfUsers","addMoreUsers","allUsers","cxPropQueryParams","selectedOption","cxPropSortEnable","showSelectedView","showLoading","cxPropSelected","cxPropShowSelectAll","selectedUserCount","groupSelectAll","groupUsers","hideGroupButton","checkBoxChecked","showLyteSearch","cxPropGroupPlaceholder","cxPropPlaceholder","selectAllDiasbleCheckbox","groupSelectAllDiasbleCheckbox","searchApplied","noResultsMatch","cxPropNoResultLabel","cxPropSearchQueryParams","allScrollCss","searchCloseIcon","cxPropMaxlength","cxPropFilterZcqa","cxPropSearchZcqa","cxPropAddMoreZcqa","cxPropSelectAllZcqa","cxPropSelectAllInViewZcqa","cxPropDisplaySelectedZcqa","cxPropCheckboxZcqa","filterSelectedValue","imgAltKey","cxPropEnableImg","cxPropCustomRequest","cxPropFreeze","cxPropShowCloseButton","cxPropHeight","cxPropSelectedUsersLabel","cxPropAddMoreUsersLabel","cxPropSelectAllUsersLabel","searchInputValue","cxPropModalWrapCls","cxPropElevateSelected","cxPropDisableSelectAllChkBox","cxPropSelectAllTitle","cxPropDimmer","cxPropEnableDropdown","cxPropEnableMarkusers","cxPropEnableDisplayusers"],
_observedAttributesType :["array","array","string","number","boolean","array","string","boolean","boolean","string","boolean","string","string","string","string","string","string","string","string","array","string","string","object","string","boolean","string","string","boolean","boolean","boolean","object","string","boolean","boolean","boolean","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","string","string","boolean","boolean","boolean","boolean","string","object","boolean","boolean","number","string","string","string","string","string","string","string","string","string","boolean","boolean","boolean","boolean","string","string","string","string","string","string","boolean","boolean","string","object","boolean","boolean","boolean"],

	data: function () {
		return {
			cxPropData: Lyte.attr('array', { "default": [] }), //NO I18N
			displayData: Lyte.attr('array', { "default": [] }), //NO I18N
			standardInputValue: Lyte.attr("string", { default: '' }),
			updateDelay: Lyte.attr("number", { "default": 100 }), //NO I18N

			cxPropDiasbleCheckbox: Lyte.attr('boolean', { default: false }), //NO I18N
			selectSingleUsers: Lyte.attr('array', { "default": [] }), //NO I18N

			cxPropInputAutocomplete: Lyte.attr("string", { "default": 'off' }), //NO I18n
			cxPropInputAutofocus: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputDisabled: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputStyle: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputReadonly: Lyte.attr("boolean", { "default": false }), //NO I18n
			cxPropInputId: Lyte.attr("string", { "default": 'inputId' }), //NO I18n
			cxPropInputClass: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputType: Lyte.attr("string", { "default": 'search' }), //NO I18n
			cxPropInputName: Lyte.attr("string", { "default": '' }), //NO I18n
			cxPropInputWidth: Lyte.attr("string", { "default": 'auto' }), //NO I18n
			cxPropInputAppearance: Lyte.attr("string", { "default": 'box' }), //NO I18n
			cxPropInputDirection: Lyte.attr("string", { "default": 'vertical' }), //NO I18n
			cxPropInputTabindex: Lyte.attr('string', { "default": '0' }), //NO I18n

			cxPropFilterOptions: Lyte.attr('array'), //NO I18n
			cxPropFilterUserValue: Lyte.attr('string', { "default": 'category' }), //NO I18n
			cxPropFilterSystemValue: Lyte.attr('string', { "default": 'id' }), //NO I18n
			cxPropDisplayValue: Lyte.attr('object', { default: {cxImage: "image_link", cxDisplayLabel: "full_name", cxEmailLabel: "email"} }),
			// cxPropSystemValue		: Lyte.attr('string'),
			viewType: Lyte.attr('string', { default: "nonUser" }),
			selectedAllUserInthisview: Lyte.attr('boolean', { default: false }),
			cxPropAllCheckBoxLabel: Lyte.attr('string', { "default": _cruxUtils.getI18n("crm.zia.vision.select.all") }), //NO I18n
			selectAllLabel: Lyte.attr('string', { "default": _cruxUtils.getI18n("crm.zia.vision.select.all") }), //NO I18n
			// originalData: Lyte.attr('array', { "default": [] }), //NO I18N
			noOfUsers: Lyte.attr('boolean', { default: false }),
			addMoreUsers: Lyte.attr('boolean', { default: false }),
			allUsers: Lyte.attr('boolean', { default: false }), //NO I18N
			// allUsersSelected : Lyte.attr('boolean', {default: false}), //NO I18N

			cxPropQueryParams: Lyte.attr('object', { "default": {} }),
			selectedOption: Lyte.attr('string', { default: '' }),
			cxPropSortEnable: Lyte.attr('boolean', { default: false }),
			showSelectedView: Lyte.attr('boolean', { default: false }),
			showLoading: Lyte.attr('boolean', { default: false }),
			cxPropSelected: Lyte.attr('array', { "default": [] }), //NO I18N
			cxPropShowSelectAll: Lyte.attr('boolean', { default: false }),
			selectedUserCount: Lyte.attr('boolean', { default: false }),
			groupSelectAll: Lyte.attr('boolean', { default: false }),
			groupUsers: Lyte.attr('boolean', { default: false }),
			// disableSortData : Lyte.attr('boolean', {default: true}),
			hideGroupButton: Lyte.attr('boolean', { default: true }),
			checkBoxChecked: Lyte.attr('boolean', { default: false }),
			showLyteSearch: Lyte.attr('boolean', { default: false }),
			cxPropGroupPlaceholder: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.globalsearch.search.title") }),
			cxPropPlaceholder: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.search.for.users") }),
			selectAllDiasbleCheckbox: Lyte.attr('boolean', { default: false }),
			groupSelectAllDiasbleCheckbox: Lyte.attr('boolean', { default: false }),
			searchApplied: Lyte.attr('boolean', { default: false }),
			noResultsMatch: Lyte.attr('boolean', { default: false }),
			cxPropNoResultLabel: Lyte.attr('string', { default: _cruxUtils.getI18n("crm.label.no.results.match") }),
			cxPropSearchQueryParams: Lyte.attr('object', { "default": { type: 'AllUsers' } }),
			allScrollCss : Lyte.attr('boolean', { default: false }),
			searchCloseIcon: Lyte.attr('boolean', { default: false }),
			cxPropMaxlength: Lyte.attr('number'),
			// cxPropMinSelectUser: Lyte.attr('number'),
			cxPropFilterZcqa: Lyte.attr('string', { default: "filterZcqa" }),
			cxPropSearchZcqa: Lyte.attr('string', { default: "searchZcqa" }),
			cxPropAddMoreZcqa: Lyte.attr('string', { default: "addMoreZcqa" }),
			cxPropSelectAllZcqa: Lyte.attr('string', { default: "selectAllZcqa" }),
			cxPropSelectAllInViewZcqa: Lyte.attr('string', { default: "selectAllInViewZcqa" }),
			cxPropDisplaySelectedZcqa: Lyte.attr('string', { default: "displaySelectedZcqa" }),
			cxPropCheckboxZcqa: Lyte.attr('string', { default: "checkboxZcqa" }),
			filterSelectedValue: Lyte.attr('string', { default: "" }),
			imgAltKey: Lyte.attr('string', { default: "User Image" }),
			cxPropEnableImg: Lyte.attr('boolean', { default: false }),
			cxPropCustomRequest: Lyte.attr('boolean', { default: false }),

			cxPropFreeze: Lyte.attr('boolean'),
			cxPropShowCloseButton: Lyte.attr('boolean', { default: false }),
			cxPropHeight: Lyte.attr('string'),
			cxPropSelectedUsersLabel: Lyte.attr('string', { default: "" }),
			cxPropAddMoreUsersLabel: Lyte.attr('string', { default: "" }),
			cxPropSelectAllUsersLabel: Lyte.attr('string', { default: "" }),
			searchInputValue: Lyte.attr('string', { default: "" }),
			cxPropModalWrapCls: Lyte.attr('string', { default: "" }),
			cxPropElevateSelected: Lyte.attr('boolean', { default: true }),
			cxPropDisableSelectAllChkBox: Lyte.attr('boolean', { default: false }),
			cxPropSelectAllTitle: Lyte.attr('string', { default: "" }),
			cxPropDimmer: Lyte.attr('object'),
			cxPropEnableDropdown: Lyte.attr('boolean', { default: true }),
			cxPropEnableMarkusers: Lyte.attr('boolean', { default: true }),
			cxPropEnableDisplayusers: Lyte.attr('boolean', { default: true })
		};
	},
	observeCxPropData : function(){
		var processedData = this.preProcessData(this.data.cxPropData);
		this.setData('displayData', processedData);
		this.syncSelectedValues();
	}.observes('cxPropData.[]').on('init'),
	observeSelectedValue: function () {
		this.syncSelectedValues();		
	}.observes('cxPropSelected.[]'),
	syncSelectedValues: function(){
		const cxPropSelected = this.data.cxPropSelected;
		if (cxPropSelected && cxPropSelected.length) {
			this.data.showLyteSearch ? this.handlePreSelectedData(cxPropSelected) : this.setSelectedValue(cxPropSelected, false);
			this.preventselectedDataDuplication = true;
		} else {
			this.setData("selectSingleUsers", []);
		}
		this.handlePartialSelectClass(undefined, undefined, true);
	},

	handlePanelOnBeforeShow: function(){
		this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
		if (this.getData("viewType") === 'user' && !this.getData("showLyteSearch")) {
			const cxPropFilterOptions = this.data.cxPropFilterOptions;
			// this.closeFromDataReset = undefined;
			if (cxPropFilterOptions && cxPropFilterOptions.length && this.getData("cxPropEnableDropdown")) {
				var filterOptions = this.data.cxPropFilterOptions[0].id;
				this.setData("filterSelectedValue", filterOptions);
				this.getDropdownFilterSelection();
			}
		} else {
			const cxPropSelected = this.data.cxPropSelected;
			const lyteSearch = $L("#cxUserSearch")[0];
			if (lyteSearch && this.getData('searchInputValue')) {
				lyteSearch.setValue('');
			}
			if (cxPropSelected && cxPropSelected.length && !this.preventselectedDataDuplication) {
				this.getData("displayData").forEach(item => {
					item.selectedList = [];
				});
				this.handlePreSelectedData(cxPropSelected);
			}
			delete this.preventselectedDataDuplication;
		}
		this.enableSortableMenu();
	},

	handlePartialSelectClass: function(item, cxData, preventGetTotalGroupLength){
		this.getComputeTotalCxDataLength();
		if(this.getData("viewType") === "nonUser" && preventGetTotalGroupLength){
			if(item && cxData){
				this.getTotalGroupLength(item, cxData);
			} else{
				this.getData("displayData").forEach(item => {
					this.getTotalGroupLength(item, item.cxData);
				});
			}
		}
	},

	preProcessData: function (data) {
		var processedData = [];
		var nonGroupCollection = [];
		var hasData = data && data.length;

		if (!hasData) { // This will execute for user case if data is empty
			this.setData('viewType', "user");
			this.setData('showLyteSearch', false);
			return [{ cxPropType: 'user', cxData: [], selectedList: [], show: true }];
		}

		var len = data.length;
		for (var i = 0; i < len; i++) {
			var item = data[i];

			if (item) {
				switch (item.cxPropType) {
					case 'group':
						this.setData('viewType', "nonUser");
						this.setData('showLyteSearch', true);
						item.selectedList = [];
						item.show = true;
						if (item.cxPropLabel){
							item.groupCheckBoxChecked = false;
						}
						item.cxPartialSelect = false;
						processedData.push(item);
						break;

					case 'accordion':
						this.setData('viewType', "nonUser");
						this.setData("cxPropFilterOptions", []);
						this.setData('showLyteSearch', true);
						item.selectedList = [];
						item.show = true;
						processedData.push(item);
						break;

					default:
						nonGroupCollection.push(item);
						break;
				}
			}
		}

		if (nonGroupCollection.length > 0) {
			this.setData("cxPropFilterOptions", []);
			this.setData('viewType', "user");
			this.setData('showLyteSearch', true);
			processedData.push({
				cxPropType: 'user',
				show : true,
				selectedList : [],
				cxData: nonGroupCollection
			});
		}
		return processedData;
	},

	resetSelectedvalue: function () {
		this.setData('selectSingleUsers', []);
		this.data.displayData.forEach((group) => {
			Lyte.objectUtils(group, 'add', { selectedList: [], cxData: [] });
		});
	},

	//Usage for only User case along with non-lyteSearch (It makes networkCall)
	setSelectedValue: function (cxPropSelected, resetSelected = true) {
		var viewType = this.data.viewType;
		if (viewType === "user" && !this.data.showLyteSearch) {
			let insertToTop = this.data.cxPropSortEnable && this.data.viewType === "user";
			if (resetSelected) {
				this.resetSelectedvalue();
			}
			cxPropSelected = cxPropSelected || this.data.cxPropSelected;
			var selectSingleUsers = [];
			var selectedList = [];
			var idsList = [];
			if (cxPropSelected && cxPropSelected.length > 0) {
				cxPropSelected.forEach(item => {
					var rec = store.peekRecord("user", item.id || item);
					if (!rec) {
						idsList.push(item.id || item);
					}
					selectSingleUsers.push(item.id || item);
					selectedList.push(item.id || item);
				});
				this.setData('selectSingleUsers', selectSingleUsers);//no i18n
				Lyte.objectUtils(this.data.displayData[0], "add", 'selectedList', selectedList);
				if (idsList.length) {
					store.findAll('user', { ids: idsList.join(',') }).then(() => {
						this.insertSelectedItemsToTop();
					});
				} else if (insertToTop) {
					this.insertSelectedItemsToTop();
				}
			}
			this.setData('noOfUsers', true);
		}
	},

	//Usage for only User and nonUser case along with lyteSearch
	handlePreSelectedData: function (cxPropSelected) {
		if (cxPropSelected && cxPropSelected.length){
			const mergedSelected = [];
			cxPropSelected.forEach(item => {
				// if (item && Array.isArray(item.cxData)) {
				// 	mergedSelected.push(...item.cxData);
				// } else 
				if (item && item.id) {
					mergedSelected.push(item);
				}
			});

			const selectedIds = mergedSelected.map(obj => obj && obj.id);
			const selLength = selectedIds.length;

			this.setData('selectSingleUsers', selectedIds);

			this.data.displayData.forEach(item => {
				item.selectedList = []; //Added due to avoid duplication from cxPropData observer, cxPropSelected observer
				for (let i = 0; i < selLength; i++) {
					const selId = selectedIds[i];
					const index = item.cxData.findIndex(child => child.id === selId);
					if (index !== -1 && this.data.cxPropElevateSelected) {
						const movedItem = Lyte.arrayUtils(item.cxData, 'removeAt', index, 1)[0];
						const originalPreSel = mergedSelected.find(sel => sel.id === selId);
						if (originalPreSel && originalPreSel.cxDisableChkBox === true) {
							movedItem.cxDisableChkBox = true;
						}
						Lyte.arrayUtils(item.cxData, 'insertAt', item.selectedList.length, movedItem);
						this.lastClickedIndex = item.selectedList.length;
					}
					const testData = item.cxData.find(sel => sel.id === selId);
					if (testData){
						Lyte.arrayUtils(item.selectedList, 'push', selId);
					}
				}
			});

			this.setData("noOfUsers", true);
			// this.handlePartialSelectClass(undefined, undefined, false);
		}
	},
	getDropdownDefaultFilters: function () {
		var filters = [
			{ "id": "AllUsers", "category": _cruxUtils.getI18n('crm.globalsearch.option.all'), status: ["all"] }, //NO I18n
			{ "id": "ActiveUsers", "category": _cruxUtils.getI18n('webform.status.Active'), status: ["active"] }, //NO I18n
			{ "id": "DeactiveUsers", "category": _cruxUtils.getI18n('Inactive'), status: ["disabled", "rejected"] }, //NO I18n
			{ "id": "ConfirmedUsers", "category": _cruxUtils.getI18n('Confirmed'), status: ["active", "disabled", "deleted", "closed"], confirm: true }, //NO I18n
			{ "id": "NotConfirmedUsers", "category": _cruxUtils.getI18n('crm.user.component.unconfirmed'), status: ["active", "disabled", "rejected"], confirm: false }, //NO I18n
			{ "id": "DeletedUsers", "category": _cruxUtils.getI18n('DeletedUser'), status: ["deleted", "closed"] }, //NO I18n
			// { "id": "ActiveConfirmedUsers", "category": _cruxUtils.getI18n('webform.status.Active') + " " + _cruxUtils.getI18n('Confirmed'), status: ["active"] }, //NO I18n
			// { "id": "AdminUsers", "category": _cruxUtils.getI18n('crm.feed.group.admin'), status: ["all"] }, //NO I18n
			// { "id": "ActiveConfirmedAdmins", "category": _cruxUtils.getI18n('crm.user.label.active.confirmed.admins'), status: ["active"] }, //NO I18n
			// { "id": "CurrentUser", "category": _cruxUtils.getI18n('crm.ln.lable.current'), status: ["active"] } //NO I18n
		];
		// The filters above are currently commented out as they are required only for specific use cases.
		// Uncomment them if filters like ActiveConfirmedUsers, AdminUsers, or CurrentUser are needed in future scenarios - but ensure they are properly tested before use.

		return filters;
	},

	insertSelectedItemsToTop: function () {
		let cxData = this.data.displayData[0].cxData;
		let selectedList = this.data.displayData[0].selectedList.slice(0);
		let searchVal = this.data.standardInputValue;
		let searchFun = (rec, searchValLower)=>{
			return (rec.first_name && rec.first_name.toLowerCase().startsWith(searchValLower)) || (rec.full_name && rec.full_name.toLowerCase().startsWith(searchValLower)) || (rec.last_name && rec.last_name.toLowerCase().startsWith(searchValLower)) || rec.email && rec.email.toLowerCase().startsWith(searchValLower);
		};

		if (selectedList && selectedList.length > 0) {
			selectedList.reverse();
			selectedList.forEach(id => {
				var rec = store.peekRecord("user", id);
				let removeDuplicateRecID = !cxData.some(item => item.id === rec.id);
				if (removeDuplicateRecID) {
					let searchValLower = searchVal && searchVal.toLowerCase() || '';
					let proceedInsert = !searchVal || searchFun(rec, searchValLower);
					if (!proceedInsert ){
						return;
					}
					const statusData = this.getDropdownDefaultFilters().find(opt => opt.id === this.data.filterSelectedValue);
					if (statusData && statusData.status.includes("all")) {
						return Lyte.arrayUtils(cxData, 'insertAt', 0, rec);
					}

					if (statusData.hasOwnProperty('confirm') && statusData.confirm !== rec.confirm) {
						return;
					}
					if (statusData && statusData.status.length && statusData.status.includes(rec.status) || statusData.confirm === rec.confirm && statusData.status.includes(rec.status)) {
						return Lyte.arrayUtils(cxData, 'insertAt', 0, rec);
					}
				}
			});
		}
	},

// Optimized Code - Not working when change to unConfirmed and seach a selected Value. 
	// insertSelectedItemsToTop: function () {
	// 	const cxData = this.data.displayData[0].cxData;
	// 	const selectedList = this.data.displayData[0].selectedList.slice().reverse();
	// 	const searchValLower = this.data.standardInputValue?.toLowerCase() || '';
	// 	const statusData = this.defaultFilters().find(opt => opt.id === this.data.filterSelectedValue);

	// 	const matchesSearch = (rec) => {
	// 		if (!searchValLower) return true;
	// 		return ( rec.first_name?.toLowerCase().startsWith(searchValLower) || rec.full_name?.toLowerCase().startsWith(searchValLower) || rec.last_name?.toLowerCase().startsWith(searchValLower) || rec.email?.toLowerCase().startsWith(searchValLower));
	// 	};

	// 	selectedList.forEach(id => {
	// 		const rec = store.peekRecord("user", id);
	// 		if (!rec || cxData.some(item => item.id === rec.id) || !matchesSearch(rec)) {
	// 			return;
	// 		}
			
	// 		const { status = [], confirm } = statusData;
	// 		const matchStatus = status.includes("all") || status.includes(rec.status);
	// 		const matchConfirm = !statusData.hasOwnProperty('confirm') || confirm === rec.confirm;

	// 		if (matchStatus && matchConfirm) {
	// 			Lyte.arrayUtils(cxData, 'insertAt', 0, rec);
	// 		}
	// 	});
	// },


	handleShiftSelection: function (item, childItem, currentIndex, isChecking) {
		let startIndex, endIndex;

		if (this.data.cxPropElevateSelected && isChecking) {
			startIndex = 0;
			endIndex = currentIndex;
		} else {
			startIndex = Math.min(this.lastClickedIndex, currentIndex);
			endIndex = Math.max(this.lastClickedIndex, currentIndex);
		}

		this.isShiftSelecting = true;

		const selectedUsers = this.data.selectSingleUsers;
		const cxData = item.cxData || [];

		for (let i = startIndex; i <= endIndex; i++) {
			const child = cxData[i];
			const isSelected = selectedUsers.indexOf(child.id) !== -1;

			if (isChecking && !isSelected) {
				this.addSelectedUsers(item, child, i);
			} else if (!isChecking && isSelected) {
				this.removeSelectedUsers(item, child, i);
			}
		}
		this.isShiftSelecting = false;
	},

	didConnect: function () {
		if(this.getData("cxPropEnableDropdown")){
			if(this.getData("showLyteSearch")){
				let filterOptions = this.data.displayData.slice(0);
				filterOptions.unshift({cxPropType: 'group', cxPropLabel: 'All', cxData: [] });
				this.setData("cxPropFilterUserValue", "cxPropLabel");
				this.setData("cxPropFilterSystemValue", "cxPropLabel");
				this.setData("cxPropFilterOptions", filterOptions);
			} else if (!this.data.cxPropFilterOptions && this.getData("viewType") === 'user' && !this.getData("showLyteSearch")) {
				const filters = this.getDefaultFilters();
				this.setData('cxPropFilterUserValue', 'category'); // NO I18N
				this.setData('cxPropFilterSystemValue', 'id'); // NO I18N
				this.setData('cxPropFilterOptions', filters);
			}
		}
		this.handlePartialSelectClass(undefined, undefined, true);
	},

	init: function () {
		this.disableSortData = false;
		this.enableSelectAllChkBox = true;
		this.lastClickedIndex = -1;
		this.lastClickedItem = null;
		this.isShiftSelecting = false;
		this.$node.getSelectedUsers = () => {
			return this.getSelectedUsers();
		};
		this.$node.getDropdownFilterSelection = () => {
			return this.getDropdownFilterSelection();
		};
		this.$node.handlePreSelectedData = () => {
			return this.handlePreSelectedData();
		};

		this.$node.enableSortableMenu = () => {
			return this.enableSortableMenu();
		};
		this.$node.resetSelectedData = () => {
			return this.resetSelectedData();
		};
		this.$node.handlePanelOnBeforeShow = () => {
			return this.handlePanelOnBeforeShow();
		};
		this.$node.handlePartialSelectClass = () => {
			return this.handlePartialSelectClass();
		};		
		
		var processedData = this.preProcessData(this.data.cxPropData);
		this.setData('displayData', processedData);
		// this.setData("cxPropShowSelectAll", true);

		this.inputFocus = false;

		this.instances = {
			standard: undefined
		};
		this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
		// Check viewType and set up lazy load instance
		if (!this.data.showLyteSearch) {
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
						customRequest: this.data.cxPropCustomRequest,
						parseResponseKey: 'users'
					},
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
			//this.instances.standard.constructNextBatch();
		}
		else if (this.data.viewType === 'nonUser') {
			// this.setData("cxPropFilterUserValue", "cxPropLabel");
			// this.setData("cxPropFilterSystemValue", "cxPropLabel");
			// let filterOptions = this.data.displayData.slice(0);
			// filterOptions.unshift({ cxPropType: 'group', cxPropLabel: 'All', cxData: [] });
			// this.setData("cxPropFilterOptions", filterOptions);
		}

		// Set default filter options if not already set
		// if (!this.data.cxPropFilterOptions) {
		// 	var filters = this.getDefaultFilters();
		// 	this.setData('cxPropFilterOptions', filters);
		// 	this.setData('cxPropFilterUserValue', 'category'); // NO I18N
		// 	this.setData('cxPropFilterSystemValue', 'id'); // NO I18N
		// }
	},
	
	handleOnCustomrequest: function (instance, queryParams) {
		if (this.getMethods("onCustomRequest")) {
			var request = this.executeMethod("onCustomRequest", instance, queryParams);
			return request;
		}
	},

	handleLoadingStateUpdate: function (instance, state) {
		var showLoading = (state === "initial" || state === "scroll" || state === "search");
		this.setData('showLoading', showLoading);
	},

	// Existing code
	onProcessNextBatch: function (instance, batch) {
		if (instance.userCustomData.type === "Standard") {
			store.pushPayload('user', batch);
			this.setData('noResultsMatch', false);
			var userData = this.data.displayData[0].cxData;
			const resetSelected = false;
			if (this.data.cxPropSortEnable) {
				batch = this.filterOutSelected(batch);
			}

			// // Prevent duplication
			// var uniqueBatch = batch.filter(function (item) {
			// 	return !userData.some(function (userDataItem) {
			// 		return userDataItem.id === item.id;
			// 	});
			// });
			// Lyte.arrayUtils(userData, 'push', uniqueBatch); // No I18N

			Lyte.arrayUtils(userData, 'push', batch); // No I18N
			this.setSelectedValue(this.data.displayData[0].selectedList, resetSelected);
			// Lyte.arrayUtils(userData, 'push', batch); //No I18N
			this.setData("buttonsDisable", true);
			this.handlePartialSelectClass(undefined, undefined, false);
			this.enableSortableMenu();
		}
	},

	// filterOutSelected: function (dataToRender) {
	// 	var selectedlist = this.data.selectSingleUsers;
	// 	return dataToRender.filter(function (item) {
	// 		return selectedlist.indexOf(item.id) !== -1;
	// 	});
	// },

	filterOutSelected: function (dataToRender) {
		let selectedIds = this.data.selectSingleUsers || [];
		let selectedList = [];
		let unselectedList = [];

		dataToRender.forEach(item => {
			// if (selectedIds.includes(item.id)) { // Directly check if item.id exists in selectedIds array
			// 	selectedList.push(item);
			// } else {
			// 	unselectedList.push(item);
			// }

			if (!selectedIds.includes(item.id)) {
				unselectedList.push(item);
			}
		});

		return [...selectedList, ...unselectedList]; // Ensure selected items appear first
	},

	onModifyRequestParams: function (instance, details) {
		if (instance.userCustomData.type === "Standard") {
			var inputValue = this.data.standardInputValue;

			if (inputValue) {
				details.customData = this.data.cxPropSearchQueryParams;
				details.customData.criteria = '(((first_name:starts_with:' + inputValue + ')or(last_name:starts_with:' + inputValue + ')or(full_name:starts_with:' + inputValue + ')or(email:starts_with:' + inputValue + ')))';

				var queryParams = details.queryParams;
				for (var key in queryParams) {
					details.customData[key] = queryParams[key];
				}
			}

			if (this.data.selectedOption) {
				details.queryParams.type = this.data.selectedOption;
			}
		}
		return details;
	},

	onBeforeSearchRequest: function (instance, requestTriggerStatus ) {
		if (instance.userCustomData.type === "Standard") {
			this.setData("noResultsMatch", false); //NO I18N
			Lyte.objectUtils(this.data.displayData[0], 'add', 'cxData', []);
			if (requestTriggerStatus === "rejected" ){
				this.setData('noResultsMatch', true);
			}
			// Lyte.objectUtils(this.data.displayData[0], 'add', 'cxData', []);
		}
	},

	handleInvalidResponse: function (instance, response) {
		const isEmpty = !response || (Array.isArray(response) && response.length === 0) || (response.user === undefined || (Array.isArray(response.user) && response.user.length === 0));
		if (instance.userCustomData.type === "Standard" && isEmpty && !this.data.displayData[0].cxData.length) {
			this.setData("noResultsMatch", true); // No I18N
			this.setData("buttonsDisable", false);
		}
	},

	enableSortableMenu: function () {
		if (this.data.cxPropSortEnable) {
			var _self = this;
			var cxDraggableElement = $L('.cxDraggableElement');
			if (cxDraggableElement && cxDraggableElement.length){
				cxDraggableElement.sortable({					
					containment: ".cxSortable",
					onDragStart: function () {
						_self.setData('allScrollCss', true);
					},
					onDrop: function (droppedElement, destination, belowElement, fromIndex, toIndex) {
						_self.data.displayData.forEach((displayData) => {
							var fields = displayData.cxData;
							var selectedList = displayData.selectedList;

							var removedData = Lyte.arrayUtils(fields, "removeAt", fromIndex, 1)[0]; // No I18n
							Lyte.arrayUtils(fields, "insertAt", toIndex, removedData); // No I18n

							if (selectedList.length !== 0){
								var removedSelectedList = Lyte.arrayUtils(selectedList, "removeAt", fromIndex, 1); // No I18n
								Lyte.arrayUtils(selectedList, "insertAt", toIndex, removedSelectedList); // No I18n
							}
						});
						_self.enableSortableMenu();
						_self.setData('allScrollCss', false);
					},
					restrict: ".restrictDraggable"
				});
			}
		}
	},

	// getSelectedUsers function is an Util to get the selected Users
	getSelectedUsers: function () {
		const selectedList = this.data.displayData[0].selectedList;
		let selectedData = [];
		if (this.data.viewType === "user" && !this.data.showLyteSearch){
			selectedList.forEach(id => {
				const userRecord = store.peekRecord("user", id);
				if (userRecord) {
					selectedData.push(userRecord);
				}
			});
		} else {
			this.data.displayData.forEach(item => {
				item.selectedList.forEach(selId => {
					const userObj = item.cxData.find(child => child.id === selId);
					if (userObj) {
						const userWithParent = item && item.cxName ? Object.assign({}, userObj, { cxParentName: item.cxName }) : userObj;
						selectedData.push(userWithParent);
					}
				});
			});
		}
		return selectedData;
	},
//Collect all the data and then push
	addSelectedUsers: function (item, childItem, index) {
		if (item) {
			this.setData("noOfUsers", true); // No I18N
			if (!this.data.selectSingleUsers.includes(childItem.id)) {
				Lyte.arrayUtils(this.data.selectSingleUsers, 'push', childItem.id);
				if (item.selectedList && !item.selectedList.includes(childItem.id)) {
					item.selectedList.push(childItem.id);
				}
				this.lastClickedIndex = index;
			}
			if (!this.disableSortData && this.data.cxPropElevateSelected && !this.isShiftSelecting) {
				let removedData;
				if(this.data.viewType === "user"){
					var SelectedDataList = $L(".cxSelectModalcheckboxWrapper lyte-checkbox input:checked").length - 1;
					removedData = Lyte.arrayUtils(item.cxData, "removeAt", index, 1)[0];
					Lyte.arrayUtils(item.cxData, "insertAt", SelectedDataList, removedData);
					this.lastClickedIndex = SelectedDataList;
				} else {
					const groupCheckedCount = item.cxData.filter(user => this.data.selectSingleUsers.includes(user.id)).length - 1;
					if (item.cxData && index >= 0 && index < item.cxData.length) {
						removedData = Lyte.arrayUtils(item.cxData, "removeAt", index, 1)[0];
						Lyte.arrayUtils(item.cxData, "insertAt", groupCheckedCount, removedData);
						this.lastClickedIndex = groupCheckedCount;						
					}
				}
			}
		}
	},

	removeSelectedUsers: function (item, childItem, index) {
		this.setData("noOfUsers", true); // No I18N		
		if (item) {
			Lyte.arrayUtils(this.data.selectSingleUsers, 'removeObjects', childItem.id); //No I18N

			if (item.selectedList) {
				Lyte.arrayUtils(item.selectedList, 'removeObjects', childItem.id);
			}
			this.lastClickedIndex = index;
			if (!this.disableSortData && this.data.cxPropElevateSelected && !this.isShiftSelecting) {
				let removedData;
				if (item.cxData && index >= 0 && index < item.cxData.length) {
					if (this.data.viewType === "user") {
						const selectedDataList = $L(".cxSelectModalcheckboxWrapper lyte-checkbox input:checked").length;
						if(item.cxData.length === selectedDataList){
							removedData = Lyte.arrayUtils(item.cxData, "removeAt", index, 1)[0];
							Lyte.arrayUtils(item.cxData, "insertAt", item.cxData.length, removedData);
							this.lastClickedIndex = item.cxData.length;
						} else{
							removedData = Lyte.arrayUtils(item.cxData, "removeAt", index, 1)[0];
							Lyte.arrayUtils(item.cxData, "insertAt", selectedDataList, removedData);
							this.lastClickedIndex = selectedDataList;
						}
					} else{
						const groupClassName = Lyte.Component.registeredHelpers.cruxReplace(item.cxName, ' ', '_') + '_chckBox';
						const selectedGroupDataList = $L(".cxSelectModalcheckboxWrapper ." + groupClassName + " input:checked").length;
						removedData = Lyte.arrayUtils(item.cxData, "removeAt", index, 1)[0];
						Lyte.arrayUtils(item.cxData, "insertAt", selectedGroupDataList, removedData);
						this.lastClickedIndex = selectedGroupDataList;
					}
				}
			}
			if (this.data.addMoreUsers === true && this.data.selectSingleUsers.length === 0) {
				this.setData("showSelectedView", false);
				this.setData("addMoreUsers", false); // No I18N
				this.setData("noOfUsers", true); // No I18N
				this.setData("hideGroupButton", true);
			}
		}
	},

	getComputeTotalCxDataLength: function () {
		var totalSingleSelectedLength = this.data.selectSingleUsers.length;
		var selectAllChkBx = this.$node && this.$node.querySelector("#cxSelectAll");
		var totalCxDataLength = 0;
		if (selectAllChkBx){
			this.data.displayData.forEach(group => {
				totalCxDataLength += group.cxData.length;
			});

			if (totalSingleSelectedLength === 0) {
				this.setData('checkBoxChecked', false);
				selectAllChkBx.classList.remove('cxPartialSelect');
			}
			else if (totalCxDataLength === totalSingleSelectedLength) {
				this.setData('checkBoxChecked', true);
				selectAllChkBx.classList.remove('cxPartialSelect');
			}
			else {
				this.setData('checkBoxChecked', totalCxDataLength === totalSingleSelectedLength);
				selectAllChkBx.classList.add('cxPartialSelect');
			}
		}
	},

	getTotalGroupLength: function (groupItem) {
		if (groupItem && groupItem.cxPropLabel){
			this.preventGroupchckBxCB = true;
			var totalCxDataLength = groupItem.cxData.length;

			// var allGroupsDataLength = this.data.displayData.reduce((total, group) => total + group.cxData.length, 0);

			// if (this.data.selectSingleUsers.length === allGroupsDataLength) {
			// 	Lyte.objectUtils(groupItem, 'add', 'groupCheckBoxChecked', true);
			// 	selectAllChkBx.classList.remove('cxPartialSelect');
			// 	return false;
			// }
			// else if(this.data.selectSingleUsers.length !== allGroupsDataLength){
			// 	Lyte.objectUtils(groupItem, 'add', 'groupCheckBoxChecked', false);
			// 	selectAllChkBx.classList.remove('cxPartialSelect');
			// 	return false;
			// }

			// totalCxDataLength += groupChildItem.length;

			if (groupItem.selectedList.length === 0) {
				Lyte.objectUtils(groupItem, 'add', { 'groupCheckBoxChecked': false, partialClass: "" });
			}
			else if (totalCxDataLength === groupItem.selectedList.length) {
				Lyte.objectUtils(groupItem, 'add', { 'groupCheckBoxChecked': true, partialClass: "" });
			}
			else {
				Lyte.objectUtils(groupItem, 'add', { 'groupCheckBoxChecked': false, partialClass: "cxPartialSelect" });
			}
			delete this.preventGroupchckBxCB;
		}
	},

	//Callbacks
	// onClose : function(){
	// 	this.setData("cxPropShow", false);
	// },
	// onSave : function(){
	// 	if( this.getMethods('onSave') ){
	// 		var args = { selectedData : this.getSelectedUsers() };
	// 		this.executeMethod('onSave' , args)
	// 	}
	// 	this.onClose();
	// },

	getDropdownFilterSelection: function (ev, selectedFilterOpt){
		this.data.displayData.forEach(item => {
			if (item.cxPropType === 'user') {
				this.setData('standardInputValue', '');
				this.setData('selectedOption', selectedFilterOpt);
				this.setData("cxPropSearchQueryParams", { type: selectedFilterOpt });
				Lyte.objectUtils(item, 'add', 'cxData', []);
				this.instances.standard.resetData();
				this.instances.standard.constructNextBatch();
			}
			else if (item.cxPropType === 'accordion' || item.cxPropType === 'group') {
				this.setData('selectedOption', selectedFilterOpt);
				if (selectedFilterOpt === 'All') {
					this.setData('cxPropShowSelectAll', true);
					this.enableSelectAllChkBox = true;
					Lyte.objectUtils(item, 'add', 'show', true);
					this.setData('selectAllDiasbleCheckbox', false);
					this.setData('groupSelectAllDiasbleCheckbox', false);
				} else if (selectedFilterOpt !== 'All') {
					this.setData('cxPropShowSelectAll', false);
					this.enableSelectAllChkBox = false;
					Lyte.objectUtils(item, 'add', 'show', item.cxPropLabel === selectedFilterOpt);
					this.setData('selectAllDiasbleCheckbox', true);
					this.setData('groupSelectAllDiasbleCheckbox', true);
				} else {
					this.setData('cxPropShowSelectAll', false);
					this.enableSelectAllChkBox = false;
					Lyte.objectUtils(item, 'add', 'show', true);
					this.setData('selectAllDiasbleCheckbox', false);
					this.setData('groupSelectAllDiasbleCheckbox', false);
				}
			}
		});
		if (this.data.viewType === "nonUser") {
			this.ignoreSearch = true;
			const lyteSearch = $L("#cxUserSearch")[0];
			if (lyteSearch && this.getData('searchInputValue')) {
				lyteSearch.setValue('');
			}
			setTimeout(() => {
				this.ignoreSearch = false;
				this.setData('noResultsMatch', false);
			}, "100");
		}
	},

	commonRestData : function(){
		this.setData('selectAllDiasbleCheckbox', false);
		this.setData("checkBoxChecked", false);
		this.setData("selectedAllUserInthisview", false);
		this.setData('cxPropDiasbleCheckbox', false);
		this.setData("showSelectedView", false);
		this.setData("addMoreUsers", false);
		this.setData('standardInputValue', '');
		this.setData('noResultsMatch', false);
		this.setData("allUsers", false);
		this.setData("noOfUsers", false);
	},

	resetSelectedData: function (arg1, arg2, arg3) {
		if (this.data.showLyteSearch) {
			this.enableSelectAllChkBox = true;
			const lyteSearch = this.$node && this.$node.querySelector('lyte-search#cxUserSearch');
			if (lyteSearch && this.getData('searchInputValue')) {
				lyteSearch.setValue('');
			}
			if (this.getData("cxPropEnableDropdown")) {
				this.setData('selectedOption', this.data.cxPropFilterOptions[0]);
			}
			this.setData('filterSelectedValue', "All");			
			this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
			this.setData('groupSelectAllDiasbleCheckbox', false);
			this.setData("selectSingleUsers", []);
			this.commonRestData();			
			this.data.displayData.forEach(item => {
				Lyte.objectUtils(item, 'add', 'show', true);
				if (item.cxPropLabel){
					Lyte.objectUtils(item, 'add', 'groupCheckBoxChecked', false);
				}
				Lyte.objectUtils(item, 'add', 'selectedList', []);
			});

		} else if (this.getData("viewType") === 'user' && !this.getData("showLyteSearch")) {
			const cxPropFilterOptions = this.data.cxPropFilterOptions;
			// this.closeFromDataReset = undefined;
			if (cxPropFilterOptions && cxPropFilterOptions.length && this.getData("cxPropEnableDropdown")) {
				var filterOptions = this.data.cxPropFilterOptions[0].id;
				this.setData("filterSelectedValue", filterOptions);
				this.getDropdownFilterSelection();
			}
			this.instances.standard.resetData();
			this.setSelectedValue();
			this.commonRestData();
		}
		
		if(arg1 && arg2 && arg3){
			this.handlePartialSelectClass(arg1, arg2, arg3);
		} else{
			this.handlePartialSelectClass(undefined, undefined, true);
		}
		this.enableSortableMenu();
	},

	actions: {
		handleScroll: function (event, from) {
			if (from === "Standard" && this.data.viewType === 'user' && !this.data.showLyteSearch) {
				this.instances.standard.performScroll(event);
			}
		},

		displaySelectedUsers: function () {
			// this.setData("selectAllDiasbleCheckbox", true); // No I18N
			// this.setData('groupSelectAllDiasbleCheckbox', true);
			this.setData("showSelectedView", true);
			this.setData("addMoreUsers", true); // No I18N
			this.setData("hideGroupButton", false);

			// if(this.data.viewType === 'nonUser'){
			// 	this.data.displayData.forEach(item => {
			// 		if (item.cxPropType === 'group') {
			// 			this.displayGroupLength(item, item.selectedList);
			// 		}
			// 	});
			// }
		},

		markSelectedUsers: function () {
			var lyteAccordionBodies = $L('lyte-accordion-body');
			var lyteAccordionBodiesArray = Array.from(lyteAccordionBodies);
			let targetIndex = -1;
			lyteAccordionBodiesArray.forEach((element, index) => {
				if (element.matches('#draggableElement.sortable-parent.lyteSortableParent')) {
					targetIndex = index;
				}
			});
			if (targetIndex !== -1) {
				var targetElement = lyteAccordionBodiesArray[targetIndex];
				var scrollElements = targetElement.querySelectorAll('.sortable-element');
				scrollElements.forEach(element => {
					element.classList.remove('sortable-element');
				});
			}

			this.setData('selectedAllUserInthisview', true);
			this.setData('cxPropDiasbleCheckbox', true); //No I18N
			this.setData("allUsers", false);
			this.setData("noOfUsers", false);
			this.setData("selectAllLabel", 'All Users Selected');
			this.setData('groupSelectAllDiasbleCheckbox', true);
		},

		addUsersToList: function () {
			this.setData("selectAllDiasbleCheckbox", false); // No I18N
			this.setData('groupSelectAllDiasbleCheckbox', false);
			this.setData("addMoreUsers", false); // No I18N
			this.setData("noOfUsers", true); // No I18N
			this.setData("showSelectedView", false);
			this.setData("hideGroupButton", true);			
			if (this.data.searchApplied === true){
				document.querySelector('lyte-search#cxUserSearch').setValue("");
			}			
			this.handlePartialSelectClass(undefined, undefined, true);
			this.enableSortableMenu();
		},
	},

	methods: {
		searchValueChange: function () {
			if (this.data.viewType === 'user') {
				this.setData('searchCloseIcon', this.data.standardInputValue);
				this.instances.standard.properties.searchValue = this.data.standardInputValue;
				this.instances.standard.performSearch($L("#standardScrollDiv")[0]); //NO I18N
			}
			this.enableSortableMenu();
		},

		onInputFocus: function () {
			this.$node.querySelector('.cxSelectModSearchWrap.cxBoxWithRightIcon').classList.add("cxBoxInputFocused");
			this.inputFocus = true;
		},

		onInputBlur: function () {
			this.$node.querySelector('.cxSelectModSearchWrap.cxBoxWithRightIcon').classList.remove("cxBoxInputFocused");
			this.inputFocus = false;
		},
		
		preventClose: function (event) {
			if (this.data.displayData[0].cxPropType === "accordion" && !this.data.searchApplied) {
				return event && event.target.matches("lyte-icon") ? true : false;
			}
			return false;
		},

		applyFilterSelection: function (ev, selectedFilterOpt) {
			this.getDropdownFilterSelection(ev, selectedFilterOpt);
		},

		searchGroup: function (visibleList, element, event, value) {
			this.setData('searchApplied', value !== "");
			this.setData('selectAllDiasbleCheckbox', value !== "");
			this.setData('groupSelectAllDiasbleCheckbox', value !== "");
			this.setData("searchCloseIcon", value !== "");
		},
		afterSearchGroup: function (visibleList) {
			if(!this.ignoreSearch){
				if (visibleList.length === 0) {
					this.setData("buttonsDisable", false);
					this.setData('noResultsMatch', true);
					this.setData('cxPropShowSelectAll', false);
				} else {
					this.setData('noResultsMatch', false);
					if(this.enableSelectAllChkBox){
						this.setData('cxPropShowSelectAll', true);
					}
					this.setData("buttonsDisable", true);
				}
				this.handlePartialSelectClass(undefined, undefined, false);
			}
		},

		selectAllUsers: function () { //arg - input, component, event
			const __this = this;
			const lyteBetaModal = this.$node && this.$node.querySelector('lyte-beta-modal');
			const betaModalCheckbox = lyteBetaModal && lyteBetaModal.component.childComp && lyteBetaModal.component.childComp.querySelector("input[type='checkbox']");
			const nodeCheckbox = this.$node.querySelector("input[type='checkbox']");
			let selectAllChecked = false;
			if (betaModalCheckbox) {
				selectAllChecked = betaModalCheckbox.checked;
			} else if (nodeCheckbox) {
				selectAllChecked = nodeCheckbox.checked;
			}
			if (!this.data.showLyteSearch) {
				this.setData('selectAllLabel', '');
			}

			this.setData('cxPropDiasbleCheckbox', false);
			let selectedIds = [];
			this.preventTotalGroupLength = true;
			
			this.data.displayData.forEach(item => {
				if (selectAllChecked) {
					if (__this.data.viewType === "nonUser" && item.cxPropLabel) {
						Lyte.objectUtils(item, 'add', 'groupCheckBoxChecked', true);
					}
					item.cxData.forEach(childItem => {
						selectedIds.push(childItem.id);
						if (Array.isArray(item.selectedList) && !item.selectedList.includes(childItem.id)) {
							item.selectedList.push(childItem.id);
						}
					});
					if(!item.cxPropLabel) {
						this.setData('selectSingleUsers', item.selectedList);
					}
				} else {
					if (__this.data.viewType === "nonUser" && item.cxPropLabel){
						Lyte.objectUtils(item, 'add', 'groupCheckBoxChecked', false);
					}
					else if(!item.cxPropLabel) {
						this.setData('selectSingleUsers', []);
					}
					item.selectedList = [];
				}
			});
			delete this.preventTotalGroupLength;

			if (this.data.viewType === 'user') {
				if (selectAllChecked) {
					this.setData('selectSingleUsers', selectedIds);
					if (!this.data.showLyteSearch) {
						this.setData('allUsers', true);
					} else {
						this.setData('noOfUsers', true);
					}
				} else {
					this.setData('selectSingleUsers', []);
					this.setData('selectedAllUserInthisview', false);
					if (!this.data.showLyteSearch) {
						this.setData('allUsers', false);
					} else {
						this.setData('noOfUsers', false);
					}
					this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
				}
			} else {
				if (selectAllChecked) {
					if (this.data.showLyteSearch) {
						this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
						this.setData('noOfUsers', true);
					} else {
						this.setData('selectAllLabel', '');
						this.setData('allUsers', true);
						this.setData('noOfUsers', false);
					}
				} else {
					this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
					this.setData('selectedAllUserInthisview', false);
					if (!this.data.showLyteSearch) {
						this.setData("allUsers", false);
					} else {
						this.setData('noOfUsers', false);
					}
					this.setData('groupSelectAllDiasbleCheckbox', false);
				}
			}

			this.handlePartialSelectClass(undefined, undefined, false);
			this.enableSortableMenu();
		},

		manageGroupUsers: function (groupItem, groupChildItem, input) {
			if (this.preventGroupchckBxCB) {
				delete this.preventGroupchckBxCB;
				return;
			}
			var allGroupUserIds = groupChildItem.map(user => user.id);

			if (input.checked) {
				var searchApplied = this.data.searchApplied;
				if (searchApplied) {
					//
				} else {
					this.disableSortData = true;
					allGroupUserIds.forEach(userId => {
						if (!this.data.selectSingleUsers.includes(userId)) {
							this.addSelectedUsers(groupItem, { id: userId });
						}
					});

					this.setData("allUsers", true);
					this.disableSortData = false;
					this.setData("allUsers", false);
					this.setData("noOfUsers", true);
				}
			} else {
				this.disableSortData = true;
				allGroupUserIds.forEach(userId => {
					this.removeSelectedUsers(groupItem, { id: userId });
				});

				this.setData("allUsers", false);
				this.setData('selectAllLabel', this.data.cxPropAllCheckBoxLabel);
				this.disableSortData = false;
			}
			this.handlePartialSelectClass(groupItem, groupChildItem, !this.preventTotalGroupLength);
			this.enableSortableMenu();
		},

		validateSelectAllBeforeCheck: function (from, input, component, event, userAction) {
			if (this.getMethods('onBeforeSelectAllChecked')) {
				const args = {cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from};
				const result = this.executeMethod('onBeforeSelectAllChecked', args);
				if (result === false) {
					return false;
				}
			};

			let hasAnySelected = false;
			const len = this.data.selectSingleUsers.length;
			if (this.data.viewType === "nonUser" && len > 0){
				hasAnySelected = true;
			}

			if (hasAnySelected || len > 0) {
				const selectAllChkBx = $L("#cxSelectAll")[0];
				if (selectAllChkBx) {
					selectAllChkBx.classList.remove('cxPartialSelect');
				}
				// Below argumants are mandatory for handlePartialSelectClass's arguments
				const arg1 = undefined, arg2 = undefined, arg3 = true;
				this.resetSelectedData(arg1, arg2, arg3);
				if(this.getData("viewType") === "user" && !this.getData("showLyteSearch")){
					this.resetSelectedvalue();
				}
				return false;
			}
		},

		validateSelectAllBeforeUncheck: function (from, input, component, event, userAction) {
			if (this.getMethods('onBeforeSelectAllUnchecked')) {
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from};
				const result = this.executeMethod('onBeforeSelectAllUnchecked', args);
				if (result === false) {
					return false;
				}
			};
		},

		selectedUsers: function (item, cxData, childItem, index, selectedList, from, input, component, event, userAction) {
			this.preventGroupchckBxCB = true;
			const isShiftClick = event && event.shiftKey;
			if (isShiftClick && this.lastClickedIndex !== -1) {
				// this.handleShiftSelection(item, index, true, this.addSelectedUsers, this.removeSelectedUsers);
				this.handleShiftSelection(item, childItem, index, true, this.addSelectedUsers, this.removeSelectedUsers);
            } else{
				this.addSelectedUsers(item, childItem, index, input, component, event, userAction);				
			}
            this.lastClickedItem = item;
			this.handlePartialSelectClass(item, cxData, true);
			this.enableSortableMenu();
			delete this.preventGroupchckBxCB;
			if (this.data.showLyteSearch && this.data.searchApplied) {
				document.querySelector('lyte-search#cxUserSearch').setValue(this.data.searchInputValue);
			}
			if (this.getMethods('onChecked')) { //NO I18n
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: childItem, cxSelectedList: selectedList };
				const result = this.executeMethod('onChecked', args);
				if (result === false) {
					return false;
				}
			};
		},

		unselectedUsers: function (item, cxData, childItem, index, selectedList, from, input, component, event, userAction) {
			this.setData("allUsers", false);
			this.setData("selectAllLabel", this.data.cxPropAllCheckBoxLabel);
			this.preventGroupchckBxCB = true;
			const isShiftClick = event && event.shiftKey;
			if (isShiftClick && this.lastClickedIndex !== -1) {
				this.handleShiftSelection(item, childItem, index, false, this.addSelectedUsers, this.removeSelectedUsers);
			} else{
				this.removeSelectedUsers(item, childItem, index, input, component, event, userAction);				
			}
			this.lastClickedItem = item;
			this.handlePartialSelectClass(item, cxData, true);
			this.enableSortableMenu();
			delete this.preventGroupchckBxCB;
			if (this.data.selectSingleUsers.length === 0){
				this.setData("selectAllDiasbleCheckbox", false);
				this.setData('groupSelectAllDiasbleCheckbox', false);
			}
			if (this.data.showLyteSearch && this.data.searchApplied) {
				document.querySelector('lyte-search#cxUserSearch').setValue(this.data.searchInputValue);
			}	
			if (this.getMethods('onUnchecked')) { //NO I18n
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: childItem, cxSelectedList: selectedList };
				const result = this.executeMethod('onUnchecked', args);
				if (result === false) {
					return false;
				}
			};
		},

		validateBeforeCheck: function (from, item, cxData, childItem, selectedList, index, input, component, event, userAction) {
			if (this.getMethods('onBeforeChecked')) {
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: childItem, cxSelectedList: selectedList };
				const result = this.executeMethod('onBeforeChecked', args);
				if (result === false) {
					return false;
				}
			};
		},

		validateBeforeUncheck: function (from, item, cxData, childItem, selectedList, index, input, component, event, userAction) {
			
				// if (this.preventGroupchckBxCB) {
				// 	return;
				// }

				// var minUser = this.data.cxPropMinSelectUserLimit;
				// if (minUser && this.data.selectSingleUsers.length - 1 < minUser) {
				// 	return false;
				// }

				if (this.getMethods('onBeforeUnchecked')) {
					const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: childItem, cxSelectedList: selectedList };
					const result = this.executeMethod('onBeforeUnchecked', args);
					if (result === false) {
						return false;
					}
				};
		},

		validateGroupBeforeCheck: function (from, item, cxData, cxName, selectedList, input, component, event, userAction) {
			if (this.preventGroupchckBxCB) {
				return;
			}
			if (this.getMethods('onBeforeGroupChecked')) {
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: cxData, cxSelectedGrpName: cxName, cxSelectedList: selectedList };
				const result = this.executeMethod('onBeforeGroupChecked', args);
				if (result === false) {
					return false;
				}
			};
			const matchedUser = cxData.find(sel => selectedList.includes(sel.id));

			if (matchedUser) {
				this.disableSortData = true;

				item.cxData.forEach(user => {
					this.removeSelectedUsers(item, user);
				});

				this.disableSortData = false;
				this.setData('checkBoxChecked', false);

				this.handlePartialSelectClass(undefined, undefined, true);
				return false;
			}
		},

		validateGroupBeforeUncheck: function (from, item, cxData, cxName, selectedList, input, component, event, userAction) {
			if (this.getMethods('onBeforeGroupUnchecked')) {
				const args = { cxinput: input, cxCheckboxEle: component, cxEvent: event, cxUserAction: userAction, cxFrom: from, cxSelectedItem: cxData, cxSelectedGrpName: cxName, cxSelectedList: selectedList };
				const result = this.executeMethod('onBeforeGroupUnchecked', args);
				if (result === false) {
					return false;
				}
			};
		},

	},
}, { "mixins": ["crux-user-utils"] });

Lyte.Component.registerHelper("checkSelected", function (showSelectedView, childItem) {
	if (showSelectedView) {
		var selectedList = this.getData('selectSingleUsers');
		if (selectedList.indexOf(childItem.id) !== -1) {
			return true;
		}
		return false;
	}
	return true;
});

Lyte.Component.registerHelper("searchVisible", function (selectSingleUsers, childItem_id, this_, selectSingleUsers_length, viewType) { //NO I18N
	if (viewType === 'nonUser') {
		var addClass = '';
		// if (selectSingleUsers.includes(childItem_id)) {
		// 	this_.classList.remove('restrictDraggable');
		// } else {
		// 	// his_.classList.removeaddClass += ' restrictDraggable';
		// 	this_.classList.add('restrictDraggable');
		// }
		if (!selectSingleUsers.includes(childItem_id)) {
			addClass += 'restrictDraggable ';
		}
		if (this_.classList.contains('lyteSearchHidden')) {
			addClass += 'lyteSearchHidden ';
		}
		return addClass;
	}
});

// { { if (cruxContains(selectSingleUsers, childItem.id, selectSingleUsers.length), '', 'restrictDraggable')} }
