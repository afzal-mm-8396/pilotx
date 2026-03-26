// $Id$ 

/**
 * @namespace
 */

var commonUtils = {
	ms_ie : false	
};

	/** 
	 * This method is used to get the photo Url of User profile. 
	 * @param {Number} zuid - zuid of the user. 
	 * @returns {String} It retrun the url to fetch the user profile picture
	 */
commonUtils.getPhotoURL = function(zuid){//NO I18N
    return crmConstants.contactsPhotoURL + "/file?ID=" + zuid + "&fs=thumb";//NO I18N
}
	
	/**
	 * This method is used to get the from and to indexes for getting previous state of the page.
	 * @param {Number} recNum - This provides the record Number which is previously chosen. 
	 * @param {Number} currOption - This provides the total number of records that are to be displayed in list view page. 
	 * @returns {void} 
	 * @example 
	 * // For example if you are clicking on 12th record in list view page and the route changes to the detail view page of the 12th record.
	 * //When returning to the list view page again 
	 * commonUtils.getFromToIndexes(12,100); 
	 */
commonUtils.getFromToIndexes = function(recNum,currOption){//no i18n
	var quo = parseInt(parseInt(recNum) / parseInt(currOption));
	var indexes = [];
	indexes.push(quo * currOption + 1);
	indexes.push((quo + 1) * currOption);
	return indexes;
}
commonUtils.isInViewport = function(el) {
	var top_of_element = el.offset().top;
    var bottom_of_element = el.offset().top + el.outerHeight();
    var bottom_of_screen = $L(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $L(window).scrollTop() + $(".cvpadding").outerHeight();

    if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        return true;
    } else {
        return false;
    }
}

	/**
	 * This function is used to check the error messages in the response that is provided to the method and render the respective alert message on the page.
	 * @param {Sring|JSON} txt - This provides the response as a string from which the error message has to be checked
	 * @param {String|undefined} placeHolderDivId - This provides the id of the div in which the error content has to be displayed.
	 * @param {String} url - This provides the api request Url, whose success callback passes the reponse and url to it.
	 * @param {Boolean|undefined} fromCreatePopup (optional) - This is set to true if the request is initiated from the create popup.
	 * @param {String} module (optional) - This provides the module name from which the request is initiated.
	 * @returns {Boolean} - returns True if the Error msg is found or returns False.
	 */
commonUtils.checkErrorMsg = function(txt,placeHolderDivId,url,fromCreatePopup,module){//No I18N
	placeHolderDivId = placeHolderDivId ? placeHolderDivId : "show";//No I18N
	var twitterDiv = $('#twtInptDiv');
	if(txt){
		if(typeof txt === "object"){
			if (txt.error === "true" && txt.errMsg === "crm.process.criteria.pop.info") {
				crmui.showMsgBand('error', I18n.getMsg(txt.errMsg), 3000); // No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			} 
			if(txt.STATUS === "LOOKUPFILTER_CRITERIA_NOTMATCHED") {
				var specialsymbols = ["(",")","+","-","_","/"];
				var sslength = specialsymbols.length;
				var len =  txt.INFO.length;
				if(len > 0) {
					for(var j = 0;j < len;j++) {
					var errorContent = txt.INFO[j];
					var elemID = errorContent.ISCF === "1" ? errorContent.COLUMNNAME : errorContent.FIELDLABEL;
						for(i = 0;i < sslength;i++) {
							elemID = commonUtils.replaceSpSymbols(elemID,specialsymbols[i]);
						}
						var elemObj = $L('#property\\(' + elemID + '\\)'); //No I18N
						if(!elemObj || elemObj.length === 0) {
							elemObj = $L(fromCreatePopup) ? $L('#' + errorContent.COLUMNNAME) : $('#Crm_' + module + '_' + errorContent.COLUMNNAME);
							if(!elemObj || elemObj.length === 0) {
								elemObj = $("input[name=property\\(" + elemID + "\\)]");/*eslint-disable-line @zoho/webperf/no-attribute-selectors*/
							}
						}
						commonUtils.showErrorMsg(I18n.getMsg("crm.lookupfilter.entity.errormsg",errorContent.SINGULARTABLABEL), elemObj, module, fromCreatePopup); // No I18N
						if(!fromCreatePopup && !commonUtils.isInViewport(elemObj)){
							//$.scrollTo(elemObj, {axis:'y',duration:1000,offset:-100}); //No I18N
							$L(elemObj).scrollTo({axis:'y',duration:1000,offset:-100}); //NO I18N
						}
				}
				}else if(Object.keys(txt.INFO)) {
					var subformKeys = Object.keys(txt.INFO);
					var subformKeysLen = subformKeys.length;
					for(var subformrowsCnt = 0;subformrowsCnt < subformKeysLen;subformrowsCnt++) {
						var subformRow = subformKeys[subformrowsCnt];
						var rowNumber = subformRow.split("_")[1];
						var subformTabId = subformRow.split("_")[2];
						var errorFields = txt.INFO[subformRow];
						var errorFieldLen = errorFields.length;
						for(var errFldCnt = 0;errFldCnt < errorFieldLen;errFldCnt++) {
							var errorContent = errorFields[errFldCnt];
	//     					var elemObj = $('#Crm_' + module + '_' + subformTabId + '_' + errorContent.COLUMNNAME + '_' + rowNumber);
							var isUserField = errorContent.MODULE === 'Users' ; //No I18N
							let bitMap = Crm.requestSubformBitMap[subformTabId];
							let count = 0;
							let actualRowNumber = 0 ;
							while(count < rowNumber && actualRowNumber < 1000){
								if(bitMap.charAt(actualRowNumber) === '1'){
									count++;
								}
								actualRowNumber++;
							}
							let tempObj = $("#subform_"+subformTabId).find("tr")[actualRowNumber];
							let elemObj = $(tempObj.querySelector(" input[data-colname="+errorContent.COLUMNNAME+"]")).length !== 0 ? $(tempObj.querySelector(" input[data-colname="+errorContent.COLUMNNAME+"]")) : isUserField? $(tempObj.querySelector("crm-user-wrapper[data-colname="+errorContent.COLUMNNAME+"]")): $(tempObj.querySelector(" textarea[data-colname="+errorContent.COLUMNNAME+"]"));/* No I18N */ /*eslint-disable-line @zoho/webperf/no-attribute-selectors*/ /*eslint-disable-line @zoho/webperf/no-multipleDOMLookup*/
							commonUtils.showErrorMsg(I18n.getMsg("crm.lookupfilter.entity.errormsg",errorContent.SINGULARTABLABEL), elemObj, module, fromCreatePopup);
							if(!commonUtils.isInViewport(elemObj)){
								//$.scrollTo(elemObj, {axis:'y',duration:1000,offset:-100}); //No I18N
								$L(elemObj).scrollTo({axis:'y',duration:1000,offset:-100}); //NO I18N
							}
						}
					}
				}
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "DUPLICATE") {
				commonUtils.hideDuplicateErrorMsg();
					if(txt.TYPE){
						renderingUtils.showCustomAlert(txt.INFO,'',true);
						commonUtils.showHideLoadingDiv();
						return true;
					}
					else{
						var specialsymbols = ["(",")","+","-","_","/"];
						var sslength = specialsymbols.length;
						var ln = txt.INFO.length;
						for(var id = 0,ij = 0; ij < ln; ij++,id++)
						{
							var dupDetails = txt.INFO[ij];
							var i = 0;
							var fieldLabel = dupDetails.FIELDLABEL;
							var module = dupDetails.MODULE;
							var elemID = dupDetails.ISCF == "1" ? dupDetails.COLUMNNAME : fieldLabel;
							for(i = 0;i < sslength;i++){
								elemID = commonUtils.replaceSpSymbols(elemID,specialsymbols[i]);
							}
							var elemObj = dupDetails.COLUMNNAME === 'TWITTER' ? twitterDiv : $('#property\\(' + elemID + '\\)'); //No I18N
							if(!elemObj || elemObj.length === 0) {
								if(fromCreatePopup===true){
									elemObj = $('#Crm_' + module + '_' + dupDetails.COLUMNNAME+'.Crm_' + module + '_' + dupDetails.COLUMNNAME);
								}
								else
									{
										elemObj = $('#Crm_' + module + '_' + dupDetails.COLUMNNAME);
									}
							}

							var dupErrMsg = commonUtils.getDuplicateErrorMsg(dupDetails, false,undefined,id);
							
							commonUtils.showErrorMsg(dupErrMsg, elemObj, module, fromCreatePopup); 
							elemObj.focus();
						}
					}
					
					commonUtils.showHideLoadingDiv();
					return true;
			}
			else if(txt.STATUS === "REPORTINGTO_COUNT_EXCEEDED") { //No I18N
				var errDiv = "<span id='errorMsg_Crm_Contacts_REPORTINGTOCONTACTID' class='errMsg errorMsgDesc'>" + txt.INFO + "</span>";
				var contactReportingId = $("#Contacts_fldRow_REPORTINGTOCONTACTID");
				contactReportingId.addClass("errorFieldP"); //No I18N
				contactReportingId.find(".labelValCreate").append(errDiv);
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "ACCOUNT_PERMISSION_DENIED"){//No I18N
				var errDiv = "<span id='errorMsg_Crm_Contacts_ACCOUNTID' class='errMsg errorMsgDesc'>" + txt.INFO + "</span>";
				var accId = "#Contacts_fldRow_ACCOUNTID";//No I18N
				$(accId).addClass("errorFieldP"); //No I18N
				$(accId).find(".labelValCreate").append(errDiv);
				commonUtils.showHideLoadingDiv();
				return true;
			
			}
			else if(txt.STATUS === "PRODUCT_DOES_NOT_EXIST"){ //No I18N
				var delPrd =  typeof txt.DelProd === "object" ? txt.DelProd : JSON.parse(txt.DelProd); //No I18N
				var addLinesElemOffset;
				for(var i = 0;i < txt.ProdCount;i++){
					var errElm = productDetails.sfFldIdSuffix.substr(1) + 'PRODUCTID_' + (i+1);//NO I18N
					var prdElm = productDetails.sfFldIdSuffix + 'PRODUCTID_' + (i+1);//NO I18N
					
					$("#errorMsg_product_"+errElm).remove();
					if(delPrd.includes(i+1)){
						var errDiv = "<div id='errorMsg_product_"+errElm+"' style='clear:both; padding-bottom:10px;color: var(--negativeColor); font-size: var(--crm-extra-medium-font-size) !important; display:block;'>"+I18n.getMsg("crm.select.product.deleted")+"</div>";
						$(errDiv).insertAfter(prdElm);//NO I18N
						addLinesElemOffset = $("#"+errElm).offset();//eslint-disable-line @zoho/webperf/layout-thrashing

					}
				}
				$L(window).scrollTo(0, addLinesElemOffset.top - 200);//eslint-disable-line @zoho/webperf/layout-thrashing
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS == "INVALID_INVENTORY_REQUEST"){ //No I18N
				renderingUtils.showCustomAlert(I18n.getMsg("crm.email.message.invalid.data")+'. '+I18n.getMsg("crm.refresh.page"));//No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "FILEUPLOAD_FIELD_LIMITEXCEEDED"){ //No I18N
				crmui.showMsgBand('error', I18n.getMsg("crm.attachment.fileUploadField.Maxlen.check.field",[txt.MAXLEN,txt.LABEL]), 3000); // No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "IMAGEUPLOAD_FIELD_LIMITEXCEEDED"){ //No I18N
				crmui.showMsgBand('error', I18n.getMsg("crm.imageupload.allowed.length",[txt.MAXLEN,txt.LABEL]), 3000); // No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "SHOW_INFO_KEY_ERROR"){ //No I18N
				crmui.showMsgBand('error', txt.INFO, 3000); // No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.STATUS === "NO_PERMISSION_FOR_EMAILID"){ //No I18N
				commonUtils.showHideLoadingDiv();
				var fields = txt.DETAILS.fields;
				var fieldLen = fields.length;
				for(var index = 0; index < fieldLen; index++){
					var fieldLabel = fields[index].field_label;
					var parentId = fromCreatePopup ? '#createEntityForm' : '#secDiv_Native__Campaigns__Extn__Zoho_Campaign_Details'; //No I18N
					var domObj = $L(parentId).find('[data-label="' + fieldLabel + '"]'); //eslint-disable-line @zoho/webperf/no-attribute-selectors
					commonUtils.showErrorMsg(I18n.getMsg('crm.zcampaign.emailid.permission.denied'), domObj, module); // No I18N
				}
				return true;
			}
			else if(txt.STATUS === "NOT_ALLOWED" && txt.DETAILS && txt.DETAILS.api_name){ //No I18N
				commonUtils.showHideLoadingDiv();
				if(txt.message === "A portal user with same email address already exists."){// No I18N 
					crmui.showMsgBand('error',I18n.getMsg('custmr.prtl.email.already.used'), 3000);// No I18N 
				}
				if(txt.message === "A portal user with the same phone number already exists."){// No I18N 
					_cruxUtils.showCustomMessage({params : {ltPropMessage :I18n.getMsg('custmr.prtl.phone.already.used'), ltPropType : "error"}}); // NO I18N
				}
				return true;
			}
			else if(txt.STATUS === "INVALID_DATA" && txt.DETAILS){ //No I18N
				commonUtils.showHideLoadingDiv();
				if(txt.message === "You cannot assign this email address to this portal user type, since the domain matches the super admin's domain."){// No I18N 
					crmui.showMsgBand('error',I18n.getMsg(Crm.userDetails.renderUserGroupUi ? 'custmr.prtl.email.domain.check.failed.new': 'custmr.prtl.email.domain.check.failed'), 3000);// No I18N 
				}
				if(txt.message === "You cannot send the portal invitation since the email address has the following characters"){
						crmui.showMsgBand('error',I18n.getMsg('portal_invite_email_is_not_supported')+" "+txt.DETAILS.inValidChars , 4000); //No I18N
				}
				if(txt.message === "Email address cannot contain the + character"){
					crmui.showMsgBand('error',I18n.getMsg('custm.prtl.plus.email'), 4000); //No I18N
				}
				return true;
			}
			else if (txt.STATUS === "LOOKUP_RECORD_ENTERS_INTO_REVIEW"){
				crmui.showMsgBand('error', txt.INFO, 3000); // No I18N
					commonUtils.showHideLoadingDiv();
					return true;
			}
			else if(txt.message && txt.message.indexOf('cf validation rule execution failed') !== -1){//cf validation rule case
				return CVRExec.showAlertOnError(module,txt);
			}
			else if(txt.message && txt.message.indexOf('validation rule execution failed') !== -1){//validation rule case
				if(txt.status === 'error'){
					if(txt.validation_rule_error_fields){
						var fields = txt.validation_rule_error_fields;
						var loopCount = fields.length;
						var field = {},object = {};
						for(var iter = 0;iter < loopCount;iter++){
							field = fields[iter];
							object = $('#' + CVRExec.getElemId( "edit",field.column_name,module));
							commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(field.alert),object , module);
							object.focus();
						}
					}
					return true;	
				}
			}
			else if(txt.message && txt.message.indexOf('Service Module Check for Service Availability') !== -1  || txt.message && txt.message.indexOf('Appointment Module Check for Service Availability') !== -1 ){
				if(txt.status === 'error'){
					if(txt.service_availability_error_fields){
						var fields = txt.service_availability_error_fields;
						var loopCount = fields.length;
						var field = {},object = {};
						for(var iter = 0;iter < loopCount;iter++){
							field = fields[iter];
							object = $('#' + CVRExec.getElemId( "edit",field.column_name,module));
							commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(field.alert),object , module);
							object.focus();
						}
					}
					return true;	
				}
			}
			else if(txt.message && (txt.message == 'crm.error.services.limit' || txt.message == 'crm.error.active.services.limit')){
				if(txt.status === 'error'){
					_cruxUtils.showCustomAlert({ params : { 
						ltPropPrimaryMessage :I18n.getMsg(txt.message),
						ltPropWrapperClass:"crmCenterAlert", //No I18n
						ltPropContentAlign : "center", //No I18n
						ltPropButtonPosition : "center",//No I18n
						ltPropButtons : [{"type":"accept","text":I18n.getMsg("crm.nsocial.onboard.got.it"),"appearance":"primary"}]// NO OUTPUTENCODING
					} })
				}
				return true;
			}	
			else if(txt && txt.STATUS && txt.STATUS === "FAILURE" && txt.INFO && txt.INFO.MSG){
					renderingUtils.showCustomAlert(txt.INFO.MSG,'',true);
					commonUtils.showHideLoadingDiv();
					return true;
			}
			else if (txt.STATUS === "SUBFORM_RECORD_MAX_ROW_EXCEEDED"){
				var errResArr = txt.INFO.split(':::');
				var errMsg = I18n.getMsg(errResArr[0],[errResArr[1],errResArr[2]]);
				crmui.showMsgBand('error', errMsg , 3000); /*NO OUTPUTENCODING*/// No I18N
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt && txt.STATUS && txt.STATUS === "ZIAFAILURE" && txt.INFO){
				var elmPhoto = $L(".photoUploadSec");
	//    		var fieldOffset =  elmPhoto.offset().top - $L('#tabLayer').outerHeight() - $L('#wmstoolbar').outerHeight();
	//    		$L(window).scrollTop(fieldOffset);
				//To Scroll to image elem if its not visible
				var wmsBar = $('#wmstoolbar');
				var wmsHeight = 28;
				if(wmsBar){
					wmsHeight = wmsBar.outerHeight();
				}
				var fixedButn = $('#createFixedButtonDiv');
				var elementTop = elmPhoto.offset().top + elmPhoto.outerHeight();
				var elementBottom = elmPhoto.offset().top;
				var windowElm = $L(window);
				var viewportTop = windowElm.scrollTop() + fixedButn.outerHeight();
				var viewportBottom = viewportTop + renderingUtils.windowHeight - wmsHeight - fixedButn.outerHeight();//NO I18N

				if(! (elementBottom > viewportTop && elementTop < viewportBottom) ) {
					var scrolTo =  elmPhoto.offset().top  - wmsHeight - fixedButn.outerHeight();//NO I18N
					windowElm.scrollTop(scrolTo);
				}
				
				var allRes = Crm.getVisionMyJobsDependency();
				
				Lyte.injectResources(allRes, undefined, function()
				{
				if(txt.STATUS === "PRODUCTID_INVALID"){//NO I18N
				var elem = $('[data-colname="PRODUCTID"]')[txt.prdId];/* eslint-disable-line @zoho/webperf/no-attribute-selectors */ 
				var closestDiv = elem.closest('div');//NO I18N
				var prdErrorSpan = closestDiv.getElementsByClassName('prdError');//NO I18N
				if(prdErrorSpan.length === 0){
					var span = document.createElement('span');
					span.setAttribute('class','prdError errMsg errorMsgDesc');
					span.innerText = I18n.getMsg(txt.errMsg);
					closestDiv.append(span);//NO I18N
				}
				commonUtils.showHideLoadingDiv();
				return true;
			}
					visionCallBack(model);
				});
				function visionCallBack(){
					var crmVisionPop = $("crm-zia-vision-error-popup");
					if (crmVisionPop.length!= 0)
					{
						crmVisionPop.remove();
					}
					Crm.client_tracking("Zia Vision Entity Validation Failure",{"type" :  txt.INFO}) ;//NO I18N
					var lnPhoto = $L('.lnPhoto');
					lnPhoto.find("img").hide();//NO I18N
					var imageSrc = $L("#imgContainer").find("img")[0].src;
						Lyte.Component.render("crm-zia-vision-error-popup",{"moduleName" : module, "createImgSrc" : imageSrc, "action" : txt.INFO, "visionId" : txt.VISIONID},"#zia-vision-popup");
						lnPhoto.addClass('lnPhoto_ziaVision');
						elmPhoto.addClass('cP');
						elmPhoto.attr("onclick",'$("#visionModal")[0].ltProp("show", true);');//no I18N
	//    	    		$L("#visionModal")[0].ltProp("show", true);//no I18N
				}
				
				return true;
			}
			else {
				$L('.lnPhoto').removeClass('lnPhoto_ziaVision');
			}
		}
		else if(typeof txt.indexOf !== "undefined"){
			if(txt.indexOf("NAVMESG::::") > -1){
				var key = txt.substring(txt.indexOf("NAVMESG::::") + 11,txt.indexOf("::::NAVMESG"));
				renderingUtils.showCustomAlert(I18n.getMsg(key,I18n.getMsg(singularModule)));
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if (txt.indexOf("INVALIDTICKET:::") > -1){
				commonUtils.showHideLoadingDiv();
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.portal.zsckeyisregenerated.admin"));
				return true;
			}
			else if(txt.indexOf("Cannot_Create_Anymore_Projects") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.limit.projectcreation"));
				//$("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("Portal_owner_changed") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.portalownerchanged"));
				// $("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("Insufficient_Privileges_Project") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.noproceed.insuff.projects"));
				// $("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("Not_A_User_In_Projects") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.noproceed.notinprojects"));
				//$("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("No_Permission_For_User_Profile") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.noproceed.insuff.crm"));
				//$("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("NOPROJECTTOASSOCIATE") > -1){
			renderingUtils.showCustomAlert(I18n.getMsg("crm.project.noprojavailable"));
			//$("#ajax_load_tab").hide();
			commonUtils.showHideLoadingDiv();
			return true;
			}
			else if (txt.indexOf("NOPROJASSOCIATION:::") > -1){
				commonUtils.showHideLoadingDiv();
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.nomoretoassociate",""));
				//alert('No more project to association');
				return true;
			}
			else if (txt.indexOf("TWOCONTACTSWITHSAMEEMAIL") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.project.sameemail"));
				// $("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("SECURITY::::") > -1 || txt.indexOf("SECURITY_ERROR_403::::INSUFFICIENT") !== -1 || txt.indexOf("SECURITY_ERROR_403::::INSUFFICIENT_PRIVILEGES") !== -1){//No I18N
				var errorContent = txt.split("SECURITY::::");
				if(errorContent.length === 1){
					errorContent[1] = txt;
				}
	//			$(getObj(placeHolderDivId)).empty();
				$(placeHolderDivId).html(errorContent[1])
	//			getObj(placeHolderDivId).innerHTML = errorContent[1];
				// $("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("CRM_ERROR_PAGE_500::::EXCEPTION") > -1){
				if(url && (url.indexOf('CreateCommonModule') > -1 || url.indexOf('EditCommonModule') > -1)){
					if(txt.indexOf("MaxLenField") > -1 ){
						
						//message = "MaxLenField: You cannot enter more than" + paramMaxLen + "values for " + ResourceUtil.getResourceValueByKey(message,(Long) request.getAttribute("USERID_FROM_FILTER"));
						
						var message = txt.substring( txt.indexOf("MaxLenField") , txt.lastIndexOf("&#x3a;&#x3a;"));
						message = message.split("&#x3a;&#x3a;");
						message = message.splice(1,2);
						var msgToUpperCase = $("#Crm_" + module + "_" + message[1].toUpperCase().replace(/ /g,''));
						if(msgToUpperCase.data() )
						{
							message[1] = msgToUpperCase.data().displaylabel;
						}
						else
						{
							message[1] = I18n.getMsg(message[1],I18n.getMsg(moduleRecordMapping[module].singular_label));	
						}
						if(message.toString().indexOf('txtListPrice') > -1){
							message[1] =  I18n.getMsg('List Price');
						}else if(message.toString().indexOf('txtQty') > -1){
							message[1] =  I18n.getMsg('Qty');
						}else if(message.toString().indexOf('hdnTotal') > -1){
							message[1] =  I18n.getMsg('Amount');
						}else if(message.toString().indexOf('hdnDiscount') > -1 || message.toString().indexOf('hdnDiscPc') > -1){
							message[1] =  I18n.getMsg('Discount');
						}else if(message.toString().indexOf('hdnTax') > -1){
							message[1] =  I18n.getMsg('Tax');
						}else if(message.toString().indexOf('hdnNetTotal') > -1){
							message[1] =  I18n.getMsg('Total');
						}
						renderingUtils.showCustomAlert(I18n.getMsg("crm.iamexception.maxlen", message));
					}
					else if(!Crm.isHeadless && productDetails.isListPriceEmpty())
					{
						crmui.showMsgBand('error',I18n.getMsg("crm.label.alert.listprice", ""), 4000);
					}else if(Crm.userDetails.isStorageLimitReached) //Added storage error handling for edit and create record
					{
						Crm.showStorageExceedPopup(); 
					}else{
						renderingUtils.showCustomAlert(I18n.getMsg("crm.unable.to.process.request", ""));
					}
				}
				else{
	//				$(getObj(placeHolderDivId)).empty();
					var placeHolderId = $(placeHolderDivId);
					placeHolderId.html(txt)
	//				getObj(placeHolderDivId).innerHTML = txt;
					EvalInnerScript(placeHolderId);
					$L("#basic").scrollTo(0); //NO I18N
					//$.scrollTo('#basic');//No I18N
				}
				//$("#ajax_load_tab").hide();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("SECURITY::::") > -1){
				var errorContent = txt.split("SECURITY::::");
	//			$("#show").empty();
				$("#show").html(errorContent[1]);
	//			getObj("show").innerHTML = errorContent[1];
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("NOT UNIQUE:::") > -1){
				var errorContent = txt.split("NOT UNIQUE:::");
				$("#unique").html($ESAPI.encoder().encodeForHTML(errorContent)).show();
				commonUtils.showHideLoadingDiv();
				return true; 
			}
			else if(txt.indexOf("NOT UNIQUE ACCOUNT:::") > -1){
				var accObj = $('#Crm_' + module + '_ACCOUNTID');
				commonUtils.showErrorMsg(txt.split("NOT UNIQUE ACCOUNT:::"), accObj, module, fromCreatePopup);
				accObj.focus();
				commonUtils.showHideLoadingDiv();
				return true;
			}
			else if(txt.indexOf("UNAUTHORIZED TO ASSOCIATE ACCOUNT:::") > -1){
				var accObj = $('#Crm_' + module + '_ACCOUNTID');
				commonUtils.showErrorMsg(txt.split("UNAUTHORIZED TO ASSOCIATE ACCOUNT:::"),accObj, module, fromCreatePopup);
				accObj.focus();
				commonUtils.showHideLoadingDiv();
				return true; 
			}
			else if(txt.indexOf("Why does my session expire") > -1 || txt.indexOf("Affordable for Medium Business") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg("crm.reauth.login.expired",I18n.getMsg(singularModule)));
				document.location.href = Crm.getCrmBasePath() + "/ShowHomePage.do";
				return true;
			}
			else if ( txt.indexOf("CRM_ERROR_PAGE_500::::EXCEPTION") > -1) {
				return true;
			} 
			else if(["crm.zsurvey.error.create.survey.campaign.brandchange", "crm.zsurvey.error.invalid.survey.type", "crm.zsurvey.error.create.new.survey"].contains(txt)){
				crmui.showMsgBand('error', I18n.getMsg('crm.zsurvey.error.create.survey.campaign.brandchange',Crm.integrationsAppName.ZOHO_SURVEY), 3000); // No I18N
				return true;
			}
			else if(txt.indexOf("SHOW_RECURRING_ERROR_ALERT") > -1){
				renderingUtils.showCustomAlert(I18n.getMsg('crm.event.no.create'));// NO OUTPUTENCODING
				return true;
			}
		}
	}
	return false;
}

	/**
	 * This method is used to get the Phone numbers after removing the formatting ie, special characters and white spaces. 
	 * @param {String} textValue - This is the phone number with formattting.
	 * @returns	{String} - It returns the plain phone number after removing the formatting
	 * @example
	 * commonUtils.getPlainPhoneNo("(123) 456-7890")
	 * =>  "1234567890"
	 */
