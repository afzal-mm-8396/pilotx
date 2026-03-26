/**
 * This component is used internally by crux-lookup-component when we hover over it in "view" mode. It is used to display data in business card order.
 * @component crux-lookup-view-popup
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-lookup-view-popup", {
_template:"<template tag-name=\"crux-lookup-view-popup\"> <lyte-popover lt-prop-show=\"{{showPopover}}\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-origin-elem=\".cxLookupBc\" lt-prop-position=\"right\" lt-prop-duration=\"{{undefinedNumber}}\" lt-prop-content-padding=\"15px\" lt-prop-bind-to-body=\"false\" lt-prop-max-height=\"70%\" lt-prop-wrapper-class=\"cxBusinessCardPopover\" on-show=\"{{method('popoverShow')}}\" lt-prop-max-width=\"500px\" lt-prop-close-on-scroll=\"true\"> <template is=\"yield\" yield-name=\"popover\"> <lyte-popover-content onmouseover=\"{{action('mouseOver',true)}}\" onmouseout=\"{{action('mouseOver')}}\"> <template is=\"if\" value=\"{{expHandlers(record,'!')}}\"><template case=\"true\">{{error}} </template><template case=\"false\"> <div data-zcqa=\"{{cxPropBcZcqa}}\"> <div class=\"cxLookupViewTopSection\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowImage,'&amp;&amp;',hasImage)}}\"><template case=\"true\"><template is=\"if\" value=\"{{recordImageSrc}}\"><template case=\"true\"> <div class=\"cxLookupViewPopImgCont\"> <img class=\"cxLookupViewPopRecImg\" src=\"{{recordImageSrc}}\"> </div> </template><template case=\"false\"> <div class=\"cxLookupViewPopImgCont cxLookupViewLetterCircle\">{{cruxLookupGetFirstChar(record,fields[0].api_name)}}</div> </template></template></template></template> <div class=\"cxLookupViewTopContentWrap {{if(fields[1].businesscard_supported,'cxLookupHasSingleRow','')}}\"> <div class=\"cxLookupViewTopHeading\"> <link-to lt-prop-class=\"cxLookupViewPopupHeadingLink\" lt-prop-route=\"{{cxPropRouteName}}\" lt-prop-dp=\"{{cxPropDynamicParams}}\" lt-prop-qp=\"{{cxPropQueryParams}}\" lt-prop-td=\"{{cxPropTransitionData}}\" lt-prop-target=\"{{cxPropTarget}}\" onclick=\"{{action('linkClicked')}}\">{{cruxGetValue(record,fields[0].api_name,fields[0].ui_type,true)}}</link-to> </div> <template is=\"if\" value=\"{{expHandlers(fields[1].businesscard_supported,'!')}}\"><template case=\"true\"> <span class=\"cxLookupViewTopDesc\"> <template is=\"component\" cx-prop-empty-value=\"-\" component-name=\"crux-{{fields[1].cxTypeMapping}}-component\" cx-prop-value=\"{{cruxGetValue(record,fields[1].api_name)}}\" cx-prop-datetime-in-user-pattern=\"false\" cx-prop-date-in-user-pattern=\"false\" cx-prop-field=\"{{fields[1]}}\" cx-prop-show-mask-unmask-icon=\"false\"></template><template is=\"if\" value=\"{{expHandlers(fields[2].businesscard_supported,'!')}}\"><template case=\"true\"> - <template is=\"component\" component-name=\"crux-{{fields[2].cxTypeMapping}}-component\" cx-prop-value=\"{{cruxGetValue(record,fields[2].api_name)}}\" cx-prop-datetime-in-user-pattern=\"false\" cx-prop-date-in-user-pattern=\"false\" cx-prop-field=\"{{fields[2]}}\" cx-prop-show-mask-unmask-icon=\"false\"></template></template></template> </span> </template></template> </div> </div> <div> <div class=\"cxDivTable cxLookupExtraDetailsTbl\"> <template is=\"for\" items=\"{{fields}}\" item=\"field\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(index,'!=',0)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(field.businesscard_supported,'&amp;&amp;',expHandlers(field.column_name,'!=',&quot;ISCALLBILLABLE&quot;))}}\"><template case=\"true\"> <div class=\"cxDivTr\"> <div class=\"cxDivTd cxLookupViewLabel\">{{field.field_label}}</div> <div class=\"cxDivTd cxLookupViewValue cxLookupVwPopupValue\"> <span class=\"cxLookupViewValueWrap\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.mask_details,'&amp;&amp;',expHandlers(field.unmask,'!')),'&amp;&amp;',cruxGetValue(record,field.api_name,field.ui_type))}}\"><template case=\"true\"> {{cruxMaskValue(cruxGetValue(record,field.api_name,field.ui_type),field.mask_details,true)}} </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(record[field.api_name],'&amp;&amp;',expHandlers(field.ui_type,'==',250))}}\"><template case=\"true\"> <crm-richtext-component cx-prop-value=\"{{record[field.api_name]}}\" cx-prop-from=\"view\" show-more-button=\"false\"></crm-richtext-component> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(record[field.api_name],'&amp;&amp;',record[field.api_name].name)}}\"><template case=\"true\"> {{record[field.api_name].name}} </template><template case=\"false\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-empty-value=\"-\" cx-prop-field=\"{{field}}\" cx-prop-value=\"{{cruxGetValue(record,field.api_name,field.ui_type)}}\" cx-prop-datetime-in-user-pattern=\"false\" cx-prop-date-in-user-pattern=\"false\" cx-prop-call-allowed=\"{{cxPropCallAllowed}}\"></template> </template></template></template></template> </template></template> <template is=\"if\" value=\"{{checkForMaskPermission(field.mask_details,cxPropProfileId)}}\"><template case=\"true\"> <span class=\"cxElemMaskIcon {{if(ifNotEquals(cxPropToggleMasking,true),'cxElemMaskIconWrap','')}}\" onclick=\"{{action('muskUnmaskIconClick',field.api_name)}}\" data-zcqa=\"{{if(cxPropToggleMasking,'unmask','mask')}}_icon\" lt-prop-tooltip-class=\"cxElemMaskIconTooltip\" lt-prop-title=\"{{if(ifEquals(cxPropToggleMasking,true),cruxGetI18n('crm.masking.view_masked_data'),cruxGetI18n('crm.masking.hide_masked_data'))}}\"> <span class=\"cxSprite {{if(ifEquals(expHandlers(field.unmask,'!'),true),'cxUnmaskIcon','cxMaskIcon')}}\"></span> </span> </template></template> </span> </div> </div> </template></template></template></template></template> </div> </div> </div> </template></template> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,1,1]},{"type":"text","position":[1,1,3,1,1,0]},{"type":"componentDynamic","position":[1,1,3,1,1]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1,3]},{"type":"if","position":[1,3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropBasePath","cxPropTypeMapping","cxPropRecordImageSrc","cxPropShowImage","cxPropBcZcqa","cxPropHoverCallback","cxPropFormulaMapping","cxPropForcedFetch","cxPropCallAllowed","hasImage","show","lookupComp","entityId","fields","record","module","showPopover","cxPropTypeMapping","recordImageSrc","undefinedNumber","cxPropShowImage","cxPropShowLookupPopupFields","field","cxPropProfileId"],
_observedAttributesType :["string","object","string","boolean","string","boolean","object","boolean","boolean","boolean","boolean","object","string","array","object","string","boolean","object","string","number","boolean","boolean","object","string"],
//No i18N
	data : function(){
		return {
			cxPropBasePath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath) ? Crm.getCrmBasePath() : ""}),//No i18N
			cxPropTypeMapping : Lyte.attr("object"),//No i18N
			cxPropRecordImageSrc : Lyte.attr("string"),//No I18n
			cxPropShowImage : Lyte.attr("boolean", {default : true}),
			cxPropBcZcqa: Lyte.attr("string"),
			cxPropHoverCallback : Lyte.attr("boolean"),
			cxPropFormulaMapping : Lyte.attr("object", {default : {currency : "text", text : "text",longinteger : "number", boolean : "boolean", "datetime" : "date-time", date : "date", double : "number" , decimal : "number" , integer : "number" }}),
			cxPropForcedFetch: Lyte.attr('boolean',{default:false}),
			cxPropCallAllowed:  Lyte.attr('boolean',{default:false}),
			hasImage: Lyte.attr("boolean", {default : false}),
			show : Lyte.attr("boolean", {default : false}),//No i18N
			lookupComp: Lyte.attr("object"),
			entityId : Lyte.attr("string"),//No i18N
			/**
			 * @internal
			 * This is the array in which data is displayed
			 * @componentProperty { array } fields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			fields : Lyte.attr("array"),//No i18N
			/**
			 * @internal
			 * The data fetched via store request is set to this property
			 * @componentProperty { object } record
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			record : Lyte.attr("object"),//No i18N
			module : Lyte.attr("string"),//No i18N
			/**
 			 * @internal
			 * Internal property to show/hide the popup
			 * @componentProperty { boolean } showPopover=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			showPopover : Lyte.attr("boolean", {default : false}),//No i18N
			cxPropTypeMapping : Lyte.attr("object"),//No i18N
			recordImageSrc : Lyte.attr("string"),//No I18n
			undefinedNumber : Lyte.attr("number", {default : undefined}),//No I18n
			cxPropShowImage:Lyte.attr("boolean",{default:true}),
			cxPropShowLookupPopupFields:Lyte.attr("boolean",{deafult:false}),
			field : Lyte.attr("object"),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")})
		}		
	},
	didConnect: function(){
		this.updateListener = Lyte.addEventListener( "cxRecordUpdated" , function(details){
			if(details && this.data.entityId === details.id){
				this.refreshData = true;
			}
	   }.bind(this));
	},
	didDestroy: function(){
		Lyte.removeEventListener( this.updateListener );
	},
	observeShow : function(){
		
		if(this.data.show == true){
			this.timeoutClose(true)
			/**
			 * If popup is shown for same lookup, multiple requests are not made.
			 */
			this.popoverTimeout = setTimeout(()=>{
				if(this.data.entityId != this._id){	
					this.setData('hasImage',false);
					this._id = this.data.entityId;
					var moduleId;
					var _moduleApiMapping = typeof moduleApiMapping != "undefined" ? moduleApiMapping : {};
					if(!this.data.module){
						let _idModuleMapping = typeof idModuleMapping != "undefined" ? idModuleMapping : {};
						moduleId = this.data.field.lookup.module.id;
						this.setData("module", _idModuleMapping[moduleId]);
					}
					else{
						var prevModule = this.data.module;
						// this.setData("module", _moduleApiMapping[this.data.module]);
						var _moduleRecordMapping = typeof moduleRecordMapping != "undefined" ? moduleRecordMapping : {};
						moduleId = _moduleRecordMapping[this.data.module] ? _moduleRecordMapping[this.data.module].id : _moduleRecordMapping[prevModule].id;
					}
					this.moduleId = moduleId;
					this.fetchBcData(moduleId);
				}
				else{
					if(this.getData('cxPropForcedFetch') || this.refreshData){
						this.fetchBcData(this.moduleId);
						if(this.refreshData){
							this.refreshData = false;
						}
					}else if(this.entityCallResolved){
						this.setData("showPopover", true);
						if(this.data.cxPropShowLookupPopupFields && this.data.fields && this.data.fields.length==0){
							this.setData("showPopover", false);//No i18N
						}
					}
				}
			},100)
		}
		else{
			this.timeoutClose(false)
		}
	}.observes("show").on("init"),//No i18N
	timeoutClose: function(show){
		clearTimeout(this.popoverTimeout);
		var originElem = this.data.lookupComp;
		if(show){
			if(this.previousOriginElem && (this.previousOriginElem!==originElem)){
				this.setData("showPopover", false);
				if(this.previousOriginElem.classList.contains("cxLookupBc")){
					this.previousOriginElem.classList.remove("cxLookupBc");
				}
			}
		}
		else{
			this.popoverTimeout = setTimeout(function(){
				this.setData("showPopover", false);
				if(this.previousOriginElem && this.previousOriginElem.classList.contains("cxLookupBc")){
					this.previousOriginElem.classList.remove("cxLookupBc");
				}
			}.bind(this), 200);
		}
		this.previousOriginElem = originElem;
	},
	methods:{
		popoverShow: function(){
			if(this.popoverCont){
				this.popoverCont.scrollTop = 0;
			}else{
				this.popoverCont  = $L('.cxBusinessCardPopover lyte-popover-content')[0]; //eslint-disable-line @zoho/webperf/no-complex-selector
			}
		}
	},
	actions : {
		/**
		 * To prevent popup from hiding when hover over the popup itself.
		 */
		mouseOver : function(show){
			clearTimeout(this.popoverTimeout);
			var originElem = this.data.lookupComp;
			if(show){
					clearTimeout(this.popoverTimeout);
			}
			else{
				this.popoverTimeout = setTimeout(function(){
					this.setData("showPopover", false);
					if(originElem){
						originElem.classList.remove("cxLookupBc");
					}
				}.bind(this), 100);
			}
		},
		muskUnmaskIconClick:function(api_name){
			var fields=this.data.fields;
			var fields_len=fields.length;
			for(var i=0;i<fields_len;i++){
				if(fields[i].api_name===api_name){
					Lyte.objectUtils(fields[i], "add", "unmask", !fields[i].unmask);
					break;
				}
			}
		},
		linkClicked: function(){
			if(this.getMethods('onLookupLinkClickedPopup')){
				var ret = this.executeMethod('onLookupLinkClickedPopup',event, this, this.data.field);
				if(ret === false){
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
			}
			if(typeof cruxAssets !== "undefined" && cruxAssets.cxLookupElementLinkClicked){
				cruxAssets.cxLookupElementLinkClicked(event);
			}
		}
	},
	fetchBcData: function(moduleId){
		this.entityCallResolved = false;
		if(this.getMethods("onLookupHoverFetchBcDataPopup") && (this.data.cxPropHoverCallback === undefined || this.data.cxPropHoverCallback === true)){
			/**
		 * @functionType methodCall onLookupHoverFetchBcDataPopup
		 * @version 1.0.0
		 * @author anuja.manoharan
		 * @param {string} moduleId
		 * @param {string} entityId
		 * returns a Promise
		 */
			this.executeMethod("onLookupHoverFetchBcDataPopup", moduleId, this.data.entityId).then(function(resp){
				var res = resp ? resp : {};
					this.setPopoverData(res.record, res.bcFields);
					this.entityCallResolved = true;
			}.bind(this), function(){
				this.entityCallResolved = true;
				this._id = undefined;
			}.bind(this))
		}
		else if(!store.modelFor(moduleId)){
			store.findRecord("module", moduleId, {}, false, true, {getFields : true}).then(function(){
				this.fetchRecordData(moduleId);
				this.entityCallResolved = true;
			}.bind(this));
		}
		else{
			this.fetchRecordData(moduleId);
		}
	},
	fetchRecordData : function(moduleId){
		var self = this;
		var fields="Record_Image,Phone,Email";
		let queryParam = {approved : "both", apply_fields : "business_card", include : "fields"}
		if(this.data.cxPropShowLookupPopupFields){
			queryParam.fields = fields;
		}
		if(this.refreshData && !this.getData('cxPropForcedFetch')){
			store.clearCachedQuery(moduleId, self.data.entityId, queryParam);
		}
		store.findRecord(moduleId, self.data.entityId, queryParam,  this.getData('cxPropForcedFetch')?false:true, false, {businessCard : true}).then(function(resp){
			self.entityCallResolved = true;
			var rec = resp[moduleId][0];
			if(rec && rec.id === self.data.entityId){
					self.setPopoverData(rec, resp.fields);
			}else{
				self.setData({record:undefined,fields:undefined});
				// self.setData("showPopover", true);
			}
		}, function(res){
			self.entityCallResolved = true;
			if(res && res.status === 403){
				self.setData('error',_cruxUtils.getI18n('crm.security.error'));
			}
			self.setData({record:undefined,fields:undefined});
			self.setData("showPopover", true);
		})
	},
	setPopoverData : function(record, fields){
		
		var bcFields = fields;
		if(bcFields && record){
			let hasValidFields = bcFields.filter((field)=>field!=null).some((field)=>{ return field.businesscard_supported})
			if(hasValidFields){
				_cruxUtils.addMurhyInfo("crux-image-component", "January Group Automation");
				var formulaMapping = this.data.cxPropFormulaMapping;//No I18n
				var mapping = this.data.cxPropTypeMapping;
				this.setData("record", record);
				if(bcFields[0] && bcFields[0].api_name === "Record_Image"){
						this.setData('recordImageSrc','')
						this.setData('hasImage',true);
				}
				bcFields = bcFields.filter((field)=>{return field != null && field.api_name !== "Record_Image"})
				bcFields.forEach((field)=>{
					if(field.ui_type === 116 || field.ui_type === 117){
						field.cxTypeMapping = formulaMapping[field.formula.return_type];
					}
					else if(field.ui_type === 118){
						field.cxTypeMapping = formulaMapping[field.rollup_summary.return_type];
					}
					else if(field.api_name === "Solution_Number" || field.api_name === "Quote_Number"  || field.api_name === "Invoice_Number" || field.api_name === "Case_Number" || field.api_name === "SO_Number"){
						field.cxTypeMapping = "number";
					}
					// else if((field.ui_type == 333 || field.ui_type == 14 || field.ui_type == 786) && this.getData("module") == "Activities"){
					// 	field.cxTypeMapping = "allday";
					// }
					else{
						field.cxTypeMapping = mapping[field.ui_type] &&  mapping[field.ui_type]!=='lookup' && field.data_type!=='currency' ? mapping[field.ui_type] : 'text';
					}
				})
				this.setData("fields", bcFields);
				if(!this.data.cxPropRecordImageSrc && record.Record_Image){
					this.setData("recordImageSrc", this.data.cxPropBasePath+"/EntityImageAttach.do?action_module="+this.data.module+"&entityId="+record.id+"&actionName=readImage&fileId="+record.Record_Image);
				}
			}else{
				this.setData('error',_cruxUtils.getI18n('crux.no.bc.message'));
				this.setData({record:undefined,fields:undefined});
			}
		}else{
			this.setData('error',_cruxUtils.getI18n('crm.security.error'))
			this.setData({record:undefined,fields:undefined});
		}
		this.setData("showPopover", this.data.show);
	}
});

