/**
 * @component crux-file-upload
 * @author manikaraja.p
 * @version 1.0.0
 * @summary crux-file-upload used to upload files to the server. The file uploader component uses the input type file for selecting files. You can also drag and paste files for uploading.
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-file-upload", {
_template:"<template tag-name=\"crux-file-upload\"> <lyte-fileupload queue-list=\"{{lbind(fileList)}}\" lt-prop-id=\"{{cxPropId}}\" class=\"{{cxPropFileUploadClass}}\" lt-prop-validate-by-ext=\"{{cxPropValidateByExt}}\" lt-prop-rename-duplicate-file=\"{{cxPropRenameDuplicateFile}}\" lt-prop-reset-file-value=\"true\" predefined-list=\"{{lbind(cxPropPredefinedList)}}\" lt-prop-auto-upload=\"{{cxPropAutoUpload}}\" lt-prop-trigger-upload=\"{{cxPropTriggerUpload}}\" lt-prop-upload-multiple-count=\"{{cxPropUploadMultipleCount}}\" lt-prop-parallel=\"{{cxPropParallel}}\" lt-prop-file-unit=\"{{cxPropFileUnit}}\" lt-prop-size-format=\"{{cxPropSizeFormat}}\" lt-prop-upload-multiple=\"{{cxPropUploadMultiple}}\" lt-prop-files-count=\"{{cxPropMaxFilesCount}}\" lt-prop-total-files-size=\"{{cxPropTotalFilesSize}}\" lt-prop-reset=\"{{lbind(cxPropReset)}}\" lt-prop-prevent-duplicate=\"{{cxPropPreventDuplicate}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-files=\"{{lbind(cxPropFiles)}}\" lt-prop-folder=\"{{cxPropFolder}}\" lt-prop-param-name=\"{{cxPropParamName}}\" lt-prop-retry=\"{{cxPropRetry}}\" lt-prop-tabindex=\"{{cxPropTabindex}}\" lt-prop-class=\"{{cxPropClass}}\" lt-prop-yield=\"true\" lt-prop-file-limit=\"{{cxPropFileLimit}}\" lt-prop-multiple=\"{{cxPropMultiple}}\" lt-prop-name=\"{{cxPropName}}\" lt-prop-thumb=\"{{cxPropThumb}}\" lt-prop-minimum-file-size=\"{{cxPropMinimumFileSize}}\" lt-prop-accept=\"{{cxPropAcceptedTypes}}\" cx-prop-minimum-file-size=\"{{cxPropMinimumFileSize}}\" lt-prop-ajax=\"{{cxPropAjax}}\" lt-prop-list-error-files=\"{{cxPropListErrorFiles}}\" on-before-remove=\"{{method('onBeforeRemoveFile')}}\" on-before-add=\"{{method('onBeforeAddFile')}}\" on-add=\"{{method('onAddFile')}}\" on-success=\"{{method('successFile')}}\" on-reject=\"{{method('onFileReject')}}\" after-render=\"{{method('afterRenderUpload')}}\" on-remove=\"{{method('onRemoveFile')}}\" on-failure=\"{{method('onFailureFile')}}\" on-request-success=\"{{method('onRequestSuccessFn')}}\" on-request-failure=\"{{method('onRequestFailureFn')}}\" on-file-success=\"{{method('onFileSuccessFn')}}\" on-file-failure=\"{{method('onFileFailureFn')}}\" on-progress=\"{{method('onProgressFn')}}\" on-before-send=\"{{method('onBeforeSendFn')}}\" on-send=\"{{method('onSendFn')}}\" on-drag-enter=\"{{method('onDragEnterFn')}}\" on-drag-over=\"{{method('onDragOverFn')}}\" on-drag-leave=\"{{method('onDragLeaveFn')}}\" on-before-drop=\"{{method('onBeforeDropFn')}}\" on-drop=\"{{method('onDropFn')}}\" on-before-paste=\"{{method('onBeforePasteFn')}}\" on-paste=\"{{method('onPasteFn')}}\" on-before-open=\"{{method('onBeforeOpenFn')}}\" on-retry=\"{{method('onRetryFn')}}\" on-select=\"{{method('onSelectFn')}}\" on-validation-end=\"{{method('onValidationEndFn')}}\"> <template is=\"registerYield\" yield-name=\"file\"> <template is=\"if\" value=\"{{expHandlers(cxPropListType,'===',&quot;inner&quot;)}}\"><template case=\"true\"> <div class=\"cxSelectAreaWrapperDiv {{if(expHandlers(cxPropPredefinedList.length,'||',fileList.length),'cxTypeFileSelected','')}} {{cxPropFileUploadWrapperClass}}\"> <lyte-yield yield-name=\"headerYield\"></lyte-yield> <template is=\"if\" value=\"{{cruxOr(cxPropPredefinedList.length,fileList.length)}}\"><template case=\"true\"><div class=\"lyteFileUpdList cxFileUpdList {{if(cxPropSingleColumn,'cxSingleFileList','')}}\"> <crux-file-upload-list cx-prop-size-selector=\"{{cxPropSizeSelector}}\" cx-prop-size-format=\"{{cxPropSizeFormat}}\" cx-prop-sortable=\"{{cxPropSortable}}\" cxprop-progress-status-colours=\"{{cxPropProgressStatusColours}}\" cx-prop-editable=\"{{cxPropEditable}}\" cx-prop-id=\"{{cxPropId}}\" cx-prop-manual-retry=\"{{cxPropManualRetry}}\" cx-prop-show-failure-message=\"{{cxPropShowFailureMessage}}\" cx-prop-list-class=\"{{cxPropListClass}}\" cx-prop-source-key=\"{{cxPropSourceKey}}\" cx-prop-preview-url-key=\"{{cxPropPreviewUrlKey}}\" cx-prop-download-key=\"{{cxPropDownloadKey}}\" cx-prop-predefined-list=\"{{lbind(cxPropPredefinedList)}}\" file-list=\"{{lbind(fileList)}}\" cx-prop-failure-message=\"{{cxPropFailureMessage}}\" cx-prop-file-unit=\"{{cxPropFileUnit}}\" cx-prop-digits=\"{{cxPropDigits}}\" cx-prop-upload-multiple=\"{{cxPropUploadMultiple}}\" cx-prop-custom-message=\"{{cxPropCustomMessage}}\" cx-prop-upload-progress=\"{{cxPropUploadProgress}}\" cx-prop-auto-upload=\"{{cxPropAutoUpload}}\" on-edit-image=\"{{method('onImageEdit')}}\" on-before-manual-retry=\"{{method('onBeforeManualRetryFn')}}\"></crux-file-upload-list> </div></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropPredefinedList.length,'!'),'&amp;&amp;',expHandlers(fileList.length,'!'))}}\"><template case=\"true\"><div class=\"selectionAreaDiv\"> <template is=\"if\" value=\"{{cxPropSelectArea.icon_html}}\"><template case=\"true\"><span class=\"cxFileUploadHeadIconContainer \">{{unescape(cxPropSelectArea.icon_html)}}</span></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSelectArea.icon_class}}\"><template case=\"true\"><span class=\"cxFileUploadHeadIconContainer {{cxPropSelectArea.icon_class}}\"></span></template></template></template></template> <div class=\"typeFilePrimaryMsg\">{{unescape(cxPropSelectArea.primary_message)}}</div> <template is=\"if\" value=\"{{cxPropShowBrowseButton}}\"><template case=\"true\"><div class=\"cxFileSeperatorText\">- {{cruxGetI18n(\"crm.label.lowercase.or\")}} -</div></template></template> <lyte-file-select-area class=\"typeFileSelectionArea cxDIB\"> <template is=\"if\" value=\"{{cxPropShowBrowseButton}}\"><template case=\"true\"><lyte-button class=\"fileUploadSelectAreaBtn\" data-zcqa=\"fileUploadSelectAreaButton\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropSelectAreaButtonClass}}\" lt-prop-appearance=\"primary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropSelectArea.browse_text}} </template> </lyte-button></template></template> </lyte-file-select-area> <div class=\"typeFileSecondaryMsg\"> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSecondaryMessage,false)}}\"><template case=\"true\"><div>{{unescape(cxPropSelectArea.secondary_message)}}</div></template></template> <div class=\"cxFileUploadSupportFormatMsg\">{{unescape(cxPropSelectArea.supported_message)}}</div> </div> <lyte-yield yield-name=\"homeFooterYield\"></lyte-yield> </div></template><template case=\"false\"><div class=\"typeFilePrimaryMsg\"> <div class=\"cxFileAfterUploadedMsg\"> <span class=\"cxFileUploadAttachment {{cxPropSelectArea.icon_class}}_Attachment\"></span> {{unescape(cxPropSelectArea.primary_message)}}<template is=\"if\" value=\"{{cxPropShowBrowseButton}}\"><template case=\"true\"><span class=\"cxFileUploadedMsgLableColor cxFileUploadedOrSeparator\">, or</span></template></template> <lyte-file-select-area class=\"typeFileSelectionArea cxUploadedBrowseButton {{if(cxPropDisableBrowseBtn,'peNone','')}}\" lt-prop-title=\"{{cxPropErrorTooltipMsg}}\"> <template is=\"if\" value=\"{{cxPropShowBrowseButton}}\"><template case=\"true\"><lyte-button class=\"fileUploadSelectAreaBtn\" data-zcqa=\"fileUploadSelectAreaButton\" lt-prop-disabled=\"{{cxPropDisableBrowseBtn}}\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropSelectAreaButtonClass}}\" lt-prop-appearance=\"primary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropSelectArea.browse_text}} </template> </lyte-button></template></template> </lyte-file-select-area> </div> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSupportedMessage,false)}}\"><template case=\"true\"><div class=\"cxFileAfterUploadedSecondaryMsg\"> {{unescape(cxPropSelectArea.supported_message)}} </div></template></template> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropListType,'===',&quot;single_image&quot;)}}\"><template case=\"true\"> <div class=\"cxSelectAreaWrapperDiv {{if(cruxOr(fileList.length,cxPropPredefinedList.length),'cxFileUpSingleImgSelected','')}} {{cxPropFileUploadWrapperClass}}\"> <lyte-yield yield-name=\"headerYield\"></lyte-yield> <template is=\"if\" value=\"{{cruxOr(fileList.length,cxPropPredefinedList.length)}}\"><template case=\"true\"><div class=\"cxFileUpSingleImgViewCont\"> <img class=\"cxFileUpSingleImgView\" src=\"{{if(fileList.length,fileList[0].src,cxPropPredefinedList[0].src)}}\"> </div></template><template case=\"false\"><div class=\"selectionAreaDiv\"> <span class=\"cxFileUploadHeadIconContainer cxImageUploadHeadIcon\"></span> <div class=\"typeFilePrimaryMsg\">{{unescape(cxPropSelectArea.primary_message)}}</div> <div class=\"cxFileSeperatorText\">- {{cruxGetI18n(\"crm.label.lowercase.or\")}} -</div> <div class=\"typeFileSelectionArea cxDIB\"> <lyte-button class=\"fileUploadSelectAreaBtn\" data-zcqa=\"fileUploadSelectAreaButton\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropSelectAreaButtonClass}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('openSelector')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropSelectArea.browse_text}} </template> </lyte-button> </div> <div class=\"typeFileSecondaryMsg\"> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSecondaryMessage,false)}}\"><template case=\"true\"><div>{{unescape(cxPropSelectArea.secondary_message)}}</div></template></template> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSupportedMessage,false)}}\"><template case=\"true\"><div class=\"cxFileUploadSupportFormatMsg\">{{unescape(cxPropSelectArea.supported_message)}}</div></template></template> </div> <lyte-yield yield-name=\"homeFooterYield\"></lyte-yield> </div></template></template> <lyte-file-select-area class=\"fileUploadSelectionArea\"></lyte-file-select-area> </div> </template><template case=\"false\"> <div class=\"cxSelectAreaWrapperDiv cxFileUpdOuterAreaWrapper {{if(cruxOr(cxPropPredefinedList.length,fileList.length,cxPropSelectAreaMinimize),'cxTypeFileSelected','')}} {{cxPropFileUploadWrapperClass}}\"> <lyte-yield yield-name=\"headerYield\"></lyte-yield> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropPredefinedList.length,'!'),'&amp;&amp;',expHandlers(fileList.length,'!')),'&amp;&amp;',expHandlers(cxPropSelectAreaMinimize,'!'))}}\"><template case=\"true\"><div class=\"selectionAreaDiv\"> <span class=\"cxFileUploadHeadIconContainer {{cxPropSelectArea.icon_class}}\"></span> <div class=\"typeFilePrimaryMsg\">{{unescape(cxPropSelectArea.primary_message)}}</div> <div class=\"cxFileSeperatorText\">- {{cruxGetI18n(\"crm.label.lowercase.or\")}} -</div> <template is=\"if\" value=\"{{cxPropAttachButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"attachButtonYield\"></lyte-yield> </template><template case=\"false\"> <lyte-file-select-area class=\"typeFileSelectionArea cxDIB\"> <lyte-button class=\"fileUploadSelectAreaBtn\" data-zcqa=\"fileUploadSelectAreaButton\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropSelectAreaButtonClass}}\" lt-prop-appearance=\"primary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropSelectArea.browse_text}} </template> </lyte-button> </lyte-file-select-area> </template></template> <template is=\"if\" value=\"{{cruxOr(ifNotEquals(cxPropSelectArea.cxPropShowSecondaryMessage,false),ifNotEquals(cxPropSelectArea.cxPropShowSupportedMessage,false))}}\"><template case=\"true\"><div class=\"typeFileSecondaryMsg\"> <div>{{unescape(cxPropSelectArea.secondary_message)}}</div> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSupportedMessage,false)}}\"><template case=\"true\"><div class=\"cxFileUploadSupportFormatMsg\">{{unescape(cxPropSelectArea.supported_message)}}</div></template></template> </div></template></template> <lyte-yield yield-name=\"homeFooterYield\"></lyte-yield> </div></template><template case=\"false\"><div class=\"typeFilePrimaryMsg\"> <div class=\"cxFileAfterUploadedMsg\"> <span class=\"cxFileUploadAttachment {{cxPropSelectArea.icon_class}}_Attachment\"></span> {{unescape(cxPropSelectArea.primary_message)}},<span class=\"cxFileUploadedMsgLableColor cxFileUploadedOrSeparator\">or</span> <template is=\"if\" value=\"{{cxPropAttachButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"attachButtonYield\"></lyte-yield> </template><template case=\"false\"> <lyte-file-select-area class=\"typeFileSelectionArea cxUploadedBrowseButton {{if(cxPropDisableBrowseBtn,'peNone','')}}\" lt-prop-title=\"{{cxPropErrorTooltipMsg}}\"> <lyte-button class=\"fileUploadSelectAreaBtn\" data-zcqa=\"fileUploadSelectAreaButton\" lt-prop-disabled=\"{{cxPropDisableBrowseBtn}}\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropSelectAreaButtonClass}}\" lt-prop-appearance=\"primary\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropSelectArea.browse_text}} </template> </lyte-button> </lyte-file-select-area> </template></template> </div> <template is=\"if\" value=\"{{ifNotEquals(cxPropSelectArea.cxPropShowSupportedMessage,false)}}\"><template case=\"true\"><div class=\"cxFileAfterUploadedSecondaryMsg\"> {{unescape(cxPropSelectArea.supported_message)}} </div></template></template> </div></template></template> <template is=\"if\" value=\"{{cxPropAttachButtonYield}}\"><template case=\"true\"> <lyte-file-select-area class=\"typeFileSelectionArea\" style=\"display: none;\"></lyte-file-select-area> </template></template> </div> <template is=\"if\" value=\"{{cruxAnd(negate(cxPropHideList),cruxOr(cxPropPredefinedList.length,fileList.length))}}\"><template case=\"true\"><div class=\"lyteFileUpdList cxFileUpdList {{if(expHandlers(cxPropListType,'===','outer'),'cxFileUpdListOuterWrapper')}} {{if(cxPropSingleColumn,'cxSingleFileList','')}}\"> <crux-file-upload-list cx-prop-size-selector=\"{{cxPropSizeSelector}}\" cx-prop-size-format=\"{{cxPropSizeFormat}}\" cx-prop-sortable=\"{{cxPropSortable}}\" cxprop-progress-status-colours=\"{{cxPropProgressStatusColours}}\" cx-prop-editable=\"{{cxPropEditable}}\" cx-prop-id=\"{{cxPropId}}\" cx-prop-manual-retry=\"{{cxPropManualRetry}}\" cx-prop-show-failure-message=\"{{cxPropShowFailureMessage}}\" cx-prop-list-class=\"{{cxPropListClass}}\" cx-prop-source-key=\"{{cxPropSourceKey}}\" cx-prop-preview-url-key=\"{{cxPropPreviewUrlKey}}\" cx-prop-download-key=\"{{cxPropDownloadKey}}\" cx-prop-predefined-list=\"{{lbind(cxPropPredefinedList)}}\" file-list=\"{{lbind(fileList)}}\" cx-prop-failure-message=\"{{cxPropFailureMessage}}\" cx-prop-file-unit=\"{{cxPropFileUnit}}\" cx-prop-digits=\"{{cxPropDigits}}\" cx-prop-upload-multiple=\"{{cxPropUploadMultiple}}\" cx-prop-custom-message=\"{{cxPropCustomMessage}}\" cx-prop-upload-progress=\"{{cxPropUploadProgress}}\" cx-prop-auto-upload=\"{{cxPropAutoUpload}}\" on-edit-image=\"{{method('onImageEdit')}}\" on-before-manual-retry=\"{{method('onBeforeManualRetryFn')}}\"></crux-file-upload-list> </div></template></template> </template></template></template></template> </template> </lyte-fileupload> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"text","position":[0,3,0]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,7,1]},{"type":"if","position":[0,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[0,7]},{"type":"attr","position":[0,9,1]},{"type":"if","position":[0,9,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"text","position":[0,9,3,0]},{"type":"insertYield","position":[0,11]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"text","position":[0,1,3]},{"type":"attr","position":[0,1,5]},{"type":"if","position":[0,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,1,7]},{"type":"attr","position":[0,1,7,1]},{"type":"if","position":[0,1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[0,1,7]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,1]},{"type":"attr","position":[0,7,1]},{"type":"registerYield","position":[0,7,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,7,1]},{"type":"attr","position":[0,9,1]},{"type":"if","position":[0,9,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[0,9,3]},{"type":"if","position":[0,9,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"insertYield","position":[0,11]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,1]},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[0,9]},{"type":"if","position":[0,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"insertYield","position":[0,11]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"text","position":[0,1,3]},{"type":"attr","position":[0,1,7]},{"type":"if","position":[0,1,7],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropSelectArea","cxPropMultiple","cxPropListClass","cxPropAcceptedTypes","cxPropSelectionAreaYield","fileList","cxPropMinimumFileSize","cxPropFileLimit","cxPropAjax","cxPropMaxFilesCount","cxPropThumb","cxPropTotalFilesSize","cxPropSingleFileSize","cxPropName","cxPropId","cxPropClass","cxPropParamName","cxPropTabindex","cxPropRetry","cxPropFiles","cxPropFolder","cxPropFileUnit","cxPropDigits","cxPropFailureMessage","cxPropShowFailureMessage","cxPropManualRetry","cxPropUploadMultiple","cxPropUploadMultipleCount","cxPropParallel","cxPropAutoUpload","cxPropTriggerUpload","cxPropPredefinedList","cxPropListType","cxPropSingleColumn","cxPropDownloadKey","cxPropPreviewUrlKey","cxPropSourceKey","cxPropSortable","cxPropEditable","cxPropResetFileValue","cxPropSizeSelector","cxPropDisableBrowseBtn","cxPropErrorTooltipMsg","cxPropCustomMessage","cxPropListErrorFiles","cxPropFileUploadWrapperClass","cxPropUploadProgress","cxPropProgressTooltip","cxPropSortableDragClass","cxPropValidateByExt","cxPropRenameDuplicateFile","cxPropProgressStatusColours","cxPropMaxCountReachTooltip","cxPropMaxSizeReachTooltip","cxPropReset","cxPropHideList","cxPropAttachButtonYield","cxPropSelectAreaMinimize","cxPropPreventDuplicate","cxPropSelectAreaMinimize","cxPropShowBrowseButton","cxPropSelectAreaButtonClass","cxPropSizeFormat","cxPropFileUploadClass"],
_observedAttributesType :["object","boolean","string","string","boolean","array","number","number","object","number","boolean","string","string","string","string","string","string","number","number","array","boolean","string","number","string","boolean","boolean","boolean","number","number","boolean","boolean","array","string","boolean","string","string","string","boolean","boolean","boolean","string","boolean","string","boolean","boolean","string","boolean","string","string","boolean","boolean","object","string","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","string","string","string"],

	data : function(){
		return {
			/**
			 * Using this propery, yocu can set a messages in file selection area.
			 * @componentProperty { object } cxPropSelectArea
			 * @author manikaraja.p
			 */
			cxPropSelectArea 			: Lyte.attr('object' , { "default" : {} }), //no i18n
			/**
			 * It allows to select multiple files
			 * @componentProperty { boolean } cxPropMultiple=false
			 * @author manikaraja.p
			 */
			cxPropMultiple 				: Lyte.attr( 'boolean', { "default" : true }),
			/**
			 * This class will be added for the every file list.
			 * @componentProperty { string } cxPropListClass
			 * @author manikaraja.p
			 */
			cxPropListClass				: Lyte.attr('string',{default : ''}), //no i18n
			/**
			 * It allows to select files with given types.
			 * @componentProperty { string } cxPropAcceptedTypes
			 * @author manikaraja.p
			 */
			cxPropAcceptedTypes 		: Lyte.attr('string' , {default : ""}), //no i18n
			/**
			 * Yield support for file selection area.
			 * @componentProperty { boolean } cxPropSelectionAreaYield=false
			 * @author manikaraja.p
			 */
			cxPropSelectionAreaYield	: Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * you can get the listed files array in this data.
			 * @componentProperty { array } fileList
			 * @author manikaraja.p
			 */
			fileList					: Lyte.attr('array' , {default : []}), //no i18n
			/**
			 * Files less than given size will be rejected. The onReject method will be triggered.
			 * @componentProperty { number } cxPropMinimumFileSize
			 * @author manikaraja.p
			 */
			cxPropMinimumFileSize   	: Lyte.attr('number',{"default": 0 } ), //no i18n
			/**
			 * Files exceeds given size will be rejected. The onReject method will be triggered
			 * @componentProperty { number } cxPropFileLimit
			 * @author manikaraja.p
			 */
			cxPropFileLimit				: Lyte.attr('number' ), //no i18n
			/**
			 * cx-prop-ajax is an object, which is similar to $L.ajax first argument.
			 * @componentProperty { object } cxPropAjax
			 * @author manikaraja.p
			 */
			cxPropAjax					: Lyte.attr('object', { "default" : { url : "/Fileupload" } } ), //no i18n
			// cxPropChunk				: Lyte.attr( 'boolean', { "default" : false }),
			/**
			 * It's used to handle the number of files allowed in crux-file-fileupload
			 * @componentProperty { number } cxPropMaxFilesCount
			 * @author manikaraja.p
			 */
			cxPropMaxFilesCount			: Lyte.attr('number' , {default : Infinity}), //no i18n
			/**
			 * It will create thumb for images
			 * @componentProperty { boolean } cxPropThumb=false
			 * @author manikaraja.p
			 */
			cxPropThumb					: Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * The selected files exceeds the given total files size, then the files will be rejected. The onReject method will be triggered.
			 * @componentProperty { string } cxPropTotalFilesSize
			 * @author manikaraja.p
			 */
			cxPropTotalFilesSize		: Lyte.attr('string'), //no i18n
			/**
			 * Files less than given size will be rejected. The onReject method will be triggered
			 * @componentProperty { string } cxPropSingleFileSize
			 * @author manikaraja.p
			 */
			cxPropSingleFileSize 		: Lyte.attr("string"),//No I18n
			/**
			 * It will be set for inner input
			 * @componentProperty { string } cxPropName
			 * @author manikaraja.p
			 */
			cxPropName					: Lyte.attr('string'), //no i18n
			/**
			 * It will be set for inner file type input
			 * @componentProperty { string } cxPropId
			 * @author manikaraja.p
			 */
			cxPropId					: Lyte.attr('string'), //no i18n
			/**
			 * It will be set for inner file type input
			 * @componentProperty { string } cxPropClass
			 * @author manikaraja.p
			 */
			cxPropClass					: Lyte.attr('string'), //no i18n
			/**
			 * Files are added to formdata in given param key
			 * @componentProperty { string } cxPropParamName
			 * @author manikaraja.p
			 */
			cxPropParamName				: Lyte.attr('string' , {default : "file"}), //no i18n
			/**
			 * It will be added to .fileUploadWrapper div
			 * @componentProperty { number } cxPropTabindex
			 * @author manikaraja.p
			 */
			cxPropTabindex				: Lyte.attr( 'number', { "default" : 1 } ),//no i18n
			/**
			 * If file upload fails, it will be uploaded automatically in given number of times
			 * @componentProperty { number } cxPropRetry
			 * @author manikaraja.p
			 */
			cxPropRetry					: Lyte.attr( 'number', { "default" : 2 } ),//no i18n
			/**
			 * All the selected files can be read using this property
			 * @componentProperty { array } cxPropFiles
			 * @author manikaraja.p
			 */
			cxPropFiles    				: Lyte.attr("array",{ "default" :[]}),//no i18n
			/**
			 * If set to true, you can upload a folder in lyte-fileupload.
			 * @componentProperty { boolean } cxPropFolder=false
			 * @author manikaraja.p
			 */
			cxPropFolder				: Lyte.attr( 'boolean', { "default" : false }),//no i18n
			/**
			 * Based on the size units will be created if units are not provided. Use lyteUiFileSize( currentSize, unit, digits ) helper for returning correct file size
			 * @componentProperty { string } cxPropFileUnit
			 * @author manikaraja.p
			 */
			cxPropFileUnit				: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			/**
			 * lyteUiFileSize helper return file size with given digits accuracy after decimal point
			 * @componentProperty { number } cxPropDigits
			 * @author manikaraja.p
			 */
			cxPropDigits				: Lyte.attr( 'number', { "default" : 1 } ),//no i18n
			/**
			 * It will be displayed when upload fails
			 * @componentProperty { string } cxPropFailureMessage
			 * @author manikaraja.p
			 */
			cxPropFailureMessage		: Lyte.attr( 'string', { "default" : _cruxUtils.getI18n('crm.fileupload.attach.fail') } ), //no i18n
			/**
			 * Failure message show/hide property.
			 * @componentProperty { boolean } cxPropShowFailureMessage=false
			 * @author manikaraja.p
			 */
			cxPropShowFailureMessage	: Lyte.attr( 'boolean', { "default" : true } ),//no i18n
			/**
			 * If its true, We'll enable the retry icon.
			 * @componentProperty { boolean } cxPropManualRetry=false
			 * @author manikaraja.p
			 */
			cxPropManualRetry			: Lyte.attr( 'boolean', { "default" : true } ),//no i18n
			/**
			 * It allows to upload multiple files in a single request.
			 * @componentProperty { boolean } cxPropUploadMultiple=false
			 * @author manikaraja.p
			 */
			cxPropUploadMultiple		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Given no. of files will be uploaded in a single request.
			 * @componentProperty { number } cxPropUploadMultipleCount
			 * @author manikaraja.p
			 */
			cxPropUploadMultipleCount	: Lyte.attr( 'number', { "default" : Infinity } ),//no i18n
			/**
			 * Given no. of files will be uploaded parallelly
			 * @componentProperty { number } cxPropParallel
			 * @author manikaraja.p
			 */
			cxPropParallel				: Lyte.attr( 'number', { "default" : 2 } ),//no i18n
			/**
			 * Queued files will be uploaded automatically
			 * @componentProperty { boolean } cxPropAutoUpload=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropAutoUpload 			: Lyte.attr( 'boolean', { "default" : true } ),
			/**
			 * Queued files will be uploaded when it set to true.
			 * @componentProperty { boolean } cxPropTriggerUpload=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropTriggerUpload		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Should pass the already saved files in server using this property.
			 * @componentProperty { array } cxPropPredefinedList
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropPredefinedList		: Lyte.attr("array",{ "default" :[]}),//no i18n
			/**
			 * There is two types of listing support in file upload, Inner box and outer box of selection area.
			 * @componentProperty { string } cxPropListType
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropListType				: Lyte.attr( 'string', { "default" : 'inner' } ),//no i18n
			/**
			 * We can specify the listing columns as single/double.
			 * @componentProperty { boolean } cxPropSingleColumn=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropSingleColumn			: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If you pass the download key and the url for the corressponding key name. We'll enable the download option
			 * @componentProperty { string } cxPropDownloadKey
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropDownloadKey			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			/**
			 * If you pass the preview key and the url for the corressponding key name. We'll enable the preview option.
			 * @componentProperty { string } cxPropPreviewUrlKey
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropPreviewUrlKey			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			/**
			 * If you pass the source key and the url for the corressponding key. We'll show the thumb view.
			 * @componentProperty { string } cxPropSourceKey
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropSourceKey				: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			/**
			 * We can re-order the file sequence using this property.
			 * @componentProperty { boolean } cxPropSortable=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropSortable				: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			// totalFileCount				: Lyte.attr( 'number' , {default : 0}),//no i18n
			/**
			 * Given the editable option for images.
			 * @componentProperty { boolean } cxPropEditable=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropEditable				: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			//cxPropShowUploadedCount		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropResetFileValue		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Size selector of the file.
			 * @componentProperty { string } cxPropSizeSelector
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropSizeSelector			: Lyte.attr( 'string', { "default" : 'size' } ),//no i18n
			cxPropDisableBrowseBtn		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropErrorTooltipMsg		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			/**
			 * You can set the custom message for every files, Using this property.
			 * @componentProperty { boolean } cxPropCustomMessage=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropCustomMessage			: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If its true, We'll list reject files also in the list. And also stored in fileList variable.
			 * @componentProperty { boolean } cxPropListErrorFiles=false
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropListErrorFiles		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Wrapper class for the upload area.
			 * @componentProperty { string } cxPropFileUploadWrapperClass
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropFileUploadWrapperClass : Lyte.attr("string" , {default : ""}),//No I18n
			cxPropUploadProgress		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If the file uploading in the server, The given message showing in attach button.
			 * @componentProperty { string } cxPropProgressTooltip
			 * @author manikaraja.p
			 */
			cxPropProgressTooltip		: Lyte.attr("string"),//No I18n
			/**
			 * This class will be adding while drag the file.
			 * @componentProperty { string } cxPropSortableDragClass
			 * @author manikaraja.p
			 */
			cxPropSortableDragClass		: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * If its true, We'll validate the accepted types using extension of the file name.
			 * @componentProperty { boolean } cxPropValidateByExt=false
			 * @author manikaraja.p
			 */
			cxPropValidateByExt			: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If its true, We'll rename while upload the same file.
			 * @componentProperty { boolean } cxPropRenameDuplicateFile=false
			 * @author manikaraja.p
			 */
			cxPropRenameDuplicateFile	: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Progress icon color
			 * @componentProperty { object } cxPropProgressStatusColours="#338CF0"
			 * @author manikaraja.p
			 */
			cxPropProgressStatusColours : Lyte.attr('object' , {'default' : {list : "#338CF0"}}), //no i18n
			/**
			 * File count limit exceeded tooltip message.
			 * @componentProperty { string } cxPropMaxCountReachTooltip
			 * @author manikaraja.p
			 */
			cxPropMaxCountReachTooltip	: Lyte.attr( 'string'), //no i18n
			/**
			 * File size limit exceeded tooltip message.
			 * @componentProperty { string } cxPropMaxSizeReachTooltip
			 * @author manikaraja.p
			 */
			cxPropMaxSizeReachTooltip	: Lyte.attr( 'string' ), //no i18n
			/**
			 * To reset the previously uploaded files
			 * @componentProperty { boolean } cxPropReset=false
			 * @author manikaraja.p
			 */
			cxPropReset                 : Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * We can hide the list, And you can display your own list using fileList data.
			 * @componentProperty { boolean } cxPropHideList=false
			 * @author manikaraja.p
			 */
			cxPropHideList				: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * Yield support for attach button.
			 * @componentProperty { boolean } cxPropAttachButtonYield=false
			 * @author manikaraja.p
			 */
			cxPropAttachButtonYield		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropSelectAreaMinimize	: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If its true, we don't allow the duplicate files
			 * @componentProperty { boolean } cxPropPreventDuplicate=false
			 * @author manikaraja.p
			 */
			cxPropPreventDuplicate : Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropSelectAreaMinimize	: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			/**
			 * If its true, we don't allow the duplicate files
			 * @componentProperty { boolean } cxPropPreventDuplicate=false
			 * @author manikaraja.p
			 */
			cxPropShowBrowseButton : Lyte.attr( 'boolean', { "default" : true } ),//no i18n
			cxPropSelectAreaButtonClass : Lyte.attr( 'string' , {default : "outlineprimary" } ), //no i18n
			cxPropSizeFormat : Lyte.attr( 'string' , {default : "decimal"} ), //no i18n
			cxPropFileUploadClass : Lyte.attr( 'string' ) //no i18n
		}
	},
	init : function(){
		// if(this.data.cxPropSelectArea.primary_message === undefined){
		// 	var msg =  "<div>Drag and drop the Files here<div> <div class = 'orDiv'>-or-<div> <lyte-file-select-area class = 'typeFileSelectionArea'>Browse</lyte-file-select-area>"; //no i18n
		// 	this.setData("cxPropSelectArea.primary_message" , msg); //no i18n
		// }
		if(this.data.cxPropMaxFilesCount && !this.data.cxPropMaxCountReachTooltip){
			this.setData("cxPropMaxCountReachTooltip", _cruxUtils.getI18n('crm.fileuploader.message.maxfilesexceeded',this.data.cxPropMaxFilesCount));
		}
		if(this.data.cxPropTotalFilesSize && !this.data.cxPropMaxSizeReachTooltip){
			var allowedSizeInt = this.data.cxPropTotalFilesSize.match(/[0-9]+/g)[0];
			this.setData("cxPropMaxSizeReachTooltip", _cruxUtils.getI18n('crm.fileuploader.message.totalfilesizeexceeded', allowedSizeInt));
		}
		var selectArea = this.data.cxPropSelectArea;
		selectArea.primary_message = selectArea.primary_message || _cruxUtils.getI18n("crm.fileupload.drag.drop.here");
		selectArea.supported_message = selectArea.supported_message || _cruxUtils.getI18n("crm.fileupload.support.format");
		selectArea.browse_text = selectArea.browse_text || _cruxUtils.getI18n('crm.label.browse.files');
		selectArea.icon_class = selectArea.icon_class === undefined ? "cxFileUploadHeadIcon" : selectArea.icon_class ;
		if(!this.data.cxPropProgressTooltip){
			this.setData('cxPropProgressTooltip' ,_cruxUtils.getI18n('crm.fileupload.wait.msg'));
		}
		if(this.data.cxPropListType === "single_image"){
			this.setData( {'cxPropMultiple' : false , 'cxPropMaxFilesCount' : 1 , cxPropThumb : true } ); //no i18n
			if(!this.data.cxPropAcceptedTypes){
				this.setData( "cxPropAcceptedTypes" , '.png,.jpg,.jpeg,.bmp,.gif' );
			}
		}
		if(this.getMethods('beforeRender')){ //no i18n
			/**
			 * It will trigger before render the file upload.
			 * @method beforeRender
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod('beforeRender' , this.$node); //no i18n
		}
	},
	didConnect : function(){
		if(this.getMethods('afterRender')){ //no i18n
			/**
			 * It will trigger after rendered the file upload.
			 * @method afterRender
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod('afterRender' , this.$node); //no i18n
		}
		if(this.data.cxPropAllowedTotalSize){
			this.convertToBytes();
		}
		this.$node.openFileSelector = function(){
			this.querySelector(".typeFileSelectionArea").click();
		};
	},
	observePreList : function(){
		var preList = this.data.cxPropPredefinedList , _self = this;;
		if(preList.length){
			if(!preList[0].size){
				var sizeSel = this.data.cxPropSizeSelector;
				preList.forEach(function(list){
					Lyte.objectUtils(list , 'add' , 'size' , list[sizeSel]);
				});
			}
			preList.forEach(function(list){
				if(!list.fileType){
					Lyte.objectUtils(list , 'add' , 'fileType' , _self.getFileType(list.name));
				}
			});
		}
		if(this.data.cxPropSortable){
			setTimeout(function(){
				_self.bindSorting();
			},0)
		}
		// this.progressCount = 0;
		this.validate(true);
	}.observes('cxPropPredefinedList').on('didConnect'),
	didDestroy : function(){
		delete this.lyteFileUpload;
	},
	convertToBytes : function(){
		var size = this.data.cxPropAllowedTotalSize;
		var fileUnit =  size.substring(size.length-2),
		totalSize  = parseInt(size.substring(0,size.length-2)),
		validFormat = ["KB","MB","GB"],
		indexOf = validFormat.indexOf(fileUnit);
		if(indexOf > -1){
			this.totalFilesSizeInBytes = totalSize*(Math.pow(1000,indexOf+1));
		}
	},
	addFiles : function(files){
		this.lyteFileUpload.addFiles(files);
	},
	removeFiles : function(files){
		this.lyteFileUpload.removeUpload(files);
	},
	getAllFiles : function(){
		var preList = this.data.cxPropPredefinedList ? this.data.cxPropPredefinedList : [] , addedList = this.data.fileList;
		addedList = addedList.filter(function(fi){ return fi.status !== 'error'; });
		var newList = preList.concat(addedList);
		if(this.data.cxPropSortable){
			var elemList = $L(".lyteFileUpdListFile" , this.$node) , newArray = [];
			var fileIds = elemList.map(function(index , elem){ return elem.getAttribute("data-id"); });
			var len = fileIds.length;
			for(var i = 0 ; i < len ; i++){
				var file = newList.find(function(li){ return li.id === fileIds[i]; });
				if(file){
					newArray.push(file);
				}
			}
			newList = newArray;
		}
		return newList;
	},
	updateStatus : function(id , content){
		var files = this.data.fileList;
		var file = files.find(function(fi){ return id === fi.id; });
		if(file){
			if(content && Object.keys(content).length >=1){
				if(content.message){
					Lyte.objectUtils(file , "add" , "cxMessage" , content.message); //no i18n
					if(content.messageType){
						Lyte.objectUtils(file , "add" , "cxMessageType" , content.messageType); //no i18n
					}
				}
				if(content.type){
					Lyte.objectUtils(file , "add" , "cxStatus" , content.type); //no i18n
					if(content.type === 'error'){
						Lyte.objectUtils(file , "add" , "status" , content.type); //no i18n
						if(this.data.cxPropListErrorFiles){
							file.lyteErrorMsg = "dummy";
							file.cxErrorList = true;
						}
					}
					this.updateProgressState();
				}
			}
		}
	},
	// rejectFile : function(id){
	// 	var files = this.data.fileList;
	// 	var file = files.find(function(fi){ return id === fi.id; });
	// 	if(file){
	// 		file.cxErrorList = true;
	// 		this.validate();
	// 	}
	// },
	virusScanner : function(id , bool){
		var files = this.data.fileList;
		var file = files.find(function(fi){ return id === fi.id; });
		Lyte.objectUtils(file , "add" , "showScanner" , bool); //no i18n
	},
	triggerUpload : function(){
		$L("lyte-fileupload" , this.$node)[0].component.setData("ltPropTriggerUpload" , true); //no i18n
	},
	updateProgressState : function(){
		var fileList = this.data.fileList;
		if(fileList.findIndex( x => (x.cxStatus === 'uploading') || (x.status === 'uploading')) !== -1){
			this.setData("cxPropUploadProgress" , true);
		}else{
			this.setData("cxPropUploadProgress" , false);
		}
	},
	validate : function(){
		var bool = false  , maxCount = this.data.cxPropMaxFilesCount , tooltip = "" , fileList = this.data.fileList , preList = this.data.cxPropPredefinedList;
		this.updateProgressState();
		if(this.data.cxPropListErrorFiles){
			fileList = fileList.filter(fi => ( !fi.cxErrorList && !fi.lyteErrorMsg ));
		}
		if(maxCount){
			var preLen = preList.length;
			if((fileList.length + preLen) >= maxCount){
				bool = true;
				tooltip = this.data.cxPropMaxCountReachTooltip;
			}
		}
		if(this.data.cxPropTotalFilesSize && !bool){
			var sizeSel = this.data.cxPropSizeSelector , preListSize = 0 , fileListSize = 0;
			preListSize = preList.reduce(function(ac , cur){ return ac + Number(cur[sizeSel]); } , 0);
			fileListSize = fileList.reduce(function(ac , cur){ return ac + Number(cur[sizeSel]); } , 0);
			this.setData("currentTotalFileSize" , this.fileSizeConvertAsPerUnit(preListSize + fileListSize));
			bool = (preListSize + fileListSize + 200) >= this.totalFilesSizeInBytes;
			if(bool){
				tooltip = this.data.cxPropMaxSizeReachTooltip;
			}
		}	
		if(bool){
			this.setData('cxPropErrorTooltipMsg' , tooltip);
		}else{
			this.setData('cxPropErrorTooltipMsg' , "");
		}
		this.setData('cxPropDisableBrowseBtn' , bool);
	},
	actions : {
		openSelector : function(){
			this.$node.querySelector(".fileUploadSelectionArea").click();
		}
	},
	methods : {
		onImageEdit : function(event , file){
			/**
			 * It will trigger, on edit the image.
			 * @method onEditImage
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod("onEditImage" , event , file)
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
		onAddFile : function(file,node, oFile){
			// this.setData("totalFileCount" , this.data.totalFileCount + 1); //no i18n
			this.validate();
			if(this.getMethods('onAdd')){ //no i18n
				/**
				 * When the file is selected and after adding a file to fileBucket, this method will be called .
				 * @method onAdd
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onAdd' , oFile , this.$node); //no i18n
			}
		},
		onBeforeRemoveFile : function(fileList , file){
			if(this.getMethods('onBeforeRemove')){ //no i18n
				/**
				 * This method is invoked before removing a file from fileBucket.
				 * @method onBeforeRemove
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				 return this.executeMethod('onBeforeRemove', fileList , file , this.$node); //no i18n
			}
		},
		onRemoveFile : function(from , file){
			// this.setData("totalFileCount" , this.data.totalFileCount - 1); //no i18n
			this.validate();
			if(this.getMethods('onRemove')){ //no i18n
				/**
				 * This method is invoked after removing a file from fileBucket.
				 * @method onRemove
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				 return this.executeMethod('onRemove', from , file , this.$node); //no i18n
			}
		},
		successFile : function(files , node , lxhr){
			if(this.data.cxPropSortable){
				this.bindSorting();
			}
			this.updateProgressState();
			// this.validate();
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
			this.updateProgressState();
			// this.validate();
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
				 * @param { * } sysFile
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
			if(this.getMethods('onFileSuccess')){ //no i18n
				var cloneFile = $L.extend(true , {} , file) , preKey = this.data.cxPropPreviewUrlKey , dKey = this.data.cxPropDownloadKey , sKey = this.data.cxPropSourceKey;
				/**
				 * This method is called when an individual file is uploaded successfully in the server.
				 * @method onFileSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */					
				var rFile = this.executeMethod('onFileSuccess' , lxhr , cloneFile , this.$node); //no i18n
				if(rFile){
					var keys = Object.keys(rFile) , len = keys.length;
					for(var i = 0 ; i < len ; i++){
						if(rFile[keys[i]] !== file[keys[i]]){
							Lyte.objectUtils(file , "add" , keys[i] ,  rFile[keys[i]]); //no i18n
						}
					}
				 }
				if(preKey){
					Lyte.objectUtils(file , "add" , preKey ,  file.src); //no i18n
				}
				if(dKey){
					Lyte.objectUtils(file , "add" , dKey ,  file.src); //no i18n
				}
				if(sKey){
					Lyte.objectUtils(file , "add" , sKey ,  file.src); //no i18n
				}
			}
		},
		onFileFailureFn : function(lxhr , file){
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
			this.setData("cxPropUploadProgress" , true); //no i18n
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
		onDragEnterFn : function(event , element){
			if(this.getMethods('onDragEnter')){ //no i18n
				/**
				 * This method is called when files entered file upload area ( .fileUploadWrapper )
				 * @method onDragEnter
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } element
				 */
				return this.executeMethod('onDragEnter', event , element); //no i18n
			}
		},
		onDragOverFn : function(event , element){
			if(this.getMethods('onDragOver')){ //no i18n
				/**
				 * This method is called when files dragged over file upload area ( .fileUploadWrapper )
				 * @method onDragOver
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } element
				 */
				return this.executeMethod('onDragOver', event , element); //no i18n
			}
		},
		onDragLeaveFn : function(event , element){
			if(this.getMethods('onDragLeave')){ //no i18n
				/**
				 * This method is called when files leaves file upload area ( .fileUploadWrapper )
				 * @method onDragLeave
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } element
				 */
				return this.executeMethod('onDragLeave', event , element); //no i18n
			}
		},
		onBeforeDropFn : function(event , element , files){
			if(this.getMethods('onBeforeDrop')){ //no i18n
				 /**
				  * This method is called before dropping the files
				  * @method onBeforeDrop
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  * @param { * } files
				  */
				 return this.executeMethod('onBeforeDrop', event , element , files); //no i18n
			}
		},
		onDropFn : function(event , element){
			if(this.getMethods('onDrop')){ //no i18n
				 /**
				  * This method is called after dropping the files
				  * @method onDrop
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  */
				 return this.executeMethod('onDrop', event , element); //no i18n
			}
		},
		onBeforePasteFn : function(event , element){
			if(this.getMethods('onBeforePaste')){ //no i18n
				 /**
				  * This method is called before pasting the files
				  * @method onBeforePasteFn
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  */
				 return this.executeMethod('onBeforePaste', event , element); //no i18n
			}
		},
		onPasteFn : function(event , element){
			if(this.getMethods('onPaste')){ //no i18n
				 /**
				  * This method is called after pasting the files
				  * @method onPaste
				  * @author manikaraja.p
				  * @version 1.0.0
				  * @param { * } event
				  * @param { * } element
				  */
				 return this.executeMethod('onPaste', event , element); //no i18n
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
			var elem = $L(".lyteFileUpdList"  , this.$node)[0];
			if(elem){
				elem.scrollTop = elem.scrollHeight;
			}
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
	bindSorting : function(){
		var elem = $L(".cruxFileUploadSortableDiv" , this.$node) , _self = this , drag ;
		if(elem[0]){
			elem.sortable( "destory" );
			elem.sortable({
				containment : "body",
				appendTo : "body",
				selectedClass : "cxFileUpdListSortableSelectedElem",
				helper : function(elem){
					var clone = elem.cloneNode(true);
					drag = elem;
					return clone;
				},
				onDrag : function(){
					drag.style.display = 'none';
				},
				onDragStart : function(draggableElement,source) {
					var dragClass = _self.data.cxPropSortableDragClass;
					if(dragClass){
						draggableElement.classList.add(dragClass);
					}
					source.classList.add('cxFileUpListOnDrag');
				},
				onDrop : function(droppedElement , destinantion , belowElement , fromIndex , toIndex , source){
					if(_self.getMethods('onSortableDrop')){
						/**
						 * This event is triggered when the user have dropped the file list and the DOM position has changed.
						 * @method onSortableDrop
						 * @author manikaraja.p
						 * @version 1.0.0
						 */
						_self.executeMethod('onSortableDrop' ,fromIndex , toIndex );
					}
					// var dragClass = self.data.cxPropSortableDragClass;
					if(fromIndex === toIndex){
                        droppedElement.remove();
                    }else{
                        droppedElement.replaceWith(drag);
                    }
					drag.style.display = '';
					source.classList.remove('cxFileUpListOnDrag');
					// droppedElement.classList.remove('cxFileUplListSortableSelectItemOndrag');
				}
			});
		}
	}
},{mixins : ["crux-image-preview-util" , "crux-fileupload-mixin"]});
