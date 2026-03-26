/**
 * @component crux-layout-component
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-layout-component", {
_template:"<template tag-name=\"crux-layout-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\"> {{cruxMaskValue(cxPropValue.display_label,cxPropMaskingProperties)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropViewClipLabel}}\"><template case=\"true\"><lyte-text lt-prop-value=\"{{cxPropValue.display_label}}\"></lyte-text> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropPrefixYield,'||',cxPropSuffixYield)}}\"><template case=\"true\"> <span class=\"cxElemCompViewValue\">{{cxPropValue.display_label}}</span> </template><template case=\"false\"> {{cxPropValue.display_label}} </template></template></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> </template><template case=\"filter\"></template><template case=\"criteria\"></template><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\">{{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\">{{unescape(cruxEncodeHTML(cxPropInfoTooltip))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div @class=\"cxElementValue cxYieldObserver {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} {{cxPropDivWrapperClass}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> {{addMurhyInfo(\"crux-layout-component.html\",\"Feb Default Changes\")}} <lyte-dropdown id=\"{{cxPropId}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-yield=\"true\" lt-prop-type=\"{{cxPropType}}\" lt-prop-tabindex=\"1\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-active-element=\"{{concat('#',cxPropId,'search_layout')}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" on-add=\"{{method('addToList')}}\" on-remove=\"{{method('removeFromList')}}\" lt-prop-disabled-list=\"{{disabledList}}\" lt-prop-selected=\"{{selectedIds}}\" on-option-selected=\"{{method('selectLayout')}}\" on-before-show=\"{{method('onBeforeLayoutDropdown')}}\" on-hide=\"{{method('closeDropdown')}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}} {{if(cxPropIsDropdownIconNode,'cxDropdownIconNodePresent','')}}\" on-before-hide=\"{{method('beforeHide')}}\" lt-prop-display-value=\"{{displayValue}}\" lt-prop-placeholder=\"{{placeholder}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;followcursor&quot;, &quot;appearance&quot;: &quot;box&quot;}\" lt-prop-icon-class=\"{{if(cxPropShowDisabledIcon,cxPropDisabledIconClass,cxPropDropdownIconNodeClass)}}\" lt-prop-icon-node-class=\"{{if(cxPropShowDisabledIcon,cxPropDisabledIconClass,cxPropDropdownIconNodeClass)}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-prevent-parent-scroll=\"{{cxPropPreventParentScroll}}\" on-show=\"{{method('onDropdownOpen')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!=',&quot;single&quot;)}}\"><template case=\"true\"> <lyte-drop-button data-zcqa=\"{{cxPropZcqa}}\" class=\"{{if(cruxOr(cxPropDropdownIconNodeClass,cxPropShowDisabledIcon),'ltDropdownIconNodePresent','')}}\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{value}}\" item=\"layout\" index=\"index\"> <li data-value=\"{{layout.id}}\"> <span class=\"lyteDropdownVisible\" onmouseenter=\"{{action('setToolTip',this)}}\">{{layout.display_label}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-search class=\"cxW100Per\" lt-prop-type=\"text\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.{{searchScope}}&quot;, &quot;target&quot;:&quot;.cruxlayoutList&quot;, &quot;search&quot;:&quot;.cruxlayoutList:not(.lyteDropdownActive)&quot;}\" lt-prop-disabled=\"{{cxPropDisabled}}\" on-search=\"{{method('showNoResult')}}\" id=\"search_layout\" lt-prop-placeholder=\"{{placeholder}}\" onclick=\"{{action('searchBoxClicked')}}\" on-focus=\"{{method('onSearchBoxFocused')}}\" onkeydown=\"{{action('preventDefault',this,event)}}\" lt-prop-trim=\"true\" lt-prop-readonly=\"{{cxPropReadonly}}\"></lyte-search> </li> </ul> <template is=\"if\" value=\"{{expHandlers(cxPropIsDropdownIconNode,'&amp;&amp;',expHandlers(cxPropDisabled,'!'))}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropDropdownIconNodeClass}}\"></lyte-icon> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><lyte-icon class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></lyte-icon></template></template></template></template> </lyte-drop-button> </template></template> <lyte-drop-box class=\"cxDropbox {{cxPropBoxClass}}\"> <lyte-drop-body class=\"{{searchScope}}\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxLayoutLoaderWrap cxAlignCenter\"> <span class=\"cxElementsLoaderBg cxLayoutLoaderIcon\"></span> </div> </template><template case=\"false\"><template is=\"for\" items=\"{{layout}}\" item=\"lay\" index=\"index\"><template is=\"if\" value=\"{{negate(cruxContains(cxPropExcludeIds,lay.id))}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(modelReq,'==','wizard')}}\"><template case=\"true\"> <lyte-drop-item class=\"picklist_values cruxlayoutList\" data-value=\"{{lay.id}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',lay.display_label)}}\" selected=\"{{if(cruxContains(selectedIds,lay.id),true,false)}}\">{{lay.display_label}}</lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item class=\"picklist_values cruxlayoutList\" data-value=\"{{lay.id}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',lay.display_label)}}\" selected=\"{{if(cruxContains(selectedIds,lay.id),true,false)}}\">{{lay.display_label}}</lyte-drop-item> </template></template></template></template></template></template></template> <template is=\"if\" value=\"{{expHandlers(layoutLength,'!')}}\"><template case=\"true\"> <div class=\"lyteDropdown-disabled cxDropdownNoResult\">{{cruxGetI18n('crm.label.no.options.found')}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[],"additional":{"next":"create"}},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3],"trans":true},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"text","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"registerYield","position":[3,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,5]},{"type":"attr","position":[3,7]},{"type":"if","position":[3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","lyteViewPort","cxPropValue","cxPropFrom","cxPropModule","layout","value","layoutLength","disabledList","cxPropEmptyValue","selectedIds","cxPropField","cxPropFieldKey","cxPropZcqa","placeholder","cxPropType","cxPropIgnoreEmptyValue","showLoading","moduleId","cxPropAppearance","cxPropBoundary","lyteUnbound","cxPropTabIndex","cxPropTabindex","cxPropId","modelReq","cxPropClass","searchScope","cxPropMaskingProperties","cxPropDontShowDisabledLayouts","displayValue","cxPropLayouts","cxPropPlaceholder","cxPropViewInfoTooltip","cxPropDisplayValue","cxPropIsDropdownIconNode","cxPropDropdownIconNodeClass","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropDisabled","cxPropAria","cxPropAriaButton","cxPropAriaBox","cxPropAriaBody","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropReadonly","cxPropTooltip","tooltip","cxPropCustomData","cxPropPreventParentScroll","cxPropExcludeIds","cxPropBoxClass","cxPropCustomData","cxPropPrefixYield","isError","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropMandatory","cxPropDisableIntegLayout","cxPropAriaErrorProperties","cxPropBoundary","cxPropInfoTooltip","cxPropViewClipLabel","cxPropDivWrapperClass"],
_observedAttributesType :["object","object","boolean","object","string","string","array","array","boolean","array","string","array","object","string","string","string","string","boolean","boolean","string","string","object","boolean","string","string","string","string","string","string","object","boolean","string","array","string","boolean","string","boolean","string","boolean","string","boolean","boolean","object","object","object","string","object","string","string","boolean","string","string","object","boolean","array","string","object","boolean","boolean","string","boolean","string","string","string","boolean","boolean","object","object","string","boolean","string"],
//No I18n
	data : function(){
		_cruxUtils.addMurhyInfo("crux-layout-component.js", "Feb Default Changes");
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
			 * Set to true to render element when it comes to viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * The module for which the field belongs to make request
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModule : Lyte.attr("string"),//No I18n
			layout : Lyte.attr("array"),//No I18n
			value : Lyte.attr("array", {default : []}),//No I18n
			layoutLength : Lyte.attr("boolean", {default : true}),//No I18n
			disabledList : Lyte.attr("array", {default : ["cruxDisabled"]}),//No I18n
			/**
			 * Value displayed when cxPropValue is empty
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			selectedIds : Lyte.attr("array",{default : []}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * The selector which determines which key holds the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * The zcqa set to the element
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			placeholder : Lyte.attr("string", {default : _cruxUtils.getI18n("None")}),//No I18n
			/**
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropType : Lyte.attr("string", {default : "multisearch"}),//No I18n
			/**
			 * Set to true to ignore empty value on validate
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			showLoading : Lyte.attr('boolean',{default : true}), //no i18n
			moduleId : Lyte.attr('string'), //no i18n
      /**
       * @componentProperty { string } cxPropAppearance
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
      /**
	   *  represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the lyte-drop-button crosses this boundary(by scrolling), it automatically closes the dropdown.
       * @componentProperty { object } cxPropBoundary
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
      /**
       * @componentProperty { boolean } lyteUnbound=false
       * @author anuja.manoharan
       * @version 1.0.0
       */
      lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
	  /**
	   * It sets tab index for input
	   * @componentProperty { string } cxPropTabIndex
	   * @author anuja.manoharan
	   * @version 1.0.0
	   */
	  cxPropTabIndex : Lyte.attr("string"), //No I18n
	  /**
	   * It sets tab index for input
	   * @componentProperty { string } cxPropTabindex
	   * @author mariswaran.sv
	   * @version 1.0.0
	   */
	  cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * Id set to the dropdown
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO I18n
			modelReq : Lyte.attr('string'), //no i18n
      /**
	   * Class set to the dropdown
       * @componentProperty { string } cxPropClass
       * @author anuja.manoharan
       * @version 1.0.0
       */
      cxPropClass : Lyte.attr("string"),//No I18n
	      searchScope : Lyte.attr("string", {default : "parentscope_"}),//No I18n
	      /**
	       * @componentProperty { object } cxPropMaskingProperties
	       * @author anuja.manoharan
	       * @version 1.0.0
	       */
	      cxPropMaskingProperties : Lyte.attr("object"),//No I18n
	      /**
		   * Set to true to disable integration layouts
	       * @componentProperty { boolean } cxPropDontShowDisabledLayouts=false
	       * @author anuja.manoharan
	       * @version 1.0.0
	       */
	      cxPropDontShowDisabledLayouts : Lyte.attr("boolean", {default : false}),//No I18n
	      displayValue : Lyte.attr("string", {default : _cruxUtils.getI18n('crm.select')}),//No I18n
	      /**
	       * @componentProperty { array } cxPropLayouts
	       * @author anuja.manoharan
	       * @version 1.0.0
	       */
	      cxPropLayouts : Lyte.attr("array"),//No I18n
		  /**
		   * Set a placeholder for your dropdown when nothing is selected
		   * @componentProperty { string } cxPropPlaceholder
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropPlaceholder : Lyte.attr("string"),//No I18n
		  /**
		   * Set to true to render info icon next to field label
		   * @componentProperty { boolean } cxPropViewInfoTooltip=false
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
		  /**Set a display-value or the content to be displayed as selected
		   * @componentProperty { string } cxPropDisplayValue
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropDisplayValue : Lyte.attr("string"),
		  /**
		   * Set to true to render custom dropdown icon
		   * @componentProperty { boolean } cxPropIsDropdownIconNode=false
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropIsDropdownIconNode : Lyte.attr("boolean", {default : false}),
	  	  /**
			 * Class set to custom dropdown icon
	  	   * @componentProperty { string } cxPropDropdownIconNodeClass
	  	   * @author anuja.manoharan
	  	   * @version 1.0.0
	  	   */
	  	  cxPropDropdownIconNodeClass : Lyte.attr("string",{default : 'dropdown'}),
	  	  /**
			 * Set to true to render custom disable icon
	  	   * @componentProperty { boolean } cxPropShowDisabledIcon=false
	  	   * @author anuja.manoharan
	  	   * @version 1.0.0
	  	   */
	  	  cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
		  /**
		   * Class set to custom disable icon
		   * @componentProperty { string } cxPropDisabledIconClass
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
		  /**
		   * 	Set this to true, to disable the dropdown.
		   * @componentProperty { boolean } cxPropDisabled=false
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropDisabled : Lyte.attr("boolean", {default : false}),
			cxPropAria : Lyte.attr('boolean', {default : false}),
		  	cxPropAriaButton : Lyte.attr("object"),
		  	cxPropAriaBox : Lyte.attr('object', {default : {}}),
		  	cxPropAriaBody : Lyte.attr('object', {default : {}}),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
		  /**
		   * This makes the dropdown readonly when set to true.
		   * @componentProperty { boolean } cxPropReadonly=false
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropReadonly : Lyte.attr("boolean", {default : false}),
		  /**
		   * @componentProperty { string } cxPropTooltip
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropTooltip : Lyte.attr("string"),
		  tooltip : Lyte.attr("string"), //no i18n
		  /**
		   * @componentProperty { object } cxPropCustomData
		   * @author anuja.manoharan
		   * @version 1.0.0
		   */
		  cxPropCustomData : Lyte.attr('object'),
			/**
			 * Disables scroll of all scrollable parents of the dropdown(only parents). This is generally used for multiselects since they don't support lt-prop-freeze.
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventParentScroll : Lyte.attr('boolean'),
			/**
			 * @componentProperty { array } cxPropExcludeIds
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropExcludeIds : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * This is used to set the class of the dropbox that is opened.
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoxClass : Lyte.attr("string", {default : ""}),
			cxPropCustomData : Lyte.attr('object'), //no i18n
		  	cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			isError : Lyte.attr("boolean"),
			/**
			 * Message displayed below element
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string" , {default : ""}),
			/**
			 * Set to true to render custom error message below element
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorYield : Lyte.attr("boolean"),
			/**
			 * Prefix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),
			/**
			 * Suffix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),
			/**
			 * Class set to error message
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),
			/**
			 * Set to true to mark an element as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * Set to true to disable integration layouts
			 * @componentProperty { boolean } cxPropDisableIntegLayout=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisableIntegLayout : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropBoundary: Lyte.attr('object'),
			cxPropInfoTooltip: Lyte.attr("string", { "default": "" }),
			cxPropViewClipLabel: Lyte.attr("boolean", { default: false }), //No I18n
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' })
		}
	},
	init : function(){
		var from = this.data.cxPropFrom;//No I18n
		if(from == "criteria" || from == "filter" || from == 'create'){
			var moduleId;
			if(typeof moduleRecordMapping != "undefined" && this.data.cxPropModule){
				this.data.moduleId = moduleRecordMapping[this.data.cxPropModule].id; //no i18n
			}
			else{
				this.data.moduleId = this.data.cxPropModule;//No I18n
			}
			if(!this.data.modelReq){
				this.data.modelReq = this.data.cxPropField && this.data.cxPropField.api_name ? ((this.data.cxPropField.api_name.match('Layout')) ? 'layout' : 'wizard') : 'layout' ; //no i18n
			}
			var searchScope = this.data.searchScope;
			searchScope = searchScope+this.data.modelReq;
			if(this.getData("cxPropId")){
				// this.setData("searchScope", "parentscope_layout_"+this.getData("cxPropId"));//No I18n
				searchScope = searchScope+"_"+this.data.cxPropId;
			}
			this.setData("searchScope", searchScope);//No I18n
			if(!this.data.cxPropType){
				this.setData('cxPropType','multisearch'); //no i18n
			}
			if(this.data.cxPropDisplayValue){
				this.setData("displayValue", this.data.cxPropDisplayValue)
			}
			if(from === "create"){
				this.setFocusUtil();
			}
		}
		this.convertLtPropJson();
	},
	methods : {
		addToList : function(sel, id, selected){
			Lyte.arrayUtils(this.data.value, "push", this.data.layout.filter(function(item){return item.id == id})[0]);//No I18n
			Lyte.arrayUtils(this.data.selectedIds,"push",id); //no i18n
			//this.$node.querySelector("lyte-search").ltProp("placeholder", "");//No I18n
			if ($L("." + this.getData("searchScope") + " lyte-drop-item", this.dropdown.component.childComp).length === JSON.parse(selected).length) { //eslint-disable-line @zoho/webperf/no-complex-selector
				this.setData("layoutLength", false);//No I18n
			}
			this.setData("placeholder", this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ( ( this.data.cxPropFrom == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "") );//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			if(this.$node.querySelector("lyte-search").ltProp("value") != ""){
				this.adding = true;
				this.$node.querySelector("lyte-search").setValue("");//No i18n
			}
			this.preventClose = true;
		},
		removeFromList : function(ev, id){
			var value = this.data.value;//No I18n
			for(var i=0; i<value.length; i++){
				if(value[i].id == id){
					Lyte.arrayUtils(this.data.value, "removeAt", i);//No I18n
					Lyte.arrayUtils(this.data.selectedIds,"removeAt",i); //no i18n
					break;
				}
			}
			if(this.data.value.length == 0){
				this.setData("placeholder", this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ( ( this.data.cxPropFrom == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : _cruxUtils.getI18n("None")) );//No I18n
			}
			this.setData("layoutLength", true);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			if(this.dropdown){
				this.dropdown.open();//No I18n
			}
		},
		showNoResult : function(result){
			if(this.data.showLoading){
				return;
			}
			if(this.closing){
				this.closing = false;
			}
			else if(this.dropdown && this.dropdown.component.childComp.classList.contains("lyteDropdownHidden")){
				this.dropdown.toggle();//No I18n
			}
			if(this.adding){
				this.adding = false;
			}
			else{
				result = result.filter((item)=>{return !item.classList.contains('lyteDropdownActive')}) //no i18n
				this.setData("layoutLength", !(result.length == 0));//No I18n				
			}
		},
		selectLayout : function(ev, id, comp, ele){
			this.setData("value", [{id : id, display_label : ele.innerText}]);//No I18n
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue());//No I18n
			}
			this.setData("selectedIds", [id]);//No I18n
		},
		onBeforeLayoutDropdown : function(){
			if(this.data.cxPropReadonly){
				return false;
			}
			if(this.getMethods("onBeforeShow")){
				this.executeMethod('onBeforeShow',arguments[0],arguments[1]);//no i18n
			}
			if(this.data.cxPropLayouts){
				this.setData("layout", this.data.cxPropLayouts);//No I18n
				this.setData("showLoading", false);//no i18n
				if(this.dropdown){
					this.dropdown.resetPosition();
				}
				if(this.data.cxPropType != "single"){
					this.dropdown ? this.dropdown.setData("ltPropSelected", this.getData("selectedIds")) : "";//No I18n					
				}
				else if(this.data.selectedIds.length > 0){
					this.dropdown ? this.dropdown.ltProp("selected", this.data.selectedIds[0]) : "";//No I18n
				}
			}
			if(this.data.layout == undefined){
				var layouts;
				var moduleId = this.getData('moduleId'); //no i18n
				var self=this;
				var module_api_name = this.data.cxPropModule && moduleRecordMapping ?  moduleRecordMapping[this.data.cxPropModule].api_name : this.data.cxPropModule;//no i18n
				store.findAll(this.data.modelReq, {module : module_api_name}, true,undefined,this.data.cxPropCustomData).then(function(layouts){
					if(self.data.cxPropType == "single" && self.data.cxPropFrom != 'create' && (layouts[0] == undefined || layouts[0].id != "cruxLayoutSelect")){
						layouts.splice(0, 0, {display_label : _cruxUtils.getI18n("crm.select"), id : "cruxLayoutSelect"});//no i18n
					}
					// for(var i=0; self.data.selectedIds &&  i<self.data.selectedIds.length; i++){
					// 	var id = self.data.selectedIds[i];
					// 	var layout = store.peekRecord(self.data.modelReq, id);
					// 	layout.cxPropSelected = true;
					// }
					var permissiomLayouts = [] , isAvail = false ,  len = layouts.length , userInfo = typeof Crm != "undefined" ? ((_cruxUtils && _cruxUtils.isLyteWidgetBuild) ? window.store.peekRecord("user",Crm.userDetails.USER_ID) : store.peekRecord("user",Crm.userDetails.USER_ID)) : {};//no i18n
					if(!userInfo && window.clientPortalName){
						 userInfo = {"profile":{"id":Crm.userDetails.PROFILE_ID}}
					}
					for( var i = 0 ; i < len ; i++ ){
						var profiles = layouts[i].profiles;
						if( self.data.modelReq === "wizard" && window.clientPortalName){
							profiles = layouts[i].portal_user_types;
						}
					    var currentUserProfile = userInfo.profile;
					    var moduleRecord = layouts[i].module;
					    //Getting profileObj from current module for Team Module case
					    if( moduleRecord && moduleRecord.access_type && moduleRecord.access_type === 'team_based') {
					        currentUserProfile = moduleRecord.private_profile;
					    }
						isAvail = self.checkProfilePermission( profiles , currentUserProfile );//no i18n
						if(self.data.modelReq == "territory" && layouts[i].parent_id == null){
							continue;
						}
					    if( isAvail && (self.data.cxPropDontShowDisabledLayouts === false || (self.data.cxPropDontShowDisabledLayouts === true && !(layouts[i].status === "inactive" || layouts[i].status === -1))) && (self.data.cxPropDisableIntegLayout === false || (self.data.cxPropDisableIntegLayout === true && !layouts[i].created_for))){
							permissiomLayouts.push(layouts[i]);//no i18n
							isAvail = false;
						}
					}    

					self.setData("layout", permissiomLayouts);//no i18n
					if(permissiomLayouts.length === 0 || (self.data.cxPropType !== "single" && permissiomLayouts.length === self.getData("value").length)){
						self.setData("layoutLength", false);//no i18n
					}
					self.setData("showLoading", false);//no i18n
					if(self.dropdown){
						self.dropdown.resetPosition();
					}
					if(self.data.cxPropType !== "single"){
						//eslint-disable-next-line no-unused-expressions
						self.dropdown ? self.dropdown.setData("ltPropSelected", self.getData("selectedIds")) : "";//No I18n	 				
					}
					else if(self.data.selectedIds.length > 0){
						//eslint-disable-next-line no-unused-expressions
						self.dropdown ? self.dropdown.ltProp("selected", self.data.selectedIds[0]) : "";//No I18n
					}
					if(self.$node.querySelector("lyte-search input") && self.$node.querySelector("lyte-search input").value){
						self.$node.querySelector("lyte-search").setValue(self.$node.querySelector("lyte-search input").value);//no i18n
					}
				},function(res){
					self.setData({"layout" : [] , "layoutLength" : false, "showLoading" : false});//no i18n
				});
				// if(store.peekAll(this.data.modelReq,{'module':this.data.cxPropModule}).length > 0){
				// 	layouts = store.peekAll(this.data.modelReq,{'module':this.data.cxPropModule});//No I18n
				// 	if(this.data.cxPropType == "single"){
				// 		layouts.splice(0, 0, {name : _cruxUtils.getI18n("crm.select"), id : "cruxLayoutSelect"});//No I18n
				// 	}
				// 	this.setData("layout", layouts);//No I18n
				// 	if(this.data.layout.length == 0){
				// 		this.setData("layoutLength", false);//No I18n
				// 	}
				// 	this.setData('showLoading',false);//No I18n
				// }else{
				// 	store.findAll(this.data.modelReq, {'module':this.data.cxPropModule},true).then(function(layouts){//No I18n
				// 		if(self.data.cxPropType == "single"){
				// 			layouts.splice(0, 0, {name : _cruxUtils.getI18n("crm.select")});//No I18n
				// 		}
				// 		self.setData("layout", layouts);//No I18n
				// 		if(self.data.layout.length == 0){
				// 			self.setData("layoutLength", false);//No I18n
				// 		}
				// 		self.setData('showLoading',false);//No I18n
				// 	});
				// }
			}else if(this.data.cxPropType != "single"){//no i18n
				this.setData('layoutLength',!(this.data.layout.length == this.data.value.length)); //no i18n
			}
		},
		closeDropdown : function(event, comp){
			this.closing = true;
			if(this.$node.querySelector("lyte-search") && this.$node.querySelector("lyte-search").ltProp("value") != ""){
				this.$node.querySelector("lyte-search").setValue("");//No i18n
				this.dropdown ? this.dropdown.close() : "";//No I18n
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		},
		beforeHide : function(ev){
			if(this.preventClose){
				this.preventClose = false;
				if(ev && ev.type == "scroll"){
					return false;
				}
			}
		},
	    onSearchBoxFocused : function(event,node){
	    	var dropdown = this.dropdown;//no i18n
	    	if(this.data.cxPropFrom == 'criteria' && dropdown && !dropdown.ltProp('isOpen')){
	    		dropdown.open();
	    	}
	    },
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		}
	},
	checkProfilePermission : function( profiles , userProfile ){
		if( !profiles ||  !userProfile){
			return true;
		}
		var i = 0 , len = profiles.length;
		for(; i < len ; i++){
			if( profiles[i].id == userProfile.id){
				return true;
			}
		}
		return false;
	},
	getValue : function(){
		var values = this.data.value;//No I18n
		var arr = [];
		for(var i=0; i<values.length; i++){
			arr.push({id : values[i].id , display_label : values[i].display_label})
		}
		if(this.data.cxPropType == "single"){
			return arr[0];
		}
		return arr;//No I18n
	},
	validate : function(){
		if(this.data.value.length == 0 && !this.data.cxPropIgnoreEmptyValue){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));//No I18n
			return false;
		}
		return true;
	},
	observeDisplayValue: function () {
		if (this.data.cxPropDisplayValue && this.data.cxPropDisplayValue !== this.data.displayValue) {
			this.setData("displayValue", this.data.cxPropDisplayValue);
		}
	}.observes('cxPropDisplayValue').on('init'),
	observeValue : function(){
		if(this.data.cxPropFrom !== "view" && this.data.cxPropValue && (this.data.cxPropValue.hasOwnProperty("layouts") || this.data.cxPropValue.hasOwnProperty("id") || this.data.cxPropValue.length)){
			var value = this.data.cxPropValue;
			if(value.layouts){
				if(value.layouts.hasOwnProperty('id')){
					value = [].concat(value.layouts);//No I18n
				}else{
					value = value.layouts;//No I18n
				}				
			}
			else{
				value = [value];
			}
			var selectedIds = [] , isDataAvailable = true ;
			for(var i=0; i<value.length; i++){
				value[i].selected = true;
				if(!value[i].display_label){
					isDataAvailable = false;
				}
				selectedIds.push(value[i].id);
			}
			if( !isDataAvailable ){
				var module_api_name = this.data.cxPropModule && moduleRecordMapping ?  moduleRecordMapping[this.data.cxPropModule].api_name : this.data.cxPropModule;//no i18n
				var _self = this;
				store.findAll(this.data.modelReq,{module : module_api_name},true,undefined,this.data.cxPropCustomData).then(function(res){//no i18n
					var len = value.length;
					for(var i=0; i<len; i++){
						var lll = store.peekRecord(_self.data.modelReq,value[i].id);
						if(lll){
							value[i].display_label = lll.display_label;
						}
						else{
							value.splice(i,1);
							selectedIds.splice(i, 1);
							i--;
							len--;
						}
					}
					var layoutLength = _self.data.layoutLength;//No I18n
					_self.setData({value : value, selectedIds : selectedIds});
					_self.setData("placeholder", _self.data.cxPropPlaceholder ? _self.data.cxPropPlaceholder : ( ( _self.data.cxPropFrom === "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "" ) );//No I18n
				}, function(){
					var len = value.length;
					for(var i=0; i<len; i++){
						if(!value[i].display_label){
							value.splice(i, 1);
							selectedIds.splice(i, 1);
							len--;
							i--;
						}
					}
					var layoutLength = _self.data.layoutLength;
					_self.setData({value : value, selectedIds : selectedIds});
					_self.setData("placeholder", _self.data.cxPropPlaceholder ? _self.data.cxPropPlaceholder : ( ( _self.data.cxPropFrom === "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "" ) );//No i18n
				})
			}else{
				var layoutLength = this.data.layoutLength;//No I18n
				this.setData({value : value, selectedIds : selectedIds});
				if(this.data.cxPropType == "single"){
					this.setData("displayValue", value[0].display_label)//No I18n
				}
				this.setData("placeholder", this.data.cxPropPlaceholder ? this.data.cxPropPlaceholder : ( ( this.data.cxPropFrom == "filter" ) ? _cruxUtils.getI18n("crm.label.filter.typehere") : "" ) );//No I18n
			}			
		}
	}.observes("cxPropValue").on("init"),//No I18n
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
			if(this.dropdown && this.dropdown.ltProp("isOpen") == true){
				if(this.$node.querySelector("lyte-search").querySelector("input").value){
					this.$node.querySelector("lyte-search").setValue("");//No I18n
				}
				return false;
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
		showInfoTooltip: function (origElem) {
			this.showHideInfoTooltip(origElem);
		},
	},
	didDestroy : function(){
		if(this.data.cxPropFrom != "view"){
			delete this.dropdown;
			window.removeEventListener("resize", this.resetPositionBind);			
		}
	},
	setDropdown : function(){
		if(this.data.cxPropFrom != "view"){
			this.dropdown = this.$node.querySelector("lyte-dropdown");
			this.resetPositionBind = this.resetPosition.bind(this);
			window.addEventListener("resize", this.resetPositionBind);			
		}
	}.observes("lyteViewPort").on("didConnect"),
	resetPosition : function(){
		setTimeout(function(){
			this.dropdown.resetPosition();
		}.bind(this), 200)
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * Triggered when element has rendered on viewport
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeTooltip : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropDisabled").on("init"),
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-layout-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") === "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeIsError : function(){
		if((this.getData("cxPropFrom") === "create" || this.data.cxPropFrom === "criteria")){
			var node = this.$node.querySelector("lyte-dropdown");
			if(node){
				if(this.getData("isError")){
					node.classList.add("cxErrorBox");//No I18n
				}
				else{
					node.classList.remove("cxErrorBox");//No I18n
				}				
			}
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin("lyte-dropdown");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	keyDownEvent : function(){
		if(this.data.cxPropAria && this.$node.querySelector('lyte-dropdown')){
		  this.bindEventForAria();
		}
	}.observes('cxPropAria').on('didConnect'),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-dropdown");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observePlaceholder : function(){
		if (this.data.cxPropPlaceholder && this.data.cxPropPlaceholder !== this.data.placeholder) {
			this.setData("placeholder", this.data.cxPropPlaceholder);
		}
	}.observes('cxPropPlaceholder').on('init'),
}, {mixins : ["crux-element-validation", "crux-aria-dropdown-mixin"]});//No I18n