Lyte.Component.registerHelper("cruxLookupGetFirstChar", function(record, api_name){//No i18N
	var module = this.getData('module')
	var name = record[api_name];
	if(!name){
		return "";
	}
	if(module == "Leads" || module == "Contacts"){
		if(name.First_Name){
			name = name.First_Name;
		}
		else if(name.Last_Name){
			name = name.Last_Name;
		}
	}
	if(name.name){
		name = name.name;
	}
	return name.charAt(0);
})

Lyte.Component.registerHelper("cruxGetValue", function(obj, field, ui_type,isEntityName){//eslint-disable-line block-spacing
	if(obj && field && obj[field]!==undefined){
		if(obj[field].name){
			return obj[field].name;
		}
		else if(ui_type == 96){
			/**
			 * For Tax field
			 */
			return obj[field].map(function(item){return item.value}).join("; ");
		}
		else if(ui_type == 80){
			return Lyte.Transform["time-in-hrs"].deserialize(obj[field]);
		}
		else if(isEntityName && (this.getData('module')==='Leads' || this.getData('module')==='Contacts') && typeof Crm !== "undefined"){
			var user = store.peekRecord("user", Crm.userDetails.USER_ID);
			let nameFormat = user ? user.name_format ? user.name_format : 
								user.name_format__s ? user.name_format__s : 
									Crm.userDetails.NAME_FORMAT : Crm.userDetails.NAME_FORMAT;
			if(nameFormat){
				var nameFormatArr = nameFormat.split(","), fullname = "";
				let nameLen = nameFormatArr.length;
				for(var i=0; i<nameLen; i++){
					if(obj[field][nameFormatArr[i].replace(" ", "_")]){
						fullname+=obj[field][nameFormatArr[i].replace(" ", "_")]+" ";
					}
				}
			}
			return fullname;
		}

		return obj[field];		
	}
	return "";
})


/**
 * @syntax nonYielded
 * <crux-lookup-view-popup></crux-lookup-view-popup>
 */
