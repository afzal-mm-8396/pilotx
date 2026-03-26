/**
 * This mixin needs to be included for crux-lookup-component and its subs to work.
 * @mixin crux-lookup-mixin
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Mixin.register("crux-lookup-mixin", {//No I18n
	/**
	 * lookupInit is called to fetch the module data if not present and then forward to fetch the record data. If the modal needs to render related module info as well, those requests are made here as well.
	 * @author anuja.manoharan
	 * @version 1.0.0
	 * @params comp - the component so that data can be set directly to it
	 * @params modId - since store request to module model with given modId
	 * @params lookup
	 * @params event
	 * @params ddelem
	 * @internal
	 */
	lookupInit : function(comp,modId,lookup,event,ddelem){
		if(comp.$node.tagName === "CRUX-LOOKUP-MODAL"){
			comp.moduleInit(modId);
		}else{
			var prom = [this.executeMethod("fetchModuleData", modId)];
			if(this.data.cxPropRelatedId){ //We can eliminate this api call by using lookup-advanced
				var arr = [{id : this.data.cxPropRelatedId, name : _cruxUtils.getI18n("crm.related.contact.account", this.data.module.plural_label, this.data.cxPropRelatedName)}, {id : "2", name : _cruxUtils.getI18n("crm.allcontact.show", this.data.module.plural_label)}];//no i18n
				this.setData("headerOptions", arr);//no i18n
				this.setData("selectedHeaderValue", this.data.cxPropRelatedId);//no i18n
				prom.push(this.executeMethod("fetchModuleData", this.data.cxPropRelatedModuleId));
			}
			var _self = this;
			Lyte.resolvePromises(prom).then(function(resp){
				if(comp.$node){
					var mod = resp[0];
					if(!(mod.fields && mod.fields.length)){
						_cruxUtils.showPermissionDeniedModal();
						if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
							commonUtils.showHideLoadingDiv(false);
						}
						if(_self._initRej){    //Autocomplete beforeShow Promise should be rejected/accepted. Then only the next callback will be trigger. 
							_self._initRej();
						}
						return;
					}
					comp.setData("module", mod);
					if(!comp.data.modId){
						comp.setData("modId", mod.id);
					}
					if(_self.getMethods("onModuleGetSuccess")){
						_self.executeMethod("onModuleGetSuccess" , resp);
					}
					comp.setData("moduleName", mod.module_name);
					comp.setData("displayField", mod.display_field.api_name);
					lookup ? comp.getRecs() : comp.beforeShowFunc(event, ddelem, true);
				}
			},function(res){
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				if(_self._initRej){
					_self._initRej();
				}
				var resp =  res ? JSON.parse(res.response) : {};
				if(resp.code === 'NO_PERMISSION' || resp.status === 401 || resp.status === 403)
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		}
	},
	/**
	 * constructSearchFilter is called before each search request is triggered to store. This will construct the filters query param.
	 * @author anuja.manoharan
	 * @version 1.0.0
	 * @internal
	 * @param {*} disp - the display value to which the main filter value is applied
	 * @param {*} val - the search value
	 * @param {*} field 
	 * @param {*} searchFormat 
	 * @returns the filters query param value
	 */
	constructSearchFilter : function(disp, val,field,searchFormat){
		/**
		 * user can choose to pass his own fields to be searched by passing cxPropSearchFields
		 */
		if(this.data.cxPropSearchFields && this.data.cxPropSearchFields.length > 0){
			return JSON.stringify(this.constructGroup(this.data.cxPropSearchFields, val));
		}
		var comparator = field && field.crypt !== null ? "equals" : searchFormat ? "starts_with" : "contains";
		var result = searchFormat ? "("+disp+":"+comparator+":"+val.replace(/[(]/g, "\\(").replace(/[)]/g, "\\)")+")" : {comparator : comparator, field : {api_name : disp}, value : val};
		/**
		 * for the case of Products, product code needs to be searched along with product name
		 */
		if(["Products" , "Bundles__s"].includes(this.data.module.api_name) && this.data.module.fields){
			var _field =  this.data.module.fields.find(x => ["Product_Code" , "Bundle_Code" ].includes(x.api_name));
			if(_field && _field.visible){
				result = searchFormat ? "("+result+"or(" + _field.api_name +":starts_with:"+val.replace(/[(]/g, "\\(").replace(/[)]/g, "\\)")+"))" : {group_operator : "or", group : [result, {comparator : "contains", field : {api_name : _field.api_name}, value : val}]};
			}
		}
		if(this.data.header){
			for(var i=0; i<this.data.header.length; i++){
				if(this.data.header[i].api_name == disp){
					continue;
				}
				switch(this.data.header[i].cxTypeMapping){
				case "email":
				case "phone":
					result = searchFormat ? "("+result+"or("+this.data.header[i].api_name+":starts_with:"+val.replace(/[(]/g, "\\(").replace(/[)]/g, "\\)")+"))" : {group_operator : "or", group : [result, {comparator : "contains", field : {api_name : this.data.header[i].api_name}, value : val}]};
					break;
				}
			}
		}
		return searchFormat ? result : JSON.stringify(result);
	},
	constructGroup : function(fields, value){
		if(fields.length > 1){
			return {group_operator : "or", group : [{comparator : "contains", field : {api_name : fields[0]}, value : value}, this.constructGroup(fields.splice(1), value)]};
		}
		return {comparator : "contains", field : {api_name : fields[0]}, value : value};
	},
	getField : function(id){
		var field;
		if(id){
			if(store && store.modelFor('field')){
				field = store.peekRecord('field',id);
			}
			if(!field){
				field = this.data.module.fields.find(fld => fld.id === id);
			}
		}
		return field;
	},
	formatCriteriaForSearchAPI : function(filter){
		var criteria = "", fieldData;
		this.filterValueIds = [];

		var _self = this;

		// Helper to process filter groups (handles nested groups)
		function processFilterGroup(filterObj) {
			var localCriteria = "", value = "";

			// Case 1: If the filter has a group_operator (nested group)
			if (filterObj && filterObj.group_operator) {
				var len = filterObj.group ? filterObj.group.length : 0;
				localCriteria += len ? "(" : "";

				for (var i = 0; i < len; i++) {
					var subFilter = filterObj.group[i];

					// Call again if subFilter itself has group_operator
					if (subFilter.group_operator) {
						localCriteria += processFilterGroup(subFilter);
					} else if (subFilter.field) {
						fieldData = _self.getField(subFilter.field.id);
						value = _self.formatCriteriaOnFieldType(subFilter, fieldData);
						localCriteria += "(" + subFilter.field.api_name + ":" + 
							(subFilter.comparator === "equal" ? "equals" : subFilter.comparator) + 
							":" + value + ")";
						_self.filterValueIds.push(subFilter.field.id);
						value = '';
					}

					if (i < len - 1) {
						localCriteria += filterObj.group_operator.toLowerCase(); // 'and' / 'or'
					}
				}
				localCriteria += len ? ")" : "";

			// Case 2: Simple single field filter
			} else if (filterObj && filterObj.field) {
				fieldData = _self.getField(filterObj.field.id);
				value = _self.formatCriteriaOnFieldType(filterObj, fieldData);
				localCriteria = "(" + filterObj.field.api_name + ":" + 
					(filterObj.comparator === "equal" ? "equals" : filterObj.comparator) + 
					":" + value + ")";
				_self.filterValueIds.push(filterObj.field.id);
			}

			return localCriteria;
		}

		criteria = processFilterGroup(filter);
		return criteria;
	},
	formatCriteriaOnFieldType : function(filter , fieldData){  //To format the criteria based on field UI type and data type
		var valueArray;
		if(fieldData){
			if(filter.field.api_name.includes(".")){ //Lookup filter component is returning anomaly field apiname for Lookup field. This condition will solve it
				filter.field.api_name = fieldData.api_name;
			}
			if([999,208,207,209].includes(fieldData.ui_type)){
				filter.comparator = 'in';
			}
			/*if(fieldData.data_type === 'formula' && !filter.group[i].comparator){ //Formula fields comparators are decided based on its return type
				var typeOfFormula = fieldData.formula.return_type
				filter.comparator = this.getData('formulaReturnTypeComparators')[typeOfFormula];

			}*/
			if(filter.value.indexOf('.') === 0 && (['double','integer','currency'].includes(fieldData.data_type) || ['double','integer','currency'].includes(fieldData.formula.return_type) || (fieldData.rollup_summary && ['double','integer','decimal','currency'].includes(fieldData.rollup_summary.return_type)) )){
				filter.value = '0'+filter.group[i].value;
			}
			if(!this.validateSearchValue(filter.value, fieldData.field_label,fieldData.data_type === 'formula' || fieldData.data_type === 'rollup_summary' ? (fieldData.data_type === 'formula' ? fieldData.formula.return_type : fieldData.rollup_summary.return_type ) : fieldData.data_type , fieldData)){
				this.filterValueIds = [];
				return;
			}

			if(typeof filter.value === 'object' && typeof filter.value[0] === 'object'){
				valueArray = [];
				if(fieldData.ui_type === 209){ //for tags picklist alone search api is expecting Name
					for(var rec1 of filter.value){
						if(rec1.name) { valueArray.push(rec1.name); }
					}
				}else{
					for(var rec2 of filter.value){
						if(rec2.id) { valueArray.push(rec2.id); }
					}
				}
			}else if(fieldData.ui_type === 96){
				valueArray = [];
				for(var x of filter.value){
					valueArray.push(fieldData.pick_list_values.find( pLValues => pLValues.display_value === x).id);
				}
			}
			else if((fieldData.data_type === 'datetime' || (fieldData.data_type === 'formula' && fieldData.formula.return_type === 'datetime') || (fieldData.data_type === 'rollup_summary' && fieldData.rollup_summary.return_type === 'datetime') ) && !filter.value.toString().includes('+')){
				filter.value[0]+=(Crm.userDetails.TIME_ZONE.replace('.',':')); //To support search api time zone is required
				filter.value[1]+=(Crm.userDetails.TIME_ZONE.replace('.',':'));
			}
			if (this.data.allowEncryptedFields && fieldData.crypt !== null) { //EnCrypted field can be searched only with equal comparator
				filter.comparator = "equal"; //No I18N
			}
		}
		valueArray = valueArray && valueArray.length ? valueArray : filter.value;
//		if(typeof valueArray === 'object'){
		valueArray = valueArray.toString().replace(/[(]/g,'\\(').replace(/[)]/g,'\\)'); //Escape for brackets in picklist // what if field name has brackets
//		}
		return valueArray;
	},
	validateSearchValue : function(searchValue,fieldLabel,dataType ) { //fieldData
	    //eslint-disable-next-line no-useless-escape
		var spclChars  = /^[`~!@#$%^&*()\-_=+\\|\][{}'";:/?.,><]+$/, emojiFilter = /[\uD800-\uDBFF][\uDC00-\uDFFF]+$/gi;
	    if(this.errorLabel){
	    	_cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : I18n.getValueForFields("crm.field.valid.check", this.errorLabel),ltPropWrapperClass : "lookupErrorMsg"}}); //NO I18N
    		return false;
	    }
	    if(typeof searchValue === 'string' && emojiFilter.test(searchValue)){
	    	searchValue = searchValue.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi, '');
	    	if(searchValue.trim().length === 0){
	    		_cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : I18n.getValueForFields("crm.field.valid.check", fieldLabel),ltPropWrapperClass : "lookupErrorMsg"}}); //NO I18N
	    		return false;
	    	}
	    }else if(typeof searchValue === 'string' && searchValue.length){ //NO I18N
	    	searchValue = searchValue.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi, '').trim();
	    }
//	    fieldLabel = Lyte.Component.registeredHelpers.cruxEncodeHTML(fieldLabel);
	    if(((dataType === "date") && !(Utils.isValidDate && Utils.isValidDate('YYYY-MM-DD',searchValue))) || ((dataType === "datetime") && !(Utils.compareDateandTime && Utils.compareDateandTime(searchValue[0],searchValue[1])))){
	    	_cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : I18n.getValueForFields("crm.field.valid.check", fieldLabel),ltPropWrapperClass : "lookupErrorMsg"}}); //NO I18N
	    	return false;
	    }
	    else if(typeof searchValue === "string" && spclChars.test(searchValue) && !(dataType === "date" || dataType === "datetime" || dataType === "picklist" || dataType === "double" || dataType === "currency")){
	    	_cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : I18n.getValueForFields("crm.field.valid.check", fieldLabel),ltPropWrapperClass : "lookupErrorMsg"}}); //NO I18N
	    	return false;
	    }//NEED TO REMOVE
//	    else if( (dataType === "double" || dataType === "currency") && (searchValue.includes('.') && fieldData && fieldData.decimal_place && searchValue.split('.')[1].length > fieldData.decimal_place ) ){ //NO I18N
//	    	_cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : I18n.getValueForFields("crm.field.valid.decimal.cal.check", [fieldLabel, fieldData.decimal_place]),ltPropWrapperClass : "lookupErrorMsg"}}) //NO I18N
//    		return false

//	    }
	    this.errorLabel = undefined;
	    return true;
	},
	getRelatedFieldApiName : function(relModApiName){  //This static case followed by lookup filter view.
		relModApiName = relModApiName ? relModApiName : this.data.cxPropRelatedModuleId ? store.peekRecord("module", this.data.cxPropRelatedModuleId).api_name : "";//no i18n
		var apiName; 
		switch (relModApiName) { //No I18n
			case 'Accounts':
				apiName = 'Account_Name'; //No I18n
				break;
			case 'Vendors':
				apiName = 'Vendor_Name'; //No I18n
				break;
			case 'Contacts':
				apiName = 'Contact_Name'; //No I18n
				break;
		}
		return apiName;
	},
	joinSearchApiCriteria : function(cri1, cri2){
		if(cri1 && cri2){
			return "("+cri1+"and"+cri2+")"; //NO I18N
		}else if(cri1){
			return cri1;
		}
		return cri2;
	},
	fetchRecords : function(modId , queryParam , customData){
		var field = this.data.cxPropField , _self = this;
		customData = customData ? customData : {};
		if(field && field.data_type === "multiselectlookup"){
            return new Promise(function(resolve, reject){
				var prom , record;
				if(_self.data.currentModalPage === "multiList"){
					record = store.peekRecord("module", field.multiselectlookup.connected_module.id);
                    prom = record.$.triggerAction("getUnAssigned", { module: field.multiselectlookup.connected_module.api_name} , undefined , undefined , {"get_unassigned" : queryParam});
				}else{
					record = store.peekRecord("module", field.multiselectlookup.linking_module.id);
					prom = record.$.triggerAction("getAssigned", { module: field.multiselectlookup.linking_module.api_name} , undefined , undefined , {"get_unassigned" : queryParam});
				}
				Lyte.resolvePromises(prom).then(function(res){
					var records = res.data;
			        records.$ = {meta : res.meta};
			        resolve(records);
				},function(res){ 
					reject(res);
				});
			});
		}
		if(this.data.cxPropSearchFormat){
			var qp = $L.extend(true , {}, queryParam);
			customData.type = "Search";
			customData.from = "Lookup";
			if(qp.filters){
				let filter = qp.filters;
				delete qp.filters;
				customData.criteria = filter;
			}
		}
		return new Promise(function(resolve, reject){
			store.findAll(modId,queryParam,false,false , customData).then(function(resp){
				var records = resp[modId];
				records.info = resp.info;
				records.meta = resp.meta;
				records.$ = {meta : resp.info};
				resolve(records);
			},function(res){
				reject(res);
			});
		});
	}
});
