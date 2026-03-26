// $Id$
/**
 * @namespace
*/
var networkUtils = {
    filesArray : [],
    canvasStaticFiles : [
        //js files
        "crm-canvas-mobile-utils.js", //no i18n	
        "crm-canvasview.js", //no i18n
        "crm-canvas-editor-component.js", //no i18n
        "crm-canvas-image.js", //no i18n
        "crm-canvas-data-hub-integration.js", //no i18n
        "crm-canvas-datahub-templates.js", //no i18n
        "canvas-wms-popup.js", //no i18n
        "crm-canvas-designer.js", //no i18n
        "crm-detailview-canvas-gallery.js", //no i18n
        "crm-manage-canvasrules.js", //no i18n
        "crm-canvas-listview.js", //no i18n
        "crm-canvas-common-utils.js", //no i18n
        "crm-canvasview-calendarbooking.js", //no i18n
        "crm-canvasform.js", //no i18n
        "crm-canvas-common.js", //no i18n
        "crm-canvas-create-router-util.js", //no i18n
        "crm-formview-mixin.js", //no i18n
        "crm-canvas-view.js", //no i18n
        "crm-canvas-core-builder.js", //no i18n
        "crm-canvas-builder.js", //no i18n
        "crm-canvas-export.js", //no i18n
        "crm-canvas-revisions.js", //no i18n
        "crm-canvas-rename-popup.js", //no i18n
        "crm-canvas-import-button.js", //no i18n
        "canvasSubTab.js", //no i18n
        "crm-mobile-attachments.js", //no i18n
        "crm-mobile-email.js", //no i18n
        "crm-mobile-note.js", //no i18n
        "crm-mobile-widget.js", //no i18n
        "crm-mobile-checklist.js", //no i18n
        "crm-mobile-blueprint.js", //no i18n
        "crm-mobile-component.js", //no i18n
        "crm-mobile-stage.js", //no i18n
        "crm-mobile-picklist-history.js", //no i18n
        "crm-listview-canvas.js", //no i18n
        "crm-listview-canvas-gallery.js", //no i18n
        "crm-list-view-canvas-begin.js", //no i18n
        //"zohocrm_detailview_canvas.js", //no i18n
        //css files
        "crm-detailview-oldeditor-rtl.css", //no i18n
        "crm-detailview-canvas-rtl.css", //no i18n
        "crm-canvasview.css", //no i18n
        "canvas-wms-popup.css", //no i18n
        "crm-canvas-common-view.css", //no i18n
        "crm-canvas-designer.css", //no i18n
        "crm-canvas-form.css", //no i18n
        "crm-canvas-common.css", //no i18n
        "crm-detailview-canvas-gallery.css", //no i18n
        "crm-list-printview-canvas.css", //no i18n
        "crm-canvas-export.css", //no i18n
        "crm-mobile-components.css", //no i18n
        "crm-listview-canvas-gallery.css", //no i18n
        "crm-canvas-builder.css", //no i18n
        "crm-canvas-builder-rtl.css", //no i18n
        "crm-canvas-rename-popup.css", //no i18n
        "crm-manage-canvasrules.css", //no i18n
        "canvas-detailview-less.css", //no i18n
        //less files
        "canvas-formview-editor.css", //no i18n
        "crm-formview-canvas-gallery.css", //no i18n
        "crm-canvas-revisions.css", //no i18n
        "crm-listview-canvas.css", //no i18n
        "crm-list-view-canvas-begin.css", //no i18n
        "zohocrm_detailview_canvas.css", //no i18n
        //common js files
        "crm-canvas-profile-image.js", //no i18n
        "crm-detailcanvas-utils.js", //no i18n
        "crm-canvas-core.js", //no i18n
        "crm-canvas-router-utils.js", //no i18n
        //common css files
        "crm-canvas-criteria.css", //no i18n
        "zcanvas-rtl.css", //no i18n
        "crm-canvas-main.css", //no i18n
        "zohocrm_calendar_booking_canvas.css", //no i18n
        //image files
        "canvasimages/profile_image_canvas.svg", //no i18n
        "canvasimages/image_profile_canvas_new.svg", //no i18n
        "canvasimages/image_error.svg", //no i18n
        "canvasimages/zcanvas-icons/zcanvasicons.woff", //no i18n
        "canvasimages/canvas/customized0.png", //no i18n
        "canvasimages/canvas/card0.png", //no i18n
        "canvasimages/canvas/table0.png", //no i18n
        "canvasimages/canvas/customized.jpg", //no i18n
        "canvasimages/canvas/card.jpg",  //no i18n
        "canvasimages/canvas/table.jpg", //no i18n
        "canvasimages/canvas_rules.svg", //no i18n
        "canvasimages/default-preview.svg", //no i18n
        "canvasimages/canvas/aiImageToCanvas/Scanner_Dark.gif", //no i18n
        "canvasimages/canvas_getstart_lightmode.svg" //no i18n
    ]
};

/**
 * This method is used to construct a URL with params (without encoding).
 * @param {String} action - This provides the URL or action to which the query params has to be appended.
 * @param {Object} params - This provides the key/Value pair that has to be added to the Url.
 * @returns {String} - It returns the whole constructed URL with the passed-in key/value pairs appended to them.
 * @example
 * networkUtils.constructUrl("ShowEntityInfo.do",{cvid:3555310000000087529,recordNum:1,FROM_INDEX:1,TO_INDEX:10})
 * => "ShowEntityInfo.do?cvid=3555310000000087529&recordNum=1&FROM_INDEX=1&TO_INDEX=10"
  */