commonUtils.getPlainPhoneNo = function(textValue){
	var trimmed = textValue.trim();
	var phLen = trimmed.length;
	var actVal = "";
	if(phLen < 0){
		return actVal;
	}
	else{
		var re = /^\d+(,(\d)+)*(\.\d{1,2})*$/;
		if(!re.test(trimmed)){
			if(phLen === 14){
				// check whether it is in (123) 456-7890 format 1-(, 5-), 6- , 10--
				if(trimmed.startsWith('(') && trimmed.indexOf('-') && trimmed.indexOf(')') && trimmed.indexOf(" ") ){
					actVal = trimmed;
					// Check for 4th, 5th & 9th char
					var fourth = trimmed.indexOf(')');
					var fifth = trimmed.indexOf(" ");
					var ninth = trimmed.indexOf('-');
					if(fourth === 4 && fifth === 5 && ninth === 9){
						trimmed = trimmed.replace(' ','')
							trimmed = trimmed.replace('(','');
									trimmed = trimmed.replace(')','');
									trimmed = trimmed.replace('-','');
									if(trimmed.length === 10){
										var chkIt = trimmed.replace(' ','').replace('(','').replace(')','').replace('-','');
										if(chkIt.length < 10){
											return actVal;
										}
										return trimmed;
									}
									else{
										return actVal;
									}
					}
					else{
						return actVal;
					}
				}
				else{
					return trimmed;
				}
			}
			else if(phLen === 12){
				var chkSpace = trimmed.indexOf(" ");
				if(chkSpace !== -1){
					return trimmed;
				}
				// check whether it is in (12345)-6789 format
				if(trimmed.startsWith('(') && trimmed.indexOf(')') && trimmed.indexOf('-') ){
					actVal = trimmed;
					// Check for 6th & 7th char
					var sixth = trimmed.indexOf(')');
					var seventh = trimmed.indexOf('-');

					if(sixth === 6 && seventh === 7){
						trimmed = trimmed.replace('-','');
						trimmed = trimmed.replace('(','');
								trimmed = trimmed.replace(')','');

								if(trimmed.length === 9){
									var chkIt = trimmed.replace('-','').replace('(','').replace(')','');
									if(chkIt.length < 9){
										return actVal;
									}
									return trimmed;
								}
								else{
									return actVal;
								}
					}
					else{
						return actVal;
					}
				}
				else{
					return trimmed;
				}
			}
			else{
				return trimmed;
			}
		}
		else{
			return	trimmed;
		}
	}
}
	/**
	 * This method is used to get the formated phone number. 
	 * @param {String} textValue - This is the input phone number.
	 * @returns	{String} - It returns the formatted phone number
	 * @example
	 * commonUtils.getPlainPhoneNo("1234567890")
	 * =>  "(123) 456-7890"
	 */
commonUtils.getFormatPhoneNo = function(textValue){
	 var newVal = textValue.trim();
     if(Crm.userDetails.COUNTRY_LOCALE === "en_US"){
         if(newVal.match(/[0-9]/)){
             newVal = "(";
             if(textValue.length == 10){
                 newVal+=textValue.substring(0,3)+") "+textValue.substring(3,6)+"-"+textValue.substring(6,10);
             }
             else if(textValue.length == 9){
                 newVal+=textValue.substring(0,5)+")-"+textValue.substring(5,9);
             }
             else{
                 newVal = textValue;
             }
         }
     }
     return newVal;
}
	/**
	 * This method is used to compare two Numbers. Note that either two numbers has to be of type Number or String.
	 * @param {Number|String} startNum  - This provides a number that has to be compared with the other passed-in number.
	 * @param {Number|String} endNum - This provides the second argument which is to be compared.
	 * @returns {Boolean} It returns True if the startNum is less than the endNum and false if not
	 * @example 
	 * commonUtils.compareNumber(10.4356,13.8765	);
	 * => true 
	 */
commonUtils.compareNumber = function(startNum,endNum){//No I18n
    var result = true;
    if(startNum === endNum){
        result = false;
    }
    else if(parseInt(startNum) > parseInt(endNum)){
        result = false;
    }
    return result;
}

	/**
	 * This method is used to calculate the available character count in a particular HTMLElement which is usually used to set tooltip. It calculates the width of the HTMLElement and creates a new Element with provided value text compares both and returns the available amount of width.
	 * @param {HTMLElement} node - The HTMLElement whose width has to be compared.
	 * @param {String} value -  This provides the string that has to be inserted within the available width of the HTML Element
	 * @returns {Number} -  It returns the length of the acceptable number of characters.
	 */
commonUtils.calculateAcceptableCharCount = function(node, value){
    var divElem = document.createElement("div");
    var availWidth = $(node).width();
    divElem.innerText = value + "...";
    divElem.style.display = "none";	
    document.body.appendChild(divElem);// eslint-disable-line @zoho/zstandard/no-body-events
    var reqWidth = $(divElem).width(); // eslint-disable-line @zoho/webperf/layout-thrashing
    document.body.removeChild(divElem);	
    availWidth = !availWidth ? 200 : availWidth;
    if(availWidth > reqWidth) {
        return value.length;
    }
    while(availWidth < reqWidth){
        value = value.substring(0,value.length - 2);
        divElem.innerText = value + "...";
        divElem.style.display = "none";
        document.body.appendChild(divElem);// eslint-disable-line @zoho/zstandard/no-body-events
        reqWidth = $(divElem).outerWidth();// eslint-disable-line @zoho/webperf/layout-thrashing
        document.body.removeChild(divElem);// eslint-disable-line @zoho/webperf/layout-thrashing
    }
    return value.length;
}

    /**
     * This method is used to remove the white spaces where nodeType is of text and the white space includes /r /t /n /v /f . Note that it is an recursive method.
     * @param {HTMLElement} node - This provides the HTMLElement from which the white spaces of its child Nodes are to be removed.
     * @returns {HTMLElement} - It returns the whitespace free text nodeType
     */
commonUtils.cleanWhitespace = function(node){
	   
    for (var i = 0; i < node.childNodes.length; i++){ /*eslint-disable-line @zoho/zstandard/proper-usage-of-loop*/ /*eslint-disable-line @zoho/webperf/no-multipleDOMLookup*/
        var child = node.childNodes[i]; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
        if(child.nodeType === 3 && !/\S/.test(child.nodeValue)){
            node.removeChild(child);
            i--;
        }
        if(child.nodeType === 1){
            commonUtils.cleanWhitespace(child);
        }
    }
    return node;
}
	/**
     * This method is used to determine if the window and window.parent share the same origin 
	 * @returns {Object} - window.parent object if the origin matches else null is returned
     */
commonUtils.getParentWindow = function(){
    try{
        if(window.parent.origin==window.origin){
            return window.parent
        }
        else{
            return null
        }
    }
    catch(e){
      return null
    }
}

    /**
     * This method is used to destroy the text in the Canvas element there by making it as null 
	 * @returns {void}
     */
commonUtils.destroyCanvasElem = function(){
	commonUtils.getTextWidthUsingCanvas.canvasElem = null;
}

    /**
     * This method is used to get the text width using Canvas i.e , it does not hit the DOM to get the width of the text and this function even called recursively will not cause layout thrashing as it does not hit the DOM
     * @param {String} text - The text whose width is to be determined 
     * @param {Object} propObj - It provides the property of the text such as font-size etc..
     * @returns {Number} - It returns the width of param text with specified propObj or with default values
     */
commonUtils.getTextWidthUsingCanvas = function(text,propObj) {
    var canvasElemCxt, calcInjs, fSize;
	var rootElementStyle = getComputedStyle(document.querySelector(':root'));
    var canvasElem = commonUtils.getTextWidthUsingCanvas.canvasElem || (commonUtils.getTextWidthUsingCanvas.canvasElem = document.createElement("canvas"));
    canvasElemCxt = canvasElem.getContext("2d");//no i18n
    /*
    Handle the propObj properties below inside the if check
    */
   if(!propObj){
//   	calcInjs = 12.4 - -.25 * (renderingUtils.windowOuterWidth - 320) / 100;
   	canvasElemCxt.font = "16px " + rootElementStyle.getPropertyValue('--crm-font-regular'); // NO I18N
   }
   else{
	fSize = propObj.font.split(' ');
	var reg = /var\(--[a-zA-Z_-]+\)/g;
	if(fSize[0].match(reg)){
		var match = fSize[0].match(/--[a-zA-Z_-]+/g);
		fSize[0] = fSize[0].replace(reg,rootElementStyle.getPropertyValue(match[0])).trim();
	}
   	if(fSize[0].search("rem") !== -1){
   		//calcInjs = 12.4 - -.25 * (renderingUtils.windowOuterWidth - 320) / 100;
   		fSize[0] = fSize[0].split("rem")[0] * 16 + "px";
   	}
	if(fSize[1] && fSize[1].match(reg)){
		var matchFont = fSize[1].match(/--[a-zA-Z_-]+/g);
		fSize[1] = fSize[1].replace(reg,rootElementStyle.getPropertyValue(matchFont[0])).trim();
	}
	propObj.font = fSize.join(' ');
   	canvasElemCxt.font = propObj.font;
   }

   // returns the width of param text with Specified propObj or with default values
   return canvasElemCxt.measureText(text).width;
   }

    /**
     * This method is used to construct the custom lookup table
	 * <h3> Example </h3><br/>
	 * <img src="./images/openCustomLookup.png">
     * @param {String} url - This provides the api with which the request for the custom lookup table is initiated.
     * @param {Array|Object} params - This provides the query params for the url with which the request for the custom lookup table is initiated.
     * @param {String} divId - This provides the ID of the Element in which the custom lookup table has to be rendered.
     * @param {Number} width - This provides the width that has to be set to the popup according the window size. 
     * @param {Boolean} select - This provides a boolean,but is not in use
     * @param {Boolean} isNavig - This provides a boolean whether to enable the next or previous buttons 
     * @param {Event} ev - This provides a event to the method , to support selecting option in the lookup thorugh keyboard updown key.
     * @param {Boolean} fromzdesk - This is set to true if it is from desk 
     * @param {Function} afterOpened - This provides a callback which in invoked after opening the lookup.
     * @param {Boolean} fromSearchCreate - This is set to true if it is from searchCreate
	 * @returns {void} 
     */
commonUtils.openCustomLookup = function(url, params, divId, width, select, isNavig, ev,fromzdesk,afterOpened,fromSearchCreate, isRecursive){
	
	if(!isRecursive){
		Lyte.injectResources(networkUtils.returnDependencyFiles(["crm-quick-create-less.css"], ResourceConstants.CRMClient, ResourceConstants.LESSDEFAULT),undefined,function() { //no i18n
			commonUtils.openCustomLookup(url, params, divId, width, select, isNavig, ev,fromzdesk,afterOpened,fromSearchCreate, true);
		})
		return;
	}
	
	if(Crm.userDetails.CLIENT_ACCOUNT && params && params.searchmodule){
		var moduleInfo = Crm.moduleInfo ? Crm.moduleInfo[params.searchmodule] : undefined;
		if(moduleInfo){
			var moduleRecord = store.peekRecord('module',moduleInfo.Id); //No I18N
			if(!moduleRecord.fields){
				store.findAll('field',{module:moduleInfo.apiname}) //No I18N
			}
		}
	}
	commonUtils.showHideLoadingDiv(true);
	if(url.includes("/Search.do") || url.includes("/EditCompetitor.do") || url.includes("/ViewCompetitor.do") || url.includes("/ShowMultiValuesForAdd.do")){
		if(!params){
			params = {};
		}
		if(typeof params === "string"){
			if(params.indexOf(csrfParamName) === -1){
				params = params + "&" + csrfParamName + "=" + csrfToken;
			}
		}
		else{
			params[csrfParamName] = csrfToken;
		}
		if(url.includes("/EditCompetitor.do")){
		var detail_view=$L("crm-detailview-header")[0]
		var record=detail_view === undefined?$L("crm-detailview-canvas")[0].component.data.record:detail_view.component.data.record
		var permission=record.$sharing_permission;
		if((url.includes("/EditCompetitor.do")) && permission==="read_only"){
			renderingUtils.displayPermissionDenied();
			commonUtils.showHideLoadingDiv(false);
			return;
		}
		}
		
	}
	if(params && params.lookuprel && params.lookuprel === "true"){ 
        for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var val = params[key];
                    if(val === "true"){
                        val = true;
                    }else if(val === "false"){
                        val = false;
                    }
                    url += '&' + key + '=' + val;
                }
            }
        params = null;
	}
	var reqPool = new crmRequestPool();
	reqPool.initiate({
		"action"	:	url,//No I18n
		"type"		:	"POST",//No I18n
		"data"		:	params,//No I18n
		"success"	:	function(res){//No I18n
			if(res.showField_Not_Available_Popup){
				multiLookupsView.createLookupUpdateWarningPopup(I18n.getMsg("crm.label.error.field_not_available"),1,I18n.getMsg("crm.label.error.field_is_deleted",$ESAPI.encoder().encodeForHTML($('#'+res.fldName+'_label').text())), null,2,null,"POST");//no i18n
				commonUtils.showHideLoadingDiv();
				renderingUtils.freezeBackground();
				return;
				}
			var searchCreatePopup = $('#searchCreatePopup');
			var topBandPopup = $('#topBandPopup');
			var freezeBackGround = $('#freezeBackGround');
			var relatedListPopover = $('#relatedListCols');
			var qCreate = $('#qCreate');
            var qCreateVisible = qCreate.is(':visible');//No I18n
			var searchCreatePopupVisible = searchCreatePopup.is(':visible');//No I18n
			var relatedListPopoverStatus = relatedListPopover.is(':visible');//No i18N
			var sIlookupFieldAddNewVisible = $("#sIlookupFieldAddNew").is(":visible");//No I18n
//			var lookupAdvSearch = $('.lookupListTable');//No I18n
			var eventCreatePopup = $('.eventCreatePopup');//No I18n
//			var lookupAdvSearchVisible = lookupAdvSearch.is(':visible');//No I18n
//			var eventCreatePopupVisible = eventCreatePopup.is(':visible');//No I18n
			commonUtils.showHideLoadingDiv();
			var canvas= ( Lyte.Router.getRouteInstance() && Lyte.Router.getRouteInstance().routeName == 'canvas' ) ? true : false; //no i18n
			var subformBulkAdditionPopup=$L('crm-bulklookup-addition')[0];
			if(subformBulkAdditionPopup && subformBulkAdditionPopup.component.data.showCopy){
				topBandPopup.css('z-index',"");//no i18n
			}
			if (validationUtils.isJson(res) && typeof res !== 'object' && JSON.parse(res).error === "crm.campaign.integ.sandbox.not.supported") {
				crmui.showMsgBand("error",I18n.getMsg("crm.campaign.integ.sandbox.not.supported",crmTab.getDisplayName("Campaigns",false).toLowerCase()),3000);//NO OUTPUT ENCODING //No I18N
				return;
			}
			else if (validationUtils.isJson(res) && typeof res === 'object' && res.STATUS === "PARENT_RECORD_DELETED"){
				crmui.showMsgBand("error",I18n.getMsg("crm.record.perform.deleted.revoked"), 5000);//No I18N
				return;
			}
			var divObj = $('#' + divId);
			if(canvas){
				divObj.addClass('zc_nodarktheme');
			}else{
				divObj.removeClass('zc_nodarktheme');
			}
			var etTrendsWrapper = $('.etTrendsWrapper');
			var activityV2 = $('.ziaCallAnalyticswrapper').length;
			if((activityV2 || etTrendsWrapper.length) && divId === 'searchCreatePopup'){
//				$('.temp_freezelayer').css({zIndex:316})
				divObj.css("z-index","317"); //no i18n			
			}
			else if(divId === 'topBandPopup'){
				$('.temp_freezelayer').css({zIndex:315})
			}
			var divObjVisible = divObj.is(":visible");//No I18N
			if ($.isPlainObject(res)) {
				var lookupDissociateAllCall = false;
				if(res.lookupFilterNotSatisfied === false) {
					  crmui.showMsgBand("error",res.lookupFilterErrorMsg,"4000","");// no i18n
					  return;
				}
				let body = res.body;
				if(body){
				let bodylen=body.length;
				multiLookupsView.LinkingRecordIds = !multiLookupsView.LinkingRecordIds  ? {} : multiLookupsView.LinkingRecordIds;
				
				// multiLookupsView.LinkingRecordIds = {};
				for (let i = 0; i < bodylen; i++) {
					multiLookupsView.LinkingRecordIds[body[i].ENTITYID] = body[i].LINKINGMODULE_ID;
				}
				}
				if(res.scheduled == true){
					multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule,7);
					lookupDissociateAllCall = true;
				}
                if(res.unassignallscheduler_running){
                	if(res.islookup){
                		multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule, 17, null, res.unassignallscheduler_runningmsg,res.unassignallscheduler_runningtitle);
                	}else{
                		multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule, 13, null, res.unassignallscheduler_runningmsg);
                	}
                   return;
                }
                if(res.mxnconvertscheduler_running){
                	 multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule, 18, null, res.mxnconvertscheduler_runningmsg);
                     return;
                }
				if(res.clonescheduler_running){
					multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule, 11, null, res.clonescheduler_runningmsg);
					return;
				}
				if(res.isEditPermissionDenied==true && res.isconfirm==true){
					multiLookupsView.closeMLPopup(res.fldName);
					multiLookupsView.permissionIssueWarningShow(null,null,res.searchmodule,1);
					return;
				}
				var lookupDissociateCall = false;
				if(!multiLookupsView.multiLookups || !multiLookupsView.multiLookups[res.fldId]){
					lookupDissociateCall = true;
				}
                if(res.relid){
                    var param = {};
                    param.id = res.entityId;
                    
                    param.rid = res.relid;
                    
//                  var relData = canvas ? store.peekRecord('related_list',res.relid) : crmRelatedList.EachModuleData[res.relid];
					if(Crm.userDetails.isRelatedListLyteEnabled){
						var relData = store.peekRecord('related_list',res.relid);//No I18N
					}else{
					var relData = canvas ? store.peekRecord('related_list',res.relid) : crmRelatedList.EachModuleData[res.relid];
					}
                    var mainModuleObj = $L('#module')[0];
					var parentModule = relData.parentModule ? relData.parentModule : mainModuleObj ? mainModuleObj.value : Lyte.Globals.get('relatedList.module');
					if(res.parentModule){
                        parentModule = res.parentModule;
                    }
                    if(!lookupDissociateCall){
                    if(!parentModule || parentModule === '' || parentModule == 'null'){
                        multiLookupsView.multiLookups[res.fldId].parentModule = res.parentModule;
                    }
                    if(res && res.page){
                        multiLookupsView.multiLookups[res.fldId].page =  res.page;
                    }
                    if(!multiLookupsView.currentMultiLookup.isMandatory && ( !res.select || res.select !== 'true' || !res.body || res.body.length !== 0)){
                        multiLookupsView.multiLookups[res.fldId].variedLookupValues = null;
                        multiLookupsView.multiLookups[res.fldId] = null;
                    }
                    }
                    param.actModule = parentModule;
                    param.module = parentModule;
                    param.actId = res.entityId;
                    param.pname = relData.name;
					param.isSortRequest = false;
					Lyte.triggerEvent("relatedList",{  //no i18n
						"id" : res.relid, //no i18n
						"module" : Crm.userDetails.isRelatedListLyteEnabled ? relData.module.api_name : relData.module//no i18n
					 });					
					if(!Crm.userDetails.isRelatedListLyteEnabled){
					crmRelatedList.ajaxReq(param);
					}
                    if(param.isSortRequest === false  && !res.lookuprel){
						if(!Crm.userDetails.isRelatedListLyteEnabled){
							multiLookupsView.updateMXNFieldValue(undefined,param.rid,res.defaultvalue);
							}
                       var detailView = $("crm-detail-view");
                       if(detailView.length){
						   var mxNFieldEle=document.querySelector("[data-key="+'"'+"subvalue"+res.fldId+'"'+"]");//no i18n
						   var fieldObj = mxNFieldEle.getData("cxPropField"); //NO I18N
						   var mxnFieldArray = Customization.updateMXNFieldValuetoAPIFormat(res,fieldObj.api_name);
						   mxNFieldEle.setData('cxPropFieldArr',mxnFieldArray);//NO I18N
						   detailView[0].component.setData("ajax_edit_in_progress",false);
						   multiLookupsView.closeMLPopup(res.fldName);
					   }
                        var mxNFieldEle=document.querySelector("[data-key="+'"'+"subvalue"+res.fldId+' "'+"]");//no i18n
                        
                        if(canvas && mxNFieldEle){
//                        	mxNFieldEle.textContent=res.defaultvalue;//no i18n 
                        	var canvasComp = $L('crm-detailview-canvas')[0]; //NO I18N
                        	if(canvasComp){
                        		                        		var fieldObj = mxNFieldEle.getData("cxPropField"); //NO I18N
                        		var mxnFieldArray = Customization.updateMXNFieldValuetoAPIFormat(res,fieldObj.api_name);
								if(mxnFieldArray.length){
									var prevFieldLabel = fieldObj.api_name;
									var newfieldLabel = mxNFieldEle.getData('cxFieldLabel'); //NO I18N
									mxnFieldArray.forEach(function (fldArray) {
										if(newfieldLabel !== prevFieldLabel){
											fldArray[newfieldLabel] = fldArray[prevFieldLabel];
											delete fldArray.prevFieldLabel;
										}
									}) 
									var module = mxnFieldArray && mxnFieldArray[0] && mxnFieldArray[0][newfieldLabel] && mxnFieldArray[0][newfieldLabel].module;
									mxNFieldEle.setData('module',module); //NO I18N
								}								
                        		var viewComp = canvasComp.getData('originalRecord'); //NO I18N
                        		viewComp[fieldObj.api_name] = mxnFieldArray.reverse();
								multiLookupsView.closeMLPopup(res.fldName);
                        		canvasComp.component.setData("record",objectUtils.cloneObject(canvasComp.getData('originalRecord')));//No I18N

                        	}
                        }
                    }
                    // if( res.select && res.select == 'true' && res.body.length == 0){
                    //     multiLookupsView.openAddMorePopup(res.fldName);
                    // }
                    if( !lookupDissociateAllCall && res.successmsg){
                    crmui.showMsgBand("success",$ESAPI.encoder().encodeForHTML(res.successmsg),"2000","");// no i18n
                    }
                }
                else{
					if(multiLookupsView.multiLookups && multiLookupsView.multiLookups[res.fldName]){
						if(res && res.parentModule){
							multiLookupsView.multiLookups[res.fldName].parentModule =  res.parentModule;
						}
						if(res && res.page){
							multiLookupsView.multiLookups[res.fldName].page =  res.page;
						}
					}
					if(!Crm.userDetails.isRelatedListLyteEnabled){
					multiLookupsView.updateMXNFieldValue(res.fldName,undefined,res.defaultvalue);
					}else if(res.fldName && res.defaultvalue){
						Lyte.registeredMixins["crm-related-list-utils"].updateMXNlookupFieldValue( undefined, undefined, undefined, res.fldName , res.defaultvalue);//No I18N
					}
					var mxnEntityDiv = $('#mxnEntityLookupdiv');	 
					var existingFldElem = $('#popupClose');	
					if(searchCreatePopupVisible && (res.fromSearchCreate && (res.fromSearchCreate == "true" || res.fromSearchCreate == true )  || fromSearchCreate)){
						// freezeBackGround.addClass('zindex248').css("z-index","251");// No I18N
						var existingSamePopup = true;
						if(mxnEntityDiv){	
							if(existingFldElem){
								var existingFld = existingFldElem.attr('href'); //no i18n
								if(existingFld && existingFld.indexOf("javascript:multiLookupsView.closeMLPopup(") > -1){
									existingFld = existingFld.replace("javascript:multiLookupsView.closeMLPopup('","").replace("');","");
									if(existingFld !== res.fldName && multiLookupsView.multiLookups[existingFld] && multiLookupsView.multiLookups[existingFld].lookuprel){
										existingSamePopup = false;
									}
								}
							}
						}
						if(!existingSamePopup){
							multiLookupsView.multiLookups[existingFld].currentDom = topBandPopup.html();
							var style = topBandPopup.attr('style');//no i18n
							multiLookupsView.multiLookups[existingFld].currentDomstyle = style;
							var html = multiLookupsView.callMultiLookupPopup(res);
							divObj.html(html);//NO OUTPUTENCODING
						}
						// topBandPopup.css("z-index","252");//no i18n

					}
					if(qCreateVisible){
						// freezeBackGround.removeClass('zindex250').css("z-index","250");// No I18N
						var existingSamePopup = true;
						if(mxnEntityDiv){
							if(existingFldElem){
								var existingFld = existingFldElem.attr('href'); //no i18n
									if(existingFld && existingFld.indexOf("javascript:multiLookupsView.closeMLPopup(") > -1){
										existingFld = existingFld.replace("javascript:multiLookupsView.closeMLPopup('","").replace("');","");
										if(existingFld !== res.fldName && multiLookupsView.multiLookups[existingFld] && multiLookupsView.multiLookups[existingFld].lookuprel){
											existingSamePopup = false;
										}
									}
							}
						}
						if(!existingSamePopup){
							multiLookupsView.multiLookups[existingFld].currentDom = topBandPopup.html();
							var style = topBandPopup.attr('style');//no i18n
							multiLookupsView.multiLookups[existingFld].currentDomstyle = style;
							var html = multiLookupsView.callMultiLookupPopup(res);
							divObj.html(html);//NO OUTPUTENCODING
						}
						// topBandPopup.css("z-index","252");//no i18n
						// if(searchCreatePopupVisible){
						// 	freezeBackGround.removeClass('zindex250').css("z-index","251");// No I18N
						// }
					}
					crmui.modalZIndex('nonLyte',divObj[0],'open');  //No I18N
				}
                if(res.body === "{}"){
                    if(lookupDissociateCall){
                        topBandPopup.css("z-index", '');// No I18N
                        hideAnimatePopup('deletepopup', false); //no i18n
                        multiLookupsView.fieldStatusUpdate(res.fldName);
                    }
                    else if(!multiLookupsView.currentMultiLookup.isMandatory){
                        multiLookupsView.closeMLPopup(res.fldName);
                    }
                    return;
                }
				var html = '';
				freezeBackGround.removeClass('zindex250');
				if(res.isPartialLoad){
					multiLookupsView.partialCallBodyMultiLookupPopup(res);
                }
                else{	
					if(!multiLookupsView.currentMultiLookup || !multiLookupsView.currentMultiLookup.isMandatory){
                        html = multiLookupsView.callMultiLookupPopup(res);
                        divObj.html(html);//NO OUTPUTENCODING
						width = renderingUtils.windowWidth - 400;
                        divObj.width(width);
                        divObj.find('.pp-footer').removeClass('box-sh');
                        var sel = $('.mlSelectedRecord');
						var countTr = sel.text();
						var removeAll = $('#removeAllBtn');
						var selectedRec = $('#selected-records');
    					if((res.select === "true" || res.select === true) && res.selectedCount > 0){
    						removeAll.css({'visibility' : 'hidden' , 'display' : 'none'});//No I18N
    						var Amor =  document.getElementsByName("AddMore")[0];
    	            		Amor.setAttribute("style","display:none;visibility:hidden");
    	            		sel.text(res.selectedCount);
    	            		selectedRec.css('visibility','visible');//No I18N
    					}
    					if(res.select === "false" || res.select === false){
    					if(countTr !== '' && countTr > 0){
                            $('#nextStep').prop("disabled", false);
                            $('.animateMl').css('visibility','hidden').addClass('cvTableAct');
                            selectedRec.css('visibility','visible');//No I18N
							//$('#removeBtn').prop("disabled", false);
							//$('#removeBtn').removeClass("cBoth");
						}
                        else{
                            $('#nextStep').prop("disabled", true);
                            $('.animateMl').css('visibility','visible').removeClass('cvTableAct');
                            selectedRec.css('visibility','hidden');//No I18N
							//$('#removeBtn').prop("disabled", true);
							//$('#removeBtn').removeClass("cBoth");
						}
					}
						if( res.select && res.select == 'true' && res.body.length === 0){
							removeAll.css('visibility', 'hidden');//No I18N
						}
						if($('#mxnlistViewTable tbody').find('.customCheckBox').length > 0){// eslint-disable-line @zoho/webperf/no-complex-selector
                            $("#mxnlistViewTable #checkAll").attr("class","customCheckBox");
                        }
                        else{
                            $("#mxnlistViewTable #checkAll").attr("class","customCheckBoxChecked");// eslint-disable-line @zoho/webperf/directly-select-with-id
						}
						multiLookupsView.mlSearchCloseIcon(".mlSearch");
						if(ev){
						$(ev.target).filter("input[type=button]").prop('disabled',false);// eslint-disable-line @zoho/webperf/no-attribute-selectors
						}if(multiLookupsView.currentMultiLookup.associatedRecordLabel){
							if(!Crm.userDetails.isRelatedListLyteEnabled){
							var refreshparams = {};
							}
                            if(searchModuleLabel == undefined && res){
                                //searchModuleLabel = res.modulesingularlabel;
                            	searchModuleLabel = Crm.moduleInfo[res.module].translatedSingularLabel;
                            }
							if(res && res.entityId && res.refreshid){ 
								if(Crm.userDetails.isRelatedListLyteEnabled){
									Lyte.triggerEvent("relatedList",{  //no i18n
										id : res.refreshid 
								 	});
								}else{
							refreshparams.id = res.entityId;
							refreshparams.rid = res.refreshid;
							var relData = crmRelatedList.EachModuleData[res.refreshid];
							if(relData){
							var parentModule = relData.parentModule;
							refreshparams.pname = relData.name;
							}
							refreshparams.actModule = parentModule;
							refreshparams.module = parentModule;
							refreshparams.actId = res.entityId;
							refreshparams.isSortRequest = false;
							crmRelatedList.ajaxReq(refreshparams);
								}
							crmui.showMsgBand("success",I18n.getMsg("crm.mxnlookup.lookuprel.mandatory.quickcreate",[searchModuleLabel, $ESAPI.encoder().encodeForHTML(multiLookupsView.currentMultiLookup.associatedRecordLabel)]),3000);//no i18n
							delete multiLookupsView.currentMultiLookup.associatedRecordLabel
							}
    					}
    				}
					else if(res && res.fldName && res.fldName.indexOf('_') === -1){
    						html = multiLookupsView.callMultiLookupPopup(res);
    						//multiLookupsView.currentMultiLookup=multiLookupsView.multiLookups[res.fldName];
    						divObj.html(html);//NO OUTPUTENCODING
    						width = renderingUtils.windowWidth - 400;
    						divObj.width(width);
    						divObj.find('.pp-footer').removeClass('box-sh');
    						var searchModuleLabel = moduleRecordMapping[res.searchmodule].singular_label.toLowerCase();
    						if(Crm.userDetails.isRelatedListLyteEnabled){
    							Lyte.triggerEvent("relatedList",{  //no i18n
    								module : res.parentModule 
    						 	});
    						}else{
    						var param = {};
    						param.id = res.entityId;
    						var relData = crmRelatedList.EachModuleData[res.fldName];
    						param.rid = res.fldName;
    						param.actModule = res.parentModule;
    						param.module = res.parentModule;
    						param.actId = res.entityId;
    						//param.action = "getData";
    						if(relData ){
    							param.pname = relData.name;
    						}
						
						param.isSortRequest = false;
						
						crmRelatedList.ajaxReq(param);
    						}
						if(res.page == "addmore"){//no i18n
							crmui.showMsgBand("success",I18n.getMsg("crm.mxnlookup.lookuprel.mandatory.quickcreate",[searchModuleLabel,multiLookupsView.currentMultiLookup.associatedRecordLabel ? $ESAPI.encoder().encodeForHTML(multiLookupsView.currentMultiLookup.associatedRecordLabel) : '']),3000);//no i18n
						}
					}
					if(multiLookupsView.currentMultiLookup){
						multiLookupsView.currentMultiLookup.isMandatory = false;
					}
					
					if(!res.relid && res.select && res.select == 'true' && res.body.length === 0 && Crm.userDetails.permissions["Crm_Implied_Create_"+res.linkingmodule]){
						multiLookupsView.openAddMorePopup(res.fldName);
					}	
				}
            }
            else{
//				if($("#createEditCallDiv").is(':visible')){
//					freezeBackGround.addClass('zindex250');
//					topBandPopup.css("z-index","300");// No I18N
//				}
//				else
					if($('#subSecondaryPopup').css('display') === 'block'){
					freezeBackGround.addClass('zindex248');
					topBandPopup.css("z-index","300");// No I18N
				}
				
				if(fromzdesk && fromzdesk !== 'null'){
					deskInteg.editPotentialLookUp(divObj,res);
                }
                else{
					//Adding the Freeze Layer for the popups opened from the Sales Signals Quick Create Items
                	if (!Crm.isHeadless ) { 
						if( typeof crmNTC !== "undefined" ) {
							if( crmNTC.isSignalDetailViewVisible() ) {
								if( typeof crmNTCGlobal !== "undefined" ) {
									if( crmNTCGlobal ) {
										crmNTCGlobal.showFreezeLayerForSignals();
									}		
								}
							}
						}
					}
					divObj.html(res);//NO OUTPUTENCODING
				}
			}
