/**
 * @component crux-image-component
 * @author manikaraja.p
 * @version 1.0.0
 * @summary Image component used to upload the image from local and listing that images. And also given the preview, cropper and sequence support.
 * @notes Must be pass cxPropId in this component.
 */
Lyte.Component.register("crux-image-component", {
_template:"<template tag-name=\"crux-image-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" onfocus=\"{{action('focusOnViewElement')}}\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"create\"></template><template case=\"edit\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <span class=\"cxElementLabel cxFieldLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB cxVam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </span> </template></template> <div class=\"cxElementValue {{if(cxPropReadonly,'cxElementReadOnly','')}} {{if(cxPropDisabled,'cxElementDisabled','')}} {{cxPropWrapperClass}}\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"cxElementsTooltip {{cxPropTooltipClass}}\"> <div @class=\"cxYieldObserver {{cxPropDivWrapperClass}}\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <div class=\"cxImageElemWrapper {{if(expHandlers(images.length,'>',0),'cxWrapperElemWithImage','')}} {{if(cxPropMinified,'cxSFImgElemWrapper','')}} {{if(cxPropReadonly,'cxImgElemReadOnly','')}} {{cxPropChildWrapperClass}} {{mandatoryClass}}\"> <template is=\"if\" value=\"{{negate(cxPropMinified)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(images.length,'===',1),'&amp;&amp;',expHandlers(expHandlers(images[0].cxValidationStatus,'===','waiting_for_approval'),'||',expHandlers(images[0].cxValidationStatus,'===','processing')))}}\"><template case=\"true\"> <span data-zcqa=\"{{if(ifEquals(images[0].cxValidationStatus,'waiting_for_approval'),'openPreview_view_waiting_for_approval_0','openPreview_view_processing_0')}}\" class=\"cxMultiImageListViewCont cxImgCompValidationCont {{if(ifEquals(images[0].cxValidationStatus,'waiting_for_approval'),'cxImgCompValidationWaiting','cxImgCompValidationProcessing')}}\" onclick=\"{{action('validationImageClick',images[0])}}\" lt-prop-title=\"{{cxPropValidationTooltip}}\" lt-prop-tooltip-style=\"font-size: 1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;, &quot;margin&quot; : &quot;2px&quot;, &quot;maxdisplaytime&quot;:3000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(images.length,'>',0)}}\"><template case=\"true\"> <div class=\"cxMultiImageList {{cxPropClass}}\"> <template is=\"for\" items=\"{{images}}\" item=\"item\" index=\"index\"> <div class=\"cxMultiImageSelector_{{cxPropId}} cxMultiImageListViewCont {{item.cxPropClass}} imagePreviewSelector\" lt-prop-title=\"{{item.name}}\" lt-prop-tooltip-style=\"font-size: 1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;, &quot;margin&quot; : &quot;2px&quot;, &quot;maxdisplaytime&quot;:3000}\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-dlink=\"{{item[cxPropDownloadKey]}}\" data-lytecbox-href=\"{{item[cxPropPreviewUrlKey]}}\" data-sel-image=\"{{index}}\"> <template is=\"if\" value=\"{{if(item[cxPropSourceKey],true)}}\"><template case=\"true\"><div data-zcqa=\"cxImagePreview_{{index}}\" onclick=\"{{action('hoverContentClick',event,item,index)}}\" class=\"cxImgHoverContWrapper\"> <span class=\"cxImageContHoverCont\"></span> <template is=\"if\" value=\"{{negate(cxPropReadonly)}}\"><template case=\"true\"><span class=\"cxImgCompDeleteIcon\" data-zcqa=\"fieldView_delete_{{index}}\"></span></template></template> </div></template></template> <template is=\"if\" value=\"{{item[cxPropSourceKey]}}\"><template case=\"true\"><img src=\"{{item[cxPropSourceKey]}}\" class=\"cxListPreviewImage\" data-zcqa=\"cxImage_{{cxPropId}}_{{index}}\" alt=\"{{item[cxPropSourceKey]}}\" data-image-mode=\"{{cxPropDataImageMode}}\"></template><template case=\"false\"><span class=\"cxImgCompLoader\"></span></template></template> </div> </template> </div> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(images.length,'!'),'||',images[0][cxPropSourceKey])}}\"><template case=\"true\"> <lyte-button class=\"cxMultiImgUploadBtn\" lt-prop-size=\"small\" lt-prop-class=\"{{cxPropButtonClass}}\" lt-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-appearance=\"default\" lt-prop-name=\"{{cxPropName}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-disabled=\"{{cruxOr(disableBtn,cxPropReadonly,cxPropDisabled)}}\" onclick=\"{{action('openUploadPopup')}}\" lt-prop-title=\"{{if(cxPropReadonly,tooltip,if(maximumCountReached,cruxGetI18n('crm.imageupload.allowed.field.length',cxPropAllowedCount),''))}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cxPropPlaceholder}} </template> </lyte-button> </template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"{{if(cxPropDisabledIconClass,concat(cxPropDisabledIconClass,' cxElementsDisabledIcon'),'cxImgListLockIcon cxImgListLockIconDefault')}}\" lt-prop-title=\"{{tooltip}}\"></span></template></template> </template><template case=\"false\"> <div class=\"cxSFImgListCont {{if(ifNotEquals(images.length,0),'cxSFImgListContExpand','')}}\"> <template is=\"if\" value=\"{{ifEquals(images.length,0)}}\"><template case=\"true\"> <div class=\"cxSFImgListPlaceholder\" onclick=\"{{action('openUploadPopup')}}\">{{cxPropPlaceholder}}</div> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropExpandImageView}}\"><template case=\"true\"> <div class=\"cxMultiImageList {{cxPropClass}}\"> <template is=\"for\" items=\"{{images}}\" item=\"item\" index=\"index\"> <div class=\"cxMultiImageSelector_{{cxPropId}} cxMultiImageListViewCont {{item.cxPropClass}} imagePreviewSelector\" lt-prop-title=\"{{item.name}}\" lt-prop-tooltip-style=\"font-size: 1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;, &quot;margin&quot; : &quot;2px&quot;, &quot;maxdisplaytime&quot;:3000}\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-dlink=\"{{item[cxPropDownloadKey]}}\" data-lytecbox-href=\"{{item[cxPropPreviewUrlKey]}}\" data-sel-image=\"{{index}}\"> <template is=\"if\" value=\"{{cruxAnd(negate(cxPropReadonly),item[cxPropSourceKey])}}\"><template case=\"true\"><div class=\"cxImgHoverContWrapper\" data-zcqa=\"cxImagePreview_{{index}}\" onclick=\"{{action('hoverContentClick',event,item,index)}}\"> <span class=\"cxImageContHoverCont\"></span> <span class=\"cxImgCompDeleteIcon\" data-zcqa=\"fieldView_delete_{{index}}\"></span> </div></template></template> <template is=\"if\" value=\"{{item[cxPropSourceKey]}}\"><template case=\"true\"><img src=\"{{item[cxPropSourceKey]}}\" class=\"cxListPreviewImage\" data-zcqa=\"cxImage_{{cxPropId}}_{{index}}\" alt=\"{{item[cxPropSourceKey]}}\" data-image-mode=\"{{cxPropDataImageMode}}\"></template><template case=\"false\"><span class=\"cxImgCompLoader\"></span></template></template> </div> </template> </div> </template><template case=\"false\"> <div onclick=\"{{action('expandView')}}\" lt-prop-title=\"click to view images\" class=\"cxSFImgListCollapseView cxLink\"><span class=\"cruxSprite cxGalleryImageIcon cxSFShowMoreImageIcon\"></span>{{cruxGetI18n(\"crm.label.subform.row.show.all\",images.length)}}</div> </template></template></template></template> </div> <div onclick=\"{{action('openUploadPopup')}}\" class=\"cxSFImgListUploadIconDiv\" data-zcqa=\"{{cxPropZcqa}}\"> <span class=\"{{if(cxPropReadonly,'cxImgListLockIcon cxSFImgListLockIcon','cxSFImgListUploadIcon')}} {{if(cxPropShowDisabledIcon,cxPropDisabledIconClass,'')}}\"></span> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-image-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template><template case=\"view\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','single')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(images,'&amp;&amp;',images.length)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <a onclick=\"{{action('showImageOptions')}}\" lt-prop-title=\"{{tooltip}}\"> <div class=\"cxImageViewWrap {{cxPropClass}}\"> <div class=\"cxImageViewOverlay cxFlexCenter\"> <div class=\"cxImageCameraIcon\"></div> </div> <template is=\"if\" value=\"{{images[0].alphabet}}\"><template case=\"true\"> <div class=\"cxImageViewNoImage {{noImageClass}}\"> {{images[0].alphabet}} </div> </template><template case=\"false\"><template is=\"if\" value=\"{{images[0].placeholderImage}}\"><template case=\"true\"> <span class=\"{{images[0].placeholderImageClass}}\"></span> </template><template case=\"false\"> <img src=\"{{images[0][cxPropSourceKey]}}\" alt=\"{{images[0][cxPropSourceKey]}}\" class=\"cxImageViewImgElem {{images[0].cxPropClass}} {{cxPropClass}}\" data-zcqa=\"{{images[0][cxPropZcqaSelector]}}\" data-image-mode=\"{{cxPropDataImageMode}}\"> </template></template></template></template> </div> </a> <div style=\"padding: 0px;\" class=\"cxSingleImgContainer_{{cxPropId}}\" data-lytecbox-title=\"{{images[0].name}}\" data-lytecbox-dlink=\"{{images[0][cxPropDownloadKey]}}\" data-lytecbox-href=\"{{images[0][cxPropSourceKey]}}\" data-sel-image=\"1\"></div> <lyte-menu on-before-open=\"{{method('menuOnBeforeOpen')}}\" on-open=\"{{method('attachLinksOpen')}}\" on-close=\"{{method('onAttachMenuClose')}}\" lt-prop-wrapper-class=\"attachLinksMenu\" lt-prop-yield=\"true\" lt-prop-query=\".cxSingleImgContainer_{{cxPropId}}\" lt-prop-event=\"keyup\" lt-prop-show=\"{{singleOptionShow}}\" lt-prop-freeze=\"false\" id=\"cxImgSingleOptions_{{cxPropId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxImgOptionMenu\" data-zcqa=\"cxImgOptionMenu\"> <template is=\"for\" items=\"{{cxPropMenuOptions}}\" item=\"item\" index=\"index\"> <lyte-menu-item id=\"{{item.system}}Image\" onclick=\"{{action('singleImageDrop',item.system)}}\" class=\"crm-font-regular\">{{item.display}}</lyte-menu-item> </template> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} </lyte-menu-body> </template> </lyte-menu> </template><template case=\"false\"> <img src=\"{{concat(imgLoc,'/cx_user_profile.svg')}}\" alt=\"{{concat(imgLoc,'/cx_user_profile.svg')}}\" class=\"{{cxPropClass}}\" data-image-mode=\"{{cxPropDataImageMode}}\"> </template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <div class=\"cxImageElemWrapper cxImageElemViewWrapper {{if(expHandlers(images.length,'>',0),'cxWrapperElemWithImage','')}} {{cxPropWrapperClass}} {{mandatoryClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMinified,'&amp;&amp;',expHandlers(images.length,'===',0))}}\"><template case=\"true\"> <span class=\"cxImgCompViewEmptyIcon\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(images.length,'===',1),'&amp;&amp;',expHandlers(expHandlers(images[0].cxValidationStatus,'===','waiting_for_approval'),'||',expHandlers(images[0].cxValidationStatus,'===','processing')))}}\"><template case=\"true\"> <span data-zcqa=\"{{if(ifEquals(images[0].cxValidationStatus,'waiting_for_approval'),'openPreview_view_waiting_for_approval_0','openPreview_view_processing_0')}}\" class=\"cxMultiImageListViewCont cxImgCompValidationCont {{if(ifEquals(images[0].cxValidationStatus,'waiting_for_approval'),'cxImgCompValidationWaiting','cxImgCompValidationProcessing')}}\" onclick=\"{{action('validationImageClick',images[0])}}\" lt-prop-title=\"{{cxPropValidationTooltip}}\" lt-prop-tooltip-style=\"font-size: 1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;, &quot;margin&quot; : &quot;2px&quot;, &quot;maxdisplaytime&quot;:3000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(images.length,'>',0)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxOr(negate(cxPropMinified),cxPropExpandImageView)}}\"><template case=\"true\"> <div class=\"cxMultiImageList\"> <template is=\"for\" items=\"{{images}}\" item=\"item\" index=\"index\"> <div class=\"cxMultiImageSelector_{{cxPropId}} cxMultiImageListViewCont {{item.cxPropClass}} imagePreviewSelector\" lt-prop-title=\"{{item.name}}\" lt-prop-tooltip-style=\"font-size: 1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;, &quot;margin&quot; : &quot;2px&quot;, &quot;maxdisplaytime&quot;:3000}\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-dlink=\"{{item[cxPropDownloadKey]}}\" data-lytecbox-href=\"{{item[cxPropPreviewUrlKey]}}\" data-sel-image=\"{{index}}\"> <div class=\"cxImgHoverContWrapper\" data-zcqa=\"cxImagePreview_{{index}}\" onclick=\"{{action('hoverContentClick',event,item,index)}}\"> <span class=\"cxImageContHoverCont\"></span> <span class=\"cxImgCompPreviewIcon\"></span> </div> <template is=\"if\" value=\"{{item[cxPropSourceKey]}}\"><template case=\"true\"><img src=\"{{item[cxPropSourceKey]}}\" alt=\"{{item[cxPropSourceKey]}}\" class=\"cxListPreviewImage {{item.cxPropClass}} {{cxPropClass}}\" data-zcqa=\"cxImage_{{cxPropId}}_{{index}}\" data-image-mode=\"{{cxPropDataImageMode}}\"></template><template case=\"false\"><span class=\"cxImgCompLoader\"></span></template></template> </div> </template> </div> </template><template case=\"false\"> <div lt-prop-title=\"click to view images\" class=\"cxSFImgListCollapseView cxLink\" onclick=\"{{action('expandView')}}\"><span class=\"cruxSprite cxGalleryImageIcon cxSFShowMoreImageIcon\"></span>{{cruxGetI18n(\"crm.label.subform.row.show.all\",images.length)}}</div> </template></template> </template><template case=\"false\"> <span class=\"cxImgCompViewEmptyIcon\"></span> </template></template></template></template></template></template> </div> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </template></template> </template></template> <template is=\"if\" value=\"{{renderPreviewComp}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-image-preview cx-prop-images=\"{{images}}\"> <template is=\"registerYield\" yield-name=\"previewHeaderYield\" from-parent=\"\"></template> </crux-image-preview> </template></template> <template is=\"if\" value=\"{{uploadImage}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-upload-modal cx-prop-ajax=\"{{cxPropAjax}}\" cx-prop-select-area=\"{{selectAreaMsg}}\" cx-prop-auto-upload=\"{{if(ifEquals(cxPropType,'single'),false,true)}}\" cx-prop-modal-properties=\"{{cxPropModalProperties}}\" cx-prop-size-selector=\"{{cxPropSizeSelector}}\" cx-prop-progress-status-colours=\"{{cxPropProgressStatusColours}}\" cx-prop-param-name=\"{{cxPropParamName}}\" cx-prop-max-files-count=\"{{cxPropAllowedCount}}\" cx-prop-allowed-single-file-size=\"{{cxPropAllowedSingleFileSize}}\" cx-prop-allowed-total-size=\"{{cxPropAllowedTotalSize}}\" cx-prop-id=\"{{cxPropId}}\" cx-prop-source-key=\"{{cxPropSourceKey}}\" cx-prop-preview-url-key=\"{{cxPropPreviewUrlKey}}\" cx-prop-download-key=\"{{cxPropDownloadKey}}\" cx-prop-file-type=\"image\" cx-prop-min-size=\"{{cxPropMinSize}}\" cx-prop-max-size=\"{{cxPropMaxSize}}\" cx-prop-max-size-reach-tooltip=\"{{cruxGetI18n('crm.ImageuploadField.size.limit',allowedSizeInt)}}\" cx-prop-max-count-reach-tooltip=\"{{cruxGetI18n('crm.imageupload.allowed.field.length',cxPropAllowedCount)}}\" cx-prop-progress-tooltip=\"{{cruxGetI18n('crm.imageupload.wait.msg')}}\" cx-prop-aspect-ratio=\"{{cxPropAspectRatio}}\" on-cx-file-upload-success=\"{{method('imageUploadComplete')}}\" cx-prop-type=\"{{cxPropType}}\" cx-prop-wrapper-class=\"{{cxPropModalWrapperClass}}\" cx-prop-accepted-types=\"{{cxPropAcceptedTypes}}\" cx-prop-title=\"{{fileUploadTitle}}\" cx-prop-uploaded-count-title=\"{{cruxGetI18n(&quot;crm.image.uploaded&quot;)}}\" on-confirm=\"{{method('setImages')}}\" on-file-success=\"{{method('onFileSuccessFn')}}\" on-crop-success=\"{{method('onCropSuccessMethod')}}\" on-load=\"{{method('onPreviewLoadFn')}}\" on-add=\"{{method('onAddFile')}}\" on-before-show=\"{{method('onBeforeShowModal')}}\" on-remove=\"{{method('onRemoveFile')}}\" on-close=\"{{method('onCloseModalFn')}}\"> <template is=\"registerYield\" yield-name=\"previewHeaderYield\" from-parent=\"\"></template> </crux-upload-modal> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"create":{"dynamicNodes":[],"additional":{"next":"edit"}},"edit":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[3,1,3,1]},{"type":"if","position":[3,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,3]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[7]},{"type":"registerYield","position":[7,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[7]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","lyteViewPort","cxPropFrom","cxPropDisabled","cxPropClass","cxPropValue","cxPropId","cxPropName","images","imgLoc","cxPropField","cxPropFieldKey","cxPropShowWarning","cxPropWarningMessage","cxPropWarningIconClass","cxPropLabelClass","cxPropAllowedCount","cxPropAllowedTotalSize","cxPropAllowedSingleFileSize","cxPropPlaceholder","isError","cxPropErrorMessage","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","cxPropErrorYield","cxPropErrorClass","cxPropErrorSpanClass","cxPropClearErrorMessage","cxPropZcqa","cxPropTooltip","cxPropTooltipConfig","cxPropTooltipClass","cxPropInfoTooltip","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropMandatory","maximumCountReached","cxPropZcqaSelector","cxPropDownloadKey","cxPropPreviewUrlKey","cxPropSourceKey","cxPropReadonly","cxPropType","singleOptionShow","renderPreviewComp","uploadImage","fileUploadTitle","cxPropMenuOptions","tooltip","cxPropPrefixYield","cxPropTitle","cxPropAspectRatio","cxPropMinSize","cxPropMaxSize","cxPropPreviewZcqa","cxPropAjax","cxPropParamName","cxPropValidationTooltip","cxPropWrapperClass","cxPropTabindex","cxPropTabIndex","cxPropMinified","cxPropExpandImageView","cxPropModalWrapperClass","mandatoryClass","cxPropModalProperties","cxPropButtonClass","cxPropChildWrapperClass","cxPropSizeSelector","cxPropAcceptedTypes","cxPropProgressStatusColours","cxPropDataImageMode","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropAriaErrorProperties","allowedSizeInt","cxPropDivWrapperClass","cxPropSuffixYield","cxPropButtonYield"],
_observedAttributesType :["object","object","boolean","string","boolean","string","array","string","string","array","string","object","string","boolean","string","string","string","number","string","string","string","boolean","string","string","string","boolean","string","string","boolean","string","string","string","string","string","boolean","boolean","string","boolean","boolean","string","string","string","string","boolean","string","boolean","boolean","boolean","string","array","string","boolean","string","string","number","number","string","object","string","string","string","string","string","boolean","boolean","string","string","object","string","string","string","string","object","boolean","string","object","string","string","object","string","string","boolean","boolean"],
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
			 * Set to true to render component on viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author manikaraja.p
			 */
			lyteViewPort 			: Lyte.attr("boolean", {"default" : false}),//No I18n
			/**
			 * The component given a support for create, edit and view.
			 * @componentProperty { string } cxPropFrom
			 * @author manikaraja.p
			 */
			cxPropFrom 				: Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * This property disables the component.
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author manikaraja.p
			 */
			cxPropDisabled 			: Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Class set to this wrapper.
			 * @componentProperty { string } cxPropClass
			 * @author manikaraja.p
			 */
			cxPropClass 			: Lyte.attr("string", {'default': ''}),//No I18n
			/**
			 * The already saved images should pass using this property.
			 * @componentProperty { array } cxPropValue
			 * @author manikaraja.p
			 */
			cxPropValue 			: Lyte.attr("array", {'default': []}),//No I18n
			/**
			 * Id set to this component.
			 * @componentProperty { string } cxPropId
			 * @author manikaraja.p
			 */
			cxPropId 				: Lyte.attr('string',{default : 'cxImage1'}), //no i18n
			/**
			 * Name set to component.
			 * @componentProperty { string } cxPropName
			 * @author manikaraja.p
			 */
			cxPropName				: Lyte.attr("string", {"default": ""}), //NO I18n
			images 					: Lyte.attr("array", {'default': []}),//No I18n
			imgLoc 					: Lyte.attr("string", {default : "dist/components/images"}),//No I18n
			/**
			 * Field details
			 * @componentProperty { object } cxPropField
			 * @author manikaraja.p
			 */
			cxPropField				: Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * The selector which determines which key holds the field label
			 * @componentProperty { string } cxPropFieldKey
			 * @author manikaraja.p
			 */
			cxPropFieldKey			: Lyte.attr("string", {"default": ""}), //No I18n
			/**
			 * Set to true to display warning message below element.
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author manikaraja.p
			 */
			cxPropShowWarning 		: Lyte.attr("boolean", {default : false}),
			/**
			 * Warning message displayed below element
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
			 * Class set to field label
			 * @componentProperty { string } cxPropLabelClass
			 * @author manikaraja.p
			 */
			cxPropLabelClass		: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * It's used to handle the number of images allowed in this component.
			 * @componentProperty { number } cxPropAllowedCount
			 * @author manikaraja.p
			 */
			cxPropAllowedCount 		: Lyte.attr('number',{default : 10}), //no i18n
			/**
			 * The selected files exceeds the given total files size, then the files will be rejected. The onReject method will be triggered.
			 * @componentProperty { string } cxPropAllowedTotalSize
			 * @author manikaraja.p
			 */
			cxPropAllowedTotalSize 	: Lyte.attr('string',{default : '20MB'}), //no i18n
			/**
			 * Files exceeds given size will be rejected. The onReject method will be triggered.
			 * @componentProperty { string } cxPropAllowedSingleFileSize
			 * @author manikaraja.p
			 */
			cxPropAllowedSingleFileSize : Lyte.attr('string'), //no i18n
			/**
			 * Sets placeholder for the button
			 * @componentProperty { string } cxPropPlaceholder
			 * @author manikaraja.p
			 */
			cxPropPlaceholder 		: Lyte.attr("string" , {default : _cruxUtils.getI18n('crm.FileuploadField.addNewImage')}),//No I18n
			isError 				: Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Message displayed below component on error
			 * @componentProperty { string } cxPropErrorMessage
			 * @author manikaraja.p
			 */
			cxPropErrorMessage 		: Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Prefix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author manikaraja.p
			 */
			cxPropErrorZcqaPrefix 	: Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * Suffix set to zcqa of error message
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author manikaraja.p
			 */
			cxPropErrorZcqaSuffix 	: Lyte.attr("string", {default : "Error"}),//No I18n
			/**
			 * Set to true to render custom error message
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author manikaraja.p
			 */
			cxPropErrorYield 		: Lyte.attr("boolean", {default : false}), //No i18n
			/**
			 * Class set to error message
			 * @componentProperty { string } cxPropErrorClass
			 * @author manikaraja.p
			 */
			cxPropErrorClass 		: Lyte.attr("string"),//No I18n
			/**
			 * Class set to span of error message
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author manikaraja.p
			 */
			cxPropErrorSpanClass 	: Lyte.attr("string"),//No I18n
			/**
			 * Set to false to prevent clearing of error message on change of value
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author manikaraja.p
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * Zcqa set to lyte-button
			 * @componentProperty { string } cxPropZcqa
			 * @author manikaraja.p
			 */
			cxPropZcqa 				:  Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltip
			 * @author manikaraja.p
			 */
			cxPropTooltip			: Lyte.attr("string"), //NO i18n
			/**
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author manikaraja.p
			 */
			cxPropTooltipConfig 	: Lyte.attr("string", {default : '{"position": "followcursor", "appearance": "box"}'}),//No I18n
			/**
			 * @componentProperty { string } cxPropTooltipClass
			 * @author manikaraja.p
			 */
			cxPropTooltipClass 		: Lyte.attr("string"),//No I18n
			/**
			 * The info message displayed on hover of the info icon next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author manikaraja.p
			 */
			cxPropInfoTooltip		: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Set to true to display info icon next to field label
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author manikaraja.p
			 */
			cxPropViewInfoTooltip 	: Lyte.attr("boolean", {default : false}),
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
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author manikaraja.p
			 */
			cxPropMandatory 		: Lyte.attr("boolean"),
			maximumCountReached 	: Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * data-zcqa selector key for the every single image object.
			 * @componentProperty { string } cxPropZcqaSelector
			 * @author manikaraja.p
			 */
			cxPropZcqaSelector 		: Lyte.attr('string',{default : 'cxPropZcqa'}), //no i18n
			/**
			 * Download url key for the every single image object. If you pass this key, We'll show the download icon.
			 * @componentProperty { string } cxPropDownloadKey
			 * @author manikaraja.p
			 */
			cxPropDownloadKey 		: Lyte.attr('string',{default : 'download_url'}), //no i18n
			/**
			 * Preview url key for the every single image object. 
			 * @componentProperty { string } cxPropPreviewUrlKey
			 * @author manikaraja.p
			 */
			cxPropPreviewUrlKey 	: Lyte.attr('string',{default : 'preview_url'}), //no i18n
			/**
			 * Image source url key.
			 * @componentProperty { string } cxPropSourceKey
			 * @author manikaraja.p
			 */
			cxPropSourceKey 		: Lyte.attr('string',{default : 'src'}), //no i18n
			/**
			 * It makes the component as readonly
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author manikaraja.p
			 */
			cxPropReadonly 			: Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * It defines the image component is single/multiple.
			 * @componentProperty { string } cxPropType
			 * @author manikaraja.p
			 */
			cxPropType 				: Lyte.attr('string',{default : 'multiple'}), //no i18n
			singleOptionShow 		: Lyte.attr('boolean',{default : false}), //no i18n
			renderPreviewComp 		: Lyte.attr('boolean',{default : false}),
			uploadImage 			: Lyte.attr('boolean',{default : false}),
			fileUploadTitle 		: Lyte.attr('string',{default : _cruxUtils.getI18n('crm.attach.upload.image')}), //no i18n
			/**
			 * This options will show while no value selected in the single image upload.
			 * @componentProperty { array } cxPropMenuOptions
			 * @author manikaraja.p
			 */
			cxPropMenuOptions 		: Lyte.attr('array',{default : [{system : 'preview',display : _cruxUtils.getI18n('crm.recordImage.previewimage')},{system : 'upload',display : _cruxUtils.getI18n('crm.FileuploadField.addNewImage')},{system : 'remove',display : _cruxUtils.getI18n('crm.fileuploader.removefile')}]}),
			tooltip 				: Lyte.attr("string"),
			cxPropPrefixYield : Lyte.attr('boolean',{default : false}),
			cxPropTitle : Lyte.attr('string'), //no i18n
			/**
			 * This aspect ratio will set while opening the preview.
			 * @componentProperty { string } cxPropAspectRatio
			 * @author manikaraja.p
			 */
			cxPropAspectRatio 		: Lyte.attr('string',{default : '1:1'}), //no i18n
			/**
			 * It defines the minimum size of the image preview.
			 * @componentProperty { number } cxPropMinSize
			 * @author manikaraja.p
			 */
			cxPropMinSize 			: Lyte.attr('number',{default : 'auto'}), //no i18n
			/**
			 * It defines the maximum size of the image preview.
			 * @componentProperty { number } cxPropMaxSize
			 * @author manikaraja.p
			 */
			cxPropMaxSize 			: Lyte.attr('number',{default : 'auto'}), //no i18n
			/**
			 * The zcqa set for preview element.
			 * @componentProperty { string } cxPropPreviewZcqa
			 * @author manikaraja.p
			 */
			cxPropPreviewZcqa 		: Lyte.attr("string" , {default : "openPreview_view"}),//No I18n
			/**
			 * cx-prop-ajax is an object, which is similar to $L.ajax first argument.
			 * @componentProperty { object } cxPropAjax
			 * @author manikaraja.p
			 */
			cxPropAjax		  		: Lyte.attr('object'),//No I18n
			/**
			 * Files are added to formdata in given param key
			 * @componentProperty { string } cxPropParamName
			 * @author manikaraja.p
			 */
			cxPropParamName	  		: Lyte.attr("string" , {default : "file"}),//No I18n
			/**
			 * This tooltip will show the image is in validating state.
			 * @componentProperty { string } cxPropValidationTooltip
			 * @author manikaraja.p
			 */
			cxPropValidationTooltip	: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * It will be added to the wrapper div element over the component
			 * @componentProperty { string } cxPropWrapperClass
			 * @author manikaraja.p
			 */
			cxPropWrapperClass 		: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 *  It sets tab index for button
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 */
			cxPropTabindex 			: Lyte.attr("string"),//No I18n
			/**
			 *  It sets tab index for button
			 * @componentProperty { string } cxPropTabIndex
			 * @author manikaraja.p
			 */
			cxPropTabIndex 			: Lyte.attr("string"),//No I18n
			/**
			 * If this property is true, The component button is hide and only show the count of the uploaded images.
			 * @componentProperty { boolean } cxPropMinified=false
			 * @author manikaraja.p
			 */
			cxPropMinified			: Lyte.attr('boolean',{default : false}), //No I18n
			/**
			 * This is minified version in expanded view. If it's true, We'll show the images instead of count.
			 * @componentProperty { boolean } cxPropExpandImageView=false
			 * @author manikaraja.p
			 */
			cxPropExpandImageView	: Lyte.attr('boolean',{default : false}), //No I18n
			/**
			 * This class will be added for modal wrapper.
			 * @componentProperty { string } cxPropModalWrapperClass
			 * @author manikaraja.p
			 */
			cxPropModalWrapperClass	: Lyte.attr("string" , {default : ""}),//No I18n
			mandatoryClass			: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * All modal properties can pass using this property.
			 * @componentProperty { object } cxPropModalProperties
			 * @author manikaraja.p
			 */
			cxPropModalProperties	: Lyte.attr('object',{default : {}}),//No I18n
			/**
			 * this class will be applied for upload button
			 * @componentProperty { string } cxPropButtonClass
			 * @author manikaraja.p
			 */
			cxPropButtonClass		: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * @componentProperty { string } cxPropChildWrapperClass
			 * @author manikaraja.p
			 */
			cxPropChildWrapperClass	: Lyte.attr("string" , {default : ""}),//No I18n
			/**
			 * This key used for get the size of the file object.
			 * @componentProperty { string } cxPropSizeSelector
			 * @author manikaraja.p
			 */
			cxPropSizeSelector		: Lyte.attr( 'string', { "default" : 'stream' } ),//no i18n
			/**
			 * It allows to select files with given types
			 * @componentProperty { string } cxPropAcceptedTypes
			 * @author manikaraja.p
			 */
			cxPropAcceptedTypes 	: Lyte.attr('string',{default : '.png,.jpg,.jpeg,.bmp,.gif,.PNG,.JPG,.JPEG,.BMP,.GIF'}), //no i18n //temp fix for caps check. It should check for lyte file upload.
			/**
			 * The progress icon colours of count, size and files list.
			 * @componentProperty { object } cxPropProgressStatusColours
			 * @author manikaraja.p
			 * @version 1.0.0
			 */
			cxPropProgressStatusColours : Lyte.attr('object' , {'default' : {count : '#3fbd5f' , size : "#338CF0" , list : "#338CF0"}}), //no i18n
			cxPropDataImageMode		: Lyte.attr('boolean',{default : false}), //No I18n
			// cxPropDisableEvents     : Lyte.attr('boolean',{default : false}), //No I18n
			cxPropDataTabindex : Lyte.attr("string"),
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
			/**
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author mariswaran.sv
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			allowedSizeInt : Lyte.attr( 'string'),//no i18n
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropButtonYield: Lyte.attr("boolean", { default: false })
		}
	},
	init : function(){
		if(typeof crmConstants != "undefined"){
			this.data.imgLoc = crmConstants.fp_imagesStaticPathForLyte; //No I18n
		}
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.data.cxPropType == 'single'){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			this.setData('fileUploadTitle', this.data.cxPropTitle ? this.data.cxPropTitle : _cruxUtils.getI18n('crm.general.select.photo'));
			if(this.data.cxPropDisabled){
				this.setData("tooltip", _cruxUtils.getI18n("crm.lable.read.only"));
			}
		}
		this.setData('noImageClass',"cxImageViewNoImage"+(Math.floor(Math.random() * 9) + 1) );
		// if( this.data.cxPropReadonly || this.data.cxPropDisabled ){
		// 	this.setData('disableBtn', true);
		// }
		// if(this.data.cxPropDisabled){
		// 	this.setData('cxPropShowDisabledIcon', true); //No I18n
		// }
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		if(this.data.cxPropAllowedTotalSize){
			this.data.allowedSizeInt = this.data.cxPropAllowedTotalSize.match(/[0-9]+/g)[0];
		}
		if(this.data.cxPropType === "multiple" ){
			var msg = {};
			msg.primary_message =_cruxUtils.getI18n('crm.imageupload.drag.drop.here') ; //no i18n
			// msg.secondary_message = "<div class='cxImgUploadSecMsgFirstDiv'>Total size is limited to <span class='cxImgUpFontBold'>"+this.allowedSizeInt+" MB</span> or a maximum of <span class='cxImgUpFontBold'>" + this.data.cxPropMaxFilesCount + "</span> images.</div>"; //no i18n
			msg.supported_message = _cruxUtils.getI18n('crm.image.supported.formats');
			// msg.secondary_message = "<div>Total size is limited to 20 MB or a maximum of 10 images.</div><div style='text-align:center'>"+ _cruxUtils.getI18n('crm.image.supported.formats') +"</div>"
			//_cruxUtils.getI18n("crm.attach.upload.userinfo",[this.allowedSizeInt,this.data.cxPropMaxFilesCount])
			msg.cxPropShowSecondaryMessage = false;
			msg.icon_class = "cxImageUploadHeadIcon";
			msg.browse_text = _cruxUtils.getI18n('Browse');
			this.setData('selectAreaMsg' ,msg ); //no i18n
			if(this.data.cxPropFrom === "create" && this.data.cxPropField && !this.data.cxPropAjax && typeof crmZgid && crmZgid){
				var url = "/crm/org" + crmZgid + "/fileattach.do?action=imageUFBlobAttach&fieldId=" + this.data.cxPropField.id + "&module=" + this.data.cxPropField.module[0].module_name + "&type=image";	
				var ajax = {'url' : url , 'headers' : {'X-ZCSRF-TOKEN' : csrfParamName + "=" + csrfToken}};
				this.setData('cxPropAjax' , ajax);
			}
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		}
		//on process
	},
	observeCountReach : function(){
		if(this.data.maximumCountReached){
			this.setData('disableBtn', true);
		}else{
			this.setData('disableBtn', false);
		}
	}.observes('maximumCountReached'),
	convertToBytes : function(){
		this.bytesConversion();
	 }.observes("cxPropAllowedTotalSize").on("didConnect"),
	descriptionChange : function(id , newValue){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.data.cxPropFrom === 'view'){
			this.manualSwitch = true;
		}
		if(this.getMethods('onEdit')){
			/**
			 * This callback will trigger on edit the image.
			 * @method onEdit
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod('onEdit', "description" , id , newValue);
		}
		if(this.getMethods('onValueChange')){
			/**
			 * This callback will trigger while changing the image values.
			 * @method onValueChange
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } files
			 */

			this.executeMethod('onValueChange', this.getValue());
		}
		// var files = this.data.images;
		// var file = files.find(function(fi){return fi.id === id});
		// Lyte.objectUtils(file , "add" , "Description" , newValue); //no i18n
		// file.isDescChanged = true;
	},
	nameChange : function(id , newValue){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.data.cxPropFrom === 'view'){
			this.manualSwitch = true;
		}
		if(this.getMethods('onEdit')){
			/**
			 * This callback will trigger on edit the image.
			 * @method onEdit
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod('onEdit', "name" ,id , newValue );
		}
		if(this.getMethods('onValueChange')){
			/**
			 * This callback will trigger while changing the image values.
			 * @method onValueChange
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } files
			 */

			this.executeMethod('onValueChange', this.getValue());
		}
		// var files = this.data.images;
		// var file = files.find(function(fi){return fi.id === id});
		// Lyte.objectUtils(file , "add" , "name" , newValue);
		// file.isNameChanged = true;
	},
	onDeleteFromPreview : function(file){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.data.cxPropFrom === 'view'){
			this.manualSwitch = true;
		}
		this.removeTheFile(file);
	},
	onCropSuccessFn : function(res , value , src){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var images = this.data.images;
		var image = images.find(function(x){ return x.id === value.id; });
		Lyte.objectUtils(image , "add" , this.data.cxPropSourceKey ,  src); //no i18n
		if(this.data.cxPropFrom === 'view'){
			this.manualSwitch = true;
		}
		if(this.getMethods('onCropSuccess')){ 
			/**
			 * this callback will trigger after cropped the image.
			 * @method onCropSuccess
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } res
			 * @param { * } value
			 */
			var retValues = this.executeMethod('onCropSuccess', res , value );
		}
		if(retValues){
			var keys = Object.keys(retValues);
			for(var i = 0 ; i < keys.length ; i++){
				Lyte.objectUtils(image , "add" , keys[i] ,  retValues[keys[i]]); //no i18n
			}
		}
		image.isCropped = true;
		Lyte.objectUtils(image , "add" , this.data.cxPropPreviewUrlKey ,  src); //no i18n
		Lyte.objectUtils(image , "add" , this.data.cxPropDownloadKey ,  src); //no i18n
		Lyte.objectUtils(image , "add" , this.data.cxPropSourceKey , src); //no i18n
		if(this.getMethods('onValueChange')){
			/**
			 * This callback will trigger while changing the image values.
			 * @method onValueChange
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } files
			 */

			this.executeMethod('onValueChange', this.getValue());
		}
	},
	closePreviewFn : function(){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onPreviewClose')){
			/**
			 * This callback will trigger while closing the image.
			 * @method onPreviewClose
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			this.executeMethod('onPreviewClose', this.$node);
		}
	},
	onPreviewLoad : function(imageElem , index){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onLoad')){
			this.executeMethod('onLoad', imageElem , index );
		}
	},
	onBeforePreviewImage : function(pos, image , node){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onBeforePreview')){
			this.executeMethod('onBeforePreview', pos , image , node );
		}
	},
	getValue : function(){
		if (this.$node.querySelector("#cruxLoadingElem")) {
			return this.data.cxPropValue;
		}
		var images = this.data.images , values = [];
		var cxValues = this.data.cxPropValue, ids = cxValues.map(function(x){ return x.id; }) , idMap = $L.extend(true , {} ,this.idMapping);
		for(var i = 0 ; i < images.length ; i++){
			var index = ids.findIndex(function(x){ return x === images[i].id; }) , obj = { Sequence_Number : i+1 };
			if(index !== -1){
				// obj.id = images[i].id;
				obj = {id : images[i].id , Sequence_Number : i+1}
				if(images[i].isCropped){
					obj.Encrypted_Id = images[i].encryptedUploadId;
				}
				ids.splice(index , 1);
			}else{
				obj.Encrypted_Id = images[i].encryptedUploadId;
			}
			if(images[i].isDescChanged){
				obj.Description = images[i].description
			}
			if(images[i].isNameChanged){
				obj.File_Name = images[i].name
			}
			values.push(obj);
		}
		if(ids.length){
			var deletedValues = []
			ids.forEach(function(id){
				deletedValues.push({'id' : id , _delete : null});
			})
			values = values.concat(deletedValues);
		}
		return values;
	},
	validate : function(){
		var val = this.data.images , from = this.data.cxPropFrom , maxCount = this.data.cxPropAllowedCount;//No I18n
		if(from === "create" || from === "edit"){
			if(!this.validateMandatory( !val || val.length == 0)){
				this.$node.querySelector("lyte-button").focus();
				return false;
			}else if(maxCount !== undefined && val && val.length > maxCount){
				this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.imageupload.allowed.field.length" , maxCount));//No I18n
				return false;
			}else if(this.data.cxPropAllowedTotalSize){
				var images = this.data.images , sizeSel = this.data.cxPropSizeSelector;
				if(images && images.length){
					var currentSize = images.reduce(function(ac , cur){ return ac + Number(cur[sizeSel]) } , 0);
					if(currentSize > this.totalFilesSizeInBytes){
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.ImageuploadField.size.limit" , this.data.allowedSizeInt));//No I18n
						return false;
					}					
				}
			}
			this.setData("cxPropErrorMessage", "");//No I18n
			return true;
		}
	},
	methods: {
		hideInfoTooltip: function() {
			this.showHideInfoTooltip();
    	},
    	menuOnBeforeOpen : function(){
    		return true
    	},
    	attachLinksOpen : function(){
			return true
    	},
    	onAttachMenuClose : function(){
    		this.setData('singleOptionShow',false)
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
    	},
    	// previewCloseCallback : function(){
    	// 	// this.setData('renderPreviewComp',false)
    	// },
    	imageUploadComplete : function(imageObj){
			var _self = this;
			var imageData = Object.assign({},{id : imageObj[0].id})
			imageData.name = imageObj[0].name;
			imageData.file = imageObj[0];
			imageData[this.data.cxPropSourceKey] = imageObj[0].preview_url;
			imageData[this.data.cxPropDownloadKey] = imageObj[0].preview_url;
    		if(this.getMethods('onImageUpload')){
				/**
				 * This callback will trigger while uplading the image.
				 * @method onImageUpload
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
    			var ret =  this.executeMethod('onImageUpload',[imageData],this);
				if(ret && ret.then){
					return new Promise(function(resolve , reject){
						Promise.resolve(ret).then(function(){
							_self.setData('images',[imageData]);
							resolve();
						},
						function(){
							reject();
							// _self.setData('images',[imageData]);
						});
					});
				}
    		}else{
				this.setData('images',[imageData]);
			}
    	},
		setImages : function(files){
			var images = this.data.images , diff = false ;
			if((images.length !== files.length) || (JSON.stringify(this.data.images) !== JSON.stringify(files))){
				diff = true;
			}
			this.setData('images' , files); //No I18n
			this.setData('maximumCountReached',this.data.images.length >= this.data.cxPropAllowedCount);
			if(diff){
				if(this.getMethods('onValueChange')){
					/**
					 * This callback will trigger while changing the image values.
					 * @method onValueChange
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } files
					 */

					this.executeMethod('onValueChange', this.getValue());
				}
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			this.setData("cxPropExpandImageView" , true);
			if(this.getMethods('onAttach')){
				/**
				 * This callback will trigger while attach the image from modal.
				 * @method onAttach
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
				return this.executeMethod('onAttach', files);
			}
		},
		onFileSuccessFn : function(lxhr , file){
			var responseTxt = {};
			if(lxhr.responseJSON && lxhr.responseJSON.uploadedImages && lxhr.responseJSON.uploadedImages[0]){
				var imageData = lxhr.responseJSON.uploadedImages[0];
				responseTxt = {"encryptedUploadId" : imageData.encryptedUploadId , 'stream' : imageData.stream};
			}
			if(this.getMethods('onFileSuccess')){ //no i18n
				/**
				 * This method is called when an individual file is uploaded successfully in the server.
				 * @method onFileSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } lxhr
				 * @param { * } file
				 */
				var res = this.executeMethod('onFileSuccess',lxhr , file); //no i18n
				if(res && typeof res === 'object'){
					Object.assign(responseTxt , res);
				}
		    }
			return responseTxt;
		},
		onPreviewLoadFn : function(imageElem , index){
			if(this.getMethods('onLoad')){
				this.executeMethod('onLoad', imageElem , index );
			}
		},
		onCropSuccessMethod : function(res , value){
			if(this.getMethods('onCropSuccess')){ 
				/**
				 * this callback will trigger after cropped the image.
				 * @method onCropSuccess
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } res
				 * @param { * } value
				 */
				return this.executeMethod('onCropSuccess', res , value );
			}
		},
		onAddFile : function(file){
			if(this.getMethods('onAddInModal')){
				/**
				 * This callback will trigger on add the image in modal.
				 * @method onAddInModal
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
				this.executeMethod('onAddInModal', file , this.$node);
			}
		},
		onRemoveFile : function(file){
			if(this.getMethods('onRemoveInModal')){
				/**
				 * This callback will trigger on remove the image in modal.
				 * @method onRemoveInModal
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
				this.executeMethod('onRemoveInModal', file , this.$node);
			}
		},
		onBeforeShowModal : function(){
			if(this.getMethods('onBeforeShowUploadModal')){
				/**
				 * This callback will trigger before open the upload modal.
				 * @method onBeforeShowUploadModal
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
				return this.executeMethod('onBeforeShowUploadModal', this.$node);
			}
		},
		onCloseModalFn : function(){
			var focusELem = this.$node.querySelector('[tabindex]');
			if(focusELem){
				this.$node.querySelector('[tabindex]').focus();
			}
			if(this.getMethods('onModalClose')){
				/**
				 * This callback will trigger while closing the upload modal.
				 * @method onModalClose
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } files
				 */
				this.executeMethod('onModalClose', this.$node);
			}
			this.setData("uploadImage" , false);
		}
	},
	actions : {
		showInfoTooltip: function(origElem) {
	      this.showHideInfoTooltip(origElem);
	    },
		hoverContentClick : function(event , item){
			event.stopPropagation();
			var classList = event.target.classList;
			if(classList.contains("cxImgCompDeleteIcon")){
				this.removeTheFile(item);
			}else{
	    		this.showThisImagePreview(event , item);
			}
		},
	    showImageOptions : function(){
	    	if(this.data.cxPropDisabled){
	    		return;
	    	}
	    	if(this.data.images[0].alphabet || this.data.images[0].placeholderImage){
	    		this.openImageUploadModal();
	    	}else{
	    		this.setData('singleOptionShow',true)
	    	}
	    },
	    singleImageDrop : function(opt){
	    	if(opt == 'preview'){
	    		this.showThisImagePreview(undefined , this.data.images[0]);
	    	}else if(opt == 'upload'){
	    		this.openImageUploadModal()
				_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
	    	}else{
	    		var c;
	    		if(this.getMethods('onRemoveImage')){
					/**
					 * This callback will trigger while remove the image.
					 * @method onRemoveImage
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } files
					 */
	    			c = this.executeMethod('onRemoveImage',this.data.images[0]);
	    			if(c){
	    				this.setData('images',[{alphabet : c}]);
	    			}else if(this.defaultPlaceholderImage){
						this.setData('images',[this.defaultPlaceholderImage]);
					}
	    		}else{
	    			console.warn('onRemoveImage method is not provided to the component. This is a mandatorym method.')
	    		}
	    	}
	    },
		openUploadPopup : function(){
			this.openImageUploadModal()
		},
		validationImageClick : function(file){
			if(this.getMethods('onValidationImageClick')){ //no i18n 
				/**
				 * This callback will trigger while click the image icon on validating state.
				 * @method onValidationImageClick
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } file
				 */
				return this.executeMethod('onValidationImageClick', file); //no i18n
			}
		},
		expandView : function(){
			if(this.getMethods('onExpandImageView')){ //no i18n
				/**
				 * This callback will trigger the on expanding the image.
				 * @method onExpandImageView
				 * @author manikaraja.p
				 * @version 1.0.0
				 * @param { * } this
				 */
				this.executeMethod('onExpandImageView', this); //no i18n
			}
			this.setData("cxPropExpandImageView" , true);
		}
	},
	removeTheFile : function(file){
		var images = this.data.images;
		var index = images.findIndex(function(fi){ return fi.id === file.id; });
		if(index !== -1){
			Lyte.arrayUtils(images,'removeAt',index,1);
		}
		this.setData('maximumCountReached',this.data.images.length >= this.data.cxPropAllowedCount);
		if(this.getMethods('onRemove')){ //no i18n 
			/**
			 * This callback will trigger on remove the single file.
			 * @method onRemove
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } file
			 */
			return this.executeMethod('onRemove', file); //no i18n
	    }
		if(this.getMethods('onValueChange')){
			/**
			 * This callback will trigger while changing the image values.
			 * @method onValueChange
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } files
			 */

			this.executeMethod('onValueChange', this.getValue());
		}
		if(this.getData("cxPropClearErrorMessage")){
			this.setData("cxPropErrorMessage", "");//No I18n
		}
	},
	showThisImagePreview : function(event , image){
		if(this.getMethods('onBeforeImagePreview')){ //no i18n
			/**
			 * This callback will trigger before open the image preview.
			 * @method onBeforeImagePreview
			 * @author manikaraja.p
			 * @version 1.0.0
			 * @param { * } this
			 */
			var bool = this.executeMethod('onBeforeImagePreview', this); //no i18n
		}
		if(bool === false){
			return;
		}
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var data = this.data , type = data.cxPropType , selector = type === "single" ? ".cxSingleImgContainer_" : ".cxMultiImageSelector_" , editable = !data.cxPropReadonly;
		this.constructDataAndShow(image.id , data.images , selector + data.cxPropId , editable , type , event);
	},
	openImageUploadModal : function(){
		// if(!this.fileUploadComp){
		this.setData('uploadImage',true);
		var fileUploadComp = this.$node.querySelector('crux-upload-modal');
		// }
		fileUploadComp.openFileUpload($L.extend(true , [] ,this.data.images));
	},
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * This will be called after rendered the component.
					 * @method onElementRendered
					 * @author manikaraja.p
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	observesValue : function(observeVal){
		var value = observeVal ? observeVal : {};
		if(this.manualSwitch && value.item === "cxPropFrom"){
			this.manualSwitch = false;
			return;
		}else if( value.item === "cxPropValue"){
			this.manualSwitch = false;
		}
		this.data.cxPropValue = this.data.cxPropValue  || [];   //If they pass cxPropValue as undefined. Getting a console error in some places
		this.idMapping = {};
		var values = this.data.cxPropValue , sizeSel = this.data.cxPropSizeSelector;
		for(var i = 0 ; i < values.length ; i++){
			this.idMapping[values[i].id] = values[i];
			values[i].name = values[i].name ? values[i].name :  values[i].File_Name;     //API format adoption
			values[i][sizeSel] = values[i][sizeSel] ? values[i][sizeSel] : values[i].Size;
		}
		this.setData("images" , $L.extend(true , [] , this.data.cxPropValue ));  //no i18n
		var bool = this.data.cxPropValue.length >= this.data.cxPropAllowedCount;
		this.setData('maximumCountReached',bool);
		if(bool){
			this.setData('disableBtn',bool); //on init the observer not calling
		}
		if(this.data.cxPropType === 'single' && this.data.cxPropValue.length && this.data.cxPropValue[0].placeholderImage){
			this.defaultPlaceholderImage = this.data.cxPropValue[0];
		}
		// this.setData("cxPropExpandImageView" , !this.data.cxPropMinified); //No I18n
	}.observes('cxPropValue.[]' , 'cxPropFrom').on('init'),
	observeImages : function(){
		if(this.data.cxPropFrom !== "view" && !this.data.cxPropReadonly){
			var _self = this;
			setTimeout(function(){
				_self.sortImages()
			},0);
		}
	}.observes('images').on('didConnect'),
	sortImages : function(){
		var elem = $L(".cxMultiImageList" , this.$node);
		var _self = this;
		if(elem[0]){
			elem.sortable( "destory" );
			elem.sortable({
				containment : "body",
				items : ".cxImageContHoverCont",
				cancel : ".cxImgCompDeleteIcon",
				onDrop  : function (droppedElement , destinantion , belowElement , from, to , source ){
					var images = _self.data.images;
					var data=Lyte.arrayUtils(images, "removeAt", from, 1)[0];//No I18n
					Lyte.arrayUtils(images, "insertAt", to, data);//No I18n
					_self.sortImages();
					source.classList.remove('cxImgPrevListOnDrag');
					droppedElement.classList.remove('cxImgListVwSortableSelectElemOndrag');
					if(_self.getMethods('onDrop')){
						 /**
						 * This callback will trigger on drop the image.
						 * @method onDrop
						 * @author manikaraja.p
						 * @version 1.0.0
						 * @param { * } files
						 */
						_self.executeMethod('onDrop',_self);
					}	
				},
				onDragStart : function(draggableElement,source) {
					draggableElement.classList.add('cxImgListVwSortableSelectElemOndrag');					
					source.classList.add('cxImgPrevListOnDrag');
				}
			});
		}
	},
	didDestroy : function(){
		$L(".cxMultiImageList").sortable( "destory" );
	},
	observeView : function(){
		this.setData("cxPropExpandImageView" , false); //No I18n
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-image-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeIsError : function(){
		if(this.$node.querySelector(".cxImageElemWrapper")){
		    if(this.data.isError){
			    this.$node.querySelector(".cxImageElemWrapper").classList.add("cxErrorBox");//No I18n
		    }
		    else{
		        this.$node.querySelector(".cxImageElemWrapper").classList.remove("cxErrorBox");//No I18n
		    }
		}
	}.observes("isError","lyteViewPort").on("didConnect"),//No I18n
	observeMandatory : function(){
		this.observeMandatoryMixin(".cxImageElemWrapper");//No I18n
		var node = this.$node.querySelector(".cxImageElemWrapper");
		if(node){
			if(node.classList.contains('mandatoryField')){      //temp fix for lyte issue. While use the helper in the attribute , it removed the class added by js
				this.setData("mandatoryClass" , this.data.mandatoryClass + " mandatoryField");
			}else{
				this.setData("mandatoryClass" , "");
			}
		}
	}.observes("cxPropField.required","lyteViewPort", "cxPropMandatory", "cxPropFrom","cxPropPrefixYield").on("didConnect"),//No I18n
	observeZcqa : function(){
		if(this.getData("cxPropFrom") == "create" && this.getData("cxPropType") == "multiple" && this.$node.querySelector("lyte-button")){
			this.$node.querySelector("lyte-button").setAttribute("data-zcqa", this.getData("cxPropZcqa"));//No I18n
		}
	}.observes("cxPropZcqa","lyteViewPort").on("didConnect"),//no i18n
	observeDisabled : function(){
		if(typeof this.data.cxPropTooltip !== 'undefined'){
			this.setData("tooltip", this.data.cxPropTooltip);
		}else if(this.data.cxPropReadonly){
			this.setData("tooltip", _cruxUtils.getI18n("crm.lable.read.only"));//NO I18n
		}else{
			this.setData("tooltip", "");
		}
		// this.setData('disableBtn', this.data.cxPropReadonly);
	}.observes("cxPropReadonly" , "cxPropTooltip").on("init"),//No I18n
	mandatoryType : function(){
		if(this.data.cxPropMandatoryType != 'red_accent_line'){
			if(this.$node.querySelector('.cxMandatoryType')){
				this.$node.querySelector('.cxMandatoryType').style.color = 'red';
			}
			if(!this.$node.querySelector('.cxMandatoryOptEnabled')){
				this.setData("mandatoryClass" , this.data.mandatoryClass + " cxMandatoryOptEnabled");
				// $L(this.$node.querySelector('.mandatoryField')).addClass('cxMandatoryOptEnabled');
			}
		}else if(this.$node.querySelector('.cxMandatoryOptEnabled')){
			$L(this.$node.querySelector('.mandatoryField')).removeClass('cxMandatoryOptEnabled');
		}
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
},{mixins : ["crux-element-validation","crux-image-preview-util"]});

