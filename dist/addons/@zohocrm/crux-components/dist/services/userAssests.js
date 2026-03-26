Lyte.Service.register("userAssests",function userAssests(){
 

  /*
      networkDataObj : {
              modelName :"string",
              cacheQuery : "boolean",
              datacache  : "boolean"
              customData : "object",
              ForceFetch : "boolean",
              queryParams : "object"
          }
      instanceObj = {
          isCustomRequest : boolean(default false),
          isSearchAvailable : boolean(default false),
          requestDetails|searchRequestDetails :  object, [*  storeReqType : String, //"findAll|triggerAction|...."
                                                          *  storeDetails : {
                                                          *         modelName : String,
                                                          *         queryParams : Object,
                                                          *         cacheQuery : Boolean,
                                                          *         cacheData : Boolean,
                                                          *         customData : AnyDataType
                                                          *  },
                                                          *  parseResponseKey : "String" //If return value is a object then the value held by the key pointed by this variable is used
                                                          ]
                                                          *                                       
          * Available Methods : 
          * onBeforeRequestTriggered     : [beforeRequestFunc]
          * onCustomRequest        : [customRequestFunc]
          * modifyRequestDetails : [modifyReqestDetails]
          * onErrorFromRequest     : [handleErrReqFunc]
          * validateNewBatch        : [beforeNextBatchFunc]
          * onRequestResolved,     : [afterRequestFunc]
          * updateQueryParams    : [queryParamsFunc]
          * afterResponseParsed  : [afterResponse]
          * onInvalidResponse      : [invalidResponseFunc]
          * onLoadingStateUpdate   : [loadingStateUpdateFunc]
          * onNewBatch,            : [nextBatchFunc]
          * beforeSearchRequestTriggered : [beforeSearchRequestFunc] */  
       // eslint-disable-next-line no-unused-expressions  
       

  this.createInstance = function (dataObj) {
      let methodObj = dataObj.lzMethods ? Lyte.deepCopyObject(dataObj.lzMethods) : {}; 
      this.assignCommonMethods(dataObj);
      var instance =  $L.cruxLazyLoad(this.getInstanceObj(dataObj));
      instance.methodObj = methodObj;
      return instance;
  };                                                 
  this.getInstanceObj = function (dataObj) {
    // eslint-disable-next-line no-unused-expressions 
      dataObj.lzProperties = dataObj.lzProperties ? dataObj.lzProperties : {},
      dataObj.lzMethods = dataObj.lzMethods ? dataObj.lzMethods : {},
      dataObj.lzCustomData = dataObj.lzCustomData ? dataObj.lzCustomData : {};
      if (!dataObj.lzProperties.customRequest) {
          this.handleStandardRequest(dataObj);
      }
       // this.assignCommonMethods(dataObj);
  
      return dataObj;
};

this.mapMethods = function (methods) {
var instanceMethods = {};
for (var methodName in methods) {
  if (methods.hasOwnProperty(methodName)) {
    instanceMethods[methodName] = methods[methodName];
  }
}
return instanceMethods;
};


this.handleStandardRequest = function (dataObj) {
  let requestDetail = dataObj.requestDetails || {};
  dataObj.lzProperties.requestDetails = {
      storeReqType: "findAll", //NO I18N
      storeDetails: {
          modelName: requestDetail.modelName || "user", //NO I18N
          cacheQuery: !requestDetail.ForceFetch ? requestDetail.cacheQuery : undefined,
          cacheData: !requestDetail.ForceFetch ? requestDetail.cacheData : undefined,
          customData: requestDetail.customData || {},
          queryParams: requestDetail.queryParams || {}
      },
      parseResponseKey: requestDetail.parseResponseKey || "users" //NO I18N
  };
  if(dataObj.isSearchAvailable){
      let searchRequestDet = dataObj.searchRequestDetails || {};
      dataObj.lzProperties.searchRequestDetails = {
          storeReqType: "triggerAction", //NO I18N
          storeDetails: {
              modelName: searchRequestDet.modelName || "user",
              actionName : searchRequestDet.actionName || "search", //No I18N
              cacheQuery: searchRequestDet.cacheQuery || true,
              cacheData: searchRequestDet.cacheData || false,
              queryParams: searchRequestDet.queryParams || {},
              customData:searchRequestDet.customData || {}
           },
           searchInputValue : searchRequestDet.searchInputValue,
           parseResponseKey: (searchRequestDet.modelName + (searchRequestDet.modelName === "user" ? "s" : "")) //NO I18N
      };
      dataObj.lzMethods.modifyRequestDetails = this.modifyRequestDetailsFunc;

  }
  };
// eslint-disable-next-line no-unused-expressions  
this.assignCommonMethods = function (dataObj) {
    dataObj.lzMethods.onRequestResolved = this.afterRequestResolved;
    dataObj.lzMethods.updateQueryParams = this.updateQueryParamsFunc;
    dataObj.lzMethods.onNewBatch = this.nextBatchFunc;
    dataObj.lzMethods.onInvalidResponse = this.onInvalidResponseFunc;
    dataObj.lzMethods.afterResponseParsed = this.afterResponseParsedFunc;
    dataObj.lzMethods.beforeSearchRequestTriggered = this.beforeSearchRequestTriggeredFunc;
    dataObj.lzMethods.onBeforeRequestTriggered = this.beforeRequestFunc;
    dataObj.lzMethods.cancelResponse = this.cancelResponseFunc;
},
   /** The below function is used to update the customData of the triggeraction i.e search requests. 
     * It updates the customData with the queryparams and resets the queryParams as empty
     * */
  this.modifyRequestDetailsFunc = function(instance, details){
    // if(!instance.properties.isSearchReq){
    //   return; 
    // } 
    var qp = details.queryParams;
    let storeDet = instance.properties.searchRequestDetails.storeDetails;
    let queryParams = storeDet.queryParams; //NO I18n
      for(var key in queryParams) {
          qp[key] = queryParams[key];
      }
        var escapedString = this.escapeString(instance.properties.searchRequestDetails.searchInputValue);
          if(storeDet.modelName === "user") {
            var criterias;
            let firstNameAvailability = instance.properties.searchRequestDetails.firstNameAvailability,
            lastNameAvailability = instance.properties.searchRequestDetails.lastNameAvailability;
            if(firstNameAvailability && lastNameAvailability) {
              criterias = '((first_name:starts_with:' + escapedString + ')or(last_name:starts_with:' + escapedString + ')or(email:starts_with:' + escapedString + ')or(full_name:starts_with:' + escapedString + '))'; //NO I18n
            } else if(firstNameAvailability && !lastNameAvailability) {
              criterias = '((first_name:starts_with:' + escapedString + ')or(email:starts_with:' + escapedString + ')or(full_name:starts_with:' + escapedString + '))'; //NO I18n
            } else if(!firstNameAvailability && lastNameAvailability) {
              criterias = '((last_name:starts_with:' + escapedString + ')or(email:starts_with:' + escapedString + ')or(full_name:starts_with:' + escapedString + '))'; //NO I18n
            }
            qp.criteria = criterias;
          }   
    details.customData = qp;
    details.queryParams = {};
    if(instance.methodObj.modifyRequestDetails){
      return instance.methodObj.modifyRequestDetails(instance, details);
    }else{  // eslint-disable-line no-else-return
      return details;
    }
   
  },
   /** Below function beforeRequestFunc will is used to prevent multiple page 1 requests requests 
     * being triggered for the currently selected filter.
     * case : When ever a search is cleared the original page 1 of the current filter is made. 
     *        When a request for a filter is triggered and a search is made and cleared before the 
     *        initial filter request resolves then this will trigger an second page one request for 
     *        the initial filter. But due to the flag initialRequestPending this second or multiple 
     *        requests will be prevented.
    */
   this.beforeRequestFunc =  function(instance){
    var returnValue = false;
      if(instance.properties.pageNo === 1 && !instance.properties.isSearchReq){
        if(!instance.initialRequestPending) {
          instance.initialRequestPending = true;
          returnValue = false;
        } else {
          returnValue = true;
        }
        instance.initialRequestPending = true;
      }
    return returnValue;
  },
   /** The below function is process the data from the server to make sure its in a readable format for the lazy load plugin*/
  this.afterRequestResolved = function (instance, response) {
    instance.initialRequestPending = false;
    if(!instance.properties.customRequest){
      if (response) {
        var networkObject = instance.properties.requestDetails;
        if (!instance.properties.isSearchReq) {
          response = response[networkObject.storeDetails.modelName] ? response[networkObject.storeDetails.modelName] : response[store.serializer[networkObject.storeDetails.modelName].varPayloadKey] ? response[
                store.serializer[networkObject.storeDetails.modelName].varPayloadKey]: response;
        }
      }
      return response;
    }
  },
   /**
     * This function below is used to construct the queryParams for the request
     */
   this.updateQueryParamsFunc = function(instance, qp){
    if(instance.properties.isSearchReq){
      return;
    } 
     if(instance.methodObj.updateQueryParams){
        return instance.methodObj.updateQueryParams(instance, qp);
      }else{  // eslint-disable-line no-else-return
        return qp;
      }
  },
   /** This function is used to update the display array when ever a new batch is constructed */
   this.nextBatchFunc = function(instance, batch){
    var selectedList = [],
    batchLen = batch.length,
    selectedLen;
    
    
    if(this.data.cxPropSelectedId && this.data.cxPropSelectedId.length){
        selectedList.push(this.data.cxPropSelectedId);
      }
    selectedLen = selectedList.length;
    /* This key for prevent checkbox related actions */
    //this.preventSelectionInteractions = true;
    for(var i = 0; i < batchLen; i++){
      Lyte.objectUtils(batch[i] , "add" , "lookup_selected_val" , false); //NO I18N
      for(var j = 0; j < selectedLen; j++){
        if(selectedList[j] === batch[i][instance.properties.primaryKey]){
          Lyte.objectUtils(batch[i] , "add" , "lookup_selected_val" , true); //NO I18N
          break;
        }
      }
    }
    this.preventSelectionInteractions = false;
    
    
      Lyte.arrayUtils(this.data.systemData, 'push', batch); //NO I18n
  },
  
  /**
     * The below function cancelResponseFunc is responsible to concel some requests after the response is received. 
     * The purpose is sometimes after a request has been triggered it may no longer be needed.
     * Case :
     *  - While fetching the filter data and seaech is triggered then the response of the filter is no longer needed.
     *  - While fetching the search response and search is cleared then the response of the search is no longer needed. 
     *  - Also when a filter request is triggered and before the response is received the filter is changed. Then also
     *  the initial filter response is to be dropped.
     *  - Search request triggered before previous search request was resolved is handeled in the adapter if user model 
     * in processes request using the same xhr to cancel the previous request.
     */
  this.cancelResponseFunc = function(instance, response, isSearchReq){
        if ( ( instance.properties.searchValue && !isSearchReq ) || ( !instance.properties.searchValue && isSearchReq ) ) {
          return true;
        } else { // eslint-disable-line no-else-return
          if(instance.methodObj.cancelResponse){
            return instance.methodObj.cancelResponse(instance, response, isSearchReq);
          }
          return false;
        }
  };

});
Lyte.injectServices("userAssests");