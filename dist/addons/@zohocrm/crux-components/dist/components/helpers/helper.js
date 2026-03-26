Lyte.Component.registerCustomPropHandler("cxProp");//No I18n


if (document !== window.document) {
	var _cruxUtils = _cruxUtils || { isLyteWidgetBuild: Lyte && Lyte.isWidgetBuild };//eslint-disable-line no-use-before-define
} else {
	var _cruxUtils = window._cruxUtils = window._cruxUtils || {};//eslint-disable-line no-redeclare
}

_cruxUtils.getI18n = function(){
	var key = arguments[0];
	var args = [];
	for(var i=1; i<arguments.length; i++){
		args.push(arguments[i]);
	}
	var i18n = _cruxUtils._cruxLocale[key] ? _cruxUtils._cruxLocale[key] : key;
	i18n = i18n.replace(/{\d+}/g, function(template){
		return args[template.split("{")[1].split("}")[0]];
	});
	return i18n;
}

String.prototype.cruxReplaceIndex = function(index, replacement) {
  if (index >= this.length) {
      return this.valueOf();
  }
  return this.substring(0, index) + replacement + this.substring(index + 1);
}

String.prototype.cruxFindAllIndexOf = function(char){
	if(!char){
		return [];
	}
	var indexes = []
	for(var i=0;i<this.length;i++){
		if(this[i] === char){
			indexes.push(i);
		}
	}
	return indexes;
}

Array.prototype.cruxFilterBy = function(obj){
	if(!obj){
		return this;
	}
	var keys = Object.keys(obj);
	var array=[];
	for(var i=0;i<this.length;i++){
		for(var j=0;j<keys.length;j++){
			if(this[i][keys[j]] == obj[keys[j]] ){
				array.push(this[i]);
			}
		}
	}
	return array
}
Array.prototype.cruxFindIndexOfObject = function(key,value){	
	var index = -1
	if(!key || !value){
		return index;
	}
	this.forEach(function(item,ind){
		if(item[key] == value){
			index = ind;
			return;
		}
	})
	return index;
}

NodeList.prototype.indexOf = Array.prototype.indexOf;  
HTMLCollection.prototype.indexOf = Array.prototype.indexOf;
if (HTMLElement.prototype && !HTMLElement.prototype.hasOwnProperty('cxVisbleInViewPort')) {
	Object.defineProperty(HTMLElement.prototype,'cxVisbleInViewPort',{
		value : function(boundary){
	    var rect = this.getBoundingClientRect();
	    var nT = 20,nL = 20,nB = window.innerHeight - 50,nR = window.innerWidth - 50;
	    if(boundary){
	    	nT = boundary.top ? nT+boundary.top : nT;
	    	nL = boundary.left ? nT+boundary.left : nL;
	    	nB = boundary.bottom ? nT+boundary.bottom : nB;
	    	nR = boundary.right ? nT+boundary.right : nR;
	    }
	    return rect.top >= nT && rect.left >= nL && rect.bottom <= nB  && rect.right <= nR;
		}
	});
}
$L.prototype.extend({cxGetScrollParent : function(){
		if (this[0] == null || this[0] == document || this[0] instanceof DocumentFragment) { //eslint-disable-line eqeqeq
	    return null;
	  }

	  var overflowY = window.getComputedStyle(this[0]).overflowY; 
	  var isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

		if(overflowY === 'hidden' && this[0].classList.contains('lyteScrollBar')){
			isScrollable = true;
		}

	  if (isScrollable && this[0].scrollHeight > this[0].clientHeight) {
	    return this[0];
	  } else {
	    return $L(this[0].parentNode).cxGetScrollParent();
	  }
	}
})

Lyte.Component.registerHelper("cruxGetI18n", function() { //No I18n
	return _cruxUtils.getI18n.apply(undefined, arguments);
});
Lyte.Component.registerHelper("cruxSplit", function(str,char) { //No I18n
	return str.split(char);
});
Lyte.Component.registerHelper("cruxJoin", function(array,char) { //No I18n
	return array.join(char)
});
Lyte.Component.registerHelper("userFieldValues",function(item , api_name , key) { //NO I18n
  var returnValue;//NO I18n
	if(typeof item[api_name]=="string"){ //NO I18n
		if(item[api_name]){
			returnValue = item[api_name];
		}
		else{
			returnValue = "";//NO I18n
		}
  }
  else if(typeof item[api_name]=="object"){ //NO I18n
		if(item[api_name]){
			if(!key){
				returnValue = item[api_name].name;
			}
			else{
				returnValue = item[api_name][key];
			}
		}
		else{
			returnValue = "";//NO I18n
		}
  }
	return returnValue;
});
Lyte.Component.registerHelper("cruxContains", function(array, item) { //No I18n
	if(!array){
		return;
	}
		return array.indexOf(item)>-1;
});
Lyte.Component.registerHelper("cruxConcat", function(array, item) { //No I18n
	var resp = '';
		var argLength = arguments.length;
		for (var i = 0; i < argLength; i++) {
			if (arguments[i] != undefined) {
				resp += arguments[i];
			}
		}
		return resp;
});
Lyte.Component.registerHelper("userDispVal", function(field,val) { //No I18n
	if(field == "profile"){
		if(val == "Administrator"){
				 return _cruxUtils.getI18n('Administrator');//No I18n
		}else if(val == "Standard"){ //No I18n
				 return _cruxUtils.getI18n('Standard');//No I18n
		}else{
			return val;
		}
	}
	else{
		return val;
	}
});