//			if(searchCreatePopupVisible && fromSearchCreate){
//				freezeBackGround.removeClass('zindex250').css("z-index","251");// No I18N
//				if( $.isPlainObject(res)){
//					topBandPopup.css("z-index","252");// No I18N
//				}
//			}
			
			// if(qCreateVisible){
				// if(Crm.userDetails.isLookupAdvancedSearchEnabled){
				// 	freezeBackGround.removeClass('zindex250').css("z-index","250");// No I18N
				// }							
				// if(!(sIlookupFieldAddNewVisible && divId === "lookupPopup"))
				// {
				// 	topBandPopup.css("z-index","252");// No I18N
				// }
				
				// if(searchCreatePopupVisible){
				// 	freezeBackGround.removeClass('zindex250').css("z-index","251");// No I18N
				// }
			// }
			
			if(($.trim($('#diNotificationDiv').html()).length || activityV2) && (etTrendsWrapper.length || activityV2)){
				topBandPopup.css("z-index","316");// No I18N
			}
			if(!divObjVisible)
			{
                if(width)
                {
                    divObj.width(width);
                }
                showAnimatePopup(divId,function(){
                     //This code has been written to support selecting option in the lookup thorugh keyboard updown key.   
                    if(divId === "topBandPopup"){
                        divObj.on("keydown",function(ev){//no i18n
                            var currentActElem = document.activeElement;
                            var currentElementObj = $(currentActElem).closest("tr");
                            var trHover = $("tr.bg_crmSelectBg");
                            if(currentActElem.id.indexOf("radio_") !== -1){
                                if(trHover.length > 0){
                                    currentActElem = trHover.find("input");
                                }
                                if(ev.keyCode == 40){
                                	currentElementObj.next().attr("class","bg_crmSelectBg");//no i18n
                                    ev.preventDefault();
                                }
                                else if(ev.keyCode == 38){
                                    var prvEle = currentElementObj.prev();
                                    if(prvEle.find("input").length > 0){
                                        prvEle.attr("class","bg_crmSelectBg");//no i18n
                                    }
                                    ev.preventDefault();
                                }
                                else if(ev.keyCode == 32){
                                    renderingUtils.triggerEvent('click',currentActElem);//no i18n
                                    ev.preventDefault();
                                }
                                currentElementObj.removeClass("bg_crmSelectBg");
                            }
                        })
                        crmLayout.Resize.PopupHeightResize();
                    }
                    if(divId === 'searchCreatePopup'){ //No i18N
                        searchCreatePopup.find('.popup-model-footer').removeClass('scroll-sh');
                        crmLayout.Resize.PopupHeightResize();
                    }
                });

				 // to bind table mixin and trap focus
				 var topBandPopupContainer =  $L('#topBandPopup');
				 var topBandPopupContainerTable = topBandPopupContainer.find('table.newtable');
					
					
					if(topBandPopupContainerTable[0]){
						topBandPopupContainer.trapFocus("destroy"); //NO I18N
					topBandPopupContainerTable[0].setAttribute('cx-prop-aria',"true")
					}
 
				 //$L('#topBandPopup').trapFocus();
				 if(topBandPopupContainer.length > 0){
					 topBandPopupContainer.trapFocus({focusTarget : '.setupsearch'}); //NO I18N
				 }
				 if(Crm.userDetails.isAccessibilityConfigSupported){
					 // to bind table mixin to home page
					 
					 topBandPopupContainer.bindAria = Lyte.registeredMixins['crux-aria-table-mixin'].bindEventForAria.bind(topBandPopupContainer[0]); //NO I18N
					 topBandPopupContainer.bindAria();
				 }  

				 
                // var lookupListTable = $('.lookupListTable');//eslint-disable-next-line @zoho/webperf/layout-thrashing
            	// var lookupListTableVisible = lookupListTable.is(':visible');//No I18n
            	// if(lookupListTableVisible){//eslint-disable-next-line @zoho/webperf/layout-thrashing
            	// 	var curindex = parseInt(lookupListTable.css('z-index'))//No I18n
            	// 	searchCreatePopup.css('z-index', curindex + 2);//No I18n
            	// 	freezeBackGround.css('z-index', curindex + 1);//No I18n
            	// 	if(activityV2){
				// 		freezeBackGround.css('z-index', 316);//No I18n
				// 		searchCreatePopup.css('z-index', 317);//No I18n
				// 	}
            	// }
                if(Crm.isFromSalesInbox){
//                	var eventCreatePopup = $('#eventCreatePopup');
//                	if(eventCreatePopup){
//                		searchCreatePopup.addClass('zi261');
//                	}
                	
                	if(qCreate[0].childElementCount > 0 && Crm.isFromSalesInbox){
                        $('.freezeLayer').attr('style', 'z-index : 35 !important');
                    }
                }
            }
            else {
                var _campStatusDD = $('#camp_status');
                if(_campStatusDD && _campStatusDD.length){
                    thirdPartyUtils.bindSelect2(_campStatusDD);
                }
            }
        //we have to set the timeout as there is some time delay for writing the pop elements in the dom. 
			
//			if(searchCreatePopupVisible){
				setTimeout( function () {
					searchCreatePopupVisible = searchCreatePopup.is(':visible');//No I18n
					if(!searchCreatePopupVisible){
						$('#fldValue').focus();
						var searchDom = $('[name=fldValue]');//eslint-disable-line @zoho/webperf/no-attribute-selectors
						var searchVal = searchDom.val();//Manually forcing to set on fldValue (Search elements name in every popup)
						searchDom.focus().val('').val(searchVal);
					}else if(searchCreatePopupVisible && qCreateVisible && Crm.isFromSalesInbox){
						searchCreatePopup.css('z-index', '40');//No I18n
					}
					if(searchCreatePopupVisible && $L('#feedParentDiv').is(':visible')){//eslint-disable-line @zoho/webperf/layout-thrashing
						searchCreatePopup.css('z-index', '');//No I18n
					}
				} ,100);
//			}
			if(relatedListPopoverStatus) {
				relatedListPopover.css('display', 'none'); //No i18N
			}
			if(searchCreatePopupVisible && res.fromSearchCreate){
				setTimeout(function(){
					var searchDom = $('[data-zcqa=mxnsearchString]');//eslint-disable-line @zoho/webperf/no-attribute-selectors
					var searchVal = searchDom.val();
					searchDom.focus().val('').val(searchVal);
				},100);
			}
			
			if(typeof afterOpened === "function")
			{
				afterOpened();
			}
			if(Lyte.registeredMixins['crm-canvas-form-design-config-mixin'] && Lyte.registeredMixins['crm-canvas-form-design-config-mixin'].isRightSideModalOpened()){
				$('#btn_SaveAndAssociate')[0].onclick = function(){handleQuickCreatePopup(module, 'null', 'true', 'null')}; //No i18N
				$('#btn_Save.primarybtn')[0].removeAttribute("onclick");
			}
		},
		"error"   	:	function(error){//No I18N
			commonUtils.showHideLoadingDiv();
			if(Lyte.Router.getRouteInstance().transition.info.route === "crm.tab.module.entity.canvas"){
				// canvas ajax popover enabling 
				var comp = $(".zc_ajax_pop_wrapper").eq(0);
				comp.removeClass("dNImp");
				// To close quickCreate dropdown
				if(typeof afterOpened === "function")
				{
					afterOpened(true);
				}
			}
			if(error.status === 555 && error.responseText){
				renderingUtils.showCustomAlert(error.responseText);
				if(isNavig){
					var navigNext = $('#navig_next');
					var className = navigNext.hasClass('vaM') ? 'nextDisabled vaM' : 'nextDisabled' ;//No I18n
					navigNext.after('<img hspace="2" src='+networkUtils.getImageUrl("spacer.gif",ResourceConstants.CRM)+'" class="' + className + '" align="middle">');
					navigNext.remove();
				}
			}
			else if(error.status === 558 && error.responseText) {
				crmui.showMsgBand('warning', error.responseText, 10000) //No I18N
			}
			else if(error.status !== crmConstants.errorStatusCode){
				renderingUtils.showCustomAlert("Unable to process request");//No I18N
			}
            else if(error.status === crmConstants.errorStatusCode){
                $L(window).scrollTo({'top':0});//NO I18N
            }
		}
	});
} 

    /**
     * This method is used to format the passed-in decimal number with provided number of decimal places.
     * @param {Number} value - This provides the decimal number which has to be formatted.
     * @param {Number} decimalDigits - This provides the number of decimal places that are to be precisely set.
     * @param {Boolean} withoutComma - It is set to True if the returning decimal value has to be seperated by comma. 
     * @returns {Number} - It returns the new decimal number with the provided number of decimal digits with or without comma.
	 * @example
	 * commonUtils.formatDecimalValue(123454.43263,3,true)
	 * => "123454.433"
	 * commonUtils.formatDecimalValue(123454.43263,4,false)
	 * => "123,454.4326"
     */
commonUtils.formatDecimalValue = function(value,decimalDigits,withoutComma){
    var decimal_base = typeof decimalDigits !== 'undefined' ? decimalDigits : 0;//no i18n
    var floatvalue = parseFloat(value);
    var len = (parseInt(floatvalue + "") + "").length;
    var newVal =  parseFloat(value).toPrecision(len + decimal_base);
    if(newVal && newVal.indexOf('e') !== -1)
    {
    	newVal = parseFloat(value).toPrecision(len + decimal_base + 2);
    }
    return withoutComma === true ? newVal : currencyUtils.getNumberWithCommas(newVal,",",".");
}

/***** JSLogger *****/
    
    /**
     * This method is used to enable the error logging tool Murphy which at first installs murphy and starts logging the errors 
	 * @returns {void}
     */
commonUtils.enableErrorLogging = function() {
		//moved install to resourceinclude jsp
		
		murphy.setTags( function () {
		var machineInfo = cookieUtils.getCookie('ZCRM_QA_AUTOMATION_MACHINEINFO');//NO I18N
		var count = machineInfo ? parseInt(machineInfo.split(":")[1]) ? parseInt(machineInfo.split(":")[1]) : null  : null;
		return {
				jsVersion:crmConstants.staticVersion.replace("v",""),//NO I18N
				buildId:crmConstants.buildId,
				zuid : Crm.userDetails.ZUID,
				zgid : Crm.userDetails.ZGID,
				screen : Crm.userDetails.screen,
				viewPort : Crm.userDetails.viewPort,
				lastRefresh : Crm.userDetails.lastRefresh,
				automation_id : cookieUtils.getCookie('ZCRM_QA_AUTOMATION_ID'),//NO I18N
				automation_case_id : cookieUtils.getCookie('ZCRM_QA_AUTOMATION_CASE_ID'),//NO I18N
				automation_case_info : machineInfo,
				aalam_case_url_key : cookieUtils.getCookie('CaseInfo'), //NO I18N
				case_rerun_count : count,
				userAgent : navigator.userAgent,
				releaseDetails : {
					releaseName      : crmConstants.buildName,
                    releaseRevision : crmConstants.buildChangeset
				}
		}},true);
	
		Lyte.addEventListener("error",function(e){ 
			 commonUtils.murphyLyteErrorHandler.proccessError(e);
		});
	murphy.beforeTrack(function(e) {
	    if(e.category === "xhr") {
	       if( e.data.url.includes("tracking") || e.data.url.includes("spotlight")) {
	            return undefined;
	        }
	        return e;
	    }
		
	    return e;
	})
	window.addEventListener('offline', function() { 
			
			murphy.addCustomTracking({  
				message : "User went offline",//No I18N
				name : "Network Status",//No I18N
				type : 'custom event'//No I18N
			});
		});
		
		window.addEventListener('online', function() { 
				
				murphy.addCustomTracking({  
					message : "User Back online",//No I18N
					name : "Network Status",//No I18N
					type : 'custom event'//No I18N
				});
			});
		
		document.createElement = function(create) {
			return function() {
				var ret = create.apply(this, arguments); /* eslint-disable-line @zoho/zstandard/no-reserved-words */
				if (ret.tagName.toLowerCase() === "script" || ret.tagName.toLowerCase() === "link") {
					ret.setAttribute("X-MURPHY-LOAD-START",Date.now())
					ret.addEventListener("error", function(){
								var loadFile = this.getAttribute('src') || this.getAttribute('href');
			                    loadFile = loadFile.includes("https") ? loadFile : "https:" + loadFile;//NO I18N
								  murphy.addCustomTracking({  
										type: 'http', //NO I18N
					                    category: 'xhr',//NO I18N
		                                data : {
		                                    method : this.tagName.toLowerCase(),
		                                    url : loadFile,
		                                    startimestamp : this.getAttribute("X-MURPHY-LOAD-START"),
		                                    timeTaken : Date.now() - this.getAttribute("X-MURPHY-LOAD-START"),
		                                    status_code : 404
		                                }
									});
					});
				} 
				return ret;
			};
		}(document.createElement);
}

commonUtils.murphyClientmetricsInstallation = function (lyteHooktimeTaken, lyteHookTransObj) {
    if (murphy && murphy.clientmetrics && murphy.clientmetrics.isClientMetricsInstalled()) {
        return;
    }
    crmConstants.isLoadCompleted = true;
    let deploymentLocation = RebrandLinkUtil.getProperty("DeploymentLocation");
    let clientMetricsEnabledDcs = ["US", "IN", "EU", "CA", "JP", "SA", "AU"];   //No I18N
    let isNotLocalzohoDomain = (window.location.hostname).indexOf('localzoho.com') === -1;
    let isClientMetricsEnabledZgid = crmConstants.isClientMetricsEnabledZgid;
    let isClientMetricsLZEnabled = crmConstants.isClientMetricsLZEnabled;
    //eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
    if (isClientMetricsLZEnabled || (isNotLocalzohoDomain && ((Crm.env && !Crm.env.isDevelopment)) && ((clientMetricsEnabledDcs.includes(deploymentLocation)) || isClientMetricsEnabledZgid))) {
		let urlSplit = (lyteHookTransObj && lyteHookTransObj.url) ? (lyteHookTransObj.url+"").split("/") : [];
		let urlIndex = urlSplit.findIndex((e) => { return e === "tab" || e === "settings"}); //NO I18N
		let moduleName = urlIndex > -1 ? urlSplit[urlIndex+1] : "";  //collect moduleName from url
		moduleName = moduleName && moduleName.includes("?") ? moduleName.split("?")[0] : moduleName;
		let afterRenderTime = crmConstants.clientmetrics ? crmConstants.clientmetrics.lyteHookAfterRender : 0;
        murphy.clientmetrics.setCustomTags(
            {
                "zuid": Crm.userDetails.ZUID, //No I18N
                "zgid": Crm.userDetails.ZGID, //No I18N
                "buildId": crmConstants.buildId, //NO I18N
                "automation_id": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_ID'), //NO I18N
                "automation_case_id": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_CASE_ID'), //NO I18N
                "automation_case_info": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_MACHINEINFO'), //NO I18N
                "lyteHookTime": lyteHooktimeTaken, //NO I18N
                "routeName": lyteHookTransObj.target, //NO I18N
                "routeState": lyteHookTransObj.state,  //NO I18N
                "moduleName": moduleName, //NO I18N
                "lyteHookAfterRender" : afterRenderTime //NO I18N
            }
        );
        murphy.clientmetrics.setUserEnvInfo(
            {
                "releaseDetails": {  //No I18N
                    "buildId": crmConstants.buildId, //No I18N
                    "releaseName": crmConstants.buildName, //No I18N
                    "releaseRevision": crmConstants.buildChangeset //No I18N
                }
            }
        );
        let config = murphy.sendUserInfo();
        config.isMonitoringEnabled = crmConstants.isClientMetricsMonitoringEnabled;
        config.clientmetricsWorkerUrl = window.location.protocol + '//' + window.location.host + '/crm/javascript/murphy/clientmetrics/murphy_clientmetrics_worker.min.js';
        // config.initialLoadCdnUrl = networkUtils.returnDependencyFiles(["ui-transition-min.css"], ResourceConstants.CRM)[0];
        config.cdn_urls = networkUtils.returnDependencyFiles(["zohocrm_rightpanel_new.js"], ResourceConstants.CRM);  //No I18N
        config.custom_monitoring_urls = ["/Constants.do","/ModuleMeta.do"];  //No I18N
        murphy.clientmetrics.install(config);   //code to collect rum logs
        murphy.clientmetrics.setInteractivePoint(lyteHooktimeTaken);
    } else {
        murphy.clientmetrics.stopPerformaceObserver();
    }
}

commonUtils.murphyClientmetricsInstallationNew = function () {
	if (murphy && murphy.clientmetrics && murphy.clientmetrics.isClientMetricsInstalled()) {
		return;
	}
	let isNotLocalzohoDomain = (window.location.hostname).indexOf('localzoho.com') === -1;
	let isClientMetricsLZEnabled = crmConstants.isClientMetricsLZEnabled;
	//eslint-disable-next-line @zoho/zstandard/proper-usage-of-if
	if (isClientMetricsLZEnabled || (isNotLocalzohoDomain && (typeof Crm !== 'undefined' && Crm.env && !Crm.env.isDevelopment))) {
		murphy.clientmetrics.setCustomTags(
			{
				"zuid": Crm.userDetails.ZUID, //No I18N
				"zgid": Crm.userDetails.ZGID, //No I18N
				"buildId": crmConstants.buildId, //NO I18N
				"automation_id": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_ID'), //NO I18N
				"automation_case_id": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_CASE_ID'), //NO I18N
				"automation_case_info": cookieUtils.getCookie('ZCRM_QA_AUTOMATION_MACHINEINFO'), //NO I18N
				"user_edition": Crm.userDetails.EDITION_NAME //NO I18N
			}
		);
		murphy.clientmetrics.setUserEnvInfo(
			{
				"releaseDetails": {  //No I18N
					"buildId": crmConstants.buildId, //No I18N
					"releaseName": crmConstants.buildName, //No I18N
					"releaseRevision": crmConstants.buildChangeset //No I18N
				}
			}
		);
		let config = murphy.sendUserInfo();
		config.isMonitoringEnabled = crmConstants.isClientMetricsMonitoringEnabled;
		config.clientmetricsWorkerUrl = window.location.protocol + '//' + window.location.host + '/crm/javascript/murphy/murphy_clientmetrics_worker.min.js';
		config.initialLoadCdnUrl = networkUtils.returnDependencyFiles(["ui-transition-min.css"], ResourceConstants.CRM)[0];
		config.cdn_urls = networkUtils.returnDependencyFiles(["zohocrm_rightpanel_new.js"], ResourceConstants.CRM);  //No I18N
		config.custom_monitoring_urls = ["/Constants.do", "/ModuleMeta.do"];  //No I18N
		config.isTimeToInteractiveEnabled = true;
		config.isClientMetricsSoftNavigationEnabled = crmConstants.isClientMetricsSoftNavigationEnabled;
		config.isInterruptionMonitoringEnabled = true;
		config.isIdleInterruptionMonitoringEnabled = crmConstants.isMurphyIdleInterruptionMonitoringEnabled;
		config.isIndexDbEnabled = featuresAvailable.MURPHY_USER_ISSUE_REPORTING;
		config.isUserSlownessMonitoringEnabled = featuresAvailable.MURPHY_USER_ISSUE_REPORTING;
		murphy.clientmetrics.install(config);   //code to collect rum logs
	}
};

commonUtils.murphyClientmetricsTTI = function (lyteHooktimeTaken, lyteHookTransObj) {	
    if (murphy.clientmetrics && !murphy.clientmetrics.isClientMetricsInstalled()) {
        return;
    }

	let afterRenderTime = crmConstants.clientmetrics ? crmConstants.clientmetrics.lyteHookAfterRender : 0;
	if(crmConstants && crmConstants.clientmetrics && crmConstants.clientmetrics.pageLoadStoppedTime !== undefined && crmConstants.clientmetrics.pageLoadReStartedTime !== undefined) {
		let stoppedTime = parseFloat(crmConstants.clientmetrics.pageLoadStoppedTime);
		let againStartedTime = parseFloat(crmConstants.clientmetrics.pageLoadReStartedTime);
		if (!isNaN(stoppedTime) && !isNaN(againStartedTime)) {
		  let newLyteHookTime = stoppedTime + (lyteHooktimeTaken - againStartedTime);
		  lyteHooktimeTaken = newLyteHookTime;
		  if(afterRenderTime !== 0) {
			afterRenderTime = stoppedTime + (afterRenderTime - againStartedTime);
		  }
		}
		//delete to avoid corrupt
		delete crmConstants.clientmetrics.pageLoadStoppedTime;
		delete crmConstants.clientmetrics.pageLoadReStartedTime;
	}

    crmConstants.isLoadCompleted = true;
	let urlSplit = (lyteHookTransObj && lyteHookTransObj.url) ? (lyteHookTransObj.url + "").split("/") : [];
	let urlIndex = urlSplit.findIndex((e) => { return e === "tab" || e === "settings" }); //NO I18N
	let moduleName = urlIndex > -1 ? urlSplit[urlIndex + 1] : "";  //collect moduleName from url
	moduleName = moduleName && moduleName.includes("?") ? moduleName.split("?")[0] : moduleName;
	murphy.clientmetrics.setCustomTags(
	    {
	        "lyteHookTime": lyteHooktimeTaken, //NO I18N
	        "routeName": lyteHookTransObj.target, //NO I18N
	        "routeState": lyteHookTransObj.state,  //NO I18N
	        "moduleName": moduleName, //NO I18N
	        "lyteHookAfterRender": afterRenderTime //NO I18N
	    },
	    "update" //No I18N
	);
	murphy.clientmetrics.setTimeToInteractive();
};

commonUtils.murphyClientmetricsNavigationFailure = function (obj) {
	if (typeof obj !== 'undefined' && obj && obj.error) {
		try {
			let responseText = obj.error.responseText || obj.error.response || "{}";
			let response = {};
			try {
				response = JSON.parse(responseText);
			} catch (e) {
				return;
			}
			if (response.code === "NO_PERMISSION" || response.code === "INVALID_DATA") {
				return;
			}
			if (obj.error.responseText === undefined && obj.error.response === undefined) { //stopped because of error so handled here
				let transition;
				try {
					transition = JSON.parse(JSON.stringify(this));
				} catch (e) {
					return;
				}
				transition.state = 308;
				//murphy clientmetrics interactive time collect
				if (crmConstants && murphy && murphy.clientmetrics && murphy.clientmetrics.isClientMetricsInstalled() && transition) {
					if (!crmConstants.isLoadCompleted) {
						commonUtils.murphyClientmetricsTTI(performance.now(), transition);
					} else if (crmConstants.isLoadCompleted && crmConstants.murphySoftNavigationTrackStarted) {
						let afterRenderTime = crmConstants.clientmetrics ? crmConstants.clientmetrics.lyteHookAfterRender : 0;
						murphy.clientmetrics.setCustomTags({
							routeState: transition.state,
							lyteHookAfterRender: afterRenderTime
						}, "update"); //No i18N
						murphy.clientmetrics.endSoftNavigation();
						crmConstants.murphySoftNavigationTrackStarted = false;
					}
				}
			} else {
				this.isClientmetricsPushNeeded = true;
			}
		} catch (e) {
			if(murphy) {
				murphy.error(e);
			}
		}
	}
};

commonUtils.getModuleNameFromUrl = function (url) {
   let urlSplit = url ? (url+"").split("/") : [];
   let urlIndex = urlSplit.findIndex((e) => { return e === "tab" || e === "settings" }); //NO I18N
   let moduleName = urlIndex > -1 ? urlSplit[urlIndex + 1] : "";  //collect moduleName from url
   moduleName = moduleName && moduleName.includes("?") ? moduleName.split("?")[0] : moduleName;
   return moduleName;
};

commonUtils.updateClientmetricsFeatureKey = function (featureKey) {
    if (!(murphy && murphy.clientmetrics && murphy.clientmetrics.isClientMetricsInstalled())) {
        return;
    }
    if (featureKey === undefined || featureKey === null || featureKey === "") {
        return;
    }
    let updatedFeatureKey = featureKey.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // No I18N
    let customTags = murphy.clientmetrics.getCustomMetrics();
    let featureKeyCustomTag = (customTags && customTags.enabled_feature_keys) ? customTags.enabled_feature_keys : "";
    let featureKeyArray = featureKeyCustomTag ? featureKeyCustomTag.split(",") : [];
    if (!featureKeyArray.includes(updatedFeatureKey)) { //check if featureKey already exists
        featureKeyArray.push(updatedFeatureKey);
    }
    featureKeyCustomTag = featureKeyArray.join(",");
    murphy.clientmetrics.setCustomTags({ "enabled_feature_keys": featureKeyCustomTag }, "update"); // No I18N
};

commonUtils.setMurphyClientmetricsPageLoadReStartedTime = function() {
	if(crmConstants !== undefined) {
		crmConstants.clientmetrics = crmConstants.clientmetrics ? crmConstants.clientmetrics : {};
		crmConstants.clientmetrics.pageLoadReStartedTime = performance.now();
	}
};

