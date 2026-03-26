/**
 * It is a mixin that can be included by users who use the crux-text-component and give autocomplete as true. It prefills the data and methods that are required for some specific fields.
 * @plugin cruxTextareaBindResize
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Mixin.register("crux-textautocomplete-options", {//No I18n
	methods : {
		/**
		 * fetchData is called when user clicks on the input or searches something in it. The below method handles the case of COMPANY field and COUNTRY-like fields.
		 * @author anuja.manoharan
		 * @version 1.0.0
		 * @returns either a promise with resolved data or an array of data
		 */
		fetchData : function(val, index, field){
			switch(field.column_name){
			case "COMPANY":
				if(!store.modelFor(moduleRecordMapping.Accounts.id)){
					store.registerModel(moduleRecordMapping.Accounts.id, {}, {extends : "entity"});
					this.accountFieldsFetched = false;
				}
				let filterAccount = ()=>{
					let prom;
					let accountNameField = moduleRecordMapping.Accounts.fields.find((field)=>field.api_name==='Account_Name');
					if(accountNameField && accountNameField.crypt){
						let customData,query={};
						query.criteria = "(Account_Name:equals:" + val + ")";
						query.page = index;
						query.per_page=10;
						query.approved = "both";
						query.approval_state = "approved,approval_process_pending,approval_process_rejected";
						customData = {type : 'Search' , from : 'Lookup' , criteria : query.criteria };
						prom = store.findAll(moduleRecordMapping.Accounts.id,query, false, false, customData);
					}else{
						var filter = {
							group_operator: "OR",
							group: [{
								comparator: "starts_with",
								field: {
									api_name: "Account_Name"
								},
								value: val
							}, {
								comparator: "contains",
								field: {
									api_name: "Account_Name"
								},
								value: val
							}]
						}
						prom = store.findAll(moduleRecordMapping.Accounts.id, {filters : filter, page : index, per_page : 10, sort_by : "Account_Name",
						sort_order : "asc", approved : "both"}, false, false);
					}
					return prom;
				};
				return new Promise((resolve,reject)=>{
					if(!this.accountFieldsFetched){
						store.findRecord("module", moduleRecordMapping.Accounts.id).then(()=>{
							this.accountFieldsFetched = true;
							filterAccount().then((data)=>{
								resolve(data[moduleRecordMapping.Accounts.id]);
							}).catch((error)=>{
								reject(error);
							});
						}).catch((error)=>{
							reject(error);
						});
					}else{
						filterAccount().then((data)=>{
							resolve(data[moduleRecordMapping.Accounts.id]);
						}).catch((error)=>{
							reject(error);
						});
					}	
				});
			case "COUNTRY":
			case "SHIPPINGCOUNTRY":
			case "MAILINGCOUNTRY":
			case "BILLINGCOUNTRY":
			case "OTHERCOUNTRY":
				return I18n.properties.COUNTRY_LIST2;
			}
		}
	},
	getTextAutocompleteOptions : function(field){
		/**
		 * This will set the autocomplete options for some predefined fieldss
		 * @author anuja.manoharan
		 * @version 1.0.0
		 * @params field info from which column_name is used
		 * @returns an object that specifies the properties required for autocomplete
		 */
		var obj = {enable : true};
		switch(field.column_name){
		case "COMPANY":
			obj = Object.assign(obj, {yield : true, externalSearch : true, minLength : 3, displayField : "Account_Name", module : "Accounts",
				idField : "id"});
			break;
		case "COUNTRY":	
		case "SHIPPINGCOUNTRY":
		case "MAILINGCOUNTRY":
		case "BILLINGCOUNTRY":
		case "OTHERCOUNTRY":
			obj = Object.assign(obj, {minLength : 2, method : "startsWith",displayField : "name", content : this.executeMethod("fetchData", undefined, undefined, field)});
			break;
		case "SUBJECT":
			obj = field.pick_list_values ? Object.assign(obj, {minLength : 0, method : "contains",displayField : "name", content : field.pick_list_values.map(function(pickListVal){return pickListVal.display_value}), yield : false, externalSearch : false}) : {enable : false};
			break;
		default :
			obj.enable = false;
		}
		return obj;
	}
});