Lyte.Component.registerHelper("getSum", function() { //No I18n
	var sum = 0;
	var len = arguments.length;
	for(var i=0; i<len; i++){
		sum+=arguments[i];
	}
	return sum;
});
Lyte.Component.registerHelper("ifEquals",function(param1,param2){ //No I18n
	if(param1!=undefined && param2!=undefined){
		if(param1.toString() == param2.toString()){
			return true;
		}
	}
	return false
});
Lyte.Component.registerHelper("cruxCapitalize",function(str){
	return ( str || '' ).replace( /^./, function( match ){
		    return match.toUpperCase();
	});

});
Lyte .Component.registerHelper("captialize",function(param1){ //No I18N
	if(param1 != undefined){
		return param1.toUpperCase();
	}
});

Lyte.Component.registerHelper("cruxRebrandProperty", function(property){
	return typeof RebrandLinkUtil != "undefined" ? RebrandLinkUtil.getProperty(property) : property;//No I18N
});

Lyte.Component.registerHelper('cruxEncodeHTML', function(value) {//NO I18N
	if(typeof $ESAPI !== "undefined"){
		return $ESAPI.encoder().encodeForHTML(value);
	}
	return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
   	
});

Lyte.Component.registerHelper('cruxEncodeURL', function(value) { //NO I18N
	return typeof $ESAPI != "undefined" ? $ESAPI.encoder().encodeForURL(value) : value;//No I18N
});

Lyte.Component.registerHelper('cruxEncodeURIComponent', function(value) { //NO I18N
	return typeof value != "undefined" ? encodeURIComponent(value) : value;//No I18N
});

//no longer used
// Lyte.Component.registerHelper('searchIconSelect',function(){ //no i18n
// 	if(arguments[1]){
// 		return "searchLoading" //no i18n
// 	}else{
// 		if(arguments[0] == '' || arguments[0] == null ){
// 			return "searchIcon" //no i18n
// 		}else{
// 			return "clearField" //no i18n
// 		}
// 	}
// });

// Lyte.Component.registerHelper("cruxGetPhotoField", function(entityObj) { //NO I18n
// 	if(Object.keys(entityObj).indexOf("Record_Image") > -1) {
// 		var photeFileId = entityObj.Record_Image;

// 		if(entityObj.hasOwnProperty("Record_Image")) {
// 			var imageSpan = "";
// 			if(photeFileId)
// 			{
// //				var imgSrc = "/crm/EntityImageAttach.do?action_module="+encodeURIComponent(module)+"&entityId="+encodeURIComponent(entityObj.id)+"&actionName=readImage&fileId="+photeFileId;//No I18n
// //				imageSpan = '<span class="cruxNoteOwnerNameImg mR10 dIB cxVam"><img src="'+imgSrc+'"></span>';
// 				return "photoField"; //NO I18n
// 			} else {
// //				if(module === "Leads" || module === "Contacts") {
// //					imageSpan='<span class="cruxNoteOwnerNameImg mR10 dIB cxVam">'+entityObj.Full_Name.charAt(0)+'</span>';
// //				}
// 				return "fullNameFirstChar"; //NO I18n
// 			}

// 			return imageSpan;
// 		}
// 	} else {
// 		return "";
// 	}
// });

