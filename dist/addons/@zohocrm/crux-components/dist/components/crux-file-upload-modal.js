Lyte.Component.register("crux-file-upload-modal", {
_template:"<template tag-name=\"crux-file-upload-modal\"> <lyte-modal lt-prop-show=\"{{lbind(cxPropShow)}}\" on-show=\"{{method(&quot;showModal&quot;)}}\" lt-prop-show-close-button=\"true\" on-before-show=\"{{method(&quot;onBeforeShowModal&quot;)}}\" on-before-close=\"{{method(&quot;bCloseloseModal&quot;)}}\" on-close=\"{{method('closeModal')}}\" lt-prop-wrapper-class=\"cxFileUploadModal\" lt-prop-width=\"600px\" lt-prop-height=\"500px\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <template is=\"if\" value=\"{{if(ifEquals(currentSelect.system_value,'selected_view'),true,false)}}\"><template case=\"true\"><div>Selected Files</div></template><template case=\"false\"><div> <span class=\"cxFileUploadSprite cxFileUploadIcon_myMachine {{currentSelect.cx_icon_class}}\"></span> </div></template></template> </lyte-modal-header> <lyte-modal-content class=\"cxFlex cxFileUploadModalContent\"> <div class=\"cxFileUploadModalLeftPanel\"> <ul class=\"cxFileUploadAvailableOptionsUl\"> <template id=\"\" items=\"{{dataList}}\" item=\"item\" index=\"index\" is=\"for\"> <li class=\"cxFileUploadAvailableOption {{if(ifEquals(currentSelect.system_value,item.system_value),'selectedDrive','')}}\" onclick=\"{{action('driveChange',index)}}\"> <template is=\"if\" value=\"{{if(item.cx_icon_url,true,false)}}\"><template case=\"true\"><img class=\"cxFileUploadDriveLogos\" src=\"{{if(item.cx_icon_url,item.cx_icon_url)}}\"></template><template case=\"false\"><span class=\"cxFileUploadDriveLogos {{item.cx_icon_class}}\"></span></template></template> <div>{{item.display_value}}</div> <template is=\"if\" value=\"{{selectedFiles[index].files.length}}\"><template case=\"true\"><div class=\"cxFileUploadSprite cxFileUploadIcon_myMachine\"> {{selectedFiles[index].files.length}} </div></template></template> </li> </template> </ul> </div> <div class=\"cxFileUploadRightPanel {{if(ifEquals(currentSelect.system_value,'selected_view'),'cxFileUploadModalSelectedView','')}}\"> <template is=\"if\" value=\"{{if(ifEquals(currentSelect.system_value,'selected_view'),true,false)}}\"><template case=\"true\"><lyte-accordion lt-prop-exclusive=\"false\" lt-prop-dynamic=\"true\" class=\"cxFileUploadModalSelListAccordion\"> <template is=\"registerYield\" yield-name=\"yield\"> <template items=\"{{selectedFiles}}\" item=\"item\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{if(item.files.length,true,false)}}\"><template case=\"true\"> <lyte-accordion-item class=\"{{item.toggleClass}}\"> <lyte-accordion-header> {{item.d_value}} <lyte-icon class=\"lyteAccordionArrow\"></lyte-icon> </lyte-accordion-header> <lyte-accordion-body> <ul class=\"cxFileUploadSelectedList\"> <template id=\"\" class=\"\" items=\"{{item.files}}\" item=\"value\" index=\"index\" is=\"for\"> <li class=\"cxFileUploadSelectedListElem\"> <span class=\"cxFileUploadModalAttachmentTypeIcon cxFileUploadModal_{{value.fileType}}\"></span> <div class=\"cxFileUploadModalAttachmentName\">{{value.name}}</div> <div class=\"cxFileUploadModalSelListRemove\" onclick=\"{{action('removeFileFromSelected',item,index)}}\"> <span class=\"cxFileUploadModalSelListRemoveIcon\"></span> </div> </li> </template> </ul> </lyte-accordion-body> </lyte-accordion-item> </template></template> </template> </template> </lyte-accordion></template></template> <div class=\"cxFileUploadRightPanelContent\"> <template id=\"\" class=\"\" items=\"{{dataList}}\" item=\"item\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{if(ifEquals(item.system_value,'My_Device'),true,false)}}\"><template case=\"true\"><div class=\"{{if(ifEquals(currentSelect.system_value,item.system_value),'dB','dN')}} fileContent_{{item.system_value}}\"> <lyte-fileupload class=\"cxFileUploadModalDeviceUpload\" lt-prop-upload-multiple=\"true\" lt-prop-upload-multiple-count=\"3\" lt-prop-ajax=\"{&quot;url&quot;:&quot;/Fileupload&quot;}\" on-success=\"{{method(&quot;afterFileSelect&quot;)}}\" on-remove=\"{{method('onRemoveDeviceFile')}}\"></lyte-fileupload> </div></template></template> <template is=\"if\" value=\"{{if(ifEquals(item.system_value,'My_Device'),false,true)}}\"><template case=\"true\"><div class=\"cxFileUploadModalCloudOptions {{if(ifEquals(currentSelect.system_value,item.system_value),'dB','dN')}} fileContent_{{item.system_value}} {{item.class}}\"> <template is=\"if\" value=\"{{if(ifEquals(item.state,'success'),true,false)}}\"><template case=\"true\"><div class=\"\"> {{unescape(item.data)}} </div></template><template case=\"false\"><template is=\"if\" value=\"{{if(ifEquals(item.state,'loading'),true,false)}}\"><template case=\"true\"><div class=\"cxFileUploadModalLoaderCont\"> <div class=\"cxFileUploadModalLoaderIcon\"></div> </div></template><template case=\"false\"><template is=\"if\" value=\"{{if(ifEquals(item.state,'failure'),true,false)}}\"><template case=\"true\"><div class=\"\"> <div class=\"\">Something went wrong.</div> <span onclick=\"{{action('retryFn',item)}}\">Retry</span> </div></template><template case=\"false\"><div class=\"\"> </div></template></template></template></template></template></template> </div></template></template> </template> <template is=\"if\" value=\"{{if(ifEquals(currentSelect.system_value,&quot;My_Device&quot;),if(showSelectBtn,true),false)}}\"><template case=\"true\"><div class=\"cxFileUploadPickBtnWrap\"> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('updateFilesFromMyDevice')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Pick </template> </lyte-button> </div></template></template> </div> <div class=\"cxFileUploadButtons\"> <template is=\"if\" value=\"{{if(selected_count,true,false)}}\"><template case=\"true\"><div class=\"cxFileUploadFooterFilesAttachedCase\"> <template is=\"if\" value=\"{{if(ifEquals(currentSelect.system_value,&quot;selected_view&quot;),true,false)}}\"><template case=\"true\"><div class=\"cxFileUploadDeselectAllLink\" onclick=\"{{action('deSelectAllFiles')}}\">Deselect All</div></template><template case=\"false\"><div class=\"\">Selected Files : <span>{{selected_count}}</span></div></template></template> <div> <template is=\"if\" value=\"{{if(ifEquals(currentSelect.system_value,&quot;selected_view&quot;),true,false)}}\"><template case=\"true\"> <lyte-button onclick=\"{{action('cancelAction')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Cancel </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-disabled=\"{{disableUploadBtn}}\" onclick=\"{{action('uploadAction')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Upload </template> </lyte-button> </template><template id=\"\" case=\"false\"> <lyte-button lt-prop-appearance=\"primary\" lt-prop-disabled=\"{{disableUploadBtn}}\" onclick=\"{{action('gotoSelectedPage')}}\"> <template is=\"registerYield\" yield-name=\"text\"> View/Edit Selected </template> </lyte-button> </template></template> </div> </div></template></template> </div> </div> </lyte-modal-content> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"for","position":[3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3,3,1]},{"type":"for","position":[3,3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,3]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3,3,3,3]},{"type":"if","position":[3,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,3,5,1]},{"type":"if","position":[3,3,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropOptions","cxPropFileLimit","dataList","currentSelect","selectedFiles","cxPropShow","selected_count","cxPropFileUniqueSelector","showSelectBtn","disableUploadBtn"],
_observedAttributesType :["array","number","array","object","array","boolean","number","string","boolean","boolean"],

	data : function(){
		return {
			cxPropOptions 				: Lyte.attr("array",{"default" : []}), //NO I18n
			cxPropFileLimit				: Lyte.attr("number"), //NO I18n
			dataList							: Lyte.attr("array",{"default" : []}), //NO I18n
			currentSelect					: Lyte.attr("object",{"default" : {}}), //NO I18n
			selectedFiles					: Lyte.attr("array",{"default" : []}), //NO I18n
			cxPropShow						: Lyte.attr("boolean",{"default" : false}), //NO I18n
			selected_count				: Lyte.attr("number" , {"default" : 0}), //NO I18n
			cxPropFileUniqueSelector : Lyte.attr("string" , {"default" : 'id'}), //NO I18n
			showSelectBtn					: Lyte.attr("boolean",{"default" : false}), //NO I18n
			disableUploadBtn 			:	Lyte.attr("boolean",{"default" : false}) //NO I18n
		}
	},
	init : function(){
		this.my_device_obj = {
			system_value : "My_Device",
			display_value : "My Device",
			is_logo_img: true,
			cx_icon_url: "components/images/file_attachment.png"  //NO I18n
		};
		this.selectedFileObj = {system_value : "selected_view"};  //NO I18n
		// this.setUploadOptions();
		this.resetData();
		this.$node.setSelectedFiles = function(obj){
			var from = Object.keys(obj)[0]
			if(obj[from].length){
				var selector = this.component.data.cxPropFileUniqueSelector;
				this.setSelectedFilesFromUser(obj[from] , from , selector );
			}
		};
		this.$node.resetContent = function(obj){
			var s_value = Object.keys(obj)[0]
			if(obj[s_value]){
				var drive = this.component.data.cxPropOptions.find(function(x){return x.system_value === s_value});
				Lyte.objectUtils(drive , 'add' , 'data' , obj[s_value]);  //NO I18n
			}
		};
		this.$node.getSelectedFiles = function(){
			var selectedFiles = this.component.data.selectedFiles , len = selectedFiles.length , finalObj = {};
			for (var i = 0; i < len; i++) {
				if(selectedFiles[i].files.length){
					finalObj[selectedFiles[i].s_value] = selectedFiles[i].files;
				}
			}
			return finalObj;
		};
		this.$node.showModal = function(){
			this.component.setData('cxPropShow' , false);  //NO I18n
		}
	},
	resetData : function(){
		var options = this.data.cxPropOptions , list = [this.my_device_obj];
		if(options.length){
			list = list.concat(options)
			// list.push(...options);
		}
		var mapFiles = list.map(function(item){ return {'d_value' : item.display_value , 's_value' : item.system_value , files : []} });  //NO I18n
		// var mapFiles = list.map(x => {'d_value' : x.display_value , 's_value' : x.system_value , files : []});
		this.setData('selectedFiles',mapFiles);  //NO I18n
		this.setData('dataList' , list); //NO I18n
	},
	didConnect : function(){
		this.curTotFilesSize = 0;
	},
	actions : {
		updateFilesFromMyDevice : function(){
			this.setSelectedFilesFromUser(this.My_Device_files, 'My_Device' , 'id');  //NO I18n
		},
		clearSelectedFiles : function(){
			this.setData({'currentSelect' : this.my_device_obj , 'selectedFiles' : []}); //NO I18n
		},
		driveChange : function(index){
			var list = this.data.dataList , prevSelect = $L.extend(true , {} ,this.data.currentSelect) , currentDrive = list[index] , prevIndex = this.selDriveIndex;
			this.selDriveIndex = index;
			this.setData("currentSelect" , currentDrive);  //NO I18n
			if(currentDrive.system_value === prevSelect.system_value || currentDrive.system_value === "My_Device"){  //NO I18n
				return;
			}
			this.getDataFromUser(currentDrive);
		},
		retryFn : function(currentDrive){
			this.getDataFromUser(currentDrive);
		},
		gotoSelectedPage : function(){
			this.setData({"currentSelect" : this.selectedFileObj}); //NO I18n
		},
		removeFileFromSelected : function(selectedGrp , index){
			var file = Lyte.arrayUtils(selectedGrp.files ,'removeAt' , index , 1 ); //NO I18n
			this.setData('selected_count' , this.data.selected_count - 1); //NO I18n
			if(!this.data.selected_count){
				this.setData('currentSelect' , this.my_device_obj);  //NO I18n
			}
			if(this.getMethods('onRemoveFileFromModal')){  //NO I18n
				this.executeMethod('onRemoveFileFromModal' , file , selectedGrp.s_value);  //NO I18n
			}
		},
		uploadAction : function(){
			var selectedFiles = this.data.selectedFiles , len = selectedFiles.length , finalObj = {} , _self = this;
			for (var i = 0; i < len; i++) {
				if(selectedFiles[i].files.length){
					finalObj[selectedFiles[i].s_value] = selectedFiles[i].files;
				}
			}
			this.executeMethod('onUpload' ,finalObj, this.$node ).then(function(res){  //NO I18n
				if(res.status === "success"){
					_self.setData("cxPropShow" , false);  //NO I18n
				}
			})
		},
		cancelAction : function(){
			this.setData('cxPropShow' , false); //NO I18n
		},
		deSelectAllFiles : function(){
			var selectedFiles = this.data.selectedFiles , len = selectedFiles.length;
			for(var i = 0 ; i < len ; i++){
				Lyte.objectUtils(selectedFiles[i] ,'add' , 'files' , []);  //NO I18n
			}
			this.setData({ 'selected_count' : 0 , 'currentSelect' : this.my_device_obj});  //NO I18n
		}
	},
	methods : {
		afterFileSelect : function(files){
			this.My_Device_files = this.My_Device_files.concat(files);
			this.setData('showSelectBtn' , true); //NO I18n
		},
		onBeforeShowModal : function(){
			if(this.getMethods('beforeShowModal')){
				var bool = this.executeMethod('beforeShowModal' , this.$node ); //NO I18n
				if(bool === false){
					return false;
				}
			}
			this.selDriveIndex = 0;
			this.My_Device_files = [];
			this.setData('currentSelect' , this.my_device_obj);  //NO I18n
		},
		onRemoveDeviceFile : function(arrName , file){
			// var index = this.My_Device_files.findIndex(x => x.id === file.id);
			var index = this.My_Device_files.findIndex(function(x){ return x.id === file.id});
			this.My_Device_files.splice(index , 1);
			if(!this.My_Device_files.length){
				this.setData('showSelectBtn' , false); //NO I18n
			}
		},
		closeModal : function(){
			if(this.getMethods("onModalClose")){//NO I18n
				this.executeMethod('onModalClose' , this.$node ); //NO I18n
			}
			this.resetData();
			var fUComp = $L(".cxFileUploadModalDeviceUpload")[0]
			if(fUComp){
				fUComp.removeUpload();
			}
			this.setData('selected_count' , 0);  //NO I18n
			this.setData('showSelectBtn' , false);  //NO I18n
		},
		showModal : function(){
			if(this.getMethods("onModalShow")){//NO I18n
				this.executeMethod('onModalShow' , this.$node ); //NO I18n
			}
		},
		bCloseloseModal : function(){
			if(this.getMethods('beforeCloseModal')){
				var bool = this.executeMethod('beforeCloseModal' , this.$node ); //NO I18n
				if(bool === false){
					return false;
				}
			}
		}
		// Functions which can be used as callback in the component.
	},
	getDataFromUser : function(currentDrive){
		if(this.getMethods("fetchContent") && !currentDrive.data){
			Lyte.objectUtils(currentDrive , 'add' , 'state' , 'loading');
			this.executeMethod("fetchContent" , this.data.cxPropOptions.find(function(x){return x.system_value === currentDrive.system_value}) ).then(function(res){
				if(res.cxContent){
					Lyte.objectUtils(currentDrive , 'add' , 'data' , res.cxContent); //NO I18n
					Lyte.objectUtils(currentDrive , 'add' , 'state' , 'success'); //NO I18n
				}else{
					Lyte.objectUtils(currentDrive , 'add' , 'state' , 'failure'); //NO I18n
				}
			})
		}
	},
	setSelectedFilesFromUser : function(files , from , selector){
		if(!files.length){
			_cruxUtils.showCustomMessage({ params : { ltPropMessage : 'Please select atleast a single file.' , ltPropType : "info"} } );
			return;
		}
		var selected = this.data.selectedFiles , count = this.data.selected_count , s_len = selected.length;
		var limit = this.data.cxPropFileLimit , len = files.length;
		var currentSelect = selected.find(function(x){return x.s_value === from}) , cFiles = currentSelect.files , finalArr = [];
		if(limit && len > limit){
				_cruxUtils.showCustomMessage({ params : { ltPropMessage : 'The maximum file limit is reached. So, Please unselect some files to update' , ltPropType : "info"} } );
				return;
		}
		if(selector){
			for (var i = 0; i < len; i++) {
				var bool = cFiles.some(function(x){return x[selector] === files[i][selector]}); //eslint-disable-line no-loop-func
				if(!bool){
					finalArr.push(files[i]);
				}
			}
		}else{
			finalArr.concat(files);
		}
		Lyte.arrayUtils(currentSelect.files , 'push' , finalArr); //NO I18n
		for(var i = 0; i < s_len; i++){
			if(selected[i].files.length){
				if(currentSelect.s_value === selected[i].s_value){
					Lyte.objectUtils(selected[i] , 'add' , 'toggleClass' , 'lyteAccordionActive'); //NO I18n
				}else{
					Lyte.objectUtils(selected[i] , 'add' , 'toggleClass' , ''); //NO I18n
				}
			}
		}
		this.setData('selected_count' , count + finalArr.length);
		this.setData('currentSelect', this.selectedFileObj);//NO I18n

	}
});