commonUtils.setMurphyClientmetricsPageLoadStoppedTime = function() {
	if(crmConstants !== undefined) {
		crmConstants.clientmetrics = crmConstants.clientmetrics ? crmConstants.clientmetrics : {};
		crmConstants.clientmetrics.pageLoadStoppedTime = performance.now();
	}
};

/***** JSLogger *****/

    /**
     * This method is used to get the Filename with hash by giving the Original Filename. 
     * @param {String} Key - This provides the Original Filename i.e, the Filename without hash at the end
     * @param {String} resourceType - This provides the resource type i.e, whether it is default, CRMClient etc..
     * @returns {String} - It returns the filename with hash.  
	 * @example
	 * commonUtils.getfingerPrintProperties("lyte.js","CRMClient")
	 * => "lyte_0af4087_.js"
	 * commonUtils.getfingerPrintProperties("zcrm-lib1.js","default")
	 * => "zcrm-lib1_aea911c_.js"
     */
commonUtils.getfingerPrintProperties = function(Key,resourceType,fileType) {
	if(resourceType == undefined) {
		resourceType = "default";//NO I18N
	}
	if(!fileType){
		fileType = "javascript";//NO I18N
		if(Key.includes(".css")){
			var fileType = "css" //NO I18N
		}
	}
	if(FingerPrint.isEnabled && crmConstants.compression) {

		var md5 = objectUtils.getValueFromObj(FingerPrint.config_properties[resourceType][fileType],Key.split("/"));
		var value = [];
		var index = Key.endsWith('.d.ts') ? Key.lastIndexOf(".d.ts") : Key.lastIndexOf(".");
		//var len = Key.length;
		value.push(Key.substr(0,index));
		value.push(Key.substr(index))
		return	md5 ? value[0] + "_" + md5 + "_" + value[1] : Key;
	}
	return Key;
}

	/**
	 * This method is used to get the character code on keyPress based on the browser used. Certain browsers like IE doesn't support event.which for which event.keyCode is used.
	 * @param {Event} e - This provides the window event object from which the keyCode is taken.
	 * @returns {Number} - It returns the keyCode from the window's event object.
	 * @example
	 * commonUtils.getCharacterCode(Event);
	 * => (on key press alphabet 'a') => 97
	 */
commonUtils.getCharacterCode = function(e){
	var keyCode = e.which;
	return keyCode;
}



	/**
	 * This method is used to get the list of passed in object as an array.i.e, If compressed files are given as object, it will return those files as array
     * @param {Object} fileName - This provides the list of files to be downloaded as an object.
	 * @returns {Array} - It returns the list of filenames as an array in the same order as they are provided.
	 * @example 
	 * commonUtils.getArrayList([{parent : "zchart/d3.js", "child" : {"parent" : "zchart/zc.js", "child" : {"parent" : "zchart/world.js", "child" : "webformAnalytics.js"}}}])
	 * => ["zchart/d3.js", "zchart/zc.js", "zchart/world.js", "webformAnalytics.js"]
	 */
commonUtils.getArrayList = function(fileName){
	var arr, flag = 0;
	if(Array.isArray(fileName)){
		arr = fileName;
	}
	else{
		arr = [fileName];
		flag = 1;
	}
	var returnArray = [], objArray = [];
	var loopCount = 0;
	var arr_length = arr.length;
	for(var index = 0; index < arr_length; index++){
		if(typeof arr[index] === "object"){
			objArray.push(arr[index].parent);
			if(typeof arr[index].child !== "object" ){
				objArray.push(arr[index].child);
				returnArray[loopCount] = objArray;
				index = loopCount;
			}
			else{
				arr = [arr[index].child];
				index = -1;
			}
		}
		else{
			loopCount++;
			if(flag){
				returnArray[index] = fileName;
			}
			else{
				returnArray[index] = fileName[index];
			}
		}
	}
	return returnArray;
}

	/**
	 * This method is used to get the callbackcode method if crm is headless.
	 * @returns {void}
	 */
commonUtils.getHeadLessCallbackCode = function(){
	if(Crm.isHeadless){
		return Lyte.Router.getRouteInstance('crm').getQueryParams().callbackcode;
	}
return null;
}


	
	/**
	 * This method is used to replace the ',' seperated values as '[ comma ]'
	 * @param {String} fileName - This provides the list of filenames that are seperated by comma.
	 * @returns {String} - It returns the [ comma ] seperated filenames.
	 * @example 
	 * commonUtils.HandleCommaInFileName("zchart/d3.js, zchart/zc.js, zchart/world.js [comma] webformAnalytics.js");
	 * => "zchart/d3.js[comma] zchart/zc.js[comma] zchart/world.js [Comma] webformAnalytics.js"
	 */
commonUtils.HandleCommaInFileName = function(fileName){
	if(fileName.indexOf(",") > -1){
		if(!(fileName.indexOf("[comma]") > -1)){
			fileName = fileName.replace(/,/g,"[comma]");
		}else{
			fileName = fileName.replace(/\[comma\]/gi,"[Comma]");
		}
	}
	return fileName;
}

	/**
	 * This method is used to replace the special symbols in the string with escape characters.
	 * @param {String} elemID - This provides the string that contains special symbols which is to be replaced with the escape expression by preceeding with a '\'.
	 * @param {String} value - This provides the value that is to be replaced in the passed-in string. 
	 * @returns {String} - This returns the string without any special symbols.
	 * @example
	 * commonUtils.replaceSpSymbols("a+b","+")
	 * => "a\+b"
	 */
commonUtils.replaceSpSymbols = function(elemID,value){//No i18n
	if(value === "(" || value === ")" || value === "+"){
		elemID = elemID.replace(new RegExp("\\" + value,'g'),"\\" + value);	
	}
	else{
		elemID = elemID.replace(new RegExp(value,'g'),"\\" + value);
	}
	return elemID;
}


	/**
	 * This method is used to get the value from the jquery element 
	 * @param {jQueryElement} Jelem - This provides the jquery element whose value has to be returned.
	 * @returns {String} - It returns the value in the provided field element. i.e, Either value from text box, combo box,select-one ,radio or textarea etc..
	 */
commonUtils.getValue = function(Jelem){//No I18N
	var type = Jelem.prop("type");//No I18N
	var uiType = Jelem.data("uitype");//No I18N
	if(Jelem.prop("name") === "photoID"){//No I18N
		type = "text";//No I18N
	}
	var val;
    if(type === "text" || type === "combo" || type === "select-one" || type === "textarea"){
		val  = Jelem.val();
	}
    else if( type === "select-multiple"){//No I18N
		val  = Jelem.val();
		if(typeof val === 'object' && val.length === 0){
			val = null;
		}
	}
	else if(type === "radio"){//No I18N
		var labl = Jelem.attr("name");//No I18N
		val = commonUtils.getRadioValue(labl);
	}
	else if(type === "checkbox"){//No I18N
		val = Jelem.is(":checked") ? "1" : "" ;//No I18N
	}
	if(uiType == 33 && Crm.userDetails.isPhoneNoNewView){
	    val = CrmPhoneNumberInput.getValueFromPhoneFieldComp(Jelem, val);
	}
	if (uiType === 250 || uiType === '250') {
		val = Jelem[0].component.getValue()
	}
	return val;
}

	/**
	 * This method is used to get the name or label of the checked radio button element. 
	 * @param {String} name - This provides the name of the radio element whose value has to be returned.
	 * @returns {String} - It returns the label or name of the radio button which is clicked or checked.
	 */
commonUtils.getRadioValue = function(name) {//No I18n
	return $("input[type='radio'][name='" + name + "']:checked").val(); // eslint-disable-line @zoho/webperf/no-attribute-selectors
}

	/**
	 * Function used to show or hide 'loading' animation.
	 * <h3> Example </h3><br/>
	 * <img src="./images/showHideLoadingDiv.png">
	 * Note : See the Loading Div above the Navigation Bar.	
	 * @param {Boolean} show - true to show, false to hide.
	 * @returns {void}
	 */
commonUtils.showHideLoadingDiv = function(show){//No I18N
	//eslint-disable-next-line @zoho/zohocrm/no-ajaxloadtab
	var loadingDiv = $("#ajax_load_tab");  //NO I18N
	var dispCnt = loadingDiv.data("dispCount");//NO I18N
	//no need to show top loading anination in new ui when contexual loading is already in view
	if(show)
	{
		var leftMenuLoader = $L("crm-left-menu-loader")[0]; //no i18n
		if(leftMenuLoader)
		{
			var isSkeletonLoaderInView = leftMenuLoader.getData("isLoaderInView"); //no i18n
			if(isSkeletonLoaderInView)
			{
				return;
			}
		}
	}
	if(!dispCnt){dispCnt = 0 }
	if(typeof CrmPlusLib !== "undefined" && CrmPlusLib.isLoadedInCrmplusFrame){
		if(loadingDiv.is(':visible')){
		loadingDiv.hide();
		}
		if(show){
			dispCnt++;
				//eslint-disable-next-line @zoho/zstandard/no-commoncode-in-ifelse
			loadingDiv.data("dispCount",dispCnt);//NO I18N
			CrmPlusLib.showLoading();
		}
		else{
			if(dispCnt > 0){
				dispCnt--
			} //eslint-disable-next-line @zoho/zstandard/no-commoncode-in-ifelse
				loadingDiv.data("dispCount",dispCnt);//NO I18N
				CrmPlusLib.hideLoading();
		}
	}
	else
	{
		if(show){
			dispCnt++;
			loadingDiv.data("dispCount",dispCnt).show();//NO I18N
		}
		else{
			if(dispCnt > 0) {
					dispCnt--
			}
			loadingDiv.data("dispCount",dispCnt);//NO I18N
			loadingDiv.hide();
		}
	}
}

	/**
	 * This function is used to Clear the Selected in the current window
	 * @param {Object} win - This provides the window object in which the Text selection is done.
	 * @returns {void}
	 */
commonUtils.clearTextSelection = function(win) {
	win = win || window;
	var winDoc = win.document;
	if (win.getSelection) {
		win.getSelection().removeAllRanges();
	} 
	else if (winDoc.getSelection) {
		var s = winDoc.getSelection();
		if (s.collapse){
			s.collapse(true);
		} 
		if (s.removeAllRanges){
			s.removeAllRanges();
		}
	} 
	else if (winDoc.selection) {
		winDoc.selection.empty();
	}    
}

	/**
	 * This method is used to make either any one of the field (last name or full name) as mandatory in Selected list of the kanban view settings.Therefore we wont be able to remove the mandatory field from the list. 
	 * <h3> Example </h3><br/>
	 * <img src="./images/addToMandatory.png">
	 * Note : For Leads Kanban View settings, When last name and full name is present we can remove the mandatory Fields (last Name)
	 * @returns {void}
	 */
commonUtils.addToMandatory = function(){//No I18N
	var last = false;
	var full = false;
	var selectedClmn = $("#selectedColumns").find("li");
	selectedClmn.each(function() {
		if($(this).attr('value').indexOf("LASTNAME") > -1 || $(this).attr("value") === "Last_Name") {
			last = true;
		}
		if($(this).attr('value').indexOf("FULLNAME") > -1 || $(this).attr("value") === "Full_Name" ) {
			full = true;
		}
	});
	if(!(last && full)) {
		selectedClmn.each(function() {
			var field_value = $(this).attr('value');
			if(field_value.indexOf("LASTNAME") > -1 || field_value.indexOf("FULLNAME") > -1 || field_value === "Last_Name" || field_value === "Full_Name") {
				$(this).children("#remove").remove(); //eslint-disable-line @zoho/webperf/directly-select-with-id
				$(this).children("#add").remove();//eslint-disable-line @zoho/webperf/directly-select-with-id
				$(this).attr("mandatory","true");
				$(this).find(".pinIcon").addClass("noRemovedItem"); //No I18N
				$(this).removeAttr("ondblclick onclick");
			}
		});
	}
}

	/**
	 * This method is used to remove the mandatory field from either last name and full name if and only if both are present in the selected List in kanban view settings.
	 * <h3> Example </h3><br/>
	 * <img src="./images/removeFromMandatory.png">
	 * Note : For Leads Kanban View settings, When last name alone is present we are unable to remove the mandatory Field (last Name).
	 * @param {Boolean} isForSearch - This is set to true if this from search.
	 * @returns {void}
	 */
commonUtils.removeFromMandatory = function(isForSearch){//No I18N
	var last = false;
	var full = false;
	var selectedClmn = $("#selectedColumns").find("li");
	selectedClmn.each(function(){
		if($(this).attr('value') && ($(this).attr('value').indexOf("LASTNAME") > -1 || $(this).attr("value") === "Last_Name") ){
			last = true;
		}
		if($(this).attr('value') && ($(this).attr('value').indexOf("FULLNAME") > -1 || $(this).attr("value") === "Full_Name")){
			full = true;
		}
	});
	if(last && full){
		selectedClmn.each(function() {
			var field_value = $(this).attr('value');
			if($(this).attr('value') && (field_value.indexOf("LASTNAME") > -1 || field_value.indexOf("FULLNAME") > -1 || field_value === "Full_Name" || field_value === "Last_Name")) {
				$(this).children("#remove").remove();// eslint-disable-line @zoho/webperf/directly-select-with-id
				$(this).children("#add").remove();var span3 = document.createElement("span");// eslint-disable-line @zoho/webperf/directly-select-with-id
				$(span3).attr({"class":"lArrowIcon dIB fR pR","id":"remove","onClick":"commonUtils.moveToList(event," + isForSearch + ")","style":"display:none;"});
				$(this).prepend(span3);
				var span1 = document.createElement("span");
				$(span1).attr({"id":"add","class":"addArrw dIB fR pA","style":"display:none;","onClick":"commonUtils.moveToSelectedList(event," + isForSearch + ")","data-zcqa":'moveToUnselected'});	    			
				$(this).append(span1);
				$(this).attr({"ondblclick" : "commonUtils.moveToListOnDoubleClick(this," + isForSearch + ")" , "onclick" : "commonUtils.checkSelectedElements(this,event)"});
				$(this).find(".pinIcon").removeClass("noRemovedItem"); //No I18N
				$(this).removeAttr("mandatory");
			}
		});
	}
}

	/**
	 * This method is used to move the Fields from selected List to available List in kanban View Settings.	
	 * <h3> Example </h3><br/>
	 * <img src="./images/moveToList.png">
	 * Note : See the Minus symbol for moving from selected list to available list.
	 * @param {Event} event - It provides the target at which the event is fired so as to remove the field from that position.
	 * @returns {void}
	 */
commonUtils.moveToList = function(event){//No I18N
	event.stopPropagation();
	var avlblList = $("#availableList");
	var elem = event.target;
	if(!$("#KanbanViewPopup").length) {
	   var liElem =  elem.parentElement;
	   var pinElem = $(liElem.children).filter(".pinIcon"); //No I18N
	   if(pinElem[0].classList.contains("pinIconActive")) {
		   liElem.parentElement.classList.remove("pinnedUl"); //No I18N
		   liElem.removeAttribute("pin-index");
		   var pinDisabledElem = $(".pinDisabled");//No I18N
		   pinDisabledElem.attr("style" , "display : none; cursor : pointer;"); //No I18N
		   pinDisabledElem.removeClass("pinDisabled"); //No I18N
	   }
	   pinElem.empty();
	   $(liElem).children().filter(".pinIcon").attr({"class" : "pinIcon dIB fR pR", "id" : "pin" , "onClick" : "crmListView.pinUnpinAction(this,event)", "style" : "display : none; cursor : pointer", "value" : "Pin Column"}); //No I18N
	}
	var liElem = $(elem.parentNode).removeAttr('class');
	elem.setAttribute("style", "display : none");
	if($("li.noFields").length > 0)	
	{
		$(".li.noFields").remove();
	}
	var index = liElem.attr('data-index') ? liElem.attr('data-index') : 0;//No I18n
	crmListView.originalOrder.splice(crmListView.originalOrder.indexOf(liElem.attr("field_id")),1);
	var fieldName = liElem.children(".SelectedElement").text();//No I18n
	var AvailableList = avlblList.find("li");
	var AvailableListLength = AvailableList.length;
	renderingUtils.fieldsJSONArray.push(fieldName);
	renderingUtils.fieldsJSONArray.sort();
	index = renderingUtils.fieldsJSONArray.indexOf(fieldName);
	liElem.addClass("sorl");
	if(index > AvailableListLength){
		index = AvailableListLength ;
	}
	if(index != 0){
		AvailableList.eq(index - 1).after(liElem);// NO OUTPUTENCODING	
	}
	else{
		avlblList.prepend(liElem);// NO OUTPUTENCODING
	}
	$L(".availableCol").scrollTo(liElem);
	liElem.stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
		backgroundColor : "#fff3ad"//No I18n
	});
	liElem.stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
		backgroundColor : "white"//No I18n
	},
	{
		duration : 1000,
		complete : function(){
			liElem.attr("style", "margin-left : 11px; margin-right : 11px;");//No I18n
		}			
	});
	commonUtils.addToMandatory();
}

	/**
	 * This method is used to move the elements from available list to selected list in kanban view settings.	
	 * <h3> Example </h3><br/>
	 * <img src="./images/moveToList.png">
	 * Note : See the Plus symbol for moving from available list to selected list.
	 * @param {Event} event - It provides the target at which the event is fired so as to remove the field from that position.	
	 * @param {Boolean} isFromSearch - This is set to true if the value selected is from search.
	 * @returns {void}
	 */
commonUtils.moveToSelectedList = function(event,isFromSearch){//No I18N
	event.stopPropagation();
	var elem = event.target;
	var appendToUl = $("#selectedColumns");
	$(elem.parentNode).removeClass('selected');
	if(Lyte.Router.getRouteInstance().routeName.includes('custom-view') && appendToUl.find('li').length >= Search.MAX_COL_CNT){
//		renderingUtils.showMaxColsReachedMsg();
		return;
	}
	elem.setAttribute("style","display:none;");
	var elParent = elem.parentNode;
	if(!$("#KanbanViewPopup").length) {
		var pinElem = $(elParent).find(".pinIcon");
		$(elParent).addClass("unPinField"); //No I18N
		pinElem.html("<crmutil-icon icon-name='thumbtack' icon-class='zcicn-thumbtack crmBaseIcon '></crmutil-icon>"); //No I18N
		if(appendToUl[0].classList.contains('pinnedUl')){
			pinElem.addClass("pinDisabled"); //No I18N
			pinElem.attr("style","display : none; opacity: 0.5; cursor: default;"); //No I18N
		}
	}
	crmListView.originalOrder.push($(elParent).attr("field_id"));
	appendToUl.append(elParent);    
	$L(".selectedCol").scrollTo(elParent);
	$(elParent).removeClass("multiselectable-previous selectedElem");
	$(elParent).stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
		backgroundColor: '#fff3ad'//No I18N
	})
	$(elParent).stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
		backgroundColor: 'white'}, {//No I18N
		duration: 500,
		complete: function() { $(elParent).attr('style',"margin-left:11px;margin-right:11px") }
	});  
	var avlblList = $("#availableList")
	if(avlblList.children().not(".sectionHd").length === 0){
		var nodenode = document.createElement("li");
		nodenode.setAttribute("class", "nosort noFields");
		$(nodenode).html(I18n.getMsg("crm.customview.nofields"));
		avlblList.append(nodenode);
	}
	var selected = $(elParent).children().find(".selectionClass");
	if(selected.length > 0){
		$.each(selected, function(index){
			var selectedIndex = selected[index];
			var txt = $(selectedIndex).text();
			$(selectedIndex).replaceWith($ESAPI.encoder().encodeForHTML(txt));
		});
	}
	commonUtils.removeFromMandatory(isFromSearch);
}

	  /**
	   * This method is invoked when the user selects a particular field either on the available list or selected list in kanban view settings. This method is used to check whether multi selectable elements are available or not and if the maximum columns has reached we cant select them.
	   * @see Refer example of {@link commonUtils.moveToSelectedList}. See the selected Element is highlighted.  
	   * @param {HTMLElement} elem - This provides the target element at which the click event has occured. 
	   * @returns {void}
	   */
commonUtils.checkSelectedElements = function(elem){//No I18N
	var available = $("#availableList");
	var avlblList = available.children().children(".multiMove");//No I18N
	if(avlblList){
		avlblList.remove();
	}
	var elParent = elem.parentNode;
	//disable selection while clicking on the already selected item.
	if($(elem).hasClass("selectedElem") && (!$(elem).hasClass("multiselectable-previous") && !$(elem).hasClass("multiselectable-shift"))){
		var selectedlistId = $(elParent).attr("id");
		$("#" + selectedlistId).children(".selectedElem").not(elem).removeClass("multiselectable-previous multiselectable-shift selectedElem");
	}
	//Removing selection in available list while clicking on the elements in selectedColumns
	var otherListId = $(elParent).attr("id") === "availableList" ? "selectedColumns" : "availableList";//No I18N
	var otherListChild = $("#" + otherListId).children(".selectedElem");
	if(otherListChild.length > 0){
		otherListChild.removeClass("multiselectable-previous multiselectable-shift selectedElem");
	}
	if($(elem).closest('ul').attr('id') === 'availableList'){
		var curSelectedli = available.find('li.selectedElem');
		var curSelection = curSelectedli.length;
		var alreadySelected = $('#selectedColumns').find('li').length;
		if(curSelection + alreadySelected > Search.MAX_COL_CNT){
//			renderingUtils.showMaxColsReachedMsg();
			for(var i = Search.MAX_COL_CNT - alreadySelected;i < curSelection; i++){
				curSelectedli.eq(i).removeClass("multiselectable-previous").removeClass("multiselectable-shift").removeClass("selectedElem");
			}
		}
	}
}

	/**
	 * This method is used to move the element from selected list to available list and the vice versa on double click in kanban view settings.
	 * @see Refer Example of {@link commonUtils.moveToList}. On double Clicking the anyone of the field it changes the list. 
	 * @param {HTMLElement} elem - This provides the target element at which the double click has occured. 
	 * @returns {void}
	 */
commonUtils.moveToListOnDoubleClick = function(elem){//No I18n
	var isKanbanView = $("#KanbanViewPopup").length === 0 ? false : true;
	if(!isKanbanView && elem.parentNode.id === "selectedColumns" && $(elem).children(".pinIcon")[0].classList.contains("pinIconActive")) {
		 return;
	}
	var availableList = $("#availableList");
	var selectedClmn = $('#selectedColumns');
	$(elem).stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
		backgroundColor : "#fff3ad"//No I18n
	});
	if(elem.parentNode.id === "selectedColumns"){
		elem.removeAttribute("class");
		elem.children.remove.setAttribute("style", "display : none;");
		if(!isKanbanView) {
			   var pinElem = $(elem.children).filter(".pinIcon"); //No I18N
			   if(pinElem[0].classList.contains("pinIconActive")) {
				   elem.parentElement.classList.remove("pinnedUl"); //No I18N
				   elem.removeAttribute("pin-index"); //No I18N
				   var pinDisabledElem = $(".pinDisabled"); //No I18N
				   pinDisabledElem.attr("style" , "display : none; cursor : pointer;"); //No I18N
				   pinDisabledElem.removeClass("pinDisabled"); //No I18N
			   }
			   pinElem.empty();
			   pinElem.removeAttr("lt-prop-title"); //No I18N
			   $(elem).children().filter(".pinIcon").attr({"class" : "pinIcon dIB fR pR", "id" : "pin" , "onClick" : "crmListView.pinUnpinAction(this,event)", "style" : "display : none; cursor : pointer", "value" : "Pin Column"}); //No I18N
		}
		var noField = $("li.noFields");
		if(noField.length > 0){
			noField.remove();
		}
		var fieldName = $(elem).children(".SelectedElement").text();//No I18n
		renderingUtils.fieldsJSONArray.push(fieldName);
		renderingUtils.fieldsJSONArray.sort();
		var index = renderingUtils.fieldsJSONArray.indexOf(fieldName);
		if($("#searchField").val() !== ""){
			var searchedFields = [];
			renderingUtils.fieldsJSONArray.filter(function(field){// eslint-disable-line @zoho/webperf/directly-select-with-id
				if(field.search(new RegExp($("#searchField").val(), "i")) > -1){
					searchedFields.push(field);
				}
			});
			index = searchedFields.indexOf(fieldName);				 
		}
		var AvailableListElements = availableList.find("li");
		if(index > AvailableListElements.length){
			index = AvailableListElements.length ;
		}
		if(index !== 0){
			AvailableListElements.eq(index - 1).after(elem)			
		}
		else{
			availableList.prepend(elem)
		}
		crmListView.originalOrder.splice(crmListView.originalOrder.indexOf(elem.getAttribute("field_id")),1);
		$L(".availableCol").scrollTo(elem);
		commonUtils.addToMandatory();
	}
	else{
		var selectedClmnLength = selectedClmn.find('li').length;
		if(selectedClmnLength >= Search.MAX_COL_CNT){
			$(elem).removeClass("multiselectable-previous selectedElem");
//			renderingUtils.showMaxColsReachedMsg();
			return;
		}
		if(!isKanbanView) {
			var pinElem = $(elem).find(".pinIcon");
			var pinLimit = Crm.userDetails.customViewPinLimit ? Crm.userDetails.customViewPinLimit : '1' ;
	        if(selectedClmn[0].classList.contains('pinnedUl') && $(elem).attr("_pinned")) {
				       $(elem).addClass("pinField"); //No I18N
				       pinElem.html("<crmutil-icon icon-name='thumbuntack' icon-class='zcicn-thumbuntack crmBaseIcon '></crmutil-icon>"); //No I18N
				       pinElem.addClass("pinIconActive noRemovedItem");
				       var cvContainer = $("#cv_ctn");
				       if(cvContainer && cvContainer[0].classList.contains("cv_noEditPermission")){
				    	  pinElem.attr({"value":"unPin Column", "style":"display : inline; opacity: 0.4; cursor : default; pointer-events:auto;"}); //No I18N 
				    	  $(elem).addClass("DisablePinFieldAction"); //No I18N
				       } else {
				         pinElem.attr({"value":"unPin Column", "style":"display : inline; cursor : pointer"}); //No I18N
				       }
			} else {
			          $(elem).addClass("unPinField"); //No I18N
			          pinElem.html("<crmutil-icon icon-name='thumbtack' icon-class='zcicn-thumbtack crmBaseIcon '></crmutil-icon>"); //No I18N
			          if(selectedClmn[0].classList.contains('pinnedUl') && selectedClmn[0].querySelectorAll('.pinField').length >= pinLimit){
				             pinElem.addClass("pinDisabled"); //No I18N
			 	             pinElem.attr("style","display : none; opacity: 0.5; cursor: default;"); //No I18N
			          }
		          }
		}
		elem.children.add.setAttribute("style", "display : none;");
		if(crmListView.originalOrder.indexOf($(elem).attr("field_id")) === -1){
			crmListView.originalOrder.push($(elem).attr("field_id"));
		}
		selectedClmn.append(elem);
		if(availableList.children("li").length === 0){
			var nodenode = document.createElement("li");
			nodenode.setAttribute("class", "nosort noFields");
			$(nodenode).html(I18n.getMsg("crm.customview.nofields"));
			availableList.append($(nodenode));
		}
		$L(".selectedCol").scrollTo(elem);
		var field = $(elem).children(".SelectedElement").text();//No I18n
		renderingUtils.fieldsJSONArray.removeFirstOccurenceOfElement(field);
		commonUtils.removeFromMandatory();
	}
	$(elem).removeClass("multiselectable-previous selectedElem");
	$(elem).stop(true, true).animate({// eslint-disable-line @zoho/webperf/no-animate
	backgroundColor: 'white'}, {//No I18N
	duration: 500,
	complete: function() { $(elem).attr('style',"margin-left: 11px; margin-right: 11px;") }
	});  
	var selected = $(elem.parentNode).children().find(".selectionClass");
	if(selected.length > 0){
		$.each(selected, function(index){
			var selectedIndex = selected[index];
			var txt = $(selectedIndex).text();
			$(selectedIndex).replaceWith($ESAPI.encoder().encodeForHTML(txt));
		});
	}
}


	/**
	 * This method gets invoked when we search for a key in setcolumnvalues config table {@link commonUtils.setColumnValues1} .
	 * @param {Object} moduleJSON - This provides the list of fields that are available for the particular module.
	 * @param {String} searchString - This provides the search string that has been provided by the user.
	 * @returns {void}
	 */