Lyte.Component.registerHelper("cruxGetFieldValue", function(module, entityObj, fieldObj, isEntityName) { //NO I18n
	var fieldData;

	if(fieldObj) {
		fieldData = entityObj[fieldObj.api_name];
	}

	if(!fieldData) {
		return "";
	}

	var dataType = fieldObj.data_type;

	if(dataType === "formula") {
		dataType = fieldObj.formula.return_type;
	}

	if(dataType.indexOf("lookup") > -1) {
		return fieldData.name;
	} else if(dataType === "datetime") {
		var dt;
		if(fieldData.match('T')){
			if(fieldObj.api_name) {
				var dateTime = fieldData.replace(/[+-]\d{2}:\d{2}/,'');
				dt = new Date(dateTime);
			} else {
				dt = new Date(fieldData);
			}
			return  Utils.getDateTimeInUserFormat(dt,true);
		}else{
			return fieldData
		}
		
	} else if(dataType === "date") {
		var dt = $L.moment(fieldData+" 00:00:00",Crm.userDetails.DATE_PATTERN.toUpperCase()).getDObj()
		if(isNaN(dt.getTime())) {
			dt = new Date(fieldData);
		}
		return Utils.getDateInUserDatePattern(dt,true);
	} else if(dataType === "multiselectpicklist") {
		return fieldData.join(";");
	} else if(isEntityName) {

		if(module === crmModuleConstants.Contacts || module === crmModuleConstants.Leads) {
			// var fullName = entityObj.Salutation ? entityObj.Salutation + " " : "";
			// var fullName += entityObj.Full_Name;
			fieldData= entityObj.Full_Name;
		}

//		fieldData='<a  data-cid=\'detailView\' data-params=\'{"lookback":"true","module":"'+crmLookupBusinessCard.moduleName+'","id":"'+crmLookupBusinessCard.entityId+'"}\' href="/crm/EntityInfo.do?module='+encodeURIComponent(crmLookupBusinessCard.moduleName)+'&id='+encodeURIComponent(crmLookupBusinessCard.entityId)+'" onClick="Crm.trackSpotLightAction(\'Lookup Hover Click\',{\'Module\':\''+crmLookupBusinessCard.moduleName+'\'})">'+$ESAPI.encoder().encodeForHTML(fieldData)+'</a>'
		return fieldData;
	} else if(fieldObj.api_name == "Layout") {
		return fieldData.display_label;
	} else {
		return fieldData.toString();
	}
});

// Lyte.Component.registerHelper("cruxGetEventStart_EndTime", function(entityObj, startFldObj, endFldObj) { //NO I18n
// 	var startDateTime= entityObj[startFldObj.api_name];
// 	var endDateTime= entityObj[endFldObj.api_name];

// 	var startDate=new Date(startDateTime);
// 	var endDate=new Date(endDateTime);

// 	if(!entityObj.All_day) {
// 		return Utils.getDateTimeInUserFormat(startDate,true) + ' - ' + Utils.getDateTimeInUserFormat(endDate,true);
// 	}

// 	if(startDate.getUTCDate() == endDate.getUTCDate() && startDate.getUTCMonth() == endDate.getUTCMonth() && startDate.getUTCFullYear()==endDate.getUTCFullYear()) {
// 		startDate = new Date(startDate.getUTCFullYear(),startDate.getUTCMonth(),startDate.getUTCDate());
// 		return Utils.getDateInUserDatePattern(startDate,true);
// 	}

// 	endDate = new Date(endDate.getUTCFullYear(),endDate.getUTCMonth(),endDate.getUTCDate());

// 	return Utils.getDateInUserDatePattern(startDate,true) + " - " + Utils.getDateInUserDatePattern(endDate,true);
// });

// Lyte.Component.registerHelper("cruxGetAlldayEvent", function(entityObj, bcFields) { //NO I18n
// 	if(entityObj.All_day){
// 		var fieldObj_AllDay = bcFields.filter(function (field){
// 			return field.api_name === "All_day"; //NO I18N
// 		});

// 		return fieldObj_AllDay[0].field_label;

// 	}
// 	return "";
// });

Lyte.Component.registerHelper("cruxReplace", function(str, search, replacement){ //No I18n
	if(!str){
		return "";
	}
	return str.replace(new RegExp(search, "g"), replacement);
});

Lyte.Component.registerHelper('cruxGetCrmBasePath', function() { //NO I18N
	if(Crm !== "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") !== -1){
		return Crm.getCrmBasePath();
	}
	return "";
});
Lyte.Component.registerHelper('cruxShortFileNameLength', function(fileName, length) { //NO I18N
	if(fileName.length > length) {
		return fileName.substr(0, length - 3) + "...";
	} else {
		return fileName;
	}
});
Lyte.Component.registerHelper('cruxSubstr', function(text, length) { //NO I18N
	if(text.length > length) {
		return text.substr(0, length) + "...";
	} else {
		return text;
	}
});
Lyte.Component.registerHelper('cruxIfGt', function(num1, num2) { //NO I18N
	return num1 > num2;
});
Lyte.Component.registerHelper('cruxHasProperty', function(obj,prop){ //No I18N
	if(obj){
		return obj.hasOwnProperty(prop);
	}
	return false;
})

Lyte.Component.registerHelper("cruxReplaceSpace", function(str){ //No I18n
	return str.replace(/ /g, "&nbsp;");
});
Lyte.Component.registerHelper('cruxStringSeg', function(text, startPos, endPos) { //NO I18N
	if(text) {
		var substr = text.substring(startPos, typeof endPos === "number" ? endPos : text.length);
		return substr;
	}
	return "";
});

Lyte.Component.registerHelper("cruxGetItemAtIndex", function(array, index) { //NO I18N
	return array[index];
});

