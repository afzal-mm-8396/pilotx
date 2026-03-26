/**
 * @component crux-text-component
 * @author anuja.manoharan
 * @version 1.0.0
 * Supports view, create and criteria/filter mode
 */
Lyte.Component.register("crux-text-component", {
_template:"<template tag-name=\"crux-text-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <span class=\"cxElemCompViewWrap\" onclick=\"{{action('viewClicked',event)}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropValue,'!')}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropEmptyValue}}\"><template case=\"true\"> {{cxPropEmptyValue}} </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropToggleMasking}}\"><template case=\"true\"> {{cruxMaskValue(cxPropValue,cxPropMaskingProperties,cxPropToggleMasking,expHandlers(cxPropField.data_type,'==','phone'))}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropTooltip}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-value=\"{{cxPropValue}}\" class=\"cxElemCompViewValue\"></lyte-text></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropUnescape}}\"><template case=\"true\"> {{unescape(cxPropValue)}} </template><template case=\"false\"> {{cxPropValue}} </template></template></template></template> <template is=\"if\" value=\"{{cxPropViewYieldSuffix}}\"><template case=\"true\"> <lyte-yield yield-name=\"viewYieldSuffix\" prop-field=\"{{cxPropField}}\" prop-value=\"{{cxPropValue}}\"></lyte-yield> </template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </span> <template is=\"if\" value=\"{{maskUnmaskPermission}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('onMaskUnMaskIconClick',event)}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(cxPropToggleMasking,true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </template><template case=\"criteria\"></template><template case=\"filter\"></template><template case=\"create\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFrom,'===',&quot;create&quot;),'&amp;&amp;',cxPropField[cxPropFieldKey])}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft bottomLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{unescape(cruxEncodeHTML(cxPropInfoTooltip))}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} {{if(cxPropExpandWidthOnChange,'cxTextCompExpandable','')}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <template is=\"if\" value=\"{{cxPropAutocompleteOptions.enable}}\"><template case=\"true\"> <div @class=\"cxLookupComponent cxTextAutoCompWrapper cxBoxWithRightIcon cxYieldObserverElemComp {{if(negate(cxPropDisplayIcon),'cxBoxWithoutRightIcon','')}} {{cxPropDivWrapperClass}} {{cxPropWrapperClass}}\"> <div class=\"cxBoxLeftContent\"> <template is=\"if\" value=\"{{expHandlers(cxPropPrefixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-autocomplete id=\"{{cxPropId}}\" class=\"{{if(showLoading,'cxLookupInputLoading','')}}\" lt-prop-input=\"{&quot;prefixYield&quot;:{{cxPropPrefixYield}}, &quot;suffixYield&quot;:{{cxPropSuffixYield}}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-external-search=\"{{cxPropAutocompleteOptions.externalSearch}}\" lt-prop-content=\"{{records}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-yield=\"{{cxPropAutocompleteOptions.yield}}\" lt-prop-dropdown-height=\"250px\" lt-prop-dropdown-class=\"cxLookupDropbox cxDropbox {{cxPropAutoCompleteWrapperClass}}\" lt-prop-min-length=\"{{cxPropAutocompleteOptions.minLength}}\" on-ext-search=\"{{method('onExtSearchAutoComp')}}\" on-search=\"{{method('onSearchAutoComp')}}\" on-select=\"{{method('onSelectAutoComp')}}\" on-scroll=\"{{method('onScrollAutoComp')}}\" on-before-show=\"{{method('onBeforeOpenAutoComp')}}\" on-blur=\"{{method('onBlurAutoComp')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" after-render=\"{{method('afterRenderAutocomplete')}}\" lt-prop-method=\"{{cxPropAutocompleteOptions.method}}\" lt-prop-label=\"{{cxPropAutocompleteOptions.displayField}}\" lt-prop-description=\"{{cxPropAutocompleteOptions.descriptionField}}\" lt-prop-value=\"{{cxPropValue}}\" lt-prop-class=\"{{cxPropInputClass}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\" onkeyup=\"{{action('clearSelection')}}\" lt-prop-open-on-focus=\"true\" lt-prop-password-icon=\"{{cxPropPasswordIcon}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-dropdown=\"{{cxPropDropdown}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-force-calculate-width=\"true\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownClose')}}\" lt-prop-aria=\"{{cxPropAria}}\" on-focus=\"{{method('onFieldFocus')}}\" onkeydown=\"{{action('onKeyDownInputField',event)}}\" onmousedown=\"{{action('onMouseDownClick',event)}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\"> <template is=\"registerYield\" yield-name=\"lyte-input-prefix\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> </template> <template is=\"yield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body class=\"cxVisibleLookup\" style=\"{{if(ifEquals(records.length,0),'display: none','')}}\"> <template is=\"for\" items=\"{{records}}\" item=\"val\" index=\"index\"> <lyte-drop-item data-value=\"{{val[cxPropAutocompleteOptions.idField]}}\" onmouseenter=\"{{action('showHideIcon1',true,val)}}\" onmouseleave=\"{{action('showHideIcon1',false,val)}}\"> <lyte-autocomplete-label> <lyte-text class=\"cxLookupDropboxLabel {{cxPropAutocompleteOptions.displayFieldClass}}\" lt-prop-value=\"{{val[cxPropAutocompleteOptions.displayField]}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropShowHideTooltip}}\"><template case=\"true\"> <span class=\"cxLookupInfoIcon {{if(val.cxPropShowIcon,'cruxLookupPopover')}}\" onmouseenter=\"{{action('infoPop',this,val,event)}}\" onmouseleave=\"{{action('infoPop',this,val,event)}}\" style=\"{{if(val.cxPropShowIcon,'visibility: visible;','visibility: hidden')}}\"></span> </template></template> </lyte-autocomplete-label> <template is=\"if\" value=\"{{cxPropAutocompleteOptions.descriptionField}}\"><template case=\"true\"><lyte-autocomplete-description> <span class=\"{{cxPropAutocompleteOptions.descriptionFieldClass}}\">{{val[cxPropAutocompleteOptions.descriptionField]}}</span> </lyte-autocomplete-description></template></template> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> <template is=\"registerYield\" yield-name=\"lyte-input-suffix\"> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </template> </lyte-autocomplete> <template is=\"if\" value=\"{{expHandlers(cxPropDisabled,'&amp;&amp;',cxPropShowDisabledIcon)}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"><div class=\"cxBoxSpinWrapper cxFlexCenter\"> <span class=\"cxElementsLoaderBg\"></span> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSuffixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </div> <template is=\"if\" value=\"{{cxPropDisplayIcon}}\"><template case=\"true\"> <div class=\"cxBoxRightIcon cxFlexCenter {{cxPropRightIconClass}}\" onclick=\"{{action('handleIconClick')}}\"> <div class=\"cP {{cxPropIconClass}}\"></div> </div> </template></template> </div> </template><template case=\"false\"> <div @class=\"cxYieldObserver {{if(cxPropDisplayIcon,'cxBoxWithRightIcon','')}} {{cxPropDivWrapperClass}} {{if(cxPropExpandWidthOnChange,'cxTextCompExpandable','')}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <lyte-input lt-prop-name=\"{{cxPropName}}\" id=\"{{cxPropId}}\" lt-prop-id=\"{{if(cxPropId,concat('cxInput_',cxPropId))}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" lt-prop-update-delay=\"{{defaultUndefined}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-class=\"cxBorderBottom {{cxPropInputClass}}\" class=\"cxW100Per {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" lt-prop-direction=\"{{cxPropDirection}}\" lt-prop-wrapper-style=\"{{cxPropWrapperStyle}}\" lt-prop-value=\"{{lbind(cxPropValue)}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" data-zcqa=\"{{cxPropZcqa}}\" on-value-change=\"{{method('inputValueChange')}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-focus=\"{{cxPropFocus}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" lt-prop-autocomplete=\"{{cxPropAutocomplete}}\" lt-prop-auto-update=\"{{cxPropEnableLbind}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}}\" onfocus=\"{{action('focusCallback',event)}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" on-blur=\"{{method('onBlurCallback')}}\" onkeydown=\"{{action('checkRegex',event)}}\" lt-prop-close-icon=\"{{cxPropCloseIcon}}\" lt-prop-width=\"{{if(cxPropExpandWidthOnChange,cxPropWidth,'')}}\" onkeyup=\"{{action('expandOnValue',event)}}\" on-clear=\"{{method('onCloseIconClick')}}\" lt-prop-password-icon=\"{{cxPropPasswordIcon}}\" lt-prop-focus-at-end=\"{{cxPropFocusAtEnd}}\" lt-prop=\"{{checkElementsData(this,childCompProps)}}\" onmousedown=\"{{action('onMouseDownClick',event)}}\" on-focus=\"{{method('onFieldFocus')}}\" onbeforeinput=\"{{action('preventUndoOnInput',event)}}\"></lyte-input> <template is=\"if\" value=\"{{expHandlers(cxPropDisabled,'&amp;&amp;',cxPropShowDisabledIcon)}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropDisplayIcon}}\"><template case=\"true\"> <div class=\"cxBoxRightIcon cxFlexCenter {{cxPropRightIconClass}}\" onclick=\"{{action('handleIconClick')}}\"> <div class=\"cP {{cxPropIconClass}}\"></div> </div> </template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> </template></template> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-text-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"criteria":{"dynamicNodes":[],"additional":{"next":"filter"}},"filter":{"dynamicNodes":[],"additional":{"next":"create"}},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"registerYield","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"registerYield","position":[1,1,3,3],"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"ifEquals","args":["records.length",0]}},"'display: none'","''"]}}}},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["val.cxPropShowIcon","'visibility: visible;'","'visibility: hidden'"]}}}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,1,3,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","cxPropFocus","cxPropAutofocus","lyteViewPort","cxPropValue","cxPropFrom","cxPropPlaceholder","cxPropField","cxPropMaxlength","cxPropDisabled","cxPropReadonly","cxPropWrapperStyle","cxPropClass","cxPropZcqa","cxPropIgnoreEmptyValue","cxPropAppearance","cxPropErrorMessage","cxPropDirection","cxPropFieldKey","cxPropId","cxPropName","cxPropClearErrorMessage","isError","cxPropTabIndex","cxPropTabindex","lyteUnbound","cxPropLabelClass","cxPropEmptyValue","cxPropTooltip","defaultUndefined","cxPropErrorYield","cxPropInfoTooltip","cxPropAutocomplete","cxPropEnableLbind","cxPropAria","cxPropAriaAttributes","cxPropMaskingProperties","cxPropTooltipConfig","cxPropTooltipClass","records","cxPropAutocompleteOptions","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropWrapperClass","cxPropAutoCompleteWrapperClass","cxPropInputClass","cxPropErrorSpanClass","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","tooltip","cxPropType","cxPropCallbackDelay","cxPropUpdateDelay","cxPropAutofocus","cxPropCloseIcon","cxPropButtonTextInsideElement","cxPropMandatory","cxPropDisplayIcon","cxPropRightIconClass","cxPropIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropShowHideTooltip","cxPropPreventFocusOnError","cxPropExpandWidthOnChange","cxPropWidth","cxPropMaxWords","cxPropPrefixYield","cxPropMetaMoreRecords","cxPropUnescape","cxPropPasswordIcon","cxPropButtonYield","cxPropFocusAtEnd","cxPropFocusAtEnd","cxPropAriaErrorProperties","showLoading","cxPropProfileId","maskUnmaskPermission","cxPropToggleMasking","cxPropShowMaskUnmaskIcon","cxPropAriaButton","cxPropAriaBody","cxPropAriaBox","ariaAttributes","cxPropDropdown","cxPropDivWrapperClass","cxPropSuffixYield","uiTypeMapping"],
_observedAttributesType :["object","object","boolean","boolean","boolean","boolean","string","string","string","object","number","boolean","boolean","string","string","string","boolean","string","string","string","string","string","string","boolean","boolean","string","string","boolean","string","string","string","string","boolean","string","string","boolean","boolean","object","object","string","string","array","object","string","string","string","string","string","string","string","string","boolean","boolean","string","string","string","number","number","boolean","boolean","string","boolean","boolean","string","string","string","object","string","string","string","boolean","string","boolean","boolean","boolean","string","number","boolean","string","boolean","boolean","boolean","boolean","boolean","object","boolean","string","boolean","boolean","boolean","object","object","object","object","object","string","boolean","object"],
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
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			cxPropFocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			cxPropAutofocus : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			/**
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to enable view port rendering
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets placeholder for input field
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropField : Lyte.attr("object", {default: {}}),//No I18n
			/**
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets maximum length for input field
			 */
			cxPropMaxlength : Lyte.attr("number"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * This property disables the input
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It makes the input field as readonly. 
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropWrapperStyle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It sets inline style for '.lyteField' div inside lyte-input
			 */
			cxPropWrapperStyle : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class added to lyte-input
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropIgnoreEmptyValue=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If set to true, mandatory validation will be ignored for empty value
			 */
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It defines the appearance of the lyte-input
			 */
			cxPropAppearance : Lyte.attr("string", {default : "flat"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set string to be displayed as error message below input
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropDirection
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It defines how label and input field placed
			 */
			cxPropDirection : Lyte.attr("string", {default : "vertical"}),//No I18n
			/**
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * The key that determines what will be displayed as field label
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Id set to the lyte-input
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * @componentProperty { string } cxPropName
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Name set to the lyte-input
			 */
			cxPropName: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to false to prevent error message from being cleared on value change
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { boolean } isError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabIndex : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * It sets tab index for input
			 */
			cxPropTabindex : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to the field label
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Value displayed when cxPropValue is empty
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}), //No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			/**
			 * @componentProperty { string } defaultUndefined
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			defaultUndefined : Lyte.attr("string"),//no i18n
			/**
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to render own error message below input
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Tooltip displayed on hover of info icon next to field label
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * @componentProperty { string } cxPropAutocomplete
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Enables native autocomplete property for input
			 */
			cxPropAutocomplete : Lyte.attr("string", {default : "on"}),//NO I18n
			/**
			 * @componentProperty { boolean } cxPropEnableLbind=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableLbind : Lyte.attr("boolean", {default : true}),//no i18n
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
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Configuratuon to be passed to lyte-tooltip
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class to be passed to lyte-tooltip
			 */
			cxPropTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } records
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			records : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { object } cxPropAutocompleteOptions
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutocompleteOptions : Lyte.attr("object", {default : {}, hideAttr : true}),//No I18n
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
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to error
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * It will be added to the wrapper div element over the input
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropInputClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAutoCompleteWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropAutoCompleteWrapperClass
			 * @author mahalakshmi.m
			 * @version 1.0.0
			 */
			cxPropInputClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to span of error message
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropLayout
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display info icon next to field label
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}) ,
			/**
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display custom disable icon
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class to be set to custom disable icon
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * @componentProperty { string } tooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @internal
			 */
			tooltip : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropType : Lyte.attr("string", {default : "text"}),
			/**
			 * @componentProperty { number } cxPropCallbackDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			/**
			 * @componentProperty { number } cxPropUpdateDelay
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callbackInput value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Sets autofocus value for input. Browser will focus input when entire page got loaded. 
			 */
			cxPropAutofocus : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropCloseIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * If its true close icon will be constructed. I
			 */
			cxPropCloseIcon : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropButtonTextInsideElement
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropButtonTextInsideElement : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to mark a field as manddatory
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * @componentProperty { boolean } cxPropDisplayIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display custom icon on right side of input
			 */
			cxPropDisplayIcon: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * 
			 */
			cxPropRightIconClass: Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to custom icon
			 */
			cxPropIconClass : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Warning message displayed below input
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			cxPropErrorIconClass : Lyte.attr('string'),
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to display warning message below input
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Class set to warning icon 
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropShowHideTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Pass as true to display info icon in autocomplete
			 */
			cxPropShowHideTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to prevent focus of input on error
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropExpandWidthOnChange=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * Set to true to expand width whenever value is added or collapse when value is removed
			 */
			cxPropExpandWidthOnChange : Lyte.attr("boolean", {default : false}),
			cxPropWidth : Lyte.attr("string"),
			cxPropMaxWords : Lyte.attr('number',{default : 50}),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropMetaMoreRecords : Lyte.attr("string", {default : "more_records"}),//No I18n
			cxPropUnescape : Lyte.attr("boolean"),
			cxPropPasswordIcon : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			cxPropFocusAtEnd : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropFocusAtEnd : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			showLoading : Lyte.attr("boolean", {default : false}),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			maskUnmaskPermission:Lyte.attr("boolean",{default:false}),
			cxPropToggleMasking:Lyte.attr("boolean",{default:false}),
			cxPropShowMaskUnmaskIcon:Lyte.attr("boolean",{default:true}),
			cxPropAriaButton : Lyte.attr("object", {default : {}}),//No I18n
			cxPropAriaBody : Lyte.attr("object", {default : {}}),//No I18n
			cxPropAriaBox : Lyte.attr("object", {default : {}}),//No I18n
			ariaAttributes : Lyte.attr('object', { default : {} }),
			cxPropDropdown : Lyte.attr('object', { default : {"forceCalculateWidth" : true} }),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			uiTypeMapping : Lyte.attr('object', {default : (typeof crmConstants !== "undefined" && crmConstants.defaultUiTypeToCruxMapping) ? crmConstants.defaultUiTypeToCruxMapping : {}})

		}
	},
	validate : function(){
		// var val = this.getData("cxPropValue");//No I18n
		var val = this.getValue();
		var field = this.getData("cxPropField");//No I18n
		if(this.getData("cxPropFrom") == "create"){
			return this.validateText(field, val);
		}
		if(this.getData("cxPropFrom") == "filter" && ( ( (!val || val.trim() == "") && !this.getData("cxPropIgnoreEmptyValue") ) || this.isEmoji(val) ) ){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			this.$node.querySelector("input").focus();//No I18n
			return false;
		}
		if(this.getData("cxPropFrom") === "criteria" && ((!val || val.trim() === "") && !this.getData("cxPropIgnoreEmptyValue")) ){
			this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
			return false;
		}
		if(val && val.replace(/^\s+/g,'').replace(/\s+$/g,'').indexOf("*") > -1){
			this.showAlert(_cruxUtils.getI18n("crm.alert.character.not.allowed", "*"));//No I18n
			this.$node.querySelector("input").focus();//No I18n
			return false;
		}
		return true;
	},
	getValue : function(selected){
		if((this.getData("cxPropFrom") == "criteria" || this.getData("cxPropFrom") == "filter") && this.getData("cxPropValue")){
			// var value = this.getData("cxPropValue");//No I18n
			return typeof(this.data.cxPropValue) == 'string' ? this.getData("cxPropValue").trim() : this.getData("cxPropValue");//No I18n);//No I18n
			// return value;//note : if customer does not want it to be separated by comma, they need to give backslash comma
		}
		if(this.data.cxPropFrom == "create" && this.data.cxPropAutocompleteOptions.enable && this.$node.querySelector("lyte-autocomplete")){
			var autoCompNode = this.$node.querySelector("lyte-autocomplete");
			return selected ? autoCompNode.ltProp(selected) :  autoCompNode.ltProp("value")//No I18n
			return this.$node.querySelector("lyte-autocomplete").ltProp("value")//No I18n
		}
		return typeof(this.data.cxPropValue) == 'string' ? this.getData("cxPropValue").trim() : this.getData("cxPropValue");//No I18n);//No I18n
	},
	resetData:function(){
		this.$node.querySelector('lyte-input').ltProp('value','')
	},
	methods : {
		inputValueChange : function(arg){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			//this.setData("cxPropValue", arg.newValue)//no i18n
			if(arg.newValue && (arg.newValue.split(",").length > this.data.cxPropMaxWords)){
				this.showAlert(_cruxUtils.getI18n("crm.alert.maximum.text.values.contains", this.data.cxPropMaxWords));//No I18n
				this.setData("cxPropValue", arg.oldValue);//No I18n
			}
			this.inFocus = true;
			if(this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", this.data.cxPropCallbackDelay == undefined ? arg.newValue : this.getValue());//No I18n
			}
			this.inFocus = false;
		},
    hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    },
    onExtSearchAutoComp : function(val, el, ev){
    	this.pageIndex = 1;
    	this.searchText = val.trim();
    	this.scrollEnd = false;
    	this.onscroll = false;
    	this.makeRequest();
    },
    onSearchAutoComp : function(result){
    	if(this.data.cxPropAutocompleteOptions.externalSearch){
	    	return false;
    	}
    	if(result.length == 0){
    		this.$node.querySelector("lyte-autocomplete").toggle()//No I18n
    	}
    },
    onSelectAutoComp : function(value , event , element){
    	if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.data.cxPropAutocompleteOptions.yield){
				for(var i=0; i<this.data.records.length; i++){
					if(this.data.records[i][this.data.cxPropAutocompleteOptions.idField] == value){
						this.setData("cxPropValue", this.data.records[i]	[this.data.cxPropAutocompleteOptions.displayField]);//No I18n
						if(this.getMethods("onValueChange")){
							this.executeMethod("onValueChange", this.data.records[i]);//No I18n
						}
						break;
					}
				}
			}
			else{
	    	this.setData("cxPropValue", value.name);//No I18n
	    	if(this.getMethods("onValueChange")){
	    		/**
	    		 * @method onValueChange
	    		 * @author anuja.manoharan
	    		 * @version 1.0.0
	    		 * @param { * } value
				 * This method is invoked whenever value changes in the input 
	    		 */
	    		this.executeMethod("onValueChange", value);//No I18n
	    	}
			}
			this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxBoxInputFocused");//No I18n
    },
    onScrollAutoComp : function(event){
    	if(this.scrollEnd || !this.data.cxPropAutocompleteOptions.externalSearch){
    		return;
    	}
    	var body = event.target;
			if(body.scrollHeight <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop))){
				this.pageIndex++;
	    	this.onscroll = true;
	    	this.makeRequest();
			}
    },
    onBeforeOpenAutoComp : function(){
    	if(!this.pageIndex && this.data.cxPropAutocompleteOptions.externalSearch){
    		this.pageIndex = 1;
    		this.searchText = this.data.cxPropValue ? this.data.cxPropValue : "";
    		return this.makeRequest();
    	}
    	else if(this.data.records === undefined || this.data.records.length === 0){
    		return false;
    	}
    },
		onBlurAutoComp : function(){
			this.setData("cxPropValue", this.$node.querySelector("input").value);//No I18n
			if(this.getMethods("onValueChange")){
    		this.executeMethod("onValueChange", this.$node.querySelector("input").value);//No I18n
    	}
    	if(this.getMethods("onBlur")){
				/**
				 * @method onBlur
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } element
				 * This method is called whenever input is blured
				 */
				this.executeMethod("onBlur", event, element);
			}
		},
		afterRenderAutocomplete : function(){
			if(  !this.$node.querySelector("lyte-input") ){
				return;
			}
			if(this.getData("cxPropAppearance") == "box"){
				this.$node.querySelector("lyte-input").classList.add("cxBoxInput");//No I18n
			}
			if(!this.data.cxPropAutocompleteOptions.yield){
				if(this.data.cxPropAutocompleteOptions.content.length && !this.data.cxPropAutocompleteOptions.content[0].name){
					for(var i=0; i<this.data.cxPropAutocompleteOptions.content.length; i++){
						this.data.cxPropAutocompleteOptions.content[i] = {name : this.data.cxPropAutocompleteOptions.content[i]};
					}
				}
				this.setData("records", this.data.cxPropAutocompleteOptions.content)//No I18n
			}
			if(!this.data.cxPropAutocompleteOptions.method){
				Lyte.objectUtils(this.data.cxPropAutocompleteOptions, "add", "method", "contains");//No I18n
			}
		},
		onBlurCallback : function(event, element){
			if(this.getMethods("onBlur")){
				/**
				 * @method onBlur
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } element
				 * This method is called whenever input is blured
				 */
				this.executeMethod("onBlur", event, element);
			}
		},
		onCloseIconClick : function(ev, ele){
			if(this.getMethods("onClear")){
				/**
				 * @method onClear
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } ev
				 * @param { * } ele
				 * This method is called whenever input is cleared via close icon
				 */
				this.executeMethod("onClear", ev, ele);
			}
		},
		onDropdownOpen : function(event, comp){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		onDropdownClose : function(event, comp){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', this, event, comp);
			}
		},
		onFieldFocus:function(event){
			this.onFocusMaskField(event);
		}
	},
	actions: {
		viewClicked : function(event){
			if(this.getMethods('onValueClicked')){
				this.executeMethod('onValueClicked',event,this);
			}
		},
    showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    infoPop : function(elem,val,event){
			var ele = document.getElementById("cruxLookupPopover");
			if(event.type == "mouseenter"){
				this.entered = true;
				if(!ele){
					ele = Lyte.Component.render("crux-lookup-popup", {id : "cruxLookupPopover", 
					fieldMapping : this.data.cxPropAutocompleteOptions && this.data.cxPropAutocompleteOptions.hasOwnProperty('fieldMapping') ? this.data.cxPropAutocompleteOptions.fieldMapping:this.getData('uiTypeMapping'),
					cxPropCallAllowed:false,cxPropDatetimeInUserPattern:false,cxPropDateInUserPattern:false,cxPropPhoneInUserFormat:false}, "body");
				}
				ele.setData({module : moduleRecordMapping[this.data.cxPropAutocompleteOptions.module], data : val,show : true})
			}
			else{
				this.entered = false;
				// elem.classList.remove("cruxLookupPopover");//no i18n
				ele.setData("show", false);//no i18n
			}
		},
		showHideIcon1 : function(show, record){
			if(!this.entered){
				Lyte.objectUtils(record, "add", "cxPropShowIcon", show);	//No I18n
			}
		},
		focusCallback : function(ev){
			if(this.getMethods("onFocus")){
				this.executeMethod("onFocus", ev, this.$node);//No I18n
			}
		},
		checkRegex : function(event){
			var ex = new RegExp(/^[a-zA-Z0-9_]*$/);
			if(this.cxPropType == "alphanumeric" && !ex.test(event.key)){
				event.preventDefault();
			}
			//on keydown of masked field
			this.onKeyDownMaskField(event);
		},
		handleIconClick : function(){
			if(this.getMethods("onRightIconClick")){
				/**
				 * @method onRightIconClick
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * Triggered when user clicks on icon on right of input
				 */
				this.executeMethod("onRightIconClick");
			}	
		},
		onFocusInput : function(onfocus){
			if (this.data.cxPropDisplayIcon || this.data.cxPropPrefixYield) {
				if(onfocus){
					this.$node.querySelector(".cxBoxWithRightIcon").classList.remove("cxBoxInputFocused");//No I18n
				}
				else{
					this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");		//No I18n
				}
			}
		},
		clearSelection : function(){
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			var val = this.$node.querySelector("input").value;
			if(!val && this.$node.querySelector("lyte-dropdown") && this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-drop-item[selected=true]")){ //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
				this.setData("cxPropValue", "");
				this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("lyte-drop-item[selected=true]").removeAttribute("selected");
				this.$node.querySelector("lyte-dropdown").close();
			}
		},
		expandOnValue : function(event){
			this.onKeyUpMaskField(event);
			if(!this.data.cxPropExpandWidthOnChange){
				return;
			}
			var inp = this.$node.querySelector("input");
			var scrollWidth = inp.scrollWidth;
			var parentWidth = this.$node.offsetWidth;
			if(event.keyCode === 46 || event.keyCode === 8){
				function measureMyInputText() {
			    var c = document.createElement("canvas");
			    var ctx = c.getContext("2d");
			    ctx.font = "1rem LatoRegular"
			    return ctx.measureText(inp.value).width;
				}
				var inputLen = measureMyInputText();
				console.log(inputLen, scrollWidth, parentWidth);
				var setWidth = inputLen+28;
				var minWidth = this.data.cxPropWidth.split("px")[0];
				if(setWidth > parentWidth){
					setWidth = parentWidth;
				}
				else if(setWidth < minWidth){
					setWidth = minWidth-2;
				}
				inp.style.width = (setWidth)+"px";
				this.$node.querySelector("lyte-input").style.width = (setWidth+2)+"px";

			}else{
				if(scrollWidth > parentWidth){
					scrollWidth = parentWidth;
				}
				inp.style.width = scrollWidth+"px";
				this.$node.querySelector("lyte-input").style.width = (scrollWidth+2)+"px";				
			}
		},
		onMaskUnMaskIconClick:function(event){
			this.setData("cxPropToggleMasking",!this.data.cxPropToggleMasking);
			event.stopPropagation();
		},
		onMouseDownClick:function(event){
			this.onMouseDownMaskField(event);
		},
		onKeyDownInputField:function(event){
			this.onKeyDownMaskField(event);
		},
		onKeyUpInputField:function(event){
			this.onKeyUpMaskField(event);
		}
  },
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-text-component", this.data.cxPropDisplayIcon);
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeIsError : function(){
		const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
		const lyteInput = this.$node.querySelector("lyte-input");

		if (this.data.cxPropPrefixYield && rightIconBox) {
			if (this.data.isError) {
				rightIconBox.classList.add("cxErrorBoxWithRightIcon");
			} else {
				rightIconBox.classList.remove("cxErrorBoxWithRightIcon");
			}
		} else if ((this.getData("cxPropFrom") === "create" || this.data.cxPropFrom === "criteria") && lyteInput) {
			if (this.getData("isError")) {
				lyteInput.classList.add("cxErrorBox"); // No I18n
			} else {
				lyteInput.classList.remove("cxErrorBox"); // No I18n
			}
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		// this.observeMandatoryMixin(this.data.cxPropAutocompleteOptions.enable ? ".cxLookupComponent" : "lyte-input");//No I18n
		this.observeMandatoryMixin(this.data.cxPropPrefixYield || this.data.cxPropAutocompleteOptions.enable ? ".cxBoxWithRightIcon" : "lyte-input");//No I18n
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
			this.setSelectUtil();
		}
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
	init : function(){
		if(this.data.cxPropFrom != "create"){
			this.data.cxPropAutocomplete = "off";//No I18n
		}
		this.cxPropType = undefined;
		if(this.data.cxPropType == "alphanumeric"){
			this.cxPropType = this.data.cxPropType;
			this.setData("cxPropType", "text");
		}

		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.pageIndex = undefined;
		this.convertLtPropJson();
	},
	makeRequest : function(){
		const _this = this;
		// var loadimg = this.$node.querySelector(".cxElementsLoaderBg");//No I18n
		// loadimg.style.display = "";
		_this.setData('showLoading',true);
		return this.executeMethod("fetchData", this.searchText, this.pageIndex, this.data.cxPropField).then(function(resp){ //No I18n
			if(!resp || resp.length == 0){
				this.scrollEnd = true;
				if(!this.onscroll){
					this.setData("records", []);//No I18n
				}
				resp = []
			}
			if(this.onscroll){
				Lyte.arrayUtils(this.data.records, "push", resp);//No I18n
			}
			else{
	  		this.setData("records", resp);				//No I18n
			}
  		// loadimg.style.display = "none";
			_this.setData('showLoading',false);
			if(this.data.cxPropValue && this.$node.querySelector("lyte-dropdown").component.childComp && this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("[data-value='"+this.data.cxPropValue+"']")){
				this.$node.querySelector("lyte-dropdown").component.childComp.querySelector("[data-value='"+this.data.cxPropValue+"']").setAttribute("selected", true)//No I18n
			}
			if(this.data.cxPropMetaMoreRecords && resp.$ && resp.$[this.data.cxPropMetaMoreRecords] === false){
				this.scrollEnd = true;
			}
			var node = this.$node.querySelector('lyte-autocomplete').querySelector('lyte-dropdown');
			if(this.data.records.length === 0){
				node.close();
			}else{
				node.open();
				node.resetPosition();
			}
  	}.bind(this), function(){
  		// loadimg.style.display = "none";
		_this.setData('showLoading',false);
  	});
	},
	ele : "lyte-input",//No I18n
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
			var inp =  ele.find("input")[0];
			if(this.data.cxPropExpandWidthOnChange &&inp.scrollWidth > inp.offsetWidth){ //eslint-disable-line @zoho/webperf/layout-thrashing
				var width = inp.scrollWidth;//eslint-disable-line @zoho/webperf/layout-thrashing
				if(width > this.$node.offsetWidth){ //eslint-disable-line @zoho/webperf/layout-thrashing
					width = this.$node.offsetWidth-2;//eslint-disable-line @zoho/webperf/layout-thrashing
				}
				inp.style.width = width+"px";
				ele[0].style.width = (width+2)+"px";
			}
		}
	}.observes("cxPropClass", "lyteViewPort").on("didConnect"),//No I18n
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 * Triggered after an element has been rendered in viewport
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observeDisabled : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip", "cxPropDisabled").on("init"),
	mandatoryType : function(){
		this.observeMandatoryTypeMixin(this.data.cxPropAutocompleteOptions.enable ? ".cxLookupComponent" : "lyte-input");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeMaskPermissionField : function(change){
		this.executeMaskingPermissionFn(change);
	}.observes('cxPropFrom',"lyteViewPort","cxPropValue").on("init"),
	observeMaskingProperty: function(){
		this.clientScriptMasking(); //no need to observe for field masking
	}.observes('cxPropMaskingProperties').on('init'),
	observeAndSetAriaAttributes : function(){
		if(this.data.cxPropAria && !this.flag){
			this.flag = true;
			if(this.data.cxPropDropdown){
				if(this.data.cxPropDropdown.cxPropAriaButton){
					this.setData('cxPropAriaButton', this.data.cxPropDropdown.cxPropAriaButton);
				}
				if(this.data.cxPropDropdown.cxPropAriaBody){
					this.setData('cxPropAriaBody', this.data.cxPropDropdown.cxPropAriaBody);
				}
				if(this.data.cxPropDropdown.cxPropAriaBox){
					this.setData('cxPropAriaBox', this.data.cxPropDropdown.cxPropAriaBox);
				}
			}
			var cxField = this.data.cxPropField;
			var cxFieldKey = this.data.cxPropFieldKey;
			var ariaAttr = this.ariaGetMergedAttributes();
			if ((this.data.cxPropAutocompleteOptions.enable) && !(ariaAttr && ariaAttr.cxAriaButton && ariaAttr.cxAriaButton['aria-label']) && (cxField && cxFieldKey && cxField[cxFieldKey])) {
				if (ariaAttr && !ariaAttr.cxAriaButton) {
					ariaAttr.cxAriaButton = {};
				}
				ariaAttr.cxAriaButton['aria-label'] = cxField[cxFieldKey];
				this.setData('ariaAttributes', ariaAttr);
				/* sets aria attributes to dropdown */
				var dropdownData = this.data.cxPropDropdown;
				Lyte.objectUtils( dropdownData , "add" , "ariaButton" , ariaAttr.cxAriaButton );
				Lyte.objectUtils( dropdownData , "add" , "ariaBox" , ariaAttr.cxAriaBox );
				Lyte.objectUtils( dropdownData , "add" , "ariaBody" , ariaAttr.cxAriaBody );
				this.setData('cxPropDropdown', dropdownData);
			}else if(!(ariaAttr && ariaAttr.cxAriaAttributes && ariaAttr.cxAriaAttributes['aria-label']) && (cxField && cxFieldKey && cxField[cxFieldKey])) {
				if (ariaAttr && !ariaAttr.cxAriaAttributes) {
					ariaAttr.cxAriaAttributes = {};
				}
				ariaAttr.cxAriaAttributes['aria-label'] = cxField[cxFieldKey];
				this.setData('ariaAttributes', ariaAttr);
			}
			this.flag = false;
		}
	}.observes('cxPropAria', 'cxPropAriaButton', 'cxPropAriaBox', 'cxPropAriaBody', 'cxPropAriaAttributes', 'cxPropDropdown').on('didConnect')
}, {mixins : ["crux-element-validation","crux-filter-utils"]});//No I18n
/**
 * @syntax nonYielded
 * <crux-text-compoent  cx-prop-from="create" cx-prop-field='{"id":"1234567890","field_label":"Name 1"}' cx-prop-field-key='field_label'></crux-text-compoent>
 */
