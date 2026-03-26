/**
 * @component crux-tag-component
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-tag-component", {
_template:"<template tag-name=\"crux-tag-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'&amp;&amp;',cxPropValue.length)}}\"><template case=\"true\"> <ul id=\"{{cxPropId}}\" class=\"listview_taglists w230 m0 p0\"> <template is=\"for\" items=\"{{listValues}}\" item=\"val\" index=\"index\"> <li style=\"background: {{if(ifEquals(val.color_code,'noFill'),'transparent',concat(val.color_code,' !important;'))}}; color : {{cruxGetPicklistFontColor(val.color_code)}}; display : {{if(val.hide,'none;','')}}\" lt-prop-title=\"{{if(val.showTooltip,val[cxPropDisplayValue],if(cruxAnd(cxPropTooltip,ifNotEquals(cxPropTooltip,'true')),cxPropTooltip,''))}}\" lt-prop-tooltip-config=\"{{tooltipConfig}}\" lt-prop-tooltip-class=\"{{if(cxPropTooltipClass,cxPropTooltipClass,'lvTooltipClass')}}\" class=\"tagElementList f13 cxAddedTags dIB {{concat('cxTag',cruxGetTagColorIndex(val.color_code))}} {{if(cxPropTriggerTagClick,'cP','')}} {{if(cruxOr(ifEquals(val.color_code,'noFill'),negate(val.color_code)),'cxTagNoFillCol','')}}\" onclick=\"{{action('tagsTransition',val)}}\"><span class=\"{{if(val.showTooltip,'cruxTagTitle','')}} {{cxPropTagClass}}\">{{val[cxPropDisplayValue]}}</span></li> </template> <template is=\"if\" value=\"{{showMoreForMaxCount}}\"><template case=\"true\"> <li class=\"moreTagOption dIB cxVam p0 \"> <span class=\"eventNone disable\">{{cruxGetI18n('and')}}</span> <span class=\"moreCount cP cxTagMoreCountUnderline crmUnderlineInteration\" onclick=\"{{action('showMoreTags')}}\"> {{showMore}} {{cruxGetI18n('crm.label.More')}}</span> </li> </template></template> </ul> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template><template case=\"false\">{{cxPropEmptyValue}}</template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"filter\"></template><template case=\"criteria\"></template><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\">{{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\">{{unescape(cruxEncodeHTML(cxPropInfoTooltip))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div @class=\"cxElementValue cxYieldObserverElemComp {{if(cxPropReadonly,'cxElementReadonly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <lyte-dropdown id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-yield=\"true\" lt-prop-type=\"multisearch\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" on-add=\"{{method('addToList')}}\" on-remove=\"{{method('removeFromList')}}\" on-before-show=\"{{method('openDropdown')}}\" lt-prop-selected=\"{{lbind(selectedIds)}}\" on-hide=\"{{method('closeDropdown')}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" on-before-hide=\"{{method('beforeHide')}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-tooltip-class=\"cxElementsTooltip\" lt-prop-active-element=\"#search_Tag\" on-show=\"{{method('onDropdownOpen')}}\" lt-prop-box-class=\"{{cxPropBoxClass}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button data-zcqa=\"{{cxPropZcqa}}\"> <div class=\"lyteMultiselect\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{cxPropValue}}\" item=\"tag\" index=\"index\"> <li data-value=\"{{tag.id}}\" style=\"{{if(cruxAnd(cxPropColorTags,ifEquals(cxPropFrom,'create')),concat('background:',tag.color_code,'; color : ',tag.font_color),'')}}\" class=\"{{if(cruxAnd(cxPropColorTags,ifEquals(cxPropFrom,'create')),'cxAddedTags','')}} {{if(cruxOr(ifEquals(tag.color_code,'noFill'),negate(tag.color_code)),'cxTagNoFillCol','')}}\"> <span class=\"lyteDropdownVisible\" onmouseenter=\"{{action('setToolTip',this)}}\">{{tag[cxPropDisplayValue]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-search class=\"cxW100Per\" lt-prop-type=\"text\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.parentscope_{{cxPropId}}_{{cruxReplace(cruxReplace(cxPropField.api_name,&quot;->&quot;,&quot;_&quot;),&quot;[/.]&quot;,&quot;_&quot;)}}&quot;, &quot;target&quot;:&quot;.cruxTagList&quot;, &quot;search&quot;:&quot;lyte-drop-item:not(.cxDoNotSearch)&quot;}\" on-search=\"{{method('showNoResult')}}\" id=\"search_Tag\" lt-prop-placeholder=\"{{placeholder}}\" on-focus=\"{{method('onSearchBoxFocused')}}\" onclick=\"{{action('searchBoxClicked')}}\" onkeydown=\"{{action('preventDefault',this,event)}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-value=\"{{lbind(searchValue)}}\" lt-prop-update-delay=\"{{unDef}}\" lt-prop-callback-delay=\"{{unDef}}\"></lyte-search> </li> </ul> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </div> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox {{if(cxPropTagStyle,'cxDropbox cxTagDropBox','')}}\"> <lyte-drop-body class=\"parentscope_{{cxPropId}}_{{cruxReplace(cruxReplace(cxPropField.api_name,&quot;->&quot;,&quot;_&quot;),&quot;[/.]&quot;,&quot;_&quot;)}}\"> <template is=\"if\" value=\"{{newTagMsg}}\"><template case=\"true\"> <lyte-drop-item data-value=\"{{newTagMsg}}\" id=\"cxNewTag\" class=\"cxDoNotSearch cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropColorTags}}\"><template case=\"true\"> <crux-color-palette cx-prop-wrapper-class=\"tagsColorPalettePopover\" cx-prop-id=\"{{cxPropId}}\" cx-prop-selected-color=\"{{selectedColor}}\" cx-prop-show-text=\"{{cxPropShowText}}\" cx-prop-add-custom-colors-to-palette=\"{{cxPropAddCustomColorsToPalette}}\" onclick=\"{{action('stopPropagation')}}\" on-select-color=\"{{method('onSelectColor')}}\" on-before-color-palette-hide=\"{{method('colorPaletteHide')}}\"></crux-color-palette> </template></template> <span class=\"mR5 cxTagContent\">{{cruxGetI18n('crm.label.tag.new')}}</span> <span class=\"cxNewTagLabel dIB cxVam\"><lyte-text lt-prop-value=\"{{newTagMsg}}\"></lyte-text></span> </lyte-drop-item> </template></template> <template is=\"if\" value=\"{{cxPropAllowDropdown}}\"><template case=\"true\"> <template is=\"for\" items=\"{{tags}}\" item=\"tag\" index=\"ind\"> <lyte-drop-item class=\"picklist_values cruxTagList {{if(cxPropTagStyle,'cxTagDropItem','cxTagPicklistItem')}}\" data-value=\"{{tag.id}}\" data-zcqa=\"{{concat(cxPropField[cxPropFieldKey],'_',tag[cxPropDisplayValue])}}\"> <template is=\"if\" value=\"{{cxPropTagStyle}}\"><template case=\"true\"> <span style=\"background:{{tag.color_code}}; color : {{cruxGetPicklistFontColor(tag.color_code)}}\" class=\"cxTagDropItemChild {{if(cruxOr(ifEquals(tag.color_code,'noFill'),negate(tag.color_code)),'cxTagNoFillCol','')}}\"> <lyte-text lt-prop-tooltip-class=\"cxTagDropboxTooltip\" class=\"pR\" lt-prop-value=\"{{tag[cxPropDisplayValue]}}\"> </lyte-text> </span> </template><template case=\"false\"> <span class=\"dIB activitesColor\" style=\"background:{{tag.color_code}}\"></span> {{tag[cxPropDisplayValue]}} </template></template> </lyte-drop-item> </template> </template></template> <template is=\"if\" value=\"{{expHandlers(tagsLength,'!')}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult picklist_values lyteDropdown-disabled\" style=\"padding : 6px 25px !important;\"><template is=\"if\" value=\"{{expHandlers(cxPropAllowNewTagCreations,'&amp;&amp;',expHandlers(existingTag,'!=',&quot;&quot;))}}\"><template case=\"true\">{{cruxGetI18n('crux.existing.tag',existingTag)}}</template><template case=\"false\">{{cruxGetI18n('crm.label.no.options.found')}}</template></template></div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-tag-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background: '",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["val.color_code","'noFill'"]}},"'transparent'",{"type":"helper","value":{"name":"concat","args":["val.color_code","' !important;'"]}}]}},"'; color : '",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["val.color_code"]}},"'; display : '",{"type":"helper","value":{"name":"if","args":["val.hide","'none;'","''"]}}]}}}},{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]},{"type":"text","position":[1,3,3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[],"additional":{"next":"create"}},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3],"trans":true},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxAnd","args":["cxPropColorTags",{"type":"helper","value":{"name":"ifEquals","args":["cxPropFrom","'create'"]}}]}},{"type":"helper","value":{"name":"concat","args":["'background:'","tag.color_code","'; color : '","tag.font_color"]}},"''"]}}}},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,3,3,1]},{"type":"componentDynamic","position":[1,1,3,3,1]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5,0]},{"type":"componentDynamic","position":[1,5,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","tag.color_code","'; color : '",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["tag.color_code"]}}]}}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","tag.color_code"]}}}},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"if","position":[1,0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","lyteViewPort","cxPropValue","cxPropFrom","cxPropModule","tags","value","tagsLength","disabledList","selectedIds","cxPropZcqa","placeholder","cxPropIgnoreEmptyValue","cxPropField","cxPropFieldKey","showMore","valueObj","listValues","cxPropAppearance","cxPropBoundary","cxPropId","lyteUnbound","cxPropClass","cxPropClipMode","cxPropWidth","cxPropTooltip","tooltipConfig","cxPropViewInfoTooltip","cxPropTriggerTagClick","cxPropMaxCount","showMoreForMaxCount","cxPropEmptyValue","cxPropAria","cxPropAriaButton","cxPropAriaBody","cxPropAriaBox","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropTooltipClass","cxPropFreezePopover","cxPropTagClass","cxPropAllowNewTagCreations","newTagMsg","cxPropColorTags","cxPropClearErrorMessage","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropDisabled","cxPropErrorClass","cxPropErrorSpanClass","cxPropReadonly","cxPropAria","cxPropAriaAttributes","cxPropMandatory","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropPreventFocusOnError","cxPropTabIndex","cxPropTabindex","cxPropPlaceholder","cxPropRedirectUrl","cxPropPrefixYield","isError","cxPropErrorMessage","cxPropRequestModel","cxPropCustomRequest","selectedColor","existingTag","cxPropForcedFetch","cxPropButtonYield","cxPropForcedFetch","cxPropAriaErrorProperties","cxPropBoxClass","cxPropTagStyle","cxPropInfoTooltip","cxPropSuffixYield","cxPropDefaultColors","cxPropAddCustomColorsToPalette","cxPropWrapperClass","cxPropShowText","cxPropInputValue","cxPropLabelClass","cxPropDisplayValue","cxPropAllowDropdown","searchValue"],
_observedAttributesType :["object","object","boolean","boolean","array","string","string","array","array","boolean","array","array","string","string","boolean","object","string","number","array","array","string","object","string","boolean","string","boolean","string","string","object","boolean","boolean","number","boolean","string","boolean","object","object","object","string","object","string","string","string","boolean","string","boolean","string","boolean","boolean","string","boolean","string","string","boolean","string","string","boolean","boolean","object","boolean","string","boolean","string","boolean","string","string","string","string","boolean","boolean","string","string","boolean","string","string","boolean","boolean","boolean","object","string","boolean","string","boolean","array","boolean","string","boolean","string","string","string","boolean","string"],
//No I18n
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
			/**
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * Set to true to render error message on hover card
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render element when it comes in viewport
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { array } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("array",{default : []}),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The module for which the tag field belongs to. used to make the tags request
			 */
			cxPropModule : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } tags
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tags : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { array } value
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			value : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { boolean } tagsLength=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tagsLength : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { array } disabledList
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			disabledList : Lyte.attr("array", {default : ["cruxDisabled"]}),//No I18n
			/**
			 * @componentProperty { array } selectedIds
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			selectedIds : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The value set to data-zcqa
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } placeholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			placeholder : Lyte.attr("string", {default : _cruxUtils.getI18n("None")}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If value is empty, validation will be ignored
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The selector that tells us which key holds the field label
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * @componentProperty { number } showMore
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			showMore : Lyte.attr("number", {default : 0}),//No I18n
			/**
			 * @componentProperty { array } valueObj
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			valueObj : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * @componentProperty { array } listValues
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			listValues : Lyte.attr("array", {default : []}),//No I18n
      /**
       * @componentProperty { string } cxPropAppearance
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
      /**
       * @componentProperty { object } cxPropBoundary
       * @author anuja.manoharan
       * @version 1.0.0
	   * It represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the lyte-drop-button crosses this boundary(by scrolling), it automatically closes the dropdown.
       */
      cxPropBoundary : Lyte.attr("object",{default : {}}), //no i18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Id set to the lyte-dropdown
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to the lyte-dropdown
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropClipMode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display only partial data based on width
			 */
			cxPropClipMode : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWidth
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If width exceeds this value then values are shown as "Show More"
			 */
			cxPropWidth : Lyte.attr("string", {default : "230px"}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } tooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tooltipConfig : Lyte.attr("object", {default : {appearance : "box"}}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set as true to display info icon next to field label
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/**
			 * @componentProperty { boolean } cxPropTriggerTagClick=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to trigger click on tag
			 */
			cxPropTriggerTagClick: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { number } cxPropMaxCount
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The maximum number of tags to be rendered
			 */
			cxPropMaxCount : Lyte.attr("number", {default : 0}),
			/**
			 * @componentProperty { boolean } showMoreForMaxCount=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			showMoreForMaxCount : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Value displayed when cxPropValue is empty
			 */
			cxPropEmptyValue : Lyte.attr("string"),
			cxPropAria : Lyte.attr('boolean', {default : false}),
			cxPropAriaButton : Lyte.attr('object', {default : {}}),
			cxPropAriaBody : Lyte.attr('object', {default : {}}),
			cxPropAriaBox : Lyte.attr('object', {default : {}}),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to tooltip
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFreezePopover=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * You can choose to freeze or not to freeze the background using this property. When you set it to false, background view will be accessible to the user.
			 */
			cxPropFreezePopover : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropTagClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTagClass : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropAllowNewTagCreations=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to allow new tags on create
			 */
			cxPropAllowNewTagCreations : Lyte.attr("boolean"),
			/**
			 * @componentProperty { string } newTagMsg
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			newTagMsg : Lyte.attr("string", {default : ""}),
			/**
			 * @componentProperty { boolean } cxPropColorTags=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to disable color palette
			 */
			cxPropColorTags : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to disable clearing error message on value change
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Error message displayed below input
			 */
			cxPropErrorMessage : Lyte.attr("string" , {default : ""}),
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render custom error message
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Prefix set to zcqa of error
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Suffix set to zcqa of error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property disables the input.
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to error
			 */
			cxPropErrorClass : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to span of error
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It makes the input field as readonly.
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * To set custom attributes to input
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * custom attributes to input
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to mark a field as mandatory
			 */
			cxPropMandatory : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Message displayed as warning below input
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display warning below input
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to warning message
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to prevent focus on error of validate
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabIndex : Lyte.attr("string", {default : 1}),
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabindex : Lyte.attr("string", {default : 1}),
			/**
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets placeholder for input field
			 */
			cxPropPlaceholder : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropRedirectUrl
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The url to be reached when clicking on a tab
			 */
			cxPropRedirectUrl : Lyte.attr("string"),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			isError : Lyte.attr("boolean", {default : false}),//NO i18n
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropRequestModel
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The model name for which the request is to be made
			 */
			cxPropRequestModel : Lyte.attr('string',{default : 'tag'}),
			/**
			 * @componentProperty { boolean } cxPropCustomRequest=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to trigger custom request
			 */
			cxPropCustomRequest : Lyte.attr("boolean", {default : false}),
			selectedColor : Lyte.attr("string"),
			existingTag : Lyte.attr("string"),
			cxPropForcedFetch : Lyte.attr("boolean", {default : false}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			cxPropForcedFetch : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			/**
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This is used to set the class of the dropbox that is opened. This property is only applicable when the drop-box is not yielded
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),//No I18n
			cxPropTagStyle : Lyte.attr('boolean', {default : false}),
			cxPropInfoTooltip: Lyte.attr("string", { "default": "" }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropDefaultColors: Lyte.attr('array', { default: ['#F17574', '#F48435', '#E7A826', '#FEDA62', '#A8C026', '#63C57E', '#1DB9B4', '#57B1FD', '#879BFC', '#D297EE', '#FD87BD', "#969696", '#658BA8', '#B88562', '#A35164'] }), //NO I18N
			cxPropAddCustomColorsToPalette: Lyte.attr("boolean", { default: false }),//NO I18N
			cxPropWrapperClass: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropShowText: Lyte.attr("boolean", { default: false }),//NO I18N
			cxPropInputValue: Lyte.attr("string", { default: '' }),//NO I18N
			cxPropLabelClass: Lyte.attr("string", { "default": "" }), //NO I18n
			cxPropDisplayValue: Lyte.attr('string', { default: "name" }),
			cxPropAllowDropdown: Lyte.attr('boolean', { default: true }),
			searchValue: Lyte.attr("string", { "default": "" }),
		}
	},
	init : function(){
		this.data.placeholder = this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ( ( this.data.cxPropFrom == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "");//No I18n
		this.$node.resize = this.resize.bind(this);
		this.preventToggle = false;
		this.newlyAdded = [];

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.selectedColor = undefined;
		this.convertLtPropJson();
	},
	methods : {
		onBeforeAddToList : function(){
			if(this.data.cxPropFrom === "create" && this.data.cxPropMaxCount && this.data.cxPropValue && this.data.cxPropValue.length >= this.data.cxPropMaxCount) {
				if (this.getMethods("onMaxCountLimitReached")) {
					this.executeMethod("onMaxCountLimitReached"); //No I18n
				}
				this.setData("newTagMsg", "");
				this.setData("cxPropInputValue", "");
				return false;
			}
		},
		addToList : function(sel, selected_id, selected, comp, item){
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");
			}
			var tags = this.data.tags;//No I18n
			if(item.id == "cxNewTag"){
				this.newlyAdded.push(selected_id);
				Lyte.arrayUtils(this.data.cxPropValue, "push", {id : selected_id, name : selected_id, cxNew : true, color_code : this.data.selectedColor, font_color : this.getPicklistFontColor(this.data.selectedColor)});
				this.setData("selectedColor",  undefined);
			}
			else{
				var item = tags.filter(function(item){
					return item.id == selected_id;
				})[0];
				Lyte.arrayUtils(this.data.cxPropValue, "push", {id : item.id, name : item[this.data.cxPropDisplayValue],color_code : item.color_code, font_color : this.getPicklistFontColor(item.color_code)});//No I18n				
			}
			if(tags.length == JSON.parse(selected).length || (this.$node.querySelector("lyte-dropdown").component.childComp.querySelectorAll(".lyteDropdownActive").length > 1 && this.$node.querySelector("lyte-search").ltProp("value"))){
				this.setData({"tagsLength": false, existingTag : ""});//No I18n
			}
			this.setData("placeholder",(this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ( this.data.cxPropFrom == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "" ) )//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			this.$node.querySelector("lyte-search").setValue("")//no i18n
			this.preventClose = true;
			this.selectedColor = undefined;
		},
		removeFromList : function (ev, id, selected){
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");
			}
			var value = this.data.cxPropValue;//No I18n
			var index;
			for(var i=0; i<value.length; i++){
				if(value[i].id == id){
					index = i;
					break;
				}
			}
			Lyte.arrayUtils(this.data.cxPropValue, "removeAt", index, 1);//No I18n
			if(this.newlyAdded.indexOf(id) > -1){
				this.newlyAdded.splice(this.newlyAdded.indexOf(id), 1);
			}
			const selectedValue = JSON.parse(selected);
			const hasSelectedValue = selectedValue && selectedValue.length === 0;
			const dropdown = this.$node.querySelector('lyte-dropdown'); //no i18n
			if (hasSelectedValue && dropdown.ltProp('isOpen')) {
				dropdown.close();
			}
			// this.setSelected(this.getData("value"), this.getData("tags"));//No I18n
			if(value.length == 0){
				this.setData("placeholder",this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : _cruxUtils.getI18n("None"));//No I18n
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
// 			if(this.$node.querySelector("lyte-dropdown") != undefined){
// 				this.$node.querySelector("lyte-dropdown").open();//No I18n
// 			}
		},
		showNoResult : function(result, dom, ev, value){
			const lyteDropdown = this.$node.querySelector("lyte-dropdown");
			if(!this.preventToggle){
				if(lyteDropdown.component.childComp === undefined || lyteDropdown.component.childComp.classList.contains("lyteDropdownHidden")){
					lyteDropdown.toggle();//No I18n
				}
			} else {
				this.preventToggle = false;
			}
			if(!this.getData("cxPropAllowDropdown") && value === ""){
				lyteDropdown.close();
			}
			
			if(this.data.cxPropAllowNewTagCreations && value !== ""){
				if(this.newlyAdded.indexOf(value) === -1){
					this.setData("newTagMsg", value);	
					if(!this.data.selectedColor){
						var random = lyteDropdown.component.childComp.querySelector("crux-color-palette").cxProp("defaultColors")[Math.floor(Math.random()*13)]; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
						this.setData("selectedColor", random);					
					}
					if(value !== ""){
						this.setData("tagsLength", true);//No I18n						
					}				
				}
				else{
					this.setData({tagsLength : false, existingTag : value, newTagMsg : ""});
				}
			}
			else{
				this.setData("newTagMsg", "");
				for(var i=0;i<result.length;i++){
					if(!result[i].classList.contains("lyteDropdownActive")){
						this.setData("tagsLength", true);//No I18n
						return
					}
				}
				this.setData({tagsLength : false, existingTag : ""});		
			}

		},
		openDropdown : function(event, compoent){
		_cruxUtils.addMurhyInfo("crux-tag-component.js", "Feb Default Changes");
			this.selectedColor = undefined;
			if(this.data.cxPropReadonly){
				return false;
			}
			if (!this.getData("cxPropAllowDropdown") && !this.getData("searchValue")){
				return false;
			}
			if(this.getMethods("onBeforeShow")){
				this.executeMethod('onBeforeShow',arguments[0],arguments[1]);//no i18n
			}
			if(this.data.tags == undefined){
				if(this.requestFired){
					return false;
				}
				var module_name = typeof moduleRecordMapping !== "undefined" && this.data.cxPropModule ? moduleRecordMapping[this.data.cxPropModule].api_name : undefined;
				this.requestFired = true;
				if(this.data.cxPropCustomRequest && this.getMethods("onCustomRequest")){
					this.executeMethod("onCustomRequest", "tag", {module : module_name}).then(function(res){
						this.onSuccess(res);
					}.bind(this));
				}
				else{
					if(!this.data.cxPropRequestModel){
						this.data.cxPropRequestModel = "tag";
					}
					if(this.data.cxPropForcedFetch || this.data.cxPropFrom === 'criteria'){
						store.clearCachedQuery(this.data.cxPropRequestModel, {module : module_name , fromPage :"view"});
					}
					store.findAll(this.data.cxPropRequestModel, {module : module_name , fromPage :"view"},true).then(function(res){ //no i18n
						this.onSuccess(store.peekAll('tag').filterBy({'module_name' : module_name}).sortBy("name"));
					}.bind(this));					
				}
				return false;
			}
		},
		closeDropdown : function(ev, comp){
			if(this.$node.querySelector("lyte-search").ltProp("value") != ""){
				this.preventToggle = true;
				this.$node.querySelector("lyte-search").setValue("");//No i18n
				this.$node.querySelector("lyte-search").blur();//No I18n
				/*setTimeout(function(){
					this.$node.querySelector("lyte-search").blur();//No I18n
					this.$node.querySelector("lyte-dropdown").close();//No I18n
				}.bind(this))*/
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, ev, comp);
			}
		},
		beforeHide : function(ev){
			if(ev && (ev.target.classList.contains("cxPaletteCircle") || ev.target.classList.contains("cxPaletteMoreColorsBtn"))){
				return false;
			}
			if(this.preventClose){
				this.preventClose = false;
				if(ev && ev.type == "scroll"){
					return false;
				}
			}
		},
	    onSearchBoxFocused : function(event,node){
	    	var dropdown = this.$node.querySelector('lyte-dropdown') //no i18n
	    	if(this.data.cxPropFrom == 'criteria' && !dropdown.ltProp('isOpen')){
	    		dropdown.open();
	    	}
	    },
			onSearchBoxBlured : function(event,node){
	    	var dropdown = this.$node.querySelector('lyte-dropdown') //no i18n
	    	if(this.data.cxPropFrom == 'criteria' && dropdown.ltProp('isOpen')){
	    		setTimeout(()=>{
	    			if(this.preventClose){
						this.preventClose = false;
					}else{
						dropdown.close();
					}
	    		},300);
	    	}
	    },
		colorPaletteHide: function (id, event) {
			if (this.getMethods('onBeforeColorTagCompPaletteHide')) {
				this.executeMethod('onBeforeColorTagCompPaletteHide', id, event); //NO I18N
			}
		},
	    onSelectColor : function(color){
	    	this.setData("selectedColor", color);
	    },
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		hideInfoTooltip: function () {
			this.showHideInfoTooltip();
		},
	},
	getValue : function(){
		// return this.getData("valueObj");//No I18n
		return this.data.cxPropValue;//No I18n
	},
	validate : function(){
		if(this.data.cxPropFrom == "create"){
			if(!this.validateMandatory(!this.data.cxPropValue || this.data.cxPropValue.length == 0)){
				return false;
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
		else if((this.data.cxPropValue ==undefined || this.data.cxPropValue.length == 0) && !this.data.cxPropIgnoreEmptyValue){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));//No I18n
			return false;
		}
		return true;
	},
	// observeValue : function(){
	// 	if(this.getData('cxPropValue') !=undefined && this.getData("cxPropFrom") != "view"){

	// 		// if(this.getData('cxPropValue').hasOwnProperty('id')){
	// 		// 	this.setData('valueObj',[].concat(this.getData("cxPropValue"))) //no i18n
	// 		// }else{
	// 		// 	this.setData("valueObj", this.getData("cxPropValue"));//No I18n
	// 		// }
	// 		// var value=[];
	// 		// for(var i=0;i<this.getData('cxPropValue').length;i++){
	// 		// 	value.push(this.getData('cxPropValue')[i][this.data.cxPropDisplayValue])
	// 		// }
	// 		// this.setData('value',value); //no i18n
	// 	}
	// }.observes("cxPropValue").on('init'),//No I18n
	actions : {

		onFocusInput : function(onfocus){
			if (this.data.cxPropPrefixYield) {
				if(onfocus){
					this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxBoxInputFocused");//No I18n
				}
				else{
					this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");		//No I18n
				}
			}
		},

		searchBoxClicked : function(){
			const value = this.data.cxPropValue;
			const hasSelectedValue = value && value.length;
			const dropdown = this.$node.querySelector('lyte-dropdown'); //no i18n
			if (hasSelectedValue && dropdown.ltProp('isOpen')) {
				dropdown.close();
			}
			if(this.$node.querySelector("lyte-dropdown").ltProp("isOpen") == true){
				if(this.$node.querySelector("lyte-search").querySelector("input").value){
					this.$node.querySelector("lyte-search").setValue("");//No I18n
				}
				// this.$node.querySelector("lyte-dropdown").toggle();//No I18n
				return false;
			}
		},
		showMoreTags : function(){
			if(this.data.cxPropClipMode){
				this.mouseOverFn();	
			}
			else{
				this.clickFn();
			}
		},
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		setToolTip : function(Obj){
			if(Obj.offsetWidth < Obj.scrollWidth){
				Obj.setAttribute('title', Obj.textContent); //no i18n
		    }else{
		    	Obj.setAttribute('title', ""); //no i18n
		    }
		},
		hideMoreTags : function(){
			this.hideTags();
		},
		tagsTransition :function(tag){
			this.tagsTransition(tag);
		},
		stopPropagation : function(){
			event.stopPropagation();
	     	return false;
		},
		showInfoTooltip: function (origElem) {
			this.showHideInfoTooltip(origElem);
		},
	},
	// didConnect : function(){
	// 	if(this.getData("cxPropFrom") == "view" && this.getData("listValues")){
	// 		$L.fastdom.measure(function(){
	// 			var array = this.$node.querySelectorAll(".tagElementList");//No I18n
	// 			if(array.length){
	// 				var initialTop = array[0].offsetTop, breakpoint = 0;
	// 				for(var i=0; i<array.length; i++){
	// 					var li = array[i];
	// 					var newTop = li.offsetTop;
	// 					if(initialTop < newTop || breakpoint > 1){
	// 						if(breakpoint == 0){
	// 							initialTop = newTop;
	// 						}
	// 						breakpoint++;
	// 						if(breakpoint > 1){
	// 							if(!this.hideCount){
	// 								this.hideCount = i;
	// 								break;
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}.bind(this));
	// 		$L.fastdom.mutate(function(){
	// 			if(this.hideCount){
	// 				var array = this.$node.querySelectorAll(".tagElementList");//No I18n
	// 				for(var i=this.hideCount; i<array.length; i++){
	// 					array[i].style.display = "none";
	// 				}
	// 				this.$node.querySelector(".moreTagOption").children[1].innerText = " "+(array.length-this.hideCount)+" "+_cruxUtils.getI18n("crm.label.More");//no i18n
	// 				this.$node.querySelector(".moreTagOption").style.display = "";
	// 				this.findRowAndCallFixHeight(this.$node);
	// 			}
	// 		}.bind(this));
	// 	}
	// },
	setSelected : function(){
		var tags = this.getData("tags");//No I18n
		if(tags == undefined){
			return;
		}
		if(!this.getData("cxPropValue")){
			this.setData("cxPropValue",[]);//no i18n
		}
		// this.setData("selectedIds", []);//No I18n
		var selectedIds = this.getData("cxPropValue").map(function(tag){return tag.id});//No I18n
		this.setData("selectedIds", selectedIds);//No I18n
		if(tags.length == 0 || tags.length == selectedIds.length){
			this.setData({tagsLength : false, existingTag : ""});
		}
		this.$node.querySelector('lyte-dropdown').ltProp('selected',selectedIds); //no i18n
	},
	hideCount : 0,
	findRowAndCallFixHeight : function(tr){
		var table = document.querySelector("lyte-expresstable");//No I18n
		if(table){
			while(tr && tr.nodeName != "LYTE-EXPTABLE-TR"){//No I18n
				tr = tr.parentElement;
			}
			if(tr){
				table.fixRowHeight(tr);
			}
		}
	},
	// getTextWidthUsingCanvas : function(text,propObj, canvasElem){
	// 	var canvasElemCxt = canvasElem.getContext("2d");//no i18n
	// 	var fSize = propObj.font.split(' ');
	// 	var calcInjs = (12.4 - -.25 *(this.windowOuterWidth - 320) / 100);
	// 	fSize[0]=fSize[0].split("rem")[0]*calcInjs+"px";
	// 	propObj.font = fSize.join(' ');
	// 	canvasElemCxt.font = propObj.font;
	// 	return canvasElemCxt.measureText(text).width;
	// },
	observeValue : function(op){
		const cxPropValue = this.data.cxPropValue;
		const ValueLength = cxPropValue ? cxPropValue.length : 0;
		if(this.data.cxPropFrom === "view" && ValueLength){
			if(op && op.type === "change" && op.item === "cxPropClipMode"){
				this.setValueFn1({cxPropClipMode : this.data.cxPropClipMode});
			}
			else{
				this.setValueFn1();				
			}
		}
		else if(this.data.cxPropFrom === "create" && ValueLength){
			const maxCount = this.data.cxPropMaxCount;
			if (maxCount && ValueLength > maxCount) {
				const allowedTags = cxPropValue.slice(0, maxCount);
				const excessTags = cxPropValue.slice(maxCount, ValueLength);
				this.setData("tags", excessTags);
				this.setData("cxPropValue", allowedTags);
			}

			for(var i=0; i<ValueLength; i++){
				if(cxPropValue[i].color_code){
					cxPropValue[i].font_color = this.getPicklistFontColor(cxPropValue[i].color_code);					
				}
			}	
		}
	}.observes("cxPropValue", "cxPropClipMode").on("init"),//No I18n
	observeValue1 : function(){
		if(this.data.cxPropFrom == "view" && this.getData("cxPropValue")){
			if(this.getData("cxPropValue") && this.getData("cxPropClipMode")){
				var propObj = {font : "0.9rem LatoRegular"};//No I18n
				if(document.documentMode || /Edge/.test(navigator.userAgent)){
					propObj.font = "0.85rem LatoRegular";//No I18n
				}
				var total = 0, breakpoint = 0, hiddenElem = -1;
				var iframe = document.createElement("canvas");
				this.windowOuterWidth = window.outerWidth;
				var width= this.getData("cxPropWidth"); //no i18n
				width = width.split("px")[0];
				width = width-105;
				var li = document.createElement("li");
				li.classList.add("tagElementList","f13", "dIB", "cxAddedTags");//NO I18n
				document.body.appendChild(li);
				for(var i=0; i<this.getData("cxPropValue").length; i++){
					li.innerText = this.getData("cxPropValue")[i][this.data.cxPropDisplayValue];
					var liWidth = li.offsetWidth;
					total+=liWidth+15;
					if(total > width){
						if(breakpoint == 1 || this.getData("cxPropClipMode")){
							hiddenElem = i;
							break;
						}
						total = liWidth+17;
						breakpoint = 1;
					}
				}
				li.remove();
				var count = 0;
				this.hiddenElem = hiddenElem;
				for(var i=hiddenElem; i > -1 && i<this.getData("cxPropValue").length; i++){
					this.getData("cxPropValue")[i].hide = true;					
					count++;
				}
				this.setData("listValues", this.getData("cxPropValue"));//No I18n
				this.remainingValues = this.getData("cxPropValue").slice(hiddenElem); //no i18n
				// if(this.getData("cxPropClipMode")){
				// 	this.setData("listValues", this.getData("cxPropValue").slice(0, hiddenElem));
				// 	this.setData("remainingValues", this.getData("cxPropValue").slice(hiddenElem));				
				// }
				// else{
				// 	this.setData("listValues", this.getData("cxPropValue"));//No I18n
				// }
				if(count > 0){
					this.setData("showMore", count);//No I18n
				}
			}else if(this.getData("cxPropValue") && !this.getData("cxPropClipMode")){//NO I18n
			    this.setData("listValues", this.getData("cxPropValue"));//No I18n
			}
		}
	},
	hideTags : function(){
		var _this = this;
		clearTimeout(this.hideTimeout);
		this.hideTimeout = setTimeout(function(){
			var pop = document.getElementById("cxTagPopover");
			if(pop){
				pop.remove();					
			}
			// _this.$node.querySelector(".moreTagOptionPopover").setData("ltPropShow", true);
			_this.$node.querySelector("ul").classList.remove("cxPropOnFocusTag");//No I18n
		}, 100);
	},
	resize : function(options){
		this.setValueFn1(options);
	},
	resize1 : function(options){
	    var clipMode = options.cxPropClipMode != undefined ? options.cxPropClipMode : this.getData("cxPropClipMode");//No I18n
		if(this.getData("cxPropValue") && clipMode){
			var propObj = {font : "0.9rem LatoRegular"};//No I18n
			if(document.documentMode || /Edge/.test(navigator.userAgent)){
				propObj.font = "0.85rem LatoRegular";//No I18n
			}
			var total = 0, breakpoint = 0, hiddenElem = -1;
			var iframe = document.createElement("canvas");
			this.windowOuterWidth = window.outerWidth;
			options = options ? options : {};
			var width= options.cxPropWidth ? options.cxPropWidth : "230px";
			this.setData("cxPropWidth",width);//No I18n
			width = width.split("px")[0];
			width=width-105;
			var li = document.createElement("li");
			li.classList.add("tagElementList","f13", "dIB", "cxAddedTags");//NO I18n
			document.body.appendChild(li);
			for(var i=0; i<this.getData("cxPropValue").length && clipMode; i++){
				//var liWidth = this.getTextWidthUsingCanvas(this.getData("cxPropValue")[i][this.data.cxPropDisplayValue].toUpperCase(), propObj, iframe);
			    li.innerText = this.getData("cxPropValue")[i][this.data.cxPropDisplayValue];
				var liWidth = li.offsetWidth;
				total+=liWidth+15;
				// var bal = this.getData("cxPropValue").length - i;//No I18n
				// var clipModeLength = this.getTextWidthUsingCanvas(bal ? "and "+bal+" "+_cruxUtils.getI18n("crm.label.More") : "", propObj, iframe); //we need to check if the single line can also accomodate the "and 3 more" text so added that.//No I18n
				if(total > width){
					if(breakpoint == 1 || clipMode){
						hiddenElem = i;
						break;
					}
					total = liWidth+17;
					breakpoint = 1;
				}
			}
			li.remove();
			// if(hiddenElem == this.getData("cxPropValue").length-1){
			//     hiddenElem = 0;
			// }
			var count = 0;
			// hiddenElem--;
			var end = hiddenElem;
			var tags = this.$node.querySelectorAll("li");
			if((this.hiddenElem < hiddenElem && this.hiddenElem > 0) || hiddenElem < 0){ // changed the check the hiddenELemnt should be an positive number otherwise the check will be always true for lesser tags to hide.
				if(end < 0){
					end = this.getData("cxPropValue").length;
				}
				for(var i=this.hiddenElem; i<end && this.hiddenElem >=0; i++){
					tags[i].style.display = "";
				}
			}
			else{
				for(var i=hiddenElem; i<this.getData("cxPropValue").length; i++){ // changed this check, the tags from the hidden elem to the total length should be hiden.
					tags[i].style.display = "none";
				}
			}
			var ulNode = this.$node.querySelector(".uline1");//No I18n
			const more = this.$node.querySelector(".moreTagOption");
			if(hiddenElem < 0){
				if (more) {
					more.style.display = "none";
				}
			}
			else{
				if(more){
					more.style.display = "";
				}
				ulNode ? ulNode.innerText = " "+(this.getData("cxPropValue").length-hiddenElem)+" "+_cruxUtils.getI18n("crm.label.More"):"";
			}
			if(clipMode){
				this.remainingValues = this.getData("cxPropValue").slice(hiddenElem);
				if(ulNode){
					ulNode.removeAttribute("click");
					ulNode.addEventListener("mouseover", this.mouseOverEvent);
					ulNode.addEventListener("mouseleave", this.mouseLeaveEvent);
					ulNode.removeEventListener("click", this.clickEvent);
				}
			}
			else{
				if(ulNode){
					ulNode.removeAttribute("mouseover");
					ulNode.removeAttribute("mouseleave");
					ulNode.removeEventListener("mouseover", this.mouseOverEvent);
					ulNode.removeEventListener("mouseleave", this.mouseLeaveEvent);
					ulNode.addEventListener("click", this.clickEvent);
				}
			}
			this.hiddenElem = hiddenElem;
		}
		else if(this.data.cxPropValue && !clipMode){
		   var li = this.$node.querySelectorAll("li");//No I18n
		   for(var i=0; i<li.length; i++){
		       li[i].style.display = "";
		   }
		   const more = this.$node.querySelector(".moreTagOption");//No I18n
		   if(more){
		       more.style.display = "none";
		   }
		}
	},
	mouseOverFn : function(){
		if(this.getMethods("onBeforeShowMoreTags")){
			/**
			 * @method onBeforeShowMoreTags
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Called before more tags are displayed. return false to prevent it
			 */
			var ret = this.executeMethod("onBeforeShowMoreTags");
			
			
			if(ret == false){
				return false;
			}
		}
		var pop = document.getElementById("cxTagPopover");//No I18n
		var ul = this.$node.querySelector("ul");//No I18n
		if(!ul.classList.contains("cxPropOnFocusTag")){
			clearTimeout(this.newTimer);
			document.querySelector(".cxPropOnFocusTag") ? document.querySelector(".cxPropOnFocusTag").classList.remove("cxPropOnFocusTag") : "";
			this.newTimer = setTimeout(function(){
				ul.classList.add("cxPropOnFocusTag");//No I18n
				if(pop){
					pop.setData("remainingValues", this.remainingValues);
					pop.querySelector("lyte-popover").setData("ltPropShow", true);//No I18n
				}
				else{
					pop = Lyte.Component.render("crux-tag-popover", {remainingValues : this.remainingValues, id : "cxTagPopover", cxPropFreezePopover : this.data.cxPropFreezePopover, tagsClickable : this.data.cxPropTriggerTagClick}, "body");
					var self = this;
					pop.setMethods({
						onTagClick : function(tag){
							self.tagsTransition(tag);
						}
					});
				}							
			}.bind(this), 20);
		}
	},
	didConnect : function(){
		this.mouseOverEvent = this.mouseOverFn.bind(this);
		this.mouseLeaveEvent = this.hideTags.bind(this);
		this.clickEvent = this.clickFn.bind(this);
		if(this.data.cxPropFrom == "create"){
			this.setFocusUtil();
		}
	},
	clickFn : function(){
		var tagElementList = this.$node.querySelectorAll(".tagElementList");//No I18n
		const more = this.$node.querySelector(".moreTagOption");
		for(var i=this.hideCount; i<tagElementList.length; i++){
			tagElementList[i].style.display = ""
		}
		if (more) {
			more.style.display = "none";
		}
		this.findRowAndCallFixHeight(this.$node);
		if(this.getMethods("onShowMoreTags")){
			/**
			 * @method onShowMoreTags
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Called on click of show more
			 */
			this.executeMethod("onShowMoreTags");//No I18n
		}
		this.hiddenElem = this.getData("cxPropValue").length;
		event.stopPropagation();
	},
	// getTextWidthUsingCanvas : function (text,propObj) {
	// 	var span = document.createElement("span");
	// 	span.innerText = text;
	// 	span.style.font = propObj.font;
	// 	span.style.visibility = "hidden";
	// 	document.body.append(span);
	// 	var width = span.offsetWidth;
	// 	span.remove();
	// 	return width;
	// }
	setValueFn : function(options){
		var count = 0;
		var fromResize = false;
		if(options){
			fromResize = true;
			this.setData("cxPropClipMode", options.cxPropClipMode != undefined ? options.cxPropClipMode : this.data.cxPropClipMode);//No I18n
			this.setData("cxPropWidth", options.cxPropWidth ? options.cxPropWidth : this.data.cxPropWidth);//No I18n
		}
		var remainingValues = [];
			var li, tags;
			if(!fromResize){
				li = document.createElement("li");
				li.classList.add("tagElementList","bR2", "dIB", "bdr1px", "pL20");//No I18n
				document.body.appendChild(li);				
			}
			else{
				tags = this.$node.querySelectorAll(".tagElementList");//No I18n
			}
			var total = 0, breakpoint = false;
			var width = this.data.cxPropWidth;
			try{
				width = width.split("px")[0];
			}catch(e){
				width = 230;
			}
			if(this.data.cxPropClipMode && this.data.cxPropValue.length != 1){
				width = width-130;
			}
			else{
				width = width-60;
			}
			var prevWidth = 0;
			for(var i=0; i<this.data.cxPropValue.length; i++){
				if(breakpoint){
					this.data.cxPropValue[i].hide = true;
					if(fromResize){
						tags[i].style.display = "none";
					}
					count++;
					remainingValues.push(this.data.cxPropValue[i]);
					continue;
				}
				var liWidth;
				delete this.data.cxPropValue[i].hide;
				delete this.data.cxPropValue[i].showTooltip;
				delete this.data.cxPropValue[i].showTooltipWidth;
				if(fromResize){
					tags[i].style.display = "";
					// tags[i].style.width = "";
					tags[i].querySelector("span").style.width = "";
					tags[i].setAttribute("lt-prop-title", "");
					// tags[i].classList.remove("cruxTagTitle");
					tags[i].querySelector("span").classList.remove("cruxTagTitle");//No I18n
					liWidth = tags[i].offsetWidth;
					liWidth+=21;
				}
				else{
					li.innerText = this.data.cxPropValue[i][this.data.cxPropDisplayValue]; //eslint-disable-line @zoho/webperf/layout-thrashing
					liWidth = li.offsetWidth+15;					
				}
				total+=liWidth;
				if((total+20) > width){
					if(this.data.cxPropClipMode){
						breakpoint = true;						
					}
					else{
						total = 0;
					}
					// var set = true;
					if(this.data.cxPropClipMode && i > 0 && i == (this.data.cxPropValue.length-1)){
						width += 60
					}
					// if(set){
						this.data.cxPropValue[i].showTooltip = true;
						if((width-prevWidth) < (liWidth - 20)){
						    this.data.cxPropValue[i].showTooltipWidth = (width-prevWidth-7)+"px";
						}
						if(fromResize){
							if((width-prevWidth) < (liWidth - 20)){
								tags[i].setAttribute("lt-prop-title", tags[i].innerText);
							    tags[i].querySelector("span").style.width = (width-prevWidth-7)+"px";
							    tags[i].querySelector("span").classList.add("cruxTagTitle");//No I18n
							}
						}
					// }							
					prevWidth = 0;
				}
				else{
					prevWidth+=liWidth					
				}
			}
			if(!fromResize){
				li.remove();				
			}
		this.setData("showMore", count);//No I18n
		this.setData("listValues", this.data.cxPropValue);//No I18n
		const more = this.$node.querySelector(".moreTagOption");
		if(fromResize){
			if(count > 0){
				if (more) {
					more.style.display = "";
				}
				this.$node.querySelector(".uline1").innerText = " "+count+" "+_cruxUtils.getI18n("crm.label.More");//No I18n
			}
			else{
				if (more) {
					more.style.display = "none";
				}
			}
		}
		this.remainingValues = remainingValues;
	},
	setValueFn1 : function(options){
		var fromResize = false;
		if(options){
			fromResize = true;
			this.setData("cxPropClipMode", options.cxPropClipMode != undefined ? options.cxPropClipMode : this.data.cxPropClipMode);//No I18n
			this.setData("cxPropWidth", options.cxPropWidth ? options.cxPropWidth : this.data.cxPropWidth);//No I18n
		}
		else if(!this.data.cxPropMaxCount){
			this.setData("listValues", this.data.cxPropValue);
		}
		else{
			var listValues = this.data.cxPropValue.slice(0);
			this.remainingValues = [];
			for(var i=this.data.cxPropMaxCount; i<listValues.length; i++){
				listValues[i].hide = true;
				this.remainingValues.push(listValues[i]);
			}
			this.setData("listValues", listValues);
			this.setData("showMore", this.data.cxPropValue.length-this.data.cxPropMaxCount);
			this.setData("showMoreForMaxCount", this.data.showMore > 0);
		}
		this.extraWidth = 20;
		if(!this.data.cxPropMaxCount){
		$L.fastdom.measure(function(){
			var child = this.$node ? this.$node.querySelectorAll("li") : [];
			if(!fromResize){
				this.widths = [];
				for(var i=0; i<child.length-1; i++){
					// if(child[i].offsetWidth == 0){
					// 	var span = document.createElement("span")
					// 	span.style.visibility = "hidden";
					// 	document.body.append(span);
					// 	span.innerText = child[i].innerText;
					// 	this.widths[i] = span.offsetWidth+22;
					// 	span.remove();
					// }
					this.widths.push(child[i].offsetWidth+this.extraWidth);
				}				
			}
			var width = this.data.cxPropWidth;
			try{
				width = Number.parseInt(width.split("px")[0]);
				width-=25;
			}catch(e){
				width = 230;
			}
			if(width != 230 && this.$node.querySelector("ul")){
				this.$node.querySelector("ul").classList.remove("w230");
			}
			var total = 0, prevWidth = 0;
			if(this.data.cxPropClipMode && this.data.cxPropValue.length != 1){
				width = width-85;
			}
			else{
				width = width-20;
			}
			$L.fastdom.mutate(function(){
				var i=0, hideChildren = false;
				for(;i<this.widths.length; i++){
					if(width <= 0 || hideChildren){
						child[i].style.display = "none";
						continue;
					}
					total+=this.widths[i];
					if(this.data.cxPropClipMode && i == this.widths.length-1 && i!=0){
						width+=72;
					}
					if(total > width){
						var minWidthNeeded = child[i].textContent[0] === child[i].textContent[0].toLowerCase() ? 20 : 24;
						var calc = (width-prevWidth);
						if(calc >= (minWidthNeeded+this.extraWidth)){
							var setWidth = this.widths[i]-this.extraWidth-7;
							var goingWidth = width-prevWidth-this.extraWidth-7;
							child[i].style.display = "";
							child[i].setAttribute("lt-prop-title", child[i].textContent);
							child[i].querySelector("span").style.width = (goingWidth > setWidth ? setWidth : goingWidth)+"px";							
							child[i].querySelector("span").classList.add("cruxTagTitle");
						}
						else{
							// if(this.data.cxPropClipMode){
								if(i == 0){
									hideChildren = true;
								}
								i--;
							// }
							// else{
							// 	//to be handled
							// 	child[i].style.display = "";
							// 	child[i].setAttribute("lt-prop-title", "");
							// 	child[i].querySelector("span").style.width = "";
							// 	child[i].querySelector("span").classList.remove("cruxTagTitle");
							// 	prevWidth+=this.widths[i];
							// }
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
						child[i].querySelector("span").style.width = "";
						child[i].querySelector("span").classList.remove("cruxTagTitle");
						prevWidth+=this.widths[i];
					}
				}
				var count = 0, remainingValues = [], values = this.data.cxPropValue;
				for(; i<child.length-1; i++){
					child[i].style.display = "none";
					count++;
					if(values[i] != undefined){
						remainingValues.push(values[i]);
					}
					else{
						count--;
					}
				}
				const more = this.$node.querySelector(".moreTagOption");
				if(count == 0){
					if (more) {
						more.style.display = "none";
					}
				}
				else{
					if (more) {
						more.style.display = "";
					}
					this.$node.querySelector(".moreCount").innerText = " "+count+" "+_cruxUtils.getI18n("crm.label.More");
				}
				this.remainingValues = remainingValues;
				if(!fromResize && this.getMethods("afterRender")){
					/**
					 * @method afterRender
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Called after render of tags
					 */
					this.executeMethod("afterRender", this);
				}
			}.bind(this))
		}.bind(this));			
		}
	},
	tagsTransition : function(tag){
		if(this.data.cxPropTriggerTagClick){
			var cvid = moduleRecordMapping ? moduleRecordMapping[this.data.cxPropModule].custom_view.id : "";
			var url, route;
			if(this.data.cxPropRedirectUrl){
				route = Lyte.Router.getRoute(this.data.cxPropRedirectUrl);
				// url = this.data.cxPropRedirectUrl+"filters="+$ESAPI.encoder().encodeForURL(JSON.stringify({field : {id : "", api_name : "Tag"}, comparator : "equal", value : [tag]}));
			}
			else{
				route = {route : "crm.tab.module.custom-view.list", dynamicParams : [this.data.cxPropModule, cvid]};
				// url = Lyte.Router.getURL({route : "crm.tab.module.custom-view.list", dynamicParams : [this.data.cxPropModule, cvid], queryParams : {filters : JSON.stringify({field : {id : "", api_name : "Tag"}, comparator : "equal", value : [tag]})}})				

			}
			if(!route.queryParams){
				route.queryParams = {}
			}
			if(!route.queryParams){
				route.queryParams = {};
			}
			route.queryParams.filters = JSON.stringify({field : {id : "", api_name : "Tag"}, comparator : "equal", value : [tag]});
			url = (Lyte && Lyte.Router) ? Lyte.Router.getURL(route) : (window.Lyte && window.Lyte.Router) ? window.Lyte.Router.getURL(route) : route;
			window.open(url, "_blank");
		}
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Called after element has rendered on viewport
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	didDestroy : function(){
		var ele = document.querySelector("crux-tag-popover");
		if(ele){
			ele.remove();

		}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-tag-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") === "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n

	observeIsError : function(){

		// if (this.data.cxPropPrefixYield) {
		// 	if (this.$node.querySelector(".cxBoxWithRightIcon")) {
		// 		if (this.data.isError) {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxErrorBoxWithRightIcon");
		// 		} else {
		// 			this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxErrorBoxWithRightIcon");
		// 		}
		// 	}
		// } 
		// else {
		// 	//add cxErrorBox class here if you want to add.
		// }
		var lytedropdown = this.$node.querySelector("lyte-dropdown");
		if (lytedropdown) {
			if (this.data.isError) {
				lytedropdown.classList.add("cxErrorBox");
			} else {
				lytedropdown.classList.remove("cxErrorBox");
			}
		}

	}.observes("isError").on("didConnect"),//No I18n
	keyDownEvent : function(){
		if(this.$node.querySelector('lyte-dropdown') && this.$node.cxProp('aria')){
		  this.bindEventForAria();
		}
	}.observes('cxPropAria').on('didConnect'),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-dropdown");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),

	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-dropdown");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropPrefixYield").on("didConnect"),//No I18n
	resetData:function(){	
		this.setData('cxPropValue','');
	},
	onSuccess : function(res){
		this.requestFired = false;
		this.setData("tags", res);
		this.data.tags.forEach(function(tag){
			this.newlyAdded.push(tag[this.data.cxPropDisplayValue]);
		}.bind(this));
		this.setSelected();
		this.$node.querySelector("lyte-dropdown").open();
	},
	getPicklistFontColor : function(colourCode){
		return Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(colourCode);
	},
	observeField_new : function(){
		if(this.$node.querySelector("lyte-dropdown")){
		    if(this.data.isError){
				//eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
			    this.$node.querySelector("lyte-dropdown").classList.add("cxErrorBox");//No I18n
		    }
		    else{
				//eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
		        this.$node.querySelector("lyte-dropdown").classList.remove("cxErrorBox");//No I18n
		    }
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
}, {mixins : ["crux-element-validation", "crux-aria-dropdown-mixin"]});//No I18n

/**
 * @syntax nonYielded
 * <crux-tag-component></crux-tag-component>
 */