Lyte.Component.registerHelper("cruxClone", function(data) { //NO I18N
	return Lyte.deepCopyObject(data);
});
Lyte.Component.registerHelper("cruxIncrement", function(data) { //NO I18N
	var val = this.getData(data);
	this.setData(data,val+=1);
	return val;
});
Lyte.Component.registerHelper("cruxGetTagColorIndex", function(color,colorObject) { //NO I18N
	if(!colorObject){
		colorObject = {Col1: "#F17574",Col2: "#F48435",Col3: "#E7A826",Col4: "#A8C026",Col5: "#63C57E",Col6: "#1DB9B4",Col7: "#57B1FD",Col8: "#879BFC",Col9: "#D297EE",Col10: "#FD87BD",Col11: "#969696",Col12: "#658BA8",Col13: "#B88562"}//no i18n
	}
	var col = Object.keys(colorObject).filter(function(item){return colorObject[item] == color})
	return col.length ? col[0] : 'Col0'
});
Lyte.Component.registerHelper("cruxArithResult", function(){ //No I18n
	if($L.evaluate){
		return $L.evaluate(Array.from(arguments).join('')); //No I18n
	}
	return new Function('return '+Array.from(arguments).join(''))(); //eslint-disable-line no-new-func
})

Lyte.Component.registerHelper("cruxAnd", function(){ //No I18N
	for(var i=0;i<arguments.length;i++){
		if(! arguments[i]){
			return false;
		}
	}
	return true;
})

Lyte.Component.registerHelper("cruxMaskValue", function(value, properties,isFormatTypeMaksing, phone_field){ //No I18n
	var res = "";
	if(!properties || value === undefined || value === null){
		return value;
	}
	var i;
	if( !properties.profiles ){ // Temporary check added to check whether the masking is from CScript or the masking feature.
		if(typeof value === 'number'){
			value=value.toString();
		}
		for(i=0; i<properties.length && res.length < value.length; i++){ //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
			res+=properties.character;
		}
		if(properties.reverse){
			res=value.substring(0, value.length-properties.length)+res;
		}
		else {
			res+=value.substring(properties.length);
		}
		return res;
	} 
		var replacementChar=properties.character?properties.character:"*";
		if(properties.complete_mask){
			var lenn=properties.length ? properties.length : 8;
			return replacementChar.repeat(lenn);
		}
		else if(!properties.format_type){
			var startIndex=properties.show_first  || 0;
			var end_val= properties.show_last || 0;
			if(phone_field){
				var showFirstVal = 0;
				var showLastVal = 0;
				var maskedValue = "";
				var pattern = "[^a-zA-Z0-9]";
				var len = value.length;
				var j;
				for(i=0;i<len;i++){
					var val = value.charAt(i).toString();
					if(val.match(pattern)){
						maskedValue = maskedValue.concat(val);
						continue;
					}else if(showFirstVal < startIndex){
						maskedValue = maskedValue.concat(val);
						showFirstVal++;
					}else{
						maskedValue = maskedValue.concat(replacementChar);
					}
				}
				for(j=0;j<len;j++){
					var revVal = value.charAt(len-1-j).toString();
					if(revVal.match(pattern)){
						maskedValue = maskedValue.substring(0,len-1-j)+revVal+ maskedValue.substring(len-j);
					}else if(showLastVal < end_val){
						maskedValue = maskedValue.substring(0,len-1-j)+revVal+ maskedValue.substring(len-j);
						showLastVal++;
					}else if(showLastVal === end_val){
						break;
					}
				}
				return maskedValue;
			} 
			var endIndex=value.length-1-end_val;
			if (startIndex >= 0 && endIndex < value.length && startIndex <= endIndex ) {
				var prefix = value.substring(0, startIndex);
				var suffix = value.substring(endIndex + 1);
				res="";
				if(prefix){
					res+=prefix;
				}
				if(endIndex>=startIndex){
					res+=value.substring(startIndex, endIndex + 1).replace(/./g, replacementChar);
				}
				if(suffix){
					res+=suffix;
				}
				return res;
			}
			return value;
			
		} 
			var masked_value="";
			var value_prefix = value.split("@")[0];
			var value_suffix = value.split("@")[1];
			if(value_prefix.length > 3){
				var user_prefix = value_prefix.substring(0,2);
				var user_suffix = value_prefix.substring(value_prefix.length-1,value_prefix.length);
				var user_middle = replacementChar.repeat(value_prefix.length - 2 - user_suffix.length);
				masked_value = ""+user_prefix+ user_middle +user_suffix;
			}else{
				masked_value = replacementChar.repeat(value_prefix.length);
			}
			if(typeof CrmField!=='undefined' && CrmField.MASKING &&properties.format_type===CrmField.MASKING.EMAIL_FORMAT_1){
				masked_value += "@"+ value_suffix;
			}else if(value_suffix){
				masked_value += "@"+ replacementChar.repeat(value_suffix.length);
			}
			return masked_value;
		
	
});
Lyte.Component.registerHelper('cruxGetPicklistFontColor',function(colourCode){ //no i18n
	if(colourCode && colourCode !== "" && colourCode.indexOf("#") === 0){
		colourCode = colourCode.substring(1);
		var c_r = parseInt(colourCode.substr(0, 2), 16);
		var c_g = parseInt(colourCode.substr(2, 2), 16);
		var c_b = parseInt(colourCode.substr(4, 2), 16);
		var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
		if(brightness < 175){
			return "var( --crux-tag-light-color)"; //NO I18N
		}
	}
	return "var(--crux-tag-dark-color)"; //NO I18N
});
Lyte.Component.registerHelper("cruxOr", function() { //No I18n
	for(var i=0; i<arguments.length; i++){
		if(arguments[i]){
			return true;
		}
	}
	return false;
});