networkUtils.constructUrl = function(action,params){
var url = action;
var i = 0;
for(var key in params){
    if(i == 0){
        url += "?" + key + "=" + params[key];
    }
    else{
        url += "&" + key + "=" + params[key]; 
    }
    i++;
}
return url;
}

/**
 * This method is used to construct a Encoded URL params.  
 * @param {String} action - This provides the URL or action to which the query params has to be appended.
 * @param {Object} params - This provides the key/Value pair that has to be added to the Url as encoded.
 * @param {Boolean} removeExtraParams - This is set to be true if there is a need to remove the extraParams like calleeObj and clickId
 * @returns {String} - It returns the whole constructed URL with the passed-in key/value pairs appended to them.
 * @example
 * networkUtils.constructEncodedUrl("ShowEntityInfo.do",{cvid:" 3555310000000087528 ",recordNum:1,FROM_INDEX:1,TO_INDEX:10})
 * => "ShowEntityInfo.do?cvid=%203555310000000087528%20&recordNum=1&FROM_INDEX=1&TO_INDEX=10"
  */
networkUtils.constructEncodedUrl = function(action,params,removeExtraParams){
var url = action;
var i = 0;
for(var key in params){
    if(!removeExtraParams || !/\b(calleeObj|clickId)\b/.test(key))
    {
        if(i == 0){
            url += "?" + key + "=" + encodeURIComponent(params[key]); 
        }
        else{
            url += "&" + key + "=" + encodeURIComponent(params[key]); 
        }
        i++;
    }
}
return url;
}

/**
 * This method is used to set the CSRF param
 * @param {Object} jsonObj - This object is where the CSRF token is being added 
 * @returns {void}
  */	
networkUtils.setCsrfParam = function (jsonObj){
jsonObj[csrfParamName] = csrfToken;
}

/**
 * This method is used to open the passed-in URL argument. Note that by default the name argument is set as `_blank`. If the specs is not passed by default nopener noreferrer is set.
 * @param {String} url - This provides the URL that is to be opened using this method. 
 * @param {String} name - This provides the target attribute of the URL i.e,_top,_self
 * @param {String} specs - The rel attribute specifies the relationship between the current Url and the linked Url. 
 * @returns {void}
  */
networkUtils.openUrl = function(url,name,specs){ //NO I18N
if(specs == undefined && name != null  && name !== '_top' && name !== '_self' && name !== '_parent'){ //No I18N
//		var atag=document.createElement('a');
//		$(atag).attr({"href":url,"target":name,"rel":"noopener noreferrer","onclick":"sE(event)"}); //NO I18N //NO I18N
//		$(document.body).append(atag);
//		atag.click();
//		$(atag).remove();
    name = name ? name : ""; //No I18n
    specs = "noopener noreferrer" //No I18n
    window.open(url,name,specs);//eslint-disable-line @zoho/zohocrm/no-window-open
}
else{
    if(name === "_self")
    {
        url = Utils.getUpdatedFrameOriginURL(url);
    }
    
    var child = window.open(url,name,specs);//eslint-disable-line @zoho/zohocrm/no-window-open
    // modified by platform team
    if(name !== 'widgetConnectorAuthorize' && child)
    {
        child.opener = null;
    }	
}
}

/**
 * This method is used to open the URl with popup Blocker. Some Urls may open additional windows for which a custom alert messages is shown. 
 * @param {String} url - This provides the URL that is to be opened  
 * @param {String} msg - This provides the custom Alert message that is to be popped up
 * @returns {void} 	  
  */
networkUtils.openUrlwithpopBlockerHandle = function(url, msg){ //NO I18N
var child = window.open(url);  //eslint-disable-line @zoho/zohocrm/no-window-open
var isPopUpBlocked;
if ( child == null ) {
    renderingUtils.showCustomAlert(msg, "", true);
    isPopUpBlocked=true;
} else {
    child.opener = null;
    isPopUpBlocked=false;
}
return isPopUpBlocked;
}

/**
* This method is used to return the CDN Url based on the user DC
* @param {String} resource - This provides the type of the resource whether it is Lyte or non Lyte
* @returns {String} - This returns the complete CDN Url to get the static resource
* 
 */

networkUtils.getCdnUrl = function(resource){
    var cdnUrl = FingerPrint.primaryCdnUrl;
	// if((location.host.indexOf("zoho.com.au") >= 0 || location.host.indexOf("zoho.eu") >= 0 || location.host.indexOf("zoho.in") >= 0 )&& resource === 'CRMClient'){
	// 	cdnUrl = FingerPrint.secondaryCdnUrl;
	// }
	if(crmConstants.isCNCDN){
		cdnUrl = FingerPrint.dynamicCdnUrl;
	}
	else if(typeof featuresAvailable !== "undefined" && featuresAvailable.ACCL_CDN_FLOW){
		cdnUrl = FingerPrint.acclCdnUrl;
	}
	return cdnUrl;

}