commonUtils.searchedFields = function(moduleJSON,searchString){ //No I18N
	var searchedFields = [];
	var previousSelectedElements = $(".selectedElem");
	var elementsInSelectedColumns = $("#selectedColumns").find("li").children(".SelectedElement");
	var selectedElems = [];
	var len = elementsInSelectedColumns.length;
	for(var i = 0;i < len;i++){
		selectedElems.push(elementsInSelectedColumns.eq(i).text());
	}
	searchString = searchString.replace(/\(/g, "\\(");
	searchString = searchString.replace(/\)/g, "\\)");
	renderingUtils.fieldsJSONArray.filter(function(field){
		if(field.search(new RegExp(searchString, "i")) > -1){
			searchedFields.push(field);
		}
	});
	if(previousSelectedElements){
		var selectedElemVsClass = {};
		var len = previousSelectedElements.length;
		for(var sel = 0;sel < len;sel++){
			var previousSelectedElementEq = previousSelectedElements.eq(sel);
			var previousSelectedElementChildTxt = previousSelectedElementEq.children(".SelectedElement").text(); //No I18N	
			if(searchedFields.contains(previousSelectedElementChildTxt)){
				selectedElemVsClass[previousSelectedElementChildTxt] = previousSelectedElementEq.attr("class");
			}
		}
	}
	var tmpObj = JSON.parse(JSON.stringify(moduleJSON));
	var none = true;
	var sectionsIter = function(sectionname, fieldValues){
		var fieldValueIter = function(fieldname){
			if(!(searchedFields.contains(fieldname) && selectedElems.indexOf(fieldname) <= -1)){
				fieldValues.splice(j, 1);
				j--;
			}
			else{
				none = false; 
			}
		}
		var len = fieldValues.length;
		for(var j = 0; j < len; j++){
			$.each(fieldValues[j], fieldValueIter); 
		}
	}
	$.each(tmpObj[0], sectionsIter);
	commonUtils.setColumnValues(tmpObj, true, selectedElemVsClass);
	if(none){
		var nonenode = document.createElement("li");
		$(nonenode).attr({"class" : "nosort","id" : "noRecords"});
        //eslint-disable-next-line @zoho/zstandard/combine-properties
        $(nonenode).attr("style","font-size: var(--crm-base-font-size);text-align: center;margin-top: 12px;");//No I18N
        $(nonenode).html(I18n.getMsg("crm.customview.nofields.found"));
        $("#availableList").html(nonenode);
	}
}

	/**
	 * This method is used to construct the selected list and available list in custom-view of any of the module.	
	 * @param {Object} moduleJSON  - This provides the list of fields that are available for the particular module.
	 * @param {Boolean} isForSearch - This provides whether the list for only the searched fields. 
	 * @returns {void}
	 */
commonUtils.setColumnValues = function(moduleJSON,isForSearch/*,selectedElemVsClass*/){ //No I18N
	var parentElement = document.getElementById("ColumnsListtr");
			//Main available div
	if(!isForSearch){
		var mainDiv = document.createElement("div");
		$(mainDiv).attr({"class":"relList","style":"width:280px"});
		//Search Component
		var inputDiv = document.createElement("div");
		inputDiv.setAttribute("class","pR");
		var inputElem = document.createElement("input");
		$(inputElem).attr({"style":"width:228px;height:25px; padding: 4px 30px 4px 20px; background: var(--bg_white) url("+networkUtils.getImageUrl("svgicons.svg",ResourceConstants.CRM)+") no-repeat 7px -173px;text-indent: 15px;","id":"searchField","data-zcqa":"dash_searchField_chooseColumns","type":"text","autocomplete":"off","onkeyup":"renderingUtils.searchKey(this.value)"}); /* eslint-disable-line @zoho/zohocrm/no-deprecated-fnc */ //No I18N
		var crossImage = document.createElement("i");
		$(crossImage).attr({"id":"emptySearch","class":"inputDel","style":"display:none;","onclick":"renderingUtils.emptySearchBox()"});
		inputDiv.appendChild(inputElem);
		inputDiv.appendChild(crossImage);
		 mainDiv.appendChild(inputDiv);
			
		//Main selected Div
		var selectedDiv = document.createElement("div");
			selectedDiv.className = "relList";
		//Selected div
		var selectedDiv1 = document.createElement("div");
		selectedDiv1.className = "sectionsort selectedCol";
	
		//selected Ul
		var selectedUl = document.createElement("ul");
		$(selectedUl).attr({"class":"connectedSortable","id":"selectedColumns","data-cid":"selectedColumns"});
	  }
	if(!mainDiv){
		var searchFld = $("#searchField");
		if(searchFld.length > 0 ){
		mainDiv = searchFld.parents(".relList")[0];
		}
	}
			//available Div
	var mainDiv1 = document.createElement("ul");
	$(mainDiv1).attr({"class":"sectionsort connectedSortable availableCol","data-cid":"availableList","id":"availableList"});
	var moduleIter = function(module, fieldsJSON){
		if(isForSearch){
			if(! $.isEmptyObject(fieldsJSON[0])){
				$("#availableList").remove();
			}else{
				return;
			}	
		}
		var fieldValueIter = function(fieldName, fieldvalueArray){
			if(!isForSearch){
				renderingUtils.fieldsJSONArray.push(fieldName);													
			}
			var field_value = fieldvalueArray.join(":");
			var availableFieldsli = document.createElement("li");
			$(availableFieldsli).attr({"class" : "sorl", "value" : field_value, "onclick" : "commonUtils.checkSelectedElements(this, event);", "ondblclick" : "commonUtils.moveToListOnDoubleClick(this, " + isForSearch + ");", "style" : "margin-left : 11px; margin-right : 11px;"});//No I18n
			var span = document.createElement("span");
			$(span).attr({"class" : "SelectedElement", "style" : "margin-left:0", "title" : fieldName});
			$(span).text(fieldName);
			var span2 = document.createElement("span");
			$(span2).attr({"class" : "lArrowIcon dIB fR pR", "id" : "remove" , "onClick" : "commonUtils.moveToList(event, " + isForSearch + ");", "style" : "display : none;"});
			availableFieldsli.appendChild(span2);
			availableFieldsli.appendChild(span);
			var span1 = document.createElement("span");
			$(span1).attr({"id" : "add", "class" : "addArrw dIB fR pA", "onClick" : "commonUtils.moveToSelectedList(event, " + isForSearch + ");", "style" : "display : none;", "data-zcqa" : "movetoSelected"});
			availableFieldsli.appendChild(span);
			availableFieldsli.appendChild(span1);
			mainDiv1.appendChild(availableFieldsli);
			if(fieldName.indexOf("Last Name") > -1 || fieldName.indexOf("Full Name") > -1) {
				var sup = document.createElement("sup");
				$(sup).attr({"class":"crmNegativeColor mL3 top8"});
				$(sup).html("*");
				availableFieldsli.appendChild(sup);
			}
		}
		var len  = fieldsJSON.length;
		for(var j = 0; j < len; j++){
			if(fieldsJSON[j] == null){
				fieldsJSON.splice(j, 1);
				j--;
				continue;
			}
			$.each(fieldsJSON[j], fieldValueIter);
		}
		mainDiv.appendChild(mainDiv1);
	}
	$.each(moduleJSON[0], moduleIter);
	if(!isForSearch){
		var fieldValueIter = function(fieldName, fieldValueJSON){
			var field_value = fieldValueJSON.join(":");
			field_value = field_value.substring(0, field_value.lastIndexOf(":"));
			var selectedFieldsli = document.createElement("li");
			$(selectedFieldsli).attr({"class" : "pR sorl", "value" : field_value, "onclick" : "commonUtils.checkSelectedElements(this, event);", "style" : "margin-left : 11px; margin-right : 11px;"});
			var span2 = document.createElement("span");
			$(span2).attr({"class":"SelectedElement sdasd","style":"margin-left:0"});
			$(span2).text(fieldName);
			selectedFieldsli.appendChild(span2);
			if(field_value.indexOf(mandatoryfield) > -1 || field_value.indexOf("ACTIVITYTYPE") > -1 || field_value.indexOf("FULLNAME") > -1){
				selectedFieldsli.setAttribute("mandatory","true");					
				var sup = document.createElement("sup");
				$(sup).attr({/*"style":"position:absolute;",*/"class":"crmNegativeColor mL3 top8"});	
				$(sup).html("*");
				selectedFieldsli.appendChild(sup);
			}
			else{
				var span3 = document.createElement("span");
				$(span3).attr({"class":"lArrowIcon dIB fR pR","id":"remove","onClick":"commonUtils.moveToList(event," + isForSearch + ")","style":"display:none;"});
				selectedFieldsli.appendChild(span3);
				var span1 = document.createElement("span");
				$(span1).attr({"id":"add","class":"addArrw dIB fR pA","style":"display:none;","onClick":"commonUtils.moveToSelectedList(event," + isForSearch + ")","data-zcqa":'moveToUnselected'});
				selectedFieldsli.appendChild(span1);
				selectedFieldsli.setAttribute("ondblclick","commonUtils.moveToListOnDoubleClick(this," + isForSearch + ")");
				selectedFieldsli.setAttribute("onclick","commonUtils.checkSelectedElements(this,event)");
			}
			selectedUl.appendChild(selectedFieldsli);
		}
		var selectedFields = moduleJSON[moduleJSON.length - 1];
		var fieldsJSON = selectedFields.selectedFieldsJSON;
		var ln = fieldsJSON.length;
		for(var j = 0;j < ln;j++){
			if(fieldsJSON[j]){
				$.each(fieldsJSON[j],fieldValueIter);
			}
		}
		selectedDiv1.appendChild(selectedUl);
		selectedDiv.appendChild(selectedDiv1);
		var td = document.createElement("td");
		td.appendChild(mainDiv);
		parentElement.appendChild(td);
		var dummytd = document.createElement("td");
		parentElement.appendChild(dummytd).setAttribute("style","width:15px;");
		var td1 = document.createElement("td");
		td1.appendChild(selectedDiv);
		parentElement.appendChild(td1);
		commonUtils.removeFromMandatory(isForSearch);
	}
	renderingUtils.sectionSorting();
	$("ul.connectedSortable").find("li").not(".nosort").hover(function(){
		var el = $(this);
		if(!el.hasClass("selectedElem")){
			el.css({'background': 'var(--menuHover)'}); //No I18N
			if(this.parentNode.id === "selectedColumns"){
					el.children().filter(".lArrowIcon").show();  //No I18N
			}
			else if(this.parentNode.getAttribute("data-cid") === "availableList"){//No I18N
			el.find(".addArrw").attr("style","display:inline"); //No I18N
			}
		}
	},function(){
		var el = $(this);
		el.css({'background': ''}); //No I18N
		if(this.parentNode.id === "selectedColumns"){
			el.children().filter(".lArrowIcon").hide() //No I18N
		}
		else if(this.parentNode.getAttribute("data-cid") === "availableList"){ //No I18N
					el.find(".addArrw").attr("style","display:none");  //No I18N
		}
	});
}

	/**
	* This method is used to construct the selected list and available list in custom-view of any of the module.	
	* <h3> Example </h3><br/>
	* <img src="./images/setColumnValues1.png">
	* @param {Object} moduleJSON1  - This provides the list of fields that are available for the particular module.
	* @param {Array} selectedFields - This provides the list of selected fields for that particular module. 
	* @param {String|Array} mandatoryfield - This provides the mandatory field for that particular module. 
	* @returns {void}
	*/
commonUtils.setColumnValues1 = function(moduleJSON1,selectedFields, mandatoryfield){//No I18N
	var isForSearch;
	var parentElement = document.getElementById("ColumnsListtr");
	//Main available div
	var mainDiv = document.createElement("div");
	$(mainDiv).attr({"class":"relList","style":"width:280px"});
	
	//Search Component
	var inputDiv = document.createElement("div");
	inputDiv.setAttribute("class","pR");
	var inputElem = document.createElement("input");
	$(inputElem).attr({"style":"width:228px;height:25px; padding: 4px 30px 4px 20px; background: var(--bg_white) url("+networkUtils.getImageUrl("svgicons.svg",ResourceConstants.CRM)+") no-repeat 7px -173px;text-indent: 15px;","id":"searchField","data-zcqa":"dash_searchField_chooseColumns","type":"text","autocomplete":"off","onkeyup":"renderingUtils.searchKey(this, event)"});/* eslint-disable-line @zoho/zohocrm/no-deprecated-fnc */ //No I18n
	var crossImage = document.createElement("i");
	$(crossImage).attr({"id":"emptySearch","class":"inputDel","style":"display:none;","onclick":"renderingUtils.emptySearchBox()"});
	inputDiv.appendChild(inputElem);
	inputDiv.appendChild(crossImage);
	mainDiv.appendChild(inputDiv);
	
	//Main selected Div
	var selectedDiv = document.createElement("div");
	selectedDiv.className = "relList";
	//Selected div
	var selectedDiv1 = document.createElement("div");
	selectedDiv1.className = "sectionsort selectedCol";
	
	//selected Ul
	var selectedUl = document.createElement("ul");
	$(selectedUl).attr({"class":"connectedSortable","id":"selectedColumns","data-cid":"selectedColumns"});
	
	var selectedFieldsLength = selectedFields.length;
	var pinIndex = {},selectIndex = {};
	crmListView.originalOrder = [];
	for( var i=0; i<selectedFieldsLength ; i++){
		selectIndex[selectedFields[i].id] = i;
	    if(selectedFields[i] && selectedFields[i].pinned === true){
	    	$(selectedUl).addClass("pinnedUl");
	    	pinIndex[selectedFields[i].id] = i;
	    }
	    //crmListView.originalOrder.push(selectedFields[i].id);
	}
	if(!mainDiv){
		var searchFld = $("#searchField");
		if(searchFld.length > 0 ){
			mainDiv = searchFld.parents(".relList")[0];
		}
	}
	//available Div
	var mainDiv1 = document.createElement("ul");
	$(mainDiv1).attr({"class":"sectionsort connectedSortable availableCol","data-cid":"availableList","id":"availableList"});
	var moduleIter = function(module, fieldsJSON){	  
		var fieldValueIter = function(index, fieldObj){
			if(fieldObj && fieldObj.display_type !== 2 && fieldObj.columnname !== "PROCESSINGBASIS" && fieldObj.columnname !== "DATASOURCE" && fieldObj.columnname !== "ISCALLBILLABLE" && fieldObj.columnname !== "PRICINGDETAILS" && fieldObj.columnname !== "DISCOUNT_TYPE" && fieldObj.columnname !== "DISCOUNT_PERCENTAGE" && (fieldObj.sys_ref_name !== "Connected_To__s" || (fieldObj.sys_ref_name === "Connected_To__s" && fieldObj.available_in_user_layout))){
				var fieldName = fieldObj.field_label;
				//if(!isForSearch)
				//{
					renderingUtils.fieldsJSONArray.push(fieldName);													
				//}
				var fieldName = fieldObj.field_label;
				if(fieldObj.sys_ref_name === "Full_Name" && (fieldObj.module === "Contacts" || fieldObj.module === "Leads")){
					fieldName = I18n.getMsg("custommodule.crmfield.fl.name",moduleName === "Lead" ? moduleRecordMapping.Leads.singular_label : moduleRecordMapping.Contacts.singular_label);
			    }
				var field_value = fieldObj.table_name + ":" + fieldObj.columnname + ":" + fieldObj.actual_label;
				var availableFieldsli = document.createElement("li");
				$(availableFieldsli).attr({"data-index":index, "class" : "sorl cv_sotableList", "value" : field_value, "field_id" : fieldObj.id, "onclick" : "commonUtils.checkSelectedElements(this, event);", "ondblclick" : "commonUtils.moveToListOnDoubleClick(this, " + isForSearch + ");", "style" : "margin-left : 11px; margin-right : 11px;"});//No I18n
				var span = document.createElement("span");
				$(span).attr({"class" : "SelectedElement", "style" : "margin-left:0", "title" : fieldName});
				$(span).text(fieldName);
				var span2 = document.createElement("span");
				$(span2).attr({"class" : "lArrowIcon dIB fR pR", "id" : "remove" , "onClick" : "commonUtils.moveToList(event, " + isForSearch + ");", "style" : "display : none;" });
				var span3 = document.createElement("span");
				$(span3).attr({"class" : "pinIcon dIB fR pR", "id" : "pin" , "onClick" : "crmListView.pinUnpinAction(this,event)", "style" : "display : none; cursor : pointer", "value" : "Pin Column"});
				availableFieldsli.appendChild(span2);
				availableFieldsli.appendChild(span);
				availableFieldsli.appendChild(span3);
				var span1 = document.createElement("span");
				$(span1).attr({"id" : "add", "class" : "addArrw dIB fR pA", "onClick" : "commonUtils.moveToSelectedList(event, " + isForSearch + ");", "style" : "display : none;", "data-zcqa" : "movetoSelected"});
				availableFieldsli.appendChild(span);
				availableFieldsli.appendChild(span1);
				if(field_value.indexOf("LASTNAME") > -1 || field_value.indexOf("FULLNAME") > -1){
					var sup = document.createElement("sup");
					$(sup).attr({/*"style":"position:absolute;",*/"class":"crmNegativeColor mL3 top8"});
					$(sup).html("*");
					span3.classList+=" noRemovedItem"; //No I18N
					availableFieldsli.appendChild(sup);
				}
				mainDiv1.appendChild(availableFieldsli);
			}
		}
		$.each(fieldsJSON, fieldValueIter);
		var nonenode = document.createElement("li");
		$(nonenode).attr({"class" : "nosort" , "id" : "noRecords" });
       //eslint-disable-next-line @zoho/zstandard/combine-properties
      $(nonenode).attr("style","font-size: var(--crm-base-font-size);text-align: center;margin-top: 12px;display:none;");//No I18N
      $(nonenode).html(I18n.getMsg("crm.customview.nofields.found"));
		mainDiv1.appendChild(nonenode);// NO OUTPUTENCODING
		mainDiv.appendChild(mainDiv1);
	}
	$.each(moduleJSON1[0], moduleIter);
	selectedDiv1.appendChild(selectedUl);
	selectedDiv.appendChild(selectedDiv1);
	var td = document.createElement("td");
	td.appendChild(mainDiv);
	parentElement.appendChild(td);
	var dummytd = document.createElement("td");
	parentElement.appendChild(dummytd).setAttribute("style","width:15px;");
	var td1 = document.createElement("td");
	td1.appendChild(selectedDiv);
	parentElement.appendChild(td1);
	renderingUtils.sectionSorting();
	var allFieldItems = $("ul.connectedSortable").find("li"); //No I18N
	allFieldItems.not(".nosort").mousemove(function(){ //No I18N
		var el = $(this);
		if(!(el.hasClass("selectedElem")||el.hasClass("DisablePinFieldAction"))){
			el.css({'background': 'var(--menuHover)'});//No I18N
			if(this.parentNode.id === "selectedColumns"){
				if(this.classList.contains("unPinField")){
					el.children().filter(".pinIcon").show(); //No I18N
					el.children().filter(".lArrowIcon").show(); //No I18N
				}
			}
			else if(this.parentNode.getAttribute("data-cid") === "availableList"){//No I18N
				el.find(".addArrw").attr("style","display:inline"); //No I18N
			}
		}
	});
	allFieldItems.not(".nosort").mouseleave(function(){ //No I18N
		var el = $(this);
		el.css({'background': ''});//No I18N
		if(this.parentNode.id === "selectedColumns"){
			if(this.classList.contains("unPinField")){
				el.children().filter(".pinIcon").hide(); //No I18N
			}
			el.children().filter(".lArrowIcon").hide(); //No I18N
		}
		else if(this.parentNode.getAttribute("data-cid") === "availableList"){//No I18N
			el.find(".addArrw").attr("style","display:none"); //No I18N
		}
	});
	var pinColumnMsg = I18n.getMsg('crm.customview.pin.column');
	var unPinColumnMsg = I18n.getMsg('crm.customview.unpin.column');
	var pinLimit = Crm.userDetails.customViewPinLimit ? Crm.userDetails.customViewPinLimit : '1' ;
	var pinLimitMsg = I18n.getMsg('crm.customview.pin.unpin.maximum.limit.new',pinLimit);
	var cvContainer = $("#cv_ctn");
	if(cvContainer && cvContainer[0].classList.contains("cv_noEditPermission")){
		unPinColumnMsg = I18n.getMsg('crm.customview.lock.unpin.disable');
	}
	var toolTipDelay = "{\"showdelay\":600}"; //No I18N
	$(".pinIcon").on('mousemove',function(){
		var parentEle = this.parentElement.parentElement;
		var isPinnedUl = parentEle.classList.contains("pinnedUl"); //No I18N
		var pinnedFieldsCount = parentEle.querySelectorAll(".pinField").length; //No I18N
		if(isPinnedUl){
			if(this.classList.contains("pinIconActive")) {
				$(this).attr({"lt-prop-title":unPinColumnMsg,"lt-prop-tooltip-config": toolTipDelay});
			} else if(pinnedFieldsCount < pinLimit) {
				$(this).attr({"lt-prop-title":pinColumnMsg,"lt-prop-tooltip-config": toolTipDelay});
			} else {
				$(this).attr({"lt-prop-title":pinLimitMsg,"lt-prop-tooltip-config": toolTipDelay});
			}
			
		} else {
			$(this).attr({"lt-prop-title":pinColumnMsg,"lt-prop-tooltip-config": toolTipDelay});
		}
	}).on('mouseleave',function(){
		$(this).removeAttr("lt-prop-title");
	});
	$(".sorl").on('mousedown',function(){
		var isPinned = this.classList.contains("pinField"); //No I18N
		//var liElements = $('#selectedColumns li'+ (isPinned?'.unPinField':'.pinField')); //No I18N
		$('#selectedColumns li'+ (isPinned?'.unPinField':'.pinField')).addClass("restrictSort");
		$('#selectedColumns li'+ (!isPinned?'.unPinField':'.pinField')).removeClass("restrictSort");
	});
	var availableFldsObj = $('#ColumnsListtr');
	//this lines where added to avoid selecting all the sub-module Tag fields (otherwise if Tag is in selected column all the 3 Tag fields will be in selected column)
	var activityTagsfields = availableFldsObj.find('li[value="CrmActivity:TAGMODULEREFID:Tag"]');// eslint-disable-line @zoho/webperf/no-attribute-selectors
	if(activityTagsfields && activityTagsfields.length > 1){
		activityTagsfields.eq(1).remove();
		activityTagsfields.eq(2).remove();
	}
	if(Lyte.Router.getRouteInstance().routeName !== 'create-custom-view'){
		//selectedFields.sort((field1, field2) => Number(field2.pinned) - Number(field1.pinned));
		var selectedFieldsLen = selectedFields.length;
		for(var i = 0 ;i < selectedFieldsLen-1 ; i++){
			for(var j = 0 ; j < selectedFieldsLen-i-1 ; j++){
				if((!selectedFields[j].pinned_order && selectedFields[j+1].pinned_order) || (selectedFields[j].pinned_order > selectedFields[j+1].pinned_order)){
					var temp = selectedFields[j];
					selectedFields[j] = selectedFields[j+1];
					selectedFields[j+1] = temp;
				}
			}
		}
	}
	var len = selectedFields.length;
	for(var i = 0;i < len;i++){
		var fieldObj = selectedFields[i];
		if(fieldObj){
			var field_value = fieldObj.table_name + ":" + fieldObj.columnname + ":" + fieldObj.actual_label;
			//eslint-disable-next-line @zoho/webperf/no-attribute-selectors
			var selectedField = availableFldsObj.find('li[value="' + field_value + '"]');
			if(fieldObj.pinned){selectedField.attr({"_pinned": true});}
			selectedField.trigger('dblclick');//No I18n
			selectedField.removeAttr("_pinned");//No I18n
			var lielem = $('li[value="' + field_value + '"]');//eslint-disable-line @zoho/webperf/no-attribute-selectors
			if(fieldObj.pinned && lielem[0].classList.contains("pinField") && lielem[0].parentElement.classList.contains("pinnedUl")) {
				lielem.attr("pin-index",pinIndex[fieldObj.id]); //No I18N
			}
			if(field_value.indexOf(mandatoryfield) > -1 || field_value.indexOf("ACTIVITYTYPE") > -1 || field_value.indexOf("FULLNAME") > -1){
				lielem.attr("mandatory","true");//No I18n
				if(!(field_value.indexOf("FULLNAME") > -1 || field_value.indexOf("LASTNAME") > -1)) {
					var sup = document.createElement("sup");
					$(sup).attr({/*"style":"position:absolute;",*/"class":"crmNegativeColor mL3 top8"});
					$(sup).html("*");
					lielem.find(".pinIcon").addClass("noRemovedItem");
					lielem.append(sup);// NO OUTPUTENCODING
				}
				lielem.find('#remove').remove();// eslint-disable-line @zoho/webperf/directly-select-with-id
				// eslint-disable-next-line @zoho/webperf/directly-select-with-id
				lielem.removeAttr('onclick').removeAttr('ondblclick').find('#add').remove();//No I18n
			}
		}
	}
}

	/**
	 * This method will check for whether usename is needed for particular integration(services like mail,projects etc...)
	 * @param {Function} callbackfn - This provides the callBack method which has to be invoked when xhr request is succesful.
	 * @param {String} service - This provides which type of service is made i.e, mail,projects,zdoc etc..
	 * @param {Function} cancelBtnCallbackfn - This provides the callback method which has to be invoked if the cancel Button is clicked.
	 * @returns {void}
	 */
commonUtils.checkUsernameNeeded = function(callbackfn, service, cancelBtnCallbackfn){ //No I18N
	var posturl = Crm.getCrmBasePath() + "/UpdateUsername.do"; //No I18N
	var reqPool = new crmRequestPool();
	reqPool.initiate({
	    "type": "POST",//No I18N
	    "url": posturl,//No I18N
	    "data": "action=checkUsernameNeeded&service=" + service,//No I18N
	    "success": function(data) {//No I18N
	        var tempdata = data.replace(/^\s+|\s+$/g,"");
	        var showNotes = $("#shownotes");
	        if(tempdata.length > 0){
	        	showNotes.html(data);
	//              getObj('shownotes').innerHTML =  data;
	        	showNotes.addClass('newPopup p30 crm-subheading-font-size').css({"zindex" : " 100" , "position" : "absolute"}); // No I18N
	//				getObj('shownotes').style.zIndex = 100;
	//              getObj('shownotes').style.position = 'absolute';
	//				setTimeout( function () {
	//                $('#FreezeLayer').css({'z-index':'99'});},10);
	            renderingUtils.freezeBackground();
	//              if (getObj("usernameUpdateBtn") != null && getObj("usernameUpdateBtn") != 'undefined')
	            var userNameUpdate = $("#usernameUpdateBtn");
	            if (userNameUpdate && userNameUpdate !== 'undefined'){
	            	userNameUpdate.click(function() {
	            		commonUtils.updateUsername( callbackfn, service ); 
	            	});
	            }
			    /*call back function for cancel button, if needed.*/
	            var closeUpdateUsrName = $("#closeUpdateUsernameId");
	//			    if (getObj("closeUpdateUsernameId") != null && cancelBtnCallbackfn != 'undefined' && getObj("closeUpdateUsernameId") != 'undefined'){
		    	if (closeUpdateUsrName && cancelBtnCallbackfn !== 'undefined' && closeUpdateUsrName !== 'undefined'){
		    		closeUpdateUsrName.click(function(){
		    			commonUtils.closeUpdateUsernameDiv( cancelBtnCallbackfn );
		    		});
			    }
			    showNotes.show();//No I18N
			    mailsetCenter('shownotes');                    
	        }
	        else{
	            usernameNotNeeded.push(service);
	            callbackfn();
	        }
	    }
	});
}
	
	/**
	 * This method is used to check for the availability of the Username when the user updates new username. 
	 */		