Lyte.Component.registerHelper("cruxFilterDisabled",function(filter,index,firstIndex,cxPropMaxFilter,comparator,field){ //no i18n
	var bool = false;
	var cxPropDateComparaTors = this.getData('cxPropDateComparaTors');	//no i18n
	if(!this.getData('cxPropComparator')){
		bool =  false;
	}
	filter = filter[index-firstIndex];
	if (field && field.mask_details && !Lyte.Component.registeredHelpers.checkForMaskPermission(field.mask_details, Crm.userDetails.PROFILE_ID)) {
		return true;
	}
  if(this.getData('cxPropUnselectComparator') && !filter && !comparator){
    bool =  true;
  }else if(this.getData('cxPropUnselectComparator') && (filter && (!filter.comparator || filter.comparator === '-1')) && !comparator){
		bool =  true;
    }else if(cxPropMaxFilter > -1 && this.getData('filterQuery').filter(e => e && !(e.value === "" || (Array.isArray(e.value) && e.value.length === 0))).length >= cxPropMaxFilter && !filter){
		bool =  true;
	}else if(filter && !comparator && (filter.value==='${NOTEMPTY}' || filter.value==='${EMPTY}' || Object.values(cxPropDateComparaTors).includes(filter.value))){
		bool =  true;
	}
	// var elem = $L(this).find('.cxCriteriaInputSection')[index-firstIndex]
	// if(elem){
	// 	bool ? elem.classList.add('vH'): elem.classList.remove('vH')
	// }
	return bool;
});

Lyte.Component.registerHelper("cruxLookupFilterComparator",function(field,cxPropFormulaUitypes,cxPropContent){ //no i18n
	var arr;
	var cxPropEncryptFldComparator = this.getData("cxPropEncryptFldComparator");
	if (typeof cruxAssets === "object" && typeof cruxAssets.setFieldBasedFilterComparator === "function" && cxPropEncryptFldComparator.hasOwnProperty(field.ui_type) && field.data_type === "lookup" && field.lookup && field.lookup.module && field.lookup.module.crypt === true) {
		const modifiedCondition = cruxAssets.setFieldBasedFilterComparator({ field: field, condition: arr });
		if (modifiedCondition && modifiedCondition.length) {
			arr = cxPropEncryptFldComparator[field.ui_type];
		}
	}else if(field.crypt && cxPropEncryptFldComparator && cxPropEncryptFldComparator[field.ui_type]){
		arr = cxPropEncryptFldComparator[field.ui_type];
	}else if(cxPropContent[field.ui_type]){
		arr = cxPropContent[field.ui_type];
	}
	else if(cxPropFormulaUitypes[field.ui_type]){
		if(field.formula && field.formula.return_type && cxPropFormulaUitypes[field.ui_type][field.formula.return_type]){
			arr =  cxPropContent[cxPropFormulaUitypes[field.ui_type][field.formula.return_type]]
		}else if(field.rollup_summary && field.rollup_summary.return_type && cxPropFormulaUitypes[field.ui_type][field.rollup_summary.return_type]){
			arr =  cxPropContent[cxPropFormulaUitypes[field.ui_type][field.rollup_summary.return_type]]
		}else{
			arr =  cxPropContent[0];
		}
	}else{
		arr =  cxPropContent[0];
	}
	if(this.getData('cxPropUnselectComparator')){
		var arr1 = [];
    arr1[0] = {"name": _cruxUtils.getI18n("None"),"api_val":"-1"};
    arr = arr1.concat(arr);
	}
	return arr;
});
Lyte.Component.registerHelper("cruxDateFilterComparator", function (filterQuery, index) { //filterQuery, index, firstIndex
	var compDD = $L('#cruxComparator'+index)[0];
	if(compDD && compDD.cxProp && (compDD.cxProp('Selected') === 'in_the_last' || compDD.cxProp('Selected') === 'due_in') ){
		return 'age';
	}
	return false;
});
Lyte.Component.registerHelper('isBetweenCheck',function(isBetween, isBetweenArr, index) { //isBetween, isBetweenArr, index, firstIndex
	return isBetween && isBetweenArr[index];
})
Lyte.Component.registerHelper("markdown", function(input) {
	return $L.markdown(input).outerHTML;
});

