Lyte.Mixin.register("crux-user-utils", {//No I18n
	excludeIds: function(type,records, currentPos, recordsCount) {
		var primaryKey=this.getData("cxPropPrimaryKey"); //NO I18n
	var tempArr = [];
	var cxPropExclude = this.getData("cxPropExclude"); //NO I18n
	var length = records.length;
  for(var i = currentPos; i < length; i++) {
   if(tempArr.length ==  recordsCount) {
    break;
   }
   else{
    // if(cxPropExclude.indexOf(records[i].id) == -1){
    if(cxPropExclude.indexOf(records[i][primaryKey]) == -1){
			/*++++++
			this.setData("preventCall",true);//NO I18n
			if(type=="userLookup"){
				var selectedUserslength=1;
				// --var selectedUsers=this.getData('totalAddedItems'); //NO I18n
				var selectedUsers=this.getData('totalAddedObjects'); //NO I18n
			  if(this.getData('cxPropType')=="multiple"){ //NO I18n
			   // selectedUserslength=this.getData('totalAddedItems').length; //NO I18n
				 selectedUserslength=this.getData('totalAddedObjects').length; //NO I18n
			  }
     if(this.getData('selectedList')==false && this.getData('cxPropType')!="view"){ //NO I18n
			Lyte.Component.set(records[i],'lookup_selected_val',false); //No I18N
      // records[i].lookup_selected_val=false;
      for(var k=0;k<selectedUserslength;k++){
        // if(this.getData('cxPropType')=="multiple"){ //NO I18n
					// if(selectedUsers[k].id!=undefined){
					if(selectedUsers[k][primaryKey]!=undefined){
						// if(selectedUsers[k].id==records[i].id){
						if(selectedUsers[k][primaryKey]==records[i][primaryKey]){
							Lyte.Component.set(records[i],'lookup_selected_val',true); //No I18N
	           // records[i].lookup_selected_val=true;
	          }
					}
					else if(selectedUsers[k]!=undefined){
						// if(selectedUsers[k]==records[i].id){
						if(selectedUsers[k]==records[i][primaryKey]){
							Lyte.Component.set(records[i],'lookup_selected_val',true); //No I18N
	           // records[i].lookup_selected_val=true;
	          }
					}
        // }
        else{
         // if(selectedUsers==records[i].id){
         if(selectedUsers==records[i][primaryKey]){
					 // this.setData('displaySingleUser',records[i]); //NO I18n
					 Lyte.Component.set(records[i],'lookup_selected_val',true); //No I18N
          // records[i].lookup_selected_val=true;
         }
        }
       }
      }
      else{
				Lyte.Component.set(records[i],'lookup_selected_val',true); //No I18N
       // records[i].lookup_selected_val=true;
      }
      tempArr.push(records[i]);
		  }
			else{
				tempArr.push(records[i]);
			}
			this.setData("preventCall",false);//NO I18n
			++++++*/
			tempArr.push(records[i]);
		}else{
		  	Lyte.arrayUtils(this.getData("currentlyExcludedArray") , 'push', records[i]); //NO I18n
		 }
    }
   }
   this.setData('currentPos', i); //NO I18n

	 if(this.newConstructedBatch){
		 this.newConstructedBatch(tempArr);
	 }
   return tempArr;

  },
	constructArray : function(type,stopRequest){
	var networkObject=this.getData("cxPropNetworkData"); //NO I18n
  var records;
	records = this.getData('localData'); //NO I18n
	if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
		if((type!='userLookup')||(type=='userLookup' && this.getData("selectedList")==false)){
			if(this.getData("pageNo")==1 || this.getData("pageNo")==0){this.setData('noMoreRecords', true);}
		}
		else if((type=='userLookup' && this.getData("selectedList")==true)){
			if(this.getData("pageNo")==1){this.setData('noMoreRecords', true);}
		}
	}
	var recordsCount = this.getData('cxPropRecords'); //NO I18n
	var currentPos = this.getData('currentPos'); //NO I18n
	if(type=="userLookup" || type=="lookupComponent"){
	 if(this.getData('selectedList')==false||this.getData('selectedList')==undefined){
	  var systemdata = this.getData('systemData'); //NO I18n
	 }
	 else{
	  var addeddata=this.getData('addedItems');//NO I18n
	 }
  }
	else{
	 var systemdata = this.getData('systemData'); //NO I18n
	}
	if(currentPos < records.length){
	 recordsCount = (records.length - currentPos) > recordsCount ? recordsCount : (records.length - currentPos);
   if(type=="userLookup" || type=="lookupComponent"){
	  if(this.getData('selectedList')==false||this.getData('selectedList')==undefined){
	   if(currentPos === 0) {
	    this.setData("systemData", this.excludeIds.call(this, type, records, currentPos, recordsCount)); //NO I18n
	   }
	   else {
	    Lyte.arrayUtils(systemdata, 'push', this.excludeIds.call(this, type,  records, currentPos, recordsCount)); //NO I18n
	   }
	  }
	  else{
	   if(currentPos === 0) {
	    this.setData("addedItems", this.excludeIds.call(this, type, records, currentPos, recordsCount)); //NO I18n
	   }
	    else {
	     Lyte.arrayUtils(addeddata, 'push', this.excludeIds.call(this, type,  records, currentPos, recordsCount)); //NO I18n
	    }
	   }
		 this.setData("multiScroll",false);//NO I18n
	  }
		else{
		 if(currentPos === 0) {
 	    this.setData("systemData", this.excludeIds.call(this, type, records, currentPos, recordsCount)); //NO I18n
 	   }
 	   else {
 	    Lyte.arrayUtils(systemdata, 'push', this.excludeIds.call(this, type , records, currentPos, recordsCount)); //NO I18n
 	   }
		 this.setData("multiScroll",false);//NO I18n
		 this.setData("scrollLoading",false);//NO I18n
		}
		if(this.updatedList){
			this.updatedList();
		}
		// if(type=="userLookup" && currentPos!=0){
		// if(this.bodydrop.querySelector('input[name=allSelectCheckbox]')!=null&&this.bodydrop.querySelector('input[name=allSelectCheckbox]').checked==true&&this.getData('selectedList')==false){
		// 	// var checkBoxes=this.bodydrop.querySelectorAll('input[name=checkbox]'); //NO I18n
		// 	var checkBoxes=this.getData("systemData"); //NO I18n
		// 	var checkBoxesLength=checkBoxes.length;
		// 	this.setData("preventAllCallBacks",true); //NO I18n
		// 	for(var i=checkBoxesLength-1;i>checkBoxesLength-1-recordsCount;i--){
		// 		var preventCheckboxChecked=true;
   //      if(this.getMethods('beforeCheckboxChecked')){ //NO I18n
   //       var preventCheckboxChecked=this.executeMethod('beforeCheckboxChecked',this.getData('systemData')[i]); //NO I18n
   //      }
   //      if(preventCheckboxChecked || preventCheckboxChecked==undefined || preventCheckboxChecked==null){
   //        this.setData("preventCallBacks",true);//NO I18n
		// 		// checkBoxes[i].parentElement.parentElement.ltProp('checked',true);
		// 		 Lyte.Component.set(this.getData('systemData')[i],'lookup_selected_val',true); //No I18N
		// 	}
		// 	}
		// 	this.setData("preventCallBacks",false);//NO I18n
	 //    this.setData("preventAllCallBacks",false); //NO I18n
		// }
		// if(this.bodydrop.querySelector('input[name=selectedAllSelectCheckbox]')!=null&&this.bodydrop.querySelector('input[name=selectedAllSelectCheckbox]').checked==false&&this.getData('selectedList')){
		// 	// var checkBoxes=this.bodydrop.querySelectorAll('input[name=checkbox]'); //NO I18n
		// 	var checkBoxes=this.getData("systemData"); //NO I18n
		// 	var checkBoxesLength=checkBoxes.length;
		// 	this.setData("preventAllCallBacks",true); //NO I18n
		// 	for(var i=checkBoxesLength-1;i>checkBoxesLength-1-recordsCount;i--){
		// 		var preventCheckboxUnSelection=true;
	 //      if(this.getMethods('beforeCheckboxUnChecked')){ //NO I18n
	 //       var preventCheckboxUnSelection=this.executeMethod('beforeCheckboxUnChecked',this.getData('systemData')[i]); //NO I18n
	 //      }
	 //      if(preventCheckboxUnSelection || preventCheckboxUnSelection==undefined || preventCheckboxUnSelection==null){
	 //        this.setData("preventCallBacks",true);//NO I18n
		// 		// checkBoxes[i].parentElement.parentElement.ltProp('checked',false);
		// 		Lyte.Component.set(this.getData('systemData')[i],'lookup_selected_val',false); //No I18N
		// 	}
		// 	}
		// 	this.setData("preventCallBacks",false);//NO I18n
	 //    this.setData("preventAllCallBacks",false); //NO I18n
		// }
	 // }
	 }
	 else if(!stopRequest) {
	  if(this.getData('noMoreRecords')) { //NO I18n
			//EXTRA++++++++++
			if(this.beforeNewRequest){
				this.beforeNewRequest();
			}
			if(this.getData("cxPropCustomRequest")){
				if(this.customReqFunc){
				 var parameters=this.queryParams();
				 var retVal=this.customReqFunc(this.getData("cxPropNetworkData"),parameters,this.getData("isSearch"),this.getData("cxPropInputValue")) //NO I18n
				 if(retVal){
 					if(retVal.then){
 						Promise.resolve( retVal ).then(function(arg){
 							if(!this.getData("isSearch")){
 								this.setReqData(arg,type);
 							}else{
 								if(this.getData("cxPropInputValue")){
 									if(this.getData("cxPropInputValue").length!=0){
 										this.setReqData(arg,type);
 									}
 								}else{
 									this.setReqData(arg,type);
 								}
 							}
 						}.bind(this),function(){
							if(!this.data.isSearch){
								if(this.errorOnRequest){
									this.errorOnRequest();
								}
							} else {
								if(this.errorOnSearch){
									this.errorOnSearch();
								}
							}
						}.bind(this));
 					}
 				}
        }
			}else{
			//EXTRA++++++++++
			if(!this.getData("isSearch")){
				return store.findAll(networkObject.cxPropModuleName,this.queryParams(), networkObject.cxPropCacheQuery, networkObject.cxPropDataCache, networkObject.cxPropCustomData).then(function(arg){ //NO I18n
	   // return store.findAll(this.getData("cxPropModuleName"),this.queryParams(), this.getData("cxPropCacheQuery"), this.getData('cxPropDataCache')).then(function(arg){ //NO I18n
		 this.setReqData(arg,type);
		}.bind(this),function(err){
			/*if(this.errorOnRequest){
				if(type!="userLookup"){
					this.setData("searchLoading",false);//NO I18n
					this.setData("scrollLoading",false);//NO I18n
					this.setData("systemData",[]);//NO I18n
				}
				this.errorOnRequest(err);
			}*/

			if(this.errorOnRequest){
				this.errorOnRequest(err);
			}
			var s = console.error;
		 s(err);
			this.setData("multiScroll",false);//NO I18n
		}.bind(this));
	}
	else{
	return store.triggerAction(networkObject.cxPropModuleName,"search",this.queryParams()).then(function(arg){
		// return store.triggerAction(this.getData("cxPropModuleName"),"search",this.queryParams()).then(function(arg){
			// this.setData("SearchNetworkCount",this.getData("SearchNetworkCount")-1); //NO I18n
			// if(this.getData('pendingSearchVariable').isPending && (this.getData("SearchNetworkCount")<5)){
			// 	this.setData("pendingSearchVariable",this.getData('pendingSearchVariable').isPending=false);
			// 	var typ=this.getData("pendingSearchVariable").type;
			// 	var ev=this.getData("pendingSearchVariable").evt;
			// 	this.setData("SearchNetworkCount",this.getData("SearchNetworkCount")+1); //NO I18n
			// 	if(type=="userLookup"){
			// 	 this.filterObserver.call(this, 'search', ev); //NO I18n
			// 	}
			// 	else{
			// 		this.constructArray.call(this,typ,false); //NO I18n
			// 	}
			// }

	  if(this.getMethods('onAfterSearchResponse')){
		   arg = this.executeMethod('onAfterSearchResponse',arg); //NO I18n
	  }
	  if(this.getData("cxPropInputValue") === "" || this.getData("cxPropInputValue") ){
				if(this.getData("cxPropInputValue").length!=0){
					this.setReqData(arg,type);
				}
			}else{
				this.setReqData(arg,type);
			}
	
		}.bind(this),function(err){
			if(this.errorOnSearch){
				if(type!="userLookup"){
					this.setData("searchLoading",false);//NO I18n
					this.setData("scrollLoading",false);//NO I18n
					this.setData("systemData",[]);//NO I18n
				}
				this.errorOnSearch(err);
			}
			var s = console.error;
		 s(err);
			this.setData("multiScroll",false);//NO I18n
		}.bind(this));
	}
	//EXTRA++++++++++
	}
	//EXTRA++++++++++
	}else{
	this.setData("multiScroll",false);//NO I18n
	}
	}else{
	 this.setData("multiScroll",false);//NO I18n
	}
	 return true;
	},
	setReqData : function(arg,type){
		var orignialResponse = arg;
		var allowThrough=true;
		var networkObject=this.getData("cxPropNetworkData"); //NO I18n
		if(this.getData("isSearch")){
			var objectKey=store.serializer[networkObject.cxPropModuleName].varPayloadKey;
		}
		var systemdata;
		if(type === "userLookup" || type === "lookupComponent"){
			if(!this.getData('selectedList')){
				systemdata = this.getData("systemData"); //NO I18n
			}
			else{
				systemdata = this.getData("addedItems"); //NO I18n
			}
		 }
		this.setData("multiScroll",false);//NO I18n
		if(this.getData("isSearch")){
			if(arg && arg.constructor == Object){
				arg = arg[objectKey];
			 // arg = arg[this.getData("cxPropModuleName")];
			}
			else if(Array.isArray(arg) && arg.length==0){
		 allowThrough=false;
			}
		}else{
			if(arg && arg[networkObject.cxPropModuleName]!=undefined){
				arg=arg[networkObject.cxPropModuleName];
			}
			else if(arg && arg[store.serializer[networkObject.cxPropModuleName].varPayloadKey]!=undefined){
				arg=arg[store.serializer[networkObject.cxPropModuleName].varPayloadKey];
			}
		}
		if(arg==undefined){
			allowThrough=false;
		}
		else if(arg &&!Array.isArray(arg) && arg[networkObject.cxPropModuleName]==undefined){
	 allowThrough=false;
		}
		else if(Array.isArray(arg) && arg.length==0){
	 allowThrough=false;
		}
		else if(arg[0] && arg[0].$){
			if(arg[0].$.isError){
				allowThrough=false;
			}
		}
		if(arg && allowThrough){
			if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
				this.setData('pageNo', this.getData('pageNo') + 1) //NO I18n
			}
			this.setData('noUsersAvilabel',false); //NO I18n
			if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
			if(type=='userLookup'){
				if(this.getData("selectedList") && (this.getData("cxPropReqForSelected")!=undefined && this.getData("cxPropReqForSelected")!=null && this.getData("cxPropReqForSelected")==false ) ){
					this.setData('pageNo',0) //NO I18n
				}
			}
		 }
	 Lyte.arrayUtils(this.getData('localData'), 'concat', arg); //NO I18n
		 if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
			 if((type=='userLookup' && this.getData('selectedList')==false)||(type!='userLookup')){
				 if(arg.length < this.getData('cxPropPerPage') ){ //NO I18n
				  this.setData('noMoreRecords', false); //NO I18n
				 }
			 }
		  else if((type=='userLookup' && this.getData('selectedList')==true)){
			  if(this.getData("cxPropReqForSelected")){
				  	if(arg.length < this.getData('cxPropPerPage') ){ //NO I18n
				  		this.setData('noMoreRecords', false); //NO I18n
				 	}
			  } else {
				  if(arg.length < this.getData('cxPropSelectedPerPage') ){ //NO I18n
				 	this.setData('noMoreRecords', false); //NO I18n
			  	  }
			  }
			  
		   }
		 }
	
		 this.constructArray.call(this, type, true);
		}
		else {
			if(this.getData("currentPos")==0){
				if(type === "userLookup" || type === "lookupComponent"){
					if(!this.getData('selectedList')){
						this.setData("systemData", []); //NO I18n
					}
					else{
						this.setData("addedItems", []); //NO I18n
					}
				 } else {
					 this.setData("systemData", []); //NO I18n
				 }
				//this.setData("systemData", []); //NO I18n
				// if(type=='userLookup'){
				// 	this.setData('noUsersAvilabel',true); //NO I18n
				// }
				this.setData('noUsersAvilabel',true); //NO I18n
		 }
		 else{
			 if(type === "userLookup" || type === "lookupComponent"){
					if(!this.getData('selectedList')){
						Lyte.arrayUtils(this.data.systemData, 'push', []); //NO I18n
					}
					else{
						Lyte.arrayUtils(this.data.addedItems, 'push', []); //NO I18n
					}
				 } else {
					 Lyte.arrayUtils(this.data.systemData, 'push', []); //NO I18n
				 }
		 }
		 if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
			this.setData('noMoreRecords', false); //NO I18n
		 }
		}
		if(this.loadMoreData){
			if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
			 this.loadMoreData();
		 }else{
			 this.loadMoreData(orignialResponse);
		 }
		}
	},
	queryParams  : function(){
	 var ret = JSON.parse(JSON.stringify(this.getData('cxPropQueryParams') || {})); //NO I18n
	 if(this.setCriteria){
		 var ret = this.setCriteria();
	 }
	 if(ret==undefined){
		 ret=JSON.parse(JSON.stringify(this.getData('cxPropQueryParams') || {})); //NO I18n
	 }
	 // if(this.getData("isSearch")){
	 // 	ret.per_page = this.getData("cxPropSearchCount"); //NO I18n
	 // }
	 // else{
	 if(this.getData("cxPropCustomPagination") == undefined || this.getData("cxPropCustomPagination") == null || this.getData("cxPropCustomPagination") == false){
		 if(this.getData("cxPropPerPage")!=0){ //NO I18n
		 ret.per_page = this.getData("cxPropPerPage"); //NO I18n
	  }
	 // }
	 if(this.getData("pageNo")!=0){ //NO I18n
	 ret.page = this.getData("pageNo"); //NO I18n
	}
	}
	 return ret;
	},
	bodyScroll : function(type,event,event_target , selectedPage){
		if(!this.getData("stopScrolling")){
		var networkObject=this.getData("cxPropNetworkData"); //NO I18n
	 	var body = (event && event.target) ? event.target : event_target;
	 // if(body.scrollHeight <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop)) && body._scrollEnd){
		var scrollHeight =  body ? body.scrollHeight : "", offsetHeight = body ? body.offsetHeight : "";
		if(scrollHeight !== offsetHeight && scrollHeight-10 <= (Math.ceil(offsetHeight) + Math.ceil(body.scrollTop)) || selectedPage){
			_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
		 if(!this.getData("isSearch")){
			 // this.setData("cxPropCacheQuery",false); //NO I18n
			 // this.setData("cxPropDataCache",false); //NO I18n
			if(!this.getData("preventCacheReset")){
			 networkObject.cxPropCacheQuery=false;
			 networkObject.cxPropDataCache=false;
			 this.setData("cxPropNetworkData",networkObject); //NO I18n
			}
		 }
		 if(!this.getData('multiScroll')){
			 if(type=='userLookup'){
				 if(this.getData('noMoreRecords')){
					 if(!this.getData('selectedList')){
						 this.setData('searchingScroll',true); //NO I18n
					 }
					 else{
						  this.setData('searchingSelectedScroll',true); //NO I18n
					 }
				 }
			 }
			 else{
				 if(this.getData('noMoreRecords')){
					 this.setData('scrollLoading',true); //NO I18n
				 }else{
					 this.setData('scrollLoading',false); //NO I18n
				 }
			 }
		this.setData("multiScroll",true);//NO I18n
		this.constructArray.call(this,type,false);
	   }
	 }
	}
	else{
	this.setData("stopScrolling",false);//NO I18n
	}
	},
	keyup : function(type,setScroll,evt){
	 clearTimeout(this._timeout);
	 this._timeout = setTimeout(function(){
		 if(this.performKeyUpSearch){
			 this.performKeyUpSearch(evt , this.getData('cxPropInputValue'));  //NO I18n
		 }
	   var inputVal = this.getData('cxPropInputValue'), minLength = this.getData('cxPropMinLength'); //NO I18n

	   if(this.perform_input_Trim){
		   inputVal = inputVal.trim();
	   }

		 this.setData("currentSearchValue",inputVal);  //NO I18n
		 if(this.getData("noUsersAvilabel") && (this.getData("oldSearchValue")!=undefined && this.getData("oldSearchValue")!=null && this.getData("oldSearchValue")!="")){
	  if(this.getData("currentSearchValue").indexOf(this.getData("oldSearchValue"))==-1 || this.getData("currentSearchValue").indexOf(this.getData("oldSearchValue"))>0){
				this.setData("noUsersAvilabel",false); //NO I18n
				this.setData("noMoreRecords",true); //NO I18n
			}
		 }
		if(type=="userLookup"){
		// if(this.getData('cxPropInputValue').length==1){
	//  this.setData('searchingSearch',false);  //NO I18n
	// }
	// else
		if(inputVal.length>minLength-1){
	  this.setData('searchingSearch',true);  //NO I18n
	}
		else{
			this.setData('searchingSearch',false);  //NO I18n
		}
	}
	  if(inputVal.length >= minLength){
			if(setScroll!=null){
			 this.setData("stopScrolling",true);//NO I18n
			 if(setScroll.scrollTop==0){
				 this.setData("stopScrolling",false);//NO I18n
			 }else{
				 setScroll.scrollTop=0;
			 }
		   }
			this.setData("multipleBack",false); //NO I18n
			if(this.getData("isSearch")!=true){
				this.setData("noMoreRecords",true);//NO I18n
			}
	   this.setData("isSearch", true); //NO I18n
		   if(type!="userLookup"){
				 // if(this.getData("noMoreRecords")){
					 this.setData("currentPos",0); //NO I18n
					 this.setData("localData", []); //NO I18n
					 if(this.getData("pageNo")!=0){//NO I18n
						this.setData("pageNo",1); //NO I18n
						}
				 }
	
			 // }
			 // if(this.getData("SearchNetworkCount")<5){
				//  this.setData("SearchNetworkCount",this.getData("SearchNetworkCount")+1); //NO I18n
				//  console.log(this.getData("SearchNetworkCount"));
				 if(type=="userLookup"){
					// this.setData('searchingSearch',true);  //NO I18n
					if(!this.getData("noUsersAvilabel")){
						this.filterObserver.call(this, 'search', evt); //NO I18n
					}
					else{
						if(this.search_rejected){
							this.search_rejected()
						}
						this.setData("searchingSearch",false); //NO I18n
					}
			   }
				 else{
					 // if(this.getData('cxPropInputValue').length==1){
				 //  this.setData('searchLoading',false);  //NO I18n
				 // }
				 // else
					 if(inputVal.length>minLength-1){
				   this.setData('searchLoading',true);  //NO I18n
				 }
					 else{
						 this.setData('searchLoading',false);  //NO I18n
					 }
					 // if(evt && evt.keyCode === 8 && this.getData("noUsersAvilabel")==true){
						//  this.setData("noUsersAvilabel",false);//NO I18n
						//  this.constructArray.call(this,type,false);
					 // }
					 // else
					 if(this.getData("noUsersAvilabel")==true){
						 this.setData('searchLoading',false);  //NO I18n
						 //this.constructArray.call(this,type,false);
					 }else{
						 this.constructArray.call(this,type,false);
					 }
				 }
	
			 // }
			 // else{
				//  this.setData("pendingSearchVariable",{isPending:true,type:type,evt:evt,val:inputVal}); //NO I18n
			 // }
	  }
		else{
			if(type!="userLookup"){
				this.setData('searchLoading',false);  //NO I18n
			}else{
				this.setData("searchingSearch",false); //NO I18n
			}
		}
		if(this.getData("multipleBack")==false||this.getData("multipleBack")==undefined){
			if(this.getData("multipleBack")==undefined && inputVal.length<this.getData('cxPropMinLength')){
				this.setData("multipleBack",true); //NO I18n
			}
			else{
	  if(inputVal.length == 0) {
			if(this.endKeyUpSearch){
				this.endKeyUpSearch();
			}
		 this.setData("isSearch", false); //NO I18n
		 if(type=="userLookup"){
			 this.setData("noMoreRecords",true); //NO I18n
		 //this.filterObserver.call(this,undefined,evt);
	 this.filterObserver.call(this,"removeAll",evt);//NO I18n
	   }
		 else{
			 this.setData("noMoreRecords",true); //NO I18n
			 this.setData("currentPos",0); //NO I18n
			 this.setData("localData", []); //NO I18n
			 if(this.getData("pageNo")!=0){//NO I18n
				this.setData("pageNo",1); //NO I18n
				}
			 this.constructArray.call(this,type,false)
		 }
		 this.setData("multipleBack",true); //NO I18n
	  }
	}
	 }
	 this.setData("oldSearchValue",this.getData("currentSearchValue"));  //NO I18n
	}.bind(this), 300);
	},
	escapeString : function(value){
	var returnValue=value.replace(/\(/g,'\\(').replace(/\)/g,'\\)');//NO I18n
	returnValue=returnValue.trim();
	return returnValue;
	},
	cxPropMaxLimitMessageBox : function(){
		var type = this.getData("messageBoxType");//No I18N
		if(!type){
			type = "warning";//No I18N
		}
		var message = this.getData("cxPropMaxLimitMsg"); //No I18N
		if(!message){
			message = _cruxUtils.getI18n("crux.comboBox.max.limit", this.getData("cxPropMaxLimit"), _cruxUtils.getI18n("crm.label.users")); //No I18N
		}
		var duration = this.getData("cxPropMaxLimitDuration"); //No I18N
		if(!duration){
			duration = "2000"; //No I18N
		}
		_cruxUtils.showCustomMessage({
							params: {
								ltPropType: type,
								ltPropMessage: message,
								ltPropDuration: duration,
								ltPropShow: true
							}
						});
	},
	setSearchDataForSuggestion : function(value){
		value = value.replace(/^([\W|_|\s]+)/g, '').replace(/([\W|_|\s]+)$/g, '');
		var findChar = function(data){
			return data.split(/[@&(+)_\-'.=: ]/).find(function(x){
				return x.toLowerCase().startsWith(value)
			});
		}
		var users = this.getData('cxPropSuggestion').users, len = users.length , arr = [] , value = value.toLowerCase(); //no i18n
		for(i = 0 ; i < len ; i++){
			if(findChar(users[i].full_name) || findChar(users[i].email) ){
				arr.push(users[i]);
			}
		}
		this.setData("suggestedUsers", arr); //no i18n
	},
	getDefaultFilters: function() {
		var filters = [
			{"id": "AllUsers", "category": _cruxUtils.getI18n('crm.globalsearch.option.all'),status: ["all"]}, //NO I18n
			{"id": "ActiveUsers", "category": _cruxUtils.getI18n('webform.status.Active'), status: ["active"]}, //NO I18n
			{"id": "DeactiveUsers", "category": _cruxUtils.getI18n('Inactive'),status: ["disabled", "rejected"]}, //NO I18n
			{"id": "ConfirmedUsers", "category": _cruxUtils.getI18n('Confirmed'),status: ["active", "disabled", "deleted", "closed"], confirm : true}, //NO I18n
			{"id": "NotConfirmedUsers", "category": _cruxUtils.getI18n('crm.user.component.unconfirmed'),status: ["active", "disabled", "rejected"], confirm : false}, //NO I18n
			{"id": "DeletedUsers", "category": _cruxUtils.getI18n('DeletedUser'),status: ["deleted", "closed"]}, //NO I18n
			{"id": "ActiveConfirmedUsers", "category": _cruxUtils.getI18n('webform.status.Active')+" "+_cruxUtils.getI18n('Confirmed'),status: ["active"]}, //NO I18n
			{"id": "AdminUsers", "category": _cruxUtils.getI18n('crm.feed.group.admin'),status: ["all"]}, //NO I18n
			{"id": "ActiveConfirmedAdmins", "category": _cruxUtils.getI18n('crm.user.label.active.confirmed.admins'),status: ["active"]}, //NO I18n
			{"id": "CurrentUser", "category": _cruxUtils.getI18n('crm.ln.lable.current'),status: ["active"]} //NO I18n
		];
	
		return filters;
	},
	getModifiedValues : function() {
        /*This util added for client script usage for user-dropdown and user-lookup*/
        let modified_obj = this.dataModified;
        const modifiedReturnVal = { ...modified_obj };
        modified_obj.added_ids = [];
        modified_obj.removed_ids = [];
        return modifiedReturnVal;
    },
    removeModifiedValue: function(value) {
		let obj = this.dataModified;
		let removeVal = true;
		for (let key in obj) {
		  obj[key] = obj[key].filter(function(rec ){ 
			if(rec.id === value.id){
				removeVal = false;
			}
			return rec.id !== value.id;
		   });
		}	
		return removeVal;	  
	}
});