/**
* This method is used to construct static path.  
* @param {String} fileName - This provides the Name of the File to construct the complete path  
* @param {String} resource - This provides the type of the resource whether it is Lyte or non Lyte
* @param {String} resourceName - This is an optional param which provides the feature name for less
* @returns {String} - It returns the constructed statics path along with the file name.
*/
networkUtils.constructScriptPath = function (fileName,resource,resourceName) {
var scriptSrc,resourcePath,fp_fileName ;
resource = resource === 'CRM' ? '' : resource;//No I18N
var path = resource === '' ? '' : resource + '/';
resourcePath = FingerPrint.basePathUrl + path;
if(!resourceName){
    var fileExtension = fileName.match('.[0-9a-z]+$')[0];
    if(fileExtension === ".css"){
        resourceName = ResourceConstants.CSS;
    }
    else if(fileExtension === '.js' || (fileName.includes('lux') && fileExtension === '.json')){
        resourceName = ResourceConstants.JAVASCRIPT;
    }
    else if(fileExtension === '.ts' && (fileName.endsWith('.d.ts'))){ // for d.ts type definition files
        resourceName = ResourceConstants.JAVASCRIPT;
    }
    resourcePath+=resourceName + '/';
}
else if(resourceName === ResourceConstants.ADDONS){
    resourcePath+=resourceName+"/";
}
else{
    var direction = (Crm.userDetails.RTL_ENABLED) ? "rtl" : "ltr"; //No i18n
    fileName = "compiled-css/" + resourceName + '/' + direction + '/' + fileName; //No I18n
    resourcePath+= 'css/'; //No I18N
}
if(typeof Crm !== "undefined" && typeof crmConstants !== "undefined" && Crm.userDetails && Crm.userDetails.CANVAS_SERVICE && crmConstants.canvasVersion  && networkUtils.canvasStaticFiles.indexOf(fileName) >= 0){
        scriptSrc = networkUtils.constructCanvasStaticFilePath(fileName,resourcePath,resourceName);
}
else if(FingerPrint.isCdnEnabled){
    networkUtils.cdnUrl = networkUtils.getCdnUrl(resource);
    if(resourceName !== ResourceConstants.ADDONS){
        fp_fileName = resource === '' ? commonUtils.getfingerPrintProperties(fileName) : commonUtils.getfingerPrintProperties(fileName,resource);
    }
    else{
        fp_fileName = commonUtils.getfingerPrintProperties(fileName,resource,resourceName);
    }
    scriptSrc = networkUtils.cdnUrl + resourcePath + fp_fileName
}
else{
    scriptSrc = resourcePath + fileName
}
return scriptSrc;
}

/**
* This method is used to provide the dependency files on demand (for both lyte and normal js files) 
* @param {Array} compressedFiles - This provides the list of compressed file names 
* @param {String} resource - This provides the type of the resource whether it is Lyte or non Lyte
* @param {String} resourceName - This is an optional param which provides the feature name for less
* @returns {String} - It returns the constructed statics path along with the file name.
* @example
* networkUtils.returnDependencyFiles ['en_US.js', 'crux_en_US.js']
* =>['//js.stratuscdn.com/crm/CRMClient/javascript/en_US_429a918_.js', '//js.stratuscdn.com/crm/CRMClient/javascript/crux_en_US_a1547f5_.js']
 */
networkUtils.returnDependencyFiles = function(compressedFiles,resource,resourceName,parentChildNotNeeded) {
var returnArray;
if( crmConstants.compression ){
    returnArray = compressedFiles;
}
else if(!Array.isArray(compressedFiles)){
    returnArray = compressedFiles;
}
else{
    var compressedFiles = commonUtils.getArrayList(compressedFiles);
    var uncompressedArray = networkUtils.fetchUncompressedFiles(compressedFiles);
    returnArray = [];
    if(!parentChildNotNeeded){
        var uncompressed_length = uncompressedArray.length;
        for(var ind = 0; ind < uncompressed_length; ind++){
            var arr = uncompressedArray[ind];
            if(typeof arr === "string"){
                returnArray = returnArray.concat(arr);
            }
            else{
                var len = arr.length;
                var tempArray = {};
                tempArray.parent = arr[len - 2];
                tempArray.child = arr[len - 1];
                for(var i = len - 3;i >= 0;i--){
                    var temp = {};
                    temp.parent = arr[i];
                    temp.child = tempArray;
                    tempArray = temp;
                }
                returnArray = returnArray.concat(tempArray);
            }
        }
    }
    else{
        returnArray = uncompressedArray[0];
    }
}
var isArray = false;
if(!Array.isArray(returnArray)){
    returnArray = [returnArray];
    isArray = true;
}
var len = returnArray.length;	
for(var index = 0; index < len; index++){
    if(typeof returnArray[index] === "object"){
        returnArray[index].parent = networkUtils.returnDependencyFiles(returnArray[index].parent, resource,resourceName);
        returnArray[index].child = networkUtils.returnDependencyFiles(returnArray[index].child,resource,resourceName);
    }
    else{
        returnArray[index] = networkUtils.constructScriptPath(returnArray[index],resource,resourceName);
    }
}
return isArray ? returnArray[0] : returnArray;
}

/**
 * This method is used to return the resource integrity hash if isSRIntegrityEnabled is true.  
 * @param {String} src - This provides the path for the file
 * @returns {String} - This returns a string which is the sha256 hash of the file.
  */
networkUtils.getIntegrityProperties = function(src) {
    var crmIndex = src.indexOf("/crm/");
        if (crmIndex != -1 && typeof isSRIntegrityEnabled !== 'undefined' && isSRIntegrityEnabled) {
            var start = crmIndex + "/crm/".length;
            var marker = 'javascript';
            var mNeedle = '/' + marker + '/';
            var mIdx = src.indexOf(mNeedle, crmIndex); // Changed: search from crmIndex, not start
            if (mIdx != -1) {
                var between = src.slice(start, mIdx);
                var middleSegment = between ? between.split("/")[0] : 'default';
                var afterStart = mIdx + mNeedle.length;
                var after = src.substring(afterStart).split("?")[0]; // Remove query params
                var parts = after.split("/");
                var rawFilename = parts.pop();
                var cleanedFilename = rawFilename.replace(/_[a-fA-F0-9]{32}_\.(\w+)$/, ".$1");
                parts.push(cleanedFilename);
                
                if (typeof FingerPrint !== 'undefined' && FingerPrint.resource_integrity && FingerPrint.resource_integrity[middleSegment] && FingerPrint.resource_integrity[middleSegment][marker]) {
                    var SRIHash = objectUtils.getValueFromObj(FingerPrint.resource_integrity[middleSegment][marker], parts);
                    if (SRIHash) {
                        return SRIHash;
                    }
                }
            }
        }
        return null;
};
/**
 * This method is used to return the filenames with path 
 * @param {Array} compressedFiles - This provides an array of filenames which are to be returned with their path 
 * @returns {Array} - This returns an array of the file names appended with their path and fingerprinting . 
 * @example 
 * networkUtils.returnFilesWithPath(['zohocrm_crmExportWMSMsg.js'])
 * => ['javascript/zohocrm_crmExportWMSMsg_dbab56a_.js']
  */