commonUtils.checkUsernameAvailability = function(){
	var username = $('#username').val();//No I18N
	var alertForUsrName = $('#alertForShortUsername');
	alertForUsrName.hide();
	$('#usernameAlerts').hide().removeClass('green mT15 crmNegativeColor');//No I18N
	$('#usernamePatternFailed').hide();//No I18N
	if (username.length < 6 || username.length > 30 || !/^[A-Za-z0-9](.*[A-Za-z0-9])?$/.test(username))
	{
		alertForUsrName.show();
	    return false;
	}
	var posturl = Crm.getCrmBasePath() + "/UpdateUsername.do?action=checkUsernameAvailability"; //No I18N
	var param = "username=" + escape(username);//No I18N
	commonUtils.showHideLoadingDiv(true); //No I18N
	var reqPool = new crmRequestPool();
	reqPool.initiate({
	    "type": "POST",//No I18N
	    "url": posturl,//No I18N
	    "data": param,//No I18N
	    "dataType": "json",//No I18N
	    "success": function(data) {//No I18N
	        /*
	           USERNAME_ALREADY_TAKEN = "1004" //No I18N
	           USERNAME_ALREADY_NOT_TAKEN = "1007" //No I18N
	           USERNAME_ALREADY_TAKEN_CHECK_FAILURE = "1008"                
	           */
	    	commonUtils.showHideLoadingDiv();
	    	var usrNameAlert = $("#usernameAlerts");
	        if(data.result == '1004'){ 
	//		        usrNameAlert.empty();
	//              getObj('usernameAlerts').innerHTML = "\"" + username + "\" " +   getObj('usernameAlreadyTaken').innerHTML;     
		        usrNameAlert.html("\"" + $ESAPI.encoder().encodeForHTML(username) + "\" " +  $('#usernameAlreadyTaken').html()); //No I18N
		        usrNameAlert.addClass("crmNegativeColor mT15");//No I18N
		        usrNameAlert.show();            
		    }
	        else if(data.result == '1007')
	        {   
	//            	usrNameAlert.empty();
	//                getObj('usernameAlerts').innerHTML = "\"" + username + "\" " +   getObj('usernameAlreadyNotTaken').innerHTML; 
	            usrNameAlert.html("\"" + $ESAPI.encoder().encodeForHTML(username) + "\" " +  $('#usernameAlreadyNotTaken').html()); //No I18N
	            usrNameAlert.addClass("green mT15");//No I18N
	            usrNameAlert.show();     
	        }
	        else if(data.result == '1008'){
	        	$('#usernameAlreadyTakenError').show(); //No I18N      
	        }
	    },
	    error: function(){
	       /*if username doesnt match the regex, then intimate to user regarding the issue.*/
		   commonUtils.showHideLoadingDiv();
		   var showNotes = $("#shownotes");
		   showNotes.css("display","none");//No I18N
	       renderingUtils.removeFreezeLayer();
	//           getObj('shownotes').style.display = '';//No I18N
	//            showNotes.css("display"," ");//No I18N
	//           getObj('usernamePatternFailed').style.display = '';//No I18N
	//           $("#usernamePatternFailed").css("display"," ")//No I18N
	       renderingUtils.freezeBackground();                       
	       mailsetCenter('shownotes');            //No I18N
	   }
	});
}

	/**
	 * This method is used to display the Username as suggestions in a dropdown below the input fields
	 * @returns {void}
	 */
commonUtils.showUserNameHints = function() {//No I18N
	var objLeft = $('#usernameTable').get(0).offsetWidth + 8;
	$('#tempdiv').css({left:objLeft}).show();//No I18N
}


	/**
	 * This method is used to close the username div if the user decides to cancel the username update process.
	 * @param {Function} callbackFn - The callback method which is invoked when the user cancels the update process.
	 * @returns {void}
	 */
commonUtils.closeUpdateUsernameDiv = function(callbackFn){//No I18N
	$('#shownotes').hide(); 
	renderingUtils.removeFreezeLayer();
	if ( typeof callbackFn !== 'undefined' ){
	    callbackFn();
	}
}

	/**
	 * This method will update username, when user enter into any of the integration and if particular integration needs username
	 * @param {Function} callBackFn - This provides the callBack method which has to be invoked when xhr request is succesful.
	 * @param {String} service - This provides which type of service is made i.e, mail,projects,zdoc etc..
	 * @returns {void}
	 */
commonUtils.updateUsername = function(callBackFn, service){//No I18N
	// var asyncValue = true;
	var alertForShortUsername = $('#alertForShortUsername');
	var usernameAlerts = $('#usernameAlerts');
	//Commenting this when checked there no service calls with meeting present in the repo
	// if (service === 'meeting')
	// {
	//     asyncValue = false;
	// }
	alertForShortUsername.hide();//No I18N
	$('#usernamePatternFailed').hide();//No I18N
	usernameAlerts.hide().removeClass('green mT15 crmNegativeColor');//No I18N
	var username = $('#username').val();//No I18N
	if (username.length < 6 || username.length > 30 || !/^[A-Za-z0-9](.*[A-Za-z0-9])?$/.test(username))
	{
		alertForShortUsername.show();//No I18N
	    return false;
	}
	var posturl = Crm.getCrmBasePath() + "/UpdateUsername.do?action=updateUsername"; //No I18N
	var param = "username=" + escape(username) + "&" + csrfParamName + "=" + encodeURIComponent(csrfToken) + "&" + "service=" + service; //No I18N
	commonUtils.showHideLoadingDiv(true); //No I18N
	var reqPool = new crmRequestPool();
	reqPool.initiate({
	    "type": "POST",//No I18N
	    "url": posturl,//No I18N
	    "data": param,//No I18N
	    //eslint-disable-next-line @zoho/webperf/no-async-false
	    "async" : true,//No I18N
	    "dataType": "json",//No I18N
	    "success": function(data) {//No I18N
	    	commonUtils.showHideLoadingDiv();
	    	var showNotes = $('#shownotes');
	//            getObj('shownotes').style.display = 'none';//No I18N
	    	showNotes.css("display","none");//No I18N
	         renderingUtils.removeFreezeLayer();
	        /*if username was added successfully, then resend the request to zmailconfig.do */
	        if(data.result == '1002')
	        {
	//          var usernameNeeded = "";
	            callBackFn();
	        }
	        else if(data.result == '1004' || data.result == '1005')
	        {
	            /*invalid users and username already taken, have to reenter the username*/
	//                getObj('shownotes').style.display = '';
	        	usernameAlerts.html("\"" + $ESAPI.encoder().encodeForHTML(username) + "\" " +  $('#usernameAlreadyTaken').html()); 
	//                getObj('usernameAlerts').innerHTML = "\"" + username + "\" " +  getObj('usernameAlreadyTaken').innerHTML; 
			//eslint-disable-next-line @zoho/webperf/no-show
	            usernameAlerts.addClass("crmNegativeColor mT15").show();//No I18N
	            renderingUtils.freezeBackground();
	            mailsetCenter('shownotes');                  
	        }
	        else if(data.result == '1003')
	        {
	            /*on failure*/
	//            	showNotes.empty();
	//                getObj('shownotes').innerHTML =  getObj('usernameUpdationFailedMsg').innerHTML;
	        	showNotes.html($('#usernameUpdationFailedMsg').html())
	            showNotes.addClass('newPopup p30 crm-subheading-font-size').css({"zIndex" : "21" ,"position" : "absolute" })//No I18N
	//                getObj('shownotes').style.zIndex = 21;
	//                getObj('shownotes').style.position = 'absolute';
	            renderingUtils.freezeBackground();
	            mailsetCenter('shownotes');
	        }
	    },
	    "error": function(){//No I18N
			   /*if username doesnt match the regex, then intimate to user regarding the issue.*/
			var showNotes = $('#shownotes');
			commonUtils.showHideLoadingDiv();
	//            getObj('shownotes').style.display = 'none';
			showNotes.css("display","none");//No I18N
			renderingUtils.removeFreezeLayer();
	//			getObj('shownotes').style.display = '';
	//			getObj('usernamePatternFailed').style.display = '';
			renderingUtils.freezeBackground();                       
			mailsetCenter('shownotes');            
	    }
	});
}
	
	/**
	 * This method is used to convert an Array of id's or Strings as a Comma seperated String.
	 * @param {Array} ids - This provides the list of id's or strings that have to be converted as a comma seperated string.
	 * @returns {String} - It returns the list of strings as a single comma seperated string.
	 * @example 
	 * commonUtils.getArrayOfIdsAsCommaSeperatedString(["id1","id2","id3","id4"])
	 * => "id1,id2,id3,id4"
	 */
commonUtils.getArrayOfIdsAsCommaSeperatedString = function(ids){
	var noOfIds = ids.length;
	var stringOfIds = "";
	for(var i = 0;i < noOfIds;i++){
		stringOfIds = stringOfIds + ids[i];
		if(i !== noOfIds - 1){
			stringOfIds = stringOfIds + ",";
		}
	}
	return stringOfIds;
}

	/**
	 * This method is used to get the sandBox name if it is a sandbox account,Else it returns Org Name 
	 * @returns {String} - It returns either the sandBox name or OrgName as a string.
	 */
commonUtils.getOrgNameOrSandboxName = function(){
	if(Crm.userDetails.isSandbox) {
		return Crm.userDetails.sandboxName;
	}
	return commonUtils.getOrgNameForDisplay(Crm.userDetails.orgName, Crm.currentZgid);
}

	/**
	 * This method is used to return the orgName of the User.
	 * @param {String} orgName - This provides the name of the user for which the org Name has to be returned.
	 * @param {String} orgId - This provides the org Id of the user, in case if org Name is not found this will be returned.
	 * @returns {String} - It returns the orgName of the User as a string
	 * @example 
	 * //if the user OrgName is set as MOE
	 * commonUtils.getOrgNameForDisplay("MOE", "75566061")
	 * => "MOE" 
	 */
commonUtils.getOrgNameForDisplay=function(orgName, orgId){
	if(typeof orgName === 'undefined' || orgName.length < 0 || orgName === "-"){
		return "org"+orgId; // No I18N
	}
	return orgName;
}

	/**
	 * This method is used to convert the passed-in string into camelCase. i.e, capitalize first letter of each word. Note that need space in between the words.
	 * @param {String} str - This provides the string that has to be converted into a camelCase.
	 * @returns {String} - It returns the camelCase converted string.
	 * @example 
	 * commonUtils.toCamelCase("lowercase ttUppercase")
	 * => "Lowercase UpperCase"
	 */
commonUtils.toCamelCase = function(str) {
	if ( !str ) {
		return str;
	}
	if ( str.charAt(0) === '"' ) {//No I18N
		str = str.substring(1, str.length);
	}
	if ( str.charAt(str.length - 1) === '"' ) {//No I18N
		str = str.substring(0, str.length - 1);
	}
	if ( str.indexOf('(') !== -1 ) {
		return str;
	}
	if ( str.indexOf(' ') === -1 ) {//No I18N
		return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase();
	}
	var sA = str.split(' ');//No I18N
	var sALen = sA.length;
	str = '';//No I18N
	for ( var i = 0; i < sALen; i++ ) {
		if ( i > 0 ) {
			str = str + " ";//No I18N
		}
		str = str + sA[i].charAt(0).toUpperCase() + sA[i].substring(1, sA[i].length).toLowerCase();
	}
	return str;
}

	/**
	 * This method is used to copy the text that is present in a particular div 
	 * @param {HTMLElement} elem - This provides the element from which the text has to be copied.
	 * @param {String} text - This provides the text that is to be copied from the passed-in ID.
	 * @returns {void}
	 * @example 
	 * commonUtils.copyTextToClipBoard('accessUrlCopy', '<%=crmUrl+currentPortal + "/"%>')
     */
commonUtils.copyTextToClipBoard = function(elem, text) {
	var temp = document.createElement("input");
	document.getElementById(elem).appendChild(temp);
	temp.value = text;
	temp.select();
	document.execCommand("copy");// NO I18N
	temp.remove();
}
/** 
 * @param {String} text - just pass the text to copy
 */
commonUtils.copyNewlineTextToClipboard = function (text) { 
	let doc = document
	let temp = doc.createElement("textarea");// NO I18N
	doc.body.appendChild(temp);
	temp.value = text;
	temp.select();
	doc.execCommand("copy");// NO I18N
	temp.remove();
}



	/**
	 * This method is used to unload the module records.
	 * @param {String} moduleName - This provides the name of the module whose records are to be unloaded.
	 * @returns {void}
	 */
commonUtils.unloadModuleRecords = function( moduleName ){
	if( !moduleRecordMapping || !moduleName || !moduleRecordMapping[moduleName]){
		return
	}
	var fields = store.peekRecord("module",moduleRecordMapping[moduleName].id).fields; 
	fields = fields && Array.isArray(fields) ? Array.from(fields) : fields; //No I18n
	if(fields){
		fields.forEach(function(itm){
			store.unloadRecord("field",itm.id); //No I18n
		});
	}
}



	/**
	 * This method is used to remove the array of HTML elements that are passed as an argument to the method
	 * @param {Array} elements - This provides the array of HTML elements that are needed to be removed
	 * @returns {void}
	 */
commonUtils.removeElements = function(elements) {
	for (var elemLen = elements.length, index = 0; index < elemLen; index++) {
		elements[index].remove();
	}
}

     /**
      * This method is used to convert the passed-in base64 string into blob URL 
      * @param {String} b64Data - This provides the string that has to be converted into a blobURL.
	  * @param {String} contentType - This provides the contentType of the image.
      * @returns {String} - It returns the blob url converted string.
      * @example 
      * commonUtils.base64ToblobURL("iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4","image/png")
      * 
      */
commonUtils.base64ToblobURL = function(b64Data, contentType = '')
{
	    var sliceSize = 512;
		var byteCharacters = atob(b64Data);
	    var byteArrays = [];
	    var byteCharactersLen = byteCharacters.length;
	    for (var offset = 0; offset < byteCharactersLen; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);
		    var sliceLen = slice.length;
		    for (let i = 0; i < sliceLen; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, { type: contentType });
		var blobURL = URL.createObjectURL(blob);
		return blobURL;
}

/**
 * This method is used to get nextgen Help Url
 */
commonUtils.getNewHelpUrl = function(str){
	var url = crmConstants.helpUrl["help.domain.new.url"]+crmConstants.helpUrl[str];
	return url;
}
	/**
	 * This method is used to get the Help Url for different modules 
	 * @param {String} str - This provides the string or the module for which the help url has to be constructed.
	 * @returns {String} - This returns whole help url with the provided string or the modules.
	 * @example 
	 * commonUtils.getHelpUrl('help.create.new.contacts');
	 * => 'https://www.zoho.com/crm/help/contacts/create-contacts.html?src=product'
	 */
commonUtils.getHelpUrl = function(str){
	var url = crmConstants.helpUrl["help.domain.url"]+crmConstants.helpUrl[str];
	return url;
}
     /**
      * This method is used to get the developer docs for different menu.
      * @param {String} urlPathKey - This provides the string or the module for which the help url has to be constructed.
      * @returns {String} - This returns developer doc url with the provided string or the menu.
      * @example
      * commonUtils.getDeveloperDoc('help.developer.variables');
     */
commonUtils.getDeveloperDoc = function(urlPathKey) {
	return crmConstants.helpUrl["help.developer.docs.domain.url"]+crmConstants.helpUrl[urlPathKey];
}
commonUtils.getOldHelpUrl = function (urlPathKey) {
	return crmConstants.helpUrl["help.old.domain.url"]+crmConstants.helpUrl[urlPathKey];
}

	/**
	 * This method is used to get the route object which contains the route details and dynamic params 
	 * @param {Object} transition - This provides a object that contains the route details like the route name, Url etc.
	 * @returns {Object} - This returns a object that contains the route information , queryparams , data and also dynamicParams 
	 * @example
	 * commonUtils.getRouteObject(Lyte.Router.getRouteInstance().transition);
	 * =>{route:'crm.tab.module.begin',queryParams:{},data:{},dynamicParams:['Home']}
	 */

commonUtils.getRouteObject = function(transition) {
	var obj = Object.assign({}, transition.info);
	obj.data = transition.data;
	return obj;
}

/**
 * This method is used to set request Header for all the xhr requests , 'X-CRM-ORG' with corresponding Zgids
 * @returns {void}
 */
commonUtils.registerAjaxSendForOrgHeader = function() {
	$(document).ajaxSend(function(ev,jqXHR,settings){
		jqXHR.requestUrl = settings.url;
		var isSandboxDiffUrl = jqXHR.requestUrl.indexOf("sandbox/diff") !== -1 || jqXHR.requestUrl.indexOf("production/diff") !== -1;

		if(!settings.crossDomain && typeof crmZgid != 'undefined' && crmZgid && !isSandboxDiffUrl)
		{
			jqXHR.setRequestHeader('X-CRM-ORG', crmZgid);
		}
	});
}

	/**
	 * This method is used to bind the click events happening on the document , also this method accounts for the spotlight tracking and data permission 
	 * @returns {void}
	 */

