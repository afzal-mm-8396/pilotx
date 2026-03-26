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

//# sourceMappingURL=crux-image-upload.js.map