Lyte.Component.registerHelper("cruxUserLookupContentStatus", function(contentLength, isReqForSelected, showNoDataMsg){ //No I18n	
	if(!contentLength){	
		return 'emptyUserLookupTable' //No I18N	
	} else {	
		if(!isReqForSelected){	
			return 'userLookupTable' //No I18N	
		} else {	
			if(!showNoDataMsg){	
				return 'userLookupTable' //No I18N	
			} else {	
				return 'emptyUserLookupTable' //No I18N	
			}	
		}	
	}	
});

Lyte.Component.registerHelper("cruxSetClass", function(){
	var ret = [];
	for(var i=0; i<arguments.length; i++){
		switch(arguments[i]){
		case "ifEquals":
			if(arguments[i+1] == arguments[i+2]){
				ret.push(arguments[i+3]);
			}
			else{
				ret.push(arguments[i+4]);
			}
			i+=4;
			break;
		case "if":
			if(arguments[i+1]){
				ret.push(arguments[i+2]);
			}
			else{
				ret.push(arguments[i+3]);
			}
			i+=3;
			break;
		default:
			ret.push(arguments[i]);
		}
	}
	return ret.join(" ");
});

Lyte.Component.registerHelper("cxLookupCheckForFooterAvailability", function(yieldDetails, type){
	if(type === "view" &&  !yieldDetails){
		return false;
	} 
	return true;
});
Lyte.Component.registerHelper("checkElementsData", function(currentEle , elementsJson){
	if(!currentEle || !elementsJson || Object.keys(elementsJson).length == 0 ){
		return '{}';
	}
	var nodeName = currentEle.tagName.toLowerCase();
	if( !elementsJson[nodeName] ){
		return '{}';
	}
	return elementsJson[nodeName];
});
Lyte.Component.registerHelper("cxHasOwnProperty", function(obj, key){
	return obj && obj.hasOwnProperty(key)
});
Lyte.Component.registerHelper("toLowerCase", function(str){
	if(str && typeof str === 'string'){
		return str.toLowerCase();
	}
	return str;
});
Lyte.Component.registerHelper("cruxGetTableTextClass", function(cxPropEnableSort, cxPropShowSortIcon){
	var textClass = 'cxTableHeadingElem';
	if(cxPropShowSortIcon){
		textClass += ' cxSkipFocusable';
	}else if(cxPropEnableSort){
		textClass += ' cP';
	}
	return textClass;
});
Lyte.Component.registerHelper("parseValue", function(value, comp){
	var valueType = {
		"boolean": "boolean",
		"date": "string",
		"datetime": "string",
		"email": "string",
		"image": "array",
		"layout": "object",
		"lookup": "string",
		"number": "string",
		"phone": "string",
		"picklist": "string",
		"tag": "array",
		"textarea": "string",
		"text": "string",
		"twitter": "string",
		"user": "object",
		"website": "string"
	}

	var res = value;
	var dataType = valueType[comp];

	if(dataType !== "string"){
		if(dataType === "boolean"){
			res = (res === "true")?true:false;
		}else if(dataType === "array" && dataType === "object"){
			res = JSON.parse(res);
		}
	}

	return res;

});
Lyte.Component.registerHelper("getDefaultData", function(field, propName, compName, propVal){
	if(compName && compName.includes('-')){
		compName = compName.replace('-','');
	}
	var defaultVal = {
		"boolean": {
			"cxPropAppearance": "flat",
			"cxPropId": "",
			"cxPropType": "default",
			"cxPropTooltipClass": "cxtooltip",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"}
		},
		"date": {
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": false,
			"cxPropId": "",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropYield": false
		},
		"datetime": {
			"cxPropAppearance": "box",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": false,
			"cxPropId": "",
			"cxPropTimeFormat": (typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : 'hh:mm a'),
			"cxPropTimeZone": (typeof Crm != "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30"),
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropYield": false,
			"cxPropShowInterval": false,
			"cxPropShowToday": true,
			"cxPropReturnTimezone": false,
			"cxPropIsDropdownIconNode": false
		},
		"email": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropIconClass": "cxEditIcon"
		},
		"image": {
			"cxPropId": "cxImage1",
			"cxPropPlaceholder": _cruxUtils.getI18n('crm.FileuploadField.addNewImage'),
			"cxPropType": "multiple",
			"cxPropValue": [],
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"}
		},
		"layout": {
			"cxPropAppearance": "flat",
			"cxPropId": "",
			"cxPropType": "multisearch",
			"cxPropIsDropdownIconNode": false
		},
		"lookup": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "box",
			"cxPropAutocomplete": true,
			"cxPropId": "",
			"cxPropTooltipClass": "cxTooltip",
			"cxPropTooltipConfig": {"position": "bottom"},
			"cxPropMetaMoreRecords": "more_records",
			"cxPropUpdateDelay": 250,
			"cxPropFooterYield": false,
			"cxPropToggle": false,
			"cxPropAdvanceSearchEnabled": typeof Crm !== 'undefined' ? Crm.userDetails.isLookupAdvancedSearchEnabled : false,
			"cxPropRelatedRecordData": [],
			"cxPropShowCloseIcon": false,
			"cxPropDontShowRelatedDropdown": false,
			"cxPropInputId": "inputId",
			"cxPropPreventParentScroll": false,
			"cxPropReturnFullObjectOnGet": false,
			"cxPropDefaultFields": {},
			"cxPropDisplayIconOnLeft": false,
			"cxPropAllFieldsNeeded": false,
			"cxPropDefaultCriteria": [],
			"cxPropFieldOfLookupVal": [],
			"cxPropTransition": {
				"animation": "slideFromTop",
				"duration": "0.5"
			},
			"cxPropOffset": {
				"top": "0",
				"left": "center"
			},
			"cxPropIconClass": "zcicn-cssIcons zcicncss-custommodule",
			"cxPropType": "single"
		},
		"number": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropDirection": "horizontal",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropType": "text",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropSliderYield": false,
			"cxPropCurrencyDetails": (typeof Crm != "undefined" ? Crm.userDetails.CURRENCY_DETAILS : {}),
			"cxPropDefaultRoundOff": (typeof Crm != "undefined" && Crm.userDetails.defaultRoundOff) ? Crm.userDetails.defaultRoundOff : 2,
			"cxPropDefaultOrgCurrency": (typeof Crm != "undefined" ? Crm.userDetails.defaultOrgCurrency : ""),
			"cxPropMaxvalue": 9000000000000000000,
			"cxPropDecimalAllowed": true,
			"cxPropAllowNegativeValue": true,
			"cxPropShowCalculator": false,
			"cxPropHandler": "lyteArrow",
			"cxPropIsDisplayFormatEnabled": false,
			"cxPropSliderWidth": "400px",
			"cxPropDigits": 1,
			"cxPropIncrement": false,
			"cxPropWheel": false,
			"cxPropIgnoreSymbols": false
		},
		"phone": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropTabIndex": "0",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropIsDropdownIconNode": false,
			"cxPropEnableCountryCode": false,
			"cxPropUserLocale": (typeof Crm != "undefined" ? Crm.userDetails.COUNTRY_LOCALE : "")
		},
		"picklist": {
			"cxPropAppearance": "flat",
			"cxPropDirection": "vertical",
			"cxPropId": "",
			"cxPropPlaceholder": "",
			"cxPropTabIndex": "0",
			"cxPropIsDropdownIconNode": false,
			"cxPropFooterYield": false,
			"cxPropPreventParentScroll": false,
			"cxPropPicklistButtonYield": false,
			"cxPropPicklistYield": false,
			"cxPropDisableExtraValue": false,
			"cxPropDoNotSkipFirstValue": false,
			"cxPropShowUnused": false,
			"cxPropOpenDropdown": false,
			"cxPropIsColorCodeEnabled": false,
			"cxPropUserValue": "display_value",
			"cxPropSystemValue": "actual_value",
			"cxPropNoneKeyword": "-None-",
			"cxPropNoResultMessage": _cruxUtils.getI18n('crm.label.no.options.found'),
			"cxPropShowTooltip": true,
			"cxPropType" : "single"
		},
		"textarea": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "cruxTextArea",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250,
			"cxPropTextAreaResize": {
				"horizontal": false,
				"vertical": true
			},
			"cxPropExpandTextArea": false,
			"cxPropPreventCollapse": false,
			"cxPropHighlightUrl": false
		},
		"text": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropType": "text",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropMetaMoreRecords": "more_records",
			"cxPropUpdateDelay": 250,
			"cxPropAutocompleteOptions": {}
		},
		"tag": {
			"cxPropAppearance": "flat",
			"cxPropId": "",
			"cxPropMandatory": false,
			"cxPropTabIndex": 1,
			"cxPropValue": [],
			"cxPropMaxCount": 0,
			"cxPropForcedFetch": false,
			"cxPropWidth": "230px",
			"cxPropTagStyle": true,
			"cxPropDisplayValue": "name"
		},
		"twitter": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250
		},
		"user": {
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": true,
			"cxPropId": "",
			"cxPropPlaceholder": _cruxUtils.getI18n("None"),
			"cxPropTabIndex": "0",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropIsDropdownIconNode": false,
			"cxPropIconClass": "dropdown",
			"cxPropShowCloseIcon": false,
			"cxPropReturnFullObjectOnGet": false,
			"cxPropQueryParam": {},
			"cxPropTransition": {
				"animation": "slideFromTop",
				"duration": "0.5"
			},
			"cxPropOffset": {
				"top": "0px",
				"left": "center"
			},
			"cxPropOpenDropdown": false,
			"cxPropShowTooltip": true,
			"cxPropForcedFetch": false,
			"cxPropContactServerUrl": "https://contacts.csez.zohocorpin.com",
			"cxPropFilterOptions": [],
			"cxPropFilterable": false,
			"cxPropDisableOnHoverForView": false,
			"cxPropExclude": [],
			"cxPropFilterSystemValue": "id",
			"cxPropFilterUserValue": "category",
			"cxPropShowBusinessCard": true,
			"cxPropFilterSelected": "ActiveUsers",
			"cxPropUserDetailViewPath": "/crm/org27172316/settings/users/",
			"cxPropHideLookupIcon": false,
			"cxPropTimeFormat": (typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : 'hh:mm a'),
			"cxPropType": "single"
		},
		"website": {
			"cxPropCallbackDelay": 250,
			"cxPropAppearance": "flat",
			"cxPropAutocomplete": "on",
			"cxPropDirection": "vertical",
			"cxPropEnableLbind": true,
			"cxPropId": "",
			"cxPropTooltipConfig": {"position": "followcursor", "appearance": "box"},
			"cxPropUpdateDelay": 250
		}
	};

	var res;
	if(field && field[propName]){
		res = field[propName];
	}

	if(propName === "cxPropPlaceholder" && propVal === ""){
		propVal = undefined;
	}else if(propName === "cxPropTextAreaResize" && !propVal){				// getting console error if cxPropTextAreaResize is undefined while change textarea to other field type and new field not rendered textarea is existed in DOM
		propVal = {
			"horizontal": false,
			"vertical": true
		};
	}

	if(typeof res === "undefined"){
		if(typeof propVal !== "undefined"){
			res = propVal;
		}else if(compName){
			res = defaultVal[compName][propName];
			if(propName === "cxPropHideLookupIcon" && compName === "user" && this.component.data.cxPropType && this.component.data.cxPropType.toLowerCase() === "multiple"){
				res = true;
			}
			if(propName === "cxPropPlaceholder" && compName === "user" && this.component.data.cxPropType && this.component.data.cxPropType.toLowerCase() === "multiple"){
				res = _cruxUtils.getI18n("crm.label.rejection.send.alert.users");
			}
			if(propName === "cxPropType" && field){
				var fieldVal = field.data_type;
				if((compName === "lookup" && fieldVal === "multiselectlookup") || (compName === "picklist" && fieldVal === 'multiselectpicklist') || (compName === "user" && fieldVal === 'multiuserlookup')){
					res = 'multiple';
				}
			}
		}
	}

	return res;
});