commonUtils.bindDocumentEvents = function(){
	// Add listen event for document click.
	$(document).click(function(ev){
		var targetElem = ev.target ? ev.target : ev.srcElement;
		let isRadioComp = $(targetElem).closest("crux-grouper-radio-component").length ? true : false;
		if(Lyte.registeredMixins["business-hours-utils"] && Lyte.Router.getRouteInstance() && Lyte.registeredMixins["business-hours-utils"].CrmBusinessHours.routers.contains(Lyte.Router.getRouteInstance().routeName)){
			return;
		}
		//not processing for Radio field Click on social route
		if((Lyte.Router.getRouteInstance() && (["crm.tab.social.monitor","crm.tab.social.dashboard","crm.tab.social"].contains(Lyte.Router.getRouteInstance().transition.info.route)) && isRadioComp)){
			return;
		}
		if(Lyte.Router.getRouteInstance() && Lyte.Router.getRouteInstance().routeName === "crm.settings.section.modules.module.custom-link.index-custom-link"){
			return;
		}
		if(typeof customFunctionsObj !== 'undefined' && customFunctionsObj.delugeEditor.v2 && customFunctionsObj.language==='deluge' && customFunctionsObj.isEditorOpen()){
			return
		}
		var leftClick = $L.userAgent && ($L.userAgent.browser === "Mozilla" || $L.userAgent.browser === "Firefox") ?  ev.which === 1  : true; //NO I18N
		if((ev!==undefined && (Lyte.Router.getRouteInstance() && (Lyte.Router.getRouteInstance().routeName==='edit-map-dependency' || Lyte.Router.getRouteInstance().routeName==='create-map-dependency'))) && 
		((ev.target!==undefined) && ((ev.target.name!==undefined && ev.target.name.startsWith('depFields')) || (ev.target.id!==undefined && (ev.target.id === "next" || ev.target.id === "previous")) || (ev.target.parentElement!==undefined && ev.target.parentElement.name!==undefined && ev.target.parentElement.name.startsWith('depFields'))))) 
		{
				return;
			
  		 }
  		 if((Lyte.Router.getRouteInstance() && Lyte.Router.getRouteInstance().routeName==='detail') && ev !== undefined && ev.target !== undefined && ev.target.dataset !== undefined && ev.target.dataset.name !== undefined && ev.target.dataset.name === 'subform_timeline'){
               return;
         }
         	 
		if ((Lyte.Router.getRouteInstance() && Lyte.Router.getRouteInstance().routeName === 'map-modules' && //NO I18N
			(ev && ev.target  && ev.target.parentElement && ev.target.parentElement.id && ev.target.parentElement.id === 'toFieldMapping'))) {
			return;
		}
		
		if ((Lyte.Router.getRouteInstance() && Lyte.Router.getRouteInstance().routeName === 'map-fields' && //NO I18N
			(ev && ev.target && ev.target.parentElement && ev.target.parentElement.id && (ev.target.parentElement.id === 'fieldMapToReport' || (ev.target.parentElement._callee && ev.target.parentElement._callee.dataset ? ev.target.parentElement._callee.dataset.zcqa === 'backToModuleMapping' : false))))) {
			return;
		}

		if(!leftClick){
			return;
		}
		else if((ev.ctrlKey == true || ev.metaKey == true || ev.which == 2) && $(targetElem).attr("href") != undefined){
        	checkForWindowOpener(targetElem,ev);
			renderingUtils.stopEvent(ev);
		}
		else{
			if(window.getSelection().isCollapsed == false){
				if(ev.target.className !== "customCheckBox" && ev.target.className !== "customCheckBoxChecked" && (ev.target instanceof Element && !ev.target.closest(".crm_custom_checkbox"))){
					renderingUtils.stopEvent(ev);
					return false;
				}
			}
			var clickId = $(targetElem).attr("data-cid");
			if(!clickId){
				$(targetElem).parents().each(function(i,elem){
				clickId = $(elem).attr("data-cid");
				if(clickId){
					targetElem =  elem;
					return false;
				}
				});
			}
			var permission =$(targetElem).attr("data-permission");
			if(permission == "false"){
				if(targetElem.classList.contains("setting-list-td")){
					if(!featuresAvailable.NEXTGENUI_ENABLED){
						renderingUtils.displayPermissionDenied();
					}else{
						renderingUtils.displayPermissionDenied(null,null,I18n.getMsg("crm.security.error"),undefined,undefined,function(){
							Lyte.Router.getRouteInstance().transitionTo(Lyte.registeredMixins["crm-setup-mixin"].getFirstAvailableRouter()); //No I18n
						});	
					}
				}else{
					renderingUtils.displayPermissionDenied();
				}
				renderingUtils.stopEvent(ev);
				permissionDenied = true;
				return false;
			}
			var trackingMessage = $(targetElem).attr("crm-tracking-message");  // added for spotlight tracking

			if(trackingMessage){
				if(trackingMessage.includes(",")){
					try{
							var jsonobj = trackingMessage.substring(trackingMessage.indexOf(",")+1,trackingMessage.length);
							jsonobj = jsonobj.replace(/'/g,'"');
							var obj = JSON.parse(jsonobj);
							var message = trackingMessage.substring(0,trackingMessage.indexOf(","));
							Crm.trackSpotLightAction(message,obj);

						}catch(e){JS_LOGGER.log("Invalid JSON Parsing");}
				}
				else
					{
						Crm.trackSpotLightAction(trackingMessage);
					}
			}
			else{
				var $targetelem = $(targetElem);
				$targetelem.parents().each(function(i,elem){
					var trackingMessage = $(elem).attr("crm-tracking-message");
					if(trackingMessage){
						if(trackingMessage.includes(",")){
							try{
									var jsonobj = trackingMessage.substring(trackingMessage.indexOf(",")+1,trackingMessage.length);
									jsonobj = jsonobj.replace(/'/g,'"');
									var obj = JSON.parse(jsonobj);
									var message = trackingMessage.substring(0,trackingMessage.indexOf(","));
									Crm.trackSpotLightAction(message,obj);
	
								}catch(e){
									JS_LOGGER.log("Invalid JSON Parsing");
								}
						}
						else
							{
								Crm.trackSpotLightAction(trackingMessage);
							}
					}

				});  
			}

			if(clickId){
				//This is the place where a unconfigured clickId in clickEventIdVsMethodMapping
				//would Call Crm.addToHistory directly.

				//To seperate the Setup from the main App & to load the crmSetup.js only when the setup page/links are clicked - By selvi
				var data = $(targetElem).data("params");
				var caleeParams={};
				caleeParams.data=data;
				caleeParams.targetElem=targetElem;
				caleeParams.clickId=clickId;
				caleeParams.ev=ev;
				$("#next_action_activity_id").addClass('peNone');//temp fix for double prevention issue in next action section.
				if(typeof crmSetup == "undefined" && ((clickId=='tab'  && (data && data.module=="Setup") ) || (data &&  data.calleeObj == "crmSetup"))){
						networkUtils.loadFeatureScripts(["zohocrm_setup.js"], function(){//No I18N
						commonUtils.triggerClickHandlerBasedOnCalee(caleeParams);
					});
					return false;
				}
				else{
					var res = commonUtils.triggerClickHandlerBasedOnCalee(caleeParams);
					if(!res && clickId !== 'dummy'){
						return false;
					}
				}
			}

	        checkForWindowOpener(targetElem,ev);
			if(getElemById('FreezeLayer') != targetElem){
				hideMenu(ev,false);
			}
		}
	});
}

	/**
	 * This method is used to trigger the click handler based on the calee property defined on **data-params** attribute of the element in which the click event has been fired.
	 * @param {Object} params - This provides a object that contains the data , clickId , calee object etc using which the respective mapped methods are called.
	 * @returns {void}
	 */

commonUtils.triggerClickHandlerBasedOnCalee = function(params){
	 var data = params.data;
	 var targetElem = params.targetElem;
	 var clickId = params.clickId;
	 var resp;
	 if(data && data.calleeObj){
		var calleeObj = data.calleeObj;
		if( calleeObj !== "crmSetup"){
//			window[calleeObj].clickEventIdVsMethodMapping[clickId]
			if(window[calleeObj].clickHandler){
				window[calleeObj].clickHandler(params.ev,targetElem,clickId);
			}
			else{
				data.clickId = clickId;
				$(targetElem).attr("data-params",JSON.stringify(data));
				Lyte.registeredMixins["crm-utilities"].executeFunctionByName(window[calleeObj].clickEventIdVsMethodMapping[clickId],window,params.ev,targetElem);//No I18N
			}
		 }
		 else{
			data.clickId = clickId;
			$(targetElem).attr("data-params",JSON.stringify(data));
		 }
		 resp = false;
	 }
	 else{
		var handler = Crm.defaultObj;//Crm.delegateEventsTo[ev.type];
		var len = handler.length;
		for(var i=0;i<len;i++){
			if(window[handler[i]] && window[handler[i]].hasOwnProperty("clickHandler")){
				resp = window[handler[i]].clickHandler(params.ev,targetElem,clickId);
				if(!resp){
					break;
				}
			}
		}
	}
}

commonUtils.setErrVerifyContHeightToParent= function(element,applyPropToElem,isOnlyReset,prop='margin-bottom'){ //NO I18N
	let contArr,propClass='vr_mBAdded'; //NO I18N
	if(element){
		element=$(element);
	}
	let elementAsParam=element;
	if(prop==='padding-bottom'){
		propClass='vr_pBAdded'; //NO I18N
	}
	if(elementAsParam){
		contArr=elementAsParam.find('.vr_err_verify_container');
	}
	else{
		elementAsParam=false;
		contArr=$('.vr_err_verify_container');
	}
		contArr.toArray().forEach(function(elem){
			$(elem).css('top','');
			let isAddressField = $L(elem).closest('crm-addressfield').length>0;//NO I18N
			let isAddressFieldLineStyle= $L(elem).closest('.caf_activitiesParent').length>0;//NO I18N
			let qCShowMoreFields=$(elem).closest('#moreFieldSlider');  /* eslint-disable-line @zoho/webperf/directly-select-with-id */ //NO I18N
			let qCShowMoreFieldsLen=qCShowMoreFields.length;
			if(qCShowMoreFieldsLen>0 && qCShowMoreFields.css('display')==='none'){  /* eslint-disable-line @zoho/webperf/layout-thrashing */ //NO I18N
				qCShowMoreFields.css('display','block').addClass('vr_madeAsBlock');  //NO I18N
			}
			let eventShowMoreField=$L(elem).closest('#secDiv_Event_Additional_Information'); /* eslint-disable-line @zoho/webperf/directly-select-with-id */ //NO I18N
			let eventShowMoreFieldsLen=eventShowMoreField.length;
			if(eventShowMoreFieldsLen>0 && eventShowMoreField.css('display')==='none'){  /* eslint-disable-line @zoho/webperf/layout-thrashing */ //NO I18N
				eventShowMoreField.css('display','block').addClass('vr_madeAsBlock');  //NO I18N
			}
			if(isOnlyReset===false){
				let isAddressFieldNotTask = isAddressField && !isAddressFieldLineStyle;
				if(isAddressFieldNotTask){
					element=$(elem).closest('.cxElementValue');
					let labelElem=element.find('.cxElementLabel');
					let labelElemH=labelElem.outerHeight(true);/* eslint-disable-line @zoho/webperf/layout-thrashing */
					let fieldElem=element;
					let fieldElemH=fieldElem.outerHeight();/* eslint-disable-line @zoho/webperf/layout-thrashing */
					let errCont=element.find('.vr_err_verify_container');
					let errContH=errCont.outerHeight(true);/* eslint-disable-line @zoho/webperf/layout-thrashing */
					if(labelElemH>fieldElemH+errContH){
						return false;
						}
				}
				if($L(elem).closest('#VRAjaxEdit').length){ // eslint-disable-line @zoho/webperf/directly-select-with-id
					applyPropToElem = true;
					element = $L(elem).closest('.tabDivCreate').eq(0); // NO I18N
				}
				if(!applyPropToElem){
					element=$(elem).parent();
				}
				if(isAddressField){
					element=$(elem).closest('.crmFormComponentRow');
				}
				let obj={};
				obj[prop]='';
				let elemMbAdded=element.closest('.vr_mBAdded'); //NO I18N
				if(elemMbAdded.length>0){
					element=elemMbAdded.eq(0); 
				}
				let isSearchCreate= (element.closest('#searchCreatePopup').length>0); /* eslint-disable-line @zoho/webperf/directly-select-with-id */ //NO I18N
				element.css(obj); 
				let contHeight=$(elem).innerHeight();//eslint-disable-line @zoho/webperf/layout-thrashing
				if(contHeight>0){
					element.addClass(propClass); 
					let gapNeeded=0;
					if(!isSearchCreate){
						gapNeeded=parseInt(element.css(prop));
					}
					var lrDOM = elemMbAdded.find('.lrTaksModuleParentContainer');
					if(lrDOM.length > 0){
						gapNeeded += lrDOM.innerHeight() + 10;//eslint-disable-line @zoho/webperf/layout-thrashing
					}
					gapNeeded+=contHeight;
					element.css(prop,'');
					element.attr('style',(element.attr('style') || '')+prop+':'+gapNeeded+'px !important;'); //NO I18N
					
				}
			}
			else{
				let elemMbAdded=$(elem).parents('.vr_mBAdded');
				if(elemMbAdded.length>0){
					elemMbAdded.toArray().forEach(function(el){ 
					el = $(el);
					let elMbAdded=el.closest('.vr_mBAdded');  //NO I18N
						if(elMbAdded.length>0){
							el=elMbAdded.eq(0); 
						}
						el.css({'margin-bottom':''});  //NO I18N
					})
				}
				let elemPbAdded= $(elem).parents('.vr_pBAdded');
				if(elemPbAdded.length>0){
					elemPbAdded.toArray().forEach(function(el){ 
						el = $(el);
						let elPbAdded= el.closest('.vr_pBAdded'); //NO I18N
						if(elPbAdded.length>0){
							el=elPbAdded.eq(0); 
						}
						el.css({'padding-bottom':''}); //NO I18N
					})
				}
			}
			let elemWithGap= $(elem).closest('.vr_mBAdded,.vr_pBAdded'); //NO I18N
			let cssToSet='margin-bottom'; //NO I18N
			if(elemWithGap.hasClass('.vr_pBAdded')){ //NO I18N
				cssToSet='padding-bottom'; //NO I18N
			}
			let setVal= parseInt(elemWithGap.css(cssToSet));
			let defErr=elemWithGap.find('.errMsg:not(.vr_err_verify_container .errMsg):visible'); //NO I18N
			let formErrMsg=elemWithGap.find('.form_err_msg:visible'); //NO I18N
			let cruxAbsoluteErr= elemWithGap.find('crux-error-message:not(cxErrorMsgMultiLines) .cruxErrMsg');
			let isDetView= (defErr.closest('.DetailViewInnerPage,.dvScrollContainier').length>0); //NO I18N
			let isSearchCreate = (defErr.closest('#searchCreateDiv').length>0); /* eslint-disable-line @zoho/webperf/directly-select-with-id */ //NO I18N 

			let formErrMsgH=0,defErrH=0,cruxAbsoluteErrH=0;
			let lrTaksModuleParentContainer = elemWithGap.find('.lrTaksModuleParentContainer');
			let lrTaksModuleParentContainerH = 0;
			if(defErr.length){
				if(isDetView || isSearchCreate){ 
					defErrH=defErr.eq(0).outerHeight(true); //eslint-disable-line @zoho/webperf/layout-thrashing
				}
				else{
					defErrH=defErr.eq(0).height(); //eslint-disable-line @zoho/webperf/layout-thrashing
				}
			}
			if(lrTaksModuleParentContainer.length){
				lrTaksModuleParentContainerH = lrTaksModuleParentContainer.outerHeight() + 10; //eslint-disable-line @zoho/webperf/layout-thrashing
			}
			if(formErrMsg.length){
				formErrMsgH=formErrMsg[0].scrollHeight; //eslint-disable-line @zoho/webperf/layout-thrashing
			}
			if(cruxAbsoluteErr.length){
				cruxAbsoluteErrH=cruxAbsoluteErr.eq(0).outerHeight(true)+4;//eslint-disable-line @zoho/webperf/layout-thrashing
			}
				setVal=setVal+defErrH+formErrMsgH+cruxAbsoluteErrH;
				let topHeight=defErrH+formErrMsgH+cruxAbsoluteErrH+lrTaksModuleParentContainerH;
			if(topHeight>0 ){
				let elemTop='calc( 100% + '+topHeight+'px )'; //NO I18N
				let elemD = $(elem);
				elemD.css('top',elemTop); //NO I18N
				elemD.addClass('vr_topAdded'); //NO I18N
				elemWithGap.css(cssToSet,'');
				elemWithGap.attr('style',(elemWithGap.attr('style') || '')+cssToSet+':'+setVal+'px !important;'); //NO I18N
			}else{
				elemWithGap.css('top',''); //NO I18N
			}
			if(qCShowMoreFieldsLen>0 && qCShowMoreFields.hasClass('vr_madeAsBlock')){  //NO I18N
				qCShowMoreFields.css('display','none').removeClass('vr_madeAsBlock');  //NO I18N
			}
			if(eventShowMoreFieldsLen>0 && eventShowMoreField.hasClass('vr_madeAsBlock')){  /* eslint-disable-line @zoho/webperf/layout-thrashing */ //NO I18N
				eventShowMoreField.css('display','none').removeClass('vr_madeAsBlock');  //NO I18N
			}
		})
}



/**
 * This method is used to show error messages below the fields on validation 
 * @param {String} errMsg - This provides the error message to be displayed below the field.
 * @param {HTMLElement} Jelem - This provides the element below which the error message has to be displayed
 * @param {String} module - This provides the module in which the field is present 
 * @param {Boolean} fromCreatePopup - This is set to true if it is from create popup 
 * @param {Boolean} isComplexIdCase - This is set to true if it is a complex id case
 * @param {Boolean} checkBoxField - This is set to true if the error message is to be shown for a checkbox field
 * @param {Boolean} isSubformField - This is set to true if the field is of subform type.
 * @returns {void}
 * 
 */

commonUtils.showErrorMsg = function(errMsg, Jelem, module, fromCreatePopup,isComplexIdCase,checkBoxField,isSubformField) {
	    //Do not remove this delay... This delay is required, because the node insertion inside onblur may change the painting region and may cause trouble for the simulatenous click events that was initiated..
    setTimeout(function() {
		if(Jelem.data().addressfield && Jelem.data().uitype !== 777){
			let addressChildElement = Jelem[0].component;
			var cafLineComp = Jelem.closest(".caf_activitiesParent"); // No I18n
			addressChildElement.setData('cxPropErrorMessage',errMsg); // No I18n
			var cafUiType = Jelem.data().uitype;
			if((module === 'Tasks' || module === 'Meetings' || module === 'Events' )&& cafLineComp.length > 0){
				var cafErrElem = Jelem.find(".cafErrorSpan");
				var cafErrElemHeight = cafErrElem.outerHeight(true);
				var finalElem = Jelem;
				if(cafUiType === 38){
					finalElem = Jelem.closest(".cafCoordinatesWrap") // No I18n
					cafErrElemHeight += 20;
				}
				
				finalElem.css("marginBottom",cafErrElemHeight); // No I18n
				finalElem.addClass("caf_actErrorFld") ;// No I18n
				$('#saveEventsBtn').removeAttr('disabled');
			}
			if($(Jelem).find(".vr_err_verify_container").length > 0){
				commonUtils.setErrVerifyContHeightToParent(false,false,false);
			}
		} else {        var parentElem = Jelem.closest('tr');// No I18n
		CVRExec.showVerifyBtn(parentElem);
        var closestDiv = Jelem.closest("div");// No I18n
        // For Rich Text field component the error message need to be there in maximized view as well.
        if(Jelem.length > 0 && Jelem[0].tagName === 'CRM-RICHTEXT-COMPONENT') {
        	Jelem[0].component.setData('cxPropMaxErrorMsg',errMsg);
        }
        if(!isComplexIdCase){
            $(document.getElementById("errorMsg_" + Jelem.attr("id"))).remove();//NO I18N
            $(document.getElementById("errorMsg_" + Jelem.attr("id") + "_label")).remove();//NO I18N
        }
        else if(Jelem){
        	$("[id='errorMsg_"+Jelem.attr("id")+"']").remove();
        }
        var JelemClosest = Jelem.closest(".tabDiv,.tabDivCreate,.customDatefield");//No i18n
        if(closestDiv.attr("id") === "businesscardDtls"){
            JelemClosest = Jelem.closest(".tabdiv"); //No I18N
        }
        if(JelemClosest.length === 0){
            JelemClosest = Jelem;
        }
        JelemClosest.removeClass("errorFieldP");// No I18n
        var errSpn = document.createElement("span");
        
        $(errSpn).html(errMsg).css({"clear":"both","padding-bottom":"0px !important","color" : "var(--formBorderError)","font-size" : "11px","display" : "block","margin-top":"1px","padding-top":"0px !important"}).attr({"class" : "errMsg errorMsgDesc","id" : "errorMsg_" + Jelem.attr("id")});//.width(Jelem.width());// No I18N
       	
       // to show custom error icon
      if(Crm.userDetails.isAccessibilityConfigSupported && typeof Lyte.Service.getInjected('globalAccessibilityServices')!=='undefined'){
			//this.setData("accessibilityConfig",Lyte.Router.getRouteInstance(route).transition.data.accessibilityObj); //NO I18N
			 var accessibilityConfig = Lyte.Service.getInjected('globalAccessibilityServices').getVariable('accessibility'); //NO I18N
       		 if(accessibilityConfig.accessibility.vision.custom_error.alert_icon){
					var errIcon = document.createElement("span");
      		 		$(errIcon).attr({"class" : "zcicncss-warning-triangle zcicn-cssIcons pR top2 mR3 customErrorNegativeIcon"}); /*eslint-disable-line @zoho/zohocrm/no-deprecated-fnc*/
		       		errSpn.insertBefore(errIcon,errSpn.firstChild);
			 }
		}
      
       
        if(module === "Events"){
            $('#saveEventsBtn').removeAttr('disabled');
        }
        if(JelemClosest.length){
            JelemClosest.addClass("errorFieldP");// No I18n
        } 
        else if(Jelem.closest(".aggFldTabl").length){
        	parentElem.addClass("errorFieldP");// No I18n
        }
        else if(fromCreatePopup === true){
            parentElem.addClass("form_err_fld");// No I18n
            var errorDiv = Jelem.hasClass('cvFilter')? closestDiv : parentElem; // NO I18N
            errorDiv.append(errSpn);
        }
        var par = Jelem.parents("span");//no i18n
        var parId =  par.attr("id");//no i18n
        if(parId && parId.indexOf("header")!==-1){ //For BusinessCard part.
            var tdElem = par.parents("td").eq(0);// No I18n
			if(Jelem.closest('.businesscall.editModeEnable').length){
				tdElem = par.parents("lyte-td").eq(0);// No I18n 
			}
            $(errSpn).removeClass("errorMsgDesc");
            Jelem.addClass("errorHighlight");// No I18n
            tdElem[0].appendChild(errSpn);
        }
        else{
//            errSpn.innerHTML = errSpn.innerHTML;
            var jelemVar = Jelem.closest(".labelValCreate,.labelValTwo,.validErrMsg,.FValue.uploadDoc");//no i18n
            if(jelemVar && jelemVar.length===0 && checkBoxField){
                jelemVar = Jelem.closest(".tabDiv,.tabDivCreate").find('.labelValCreate');//no i18n
            }
            if(jelemVar && jelemVar.length === 0){
                jelemVar = Jelem.find('td');
                $(errSpn).css('position','relative');// No I18n
            }
            if(jelemVar && $("#multipleFieldsEditPop").length > 0 ){
                if( jelemVar.hasClass("labelValCreate") == true ){
                    jelemVar.append(errSpn).parent().addClass('form_err_fld');//no i18n
                }else{
                    var jelemVarLabelValCreate =  jelemVar.find(".labelValCreate");
                    if(jelemVarLabelValCreate.length > 0){
                    	jelemVarLabelValCreate.append(errSpn).parent().addClass('form_err_fld');//no i18n
                    } else{
                        jelemVar.append(errSpn).parent().addClass('form_err_fld');//no i18n
                    }
                }

            }else
			{
				if(jelemVar && Jelem.attr('id') && Jelem.attr('id').includes('ATTACHMENTID') && Lyte.registeredMixins['crm-create-init-mixin'].checkLyteConvertionSupport(module) &&  Jelem.attr('type') !==  'hidden')
				{
					Jelem.append(errSpn);
					jelemVar.parent().addClass('form_err_fld');//no i18n
				}
				else if(Jelem.data().addressfield){
					if(module === 'Tasks' || module === 'Events' || module === 'Calls'){
						Jelem.addClass('caf_actErrorFld');//no I18n
						$(errSpn).css('position','');
						parentElem.removeClass("errorFieldP");// No I18n
					}
					Jelem.append(errSpn);	
				}
				else
				{	
					if(jelemVar && Jelem.attr('id') && Jelem.attr('id').includes('MXNDUMMYCOLUMNBUNDLE')) {//no i18n
						jelemVar.append(errSpn)
					} else if(jelemVar){
							jelemVar.append(errSpn).parent().addClass('form_err_fld');//no i18n
					}
				}
			}
            if(isSubformField){
                crmTemplate.setSubformFocusBlurEvent(jelemVar);
            }
            if(module=='coborgName'){
                Jelem.closest(".labelValCreate").append(errSpn);//no i18n
            }
        }
        Jelem = null;
		commonUtils.setErrVerifyContHeightToParent(false,false,false);
	}
    }, 500);
}

/**
 * This method is used to show get the duplicate error message for the particular field which is passed to showErrorMsg to be displayed.
 * @param {Object} dupDetails - This provides the object that contains the module , fieldname and details to get the duplicate message.
 * @param {Boolean} isFromConvert - This is set to true if it is from convert and false if it aint
 * @param {Boolean} skipViewLink - This is set to true if it is for skipView link and false if not 
 * @param {Number} i - This provides the id or the field number which has to validated
 * @returns {String} - This returns the string of message that has to be displayed.
 */

commonUtils.getDuplicateErrorMsg = function(dupDetails, isFromConvert, skipViewLink,i) {

	i = i==undefined ? 0 : i;
	var fieldLabel = dupDetails.FIELDLABEL;
	var ownerName = dupDetails.OWNERNAME;
	var module = dupDetails.MODULE;
	var dupChkModule =dupDetails.DUPCHKMODULE !== undefined?dupDetails.DUPCHKMODULE:dupDetails.MODULE;
	var fullName =(dupChkModule!=="Leads"&&dupChkModule!=="Contacts")? (dupDetails.hasOwnProperty('RECORDS'))?dupDetails.RECORDS[0].ENTITYNAME:dupDetails.CONVERTEDRECORDS[0].ENTITYNAME:(dupDetails.hasOwnProperty('RECORDS'))?dupDetails.RECORDS[0].ENTITYNAMEFORPOPOVER:dupDetails.CONVERTEDRECORDS[0].ENTITYNAMEFORPOPOVER;
	//	var singularModLabel = Crm.userDetails.MODULE_LIST[dupChkModule].singular_label;
	fullName  = typeof fullName !== "string" ? 'null':fullName;//NO I18N
	var pluralModLabel = '';
	var singularModLabel = '';

	if(Crm.userDetails.MODULE_LIST[dupChkModule].plural_label) {
		pluralModLabel = Crm.userDetails.MODULE_LIST[dupChkModule].plural_label;
	} 
	else {
		pluralModLabel = Crm.userDetails.MODULE_LIST[dupChkModule].pluralLabel;
	}
	if(Crm.userDetails.MODULE_LIST[dupChkModule].singular_label) {
		singularModLabel = Crm.userDetails.MODULE_LIST[dupChkModule].singular_label;
	} 
	else {
		singularModLabel = Crm.userDetails.MODULE_LIST[dupChkModule].singularLabel;
	}
	var i18nFieldLabel = dupDetails.ISCF=="1" ? fieldLabel : I18n.getMsg(fieldLabel, [singularModLabel]);
	if(dupDetails.hasOwnProperty("i18nFieldLabel")) {
		i18nFieldLabel = dupDetails.i18nFieldLabel;
	}
	var dupErrMsg = isFromConvert ? '' : (I18n.getMsg('crm.duplicate.value.not.allowed') + ' ');
	var entId = dupDetails.RECORDS[0].ENTITYID;
	var modId = moduleRecordMapping[dupChkModule] ? moduleRecordMapping[dupChkModule].id : undefined;
	if(modId){
		var _fld = store.peekRecord('module',modId).display_field;//no i18n
		var entityRecord = store.peekRecord(modId,entId);
		if(entityRecord){
			fullName = _fld.api_name == 'Full_Name' && entityRecord.Salutation ? entityRecord.Salutation+" "+entityRecord[_fld.api_name] : entityRecord[_fld.api_name];	
		}else{
			store.findRecord(modId,entId,{approved : 'both',converted : 'both'}).then(function(succResp){//no i18n
				fullName = succResp[0] ? (_fld.api_name == 'Full_Name' && succResp[0].Salutation ? succResp[0].Salutation+" "+succResp[0][_fld.api_name] : succResp[0][_fld.api_name]) : fullName;
			});
		}	
	}
	if(dupDetails.COUNT == "1" || (dupDetails.COUNT != "1" && !Crm.userDetails.permissions['Crm_Implied_Merge_'+dupChkModule]))
	{
	    dupErrMsg += I18n.getMsg("crm.duplicate.value.available", [I18n.getMsg(singularModLabel).toLowerCase(), i18nFieldLabel]);	//No I18N
		dupErrMsg = $ESAPI.encoder().encodeForHTML(dupErrMsg)
		if ( !skipViewLink )
		{
			var urlEntityInfo = Crm.getCrmBasePath() + "/EntityInfo.do?module="+dupChkModule+"&id="+entId;//No I18N
			urlEntityInfo = networkUtils.getPortalURL(urlEntityInfo);
			dupErrMsg += " <a data-zcqa='viewExistingRecord' class='viewExistingRecordQuickInfo' id='viewExistingRecordQuickInfo"+i+"' onmouseleave=\"Crm.dontHideQuickInfoPop(event);\" onmouseenter=\"Crm.showExistingEmailQuickInfo('"+$ESAPI.encoder().encodeForJavaScript(fullName)+"'"+','+"'"+$ESAPI.encoder().encodeForJavaScript(ownerName)+"'"+','+"'"+$ESAPI.encoder().encodeForJavaScript(dupDetails.ZUID)+"'"+','+"'"+$ESAPI.encoder().encodeForJavaScript(singularModLabel)+"'"+','+"'"+i+"',this)\" rel='noopener noreferrer' target='_blank' href='"+urlEntityInfo+"'>"+I18n.getMsg("crm.view.record", I18n.getMsg($ESAPI.encoder().encodeForHTML(singularModLabel)))+"</a>";	//No I18N
		}
	}
	else
	{
		dupErrMsg += I18n.getMsg("crm.duplicate.value.available.multiple", [I18n.getMsg(singularModLabel).toLowerCase(), i18nFieldLabel]);	//No I18N
		dupErrMsg = $ESAPI.encoder().encodeForHTML(dupErrMsg)
		if ( !skipViewLink )
		{
		//	var urlEntityDuplicate = Crm.getCrmBasePath() + "/EntityDuplicate.do?module="+$ESAPI.encoder().encodeForHTML(dupChkModule)+"&id="+entId+"&newTab=yes&findDupFldName="+$ESAPI.encoder().encodeForHTML(fieldLabel);//No I18N
		//	urlEntityDuplicate = networkUtils.getPortalURL(urlEntityDuplicate);
			dupErrMsg += ' <link-to lt-prop-target="_blank" lt-prop-route="crm.tab.module.entity.find-and-merge" lt-prop-qp=\'{"findDupFldName" :"'+$ESAPI.encoder().encodeForHTML(fieldLabel)+'"}\'    lt-prop-dp=\'["'+dupChkModule+'","'+entId+'"]\'>'+I18n.getMsg("crm.label.module.merge", I18n.getMsg($ESAPI.encoder().encodeForHTML(pluralModLabel)))+'</link-to>';//No i18n
		}
	}
	return dupErrMsg
}

/**
 * This method is used to hide the duplicate error message that has been displayed.
 * @param {String} formName - This provides the name of the form in which the duplicate error message has to be hidden 
 * @returns {void}
 */

commonUtils.hideDuplicateErrorMsg = function(formName) {
	var errMsgObj;
	if(formName) {
		errMsgObj = $("form[name="+formName+"] [id^='errorMsg_']");
	}
	else {
		errMsgObj = $("[id^='errorMsg_']");
	}
	if(errMsgObj.length > 0)
	{
		for(var i=0; i< errMsgObj.length; i++)
		{
			var elemId = errMsgObj[i].id;
			$("#"+elemId.replace("(", "\\(").replace(")", "\\)")).remove();
			var id = elemId.substring(elemId.indexOf("_")+1).replace("(", "\\(").replace(")", "\\)");
			var elemObj = $('#'+id);
			if(!elemObj || elemObj.length===0) {
				elemObj = $("[name='"+id+"']");
			}
			elemObj.removeClass("errorHighlight").css({"border-color" : ""});	//No I18N
		}
	}
}

/**
 * This method is used to get the name of the module lookup 
 * @param {String} module - This provides the name of the module for which the lookup name has to be returned.
 * @returns {String} - This returns the lookup name of the module that has been passed.
 */
commonUtils.getLookupIdName = function(module) {

	var lookupIdName = null;
	var lookupIdObj = {
		Accounts : "actName",// No I18N
		Contacts : "contactName",// No I18N
		Potentials : "potentialName",// No I18N
		Campaigns : "campName",// No I18N
		Products : "prodName",// No I18N
		Solutions : "solutionName",// No I18N
		PriceBooks : "priceName",// No I18N
		Cases : "caseName",// No I18N
		Leads : "leadName",// No I18N
		Vendors : "vendorName",// No I18N
		Invoices : "invoiceName",// No I18N
		PurchaseOrders : "purchaseorder",// No I18N
		SalesOrders : "salesorder",// No I18N
		Quotes : "quoteName",// No I18N
		Services:"ServiceName",// No I18N
		Appointments: "AppointmentName",//No I18n
		Unknown: "UnknownName" // No I18n
	};
	if(module.indexOf("CustomModule") !== -1){
    	lookupIdName="customModule"// No I18N
    }
    else if (lookupIdObj[module]) {
		lookupIdName = lookupIdObj[module];
	}

	return lookupIdName;
}

/**
 * This method is used to round the provided value with the number of decimals provided 
 * @param {Number} value - This provides the number that has to be rounded
 * @param {Number} decimals - This provides the number of decimal values to be present in the output 
 * @returns {Number} - This returns the rounded number with appropriate decimal values 
 * @example
 * commonUtils.roundNumber(220.999,2)
 * => 221.00
 * commonUtils.roundNumber(220.11212,2)
 * => 220.11
 * 
 */
commonUtils.roundNumber	=	function(value, decimals)	{	
	return (Math.round((value*Math.pow(10,decimals)).toFixed(decimals))/Math.pow(10,decimals)).toFixed(decimals);
}

/**
 * This method is used to escape the single quotes present in the string that has been passed in 
 * @param {String} val - This provides the string in which the single quotes has to be replaced.
 * @returns {String} - This returns the string after escaping the quotes
 * commonUtils.escapeSingleQuote("'hii'")
 * => "\\'hii\\'"
 */
commonUtils.escapeSingleQuote = function(val){
	return val.replace(/'/g,'\\\'');
}

	/**
	 * This method is used to validate the values present within a field of type email.
	 * @param {String} fldName - This provides the value present within the field which has to be validated
	 * @param {String} fldLabel - This provides the label or name of the field that has to be validated 
	 * @param {String} fldType - This provides the type of the field that has to be validated
	 * @param {String} formName - This provides the form name within which the field value has to be validated 
	 * @param {String} alertType - This provides the type of alert whether it is inline or Custom Alert Message
	 * @returns {Boolean} - If it is empty it returns true else false
	 */

commonUtils.emptyCheck = function(fldName,fldLabel, fldType,formName, alertType,skipAlert,isAlertNeeded=true, translatedFieldLabel) {
		var currObj = fldName;
		if(fldName != null && typeof fldName == "string"){

			currObj = getElm(formName,fldName);
		}
		if(currObj != null && currObj.length >1 && currObj[0].type=='radio'){
			for (var i=0; i < currObj.length; i++){
				if (currObj[i].checked){
					currObj = currObj[i];
				}
			}
		}
		if(currObj && currObj.className && currObj.className.indexOf("MXNDUMMYCOLUMNBUNDLE") > -1) {
				var bunCurrObj = $L("#"+currObj.className)
				var associatedProducts = bunCurrObj.data('finalResponse') ? bunCurrObj.data('finalResponse') : [] //no i18n
				if(associatedProducts && associatedProducts.length < 2) {
					if(isAlertNeeded) {
						var alertMessage = associatedProducts.length > 0 ? I18n.getMsg('bundles.minimum.product.check',["2",moduleRecordMapping.Products.plural_label,moduleRecordMapping.Bundles.singular_label]) : I18n.getValueForFields("crm.field.empty.check",(translatedFieldLabel ? translatedFieldLabel : fldLabel));
						commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(alertMessage),$(currObj));
					}
						return false;
				}
				currObj = bunCurrObj
		}
		
		if(currObj &&  currObj.className && currObj.className.indexOf("BUNDLECODE") > -1) {
			var val = currObj.value;
			if(val && val.includes(" ")) {
				if(isAlertNeeded) {
					commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(I18n.getValueForFields("bundles.field.space.alert",(translatedFieldLabel ? translatedFieldLabel : fldLabel))),$("."+currObj.id));//no i18n
				}
				return false;
			}
		}
		if((currObj != null && fldType && (currObj.value == "" || (currObj.tagName === 'CRM-RICHTEXT-COMPONENT' && currObj.component.getTextValue().replace(/^\s+/g, '').replace(/\s+$/g, '').length === 0) || (fldType=='combo' && currObj.value == "none"))) && !currObj.disabled){		
		if(isAlertNeeded){
			if(!skipAlert){
				_cruxUtils.showCustomAlert({ params : { ltPropPrimaryMessage : I18n.getValueForFields("crm.field.none.check",(translatedFieldLabel ? translatedFieldLabel : fldLabel)) } });//No I18N
			}
			currObj.setAttribute("autocomplete","off");
			try{
	           	currObj.focus()
			}
			catch(e){
				murphy.error(e);
			}
			}
            return false;
        }
		if ((currObj != null && ((currObj.value != null && currObj.value.replace(/^\s+/g, '').replace(/\s+$/g, '').length==0) || (currObj.tagName === 'CRM-RICHTEXT-COMPONENT' && currObj.component.getTextValue().replace(/^\s+/g, '').replace(/\s+$/g, '').length === 0))) && !currObj.disabled){
			if(isAlertNeeded){
			if(!skipAlert){
				var alertMsg = I18n.getValueForFields("crm.field.empty.check",(translatedFieldLabel? translatedFieldLabel : fldLabel)); //No I18N
				if(alertType === 'inline'){
					if($(currObj).closest('.labelValCreate').length || $(currObj).closest('.validErrMsg').length){
						commonUtils.showErrorMsg($ESAPI.encoder().encodeForHTML(alertMsg),$(currObj));
					}
					else{
						renderingUtils.displayErrorDiv( typeof fldName === "string" ? fldName : fldLabel, undefined, alertMsg,currObj);//No I18N
					}
				}
				else{
					crmui.showMsgBand("error",$ESAPI.encoder().encodeForHTML(alertMsg),3000,"");//No I18N
				}
			}
			currObj.setAttribute("autocomplete","off");
	        try{
	        	currObj.focus()
			}
			catch(e){
				murphy.error(e);
			}
			}
			return false

		}
		else{
			return true;
		}
}

	/**
	 * This method is used to convert the formdata to a query string 
	 * @param {HTMLElement} docForm - This provides the entire form from which the values has to be converted to a query string 
	 * @param {String} module - This provides the name of the module in which the from is present.
	 * @param {Boolean} skipnamecheck - This is set to true if the form name check is needed to be skipped , that is if the form doesnt have a name
	 * @param {Boolean} checkLRActions - This is set to true if ther is any layout rule actions present
	 * @returns {String} - This returns the query string with all the necessary form data.
	 */