networkUtils.returnFilesWithPath = function(compressedFiles) {
var src = [];
var compressedFilesLength = compressedFiles ? compressedFiles.length : 0;
for (var i = 0; i < compressedFilesLength ; i++ ) {
    var filename;
    var fp_fileName = commonUtils.getfingerPrintProperties(compressedFiles[i]);
    if(fp_fileName && compressedFiles[i] != fp_fileName && typeof FingerPrint === "object" && typeof ResourceConstants === "object"){
            filename = FingerPrint.basePathUrl + ResourceConstants.JAVASCRIPT + '/' + fp_fileName;
            if(typeof filename === "string"){
                filename = filename ? filename.split(/crm(.+)/)[1] || "" : "";
                filename = filename.replace(/\/+/g,"/");
            }
            
        
//			src.push(filename);						
//			if(FingerPrint.isCdnEnabled) {
//				filename = crmConstants.fp_jsStaticPath	+ '/' + fp_fileName;
//				filename = filename.split("/crm")[1]	
//				src.push(filename);
//			}
    }
    else if(typeof FingerPrint === "object" && typeof ResourceConstants === "object"){
            filename =  FingerPrint.basePathUrl + ResourceConstants.JAVASCRIPT + '/' + compressedFiles[i];
            if(typeof filename === "string"){
                filename = filename ? filename.split(/crm(.+)/)[1] || "" : "";
                filename = filename.replace(/\/+/g,"/");
            }
//			src.push(filename);
    }
    src.push(filename);	
}
return src;
}

/**
 * This method is used to check whether the files are loaded and provides the js dependency files on demand(for only js files)  
 * @param {Array} compressedFiles - This provides the list of compressed file names 
 * @param {Function} callback - This function gets executed once the array of files are loaded
 * @param {Boolean} isAsync - This provides a boolean in which if the param is true , scripts are loaded with a property defer=true
 * @returns {void}
  */
networkUtils.loadFeatureScripts = function(compressedFiles, callback,isAsync) {
//var arg_length = arguments.length;	
if ( !crmConstants.compression ) {
     var unCompressedFiles = networkUtils.fetchUncompressedFiles(compressedFiles);
     var arr = [];
     var len = unCompressedFiles.length;
     for(var i = 0; i < len; i++){
         arr = arr.concat(unCompressedFiles[i]);
     }
     compressedFiles = arr;
 }
var src = networkUtils.returnFilesWithPath(compressedFiles);
var unloadedfiles = networkUtils.returnUnloadedFiles(compressedFiles,src);
//	if(callback === null && arg_length > 1)
//	{
//		if(typeof arguments[2] ===  "function" || typeof arguments[2] === null){  //eslint-disable-line @zoho/zstandard/no-reserved-words
//			callback = arguments[2];  //eslint-disable-line @zoho/zstandard/no-reserved-words
//		}
//	}
if ( unloadedfiles.length === 0)  
{ 
    if( callback ){
        callback();
    } 
    return; 
}
 networkUtils.loadScripts(unloadedfiles, callback,isAsync);
}

/**
 * This method is used to load the script files on demand and to execute sequentially
 * @param {Array} files - This provides the list of compressed or uncompressed file names 
 * @param {Function} callback - This function gets executed once the array of files are loaded 
 * @param {Boolean} isAsync - This provides a boolean in which if the param is true , scripts are loaded with a property defer=true
 * @returns {void}
  */
networkUtils.loadScripts = function(files, callback,isAsync) {
if ( !files.length ) {
    if( callback ) {
        callback();	
    }
    return;
}
var first_script_url = FingerPrint.basePathUrl + ResourceConstants.JAVASCRIPT + '/' + files[0];
var filearray = [];
filearray.push(files[0]);
 var loadedFile = networkUtils.returnFilesWithPath(filearray);
CJS.execScript(first_script_url, function() { // eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
    networkUtils.filesArray.push(loadedFile[0]);
    var remainingFiles = files.splice(1, files.length);
    networkUtils.loadScripts(remainingFiles, callback,isAsync);
},undefined,undefined,isAsync);
}

/**
 * This method is used to get the list of uncompressed files as an array for csez setup
 * @param {Array} compressedFiles - This provides the compressedFiles list as an array for which the corresponding uncompressed files list is generated and returned.
 * @returns {Array} - It returns an array of uncompressed Files that are to be downloaded.  
 *
  */