Lyte.Component.registerHelper('cruxLength', function(input) {
    if (Array.isArray(input)) {
        return input.length;
    } else if (typeof input === "object") {
        return Object.keys(input).length;
    }
    return "";
});

Lyte.Component.registerHelper('cruxGetNestedValue', function(rec, key) {
    var keys = key.split('.');
    let value = rec, key_len = keys.length;

    while (key_len && value !== undefined && value !== null) {
        var tempKey = keys.shift();
        value = value[tempKey];    
		key_len--;
    }

    return value;
});


if (_cruxUtils.isLyteWidgetBuild) {//ZCRM-684627
	Lyte.Component.registerHelper("concat", function () { //No I18n
		var ret = "";
		var len = arguments.length;
		for (var i = 0; i < len; i++) {
			ret += arguments[i]
		}
		return ret;
	});
}
Lyte.Component.registerHelper("checkForMaskPermission",function(mask_details,cxPropProfileId){
	if(mask_details){
		var profile_details=mask_details.profiles;
		if(profile_details && cxPropProfileId){
			return profile_details.filter(profile => profile.id === cxPropProfileId).length>0;
		}
	}
	return false;
});

// Lyte.Component.registerHelper("emptyValueCheck", function(value, compName){
// 	var compTypeCheck = {
// 		"boolean": true,
// 		"date": true,
// 		"datetime": true,
// 		"email": true,
// 		"image": false,
// 		"layout": true,
// 		"lookup": true,
// 		"number": true,
// 		"phone": true,
// 		"picklist": true,
// 		"tag": true,
// 		"text": true,
// 		"textarea": true,
// 		"twitter": true,
// 		"user": true,
// 		"website": true
// 	};
// 	if(compTypeCheck[compName]){
// 		if(Array.isArray(value) && value.length === 0){
// 			return true;
// 		}else if(typeof value === "object" && Object.keys(value).length === 0){
// 			return true;
// 		}else if(typeof value === "boolean" && !value){
// 			return true;
// 		}else if(!value && value !== 0){
// 			return true;
// 		}
// 	}
// 	return false;
// });

Lyte.Component.registerHelper("addMurhyInfo", function(comp, _case){ //No I18n
	_cruxUtils.addMurhyInfo(comp, _case);
});

Lyte.Component.registerHelper("cruxStringify", function(json) {
	return JSON.stringify(json);
});
