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

