/**
 * @component crux-file-upload-component
 * @author manikaraja.p
 * @version 1.0.0
 * @summary Elements support for file upload. We have single, multiple and also local type file upload support.
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-file-upload-component", {
_template:"<template tag-name=\"crux-file-upload-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <div class=\"cxFileUploadContainer cxFileUploadViewContainer\" data-zcqa=\"{{cxPropZcqa}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropFiles[0]}}\"><template case=\"true\"><ul class=\"cxFileUplCompViewListWrap\"> <template id=\"\" class=\"\" items=\"{{cxPropFiles}}\" item=\"value\" index=\"index\" is=\"for\"> <li onclick=\"{{action('openPreview',value)}} \" class=\"cxFileList\" data-zcqa=\"file_preview_{{index}}\"> <span class=\"cxFileUploadDetail {{if(expHandlers(cxPropEllipsis,'!'),'cxFileUpdCompWrappedNameDiv','')}}\"> <span class=\"cxFileUploadTypeIconWrap cxFlexCenter\"> <span class=\"cxFileUploadType cxFileUploadSprite cxFileUpCompIcon_allfile cxFileUploadIcon_{{value.fileType}}\"></span> </span> <template is=\"if\" value=\"{{minifiedSize}}\"><template case=\"true\"> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{concat(value.cxFileName,value.cxExtn,' - ',lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits))}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{value.cxFileName}}{{value.cxExtn}}<span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits)}})</span> </template> </lyte-text> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropEllipsis}}\"><template case=\"true\"><div lt-prop-title=\"{{value.fileName}}\" class=\"cxFlexCenter cxOH\"> <lyte-text class=\"cxFileUploadName\" lt-prop-show=\"false\" lt-prop-value=\"{{value.cxFileName}}\"></lyte-text> <span class=\"cxFileUploadExtn\">{{value.cxExtn}}</span> </div></template><template case=\"false\"><div class=\"cxFileUpdCompWrappedName\">{{value.fileName}}<template is=\"if\" value=\"{{value.size}}\"><template case=\"true\"><span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits)}})</span></template></template></div></template></template> <template is=\"if\" value=\"{{if(expHandlers(value.size,'&amp;&amp;',cxPropEllipsis),true,false)}}\"><template case=\"true\"><span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits)}})</span></template></template> </template></template> <template is=\"if\" value=\"{{value[cxPropDownloadUrlKey]}}\"><template case=\"true\"><a target=\"_blank\" href=\"{{value[cxPropDownloadUrlKey]}}\" rel=\"noopener noreferrer\" class=\"cxFlex cxFileUpdCompActionIconWrap cxFileUpCompDownloadIconWrap cxFileDownloadButton cxDownload\" data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{ariaAttributes.cxAriaDownloadIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <span class=\"cxFileDownloadButtonIcon cxDownload\" data-zcqa=\"file_download_{{index}}\"></span> </a></template></template> </span> </li> </template> </ul></template><template case=\"false\"><div class=\"viewEmptyValue\">{{cxPropEmptyValue}}</div></template></template> </div> </template><template case=\"edit\"></template><template case=\"create\"> <div lt-prop-title=\"{{if(cxPropReadonly,tooltipMsg,'')}}\" class=\"cxFileUploadCreateWrap {{if(cxPropReadonly,'lyteInputReadonly cxFileUpCompReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} {{cxPropDivWrapperClass}} {{cxPropClass}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'===','single')}}\"><template case=\"true\"> <div tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" @class=\"cxSFileUpCompElem cxYieldObserverElemComp {{if(isError,'cxSFileUpCompErrorElem','')}}\" onclick=\"{{action('localUploadElemClick')}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropFiles[0]}}\"><template case=\"true\"><div class=\"cxSFileUpCompNameWrapper\"> <span class=\"cxSFileUploadTypeIconWrap cxFlexCenter\"> <span class=\"cxFileUploadType cxFileUploadSprite cxFileUpCompIcon_allfile cxFileUploadIcon_{{cxPropFiles[0].fileType}}\"></span> </span> <div class=\"cxSFileUpName\"> <div lt-prop-title=\"{{cxPropFiles[0].fileName}}\" class=\"cxFlexCenter cxSFileUpNameWithExtn\"> <lyte-text class=\"cxFileUploadName\" lt-prop-show=\"false\" lt-prop-value=\"{{cxPropFiles[0].cxFileName}}\"></lyte-text> <span class=\"cxFileUploadExtn\">{{cxPropFiles[0].cxExtn}}</span> </div> <template is=\"if\" value=\"{{if(cxPropFiles[0].size,true,false)}}\"><template case=\"true\"><span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(cxPropFiles[0].size,cxPropFileUnit,cxPropDigits)}})</span></template></template> </div> <template is=\"if\" value=\"{{cruxAnd(cxPropFiles[0],negate(cxPropDisabled),negate(cxPropReadonly))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ifEquals(cxPropFiles[0].status,'uploading')}}\"><template case=\"true\"> <lyte-progressbar lt-prop=\"{&quot;type&quot;:&quot;circle&quot;,&quot;stroke&quot;:&quot;3&quot;,&quot;radius&quot;:&quot;8&quot; , &quot;showPercentage&quot; : false ,&quot;progressProperty&quot; : {&quot;value&quot;: &quot;{{cxPropFiles[0].percentage}}&quot;}}\" lt-prop-stroke=\"5\" lt-prop-progress-fill-color=\"{{cxPropProgressFillColor}}\"> </lyte-progressbar> </template><template case=\"false\"> <span class=\"cxRemoveFile cxSFileRemoveIconWrap\" data-zcqa=\"file_remove\" lt-prop-title=\"{{ariaAttributes.cxAriaRemoveIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <span class=\"cxRemoveFile cxSFileRemoveIcon\"></span> </span> <template is=\"if\" value=\"{{cruxAnd(cxPropFiles[0].cxNewFile,ifEquals(cxPropFiles[0].status,'success'))}}\"><template case=\"true\"><span class=\"cxFileUploadCompStatusIcon cxFileUploadTickIcon\"></span></template></template> </template></template> </template></template> </div></template><template case=\"false\"><div class=\"cxSFileUpPlaceholder cxOpenUpload\" data-zcqa=\"{{cxPropZcqa}}\">{{cxPropPlaceholder}}</div></template></template> <template is=\"if\" value=\"{{cxPropShowUploadIcon}}\"><template case=\"true\"><span class=\"cxSFileUploadIconWrap cxOpenUpload {{if(cruxAnd(cxPropFiles[0],negate(cxPropAllowReplace)),'cxDisabledLink','')}}\" data-zcqa=\"{{cxPropZcqa}}\" data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{ariaAttributes.cxAriaUploadIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <span class=\"{{if(cxPropShowDisabledIcon,'',if(cxPropRightIconClass,cxPropRightIconClass,'cxSFileUploadIcon'))}} cxOpenUpload \"></span> </span></template></template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{ifEquals(cxPropOptionsType,'local')}}\"><template case=\"true\"> <div tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" @class=\"cxSFileUpCompElem cxYieldObserverElemComp {{cxPropButtonClass}} {{if(disableBtn,'cxFileUpCompReadOnly','')}}\" onclick=\"{{action('localUploadElemClick')}}\" lt-prop-title=\"{{if(tooltipMsg,tooltipMsg,'')}}\" data-tabindex=\"{{cxPropDataTabindex}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <div class=\"cxSFileUpPlaceholder cxOpenUpload\" data-zcqa=\"{{cxPropZcqa}}\">{{cxPropPlaceholder}}</div> <span class=\"cxSFileUploadIconWrap cxOpenUpload cxFileUpCompIcon\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-title=\"{{ariaAttributes.cxAriaUploadIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\"> <span class=\" {{if(cxPropShowDisabledIcon,'',if(cxPropRightIconClass,cxPropRightIconClass,'cxSFileUploadIcon'))}} cxOpenUpload \"></span> </span> </div> </template><template case=\"false\"> <lyte-button lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" @class=\"cxFileUploadButton cxYieldObserverElemComp {{cxPropButtonClass}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" id=\"{{cxPropId}}\" lt-prop-name=\"{{cxPropName}}\" lt-prop-aria-button=\"{{cxPropAria}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-class=\"{{cxPropInnerButtonClass}}\" lt-prop-disabled=\"{{disableBtn}}\" lt-prop-title=\"{{if(tooltipMsg,tooltipMsg,'')}}\" lt-prop-appearance=\"secondary\" onclick=\"{{action('fileUploadBtnClick')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <div class=\"cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <span class=\"cxSelectButtonText cxFileUpCompPlaceholder\">{{cxPropPlaceholder}}</span> <template is=\"if\" value=\"{{negate(cxPropShowDisabledIcon)}}\"><template case=\"true\"><lyte-icon class=\"{{cxPropRightIconClass}}\"></lyte-icon></template></template> </div> </template> </lyte-button> </template></template> </template></template> <template is=\"if\" value=\"{{cruxOr(ifEquals(cxPropOptionsType,'local'),ifEquals(cxPropType,'single'))}}\"><template case=\"true\"> <lyte-fileupload lt-prop-allow-replace=\"{{cxPropAllowReplace}}\" lt-prop-trigger-upload=\"{{lbind(cxPropTriggerUpload)}}\" lt-prop-multiple=\"{{negate(ifEquals(cxPropType,'single'))}}\" queue-list=\"{{lbind(fileList)}}\" lt-prop=\"{{cruxStringify(cxPropUploadProp)}}\" on-before-remove=\"{{method('onBeforeRemoveFile')}}\" on-before-add=\"{{method('onBeforeAddFile')}}\" on-add=\"{{method('onAddFileFn')}}\" on-success=\"{{method('successFile')}}\" on-reject=\"{{method('onFileReject')}}\" after-render=\"{{method('afterRenderUpload')}}\" on-remove=\"{{method('onRemoveFile')}}\" on-failure=\"{{method('onFailureFile')}}\" on-request-success=\"{{method('onRequestSuccessFn')}}\" on-request-failure=\"{{method('onRequestFailureFn')}}\" on-file-success=\"{{method('onFileSuccessFn')}}\" on-file-failure=\"{{method('onFileFailureFn')}}\" on-progress=\"{{method('onProgressFn')}}\" on-before-send=\"{{method('onBeforeSendFn')}}\" on-send=\"{{method('onSendFn')}}\" on-before-open=\"{{method('onBeforeOpenFn')}}\" on-retry=\"{{method('onRetryFn')}}\" on-select=\"{{method('onSelectFn')}}\" on-validation-end=\"{{method('onValidationEndFn')}}\" style=\"display: none;\"> {{addMurhyInfo(\"crux-file-upload-component.html\",\"Feb Default Changes\")}} </lyte-fileupload> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropShowDisabledIcon,'&amp;&amp;',cxPropDisabled)}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-file-upload-component.html\",\"Feb Default Changes\")}} <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'===','multiple')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ifEquals(cxPropOptionsType,'menu')}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-class=\"cxFileMenuWrapper\" lt-prop-wrapper-class=\"{{cxPropMenuWrapperClass}}\" on-menu-click=\"{{method('onMenuItemClick')}}\" lt-prop-query=\"#{{cxPropId}}\" lt-prop-freeze=\"false\" on-before-open=\"{{method('onMenuBeforeOpen')}}\" on-open=\"{{method('onMenuOpen')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropOptions}}\" item=\"value\" index=\"key\"> <lyte-menu-item data-value=\"{{value.system_value}}\" class=\"cxFileMenuItem\" data-zcqa=\"upload_drive_{{value.system_value}}\"> <lyte-menu-label> <template is=\"if\" value=\"{{if(value.cxIconHTML,true,false)}}\"><template case=\"true\"><div class=\"cxFileUploadDriveLogos\">{{unescape(value.cxIconHTML)}}</div></template><template case=\"false\"><template is=\"if\" value=\"{{if(value.cxIconUrl,true,false)}}\"><template case=\"true\"><img class=\"cxFileUploadDriveLogos\" src=\"{{if(value.cxIconUrl,value.cxIconUrl)}}\"></template><template case=\"false\"><span class=\"cxFileUploadDriveLogos {{value.cx_icon_class}}\"></span></template></template></template></template> {{value.display_value}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(cxPropOptionsType,'modal')}}\"><template case=\"true\"> <crux-file-upload-modal cx-prop-show=\"{{lbind(showOptions)}}\" on-remove-file-from-selected=\"{{method('onRemoveFileFromSelectedCB')}}\" fetch-content=\"{{method('fetchContentCB')}}\" on-upload=\"{{method('onUploadCB')}}\" cx-prop-options=\"{{cxPropOptions}}\" cx-prop-file-unique-selector=\"{{cxPropFileUniqueSelector}}\" cx-prop-file-limit=\"{{cxPropFileLimit}}\" on-modal-close=\"{{method('onModalCloseCB')}}\" on-modal-show=\"{{method('onModalShowCB')}}\" before-close-modal=\"{{method('beforeCloseModalCB')}}\" before-show-modal=\"{{method('beforeShowModalCB')}}\"></crux-file-upload-modal> </template></template></template></template> <template is=\"if\" value=\"{{if(cxPropFiles.length,true,false)}}\"><template case=\"true\"> <div class=\"cxFileUploadContainer\"> <ul role=\"list\"> <template class=\"\" items=\"{{cxPropFiles}}\" item=\"value\" index=\"index\" is=\"for\"> <li onclick=\"{{action('openPreview',value)}}\" class=\"cxFileList\" data-zcqa=\"file_preview_{{index}}\" id=\"{{if(value[cxPropFileUniqueSelector],value[cxPropFileUniqueSelector],value.cxFileName)}}\" data-tabindex=\"{{cxPropDataTabindex}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" role=\"listitem\"> <span class=\"cxFileUploadDetail\"> <span class=\"cxFileUploadTypeIconWrap cxFlexCenter\"> <span class=\"cxFileUploadType cxFileUploadSprite cxFileUpCompIcon_allfile cxFileUploadIcon_{{value.fileType}}\"></span> </span> <template is=\"if\" value=\"{{minifiedSize}}\"><template case=\"true\"> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{concat(value.cxFileName,value.cxExtn,' - ',lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits))}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> {{value.cxFileName}}{{value.cxExtn}}<span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits)}})</span> </template> </lyte-text> </template><template case=\"false\"> <div lt-prop-title=\"{{value.fileName}}\" class=\"cxFlexCenter cxOH\"> <lyte-text class=\"cxFileUploadName\" lt-prop-show=\"false\" lt-prop-value=\"{{value.cxFileName}}\"></lyte-text> <span class=\"cxFileUploadExtn\">{{value.cxExtn}}</span> </div> <template is=\"if\" value=\"{{if(value.size,true,false)}}\"><template case=\"true\"><span class=\"cxFileUploadSize\">&nbsp;-&nbsp;({{lyteUiFileSize(value.size,cxPropFileUnit,cxPropDigits)}})</span></template></template> </template></template> <template is=\"if\" value=\"{{value[cxPropDownloadUrlKey]}}\"><template case=\"true\"><a href=\"{{value[cxPropDownloadUrlKey]}}\" target=\"_blank\" data-zcqa=\"file_download_{{index}}\" rel=\"noopener noreferrer\" class=\"cxFlex cxFileUpdCompActionIconWrap cxFileUpCompDownloadIconWrap cxFileDownloadButton cxDownload\" data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{ariaAttributes.cxAriaDownloadIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <span class=\"cxFileDownloadButtonIcon cxDownload\"></span> </a></template></template> </span> <template is=\"if\" value=\"{{cruxAnd(negate(cxPropDisabled),negate(cxPropReadonly))}}\"><template case=\"true\"><span class=\"cxFileUploadStatus\"> <template is=\"if\" value=\"{{ifEquals(value.status,'uploading')}}\"><template case=\"true\"> <lyte-progressbar lt-prop=\"{&quot;type&quot;:&quot;circle&quot;,&quot;stroke&quot;:&quot;3&quot;,&quot;radius&quot;:&quot;8&quot; , &quot;showPercentage&quot; : false ,&quot;progressProperty&quot; : {&quot;value&quot;: &quot;{{value.percentage}}&quot;}}\" lt-prop-stroke=\"5\" lt-prop-progress-fill-color=\"{{cxPropProgressFillColor}}\"> </lyte-progressbar> </template><template case=\"false\"> <span class=\"cxFileUpdCompActionIconWrap cxRemoveFile cxDIB cxVam\" data-zcqa=\"file_remove_{{index}}\" onclick=\"{{action('removeFile',value,index)}}\" data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-title=\"{{ariaAttributes.cxAriaRemoveIcon['aria-label']}} {{cruxGetI18n('crm.label.file.lowercase')}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\"> <span class=\"cxFileUploadRemoveIcon cxRemoveFile\"></span> </span> <template is=\"if\" value=\"{{value.cxNewFile}}\"><template case=\"true\"><span class=\"{{if(ifEquals(value.status,'error'),'cxFileUploadWarningIcon','cxFileUploadTickIcon')}}\"></span></template></template> </template></template> </span></template></template> </li> </template> </ul> </div> </template></template> </template></template> <template is=\"if\" value=\"{{isError}}\"><template id=\"\" case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[2]},{"type":"text","position":[4,1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"text","position":[0,3,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]},{"type":"attr","position":[0,2]},{"type":"if","position":[0,2],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},"edit":{"dynamicNodes":[],"additional":{"next":"create"}},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"attr","position":[0,3,1]},{"type":"attr","position":[0,3,1,1]},{"type":"componentDynamic","position":[0,3,1,1]},{"type":"text","position":[0,3,1,3,0]},{"type":"attr","position":[0,3,3]},{"type":"if","position":[0,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"trans":true},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,0]},{"type":"text","position":[3,2,0]}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"if","position":[1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[2]},{"type":"text","position":[4,1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropAutofocus","cxPropFiles","cxPropValue","cxPropType","cxPropOptionsType","cxPropField","cxPropFrom","cxPropOptions","cxPropFileLimit","cxPropFileUniqueSelector","showOptions","disableBtn","tooltipMsg","cxPropId","cxPropFileUnit","cxPropDigits","isError","cxPropErrorMessage","cxPropErrorYield","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorClass","cxPropErrorSpanClass","cxPropClass","cxPropZcqa","cxPropClearErrorMessage","cxPropDisabled","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropReadonly","cxPropFieldKey","cxPropInfoTooltip","cxPropName","cxPropTabindex","cxPropTabIndex","lyteViewPort","cxPropPlaceholder","cxPropDownloadUrlKey","cxPropPreviewUrlKey","cxPropButtonClass","cxPropMandatory","cxPropShowWarning","cxPropWarningMessage","cxPropWarningIconClass","cxPropUploadProp","cxPropEmptyValue","cxPropRightIconClass","cxPropEllipsis","minifiedSize","cxPropInnerButtonClass","cxPropPrefixYield","cxPropHideIconAfterUpload","cxPropMenuWrapperClass","cxPropTriggerUpload","cxPropMandatoryOption","cxPropMandatoryType","fileList","cxPropAriaErrorProperties","cxPropProgressFillColor","cxPropAria","cxPropAriaAttributes","cxPropAllowReplace","cxPropShowUploadIcon","ariaAttributes","cxPropProgressFillColor","cxPropDivWrapperClass","cxPropSuffixYield","cxPropButtonYield"],
_observedAttributesType :["object","object","boolean","array","array","string","string","object","string","array","number","string","boolean","boolean","string","string","string","number","boolean","string","boolean","string","string","string","string","string","string","boolean","boolean","boolean","string","boolean","string","string","string","string","string","boolean","string","string","string","string","boolean","boolean","string","string","object","string","string","boolean","boolean","string","boolean","boolean","string","boolean","object","string","array","object","string","boolean","object","boolean","boolean","object","string","string","boolean","boolean"],

	data : function(){
	    _cruxUtils.addMurhyInfo("crux-file-upload-component.js", "Feb Default Changes");
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
			 * Sets autofocus value for Button. Browser will focus button when entire page got loaded.
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author manikaraja.p
			 */
			cxPropAutofocus 		: Lyte.attr( 'boolean', {'default': false } ),//No I18n
			cxPropFiles 			: Lyte.attr("array",{"default" : []}), //NO I18n
			/**
			 * Existing file value should pass using this property.
			 * @componentProperty { array } cxPropValue
			 * @author manikaraja.p
			 */
			cxPropValue				: Lyte.attr("array",{"default" : []}), //NO I18n
			/**
			 * We have a two types of file list support single and multiple.
			 * @componentProperty { string } cxPropType="multiple"
			 * @author manikaraja.p
			 */
			cxPropType				: Lyte.attr("string",{"default" : "multiple"}), //NO I18n
			/**
			 * We have a three types of upload support in our component. (menu/modal/local)
			 * @componentProperty { string } cxPropOptionsType="menu"
			 * @author manikaraja.p
			 */
			cxPropOptionsType		: Lyte.attr("string",{"default" : "menu"}), //NO I18n
			/**
			 * The field details that would contain info like field label, mandatory etc.
			 * @componentProperty { object } cxPropField
			 * @author manikaraja.p
			 */
			cxPropField       		: Lyte.attr("object",{"default" : {}}), //NO I18n
			/**
			 * To determine what the element has to be displayed or where it is to be used
			 * @componentProperty { string } cxPropFrom
			 * @author manikaraja.p
			 */
			cxPropFrom				: Lyte.attr("string",{"default" : "view"}), //NO I18n
			/**
			 * It will be used for menu options.
			 * @componentProperty { array } cxPropOptions
			 * @author manikaraja.p
			 */
			cxPropOptions			: Lyte.attr("array",{"default" : []}), //NO I18n
			/**
			 * It's used to handle the number of files allowed in this component.
			 * @componentProperty { number } cxPropFileLimit
			 * @author manikaraja.p
			 */
			cxPropFileLimit			: Lyte.attr("number"), //NO I18n
			/**
			 * Unique selector of file object.
			 * @componentProperty { string } cxPropFileUniqueSelector="id"
			 * @author manikaraja.p
			 */
			cxPropFileUniqueSelector: Lyte.attr("string" , {"default" : 'id'}), //NO I18n
			showOptions				: Lyte.attr("boolean",{"default" : false}), //NO I18n
			disableBtn  			: Lyte.attr("boolean",{"default" : false}), //NO I18n
			tooltipMsg 				: Lyte.attr("string",{"default" : ""}), //NO I18n
			/**
			 * Id set to lyte-button
			 * @componentProperty { string } cxPropId
			 * @author manikaraja.p
			 */
			cxPropId				: Lyte.attr("string",{"default" : "cxFileUploadBtn"}), //NO I18n
			/**
			 * Based on the size units will be created if units are not provided. Use lyteUiFileSize( currentSize, unit, digits ) helper for returning correct file size
			 * @componentProperty { string } cxPropFileUnit
			 * @author manikaraja.p
			 */
			cxPropFileUnit			: Lyte.attr("string",{"default" : ""}), //NO I18n
			/**
			 * lyteUiFileSize helper return file size with given digits accuracy after decimal point
			 * @componentProperty { number } cxPropDigits
			 * @author manikaraja.p
			 */
			cxPropDigits			: Lyte.attr("number",{"default" : 0}), //NO I18n
			isError					: Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * Message displayed below wrapper div on error
			 * @componentProperty { string } cxPropErrorMessage
			 * @author manikaraja.p
			 */
			cxPropErrorMessage		: Lyte.attr("string" ,{"default" : ""} ), //NO I18n
			/**
			 * Set to true to render custom error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author manikaraja.p
			 */
			cxPropErrorYield  		: Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * Prefix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author manikaraja.p
			 */
			cxPropErrorZcqaPrefix 	: Lyte.attr("string" , {default : ""}), //NO I18n
			/**
			 * Suffix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author manikaraja.p
			 */
			cxPropErrorZcqaSuffix 	: Lyte.attr("string" , {default : "Error"}), //NO I18n
			/**
			 * Class set to error message
			 * @componentProperty { string } cxPropErrorClass
			 * @author manikaraja.p
			 */
			cxPropErrorClass		: Lyte.attr("string"), //NO I18n
			/**
			 * Class set to span of error message
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author manikaraja.p
			 */
			cxPropErrorSpanClass  	: Lyte.attr("string"), //NO I18n
			/**
			 * Class set to overall wrapper
			 * @componentProperty { string } cxPropClass
			 * @author manikaraja.p
			 */
			cxPropClass				: Lyte.attr("string"), //NO I18n
			/**
			 * Zcqa set to lyte-button
			 * @componentProperty { string } cxPropZcqa
			 * @author manikaraja.p
			 */
			cxPropZcqa				: Lyte.attr("string"), //NO I18n
			/**
			 * Set to false to prevent clearing of error message on change of value
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author manikaraja.p
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * This property disables the input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author manikaraja.p
			 */
			cxPropDisabled			: Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * Set to true to render custom disable icon
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author manikaraja.p
			 */
			cxPropShowDisabledIcon 	: Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class set to custom disable icon
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author manikaraja.p
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * It makes the button field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author manikaraja.p
			 */
			cxPropReadonly			: Lyte.attr("boolean",{"default" : false}), //NO I18n
			// showTooltip				: Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * The selector which determines which key holds the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author manikaraja.p
			 */
			cxPropFieldKey			: Lyte.attr("string"), //NO I18n
			/**
			 * The info message displayed on hover of the info icon next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author manikaraja.p
			 */
			cxPropInfoTooltip 		: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Name set to lyte-button
			 * @componentProperty { string } cxPropName
			 * @author manikaraja.p
			 */
			cxPropName				: Lyte.attr("string"), //NO I18n
			/**
			 * It sets tab index for button
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 */
			cxPropTabindex			: Lyte.attr("string"), //NO I18n
			/**
			 * It sets tab index for button
			 * @componentProperty { string } cxPropTabIndex
			 * @author manikaraja.p
			 */
			cxPropTabIndex			: Lyte.attr("string"), //NO I18n
			/**
			 * Set to true to render component on viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author manikaraja.p
			 */
			lyteViewPort			: Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 *  Sets placeholder for button field
			 * @componentProperty { string } cxPropPlaceholder
			 * @author manikaraja.p
			 */
			cxPropPlaceholder 		: Lyte.attr("string" , {default : _cruxUtils.getI18n("crm.staticresources.file.choose")}), //NO I18n
			/**
			 * If you pass the download key and the url for the corressponding key name. We'll enable the download option
			 * @componentProperty { string } cxPropDownloadUrlKey
			 * @author manikaraja.p
			 */
			cxPropDownloadUrlKey 	: Lyte.attr("string" , {default : "download_Url"}), //NO I18n
			/**
			 * If you pass the preview key and the url for the corressponding key name. We'll enable the preview option.
			 * @componentProperty { string } cxPropPreviewUrlKey
			 * @author manikaraja.p
			 */
			cxPropPreviewUrlKey	 	: Lyte.attr("string" , {default : "preview_Url"}), //NO I18n
			/**
			 * This class added for button.
			 * @componentProperty { string } cxPropButtonClass
			 * @author manikaraja.p
			 */
			cxPropButtonClass	 	: Lyte.attr("string", {default :""}),//No I18n
			/**
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author manikaraja.p
			 */
			cxPropMandatory 		: Lyte.attr("boolean"),
			/**
			 * Set to true to display warning message below element
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author manikaraja.p
			 */
			cxPropShowWarning 		: Lyte.attr("boolean", {default : false}),
			/**
			 *  Warning message displayed below element
			 * @componentProperty { string } cxPropWarningMessage
			 * @author manikaraja.p
			 */
			cxPropWarningMessage 	: Lyte.attr("string"),
			/**
			 * Class set to warning message icon
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author manikaraja.p
			 */
			cxPropWarningIconClass 	: Lyte.attr("string"),
			/**
			 * This properties applied for lyte-fileupload. It will used for cxPropOptionsType as local.
			 * @componentProperty { object } cxPropUploadProp
			 * @author manikaraja.p
			 */
			cxPropUploadProp	   	: Lyte.attr("object" , {default : {}}), //NO I18n
			/**
			 * This value is rendered when cxPropValue is empty in the view type.
			 * @componentProperty { string } cxPropEmptyValue
			 * @author manikaraja.p
			 */
			cxPropEmptyValue	   	: Lyte.attr("string" , {default : ""}), //NO I18n
			/**
			 * This will be added for right side icon.
			 * @componentProperty { string } cxPropRightIconClass
			 * @author manikaraja.p
			 */
			cxPropRightIconClass 	: Lyte.attr("string"), //NO I18n
			/**
			 * If its true, We'll show the three dots and while div size exceeds.
			 * @componentProperty { boolean } cxPropEllipsis=false
			 * @author manikaraja.p
			 */
			cxPropEllipsis			: Lyte.attr("boolean", {default : true}),  //NO I18n
			minifiedSize			: Lyte.attr("boolean", {default : false}),  //NO I18n
			/**
			 * This class will be added for lt-prop-class of button.
			 * @componentProperty { string } cxPropInnerButtonClass
			 * @author manikaraja.p
			 */
			cxPropInnerButtonClass	: Lyte.attr("string"), //NO I18n

			cxPropPrefixYield  		: Lyte.attr("boolean",{"default" : false}), //NO I18n
			/**
			 * If its true, We'll hide the right side icon after upload the file. It is used for local type.
			 * @componentProperty { boolean } cxPropHideIconAfterUpload=false
			 * @author manikaraja.p
			 */
			cxPropHideIconAfterUpload : Lyte.attr("boolean", {default : false}),  //NO I18n
			/**
			 * Added for menu wrapper while optionsType is menu.
			 * @componentProperty { string } cxPropMenuWrapperClass
			 * @author manikaraja.p
			 */
			cxPropMenuWrapperClass	: Lyte.attr("string"), //NO I18n
			/**
			 * Queued files will be uploaded when it set to true when OptionsType as single/local.
			 * @componentProperty { string } cxPropTriggerUpload
			 * @author manikaraja.p
			 */
            
			cxPropTriggerUpload	:  Lyte.attr("boolean", {default : false}),  //NO I18n
            /**
			 * @componentProperty { object } cxPropMandatoryOption
			 * @author mariswaran.sv
			 */
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			/**
			 * @componentProperty { string } cxPropMandatoryType
			 * @author mariswaran.sv
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			fileList				: Lyte.attr("array" ,{default : []} ), //NO I18n
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			/**
			 * Progress icon color
			 * @componentProperty { object } cxPropProgressFillColor="#338CF0"
			 * @author manikaraja.p
			 */
			cxPropProgressFillColor : Lyte.attr("string", {default : "#338CF0"}),
			 /**
			  * To set custom aria attributes
			  * @componentProperty { boolean } cxPropAria=false
			  * @author mariswaran.sv
			  * @version 1.0.0
			  */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * custom aria attributes
			 * @componentProperty { object } cxPropAriaAttributes
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropAriaAttributes : Lyte.attr("object", {default : {}}),//No I18n
			cxPropAllowReplace	: Lyte.attr("boolean", { default: true }),
			cxPropShowUploadIcon : Lyte.attr("boolean", { default: true }),
			ariaAttributes : Lyte.attr('object', { default : {} }),
			/**
			 * Progress icon color
			 * @componentProperty { object } cxPropProgressFillColor="#338CF0"
			 * @author manikaraja.p
			 */
			cxPropProgressFillColor : Lyte.attr("string", {default : "#338CF0"}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropButtonYield: Lyte.attr("boolean", { default: false })
		}
	},
	init : function(){
		var limit = this.data.cxPropFileLimit, val = this.data.cxPropValue;
		this.readOnlyTooltip = _cruxUtils.getI18n( "crm.lable.read.only");
		this.limitReachTooltip = _cruxUtils.getI18n( "crm.fileuploader.message.maxfilesexceeded",limit );
		if(this.data.cxPropReadonly){
			this.setData('tooltipMsg' , this.readOnlyTooltip);
		}else if( limit && val && val.length >= limit ){
			this.setData('tooltipMsg' , this.limitReachTooltip);
		}
		if(this.data.cxPropRightIconClass === undefined && this.data.cxPropType === "multiple" && !this.data.cxPropShowDisabledIcon){
			this.data.cxPropRightIconClass = this.data.cxPropOptionsType === 'menu' ? "dropdown" : "";
		}
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
	},
	didConnect : function(){
		if((this.data.cxPropType === "single" || this.data.cxPropOptionsType === "local") && this.data.cxPropFrom !== 'view'){
			this.fileUpload = $L('lyte-fileupload' , this.$node)[0];
			var fileElem = $L('.cxSFileUpCompElem' , this.$node)[0];
			if(fileElem){
				fileElem.addEventListener('focusin' , function(){
					event.target.classList.add("cxFileCompFocus");
				});
				fileElem.addEventListener('focusout' , function(){
					event.target.classList.remove("cxFileCompFocus");
				})
			}
		}
		if(this.data.cxPropType === "multiple"){		
			this.resizeFn();
			this.resize = this.resizeFn.bind(this);
			window.addEventListener('resize', this.resize, true);
		}
	},
	didDestroy : function(){
		if(this.data.cxPropType === "single" && this.data.cxPropFrom !== 'view'){
			delete this.fileUpload;
		}
		if(this.data.cxPropType === "multiple"){
			window.removeEventListener('resize', this.resize, true);
		}
	},
	resizeFn : function(){
		var className = this.data.cxPropFrom == 'view' ? '.cxFileList' : ".cxFileUploadButton";
		var _self = this ,  listElem;
		$L.fastdom.measure(()=> {
			listElem = $L(className, _self.$node)[0];
			if(listElem){
				if(listElem.offsetWidth <= 230 ){
					_self.setData('minifiedSize', true);
				}else{
					_self.setData('minifiedSize', false);
				}
			}
		});

	},
	getFiles : function(){
		return this.data.cxPropFiles;
	},
	getValue : function(){
		var files = this.data.cxPropFiles;
		if(this.data.cxPropType === "single"){
			return files[0];
		}else{
			var len = files.length , newArr = [];
			for(var i =0 ; i < len ; i++){
				if(files[i].cxNewFile && files[i].encryptedUploadId){
					newArr.push({'file_id' : files[i].encryptedUploadId}); //NO I18n
				}
			}
			if(this.removedFiles && this.removedFiles.length){
				newArr = this.removedFiles.concat(newArr);
			}
			return newArr;
		}
	},
	setFiles : function(files){
		var files = Array.isArray(files) ? files : [files];
		if(this.data.cxPropReadonly){
			return;
		}
		if(this.data.cxPropType === "single"){
			if(files.length === 1){
				var file = files[0], cxFiles = this.data.cxPropFiles;
				file.cxNewFile = true;
				this.setBaseName(file);
				if(cxFiles.length){
					Lyte.arrayUtils(cxFiles , 'replaceAt' , 0 , file); //NO I18n
				}else{
					Lyte.arrayUtils(cxFiles , 'push' , file); //NO I18n
				}
			}else{
				return false;
			}

		}else{
			var limit = this.data.cxPropFileLimit;
			if(limit && this.data.cxPropFiles.length >= limit){
				return;
			}
			for(var i = 0 ; i < files.length ; i++){
				var cxLen = this.data.cxPropFiles.length;
				files[i].cxNewFile = true;
				this.setBaseName(files[i]);
				if(limit){
					if(cxLen + 1 >= limit){
						this.setData('disableBtn', true); //NO I18n
						this.setData('tooltipMsg' , this.limitReachTooltip); //NO I18n
						Lyte.arrayUtils(this.data.cxPropFiles , 'push' , files[i]); //NO I18n
						break;
					}else{
						this.setData({'disableBtn' : false ,'tooltipMsg' : "" });//NO I18n
					}
				}
				Lyte.arrayUtils(this.data.cxPropFiles , 'push' , files[i]); //NO I18n
			}
		}
		if(this.data.cxPropClearErrorMessage){
			this.setData("cxPropErrorMessage", "");//No i18n
		}
	},
	removeFiles : function(files){
		if(!Array.isArray(files)){
			files = [files];
		}
		var len = files.length , id , uS = this.data.cxPropFileUniqueSelector ;
		var cxFiles = this.data.cxPropFiles;
		for(var i = 0 ; i < len ; i++){
			id = files[i][uS] || files[i];
			var ind = cxFiles.findIndex(x => x[uS] === id);
			if(ind !== -1){
				this.removeTheFile(cxFiles[ind] , ind);
			}
		}
	},
	setBaseName : function(file){
		file.fileName = file.fileName || file.file_Name;    //API Format handling
		file.size = file.size || file.original_Size_Byte;
		var name = file.fileName , ind = name.lastIndexOf(".");
		if(ind !== -1 && ind !== 0){
			file.cxExtn = name.substring(ind);
			file.cxFileName = name.substring(0 , ind);
		}else{
			file.cxFileName = name;
		}
		if(!file.fileType){
			file.fileType = this.getFileType(name);
		}
	},
	validate : function(){
		var validate = true , fileLimit = this.data.cxPropFileLimit , files = this.data.cxPropFiles , field = this.data.cxPropField;
		if(files.length === 0){
			validate = this.validateMandatory(true);
			if(validate === false){
				this.$node.focus();
			}
		}else if(fileLimit){
			if(files.length > fileLimit){
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.file.upload.maxlength.exceeds", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.field_label)));//No I18n
				validate = false;
			}
		}
		if(validate){
			this.setData("cxPropErrorMessage", "");//No I18n
		}
		return validate;
	},
	observeCxFiles : function(){
		var limit= this.data.cxPropFileLimit , cxValue = this.data.cxPropValue ? this.data.cxPropValue : [] , len = cxValue.length;
		if(this.data.cxPropClearErrorMessage){
			this.setData("cxPropErrorMessage", "");//No i18n
		}
		if(limit && !this.data.cxPropReadonly){
			if(len >= limit){
				this.setData({'disableBtn' : true ,'tooltipMsg' : this.limitReachTooltip });//NO I18n
			}else{
				this.setData({'disableBtn' : false ,'tooltipMsg' : "" });//NO I18n
			}
		}
		this.initialCxValue = $L.extend(true , [] , cxValue);
		for(var i = 0 ; i < len ; i++){
			this.setBaseName(cxValue[i]); //for ellipsis split
		}
		this.removedFiles = [];
		this.setData('cxPropFiles' , $L.extend(true , [] , cxValue));//NO I18n
	}.observes('cxPropValue' , 'cxPropFrom').on('init'), //NO I18n
	observeReadOnly : function(){
		if(this.data.cxPropReadonly){
			this.setData('tooltipMsg' , this.readOnlyTooltip);
		}else if(this.data.tooltipMsg !== this.limitReachTooltip){
			this.setData('tooltipMsg' , "");
		}
	}.observes('cxPropReadonly').on('didConnect'), //NO I18n
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-file-upload-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeMandatory : function(){
		var className = (this.data.cxPropType === "single" || this.data.cxPropOptionsType === "local") ? '.cxSFileUpCompElem' : '.cxFileUploadButton' ;
		this.observeMandatoryMixin(className);//No I18n
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield").on("didConnect"),//No I18n
    mandatoryType : function(){
        var className = (this.data.cxPropType === "single" || this.data.cxPropOptionsType === "local") ? '.cxSFileUpCompElem' : '.cxFileUploadButton' ;
		this.observeMandatoryTypeMixin(className);//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observesdidConnect : function(){
		this.$node.focus = this.focus.bind(this);
		if(!this.data.lyteViewPort){
			if(this.getMethods('onElementRendered')){
				/**
				 * It will trigger after rendered the component.
				 * @method onElementRendered
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } this
				 */
				this.executeMethod('onElementRendered',this);
			}
		}
  	}.observes("lyteViewPort").on("didConnect"),//No I18n
	focus : function(){
		if(this.$node.querySelector("lyte-button")){
			this.$node.querySelector("lyte-button").focus();//No I18n
		}else if(this.$node){
			HTMLElement.prototype.focus.call(this.$node); //Because if i call this.$node.focus(), it's calling recursively. Why because we have overridden the focus method in the above function.
		}
	},
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
		var elem = $L('.cxFileUploadCreateWrap', this.$node)[0];
		if(elem){
			if(this.data.isError){
				$L('.cxFileUploadCreateWrap', this.$node)[0].classList.add('cxError');//No I18n
			}else{
				$L('.cxFileUploadCreateWrap', this.$node)[0].classList.remove('cxError');//No I18n
			}
		}
	}.observes("cxPropErrorMessage", "lyteViewPort").on("init"),//No I18n
	downloadAttachment : function(file){
		var a = document.createElement("a");
		a.style = "display: none";
		// this.$node.appendChild(a);
		document.body.appendChild(a); //eslint-disable-line @zoho/zstandard/no-body-events
		a.href = file[this.data.cxPropDownloadUrlKey];
		a.download = file.fileName;
		a.click();
		a.remove();
	},
	actions : {
		fileUploadBtnClick : function(){
			if(this.data.cxPropOptionsType === "menu"){
				return;
			}
			this.setData('showOptions' , true); //NO I18n
		},
		removeFile : function(file , index){
			this.removeTheFile(file , index);
		},
		showInfoTooltip: function(origElem) {
			this.showHideInfoTooltip(origElem);
		},
		openPreview : function(value){
			if(event.target.classList.contains("cxDownload") || event.target.classList.contains("cxRemoveFile")){
				 event.stopPropagation();
				return;
			}
			if((value.fileType == 'link' || value.fileType == 'png' || value[this.data.cxPropPreviewUrlKey]) && (value.fileType != 'mp3' && value.fileType != 'movie' && value.fileType != 'file' && value.fileType != 'zip')){
				if(this.getMethods('showPreview')){
					/**
					 * It will trigger while click the file in the list for preview.
					 * @method showPreview
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } value
					 */
					this.executeMethod('showPreview',value); //NO I18n
				}
			}else{
				this.downloadAttachment(value);
				event.stopPropagation();
			}
		},
		localUploadElemClick : function(){
			var classList = event.target.classList , file , cxFiles = this.data.cxPropFiles , bool;
			if(classList.contains('cxOpenUpload')){
				if(this.getMethods('showUploadModal')){
					/**
					 * It will trigger while show the upload modal to select the file.
					 * @method showUploadModal
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('showUploadModal' , this); //NO I18n
				}else if(cxFiles.length === 0 || (cxFiles.length === 1 && this.data.cxPropAllowReplace)){ 
					this.fileUpload.querySelector("lyte-file-select-area").click();
				}
			}else if(classList.contains('cxRemoveFile')){
				file = this.data.cxPropFiles[0];
				if(this.getMethods('onBeforeRemove')){
					/**
					 * It will trigger before remove the file from the list.
					 * @method onBeforeRemove
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } file
					 */
					bool = this.executeMethod('onBeforeRemove',this.data.fileList , file); //NO I18n
					if(bool === false){
						return false;
					}
				}
				if(this.getMethods('onBeforeRemoveFile')){
					bool = this.executeMethod('onBeforeRemoveFile',this.data.fileList , file); //NO I18n
					if(bool === false){
						return false;
					}
				}
				file = Lyte.arrayUtils(this.data.cxPropFiles , 'removeAt' , 0 , 1);
				if(this.fileUpload){
					this.fileUpload.removeUpload(this.data.fileList[0].id);
					this.setData("cxPropErrorMessage", "");
				}
				if(this.getMethods("onRemove")){
					/**
					 * It will trigger after removed the file.
					 * @method onRemove
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } file
					 * @param { * } this
					 */
					return this.executeMethod("onRemove" , file , this);
				}
				if(this.getMethods("onRemoveFile")){
					return this.executeMethod("onRemoveFile" , file , this);
				}
			}
		}
	},
	methods : {
		onMenuItemClick : function(value){
			if(this.getMethods('onMenuClick')){ //NO I18n
			var option = this.data.cxPropOptions.find(function(val){
					return val.system_value === value;
				})
				/**
				 * It will trigger, on click the menu item.
				 * @method onMenuClick
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } option
				 * @param { * } this
				 */
				this.executeMethod('onMenuClick',option , this); //NO I18n
			}
		},
		hideInfoTooltip: function() {
			this.showHideInfoTooltip();
		},
		onRemoveFileFromSelectedCB : function(file , value){
			if(this.getMethods('onRemoveFileFromSelected')){ //NO I18n
				this.executeMethod('onRemoveFileFromSelected',file , value); //NO I18n
			}
		},
		fetchContentCB : function(obj){
			if(this.getMethods("fetchContent")){
				return this.executeMethod("fetchContent" , obj);
			}
		},
		onUploadCB : function(fileObj , comp){
			if(this.getMethods("onUpload")){
				return this.executeMethod("onUpload" , fileObj , comp);
			}
		},
		onModalCloseCB : function(node){
			if(this.getMethods("onModalClose")){
				return this.executeMethod("onModalClose" , node);
			}
		},
		onModalShowCB : function(node){
			if(this.getMethods("onModalShow")){
				return this.executeMethod("onModalShow" , node);
			}
		},
		beforeCloseModalCB : function(node){
			if(this.getMethods("beforeCloseModal")){
				return this.executeMethod("beforeCloseModal" , node);
			}
		},
		beforeShowModalCB  : function(node){
			if(this.getMethods("beforeShowModal")){
				return this.executeMethod("beforeShowModal" , node);
			}
		},
		onMenuBeforeOpen : function(){
			var bool;
			if(this.getMethods('onBeforeOpenMenu')){
				/**
				 * It will trigger before open the menu.
				 * @method onBeforeOpenMenu
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } this
				 */
				bool = this.executeMethod('onBeforeOpenMenu',this.$node); //NO I18n
			}
			if(this.data.disableBtn || this.data.cxPropReadonly || bool === false){
				return false;
			}
		},
		onMenuOpen : function(menu, arg2, node){
			if(this.getMethods('onOpenMenu')){
				/**
				 * It will trigger on open the menu.
				 * @method onOpenMenu
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } this
				 */
				this.executeMethod('onOpenMenu',this.$node); //NO I18n
			}
			 let cxFileMenuWrapper = menu.component.childComp.querySelector('lyte-menu-body');//NO I18n
			 let cxFileMenuWidth = node.clientWidth;//NO I18n
			 if(!this.initialWidth){
				this.initialWidth = cxFileMenuWrapper.offsetWidth;
			 }
			 var finalWidth = this.initialWidth >= cxFileMenuWidth ?  this.initialWidth : cxFileMenuWidth;
			 $L(cxFileMenuWrapper).css({ 'width':  finalWidth + 'px' });//NO I18n
		},
		onAddFileFn : function(sysFile , elem , file){
			var cxFiles = this.data.cxPropFiles;
			file.fileName = file.name;
			this.setBaseName(file)
			var clonedFile = $L.extend(true , {} ,file);
			clonedFile.cxNewFile = true;
			if(this.data.cxPropType === "multiple"){
				Lyte.arrayUtils(this.data.cxPropFiles , 'push' , clonedFile);
				if(this.data.cxPropFiles.length >= this.data.cxPropFileLimit){
					this.setData("disableBtn" , true);
				}
			}else{
				if(cxFiles[0]){
					Lyte.arrayUtils(this.data.cxPropFiles , 'replaceAt' , 0 , clonedFile);
				}else{
					Lyte.arrayUtils(this.data.cxPropFiles , 'push' , clonedFile);
				}
			}
			// this.fileUpload.component.setData('ltPropReset' , true);
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No i18n
			}
			if(this.getMethods("onAddFile")){
				/**
				 * When the file is selected and after adding a file to fileBucket, this method will be called .
				 * @method onAddFile
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 * @param { * } this
				 */
				return this.executeMethod("onAddFile", file , this);
			}
		},
		afterRenderUpload : function(element){
			this.lyteFileUpload = element;
		},
		onBeforeAddFile : function(systemFileObj , elem , file){
			if(this.getMethods('onBeforeAdd')){ //no i18n
				/**
				 * When the file is selected and before adding a file to fileBucket, this method will be called.
				 * @method onBeforeAdd
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onBeforeAdd' , file , this.$node); //no i18n
			}
		},
		// onBeforeRemoveFile : function(fileList , file){
		// 	if(this.getMethods('onBeforeRemove')){ //no i18n
		// 		/**
		// 		 * This method is invoked before removing a file from fileBucket.
		// 		 * @method onBeforeRemove
		// 		 * @author manikaraja.p
		// 		 * @version 1.0.0
		// 		 * @param { * } file
		// 		 */
		// 		 return this.executeMethod('onBeforeRemove', fileList , file , this.$node); //no i18n
		// 	}
		// },
		// onRemoveFile : function(file){
		// 	if(this.getMethods('onRemove')){ //no i18n
		// 		/**
		// 		 * This method is invoked after removing a file from fileBucket.
		// 		 * @method onRemove
		// 		 * @author manikaraja.p
		// 		 * @version 1.0.0
		// 		 * @param { * } file
		// 		 */
		// 		 return this.executeMethod('onRemove', file , this.$node); //no i18n
		// 	}
		// },
		successFile : function(files , node , lxhr){
			if(this.getMethods('onSuccess')){ //no i18n
				/**
				 * This method is called when all the files are uploaded successfully.(overall success callback)
				 * @method onSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onSuccess' , files , this.$node , lxhr); //no i18n
			}
		},
		onFailureFile : function( file , element , lxhr){
			if(this.getMethods('onFailure')){ //no i18n
				/**
				 * This method is called when either one of the files is failed to upload.(overall failure callback)
				 * @method onFailure
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onFailure', file , this.$node , lxhr); //no i18n
			}
		},
		onFileReject : function(sysFile , obj , elem , orgFile){
			if(this.getMethods('onReject')){ //no i18n
				/**
				 * This method is called when a file is rejected due to size / type(format)
				 * @method onReject
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 * @param { * } obj
				 * @param { * } elem
				 * @param { * } orgFile
				 */
				this.executeMethod('onReject' , sysFile ,obj , elem ,orgFile ); //no i18n
			}
		},
		onRequestSuccessFn : function(lxhr , file ){
			if(this.getMethods('onRequestSuccess')){ //no i18n
				/**
				 * This method is called when an individual request is succeed
				 * @method onRequestSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */	
				return this.executeMethod('onRequestSuccess' , lxhr , file , this.$node); //no i18n
			}
		},
		onRequestFailureFn : function(lxhr , file){
			if(this.getMethods('onRequestFailure')){ //no i18n
				/**
				 * This method is called when an individual request is failed or aborted.
				 * @method onRequestFailure
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				 return this.executeMethod('onRequestFailure' , lxhr , file , this.$node); //no i18n
			}
		},
		onFileSuccessFn : function(lxhr , file){
			var cxFiles = this.data.cxPropFiles;
			var index = cxFiles.findIndex(x => x.id === file.id);
			if(index !== -1){
				Lyte.objectUtils(cxFiles[index] , 'add' , 'status' , 'success');
			}
			if(this.getMethods('onFileSuccess')){ //no i18n
				/**
				 * This method is called when an individual file is uploaded successfully in the server.
				 * @method onFileSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */	
				this.executeMethod('onFileSuccess' , lxhr , file , this.$node); //no i18n
			}
		},
		onFileFailureFn : function(lxhr , file){
			var cxFiles = this.data.cxPropFiles;
			var index = cxFiles.findIndex(x => x.id === file.id);
			if(index !== -1){
				Lyte.objectUtils(cxFiles[index] , 'add' , 'status' , 'error');
				if(this.data.cxPropType === "single"){
					this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.fileupload.attach.fail"));
				}
			}
			if(this.getMethods('onFileFailure')){ //no i18n
				/**
				 * This method is called when an individual file is failed or aborted after uploaded to the server.
				 * @method onFileFailure
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */	
				return this.executeMethod('onFileFailure' , lxhr , file , this.$node); //no i18n
			}
		},
		onProgressFn : function(event , xhr , file ){
			var cxFiles = this.data.cxPropFiles;
			var index = cxFiles.findIndex(x => x.id === file.id);
			if(index !== -1){
				Lyte.objectUtils(cxFiles[index] , 'add' , 'status' , 'uploading');
				Lyte.objectUtils(cxFiles[index] , 'add' , 'percentage' , file.percentage);
			}
			if(this.getMethods('onProgress')){ //no i18n
				/**
				 * This method is called when file is in progress
				 * @method onProgress
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onProgress', event , xhr , file , this.$node); //no i18n
			}
		},
		onBeforeSendFn : function(xhr , file , chunk , element , formData , lyteDomAjaxObject){
			if(this.getMethods('onBeforeSend')){ //no i18n
				/**
				 * This method is called before sending xhr request
				 * @method onBeforeSend
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */	
				return this.executeMethod('onBeforeSend', xhr , file , chunk , this.$node , formData , lyteDomAjaxObject); //no i18n
			}
		},
		onSendFn : function(xhr , file , chunk , element , formData , lyteDomAjaxObject){
			if(this.getMethods('onSend')){ //no i18n
				/**
				 * This method is called after sending xhr request
				 * @method onSend
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */	
				 this.executeMethod('onSend', xhr , file , chunk , this.$node , formData , lyteDomAjaxObject); //no i18n
			}
		},
		onBeforeOpenFn : function(event , element){
			if(this.getMethods('onBeforeOpen')){ //no i18n
				 /**
				  * This method is called before opening file selection window
				  * @method onBeforeOpen
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  */
				 return this.executeMethod('onBeforeOpen', event , element); //no i18n
			}
		},
		onRetryFn : function(lxhr , file ){
			if(this.getMethods('onRetry')){ //no i18n
				 /**
				  * This method will be called automatically in given number of retrying times(lt-prop-retry or lt-prop-chunk-retry), when file upload fails.
				  * @method onRetry
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  */
				return this.executeMethod('onRetry' , lxhr , file , this.$node); //no i18n
			}
		},
		onSelectFn : function(files , event){
			if(this.getMethods('onSelect')){ //no i18n
				/**
				 * This method is called after selecting the files from file selection window
				 * @method onSelect
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 * @param { * } event
				 */
				return this.executeMethod('onSelect' , files , event); //no i18n
		   	}
		},
		onBeforeManualRetryFn : function(file){
			if(this.getMethods('onBeforeManualRetry')){ //no i18n
				/**
				 * It is called before execute retry function, when user clicked the retry icon.
				 * @method onBeforeManualRetry
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onBeforeManualRetry' , file); //no i18n
		   	}
		},
		onValidationEndFn : function(){
			if(this.getMethods('onValidationEnd')){ //no i18n
				/**
				 * It is called after completed the validation in our component side.
				 * @method onValidationEnd
				 * @author manikaraja.p
				 * @version 1.0.0
				 */
				return this.executeMethod('onValidationEnd'); //no i18n
		   	}
		}
	},
	removeTheFile : function(file , ind){
		var bool 
		if(this.getMethods('onBeforeRemove')){
			/**
			 * It will trigger before remove the file from the list.
			 * @method onBeforeRemove
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			bool = this.executeMethod('onBeforeRemove',this.data.fileList , file); //NO I18n
			if(bool === false){
				return false;
			}
		}
		if(this.getMethods('onBeforeRemoveFile')){
			bool = this.executeMethod('onBeforeRemoveFile',this.data.fileList , file); //NO I18n
			if(bool === false){
				return false;
			}
		}
		var cxFiles = this.data.cxPropFiles , selector = this.data.cxPropFileUniqueSelector , limit= this.data.cxPropFileLimit ;
		var index = ind ? ind : cxFiles.findIndex(function(fi){ return fi[selector] === file[selector]; });
		if(index !== -1){
			Lyte.arrayUtils(cxFiles , 'removeAt' , index , 1);
			if(this.initialCxValue.length){
				var rIndex = this.initialCxValue.findIndex(function(rFile){ return rFile[selector] === file[selector]; });
				if(rIndex !== -1 && file.attachment_Id){
					this.removedFiles.push({ _delete : null , attachment_id : file.attachment_Id });
					this.initialCxValue.splice(rIndex , 1);
				}
			}
			if(limit && cxFiles.length < limit){
				this.setData({'disableBtn' : false ,'tooltipMsg' : "" });//NO I18n
			}
			if(this.fileUpload){
				this.fileUpload.removeUpload(file.id);
			}
			if(this.getMethods('onRemove')){
			/**
			 * It will trigger removed the file from the list.
			 * @method onRemove
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 * @param { * } this
			 */
			this.executeMethod('onRemove',file , this); //NO I18n
			}
			if(this.getMethods('onRemoveFile')){
				this.executeMethod('onRemoveFile',file , this); //NO I18n
			}
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No i18n
			}
		}
	},
	getFileType(file){
		var fileName = file.fileName;
		extension = (fileName).substring(fileName.lastIndexOf(".") + 1).toLowerCase();

		var image = ["jpeg","jpg","gif","png","webp","bmp","svg"]; //No I18N
		var video = ["avi", "wmv", "mp4", "mpeg", "mpg", "mov", "flv", "mkv", "webm"]; //No I18N
		var audio = ["mp3", "ogg", "oga", "wma", "m4p", "m4a", "au", "3gp"]; //No I18N
		var docx = ["doc","docx","odt","rtf"]; //No I18N
		var ppt = ["odp", "pps", "pot", "pptx", "ppt"]; //No I18N
		var zip = ["zip","zipx","tar","gz","z","cab","rar","bz2","lzh","7z","img","iso"]; //No I18N
		var html = ["html","htm"]; //No I18N
		var pdf = ["pdf"]; //No I18N
		var excel = ["csv","xls","xlsx","ods","xlsm","sxc","tsv"]; //No I18N
		
		if(image.includes(extension)){
			return "image";  //No I18N
		} else if(pdf.includes(extension)){
			return "pdf"; //No I18N
		} else if(zip.includes(extension)){
			return "zip"; //No I18N
		} else if(video.includes(extension)){
			return "video"; //No I18N
		} else if(audio.includes(extension)){
			return "audio"; //No I18N
		} else if(docx.includes(extension)){
			return "docx"; //No I18N
		} else if(ppt.includes(extension)){
			return "ppt"; //No I18N
		} else if(excel.includes(extension)){
			return "xls"; //No I18N
		} else if(html.includes(extension)){
			return "html"; //No I18N
		} else {
			return "allfile"; //No I18N
		}
	},
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	observeAndSetAriaForIcon : function(){
		var ariaAttr = this.ariaGetMergedAttributes() , allIcon , icon , len , i;
		if(ariaAttr){
			if(!ariaAttr.cxAriaDownloadIcon){
				ariaAttr.cxAriaDownloadIcon = { 'aria-label' :  _cruxUtils.getI18n("crm.view.attachment.download") };
			}else if(ariaAttr.cxAriaDownloadIcon && !(ariaAttr.cxAriaDownloadIcon['aria-label'])){
				ariaAttr.cxAriaDownloadIcon['aria-label'] = _cruxUtils.getI18n("crm.view.attachment.download");
			}
			if(!ariaAttr.cxAriaRemoveIcon){
				ariaAttr.cxAriaRemoveIcon = { 'aria-label' : _cruxUtils.getI18n("crm.fileuploader.removefile") };
			}else if(ariaAttr.cxAriaRemoveIcon && !(ariaAttr.cxAriaRemoveIcon['aria-label'])){
				ariaAttr.cxAriaRemoveIcon['aria-label'] = _cruxUtils.getI18n("crm.fileuploader.removefile");
			}
			if(!ariaAttr.cxAriaUploadIcon){
				ariaAttr.cxAriaUploadIcon = { 'aria-label' : _cruxUtils.getI18n("crm.button.upload") };
			}else if(ariaAttr.cxAriaUploadIcon && !(ariaAttr.cxAriaUploadIcon['aria-label'])){
				ariaAttr.cxAriaUploadIcon['aria-label'] = _cruxUtils.getI18n("crm.button.upload") ;
			}
		}
		this.setData('ariaAttributes', ariaAttr);
		if(this.$node.querySelector('.cxFileDownloadButton')){
			allIcon = this.$node.querySelectorAll('.cxFileDownloadButton');
			len = allIcon.length;
			for( i = 0 ; i < len ; i++ ){
				icon = allIcon[i];
				_lyteUiUtils.setAttribute(icon, this.getData('ariaAttributes').cxAriaDownloadIcon || {}, {});
			}
		}
		if(this.$node.querySelector('.cxSFileRemoveIconWrap')){
			allIcon = this.$node.querySelectorAll('.cxSFileRemoveIconWrap');
			len = allIcon.length;
			for( i = 0 ; i < len ; i++ ){
				icon = allIcon[i];
				_lyteUiUtils.setAttribute(icon, this.getData('ariaAttributes').cxAriaRemoveIcon || {}, {});
			}
		}
		if(this.$node.querySelector('.cxSFileUploadIconWrap')){
			allIcon = this.$node.querySelectorAll('.cxSFileUploadIconWrap');
			len = allIcon.length;
			for( i = 0 ; i < len ; i++ ){
				icon = allIcon[i];
				_lyteUiUtils.setAttribute(icon, this.getData('ariaAttributes').cxAriaUploadIcon || {}, {});
			}
		}
	}.observes('cxPropAria', 'cxPropAriaAttributes').on('didConnect')
}, {mixins : ["crux-element-validation" , "crux-fileupload-mixin" ]});//No I18n
Lyte.Component.registerHelper("checkHideIcon",function(icon, file){
	if(icon && file){
		return false;
	}
	return true;
});
