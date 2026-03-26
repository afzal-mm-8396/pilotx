/**
 * @component crux-text-area-component
 * @author anuja.manoharan
 */
Lyte.Component.register("crux-text-area-component", {
_template:"<template tag-name=\"crux-text-area-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <div class=\"cxW100Per\"> <pre id=\"{{cxPropId}}\" class=\"{{viewClass}}\" style=\"{{viewStyle}}\"><template is=\"for\" items=\"{{displayArray}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item.unescape}}\"><template case=\"true\">{{unescape(item.value)}}</template><template case=\"false\"><template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\">{{cruxMaskValue(item,cxPropMaskingProperties)}}</template><template case=\"false\">{{item}}</template></template></template></template></template><template is=\"if\" value=\"{{showMore}}\"><template case=\"true\">... <a href=\"#\" data-zcqa=\"cxTextAreaShowMoreText\" onclick=\"{{action('toggleShow',event,false)}}\" class=\"cxTextareaShowMore\">{{cxPropShowMore}}</a> \n\t\t\t\t\t\t\t</template><template case=\"false\"><template is=\"if\" value=\"{{showLess}}\"><template case=\"true\"> <span onclick=\"{{action('toggleShow',event,true)}}\" class=\"cxTextareaShowMore\" data-zcqa=\"cxTextAreaShowLessText\">{{cxPropShowLess}}</span></template></template></template></template></pre> <template is=\"if\" value=\"{{expHandlers(cxPropHeight,'||',cxPropLineClamp)}}\"><template case=\"true\"> <span onclick=\"{{action('toggleShow',event,false)}}\" class=\"cxTextareaShowMore cxHide\" id=\"cxTextAreaShowMoreText\" data-zcqa=\"cxTextAreaShowMoreText\">{{cxPropShowMore}}<lyte-icon class=\"cxBlueDropdown\"></lyte-icon></span> <span onclick=\"{{action('toggleShow',event,true)}}\" class=\"cxTextareaShowMore cxHide\" id=\"cxTextAreaShowLessText\" data-zcqa=\"cxTextAreaShowLessText\">{{cxPropShowLess}}<lyte-icon class=\"cxBlueDropdown up\"></lyte-icon></span> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropWidth}}\"><template case=\"true\"> <span onclick=\"{{action('toggleShow',event)}}\" class=\"cxTextAreaToggleShowBtn cxHide\" id=\"cxTextAreaToggleShowBtn\"></span> </template></template></template></template> </div> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\">{{cxPropEmptyValue}}</template></template></template></template> <template is=\"if\" value=\"{{cruxAnd(cxPropValue,cxPropWidth,expHandlers(cxPropLineClamp,'!'))}}\"><template case=\"true\"><lyte-popover id=\"{{cxPropId}}_popover\" lt-prop-origin-elem=\"#{{cxPropId}}\" lt-prop-duration=\"400\" lt-prop-wrapper-class=\"{{if(expHandlers(cxPropWidth,'&amp;&amp;',showMoreButton),'cxTextareaHovercardPopover')}} {{cxPropPopoverClass}}\" lt-prop-content-padding=\"15px 30px\" lt-prop-window-spacing=\"{&quot;top&quot;:&quot;30&quot;,&quot;left&quot;:&quot;30&quot;,&quot;bottom&quot;:&quot;30&quot;,&quot;right&quot;:&quot;30&quot;}\" lt-prop-show=\"{{lbind(showPopover)}}\" lt-prop-type=\"box\" lt-prop-freeze=\"false\" lt-prop-scrollable=\"true\" lt-prop-offset=\"{{popoverOffset}}\" on-before-show=\"{{method('setWidthOfPopover')}}\" lt-prop-width=\"{{popoverWidth}}\" on-show=\"{{method('popoverShow')}}\" lt-prop-placement=\"bottomRight topLeft\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content style=\"width:{{cxPropPopoverWidth}} ;max-height:{{cxPropPopoverHeight}};\"> <pre style=\"max-height: calc({{cxPropPopoverHeight}} - 30px);\"><template is=\"for\" items=\"{{displayArray}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item.unescape}}\"><template case=\"true\">{{unescape(item.value)}}</template><template case=\"false\">{{item}}</template></template></template></pre> </lyte-popover-content> </template> </lyte-popover></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"></template><template case=\"criteria\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"cxDIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"{{createClass}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-input lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}} cxTextarea\" lt-prop-type=\"textarea\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-focus=\"{{cxPropFocus}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-text-area-resize=\"{{cxPropTextAreaResize}}\" lt-prop-style=\"{{cxPropStyle}}\" lt-prop-vertical=\"true\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" on-resize=\"{{method('onInputResize')}}\" on-resize-start=\"{{method('onInputResizeStart')}}\" on-resize-end=\"{{method('onInputResizeEnd')}}\" onclick=\"{{action('onClickTextarea',event)}}\" onkeyup=\"{{action('onKeyup')}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-class=\"{{cxPropInputClass}}\" onfocus=\"{{action('focusCallback',event,true)}}\" style=\"max-height : {{cxPropResizeMaxHeight}}\" onfocusout=\"{{action('focusCallback',event,false)}}\"></lyte-input> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-text-area-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","dynamicValue":"viewStyle"}}},{"type":"attr","position":[1,1,0]},{"type":"for","position":[1,1,0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1,2]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3,2]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","cxPropPopoverWidth","' ;max-height:'","cxPropPopoverHeight","';'"]}}}},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-height: calc('","cxPropPopoverHeight","' - 30px);'"]}}}},{"type":"attr","position":[1,1,0]},{"type":"for","position":[1,1,0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-height : '","cxPropResizeMaxHeight"]}}}},{"type":"componentDynamic","position":[3,1,3]},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropValue","cxPropFrom","cxPropZcqa","cxPropField","cxPropEmptyValue","cxPropMaskingProperties","cxPropAutofocus","cxPropFocus","cxPropDisabled","cxPropTabIndex","cxPropStyle","cxPropEnableLbind","cxPropUpdateDelay","cxPropCallbackDelay","cxPropWrapperClass","cxPropInputClass","cxPropHeight","cxPropLayout","cxPropButtonYield","cxPropElementProps","cxPropPlaceholder","cxPropClass","cxPropMaxlength","cxPropReadonly","cxPropAppearance","cxPropId","cxPropName","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropErrorSpanClass","cxPropErrorIconClass","cxPropClearErrorMessage","cxPropPreventFocusOnError","cxPropErrorOnHovercard","cxPropFieldKey","cxPropDirection","cxPropLabelClass","cxPropInfoTooltip","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropTooltip","cxPropTooltipConfig","cxPropTooltipClass","cxPropAria","cxPropAriaAttributes","cxPropMandatory","cxPropMandatoryOption","cxPropMandatoryType","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","childCompProps","lyteViewPort","cxPropMaxcharacter","cxPropMaxHeight","cxPropLineClamp","cxPropShowMore","cxPropShowLess","cxPropPopoverHeight","cxPropPopoverWidth","cxPropPopoverClass","cxPropPrefixYield","cxPropHighlightUrl","displayValue","showMore","showLess","lyteUnbound","cxPropTabindex","cxPropTextAreaResize","cxPropTooltip","isError","cxPropExpandTextArea","cxPropPreventCollapse","displayArray","cxPropResizeMaxHeight","showMoreAfterPre","showLessAfterPre","tooltip","cxPropDataTabindex","cxPropWidth","showMoreButton","showPopover","popoverOffset","popoverWidth","cxPropShowMoreEnabled","cxPropShowLessEnabled","cxPropAriaErrorProperties","cxPropDivWrapperClass","cxPropSuffixYield","cxPropMinHeight","viewClass","viewStyle","createClass"],
_observedAttributesType :["string","string","string","object","string","object","boolean","boolean","boolean","string","string","boolean","number","number","string","string","string","string","boolean","object","string","string","number","boolean","string","string","string","string","boolean","string","string","string","string","string","boolean","boolean","boolean","string","string","string","string","boolean","boolean","string","string","string","string","boolean","object","boolean","object","string","string","boolean","string","object","boolean","number","string","number","string","string","string","string","string","boolean","boolean","string","boolean","boolean","boolean","string","object","string","boolean","boolean","boolean","array","string","boolean","boolean","string","string","string","boolean","boolean","object","string","boolean","boolean","object","string","boolean","string","string","string","string"],
//No I18n
	data : function(){
		return {
			/*generic properties start*/
			/**
			 * Sets value to crux component.
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * To determine what the element has to be displayed or where it is to be used.
			 * @componentProperty { view|create|criteria } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default view
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * The value to be set as ZCQA
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * It being a mandatory property, helps to provide the attributes such as data type, UI, type.
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/*generic properties end*/

			/*view specific properties start*/
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value.
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * The object that holds the masking properties of the field
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/*view specific properties end*/

			/*create specific properties start*/
			/**
			 * Sets autofocus value for input. Browser will focus input when entire page gets loaded.
			 * @componentProperty { boolean } cxPropAutofocus
			 * @author silambarasan.rt
			 * @version 1.0.0
			 */
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			cxPropFocus: Lyte.attr('boolean', { 'default': false }),//No I18n
			/**
			 * This property disables input. lyteInputDisabled class will be added to lyte-input.
			 * @componentProperty { boolean } cxPropDisabled
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It sets tab index for input.
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTabIndex : Lyte.attr("string"), //No I18n
			/**
			 * Style set to lyte-input
			 * @componentProperty { string } cxPropStyle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStyle : Lyte.attr("string"), //No I18n
			/**
			 * Set as false to prevent update of lt-prop-valye on key events. Value will be updated on onblur instead.
			 * @componentProperty { boolean } cxPropEnableLbind
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaulr 250
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),//no i18n
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback.
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			/**
			 * It will be added to the wrapper div element over the input
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * class set to the input
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string"),//No I18n
			/**
			 * Height set to the input
			 * @componentProperty { string } cxPropHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeight : Lyte.attr("string"),//No I18n
			/**
			 * Layout id to be passed to the input, properties like required are read from this layout information
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Set as true to render custom button next to input
			 * @componentProperty { boolean } cxPropButtonYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * The object is passed to the corresponding lyte input by replacing cx-prop with lt-prop
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			/**
			 * The text thats needs to be displayed as placeholder if value is not present.
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * Sets maximum length for the element.
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaxlength : Lyte.attr("number"),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the input.
			 * @componentProperty { flat|box } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default flat
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * Sets id to the element.
			 * @componentProperty { cxPropId } src
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default cruxTextArea
			 */
			cxPropId: Lyte.attr("string", {"default": "cruxTextArea"}), //NO i18n
			/**
			 * Name set to the input
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/*create specific properties end*/

			/*error message specific properties start*/
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Set as true to render custom error message as yield
			 * @componentProperty { boolean } cxPropErrorYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 * @yieldName errorYield
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * Prefix set to zcqa of error
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to zcqa of error
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default Error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * This class is set to the crux-error-message element.
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * class set to the span that contains the error
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Class set to icon next to error message
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set as false to prevent clearing of error message on change of input value
			 * @componentProperty { boolean } cxPropClearErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Set to true to prevent focus on error.
			 * @componentProperty { boolean } cxPropPreventFocusOnError
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Set as true to render error message on a hovercard
			 * @componentProperty { boolean } cxPropPreventFocusOnError
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * @default false
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/*error message specific properties end*/

			/*field label specific properties start*/
			/**
			 * The selector that determines which key holds the field label to be displayed next to the input
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * It defines how label and input field placed
			 * @componentProperty { vertical|horizontal } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default vertical
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}), //No I18n
			/**
			 * Class set to label
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Text is set to tooltip displayed next to field label as an icon
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to true to display info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/*field label specific properties end*/

			/*disabled specific properties start*/
			/**
			 * Set to true to render custom disable icon.
			 * @componentProperty { boolean } cxPropShowDisabledIcon
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class set to custom disable icon.
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/*disabled specific properties end*/

			/*tooltip specific properties start*/
			/**
			 * Value set as tooltip
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * The properties passed to the tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default {position : "followcursor", appearance : "box"}
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * Class set to tooltip
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/*tooltip specific properties end*/

			/*aria specific properties start*/
			/**
			 * To set custom attributes to input/textarea.
			 * @componentProperty { boolean } cxPropAria
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom attributes to input/textarea. 
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/*aria specific properties end*/

			/*mandatory specific properties start*/
			/**
			 * It overwrites layout specific required property.
			 * @componentProperty { boolean } cxPropMandatory
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * The object that contains the mandatory display details of the application.
			 * @componentProperty { object } cxPropMandatoryOption
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			/**
			 * This determines what type of mandatory styling should be applied to the input.
			 * @componentProperty { red_accent_line|asterisk|required } cxPropMandatoryType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			/*mandatory specific properties end*/

			/*warning specific properties start*/
			/**
			 * When warning is displayed, this is the message that is rendered.
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * When set to true, it displays a warning message similar to an error message.
			 * @componentProperty { boolean } cxPropShowWarning
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * Class set to warning message icon.
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/*warning specific properties end*/


			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * In view mode, if character length exceeds the count, show more is displayed
			 * @componentProperty { number } cxPropMaxcharacter
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default 0
			 */
			cxPropMaxcharacter : Lyte.attr("number", {default : 0}),//no i18n						
			/**
			 * If height exceeds this value, showMore will be displayed
			 * @componentProperty { string } cxPropMaxHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaxHeight : Lyte.attr("string"),//No I18n
			/**
			 * In view mode, value will be displayed based on number of lines.
			 * @componentProperty { number } cxPropLineClamp
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLineClamp : Lyte.attr("number"),
			/**
			 * The text to be displayed when ShowMore is true
			 * @componentProperty { string } cxPropShowMore
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default Show More
			 */
			cxPropShowMore : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.wf.summary.label.ShowInstantActions")}),//No I18n
			/**
			 * the text to be displayed when ShowLess is true
			 * @componentProperty { string } cxPropShowLess
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaulr Show Less
			 */
			cxPropShowLess : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.wf.summary.label.HideInstantActions")}),//No I18n
			/**
			 * Height of popover displayed on showMore
			 * @componentProperty { string } cxPropPopoverHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPopoverHeight : Lyte.attr("string"),
			/**
			 * Width of popover displayed on showMore
			 * @componentProperty { string } cxPropPopoverWidth
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPopoverWidth : Lyte.attr("string"),
			/**
			 * Class set to popover displayed on showMore
			 * @componentProperty { string } cxPropPopoverClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPopoverClass: Lyte.attr("string"),
			
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * If set to true, url present in the value will be displayed as a link
			 * @componentProperty { boolean } cxPropHighlightUrl
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default false
			 */
			cxPropHighlightUrl: Lyte.attr("boolean", {default : false}),//No I18n
			displayValue : Lyte.attr("string"),//no i18n
			showMore : Lyte.attr("boolean", {default : false}),//no i18n
			showLess : Lyte.attr("boolean", {default : false}),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * It defines the textarea resize directions
			 * @componentProperty { object } cxPropTextAreaResize
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default {horizontal : false, vertical : true}
			 */
			cxPropTextAreaResize : Lyte.attr("object", {default : {"horizontal": false, "vertical": true}}),//No I18n
			/**
			 * Value set as tooltip
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			isError : Lyte.attr("boolean", {default : false}),//NO i18n
			/**
			 * Set to false to prevent expand of text area
			 * @componentProperty { boolean } cxPropExpandTextArea
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @default true
			 */
			cxPropExpandTextArea : Lyte.attr("boolean", {default : false}),//NO I18n
			cxPropPreventCollapse : Lyte.attr("boolean", {default : false}),//no i18n
			displayArray : Lyte.attr("array"),//No I18n
			/**
			 * The max height to which input box should be allowed to be resized
			 * @componentProperty { string } cxPropResizeMaxHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropResizeMaxHeight : Lyte.attr("string", {default : ""}),//No I18n
			showMoreAfterPre : Lyte.attr("boolean", {default : false}),
			showLessAfterPre : Lyte.attr("boolean", {default : false}),
			tooltip:Lyte.attr("string"),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropWidth : Lyte.attr("string"),
			showMoreButton : Lyte.attr("boolean", {default : false}),
			showPopover : Lyte.attr("boolean",{default : false}),
			popoverOffset :Lyte.attr("object", {default : {}}),			
			popoverWidth : Lyte.attr("string", {default : "400px"}),
			cxPropShowMoreEnabled : Lyte.attr("boolean", {default : false}),
			cxPropShowLessEnabled : Lyte.attr("boolean", {default : false}),
			/**
  			 * property to set error icon and error color
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropMinHeight: Lyte.attr("string"),
			viewClass : Lyte.attr("string"),
			viewStyle : Lyte.attr("string"),
			createClass : Lyte.attr("string")
		}
	},
	/**
	 * Returns value of the textarea
		 * @utility getValue
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */

	getValue : function(){
		if( this.$node.querySelector("#cruxLoadingElem") ){
			return this.data.cxPropValue;
		}
		return this.$node.querySelector("textarea").value;//No I18n
	},/**
		  * Validates the textarea based on mandatory and length. Error message will be displayed accordingly.
		 * @utility validate
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */
	validate : function(){
		var field = this.getData("cxPropField");//No I18n
		if(!this.getData("cxPropValue") || !this.data.cxPropValue.trim()){
			if(!this.validateMandatory(true)){
				if(!this.data.cxPropPreventFocusOnError){
					this.$node.querySelector("lyte-input").focus();//No I18n
				}
				return false;
			}
		}
		if(!this.validateMaskField()){
			this.setData("cxPropErrorMessage", "");
			return true;
		}
		if(this.getData("cxPropValue") && !this.validateLength(this.getData("cxPropValue"))){
			return false;
		}
		this.setData("cxPropErrorMessage", "");//No I18n
		return true;
	},
	/**
	 * Resets value of the textarea
		 * @utility resetData
		 * @version 1.0.0
		 * @author anuja.manoharan
		 */

	resetData:function(){
		this.$node.querySelector('lyte-input').ltProp('value','')
	},
	methods : {
		onChange : function(){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			// this.setData("isError", false);//No I18n
			/**
							 * This method is invoked whenever value changes in the input
							 * @method onValueChange
							 * @author anuja.manoharan
							 * @param { string } new value
							*/
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
			}
		},
	    hideInfoTooltip: function() {
				this.showHideInfoTooltip();
	    },
		onInputResizeStart: function(){
			if (this.getMethods("onResizeStart")) {
				this.executeMethod("onResizeStart");
			}
		},
	    onInputResizeEnd: function(){
			if (this.getMethods("onResizeEnd")) {
				this.executeMethod("onResizeEnd");
			}
	    	// var textarea = this.$node.querySelector("textarea");//No I18n
	    	// textarea.removeEventListener("keyup", this.expandEv);
			// textarea.removeEventListener("focus", this.expandEv);
			this.resized = true;
	    },
		onInputResize:function(...event){
			if(!this._onResizeMethod){
				this._onResizeMethod = this.getMethods('onResize');
			}
			if(this._onResizeMethod){
				this.executeMethod('onResize',...event);//NO I18n
			}
		},
		setWidthOfPopover : function(){
			if(this.data.cxPropWidth){
				var width = this.$node.offsetWidth;
				if(width >= 400){
					this.setData("popoverWidth", `${width}px`);
				}else{
					this.setData("popoverWidth", "402px");
				}
			}
	    },
	    popoverShow : function(pop){
	    	$L(pop.childComp.querySelector('.cxTextareaHovercardPopover pre')).scroll( { appendTo : 'container' } )

	    }
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-text-area-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") === "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	toggleClass : function(more){
		if(more){
			var elem = this.$node.querySelector("pre");
            if(elem){
                elem.classList.add("cxLineClamp");
				// elem.classList.remove("cxLineNoClamp");
            }
			this.$node.querySelector(".cxTextareaViewMode").style.overflow = "hidden";
        }else{  
			var elem = this.$node.querySelector(".cxLineClamp");
            if(elem){
                elem.classList.remove("cxLineClamp");
                // elem.classList.add("cxLineNoClamp");
            }
			this.$node.querySelector(".cxTextareaViewMode").style.overflow = "";
        }
    },
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
		
		toggleShow : function(event, showMore){
			if(this.data.showMoreButton){
				var pos = this.$node.getBoundingClientRect();
				this.setData("popoverOffset", {top : pos.top, left : pos.left, width : pos.width});
				this.setData("showPopover", true);
			}
			else if(this.data.showMoreAfterPre){
				this.toggleClass(false);
				this.$node.querySelector("pre").style["max-height"] = '';
				// this.$node.querySelector(".cxLineClamp") ? this.$node.querySelector(".cxLineClamp").classList.remove("cxLineClamp").add("cxLineNoClamp") : this.$node.querySelector(".cxTextareaViewMode").style.overflow = "";
				this.setData("showMoreAfterPre", false);
				this.enableShowMore('showMoreAfterPre',false);
				this.setData("showLessAfterPre", true);
				this.enableShowMore('showLessAfterPre',true);
				this.setData("cxPropShowMoreEnabled", false);
				this.setData("cxPropShowLessEnabled", true);
				if(this.getMethods("onShowMore")){
					this.executeMethod("onShowMore", this);//No I18n
				}
			}
			else if(this.data.showLessAfterPre){
				this.toggleClass(true);
				if(this.data.cxPropHeight && this.$node){
					this.$node.querySelector("pre").style["max-height"] = this.data.cxPropHeight;
				}
				// this.$node.querySelector("pre") ? this.$node.querySelector("pre").classList.add("cxLineClamp") : this.$node.querySelector(".cxTextareaViewMode").style.overflow = "hidden";
				this.setData("showMoreAfterPre", true);	
				this.enableShowMore('showMoreAfterPre',true);
				this.setData("showLessAfterPre", false);
				this.enableShowMore('showLessAfterPre',false);
				this.setData("cxPropShowMoreEnabled", true);
				this.setData("cxPropShowLessEnabled", false);
				if(this.getMethods("onShowLess")){
					this.executeMethod("onShowLess", this);//No I18n
				}
			}
			else{
				this.setData({displayArray : showMore ? this.splitText(this.data.cxPropValue.substring(0, this.data.cxPropMaxcharacter), this.data.cxPropValue) : this.splitText(this.data.cxPropValue), showMore : showMore, showLess : !showMore})
				// this.setData({displayValue : showMore ? this.highlighUrlInText(this.getData("cxPropValue").substring(0, this.getData("cxPropMaxcharacter"))) : this.highlighUrlInText(this.getData("cxPropValue")), showMore : showMore, showLess : !showMore});//no i18n
				if(showMore){
					if(this.getMethods("onShowMore")){
						this.executeMethod("onShowMore", this);//No I18n
					}
					else{
						this.$node.querySelector("a").scrollIntoView()//no i18n					
					}
					this.setData("cxPropShowMoreEnabled", false);
					this.setData("cxPropShowLessEnabled", true);
				}
				else{
					this.setData("cxPropShowMoreEnabled", true);
					this.setData("cxPropShowLessEnabled", false);

				}				
			}
			event.preventDefault();
			event.stopPropagation();
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    onClickTextarea : function(event){
		if (this.data.cxPropExpandTextArea) {
			this.enableExpandTextHeight = true;
			this.expandTextarea(event);
			delete this.enableExpandTextHeight;
		} else {
			this.increaseHeight();
		}
    },
    onKeyup : function(){
    	if(((event && event.key !== "Tab") || !event) && !this.data.cxPropExpandTextArea){
			this.increaseHeight();
		}
    },
	focusCallback : function(ev, _in){
		if(_in && this.getMethods("onFocus")){
			/**
		 * Called when input is focused	
							 * @method onFocus
							 * @author anuja.manoharan
							 * @param { string } new value
							*/
			this.executeMethod("onFocus", ev, this.$node);//No I18n
		}
		else if(_in == false && this.getMethods("onFocusOut")){
			this.executeMethod("onFocusOut", ev, this.$node);
		}
	}
	},
	expandTextarea: function (ev, initial) {
		const textarea = this.$node.querySelector("textarea");
		if (!textarea) { return; }

		if (this.resized && this.getValue()) {
			return;
		}
		this.resized = false;

		// Reset height to calculate accurate scrollHeight
		textarea.style.height = 'auto';
		textarea.style.maxHeight = 'auto';
		textarea.style.minHeight = 'auto';

		// Batch all reads
		const computedStyle = getComputedStyle(textarea);
		const paddingTop = parseInt(computedStyle.paddingTop), paddingBottom = parseInt(computedStyle.paddingBottom); //eslint-disable-line @zoho/webperf/layout-thrashing
		const borderTop = parseInt(computedStyle.borderTopWidth), borderBottom = parseInt(computedStyle.borderBottomWidth); //eslint-disable-line @zoho/webperf/layout-thrashing
		const scrollHeight = textarea.scrollHeight; //eslint-disable-line @zoho/webperf/layout-thrashing

		const contentHeight = scrollHeight + paddingTop + paddingBottom + borderTop + borderBottom;

		const maxHeight = this.getData("cxPropMaxHeight"), minHeight = this.getData("cxPropMinHeight");

		const parsedMaxHeight = maxHeight ? parseInt(maxHeight) : null;
		const parsedMinHeight = minHeight ? parseInt(minHeight) : 0;

		// Clamp height between min and max
		let finalHeight = contentHeight;
		if (parsedMaxHeight) {
			finalHeight = Math.min(finalHeight, parsedMaxHeight);
		}
		finalHeight = Math.max(finalHeight, parsedMinHeight);

		// Apply heights (batch writes)
		textarea.style.minHeight = parsedMinHeight ? parsedMinHeight + "px" : "0px";
		textarea.style.maxHeight = parsedMaxHeight ? parsedMaxHeight + "px" : "none";
		textarea.style.height = finalHeight + "px";

		if (ev && ev.type === "focusout") {
			this.$node.classList.remove("cxBigTextarea"); // No I18n
		} else {
			this.$node.classList.add("cxBigTextarea"); // No I18n
		}
	},
	observeValue : function(){
		if(this.getData("cxPropFrom") == "view"){
			this.setData("showLess", false);//No I18n
			if(this.getData("cxPropValue")){
				var value = this.getData("cxPropValue");//no i18n
				var max = this.getData("cxPropMaxcharacter");//no i18n
				if(max != 0 && value.length > max){
					// this.setData("displayValue", this.highlighUrlInText(this.getData("cxPropValue").substring(0, max)));//No I18n
					this.setData("displayArray", this.splitText(this.data.cxPropValue.substring(0, max), this.data.cxPropValue));//no i18n
					this.setData("showMore", true);//No I18n
					this.setData("cxPropShowMoreEnabled", true);
					this.setData("cxPropShowLessEnabled", false);
				}
				else{
					// this.setData("displayValue", this.highlighUrlInText(this.getData("cxPropValue")));//No I18n
					this.setData("displayArray", this.splitText(this.data.cxPropValue));//no i18n
					this.setData("showMore", false);//No I18n
					this.setData("cxPropShowMoreEnabled", false);
					this.setData("cxPropShowLessEnabled", false);
				}
				// if(this.$node.querySelector("pre") && this.data.cxPropWidth){
				// 	this.handleTextareaHovercard()				
				// }
			}
			else{
				// if(this.data.cxPropEmptyValue){
				// 	this.setData("displayValue", this.data.cxPropEmptyValue);//No I18n
				// }
				// else{
				// 	this.setData("displayValue", this.data.cxPropValue);//No I18n					
				// }
				this.setData("showMore", false);//No I18n
				this.setData("cxPropShowMoreEnabled", false);
					this.setData("cxPropShowLessEnabled", false);
			}
			this.checkLineClampProps();
		}
		//  Height of disabled text area is not the same as editable text area issue fix
		// else if(this.data.cxPropFrom == "create" && this.data.cxPropDisabled){
		// 	this.resized = true;
		// } 
	}.observes("cxPropValue", "cxPropFrom").on("init"),//No i18n
	observeIsError : function(){

		if (this.data.cxPropPrefixYield) {
			if (this.$node.querySelector(".cxBoxWithRightIcon")) {
				if (this.data.isError) {
					this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxErrorBoxWithRightIcon");
				} else {
					this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxErrorBoxWithRightIcon");
				}
			}
		} else {
			if((this.getData("cxPropFrom") == "create" || this.getData("cxPropFrom") == "criteria") && this.$node.querySelector("lyte-input")){
				if(this.getData("isError")){
					this.$node.querySelector("lyte-input").classList.add("cxErrorBox");//No I18n
				}
				else{
					this.$node.querySelector("lyte-input").classList.remove("cxErrorBox");//No I18n
				}
			}
		}


	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : "lyte-input");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	enableShowMore: function (property, show) {
		let selector = '';
		if (property === 'showMoreAfterPre') {
			selector = '#cxTextAreaShowMoreText';
		} else if (property === 'showLessAfterPre') {
			selector = '#cxTextAreaShowLessText';
		} else {
			selector = '#cxTextAreaToggleShowBtn';
		}

		const node = this.$node.querySelector(selector);
		if (!node) {
			return;
		}
		if (show) {
			node.classList.remove('cxHide');
		} else {
			node.classList.add('cxHide');
		}
	},
	init : function(){
		this.resized = false;
		this.$node.reset = function(){
			this.resized = false;
			if(this.data.cxPropValue){
				delete this.transEnd;
				this.increaseHeight();
			}
			else{
				// var height = 34;
				this.$node.querySelector("textarea").style.height = "";//No I18n
				if(!this.transEnd1)
		    	{
		    		this.transEnd1 = function (){//No I18n
						this.$node.querySelector("lyte-input").style.height = "";	//No I18n	
						this.$node.querySelector("textarea").removeEventListener("transitionend", this.transEnd1);//No I18n
					}.bind(this)
		    	}
				this.$node.querySelector("textarea").addEventListener("transitionend", this.transEnd1);
			}
		}.bind(this)
		this.$node.pageResized = function(){
			this.setData('cxPropPopoverHeight',(Math.floor(window.innerHeight/2) - 30)+'px');
		};
		this.setFocusUtil();
		if(!this.getData('cxPropPopoverWidth')){
			this.setData('cxPropPopoverWidth',this.getData('cxPropWidth'))
		}
		if(!this.getData('cxPropPopoverHeight')){
			this.setData('cxPropPopoverHeight',(Math.floor(window.innerHeight/2) - 30)+'px');
		}

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
		if (this.data.cxPropExpandTextArea){
			this.setData("cxPropUpdateDelay", 0);
		}
	},
	didConnect: function () {
		if (this.data.cxPropExpandTextArea){
			this.enableExpandTextHeight = true;
			this.expandTextarea();
			delete this.enableExpandTextHeight;
		}
	},
	// observeFrom : function(){
	// 	if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-input") && this.data.cxPropExpandTextArea){
	// 		var textarea = this.$node.querySelector("textarea");//No I18n
	// 		this.expandEv = this.expandTextarea.bind(this);
	// 		this.resized = false;
	// 		// textarea.addEventListener("keyup", this.expandEv);
	// 		textarea.addEventListener("focus", this.expandEv);
	// 		textarea.addEventListener("focusout", function(){
	// 			var res = true;
	// 			if(this.getMethods("onFocusOut")){
	// 				res = this.executeMethod("onFocusOut", this);//No I18n
	// 			}
	// 			if(res != false && !this.data.cxPropPreventCollapse){
	// 				this.expandTextarea({type : "focusout"});					//No I18n
	// 			}
	// 		}.bind(this));
	// 		if(this.getData("cxPropValue")){
	// 			this.expandTextarea(undefined, true);
	// 		}
	// 	}
	// }.observes("cxPropFrom", "lyteViewPort").on("didConnect")//No I18n
	increaseHeight : function(utilCall){
		if(!this.resized || utilCall){
			var height = 71;
			if(this.data.cxPropHeight){
				height = this.data.cxPropHeight.split("px")[0]; //No I18n
				height = parseInt(height);
			}
			const textarea = this.$node.querySelector("textarea");
			if (textarea){
				textarea.style.height = height + "px"; //No I18n
			}
			if (this.getMethods("onResizeTransStart")) {
				this.executeMethod("onResizeTransStart");
			}
			if (!this.transEnd) {
				this.transEnd = function () { //No I18n
					this.$node.querySelector("lyte-input").style.height = (height + 2) + "px";	//No I18n	
					if (textarea){
						textarea.removeEventListener("transitionend", this.transEnd); //No I18n
					}
					this.resized = true;
					if (this.getMethods("onResizeTransEnd")) {
						this.executeMethod("onResizeTransEnd");
					}
				}.bind(this);
				if (textarea){
					textarea.addEventListener("transitionend", this.transEnd);
				}
			}
		}
	},
	checkLineClampProps : function(){
		if(this.data.cxPropFrom == "create" || this.data.cxPropFrom == "criteria" ){
			if(this.data.cxPropValue){
				this.increaseHeight()				
			}
			this.setFocusUtil();
		}
		else if(this.data.cxPropFrom == "view"){
			if((this.data.cxPropLineClamp || this.data.cxPropHeight) && this.data.cxPropValue){
				this.setData('cxPropValue' , this.data.cxPropValue.trim()); // while giving the empty space in before/after the input value, It does not consider while save. But, ScrollHeight calculating before enable the showMore.
				var pre = this.$node.querySelector("pre");
				var scrollHeight,offsetHeight;
				if(pre){
					$L.fastdom.measure(()=>{
						scrollHeight = pre.scrollHeight;
						offsetHeight = pre.offsetHeight;
						const forcedHeight = this.data.cxPropHeight ? parseInt(this.data.cxPropHeight, 10) : offsetHeight;
						$L.fastdom.mutate(()=>{
							if(scrollHeight > forcedHeight){
								this.toggleClass(true);
								this.enableShowMore('showMoreAfterPre',true);
								this.enableShowMore('showLessAfterPre',false);
								this.setData({"showMoreAfterPre" : true , "cxPropShowMoreEnabled" : true , "showLessAfterPre" : false , "cxPropShowLessEnabled" : false });
							}
							else {
								var maxLineClamp = this.data.cxLineClamp ? this.data.cxLineClamp : 7;
								if( scrollHeight === forcedHeight && scrollHeight > 18 * maxLineClamp){
									this.setData("showLessAfterPre" , true );
									this.enableShowMore("showLessAfterPre" , true );
								}else{
									this.setData("showLessAfterPre" , false );
									this.enableShowMore("showLessAfterPre" , false );
								}
								this.toggleClass(false);
								this.enableShowMore("showMoreAfterPre" , false );
								this.setData({  "cxPropShowLessEnabled" : false , "showMoreAfterPre" : false , "cxPropShowMoreEnabled" : false });
							}
						});
					});
				}
			}
			else if(this.$node.querySelector("pre") && this.data.cxPropWidth){
				this.handleTextareaHovercard()
			}
			else{
				this.setData("showMoreAfterPre", false);
				this.enableShowMore("showMoreAfterPre" , false );

				this.setData("cxPropShowMoreEnabled", false);
					this.setData("cxPropShowLessEnabled", false);
			}
		}
		if(this.data.cxPropMaxHeight && this.$node){
			this.$node.querySelector("textarea").style["max-height"] = this.data.cxPropMaxHeight;
		}
	},
	observeFrom : function(){
		this.checkLineClampProps();
	}.observes("cxPropFrom", "lyteViewPort", "cxPropLineClamp").on("didConnect"),//No I18n
	highlighUrlInText : function(content){
		if(!this.data.cxPropHighlightUrl){
			return content;
		}
		if(content){
			var urlRegex = /((https?|ftp)(:|&#x3a;)(\/\/|&#x2f;&#x2f;))((www\.){0,1}[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s]*)*)|www\.([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s]*)*)/g;
			return content.replace(urlRegex, function(url) {
				var preceding = "";
				if(url.indexOf("http") === -1 && url.indexOf("ftp") === -1){
						preceding = "//"
				}
				return '<a class="link" rel="noopener noreferrer" href="' + preceding + $ESAPI.encoder().encodeForHTMLAttribute(url) + '" target="_blank">' + $ESAPI.encoder().encodeForHTML(url) + '</a>';					
			});
		}
		return "";
	},
	observeClass : function(op){
		if(this.data.cxPropFrom == "create"){
			var ele = $L("lyte-input", this.$node);//No I18n
			if(!ele.length){
				return;
			}
			if(op && op.oldValue){
				ele.removeClass(op.oldValue);
			}
			if(this.data.cxPropClass){
				ele.addClass(this.data.cxPropClass);
			}
		}
	}.observes("cxPropClass", "lyteViewPort").on("didConnect"),//No I18n
	getATag : function(url, actualURL){
		var preceding = "";
		if(url.indexOf("http") === -1 && url.indexOf("ftp") === -1){
				preceding = "//"
		}
		return '<a class="link" rel="noopener noreferrer" href="' + preceding + $ESAPI.encoder().encodeForHTMLAttribute(actualURL) + '" target="_blank">' + $ESAPI.encoder().encodeForHTML(url) + '</a>';
	},
	splitText : function(text, value){
		if (text && /\r/.test(text)) {
			text = text.replace(/\r/g, "\n");
		}
		if (value && /\r/.test(value)) {
			value = value.replace(/\r/g, "\n");
		}
		if(!this.data.cxPropHighlightUrl || !text){
			return [text];
		}
		var urlRegex = /((https?|ftp)(:|&#x3a;)(\/\/|&#x2f;&#x2f;))((www\.){0,1}[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s\]\)\}>\"""'']*)*)|www\.([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s\]\)\}>\"""'']*)*)/g;
		var matchArr = text.match(urlRegex);
		value = value ? value : text;
		var fullURLMatchArr = value.match(urlRegex);
		if(!matchArr){
			return [text];
		}
		var newText = text.replace(urlRegex, "crux-text-area-component-url");
		newText = newText.split("crux-text-area-component-url");
		for(var i=1, j=0; i<newText.length; i+=2, j++){
			newText.splice(i, 0, {unescape : true, value : this.getATag(matchArr[j], fullURLMatchArr[j])});
		}
		return newText;
	},
	observeDisabled : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip", "cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin("lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	handleTextareaHovercard:function(){
		var node = this.$node
		var pre = node.querySelector("pre");
		node.classList.add("cxTextareaHoverCard");

		if(this.textareaResizeObserver){
			this.textareaResizeObserver.disconnect()
		}

		var nodeResizeObserver = new ResizeObserver(function() {
			var offsetWidth = node.getData("showMoreButton") ? pre.offsetWidth + 25 : pre.offsetWidth
			if(pre.scrollWidth > offsetWidth){
				node.setData("showMoreButton", true);
				node.component.enableShowMore('showMoreButton',true);
				node.classList.add("cxTextareaShowHoverCard");
			}
			else{
				node.setData("showMoreButton", false);
				node.component.enableShowMore('showMoreButton',false);
				node.classList.remove("cxTextareaShowHoverCard");
			}
		})
		node.textareaResizeObserver = nodeResizeObserver
		nodeResizeObserver.observe(pre)
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
			/**
							 * This method is invoked after element is rendered in viewport
							 * @method onElementRendered
							 * @author anuja.manoharan
							 * @param { string } new value
							*/
				if(this.getMethods('onElementRendered')){
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	didDestroy : function(){
		if(this.textareaResizeObserver){
			this.textareaResizeObserver.disconnect()
		}
	},
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeExpandTextArea: function(){
		if(this.data.cxPropExpandTextArea && !this.enableExpandTextHeight){
			this.expandTextarea();
		}
	}.observes("cxPropValue", "cxPropFrom").on("didConnect"), //No I18n
	setViewClass : function(){
		if(this.data.cxPropFrom === "view"){
			var viewStyle = " ";
			if(this.data.cxPropLineClamp){
				viewStyle = viewStyle+"-webkit-line-clamp : "+this.data.cxPropLineClamp+"; ";
			}
			if(this.data.cxPropWidth){
				viewStyle = viewStyle+"width : "+this.data.cxPropWidth+"; ";
				if(!this.data.cxPropLineClamp){
					viewStyle = viewStyle+"white-space : nowrap; overflow : hidden; ";
				}
			}
			if(this.data.cxPropHeight){
				viewStyle = viewStyle+"max-height : "+this.data.cxPropHeight+"; overflow : hidden; ";
			}			
			this.setData({viewClass : "cxTextareaViewMode "+(this.data.cxPropLineClamp ? "cxLineClamp" : ""), viewStyle : viewStyle});
		}
		else if(this.data.cxPropFrom === "create"){
			this.setData({createClass : "cxElementValue "+(this.data.cxPropReadonly ? "cxElementReadOnly " : "")+(this.data.cxPropDisabled ? "cxElementDisabled " : "")});
		}
	}.observes("cxPropFrom", "cxPropLineClamp", "cxPropWidth", "cxPropHeight", "cxPropReadonly", "cxPropDisabled").on("init")
}, {mixins : ["crux-element-validation"]});//No I18n
/**
 * @syntax nonYielded
 * <crux-text-area-component  cx-prop-from="create" cx-prop-field='{"id":"1234567890","field_label":"Address 1"}' cx-prop-field-key='field_label'></crux-text-area-component>
 */