networkUtils.fetchUncompressedFiles = function(compressedFiles){
var len = compressedFiles.length;
var uncompressedFiles = [];
for(var i = 0; i < len; i++){
    if(typeof CRM_COMPRESSION_LIST!=="undefined" && CRM_COMPRESSION_LIST[compressedFiles[i]]){
        var fileList = CRM_COMPRESSION_LIST[compressedFiles[i]].slice();
            if(fileList.length !== 1){
                uncompressedFiles[i] = fileList;
            }else{
                uncompressedFiles = uncompressedFiles.concat(fileList);
            }
    }
    else if(typeof compressedFiles[i] === "object"){
        var compressed_length = compressedFiles[i].length;
        var arr = compressedFiles[i];
        var fileList = [];
        for(var j = 0; j < compressed_length; j++){
            if(CRM_COMPRESSION_LIST[arr[j]]){
                fileList = fileList.concat(CRM_COMPRESSION_LIST[arr[j]].slice());
            }else{
                fileList = fileList.concat(arr[j]);
            }
        }
        uncompressedFiles[i] = fileList;
    }
    else{
        uncompressedFiles = uncompressedFiles.concat(compressedFiles[i]);
    }
}
return uncompressedFiles;
};

/**
 * This method returns the array of files that are loaded through Lyte.injectResources and hence, only the non loaded files are only loaded using loadScripts method
 * @param {Array} files - This provides the array of compressed file name that are to be loaded 
 * @param {Array} extFiles - This provides the full path and fingerprinting properties appended name of these files.
 * @returns {Array} - This returns the files that are not loaded through the Lyte.injectResources method
 *
  */
networkUtils.returnUnloadedFiles = function (files, extFiles) {
var lyteArray = Object.keys(Lyte.injectResources.availableTags);
var lyteArrayLength = lyteArray.length;
var noFiles = [];
var noextFiles = [];
for (var i = 0 ; i <  lyteArrayLength ; i++ ) {
    lyteArray[i] = (lyteArray[i] && typeof lyteArray[i] === "string") ? lyteArray[i].replace(/\/+/g,"/") : "";
    lyteArray[i] = lyteArray[i].split(/crm(.+)/)[1];
    if (lyteArray[i]) {
        lyteArray[i] = lyteArray[i].split('.js')[0] + ".js"; //no i18n
    }
    if (lyteArray[i] && !networkUtils.filesArray.contains(lyteArray[i])) {
        networkUtils.filesArray.push(lyteArray[i]);
    }
}
if ( networkUtils.filesArray.length > 0 ) {
    var fileLength = files.length;
    for (var i = 0; i < fileLength ; i++) {
        if (!networkUtils.filesArray.contains(extFiles[i])) {
            noFiles.push(files[i]);
            noextFiles.push(extFiles[i])
        }
    }
//		if (noFiles.length > 0){
//			noFiles = networkUtils.checkscriptSource(noextFiles, noFiles);
//		}
//		var noextLength = noextFiles.length;
//		for (var j = 0; j < noextLength ; j++ ) {
//			if (!networkUtils.filesArray.contains(noextFiles[j])) {
//				networkUtils.filesArray.push(noextFiles[j]);
//			}
//		}
    return noFiles;
} 
else {
//		files = networkUtils.checkscriptSource(extFiles, files);
//		var extLength = extFiles.length;
//		for (var j = 0; j < extLength ; j++ ) {
//			if (!networkUtils.filesArray.contains(extFiles[j])) {
//				networkUtils.filesArray.push(extFiles[j]);
//			}
//		}
    return files;
}
}



/**
 * This method is used to maintain an array of loaded files , and make sure that no duplicate files are loaded 
 * @returns {void}
  */
networkUtils.checkscriptSource = function (){
var allScripts = $('script'),
allScriptsLength = allScripts ? allScripts.length : 0,
jssource;
//fileindex;
for( var i = 0; i < allScriptsLength; i++) {
    jssource = allScripts[i].src;
    if (jssource && typeof jssource === "string") {
        jssource = jssource.replace(/\/+/g,"/");
        jssource = jssource.split(/crm(.+)/)[1];
        if(jssource){
            jssource = jssource.split('.js')[0] + ".js"; //no i18n
        }
    }
    if (jssource && !networkUtils.filesArray.contains(jssource)) {
        networkUtils.filesArray.push(jssource);
//		fileindex = filesWithPath.indexOf(jssource);
//		if(fileindex != -1){
//			filename = filename.splice(fileindex,1);
//		}
    }
}
//return filename;
}

/**
 * This method is used to initiate a AJAX request call using crm request Pool
 * @param {String} url - This provides the URL to initiate the request 
 * @param {String} type - This provides the method in which the request has to be initiated i.e, POST , GET etc.. 
 * @param {Object} options - This object provides the additional options like params, success callback etc..
 * @returns {void}
  */
networkUtils.makeRequest = function(url,type,options)
{
var params = options.params || {};
var headers = options.headers || {};
var showLoading = !options.skip_load_tab;
var successCallBack = options.success_callback;
var failureCallBack = options.failure_callback;
var dataType = options.data_type;
var contentType = options.content_type;
var header = type;
var crmcsr_cookie = "";
type = type === "PUT" || type === "PATCH" || type === "DELETE" ? "POST" : type; //No I18n
if(showLoading)
{
    commonUtils.showHideLoadingDiv(true);
}
if(typeof cookieUtils === "object"){
     crmcsr_cookie = cookieUtils.getCookie('crmcsr');//No I18N
}
headers["X-ZCSRF-TOKEN"] = csrfParamName + "=" + crmcsr_cookie ; //No I18n
if(window.clientPortalName){
    headers["X-CRMPORTAL"] = window.clientPortalName //No I18N
}
if(header != type)
{
    headers['X-HTTP-Method-Override'] = header; //No I18n
}
var reqPool = new crmRequestPool();
var requestParams = {
    action: url,
    type: type,
    data: params,
    dataType : dataType,
    contentType : contentType,
    headers: headers,
    crossDomain : options.crossDomain,
    success: function(data) 
    {
        if(showLoading)
        {
            commonUtils.showHideLoadingDiv(false);
        }
        if(typeof successCallBack === 'function'){
            successCallBack(data); 
        }
    },
    error: function(jqXHR)
    {
        if(showLoading)
        {
            commonUtils.showHideLoadingDiv(false);
        }
        if(failureCallBack)
        {
            if(jqXHR.status === 555 && jqXHR.responseText === "Duplicate report Name"){
                var msg = I18n.getMsg('crm.label.name.already.exist');
                var repName = $('#reportName');
                repName.focus().next().removeClass('dN').text(msg).show();
            }
            failureCallBack(jqXHR);
        }
        else if(typeof successCallBack === 'function' && successCallBack)
        {
            successCallBack(jqXHR.responseJSON);
        }
    }
};
reqPool.initiate(requestParams);

}