Lyte.Component.register("crux-image-preview", {
_template:"<template tag-name=\"crux-image-preview\"> <lyte-messagebox id=\"tempraryError\" lt-prop-yield=\"true\" lt-prop-show=\"{{lbind(currentImageConfig.error)}}\" lt-prop-duration=\"3000\" lt-prop-type=\"error\"> <template is=\"registerYield\" yield-name=\"messageboxYield\"> <span> {{customMessages}} </span> </template> </lyte-messagebox> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-colorbox lt-prop-id=\"cxImageColorBox\" class=\"cxImagePreview\" lt-prop-class=\"cxImagePreviewGallery\" lt-prop-add-orientation=\"true\" lt-prop-yield=\"true\" lt-prop-selectors=\"[&quot;{{cxPropPreviewConfiguration.selectors}}&quot;]\" lt-prop-esc-key=\"true\" lt-prop-wheel-zoom=\"false\" lt-prop-animation=\"slide\" lt-prop-overlay-close=\"false\" lt-prop-width=\"80%\" lt-prop-height=\"{{currentImageInfo.contentHeight}}px;\" lt-prop-type=\"image\" on-load=\"{{method(&quot;currentImageLoadCallback&quot;)}}\" on-failure=\"{{method(&quot;currentImageFailCallback&quot;)}}\" on-navigate=\"{{method(&quot;navigateCallback&quot;)}}\" on-open=\"{{method('onOpenColorbox')}}\" on-before-close=\"{{method(&quot;colorboxBeforeClose&quot;)}}\" on-crop=\"{{method('onCropImage')}}\" on-crop-open=\"{{method(&quot;cropperOpen&quot;)}}\" on-ratio-set=\"{{method('setHeightAndWidth','ratio')}}\" on-rotate=\"{{method('setHeightAndWidth','rotate')}}\" on-image-cropped=\"{{method('onCropperFinish')}}\" on-crop-close=\"{{method('onCropperCloseMthd')}}\" on-download=\"{{method(&quot;onDownloadImage&quot;)}}\"> <template is=\"registerYield\" yield-name=\"colorBoxYield\"> <lyte-colorbox-container class=\"cxImgPrevContainer\"> <template is=\"if\" value=\"{{isCropperOpen}}\"><template case=\"true\"><div class=\"cxImgCropContainer\" tabindex=\"0\"> <div class=\"cxImgCropRatioWrap\"> <div class=\"cxImgCropIconWrap lyteColorboxCrop {{if(ifEquals(cropperProp.selectedRatio,'n:n'),'cxSelectedRatio','')}}\" lt-prop-title=\"{{cruxGetI18n('crm.image.n.n')}}\" data-ratio=\"n:n\" data-zcqa=\"cropper_n_n\"> <span class=\"cxImgCropRatioCustomIcon\"></span> </div> <div class=\"cxImgCropIconWrap lyteColorboxCrop {{if(ifEquals(cropperProp.selectedRatio,'2:2'),'cxSelectedRatio','')}}\" lt-prop-title=\"{{cruxGetI18n('crm.image.2.2')}}\" data-ratio=\"2:2\" data-zcqa=\"cropper_2_2\"> <span class=\"cxImgCropRatioSqaureIcon\"></span> </div> <div class=\"cxImgCropIconWrap lyteColorboxCrop {{if(ifEquals(cropperProp.selectedRatio,'4:3'),'cxSelectedRatio','')}}\" lt-prop-title=\"{{cruxGetI18n('crm.image.4.3')}}\" data-ratio=\"4:3\" data-zcqa=\"cropper_4_3\"> <span class=\"cxImgCropRatioFourThirdIcon\"></span> </div> <div class=\"cxImgCropIconWrap lyteColorboxCrop {{if(ifEquals(cropperProp.selectedRatio,'16:9'),'cxSelectedRatio','')}}\" lt-prop-title=\"{{cruxGetI18n('crm.image.16.9')}}\" data-ratio=\"16:9\" data-zcqa=\"cropper_16_9\"> <span class=\"cxImgCropRatioLandscapeIcon\"></span> </div> </div> <span class=\"cxImgCropSeparationSpan\"></span> <div class=\"cxImgCropWidthHeightInputCont\"> <div class=\"cxImgCropWHInputDiv\">{{cruxGetI18n('zc.editor.width')}} <lyte-number data-zcqa=\"cropper_widthBox\" lt-prop-value=\"{{lbind(cropperProp.width)}}\" lt-prop-min=\"{{cropperProp.minWidth}}\" lt-prop-max=\"{{cropperProp.maxWidth}}\" lt-prop-ignore-symbols=\"true\" on-value-change=\"{{method('imageSizeAdjustFn','width')}}\"> </lyte-number>px</div> <div class=\"cxImgCropIconWrap cxImgCropIconCont\" data-zcqa=\"cropper_swapDimensions\" lt-prop-title=\"{{cruxGetI18n('crm.image.height.width.swap')}}\" onclick=\"{{action('swapHeightAndWidth')}}\"> <span class=\"cxImgCropSwapIcon\"></span> </div> <div class=\"cxImgCropWHInputDiv\">{{cruxGetI18n('ze.editor.height')}} <lyte-number data-zcqa=\"cropper_HeightBox\" lt-prop-value=\"{{lbind(cropperProp.height)}}\" lt-prop-min=\"{{cropperProp.minHeight}}\" lt-prop-max=\"{{cropperProp.maxHeight}}\" lt-prop-ignore-symbols=\"true\" on-value-change=\"{{method('imageSizeAdjustFn','height')}}\"> </lyte-number>px</div> </div> <span class=\"cxImgCropSeparationSpan\"></span> <div class=\"cxImgCropIconWrap cxImgCropIconCont lyteColorboxCrop\" lt-prop-title=\"{{cruxGetI18n('crm.image.rotate.image')}}\" data-rotate=\"true\" data-zcqa=\"rotateWhileEdit_preview\"> <span class=\"cxImgCropRotateIcon\" data-rotate=\"true\"></span> </div> <div class=\"cxImgCropBtnWrap\"> <lyte-button lt-prop-title=\"\" lt-prop-size=\"small\" lt-prop-appearance=\"secondary\" data-zcqa=\"closeCropArea_preview_empty\" onclick=\"{{action('onCropCancel')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template>\" </lyte-button> <lyte-button lt-prop-size=\"small\" lt-prop-disabled=\"{{cropperProp.disableSave}}\" data-zcqa=\"closeCropArea_preview_value\" lt-prop-title=\"\" lt-prop-appearance=\"primary\" onclick=\"{{action('onCropSave')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.save')}} </template> </lyte-button> </div> </div></template></template> <lyte-colorbox-content class=\"cxImgPrevContent\"> <lyte-colorbox-loading-icon class=\"cxImgCropLoadingIconWrap\"> <template is=\"if\" value=\"{{expHandlers(currentImageConfig.imageLoaded,'!')}}\"><template case=\"true\"> <div class=\"cxImageCropLoadWrap\"> <div class=\"cxImageCropLoadRotateElem\"></div> </div> </template></template> </lyte-colorbox-loading-icon> <span class=\"lyteColorboxLoadingImg\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropImages.length,'>',1)}}\"><template case=\"true\"> <lyte-colorbox-previous lt-prop-title=\"{{cruxGetI18n('crm.label.previous')}}\" data-zcqa=\"image_navigation_previous\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"> <div class=\"lyteColorboxPreviousIcon\"></div> </lyte-colorbox-previous> <lyte-colorbox-next lt-prop-title=\"{{cruxGetI18n('crm.label.next')}}\" data-zcqa=\"image_navigation_next\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"> <div class=\"lyteColorboxNextIcon\"></div> </lyte-colorbox-next> </template></template> </lyte-colorbox-content> <div class=\"{{if(isCropperOpen,'cxHide','')}}\" tabindex=\"0\"> <lyte-colorbox-header class=\"cxImgPrevHeader\"> <div class=\"cxImagePreviewHeaderWrap\"> <lyte-yield yield-name=\"previewHeaderYield\"></lyte-yield> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.showFileName}}\"><template case=\"true\"> <div class=\"cxImgPrevNameWrap\"> <template is=\"if\" value=\"{{cxPropEditable}}\"><template case=\"true\"> <template is=\"if\" value=\"{{currentImageConfig.nameEdit}}\"><template case=\"true\"> <lyte-input lt-prop-class=\"cxImageNameInput\" class=\"{{concat('cxImageNameInputWrap',if(cxPropEditable,'','cxEventNone '))}}\" lt-prop-placeholder=\"{{cruxGetI18n('crm.image.empty.name.placeholder')}}\" lt-prop-value=\"{{lbind(currentImageInfo.newName)}}\" lt-prop-maxlength=\"100\" lt-prop-appearance=\"box\" lt-prop-type=\"text\" on-blur=\"{{method('changeNameOnBlur',currentImageInfo.name,currentImageInfo.id)}}\" onkeyup=\"{{action('changeNameOnEnter',currentImageInfo.name,currentImageInfo.id,event)}}\" data-zcqa=\"imageName_input\"></lyte-input> </template><template case=\"false\"> <div class=\"{{concat(' ',if(cxPropEditable,' ','cxEventNone '))}}\" onclick=\"{{action('openNameEditArea',currentImageInfo.name)}}\" data-zcqa=\"imageName_Parent_Div\"> <div class=\"cxImgPrevNameEditWrap\" lt-prop-title=\"{{renderNameToolTip(concat(currentImageInfo.name,currentImageInfo.extn),cxPropIsRtlEnabled)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"> <span class=\"cxImgPrevFileName\">{{currentImageInfo.name}}</span> <span class=\"cxImgPrevFileExtn\">{{currentImageInfo.extn}}</span> <span class=\"cxImgPrevFileNameEditIcon\" lt-prop-title=\"{{cruxGetI18n('crm.label.edit')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"></span> </div> </div> </template></template> </template><template case=\"false\"> <div data-zcqa=\"imageName_Parent_Div\"> <div class=\"cxImgPrevNameViewWrap\" lt-prop-title=\"{{renderNameToolTip(concat(currentImageInfo.name,currentImageInfo.extn),cxPropIsRtlEnabled)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"> <span class=\"cxImgPrevFileName\">{{currentImageInfo.name}}</span> <span class=\"cxImgPrevFileExtn\">{{currentImageInfo.extn}}</span> </div> </div> </template></template> </div> </template></template> <div class=\"cxImgPrevHeaderActionsWrap\"> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.showCrop}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <template is=\"if\" value=\"{{cxPropEditable}}\"><template case=\"true\"><span lt-prop-title=\"{{if(ifEquals(currentImageInfo.extn,'.gif'),cruxGetI18n('crm.image.error.gif'),cruxGetI18n('crm.image.crop.and.rotate'))}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"> <lyte-colorbox-crop class=\"{{if(ifEquals(currentImageInfo.extn,'.gif'),'lyteColorboxDisabled')}} {{if(currentImageConfig.imageLoaded,'','lyteColorboxDisabled')}}\"> <span class=\"cxImgPrevHeaderActionIcon\" data-zcqa=\"wayToEditPage_preview\" onclick=\"{{action('openCropper')}}\"> <span class=\"cxImgPrevHeadActionCropIcon\"></span> </span> </lyte-colorbox-crop> </span></template></template> </template></template> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-colorbox-download> <div class=\"cxImgPrevHeaderActionIcon\" data-zcqa=\"image_download\" lt-prop-title=\"{{cruxGetI18n('crm.view.attachment.download')}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"> <span class=\"cxImgPrevHeadActionDownloadIcon\"></span> </div> </lyte-colorbox-download> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.showInfoIcon}}\"><template case=\"true\"> <div class=\"cxImgPrevInfoIconWrap cxImgPrevHeaderActionIcon\" lyte-hovercard=\"true\" data-zcqa=\"infoIcon_hover_action\"> <span class=\"cxImgPrevHeadActionInfoIcon\"></span> </div> <lyte-hovercard class=\"imageExtraInfoDetails\" lt-prop-auto-show=\"true\" lt-prop-popover-wrapper-class=\"cxImagePreviewInfoDetailPopover\" lt-prop-show=\"{{currentImageConfig.imageExtraInfo}}\" lt-prop-placement=\"bottom\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-origin-elem=\".cxImgPrevInfoIconWrap\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <div class=\"cxImgPrevInfoWrap\"> <span class=\"cxImgPrevInfoDetailPopLabel\">{{cruxGetI18n('crm.image.resolution')}}</span> <span class=\"cxImgPrevInfoDetailValue\">{{currentImageInfo.resolution}}</span> </div> <div class=\"cxImgPrevInfoWrap\"> <span class=\"cxImgPrevInfoDetailPopLabel\">{{cruxGetI18n('crm.attachment.size')}}</span> <span class=\"cxImgPrevInfoDetailValue\">{{currentImageInfo.size}}</span> </div> </template> </lyte-hovercard> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropPreviewConfiguration.showDeleteIcon,'&amp;&amp;',cxPropEditable)}}\"><template case=\"true\"> <span class=\"cxImgPrevHeaderActionIcon cxImgPrevDeleteIconWrap\" data-zcqa=\"wayToEditPage_preview_delete\" onclick=\"{{action('deleteCurrentImage',currentImageInfo[cxPropUniqueSelector])}}\" lt-prop-title=\"{{cruxGetI18n('crm.label.delete')}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"> <span class=\"cxImgPrevHeadActionDeleteIcon\"></span> </span> </template></template> </div> <lyte-colorbox-close class=\"{{if(currentImageConfig.imageLoaded,'','lyteColorboxDisabled')}}\" data-zcqa=\"image_colourbox_close\" lt-prop-title=\"{{cruxGetI18n('crm.label.close')}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\"></lyte-colorbox-close> </div> </lyte-colorbox-header> <div class=\"cxImagePreviewFooterWrap\"> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.showDescription}}\"><template case=\"true\"> <lyte-colorbox-description> <div class=\"cxImageDescWrapContainer\"> <div class=\"cxImageDescriptionWrap {{if(cxPropEditable,' ','eventNone ')}}\"> <template is=\"if\" value=\"{{currentImageConfig.showImageDesc}}\"><template case=\"true\"> <p class=\"cxImgPrevDescSavedValue\" data-zcqa=\"editThisDescription_preview\" onclick=\"{{action('editThisDescription',this)}}\">{{currentImageInfo.newDesc}}</p> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropEditable}}\"><template case=\"true\"><template is=\"if\" value=\"{{currentImageConfig.showImageDescInput}}\"><template case=\"true\"> <lyte-input class=\"cxImageDescInputWrap\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"{{cruxGetI18n('crm.image.description')}}\" lt-prop-class=\"cxImageDescInputTextarea\" lt-prop-type=\"textarea\" lt-prop-update-delay=\"0\" lt-prop-value=\"{{lbind(currentImageInfo.newDesc)}}\" lt-prop-maxlength=\"255\" lt-prop-text-area-resize=\" { &quot;vertical&quot; : false , &quot;horizontal&quot; : false } \" on-blur=\"{{method('changeDescOnblur',currentImageInfo.desc,currentImageInfo.id)}}\" onkeyup=\"{{action('changeDescOnEnter',currentImageInfo.desc,currentImageInfo.id,event)}}\" data-zcqa=\"imageDescInputWrap_input\"> </lyte-input> </template><template case=\"false\"> <div class=\"cxImgPrevDescPlaceholder\" data-zcqa=\"openAddDescription_preview\" onclick=\"{{action('openAddDescription')}}\">{{cruxGetI18n('crm.image.description')}}</div> </template></template></template></template></template></template> </div> </div> </lyte-colorbox-description> </template></template> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.allowZoom}}\"><template case=\"true\"> <div class=\"lyteColorboxUtilDiv cxImgPrevZoomInOutWrap\"> <span class=\"cxImageZoomAction cxImageZoomInAction cxImagePrevZoomInAction cxFlexCenter {{if(zoomConfiguration.plusDisabled,'lyteColorboxDisabled ',' ')}}\" data-zcqa=\"image_zoomin\" onclick=\"{{action('zoomFn','plusDisabled','in')}}\" lt-prop-title=\"{{cruxGetI18n('crm.image.zoom.in')}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"> <span class=\"cxImgPreviewZoomInIcon\"></span> </span> <div class=\"cxImageZoomRatio\"> <lyte-dropdown lt-prop-position=\"up\" on-option-selected=\"{{method(&quot;zoomByPerspective&quot;)}}\" on-hide=\"{{method('hideDropdown')}}\" class=\"\" lt-prop-disabled-list=\"{{zoomConfiguration.zoomDisabledList}}\" on-show=\"{{method('onshowDropdown')}}\" lt-prop-hover=\"true\" lt-prop-placeholder=\"dropDown\" data-zcqa=\"image_ratio_container\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button style=\"border:none;\" class=\"cxImgPrevZoomRatioWrap\"> <span> {{zoomRatio}}% </span> </lyte-drop-button> <lyte-drop-box class=\"cxImgPreviewScaleMenu\"> <lyte-drop-body> <lyte-drop-item data-value=\"actual\" data-zcqa=\"image_zoom_actual\" class=\"cxImgPreviewScaleMenuLabel\">{{cruxGetI18n('crm.image.actual.size')}}</lyte-drop-item> <lyte-drop-item data-value=\"reset\" data-zcqa=\"image_zoom_reset\" class=\"cxImgPreviewScaleMenuLabel\">{{cruxGetI18n('crm.image.reset')}}</lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> <span class=\"cxImageZoomAction cxImageZoomOutAction cxImagePrevZoomInAction cxFlexCenter {{if(zoomConfiguration.minusDisabled,'lyteColorboxDisabled ',' ')}}\" data-zcqa=\"image_zoomout\" onclick=\"{{action('zoomFn','minusDisabled','out')}}\" lt-prop-title=\"{{getI18n('crm.image.zoom.out')}}\" lt-prop-tooltip-class=\"cxImagePreviewTooltip\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;default&quot;}\"> <span class=\"cxImgPreviewZoomOutIcon\"></span> </span> </div> </template></template> <template is=\"if\" value=\"{{cxPropPreviewConfiguration.showThumbnails}}\"><template case=\"true\"> <lyte-colorbox-thumbnail class=\"cxImgPrevThumbnail\"> <ul class=\"cxImgPrevThumbListWrap\"> <template is=\"for\" items=\"{{cxPropImages}}\" item=\"image\" index=\"index\"> <li class=\"cxImgPrevThumbImgWrap {{if(ifEquals(currentImageInfo.id,image.id),'cxSelected','')}} lyteColorboxThumb\" data-pos=\"{{cruxArithResult(index,'+',1)}}\" data-thumb-val=\"{{cruxArithResult(index,'+',1)}} {{cruxGetI18n('crm.label.lowercase.of')}} {{cxPropImages.length}}\" onclick=\"{{action('previewThisImage',image[cxPropUniqueSelector],index)}}\" data-zcqa=\"imagePreview_{{index}}\"> <img class=\"cxImgPrevThumbImg\" src=\"{{image[cxPropSourceKey]}}\" id=\"{{image[cxPropUniqueSelector]}}_preview\"> </li> </template> </ul> </lyte-colorbox-thumbnail> </template></template> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <div class=\"cxImagePrevCountDiv\"> {{currentImageInfo.index}} {{cruxGetI18n('crm.label.lowercase.of')}} {{cxPropImages.length}} </div> </div> </div> </lyte-colorbox-container> </template> </lyte-colorbox> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]}]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"attr","position":[0,1,5]},{"type":"attr","position":[0,1,7]},{"type":"text","position":[0,5,1,0]},{"type":"attr","position":[0,5,1,2]},{"type":"componentDynamic","position":[0,5,1,2]},{"type":"attr","position":[0,5,3]},{"type":"text","position":[0,5,5,0]},{"type":"attr","position":[0,5,5,2]},{"type":"componentDynamic","position":[0,5,5,2]},{"type":"attr","position":[0,9]},{"type":"attr","position":[0,11,1]},{"type":"registerYield","position":[0,11,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,11,1]},{"type":"attr","position":[0,11,3]},{"type":"registerYield","position":[0,11,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,11,3]}]}},"default":{}},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"insertYield","position":[1,5,1,1,1]},{"type":"attr","position":[1,5,1,1,3]},{"type":"if","position":[1,5,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,3,0]},{"type":"attr","position":[1,1,5]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,3,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5,1,1,5,1]},{"type":"if","position":[1,5,1,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,5,1,1,5,3]},{"type":"attr","position":[1,5,1,1,5,5,1]},{"type":"componentDynamic","position":[1,5,1,1,5,5]},{"type":"attr","position":[1,5,1,1,5,7]},{"type":"if","position":[1,5,1,1,5,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,5,1,1,5,9]},{"type":"if","position":[1,5,1,1,5,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5,1,1,7]},{"type":"componentDynamic","position":[1,5,1,1,7]},{"type":"componentDynamic","position":[1,5,1]},{"type":"attr","position":[1,5,3,1]},{"type":"if","position":[1,5,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5,3,3]},{"type":"if","position":[1,5,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,1,0]},{"type":"componentDynamic","position":[3,1,1]},{"type":"text","position":[3,1,3,0]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5]}]}},"default":{}},{"type":"attr","position":[1,5,3,5]},{"type":"if","position":[1,5,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,5,3,7]},{"type":"text","position":[1,5,3,9,1]},{"type":"text","position":[1,5,3,9,3]},{"type":"text","position":[1,5,3,9,5]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropPreviewConfiguration","cxPropCurrentPreviewId","cxPropUniqueSelector","cxPropImages","cxPropSourceKey","cxPropPreviewUrlKey","cxPropDownloadKey","cxPropEditable","currentImageConfig","currentImageInfo","cxPropNameSelector","cxPropPreviewZcqa","cxPropSizeSelector","zoomConfiguration","customMessages","cxPropType","cxPropAjax","zoomRatio","cxPropMaxLengthObj","showCropper","cxPropIsRtlEnabled","isCropperOpen","cropperProp"],
_observedAttributesType :["object","string","string","array","string","string","string","boolean","object","object","string","string","string","object","string","string","object","number","object","boolean","boolean","boolean","object"],

	data : function(){
		return {
			cxPropPreviewConfiguration 	: Lyte.attr("object",{ "default" :{}}),//no i18n
			cxPropCurrentPreviewId		: Lyte.attr("string"),//No I18n
			cxPropUniqueSelector		: Lyte.attr("string", {default : "id"}),//No I18n
			cxPropImages				: Lyte.attr("array",{ "default" :[]}),//no i18n
			cxPropSourceKey				: Lyte.attr("string",{ "default" : "src"}),//No I18n
			cxPropPreviewUrlKey			: Lyte.attr("string",{ "default" : "original_src"}),//No I18n
			cxPropDownloadKey			: Lyte.attr("string",{ "default" : "download_url"}),//No I18n
			cxPropEditable				: Lyte.attr("boolean",{ "default" :true}),//no i18n
			currentImageConfig			: Lyte.attr("object",{ "default" :{}}),//no i18n
			currentImageInfo			: Lyte.attr("object",{ "default" :{}}),//no i18n
			cxPropNameSelector			: Lyte.attr("string" , {default : "name"}),//No I18n
			cxPropPreviewZcqa			: Lyte.attr("string" , {default : "openPreview_view"}),//No I18n
			cxPropSizeSelector			: Lyte.attr("string" , {default : "stream"}),//No I18n
			zoomConfiguration				: 	Lyte.attr('object',{//no i18n
				default : {
					zoomRatioArray : [8.33,12.5,16.67,25,33.33,50,66.67,100,200,300],
					plusDisabled : false,
					minusDisabled : false
					}
				}
			),
			customMessages				: Lyte.attr("string" , {default : ""}),//No I18n
			cxPropType					: Lyte.attr("string" , {default : "single"}),//No I18n
			cxPropAjax					: Lyte.attr("object"),//no i18n
			zoomRatio					: Lyte.attr("number"),//No I18n
			// cxPropReadOnly				: Lyte.attr("boolean",{ "default" :false}),//no i18n
			cxPropMaxLengthObj			: Lyte.attr('object',{default : {nameLength : 104,descriptionLength : 255}}), //no i18n
			showCropper					: Lyte.attr("boolean",{ "default" :false}),//no i18n
			cxPropIsRtlEnabled			: Lyte.attr("boolean",{ "default" : typeof Crm !== 'undefined' ? Crm.userDetails.RTL_ENABLED : false}),//no i18n
			isCropperOpen				: Lyte.attr("boolean",{ "default" :false}),//no i18n
			cropperProp					: Lyte.attr('object',{default : {}}) //no i18n
		}		 
	},
	showPreview : function(event , currentId){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.data.cxPropType === "single"){
			var node = $L(this.data.cxPropPreviewConfiguration.selectors)[0];
			this.$node.querySelector('lyte-colorbox').launch(node);
		}else{
			this.calcFn = this.calculateInitialImageSize.bind(this);
			document.addEventListener('resize' , this.calcFn , true); //eslint-disable-line @zoho/zstandard/no-body-events
			this.processFurther = true;
			this.showPreviewWithDetails(event , currentId , undefined);
		}
	},
	didConnect : function(){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		this.processFurther = true;
		this.$node.showSinglePreview = function(node){
			this.querySelector('lyte-colorbox').launch(node);
		}

	},
	actions : {
		changeNameOnEnter : function(oldName,id,event){
			if(this.data.cxPropPreviewConfiguration.showFileName && event.which === 13){
        		this.saveImageName(oldName,id);
        	}
		},
		changeDescOnEnter : function(oldDesc,id,event){
			if(this.data.cxPropPreviewConfiguration.showDescription && event.which === 13){
				event.preventDefault();
        		this.saveDescription(oldDesc,id);
        	}
		},
		openAddDescription : function(){
			if(this.data.cxPropEditable && this.data.cxPropPreviewConfiguration.showDescription) 
			{
				if(!this.processFurther)
				{
					Lyte.objectUtils(this.getData('currentImageConfig') ,"add","error",true);//no i18n
	        		return;
	        	}
				this.constructDescStructure(false,true,undefined);
                Lyte.objectUtils( this.data.currentImageInfo ,"add","newDesc",'');//no i18n
                Lyte.objectUtils( this.data.currentImageInfo ,"add","desc",'');//no i18n
                $L('.cxImageDescInputWrap').focus();
			}
		},
		openNameEditArea : function(){
			if(this.data.cxPropEditable && this.data.cxPropPreviewConfiguration.showFileName) 
        	{
	        	if(!this.processFurther) {
	        		Lyte.objectUtils(this.data.currentImageConfig,"add","error",true);//no i18n
	        		return;
	        	}
	        	Lyte.objectUtils( this.data.currentImageConfig ,"add","nameEdit",true);//no i18n
				var input = $L('.cxImageNameInputWrap').find('input')[0] , len = input.value.length;
				input.focus();
				input.scrollLeft = input.scrollWidth
				input.setSelectionRange(len, len);
				// input.selectionStart = input.selectionEnd = input.value.length
	            
        	}
		},
		editThisDescription : function(){
			if(this.data.cxPropEditable && this.data.cxPropPreviewConfiguration.showDescription) 
        	{
	        	if(!this.processFurther) {
	        		Lyte.objectUtils(this.data.currentImageConfig ,"add","error",true);//no i18n
	        		return;
	        	}
	            this.constructDescStructure(false,true,false);
	            this.calculateInitialImageSize();
	            $L('.cxImageDescInputWrap').focus();
        	}
		},
		previewThisImage : function(id, pos)
        {
        	this.showPreviewWithDetails(undefined , id, pos, true);
        },
		deleteCurrentImage : function(currentId){
			if(this.data.cxPropPreviewConfiguration.showDeleteIcon && this.data.cxPropEditable){
				var imageDataPreview = this.data.cxPropImages;//no i18n
				var imageDataPreviewLength = imageDataPreview.length;
				var colourboxDom = $L('lyte-colorbox' , this.$node)[0] , sel = this.data.cxPropUniqueSelector;//no i18n
				for(var i = 0 ; i < imageDataPreviewLength ; i ++){
					if(imageDataPreview[i][sel] === currentId){
						var delFile = Lyte.arrayUtils(imageDataPreview ,'removeAt',i,1)[0];//no i18n
						colourboxDom.delete(i + 1);//no i18n
						var pos = i === imageDataPreviewLength - 1 ? 0 : i;
						if(imageDataPreview[pos] !== undefined){
							this.showPreviewWithDetails(undefined , imageDataPreview[pos][sel], i, true);
						}
						if(this.getMethods('onDelete')){ // No I18n
							this.executeMethod('onDelete',delFile); //NO I18n
				    	}
						if(imageDataPreview.length === 0){
							return this.closePreview();
						}
						break;
					}
				}
			}
		},
		showImgDetailsPop : function(type){
			Lyte.objectUtils( this.data.currentImageConfig,"add","imageExtraInfo", type);//no i18n
		},
		openCropper : function(){
			//debugger
		},
		onCropCancel : function(){
			this.cropCancel = true;
			$L('lyte-colorbox' , this.$node)[0].crop('cancel');
			this.setData("isCropperOpen" , false); //no i18n
			// this.showPreviewWithDetails(this.data.currentImageInfo.id);
		},
		onCropSave : function(){
			$L('lyte-colorbox' , this.$node)[0].crop();
		},
		swapHeightAndWidth : function(){
			$L('lyte-colorbox' , this.$node)[0].swapAspectRatio();
		},
		zoomFn : function(op , key){
			var zoomConfiguration = this.data.zoomConfiguration;//no i18n
				if(this.data.cxPropPreviewConfiguration.allowZoom && zoomConfiguration[op] === false){
					var zoomArray = zoomConfiguration.zoomRatioArray;
					var currentZoomRatio = this.getData('zoomRatio');//no i18n
					var neededZoomValue;
					var zoomArrayLength = zoomArray.length;
					if(key === "out"){
						for(var i = zoomArrayLength - 1 ; i >= 0 ; i --){
							if(currentZoomRatio > zoomArray[i]){
								neededZoomValue = zoomArray[i];
								break;
							}
						}
					}else{
						for(var j = 0 ; j < zoomArrayLength ; j ++){
							if(currentZoomRatio < zoomArray[j]){
								neededZoomValue = zoomArray[j];
								break;
							}
						}
					}
					if(neededZoomValue !== undefined){
						$L('lyte-colorbox' , this.$node)[0].zoomBy(neededZoomValue);//no i18n
						this.setData('zoomRatio',neededZoomValue);//no i18n
					}
				}
		}

	},
	methods : {
		changeNameOnBlur : function(oldName , id){
			if(this.data.cxPropPreviewConfiguration.showFileName){
        		this.saveImageName(oldName,id);
        	}
		},
		onOpenColorbox : function(){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			$L('lyte-colorbox',this.$node)[0].setData('ltPropCrop',this.data.cxPropEditable);
			// debugger
		},
		changeDescOnblur : function(oldDesc,id){
			if(this.data.cxPropPreviewConfiguration.showDescription){
        		this.saveDescription(oldDesc,id);
        	}
		},
		currentImageLoadCallback : function(imageElement, index){
			Lyte.objectUtils(this.data.currentImageConfig,"add","imageLoaded",false);//no i18n
			imageElement.classList.add('dN');// No I18N
			$L('.lyteColorboxDisplay').addClass('cxImagePreviewColorbox');
			setTimeout(function(){
				this.calculateInitialImageSize();
			}.bind(this),0);
			if(this.getMethods('onLoad')){
				this.executeMethod('onLoad', imageElement , index );
			}
		},
		currentImageFailCallback : function(imageElement){
			imageElement.classList.remove('vH');// No I18N
			Lyte.objectUtils(this.data.currentImageConfig ,"add","imageLoaded",true);//no i18n
			$L('.lyteColorboxDisplay').removeClass('cxImagePreviewColorbox');
		},
		navigateCallback : function(event , image ,position ){
			if($L('.imageEditParent').is(':visible')){
				return;
			}
			if(!this.processFurther ) {
	    		Lyte.objectUtils(this.getData('currentImageConfig') ,"add","error",true);//no i18n
	    		return;
	    	}
			this.showPreviewWithDetails(undefined , this.data.cxPropImages[position - 1][this.data.cxPropUniqueSelector], position - 1 , false);
		},
		colorboxBeforeClose : function(){
			var bool = true;
			if(this.getMethods('onBeforePreviewClose')){
				_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
				bool = this.executeMethod('onBeforePreviewClose')
			}
			if(bool === false){
				return false;
			}else{
				return this.closePreview();
			}
		},
		zoomByPerspective : function(even, type){
			if(this.data.cxPropPreviewConfiguration.allowZoom){
				var colorbox = $L('lyte-colorbox' , this.$node)[0];
				if(type === 'actual'){					
					colorbox.zoomBy(100);//no i18n	
					this.setData('zoomRatio',100);//no i18n
				}else if('reset'){ //no i18n
					colorbox.zoomBy('reset');//no i18n
					this.setData('zoomRatio',this.getData('zoomConfiguration.resetRatio'));//no i18n
				}
			}
			// return;
		},
		hideDropdown : function(even , comp){
			comp.setData("ltPropSelected" , "");//no i18n
		},
		onshowDropdown : function(){
			var drobBox = $L('.cxImgPreviewScaleMenu')[0];
			var zoomWrap = $L('.cxImgPrevZoomInOutWrap')[0];
			var left = (zoomWrap.offsetLeft - (zoomWrap.offsetWidth/2)) + 4;
			drobBox.style.left = left + "px";
		},
		cropperOpen : function(){
			$L("lyte-colorbox" , this.$node)[0].zoomBy('reset');//no i18n
			this.setData('zoomRatio',this.data.zoomConfiguration.resetRatio);//no i18n
			this.setData("isCropperOpen" , true); //no i18n
			var preview = LyteColorbox._domEle , width = preview.offsetWidth , height = preview.offsetHeight , cropper = this.data.cropperProp;
			this.cropping = true;
			Lyte.objectUtils(cropper , "add" , "minWidth" , 15);
			Lyte.objectUtils(cropper , "add" , "minHeight" , 15 );
			Lyte.objectUtils(cropper , "add" , "maxWidth" , width);
			Lyte.objectUtils(cropper , "add" , "maxHeight" ,height );
			Lyte.objectUtils(cropper , "add" , "width" , String(width));
			Lyte.objectUtils(cropper , "add" , "height" , String(height));
			Lyte.objectUtils(cropper , "add" , "disableSave" , true );
			this.cropping = false;
		},
		imageSizeAdjustFn : function(dimen , value){
			if(this.cropping){
				return;
			}
			if(dimen === "width"){
				LyteColorbox._component.$node.cropperWidth(value.newValue);
			}else{
				LyteColorbox._component.$node.cropperHeight(value.newValue);
			}
			Lyte.objectUtils( this.data.cropperProp , "add" , 'disableSave' ,false ); //no i18n
		},
		onCropImage : function(width , height){
			this.cropping = true;
			var cropper = this.data.cropperProp;
			Lyte.objectUtils(cropper , "add" , 'width' ,width ); //no i18n
			Lyte.objectUtils(cropper , "add" , 'height' ,height ); //no i18n
			Lyte.objectUtils(cropper , "add" , 'disableSave' ,false ); //no i18n
			this.cropping = false;
		},
		setHeightAndWidth : function(type , width , height){
			var cropper = this.data.cropperProp;
			if(cropper.width !== String(width) || cropper.height !== String(height)){
				var preview = $L(".lyteCropArea")[0] , maxWidth = preview.offsetWidth , maxHeight = preview.offsetHeight;
				Lyte.objectUtils(cropper , "add" , "maxWidth" , maxWidth);
				Lyte.objectUtils(cropper , "add" , "maxHeight" ,maxHeight );			
				Lyte.objectUtils(cropper , "add" , "width" , width);
				Lyte.objectUtils(cropper , "add" , "height" , height);
				Lyte.objectUtils(cropper , "add" , 'disableSave' ,false ); //no i18n
			}else if(type === 'rotate'){
				Lyte.objectUtils(cropper , "add" , 'disableSave' ,false ); //no i18n
			}
		},
		onCropperFinish : function(blob){
			this.setData("isCropperOpen" , false); //no i18n
			if(this.cropCancel){
				this.cropCancel = false;
				return;
			}
			return this.saveCroppedImage(blob);
		},
		onCropperCloseMthd : function(){
			this.setData("isCropperOpen" , false); //no i18n
		},
		onDownloadImage : function(){
			var currentImageInfo = this.data.currentImageInfo , images = this.data.cxPropImages , filename = currentImageInfo.name + currentImageInfo.extn;
			var image = images.find(function(img){ return img[ this.data.cxPropUniqueSelector ] === currentImageInfo.id; }.bind(this));
			if(!image){
				return;
			}
			var url = image[this.data.cxPropDownloadKey];
			var link = document.createElement('a');
			link.href = url;
			filename = filename ? filename.replace(/[ ,-]/g, "_") : 'file'; //no i18n
			link.setAttribute('download', filename); //no i18n
			this.$node.appendChild(link);
			link.click();
			this.$node.removeChild(link);
			return false;
		}
	},
	disableZoomButtons : function()
	{
		var zoomConfiguration = this.getData('zoomConfiguration');//no i18n
		var zoomRatioArray = zoomConfiguration.zoomRatioArray;
		var zoomArrayLength = zoomRatioArray.length;
		var disabledZoomList = [] , zoomValue = this.data.zoomRatio;
	    if(zoomValue === zoomConfiguration.resetRatio){
	    	 disabledZoomList.push('reset');
	    }
	    if(zoomValue === 100){
	    	disabledZoomList.push('actual');
	    }
	    Lyte.objectUtils(zoomConfiguration ,"add","zoomDisabledList",disabledZoomList);//no i18n
		if(zoomValue <= zoomConfiguration.resetRatio){
			Lyte.objectUtils(zoomConfiguration,"add","imageZoomState", false);//no i18n
		}else{
			Lyte.objectUtils(zoomConfiguration,"add","imageZoomState", true);//no i18n
		}
		if(zoomValue <= zoomRatioArray[0]){
			Lyte.objectUtils(zoomConfiguration,"add","minusDisabled", true);//no i18n
		}else{
			Lyte.objectUtils(zoomConfiguration,"add","minusDisabled", false);//no i18n
		}
		if(zoomValue >= zoomRatioArray[zoomArrayLength - 1]){
			Lyte.objectUtils(zoomConfiguration,"add","plusDisabled", true);//no i18n
		}else{
			Lyte.objectUtils(zoomConfiguration,"add","plusDisabled", false);//no i18n
		}
    }.observes('zoomRatio'),//no i18n
	showPreviewWithDetails : function(event , currentId , thumbPos , previewNeeded){
		if(!this.processFurther) {
    		Lyte.objectUtils(this.getData('currentImageConfig') ,"add","error",true);//no i18n
    		return;
    	}
		var previewConfig = this.data.cxPropPreviewConfiguration ,  oldId = previewConfig.currentId;
		if(thumbPos != undefined && oldId === currentId){
			return;
		}
		this.usedNames = []
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var imageDet = {}, pos, currentImageConfig = this.data.currentImageConfig ,nameSel = this.data.cxPropNameSelector, currentImageInfo = this.data.currentImageInfo , images = this.data.cxPropImages , selector = this.data.cxPropUniqueSelector , originalKey = this.data.cxPropPreviewUrlKey;
		var imageData = images.find(function(img){ return img[selector] === currentId; });
		this.currentImageId = currentId;
		for(var i = 0 ; i < images.length ; i++){
			if(images[i][selector] === currentId){
				imageData = images[i] , pos = i;
			}
			this.usedNames.push(images[i][nameSel]);
		}
		Lyte.objectUtils(currentImageConfig , "add" , "imageLoaded" ,false);//no i18n
		Lyte.objectUtils(currentImageInfo , "add" , "id" , imageData[selector]);//no i18n
		Lyte.objectUtils(currentImageInfo , "add" , "previewUrl" , imageData[originalKey]);//no i18n
		Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","loading");//no i18n
		Lyte.objectUtils(currentImageInfo ,"add",'index', pos + 1);//no i18n
		this.setData("cxPropPreviewConfiguration.currentId" , currentId);
		if(previewConfig.showFileName){
			var fName = imageData[nameSel], index = fName.lastIndexOf("."), newName = fName.substring(0,index) , extn = fName.substring(index, fName.length);
			Lyte.objectUtils(currentImageInfo , "add" , "name" , newName);//no i18n
			Lyte.objectUtils(currentImageInfo , "add" , "newName" , newName);//no i18n
			Lyte.objectUtils(currentImageInfo , "add" , "extn" , extn);//no i18n
		}
		if(previewConfig.showDescription){
			var desc = imageData.description;
			Lyte.objectUtils(currentImageInfo ,"add","desc", desc ? desc : '');//no i18n
	        Lyte.objectUtils(currentImageInfo ,"add","newDesc",desc ? desc : '');//no i18n
			if(desc){
				this.constructDescStructure(false, false, true);
			}else{
				this.constructDescStructure(true, false, false);
			}
		}
		if(this.getMethods("onBeforePreview")){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			this.executeMethod("onBeforePreview" , pos ,currentImageInfo , this.$node);
		}
		if(thumbPos !== undefined && previewNeeded === true) {
        	LyteColorbox.open(Number(thumbPos) + 1);
        }else if(thumbPos === undefined){
			// var obj = {lytecboxHref : imageData[originalKey] , lytecboxTitle : imageData[nameSel] , zcqa : this.data.cxPropPreviewZcqa+"_" + index};
			var obj = event.target.closest(".imagePreviewSelector");
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			LyteColorbox.launch(obj);
		}
		Lyte.objectUtils( this.data.currentImageConfig ,"add","nameEdit",false);//no i18n
    	this.calculateInitialImageSize();

	},
	calculateInitialImageSize : function(){
		var previewImage = LyteColorbox._domEle;
		var currentImageInfo = this.data.currentImageInfo;
    	Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","loading");//no i18n
		if(previewImage){
			var imageOrgHgt = previewImage.naturalHeight;
			if(previewImage.getAttribute('data-orientation') !== undefined){
        		var orientation = parseInt(previewImage.getAttribute('data-orientation'));
        		if(orientation === 6 || orientation === 8){
            		imageOrgHgt = previewImage.naturalWidth;
            	}
        	}
			if(imageOrgHgt && imageOrgHgt > 0){
				var currentImageConfig = this.data.currentImageConfig , previewConfig = this.data.cxPropPreviewConfiguration;
				Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","none");//no i18n
				var headerHgt = $L('.cxImgPrevHeader').outerHeight() , footerWrap = $L('.cxImagePreviewFooterWrap').outerHeight();
				var winHgt = window.innerHeight;
				var containerHgt = winHgt - (headerHgt + footerWrap) , contentHgt = containerHgt - (50+28); //extra top and bottom space of the image + headerWrap and footerWrap adjustment;
				Lyte.objectUtils(currentImageInfo ,"add","contentHeight",contentHgt);//no i18n
				if(previewImage.width <= 15 || previewImage.height <= 15){
            		Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","best_fit");//no i18n
            	}else if(currentImageInfo.extn === '.gif'){ //no i18n
            		Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","type_gif");//no i18n
            	}
				if(previewConfig.allowZoom === true)
                {
                	var diffrenceRatio = $L(previewImage).data('lytecbSize');//no i18n
                    Lyte.objectUtils(this.getData('zoomConfiguration') ,"add","resetRatio",diffrenceRatio);//no i18n
                    this.setData('zoomRatio',diffrenceRatio);//no i18n
                }
            	if(previewConfig.showInfoIcon === true)
            	{
					_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
					var _self = this;
            		Lyte.objectUtils(currentImageInfo ,"add","resolution",previewImage.naturalWidth + ' x ' + previewImage.naturalHeight + ' ' + _cruxUtils.getI18n('crm.image.width.px'));//no i18n
					var imageData = this.data.cxPropImages.find(function(img){ return img[_self.data.cxPropUniqueSelector] === _self.currentImageId; });
					Lyte.objectUtils(currentImageInfo,"add","size", _lyteUiUtils.lyteUiFileSize(imageData[this.data.cxPropSizeSelector], '' , 1));//no i18n
            	}
            	Lyte.objectUtils(currentImageConfig ,"add","imageLoaded",true);//no i18n
				previewImage.classList.remove('dN');//no i18n
			}
		}
	},
	saveImageName : function(oldName , id){
		var currentImageInfo = this.data.currentImageInfo,  newName = currentImageInfo.newName, images = this.data.cxPropImages , selector = this.data.cxPropUniqueSelector; //no i18n
		if(newName.length > this.data.cxPropMaxLengthObj.nameLength) {
			this.setData('customMessages',_cruxUtils.getI18n('crm.image.name.maxsize'));// No I18N
			Lyte.objectUtils(this.data.currentImageConfig ,"add","error",true);//no i18n
			this.processFurther = false;
			return;
		}
		if(newName.length === 0) {
			newName = oldName;
		}
		if(oldName !== newName){
			var imageData = images.find(function(img){ return img[selector] === id; }) , nameSel = this.data.cxPropNameSelector;
			var extn = currentImageInfo.extn , modifiedName = newName + extn;//no i18n
			if(this.checkNameAvailability(modifiedName)){
				modifiedName = this.changeUsedName(modifiedName,extn);//no i18n
			}
			this.resetModifiedName(modifiedName , oldName+extn);
			Lyte.objectUtils(imageData ,'add' , nameSel ,modifiedName );//no i18n
			var nameSubstring = modifiedName.substring(0,modifiedName.lastIndexOf(extn));
			Lyte.objectUtils( currentImageInfo ,"add","name",nameSubstring);//no i18n
			imageData.isNameChanged = true;
			if(this.getMethods('onNameChange')) { //NO I18n
				this.executeMethod('onNameChange', id ,modifiedName); //NO I18n
			}
		}
		Lyte.objectUtils( this.data.currentImageConfig ,"add","nameEdit",false);//no i18n
		this.processFurther = true;
	},
	saveDescription : function(oldValue , id){
		var currentImageInfo = this.data.currentImageInfo ,  newValue = currentImageInfo.newDesc , currentImageConfig = this.data.currentImageConfig;// No I18N
		if(newValue.length > this.data.cxPropMaxLengthObj.descriptionLength) 
		{
			this.setData('customMessages',_cruxUtils.getI18n('crm.image.desc.maxsize'));// No I18N
			Lyte.objectUtils(currentImageConfig ,"add","error",true);//no i18n
			this.processFurther = false;
			return;
		}
		if(newValue !== oldValue) 
		{
			var images = this.data.cxPropImages , sel = this.data.cxPropUniqueSelector;
			var imageData = images.find(function(img){ return img[sel] === id; });
			Lyte.objectUtils( imageData ,"add","description",newValue);//no i18n
			Lyte.objectUtils( currentImageInfo,"add","desc",newValue);//no i18n
			imageData.isDescChanged = true;
			if(this.getMethods('onDescChange')) { //NO I18n
				this.executeMethod('onDescChange', id ,newValue); //NO I18n
			}
		}
		if(newValue === ''){
			this.constructDescStructure(true,false,false);
		}else{
			this.constructDescStructure(false,false,true);	
		}
		this.processFurther = true;
	},
	constructDescStructure : function(header,input,para)
	{
		if(this.data.cxPropPreviewConfiguration.showDescription === true)
		{
			var currentImageConfig = this.getData('currentImageConfig');//no i18n
			  if(header !== undefined){
				  Lyte.objectUtils(currentImageConfig ,"add","imageDescHeader",header);//no i18n
			  }
			  if(input !== undefined){
				  Lyte.objectUtils(currentImageConfig ,"add","showImageDescInput",input);//no i18n
			  }
			  if(para !== undefined){
				  Lyte.objectUtils(currentImageConfig ,"add","showImageDesc",para);//no i18n
			  }
		}
	},
	cropperOpenClose : function(){
		var crop = this.data.isCropperOpen;
		if(crop){
			LyteColorbox._component.childComp.classList.add('cxImgCropWrapperCont');
		}else{
			LyteColorbox._component.childComp.classList.remove('cxImgCropWrapperCont');
		}
	}.observes('isCropperOpen'),
	closePreview : function() 
	{
		if(this.getData('showCropper')){
			return false;
		}else{
			if(!this.processFurther) 
			{
				Lyte.objectUtils(this.data.currentImageConfig ,"add","error",true);//no i18n
				return false;
			}
			document.removeEventListener('resize' , this.calcFn , true);
			delete this.calcFn;
			// var container = LyteColorbox._box;
			// var preview_scope = this;
			// var transitonFunction = function() {
			// 	container.classList.remove( 'transitionColorbox' );//NO I18n
			LyteColorbox.close();
			// 	if(preview_scope.getMethods('onClose')){ // No I18n
			// 		preview_scope.executeMethod('onClose'); //NO I18n
			// 	}
			// 	container.removeEventListener( 'transitionend', transitonFunction );
			// };
			// container.classList.add( 'transitionColorbox' );//NO I18n
			// container.addEventListener( 'transitionend', transitonFunction  );
			// return false;
			if(this.getMethods('onClose')){ // No I18n
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
				this.executeMethod('onClose'); //NO I18n
			}
			return true;
		}
	}
},{mixins : ["crux-image-preview-util"]});

