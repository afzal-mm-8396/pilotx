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