/**
 * This method appends the url along with the keys of the params that are passed as a String.
 * @param {String} url - This provides the url for which the cache has to be checked
 * @param {Object} params - This provides the list of params which is append to the url provided. 
 * @returns {String} - This returns the url along with the keys of the params seperated by underscore.
  */	
networkUtils.getUrlParamKey = function(url, params){
var paramKeys = params ? Object.keys(params) : [];
var paramString = "";
var paramKeysLen = paramKeys.length;
for(var i = 0 ; i < paramKeysLen ; i++){
    var key = paramKeys[i];
    paramString = paramString ?  paramString.concat("_" + params[key]) : params[key] + "";
}
var cacheKey = url + "_" + paramString; //No I18N
return cacheKey;

}

/**
 * This method is used to initiate an Lyte AJAX Request
 * @param {String} url - This provides the Lyte URL to initiate the request 
 * @param {String} type - This provides the method in which the request has to be initiated i.e, POST , GET etc.. 
 * @param {Object} options - This object provides the additional options like params, success callback etc..
 * @param {Boolean} useCache - if useCache is true, we check the local cache to see if the request is cached globally and return the promise
 * @returns {Object} - This returns a promise using which the necessary request can be made.
  */
networkUtils.lyteInitiateRequest = function(url,type,options,useCache){
//if useCache is true, we check the local cache to see if the request is cached globally and return the promise
if (useCache) {
    var cacheKey = networkUtils.getUrlParamKey(url, options.params);
    var cachedpromise = app.reqCache[cacheKey];
    if (cachedpromise) {
        return cachedpromise;
    }
}
var promise = new Promise(function(resolve,reject)
{
    options = options || {};
    options.success_callback = resolve;
    options.failure_callback = reject;	
    networkUtils.makeRequest(url,type,options);
});
if(useCache){
    app.reqCache[cacheKey] = promise;
}
return promise
}

/**
 * The function is used to parse a URL into its individual components, i.e hostname, port, domain, subdomain, path, query string, hash.
 * @param {String} url - The url that has to be parsed 
 * @returns {Object} - Returns the components of a URL into a JSON Object
  */
networkUtils.parseUrl =	function(url){//No I18N
var anc = document.createElement('a');
anc.href = url;
var idx = url.indexOf("?");
if(idx < 0){
    idx = url.length;
}
var action = url.substring(0,idx);
action = action.replace(".do","");
var lastIndex = action.lastIndexOf("/");
       action = action.substring(lastIndex + 1);	
var paramStr = url.substring(idx + 1);
var obj = {};
if(paramStr.length !== 0){
    paramStr = paramStr.replace(anc.hash,"");
    var paramArr = paramStr.split("&");
    var paramArrLen = paramArr.length;
    for(var i = 0;i < paramArrLen;i++){
        var ind = paramArr[i].indexOf("=");
        var key = paramArr[i].substring(0,ind);
        if(paramArr[i].indexOf("#") > 0){
            var value = paramArr[i].substring(ind + 1, paramArr[i].indexOf("#"));
        }else{
            var value = paramArr[i].substring(ind + 1);
        }
        obj[key] = value;
    }
}
return {"action": action,"params":obj,"hash":anc.hash};//No I18N
}

/**
 * This method is used to initiate a new request or re-initiate existing call
 * @param {String} url - This provides the function with the url to make the xhr request.
 * @param {String} method - This provides the method in which the xhr request has to be made i.e, POST , GET etc.. 
 * @param {Function} headers -  This provides the list of headers that are to be sent along with xhr.
 * @param {Object} formData - This provides the params that are to be send to the server.
 * @returns {void}
  */
networkUtils.sendxhr = function(url,method,headers,formData)
{
return new Promise(function(res, rej){ // eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
var xhr = new XMLHttpRequest();// eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
xhr.open(method, url, true);
headers = headers ? headers : {};
headers["X-ZCSRF-TOKEN"] = csrfParamName + "=" + csrfToken; //No I18n
headers["X-CRM-ORG"] = crmZgid;//No I18N
if(window.clientPortalName){
    headers["X-CRMPORTAL"] = window.clientPortalName //No I18N
}
if(typeof crmZgid !== 'undefined' && crmZgid ){
    headers["X-CRM-ORG"] = crmZgid; //No I18N
}
for(var header in headers){
    xhr.setRequestHeader(header, headers[header]);
}
xhr.send(formData);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status.toString()[0] === "2" || xhr.status.toString()[0] === "3"){
            return res(xhr);
        }
        else{
            return rej(xhr);
        }
    }
}
})
}

/**
 * This method is used to get the I18n's JS URL 
 * @param {String} featureName - This gives the featureName to the JS path
 * @returns {String} - It returns the I18nJSpath's complete URL 
  */
networkUtils.getI18nJSUrl = function(featureName){ //NO I18N
var i18njsPath = "i18n/" + featureName.toLowerCase() + "/zohocrm_" + $ESAPI.encoder().encodeForJavaScript(Crm.userDetails.RELEVANT_LOCALE) + ".js"; //NO I18N
return i18njsPath;
}