Lyte.Component.register("crux-upload-modal", {
_template:"<template tag-name=\"crux-upload-modal\"> {{addMurhyInfo(\"crux-upload-modal.html\",\"Feb Default Changes\")}} <lyte-modal on-show=\"{{method('onModalShow')}}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-show-close-button=\"{{if(ifEquals(cxPropType,'single'),true,false)}}\" on-close=\"{{method('onModalCloseMthd')}}\" lt-prop-bind-to-body=\"true\" lt-prop-transition=\"{ &quot;animation&quot; : &quot;slideFromTop&quot; , &quot;duration&quot; : &quot;0&quot;}\" lt-prop-width=\"840px\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-allow-multiple=\"true\" lt-prop=\"{{cruxStringify(cxPropModalProperties)}}\" on-before-show=\"{{method('onBeforeShowModal')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <lyte-modal-header class=\"cxImgUploadModaHeader\"> <template is=\"if\" value=\"{{cxPropHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxFileUploadTitleYield\"></lyte-yield> </template><template case=\"false\"> {{cxPropTitle}} </template></template> </lyte-modal-header> <lyte-modal-content class=\"cxFlex\"> <div class=\"cxImgUploadModalContent\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'===','single')}}\"><template case=\"true\"><template is=\"if\" value=\"{{showUploadPage}}\"><template case=\"true\"> <lyte-fileupload lt-prop-yield=\"true\" queue-list=\"{{lbind(fileList)}}\" lt-prop-total-files-size=\"{{cxPropAllowedTotalSize}}\" lt-prop-multiple=\"{{if(expHandlers(cxPropType,'==','multiple'))}}\" lt-prop-accept=\"{{cxPropAcceptedTypes}}\" lt-prop-ajax=\"{{cxPropAjax}}\" on-add=\"{{method('onFileUploadAdded')}}\" lt-prop-auto-upload=\"{{cxPropAutoUpload}}\" on-file-success=\"{{method('onFileSuccessFn')}}\" on-reject=\"{{method('fileRejectFn')}}\"> <template is=\"registerYield\" yield-name=\"file\"> <lyte-file-select-area> <template is=\"if\" value=\"{{cxPropContentYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxFileUploadContentYield\"></lyte-yield> </template><template case=\"false\"> <div class=\"cxFileDropArea\" lt-prop-title=\"{{if(fileUploading,cruxGetI18n('crm.imageupload.wait.msg'))}}\" lt-prop-tooltip-style=\"font-size:1.2rem;\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;, &quot;margin&quot; : &quot;50px&quot;, &quot;maxdisplaytime&quot;:3000}\"> <div class=\"cxFileDropInnerContent\"> <div class=\"cxFileUploadIcon\"></div> <p class=\"cxDropFieldText1\">{{cruxGetI18n(\"crm.image.filepicker.desc.draganddrop\")}}</p> <p class=\"cxDropFieldText2\">-{{cruxGetI18n(\"crm.label.lowercase.or\")}}-</p> <p class=\"cxDropFieldText3\">{{cruxGetI18n(\"crm.image.filepicker.desc.browse\")}}</p> </div> </div> </template></template> </lyte-file-select-area> </template> </lyte-fileupload> </template><template case=\"false\"> <div class=\"cxUploadContainer\"> <img id=\"cxUploadedImage\" src=\"{{imageData[0].preview_url}}\" style=\"width: 100%;\" alt=\"/\"> </div> </template></template> </template><template case=\"false\"> <div class=\"cxMulImgUploadCountCont\"> <div class=\"cxMulImgUploadCount\"> <lyte-progressbar lt-prop=\"{&quot;type&quot;:&quot;circle&quot;,&quot;stroke&quot;:&quot;3&quot;,&quot;radius&quot;:&quot;8&quot; , &quot;showPercentage&quot; : false ,&quot;progressProperty&quot; : {&quot;value&quot;: &quot;{{progressProp.countPercentage}}&quot;}}\" lt-prop-completed-fill-color=\"{{cxPropProgressStatusColours.count}}\" lt-prop-progress-fill-color=\"{{cxPropProgressStatusColours.count}}\"> </lyte-progressbar> <span class=\"cxMultImgUploadCountLabel\">{{cxPropUploadedCountTitle}} : </span> <span class=\"cxMultImgUploadCountValue\">{{selectedFileCount}} / {{cxPropMaxFilesCount}}</span> </div> <span class=\"cxMulImgCountSeparator cxMultImgUploadCountLabel\">|</span> <div class=\"cxMulImgUploadCount\"> <lyte-progressbar lt-prop=\"{&quot;type&quot;:&quot;circle&quot;,&quot;stroke&quot;:&quot;8&quot;,&quot;radius&quot;:&quot;8&quot; , &quot;showPercentage&quot; : false ,&quot;progressProperty&quot; : {&quot;value&quot;: &quot;{{progressProp.sizePercentage}}&quot;}}\" lt-prop-completed-fill-color=\"{{cxPropProgressStatusColours.size}}\" lt-prop-progress-fill-color=\"{{cxPropProgressStatusColours.size}}\"> </lyte-progressbar> <span class=\"cxMultImgUploadCountLabel\">{{cruxGetI18n('crm.attach.upload.sizelimit')}} : </span> <span class=\"cxMultImgUploadCountValue\">{{currentTotalFileSize}}{{totalFileUnit}} / {{cxPropAllowedTotalSize}}</span> </div> </div> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-file-upload class=\"cxImgUpldContFileUpldComp\" cx-prop-file-upload-class=\"{{if(isSaveProgress,'cxFileUploadFreezeLayer','')}}\" cx-prop-parallel=\"{{cxPropParallel}}\" cx-prop-progress-status-colours=\"{{cxPropProgressStatusColours}}\" cx-prop-validate-by-ext=\"true\" cx-prop-rename-duplicate-file=\"true\" file-list=\"{{lbind(fileList)}}\" cx-prop-retry=\"{{cxPropRetry}}\" cx-prop-sortable-drag-class=\"cxImgUpModalFileUpdListFile\" cx-prop-predefined-list=\"{{lbind(cxPropFiles)}}\" cx-prop-manual-retry=\"{{cxPropManualRetry}}\" cx-prop-disable-browse-btn=\"{{disableBrowseBtn}}\" cx-prop-progress-tooltip=\"{{cxPropProgressTooltip}}\" cx-prop-ajax=\"{{cxPropAjax}}\" cx-prop-size-selector=\"{{cxPropSizeSelector}}\" cx-prop-param-name=\"{{cxPropParamName}}\" cx-prop-thumb=\"true\" cx-prop-multiple=\"true\" cx-prop-max-files-count=\"{{cxPropMaxFilesCount}}\" cx-prop-minimum-file-size=\"1\" cx-prop-list-appearance=\"{{cxPropListAppearance}}\" cx-prop-accepted-types=\"{{cxPropAcceptedTypes}}\" cx-prop-sortable=\"true\" cx-prop-editable=\"{{cxPropEditable}}\" cx-prop-select-area=\"{{cxPropSelectArea}}\" cx-prop-max-size-reach-tooltip=\"{{cxPropMaxSizeReachTooltip}}\" cx-prop-max-count-reach-tooltip=\"{{cxPropMaxCountReachTooltip}}\" cx-prop-list-class=\"cxMultiAttachImageSelector_{{cxPropId}}\" cx-prop-single-file-size=\"{{cxPropAllowedSingleFileSize}}\" cx-prop-source-key=\"{{cxPropSourceKey}}\" cx-prop-preview-url-key=\"{{cxPropPreviewUrlKey}}\" cx-prop-auto-upload=\"{{cxPropAutoUpload}}\" cx-prop-download-key=\"{{cxPropDownloadKey}}\" total-file-size=\"{{lbind(totalFileSiz)}}\" cx-prop-upload-progress=\"{{lbind(cxPropUploadProgress)}}\" on-edit-image=\"{{method('onEditImage')}}\" on-add=\"{{method('onAddFile')}}\" on-file-success=\"{{method('onFileSuccessFn')}}\" on-remove=\"{{method('onRemoveFile')}}\" on-success=\"{{method('onSuccessFn')}}\" on-before-add=\"{{method('onBeforeAddFn')}}\" on-failure=\"{{method('onFailureFn')}}\" on-file-reject=\"{{method('fileRejectFn')}}\" on-before-send=\"{{method('onBeforeSendFn')}}\" on-before-drop=\"{{method('onBeforeDropFn')}}\" on-sortable-drop=\"{{method('onDropFn')}}\" on-validation-end=\"{{method('onValidationEndFn')}}\" on-select=\"{{method('onSelectFn')}}\" on-before-manual-retry=\"{{method('onBeforeManualRetryFn')}}\"></crux-file-upload> </template></template> <lyte-messagebox lt-prop-show=\"{{lbind(showRejectMsgBox)}}\" lt-prop-duration=\"5000\" lt-prop-yield=\"true\" lt-prop-type=\"error\"> <template is=\"registerYield\" yield-name=\"messageboxYield\"> {{unescape(rejectedFileLiteral)}} </template> </lyte-messagebox> </div> <template is=\"if\" value=\"{{renderPreviewComp}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <crux-image-preview cx-prop-images=\"{{imagePreviewFiles}}\"> <template is=\"registerYield\" yield-name=\"previewHeaderYield\" from-parent=\"\"></template> </crux-image-preview> </template></template> </lyte-modal-content> <lyte-modal-footer class=\"right\"> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxFileUploadFooterYield\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(showUploadPage,'!')}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-upload-modal.html\",\"Feb Default Changes\")}} <lyte-button data-zcqa=\"onCancel_popup\" onclick=\"{{action('closeModalAction')}}\"> <template is=\"registerYield\" yield-name=\"text\" onclick=\"{{action('closeModalAction')}}\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> {{addMurhyInfo(\"crux-image-component\",\"January Group Automation\")}} <template is=\"if\" value=\"{{expHandlers(cxPropType,'===',&quot;single&quot;)}}\"><template case=\"true\"> <lyte-button data-czqa=\"onUpload_popup\" lt-prop-disabled=\"{{disableAttachBtn}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('attachImage')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{cxPropCropping}}\"><template case=\"true\"> {{cruxGetI18n('crm.general.crop.and.set')}} </template><template case=\"false\"> {{cruxGetI18n('crm.attach.option.label')}} </template></template> </template> </lyte-button> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'===',&quot;multiple&quot;)}}\"><template case=\"true\"> <lyte-button data-zcqa=\"onUpload_popup\" class=\"{{if(isSaveProgress,'cxPrimaryBtnLoader','')}}\" lt-prop-disabled=\"{{cruxOr(disableAttachBtn,isSaveProgress)}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('attachAllImage')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{isSaveProgress}}\"><template case=\"true\"> <span class=\"cxCircleLoader\"> <span class=\"cxCircleLoader1\"></span> <span class=\"cxCircleLoader2\"></span> </span> </template><template case=\"false\"> {{cruxGetI18n('crm.attach.option.label')}} </template></template> </template> </lyte-button> </template></template> </template></template> </template></template> </lyte-modal-footer> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1,1]},{"type":"if","position":[5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,3,0]},{"type":"text","position":[1,1,5,1]},{"type":"text","position":[1,1,7,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"text","position":[1,1,5,0]},{"type":"text","position":[1,1,5,2]},{"type":"attr","position":[1,5,1]},{"type":"componentDynamic","position":[1,5,1]},{"type":"text","position":[1,5,3,0]},{"type":"text","position":[1,5,5,0]},{"type":"text","position":[1,5,5,1]},{"type":"text","position":[1,5,5,3]},{"type":"text","position":[3]},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[5,1,3]},{"type":"registerYield","position":[5,1,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1,3]},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[5]},{"type":"text","position":[7,1]},{"type":"attr","position":[7,3]},{"type":"if","position":[7,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"text","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[7]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["cxPropType","cxPropFileType","cxPropAllowedTotalSize","cxPropAllowedSingleFileSize","cxPropTitle","cxPropHeaderYield","cxPropContentYield","cxPropCropping","showUploadPage","cxPropAcceptedTypes","cxPropAjax","cxPropAutoUpload","cxPropMaxFilesCount","storedCount","fileList","cxPropAspectRatio","cxPropMinSize","cxPropMaxSize","cxPropSelectArea","cxPropFiles","cxPropDownloadKey","cxPropPreviewUrlKey","cxPropSizeSelector","cxPropSourceKey","cxPropId","cxPropListAppearance","cxPropParamName","cxPropRetry","disableAttachBtn","cxPropParallel","currentTotalFileSize","disableBrowseBtn","errorTooltipMsg","progressProp","totalFileUnit","cxPropManualRetry","cxPropUploadProgress","cxPropWrapperClass","cxPropModalProperties","cxPropReadonly","rejectedFileLiteral","showRejectMsgBox","allowedSizeInt","renderPreviewComp","cxPropProgressStatusColours","imagePreviewFiles","cxPropUploadedCountTitle","cxPropMaxSizeReachTooltip","cxPropMaxCountReachTooltip","cxPropProgressTooltip","cxPropShow","selectedFileCount","imageData","cxPropEditable","isSaveProgress"],
_observedAttributesType :["string","string","string","string","string","boolean","boolean","boolean","boolean","string","object","boolean","number","number","array","string","number","number","object","array","string","string","string","string","string","string","string","number","boolean","number","number","boolean","string","object","string","boolean","boolean","string","object","boolean","string","boolean","string","boolean","object","array","string","string","string","string","boolean","number","array","boolean","boolean"],

	data : function(){
		return {
			cxPropType 				: Lyte.attr('string',{default : 'single'}), //no i18n
			cxPropFileType 			: Lyte.attr('string'), //no i18n
			cxPropAllowedTotalSize 	: Lyte.attr('string' , {default : '20MB'}), //no i18n
			cxPropAllowedSingleFileSize : Lyte.attr("string"),//No I18n
			cxPropTitle 			: Lyte.attr('string',{default : 'Attach Files'}), //no i18n
			cxPropHeaderYield 		: Lyte.attr('boolean',{default : false}), //no i18n
			cxPropContentYield 		: Lyte.attr('boolean',{default : false}), //no i18n
			cxPropCropping 			: Lyte.attr('boolean',{default : true}), //no i18n
			showUploadPage 			: Lyte.attr('boolean',{default : true}), //no i18n
			cxPropAcceptedTypes 	: Lyte.attr('string',{default : '.png,.jpg,.jpeg,.bmp,.gif'}), //no i18n
			cxPropAjax 				: Lyte.attr('object',{default : {"url":"/Fileupload"}}), //no i18n
			cxPropAutoUpload 		: Lyte.attr('boolean',{default : true}), //no i18n
			cxPropMaxFilesCount 	: Lyte.attr('number' , {default : 10}), //no i18n
			storedCount 			: Lyte.attr('number'), //no i18n
			fileList				: Lyte.attr('array' , {default : []}), //no i18n
			cxPropAspectRatio 		: Lyte.attr('string',{default : '1:1'}), //no i18n
			cxPropMinSize 			: Lyte.attr('number',{default : 'auto'}), //no i18n
			cxPropMaxSize 			: Lyte.attr('number',{default : 'auto'}), //no i18n
			cxPropSelectArea 		: Lyte.attr('object' , {default : {}}), //no i18n
			cxPropFiles   			: Lyte.attr('array' , {default : []}), //no i18n
			cxPropDownloadKey		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropPreviewUrlKey		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropSizeSelector		: Lyte.attr( 'string', { "default" : 'size' } ),//no i18n
			cxPropSourceKey			: Lyte.attr( 'string', { "default" : 'src' } ),//no i18n
			cxPropId				: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropListAppearance	: Lyte.attr( 'string', { "default" : 'inner' } ),//no i18n
			cxPropParamName			: Lyte.attr( 'string', { "default" : 'file' } ),//no i18n
			cxPropRetry				: Lyte.attr('number' , {default : 0}), //no i18n
			disableAttachBtn		: Lyte.attr('boolean',{default : false}), //no i18n
			cxPropParallel			: Lyte.attr('number' , {default : 10}), //no i18n
			currentTotalFileSize	: Lyte.attr('number'), //no i18n
			// totalFileSize			: Lyte.attr('number' , {default : 0}), //no i18n
			disableBrowseBtn		: Lyte.attr('boolean',{default : false}), //no i18n
			errorTooltipMsg			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			progressProp			: Lyte.attr('object' , {'default' : {'countPercentage' : 0 , 'sizePercentage' : 0}}), //no i18n
			totalFileUnit			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropManualRetry		: Lyte.attr('boolean',{default : true}), //no i18n
			cxPropUploadProgress	: Lyte.attr('boolean',{default : false}), //no i18n
			cxPropWrapperClass		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropModalProperties	: Lyte.attr('object' , {'default' : {}}), //no i18n
			cxPropReadonly			: Lyte.attr('boolean',{default : false}), //no i18n
			rejectedFileLiteral		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			showRejectMsgBox		: Lyte.attr('boolean',{default : false}), //no i18n
			allowedSizeInt			: Lyte.attr( 'string'),//no i18n
			renderPreviewComp		: Lyte.attr('boolean',{default : false}), //no i18n
			cxPropProgressStatusColours : Lyte.attr('object' , {'default' : {count : '#3fbd5f' , size : "#338CF0" , list : "#338CF0"}}), //no i18n
			imagePreviewFiles 		: Lyte.attr('array' , {default : []}), //no i18n
			cxPropUploadedCountTitle : Lyte.attr( 'string', { "default" : 'Files Uploaded' } ),//no i18n
			cxPropMaxSizeReachTooltip : Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropMaxCountReachTooltip : Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropProgressTooltip : Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropShow : Lyte.attr('boolean',{default : false}), //no i18n
			selectedFileCount : Lyte.attr('number' , {default : 0}), //no i18n
			imageData : Lyte.attr('array'), //no i18n
			cxPropEditable : Lyte.attr('boolean',{default : true}), //no i18n
			isSaveProgress : Lyte.attr('boolean',{default : false}) //no i18n
		};		
	},
	init : function(){
		this.$node.openFileUpload = function(files){
			var comp = this.component;
			comp.setData("cxPropFiles" , files);//no i18n
			comp._modal.ltProp('show',true);
		};
		if(this.data.cxPropAllowedTotalSize){
			this.data.allowedSizeInt = this.data.cxPropAllowedTotalSize.match(/[0-9]+/g)[0];
			if(!this.data.cxPropMaxSizeReachTooltip){
				this.setData("cxPropMaxSizeReachTooltip", _cruxUtils.getI18n('crm.fileuploader.message.totalfilesizeexceeded', this.data.allowedSizeInt));
			}
		}
		if(this.data.cxPropMaxFilesCount && !this.data.cxPropMaxCountReachTooltip){
			this.setData("cxPropMaxCountReachTooltip", _cruxUtils.getI18n('crm.fileuploader.message.maxfilesexceeded',this.data.cxPropMaxFilesCount));
		}
		if(!this.data.cxPropProgressTooltip){
			this.setData('cxPropProgressTooltip' ,_cruxUtils.getI18n('crm.fileupload.wait.msg'));
		}
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var selectArea = this.data.cxPropSelectArea;
		selectArea.primary_message = selectArea.primary_message || _cruxUtils.getI18n("crm.fileupload.drag.drop.here");
		selectArea.supported_message = selectArea.supported_message || _cruxUtils.getI18n("crm.fileupload.support.format");
		selectArea.browse_text = selectArea.browse_text || _cruxUtils.getI18n('crm.label.browse.files');
		selectArea.icon_class = selectArea.icon_class === undefined ? "cxFileUploadHeadIcon" : selectArea.icon_class ;
	},
	didConnect : function(){
		this._modal = this.$node.querySelector('lyte-modal');
		this.invalidFiles = [];
		this.validFiles = [];
		//debugger
	},
	descriptionChange : function(value , newValue){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		this.setData('disableAttachBtn' , false); //no i18n
		if(this.getMethods('onEdit')){
			this.executeMethod('onEdit', "description" , id , newValue);
		}
		// var files = this.data.cxPropFiles;
		// var file = files.find(function(fi){return fi.id === id});
		// Lyte.objectUtils(value , "add" , "description" , newValue); //no i18n
		// value.isDescChanged = true;
	},
	nameChange : function(id , newValue){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		this.setData('disableAttachBtn' , false); //no i18n
		if(this.getMethods('onEdit')){
			this.executeMethod('onEdit', "name" , id , newValue);
		}
		// var files = this.data.cxPropFiles;
		// var file = files.find(function(fi){return fi.id === id});
		// Lyte.objectUtils(file , "add" , "name" , newValue); //no i18n
		// file.isNameChanged = true;
	},
	onDeleteFromPreview : function(file){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		this.setData('disableAttachBtn' , false); //no i18n
		// var files = this.data.cxPropFiles;
		// var index = files.findIndex(function(fi){return fi.id === id});
		// if(index !== -1){
		// 	Lyte.arrayUtils(files , "splice" , index , 1);//no i18n
		// }
		var rFile = $L("lyte-fileupload", this.modalChildComp)[0].removeUpload(file.id);
		if(this.getMethods('onDeleteFromUpload')){
			this.executeMethod("onDeleteFromUpload",rFile);
		}
	},
	onCropSuccessFn : function(res , value , src){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		function searchVal(values , id){
			return values.find(function(x){ return x.id === id; });
		}
		// var images =  this.data.fileList.concat(this.data.cxPropFiles);
		// var image = images.find(function(x){return x.id === value.id});
		var image = searchVal(this.data.fileList , value.id);
		image = image ? image : searchVal(this.data.cxPropFiles , value.id);
		var prevSize = image[this.data.cxPropSizeSelector];
		if(this.getMethods('onCropSuccess')){
			var retValues = this.executeMethod('onCropSuccess', res , Object.assign({} , value) );
		}
		if(retValues){
			var keys = Object.keys(retValues) , len = keys.length;
			for(var i = 0 ; i < len ; i++){
				Lyte.objectUtils(image , "add" , keys[i] ,  retValues[keys[i]]); //no i18n
			}
		}
		var diff = Number(prevSize) - image[this.data.cxPropSizeSelector];
		this.removeFromTotalFileSize(diff);
		image.isCropped = true;
		Lyte.objectUtils(image , "add" , this.data.cxPropPreviewUrlKey ,  src); //no i18n
		Lyte.objectUtils(image , "add" , this.data.cxPropDownloadKey ,  src); //no i18n
		Lyte.objectUtils(image , "add" , this.data.cxPropSourceKey , src); //no i18n
		this.setData('disableAttachBtn' , false); //no i18n
	},
	closePreviewFn : function(){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onPreviewClose')){
			this.executeMethod('onPreviewClose', res , value );
		}
	},
	onPreviewLoad : function(imageElem , index){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onLoad')){
			this.executeMethod('onLoad', imageElem , index );
		}
	},
	onBeforePreviewImage : function(pos, image , node){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(this.getMethods('onBeforePreview')){
			this.executeMethod('onBeforePreview', pos , image , node );
		}
	},
	methods : {
		onFileUploadAdded: function(res){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			var imageUrl = Object.assign(res,{preview_url : window.URL.createObjectURL(res)});
			this.setData('showUploadPage',false);
			this.setData('imageData',[imageUrl]);
			this.imageElem = $L('#cxUploadedImage',this.modalChildComp);
			if(this.data.cxPropCropping){
				this.listener = this.loadEventListener.bind(this);
				this.imageElem[0].addEventListener('load',this.listener);
			}
			if(!this.data.cxPropAutoUpload){
				this.setData('disableAttachBtn' , false); //no i18n
			}
		},
		onRemoveFile : function(from , file){
			this.setData("selectedFileCount" ,  this.data.selectedFileCount - 1); //no i18n
			if(file.status !== 'error' && !this.validationEndRemove){
				this.removeFromTotalFileSize(file[this.data.cxPropSizeSelector]);//no i18n
			}
			this.validate();
			if(!this.data.selectedFileCount && !this.initialFiles.length){
				this.setData('disableAttachBtn' , true); //no i18n
			}
			// else{
			// 	this.setData('disableAttachBtn' , false); //no i18n
			// }
			if(this.getMethods('onRemove')){ //no i18n
				return this.executeMethod('onRemove', file); //no i18n
			}
		},
		onModalShow : function(){
			this.initialFiles = $L.extend(true, [] ,this.data.cxPropFiles);
			this.modalChildComp = this._modal.component.childComp;
			// this.progressCount = 0;
			var sizeSel = this.data.cxPropSizeSelector;
			this.crtTotalSizeInBytes = this.initialFiles.reduce(function(ac , cur){ return ac + Number(cur[sizeSel]) } , 0);	
			this.setData("selectedFileCount" , this.data.cxPropFiles.length);
			this.setData("currentTotalFileSize" , this.fileSizeConvertAsPerUnit(this.crtTotalSizeInBytes));
			this.validate(true);
			var uploadBtnElem = $L(".typeFileSelectionArea .fileUploadSelectAreaBtn" , this.modalChildComp)[0];
			if(uploadBtnElem){
				uploadBtnElem.focus();
			}
			this.setData("showUploadPage" , this.data.cxPropType !== "multiple" ); //no i18n
			// this.$node.querySelector('lyte-modal').trapFocus( true );
		},
		onModalCloseMthd : function(){
			this.setData("cxPropFiles" , []); //no i18n
			this.setData({'imageData' : undefined , "showUploadPage" : true});
			var fileComp = $L("lyte-fileupload", this.modalChildComp)[0];
			if(fileComp){
				fileComp.component.setData("ltPropReset" , true);//no i18n
			}
			if(this.getMethods('onClose')){ //no i18n
				this.executeMethod('onClose', this.$node); //no i18n
		    }
		},
		onBeforeAddFn : function(){
			// if(this.checkTotalFilessize(file.size)){
			// 	_cruxUtils.showCustomMessage({ params : { ltPropMessage :  _cruxUtils.getI18n("crm.fileuploader.message.totalfilesizeexceeded" , this.data.cxPropAllowedTotalSize) , ltPropType : "error" } } );
			// 	return false;
			// }
		},
		onAddFile : function(file){
			this.setData("selectedFileCount" ,  this.data.selectedFileCount + 1); //no i18n
			// this.progressCount += 1 ;
			// this.validate();
			this.addToTotalFilesSize(file.size);
			this.validFiles.push(file);
			if(this.getMethods('onAdd')){ //no i18n
				return this.executeMethod('onAdd', file); //no i18n
		    }
			if(!this.data.cxPropAutoUpload){
				this.setData('disableAttachBtn' , false); //no i18n
			}
		},
		onEditImage : function(event , file){
			var selector = ".cxMultiAttachImageSelector_" + this.data.cxPropId;
			var files = $L("crux-file-upload",this.modalChildComp)[0].component.getAllFiles();  //no i18n
			this.setData("imagePreviewFiles", files);
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			this.constructDataAndShow(file.id , files , selector , !this.data.cxPropReadonly , this.data.cxPropType  , event , 'modal');
		},
		onFileSuccessFn : function(lxhr , file){
			if(this.data.cxPropType === 'single'){
				this.setData('disableAttachBtn' , false); //no i18n
			}else{
				if(!lxhr.xhr.responseText){
					file.status = "error";
					var listFile = this.data.fileList.find(function(fi){ return fi.id === file.id; });
					var msg = this.data.cxPropFileType === 'image' ? _cruxUtils.getI18n("crm.image.unsupported.corrupted.single") : "The file that you're trying to upload is corrupted.";
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : msg , ltPropType : "error" } } );
					Lyte.objectUtils(listFile, "add" , "status", "error");
					this.setData('disableAttachBtn' , true); //no i18n
					listFile.retry = this.data.cxPropRetry;
					return;
				}
			}
			// this.progressCount -= 1 ;
			// this.validate();
			if(this.getMethods('onFileSuccess')){ //no i18n
				return this.executeMethod('onFileSuccess', lxhr , file); //no i18n
		    }
		},
		onProgressFn : function(){
			// this.setData('disableAttachBtn' , true); //no i18n
		},
		onSuccessFn : function(){
			// this.setData('disableAttachBtn' , false); //no i18n
			this.validate();
		},
		onFailureFn : function(){
			// this.progressCount -= 1 ;
			this.validate();
		},
		fileRejectFn : function(file , obj){
			 var fileType = this.data.cxPropFileType;
			if(obj.totalSize === "Exceeds"){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : fileType === "image" ? _cruxUtils.getI18n("crm.ImageuploadField.size.limit" , this.data.allowedSizeInt) : "The total file(s) size exceeds the allowed limit of" + this.data.allowedSizeInt + "MB." , ltPropType : "error" } } );
			}else if(obj.size === "Lower_Size"){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : fileType === "image" ? _cruxUtils.getI18n('crm.image.unsupported.corrupted.single') : "The file that you're trying to upload is corrupted." , ltPropType : "error" } } );
			}else if(obj.fileCount === "Exceeds"){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : fileType === "image" ?  _cruxUtils.getI18n("crm.imageupload.allowed.field.length" , this.data.cxPropMaxFilesCount) : "You can upload a maximum of" +  this.data.cxPropMaxFilesCount + "file(s) only." , ltPropType : "error" } } );
			}else if(obj.type === "Invalid_Type"){
				this.invalidFiles.push(file);
			}
		},
		onBeforeSendFn : function(){
			if(this.data.cxPropUploadProgress){
				this.setData('disableAttachBtn' , true); //no i18n
			}
		},
		onDropFn : function(from , to){
			if(from !== to){
				this.setData('disableAttachBtn' , false); //no i18n
			}
		},
		onBeforeDropFn : function(event, elem , files){
			return this.checkBeforeAdd(files);
		},
		onSelectFn : function(files){
			return this.checkBeforeAdd(files);
		},
		onBeforeManualRetryFn : function(file){
			if(this.data.cxPropAllowedTotalSize && this.crtTotalSizeInBytes + file.size > this.totalFilesSizeInBytes){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : this.data.cxPropFileType === "image" ? _cruxUtils.getI18n("crm.ImageuploadField.size.limit" , this.data.allowedSizeInt) : "The total file(s) size exceeds the allowed limit of "+ this.data.allowedSizeInt+ "MB." , ltPropType : "error" } } );
				return false;
			}
		},
		onBeforeShowModal : function(){
			if(this.getMethods('onBeforeShow')){ //no i18n
				return this.executeMethod('onBeforeShow', this.$node); //no i18n
		    }
		},
		onValidationEndFn : function(){
			var inVFiles = this.invalidFiles;
			if(inVFiles && inVFiles.length){
				var len = inVFiles.length;
				if(len === 1){
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : _cruxUtils.getI18n("crm.fileuploader.message.invalidfileType1" , inVFiles[0].name) , ltPropType : "error" } } );
				}else if(len === 2){
					_cruxUtils.showCustomMessage({ params : { ltPropMessage : _cruxUtils.getI18n("crm.fileuploader.message.invalidfileType2" , inVFiles[0].name , inVFiles[1].name) , ltPropType : "error" } } );
				}else{
					var filesListElem = "";
					for(var i = 1 ; i < len ; i++){
						filesListElem = filesListElem + inVFiles[i].name + (i !== len-1 ? "\n" : "");
					}
					var literalMsg = _cruxUtils.getI18n("crm.fileuploader.message.invalidfileType2" , inVFiles[0].name , "<div id='cxImageUploadRejectId' class='cxDIB cxImgUpdRejectedMoreFilesMsg' lt-prop-title='"+filesListElem+"'>"+_cruxUtils.getI18n("crm.fileuploader.message.morefiles" , len-1) +"</div>");					
					this.setData({ 'rejectedFileLiteral' : literalMsg, 'showRejectMsgBox' : true });
				}
				var fileList = this.data.fileList , vFiles = this.validFiles, vLen = vFiles.length;
				var cruxFileUpload = $L("crux-file-upload", this.modalChildComp)[0].component;
				for(var j = 0 ; j < vLen ; j++){
					var index = fileList.findIndex(function(item){ return item.id === vFiles[j].id; });
					if(index !== -1){
						this.validationEndRemove = true;
						cruxFileUpload.removeFiles(this.validFiles[j].id);
						this.validationEndRemove = false;
						// Lyte.arrayUtils( fileList , 'removeAt' , index , 1 );
						// this.setData("selectedFileCount" ,  this.data.selectedFileCount - 1); //no i18n
					}
				}
				this.invalidFiles = [];
				return false;
			}
			this.validFiles = [];
		}
	},
	checkBeforeAdd : function(files){
		var type = this.data.cxPropFileType;
		if(this.data.cxPropMaxFilesCount && this.data.selectedFileCount + files.length > this.data.cxPropMaxFilesCount){
			_cruxUtils.showCustomMessage({ params : { ltPropMessage : type === 'image' ? _cruxUtils.getI18n("crm.imageupload.allowed.field.length" , this.data.cxPropMaxFilesCount) : "You can upload a maximum of" +  this.data.cxPropMaxFilesCount + "file(s) only." , ltPropType : "error" } } );
			return false;
		}else if(this.data.cxPropAllowedTotalSize){
			var curTotalSize = files.reduce(function(val , file){ return val + file.size }, 0) + this.crtTotalSizeInBytes;
			if(curTotalSize+100 > this.totalFilesSizeInBytes){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : type === 'image' ? _cruxUtils.getI18n("crm.ImageuploadField.size.limit" , this.data.allowedSizeInt) :  "The total file(s) size exceeds the allowed limit of" + this.data.allowedSizeInt + "MB." , ltPropType : "error" } } );
				return false;
			}
		}
		var obj = files.find(function(fi){ return fi.size === 0; });
		if(obj){
			_cruxUtils.showCustomMessage({ params : { ltPropMessage :  type === 'image' ? _cruxUtils.getI18n('crm.image.unsupported.corrupted.single') : "The file that you're trying to upload is corrupted." , ltPropType : "error" } } );
			return false;
		}
	},
	loadEventListener : function(){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var image = this.imageElem , _self = this;
		var bounding = image[0].getBoundingClientRect();
		image[0].parentElement.style.width = bounding.width+'px';
		image[0].parentElement.style.height = bounding.height+'px';
		image.cropper({
            aspectRatio: this.getData("cxPropAspectRatio"),
            selection: {
                top: 20,
                left: 20,
                size: 220
            },
			cropStart : function(){
				_self.setData("disableAttachBtn" ,false);
			},
            // minSize: 150,
            // maxSize: 450
			minSize: this.getData("cxPropMinSize"),
			maxSize: this.getData("cxPropMaxSize")
        });
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
        this._cropperData = image.data('cropper');
		image[0].removeEventListener('load',this.listener);
	},
	actions : {
		mouseEnterAction : function(){
			// debugger
		},
		saveUpload : function(){
			this.saveUpload();
		},
		attachImage : function(){
			// var image_url = this._cropperData.getCroppedImage().toDataURL();
			// Lyte.Component.set(this.data.imageData[0],'preview_url',image_url);
			// this.saveUpload();
			this._cropperData.getCroppedImage().toBlob(function(b){
				this.setData('imageData',[new File([b], "aaaa.jpg",{type : 'image/jpeg'})]);
				var image_url = this._cropperData.getCroppedImage().toDataURL();
				Lyte.Component.set(this.data.imageData[0],'preview_url',image_url);
				this.setData("disableAttachBtn" , true);
				this.saveUpload();
			}.bind(this));
		},
		closeModalAction : function(){
			this.closeModal();
		},
		attachAllImage : function(){
			var _self = this;
			if(this.getMethods('onConfirm')){ //no i18n
				var files = $L("crux-file-upload", this.modalChildComp)[0].component.getAllFiles();
				var ret = this.executeMethod('onConfirm', files); //no i18n
		    }
			if(ret && ret.then){
				this.setData('isSaveProgress' , true);
				Promise.resolve(ret).then(function(){
					_self.setData('isSaveProgress' , false);
					_self.closeModal();
				},function(){
					_self.setData('isSaveProgress' , false);
				});
			}else{
				this.closeModal();
			}
		}
	},
	saveUpload : function(){
		var _self = this;
		if(this.getMethods('onCxFileUploadSuccess')){ 
			var ret = this.executeMethod('onCxFileUploadSuccess',this.data.imageData);
		}
		if(ret && ret.then){
			Promise.resolve(ret).then(function(){
				_self.closeModal();
				_self.setData("disableAttachBtn" , false);
			},
			function(){
				_self.setData("disableAttachBtn" , false);
			});
		}else{
			this.setData("disableAttachBtn" , false);
			this.closeModal();
		}
	},
	closeModal : function(){
		this.setData('cxPropShow' , false);
		// this._modal.ltProp('show',false);
	},
	convertToBytes : function(){
		this.bytesConversion();
	 }.observes("cxPropAllowedTotalSize").on("didConnect"),
	 checkTotalFilessize : function(fileSize){
		var size = this.totalFilesSizeInBytes,
		totalSize  = this.crtTotalSizeInBytes;
		if(size && (totalSize+fileSize) > size){
			return true;
		}
		return false;
	 },
	 addToTotalFilesSize : function(fileSize){
		var size = this.totalFilesSizeInBytes;
		if(size){
			var total =  this.crtTotalSizeInBytes;
			this.crtTotalSizeInBytes = total+fileSize;
			this.setData("currentTotalFileSize" , this.fileSizeConvertAsPerUnit(this.crtTotalSizeInBytes));

		}
	 },
	 removeFromTotalFileSize : function(fileSize){
		var size = this.totalFilesSizeInBytes;
		if(size){
			var total =  this.crtTotalSizeInBytes;
			this.crtTotalSizeInBytes = total-fileSize;
			this.setData("currentTotalFileSize" , this.fileSizeConvertAsPerUnit(this.crtTotalSizeInBytes));
		}
	 },
	 validate : function(init){
		// if(this.data.cxPropMaxFilesCount && this.data.selectedFileCount >= this.data.cxPropMaxFilesCount){
		// 	this.setData("errorTooltipMsg" , _cruxUtils.getI18n("crm.imageupload.allowed.field.length" , this.data.cxPropMaxFilesCount) );
		// }else if(this.data.cxPropAllowedTotalSize && this.crtTotalSizeInBytes + 100 >= this.totalFilesSizeInBytes){
		// 	this.setData("errorTooltipMsg" ,_cruxUtils.getI18n("crm.ImageuploadField.size.limit" ,this.data.allowedSizeInt ));
		// }else{
		// 	this.setData("errorTooltipMsg" , "");
		// }
		// if(this.data.errorTooltipMsg){
		// 	this.setData("disableBrowseBtn" , true); //no i18n
		// }else{
		// 	this.setData("disableBrowseBtn" , false); //no i18n
		// }		
		if(!this.data.cxPropUploadProgress && !init){
			var list = this.data.fileList , len = list.length;
			var successLen = this.data.fileList.filter(function(li){ return li.status === "success"; }).length;
			if(successLen === len){
				this.setData('disableAttachBtn' , false); //no i18n
			}else{
				
				this.setData('disableAttachBtn' , true); //no i18n
			}
		}else{
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
			this.setData('disableAttachBtn' , true); //no i18n
		}
	 },
	 setProgressPercentage : function(val){
		var per;
		if(val.item === "selectedFileCount"){
			per = (100 * this.data.selectedFileCount) / this.data.cxPropMaxFilesCount;
			Lyte.objectUtils(this.data.progressProp , "add" , "countPercentage" , per);
		}else{
			per = (100 * this.crtTotalSizeInBytes) / this.totalFilesSizeInBytes;
			Lyte.objectUtils(this.data.progressProp , "add" , "sizePercentage" , per);
		}
	 }.observes("selectedFileCount" , "currentTotalFileSize")
},{mixins : ["crux-image-preview-util"]});

