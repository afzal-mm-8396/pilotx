/**
 * @component crux-number-component
 * @author gowtham.mp
 * @version 1.0.0
 * Used to render number fields in view and create pages
 */
Lyte.Component.register("crux-number-component", {
_template:"<template tag-name=\"crux-number-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <template is=\"if\" value=\"{{cxPropShowCalculator}}\"><template case=\"true\"> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} pR \" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxBoxWithRightIcon cxYieldObserverElemComp {{cxPropDivWrapperClass}} {{if(expHandlers(expHandlers(cxPropDisabled,'||',cxPropShowDisabledIcon),'||',cxPropHideRightIcon),'cxNumcompWithoutRightIcon','')}}\"> <div class=\"cxBoxLeftContent\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div> </template></template> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-type=\"text\" onpaste=\"{{action('onPaste',event)}}\" @class=\"{{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}} {{if(currencySymbol,if(cxPropSymbolPrefix,'cxSymbolPrefix','cxSymbolSuffix'))}}\" lt-prop-class=\"cxBoxNumberCompInput {{cxPropInputClass}}\" lt-prop-value=\"{{formattedValue}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-maxlength=\"{{maxlength}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" onkeydown=\"{{action('checkLength',this,event)}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-focus-at-end=\"{{cxPropFocusAtEnd}}\" lt-prop-focus=\"{{cxPropFocus}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-label=\"{{if(cxPropSymbolPrefix,currencyLabel,'')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" onkeypress=\"{{action('checkLengthOnUp',event)}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" onkeyup=\"{{action('onKeyUpInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" on-blur=\"{{method('blurCallback')}}\"> </lyte-input> <template is=\"if\" value=\"{{expHandlers(cxPropSymbolPrefix,'!')}}\"><template case=\"true\"><span class=\"lyteNumberUnitElem\">{{currencyLabel}}</span></template></template> <template is=\"if\" value=\"{{cxPropButtonTextInsideElement}}\"><template case=\"true\"><lyte-button onclick=\"{{action('buttonClick')}}\"><template is=\"yield\" yield-name=\"text\">{{cxPropButtonTextInsideElement}}</template></lyte-button></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropDisabled,'!'),'&amp;&amp;',expHandlers(cxPropHideRightIcon,'!'))}}\"><template case=\"true\"> <div class=\"cxBoxRightIcon cxFlexCenter {{cxPropRightIconClass}}\" onclick=\"{{action('showCalculatorInfo',event)}}\"> <div class=\"cxCalculatorIcon cxIconPopupQuery_{{cxPropId}} cP {{if(onFocus,'cxPropFocus','')}} {{cxPropIconClass}}\"></div> </div> </template></template></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonTextInsideElement}}\"><template case=\"true\"><lyte-button onclick=\"{{action('buttonClick')}}\"><template is=\"yield\" yield-name=\"text\">{{cxPropButtonTextInsideElement}}</template></lyte-button></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(displayFormat,'==','slider'),'&amp;&amp;',cxPropIsDisplayFormatEnabled)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(dataType,'!=','currency')}}\"><template case=\"true\"> <lyte-slider lt-prop-digits=\"{{cxPropDigits}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-disabled=\"{{if(ifEquals(cxPropDisabled,true),cxPropDisabled,cxPropReadonly)}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-yield=\"true\" lt-prop-handler=\"{{cxPropHandler}}\" on-select=\"{{method('onsliderselect')}}\" cx-prop-error-message=\"This is an error message\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-width=\"{{cxPropSliderWidth}}\" lt-prop-min=\"{{cxPropSliderMinValue}}\" lt-prop-max=\"{{cxPropSliderMaxValue}}\" lt-prop-scale-unit=\"{{currencySymbol}}\" lt-prop-scale-interval=\"{{splitValue}}\" class=\"{{concat(cxPropSliderClass,' cxNumberCompSlider',if(ifEquals(cxPropReadonly,true),' cxNumberCompSliderReadOnly',''))}}\" lt-prop-height=\"{{cxPropSliderHeight}}\" on-change=\"{{method('onSliderChanges')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_','sliderField')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropSliderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSliderYield \" slider-values=\"{{nonCurrencySliderValues}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption\"> <template is=\"for\" items=\"{{ltPropScaleStyle}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\" onclick=\"{{action('seperatorClick',nonCurrencySliderValues[indexVal])}}\" lt-prop-title=\"{{if(expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(indexVal,'!=',0)),'&amp;&amp;',expHandlers(indexVal,'!=',expHandlers(nonCurrencySliderValues.length,'-',1))),nonCurrencySliderValues[indexVal],'')}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',indexVal)}}\"> <span></span> <span class=\"lyteScalLable cxNumScaleLable {{if(ifEquals(nonCurrencySliderValues[indexVal].length,1),'cxNumScaleSingDigLabel','')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'!'),'||',expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(expHandlers(indexVal,'==',0),'||',expHandlers(indexVal,'==',expHandlers(nonCurrencySliderValues.length,'-',1)))))}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{nonCurrencySliderValues[indexVal]}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" style=\"max-width:{{maxWidthToSet}}\"></lyte-text> </template></template> </span> </span> </template> </div> </template></template> </template> </lyte-slider> </template><template case=\"false\"> <lyte-slider lt-prop-digits=\"{{cxPropDigits}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-disabled=\"{{if(ifEquals(cxPropDisabled,true),cxPropDisabled,cxPropReadonly)}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-yield=\"true\" lt-prop-handler=\"{{cxPropHandler}}\" on-select=\"{{method('onsliderselect')}}\" cx-prop-error-message=\"This is an error message\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-width=\"{{cxPropSliderWidth}}\" lt-prop-min=\"{{cxPropSliderMinValue}}\" lt-prop-max=\"{{cxPropSliderMaxValue}}\" lt-prop-scale-unit=\"{{currencySymbol}}\" lt-prop-scale-interval=\"{{splitValue}}\" class=\"{{concat(cxPropSliderClass,' cxNumberCompSlider',if(ifEquals(cxPropReadonly,true),' cxNumberCompSliderReadOnly',''))}}\" lt-prop-height=\"{{cxPropSliderHeight}}\" on-change=\"{{method('onSliderChanges')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_','sliderField')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropSliderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSliderYield \" slider-values=\"{{sliderValues}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption\"> <template is=\"for\" items=\"{{ltPropScaleStyle}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\" onclick=\"{{action('seperatorClick',sliderValues[indexVal])}}\" lt-prop-title=\"{{if(expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(indexVal,'!=',0)),'&amp;&amp;',expHandlers(indexVal,'!=',expHandlers(sliderValues.length,'-',1))),sliderCurrencyShowTooltip(showCurConversion,sliderValues[indexVal]),'')}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',indexVal)}}\"> <span></span> <span class=\"lyteScalLable cxNumScaleLable {{if(ifEquals(sliderValues[indexVal].length,1),'cxNumScaleSingDigLabel','')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'!'),'||',expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(expHandlers(indexVal,'==',0),'||',expHandlers(indexVal,'==',expHandlers(sliderValues.length,'-',1)))))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{showCurConversion}}\"><template case=\"true\"> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{sliderCurrencyShowTooltip(undefined,undefined,sliderValues[indexVal].currency1,sliderValues[indexVal].currency2)}}\" class=\"cxNumScaleLableFirstValue\" style=\"max-width:{{maxWidthToSet}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\"> <template is=\"registerYield\" yield-name=\"lyte-text\">{{sliderValues[indexVal].currency1}}</template> </lyte-text> <span class=\"cxNumScaleLableSecondValue\" style=\"max-width:{{maxWidthToSet}}\"> (<lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{sliderCurrencyShowTooltip(undefined,undefined,sliderValues[indexVal].currency1,sliderValues[indexVal].currency2)}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\"> <template is=\"registerYield\" yield-name=\"lyte-text\">{{sliderValues[indexVal].currency2}}</template> </lyte-text>) </span> </template><template case=\"false\"> <lyte-text style=\"max-width:{{maxWidthToSet}}\" lt-prop-value=\"{{sliderValues[indexVal]}}\" class=\"cxNumScaleLableFirstValue\"></lyte-text> </template></template> </template></template> </span> </span> </template> </div> </template></template> </template> </lyte-slider> </template></template> </template></template> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> <lyte-beta-popover id=\"cxCalcultorResultPopover\" lt-prop-origin-elem=\".cxCalcultorResult\" lt-prop-height=\"auto\" lt-prop-duration=\"400\" lt-prop-content-padding=\"\" lt-prop-show=\"{{lbind(showResult.show)}}\" lt-prop-type=\"box\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-close-on-escape=\"false\" lt-prop-placement=\"bottomLeft\" lt-prop-wrapper-class=\"cxNumberCalcPopup\" on-close=\"{{method('popoverClosed1')}}\" lt-prop-scrollable=\"true\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-re-open=\"true\" lt-prop-prevent-focus=\"true\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxNumResPopContent\" data-zcqa=\"newCalcVal_Crm_{{cxPropModule}}_{{cxPropField.column_name}}\"> = {{showResult.value}} </lyte-popover-content> </template> </lyte-beta-popover> <lyte-popover lt-prop-origin-elem=\".cxCalculatorIcon.cxPropFocus\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-placement=\"bottomRight\" lt-prop-content-padding=\"\" lt-prop-wrapper-class=\"cxNumberCalcPopup cxNumInfoPop {{cxPropPopoverWrapperClass}}\" lt-prop-scrollable=\"true\" id=\"popovercalculator\" on-close=\"{{method('popoverClosed')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxNumInfoPopContent {{if(showResult.infoDetails,'','cxNumDefaultInfo')}}\" onclick=\"{{action('hidePopover')}}\"> <template is=\"if\" value=\"{{showResult.infoDetails}}\"><template case=\"true\"> <div class=\"cxNumInfoExpr cP\">{{showResult.infoDetails}}</div> </template><template case=\"false\"> {{unescape(cruxGetI18n('crm.createfield.calcinfo.new'))}} </template></template> </lyte-popover-content> </template> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} </lyte-popover> </template><template case=\"false\"> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} pR\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'!=',&quot;number&quot;)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <lyte-input lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-type=\"{{cxPropType}}\" onpaste=\"{{action('onPaste',event)}}\" @class=\"{{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}} cxW100Per {{if(currencySymbol,if(cxPropSymbolPrefix,'cxSymbolPrefix','cxSymbolSuffix'))}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-maxlength=\"{{maxlength}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" onkeydown=\"{{action('checkLength',this,event)}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-focus-at-end=\"{{cxPropFocusAtEnd}}\" lt-prop-focus=\"{{cxPropFocus}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-label=\"{{currencyLabel}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" onkeypress=\"{{action('checkLengthOnUp',event)}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" onkeyup=\"{{action('onKeyUpInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" on-blur=\"{{method('blurCallback')}}\"></lyte-input> </template><template case=\"false\"> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <lyte-number lt-prop-max=\"{{cxPropMaxvalue}}\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-min=\"{{cxPropMinvalue}}\" onpaste=\"{{action('onPaste',event)}}\" @class=\"{{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}} cxW100Per {{if(currencySymbol,if(cxPropSymbolPrefix,'cxSymbolPrefix','cxSymbolSuffix'))}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-maxlength=\"{{maxlength}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" onkeydown=\"{{action('checkLength',this,event)}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-focus-at-end=\"{{cxPropFocusAtEnd}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-label=\"{{if(cxPropSymbolPrefix,currencyLabel,'')}}\" lt-prop-unit=\"{{if(cxPropSymbolPrefix,'',currencyLabel)}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" onkeypress=\"{{action('checkLengthOnUp',event)}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" lt-prop-restrict=\"{{cxPropRestrict}}\" lt-prop-wheel=\"{{cxPropWheel}}\" lt-prop-increment=\"{{cxPropIncrement}}\" lt-prop-ignore-symbols=\"{{cxPropIgnoreSymbols}}\" lt-prop-validate-on-empty=\"false\" lt-prop-remove-at-cursor=\"{{cxPropRemoveAtCursor}}\" lt-prop-controls=\"{{cxPropControls}}\" onkeyup=\"{{action('onKeyUpInputField',event)}}\" onmousedown=\"{{action('onMouseDownInputFiled',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\" on-before-value-update=\"{{method('beforeValUpdate')}}\" on-blur=\"{{method('blurCallback')}}\"></lyte-number> </template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonTextInsideElement}}\"><template case=\"true\"><lyte-button onclick=\"{{action('buttonClick')}}\"><template is=\"yield\" yield-name=\"text\">{{cxPropButtonTextInsideElement}}</template></lyte-button></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(displayFormat,'==','slider'),'&amp;&amp;',cxPropIsDisplayFormatEnabled)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(dataType,'!=','currency')}}\"><template case=\"true\"> <lyte-slider lt-prop-digits=\"{{cxPropDigits}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-disabled=\"{{if(ifEquals(cxPropDisabled,true),cxPropDisabled,cxPropReadonly)}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-yield=\"true\" lt-prop-handler=\"{{cxPropHandler}}\" on-select=\"{{method('onsliderselect')}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-width=\"{{cxPropSliderWidth}}\" lt-prop-min=\"{{cxPropSliderMinValue}}\" lt-prop-max=\"{{cxPropSliderMaxValue}}\" lt-prop-scale-unit=\"{{currencySymbol}}\" lt-prop-scale-interval=\"{{splitValue}}\" class=\"{{concat(cxPropSliderClass,' cxNumberCompSlider',if(ifEquals(cxPropReadonly,true),' cxNumberCompSliderReadOnly',''))}}\" lt-prop-height=\"{{cxPropSliderHeight}}\" on-change=\"{{method('onSliderChanges')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_','sliderField')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropSliderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSliderYield \" slider-values=\"{{nonCurrencySliderValues}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption\"> <template is=\"for\" items=\"{{ltPropScaleStyle}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\" onclick=\"{{action('seperatorClick',nonCurrencySliderValues[indexVal])}}\" lt-prop-title=\"{{if(expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(indexVal,'!=',0)),'&amp;&amp;',expHandlers(indexVal,'!=',expHandlers(nonCurrencySliderValues.length,'-',1))),nonCurrencySliderValues[indexVal],'')}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',indexVal)}}\"> <span></span> <span class=\"lyteScalLable cxNumScaleLable {{if(ifEquals(nonCurrencySliderValues[indexVal].length,1),'cxNumScaleSingDigLabel','')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'!'),'||',expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(expHandlers(indexVal,'==',0),'||',expHandlers(indexVal,'==',expHandlers(nonCurrencySliderValues.length,'-',1)))))}}\"><template case=\"true\"> <lyte-text lt-prop-value=\"{{nonCurrencySliderValues[indexVal]}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" style=\"max-width:{{maxWidthToSet}}\"></lyte-text> </template></template> </span> </span> </template> </div> </template></template> </template> </lyte-slider> </template><template case=\"false\"> <lyte-slider lt-prop-digits=\"{{cxPropDigits}}\" lt-prop-title=\"{{cxPropTooltip}}\" lt-prop-disabled=\"{{if(ifEquals(cxPropDisabled,true),cxPropDisabled,cxPropReadonly)}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-yield=\"true\" lt-prop-handler=\"{{cxPropHandler}}\" on-select=\"{{method('onsliderselect')}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-width=\"{{cxPropSliderWidth}}\" lt-prop-min=\"{{cxPropSliderMinValue}}\" lt-prop-max=\"{{cxPropSliderMaxValue}}\" lt-prop-scale-unit=\"{{currencySymbol}}\" lt-prop-scale-interval=\"{{splitValue}}\" class=\"{{concat(cxPropSliderClass,' cxNumberCompSlider',if(ifEquals(cxPropReadonly,true),' cxNumberCompSliderReadOnly',''))}}\" lt-prop-height=\"{{cxPropSliderHeight}}\" on-change=\"{{method('onSliderChanges')}}\" data-zcqa=\"{{concat(cxPropField.field_label,'_','sliderField')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{cxPropSliderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSliderYield \" slider-values=\"{{sliderValues}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption\"> <template is=\"for\" items=\"{{ltPropScaleStyle}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\" onclick=\"{{action('seperatorClick',sliderValues[indexVal])}}\" lt-prop-title=\"{{if(expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(indexVal,'!=',0)),'&amp;&amp;',expHandlers(indexVal,'!=',expHandlers(sliderValues.length,'-',1))),sliderCurrencyShowTooltip(showCurConversion,sliderValues[indexVal]),'')}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" data-zcqa=\"{{concat(cxPropField.field_label,'_',indexVal)}}\"> <span></span> <span class=\"lyteScalLable cxNumScaleLable {{if(ifEquals(sliderValues[indexVal].length,1),'cxNumScaleSingDigLabel','')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIsSeperatorHoverShow,'!'),'||',expHandlers(cxPropIsSeperatorHoverShow,'&amp;&amp;',expHandlers(expHandlers(indexVal,'==',0),'||',expHandlers(indexVal,'==',expHandlers(sliderValues.length,'-',1)))))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{showCurConversion}}\"><template case=\"true\"> <lyte-text style=\"max-width:{{maxWidthToSet}}\" lt-prop-yield=\"true\" lt-prop-value=\"{{sliderCurrencyShowTooltip(undefined,undefined,sliderValues[indexVal].currency1,sliderValues[indexVal].currency2)}}\" class=\"cxNumScaleLableFirstValue\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\"> <template is=\"registerYield\" yield-name=\"lyte-text\">{{sliderValues[indexVal].currency1}}</template> </lyte-text> <span class=\"cxNumScaleLableSecondValue\" style=\"max-width:{{maxWidthToSet}}\"> (<lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{sliderCurrencyShowTooltip(undefined,undefined,sliderValues[indexVal].currency1,sliderValues[indexVal].currency2)}}\" lt-prop-tooltip-class=\"cxNumCompSliderTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\"> <template is=\"registerYield\" yield-name=\"lyte-text\">{{sliderValues[indexVal].currency2}}</template> </lyte-text>) </span> </template><template case=\"false\"> <lyte-text style=\"max-width:{{maxWidthToSet}}\" lt-prop-value=\"{{sliderValues[indexVal]}}\" class=\"cxNumScaleLableFirstValue\"></lyte-text> </template></template> </template></template> </span> </span> </template> </div> </template></template> </template> </lyte-slider> </template></template> </template></template> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template><template case=\"filter\"></template><template case=\"criteria\"> <lyte-number lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-increment=\"{{if(cxPropStep,true,false)}}\" lt-prop-step=\"{{cxPropStep}}\" lt-prop-name=\"{{cxPropName}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-wheel=\"false\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-validate-on-empty=\"false\" on-before-paste=\"{{method('onPaste')}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-appearance=\"{{if(ifEquals(cxPropAppearance,'box'),'box','flat')}}\" @class=\"{{if(ifEquals(cxPropAppearance,'box'),'lyteInputBox cxBoxInput','lyteInput cxFlatInput')}} {{if(ifEquals(cxPropFrom,'criteria'),'cxW100Per')}} {{if(currencySymbol,if(cxPropSymbolPrefix,'cxSymbolPrefix','cxSymbolSuffix'))}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-direction=\"{{if(ifEquals(cxPropFrom,'criteria'),'horizontal')}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" on-value-change=\"{{method('onChange')}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" onkeydown=\"{{action('checkLength',this,event)}}\" lt-prop-max=\"{{cxPropMaxvalue}}\" lt-prop-min=\"{{minVal}}\" on-before-max-min-validation=\"{{method('onBeforeMaxMinValidation')}}\" lt-prop-label=\"{{if(cxPropSymbolPrefix,currencyLabel,'')}}\" lt-prop-unit=\"{{if(cxPropSymbolPrefix,'',currencyLabel)}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-remove-at-cursor=\"{{cxPropRemoveAtCursor}}\" on-blur=\"{{method('blurCallback')}}\"></lyte-number> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </template><template case=\"view\"> {{addMurhyInfo(\"crux-number-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <div id=\"{{cxPropId}}\" data-zcqa=\"{{cxPropZcqa}}\" class=\"cxElemCompViewValue {{if(currencyTypeField,'numberDivCurrencyView','numberDivNumberView')}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'!')}}\"><template case=\"true\"> {{cxPropEmptyValue}} </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropToggleMasking}}\"><template case=\"true\"> {{cruxMaskValue(value,cxPropMaskingProperties,cxPropToggleMasking)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropTooltip}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-class=\"{{if(cxPropTooltipProps.class,cxPropTooltipProps.class,'')}}\" lt-prop-tooltip-config=\"{{if(cxPropTooltipProps.config,cxPropTooltipProps.config)}}\" lt-prop-value=\"{{value}}\"></lyte-text> </template><template case=\"false\"> {{value}} </template></template> </template></template></template></template> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick',event)}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </div> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"trans":true},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"text","position":[1,1,1,3]},{"type":"attr","position":[1,1,1,5],"trans":true},{"type":"componentDynamic","position":[1,1,1,5]},{"type":"attr","position":[1,1,1,7]},{"type":"if","position":[1,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,1,9]},{"type":"if","position":[1,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,0],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,11]},{"type":"if","position":[1,1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,0],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,0]},{"type":"text","position":[3,2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"text","position":[5,3]},{"type":"componentDynamic","position":[5]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"trans":true},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3],"trans":true},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3],"trans":true},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,0],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'max-width:'","maxWidthToSet"]}}}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,0]},{"type":"text","position":[3,2,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"view":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[5,5]},{"type":"if","position":[5,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropFocusAtEnd","cxPropFocus","cxPropAutofocus","lyteViewPort","cxPropFrom","cxPropId","cxPropName","cxPropValue","cxPropEmptyValue","value","cxPropPlaceholder","cxPropDisabled","cxPropReadonly","cxPropMaxlength","cxPropMaxvalue","cxPropMinvalue","cxPropIsoCode","cxPropZcqa","cxPropClass","isError","cxPropIgnoreEmptyValue","cxPropCurrencyCode","currencySymbol","cxPropSymbolPrefix","currencyLabel","cxPropCurrencyDetails","cxPropDefaultRoundOff","cxPropDefaultOrgCurrency","cxPropAppearance","cxPropErrorMessage","viewClass","cxPropDecimalAllowed","currencyTypeField","cxPropField","cxPropFieldKey","cxPropClearErrorMessage","cxPropDirection","cxPropLabelClass","cxPropAllowNegativeValue","lyteUnbound","cxPropTabIndex","cxPropTabindex","cxPropTooltip","allowNegative","cxPropExchangeRate","cxPropErrorYield","cxPropExchangeRateFinance","cxPropHomeCurrency","cxPropDisplayCurrency","cxPropFormattedCurrency","cxPropShowCalculator","showResult","cxPropInfoTooltip","result","onFocus","cxPropTooltipProps","cxPropStep","cxPropEnableLbind","cxPropAria","cxPropAriaAttributes","maxlength","cxPropTooltipConfig","cxPropTooltipClass","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropWrapperClass","cxPropPopoverWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropIconClass","cxPropRightIconClass","cxPropLayout","cxPropDefaultCurrencyIsoCode","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropType","cxPropButtonTextInsideElement","cxPropRestrict","cxPropMandatory","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropPreventFocusOnError","tooltip","cxPropHandler","cxPropIsDisplayFormatEnabled","cxPropSliderWidth","cxPropSliderClass","cxPropSliderYield","cxPropDigits","cxPropIncrement","cxPropWheel","cxPropUpdateDelay","cxPropCallbackDelay","cxPropIgnoreSymbols","cxPropBoundary","cxPropPrefixYield","cxPropBoundary","cxPropRemoveAtCursor","cxPropControls","cxPropButtonYield","cxPropAriaErrorProperties","cxPropMaskingProperties","cxPropProcessNumber","cxPropMinMaxValidation","showCurConversion","cxPropIsSeperatorHoverShow","cxPropShowTooltipOnClick","cxPropSliderHeight","cxPropCurrencySymbolOnlyForSlider","dataType","displayFormat","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropDivWrapperClass","cxPropSuffixYield","cxPropIsCurrencyField","cxPropFormatNumber","formattedValue","cxPropHideRightIcon"],
_observedAttributesType :["object","object","boolean","boolean","boolean","boolean","boolean","string","string","string","string","string","string","string","boolean","boolean","number","number","number","string","string","string","boolean","boolean","string","string","boolean","string","object","number","string","string","string","string","boolean","boolean","object","string","boolean","string","string","boolean","boolean","string","string","string","boolean","number","boolean","number","string","boolean","string","boolean","object","string","string","boolean","object","number","boolean","boolean","object","number","string","string","string","string","string","string","string","string","string","string","string","string","string","boolean","boolean","string","string","string","string","boolean","string","boolean","string","string","object","string","string","boolean","string","string","boolean","string","string","boolean","number","boolean","boolean","number","number","boolean","object","boolean","object","boolean","boolean","boolean","object","object","boolean","boolean","boolean","boolean","boolean","string","boolean","string","string","string","boolean","boolean","boolean","string","boolean","boolean","boolean","string","boolean"],
//No I18n
	data : function(){
		return {
			/**
			 * This property used to send multiple properties to child compoent.
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * If set to true, error will be displayed in a hovercard instead of below the input
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * This will place cursor at the end of the text when input is focused through cx-prop-focus
			 * @componentProperty { boolean } cxPropFocusAtEnd=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFocusAtEnd: Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * It will make input focus on its didConnect. 
			 * @componentProperty { boolean } cxPropFocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropFocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * Sets autofocus value for input. Browser will focus input when entire page got loaded.
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * Set to true to render the component when it comes to viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValues false
			 * @allowedValues [view, create, criteria]
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * Id set to lyte-input
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * Name attribute set to lyte-input
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * Value set when cxPropValue is empty
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } value
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			value : Lyte.attr("string"),//No I18n
			/**
			 * Sets placeholder for input field
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * This property disables the input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}), //No I18n
			/**
			 * Sets maximum length for input field
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaxlength : Lyte.attr("number"),//No I18n
			/**
			 * Validation fails if given a number above this
			 * @componentProperty { number } cxPropMaxvalue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 9000000000000000000
			 */
			cxPropMaxvalue : Lyte.attr("number",{default : 9000000000000000000}),//No I18n
			/**
			 * Validation fails if given a number below this
			 * @componentProperty { number } cxPropMinvalue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMinvalue : Lyte.attr("number"),//No I18n
			/**
			 * The currency code of the record
			 * @componentProperty { string } cxPropIsoCode
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIsoCode : Lyte.attr("string"),//No I18n
			/**
			 * Value set to data-zcqa
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * Class set to lyte-input
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * @componentProperty { boolean } isError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * @defaultValue false
			 */
			isError : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * Set to true to ignore empty value on validate
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The currency code of the record
			 * @componentProperty { string } cxPropCurrencyCode
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCurrencyCode : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } currencySymbol
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			currencySymbol : Lyte.attr("string",{default : ""}),//No I18n
			/**
			 * This will decide the symbol to display
			 * @componentProperty { string } cxPropSymbolPrefix
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 * @internal
			 * @defaultValue true
			 */
			cxPropSymbolPrefix :  Lyte.attr("boolean", {default : true}),//No I18n
			currencyLabel : Lyte.attr("string",{default : ""}),//No I18n
			/**
			 * The object which contains the currency information such as symbol, decimal places, separator etc.
			 * @componentProperty { object } cxPropCurrencyDetails
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The object which contains the currency information such as symbol, decimal places, separator etc.
			 */
			

			cxPropCurrencyDetails : Lyte.attr("object", {default : (_cruxUtils._getProperty('currencyDetails',{}))}),//No I18n
			/**
			 * @componentProperty { number } cxPropDefaultRoundOff
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultRoundOff : Lyte.attr("number", {default : (_cruxUtils._getProperty('defaultRoundOff',2))}),//No I18n
			/**
			 * The currency code of the organisation which is taken into consideration when the record has no specific currency
			 * @componentProperty { string } cxPropDefaultOrgCurrency
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultOrgCurrency : Lyte.attr("string", {default : (_cruxUtils._getProperty('defaultOrgCurrency',''))}),//No I18n
			/**
			 * It defines the appearance of the lyte-input.
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue flat
			 * @allowedValues [flat, box]
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * The error message to be displayed below the input
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } viewClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			viewClass : Lyte.attr("string", {default : "numberDivNumberView"}),//No I18n
			/**
			 * Set to false to prevent user from typing a decimal value
			 * @componentProperty { boolean } cxPropDecimalAllowed=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropDecimalAllowed : Lyte.attr("boolean",{default : true}),//no i18n
			/**
			 * @componentProperty { boolean } currencyTypeField=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * @defaultValue false
			 */
			currencyTypeField : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * The selector which tells us which key has the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * Set to false to prevent error message from being cleared when data is changed
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * It defines how label and input field placed
			 * @componentProperty { string } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue horizontal
			 * @allowedValues [vertical, horizontal]
			 */
			cxPropDirection : Lyte.attr("string", {default : "horizontal"}), //No I18n
			/**
			 * Class set to field label
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to false to prevent user from typing negative values
			 * @componentProperty { boolean } cxPropAllowNegativeValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropAllowNegativeValue : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
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
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * @componentProperty { boolean } allowNegative=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * @defaultValue true
			 */
			allowNegative : Lyte.attr("boolean" , {default : true}),//no i18n
			/**
			 * The exchange rate of the currency of the record in respect to the home currency
			 * @componentProperty { number } cxPropExchangeRate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropExchangeRate : Lyte.attr("number"),//No I18n
			/**
			 * Set to true to display error yield below input
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * The exchange rate of the currency of the record in respect to the home currency but only for finance modules
			 * @componentProperty { number } cxPropExchangeRateFinance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropExchangeRateFinance : Lyte.attr("number"),//No I18n
			/**
			 * The currency code of the home currency
			 * @componentProperty { string } cxPropHomeCurrency
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * 
			 */
			cxPropHomeCurrency : Lyte.attr("string"),//No I18n
			/**
			 * Set to false to hide currency icon
			 * @componentProperty { boolean } cxPropDisplayCurrency=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropDisplayCurrency : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * The formatted currency passed from server to skip client formatting
			 * @componentProperty { string } cxPropFormattedCurrency
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFormattedCurrency : Lyte.attr("string"),//No I18n
			/**
			 *  Set to true to make the input act like a calculator
			 * @componentProperty { boolean } cxPropShowCalculator=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowCalculator : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } showResult
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 * @defaultValue {show : false}
			 */
			showResult : Lyte.attr("object", {default : {show : false}}), //No I18n
			/**
			 * The message to be displayed on hover of an info icon next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } result
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			result : Lyte.attr("string"),//no i18n
			/**
			 * @componentProperty { boolean } onFocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			onFocus : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * @componentProperty { object } cxPropTooltipProps
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipProps : Lyte.attr("object"), //no i18n
			/**
			 * @componentProperty { number } cxPropStep
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStep : Lyte.attr('number'), //no i18n
			/**
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce( In this case you can take current value from inner 'input' tag ) or else it will get updated in blur event
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 *  To set custom attributes to input
			 * @componentProperty { boolean } cxPropAria=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom attributes to input
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { number } maxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			maxlength : Lyte.attr("number"),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 *  The prefix text to be added to error zcqa
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * The suffix text to be added to error zcqa
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue Error
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * The class set to the error message
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 *  It will be added to the wrapper div element over the input
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets class for input
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPopoverWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets class for lyte popover
			 * @componentProperty { string } cxPropPopoverWrapperClass
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default :""}),//No I18n
			/**
			 *  Class set to the error span
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Class set to the icon
			 * @componentProperty { string } cxPropIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIconClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRightIconClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropDefaultCurrencyIsoCode
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultCurrencyIsoCode : Lyte.attr("string", {default : (_cruxUtils._getProperty('defaultCurrencyISOCode',''))}),//No I18n
			/**
			 * Set to true to render info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to render custom disable icon
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
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
			 * Set as number to disable allowing text characters
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue text
			 * @allowedValues [text, number]
			 */
			cxPropType : Lyte.attr("string", {default : "text"}),
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * Given value will be constructed as a regex. Matched values will not be allowed in inputs
			 * @componentProperty { string } cxPropRestrict
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRestrict : Lyte.attr("string"),
			/**
			 *  Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * Message displayed as warning below input
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * Set to true to display warning message below input
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 *  Set to true to prevent focus on error of validate
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } tooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tooltip : Lyte.attr("string"),
			/**
			 * Type of handler to be used for slider handler
			 * @componentProperty { string } cxPropHandler
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHandler:Lyte.attr('string', { "default":'lyteArrow' }),
			/**
			 * @componentProperty { boolean } cxPropIsDisplayFormatEnabled=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsDisplayFormatEnabled:Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { string } cxPropSliderWidth
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @defaultValue 400px
			 */
			cxPropSliderWidth:Lyte.attr('string',{default:"400px"}),
			/**
			 * Class set to lyte-slider
			 * @componentProperty { string } cxPropSliderClass
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSliderClass:Lyte.attr('string',{default:""}),
			/**
			 * To construct your own scale values use yield. User given elements will be rendered instead of default scale values
			 * @componentProperty { boolean } cxPropSliderYield=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropSliderYield:Lyte.attr('boolean',{default:false}),
			/**
			 * It will give results with given digit precision
			 * @componentProperty { number } cxPropDigits
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 1
			 */
			cxPropDigits:Lyte.attr('number',{default:1}),
			/**
			 * If it sets to false, value increment/decrement on up down/key will be prevented
			 * @componentProperty { boolean } cxPropIncrement=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIncrement:Lyte.attr("boolean",{default:false}),
			/**
			 * It will prevent incremental / decremental of value in wheel event
			 * @componentProperty { boolean } cxPropWheel=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropWheel:Lyte.attr("boolean",{default:false}),
			/**
			 *  Input value will be updated to lt-prop-value within given delay
			 * @componentProperty { number } cxPropUpdateDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 250
			 */
			cxPropUpdateDelay: Lyte.attr("number",{default:250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue 0
			 */
			cxPropCallbackDelay: Lyte.attr("number",{default:0}),
			/**
			 * If it sets to true characters like .( dot ) and 'e' are taken as a part of the value Else Value will be converted into numbers for validation
			 * @componentProperty { boolean } cxPropIgnoreSymbols=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropIgnoreSymbols : Lyte.attr("boolean", {default : false}),
			cxPropBoundary : Lyte.attr("object", {default : {}}),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * This property helps you to set the dimensions on crossing which the popover is closed.
			 * @componentProperty { object } cxPropBoundary
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBoundary : Lyte.attr("object", {default : {}}),
			/**
			 * This property helps you to remove excess character at cursor position insteadof last character when length exceeds given max length.
			 * @componentProperty { boolean } cxPropRemoveAtCursor
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * @defaultValue true
			 */
			cxPropRemoveAtCursor : Lyte.attr('boolean', {default : true}),
			/**
			 * This property will render increment & decrement handlers.
			 * @componentProperty { boolean } cxPropControls
			 * @author naveen.winson
			 * @version 1.0.0
			 * @defaultValue false
			 */
			cxPropControls: Lyte.attr('boolean', {default : false}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * property to set error icon and error color
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropMaskingProperties : Lyte.attr("object"),

			cxPropProcessNumber:Lyte.attr('boolean', {default : false}),

			cxPropMinMaxValidation:Lyte.attr('boolean', {default : false}),
			showCurConversion: Lyte.attr('boolean',{default:false}),
			cxPropIsSeperatorHoverShow:Lyte.attr("boolean",{default:true}),
			cxPropShowTooltipOnClick:Lyte.attr("boolean",{default:true}),
			cxPropSliderHeight:Lyte.attr("string"),
			cxPropCurrencySymbolOnlyForSlider:Lyte.attr("boolean",{default:false}),
			dataType:Lyte.attr("string",{default:""}),
			displayFormat:Lyte.attr("string",{default:""}),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			maskUnmaskPermission:Lyte.attr("boolean",{default:false}),
			cxPropToggleMasking:Lyte.attr("boolean",{default:false}),
			cxPropShowMaskUnmaskIcon:Lyte.attr("boolean",{default:true}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropIsCurrencyField: Lyte.attr("boolean"),
			cxPropFormatNumber: Lyte.attr("boolean", { default: false }),
			formattedValue: Lyte.attr("string"),
			cxPropHideRightIcon: Lyte.attr("boolean",{default:false})
		}
	},
	getValue : function(){
		if( this.$node.querySelector("#cruxLoadingElem") ){
			return this.data.cxPropValue;
		}
		//if number is formatted, input will contain formatted value, so we need to return unformatted value
		if(this.getData('cxPropFormatNumber') && this.getData('displayFormat')!=='slider'){
			return this.unformattedValue;
		}
		return this.getValueFromInput();
	},
	getValueFromInput: function(){
		if(this.$node.querySelector("input")){
			var value = this.$node.querySelector("input").value.trim();//No I18n
			if(this.data.cxPropFrom==='create' && this.data.cxPropMaskingProperties && this.noMaskPermissionKeyDown){
				value=this.data.cxPropValue ;
			}
			if(value && value[0] == '.'){
				value = '0'+value;
			}
			return value;
		}
		return "";
	},
	validate : function(){
		var val = this.getValue();
		if(this.data.cxPropFrom==='create' && this.noMaskPermissionKeyDown){
			val=this.data.cxPropValue ;
		}
		var field = this.getData("cxPropField");//No I18n
		this.setData("cxPropErrorMessage", "");//No I18n
		if(this.getData("cxPropFrom") == "create"){
			var res = this.validateNumberField(val, field, this.data.cxPropMaxlength, this.data.cxPropMaxvalue, this.data.cxPropMinvalue);
			if(res == false && !this.data.cxPropPreventFocusOnError){
				this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : this.$node.querySelector("lyte-number") ? this.$node.querySelector("lyte-number").focus() : "";
				// this.$node.querySelector("lyte-input") ? this.$node.querySelector("lyte-input").focus() : "";//No I18n
			}
			return res;
		}
		let showError = false;
		if( this.data.cxPropMinMaxValidation && this.data.cxPropMinvalue && val < this.data.cxPropMinvalue){
			showError = true
		}
		if((!val || isNaN(parseInt(val))) && !this.data.cxPropIgnoreEmptyValue || showError){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			this.$node.querySelector("input").focus();//No I18n
			return false;
		}else if( (!this.getData("cxPropAllowNegativeValue") && ( val.indexOf("-") != -1 || val.indexOf("+") != -1 ) ) || (!this.data.cxPropDecimalAllowed && val.indexOf(".") != -1) ){//no i18n
				this.showAlert(_cruxUtils.getI18n("crm.mb.field.common.splc"));//No I18n
				this.$node.querySelector("input").focus();//No I18n
				return false;

		}else if(field.data_type == "autonumber" || field.data_type == "bigint"){//No I18n
			var check =  field.data_type == "bigint" ? this.isValidInteger(val) : true;
			if(val.indexOf(".") > -1 || !check){
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				this.$node.querySelector("input").focus();//No I18n
				return false;
			}
		}
		else if(field.data_type != "integer"){//no i18n
			var check = this.isValidDecimal(val);
			if(check){
				check = this.decimalLengthCheck(val);
				if(!check){
					this.showAlert(_cruxUtils.getI18n("crm.field.valid.decimal.check2", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label), field.decimal_place));//No I18n
					this.$node.querySelector("input").focus();//No I18n
				}
			}
			else{
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			return check;
		}else if(this.data.cxPropFrom == 'criteria' || this.data.cxPropFrom == 'filter'){ //no i18n
			var check = this.isValidDecimal(val);
			if(check){
				check = this.decimalLengthCheck(val,{decimal_place : typeof this.data.cxPropField.decimal_place == 'undefined' || this.data.cxPropField.decimal_place == 'null' ? 2 :  this.data.cxPropField.decimal_place});
			}
			if(!check){
				this.showAlert(_cruxUtils.getI18n('crm.field.valid.check', Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			}
			return check;
		}
		return true;
	},
	resetData:function(){
		this.$node.querySelector('lyte-input') ? this.$node.querySelector('lyte-input').ltProp('value','') : this.$node.querySelector('lyte-number') ? this.$node.querySelector('lyte-number').ltProp("value", "") : ""
		
	},
	init : function(){
		if(!this.getData("cxPropMaxlength")){
			this.setData("cxPropMaxlength",19);//no i18n
		}
		if( this.data.cxPropCurrencyCode == "" ){
			let props = _cruxUtils._getProperty();
			var currencyCode = props.baseCurrency ? props.baseCurrency : "";//no i18n
			if(this.data.cxPropFrom === "create"  && props.preferredCurrency ){
				currencyCode = props.preferredCurrency;
			}
			this.setData("cxPropCurrencyCode",currencyCode);//no i18n
		}
		if(["filter","criteria"].indexOf(this.getData("cxPropFrom")) !== -1 ){
			if((this.getData("cxPropField").data_type == 'formula' ? 
				["double" , "currency" , "bigint" , "integer","percent"].indexOf(this.getData("cxPropField").formula.return_type) === -1  : 
				["double" , "currency" , "bigint" , "integer","percent"].indexOf(this.getData("cxPropField").data_type) === -1 )&& 
				!this.data.cxPropField.history_tracking && 
					!this.data.cxPropField.allowNegativeValue){
				this.setData("cxPropAllowNegativeValue" , false);//no i18n
			}
		}
		this.data.minVal = this.data.cxPropMinMaxValidation ? undefined : this.data.cxPropMinvalue;
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		if(this.data.cxPropField.range && this.data.cxPropFrom=="create"){
			this.setData('cxPropMaxvalue',this.data.cxPropField.range.to);
			this.setData('cxPropMinvalue',this.data.cxPropField.range.from);
		}
		if( (this.data.cxPropField.display_format=="slider" || this.data.cxPropField.range) && this.data.cxPropField.data_type=='currency' && this.data.cxPropFrom=="create"){
			this.setData('cxPropShowCalculator',true);
		}
		else if((this.data.cxPropField.display_format=="slider" || this.data.cxPropField.range) && this.data.cxPropField.data_type=="integer" && this.data.cxPropFrom=="create"){
			this.setData('cxPropDigits',0);
		}
		if(this.data.cxPropField.display_format=="slider" && this.data.cxPropFrom=="create" && this.data.cxPropField.decimal_place){
			this.setData("cxPropDigits",this.data.cxPropField.decimal_place)
		}
		if(  this.data.cxPropField.range && this.data.cxPropFrom=="create"){
			var min=(Number(Math.round(this.data.cxPropField.range.from+'e'+this.data.cxPropDigits)+'e-'+this.data.cxPropDigits)).toString();
			var max=(Number(Math.round(this.data.cxPropField.range.to+'e'+this.data.cxPropDigits)+'e-'+this.data.cxPropDigits)).toString();
			this.setData('cxPropSliderMinValue',min);
			this.setData('cxPropSliderMaxValue',max);
		}
		if(this.data.cxPropField.display_format=='slider' && this.data.cxPropFrom=="create"){
			var split_val=this.data.cxPropField.display_format_properties.split;
			var from_Val=this.data.cxPropField.range.from;
			var to_val=this.data.cxPropField.range.to;
				var d=(to_val-(from_Val))/(split_val+1);
			this.setData('splitValue',d);
			// this.setData('cxPropMaxvalue',c);
			// this.setData('cxPropMinvalue',b);
		}
		
		
	},
	methods : {
		beforeValUpdate: function(){
			let profileId = this.getData('cxPropProfileId');
			if(this.data.cxPropMaskingProperties && Object.keys(this.data.cxPropMaskingProperties).length>0 && !this.data.cxPropMaskingProperties.profiles.some(profile => profile.id === profileId) && !this.componentRendered){
				return false;
			}
		},
		blurCallback: function(ev,elem){
			if(this.getMethods('onBlur')){
				this.executeMethod('onBlur', ev, elem);
			}
		},
		onSliderChanges:function(value){
			if(this.data.cxPropField.data_type=="currency"){
				this.setSliderTooltip(value);
			}
			// To bubble the blur event to its parent Node we need to focus the handler and blur it again.This fix is for mapping purpose.
			var slider=this.$node.querySelector("lyte-slider");
			var handler=slider.querySelector(".lyteSliderHandler");
			handler.focus();
            handler.blur();
		},
		onsliderselect: function (value,ele) {
			if(this.$node.querySelector('lyte-number')){
				this.$node.querySelector('lyte-number').setData('ltPropValue',value)
			}else{
				this.$node.querySelector('lyte-input').setData('ltPropValue',value);
			}
			var field= this.data.cxPropField;
			if(field.data_type=="number" || field.data_type=="integer" || field.data_type=="bigint"){
				//reset the slider for small values
				this.$node.querySelector("lyte-slider").setData('ltPropValue',"");
				this.$node.querySelector("lyte-slider").setData('ltPropValue',value);
			}	
			if(this.data.cxPropShowTooltipOnClick){
				setTimeout(() => {
					$L('lyte-tooltip')[0].trigger(ele.querySelector(".lyteSliderHandler"));
				},10);
			}
			this.actions.checkLengthOnUp.call(this);
			if (this.getMethods("onValueChange")) {
				this.executeMethod("onValueChange", this.getValue(), this.$node);//No I18n
			}
			if(this.data.showResult ){
				this.setData("showResult", {});//No I18n
			}
		},
		onChange : function(value,node){
			if(this.preventChangeCallback){
				this.preventChangeCallback = false;
				return;
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			// this.setData("isError", false);//No I18n
			let currValue = this.getData('cxPropFormatNumber') && this.getData('displayFormat')!=='slider' ? this.unformattedValue : node.getData('ltPropValue');
			if((this.data.cxPropFrom === 'criteria' || this.data.cxPropFrom === 'filter') && (currValue && currValue.length === 19 && parseInt(currValue) >= this.data.cxPropMaxvalue) && !this._errorAlertShown){
					 this.showMsgBox(_cruxUtils.getI18n("sentiment.criteria.wrongcriteria",'9000000000000000000'),"error");//no i18n
					this.$node.querySelector('lyte-number').ltProp('value','9000000000000000000'); //no i18n
					this._errorAlertShown = false;
			}
			this.setData('cxPropValue',currValue);
			if(this.$node.querySelector('lyte-slider')){
				var num;
				if(this.$node.querySelector('lyte-number')){
					num=this.$node.querySelector("lyte-number").getData('ltPropValue');
				}else{
					num=currValue;
				}
				this.$node.querySelector("lyte-slider").setData('ltPropValue',num);
			}
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.getValue(),this.$node);//No I18n
			}
		},
		onBeforeMaxMinValidation : function(type,oldValue , newVaue){
			if( type === "max" ){
				this.showMsgBox(_cruxUtils.getI18n("sentiment.criteria.wrongcriteria",this.data.cxPropMaxvalue),"error");//no i18n
				this._errorAlertShown = true;
			}
			if(newVaue && newVaue.length == 19 && parseInt(newVaue) >= this.data.cxPropMaxvalue){
				return '9000000000000000000'
			}
			return newVaue;
		},
		onPaste : function(cV,pT,nV){
			if(this.getData("cxPropFrom") == "criteria"){
				return false;
			}
			if(this.data.cxPropAllowNegativeValue == false){
				return nV.replace('-','')
			}
		},
		popoverClosed : function(){
			this.setData("onFocus", false);//No I18n
		},
		popoverClosed1 : function(){
			delete this.operationPerformed;
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    },
		sliderAfterRender:function(slider){
			// this.sliderHeightCal(slider);
		},
		onFieldFocus:function(event){
			this.onFocusMaskField(event);
		}
	},
	// sliderHeightCal:function(slider){
	// 	if( !this.data.cxPropSliderYield){
	// 		// let sliderHeight = slider.querySelector('.lyteRangeSlider')?slider.querySelector('.lyteRangeSlider').clientHeight:undefined ;
	// 		// let sliderYieldHeight =slider.querySelector('.lyteScalLable.cxNumScaleLable')? slider.querySelector('.lyteScalLable.cxNumScaleLable').clientHeight:undefined;
	// 		// if(sliderHeight && sliderYieldHeight){
	// 		// 	$L(slider).css('height',`${sliderHeight+sliderYieldHeight+5}px`)
	// 		// }
	// 		var slider_height=$L('.cxNumScaleLable',this.$node)[0];
	// 		this.setData('cxPropSliderHeight',slider_height.offsetHeight+slider_height.offsetTop+"px");
	// 	}
	// },
	actions : {

		checkLength : function(node,event){
			if([38,40,69,187].indexOf( event.keyCode ) != -1 && !this.getData("cxPropShowCalculator")){
				event.preventDefault();
			}
			if(!this.getData("cxPropDecimalAllowed") && [187,190,110].indexOf( event.keyCode ) != -1){
				event.preventDefault();
			}
			if(node && node.querySelector("input") && node.querySelector("input").value.indexOf(".") > -1 && [190,110].indexOf( event.keyCode ) != -1){
				var data = node.querySelector("input").value.split(/[+\-*/,]+/);
				var index = node.querySelector("input").selectionStart-1;
				for(var i=0,j=0; i<data.length; i++){
					j+=data[i].length;
					if(j < index){
						continue;
					}
					else if(data[i].indexOf(".") > -1){
						event.preventDefault();
					}
					break;
				}
			}
			if(( !this.getData('cxPropAllowNegativeValue') || ((this.data.cxPropFrom === 'filter' || this.data.cxPropFrom ==='criteria')  && this.data.cxPropMinvalue >= 0))&& !this.data.cxPropShowCalculator && (event.keyCode === 173 || event.keyCode === 189)){
				// if(event.keyCode == 173 || event.keyCode == 189){
					event.preventDefault();
				// }
			}
			this.onKeyDownMaskField(event);
		},
		showCalculatorInfo : function(){
			if(this.data.cxPropReadonly){
				return false;
			}
			var result = undefined;
			if(this.getData("showResult").formula){
				result = this.getData("showResult").formula.trim()+" = "+this.getData("showResult").value;//No I18n
			}
			Lyte.objectUtils(this.getData("showResult"), "add", "infoDetails", result);
			this.setData("onFocus", true);
			this.$node.querySelector("#popovercalculator").setData("ltPropShow", true);
			// document.getElementById("popoveranuja").setData("ltPropShow", true);
		},
		hidePopover : function(){
			this.setData("onFocus", false);
			this.$node.querySelector("#popovercalculator").setData("ltPropShow", false);
			if(this.getData("showResult").formula){
				_cruxUtils.addMurhyInfo("crux-number-component.js", "Feb Default Changes");
				this.ignoreFocus = true;
				this.$node.querySelector("input").value = this.getData("showResult").formula;//No I18n
				this.$node.querySelector("input").focus();//No I18n
				this.ignoreFocus = false;
				this.$node.querySelector("lyte-input").classList.add("cxCalcultorResult");//No I18n
				Lyte.objectUtils(this.getData("showResult"), "add", "show", true);//No I18n
				this.operationPerformed = true;
			}
			
			// Lyte.objectUtils(this.getData("showResult"), "add", "showInfo", false);//No I18n
			// document.getElementById("popoveranuja").setData("ltPropShow", false);
		},
		onPaste : function(event){
			this.actions.checkLengthOnUp.call(this, undefined,event.clipboardData.getData("Text"));//No I18n
			if(this.data.cxPropAllowNegativeValue == false){
				this.$node.querySelector("input").value = this.$node.querySelector("input").value.replace('-','')
			}
			return false; 
		},
		onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if (this.data.cxPropPrefixYield && rightIconBox || this.data.cxPropShowCalculator === true) {
				if(onfocus){
					rightIconBox.classList.remove("cxBoxInputFocused");//No I18n
				} else{
					rightIconBox.classList.add("cxBoxInputFocused");//No I18n
				}
			}
				//focus can be given when click is made in calculator popover, we need to ignore the focus
				if(onfocus || (!onfocus && !this.ignoreFocus)){
					this.handleFormatNumber(undefined,this.getValueFromInput());
				}
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    checkLengthOnUp : function(event,val){
    	if(this.data.cxPropDecimalAllowed && this.data.cxPropMaxlength && this.data.cxPropField.data_type != "integer" && this.data.cxPropType != "number"){
	    	var value = val ? val : this.$node.querySelector("input").value;//No I18n
	    	var operatorLen
	    	try{
	    		operatorLen = value.match(/[+\-*/,]+/g).length
	    	}catch(e){
	    		operatorLen = 0
	    	}
	    	if(value.indexOf(".") > -1 || (event && event.keyCode == 46 && value.indexOf(".") == -1 && event.srcElement.selectionStart != this.data.maxlength)){
	    		this.setData("maxlength", this.data.cxPropMaxlength+1+operatorLen);//No I18n	    		
	    	}
	    	else{
	    		this.setData("maxlength", this.data.cxPropMaxlength+operatorLen);//No I18n
	    	}
    	}
    },
	seperatorClick:function(item){
		if(typeof item =="object"){
			item=item.currency1;
		}
		var neg_flag=false;
		if(item.indexOf('-')>-1){
			item=item.substring(0,item.indexOf('-'))+item.substring(item.indexOf('-')+1);
			neg_flag=true;
		}
		//extracting the numaric values and removing the non-numaric values and setting it to slider
		var numeric_val=item.match(/[0-9, ]+(\.[0-9]+)?/)[0].trim();
		if(neg_flag){
			numeric_val='-'+numeric_val;
		}
		let props = _cruxUtils._getProperty();
		if((props.currencyDetails || props.defaultOrgCurrencyDetails) && this.data.cxPropField.data_type==='currency'){
			var currencyCode = this.data.cxPropIsoCode;
			if(!currencyCode && this.data.cxPropCurrencyCode){
				currencyCode = this.data.cxPropCurrencyCode;
			}
			var d_sep=props.currencyDetails[currencyCode]?props.currencyDetails[currencyCode].format.split("|"):props.defaultOrgCurrencyDetails.format.split("|");
			 if((d_sep[1]=='.' && d_sep[0]==' ') || (d_sep[0]==' ' && d_sep[1]==',')){
				numeric_val=numeric_val.replace(/\s/g, '|').replace(/,/g, '.').replace(/\|/g, ',')
			}
			else{
				numeric_val=numeric_val.replace(/\./g, '|').replace(/,/g, d_sep[0]).replace(/\|/g, d_sep[1]);
			}
		}
		var val= parseFloat(numeric_val.replace(/[^\d.-]/g, '')).toString();
		if(this.$node.querySelector('lyte-number')){
			this.$node.querySelector('lyte-number').setData('ltPropValue',val)
		}else{
			this.$node.querySelector('lyte-input').setData('ltPropValue',val);
		}
		if(this.getMethods("onValueChange")){
			this.executeMethod("onValueChange", this.getValue(),this.$node);//No I18n
		}
		var slider=this.$node.querySelector("lyte-slider");
		slider.querySelector(".lyteHorizontal").blur();
		return false;
		},
		onMaskUnMaskIconClick:function(event){
			this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
			event.stopPropagation();
		},
		onKeyUpInputField:function(event){
			this.onKeyUpMaskField(event);
		},
		onMouseDownInputFiled:function(event){
			this.onMouseDownMaskField(event);
		}
	},
	setSliderTooltip:function(value,converted_value){
		var set_tooltip_val,props = _cruxUtils._getProperty();
		if(value && ( (props.currencyDetails && props.currencyDetails[this.data.cxPropIsoCode]) || props.defaultOrgCurrencyDetails)){
			if(value>this.data.cxPropMaxvalue){
				value=this.data.cxPropMaxvalue;
			}else if(value<this.data.cxPropMinvalue){
				value=this.data.cxPropMinvalue;
			}
			var currencyCode = props.baseCurrency ? props.baseCurrency : "";//no i18n
			set_tooltip_val=this.convertCurrencyValue(this.data.cxPropIsoCode,Number(value), this.data.cxPropDigits, this.data.cxPropCurrencyDetails, currencyCode);
		}else if(!value && converted_value){
			set_tooltip_val=converted_value;
		}
		if(set_tooltip_val){
			var index=set_tooltip_val.indexOf('(');
			if(index!=-1){
				set_tooltip_val=set_tooltip_val.substring(0,index)+'\n'+set_tooltip_val.substring(index);
			}
			var handler = this.$node.querySelector(".lyteSliderHandler"); 
			handler.setAttribute('lt-prop-tooltip-class','cxNumCompSliderTooltip');
			handler.setAttribute('lt-prop-title', set_tooltip_val);
			//below code is very imp for currency slider case do not remove it.
			if( handler.tooltip && handler.tooltip.refresh ){
				handler.tooltip.refresh( {}, handler.tooltip.tooltipSpan );
			} 
		
		}
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-number-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeCurrencyCode : function(){ 
		var field = this.getData("cxPropField"),props = _cruxUtils._getProperty();//No I18n
		if(!this.data.cxPropDisplayCurrency){
			return;
		}
		if(this.getData('cxPropIsCurrencyField') !== undefined){
			this.setData("currencyTypeField", this.getData('cxPropIsCurrencyField'));//No I18n
		}else if(field.data_type === "currency" || field.ui_type === 39 || field.ui_type === 143 || field.ui_type === 144 || field.ui_type === 145 || field.ui_type === 36 || field.ui_type === 77 || (field.data_type === 'formula' && field.formula.return_type === "currency") || (field.rollup_summary && field.rollup_summary.return_type === "currency") ){
			this.setData("currencyTypeField", true);//No I18n
		}
		if(this.getData("currencyTypeField")){
			//this.setData("cxPropMaxlength",16);//no i18n
			var currencyCode = this.data.cxPropIsoCode;
			if(!currencyCode && this.data.cxPropCurrencyCode){
				currencyCode = this.data.cxPropCurrencyCode;
			}
			if(currencyCode){
				var currencyDetails = this.getData("cxPropCurrencyDetails");//No I18n
				for(var key in currencyDetails){
					if(key == currencyCode){
						this.setData("currencySymbol", currencyDetails[key].symbol);
						let cxPropSymbolPrefix = currencyDetails[key] && 'isPrefix' in currencyDetails[key] ? currencyDetails[key].isPrefix : true;
						this.setData("cxPropSymbolPrefix", cxPropSymbolPrefix); //No I18n
						break;
					}
				}
			}
			else if(props.defaultOrgCurrencyDetails){
				this.setData("currencySymbol", props.defaultOrgCurrencyDetails.symbol);//No I18n
			}else if(props.defaultOrgCurrency){
				this.setData("currencySymbol", props.defaultOrgCurrency);//No I18n
			}
		}
		else{
			this.setData({currencySymbol : ""});//No I18n
		}
	}.observes("cxPropCurrencyDetails.*","cxPropCurrencyCode","cxPropIsoCode", "cxPropField", "cxPropField.data_type","cxPropCurrencyField").on("init"),//No I18n
	observeCurrencyLabel: function(){
			var cxPropFrom = this.getData("cxPropFrom")
			let currencylabel;
			if((cxPropFrom === 'filter' || cxPropFrom === 'create' || (cxPropFrom === 'criteria' && this.data.currencyTypeField)) && this.data.currencySymbol && !this.data.cxPropCurrencySymbolOnlyForSlider) {
				currencylabel =  this.data.currencySymbol;
			}
			this.setData("currencyLabel", currencylabel)
	}.observes('cxPropFrom','cxPropCurrencyCode','cxPropCurrencySymbolOnlyForSlider','currencySymbol','currencyTypeField').on("init"),
	observeValue : function(change){
		if(this.getData("cxPropFrom") == "view"){
				_cruxUtils.addMurhyInfo("crux-number-component.js", "Feb Default Changes");
				var value = this.getData("cxPropValue");//No I18n
				this.setData("value",this.getFormattedValue(value));//No I18n		
		}
		else if(!this.operationPerformed){
			_cruxUtils.addMurhyInfo("crux-number-component.js", "Feb Default Changes");
			this.setData('showResult',{});
			// this.setData('showResult',{});
			// this.data.showResult.value = this.data.cxPropValue;
		}
		if(this.$node.querySelector("lyte-slider") && this.data.cxPropField.data_type=="currency" && this.data.cxPropValue){
			this.setSliderTooltip(this.data.cxPropValue)
		}
		if(this.data.cxPropFrom == "create"){
			this.setData('formattedValue', this.getData('cxPropValue'));//No I18n
			//value will changed in calculate function, no need to format that
			if(!this.preventFormat){
				this.handleFormatNumber(change,this.data.cxPropValue);
			}
			this.setFocusUtil();
		}
	}.observes("cxPropValue", "cxPropFormattedCurrency", "cxPropFrom").on("init"),//No I18n
	handleFormatNumber: function(change,value){
		if(this.getData('cxPropFormatNumber') && this.data.cxPropField && this.data.cxPropField.display_format!=='slider' && (!change || change.item === 'cxPropValue')){
			let focused = this.$node.contains(document.activeElement);
			if(!focused && (!value || !Number.isNaN(Number.parseFloat(value)))){
				let formattedValue = this.getFormattedValue(value,false);
				//if the value is same as the unformatted value, we prevent the change callback

				if(this.getData('cxPropValue') === value && value===this.unformattedValue){
					this.preventChangeCallback = true;
				}
				this.unformattedValue = value;
				this.setData('formattedValue', formattedValue);//No I18n
			}
			else if(focused){
				if(this.getData('cxPropValue') === this.unformattedValue){
					this.preventChangeCallback = true;
				}
				this.setData('formattedValue', this.getData('cxPropValue'));//No I18n
			}
		}
	},
	getFormattedValue: function(value,displayCurrency = this.getData("cxPropDisplayCurrency")){
		if(value && value !== "null" && value !== "undefined"){
			var field = this.getData("cxPropField");//No I18n
			var dataType = field.data_type;
			if(dataType === "formula" || (field.formula && field.formula.return_type) || (field.dataparam && field.dataparam.return_type) || (field.rollup_summary && field.rollup_summary.return_type)){
				if((field.formula && field.formula.return_type === "currency") || (field.dataparam && field.dataparam.return_type === "currency") || (field.rollup_summary && field.rollup_summary.return_type === "currency")){
					dataType = "currency";//No i18n
				}
				else{
					dataType = "number";//No I18n
				}
			}
			return this.getNumberValueForView(value, dataType, this.getData("cxPropIsoCode"), field.ui_type, this.getData('cxPropCurrencyDetails'), field && (field.decimal_place !== undefined &&  field.decimal_place !== null )? field.decimal_place : this.getData('cxPropDefaultRoundOff'), this.getData('cxPropCurrencyCode'), this.getData("cxPropExchangeRate"), this.getData("cxPropExchangeRateFinance"), this.getData("cxPropHomeCurrency"), displayCurrency, this.getData("cxPropFormattedCurrency"), field.separator,this.getData('cxPropDefaultOrgCurrency'),field.currency ? field.currency.rounding_option:undefined,field.currency?field.currency.precision:undefined);
		}
		return "";
	},
	observeSliderRendering:function(){
		if(this.data.cxPropFrom == "create"){
			if(this.data.cxPropField.range){
				this.setData({'cxPropMaxvalue':this.data.cxPropField.range.to,'cxPropMinvalue':this.data.cxPropField.range.from});
			}
			if ((this.data.cxPropField.display_format=="slider" || this.data.cxPropField.range) && (this.data.cxPropField.data_type=="integer" || this.data.cxPropField.data_type=="bigint")){
				this.setData('cxPropDigits',0);
			}
			if (this.data.cxPropField.display_format==="slider" &&  this.data.cxPropField.decimal_place!==undefined && this.data.cxPropField.decimal_place!==null){
				this.setData("cxPropDigits",this.data.cxPropField.decimal_place)
			}
			if ( this.data.cxPropField.range ){
				var min=(Number(Math.round(this.data.cxPropField.range.from+'e'+this.data.cxPropDigits)+'e-'+this.data.cxPropDigits)).toString();
				var max=(Number(Math.round(this.data.cxPropField.range.to+'e'+this.data.cxPropDigits)+'e-'+this.data.cxPropDigits)).toString();
				this.setData({'cxPropSliderMinValue':min,'cxPropSliderMaxValue':max})
			}
			if (this.data.cxPropField.display_format=='slider' ){
				var split_val=this.data.cxPropField.display_format_properties.split;
				var from_Val=this.data.cxPropField.range.from;
				var to_val=this.data.cxPropField.range.to;
					var d=(to_val-(from_Val))/(split_val+1);
				this.setData('splitValue',d);
				this.setData("dataType",this.data.cxPropField.data_type);
				this.setData("displayFormat",this.data.cxPropField.display_format);
			}
		}		
	}.observes("cxPropFrom").on("init"),
	observeIsError: function () {
		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else if ( (this.getData("cxPropFrom") === "create" || this.getData("cxPropFrom") === "criteria") && (this.$node.querySelector("lyte-input") || this.$node.querySelector("lyte-number")) ) {
			const numberCompNode = $L(this.$node);

			if (this.getData("cxPropShowCalculator")) {
				const boxWrapperElem = numberCompNode.find(".cxBoxWithRightIcon");
				if (this.getData("isError")) {
					boxWrapperElem.addClass("cxErrorBoxWithRightIcon");
				} else {
					boxWrapperElem.removeClass("cxErrorBoxWithRightIcon");
				}
			} else {
				let numberInput = numberCompNode[0].querySelector("lyte-input") || numberCompNode[0].querySelector("lyte-number");
				numberInput = $L(numberInput);
				if (this.getData("isError")) {
					numberInput.addClass("cxErrorBox");
				} else {
					numberInput.removeClass("cxErrorBox");
				}
			}
		}

		// if(this.getData("cxPropFrom") == "create" && (this.$node.querySelector("lyte-input")|| this.$node.querySelector("lyte-number"))){
		//     var numberCompNode = $L(this.$node);
		//     if(this.getData('cxPropShowCalculator')) {
		//         var BoxWrapperElem = numberCompNode.find(".cxBoxWithRightIcon");
		//         if(this.getData("isError")){
		//             BoxWrapperElem.addClass("cxErrorBoxWithRightIcon");
		//         }
		//         else{
		//             BoxWrapperElem.removeClass("cxErrorBoxWithRightIcon");
		//         }
		//     }
		//     else {
		//         var numberInput = numberCompNode[0].querySelector("lyte-input") || numberCompNode[0].querySelector("lyte-number");
		// 		numberInput = $L(numberInput)
		//         if(this.getData("isError")){
		//             numberInput.addClass("cxErrorBox");
		//         }
		//         else{
		//             numberInput.removeClass("cxErrorBox");
		//         }
		//     }
		// }
	}.observes("isError","lyteViewPort").on("didConnect"), // No I18n
	observeResize:function(){
		var sliderElem = this.$node.querySelector('lyte-slider');
			if(sliderElem){
				var _this = this;
				var numberCompElem = this.$node.querySelector('.cxElementValue');
				this.sliderResizeObserver = new ResizeObserver(()=>{
					var width = numberCompElem.clientWidth - 20;
					var max_width= (width / 2);
					_this.setData({"maxWidthToSet":max_width+"px",'cxPropSliderWidth':`${width}px`});
					var slider_height=$L('.cxNumScaleLable',_this.$node)[0];
					if(slider_height){
						_this.setData('cxPropSliderHeight',slider_height.offsetHeight+slider_height.offsetTop+"px");
					}
					var {cxPropValue : value}=_this.data;
					if( sliderElem && (value===undefined || value===null || value==='')){
						sliderElem.ltProp('value',_this.data.cxPropMinvalue);
					}
					// slider_height?_this.setData('cxPropSliderHeight',slider_height.offsetHeight+slider_height.offsetTop+"px"):"";
				});
				this.sliderResizeObserver.observe(numberCompElem);
			}
	}.observes("cxPropField","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropShowCalculator","cxPropIsoCode").on("didConnect"),
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : this.$node.querySelector('lyte-number') ? "lyte-number" : "lyte-input");//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropShowCalculator", "cxPropPrefixYield").on("didConnect"),//No I18n
	observeCurrencyTypeField : function(){
		if(this.getData("currencyTypeField") && (this.data.currencySymbol || this.data.currencyLabel) && this.getData("cxPropAppearance") === "box" && (this.getData("cxPropFrom") === "create" || this.getData("cxPropFrom") === "criteria" || this.getData("cxPropFrom") === "filter")){
            var cruxNumNode = $L(this.$node);
            var numNodeInput = cruxNumNode.find("lyte-input") || cruxNumNode.find("lyte-number");
            if(numNodeInput.length > 0) {
				numNodeInput.addClass("cxBoxInputInsideLabel");//No I18n
			}
            else {
                var numNodeNumber = cruxNumNode.find("lyte-number");
                if(numNodeNumber.length > 0) {
                    numNodeNumber.addClass("cxBoxInputInsideLabel");//No I18n
                }
            }
		}
	}.observes("currencyTypeField","lyteViewPort", "cxPropFrom").on("didConnect"),//No I18n
	obseredidConnect : function(){
		if(this.getData("cxPropFrom") == "create" && (this.getData("cxPropShowCalculator") || this.getData("cxPropProcessNumber")) && !this.bindEvent && !this.data.lyteViewPort){
			var self = this;
			self.bindEvent = self.calculate.bind(self);
			(this.getData("cxPropProcessNumber") ? ["blur"] : ["keyup", "keypress", "blur"]).forEach(function(eve){//No I18n
				if(self.$node.querySelector("input")){
					self.$node.querySelector("input").addEventListener(eve, self.bindEvent);//No I18n
				}
				
			});
		}
		else if(this.data.cxPropFrom === "view"){
			delete this.bindEvent;
		}
		let props = _cruxUtils._getProperty();
		var currencyCode = props.baseCurrency ? props.baseCurrency : "";//no i18n
		if(this.data.cxPropFrom==="create" && this.data.cxPropField.data_type==='currency' && this.data.cxPropField.range && ( (props.currencyDetails && props.currencyDetails[this.data.cxPropIsoCode])|| props.defaultOrgCurrencyDetails)){
			var userValue=props.currencyDetails && props.currencyDetails[this.data.cxPropIsoCode]?Number(props.currencyDetails[this.data.cxPropIsoCode].er):props.defaultOrgCurrencyDetails.er?props.defaultOrgCurrencyDetails.er:1 ;
			/* eslint-disable-next-line eqeqeq */
			var from=this.data.cxPropField.range.from!=undefined ? Number(( this.data.cxPropField.range.from * userValue ).toFixed(this.data.cxPropDigits)) : undefined; 
			/* eslint-disable-next-line eqeqeq */
			var to=this.data.cxPropField.range.to!=undefined ? Number(( this.data.cxPropField.range.to * userValue ).toFixed(this.data.cxPropDigits)) : undefined;
			if(this.data.cxPropField.display_format=="slider"){
				var split=this.data.cxPropField.display_format_properties.split;
				var splivalue=(to-(from))/(split+1);
				var sliderNode=	this.$node.querySelector('lyte-slider');
				if(sliderNode){
					sliderNode.ltProp({'Min':"",'Max':""})
					this.setData('splitValue',"");
					sliderNode.ltProp({'Min':from,'Max':to})
					this.setData('splitValue',splivalue);
				}
			}
			this.setData({'cxPropMinvalue':from,'cxPropMaxvalue':to})
		}
		if(this.data.cxPropField.display_format=="slider" && this.data.cxPropField.range && this.data.cxPropFrom=="create"){
			var sliderElem = this.$node.querySelector('lyte-slider')
			var slider_val= sliderElem ? sliderElem.component.data.scaleVal:[];
			var tooltip_value;
			if(this.data.cxPropField.data_type=='currency'){
				var arr=[];
				for(var i=0;i<slider_val.length;i++){
					var dummy=this.convertCurrencyValue(this.data.cxPropIsoCode,(slider_val[i].match(/[-+]?\d+(\.\d+)?/g) || [])[0], this.data.cxPropDigits, this.data.cxPropCurrencyDetails, currencyCode);
					//spliting the parenthesis content, before parenthesis content and adding span tags to it.
					var match=dummy.match(/^(.*?)\(([^)]+)\)$/);
					if(match&& !this.data.cxPropSliderYield){
						dummy = { currency1:match[1] ,currency2: match[2] }
						this.setData('showCurConversion',true)
					}else{
						this.setData('showCurConversion',false)
					}
					arr[i] = dummy;
				}
				this.setData('sliderValues',arr);
				if(arr.length>0){
					tooltip_value=typeof arr[0]=='object'?arr[0].currency1+"("+arr[0].currency2+")":arr[0];
				}
				// if(sliderElem){
				// 	this.sliderHeightCal(sliderElem);
				// }
			}
			if(this.data.cxPropField.data_type!=="currency" && this.data.cxPropField.display_format=="slider"){
				var non_curr_val=slider_val.map(function(item){
					return (Number(Math.round(item+'e'+this.data.cxPropDigits)+'e-'+this.data.cxPropDigits)).toFixed(this.data.cxPropDigits).toString()
				}.bind(this))
				this.setData('nonCurrencySliderValues',non_curr_val);
			}
			if( sliderElem){
				sliderElem.ltProp('value',this.data.cxPropValue);
			}
			if(this.data.cxPropField.data_type==="currency" && sliderElem){
				this.setSliderTooltip(this.data.cxPropValue,tooltip_value);
			}
		}
	
	}.observes("lyteViewPort","cxPropIsoCode","cxPropField","cxPropFrom").on("didConnect"), //No I18n
	calculate : function(ev){
	    _cruxUtils.addMurhyInfo("crux-number-component.js", "Feb Default Changes");
		var input = this.$node.querySelector("input"),decimalPlace;//No I18n
		let props = _cruxUtils._getProperty();
		this.operationPerformed = true;
		if(ev.type == "keypress"){
			var selectedKey = [43, 45, 42, 47, 13, 40, 41, 46, 8, 9];
			var keyCode = ev.which ? ev.which : ev.keyCode;
			if(!(selectedKey.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57))){
				ev.preventDefault();
				return false;
			}
			if(keyCode == 13){
				Lyte.objectUtils(this.getData("showResult"), "add", "show", false);//No I18n
				this.$node.querySelector("lyte-input").classList.remove("cxCalcultorResult");//No I18n
				input.blur();
				ev.preventDefault();
				return false;
			}
		}
		else if(ev.type == "keyup"){
			var memberData = input.value;
			if(memberData.indexOf(",") == -1){
				if(memberData != "" && !memberData.match(/[a-z]/i)){
					var checkFirstletterVar = /^(\+|\*|\/)/;
					if(checkFirstletterVar.test(memberData)){
						memberData = memberData.substr(1);
					}
					var checkInput = /^((?!([+\-*/.]{2,})).)*$/;
					var checkInp = checkInput.test(memberData);
					var total = "";
					if(checkInp){
						var check = this.checkBrackets(memberData);//No I18n
						if(check == true){
							if(memberData.indexOf('()') == -1){
								var qest = this.checkCorrectInputEle(memberData);//No I18n
								if(qest){
									var dotCheck = this.checkDotCorrectInput(memberData);//No I18n
									if(dotCheck){
										var operator = ["+", "-", "*", "/", "."];
										var dataCheckLastElement = memberData.length-1;
										decimalPlace = this.data.cxPropField && this.data.cxPropField.hasOwnProperty('decimal_place') ? this.data.cxPropField.decimal_place 
															:props.currencyDetails &&props.currencyDetails[this.data.cxPropCurrencyCode] ?props.currencyDetails[this.data.cxPropCurrencyCode].decimals : 2;
										if(operator.indexOf(memberData[dataCheckLastElement]) == -1){
											memberData = this.clearLeadingZero(memberData);//No I18n
											if($L.evaluate){
												total = $L.evaluate(memberData);
											}else{
												total = (new Function('return '+memberData))();//eslint-disable-line no-new-func
											}
											if(total !==undefined && total%1 !== 0 && Number.isInteger(decimalPlace) && decimalPlace >= 0){
												total = Number(Math.round(total+'e'+decimalPlace)+'e-'+decimalPlace);//No I18n
											}
										}
										else{
											// var _orig = memberData;
											memberData = memberData.slice(0, -1);
											if(memberData != "."){
												memberData = this.clearLeadingZero(memberData);//No I18n
												if($L.evaluate){
													total = $L.evaluate(memberData);
												}else{
													total = (new Function('return '+memberData))();//eslint-disable-line no-new-func
												}
												if(total !== undefined && total%1 !== 0 && Number.isInteger(decimalPlace) && decimalPlace >= 0){
													total = Number(Math.round(total+'e'+decimalPlace)+'e-'+decimalPlace);//No I18n
												}
											}
											// memberData = _orig;
										}
									}
								}
							}
						}
					}
				}
			}
			if(total != undefined && total !== ""){
				var operatorLabelReg = /[+\-*/(]/;
				if(operatorLabelReg.test(memberData) == true && memberData != ("+" || "-" || "*" || "/" || ".") && memberData != ""){
					this.$node.querySelector("lyte-input").classList.add("cxCalcultorResult");//No I18n
					this.setData("showResult", {show : true, value : total, formula : memberData});//No I18n
				}
				else{
					this.setData("showResult", {show : false, formula : memberData, value : total})//No I18n
					this.$node.querySelector("lyte-input").classList.remove("cxCalcultorResult");//No I18n
				}
			}
			else{
				Lyte.objectUtils(this.getData("showResult"), "add", "show", false);//No I18n
				Lyte.objectUtils(this.getData("showResult"), "add", "formula", undefined);//No I18n
				if(memberData == ""){
					Lyte.objectUtils(this.data.showResult, "add", "value", "");//No I18n
				}
				// this.setData("showResult", {show : false, formula : undefined});//No I18n
				this.$node.querySelector("lyte-input").classList.remove("cxCalcultorResult");//No I18n
			}
		}
		else if(ev.type == "blur"){
			if(this.getData("cxPropProcessNumber")){
				decimalPlace = props.currencyDetails && props.currencyDetails[this.data.cxPropCurrencyCode] ? props.currencyDetails[this.data.cxPropCurrencyCode].decimals : this.data.cxPropField && this.data.cxPropField.hasOwnProperty('decimal_place') ? this.data.cxPropField.decimal_place : 2;
				var data = this.clearLeadingZero(input.value);//No I18n
				data = Number(Math.round(data+'e'+decimalPlace)+'e-'+decimalPlace);//No I18n
				if(data){
					this.preventFormat = true;
					this.setData("cxPropValue", data);//No I18n
					this.preventFormat = false;
				}

			}else{
				if(this.getData("showResult").value !== undefined && this.getData("showResult").value !== "" && this.getData('showResult').formula !== undefined ){
					this.preventFormat = true;
					this.setData("cxPropValue", this.getData("showResult").value);//No I18n
					this.preventFormat = false;
				}
				var popover = this.$node.querySelector('#cxCalcultorResultPopover');//No I18n
				popover && popover.ltProp('show',false);//No I18n
				this.$node.querySelector("lyte-input").classList.remove("cxCalcultorResult");//No I18n
				delete this.operationPerformed
			}
		}
	},
	didDestroy : function(){
		if(this.getData("cxPropFrom") == "create" && this.getData("cxPropShowCalculator")){
			var self = this;
			if( self.$node.querySelector("input") ){
				["keyup", "keypress", "blur"].forEach(function(eve){//No I18n
					self.$node.querySelector("input").removeEventListener(eve, self.bindEvent);//No I18n
				});
			}
		}
		this.sliderResizeObserver?this.sliderResizeObserver.disconnect():"";
	},
	observeFrom : function(){
		if(!this.getData("cxPropMaxlength")){
			if(this.getData("cxPropFrom") == "criteria" || this.getData("cxPropFrom") == "filter"){
				this.setData("cxPropMaxlength", 19);//No I18n
			}
			else{
				this.setData("cxPropMaxlength", undefined);//No I18n
			}
		}
		if(!this.data.cxPropDecimalAllowed){
			this.setData("cxPropRestrict", "\\.");
		}
		this.setData('showResult',{show : false});
	}.observes("cxPropFrom").on("init"),//No I18n
	observeMaxlength : function(){
		var max = this.data.cxPropMaxlength;
		if(this.data.cxPropValue && this.data.cxPropValue.indexOf(".") > -1 && this.data.cxPropType != "number"){
			max++;
		}
		this.setData("maxlength", max)//No I18n
	}.observes("cxPropMaxlength").on("init"),//No I18n
	observeClass : function(op){
		if(this.data.cxPropFrom != "view"){
			var ele = $L("lyte-number", this.$node);//No I18n
			if(!ele.length){
				ele = $L("lyte-input", this.$node);//No I18n
			}
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
	observeRender : function(a){
		this.componentRendered = true;
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * Triggered when an element has rendered in viewport
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } component
					 */
					this.executeMethod('onElementRendered',this.$node);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip();	
	}.observes("cxPropDisabled","cxPropTooltip").on("init"),
	clearLeadingZero : function(data){
		var reg = /(?:^|[^+])\b[\d.]+/gm;
		var test;
		while((test = reg.exec(data)) !== null) {
			test = test.toString();
		    if(test.indexOf('.') == -1 && test.match(/(^0{1,}(?!($|\.)))/g) != undefined) {
		    	data= data.replace(test, test.replace(/(^0{1,}(?!($|\.)))/g,''));
			}
		}
		return data;
	},
	mandatoryType : function(){
		this.observeMandatoryTypeMixin(this.$node.querySelector('lyte-number') ? "lyte-number" : "lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	checkDotCorrectInput : function(data){
		var dataSpl = data.split(/[+\-*/,]+/);
		var dataSplLength = dataSpl.length;
		for (var i = 0; i < dataSplLength; i++){
			var currLi = dataSpl[i].split('.');
			if(currLi.length > 2){
				return false;
			}
		}
		return true;
	},
	checkCorrectInputEle : function(data){
	  	var dataSplit = data.split('');
	  	var acceptVal = ["(", ")"];
	  	for(var i=0; i<dataSplit.length; i++){
	  		var $this = dataSplit[i];
	  		if(acceptVal.indexOf($this) != -1){
	  			var next = i+1;
				var numberReg = /\d/;
  				var prev = i-1;
	  			if($this == "("){
	  				if(dataSplit[prev] != undefined){
	  					if(numberReg.test(dataSplit[prev]) || dataSplit[prev] == ")" || dataSplit[prev] == "."){
	  						return false;
	  					}
	  				}
	  				if(dataSplit[next] != undefined){
	  					var rarecase = ["/", "*"];
	  					if(rarecase.indexOf(dataSplit[next]) != -1){
	  						return false;
	  					}
	  				}
	  			}
	  			else if($this == ")"){
	  				if(dataSplit[next] != undefined){
	  					if(numberReg.test(dataSplit[next]) || dataSplit[next] == "." || dataSplit[prev] == "("){
	  						return false;
	  					}
	  				}
	  				if(dataSplit[prev] != undefined){
	  					var leftPanel = ["+", "-", "*", "/"];
	  					if(leftPanel.indexOf(dataSplit[prev]) != -1 || dataSplit[prev] == "."){
	  						return false;
	  					}
	  				}
	  			}
	  		}
	  	}
	  	return true;
	  },
	  checkBrackets : function(str){
	  	var stack = [];
	  	for(var i in str){
	  		if(str[i] == '('){
	  			stack.push(str[i]);
	  		}
	  		else if(str[i] == ')'){
	  			if(stack.length){
		  			stack.pop();
	  			}
	  			else{
	  				return false;
	  			}
	  		}
	  	}
	  	if(stack.length){
	  		return false;
	  	}
	  	return true;
	  },
	  observeAndSetAria : function(){
		  if(this.data.cxPropAria){
			  this.ariaSetForView();
		  }
	  }.observes('cxPropAria').on('didConnect'),
	  observeMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeNoMaskPermission: function(){
		let profileId = this.getData('cxPropProfileId');
		if(this.data.cxPropMaskingProperties && Object.keys(this.data.cxPropMaskingProperties).length>0 && !this.data.cxPropMaskingProperties.profiles.some(profile => profile.id === profileId) && this.data.cxPropValue){
			this.setData('cxPropValue','********');
			if(this.getData('cxPropType')!=='view' && this.getData('cxPropShowCalculator')){
				this.setData('formattedValue','********');
			}
			_cruxUtils.addMurhyInfo("crux-number-component.js", "Feb Default Changes");
		}
	}.observes('cxPropFrom').on('init'),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init')
}, {mixins : ["crux-element-validation"]});//No I18n
Lyte.Component.registerHelper("sliderCurrencyShowTooltip", function(currency_type, val,curr1,curr2){
	if(curr1 && curr2){
		return curr1+"\n("+curr2+")";
	}
	if(val){
        if(currency_type && val.currency1 && val.currency2){
            return val.currency1+"\n("+val.currency2+")";
        }
        return val;
    }
});