/**
 * This method is used to get the value from the decoded query param 
 * @param {String} variable - This provides the key from the query param
 * @returns {String} - It returns the value against the query param key
  */
networkUtils.getQueryVariable = function(variable) {
var query = window.location.search.substring(1);
var vars = query.split('&');
var totCnt = vars.length;
for (var i = 0; i < totCnt; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
    }
}
}


/**
 * This method is used to get the domain name from the href provided.
 * @param {String} url  - This provides the URL/href from which the domain name has to be returned.
 * @returns {String} - This returns the domain name from the href provided.
 * @example 
 * networkutils.getDomainNameFromUrl("https://google.com/org675566061/tab/Leads/3555310000000526002")
 * => "google.com"
   */
networkUtils.getDomainNameFromUrl = function(url){
var match = /([a-zA-Z]+):\/\/([\-\w\.]+)(?:\:(\d{0,5}))?/.exec(url); /* eslint-disable-line no-useless-escape */ // No I18n 
if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    var domain = match[2];
    if(match.length > 3 && typeof match[3] === 'string' && match[3].length > 0 )
        {
            domain = domain + ":" + match[3];
        }
    return domain;
}
else {
    return null;
}
}
/**
* This method is used to switch between light and dark mode 
* @param {String} imgName - This provides the image name to be replaced 
* @param {String} mode  - This provides the from existing theme to invert
* @param {String} regexp - This provides the regexp to replace the string
* @returns {String} - It returns the path of the inverted image name
*/ 

networkUtils.darkLightSwitch=function(imgName,mode){ /* removed regexp param since its unused var */
var replaceMode = mode === "lightmode" ? "darkmode" : "lightmode";//No I18n
var index = imgName.lastIndexOf("_"+mode);
var replaceName = [];
replaceName.push(imgName.substr(0,index));
replaceName.push(imgName.substr(index));
if(mode === "lightmode"){
    imgName = "dark/" + replaceName[0] +replaceName[1].replace("_"+mode,"_"+replaceMode);//No I18N
}
else{
    imgName =  replaceName[0].replace("dark/","") + replaceName[1].replace("_"+mode,"_"+replaceMode);//No I18n
}
return imgName;
}
/**
* This method is used to load images.
* @param {String} name  - This provides the name of the image.
* @param {String} folder  - This provides the folders in which image is present. (available options "crm","CRMClient","CRMOrganization")
* @returns {String} - This returns the URL along with the fingerprinting of the resource as a string.
* @example 
*/

networkUtils.getImageUrl = function (name,folder) {	
var darkThemeQuerySelector = document.querySelector('[data-mode="dark"]');//No I18n
var isDarkTheme = darkThemeQuerySelector !== null ? darkThemeQuerySelector.getAttribute('data-mode') === "dark" : false;//No I18n
if(isDarkTheme && name.includes("_lightmode")){	
    name =  networkUtils.darkLightSwitch(name,"lightmode");//No I18n
}
else if(!isDarkTheme && name.includes("_darkmode")){
    name =  networkUtils.darkLightSwitch(name,"darkmode");//No I18n
}
if(typeof Crm !== "undefined" && typeof crmConstants !== "undefined" && crmConstants && crmConstants.canvasVersion && Crm.userDetails && Crm.userDetails.CANVAS_SERVICE && networkUtils.canvasStaticFiles.indexOf(name) >= 0)
{
    if(RebrandLinkUtil.getProperties('ISDEVELOPMENT').ISDEVELOPMENT === "true") {
        var httpProto = "http";//NO I18N
        var port = "://localhost:3000/";//NO I18N
        return  httpProto + port + ResourceConstants.IMAGES[folder] + "/" + fileName; //NO I18N
    }
    return FingerPrint.primaryCdnUrl +"/crm-canvas-components/" + crmConstants.canvasVersion + "/images/" + name; //NO I18N
}
if(typeof FingerPrint === 'object' && typeof FingerPrint.config_image_properties === 'object') {
     var cdnUrl = networkUtils.getCdnUrl(folder);
     var resourceType = (ResourceConstants.CRM === folder) ? 'default' : folder; // No I18n 
     var md5 = objectUtils.getValueFromObj(FingerPrint.config_image_properties[resourceType].images,name.split("/"));// No I18n //FingerPrint.config_image_properties[resourceType].images[name];
     var value = [];
     var index = name.lastIndexOf(".");
     value.push(name.substr(0,index));
     value.push(name.substr(index))
     var processedName = md5 ? value[0] + "_" + md5 + "_" + value[1] : name;
     return cdnUrl + ResourceConstants.IMAGES[folder] + "/" + processedName;
 }
 return ResourceConstants.IMAGES[folder] + "/" + name;
}
/**
* This method is used to replace the image tags containing data-image-theme and attribute on change to dark mode.
* @returns {void}
*/
networkUtils.replaceImageUrlsToDark= function(mode){
var darkThemeImagesList = document.querySelectorAll('img[data-image-mode="true"]');//No I18n
darkThemeImagesList.forEach(function(image) {
var currentSrc = image.src;
var currentCdnUrl;
    if(currentSrc.includes("_lightmode") || currentSrc.includes("_darkmode")){
        if(typeof FingerPrint === 'object' && typeof FingerPrint.config_image_properties === 'object') {
            currentCdnUrl=networkUtils.getCdnUrl();
            var fingerprint_index= currentSrc.lastIndexOf(".");
            var replaceName = [];
            replaceName.push(currentSrc.substr(0,fingerprint_index-34));
            replaceName.push(currentSrc.substr(fingerprint_index));
            currentSrc = replaceName.join("");
        }
        else{
            currentCdnUrl=window.location.origin; 
            if(!currentSrc.includes(currentCdnUrl)){
                currentCdnUrl="";
            }
        }
        if(currentSrc.includes("_darkmode")){
            currentSrc = currentSrc.replace("dark/","");//No I18n
        }
        if(currentSrc.includes(ResourceConstants.IMAGES.CRM)){
            currentSrc = currentSrc.replace(currentCdnUrl+ResourceConstants.IMAGES.CRM+"/","");
            image.src = networkUtils.getImageUrl(currentSrc,ResourceConstants.CRM); 
        }
        else if(currentSrc.includes(ResourceConstants.IMAGES.CRMClient)){
            currentSrc = currentSrc.replace(currentCdnUrl+ResourceConstants.IMAGES.CRMClient+"/","");
            image.src = networkUtils.getImageUrl(currentSrc,ResourceConstants.CRMClient); 
        }
        else if(currentSrc.includes(ResourceConstants.IMAGES.CRMOrganization)){
            currentSrc = currentSrc.replace(currentCdnUrl+ResourceConstants.IMAGES.CRMOrganization+"/","");
            image.src = networkUtils.getImageUrl(currentSrc,ResourceConstants.CRMOrganization); 
        }
    }
});


darkThemeImagesList = document.querySelectorAll('img[data-image-getlogo="true"]');//No I18n
darkThemeImagesList.forEach(function(image) {
    if (mode === "dark")
    {
        image.src = Crm.Logo.Logo_url_white;
    }
    else
    {
        image.src = Crm.Logo.Logo_url;
    }
});
}