Lyte.Mixin.register("crux-image-preview-util", {
	showImagePreview : function(data , methods , event , from){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		if(!this.data.renderPreviewComp){
			this.setData("renderPreviewComp" , true);
		}
        var comp = $L("crux-image-preview" , from === "modal" ? this.modalChildComp : this.$node)[0];
		comp = comp.component;
		comp.setData(data ? data : {});
        // if(comp){
        //     comp = comp.component;
        //     comp.setData(data ? data : {});
        // }else{
        //     comp = Lyte.Component.render("crux-image-preview" , data , this.$node); //no i18n
		// 	comp = comp.component;
        // }
        comp.setMethods(methods);
        comp.showPreview(event , data.cxPropCurrentPreviewId);
    },
	constructDataAndShow : function(currentId , files , selector , editable , type , event , from){
		_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		var methods , data;
		if( type === "single"){
			data = {cxPropPreviewConfiguration : {showDownloadOption : false , selectors : selector} , cxPropEditable : false};
			methods = {};
		}else{
			methods = {};
			data = { cxPropAjax : this.data.cxPropAjax, cxPropEditable : editable , cxPropUniqueSelector : "id" , cxPropImages : files , cxPropNameSelector : "name" , 
			cxPropSourceKey : this.data.cxPropSourceKey , cxPropPreviewUrlKey : this.data.cxPropPreviewUrlKey , cxPropDownloadKey : this.data.cxPropDownloadKey , cxPropCurrentPreviewId : currentId};
			data.cxPropPreviewConfiguration = {
				showFileName : true,
				showDownloadOption : true,
				showThumbnails : true,
				allowZoom : true,
				selectors : selector,
				showCrop  : true,
				showInfoIcon : true,
				showDeleteIcon : editable,
				showDescription : true
			},
			methods.onNameChange = this.nameChange.bind(this);
			methods.onDescChange = this.descriptionChange.bind(this);
			methods.onDelete = this.onDeleteFromPreview.bind(this);
			methods.onCropSuccess = this.onCropSuccessFn.bind(this);
			methods.onClose	= this.closePreviewFn.bind(this);
			methods.onLoad = this.onPreviewLoad.bind(this);
			methods.onBeforePreview = this.onBeforePreviewImage.bind(this);
		}
		data.cxPropType = this.data.cxPropType;
		this.showImagePreview(data , methods , event , from);
	},
    // convertStreamToActualSize: function( size )
	// {
	//     var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
	//     selectedSize = 0;
	//     selectedUnit = "B"; // No I18N
	//     if (size > 0) {
	//         units = ['TB', 'GB', 'MB', 'KB', 'B']; // No I18N
	//         var unitsLength = units.length;
	//         for (i = _i = 0, _len = unitsLength; _i < _len; i = ++_i) {
	//             unit = units[i];
	//             cutoff = Math.pow(1024, 4 - i);
	//             if (size >= cutoff) {
	//                 selectedSize = size / Math.pow(1024, 4 - i);
	//                 selectedUnit = unit;
	//                 break;
	//             }
	//         }
	//         selectedSize = Math.round(10 * selectedSize) / 10;
	//     }
	//     return selectedSize + " " + selectedUnit;
	// },
    checkNameAvailability : function(name)
	{
		var usedNames = this.usedNames;
		if(usedNames.includes(name)) {
			return true;
		}else {
			return false;
		}
	},
    changeUsedName : function(name,extn)
	{
		var usedNames = this.usedNames;//no i18n 
		var num = 1 , retName;
		var newName = name;
		var index = newName.lastIndexOf(".");
		newName = name.substring(0,index);
		if(extn === undefined) {
			extn = name.substring(index, name.length);
		}
		var start,end;
		if(usedNames.includes(name)) {
			start = name.lastIndexOf("(");
			end = name.lastIndexOf(")");
			var stt = name.substring(start + 1,end);
			if(Number(stt) !== 0 && Number.isInteger(Number(stt))){
				num = parseInt(stt) + 1;
			}else{
				start = -1;
				end = -1;
			} 
		}else {
			retName =  newName + extn;
			return retName;//no i18n
		}
		if(start !== -1 && end !== -1) {
			newName = name.substring(0,start);
		}
		retName =  newName + "(" + num + ")" + extn;
		return retName;//no i18n
	},
    resetModifiedName : function(newName , oldName){
        var usedNames = this.usedNames;
        var index = usedNames.findIndex(function(name){ return name === oldName; });
        usedNames.splice(index, 1 , newName);
    },
	saveCroppedImage : function(croppedImage){
		var currentImageInfo = this.data.currentImageInfo
		Lyte.objectUtils(currentImageInfo ,"add","cropErrorType","loading");//no i18n
		var imageName = currentImageInfo.name + currentImageInfo.extn;
		var imageBlob = this.getCroppedBlob(croppedImage,currentImageInfo.extn.toLowerCase());//no i18n
		var actualSrc = URL.createObjectURL(imageBlob);
		var formData = new FormData();
		var ajaxProp = Lyte.deepCopyObject(this.data.cxPropAjax);
		formData.append('file', imageBlob,encodeURIComponent(imageName));//no i18n
		// LyteColorbox._domEle.style.display = "none";//NO I18n
		Lyte.objectUtils(this.data.currentImageConfig ,"add","imageLoaded",false);//no i18n
		var _self = this;
		ajaxProp.processData = false;
		ajaxProp.data = formData;
		ajaxProp.type = "POST";
		ajaxProp.enctype = 'multipart/form-data';
		ajaxProp.contentType= false;
		ajaxProp.success = function(res){
			if(res.uploadedImages === undefined){
				_self.setData('customMessages',_cruxUtils.getI18n('crm.image.crop.error'));// No I18N
				Lyte.objectUtils(_self.data.currentImageConfig ,"add","error",true);//no i18n
				LyteColorbox._domEle.style.display = "";//NO I18n
				Lyte.objectUtils(_self.data.currentImageConfig ,"add","imageLoaded",true);//no i18n
				_self.calculateInitialImageSize();
				return;
			}
			var curIndex = _self.data.cxPropImages.findIndex(function(img){ return currentImageInfo.id === img.id; });
			// Lyte.objectUtils(_self.data.cxPropImages[curIndex] , "add" , _self.data.cxPropSourceKey , actualSrc); // No I18N
			var replaceObj = {'lytecboxHref' : actualSrc , 'lytecboxDlink' : actualSrc , 'lytecboxTitle' : _self.data.cxPropImages[curIndex][_self.data.cxPropNameSelector]}; // No I18N
			LyteColorbox.replace(curIndex+1 , replaceObj);
			if(_self.getMethods("onCropSuccess")){
				_self.executeMethod("onCropSuccess", res , _self.data.cxPropImages[curIndex] , actualSrc);
			}
			_self.calculateInitialImageSize();
		}
		ajaxProp.error = function(){	
			_self.setData('customMessages',_cruxUtils.getI18n('crm.image.crop.error'));// No I18N
			Lyte.objectUtils(_self.data.currentImageConfig ,"add","error",true);//no i18n
			LyteColorbox._domEle.style.display = "";//NO I18n
			Lyte.objectUtils(_self.data.currentImageConfig ,"add","imageLoaded",false);//no i18n
			_self.calculateInitialImageSize();
		}
		return $L.ajax(ajaxProp);

	},
    getCroppedBlob : function(image,extn){
    	var height = image.height;
    	var width = image.width , type = extn.split('.')[1];
		var mimeType = "image/" + (type === 'jpg' ? 'jpeg' : type);
    	if(height < 4000 && width < 4000){
    		return this.dataURItoBlob(image.toDataURL(mimeType,0.85));//no i18n
    	}else if( height < 8000 && width < 8000){
    		return this.dataURItoBlob(image.toDataURL(mimeType,0.5));//no i18n
    	}else{
    		return this.dataURItoBlob(image.toDataURL(mimeType,0.2));//no i18n
    	}
    },
	dataURItoBlob : function(dataURI){
		var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0){
	    	byteString = atob(dataURI.split(',')[1]);
	    }
	    else{
	    	byteString = unescape(dataURI.split(',')[1]);
	    }
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++)
	    {
	        ia[i] = byteString.charCodeAt(i);
	    }
	    return new Blob([ia], {type:mimeString});
	},
	bytesConversion : function(){
		var size = this.data.cxPropAllowedTotalSize;
		if(size){
		   var fileUnit =  size.substring(size.length-2),
		   totalSize  = parseInt(size.substring(0,size.length-2)),
		   validFormat = ["KB","MB","GB"],
		   indexOf = validFormat.indexOf(fileUnit);
		   if(indexOf > -1){
			   this.totalFilesSizeInBytes = totalSize*(Math.pow(1000,indexOf+1));
			   this.setData("totalFileUnit" , validFormat[indexOf]);
		   }
		}
	},
	fileSizeConvertAsPerUnit : function(size){
		var validFormat = ["Bytes","KB","MB","GB"] , idx = 0;
		var sizeVal = this.data.cxPropSizeFormat === "binary" ? 1024 : 1000;
		idx = Math.max( idx, validFormat.indexOf( this.data.totalFileUnit ) );
		return ( parseInt( size / Math.pow( sizeVal , idx ) * Math.pow( 10, 2 ) ) / Math.pow( 10, 2 ) );
	 }
});
Lyte.Component.registerHelper("renderNameToolTip",function(fullname , isRTLEnabled){ //No I18N 
	if(fullname){
		var filename = fullname.substring(0,fullname.lastIndexOf('.'));
		var extn = fullname.substring(fullname.lastIndexOf('.'),fullname.length);
		if(isRTLEnabled){
			return extn.substring(1,extn.length)+'.'+filename;
		}else{
			return filename+extn;
		}
	}
	return fullname;
});


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

