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