commonUtils.formData2QueryString = function(docForm, module, skipnamecheck,checkLRActions){

        var strSubmit = '';
        var formElem;
        var labelchk="Home";//No I18N
        if(module!=undefined){
        	labelchk = module.toUpperCase().substring(0,(module.length-1))+"CF";//No I18N
        }
		var isLRCreate = $L('#createFormRulePopup').is(':visible'); //No I18N
        var re=new RegExp("^"+labelchk);
        var re1=new RegExp("^comboValue");
		var isRecordStateCondApplied = false;
        for (var i = 0; i < docForm.elements.length; i++) {
            formElem = docForm.elements[i];
            if(checkLRActions){
            	var columData = $(formElem).data();
            	if(CFRExec  && validationUtils.isNotEmpty(CFRExec.QCObj) && columData){
            		if(columData.colname && CFRExec.isLayoutRuleHiddenElem( columData.colname )){
            			continue;
            		}
            	}
        	}
            var ifCondnChkvar=true;
            if(!skipnamecheck){
				if((formElem.name === 'property(Products in Bundle)' || formElem.name === 'property(prodName:Products in Bundle)') && formElem.className === 'Crm_Bundles_MXNDUMMYCOLUMNBUNDLE') {
					var bundleData = $L("#"+formElem.className).data()
					formElem.value = formElem.name === 'property(Products in Bundle)' ? JSON.stringify(bundleData.finalResponse) : bundleData.selectedid
				} else {
	            	ifCondnChkvar = (formElem.name != 'gsitesList' && formElem.name != 'gsitesName' && formElem.name != 'isShareGsite' && formElem.name != 'fieldname' && formElem.name !='dateFields' && formElem.name != 'fieldlabel' && formElem.name != 'fielddatatype' && formElem.name != 'picklistFields' && formElem.name != 'fieldvalues'  && formElem.name != 'mapValues' && formElem.name != 'fieldName' && formElem.name != 'fieldLabel' && formElem.name != 'fieldDatatype' && formElem.name != 'fieldUitype' && formElem.name != 'fieldId' && formElem.name != 'fieldTableName' && formElem.name != 'fieldLen' && formElem.name != 'dtPtn' && formElem.name != "hdnRowStatus1" && formElem.name != 'focusid' &&formElem.name.indexOf('uiType_')<0 && formElem.name != "" && formElem.name != 'radiobtn' && formElem.name != 'hostSearch' && formElem.name != "territoryOwnerName" && formElem.name != 'banner_countrySelect' && formElem.name != 'banner_editionSelect' && !formElem.name.endsWith('_visible') && formElem.name !== 'servstatcat' && formElem.name != 'skipSubmission'); //No I18N
	        	}
	        	if(module!=undefined){
	            	ifCondnChkvar = (formElem.name != 'gsitesList' && formElem.name != 'gsitesName' && formElem.name != 'isShareGsite' && formElem.name != 'fieldname' && formElem.name !='dateFields' && formElem.name != 'fieldlabel' && formElem.name != 'fielddatatype' && formElem.name != 'picklistFields' && formElem.name != 'fieldvalues'  && formElem.name != 'mapValues' && formElem.name != 'fieldName' && formElem.name != 'fieldLabel' && formElem.name != 'fieldDatatype' && formElem.name != 'fieldUitype' && formElem.name != 'fieldId' && formElem.name != 'fieldTableName' && formElem.name != 'fieldLen' && formElem.name != 'dtPtn' && formElem.name != "hdnRowStatus1" && formElem.name != 'focusid' && formElem.name.indexOf('uiType_')<0 && !re.test( formElem.name ) && !re1.test( formElem.name ) && formElem.name != "" && !formElem.name.endsWith('_visible')); //No I18N
	        	}
            }
            else{
            	ifCondnChkvar=(formElem.name != "");
            }
            if(ifCondnChkvar){
				switch (formElem.type) {
					// Text, select, password, textarea, number elements
					case 'number':
					case 'text':
					case 'select-one':
					case 'password':
					case 'textarea':
						var elemValue = formElem.value;
						var $formElem = $(formElem);
						if($formElem.data('uitype') == 33){
							elemValue = commonUtils.getValue($formElem);
						}
						if(elemValue === "Record Category"){
							isRecordStateCondApplied = true;
						}
						if(formElem.name.match(/[0123456789]/) !== undefined && formElem.name.match(/[0123456789]/) !== null){
							var index =  formElem.name.indexOf(formElem.name.match(/[0123456789]/)[0]);
							if(isLRCreate && formElem.name.startsWith("searchpicklist") && isRecordStateCondApplied){
								var isRSField = $("#searchfield"+formElem.name.substring(index)).find(':selected').attr('is-record-category-field'); //No I18N
								if((isRSField !== undefined) && (isRSField === "true")){
									var eleArr = elemValue.split(',');
									if(eleArr.length){
										eleArr.forEach(function(state, index){
											eleArr[index] = state.startsWith("${CATEGORY.") ? state : "${CATEGORY."+state+"}"; //No I18N
										});
									}
									//elemValue = elemValue.startsWith("${CATEGORY.") ? elemValue : "${CATEGORY."+elemValue+"}"; //No I18N
									elemValue = eleArr.toString();
								}
							}
							if((!formElem.name.startsWith("searchfield") && !formElem.name.startsWith("property"))&& $("#searchfield"+formElem.name.substring(index)).find(':selected').attr('data-enc') !== undefined && $("#searchfield"+formElem.name.substring(index)).find(':selected').attr('data-enc') === "true"){
								if(formElem.name.startsWith("enc_")){
									var names = formElem.name.substring(formElem.name.indexOf("enc_")+4);
									strSubmit += encodeURIComponent(names) + '=' + encodeURIComponent(trimBoth(elemValue)) + '&';
								}
								else if(!(formElem.name.indexOf("condition") > -1 || formElem.name.indexOf("search") > -1 )){
									strSubmit += encodeURIComponent(formElem.name) + '=' + encodeURIComponent(trimBoth(elemValue)) + '&';
								}
							}
							else{
								strSubmit += encodeURIComponent(formElem.name) + '=' + encodeURIComponent(trimBoth(elemValue)) + '&';
							}
						}
						else{
							strSubmit += encodeURIComponent(formElem.name) + '=' + encodeURIComponent(trimBoth(elemValue)) + '&';
						}
					break;
	
					case 'hidden':
						strSubmit += encodeURIComponent(formElem.name) + '=' + encodeURIComponent(formElem.value) + '&'; //No need to trim the values of hidden Element
					break;
	
					case 'checkbox':
					case 'radio':
						if ( formElem.checked ){
							if(docForm.name == "zloginForm") { strSubmit += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'; } else {
								strSubmit += encodeURIComponent(formElem.name) + '=' + encodeURIComponent(formElem.value) + '&';
							}
						}
					break;
	       			}
			}
        }
        return strSubmit;
}

commonUtils.changeToPreviousRoute = function()
{
	if ( featuresAvailable &&  featuresAvailable.NEXTGENUI_ENABLED && Lyte.registeredMixins["crm-setup-mixin"] ) 
	{
		let previousRoute = Lyte.registeredMixins["crm-setup-mixin"].getLastAccessedRouter()  ; //NO I18N
		Lyte.Router.getRouteInstance().transitionTo( previousRoute ); 
	}
} 
  /* shreddercss dynamicselectors #createEntityForm */
  /* shreddercss dynamicselectors .vr_mBAdded */
  /* shreddercss dynamicselectors .vr_pBAdded */

  
  
 //Murphy lyte exception handler

commonUtils.murphyLyteErrorRegex = {};
commonUtils.murphyLyteErrorMsg = {};

commonUtils.murphyLyteErrorMsg.lyteErrorMessages = {
    "LD01": "Primary key value might be missing in the response data that is received, {0}",//NO I18N
    "LD02": "{0} - {1} is not registered",//NO I18N
    "LD03": "Cannot set the error {0} for {1}",//NO I18N
    "LD04": "No such record to merge, {0}",//NO I18N
    "LD05": "Model( {0} ) of related property - {1} not found in model - {2}",//NO I18N
    "LD06": "Backward relation not present in model( {0} ), for the property {1} of model( {2} )",//NO I18N
    "LD07": "{0} type not handled in handleArrayOperations",//NO I18N
    "LD08": "{0} {1} will be deprecated from next version {2}",//NO I18N
    "LD09": "deserializeKey cannot be processed for payload with more than two keys. Please use payloadKey callback instead or try modifying the same in normalizeResponse callback",//NO I18N
    "LD10": "Response data not in a format lyte data store expects",//NO I18N
    "LD11": "Deprecation Warning! findRecord response payload will not accept an array. It will be deprecated from the next version",//NO I18N
    "LD12": "Response ( {0} ) is not in a format, lyte data store expects",//NO I18N
    "LD13": "Response processing failed in {0} for model-{1} {2}, since invalid data is received in {1}(modelName) key of the data",//NO I18N
    "LD14": "Cannot register {0} - {1}, as it already exists.",//NO I18N
    "LD15": "Primary key value might be missing in the response data that is received, {0}",//NO I18N
    "LD16": "Record merge failed for the record in model - {0} with primaryKey value - {1}, since either the persisted(saved) primary key value for a newly created record is not received from server or not in the proper structure to merge",//NO I18N
    "LD17": "Record with the primary key value already exists",//NO I18N
    "LD18": "No { 0 } present",//NO I18N
    "LD19": "Deprecation Warning! findAll will not accept response payload values other than an array or any empty value. Current implementation which allows this will be deprecated from the next version",//NO I18N
    "LD20": "Record cannot be saved as a state, when it is not either a new or a modified record or in a error state.",//NO I18N
    "LD21": "No such state ( {0} ) saved for the record.",//NO I18N
    "LD22": "For create / createRecord, response with a primary key value should be received",//NO I18N
    "LD23": "PrimaryKey field {1} in {0} cannot have default value",//NO I18N
    "LD24": "Response couldn't be parsed, {0}",//NO I18N
    "LD25": "Cannot create record for the data - {0}",//NO I18N
    "LD26": "Only one baseKey is allowed for a model",//NO I18N
    "LD27": "Record merge failed, since the data passed is invalid - {0}",//NO I18N
    "LD28": "Record merge failed for the model - {0}, since a valid primary key value is not found in the data to be merged - {1}",//NO I18N
    "LD29": "Unloaded record-{0} of the model-{1} is being saved",//NO I18N
    "LD30": "Variable value in query is mandatory for {0}",//NO I18N
    "LD31": "Datatype defined for {0} is mismatch with the value's datatype",//NO I18N
    "LD32": "Query '{0}' was not registered for the model '{1}'",//NO I18N
    "LR400": "url '{0}' is not defined in router.",//NO I18N
    "LR400A": "Base path of url is not specified.",//NO I18N
    "LR422": "There is no route definition for the route {0}.",//NO I18N
    "LR498": "Invalid argument {0}",//NO I18N
    "LR498A": "Invalid argument {0} provided in {1}.",//NO I18N
    "LR499": "Dynamic params for the route {0} is not provided.",//NO I18N
    "LR499A": "Dynamic params for the route {0} is not provided {1}.",//NO I18N
    "LR499B": "Transition tried without arguments.",//NO I18N
    "LR405": "Method invocation before Router initialized.",//NO I18N
    "LR428": "There is no outlet named {0}.",//NO I18N
    "LR420A": "Error in {0} of route {1}.",//NO I18N
    "LR420": "Promise rejected",//NO I18N
    "LR424": "File not loaded in getDependencies of route {0}",//NO I18N
    "LC001": "Error while parsing custom prop handler attribute {0}. Check if the value provided is a valid JSON",//NO I18N
    "LC002": "{0} Component is not compiled. Please compile using Lyte CLI",//NO I18N
    "LC003": "Helper named {0} is not defined",//NO I18N
    "LC004": "Action named {0} doesn't exists",//NO I18N
    "LC005": "Lyte.objectUtils doesn't support {0} function",//NO I18N
    "LC006": "Lyte.arrayUtils doesn't support {0} function",//NO I18N
    "LC007": "Component name not specified in Lyte.Component.render",//NO I18N
    "LC008": "Specified outlet {0} doesn't exists - Lyte.Component.render",//NO I18N
    "LC009": "Method named {0} doesn't exists in {1} component",//NO I18N
    "LC010": "Parent Node / reference Node not provided for insertBefore method",//NO I18N
    "LC011": "Error in promise provided in initialize function of data '{0}' of {1} component"//NO I18N
};

commonUtils.murphyLyteErrorRegex.LRArray = [
    { code: "LR400", msg: /url (.*?) is not defined in router\.$/ },//NO I18N
    { code: "LR400A", msg: /Base path of url is not specified\.$/ },//NO I18N
    { code: "LR422", msg: /There is no route definition for the route (.*?)\.$/ },//NO I18N
    { code: "LR424", msg: /File not loaded in getDependencies of route (\S+)\s*(.*)$/},//NO I18N
    { code: "LR498A", msg: /Invalid argument (.*?) provided in (.*?)$/ },//NO I18N
    { code: "LR498", msg: /Invalid argument (.*?)\.$/ },//NO I18N
    { code: "LR499", msg: /Dynamic params for the route (.*?) is not provided\.$/ },//NO I18N
    { code: "LR499A", msg: /Dynamic params for the route (.*?) is not provided in (.*?)$/ },//NO I18N
    { code: "LR499B", msg: /Transition tried without arguments\.$/ },//NO I18N
    { code: "LR405", msg: /Method invocation before Router initialized\.$/ }, // no msg found //NO I18N
    { code: "LR428", msg: /There is no outlet named (.*?)\.$/ },//NO I18N
    { code: "LR420A", msg: /Error in (.*?) of route (.*?)\.$/ },//NO I18N
    { code: "LR420", msg: /Promise rejected\.$/ } //no match //NO I18N
];


commonUtils.murphyLyteErrorRegex.LDArray  = [
    { code: "LD01", msg: /Primary key value might be missing in the response data that is received, (.*?)\.?$/ },//not found //NO I18N
    { code: "LD02", msg: /(.*?) - (.*?) is not registered\.?$/, errorCodeHasStartArgument:true},//NO I18N
    { code: "LD03", msg: /Cannot set the error (.*?) for (.*?)\.?$/},//not found //NO I18N
    { code: "LD04", msg: /No such record to merge, (.*?)\.?$/},//ask vinu anna //NO I18N
    { code: "LD05", msg: /Model\( (.*?) \) of related property - (.*?) not found in model - (.*?)\.?$/},//NO I18N
    { code: "LD06", msg: /Backward relation not present in model\( (.*?) \), for the property (.*?) of model\( (.*?) \)\.?$/},//not found //NO I18N
    { code: "LD07", msg: /(.*?) type not handled in handleArrayOperations\.?$/,errorCodeHasStartArgument:true},//not found //NO I18N
    { code: "LD08", msg: /(.*?) (.*?) will be deprecated from next version (.*?)\.?$/, errorCodeHasStartArgument:true},//not found //NO I18N
    { code: "LD09", msg: /deserializeKey cannot be processed for payload with more than two keys. Please use payloadKey callback instead or try modifying the same in normalizeResponse callback\.?$/},//not found //NO I18N
    { code: "LD10", msg: /Response data not in a format lyte data store expects\.?$/},//not found //NO I18N
    { code: "LD11", msg: /Deprecation Warning! findRecord response payload will not accept an array. It will be deprecated from the next version\.?$/},//not found //NO I18N
    { code: "LD12", msg: /Response \( (.*?) \) is not in a format, lyte data store expects\.?$/},//not found //NO I18N
    { code: "LD13", msg: /Response processing failed in (.*?) for model-(.*?) (.*?), since invalid data is received in (.*?)\(modelName\) key of the data\.?$/},// found // ask vinu anna //NO I18N
    { code: "LD14", msg: /Cannot register (.*?) - (.*?), as it already exists\.?$/},//not found //NO I18N
    { code: "LD15", msg: /Primary key value might be missing in the response data that is received, (.*?)\.?$/},//not found //NO I18N
    { code: "LD16", msg: /Record merge failed for the record in model - (.*?) with primaryKey value - (.*?), since either the persisted\(saved\) primary key value for a newly created record is not received from server or not in the proper structure to merge\.?$/},//NO I18N
    { code: "LD17", msg: /Record with the primary key value already exists\.?$/},//not found //NO I18N
    { code: "LD18", msg: /No (.*?) present\.?$/},//not found //NO I18N
    { code: "LD19", msg: /Deprecation Warning! findAll will not accept response payload values other than an array or any empty value. Current implementation which allows this will be deprecated from the next version\.?$/},//not found //NO I18N
    { code: "LD20", msg: /Record cannot be saved as a state, when it is not either a new or a modified record or in a error state\.?$/},//not found //NO I18N
    { code: "LD21", msg: /No such state \( (.*?) \) saved for the record\.?$/},//not found //NO I18N
    { code: "LD22", msg: /For create \/ createRecord, response with a primary key value should be received\.?$/},//not found //NO I18N
    { code: "LD23", msg: /PrimaryKey field (.*?) in (.*?) cannot have default value\.?$/},//not found //NO I18N
    { code: "LD24", msg: /Response couldn't be parsed, (.*?)\.?$/},//not found //NO I18N
    { code: "LD25", msg: /Cannot create record for the data - (.*?)\.?$/},//not found //NO I18N
    { code: "LD26", msg: /Only one baseKey is allowed for a model\.?$/},//not found //NO I18N
    { code: "LD27", msg: /Record merge failed, since the data passed is invalid - (.*?)\.?$/},//not found //NO I18N
    { code: "LD28", msg: /Record merge failed for the model - (.*?), since a valid primary key value is not found in the data to be merged - (.*?)\.?$/}, //NO I18N
    { code: "LD29", msg: /Unloaded record-(.*?) of the model-(.*?) is being saved\.?$/},//not found //NO I18N
    { code: "LD30", msg: /Variable value in query is mandatory for (.*?)\.?$/},//not found //NO I18N
    { code: "LD31", msg: /Datatype defined for (.*?) is mismatch with the value's datatype\.?$/},//not found //NO I18N
    { code: "LD32", msg: /Query '(.*?)' was not registered for the model '(.*?)\.?$/}//not found //NO I18N
];


commonUtils.murphyLyteErrorRegex.LCArray = [
    
    { code: "LC001", msg: /Error while parsing custom prop handler attribute (.*?). Check if the value provided is a valid JSON$/ },//NO I18N
    { code: "LC002", msg: /(.*?) Component is not compiled. Please compile using Lyte CLI\.$/,errorCodeHasStartArgument:true }, //no msg found //NO I18N
    { code: "LC003", msg: /Helper named (.*?) is not defined$/ },//NO I18N
    { code: "LC004", msg: /Action named (.*?) doesn\'t exists$/ },//NO I18N
    { code: "LC005", msg: /Lyte.objectUtils doesn\'t support (.*?) function$/ },//NO I18N
    { code: "LC006", msg: /Lyte.arrayUtils doesn\'t support (.*?) function$/ },//NO I18N
    { code: "LC007", msg: /Component name not specified in Lyte.Component.render$/ }, // no msg //NO I18N
    { code: "LC008", msg: /Specified outlet (.*?) doesn\'t exists - Lyte.Component.render$/ },//NO I18N
    { code: "LC009", msg: /Method named (.*?) doesn\'t exists in (.*?) component$/ },//NO I18N
    { code: "LC010", msg: /Parent Node \/ reference Node not provided for insertBefore method$/ },//NO I18N
    { code: "LC011", msg: /Error in promise provided in initialize function of data (.*?) of (.*?) component\\.$/ } //not found //NO I18N

];

commonUtils.murphyLyteErrorHandler = {};

commonUtils.murphyLyteErrorHandler.proccessError = function(e){
    try {
        
        if(!(e instanceof Error || (e instanceof Event && e.error ) )) {
            return;
        }
        var msg = e.message;
        var matchResult = commonUtils.murphyLyteErrorHandler.normalize(msg);
        var dynamicParam = {}
        commonUtils.murphyLyteErrorHandler.setDynamicCustomTagForLyteErrors(matchResult,dynamicParam);
        var customOptions = {}
        customOptions.frameworkData = dynamicParam;
        murphy.error(e,undefined,customOptions);

    } catch (e) {
        murphy.error(e);
    }
    
}


commonUtils.murphyLyteErrorHandler.setDynamicCustomTagForLyteErrors = function(matchResult,dynamicParam){
    if(matchResult===null || !('normalizedMsg' in matchResult))
    {
		return;
	}

    var finalMsg = matchResult.normalizedMsg;

    var msgThatNotMatched = matchResult.msgThatNotMatched;
    if(msgThatNotMatched!==undefined && msgThatNotMatched.length>20){

        var finalNotMatchedMessage = msgThatNotMatched;
        var tempMessage = commonUtils.murphyLyteErrorHandler.proccessAddtionalMessage(msgThatNotMatched,"LR");//NO I18N
        if(tempMessage===null){
            tempMessage = commonUtils.murphyLyteErrorHandler.proccessAddtionalMessage(msgThatNotMatched,"LD");//NO I18N
        }
        if(tempMessage===null){
            tempMessage = commonUtils.murphyLyteErrorHandler.proccessAddtionalMessage(msgThatNotMatched,"LC");//NO I18N
        }

        if(tempMessage===null){
            tempMessage = finalNotMatchedMessage
        }

        dynamicParam.finalMsg = tempMessage;
        dynamicParam.isFrameworkError = true;
        return
    }


    if('match' in matchResult){
        var match = matchResult.match;
        var matchLength = match.length;
        for(var i=1; i<matchLength; i++){
            var argValue  = commonUtils.murphyLyteErrorHandler.truncateMessage(match[i]);
            if(argValue!==''){
                dynamicParam[`arg${i}`] = argValue;
            }
            
        }
    }
    
    dynamicParam.finalMsg=finalMsg;
    dynamicParam.lyteErrorCode = matchResult.code;
    dynamicParam.isFrameworkError = true;
}


commonUtils.murphyLyteErrorHandler.truncateMessage = function(message) {
    return message.length > 255 ? message.slice(0, 250) + '...' : message;
}


commonUtils.murphyLyteErrorHandler.proccessAddtionalMessage = function(message,codeStart){
    try{
        var matched = commonUtils.murphyLyteErrorHandler.matchAddtionalMessage(message,codeStart);
        if(matched.code!==''){
            var codeMatched  = commonUtils.murphyLyteErrorHandler.doesCodeMatch(matched.code);
            if(codeMatched){
                return matched.balanceMessage;
            }
        }
    }catch(e){
        return null;
    }
    
    return null;
};

commonUtils.murphyLyteErrorHandler.matchAddtionalMessage =function(errorMessage,codeStart) {
    try{
        const lastLRIndex = errorMessage.lastIndexOf(codeStart);
        if (lastLRIndex === -1) {
            return { code: '', balanceMessage: errorMessage };
        }
        const substringFromLR = errorMessage.slice(lastLRIndex);
        const code = substringFromLR.replace(/[^a-zA-Z0-9]/g, '');
        const balanceMessage = errorMessage.slice(0, lastLRIndex).trim();
        return { code, balanceMessage };
    }catch(e){
        return { code: '', balanceMessage: errorMessage };
    }
};


commonUtils.murphyLyteErrorHandler.getAllRegexArr = function(){
    var array = [];
    for (const key in commonUtils.murphyLyteErrorRegex) {
        array =  array.concat(commonUtils.murphyLyteErrorRegex[key]);
    }
    return array;
}

commonUtils.murphyLyteErrorHandler.doesCodeMatch =  function(code){
    try{
        var array = commonUtils.murphyLyteErrorHandler.getAllRegexArr();
        var arrLength = array.length;
        for(var i=0;i<arrLength;i++){
            var arrCode = array[i].code;
            if(arrCode===code){
                return true;
            }
        }
    }catch(e){
        return false;
    }
    return false;
};
  

commonUtils.murphyLyteErrorHandler.normalize = function(errorMsg){
    var array = [];

    var usedLD = false;
    var usedLR = false;
    var usedLC = false;

    if(errorMsg.includes("LD")){
        array =  array.concat(commonUtils.murphyLyteErrorRegex.LDArray);
        usedLD = true;
    }
    if(errorMsg.includes("LR")){
        array = array.concat(commonUtils.murphyLyteErrorRegex.LRArray);
        usedLR = true;
    }

    if(errorMsg.includes("LC")){
        array = array.concat(commonUtils.murphyLyteErrorRegex.LCArray);
        usedLC = true;
    }

    if(array.length===0){
        usedLD = true;
        usedLR = true;
        usedLC = true;

        array = commonUtils.murphyLyteErrorHandler.getAllRegexArr();
    }

    var match  = commonUtils.murphyLyteErrorHandler.matchPatter(errorMsg,array);

    if(match===null || !('normalizedMsg' in match)){
        array = [];
        if(!usedLD){
            array =  array.concat(commonUtils.murphyLyteErrorRegex.LDArray);
        }
        if(!usedLR){
            array =  array.concat(commonUtils.murphyLyteErrorRegex.LRArray);
        }
        if(!usedLC){
            array =  array.concat(commonUtils.murphyLyteErrorRegex.LCArray);
        }
        if(array.length!==0){
            match  = commonUtils.murphyLyteErrorHandler.matchPatter(errorMsg,array);
        }

    }

    return match;
}

commonUtils.murphyLyteErrorHandler.normalizeFirstArg = function(firstArg){
    return firstArg.replace("Error:", "").trim();
};

commonUtils.murphyLyteErrorHandler.handleSplErrors = function(match,code){
    if(code==="LD13" && match.length>=4){
		match.splice(4, 1);
    }
}



commonUtils.murphyLyteErrorHandler.matchPatter = function(msg,array){
    var match=[];
    var arrLength = array.length;
    for(var i=0;i<arrLength;i++){
        var regPattern = array[i].msg;
        match = msg.match(regPattern);
        if (match) {
            if('errorCodeHasStartArgument' in array[i] && array[i].errorCodeHasStartArgument && match.length>=1){
	            var firstArg = match[1];
	            match[1] = commonUtils.murphyLyteErrorHandler.normalizeFirstArg(firstArg);
            }
            commonUtils.murphyLyteErrorHandler.handleSplErrors(match,array[i].code);
            var newMsg = commonUtils.murphyLyteErrorMsg.lyteErrorMessages[array[i].code];
            var msgThatNotMatched = msgThatNotMatched = msg.slice(0,match.index);
            msgThatNotMatched = msgThatNotMatched.trim();
            return {match:match,code:array[i].code,"regPattern":regPattern,"normalizedMsg":newMsg,"msgThatNotMatched":msgThatNotMatched}; //NO I18N
        }
    }
    return match;
}

/**
 * Use commonUtils.store.getRecords to avoid parallel server requests to the same store
 * 
 * x Returns an existing findAll promise / creates a new one if the store is not already being fetched
 * x is_force_fetch - false, returns the data from the store if it's available from peekAll / any request has already been resolved
 * 
 * usage - commonUtils.store.getRecords('store_name', is_force_fetch);
 * 
 * Note: Does not work for findAll calls with args
 */

commonUtils.store = (function () {
	let find_all_obj = {};
    let parallel_req_handler = {};
    function registerParallelRequestHandler(store_name) {
		if(!parallel_req_handler[store_name]) {
			parallel_req_handler[store_name] = {};
		}
		const handle_obj = parallel_req_handler[store_name];
        return function(is_force_fetch) {
            try {
                // store.peekAll().length > 0 fails when no records are present in the store
                if(!is_force_fetch && (handle_obj.fetched_at_least_once || store.peekAll(store_name).length > 0)) {
                    return store.peekAll(store_name);
                }
                if(handle_obj.find_all_promise) {
                    return handle_obj.find_all_promise;
                } else {
                    handle_obj.find_all_promise = store.findAll(store_name);
                    handle_obj.find_all_promise.then((records) => {
                        handle_obj.fetched_at_least_once = true;
                        delete handle_obj.find_all_promise;
                        return records;
                    });
                    return handle_obj.find_all_promise;
                }
            } catch (error) {
                murphy.error(error);
                delete handle_obj.find_all_promise;
                return store.findAll(store_name);
            }
        }
    }

    return {
       getRecords: function(store_name, is_force_fetch) {
			try {
				if(!find_all_obj[store_name]) {
					find_all_obj[store_name] = registerParallelRequestHandler(store_name);
				}
				return find_all_obj[store_name](is_force_fetch);
			} catch (error) {
				murphy.error(error);
				return store.findAll(store_name);
			}
	   }
    }
})();

//security team related functions - start
commonUtils.attachListeners = function(listeners) {
	var len = listeners.length;
	for (let i = 0; i < len; i++) {
		let listener = listeners[i];
		listener.someFn=function(event){	
			let finalArgs = [] , dataVal,
				argList = listener.args ? listener.args : [],
				argsLen = argList.length ,
				elementQueryObj = $L(this);
			for (let k = 0; k < argsLen; k++) {
				dataVal = this.getAttribute(argList[k]);
				dataVal = dataVal ? dataVal.trim() : elementQueryObj.data(argList[k]);
				finalArgs.push(dataVal);
			}
			listener.fn.call(this,event,...finalArgs);
		};
		let el = $L(listener.selector) , elemLen = el.length;
		if( el.length ){
			for( let j=0; j<elemLen; j++ ){
				el[j].addEventListener(listener.type, listener.someFn);
			}
		}
	}
};
commonUtils.removeListeners = function(listeners) {
	var len = listeners.length;
	for (let i = 0; i < len; i++) {
		let listener = listeners[i];
		let el = $L(listener.selector) , elemLen = el.length;
		if( el.length && listener.someFn){
			for( let j=0; j<elemLen; j++ ){
				el[j].removeEventListener(listener.type, listener.someFn);
			}
		}
	}
};
//security team related functions - end