networkUtils.initChart = function () {	
if( typeof(Highcharts) !== "undefined"  ){
    CrmDashboard.initChart();
}
}

networkUtils.includeChartFiles = function(){
if( Crm.isZohoChartsEnabled ){
    return ["zohocrm_chart.js"]
}else{
    return ["highcharts.js"];
}
}


/**
* This method is used to append the passed in URL with base path , if there is not portal URL present it will return the same passed in URL
* @param {String} request - This provides the request URL for which the portal URL has to be constructed
* @returns {String} - This returns the passed in URL concatenated with the base path of crm.
*/

networkUtils.getPortalURL = function(request){
if(Crm.userDetails.CLIENT_ACCOUNT && request.indexOf(Crm.userDetails.CLIENT_PORTAL_URL_CONTEXT) === -1 && request.indexOf("/crm/v2/") === -1 && request.indexOf("/crm/v2.1/") === -1  && request.indexOf("/crm/v2.2/") === -1 && request.indexOf("/crm/v5/") === -1)
{
    if(request[0]==="/")
    {
        request = Crm.getCrmBasePath() + request;
    }else
    {
        request = Crm.getCrmBasePath() + "/" + request;//NO I18N
    }
}
return request;
}

/**
* This method is used to get the org specific URL , if the passed in URL contains /crm/org it returns the same URL 
* @param {String} url - This provides the URL that is specific to the Org.
* @returns {String} - This returns the org specific URL 
*/

networkUtils.getOrgSpecificURL = function(url){
if(url && typeof crmPortal != 'undefined' && crmPortal && url.indexOf('/crm/'+crmPortal+'/')===-1)
{
    //Added for multi portal
    var appIndex = url.indexOf("/crm/");

    if(appIndex == 0 || (appIndex != -1 &&
            ( url.startsWith(document.domain) || url.startsWith(location.protocol+'//'+document.domain)) ))
    {
        var crmindex = appIndex+5;
        url = url.substring(0,crmindex) + crmPortal +"/"+url.substring(crmindex);
    }
}
return url;
}

/**
* This method is used to construct script or link tag and append the same in the head of the document, specifically used for loading external Urls or static files. 
* @param {String} url - This provides the URL for which script or link tag has to be constructed.
* @returns {void}
*/
networkUtils.constructScriptOrLinkTagForUrl = function(url,callback){
var fileExtension = url.match('.[0-9a-z]+$')[0];
if(callback && typeof callback === "function"){
    var callbackFn = function() {
        if ( this.readyState && this.readyState !== "complete" && this.readyState !== "loaded" ) {
            return; 
        }
        this.onload = this.onreadystatechange = null; // ensure callback is only called once
        callback(); 
    };
}
if(fileExtension  === '.js'){
    var scriptEle = document.createElement('script');	
    scriptEle.onload = scriptEle.onreadystatechange = callbackFn;
    scriptEle.src = url;
    document.head.appendChild(scriptEle);
}
else if(fileExtension === ".css"){
    var linkEle = document.createElement('link');		
    linkEle.onload = linkEle.onreadystatechange = callbackFn;
    linkEle.href = url;
    linkEle.setAttribute("rel","stylesheet"); //NO I18N
    linkEle.setAttribute("type","text/css");//NO I18n
    document.head.appendChild(linkEle);
}
}
/**
* This method is used to get Static Canvas Resource path
* @param {String} fileName 
* @param {String} resourcePath 
* @returns {String} 
*/
networkUtils.constructCanvasStaticFilePath = function(fileName, resourcePath,resourceName){
if(RebrandLinkUtil.getProperties('ISDEVELOPMENT').ISDEVELOPMENT === "true") {
    var httpProto = "http";//NO I18N
    var port = "://localhost:3000/";//NO I18N
    return  httpProto + port + resourceName + "/" + fileName; //NO I18N
}
return FingerPrint.primaryCdnUrl +"/crm-canvas-components/" + crmConstants.canvasVersion + "/" +resourceName + "/" + fileName; //NO I18N
}
