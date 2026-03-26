/**
 * requestDetails|searchRequestDetails is a object
 * {
 *  storeReqType : String, //"findAll|triggerAction|...."
 *  storeDetails : {
 *         modelName : String,
 *         queryParams : Object,
 *         cacheQuery : Boolean,
 *         cacheData : Boolean,
 *         customData : AnyDataType
 *  },
 *  parseResponseKey : "String" //If return value is a object then the value held by the key pointed by this variable is used
 * }
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
 * beforeSearchRequestTriggered : [beforeSearchRequestFunc]
 */

 ;
 (function (window) {
     if (lyteDomObj) {

         /* Functions for setting up instance variable Start */
         function getInstanceProperties(object) {
             var properties = object.lzProperties;
             var output = {}


            if (properties.requestDetails) {
                output.requestDetails = properties.requestDetails;
            } else {
                output.requestDetails = {
                    storeReqType : "",
                    storeDetails : {},
                    parseResponseKey : ""
                }
            }

             if (properties.searchRequestDetails) {
                 output.searchRequestDetails = properties.searchRequestDetails;
             } else {
                 output.searchRequestDetails = {
                    storeReqType : "",
                    storeDetails : {},
                    parseResponseKey : ""
                }
             }


             if (properties.allAvailableRecords) {
                 output.allAvailableRecords = properties.allAvailableRecords;
             } else {
                 output.allAvailableRecords = [];
             }

             if (properties.displayRecords) {
                 output.displayRecords = properties.displayRecords;
             } else {
                 output.displayRecords = [];
             }

             if (properties.pageNo) {
                 output.pageNo = properties.pageNo;
             } else {
                 output.pageNo = 1;
             }

             if (properties.perPage) {
                 output.perPage = properties.perPage;
             } else {
                 output.perPage = 200;
             }

             if (properties.allRecordsFetched) {
                 output.allRecordsFetched = properties.allRecordsFetched;
             } else {
                 output.allRecordsFetched = false;
             }

             if (properties.batchSize) {
                 output.batchSize = properties.batchSize;
             } else {
                 output.batchSize = 20;
             }

             if (properties.primaryKey) {
                 output.primaryKey = properties.primaryKey;
             } else {
                 output.primaryKey = 'id'; //NO I18N
             }

             if (properties.excludeList) {
                 output.excludeList = properties.excludeList;
             } else {
                 output.excludeList = [];
             }

             if (properties.currentlyEcludedList) {
                 output.currentlyEcludedList = properties.currentlyEcludedList;
             } else {
                 output.currentlyEcludedList = [];
             }

             if (properties.customPagination) {
                 output.customPagination = properties.customPagination;
             } else {
                 output.customPagination = false;
             }

             if (properties.customRequest) {
                 output.customRequest = properties.customRequest;
             } else {
                 output.customRequest = false;
             }

             if (properties.isNonPagination) {
                 output.isNonPagination = properties.isNonPagination;
             } else {
                 output.isNonPagination = false;
             }

             if (properties.isSearchReq) {
                 output.isSearchReq = properties.isSearchReq;
             } else {
                 output.isSearchReq = false;
             }

             if (properties.searchValue) {
                 output.searchValue = properties.searchValue;
             } else {
                 output.searchValue = "";
             }

             if (properties.currentLoadingStage) {
                 output.currentLoadingStage = properties.currentLoadingStage;
             } else {
                 output.currentLoadingStage = "";
             }

             if (properties.triggerSearchLength) {
                 output.triggerSearchLength = properties.triggerSearchLength;
             } else {
                 output.triggerSearchLength = 2;
             }

             if (properties.allRecordsFetchedAndConsumed) {
                 output.allRecordsFetchedAndConsumed = properties.allRecordsFetchedAndConsumed;
             } else {
                 output.allRecordsFetchedAndConsumed = false;
             }

             if (properties.reverseLazyLoadScroll) {
                 output.reverseLazyLoadScroll = properties.reverseLazyLoadScroll;
             } else {
                 output.reverseLazyLoadScroll = false;
             }

             return output;
         };

         function getInstanceLocalProperties(object) {
             var _localVariables = object.lzLocalVariables ? object.lzLocalVariables : {},
                 output = {};

             if (_localVariables.currentRecordCount) {
                 output.currentRecordCount = _localVariables.currentRecordCount;
             } else {
                 output.currentRecordCount = 0;
             }

             if (_localVariables.preventScrollFuncnalityOnLoad) {
                 output.preventScrollFuncnalityOnLoad = _localVariables.preventScrollFuncnalityOnLoad;
             } else {
                 output.preventScrollFuncnalityOnLoad = false;
             }

             if (_localVariables.preventScrollFuncnality) {
                 output.preventScrollFuncnality = _localVariables.preventScrollFuncnality;
             } else {
                 output.preventScrollFuncnality = false;
             }

             if (_localVariables.allAvailablePages) {
                 output.allAvailablePages = _localVariables.allAvailablePages;
             } else {
                 output.allAvailablePages = {
                     currLen: 0
                 };
             }

             if (_localVariables.allAvailableBatchs) {
                 output.allAvailableBatchs = _localVariables.allAvailableBatchs;
             } else {
                 output.allAvailableBatchs = {
                     currLen: 0,
                     batchCount: 0
                 };
             }

             if (_localVariables.latestBatch) {
                 output.latestBatch = _localVariables.latestBatch;
             } else {
                 output.latestBatch = 0;
             }

             if (_localVariables.previousLoadingStage) {
                 output.previousLoadingStage = _localVariables.previousLoadingStage;
             } else {
                 output.previousLoadingStage = "";
             }


             if (_localVariables.scrollTimeout) {
                 output.scrollTimeout = _localVariables.scrollTimeout;
             } else {
                 output.scrollTimeout = undefined;
             }

             if (_localVariables.searchTimeout) {
                 output.searchTimeout = _localVariables.searchTimeout;
             } else {
                 output.searchTimeout = undefined;
             }

             if (_localVariables.currentSearchValue) {
                 output.currentSearchValue = _localVariables.currentSearchValue;
             } else {
                 output.currentSearchValue = "";
             }

             if (_localVariables.oldSearchValue) {
                 output.oldSearchValue = _localVariables.oldSearchValue;
             } else {
                 output.oldSearchValue = "";
             }

             if (_localVariables.multipleBack) {
                 output.multipleBack = _localVariables.multipleBack;
             } else {
                 output.multipleBack = true;
             }

             if (_localVariables.emptySearchResp) {
                 output.emptySearchResp = _localVariables.emptySearchResp;
             } else {
                 output.emptySearchResp = false;
             }
             if (_localVariables.triggerNextRequest) {
                 output.triggerNextRequest = _localVariables.triggerNextRequest;
             } else {
                 output.triggerNextRequest = false;
             }

             return output;
         }

         /* Functions for setting up instance variable End */

         /* The lazyLoad Class Start */
         function lazyLoadInstance(object = {}) {
            const info = object.lzInstance ? object.lzInstance : object;
            if (object.lzInstance) {
                info.lzProperties = info.properties;
                info.lzLocalVariables = info._localVariables;
            }
            this.properties = getInstanceProperties(info);
            this.methods = info.methods || info.lzMethods || {};
            this._localVariables = getInstanceLocalProperties(info);
            this.userCustomData = info.userCustomData || object.lzCustomData || {};
        
            
        }
         /* The lazyLoad Class End */

         /* Internal Functions  Start*/
         function triggerRequest() {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables;

             var cancelRequest = false;
             if (methods.onBeforeRequestTriggered) {
                cancelRequest =  methods.onBeforeRequestTriggered(this);
                if(!cancelRequest){
                    cancelRequest = false;
                }
             }
             if(!cancelRequest){
                if (properties.customRequest && methods.onCustomRequest) {
                    var requestType = properties.isSearchReq;
                    var qp = getQueryParams.call(this);
                    var custProm = methods.onCustomRequest(this, qp);
                    if (custProm && custProm.then) {
                        Promise.resolve(custProm).then(function (response) {
                            handleResponse.call(this, response, requestType);
                        }.bind(this),function(err){
                           if (properties.isSearchReq) {
                               localVariables.emptySearchResp = true;
                           }
                           properties.allRecordsFetched = true;
                           localVariables.previousLoadingStage = properties.currentLoadingStage;
                           properties.currentLoadingStage = ""; //NO I18N
                           if (methods.onLoadingStateUpdate) {
                               methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                           }
                           if (methods.onErrorFromRequest) {
                               methods.onErrorFromRequest(this);
                           } else {
                               if(err){
                                   var s = console;
                                   s.error(err);
                               }
                           }
                           return false;
                        }.bind(this));
                        return custProm;
                    }
                } else {
                    var reqDetails;
                    if (!properties.isSearchReq) {
                        reqDetails = Lyte.deepCopyObject( properties.requestDetails );
                    } else {
                        reqDetails = Lyte.deepCopyObject( properties.searchRequestDetails);
                    }
                    var fixedQp = reqDetails.storeDetails.queryParams,
                        qp = getQueryParams.call(this, fixedQp);
                    var requestProm, details = reqDetails.storeDetails;
                    details.queryParams = qp;
                    if (methods.modifyRequestDetails) {
                        var modifiedResp = methods.modifyRequestDetails(this,details);
                        if (modifiedResp) {
                            details = modifiedResp;
                        }
                    }
                    var requestType = properties.isSearchReq;
                    switch (reqDetails.storeReqType) {
                        case "findAll":
                            requestProm = store.findAll(details.modelName, details.queryParams, details.cacheQuery, details.cacheData, details.customData);
                            break;
                        case "triggerAction":
                            requestProm = store.triggerAction(details.modelName, details.actionName, details.customData, details.queryParams, details.method, details.data);
                            break;
                    }
                    return requestProm.then(function (response) {
                        handleResponse.call(this, response, requestType);
                        /*var newRespObj = {
                            response: response,
                            instance: this
                        }
                        return newRespObj;
                        */
                        return response;
                    }.bind(this), function (err) { 
                        if (properties.isSearchReq) {
                            localVariables.emptySearchResp = true;
                        }
                        properties.allRecordsFetched = true;
                        localVariables.previousLoadingStage = properties.currentLoadingStage;
                        properties.currentLoadingStage = ""; //NO I18N
                        if (methods.onLoadingStateUpdate) {
                            methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                        }
                        if (methods.onErrorFromRequest) {
                            methods.onErrorFromRequest(this);
                        } else {
                           if(err){
                               var s = console;
                               s.error(err);
                           }
                        }
                        return false;
                    }.bind(this));
                }
             }
             
         }

         function performExclude(recordsCount) {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables,
                 primaryKey = this.properties.primaryKey,
                 finalBatch = [],
                 excludedList = this.properties.excludeList,
                 recLength = this.properties.allAvailableRecords.length,
                 i;

             for (i = localVariables.currentRecordCount; i < recLength; i++) {
                 if (finalBatch.length === recordsCount) {
                     break;
                 } else if (!primaryKey || excludedList.indexOf(properties.allAvailableRecords[i][primaryKey]) === -1) {
                     finalBatch.push(properties.allAvailableRecords[i]);
                 } else {
                     properties.currentlyEcludedList.push(properties.allAvailableRecords[i])
                 }
             }
             if (i === recLength && finalBatch.length !== recordsCount && !properties.allRecordsFetched) {
                 triggerRequest.call(this);
                 return "nextRequest"; //NO I18N
             } else {
                 localVariables.currentRecordCount = i;
                 if (i === recLength && properties.allRecordsFetched) {
                     properties.allRecordsFetchedAndConsumed = true;
                 }
                 if (methods.validateNewBatch) {
                     var result = methods.validateNewBatch(this, finalBatch);
                     if (result) {
                         if (result.length < recordsCount) {
                             return performExclude.call(this, recordsCount);
                         } else {
                             return finalBatch;
                         }
                     } else {
                         return finalBatch;
                     }
                 } else {
                     return finalBatch;
                 }
             }
         }

         function handleResponse(response, typeOfRequest) {
            var properties = this.properties,
                 methods = this.methods;
            var cancelRequest = false;
            if (methods.cancelResponse) {
                cancelRequest = methods.cancelResponse(this, response, typeOfRequest);
                if (!cancelRequest) {
                    cancelRequest = false;
                }
            }
            if(!cancelRequest){
                var newResp;
                if (methods.onRequestResolved) {
                    newResp = methods.onRequestResolved(this, response);
                    if (!newResp) {
                        newResp = response;
                    }
                } else {
                    newResp = response;
                }
                if (!properties.isSearchReq) {
                    parseResponse.call(this, newResp);
                } else if (properties.searchValue !== "" || properties.searchValue && properties.searchValue.length !== 0) {
                    parseResponse.call(this, newResp);
                }
            }
         }

         function getQueryParams(queryParams) {
             queryParams = queryParams ? queryParams : {};
             var properties = this.properties,
                 methods = this.methods;

             var qp = {},
                 updatedQp = {};
             for (var key in queryParams) {
                 qp[key] = queryParams[key];
             }
             if (!properties.customPagination && !properties.isNonPagination) {
                 qp.per_page = properties.perPage;
                 qp.page = properties.pageNo;
             }
             if (methods.updateQueryParams) {
                 updatedQp = methods.updateQueryParams(this, qp);
                 if (!updatedQp || typeof updatedQp !== "object") {
                     updatedQp = qp;
                 }
             } else {
                 updatedQp = qp;
             }
             return updatedQp;
         }

         function parseResponse(response) {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables;

             var validResponse = true,
                 triggerNextRequest = false,
                 responseParseKey, parsedResponse, metaInfo;
             if (properties.isSearchReq) {
                 responseParseKey = properties.searchRequestDetails.parseResponseKey;
             } else {
                 responseParseKey = properties.requestDetails.parseResponseKey;
             }

             if (response) {
                 metaInfo = response.$;
             }

             if (!response) {
                 validResponse = false;
             } else if (response && response.constructor === Object && !response[responseParseKey]) {
                 validResponse = false;
             } else if (Array.isArray(response) && response.length === 0) {
                 validResponse = false;
             } else if (response[0] && response[0].$) {
                 if (response[0].$.isError) {
                     validResponse = false;
                 }
             }

             if (validResponse) {
                 if (Array.isArray(response) && response.length <= 10 && metaInfo && metaInfo.dataAvailable) {
                     validResponse = true;
                     triggerNextRequest = true;
                 }
             } else if (response && Array.isArray(response) && response.length === 0 && metaInfo && metaInfo.dataAvailable) {
                 validResponse = true;
                 triggerNextRequest = true;
             }

             if (validResponse) {
                 if (response.constructor === Object) {
                     parsedResponse = response[responseParseKey];
                 } else if (Array.isArray(response)) {
                     parsedResponse = response;
                 } else {
                     validResponse = false;
                 }
                 if (Array.isArray(parsedResponse) && parsedResponse.length === 0) {
                     validResponse = false;
                 }

                 if (validResponse) {
                     if (!triggerNextRequest && Array.isArray(parsedResponse) && parsedResponse.length <= 10 && metaInfo && metaInfo.dataAvailable) {
                         validResponse = true;
                         triggerNextRequest = true;
                     }
                 } else if (!triggerNextRequest && Array.isArray(parsedResponse) && parsedResponse.length === 0 && metaInfo && metaInfo.dataAvailable) {
                     validResponse = true;
                     triggerNextRequest = true;
                 }
             }

             //When data is available in the server by nothing is returned from request i will remake the request
             if (validResponse) {
                 if (properties.isSearchReq) {
                     localVariables.emptySearchResp = false;
                 }
                 properties.allAvailableRecords = properties.allAvailableRecords.concat(parsedResponse);
                 if (!( properties.customPagination || properties.isNonPagination )) {
                     properties.pageNo++;
                     if (parsedResponse.length < properties.perPage) {
                         if (!metaInfo || !metaInfo.dataAvailable) {
                             properties.allRecordsFetched = true;
                         }
                     } else if (parsedResponse.length === properties.perPage && metaInfo && metaInfo.dataAvailable === false) {
                         properties.allRecordsFetched = true;
                     }
                 } else if (properties.isNonPagination) {
                     properties.allRecordsFetched = true;
                 }

                 localVariables.allAvailablePages.currLen = properties.allAvailableRecords.length;
                 localVariables.allAvailablePages[properties.pageNo - 1] = parsedResponse;

                 if (methods.afterResponseParsed) {
                    methods.afterResponseParsed(this);
                 }

                 constructNextBatch.call(this, true, properties.currentLoadingStage);
                 if (triggerNextRequest) {
                     triggerNextRequest = false;
                     triggerRequest.call(this);
                 }
             } else {
                 if (methods.onInvalidResponse) {
                     methods.onInvalidResponse(this,response);
                 }
                 if (properties.isSearchReq) {
                     localVariables.emptySearchResp = true;
                 }
                 properties.allRecordsFetched = true;
                 localVariables.previousLoadingStage = properties.currentLoadingStage;
                 properties.currentLoadingStage = ""; //NO I18N
                 if (methods.onLoadingStateUpdate) {
                     methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                 }
             }
         }
         /* Internal Functions  End*/

         /* External Functions Start */
         function constructNextBatch(preventFutherReq, from) {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables;

             if (from === undefined) {
                 properties.currentLoadingStage = "initial"; //NO I18N
                 localVariables.previousLoadingStage = "initial"; //NO I18N
                 if (methods.onLoadingStateUpdate) {
                     methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                 }
             }
             var allAvailableRecordsLen = properties.allAvailableRecords.length;
             if (localVariables.currentRecordCount < allAvailableRecordsLen) {
                 var currentBatchSize = allAvailableRecordsLen - localVariables.currentRecordCount > properties.batchSize ? properties.batchSize : allAvailableRecordsLen - localVariables.currentRecordCount;
                 var currentBatch = performExclude.call(this, currentBatchSize);

                 if (currentBatch !== "nextRequest") {
                     localVariables.allAvailableBatchs.batchCount++;
                     localVariables.allAvailableBatchs.currLen = /*currentBatch.length;*/ localVariables.currentRecordCount;
                     localVariables.allAvailableBatchs[localVariables.allAvailableBatchs.batchCount] = currentBatch;
                     properties.displayRecords = properties.displayRecords.concat(currentBatch);
                     if (methods.onNewBatch) {
                         methods.onNewBatch(this, currentBatch);
                     }
                     localVariables.previousLoadingStage = properties.currentLoadingStage;
                     properties.currentLoadingStage = ""; //NO I18N
                     if (methods.onLoadingStateUpdate) {
                         methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                     }
                     localVariables.latestBatch++;
                 }
                 return true;
             } else if (!preventFutherReq && !properties.allRecordsFetched) {
                 return triggerRequest.call(this);
             } else {
                 localVariables.previousLoadingStage = properties.currentLoadingStage;
                 properties.currentLoadingStage = ""; //NO I18N
                 if (methods.onLoadingStateUpdate) {
                     methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                 }
             }
         }

         function performScroll(event) {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables;

             if (!localVariables.preventScrollFuncnality) {
                 if (localVariables.scrollTimeout) {
                     clearTimeout(localVariables.scrollTimeout);
                 }
                 localVariables.scrollTimeout = setTimeout(function () {
                     if (!localVariables.preventScrollFuncnalityOnLoad) {
                         var body = event.target;
                         var scrollCondition;
                         if (!properties.reverseLazyLoadScroll) {
                             scrollCondition = body.scrollHeight !== body.offsetHeight && body.scrollHeight - 10 <= Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop);
                         } else {
                             scrollCondition = body.scrollHeight !== body.offsetHeight && Math.ceil(body.scrollTop) <= 10;
                         }
                         if (scrollCondition) {
                             localVariables.preventScrollFuncnalityOnLoad = true;
                             properties.currentLoadingStage = "scroll"; //NO I18N
                             if (methods.onLoadingStateUpdate) {
                                 methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                             }
                             var result = constructNextBatch.call(this, false, "scroll"); //NO I18N
                             if (result && result.then) {
                                 Promise.resolve(result).then(function () {
                                     localVariables.preventScrollFuncnalityOnLoad = false;
                                 });
                             } else {
                                 localVariables.preventScrollFuncnalityOnLoad = false;
                             }
                         }
                     }
                 }.bind(this), 100);
             } else {
                 localVariables.preventScrollFuncnality = false;
             }
         }

         function performSearch(scrollEle) {
             var properties = this.properties,
                 methods = this.methods,
                 localVariables = this._localVariables;

             if (localVariables.searchTimeout) {
                 clearTimeout(localVariables.searchTimeout);
             }
             localVariables.searchTimeout = setTimeout(function () {
                 var inputVal = properties.searchValue,
                     minLength = properties.triggerSearchLength;
                 localVariables.currentSearchValue = inputVal;
                 if (localVariables.emptySearchResp && localVariables.oldSearchValue) {
                     var indexVal = localVariables.currentSearchValue.indexOf(localVariables.oldSearchValue);
                     if (indexVal === -1 || indexVal > 0) {
                         localVariables.emptySearchResp = false;
                         properties.allRecordsFetched = false;
                         properties.allRecordsFetchedAndConsumed = false;
                     }
                 }
                 if (inputVal.length >= minLength) {
                     if (!localVariables.emptySearchResp) {
                         if (scrollEle) {
                             if (scrollEle.scrollTop > 0) {
                                 localVariables.preventScrollFuncnality = true;
                                 scrollEle.scrollTop = 0;
                             }
                         }
                         localVariables.multipleBack = false;
                         /*if (!properties.isSearchReq) {*/
                         properties.allRecordsFetched = false;
                         properties.allRecordsFetchedAndConsumed = false;
                         /*}*/
                         properties.isSearchReq = true;
                         localVariables.currentRecordCount = 0;
                         properties.allAvailableRecords = [];
                         localVariables.allAvailablePages = {
                             currLen: 0
                         };
                         localVariables.allAvailableBatchs = {
                             currLen: 0,
                             batchCount: 0
                         };
                         localVariables.latestBatch = 0;
                         properties.displayRecords = [];
                         properties.pageNo = 1;
                         properties.currentLoadingStage = "search"; //NO I18N
                         if (methods.onLoadingStateUpdate) {
                             methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                         }
                         if (methods.beforeSearchRequestTriggered) {
                             methods.beforeSearchRequestTriggered(this, "beforSearch"); //NO I18N
                         }
                         var prom = constructNextBatch.call(this, false, "search"); //NO I18N
                         localVariables.oldSearchValue = localVariables.currentSearchValue;
                         return prom;
                     } else if (methods.beforeSearchRequestTriggered) {
                         methods.beforeSearchRequestTriggered(this, "rejected"); //NO I18N
                     }
                 }
                 if (inputVal.length === 0) {
                     if (!localVariables.multipleBack) {
                         properties.allRecordsFetched = false;
                         properties.allRecordsFetchedAndConsumed = false;
                         localVariables.multipleBack = true;
                         properties.isSearchReq = false;
                         localVariables.currentRecordCount = 0;
                         properties.allAvailableRecords = [];
                         localVariables.allAvailablePages = {
                             currLen: 0
                         };
                         localVariables.allAvailableBatchs = {
                             currLen: 0,
                             batchCount: 0
                         };
                         localVariables.latestBatch = 0;
                         properties.displayRecords = [];
                         properties.pageNo = 1;
                         localVariables.emptySearchResp = false;
                         properties.currentLoadingStage = "initial"; //NO I18N
                         if (methods.onLoadingStateUpdate) {
                             methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
                         }
                         if (methods.beforeSearchRequestTriggered) {
                             methods.beforeSearchRequestTriggered(this, "clearSearch"); //NO I18N
                         }
                         var prom = constructNextBatch.call(this, false, "initial"); //NO I18N
                         localVariables.oldSearchValue = "";
                         return prom;
                     }
                 }

             }.bind(this), 300);
         }

         function resetData(){
           var properties = this.properties,
               methods = this.methods,
               localVariables = this._localVariables;

           properties.allRecordsFetched = false;
           properties.allRecordsFetchedAndConsumed = false;
           localVariables.multipleBack = true;
           properties.isSearchReq = false;
           localVariables.currentRecordCount = 0;
           properties.allAvailableRecords = [];
           localVariables.allAvailablePages = {
               currLen: 0
           };
           localVariables.allAvailableBatchs = {
               currLen: 0,
               batchCount: 0
           };
           localVariables.latestBatch = 0;
           properties.displayRecords = [];
           properties.pageNo = 1;
           properties.currentLoadingStage = "initial"; //NO I18N
           localVariables.emptySearchResp = false;
           if (methods.onLoadingStateUpdate) {
               methods.onLoadingStateUpdate(this, properties.currentLoadingStage);
           }
           localVariables.oldSearchValue = "";
         }

         function resetSearch() {
           var localVariables = this._localVariables;
           if (localVariables.searchTimeout) {
               clearTimeout(localVariables.searchTimeout);
           }
           this.resetData(); //NO I18N
           var prom = this.constructNextBatch(false, "initial"); //NO I18N
           return prom;
         }
         /* External Functions End */

         /* Set prototype of lazyLoad Class Start */
         lazyLoadInstance.prototype = {
             constructNextBatch: constructNextBatch,
             performScroll: performScroll,
             performSearch: performSearch,
             resetData: resetData,
             resetSearch: resetSearch
         }
         /* Set prototype of lazyLoad Class End */

         /* Set up plugin into $L Start */
         $L.cruxLazyLoad = function (object) {
             return new lazyLoadInstance(object);
         }
         /* Set up plugin into $L End */
     }
 })(window);