Lyte.Component.register("crux-file-upload-list", {
_template:"<template tag-name=\"crux-file-upload-list\"> <div class=\"cruxFileUploadSortableDiv\"> <template is=\"for\" items=\"{{cxPropPredefinedList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile cxFileUpdListFile {{cxPropListClass}} imagePreviewSelector {{item.cxListClass}}\" data-zcqa=\"fileUploadListRow_{{index}}\" tabindex=\"0\" role=\"listitem\" data-id=\"{{item.id}}\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-dlink=\"{{item[cxPropDownloadKey]}}\" data-lytecbox-href=\"{{item[cxPropPreviewUrlKey]}}\" onclick=\"{{action('imageClickHandling',event,item)}}\"> <template is=\"if\" value=\"{{item[cxPropSourceKey]}}\"><template case=\"true\"><img class=\"cxFileUploadImageThumb\" src=\"{{item[cxPropSourceKey]}}\"></template><template case=\"false\"><span class=\"cxFileUploadListFileTypeIconWrap cxFlexCenter\"> <span class=\"cxFileUploadListSprite cxFileUploadIcon_allfile cxFileUploadIcon_{{toLowerCase(item.fileType)}}\"></span> </span></template></template> <lyte-text class=\"cxFileUpdFileName\" lt-prop-value=\"{{item.name}}\"></lyte-text> <template is=\"if\" value=\"{{item[cxPropSizeSelector]}}\"><template case=\"true\"><span class=\"cxFileUpdLiNameSeparator\">-</span></template></template> <template is=\"if\" value=\"{{item[cxPropSizeSelector]}}\"><template case=\"true\"><span class=\"lyteFileUpdFileSize cxFileUpdLiFileSize\">( {{lyteUiFileSize(item[cxPropSizeSelector],cxPropFileUnit,cxPropDigits,cxPropSizeFormat)}} )</span></template></template> <template is=\"if\" value=\"{{item[cxPropDownloadKey]}}\"><template case=\"true\"><a target=\"_blank\" href=\"{{item[cxPropDownloadKey]}}\" data-zcqa=\"file_download_{{index}}\" class=\"cxFileUpdLiDownIconWrap cxFileUploadActionIconWrap cxDownload\" rel=\"noopener noreferrer\"> <span class=\"cxFileUpdLiDownIcon cxDownload\"></span> </a></template></template> <div class=\"cxFileUploadFileStatus cxFileUploadPredefinedFileStatus\"> <template is=\"if\" value=\"{{cxPropEditable}}\"><template case=\"true\"><span data-zcqa=\"openEditAndPreview_popup\" lt-prop-title=\"{{cruxGetI18n('crm.label.edit')}}\" class=\"editIconHandler cxFileUploadActionIconWrap cxFileUploadEditIconWrap {{if(cxPropUploadProgress,'cxDisableElement','')}}\"> <span class=\"editIconHandler cxFileUploadEditIcon\"></span> </span></template></template> <span data-value=\"{{item.id}}\" role=\"button\" data-zcqa=\"removeThisUploadedFile\" lt-prop-title=\"{{cruxGetI18n('crm.label.delete')}}\" class=\"deleteBtn cxFileUploadActionIconWrap cxFileUploadRemoveIconWrap\"> <span class=\"cxFileUploadRemoveIcon deleteBtn\"></span> </span> </div> </div> </template> <template is=\"for\" items=\"{{fileList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile cxFileUpdListFile imagePreviewSelector {{if(ifEquals(item.status,'error'),'cxFileStatusError','')}} {{concat('lyteFile',lyteUiCapitalizeName(item.status))}} {{cxPropListClass}} {{item.cxListClass}}\" data-zcqa=\"fileUploadListRow_{{getSum(index,cxPropPredefinedList.length)}}\" data-id=\"{{item.id}}\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-dlink=\"{{item[cxPropDownloadKey]}}\" data-lytecbox-href=\"{{item[cxPropPreviewUrlKey]}}\" onclick=\"{{action('imageClickHandling',event,item)}}\"> <template is=\"if\" value=\"{{item.src}}\"><template case=\"true\"><img class=\"cxFileUploadImageThumb\" src=\"{{item.src}}\"></template><template case=\"false\"><span class=\"cxFileUploadListFileTypeIconWrap cxFlexCenter\"> <span class=\"cxFileUploadListSprite cxFileUploadIcon_allfile cxFileUploadIcon_{{toLowerCase(item.fileType)}}\"></span> </span></template></template> <div lt-prop-title=\"{{item.name}}\" class=\"cxFlexCenter cxOH cxFileUpdFileNameWrap\"> <lyte-text class=\"cxFileUpdFileName\" lt-prop-show=\"false\" lt-prop-value=\"{{item.name}}\"></lyte-text> </div> <template is=\"if\" value=\"{{item[cxPropSizeSelector]}}\"><template case=\"true\"><span class=\"cxFileUpdLiNameSeparator\">-</span></template></template> <template is=\"if\" value=\"{{item[cxPropSizeSelector]}}\"><template case=\"true\"><span class=\"lyteFileUpdFileSize cxFileUpdLiFileSize\">( {{lyteUiFileSize(item[cxPropSizeSelector],cxPropFileUnit,cxPropDigits,cxPropSizeFormat)}} )</span></template></template> <template is=\"if\" value=\"{{cruxAnd(item[cxPropDownloadKey],ifEquals(item.status,'success'))}}\"><template case=\"true\"><a href=\"{{item[cxPropDownloadKey]}}\" data-zcqa=\"file_download_{{index}}\" class=\"cxFileUpdLiDownIconWrap cxFileUploadActionIconWrap cxDownload\" rel=\"noopener noreferrer\"> <span class=\"cxFileUpdLiDownIcon cxDownload\"></span> </a></template></template> <div class=\"cxFileUploadFileStatus\"> <template is=\"if\" value=\"{{cruxAnd(cxPropCustomMessage,item.cxMessage)}}\"><template case=\"true\"><div class=\"cxFileUploadListCustMessage cxFileUploadList_{{item.cxMessageType}}\"> <lyte-text lt-prop-value=\"{{item.cxMessage}}\"></lyte-text> </div></template></template> <template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropCustomMessage,'!')}}\"><template case=\"true\"> <span class=\"lyteFileUpdFailMsg cxFileUploadFailMsg\"> <lyte-text lt-prop-value=\"{{cxPropFailureMessage}}\"></lyte-text> </span> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropUploadMultiple,'!'),'&amp;&amp;',cxPropManualRetry)}}\"><template case=\"true\"> <span class=\"retryBtn cxFileUploadActionIconWrap cxFileUploadRetryIconWrap\"> <span class=\"cxFileUploadRetryIcon lyteFileUpdRetryMsg\"></span> </span> </template></template> </template></template> <template is=\"if\" value=\"{{cruxOr(ifEquals(item.status,'uploading'),ifEquals(item.cxStatus,'uploading'),cruxAnd(cxPropAutoUpload,negate(item.status)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAnd(negate(cxPropCustomMessage),ifEquals(item.percentage,100))}}\"><template case=\"true\"><lyte-text class=\"cxFileScanningTxt\" lt-prop-value=\"{{cruxGetI18n('crm.image.scanningforvirus')}}\"></lyte-text></template></template> <template is=\"if\" value=\"{{ifNotEquals(item.percentage,100)}}\"><template case=\"true\"><div><lyte-progressbar lt-prop=\"{&quot;type&quot;:&quot;circle&quot;,&quot;stroke&quot;:&quot;3&quot;,&quot;radius&quot;:&quot;8&quot; , &quot;showPercentage&quot; : false ,&quot;progressProperty&quot; : {&quot;value&quot;: &quot;{{if(item.percentage,item.percentage,0)}}&quot;}}\" lt-prop-stroke=\"5\" lt-prop-progress-fill-color=\"{{cxPropProgressStatusColours.list}}\"> </lyte-progressbar></div></template><template case=\"false\"><span class=\"cxFileUpdLiCircleLoader cxCircleLoader\"> <span class=\"cxCircleLoader1\"></span> <span class=\"cxCircleLoader2\"></span> </span></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{if(expHandlers(expHandlers(cxPropEditable,'&amp;&amp;',expHandlers(cxPropUploadProgress,'!')),'&amp;&amp;',expHandlers(item.status,'===','success')),true,false)}}\"><template case=\"true\"><span data-zcqa=\"openEditAndPreview_popup\" lt-prop-title=\"{{cruxGetI18n('crm.label.edit')}}\" class=\"editIconHandler cxFileUploadActionIconWrap cxFileUploadEditIconWrap\"> <span class=\"editIconHandler cxFileUploadEditIcon\"></span> </span></template></template> <span data-value=\"{{item.id}}\" data-zcqa=\"removeThisUploadedFile\" lt-prop-title=\"{{cruxGetI18n('crm.label.delete')}}\" class=\"deleteBtn cxFileUploadActionIconWrap cxFileUploadRemoveIconWrap\"> <span class=\"cxFileUploadRemoveIcon deleteBtn\"></span> </span> <template is=\"if\" value=\"{{ifEquals(item.status,'error')}}\"><template case=\"true\"><div class=\"cxFileUploadWarningIcon\"></div></template><template case=\"false\"><div class=\"cxFileUploadSuccessIcon cxFileIconForSuccess_{{index}}\">{{hideSuccessElement(index)}}</div></template></template> </template></template> </div> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,11,1]},{"type":"if","position":[1,11,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,11,3]}]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,11,1]},{"type":"if","position":[1,11,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,11,3]},{"type":"if","position":[1,11,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,5]},{"type":"if","position":[1,11,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,0]},{"type":"componentDynamic","position":[0,0]}]},"false":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}]}],
_observedAttributes :["cxPropPredefinedList","fileList","cxPropListClass","cxPropDownloadKey","cxPropSourceKey","cxPropPreviewUrlKey","cxPropUploadMultiple","cxPropFileUnit","cxPropDigits","cxPropId","cxPropSortable","cxPropEditable","cxPropSizeSelector","cxPropFailureMessage","cxPropShowFailureMessage","cxPropManualRetry","cxPropCustomMessage","cxPropUploadProgress","cxPropProgressStatusColours","cxPropSizeFormat","cxPropAutoUpload"],
_observedAttributesType :["array","array","string","string","string","string","boolean","string","number","string","boolean","boolean","string","string","boolean","boolean","boolean","boolean","object","string","boolean"],

	data : function(){
		return {
			cxPropPredefinedList	: Lyte.attr("array",{ "default" :[]}),//no i18n
			fileList				: Lyte.attr('array' , {default : []}), //no i18n
			cxPropListClass			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropDownloadKey		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropSourceKey			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropPreviewUrlKey		: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropUploadMultiple	: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropFileUnit			: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropDigits			: Lyte.attr( 'number', { "default" : 1 } ),//no i18n
			cxPropId				: Lyte.attr( 'string', { "default" : '' } ),//no i18n
			cxPropSortable			: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropEditable			: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropSizeSelector		: Lyte.attr( 'string', { "default" : 'size' } ),//no i18n
			cxPropFailureMessage	: Lyte.attr( 'string', { "default" : _cruxUtils.getI18n("crm.fileupload.attach.fail") } ), //no i18n
			cxPropShowFailureMessage: Lyte.attr( 'boolean', { "default" : true } ),//no i18n
			cxPropManualRetry		: Lyte.attr( 'boolean', { "default" : true } ),//no i18n
			cxPropCustomMessage		: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropUploadProgress	: Lyte.attr( 'boolean', { "default" : false } ),//no i18n
			cxPropProgressStatusColours : Lyte.attr('object' , {'default' : {list : "#338CF0"}}), //no i18n
			cxPropSizeFormat : Lyte.attr( 'string'),//no i18n
			cxPropAutoUpload		: Lyte.attr( 'boolean', { "default" : true } ) //no i18n
		}		
	},
	didConnect : function(){
		if(this.data.cxPropSortable){
			this.$node.closest("crux-file-upload").component.bindSorting();
		}
	},
	actions : {
		// Functions for event handling
		// removeFileFromSelected : function(file){
		// 	this.$node._callee.component.lyteFileUpload.removeUpload(file.id);
		// },
		// retryAction : function(file){
		// 	this.$node._callee.component.lyteFileUpload.lyteFileUpload.upload(file.id);
		// },
		// editImage : function(file){
		// 	this.executeMethod('onEditImage' , file );
		// },
		imageClickHandling : function(event , file){
			event.stopPropagation();
			var classList = event.target.classList;
			if(classList.contains('editIconHandler')){ //no i18n
				this.executeMethod('onEditImage' , event , file ); //no i18n
			}else if(classList.contains('deleteBtn')){ //no i18n
				this.$node._callee.component.lyteFileUpload.removeUpload(file.id);
			}else if(classList.contains('cxFileUploadRetryIconWrap') || classList.contains('cxFileUploadRetryIcon')){ //no i18n
				Lyte.objectUtils(file , "delete" , "status"); //no i18n
				if(this.getMethods('onBeforeManualRetry')){
					var retry = this.executeMethod('onBeforeManualRetry' , file);
				}
				if(retry !== false){
					delete file.cxErrorList;
					this.$node._callee.component.lyteFileUpload.upload(file.id);
				}
			}

		}
	}
},{mixins : ["crux-image-preview-util"]});

Lyte.Component.registerHelper('hideSuccessElement' , function(ind){
	var sClass = ".cxFileIconForSuccess_" + ind;
	setTimeout(function(){
		if($L(sClass)[0]){
			$L(sClass)[0].style.display = "none";
		}
	},4000);
});
//# sourceMappingURL=crux-image.js.map